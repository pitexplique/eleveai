// ─── Fiche de cours : les petits mots et leur nature (CM1) ────────────────────
// VINGTIÈME FICHE DU CHANTIER CM1, quatrième des six de grammaire.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année ».
//
// ⛔⛔ DEUX FICHES DU CM2 BORDENT CELLE-CI, ET IL FAUT S'EN ÉCARTER :
//
//   ⛔ « la nature est dans le dictionnaire, la fonction est dans la phrase »,
//      et le TEST DU DOIGT qui va avec → c'est tout
//      `francais-cm2-grammaire-nature-fonction`, présentée dans son en-tête
//      comme « la clé de voute » du site. Le CM1, lui, n'a qu'à
//      « SE FAMILIARISER AVEC » les deux notions — c'est le verbe de sa micro.
//      Une seule propriété ici, pas davantage.
//   ⛔ les VARIATIONS du pronom (personne, nombre, fonction) → découverte de
//      `francais-cm2-grammaire-pronoms`. L'ANTÉCÉDENT et la chaine anaphorique
//      appartiennent à la 6e.
//   ⛔ « le déterminant accompagne le nom et ne peut pas s'en passer, l'adverbe
//      modifie sans rien introduire » → `francais-5e-grammaire-groupe-nominal`
//      l. 396, presque mot pour mot. À ne pas reprendre.
//
//   | | CM1 (ici) | CM2 |
//   |---|---|---|
//   | le fil | ⭐ regarde CE QUI CHANGE et ce qui ne change jamais | nature dans le dictionnaire, fonction dans la phrase |
//   | nature / fonction | ⭐ « se familiariser » : une propriété | toute une fiche |
//   | le pronom | ⭐ il SAUTE devant le verbe | ses variations |
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE EST DANS LE POOL, RÉPÉTÉE DE TROIS FAÇONS :
// « les adverbes sont des mots INVARIABLES : ils ne changent jamais » · « ils
// courent vite : *vite* ne bouge pas » · et pour le déterminant, à l'inverse,
// « des letchis : c'est *des* qui prévient qu'il y en a plusieurs ». Voilà le
// fil du CM1 : CERTAINS PETITS MOTS CHANGENT, D'AUTRES NE CHANGENT JAMAIS, ET
// C'EST CE QUI LES TRAHIT. Le geste qui en découle est à la portée d'un enfant
// de neuf ans, et il prolonge les deux fiches précédentes — on prouve, on ne
// devine pas : METS LA PHRASE AU PLURIEL, ET REGARDE QUI A BOUGÉ.
//
// ⭐ Les sept conjonctions sont dans le pool telles quelles : mais, ou, et,
// donc, or, ni, car.
//
// ⚠️⚠️ ERREUR ÉVITÉE GRÂCE À LA BANQUE : j'allais écrire que le pronom sujet est
// devant le verbe et le pronom complément derrière. C'EST FAUX, et le pool le
// dit : « Léa mange une mangue » donne « Léa LA MANGE », et sa méthode précise
// « le pronom complément se place DEVANT le verbe ». Le leurre « Léa mange la »
// est justement la faute attendue. D'où la propriété retenue : LE PRONOM
// COMPLÉMENT SAUTE DEVANT LE VERBE.
//
// ⚠️ RÈGLE DE COULEUR : les natures (déterminant, adverbe, conjonction) se
// posent sur `mots[].nature`, qui se rend en gris au-dessus du mot ; seules les
// FONCTIONS passent par `groupes[].label` et prennent une couleur. Les deux
// dessins de pronoms portent donc « sujet » (bleu) et « objet » (vert), et les
// natures restent grises — c'est exactement la distinction que la fiche
// commence à faire entendre.
//
// Alignée sur les pools CLASSES_MOTS et PRONOMS_SUJET_OBJET de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION.
//
// Micro-compétences couvertes (les 4 de la notion `grammaire_classes_mots`) :
// - cm1_gram_classes_mots      → figure, propriétés 1, 2 et 3, méthodes 1 et 2, exemples 1, 2 et 3
// - cm1_gram_pronoms           → propriété 4, méthode 3, exemple 4
// - cm1_gram_nature_fonction   → propriété 5
// - cm1_gram_classes_mots_defi → propriété 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  groupes?: PhraseCanvasGroupe[];
  liens?: PhraseCanvasLien[];
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        groupes: opts.groupes,
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

const ceQuiBouge = phrase({
  mots: [
    { texte: "le", nature: "déterminant" },
    { texte: "letchi" },
    { texte: "vite", nature: "adverbe" },
  ],
  legende: "Au pluriel, « le » devient « les ». « vite » ne bouge pas.",
});

const grilleChangeOuPas = grille({
  headers: ["Le petit mot", "Au pluriel"],
  rows: [
    { values: ["le, un, ma", "il change"] },
    { values: ["vite, souvent", "il ne bouge pas"] },
    { values: ["mais, et, donc", "il ne bouge pas"] },
  ],
  caption: "Mets au pluriel, et regarde qui a bougé.",
});

const determinantAnnonce = phrase({
  mots: [
    { texte: "des", nature: "déterminant", focus: true },
    { texte: "letchis" },
  ],
  legende: "C'est « des » qui prévient qu'il y en a plusieurs.",
});

const adverbeInvariable = phrase({
  mots: [
    { texte: "ils courent" },
    { texte: "vite", nature: "adverbe", focus: true },
  ],
  legende: "Le sujet est au pluriel, et « vite » ne change pas.",
});

const grilleSeptConjonctions = grille({
  headers: ["Les sept", "Elles servent à"],
  rows: [
    { values: ["mais, ou, et", "relier"] },
    { values: ["donc, or", "relier"] },
    { values: ["ni, car", "relier"] },
  ],
  caption: "Sept mots, et la liste ne bouge jamais.",
});

const pronomSaute = phrase({
  mots: ["Léa", "la", "mange"],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [1, 1], label: "objet" },
  ],
  legende: "« Léa mange la » ne se dit pas : le pronom saute devant le verbe.",
});

const nomEtMetier = phrase({
  mots: [
    { texte: "son nom", focus: true },
    { texte: "son métier" },
  ],
  legende: "Le nom d'un mot ne change pas. Son métier change de phrase en phrase.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheGrammaireClassesMotsCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "grammaire-classes-mots",
  titre: `Les petits mots et leur nature en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Mets ta phrase au pluriel et regarde qui a bougé. « Le letchi » devient « les letchis », mais « vite » reste « vite ». Ce qui change et ce qui ne change pas, ça les trahit.",
  identite: [
    { label: "Mots clés", valeur: "Déterminant, adverbe, conjonction" },
    { label: "Le secret", valeur: "Regarde ce qui change" },
    { label: "Outil", valeur: "Mets la phrase au pluriel" },
  ],
  definition: {
    texte: [
      "Entre les grands mots — les noms, les verbes — vivent des petits mots. Chacun a un nom, et une façon d'être reconnu.",
      "Le déterminant est collé devant le nom et il l'annonce : dans « des letchis », c'est « des » qui prévient qu'il y en a plusieurs. Il change avec le nom.",
      "L'adverbe, lui, ne change jamais. « Il court vite », « ils courent vite » : « vite » ne bouge pas d'un poil.",
      "Les conjonctions de coordination ne bougent pas non plus, et il n'y en a que sept : mais, ou, et, donc, or, ni, car.",
      "D'où le geste : mets ta phrase au pluriel, et regarde qui a bougé. Ce qui suit le nom est un déterminant ; ce qui ne bronche pas est un adverbe ou une conjonction.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(ceQuiBouge, grilleChangeOuPas),
  },
  proprietes: [
    {
      titre: "Le déterminant annonce le nom",
      texte: "Il donne son genre et son nombre avant même qu'on l'ait lu.",
      schema: determinantAnnonce,
      micros: ["cm1_gram_classes_mots"],
    },
    {
      titre: "L'adverbe ne change jamais",
      texte: "« Il court vite », « ils courent vite ». Aucun s, aucun e.",
      schema: adverbeInvariable,
      micros: ["cm1_gram_classes_mots"],
    },
    {
      titre: "Les conjonctions sont sept",
      texte: "mais, ou, et, donc, or, ni, car. La liste ne s'allonge pas.",
      schema: grilleSeptConjonctions,
      micros: ["cm1_gram_classes_mots"],
    },
    {
      titre: "Le pronom complément saute devant le verbe",
      texte: "« Léa mange une mangue » donne « Léa la mange », jamais « Léa mange la ».",
      schema: pronomSaute,
      micros: ["cm1_gram_pronoms"],
    },
    {
      titre: "Un mot a un nom, et un métier",
      texte: "Son nom ne change pas. Son métier, lui, change à chaque phrase.",
      schema: nomEtMetier,
      micros: ["cm1_gram_nature_fonction"],
    },
    {
      titre: "Le défi : mets au pluriel",
      texte: "Un seul geste, et les petits mots se rangent tout seuls.",
      schema: grilleChangeOuPas,
      micros: ["cm1_gram_classes_mots_defi"],
    },
  ],
  reel: {
    texte:
      "Tu reconnais un joueur à son maillot avant de savoir ce qu'il fait sur le terrain. Les petits mots, c'est pareil : « des » porte le pluriel sur lui, et tu le vois avant d'avoir lu le nom qui suit.",
  },
  historique: {
    texte:
      "Le mot adverbe vient du latin ad verbum : à côté du verbe. Son nom dit sa place. Et comme il n'appartient à personne, il n'a jamais eu à s'accorder avec quoi que ce soit — il est resté invariable depuis toujours.",
  },
  methode: [
    {
      titre: "Mets la phrase au pluriel",
      texte: "Ce qui change devant le nom est un déterminant. Ce qui reste figé, non.",
      schema: grilleChangeOuPas,
      micros: ["cm1_gram_classes_mots"],
    },
    {
      titre: "Compte les mots qui n'ont pas bougé",
      texte: "Adverbes et conjonctions sont les seuls à ne jamais changer.",
      schema: adverbeInvariable,
      micros: ["cm1_gram_classes_mots"],
    },
    {
      titre: "Pour un pronom, remplace le groupe entier",
      texte: "« une mangue » devient « la », et « la » vient se coller devant le verbe.",
      schema: pronomSaute,
      micros: ["cm1_gram_pronoms"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Le margouillat",
      donnees: "« le margouillat »",
      schema: determinantAnnonce,
      question: "Quelle est la nature de « le » ?",
      solution:
        "Un déterminant. Il est collé devant le nom et l'annonce. Au pluriel il devient « les » : il a bougé, donc c'est bien lui.",
      micros: ["cm1_gram_classes_mots"],
    },
    {
      titre: "Souvent dehors",
      donnees: "« Les enfants jouent souvent dehors. »",
      schema: adverbeInvariable,
      question: "Combien d'adverbes ?",
      solution:
        "Deux : « souvent » et « dehors ». Aucun des deux ne change, même avec « les enfants » au pluriel.",
      micros: ["cm1_gram_classes_mots"],
    },
    {
      titre: "Quatre listes",
      donnees: "mais, ou, et, donc · le, la, les · je, tu, il · à, dans, sur",
      schema: grilleSeptConjonctions,
      question: "Laquelle ne contient que des conjonctions ?",
      solution:
        "La première. Les autres sont des déterminants, des pronoms et des petits mots qui introduisent un groupe.",
      micros: ["cm1_gram_classes_mots"],
    },
    {
      titre: "Léa mange une mangue",
      donnees: "« Léa mange une mangue. » Remplace le complément par un pronom.",
      schema: pronomSaute,
      question: "Où se place-t-il ?",
      solution:
        "« Léa la mange. » Le pronom complément saute devant le verbe : « Léa mange la » ne se dit pas.",
      micros: ["cm1_gram_pronoms"],
    },
  ],
  pieges: [
    "Croire qu'un adverbe prend un s au pluriel.",
    "Confondre le déterminant « le » et le pronom « le ».",
    "Ajouter « à, dans, sur » à la liste des conjonctions.",
    "Écrire « Léa mange la » au lieu de « Léa la mange ».",
    "Chercher la nature d'un mot sans faire l'essai du pluriel.",
  ],
  aRetenir: [
    "Le déterminant annonce le nom et change avec lui.",
    "L'adverbe ne change jamais.",
    "Sept conjonctions : mais, ou, et, donc, or, ni, car.",
    "Le pronom complément saute devant le verbe.",
    "Mets au pluriel : ce qui bouge se trahit.",
  ],
  entrainement: [
    {
      question: "Dans « le margouillat », quelle est la nature de « le » ?",
      correction: "Un déterminant.",
      micros: ["cm1_gram_classes_mots"],
    },
    {
      question: "Les adverbes sont des mots…",
      correction: "Invariables : ils ne changent jamais.",
      micros: ["cm1_gram_classes_mots"],
    },
    {
      question: "Quelle liste ne contient que des conjonctions de coordination ?",
      correction: "mais, ou, et, donc.",
      micros: ["cm1_gram_classes_mots"],
    },
    {
      question: "« Léa mange une mangue. » Remplace le complément par un pronom.",
      correction: "« Léa la mange. »",
      micros: ["cm1_gram_pronoms"],
    },
    {
      question: "Tu ne sais pas si un mot est un déterminant. Que fais-tu ?",
      correction: "Tu mets la phrase au pluriel et tu regardes s'il a bougé.",
      micros: ["cm1_gram_classes_mots_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesGrammaireClassesMotsCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les petits mots - CM1",
    section: {
      type: "objectif",
      phrase: "Regarde ce qui change",
      sousPhrase: "« Le letchi » devient « les letchis ». Mais « vite » reste « vite ».",
      encadre: { titre: "L'idée", texte: "Mets au pluriel, et regarde qui a bougé." },
    },
  },
  {
    titre: "Trois petits mots",
    badge: "Les petits mots - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le déterminant", texte: "Il annonce le nom, et il change." },
        { titre: "L'adverbe", texte: "Il ne change jamais." },
        { titre: "La conjonction", texte: "mais, ou, et, donc, or, ni, car." },
      ],
    },
    schema: grilleChangeOuPas,
  },
  {
    titre: "Comme un maillot",
    badge: "Les petits mots - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Tu reconnais un joueur à son maillot.",
        "Avant de savoir ce qu'il fait sur le terrain.",
        "« des » porte le pluriel sur lui.",
      ],
    },
    schema: determinantAnnonce,
  },
  {
    titre: "À vous",
    badge: "Les petits mots - CM1",
    section: {
      type: "exercice",
      enonce: "« Léa mange une mangue. »",
      question: "Remplace le complément par un pronom.",
      indice: "Attention à l'endroit où il se place.",
      correction: "« Léa la mange. » — jamais « Léa mange la ».",
    },
    schema: pronomSaute,
  },
];
