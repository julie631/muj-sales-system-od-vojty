# Priority & Conflict Resolution Rules

**Co tento soubor je:** Explicit rules pro AI (zejména `/analyzuj-call`, `/priprav-call`, `/role-play` skills), když si knowledge base zdroje rozporují. Bez těchto rules by AI musela inferovat — tady je deterministicky řečeno **kdo má pravdu kdy**.

**Master princip:** **Domain expertise > celebrity. Konsenzus > outlier. CZ-context > US-context. Tvoje ověřené výsledky > generic frameworks.**

⚠️ **Sister file:** [`_cz-language-rules.md`](_cz-language-rules.md) — pravidla pro **přirozenou CZ** při generování. **Vždy načíst pro každý generated output.** Žádné doslovné překlady z Imperium/Voss/Cole — adaptace na tvůj reálný hlas (`knowledge/moje-nabidka.md` → Můj hlas).

---

## Master Priority Hierarchy (od nejvyššího)

### 1. CZ-Context Override (NEJVYŠŠÍ priorita)

Pokud zdroj říká techniku, která **prokazatelně nefunguje na CZ trhu**, CZ-context vyhrává — bez ohledu na to, jak slavný autor je.

**Triggery CZ override:**
- US aggressive hard-close patterns ("you must decide NOW", "full price next time") — ztlumit na CZ-friendly tonalitu
- Hyperbolic motivational language ("warrior mindset", "crush it") — vyřadit
- Direct/assertive voice jako default — v CZ to vyznívá jako agresivita, použít sparingly
- Pricing pressure tactics ("countdown timer", "only 2 spots left") — pouze pokud je to autenticky pravda (tvoje scarcity musí být real: reálně omezená kapacita, kterou umíš doložit)
- "Tipping" psychology a high-pressure closing tactics

**CZ override DOES NOT trigger pro:**
- Struktura sales callu (Imperium 12-section funguje univerzálně)
- Discovery techniky (Miner NEPQ, Voss kalibrované otázky — fungují CZ)
- Mindset principy (detached posture, doctor frame)
- Value framing (Hormozi Value Equation)

### 2. Tvoje ověřené formulace a výsledky — `knowledge/moje-nabidka.md`

`knowledge/moje-nabidka.md` (sekce Typické námitky a moje odpovědi, Jak vypadá můj hovor, Můj hlas, Důkazy) = tvoje ověřené CZ formulace s reálnými výsledky ({tvoje case study s čísly}).

**Pravidlo:** Pokud je `moje-nabidka.md` vyplněná a tvoje existing formulace řeší konkrétní situaci, **má precedence** nad generic frameworks. Frameworks AUGMENTUJÍ tvůj pattern, nenahrazují ho.

**Když `moje-nabidka.md` obsahuje `<!-- NEVYPLNĚNO -->`, tahle úroveň se přeskočí** — rozhoduje rovnou úroveň 3 (Domain Expert Priority).

**Příklad:** Námitka "to zvládneme sami" — pokud máš v `moje-nabidka.md` ověřenou analogii auto/servis/olej ("olej si taky umíte vyměnit sám, a stejně jezdíte do servisu"), je proven. Voss label před analogií = augmentace (silnější otevření), ale jádro zůstává tvůj pattern.

### 3. Domain Expert Priority (per oblast)

Každá oblast má authoritative expert. Když je konflikt v jejich domain, **expert vyhrává**:

| Oblast | Primary Expert | Důvod |
|---|---|---|
| **End-to-end sales process / struktura callu** | Imperium (Charlie Morgan) | Jediný 12-section A-Z framework |
| **Discovery questioning** | Miner (NEPQ) | Celá doctrine je discovery, 6-fáze framework |
| **Tonalita / hlasové techniky** | Voss | 3 voices, downward inflection — explicit MasterClass |
| **Námitky — label/mirror disarm** | Voss | FBI tactical empathy primary |
| **Námitky — high-ticket cena/doubt** | Cole Gordon | Specializace na $5k-$100k+ service biz |
| **Námitky — real call breakdown** | Bay | Real call analysis breakdowns |
| **Closing — incentive based pricing** | Imperium | One-shot reveal + silence specifické |
| **Closing — soft assumption / "What's next?"** | Cole | "What's next?" pull > push |
| **Closing — post-close reinforcement (24-48h)** | Hormozi | CLOSER R-step explicit framework |
| **Pricing math — Value Equation** | Hormozi | $100M Offers expertise |
| **Pricing math — ROI math pro service biz** | Cole | High-ticket service specialty |
| **Pricing negotiation — Ackerman model** | Voss | FBI hostage budget negotiation |
| **Frame control / authority frame** | Cole | "Start your call like this" framework |
| **Mindset — abundance / detached** | Cole + Miner | Konvergence dvou škol |
| **Mindset — belief transference** | Hormozi | "Conviction will correct your tone" |
| **Pre-call qualification / application** | Cole + Imperium | Cole formalizuje, Imperium implementuje |
| **Follow-up cadence (KISS sequencing)** | Bay | Outbound Squad specialty |
| **Follow-up — No-Oriented re-engagement** | Voss | "Have you given up on..." |
| **Cold outreach / opener** | Bay | Permission-based opener specialty |
| **Disqualification posture** | Cole + Miner | Konvergence |

### 4. Konsenzus Rule (3+ autorů říká totéž)

Pokud **3 nebo víc** autorů říká stejný pattern, je to **high-confidence**, default behavior. Bez ohledu na to, kdo je primary expert v oblasti.

**Příklady konsenzus patterns:**

- **Silence po ceně** — Imperium ("1-2 min"), Cole ("price + pause"), Hormozi ("silence creates pressure"), Voss ("4s after label"), Cole again. → **Vždy ticho po ceně. Nemluvíš první.** (Jak dlouho: Conflict G.)
- **Conviction > technika** — Hormozi ("belief over bridge of trust"), Cole ("closer identity"), Miner ("doctor not salesperson"), Bay ("conviction in tonality"). → **Musíš věřit. Bez toho techniky nefungují.**
- **Ne argumenty na námitky, otázky** — Miner ("loop the question back"), Cole ("aside from that..."), Voss (mirror), Hormozi (3 A's: Ask). → **Vždy first response = clarifying question, nikdy obhajoba.**

### 5. Recency of Evidence (tvoje výsledky)

Konkrétní ověřená čísla z `knowledge/moje-nabidka.md` (sekce Důkazy) > generic frameworks:
- {tvoje case study s čísly} — klient, výsledek v číslech, za jak dlouho
- každá další case study z tabulky Důkazy
- {tvoje reference} — klient nebo ukázka práce, na kterou můžeš odkázat

**Pravidlo:** Při scoring v `/analyzuj-call`, pokud obchodnice cituje konkrétní case study s čísly z `moje-nabidka.md`, **+2 bonus body** v Sell sekci (CLOSER:S). Pokud cituje generic benefit bez čísel, **0 bonus**. Když v `moje-nabidka.md` zatím žádná case study není, bonus se neuděluje.

### 6. Outlier Detection (pokud 1 vs many)

Pokud **1 autor** stojí proti všem ostatním, ten 1 je outlier. Default je consensus.

**Příklad outlier — Elliott:**
- Elliott: "Be a warrior, close every customer, no excuses"
- Všichni ostatní: detached posture, willing to walk away, qualify out
- → Elliott je outlier. Použít jen jeho 5 konkrétních scripts (cherry-picked), ignorovat motivational shell.

---

## Konkrétní Conflict Resolution Rules

### Conflict A: Hard close vs Soft pull

**Imperium říká:** *"Maybe is a no. If they don't buy now, they never will. Tell them it'll be full price next time."*

**Cole/Miner/Bay říkají:** Soft pull, detached posture, walk-away closer is magnetičtější.

**Voss říká:** No-oriented questions, prospect feels protected by saying "no".

**RESOLUTION (CZ + konsenzus rule):**

- **Struktura ano:** Imperium "Maybe = no" je správný **frame** — nesmíš nechat call v maybe zone.
- **Tonalita ne:** Hard delivery ("full price next time") je **TOO aggressive pro CZ trh**. Změkčit.

**CZ adaptovaný script:**

> *"[Jméno], jen na rovinu — pro nás 'rozmyslím se' znamená 'ne'. Klienti, kteří se rozhodují rychle, jsou ti, kteří se u nás stávají nejlepšími klienty. Pokud teď řekneš ne, je to v pohodě — ale slevu z dneška **nebudu schopná znovu nabídnout**. Buď to udělám teď s tebou v incentive cenách, nebo to není teď zrak. Co rozhodneš?"*

NE: *"Full price + full setup, vezmi nebo nech"* (US hard)
ANO: *"Slevu z dneška nebudu znovu nabídnout"* (CZ-acceptable)

### Conflict B: Pricing reveal — one-shot vs incremental

**Imperium říká:** One-shot reveal (full price → waiver → SHUT UP 1-2 min).

**Cole říká:** Wrap into implementation context ("po prvním měsíci uvidíte výsledky... investice je jen 12 tisíc").

**Voss Ackerman říká:** 3-step incremental counter (95% → 92.5% → final non-round + sweetener).

**Hormozi říká:** Value stack first (6k + 20k + 8k + 14k = 48k → "pro vás 16k").

**RESOLUTION (layered approach):**

**Step 1: Build value stack** (Hormozi) — vždy před cena
→ "Převzetí a kontrola účetnictví 6k + Nastavení podkladů a procesů 20k + Zaškolení 8k + Celoroční konzultace 14k = 48k+ hodnota" (příklad účetní kanceláře — tvoje položky a ceny: `knowledge/moje-nabidka.md`, sekce Ceník)

**Step 2: Wrap to implementation** (Cole) — anchor proč "investice"
→ "Po prvním měsíci uvidíte, že vám nikdo nenahání doklady a přesně víte, kolik odvedete..."

**Step 3: Imperium one-shot reveal** — primary pricing technique
→ "Investice je 12k setup + 4k měsíčně. Ale incentive based pricing — dneska 6k waiver na setup."

**Step 4: SHUT UP** (Imperium + konsenzus všech ostatních) → 1-2 min ticha (viz Conflict G)

**Step 5: Pokud prospekt bargainuje** → Voss Ackerman aktivuje
→ "How am I supposed to do that?" + 95% → 92.5% → final non-round.

**Default flow: 1 → 2 → 3 → 4. Step 5 jen pokud bargaining.**

### Conflict C: Spouse / partner objection

**Imperium říká:** "We will NOT accept" — refuse hard.

**Cole říká:** Step aside ("call them back in 5 min").

**Hormozi říká:** Support not permission reframe ("you'd resent them forever").

**Existing pattern z praxe:** 3-way call within 24h. (Tvoje ověřená odpověď na "Musím to probrat s…", pokud ji máš: `moje-nabidka.md` → Typické námitky a moje odpovědi — úroveň 2.)

**RESOLUTION (layered escalation):**

**Vrstva 1 (Hormozi reframe):** Pokus o reframe na úrovni mindsetu
> *"[Jméno], neptáš se ji na povolení, ptáš se na podporu. Pokud bys jí to nabídl, ona by tě podpořila, viď? Tak proč by tě tady nepodpořila?"*

**Vrstva 2 (Cole step aside):** Pokud partner je dostupný **právě teď**
> *"Hele, můžeš mu zavolat? Dám si 5 minut kafe, klidně s ním teď probereš a vrátíme se k tomu."*

**Vrstva 3 (3-way call z praxe):** Pokud partner není dostupný teď ale do 24h
> *"OK, kdy se s ním máš bavit? Zítra? Dáme si zítra v 15:00 rychlý 10min call všichni tři, ať mu to neukazuješ se 3 technickými otázkami, na které neumíš odpovědět."*

**Vrstva 4 (Imperium absolutní disqualify):** Pokud prospekt prostě odmítá Vrstvu 1-3, **disqualify**
> *"Hele [jméno], na rovinu — bez tvého společníka se nedostaneme dál. Ozvi se mi, jakmile to s ním proberete a budete oba na callu."*

**NIKDY:** Akceptovat "promluvím s ním a ozvu se ti" (Vrstva 0 = unacceptable, Imperium-correct).

### Conflict D: Discovery délka

**Hormozi:** 3 quick clarify otázky.

**Miner NEPQ:** 6 stages, 15-25 min.

**Imperium:** ~20 min, 8 sekcí.

**Voss:** Until "That's right".

**Tvůj existing:** tvoje fáze a celková délka hovoru (`moje-nabidka.md` → Jak vypadá můj hovor).

**RESOLUTION:**

**Default = Imperium 12-section structure** (struktura)
+ **Miner NEPQ probing questions** (depth uvnitř Imperium Sections 3, 5, 7, 8)
+ **Voss "That's right" checkpoint** (před Section 9 transition)
+ **Hormozi 3 clarify questions** **specificky pro Section 3** (Establish Primary Motive) — rapid opener

**Konkrétní mapping:**
- Section 1 (Micro Rapport) — 1 min
- Section 2 (Agenda) — 1 min
- Section 3 (Primary Motive) — Hormozi 3 clarify = 2 min
- Section 4-8 (Where At, Pain, Goal, Defeat, Emotion) — Miner NEPQ depth = 12-15 min
- Section 9-10 (Confidence + Expertise) — 2 min, **MUSÍ být "That's right" moment**
- Section 11 (Vague Pitch) + Q&A — 5-8 min
- Section 12 (Pricing + Close) — 3-5 min

**Total ~25-30 min discovery + pitch. Při hovoru na ~35 min total = +5 min buffer pro objections (Imperium "What we will NOT accept" handling).**

> ⚠️ **VÝJIMKA — screen-share-first cally (ukázka na míru / demo, někdy 2. call):**
>
> Mapping výše platí pro **discovery-first cally** (cold lead, 1. call). U **screen-share-first callů** se vědomě NEdělá block-discovery na začátku — obchodnice ukáže nejdřív předem připravenou ukázku (mockup, návrh na míru, demo) a **weavuje** discovery do walkthrough + Q&A (tvůj postup: `moje-nabidka.md` → Jak vypadá můj hovor). Toto je **legitimní metoda, NE chyba.**
>
> **Pro `/analyzuj-call`:** U screen-share-first callů NEHODNOŤ "0 discovery upfront" jako miss. Hodnoť **kvalitu woven discovery** — vyplynulo během hovoru to klíčové (lead source, past attempts, blok prospecta)? Viz `scoring-rubric.md` C-sekce.

### Conflict E: Tonalita systém

**Voss:** 3 voices (Playful 80% / FM DJ 15% / Direct 5%).

**Miner:** 5 NEPQ tones (curious / confused / concerned / challenging / playful).

**Hormozi:** 3 components (tone / emphasis / cadence).

**RESOLUTION:**

**Voss 3 voices = default operating mode** (frequency distribution).

**Miner 5 tones = situational deployment** (kdy která).

**Hormozi 3 components = mechanika** (jak dělat každý ton).

**Combined model:**
- Default mode: **Voss Playful** (80%)
- Při Connecting + Situation Qs: **Miner Curious**
- Při Problem Awareness: **Miner Concerned + Voss FM DJ pacing**
- Před consequence Qs: **Miner Concerned + sigh**
- Při disqualify check: **Miner Challenging**
- Při pricing reveal: **Voss Direct moment** + **Hormozi DOWN-pitch** + **PAUSE**
- Po pricing: **Voss FM DJ** pokud pushback
- Mezi sekcemi: **Voss/Miner Playful** (release tension)

### Conflict F: Mindset — abundance vs urgency

**Cole/Miner:** Detached posture, willing to walk away, abundance mindset.

**Imperium:** "Never let single call in maybe zone" — urgency.

**Hormozi:** "Volume negates luck" — abundance approach.

**RESOLUTION (not actually a conflict):**

- **Pre-call & during call (sections 1-11):** **Detached abundance mindset** (Cole/Miner)
  - "Hra je delší než jeden hovor"
  - "Možná to vážně nepotřebujete"
- **Section 12 (Close) + objection handling:** **Urgency frame** (Imperium)
  - "Maybe = no"
  - "Slevu z dneška znovu nenabídnu"
- **Post-call (lost deals):** **Abundance mindset return** (Cole/Hormozi)
  - "Rejection = data, ne attack"
  - "Volume negates luck"

Tonalita se posunuje od chill k assertive jen v Section 12. **NIKDY během discovery (Sections 1-8).**

---

## Anti-Conflict Rules (autoři, kteří NEMAJÍ řešit konkrétní oblast)

Tyhle autoři **NEMAJÍ váhu** v určitých oblastech, i když mají generic názor:

- **Bay** na pricing → vynechat (Bay sám pricing nepokrývá)
- **Bay** na high-ticket close → vynechat (Bay je SDR/outbound, ne sales call closer)
- **Voss** na cold outreach → vynechat (Voss je negotiation, ne lead gen)
- **Voss** na follow-up cadence → vynechat (Voss neformuje cadence)
- **Voss** na pre-call qualification → vynechat
- **Miner** na pricing → vynechat (Miner explicitně říká "price is a consequence question's answer", nevěnuje se mechanice)
- **Miner** na follow-up → omezeně (Miner má jen "next call NEPQ")
- **Hormozi** na tactical empathy/labels → vynechat (Hormozi nepoužívá Voss-style labels, používá direct pivot)
- **Elliott** mimo cherry-picked 5 techniky → vynechat (motivational guru-bullshit)
- **Cole** na cold outreach → vynechat (Cole je closer, ne prospector)
- **Cole** na CZ-specific market dynamics → vynechat (US high-ticket assumptions)
- **Imperium** na CZ-specific tonalita → ztlumit (US delivery je moc tvrdé)

---

## Pravidla pro AI skills

### `/analyzuj-call` scoring rules

Při hodnocení call dle scoring rubric:

1. **Citace musí být specifická pro domain expert.** Pokud obchodnice použije Voss label = score Label sekce (Voss expert). Pokud obchodnice použije Hormozi Value Equation = score Sell sekce.

2. **Konsensus patterns = high-confidence baseline.** Pokud obchodnice porušila konsensus pattern (např. mluvila po ceně), penalty -3 body. Pokud dodržela = baseline.

3. **CZ-context override v hodnocení.** Pokud obchodnice zmírnila Imperium hard close na CZ-acceptable, **+1 bonus** (správná adaptace), ne penalty.

4. **Tvoje existing formulace z `moje-nabidka.md` = baseline expectation.** Pokud obchodnice cituje case study s čísly z `moje-nabidka.md` (sekce Důkazy) = +2 v Sell. Pokud generic benefit = baseline.

5. **Při konfliktu mezi zdroji v scoring rationale, použij hierarchii:** CZ → tvoje ověřené formulace (`moje-nabidka.md`) → Domain expert → Konsenzus → Recency.

6. **⚠️ Clarify = woven discovery quality, NE "upfront discovery".** Obchodnice může vědomě NEdělat block-discovery na začátku. U screen-share-first callů (ukázka, demo) weavuje discovery do walkthrough. **NEPENALIZUJ "0 discovery upfront" / "skočila rovnou na pitch".** Hodnoť, jestli během hovoru vyplynulo klíčové info (lead source, past attempts, prospectův blok). Upfront vs woven = jedno, jde o výsledek.

7. **⚠️ Deal volume / počet zakázek za rok = MARGINÁLNÍ, NE top miss.** Pro close je to často skoro k ničemu (když ROI funguje při jakémkoliv volume — např. stavební firmě jedna zakázka za statisíce zaplatí službu za pár desítek tisíc mnohonásobně). Relevantní JEN pro rozhodnutí, jestli pitchovat upsell / větší balíček. NEpiš to do "Top 3 misses". Když chybí, max 1-věta poznámka "mohla probnout pro rozhodnutí o upsellu". (Jedno číslo, na kterém stojí Sell, je výjimka — viz Conflict J.)

8. **Needle-movers vs noise — co psát do Top 3 misses.** Piš jen to, co reálně mění výsledek hovoru. Pro skeptické/decision-style prospekty (typicky zkušení majitelé, kteří už slyšeli desítky nabídek) jsou skuteční needle-movers: **(a) chybějící Voss label na core objection/skepsi, (b) chybějící risk reversal (ukázka/audit zdarma / {tvoje garance} — `moje-nabidka.md` → Garance), (c) talk ratio >65 % + monolog disengagement, (d) discount drop bez cenové námitky, (e) rozhodovatel mimo hovor a žádný konkrétní další krok (viz Conflict K).** NEPiš jako top miss: upfront discovery, deal-volume probing, generic ROI math (prospekti to slyšeli 100×).

### `/priprav-call` battle cards rules

1. **Default struktura = Imperium 12-section.** Battle cards mapují na sekce.

2. **Within sekce, augment tvým hlasem (`moje-nabidka.md` → Můj hlas) + Domain expert.** Section 5 (Pain) = tvoje existing pain extraction (`moje-nabidka.md` → Jak vypadá můj hovor) + Miner NEPQ probing.

3. **Pricing card = Hormozi value stack + Cole investment reframe + Imperium incentive reveal.**

4. **Objection cards = Voss label (universal) + Domain expert per type.** Spouse objection = layered escalation (Hormozi → Cole → 3-way call → Imperium last resort).

### `/role-play` deployment rules

1. **AI hraje prospect dle persony** (`personas/{linie}/{slug}.md`).

2. **AI judge (post-call scorecard) používá scoring rules** výše.

3. **AI nikdy nehraje "Imperium-perfect" or "Voss-perfect" prospect.** Reálné prospecti smícháví objections, mají Black Swans, jsou contextual. AI role-play emuluje real-world chaos.

---

## Update tohoto souboru

Pravidla v tomto souboru jsou **living document**. Update kdy:

- Zjistíš, že konkrétní rule selhává na CZ trhu → CZ override expand
- Nová Imperium lekce ingest → add new expert priority pro novou oblast
- Tvoje nová case study s čísly → doplň ji do `knowledge/moje-nabidka.md` (sekce Důkazy) — úrovně 2 a 5 ji berou odtud
- Nový autor přidán do knowledge base → update domain expert priority table
- Po 10+ analyzed calls vidíme pattern, který rules neřeší → add new conflict resolution

**Verzování:** Tento soubor by měl mít changelog na konci až bude updated.

---

## Sources

- CLAUDE.md priority order (master reference)
- knowledge/frameworks/imperium-deep.md (Imperium primary)
- knowledge/frameworks/_raw-agent-outputs/* (per-author research)
- knowledge/moje-nabidka.md — Typické námitky a moje odpovědi, Jak vypadá můj hovor, Můj hlas (tvoje ověřené formulace)
- knowledge/moje-nabidka.md — Důkazy (tvoje ověřené výsledky s čísly)

---

## Další rozhodnutí konfliktů

Navazuje na Conflict A–F. Stejný princip: kdo co říká → RESOLUTION → jak to hodnotit v `/analyzuj-call`.

### Conflict G: Délka ticha po ceně

**Zdroje se rozcházejí:** 4 s (Voss — po labelu), 5 s, 10 s i "klidně přes minutu" (Imperium — SHUT UP 1-2 min, viz Conflict B Step 4).

**RESOLUTION:**

- **Po ceně mlč, dokud klient nepromluví první.** Aspoň ~5 s, klidně déle. Ticho nevyplňuj vysvětlováním, zdůvodňováním ani slevou.
- Cíl není počet sekund, ale **kdo promluví první**.

**Pro `/analyzuj-call`:** Z přepisu se ticho změřit nedá → hodnoť podle toho, **kdo po ceně promluvil první**. Klient = dodrženo (baseline). Obchodnice (dovysvětlování, zmírňování, sleva) = porušený konsenzus "Silence po ceně" → scoring rule #2.

### Conflict H: Otázky "proč"

**Voss říká:** "Proč" nepoužívat — zní obviňujícím tónem a vyvolá obranu (viz `voss-tactics.md`, Calibrated questions).

**Miner + scoring rubric:** "Proč" používají u minulých pokusů (CLOSER:O — "Proč to podle vás nefungovalo?").

**RESOLUTION:**

- **"Proč" na okolnosti a minulé pokusy = v pořádku.** *"Proč to podle vás nefungovalo?"* míří na situaci, ne na člověka.
- **"Proč" na klientovo rozhodnutí → nahraď "co vás vedlo…".** NE: *"Proč jste to neudělal dřív?"* ANO: *"Co vás vedlo k tomu, že jste to zatím neřešil?"*

**Pro `/analyzuj-call`:** Když klient na "proč" odpověděl otevřeně, **nepenalizuj** — otázka splnila účel. U "proč" na rozhodnutí nabídni v rozboru verzi "Co vás vedlo…".

### Conflict I: Volba ze dvou možností

**Miner říká:** Alternative close (volba ze dvou) je manipulativní — u rozhodnutí o koupi ho odmítá.

**Hormozi Bamfam + scoring rubric (R):** Dvě možnosti používají u termínu dalšího kroku.

**RESOLUTION:**

- **ANO pro termín dalšího kroku:** *"Středa v deset, nebo čtvrtek ve dvě?"*
- **NE pro samotné rozhodnutí o koupi.** Na rozhodnutí se ptej přímo — žádné "menší, nebo větší balíček?" místo otázky, jestli vůbec ano.

**Pro `/analyzuj-call`:** Dvě možnosti u termínu = správně. Volbu ze dvou u rozhodnutí o koupi v rozboru označ a nabídni přímou otázku na rozhodnutí.

### Conflict J: Číslo současného stavu

**Kvalifikace říká:** Bez čísla současného stavu dál nejdeš.

**Scoring rule #7:** Objem (deal volume, počet zakázek) = okrajový, ne top miss.

**RESOLUTION:**

- **Povinné je jedno číslo — to, na kterém stojí scénář v Sell:** co problém stojí, nebo kolik chybí.
- **Další objemy, které rozhodnutí neovlivní, jsou okrajové** (scoring rule #7).

**Pro `/analyzuj-call`:** Chybí to jedno číslo a Sell proto stojí na obecném benefitu → miss v Clarify. Chybí jen doplňkové objemy → max 1-věta poznámka.

### Conflict K: Rozhodovatel mimo hovor

**Imperium:** "We will NOT accept" — "promluvím s ním a ozvu se" je nepřijatelné (Conflict C, Vrstva 0).

**Scoring rules #6-8:** Do Top 3 misses jen needle-movers, ne noise.

**RESOLUTION:** **Rozhodovatel mimo hovor a žádný konkrétní další krok = needle-mover** — patří mezi hlavní chyby (Top 3 misses, scoring rule #8 bod e). Rozhodovatel mimo hovor s domluveným konkrétním dalším krokem (3-way call s datem a časem — Conflict C, Vrstva 3) chyba není.

### Conflict L: Kam bodovat kalibrovanou otázku

**Voss:** Kalibrovaná otázka ("Jak/Co") je Voss technika — svádí bodovat ji do Label.

**CLOSER:** Otázky v discovery patří do Clarify.

**RESOLUTION — podle funkce:**

- **V discovery (zjišťuje situaci)** → **Clarify**. *"Co je pro vás na tom nejdůležitější?"*
- **Jako reakce na emoci nebo námitku** → **Label/Explain** (na emoci Label, na námitku Explain). *"Jak by se musela změnit cena, aby to dávalo smysl?"*
- **Jeden tah se boduje jen v jedné sekci** — nikdy dvakrát.

---

## Changelog

- 2026-05-17: Initial draft. Pokrývá 6 explicit conflicts (Hard/Soft close, Pricing reveal, Spouse, Discovery length, Tonalita, Mindset abundance/urgency) + master priority hierarchy + per-skill rules. Zpětná vazba z praxe odhalila, že knowledge base má 30k+ slov bez conflict resolution — tento soubor je response.
- 2026-05-28: **Discovery scoring fix.** Analýzy screen-share-first callů opakovaně penalizovaly "0 discovery upfront" — což je v rozporu s metodou screen-share-first + woven discovery. Plus "zjisti deal volume" se opakovalo jako top miss, ač je pro close marginální. Fix: (1) Conflict D výjimka pro screen-share-first cally, (2) scoring rule #6-8 — Clarify = woven quality ne upfront, deal-volume = marginální, needle-movers vs noise pro Top 3 misses. `scoring-rubric.md` C-sekce přepsána paralelně.
- 2026-10-04: **Další rozhodnutí konfliktů (G–L):** délka ticha po ceně, otázky "proč", volba ze dvou možností, číslo současného stavu, rozhodovatel mimo hovor (+ needle-mover (e) v scoring rule #8), kam bodovat kalibrovanou otázku.
