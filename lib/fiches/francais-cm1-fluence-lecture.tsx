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
  legende: "Dix mots de plus par an. Ce n'est pas une course.",
});

const pasPlusVite = phrase({
  mots: [
    { texte: "lis plus vite", barre: true },
    { texte: "lis mieux", focus: true },
  ],
  legende: "Le nombre mesure. Il ne fabrique rien.",
});

const dechiffrerOuReconnaitre = phrase({
  mots: [
    { texte: "fem-me", barre: true },
    { texte: "femme", focus: true },
  ],
  legende: "Ce mot ne se découpe pas. Il se reconnait d'un coup d'œil.",
});

const motsIrreguliers = phrase({
  mots: [{ texte: "monsieur" }, { texte: "femme" }, { texte: "oignon" }],
  legende: "Les plus fréquents du français. Et les plus traitres.",
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
  legende: "Quand lire devient facile, la tête est libre pour l'histoire.",
});

const relireLeMeme = phrase({
  mots: [
    { texte: "un texte neuf", barre: true },
    { texte: "le même", focus: true },
  ],
  liens: [{ de: 1, vers: 0, label: "trois fois", type: "question" }],
  legende: "C'est la relecture qui rend les mots automatiques.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheFluenceLectureCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "fluence-lecture",
  titre: "Lire avec fluidité en CM1 (2026-2027)",
  accroche:
    "« Lis plus vite » est le plus mauvais conseil du monde. Les 110 mots par minute MESURENT ta lecture — ils ne la fabriquent pas. Ce qui la fabrique : reconnaitre les mots d'un coup d'œil, au lieu de les déchiffrer.",
  identite: [
    { label: "Mots clés", valeur: "Fluidité, mots irréguliers" },
    { label: "Le secret", valeur: "La vitesse est un thermomètre" },
    { label: "Outil", valeur: "Relis le même texte" },
  ],
  definition: {
    texte:
      "Lire avec fluidité, c'est lire une PAGE sans effort : sans buter, sans s'essouffler. Trois choses aident. LA PONCTUATION : le point dit où respirer. LES GROUPES : on lit plusieurs mots d'un souffle, pas mot à mot. ET SURTOUT LES MOTS IRRÉGULIERS. « Femme » ne se déchiffre pas : découpé, cela donne « fem-me ». Il faut le reconnaitre d'un bloc, comme une image. Le piège ? Ce sont les mots les plus fréquents du français. Le repère est 110 mots par minute — et il sert à une seule chose : quand lire devient facile, la tête est libre pour comprendre.",
  },
  figure: {
    schema: pile(troisReperes, pasPlusVite),
    legende:
      "Un thermomètre dit qu'on a de la fièvre. Le casser ne guérit personne. Les 110 mots par minute, c'est pareil : ils mesurent où tu en es.",
  },
  proprietes: [
    {
      titre: "Une page entière",
      texte: "Pas trois lignes. Et sans être essoufflé à la fin.",
      schema: libererLaTete,
      micros: ["cm1_flue_page"],
    },
    {
      titre: "On lit par groupes",
      texte: "Mot à mot, la phrase est hachée — et on ne la comprend plus.",
      schema: parGroupes,
      micros: ["cm1_flue_ponctuation"],
    },
    {
      titre: "Un mot irrégulier ne se déchiffre pas",
      texte: "« Femme » découpé donne « fem-me ». « Monsieur » donne « mon-si-eur ».",
      schema: dechiffrerOuReconnaitre,
      micros: ["cm1_flue_mots_irreguliers"],
    },
    {
      titre: "Et ce sont les plus fréquents",
      texte: "Voilà le piège : ils reviennent toutes les deux lignes.",
      schema: motsIrreguliers,
      micros: ["cm1_flue_mots_irreguliers"],
    },
    {
      titre: "Le nombre sert à comprendre",
      texte: "Lire vite sans comprendre, c'est manquer le but.",
      schema: troisReperes,
      micros: ["cm1_flue_110_mots"],
    },
    {
      titre: "On progresse en relisant",
      texte: "Trois lectures du même texte valent mieux que trois textes.",
      schema: relireLeMeme,
      micros: ["cm1_flue_defi"],
    },
  ],
  reel: {
    texte:
      "La première fois à vélo, tu pensais aux pédales, au guidon, à l'équilibre — et tu ne voyais pas la route. Aujourd'hui tu pédales sans y penser, alors tu regardes où tu vas. La lecture fait le même chemin. Et personne n'a appris le vélo en pédalant plus vite.",
  },
  historique: {
    texte:
      "Certains mots sont devenus irréguliers EXPRÈS. Au XVIe siècle, des savants ont ajouté un « g » à « doit » pour rappeler le latin DIGITUM : on écrit DOIGT depuis. Ils ont aussi ajouté un « d » à « pois »… en se trompant sur son origine. On écrit POIDS à cause d'une erreur vieille de cinq siècles.",
  },
  formule: {
    contexte: "Ce qui marche vraiment, et ça surprend.",
    expression: "relis le même texte",
    legende:
      "À la deuxième lecture, tu ne butes plus. À la troisième, tu peux y mettre le ton. Changer de texte, c'est recommencer à déchiffrer.",
    schema: relireLeMeme,
  },
  methode: [
    {
      titre: "Note les mots qui te font buter",
      texte: "Cinq suffisent. Regarde-les chaque jour jusqu'à les reconnaitre.",
      schema: motsIrreguliers,
      micros: ["cm1_flue_mots_irreguliers"],
    },
    {
      titre: "Repère les points avant de lire",
      texte: "Tu sais alors où respirer, et tu ne t'essouffles plus.",
      schema: parGroupes,
      micros: ["cm1_flue_ponctuation"],
    },
    {
      titre: "Relis trois fois, chronomètre après",
      texte: "Dans cet ordre. Le chronomètre constate le progrès, il ne le fait pas.",
      schema: pasPlusVite,
      micros: ["cm1_flue_110_mots"],
    },
  ],
  usages: [
    {
      titre: "Lire un livre sans abandonner",
      detail: "Beaucoup d'abandons viennent de la fatigue, pas de l'histoire.",
      schema: libererLaTete,
      micros: ["cm1_flue_page"],
    },
    {
      titre: "Lire à voix haute devant la classe",
      detail: "La ponctuation donne les respirations : sans elles, on ne te suit pas.",
      schema: parGroupes,
      micros: ["cm1_flue_ponctuation"],
    },
    {
      titre: "Ne plus trébucher sur les mêmes mots",
      detail: "Les irréguliers reviennent sans arrêt. Les reconnaitre fait gagner partout.",
      schema: dechiffrerOuReconnaitre,
      micros: ["cm1_flue_mots_irreguliers"],
    },
  ],
  exemples: [
    {
      titre: "Essoufflé à la fin d'une page",
      donnees: "Tu arrives au bout de la page à bout de souffle.",
      schema: libererLaTete,
      question: "Qu'est-ce que ça montre ?",
      solution:
        "QUE DÉCHIFFRER TE COUTE ENCORE. Ce n'est pas une question de souffle : c'est ta tête qui travaille trop sur les lettres.",
      micros: ["cm1_flue_page"],
    },
    {
      titre: "Déchiffrer « monsieur »",
      donnees: "Tu essaies de le découper : mon-si-eur.",
      schema: dechiffrerOuReconnaitre,
      question: "Ça marche ?",
      solution:
        "NON. Ce mot ne se découpe pas — il se RECONNAIT, d'un coup d'œil, comme une image. Pareil pour « femme », « oignon », « temps ».",
      micros: ["cm1_flue_mots_irreguliers"],
    },
    {
      titre: "Toujours les mêmes mots",
      donnees: "Tu butes sur les cinq mêmes mots à chaque lecture.",
      schema: motsIrreguliers,
      question: "Pourquoi eux ?",
      solution:
        "PARCE QUE LES MOTS IRRÉGULIERS SONT LES PLUS FRÉQUENTS. Ce ne sont pas des mots rares : ils reviennent toutes les deux lignes.",
      micros: ["cm1_flue_mots_irreguliers"],
    },
    {
      titre: "À quoi sert le nombre",
      donnees: "« Pourquoi viser un nombre de mots par minute ? »",
      schema: troisReperes,
      question: "Pourquoi ?",
      solution:
        "PARCE QU'UNE LECTURE FLUIDE LIBÈRE LA TÊTE POUR COMPRENDRE. Ni course, ni classement : la vitesse est un moyen, comprendre est le but.",
      micros: ["cm1_flue_110_mots"],
    },
  ],
  pieges: [
    "Se forcer à lire vite : ça donne une lecture rapide et vide.",
    "Déchiffrer un mot irrégulier : « femme » ne donnera jamais « fem-me ».",
    "Lire mot à mot : la phrase est hachée.",
    "Sauter la ponctuation : c'est elle qui dit où respirer.",
    "Changer de texte à chaque fois : c'est la relecture qui automatise.",
  ],
  aRetenir: [
    "110 mots par minute, c'est un thermomètre. Pas une consigne.",
    "Un mot irrégulier se reconnait d'un bloc, il ne se déchiffre pas.",
    "Et ce sont les plus fréquents du français.",
    "On lit par groupes, en respectant les points.",
    "On progresse en relisant le MÊME texte.",
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
        "UN TEXTE TROIS FOIS. À la deuxième, tu ne butes plus. À la troisième, tu y mets le ton.",
    },
    schema: relireLeMeme,
  },
];
