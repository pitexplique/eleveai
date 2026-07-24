// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";

const outils = [
  { label: "Coach English IA", href: "/coach-ia/english-maths" },
  { label: "Coach Maths IA", href: "/coach-ia/maths" },
  { label: "Coach Français IA", href: "/coach-ia/francais" },
  { label: "Parcours English", href: "/parcours-english-maths" },
  { label: "Parcours Espagnol", href: "/parcours-espagnol" },
  { label: "Parcours Français", href: "/parcours-francais" },
  { label: "Parcours", href: "/parcours" },
  { label: "Coach Brevet", href: "/coach-brevet" },
  { label: "Coach Bac Spé", href: "/coach-bac-spe" },
  { label: "Calcul rapide", href: "/calcul-rapide" },
  { label: "English Maths", href: "/english-maths" },
  { label: "Défis du jour", href: "/defis-du-jour" },
  { label: "Cartes de révision", href: "/cahier-vacances-cartes" },
  { label: "Qui suis-je ? à imprimer", href: "/qui-suis-je-a-imprimer" },
  { label: "Concours général", href: "/concours-general" },
];

// Le Journal — la nouveauté du jour + les histoires « comprendre » (simulateurs,
// « un peu de maths »). Mises en tête du footer en liens SERVEUR toujours
// présents dans le HTML : c'est par là que Google découvre le cœur du journal,
// que la nav (cachée derrière la connexion) ne lui montrait pas.
const journalQuotidien = [
  { label: "Le Journal du jour", href: "/accueil" },
  { label: "Défis du jour", href: "/defis-du-jour" },
  { label: "Dictée du jour", href: "/dictee-du-jour" },
  { label: "Maths Réel · 974", href: "/maths-974" },
];

const unPeuDeMaths = [
  { label: "Cyclone", href: "/simulateur-cyclone" },
  { label: "Volcan", href: "/simulateur-volcan" },
  { label: "Barrage", href: "/simulateur-barrage" },
  { label: "Lagon", href: "/simulateur-lagon" },
  { label: "Diagonale des Fous", href: "/diagonale-des-fous" },
  { label: "Loi de Pareto", href: "/loi-pareto" },
  { label: "Loi normale", href: "/loi-normale" },
  { label: "Exponentielle", href: "/exponentielle" },
];

const espaces = [
  { label: "Établissements scolaires", href: "/espace-ecoles" },
  { label: "Espace élèves", href: "/espace-eleves" },
  { label: "Espace parents", href: "/espace-parents" },
  { label: "Espace profs", href: "/espace-profs" },
  { label: "Français de l'étranger", href: "/francais-de-l-etranger" },
  { label: "Connexion élève / prof", href: "/auth/signin-eleve" },
];

const infos = [
  { label: "Pourquoi EleveAI", href: "/pourquoi-eleveai" },
  { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
  { label: "Charte d'usage de l'IA", href: "/charte" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Pourquoi nos tarifs sont justes", href: "/pourquoi-nos-tarifs-sont-justes" },
  { label: "Presse", href: "/presse" },
  { label: "Partenaires", href: "/partenaires" },
  { label: "Entreprises : participez à l'aventure", href: "/entreprises" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const legal = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
  { label: "CGU", href: "/cgu" },
];

const englishNiveaux = [
  { label: "A1", slug: "a1" },
  { label: "A2", slug: "a2" },
  { label: "B1", slug: "b1" },
  { label: "B2", slug: "b2" },
];

const mathsClasses = [
  { label: "CP", slug: "cp" },
  { label: "CE1", slug: "ce1" },
  { label: "CE2", slug: "ce2" },
  { label: "CM1", slug: "cm1" },
  { label: "CM2", slug: "cm2" },
  { label: "6e", slug: "6e" },
  { label: "5e", slug: "5e" },
  { label: "4e", slug: "4e" },
  { label: "3e", slug: "3e" },
  { label: "Terminale Spé", slug: "terminale-spe" },
];

const francaisClasses = [
  { label: "CP", slug: "cp" },
  { label: "CE1", slug: "ce1" },
  { label: "CE2", slug: "ce2" },
  { label: "CM1", slug: "cm1" },
  { label: "CM2", slug: "cm2" },
  { label: "6e", slug: "6e" },
  { label: "5e", slug: "5e" },
  { label: "4e", slug: "4e" },
  { label: "3e", slug: "3e" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#041B33]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">

        {/* Bandeau « Le Journal » — en tête du footer. Rend visibles pour Google
            (liens serveur, toujours dans le HTML) les destinations que la nav
            cachait : le journal du jour, les rituels quotidiens et les histoires
            « un peu de maths » (les simulateurs de l'île). */}
        <section className="mb-10 border-b border-slate-800 pb-8">
          <h2 className="text-sm font-black text-slate-100">
            Le Journal{" "}
            <span className="font-semibold text-emerald-300">· une nouveauté chaque jour</span>
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Chaque matin à La Réunion : un défi, une dictée et une histoire de
            sciences à comprendre.
          </p>

          <nav aria-label="Le Journal" className="mt-4 flex flex-wrap gap-2">
            {journalQuotidien.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-100 transition hover:bg-emerald-400/20"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <h3 className="mb-2 mt-5 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
            Un peu de maths — les machines dans ta main
          </h3>
          <nav aria-label="Un peu de maths" className="flex flex-wrap gap-2">
            {unPeuDeMaths.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border border-slate-700 bg-slate-800/40 px-3 py-1.5 text-xs text-slate-300 transition hover:border-amber-300/40 hover:text-amber-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </section>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-200 via-emerald-300 to-amber-300 text-sm font-extrabold text-[#041B33] shadow">
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
              Maths, français, anglais, espagnol et IA, avec un coach qui
              s&apos;adapte. De l&apos;école au lycée, conçu à La Réunion.
            </p>

            {/* Le visage derrière le site — même photo que l'édito de
                l'accueil : on sait qui parle. */}
            <Link href="/qui-sommes-nous" className="group flex items-center gap-3">
              <Image
                src="/images/avatar-frederic-Lacoste.jpg"
                alt="Frédéric Lacoste"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full border-2 border-emerald-300/40 object-cover"
              />
              <span className="text-xs leading-snug text-slate-400">
                <span className="font-bold text-slate-200 group-hover:text-emerald-300">
                  Frédéric Lacoste
                </span>
                <br />
                professeur de maths à La Réunion
              </span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-400/20"
            >
              Nous contacter
            </Link>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-black text-slate-100">Outils</h3>
            <ul className="space-y-2">
              {outils.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 transition hover:text-emerald-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-black text-slate-100">Espaces</h3>
            <ul className="space-y-2">
              {espaces.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 transition hover:text-sky-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mb-3 mt-6 text-sm font-black text-slate-100">Infos</h3>
            <ul className="space-y-2">
              {infos.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 transition hover:text-sky-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-black text-slate-100">English</h3>
            <ul className="space-y-2 mb-6">
              {englishNiveaux.map((n) => (
                <li key={n.slug}>
                  <Link
                    href={`/coach-ia/english?niveau=${n.slug}`}
                    className="text-sm text-slate-400 transition hover:text-sky-300"
                  >
                    English {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/parcours-english-maths"
                  className="text-sm text-slate-400 transition hover:text-sky-300"
                >
                  Parcours English
                </Link>
              </li>
            </ul>

            <h3 className="mb-3 text-sm font-black text-slate-100">Maths</h3>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-1">
              {mathsClasses.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/coach-ia/maths?classe=${c.slug}`}
                    className="text-sm text-slate-400 transition hover:text-amber-300"
                  >
                    Maths {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-black text-slate-100">Français</h3>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-1">
              {francaisClasses.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/coach-ia/francais?classe=${c.slug}`}
                    className="text-sm text-slate-400 transition hover:text-sky-300"
                  >
                    Français {c.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mb-3 mt-6 text-sm font-black text-slate-100">Legal</h3>
            <ul className="space-y-2">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-slate-500 transition hover:text-slate-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-800 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} EleveAI - Tous droits réservés.</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
            <span>Conçu à La Réunion</span>
            <span className="hidden text-slate-700 sm:inline">•</span>
            <Link href="/mentions-legales" className="transition hover:text-slate-300">
              Mentions légales
            </Link>
            <span className="hidden text-slate-700 sm:inline">•</span>
            <Link href="/politique-confidentialite" className="transition hover:text-slate-300">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
