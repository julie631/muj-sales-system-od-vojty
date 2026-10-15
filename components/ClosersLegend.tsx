import { SECTION_ORDER, SECTION_LABELS, SECTION_MAX } from "@/lib/types";

type SectionKey = (typeof SECTION_ORDER)[number];

const LEGEND: Record<
  SectionKey,
  {
    headline: string;
    what: string;
    tiers: { range: string; label: string }[];
    examples: string[];
    redFlags: string[];
  }
> = {
  clarify: {
    headline: "Odkryj reálnou bolest — upfront NEBO weaved během walkthrough",
    what: "Discovery sekce. Hodnotí se KVALITA woven discovery, ne 'upfront vs ne'. U callů, kde hned sdílíš obrazovku, je weave do ukázky legitimní metoda. Klíč: vyplynulo to, co potřebuješ k closu (lead source, past attempts, prospectův blok)?",
    tiers: [
      { range: "0–3", label: "Prospect skoro nepromluví, pitch naslepo" },
      { range: "4–6", label: "Woven discovery částečná, chybí klíčové info/emoce" },
      { range: "7–9", label: "Solidní woven — current state + past attempts + 1 pain" },
      { range: "10", label: "2–3 vrstvy: data + business impact + osobní cíl/pain" },
    ],
    examples: [
      "Odkud Ti teď chodí leady — online nebo doporučení?",
      "Co jsi v minulosti zkoušel a proč to nefungovalo?",
      "Co je pro Tebe ten skutečný blok — skepse, cena, čas?",
    ],
    redFlags: [
      "Prospect skoro nepromluví (talk ratio obchodníka >70 %)",
      "Jen 'ok, ok' + pokračuje monolog (0 follow-up Q)",
      "Zmeškaný emoční/skepse signál, co prospect sám dropnul",
    ],
  },
  label: {
    headline: "Pojmenuj emoci dřív než ji prospect vyřkne",
    what: "Voss tactical empathy. Pojmenování emoce prospecta dřív, než ji on sám vysloví. Disarmuje obranu, posiluje vztah, otevírá prostor pro pravdu.",
    tiers: [
      { range: "0–3", label: "Žádný label. Skok na argument." },
      { range: "4–7", label: '1 label, formálně ("chápu, že je to těžké")' },
      { range: "8–11", label: "2–3 labels, autenticky" },
      { range: "12–15", label: "Labels napříč hovorem, PŘED argumentem" },
    ],
    examples: [
      '"Zní to, jako kdybyste si rukama už spálil s reklamou, co?"',
      '"Vypadá to, že máte v hlavě představu emailů jako spam, co?"',
      '"Zdá se, že máte rozdělené role — Ty strategicky, on čísla?"',
    ],
    redFlags: [
      "Skok na argument bez labelu",
      '"Já chápu, ale..." (= negace předchozího)',
      '"Jasně, jasně" po emoční disclosure',
    ],
  },
  overview: {
    headline: "Co prospect už zkoušel a proč to nefungovalo",
    what: "Mapping minulých pokusů (reklamy, agentury, vlastní pokusy) + důvod selhání. Zakotví hodnotu Tvého řešení — ví, co nefunguje, lépe ocení, co děláš jinak.",
    tiers: [
      { range: "0–3", label: "Neptal se" },
      { range: "4–7", label: '"Co jste zkoušeli?" bez hloubky' },
      { range: "8–11", label: "1–2 minulé pokusy + důvod selhání" },
      { range: "12–15", label: "Komplet mapping + frustration level + why this is different" },
    ],
    examples: [
      "Co jste v minulosti zkoušeli, abyste tohle vyřešili?",
      "Proč to podle Tebe nefungovalo?",
      "Měl jsi v minulosti agenturu, která Ti to postavila špatně?",
    ],
    redFlags: [
      "Past attempts skip → 'past attempts gap probing'",
      "Žádné probing efficacy minulých pokusů",
    ],
  },
  sell: {
    headline: "Sell the vacation, not the plane",
    what: "Konkrétní scénář, jak bude vypadat jeho život za 60-90 dní. Plus case study s konkrétními čísly z tvé praxe. Featury = 0 bodů.",
    tiers: [
      { range: "0–5", label: "Featurový talk ('máme 18 funkcí')" },
      { range: "6–10", label: "Mix featur + obecných benefitů" },
      { range: "11–15", label: "Konkrétní scénář s čísly pro tohoto prospecta" },
      { range: "16–20", label: "Plný scenario + case study + emocionální výsledek" },
    ],
    examples: [
      '"Představ si to za 60 dní — [konkrétní stav, ke kterému se chce dostat]"',
      '"[Klient] ve stejné situaci jako Ty — [výsledek] za [období]"',
      "ROI: [jeho čísla] × [co změníme] = konkrétní částka pro tohoto klienta",
    ],
    redFlags: [
      "Žádná case study (= generic 'klienti z Brna')",
      "Žádná čísla na míru prospectovi",
      "Žádný 'co bude jinak za X dní' picture",
    ],
  },
  explain: {
    headline: "Námitky = žádost o víc informací, ne odmítnutí",
    what: "Zvládnutí námitek bez defenzivy. Mirror/label PŘED argumentem. Reframe (NE discount). Garance v konkrétních číslech.",
    tiers: [
      { range: "0–5", label: "Defenzivní ('ne, to není pravda')" },
      { range: "6–10", label: "Slušná odpověď, ale 'ano, ale...' (= negace)" },
      { range: "11–15", label: "Mirror/label PŘED argumentem, pak konkrétní reframe" },
      { range: "16–20", label: "Námitku otočí tak, že prospect sám argumentuje PRO" },
    ],
    examples: [
      '"Já se vás narovinu zeptám, jakej je Tvůj očekávaný budget?" (Voss calibrated Q)',
      '"Uberme z balíčku X a jsme na Y" (zúžení rozsahu, ne sleva)',
      '"[Konkrétní výsledek] do [termín], jinak vracíme peníze" (concrete garance)',
    ],
    redFlags: [
      "Námitka zůstane 'viset' bez resolution",
      "'Ozveme se' jako close",
      "Sleva na první vyjádření nejistoty",
      "NE-mlčí po pricing reveal",
    ],
  },
  reinforce: {
    headline: "Závazek na konci hovoru — vždy. 'Ozveme se' = ztráta.",
    what: "Konkrétní next step: datum + čas + co se stane + kdo dělá co. Smlouva / zálohovka / úvodní hovor naplánovaný.",
    tiers: [
      { range: "0–3", label: '"Ozveme se" / "dejte vědět" / žádný krok' },
      { range: "4–6", label: 'Follow-up vágně ("příští týden")' },
      { range: "7–9", label: "Konkrétní datum + čas + co se stane" },
      { range: "10", label: "Závazek na místě (smlouva, zálohovka, úvodní hovor)" },
    ],
    examples: [
      '"Smlouva + zálohovka dnes večer, start pondělí, dodání +10 dní"',
      '"Úvodní hovor středa 17:00 — předáme přístupy, vyřešíme fakturu"',
      "Paid discovery model — fakturace za call samotný",
    ],
    redFlags: [
      "'Ozveme se' close",
      "'Dejte vědět' = bez timeline",
      "Žádný explicit next step",
    ],
  },
  mechanika: {
    headline: "Objektivní metriky hovoru — talk ratio, monolog, otázky",
    what: "Tahá se z transcriptu. Cíl: 40:60 (prospect mluví víc), nejdelší monolog <90s, min 60 % otevřených otázek.",
    tiers: [
      { range: "0–3", label: "Talk ratio obchodníka 60 %+, monolog >120s, zavřené Q" },
      { range: "4–6", label: "Talk ratio 50–60 %, monolog 90–120s" },
      { range: "7–9", label: "Talk ratio 40–55 %, monolog <90s, ~50 % otevřené" },
      { range: "10", label: "Talk ratio <40 %, monolog <60s, 60 %+ otevřené" },
    ],
    examples: [
      "Otevřené Q: Co / Jak / Proč / Kdy / Kde",
      "Zavřené Q: Máte X? Souhlasíte? (ano/ne odpověď)",
    ],
    redFlags: [
      "Talk ratio obchodníka >55 %",
      "Nejdelší monolog > 90s (typicky pitch heavy)",
      "Filler 'Eh', 'Tak, tak', 'No, no' (uncertainty markers)",
    ],
  },
};

export function ClosersLegend() {
  return (
    <section className="mb-10">
      <div className="flex items-baseline justify-between mb-4 px-1 flex-wrap gap-2">
        <h2 className="serif-display text-2xl">CLOSER scoring — co se v každé sekci hodnotí</h2>
        <span className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">
          100 bodů celkem · moderate-strict kalibrace
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {SECTION_ORDER.map((key) => {
          const l = LEGEND[key];
          const max = SECTION_MAX[key];
          return (
            <article
              key={key}
              className="surface-card p-5 sm:p-6 flex flex-col gap-3"
            >
              <header className="flex items-baseline justify-between gap-3 flex-wrap">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-ink-dim mb-0.5">
                    Sekce
                  </div>
                  <h3 className="serif-display text-2xl leading-tight">
                    {SECTION_LABELS[key]}
                  </h3>
                </div>
                <span
                  className="shrink-0 font-serif text-2xl tabular-nums px-3 py-0.5 rounded"
                  style={{
                    color: "var(--brand)",
                    background: "var(--brand-tint)",
                  }}
                >
                  /{max}
                </span>
              </header>

              <p
                className="text-sm leading-snug italic"
                style={{ color: "var(--ink-strong)" }}
              >
                {l.headline}
              </p>

              <p className="text-sm text-ink-muted leading-relaxed">{l.what}</p>

              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-ink-dim mb-1.5">
                  Bodové pásma
                </div>
                <ul className="space-y-1 text-sm">
                  {l.tiers.map((t) => (
                    <li key={t.range} className="flex gap-2.5 items-baseline">
                      <span
                        className="font-mono text-[11px] tabular-nums shrink-0 px-1.5 py-0.5 rounded"
                        style={{
                          background: "var(--surface-muted)",
                          color: "var(--ink-muted)",
                          minWidth: 44,
                          textAlign: "center",
                        }}
                      >
                        {t.range}
                      </span>
                      <span className="text-ink-muted">{t.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-ink-dim mb-1.5">
                  Příklady / fráze
                </div>
                <ul className="space-y-1 text-sm text-ink-muted">
                  {l.examples.map((e, i) => (
                    <li key={i} className="leading-snug">
                      → {e}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div
                  className="text-[10px] font-mono uppercase tracking-wider mb-1.5"
                  style={{ color: "var(--lost)" }}
                >
                  Red flags
                </div>
                <ul className="space-y-1 text-sm text-ink-muted">
                  {l.redFlags.map((r, i) => (
                    <li key={i} className="leading-snug">
                      × {r}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
