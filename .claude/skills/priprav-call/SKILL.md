---
name: priprav-call
description: Připraví uživatelku na prodejní hovor — 5–7 karet na druhý monitor (cíl hovoru, čísla pro tohoto klienta, garance, důkaz, dvě nejpravděpodobnější námitky s odpověďmi, další krok, co o klientovi víme). Spusť, když řekne „připrav hovor / call / karty" + jméno klienta.
---

# /priprav-call — karty před hovorem

Výstup = krátký tahák na druhý monitor: věci, které potřebuje mít během hovoru po ruce.
**Musí se vejít na jednu obrazovku** (cca 600–800 slov).

---

## 1. Kdo a jaká linie

Z požadavku vytáhni jméno klienta (a firmu) a linii. Linie = podsložka v
`data/sales-coach/transcripts/`. Když není jasná, zeptej se jednou: *„Do jaké linie patří —
{seznam existujících}?"*

Když dala jen jméno a nic o něm nevíš, zeptej se, co má po ruce: web, Instagram, poznámky
z předchozí komunikace. Nehledej nic o konkrétním člověku na internetu sám — pracuj s tím, co ti dá.

---

## 2. Načti kontext

0. `knowledge/moje-nabidka.md` — nabídka, ceník, garance, důkazy, typické námitky a její
   ověřené odpovědi, její hlas. **Bez něj nejde karta s cenou a důkazem udělat konkrétně** —
   když je nevyplněný (`<!-- NEVYPLNĚNO -->`), řekni to a nabídni vyplnění.
1. `knowledge/frameworks/_priority-rules.md`
2. `knowledge/frameworks/_cz-language-rules.md` — každá věta na kartě musí znít jako ona,
   přirozeně česky, ne jako překlad amerického skriptu.
3. `prospects/{linie}/{slug}.md`, pokud existuje — co o klientovi víme.
4. Dřívější hovory s ním: `data/sales-coach/transcripts/{linie}/*_{slug}_*.md` (co řešil,
   jaké měl námitky, co se slíbilo).
5. Nejbližší typ klienta v `personas/{linie}/` (podle velikosti firmy, zkušeností, signálů).
   Nic nesedí → „středně skeptický majitel malé firmy" a napiš „odhad".
6. `knowledge/frameworks/imperium-deep.md` — kompletní 12sekční A–Z proces Imperium (vždy).
   Karty ukotvi do jeho struktury.
7. Podle situace: `namitky.md` (očekávané námitky), `pricing-framing.md` (jak podat cenu),
   `kvalifikace.md` (je to vůbec náš klient?), `closing.md` (další krok).
8. **RAG-lite:** projdi `knowledge/frameworks/_raw-transcripts/_transcripts-index.md` a pro
   typ klienta a očekávané námitky načti 2–3 nejrelevantnější přepisy videí (např. Cole na
   „musím to probrat s partnerem", Voss na labely). Nikdy ne celý korpus.
9. Vlastní statistiky: `data/sales-coach/patterns/anti.json` — dva nejčastější zlozvyky
   z posledních hovorů dej do karty 7 jako „na co si dát dnes pozor".

---

## 3. Karty

```markdown
# Karty — {Klient} — {datum a čas hovoru}

**Linie:** {linie} · **Typ:** {persona} (`personas/{linie}/{slug}.md`) · **Co víme:** {1 řádek}

## 🎯 Cíl hovoru
{1 věta: uzavřít / domluvit druhý hovor s rozhodovatelem / zjistit, jestli to vůbec dává smysl}

## 💰 1 — Cena a čísla pro tohoto klienta
- **Cena:** {z moje-nabidka.md}
- **Co mu to přinese:** {výpočet z jeho čísel — např. volné termíny × průměrná cena; pokud čísla
  nemáš, napiš, na co se zeptat, abys je spočítala na hovoru}
- **Když řekne „drahé":** „{její ověřená odpověď z moje-nabidka.md, jinak návrh}"

## 🛡️ 2 — Garance
„{přesná formulace garance z moje-nabidka.md}"

## 📊 3 — Důkaz (mít otevřený)
{nejpodobnější case study z moje-nabidka.md — obor, velikost, čísla, citace klienta}

## ⚠️ 4 — Dvě nejpravděpodobnější námitky
**A: „{námitka}"** → „{přesná odpověď}" (nejdřív uznání nebo otázka, pak argument)
**B: „{námitka}"** → „{přesná odpověď}"

## ➡️ 5 — Další krok
- **Ano:** „{konkrétní krok + dva termíny na výběr}"
- **Potřebuje čas / partnera:** „{společný hovor do 48 h s konkrétním termínem}"
- **Nesedí to:** „{férové ukončení s otevřenými dveřmi}"
Nikdy „ozveme se" bez data.

## 🔍 6 — Co o klientovi víme
- {3–5 bodů: situace, čísla, co zkoušel, co ho trápí, kdo rozhoduje}

## 🧠 7 — Na co si dát dnes pozor
- **Typ klienta:** {2–3 věty: tón, kde se otevírá, kde se zavírá; tykat/vykat}
- **Tvoje zlozvyky z posledních hovorů:** {1–2 z anti.json + jak jim předejít}
```

Vyber **dvě** nejpravděpodobnější námitky podle typu klienta a toho, co už řekl — ne všechny.
Chce soustředění, ne paniku.

---

## 4. Uložení

Ulož do `prospects/{linie}/{slug}-karty-{YYYY-MM-DD}.md` a celé karty vypiš do chatu. Uživatelka
si soubor otevře na druhém monitoru sama.

Profil `prospects/{linie}/{slug}.md` neexistuje → na konci nabídni: *„Mám založit profil
klienta? Po hovoru se do něj doplní, co se řeklo."*

---

## Pravidla

- **Přesná slova, ne rady.** ❌ „Zdůrazni garanci." ✅ „{celá věta s garancí, jak ji řekne}".
- **Čísla pro tohoto klienta.** Když je máš, spočítej je. Když ne, napiš, na co se zeptat.
  Nikdy si je nevymýšlej.
- **Žádné guru tipy.** ❌ „Buď autentická." ✅ „Po ceně mlč, dokud nepromluví klient."
- **Na jednu obrazovku.** Radši méně a ostře.

## Kontrolní seznam

- [ ] Jméno, linie, nejbližší typ klienta
- [ ] Cena a garance doslova z `moje-nabidka.md` (nebo upozornění, že chybí)
- [ ] Výpočet z čísel klienta, nebo otázky, jak je získat
- [ ] Dvě námitky s hotovými odpověďmi
- [ ] Další krok s konkrétními možnostmi
- [ ] Do 800 slov, uloženo do `prospects/{linie}/`
