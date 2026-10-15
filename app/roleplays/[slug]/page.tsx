import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { ScoreCircle, ScoreBar } from "@/components/ScoreBar";
import { LinieBadge, TierBadge } from "@/components/TierBadge";
import { getAllRoleplays, getRoleplayBySlug } from "@/lib/data";

export const dynamic = "force-static";

const LAYER_LABELS: Record<string, string> = {
  objection: "Námitka drill",
  archetype: "Archetyp",
  prospect: "Prospect simulace",
};

export function generateStaticParams() {
  return getAllRoleplays().map((rp) => ({ slug: rp.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

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

export default async function RoleplayDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const rp = getRoleplayBySlug(slug);
  if (!rp) notFound();

  return (
    <>
      <Nav />
      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12 w-full">
        <Link
          href="/roleplays"
          className="text-xs font-mono uppercase tracking-wider text-ink-dim hover:text-ink-strong inline-flex items-center gap-1 mb-8"
        >
          ← Všechny roleplays
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <LinieBadge linie={rp.linie} />
              <RpOutcomeBadge outcome={rp.outcome} />
              <TierBadge tier={rp.tier} />
              <span className="text-xs font-mono text-ink-dim">
                {rp.date || "—"}
              </span>
            </div>
            <h1 className="serif-display text-3xl sm:text-5xl">{rp.persona}</h1>
            <p className="text-ink-muted mt-3 text-sm font-mono uppercase tracking-wider">
              {LAYER_LABELS[rp.layer] || rp.layer}
              {rp.mode ? ` · ${rp.mode}` : ""}
            </p>
          </div>
          <div className="shrink-0">
            <ScoreCircle score={rp.total} />
          </div>
        </div>

        {/* Co se trénovalo */}
        {rp.trained.length > 0 && (
          <section className="mb-8">
            <h2 className="text-[11px] font-mono uppercase tracking-widest text-ink-dim mb-3">
              Co se trénovalo
            </h2>
            <div className="flex flex-wrap gap-2">
              {rp.trained.map((t, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-3 py-1 text-sm rounded-md"
                  style={{
                    background: "var(--surface-muted)",
                    color: "var(--ink-muted)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Scorecard */}
        <section className="mb-10">
          <h2 className="text-[11px] font-mono uppercase tracking-widest text-ink-dim mb-3">
            Scorecard
          </h2>
          <div className="surface-card p-4 sm:p-5 space-y-2.5">
            {rp.sections.map((s) => (
              <div key={s.key} className="flex items-center gap-3">
                <span className="text-xs text-ink-muted w-24 shrink-0">
                  {s.label}
                </span>
                <ScoreBar score={s.score} max={s.max} />
              </div>
            ))}
          </div>
        </section>

        {/* Plné hodnocení (wins / misses / tip) */}
        <section className="mb-10">
          <h2 className="text-[11px] font-mono uppercase tracking-widest text-ink-dim mb-3">
            Hodnocení
          </h2>
          <div className="surface-card p-6 sm:p-8">
            <article
              className="prose-call"
              dangerouslySetInnerHTML={{ __html: rp.htmlMarkdown }}
            />
          </div>
        </section>

        <div
          className="surface-card p-4 text-xs text-ink-muted mb-8"
          style={{ background: "var(--surface-muted)" }}
        >
          <span className="font-mono text-ink-dim">
            Source:{" "}
            <code className="text-ink-muted">
              data/sales-coach/roleplays/{rp.linie}/{rp.slug}.md
            </code>{" "}
            — trénink, ne reálný call (mimo skill-scores.csv).
          </span>
        </div>
      </main>
    </>
  );
}
