// lib/tutor-v4/questionBank/ce1/maths/droites-segments.bank.ts
//
// Les droites, les segments et les alignements du CE1, écrits à la main.
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2) :
//   — le lexique « point, droite, segment, milieu d'un segment » est introduit
//     EN SITUATION, sans définition formelle ;
//   — utiliser la règle pour REPÉRER et VÉRIFIER des alignements. Le texte est
//     précis : l'élève sait dire que des points ne sont pas alignés sans
//     utiliser la règle quand il n'y a aucun doute, et se sert de la règle
//     quand la réponse n'est pas évidente ;
//   — utiliser la règle graduée comme instrument de tracé ;
//   — trouver le MILIEU d'un segment, PAR PLIAGE.
//
// LE PIÈGE DE LA NOTION : croire qu'un segment et une droite sont la même
// chose. Le segment s'arrête à ses deux extrémités, la droite continue des
// deux côtés — on ne peut jamais la dessiner en entier.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const droitesSegmentsBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_DROITE_SEGMENT_RECONNAITRE — droite, segment, alignement
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_droite_reconnaitre_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_segment_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la différence entre un segment et une droite ?",
    format: "qcm",
    choices: [
      "le segment s'arrête à ses deux bouts, la droite continue",
      "le segment est toujours horizontal",
      "la droite est plus courte",
      "il n'y a aucune différence",
    ],
    expected: ["le segment s'arrête à ses deux bouts, la droite continue"],
    comparator: "mcq_exact",
    hint: "Peut-on dessiner une droite en entier sur une feuille ?",
    explanation: exp(
      "Un segment est un morceau de droite limité par deux points ; une droite, elle, n'a pas de bout.",
      "On regarde si le trait s'arrête ou s'il pourrait continuer.",
      "Un segment a deux extrémités qu'on peut montrer du doigt. Une droite continue des deux côtés : sur la feuille, on n'en voit jamais qu'un morceau.",
      "Le segment s'arrête à ses deux bouts, la droite continue.",
    ),
    tags: ["ce1", "droites_segments", "reconnaitre", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_droite_reconnaitre_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_segment_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Que veut dire « trois points sont alignés » ?",
    format: "qcm",
    choices: [
      "on peut faire passer une seule droite par les trois",
      "les trois points sont très proches",
      "les trois points sont de la même couleur",
      "les trois points forment un triangle",
    ],
    expected: ["on peut faire passer une seule droite par les trois"],
    comparator: "mcq_exact",
    hint: "Pose ta règle : passe-t-elle par les trois d'un coup ?",
    explanation: exp(
      "Des points sont alignés quand une même droite passe par tous.",
      "On pose le bord de la règle sur deux points, puis on regarde le troisième.",
      "Si le troisième point est lui aussi contre la règle, les trois sont alignés. S'il s'en écarte, ils ne le sont pas — et ils forment alors un triangle.",
      "On peut faire passer une seule droite par les trois.",
    ),
    tags: ["ce1", "droites_segments", "alignement", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_droite_reconnaitre_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_segment_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Un segment a deux extrémités ; une droite n'en a pas.",
    tags: ["ce1", "droites_segments", "reconnaitre", "template"],
    generate: () => {
      const cas = randomChoice([
        { desc: "un trait qui va d'un point à un autre, et qui s'arrête", bonne: "un segment" },
        { desc: "un trait tout droit qui continue des deux côtés, sans fin", bonne: "une droite" },
        { desc: "une croix marquée sur la feuille, sans longueur", bonne: "un point" },
      ]);
      return {
        text: `Comment appelle-t-on ${cas.desc} ?`,
        format: "qcm",
        choices: makeChoices(cas.bonne, [
          "un segment",
          "une droite",
          "un point",
          "un cercle",
        ]),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "En géométrie, le point, le segment et la droite ne se confondent pas.",
          "On regarde si l'objet a une longueur, et s'il s'arrête quelque part.",
          `${cas.desc.charAt(0).toUpperCase()}${cas.desc.slice(1)} : c'est ${cas.bonne}.`,
          `C'est ${cas.bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_DROITE_ALIGNEMENT_REGLE — vérifier avec la règle
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_droite_alignement_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_alignement_regle",
    difficulty: 3,
    theme: "neutral",
    text: "Comment vérifie-t-on que trois points sont alignés ?",
    format: "qcm",
    choices: [
      "on pose le bord de la règle sur deux points et on regarde le troisième",
      "on mesure la distance entre les deux premiers",
      "on relie les points au compas",
      "on regarde de loin, cela suffit toujours",
    ],
    expected: ["on pose le bord de la règle sur deux points et on regarde le troisième"],
    comparator: "mcq_exact",
    hint: "La règle sert de droite.",
    explanation: exp(
      "Vérifier un alignement, c'est chercher si une même droite passe par tous les points.",
      "On pose le bord de la règle contre deux des points, puis on regarde le troisième.",
      "Si le troisième point touche lui aussi le bord de la règle, les points sont alignés. À l'œil, on peut se tromper de peu : la règle tranche.",
      "On pose le bord de la règle sur deux points et on regarde le troisième.",
    ),
    tags: ["ce1", "droites_segments", "alignement", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_droite_alignement_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_alignement_regle",
    difficulty: 4,
    theme: "reunion",
    text: "Dans la cour, on veut planter trois piquets bien alignés. Quel outil remplace la règle ?",
    format: "qcm",
    choices: [
      "une ficelle bien tendue",
      "un seau d'eau",
      "un mètre ruban enroulé",
      "rien, il faut le faire à l'œil",
    ],
    expected: ["une ficelle bien tendue"],
    comparator: "mcq_exact",
    hint: "Il faut quelque chose de bien droit, plus long qu'une règle.",
    explanation: exp(
      "Un alignement se vérifie avec un objet parfaitement droit qui joue le rôle de la droite.",
      "On tend la ficelle entre les deux piquets des extrémités, puis on place le troisième contre elle.",
      "Une ficelle tendue est droite : c'est la règle des grandes distances. Enroulé, le mètre ruban ne l'est pas ; à l'œil, on se trompe.",
      "Une ficelle bien tendue.",
    ),
    tags: ["ce1", "droites_segments", "alignement", "reunion", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_droite_alignement_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_alignement_regle",
    difficulty: 4,
    theme: "neutral",
    hint: "La règle passe-t-elle par les trois points à la fois ?",
    tags: ["ce1", "droites_segments", "alignement", "template"],
    generate: () => {
      const alignes = randomChoice([true, false]);
      const trio = randomChoice([
        { a: "A", b: "B", c: "C" },
        { a: "M", b: "N", c: "P" },
        { a: "R", b: "S", c: "T" },
      ]);
      const bonne = alignes
        ? "oui, les trois points sont alignés"
        : "non, les trois points ne sont pas alignés";
      return {
        text: alignes
          ? `On pose le bord de la règle sur les points ${trio.a} et ${trio.b}. Le point ${trio.c} touche lui aussi le bord de la règle. Que peut-on dire ?`
          : `On pose le bord de la règle sur les points ${trio.a} et ${trio.b}. Le point ${trio.c} reste un peu à côté du bord. Que peut-on dire ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          alignes
            ? "non, les trois points ne sont pas alignés"
            : "oui, les trois points sont alignés",
          "il faut mesurer les distances pour le savoir",
          "seuls deux points peuvent être alignés",
          "il faut utiliser le compas",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Des points sont alignés quand une même droite passe par tous.",
          "On pose le bord de la règle sur deux points, puis on regarde si le troisième le touche.",
          alignes
            ? `Le point ${trio.c} est contre le bord de la règle : la même droite passe par ${trio.a}, ${trio.b} et ${trio.c}.`
            : `Le point ${trio.c} s'écarte du bord : aucune droite ne passe par les trois. Ils forment un triangle, même s'il est très aplati.`,
          `${bonne.charAt(0).toUpperCase()}${bonne.slice(1)}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_DROITE_SEGMENT_TRACER — tracer à la règle
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_droite_tracer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_segment_tracer",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de points faut-il pour tracer un segment ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Un pour le départ, un pour l'arrivée.",
    explanation: exp(
      "Un segment est limité par deux points, ses extrémités.",
      "On marque les deux points, puis on les relie en suivant la règle.",
      "Avec un seul point, on ne sait pas où aller. Avec deux, le trait est complètement décidé.",
      "Il faut 2 points.",
    ),
    tags: ["ce1", "droites_segments", "tracer", "definition"],
  },
  {
    kind: "template",
    id: "ce1_droite_tracer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_segment_tracer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le zéro de la règle se pose sur le premier point.",
    tags: ["ce1", "droites_segments", "tracer", "template"],
    generate: () => {
      const longueur = randomInt(4, 12);
      return {
        text: `Tu poses le 0 de ta règle sur le premier point d'un segment de ${longueur} cm. Sur quelle graduation marques-tu le second point ?`,
        format: "short",
        expected: [String(longueur)],
        comparator: "number_equal",
        explanation: exp(
          "Tracer un segment d'une longueur donnée, c'est placer deux points puis les relier.",
          "On pose le 0 sur le premier point, et on lit la graduation qui correspond à la longueur voulue.",
          `Du 0 à la graduation ${longueur}, il y a exactement ${longueur} cm.`,
          `On marque le second point sur la graduation ${longueur}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_DROITE_MILIEU — le milieu, par pliage
     Le programme est explicite : au CE1, le milieu se trouve
     par PLIAGE.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_droite_milieu_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_milieu",
    difficulty: 3,
    theme: "neutral",
    text: "Comment trouve-t-on le milieu d'un segment par pliage ?",
    format: "qcm",
    choices: [
      "on plie la feuille de façon que les deux extrémités se superposent",
      "on plie la feuille n'importe où sur le segment",
      "on plie la feuille en quatre",
      "on ne peut pas trouver le milieu par pliage",
    ],
    expected: ["on plie la feuille de façon que les deux extrémités se superposent"],
    comparator: "mcq_exact",
    hint: "Les deux bouts doivent tomber exactement l'un sur l'autre.",
    explanation: exp(
      "Le milieu d'un segment est le point qui le partage en deux morceaux de la même longueur.",
      "On plie la feuille en amenant une extrémité du segment sur l'autre.",
      "Quand les deux extrémités se superposent, le pli tombe exactement au milieu : les deux morceaux ont la même longueur.",
      "On plie de façon que les deux extrémités se superposent.",
    ),
    tags: ["ce1", "droites_segments", "milieu", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_droite_milieu_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_milieu",
    difficulty: 4,
    theme: "neutral",
    hint: "Le milieu coupe le segment en deux morceaux égaux.",
    tags: ["ce1", "droites_segments", "milieu", "template"],
    generate: () => {
      const moitie = randomInt(2, 9);
      const longueur = moitie * 2;
      return {
        text: `Un segment mesure ${longueur} cm. Son milieu se trouve à combien de centimètres de chaque extrémité ?`,
        format: "short",
        expected: [String(moitie)],
        comparator: "number_equal",
        explanation: exp(
          "Le milieu d'un segment le partage en deux morceaux de la même longueur.",
          "On cherche la moitié de la longueur totale.",
          `La moitié de ${longueur} est ${moitie}, car ${moitie} + ${moitie} = ${longueur}.`,
          `Le milieu est à ${moitie} cm de chaque extrémité.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_DROITE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_droite_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Par deux points, combien peut-on tracer de droites différentes ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Essaie de poser ta règle autrement sur les deux mêmes points.",
    explanation: exp(
      "Deux points suffisent à décider complètement une droite.",
      "On pose la règle contre les deux points et on essaie de la faire pivoter.",
      "Dès que la règle touche les deux points, elle ne peut plus bouger : il n'y a qu'une seule droite possible. Par UN seul point, au contraire, il en passe une infinité.",
      "On ne peut en tracer qu'une seule.",
    ),
    tags: ["ce1", "droites_segments", "defi", "remarquable"],
  },
  {
    kind: "template",
    id: "ce1_droite_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "droites_segments",
    microId: "ce1_droite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le milieu partage en deux parts égales.",
    tags: ["ce1", "droites_segments", "defi", "template"],
    generate: () => {
      const demi = randomInt(3, 12);
      const total = demi * 2;
      return {
        text: `Le milieu d'un segment est à ${demi} cm de l'une de ses extrémités. Combien mesure le segment en entier ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Le milieu partage le segment en deux morceaux de la même longueur.",
          "On double la distance entre le milieu et une extrémité.",
          `Les deux morceaux mesurent ${demi} cm chacun : ${demi} + ${demi} = ${total}.`,
          `Le segment mesure ${total} cm.`,
        ),
      };
    },
  },
];
