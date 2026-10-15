"use client";

import { CONFIG } from "@/lib/config";
import { useEffect, useMemo, useRef, useState } from "react";

export function TranscriptViewer({ transcript }: { transcript: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const lines = useMemo(() => transcript.split(/\r?\n/), [transcript]);

  const blocks = useMemo(() => {
    type Block = { speaker: string | null; text: string; idx: number; ts: string | null };
    const result: Block[] = [];
    let cur: Block | null = null;
    let blockIdx = 0;
    for (const raw of lines) {
      const line = raw.replace(/\s+$/g, "");
      // Volitelná časová značka na začátku řádku: „[04:12] Obchodník: …"
      const tsMatch = line.match(/^\[(\d{1,2}:\d{2}(?::\d{2})?)\]\s*/);
      const ts = tsMatch ? tsMatch[1] : null;
      const body = tsMatch ? line.slice(tsMatch[0].length) : line;
      const speakerMatch = body.match(/^([A-ZÁ-ŽÉŤŇÚŮŘŽ][A-ZÁ-Ža-zá-ž0-9 ._-]+):\s*$/);
      const inlineSpeaker = body.match(/^([A-ZÁ-ŽÉŤŇÚŮŘŽ][A-ZÁ-Ža-zá-ž0-9 ._-]+):\s+(.*)$/);
      const standaloneName =
        body.match(/^([A-ZÁ-ŽÉŤŇÚŮŘŽ][\wá-žÁ-Ž\s.]{1,60})$/) &&
        body.split(/\s+/).length <= 5;
      if (speakerMatch) {
        if (cur && cur.text.trim()) result.push(cur);
        cur = { speaker: speakerMatch[1].trim(), text: "", idx: blockIdx++, ts };
        continue;
      }
      if (inlineSpeaker) {
        if (cur && cur.text.trim()) result.push(cur);
        cur = {
          speaker: inlineSpeaker[1].trim(),
          text: inlineSpeaker[2].trim(),
          idx: blockIdx++,
          ts,
        };
        continue;
      }
      if (standaloneName && body.length < 50 && /^[A-ZÁ-Ž]/.test(body)) {
        if (cur && cur.text.trim()) result.push(cur);
        cur = { speaker: body.trim(), text: "", idx: blockIdx++, ts };
        continue;
      }
      if (!cur) cur = { speaker: null, text: "", idx: blockIdx++, ts: null };
      cur.text += (cur.text ? "\n" : "") + line;
    }
    if (cur && cur.text.trim()) result.push(cur);
    return result;
  }, [lines]);

  const highlighted = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.trim().toLowerCase();
    const matches: number[] = [];
    blocks.forEach((b, i) => {
      if (b.text.toLowerCase().includes(q)) matches.push(i);
    });
    return matches;
  }, [blocks, query]);

  useEffect(() => {
    if (!highlighted || highlighted.length === 0 || !ref.current) return;
    const first = ref.current.querySelector(
      `[data-block="${highlighted[0]}"]`
    ) as HTMLElement | null;
    first?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlighted]);

  function highlight(text: string, q: string) {
    if (!q.trim()) return text;
    const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    const parts: React.ReactNode[] = [];
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) parts.push(text.slice(last, m.index));
      parts.push(
        <mark
          key={m.index}
          style={{
            background: "var(--highlight)",
            color: "var(--ink-strong)",
            padding: "0 2px",
            borderRadius: "2px",
          }}
        >
          {m[0]}
        </mark>
      );
      last = m.index + m[0].length;
      if (m[0].length === 0) re.lastIndex++;
    }
    if (last < text.length) parts.push(text.slice(last));
    return parts;
  }

  return (
    <div className="surface-card overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 sm:px-5 py-3 hover:bg-[var(--surface-muted)] transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-ink-strong font-medium">
            Verbatim transcript
          </span>
          <span className="text-xs font-mono text-ink-dim">
            ~{Math.round(transcript.length / 1000)}k znaků
          </span>
        </div>
        <span className="text-ink-muted text-sm font-mono">
          {open ? "− zavřít" : "+ rozbalit"}
        </span>
      </button>
      {open && (
        <div
          className="border-t px-4 sm:px-5 py-4"
          style={{ borderColor: "var(--border-soft)" }}
        >
          <div className="mb-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Hledat v přepisu (např. 'cena', 'rozpočet', 'konkurence')…"
              className="w-full px-3 py-2 rounded-md bg-surface text-ink placeholder:text-ink-faint text-sm focus:outline-none"
              style={{
                border: "1px solid var(--border-soft)",
              }}
            />
            {highlighted && (
              <div className="text-xs text-ink-dim font-mono mt-1.5">
                {highlighted.length} výskyt
                {highlighted.length === 1 ? "" : "ů"}
              </div>
            )}
          </div>
          <div
            ref={ref}
            className="max-h-[600px] overflow-y-auto pr-2 text-sm space-y-3 leading-relaxed"
          >
            {blocks.map((b) => (
              <div
                key={b.idx}
                data-block={b.idx}
                className={
                  highlighted?.includes(b.idx)
                    ? "border rounded-md p-2 -mx-2"
                    : ""
                }
                style={
                  highlighted?.includes(b.idx)
                    ? {
                        background: "var(--highlight)",
                        borderColor: "rgba(180, 83, 9, 0.25)",
                      }
                    : undefined
                }
              >
                {b.speaker && (
                  <div
                    className="text-xs font-mono uppercase tracking-wider mb-0.5"
                    style={{
                      color: CONFIG.repNames.some((n) =>
                        b.speaker!.toLowerCase().includes(n.toLowerCase())
                      )
                        ? "var(--brand)"
                        : "var(--ink-dim)",
                    }}
                  >
                    {b.speaker}
                    {b.ts && (
                      <span
                        className="ml-2 normal-case tracking-normal"
                        style={{ color: "var(--ink-faint)" }}
                      >
                        {b.ts}
                      </span>
                    )}
                  </div>
                )}
                <p
                  className="whitespace-pre-wrap"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {highlight(b.text, query)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
