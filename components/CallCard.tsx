import Link from "next/link";
import { CallSummary } from "@/lib/types";
import { OutcomeBadge } from "./OutcomeBadge";
import { LinieBadge, TierBadge } from "./TierBadge";

export function CallCard({ call }: { call: CallSummary }) {
  let scoreColor = "var(--ink-dim)";
  if (call.total !== null) {
    if (call.total >= 60) scoreColor = "var(--closed)";
    else if (call.total >= 45) scoreColor = "var(--odlozeno)";
    else scoreColor = "var(--lost)";
  }
  return (
    <Link
      href={`/calls/${call.slug}`}
      className="surface-card surface-card-hover p-4 sm:p-5 flex items-start gap-4 block no-underline"
    >
      <div className="flex flex-col items-center gap-1 shrink-0 w-14">
        <div
          className="font-serif text-3xl font-medium tabular-nums leading-none"
          style={{ color: scoreColor }}
        >
          {call.total ?? "—"}
        </div>
        <div className="text-[10px] font-mono text-ink-dim uppercase">
          / 100
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1.5">
          <LinieBadge linie={call.linie} />
          <OutcomeBadge outcome={call.outcome} />
          <TierBadge tier={call.tier} />
        </div>
        <h3 className="text-ink-strong font-medium truncate text-base">
          {call.prospect}
        </h3>
        <p className="text-ink-dim text-xs font-mono mt-0.5">
          {call.datum || "—"}
        </p>
        {call.notes && (
          <p className="text-ink-muted text-sm mt-2 line-clamp-2 leading-snug">
            {call.notes}
          </p>
        )}
      </div>
    </Link>
  );
}
