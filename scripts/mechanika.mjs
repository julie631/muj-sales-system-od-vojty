#!/usr/bin/env node
// Mechanika hovoru z přepisu: podíl řeči, nejdelší monolog obchodníka, jeho otázky.
// Použití: node scripts/mechanika.mjs <přepis.txt> ["Jméno obchodníka"]
// Přepis: jedna replika na řádek, „[mm:ss] Mluvčí: text" (čas je volitelný).

import fs from "node:fs";

const [file, repArg] = process.argv.slice(2);
if (!file) {
  console.error('Použití: node scripts/mechanika.mjs <přepis.txt> ["Jméno obchodníka"]');
  process.exit(1);
}
const repNames = (repArg ? [repArg] : ["obchodník", "obchodnice", "prodejce", "prodejkyně"]).map((s) => s.toLowerCase());
const isRep = (speaker) => repNames.some((n) => speaker.toLowerCase().includes(n));

// ~150 slov za minutu, když přepis nemá časy
const SEC_PER_WORD = 0.4;

const turns = [];
for (const raw of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
  const line = raw.trim();
  if (!line) continue;
  const m = line.match(/^(?:\[(\d{1,2}):(\d{2})(?::(\d{2}))?\]\s*)?([^:[\]]{1,40}):\s+(.*)$/);
  if (m) {
    let ts = null;
    if (m[1] !== undefined) {
      ts = m[3] !== undefined ? +m[1] * 3600 + +m[2] * 60 + +m[3] : +m[1] * 60 + +m[2];
    }
    turns.push({ speaker: m[4].trim(), ts, text: m[5] });
  } else if (turns.length) {
    turns[turns.length - 1].text += " " + line;
  }
}

if (turns.length === 0) {
  console.error("V přepisu jsem nenašel žádné repliky ve tvaru „Mluvčí: text\".");
  process.exit(1);
}

const words = (t) => t.split(/\s+/).filter(Boolean).length;
const fmt = (s) => {
  s = Math.round(s);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

const speakers = [...new Set(turns.map((t) => t.speaker))];
const repSpeakers = speakers.filter(isRep);
if (repSpeakers.length === 0) {
  console.error(`Nenašel jsem obchodníka. Mluvčí v přepisu: ${speakers.join(", ")}`);
  console.error('Zadej jeho jméno jako druhý argument, např.: node scripts/mechanika.mjs prepis.txt "Jana"');
  process.exit(1);
}

// Podíl řeči
let repWords = 0;
let otherWords = 0;
for (const t of turns) (isRep(t.speaker) ? (repWords += words(t.text)) : (otherWords += words(t.text)));
const total = repWords + otherWords;
const hasTs = turns.filter((t) => t.ts !== null).length >= turns.length * 0.8;

// Monology = souvislé úseky replik obchodníka bez reakce klienta
const monologs = [];
for (let i = 0; i < turns.length; ) {
  if (!isRep(turns[i].speaker)) {
    i++;
    continue;
  }
  const start = i;
  let w = 0;
  while (i < turns.length && isRep(turns[i].speaker)) w += words(turns[i++].text);
  let sec = w * SEC_PER_WORD;
  if (hasTs && turns[start].ts !== null && i < turns.length && turns[i].ts !== null) {
    const span = turns[i].ts - turns[start].ts;
    // Pod 40 slov/min přepis nejspíš něco vynechává → radši odhad ze slov
    if (span > 0 && w / (span / 60) >= 40) sec = span;
  }
  monologs.push({ start: turns[start].ts, sec, words: w, wordSec: w * SEC_PER_WORD, text: turns[start].text });
}
monologs.sort((a, b) => b.sec - a.sec);
const longest = monologs[0];

// Otázky obchodníka (orientačně podle prvního slova)
const OPEN = new Set(
  "co čeho čemu čím jak jaký jaká jaké jakou jakého jakém jakým jakých proč kdy kde kam odkud kudy kolik kdo koho komu kým který která které kterou kterého čí nakolik".split(" ")
);
const FILLERS = new Set(["a", "no", "tak", "takže", "hele", "dobře", "jo", "jasně", "aha", "super"]);
// Technické otázky („slyšíme se?", „vidíte to?") nejsou discovery — počítají se zvlášť.
const TECH = /^(?:a\s+|tak\s+|no\s+)?(?:slyšíme se|slyšíte mě|slyšíš mě|vidíte (?:to|mou obrazovku|mě)|vidíš to|je to vidět|jde to vidět|máte to tam|načetlo se vám to)/i;
let open = 0;
let closed = 0;
let tech = 0;
const examples = { open: [], closed: [] };
for (const t of turns) {
  if (!isRep(t.speaker)) continue;
  for (const s of t.text.split(/(?<=[.?!…])\s+/)) {
    if (!s.trim().endsWith("?")) continue;
    const plain = s.trim().replace(/^[„"“]/, "");
    if (TECH.test(plain) || plain.split(/[,—–]/).some((part) => TECH.test(part.trim()))) {
      tech++;
      continue;
    }
    // Otázka je otevřená, když některá její část (oddělená čárkou/pomlčkou) začíná
    // tázacím slovem: „Než začneme — co vás vedlo…?" je otevřená.
    const isOpen = s.toLowerCase().split(/[,—–:;]/).some((part) => {
      const ws = part.replace(/[„"“”'?!.…-]/g, " ").trim().split(/\s+/);
      while (ws.length && FILLERS.has(ws[0])) ws.shift();
      return OPEN.has((ws[0] || "").replace(/[^a-záčďéěíňóřšťúůýž]/g, ""));
    });
    if (isOpen) {
      open++;
      if (examples.open.length < 2) examples.open.push(s.trim());
    } else {
      closed++;
      if (examples.closed.length < 2) examples.closed.push(s.trim());
    }
  }
}
const q = open + closed;

console.log(`Přepis: ${turns.length} replik, ${total} slov, časy ${hasTs ? "ano" : "ne (délky odhadnuté ze slov)"}`);
console.log(`Mluvčí: ${speakers.join(", ")} · obchodník = ${repSpeakers.join(", ")}`);
console.log("");
console.log(`Podíl řeči: obchodník ${Math.round((repWords / total) * 100)} % (${repWords} slov) · ostatní ${Math.round((otherWords / total) * 100)} % (${otherWords} slov)`);
if (longest) {
  const at = longest.start !== null ? ` od [${fmt(longest.start)}]` : "";
  const snippet = longest.text.split(/\s+/).slice(0, 14).join(" ");
  console.log(`Nejdelší monolog: ${fmt(longest.sec)}${at} (${longest.words} slov) — „${snippet}…"`);
  // Když časová délka hodně přesahuje odhad ze slov (pauzy, klikání při sdílení obrazovky), ukaž obojí
  if (longest.sec > longest.wordSec * 1.5 && longest.sec - longest.wordSec > 20) {
    console.log(`  (podle počtu slov by to bylo ~${fmt(longest.wordSec)} — zbytek jsou pauzy nebo práce na obrazovce)`);
  }
  console.log(`Monology nad 90 s: ${monologs.filter((m) => m.sec > 90).length} · nad 120 s: ${monologs.filter((m) => m.sec > 120).length}`);
}
console.log(`Otázky obchodníka: ${q} — otevřené ${open}${q ? ` (${Math.round((open / q) * 100)} %)` : ""}, uzavřené ${closed}${tech ? ` · technické (nezapočítané): ${tech}` : ""}`);
if (examples.open.length) console.log(`  otevřené např.: ${examples.open.map((e) => `„${e}"`).join(" · ")}`);
if (examples.closed.length) console.log(`  uzavřené např.: ${examples.closed.map((e) => `„${e}"`).join(" · ")}`);
console.log("");
console.log("Otevřené/uzavřené je orientační (podle prvního slova) — v rozboru ho ověř čtením.");
