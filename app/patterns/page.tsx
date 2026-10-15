import Link from "next/link";
import { Nav } from "@/components/Nav";
import {
  getAllCalls,
  getAntiPatterns,
  getMasterPatterns,
} from "@/lib/data";

export const dynamic = "force-static";

export default function PatternsPage() {
  const goodPatterns = getMasterPatterns();
  const antiPatterns = getAntiPatterns();
  const calls = getAllCalls();
  const callBySlug = new Map(calls.map((c) => [c.slug, c]));

  return (
    <>
      <Nav />
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 w-full">
        <header className="mb-10">
          <p className="text-xs text-ink-dim font-mono uppercase tracking-widest mb-2">
            Patterns library
          </p>
          <h1 className="serif-display text-3xl sm:text-4xl">
            Dobré &amp; špatné patterny
          </h1>
          <p className="text-ink-muted mt-3 max-w-2xl leading-relaxed">
            Co se napříč cally opakovaně osvědčilo (
            <strong className="text-ink-strong">zopakovat</strong>) vs. čeho se
            dopouštíš (<strong className="text-ink-strong">přestat</strong>).
            Každý pattern má citát z konkrétního callu, alternativní řešení
            a calls, kde se objevil.
          </p>
        </header>

        {/* DOBRÉ PATTERNY ------------------------------------------------ */}
        <section className="mb-14">
          <div className="flex items-baseline justify-between mb-4 px-1 flex-wrap gap-2">
            <h2 className="serif-display text-2xl">🟢 Dobré patterny</h2>
            <span
              className="text-[10px] font-mono uppercase tracking-widest"
              style={{ color: "var(--closed)" }}
            >
              {goodPatterns.length} master moves · zopakovat
            </span>
          </div>
          <p className="text-ink-muted text-sm mb-5 px-1 max-w-3xl leading-relaxed">
            Moves, který v reálných callech přinesly close nebo silný shift.
            CLOSED-validated = klient uzavřel PO tom, co obchodník tenhle
            pattern použil.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {goodPatterns.map((p, i) => {
              const linkedCalls = p.usedInCalls
                .map((slug) => callBySlug.get(slug))
                .filter((c): c is NonNullable<typeof c> => !!c);
              return (
                <article
                  key={p.id}
                  className="surface-card p-5 sm:p-6 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-ink-dim mb-1">
                        Pattern {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="serif-display text-xl">{p.title}</h3>
                    </div>
                    {p.closedValidated ? (
                      <span
                        className="shrink-0 px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider"
                        style={{
                          background: "var(--closed-tint)",
                          color: "var(--closed)",
                        }}
                      >
                        CLOSED-validated
                      </span>
                    ) : (
                      <span
                        className="shrink-0 px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider"
                        style={{
                          background: "var(--odlozeno-tint)",
                          color: "var(--odlozeno)",
                        }}
                      >
                        offered, not closed
                      </span>
                    )}
                  </div>

                  <p className="text-ink-muted text-sm leading-relaxed">
                    {p.description}
                  </p>

                  <blockquote
                    className="text-sm italic"
                    style={{
                      borderLeft: "2px solid var(--brand)",
                      background: "var(--brand-tint)",
                      color: "var(--ink-strong)",
                      borderRadius: "0 6px 6px 0",
                      padding: "0.55rem 0.9rem",
                    }}
                  >
                    {p.quote}
                  </blockquote>

                  <dl className="text-xs grid grid-cols-1 gap-1.5 mt-1">
                    <div className="flex gap-2">
                      <dt className="text-ink-dim font-mono uppercase tracking-wider w-20 shrink-0">
                        Trigger
                      </dt>
                      <dd className="text-ink-muted">{p.trigger}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-ink-dim font-mono uppercase tracking-wider w-20 shrink-0">
                        Cross-line
                      </dt>
                      <dd className="text-ink-muted">{p.crossLine}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-ink-dim font-mono uppercase tracking-wider w-20 shrink-0">
                        Validated
                      </dt>
                      <dd className="text-ink-muted">{p.validatedBy.join(", ")}</dd>
                    </div>
                  </dl>

                  {linkedCalls.length > 0 && (
                    <div
                      className="mt-2 pt-3 border-t"
                      style={{ borderColor: "var(--border-soft)" }}
                    >
                      <div className="text-[10px] font-mono uppercase tracking-wider text-ink-dim mb-1.5">
                        Použito v callech ({linkedCalls.length})
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {linkedCalls.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/calls/${c.slug}`}
                            className="text-xs px-2 py-0.5 rounded-md hover:bg-[var(--surface-muted)] text-ink-muted hover:text-ink transition-colors"
                            style={{ background: "var(--surface-muted)" }}
                          >
                            {c.prospect}
                            {c.total !== null && (
                              <span className="ml-1 text-ink-dim">
                                · {c.total}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* ŠPATNÉ PATTERNY ------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-baseline justify-between mb-4 px-1 flex-wrap gap-2">
            <h2 className="serif-display text-2xl">🔴 Špatné patterny</h2>
            <span
              className="text-[10px] font-mono uppercase tracking-widest"
              style={{ color: "var(--lost)" }}
            >
              {antiPatterns.length} anti-patterns · přestat
            </span>
          </div>
          <p className="text-ink-muted text-sm mb-5 px-1 max-w-3xl leading-relaxed">
            Co se opakuje napříč cally s negativním efektem. Pro každý:
            citát z konkrétního callu, proč to vadí, co měl říct místo toho.
            Drill = vzít konkrétní pattern + role-play.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {antiPatterns.map((ap, i) => {
              const exampleCall = callBySlug.get(ap.exampleFromSlug);
              const linkedCalls = ap.appearsInCalls
                .map((slug) => callBySlug.get(slug))
                .filter((c): c is NonNullable<typeof c> => !!c);
              return (
                <article
                  key={ap.id}
                  className="surface-card p-5 sm:p-6 flex flex-col gap-3"
                  style={{
                    borderLeft: "3px solid var(--lost)",
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div
                        className="text-[10px] font-mono uppercase tracking-wider mb-1"
                        style={{ color: "var(--lost)" }}
                      >
                        Anti-pattern {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="serif-display text-xl">{ap.title}</h3>
                    </div>
                    <span
                      className="shrink-0 px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider"
                      style={{
                        background: "var(--lost-tint)",
                        color: "var(--lost)",
                      }}
                    >
                      {linkedCalls.length}× v callech
                    </span>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-ink-dim mb-1">
                      Co se děje
                    </div>
                    <p className="text-sm text-ink-muted leading-relaxed">
                      {ap.whatHappens}
                    </p>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-ink-dim mb-1">
                      Proč to vadí
                    </div>
                    <p className="text-sm text-ink-muted leading-relaxed">
                      {ap.why}
                    </p>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-ink-dim mb-1.5">
                      Reálný citát{" "}
                      {exampleCall && (
                        <>
                          ·{" "}
                          <Link
                            href={`/calls/${exampleCall.slug}`}
                            className="hover:text-ink-strong hover:underline"
                          >
                            {exampleCall.prospect}
                          </Link>
                        </>
                      )}
                    </div>
                    <blockquote
                      className="text-sm italic"
                      style={{
                        borderLeft: "2px solid var(--lost)",
                        background: "var(--lost-tint)",
                        color: "var(--ink-strong)",
                        borderRadius: "0 6px 6px 0",
                        padding: "0.55rem 0.9rem",
                      }}
                    >
                      {ap.exampleQuote}
                    </blockquote>
                  </div>

                  <div>
                    <div
                      className="text-[10px] font-mono uppercase tracking-wider mb-1.5"
                      style={{ color: "var(--closed)" }}
                    >
                      → Co měl říct místo toho
                    </div>
                    <blockquote
                      className="text-sm"
                      style={{
                        borderLeft: "2px solid var(--closed)",
                        background: "var(--closed-tint)",
                        color: "var(--ink-strong)",
                        borderRadius: "0 6px 6px 0",
                        padding: "0.55rem 0.9rem",
                      }}
                    >
                      {ap.fix}
                    </blockquote>
                  </div>

                  {linkedCalls.length > 0 && (
                    <div
                      className="pt-3 border-t"
                      style={{ borderColor: "var(--border-soft)" }}
                    >
                      <div className="text-[10px] font-mono uppercase tracking-wider text-ink-dim mb-1.5">
                        Objevilo se v ({linkedCalls.length})
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {linkedCalls.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/calls/${c.slug}`}
                            className="text-xs px-2 py-0.5 rounded-md hover:bg-[var(--surface-muted)] text-ink-muted hover:text-ink transition-colors"
                            style={{ background: "var(--surface-muted)" }}
                          >
                            {c.prospect}
                            {c.total !== null && (
                              <span className="ml-1 text-ink-dim">
                                · {c.total}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {goodPatterns.length === 0 && antiPatterns.length === 0 && (
          <div className="surface-card p-6 text-sm text-ink-muted leading-relaxed">
            Zatím tu nic není. Vzorce se plní při rozboru hovorů do{" "}
            <code className="text-xs">data/sales-coach/patterns/master.json</code> a{" "}
            <code className="text-xs">anti.json</code> — jakmile se něco zopakuje
            ve víc hovorech, Claude to sem zapíše.
          </div>
        )}
      </main>
    </>
  );
}
