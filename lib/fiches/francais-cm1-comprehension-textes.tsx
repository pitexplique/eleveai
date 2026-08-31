// ─── Fiche de cours : comprendre un texte (CM1) ───────────────────────────────
// TROISIÈME FICHE DU CHANTIER CM1, écrite le 31/08/2026 au gabarit de l'étalon.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année ».
//
// ⛔⛔ SÉPARATION À TROIS COLONNES — obligatoire au CM1, et ici les deux voisines
// ont DÉJÀ pris les fils évidents :
//
//   | | CM1 (ici) | CM2 | 6e |
//   |---|---|---|---|
//   | le fil | ⭐ comprendre est une SUITE DE GESTES | que fais-tu quand tu n'as PAS compris ? tu relis lentement | deux sortes de réponses : ÉCRITES ou DÉDUITES |
//   | les micros | STRATÉGIES · explicite · implicite simple · genres à la MISE EN PAGE | comprendre SEUL un texte long · restituer l'essentiel | sens global · inférence · JUSTIFIER en citant |
//
// ⛔ NE PAS REDIRE : « les indices sont toujours écrits » est le cœur de la 6e,
// « on relit lentement au lieu d'abandonner » celui du CM2. Ils sont cités ici en
// une ligne, jamais développés.
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE VIENT DU MICRO QUE PERSONNE D'AUTRE N'A —
// `cm1_comp_strategies`, « utiliser des STRATÉGIES de compréhension » :
// COMPRENDRE N'EST PAS UN DON, C'EST UNE SUITE DE GESTES. C'est la chose la plus
// importante à dire à un enfant de neuf ans qui pense « je ne comprends pas les
// textes » et l'entend comme « je suis nul ». Une stratégie s'apprend ; un don,
// non. Tout le reste de la fiche découle de là.
//
// ⭐ ET LE PREMIER GESTE SURPREND : ON RELIT LA QUESTION, PAS LE TEXTE. L'enfant
// qui bloque relit le texte en boucle alors que ce qu'il a mal lu, c'est ce qu'on
// lui demandait.
//
// ⭐ LE SECOND MICRO PROPRE AU CM1 : `cm1_comp_genres`, « distinguer théâtre,
// poème et texte narratif À LEUR MISE EN PAGE ». On reconnait le genre AVANT
// d'avoir lu un mot — et savoir ce qu'on lit change la façon de le lire.
// ⚠️ Ce micro tombait sur des questions de compréhension jusqu'au 30/08 : il a
// désormais son générateur (`genreMiseEnPage`, buildCycle3FrancaisBank).
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · tout texte projeté sous 250 signes.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur les pools LECTURE et le générateur GENRE_MISE_EN_PAGE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `comprehension_textes`) :
// - cm1_comp_strategies   → figure, propriétés 1 et 2, méthode 1, exemple 1
// - cm1_comp_explicite    → propriété 3, méthode 2, exemple 2
// - cm1_comp_implicite    → propriété 4, exemple 3
// - cm1_comp_genres       → propriétés 5, méthode 3, exemple 4
// - cm1_comp_textes_defi  → propriété 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { PhraseCanvasLien, PhraseCanvasMot } from "@/lib/tutor-v4/types";

function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  liens?: PhraseCanvasLien[];
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        liens: opts.liens,
        legende: opts.legende,
        largeurMax: 190,
      }}
    />
  );
}

/** ⚠️ Cellules courtes : à la largeur d'un bloc, vingt signes tombent sous le
 *  plancher de 11 px. */
function grille(opts: {
  headers: string[];
  rows: { values: string[] }[];
  highlight?: { row?: number };
  caption?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "tableau_donnees",
        headers: opts.headers,
        rows: opts.rows,
        highlight: opts.highlight,
        caption: opts.caption,
        display: { compact: true, striped: true },
      }}
    />
  );
}

function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Les dessins ──────────────────────────────────────────────────────────────

const pasUnDon = phrase({
  mots: [
    { texte: "un don", barre: true },
    { texte: "des gestes", focus: true },
  ],
  legende: "Comprendre, ça s'apprend. Un don, non.",
});

const relireLaQuestion = phrase({
  mots: [
    { texte: "relire le texte", barre: true },
    { texte: "relire la question", focus: true },
  ],
  legende: "Souvent, ce qu'on a mal lu, c'est la question.",
});

const reponseEcrite = phrase({
  mots: [
    { texte: "la question" },
    { texte: "le texte", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "ses mots sont dans", type: "question" }],
  legende: "Retrouve les mots de la question dans le texte. La réponse est à côté.",
});

const indiceEcrit = phrase({
  mots: [
    { texte: "les joues rouges" },
    { texte: "il a honte", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "donc", type: "question" }],
  legende: "Ce n'est pas écrit. Mais l'indice, lui, est écrit.",
});

const grilleGenres = grille({
  headers: ["Sur la page", "C'est"],
  rows: [
    { values: ["lignes courtes", "un poème"] },
    { values: ["noms en colonne", "du théâtre"] },
    { values: ["paragraphes", "un récit"] },
  ],
  caption: "Tu sais ce que tu lis avant d'avoir lu un mot.",
});

const doigtSurLeTexte = phrase({
  mots: [
    { texte: "de tête", barre: true },
    { texte: "le doigt dessus", focus: true },
  ],
  legende: "On garde le doigt à l'endroit où l'on cherche.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheComprehensionTextesCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "comprehension-textes",
  titre: `Comprendre un texte en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Si tu penses « je ne comprends pas les textes », voici la bonne nouvelle : comprendre n'est pas un don qu'on a ou qu'on n'a pas. C'est une suite de gestes, et les gestes, ça s'apprend.",
  identite: [
    { label: "Mots clés", valeur: "Chercher, relire, indices" },
    { label: "Le secret", valeur: "Ce sont des gestes, pas un don" },
    { label: "Outil", valeur: "Relis la question d'abord" },
  ],
  definition: {
    texte: [
      "Comprendre un texte, ça se fait avec des gestes.",
      "Premier geste : relire la question. Pas le texte — la question.",
      "Deuxième geste : chercher les mots de la question dans le texte. La réponse est souvent juste à côté.",
      "Parfois la réponse n'est pas écrite. Mais un indice, lui, l'est toujours.",
      "Et avant même de lire, la forme de la page te dit ce que tu as sous les yeux.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(pasUnDon, relireLaQuestion),
  },
  proprietes: [
    {
      titre: "Comprendre, ce sont des gestes",
      texte: "Pas un talent. Chaque geste s'apprend, et se refait à chaque texte.",
      schema: pasUnDon,
      micros: ["cm1_comp_strategies"],
    },
    {
      titre: "On garde le doigt sur le texte",
      texte: "Chercher de tête fait perdre l'endroit. Le doigt garde la place.",
      schema: doigtSurLeTexte,
      micros: ["cm1_comp_strategies"],
    },
    {
      titre: "La réponse est souvent écrite",
      texte: "Cherche les mots de la question dans le texte : la réponse est tout près.",
      schema: reponseEcrite,
      micros: ["cm1_comp_explicite"],
    },
    {
      titre: "Parfois elle n'est pas écrite",
      texte: "« Il cacha sa copie, les joues rouges. » On ne dit pas qu'il a honte. Tu le sais quand même.",
      schema: indiceEcrit,
      micros: ["cm1_comp_implicite"],
    },
    {
      titre: "La page te dit ce que tu lis",
      texte: "Des lignes courtes : un poème. Des noms en colonne : du théâtre.",
      schema: grilleGenres,
      micros: ["cm1_comp_genres"],
    },
    {
      titre: "Le défi : relire la question",
      texte: "Quand rien ne vient, ce n'est pas le texte qu'il faut relire en premier.",
      schema: relireLaQuestion,
      micros: ["cm1_comp_textes_defi"],
    },
  ],
  reel: {
    texte:
      "Quand tu cherches tes chaussures, tu ne fixes pas la pièce en espérant les voir. Tu regardes sous le lit, puis derrière la porte : tu as une méthode. Lire un texte pour répondre, c'est pareil — on cherche à des endroits, dans un ordre.",
  },
  historique: {
    texte:
      "Le mot « lire » vient du latin legere, qui voulait dire cueillir, ramasser. Lire, c'est aller prendre les choses une à une, comme on ramasse des fruits. Ce n'est pas recevoir le texte assis : c'est aller y chercher.",
  },
  methode: [
    {
      titre: "Relis la question, à voix basse",
      texte: "Deux fois s'il le faut. C'est souvent là qu'était l'erreur.",
      schema: relireLaQuestion,
      micros: ["cm1_comp_strategies"],
    },
    {
      titre: "Cherche les mots de la question",
      texte: "Si elle parle du chien, cherche « chien » dans le texte. Puis lis autour.",
      schema: reponseEcrite,
      micros: ["cm1_comp_explicite"],
    },
    {
      titre: "Regarde la page avant de lire",
      texte: "Un coup d'œil suffit : tu sais si c'est un poème, du théâtre ou une histoire.",
      schema: grilleGenres,
      micros: ["cm1_comp_genres"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Tu bloques",
      donnees: "Tu as relu le texte trois fois et tu ne trouves toujours pas.",
      schema: relireLaQuestion,
      question: "Que fais-tu ?",
      solution:
        "Tu relis la question. Très souvent, ce n'est pas le texte qu'on a mal lu — c'est ce qu'on nous demandait.",
      micros: ["cm1_comp_strategies"],
    },
    {
      titre: "La réponse est écrite",
      donnees: "« Paul courait, essoufflé. Il ne voulait pas rater le bus. »",
      schema: reponseEcrite,
      question: "Pourquoi Paul court-il ?",
      solution:
        "Pour ne pas rater le bus. C'est écrit, mot pour mot. Cherche les mots de la question dans le texte, et lis juste à côté.",
      micros: ["cm1_comp_explicite"],
    },
    {
      titre: "La réponse n'est pas écrite",
      donnees: "« La petite fille sourit en découvrant le cadeau. »",
      schema: indiceEcrit,
      question: "Que ressent-elle ?",
      solution:
        "De la joie. Le mot « joie » n'est nulle part — mais « sourit » y est. L'indice est toujours écrit, même quand la réponse ne l'est pas.",
      micros: ["cm1_comp_implicite"],
    },
    {
      titre: "Reconnaitre sans lire",
      donnees: "Une page où chaque ligne s'arrête bien avant le bord.",
      schema: grilleGenres,
      question: "Qu'est-ce que c'est ?",
      solution:
        "Un poème. Tu le sais sans avoir lu un mot : les lignes courtes et les blancs à droite, c'est sa forme.",
      micros: ["cm1_comp_genres"],
    },
  ],
  pieges: [
    "Croire qu'on comprend ou qu'on ne comprend pas : ce sont des gestes.",
    "Relire le texte sans relire la question.",
    "Chercher de tête, sans garder le doigt sur le texte.",
    "Répondre avec ce qu'on sait du monde au lieu de ce que dit le texte.",
    "Commencer à lire sans regarder la forme de la page.",
  ],
  aRetenir: [
    "Comprendre, ce sont des gestes. Ça s'apprend.",
    "Premier geste : relire la question.",
    "La réponse est souvent écrite : cherche les mots de la question.",
    "Quand elle ne l'est pas, l'indice, lui, est écrit.",
    "La forme de la page dit ce que tu lis avant que tu l'aies lu.",
  ],
  entrainement: [
    {
      question: "Tu ne trouves pas la réponse. Que relis-tu en premier ?",
      correction: "La question.",
      micros: ["cm1_comp_strategies"],
    },
    {
      question: "« Paul courait. Il ne voulait pas rater le bus. » Pourquoi court-il ?",
      correction: "Pour ne pas rater le bus.",
      micros: ["cm1_comp_explicite"],
    },
    {
      question: "« La petite fille sourit en découvrant le cadeau. » Que ressent-elle ?",
      correction: "De la joie.",
      micros: ["cm1_comp_implicite"],
    },
    {
      question: "Une page avec des noms écrits en colonne à gauche, c'est…",
      correction: "Du théâtre.",
      micros: ["cm1_comp_genres"],
    },
    {
      question: "Pourquoi garder le doigt sur le texte quand on cherche ?",
      correction: "Pour ne pas perdre l'endroit où l'on en était.",
      micros: ["cm1_comp_textes_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesComprehensionTextesCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Comprendre un texte - CM1",
    section: {
      type: "objectif",
      phrase: "Ce sont des gestes, pas un don",
      sousPhrase: "Comprendre, ça ne se possède pas : ça se fait.",
      encadre: { titre: "L'idée", texte: "Un geste, ça s'apprend. Un don, non." },
    },
  },
  {
    titre: "Le premier geste surprend",
    badge: "Comprendre un texte - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Quand tu bloques, tu relis le texte.",
        "Relis plutôt la question.",
        "C'est souvent elle qu'on a mal lue.",
      ],
    },
    schema: relireLaQuestion,
  },
  {
    titre: "La page parle avant les mots",
    badge: "Comprendre un texte - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Lignes courtes", texte: "Un poème." },
        { titre: "Noms en colonne", texte: "Du théâtre." },
        { titre: "Paragraphes pleins", texte: "Une histoire." },
      ],
    },
    schema: grilleGenres,
  },
  {
    titre: "À vous",
    badge: "Comprendre un texte - CM1",
    section: {
      type: "exercice",
      enonce: "« La petite fille sourit en découvrant le cadeau. »",
      question: "Que ressent-elle ?",
      indice: "Le mot n'y est pas. L'indice, si.",
      correction: "De la joie. « Joie » n'est écrit nulle part, mais « sourit » y est.",
    },
    schema: indiceEcrit,
  },
];
