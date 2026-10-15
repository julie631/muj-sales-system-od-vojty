import Link from "next/link";
import { Nav } from "@/components/Nav";
import { OutcomeBadge } from "@/components/OutcomeBadge";
import { getAllCalls, getWinLossDiff } from "@/lib/data";
import { CallSummary } from "@/lib/types";

export const dynamic = "force-static";

export default function AnalyticsPage() {
  const diff = getWinLossDiff();
  const calls = getAllCalls();
  const closed = calls.filter((c) => c.outcome === "CLOSED");
  const lost = calls.filter(
    (c) => c.outcome === "LOST" || c.outcome === "GHOST"
  );

  // Ve kterých sekcích se uzavřené hovory nejvíc liší od prohraných — z dat.
  const leaders = diff
    .filter((d) => d.closedAvg !== null && d.lostAvg !== null)
    .map((d) => ({ label: d.label, gap: (d.closedAvg as number) / d.max - (d.lostAvg as number) / d.max }))
    .filter((d) => d.gap > 0)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 3);

  function maxLabel(arr: CallSummary[], key: string) {
    return arr
      .map((c) => ({
        v: c.sections.find((s) => s.key === key)?.score ?? null,
        c,
      }))
      .filter((x) => x.v !== null)
      .sort((a, b) => (b.v ?? 0) - (a.v ?? 0))[0]?.c;
  }

  return (
    <>
      <Nav />
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 w-full">
        <header className="mb-10">
          <p className="text-xs text-ink-dim font-mono uppercase tracking-widest mb-2">
            Analytics
          </p>
          <h1 className="serif-display text-3xl sm:text-4xl">
            Win / Loss diff
          </h1>
          <p className="text-ink-muted mt-3 max-w-2xl leading-relaxed">
            Per-section breakdown: CLOSED ({closed.length}) vs LOST/GHOST (
            {lost.length}).
          </p>
        </header>

        <section className="mb-10">
          <div className="surface-card overflow-hidden">
            <table className="w-full text-sm">
              <thead
                className="border-b"
                style={{
                  background: "var(--surface-muted)",
                  borderColor: "var(--border-soft)",
                }}
              >
                <tr className="text-left text-[10px] font-mono uppercase tracking-wider text-ink-dim">
                  <th className="px-3 py-3">Sekce</th>
                  <th className="px-3 py-3 text-right">Max</th>
                  <th className="px-3 py-3 text-right">CLOSED avg</th>
                  <th className="px-3 py-3 text-right">LOST/GHOST avg</th>
                  <th className="px-3 py-3 text-right">Diff</th>
                  <th className="px-3 py-3">Bar</th>
                </tr>
              </thead>
              <tbody>
                {diff.map((d) => {
                  const diffVal =
                    d.closedAvg !== null && d.lostAvg !== null
                      ? Math.round((d.closedAvg - d.lostAvg) * 10) / 10
                      : null;
                  const closedPct = d.closedAvg
                    ? (d.closedAvg / d.max) * 100
                    : 0;
                  const lostPct = d.lostAvg ? (d.lostAvg / d.max) * 100 : 0;
                  return (
                    <tr
                      key={d.key}
                      className="border-b last:border-b-0"
                      style={{ borderColor: "var(--border-soft)" }}
                    >
                      <td className="px-3 py-3 text-ink-strong font-medium">
                        {d.label}
                      </td>
                      <td className="px-3 py-3 text-right text-ink-dim font-mono">
                        /{d.max}
                      </td>
                      <td
                        className="px-3 py-3 text-right font-mono font-semibold"
                        style={{ color: "var(--closed)" }}
                      >
                        {d.closedAvg ?? "—"}
                      </td>
                      <td
                        className="px-3 py-3 text-right font-mono"
                        style={{ color: "var(--lost)" }}
                      >
                        {d.lostAvg ?? "—"}
                      </td>
                      <td className="px-3 py-3 text-right font-mono font-semibold">
                        {diffVal === null ? (
                          <span className="text-ink-dim">—</span>
                        ) : (
                          <span
                            style={{
                              color:
                                diffVal > 0
                                  ? "var(--closed)"
                                  : diffVal < 0
                                  ? "var(--lost)"
                                  : "var(--ink-dim)",
                            }}
                          >
                            {diffVal > 0 ? "+" : ""}
                            {diffVal}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3 w-48">
                        <div className="score-track h-2 overflow-hidden relative">
                          <div
                            className="absolute top-0 left-0 h-full rounded-full"
                            style={{
                              width: `${closedPct}%`,
                              background: "var(--closed)",
                              opacity: 0.85,
                            }}
                          />
                          <div
                            className="absolute top-0 left-0 h-full rounded-full"
                            style={{
                              width: `${lostPct}%`,
                              background: "var(--lost)",
                              opacity: 0.4,
                              mixBlendMode: "multiply",
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-ink-muted text-xs mt-3 px-1 leading-relaxed">
            {leaders.length > 0 ? (
              <>
                Uzavřené hovory se nejvíc liší v{" "}
                {leaders.map((l, i) => (
                  <span key={l.label}>
                    {i > 0 && (i === leaders.length - 1 ? " a " : ", ")}
                    <strong className="text-ink">{l.label}</strong>
                  </span>
                ))}
                .
              </>
            ) : (
              "Až budou uzavřené i prohrané hovory, uvidíš tu, ve kterých sekcích se liší."
            )}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="serif-display text-xl mb-4">
            {closed.length} CLOSED callů — co je odlišuje
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {closed.map((c) => (
              <Link
                key={c.slug}
                href={`/calls/${c.slug}`}
                className="surface-card surface-card-hover p-4 block"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-ink-strong font-medium">{c.prospect}</h3>
                  <OutcomeBadge outcome="CLOSED" />
                </div>
                <p className="text-xs text-ink-dim font-mono mb-2">
                  {c.datum || "—"} · skóre {c.total ?? "—"}/100
                </p>
                {c.notes && (
                  <p className="text-ink-muted text-xs leading-snug line-clamp-3">
                    {c.notes}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="surface-card p-5">
            <h3 className="text-ink-strong font-medium mb-3">
              Cally &gt; 50 které NEzavřely
            </h3>
            <ul className="text-sm space-y-2">
              {calls
                .filter(
                  (c) =>
                    (c.total ?? 0) >= 50 &&
                    (c.outcome === "LOST" ||
                      c.outcome === "GHOST" ||
                      c.outcome === "ODLOZENO")
                )
                .map((c) => (
                  <li key={c.slug} className="flex items-center gap-2">
                    <span
                      className="font-mono font-semibold tabular-nums"
                      style={{ color: "var(--odlozeno)" }}
                    >
                      {c.total}
                    </span>
                    <Link
                      href={`/calls/${c.slug}`}
                      className="text-ink-strong hover:text-[var(--brand)] flex-1 truncate"
                    >
                      {c.prospect}
                    </Link>
                    <OutcomeBadge outcome={c.outcome} />
                  </li>
                ))}
            </ul>
            <p className="text-ink-dim text-xs mt-3 leading-relaxed">
              Vysoké skóre, a přesto bez obchodu — podívej se, co v těchhle
              hovorech chybělo.
            </p>
          </div>
          <div className="surface-card p-5">
            <h3 className="text-ink-strong font-medium mb-3">
              Cally &lt; 60 které ZAVŘELY
            </h3>
            <ul className="text-sm space-y-2">
              {calls
                .filter((c) => (c.total ?? 0) < 60 && c.outcome === "CLOSED")
                .map((c) => (
                  <li key={c.slug} className="flex items-center gap-2">
                    <span
                      className="font-mono font-semibold tabular-nums"
                      style={{ color: "var(--closed)" }}
                    >
                      {c.total}
                    </span>
                    <Link
                      href={`/calls/${c.slug}`}
                      className="text-ink-strong hover:text-[var(--brand)] flex-1 truncate"
                    >
                      {c.prospect}
                    </Link>
                    <OutcomeBadge outcome="CLOSED" />
                  </li>
                ))}
            </ul>
            <p className="text-ink-dim text-xs mt-3 leading-relaxed">
              Nízké skóre nemusí znamenat prohru — podívej se, co v těchhle
              hovorech nakonec rozhodlo.
            </p>
          </div>
        </section>

        <p
          className="text-ink-dim text-[10px] font-mono text-center pt-4 border-t"
          style={{ borderColor: "var(--border-soft)" }}
        >
          Best CLOSED Sell:{" "}
          <Link
            href={`/calls/${maxLabel(closed, "sell")?.slug}`}
            className="hover:text-ink-strong"
          >
            {maxLabel(closed, "sell")?.prospect}
          </Link>{" "}
          · Best CLOSED Explain:{" "}
          <Link
            href={`/calls/${maxLabel(closed, "explain")?.slug}`}
            className="hover:text-ink-strong"
          >
            {maxLabel(closed, "explain")?.prospect}
          </Link>
        </p>
      </main>
    </>
  );
}
