// lib/tutor-v4/questionBank/cp/maths/duree.bank.ts
//
// Le repérage dans le temps au CP, écrit à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — « Au CP, le travail mené sur le repérage dans le temps se limite aux
//     HEURES ENTIÈRES. » Trois heures, neuf heures, et aussi midi ;
//   — positionner les aiguilles pour une heure entière inférieure ou égale à
//     douze, du matin ou de l'après-midi ;
//   — associer une heure à un moment de la journée : se lever, aller à
//     l'école, déjeuner.
//   ⛔ PAS de demi-heure, PAS de quart d'heure, PAS de minute, et AUCUNE durée
//     à calculer : tout cela arrive au CE1. La notion s'appelle d'ailleurs
//     « Le repérage dans le temps » au CP, et « … et les durées » au CE1.
//
// LE PIÈGE DE LA NOTION : lire la GRANDE aiguille au lieu de la petite. À
// trois heures, la grande aiguille est sur le 12 et la petite sur le 3 —
// l'enfant qui regarde la plus longue, la plus visible, annonce « douze
// heures ». Le piège n'existe qu'aux heures entières, c'est-à-dire exactement
// au CP.
//
// ⛔ `display.showDigital` ÉCRIT L'HEURE EN CHIFFRES sous le cadran. On ne le
// rallume jamais sur une question de lecture : le dessin donnerait la réponse.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.

import type { DureeCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

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

function horloge(heure: number): DureeCanvasData {
  return {
    kind: "duree",
    variant: "horloge",
    time: { hour: heure, minute: 0 },
    display: {
      showNumbers: true,
      showMinuteTicks: false,
      // ⛔ Jamais true sur une question de lecture : l'heure s'écrirait en
      // chiffres sous le cadran.
      showDigital: false,
      showLabels: false,
    },
  };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

const MOMENTS = [
  { action: "se lever", heure: 7, moment: "le matin" },
  { action: "arriver à l'école", heure: 8, moment: "le matin" },
  { action: "aller en récréation", heure: 10, moment: "le matin" },
  { action: "déjeuner à la cantine", heure: 12, moment: "à midi" },
  { action: "reprendre la classe", heure: 2, moment: "l'après-midi" },
  { action: "sortir de l'école", heure: 4, moment: "l'après-midi" },
  { action: "diner", heure: 7, moment: "le soir" },
  { action: "se coucher", heure: 8, moment: "le soir" },
] as const;

export const dureeBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_DUREE_LIRE_HEURE — LE piège de la notion
     La grande aiguille attire l'œil ; c'est la petite qui parle.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_duree_lire_heure_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_lire_heure",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une horloge, la petite aiguille est sur le 3 et la grande aiguille est sur le 12. Quelle heure est-il ?",
    format: "qcm",
    choices: ["3 heures", "12 heures", "15 heures", "3 heures et 12 minutes"],
    expected: ["3 heures"],
    comparator: "mcq_exact",
    hint: "C'est la PETITE aiguille qui dit l'heure. La grande sur le 12 veut dire que l'heure est pile.",
    explanation: exp(
      "Sur une horloge à aiguilles, la petite aiguille indique les heures et la grande les minutes.",
      "On lit d'abord la petite aiguille, puis on vérifie que la grande est bien sur le 12.",
      "La petite aiguille est sur le 3 : il est donc 3 heures. La grande est sur le 12, ce qui veut dire qu'il est l'heure pile, sans minute en plus. Elle ne dit pas « 12 heures » : elle est plus longue, mais ce n'est pas elle qui compte les heures.",
      "Il est 3 heures.",
    ),
    tags: ["cp", "duree", "lire_heure", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_duree_lire_heure_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_lire_heure",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une horloge à aiguilles, laquelle des deux aiguilles indique les heures ?",
    format: "qcm",
    choices: [
      "la petite aiguille",
      "la grande aiguille",
      "les deux ensemble",
      "celle qui bouge le plus vite",
    ],
    expected: ["la petite aiguille"],
    comparator: "mcq_exact",
    hint: "La plus grande fait le tour du cadran en une heure. Elle va bien trop vite pour compter les heures.",
    explanation: exp(
      "La petite aiguille compte les heures, la grande compte les minutes.",
      "On regarde laquelle avance lentement : c'est elle qui marque les heures.",
      "La grande aiguille fait un tour complet en une heure seulement. La petite met douze heures à faire le tour du cadran : c'est elle qui indique l'heure.",
      "C'est la petite aiguille.",
    ),
    tags: ["cp", "duree", "lire_heure", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "cp_duree_lire_heure_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_lire_heure",
    difficulty: 3,
    theme: "neutral",
    hint: "Suis la PETITE aiguille : c'est elle qui donne l'heure.",
    tags: ["cp", "duree", "lire_heure", "template", "canvas"],
    generate: () => {
      const heure = randomInt(1, 12);
      const bonne = `${heure} heures`;
      return {
        text: "Quelle heure indique cette horloge ?",
        format: "qcm",
        choices: makeChoices(bonne, [
          "12 heures",
          `${heure === 12 ? 1 : heure + 1} heures`,
          `${heure === 1 ? 12 : heure - 1} heures`,
          `${heure} heures et 12 minutes`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La petite aiguille indique les heures, la grande les minutes.",
          "On repère où pointe la petite aiguille, puis on vérifie que la grande est sur le 12.",
          `La petite aiguille pointe le ${heure} : il est ${heure} heures. La grande est sur le 12, donc il est l'heure pile.`,
          `Il est ${bonne}.`,
        ),
        canvas: horloge(heure),
      };
    },
  },
  {
    kind: "template",
    id: "cp_duree_lire_heure_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_lire_heure",
    difficulty: 2,
    theme: "neutral",
    hint: "La petite aiguille se pose sur le nombre des heures.",
    tags: ["cp", "duree", "lire_heure", "template"],
    generate: () => {
      const heure = randomInt(1, 12);
      return {
        text: `La petite aiguille est sur le ${heure} et la grande est sur le 12. Quelle heure est-il ?`,
        format: "short",
        expected: [String(heure)],
        comparator: "number_equal",
        explanation: exp(
          "La petite aiguille indique les heures.",
          "On lit le nombre que touche la petite aiguille.",
          `La petite aiguille est sur le ${heure} : il est ${heure} heures. La grande sur le 12 signale que l'heure est pile.`,
          `Il est ${heure} heures.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_DUREE_PLACER_AIGUILLES — le chemin inverse
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_duree_placer_aiguilles_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_placer_aiguilles",
    difficulty: 2,
    theme: "neutral",
    text: "Tu veux montrer 8 heures pile sur une horloge. Où faut-il mettre la GRANDE aiguille ?",
    format: "qcm",
    choices: ["sur le 12", "sur le 8", "sur le 6", "n'importe où"],
    expected: ["sur le 12"],
    comparator: "mcq_exact",
    hint: "Une heure pile, c'est zéro minute.",
    explanation: exp(
      "Une heure pile, c'est une heure sans minute en plus.",
      "On place la grande aiguille sur le 12, puis la petite sur le nombre d'heures.",
      "La grande aiguille compte les minutes : sur le 12, elle marque zéro minute. C'est la petite qui ira sur le 8.",
      "La grande aiguille se met sur le 12.",
    ),
    tags: ["cp", "duree", "placer_aiguilles", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_duree_placer_aiguilles_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_placer_aiguilles",
    difficulty: 2,
    theme: "neutral",
    hint: "La petite aiguille se pose sur le nombre d'heures.",
    tags: ["cp", "duree", "placer_aiguilles", "template"],
    generate: () => {
      const heure = randomInt(1, 12);
      return {
        text: `Tu veux montrer ${heure} heures pile. Sur quel nombre faut-il mettre la PETITE aiguille ?`,
        format: "short",
        expected: [String(heure)],
        comparator: "number_equal",
        explanation: exp(
          "La petite aiguille indique les heures.",
          "On la pose sur le nombre d'heures, et on met la grande sur le 12.",
          `Pour ${heure} heures pile, la petite aiguille se pose sur le ${heure} et la grande sur le 12.`,
          `La petite aiguille se met sur le ${heure}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_duree_placer_aiguilles_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_placer_aiguilles",
    difficulty: 4,
    theme: "neutral",
    hint: "Les deux aiguilles ne se placent pas au même endroit.",
    tags: ["cp", "duree", "placer_aiguilles", "piege", "template"],
    generate: () => {
      const heure = randomInt(1, 11);
      const bonne = `la petite sur le ${heure}, la grande sur le 12`;
      return {
        text: `Comment place-t-on les aiguilles pour montrer ${heure} heures pile ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `la petite sur le 12, la grande sur le ${heure}`,
          `les deux sur le ${heure}`,
          "les deux sur le 12",
          `la petite sur le ${heure}, la grande sur le 6`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La petite aiguille marque les heures, la grande marque les minutes.",
          "On place chaque aiguille selon ce qu'elle compte.",
          `Il est ${heure} heures, donc la petite aiguille va sur le ${heure}. Il est l'heure pile, donc zéro minute : la grande va sur le 12.`,
          `On met ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_DUREE_JOUR_SEMAINE — l'heure et le moment de la journée
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_duree_jour_semaine_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_jour_semaine",
    difficulty: 1,
    theme: "neutral",
    text: "À quel moment de la journée déjeune-t-on à la cantine ?",
    format: "qcm",
    choices: ["à midi", "à minuit", "au petit matin", "le soir"],
    expected: ["à midi"],
    comparator: "mcq_exact",
    hint: "C'est le repas du milieu de la journée.",
    explanation: exp(
      "Chaque moment de la journée correspond à une heure que l'on peut lire sur une horloge.",
      "On se rappelle le déroulement d'une journée d'école.",
      "On déjeune à la cantine à midi, c'est-à-dire à 12 heures. La petite aiguille est alors sur le 12, et la grande aussi.",
      "On déjeune à midi.",
    ),
    tags: ["cp", "duree", "moment_journee", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_duree_jour_semaine_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_jour_semaine",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : « Je me lève à 7 heures du soir. » A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, on se lève à 7 heures du MATIN",
      "oui, c'est possible",
      "non, on se lève toujours à midi",
      "on ne peut pas savoir",
    ],
    expected: ["non, on se lève à 7 heures du MATIN"],
    comparator: "mcq_exact",
    hint: "Le soir, il fait nuit et on va se coucher.",
    explanation: exp(
      "La même heure existe deux fois par jour : une fois le matin, une fois l'après-midi ou le soir.",
      "On regarde ce que l'on fait d'habitude à ce moment-là.",
      "À 7 heures du matin, on se lève pour aller à l'école. À 7 heures du soir, il fait sombre et on dine. C'est le même 7 sur le cadran, mais pas le même moment de la journée.",
      "Non : on se lève à 7 heures du matin.",
    ),
    tags: ["cp", "duree", "moment_journee", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_duree_jour_semaine_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_jour_semaine",
    difficulty: 2,
    theme: "neutral",
    hint: "Repense au déroulement d'une journée d'école.",
    tags: ["cp", "duree", "moment_journee", "template"],
    generate: () => {
      const m = randomChoice(MOMENTS);
      const autres = MOMENTS.filter((x) => x.moment !== m.moment).map((x) => x.moment);
      return {
        text: `À quel moment de la journée fait-on cela : ${m.action} ?`,
        format: "qcm",
        choices: makeChoices(m.moment, [...autres, "à minuit"]),
        expected: [m.moment],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque activité de la journée se place à un moment précis.",
          "On repense à l'ordre des activités, du lever au coucher.",
          `« ${m.action.charAt(0).toUpperCase()}${m.action.slice(1)} », c'est ${m.moment}, vers ${m.heure} heures.`,
          `C'est ${m.moment}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_DUREE_ORDONNER — ranger les moments de la journée
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_duree_ordonner_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_ordonner",
    difficulty: 2,
    theme: "neutral",
    text: "Range ces trois moments dans l'ordre de la journée : déjeuner, se lever, se coucher.",
    format: "qcm",
    choices: [
      "se lever, déjeuner, se coucher",
      "déjeuner, se lever, se coucher",
      "se coucher, déjeuner, se lever",
      "se lever, se coucher, déjeuner",
    ],
    expected: ["se lever, déjeuner, se coucher"],
    comparator: "mcq_exact",
    hint: "Qu'est-ce qu'on fait en premier le matin ?",
    explanation: exp(
      "Les moments d'une journée se suivent toujours dans le même ordre.",
      "On part du réveil et on avance jusqu'au soir.",
      "On se lève le matin vers 7 heures, on déjeune à midi, puis on se couche le soir vers 8 heures.",
      "L'ordre est : se lever, déjeuner, se coucher.",
    ),
    tags: ["cp", "duree", "ordonner", "qcm"],
  },
  {
    kind: "template",
    id: "cp_duree_ordonner_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_ordonner",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les heures : la plus petite arrive en premier dans la journée.",
    tags: ["cp", "duree", "ordonner", "template"],
    generate: () => {
      // Les heures sont exprimées en heures de la journée, de 7 h à 20 h, pour
      // que la comparaison ait un sens sans parler de minutes.
      const journee = [
        { action: "se lever", h: 7 },
        { action: "arriver à l'école", h: 8 },
        { action: "aller en récréation", h: 10 },
        { action: "déjeuner", h: 12 },
        { action: "sortir de l'école", h: 16 },
        { action: "diner", h: 19 },
        { action: "se coucher", h: 20 },
      ];
      const [a, b] = shuffle(journee).slice(0, 2);
      const avant = a.h < b.h ? a : b;
      const apres = a.h < b.h ? b : a;
      const chercheAvant = randomChoice([true, false]);
      const bonne = chercheAvant ? avant.action : apres.action;
      return {
        text: `Dans une journée, qu'est-ce qui arrive le ${chercheAvant ? "PLUS TÔT" : "PLUS TARD"} : ${a.action} ou ${b.action} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          chercheAvant ? apres.action : avant.action,
          "les deux en même temps",
          "on ne peut pas savoir",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Les moments d'une journée se rangent dans l'ordre où ils arrivent.",
          "On compare les deux heures comme deux nombres.",
          `« ${avant.action} », c'est vers ${avant.h} heures. « ${apres.action} », c'est vers ${apres.h} heures. Et ${avant.h} vient avant ${apres.h} dans la journée.`,
          `C'est ${bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_duree_ordonner_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_ordonner",
    difficulty: 2,
    theme: "neutral",
    hint: "Après une heure vient la suivante, comme dans la suite des nombres.",
    tags: ["cp", "duree", "ordonner", "template"],
    generate: () => {
      const heure = randomInt(1, 11);
      const apres = randomChoice([true, false]);
      const bonne = apres ? heure + 1 : heure - 1 === 0 ? 12 : heure - 1;
      return {
        text: `Quelle heure vient juste ${apres ? "après" : "avant"} ${heure} heures ?`,
        format: "short",
        expected: [String(bonne)],
        comparator: "number_equal",
        explanation: exp(
          "Les heures se suivent sur le cadran comme les nombres dans la comptine.",
          `On ${apres ? "avance" : "recule"} d'un cran sur le cadran.`,
          `Juste ${apres ? "après" : "avant"} ${heure} heures, il y a ${bonne} heures.`,
          `C'est ${bonne} heures.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_DUREE_DEFI — le cadran et ce qu'il ne dit pas tout seul
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_duree_defi_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_defi",
    difficulty: 5,
    theme: "neutral",
    text: "À midi, où sont les deux aiguilles de l'horloge ?",
    format: "qcm",
    choices: [
      "les deux sur le 12",
      "la petite sur le 12, la grande sur le 6",
      "la petite sur le 6, la grande sur le 12",
      "les deux sur le 6",
    ],
    expected: ["les deux sur le 12"],
    comparator: "mcq_exact",
    hint: "Midi, c'est 12 heures pile.",
    explanation: exp(
      "Midi, c'est 12 heures pile : douze heures et zéro minute.",
      "On place la petite aiguille sur l'heure, la grande sur les minutes.",
      "La petite aiguille marque 12 heures : elle est sur le 12. Il est l'heure pile, donc zéro minute : la grande est aussi sur le 12. C'est le seul moment de la journée où elles se superposent sur le 12.",
      "Les deux aiguilles sont sur le 12.",
    ),
    tags: ["cp", "duree", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_duree_defi_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une horloge n'a que douze nombres écrits sur son cadran. Pourtant une journée dure vingt-quatre heures. Comment est-ce possible ?",
    format: "qcm",
    choices: [
      "la petite aiguille fait deux fois le tour dans une journée",
      "l'horloge est cassée",
      "une journée dure douze heures",
      "on change le cadran à midi",
    ],
    expected: ["la petite aiguille fait deux fois le tour dans une journée"],
    comparator: "mcq_exact",
    hint: "Une fois le matin, une fois l'après-midi.",
    explanation: exp(
      "Le cadran d'une horloge à aiguilles ne montre que douze heures.",
      "On suit la petite aiguille pendant toute une journée.",
      "La petite aiguille fait un premier tour du matin jusqu'à midi, puis un second tour de midi jusqu'à minuit. Voilà pourquoi on précise « du matin » ou « du soir » : 7 heures existe deux fois dans la journée.",
      "La petite aiguille fait deux fois le tour du cadran.",
    ),
    tags: ["cp", "duree", "defi", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_duree_defi_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde bien laquelle des deux aiguilles a bougé.",
    tags: ["cp", "duree", "defi", "piege", "template"],
    generate: () => {
      const heure = randomInt(1, 11);
      const bonne = `il est ${heure} heures`;
      return {
        text: `Une horloge montre ceci : la GRANDE aiguille est sur le 12, la PETITE est sur le ${heure}. Que peut-on dire ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "il est 12 heures",
          `il est ${heure} minutes`,
          `il est 12 heures et ${heure} minutes`,
          `il est ${heure === 12 ? 1 : heure + 1} heures`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La petite aiguille donne l'heure, la grande donne les minutes.",
          "On lit la petite d'abord, la grande ensuite.",
          `La petite est sur le ${heure} : il est ${heure} heures. La grande sur le 12 veut dire zéro minute, pas « douze heures » — la grande ne compte jamais les heures.`,
          `Il est ${heure} heures pile.`,
        ),
      };
    },
  },
];
