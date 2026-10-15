import { Nav } from "@/components/Nav";
import { CallCard } from "@/components/CallCard";
import { MonthlyTrend, ScoreHistogram } from "@/components/Charts";
import { ClosersLegend } from "@/components/ClosersLegend";
import { getLeads, getKpi, getRecentCalls } from "@/lib/data";
import { linieLabel } from "@/lib/config";
import { linieColor } from "@/components/TierBadge";
import Link from "next/link";

export const dynamic = "force-static";

function KpiCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="surface-card p-4 sm:p-5">
      <div className="text-[10px] font-mono uppercase tracking-wider text-ink-dim">
        {label}
      </div>
      <div
        className="font-serif text-3xl sm:text-4xl font-medium leading-none mt-2 tabular-nums"
        style={{ color: accent || "var(--ink-strong)" }}
      >
        {value}
      </div>
      {hint && (
        <div className="text-xs text-ink-muted mt-2">{hint}</div>
      )}
    </div>
  );
}

type CloseRateStats = {
  rate: number;
  total: number;
  closed: number;
  lost: number;
  open: number;
  ghost: number;
  odlozeno: number;
} | null;

function CloseRateCard({
  linie,
  stats,
  note,
  color,
  fallback,
}: {
  linie: string;
  stats: CloseRateStats;
  note: string;
  color: string;
  fallback?: string | null;
}) {
  const display = stats === null ? fallback ?? "—" : `${stats.rate}%`;
  const breakdown = stats
    ? [
        `${stats.closed}/${stats.total} closed`,
        stats.lost > 0 ? `${stats.lost} lost` : null,
        stats.open > 0 ? `${stats.open} open` : null,
        stats.ghost > 0 ? `${stats.ghost} ghost` : null,
        stats.odlozeno > 0 ? `${stats.odlozeno} odloženo` : null,
      ]
        .filter(Boolean)
        .join(" · ")
    : null;
  return (
    <div className="surface-card p-4 sm:p-5">
      <div className="flex items-center justify-between mb-1">
        <div className="text-[10px] font-mono uppercase tracking-wider text-ink-dim">
          Close rate / {linie.toLowerCase()}
        </div>
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ background: color }}
        />
      </div>
      <div
        className="font-serif text-3xl sm:text-4xl font-medium leading-none mt-2 tabular-nums"
        style={{ color }}
      >
        {display}
      </div>
      {breakdown && (
        <div className="text-[11px] font-mono text-ink-muted mt-2 tabular-nums">
          {breakdown}
        </div>
      )}
      <div className="text-xs text-ink-muted mt-1">{note}</div>
    </div>
  );
}

export default function HomePage() {
  const kpi = getKpi();
  const recent = getRecentCalls(5);
  // Lead-level (deduped per prospect) so multi-call prospects show once.
  const leads = getLeads();
  const closedCalls = leads.filter((c) => c.outcome === "CLOSED");
  const openCalls = leads.filter((c) => c.outcome === "OPEN");

  // Komentáře pod grafy se počítají z dat, ne natvrdo.
  const closedScores = closedCalls
    .map((c) => c.total)
    .filter((t): t is number => t !== null);
  const scoreNote = closedScores.length
    ? `Uzavřené obchody měly skóre ${Math.min(...closedScores)}–${Math.max(...closedScores)}.`
    : "Až budou první uzavřené obchody, uvidíš tu, v jakém rozsahu skóre se zavírá.";
  const firstMonth = kpi.months[0];
  const lastMonth = kpi.months[kpi.months.length - 1];
  const trendNote =
    kpi.months.length >= 2
      ? `Průměrné skóre: ${firstMonth.avgScore} v ${firstMonth.month} → ${lastMonth.avgScore} v ${lastMonth.month}.`
      : "Trend se ukáže od druhého měsíce s rozebranými hovory.";

  return (
    <>
      <Nav />
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 w-full">
        <header className="mb-10 sm:mb-14">
          <p className="text-xs text-ink-dim font-mono uppercase tracking-widest mb-3">
            Overview
          </p>
          <h1 className="serif-display text-4xl sm:text-5xl">
            Co máme z {kpi.totalAnalyzed} callů
          </h1>
          <p className="text-ink-muted mt-4 max-w-2xl text-base leading-relaxed">
            Přehled CLOSER skóre, výsledků a vzorců ze všech rozebraných hovorů. Zdroj:{" "}
            <code className="text-xs">data/sales-coach/transcripts</code> +{" "}
            <code className="text-xs">progress/skill-scores.csv</code>.
          </p>
        </header>

        {/* KPI grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <KpiCard
            label="Analyzovaných callů"
            value={kpi.totalAnalyzed}
            hint={`+ ${kpi.csvCount} v CSV`}
          />
          <KpiCard
            label="CLOSED deals"
            value={kpi.closed}
            accent="var(--closed)"
            hint={`z ${kpi.closed + kpi.lost + kpi.ghost + kpi.odlozeno + kpi.open}: ${kpi.lost} lost · ${kpi.ghost} ghost · ${kpi.open} open${kpi.odlozeno > 0 ? ` · ${kpi.odlozeno} odloženo` : ""}`}
          />
          <KpiCard
            label="Avg CLOSER skóre"
            value={kpi.avg}
            hint="z 100, napříč všemi liniemi"
          />
          <KpiCard
            label="Highest"
            value={kpi.highest?.total ?? "—"}
            accent="var(--brand)"
            hint={
              kpi.highest ? (
                <Link
                  className="hover:underline text-ink-muted"
                  href={`/calls/${kpi.highest.slug}`}
                >
                  {kpi.highest.prospect} →
                </Link>
              ) : (
                "—"
              )
            }
          />
        </section>

        {/* Úspěšnost podle linie — linie = podsložka v transcripts/ */}
        {kpi.closeRateByLinie.length > 0 && (
          <section
            className={`grid grid-cols-1 gap-3 sm:gap-4 mb-10 ${
              kpi.closeRateByLinie.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : ""
            }`}
          >
            {kpi.closeRateByLinie.map(({ linie, stats }) => (
              <CloseRateCard
                key={linie}
                linie={linieLabel(linie)}
                stats={stats}
                note="počítá se poslední hovor s každým klientem"
                color={linieColor(linie).color}
              />
            ))}
          </section>
        )}

        {/* Charts row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-10">
          <div className="surface-card p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="serif-display text-lg">Score distribution</h2>
              <span className="text-[10px] font-mono text-ink-dim uppercase">
                {kpi.totalAnalyzed} callů
              </span>
            </div>
            <ScoreHistogram buckets={kpi.buckets} />
            <p className="text-ink-muted text-xs mt-3 leading-relaxed">
              {scoreNote}
            </p>
          </div>

          <div className="surface-card p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="serif-display text-lg">Monthly trend</h2>
              <span className="text-[10px] font-mono text-ink-dim uppercase">
                avg score + outcomes
              </span>
            </div>
            <MonthlyTrend months={kpi.months} />
            <p className="text-ink-muted text-xs mt-3 leading-relaxed">
              {trendNote}
            </p>
          </div>
        </section>

        {/* CLOSED + Open priority */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-10">
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="serif-display text-xl">CLOSED deals</h2>
              <span
                className="text-[10px] font-mono uppercase tracking-wider"
                style={{ color: "var(--closed)" }}
              >
                {closedCalls.length} total
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {closedCalls.map((c) => (
                <CallCard key={c.slug} call={c} />
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="serif-display text-xl">OPEN priority</h2>
              <span
                className="text-[10px] font-mono uppercase tracking-wider"
                style={{ color: "var(--open)" }}
              >
                {openCalls.length} aktivní
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {openCalls
                .sort((a, b) => (b.total ?? 0) - (a.total ?? 0))
                .map((c) => (
                  <CallCard key={c.slug} call={c} />
                ))}
            </div>
          </div>
        </section>

        {/* Recent activity */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="serif-display text-xl">Recent activity</h2>
            <Link
              href="/calls"
              className="text-xs font-mono uppercase tracking-wider text-ink-dim hover:text-ink-strong"
            >
              Všechny calls →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {recent.map((c) => (
              <CallCard key={c.slug} call={c} />
            ))}
          </div>
        </section>

        {/* CLOSER scoring legend — co se v každé sekci hodnotí */}
        <ClosersLegend />

        <footer
          className="text-center text-ink-dim text-xs font-mono py-8 border-t"
          style={{ borderColor: "var(--border-soft)" }}
        >
          Sales Coach v2 · read-only · {kpi.totalAnalyzed} analyzed · last sync{" "}
          {new Date().toISOString().split("T")[0]}
        </footer>
      </main>
    </>
  );
}
