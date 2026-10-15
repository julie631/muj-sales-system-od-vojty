# CZ Language Rules — Přirozená čeština v sales scriptech

**Co tento soubor je:** Pravidla pro AI při generování CZ sales scriptů, frází a hodnocení. **Žádné doslovné překlady z US sales materiálů.** Zpětná vazba z praxe: doslovné překlady znějí v CZ uměle a v živém hovoru bys je nikdy nepoužila.

**Master princip:** **Adaptuj, nepřekládej.** Vždy se ptát: "Tohle bych já jako Češka reálně řekla klientovi, který sedí přede mnou?" Pokud zní jako překlad, je to špatně.

**Reference pro tvůj přirozený hlas:** [knowledge/moje-nabidka.md](../moje-nabidka.md) — sekce **Můj hlas** a **Typické námitky a moje odpovědi** — tvoje ověřené CZ formulace s reálnými results (sekce **Důkazy**). **To je norma.** Pokud generovaná fráze zní jinak než tvůj existing styl, něco je špatně.

---

## Hlavní pravidla

### 1. **Kontext > slovo**

Nepřekládej slovo-za-slovo. Vezmi *význam* fráze a vyjádři ho **tak, jak by to Čech přirozeně řekl**.

- ❌ "Maybe means no to us" → "Možná znamená ne pro nás"
- ✅ "Pro nás 'rozmyslím se' = 'ne'."
- ✅ "Když nejsi rozhodnutý teď, tak prostě nejsi rozhodnutý."

### 2. **Žádné "OK, so..." kalk**

Imperium scripty začínají "OK, so what we'll do here is..." Doslovně: "OK, takže co tady uděláme je..." — to v CZ zní jako špatný překlad. Češi takhle nemluví.

- ❌ "OK, so what we'll do here is I'll start by asking you questions" → "OK, takže co tady uděláme je, že začnu pokládat otázky"
- ✅ "Tak pojďme na to. Nejdřív se Tě budu ptát na pár věcí, pak Ti řeknu, jak to děláme."
- ✅ "Uděláme to takhle — pár otázek a pak Ti to ukážu."

### 3. **Žádné "Well..." na začátku**

- ❌ "Well, over at [YOUR COMPANY]..." → "No, u nás ve firmě..."
- ✅ "Hele, u nás ve firmě..."
- ✅ "Tak co děláme my..."
- ✅ "U nás to funguje takhle..."

### 4. **Žádné "What we've found is that..."**

- ❌ "What we've found over the past few years is that..." → "Co jsme zjistili za posledních pár let je, že..."
- ✅ "Za ty roky co tohle děláme se nám potvrdilo, že..."
- ✅ "Vidíme to konzistentně — klienti, kteří..."

### 5. **Žádné "I can say with a lot of confidence that..."**

- ❌ "I can say with a lot of confidence that we can definitely help" → "Můžu říct s velkou jistotou, že Ti můžeme určitě pomoct"
- ✅ "Hele, můžu Ti říct narovinu — s tímhle Ti pomůžeme. Stoprocentně."
- ✅ "Tak já Ti řeknu rovnou — tohle umíme vyřešit."

### 6. **CZ neformální connectors, ne formální**

- ❌ "Furthermore" / "Additionally" → "Dále"
- ✅ "A k tomu" / "A ještě"
- ❌ "However" → "Avšak"
- ✅ "Ale" / "Jen ten háček je"
- ❌ "In addition" → "Navíc"
- ✅ "A ještě k tomu" / "Plus"

### 7. **Pozor na "you" / "vy" / "ty"**

US scripty defaultně používají "you" — neutral, formal/informal hybrid. CZ má 3 možnosti:

- **Tykání ("ty")** — častý default na cold outreach, DM na sítích, hlasové zprávy, mladší klientela
- **Vykání ("vy")** — starší klientela (50+), formální provoz (advokátní kancelář, privátní klinika), premium B2B
- **3. osoba ("Jirka by chtěl..." místo "ty bys chtěl...")** — nepoužívat v sales contextu, zní divně

**Pravidlo:** Default podle `knowledge/moje-nabidka.md` → Můj hlas (Tykám / vykám). Typicky tykání v casual oborech (salony, fitness, mladší podnikatelé), vykání ve formálnějších segmentech (B2B, právo, finance). Persona soubor (`personas/{linie}/{slug}.md`) říká kde co.

### 8. **CZ idiomy > US idiomy přeložené**

- ❌ "Skin in the game" → "Kůži ve hře"
- ✅ "Ve hře" / "Máš v tom zájem" / "Jdeš s vlastní kůží"
- ❌ "Move the needle" → "Pohnout jehlou"
- ✅ "Udělat rozdíl" / "Posunout to" / "Vidět změnu"
- ❌ "Get the ball rolling" → "Rozjet míč"
- ✅ "Rozjet to" / "Začít" / "Jít do toho"

### 9. **Žádné anglicismy bez potřeby**

Některé anglické termíny v CZ business jazyce fungují (deal, pitch, follow-up). Jiné ne (must-have, no-brainer, win-win).

- ✅ "Pošli mi pitch" (= návrh, common usage)
- ❌ "Je to no-brainer" → použij "Je to jasná volba"
- ❌ "Win-win situace" → "Vyhrajeme oba" / "Bude to dobré pro nás oba"
- ❌ "Game-changer" → "Změní Ti to byznys" / "Zlomek"

### 10. **Mluvit tvým hlasem — krátké věty, žádné dlouhé spojky**

V živém hovoru se mluví krátce — tak má znít i tvůj hlas v `knowledge/moje-nabidka.md` → Můj hlas. CZ překlady z Imperium PDF jsou často dlouhé souvětí (US formal). Krátit.

- ❌ "Hele, podíváme se na to čísly — říkáš že máš 600 stálých zákazníků, a průměrný úklid u tebe stojí 1 500 korun, takže pokud z těch 600 lidí jen 10% přestalo objednávat, to je 60 lidí, a pokud by se z nich vrátilo třeba jen polovina, tak..."
- ✅ "Pojďme na čísla. Máš 600 zákazníků. Úklid 1 500 Kč. 10 % přestalo objednávat = 60 lidí. Polovina se vrátí = 30 úklidů × 1 500 Kč = 45k měsíčně. To je 540k za rok."

### 11. **Žádné "let me ask you a question"**

- ❌ "Let me ask you a question — would you say..." → "Dovol mi položit Ti otázku — řekl bys..."
- ✅ "Zeptám se Tě..."
- ✅ "Pověz mi..."
- ✅ "Hele, jedna věc..."

### 12. **Adekvátní level energie**

US sales je high-energy ("LET'S GO", "ABSOLUTELY"). CZ rozhovor je klidnější. Ztlumit ekvivalent.

- ❌ "Absolutely!" → "Absolutně!"
- ✅ "Jasně." / "Přesně." / "Souhlas." / "Tak jest."
- ❌ "Awesome!" → "Skvělé!"
- ✅ "Super." / "Fajn." / "Bezva."
- ❌ "Let's crush it!" → "Pojďme to rozjet!"
- ✅ "Tak do toho." / "Jdeme na to."

### 13. **Pozor na "for me"/"for us" = "pro mě"/"pro nás"**

- ❌ "For me, the next step is..." → "Pro mě, další krok je..."
- ✅ "Z mé strany další krok je..."
- ✅ "Co bych navrhovala..."

### 14. **"That's right" moment v CZ**

Vossova klíčová věta "That's right" — v CZ ekvivalenty:

- ✅ "Přesně tak."
- ✅ "Jo, to sedí."
- ✅ "Jo, to máš pravdu."
- ✅ "Tak nějak to je."
- ❌ "To je pravda" zní suše — používat jen pokud opravdu sedí

### 15. **Tvůj hlas — proven slang z tvých formulací**

Tvůj slovník je v `knowledge/moje-nabidka.md` → Můj hlas (Fráze, které používám). Dokud ho nemáš vyplněný, výchozí přirozený CZ slang:
- "Hele" (otevírání věty, casual)
- "Tak" (transition word)
- "Pojď[me]" (action invite)
- "Na rovinu" (honest framing)
- "Brnknout" (= zavolat, informal)
- "Mrknout" (= podívat se, informal)
- "Pošlu Ti to / brnknu Ti / dám Ti vědět"
- "Klidně" (low-pressure invite)

**Pravidlo:** Pokud generovaná fráze nepoužívá nic z tvého slovníku, vrátit se a přepsat. Tvůj hlas = baseline.

---

## Before/After Examples (z aktuální knowledge base, opravy)

### Příklad 1: Imperium Section 9 (Statement of Confidence)

**Před (doslovný kalk):**
> "OK Claire, well I can say with a lot of confidence that we can definitely help with this. Would you like me to explain how?"
>
> → "OK Jirko, můžu Ti říct s velkou jistotou, že s tímhle Ti pomůžeme. Chceš, abych Ti vysvětlila jak?"

**Po (přirozená CZ):**
> "Hele Jirko, na rovinu — tohle umíme vyřešit. Chceš, abych Ti řekla jak?"

Nebo:
> "Tak Jirko. S tímhle Ti pomůžeme — to Ti slibuju. Mám Ti to ukázat?"

### Příklad 2: Imperium Section 10 (State Your Expertise)

**Před (doslovný kalk):**
> "Well, over at [YOUR COMPANY], our area of expertise is in helping ___ get more ___."
>
> → "No, u nás v kanceláři, naše oblast expertízy je v pomáhání živnostníkům dostat víc..."

**Po (přirozená CZ):**
> "Tak co děláme my v kanceláři — pomáháme živnostníkům, aby na konci roku nic nedopláceli a nic neřešili. Děláme to přes měsíční převzetí dokladů, který..."

### Příklad 3: Imperium "Maybe means no"

**Před (doslovný kalk):**
> "Maybe doesn't cut it. Maybe means no to us."
>
> → "Možná to nepokrývá. Možná znamená pro nás ne."

**Po (přirozená CZ):**
> "U nás 'rozmyslím se' = 'ne'. Když si nejsi jistý teď, nebudeš si jistý ani za týden."

Nebo prostě:
> "Hele, buď jdeme do toho, nebo nejdeme. Nemá smysl to nechávat viset."

### Příklad 4: Imperium handling "let me think"

**Před (doslovný kalk):**
> "Tell them that a maybe is a no to you and that if they want to come onboard at a later date, it will be at the full price with the full setup fee."
>
> → "Řekni jim, že 'možná' je pro Tebe 'ne', a že pokud budou chtít přijít na palubu později, bude to za plnou cenu s plným setupem."

**Po (přirozená CZ):**
> "Hele, na rovinu — pokud teď nejdeš do toho, tu slevu z dneška Ti pak nebudu schopná znovu nabídnout. Buď jdeme teď, nebo ne. Jak to vidíš?"

### Příklad 5: Cole "What's next?"

**Před (doslovný kalk):**
> "You feel really good about the process, you feel like it's what you need, no questions. What's next?"
>
> → "Cítíš se opravdu dobře s tím procesem, cítíš že je to to, co potřebuješ, žádné otázky. Co dál?"

**Po (přirozená CZ):**
> "Tak Jirko. Vidím to tak, že Ti to dává smysl a sedí Ti to. Tak co? Jak se na to díváš?"

Nebo:
> "Jirko, vypadá to, že je to pro Tebe ono. Tak jak to vidíš dál?"

### Příklad 6: Hormozi "It doesn't take time, it takes information"

**Před (doslovný kalk):**
> "It doesn't take time to make a decision; it takes information."
>
> → "Rozhodnutí nepotřebuje čas, potřebuje informaci."

**Po (přirozená CZ — tvůj styl):**
> "Hele, rozhodnutí nikdy nepotřebuje čas — potřebuje informace. A ty teď máš mě. Co Ti chybí, abys řekl jo?"

### Příklad 7: Voss labels v CZ

**Před (doslovný kalk):**
> "It seems like..." / "It sounds like..."
>
> → "Vypadá to, že..." / "Zní to, že..."

**Po (přirozená CZ — funkční varianty):**
- "Mám pocit, že..."
- "Vypadá to..." (krátké, bez "že" — Češi to tak často říkají)
- "Tak jako bys..."
- "Cítím z Tebe..."
- "Mně přijde, že..."
- "Jakoby..."

### Příklad 8: "How am I supposed to do that?"

**Před (doslovný kalk):**
> → "Jak to mám udělat?"

**Po (přirozená CZ):**
- "Hele, ale jak si to mám u sebe vyřešit?" (přidat reálný kontext proč to nejde)
- "Ale to nepůjde — náklady na licenci jsou skoro tam. Co s tím?"
- "Tak já bych Ti rád, ale partneři mě sežerou. Co navrhuješ Ty?"

### Příklad 9: Bay "Would it be a bad idea if..."

**Před (doslovný kalk):**
> → "Bylo by to špatný nápad, kdybych...?"

**Po (přirozená CZ):**
- "Vadilo by, kdybych Ti dala 30 vteřin?"
- "Co kdybych Ti rychle vysvětlila...?"
- "Hele, mám 30 vteřin? Pak rozhodneš."

### Příklad 10: Imperium incentive based pricing

**Před (doslovný kalk):**
> "What we've found over the past few years of doing this is that people who make quick decisions always turn out to be the best clients."
>
> → "Co jsme zjistili za poslední pár let při dělání tohoto je, že lidé, kteří rozhodují rychle, se vždycky ukáží jako nejlepší klienti."

**Po (přirozená CZ):**
> "Za ty roky co tohle děláme se nám potvrdilo — lidi, který rozhodnou rychle, jsou pak naši nejlepší klienti. A protože s nimi máme nejlepší výsledky, dáváme incentive pricing. Pokud řekneš jo dneska, dostaneš slevu {výše slevy} na setup. Takže {tvoje cena — setup po slevě} jednorázově + {tvoje cena — měsíčně} měsíčně."
>
> *[Ticho.]*

Čísla ber z `knowledge/moje-nabidka.md` → Ceník.

---

## Pravidla pro AI při generování

### Při `/analyzuj-call`

Pokud obchodnice v reálném callu použila **přirozenou CZ formulaci**, která se liší od doslovného překladu Imperium/Voss/Cole, **NEPENALIZUJ** ji. Hodnotí se *funkce* fráze, ne literal match s scriptem.

Příklad: obchodnice řekla "Hele Jirko, mám pro tebe rovnou cenu — {tvoje cena za setup} setup a {tvoje měsíční cena} měsíčně, [ticho]." To je správné CZ provedení Imperium Section 12 pricing reveal, i když to není doslovný překlad Imperium scriptu.

### Při `/priprav-call`

Pokud generuješ battle cards s konkrétními frázemi pro obchodnici, **každou frázi prošlapni před output**:

1. Použila bych to já jako Češka? (Pokud ne → přepsat)
2. Zní to jako její hlas z `knowledge/moje-nabidka.md` → Můj hlas? (Pokud ne → přiblížit)
3. Není to doslovný překlad z anglického originálu? (Pokud ano → adaptovat)
4. Používá to její slovník z Můj hlas (výchozí "Hele", "Tak", "Na rovinu")? (Bonus pokud ano)

### Při `/role-play`

AI hraje prospekta = mluví naprosto přirozeně CZ. Žádné US sales fráze v ústech české majitelky salonu nebo opatrného společníka z B2B firmy. Pokud AI jako prospekt řekne "Absolutně!" nebo "To je game-changer!" → break character, mluví anglicky.

---

## Slang library — tvůj hlas (proven CZ formulace)

Výchozí knihovna. Tvoje vlastní ověřené formulace z `knowledge/moje-nabidka.md` (sekce Můj hlas a Typické námitky a moje odpovědi) mají přednost:

**Otvírače:**
- "Hele [jméno]..."
- "Tak hele..."
- "Pojď[me] se podívat na..."
- "Co kdybych Ti řekla..."
- "Dej mi 30 vteřin..."

**Transitions:**
- "Tak..." (default)
- "OK, tak..."
- "Pojďme dál."
- "A teď k té druhé věci..."
- "A ještě jedna věc..."

**Honest framing:**
- "Na rovinu..."
- "Hele, řeknu Ti to rovnou..."
- "Tak Ti to řeknu narovinu..."
- "Bez kecu..."

**Disagreement / pushback:**
- "Hmm, ale to není úplně tak..."
- "Já bych to viděla jinak..."
- "Hele, počkej..."
- "To Ti vysvětlím jinak..."

**Closing / commitment:**
- "Tak jak to vidíš?"
- "Co rozhodneš?"
- "Jdeme do toho?"
- "Tak co, půjdeme do toho?"
- "Tak Ti pošlu smlouvu a v pátek se ozvu."

**Pricing:**
- "Investice je..."
- "Stojí to..."
- "Cena je..."
- "Z mé strany to je..."

**Soft no / disqualify:**
- "Hele, na rovinu — tohle možná není pro Tebe."
- "Možná to není ten správný čas."
- "Ozvi se, až to bude relevantní."

---

## Pravidlo o směru oprav

⚠️ **Pokud najdeš v existing per-topic file nebo v `imperium-deep.md` doslovný překlad, který tu zní špatně:**

1. Při generování konkrétního výstupu (battle card, scorecard, role-play replika) → **použij přirozenou CZ verzi**.
2. Při čtení source materiálu (Imperium PDF citations, Voss original) → **zachovej English original v citaci + dej CZ adaptaci níže**.
3. **NEEDITUJ** existing knowledge base files (per-topic files atd.) bez explicitního pokynu — obchodnice to může chtít vidět původní US source pro reference.

---

## Sources

- `knowledge/moje-nabidka.md` → Můj hlas — tvůj proven hlas, master reference
- `knowledge/moje-nabidka.md` → Typické námitky a moje odpovědi — proven CZ námitky handling
- `knowledge/moje-nabidka.md` → Jak vypadá můj hovor — proven CZ průběh tvého sales callu

---

## Changelog

- 2026-05-17: Initial. Zpětná vazba na doslovné překlady ve výstupech. 15 master rules + 10 before/after examples + slang library.
- 2026-05-19: Doplněn reálný corpus — autentické CZ fráze z analyzovaných hovorů, ne rekonstrukce.
- 2026-05-19 (večer): Doplněny B2B fráze — gold standard patterny (kalibrovaná Q po cenové námitce, multi-tier reframe, case study bridge napříč segmenty, GDPR/DPA template) + anti-patterny.

---

## Reálný corpus — autentické CZ fráze z živých hovorů

Extrahováno z reálných nahraných hovorů. Kategorizováno per CLOSER sekce. ✅ = používat, ❌ = anti-pattern (v reálném callu použito, ale nefunguje).

### Opener / Agenda

✅ **Použít:**
- "Tak jo, jestli souhlasíte, tak bych šla rovnou na to, ať vás zas tak dlouho nezdržuju moc."
- "Já bych vám ráda řekla, jak tenhle hovor bude probíhat, pak postupně, abychom to stíhali."
- "Pokud uvidíme, že to dává smysl pro obě strany, představím i možnost spolupráce. Je to za vás v pořádku?"

**Pattern:** Time respect + agenda + permission mutual frame. Imperium Section 2 done well. Gold standard, převzít napříč liniemi.

### Discovery / Clarify

✅ **Použít:**
- "Proč jste se rozhodl(a) dát si se mnou tenhle videohovor?" (Imperium Section 3, standardní otvírák)
- "Co vy z toho očekáváte?" (follow-up po past attempt info)
- "Co vás od toho jako brzdilo?" (otevírá pain z minulosti)
- "Kdybyste měl říct ten nejvíc nejlepší výsledek, který byste z toho chtěl?" (primary motive Q)

### Past attempts / Overview

✅ **Použít:**
- "Spouštěl jste je sám, nebo to spouštěl jako někdo jinej?"
- "Kdybyste měl říct top tři věci, co se vám na té spolupráci fakt jako líbily?" (Voss positive past anchor)
- "Bylo to pro vás něco, co bylo přínosný, nepřínosný?"

### Reframe / Edukace

✅ **Použít:**
- "Tomu slevovýmu portálu je jakoby jedno, kdo k vám přes něj přijde — pak získáte nerelevantní lidi, který jsou vám fajn číslo, ale v podstatě k ničemu." (vanity metric reframe, USE NAPŘÍČ LINIEMI)
- "Doporučení jsou spíš takový, že je budujete dlouhodobě, v rámci dobrýho jména." (organic vs paid edukace)
- "Ať to není účetnictví z továrny na živnostníky." (diferenciace, charakteristická)
- "Ono u poptávek nejde o kvantitu, ale kvalitu." (clean teach)

### Pricing framing

✅ **Použít:**
- "Jsou tři typy lidí. Buď začátečníci kolem {nízká cena v oboru}, pak průměr cena to něco jsme jako my, a pak máte cenu jako {nejdražší značka v oboru} nad {prémiová cena} měsíčně." (3-tier market positioning, USE pro premium reframe)
- "Je to dobře, že to je hodně peněz, protože ve chvíli, kdy půjdete do spolupráce za hodně peněz, tak to budete brát jako dost seriózně." (skin in the game reframe)
- "Můžu se zeptat, jestli to není osobní, tak klidně neodpovídejte, kolik tam utrácíte do reklamy?" (permission-based budget Q, Voss-style)

### Expectations setting

✅ **Použít:**
- "Pokud do toho půjdete tak, že to zkusíte na měsíc, nemůžete očekávat extrémní výsledky, protože je to první testovací měsíc."
- "Ten první měsíc je vždycky testovací, pak ty další se optimalizují."
- "Spoustu lidí dělá chybu, že nechá kampaň týden a říká si 'to se rozjede'. Nerozjede."
- "Po třech dnech my se podíváme, funguje, nefunguje, proč."

### Abundance / Detached posture

✅ **Použít:**
- "Určitě se s nima spojte, určitě vyslechněte si jejich nabídku."
- "Podle toho, co vy říkáte, tak si myslím, že pro vás nemá v aktuální chvíli smysl spouštět ten firemní kurz." (willingness to walk away — paradoxně vede k vyšším close rates)

### Soft close / Pre-close gut-check

✅ **Použít:**
- "Když se na to teďka podíváte, vnímáte to jako něco, co vám může pomoct, co vám může přinést to, co vy chcete?"
- "Co na to říkáte?" (Cole's "What's next" CZ ekvivalent)
- "Co by pro vás v tom byla přidaná hodnota?" (Sandler reverse / value-flip když challenged)

### Rapport / Lehkost

✅ **Použít:**
- "Za mě je to fajn web." ("Za mě" jako personal opinion frame — autentické, osobní)
- "Tak ráda slyším." (krátká pozitivní reakce, ne přehnaná)
- "Rozumím." (acknowledgement bridge, kratší než "chápu")
- "Tak jo, tak jsme domluvení." (closing acknowledgement)

---

### ❌ ANTI-PATTERNY (v reálných callech použito, ale nefunguje)

- ❌ "Máte nějakou otázku? Něco, na co byste se chtěl zeptat?" (když zazní 4-5× za call = transition placeholder, ale vyzývá k pasivitě prospecta — nahradit aktivní calibrated Q: "Co Vám v tom, co jsem zatím řekla, dává nejmenší smysl?")
- ❌ "Budu upřímná, ještě jsme to nedělali..." (devalvační. Lepší: "Hele, se stavebníma firmama jsme teprve začali rozjíždět. Princip je ale identický a tady proč...")
- ❌ "Hm, hm. Chápu, rozumím tomu." (na emoční disclosure = vata. Nahradit Voss labelem.)
- ❌ "Já nejsem uzavřená tady těm věcem." (overflexibility, kapitulace na nejistotu)
- ❌ "Už nevím." (conviction killer při ceně/námitce. Použij: "Pojďme to spočítat na Tvojich číslech.")
- ❌ "Spíš to necháme, že se ozvu já vám." / "Dejte vědět." (ztráta kontroly, soft "ozveme se" close — porušuje pravidlo: další krok vždy domluvit hned)
- ❌ "Tak ono jak říkáte, **eh, no**..." (Imperium kalk start s "eh, no" = nejistota; častý tik, snížit)

---

## B2B specific phrases

### GOLD STANDARD patterns

✅ **Kalibrovaná Q po cenové námitce:**
> "Já se vás narovinu zeptám, jakej je vlastně jako ten váš očekávanej budget, kolik vy jste jako do toho ochotnej měsíčně investovat, ať mám nějakou představu, s čím vlastně pracujeme."

**Pattern:** Místo slevy/defenzivy — kalibrovaná Q → prospect sám otevře číslo → reframe nabídky na to číslo. **Best pattern, use cross-line.**

✅ **Multi-tier reframe:**
> "Ve chvíli, kdybysme vzali tu nabídku dva a jenom bysme odsud dali pryč tady tuhle část... tak bysme se budgetově do toho vašeho budgetu vlezli."

**Pattern:** Několik nabídek → "máme 1 přesně pro tebe za tvůj budget". Trasforms "drahý" námitku do tailored fit.

✅ **Case study bridge napříč segmenty:**
> "Vím, že je to jinej segment, máme dobrou odezvu u {obor tvé case study} — {tvoje case study s čísly: co jste udělali, kolik lidí / Kč to přineslo, za jak dlouho}."

**Pattern:** Acknowledge segment difference + konkrétní čísla z proven case (`knowledge/moje-nabidka.md` → Důkazy) + "princip je stejný". **Použít napříč liniemi pro proof point.**

✅ **GDPR / DPA template** (prospect = právník):
> "My zároveň vždycky podepisujeme smlouvu DPA — to nám udává zákon GDPR. Aby vy byste byli nějakou formou krytí, aby když přijde kontrola, tak je vidět, že to máme."

**Pattern:** Konkrétní právní rámec (DPA) + reframe "vy budete krytí". B2B-essential, regulated industries.

✅ **Acknowledgement otevřenosti:**
> "Děkuju, že jste mi rovnou řekl, co je pro vás prioritní, protože to jsem se vás chtěla rovnou zeptat."

**Pattern:** Rapport bridge po citlivém disclosure. Použít po budget/pain disclosure.

✅ **Soft disqualify low-tier:**
> "Tady tahle nejnižší nabídka — bych ji doporučovala jenom ve chvíli, kdybyste si chtěl oťukat, jestli online kurz je pro vás nějaká cesta."

**Pattern:** Posílí mid/high tier tím, že entry-level je explicitly označený jako "jen testovací". Reverse psychology v service nabídkách.

### ❌ ANTI-PATTERNY z B2B callů

- ❌ **Vágní cenový range "5-10 tisíc"** — conviction killer. Use konkrétní číslo + ticho.
- ❌ **Feasibility hedging před closer:** "...s takovým budgetem bysme byli schopni... ale mrknu, co umí váš systém". Use: *"S tímhle budgetem to dává smysl. Nastavíme to během týdne. Sedí?"*
- ❌ **"Mhm, mhm"** na emoční disclosure — viz anti-patterny v reálném corpusu výš, stejný pattern.

### 1-10 Gut-check Q před close (GOLD pattern, cross-line)

✅ **Autentická scaling Q:**
> *"Kdybyste měli ohodnotit to, co se vám tady oprezentovalo, od 1 do 10, s tím, že jednička je úplný hovno, desítka je... A kdyby to měla být desítka, co by to muselo ještě obsahovat?"*

**Pattern:**
1. Scale 1-10 (s vtipným anchor "úplný hovno" — CZ přirozené)
2. Prospect dá číslo (typicky 7-8)
3. Follow-up: "Co by muselo vypadat, aby to byla 10?"
4. Vytahuje **konkrétní gap k uzavření** — ne abstraktní rezervaci

**Sandler-style scaling Q v CZ adaptaci.** Nenuti prospecta committovat, ale dává ti precise ammo pro pricing nabídku / follow-up. **Use cross-line (všechny linie).**

⚠️ **Použít před close fází, ne během pitch.** Best timing: po prezentaci nabídky, před cenou.

### Tech-Savvy Honest Authority Reframe 🏆 (CLOSED-validated)

✅ **Z CLOSED callu s tech-savvy prospectem:**

Když prospect má pokročilejší tech tools než ty (GoHighLevel, Klaviyo, Make, vlastní integrace) — **NEHRAJ na "my umíme všechno"**. Místo toho:

**4-step mechanika:**
1. **Honest acknowledgment:** *"Nepracovala jsem v GoHighLevel, ale..."*
2. **Domain expertise pivot:** *"...hlavní věc je, že vám nastavit takovéhle automatizace zabere hrozně dlouhou dobu. Pak optimalizovat, opravit když se něco pokazí..."*
3. **Production frame:** *"My vám dáme hotový produkt, který víme, že funguje na CZ trhu, v oboru jako je ten váš."*
4. **Compatibility offer:** *"Klidně se mrkneme, jestli to umíme napojit přes API."*

**Pattern:** "Doctor that knows what he doesn't know." Tech-savvy buyers detekují BS okamžitě = **honest authority = trust**.

**Důkaz funguje:** prospect (malý tým, platil si vlastní pokročilý nástroj) sám navrhl: *"Tak se klidně koukněte, jestli byste to dokázala nastavit. A můžeme to zkusit."* = byl to PROSPECT kdo navrhl pokračovat.

**Cross-line:** B2B (firmy s vlastními weby a CRM), e-shopy (klienti s Mailchimp/Klaviyo).

⚠️ **Use specifically:** engineering-mindset prospects, GoHighLevel/Klaviyo/Make users, dotazy na API integraci. **Skip pro low-tech prospects** (klasický malý salon prošel i bez toho).

### Post-Rekonstrukce / Re-Opening Quick-Win 🏆 (CLOSED-validated)

✅ **Z CLOSED callu s majitelem po rekonstrukci:**

Když prospect má jakýkoli **"comeback moment"** (rekonstrukce, nová pobočka, návrat z pauzy, rebranding, nový majitel) → **nabízej jednorázovou akci** pro celou jeho klientskou základnu jako **quick-win** PŘED plnou implementací.

**4-step mechanika:**
1. **Identify trigger event** v discovery (rekonstrukce / nová pobočka / cover gap / sezónnost)
2. **Spočítej ROI nahlas:** *"X klientů × Y% reakce × Z konverze × W Kč = N Kč z 1 akce"*
3. **Frame jako "hned to bude pomáhat":** instant gratification pre-commitment
4. **Phase implementation:** *"Nejdřív tohle, pak postupně pravidelný program, další části služby atd."*

**Fráze v přirozené CZ (fyzioterapeutka → fitness centrum po rekonstrukci):**
> *"To si myslím, že by mohlo být hodně silně u vás, že bychom byli schopni udělat jednorázovej den otevřenejch dveří. To znamená, že celý vaší členský základně hele, dodělali jsme rekonstrukci, otevřeli jsme to, prostě pojďte se k nám podívat a nechte si zdarma zkontrolovat záda... A prostě to rozeslat těm dvěma tisícům lidí."*

**Důkaz funguje:** prospect (investor, tisíce kontaktů v databázi, těsně po rekonstrukci) odpověděl: *"To znělo zajímavě. Myslím, že teď při tom znovu začátku nám to asi pomohlo. Tak jo. Já bych se do toho rád vrhnul."*

**Pattern win:** "Situational pattern match > sales script." Obchodník sám pojmenoval ideální use-case PŘED než prospect explicit řekl, co chce. Trust = "tenhle člověk chápe mojí situaci."

**Cross-line:**
- **Salony:** post-rekonstrukce / nová pobočka / nová kolegyně v týmu
- **B2B:** nový jednatel / rebranding / vstup do nového regionu
- **E-shopy:** seasonal launch / nový produkt / sale event

### Group Call Master Frame 🏆 (CLOSED-validated)

✅ **Z CLOSED group callu** (účetní kancelář → 4-5 fyzioterapeutů ze sdílené praxe, každý na vlastní živnost):

**Multi-decision-maker (3+ lidí) call protokol:**

**1. Group permission frame v intro:**
> *"Jinak kdybyste měli v průběhu jakýkoliv otázky, kdo koli, tak někdo mě přerožte, skočte mi do toho, ať je všechno jasný."*

Otvírá 4-headed engagement, ne 1-owner pitch. Každý speaker cítí, že má hlas.

**2. Pre-pitch economic decision frame mapping:**
> *"Já jsem pochopila, že vy máte vlastně každý svoji živnost a jen sdílíte prostory, takže byste si to platili každý zvlášť."*

Adresuje ekonomický decision frame všech přítomných v prvních 30 sec. Bez tohoto by 3 ze 4 stagovali "platí to owner, mě se to netýká".

**3. Per-person decomposition v případové studii:**
> *"{celkový výsledek z tvé case study} = {Kč} za {počet dní}, {Kč} na každého z vás."*

Vždy total → per-person split. Každý ze 4 si **sám spočítá vlastní ROI** během poslechu.

**4. Proactive objection preempt (zvlášť silný v group):**
> *"Já často, když řeknu, že převezmeme celý účetnictví online, tak spousta lidí je to, že vlastně nad tím ztratí přehled... I formou nějakou určitou chápu, z čeho to vychází..."*

V group calls je proactive preempt 2× silnější — jedna sdílená skepse může nakazit 3 ostatní. Acknowledge legitimacy + distancing reframe.

**5. Stagnace context v case study:**
> *"V lednu, kdy většina praxí stagnuje..."*

Preempt "v dobré sezóně každý vydělá" námitky.

**Důkaz funguje:** CLOSED (4-5 speakerů, deal done, onboarding dokument exists).

**Cross-line:** salony s více kolegyněmi na živnost, family-business kosmetika, partner-business B2B.

---

### Pre-Price Commitment Q — MASTER PATTERN 🏆 (CLOSED-validated)

✅ **Z CLOSED B2B callu**, single biggest leverage pattern v celém corpusu:

> *"Já se vás ještě zeptám takhle, já budu jakoby upřímná. Ona ta naše služba je ještě jakoby dražší, než co vy jste platila. A zeptám se vás takhle, když by vám to přinášelo ty výsledky, byla byste do toho ochotná investovat i víc?"*

**Pattern:** Voss-style budget calibration **PŘED revelací ceny.** Klient sama odpoví "ano, pokud ekonomicky dává smysl" = **pre-commitment eliminuje slevovou negociaci**.

**Mechanika v 3 krocích:**
1. Acknowledge prior anchor: *"Naše služba je dražší, než co platíte teď."*
2. Calibrated value Q: *"Když by vám to přinášelo výsledky, byla byste ochotná investovat víc?"*
3. **Po prospect's "ano" pak řekni cenu** + TICHO 5s

**Důkaz funguje:** Klientka se po této otázce sama přerámovala z "drahé" na "if ROI, then yes" → close.

**Codify:** Always-on slot v `/priprav-call` battle card pro každý B2B call. **Tier-up potenciál: Tier 4 → Tier 5.**

⚠️ **Pozor:** Nelže ohledně ceny ("naše je dražší") = honest setup. Voss authentic, ne manipulace.

### Cole-tier Risk Reversal Financing (low-budget prospects) 🏆

✅ **Z callu s low-budget prospectem:**

> *"Můžeme udělat to, že {tvoje služba} nasadíme zadarmo, ty zaplatíš jen {přímé náklady — licence, materiál}. Po 30 dnech, pokud to přineslo výsledky a vydělalo ti peníze, doplatíš částku. Nebo druhá možnost — vezmeme procenta z {tržby}, co by ti to přineslo."*

**Pattern:** Risk reversal financing tier — **NIKDY sleva**, vždy **financing flexibility**.

**3 tiery:**
1. **Postpaid:** klient platí jen variabilní náklady, fixed po 30 dnech když výsledky
2. **Procenta z výsledků:** revenue share místo fixed
3. **Standard:** plná částka upfront

**Princip:** Sleva snižuje vnímanou hodnotu. Financing flexibility **posunuje risk z prospecta na agenturu** = autorita, ne desperace.

**Cross-line gold pro:**
- Nascent businesses (typicky: "v obrovské ztrátě, 3000 na jídlo")
- Solo entrepreneurs s nestabilním cash-flow
- Skeptické prospects after burn (typicky: "vyhořela jsem za 12k")

### ROI Sentence Template 🏆

✅ **Z CLOSED callu s majitelem víc provozoven:**

> *"V průměru za {loňský rok} se jim {baseline — např. vrátilo X lidí měsíčně}. Od spuštění {tvoje služba} {výsledek Y} — {násobek} tím, že jsme {jeden jednoduchý krok}."*

Čísla ber jen z `knowledge/moje-nabidka.md` → Důkazy.

**Template:** `Baseline X → s námi Y → mechanism Z`

**Proč funguje:**
- **Baseline** = klient si potvrdí "ano, to mě stojí takhle"
- **S námi** = konkrétní výsledek (ne abstract "lepší")
- **Mechanism** = pochopí JAK (jeden jednoduchý krok místo složitého systému = simple)

**Cross-line aplikace:**
- Salony: "{X} vs {Y} vrácených klientek"
- B2B: "{X} poptávek/měs dnes vs {Y} s námi přes [mechanism]"
- E-shopy: "{počet kontaktů} × X% konverze × Y Kč = Z ROI"

### Konditional Close: "Dej mi přístup, spočítám konkrétně" 🏆

✅ **Z CLOSED callu s majitelem víc provozoven:**

> *"My jsme schopni, kdyby vy nám dali přístupový údaje, projít celej váš systém, vzít všechny data a připravit podle nich konkrétní odhad, co by vám to mohlo přinést."*

**Pattern:** Místo "rozmysli si" → **conditional close offer**. Přesouvá rozhodování z abstract ("zní to dobře, ale...") → concrete ("tady jsou tvoje čísla, X Kč potenciál").

**Použít kdykoli prospect váhá nad ROI/výsledky.** Bridge mezi 1. callem (discovery) a 2. callem (custom proposal).

### "Práce na byznysu, ne v něm" Sandler Reframe

✅ **Z callu se sólo podnikatelem:**

> *"Jestli to chápu správně, tak byste chtěl víc pracovat už na byznysu a ne v tom byznysu."*

**Pattern:** Sandler classic v přirozené CZ. Funguje na **každého solo entrepreneura** — pojmenuje vyhořívání ze role-confusion.

**Trigger:** Když prospect zmíní vyhořívání, time pressure, "musím všechno sám".

### Filozofické Differenciační Reframe (vs konkurence/spam) 🏆

✅ **Z CLOSED callu:**

> *"Úklid je hodně o reálně lidský důvěře, proto nefungujou firmy typu každej tejden jiná brigádnice. My posíláme pořád stejný lidi — péče, ne fabrika."*

**Pattern:** Místo "jsme lepší" → vysvětli **co je jiné a proč**. Ideologie, ne featury.

**Cross-line:**
- Salony: "Naše péče není pás, je to čas jen pro vás"
- B2B: "Naše školení nejsou prezentace ze šuplíku, jsou na vaše procesy"
- E-shopy: "Naše fotky nejsou fotobanka, jsou na míru tvého brandu"

**Validated by CLOSED outcome** na pre-edukovaném prospectovi.

### ⚠️ Cross-call ANTI-PATTERN: Pricing reveal bez ticha

❌ **Velmi častý pattern napříč cally:**

Obchodník řekne cenu ("{tvoje cena} + {tvoje garance}") a **OKAMŽITĚ navazuje** *"S tím, že..."* / *"To co bysme byli klidně schopní..."* / *"Tohle je první balíček, druhej..."*

**Důsledek:** Sám zabíjí pricing tlak. Prospect nemá prostor reagovat. Konsenzus všech zdrojů (Imperium, Cole, Hormozi, Voss): **po ceně mlč 5+ sekund.**

**Drill:** `/role-play meta:cena-ticho` — po každé ceně v role-play **počítej do 5 v hlavě**, NIC neříct.

### ⚠️ Cross-call ANTI-PATTERN: Casual-buddy framing trap

❌ **Typický REGRESS:** po silném strukturovaném callu přijde call s kamarádským prospectem a skóre spadne o desítky bodů.

**Pattern:** Prospect používá "kámo, tykání hned" → obchodník intuitivně zrcadlí → **ztrácí Imperium strukturu** → vrací se ke generic pitch.

**Pravidlo:** Tykání ano (CZ správné dle persona), **ALE struktura ne-negociovatelná**. 

> Win = ty jako *doktorka*. Loss = ty jako *kámoška*.

**Drill:** `/role-play archetype:casual-buddy-prospect` — držet strukturu i s tykáním + casual tonalitou.

### "Malý firmy to nezajímá" — anti-pattern

❌ **NIKDY:**
> *"Většinou když mám s malejma firmama, tady tyhle technický data je vyloženě nezajímají, takže to nemám ready."*

**Proč anti-pattern:**
1. **Conviction killer** — obchodník sám přiznal že nemá data ready
2. **Insult k prospectovi** — implikuje "ostatní majitelé jsou tupí na čísla"
3. **Position downgrade** — sofistikovaný prospect (má vlastní e-shop, vystřídal několik marketingových nástrojů) se cítí jako "exception"

**Místo toho:**
> *"Hele, super otázka — to je přesně to, co bys jako [marketér / e-shopák / etc.] čekal a já bych to měla mít ready. Mám to v dashboardu. Na druhý call Ti to vytáhnu jako case study přesně pro tebe. Sedí?"*

**Princip:** Honesty + acknowledge sofistikaci + commit deliverable s deadlinem. Nikdy generalizovat ostatní zákazníky negativně.

### ROI-math-first pricing reveal (template)

**Sequence** (z promarněného momentu v B2B callu):
1. Před cenou nahlas spočítat math prospecta: *"Máš X kontaktů × Y% konverze × Z hodnota = N návratnost"*
2. Vyslovit cenu: *"Investice je {tvoje cena} měsíčně"*
3. **TICHO 5 vteřin**
4. Klient mluví první.

**Příklad (e-shop, produktové fotky):**
> "Máš 2 000 návštěv denně. Konverze 1 %. Lepší fotky ji konzervativně zvednou o 0,2 % = 4 objednávky denně × 800 Kč = 96 000 Kč měsíčně. Můj návrh: {tvoje cena} měsíčně. Vrátí se za 1. měsíc. Sedí?" [TICHO]

---

### Buyer-side fráze (nahrávka, kde obchodník hraje prospecta)

Obchodník v jedné nahrávce hraje skeptického buyera (volá mu marketér). Z jeho reakcí lze odvodit, **co sám expectuje** od kvalitního sales callu:

- *"...různý agentury se mi samozřejmě ozývají, těhle těch hovorů jsem pár měl."* — frame-setter opener (= sales musí v intro řešit "jsme jiní")
- *"...chci mít nějakou garanci, protože když mám někomu dát peníze za něco."* — garance = must-have (potvrzuje, proč garance funguje — tvoje viz `knowledge/moje-nabidka.md` → Garance)
- *"...stačilo by mi jméno někoho, kdo už to vyzkoušel, já si ho dohledám."* — social proof escalation (mít 3-5 jmen ready)
- *"Eh, to by asi záleželo. To by záleželo na těch podmínkách."* — kalibrovaný hedge (použít když prospect tlačí cenu před discovery)
- *"Eh, ještě jednou, jak jste to myslel?"* — clarify request (neutrální, krátká)

---

## Close-phase patterns z drillu (prospect srovnává s konkurencí)

**Kontext:** Drill na reálný scénář — Marketing-Sophisticated Builder (majitel stavební firmy, nabídky účetních kanceláří si odborně porovnává), který svou nabídku porovnává se 3 konkurenty a chce počkat na pondělní call s 3. kanceláří. Drill skončil **conditional commit closem s konkrétními logistikami** (smlouva do 21:00 dnes, pondělí 12:30 Meet, záloha tentýž den večer).

Tyto patterny jsou **kanonizace tahů, které obchodník deployoval instinktivně.** Cíl: aby šly příště vyvolat vědomě, ne náhodou.

### A. Apple-to-Apple Destruction Sequence

**Trigger:** Klient porovnává tvou cenu s konkurencí, kterou ještě VIDĚL jen na webu / nemluvil s ní callem.

**Sekvence:**

1. **Recall konkrétních čísel z discovery** (NEIMPROVIZUJ — pamatuj si je): *"OK, jen abych se ujistila — 1. nabídka ti vůbec neseděla. 2. byla 6 500 měsíčně = ~78k/rok. 3. ještě nemáš a hádáš 9-10."*
2. **Force "nevím" disclosure** vyjmenováním scope gaps formou yes/no Q:
   - *"Víš, že tam bude mzdovka?"*
   - *"Víš, že tam bude celé daňové poradenství?"*
   - *"Víš, že tam bude zastoupení na finančáku?"*
   - *"Víš, že mají zkušenosti se stavebnictvím konkrétně?"*
   - *"Víš, že jsou experti?"*
3. **TICHO.** Klient musí sám připustit *"nevím, to zjistím v pondělí"*.
4. Anchor je zničený **bez toho, že bys řekla "oni jsou špatní"**.

**Proč funguje:**
- Klient se sám diskvalifikuje (Cialdini consistency — co řekl, musí obhájit)
- Ty nikoho neútočíš → nemůžeš být obviněna z pomluvy
- "Apple-to-orange" frame se nasází bez explicit attack

**Příklad celé repliky (drill):**
> *"Ok, jen abych se ujistila, o kom se bavíme. 1. nabídka ti vůbec neseděla. 2. byla 6 500 měsíčně. 3. ještě nemáš a hádáš 9-10. Tak jen, o kom se teda bavíme a od koho to máš — víš, že tam bude mzdovka, víš, že tam bude celé daňové poradenství, víš, že tam bude zastoupení na finančáku, víš, že mají výsledky, víš, že mají zkušenosti a jsou experti?"*

**Refinement:** Konkretně se zeptej až na 5 deliverables (ne 3), aby klient musel přiznat "nevím" víckrát = kumulativní efekt.

---

### B. 9-Layer Soft Disqualification Pattern

**Trigger:** Stejný jako (A) — klient porovnává s neznámou konkurencí. (A) destruuje pricing anchor faktově, **(B) jde po identity / archetype** — projektuje, že konkurent je "obyčejná účtárna" zatímco klient potřebuje "parťáka, co mu hlídá peníze".

**9 vrstev v jednom monologu** (60-90s, lépe rozdělené do 3 chunků s pauzami):

| # | Vrstva | Funkce | Příklad fráze |
|---|---|---|---|
| 1 | Honest uncertainty admission | Disarm — klient ti neodpoví "tlačíš mi nabídku" | *"Hele, já si nejsem jistá."* |
| 2 | Probabilistic anchor (10-15 %, NE 2 %) | Soft disqualification bez absolute claim | *"Klidně možný, řekněme tak 10-15 %, že to bude topka."* |
| 3 | Overstated counterfactual | Reductio ad absurdum | *"4× lepší servis, 5× lepší výsledky, 6× líp s tebou budou komunikovat."* |
| 4 | Authority / zkušenost insert | Earn right to dělat archetype claim | *"V účetnictví se pohybuju dlouho, potkala jsem hodně kanceláří."* |
| 5 | Generic category attack | Disqualifuj **kategorii**, ne konkrétně competitor | *"Kanceláře co dělají jen účetnictví = zaúčtujou doklady, podají přiznání, ale daňovou optimalizaci už neřeší."* |
| 6 | **Identity reframe (Voss Vrstva 2)** | Pull klienta do deep want | *"Ty nechceš někoho, kdo zaúčtuje doklady. Ty chceš někoho, kdo ti ohlídá peníze. Ty chceš klid."* |
| 7 | Disclaim / face-save | Klient se nemusí defenzivně bránit | *"To neříkám, že to je případ té místní kanceláře."* |
| 8 | Soft projection | Wrapped insinuation | *"Podle toho, co o nich říkáš, na mě působí, že..."* |
| 9 | Calibrated diagnostic Q | Force klient articulate criteria | *"Co od nich konkrétně očekáváš v pondělí?"* |

**Proč funguje:** Vrstvy 6 + 7 + 9 společně přesunou klienta z "obhajuju konkurenta" do "musím sám si připustit, co od nich realisticky čekám" = self-persuasion flip.

**Chunk struktura pro live call (3 × 15-20s):**

```
CHUNK 1: Vrstvy 1-3 (uncertainty + probability + counterfactual)
[PAUZA 2-3s]
CHUNK 2: Vrstvy 4-5 (authority + category attack)
[PAUZA 2-3s]
CHUNK 3: Vrstvy 6-7-8-9 (identity reframe + disclaim + projection + Q)
```

**Anti-patterns:**
- ❌ "2 %" — zní manipulativně, klient registruje fake jistotu
- ❌ "Eh / hm" markery uprostřed monologu = signál nejistoty → nahradit **TICHEM**
- ❌ Nepřerušený monolog 90s+ bez pauz = klient ztratí pozornost

---

### C. Identity Reframe ("ty nechceš X, ty chceš Y")

**Trigger:** Klient se baví o povrchu (cena, design, hezký obal, levná varianta), ale skutečný want je hlubší (funkce, výsledky, ROI).

**Struktura:**
> *"Ty nechceš [povrch]. Ty chceš [deep want]. Sedí?"*

**Příklady:**
- *"Ty nechceš někoho, kdo zaúčtuje doklady. Ty chceš klid."* (drill výš)
- *"Ty nechceš kurz angličtiny. Ty chceš na poradě mluvit bez stresu."* (jazyková škola standard)
- *"Ty nehledáš agenturu. Ty hledáš někoho, kdo to za tebe vyřeší."* (Cole Gordon style)
- *"Ty si nekupuješ software. Ty si kupuješ klid, že to běží."* (SaaS style)

**Proč funguje:** Voss Vrstva 2 emotional label na TRUE motivation. Klient kýve, protože **to je víc pravda než to, co sám říká**. Po kývnutí už nemůže pricing objection vrátit zpátky na povrch ("já jsem říkal jen o ceně") — sám si přiznal hlubší want.

**Důležité:** Vždy ukončit *"Sedí?"* nebo *"Je to tak?"* — Voss kapitola 4 "that's right" check.

---

### D. Time-Cost + Peer Framing + Calibrated Q kombinace

**Trigger:** Klient chce odložit rozhodnutí o týden+ na vyhodnocení další konkurence.

**Struktura (3 části):**

1. **Time-cost frame s čísly:** *"Za týden ztrácíš ~[10-15] hodin, kdy místo na stavbě sedíš nad doklady. Při tvé hodinové sazbě [1 000 Kč] = [10-15k] opportunity cost. Týdně."*
2. **Peer framing:** *"Pro mě i pro tebe, kteří v byznysu děláme dlouho, víme, že [sedm dní] je hodně."* — elevuje klienta z prospekt na peer
3. **Calibrated diagnostic Q:** *"Tak na rovinu — myslíš, že to, co chceš, od nich v pondělí dostaneš?"* — force honest probability admission

**Proč funguje:**
- Time-cost = konkrétní ztráta, ne abstraktní urgency
- Peer framing = klient se cítí povýšen, ne tlačen
- Calibrated Q v 3. části = klient sám musí připustit, že probabilita je nízká (prospect v drillu řekl "20-30 %")

**Anti-patterns:**
- ❌ "Pro člověka, co nedělá v byznysu, ale pro mě i pro tebe..." — patronizing edge, klient by mohl číst jako manipulaci. Lepší: *"Pro nás, kteří v tom děláme..."* (inkluze, žádné srovnání s "amatéry")
- ❌ Time-cost bez čísel = abstraktní urgency = ignorovatelná. Vždy s konkrétními čísly z discovery klienta.

---

### E. Conditional Commit Acceptance (DON'T PUSH HARDER)

**Trigger:** Po několika quality moves klient nabídne **conditional yes**: *"Pokud [X], podepisuju. Pokud ne, ne."*

**Pravidlo:** **PŘIJMI. NEPRESS DÁL.** Lock logistics místo dalšího attacku.

**Příklad z drillu:**

Prospect: *"Pošli mi smlouvu do 21:00, pondělí 12:30 Meet, do poledne dávám ano/ne."*

Správná reakce:
> *"Souhlasím. Smlouvu ti tam hodím. Termín pondělí 12:30 Meet. Pošlu odkaz."* + assumption close *"můžeme kompletně zahájit spolupráci"* + close *"Budu se těšit."*

**Proč funguje:**
- Klient v conditional yes už **psychologicky podepsal** (Cialdini consistency / Voss kapitola 8 identity commitment)
- Když přitlačíš víc → klient cítí, žes přijetí nevyhodnotila → resistance
- Když přijmeš → klient cítí *"ona respektuje mé slovo"* → další consistency anchor

**Refinement — konkrétní time slot lock:**
Místo *"pondělí v poledne se ozveme"* lock kalendář ihned:
> *"Pondělí 12:30 Meet ✅. Smlouvu posílám do 21:00 dnes. Pokud podepíšeš, kickoff středa 10:00 — chceš si rovnou zarezervovat?"*

Tři kalendářová zarezervování = tři consistency anchory.

---

### F. Honest Uncertainty Opening (Voss accusations audit varianta)

**Trigger:** Klient bude s tebou srovnávat něco, co ty objektivně neznáš (jeho 4. nabídka, jeho zkušenost s konkurentem, jeho průmyslový kontext).

**Pravidlo:** **Otevři přiznáním nejistoty.** Tím si vyzobeš pushback dřív, než ho klient stihne použít.

**Příklady:**
- *"Hele, já si nejsem jistá, jestli budeme lepší."* (drill výš — opening pro disqualification monolog)
- *"Na rovinu — možná je to dražší, než si myslíš, že má cenu."* (preempt pricing objection)
- *"Možná to vůbec nepotřebuješ, posuď sám."* (preempt buyer's remorse)

**Proč funguje:**
- Klient ti **nemůže odpovědět "tlačíš mi to"** — sama jsi přiznala nejistotu
- Aktivuje reciprocity — klient ti pak musí odpovědět svou nejistotou
- Buduje trust dřív, než jdeš na další tah

**Krítické:** Po honest uncertainty opening **musí následovat silný věcný argument** (autority, archetypa, čísla). Jinak to vyzní jako capitulation.

---

**Master princip drillu:** Když má prospect strach z minulé pain (vendor zmizel, projekt selhal, peníze ztracené), tvůj close = *"Past pain → Calibrated Q exposing false logic → Risk Reversal sequence"* (smlouva + SLA + money-back: {tvoje garance}). Force binary nebo conditional commit. Lock konkrétní logistiku ihned, žádné "ozveme se příští týden".

---

## Voss Vrstva 2 labels — defense mechanism patterns z drillu (archetyp kategorie-skeptik)

**Kontext:** Drill 5 reps na Voss labels (archetyp kategorie-skeptik). Obchodník v REPs 1-4 přesnul z Vrstva 1 (situational summary) na Vrstva 2 (identity / wound / deep want naming). REP #5 (pride defense) odhalil **kritický anti-pattern**: AI doporučené "deep labels" byly **face-attacking**, což by v CZ business kultuře okamžitě zničilo rapport. Instinkt obchodníka to chytil. **Tyto patterny jsou kanonizace toho coursovaného nastavení.**

### Master princip — Vrstva 2 face-test

**Před vyslovením labelu na Vrstva 2 si polož sama sobě otázku:**

> *"Když klient na tohle odpoví 'NE', vypadá hloupě nebo jen řekne 'ne'?"*

- ✅ **Pokud "ne" je důstojná odpověď** → dobrý label, vystřel
- ❌ **Pokud "ne" by ho ponížilo** (musel by přiznat zbabělost / lež / nekompetenci) → **přestřeluješ**, změkči

**Důvod:** Voss kniha (Chapter 5): *"A good label gives them room to confirm OR refute without losing face."* Label nesmí být trap, který klienta tlačí buď do souhlasu, nebo do face-loss. **CZ business kultura je víc face-sensitive než US** — Cole Gordon hardcore "truth bomb" tady spálí trust v sekundě.

**Pravidlo:** Tvoje sales-instinkt na tonalitu (*"není to moc?"*) je důležitější než kterýkoli AI-doporučený "deep label". Pokud váháš → dej **menší dávku**. Hlouběji můžeš jít v druhé větě. Přestřel se nedá vzít zpátky.

---

### G. Trust Challenge Labels — klient projektuje minulé selhání důvěry

**Trigger:** Klient řekne věci typu:
- *"Jak víte, že nejste jako [minulý vendor]?"*
- *"Každý kdo prodává, říká stejně."*
- *"Tohle jsem už slyšel."*
- *"Tlačíte mi to."*

**Pravidlo:** Trust challenge **NIKDY není o tobě**. Je to o **klientově zranění z minulé důvěrné selhání** — nejvíc o jeho **self-trust failure** (*"já jsem nepoznal, že je to špatné"*).

**Past mode:** Obhajovat sebe (*"my jsme jiní protože X, Y, Z"*) = ZTRÁTA. Argumentační past.
**Voss mode:** Label PRVNÍ. Pojmenuj **klientovu wound**, ne svou věrohodnost.

**CZ templates:**

*Vrstva 1 (situational, solid):*
> *"Zní to, že po té zkušenosti s minulým dodavatelem jsi opatrnější — a teď ti přijde, že kdokoli, kdo prodává službu, mluví podobně. Sedí?"*

*Vrstva 2 wound (deeper):*
> *"Vypadá to, že tě nejvíc bolí, žes toho minulého kluka nepoznal včas. A dnes máš strach, že kdyby ses spletl znova, byl bys znova ten, kdo se nechal napálit. Sedí?"*

*Vrstva 2 master (deepest — self-trust failure):*
> *"Hádám správně, že strach není ani tak o mně — je o tom, jestli si vůbec můžeš věřit, že rozeznáš dobré od špatného. Sedí?"*

**Face-test verdict:** Všechny tři varianty **dávají klientovi důstojnou výchozí odpověď**. Žádná z nich klienta nepřitlačí do *"musím přiznat, že jsem byl naivní"* — místo toho **otevírá konverzaci** o jeho zkušenosti.

---

### H. Pride / Status Quo Decode — RESPECTFUL VERSIONS (nikoli konfrontace!)

**Trigger:** Klient řekne věci typu:
- *"Mně to vlastně docela fungue, jak to dělám."*
- *"20 zakázek ročně, doporučení mi chodí, klienti se vrací."*
- *"Asi spíš co bys mi mohla říct, abys mě zaujala."*
- *"Nelíbí se mi měnit, co se nezhroutilo."*

**Pravidlo:** Pride / status quo je **ego defense**. Klient se chrání před přiznáním, že **jeho cesta mohla být lepší**. **Frontální konfrontace = brutal face-attack = ztráta**.

**❌ NIKDY** (toto by ho ponížilo — face-attack):
- *"Není to, co si fakt myslíš — je to obrana."*
- *"Říct 'mám svou cestu' je bezpečnější než 'mohl bych mít víc, ale nevím jak'."*
- *"Kdybys přiznal, že tě to láká, musel bys uznat, že jsi mohl být dál."*

**Test:** Pokud klient odpoví "ne" → MUSEL by vypadat jako lhář / zbabělec / nekompetent. To je trap, ne label.

**✅ ANO — respectful varianty:**

*Varianta 1 — uznat sílu + plant curiosity:*
> *"Zní to, že to děláš dobře a víš to. A přesně proto sis vůbec sednul na ten meeting — že někde v koutku stojí i otázka 'jestli by to nešlo ještě o kousek lépe'. Sedí?"*

*Varianta 2 — mirror frame + gentle reframe via jeho vlastní pattern:*
> *"Vypadá to, že stojíš na pevné zemi — 20 zakázek, doporučení, vracející klienti. Tenhle hovor je pro tebe zvědavost, ne nutnost. Sedí?"*
> *(PAUSE. Wait for confirm.)*
> *"...a zároveň, některé věci, které tě dneska v branži nejvíc baví, taky před lety vypadaly jako 'tohle asi nepotřebuju', než ses do nich dostal. Souhlas?"*

*Varianta 3 — hypothetical exit-ramp:*
> *"Hádám správně, že kdyby ti dneska někdo ukázal věc, která by za 10 % tvého času přidala pár zakázek navíc, neřekl bys 'nemám zájem' — řekl bys 'ukaž'. Sedí?"*

**Princip respectful pride decode:**
1. **Uznat sílu nahlas** ("děláš to dobře", "stojíš na pevné zemi")
2. **Plant curiosity, ne contradiction** ("ten meeting sis sednul, protože...")
3. **Dej hypothetický exit ramp** ("kdyby ti někdo...")
4. **Klient kýve nebo dýchá hlouběji** — sám si "opatrně" otevřel dveře, žádné force

**Face-test verdict:** Klient může klidně říct *"ne, fakt jen zvědavost, stačí mi to jak to dělám"* — žádná ponížení. Ale **víc často** otevře sám: *"hele, no... v koutku asi něco je"* = win.

---

### I. Producer Identity Threat — když klient řekne kvantifikovatelný pokles výkonu

**Trigger:** Klient řekne věci typu:
- *"Mám 3 zakázky letos, normálně 5-6."*
- *"Loni jsem prodal 12 kuchyní, letos zatím 2."*
- *"Měl jsem 30 % konverzi, teď je to 15."*
- Cokoli s **kvantifikovatelným poklesem výkonu**.

**Pravidlo:** Když performer pojmenuje konkrétní pokles **čísel**, **NIKDY to není jen o číslech**. Je to **identity signál** — sebevědomí toho člověka bylo vázané na ta čísla. Pokles → *"možná to není jen trh, možná to jsem i já"*. To je **producer identity threat**.

**Past mode:** Sympatie / ROI argument ("však když to bude fungovat, dohoníš to"). LOSE — minimalizuje wound.
**Voss mode:** Label wound přímo.

**CZ templates:**

*Vrstva 1:*
> *"Zní to, že teď je každý tisíc kritický a investice bez jistoty je teď víc riziko než předtím. Sedí?"*

*Vrstva 2 — identity wound:*
> *"Hádám správně, že to není jen o penězích — je tam i kus 'možná to není jen trh, možná i já'. A další utrácení bez výsledků by ti to jen utvrdilo. Sedí?"*

*Vrstva 2 master:*
> *"Vypadá to, že 3 prodeje místo 5-6 ti vrtá hlavou — a teď nejvíc potřebuješ jistotu, ne sázku. Ne jen ve výsledcích, ale i v tom, že je posun dočasný, ne nový normál."*

**Face-test verdict:** Klient může odpovědět *"ne, fakt to je jen trh"* (žádné ponížení) nebo *"jo... no, asi něco"* (otevření). Obě cesty důstojné.

**Důvod proč to funguje:** Pojmenovala jsi **strach, který má, ale neumí ho verbalizovat**. Sám sobě by si to nepřiznal. Když to **někdo druhý řekne nahlas s respektem**, klient cítí pochopení, ne útok.

---

### J. Label ≠ Paraphrase — kritický distinction

**Tohle je nejčastější začátečnický anti-pattern:**

❌ **Paraphrase** (clarifying / mirroring fakta):
- *"OK, takže chápu správně, že máš dostatek zakázek a nemáš prostor na další. Je to tak?"*
- *"Takže říkáš, že..."*

✅ **Label** (pojmenování emoce / deep want / hidden fear):
- *"Zní to, že..."* + EMOCE
- *"Vypadá to, že..."* + IDENTITY / WANT
- *"Hádám správně, že..."* + HIDDEN FEAR

**Rozdíl:**
- **Paraphrase rekapituluje FAKTA** — co klient řekl explicitně
- **Label pojmenovává to, co stojí POD slovy** — co cítí, co skrývá, co chce

**Test:** Pokud tvoje "label" obsahuje 0 emocí a žádné identity signály → je to paraphrase, ne label.

**Pravidlo:** Když začínáš *"OK, takže chápu správně..."* — STOP. To je clarifying request, ne label. Voss labels **NIKDY** nezačínají *"chápu správně"*.

**Voss-only openers:**
- *"Zní to..."*
- *"Vypadá to..."*
- *"Hádám správně..."*
- *"Mám pocit, že..."*

A vždy obsahují **EMOCE nebo HIDDEN WANT**, ne jen factual recap.

**Anti-pattern příklad** (z drillu REP #5):
> ❌ *"OK, takže chápu správně — máš dostatek zakázek, nemáš prostor na další, nechceš víc klientů. Je to tak?"*

To je clarifying paraphrase. Klient kýve, žádné otevření, žádný posun. **Navíc**: klient lže (žádný podnikatel v 2026 nikdy nepřizná "nepotřebuju víc klientů"), a tvoje paraphrase ho v té lži **utvrzuje**.

**Label varianta** (correct):
> ✅ *"Zní to, že to děláš dobře a víš to. A přesně proto sis sednul na ten meeting — že v koutku stojí otázka 'mohlo by to být ještě o kousek lépe'. Sedí?"*

---

### K. Anti-pattern fráze — NIKDY v CZ kontextu

Tyto formulace **vždy face-attackují** a v CZ business kultuře okamžitě zničí rapport. **Nepoužívej ani na drillu**:

❌ *"Není to, co si fakt myslíš..."* — obvinění z lži
❌ *"Schováváš se za..."* — obvinění ze zbabělosti
❌ *"Bojíš se přiznat..."* — face-attack přímo
❌ *"Lžeš sám sobě..."* — direct accusation
❌ *"Vlastně to chceš, jen to nepřiznáš..."* — predicting jeho lži
❌ *"Kdybys měl koule..."* — masculine challenge culture, US-only
❌ *"Vidím, že máš strach..."* (bez framing) — diagnostika ega
❌ *"Tlačíš se k rozhodnutí, které..."* — superiority

**Místo toho použij CZ-safe alternativy:**

| Anti-pattern | CZ-safe varianta |
|---|---|
| *"Schováváš se za..."* | *"Vypadá to, že je teď bezpečnější říct..."* |
| *"Bojíš se přiznat..."* | *"Zní to, že přiznat by znamenalo..."* |
| *"Lžeš sám sobě..."* | *"Hádám správně, že tomu, co teď říkáš, ne úplně věříš ty sám?"* |
| *"Vlastně to chceš..."* | *"Vypadá to, že někde v koutku stojí otázka..."* |
| *"Vidím, že máš strach..."* | *"Mám pocit, že je tam i kus obavy, že..."* |

**Princip:** CZ labels **inkludují tebe do prostoru** — *"mám pocit, že..."*, *"zní to..."*, *"vypadá to..."*. To dělá z labelu **pozorování**, ne **soud**.

US labels často znějí jako soudce vyhlašující rozsudek. CZ label musí znít jako **přítel, který si všiml**.

---

**Master princip drillu:**

> **Cíl labelu není dostat klienta do rohu. Cíl je pojmenovat to, co cítí, tak důstojně, aby si mohl říct "ano, přesně tak" — nebo "ne, fakt ne" — bez toho, aby kterákoli z odpovědí znamenala face-loss.**
>
> **Vrstva 2 ≠ konfrontace. Vrstva 2 = respektovaná pravda nahlas.**

Tvůj instinkt na tonalitu je top-tier sales radar. Když AI (Cole Gordon stylem) tlačí na agresivní "truth bombs" — **přidrž**. Tvůj radar ví, co tady projde a co spálí. **Trust the radar.**

---

## Master rule — Identity vs Event Translation (z drillu Voss labels)

**Consistent gap přes 4 reps v drillu:** Klient dá identity statement, obchodník to přeloží na události / důsledky / patterns. Výsledek = solid Vrstva 1, ne Vrstva 2. Klient kýve, ale neotevře se.

### Pravidlo

> **Když klient v jedné větě obsahuje slova:**
> - *"být ten, kdo..."* / *"jsem ten typ"*
> - *"takhle to dělám"* / *"takhle se to u mě..."*
> - *"kým není"* / *"kým bych se stal"*
> - *"sám sebe"* / *"identita"* / *"co jsem za člověka"*
> - *"nemůžu se k tomu vrhnout"* / *"nedělám rozhodnutí takhle"*
>
> **→ TO JE IDENTITY statement.**
>
> **Tvůj label MUSÍ ty samé varianty slov vrátit DOSLOVNĚ ZPÁTKY** (s lehkou parafrází) a **nazvat to "identita" / "kód" / "pravidlo, ve kterém si stojíš"**.

### 3 příklady z drillu

| Klient řekl (identity) | ❌ Špatně (event překlad) | ✅ Správně (identity zpět) |
|---|---|---|
| *"Plný brko z toho **být ten, na kterýho hází sliby**"* | *"Špatné zkušenosti, stály peníze"* | *"'Být ten, na kterýho dodavatelé míří' Ti začíná být **identita**. Další pokus by Tě v ní jen utvrdil."* |
| *"**Tenhle typ rozhodování dělám takhle.**"* | *"Aby si nepokazili vztah, dáváš zakázky jemu."* | *"Vzít někoho jiného by Tě udělalo **někým, kým nechceš být** — člověkem, co opouští kámoše kvůli byznysu."* |
| *"Klienti by mě mohli prokouknout, 'tahle se cítí jako někdo, **kým není**'."* | *"Pokročila bys do nové úrovně, nejste si jistá, že jste na ni připravena."* | *"Prémiový ceník by Ti vystavil **identitu, kterou si sama neopodstatňuješ**. A klienti by to mohli zaregistrovat."* |

### Diagnostický check (před každým labelem)

Pokud klientova věta obsahuje **JÁ + ROLE / KÓD / IDENTITY** → odpověď MUSÍ obsahovat ty samé varianty slov zpátky a nazvat to identitou.

Pokud klientova věta je pouze o **událostech / situaci / pocitech bez identity** → label může být event-level (Vrstva 1).

### Proč na tom záleží

- **Event label:** klient kýve, ale může to logicky vyvrátit (*"no, to bylo tehdy"*). Surface acknowledgement.
- **Identity label:** klient cítí, že někdo viděl, **kým se cítí, že je**, ne jen co se mu stalo. Otevírá se. *"That's right"* moment.

---

## Master rule — Pacing-to-Archetype (EMPIRICKY POTVRZENO — LOST call)

**🔴 Validovaná lekce, ne teorie.** Prospektka (image-buyer + methodical) měla silný 1. call, cena přijatá organic. 2. call obchodník deployoval 7+ framů za sebou, 3× missnul money-aside diagnostic, missnul "pro zábavu" identity disclosure. Klient se postupně uzavřela, ukončila call jednostranně. **Po callu napsala, že cítila NÁTLAK a to nemá ráda. = LOST.**

**Příčina ztráty NEBYLA cena, produkt ani fit. Byl to PACING — over-pressure na methodical/quiet buyera.**

### Rozpoznání archetypu (PŘED nasazením pace)

**Methodical / quiet buyer signály:**
- *"Musím si být jistej/á"* / *"nedělám rozhodnutí rychle"* / *"v klidu si to projdu"*
- *"Pro zábavu"* / *"vedlejšák"* / *"není to priorita"* (low-pressure self-framing)
- Krátké odpovědi (*"mhm", "asi", "možná", "nevím"*), vague hedges
- Žádné counter-questions, žádné spontaneous disclosure
- Verbalizovaná nelibost k tlaku, peer-validation potřeba (*"poradím se s..."* = pro vlastní jistotu, NE authority)

**Engaged / decisive buyer signály:**
- Counter-questions, lean-in, long responses
- Specific objections (ne vague)
- Spontaneous disclosure budget/timeline
- *"Jdu do toho"* energy, ROI engagement

### Pravidlo pacingu

| | Methodical/quiet | Engaged/decisive |
|---|---|---|
| Framy za sebou | **1 frame → handover → POČKEJ** | 2-3 framy OK |
| Po objection | 1 quality reframe, pak space | push, force binary |
| Call délka | 15-20 min cap | 30+ OK |
| Close | conditional commit + **respektovaný časový prostor** | force binary today |
| Objection battle | **NE** — arm s materiály, dej prostor | ano |
| Argumentace | image / brand / klid / jistota | ROI / čísla / urgency |

### Handover move (kritický pro methodical)

Po 1 quality framu:
> *"Já nejsem člověk, co Vás bude přesvědčovat dál. Vy to slyšíte. Co Vy na to?"*

= žádný tlak + tvoje confidence + klientova agency + forces processování. **Méně tlaku = víc anos u methodical buyera. Víc tlaku = ZAVŘE (viz LOST call výš).**

### Anti-pattern (přesně co zabilo ten LOST call)

❌ **Objection stacking** — 4-7 framů za sebou bez čekání na reakci
❌ **Pokračovat po deflection signálu** (*"musím už jít", "je to možný", "pro zábavu"*) — to jsou SHUTDOWN signály, ne výzva tlačit víc
❌ **Force "ano/ne dnes"** na methodical buyera — tlačí ho do defense, ne do yes
❌ **Ignorovat self-framing** (*"pro zábavu"* = STOP, re-evaluate produkt + pace, ne pokračovat ROI pitchem)

### Wrong-fit-today recognition

Pokud klient skóruje 0/8 closable-today signálů + 8/8 wrong-fit signálů (hobby framing, pre-vacation, methodical, repeat re-framing) → **NENÍ closable dnes na full balíček, ať děláš cokoli.** Možnosti: **scope down** (menší produkt) nebo **respect-the-pace** (arm + space, ne force). Force = LOST + spálený rapport (recovery ~3-5 %).

**Instinkt obchodníka to chytil sám** (*"přišlo mi, že byla hrozně zavřená"*). **Trust the radar** — když cítíš, že se klient zavírá, NEPŘIDÁVEJ tlak. Uber pace.
