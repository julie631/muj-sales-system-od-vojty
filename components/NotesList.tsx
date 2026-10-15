"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { OutcomeBadge } from "@/components/OutcomeBadge";
import { formatRelative, listNotes, LocalNote, noteKey } from "@/lib/notes-local";
import type { CallSummary } from "@/lib/types";

type CallInfo = Pick<CallSummary, "slug" | "prospect" | "outcome" | "datum" | "total" | "notes">;

export function NotesList({ calls }: { calls: CallInfo[] }) {
  // null = ještě nenačteno (první render na serveru)
  const [notes, setNotes] = useState<LocalNote[] | null>(null);
  useEffect(() => setNotes(listNotes()), []);

  const callByKey = new Map(calls.map((c) => [noteKey(c.slug), c]));

  if (notes === null) return null;
  if (notes.length === 0) {
    return (
      <div className="surface-card p-8 text-center">
        <p className="text-ink-muted">
          Zatím žádné poznámky. Otevři libovolný{" "}
          <Link href="/calls" className="text-ink-strong underline">
            call
          </Link>{" "}
          → sjeď k sekci „Moje poznámky" → piš.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {notes.map((n) => {
        const call = callByKey.get(n.slug);
        const excerpt = excerptOf(n.body, 240);
        return (
          <article
            key={n.slug}
            className="surface-card p-5 sm:p-6 hover:bg-[var(--surface-muted)] transition-colors"
          >
            <Link href={call ? `/calls/${call.slug}` : "/calls"} className="block">
              <header className="flex items-baseline justify-between gap-3 flex-wrap mb-2">
                <div className="flex items-baseline gap-2.5 flex-wrap min-w-0">
                  <h2 className="serif-display text-xl truncate">{call?.prospect || n.slug}</h2>
                  {call?.outcome && <OutcomeBadge outcome={call.outcome} size="sm" />}
                  {call?.datum && (
                    <span className="text-xs font-mono text-ink-dim">{call.datum}</span>
                  )}
                  {call?.total !== null && call?.total !== undefined && (
                    <span
                      className="text-xs font-mono tabular-nums px-1.5 py-0.5 rounded"
                      style={{ background: "var(--surface-muted)", color: "var(--ink-muted)" }}
                    >
                      {call.total}/100
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-ink-dim shrink-0">
                  {formatRelative(n.updated_at)}
                </span>
              </header>

              {call?.notes && (
                <p className="text-xs text-ink-dim italic mb-3 leading-snug">
                  Kontext: {call.notes}
                </p>
              )}

              <p
                className="font-serif text-base leading-relaxed whitespace-pre-wrap"
                style={{ fontFamily: "var(--font-eb-garamond, serif)", color: "var(--ink-strong)" }}
              >
                {excerpt}
              </p>

              {n.body.length > 240 && (
                <p className="text-xs text-ink-dim mt-2">… (otevřít call pro celou poznámku)</p>
              )}
            </Link>
          </article>
        );
      })}
    </div>
  );
}

function excerptOf(text: string, maxChars: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxChars) return trimmed;
  const cut = trimmed.slice(0, maxChars);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > maxChars - 60 ? cut.slice(0, lastSpace) : cut) + "…";
}
