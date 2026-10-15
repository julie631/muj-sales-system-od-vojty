# Jak hovor nahrát a přepsat

Rozbor stojí na přepisu. Čím lepší přepis (kdo mluví + časy), tím přesnější rozbor.

**Cílový formát** — jeden řádek na repliku, na začátku čas, pak mluvčí:

```
[00:05] Obchodník: Dobrý den, slyšíme se dobře?
[00:08] Klára: Slyším, dobrý den.
[04:12] Obchodník: Když se podíváte na minulý týden, kolik termínů vám zůstalo volných?
```

- Obchodnice je v přepisu **„Obchodník"** (nebo vlastní jméno — pak ho přidej do
  `lib/config.ts` → `repNames`, ať se její repliky v aplikaci zvýrazní).
- Klient může být „Klient" nebo křestní jméno.
- Soubor pojmenuj `{YYYY-MM-DD}_{slug}.txt` (např. `2026-10-03_studio-lotos.txt`) a dej ho do
  `data/sales-coach/transcripts/_inbox/`. Pak v Claude Code napiš `/analyzuj-call`.

---

> **Nejjednodušší je Wispr Flow.** Hovor nahraje a sám přepíše, `python3 scripts/wispr.py`
> ho pak převede do `_inbox/`. Postup krok za krokem je v `PRUVODCE.md` (cesta A).

## 1. Nahrání

- **Online schůzka** (Google Meet, Zoom, Teams): **Wispr Flow** (doporučeno, nahraje a přepíše
  cokoli v počítači), nahrávání přímo v aplikaci, nebo nástroj typu
  Fathom / tl;dv, který hovor nahraje a rovnou udělá přepis s mluvčími.
- **Telefon:** nahrávání hovorů v telefonu nebo hovor přes počítač (Meet/WhatsApp) a nahrávat tam.
- **Řekni to klientovi.** Stačí na začátku: *„Nevadí, když si to nahraju, ať si nemusím psát
  poznámky?"* Skoro nikdo neodmítne a je to fér.

## 2. Přepis — tři cesty

### A) Nástroj, který přepis umí sám (nejjednodušší)

Fathom, tl;dv, Meet nebo Zoom s přepisem: stáhni přepis jako text, zkontroluj, že jsou u replik
jména a časy, a ulož ho do `_inbox/`. Formát nemusí sedět na znak — Claude si poradí, když je
jasné, kdo mluví.

### B) Skript `scripts/prepis.py` (Gemini — rychlé, přesné na češtinu)

Jednorázově:

```bash
pip3 install google-genai
brew install ffmpeg
```

Klíč si vytvoř na <https://aistudio.google.com/apikey> a dej ho do `.env.local`:

```
GEMINI_API_KEY=…
```

Pak:

```bash
python3 scripts/prepis.py ~/Downloads/nahravka.m4a --klient Klára --slug studio-lotos
```

Skript nahrávku zmenší, rozdělí na pětiminutové kusy (hodinový hovor má hotový zhruba za
minutu), pošle je do Gemini, vrátí přepis ve formátu výš a uloží ho do
`data/sales-coach/transcripts/_inbox/{dnešní datum}_{slug}.txt`. Datum jde změnit `--datum 2026-10-01`.

> ⚠️ **Soukromí:** ve **free** tarifu může Google obsah použít ke zlepšování svých služeb.
> Pro hovory s klienty je bezpečnější placený tarif (u krátkých hovorů jde o koruny měsíčně),
> nebo cesta C.

### C) Lokálně a zdarma — whisper.cpp (nic neopustí počítač)

```bash
brew install whisper-cpp ffmpeg
# model (~3 GB, nejlepší na češtinu; na slabším Macu použij medium)
curl -L -o ~/whisper-large-v3.bin https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large-v3.bin

ffmpeg -i nahravka.m4a -ar 16000 -ac 1 -c:a pcm_s16le nahravka.wav
whisper-cli -m ~/whisper-large-v3.bin -l cs -f nahravka.wav -otxt
```

Whisper neoznačuje mluvčí — před repliky je potřeba dopsat „Obchodník:" / „Klient:"
(u 30minutového hovoru ~5 minut práce, nebo to nech na Claudovi: *„doplň mluvčí do přepisu
v _inbox"*). 30 minut hovoru = asi 5–7 minut přepisu na Macu s M1.

---

## Časté potíže

| Problém | Řešení |
|---|---|
| Přepis je v angličtině | Whisper: chybí `-l cs`. Gemini: zkontroluj, že je nahrávka slyšet. |
| Spousta „[nesrozumitelné]" | Tichý mikrofon nebo hluk. Příště sluchátka s mikrofonem. |
| Jména a odborné výrazy zkomolené | Nevadí — Claude je při rozboru pochopí z kontextu. |
| Chybí časy | Rozbor jde udělat i bez nich, citace pak budou `[replika 12]` místo `[04:12]`. |
