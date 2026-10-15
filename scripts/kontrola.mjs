#!/usr/bin/env node
// Kontrola dat v data/sales-coach/ — sedí rozbory, přepisy, CSV, roleplaye a vzorce
// na formát, který čte aplikace? Pravidla odpovídají parseru v lib/data.ts.
// Použití: node scripts/kontrola.mjs     (chyba → exit 1)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT =
  process.env.SALES_COACH_ROOT ||
  path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data", "sales-coach");
const T_DIR = path.join(ROOT, "transcripts");
const R_DIR = path.join(ROOT, "roleplays");
const CSV = path.join(ROOT, "progress", "skill-scores.csv");
const P_DIR = path.join(ROOT, "patterns");

const SECTIONS = [
  ["Clarify", 10], ["Label", 15], ["Overview", 15], ["Sell", 20],
  ["Explain", 20], ["Reinforce", 10], ["Mechanika", 10],
];
const OUTCOMES = ["CLOSED", "LOST", "GHOST", "ODLOZENO", "OPEN"];
const HEADER = "datum,prospect,linie,clarify,label,overview,sell,explain,reinforce,mechanika,total,outcome,notes";

const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);
const rel = (p) => path.relative(path.join(ROOT, "..", ".."), p);

const dirs = (d) => {
  try {
    return fs.readdirSync(d, { withFileTypes: true })
      .filter((x) => x.isDirectory() && !/^[_.]/.test(x.name)).map((x) => x.name).sort();
  } catch { return []; }
};
const files = (d, ext) => {
  try { return fs.readdirSync(d).filter((f) => f.endsWith(ext)).sort(); } catch { return []; }
};
const read = (p) => { try { return fs.readFileSync(p, "utf8"); } catch { return null; } };
const num = (v) => {
  const s = String(v ?? "").trim();
  if (!s || /^(n\/a|-)$/i.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
};
const strip = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");

/* CSV ------------------------------------------------------------------ */

function parseCsv(text) {
  const rows = [];
  let row = [], field = "", inQ = false, line = 1, start = 1;
  const push = () => {
    row.push(field); field = "";
    if (row.length > 1 || row[0] !== "") rows.push({ cells: row, line: start });
    row = [];
  };
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; }
      else { if (c === "\n") line++; field += c; }
    } else if (c === '"') inQ = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      push(); line++; start = line;
    } else field += c;
  }
  if (field !== "" || row.length) push();
  return rows;
}

const csvText = read(CSV);
const csvRows = [];
if (csvText === null) {
  err(rel(CSV), "soubor chybí");
} else {
  const rows = parseCsv(csvText.replace(/^﻿/, ""));
  if (!rows.length || rows[0].cells.join(",") !== HEADER) {
    err(rel(CSV), `první řádek musí být přesně: ${HEADER}`);
  }
  for (const { cells, line } of rows.slice(1)) {
    const where = `skill-scores.csv ř. ${line}`;
    if (cells.length !== 13) {
      err(where, `${cells.length} sloupců místo 13 (čárka v poznámce bez uvozovek?)`);
      continue;
    }
    const [datum, prospect, linie, ...rest] = cells;
    const scores = rest.slice(0, 7).map(num);
    const total = num(rest[7]);
    const outcome = rest[8].trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(datum)) err(where, `datum „${datum}" není YYYY-MM-DD`);
    if (!prospect.trim()) err(where, "chybí prospect");
    if (!linie.trim()) err(where, "chybí linie");
    scores.forEach((s, i) => {
      if (Number.isNaN(s)) err(where, `${SECTIONS[i][0]} „${rest[i]}" není číslo`);
      else if (s !== null && (s < 0 || s > SECTIONS[i][1])) err(where, `${SECTIONS[i][0]} ${s} mimo 0–${SECTIONS[i][1]}`);
    });
    if (total === null || Number.isNaN(total)) err(where, "total není číslo");
    if (!OUTCOMES.includes(outcome)) warn(where, `outcome „${outcome}" — aplikace zná ${OUTCOMES.join(" / ")}`);
    if (scores.every((s) => typeof s === "number" && !Number.isNaN(s)) && typeof total === "number") {
      const sum = scores.reduce((a, b) => a + b, 0);
      if (sum !== total) warn(where, `součet sekcí ${sum} ≠ total ${total}`);
    }
    csvRows.push({ datum, prospect, linie: linie.toLowerCase().trim(), outcome, total, line, used: false });
  }
}

/* Párování CSV ↔ rozbor (stejně jako lib/data.ts → findCsvMatch) ------- */

const STOP = new Set(["studio", "salon", "shop", "group", "the"]);
const tokens = (p) =>
  strip(p.toLowerCase()).split(/[\s()/,]+/).map((t) => t.replace(/[^a-z0-9]/gi, ""))
    .filter((t) => t.length >= 4 && !STOP.has(t));

function findCsvMatch(linie, slug, prospect) {
  const slugAscii = strip(slug.toLowerCase());
  const d = slug.match(/(\d{4}-\d{2}-\d{2})/)?.[1];
  if (d) {
    const same = csvRows.filter((r) => r.linie === linie && r.datum === d);
    if (same.length === 1) {
      const t = tokens(same[0].prospect);
      if (t.length === 0 || t.some((x) => slugAscii.includes(x))) return same[0];
    } else if (same.length > 1) {
      return same.find((r) => tokens(r.prospect).some((x) => slugAscii.includes(x))) || null;
    }
  }
  const first = prospect.toLowerCase().split(" ")[0];
  for (const r of csvRows) {
    if (r.linie !== linie) continue;
    const t = tokens(r.prospect);
    if (t.length === 0) continue;
    if (t.some((x) => slugAscii.includes(x))) return r;
    if (first.length >= 4 && !STOP.has(first) && r.prospect.toLowerCase().includes(first)) return r;
  }
  return null;
}

/* Rozbory hovorů ------------------------------------------------------- */

const callSlugs = new Set();
const noTxt = [];
const perLinie = {};
for (const linie of dirs(T_DIR)) {
  for (const f of files(path.join(T_DIR, linie), ".md")) {
    const p = path.join(T_DIR, linie, f);
    const where = `transcripts/${linie}/${f}`;
    const md = read(p) || "";
    const slug = f.replace(/\.md$/, "");
    callSlugs.add(slug);
    perLinie[linie] = (perLinie[linie] || 0) + 1;

    const fm = slug.match(/^(\d{4}-\d{2}-\d{2})_([a-z0-9-]+)_([A-Z]+)$/);
    if (!fm) err(where, "název musí být {YYYY-MM-DD}_{slug}_{VÝSLEDEK}.md (slug malými písmeny bez diakritiky)");
    else if (!OUTCOMES.includes(fm[3])) err(where, `výsledek „${fm[3]}" — povolené: ${OUTCOMES.join(", ")}`);

    const h1 = md.match(/^#\s+([^\n]+)/m);
    if (!h1) err(where, "chybí nadpis „# {Jméno} — {Linie} — {VÝSLEDEK}\"");
    const prospect = h1 ? h1[1].split(/\s+[—–]\s+/)[0].trim() : slug;

    if (!/^##\s+Metadata/m.test(md)) warn(where, "chybí „## Metadata\"");
    if (!/Tier\s+\d/i.test(md)) warn(where, "chybí „Tier N\" (štítek úrovně)");
    if (!/^##\s+Scorecard přehled/im.test(md)) warn(where, "nadpis skóre má být „## Scorecard přehled — **X/100**\" (jinak se tabulka v detailu zobrazí dvakrát)");

    const totalM = md.match(/(\d{2,3})\s*\/\s*100/);
    const total = totalM ? Number(totalM[1]) : null;
    if (total === null || total > 100) err(where, "chybí celkové skóre „X/100\"");

    const sec = SECTIONS.map(([label, max]) => {
      const m = md.match(new RegExp(`\\|\\s*${label}\\s*\\|\\s*(\\d+|n\\/a|N\\/A)\\s*\\/\\s*\\d+`, "i"));
      if (!m) { err(where, `v tabulce chybí řádek „| ${label} | X/${max} |\"`); return null; }
      if (/n\/a/i.test(m[1])) return null;
      const n = Number(m[1]);
      if (n > max) err(where, `${label} ${n} > max ${max}`);
      return n;
    });
    if (total !== null && sec.every((s) => s !== null)) {
      const sum = sec.reduce((a, b) => a + b, 0);
      if (sum !== total) warn(where, `součet sekcí ${sum} ≠ celkové skóre ${total}`);
    }

    // Deep analysis: ### {Label} … + #### momenty
    if (!/^##\s+Deep analysis per sekce/im.test(md)) {
      err(where, "chybí „## Deep analysis per sekce\" — v aplikaci nebude rozbor po sekcích");
    } else {
      const lines = md.split(/\r?\n/);
      const found = {};      // počet momentů v sekci
      const reasoning = {};  // má sekce text před prvním momentem?
      let cur = null;
      let inMoment = false;
      let noTs = 0;
      for (const line of lines) {
        const h3 = line.match(/^###\s+([A-Za-zŠČŘŽŤŇŮÚáčďéěíňóřšťúůýž]+)/);
        if (h3) {
          const w = h3[1].toLowerCase();
          const hit = SECTIONS.find(([l]) => w === l.toLowerCase() || w.startsWith(l.toLowerCase()));
          cur = hit ? hit[0] : null;
          inMoment = false;
          if (cur) { found[cur] = found[cur] || 0; reasoning[cur] = reasoning[cur] || false; }
          continue;
        }
        if (/^##\s+/.test(line)) { cur = null; continue; }
        if (!cur) continue;
        if (/^####\s+/.test(line)) {
          found[cur]++;
          inMoment = true;
          if (!/\[\d{1,2}:\d{2}(?::\d{2})?(?:\s*[–-]\s*\d{1,2}:\d{2}(?::\d{2})?)?\]/.test(line)) noTs++;
          continue;
        }
        if (!inMoment && line.trim() && !/^---\s*$/.test(line)) reasoning[cur] = true;
      }
      for (const [label] of SECTIONS) {
        if (!(label in found)) err(where, `v Deep analysis chybí „### ${label} — X/…\"`);
        else if (!reasoning[label]) warn(where, `${label}: chybí Reasoning (zdůvodnění bodů před momenty)`);
      }

      // Kolik momentů čekat: podle délky hovoru a toho, kolik materiálu přepis má
      const txt = read(p.replace(/\.md$/, ".txt"));
      if (txt) {
        const turns = txt.split(/\r?\n/).filter((l) => /^(?:\[[\d:]+\]\s*)?[^:[\]]{1,40}:\s+\S/.test(l.trim()));
        const stamps = [...txt.matchAll(/^\[(\d{1,2}):(\d{2})(?::(\d{2}))?\]/gm)]
          .map((m) => (m[3] !== undefined ? +m[1] * 60 + +m[2] + +m[3] / 60 : +m[1] + +m[2] / 60));
        const words = txt.split(/\s+/).filter(Boolean).length;
        const minutes = stamps.length ? Math.max(...stamps) : words / 150;
        const need = Math.min(minutes < 15 ? 7 : 14, Math.floor(turns.length / 3));
        const moments = Object.values(found).reduce((a, b) => a + b, 0);
        if (moments < need) {
          warn(where, `jen ${moments} momentů — u ${Math.round(minutes)}min hovoru aspoň ${need} (${minutes < 15 ? "krátký hovor: aspoň 1 na sekci" : "2–3 na sekci"})`);
        }
        const empty = SECTIONS.map(([l]) => l).filter((l) => l in found && found[l] === 0);
        if (empty.length && sec.every((x) => x !== null)) warn(where, `bez momentu: ${empty.join(", ")}`);
        if (stamps.length && noTs) warn(where, `${noTs} momentů bez času [mm:ss], přestože přepis časy má`);
      }
    }

    // Závěrečné sekce: 3 + 3 a cvičení
    for (const [re, label] of [[/^##\s+🟢?\s*Top 3 wins/im, "Top 3 wins"], [/^##\s+🔴?\s*Top 3 misses/im, "Top 3 misses"]]) {
      const m = md.match(re);
      if (!m) { warn(where, `chybí „## ${label}"`); continue; }
      const rest = md.slice(m.index + m[0].length).split(/^##\s+/m)[0];
      const items = (rest.match(/^\d+\.\s+/gm) || []).length;
      if (items < 3) warn(where, `${label}: ${items} bodů místo 3`);
    }
    if (!/^##\s+🎯?\s*Cvičení/im.test(md)) warn(where, "chybí „## 🎯 Cvičení\"");

    // Rozbor bez přepisu je v pořádku (nenahraný hovor) — jen se vypíše v přehledu
    if (!fs.existsSync(p.replace(/\.md$/, ".txt"))) noTxt.push(`${linie}/${slug}`);

    const row = findCsvMatch(linie, slug, prospect);
    if (!row) {
      err(where, "nenašel jsem řádek v skill-scores.csv (stejné datum + linie a ve slugu slovo 4+ písmen ze jména v CSV)");
    } else {
      row.used = true;
      if (fm && row.outcome !== fm[3]) warn(where, `výsledek v názvu ${fm[3]} ≠ v CSV ${row.outcome}`);
      if (row.total !== null && total !== null && row.total !== total) warn(where, `skóre v rozboru ${total} ≠ v CSV ${row.total}`);
    }
  }
}
for (const r of csvRows) {
  if (!r.used) warn(`skill-scores.csv ř. ${r.line}`, `„${r.prospect}" nemá rozbor v transcripts/${r.linie}/`);
}

/* Roleplaye ------------------------------------------------------------ */

let roleplays = 0;
for (const linie of dirs(R_DIR)) {
  for (const f of files(path.join(R_DIR, linie), ".md")) {
    roleplays++;
    const where = `roleplays/${linie}/${f}`;
    const md = read(path.join(R_DIR, linie, f)) || "";
    if (!/^\d{4}-\d{2}-\d{2}_[a-z0-9-]+\.md$/.test(f)) warn(where, "název má být {YYYY-MM-DD}_{slug}.md");
    const fmBlock = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fmBlock) { err(where, "chybí hlavička (--- … ---)"); continue; }
    const fmText = fmBlock[1];
    const val = (k) => fmText.match(new RegExp(`^${k}:\\s*(.*)$`, "m"))?.[1]?.replace(/^["']|["']$/g, "").trim();
    if (!val("date")) err(where, "v hlavičce chybí date");
    if (!val("persona")) warn(where, "v hlavičce chybí persona");
    const layer = val("layer");
    if (!["objection", "archetype", "prospect"].includes(layer)) warn(where, `layer „${layer ?? ""}" — má být objection / archetype / prospect`);
    const t = val("total");
    if (t && t !== "null" && Number.isNaN(Number(t))) err(where, `total „${t}" není číslo`);
    if (!/^scores:/m.test(fmText)) warn(where, "v hlavičce chybí scores");
  }
}

/* Vzorce --------------------------------------------------------------- */

function checkPatterns(file, fields, slugFields) {
  const where = `patterns/${file}`;
  const raw = read(path.join(P_DIR, file));
  if (raw === null) { warn(where, "soubor chybí (aplikace ukáže prázdný seznam)"); return 0; }
  let arr;
  try { arr = JSON.parse(raw); } catch (e) { err(where, `neplatný JSON — ${e.message}`); return 0; }
  if (!Array.isArray(arr)) { err(where, "musí to být pole [ … ]"); return 0; }
  const ids = new Set();
  arr.forEach((p, i) => {
    const w = `${where} #${i + 1}${p?.id ? ` (${p.id})` : ""}`;
    for (const [k, type] of fields) {
      const v = p?.[k];
      const ok = type === "array" ? Array.isArray(v) : typeof v === type;
      if (!ok) err(w, `pole „${k}" chybí nebo není ${type === "array" ? "pole" : type}`);
    }
    if (p?.id) {
      if (ids.has(p.id)) err(w, "duplicitní id");
      ids.add(p.id);
    }
    for (const k of slugFields) {
      const vals = Array.isArray(p?.[k]) ? p[k] : p?.[k] ? [p[k]] : [];
      for (const s of vals) if (s && !callSlugs.has(s)) warn(w, `${k}: hovor „${s}" neexistuje`);
    }
  });
  return arr.length;
}
const nMaster = checkPatterns("master.json", [
  ["id", "string"], ["title", "string"], ["description", "string"], ["quote", "string"],
  ["trigger", "string"], ["crossLine", "string"], ["closedValidated", "boolean"],
  ["validatedBy", "array"], ["usedInCalls", "array"],
], ["usedInCalls"]);
const nAnti = checkPatterns("anti.json", [
  ["id", "string"], ["title", "string"], ["whatHappens", "string"], ["why", "string"],
  ["exampleQuote", "string"], ["exampleFromSlug", "string"], ["fix", "string"], ["appearsInCalls", "array"],
], ["appearsInCalls", "exampleFromSlug"]);

/* Výstup --------------------------------------------------------------- */

const inbox = files(path.join(T_DIR, "_inbox"), ".txt").concat(files(path.join(T_DIR, "_inbox"), ".md"));
const linieText = Object.entries(perLinie).map(([l, n]) => `${l} ${n}`).join(", ") || "žádné";

console.log("Kontrola data/sales-coach/");
console.log(`  Hovory: ${callSlugs.size} (${linieText})`);
console.log(`  Řádky v CSV: ${csvRows.length}`);
console.log(`  Roleplaye: ${roleplays}`);
console.log(`  Vzorce: ${nMaster} dobrých, ${nAnti} špatných`);
if (inbox.length) console.log(`  V _inbox čeká: ${inbox.join(", ")}`);
if (noTxt.length) console.log(`  Bez přepisu (.txt): ${noTxt.length} — v pořádku u nenahraných hovorů`);

if (warnings.length) {
  console.log(`\nUpozornění (${warnings.length}):`);
  for (const w of warnings) console.log(`  · ${w}`);
}
if (errors.length) {
  console.log(`\nChyby (${errors.length}):`);
  for (const e of errors) console.log(`  ✗ ${e}`);
  console.log("\nOprav chyby výš a spusť kontrolu znovu.");
  process.exit(1);
}
console.log("\n✓ Formát sedí — aplikace data přečte.");
