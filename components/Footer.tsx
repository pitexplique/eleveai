import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        {/* Bandeau partenariat / collège pilote */}
        <div className="mb-8 rounded-2xl border border-sky-700/60 bg-sky-900/10 px-4 py-3 sm:px-6 sm:py-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm sm:text-base text-sky-100">
            <span className="font-semibold">Établissement pilote ?</span>{" "}
            Testez EleveAI (IA pédagogique encadrée) dans votre collège ou lycée.
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/offre-pilote"
              className="rounded-xl border border-sky-500 bg-sky-500/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-sky-100 hover:bg-sky-500/20"
            >
              Découvrir l’offre pilote
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-amber-400/70 bg-amber-400/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-amber-200 hover:bg-amber-400/20"
            >
              Demander un devis
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
                <span className="text-sm font-semibold text-slate-50">EleveAI</span>
                <span className="text-xs text-slate-400">
                  IA pédagogique encadrée (Profs · Élèves · Parents)
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              EleveAI aide les professeurs, élèves et parents à utiliser l’IA de façon
              responsable : consignes, étapes, justification, correction — sans “fait à la place”.
            </p>

            {/* Presse */}
            <div className="pt-1">
              <Link
                href="/presse"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-900"
              >
                📰 Presse & kit média →
              </Link>
            </div>
          </div>

          {/* Espaces */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-3">
              Espaces
            </h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/espace-profs" className="text-slate-300 hover:text-sky-300">
                  Espace Profs (prompts pédagogiques)
                </Link>
              </li>
              <li>
                <Link href="/espace-eleves" className="text-slate-300 hover:text-sky-300">
                  Espace Élèves (s’entraîner)
                </Link>
              </li>
              <li>
                <Link href="/espace-parents" className="text-slate-300 hover:text-sky-300">
                  Espace Parents (accompagner)
                </Link>
              </li>
              <li>
                <Link href="/atelier-IA" className="text-slate-300 hover:text-sky-300">
                  atelier-IA (cadre & méthode)
                </Link>
              </li>
              <li>
                <Link href="/concours-ia" className="text-slate-300 hover:text-sky-300">
                  Concours IA (projets)
                </Link>
              </li>
            </ul>
          </div>

          {/* Établissements */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-3">
              Établissements
            </h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/offre-pilote" className="text-slate-300 hover:text-sky-300">
                  Offre pilote (8 semaines)
                </Link>
              </li>
              <li>
                <Link href="/tarifs#offre-etablissement" className="text-slate-300 hover:text-sky-300">
                  Offre établissement
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-sky-300">
                  Devis & contact
                </Link>
              </li>
            </ul>

            <div className="mt-3 text-xs text-slate-500">
              (Les espaces “administratif / vie scolaire / services” sont accessibles après connexion.)
            </div>
          </div>

          {/* À propos / légal */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-3">
              À propos & légal
            </h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/tarifs" className="text-slate-300 hover:text-sky-300">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/pourquoi-nos-tarifs-sont-justes" className="text-slate-300 hover:text-sky-300">
                  Pourquoi nos tarifs sont justes
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-slate-300 hover:text-sky-300">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="text-slate-300 hover:text-sky-300">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cgu" className="text-slate-300 hover:text-sky-300">
                  CGU
                </Link>
              </li>
              <li>
                <Link href="/charte" className="text-slate-300 hover:text-sky-300">
                  Charte anti-triche
                </Link>
              </li>
              <li>
                <Link href="/presse" className="text-slate-300 hover:text-sky-300">
                  Presse & kit média
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-sky-300">
                 Contact
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
            <Link href="/pourquoi-nos-tarifs-sont-justes" className="hover:text-slate-200">
              Transparence tarifs
            </Link>
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


