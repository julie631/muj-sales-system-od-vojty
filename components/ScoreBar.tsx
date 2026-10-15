export function ScoreBar({
  score,
  max,
  showLabel = true,
}: {
  score: number | null;
  max: number;
  showLabel?: boolean;
}) {
  if (score === null) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 score-track h-1.5" />
        {showLabel && (
          <span className="text-[11px] font-mono text-ink-dim w-12 text-right">
            n/a
          </span>
        )}
      </div>
    );
  }
  const pct = max ? Math.max(0, Math.min(100, (score / max) * 100)) : 0;
  let color = "var(--lost)";
  if (pct >= 70) color = "var(--closed)";
  else if (pct >= 50) color = "var(--odlozeno)";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 score-track h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      {showLabel && (
        <span
          className="text-[11px] font-mono w-12 text-right tabular-nums"
          style={{ color }}
        >
          {score}/{max}
        </span>
      )}
    </div>
  );
}

export function ScoreCircle({ score }: { score: number | null }) {
  if (score === null) {
    return (
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-ink-dim text-xs font-mono"
        style={{ border: "1px solid var(--border-mid)" }}
      >
        n/a
      </div>
    );
  }
  let color = "var(--lost)";
  if (score >= 60) color = "var(--closed)";
  else if (score >= 45) color = "var(--odlozeno)";
  const pct = Math.max(0, Math.min(100, score));
  return (
    <div
      className="relative w-16 h-16 rounded-full flex items-center justify-center"
      style={{
        background: `conic-gradient(${color} ${pct}%, var(--surface-muted) ${pct}%)`,
      }}
    >
      <div
        className="absolute inset-1 rounded-full flex items-center justify-center"
        style={{ background: "var(--surface)" }}
      >
        <span
          className="font-serif tabular-nums font-medium text-lg"
          style={{ color }}
        >
          {score}
        </span>
      </div>
    </div>
  );
}
