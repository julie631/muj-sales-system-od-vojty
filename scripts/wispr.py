#!/usr/bin/env python3
"""
Přepis hovoru z Wispr Flow → data/sales-coach/transcripts/_inbox/ (formát pro /analyzuj-call).

Wispr Flow nahraje schůzku v počítači a sám ji přepíše i s časy a mluvčími. Tenhle skript
přepis přečte z jeho dat v počítači (nic nikam neposílá) a uloží ho jako „[mm:ss] Mluvčí: text".

Použití:
  python3 scripts/wispr.py                         posledních 15 schůzek s hotovým přepisem
  python3 scripts/wispr.py --posledni --ukaz       ukázka replik každého mluvčího (nic neukládá)
  python3 scripts/wispr.py --posledni --ja 2 --jmeno Jana --klient Klára --slug studio-lotos
  python3 scripts/wispr.py --cislo 3 …             schůzka číslo 3 ze seznamu místo poslední

Volby:
  --ja N            který „Mluvčí N" jsi ty (Claude to pozná z obsahu, viz --ukaz)
  --jmeno JMÉNO     tvoje jméno v přepisu (default: Obchodník)
  --klient JMÉNO    jméno klienta pro hlavního druhého mluvčího (default: Klient)
  --slug NÁZEV      název do jména souboru (default: z názvu schůzky ve Wispru)
  --datum Y-M-D     datum hovoru (default: den schůzky)
  --prepsat         přepiš existující soubor
  --do SLOŽKA       ulož jinam než do _inbox

Wispr čísluje mluvčí („Mluvčí 1", „Mluvčí 2"). Jména, která mluvčím přiřadí sám, bývají
často prohozená, proto se používají jen ta, která jsi ve Wispru nastavil(a) ručně.
"""

import argparse
import json
import os
import re
import sqlite3
import sys
import unicodedata
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INBOX = ROOT / "data" / "sales-coach" / "transcripts" / "_inbox"


def wispr_slozka() -> Path:
    kandidati = [Path.home() / "Library" / "Application Support" / "Wispr Flow"]  # Mac
    for prom in ("APPDATA", "LOCALAPPDATA"):                                       # Windows
        if os.environ.get(prom):
            kandidati.append(Path(os.environ[prom]) / "Wispr Flow")
    kandidati.append(Path.home() / ".config" / "Wispr Flow")
    for k in kandidati:
        if (k / "flow.sqlite").exists():
            return k
    sys.exit("Wispr Flow v tomhle počítači nenacházím. Je nainstalovaný a máš v něm aspoň "
             "jednu nahranou schůzku? (wisprflow.ai)")


def pripoj(db: Path) -> sqlite3.Connection:
    """Jen čtení. Když Wispr neběží, režim ro selže (chybí soubor -shm) → immutable."""
    uri = db.resolve().as_uri()
    for parametry in ("?mode=ro", "?mode=ro&immutable=1"):
        try:
            con = sqlite3.connect(uri + parametry, uri=True, timeout=5)
            con.execute("select 1 from Meetings limit 1")
            return con
        except sqlite3.OperationalError:
            continue
    sys.exit("Databázi Wispru se nepodařilo otevřít. Zkus Wispr zavřít a pustit skript znovu.")


def cas_vytvoreni(text: str):
    """'2026-10-06 18:55:51.674 +00:00' → místní datetime."""
    m = re.match(r"(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}:\d{2})", text or "")
    if not m:
        return None
    return datetime.strptime(" ".join(m.groups()), "%Y-%m-%d %H:%M:%S").replace(
        tzinfo=timezone.utc).astimezone()


def schuzky(con, limit=15):
    rows = con.execute(
        """select id, title, createdAt, recordedMs, speakerMap from Meetings
           where isDeleted = 0 and finalized = 1 and refineStatus = 'complete'
           order by createdAt desc limit ?""", (limit,)).fetchall()
    out = []
    for mid, title, created, rec, smap in rows:
        out.append({"id": mid, "nazev": (title or "").strip() or "Bez názvu",
                    "kdy": cas_vytvoreni(created), "minut": round((rec or 0) / 60000),
                    "smap": smap})
    return out


def sekundy(stamp) -> int:
    try:
        casti = [int(p) for p in str(stamp).split(":")]
    except ValueError:
        return 0
    t = 0
    for p in casti:
        t = t * 60 + p
    return t


def format_cas(t: int) -> str:
    return f"{t // 3600}:{t % 3600 // 60:02d}:{t % 60:02d}" if t >= 3600 else f"{t // 60:02d}:{t % 60:02d}"


def rucni_jmena(smap) -> dict:
    """Jména mluvčích, která uživatel ve Wispru přiřadil sám (ne Wisprův odhad)."""
    try:
        d = json.loads(smap or "{}")
    except ValueError:
        return {}
    lide = d.get("people") or {}
    out = {}
    for sid, prirazeni in (d.get("assignments") or {}).items():
        uid = (prirazeni or {}).get("user")
        if uid and (lide.get(uid) or {}).get("name"):
            out[str(sid)] = lide[uid]["name"].strip()
    return out


def repliky(slozka: Path, schuzka: dict) -> list:
    """Úseky přepisu sloučené do replik: [(sekundy, id_mluvčího, jméno_nebo_None, text)]."""
    cesta = slozka / "meetings" / schuzka["id"] / "refined.ndjson"
    if not cesta.exists():
        sys.exit("Schůzka nemá hotový přepis (refined.ndjson chybí). Počkej, až ho Wispr dodělá.")
    jmena = rucni_jmena(schuzka["smap"])
    out = []
    for radek in cesta.read_text(encoding="utf-8").splitlines():
        try:
            seg = json.loads(radek)
        except ValueError:
            continue
        text = re.sub(r"\s+", " ", seg.get("text") or "").strip()
        if not text:
            continue
        mluvci = seg.get("speaker") or {}
        sid = str(mluvci.get("id", "?"))
        jmeno = (mluvci.get("name") or "").strip() or jmena.get(sid)
        if out and out[-1][1] == sid:
            t, s, j, predchozi = out[-1]
            out[-1] = (t, s, j, predchozi + " " + text)
        else:
            out.append((sekundy(seg.get("timestamp")), sid, jmeno, text))
    return out


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFD", text)
    text = "".join(c for c in text if unicodedata.category(c) != "Mn")
    text = re.sub(r"[^a-zA-Z0-9]+", "-", text).strip("-").lower()
    return text or "hovor"


def main() -> None:
    ap = argparse.ArgumentParser(description="Přepis hovoru z Wispr Flow do _inbox.")
    kterou = ap.add_mutually_exclusive_group()
    kterou.add_argument("--posledni", action="store_true", help="poslední schůzka s hotovým přepisem")
    kterou.add_argument("--cislo", type=int, help="číslo schůzky ze seznamu")
    ap.add_argument("--ukaz", action="store_true", help="jen ukázka replik mluvčích, nic neukládat")
    ap.add_argument("--ja", help="který „Mluvčí N\" jsi ty")
    ap.add_argument("--jmeno", default="Obchodník", help="tvoje jméno v přepisu")
    ap.add_argument("--klient", default="Klient", help="jméno klienta")
    ap.add_argument("--slug", help="název do jména souboru")
    ap.add_argument("--datum", help="YYYY-MM-DD (default: den schůzky)")
    ap.add_argument("--prepsat", action="store_true", help="přepiš existující soubor")
    ap.add_argument("--do", dest="cil", type=Path, help="ulož jinam než do _inbox")
    args = ap.parse_args()

    slozka = wispr_slozka()
    con = pripoj(slozka / "flow.sqlite")
    seznam = schuzky(con)
    con.close()
    if not seznam:
        sys.exit("Ve Wispru zatím není žádná schůzka s hotovým přepisem.")

    if not args.posledni and args.cislo is None:
        print("Schůzky s hotovým přepisem (nejnovější nahoře):")
        for i, s in enumerate(seznam, 1):
            kdy = s["kdy"].strftime("%d. %m. %H:%M") if s["kdy"] else "?"
            print(f"  {i:>2}. {kdy}  {s['minut']:>3} min  {s['nazev']}")
        print("\nVyber: python3 scripts/wispr.py --cislo N --ukaz   (nebo --posledni)")
        return

    if args.cislo is not None and not 1 <= args.cislo <= len(seznam):
        sys.exit(f"Číslo musí být 1 až {len(seznam)} — vypiš seznam bez voleb.")
    schuzka = seznam[0] if args.posledni else seznam[args.cislo - 1]
    data = repliky(slozka, schuzka)
    if not data:
        sys.exit("Přepis je prázdný.")

    slova = {}
    for _, sid, _, text in data:
        slova[sid] = slova.get(sid, 0) + len(text.split())
    celkem = sum(slova.values()) or 1
    poradi = sorted(slova, key=lambda s: -slova[s])

    kdy = schuzka["kdy"].strftime("%d. %m. %Y %H:%M") if schuzka["kdy"] else "?"
    print(f"„{schuzka['nazev']}\" — {kdy}, {schuzka['minut']} min, {len(data)} replik")

    if args.ukaz:
        for sid in poradi:
            ukazky = [t for _, s, _, t in data if s == sid][:3]
            print(f"\nMluvčí {sid} — {slova[sid] * 100 // celkem} % slov:")
            for u in ukazky:
                print(f"   „{u[:140]}{'…' if len(u) > 140 else ''}\"")
        print("\nAž víš, kdo jsi ty: --ja N --jmeno Tvoje-jméno --klient Jméno-klienta --slug nazev")
        return

    if args.ja and args.ja not in slova:
        sys.exit(f"Mluvčí {args.ja} v přepisu není. Jsou tam: {', '.join(poradi)}.")
    ostatni = [s for s in poradi if s != args.ja]

    def kdo(sid, jmeno):
        if args.ja:
            if sid == args.ja:
                return args.jmeno
            if ostatni and sid == ostatni[0]:
                return args.klient
        return jmeno or f"Mluvčí {sid}"

    radky = [f"[{format_cas(t)}] {kdo(sid, jmeno)}: {text}" for t, sid, jmeno, text in data]

    datum = args.datum or (schuzka["kdy"].date().isoformat() if schuzka["kdy"] else
                           datetime.now().date().isoformat())
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", datum):
        sys.exit("Datum musí být ve tvaru YYYY-MM-DD.")
    cil = args.cil or INBOX
    cil.mkdir(parents=True, exist_ok=True)
    out = cil / f"{datum}_{slugify(args.slug or schuzka['nazev'])}.txt"
    if out.exists() and not args.prepsat:
        sys.exit(f"Soubor už existuje: {out} (přidej --prepsat)")
    out.write_text("\n".join(radky) + "\n", encoding="utf-8")

    podil = ", ".join(f"{kdo(s, None)} {slova[s] * 100 // celkem} %" for s in poradi)
    print(f"Uloženo → {out.relative_to(ROOT) if out.is_relative_to(ROOT) else out}")
    print(f"Podíl slov: {podil}")
    if not args.ja:
        print("Pozor: mluvčí jsou jen čísla — doplň --ja N (zjistíš přes --ukaz).")
    print("Další krok: v Claude Code napiš /analyzuj-call")


if __name__ == "__main__":
    main()
