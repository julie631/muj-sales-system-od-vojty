import Link from "next/link";
import { Nav } from "@/components/Nav";
import { ScoreBar } from "@/components/ScoreBar";
import { LinieBadge, TierBadge } from "@/components/TierBadge";
import { getAllRoleplays } from "@/lib/data";

export const dynamic = "force-static";

const LAYER_LABELS: Record<string, string> = {
  objection: "Námitka drill",
  archetype: "Archetyp",
  prospect: "Prospect simulace",
};

function RpOutcomeBadge({ outcome }: { outcome: string }) {
  const o = (outcome || "").toLowerCase();
  let color = "var(--ink-dim)";
  let bg = "var(--surface-muted)";
  let label = outcome || "—";
  if (o === "signed" || o === "yes" || o === "closed") {
    color = "var(--closed)";
    bg = "var(--closed-tint)";
    label = "Signed";
  } else if (o === "no" || o === "lost") {
    color = "var(--lost)";
    bg = "var(--lost-tint)";
    label = "No";
  } else if (o === "partial" || o === "open") {
    color = "var(--odlozeno)";
    bg = "var(--odlozeno-tint)";
    label = "Partial";
  }
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-md"
      style={{ background: bg, color }}
    >
      {label}
    </span>
  );
}

export default function RoleplaysPage() {
  const roleplays = getAllRoleplays();

  return (
    <>
      <Nav />
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 w-full">
        <header className="mb-8 sm:mb-10">
          <p className="text-xs text-ink-dim font-mono uppercase tracking-widest mb-2">
            Roleplays
          </p>
          <h1 className="serif-display text-3xl sm:text-4xl">
            Trénink / role-play drilly
          </h1>
          <p className="text-ink-muted mt-3 text-base leading-relaxed">
            Sparring sessions z <code>/role-play</code>. Co se trénovalo, co
            šlo dobře, co špatně + scorecard. Záměrně oddělené od reálných callů
            — tohle je trénink, ne reálný výsledek.
          </p>
        </header>

        {roleplays.length === 0 ? (
          <div className="surface-card p-8 text-center text-ink-muted">
            Zatím žádné uložené role-playe. Spusť <code>/role-play</code> a po
            scorecardu se sem uloží.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roleplays.map((rp) => (
              <Link
                key={rp.slug}
                href={`/roleplays/${rp.slug}`}
                className="surface-card p-5 hover:shadow-md transition-shadow block"
              >
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <LinieBadge linie={rp.linie} />
                  <RpOutcomeBadge outcome={rp.outcome} />
                  <TierBadge tier={rp.tier} />
                  <span className="text-xs font-mono text-ink-dim ml-auto">
                    {rp.date || "—"}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3 mb-1">
                  <h2 className="serif-display text-xl leading-snug">
                    {rp.persona}
                  </h2>
                  {rp.total !== null && (
                    <span className="font-serif tabular-nums text-2xl shrink-0">
                      {rp.total}
                      <span className="text-ink-dim text-sm">/100</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-ink-dim font-mono uppercase tracking-wider mb-3">
                  {LAYER_LABELS[rp.layer] || rp.layer}
                  {rp.mode ? ` · ${rp.mode}` : ""}
                </p>

                {rp.trained.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {rp.trained.map((t, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2 py-0.5 text-[11px] rounded-md"
                        style={{
                          background: "var(--surface-muted)",
                          color: "var(--ink-muted)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="space-y-1.5">
                  {rp.sections.map((s) => (
                    <div key={s.key} className="flex items-center gap-2">
                      <span className="text-[11px] text-ink-dim w-20 shrink-0">
                        {s.label}
                      </span>
                      <ScoreBar score={s.score} max={s.max} />
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
