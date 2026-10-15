import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { OutcomeBadge } from "@/components/OutcomeBadge";
import { ScoreCircle } from "@/components/ScoreBar";
import { LinieBadge, TierBadge } from "@/components/TierBadge";
import { TranscriptViewer } from "@/components/TranscriptViewer";
import { ClosersSectionAccordion } from "@/components/ClosersSectionAccordion";
import { CallNotes } from "@/components/CallNotes";
import { getAllCalls, getCallBySlug } from "@/lib/data";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllCalls().map((c) => ({ slug: c.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export default async function CallDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const call = getCallBySlug(slug);
  if (!call) notFound();

  // Quick overview line for the scorecard
  const overviewLine = call.sections
    .map((s) => `${s.label} ${s.score ?? "n/a"}/${s.max}`)
    .join("  ·  ");

  return (
    <>
      <Nav />
      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12 w-full">
        <Link
          href="/calls"
          className="text-xs font-mono uppercase tracking-wider text-ink-dim hover:text-ink-strong inline-flex items-center gap-1 mb-8"
        >
          ← Všechny calls
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <LinieBadge linie={call.linie} />
              <OutcomeBadge outcome={call.outcome} size="md" />
              <TierBadge tier={call.tier} />
              <span className="text-xs font-mono text-ink-dim">
                {call.datum || "—"}
              </span>
            </div>
            <h1 className="serif-display text-3xl sm:text-5xl">
              {call.prospect}
            </h1>
            {call.notes && (
              <p className="text-ink-muted mt-4 leading-relaxed">
                {call.notes}
              </p>
            )}
          </div>
          <div className="shrink-0">
            <ScoreCircle score={call.total} />
          </div>
        </div>

        {/* Scorecard quick overview */}
        <section className="mb-3">
          <h2 className="text-[11px] font-mono uppercase tracking-widest text-ink-dim mb-3">
            Scorecard
          </h2>
          <div
            className="surface-card p-3 sm:p-4 text-xs font-mono"
            style={{ color: "var(--ink-muted)" }}
          >
            {overviewLine}
          </div>
        </section>

        {/* Per-section accordion */}
        <section className="mb-10">
          <p className="text-sm text-ink-dim mb-3 px-1">
            Klikni na sekci pro deep breakdown — momenty, pattern relevance,
            alternativní formulace.
          </p>
          <ClosersSectionAccordion
            sections={call.sections}
            deep={call.deepAnalysis}
          />
          {!call.hasDeepAnalysis && (
            <p className="text-xs text-ink-dim italic mt-3 px-1">
              Deep analysis (per-moment breakdown) zatím není v MD souboru.
              Re-analysis agent přepíše tento call do nového hlubšího formátu —
              po sync-data se moments objeví zde. Mezitím viz plnou analýzu
              níže.
            </p>
          )}
        </section>

        {/* Poznámka k hovoru (v prohlížeči, ukládá se sama) */}
        <CallNotes slug={call.slug} />

        {/* Full MD analýza (fallback / always-available reading view) */}
        <section className="mb-10">
          <h2 className="text-[11px] font-mono uppercase tracking-widest text-ink-dim mb-3">
            Plná analýza
          </h2>
          <div className="surface-card p-6 sm:p-8">
            <article
              className="prose-call"
              dangerouslySetInnerHTML={{ __html: call.htmlMarkdown }}
            />
          </div>
        </section>

        {/* Transcript */}
        {call.transcript && (
          <section className="mb-8">
            <h2 className="text-[11px] font-mono uppercase tracking-widest text-ink-dim mb-3">
              Transcript
            </h2>
            <TranscriptViewer transcript={call.transcript} />
          </section>
        )}

        <div
          className="surface-card p-4 text-xs text-ink-muted mb-8"
          style={{ background: "var(--surface-muted)" }}
        >
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <span className="font-mono text-ink-dim">
              Source:{" "}
              <code className="text-ink-muted">
                Sales-Coach/transcripts/{call.linie}/{call.slug}.md
              </code>
            </span>
            <span className="text-ink-dim">
              Outcome update = rename file s
              <code className="ml-1">_CLOSED</code> /
              <code className="ml-0.5">_LOST</code> /
              <code className="ml-0.5">_GHOST</code> suffixem.
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
