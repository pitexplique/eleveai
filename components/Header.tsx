"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();

  const isActive = (url: string) => path === url;

  return (
    <header className="w-full bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo + nom */}
        <Link href="/" className="text-[#0047B6] font-extrabold text-lg sm:text-xl">
          EleveAI
        </Link>

        {/* Menu */}
        <nav className="flex gap-2 text-xs sm:text-sm">
          <Link
            href="/chat"
            className={`px-3 py-1.5 rounded-full font-semibold transition ${
              isActive("/chat")
                ? "bg-[#0047B6] text-white shadow"
                : "bg-sky-50 text-[#0047B6] border border-sky-200 hover:bg-sky-100"
            }`}
          >
            💬 Chat
          </Link>

          <Link
            href="/prompts"
            className={`px-3 py-1.5 rounded-full font-semibold transition ${
              isActive("/prompts")
                ? "bg-amber-400 text-black shadow"
                : "bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200"
            }`}
          >
            📘 Prompts du prof
          </Link>

          <Link
            href="/concours-ia"
            className={`px-3 py-1.5 rounded-full font-semibold transition ${
              isActive("/concours-ia")
                ? "bg-[#0047B6] text-white shadow"
                : "bg-sky-50 text-[#0047B6] border border-sky-200 hover:bg-sky-100"
            }`}
          >
            🌍 Concours
          </Link>
          <Link
            href="/profs"
            className={`px-3 py-1.5 rounded-full font-semibold transition ${
              isActive("/profs")
                ? "bg-emerald-600 text-white shadow"
                : "bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100"
            }`}
          >
            🧑‍🏫 Espace prof
          </Link>
                    <Link
            href="/sponsors"
            className={`px-3 py-1.5 rounded-full font-semibold transition ${
              isActive("/sponsors")
                ? "bg-slate-900 text-white shadow"
                : "bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200"
            }`}
          >
            🤝 Sponsors
          </Link>
        </nav>
      </div>
    </header>
  );
}
