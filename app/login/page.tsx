import { CONFIG } from "@/lib/config";

type SearchParams = Promise<{ next?: string; error?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const nextUrl = sp.next || "/";
  const error = sp.error;
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-page">
      <div className="surface-card p-8 sm:p-10 max-w-md w-full">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-base font-semibold text-white"
              style={{ background: "var(--brand)" }}
            >
              S
            </div>
            <div>
              <h1 className="serif-display text-2xl">Sales Coach</h1>
              {CONFIG.ownerName && (
                <p className="text-xs text-ink-dim font-mono mt-0.5">
                  {CONFIG.ownerName}
                </p>
              )}
            </div>
          </div>
          <p className="text-ink-muted text-sm leading-relaxed">
            Read-only dashboard pro analyzované sales cally.
          </p>
        </div>
        <form action="/api/login" method="post" className="flex flex-col gap-3">
          <input type="hidden" name="next" value={nextUrl} />
          <label className="block">
            <span className="block text-xs text-ink-muted font-mono uppercase tracking-wider mb-1.5">
              Password
            </span>
            <input
              type="password"
              name="password"
              required
              autoFocus
              autoComplete="current-password"
              className="w-full px-4 py-2.5 rounded-md text-ink placeholder:text-ink-faint focus:outline-none"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-soft)",
              }}
              placeholder="••••••••"
            />
          </label>
          {error && (
            <div
              className="text-xs px-3 py-2 rounded-md"
              style={{ background: "var(--lost-tint)", color: "var(--lost)" }}
            >
              Špatné heslo.
            </div>
          )}
          <button type="submit" className="btn-primary mt-2 justify-center w-full">
            Vstoupit
          </button>
        </form>
      </div>
    </div>
  );
}
