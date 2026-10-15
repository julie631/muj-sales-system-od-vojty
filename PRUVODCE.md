# Průvodce: jak Sales Coach rozjet a používat

> **Pro Clauda.** Tohle je tvoje příručka, přečti ji celou. Uživatel ji číst nemusí.
> Na začátku sezení (a kdykoli uživatel neví, co dál) projdi **Stav** níž, zjisti sám, co
> chybí, a řekni mu **jen jeden další krok**: co přesně kliknout nebo napsat. Až ho udělá,
> ověř to a pokračuj dalším. Co jde udělat v terminálu, udělej sám a nevysvětluj.
> Co o uživateli zjistíš (jméno, jak ho oslovovat, adresa přehledu, jak přepisuje), zapiš do
> `moje-nastaveni.md` v kořeni repa (když chybí, vytvoř ho), ať se příště neptáš znovu.

---

## Jak to celé funguje

```
nahrávka hovoru → přepis → /analyzuj-call → rozbor + skóre → git push → přehled na webu
```

- **Přehled** je web (Vercel) s hovory, skóre, slabými místy a vzorci. Nic nepočítá, jen čte
  soubory v `data/sales-coach/`. Nový hovor se v něm objeví asi 2 minuty po pushi.
- **Coach** jsi ty v Claude Code se skilly `/analyzuj-call`, `/priprav-call` a `/role-play`.
  Pravidla a formát dat jsou v `CLAUDE.md`.

---

## Stav: co zkontrolovat (sám, bez ptaní)

| # | Kontrola | Jak | Když chybí |
|---|---|---|---|
| 1 | Je to vlastní kopie repa | `git remote get-url origin` | obsahuje `nerad-v/sales-coach-kit` → **krok 1** |
| 2 | Závislosti | existuje `node_modules/` | `npm install` (udělej sám) |
| 3 | Heslo k přehledu | `.env.local` obsahuje `DASHBOARD_PASSWORD=` | **krok 3** |
| 4 | Přehled na webu | adresa v `moje-nastaveni.md` | **krok 4** |
| 5 | Jméno | `lib/config.ts` → `ownerName` je prázdné | **krok 5** |
| 6 | Nabídka | `knowledge/moje-nabidka.md` obsahuje `<!-- NEVYPLNĚNO -->` | **krok 6** |
| 7 | Přepisy | Wispr: existuje `~/Library/Application Support/Wispr Flow/flow.sqlite` · Gemini: `GEMINI_API_KEY=` v `.env.local` | **krok 7** |
| 8 | Ukázková data | `node scripts/smaz-ukazku.mjs` (jen vypíše, co by smazal) | po prvním vlastním rozboru nabídni smazání (`--ano`) |

Když je všechno hotové, zeptej se jen: *„Máš nový hovor k rozboru, nebo se chystáš na nějaký?"*

---

## Jednorázové nastavení

### Krok 1 · Vlastní kopie (nejdůležitější)

`nerad-v/sales-coach-kit` je Vojtova šablona a má k ní přístup víc lidí. **Nikdy do ní
nepushuj.** Tvoje hovory by viděli ostatní a nasadily by se na Vojtův web.

Uživatel si udělá vlastní soukromou kopii:
- **na webu:** github.com/nerad-v/sales-coach-kit → zelené **Use this template** →
  **Create a new repository** → Owner = jeho účet, název třeba `sales-coach`,
  **Private** → **Create repository**;
- **nebo v terminálu** (když má `gh`): `gh repo create sales-coach --private --template nerad-v/sales-coach-kit --clone`.

Pak novou složku otevře v Claude Code a dál se pracuje jen v ní. Starý klon šablony může smazat.

### Krok 2 · Nástroje (udělej sám)

- `node -v` musí být 20 nebo víc (jinak nodejs.org → LTS), pak `npm install`.
- Jen pro přepis přes Gemini (cesta B níž): `pip3 install google-genai` a `ffmpeg`
  (Mac: `brew install ffmpeg`, bez Homebrew nejdřív brew.sh; Windows: `winget install ffmpeg`).

### Krok 3 · Heslo k přehledu

Zeptej se, jaké heslo chce, a zapiš do `.env.local` řádek `DASHBOARD_PASSWORD=…`
(`.env.local` se necommituje). Lokálně se přehled pustí přes `npm run dev` → http://localhost:3000.

### Krok 4 · Přehled na webu (Vercel, zdarma)

Tohle kliká uživatel, ty ho jen vedeš:
1. vercel.com → **Sign Up** → **Continue with GitHub**.
2. **Add New… → Project** → u repa `sales-coach` **Import**.
3. **Environment Variables**: `DASHBOARD_PASSWORD` = stejné heslo jako v kroku 3.
4. **Deploy**. Asi za 2 minuty je přehled na adrese `https://….vercel.app`. Adresu zapiš do
   `moje-nastaveni.md`.

Každý push do `main` přehled nasadí znovu. Hovor, který není pushnutý, v přehledu není.

### Krok 5 · Jméno

Zeptej se na jméno a zapiš do `lib/config.ts`: `ownerName` (hlavička přehledu) a do `repNames`
přidej křestní jméno malými písmeny, jak bude v přepisech (třeba `"jana"`). Jeho repliky se pak
v přehledu zvýrazní.

### Krok 6 · Moje nabídka (asi 10 minut)

Řekni mu, ať napíše *„pojďme vyplnit moji nabídku"*. Vyzpovídáš ho (co prodává, komu, za kolik,
důkazy, námitky, jak mluví) a zapíšeš do `knowledge/moje-nabidka.md`. Rozbory fungují i bez
toho, ale rady „co říct místo toho" pak nejsou jeho hlasem ani s jeho čísly.

### Krok 7 · Jak bude dělat přepisy

**Doporuč Wispr Flow** (cesta A). Gemini (cesta B) jen pro nahrávky odjinud: Google Meet
uložený na Disku, telefon, Zoom. Co si vybral, zapiš do `moje-nastaveni.md`.

---

## Po každém hovoru: přepis

### A) Wispr Flow (doporučeno)

Wispr nahraje schůzku přímo v počítači (Google Meet, Zoom, Teams, hovor přes WhatsApp
v počítači) a sám ji česky přepíše i s časy a mluvčími. Uživatel nemusí nic stahovat ani
vkládat a žádný klíč nepotřebuje.

**Jednou:** stáhnout z wisprflow.ai, přihlásit se a povolit mikrofon a nahrávání zvuku
z počítače, když se zeptá.

**Před hovorem:** ve Wispru spustit nahrávání schůzky (nebo potvrdit, když ho Wispr nabídne
sám) a **pojmenovat ji podle klienta**.

**Po hovoru:** počkat pár minut, než Wispr přepis dodělá. Pak stačí, když uživatel napíše
*„rozeber poslední hovor z Wispru"*, a ty:
1. `python3 scripts/wispr.py` vypíše schůzky s hotovým přepisem (nejnovější nahoře);
2. `python3 scripts/wispr.py --cislo N --ukaz` ukáže první repliky každého mluvčího. Wispr
   mluvčí jen čísluje. Kdo z nich je uživatel, poznáš z obsahu: otevírá hovor, vede otázky,
   představuje nabídku, říká cenu. Jméno klienta většinou zazní v hovoru nebo je v názvu schůzky;
3. `python3 scripts/wispr.py --cislo N --ja <číslo uživatele> --jmeno <jeho jméno> --klient <jméno klienta> --slug <firma>`
   uloží přepis do `data/sales-coach/transcripts/_inbox/`;
4. pokračuj `/analyzuj-call`.

Skript čte jen data Wispru v počítači a nic nikam neposílá. Na Windows hledá Wispr
v `%APPDATA%\Wispr Flow` (neověřeno). Když ho nenajde, ať uživatel otevře schůzku ve Wispru,
zkopíruje přepis a vloží ho do chatu. Uložíš ho do `_inbox/` ve formátu `[mm:ss] Jméno: text`.

### B) Google Meet → nahrávka na Google Disku

1. Nahrávat v Meetu jde jen v placeném Google Workspace: během hovoru **Aktivity → Nahrávání**.
   Po hovoru se nahrávka uloží na Disk organizátora do složky **Meet Recordings** a přijde
   e-mail s odkazem.
2. Uživatel MP4 stáhne (na Disku pravým tlačítkem → **Stáhnout**), nejlépe do složky `audio/`
   v repu (je v `.gitignore`, necommituje se).
3. Ty spustíš:
   `python3 scripts/prepis.py "audio/<soubor>.mp4" --obchodnik <jeho jméno> --klient <jméno klienta> --slug <firma> --datum <YYYY-MM-DD>`
   Skript nahrávku rozdělí na pětiminutové kusy a přepíše přes Gemini (hodinový hovor zhruba
   za minutu). Výsledek je v `_inbox/`, pak `/analyzuj-call`.
4. Potřebuje `GEMINI_API_KEY` v `.env.local`. Klíč je zdarma: aistudio.google.com/apikey →
   **Create API key**. Dál `ffmpeg` a `google-genai` (krok 2).

- **„Poznámky od Gemini" (Notes by Gemini) nepoužívej.** Je to shrnutí, ne přepis.
- Když Meet vytvořil dokument **Přepis** (Transcript), jde použít taky: stáhnout jako `.txt`
  do `_inbox/`. Časy v něm jsou ale jen po pár minutách, takže citace v rozboru budou
  méně přesné. Nahrávka přes `prepis.py` je lepší.
- **Soukromí:** na free tarifu může Google obsah použít ke zlepšování svých služeb. Pro hovory
  s klienty je lepší placený tarif (u pár hovorů týdně jde o koruny) nebo Wispr.

### C) Jiná nahrávka (telefon, Zoom, diktafon)

Stejně jako B: `python3 scripts/prepis.py <soubor>`. Přepis bez internetu, úplně v počítači,
popisuje `knowledge/prepis-hovoru.md` (cesta C).

---

## Rozbor, přehled a další

- **`/analyzuj-call`**: rozbor, kontrola formátu a pak otázka *„Poslat do aplikace?"* → push →
  přehled za asi 2 minuty.
- **Výsledek obchodu později:** stačí napsat *„Novák podepsal"* nebo *„Novák to odložil"*.
- **Před hovorem:** `/priprav-call Jméno` připraví karty na druhý monitor.
- **Trénink:** `/role-play objection:drahe`, `/role-play archetype:…` nebo `/role-play prospect:…`.
- **První vlastní hovor v přehledu** → nabídni smazání ukázky (`node scripts/smaz-ukazku.mjs --ano`).

---

## Když něco nejde

| Problém | Co udělat |
|---|---|
| Hovor není v přehledu | Byl push? `git log origin/main -1`. Na Vercelu **Deployments** musí být poslední **Ready**. |
| Přehled nebere heslo | Heslo ve Vercelu (**Settings → Environment Variables**) se liší od `.env.local`. Po změně **Redeploy**. |
| `wispr.py`: Wispr nenachází | Wispr není nainstalovaný nebo v něm není žádná schůzka. Jinak přepis zkopírovat ručně (viz A). |
| `wispr.py`: přepis není hotový | Počkat pár minut, Wispr ještě zpracovává. |
| `prepis.py`: kvóta, 429 | Free tier má limit za minutu i za den. Počkat, nebo placený tarif. |
| `prepis.py`: model není dostupný | `--model gemini-2.5-flash`, případně novější podle aistudio.google.com. |
| `kontrola.mjs` hlásí chybu | Opravit rozbor podle hlášky (formát v `CLAUDE.md`) a pustit znovu. |

---

## Novinky od Vojty

Kopie ze šablony se sama neaktualizuje. Když Vojta řekne, že něco vylepšil:

```bash
git remote add sablona https://github.com/nerad-v/sales-coach-kit.git   # jen poprvé
git fetch sablona
git checkout sablona/main -- scripts/ .claude/ knowledge/frameworks/ knowledge/prepis-hovoru.md knowledge/knihovna-videi.md PRUVODCE.md CLAUDE.md
```

**Nikdy nepřebírej** `data/`, `prospects/`, `personas/`, `knowledge/moje-nabidka.md`,
`lib/config.ts` ani `moje-nastaveni.md`. To jsou věci uživatele. Před commitem mu ukaž
`git diff --stat` a řekni, co se změnilo.

---

## Pravidla pro tebe (Clauda)

- Česky, tykej, krátce. Jeden krok najednou, pak ověř.
- `CLAUDE.md` a skilly mluví o „uživatelce", ale platí pro kohokoli. Rod poznáš podle toho, jak
  o sobě uživatel píše („udělal/a jsem"). Když to poznat nejde, zeptej se jednou a zapiš to
  do `moje-nastaveni.md`.
- Terminál obsluhuj sám. Uživatele nech klikat jen tam, kam nemůžeš (GitHub, Vercel, Wispr, Disk).
- Repo musí zůstat soukromé. Nahrávky (`audio/`) a klíče (`.env.local`) se nikdy necommitují.
- Nikdy nepushuj do `nerad-v/sales-coach-kit`.
