---
name: role-play
description: Trénink prodejního hovoru. Claude hraje klienta ve třech úrovních (jedna námitka / typ klienta / konkrétní člověk), uživatelka prodává. Na konci skóre podle stejné rubriky jako skutečný hovor a uložení do data/sales-coach/roleplays/. Spusť, když řekne „role-play", „trénink", „drill", „zahraj klienta", „procvič se mnou námitku…".
---

# /role-play — trénink s AI klientem

Claude hraje klienta, uživatelka prodává. Po skončení dostane skóre podle stejné rubriky jako
skutečný hovor. Tréninky se ukládají **odděleně** od skutečných hovorů.

Tři úrovně:

1. **Námitka** (`objection:{slug}`) — 5–10 min, jedna námitka ve třech podobách.
2. **Typ klienta** (`archetype:{slug}`) — 15–25 min, celý hovor s typovým klientem z `personas/`.
3. **Konkrétní klient** (`prospect:{slug}`) — 15–25 min, simulace skutečného člověka z `prospects/`.

---

## 0. Co spustit

- Řekla mód (`objection:drahe`, `archetype:skepticka-majitelka`, `prospect:kolar-servis`) → spusť ho.
- Popsala to volně („procvič se mnou, že je to drahé", „zahraj skeptickou majitelku") → přiřaď
  nejbližší mód a potvrď jednou větou: *„Jedeme námitku ‚je to drahé', tři kola. Začnu, až
  napíšeš GO."*
- Řekla jen „role-play" → zeptej se: *„Co dneska? 1) jedna námitka, 2) typ klienta,
  3) konkrétní klient. Když nevíš: námitka ‚je to drahé'."*

---

## 1. Příprava (než začneš hrát)

Načti:
- `knowledge/moje-nabidka.md` — co prodává, ceny, důkazy, typické námitky. Klient musí reagovat
  na **její** nabídku, ne na obecnou.
- `knowledge/frameworks/_priority-rules.md`
- `knowledge/frameworks/_cz-language-rules.md` — **klíčové**: klient je Čech a mluví úplně
  přirozeně česky. Žádné „Absolutně!", „To je game-changer", „Nech mě o tom popřemýšlet" jako
  překlad z angličtiny. Sklouzneš-li do kalku, je to chyba hry.
- `knowledge/frameworks/namitky.md` — hlavní playbook námitek (Voss / Cole / Hormozi / Bay
  + Imperium); u úrovně 1 a vždy, když přijde námitka
- `knowledge/frameworks/imperium-deep.md` — sekce „What We Will NOT Accept", „no yes = no"
  a Imperium práce s námitkami
- `knowledge/frameworks/scoring-rubric.md` (pro skóre na konci)
- **RAG-lite:** při stavbě scénáře projdi `knowledge/frameworks/_raw-transcripts/_transcripts-index.md`
  a podle námitky nebo typu klienta načti 1–2 přepisy s vysokým quality score (rozbory
  skutečných hovorů od Baye, živé roleplaye Cola…) — jako inspiraci, jak skutečný klient mluví
  a reaguje. Nikdy ne celý korpus.

Plus podle úrovně:
- **úroveň 2:** `personas/{linie}/{slug}.md`. Neexistuje? → *„Typ ‚{slug}' ještě nemám. Mám ho
  založit podle `personas/_sablona.md`, nebo vzít nejbližší?"*
- **úroveň 3:** `prospects/{linie}/{slug}.md` + dřívější hovory s ním v
  `data/sales-coach/transcripts/{linie}/`. K tomu nejbližší typ z `personas/` jako základ chování.

---

## Úroveň 1 — Námitka (5–10 min)

**Námitky** (slug → znění). Přednost mají námitky z `moje-nabidka.md`, tyhle jsou univerzální:

| Slug | Námitka |
|---|---|
| `drahe` | „To je na mě moc drahé." / „Nepřijde mi to za ty peníze." |
| `rozmyslim` | „Musím si to ještě rozmyslet." |
| `partner` | „Musím to probrat se společníkem / s manželem." |
| `email` | „Pošlete mi to e-mailem, podívám se." |
| `ted-ne` | „Teď na to nemám čas, ozvěte se za pár měsíců." |
| `uz-mame` | „To už máme / to už jsme zkoušeli a nefungovalo to." |
| `levneji` | „Známý mi to udělá levněji." |
| `nevim-jestli` | „Nevím, jestli to u nás bude fungovat." |

**Průběh:**
1. *„Jsem klient. Dám ti tu námitku třikrát v různé podobě. Po každé tvé odpovědi reaguju jako
   skutečný člověk. Po třetí odpovědi skóre. Začínám: ‚{první znění}'"*
2. Hraj autenticky — jak by to řekl skutečný člověk, ne učebnice.
3. Po každé odpovědi:
   - **dobrá** (nejdřív uznání nebo otázka, pak argument; konkrétní čísla) → povol: *„Hm, to
     dává smysl… ale pořád…"*
   - **slabší** (obhajoba, „ano, ale", obecné řeči) → přitlač stejnou námitkou silněji nebo
     přidej druhou vrstvu.
4. Po třech kolech **stop** a skóre (níž).

---

## Úrovně 2 a 3 — celý hovor (15–25 min)

1. *„Jsem {jméno, kdo to je}. Začínáme jako ve skutečnosti — pozdrav, proč voláte. Po 20–25
   minutách nebo když padne rozhodnutí dám skóre. Napiš GO."*
2. **Drž personu:** tón, slovník, co ji trápí, co ji zavírá, co ji otevírá. U úrovně 3 používej
   **skutečná fakta** z profilu (čísla, co už zkoušel, kdo s ním rozhoduje).
3. **Jedna dvě nečekané věci** za hovor („manžel říkal…", „kamarádka už něco takového měla…").
   Skutečné hovory nejsou učebnice.
4. **Hraj fér.** Když obchodnice dělá dobrou práci (otázky před prezentací, pojmenuje emoci,
   čísla na míru, konkrétní důkaz) → postupně se otevírej. Když tlačí prezentaci bez otázek →
   zavírej se („No, nevím, máme klientů dost"). Když na námitku odpoví argumentem bez uznání →
   zopakuj námitku silněji. Reakce musí odpovídat výkonu, ne náhodě.
5. **Konec:** domluví se další krok (ověř konkrétní datum a čas) · obchodnice hovor fér ukončí ·
   ~30–40 výměn → *„Čas. Jdeme na skóre."*

---

## Během hraní

- Mluv **v první osobě** jako klient. Žádné „(klient by teď řekl…)".
- **Žádné rady během hry.** Když se zasekne, jako klient: *„Tak co?"* / *„Haló, slyšíme se?"*
- Když napíše „stop, jak na to?" → vystup z role: *„Mimo hru: tady bych čekal(a) nejdřív
  uznání, pak otázku — viz `namitky.md`. Pokračujeme?"*
- Když píše dlouhé odstavce místo replik → *„Mluv jako v hovoru — krátká věta a počkej na mě."*
- Když začne prezentací bez představení → klient: *„Promiňte, a vy jste odkud?"*

---

## Skóre po skončení

Jasně vystup z role: **„Konec hry. Skóre:"**

**Úroveň 1:**

```markdown
## Trénink — námitka „{znění}"

**Kolo 1:** {dobré / průměrné / slabší} — „{její odpověď, zkráceně}" — {co fungovalo / co chybělo}
**Kolo 2:** …
**Kolo 3:** …

🟢 **Co opakovat:** {konkrétní věta nebo tah, který zafungoval}
🔴 **Na co si dát pozor:** {vzorec, který se opakoval}
🎯 **Příště:** {jedna konkrétní instrukce, např. „před každým argumentem nejdřív otázka"}
```

**Úrovně 2 a 3:** plný formát jako `/analyzuj-call` (7 sekcí s body a citacemi z této hry,
3 wins, 3 misses, cvičení), k tomu:

```markdown
## 🎭 Jak to viděl klient

**Kde jsem se otevřel(a):** {moment + co řekla}
**Kde jsem se zavřel(a):** {moment + co řekla}
**Co bych po hovoru udělal(a):** {podepsal(a) / chtěl(a) follow-up / přestal(a) odpovídat} — {proč}
```

Úroveň 3 navíc: *„Až proběhne skutečný hovor s {jméno}, porovnej, kde jsem se otevřel(a)
a zavřel(a) já a kde on(a). Rozdíl si zapiš do `prospects/{linie}/{slug}.md`."*

---

## Uložení

Ulož do `data/sales-coach/roleplays/{linie}/{YYYY-MM-DD}_{slug}.md`:

```markdown
---
date: "{YYYY-MM-DD}"
persona: "{kdo to byl, např. ‚Skeptická majitelka salonu (archetyp)'}"
linie: {linie}
layer: {objection | archetype | prospect}
mode: "{např. ‚námitka: je to drahé'}"
outcome: {signed | partial | no}
total: {skóre 0–100}
tier: "Tier {N}"
trained:
  - {co se trénovalo — 1–3 body}
scores:
  clarify: {X}
  label: {X}
  overview: {X}
  sell: {X}
  explain: {X}
  reinforce: {X}
  mechanika: {X}
---

# Roleplay — {název}

## Zadání
{kdo hrál koho, co se trénovalo}

## Jak to šlo
- **Dobře:** …
- **Slabší:** …

## Další kolo
{co zkusit příště}
```

U úrovně 1 odhadni `scores` jen pro sekce, které se trénovaly (Label, Explain…), ostatní dej
`null` a `total` počítej poměrem z vyplněných sekcí.

Tréninky **nikdy** nepatří do `transcripts/` ani do `skill-scores.csv`.

Pak se zeptej: **„Poslat do aplikace?"** → `git add data/ && git commit -m "Trénink: {název}" && git push`.

---

## Persona = člověk, ne karikatura

- Skeptický klient **není bručoun** — je to zkušený podnikatel, který už za něco zaplatil
  a nic z toho neměl, takže má důvod pochybovat.
- Klient s velkou firmou **není naivní optimista** — má plný kalendář, mluví rychle, chce
  vidět návratnost hned.
- Cenově opatrný klient **není chudý** — jen nesnáší riziko a chce vidět přínos dřív než
  zaplatí.

## Kontrolní seznam

- [ ] Vím úroveň a slug, načetl(a) jsem nabídku a personu / profil
- [ ] Mám připravený první výrok jako klient (ne komentář)
- [ ] Uživatelka ví: kdo jsem, kdo je ona, jak dlouho, kdy končíme
- [ ] Na konci jasně „Konec hry", skóre ve správném formátu
- [ ] Uloženo do `roleplays/{linie}/`, ne do `transcripts/`
