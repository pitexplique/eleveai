// ─── Fiche de cours : les accords (CM2) ───────────────────────────────────────
// QUATRIÈME ET DERNIÈRE FICHE DE GRAMMAIRE DU CM2. Avec elle, les deux alias
// provisoires de `registre.ts` n'ont plus de raison d'être.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen deuxième année ».
//
// ⭐ SUITE DE LA DÉCISION DU 01/09/2026 : les deux fiches manquantes écrites,
// `francais/cm2/grammaire-orthographe` sort du registre et une 301 la renvoie
// vers `grammaire-nature-fonction`. Voir l'en-tête de
// `francais-cm2-grammaire-groupe-nominal`.
//
// ⛔⛔ DEUX CLASSES TRAITENT DÉJÀ LES ACCORDS, ET LEURS ANGLES SONT PRIS :
//   ⛔ « deux chaines, deux chefs » et « mets la phrase à l'imparfait » pour
//      les homophones → `francais-cm1-grammaire-accords`, écrit le 01/09.
//   ⛔ « l'accord n'est pas une règle à réciter, c'est une conclusion qu'on
//      tire d'une analyse » → `francais-6e-grammaire-accords`, tiré des verbes
//      de son BO (RAISONNER, MAÎTRISER).
//
// ⭐⭐ CE QUE LE CM2 AJOUTE SE LIT DANS TROIS DE SES CINQ LIBELLÉS, ET C'EST LA
// MÊME CHOSE À CHAQUE FOIS — LE DONNEUR N'EST PLUS À CÔTÉ DU RECEVEUR :
//     `accord_gn`      → le groupe nominal AVEC EXPANSIONS ;
//     `sujet_verbe`    → un sujet ÉLOIGNÉ OU INVERSÉ ;
//     `attribut`       → l'attribut, qui est de l'autre côté du verbe.
// Au CM1, le donneur touchait presque toujours le receveur. Au CM2, il y a de
// la distance entre les deux, et c'est TOUTE la difficulté de l'année.
//
// ⭐⭐ D'OÙ LE TEST, DANS LA SIGNATURE DU CM2 — une vérification et non un avis :
// TRACE LA FLÈCHE. Trouve le donneur, puis suis-le jusqu'au receveur. Une
// flèche a le droit de traverser des mots ; ce qu'elle n'a pas le droit de
// faire, c'est de s'arrêter au mot le plus proche.
//
// ⭐ Et l'attribut s'accorde parce que la fiche précédente vient d'établir sa
// fonction : la chaine des quatre fiches de grammaire se referme ici.
//
// ⚠️ RÈGLE DE COULEUR : fiche de fonctions — `sujet` (bleu) et `attribut`
// (violet) sont posés sur `groupes[].label`. Les liens d'accord emploient
// `type: "accord"`, l'arc noir plein, réservé au donneur → receveur.
//
// Alignée sur les moteurs paramétriques d'accord du groupe nominal et d'accord
// sujet-verbe, et sur les pools ACCORD_ATTRIBUT et HOMOPHONES de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
//
// Micro-compétences couvertes (les 5 de la notion `grammaire_accords`) :
// - cm2_orth_accord_gn   → propriété 2, méthode 1, exemple 1
// - cm2_orth_sujet_verbe → figure, propriétés 3 et 4, méthode 2, exemples 2 et 3
// - cm2_orth_attribut    → propriété 5, exemple 4
// - cm2_orth_homophones  → propriété 6, méthode 3
// - cm2_orth_accords_defi → propriété 1 et dernier entrainement

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

const sujetEloigne = phrase({
  mots: ["Les enfants", "de la classe", "chantent"],
  groupes: [{ mots: [0, 0], label: "sujet" }],
  liens: [{ de: 0, vers: 2, label: "pluriel", type: "accord" }],
  legende: "La flèche traverse un groupe entier sans s'y arrêter.",
});

const grilleDistance = grille({
  headers: ["Le donneur", "Il est"],
  rows: [
    { values: ["le sujet éloigné", "avant, mais loin"] },
    { values: ["le sujet inversé", "après le verbe"] },
    { values: ["le nom du groupe", "avant l'expansion"] },
  ],
  caption: "Au CM2, le donneur n'est plus à côté du receveur.",
});

const sujetInverse = phrase({
  mots: ["Sur le piton", "souffle", "un vent froid"],
  groupes: [{ mots: [2, 2], label: "sujet" }],
  liens: [{ de: 2, vers: 1, label: "singulier", type: "accord" }],
  legende: "Le sujet est écrit après le verbe, et commande quand même.",
});

const groupeAvecExpansions = phrase({
  mots: ["des", "fleurs", "rouges", "du jardin"],
  groupes: [{ mots: [3, 3], label: "complément du nom" }],
  liens: [{ de: 1, vers: 2, label: "pluriel", type: "accord" }],
  legende: "Le nom donne son nombre malgré l'expansion qui suit.",
});

const attributAccorde = phrase({
  mots: ["les plages", "sont", "désertes"],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [2, 2], label: "attribut" },
  ],
  liens: [{ de: 0, vers: 2, label: "pluriel", type: "accord" }],
  legende: "L'attribut s'accorde avec le sujet, par-dessus le verbe.",
});

const pasLePlusProche = phrase({
  mots: [
    { texte: "le mot le plus proche", barre: true },
    { texte: "le donneur", focus: true },
  ],
  legende: "Une flèche a le droit de traverser. Pas de s'arrêter en route.",
});

const homophonesCm2 = grille({
  headers: ["Tu hésites", "Tu remplaces"],
  rows: [
    { values: ["a ou à", "par avait"] },
    { values: ["est ou et", "par était"] },
    { values: ["ses ou ces", "par les siens"] },
  ],
  caption: "Un remplacement tranche mieux qu'une impression.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheGrammaireAccordsCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "grammaire-accords",
  titre: `Les accords en CM2 (${ANNEE_SCOLAIRE})`,
  accroche:
    "« Les enfants de la classe chantent. » Le mot juste avant le verbe est « classe », au singulier — et pourtant on écrit « chantent ». Au CM2, celui qui commande n'est plus à côté.",
  identite: [
    { label: "Mots clés", valeur: "Donneur, receveur, attribut" },
    { label: "Le secret", valeur: "Le donneur n'est plus à côté" },
    { label: "Outil", valeur: "Trace la flèche" },
  ],
  definition: {
    texte: [
      "Un accord se joue toujours entre deux mots : celui qui donne la marque, et celui qui la reçoit.",
      "Au CM1, les deux se touchaient presque toujours. Au CM2, il y a de la distance entre eux — et c'est toute la difficulté de l'année.",
      "Le sujet peut être éloigné du verbe : « les enfants de la classe chantent ». Il peut même être écrit après lui : « sur le piton souffle un vent froid ».",
      "Le nom, lui, donne son nombre au groupe entier, même quand une expansion s'est glissée derrière : « des fleurs rouges du jardin ».",
      "Et l'attribut s'accorde avec le sujet par-dessus le verbe : « les plages sont désertes ».",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(sujetEloigne, grilleDistance),
  },
  proprietes: [
    {
      titre: "Trace la flèche du donneur au receveur",
      texte: "Elle a le droit de traverser des mots. Jamais celui de s'arrêter au plus proche.",
      schema: pasLePlusProche,
      micros: ["cm2_orth_accords_defi"],
    },
    {
      titre: "Le nom commande tout son groupe",
      texte: "« Des fleurs rouges du jardin » : c'est « fleurs » qui décide, pas « jardin ».",
      schema: groupeAvecExpansions,
      micros: ["cm2_orth_accord_gn"],
    },
    {
      titre: "Le sujet peut être loin du verbe",
      texte: "« Les enfants de la classe chantent. » Le mot d'à côté n'est pas le sujet.",
      schema: sujetEloigne,
      micros: ["cm2_orth_sujet_verbe"],
    },
    {
      titre: "Il peut même être écrit après",
      texte: "« Sur le piton souffle un vent froid. » Il commande quand même.",
      schema: sujetInverse,
      micros: ["cm2_orth_sujet_verbe"],
    },
    {
      titre: "L'attribut s'accorde avec le sujet",
      texte: "« Les plages sont désertes. » L'accord saute par-dessus le verbe.",
      schema: attributAccorde,
      micros: ["cm2_orth_attribut"],
    },
    {
      titre: "Pour un homophone, remplace",
      texte: "a devient avait, est devient était, ses devient les siens.",
      schema: homophonesCm2,
      micros: ["cm2_orth_homophones"],
    },
  ],
  reel: {
    texte:
      "Dans une file d'attente, ce n'est pas la personne devant toi qui décide, c'est celle qui tient le guichet — même si elle est loin. Un accord marche pareil : on cherche qui commande, pas qui est le plus près.",
  },
  historique: {
    texte:
      "En latin, la terminaison d'un mot disait son rôle : on pouvait le placer n'importe où dans la phrase. Le français a perdu ces terminaisons, gardé un ordre plus strict — et hérité des accords, qui sont ce qui reste de ce vieux système.",
  },
  methode: [
    {
      titre: "Dans un groupe, remonte jusqu'au nom",
      texte: "Ignore les expansions : elles ne donnent jamais la marque, elles la reçoivent.",
      schema: groupeAvecExpansions,
      micros: ["cm2_orth_accord_gn"],
    },
    {
      titre: "Pose « qui est-ce qui ? » au verbe",
      texte: "La réponse est le sujet, qu'il soit à trois mots de là ou derrière.",
      schema: sujetEloigne,
      micros: ["cm2_orth_sujet_verbe"],
    },
    {
      titre: "Pour un homophone, remplace par un autre temps",
      texte: "Si « avait » ou « était » passe, tu tenais un verbe.",
      schema: homophonesCm2,
      micros: ["cm2_orth_homophones"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Des fleurs rouges du jardin",
      donnees: "« des fleurs rouges du jardin »",
      schema: groupeAvecExpansions,
      question: "Qui donne le pluriel ?",
      solution:
        "« Fleurs ». « Jardin » est dans une expansion : il ne commande rien, même s'il est le dernier mot du groupe.",
      micros: ["cm2_orth_accord_gn"],
    },
    {
      titre: "Les enfants de la classe",
      donnees: "« Les enfants de la classe ___ . » (chanter)",
      schema: sujetEloigne,
      question: "Singulier ou pluriel ?",
      solution:
        "Pluriel : « chantent ». Le mot juste avant le verbe est « classe », mais le sujet est « les enfants ».",
      micros: ["cm2_orth_sujet_verbe"],
    },
    {
      titre: "Sur le piton souffle…",
      donnees: "« Sur le piton ___ un vent froid. » (souffler)",
      schema: sujetInverse,
      question: "Où est le sujet ?",
      solution:
        "Après le verbe : « un vent froid ». On écrit donc « souffle », au singulier — la place ne change pas qui commande.",
      micros: ["cm2_orth_sujet_verbe"],
    },
    {
      titre: "Les plages sont désertes",
      donnees: "« Les plages sont ___ . » (désert)",
      schema: attributAccorde,
      question: "Avec quoi s'accorde l'adjectif ?",
      solution:
        "Avec le sujet « les plages » : désertes. C'est un attribut, et l'accord passe par-dessus le verbe d'état.",
      micros: ["cm2_orth_attribut"],
    },
  ],
  pieges: [
    "Accorder le verbe avec le mot le plus proche au lieu du sujet.",
    "Croire qu'un sujet placé après le verbe ne commande plus.",
    "Laisser une expansion décider du nombre du groupe.",
    "Oublier d'accorder l'attribut parce qu'un verbe le sépare du sujet.",
    "Choisir un homophone à l'oreille sans faire le remplacement.",
  ],
  aRetenir: [
    "Un accord relie un donneur et un receveur.",
    "Au CM2, ils ne se touchent plus : trace la flèche.",
    "Le nom commande son groupe, expansions comprises.",
    "Un sujet éloigné ou inversé commande quand même.",
    "L'attribut s'accorde avec le sujet, par-dessus le verbe.",
  ],
  entrainement: [
    {
      question: "« Des fleurs rouges du jardin » : qui donne le pluriel ?",
      correction: "Le nom « fleurs ».",
      micros: ["cm2_orth_accord_gn"],
    },
    {
      question: "« Les enfants de la classe ___ . » (chanter)",
      correction: "Chantent — le sujet est « les enfants ».",
      micros: ["cm2_orth_sujet_verbe"],
    },
    {
      question: "« Les plages sont ___ . » (désert)",
      correction: "Désertes — l'attribut s'accorde avec le sujet.",
      micros: ["cm2_orth_attribut"],
    },
    {
      question: "Comment trancher entre « a » et « à » ?",
      correction: "En remplaçant par « avait » : si ça passe, c'est le verbe.",
      micros: ["cm2_orth_homophones"],
    },
    {
      question: "Où une flèche d'accord n'a-t-elle pas le droit de s'arrêter ?",
      correction: "Au mot le plus proche, quand ce n'est pas le donneur.",
      micros: ["cm2_orth_accords_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesGrammaireAccordsCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les accords - CM2",
    section: {
      type: "objectif",
      phrase: "Le donneur n'est plus à côté",
      sousPhrase: "« Les enfants de la classe chantent » : le mot d'à côté est « classe ».",
      encadre: { titre: "L'idée", texte: "Trace la flèche du donneur au receveur." },
    },
  },
  {
    titre: "Trois distances",
    badge: "Les accords - CM2",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le sujet éloigné", texte: "« Les enfants de la classe… »" },
        { titre: "Le sujet inversé", texte: "« Sur le piton souffle un vent. »" },
        { titre: "L'attribut", texte: "« Les plages sont désertes. »" },
      ],
    },
    schema: grilleDistance,
  },
  {
    titre: "Comme une file d'attente",
    badge: "Les accords - CM2",
    section: {
      type: "etapes",
      etapes: [
        "Ce n'est pas la personne devant toi qui décide.",
        "C'est celle qui tient le guichet.",
        "Même si elle est loin.",
      ],
    },
    schema: sujetEloigne,
  },
  {
    titre: "À vous",
    badge: "Les accords - CM2",
    section: {
      type: "exercice",
      enonce: "« Sur le piton ___ un vent froid. » (souffler)",
      question: "Singulier ou pluriel ?",
      indice: "Pose « qui est-ce qui souffle ? »",
      correction: "« Souffle » : le sujet est « un vent froid », écrit après.",
    },
    schema: sujetInverse,
  },
];
