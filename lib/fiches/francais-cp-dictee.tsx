// ─── Fiche d'activité : écrire les mots qu'on entend (CP) ─────────────────────
// NEUVIÈME FICHE DU CYCLE 2, et la réciproque de `grapheme_phoneme` : on savait
// lire des lettres pour en tirer des sons, on apprend à faire le chemin
// inverse. Le BO les veut ensemble — « il fait écrire systématiquement aux
// élèves les CGP enseignées ».
//
// ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, rubrique « Cours préparatoire ».
//
// ⭐⭐ LA DÉCOUVERTE VIENT DU POOL, ET C'EST UNE MÉTHODE, PAS UNE RÈGLE :
// « Beaucoup de mots finissent par une lettre qu'on n'entend pas. Elle ne
// s'invente pas : elle SE RETROUVE. Cherche un mot de la même famille où la
// lettre se met à parler. »
// chat → chaton, le « t » se réveille. petit → petite. grand → grande.
// C'est le premier endroit du français où l'enfant a un MOYEN de savoir, au
// lieu d'avoir à se souvenir — et c'est ce qui la rend enseignable au CP.
//
// ⭐ ET LE SECOND FIL VIENT DE L'EN-TÊTE DU POOL : « on se relit sur CE QU'ON A
// ÉCRIT, jamais sur le modèle. L'œil qui relit le modèle voit ce qu'il attend,
// pas ce qui est sur la page. » Un mot sauté ne se voit que sur sa propre
// feuille. La méthode 2 dit exactement cela.
//
// ⭐ POURQUOI CETTE NOTION MAINTENANT : ses 5 micros forment un losange qui part
// de `cp_dict_son_simple` (lui-même issu de `cp_gph_ecrire_son` ET de
// `cp_copie_mot`, les deux fiches déjà écrites) et converge sur le défi. Un
// objet cohérent, aucun découpage à décider.
//
// Les 5 micros sont couvertes :
// - cp_dict_son_simple     → figure, propriété 1, méthode 1, entrainements 1 et 2
// - cp_dict_mot_courant    → propriété 2, entrainements 3 et 4
// - cp_dict_lettres_muettes→ propriété 3, exemple 1, entrainements 5, 6 et 7
// - cp_dict_phrase_simple  → propriété 4, méthode 2, entrainements 8 et 9
// - cp_dict_defi           → exemple 2, entrainement 10
//
// ⛔ AUCUNE NOTATION PHONÉTIQUE : un son se nomme par un mot qui le contient.
// ⛔ ET LES MODÈLES S'ÉCRIVENT EN MARELLE, la cursive de l'école — sur une fiche
// dont l'objet est d'écrire, montrer une manuscrite d'adulte serait un contresens.
//
// Les mots et les phrases sont ceux du pool, repris tels quels (MOTS_DICTEE,
// MOTS_MUETS, PHRASES_DICTEE) : « le margouillat monte sur le mur ».
//
// Aligné sur `lib/tutor-v4/questionBank/cp/francais/ecriture.bank.ts`.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  ObjetsElement,
  PersonnageBulle,
  PersonnageExpression,
  PersonnageId,
  PersonnagePose,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

function objets(opts: {
  elements: ObjetsElement[];
  colonnes?: number;
  mode?: "couleur" | "coloriage";
  consigne?: string;
  largeur?: number;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "objets",
        elements: opts.elements,
        colonnes: opts.colonnes,
        mode: opts.mode ?? "coloriage",
        consigne: opts.consigne,
        size: { width: opts.largeur ?? 250 },
      }}
    />
  );
}

function perso(opts: {
  personnage: PersonnageId;
  pose?: PersonnagePose;
  expression?: PersonnageExpression;
  bulle?: PersonnageBulle;
  mode?: "couleur" | "coloriage";
  consigne?: string;
  largeur?: number;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "personnage",
        personnage: opts.personnage,
        pose: opts.pose,
        expression: opts.expression,
        bulle: opts.bulle,
        mode: opts.mode ?? "coloriage",
        consigne: opts.consigne,
        size: { width: opts.largeur ?? 250 },
      }}
    />
  );
}

/**
 * ⭐ TROIS LIGNES, JAMAIS DEUX : modèle, pointillé à repasser, ligne vide où
 * l'enfant écrit seul. ⭐ `.reglure` échappe au plafond de largeur du cycle 2 —
 * des lignes rétrécies sont des lignes où l'enfant ne peut plus écrire.
 */
function lignes(opts: {
  modele?: string;
  aRepasser?: boolean;
  consigne?: string;
  largeur?: number;
}) {
  return (
    <div className="reglure">
      <CanvasRenderer
        figure={{
          kind: "reglure",
          modele: opts.modele,
          lignes: 3,
          interligne: 3,
          aRepasser: opts.aRepasser,
          depart: true,
          consigne: opts.consigne,
          size: { width: opts.largeur ?? 250 },
        }}
      />
    </div>
  );
}

/**
 * ⭐ Une boite par mot ou par morceau. `.dessin-mots` le fait échapper au
 * plafond de largeur : un dessin qui porte du texte ne se raccourcit pas quand
 * on le rétrécit, il devient illisible.
 */
function etiquettes(opts: {
  cases: string[];
  focus?: number[];
  legende?: string;
  largeur?: number;
}) {
  const mots: PhraseCanvasMot[] = opts.cases.map((c, i) => ({
    texte: c,
    focus: opts.focus?.includes(i),
  }));
  return (
    <div className="dessin-mots">
      <CanvasRenderer
        figure={{
          kind: "phrase",
          mots,
          legende: opts.legende,
          largeurMax: opts.largeur ?? 280,
        }}
      />
    </div>
  );
}

// ─── Les dessins ──────────────────────────────────────────────────────────────

/**
 * ⭐⭐ LA FIGURE EST LA DÉCOUVERTE : la lettre muette se réveille dans un mot de
 * la même famille. Trois couples, et la lettre qu'on cherche est en avant dans
 * chacun. Aucune définition ne montre cela — c'est un GESTE de recherche.
 */
const laLettreSeReveille = etiquettes({
  cases: ["chat", "chaton", "petit", "petite"],
  focus: [1, 3],
  legende: "Dans « chaton » et « petite », la lettre muette se met à parler.",
  largeur: 320,
});

/* ⛔ UN SECOND COUPLE, ET DEUX RAISONS (vu au rendu du PDF, 04/09).
   1. Le MÊME dessin servait à la figure, à la propriété 3 ET à l'exemple 1 :
      trois fois la même image sur deux pages, dont deux à quelques centimètres
      l'une de l'autre. Un dessin répété n'apprend rien la deuxième fois.
   2. Un seul exemple ne fait pas une règle. « chat → chaton » peut passer pour
      une curiosité ; « grand → grande » et « gros → grosse » à côté montrent que
      c'est un PROCÉDÉ, et que la lettre réveillée change à chaque fois. */
const deuxAutresFamilles = etiquettes({
  cases: ["grand", "grande", "gros", "grosse"],
  focus: [1, 3],
  legende: "Le d de « grand » et le s de « gros » se réveillent aussi.",
  largeur: 320,
});

/** ⭐ L'exemple travaille sur UN couple, montré seul : c'est le geste qu'on
 *  refait, pas la collection qu'on relit. */
const petitEtPetite = etiquettes({
  cases: ["petit", "petite"],
  focus: [1],
  legende: "Dans « petite », on entend le t.",
  largeur: 240,
});

const ecrireLesSonsDansLOrdre = lignes({
  modele: "chapeau",
  aRepasser: true,
  consigne: "On dit le mot au ralenti, puis on écrit un son après l'autre.",
  largeur: 300,
});

const lesMotsQuOnRevoit = perso({
  personnage: "nina",
  pose: "bras_leves",
  expression: "yeux_fermes",
  bulle: { texte: "maison" },
  consigne: "Je ferme les yeux et je revois le mot dans mon cahier.",
});

const lesDeuxBornes = etiquettes({
  cases: ["Le", "chat", "dort", "."],
  focus: [0, 3],
  legende: "La majuscule et le point ne s'entendent pas. Ils s'écrivent quand même.",
  largeur: 300,
});

const jeDisAuRalenti = perso({
  personnage: "teo",
  pose: "debout",
  expression: "pense",
  bulle: { texte: "ba — teau", forme: "pensee" },
  consigne: "Je découpe le mot en sons avant d'écrire.",
});

/** ⭐⭐ ON SE RELIT SUR SA PROPRE FEUILLE. Le pool est formel : l'œil qui relit
 *  le modèle voit ce qu'il attend, pas ce qui est écrit. Un mot sauté ne se
 *  voit que sur sa page à soi. */
const jeRelisMaFeuille = perso({
  personnage: "zoe",
  pose: "montre",
  expression: "pense",
  bulle: { texte: "Ce que J'AI écrit." },
  consigne: "Je relis ma feuille, pas le modèle, mot par mot.",
});

const troisMotsADicter = objets({
  elements: [
    { quoi: "maison", label: "une maison" },
    { quoi: "oiseau", label: "un oiseau" },
    { quoi: "bateau", label: "un bateau" },
  ],
  colonnes: 2,
  consigne: "Trois mots qu'on écrira souvent cette année.",
  largeur: 280,
});

/* ─── Les dessins DES EXERCICES ────────────────────────────────────────────────
   ⭐⭐ AU CYCLE 2, UN EXERCICE SE FAIT AU CRAYON. Sur CETTE notion, six supports
   sur huit sont des RÉGLURES : le BO demande d'« écrire sous la dictée des mots
   et des phrases », et une question à cocher sur la dictée fait tout sauf écrire.
   ⛔ Ni `consigne` ni `legende` ici : l'énoncé numéroté les porte déjà.
   ⛔ Et aucune `marque` : entourer d'avance, c'est donner la réponse. */

const exChapeau = lignes({ modele: "chapeau", aRepasser: true, largeur: 280 });
const exBateau = lignes({ modele: "bateau", aRepasser: true, largeur: 280 });
const exMaison = lignes({ modele: "maison", aRepasser: true, largeur: 280 });
const exChat = lignes({ modele: "chat", aRepasser: true, largeur: 260 });
const exPhraseDictee = lignes({
  modele: "Le chat dort sur le tapis.",
  aRepasser: true,
  largeur: 330,
});
const exMargouillat = lignes({
  modele: "Le margouillat monte sur le mur.",
  aRepasser: true,
  largeur: 330,
});

const exFamilles = etiquettes({
  cases: ["grand", "grande", "gros", "grosse"],
  largeur: 300,
});

const exDeuxEcritures = etiquettes({
  cases: ["maizon", "maison"],
  largeur: 240,
});

const exObjetsADicter = objets({
  elements: [
    { quoi: "oiseau", label: "un oiseau" },
    { quoi: "fleur", label: "une fleur" },
  ],
  colonnes: 2,
  largeur: 260,
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheDicteeCp: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cp",
  notion: "ecriture_mots",
  // ⛔ Pas de deux-points : tous les h2 reprennent ce titre après un.
  titre: `Écrire les mots qu'on entend au CP (${ANNEE_SCOLAIRE})`,
  accroche:
    "La lettre qu'on n'entend pas ne s'invente pas : elle se retrouve. « chat » cache un t, et « chaton » le réveille.",
  identite: [],
  definition: {
    texte: [
      "Écrire sous la dictée, c'est transformer des sons en lettres, dans l'ordre où on les entend.",
      "On dit le mot au ralenti, on écrit le premier son, puis le suivant, jusqu'au bout.",
      "Mais certains mots cachent une lettre à la fin, qu'on n'entend pas. Elle ne s'invente pas : on cherche un mot de la même famille où elle se met à parler. « chat » → « chaton » : le t se réveille.",
    ].join("\n\n"),
  },
  figure: {
    schema: laLettreSeReveille,
  },
  proprietes: [
    {
      titre: "On écrit les sons dans l'ordre",
      texte: "Un son après l'autre, du début à la fin du mot.",
      schema: ecrireLesSonsDansLOrdre,
      micros: ["cp_dict_son_simple"],
    },
    {
      titre: "Certains mots, on les revoit",
      texte: "Ils reviennent si souvent qu'on finit par les connaitre par cœur.",
      schema: lesMotsQuOnRevoit,
      micros: ["cp_dict_mot_courant"],
    },
    {
      titre: "La lettre muette se réveille en famille",
      texte: "chat → chaton. grand → grande. gros → grosse.",
      schema: deuxAutresFamilles,
      micros: ["cp_dict_lettres_muettes"],
    },
    {
      titre: "Une phrase a deux bornes qu'on n'entend pas",
      texte: "La majuscule au début, le point à la fin. On les écrit quand même.",
      schema: lesDeuxBornes,
      micros: ["cp_dict_phrase_simple"],
    },
  ],
  reel: {
    texte:
      "C'est ce qui permet d'écrire un mot qu'on n'a jamais copié : on l'entend, on le découpe, on l'écrit. Plus besoin d'un modèle sous les yeux.",
  },
  historique: { texte: "" },
  methode: [
    {
      titre: "Je dis le mot au ralenti",
      texte: "Je découpe en sons, puis j'écris chaque son dans l'ordre.",
      schema: jeDisAuRalenti,
      micros: ["cp_dict_son_simple"],
    },
    {
      titre: "Je relis MA feuille",
      texte: "Pas le modèle : ma page à moi, mot par mot. Un mot sauté ne se voit que là.",
      schema: jeRelisMaFeuille,
      micros: ["cp_dict_phrase_simple", "cp_dict_defi"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "La lettre qui se réveille",
      donnees: "On te dicte « petit ». On n'entend pas la dernière lettre.",
      question: "Comment savoir laquelle écrire ?",
      solution:
        "On cherche un mot de la même famille : « petite ». On y entend le t. C'est donc « petit » avec un t.",
      schema: petitEtPetite,
      micros: ["cp_dict_lettres_muettes"],
    },
    {
      titre: "Deux choses à vérifier",
      donnees: "On te dicte : « Le margouillat monte sur le mur. »",
      question: "Que faut-il vérifier avant de reposer le crayon ?",
      solution:
        "Les mots, et les deux bornes : la majuscule au début, le point à la fin. Puis on relit sa propre feuille.",
      schema: lesDeuxBornes,
      micros: ["cp_dict_defi", "cp_dict_phrase_simple"],
    },
  ],
  pieges: [
    "Une lettre muette ne se devine pas : on cherche un mot de la même famille.",
    "En se relisant, on lit SA feuille — pas le modèle. L'œil qui relit le modèle voit ce qu'il attend.",
  ],
  aRetenir: [
    "Écrire sous la dictée, c'est écrire les sons dans l'ordre où on les entend.",
    "On dit le mot au ralenti avant d'écrire.",
    "La lettre muette se retrouve dans un mot de la même famille : chat → chaton.",
    "Une phrase dictée prend aussi sa majuscule et son point, qu'on n'entend pas.",
    "On se relit sur sa propre feuille, mot par mot.",
  ],
  /* ⭐ Dix exercices, neuf avec un support. Six font ÉCRIRE, comme le BO le
     demande. Les corrections s'impriment sur leur propre page. */
  entrainement: [
    {
      question: "On te dicte le mot qu'on met sur la tête. Repasse-le, puis écris-le seul.",
      correction: "« chapeau ». Pas « chapo » ni « chapau » : le son o s'écrit eau ici.",
      schema: exChapeau,
      micros: ["cp_dict_son_simple"],
    },
    {
      question: "On te dicte le mot qui flotte sur l'eau. Écris-le.",
      correction: "« bateau ». ba — teau : on écrit les sons dans l'ordre.",
      schema: exBateau,
      micros: ["cp_dict_son_simple"],
    },
    {
      question: "Barre l'écriture qui n'est pas la bonne.",
      correction: "On barre « maizon ». Ça se dit pareil, mais on écrit « maison » avec un s.",
      schema: exDeuxEcritures,
      micros: ["cp_dict_mot_courant"],
    },
    {
      question: "Ferme les yeux, revois le mot dans ton cahier, puis écris-le.",
      correction: "« maison ». C'est un mot qui revient tous les jours : on finit par le revoir.",
      schema: exMaison,
      micros: ["cp_dict_mot_courant"],
    },
    {
      question: "Relie chaque mot à celui de sa famille où la lettre se réveille.",
      correction: "grand → grande (le d parle), gros → grosse (le s parle).",
      schema: exFamilles,
      micros: ["cp_dict_lettres_muettes"],
    },
    {
      question: "Écris « chat ». Quelle lettre n'entend-on pas, et comment le sait-on ?",
      correction: "Le t. On le sait par « chaton », où il se met à parler.",
      schema: exChat,
      micros: ["cp_dict_lettres_muettes"],
    },
    {
      question: "On te dicte « vert ». Quel mot de la famille te donne la dernière lettre ?",
      correction: "« verte » : on y entend le t. On écrit donc « vert ».",
      micros: ["cp_dict_lettres_muettes"],
    },
    {
      question: "Écris la phrase dictée, puis entoure ses deux bornes.",
      correction: "« Le chat dort sur le tapis. » — la majuscule au début, le point à la fin.",
      schema: exPhraseDictee,
      micros: ["cp_dict_phrase_simple"],
    },
    {
      question: "Écris cette phrase, puis relis TA feuille mot par mot.",
      correction: "« Le margouillat monte sur le mur. » On relit sa page, jamais le modèle.",
      schema: exMargouillat,
      micros: ["cp_dict_phrase_simple", "cp_dict_defi"],
    },
    {
      question: "Écris le nom des deux dessins sous chacun.",
      correction: "« un oiseau » et « une fleur ». Attention : oiseau, pas « oizeau ».",
      schema: exObjetsADicter,
      micros: ["cp_dict_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cp",
};

export const slidesDicteeCp: ClasseSlide[] = [
  {
    titre: "Ce qu'on apprend",
    badge: "Écrire les mots - CP",
    section: {
      type: "objectif",
      phrase: "La lettre muette ne s'invente pas",
      sousPhrase: "« chat » cache un t, et « chaton » le réveille.",
      encadre: {
        titre: "L'idée",
        texte: "On la retrouve dans un mot de la même famille.",
      },
    },
    schema: laLettreSeReveille,
  },
  {
    titre: "Les mots de tous les jours",
    badge: "Écrire les mots - CP",
    section: {
      type: "cartes",
      cartes: [
        { titre: "maison", texte: "avec un s" },
        { titre: "oiseau", texte: "avec un s" },
        { titre: "bateau", texte: "le son o s'écrit eau" },
      ],
    },
    schema: troisMotsADicter,
  },
  {
    titre: "J'écris sous la dictée",
    badge: "Écrire les mots - CP",
    section: {
      type: "etapes",
      etapes: [
        "Je dis le mot au ralenti.",
        "J'écris les sons dans l'ordre.",
        "Je relis MA feuille, mot par mot.",
      ],
    },
    schema: jeRelisMaFeuille,
  },
  {
    titre: "À vous",
    badge: "Écrire les mots - CP",
    section: {
      type: "exercice",
      enonce: "On te dicte « petit ». On n'entend pas la dernière lettre.",
      question: "Comment savoir laquelle écrire ?",
      indice: "Cherche un mot de la même famille où la lettre se met à parler.",
      correction: "« petite » : on y entend le t. On écrit donc « petit ».",
    },
    schema: laLettreSeReveille,
  },
];
