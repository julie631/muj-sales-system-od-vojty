"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CONFIG } from "@/lib/config";

const LINKS = [
  { href: "/", label: "Overview" },
  { href: "/calls", label: "Calls" },
  { href: "/roleplays", label: "Roleplays" },
  { href: "/patterns", label: "Patterns" },
  { href: "/notes", label: "Notes" },
  { href: "/analytics", label: "Analytics" },
  { href: "/progress", label: "Progress" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md"
      style={{
        borderColor: "var(--border-soft)",
        background: "rgba(244, 244, 244, 0.85)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold text-white"
            style={{ background: "var(--brand)" }}
          >
            S
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-medium serif-display">Sales Coach</span>
            {CONFIG.ownerName && (
              <span className="text-[11px] text-ink-dim font-mono">{CONFIG.ownerName}</span>
            )}
          </div>
        </Link>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <nav className="hidden lg:flex items-center gap-0.5">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-2.5 py-1.5 rounded-md text-[13px] transition-colors ${
                  isActive(l.href)
                    ? "text-ink-strong bg-[var(--surface-muted)]"
                    : "text-ink-muted hover:text-ink hover:bg-[var(--surface-muted)]"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 rounded-md hover:bg-[var(--surface-muted)] text-ink"
            aria-label="menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="lg:hidden border-t bg-page px-4 py-2 grid grid-cols-2 gap-1"
          style={{ borderColor: "var(--border-soft)" }}
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-md text-sm transition-colors ${
                isActive(l.href)
                  ? "text-ink-strong bg-[var(--surface-muted)]"
                  : "text-ink-muted hover:text-ink hover:bg-[var(--surface-muted)]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
