// app/parents/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
// ⚠️ LA CARTE « OFFRE FAMILLE » N'AVAIT PAS DE PRIX (corrigé le 22/08/2026).
// Les deux cartes voisines annonçaient un montant en gros caractères
// (« Gratuit », puis un pictogramme) ; celle du milieu affichait « Offre
// famille » à la place du chiffre. Un parent ne clique pas pour découvrir un
// prix qu'on lui cache — surtout quand le prix est justement l'argument.
// ⛔ Et elle promettait un « prix de lancement bloqué » : il n'y a pas de prix
// de lancement, le prix est ferme. Cette formule dit au lecteur qu'il achète
// une remise temporaire, donc que le vrai prix est ailleurs et plus haut.
// ⛔⛔ CETTE PAGE A VENDU L'ÉTABLISSEMENT JUSQU'AU 01/09/2026, TROIS JOURS APRÈS
// L'INTERDICTION. Elle était bâtie sur un « fork » à trois portes — « décision
// CEO : établissement > famille > jamais l'élève » — avec une porte 1 « votre
// collège finance pour tous ses élèves », une porte 3 « suggérer à votre
// collège (lead B2B) », et deux boutons « j'ai un code établissement ». Or
// vendre à un établissement est INTERDIT depuis le 31/08 (contractuel en CDI).
// ⚠️ Et `scripts/verifier-tarifs.ts` PASSAIT AU VERT dessus : sa passe 2
// traquait « échelle des payeurs », « forfait », « sur devis » — aucun motif ne
// contenait le mot « établissement » dans ces tournures. Le garde-fou était
// vert sur la seule page qui portait un risque pénal, et elle était au sitemap
// en priorité 0.9. Les motifs manquants ont été ajoutés le même jour, dans le
// même passage : corriger la page sans corriger le vérificateur, c'est ce qui a
// déjà coûté deux jours.
//
// ⭐ CE QUI REMPLACE LE FORK, ET C'EST L'ARGUMENT LE PLUS FORT DE LA PAGE :
// deux colonnes, l'enfant et le parent. Chez les concurrents (Allo6ème, du jour
// même), la colonne « sans payer » est l'enfant BRIDÉ — corrections détaillées,
// exercices ciblés et volumes d'aide passent derrière la caisse. Ici l'enfant a
// tout, et ce qui s'achète est la fenêtre du PARENT. Ce n'est pas une nuance de
// formulation : c'est la seule chose que la page a à dire.
import { VENTE } from "@/lib/legal/editeur";
import {
  ENSEIGNANT,
  PERIODE_ANNUELLE,
  PRIX_ANNUEL,
  PRIX_MENSUEL,
  montant,
} from "@/lib/tarifs";

export const metadata: Metadata = {
  title: "Parents",
  description: `Une IA qui explique, jamais qui fait à la place. Encadrée par un enseignant, sans publicité, données protégées. Votre enfant ne paie jamais ; la vue du parent est à ${montant(
    PRIX_MENSUEL,
  )} par mois ou ${montant(
    PRIX_ANNUEL,
  )} ${PERIODE_ANNUELLE}, sur une seule adresse courriel et quel que soit le nombre d'enfants.`,
  alternates: { canonical: "https://www.eleveai.fr/parents" },
};

// Les 4 raisons d'être rassuré — le cœur de la décision d'un parent.
const confiance = [
  {
    emoji: "🧭",
    titre: "Elle explique, elle ne triche pas",
    texte:
      "Après chaque réponse, l'enfant doit donner son avis et l'améliorer : ✅ correct · ⚠️ discutable · ❌ faux · ✍️ ce que je garde. On apprend à réfléchir, pas à copier.",
  },
  {
    emoji: "🔒",
    titre: "Données protégées",
    texte:
      "Aucune adresse e-mail demandée pour un élève de collège. Le prénom n'est jamais relié à une classe précise. Accès et suppression sur simple demande.",
  },
  {
    emoji: "🚫",
    titre: "Zéro publicité",
    texte:
      "Pas de pub, pas de revente de données, aucun piège commercial. Votre enfant est en sécurité, concentré sur l'essentiel.",
  },
  {
    emoji: "🧑‍🏫",
    titre: "Conçu par un enseignant",
    texte:
      "EleveAI est créé par un professeur de maths en activité à La Réunion, en lien avec les programmes officiels. Il ne remplace pas le prof — il l'épaule.",
  },
];

const faq = [
  {
    q: "Est-ce que mon enfant va « tricher » avec l'IA ?",
    a: "Non, c'est justement ce qu'on empêche. À chaque réponse de l'IA, l'élève doit la critiquer et l'améliorer. Le but n'est jamais d'obtenir la réponse toute faite, mais de comprendre.",
  },
  {
    q: "Quelles données collectez-vous ?",
    a: "Le strict minimum. Un élève se connecte avec un code (pas d'e-mail). Le prénom affiché n'est jamais rattaché à une classe identifiable. Vous pouvez demander l'accès ou la suppression à tout moment.",
  },
  {
    q: "Est-ce que ça remplace le professeur ?",
    a: "Non. EleveAI est un outil d'entraînement et de suivi. Le professeur reste la référence — EleveAI aide votre enfant à s'exercer entre les cours, et aide le prof à voir où il en est.",
  },
  {
    // ⛔ CETTE RÉPONSE DISAIT « SI SON COLLÈGE PARTICIPE, VOUS N'AVEZ RIEN À
    // PAYER NON PLUS ». Aucun collège ne participe et aucun ne le peut : la
    // vente aux établissements est interdite depuis le 31/08. La phrase
    // envoyait le parent demander un code qui n'existe pas.
    q: "Combien ça coûte, pour moi ?",
    a: `Votre enfant, lui, ne paie jamais : le coach, les exercices, les parcours et les évaluations restent ouverts sans limite de temps. L'offre famille est à ${montant(
      PRIX_MENSUEL,
    )} par mois sans engagement, ou ${montant(
      PRIX_ANNUEL,
    )} ${PERIODE_ANNUELLE} — sur une seule adresse courriel et pour toute la maison quel que soit le nombre d'enfants. Elle ouvre votre vue à vous : son bulletin, sa semaine, et quoi reprendre ensuite.`,
  },
  {
    // ⭐ LA QUESTION QUE POSE LA COMPARAISON AVEC LES CONCURRENTS, et la seule
    // dont la réponse nous distingue : ailleurs, ne pas s'abonner rétrécit le
    // travail de l'enfant (corrections détaillées, exercices ciblés, volumes
    // d'aide). Ici, non. ⛔ Le jour où une limite apparaîtrait côté élève,
    // c'est CETTE réponse qui devient un mensonge — la relire avant.
    q: "Si je ne m'abonne pas, mon enfant est-il limité ?",
    a: "Non, et c'est la règle qui gouverne tout le reste. Il a le coach en entier, tous les exercices, tous les parcours, les cahiers et les évaluations, sans compte et sans limite de temps. L'abonnement n'ajoute rien à son travail : il ouvre votre fenêtre à vous. Un enfant dont la famille ne s'abonne pas travaille exactement comme les autres.",
  },
  {
    q: "Je suis enseignant — est-ce que ça change quelque chose ?",
    a: `Votre compte à vous ne se paie pas, sur une adresse académique en ${ENSEIGNANT.verification}. ⚠️ Pour vous, à titre personnel : cela ne couvre pas les familles de vos élèves, qui s'abonnent comme les autres. Vos élèves, eux, n'ont jamais rien à payer.`,
  },
];

export default function ParentsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-emerald-50 to-amber-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-12 space-y-14">

        {/* ── HERO ── */}
        <section className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-sky-800 ring-1 ring-sky-200">
            👪 Pour les parents
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
            Une IA qui <span className="text-emerald-600">explique</span>,
            <br className="hidden sm:block" /> jamais qui fait à la place.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-relaxed text-slate-600 sm:text-lg">
            EleveAI aide votre enfant à progresser à son rythme — encadré par un
            enseignant, sans publicité, avec ses données protégées.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {/* ⛔ LE BOUTON PRINCIPAL ÉTAIT « J'AI UN CODE ÉTABLISSEMENT ».
                Il ouvrait la page sur un canal interdit depuis le 31/08, et il
                demandait au parent de posséder quelque chose que personne ne
                distribue. Le premier geste est maintenant celui qui ne coûte
                rien et n'exige rien : essayer le coach. */}
            <Link
              href="/accueil"
              className="rounded-2xl bg-emerald-600 px-7 py-3.5 text-base font-black text-white shadow-lg transition hover:bg-emerald-500 hover:scale-105"
            >
              Essayer le coach avec votre enfant
            </Link>
            <Link
              href="/tarifs"
              className="rounded-2xl bg-white px-7 py-3.5 text-base font-black text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              Voir l'offre famille
            </Link>
          </div>
        </section>

        {/* ── RÉASSURANCE (le cœur pour un parent) ── */}
        <section>
          <h2 className="text-center text-2xl font-black sm:text-3xl">
            Ce qui doit vous rassurer
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {confiance.map((c) => (
              <div
                key={c.titre}
                className="rounded-3xl border border-white bg-white/80 p-6 shadow-md backdrop-blur"
              >
                <div className="text-3xl">{c.emoji}</div>
                <h3 className="mt-3 text-lg font-black">{c.titre}</h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
                  {c.texte}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── MAQUETTE « screenshot » : l'IA encadrée en action ── */}
        <section>
          <div className="text-center">
            <h2 className="text-2xl font-black sm:text-3xl">
              L&apos;IA explique. Votre enfant réfléchit.
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-slate-600">
              Voilà à quoi ressemble une aide EleveAI : jamais la réponse toute
              faite — un coup de pouce, puis votre enfant garde le contrôle.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-3xl border border-slate-800 bg-[#041B33] p-5 text-white shadow-2xl sm:p-7">
            <div className="mb-4 flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-amber-400/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
              <span className="ml-3 text-xs font-bold text-white/40">Coach IA · Maths</span>
            </div>

            <div className="rounded-2xl bg-white/5 p-3 text-sm font-semibold text-white/85">
              Combien font 3/4 + 1/8 ?
            </div>

            <div className="mt-3 flex gap-2">
              <span className="text-lg" aria-hidden="true">🤖</span>
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3 text-sm font-semibold text-white/80">
                Astuce : mets d&apos;abord les deux fractions sur le même
                dénominateur. Lequel choisir&nbsp;? À toi de trouver la suite.
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-emerald-300/30 bg-emerald-400/[0.08] p-4">
              <p className="text-xs font-black uppercase tracking-wide text-emerald-200">
                ✍️ À toi de juger cette aide
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {["✅ correct", "⚠️ à revoir", "❌ faux"].map((t) => (
                  <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/80">
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs font-semibold text-white/60">
                Puis «&nbsp;ce que je garde, ce que je change&nbsp;». On apprend à
                réfléchir, pas à copier.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-2">
            {["🔒 Données protégées", "🚫 Zéro publicité", "🌱 On encourage, on ne juge pas"].map((t) => (
              <span key={t} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-600 shadow-sm">
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* ── MAQUETTE 2 : le tableau de bord de votre enfant (progression + badges) ── */}
        <section>
          <div className="text-center">
            <h2 className="text-2xl font-black sm:text-3xl">
              Suivez votre enfant, en un coup d&apos;œil
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-slate-600">
              Sa progression, ce qu&apos;il peut améliorer — et surtout ce
              qu&apos;il a déjà réussi.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-3xl border border-slate-800 bg-[#041B33] p-5 text-white shadow-2xl sm:p-7">
            <div className="mb-4 flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-amber-400/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
              <span className="ml-3 text-xs font-bold text-white/40">Espace famille · Votre enfant</span>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-lg font-black">Marina · 5e</p>
              <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-black text-orange-300">
                🔥 7 jours d&apos;affilée
              </span>
            </div>

            {/* Progression */}
            <p className="mt-4 text-xs font-black uppercase tracking-wide text-emerald-200">
              📈 Progression ce mois
            </p>
            <div className="mt-2 space-y-2">
              {[
                { m: "Espagnol", v: 83, d: "+8", c: "from-emerald-400 to-teal-500" },
                { m: "Maths", v: 41, d: "+5", c: "from-amber-400 to-orange-500" },
                { m: "Français", v: 67, d: "+3", c: "from-sky-400 to-blue-500" },
              ].map((r) => (
                <div key={r.m} className="flex items-center gap-3">
                  <span className="w-20 text-xs font-bold text-white/70">{r.m}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div className={`h-full rounded-full bg-gradient-to-r ${r.c}`} style={{ width: `${r.v}%` }} />
                  </div>
                  <span className="w-16 text-right text-xs font-black text-emerald-300">▲ {r.d}</span>
                </div>
              ))}
            </div>

            {/* À améliorer */}
            <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-black text-amber-200">
              📌 À améliorer : Maths — la proportionnalité (le coach l&apos;aide dessus)
            </p>

            {/* Badges gagnés — en vedette (les parents adorent) */}
            <div className="mt-4 rounded-2xl border border-amber-300/30 bg-amber-400/[0.08] p-4">
              <p className="text-xs font-black uppercase tracking-wide text-amber-200">
                🏅 Badges gagnés
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  "🎯 Espagnol A1 maîtrisé",
                  "⚡ Championne du calcul rapide",
                  "📜 30 dictées réussies",
                  "✍️ 4 avis donnés",
                  "🔥 Série de 7 jours",
                ].map((b) => (
                  <span key={b} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/85">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="mx-auto mt-4 max-w-2xl text-center text-xs font-semibold text-slate-500">
            Ici, votre enfant est chez lui : on célèbre ce qu&apos;il réussit avant
            de pointer ce qu&apos;il reste à faire.
          </p>
        </section>

        {/* ── CE QUI EST OUVERT / CE QUE L'ABONNEMENT AJOUTE ──
            ⛔ ICI SE TENAIT LE « FORK » À TROIS PORTES (voir l'entête du
            fichier). Les deux colonnes ne sont pas « sans payer » contre
            « avec » : ce sont DEUX PERSONNES. À gauche l'enfant, qui a tout ; à
            droite le parent, qui achète sa fenêtre. C'est ce découpage qui rend
            la page honnête — et c'est aussi le seul endroit du site où la
            différence avec les concurrents se voit d'un coup d'œil. */}
        <section>
          <h2 className="text-center text-2xl font-black sm:text-3xl">
            Votre enfant ne paie jamais. Vous, vous choisissez.
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm font-semibold text-slate-500">
            Ailleurs, ne pas s&apos;abonner rétrécit le travail de l&apos;enfant.
            Ici, l&apos;abonnement n&apos;ajoute rien à ce qu&apos;il fait — il
            ouvre ce que vous, vous voyez.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {/* Colonne 1 — L'ENFANT. Elle est mise en avant, et c'est voulu :
                c'est la colonne qui surprend. */}
            <div className="relative rounded-3xl border-2 border-emerald-400 bg-white p-6 shadow-xl">
              <span className="absolute -top-3 left-6 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-white">
                Pour votre enfant
              </span>
              {/* ⛔ LE QUALIFIANT ÉTAIT UN <span> EN LIGNE, ET IL CRÉAIT UNE
                  FAUSSE LECTURE EN 375 px. « Il ne paie rien » en 3xl remplit
                  la largeur, si bien que la coupure tombait après le premier mot
                  du span : on lisait « Il ne paie rien sans » en gros, puis
                  « compte, sans limite » à la ligne — c'est-à-dire une
                  CONDITION, exactement l'inverse de la phrase. Le défaut ne se
                  voit pas au code, et pas non plus en large : il n'existe qu'en
                  poche, là où la moitié des parents lisent.
                  ⚠️ La colonne de droite pose déjà le prix puis son unité sur
                  deux éléments distincts. Les deux colonnes suivent maintenant
                  la même structure — un titre, une précision dessous. */}
              <p className="mt-2 text-3xl font-black leading-tight text-emerald-600">
                Il ne paie rien
              </p>
              <p className="mt-1 text-base font-black text-slate-500">
                sans compte, sans limite
              </p>
              <ul className="mt-4 space-y-2.5">
                {[
                  ["🧭", "Le coach qui explique, en entier"],
                  ["✏️", "Tous les exercices et tous les parcours"],
                  ["📕", "Les cahiers de vacances"],
                  ["📋", "Les évaluations"],
                  ["⏳", "Sans limite de temps, et sans adresse e-mail à donner"],
                ].map(([emoji, texte]) => (
                  <li key={texte} className="flex gap-2.5 text-sm font-semibold leading-relaxed text-slate-700">
                    <span aria-hidden="true">{emoji}</span>
                    <span>{texte}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black leading-relaxed text-emerald-800">
                Un enfant dont la famille ne s&apos;abonne pas travaille
                exactement comme les autres.
              </p>
            </div>

            {/* Colonne 2 — LE PARENT. C'est la seule chose qui s'achète. */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
              <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-slate-600">
                Pour vous
              </span>
              {/* ⛔ « UN EURO PAR MOIS » ÉTAIT ÉCRIT À LA MAIN À DEUX ENDROITS
                  DE CETTE PAGE, à côté d'un prix importé. Le chiffre juste et le
                  chiffre faux se touchaient, et c'est le faux qu'on lisait en
                  gros. C'est la panne que `lib/tarifs.ts` existe pour empêcher,
                  et une constante ne protège que la moitié de la phrase où elle
                  est appelée. */}
              {/* ⛔ MÊME DÉFAUT QUE LA COLONNE DE GAUCHE, et il s'est produit
                  pour la même raison : le span portait « par mois, sans
                  engagement », trop long pour tenir derrière un prix en 3xl. En
                  375 px la coupure tombait sur « sans / engagement », laissant
                  le mot seul sur sa ligne avec l'interligne d'un titre.
                  ⚠️ « par mois » RESTE en ligne — c'est l'unité, et un montant
                  ne s'écrit jamais sans elle (le piège du facteur douze du
                  22/08). Ce qui descend, c'est l'argument commercial, qui va
                  rejoindre la formule annuelle. */}
              <p className="mt-2 text-3xl font-black leading-tight text-slate-900">
                {montant(PRIX_MENSUEL)}
                <span className="ml-1 align-middle text-base font-black text-slate-500">
                  par mois
                </span>
              </p>
              {/* ⛔ MENTION OBLIGATOIRE : le prix annuel ne s'affiche jamais
                  sans sa période — article 8 des CGV. */}
              <p className="mt-1 text-sm font-bold text-slate-500">
                Sans engagement, ou {montant(PRIX_ANNUEL)} {PERIODE_ANNUELLE}.
              </p>
              <ul className="mt-4 space-y-2.5">
                {[
                  ["📊", "Son bulletin : où il en est, matière par matière"],
                  ["🗓️", "Sa semaine : ce qu'il a travaillé, et quand"],
                  ["📌", "Ce qu'il faut reprendre ensuite"],
                  ["👪", "Une seule adresse courriel, quel que soit le nombre d'enfants"],
                ].map(([emoji, texte]) => (
                  <li key={texte} className="flex gap-2.5 text-sm font-semibold leading-relaxed text-slate-700">
                    <span aria-hidden="true">{emoji}</span>
                    <span>{texte}</span>
                  </li>
                ))}
              </ul>
              {VENTE.ouverte ? (
                <Link
                  href="/tarifs"
                  className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-black text-white transition hover:bg-slate-700"
                >
                  Voir l&apos;offre famille →
                </Link>
              ) : (
                <>
                  <Link
                    href="/tarifs"
                    className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-black text-white transition hover:bg-slate-700"
                  >
                    Voir l&apos;offre famille →
                  </Link>
                  {/* ⚠️ MÊME FORMULE QUE /espace-profs ET /tarifs : le prix est
                      ferme, et rien n'est encaissé tant que l'espace n'est pas
                      prêt. Annoncer un prix n'engage pas ; encaisser, oui. */}
                  <p className="mt-2 text-xs font-bold text-slate-500">
                    L&apos;espace famille se construit en ce moment. Le prix
                    ci-dessus est ferme, et rien n&apos;est encaissé tant
                    qu&apos;il n&apos;est pas prêt.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* ⛔ LES DEUX MOITIÉS NE SE SÉPARENT JAMAIS. « Gratuit pour les
              enseignants » dit seul se comprend « gratuit pour ma classe », et
              c'est ce qu'un professeur annoncera de bonne foi à ses familles —
              qui découvriront le prix devant la caisse. La restriction est donc
              dans la MÊME phrase, pas en bas de page. */}
          <p className="mx-auto mt-6 max-w-3xl rounded-2xl border border-sky-200 bg-sky-50 px-5 py-4 text-center text-sm font-semibold leading-relaxed text-sky-900">
            🧑‍🏫 <strong className="font-black">Vous êtes enseignant&nbsp;?</strong>{" "}
            Votre compte ne se paie pas, sur {ENSEIGNANT.verification} — pour
            vous, à titre personnel, et pas pour les familles de vos élèves, qui
            s&apos;abonnent comme les autres.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 className="text-center text-2xl font-black sm:text-3xl">
            Vos questions
          </h2>
          <div className="mx-auto mt-6 max-w-3xl space-y-3">
            {faq.map((f) => (
              <details
                key={f.q}
                className="rounded-2xl border border-white bg-white/80 px-6 py-4 shadow-sm backdrop-blur"
              >
                <summary className="cursor-pointer font-black">{f.q}</summary>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-center text-sm font-semibold text-slate-500">
            Une autre question sur la protection des données&nbsp;?{" "}
            <Link href="/politique-confidentialite" className="font-black text-sky-700 underline">
              Notre politique de confidentialité
            </Link>
          </p>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="rounded-[2rem] bg-emerald-600 p-8 text-center text-white shadow-2xl">
          <h2 className="text-2xl font-black sm:text-3xl">
            Prêt à aider votre enfant, sereinement&nbsp;?
          </h2>
          {/* ⛔ CE BLOC ENVOYAIT LE PARENT VERS DEUX CANAUX INTERDITS —
              « j'ai un code établissement » et « suggérer EleveAI à mon
              collège » (lead B2B). Le dernier geste de la page est maintenant
              le même que le premier : essayer, sans rien devoir. */}
          <p className="mx-auto mt-3 max-w-xl font-semibold text-emerald-50">
            Commencez par le faire essayer — il n&apos;a ni compte à créer ni
            rien à payer. L&apos;abonnement, c&apos;est pour vous, et plus tard
            si vous le voulez.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/accueil"
              className="rounded-2xl bg-white px-7 py-3.5 text-base font-black text-emerald-700 shadow-lg transition hover:bg-emerald-50"
            >
              Essayer le coach
            </Link>
            <Link
              href="/tarifs"
              className="rounded-2xl border border-white/40 bg-white/10 px-7 py-3.5 text-base font-black text-white transition hover:bg-white/20"
            >
              Voir l&apos;offre famille
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
