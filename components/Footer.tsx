// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        {/* Bandeau "pilotage" ultra simple */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/30 px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-200">
              <span className="font-semibold text-emerald-200">Valeria</span>{" "}
              structure vos usages IA : objectifs mesurables, indicateurs, itérations.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/optimiseur"
                className="rounded-xl border border-emerald-400/60 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-100 hover:bg-emerald-400/20"
              >
                🎯 Optimiseur Valeria
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-amber-400/70 bg-amber-400/10 px-3 py-2 text-xs font-semibold text-amber-200 hover:bg-amber-400/20"
              >
                📩 Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Grille principale (simple, business, comme la sidebar) */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marque / Pitch + "Valeria inside" */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-slate-900 font-extrabold">
                  EA
                </div>

                {/* ✅ label discret "Valeria inside" */}
                <span className="absolute -top-2 -right-2 rounded-full border border-slate-800 bg-slate-950 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                  Valeria inside
                </span>
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-slate-50">EleveAI</span>
                <span className="text-xs text-slate-400">
                  IA encadrée • Pilotage • Amélioration continue
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Une IA pédagogique structurée par des critères mesurables, des traces et des itérations
              — pour aider sans remplacer.
            </p>

            <div className="pt-1 flex flex-wrap gap-2">
              <Link
                href="/profs"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-900"
              >
                🎓 Éducation →
              </Link>
              <Link
                href="/valeria-consulting"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-900"
              >
                🏢 Entreprises →
              </Link>
            </div>
          </div>

          {/* Éducation (essentiel) */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-3">Éducation</h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/espace-profs" className="text-slate-300 hover:text-sky-300">
                  Espace Profs
                </Link>
              </li>
              <li>
                <Link href="/atelier-IA" className="text-slate-300 hover:text-sky-300">
                  Atelier-IA
                </Link>
              </li>
              <li>
                <Link href="/espace-eleves" className="text-slate-300 hover:text-sky-300">
                  Espace Élèves
                </Link>
              </li>
              <li>
                <Link href="/espace-parents" className="text-slate-300 hover:text-sky-300">
                  Espace Parents
                </Link>
              </li>
            </ul>

            <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/25 p-3">
              <p className="text-[11px] leading-relaxed text-slate-400">
                <span className="text-slate-200 font-semibold">Objectif :</span>{" "}
                des ressources claires, mesurables et réutilisables.
              </p>
            </div>
          </div>

          {/* Entreprises (essentiel) */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-3">Entreprises</h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/valeria-consulting" className="text-slate-300 hover:text-sky-300">
                  Valeria Consulting
                </Link>
              </li>
              <li>
                <Link href="/optimiseur" className="text-slate-300 hover:text-emerald-200">
                  Optimisation de prompts (score)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-sky-300">
                  Audit / devis
                </Link>
              </li>
            </ul>

            <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/25 p-3">
              <p className="text-[11px] leading-relaxed text-slate-400">
                <span className="text-slate-200 font-semibold">Approche :</span>{" "}
                indicateurs, conformité, amélioration continue (pilotage).
              </p>
            </div>
          </div>

          {/* Essentiels (minimal légal) */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-3">Essentiels</h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/tarifs" className="text-slate-300 hover:text-sky-300">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-sky-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-slate-300 hover:text-sky-300">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-confidentialite"
                  className="text-slate-300 hover:text-sky-300"
                >
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bas de page minimal */}
        <div className="mt-8 flex flex-col gap-2 border-t border-slate-800 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} EleveAI.</p>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
            <span>Conçu à La Réunion.</span>
            <span className="hidden sm:inline">•</span>
            <Link href="/tarifs" className="hover:text-slate-200">
              Tarifs
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/contact" className="hover:text-slate-200">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}