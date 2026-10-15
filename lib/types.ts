/** Linie = podsložka v data/sales-coach/transcripts/ (např. „kosmetika", „b2b"). */
export type Linie = string;
export type Outcome =
  | "CLOSED"
  | "LOST"
  | "GHOST"
  | "ODLOZENO"
  | "OPEN"
  | "MOCK"
  | "unknown";

export type SectionKey =
  | "clarify"
  | "label"
  | "overview"
  | "sell"
  | "explain"
  | "reinforce"
  | "mechanika";

export interface ScoreSection {
  key: SectionKey;
  label: string;
  score: number | null;
  max: number;
}

export interface CSVRow {
  datum: string;
  prospect: string;
  linie: Linie;
  clarify: number | null;
  label: number | null;
  overview: number | null;
  sell: number | null;
  explain: number | null;
  reinforce: number | null;
  mechanika: number | null;
  total: number | null;
  outcome: Outcome;
  notes: string;
}

export interface DeepMoment {
  /** Title of the moment, e.g. "Generic Discovery Q" */
  title: string;
  /** Timestamp string if found ("02:30") */
  timestamp: string | null;
  /** Pre-rendered HTML for the moment body (everything below the H4). */
  html: string;
}

export interface DeepSection {
  key: SectionKey;
  /** Reasoning summary paragraph rendered as HTML, or null. */
  reasoningHtml: string | null;
  /** Per-moment rendered HTML blocks. */
  moments: DeepMoment[];
}

export interface CallSummary {
  slug: string;
  prospect: string;
  datum: string;
  linie: Linie;
  outcome: Outcome;
  total: number | null;
  tier: string | null;
  notes: string;
  hasMd: boolean;
  hasTxt: boolean;
  sections: ScoreSection[];
}

export interface CallDetail extends CallSummary {
  rawMarkdown: string;
  /** Full MD rendered to HTML — used when no deep analysis is available. */
  htmlMarkdown: string;
  transcript: string | null;
  /** Parsed deep analysis per section (forward-compatible). Empty array if MD has no deep format. */
  deepAnalysis: DeepSection[];
  /** True if at least one section in deepAnalysis has any data. */
  hasDeepAnalysis: boolean;
}

export type RoleplayLayer = "objection" | "archetype" | "prospect";

export interface RoleplaySummary {
  slug: string;
  date: string;
  /** Persona / prospect played by the AI, e.g. "Skeptická majitelka salonu (archetyp)" */
  persona: string;
  linie: Linie;
  /** objection drill / archetype / prospect simulation */
  layer: RoleplayLayer | string;
  /** Free text mode, e.g. "2. call simulace" */
  mode: string;
  /** What was drilled this session */
  trained: string[];
  total: number | null;
  tier: string | null;
  /** Role-play result: signed / no / partial */
  outcome: string;
  sections: ScoreSection[];
}

export interface RoleplayDetail extends RoleplaySummary {
  rawMarkdown: string;
  /** Body (below frontmatter) rendered to HTML. */
  htmlMarkdown: string;
}

export interface AntiPattern {
  id: string;
  title: string;
  /** Jednověta: co se v callu opakovaně dělo špatně */
  whatHappens: string;
  /** Proč to vadí — důsledek */
  why: string;
  /** Reálný citát z jednoho z callů */
  exampleQuote: string;
  /** Z kterého callu citát je */
  exampleFromSlug: string;
  /** Co měl říct místo toho (1-2 věty CZ) */
  fix: string;
  /** Calls kde se to opakovaně objevilo (slugs) */
  appearsInCalls: string[];
}

export interface MasterPattern {
  id: string;
  title: string;
  description: string;
  quote: string;
  trigger: string;
  crossLine: string;
  closedValidated: boolean;
  validatedBy: string[];
  usedInCalls: string[];
}

export const SECTION_MAX: Record<SectionKey, number> = {
  clarify: 10,
  label: 15,
  overview: 15,
  sell: 20,
  explain: 20,
  reinforce: 10,
  mechanika: 10,
};

export const SECTION_LABELS: Record<SectionKey, string> = {
  clarify: "Clarify",
  label: "Label",
  overview: "Overview",
  sell: "Sell",
  explain: "Explain",
  reinforce: "Reinforce",
  mechanika: "Mechanika",
};

export const SECTION_DESCRIPTIONS: Record<SectionKey, string> = {
  clarify: "Discovery & qualifying questions",
  label: "Voss labels & emotion mirroring",
  overview: "Past attempts dig + context mapping",
  sell: "Case studies + ROI math + value framing",
  explain: "Pricing reveal, objections, garance",
  reinforce: "Close commitment + next steps + fakturace",
  mechanika: "Talk ratio, monolog length, otevřené Q",
};

export const SECTION_ORDER: SectionKey[] = [
  "clarify",
  "label",
  "overview",
  "sell",
  "explain",
  "reinforce",
  "mechanika",
];
