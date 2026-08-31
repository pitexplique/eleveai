// ─── Fiche de cours : lire avec fluidité (CM1) ────────────────────────────────
// PREMIÈRE FICHE DU CHANTIER CM1 — et ÉTALON DU GABARIT ALLÉGÉ.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année ».
//
// ⛔⛔ POURQUOI CETTE FICHE A ÉTÉ REFAITE LE 30/08/2026. Première version écrite
// le matin même sur le gabarit du CM2 et de la 6e, sans toucher à la densité.
// Frédéric : « je trouve que c'est très chargé et ça manque d'image fun », puis
// « faut vraiment refaire les fiches funs peu de mots et adapté à l'âge ».
// ⛔ ET LA MESURE L'ACCUSAIT ENCORE PLUS QUE LUI — mots de texte visible, même
// notion, trois classes : CM1 238, CM2 173, 6e 156. LA FICHE LA PLUS LOURDE DU
// SITE VISAIT LES PLUS JEUNES. La densité doit DÉCROITRE avec l'âge.
//
// ⭐ LE CALIBRAGE DU CM1, fixé ici et à reprendre pour les 24 fiches suivantes :
//   propriétés 10 → 6 · exemples 6 → 4 · méthode 4 → 3 · usages 4 → 3
//   pièges 7 → 5 · définition en phrases courtes, jamais un pavé
//   légendes de dessin : dix mots, pas quinze.
//
// ⭐ ET LA MONOTONIE COMPTE AUTANT QUE LA DENSITÉ. La première version alignait
// 27 dessins dont 26 identiques de forme : deux boites, une barrée, une en
// focus. Ici les repères 110/120/130 deviennent un GRAPHIQUE EN BÂTONS
// (`stat_graph`, déjà éprouvé en fiche dans `francais-4e-lecture-documents`) :
// trois barres qui montent se lisent d'un coup d'œil, un tableau non.
//
// ⛔⛔ CP, CE1, CE2 DEMANDERONT UN AUTRE FORMAT — décision de Frédéric le 30/08,
// non tranchée. Ne pas y rogner ce gabarit : il en faut un neuf.
//
// ⛔ SÉPARATION À TROIS COLONNES, obligatoire au CM1 où 21 notions sur 25 portent
// un nom déjà pris par le CM2 :
//
//   | | CM1 (ici) | CM2 | 6e |
//   |---|---|---|---|
//   | le repère | **110** | 120 | 130 |
//   | le fil | la vitesse est un **thermomètre** | la fluence **se prépare** | les **groupes de sens** |
//   | sa micro propre | ⭐ les **mots irréguliers** | les **liaisons** | — |
//
// ⭐⭐ LA DÉCOUVERTE : LA VITESSE EST UN THERMOMÈTRE, PAS UNE CONSIGNE. « Lis plus
// vite » fabrique une lecture rapide et vide. Ce qui la fabrique vraiment est
// dans une micro que personne d'autre n'a — `cm1_flue_mots_irreguliers` : UN MOT
// IRRÉGULIER NE SE DÉCHIFFRE PAS, IL SE RECONNAIT D'UN BLOC. Et ce sont les plus
// fréquents du français, donc ceux sur lesquels on bute le plus souvent.
//
// ⚠️ TROU COMBLÉ LE 30/08 AVANT D'ÉCRIRE : le pool FLUENCE_130 n'était atteint
// que par la 6e ; `cm1_flue_110_mots` tombait sur des questions de compréhension.
//
// Alignée sur les pools LECTURE et FLUENCE_130 de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `fluence_lecture`) :
// - cm1_flue_page             → propriété 1, usage 1, exemple 1
// - cm1_flue_ponctuation      → propriété 2, méthode 2, usage 2
// - cm1_flue_mots_irreguliers → figure, propriétés 3 et 4, formule, méthode 1,
//                               usage 3, exemples 2 et 3
// - cm1_flue_110_mots         → propriété 5, méthode 3, exemple 4
// - cm1_flue_defi             → propriété 6

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

/** ⭐ L'IMAGE DE LA FICHE : trois barres qui montent. Un tableau donnait les
 *  mêmes chiffres et ne montrait rien. */
function batons(opts: {
  data: { label: string; value: number; color?: string }[];
  legende?: string;
}) {
  return (
    <figure className="grid gap-2">
      <CanvasRenderer
        figure={{
          kind: "stat_graph",
          graphType: "batons",
          data: opts.data,
          display: { showValues: true, showLabels: true },
          size: { width: 200, height: 130 },
        }}
      />
      {opts.legende ? (
        <figcaption className="text-xs leading-snug text-slate-600">
          {opts.legende}
        </figcaption>
      ) : null}
    </figure>
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

const troisReperes = batons({
  data: [
    { label: "CM1", value: 110 },
    { label: "CM2", value: 120 },
    { label: "6e", value: 130 },
  ],
  legende: "Dix mots de plus chaque année. Ce n'est pas une course.",
});

const pasPlusVite = phrase({
  mots: [
    { texte: "lis plus vite", barre: true },
    { texte: "lis mieux", focus: true },
  ],
  legende: "Le nombre mesure. Il ne fait rien.",
});

const dechiffrerOuReconnaitre = phrase({
  mots: [
    { texte: "fem-me", barre: true },
    { texte: "femme", focus: true },
  ],
  legende: "Ce mot ne se découpe pas. Tu le reconnais d'un coup d'œil.",
});

const motsIrreguliers = phrase({
  mots: [{ texte: "monsieur" }, { texte: "femme" }, { texte: "oignon" }],
  legende: "Les mots les plus courants. Et les plus traitres.",
});

const parGroupes = phrase({
  mots: [
    { texte: "mot à mot", barre: true },
    { texte: "par groupes", focus: true },
  ],
  legende: "Un groupe se lit d'un seul souffle.",
});

const libererLaTete = phrase({
  mots: [{ texte: "déchiffrer" }, { texte: "comprendre", focus: true }],
  legende: "Quand lire devient facile, ta tête suit l'histoire.",
});

const relireLeMeme = phrase({
  mots: [
    { texte: "un texte neuf", barre: true },
    { texte: "le même", focus: true },
  ],
  liens: [{ de: 1, vers: 0, label: "trois fois", type: "question" }],
  legende: "À force de relire, les mots viennent tout seuls.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheFluenceLectureCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "fluence-lecture",
  titre: `Lire avec fluidité en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "On te dira peut-être « lis plus vite ». Ce conseil ne marche pas. Ce qui t'aide, c'est de reconnaitre les mots d'un coup d'œil. Et ça, ça s'apprend.",
  identite: [
    { label: "Mots clés", valeur: "Lire sans buter" },
    { label: "Le secret", valeur: "Lire vite ne s'apprend pas" },
    { label: "Outil", valeur: "Relis le même texte" },
  ],
  definition: {
    /* ⛔ RÉÉCRITE LE 30/08 EN REGISTRE ENFANT. La version d'avant faisait un
       pavé de cent mots, avec des capitales à chaque ligne. Frédéric :
       « illisible pour un enfant de CM1 », puis « il faut des retours à la
       ligne », puis « fais comme si tu étais un psychologue pour enfant ».
       ⭐⭐ ET LES CAPITALES ÉTAIENT LE PIRE : un mot en capitales perd sa
       silhouette — plus de hampes, plus de jambages. J'avais donc cassé la
       lecture globale DANS UNE FICHE QUI ENSEIGNE LA LECTURE GLOBALE.
       Sept phrases courtes, une par ligne, aucune capitale d'emphase, aucun mot
       d'adulte. Les `\n` sont rendus grâce à `whitespace-pre-line`, ajouté le
       même jour dans `FicheCoursClient`. */
    texte: [
      "Bien lire, ce n'est pas lire vite.",
      "C'est lire une page sans être fatigué.",
      "Le point te dit où respirer.",
      "Tu lis plusieurs mots d'un coup, pas un par un.",
      "Et certains mots ne se découpent pas. « Femme » ne fait pas « fem-me ». Tu le reconnais, comme une photo.",
      "Ce sont les mots les plus courants. C'est pour ça qu'ils t'embêtent souvent.",
    ].join("\n\n"),
  },
  /* ⛔ PAS DE `legende` ICI — règle du 31/08/2026, « jamais 120 mots en police
     10 ». Le dessin porte déjà sa propre légende, courte, dans le canvas ; celle
     du bloc `figure` s'affichait en tout petit sous la figure ET servait de
     sous-titre à la diapo de définition en mode classe, où elle débordait. */
  figure: {
    schema: pile(troisReperes, pasPlusVite),
  },
  proprietes: [
    {
      titre: "Une page entière",
      texte: "Pas trois lignes. Et sans être fatigué à la fin.",
      schema: libererLaTete,
      micros: ["cm1_flue_page"],
    },
    {
      titre: "On lit par groupes",
      texte: "Mot à mot, la phrase est hachée. On ne comprend plus rien.",
      schema: parGroupes,
      micros: ["cm1_flue_ponctuation"],
    },
    {
      titre: "Un mot irrégulier ne se déchiffre pas",
      texte: "« Femme » donne « fem-me ». « Monsieur » donne « mon-si-eur ». Ça ne marche pas.",
      schema: dechiffrerOuReconnaitre,
      micros: ["cm1_flue_mots_irreguliers"],
    },
    {
      titre: "Et ce sont les plus fréquents",
      texte: "Voilà le piège : ils reviennent tout le temps.",
      schema: motsIrreguliers,
      micros: ["cm1_flue_mots_irreguliers"],
    },
    {
      titre: "Le nombre sert à comprendre",
      texte: "Lire vite sans comprendre, ça ne sert à rien.",
      schema: troisReperes,
      micros: ["cm1_flue_110_mots"],
    },
    {
      titre: "On progresse en relisant",
      texte: "Lis trois fois le même texte. C'est ça qui marche.",
      schema: relireLeMeme,
      micros: ["cm1_flue_defi"],
    },
  ],
  reel: {
    texte:
      // ⚠️ 232 signes — plafond de 250 pour un texte projeté (mesuré le 30/08 :
      // au-delà, la diapo du mode classe déborde de l'écran).
      "Ta première fois à vélo, tu pensais aux pédales, au guidon, à l'équilibre. Tu ne voyais même pas la route. Aujourd'hui tu pédales sans y penser. La lecture, c'est pareil : ça viendra. Et personne n'apprend le vélo en pédalant plus vite.",
  },
  historique: {
    texte:
      // ⚠️ 228 signes — même plafond de 250.
      "Si certains mots s'écrivent bizarrement, ce n'est pas pour t'embêter. Il y a très longtemps, des savants ont ajouté des lettres exprès : un « g » dans « doigt », un « d » dans « poids ». Quand un mot te parait bizarre, tu as raison.",
  },
  methode: [
    {
      titre: "Note les mots qui te font buter",
      texte: "Cinq suffisent. Regarde-les un peu chaque jour, jusqu'à les reconnaitre.",
      schema: motsIrreguliers,
      micros: ["cm1_flue_mots_irreguliers"],
    },
    {
      titre: "Repère les points avant de lire",
      texte: "Tu sais alors où respirer. Tu arrives au bout sans être fatigué.",
      schema: parGroupes,
      micros: ["cm1_flue_ponctuation"],
    },
    {
      titre: "Relis trois fois, chronomètre après",
      texte: "Dans cet ordre, jamais l'inverse. Le chronomètre regarde tes progrès. Il ne les fait pas.",
      schema: pasPlusVite,
      micros: ["cm1_flue_110_mots"],
    },
  ],
  /* ⛔ VIDÉ LE 30/08 — voir l'entête. Au CM1 ce bloc redisait la méthode,
     et douze blocs font une page de trente mille pixels. Le rendu saute un
     tableau vide. */
  usages: [],
  exemples: [
    {
      titre: "Essoufflé à la fin d'une page",
      donnees: "Tu arrives au bout de la page à bout de souffle.",
      schema: libererLaTete,
      question: "Qu'est-ce que ça montre ?",
      solution:
        "Que lire te demande encore des efforts. Ce n'est pas ton souffle : c'est ta tête qui travaille sur les lettres. C'est normal.",
      micros: ["cm1_flue_page"],
    },
    {
      titre: "Déchiffrer « monsieur »",
      donnees: "Tu essaies de le découper : mon-si-eur.",
      schema: dechiffrerOuReconnaitre,
      question: "Ça marche ?",
      solution:
        "Non, et ce n'est pas toi le problème. Ce mot ne se découpe pas : on le reconnait d'un coup d'œil, comme une image.",
      micros: ["cm1_flue_mots_irreguliers"],
    },
    {
      titre: "Toujours les mêmes mots",
      donnees: "Tu butes sur les cinq mêmes mots à chaque lecture.",
      schema: motsIrreguliers,
      question: "Pourquoi eux ?",
      solution:
        "Parce que ce sont justement les plus courants. Ils reviennent presque à chaque ligne. Tout le monde bute dessus.",
      micros: ["cm1_flue_mots_irreguliers"],
    },
    {
      titre: "À quoi sert le nombre",
      donnees: "« Pourquoi viser un nombre de mots par minute ? »",
      schema: troisReperes,
      question: "Pourquoi ?",
      solution:
        "Parce que si lire devient facile, ta tête est libre pour l'histoire. Ce n'est pas une course. Comprendre, c'est ça qui compte.",
      micros: ["cm1_flue_110_mots"],
    },
  ],
  pieges: [
    "Se forcer à lire vite : tu ne retiens rien.",
    "Découper « femme » : ça ne donnera jamais « fem-me ».",
    "Lire mot à mot : la phrase est coupée en morceaux.",
    "Sauter les points : ce sont eux qui disent où respirer.",
    "Changer de texte à chaque fois : on progresse en relisant.",
  ],
  aRetenir: [
    "110 mots par minute, ça mesure. Ça n'apprend rien.",
    "Certains mots ne se découpent pas : on les reconnait.",
    "Et ce sont les plus courants : tout le monde bute dessus.",
    "On lit plusieurs mots d'un coup. On respire aux points.",
    "On progresse en relisant le même texte.",
  ],
  entrainement: [
    {
      question: "Quel repère de fluence la classe de CM1 vise-t-elle ?",
      correction: "Environ 110 mots par minute.",
      micros: ["cm1_flue_110_mots"],
    },
    {
      question: "Pourquoi viser un nombre de mots par minute ?",
      correction: "Parce qu'une lecture fluide libère la tête pour comprendre.",
      micros: ["cm1_flue_110_mots"],
    },
    {
      question: "Lire vite sans comprendre, c'est…",
      correction: "Manquer le but.",
      micros: ["cm1_flue_110_mots"],
    },
    {
      question: "Comment progresse-t-on en fluence ?",
      correction: "En relisant plusieurs fois le même texte.",
      micros: ["cm1_flue_defi"],
    },
    {
      question: "Peux-tu déchiffrer « monsieur » ?",
      correction: "Non : il se reconnait d'un bloc.",
      micros: ["cm1_flue_mots_irreguliers"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesFluenceLectureCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Lire avec fluidité - CM1",
    section: {
      type: "objectif",
      phrase: "La vitesse est un thermomètre",
      sousPhrase: "110 mots par minute mesurent ta lecture. Ils ne la fabriquent pas.",
      encadre: {
        titre: "⛔ Le mauvais conseil",
        texte: "« Lis plus vite. »",
      },
    },
  },
  {
    titre: "Dix mots de plus par an",
    badge: "Lire avec fluidité - CM1",
    section: {
      type: "etapes",
      etapes: [
        "CM1 : 110 mots par minute.",
        "CM2 : 120. Sixième : 130.",
        "Ce n'est pas une course.",
      ],
    },
    schema: troisReperes,
  },
  {
    titre: "Les mots qui piègent",
    badge: "Lire avec fluidité - CM1",
    section: {
      type: "duo",
      gauche: {
        titre: "Ça ne marche pas",
        contenu: "« fem-me », « mon-si-eur ».",
      },
      droite: {
        titre: "Ça marche",
        contenu: "Les reconnaitre d'un coup d'œil, comme une image.",
      },
    },
    schema: dechiffrerOuReconnaitre,
  },
  {
    titre: "Comme le vélo",
    badge: "Lire avec fluidité - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Au début", texte: "Tu penses aux pédales. Tu ne vois pas la route." },
        { titre: "Après", texte: "Tu pédales sans y penser. Tu regardes où tu vas." },
        { titre: "En lecture", texte: "Tant que tu déchiffres, il ne reste rien pour l'histoire." },
      ],
    },
    schema: libererLaTete,
  },
  {
    titre: "À vous",
    badge: "Lire avec fluidité - CM1",
    section: {
      type: "exercice",
      enonce: "Tu veux lire plus couramment.",
      question: "Trois textes une fois, ou un texte trois fois ?",
      indice: "Ce n'est pas la nouveauté qui aide.",
      correction:
        "Un texte trois fois. À la deuxième, tu ne butes plus. À la troisième, tu y mets le ton.",
    },
    schema: relireLeMeme,
  },
];
