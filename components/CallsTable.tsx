"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CallSummary, Linie, Outcome } from "@/lib/types";
import { OutcomeBadge } from "./OutcomeBadge";
import { LinieBadge, TierBadge } from "./TierBadge";
import { linieLabel } from "@/lib/config";

type SortKey = "total" | "datum" | "prospect" | "linie";

export function CallsTable({ calls }: { calls: CallSummary[] }) {
  const [linie, setLinie] = useState<Linie | "all">("all");
  const [outcome, setOutcome] = useState<Outcome | "all">("all");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("datum");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return calls
      .filter((c) => (linie === "all" ? true : c.linie === linie))
      .filter((c) => (outcome === "all" ? true : c.outcome === outcome))
      .filter((c) =>
        !s
          ? true
          : c.prospect.toLowerCase().includes(s) ||
            c.notes.toLowerCase().includes(s) ||
            c.slug.toLowerCase().includes(s)
      )
      .sort((a, b) => {
        const mul = sortDir === "asc" ? 1 : -1;
        if (sortKey === "total") {
          const av = a.total ?? -1;
          const bv = b.total ?? -1;
          return (av - bv) * mul;
        }
        if (sortKey === "datum") {
          return (a.datum || "").localeCompare(b.datum || "") * mul;
        }
        if (sortKey === "linie") {
          return a.linie.localeCompare(b.linie) * mul;
        }
        return a.prospect.localeCompare(b.prospect) * mul;
      });
  }, [calls, linie, outcome, search, sortKey, sortDir]);

  function toggleSort(k: SortKey) {
    if (sortKey === k) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(k);
      setSortDir(k === "prospect" || k === "linie" ? "asc" : "desc");
    }
  }

  const inputCls =
    "w-full px-3 py-2 rounded-md bg-surface border border-soft focus:border-[var(--brand)] focus:outline-none text-ink placeholder:text-ink-faint text-sm";

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end gap-3 mb-5">
        <div className="flex-1">
          <label className="block text-[10px] font-mono uppercase tracking-wider text-ink-dim mb-1.5">
            Hledat
          </label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Prospect, notes, slug…"
            className={inputCls}
            style={{ borderColor: "var(--border-soft)" }}
          />
        </div>
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-wider text-ink-dim mb-1.5">
            Linie
          </label>
          <select
            value={linie}
            onChange={(e) => setLinie(e.target.value as Linie | "all")}
            className={inputCls}
            style={{ borderColor: "var(--border-soft)" }}
          >
            <option value="all">vše</option>
            {Array.from(new Set(calls.map((c) => c.linie)))
              .sort()
              .map((l) => (
                <option key={l} value={l}>
                  {linieLabel(l)}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-wider text-ink-dim mb-1.5">
            Outcome
          </label>
          <select
            value={outcome}
            onChange={(e) => setOutcome(e.target.value as Outcome | "all")}
            className={inputCls}
            style={{ borderColor: "var(--border-soft)" }}
          >
            <option value="all">vše</option>
            <option value="CLOSED">CLOSED</option>
            <option value="OPEN">OPEN</option>
            <option value="LOST">LOST</option>
            <option value="GHOST">GHOST</option>
            <option value="ODLOZENO">ODLOZENO</option>
            <option value="unknown">unknown</option>
          </select>
        </div>
      </div>

      <div className="text-xs text-ink-dim font-mono mb-2 px-1">
        {filtered.length} z {calls.length} callů
      </div>

      <div className="hidden md:block surface-card overflow-hidden">
        <table className="w-full text-sm">
          <thead
            className="border-b"
            style={{
              background: "var(--surface-muted)",
              borderColor: "var(--border-soft)",
            }}
          >
            <tr className="text-left text-[10px] font-mono uppercase tracking-wider text-ink-dim">
              <SortableTh
                label="Datum"
                active={sortKey === "datum"}
                dir={sortDir}
                onClick={() => toggleSort("datum")}
              />
              <SortableTh
                label="Prospect"
                active={sortKey === "prospect"}
                dir={sortDir}
                onClick={() => toggleSort("prospect")}
              />
              <SortableTh
                label="Linie"
                active={sortKey === "linie"}
                dir={sortDir}
                onClick={() => toggleSort("linie")}
              />
              <SortableTh
                label="Skóre"
                active={sortKey === "total"}
                dir={sortDir}
                onClick={() => toggleSort("total")}
                align="right"
              />
              <th className="px-3 py-2.5">Tier</th>
              <th className="px-3 py-2.5">Outcome</th>
              <th className="px-3 py-2.5">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.slug}
                className="border-b last:border-b-0 hover:bg-[var(--surface-muted)] transition-colors"
                style={{ borderColor: "var(--border-soft)" }}
              >
                <td className="px-3 py-2.5 font-mono text-xs text-ink-dim whitespace-nowrap">
                  <Link
                    href={`/calls/${c.slug}`}
                    className="hover:text-ink block"
                  >
                    {c.datum || "—"}
                  </Link>
                </td>
                <td className="px-3 py-2.5">
                  <Link
                    href={`/calls/${c.slug}`}
                    className="text-ink-strong hover:text-[var(--brand)] font-medium"
                  >
                    {c.prospect}
                  </Link>
                </td>
                <td className="px-3 py-2.5">
                  <LinieBadge linie={c.linie} />
                </td>
                <td className="px-3 py-2.5 text-right font-mono tabular-nums">
                  <ScoreCell score={c.total} />
                </td>
                <td className="px-3 py-2.5">
                  <TierBadge tier={c.tier} />
                </td>
                <td className="px-3 py-2.5">
                  <OutcomeBadge outcome={c.outcome} />
                </td>
                <td className="px-3 py-2.5 text-xs text-ink-muted max-w-md truncate">
                  {c.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-2.5">
        {filtered.map((c) => (
          <Link
            key={c.slug}
            href={`/calls/${c.slug}`}
            className="surface-card surface-card-hover p-4 block"
          >
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <div className="min-w-0">
                <div className="text-ink-strong font-medium truncate">
                  {c.prospect}
                </div>
                <div className="text-ink-dim text-xs font-mono mt-0.5">
                  {c.datum || "—"}
                </div>
              </div>
              <ScoreCell score={c.total} />
            </div>
            <div className="flex items-center gap-2 flex-wrap mt-2">
              <LinieBadge linie={c.linie} />
              <OutcomeBadge outcome={c.outcome} />
              <TierBadge tier={c.tier} />
            </div>
            {c.notes && (
              <p className="text-ink-muted text-xs mt-2 line-clamp-2 leading-snug">
                {c.notes}
              </p>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}

function SortableTh({
  label,
  active,
  dir,
  onClick,
  align,
}: {
  label: string;
  active: boolean;
  dir: "asc" | "desc";
  onClick: () => void;
  align?: "right";
}) {
  return (
    <th
      onClick={onClick}
      className={`px-3 py-2.5 cursor-pointer select-none hover:text-ink-strong ${
        align === "right" ? "text-right" : ""
      }`}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {active && (
          <span style={{ color: "var(--brand)" }}>
            {dir === "asc" ? "↑" : "↓"}
          </span>
        )}
      </span>
    </th>
  );
}

function ScoreCell({ score }: { score: number | null }) {
  if (score === null) return <span className="text-ink-dim">—</span>;
  let color = "var(--lost)";
  if (score >= 60) color = "var(--closed)";
  else if (score >= 45) color = "var(--odlozeno)";
  return (
    <span style={{ color }} className="font-semibold">
      {score}
    </span>
  );
}
