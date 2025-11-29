"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo EleveAI en bleu, comme avant */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight"
          style={{ color: "#0050FF" }}
        >
          EleveAI
        </Link>

        {/* Menu desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/chat"
            className="rounded-full border px-3 py-1 text-sm text-purple-700 bg-purple-50 hover:bg-purple-100"
          >
            💬 Chat
          </Link>

          <Link
            href="/profs"
            className="rounded-full border px-3 py-1 text-sm font-semibold"
            style={{ backgroundColor: "#FFCC00", color: "#000" }}
          >
            👨‍🏫 Espace prof
          </Link>

          <Link
            href="/eleve"
            className="rounded-full border px-3 py-1 text-sm"
            style={{ backgroundColor: "#E5FFE5", color: "#008800" }}
          >
            🎒 Élèves
          </Link>

          <Link
            href="/parents"
            className="rounded-full border px-3 py-1 text-sm"
            style={{ backgroundColor: "#E6F2FF", color: "#0066CC" }}
          >
            👨‍👩‍👧 Parents
          </Link>

          <Link
            href="/blog"
            className="rounded-full border px-3 py-1 text-sm"
            style={{ backgroundColor: "#FFE6F3", color: "#CC0088" }}
          >
            📝 Blog
          </Link>

          <Link
            href="/concours-ia"
            className="rounded-full border px-3 py-1 text-sm"
            style={{ backgroundColor: "#EAFBFF", color: "#0088CC" }}
          >
            🌍 Concours
          </Link>
        </div>

        {/* Bouton menu mobile */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Ouvrir le menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                open
                  ? "M6 18L18 6M6 6l12 12" // croix
                  : "M4 6h16M4 12h16M4 18h16" // burger
              }
            />
          </svg>
        </button>
      </nav>

      {/* Menu mobile déroulant */}
      {open && (
        <div className="space-y-2 border-t bg-white px-4 py-4 md:hidden">
          <NavLinkMobile href="/chat" onClick={() => setOpen(false)}>
            💬 Chat
          </NavLinkMobile>
          <NavLinkMobile href="/profs" onClick={() => setOpen(false)}>
            👨‍🏫 Espace prof
          </NavLinkMobile>
          <NavLinkMobile href="/eleve" onClick={() => setOpen(false)}>
            🎒 Élèves
          </NavLinkMobile>
          <NavLinkMobile href="/parents" onClick={() => setOpen(false)}>
            👨‍👩‍👧 Parents
          </NavLinkMobile>
          <NavLinkMobile href="/blog" onClick={() => setOpen(false)}>
            📝 Blog
          </NavLinkMobile>
          <NavLinkMobile href="/concours-ia" onClick={() => setOpen(false)}>
            🌍 Concours
          </NavLinkMobile>
        </div>
      )}
    </header>
  );
}

/** Petit composant pour avoir les mêmes pastilles en mobile */
function NavLinkMobile({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-full border px-4 py-2 text-sm text-center bg-gray-50 hover:bg-gray-100"
    >
      {children}
    </Link>
  );
}
