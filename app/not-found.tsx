import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="text-xs font-mono uppercase tracking-widest text-ink-dim mb-2">
        404
      </p>
      <h1 className="serif-display text-3xl sm:text-5xl mb-4">
        Call nenalezen
      </h1>
      <p className="text-ink-muted mb-6">
        Možná byl přejmenován nebo přesunut.
      </p>
      <Link href="/calls" className="btn-primary">
        ← Zpět na všechny calls
      </Link>
    </main>
  );
}
