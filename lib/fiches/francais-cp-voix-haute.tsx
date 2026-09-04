// ─── Fiche d'activité : lire à voix haute (CP) ────────────────────────────────
// QUINZIÈME FICHE DU CYCLE 2. Elle suit `lecture_syllabique` : on sait
// déchiffrer une phrase, on apprend à la DIRE.
//
// ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, rubrique « Cours préparatoire ».
//
// ⭐⭐ LA DÉCOUVERTE : LE TEXTE CONTIENT DÉJÀ LES INSTRUCTIONS POUR LE LIRE.
// Lire à voix haute passe pour un talent — on aurait « le ton » ou on ne
// l'aurait pas. Les deux indices du pool disent l'inverse, et ils suffisent :
//   · « Le signe de la fin dit à ta voix ce qu'elle doit faire. »
//   · « On respire entre les groupes, jamais au milieu d'un groupe. »
// Autrement dit : la ponctuation n'est pas une décoration, c'est une NOTATION
// POUR LA VOIX, comme les notes le sont pour la musique. Le point la fait
// descendre, le point d'interrogation la fait monter, le point d'exclamation
// lui met de la force. Bien lire à voix haute, ce n'est donc pas ajouter du ton
// par-dessus le texte : c'est obéir à ce qui y est déjà écrit.
//
// ⭐ ET LE DÉCOUPAGE EN GROUPES EST LA SECONDE MOITIÉ. « Le petit chien / dort /
// sur le tapis. » Un enfant qui respire au hasard casse le sens même en lisant
// tous les mots justes ; le pool le mesure par ses distracteurs — respirer au
// milieu d'un groupe, ou ne pas respirer du tout.
//
// ⛔ LA FLUENCE NE SE MESURE PAS SUR CETTE FEUILLE. Le BO demande 30 mots par
// minute sans préparation en fin de CP, 50 après préparation — mais cela se
// chronomètre en classe, à voix haute, par un adulte. La fiche donne le
// repère et ce qu'on en fait ; elle ne prétend pas le mesurer.
//
// ⭐ POURQUOI CETTE NOTION MAINTENANT : ses 4 micros forment une chaine simple
// (ponctuation → groupes → expressive et 30 mots), et sa racine
// `cp_voix_ponctuation` a pour prérequis `cp_lec_phrase_simple`, déjà couvert.
//
// Les 4 micros sont couvertes :
// - cp_voix_ponctuation  → figure, propriété 1, méthode 1, entrainements 1, 2 et 3
// - cp_voix_groupes_mots → propriété 2, exemple 1, méthode 2, entrainements 4, 5 et 6
// - cp_voix_expressive   → propriété 3, exemple 2, entrainements 7 et 8
// - cp_voix_30_mots      → propriété 4, entrainements 9 et 10
//
// Les phrases sont celles du pool (PHRASES_VOIX, GROUPES), reprises telles
// quelles — « Le margouillat monte sur le mur. »
//
// Aligné sur `lib/tutor-v4/questionBank/cp/francais/oral-et-lecteur.bank.ts`.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PersonnageBulle,
  PersonnageExpression,
  PersonnageId,
  PersonnagePose,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

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
 * ⭐⭐ LA FIGURE : TROIS SIGNES, TROIS ORDRES DONNÉS À LA VOIX. Les trois
 * phrases se lisent avec les mêmes mots dans la bouche et trois voix
 * différentes — et ce qui change tient dans un signe large d'un millimètre.
 */
const troisSignesTroisVoix = etiquettes({
  cases: [".", "?", "!"],
  legende: "Le point descend. Le point d'interrogation monte. Le point d'exclamation appuie.",
  largeur: 240,
});

const lePointDescend = etiquettes({
  cases: ["Le margouillat monte sur le mur."],
  legende: "Un point : on s'arrête et on baisse la voix.",
  largeur: 300,
});

/** ⭐ Les barres du pool, reprises telles quelles : on respire ENTRE les
 *  groupes, jamais au milieu d'un groupe. */
const ouRespirer = etiquettes({
  cases: ["Le petit chien", "dort", "sur le tapis."],
  legende: "Trois groupes, deux respirations. Jamais au milieu d'un groupe.",
  largeur: 320,
});

const laVoixDeLOgre = perso({
  personnage: "ravi",
  pose: "bras_leves",
  expression: "rire",
  bulle: { texte: "Qui a mangé mon gâteau ?", forme: "cri" },
  consigne: "Quand un personnage parle, la voix change avec lui.",
});

const trenteMotsParMinute = etiquettes({
  cases: ["30 mots", "sans préparer", "50 mots", "après préparation"],
  focus: [0, 2],
  legende: "Les deux repères de fin de CP.",
  largeur: 320,
});

const jeRegardeLaFin = perso({
  personnage: "zoe",
  pose: "montre",
  expression: "pense",
  bulle: { texte: "Le signe, d'abord !" },
  consigne: "Avant de lire une phrase, je regarde le signe de la fin.",
});

const jeLisParGroupes = perso({
  personnage: "nina",
  pose: "debout",
  expression: "sourire",
  bulle: { texte: "Le petit chien / dort" },
  consigne: "Je lis les mots qui vont ensemble d'un seul souffle.",
});

/* ─── Les dessins DES EXERCICES ────────────────────────────────────────────────
   ⭐⭐ AU CYCLE 2, UN EXERCICE SE FAIT AU CRAYON — même sur une notion qui
   s'entend : on entoure le signe de la fin, on trace les barres de
   respiration, on relie un signe à ce que fait la voix.
   ⛔ Ni `consigne` ni `legende` ici : l'énoncé numéroté les porte déjà. */

const exTroisPhrases = etiquettes({
  cases: ["Où est mon cahier ?", "Quel beau lagon !", "Léa mange une mangue."],
  largeur: 320,
});

const exSignes = etiquettes({ cases: [".", "?", "!"], largeur: 200 });

const exPhraseAPoint = etiquettes({
  cases: ["Le piton fume au loin."],
  largeur: 280,
});

const exGroupes = etiquettes({
  cases: ["Les enfants jouent dans la cour."],
  largeur: 300,
});

const exGroupesCoupes = etiquettes({
  cases: ["Le bateau", "glisse", "sur le lagon."],
  largeur: 320,
});

const exMauvaiseCoupe = etiquettes({
  cases: ["Le petit", "chien dort sur le", "tapis."],
  largeur: 320,
});

const exOgre = perso({
  personnage: "ravi",
  pose: "bras_leves",
  expression: "rire",
  bulle: { texte: "Qui a mangé mon gâteau ?", forme: "cri" },
  largeur: 250,
});

const exExclamation = etiquettes({
  cases: ["Comme ce letchi est bon !"],
  largeur: 300,
});

const exFluence = etiquettes({
  cases: ["22 mots", "30 mots"],
  largeur: 240,
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheVoixHauteCp: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cp",
  notion: "lecture_voix_haute",
  // ⛔ Pas de deux-points : tous les h2 reprennent ce titre après un.
  titre: `Lire à voix haute au CP (${ANNEE_SCOLAIRE})`,
  accroche:
    "Bien lire à voix haute, ce n'est pas ajouter le ton : c'est obéir à ce qui est déjà écrit.",
  identite: [],
  definition: {
    texte: [
      "Un texte écrit contient déjà les instructions pour le lire à voix haute.",
      "Le signe de la fin dit à ta voix ce qu'elle doit faire : le point la fait descendre, le point d'interrogation la fait monter, le point d'exclamation lui met de la force.",
      "Et les mots qui vont ensemble se lisent ensemble. On respire ENTRE les groupes, jamais au milieu d'un groupe : « Le petit chien / dort / sur le tapis. »",
    ].join("\n\n"),
  },
  figure: {
    schema: troisSignesTroisVoix,
  },
  proprietes: [
    {
      titre: "Le signe de la fin commande la voix",
      texte: "Un point : on s'arrête et on baisse la voix.",
      schema: lePointDescend,
      micros: ["cp_voix_ponctuation"],
    },
    {
      titre: "On respire entre les groupes",
      texte: "Jamais au milieu d'un groupe — et jamais sans respirer du tout.",
      schema: ouRespirer,
      micros: ["cp_voix_groupes_mots"],
    },
    {
      titre: "La voix change avec le personnage",
      texte: "Quand l'ogre parle, on ne lit pas comme quand c'est l'histoire qui parle.",
      schema: laVoixDeLOgre,
      micros: ["cp_voix_expressive"],
    },
    {
      titre: "Les deux repères de fin d'année",
      texte: "30 mots par minute sans préparer le texte, 50 quand on l'a préparé.",
      schema: trenteMotsParMinute,
      micros: ["cp_voix_30_mots"],
    },
  ],
  reel: {
    texte:
      "Lire à voix haute, c'est lire pour quelqu'un d'autre. Si ta voix ne s'arrête jamais, celui qui écoute ne sait plus où finissent les phrases.",
  },
  historique: { texte: "" },
  methode: [
    {
      titre: "Je regarde d'abord le signe de la fin",
      texte: "Il me dit ce que ma voix devra faire avant même que je commence.",
      schema: jeRegardeLaFin,
      micros: ["cp_voix_ponctuation"],
    },
    {
      titre: "Je repère les groupes avant de lire",
      texte: "Les mots qui vont ensemble, je les dis d'un seul souffle.",
      schema: jeLisParGroupes,
      micros: ["cp_voix_groupes_mots"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Où respirer",
      donnees: "« Le petit chien dort sur le tapis. »",
      question: "Où faut-il respirer ?",
      solution:
        "Le petit chien / dort / sur le tapis. Respirer après « Le petit » couperait le groupe en deux, et le sens avec.",
      schema: ouRespirer,
      micros: ["cp_voix_groupes_mots"],
    },
    {
      titre: "Quand l'ogre parle",
      donnees: "Dans l'histoire, l'ogre dit : « Qui a mangé mon gâteau ? »",
      question: "Comment lit-on cette phrase ?",
      solution:
        "Avec la voix de l'ogre — plus forte, plus grave — et en montant à la fin, à cause du point d'interrogation. Deux choses à la fois.",
      schema: laVoixDeLOgre,
      micros: ["cp_voix_expressive", "cp_voix_ponctuation"],
    },
  ],
  pieges: [
    "Respirer au milieu d'un groupe casse le sens, même si tous les mots sont justes.",
    "Lire sans jamais s'arrêter est aussi difficile à suivre que lire trop lentement.",
  ],
  aRetenir: [
    "Le signe de la fin dit à ma voix ce qu'elle doit faire.",
    "Le point descend, le point d'interrogation monte, le point d'exclamation appuie.",
    "Je respire entre les groupes de mots, jamais au milieu.",
    "Quand un personnage parle, ma voix change avec lui.",
    "En fin de CP : 30 mots par minute sans préparer, 50 après préparation.",
  ],
  /* ⭐ Dix exercices, neuf avec un support : entourer le signe, tracer les
     barres de respiration, relier. Les corrections s'impriment sur leur propre
     page. */
  entrainement: [
    {
      question: "Entoure le signe de la fin de chaque phrase.",
      correction: "Un point d'interrogation, un point d'exclamation, puis un point.",
      schema: exTroisPhrases,
      micros: ["cp_voix_ponctuation"],
    },
    {
      question: "Relie chaque signe à ce que fait la voix : elle monte, elle descend, elle appuie.",
      correction: ". → elle descend. ? → elle monte. ! → elle appuie.",
      schema: exSignes,
      micros: ["cp_voix_ponctuation"],
    },
    {
      question: "Lis cette phrase à voix haute. Que fait ta voix à la fin ?",
      correction: "Elle s'arrête et descend : la phrase finit par un point.",
      schema: exPhraseAPoint,
      micros: ["cp_voix_ponctuation"],
    },
    {
      question: "Trace deux barres pour montrer où tu respires.",
      correction: "Les enfants / jouent / dans la cour.",
      schema: exGroupes,
      micros: ["cp_voix_groupes_mots"],
    },
    {
      question: "Ce découpage est-il le bon ? Lis-le à voix haute pour vérifier.",
      correction: "Oui : Le bateau / glisse / sur le lagon. Chaque morceau se dit d'un souffle.",
      schema: exGroupesCoupes,
      micros: ["cp_voix_groupes_mots"],
    },
    {
      question: "Barre ce découpage s'il est faux, puis écris le bon.",
      correction: "Il est faux. Le bon : Le petit chien / dort / sur le tapis.",
      schema: exMauvaiseCoupe,
      micros: ["cp_voix_groupes_mots"],
    },
    {
      question: "C'est l'ogre qui parle. Comment lis-tu sa phrase ?",
      correction: "Avec sa voix — plus forte et plus grave — et en montant à la fin.",
      schema: exOgre,
      micros: ["cp_voix_expressive"],
    },
    {
      question: "Comment lit-on cette phrase : doucement, ou avec de la force ?",
      correction: "Avec de la force : le point d'exclamation le demande.",
      schema: exExclamation,
      micros: ["cp_voix_expressive", "cp_voix_ponctuation"],
    },
    {
      question: "Entoure le nombre de mots à atteindre en fin de CP, sans préparer le texte.",
      correction: "30 mots par minute. Avec préparation, l'objectif monte à 50.",
      schema: exFluence,
      micros: ["cp_voix_30_mots"],
    },
    {
      question: "Tu lis 22 mots en une minute, et l'objectif est 30. Que fais-tu ?",
      correction: "Je relis le même texte plusieurs fois : c'est la préparation qui fait gagner des mots, pas la vitesse forcée.",
      micros: ["cp_voix_30_mots"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cp",
};

export const slidesVoixHauteCp: ClasseSlide[] = [
  {
    titre: "Ce qu'on apprend",
    badge: "Lire à voix haute - CP",
    section: {
      type: "objectif",
      phrase: "Le texte dit déjà comment le lire",
      sousPhrase: "Le signe de la fin commande la voix.",
      encadre: {
        titre: "L'idée",
        texte: "Lire à voix haute, ce n'est pas ajouter le ton : c'est obéir.",
      },
    },
    schema: troisSignesTroisVoix,
  },
  {
    titre: "Trois signes, trois voix",
    badge: "Lire à voix haute - CP",
    section: {
      type: "cartes",
      cartes: [
        { titre: ".", texte: "la voix descend" },
        { titre: "?", texte: "la voix monte" },
        { titre: "!", texte: "la voix appuie" },
      ],
    },
    schema: troisSignesTroisVoix,
  },
  {
    titre: "Avant de lire",
    badge: "Lire à voix haute - CP",
    section: {
      type: "etapes",
      etapes: [
        "Je regarde le signe de la fin.",
        "Je repère les groupes de mots.",
        "Je respire entre les groupes, jamais au milieu.",
      ],
    },
    schema: jeLisParGroupes,
  },
  {
    titre: "À vous",
    badge: "Lire à voix haute - CP",
    section: {
      type: "exercice",
      enonce: "« Le petit chien dort sur le tapis. »",
      question: "Où faut-il respirer ?",
      indice: "On respire entre les groupes, jamais au milieu d'un groupe.",
      correction: "Le petit chien / dort / sur le tapis.",
    },
    schema: ouRespirer,
  },
];
