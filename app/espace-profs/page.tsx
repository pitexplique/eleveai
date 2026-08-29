// app/espace-profs/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
// ⛔ CETTE PAGE NE PARLAIT PAS D'ARGENT DU TOUT (corrigé le 22/08/2026) : zéro
// prix, zéro lien vers /tarifs, et « Comment démarrer » renvoyait le professeur
// vers son ÉTABLISSEMENT — « les comptes sont créés au niveau de
// l'établissement, la mise en place se fait avec votre collège ».
//
// ⭐ C'est exactement ce que le forfait à 12 € a été créé pour supprimer la
// veille : à 6 € par élève, une classe de 30 coûtait 180 €, donc la
// coopérative, donc une réunion, donc la rentrée suivante. Le forfait existe
// pour qu'un professeur décide SEUL — et sa page ne le lui proposait jamais.
// C'est le seul canal d'acquisition qu'un prix à 12 € puisse financer.
//
// ⚠️ MAIS ON NE PROMET PAS UN BOUTON QUI N'EXISTE PAS. L'inscription
// professeur par e-mail n'est pas codée (le rattachement prof↔classe↔élève doit
// être tranché avant), et `VENTE.ouverte` est à false. On annonce donc le prix
// et la règle — ils sont fermes — et on dit où ça en est, comme /tarifs. Une
// page qui annonce un achat dont la caisse ne répond pas est pire que le
// silence : c'est la leçon du llms.txt qui prétendait que le coach ne demandait
// pas de compte.
import { VENTE } from "@/lib/legal/editeur";
import {
  EXEMPLE_CLASSE,
  PRIX_CLASSE_ELEVE_MOIS,
  PRIX_FAMILLE_MOIS,
  centimes,
  montant,
} from "@/lib/tarifs";

// ⚠️ LA CANONIQUE SUIT LA REDIRECTION, ELLE NE LA CONTREDIT PAS (10/08/2026).
// Cette page a vécu à `/enseignants` ; depuis le 08/08 c'est l'inverse qui est
// vrai — `/enseignants` répond 308 ICI. La canonique, elle, était restée sur
// l'ancienne adresse : la page disait donc « la vraie, c'est /enseignants », et
// /enseignants renvoyait aussitôt vers elle. Google refuse une canonique qui
// pointe vers une redirection, choisit l'adresse réelle, et signale l'écart
// (« Google n'a pas choisi la même URL canonique que l'utilisateur »).
// Une page se désigne elle-même — c'est le seul défaut qui ne se périme pas.
export const metadata: Metadata = {
  title: "Suivre vos élèves et trouver vos ressources",
  description:
    "Voyez où en sont vos élèves et utilisez EleveAI en classe : tableau de bord en temps réel, calcul rapide en direct avec résultats validés, remédiation ciblée par prérequis. Vous restez la référence.",
  alternates: { canonical: "https://www.eleveai.fr/espace-profs" },
};

// Ce qu'un prof peut FAIRE avec EleveAI — le cœur de la page.
const capacites = [
  {
    emoji: "📊",
    titre: "Suivez chaque élève, en temps réel",
    texte:
      "Scores, notions travaillées, activité récente, points à renforcer — élève par élève. Un statut d'engagement 🟢🟠🔴 vous montre d'un coup d'œil qui décroche.",
    cta: { label: "Voir le tableau de bord", href: "/dashboard-prof" },
  },
  {
    emoji: "⚡",
    titre: "Lancez une activité en classe",
    texte:
      "Un calcul rapide ou un défi au vidéoprojecteur ou sur les postes. Les résultats des élèves remontent et sont validés automatiquement — aucune saisie de votre part.",
    cta: { label: "Essayer le calcul rapide", href: "/calcul-rapide" },
  },
  {
    emoji: "🎯",
    titre: "Ciblez la remédiation",
    texte:
      "Quand un élève bute, le coach le reroute vers le prérequis fragile. Vous récupérez le « à renforcer » de chacun, prêt à l'emploi, sans corriger 30 copies.",
    cta: { label: "Découvrir le coach", href: "/coach-ia/maths" },
  },
  {
    emoji: "📚",
    titre: "Tout le catalogue à conseiller",
    texte:
      "6 coachs par matière, parcours de diagnostic, dictée du jour, prépa Brevet/Bac/Pix IA. Vous orientez chaque élève vers ce dont il a besoin.",
    cta: { label: "Explorer le catalogue", href: "/explorer" },
  },
];

// Les bénéfices chiffrés — chaque chiffre est structurel (le produit le garantit),
// jamais une statistique inventée.
const benefices = [
  {
    valeur: "0",
    unite: "copie",
    label: "à corriger",
    detail: "Les réponses des élèves sont validées automatiquement, exercice par exercice.",
  },
  {
    valeur: "0",
    unite: "note",
    label: "à saisir",
    detail: "Les scores remontent tout seuls dans votre tableau de bord, en temps réel.",
  },
  {
    valeur: "1",
    unite: "coup d'œil",
    label: "pour repérer qui décroche",
    detail: "Le statut d'engagement 🟢🟠🔴 de chaque élève, sans ouvrir un seul cahier.",
  },
  {
    valeur: "2",
    unite: "min",
    label: "pour lancer une activité",
    detail: "Un calcul rapide ou un défi en classe, sans préparation ni photocopie.",
  },
];

// Le déroulé concret : comment ça s'insère dans la semaine du prof.
const deroule = [
  { moment: "En classe", texte: "Vous lancez un calcul rapide ou un défi. Les élèves jouent, les scores remontent." },
  { moment: "À la maison", texte: "Les élèves s'entraînent au coach de leur matière, à leur rythme, en autonomie." },
  { moment: "Au retour", texte: "Vous ouvrez le tableau de bord : qui a travaillé, qui a décroché, quoi renforcer." },
];

export default function EnseignantsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-emerald-50 via-amber-50 to-sky-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-12 space-y-14">

        {/* ── HERO ── */}
        <section className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-200">
            🍎 Pour les enseignants
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
            Voyez où en sont vos élèves.
            <br className="hidden sm:block" /> Utilisez EleveAI <span className="text-emerald-600">en classe</span>.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-relaxed text-slate-600 sm:text-lg">
            Un tableau de bord en temps réel et des outils à lancer en cours —
            les résultats remontent, validés, sans saisie. Vous restez la référence.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/dashboard-prof"
              className="rounded-2xl bg-emerald-600 px-7 py-3.5 text-base font-black text-white shadow-lg transition hover:bg-emerald-500 hover:scale-105"
            >
              📊 Accéder à mon tableau de bord
            </Link>
            {/* ⛔⛔ « DÉPLOYER DANS MON COLLÈGE » RETIRÉ LE 29/08/2026 — on ne
                vend plus aux établissements (Frédéric : « c'est du pénal »).
                ⚠️ LA PAGE PROF, ELLE, NE BOUGE PAS : c'est une décision explicite
                (« on n'enlève pas profs »). Ce qui part n'est pas un contenu
                professeur, c'est un appel à vendre à SA DIRECTION posé dans sa
                page — et il rouvrait la porte que le pied de page, le sitemap et
                le `noindex` viennent de fermer. Le professeur garde tout : son
                tableau de bord, ses ressources, et le tarif classe qu'il ouvre
                lui-même sans passer par personne. */}
          </div>
        </section>

        {/* ── CE QUE VOUS Y GAGNEZ (les bénéfices, en chiffres) ── */}
        <section aria-label="Ce que vous y gagnez">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefices.map((b) => (
              <div
                key={b.label}
                className="rounded-3xl border border-white bg-white/80 p-6 text-center shadow-md backdrop-blur"
              >
                <p className="text-slate-900">
                  <span className="text-5xl font-black">{b.valeur}</span>{" "}
                  <span className="text-lg font-black">{b.unite}</span>
                </p>
                <p className="mt-1 text-sm font-black text-emerald-700">{b.label}</p>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-500">
                  {b.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── NOUVEAU : LE COMPOSEUR DE FICHES (différenciateur n°1) ── */}
        <section className="overflow-hidden rounded-3xl border border-amber-200 bg-white/90 p-6 shadow-lg sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-amber-800 ring-1 ring-amber-200">
              🆕 Nouveau
            </span>
            <h2 className="text-xl font-black sm:text-2xl">
              Composez vos fiches de cours — vos rubriques, votre ordre
            </h2>
          </div>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-relaxed text-slate-600 sm:text-base">
            Chaque fiche est en blocs : Définition, Propriétés, « À quoi ça
            sert dans le réel », un peu d&apos;histoire, exemples corrigés,
            pièges, entraînement. Vous cochez, vous ordonnez — comme vous
            faites cours. Votre composition s&apos;applique au mode classe et à
            l&apos;impression PDF, elle est enregistrée et vous la retrouvez
            dans votre tableau de bord. Vos élèves, eux, révisent la même
            fiche en flashcards.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/fiches-cours/maths"
              className="rounded-2xl bg-amber-500 px-6 py-3 text-sm font-black text-white shadow-md transition hover:bg-amber-400"
            >
              🎛️ Composer ma première fiche
            </Link>
            <Link
              href="/fiches-cours"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              Parcourir les fiches de cours
            </Link>
          </div>
          <p className="mt-4 text-xs font-bold text-slate-500">
            Toute la 6e et les grandes notions du collège en maths, plus les
            fiches IA — les autres niveaux arrivent. Bientôt : partager votre
            fiche à vos classes.
          </p>
        </section>

        {/* ── CE QUE VOUS POUVEZ FAIRE ── */}
        <section>
          <h2 className="text-center text-2xl font-black sm:text-3xl">
            Ce que vous pouvez faire
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {capacites.map((c) => (
              <div
                key={c.titre}
                className="flex flex-col rounded-3xl border border-white bg-white/80 p-6 shadow-md backdrop-blur"
              >
                <div className="text-3xl">{c.emoji}</div>
                <h3 className="mt-3 text-lg font-black">{c.titre}</h3>
                <p className="mt-2 flex-1 text-sm font-semibold leading-relaxed text-slate-600">
                  {c.texte}
                </p>
                <Link
                  href={c.cta.href}
                  className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white transition hover:bg-emerald-500"
                >
                  {c.cta.label} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── LE BULLETIN + VOTRE AVIS (maquette « screenshot ») ── */}
        <section>
          <div className="text-center">
            <h2 className="text-2xl font-black sm:text-3xl">
              Vous conseillez. EleveAI corrige et suit.
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-slate-600">
              Chaque élève a un bulletin vivant, mis à jour tout seul. Vous n&apos;avez
              plus à corriger — vous ajoutez ce qui compte vraiment&nbsp;: votre
              recommandation, d&apos;humain à élève.
            </p>
          </div>

          {/* Maquette façon capture d'écran de l'app */}
          <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-3xl border border-slate-800 bg-[#041B33] p-5 text-white shadow-2xl sm:p-7">
            <div className="mb-4 flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-amber-400/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
              <span className="ml-3 text-xs font-bold text-white/40">
                Tableau de bord · Bulletin élève
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-black">Marina · 5e</p>
                <p className="text-xs font-semibold text-white/50">
                  Dernière activité : il y a 2 jours
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-black text-emerald-300">
                🟢 Actif
              </span>
            </div>

            <div className="mt-4 space-y-2">
              {[
                { m: "Espagnol", v: 83, c: "from-emerald-400 to-teal-500" },
                { m: "Maths", v: 41, c: "from-amber-400 to-orange-500" },
                { m: "Français", v: 67, c: "from-sky-400 to-blue-500" },
              ].map((r) => (
                <div key={r.m} className="flex items-center gap-3">
                  <span className="w-20 text-xs font-bold text-white/70">{r.m}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${r.c}`}
                      style={{ width: `${r.v}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-xs font-black">{r.v}</span>
                </div>
              ))}
            </div>

            <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-black text-amber-200">
              📌 À renforcer : Maths — la proportionnalité
            </p>

            {/* Contributions & avis — les soft skills, revalorisées (pas des notes) */}
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-black uppercase tracking-wide text-sky-200">
                🌱 Contributions &amp; avis
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  "💬 4 avis donnés pour améliorer EleveAI",
                  "🔎 Esprit critique",
                  "🤝 Aide ses camarades",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs font-semibold text-white/50">
                Ce qui ne se note pas mais qui compte : implication, regard critique, entraide.
              </p>
            </div>

            <div className="mt-4 rounded-2xl border border-emerald-300/30 bg-emerald-400/[0.08] p-4">
              <p className="text-xs font-black uppercase tracking-wide text-emerald-200">
                ✍️ Votre recommandation
              </p>
              <p className="mt-1.5 text-sm font-semibold leading-snug text-white/90">
                «&nbsp;Bravo Marina, tu maîtrises l&apos;espagnol&nbsp;! Cette semaine,
                lance-toi sur une nouvelle notion — et tente un défi de maths, tu peux
                le faire 💪&nbsp;»
              </p>
              <div className="mt-3 flex justify-end">
                <span className="rounded-full bg-emerald-400 px-4 py-1.5 text-xs font-black text-[#041B33]">
                  Envoyer à Marina
                </span>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-4 max-w-2xl text-center text-xs font-semibold text-slate-500">
            Un mot personnel vaut dix recommandations d&apos;un algorithme. EleveAI
            fait le suivi&nbsp;; vous restez l&apos;humain qui enseigne.
          </p>
        </section>

        {/* ── LE DÉROULÉ ── */}
        <section className="rounded-[2rem] border border-white bg-white/70 p-8 shadow-xl backdrop-blur">
          <h2 className="text-center text-2xl font-black sm:text-3xl">
            EleveAI dans votre semaine
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {deroule.map((d, i) => (
              <div key={d.moment} className="relative rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <span className="absolute -top-3 left-5 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-sm font-black text-white">
                  {i + 1}
                </span>
                <p className="mt-2 text-sm font-black uppercase tracking-wide text-emerald-700">{d.moment}</p>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-600">{d.texte}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── VOUS RESTEZ LA RÉFÉRENCE ── */}
        <section className="rounded-[2rem] border border-amber-200 bg-white/80 p-8 text-center shadow-md backdrop-blur">
          <p className="text-4xl">🧑‍🏫</p>
          <h2 className="mt-3 text-2xl font-black">EleveAI ne vous remplace pas — il vous épaule</h2>
          <p className="mx-auto mt-3 max-w-2xl font-semibold text-slate-600">
            EleveAI est un outil d&apos;entraînement et de suivi. Vous restez la
            référence pédagogique : il vous fait gagner du temps sur le suivi et la
            remédiation, pour que vous en gardiez pour l&apos;essentiel — vos élèves.
          </p>
        </section>

        {/* ── COMMENT DÉMARRER ── */}
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-md">
          <h2 className="text-2xl font-black">Comment démarrer avec votre classe</h2>
          {/* ⚠️ « IL Y A DEUX CHEMINS » EST TOMBÉ LE 29/08 avec la carte
              établissement : il n'en reste qu'un. Et la phrase gardait tout son
              sens en perdant sa moitié — ce qui comptait, c'était « sans demander
              l'autorisation de personne », pas le compte. */}
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
            Vous n&apos;avez l&apos;autorisation de personne à demander.
          </p>

          {/* ⚠️ Une colonne, et non `sm:grid-cols-2` : il ne reste qu'une carte,
              et la grille aurait dessiné en creux la place de celle qu'on vient
              de retirer. */}
          <div className="mt-6 grid gap-4">
            {/* Le chemin du prof seul — celui pour lequel le forfait existe. */}
            <div className="rounded-2xl border-2 border-sky-200 bg-sky-50/60 p-5">
              <p className="text-xs font-black uppercase tracking-wide text-sky-700">
                Vous, pour votre ou vos classes
              </p>
              <p className="mt-2 text-3xl font-black text-slate-900">
                {montant(PRIX_CLASSE_ELEVE_MOIS)}
                <span className="ml-1 text-base font-black text-slate-500">
                  par élève et par mois
                </span>
              </p>
              {/* ⭐ CE QUE LE PROFESSEUR APPORTE, SANS PAYER POUR AUTANT : ses
                  familles passent de 1 € à 0,75 €. C'est le tarif de groupe
                  qu'il ouvre, comme pour une sortie scolaire. ⛔ Ne jamais
                  afficher le total annuel d'une classe (270 €) : c'est le
                  nombre qui renvoie un prof à sa coopérative. */}
              <p className="mt-1 text-sm font-black text-sky-800">
                {centimes(EXEMPLE_CLASSE.parMois)} par mois pour{" "}
                {EXEMPLE_CLASSE.eleves} élèves — 25 % de moins que si chaque
                famille s&apos;abonnait seule à {montant(PRIX_FAMILLE_MOIS)}
              </p>
              {/* ⛔ CETTE PHRASE DISAIT « LES FAMILLES DE VOTRE CLASSE NE PAIENT
                  RIEN » — vrai du forfait professeur du 21/08, faux depuis le 22.
                  Ce sont elles qui paient, moins cher, et c'est tout l'intérêt.
                  Une constante ne protège que d'un chiffre : celle-ci était juste
                  pendant que la phrase autour d'elle mentait.
                  ⚠️ CE QUI RESTE VRAI ET QU'ON NE TOUCHE PAS : l'ÉLÈVE, lui, ne
                  paie jamais. C'est la fenêtre du parent qui s'achète, et
                  l'enfant dont la famille ne s'abonne pas travaille à
                  l'identique — sans que vous sachiez lequel c'est. */}
              <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">
                Vous n&apos;avancez rien et vous ne ramassez rien : vos familles
                s&apos;abonnent en direct, au tarif de votre classe. Vous ne
                saurez pas qui a payé — votre tableau de bord affiche vos{" "}
                {EXEMPLE_CLASSE.eleves} élèves sans distinction, et celui dont la
                famille ne s&apos;abonne pas travaille exactement comme les
                autres. Vos élèves, eux, n&apos;ont jamais rien à payer.
              </p>
              {VENTE.ouverte ? (
                <Link
                  href="/tarifs#classe"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-black text-white transition hover:bg-sky-500"
                >
                  Équiper ma classe
                </Link>
              ) : (
                <>
                  <Link
                    href="/tarifs#classe"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-black text-white transition hover:bg-sky-500"
                  >
                    Voir l&apos;offre classe
                  </Link>
                  <p className="mt-2 text-xs font-bold text-slate-500">
                    Le tableau de bord professeur se construit en ce moment. Le
                    prix ci-dessus est ferme, et rien n&apos;est encaissé tant
                    qu&apos;il n&apos;est pas prêt.
                  </p>
                </>
              )}
            </div>

            {/* ⛔⛔ LA CARTE « OU TOUT VOTRE ÉTABLISSEMENT » EST RETIRÉE LE
                29/08/2026, avec son bouton et son paragraphe — celui-ci vendait
                le déploiement complet, « tous les collègues, plus la vue
                complète de la direction ». Retirer le seul bouton en laissant le
                texte aurait gardé l'offre en vitrine sans même la rendre
                cliquable : le pire des deux.
                ⚠️ La note qu'elle portait — « le chemin établissement : il
                reste, il n'est plus le seul » — datait du jour où l'offre classe
                est née à côté de lui. Il n'y a plus qu'un chemin, et c'est la
                classe. */}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dashboard-prof"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-black text-slate-800 transition hover:bg-slate-50"
            >
              Accéder à mon tableau de bord
            </Link>
            <Link
              href="/tarifs"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-black text-slate-800 transition hover:bg-slate-50"
            >
              {/* ⚠️ « LES TROIS OFFRES » comptait la famille, la classe et
                  l'établissement — il en reste deux depuis le 29/08. Un libellé
                  qui compte se dément tout seul dès qu'on clique. */}
              Les offres en détail
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
