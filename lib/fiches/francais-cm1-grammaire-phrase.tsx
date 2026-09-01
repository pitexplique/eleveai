// ─── Fiche de cours : trouver le sujet et le verbe (CM1) ──────────────────────
// DIX-HUITIÈME FICHE DU CHANTIER CM1, deuxième des six de grammaire.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année ».
//
// ⛔⛔ LE CM2 A UNE NOTION DU MÊME NOM, ET IL FAUT S'EN ÉCARTER :
//
//   ⛔ « le sujet peut passer derrière le verbe » est un TITRE DE PROPRIÉTÉ du
//      CM2 (`francais-cm2-grammaire-phrase`). Ici la place du sujet n'est
//      mentionnée qu'en une incise de la définition, jamais comme fil.
//   ⚠️ « changer le temps pour isoler le verbe » est une méthode du CM2
//      (l. 213). Impossible de l'écarter — c'est le seul test du verbe conjugué,
//      et la micro `cm1_gram_sujet_verbe` l'exige. Elle reste donc une MÉTHODE
//      ici aussi, jamais la découverte.
//
//   | | CM1 (ici) | CM2 |
//   |---|---|---|
//   | le fil | ⭐ on ne devine pas une fonction, on la PROUVE | le sujet peut passer derrière |
//   | les micros propres | ⭐ `sujets_types` et `manipulations`, que le CM2 n'a pas | `sujet_inverse`, `nature_fonction` |
//
// ⭐⭐ LA DÉCOUVERTE VIENT D'UN ITEM DU POOL MANIPULATIONS, ET ELLE EST ÉCRITE
// EN TOUTES LETTRES : « À quoi servent les manipulations en grammaire ? — À
// PROUVER la fonction d'un groupe, AU LIEU DE LA DEVINER », avec pour méthode
// « on ne discute pas : on essaie, ET LA PHRASE RÉPOND ». Vérifié : ni
// « deviner » ni « prouve » n'apparaissent dans la fiche de CM2. C'est donc
// libre, et c'est ce qui fait du CM1 le moment où la grammaire cesse d'être une
// devinette.
//
// ⭐⭐ ET DEUX MICROS DU CM1 QUE LE CM2 N'A PAS DISENT POURQUOI IL FAUT UNE
// PREUVE — `cm1_gram_sujets_types` (« reconnaitre un sujet pronom, groupe
// nominal ou plusieurs noms ») et `cm1_gram_manipulations`. Le sujet n'a pas une
// seule allure : « Tu », « Le facteur », « Paul et Léa » sont trois sujets qui
// ne se ressemblent pas. On ne peut donc pas le reconnaitre à sa tête — d'où la
// question, puis l'encadrement.
//
// ⚠️⚠️ RÈGLE DE COULEUR, ET ELLE S'INVERSE ICI : contrairement aux dix-sept
// fiches précédentes, celle-ci PARLE de fonctions grammaticales. Les étiquettes
// `sujet` et `verbe` des `groupes` DOIVENT donc être posées : le canvas les
// colore, et la couleur porte alors exactement ce que la fiche enseigne.
//
// Alignée sur les pools PHRASE_SIMPLE, SUJET_VERBE et MANIPULATIONS de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
// Les phrases sont CELLES DE LA BANQUE : « Le facteur apporte le courrier »,
// « Chaque matin, le coq chante », « Dans le jardin poussent des tomates »,
// « Paul court et Léa saute ».
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION.
//
// Micro-compétences couvertes (les 5 de la notion `grammaire_phrase`) :
// - cm1_gram_phrase_simple  → propriété 1, exemple 1
// - cm1_gram_sujet_verbe    → propriétés 2 et 4, méthodes 1 et 2, exemple 2
// - cm1_gram_sujets_types   → propriété 3, exemple 3
// - cm1_gram_manipulations  → figure, propriété 5, méthode 3, exemple 4
// - cm1_gram_phrase_defi    → propriété 6

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

const encadrementPreuve = phrase({
  mots: ["C'est", "le facteur", "qui", "apporte", "le courrier"],
  groupes: [
    { mots: [1, 1], label: "sujet" },
    { mots: [3, 3], label: "verbe" },
  ],
  legende: "Si l'encadrement marche, le groupe est bien le sujet.",
});

const grilleQuatreEssais = grille({
  headers: ["On essaie", "Ça prouve"],
  rows: [
    { values: ["c'est … qui", "le sujet"] },
    { values: ["changer le temps", "le verbe"] },
    { values: ["déplacer", "un groupe libre"] },
  ],
  caption: "On ne discute pas : on essaie, et la phrase répond.",
});

const unSujetUnVerbe = phrase({
  mots: ["Le facteur", "apporte", "le courrier"],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [1, 1], label: "verbe" },
  ],
  legende: "Une phrase simple : un sujet, un verbe conjugué.",
});

const leVerbeBouge = phrase({
  mots: [
    { texte: "apporte" },
    { texte: "apportait", focus: true },
  ],
  legende: "Le mot qui change quand on change le temps, c'est le verbe.",
});

const grilleTroisSujets = grille({
  headers: ["La phrase", "Le sujet"],
  rows: [
    { values: ["Tu ranges", "Tu"] },
    { values: ["Le coq chante", "le coq"] },
    { values: ["Paul et Léa jouent", "Paul et Léa"] },
  ],
  caption: "Trois sujets, trois allures différentes.",
});

const questionAuVerbe = phrase({
  mots: ["Chaque matin", "le coq", "chante"],
  groupes: [
    { mots: [1, 1], label: "sujet" },
    { mots: [2, 2], label: "verbe" },
  ],
  liens: [{ de: 2, vers: 1, label: "qui est-ce qui ?", type: "question" }],
  legende: "La question se pose au verbe, et le sujet répond.",
});

const laPlaceNeDitRien = phrase({
  mots: ["Dans le jardin", "poussent", "des tomates"],
  groupes: [
    { mots: [1, 1], label: "verbe" },
    { mots: [2, 2], label: "sujet" },
  ],
  legende: "Ici le sujet est écrit après le verbe. La place ne prouve rien.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheGrammairePhraseCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "grammaire-phrase",
  titre: `Trouver le sujet et le verbe en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "« Tu », « le facteur », « Paul et Léa » : trois sujets qui ne se ressemblent pas du tout. Alors on ne les reconnait pas à leur tête — on les prouve.",
  identite: [
    { label: "Mots clés", valeur: "Sujet, verbe, manipulation" },
    { label: "Le secret", valeur: "On prouve, on ne devine pas" },
    { label: "Outil", valeur: "C'est … qui" },
  ],
  definition: {
    texte: [
      "Une phrase simple, c'est au minimum un sujet et un verbe conjugué.",
      "Le verbe est le mot qui change quand on change le temps : « il apporte » devient « il apportait ».",
      "Le sujet, lui, n'a pas une seule allure : ce peut être un pronom, un groupe de mots, ou deux noms reliés par « et ». Et il est parfois écrit après le verbe.",
      "Alors on ne le reconnait ni à sa forme ni à sa place. On pose la question au verbe : « qui est-ce qui ? »",
      "Et on vérifie en encadrant : « C'est le facteur qui apporte. » En grammaire, on ne discute pas — on essaie, et la phrase répond.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(encadrementPreuve, grilleQuatreEssais),
  },
  proprietes: [
    {
      titre: "Un sujet et un verbe, au minimum",
      texte: "C'est ce qu'il faut pour qu'une phrase simple tienne debout.",
      schema: unSujetUnVerbe,
      micros: ["cm1_gram_phrase_simple"],
    },
    {
      titre: "Le verbe change avec le temps",
      texte: "Dis la phrase hier : le seul mot qui bouge est le verbe conjugué.",
      schema: leVerbeBouge,
      micros: ["cm1_gram_sujet_verbe"],
    },
    {
      titre: "Le sujet n'a pas une seule allure",
      texte: "Un pronom, un groupe de mots, ou deux noms reliés par « et ».",
      schema: grilleTroisSujets,
      micros: ["cm1_gram_sujets_types"],
    },
    {
      titre: "On pose la question au verbe",
      texte: "« Qui est-ce qui chante ? » Ce qui répond est le sujet.",
      schema: questionAuVerbe,
      micros: ["cm1_gram_sujet_verbe"],
    },
    {
      titre: "On encadre pour en être sûr",
      texte: "« C'est le facteur qui apporte. » Si ça marche, c'est le sujet.",
      schema: encadrementPreuve,
      micros: ["cm1_gram_manipulations"],
    },
    {
      titre: "Le défi : essayer plutôt que discuter",
      texte: "Une manipulation prouve. Une impression ne prouve rien.",
      schema: grilleQuatreEssais,
      micros: ["cm1_gram_phrase_defi"],
    },
  ],
  reel: {
    texte:
      "Quand tu ne sais pas si une pile est encore bonne, tu ne la regardes pas : tu la mets dans la télécommande. La grammaire se vérifie pareil — on fait l'essai, et la phrase dit oui ou non.",
  },
  historique: {
    texte:
      "Pendant des siècles, on analysait le français comme le latin, où la fin du mot disait son rôle. Le français a perdu ces terminaisons : il a fallu inventer autre chose. Les manipulations sont cette invention.",
  },
  methode: [
    {
      titre: "Change le temps pour trouver le verbe",
      texte: "« Hier, le facteur apportait… » Le mot qui a bougé est le verbe.",
      schema: leVerbeBouge,
      micros: ["cm1_gram_sujet_verbe"],
    },
    {
      titre: "Pose « qui est-ce qui ? » devant le verbe",
      texte: "Pas devant la phrase : devant le verbe. La réponse est le sujet.",
      schema: questionAuVerbe,
      micros: ["cm1_gram_sujet_verbe"],
    },
    {
      titre: "Encadre par « c'est … qui »",
      texte: "Si la phrase reste correcte, tu tiens ta preuve.",
      schema: encadrementPreuve,
      micros: ["cm1_gram_manipulations"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Compter les verbes",
      donnees: "« Paul court et Léa saute. »",
      schema: unSujetUnVerbe,
      question: "Combien de verbes conjugués ?",
      solution:
        "Deux : « court » et « saute ». Chacun a son sujet, donc cette phrase en contient deux collées.",
      micros: ["cm1_gram_phrase_simple"],
    },
    {
      titre: "Le facteur apporte le courrier",
      donnees: "« Le facteur apporte le courrier. »",
      schema: questionAuVerbe,
      question: "Quel est le sujet ?",
      solution:
        "« Le facteur ». On pose « qui est-ce qui apporte ? » — pas « qui est-ce qui ? » toute seule, sinon on répond n'importe quoi.",
      micros: ["cm1_gram_sujet_verbe"],
    },
    {
      titre: "Trois sujets différents",
      donnees: "« Tu ranges. » · « Le coq chante. » · « Paul et Léa jouent. »",
      schema: grilleTroisSujets,
      question: "Qu'ont-ils en commun ?",
      solution:
        "Rien, sauf leur rôle. Un pronom, un groupe, deux noms : c'est bien pour ça qu'on ne peut pas reconnaitre un sujet à son allure.",
      micros: ["cm1_gram_sujets_types"],
    },
    {
      titre: "Le sujet derrière le verbe",
      donnees: "« Dans le jardin poussent des tomates. »",
      schema: laPlaceNeDitRien,
      question: "Quel est le sujet ?",
      solution:
        "« Des tomates ». Encadre pour t'en assurer : « Ce sont des tomates qui poussent. » La place ne prouve rien, l'encadrement si.",
      micros: ["cm1_gram_manipulations"],
    },
  ],
  pieges: [
    "Croire que le sujet est toujours le premier groupe.",
    "Prendre l'infinitif pour le verbe conjugué : seul le conjugué bouge.",
    "Poser « qui est-ce qui ? » sans la relier au verbe.",
    "Chercher le sujet à son allure alors qu'il en a plusieurs.",
    "Donner une réponse sans l'avoir vérifiée par un essai.",
  ],
  aRetenir: [
    "Une phrase simple : un sujet et un verbe conjugué.",
    "Le verbe est le mot qui change avec le temps.",
    "Le sujet peut être un pronom, un groupe, ou deux noms.",
    "On pose « qui est-ce qui ? » au verbe.",
    "On prouve par « c'est … qui ». On ne devine pas.",
  ],
  entrainement: [
    {
      question: "Dans une phrase simple, il y a au minimum…",
      correction: "Un sujet et un verbe.",
      micros: ["cm1_gram_phrase_simple"],
    },
    {
      question: "Dans « Le facteur apporte le courrier », quel est le sujet ?",
      correction: "Le facteur.",
      micros: ["cm1_gram_sujet_verbe"],
    },
    {
      question: "Dans « Dans le jardin poussent des tomates », quel est le sujet ?",
      correction: "Des tomates.",
      micros: ["cm1_gram_sujets_types"],
    },
    {
      question: "Pour vérifier qu'un groupe est bien le sujet, on l'encadre par…",
      correction: "« C'est … qui ».",
      micros: ["cm1_gram_manipulations"],
    },
    {
      question: "À quoi servent les manipulations en grammaire ?",
      correction: "À prouver la fonction d'un groupe, au lieu de la deviner.",
      micros: ["cm1_gram_phrase_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesGrammairePhraseCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Sujet et verbe - CM1",
    section: {
      type: "objectif",
      phrase: "On prouve, on ne devine pas",
      sousPhrase: "« Tu », « le facteur », « Paul et Léa » : trois sujets, trois allures.",
      encadre: { titre: "L'idée", texte: "On essaie, et la phrase répond." },
    },
  },
  {
    titre: "Trois essais, trois preuves",
    badge: "Sujet et verbe - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Changer le temps", texte: "Le mot qui bouge est le verbe." },
        { titre: "Qui est-ce qui ?", texte: "La réponse est le sujet." },
        { titre: "C'est … qui", texte: "Si ça marche, c'est prouvé." },
      ],
    },
    schema: grilleQuatreEssais,
  },
  {
    titre: "Comme une pile",
    badge: "Sujet et verbe - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Tu ne sais pas si la pile est bonne.",
        "Tu ne la regardes pas : tu l'essaies.",
        "La grammaire se vérifie pareil.",
      ],
    },
    schema: encadrementPreuve,
  },
  {
    titre: "À vous",
    badge: "Sujet et verbe - CM1",
    section: {
      type: "exercice",
      enonce: "« Dans le jardin poussent des tomates. »",
      question: "Quel est le sujet ?",
      indice: "Ne regarde pas la place. Encadre par « ce sont … qui ».",
      correction: "« Des tomates » — « Ce sont des tomates qui poussent. »",
    },
    schema: laPlaceNeDitRien,
  },
];
