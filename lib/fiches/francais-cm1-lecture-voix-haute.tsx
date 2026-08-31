// ─── Fiche de cours : lire à voix haute (CM1) ─────────────────────────────────
// DEUXIÈME FICHE DU CHANTIER CM1 — refaite le 31/08/2026 au gabarit de l'étalon.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année ».
//
// ⛔⛔ POURQUOI CETTE FICHE A ÉTÉ REFAITE. Écrite le 30/08 au matin sur l'ancien
// gabarit, elle mesurait : dix propriétés, quatre méthodes, six exemples, sept
// pièges, une formule, quatre usages, SOIXANTE-HUIT capitales d'emphase et six
// textes de plus de 250 signes. Frédéric, le 31/08 : « on utilise le même étalon
// que pour cm1 et cm2 et 6e », « il faut privilégier la qualité pas la vitesse ».
//
// ⭐ L'ÉTALON, fixé sur `francais-cm1-fluence-lecture` :
//   propriétés 6 · méthode 3 · exemples 4 · pièges 5 · à retenir 5
//   entrainement 5 · usages vidés · aucune formule
//   AUCUNE capitale d'emphase · tout texte projeté sous 250 signes
//   définition en phrases courtes, une par ligne
//
// ⭐⭐ ET LA RAISON PROFONDE DE L'ÉTALON EST LE MODE CLASSE, pas la page :
// `slidesDepuisFiche` fabrique le diaporama DEPUIS la fiche. Dix propriétés et
// six exemples donnent trente diapos dont plusieurs débordent de l'écran. Le
// gabarit n'est donc pas une préférence de mise en page — c'est ce qui rend la
// fiche projetable, et « projetable en classe » est le principe fondateur.
//
// ⭐ LES CAPITALES SONT LE PIRE DÉFAUT, et il était partout ici : un mot en
// capitales perd sa silhouette — plus de hampes, plus de jambages, plus rien à
// reconnaitre d'un coup d'œil. Dans une fiche qui enseigne à lire à voix haute,
// c'est exactement le geste qu'on demande à l'élève et qu'on lui rend impossible.
//
// ⛔ SÉPARATION À TROIS COLONNES, obligatoire au CM1 où 21 notions sur 25 portent
// un nom déjà pris par le CM2 :
//
//   | | CM1 (ici) | CM2 | 6e |
//   |---|---|---|---|
//   | les micros | rythme RÉGULIER, VOLUME et DÉBIT | articulation, effets, PLAISIR | préparer, émotions, DIALOGUE |
//   | le fil | ⭐ TROIS BOUTONS indépendants | on lit POUR QUELQU'UN, et il juge | le TON est ÉCRIT dans le texte |
//
// ⛔ NE PAS REPRENDRE : « on ne lit pas pour prouver qu'on sait lire, on lit pour
// quelqu'un » est l'accroche du CM2 ; « le ton est écrit dans le texte » celle de
// la 6e. Leurs blocs d'histoire aussi — le lector des ateliers de cigares (CM2)
// et l'écriture sans espaces (6e).
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE VIENT D'UN MICRO QUI NOMME DEUX CHOSES ET NON UNE —
// `cm1_voix_intensite`, « régler le VOLUME ET LE DÉBIT » : ce sont deux boutons
// différents, et tout le monde les confond. Quand on ne nous comprend pas, le
// réflexe est de parler plus fort, alors que le problème est presque toujours
// qu'on parle trop vite. Et `cm1_voix_rythme` en isole un troisième : la
// RÉGULARITÉ, « pour que l'auditoire suive ».
//
// ⭐ D'où la raison qui explique tout : le lecteur est le seul de la salle à
// connaitre déjà la phrase. Il ne lit pas, il redit ce que ses yeux viennent de
// prendre — les autres découvrent.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur le pool MISE_EN_VOIX de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `lecture_voix_haute`) :
// - cm1_flue_expressive → propriété 1, méthode 1, exemple 1
// - cm1_voix_rythme     → propriétés 2 et 3, méthode 2, exemples 2 et 3
// - cm1_voix_intensite  → figure, propriétés 4 et 5, méthode 3, exemple 4
// - cm1_voix_defi       → propriété 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { PhraseCanvasMot } from "@/lib/tutor-v4/types";

function phrase(opts: { mots: (string | PhraseCanvasMot)[]; legende?: string }) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        legende: opts.legende,
        largeurMax: 190,
      }}
    />
  );
}

/** Les trois boutons. ⚠️ Cellules courtes : à la largeur d'un bloc, vingt signes
 *  tombent sous le plancher de 11 px. */
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

const troisBoutons = grille({
  headers: ["Le bouton", "Il sert à"],
  rows: [
    { values: ["le volume", "être entendu"] },
    { values: ["le débit", "être compris"] },
    { values: ["le rythme", "être suivi"] },
  ],
  caption: "Trois réglages différents. On confond souvent les deux premiers.",
});

const pasLeBonBouton = phrase({
  mots: [
    { texte: "plus fort", barre: true },
    { texte: "moins vite", focus: true },
  ],
  legende: "Quand on ne te comprend pas, ce n'est presque jamais le volume.",
});

const toiEtEux = phrase({
  mots: [{ texte: "toi" }, { texte: "eux" }],
  legende: "Tu connais déjà la phrase. Eux la découvrent en même temps.",
});

const rythmeRegulier = phrase({
  mots: [
    { texte: "ça accélère", barre: true },
    { texte: "toujours pareil", focus: true },
  ],
  legende: "Une lecture qui accélère puis ralentit fatigue ceux qui écoutent.",
});

const dernierRang = phrase({
  mots: [
    { texte: "le premier rang", barre: true },
    { texte: "le dernier", focus: true },
  ],
  legende: "Parle pour celui qui est le plus loin. Les autres entendront.",
});

const lireAvant = phrase({
  mots: [
    { texte: "découvrir devant", barre: true },
    { texte: "l'avoir déjà lu", focus: true },
  ],
  legende: "On repère les mots difficiles en silence, avant de passer.",
});

const crierOuPorter = phrase({
  mots: [
    { texte: "crier", barre: true },
    { texte: "poser sa voix", focus: true },
  ],
  legende: "Crier fatigue en trois minutes et déforme les mots.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheLectureVoixHauteCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "lecture-voix-haute",
  titre: `Lire à voix haute en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Quand on ne te comprend pas, tu parles plus fort. C'est normal, tout le monde fait ça — et c'est presque toujours le mauvais bouton. Le problème n'est pas qu'on ne t'entend pas : c'est que tu vas trop vite.",
  identite: [
    { label: "Mots clés", valeur: "Voix, rythme, débit" },
    { label: "Le secret", valeur: "Plus fort n'est pas plus clair" },
    { label: "Outil", valeur: "Le dernier rang t'entend-il ?" },
  ],
  definition: {
    /* ⭐ Registre enfant, une phrase par ligne. Les `\n\n` sont rendus grâce à
       `whitespace-pre-line`, posé dans `FicheCoursClient` le 30/08. */
    texte: [
      "Lire à voix haute, c'est régler trois choses.",
      "Le volume : assez fort pour le dernier rang, pas pour le premier.",
      "Le débit : assez lent pour qu'on te suive.",
      "Le rythme : toujours pareil, sans accélérer ni ralentir.",
      "Et si tu vas trop vite, voilà pourquoi : tu es le seul de la salle à connaitre déjà la phrase. Les autres la découvrent.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(troisBoutons, pasLeBonBouton),
    legende:
      "Trois problèmes différents, donc trois réglages différents. Être entendu n'est pas être compris, et être compris n'est pas être suivi. Voilà pourquoi on se trompe si souvent de bouton : on entend « je n'ai pas compris » et on monte le son, alors que la personne entendait très bien.",
  },
  proprietes: [
    {
      titre: "On lit le texte en silence avant",
      texte: "Tu repères les mots difficiles. Ils ne te surprendront plus devant la classe.",
      schema: lireAvant,
      micros: ["cm1_flue_expressive"],
    },
    {
      titre: "Le rythme reste le même",
      texte: "Ni vite ni lent : régulier. Sinon ceux qui écoutent n'arrivent pas à se caler.",
      schema: rythmeRegulier,
      micros: ["cm1_voix_rythme"],
    },
    {
      titre: "Tu connais déjà la phrase",
      texte: "Tes yeux l'ont lue avant ta bouche. C'est pour ça que tu vas trop vite.",
      schema: toiEtEux,
      micros: ["cm1_voix_rythme"],
    },
    {
      titre: "Le volume se règle sur le dernier rang",
      texte: "Choisis quelqu'un au fond et parle pour lui. Tout le monde entendra.",
      schema: dernierRang,
      micros: ["cm1_voix_intensite"],
    },
    {
      titre: "Une voix qui porte ne crie pas",
      texte: "Crier fatigue vite et abime les mots. On t'entend plus fort et on te comprend moins.",
      schema: crierOuPorter,
      micros: ["cm1_voix_intensite"],
    },
    {
      titre: "Le défi : les trois en même temps",
      texte: "Chacun est facile tout seul. C'est ensemble, sur une page entière, que ça devient un exercice.",
      schema: troisBoutons,
      micros: ["cm1_voix_defi"],
    },
  ],
  reel: {
    texte:
      "Tu as déjà vu quelqu'un parler à une personne qui entend mal. Il ne se fait pas comprendre, alors il crie. Ça ne marche presque jamais. Ce qui marche, c'est de ralentir — et souvent l'autre répond du premier coup, sans qu'on ait élevé la voix.",
  },
  historique: {
    texte:
      "Avant les micros, les acteurs devaient se faire entendre de milliers de gens en plein air. Ils n'ont pas appris à crier : on a construit des théâtres qui portent la voix. À Épidaure, on entend du dernier rang une voix qui ne force pas.",
  },
  methode: [
    {
      titre: "Lis le texte en silence, une fois",
      texte: "Ça suffit pour repérer ce qui va te faire buter.",
      schema: lireAvant,
      micros: ["cm1_flue_expressive"],
    },
    {
      titre: "Choisis une allure et garde-la",
      texte: "L'auditoire se cale dessus sans y penser. S'il ne peut pas, il décroche.",
      schema: rythmeRegulier,
      micros: ["cm1_voix_rythme"],
    },
    {
      titre: "Écoute ce qu'on te dit exactement",
      texte: "« On ne t'entend pas » : monte le volume. « On ne comprend pas » : ralentis.",
      schema: pasLeBonBouton,
      micros: ["cm1_voix_intensite"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Préparer sa lecture",
      donnees: "Tu dois lire un texte devant la classe tout à l'heure.",
      schema: lireAvant,
      question: "Que fais-tu avant ?",
      solution:
        "Tu le lis en silence, une fois, pour repérer les mots difficiles. Ils ne te surprendront plus, et tu auras de la place pour le ton.",
      micros: ["cm1_flue_expressive"],
    },
    {
      titre: "On décroche",
      donnees: "Tu lis fort et sans faute, et pourtant on ne te suit plus.",
      schema: rythmeRegulier,
      question: "Quel bouton n'est pas réglé ?",
      solution:
        "Le rythme. Si ta lecture accélère puis ralentit, personne ne peut se caler dessus. C'est plus fatigant qu'une lecture rapide mais régulière.",
      micros: ["cm1_voix_rythme"],
    },
    {
      titre: "Le mauvais bouton",
      donnees: "On te dit : « on ne comprend rien ». Tu montes la voix.",
      schema: pasLeBonBouton,
      question: "Est-ce le bon réglage ?",
      solution:
        "Non. On te dit qu'on ne comprend pas, pas qu'on n'entend pas. Il faut ralentir. Monter le son rend la même chose incompréhensible, mais plus fort.",
      micros: ["cm1_voix_intensite"],
    },
    {
      titre: "Régler sa voix",
      donnees: "Tu ne sais pas si tu parles assez fort.",
      schema: dernierRang,
      question: "Sur qui te règles-tu ?",
      solution:
        "Sur le dernier rang. Choisis quelqu'un au fond et parle pour lui : s'il entend, tout le monde entend, et tu peux arrêter de monter.",
      micros: ["cm1_voix_intensite"],
    },
  ],
  pieges: [
    "Monter le volume quand on te dit qu'on ne comprend pas.",
    "Crier au lieu de poser sa voix : ça fatigue et ça abime les mots.",
    "Se régler sur le premier rang : la moitié de la classe n'entend pas.",
    "Lire à la vitesse où tu comprends : les autres découvrent la phrase.",
    "Découvrir le texte devant la classe : tu butes alors en public.",
  ],
  aRetenir: [
    "Trois boutons : le volume, le débit, le rythme.",
    "Plus fort ne veut pas dire plus clair.",
    "Le volume se règle sur le dernier rang.",
    "Tu connais déjà la phrase : lis plus lentement que tu ne la comprends.",
    "On lit le texte en silence avant de le dire.",
  ],
  entrainement: [
    {
      question: "Avant de lire un texte devant la classe, que fais-tu ?",
      correction: "Tu le lis en silence pour repérer les mots difficiles.",
      micros: ["cm1_flue_expressive"],
    },
    {
      question: "Pourquoi le rythme doit-il rester le même ?",
      correction: "Pour que ceux qui écoutent puissent se caler dessus.",
      micros: ["cm1_voix_rythme"],
    },
    {
      question: "On te dit « on ne comprend rien ». Que règles-tu ?",
      correction: "Le débit : tu ralentis. Pas le volume.",
      micros: ["cm1_voix_intensite"],
    },
    {
      question: "Sur qui règles-tu ton volume ?",
      correction: "Sur le dernier rang.",
      micros: ["cm1_voix_intensite"],
    },
    {
      question: "Pourquoi lis-tu presque toujours trop vite ?",
      correction: "Parce que tu es le seul à connaitre déjà la phrase.",
      micros: ["cm1_voix_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesLectureVoixHauteCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Lire à voix haute - CM1",
    section: {
      type: "objectif",
      phrase: "Plus fort n'est pas plus clair",
      sousPhrase: "Le volume et le débit sont deux boutons différents.",
      encadre: { titre: "L'idée", texte: "On peut t'entendre parfaitement et ne rien suivre." },
    },
  },
  {
    titre: "Trois boutons",
    badge: "Lire à voix haute - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le volume", texte: "Pour être entendu. Se règle sur le dernier rang." },
        { titre: "Le débit", texte: "Pour être compris. Se baisse quand on décroche." },
        { titre: "Le rythme", texte: "Pour être suivi. Toujours pareil." },
      ],
    },
    schema: troisBoutons,
  },
  {
    titre: "Pourquoi tu vas trop vite",
    badge: "Lire à voix haute - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Tes yeux lisent la phrase avant ta bouche.",
        "Tu ne la découvres pas : tu la redis.",
        "Les autres, eux, l'entendent pour la première fois.",
      ],
    },
    schema: toiEtEux,
  },
  {
    titre: "À vous",
    badge: "Lire à voix haute - CM1",
    section: {
      type: "exercice",
      enonce: "On te dit : « on ne comprend rien ». Tu montes la voix.",
      question: "Est-ce le bon réglage ?",
      indice: "Relis exactement ce qu'on t'a dit.",
      correction:
        "Non. On te dit qu'on ne comprend pas, pas qu'on n'entend pas. Il faut ralentir.",
    },
    schema: pasLeBonBouton,
  },
];
