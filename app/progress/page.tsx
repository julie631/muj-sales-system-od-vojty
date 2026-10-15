import { Nav } from "@/components/Nav";
import { SectionTrendChart } from "@/components/Charts";
import { getSectionTrends, getWeaknessHeatmap } from "@/lib/data";
import {
  SECTION_DESCRIPTIONS,
  SECTION_LABELS,
  SECTION_MAX,
  SECTION_ORDER,
} from "@/lib/types";

export const dynamic = "force-static";

export default function ProgressPage() {
  const trends = getSectionTrends();
  const heat = getWeaknessHeatmap();

  // Nejslabší a nejsilnější sekce podle průměru vůči maximu — z dat, ne natvrdo.
  const ranked = [...heat].filter((h) => h.avg > 0).sort((a, b) => a.pct - b.pct);
  const weakest = ranked.slice(0, 3);
  const strongest = ranked[ranked.length - 1];

  return (
    <>
      <Nav />
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 w-full">
        <header className="mb-10">
          <p className="text-xs text-ink-dim font-mono uppercase tracking-widest mb-2">
            Progress
          </p>
          <h1 className="serif-display text-3xl sm:text-4xl">
            Per-section trend + weakness heatmap
          </h1>
          <p className="text-ink-muted mt-3 max-w-2xl leading-relaxed">
            Jak se každá CLOSER sekce vyvíjí v čase. Heatmap ukazuje, které
            sekce jsou dlouhodobě nejslabší.
          </p>
        </header>

        {/* Weakness heatmap */}
        <section className="mb-10">
          <h2 className="text-[11px] font-mono uppercase tracking-widest text-ink-dim mb-3">
            Weakness heatmap (avg / max)
          </h2>
          <div className="surface-card p-4 sm:p-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
              {heat.map((h) => {
                let bg = "var(--lost-tint)";
                let color = "var(--lost)";
                let border = "var(--lost)";
                if (h.pct >= 70) {
                  bg = "var(--closed-tint)";
                  color = "var(--closed)";
                  border = "var(--closed)";
                } else if (h.pct >= 50) {
                  bg = "var(--odlozeno-tint)";
                  color = "var(--odlozeno)";
                  border = "var(--odlozeno)";
                }
                return (
                  <div
                    key={h.key}
                    className="rounded-md p-3 flex flex-col items-center text-center"
                    style={{
                      background: bg,
                      border: `1px solid ${border}40`,
                    }}
                  >
                    <div
                      className="font-serif text-2xl font-medium leading-none tabular-nums mb-1"
                      style={{ color }}
                    >
                      {h.avg}
                    </div>
                    <div className="text-[10px] text-ink-dim font-mono">
                      / {h.max} · {h.pct}%
                    </div>
                    <div className="text-xs text-ink-strong font-medium mt-2">
                      {h.label}
                    </div>
                  </div>
                );
              })}
            </div>
            {ranked.length >= 2 && (
              <p className="text-ink-muted text-xs mt-4 px-1 leading-relaxed">
                Nejslabší:{" "}
                <strong className="text-ink-strong">{ranked[0].label}</strong> a{" "}
                <strong className="text-ink-strong">{ranked[1].label}</strong> — tam je
                největší prostor. Nejsilnější:{" "}
                <strong className="text-ink-strong">{strongest.label}</strong>.
              </p>
            )}
          </div>
        </section>

        {/* Per-section trends */}
        <section>
          <h2 className="text-[11px] font-mono uppercase tracking-widest text-ink-dim mb-3">
            Per-section trend v čase
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SECTION_ORDER.map((k) => (
              <div key={k} className="surface-card p-4 sm:p-5">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-ink-strong font-medium">
                    {SECTION_LABELS[k]}
                  </h3>
                  <span className="text-[10px] text-ink-dim font-mono uppercase">
                    /{SECTION_MAX[k]}
                  </span>
                </div>
                <p className="text-xs text-ink-dim mb-2">
                  {SECTION_DESCRIPTIONS[k]}
                </p>
                <SectionTrendChart
                  data={trends}
                  section={k}
                  max={SECTION_MAX[k]}
                />
              </div>
            ))}
          </div>
        </section>

        {weakest.length > 0 && (
          <section className="mt-10 surface-card p-5 sm:p-6">
            <h3 className="serif-display text-xl mb-4">Top 3 leverage points</h3>
            <ol className="space-y-4 text-sm">
              {weakest.map((h, i) => (
                <li key={h.key} className="flex gap-4">
                  <span
                    className="font-serif text-3xl font-medium leading-none"
                    style={{ color: "var(--brand)" }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <strong className="text-ink-strong">
                      {h.label} (avg {h.avg} / {h.max})
                    </strong>
                    <p className="text-ink-muted text-sm mt-0.5 leading-relaxed">
                      {SECTION_DESCRIPTIONS[h.key]}. Natrénuj v roleplayi.
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}
      </main>
    </>
  );
}
