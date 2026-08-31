// ─── Fiche de cours : comprendre un mot inconnu (CM1) ─────────────────────────
// QUATORZIÈME FICHE DU CHANTIER CM1, écrite le 31/08/2026 au gabarit de
// l'étalon. Elle OUVRE LE DOMAINE DE LA LANGUE.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année » : « Identifier les
// mots inconnus, lors de ses différentes lectures, et rechercher leur
// signification EN S'APPUYANT SUR LA MORPHOLOGIE ET SUR LE CONTEXTE ».
//
// ⛔⛔ DEUX ANGLES ÉCARTÉS, VÉRIFIÉS DANS LES FICHIERS :
//
//   ⛔ « un mot n'a pas son sens tout seul, c'est la phrase qui le lui donne »
//      → c'est LE FIL de `francais-cm2-vocabulaire-sens`, et il couvre à lui
//      seul contexte, polysémie, figuré et nuance.
//   ⛔ « le contexte regarde AUTOUR du mot, la morphologie regarde DEDANS »
//      → `francais-cm2-vocabulaire-formation` l. 237, mot pour mot.
//   ⛔ « fais le dessin de ce que disent les mots ; s'il est faux, c'est du
//      figuré » → la mesure du CM2.
//
//   | | CM1 (ici) | CM2 |
//   |---|---|---|
//   | le fil | ⭐ l'indice est DÉJÀ ÉCRIT dans la phrase | c'est la phrase qui donne le sens |
//   | l'erreur visée | ⭐ sauter le mot, ou l'inventer | croire qu'un mot a un sens fixe |
//   | le geste | ⭐ lire la suite avant de renoncer | faire le dessin |
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE SE VÉRIFIE EN COMPTANT LES ÉNONCÉS DU COACH :
// DANS LES QUINZE PHRASES DU POOL VOC_CONTEXTE, L'EXPLICATION DU MOT INCONNU EST
// DANS LA MÊME PHRASE — et six fois sur quinze, juste après une virgule.
// « Le désert est aride, SANS UNE GOUTTE D'EAU. » « Il resta immobile, SANS
// BOUGER. » « Le sentier était escarpé, DIFFICILE À GRIMPER. »
// ⭐ Il n'y a donc rien à deviner : c'est écrit deux mots plus loin. Et c'est
// exactement ce que l'enfant de CM1 ne fait pas — il bute sur le mot, il saute,
// et il perd la phrase entière alors que la réponse arrivait.
//
// ⭐ LE SECOND OUTIL, DANS LE LIBELLÉ DE LA MICRO : « deviner un mot inconnu EN
// REGARDANT COMMENT IL EST FABRIQUÉ ». Formulation CM1 retenue pour ne pas
// reprendre celle du CM2 : UN MOT QUE TU CONNAIS SE CACHE DANS CELUI QUE TU NE
// CONNAIS PAS. « Inatteignable » contient « atteindre ».
//
// ⭐ ET LA POLYSÉMIE ARRIVE PAR LA MÊME PORTE : un mot que tu connais peut avoir
// un autre sens ici, et c'est encore ce qu'il y a à côté qui le dit — « une glace
// À LA VANILLE » contre « la glace DU LAC ».
//
// ⚠️ NOTER POUR LE CM1 : `cm1_voc_morphologie` appartient ici, à
// `vocabulaire_sens`, alors que `cm1_voc_famille` appartient à
// `vocabulaire_relations`. Le découpage du CM1 n'est pas celui du CM2 — ne pas
// traiter les familles de mots dans cette fiche.
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur les pools VOC_CONTEXTE, VOC_FAMILLE et VOC_POLYSEMIE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les items `cm1_fr_fixed_voc_1` et `_4` de
// lib/tutor-v4/questionBank/cm1/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `vocabulaire_sens`) :
// - cm1_voc_contexte    → figure, propriétés 1 et 2, méthode 1, exemples 1 et 2
// - cm1_voc_morphologie → propriété 3, méthode 2, exemple 3
// - cm1_voc_polysemie   → propriétés 4 et 5, méthode 3, exemple 4
// - cm1_voc_sens_defi   → propriété 6

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

const indiceJusteACote = phrase({
  mots: [{ texte: "aride" }, { texte: "sans eau", focus: true }],
  liens: [{ de: 1, vers: 0, label: "explique", type: "question" }],
  legende: "L'explication est souvent collée au mot inconnu.",
});

const grilleTroisIndices = grille({
  headers: ["Le mot", "Ce qui est à côté"],
  rows: [
    { values: ["escarpé", "difficile à grimper"] },
    { values: ["épuisé", "après la course"] },
    { values: ["limpide", "on voyait loin"] },
  ],
  caption: "Rien à deviner : la phrase l'a déjà dit.",
});

const neSautePas = phrase({
  mots: [
    { texte: "sauter le mot", barre: true },
    { texte: "lire la suite", focus: true },
  ],
  legende: "Ne renonce pas avant la fin de la phrase.",
});

const motDansLeMot = phrase({
  mots: [{ texte: "inatteignable" }, { texte: "atteindre", focus: true }],
  legende: "Un mot que tu connais se cache dans celui-ci.",
});

const glaceDeuxSens = phrase({
  mots: [{ texte: "une glace" }, { texte: "à la vanille", focus: true }],
  legende: "Le même mot a deux sens. Ce qui suit dit lequel.",
});

const deuxIndicesAvant = phrase({
  mots: [
    { texte: "demander tout de suite", barre: true },
    { texte: "deux indices", focus: true },
  ],
  legende: "Le défi : cherche deux indices avant de demander.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheVocabulaireSensCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "vocabulaire-sens",
  titre: `Comprendre un mot inconnu en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Tu tombes sur un mot que tu ne connais pas, alors tu le sautes. Mais regarde la suite : « Le désert est aride, sans une goutte d'eau. » L'explication était deux mots plus loin.",
  identite: [
    { label: "Mots clés", valeur: "Inconnu, indice, plusieurs sens" },
    { label: "Le secret", valeur: "L'indice est déjà écrit" },
    { label: "Outil", valeur: "Lis la suite avant de renoncer" },
  ],
  definition: {
    texte: [
      "Devant un mot inconnu, on croit qu'il faut deviner. Presque jamais.",
      "La phrase donne l'explication elle-même, souvent juste après une virgule : « immobile, sans bouger », « escarpé, difficile à grimper ».",
      "Alors ne saute pas le mot : lis la suite. C'est là que la réponse t'attend.",
      "Et si la phrase ne dit rien, regarde le mot lui-même. Un mot que tu connais se cache souvent dedans : « inatteignable » contient « atteindre ».",
      "Enfin, certains mots que tu connais ont plusieurs sens. Là encore, c'est ce qu'il y a à côté qui choisit : une glace à la vanille, ou la glace du lac.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(indiceJusteACote, grilleTroisIndices),
  },
  proprietes: [
    {
      titre: "L'explication est souvent juste à côté",
      texte: "« Le désert est aride, sans une goutte d'eau. » Le sens est donné dans la phrase.",
      schema: indiceJusteACote,
      micros: ["cm1_voc_contexte"],
    },
    {
      titre: "Ne saute pas le mot",
      texte: "Un mot sauté, et c'est toute la phrase que tu perds. Lis jusqu'au point.",
      schema: neSautePas,
      micros: ["cm1_voc_contexte"],
    },
    {
      titre: "Un mot connu se cache dans le mot",
      texte: "« Inatteignable » : tu ne le connais pas, mais tu connais « atteindre ».",
      schema: motDansLeMot,
      micros: ["cm1_voc_morphologie"],
    },
    {
      titre: "Un mot peut avoir plusieurs sens",
      texte: "La glace du lac et la glace à la vanille ne sont pas la même chose.",
      schema: glaceDeuxSens,
      micros: ["cm1_voc_polysemie"],
    },
    {
      titre: "C'est la phrase qui choisit le sens",
      texte: "« À la vanille » ou « du lac » : ces deux mots-là décident tout.",
      schema: glaceDeuxSens,
      micros: ["cm1_voc_polysemie"],
    },
    {
      titre: "Le défi : deux indices avant de demander",
      texte: "Un dans la phrase, un dans le mot. Ensuite seulement, tu demandes.",
      schema: deuxIndicesAvant,
      micros: ["cm1_voc_sens_defi"],
    },
  ],
  reel: {
    texte:
      "Dans un film en version originale, tu ne connais pas tous les mots et pourtant tu suis l'histoire. Tu t'appuies sur ce qui se passe autour. Lire, c'est le même geste : on comprend beaucoup de mots sans les avoir jamais appris.",
  },
  historique: {
    texte:
      "Champollion a percé les hiéroglyphes grâce à une pierre où le même texte était écrit trois fois, dont une en grec. Il n'a rien deviné : il a lu ce qu'il y avait à côté. C'est exactement ce qu'on te demande devant un mot inconnu.",
  },
  methode: [
    {
      titre: "Finis la phrase avant de t'arrêter",
      texte: "Va jusqu'au point. Souvent l'explication arrive après une virgule.",
      schema: neSautePas,
      micros: ["cm1_voc_contexte"],
    },
    {
      titre: "Cherche un mot connu à l'intérieur",
      texte: "Cache le début, cache la fin. Ce qui reste, tu le connais peut-être.",
      schema: motDansLeMot,
      micros: ["cm1_voc_morphologie"],
    },
    {
      titre: "Demande-toi de quoi on parle",
      texte: "Pour un mot à plusieurs sens, regarde ce qui l'accompagne.",
      schema: glaceDeuxSens,
      micros: ["cm1_voc_polysemie"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Un chemin boueux",
      donnees: "« Le chemin était boueux après la pluie. »",
      schema: indiceJusteACote,
      question: "Que veut dire boueux ?",
      solution:
        "Plein de boue. « Après la pluie » te le dit : c'est la pluie qui fait la boue.",
      micros: ["cm1_voc_contexte"],
    },
    {
      titre: "Il dévora son repas",
      donnees: "« Il dévora son repas en deux minutes. »",
      schema: neSautePas,
      question: "Que veut dire dévorer ?",
      solution:
        "Manger très vite. « En deux minutes » donne la vitesse : ce sont ces trois mots qui expliquent le premier.",
      micros: ["cm1_voc_contexte"],
    },
    {
      titre: "Un mot qu'on n'a jamais vu",
      donnees: "Tu lis « infaisable » pour la première fois.",
      schema: motDansLeMot,
      question: "Peux-tu le comprendre ?",
      solution:
        "Oui. Tu connais « faisable », et « in- » veut dire pas. Donc : qu'on ne peut pas faire.",
      micros: ["cm1_voc_morphologie"],
    },
    {
      titre: "Quelle glace ?",
      donnees: "« Elle mange une glace à la vanille. »",
      schema: glaceDeuxSens,
      question: "De quelle glace parle-t-on ?",
      solution:
        "Du dessert. « À la vanille » l'indique. Dans « la glace du lac est solide », le même mot désigne l'eau gelée.",
      micros: ["cm1_voc_polysemie"],
    },
  ],
  pieges: [
    "Sauter le mot inconnu et continuer à lire.",
    "Inventer un sens au lieu de chercher l'indice.",
    "S'arrêter avant la virgule, là où l'explication commence.",
    "Croire qu'un mot n'a qu'un seul sens.",
    "Demander avant d'avoir cherché.",
  ],
  aRetenir: [
    "L'explication est souvent déjà dans la phrase.",
    "Ne saute pas le mot : lis jusqu'au point.",
    "Un mot connu se cache souvent dans le mot inconnu.",
    "Un même mot peut avoir plusieurs sens.",
    "Deux indices avant de demander.",
  ],
  entrainement: [
    {
      question: "« Le chemin était boueux après la pluie. » Que veut dire boueux ?",
      correction: "Plein de boue.",
      micros: ["cm1_voc_contexte"],
    },
    {
      question: "« Le sentier était escarpé, difficile à grimper. » Que veut dire escarpé ?",
      correction: "Très pentu.",
      micros: ["cm1_voc_contexte"],
    },
    {
      question: "Tu lis « infaisable ». Comment le comprends-tu ?",
      correction: "Tu reconnais « faisable » et « in- » qui veut dire pas.",
      micros: ["cm1_voc_morphologie"],
    },
    {
      question: "Quelle phrase emploie glace au sens du dessert ?",
      correction: "« Elle mange une glace à la vanille. »",
      micros: ["cm1_voc_polysemie"],
    },
    {
      question: "Un mot t'arrête. Que fais-tu avant de demander ?",
      correction: "Tu cherches un indice dans la phrase, puis dans le mot.",
      micros: ["cm1_voc_sens_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesVocabulaireSensCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Comprendre un mot inconnu - CM1",
    section: {
      type: "objectif",
      phrase: "L'indice est déjà écrit",
      sousPhrase: "« Le désert est aride, sans une goutte d'eau. »",
      encadre: { titre: "L'idée", texte: "Il n'y a presque rien à deviner." },
    },
  },
  {
    titre: "Où chercher",
    badge: "Comprendre un mot inconnu - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Dans la phrase", texte: "« escarpé, difficile à grimper »" },
        { titre: "Dans le mot", texte: "« inatteignable » : atteindre." },
        { titre: "À côté", texte: "Une glace à la vanille." },
      ],
    },
    schema: grilleTroisIndices,
  },
  {
    titre: "Comme un film",
    badge: "Comprendre un mot inconnu - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Tu ne connais pas tous les mots.",
        "Tu regardes ce qui se passe autour.",
        "Et tu suis quand même l'histoire.",
      ],
    },
    schema: neSautePas,
  },
  {
    titre: "À vous",
    badge: "Comprendre un mot inconnu - CM1",
    section: {
      type: "exercice",
      enonce: "« Il dévora son repas en deux minutes. »",
      question: "Que veut dire dévorer ?",
      indice: "Regarde les trois mots qui suivent.",
      correction: "Manger très vite. « En deux minutes » donne la vitesse.",
    },
    schema: indiceJusteACote,
  },
];
