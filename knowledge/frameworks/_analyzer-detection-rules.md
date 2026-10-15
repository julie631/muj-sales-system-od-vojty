# Pravidla detekce — co v přepisu nepřehlédnout

**Co je tenhle soubor:** pravidla pro `/analyzuj-call`, aby při čtení textového přepisu
nepřehlížel tahy, které obchodnice opravdu udělala. Když uživatelka rozbor opraví („tohle jsem
přece udělala"), přidej sem nové pravidlo — tak se coach zlepšuje.

**Hlavní princip:** přepis je jen text — chybí v něm obraz. Hledej slovní stopy toho, co se dělo
na obrazovce, tahy schované uvnitř dlouhých monologů a neformální podoby Vossových technik
(mirror, shrnutí, „přesně tak").

Související: [`_priority-rules.md`](_priority-rules.md), [`scoring-rubric.md`](scoring-rubric.md),
[`_cz-language-rules.md`](_cz-language-rules.md).

---

## Chyba 1 — přehlédnutá ukázka na obrazovce

### Problém
Obchodnice při sdílení obrazovky něco živě ukazuje (přepne okno, rozklikne detail, ukáže verzi
na mobilu), ale rozbor to označí jako „jen popisovala slovy".

### Proč se to stává
Přepis neobsahuje obraz. Hledají se jen výslovné věty typu „teď sdílím obrazovku".

### Pravidlo
**Hledej slovní stopy živé ukázky:**

| Co zazní | Znamená |
|---|---|
| „Jak vidíte…" / „Jak můžete vidět…" | živá ukázka, ne jen popis |
| „Tady…" + popis obsahu | ukazuje na obrazovku |
| „Tohle se mění tak…", „automaticky se to přizpůsobí" | předvádí funkci |
| „Kdybych vám ukázala…" + popis | chystá se ukázat |
| „Podívejte se sem…" | směruje pozornost na obrazovku |
| „Když na to najedu…" / „Když to rozkliknu…" | komentuje pohyb myší |
| Klient: „aha, vidím", „to je přehledné", „jednoduché" | potvrzuje, že něco viděl |

### Výchozí předpoklad
**Sdílí obrazovku + zazní některá z vět výš → počítej s živou ukázkou.** Jako „jen slovy" to
označ, až když to přepis výslovně říká (např. klient: „to jste mi neukázala").

---

## Chyba 2 — tah schovaný v dlouhém monologu

### Problém
Obchodnice udělá dobrý reframe (vezme něco, co klient řekl před chvílí, a otočí to v argument),
ale je zakopaný uprostřed dvouminutového monologu. Rozbor ho označí jako „chybějící".

### Proč se to stává
Při čtení po sobě jdoucích replik vypadá dlouhý monolog jako „výklad" a konkrétní tah uvnitř se
přehlédne.

### Pravidlo
**V každém monologu nad ~100 slov hledej odkazy zpět na to, co klient řekl:**

| Co v monologu zazní | Znamená |
|---|---|
| Odkaz na konkrétní klientovu zmínku („jak jste říkal, že vám chodí jen na doporučení…") | tah na míru, ne obecný pitch |
| „Pro vás to znamená…" + konkrétní aplikace | personalizace |
| „Když jste říkala X…" + X otočené v plus | reframe |
| Odkaz na něco z posledních 5–10 minut | propojení sekcí |

### Výchozí předpoklad
**Když obchodnice v monologu použije, co klient řekl, počítá se to jako provedený tah** — i když
je schovaný. Penalizace patří do **Mechaniky** (dlouhý monolog ředí účinek), ne do Clarify, Sell
nebo Explain jako „chybějící".

**Správná zpětná vazba v Mechanice:** *„Tah tam byl, ale zapadl ve dvouminutovém monologu.
Samostatná krátká věta hned po klientově zmínce by zabrala mnohem víc."*

---

## Chyba 3 — labely v neformální podobě

### Problém
Obchodnice použije mirror nebo shrnutí s kontrolou a klient odpoví „přesně tak" — ale rozbor
napíše „0 labelů", protože hledal jen formuli „zní to, že…".

### Proč se to stává
Vossův arzenál je širší než jedna věta. Rozbor ho zúžil na jednu formuli.

### Pravidlo — dvě vrstvy

**Vrstva 1 — situace (co se děje):**

| Tah | Příklad |
|---|---|
| **Mirror** — 1–3 slova s otazníkem | Klient: „Jsme až druzí." → „Druzí?" |
| **Shrnutí s kontrolou** | „Takže vám jde hlavně o to, aby… — jestli to chápu správně." |
| **Parafráze** klientovy situace | „Hlavní cíl je, aby se klientky vracely." |
| **„Přesně tak"** — sleduj klientovu reakci | Klient: „Tak, tak, tak." / „Přesně tak." / „To je ono." |

**Vrstva 2 — emoce a identita (co klient cítí):**

| Tah | Příklad |
|---|---|
| „Zní to, že…" + emoce | „Zní to, že vás minulá agentura pořádně zklamala." |
| „Vypadá to, že…" + postoj | „Vypadá to, že chcete mít věci pod kontrolou." |
| „Mám pocit, že…" + emoce | „Mám pocit, že se bojíte, aby to nedopadlo stejně." |
| **Ocenění** po otevřeném přiznání | „To je rozumný přístup, ne škudlení." |
| **Audit obav** — předběhnout negativa | „Možná vám teď přijde, že…" |
| **Kalibrované otázky** | „Jak vám to sedí?", „Co by se muselo stát, aby…" |
| **Otázky na ne** | „Bylo by od věci, kdybych…?" |

### Výchozí předpoklad
**Hledej všechny techniky, ne jen „zní to, že…".** Bodování Label (max 15):

| Co v hovoru je | Body |
|---|---|
| nic z vrstvy 1 ani 2 | 0–2 |
| 1–2 tahy z vrstvy 1 | 3–5 |
| 3–4 tahy z vrstvy 1 + 1–2× „přesně tak" | 6–8 |
| 1–2 z vrstvy 1 + 1 emoční label (vrstva 2) | 8–10 |
| vrstva 1 jako reflex (5+) + 2–3 z vrstvy 2 | 11–13 |
| vrstva 2 jako výchozí, vrstva 1 jako podpora | 14–15 |

### Jak růst
1. Všímej si signálů emocí a identity (nejistota, frustrace, hrdost, váhání).
2. Signál → emoční label.
3. Label **před** argumentem.
4. Sleduj reakci typu „přesně tak, rozumíte mi".

---

## Postup při rozboru

1. **Před bodováním Label:** projdi přepis kvůli mirrorům, shrnutím („jestli to dobře chápu")
   a klientovým „přesně tak".
2. **Před bodováním Sell/Explain u hovoru se sdílením obrazovky:** hledej slovní stopy ukázky
   („jak vidíte", „tady…").
3. **U top 3 misses:** v každém monologu nad 100 slov hledej odkaz na to, co klient řekl.
   Tah tam je → zpětná vazba patří do Mechaniky, ne do „chybějícího tahu".
4. **Uživatelka opravila rozbor?** Přidej sem nové pravidlo (problém → proč → pravidlo →
   výchozí předpoklad).
