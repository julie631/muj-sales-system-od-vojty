# Sales Coach

Osobní trenér prodejních hovorů. Má dvě části:

1. **Coach v Claude Code** — rozebere nahraný hovor, připraví tě na další a trénuje s tebou
   námitky. Každý hovor dostane skóre podle frameworku **CLOSER** (7 sekcí, 100 bodů), rozbor
   po momentech s citacemi z přepisu, top 3 výhry a chyby a jedno cvičení na další týden.
2. **Aplikace** (web) — přehled všech rozborů: úspěšnost, trend skóre, slabá místa, dobré
   a špatné vzorce, tréninky a vlastní poznámky.

> V aplikaci jsou zatím **čtyři smyšlené ukázkové hovory a jeden trénink**, ať je vidět, jak to
> vypadá. Hovor *Martin Kolář* je rozebraný v plné hloubce — takhle vypadá skutečný rozbor;
> ostatní ukázky jsou zkrácené. Až budeš mít vlastní, smaž je (viz „Smazat ukázku" níž).

---

## Coach — jak se používá

Potřebuješ [Claude Code](https://claude.com/claude-code) a otevřenou složku tohoto repa.

**Poprvé?** Na GitHubu si přes zelené **Use this template** udělej vlastní soukromou kopii,
otevři ji v Claude Code a napiš *„jak začít"*. Claude tě provede krok za krokem podle
[`PRUVODCE.md`](PRUVODCE.md).

### 0. Jednou na začátku: tvoje nabídka

Napiš Claudovi: **„pojďme vyplnit moji nabídku"**. Zeptá se tě, co prodáváš, komu, za kolik,
jaké máš důkazy a co říkáš na typické námitky, a zapíše to do `knowledge/moje-nabidka.md`.
Z toho pak vychází každá rada „co říct místo toho" — tvým hlasem a s tvými čísly.

### 1. Po hovoru: `/analyzuj-call`

1. Hovor nahraj a přepiš. Nejjednodušší je **Wispr Flow**: přepis z něj Claude převezme sám
   (`scripts/wispr.py`). Další cesty (nástroj s přepisem, skript přes Gemini, nebo lokálně
   a zdarma) jsou v [`knowledge/prepis-hovoru.md`](knowledge/prepis-hovoru.md).
2. Přepis dej do `data/sales-coach/transcripts/_inbox/` (z Wispru a ze skriptu se tam uloží sám).
3. Napiš `/analyzuj-call`.
4. Claude rozbor uloží, zapíše skóre, doplní vzorce, zkontroluje formát a zeptá se, jestli to
   má poslat do aplikace. Po potvrzení je hovor v aplikaci zhruba do dvou minut.

Když se pak obchod rozhodne, stačí napsat: *„Novák podepsal"* — Claude přepne výsledek.

### 2. Před hovorem: `/priprav-call {jméno}`

5–7 karet na druhý monitor: cíl hovoru, čísla pro tohoto klienta, garance, důkaz, dvě
nejpravděpodobnější námitky s hotovými odpověďmi a další krok. Uloží se do `prospects/`.

### 3. Trénink: `/role-play`

Claude hraje klienta, ty prodáváš:

- `/role-play objection:drahe` — jedna námitka ve třech podobách (5–10 min),
- `/role-play archetype:skepticka-majitelka` — celý hovor s typem klienta z `personas/`,
- `/role-play prospect:kolar-servis` — simulace konkrétního klienta podle jeho profilu
  v `prospects/`.

Na konci skóre podle stejné rubriky jako skutečný hovor. Tréninky se v aplikaci ukazují
zvlášť a do statistik se nepočítají.

### 4. Cokoli dalšího

*„V čem se liší moje uzavřené hovory od prohraných?"*, *„Jak reagovat, když klient řekne, že
mu to udělá známý levněji?"*, *„Udělej personu z hovorů s Novákem a Dvořákovou."* — coach
odpovídá z frameworků v `knowledge/` a z tvých vlastních rozborů.

---

## Aplikace

| Stránka | Co ukazuje |
|---|---|
| **Overview** | počet hovorů, uzavřené obchody, průměrné a nejlepší skóre, úspěšnost podle linie, rozložení skóre, trend po měsících, otevřené obchody, legenda CLOSER |
| **Calls** | tabulka všech hovorů s filtrem a řazením → detail: skóre po sekcích, rozbor po momentech, celý rozbor, přepis s hledáním, vlastní poznámka |
| **Roleplays** | tréninky s AI — záměrně oddělené od skutečných hovorů |
| **Patterns** | dobré vzorce (zopakovat) a špatné vzorce (přestat) s citacemi a hovory, kde se objevily |
| **Notes** | všechny poznámky napříč hovory |
| **Analytics** | v čem se uzavřené hovory liší od prohraných |
| **Progress** | slabá místa po sekcích, trend každé sekce a tři věci, na kterých zapracovat |

Aplikace nic sama neanalyzuje — **čte soubory ze složky `data/sales-coach/`**:

```
data/sales-coach/
├── transcripts/
│   ├── _inbox/              ← sem dej nový přepis k rozboru
│   └── {linie}/             ← rozebrané hovory: {datum}_{slug}_{VÝSLEDEK}.md (+ .txt s přepisem)
├── roleplays/{linie}/       ← tréninky
├── progress/skill-scores.csv← jeden řádek na hovor: skóre po sekcích + výsledek
└── patterns/
    ├── master.json          ← dobré vzorce
    └── anti.json            ← špatné vzorce
```

- **Linie** = podsložka v `transcripts/` (např. `salony`, `b2b`). Přibude sama, jakmile
  založíš novou složku. Hezčí název jí dáš v `lib/config.ts`.
- **Výsledek hovoru** je v názvu souboru: `_CLOSED`, `_LOST`, `_GHOST`, `_ODLOZENO`, `_OPEN`.
- **Poznámky** se ukládají do prohlížeče — nepotřebují databázi, ale nepřenášejí se mezi
  zařízeními.
- Formát dat hlídá `node scripts/kontrola.mjs` (coach ji spouští sám po každém rozboru).

### Spuštění u sebe

```bash
npm install
echo "DASHBOARD_PASSWORD=tvoje-heslo" > .env.local
npm run dev            # http://localhost:3000
```

### Nasazení (Vercel)

1. Na vercel.com → **Add New Project** → vyber tohle repo.
2. V **Environment Variables** nastav `DASHBOARD_PASSWORD`.
3. Deploy. Každý push do `main` se nasadí znovu — **nový rozbor se objeví až po nasazení**,
   protože stránky se generují při buildu.

---

## Co je kde

```
├── CLAUDE.md                 ← pravidla pro Clauda (formát dat, postup, jazyk)
├── PRUVODCE.md               ← nastavení krok za krokem a přepisy (Wispr, Google Disk)
├── .claude/skills/           ← /analyzuj-call, /priprav-call, /role-play
├── knowledge/
│   ├── moje-nabidka.md       ← tvoje nabídka, ceník, důkazy, námitky, hlas
│   ├── vzorovy-rozbor.md     ← jak vypadá plný rozbor
│   ├── prepis-hovoru.md      ← jak nahrát a přepsat hovor
│   ├── frameworks/           ← celé know-how: rubrika CLOSER, námitky, cena, uzavření, tonalita…
│   │   ├── imperium-deep.md  ← kompletní 12sekční proces Imperium Academy (Charlie Morgan)
│   │   ├── imperium-raw/     ← originální slidy lekcí (PDF)
│   │   ├── _raw-transcripts/ ← 150 přepisů videí (Hormozi, Voss, Cole Gordon, Miner, Bay) + index
│   │   └── _raw-agent-outputs/ ← podrobné poznámky po autorech
│   └── knihovna-videi.md     ← tatáž videa česky: odkaz, shrnutí, techniky, odkaz na přepis
├── personas/{linie}/         ← typy klientů pro trénink (ukázkové — přepiš podle svých hovorů)
├── prospects/{linie}/        ← profily klientů a karty před hovorem
├── scripts/                  ← přepis z Wispru (wispr.py) i z nahrávky (prepis.py), mechanika hovoru, kontrola dat, index videí, smazání ukázky
└── data/sales-coach/         ← to, co čte aplikace
```

## Přizpůsobení

V `lib/config.ts`:

- `ownerName` — jméno pod „Sales Coach" v hlavičce
- `repNames` — jak se v přepisech jmenuje obchodník (jeho repliky se zvýrazní)
- `linieLabels` — hezčí názvy linií

## Smazat ukázku

```bash
node scripts/smaz-ukazku.mjs          # ukáže, co by smazal
node scripts/smaz-ukazku.mjs --ano    # smaže
```

Smaže jen smyšlená data (4 hovory, trénink, profil, jejich řádky v CSV a ukázkové vzorce).
Tvoje vlastní hovory a vzorce zůstanou — klidně ho spusť i později. Vzorový rozbor zůstává
v `knowledge/vzorovy-rozbor.md`.

Persony v `personas/` jsou taky ukázkové — klidně je nech jako výchozí bod, dokud nebudeš mít
vlastní.

## Soukromí

Přepisy obsahují jména a obchodní informace tvých klientů — repo nech **soukromé**. Nahrávky
a klíče se do gitu neukládají (`.gitignore`).

---

Stack: Next.js 16 · TypeScript · Tailwind 4 · remark · papaparse · recharts.
