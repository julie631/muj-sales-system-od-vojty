#!/usr/bin/env python3
"""
Přepis nahrávky prodejního hovoru přes Gemini.

Použití:
  python3 scripts/prepis.py NAHRAVKA [--klient Klára] [--slug studio-lotos] [--datum 2026-10-03]
                                     [--obchodnik Obchodník] [--model gemini-2.5-flash]

Výstup: data/sales-coach/transcripts/_inbox/{datum}_{slug}.txt
Formát: „[mm:ss] Mluvčí: text", jedna replika na řádek.

Nahrávku rozdělí na pětiminutové kusy a přepíše je souběžně. Jedním požadavkem by Gemini
u delšího hovoru vrátil jen začátek (došel by mu výstupní limit) — u 37minutového hovoru
to bylo prvních 7 minut.

Klíč: GEMINI_API_KEY v .env.local (nebo v prostředí). Návod: knowledge/prepis-hovoru.md
"""

import argparse
import datetime as dt
import os
import re
import shutil
import subprocess
import sys
import tempfile
import time
import unicodedata
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INBOX = ROOT / "data" / "sales-coach" / "transcripts" / "_inbox"
DEFAULT_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
KUS = 300          # sekund na jeden kus
SOUBEZNE = 4       # free tier Gemini snese ~10 požadavků za minutu
POKUSU = 3


def nacti_env() -> None:
    """Doplní proměnné z .env.local / .env (nepřepisuje existující)."""
    for name in (".env.local", ".env"):
        f = ROOT / name
        if not f.exists():
            continue
        for line in f.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFD", text)
    text = "".join(c for c in text if unicodedata.category(c) != "Mn")
    text = re.sub(r"[^a-zA-Z0-9]+", "-", text).strip("-").lower()
    return text or "hovor"


def zmensi(src: Path, tmpdir: Path) -> Path:
    """Video nebo velký soubor → mono MP3 16 kHz (menší upload, stejná srozumitelnost)."""
    out = tmpdir / (src.stem + ".mp3")
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-i", str(src),
           "-vn", "-ac", "1", "-ar", "16000", "-b:a", "64k", str(out)]
    subprocess.run(cmd, check=True)
    return out


def rozdel(audio: Path, tmpdir: Path) -> list:
    """MP3 → kusy po KUS sekundách (bez překódování)."""
    vzor = tmpdir / "kus_%03d.mp3"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(audio), "-f", "segment",
                    "-segment_time", str(KUS), "-c", "copy", str(vzor)], check=True)
    return sorted(tmpdir.glob("kus_*.mp3"))


def prompt(obchodnik: str, klient: str, cislo: int, celkem: int) -> str:
    return f"""Přepiš tenhle úsek prodejního hovoru doslovně do češtiny. Je to úsek {cislo} z {celkem}.

1. Doslovně — včetně „ehm", „no", „tak", oprav a nedokončených vět. Čísla, ceny a jména přesně, jak zazněla.
2. Mluví dva lidé: {obchodnik} (prodává) a {klient} (klient). Když je slyšet víc lidí, použij jejich jména.
3. Každá replika na vlastním řádku ve formátu: [mm:ss] Mluvčí: text
   — čas = začátek repliky od začátku TOHOTO úseku.
4. Při změně mluvčího vždy nový řádek. Dlouhý monolog rozděl zhruba po 30 sekundách na víc řádků.
5. Úsek může začínat i končit uprostřed věty — přepiš jen to, co v něm je.
6. Nesrozumitelné místo označ [nesrozumitelné].
7. Žádný úvod, shrnutí ani komentář. Začni rovnou první replikou."""


CAS = re.compile(r"^\[(\d{1,2}):(\d{2})(?::(\d{2}))?\]\s*(.*)$")


def posun(text: str, offset: int) -> list:
    """Časy z kusu ([mm:ss] nebo [h:mm:ss]) posune o začátek kusu."""
    radky = []
    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        m = CAS.match(line)
        if not m:
            radky.append(line)
            continue
        a, b, c, zbytek = m.groups()
        sec = int(a) * 3600 + int(b) * 60 + int(c) if c else int(a) * 60 + int(b)
        t = offset + sec
        cas = f"{t // 3600}:{t % 3600 // 60:02d}:{t % 60:02d}" if t >= 3600 else f"{t // 60:02d}:{t % 60:02d}"
        radky.append(f"[{cas}] {zbytek}")
    return radky


def chyba_modelu(e: Exception, model: str) -> None:
    """Chyby, které opakováním nespravíš — skonči hned se srozumitelnou hláškou."""
    msg = str(e)
    if "404" in msg or "NOT_FOUND" in msg:
        sys.exit(f"Model {model} není dostupný (Google ho stáhl nebo ho tvůj klíč nemá). "
                 "Zkus --model gemini-2.5-flash, případně se podívej na aistudio.google.com, "
                 "které modely klíč umí.")
    if ("429" in msg or "RESOURCE_EXHAUSTED" in msg) and ("per day" in msg.lower() or "PerDay" in msg):
        sys.exit("Došla denní kvóta Gemini (free tier). Zkus to zítra, nebo si v Google AI Studiu "
                 "zapni placený tarif.")


def prepis_kusu(client, types, model: str, cesta: Path, text_promptu: str) -> str:
    nastaveni = dict(temperature=0.0, max_output_tokens=16384)
    if "2.5-flash" in model:
        # bez přemýšlení: jinak sežere výstupní limit a přepis skončí v půlce
        nastaveni["thinking_config"] = types.ThinkingConfig(thinking_budget=0)
    config = types.GenerateContentConfig(**nastaveni)
    posledni = "neznámá chyba"
    for pokus in range(POKUSU):
        uploaded = None
        try:
            uploaded = client.files.upload(file=str(cesta))
            for _ in range(60):
                f = client.files.get(name=uploaded.name)
                if f.state.name == "ACTIVE":
                    break
                if f.state.name == "FAILED":
                    raise RuntimeError("Gemini soubor nezpracoval (FAILED)")
                time.sleep(2)
            resp = client.models.generate_content(model=model, contents=[uploaded, text_promptu],
                                                  config=config)
            duvod = resp.candidates[0].finish_reason if resp.candidates else None
            konec = getattr(duvod, "name", str(duvod))
            text = (resp.text or "").strip()
            if konec == "STOP" and len(text) > 20:
                return text
            posledni = f"přepis nedoběhl ({konec})"
        except SystemExit:
            raise
        except Exception as e:  # noqa: BLE001 — síť, kvóta za minutu, výpadek
            chyba_modelu(e, model)
            posledni = str(e)[:200]
        finally:
            if uploaded is not None:
                try:
                    client.files.delete(name=uploaded.name)
                except Exception:
                    pass
        time.sleep(20 * (pokus + 1))
    raise RuntimeError(posledni)


def main() -> None:
    ap = argparse.ArgumentParser(description="Přepis nahrávky hovoru přes Gemini.")
    ap.add_argument("nahravka", type=Path, help="audio nebo video (m4a, mp3, wav, mp4, …)")
    ap.add_argument("--klient", default="Klient", help="jak označit klienta (default: Klient)")
    ap.add_argument("--obchodnik", default="Obchodník", help="jak označit obchodníka (default: Obchodník)")
    ap.add_argument("--slug", help="krátký název do jména souboru (default: z názvu nahrávky)")
    ap.add_argument("--datum", default=dt.date.today().isoformat(), help="YYYY-MM-DD (default: dnes)")
    ap.add_argument("--model", default=DEFAULT_MODEL, help=f"model Gemini (default: {DEFAULT_MODEL})")
    args = ap.parse_args()

    if not args.nahravka.exists():
        sys.exit(f"Soubor neexistuje: {args.nahravka}")
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", args.datum):
        sys.exit("Datum musí být ve tvaru YYYY-MM-DD.")
    if not shutil.which("ffmpeg"):
        sys.exit("Chybí ffmpeg — nainstaluj ho: brew install ffmpeg (Mac) / winget install ffmpeg (Windows).")

    nacti_env()
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        sys.exit("Chybí GEMINI_API_KEY v .env.local — návod v knowledge/prepis-hovoru.md")

    try:
        from google import genai
        from google.genai import types
    except ImportError:
        sys.exit("Chybí knihovna: pip3 install google-genai")

    slug = slugify(args.slug or args.nahravka.stem)
    out = INBOX / f"{args.datum}_{slug}.txt"
    if out.exists():
        sys.exit(f"Přepis už existuje: {out.relative_to(ROOT)}")
    INBOX.mkdir(parents=True, exist_ok=True)

    t0 = time.time()
    client = genai.Client(api_key=api_key)
    with tempfile.TemporaryDirectory() as tmp:
        audio = zmensi(args.nahravka, Path(tmp))
        kusy = rozdel(audio, Path(tmp))
        print(f"Přepisuju {len(kusy)} × {KUS // 60} min ({args.model})…", flush=True)

        def jeden(i_kus):
            i, kus = i_kus
            return prepis_kusu(client, types, args.model, kus,
                               prompt(args.obchodnik, args.klient, i + 1, len(kusy)))

        with ThreadPoolExecutor(max_workers=SOUBEZNE) as ex:
            budouci = [ex.submit(jeden, (i, k)) for i, k in enumerate(kusy)]
            radky = []
            for i, b in enumerate(budouci):
                try:
                    radky += posun(b.result(), i * KUS)
                except RuntimeError as e:
                    sys.exit(f"Kus {i + 1} z {len(kusy)} se nepřepsal ({e}). Nic jsem neuložil — "
                             "zkus to za pár minut znovu.")

    if len(radky) < 3:
        sys.exit("Přepis je podezřele krátký — je v nahrávce slyšet hovor?")

    out.write_text("\n".join(radky) + "\n", encoding="utf-8")
    print(f"Hotovo za {time.time() - t0:.0f} s — {len(radky)} replik → {out.relative_to(ROOT)}")
    print("Další krok: v Claude Code napiš /analyzuj-call")


if __name__ == "__main__":
    main()
