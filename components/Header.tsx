"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
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
                IA pédagogique, Eduscol
              </span>
            </div>
          </Link>
        </div>

        {/* MENU DESKTOP */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/profs" className="text-sm text-slate-200 hover:text-emerald-300">
            Profs
          </Link>

          <Link href="/eleve" className="text-sm text-slate-200 hover:text-sky-300">
            Élèves
          </Link>

          <Link href="/parents" className="text-sm text-slate-200 hover:text-indigo-300">
            Parents
          </Link>

          <Link href="/blog" className="text-sm text-slate-200 hover:text-indigo-300">
            Blog
          </Link>

          {/* 🔵 Nouveau lien Administration */}
          <Link
            href="/espace-administration"
            className="text-sm text-slate-200 hover:text-fuchsia-300"
          >
            Administration
          </Link>

          <Link
            href="/offre-pilote"
            className="text-sm text-slate-200 hover:text-amber-300"
          >
            Collège pilote
          </Link>

        </div>

        {/* MENU MOBILE - BOUTON */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex items-center justify-center rounded-md border border-slate-700 p-1.5 text-slate-100 md:hidden"
        >
          <span className="sr-only">Ouvrir le menu</span>

          {/* Icône burger animée */}
          <div className="space-y-1">
            <span
              className={`block h-0.5 w-5 bg-slate-100 transition-transform ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-slate-100 transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-slate-100 transition-transform ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* MENU MOBILE DÉROULANT */}
      {open && (
        <div className="border-t border-slate-800 bg-slate-950 md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3 space-y-2">

            <Link
              href="/profs"
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-2 text-sm text-slate-100 hover:bg-slate-900"
            >
              Profs – créer des cours & prompts
            </Link>

            <Link
              href="/eleve"
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-2 text-sm text-slate-100 hover:bg-slate-900"
            >
              Élèves – aide aux devoirs & révisions
            </Link>

            <Link
              href="/parents"
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-2 text-sm text-slate-100 hover:bg-slate-900"
            >
              Parents – accompagner son enfant
            </Link>

            {/* 🔵 Nouveau lien Administration dans le menu mobile */}
            <Link
              href="/espace-administration"
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-2 text-sm text-slate-100 hover:bg-slate-900"
            >
              Administration – direction & secrétariat
            </Link>


          </div>
        </div>
      )}
    </header>
  );
}
