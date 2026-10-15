import { Nav } from "@/components/Nav";
import { NotesList } from "@/components/NotesList";
import { getAllCalls } from "@/lib/data";

export const dynamic = "force-static";

export default function NotesPage() {
  const calls = getAllCalls().map(({ slug, prospect, outcome, datum, total, notes }) => ({
    slug,
    prospect,
    outcome,
    datum,
    total,
    notes,
  }));

  return (
    <>
      <Nav />
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12 w-full">
        <header className="mb-10">
          <p className="text-xs text-ink-dim font-mono uppercase tracking-widest mb-2">
            Notes
          </p>
          <h1 className="serif-display text-3xl sm:text-4xl">Moje poznámky napříč cally</h1>
          <p className="text-ink-muted mt-3 max-w-2xl leading-relaxed">
            Co sis ke každému callu zapsal — co bereš jako důležité, co si chceš
            zapamatovat, co chceš dotrénovat. Klik na řádek → otevře call.
            Poznámky jsou uložené v tomhle prohlížeči.
          </p>
        </header>
        <NotesList calls={calls} />
      </main>
    </>
  );
}
