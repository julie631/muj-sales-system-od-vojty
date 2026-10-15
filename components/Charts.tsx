"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AXIS_COLOR = "#8b8780";
const GRID_COLOR = "#ececea";
const BRAND = "#398FFF";
const CLOSED = "#16a34a";

type TooltipPayloadItem = {
  name?: string;
  value?: number | string | null;
  color?: string;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
};

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      className="rounded-md px-3 py-2 text-xs font-mono shadow-lg"
      style={{
        background: "#ffffff",
        border: "1px solid var(--border-mid)",
        color: "var(--ink-strong)",
      }}
    >
      <div className="mb-1" style={{ color: "var(--ink-strong)" }}>
        {String(label)}
      </div>
      {payload.map((p, i) => (
        <div
          key={i}
          style={{ color: p.color }}
          className="flex justify-between gap-3"
        >
          <span>{p.name}:</span>
          <span>
            {p.value === null || p.value === undefined ? "—" : p.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ScoreHistogram({
  buckets,
}: {
  buckets: { label: string; count: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={buckets}
        margin={{ top: 10, right: 8, left: -16, bottom: 4 }}
      >
        <CartesianGrid stroke={GRID_COLOR} vertical={false} />
        <XAxis dataKey="label" stroke={AXIS_COLOR} tick={{ fontSize: 11 }} />
        <YAxis
          stroke={AXIS_COLOR}
          tick={{ fontSize: 11 }}
          allowDecimals={false}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: "rgba(57,143,255,0.06)" }}
        />
        <Bar dataKey="count" fill={BRAND} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MonthlyTrend({
  months,
}: {
  months: { month: string; calls: number; closed: number; avgScore: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart
        data={months}
        margin={{ top: 10, right: 8, left: -10, bottom: 4 }}
      >
        <CartesianGrid stroke={GRID_COLOR} vertical={false} />
        <XAxis dataKey="month" stroke={AXIS_COLOR} tick={{ fontSize: 10 }} />
        <YAxis
          yAxisId="left"
          stroke={AXIS_COLOR}
          tick={{ fontSize: 10 }}
          domain={[0, 80]}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke={AXIS_COLOR}
          tick={{ fontSize: 10 }}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Line
          yAxisId="left"
          dataKey="avgScore"
          name="Avg score"
          stroke={BRAND}
          strokeWidth={2}
          dot={{ r: 3 }}
        />
        <Line
          yAxisId="right"
          dataKey="closed"
          name="Closed"
          stroke={CLOSED}
          strokeWidth={2}
          dot={{ r: 3 }}
        />
        <Line
          yAxisId="right"
          dataKey="calls"
          name="Calls"
          stroke="#8b8780"
          strokeWidth={1.5}
          strokeDasharray="3 3"
          dot={{ r: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SectionTrendChart({
  data,
  section,
  max,
}: {
  data: Record<string, number | null | string>[];
  section: string;
  max: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart
        data={data}
        margin={{ top: 4, right: 8, left: -16, bottom: 4 }}
      >
        <CartesianGrid stroke={GRID_COLOR} vertical={false} />
        <XAxis dataKey="datum" stroke={AXIS_COLOR} tick={{ fontSize: 9 }} />
        <YAxis
          stroke={AXIS_COLOR}
          tick={{ fontSize: 10 }}
          domain={[0, max]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          dataKey={section}
          stroke={BRAND}
          strokeWidth={2}
          dot={{ r: 2.5 }}
          connectNulls
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
