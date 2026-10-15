/**
 * Poznámky k hovorům v úložišti prohlížeče (localStorage).
 * Nepotřebují databázi, ale nepřenášejí se mezi zařízeními ani prohlížeči.
 * Každý přístup je v try/catch — v anonymním okně může úložiště chybět.
 */
export interface LocalNote {
  slug: string;
  body: string;
  updated_at: string;
}

const PREFIX = "sc_note:";

/**
 * Klíč poznámky = název hovoru bez výsledku (…_OPEN → …). Když se hovor po rozhodnutí
 * přejmenuje na …_CLOSED, poznámka u něj zůstane.
 */
export function noteKey(slug: string): string {
  return slug.replace(/_(CLOSED|LOST|GHOST|ODLOZENO|OPEN)$/i, "");
}

export function readNote(slug: string): LocalNote | null {
  try {
    const key = noteKey(slug);
    const raw = window.localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Omit<LocalNote, "slug">;
    return { slug: key, body: parsed.body || "", updated_at: parsed.updated_at || "" };
  } catch {
    return null;
  }
}

/** Uloží poznámku; prázdná se smaže. Vrací čas uložení, nebo null při chybě. */
export function writeNote(slug: string, body: string): string | null {
  try {
    const updated_at = new Date().toISOString();
    const key = PREFIX + noteKey(slug);
    if (body.trim()) {
      window.localStorage.setItem(key, JSON.stringify({ body, updated_at }));
    } else {
      window.localStorage.removeItem(key);
    }
    return updated_at;
  } catch {
    return null;
  }
}

export function listNotes(): LocalNote[] {
  const out: LocalNote[] = [];
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (!key || !key.startsWith(PREFIX)) continue;
      const note = readNote(key.slice(PREFIX.length));
      if (note && note.body.trim()) out.push(note);
    }
  } catch {
    return [];
  }
  return out.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
}

export function formatRelative(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const min = Math.floor((Date.now() - d.getTime()) / 60_000);
  if (min < 1) return "právě teď";
  if (min < 60) return `před ${min} min`;
  const hrs = Math.floor(min / 60);
  if (hrs < 24) return `před ${hrs} h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `před ${days} dny`;
  return d.toISOString().split("T")[0];
}
