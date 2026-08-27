// components/Footer.tsx
//
// ⚠️ TOUS LES LIENS EN `prefetch={false}` (04/08). Le pied de page est sur
// TOUTES les pages du site : à préchargement ouvert, chaque visiteur qui
// descend jusqu'en bas déclenchait quatorze lectures du cache ISR — quatorze,
// à chaque page vue, pour des liens de pied de page qu'on clique rarement.
// C'est le meilleur rapport entre ce qu'on économise et ce qu'on perd, le
// quota gratuit de Vercel étant à 75 %.
//
// Le mécanisme, puisque le fichier qui l'expliquait n'existe plus : un `<Link>`
// d'App Router précharge la charge RSC de sa destination DÈS QU'IL ENTRE DANS
// LE CHAMP DE VISION, et pour une route statique ce préchargement est une
// lecture du cache ISR. Ces lectures se comptent par requête servie, pas par
// déploiement — donc par visiteur qui déroule la page, pas par clic.
import Link from "next/link";
import Image from "next/image";
import { cgvEnVigueur } from "@/lib/legal/editeur";

// ⚠️ LES ÉVALUATIONS NATIONALES N'AVAIENT AUCUN LIEN DE PIED DE PAGE (22/08).
// Les huit pages existaient, étaient au sitemap en priorité 0,9, et n'étaient
// atteignables que depuis /espace-ecoles et /pourquoi-eleveai — deux pages
// qu'un parent ne visite pas. Or c'est le rendez-vous du 7 au 25 septembre :
// la seule fenêtre de l'année où on cherche ces mots-là.
// Le hub tient les quatre épreuves ET les quatre sujets à imprimer ; les
// quatre épreuves sont doublées ici pour qu'elles soient à UN saut de
// l'accueil, comme le sont déjà les douze classes du coach maths.
// ⭐ 23/08/2026 — ET LES FICHES NON PLUS N'AVAIENT AUCUN LIEN DE PIED DE PAGE.
// C'est mot pour mot le constat du 22/08 ci-dessus, un cran plus grave : 104
// URL au sitemap, la 6ᵉ complète dans les deux matières, et pas UN lien de
// navigation sur tout le site. Le sommaire n'était atteignable qu'en tapant son
// adresse. Google construit ses rubriques de marque à partir de la navigation —
// c'est l'argument qui a fait entrer les tarifs dans l'en-tête le 21/08 — et
// pour ces pages-là il n'avait rien à lire.
//
// ⚠️ L'ANCRE DIT « COURS ET EXERCICES CORRIGÉS », PAS « FICHES DE COURS ». Le
// texte d'un lien est ce que le moteur retient de la page d'en face : il doit
// donc porter les mêmes mots que son `title`, qui vient de changer le même
// jour. Écrire « Fiches de cours » ici et « cours et exercices corrigés »
// là-bas, ce serait se contredire à un clic d'intervalle.
// ⚠️ LE SOMMAIRE, PAS LES 104 FICHES. Elles sont déjà toutes au sitemap ; ce
// pied de page dit la STRUCTURE, il ne recopie pas le catalogue. Le sommaire
// les liste, et c'est son travail.
// ⛔ Pas de niveau dans l'ancre : le sommaire de maths couvre le CM2, la 6ᵉ, la
// 5ᵉ et la Première. « Maths 6e » mentirait sur trois classes.
//
// ── ⭐ « À IMPRIMER », ET PAS « PDF » — LA VÉRIFICATION QUI A TRANCHÉ ────────
// Frédéric proposait « fiche cours exercices corrigés pdf ». Deux objections, et
// la seconde est factuelle :
//   1. CE N'EST PAS UNE PHRASE, c'est une liste de mots. Une ancre empilée est
//      précisément ce que Google appelle du « keyword-stuffed anchor text », et
//      un humain la lit comme du spam. Le lien perd des deux côtés. En plus,
//      « fiche » y passerait en PREMIER — le mot sans volume, celui qu'on vient
//      de retirer des 27 titres.
//   2. LE PDF N'EXISTE PAS. Le bouton « Télécharger en PDF » de
//      FicheCoursClient.tsx appelle `window.print()` : il ouvre la boîte
//      d'impression du navigateur, où l'on PEUT choisir « Enregistrer en PDF »
//      sur un ordinateur — et où l'on ne le trouve pas sur un téléphone. Aucun
//      fichier n'est produit ni servi. Écrire « PDF » dans une ancre de
//      navigation ferait donc promettre au pied de page un téléchargement que
//      la page n'offre pas.
// « À imprimer » dit exactement ce qui se passe, et ce n'est pas un lot de
// consolation : « exercices à imprimer » est au moins aussi tapé que « pdf » au
// primaire et au collège, où c'est le parent qui cherche, avec une imprimante
// derrière lui.
// ✅ LE JOUR OÙ UN VRAI PDF EXISTE, cette ancre peut le dire — et il n'est pas
// loin : `scripts/build-ebook.ts` fabrique déjà un PDF paginé avec pdfkit pour
// le livre d'IA. Le changer ici sans l'avoir écrit là-bas serait remettre la
// promesse devant la chose.
const outils = [
  { label: "Maths : cours et exercices corrigés à imprimer", href: "/fiches-cours/maths" },
  { label: "Français : cours et exercices corrigés à imprimer", href: "/fiches-cours/francais" },
  { label: "Évaluations nationales 6e et 4e", href: "/evaluation-nationale-college" },
  { label: "Évaluation nationale 6e maths", href: "/evaluation-nationale-college/6e-maths" },
  { label: "Évaluation nationale 6e français", href: "/evaluation-nationale-college/6e-francais" },
  { label: "Évaluation nationale 4e maths", href: "/evaluation-nationale-college/4e-maths" },
  { label: "Évaluation nationale 4e français", href: "/evaluation-nationale-college/4e-francais" },
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
  { label: "Concours Avenir", href: "/concours-avenir" },
];

// Les rituels du jour — ce qu'on peut faire chaque matin, plus les histoires
// « comprendre » (simulateurs, « un peu de maths »). En tête du footer et en
// liens SERVEUR toujours présents dans le HTML : c'est par là que Google
// découvre le cœur du site, que la nav (cachée derrière la connexion) ne lui
// montre pas.
//
// 14/08 — deux corrections. La pastille « Le Journal du jour », qui pointait sur
// /accueil, est retirée : le journal n'est plus rendu depuis la refonte en
// entrée « Qui es-tu ? », et /accueil n'est pas une rubrique, c'est la page
// d'accueil. Et l'anglais comme l'espagnol du jour, deux rituels bien en ligne,
// n'avaient aucun lien de pied de page — donc aucune porte pour Google.
const rituelsDuJour = [
  { label: "Défis du jour", href: "/defis-du-jour" },
  { label: "Dictée du jour", href: "/dictee-du-jour" },
  { label: "L'anglais du jour", href: "/anglais-du-jour" },
  { label: "L'espagnol du jour", href: "/espagnol-du-jour" },
  { label: "Maths Réel · 974", href: "/maths-974" },
];

const unPeuDeMaths = [
  { label: "Toutes les machines", href: "/simulateurs" },
  { label: "Cyclone", href: "/simulateur-cyclone" },
  { label: "Volcan", href: "/simulateur-volcan" },
  { label: "Barrage", href: "/simulateur-barrage" },
  { label: "Lagon", href: "/simulateur-lagon" },
  { label: "L'hôtel Le Terre Sainte", href: "/simulateur-hotel" },
  { label: "Diagonale des Fous", href: "/diagonale-des-fous" },
  { label: "L'aiguille de Kakeya", href: "/aiguille-de-kakeya" },
  { label: "La dimension du volcan", href: "/dimension-du-volcan" },
  { label: "Loi de Pareto", href: "/loi-pareto" },
  { label: "Loi normale", href: "/loi-normale" },
  { label: "Exponentielle", href: "/exponentielle" },
];

const espaces = [
  { label: "Établissements scolaires", href: "/espace-ecoles" },
  { label: "Espace élèves", href: "/espace-eleves" },
  { label: "Espace parents", href: "/espace-parents" },
  { label: "Enseignants", href: "/espace-profs" },
  { label: "Français de l'étranger", href: "/francais-de-l-etranger" },
  { label: "Connexion élève / prof", href: "/auth/signin-eleve" },
];

// ⭐ `/formation-crpe` EST OUVERTE (22/08, décision de Frédéric : « il faut
// formation-crpe dans sitemap avec index pas no-index »). Les trois gestes
// vont ensemble et doivent le rester : le `noindex` retiré de la page, la
// ligne dans `app/sitemap.ts`, et ce lien-ci.
// ⛔ NE PAS REFERMER L'UN SANS LES DEUX AUTRES : le site pointerait vers une
// page qu'il demande aux moteurs d'ignorer, et la Search Console le signalerait
// comme une erreur — c'est exactement le précédent de /photo-cours, raconté
// dans le sitemap.
// ⚠️ La page nomme l'Hôtel Terre-Sainte, et elle est maintenant indexable.
// Si l'accord écrit n'existe pas, `LIEU.nom = null` dans la page la rend
// anonyme (« Terre-Sainte, à Saint-Pierre ») sans rien fermer.
const infos = [
  { label: "Pourquoi EleveAI", href: "/pourquoi-eleveai" },
  { label: "Préparer les maths du CRPE", href: "/formation-crpe" },
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

/* ⚠️ LES CGV N'APPARAISSENT QUE QUAND ELLES ENGAGENT (18/08/2026). Un lien
   « CGV » en pied de page dit au visiteur que quelque chose se vend. Tant que
   `cgvEnVigueur` est faux — rien d'immatriculé, ou aucun encaissement réel —
   la page existe à l'état de projet mais ne se propose pas d'elle-même. */
const legal = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
  { label: "CGU", href: "/cgu" },
  ...(cgvEnVigueur ? [{ label: "CGV", href: "/cgv" }] : []),
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
  { label: "Seconde", slug: "seconde" },
  { label: "Première Spé", slug: "premiere-spe" },
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
    <footer
      className="border-t border-slate-800 bg-[#041B33]"
      /* ⚠️ HORS APERÇU — scripts/capturer-apercus.ts retire cet élément avant de
         photographier une page. C'est LE pied de page du site : il est le même
         partout, il n'apprend rien sur la ressource, et il remplit le second
         écran de l'aperçu.
         ⛔ NE PAS revenir à un sélecteur `footer` dans le script. L'audit du
         27/08 a montré que la balise sert AUSSI de conteneur de contenu — par
         exemple app/audit-commission/AuditClient.tsx:238. Cacher la balise,
         c'était effacer du contenu sur une page au hasard, sans que rien ne le
         signale. L'attribut désigne le chrome, la balise ne le fait pas. */
      data-hors-apercu=""
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">

        {/* Bandeau des rituels — en tête du footer. Rend visibles pour Google
            (liens serveur, toujours dans le HTML) les destinations que la nav
            cachait : les rituels quotidiens et les histoires « un peu de maths »
            (les simulateurs de l'île). */}
        <section className="mb-10 border-b border-slate-800 pb-8">
          <h2 className="text-sm font-black text-slate-100">
            Les rituels du jour{" "}
            <span className="font-semibold text-emerald-300">· quelque chose de neuf chaque matin</span>
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Chaque matin à La Réunion : un défi, une dictée, cinq mots
            d&apos;anglais ou d&apos;espagnol, et une histoire de sciences à
            comprendre.
          </p>

          <nav aria-label="Les rituels du jour" className="mt-4 flex flex-wrap gap-2">
            {rituelsDuJour.map((l) => (
              <Link prefetch={false}
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
              <Link prefetch={false}
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
            <Link prefetch={false} href="/qui-sommes-nous" className="group flex items-center gap-3">
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

            <Link prefetch={false}
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
                  <Link prefetch={false} href={l.href} className="text-sm text-slate-400 transition hover:text-emerald-300">
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
                  <Link prefetch={false} href={l.href} className="text-sm text-slate-400 transition hover:text-sky-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mb-3 mt-6 text-sm font-black text-slate-100">Infos</h3>
            <ul className="space-y-2">
              {infos.map((l) => (
                <li key={l.href}>
                  <Link prefetch={false} href={l.href} className="text-sm text-slate-400 transition hover:text-sky-300">
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
                  <Link prefetch={false}
                    href={`/coach-ia/english?niveau=${n.slug}`}
                    className="text-sm text-slate-400 transition hover:text-sky-300"
                  >
                    English {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link prefetch={false}
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
                  <Link prefetch={false}
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
                  <Link prefetch={false}
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
                  <Link prefetch={false} href={l.href} className="text-xs text-slate-500 transition hover:text-slate-300">
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
            <Link prefetch={false} href="/mentions-legales" className="transition hover:text-slate-300">
              Mentions légales
            </Link>
            <span className="hidden text-slate-700 sm:inline">•</span>
            <Link prefetch={false} href="/politique-confidentialite" className="transition hover:text-slate-300">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
