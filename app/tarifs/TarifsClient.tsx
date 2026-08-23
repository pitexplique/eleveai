"use client";

import Link from "next/link";

import { VENTE } from "@/lib/legal/editeur";
import {
  ARGUMENT_ETABLISSEMENT,
  EXEMPLE_CLASSE,
  EXEMPLE_ETABLISSEMENT,
  ECHELLE,
  PLAFOND_ETABLISSEMENT_AN,
  PRIX_CLASSE_ELEVE_MOIS,
  PRIX_ETABLISSEMENT_ELEVE_MOIS,
  PRIX_FAMILLE_AN,
  PRIX_FAMILLE_MOIS,
  centimes,
  euros,
  montant,
} from "@/lib/tarifs";

// ─────────────────────────────────────────────────────────────────────────────
// LA PAGE TARIFS, REFAITE LE 21/08/2026.
//
// Ce qu'elle faisait avant : elle ouvrait sur « Classe » et « Établissement »,
// les deux canaux qui n'existent pas cette année, et fermait sur « Famille ·
// Bientôt » — la seule offre qui concerne les 74 % de visiteurs qui arrivent
// par un cahier de vacances. Elle promettait en plus, dans la carte Famille,
// six outils qui sont GRATUITS (coach, parcours, calcul rapide, défis…) : elle
// vendait ce qu'elle donne, et échouait au test maison — « si l'enfant d'à côté
// ne paie pas, apprend-il moins ? ».
//
// Ce qu'elle fait maintenant, dans cet ordre : la famille d'abord, puis le mur
// du gratuit — retiré depuis, voir plus bas —, puis le collectif
// en bas — non plus comme un tunnel de vente mais comme une preuve de sérieux.
//
// ⭐ Les couleurs sont celles du coach (`app/tutor-v4/TutorV4Client.tsx`) :
// bandeau indigo→sky→cyan, tuiles sky/violet/emerald/amber. Une page de tarifs
// qui ne ressemble pas au produit se lit comme une page de quelqu'un d'autre.
// ─────────────────────────────────────────────────────────────────────────────

/** Ce que la famille achète — et qui n'apprend rien à personne. */
const inclusFamille = [
  "Le bulletin de votre enfant, mis à jour tout seul",
  "Ce qu'il a travaillé cette semaine, et ce qui coince",
  "Son historique depuis le début, sans rien à saisir",
  "Pour lui : son thème, son badge, composer son parcours",
  "Son nom dans les remerciements du site",
];

/**
 * LES TROIS PORTES — la seule chose d'IXL qui valait d'être reprise telle
 * quelle : chez eux, la page d'entrée sépare Familles / Classes / Écoles avant
 * de parler d'argent, et chaque porte a DEUX boutons — le prix, et « en savoir
 * plus ».
 *
 * ⛔ Pas de sous-pages `/tarifs/familles` : les trois pages d'audience existent
 * déjà (`/espace-parents`, `/espace-profs`, `/espace-ecoles`). En créer de
 * nouvelles ferait deux pages du même sujet pour le même lecteur — Google en
 * choisit une, rarement la bonne, et les deux perdent.
 *
 * ⭐ Ce que ces portes apportent au référencement : le texte des liens. « Pour
 * les parents » → /espace-parents dit à Google et à Bing de quoi cette page
 * parle, bien mieux qu'un mot-clé posé dessus.
 */
const portes = [
  {
    emoji: "🏠",
    titre: "Pour les parents",
    sousTitre: "Suivre son enfant à la maison",
    prix: `${montant(PRIX_FAMILLE_MOIS)} par mois, par famille`,
    ancre: "#famille",
    page: "/espace-parents",
    pageLabel: "Ce que voient les parents",
    gradient: "from-emerald-400 to-green-500",
    anneau: "ring-emerald-100",
  },
  {
    emoji: "🧑‍🏫",
    titre: "Pour les enseignants",
    sousTitre: "Voir sa classe sans corriger",
    // ⭐ CE QUE LE PROFESSEUR APPORTE À SES FAMILLES : 25 % DE MOINS (22/08).
    // C'est ce qui a débloqué la grille après cinq versions. Le professeur
    // n'achète pas pour lui et ne sort rien de sa poche : il organise sa classe,
    // et ses familles paient 0,75 € au lieu de 1 €. Son rôle n'est pas d'être
    // client, il est d'ouvrir le tarif de groupe — comme pour une sortie
    // scolaire, où personne ne s'étonne que le prix baisse à trente.
    prix: `${montant(PRIX_CLASSE_ELEVE_MOIS)} par élève et par mois`,
    ancre: "#classe",
    page: "/espace-profs",
    pageLabel: "L'outil du professeur",
    gradient: "from-sky-400 to-blue-500",
    anneau: "ring-sky-100",
  },
  {
    emoji: "🏫",
    titre: "Pour les établissements",
    sousTitre: "Tout le collège, et la vue du principal",
    prix: `${montant(PRIX_ETABLISSEMENT_ELEVE_MOIS)} par élève et par mois, jamais plus de ${euros(PLAFOND_ETABLISSEMENT_AN)} par an`,
    ancre: "#etablissement",
    page: "/espace-ecoles",
    pageLabel: "EleveAI dans un établissement",
    gradient: "from-violet-400 to-purple-500",
    anneau: "ring-violet-100",
  },
];

const collectif = [
  {
    id: "classe",
    nom: "Classe",
    badge: "🧑‍🏫 Un enseignant",
    /* ⭐ CETTE CARTE NE VEND PAS UN PRODUIT AU PROFESSEUR, ELLE LUI OUVRE UN
       TARIF DE GROUPE. La distinction a mis cinq versions à se dégager le
       22/08 : tant qu'on facturait le professeur, il devait demander à
       quelqu'un — coopérative, réunion, rentrée suivante — et toutes les
       grilles mouraient là. Le déclencheur est de Frédéric : « un prof propose
       parfois un livre à 12 euros », puis « le prof va devoir inciter les
       élèves à prendre son abonnement qui sera 25 % moins cher qu'individuel ».
       Il ne sort rien de sa poche, il fait baisser le prix de ses familles. */
    prix: `${montant(PRIX_CLASSE_ELEVE_MOIS)} / élève / mois`,
    /* ⛔ LA CLASSE S'AFFICHE AU MOIS, JAMAIS À L'ANNÉE. 22,50 € par mois se
       décide seul ; 270 € renvoie à la coopérative, donc à une réunion, donc à
       la rentrée suivante — le mur sur lequel quatre grilles sont mortes le
       22/08. Le choix de l'unité ne décore pas ici, il décide si l'offre se
       vend. */
    exemple: `${EXEMPLE_CLASSE.eleves} élèves = ${centimes(EXEMPLE_CLASSE.parMois)} par mois`,
    description:
      "Le prof voit sa classe sans corriger : devoirs suivis, bulletins, qui décroche. Et il n'a rien à sortir de sa poche : c'est le tarif de groupe qu'il ouvre à ses familles, qui paient 25 % de moins que si chacune s'abonnait dans son coin.",
    inclus: [
      "Toutes les matières, tous les élèves de la classe",
      "Évaluation automatique, sans correction",
      "Devoirs maison faits et suivis en ligne",
      "Tableau de bord professeur",
      /* ⛔ LA LIGNE QUI TIENT TOUT LE MODÈLE, ET ELLE EST DIFFICILE À TENIR.
         Le risque n'est pas dans le code, il est dans la salle : un professeur
         qui ramasse 12 € voit les huit qui ne les ont pas, et les huit savent
         qu'il voit. Les familles s'abonnent donc EN DIRECT, et le tableau de
         bord affiche les 30 élèves sans distinction. ⛔ Aucun compteur
         « 14 abonnés sur 30 » nulle part — c'est exactement le genre de chiffre
         qu'on ajoute un jour parce qu'il est facile à calculer. */
      "Vos familles paient 25 % de moins qu'en s'abonnant seules",
      "Vous ne savez pas qui a payé, et vous ne le saurez jamais",
    ],
    cta: "Ouvrir le tarif classe",
    gradient: "from-sky-400 to-blue-500",
    anneau: "ring-sky-100",
  },
  {
    id: "etablissement",
    nom: "Établissement",
    badge: "🏫 Tout le collège",
    prix: `${montant(PRIX_ETABLISSEMENT_ELEVE_MOIS)} / élève / mois`,
    exemple: `${EXEMPLE_ETABLISSEMENT.eleves} élèves = ${euros(EXEMPLE_ETABLISSEMENT.total)} par an, plafond compris`,
    /* ⭐ « VOUS PAYEZ POUR QUE PERSONNE D'AUTRE NE PAIE » — c'est enfin une
       proposition en une phrase, et c'est la seule qui justifie la dépense
       maintenant que la classe ne se vend plus. Sans ce couple de nombres, le
       principal ne voit qu'une ligne de budget sans contrepartie visible : les
       familles, elles, ne lui envoient pas de facture. */
    description: `Sans vous, ce sont les familles qui paient : ${ARGUMENT_ETABLISSEMENT.eleves} élèves, cela ferait ${euros(ARGUMENT_ETABLISSEMENT.siLesFamillesPaient)} sortis de leurs poches. L'établissement paie ${euros(ARGUMENT_ETABLISSEMENT.siLEtablissementPaie)} et plus personne ne débourse rien.`,
    inclus: [
      "Tous les élèves, toutes les classes, tous les profs",
      "La vue complète du chef d'établissement",
      "Aucune famille ne paie, aucun élève non plus",
      /* ⭐ LE PLAFOND EST UN ARGUMENT DE VENTE, PAS UNE CLAUSE. Il vient d'un
         seuil de friction que Frédéric a mesuré dans sa propre vie : « en
         dessous de 2 000 euros un établissement n'a pas de pb », et son ancien
         proviseur lui a débloqué 1 500 € l'an dernier. Sans plafond, un collège
         de 400 élèves passerait à 4 800 € et repartirait dans le circuit long. */
      `Jamais plus de ${euros(PLAFOND_ETABLISSEMENT_AN)} par an, quel que soit l'effectif`,
      "Éligible REP/REP+, fonds sociaux, coopérative",
      "Jamais un classement des enseignants",
    ],
    // ⚠️ LE BOUTON DISAIT « DEMANDER UN DEVIS », juste sous le prix affiché en
    // gros (trouvé par `scripts/verifier-tarifs.ts`, 22/08). Les deux se
    // contredisaient sur la même carte : si le prix est ferme et écrit là, il
    // n'y a rien à deviser — et proposer un devis rouvre une négociation qu'on
    // vient de fermer, en laissant croire que le nombre affiché est indicatif.
    cta: "Parler de mon établissement",
    gradient: "from-violet-400 to-purple-500",
    anneau: "ring-violet-100",
  },
];

/**
 * ⚠️ COMPARER CE QUI SE COMPARE. L'ancienne version alignait le prix
 * ÉTABLISSEMENT d'EleveAI contre des prix FAMILLE (Kwyk, Lumni) : le rapport
 * était flatteur et faux. Ici chaque ligne dit pour qui elle vaut, et EleveAI
 * apparaît deux fois — une par public.
 */
const comparatif = [
  {
    outil: "IXL",
    pourQui: "Une famille · toutes matières",
    prix: "19,95 € / mois",
    soit: "239 € / an · +4 €/mois par enfant en plus",
  },
  {
    outil: "IXL",
    pourQui: "Une famille · une seule matière",
    prix: "9,95 € / mois",
    soit: "119 € / an",
  },
  { outil: "Mathia", pourQui: "Par élève", prix: "8 € / élève / mois", soit: "96 € / an / élève" },
  {
    outil: "Kwyk",
    pourQui: "Par élève · établissement",
    prix: "6 € / élève / mois",
    soit: "72 € / an / élève",
  },
  { outil: "Lumni Pro", pourQui: "Une famille", prix: "5,99 € / mois", soit: "72 € / an" },
  {
    outil: "EleveAI 🌺",
    pourQui: "Une famille · toutes matières · tous les enfants",
    /* ⚠️ CETTE LIGNE S'AFFICHAIT À L'ANNÉE (12 €/an) AU MILIEU DE CONCURRENTS
       AFFICHÉS AU MOIS. Le lecteur devait convertir de tête pour voir l'écart —
       et un tableau qu'il faut convertir ne se lit pas, il se survole. Au même
       compteur, la ligne se lit d'un coup : 1 € contre 19,95 €.
       ⛔ Ne jamais remettre une unité différente des autres lignes ici : c'est
       la seule colonne où l'on se compare, et une unité qui décroche annule le
       bénéfice de tout le tableau. */
    prix: `${montant(PRIX_FAMILLE_MOIS)} / mois`,
    soit: `${euros(PRIX_FAMILLE_AN)} / an — et pas un centime par enfant en plus`,
  },
  {
    outil: "EleveAI 🌺",
    pourQui: "Une classe · organisée par le professeur",
    prix: `${montant(PRIX_CLASSE_ELEVE_MOIS)} / élève / mois`,
    /* ⛔ ICI ON DONNE LE PRIX ANNUEL PAR ÉLÈVE, JAMAIS LE TOTAL DE LA CLASSE.
       La colonne s'intitule « Soit par an », et les 270 € d'une classe de 30
       sont précisément le nombre qui renvoie un professeur à sa coopérative.
       9 € par élève et par an se compare en revanche directement à Kwyk
       (72 €) et Mathia (96 €), qui sont sur la même unité — c'est la seule
       ligne du tableau qui compare enfin ce qui se compare. */
    soit: `${euros(PRIX_CLASSE_ELEVE_MOIS * 12)} / an / élève — 25 % de moins que seul`,
  },
  {
    outil: "EleveAI 🌺",
    pourQui: "Tout un établissement",
    prix: `${montant(PRIX_ETABLISSEMENT_ELEVE_MOIS)} / élève / mois`,
    soit: `${euros(PRIX_ETABLISSEMENT_ELEVE_MOIS * 12)} / an / élève — ${EXEMPLE_ETABLISSEMENT.eleves} élèves = ${euros(EXEMPLE_ETABLISSEMENT.total)}`,
  },
];

const faq = [
  {
    q: "Mon enfant peut-il utiliser EleveAI sans payer ?",
    a: "Oui, entièrement. Le coach dans les cinq matières, les exercices corrigés, les parcours, le calcul rapide, les défis, les cahiers, les fiches, les évaluations blanches : rien de tout cela ne se paie, sans limite de temps et sans publicité. Et il garde ses résultats. Rien de tout ça ne deviendra payant.",
  },
  {
    q: `Alors qu'est-ce que je paie avec les ${euros(PRIX_FAMILLE_AN)} ?`,
    a: "La fenêtre du parent, et ce qu'elle vous dit de faire. Votre enfant, lui, voit déjà sa progression. Ce que l'abonnement ouvre, c'est votre vue à vous : son bulletin, ce qu'il a travaillé cette semaine, son historique — et surtout des recommandations personnalisées, notion par notion, qui vous disent quoi reprendre maintenant. Elles sont calculées sur des règles explicites, pas par une IA opaque : je peux vous expliquer chacune d'elles, et un professeur aussi. Vous n'achetez pas ce qu'il apprend, vous achetez de le voir apprendre et de savoir quoi faire ensuite.",
  },
  {
    q: `${euros(PRIX_FAMILLE_AN)} par enfant ou par famille ?`,
    a: "Par famille, quel que soit le nombre d'enfants. Le frère ou la sœur d'à côté n'a pas à apprendre moins parce qu'il est le deuxième.",
  },
  {
    q: "Mon collège peut-il payer pour tout le monde ?",
    a: `Oui, et c'est exactement à ça que sert l'offre établissement : il paie pour que personne d'autre ne paie. ${EXEMPLE_ETABLISSEMENT.eleves} élèves, cela ferait ${euros(ARGUMENT_ETABLISSEMENT.siLesFamillesPaient)} sortis des poches des familles ; l'établissement paie ${euros(EXEMPLE_ETABLISSEMENT.total)} par an, plafond compris, et plus personne ne débourse rien. Parlez-en au principal, on s'occupe du reste.`,
  },
  {
    // ⭐ LA QUESTION QUE POSE LE PRINCIPAL, et qu'il valait mieux poser nous-mêmes
    // (22/08). Sans elle, il fait le calcul « 1 € en classe contre 2 € chez moi »
    // et conclut que l'établissement est l'offre chère. La réponse tient au fait
    // qu'une classe a cinq professeurs, ce que la grille seule ne dit pas.
    q: "Combien paie le professeur ?",
    a: `Rien de sa poche. Il ouvre le tarif de groupe de sa classe : ses familles paient ${montant(PRIX_CLASSE_ELEVE_MOIS)} par élève et par mois au lieu de ${montant(PRIX_FAMILLE_MOIS)}, soit 25 % de moins que si chacune s'abonnait dans son coin. Son tableau de bord de classe s'ouvre avec. Et ce qui se prescrit reste la fenêtre des parents, jamais l'accès de l'enfant : l'élève dont la famille ne s'abonne pas travaille exactement à l'identique, et le professeur ne sait pas qui a payé.`,
  },
  {
    q: "Puis-je arrêter quand je veux ?",
    a: "Oui. Sans engagement, résiliable à tout moment depuis votre espace. Et vous avez 14 jours pour changer d'avis, remboursés, même si votre enfant a déjà tout utilisé — c'est écrit dans les conditions de vente.",
  },
  {
    q: "J'ai un code, où est-ce que je le saisis ?",
    a: "À l'étape du paiement : un champ « code promotionnel » vous attend juste avant de valider. Les codes sont envoyés par courriel ou remis par un enseignant — ils ne sont pas affichés sur le site.",
  },
  {
    q: "Pourquoi si peu cher ?",
    a: "EleveAI est développé par un seul enseignant de La Réunion : pas de levée de fonds à rembourser, pas d'équipe commerciale, pas d'intermédiaire. Le prix bas n'est pas un défaut de qualité, c'est ce qui reste quand on enlève tout le reste.",
  },
  {
    q: "Et une famille qui ne peut pas payer ?",
    a: "Elle ne paie pas, et personne ne le saura. Aucun élève n'a jamais eu à demander quoi que ce soit pour travailler ici, et ça ne changera pas.",
  },
];

export default function TarifsClient() {
  // ⚠️ Le bouton n'invente pas l'ouverture de la vente : il lit le même verrou
  // que les CGV et que `lib/paiement/stripe.ts`. Tant que `VENTE.ouverte` est
  // faux, le prix s'affiche mais rien ne prétend encaisser — le jour du
  // branchement, un seul booléen change et la page s'ouvre d'elle-même.
  const venteOuverte = VENTE.ouverte;

  // ⭐ LE SEUL GAIN SEO RÉEL DE CETTE PAGE. Les sitelinks ne se déclarent pas
  // (Google les calcule), mais un bloc `FAQPage` permet aux questions de
  // s'afficher DANS le résultat de recherche. Et ce qui est cherché, ce ne sont
  // pas les tarifs — personne ne tape « tarif EleveAI » — ce sont les
  // questions : « est-ce que c'est gratuit », « combien coûte… ».
  // ⚠️ Les réponses doivent être MOT POUR MOT celles de la page : un balisage
  // qui promet autre chose que ce qu'on lit est une raison de désindexation.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-950">
      <script
        type="application/ld+json"
        // Le `<` échappé : sans lui, une réponse contenant du HTML pourrait
        // fermer la balise script.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* FOND */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <svg className="h-full w-full" viewBox="0 0 1440 1800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="tar-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0FDF4" />
              <stop offset="50%" stopColor="#EFF6FF" />
              <stop offset="100%" stopColor="#FFFBEB" />
            </linearGradient>
            <radialGradient id="tar-g1" cx="10%" cy="10%" r="50%">
              <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#86EFAC" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="tar-g2" cx="90%" cy="10%" r="50%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
            </radialGradient>
            <filter id="tar-blur"><feGaussianBlur stdDeviation="30" /></filter>
          </defs>
          <rect width="1440" height="1800" fill="url(#tar-bg)" />
          <rect width="1440" height="1800" fill="url(#tar-g1)" />
          <rect width="1440" height="1800" fill="url(#tar-g2)" />
          <circle cx="130" cy="200" r="160" fill="#4ADE80" opacity="0.15" filter="url(#tar-blur)" />
          <circle cx="1310" cy="180" r="180" fill="#60A5FA" opacity="0.15" filter="url(#tar-blur)" />
        </svg>
      </div>

      <div className="mx-auto max-w-5xl space-y-14 px-4 py-10">
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        {/* ⛔ Pas de grand aplat sombre : les couleurs saturées du coach ne
            servent que sur les petits objets (pastilles, boutons). Les fonds
            restent clairs — c'est une page qu'on lit en plein jour. */}
        <section className="rounded-[2rem] border border-white bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-8 text-center shadow-xl ring-1 ring-sky-100">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 px-4 py-2 text-xs font-black uppercase tracking-wide text-white shadow">
            🌺 Les tarifs
          </div>
          {/* ⛔ LE MOT « GRATUIT » NE S'ÉCRIT PLUS ICI (Frédéric, 21/08). Il
              apparaissait sept fois sur une page qui demande de l'argent. Un
              mot répété à ce point ne rassure plus, il dévalue : le lecteur
              finit par se demander ce qu'il achète. La chose reste vraie et se
              dit autrement — « ne se paie pas », « personne ne paie »,
              « offert ». C'est le verbe qui porte, pas l'étiquette. */}
          {/* ⭐ LE MÊME TITRE QUE /pourquoi-eleveai, à un verbe près (Frédéric,
              21/08). « Apprendre ne se paie pas » disait vrai mais vendait
              contre soi : sur la page du prix, la première phrase expliquait
              qu'il n'y avait rien à payer. Celle-ci montre d'abord l'étendue de
              ce qu'on ouvre — et le prix se lit ensuite comme petit devant. */}
          <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
            Plusieurs portes pour
            <br />
            <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
              apprendre, progresser, s&apos;évaluer
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-bold leading-relaxed text-slate-600">
            Cinq matières, du CP au Bac. Ce qui se paie, c&apos;est de{" "}
            <strong className="text-slate-900">voir</strong> et de{" "}
            <strong className="text-slate-900">garder</strong> — jamais d&apos;accéder.
          </p>
          {/* ⛔ RETIRÉ (Frédéric, 21/08) : « Si l'enfant d'à côté ne paie pas, il
              apprend exactement la même chose. »
              C'est la règle qui GOUVERNE l'offre — le test qu'on applique à
              chaque idée de monétisation — mais ce n'est pas un argument de
              vente. Écrite sur la page qui demande l'argent, elle dit au lecteur
              qu'il n'a aucune raison de payer, et elle a raison : c'est
              exactement ce qu'elle veut dire en interne.
              ⚠️ La règle ne bouge pas d'un pouce, elle cesse seulement d'être
              criée à l'acheteur. Elle reste vérifiable dans les faits : la
              colonne gratuite de la page ne perd rien. */}
        </section>

        {/* ── LES TROIS PORTES ─────────────────────────────────────────── */}
        <section className="grid gap-5 md:grid-cols-3">
          {portes.map((p) => (
            <div
              key={p.titre}
              className={`flex flex-col rounded-[2rem] border border-white bg-white/90 p-6 text-center shadow-xl ring-4 backdrop-blur transition hover:-translate-y-1 ${p.anneau}`}
            >
              <span className="text-5xl">{p.emoji}</span>
              <h2
                className={`mt-3 bg-gradient-to-r ${p.gradient} bg-clip-text text-xl font-black text-transparent`}
              >
                {p.titre}
              </h2>
              <p className="mt-1 flex-1 text-sm font-bold text-slate-600">{p.sousTitre}</p>
              <p className="mt-3 text-sm font-black text-slate-900">{p.prix}</p>

              <Link
                href={p.ancre}
                className={`mt-4 rounded-2xl bg-gradient-to-r ${p.gradient} px-5 py-3 text-sm font-black text-white shadow transition hover:-translate-y-0.5`}
              >
                Voir l&apos;offre
              </Link>
              <Link
                href={p.page}
                className="mt-2 rounded-2xl bg-white px-5 py-2.5 text-sm font-black text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
              >
                {p.pageLabel}
              </Link>
            </div>
          ))}
        </section>

        {/* ── FAMILLE — la carte principale ────────────────────────────── */}
        <section
          id="famille"
          className="relative scroll-mt-24 rounded-[2rem] border border-white bg-white/90 p-8 shadow-2xl ring-4 ring-emerald-100 backdrop-blur"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 px-5 py-1.5 text-xs font-black text-white shadow-lg">
            🏠 Pour la maison
          </div>

          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
            <div className="text-center md:text-left">
              {/* ⚠️ « MOINS D'UN EURO PAR MOIS » ÉTAIT FAUX : 12 ÷ 12 = 1, pas
                  moins. Le mot « moins » cherchait à impressionner et affaiblit
                  au contraire — un euro rond se retient, « moins d'un euro »
                  sonne comme un arrondi qu'on n'ose pas nommer.
                  ⭐ LE MOIS EST PASSÉ EN GRAND, L'ANNÉE EN DESSOUS (Frédéric,
                  22/08 : « on met tout par mois ! »). C'était l'inverse jusque-là
                  — 12 € en corps 72 et « 1 € par mois » en petit — donc la page
                  criait le nombre le moins favorable et chuchotait le meilleur.
                  1 € se compare à un café, 12 € à un abonnement de plus. */}
              <p className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-6xl font-black text-transparent sm:text-7xl">
                {montant(PRIX_FAMILLE_MOIS)}
              </p>
              <p className="mt-1 text-lg font-black text-slate-900">par mois</p>
              <p className="mt-1 text-sm font-black text-emerald-700">
                {euros(PRIX_FAMILLE_AN)} par an · par famille, quel que soit le
                nombre d&apos;enfants
              </p>

              <p className="mt-5 text-base font-bold leading-relaxed text-slate-700">
                Le coach, les exercices, les évaluations ne se paient pas, et l&apos;élève
                garde ses résultats.
                <br />
                {/* ⭐ « ET DE SAVOIR QUOI FAIRE ENSUITE » (Frédéric, 21/08 : « de
                    le voir progresser, d'avoir des recommandations
                    personnalisées »). « Se souvenir » était juste mais passif —
                    un parent n'achète pas une mémoire, il achète de savoir quoi
                    faire dimanche soir. La recommandation est la seule moitié
                    actionnable de l'offre, et c'était celle qui manquait. */}
                <strong className="text-slate-950">
                  Ce qui se paie, c&apos;est que ça se souvienne de votre enfant —
                  et que ça vous dise quoi travailler ensuite.
                </strong>
              </p>

              {venteOuverte ? (
                <>
                  <Link
                    href="/abonnement/famille"
                    className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-emerald-400 to-green-500 px-8 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    S&apos;abonner — {montant(PRIX_FAMILLE_MOIS)} par mois
                  </Link>
                  <p className="mt-3 text-xs font-bold text-slate-500">
                    Sans engagement · 14 jours pour changer d&apos;avis · Apple Pay et
                    Google Pay
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-500">
                    Vous avez un code ? Vous le saisirez juste avant de valider.
                  </p>
                </>
              ) : (
                <>
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-emerald-400 to-green-500 px-8 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Prévenez-moi à l&apos;ouverture
                  </Link>
                  {/* ⛔ PAS DE DÉLAI ANNONCÉ. La phrase disait « l'abonnement
                      ouvre dans quelques jours » — une date implicite, qui se
                      périme toute seule et que personne ne vient corriger.
                      L'ouverture ne dépend pas du calendrier mais de l'état du
                      produit : la vue du parent, et les fiches de cours de
                      maths et de français (règle de Frédéric, 22/08 : « quand
                      les fiches seront prêtes on envoie Stripe, pas avant »).
                      On dit donc CE QUI MANQUE, comme sur /espace-parents, et
                      la phrase reste vraie aussi longtemps qu'il le faudra. */}
                  <p className="mt-3 text-xs font-bold text-slate-500">
                    Cette vue se construit en ce moment. Le prix ci-dessus est
                    ferme, et rien n&apos;est encaissé tant qu&apos;elle n&apos;est pas
                    prête.
                  </p>
                </>
              )}
            </div>

            <ul className="space-y-3 rounded-3xl bg-gradient-to-br from-emerald-50 to-green-50 p-6 ring-1 ring-emerald-100">
              {inclusFamille.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-bold text-slate-700">
                  <span className="mt-0.5 text-lg text-emerald-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ⛔ LE MUR DU GRATUIT EST PARTI (Frédéric, 21/08). Douze tuiles
            énuméraient les outils gratuits — coach maths, coach français,
            English Maths… — juste sous la carte Famille. C'était une redite :
            le titre de la page dit déjà « Tout ce qui fait apprendre est
            gratuit » et la carte le répète ligne 2. Le catalogue, lui, vit sur
            `/espace-parents` et `/explorer`, dont c'est le sujet.
            ⚠️ Ce qu'on perd : le poids visuel du gratuit, qui rendait les 12 €
            évidents par contraste. Si la page se met à se lire comme une page
            payante, c'est là qu'il faudra regarder. */}

        {/* ── PREMIUM S'ACHÈTE OU SE GAGNE ─────────────────────────────── */}
        <section className="rounded-[2rem] bg-gradient-to-r from-cyan-500 via-emerald-500 to-orange-400 p-1 shadow-xl">
          <div className="rounded-[1.85rem] bg-white/95 p-8 text-center backdrop-blur">
            <p className="text-3xl">⭐</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Premium s&apos;achète — ou se gagne
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-bold leading-relaxed text-slate-600">
              Le badge, le thème, composer son parcours : compris dans l&apos;abonnement
              famille. <strong className="text-slate-900">Ou gagnés</strong> en aidant
              quelqu&apos;un — proposer un exercice, signaler une erreur, laisser un avis,
              expliquer à un autre élève.
            </p>
            <p className="mx-auto mt-4 max-w-xl rounded-2xl bg-amber-50 px-6 py-3 text-sm font-black text-amber-900 ring-1 ring-amber-200">
              Comme ça, le badge ne dit pas « ma famille a payé ». Il dit « j&apos;ai fait
              quelque chose pour les autres ».
            </p>
          </div>
        </section>

        {/* ── CLASSE ET ÉTABLISSEMENT ──────────────────────────────────── */}
        <section>
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-5 py-2 text-xs font-black uppercase tracking-wide text-white shadow">
              🏫 Quand c&apos;est l&apos;école qui paie
            </span>
            {/* ⚠️ LE TITRE DISAIT « on divise par deux à chaque fois » (12 → 6
                → 3). La règle a changé le 21/08 au soir : un dashboard vaut
                12 € par an, celui d'une famille comme celui d'un professeur, et
                le forfait du prof ne dépend plus du nombre d'élèves. La phrase
                qui décrivait l'ancienne grille aurait survécu au changement de
                prix — c'est exactement le défaut que `lib/tarifs.ts` existe
                pour empêcher, et il ne se voit pas dans un chiffre. */}
            {/* ⛔ « PLUS LE CERCLE S'ÉLARGIT, MOINS ÇA COÛTE PAR ENFANT » EST
                PARTI (22/08) — c'était devenu faux, et faux dans le sens qui se
                retourne contre nous : la classe revient à 0,40 € par élève,
                l'établissement à 2 €. Le cercle s'élargit et le prix par enfant
                est CINQ FOIS plus haut. Un principal qui vérifie la phrase du
                titre trouve le contraire, et ne lit pas la suite.
                ⚠️ Ce titre-là avait déjà survécu à une correction : le
                paragraphe en dessous avait été réécrit pour la nouvelle grille,
                pas le titre. Une section se relit en entier ou pas du tout.
                ⭐ Ce qui le remplace ne compare plus les offres entre elles, il
                dit la seule chose que le professeur veut savoir — et elle, elle
                reste vraie quel que soit le tarif établissement. */}
            <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
              Trois forfaits, et pas un élève à compter
            </h2>
            {/* ⚠️ « PAR AN », JAMAIS SANS SON UNITÉ. Le même « 1 € » vit deux
                fois dans cette grille : 1 € par MOIS pour la famille, 1 € par AN
                pour l'élève en classe. Frédéric s'y est trompé lui-même le
                22/08 — « ça fait un euro par élève et par mois en gros » — et
                l'écart est d'un facteur douze sur tout le chiffre d'affaires.
                ⛔ Ne jamais écrire « 1 € » seul sur cette page. */}
            <p className="mx-auto mt-2 max-w-2xl text-sm font-bold text-slate-600">
              C&apos;est le même abonnement, au même élève — seul le payeur
              change, et le prix descend avec lui. Une famille dans son coin paie{" "}
              {montant(PRIX_FAMILLE_MOIS)} par mois. Si son professeur organise
              la classe, {montant(PRIX_CLASSE_ELEVE_MOIS)}. Si
              l&apos;établissement prend tout en charge,{" "}
              {montant(PRIX_ETABLISSEMENT_ELEVE_MOIS)} — et jamais plus de{" "}
              {euros(PLAFOND_ETABLISSEMENT_AN)} par an. On paie une fois, jamais
              deux.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {collectif.map((o) => (
              <div
                key={o.nom}
                id={o.id}
                className={`flex scroll-mt-24 flex-col rounded-[2rem] border border-white bg-white/90 p-6 shadow-xl ring-4 backdrop-blur transition hover:-translate-y-1 ${o.anneau}`}
              >
                <span className="self-start rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
                  {o.badge}
                </span>

                <h3 className="mt-4 text-xl font-black text-slate-950">{o.nom}</h3>
                <p
                  className={`mt-1 bg-gradient-to-r ${o.gradient} bg-clip-text text-3xl font-black text-transparent`}
                >
                  {o.prix}
                </p>
                <p className="mt-1 text-sm font-black text-slate-500">{o.exemple}</p>
                <p className="mt-3 text-sm font-bold leading-relaxed text-slate-600">
                  {o.description}
                </p>

                <ul className="mt-5 flex-1 space-y-2">
                  {o.inclus.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm font-bold text-slate-700"
                    >
                      <span className="mt-0.5 text-emerald-500">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`mt-6 block rounded-2xl bg-gradient-to-r ${o.gradient} px-5 py-3 text-center text-sm font-black text-white shadow transition hover:-translate-y-0.5`}
                >
                  {o.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* ⭐ L'ÉCHELLE CHIFFRÉE SUR UN SEUL EFFECTIF — et c'est aussi le
              test de non-régression de la grille : ces trois totaux doivent
              rester strictement décroissants. Une inversion, et un payeur a
              intérêt à en contourner un autre ; c'est par là qu'un principal
              est entré dans chacune des cinq versions précédentes, et ça ne se
              voit jamais dans les taux — seulement ici.
              ⛔ CE BLOC A REMPLACÉ « FAITES LE CALCUL », qui posait 360 € contre
              30 € et concluait « douze fois moins cher ». Frédéric : « on tourne
              en rond ». Il avait raison — l'ancien bloc opposait deux offres
              sous les yeux de la seule personne qu'on essaie de faire payer, et
              lui disait d'attendre. Celui-ci ne compare plus des offres, il
              compare des PAYEURS pour le même élève. */}
          <div className="mt-6 rounded-[2rem] border border-emerald-200 bg-emerald-50/80 p-6 shadow-lg backdrop-blur">
            <p className="text-center text-lg font-black text-slate-950">
              Le même collège de {ECHELLE.eleves} élèves, selon qui paie
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { qui: "Chaque famille seule", total: ECHELLE.siLesFamillesPaient, ton: "text-slate-600" },
                { qui: "Par les classes", total: ECHELLE.siLesClassesPaient, ton: "text-sky-700" },
                { qui: "Par l'établissement", total: ECHELLE.siLEtablissementPaie, ton: "text-emerald-700" },
              ].map((l) => (
                <div key={l.qui} className="rounded-2xl bg-white/80 px-4 py-3 text-center ring-1 ring-emerald-100">
                  <span className="block text-xs font-black uppercase tracking-wide text-slate-400">
                    {l.qui}
                  </span>
                  <span className={`mt-1 block text-2xl font-black ${l.ton}`}>
                    {euros(l.total)}
                  </span>
                  <span className="block text-xs font-bold text-slate-500">par an</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-sm font-bold text-slate-600">
              Et dans les trois cas, l&apos;enfant dont personne n&apos;a payé
              travaille exactement à l&apos;identique — le coach, les exercices et
              les évaluations ne se ferment jamais.
            </p>
          </div>
        </section>

        {/* ── LE PILOTE, OFFERT ────────────────────────────────────────── */}
        <section className="flex flex-col items-center gap-6 rounded-[2rem] border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6 text-center shadow-lg backdrop-blur sm:flex-row sm:text-left">
          <div className="shrink-0 text-5xl">🎁</div>
          <div className="flex-1">
            <h2 className="text-xl font-black text-slate-950">
              Quatre semaines offertes, pour essayer
            </h2>
            <p className="mt-1 text-sm font-bold text-slate-600">
              Accès complet pour une classe entière, sans engagement. Pour essayer avant de
              décider quoi que ce soit.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 text-sm font-black text-white shadow transition hover:-translate-y-0.5"
          >
            Demander le pilote
          </Link>
        </section>

        {/* ── COMPARATIF ───────────────────────────────────────────────── */}
        <section className="rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-xl backdrop-blur">
          <div className="mb-6 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">
              Comparatif
            </p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">EleveAI et les autres</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-black uppercase tracking-wide text-slate-400">
                  <th className="pb-3 pr-6">Outil</th>
                  <th className="pb-3 pr-6">Pour qui</th>
                  <th className="pb-3 pr-6">Tarif</th>
                  <th className="pb-3">Soit par an</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparatif.map((c) => {
                  const nous = c.outil.includes("EleveAI");
                  return (
                    <tr key={`${c.outil}-${c.pourQui}`} className={nous ? "bg-emerald-50" : ""}>
                      <td className="py-3 pr-6 font-black text-slate-950">{c.outil}</td>
                      <td className="py-3 pr-6 font-bold text-slate-500">{c.pourQui}</td>
                      <td className="py-3 pr-6 font-bold text-slate-600">{c.prix}</td>
                      <td
                        className={`py-3 font-black ${nous ? "text-emerald-600" : "text-slate-500"}`}
                      >
                        {c.soit}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-5 max-w-2xl rounded-2xl bg-amber-50 px-6 py-3 text-center text-sm font-black text-amber-900 ring-1 ring-amber-200">
            Chez IXL, le deuxième enfant coûte 4 € de plus par mois. Ici, la famille entière
            est comprise dans les {euros(PRIX_FAMILLE_AN)}.
          </p>
          {/* ⭐ POURQUOI ON EST MOINS CHER (Frédéric, 21/08). Un écart de un à
              vingt sans explication ne se lit pas comme une bonne affaire, il se
              lit comme un piège — ou comme un produit au rabais. Il faut le
              justifier là où il se voit, sous le tableau.
              ⚠️ Dit à la première personne du « ce que nous n'avons pas », et
              jamais en accusant les autres de ce qu'ils paient : on ne connaît
              pas leurs comptes, et l'argument est aussi fort à l'endroit. */}
          <div className="mt-6 rounded-3xl bg-gradient-to-br from-sky-50 to-white p-6 ring-1 ring-sky-100">
            <h3 className="text-center text-lg font-black text-slate-950">
              Pourquoi c&apos;est possible
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                {
                  emoji: "🏦",
                  titre: "Aucun investisseur à rembourser",
                  texte:
                    "Pas de levée de fonds, donc pas d'argent à rendre avec des intérêts. Le prix n'a personne d'autre à financer que le site.",
                },
                {
                  emoji: "🤝",
                  titre: "Aucun commercial",
                  texte:
                    "Pas d'équipe de vente, pas de salons, pas de publicité achetée. Ce sont les enseignants qui en parlent aux enseignants.",
                },
                {
                  emoji: "✍️",
                  titre: "Les exercices sont écrits, pas achetés",
                  texte:
                    "Un enseignant les écrit un par un, sur son temps. C'est du travail déjà fait — il ne se refacture pas à chaque nouvel élève.",
                },
                {
                  emoji: "⚙️",
                  titre: "Un élève de plus ne coûte presque rien",
                  texte:
                    "Le coach tourne sur un modèle léger : une explication coûte une fraction de centime. C'est ce qui permet de ne faire payer que le suivi.",
                },
                /* ⭐ LA CARTE QUI MANQUAIT, ET C'EST LA PLUS IMPORTANTE
                   (Frédéric, 21/08 : « sinon ils voient un prix 10 fois plus
                   bas et pour eux c'est 10 fois moins de qualité »).
                   Les quatre autres disent ce qu'on N'A PAS — investisseurs,
                   commerciaux, coûts. Aucune ne disait ce qu'on A, et c'est
                   pourtant là que se joue le doute : un parent qui lit « moins
                   cher » sans savoir pourquoi conclut « moins bon ».
                   ⚠️ LES DEUX MOITIÉS SE TIENNENT ET NE SE SÉPARENT PAS. Dire
                   « c'est l'IA qui produit » sans dire qui vérifie, c'est
                   confirmer la crainte au lieu de la lever. */
                {
                  emoji: "🤖",
                  titre: "L'IA démultiplie, l'enseignant vérifie",
                  texte:
                    "Ce qui demandait une équipe, un enseignant le produit seul avec l'IA. Mais rien n'est publié sans être relu par un professeur en exercice, devant ses propres élèves — c'est ce qui sépare un exercice conforme du programme d'un texte seulement plausible.",
                },
              ].map((r) => (
                <div key={r.titre} className="flex items-start gap-3">
                  <span className="text-2xl">{r.emoji}</span>
                  <span>
                    <span className="block text-sm font-black text-slate-950">{r.titre}</span>
                    <span className="mt-0.5 block text-xs font-bold leading-relaxed text-slate-600">
                      {r.texte}
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-sm font-black text-slate-800">
              Écrit par un enseignant, vérifié par un enseignant, démultiplié par
              l&apos;IA.
              <span className="mt-1 block font-bold text-slate-600">
                Le prix bas n&apos;est pas un défaut de qualité : c&apos;est ce qui
                reste quand on enlève tout le reste. Ce qu&apos;on n&apos;enlève
                jamais, c&apos;est le professeur qui relit — et qui imagine Ti Margo,
                le marché de Saint-Pierre et le tour de l&apos;île, choses
                qu&apos;aucune machine n&apos;a envie d&apos;inventer.
              </span>
            </p>
          </div>

          <p className="mt-4 text-center text-xs font-bold text-slate-400">
            * Tarifs relevés sur les sites officiels — IXL en août 2026, les autres en juin 2026.
          </p>
        </section>

        {/* ── LA PREUVE ────────────────────────────────────────────────── */}
        <section className="rounded-[2rem] border border-white bg-gradient-to-br from-amber-50 via-white to-sky-50 p-8 text-center shadow-xl ring-1 ring-amber-100">
          <p className="text-4xl">🧑‍🏫</p>
          <h2 className="mt-3 text-2xl font-black text-slate-950">
            Déjà utilisé dans un collège, à La Réunion, avec de vrais élèves
          </h2>
          {/* ⛔ LA SIGNATURE NE SE PERD PAS EN CHEMIN (21/08/2026). La version
              précédente de cette page portait « Conçu par Frédéric Lacoste » et
              ma réécriture l'avait laissée tomber. Ce n'est pas une mention
              d'auteur parmi d'autres : le nom est porté exprès partout — les 14
              cahiers, le pied de page, `/qui-sommes-nous`, les documents
              légaux — pour qu'il devienne une marque. Une page qui parle
              d'argent est la dernière d'où il devrait disparaître.
              Formulation reprise mot pour mot des trois moteurs de cahiers. */}
          <p className="mx-auto mt-3 max-w-2xl text-sm font-bold leading-relaxed text-slate-600">
            EleveAI n&apos;a pas de levée de fonds, pas d&apos;équipe de cinquante personnes,
            pas de service commercial. Les exercices ont été écrits un par un, pas achetés.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-base font-black text-slate-900">
            Conçu par Frédéric Lacoste, enseignant à La Réunion, pour ses élèves — et pour
            vous.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-black">
            {[
              "Coach Maths IA",
              "Coach Français IA",
              "English Maths",
              "CP → Terminale",
              "Sans publicité",
              "Données dans l'UE",
            ].map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-white px-4 py-2 text-slate-700 shadow-sm ring-1 ring-slate-200"
              >
                {chip} ✓
              </span>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section>
          <h2 className="mb-6 text-center text-2xl font-black text-slate-950">
            Les questions qu&apos;on nous pose
          </h2>
          <div className="space-y-3">
            {faq.map((f) => (
              <details
                key={f.q}
                className="rounded-[1.5rem] border border-white/80 bg-white/80 px-6 py-4 shadow-md backdrop-blur"
              >
                <summary className="cursor-pointer font-black text-slate-950">{f.q}</summary>
                <p className="mt-3 text-sm font-bold leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── CTA FINAL ────────────────────────────────────────────────── */}
        <section className="rounded-[2rem] border border-white bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-8 text-center shadow-xl ring-1 ring-sky-100">
          <p className="text-4xl">💬</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Une question ?</h2>
          <p className="mt-2 font-bold text-slate-600">
            Réponse sous 24 h · Pas de commercial · Juste une conversation.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 px-8 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            📩 Nous écrire
          </Link>
        </section>
      </div>
    </main>
  );
}
