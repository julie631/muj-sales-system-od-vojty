import { Outcome } from "@/lib/types";

const STYLES: Record<Outcome, { bg: string; color: string; label: string }> = {
  CLOSED: { bg: "var(--closed-tint)", color: "var(--closed)", label: "CLOSED" },
  LOST: { bg: "var(--lost-tint)", color: "var(--lost)", label: "LOST" },
  GHOST: { bg: "var(--ghost-tint)", color: "var(--ghost)", label: "GHOST" },
  ODLOZENO: {
    bg: "var(--odlozeno-tint)",
    color: "var(--odlozeno)",
    label: "ODLOZENO",
  },
  OPEN: { bg: "var(--open-tint)", color: "var(--open)", label: "OPEN" },
  MOCK: { bg: "var(--mock-tint)", color: "var(--mock)", label: "MOCK" },
  unknown: {
    bg: "var(--surface-muted)",
    color: "var(--ink-dim)",
    label: "unknown",
  },
};

export function OutcomeBadge({
  outcome,
  size = "sm",
}: {
  outcome: Outcome;
  size?: "sm" | "md";
}) {
  const s = STYLES[outcome] || STYLES.unknown;
  const padding =
    size === "md" ? "px-2.5 py-1 text-[11px]" : "px-2 py-0.5 text-[10px]";
  return (
    <span
      className={`inline-flex items-center font-mono uppercase tracking-wider rounded-md font-medium ${padding}`}
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  );
}
