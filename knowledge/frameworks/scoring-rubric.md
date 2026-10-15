# Scoring rubrika — CLOSER + Voss + mechanika

Rubrika na 100 bodů s váhami pro hodnocení prodejního hovoru. Hybrid Hormoziho CLOSER,
taktické empatie Chrise Vosse, 12sekčního procesu Imperium (Charlie Morgan,
[`imperium-deep.md`](imperium-deep.md)) a objektivní mechaniky hovoru.

**Proč ne „známka 1–10"?** Známky se mezi hovory posouvají (jeden den „8/10" znamená něco jiného
než druhý). Body za konkrétní chování posun odstraňují a trend v čase je porovnatelný.

⚠️ **Před hodnocením vždy načti [_priority-rules.md](_priority-rules.md)** — říká, co platí,
když obchodník použije techniku, na kterou mají zdroje různý názor (např. Imperium „hard close"
vs. Cole „soft pull").

---

## Sekce a váhy

| Sekce | Body | Co se měří |
|---|---|---|
| **C — Clarify** (discovery) | 10 | Zjistila skutečnou bolest? Konkrétní čísla? |
| **L — Label** (Voss) | 15 | Pojmenovala emoci klienta? („zní to, že vás to minule pořádně spálilo…") |
| **O — Overview** (minulé pokusy) | 15 | Vytáhla, co klient už zkoušel a proč to nefungovalo? |
| **S — Sell the vacation** | 20 | Konkrétní obrázek „co bude jinak" na jeho číslech + důkaz? |
| **E — Explain away concerns** | 20 | Zvládla námitky bez obhajování? Uznání/otázka PŘED argumentem? |
| **R — Reinforce** (další krok) | 10 | Konkrétní závazek, datum, kdo co udělá? |
| **Mechanika** | 10 | Podíl řeči, monology, otázky |
| **CELKEM** | **100** | |

---

### Jak počítat srážky a chybějící sekce

- **Srážka** (−2 / −3 / −5 u jednotlivých sekcí) se v jedné sekci strhává **nejvýš jednou**,
  i když nastane víc spouštěčů. Sekce nikdy nejde pod 0.
- **„Ozveme se" na konci** se trestá v Reinforce (strop 4/10). V Explain se −5 strhává jen
  tehdy, když „ozveme se" uzavřelo **nevyřešenou námitku**.
- **Sekce, která v hovoru neproběhla** (hovor skončil dřív, fáze se nekonala) — nehodnotí se
  podle délky hovoru, ale podle toho, jestli fáze proběhla. Neproběhlou sekci zapiš jako
  `n/a`: v tabulce rozboru `| Explain | n/a/20 |`, v CSV `n/a`. Celkové skóre pak přepočítej
  poměrem: `celkem = round(součet bodů přítomných sekcí ÷ součet jejich maxim × 100)`.
- **Jeden tah se boduje jen v jedné sekci** — tam, kde splnil funkci (viz
  `_priority-rules.md` → Další rozhodnutí konfliktů).

---

## C — Clarify (10 bodů)

Cílem je odkrýt **skutečnou bolest** — ne tu, kterou klient řekne jako první, ale tu, která ho
opravdu tlačí.

> ⚠️ **Discovery se hodnotí podle výsledku, ne podle toho, kdy proběhla.**
>
> Někdo dělá otázky blokem na začátku, někdo nejdřív ukáže produkt (sdílení obrazovky, ukázka
> na míru) a otázky vplétá do ukázky. Obojí je legitimní.
>
> **„Žádné otázky na začátku" sama o sobě není chyba.** Hodnoť, jestli se během hovoru
> zjistilo všechno, co bylo k uzavření potřeba. Ano = body. Mluvila jen obchodnice a klient
> skoro nic neřekl = málo bodů.

| Body | Chování |
|---|---|
| 0–3 | Žádná discovery — mluví obchodnice, klient skoro nepromluví. Prezentace naslepo. |
| 4–6 | Částečná — pár otázek, ale chybí klíčová čísla nebo emoční vrstva. |
| 7–9 | Solidní — současný stav + minulé pokusy + jedna vrstva bolesti. |
| 10 | Discovery odkryla 2–3 vrstvy: tvrdá čísla + dopad na byznys + osobní cíl nebo bolest majitele. |

**Co je opravdu potřeba zjistit:**
- čísla, na kterých postavíš scénář v Sell (objem, průměrná cena, kolik ztrácí),
- co už zkoušel a proč to nefungovalo,
- emoční bolest nebo osobní cíl („nemusela bych stát u křesla i v sobotu"),
- kdo všechno rozhoduje.

Co je klíčové právě pro její obor, je v `knowledge/moje-nabidka.md` (ideální klient, jak vypadá
hovor). **Informace, které na rozhodnutí nemají vliv, nehodnoť jako hlavní chybu** — „mohla se
zeptat i na X" patří do poznámky, ne do top 3 misses.

**Srážky (−2 body):**
- klient za celý hovor skoro nepromluví (obchodnice mluví > 70 %),
- žádná doplňující otázka po první odpovědi („aha, dobře" a pokračuje monolog),
- přeslechnutý emoční signál, který klient sám nabídl.

---

## L — Label (15 bodů) — taktická empatie (Voss)

**Label** = pojmenování emoce klienta dřív, než ji sám vysloví. Odzbrojí obranu a posílí vztah.

| Body | Chování |
|---|---|
| 0–3 | Žádný label. Rovnou argument. |
| 4–7 | Jeden label za hovor, ale formální („Chápu, že je to pro vás těžké"). |
| 8–11 | 2–3 labely, přirozeně („Zní to, jako byste se už jednou pořádně spálila, co?"). |
| 12–15 | Labely napříč hovorem, vždy PŘED argumentem. Klient se viditelně otevírá. |

**Formule:** „Zdá se, že…" · „Zní to, jako byste…" · „Vypadá to…"

**Příklady:**
- na „je to drahé": *„Zdá se, že už máte zkušenost s něčím, co slibovalo hodně a nepřineslo nic."*
- na „musím to probrat se společníkem": *„Zní to, jako byste měli rozdělené role — vy to
  vidíte z provozu, on z čísel?"*
- na skepsi: *„Vypadá to, že tohle už vám někdo sliboval."*

Labely nemají jen podobu „zní to, že…" — počítá se i mirror, shrnutí s kontrolou („jestli to
dobře chápu…") a další formy. Detail v [_analyzer-detection-rules.md](_analyzer-detection-rules.md).

**Srážky (−3 body):**
- skok na argument bez uznání,
- „Já chápu, ale…" (popírá, co klient řekl).

---

## O — Overview minulých pokusů (15 bodů)

Co klient už zkoušel a proč to nefungovalo. **Ukotví hodnotu** tvého řešení — když víš, co
nefungovalo, umíš ukázat, co děláš jinak.

| Body | Chování |
|---|---|
| 0–3 | Neptala se. |
| 4–7 | Zeptala se „co jste zkoušeli?", ale nešla do hloubky. |
| 8–11 | Vytáhla 1–2 minulé pokusy + důvod, proč selhaly. |
| 12–15 | Celá mapa pokusů → současná frustrace → proč tohle bude jiné. |

**Otázky:**
- „Co jste v minulosti zkoušeli, abyste to vyřešili?"
- „Proč to podle vás nefungovalo?"
- „Kolik vás to tehdy stálo — peněz a času?"

---

## S — Sell the vacation (20 bodů)

„Prodávej dovolenou, ne letadlo." Konkrétní obrázek, jak bude klientův byznys nebo život vypadat
za 2–3 měsíce — ne seznam funkcí.

| Body | Chování |
|---|---|
| 0–5 | Výčet funkcí („máme dvanáct modulů, napojení na…"). |
| 6–10 | Funkce + obecné přínosy. |
| 11–15 | Konkrétní scénář na číslech tohoto klienta („u vašich osmi volných termínů týdně to vychází na…"). |
| 16–20 | Scénář + důkaz z podobného případu s čísly + emoční výsledek (citace spokojeného klienta, návrat k osobnímu cíli z discovery). |

**Tvoje nástroje:** důkazy, výpočty a citace klientů v `knowledge/moje-nabidka.md`.

**Srážky (−3 body):**
- žádný důkaz,
- žádná čísla na míru klientovi,
- chybí obrázek „co bude jinak za X týdnů".

---

## E — Explain away concerns (20 bodů)

Námitka **není odmítnutí** — je to žádost o informaci nebo o ujištění. Měří se: zvládla ji bez
obhajování? Použila mirror/label nebo otázku PŘED argumentem?

| Body | Chování |
|---|---|
| 0–5 | Obhajoba („to není pravda"), skok na argument, hádka. |
| 6–10 | Slušná odpověď, ale „ano, ale…". |
| 11–15 | Mirror/label nebo otázka PŘED argumentem, pak konkrétní reframe. |
| 16–20 | Námitku otočí (výpočet, garance, důkaz) tak, že klient sám začne argumentovat PRO. |

**Techniky (Voss):**
- **Mirror** — zopakuj poslední 1–3 slova s otazníkem: „…drahé?"
- **Label** před argumentem (viz L).
- **Kalibrovaná otázka** — „Jak bych mohla…", „Co by se muselo stát, aby…"

**Tvoje ověřené odpovědi:** `knowledge/moje-nabidka.md` → Typické námitky. Obecně:
- „Drahé" → nejdřív „ve srovnání s čím?", pak výpočet návratnosti na jeho číslech.
- „Musím to probrat s…" → hovor ve třech do 48 hodin.
- „Ozvu se" → konkrétní datum a čas.

**Srážky (−5 bodů):**
- námitka zůstane „viset" bez vyřešení,
- „ozveme se" jako konec,
- sleva hned na první projev nejistoty.

---

## R — Reinforce: další krok (10 bodů)

⚠️ **Zlaté pravidlo: na konci hovoru vždy konkrétní závazek.** „Ozveme se" = ztráta.

| Body | Chování |
|---|---|
| 0–3 | „Ozveme se" / „dejte vědět" / žádný krok. |
| 4–6 | Domluvený follow-up, ale vágně („příští týden"). |
| 7–9 | Konkrétní datum + čas + co se stane. |
| 10 | Závazek na místě (smlouva, záloha, naplánovaný úvodní hovor). |

**Zdravé další kroky:**
- „Smlouvu vám pošlu teď do e-mailu, úvodní hovor máme ve středu v deset. Sedí?"
- „Dáme si hovor ve třech se společníkem — čtvrtek v deset, nebo pátek ve dvě?"
- Když to nesedí: „Na rovinu — teď to pro vás nedává smysl. Kdyby se to za pár měsíců změnilo,
  ozvěte se."

---

## Mechanika (10 bodů)

Objektivní měření z přepisu: `node scripts/mechanika.mjs {přepis.txt}`.

| Metrika | Body | Cíl |
|---|---|---|
| Podíl řeči obchodnice : klient | 0–4 | 40 : 60 (klient mluví víc) |
| Nejdelší monolog | 0–3 | pod 90 sekund |
| Otevřené otázky | 0–3 | aspoň 60 % všech otázek (bez technických typu „slyšíme se?") |

- **Podíl řeči:** nad 55 % → 0–1 bod · 40–55 % → 2–3 body · pod 40 % → 4 body.
- **Monolog:** nad 120 s → 0 · 90–120 s → 1–2 · pod 90 s → 3.
- **Otázky:** 60 % a víc otevřených → 3 · 45–59 % → 2 · 30–44 % → 1 · pod 30 % → 0.
  Otevřené = Co / Jak / Proč / Kdy / Kolik…; uzavřené = odpověď ano/ne. Technické otázky
  („slyšíme se?", „vidíte to?") se nepočítají.
- Na hraně pásma (např. podíl řeči přesně 55 %) dej vyšší z možných bodů.

---

## Úrovně (kalibrace skóre)

**Kalibrace: moderate-strict.** 70+ = výborné, 80+ = top 10 % globálně. Hodnotí se proti
ideálnímu provedení CLOSER (rámce Imperium / Voss / Cole), ne proti průměru českého trhu.

| Úroveň | Skóre | Profil | Co je vidět |
|---|---|---|---|
| **Tier 1 — Začátečník** | 0–24 | bez struktury | kapitulace na první námitce, monology přes 2 min, žádné otázky, „ozveme se", žádný důkaz |
| **Tier 2 — Amatér** | 25–39 | základní discovery, zbytek slabý | pár otázek bez hloubky, žádný label, obecný důkaz, vata po ceně, „ne" převlečené za follow-up |
| **Tier 3 — Solidní** | 40–54 | struktura, ale strop | ✅ discovery a minulé pokusy · ❌ žádné labely, slabý Sell, „ozveme se" v polovině hovorů |
| **Tier 4 — Silná** | 55–69 | struktura + reframe + závazek | ✅ hluboká discovery, otázka po námitce, důkaz s čísly · ❌ málo labelů, cena bez ticha |
| **Tier 5 — Elitní** | 70–84 | úroveň studenta Cola / Hormoziho | ✅ labely 10+/15, výpočet před cenou, ticho po ceně, vždy závazek · ❌ občas chybí okrajové techniky |
| **Tier 6 — Mistr** | 85+ | úroveň samotných Cola / Hormoziho / Vosse | labely a kalibrované otázky automaticky, absolutní kontrola rámce hovoru |

**Štítek v rozboru:** `Tier N (low / mid / high)` — low / mid / high = dolní, prostřední
a horní třetina pásma. Např. 47 → Tier 3 (mid), 55 → Tier 4 (low), 65 → Tier 4 (high).

### Co znamená „moderate-strict" v praxi

✅ **Přísně:**
- 0 labelů = 0/15 (ne „snažila se"),
- „ozveme se" na konci = max 4/10 Reinforce,
- důkaz z úplně jiného oboru bez čísel = max 8/20 Sell,
- vata po ceně = −2 Mechanika.

🟡 **Férově:**
- Mechanika podle tabulky výš — na hraně pásma vyšší body,
- průlomový moment v jinak slabším hovoru dostane uznání,
- kalky z Imperia („eh, no…") nepenalizuj nad rámec celkové slabosti.

❌ **Žádné body „za snahu":**
- „Chápu, rozumím" ≠ Label,
- „Jak vás to napadlo?" bez doplňující otázky na čísla ≠ Discovery,
- „Cena je 20 tisíc, s tím, že…" ≠ podání ceny (chybí ticho).

### Proč ne český benchmark ani Imperium-strict

- **Český benchmark** (proti průměru trhu) by dával 60–70 skoro každému hovoru → nic by
  netlačilo ke zlepšení.
- **Imperium-strict** (úroveň Charlieho Morgana) by dával 20–40 → demotivuje, a realita tak
  špatná není.

Moderate-strict ukáže realitu (45 ≠ „perfektní") i průlomové momenty (70+ = „tohle děláš
dobře, opakuj").

---

## Úpravy rubriky v čase

Po 10–20 vlastních hovorech se podívej (v aplikaci Analytics a Progress):
- jestli Label (15 b) dává ve tvém oboru smysl, nebo ho klienti berou jinak,
- jestli Overview minulých pokusů rozhoduje víc nebo míň, než rubrika předpokládá,
- jestli mechanika potřebuje víc nebo míň bodů.

Rubriku můžeš upravit — jen to udělej najednou a zapiš datum změny, ať jsou trendy porovnatelné.
