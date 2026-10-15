import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import {
  AntiPattern,
  CSVRow,
  CallDetail,
  CallSummary,
  DeepMoment,
  DeepSection,
  Linie,
  MasterPattern,
  Outcome,
  RoleplayDetail,
  RoleplaySummary,
  ScoreSection,
  SECTION_LABELS,
  SECTION_MAX,
  SECTION_ORDER,
  SectionKey,
} from "./types";

// Pracovní složka se všemi daty. Jde přesměrovat proměnnou SALES_COACH_ROOT.
const SALES_COACH_ROOT =
  process.env.SALES_COACH_ROOT ||
  path.join(process.cwd(), "data", "sales-coach");

const CSV_PATH = path.join(SALES_COACH_ROOT, "progress/skill-scores.csv");
const TRANSCRIPTS_DIR = path.join(SALES_COACH_ROOT, "transcripts");
const ROLEPLAYS_DIR = path.join(SALES_COACH_ROOT, "roleplays");
const PATTERNS_DIR = path.join(SALES_COACH_ROOT, "patterns");

function safeRead(p: string): string | null {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return null;
  }
}

function safeReadDir(p: string): string[] {
  try {
    return fs.readdirSync(p);
  } catch {
    return [];
  }
}

function parseNum(v: unknown): number | null {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  if (!s || s === "n/a" || s === "N/A" || s === "-") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function normalizeOutcome(raw: string): Outcome {
  const s = (raw || "").trim();
  const up = s.toUpperCase();
  if (up.includes("CLOSED")) return "CLOSED";
  if (up.includes("LOST")) return "LOST";
  if (up.includes("GHOST")) return "GHOST";
  if (up.includes("ODLOZENO")) return "ODLOZENO";
  if (up.includes("OPEN")) return "OPEN";
  if (up.includes("MOCK")) return "MOCK";
  if (!s || s === "unknown" || s === "open") {
    if (s === "open") return "OPEN";
    if (!s) return "unknown";
    return "unknown";
  }
  return "unknown";
}

function normalizeLinie(raw: string): Linie {
  return (raw || "").toLowerCase().trim();
}

/** Linie = podsložky (bez těch, co začínají „_" nebo „."), abecedně. */
function discoverLinie(dir: string): Linie[] {
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !/^[_.]/.test(d.name))
      .map((d) => d.name)
      .sort();
  } catch {
    return [];
  }
}

/** Všechny linie, které se v datech vyskytují (hovory i roleplaye). */
export function getAllLinie(): Linie[] {
  return Array.from(
    new Set([...discoverLinie(TRANSCRIPTS_DIR), ...discoverLinie(ROLEPLAYS_DIR)])
  ).sort();
}

function renderMd(md: string): string {
  return remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .processSync(md)
    .toString();
}

/**
 * Strip H2 sections from the MD that are already rendered in the page
 * elsewhere (header badges, scorecard overview, accordion).
 * Removes from `^## {Section title}` (case-insensitive prefix match)
 * up to (but not including) the next `^## ` line.
 *
 * The dedicated UI surfaces these as:
 * - Metadata → header badges + dates + tier
 * - Scorecard přehled → scorecard quick overview line
 * - Deep analysis per sekce → accordion (ClosersSectionAccordion)
 */
function stripDuplicatedSectionsFromMd(md: string): string {
  const titlesToStrip = [
    "metadata",
    "scorecard přehled",
    "deep analysis per sekce",
  ];
  const lines = md.split(/\r?\n/);
  const out: string[] = [];
  let skipping = false;

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    if (h2) {
      const title = h2[1].toLowerCase().trim();
      // Reset skipping for every new H2
      skipping = titlesToStrip.some((t) => title.startsWith(t));
      if (skipping) continue;
    }
    if (skipping) continue;
    out.push(line);
  }

  // Collapse leading blank lines + standalone horizontal rules
  return out.join("\n").replace(/^\s*(?:---\s*\n)+/g, "").trimStart();
}

/* CSV ------------------------------------------------------------------ */

let _csvCache: CSVRow[] | null = null;

export function getCsvRows(): CSVRow[] {
  if (_csvCache) return _csvCache;
  const raw = safeRead(CSV_PATH) || "";
  const parsed = Papa.parse<Record<string, string>>(raw, {
    header: true,
    skipEmptyLines: true,
  });
  const rows: CSVRow[] = [];
  for (const r of parsed.data) {
    if (!r || !r.prospect) continue;
    rows.push({
      datum: r.datum || "",
      prospect: r.prospect || "",
      linie: normalizeLinie(r.linie || ""),
      clarify: parseNum(r.clarify),
      label: parseNum(r.label),
      overview: parseNum(r.overview),
      sell: parseNum(r.sell),
      explain: parseNum(r.explain),
      reinforce: parseNum(r.reinforce),
      mechanika: parseNum(r.mechanika),
      total: parseNum(r.total),
      outcome: normalizeOutcome(r.outcome || ""),
      notes: r.notes || "",
    });
  }
  _csvCache = rows;
  return rows;
}

/* MD per-call ---------------------------------------------------------- */

function parseFilename(fn: string): {
  slug: string;
  datum: string;
  outcomeHint: Outcome | null;
} {
  const base = fn.replace(/\.md$/, "");
  const slug = base;
  let outcomeHint: Outcome | null = null;
  if (/_CLOSED$/i.test(base)) outcomeHint = "CLOSED";
  else if (/_LOST$/i.test(base)) outcomeHint = "LOST";
  else if (/_GHOST$/i.test(base)) outcomeHint = "GHOST";
  else if (/_ODLOZENO$/i.test(base)) outcomeHint = "ODLOZENO";
  else if (/_OPEN$/i.test(base)) outcomeHint = "OPEN";

  const dateMatch = base.match(/^(\d{4}-\d{2}-\d{2}|\d{4}-XX|2025-XX|2026-XX)/);
  const datum = dateMatch ? dateMatch[1] : "";
  return { slug, datum, outcomeHint };
}

function extractTierFromMd(md: string): string | null {
  // Look for "Tier 4 (mid)" or "Tier 3 (high) / 4 (low)" patterns
  const m = md.match(/Tier\s+(\d+(?:\+|\s*\([\w\-\s]+\))?(?:\s*\/\s*\d+\s*\([\w\-\s]+\))?)/i);
  if (m) return `Tier ${m[1]}`;
  return null;
}

function extractScoreFromMd(md: string): number | null {
  // Try lots of patterns: "**73/100**", "60/100", "— 64/100", etc.
  const patterns = [
    /(\d{2,3})\s*\/\s*100/,
    /CLOSER\s+(?:scorecard\s*:?\s*)?(\d{2,3})/i,
  ];
  for (const p of patterns) {
    const m = md.match(p);
    if (m) {
      const n = Number(m[1]);
      if (Number.isFinite(n) && n >= 0 && n <= 100) return n;
    }
  }
  return null;
}

function extractSectionsFromMd(md: string): ScoreSection[] | null {
  // Look for table rows like: | Clarify | 8/10 | comment |
  const sections: ScoreSection[] = [];
  for (const key of SECTION_ORDER) {
    const label = SECTION_LABELS[key];
    const max = SECTION_MAX[key];
    const re = new RegExp(
      `\\|\\s*${label}\\s*\\|\\s*(\\d+|n\\/a|N\\/A)\\s*\\/\\s*\\d+`,
      "i"
    );
    const m = md.match(re);
    let score: number | null = null;
    if (m) {
      if (m[1].toLowerCase() === "n/a") score = null;
      else {
        const n = Number(m[1]);
        if (Number.isFinite(n)) score = n;
      }
    }
    sections.push({ key, label, score, max });
  }
  if (sections.every((s) => s.score === null)) return null;
  return sections;
}

function extractProspectFromMd(md: string, fallback: string): string {
  // Convention: `# {Prospect Name} — {Linie} — {Outcome}` — strip
  // everything after the first em-/en-dash so the badge area on the
  // call page shows only the name. (Linie + outcome are already badges.)
  const headerMatch = md.match(/^#\s+([^\n]+)/m);
  if (headerMatch) {
    const raw = headerMatch[1];
    const split = raw.split(/\s+[—–]\s+/);
    return (split[0] || raw).trim();
  }
  const h2Match = md.match(/^##\s+([^\n]+)/m);
  if (h2Match) {
    const text = h2Match[1];
    const parts = text.split(/—|–|\s-\s/);
    if (parts.length > 1) {
      return parts.slice(1).join(" - ").trim();
    }
    return text.trim();
  }
  return fallback;
}

/* --- find CSV match for an MD file --- */
// Words that appear in too many prospect names to be discriminating
// (would cause false-positives in fuzzy slug matching).
const NAME_STOPWORDS = new Set([
  "studio",
  "salon",
  "shop",
  "group",
  "the",
]);

function stripDiacritics(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function tokenizeProspect(prospect: string): string[] {
  // Strip diacritics so "Tichý" → "tichy" matches the ASCII-ified slug.
  return stripDiacritics(prospect.toLowerCase())
    .split(/[\s()\/,]+/)
    .map((t) => t.replace(/[^a-z0-9]/gi, ""))
    .filter((t) => t.length >= 4 && !NAME_STOPWORDS.has(t));
}

function findCsvMatch(
  rows: CSVRow[],
  linie: Linie,
  slug: string,
  prospect: string
): CSVRow | null {
  const slugLower = slug.toLowerCase();
  const prospectLower = prospect.toLowerCase();

  // 1) Date match has highest priority — slugs typically start with
  //    YYYY-MM-DD and the CSV date is the most unambiguous discriminator.
  //    When multiple CSV rows share the same date (e.g. 2 calls in one
  //    day), tie-break by checking whether the slug contains a token
  //    from the prospect's name.
  const slugAscii = stripDiacritics(slugLower);
  const dateMatch = slug.match(/(\d{4}-\d{2}-\d{2})/);
  if (dateMatch) {
    const d = dateMatch[1];
    const dateMatches = rows.filter(
      (r) => r.linie === linie && r.datum === d
    );
    if (dateMatches.length === 1) {
      // Single row on this date+linie. Only trust it if the name doesn't
      // clearly contradict the slug (avoid an untracked MD that shares a
      // date stealing another prospect's row).
      const tokens = tokenizeProspect(dateMatches[0].prospect);
      if (tokens.length === 0 || tokens.some((tok) => slugAscii.includes(tok))) {
        return dateMatches[0];
      }
      // name contradicts → fall through to fuzzy name match below
    } else if (dateMatches.length > 1) {
      // Tie-break: ONLY return a row whose prospect tokens appear in slug.
      // Never blindly return dateMatches[0] — that caused Tichý (same date
      // as Artur) to inherit Artur's identity.
      for (const r of dateMatches) {
        const tokens = tokenizeProspect(r.prospect);
        if (tokens.some((tok) => slugAscii.includes(tok))) return r;
      }
      return null;
    }
  }

  // 2) Fuzzy name match — only use discriminating tokens (skip common
  //    words like "studio"/"shop"/"the" that match across many rows).
  for (const r of rows) {
    if (r.linie !== linie) continue;
    const rp = r.prospect.toLowerCase();
    if (!rp) continue;
    const tokens = tokenizeProspect(r.prospect);
    if (tokens.length === 0) continue;
    if (tokens.some((tok) => slugAscii.includes(tok))) return r;
    if (
      prospectLower &&
      rp.includes(prospectLower.split(" ")[0]) &&
      prospectLower.split(" ")[0].length >= 4 &&
      !NAME_STOPWORDS.has(prospectLower.split(" ")[0])
    ) {
      return r;
    }
  }
  return null;
}

/* --- DEEP ANALYSIS PARSING (forward-compatible) ----------------------- */

/**
 * Detect heading lines and return the section key if it looks like an H3
 * for a CLOSER section, e.g. `### Clarify — 8/10` or `### Clarify – 8/10`.
 */
function matchDeepSectionHeader(line: string): SectionKey | null {
  const m = line.match(/^###\s+([A-Za-zŠČŘŽŤŇŮÚáčďéěíňóřšťúůýž]+)/);
  if (!m) return null;
  const word = m[1].toLowerCase();
  for (const key of SECTION_ORDER) {
    const label = SECTION_LABELS[key].toLowerCase();
    if (word === label || word.startsWith(label)) return key;
  }
  return null;
}

/**
 * Parse a moment H4 like `#### Moment 1: [02:30] Generic Discovery Q`.
 * Returns { title, timestamp } or null if not a moment heading.
 */
function matchMomentHeader(
  line: string
): { title: string; timestamp: string | null } | null {
  const h4 = line.match(/^####\s+(.+)$/);
  if (!h4) return null;
  let rest = h4[1].trim();
  // strip leading "Moment N:" or "Moment N -"
  rest = rest.replace(/^Moment\s+\d+\s*[:–—-]\s*/i, "");
  let timestamp: string | null = null;
  // „[04:12]" nebo rozsah „[14:00–16:40]" (bere se začátek)
  const tsMatch = rest.match(/\[(\d{1,2}:\d{2}(?::\d{2})?)(?:\s*[–-]\s*\d{1,2}:\d{2}(?::\d{2})?)?\]/);
  if (tsMatch) {
    timestamp = tsMatch[1];
    rest = rest.replace(tsMatch[0], "").trim();
  }
  rest = rest.replace(/^[:–—-]\s*/, "").trim();
  return { title: rest || "Moment", timestamp };
}

/**
 * Extract per-section deep analysis (H3 `### Clarify — X/10` + H4 moments).
 *
 * Returns one DeepSection per CLOSER section that has data in the MD.
 * Forward-compatible: returns [] if MD has no `### Clarify` header at all.
 */
function extractDeepAnalysis(md: string): DeepSection[] {
  const lines = md.split(/\r?\n/);

  type RawSection = {
    key: SectionKey;
    reasoningLines: string[];
    moments: { title: string; timestamp: string | null; lines: string[] }[];
    headerLine: string;
  };
  const sections: RawSection[] = [];
  let current: RawSection | null = null;
  // mode = "reasoning" → lines go into section reasoning
  // mode = "moment"    → lines go into current moment
  let mode: "reasoning" | "moment" = "reasoning";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Stop accumulating once we hit the trailing aggregate sections
    // (### Top 3 wins / misses / Wins / Misses / GOLD / Cvičení etc).
    // These are also H3 but not CLOSER section names — they're handled by
    // the existing fallback rendering.
    const sectionKey = matchDeepSectionHeader(line);
    if (sectionKey) {
      current = {
        key: sectionKey,
        reasoningLines: [],
        moments: [],
        headerLine: line,
      };
      sections.push(current);
      mode = "reasoning";
      continue;
    }

    // Any other H3 ends the current deep-section context
    if (/^###\s+/.test(line)) {
      current = null;
      mode = "reasoning";
      continue;
    }

    // H2 also resets context (e.g. "## Top 3 wins")
    if (/^##\s+/.test(line)) {
      current = null;
      mode = "reasoning";
      continue;
    }

    if (!current) continue;

    // Moment header
    const momentHeader = matchMomentHeader(line);
    if (momentHeader) {
      current.moments.push({
        title: momentHeader.title,
        timestamp: momentHeader.timestamp,
        lines: [],
      });
      mode = "moment";
      continue;
    }

    if (mode === "reasoning") {
      current.reasoningLines.push(line);
    } else {
      const last = current.moments[current.moments.length - 1];
      if (last) last.lines.push(line);
    }
  }

  if (sections.length === 0) return [];

  // Render each section / moment to HTML
  const out: DeepSection[] = sections.map((s) => {
    const reasoningText = s.reasoningLines.join("\n").trim();
    // Strip a leading "**Reasoning:**" or "**Reasoning** —" prefix so we
    // don't render it twice (we already label the block in the UI).
    const cleanedReasoning = reasoningText
      .replace(/^\s*\*\*Reasoning:?\*\*\s*/i, "")
      .trim();
    const reasoningHtml = cleanedReasoning ? renderMd(cleanedReasoning) : null;

    const moments: DeepMoment[] = s.moments.map((m) => {
      const body = m.lines.join("\n").trim();
      const html = renderMd(body || "");
      return {
        title: m.title,
        timestamp: m.timestamp,
        html,
      };
    });
    return {
      key: s.key,
      reasoningHtml,
      moments,
    };
  });

  // Filter out any sections that are empty
  return out.filter(
    (s) => s.reasoningHtml || s.moments.length > 0
  );
}

let _callsCache: CallSummary[] | null = null;

export function getAllCalls(): CallSummary[] {
  if (_callsCache) return _callsCache;
  const rows = getCsvRows();
  const calls: CallSummary[] = [];
  for (const linie of discoverLinie(TRANSCRIPTS_DIR)) {
    const dir = path.join(TRANSCRIPTS_DIR, linie);
    const files = safeReadDir(dir).filter((f) => f.endsWith(".md"));
    for (const f of files) {
      const fullPath = path.join(dir, f);
      const md = safeRead(fullPath) || "";
      const { slug, datum, outcomeHint } = parseFilename(f);
      const prospect = extractProspectFromMd(md, slug);
      const csvMatch = findCsvMatch(rows, linie, slug, prospect);

      const mdScore = extractScoreFromMd(md);
      const csvScore = csvMatch?.total ?? null;
      const total = mdScore ?? csvScore;

      const mdSections = extractSectionsFromMd(md);
      let sections: ScoreSection[];
      if (mdSections) {
        sections = mdSections;
      } else {
        sections = [
          { key: "clarify", label: "Clarify", score: csvMatch?.clarify ?? null, max: 10 },
          { key: "label", label: "Label", score: csvMatch?.label ?? null, max: 15 },
          { key: "overview", label: "Overview", score: csvMatch?.overview ?? null, max: 15 },
          { key: "sell", label: "Sell", score: csvMatch?.sell ?? null, max: 20 },
          { key: "explain", label: "Explain", score: csvMatch?.explain ?? null, max: 20 },
          { key: "reinforce", label: "Reinforce", score: csvMatch?.reinforce ?? null, max: 10 },
          { key: "mechanika", label: "Mechanika", score: csvMatch?.mechanika ?? null, max: 10 },
        ];
      }

      const csvDatum = csvMatch?.datum || datum;
      const outcome: Outcome =
        outcomeHint ||
        csvMatch?.outcome ||
        "unknown";

      const txtPath = fullPath.replace(/\.md$/, ".txt");
      const hasTxt = fs.existsSync(txtPath);

      calls.push({
        slug,
        prospect: csvMatch?.prospect || prospect,
        datum: csvDatum,
        linie,
        outcome,
        total,
        tier: extractTierFromMd(md),
        notes: csvMatch?.notes || "",
        hasMd: true,
        hasTxt,
        sections,
      });
    }
  }
  calls.sort((a, b) => {
    if (!a.datum && !b.datum) return 0;
    if (!a.datum) return 1;
    if (!b.datum) return -1;
    return b.datum.localeCompare(a.datum);
  });
  _callsCache = calls;
  return calls;
}

export function getCallBySlug(slug: string): CallDetail | null {
  const calls = getAllCalls();
  const summary = calls.find((c) => c.slug === slug);
  if (!summary) return null;
  const fullPath = path.join(TRANSCRIPTS_DIR, summary.linie, `${slug}.md`);
  const md = safeRead(fullPath) || "";
  const txtPath = fullPath.replace(/\.md$/, ".txt");
  const transcript = safeRead(txtPath);

  // For "Plná analýza" we strip sections already rendered elsewhere
  // (header, scorecard quick line, accordion) — keeps only wins/misses/
  // GOLD insight / CZ fráze / Cvičení.
  const mdForFullView = stripDuplicatedSectionsFromMd(md);
  const html = renderMd(mdForFullView);
  const deepAnalysis = extractDeepAnalysis(md);
  const hasDeepAnalysis = deepAnalysis.some(
    (s) => s.moments.length > 0 || s.reasoningHtml
  );

  return {
    ...summary,
    rawMarkdown: md,
    htmlMarkdown: html,
    transcript,
    deepAnalysis,
    hasDeepAnalysis,
  };
}

/* VZORCE -------------------------------------------------------------- */
/* Dobré a špatné vzorce se čtou z data/sales-coach/patterns/master.json
 * a anti.json. Plní je Claude při rozboru hovorů (viz CLAUDE.md), nebo ručně. */

function readJsonArray<T>(file: string): T[] {
  const raw = safeRead(path.join(PATTERNS_DIR, file));
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

let _patternsCache: MasterPattern[] | null = null;

export function getMasterPatterns(): MasterPattern[] {
  if (_patternsCache) return _patternsCache;
  // Hovory se ke vzorci přiřazují jen výslovně (usedInCalls) — zmínka názvu v rozboru
  // ještě neznamená, že vzorec v hovoru zazněl (může tam být jako „chyběl").
  const allSlugs = new Set(getAllCalls().map((c) => c.slug));
  const patterns = readJsonArray<MasterPattern>("master.json").map((p) => ({
    ...p,
    validatedBy: p.validatedBy || [],
    usedInCalls: (p.usedInCalls || []).filter((x) => allSlugs.has(x)),
  }));

  _patternsCache = patterns;
  return patterns;
}

let _antiPatternsCache: AntiPattern[] | null = null;

export function getAntiPatterns(): AntiPattern[] {
  if (_antiPatternsCache) return _antiPatternsCache;
  const allSlugs = new Set(getAllCalls().map((c) => c.slug));
  _antiPatternsCache = readJsonArray<AntiPattern>("anti.json").map((p) => ({
    ...p,
    appearsInCalls: (p.appearsInCalls || []).filter((x) => allSlugs.has(x)),
  }));
  return _antiPatternsCache;
}

/* ROLE-PLAYS ---------------------------------------------------------- */
/* Drilly v /role-play. ZÁMĚRNĚ oddělené od reálných callů (skill-scores.csv
 * + transcripts/). Role-play NIKDY nepatří mezi reálné cally — je to trénink,
 * ne reálný výsledek. Zdroj: roleplays/{linie}/{slug}.md s frontmatterem. */

function sectionsFromScoresObj(
  scores: Record<string, unknown> | undefined
): ScoreSection[] {
  return SECTION_ORDER.map((key) => {
    const raw = scores ? scores[key] : undefined;
    const score = parseNum(raw);
    return { key, label: SECTION_LABELS[key], score, max: SECTION_MAX[key] };
  });
}

function toStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x)).filter(Boolean);
  if (typeof v === "string" && v.trim()) return [v.trim()];
  return [];
}

let _roleplaysCache: RoleplaySummary[] | null = null;

function parseRoleplayFile(
  linie: Linie,
  fn: string
): { summary: RoleplaySummary; body: string } | null {
  const fullPath = path.join(ROLEPLAYS_DIR, linie, fn);
  const raw = safeRead(fullPath);
  if (raw === null) return null;
  const { data, content } = matter(raw);
  const fm = data as Record<string, unknown>;
  const slug = fn.replace(/\.md$/, "");

  const total = parseNum(fm.total);
  const scores = (fm.scores as Record<string, unknown> | undefined) || undefined;

  const summary: RoleplaySummary = {
    slug,
    date: fm.date ? String(fm.date) : "",
    persona: fm.persona ? String(fm.persona) : slug,
    linie,
    layer: fm.layer ? String(fm.layer) : "prospect",
    mode: fm.mode ? String(fm.mode) : "",
    trained: toStringArray(fm.trained),
    total,
    tier: fm.tier ? String(fm.tier) : null,
    outcome: fm.outcome ? String(fm.outcome) : "",
    sections: sectionsFromScoresObj(scores),
  };
  return { summary, body: content };
}

export function getAllRoleplays(): RoleplaySummary[] {
  if (_roleplaysCache) return _roleplaysCache;
  const out: RoleplaySummary[] = [];
  for (const linie of discoverLinie(ROLEPLAYS_DIR)) {
    const dir = path.join(ROLEPLAYS_DIR, linie);
    const files = safeReadDir(dir).filter((f) => f.endsWith(".md"));
    for (const f of files) {
      const parsed = parseRoleplayFile(linie, f);
      if (parsed) out.push(parsed.summary);
    }
  }
  out.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });
  _roleplaysCache = out;
  return out;
}

export function getRoleplayBySlug(slug: string): RoleplayDetail | null {
  for (const linie of discoverLinie(ROLEPLAYS_DIR)) {
    const parsed = parseRoleplayFile(linie, `${slug}.md`);
    if (parsed) {
      return {
        ...parsed.summary,
        rawMarkdown: parsed.body,
        htmlMarkdown: renderMd(parsed.body),
      };
    }
  }
  return null;
}

/* KPI helpers ------------------------------------------------------- */

// Dedupe a call list down to one entry per prospect (the latest call).
// Input is expected sorted date-descending, so the first time we see a
// prospect is their most recent call = current deal state.
// Lead key: prospect name with any "— 2. call" / "— N. call" suffix stripped,
// diacritics removed, lowercased. So "Jana Novotná — 2. call" and
// "Jana Novotná" collapse to the same lead.
function leadKey(c: CallSummary): string {
  const name = (c.prospect || c.slug).split(/\s+[—–-]\s+/)[0];
  return stripDiacritics(name.trim().toLowerCase());
}

function dedupeByProspect(calls: CallSummary[]): CallSummary[] {
  const seen = new Set<string>();
  const out: CallSummary[] = [];
  for (const c of calls) {
    const key = leadKey(c);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(c);
  }
  return out;
}

// Public: one entry per prospect (latest call = current deal state).
// Use for lead-level views (close lists, open pipeline). For full call
// history (every analyzed call), use getAllCalls().
export function getLeads(): CallSummary[] {
  return dedupeByProspect(getAllCalls());
}

export function getKpi() {
  const calls = getAllCalls();
  const csvRows = getCsvRows();
  const totalAnalyzed = calls.length;

  // LEAD-level counting: dedupe by prospect (multi-call prospects count once,
  // latest call = current deal state). calls are sorted date-desc, so the first
  // occurrence of each prospect is the most recent call.
  const leads = dedupeByProspect(calls);
  const closed = leads.filter((c) => c.outcome === "CLOSED").length;
  const lost = leads.filter((c) => c.outcome === "LOST").length;
  const ghost = leads.filter((c) => c.outcome === "GHOST").length;
  const odlozeno = leads.filter((c) => c.outcome === "ODLOZENO").length;
  const open = leads.filter((c) => c.outcome === "OPEN").length;

  const byLinie = (l: Linie) => leads.filter((c) => c.linie === l);
  const closeRate = (l: Linie) => {
    const arr = byLinie(l).filter((c) => c.outcome !== "MOCK");
    if (arr.length === 0) return null;
    const cl = arr.filter((c) => c.outcome === "CLOSED").length;
    const ls = arr.filter((c) => c.outcome === "LOST").length;
    const op = arr.filter((c) => c.outcome === "OPEN").length;
    const gh = arr.filter((c) => c.outcome === "GHOST").length;
    const od = arr.filter((c) => c.outcome === "ODLOZENO").length;
    return {
      rate: Math.round((cl / arr.length) * 100),
      total: arr.length,
      closed: cl,
      lost: ls,
      open: op,
      ghost: gh,
      odlozeno: od,
    };
  };

  const scoresAll = calls
    .map((c) => c.total)
    .filter((s): s is number => s !== null && Number.isFinite(s));
  const avg = scoresAll.length
    ? Math.round(scoresAll.reduce((a, b) => a + b, 0) / scoresAll.length)
    : 0;

  const highest = calls
    .filter((c) => c.total !== null)
    .sort((a, b) => (b.total ?? 0) - (a.total ?? 0))[0];

  const buckets = [
    { label: "20-30", count: 0 },
    { label: "30-40", count: 0 },
    { label: "40-50", count: 0 },
    { label: "50-60", count: 0 },
    { label: "60-70", count: 0 },
    { label: "70-80", count: 0 },
  ];
  for (const s of scoresAll) {
    if (s < 30) buckets[0].count++;
    else if (s < 40) buckets[1].count++;
    else if (s < 50) buckets[2].count++;
    else if (s < 60) buckets[3].count++;
    else if (s < 70) buckets[4].count++;
    else buckets[5].count++;
  }

  const byMonth: Record<string, { calls: number; closed: number; sum: number }> =
    {};
  for (const c of calls) {
    if (!c.datum || !/^\d{4}-\d{2}/.test(c.datum)) continue;
    const mk = c.datum.substring(0, 7);
    if (!byMonth[mk]) byMonth[mk] = { calls: 0, closed: 0, sum: 0 };
    byMonth[mk].calls++;
    if (c.outcome === "CLOSED") byMonth[mk].closed++;
    if (c.total !== null) byMonth[mk].sum += c.total;
  }
  const months = Object.keys(byMonth)
    .sort()
    .map((k) => ({
      month: k,
      calls: byMonth[k].calls,
      closed: byMonth[k].closed,
      avgScore: byMonth[k].calls
        ? Math.round(byMonth[k].sum / byMonth[k].calls)
        : 0,
    }));

  return {
    totalAnalyzed,
    closed,
    lost,
    ghost,
    odlozeno,
    open,
    closeRateByLinie: discoverLinie(TRANSCRIPTS_DIR).map((l) => ({
      linie: l,
      stats: closeRate(l),
    })),
    avg,
    highest,
    buckets,
    months,
    csvCount: csvRows.length,
  };
}

export function getRecentCalls(n = 5): CallSummary[] {
  return getAllCalls().slice(0, n);
}

export function getSectionTrends() {
  const calls = getAllCalls().filter((c) => c.datum && /^\d{4}-\d{2}/.test(c.datum));
  calls.sort((a, b) => a.datum.localeCompare(b.datum));
  return calls.map((c) => {
    const row: Record<string, number | null | string> = {
      datum: c.datum,
      prospect: c.prospect,
      total: c.total,
    };
    for (const k of SECTION_ORDER) {
      const s = c.sections.find((sec) => sec.key === k);
      row[k] = s ? s.score : null;
    }
    return row;
  });
}

export function getWinLossDiff() {
  const calls = getAllCalls();
  const closed = calls.filter((c) => c.outcome === "CLOSED");
  const lost = calls.filter(
    (c) => c.outcome === "LOST" || c.outcome === "GHOST"
  );
  const avg = (arr: CallSummary[], key: SectionKey) => {
    const vals = arr
      .map((c) => c.sections.find((s) => s.key === key)?.score)
      .filter((v): v is number => v !== null && v !== undefined);
    if (vals.length === 0) return null;
    return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
  };
  return SECTION_ORDER.map((k) => ({
    key: k,
    label: SECTION_LABELS[k],
    max: SECTION_MAX[k],
    closedAvg: avg(closed, k),
    lostAvg: avg(lost, k),
  }));
}

export function getWeaknessHeatmap() {
  const calls = getAllCalls();
  return SECTION_ORDER.map((k) => {
    const vals = calls
      .map((c) => c.sections.find((s) => s.key === k)?.score)
      .filter((v): v is number => v !== null && v !== undefined);
    const max = SECTION_MAX[k];
    const avg = vals.length
      ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10
      : 0;
    const pct = max ? Math.round((avg / max) * 100) : 0;
    return { key: k, label: SECTION_LABELS[k], avg, max, pct };
  });
}

