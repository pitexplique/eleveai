"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
  badge?: string;
};

const MAIN_LINKS: NavItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/espace-eleves", label: "Espace élèves (IA)" },
  { href: "/espace-profs", label: "Espace profs (IA)" },
  { href: "/parents", label: "Espace parents (IA)" },
  {
    href: "/espace-administration",
    label: "Assistant administratif (IA)",
  },
  {
    href: "/espace-vie-scolaire",
    label: "Vie scolaire (IA)",
  },
];

const SECONDARY_LINKS: NavItem[] = [
  { href: "/prompts", label: "Générateurs de prompts" },
  { href: "/concours-ia", label: "Concours IA" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/qui-suis-je", label: "Qui suis-je ?" },
  { href: "/partenaires", label: "Partenaires & sponsors" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:py-4">
        
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 text-slate-900 font-bold">
              EA
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm sm:text-base font-semibold text-slate-50">
                EleveAI
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400">
                IA pédagogique pour élèves, enseignants & parents
              </span>
            </div>
          </Link>
        </div>

        {/* MENU DESKTOP */}
        <div className="hidden items-center gap-3 lg:flex">
          {MAIN_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "px-3 py-1.5 text-sm rounded-xl border transition flex items-center gap-2",
                  active
                    ? "border-sky-500 bg-sky-500/10 text-sky-100 shadow-[0_0_0_1px_rgba(56,189,248,0.4)]"
                    : "border-transparent text-slate-300 hover:border-slate-600 hover:bg-slate-900",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Sous-menu : Plus */}
          <div className="relative">
            <details className="group">
              <summary className="list-none px-3 py-1.5 text-sm rounded-xl border border-slate-700 text-slate-200 cursor-pointer hover:bg-slate-900 hover:border-slate-500">
                Plus
              </summary>
              <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-700 bg-slate-950/95 shadow-xl backdrop-blur">
                <div className="flex flex-col py-2">
                  {SECONDARY_LINKS.map((link) => {
                    const active = isActive(pathname, link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={[
                          "px-4 py-1.5 text-sm",
                          active
                            ? "text-sky-300 bg-sky-500/10 border-l-2 border-sky-500"
                            : "text-slate-300 hover:bg-slate-900",
                        ].join(" ")}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </details>
          </div>
        </div>

        {/* BURGER MOBILE */}
        <button
          className="inline-flex items-center justify-center rounded-md border border-slate-700 p-2 text-slate-200 lg:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          <div className="space-y-1">
            <span className="block h-0.5 w-5 bg-slate-200" />
            <span className="block h-0.5 w-5 bg-slate-200" />
            <span className="block h-0.5 w-5 bg-slate-200" />
          </div>
        </button>
      </nav>

      {/* MENU MOBILE */}
      {open && (
        <div className="border-t border-slate-800 bg-slate-950 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3">
            {[...MAIN_LINKS, ...SECONDARY_LINKS].map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "w-full rounded-xl px-3 py-2 text-sm border flex items-center gap-2",
                    active
                      ? "border-sky-500 bg-sky-500/10 text-sky-100 shadow-[0_0_0_1px_rgba(56,189,248,0.4)]"
                      : "border-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-900",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
