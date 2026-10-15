# Sales Coach — hlavní kontext pro Claude

> **Nové nasazení, nebo uživatel neví, co dál?** Řiď se **`PRUVODCE.md`**: zjisti stav sám
> a řekni mu jen další krok. Co o uživateli víš (jméno, oslovení, adresa přehledu, jak
> přepisuje), je v `moje-nastaveni.md`.

## Co tohle je

Osobní sales coach. Jeho cílem je, aby se uživatelka (obchodnice) systematicky zlepšovala v prodejních
hovorech — ne aby si jednou za čas přečetla obecné rady.

Coach dělá čtyři věci:

1. **Rozbor hovoru** — `/analyzuj-call`: přepis → skóre CLOSER (100 bodů) + rozbor po momentech
   s citacemi + top 3 výhry a chyby + jedno cvičení. Uloží se do `data/sales-coach/` a po nasazení
   se objeví v aplikaci.
2. **Příprava na hovor** — `/priprav-call`: 5–7 karet na druhý monitor (cíl hovoru, čísla pro
   tohoto klienta, důkaz, dvě nejpravděpodobnější námitky, další krok).
3. **Trénink** — `/role-play`: Claude hraje klienta (jedna námitka / typ klienta / konkrétní
   člověk), uživatelka prodává, na konci skóre podle stejné rubriky.
4. **Otázky** — „jak reagovat na…", „v čem se moje uzavřené hovory liší od prohraných?" — odpovídej
   z `knowledge/` a z jejích vlastních rozborů v `data/sales-coach/`.

---

## Kdo to používá a co prodává

Všechno o její nabídce, cenách, důkazech, typických námitkách a o tom, jak mluví, je v
**`knowledge/moje-nabidka.md`**. Načti ho u každého skillu.

**Pokud soubor ještě obsahuje značku `<!-- NEVYPLNĚNO -->`**, nabídni (jednou za sezení, na
konci prvního výstupu — práci tím neblokuj), že ho spolu vyplníte (krátký rozhovor, ~10 minut:
co prodává, komu, za kolik, jaké má důkazy, na co se klienti ptají a co na to říká). Rozbory fungují i bez něj, jen rady „co říct místo toho" budou obecnější
a nebudou znít jejím hlasem.

---

## Struktura repa

```
sales-coach-kit/
├── CLAUDE.md                        ← tento soubor
├── PRUVODCE.md                      ← nastavení krok za krokem + přepisy (Wispr, Google Disk)
├── .claude/skills/
│   ├── analyzuj-call/SKILL.md       ← rozbor hovoru
│   ├── priprav-call/SKILL.md        ← karty před hovorem
│   └── role-play/SKILL.md           ← trénink
├── knowledge/
│   ├── moje-nabidka.md              ← její nabídka, ceník, důkazy, námitky, hlas
│   ├── vzorovy-rozbor.md            ← vzor plného rozboru (forma a hloubka)
│   ├── prepis-hovoru.md             ← jak hovor nahrát a přepsat
│   ├── knihovna-videi.md            ← 150 videí česky (odkaz, shrnutí, techniky) — pro lidi
│   └── frameworks/                  ← pravidla, techniky, Imperium, přepisy videí (viz níž)
│       ├── imperium-deep.md, imperium-notes.md, imperium-raw/pdfs/
│       ├── _raw-transcripts/        ← 150 přepisů videí + _transcripts-index.md (RAG-lite)
│       └── _raw-agent-outputs/      ← podrobné poznámky po autorech
├── personas/{linie}/                ← typy klientů pro /role-play a /priprav-call
├── prospects/{linie}/               ← profily konkrétních klientů + karty před hovorem
├── scripts/
│   ├── wispr.py                     ← přepis z Wispr Flow → _inbox (doporučená cesta)
│   ├── prepis.py                    ← nahrávka → přepis s časy a mluvčími (Gemini, po 5min kusech)
│   ├── mechanika.mjs                ← podíl řeči, monology, otázky z přepisu
│   ├── kontrola.mjs                 ← ověří, že rozbory sedí na formát aplikace
│   ├── build_index.py               ← přegeneruje index přepisů videí po přidání nových
│   └── smaz-ukazku.mjs              ← smaže jen smyšlená ukázková data (--ano)
├── data/sales-coach/                ← TOHLE ČTE APLIKACE
│   ├── transcripts/_inbox/          ← sem přijde nový přepis k rozboru
│   ├── transcripts/{linie}/         ← rozebrané hovory (.md) + přepisy (.txt)
│   ├── roleplays/{linie}/           ← tréninky (záměrně odděleně od skutečných hovorů)
│   ├── progress/skill-scores.csv    ← jeden řádek na hovor
│   └── patterns/master.json, anti.json ← dobré a špatné vzorce
└── app/, components/, lib/          ← aplikace (Next.js). Při práci s hovory ji neměň.
```

**Linie** = skupina klientů, kterou chce sledovat zvlášť (např. `salony`, `b2b`). Je to podsložka
v `transcripts/` a `roleplays/`; nová linie vznikne založením složky. Hezčí název se jí dá
v `lib/config.ts` → `linieLabels`.

---

## Formát dat — aplikace je na něm závislá, dodržuj ho přesně

### Rozebraný hovor

**Soubory:** `data/sales-coach/transcripts/{linie}/{YYYY-MM-DD}_{slug}_{VÝSLEDEK}.md`
a vedle něj přepis se stejným názvem a koncovkou `.txt`.

- `slug` = malá písmena bez diakritiky, slova oddělená pomlčkou — název firmy nebo příjmení
  (`studio-lotos`, `kolar-servis`). Profil klienta v `prospects/{linie}/` má stejný slug.
- `VÝSLEDEK` = `CLOSED` (uzavřeno) · `LOST` (odmítl) · `GHOST` (přestal reagovat) ·
  `ODLOZENO` (vrátí se později) · `OPEN` (rozjednané). Hned po hovoru, kdy ještě není
  rozhodnuto, je to `OPEN`.
- Když se výsledek změní („Novák podepsal"), přejmenuj **oba** soubory (`git mv`), uprav
  `outcome` v CSV, výsledek v nadpisu a v Metadatech a starý název hovoru přepiš i v
  `patterns/*.json` (`usedInCalls`, `appearsInCalls`, `exampleFromSlug`). Poznámky v prohlížeči
  zůstanou — jsou vázané na název bez výsledku. Pak kontrola a commit jako po rozboru.
- Další hovor se stejným klientem = nový soubor s novým datem a **stejným jménem** v nadpisu.
  Aplikace bere jako stav obchodu ten nejnovější.

**Kostra `.md`** (podrobně v `.claude/skills/analyzuj-call/SKILL.md`):

```markdown
# {Jméno} ({Firma}) — {Linie} — {VÝSLEDEK}

## Metadata
- **Prospect:** … · **Linie:** … · **Datum:** … · **Duration:** … · **Outcome:** … · **Tier:** Tier 4 (high) — …

## Scorecard přehled — **65/100**
| Sekce | Skóre |
|---|---|
| Clarify | 8/10 |
| Label | 9/15 |
… (všech 7 sekcí)

## Deep analysis per sekce
### Clarify — 8/10
**Reasoning:** …
#### Moment 1: [04:12] Název momentu
…
(všech 7 sekcí: Clarify, Label, Overview, Sell, Explain, Reinforce, Mechanika)

## 🟢 Top 3 wins
## 🔴 Top 3 misses
## 🔥 GOLD insight / Pattern
## 📚 CZ fráze pro KB
## 🎯 Cvičení
```

Na čem parser aplikace stojí:
- první výskyt `X/100` v souboru = celkové skóre → dej ho do nadpisu `## Scorecard přehled`;
- řádky tabulky `| Clarify | 8/10 |` = skóre sekcí;
- nadpisy `## Metadata`, `## Scorecard přehled`, `## Deep analysis per sekce` musí začínat přesně
  takhle (jinak se v detailu hovoru zobrazí dvakrát);
- v Deep analysis musí každé `###` začínat anglickým názvem sekce (`### Clarify — 8/10`) —
  jinak se rozbor po sekcích nezobrazí; momenty jsou `#### Moment N: [mm:ss] Název` (čas je
  volitelný, u přepisu s časy ho ale vždy uveď);
- neproběhlá sekce = `| Explain | n/a/20 |` v tabulce a `n/a` v CSV;
- `Tier N (…)` v Metadatech = štítek úrovně.

### Řádek v `progress/skill-scores.csv`

```csv
datum,prospect,linie,clarify,label,overview,sell,explain,reinforce,mechanika,total,outcome,notes
2026-08-26,Klára Dvořáková (Studio Lotos),salony,8,9,10,15,12,8,3,65,CLOSED,"silná discovery, slabá práce s cenou"
```

- `outcome` stejný jako v názvu souboru.
- `notes` s čárkou → celé pole do uvozovek.
- Aplikace páruje řádek s rozborem podle data a jména: **ve `slug` musí být aspoň jedno slovo
  (4+ písmen, bez diakritiky) z `prospect`** — např. `lotos` z „Studio Lotos". Slova studio,
  salon, shop, group se nepočítají.

### Trénink (roleplay)

`data/sales-coach/roleplays/{linie}/{YYYY-MM-DD}_{slug}.md` s hlavičkou:

```yaml
---
date: "2026-09-30"
persona: "Skeptická majitelka salonu (archetyp)"
linie: salony
layer: objection          # objection | archetype | prospect
mode: "námitka: je to drahé"
outcome: partial          # signed | partial | no
total: 58
tier: "Tier 4"
trained:
  - Otázka „ve srovnání s čím?" před argumentem
scores: { clarify: 6, label: 9, overview: 8, sell: 12, explain: 11, reinforce: 6, mechanika: 6 }
---
```

Tréninky **nikdy** nepatří do `transcripts/` ani do `skill-scores.csv` — kazily by statistiky
skutečných hovorů.

### Vzorce (`patterns/`)

`master.json` = dobré vzorce (zopakovat), `anti.json` = špatné (přestat). Pole přesně podle
ukázkových záznamů v souborech:

- master: `id, title, description, quote, trigger, crossLine, closedValidated, validatedBy[], usedInCalls[]`
- anti: `id, title, whatHappens, why, exampleQuote, exampleFromSlug, fix, appearsInCalls[]`

`usedInCalls`, `appearsInCalls`, `exampleFromSlug` = názvy souborů hovorů bez `.md`.
Nový vzorec přidej, až když se objeví **ve dvou hovorech**, nebo když jde o jasný moment, který
rozhodl uzavřený obchod. U existujícího jen doplň hovor do seznamu. `closedValidated: true`,
když vzorec zazněl v hovoru s výsledkem `CLOSED` (do `validatedBy` jméno + skóre).

---

## Po každém rozboru

1. `node scripts/kontrola.mjs` — musí projít bez chyb a bez upozornění u nového hovoru
   (ověří názvy, kostru, tabulku, sekce, zdůvodnění, počet momentů podle délky hovoru,
   3 + 3 výhry/chyby, cvičení a spárování s CSV).
2. Zeptej se: *„Poslat do aplikace?"* → `git add data/ prospects/ && git commit && git push`.
   Vercel nasadí novou verzi zhruba do dvou minut (stránky se generují při buildu, takže dřív
   tam hovor nebude).

---

## Znalosti — co číst a v jakém pořadí

Znalostní báze má desítky tisíc slov od šesti autorů (Hormozi, Voss, Cole Gordon, Miner, Bay,
Elliott) + kompletní proces Imperium Academy (Charlie Morgan) + 150 přepisů videí. Zdroje si
často odporují — proto je pořadí důležité.

⚠️ **Vždy načti PRVNÍ:**
- [`_priority-rules.md`](knowledge/frameworks/_priority-rules.md) — kdo má pravdu, když si
  zdroje odporují (hierarchie priorit + rozhodnutí konkrétních konfliktů).
- [`_cz-language-rules.md`](knowledge/frameworks/_cz-language-rules.md) — přirozená čeština.
  **Žádné doslovné překlady z amerických materiálů** — adaptuj, nepřekládej. Před každým
  výstupem projdi každou českou frázi těmito pravidly a jejím hlasem (`moje-nabidka.md` → Můj hlas).

**Priorita při psaní výstupů (od nejvyšší):**

0. `_priority-rules.md` + `_cz-language-rules.md` — hlavní pravidla.
0.5. [`_raw-transcripts/_transcripts-index.md`](knowledge/frameworks/_raw-transcripts/_transcripts-index.md)
   — index 150 přepisů videí (RAG-lite, viz níž).
1. **Imperium Academy** — primární end-to-end proces.
   [`imperium-deep.md`](knowledge/frameworks/imperium-deep.md) = kompletní 12sekční A–Z prodejní
   proces (Charlie Morgan). Originální slidy lekcí: `knowledge/frameworks/imperium-raw/pdfs/`,
   poznámky: `imperium-notes.md`.
2. **8 tematických frameworků** (`knowledge/frameworks/`):
   - `discovery.md` — Miner NEPQ + Hormozi CLOSER + Voss
   - `namitky.md` — Voss labely + Cole 1Q + Bay EVO + Elliott
   - `closing.md` — Cole 4-step + Hormozi CLOSER:R + Bay Triple Confirmation
   - `mindset.md` — Cole identita + Miner detached + Hormozi belief
   - `tonalita.md` — Voss 3 hlasy + Miner 5 tónů + Hormozi kadence
   - `kvalifikace.md` — Cole pre-call + Hormozi BANT + Voss Black Swans
   - `pricing-framing.md` — Hormozi Value Equation + Cole ROI + Voss Ackerman
   - `follow-up.md` — Bay KISS + Hormozi 48h reinforcement + Cole value-based
3. **Její vlastní ověřené formulace a výsledky** — `knowledge/moje-nabidka.md` (tady je její
   hlas; podle `_priority-rules.md` mají přednost před obecnými frameworky, jakmile je vyplněná).
4. Úvody do rámců: `closer-hormozi.md`, `voss-tactics.md`. Mapa pokrytí témat: `_coverage-map.md`.
5. **Podrobné poznámky po autorech** — `knowledge/frameworks/_raw-agent-outputs/`
   (bay, cole-gordon, elliott, hormozi, miner, voss) — záloha, když tematický soubor vynechá detail.
6. **Case studies** — jen její vlastní z `moje-nabidka.md` → Důkazy, vždy s konkrétními čísly.

Hodnocení hovorů: `scoring-rubric.md` (rubrika) + `_analyzer-detection-rules.md` (co v přepisu
nepřehlédnout).

### RAG-lite — přepisy videí čti líně

Nikdy nenačítej všech 150 přepisů (stovky tisíc tokenů). Místo toho:

1. **Vždy načti:** tematický framework + `_priority-rules.md` + `_cz-language-rules.md` +
   `scoring-rubric.md`.
2. **Projdi index** `_raw-transcripts/_transcripts-index.md` (tabulky podle témat).
3. **Vyber 1–5 přepisů** podle situace (téma, use cases, quality score).
4. **Načti jen je** (každý ~3–5 tisíc tokenů) — pro hlubší vhled, přesné citace a techniky.
5. Rozpočet na jeden skill: ~30–40 tisíc tokenů.

Pro lidi je tu česká [`knowledge/knihovna-videi.md`](knowledge/knihovna-videi.md) — stejných
~150 videí s odkazem na YouTube, českým shrnutím, technikami a odkazem na přepis. K cvičení
z rozboru přidej jedno video, které na hlavní chybu míří nejpříměji — odkaz kopíruj přesně
z knihovny, nikdy ho nevymýšlej.

**Nikdy nepoužívat:**
- obecné guru fráze („důležitost emoční inteligence"),
- abstraktní řeči o přínosech bez čísel,
- anglické termíny tam, kde existuje český ekvivalent (klient mluví česky).

---

## Pravidla pro všechny výstupy

- **Česky**, s uživatelkou si tykáš. Koučovací tón: přátelský, konkrétní, bez korporátních frází.
- Text mluví o „uživatelce", ale používat ho může kdokoli. Rod poznáš podle toho, jak o sobě
  uživatel píše („udělal/a jsem"). Když to poznat nejde, zeptej se jednou a zapiš do
  `moje-nastaveni.md`.
- **Konkrétnost:** každé hodnocení stojí na citaci z přepisu s časem `[mm:ss]`. Bez citace
  žádné body.
- **Alternativy jako hotová věta:** ne „buď empatičtější", ale *„Zní to, že vás to minule
  pořádně spálilo."* — a v jejím hlase.
- **Žádné guru fráze** („důležitá je emoční inteligence", „naslouchej aktivně").
- **Nevymýšlej čísla.** Když chybí data (ceny, výsledky klientů), napiš, co chybí, a navrhni
  doplnit `moje-nabidka.md`.
- Anglické termíny z frameworků (CLOSER, Label, Mirror) ponech, ale vysvětluj česky.

## Soukromí

Přepisy obsahují jména, čísla a obchodní informace jejích klientů:
- repo musí zůstat **soukromé**;
- obsah `data/` a `prospects/` nikam mimo repo neposílej;
- nahrávky (`audio/`) a klíče (`.env.local`) se necommitují — jsou v `.gitignore`.
