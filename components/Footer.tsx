import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        {/* Bandeau partenariat / collège pilote */}
        <div className="mb-8 rounded-2xl border border-sky-700/60 bg-sky-900/10 px-4 py-3 sm:px-6 sm:py-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm sm:text-base text-sky-100">
            <span className="font-semibold">Collège pilote ?</span>{" "}
            Devenez établissement partenaire d’EleveAI à La Réunion et en France.
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/offre-pilote"
              className="rounded-xl border border-sky-500 bg-sky-500/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-sky-100 hover:bg-sky-500/20"
            >
              Découvrir l’offre pilote
            </Link>
            <Link
              href="/sponsors"
              className="rounded-xl border border-amber-400/70 bg-amber-400/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-amber-200 hover:bg-amber-400/20"
            >
              Devenir sponsor
            </Link>
          </div>
        </div>

        {/* Grille principale */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Bloc logo / pitch */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-slate-900 font-bold">
                EA
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-slate-50">
                  EleveAI
                </span>
                <span className="text-xs text-slate-400">
                  IA & neurosciences pour l’éducation
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Aide les élèves, profs et équipes éducatives à créer des contenus
              clairs, DYS-friendly et conformes à Eduscol grâce à l’IA.
            </p>

            {/* ✅ Presse (ajout léger, sans changer le reste) */}
            <div className="pt-1">
              <Link
                href="/presse"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-900"
              >
                📰 Presse & kit média →
              </Link>
            </div>
          </div>

          {/* Produit */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-3">
              Espaces EleveAI
            </h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link
                  href="/espace-eleves"
                  className="text-slate-300 hover:text-sky-300"
                >
                  Espace élèves
                </Link>
              </li>
              <li>
                <Link
                  href="/espace-profs"
                  className="text-slate-300 hover:text-sky-300"
                >
                  Espace profs
                </Link>
              </li>
              <li>
                <Link
                  href="/espace-administration"
                  className="text-slate-300 hover:text-sky-300"
                >
                  Espace administration
                </Link>
              </li>
              <li>
                <Link
                  href="/parents"
                  className="text-slate-300 hover:text-sky-300"
                >
                  Espace parents
                </Link>
              </li>
              <li>
                <Link
                  href="/concours-ia"
                  className="text-slate-300 hover:text-sky-300"
                >
                  Concours IA
                </Link>
              </li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-3">
              Ressources
            </h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link
                  href="/prompts"
                  className="text-slate-300 hover:text-sky-300"
                >
                  Générateurs de prompts
                </Link>
              </li>
              <li>
                <Link
                  href="/tarifs"
                  className="text-slate-300 hover:text-sky-300"
                >
                  Tarifs & abonnements
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-slate-300 hover:text-sky-300"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-slate-300 hover:text-sky-300"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-300 hover:text-sky-300"
                >
                  Contact
                </Link>
              </li>
              {/* ✅ Presse dans Ressources (visibilité, SEO, cohérent) */}
              <li>
                <Link
                  href="/presse"
                  className="text-slate-300 hover:text-sky-300"
                >
                  Presse & kit média
                </Link>
              </li>
            </ul>
          </div>

          {/* Légal / mentions */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-3">
              À propos & légal
            </h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-slate-300 hover:text-sky-300"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-confidentialite"
                  className="text-slate-300 hover:text-sky-300"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cgu" className="text-slate-300 hover:text-sky-300">
                  CGU
                </Link>
              </li>
              {/* ✅ Optionnel mais utile : si tu crées une page charte */}
              <li>
                <Link
                  href="/charte"
                  className="text-slate-300 hover:text-sky-300"
                >
                  Charte anti-triche
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bas de page */}
        <div className="mt-8 flex flex-col gap-2 border-t border-slate-800 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} EleveAI. Tous droits réservés.</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
            <span>Conçu à La Réunion pour les collèges & lycées de France.</span>
            <span className="hidden sm:inline">•</span>
            <Link href="/presse" className="hover:text-slate-200">
              Presse
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

