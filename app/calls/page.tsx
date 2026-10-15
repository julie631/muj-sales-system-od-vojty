import { Nav } from "@/components/Nav";
import { CallsTable } from "@/components/CallsTable";
import { getAllCalls } from "@/lib/data";

export const dynamic = "force-static";

export default function CallsPage() {
  const calls = getAllCalls();
  return (
    <>
      <Nav />
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 w-full">
        <header className="mb-8 sm:mb-10">
          <p className="text-xs text-ink-dim font-mono uppercase tracking-widest mb-2">
            Calls
          </p>
          <h1 className="serif-display text-3xl sm:text-4xl">
            Všechny analyzované cally
          </h1>
          <p className="text-ink-muted mt-3 text-base leading-relaxed">
            Filtruj, řaď, hledej. Klik na řádek → per-call breakdown.
          </p>
        </header>
        <CallsTable calls={calls} />
      </main>
    </>
  );
}
