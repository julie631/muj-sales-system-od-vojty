"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { formatRelative, readNote, writeNote } from "@/lib/notes-local";

type SaveState = "idle" | "dirty" | "saving" | "saved" | "error";

const DEBOUNCE_MS = 1000;
const SAVED_FADE_MS = 1500;

/**
 * Poznámka k hovoru — jedno pole, ukládá se samo 1 s po posledním úhozu.
 * Ukládá se do prohlížeče (lib/notes-local.ts).
 */
export function CallNotes({ slug }: { slug: string }) {
  const [body, setBody] = useState("");
  const [initial, setInitial] = useState("");
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [state, setState] = useState<SaveState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedFadeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestBodyRef = useRef<string>("");

  // Načtení z prohlížeče
  useEffect(() => {
    const note = readNote(slug);
    const initialBody = note?.body || "";
    setBody(initialBody);
    setInitial(initialBody);
    latestBodyRef.current = initialBody;
    setUpdatedAt(note?.updated_at || null);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (savedFadeRef.current) clearTimeout(savedFadeRef.current);
    };
  }, [slug]);

  const save = useCallback(
    (bodyToSave: string) => {
      setState("saving");
      setErrorMsg(null);
      const at = writeNote(slug, bodyToSave);
      if (!at) {
        setErrorMsg("Prohlížeč nedovolil uložit (anonymní okno nebo blokované úložiště).");
        setState("error");
        return;
      }
      if (bodyToSave === latestBodyRef.current) {
        setInitial(bodyToSave);
        setUpdatedAt(at);
        setState("saved");
        if (savedFadeRef.current) clearTimeout(savedFadeRef.current);
        savedFadeRef.current = setTimeout(() => {
          setState((s) => (s === "saved" ? "idle" : s));
        }, SAVED_FADE_MS);
      }
    },
    [slug]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setBody(value);
      latestBodyRef.current = value;
      if (value === initial) {
        setState("idle");
        if (timerRef.current) clearTimeout(timerRef.current);
        return;
      }
      setState("dirty");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (latestBodyRef.current === value) {
          void save(value);
        }
      }, DEBOUNCE_MS);
    },
    [initial, save]
  );

  // Save on blur as well (catches edge case where user navigates away
  // before debounce fires)
  const onBlur = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (latestBodyRef.current !== initial) {
      void save(latestBodyRef.current);
    }
  }, [initial, save]);

  return (
    <section className="mb-10">
      <div className="flex items-baseline justify-between mb-3 px-1">
        <h2 className="text-[11px] font-mono uppercase tracking-widest text-ink-dim">
          Moje poznámky
        </h2>
        <SaveIndicator state={state} updatedAt={updatedAt} error={errorMsg} />
      </div>
      <div className="surface-card p-1.5">
        <textarea
          value={body}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Co si z toho beru… (markdown OK, auto-save po 1s)"
          spellCheck={false}
          rows={6}
          className="w-full resize-y bg-transparent border-0 outline-none focus:outline-none p-3 text-base leading-relaxed font-serif placeholder:text-ink-dim text-ink-strong"
          style={{ minHeight: 120, fontFamily: "var(--font-eb-garamond, serif)" }}
        />
      </div>
      <p className="text-[11px] text-ink-dim italic mt-2 px-1">
        Ukládá se automaticky 1 sekundu po posledním úhozu, do tohoto prohlížeče.
        Všechny poznámky najdeš v sekci{" "}
        <a href="/notes" className="hover:text-ink-strong underline">
          Notes
        </a>
        .
      </p>
    </section>
  );
}

function SaveIndicator({
  state,
  updatedAt,
  error,
}: {
  state: SaveState;
  updatedAt: string | null;
  error: string | null;
}) {
  const label = {
    idle: updatedAt ? `Uloženo · ${formatRelative(updatedAt)}` : "",
    dirty: "Neuloženo…",
    saving: "Ukládám…",
    saved: "Uloženo ✓",
    error: "Chyba",
  }[state];
  const color = {
    idle: "var(--ink-dim)",
    dirty: "var(--odlozeno)",
    saving: "var(--ink-dim)",
    saved: "var(--closed)",
    error: "var(--lost)",
  }[state];
  return (
    <span
      className="text-[11px] font-mono tabular-nums"
      style={{ color }}
      title={state === "error" ? error || "" : undefined}
    >
      {label}
    </span>
  );
}
