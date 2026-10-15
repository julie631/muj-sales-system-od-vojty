import { linieLabel } from "@/lib/config";

export function TierBadge({ tier }: { tier: string | null }) {
  if (!tier) return null;
  const num = (tier.match(/\d/) || ["3"])[0];
  let color = "#737373";
  if (num === "5") color = "#7c3aed";
  else if (num === "4") color = "#0284c7";
  else if (num === "3") color = "#16a34a";
  else if (num === "2") color = "#b45309";
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-md"
      style={{
        background: "var(--surface-muted)",
        border: `1px solid ${color}33`,
        color,
      }}
    >
      {tier}
    </span>
  );
}

// Barva linie se odvodí z jejího názvu, takže je u stejné linie vždy stejná.
const LINIE_COLORS = [
  { bg: "var(--brand-tint)", color: "var(--brand-dark)" },
  { bg: "var(--closed-tint)", color: "var(--closed)" },
  { bg: "var(--odlozeno-tint)", color: "var(--odlozeno)" },
  { bg: "var(--mock-tint)", color: "var(--mock)" },
];

export function linieColor(linie: string) {
  let h = 0;
  for (const ch of linie) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return LINIE_COLORS[h % LINIE_COLORS.length];
}

export function LinieBadge({ linie }: { linie: string }) {
  const c = linieColor(linie);
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-md"
      style={{ background: c.bg, color: c.color }}
    >
      {linieLabel(linie)}
    </span>
  );
}
