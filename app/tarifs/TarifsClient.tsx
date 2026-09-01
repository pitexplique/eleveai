"use client";

import Link from "next/link";

import { VENTE } from "@/lib/legal/editeur";
// ⚠️⚠️ TOUT LE VOCABULAIRE DE L'ÉCHELLE A QUITTÉ CET IMPORT LE 01/09/2026, ET
// AVEC LUI L'HISTOIRE QUE RACONTAIT CETTE PAGE. `ECHELLE`, `EXEMPLE_CLASSE`,
// `PRIX_CLASSE_*`, `REMISE_CLASSE_POURCENT` et les quatre `*_ETABLISSEMENT*`
// n'existent plus dans `lib/tarifs.ts` : il n'y a plus de payeur plus large, ni
// de tarif de groupe, ni de remise. Un seul payeur — la famille — et deux
// façons de payer. L'enseignant, lui, ne paie rien.
import {
  ANNUEL_AU_TARIF_MENSUEL,
  ANNUEL_EQUIVALENT_MENSUEL,
  ENSEIGNANT,
  MOIS_OFFERTS,
  PERIODE_ANNUELLE,
  PRIX_ANNUEL,
  PRIX_MENSUEL,
  REDUCTION_ANNUEL_POURCENT,
  centimes,
  montant,
  pourcent,
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
    prix: `${montant(PRIX_MENSUEL)} par mois · une adresse courriel, toute la maison`,
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
    /* ⭐ LE PROFESSEUR NE PAIE PLUS RIEN DEPUIS LE 01/09/2026, ET C'EST CE QUI
       A DÉNOUÉ CINQ GRILLES. Toutes butaient sur la même question — comment le
       prof paie-t-il, et avec l'argent de qui ? Elle ne se pose plus.
       ⛔ MAIS SA GRATUITÉ NE SE PROPAGE PAS, et cette porte est le premier
       endroit où on le lit : « gratuit pour les enseignants » dit seul se
       comprend « gratuit pour ma classe », et un professeur de bonne foi
       l'annoncera ainsi à ses familles. Le sous-titre du prix porte donc la
       restriction, pas une note de bas de page. */
    prix: `Gratuit, à titre personnel`,
    ancre: "#enseignant",
    page: "/espace-profs",
    pageLabel: "L'outil du professeur",
    gradient: "from-sky-400 to-blue-500",
    anneau: "ring-sky-100",
  },
  // ⛔⛔ LA PORTE « POUR LES ÉTABLISSEMENTS » EST RETIRÉE LE 29/08/2026 —
  // décision de Frédéric : « je ne vends plus aux établissements, c'est du
  // pénal ». ⛔ Et le 01/09, ni collectivité ni atelier n'ont pris sa place :
  // « que élèves et profs ». Une grille les prévoyait, elle n'est pas mise en
  // œuvre — voir le rapport de session.
];

/* ⛔⛔ CE TABLEAU S'APPELAIT `collectif` ET VENDAIT DEUX OFFRES — la classe et
   l'établissement. Il n'en vend plus aucune depuis le 01/09/2026 : il DONNE.
   L'établissement est parti le 29/08 puis a été déclaré interdit le 31/08
   (Frédéric : « on n'a pas le droit de vendre à un établissement en tant que
   contractuel en CDI, c'est du pénal »). La classe est partie le 01/09 avec la
   nouvelle grille — plus de tarif de groupe, plus de remise, plus de « prix
   d'un livre ». Ce qui reste est l'offre enseignant, et elle est à zéro euro.

   ⚠️ CE QUE CE CHANGEMENT EMPORTE, à savoir avant de revenir en arrière : la
   page ne raconte plus d'échelle. « Plus le payeur est large, moins l'élève
   coûte » était l'argument qui tenait toute la section, et il n'a plus d'objet
   avec un seul payeur. Ce qui le remplace n'est pas un argument commercial,
   c'est une preuve : le seul professionnel de l'école qui pourrait payer ne
   paie pas.

   Ce qui n'est PAS touché : /espace-ecoles et /dashboard-principal répondent
   toujours, et les établissements déjà installés gardent leur outil. */
const pourLEnseignant = {
  id: "enseignant",
  nom: "Enseignant",
  badge: "🧑‍🏫 À titre personnel",
  prix: "Gratuit",
  exemple: `Vérifié sur ${ENSEIGNANT.verification}`,
  description:
    "Le prof voit sa classe sans corriger : devoirs suivis, bulletins, qui décroche. Il ne paie rien, il n'avance rien, il ne ramasse rien — et il n'a l'autorisation de personne à demander.",
  inclus: [
    "Toutes les matières, tous les élèves de la classe",
    "Évaluation automatique, sans correction",
    "Devoirs maison faits et suivis en ligne",
    "Tableau de bord professeur",
    /* ⛔ LA LIGNE QUI EMPÊCHE LE MALENTENDU, ET ELLE EST DANS LA LISTE DES
       AVANTAGES EXPRÈS. Un professeur lit « gratuit pour les enseignants » et
       comprend « gratuit pour ma classe » — puis l'annonce à ses familles de
       bonne foi, et ce sont elles qui découvrent le prix. La restriction ne
       peut donc pas vivre en note de bas de page : elle se lit au milieu de ce
       qu'on offre, là où on ne saute pas de ligne. */
    "Gratuit pour vous, pas pour les familles de vos élèves",
    /* ⛔ LA LIGNE QUI TIENT LE MODÈLE, ET ELLE EST DIFFICILE À TENIR. Le risque
       n'est pas dans le code, il est dans la salle : un professeur qui sait qui
       a payé le sait devant les autres. ⛔ Aucun compteur « 14 abonnés sur 30 »
       nulle part — c'est exactement le genre de chiffre qu'on ajoute un jour
       parce qu'il est facile à calculer. */
    "Vous ne savez pas qui a payé, et vous ne le saurez jamais",
  ],
  cta: "Créer mon compte enseignant",
  lien: "/espace-profs",
  gradient: "from-sky-400 to-blue-500",
  anneau: "ring-sky-100",
};

/**
 * ⚠️ COMPARER CE QUI SE COMPARE. L'ancienne version alignait le prix
 * ÉTABLISSEMENT d'EleveAI contre des prix FAMILLE (Kwyk, Lumni) : le rapport
 * était flatteur et faux. Ici chaque ligne dit pour qui elle vaut, et EleveAI
 * apparaît deux fois — une par public.
 */
/**
 * ⭐ LE PRIX D'IXL, RELEVÉ ET NOMMÉ UNE FOIS — parce qu'on s'y compare deux
 * fois : dans le tableau, et dans la phrase qui le suit.
 *
 * ⛔ IL NE SUIT PAS `lib/tarifs.ts` ET C'EST NORMAL : c'est le prix de
 * quelqu'un d'autre, un relevé, pas une de nos constantes. Ce qui doit être
 * calculé, c'est le RAPPORT — il a valu 20 le 22/08, 10 le 01/09 au matin, 12
 * le 01/09 au soir. Un multiplicateur écrit à la main survit à chaque
 * changement de grille en disant le mauvais chiffre, et c'est le genre de
 * phrase qu'un journaliste recopie.
 */
const IXL_FAMILLE_AN = 239;
const RAPPORT_IXL = Math.round(IXL_FAMILLE_AN / PRIX_ANNUEL);

const comparatif = [
  {
    outil: "IXL",
    pourQui: "Une famille · toutes matières",
    prix: "19,95 € / mois",
    soit: `${IXL_FAMILLE_AN} € / an · +4 €/mois par enfant en plus`,
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
    prix: `${montant(PRIX_MENSUEL)} / mois`,
    soit: `${montant(ANNUEL_AU_TARIF_MENSUEL)} / an — et pas un centime par enfant en plus`,
  },
  {
    outil: "EleveAI 🌺",
    /* ⚠️ LA PÉRIODE COMPLÈTE NE TIENT PAS DANS UNE CELLULE. Écrite en entier
        ici — « sur l'année scolaire, et non sur douze mois glissants » — elle
        faisait trois lignes dans une colonne où les autres en font une, et
        déformait tout le tableau. Elle se lit en toutes lettres sur la carte
        Famille, qui est l'endroit où l'on souscrit ; ici, « à l'année scolaire »
        suffit à dire que ce n'est pas douze mois glissants. */
    pourQui: "Une famille · à l'année scolaire",
    /* ⚠️ LA COLONNE « TARIF » RESTE AU MOIS POUR TOUT LE MONDE, Y COMPRIS SUR
       LA LIGNE ANNUELLE. C'est un équivalent, pas une formule qu'on facture —
       d'où « soit » et non « / mois » sec. Une ligne qui décroche d'unité au
       milieu d'une colonne oblige le lecteur à convertir de tête, et un tableau
       qu'il faut convertir ne se lit pas, il se survole. */
    prix: `soit ${centimes(ANNUEL_EQUIVALENT_MENSUEL)} / mois`,
    soit: `${montant(PRIX_ANNUEL)} / an — ${pourcent(REDUCTION_ANNUEL_POURCENT)} de moins qu'au mois`,
  },
  // ⛔ La ligne « Tout un établissement » est retirée le 29/08/2026 avec l'offre,
  // et la ligne « Une classe » le 01/09/2026 avec le tarif de groupe.
  // ⚠️ EleveAI apparaît toujours DEUX fois, mais ce ne sont plus deux PUBLICS —
  // ce sont deux FORMULES pour le même public. La note ci-dessus reste valable :
  // chaque ligne dit pour qui elle vaut. Kwyk garde son « par élève ·
  // établissement », c'est SON prix à lui.
];

const faq = [
  {
    q: "Mon enfant peut-il utiliser EleveAI sans payer ?",
    a: "Oui, entièrement. Le coach dans les cinq matières, les exercices corrigés, les parcours, le calcul rapide, les défis, les cahiers, les fiches, les évaluations blanches : rien de tout cela ne se paie, sans limite de temps et sans publicité. Et il garde ses résultats. Rien de tout ça ne deviendra payant.",
  },
  {
    q: `Alors qu'est-ce que je paie avec les ${montant(PRIX_MENSUEL)} par mois ?`,
    a: "La fenêtre du parent, et ce qu'elle vous dit de faire. Votre enfant, lui, voit déjà sa progression. Ce que l'abonnement ouvre, c'est votre vue à vous : son bulletin, ce qu'il a travaillé cette semaine, son historique — et surtout des recommandations personnalisées, notion par notion, qui vous disent quoi reprendre maintenant. Elles sont calculées sur des règles explicites, pas par une IA opaque : je peux vous expliquer chacune d'elles, et un professeur aussi. Vous n'achetez pas ce qu'il apprend, vous achetez de le voir apprendre et de savoir quoi faire ensuite.",
  },
  {
    q: "Par enfant ou par famille ?",
    a: "Par famille, quel que soit le nombre d'enfants, sur une seule adresse courriel. Le frère ou la sœur d'à côté n'a pas à apprendre moins parce qu'il est le deuxième.",
  },
  /* ⭐ LA QUESTION QUE POSE TOUTE OFFRE À DEUX FORMULES, et il faut y répondre
     par le calcul plutôt que par « c'est plus avantageux ». ⛔ Le nombre de mois
     ne s'écrit pas à la main : la grille annonçait « deux mois offerts » et
     l'arithmétique en donne quatre — voir `MOIS_OFFERTS` dans lib/tarifs.ts. */
  {
    q: "Mensuel ou annuel, qu'est-ce que je gagne ?",
    a: `L'annuel revient à ${montant(PRIX_ANNUEL)} au lieu de ${montant(ANNUEL_AU_TARIF_MENSUEL)} — ${pourcent(REDUCTION_ANNUEL_POURCENT)} de moins, l'équivalent de ${MOIS_OFFERTS} mois offerts. En échange, il couvre l'année scolaire et non douze mois glissants : souscrit en janvier, il s'arrête à la fin de l'année scolaire en cours. Le mensuel, lui, est sans engagement et s'arrête quand vous voulez.`,
  },
  // ⛔⛔ « MON COLLÈGE PEUT-IL PAYER POUR TOUT LE MONDE ? » EST RETIRÉE LE
  // 29/08/2026, avec l'offre qu'elle vendait. ⚠️ Elle était balisée en
  // `FAQPage` : une réponse qui reste ici part dans le JSON-LD et donc dans le
  // résultat de recherche, où elle continuerait de proposer un contrat qu'on ne
  // signe plus. C'est la raison pour laquelle on la retire au lieu de la
  // réécrire en « non ».
  {
    q: "Combien paie le professeur ?",
    a: `Rien. Le compte enseignant est gratuit, à titre personnel, et il s'ouvre sur ${ENSEIGNANT.verification} — sans demander l'autorisation de personne. Son tableau de bord de classe vient avec.`,
  },
  /* ⭐ LA QUESTION QU'UN PROFESSEUR VA POSER, ET IL FAUT Y RÉPONDRE AVANT QU'IL
     L'ANNONCE À SES FAMILLES. « Gratuit pour les enseignants » se comprend
     spontanément « gratuit pour ma classe » ; un professeur de bonne foi le
     répétera, et ce sont les familles qui découvriront le prix. Cette réponse
     part en plus dans le `FAQPage`, donc dans les résultats de recherche —
     c'est-à-dire à l'endroit exact où la question se pose. */
  {
    q: "Si je suis enseignant, mes élèves ont-ils EleveAI gratuitement ?",
    a: "Vos élèves l'ont déjà gratuitement, et tout le monde : le coach, les exercices, les parcours et les évaluations ne se paient pas, avec ou sans professeur. Ce que votre compte gratuit ne débloque pas, c'est l'abonnement des PARENTS de vos élèves — leur fenêtre à eux, celle qui montre le bulletin et dit quoi reprendre. Elle reste au tarif normal. Autrement dit : la gratuité enseignant est la vôtre, elle ne se transmet pas à la classe.",
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

        {/* ── LES DEUX PORTES ──────────────────────────────────────────── */}
        {/* ⚠️ `md:grid-cols-2` ET NON 3 : la troisième porte (établissement) est
            partie le 29/08, mais la grille est restée à trois colonnes jusqu'au
            01/09 — deux cartes collées à gauche et un vide à droite, exactement
            la place de l'offre retirée, dessinée en creux. Le défaut ne se voit
            pas dans le code et ne casse rien : il ne se voit qu'au rendu, en
            écran large. La même correction avait déjà été faite le 29/08 sur la
            grille du dessous ; celle-ci avait été oubliée. */}
        <section className="mx-auto grid max-w-3xl gap-5 md:grid-cols-2">
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
              {/* ⭐ LE MOIS EST EN GRAND, L'ANNUEL EN ENCADRÉ EN DESSOUS
                  (Frédéric, 22/08 : « on met tout par mois ! »). Le mensuel est
                  le nombre qui se compare à la vie — un café — et c'est lui qui
                  fait franchir la porte ; l'annuel est celui qu'on recommande
                  une fois entré. L'inverse criait le nombre le moins favorable.
                  ⚠️ ET CE SONT DEUX FORMULES, PAS UN PRIX ET SON ARRONDI : à
                  2,50 € par mois l'année vaut 30 €, pas 19,90 €. Écrire « 19,90 €
                  par an » sous « 2,50 € par mois » sans dire que c'est un autre
                  contrat, c'est laisser croire à une division. */}
              <p className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-6xl font-black text-transparent sm:text-7xl">
                {montant(PRIX_MENSUEL)}
              </p>
              <p className="mt-1 text-lg font-black text-slate-900">
                par mois, sans engagement
              </p>
              {/* ⭐ « UNE ADRESSE COURRIEL » EST AJOUTÉ LE 01/09 : c'est la
                  définition concrète du foyer, et c'est ce qu'on demande à la
                  souscription. « Par famille » décrit une intention, une adresse
                  décrit ce qui se passe — et un parent qui hésite veut savoir
                  combien de comptes il devra créer, pas comment on appelle son
                  foyer. */}
              <p className="mt-1 text-sm font-black text-emerald-700">
                Une adresse courriel, tous les enfants de la maison
              </p>

              {/* ⛔ LA PÉRIODE EST COLLÉE AU PRIX ANNUEL, PAS RENVOYÉE AUX CGV.
                  Un abonnement « annuel » souscrit en janvier ne court pas
                  jusqu'au janvier suivant : il s'arrête avec l'année scolaire.
                  C'est une mention obligatoire, et l'endroit où elle doit se
                  lire est celui où le prix se décide.
                  ⛔ Et « ${MOIS_OFFERTS} mois » se calcule : la grille annonçait
                  « deux mois offerts », l'arithmétique en donne quatre. Voir
                  `MOIS_OFFERTS` dans lib/tarifs.ts. */}
              <div className="mt-4 rounded-2xl bg-emerald-50 px-5 py-3 ring-1 ring-emerald-200">
                <p className="text-sm font-black text-emerald-900">
                  Ou {montant(PRIX_ANNUEL)} pour l&apos;année —{" "}
                  {pourcent(REDUCTION_ANNUEL_POURCENT)} de moins,
                  l&apos;équivalent de {MOIS_OFFERTS} mois offerts
                </p>
                <p className="mt-0.5 text-xs font-bold text-emerald-800">
                  soit {centimes(ANNUEL_EQUIVALENT_MENSUEL)} par mois, {PERIODE_ANNUELLE}
                </p>
              </div>

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
                    S&apos;abonner — {montant(PRIX_MENSUEL)} par mois
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

        {/* ── L'ENSEIGNANT ─────────────────────────────────────────────── */}
        <section>
          <div className="mb-6 text-center">
            {/* ⚠️ « QUAND C'EST L'ÉCOLE QUI PAIE » EST TOMBÉ LE 29/08 avec
                l'offre établissement, et « quand le professeur organise sa
                classe » le 01/09 avec le tarif de groupe. Il ne s'agit plus de
                savoir QUI PAIE dans cette section : personne n'y paie. */}
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-5 py-2 text-xs font-black uppercase tracking-wide text-white shadow">
              🧑‍🏫 Et si vous enseignez
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
            {/* ⚠️ « TROIS FORFAITS » ÉTAIT DEVENU FAUX le 29/08 : l'offre
                établissement partie, il en reste deux. Un titre qui compte des
                offres se démentait tout seul dès la ligne suivante.
                ⛔ ET LE MOT « FORFAIT » EST TOMBÉ LE 01/09 : il n'y a plus rien
                de forfaitaire ici, les deux offres se comptent — l'une par
                foyer, l'autre par élève. `scripts/verifier-tarifs.ts` traque ce
                mot précisément parce qu'il a déjà survécu à un changement de
                grille. */}
            <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
              L&apos;enseignant ne paie rien
            </h2>
            {/* ⛔ LES DEUX MOITIÉS NE SE SÉPARENT PAS, ET C'EST TOUTE LA
                DIFFICULTÉ DE CETTE SECTION. « Gratuit pour les enseignants »
                seul se comprend « gratuit pour ma classe » : un professeur de
                bonne foi le répétera à ses familles, et ce sont elles qui
                découvriront le prix devant la caisse. La restriction se dit donc
                ici, dans le chapeau, pas plus bas et pas plus petit. */}
            <p className="mx-auto mt-2 max-w-2xl text-sm font-bold text-slate-600">
              Son compte est gratuit, à titre personnel, et s&apos;ouvre sur{" "}
              {ENSEIGNANT.verification}. Ce qu&apos;il n&apos;ouvre pas, c&apos;est
              l&apos;abonnement des parents de ses élèves : cette fenêtre-là reste
              au tarif normal. Les élèves, eux, n&apos;ont jamais eu à payer quoi
              que ce soit.
            </p>
          </div>

          {/* ⚠️ UNE COLONNE DEPUIS LE 29/08, ET NON `md:grid-cols-2` : il ne
              reste qu'une carte, et une grille à deux colonnes l'aurait laissée
              collée à gauche avec un trou à droite — la place de l'offre qu'on
              vient de retirer, dessinée en creux. */}
          <div className="mx-auto grid max-w-xl gap-6">
            <div
              id={pourLEnseignant.id}
              className={`flex scroll-mt-24 flex-col rounded-[2rem] border border-white bg-white/90 p-6 shadow-xl ring-4 backdrop-blur transition hover:-translate-y-1 ${pourLEnseignant.anneau}`}
            >
              <span className="self-start rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
                {pourLEnseignant.badge}
              </span>

              <h3 className="mt-4 text-xl font-black text-slate-950">
                {pourLEnseignant.nom}
              </h3>
              <p
                className={`mt-1 bg-gradient-to-r ${pourLEnseignant.gradient} bg-clip-text text-3xl font-black text-transparent`}
              >
                {pourLEnseignant.prix}
              </p>
              <p className="mt-1 text-sm font-black text-slate-500">
                {pourLEnseignant.exemple}
              </p>
              <p className="mt-3 text-sm font-bold leading-relaxed text-slate-600">
                {pourLEnseignant.description}
              </p>

              <ul className="mt-5 flex-1 space-y-2">
                {pourLEnseignant.inclus.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm font-bold text-slate-700"
                  >
                    <span className="mt-0.5 text-emerald-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* ⚠️ LE LIEN NE POINTE PLUS VERS /contact. La carte précédente
                  ouvrait un devis ; celle-ci n'ouvre rien à vendre, elle mène à
                  la page de l'outil. */}
              <Link
                href={pourLEnseignant.lien}
                className={`mt-6 block rounded-2xl bg-gradient-to-r ${pourLEnseignant.gradient} px-5 py-3 text-center text-sm font-black text-white shadow transition hover:-translate-y-0.5`}
              >
                {pourLEnseignant.cta}
              </Link>
            </div>
          </div>

          {/* ⛔⛔ LE TABLEAU DE L'ÉCHELLE EST SUPPRIMÉ LE 01/09/2026, ET IL FAUT
              SAVOIR CE QU'IL FAISAIT AVANT DE VOULOIR LE REMETTRE. Il posait
              « le même collège de 400 élèves, selon qui paie » et alignait deux
              ou trois totaux annuels décroissants ; c'était à la fois
              l'argument de la page et son test de non-régression — une
              inversion entre deux barreaux, et un payeur avait intérêt à en
              contourner un autre. Cinq grilles sont mortes de cette inversion.
              Avec un seul payeur, il n'y a plus d'échelle, donc plus rien à
              inverser : le test disparaît parce que le risque disparaît.
              ⚠️ Ce qui ne disparaît pas, c'est la phrase du dessous — l'enfant
              dont personne n'a payé travaille à l'identique. Elle ne dépendait
              d'aucune grille, elle est la règle qui gouverne toutes les
              grilles, et elle reste seule ici. */}
          <div className="mt-6 rounded-[2rem] border border-emerald-200 bg-emerald-50/80 p-6 shadow-lg backdrop-blur">
            <p className="text-center text-sm font-bold text-slate-600">
              Et quoi qu&apos;il arrive, l&apos;enfant dont personne n&apos;a payé
              travaille exactement à l&apos;identique — le coach, les exercices et
              les évaluations ne se ferment jamais.
            </p>
          </div>
        </section>

        {/* ── LE PILOTE, OFFERT ────────────────────────────────────────── */}
        <section className="flex flex-col items-center gap-6 rounded-[2rem] border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6 text-center shadow-lg backdrop-blur sm:flex-row sm:text-left">
          <div className="shrink-0 text-5xl">🎁</div>
          <div className="flex-1">
            {/* ⚠️ CE BLOC PARLAIT ENCORE D'UNE « CLASSE ENTIÈRE » ET D'UN
                « PILOTE » LE 01/09/2026 — deux mots de l'offre établissement,
                dont `/offre-pilote` a été supprimée le 31/08. Il a survécu à
                deux retraits parce qu'il ne contient AUCUN prix : le
                vérificateur ne le voyait pas, et une relecture le prenait pour
                une promotion inoffensive. C'est le rendu qui l'a montré.
                ⭐ CE QU'ON GARDE, ET C'EST UNE RÈGLE PERMANENTE : il y a
                toujours des testeurs gratuits. Seul le destinataire change —
                la famille, puisqu'il n'y a plus qu'elle qui paie. */}
            <h2 className="text-xl font-black text-slate-950">
              Quatre semaines offertes, pour essayer
            </h2>
            <p className="mt-1 text-sm font-bold text-slate-600">
              La vue du parent en entier, sans engagement et sans carte
              bancaire. Pour voir avant de décider quoi que ce soit.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 text-sm font-black text-white shadow transition hover:-translate-y-0.5"
          >
            Demander l&apos;essai
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
          {/* ⭐ LE RAPPORT S'ÉCRIT ENFIN, ET IL SE CALCULE (Frédéric, 22/08 :
              « on est 10 fois moins cher que les autres »). La phrase attendait
              depuis le 21/08, faute d'un rapport qui se lise : à 12 € par an il
              valait 20, et un écart de un à vingt ne se lit pas comme une bonne
              affaire mais comme une erreur de saisie.
              ⛔ ELLE NE VAUT QUE SUR LA LIGNE FAMILLE, et sur la formule
              ANNUELLE. IXL ne publie aucun tarif classe — c'est un devis
              école — donc rien ne se compare côté enseignant, et il ne faut pas
              l'y étendre. */}
          <p className="mx-auto mt-5 max-w-2xl rounded-2xl bg-amber-50 px-6 py-3 text-center text-sm font-black text-amber-900 ring-1 ring-amber-200">
            À l&apos;année, {RAPPORT_IXL} fois moins cher qu&apos;IXL pour une
            famille — et le deuxième enfant y coûte 4 € de plus par mois, quand
            ici la maison entière est comprise dans les {montant(PRIX_ANNUEL)}.
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
