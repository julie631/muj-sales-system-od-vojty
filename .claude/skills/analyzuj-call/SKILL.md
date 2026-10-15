---
name: analyzuj-call
description: Rozebere přepis prodejního hovoru — skóre CLOSER (100 b), rozbor po sekcích a momentech s citacemi, top 3 výhry a chyby, cvičení na týden. Uloží rozbor + přepis do data/sales-coach/transcripts/{linie}/, zapíše řádek do skill-scores.csv, doplní vzorce a hovor se po nasazení objeví v aplikaci. Spusť, když uživatelka řekne „rozeber / analyzuj hovor", pošle cestu k přepisu, dá soubor do transcripts/_inbox/ nebo vloží text přepisu do chatu.
---

# /analyzuj-call — rozbor prodejního hovoru

Cíl: aby se uživatelka zlepšovala systematicky. Rozbor musí být **konkrétní** (citace s časem),
**hluboký** (všech 7 sekcí po momentech) a **použitelný** (u každé chyby hotová věta, co říct
místo toho).

---

## 0. Kde je přepis

1. **Poslala cestu** → načti soubor.
2. **Řekla jen „rozeber hovor"** → `ls data/sales-coach/transcripts/_inbox/`. Jeden soubor = ten.
   Víc souborů = zeptej se který.
3. **Vložila text do chatu** → použij ho; při ukládání z něj uděláš `.txt`.
4. **Nic z toho** → *„V `_inbox/` nic není. Dej tam přepis (návod v `knowledge/prepis-hovoru.md`)
   nebo ho vlož sem."* Konec.

---

## 1. Metadata

Z přepisu a názvu souboru vytáhni: **jméno klienta + firma**, **linie**, **datum**, **délka**,
**výsledek**.

- Linie = existující podsložka v `data/sales-coach/transcripts/` (kromě `_inbox`). Když není jasné
  kam patří, zeptej se jednou krátkou otázkou a nabídni existující linie. Nová linie = nová složka.
- Datum chybí → dnešní.
- Výsledek: pokud ho neřekla, dej `OPEN` (rozjednané). Možnosti: `CLOSED`, `LOST`, `GHOST`,
  `ODLOZENO`, `OPEN`.
- Chybí-li jméno klienta nebo linie, zeptej se **před** rozborem: *„Kdo to byl a do jaké linie
  patří?"*

---

## 2. Načti kontext (v tomhle pořadí)

0. `knowledge/moje-nabidka.md` — co prodává, ceny, důkazy, její ověřené formulace a hlas.
   Obsahuje-li `<!-- NEVYPLNĚNO -->`, pokračuj, ale na konci připomeň, že rady by s vyplněnou
   nabídkou byly přesnější.
1. `knowledge/frameworks/_priority-rules.md` — co platí při rozporu zdrojů (**povinně první**).
2. `knowledge/frameworks/_analyzer-detection-rules.md` — co v přepisu nepřehlédnout.
3. `knowledge/frameworks/_cz-language-rules.md` — každá navržená věta musí znít přirozeně česky,
   ne jako doslovný překlad z Imperia, Vosse nebo Cola.
4. `knowledge/frameworks/scoring-rubric.md` — rubrika a kalibrace (**povinně**).
5. `knowledge/frameworks/imperium-deep.md` — kompletní 12sekční A–Z proces Imperium
   (**primární zdroj pravdy** pro strukturu hovoru).
6. Podle témat, která v hovoru opravdu jsou: `discovery.md`, `namitky.md`, `pricing-framing.md`,
   `closing.md`, `follow-up.md`, `tonalita.md`, `mindset.md`, `kvalifikace.md`
   (záloha: `closer-hormozi.md`, `voss-tactics.md`, `_raw-agent-outputs/{autor}.md`).
7. **RAG-lite:** po určení hlavních témat hovoru (např. námitka ceny, partner, „rozmyslím si")
   projdi `knowledge/frameworks/_raw-transcripts/_transcripts-index.md` a načti **jen 1–3**
   nejrelevantnější přepisy videí (podle tématu, use cases a quality score) — pro hlubší vhled
   k hlavním chybám a přesné techniky. Nikdy nenačítej všechny.
8. `prospects/{linie}/{slug}.md` (profil klienta) a dřívější hovory se stejným klientem
   (`data/sales-coach/transcripts/{linie}/*_{slug}_*.md`), pokud existují.
9. `data/sales-coach/patterns/master.json` a `anti.json` — ať víš, které vzorce už jsou známé.

---

## 3. Přečti CELÝ přepis

Ne jen začátek. Bez celého přepisu nejde napsat rozbor po momentech a snadno přehlédneš tah,
který je schovaný uprostřed monologu.

---

## 4. Mechanika — spočítej, neodhaduj

```bash
node scripts/mechanika.mjs data/sales-coach/transcripts/_inbox/{soubor}.txt
```

Skript vrátí podíl řeči obchodníka a klienta, nejdelší monolog a počet otázek (otevřené/uzavřené).
Pokud se obchodník v přepisu jmenuje jinak než „Obchodník", přidej jeho jméno jako druhý argument.
Čísla z výstupu použij v sekci Mechanika.

---

## 5. Oboduj sekce

Pro každou ze 7 sekcí rubriky (Clarify /10, Label /15, Overview /15, Sell /20, Explain /20,
Reinforce /10, Mechanika /10):

- **body** podle rubriky (kalibrace *moderate-strict*, viz `scoring-rubric.md`),
- **citace** z přepisu s časem `[mm:ss]` — bez citace žádné body,
- **zdůvodnění**: proč přesně tolik.

Přepis bez časů → použij pořadí repliky `[replika 12]`.
Sekce, která v hovoru **neproběhla** (rozhoduje, jestli fáze nastala, ne délka hovoru) →
`n/a` v tabulce (`| Explain | n/a/20 |`) i v CSV a celkové skóre přepočítej poměrem
(vzorec v `scoring-rubric.md` → Jak počítat srážky a chybějící sekce).
Srážky: v jedné sekci nejvýš jedna, sekce nejde pod 0. Štítek úrovně: `Tier N (low/mid/high)`
podle pásem v rubrice (třetiny pásma).
Nekvalitní přepis (hodně nesrozumitelných míst) → řekni to na začátku a doporuč nový přepis.

---

## 6. Napiš rozbor (`.md`)

**Soubor:** `data/sales-coach/transcripts/{linie}/{YYYY-MM-DD}_{slug}_{VÝSLEDEK}.md`
(`slug` = firma nebo příjmení, malá písmena bez diakritiky, pomlčky; musí obsahovat aspoň jedno
slovo o 4+ písmenech ze jména, které půjde do CSV).

**Kostra — názvy nadpisů dodrž přesně, parser aplikace na nich stojí:**

```markdown
# {Jméno} ({Firma}) — {Linie} — {VÝSLEDEK}

## Metadata
- **Prospect:** {jméno} ({firma, obor, velikost})
- **Linie:** {linie}
- **Datum:** {YYYY-MM-DD}
- **Duration:** ~{min} min
- **Outcome:** {VÝSLEDEK} {CLOSED 🟢 · LOST 🔴 · GHOST ⚫ · ODLOZENO 🟡 · OPEN 🔵} ({co se domluvilo, další krok})
- **Tier:** Tier {N} ({low/mid/high}) — {jedna věta proč}

## Scorecard přehled — **{X}/100**

| Sekce | Skóre |
|---|---|
| Clarify | X/10 |
| Label | X/15 |
| Overview | X/15 |
| Sell | X/20 |
| Explain | X/20 |
| Reinforce | X/10 |
| Mechanika | X/10 |

---

## Deep analysis per sekce

### Clarify — X/10

**Reasoning:** {3–6 vět: co se povedlo, co chybělo, proč tolik bodů}

#### Moment 1: [mm:ss] {Krátký název}

**Kontext (~30s window):**

> Obchodník: "{doslovná citace}"
>
> {Klient}: "{doslovná citace}"

**Co se stalo:** {dynamika momentu}

**Proč to bylo dobře / špatně:** {důvod}

**Co říct místo toho:** *(u chyb povinné)* / **Co by to posunulo ještě dál:** *(u výher)*

> *"{hotová věta v jejím hlase}"*

**Pattern relevance:** {který vzorec z patterns/ nebo z frameworků — nebo „—"}

---

#### Moment 2: …

(… všech 7 sekcí: Clarify, Label, Overview, Sell, Explain, Reinforce, Mechanika)

---

## 🟢 Top 3 wins

1. **[mm:ss] {název}** — „{citace}" — {proč to fungovalo}
2. …
3. …

## 🔴 Top 3 misses

1. **[mm:ss] {název}** — „{citace}" — místo toho: *„{hotová věta}"*
2. …
3. …

## 🔥 GOLD insight / Pattern

{1–3 věty: nejdůležitější poučení z hovoru, přenositelné na další hovory}

## 📚 CZ fráze pro KB

- *„{fráze, která fungovala nebo by fungovala}"*
- …

## 🎯 Cvičení

**Na tento týden:** {jeden konkrétní návyk} — natrénuj v `/role-play {mód}`.
*Proč:* {1 věta, proč právě tohle z tohoto hovoru plyne}
*Ke zhlédnutí:* [{název videa}]({odkaz}) — {autor}, {proč právě tohle}
```

Video vyber z `knowledge/knihovna-videi.md` (téma podle hlavní chyby, přednost ★★★). Odkaz
zkopíruj přesně z knihovny — nikdy ho neskládej ani nevymýšlej.

Pravidla parseru: první `X/100` v souboru = celkové skóre (proto v nadpisu Scorecard přehled);
každé `###` v Deep analysis začíná anglickým názvem sekce; momenty jsou `####` (čas `[mm:ss]`
nebo rozsah `[14:00–16:40]` je volitelný, ale u přepisu s časy ho vždy uveď).

**Vzor plného rozboru:** [`knowledge/vzorovy-rozbor.md`](../../../knowledge/vzorovy-rozbor.md)
— přesně tahle hloubka a forma. Ostatní ukázkové rozbory v `data/` jsou záměrně zkrácené.

**Kdo je kdo v rozboru:** o obchodníkovi piš ve 3. osobě — jménem nebo rolí z přepisu
(„Jana", „obchodnice", „obchodník"), v rodě, ve kterém v přepisu mluví. Hotové věty „co říct
místo toho" formuluj v přítomném nebo budoucím čase, ať nejsou v rodě. V chatu uživatelce tykej.

### ⚠️ Laťka hloubky — tady se rozbory nejčastěji odbývají

Deep analysis je **jádro rozboru, ne příloha**. Krátká = nehotová.

- **Všech 7 sekcí**, každá: Reasoning (3–6 vět) + **2–3 momenty**.
- Každý moment: doslovná citace (1–3 řádky) → co se stalo → proč dobře/špatně → **co říct
  místo toho** (u chyb povinně, jako hotová věta) → pattern.
- Mechanika rozepiš po metrikách: podíl řeči (%), nejdelší monolog (čas + o čem), otázky
  (otevřené/uzavřené), opakované zlozvyky.
- **Hovor 15 minut a delší:** aspoň **14 momentů** (2–3 na sekci), Deep analysis orientačně
  150+ řádků, celý soubor 250+ řádků. Kratší = dopiš.
- **Krátký hovor (pod 15 minut):** aspoň 1 moment na každou sekci, která proběhla (celkem
  zhruba 1 moment na 1–2 minuty hovoru, nejvýš 3 na sekci). Řádková minima neplatí.
- Stejnou repliku necituj ve více sekcích — boduj ji tam, kde splnila funkci, a jinde na ni
  odkaž („viz Explain, Moment 1").

Wins a misses: **vždy 3 + 3**, i u výborného nebo velmi slabého hovoru.

---

## 7. Zapiš řádek do CSV

Do `data/sales-coach/progress/skill-scores.csv` přidej jeden řádek:

```csv
{YYYY-MM-DD},{Jméno} ({Firma}),{linie},{c},{l},{o},{s},{e},{r},{m},{total},{VÝSLEDEK},"{1 věta: hlavní síla, hlavní slabina}"
```

Výsledek stejný jako v názvu souboru. Pole s čárkou dej do uvozovek. Další hovor se stejným
klientem: `{Jméno} ({Firma}) — 2. call`.

---

## 8. Ulož přepis

Přepis patří vedle rozboru jako `{stejný název}.txt` (beze změn obsahu). Z `_inbox/` ho přesuň
(`git mv` nebo `mv`), ať tam nezůstává. Vložený text z chatu ulož rovnou pod finálním názvem.

---

## 9. Doplň vzorce

Projdi `patterns/master.json` (dobré) a `anti.json` (špatné):

- vzorec, který v hovoru zazněl → doplň název souboru hovoru do `usedInCalls` / `appearsInCalls`;
  u dobrého vzorce v hovoru s výsledkem `CLOSED` nastav `closedValidated: true` a do
  `validatedBy` dej „{Jméno} (CLOSED {skóre})";
- nový vzorec přidej, jen když se objevil **ve dvou hovorech** (zkontroluj starší rozbory),
  nebo když jde o moment, který jasně rozhodl uzavřený obchod;
- pole přesně podle existujících záznamů; `id` = slug názvu.

K hovoru se vzorec v aplikaci přiřadí **jen přes `usedInCalls` / `appearsInCalls`** — dobrý
vzorec, který v hovoru chyběl, do `usedInCalls` nedávej (v rozboru ho klidně zmiň jako „chyběl:
{název}").

---

## 10. Profil klienta

Pokud `prospects/{linie}/{slug}.md` neexistuje, založ ho podle `prospects/_sablona.md`
(`slug` = stejný jako v názvu hovoru, např. `kolar-servis`). Pokud existuje, připiš sekci
„Hovor {datum}".

Když v hovoru zazněl důkaz, cena, garance nebo formulace, které v `knowledge/moje-nabidka.md`
chybí, navrhni je na konci doplnit (nezapisuj je tam bez jejího souhlasu).

---

## 11. Kontrola

```bash
node scripts/kontrola.mjs
```

Musí projít **bez chyb a bez upozornění u nového hovoru** (upozornění u jiných souborů
nevadí). Chyba nebo upozornění = oprav a spusť znovu.

---

## 12. Výstup do chatu

Krátce — rozbor má v souboru a v aplikaci:

```markdown
## {Jméno} — {X}/100 · {Tier} · {VÝSLEDEK}

| Clarify | Label | Overview | Sell | Explain | Reinforce | Mechanika |
|---|---|---|---|---|---|---|
| X/10 | X/15 | X/15 | X/20 | X/20 | X/10 | X/10 |

🟢 {nejsilnější moment — 1 řádek}
🔴 {největší chyba + co říct místo toho — 1–2 řádky}
🎯 {cvičení na týden}

Uloženo: `data/sales-coach/transcripts/{linie}/{soubor}.md` (+ .txt), řádek v CSV, vzorce {doplněny / beze změny}.
```

Pak se zeptej: **„Poslat do aplikace?"** → `git add data/ prospects/ && git commit -m "Rozbor: {Jméno} {datum}" && git push`.
Po pushi řekni, že se hovor v aplikaci objeví zhruba do dvou minut.

Neptej se „je to OK?" — zpětnou vazbu dá sama, když bude chtít.

---

## Pravidla

- **Konkrétnost.** ❌ „Discovery byla slabší." ✅ „[03:42] ‚Tak co, jak vám to jde?' — obecná
  otázka, žádný doplňující dotaz na čísla."
- **Hotové věty.** Alternativa je přesná věta, kterou může příště říct — v jejím hlase
  (`moje-nabidka.md`, sekce Můj hlas) a přirozenou češtinou (`_cz-language-rules.md`).
- **Body odpovídají citacím.** 12/15 za Label = v textu 2–3 konkrétní labely. 3/15 = citace
  míst, kde label chyběl.
- **Žádné guru fráze** („pracuj na emoční inteligenci", „naslouchej aktivně").
- **Nevymýšlej** čísla, výsledky ani citace. Co v přepisu není, není.

## Když něco chybí

| Situace | Co udělat |
|---|---|
| Přepis bez časů | `[replika N]` místo `[mm:ss]` |
| Chybí jméno klienta nebo linie | zeptej se před rozborem |
| Chybí profil klienta | založ ho (krok 10) |
| `moje-nabidka.md` nevyplněná | rozbor udělej, na konci nabídni vyplnění |
| Přepis bez označení mluvčích | zkus je určit z kontextu; když to nejde, požádej o nový přepis (`knowledge/prepis-hovoru.md`) |

## Kontrolní seznam

- [ ] Celý přepis přečtený (ne jen začátek)
- [ ] 7 sekcí v Deep analysis, každá s Reasoning a momenty s doslovnou citací (hovor 15+ min:
      2–3 na sekci, aspoň 14; kratší: aspoň 1 na sekci, která proběhla)
- [ ] Každá chyba má hotovou větu „co říct místo toho"
- [ ] Mechanika má čísla ze `scripts/mechanika.mjs`
- [ ] 3 wins + 3 misses + cvičení s konkrétním `/role-play` módem
- [ ] `.md` + `.txt` v `transcripts/{linie}/`, `_inbox/` uklizený
- [ ] Řádek v CSV (výsledek = název souboru, slug obsahuje slovo ze jména)
- [ ] Vzorce doplněné
- [ ] `node scripts/kontrola.mjs` prošla bez chyb a bez upozornění u nového hovoru
