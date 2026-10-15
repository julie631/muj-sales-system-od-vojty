import { DeepSection, ScoreSection, SECTION_DESCRIPTIONS } from "@/lib/types";

const Chevron = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="accordion-chevron"
    aria-hidden="true"
  >
    <path d="M5.5 12L9.5 8L5.5 4V12Z" />
  </svg>
);

function scoreColor(pct: number) {
  if (pct >= 70) return "var(--closed)";
  if (pct >= 50) return "var(--odlozeno)";
  return "var(--lost)";
}

function scoreTint(pct: number) {
  if (pct >= 70) return "var(--closed-tint)";
  if (pct >= 50) return "var(--odlozeno-tint)";
  return "var(--lost-tint)";
}

/**
 * Per-section accordion. Uses native <details> so default state = closed
 * with zero JS, supports multi-expand, plays well with static export.
 */
export function ClosersSectionAccordion({
  sections,
  deep,
}: {
  sections: ScoreSection[];
  deep: DeepSection[];
}) {
  const deepByKey = new Map(deep.map((d) => [d.key, d]));

  return (
    <div className="surface-card overflow-hidden">
      {sections.map((s) => {
        const pct = s.score !== null && s.max
          ? Math.max(0, Math.min(100, (s.score / s.max) * 100))
          : 0;
        const color = s.score === null ? "var(--ink-dim)" : scoreColor(pct);
        const tint = s.score === null ? "var(--surface-muted)" : scoreTint(pct);

        const d = deepByKey.get(s.key);
        const hasDeep = !!d && (d.moments.length > 0 || d.reasoningHtml);

        return (
          <details key={s.key} className="accordion-row group">
            <summary className="accordion-summary px-4 sm:px-5">
              <Chevron />
              <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h3
                      className="serif-display text-lg sm:text-xl"
                      style={{ margin: 0 }}
                    >
                      {s.label}
                    </h3>
                    <span className="text-xs text-ink-dim">
                      {SECTION_DESCRIPTIONS[s.key]}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-1 sm:mt-0 shrink-0">
                  <div
                    className="score-track h-1.5 w-32 sm:w-40"
                    aria-hidden="true"
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                  <span
                    className="font-serif tabular-nums text-base"
                    style={{
                      color,
                      background: tint,
                      borderRadius: 6,
                      padding: "2px 10px",
                      minWidth: 64,
                      textAlign: "center",
                      display: "inline-block",
                    }}
                  >
                    {s.score === null ? "n/a" : `${s.score}/${s.max}`}
                  </span>
                </div>
              </div>
            </summary>

            <div className="accordion-body pr-4 sm:pr-5">
              {hasDeep ? (
                <>
                  {d!.reasoningHtml && (
                    <div className="mb-5">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-ink-dim mb-1.5">
                        Reasoning
                      </div>
                      <article
                        className="prose-call"
                        dangerouslySetInnerHTML={{ __html: d!.reasoningHtml }}
                      />
                    </div>
                  )}

                  {d!.moments.length > 0 && (
                    <div className="space-y-6">
                      {d!.moments.map((m, i) => (
                        <div
                          key={i}
                          className="border-l-2 pl-4"
                          style={{ borderColor: "var(--border-mid)" }}
                        >
                          <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-ink-dim">
                              Moment {i + 1}
                            </span>
                            {m.timestamp && (
                              <span
                                className="text-[11px] font-mono px-1.5 py-0.5 rounded"
                                style={{
                                  background: "var(--surface-muted)",
                                  color: "var(--ink-muted)",
                                }}
                              >
                                {m.timestamp}
                              </span>
                            )}
                          </div>
                          <h4
                            className="serif-display text-base sm:text-lg"
                            style={{ margin: "0 0 0.5rem 0", fontWeight: 500 }}
                          >
                            {m.title}
                          </h4>
                          <article
                            className="prose-call"
                            dangerouslySetInnerHTML={{ __html: m.html }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : s.score === null ? (
                <p className="text-sm text-ink-muted italic">
                  Sekce nebyla skórovaná pro tento call (typicky transcript
                  truncated nebo discovery proběhl mimo tento záznam). Viz{" "}
                  <span className="text-ink">plnou analýzu níže</span>.
                </p>
              ) : (
                <p className="text-sm text-ink-muted italic">
                  Deep analysis nebyla pro tento call extrahována. Otevři{" "}
                  <span className="text-ink">plnou analýzu níže</span> nebo
                  transcript.
                </p>
              )}
            </div>
          </details>
        );
      })}
    </div>
  );
}
