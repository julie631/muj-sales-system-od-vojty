---
status: ingested
phase: 1.5 complete (Week 4 L3 done)
---

# Imperium Academy — Sales Notes

✅ **L4.3 "Imperium Conversion Playbook" ingested.** Kompletní 68-stránkový A-Z sales process v `imperium-deep.md`.

**Quick reference:** Otevři [imperium-deep.md](imperium-deep.md) pro full kompletní 12-section Charlie Morgan sales script + CZ adaptace.

## Co je ingested

- Week 4 L4.3: Imperium Conversion Playbook (68 stránek PDF) → `imperium-deep.md`
- Source PDF: `imperium-raw/pdfs/W4-L3-Imperium-Conversion-Playbook.pdf`

## Co zatím NEní ingested (future ingest dle priority)

- W4 L4.3 PDF #2: Imperium Conversion Script (separátní PDF s konkrétními scripty)
- W4 L4.2: Sales Bedrock (foundation principy)
- W4 L4.5: Conquering Objections Part 1
- W4 L4.6: Conquering Objections Part 2
- W4 L4.7: Oscillations of Doubt (mindset)
- W4 L4.8: Six Figure Secret Sauce
- W5: Booking Appointments (outreach + appointment setting)

**Pro fázi 2 (až bude time):** další lekce lze doplnit stejným postupem.

## Plán naplnění

1. Další lekce lze doplnit stejným postupem jako L4.3 (PDF lekcí jsou v `imperium-raw/pdfs/`)
2. AI prochází lekce přes `mcp__Claude_in_Chrome__*` tools:
   - `navigate` → URL lekcí
   - `read_page` → extrakt textu
   - `screenshot` → pokud je v lekci tabulka/obrázek důležitý
3. AI extrahuje top koncepty per téma:
   - `imperium-discovery.md` — discovery patterns, otázky, jak hluboko jít
   - `imperium-namitky.md` — námitky handling, scripts, reframes
   - `imperium-closing.md` — closing techniky, commitment patterns
   - `imperium-mindset.md` — sales mindset, identity, jak nepadat do "convincing" módu
   - `imperium-tonalita.md` — tonality, pacing, ticho jako nástroj
4. Cross-ref s existujícími frameworky (CLOSER, Voss):
   - Kde Imperium říká **silnější věc** než Hormozi/Voss → updateuj scoring-rubric.md
   - Kde Imperium **doplňuje** → přidat jako sekci
   - Kde Imperium **odporuje** → diskutovat, rozhodnout

## Až bude tento soubor naplněn

- Skill `/analyzuj-call` automaticky načítá všechny `imperium-*.md` při hodnocení
- Skill `/priprav-call` cituje Imperium techniky v battle cards
- Skill `/role-play` používá Imperium-specific námitky a tonality

## Co se nestane

- AI nepošle Imperium content nikam mimo `knowledge/frameworks/`
- `imperium-raw/pdfs/` = originální slidy lekcí W4–W5 (PDF) — součást repa, čti je přímo, když potřebuješ detail lekce
