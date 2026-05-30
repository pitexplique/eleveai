// components/Footer.tsx
import Link from "next/link";

const outils = [
  { label: "Coach Maths IA",   href: "/coach-maths-ia" },
  { label: "Parcours",         href: "/parcours" },
  { label: "Coach Brevet",     href: "/coach-brevet" },
  { label: "Coach Bac Spé",    href: "/coach-bac-spe" },
  { label: "Calcul rapide",    href: "/calcul-rapide" },
  { label: "English Maths",    href: "/english-maths" },
  { label: "Défis du jour",    href: "/defis-du-jour" },
  { label: "Concours général", href: "/concours-general" },
];

const espaces = [
  { label: "Établissements scolaires", href: "/espace-ecoles" },
  { label: "Espace élèves",  href: "/espace-eleves" },
  { label: "Espace parents", href: "/espace-parents" },
  { label: "Espace profs",   href: "/espace-profs" },
  { label: "Connexion élève / prof", href: "/auth/signin-eleve" },
];

const infos = [
  { label: "Pourquoi EleveAI",  href: "/pourquoi-eleveai" },
  { label: "Qui sommes-nous",   href: "/qui-sommes-nous" },
  { label: "Blog",              href: "/blog" },
  { label: "FAQ",               href: "/faq" },
  { label: "Contact",           href: "/contact" },
];

const legal = [
  { label: "Mentions légales",        href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
  { label: "CGU",                     href: "/cgu" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#041B33]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">

        {/* GRILLE PRINCIPALE */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* MARQUE */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-200 via-emerald-300 to-amber-300 text-[#041B33] font-extrabold text-sm shadow">
                EA
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-extrabold text-white">
                  Eleve<span className="text-emerald-300">AI</span>
                </span>
                <span className="text-xs text-slate-400">
                  Comprendre · S&apos;entraîner · Réussir
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              Plusieurs portes pour apprendre les maths et suivre la progression
              des élèves. Du CM1 au Bac, conçu à La Réunion.
            </p>

            <Link
              href="/contact"
              className="inline-flex rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-200 hover:bg-emerald-400/20 transition"
            >
              📩 Nous contacter
            </Link>
          </div>

          {/* OUTILS */}
          <div>
            <h3 className="mb-3 text-sm font-black text-slate-100">Outils</h3>
            <ul className="space-y-2">
              {outils.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 hover:text-emerald-300 transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ESPACES */}
          <div>
            <h3 className="mb-3 text-sm font-black text-slate-100">Espaces</h3>
            <ul className="space-y-2">
              {espaces.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 hover:text-sky-300 transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mb-3 mt-6 text-sm font-black text-slate-100">Infos</h3>
            <ul className="space-y-2">
              {infos.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 hover:text-sky-300 transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CLASSES + LÉGAL */}
          <div>
            <h3 className="mb-3 text-sm font-black text-slate-100">Par classe</h3>
            <ul className="space-y-2">
              {["CM1", "CM2", "6e", "5e", "4e", "3e", "Terminale Spé"].map((c) => (
                <li key={c}>
                  <Link
                    href={`/coach-maths-ia?classe=${c.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-slate-400 hover:text-amber-300 transition"
                  >
                    Maths {c}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mb-3 mt-6 text-sm font-black text-slate-100">Légal</h3>
            <ul className="space-y-2">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-slate-500 hover:text-slate-300 transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BAS DE PAGE */}
        <div className="mt-10 flex flex-col gap-2 border-t border-slate-800 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} EleveAI — Tous droits réservés.</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
            <span>🏝️ Conçu à La Réunion</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <Link href="/mentions-legales" className="hover:text-slate-300 transition">Mentions légales</Link>
            <span className="hidden sm:inline text-slate-700">•</span>
            <Link href="/politique-confidentialite" className="hover:text-slate-300 transition">Confidentialité</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
