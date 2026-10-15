#!/usr/bin/env node
// Smaže ukázková (smyšlená) data — a nic jiného. Tvoje vlastní hovory, roleplaye a vzorce zůstanou.
// Použití: node scripts/smaz-ukazku.mjs          (jen ukáže, co by smazal)
//          node scripts/smaz-ukazku.mjs --ano    (opravdu smaže)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA = path.join(ROOT, "data", "sales-coach");
const doIt = process.argv.includes("--ano");

const DEMO_CALLS = [
  "salony/2026-08-26_studio-lotos_CLOSED",
  "salony/2026-09-15_beauty-point_LOST",
  "b2b/2026-09-29_kancelar-novak_OPEN",
  "b2b/2026-10-02_kolar-servis_OPEN",
];
const DEMO_FILES = [
  ...DEMO_CALLS.flatMap((c) => [`data/sales-coach/transcripts/${c}.md`, `data/sales-coach/transcripts/${c}.txt`]),
  "data/sales-coach/roleplays/salony/2026-09-30_namitka-drahe.md",
  "prospects/b2b/kolar-servis.md",
];
const DEMO_CSV = [
  "Klára Dvořáková (Studio Lotos)",
  "Petra Malá (Beauty Point)",
  "Tomáš Novák (Účetní kancelář Novák)",
  "Martin Kolář (Kolář Servis)",
];
const DEMO_PATTERNS = ["otazka-na-dopad", "spolecny-hovor-s-rozhodovatelem", "pitch-naslepo", "rozmyslim-si-bez-otazky"];
const demoSlugs = new Set(DEMO_CALLS.map((c) => c.split("/")[1]));

const log = [];

// 1) soubory
for (const rel of DEMO_FILES) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) continue;
  log.push(`smazat ${rel}`);
  if (doIt) fs.unlinkSync(p);
}

// 2) řádky v CSV
const csvPath = path.join(DATA, "progress", "skill-scores.csv");
if (fs.existsSync(csvPath)) {
  const lines = fs.readFileSync(csvPath, "utf8").split(/\r?\n/);
  const keep = lines.filter((l, i) => {
    if (i === 0) return true;
    const demo = DEMO_CSV.some((name) => l.split(",").slice(1).join(",").startsWith(name + ","));
    if (demo) log.push(`CSV: odebrat řádek „${l.split(",").slice(0, 2).join(", ")}"`);
    return !demo;
  });
  if (doIt) fs.writeFileSync(csvPath, keep.join("\n").replace(/\n*$/, "\n"));
}

// 3) vzorce — odebrat ukázkové hovory; ukázkový vzorec bez vlastních hovorů smazat celý
for (const [file, listKey] of [["master.json", "usedInCalls"], ["anti.json", "appearsInCalls"]]) {
  const p = path.join(DATA, "patterns", file);
  if (!fs.existsSync(p)) continue;
  const arr = JSON.parse(fs.readFileSync(p, "utf8"));
  const out = [];
  for (const pat of arr) {
    const calls = (pat[listKey] || []).filter((s) => !demoSlugs.has(s));
    if (DEMO_PATTERNS.includes(pat.id) && calls.length === 0) {
      log.push(`${file}: smazat ukázkový vzorec „${pat.title}"`);
      continue;
    }
    if (calls.length !== (pat[listKey] || []).length) log.push(`${file}: u „${pat.title}" odebrat ukázkové hovory`);
    pat[listKey] = calls;
    if (pat.exampleFromSlug && demoSlugs.has(pat.exampleFromSlug)) pat.exampleFromSlug = calls[0] || "";
    if (Array.isArray(pat.validatedBy)) pat.validatedBy = pat.validatedBy.filter((v) => !/ukázka/.test(v));
    out.push(pat);
  }
  if (doIt) fs.writeFileSync(p, JSON.stringify(out, null, 2) + "\n");
}

if (log.length === 0) {
  console.log("Žádná ukázková data — není co mazat.");
} else {
  console.log(log.map((l) => `· ${l}`).join("\n"));
  console.log(
    doIt
      ? "\nHotovo. Vzorový rozbor zůstává v knowledge/vzorovy-rozbor.md, persony v personas/."
      : "\nNic jsem nesmazal. Pro smazání spusť: node scripts/smaz-ukazku.mjs --ano"
  );
}
