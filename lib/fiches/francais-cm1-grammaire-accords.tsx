// ─── Fiche de cours : les accords et les homophones (CM1) ─────────────────────
// VINGT-DEUXIÈME FICHE DU CHANTIER CM1, et DERNIÈRE DES SIX DE GRAMMAIRE.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année ».
//
// ⛔ NE PAS REDIRE : « l'accord n'est pas une règle à réciter, c'est une
// conclusion qu'on tire d'une analyse » est la découverte de
// `francais-6e-grammaire-accords`, tirée des verbes de son BO — RAISONNER sur
// l'accord, MAÎTRISER la chaine. Le participe passé avec COD antéposé lui
// appartient aussi, et n'est pas au programme du CM1.
// ⚠️ Côté CM2, `grammaire_accords` n'a pas de fiche à elle : elle redirige vers
// `francais/cm2/grammaire-orthographe`, la fiche d'avant le chantier.
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE SE VOIT EN LISANT LE POOL HOMOPHONES EN ENTIER :
// DANS CHAQUE PAIRE, L'UN DES DEUX EST UN VERBE ET L'AUTRE NON.
//     a / à · est / et · sont / son · ont / on
// Or le CM1 sait déjà reconnaitre un verbe — il l'a appris quatre fiches plus
// tôt : « le verbe est le mot qui change quand on change le temps »
// (`grammaire_phrase`). UN SEUL ESSAI RÈGLE DONC LES QUATRE PAIRES : mets la
// phrase à l'imparfait. « Il a un vélo » → « il AVAIT un vélo », ça marche : donc
// « a » sans accent. « Elle va à l'école » → « elle va AVAIT l'école », ça ne
// marche pas : donc « à » avec accent.
// ⭐ Vérifié : ni la fiche de 6e ni celle du CM2 n'emploient le mot imparfait.
//
// ⚠️ HONNÊTETÉ DE LA FICHE : « ou / où » N'ENTRE PAS DANS CE TEST — aucun des
// deux n'est un verbe. La fiche le dit au lieu de le cacher, et donne l'autre
// essai : remplacer par « ou bien ». Une méthode qui prétend tout couvrir se
// fait démentir par le premier contre-exemple, et l'élève cesse d'y croire.
//
// ⭐⭐ ET C'EST LE CINQUIÈME GESTE DE L'ANNÉE. Les six fiches de grammaire du CM1
// ne sont pas six leçons, ce sont SIX ESSAIS, et la fiche le dit à l'élève :
//     `grammaire_phrase`        → ENCADRER par « c'est … qui »
//     `grammaire_complements`   → ENLEVER et DÉPLACER
//     `grammaire_classes_mots`  → METTRE AU PLURIEL
//     `grammaire_groupe_nominal`→ RÉDUIRE
//     ici                       → METTRE À L'IMPARFAIT
//
// ⭐ La micro `cm1_orth_classes_mots_variables` — « repérer ce qui varie : genre,
// nombre, personne, temps » — donne la carte : DEUX CHAINES, DEUX CHEFS. Le nom
// commande le genre et le nombre dans son groupe ; le sujet commande la personne
// et le temps du verbe. Ce sont deux mécaniques distinctes, et les confondre est
// l'erreur qui produit « les enfants sont content ».
//
// ⚠️ RÈGLE DE COULEUR : « sujet » est une fonction, elle passe par
// `groupes[].label` et sort en bleu. Les liens d'accord emploient
// `type: "accord"` — l'arc noir plein, réservé au déterminant → nom et au
// sujet → verbe, exactement les deux chaines de la fiche.
//
// Alignée sur le pool HOMOPHONES et sur les moteurs paramétriques d'accord du
// groupe nominal et d'accord sujet-verbe de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION.
//
// Micro-compétences couvertes (les 5 de la notion `grammaire_accords`) :
// - cm1_orth_classes_mots_variables → propriétés 1 et 4
// - cm1_orth_accord_gn              → propriété 2, méthode 1, exemple 1
// - cm1_orth_sujet_verbe            → propriété 3, méthode 2, exemple 2
// - cm1_orth_homophones             → figure, propriété 5, méthode 3, exemples 3 et 4
// - cm1_orth_accords_defi           → propriété 6

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

const testDeLImparfait = phrase({
  mots: [
    { texte: "il a un vélo" },
    { texte: "il avait", focus: true },
  ],
  legende: "Ça marche à l'imparfait : c'est le verbe, donc pas d'accent.",
});

const grilleQuatrePaires = grille({
  headers: ["Le mot", "À l'imparfait"],
  rows: [
    { values: ["a, est", "avait, était"] },
    { values: ["sont, ont", "étaient, avaient"] },
    { values: ["à, et, son, on", "rien ne marche"] },
  ],
  caption: "Dans chaque paire, un seul des deux est un verbe.",
});

const chaineDuGroupe = phrase({
  mots: [
    { texte: "des" },
    { texte: "fleurs", nature: "nom", focus: true },
    { texte: "rouges" },
  ],
  liens: [{ de: 1, vers: 2, label: "pluriel", type: "accord" }],
  legende: "Le nom donne son nombre au déterminant et à l'adjectif.",
});

const chaineDuVerbe = phrase({
  mots: ["Les enfants", "de la classe", "chantent"],
  groupes: [{ mots: [0, 0], label: "sujet" }],
  liens: [{ de: 0, vers: 2, label: "pluriel", type: "accord" }],
  legende: "Le sujet commande le verbe, même quand des mots les séparent.",
});

const grilleDeuxChaines = grille({
  headers: ["Le chef", "Il donne"],
  rows: [
    { values: ["le nom", "genre, nombre"] },
    { values: ["le sujet", "personne, temps"] },
  ],
  caption: "Deux chaines, deux chefs. On ne les mélange pas.",
});

const ouOuOu = phrase({
  mots: [
    { texte: "ou", focus: true },
    { texte: "ou bien" },
  ],
  legende: "Ici l'imparfait ne sert à rien : essaie « ou bien ».",
});

const enfantsContents = phrase({
  mots: [
    { texte: "les enfants sont content", barre: true },
    { texte: "contents", focus: true },
  ],
  legende: "Le sujet est au pluriel : l'adjectif aussi.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheGrammaireAccordsCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "grammaire-accords",
  titre: `Les accords et les homophones en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "a ou à ? est ou et ? sont ou son ? Dans chacune de ces paires, l'un des deux est un verbe — et tu sais déjà reconnaitre un verbe : c'est le mot qui change quand tu changes le temps.",
  identite: [
    { label: "Mots clés", valeur: "Accord, chaine, homophone" },
    { label: "Le secret", valeur: "Un seul essai pour quatre paires" },
    { label: "Outil", valeur: "Mets la phrase à l'imparfait" },
  ],
  definition: {
    texte: [
      "Accorder, c'est recopier une marque. Encore faut-il savoir qui la donne.",
      "Il y a deux chaines, et deux chefs. Dans le groupe nominal, c'est le nom qui donne le genre et le nombre. Dans la phrase, c'est le sujet qui donne la personne et le temps au verbe.",
      "Ces deux mécaniques ne se mélangent pas. Les confondre, c'est écrire « les enfants sont content ».",
      "Restent les mots qui se prononcent pareil : a et à, est et et, sont et son, ont et on. Dans chaque paire, l'un est un verbe et l'autre non.",
      "Alors mets la phrase à l'imparfait. « Il a un vélo » devient « il avait un vélo » : ça marche, c'est le verbe. « Elle va à l'école » ne devient pas « elle va avait l'école » : c'est donc « à » avec l'accent.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(testDeLImparfait, grilleQuatrePaires),
  },
  proprietes: [
    {
      titre: "Deux chaines, deux chefs",
      texte: "Le nom commande son groupe. Le sujet commande le verbe. Jamais l'inverse.",
      schema: grilleDeuxChaines,
      micros: ["cm1_orth_classes_mots_variables"],
    },
    {
      titre: "Dans le groupe, tout suit le nom",
      texte: "« Des fleurs rouges » : c'est « fleurs » qui met un s aux deux autres.",
      schema: chaineDuGroupe,
      micros: ["cm1_orth_accord_gn"],
    },
    {
      titre: "Le verbe suit son sujet, même de loin",
      texte: "« Les enfants de la classe chantent. » Des mots séparent les deux : ça ne change rien.",
      schema: chaineDuVerbe,
      micros: ["cm1_orth_sujet_verbe"],
    },
    {
      titre: "Ce qui varie n'est pas la même chose",
      texte: "Un nom varie en genre et en nombre. Un verbe varie en personne et en temps.",
      schema: enfantsContents,
      micros: ["cm1_orth_classes_mots_variables"],
    },
    {
      titre: "Un homophone sur deux est un verbe",
      texte: "a, est, sont, ont sont des verbes. à, et, son, on n'en sont pas.",
      schema: testDeLImparfait,
      micros: ["cm1_orth_homophones"],
    },
    {
      titre: "Le défi : mets à l'imparfait",
      texte: "Un seul essai règle quatre paires. Le cinquième geste de l'année.",
      schema: grilleQuatrePaires,
      micros: ["cm1_orth_accords_defi"],
    },
  ],
  reel: {
    texte:
      "Dans une équipe, c'est le capitaine qui porte le brassard, et les autres suivent. Une phrase a deux capitaines : le nom pour son groupe, le sujet pour le verbe. Trouve le capitaine, et tu sais quoi écrire.",
  },
  historique: {
    texte:
      "Ces mots ne se ressemblaient pas toujours. « À » vient du latin ad, « a » vient de habet. Ils ont fini par se prononcer pareil, et l'accent a été ajouté bien plus tard, pour qu'on puisse encore les distinguer à l'œil.",
  },
  methode: [
    {
      titre: "Trouve le chef, puis recopie sa marque",
      texte: "Dans un groupe, cherche le nom. Il porte le genre et le nombre.",
      schema: chaineDuGroupe,
      micros: ["cm1_orth_accord_gn"],
    },
    {
      titre: "Pour le verbe, pose « qui est-ce qui ? »",
      texte: "Tu retrouves le sujet, même s'il est loin. C'est lui qui décide.",
      schema: chaineDuVerbe,
      micros: ["cm1_orth_sujet_verbe"],
    },
    {
      titre: "Pour un homophone, mets à l'imparfait",
      texte: "Si le mot devient « avait » ou « était », c'était le verbe.",
      schema: testDeLImparfait,
      micros: ["cm1_orth_homophones"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Des fleurs rouges",
      donnees: "« des fleurs rouges »",
      schema: chaineDuGroupe,
      question: "Qui décide du s ?",
      solution:
        "Le nom « fleurs ». Il donne son nombre au déterminant « des » et à l'adjectif « rouges ».",
      micros: ["cm1_orth_accord_gn"],
    },
    {
      titre: "Un sujet éloigné",
      donnees: "« Les enfants de la classe chantent. »",
      schema: chaineDuVerbe,
      question: "Pourquoi « chantent » et pas « chante » ?",
      solution:
        "Parce que le sujet est « les enfants », pas « la classe ». Pose « qui est-ce qui chante ? » et tu retrouves le bon.",
      micros: ["cm1_orth_sujet_verbe"],
    },
    {
      titre: "Il a, elle va à",
      donnees: "« Il a un vélo. » · « Elle va à l'école. »",
      schema: testDeLImparfait,
      question: "Lequel prend l'accent ?",
      solution:
        "Le second. « Il avait un vélo » se dit : c'est le verbe, donc « a ». « Elle va avait l'école » ne se dit pas : donc « à ».",
      micros: ["cm1_orth_homophones"],
    },
    {
      titre: "Quand l'imparfait ne sert à rien",
      donnees: "« Tu veux du jus ou de l'eau ? »",
      schema: ouOuOu,
      question: "Comment choisir entre ou et où ?",
      solution:
        "Ici aucun des deux n'est un verbe : l'essai ne marche pas. Remplace par « ou bien ». Si ça se dit, c'est « ou » sans accent.",
      micros: ["cm1_orth_homophones"],
    },
  ],
  pieges: [
    "Accorder l'adjectif avec le mot le plus proche au lieu du nom.",
    "Écrire « les enfants sont content ».",
    "Prendre « la classe » pour le sujet dans « les enfants de la classe ».",
    "Croire que l'essai de l'imparfait marche aussi pour ou et où.",
    "Choisir un homophone à l'oreille, sans faire l'essai.",
  ],
  aRetenir: [
    "Le nom donne le genre et le nombre à son groupe.",
    "Le sujet donne la personne et le temps au verbe.",
    "a, est, sont, ont sont des verbes.",
    "Mets à l'imparfait : si ça marche, c'était le verbe.",
    "Pour ou et où, essaie plutôt « ou bien ».",
  ],
  entrainement: [
    {
      question: "Dans « des fleurs rouges », qui commande l'accord ?",
      correction: "Le nom « fleurs ».",
      micros: ["cm1_orth_accord_gn"],
    },
    {
      question: "« Les enfants de la classe chantent. » Quel est le sujet ?",
      correction: "« Les enfants » — et c'est lui qui donne le pluriel.",
      micros: ["cm1_orth_sujet_verbe"],
    },
    {
      question: "« Il a un nouveau vélo » ou « Il à un nouveau vélo » ?",
      correction: "« Il a » : à l'imparfait, « il avait » se dit.",
      micros: ["cm1_orth_homophones"],
    },
    {
      question: "Un nom varie en… et un verbe varie en… ?",
      correction: "Genre et nombre pour le nom ; personne et temps pour le verbe.",
      micros: ["cm1_orth_classes_mots_variables"],
    },
    {
      question: "Tu hésites entre « sont » et « son ». Que fais-tu ?",
      correction: "Tu mets à l'imparfait : si « étaient » se dit, c'est « sont ».",
      micros: ["cm1_orth_accords_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesGrammaireAccordsCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Accords et homophones - CM1",
    section: {
      type: "objectif",
      phrase: "Mets la phrase à l'imparfait",
      sousPhrase: "Dans a/à, est/et, sont/son, ont/on : l'un des deux est un verbe.",
      encadre: { titre: "L'idée", texte: "Un seul essai règle les quatre paires." },
    },
  },
  {
    titre: "Deux chaines, deux chefs",
    badge: "Accords et homophones - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le nom", texte: "Il donne le genre et le nombre." },
        { titre: "Le sujet", texte: "Il donne la personne et le temps." },
        { titre: "L'essai", texte: "À l'imparfait : avait, était." },
      ],
    },
    schema: grilleDeuxChaines,
  },
  {
    titre: "Comme un capitaine",
    badge: "Accords et homophones - CM1",
    section: {
      type: "etapes",
      etapes: [
        "C'est le capitaine qui porte le brassard.",
        "Les autres suivent.",
        "Trouve le chef, et tu sais quoi écrire.",
      ],
    },
    schema: chaineDuVerbe,
  },
  {
    titre: "À vous",
    badge: "Accords et homophones - CM1",
    section: {
      type: "exercice",
      enonce: "« Elle va à l'école. »",
      question: "Pourquoi l'accent ?",
      indice: "Essaie de mettre ce mot à l'imparfait.",
      correction: "« Elle va avait l'école » ne se dit pas : ce n'est pas le verbe.",
    },
    schema: testDeLImparfait,
  },
];
