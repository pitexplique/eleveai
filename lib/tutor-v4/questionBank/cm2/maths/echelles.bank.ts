// lib/tutor-v4/question-banks/maths/cm2/echelles.bank.ts

import type {
  EchelleCanvasData,
  TutorBankItemV4,
} from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: readonly T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]): string[] {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

function formatNumber(n: number): string {
  return Number.isInteger(n) ? String(n) : String(n).replace(".", ",");
}

function exp(parts: string[]): string {
  return parts.join("\n\n");
}

function echelleCanvas(data: Omit<EchelleCanvasData, "kind">): EchelleCanvasData {
  return {
    kind: "echelle",
    ...data,
  };
}

function correspondanceCanvas(args: {
  echelleLabel: string;
  planLabel: string;
  reelLabel: string;
  questionLabel?: string;
}): EchelleCanvasData {
  return echelleCanvas({
    variant: "correspondance",
    title: "Comprendre l’échelle",
    echelleLabel: args.echelleLabel,
    planLabel: args.planLabel,
    reelLabel: args.reelLabel,
    questionLabel: args.questionLabel,
  });
}

function distanceReelleCanvas(args: {
  echelleLabel: string;
  planDistance: string;
  reelDistance?: string;
  questionLabel?: string;
}): EchelleCanvasData {
  return echelleCanvas({
    variant: "distance_reelle",
    title: "Du plan vers la réalité",
    echelleLabel: args.echelleLabel,
    planDistance: args.planDistance,
    reelDistance: args.reelDistance ?? "?",
    questionLabel: args.questionLabel,
  });
}

function distancePlanCanvas(args: {
  echelleLabel: string;
  planDistance?: string;
  reelDistance: string;
  questionLabel?: string;
}): EchelleCanvasData {
  return echelleCanvas({
    variant: "distance_plan",
    title: "De la réalité vers le plan",
    echelleLabel: args.echelleLabel,
    planDistance: args.planDistance ?? "?",
    reelDistance: args.reelDistance,
    questionLabel: args.questionLabel,
  });
}

// ============================================================
// BANK
// ============================================================

export const echellesBank: TutorBankItemV4[] = [
  // ============================================================
  // ECHELLE_COMPRENDRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_echelle_comprendre_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Sur un plan ou une carte, une échelle sert à...",
    format: "qcm",
    choices: [
      "relier une distance sur le plan à une distance réelle",
      "peser un objet",
      "mesurer une durée",
      "calculer une masse",
    ],
    expected: ["relier une distance sur le plan à une distance réelle"],
    comparator: "mcq_exact",
    hint: "Une échelle aide à passer du dessin à la réalité.",
    explanation: exp([
      "Définition : une échelle indique le lien entre une distance sur un plan ou une carte et la distance réelle.",
      "Méthode : on lit ce que représente 1 cm sur le plan.",
      "Exemple : si 1 cm représente 10 m en réalité, alors 2 cm représentent 20 m.",
      "Conclusion : l’échelle permet de passer du plan à la réalité.",
    ]),
    tags: ["cm2", "echelle", "comprendre", "definition", "qcm", "canvas"],
    canvas: correspondanceCanvas({
      echelleLabel: "1 cm → 10 m",
      planLabel: "1 cm sur le plan",
      reelLabel: "10 m en réalité",
      questionLabel: "À quoi sert une échelle ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_comprendre_fixed_2_distance_plan",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une situation d’échelle, la distance mesurée sur le dessin s’appelle souvent...",
    format: "qcm",
    choices: [
      "distance sur le plan",
      "distance réelle",
      "masse",
      "contenance",
    ],
    expected: ["distance sur le plan"],
    comparator: "mcq_exact",
    hint: "C’est la distance que l’on mesure sur la carte ou le plan.",
    explanation: exp([
      "Définition : une échelle relie deux distances.",
      "Méthode : on distingue la distance sur le plan et la distance réelle.",
      "Observation : la distance sur le plan est celle que l’on mesure sur le dessin.",
      "Conclusion : on l’appelle la distance sur le plan.",
    ]),
    tags: ["cm2", "echelle", "vocabulaire", "plan", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_echelle_comprendre_fixed_3_distance_reelle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une situation d’échelle, la distance dans la vraie vie s’appelle...",
    format: "qcm",
    choices: [
      "distance réelle",
      "distance sur le plan",
      "distance dessinée",
      "distance imaginaire",
    ],
    expected: ["distance réelle"],
    comparator: "mcq_exact",
    hint: "C’est la distance dans la réalité.",
    explanation: exp([
      "Définition : la distance réelle est la distance dans la vraie vie.",
      "Méthode : on utilise l’échelle pour la calculer à partir de la distance sur le plan.",
      "Conclusion : la distance dans la vraie vie s’appelle la distance réelle.",
    ]),
    tags: ["cm2", "echelle", "vocabulaire", "reel", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_echelle_comprendre_fixed_4_lecture_fleche",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "L’écriture “1 cm → 5 m” signifie que...",
    format: "qcm",
    choices: [
      "1 cm sur le plan représente 5 m en réalité",
      "1 m sur le plan représente 5 cm en réalité",
      "5 cm sur le plan représentent 1 m en réalité",
      "le plan mesure 5 m",
    ],
    expected: ["1 cm sur le plan représente 5 m en réalité"],
    comparator: "mcq_exact",
    hint: "Lis la flèche de gauche à droite.",
    explanation: exp([
      "Définition : l’écriture avec une flèche donne la correspondance entre le plan et la réalité.",
      "Méthode : la valeur de gauche concerne le plan ; la valeur de droite concerne la réalité.",
      "Conclusion : “1 cm → 5 m” signifie que 1 cm sur le plan représente 5 m en réalité.",
    ]),
    tags: ["cm2", "echelle", "lecture", "fleche", "qcm", "canvas"],
    canvas: correspondanceCanvas({
      echelleLabel: "1 cm → 5 m",
      planLabel: "1 cm sur le plan",
      reelLabel: "5 m en réalité",
      questionLabel: "Que signifie cette échelle ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_comprendre_fixed_5_1cm_1m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Sur un plan, 1 cm représente 1 m en réalité. Que représentent 2 cm sur le plan ?",
    format: "qcm",
    choices: ["2 m", "1 m", "20 m", "2 cm"],
    expected: ["2 m"],
    comparator: "mcq_exact",
    hint: "2 cm, c’est deux fois 1 cm.",
    explanation: exp([
      "Définition : l’échelle donne une correspondance entre le plan et la réalité.",
      "Méthode : 1 cm représente 1 m, donc 2 cm représentent deux fois plus.",
      "Calcul : 2 × 1 m = 2 m.",
      "Conclusion : 2 cm sur le plan représentent 2 m en réalité.",
    ]),
    tags: ["cm2", "echelle", "comprendre", "simple", "qcm", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 1 m",
      planDistance: "2 cm",
      reelDistance: "?",
      questionLabel: "Quelle est la distance réelle ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_comprendre_fixed_6_1cm_10m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Sur une carte, 1 cm représente 10 m en réalité. Que représentent 3 cm sur la carte ?",
    format: "qcm",
    choices: ["30 m", "3 m", "10 m", "300 m"],
    expected: ["30 m"],
    comparator: "mcq_exact",
    hint: "3 cm, c’est 3 fois 1 cm.",
    explanation: exp([
      "Définition : une échelle permet de passer de la carte à la réalité.",
      "Méthode : 1 cm représente 10 m, donc 3 cm représentent 3 fois 10 m.",
      "Calcul : 3 × 10 m = 30 m.",
      "Conclusion : 3 cm représentent 30 m en réalité.",
    ]),
    tags: ["cm2", "echelle", "comprendre", "carte", "qcm", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 10 m",
      planDistance: "3 cm",
      reelDistance: "?",
      questionLabel: "Quelle est la distance réelle ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_comprendre_fixed_7_1cm_100m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une carte d’un parc, 1 cm représente 100 m. Que représentent 4 cm ?",
    format: "qcm",
    choices: ["400 m", "104 m", "40 m", "4 m"],
    expected: ["400 m"],
    comparator: "mcq_exact",
    hint: "On multiplie 100 m par 4.",
    explanation: exp([
      "Définition : l’échelle est une situation de proportionnalité.",
      "Méthode : 1 cm représente 100 m, donc 4 cm représentent 4 fois 100 m.",
      "Calcul : 4 × 100 m = 400 m.",
      "Conclusion : 4 cm représentent 400 m.",
    ]),
    tags: ["cm2", "echelle", "comprendre", "parc", "qcm", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 100 m",
      planDistance: "4 cm",
      reelDistance: "?",
      questionLabel: "Distance réelle dans le parc ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_comprendre_fixed_8_proportionnalite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Si 1 cm représente 5 m, alors 4 cm représentent...",
    format: "qcm",
    choices: ["20 m", "9 m", "4 m", "5 m"],
    expected: ["20 m"],
    comparator: "mcq_exact",
    hint: "C’est une situation de proportionnalité.",
    explanation: exp([
      "Définition : une échelle fonctionne comme une situation de proportionnalité.",
      "Méthode : si la distance sur le plan est multipliée par 4, la distance réelle est aussi multipliée par 4.",
      "Calcul : 4 × 5 m = 20 m.",
      "Conclusion : 4 cm représentent 20 m.",
    ]),
    tags: ["cm2", "echelle", "proportionnalite", "qcm", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 5 m",
      planDistance: "4 cm",
      reelDistance: "?",
      questionLabel: "Utilise la proportionnalité.",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_comprendre_fixed_9_erreur_addition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une carte, 1 cm représente 10 m. Un élève dit : “3 cm représentent 13 m.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "On ne fait pas 10 + 3. On multiplie.",
    explanation: exp([
      "Définition : une échelle est une situation de proportionnalité.",
      "Méthode : 3 cm représentent 3 fois ce que représente 1 cm.",
      "Calcul : 3 × 10 m = 30 m.",
      "Conclusion : l’élève a tort. 3 cm représentent 30 m, pas 13 m.",
    ]),
    tags: ["cm2", "echelle", "erreur", "addition", "qcm", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 10 m",
      planDistance: "3 cm",
      reelDistance: "?",
      questionLabel: "Attention : on multiplie.",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_comprendre_fixed_10_erreur_unites",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un plan, 1 cm représente 1 m. Un élève dit : “1 cm sur le plan est égal à 1 cm en réalité.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "L’échelle dit que 1 cm sur le plan représente 1 m en réalité.",
    explanation: exp([
      "Définition : l’échelle ne dit pas forcément que les deux longueurs sont identiques.",
      "Méthode : on lit la correspondance donnée.",
      "Observation : ici, 1 cm sur le plan représente 1 m en réalité.",
      "Conclusion : l’élève a tort.",
    ]),
    tags: ["cm2", "echelle", "erreur", "unites", "qcm", "canvas"],
    canvas: correspondanceCanvas({
      echelleLabel: "1 cm → 1 m",
      planLabel: "1 cm sur le plan",
      reelLabel: "1 m en réalité",
      questionLabel: "Attention aux unités.",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_comprendre_fixed_11_open_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_comprendre",
    difficulty: 4,
    theme: "neutral",
    text: "Explique avec tes mots à quoi sert une échelle sur un plan ou une carte.",
    format: "open",
    expected: ["plan", "carte", "réalité", "distance", "représente"],
    comparator: "contains_keyword",
    hint: "Parle de la distance sur le plan et de la distance réelle.",
    explanation: exp([
      "Une échelle sert à relier une distance mesurée sur un plan ou une carte à une distance réelle.",
      "Par exemple, si 1 cm représente 10 m, alors 2 cm représentent 20 m.",
      "Elle permet donc de passer du dessin à la réalité.",
    ]),
    tags: ["cm2", "echelle", "open", "definition"],
  },

  {
    kind: "fixed",
    id: "cm2_echelle_comprendre_fixed_12_open_proportionnalite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_comprendre",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi une échelle est une situation de proportionnalité.",
    format: "open",
    expected: ["multiplie", "distance", "plan", "réelle", "proportionnalité"],
    comparator: "contains_keyword",
    hint: "Si la distance sur le plan double, que devient la distance réelle ?",
    explanation: exp([
      "Une échelle est une situation de proportionnalité car les distances gardent le même rapport.",
      "Si on multiplie la distance sur le plan par 2, alors la distance réelle est aussi multipliée par 2.",
      "C’est pour cela qu’on peut utiliser des multiplications ou des divisions.",
    ]),
    tags: ["cm2", "echelle", "open", "proportionnalite"],
  },

  {
    kind: "template",
    id: "cm2_echelle_comprendre_tpl_1_lecture_simple",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie la distance réelle représentée par 1 cm.",
    tags: ["cm2", "echelle", "comprendre", "template", "qcm", "canvas"],
    generate: () => {
      const situation = randomChoice([
        { oneCm: 2, planCm: 3 },
        { oneCm: 5, planCm: 4 },
        { oneCm: 10, planCm: 6 },
        { oneCm: 20, planCm: 3 },
      ]);

      const result = situation.oneCm * situation.planCm;

      return {
        text: `Sur un plan, 1 cm représente ${situation.oneCm} m. Que représentent ${situation.planCm} cm ?`,
        format: "qcm",
        choices: makeChoices(`${result} m`, [
          `${situation.oneCm + situation.planCm} m`,
          `${situation.planCm} m`,
          `${situation.oneCm} m`,
        ]),
        expected: [`${result} m`],
        comparator: "mcq_exact",
        explanation: exp([
          "Définition : une échelle donne une correspondance entre le plan et la réalité.",
          `Méthode : ${situation.planCm} cm représentent ${situation.planCm} fois ce que représente 1 cm.`,
          `Calcul : ${situation.planCm} × ${situation.oneCm} m = ${result} m.`,
          `Conclusion : ${situation.planCm} cm représentent ${result} m.`,
        ]),
        canvas: distanceReelleCanvas({
          echelleLabel: `1 cm → ${situation.oneCm} m`,
          planDistance: `${situation.planCm} cm`,
          reelDistance: "?",
          questionLabel: "Quelle est la distance réelle ?",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_echelle_comprendre_tpl_2_vrai_faux",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_comprendre",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie avec une multiplication.",
    tags: ["cm2", "echelle", "comprendre", "template", "vrai_faux", "canvas"],
    generate: () => {
      const situation = randomChoice([
        {
          text: "Sur une carte, 1 cm représente 10 m. Donc 4 cm représentent 40 m.",
          expected: "oui",
          planDistance: "4 cm",
          echelleLabel: "1 cm → 10 m",
          explanation: "Oui. 4 × 10 m = 40 m.",
        },
        {
          text: "Sur une carte, 1 cm représente 10 m. Donc 4 cm représentent 14 m.",
          expected: "non",
          planDistance: "4 cm",
          echelleLabel: "1 cm → 10 m",
          explanation: "Non. Il faut multiplier : 4 × 10 m = 40 m, pas 14 m.",
        },
        {
          text: "Sur un plan, 1 cm représente 2 m. Donc 5 cm représentent 10 m.",
          expected: "oui",
          planDistance: "5 cm",
          echelleLabel: "1 cm → 2 m",
          explanation: "Oui. 5 × 2 m = 10 m.",
        },
        {
          text: "Sur un plan, 1 cm représente 5 m. Donc 3 cm représentent 8 m.",
          expected: "non",
          planDistance: "3 cm",
          echelleLabel: "1 cm → 5 m",
          explanation: "Non. Il faut multiplier : 3 × 5 m = 15 m, pas 8 m.",
        },
      ]);

      return {
        text: `${situation.text} Est-ce correct ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [situation.expected],
        comparator: "mcq_exact",
        explanation: exp([
          "Définition : une échelle est une situation de proportionnalité.",
          "Méthode : on vérifie la multiplication.",
          `Conclusion : ${situation.explanation}`,
        ]),
        canvas: distanceReelleCanvas({
          echelleLabel: situation.echelleLabel,
          planDistance: situation.planDistance,
          reelDistance: "?",
          questionLabel: "Est-ce correct ?",
        }),
      };
    },
  },
    // ============================================================
  // ECHELLE_DISTANCE_REELLE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_echelle_distance_reelle_fixed_1_2cm_1m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_reelle",
    difficulty: 1,
    theme: "neutral",
    text: "Sur un plan de classe, 1 cm représente 1 m. Une table est à 2 cm du tableau sur le plan. Quelle est la distance réelle ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "1 cm représente 1 m, donc 2 cm représentent 2 m.",
    explanation: exp([
      "Définition : on cherche la distance réelle.",
      "Méthode : 1 cm sur le plan représente 1 m en réalité.",
      "Calcul : 2 × 1 m = 2 m.",
      "Conclusion : la distance réelle est 2 m.",
    ]),
    tags: ["cm2", "echelle", "distance_reelle", "classe", "short", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 1 m",
      planDistance: "2 cm",
      reelDistance: "?",
      questionLabel: "Distance réelle ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_reelle_fixed_2_5cm_1m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_reelle",
    difficulty: 1,
    theme: "neutral",
    text: "Sur un plan, 1 cm représente 1 m. Un couloir mesure 5 cm sur le plan. Quelle est sa longueur réelle en mètres ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Avec cette échelle, le nombre de cm sur le plan donne le même nombre de mètres en réalité.",
    explanation: exp([
      "Définition : on veut passer du plan à la réalité.",
      "Méthode : 1 cm représente 1 m.",
      "Calcul : 5 × 1 m = 5 m.",
      "Conclusion : le couloir mesure 5 m en réalité.",
    ]),
    tags: ["cm2", "echelle", "distance_reelle", "plan", "short", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 1 m",
      planDistance: "5 cm",
      reelDistance: "?",
      questionLabel: "Longueur réelle ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_reelle_fixed_3_3cm_10m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_reelle",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une carte du parc, 1 cm représente 10 m. Le chemin mesure 3 cm sur la carte. Quelle est la distance réelle ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Calcule 3 × 10.",
    explanation: exp([
      "Définition : on cherche la distance réelle.",
      "Méthode : 1 cm représente 10 m.",
      "Calcul : 3 × 10 m = 30 m.",
      "Conclusion : le chemin mesure 30 m en réalité.",
    ]),
    tags: ["cm2", "echelle", "distance_reelle", "parc", "short", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 10 m",
      planDistance: "3 cm",
      reelDistance: "?",
      questionLabel: "Distance réelle du chemin ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_reelle_fixed_4_7cm_10m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_reelle",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une carte, 1 cm représente 10 m. Une allée mesure 7 cm sur la carte. Quelle est sa longueur réelle ?",
    format: "short",
    expected: ["70"],
    comparator: "number_equal",
    hint: "7 cm représentent 7 fois 10 m.",
    explanation: exp([
      "Définition : la distance réelle est la distance dans la vraie vie.",
      "Méthode : 1 cm représente 10 m.",
      "Calcul : 7 × 10 m = 70 m.",
      "Conclusion : l’allée mesure 70 m en réalité.",
    ]),
    tags: ["cm2", "echelle", "distance_reelle", "allee", "short", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 10 m",
      planDistance: "7 cm",
      reelDistance: "?",
      questionLabel: "Longueur réelle ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_reelle_fixed_5_4cm_100m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_reelle",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une carte, 1 cm représente 100 m. La distance entre deux entrées du parc est 4 cm. Quelle est la distance réelle ?",
    format: "short",
    expected: ["400"],
    comparator: "number_equal",
    hint: "Calcule 4 × 100.",
    explanation: exp([
      "Définition : on utilise l’échelle pour calculer la distance réelle.",
      "Méthode : 1 cm représente 100 m.",
      "Calcul : 4 × 100 m = 400 m.",
      "Conclusion : la distance réelle est 400 m.",
    ]),
    tags: ["cm2", "echelle", "distance_reelle", "carte", "parc", "short", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 100 m",
      planDistance: "4 cm",
      reelDistance: "?",
      questionLabel: "Distance réelle ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_reelle_fixed_6_6cm_100m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_reelle",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une carte du quartier, 1 cm représente 100 m. L’école est à 6 cm de la médiathèque sur la carte. Quelle est la distance réelle ?",
    format: "short",
    expected: ["600"],
    comparator: "number_equal",
    hint: "6 cm représentent 6 fois 100 m.",
    explanation: exp([
      "Définition : on cherche la distance réelle entre l’école et la médiathèque.",
      "Méthode : 1 cm représente 100 m.",
      "Calcul : 6 × 100 m = 600 m.",
      "Conclusion : la distance réelle est 600 m.",
    ]),
    tags: ["cm2", "echelle", "distance_reelle", "quartier", "ecole", "short", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 100 m",
      planDistance: "6 cm",
      reelDistance: "?",
      questionLabel: "Distance réelle école-médiathèque ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_reelle_fixed_7_5cm_200m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_reelle",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une carte, 1 cm représente 200 m. Un trajet mesure 5 cm sur la carte. Quelle est la distance réelle ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "Calcule 5 × 200.",
    explanation: exp([
      "Définition : on calcule la distance réelle à partir de la distance sur la carte.",
      "Méthode : 1 cm représente 200 m.",
      "Calcul : 5 × 200 m = 1000 m.",
      "Conclusion : le trajet mesure 1000 m, soit 1 km.",
    ]),
    tags: ["cm2", "echelle", "distance_reelle", "trajet", "short", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 200 m",
      planDistance: "5 cm",
      reelDistance: "?",
      questionLabel: "Distance réelle ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_reelle_fixed_8_2_5cm_10m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_reelle",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un plan, 1 cm représente 10 m. Une distance mesure 2,5 cm sur le plan. Quelle est la distance réelle ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "Calcule 2,5 × 10.",
    explanation: exp([
      "Définition : l’échelle permet de passer du plan à la réalité.",
      "Méthode : 1 cm représente 10 m.",
      "Calcul : 2,5 × 10 m = 25 m.",
      "Conclusion : la distance réelle est 25 m.",
    ]),
    tags: ["cm2", "echelle", "distance_reelle", "decimal", "short", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 10 m",
      planDistance: "2,5 cm",
      reelDistance: "?",
      questionLabel: "Distance réelle ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_reelle_fixed_9_1_5cm_100m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_reelle",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une carte, 1 cm représente 100 m. Une distance mesure 1,5 cm sur la carte. Quelle est la distance réelle ?",
    format: "short",
    expected: ["150"],
    comparator: "number_equal",
    hint: "1,5 × 100 = 150.",
    explanation: exp([
      "Définition : on cherche la distance réelle.",
      "Méthode : 1 cm représente 100 m.",
      "Calcul : 1,5 × 100 m = 150 m.",
      "Conclusion : la distance réelle est 150 m.",
    ]),
    tags: ["cm2", "echelle", "distance_reelle", "decimal", "carte", "short", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 100 m",
      planDistance: "1,5 cm",
      reelDistance: "?",
      questionLabel: "Distance réelle ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_reelle_fixed_10_reunion_plage",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_reelle",
    difficulty: 2,
    theme: "reunion",
    text: "Sur une carte d’un sentier à La Réunion, 1 cm représente 100 m. Le chemin vers la plage mesure 5 cm. Quelle est la distance réelle ?",
    format: "short",
    expected: ["500"],
    comparator: "number_equal",
    hint: "Calcule 5 × 100.",
    explanation: exp([
      "Définition : on utilise l’échelle pour trouver la distance réelle.",
      "Méthode : 1 cm représente 100 m.",
      "Calcul : 5 × 100 m = 500 m.",
      "Conclusion : le chemin mesure 500 m en réalité.",
    ]),
    tags: ["cm2", "echelle", "distance_reelle", "reunion", "plage", "short", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 100 m",
      planDistance: "5 cm",
      reelDistance: "?",
      questionLabel: "Distance réelle vers la plage ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_reelle_fixed_11_sport_stade",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_reelle",
    difficulty: 2,
    theme: "sport",
    text: "Sur le plan d’un stade, 1 cm représente 10 m. Une longueur mesure 9 cm sur le plan. Quelle est la longueur réelle ?",
    format: "short",
    expected: ["90"],
    comparator: "number_equal",
    hint: "9 cm représentent 9 fois 10 m.",
    explanation: exp([
      "Définition : on cherche la longueur réelle du stade.",
      "Méthode : 1 cm représente 10 m.",
      "Calcul : 9 × 10 m = 90 m.",
      "Conclusion : la longueur réelle est 90 m.",
    ]),
    tags: ["cm2", "echelle", "distance_reelle", "sport", "stade", "short", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 10 m",
      planDistance: "9 cm",
      reelDistance: "?",
      questionLabel: "Longueur réelle du stade ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_reelle_fixed_12_erreur_oublie_multiplier",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_reelle",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une carte, 1 cm représente 100 m. Une distance mesure 4 cm. Un élève répond 104 m. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il ne faut pas additionner 100 et 4.",
    explanation: exp([
      "Définition : une échelle se traite avec une multiplication.",
      "Méthode : 4 cm représentent 4 fois 100 m.",
      "Calcul : 4 × 100 m = 400 m.",
      "Conclusion : l’élève a tort. La réponse est 400 m.",
    ]),
    tags: ["cm2", "echelle", "distance_reelle", "erreur", "qcm", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 100 m",
      planDistance: "4 cm",
      reelDistance: "?",
      questionLabel: "Attention : multiplication.",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_reelle_fixed_13_erreur_unite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_reelle",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un plan, 1 cm représente 10 m. Une distance mesure 6 cm. Un élève répond 60 cm. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La distance réelle est en mètres ici.",
    explanation: exp([
      "Définition : il faut respecter l’unité donnée par l’échelle.",
      "Méthode : 1 cm sur le plan représente 10 m en réalité.",
      "Calcul : 6 × 10 m = 60 m.",
      "Conclusion : l’élève a tort : la réponse est 60 m, pas 60 cm.",
    ]),
    tags: ["cm2", "echelle", "distance_reelle", "erreur_unite", "qcm", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 10 m",
      planDistance: "6 cm",
      reelDistance: "?",
      questionLabel: "Attention à l’unité.",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_reelle_fixed_14_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_reelle",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment calculer une distance réelle à partir d’une distance sur un plan.",
    format: "open",
    expected: ["échelle", "distance sur le plan", "multiplier", "distance réelle", "unité"],
    comparator: "contains_keyword",
    hint: "Parle de ce que représente 1 cm sur le plan.",
    explanation: exp([
      "Pour calculer une distance réelle, on lit d’abord l’échelle.",
      "Ensuite, on multiplie la distance mesurée sur le plan par la distance réelle représentée par 1 cm.",
      "On n’oublie pas d’écrire l’unité de la distance réelle.",
    ]),
    tags: ["cm2", "echelle", "distance_reelle", "open", "methode"],
  },

  {
    kind: "template",
    id: "cm2_echelle_distance_reelle_tpl_1_simple",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_reelle",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie la distance sur le plan par la valeur réelle de 1 cm.",
    tags: ["cm2", "echelle", "distance_reelle", "template", "short", "canvas"],
    generate: () => {
      const oneCm = randomChoice([2, 5, 10, 20, 50, 100]);
      const planCm = randomChoice([2, 3, 4, 5, 6, 7, 8]);
      const result = oneCm * planCm;

      return {
        text: `Sur une carte, 1 cm représente ${oneCm} m. Une distance mesure ${planCm} cm sur la carte. Quelle est la distance réelle en mètres ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp([
          "Définition : on cherche la distance réelle.",
          `Méthode : 1 cm représente ${oneCm} m.`,
          `Calcul : ${planCm} × ${oneCm} m = ${result} m.`,
          `Conclusion : la distance réelle est ${result} m.`,
        ]),
        canvas: distanceReelleCanvas({
          echelleLabel: `1 cm → ${oneCm} m`,
          planDistance: `${planCm} cm`,
          reelDistance: "?",
          questionLabel: "Distance réelle ?",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_echelle_distance_reelle_tpl_2_decimaux",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_reelle",
    difficulty: 3,
    theme: "neutral",
    hint: "Un nombre décimal peut aussi être multiplié par l’échelle.",
    tags: ["cm2", "echelle", "distance_reelle", "template", "decimal", "short", "canvas"],
    generate: () => {
      const situation = randomChoice([
        { oneCm: 10, planCm: 1.5, result: 15 },
        { oneCm: 10, planCm: 2.5, result: 25 },
        { oneCm: 100, planCm: 1.5, result: 150 },
        { oneCm: 100, planCm: 2.5, result: 250 },
      ]);

      return {
        text: `Sur un plan, 1 cm représente ${situation.oneCm} m. Une distance mesure ${formatNumber(situation.planCm)} cm. Quelle est la distance réelle en mètres ?`,
        format: "short",
        expected: [String(situation.result)],
        comparator: "number_equal",
        explanation: exp([
          "Définition : on cherche la distance réelle.",
          `Méthode : 1 cm représente ${situation.oneCm} m.`,
          `Calcul : ${formatNumber(situation.planCm)} × ${situation.oneCm} m = ${situation.result} m.`,
          `Conclusion : la distance réelle est ${situation.result} m.`,
        ]),
        canvas: distanceReelleCanvas({
          echelleLabel: `1 cm → ${situation.oneCm} m`,
          planDistance: `${formatNumber(situation.planCm)} cm`,
          reelDistance: "?",
          questionLabel: "Distance réelle ?",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_echelle_distance_reelle_tpl_3_contextes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_reelle",
    difficulty: 3,
    theme: "neutral",
    hint: "Identifie l’échelle, puis multiplie.",
    tags: ["cm2", "echelle", "distance_reelle", "template", "contexte", "short", "canvas"],
    generate: () => {
      const situation = randomChoice([
        {
          context: "Sur le plan d’un stade",
          oneCm: 10,
          planCm: 8,
          unit: "m",
          themeLabel: "sport",
        },
        {
          context: "Sur une carte d’un parc",
          oneCm: 100,
          planCm: 5,
          unit: "m",
          themeLabel: "parc",
        },
        {
          context: "Sur un plan de classe",
          oneCm: 1,
          planCm: 6,
          unit: "m",
          themeLabel: "classe",
        },
        {
          context: "Sur une carte d’un sentier",
          oneCm: 100,
          planCm: 7,
          unit: "m",
          themeLabel: "sentier",
        },
      ]);

      const result = situation.oneCm * situation.planCm;

      return {
        text: `${situation.context}, 1 cm représente ${situation.oneCm} ${situation.unit}. Une distance mesure ${situation.planCm} cm. Quelle est la distance réelle ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp([
          "Définition : on veut passer du plan à la réalité.",
          `Méthode : 1 cm représente ${situation.oneCm} ${situation.unit}.`,
          `Calcul : ${situation.planCm} × ${situation.oneCm} = ${result}.`,
          `Conclusion : la distance réelle est ${result} ${situation.unit}.`,
        ]),
        canvas: distanceReelleCanvas({
          echelleLabel: `1 cm → ${situation.oneCm} ${situation.unit}`,
          planDistance: `${situation.planCm} cm`,
          reelDistance: "?",
          questionLabel: "Distance réelle ?",
        }),
      };
    },
  },
    // ============================================================
  // ECHELLE_DISTANCE_PLAN
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_echelle_distance_plan_fixed_1_4m_1m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_plan",
    difficulty: 1,
    theme: "neutral",
    text: "Sur un plan, 1 cm représente 1 m. Une distance réelle mesure 4 m. Quelle distance faut-il dessiner sur le plan en cm ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Ici, 1 m en réalité correspond à 1 cm sur le plan.",
    explanation: exp([
      "Définition : on cherche la distance sur le plan.",
      "Méthode : avec cette échelle, 1 m en réalité correspond à 1 cm sur le plan.",
      "Calcul : 4 m correspondent à 4 cm.",
      "Conclusion : il faut dessiner 4 cm sur le plan.",
    ]),
    tags: ["cm2", "echelle", "distance_plan", "short", "canvas"],
    canvas: distancePlanCanvas({
      echelleLabel: "1 cm → 1 m",
      planDistance: "?",
      reelDistance: "4 m",
      questionLabel: "Distance sur le plan ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_plan_fixed_2_6m_1m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_plan",
    difficulty: 1,
    theme: "neutral",
    text: "Sur un plan de classe, 1 cm représente 1 m. Le mur mesure 6 m en réalité. Quelle longueur aura-t-il sur le plan ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "1 m réel correspond à 1 cm sur le plan.",
    explanation: exp([
      "Définition : on cherche la longueur sur le plan.",
      "Méthode : 1 cm représente 1 m.",
      "Calcul : 6 m correspondent à 6 cm.",
      "Conclusion : le mur mesure 6 cm sur le plan.",
    ]),
    tags: ["cm2", "echelle", "distance_plan", "classe", "short", "canvas"],
    canvas: distancePlanCanvas({
      echelleLabel: "1 cm → 1 m",
      planDistance: "?",
      reelDistance: "6 m",
      questionLabel: "Longueur sur le plan ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_plan_fixed_3_30m_10m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_plan",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une carte, 1 cm représente 10 m. Une allée mesure 30 m en réalité. Quelle longueur aura-t-elle sur la carte ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Cherche combien de fois 10 m dans 30 m.",
    explanation: exp([
      "Définition : on cherche la distance sur la carte.",
      "Méthode : 1 cm représente 10 m.",
      "Calcul : 30 ÷ 10 = 3.",
      "Conclusion : l’allée mesure 3 cm sur la carte.",
    ]),
    tags: ["cm2", "echelle", "distance_plan", "allee", "division", "short", "canvas"],
    canvas: distancePlanCanvas({
      echelleLabel: "1 cm → 10 m",
      planDistance: "?",
      reelDistance: "30 m",
      questionLabel: "Distance sur la carte ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_plan_fixed_4_70m_10m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_plan",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une carte d’un parc, 1 cm représente 10 m. Un chemin mesure 70 m en réalité. Quelle longueur mesure-t-il sur la carte ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Chaque centimètre représente 10 m.",
    explanation: exp([
      "Définition : on veut retrouver la distance sur le plan.",
      "Méthode : 1 cm représente 10 m.",
      "Calcul : 70 ÷ 10 = 7.",
      "Conclusion : le chemin mesure 7 cm sur la carte.",
    ]),
    tags: ["cm2", "echelle", "distance_plan", "parc", "short", "canvas"],
    canvas: distancePlanCanvas({
      echelleLabel: "1 cm → 10 m",
      planDistance: "?",
      reelDistance: "70 m",
      questionLabel: "Distance sur la carte ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_plan_fixed_5_400m_100m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_plan",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une carte, 1 cm représente 100 m. Une distance réelle mesure 400 m. Quelle distance cela fait-il sur la carte ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Cherche combien de fois 100 m dans 400 m.",
    explanation: exp([
      "Définition : on cherche la distance sur la carte.",
      "Méthode : 1 cm représente 100 m.",
      "Calcul : 400 ÷ 100 = 4.",
      "Conclusion : cela fait 4 cm sur la carte.",
    ]),
    tags: ["cm2", "echelle", "distance_plan", "carte", "short", "canvas"],
    canvas: distancePlanCanvas({
      echelleLabel: "1 cm → 100 m",
      planDistance: "?",
      reelDistance: "400 m",
      questionLabel: "Distance sur la carte ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_plan_fixed_6_600m_100m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_plan",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une carte du quartier, 1 cm représente 100 m. L’école est à 600 m du stade. Quelle distance mesure-t-on sur la carte ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "600 ÷ 100 = ?",
    explanation: exp([
      "Définition : on cherche la distance sur la carte.",
      "Méthode : 1 cm représente 100 m.",
      "Calcul : 600 ÷ 100 = 6.",
      "Conclusion : on mesure 6 cm sur la carte.",
    ]),
    tags: ["cm2", "echelle", "distance_plan", "quartier", "ecole", "short", "canvas"],
    canvas: distancePlanCanvas({
      echelleLabel: "1 cm → 100 m",
      planDistance: "?",
      reelDistance: "600 m",
      questionLabel: "Distance sur la carte ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_plan_fixed_7_1000m_200m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_plan",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une carte, 1 cm représente 200 m. Un trajet mesure 1000 m en réalité. Quelle distance mesure-t-il sur la carte ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Cherche combien de fois 200 m dans 1000 m.",
    explanation: exp([
      "Définition : on cherche la distance sur la carte.",
      "Méthode : 1 cm représente 200 m.",
      "Calcul : 1000 ÷ 200 = 5.",
      "Conclusion : le trajet mesure 5 cm sur la carte.",
    ]),
    tags: ["cm2", "echelle", "distance_plan", "trajet", "division", "short", "canvas"],
    canvas: distancePlanCanvas({
      echelleLabel: "1 cm → 200 m",
      planDistance: "?",
      reelDistance: "1000 m",
      questionLabel: "Distance sur la carte ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_plan_fixed_8_25m_10m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_plan",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un plan, 1 cm représente 10 m. Une distance réelle mesure 25 m. Quelle distance cela fait-il sur le plan ?",
    format: "short",
    expected: ["2.5", "2,5"],
    comparator: "number_equal",
    hint: "25 ÷ 10 = 2,5.",
    explanation: exp([
      "Définition : on cherche la distance sur le plan.",
      "Méthode : 1 cm représente 10 m.",
      "Calcul : 25 ÷ 10 = 2,5.",
      "Conclusion : cela fait 2,5 cm sur le plan.",
    ]),
    tags: ["cm2", "echelle", "distance_plan", "decimal", "short", "canvas"],
    canvas: distancePlanCanvas({
      echelleLabel: "1 cm → 10 m",
      planDistance: "?",
      reelDistance: "25 m",
      questionLabel: "Distance sur le plan ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_plan_fixed_9_150m_100m",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_plan",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une carte, 1 cm représente 100 m. Une distance réelle mesure 150 m. Quelle distance cela fait-il sur la carte ?",
    format: "short",
    expected: ["1.5", "1,5"],
    comparator: "number_equal",
    hint: "150 ÷ 100 = 1,5.",
    explanation: exp([
      "Définition : on cherche la distance sur la carte.",
      "Méthode : 1 cm représente 100 m.",
      "Calcul : 150 ÷ 100 = 1,5.",
      "Conclusion : cela fait 1,5 cm sur la carte.",
    ]),
    tags: ["cm2", "echelle", "distance_plan", "decimal", "short", "canvas"],
    canvas: distancePlanCanvas({
      echelleLabel: "1 cm → 100 m",
      planDistance: "?",
      reelDistance: "150 m",
      questionLabel: "Distance sur la carte ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_plan_fixed_10_reunion_sentier",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_plan",
    difficulty: 2,
    theme: "reunion",
    text: "Sur une carte de sentier à La Réunion, 1 cm représente 100 m. Le bassin est à 500 m. Quelle distance cela fait-il sur la carte ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "500 ÷ 100 = ?",
    explanation: exp([
      "Définition : on cherche la distance sur la carte.",
      "Méthode : 1 cm représente 100 m.",
      "Calcul : 500 ÷ 100 = 5.",
      "Conclusion : cela fait 5 cm sur la carte.",
    ]),
    tags: ["cm2", "echelle", "distance_plan", "reunion", "sentier", "short", "canvas"],
    canvas: distancePlanCanvas({
      echelleLabel: "1 cm → 100 m",
      planDistance: "?",
      reelDistance: "500 m",
      questionLabel: "Distance sur la carte ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_plan_fixed_11_sport_stade",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_plan",
    difficulty: 2,
    theme: "sport",
    text: "Sur le plan d’un stade, 1 cm représente 10 m. Une ligne mesure 90 m en réalité. Quelle longueur a-t-elle sur le plan ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "90 ÷ 10 = ?",
    explanation: exp([
      "Définition : on cherche la longueur dessinée sur le plan.",
      "Méthode : 1 cm représente 10 m.",
      "Calcul : 90 ÷ 10 = 9.",
      "Conclusion : la ligne mesure 9 cm sur le plan.",
    ]),
    tags: ["cm2", "echelle", "distance_plan", "sport", "stade", "short", "canvas"],
    canvas: distancePlanCanvas({
      echelleLabel: "1 cm → 10 m",
      planDistance: "?",
      reelDistance: "90 m",
      questionLabel: "Longueur sur le plan ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_plan_fixed_12_erreur_multiplier",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_plan",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une carte, 1 cm représente 100 m. Une distance réelle mesure 400 m. Un élève répond 40000 cm sur la carte. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour revenir au plan, on divise par 100.",
    explanation: exp([
      "Définition : on cherche la distance sur la carte.",
      "Méthode : 1 cm représente 100 m, donc on cherche combien de groupes de 100 m il y a dans 400 m.",
      "Calcul : 400 ÷ 100 = 4.",
      "Conclusion : l’élève a tort. La distance sur la carte est 4 cm.",
    ]),
    tags: ["cm2", "echelle", "distance_plan", "erreur", "qcm", "canvas"],
    canvas: distancePlanCanvas({
      echelleLabel: "1 cm → 100 m",
      planDistance: "?",
      reelDistance: "400 m",
      questionLabel: "Attention : on divise.",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_plan_fixed_13_erreur_unite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_plan",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un plan, 1 cm représente 10 m. Une distance réelle mesure 60 m. Un élève répond 60 cm sur le plan. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "60 m représente plusieurs fois 10 m.",
    explanation: exp([
      "Définition : on cherche la distance sur le plan, pas la distance réelle.",
      "Méthode : 1 cm représente 10 m.",
      "Calcul : 60 ÷ 10 = 6.",
      "Conclusion : l’élève a tort. La distance sur le plan est 6 cm.",
    ]),
    tags: ["cm2", "echelle", "distance_plan", "erreur_unite", "qcm", "canvas"],
    canvas: distancePlanCanvas({
      echelleLabel: "1 cm → 10 m",
      planDistance: "?",
      reelDistance: "60 m",
      questionLabel: "Attention à la question.",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_distance_plan_fixed_14_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_plan",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment retrouver une distance sur le plan à partir d’une distance réelle.",
    format: "open",
    expected: ["échelle", "distance réelle", "diviser", "distance sur le plan", "unité"],
    comparator: "contains_keyword",
    hint: "Cherche combien de fois la distance représentée par 1 cm entre dans la distance réelle.",
    explanation: exp([
      "Pour retrouver une distance sur le plan, on lit d’abord l’échelle.",
      "Ensuite, on cherche combien de fois la distance réelle représentée par 1 cm est contenue dans la distance réelle donnée.",
      "Souvent, on fait une division.",
      "On écrit ensuite la distance sur le plan en centimètres.",
    ]),
    tags: ["cm2", "echelle", "distance_plan", "open", "methode"],
  },

  {
    kind: "template",
    id: "cm2_echelle_distance_plan_tpl_1_simple",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_plan",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise la distance réelle par la valeur réelle représentée par 1 cm.",
    tags: ["cm2", "echelle", "distance_plan", "template", "short", "canvas"],
    generate: () => {
      const oneCm = randomChoice([2, 5, 10, 20, 50, 100]);
      const planCm = randomChoice([2, 3, 4, 5, 6, 7, 8]);
      const reel = oneCm * planCm;

      return {
        text: `Sur une carte, 1 cm représente ${oneCm} m. Une distance réelle mesure ${reel} m. Quelle distance mesure-t-on sur la carte en cm ?`,
        format: "short",
        expected: [String(planCm)],
        comparator: "number_equal",
        explanation: exp([
          "Définition : on cherche la distance sur la carte.",
          `Méthode : 1 cm représente ${oneCm} m.`,
          `Calcul : ${reel} ÷ ${oneCm} = ${planCm}.`,
          `Conclusion : on mesure ${planCm} cm sur la carte.`,
        ]),
        canvas: distancePlanCanvas({
          echelleLabel: `1 cm → ${oneCm} m`,
          planDistance: "?",
          reelDistance: `${reel} m`,
          questionLabel: "Distance sur la carte ?",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_echelle_distance_plan_tpl_2_decimaux",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_plan",
    difficulty: 3,
    theme: "neutral",
    hint: "Le résultat peut être un nombre décimal.",
    tags: ["cm2", "echelle", "distance_plan", "template", "decimal", "short", "canvas"],
    generate: () => {
      const situation = randomChoice([
        { oneCm: 10, reel: 15, planCm: 1.5 },
        { oneCm: 10, reel: 25, planCm: 2.5 },
        { oneCm: 100, reel: 150, planCm: 1.5 },
        { oneCm: 100, reel: 250, planCm: 2.5 },
      ]);

      return {
        text: `Sur une carte, 1 cm représente ${situation.oneCm} m. Une distance réelle mesure ${situation.reel} m. Quelle distance cela fait-il sur la carte en cm ?`,
        format: "short",
        expected: [String(situation.planCm), formatNumber(situation.planCm)],
        comparator: "number_equal",
        explanation: exp([
          "Définition : on cherche la distance sur la carte.",
          `Méthode : 1 cm représente ${situation.oneCm} m.`,
          `Calcul : ${situation.reel} ÷ ${situation.oneCm} = ${formatNumber(situation.planCm)}.`,
          `Conclusion : cela fait ${formatNumber(situation.planCm)} cm sur la carte.`,
        ]),
        canvas: distancePlanCanvas({
          echelleLabel: `1 cm → ${situation.oneCm} m`,
          planDistance: "?",
          reelDistance: `${situation.reel} m`,
          questionLabel: "Distance sur la carte ?",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_echelle_distance_plan_tpl_3_contextes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_distance_plan",
    difficulty: 3,
    theme: "neutral",
    hint: "Identifie l’échelle, puis divise.",
    tags: ["cm2", "echelle", "distance_plan", "template", "contexte", "short", "canvas"],
    generate: () => {
      const situation = randomChoice([
        {
          context: "Sur le plan d’un stade",
          oneCm: 10,
          reel: 80,
          plan: 8,
          unit: "m",
        },
        {
          context: "Sur une carte d’un parc",
          oneCm: 100,
          reel: 500,
          plan: 5,
          unit: "m",
        },
        {
          context: "Sur un plan de classe",
          oneCm: 1,
          reel: 7,
          plan: 7,
          unit: "m",
        },
        {
          context: "Sur une carte de sentier",
          oneCm: 100,
          reel: 700,
          plan: 7,
          unit: "m",
        },
      ]);

      return {
        text: `${situation.context}, 1 cm représente ${situation.oneCm} ${situation.unit}. Une distance réelle mesure ${situation.reel} ${situation.unit}. Quelle distance mesure-t-on sur le plan ?`,
        format: "short",
        expected: [String(situation.plan)],
        comparator: "number_equal",
        explanation: exp([
          "Définition : on veut revenir de la réalité vers le plan.",
          `Méthode : 1 cm représente ${situation.oneCm} ${situation.unit}.`,
          `Calcul : ${situation.reel} ÷ ${situation.oneCm} = ${situation.plan}.`,
          `Conclusion : on mesure ${situation.plan} cm sur le plan.`,
        ]),
        canvas: distancePlanCanvas({
          echelleLabel: `1 cm → ${situation.oneCm} ${situation.unit}`,
          planDistance: "?",
          reelDistance: `${situation.reel} ${situation.unit}`,
          questionLabel: "Distance sur le plan ?",
        }),
      };
    },
  },
    // ============================================================
  // ECHELLE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_echelle_defi_fixed_1_parc_aller_retour",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Sur une carte d’un parc, 1 cm représente 100 m. Un chemin mesure 3 cm sur la carte. Quelle distance parcourt-on en faisant l’aller-retour ?",
    format: "short",
    expected: ["600"],
    comparator: "number_equal",
    hint: "Calcule d’abord l’aller, puis double la distance.",
    explanation: exp([
      "Définition : on utilise l’échelle pour passer de la carte à la réalité.",
      "Méthode : on calcule d’abord la distance réelle pour l’aller.",
      "Calcul : 3 × 100 m = 300 m. Pour l’aller-retour : 300 m × 2 = 600 m.",
      "Conclusion : on parcourt 600 m.",
    ]),
    tags: ["cm2", "echelle", "defi", "aller_retour", "parc", "short", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 100 m",
      planDistance: "3 cm",
      reelDistance: "?",
      questionLabel: "Distance aller-retour ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_defi_fixed_2_stade_tour",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_defi",
    difficulty: 4,
    theme: "sport",
    text: "Sur le plan d’un stade, 1 cm représente 10 m. Une longueur du terrain mesure 9 cm. Quelle est cette longueur réelle ?",
    format: "short",
    expected: ["90"],
    comparator: "number_equal",
    hint: "Calcule 9 × 10.",
    explanation: exp([
      "Définition : on cherche une longueur réelle.",
      "Méthode : 1 cm représente 10 m.",
      "Calcul : 9 × 10 m = 90 m.",
      "Conclusion : la longueur réelle du terrain est 90 m.",
    ]),
    tags: ["cm2", "echelle", "defi", "sport", "stade", "short", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 10 m",
      planDistance: "9 cm",
      reelDistance: "?",
      questionLabel: "Longueur réelle du terrain ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_defi_fixed_3_classe_tableau",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Sur un plan de classe, 1 cm représente 1 m. Le tableau est à 4 cm du fond de la classe sur le plan. Quelle est la distance réelle ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Avec cette échelle, 4 cm sur le plan représentent 4 m en réalité.",
    explanation: exp([
      "Définition : on utilise l’échelle du plan de classe.",
      "Méthode : 1 cm représente 1 m.",
      "Calcul : 4 × 1 m = 4 m.",
      "Conclusion : la distance réelle est 4 m.",
    ]),
    tags: ["cm2", "echelle", "defi", "classe", "short", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 1 m",
      planDistance: "4 cm",
      reelDistance: "?",
      questionLabel: "Distance réelle ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_defi_fixed_4_carte_quartier_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Sur une carte du quartier, 1 cm représente 100 m. L’école est à 2 cm du parc, puis le parc est à 3 cm de la médiathèque. Quelle distance réelle parcourt-on au total ?",
    format: "short",
    expected: ["500"],
    comparator: "number_equal",
    hint: "Additionne d’abord les distances sur la carte : 2 cm + 3 cm.",
    explanation: exp([
      "Définition : on cherche une distance réelle totale.",
      "Méthode : on additionne les distances sur la carte, puis on utilise l’échelle.",
      "Calcul : 2 cm + 3 cm = 5 cm. Puis 5 × 100 m = 500 m.",
      "Conclusion : on parcourt 500 m en réalité.",
    ]),
    tags: ["cm2", "echelle", "defi", "quartier", "addition", "short", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 100 m",
      planDistance: "2 cm + 3 cm",
      reelDistance: "?",
      questionLabel: "Distance réelle totale ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_defi_fixed_5_reunion_sentier_aller_retour",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Sur une carte d’un sentier à La Réunion, 1 cm représente 100 m. Le trajet jusqu’au bassin mesure 4 cm sur la carte. Quelle distance parcourt-on en faisant l’aller-retour ?",
    format: "short",
    expected: ["800"],
    comparator: "number_equal",
    hint: "Calcule l’aller, puis multiplie par 2.",
    explanation: exp([
      "Définition : on utilise l’échelle pour trouver la distance réelle.",
      "Méthode : 4 cm représentent 4 fois 100 m.",
      "Calcul : 4 × 100 m = 400 m pour l’aller. Aller-retour : 400 m × 2 = 800 m.",
      "Conclusion : on parcourt 800 m.",
    ]),
    tags: ["cm2", "echelle", "defi", "reunion", "sentier", "aller_retour", "short", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 100 m",
      planDistance: "4 cm",
      reelDistance: "?",
      questionLabel: "Distance aller-retour ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_defi_fixed_6_distance_plan_carte",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Sur une carte, 1 cm représente 100 m. Une distance réelle est de 800 m. Quelle distance mesure-t-on sur la carte ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Pour revenir à la carte, divise par 100.",
    explanation: exp([
      "Définition : on cherche la distance sur la carte.",
      "Méthode : 1 cm représente 100 m.",
      "Calcul : 800 ÷ 100 = 8.",
      "Conclusion : on mesure 8 cm sur la carte.",
    ]),
    tags: ["cm2", "echelle", "defi", "distance_plan", "division", "short", "canvas"],
    canvas: distancePlanCanvas({
      echelleLabel: "1 cm → 100 m",
      planDistance: "?",
      reelDistance: "800 m",
      questionLabel: "Distance sur la carte ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_defi_fixed_7_distance_plan_stade",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_defi",
    difficulty: 4,
    theme: "sport",
    text: "Sur le plan d’un stade, 1 cm représente 10 m. Une ligne réelle mesure 50 m. Quelle longueur faut-il dessiner sur le plan ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Cherche combien de fois 10 m dans 50 m.",
    explanation: exp([
      "Définition : on cherche la distance sur le plan.",
      "Méthode : 1 cm représente 10 m.",
      "Calcul : 50 ÷ 10 = 5.",
      "Conclusion : il faut dessiner 5 cm sur le plan.",
    ]),
    tags: ["cm2", "echelle", "defi", "sport", "distance_plan", "short", "canvas"],
    canvas: distancePlanCanvas({
      echelleLabel: "1 cm → 10 m",
      planDistance: "?",
      reelDistance: "50 m",
      questionLabel: "Longueur à dessiner ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_defi_fixed_8_demi_distance",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Sur une carte, 1 cm représente 100 m. Un trajet réel de 250 m doit être dessiné. Quelle distance cela fait-il sur la carte ?",
    format: "short",
    expected: ["2.5", "2,5"],
    comparator: "number_equal",
    hint: "250 ÷ 100 = 2,5.",
    explanation: exp([
      "Définition : on cherche la distance sur la carte.",
      "Méthode : 1 cm représente 100 m.",
      "Calcul : 250 ÷ 100 = 2,5.",
      "Conclusion : le trajet mesure 2,5 cm sur la carte.",
    ]),
    tags: ["cm2", "echelle", "defi", "decimal", "distance_plan", "short", "canvas"],
    canvas: distancePlanCanvas({
      echelleLabel: "1 cm → 100 m",
      planDistance: "?",
      reelDistance: "250 m",
      questionLabel: "Distance sur la carte ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_defi_fixed_9_conversion_km",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Sur une carte, 1 cm représente 200 m. Un trajet mesure 5 cm sur la carte. Quelle est la distance réelle en kilomètres ?",
    format: "qcm",
    choices: ["1 km", "1000 km", "100 m", "10 km"],
    expected: ["1 km"],
    comparator: "mcq_exact",
    hint: "Calcule d’abord en mètres, puis convertis en kilomètres.",
    explanation: exp([
      "Définition : on cherche une distance réelle, puis on la convertit.",
      "Méthode : 1 cm représente 200 m.",
      "Calcul : 5 × 200 m = 1000 m. Or 1000 m = 1 km.",
      "Conclusion : la distance réelle est 1 km.",
    ]),
    tags: ["cm2", "echelle", "defi", "conversion", "km", "qcm", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 200 m",
      planDistance: "5 cm",
      reelDistance: "?",
      questionLabel: "Distance réelle en kilomètres ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_defi_fixed_10_erreur_aller_retour",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Sur une carte, 1 cm représente 100 m. Un chemin mesure 3 cm. Un élève dit : “L’aller-retour mesure 300 m.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "300 m correspond seulement à l’aller.",
    explanation: exp([
      "Définition : un aller-retour correspond à deux fois l’aller.",
      "Méthode : on calcule d’abord l’aller.",
      "Calcul : 3 × 100 m = 300 m pour l’aller. Aller-retour : 300 m × 2 = 600 m.",
      "Conclusion : l’élève a tort. L’aller-retour mesure 600 m.",
    ]),
    tags: ["cm2", "echelle", "defi", "erreur", "aller_retour", "qcm", "canvas"],
    canvas: distanceReelleCanvas({
      echelleLabel: "1 cm → 100 m",
      planDistance: "3 cm",
      reelDistance: "?",
      questionLabel: "Attention : aller-retour.",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_defi_fixed_11_erreur_sens",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Sur une carte, 1 cm représente 100 m. Une distance réelle mesure 500 m. Un élève calcule 500 × 100. A-t-il choisi la bonne opération ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "On cherche une distance sur la carte, donc on revient vers le plan.",
    explanation: exp([
      "Définition : on cherche ici une distance sur la carte.",
      "Méthode : 1 cm représente 100 m, donc il faut chercher combien de fois 100 m dans 500 m.",
      "Calcul correct : 500 ÷ 100 = 5.",
      "Conclusion : il fallait diviser, pas multiplier.",
    ]),
    tags: ["cm2", "echelle", "defi", "erreur", "operation", "qcm", "canvas"],
    canvas: distancePlanCanvas({
      echelleLabel: "1 cm → 100 m",
      planDistance: "?",
      reelDistance: "500 m",
      questionLabel: "Multiplier ou diviser ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm2_echelle_defi_fixed_12_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment savoir s’il faut multiplier ou diviser dans un problème d’échelle.",
    format: "open",
    expected: ["plan", "réalité", "multiplier", "diviser", "échelle"],
    comparator: "contains_keyword",
    hint: "Regarde si tu pars du plan vers la réalité ou de la réalité vers le plan.",
    explanation: exp([
      "Si on part d’une distance sur le plan pour trouver la distance réelle, on multiplie par ce que représente 1 cm.",
      "Si on part d’une distance réelle pour trouver la distance sur le plan, on divise par ce que représente 1 cm.",
      "La première étape est donc de repérer le sens du problème : plan vers réalité, ou réalité vers plan.",
    ]),
    tags: ["cm2", "echelle", "defi", "open", "methode", "operation"],
  },

  {
    kind: "fixed",
    id: "cm2_echelle_defi_fixed_13_open_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi il ne faut pas additionner les nombres dans l’échelle “1 cm → 100 m” pour calculer 4 cm.",
    format: "open",
    expected: ["proportionnalité", "multiplier", "4", "100", "400"],
    comparator: "contains_keyword",
    hint: "4 cm, c’est 4 fois 1 cm.",
    explanation: exp([
      "Une échelle est une situation de proportionnalité.",
      "Si 1 cm représente 100 m, alors 4 cm représentent 4 fois 100 m.",
      "Il faut donc multiplier : 4 × 100 m = 400 m.",
      "On ne fait pas 4 + 100.",
    ]),
    tags: ["cm2", "echelle", "defi", "open", "erreur", "proportionnalite"],
  },

  {
    kind: "template",
    id: "cm2_echelle_defi_tpl_1_aller_retour",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule l’aller, puis multiplie par 2.",
    tags: ["cm2", "echelle", "defi", "template", "aller_retour", "short", "canvas"],
    generate: () => {
      const situation = randomChoice([
        { oneCm: 10, planCm: 4 },
        { oneCm: 20, planCm: 3 },
        { oneCm: 100, planCm: 5 },
        { oneCm: 200, planCm: 2 },
      ]);

      const aller = situation.oneCm * situation.planCm;
      const retour = aller * 2;

      return {
        text: `Sur une carte, 1 cm représente ${situation.oneCm} m. Un trajet mesure ${situation.planCm} cm sur la carte. Quelle distance réelle parcourt-on en faisant l’aller-retour ?`,
        format: "short",
        expected: [String(retour)],
        comparator: "number_equal",
        explanation: exp([
          "Définition : un aller-retour correspond à deux fois la distance de l’aller.",
          `Méthode : on calcule d’abord l’aller avec l’échelle.`,
          `Calcul : ${situation.planCm} × ${situation.oneCm} m = ${aller} m pour l’aller.`,
          `Puis ${aller} m × 2 = ${retour} m.`,
          `Conclusion : l’aller-retour mesure ${retour} m.`,
        ]),
        canvas: distanceReelleCanvas({
          echelleLabel: `1 cm → ${situation.oneCm} m`,
          planDistance: `${situation.planCm} cm`,
          reelDistance: "?",
          questionLabel: "Distance aller-retour ?",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_echelle_defi_tpl_2_trajet_en_deux_parties",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les distances sur la carte avant d’utiliser l’échelle.",
    tags: ["cm2", "echelle", "defi", "template", "trajet", "addition", "short", "canvas"],
    generate: () => {
      const situation = randomChoice([
        { oneCm: 10, a: 2, b: 3 },
        { oneCm: 20, a: 1, b: 4 },
        { oneCm: 100, a: 2, b: 5 },
        { oneCm: 50, a: 3, b: 4 },
      ]);

      const totalPlan = situation.a + situation.b;
      const totalReel = totalPlan * situation.oneCm;

      return {
        text: `Sur une carte, 1 cm représente ${situation.oneCm} m. Un trajet mesure d’abord ${situation.a} cm, puis ${situation.b} cm. Quelle est la distance réelle totale ?`,
        format: "short",
        expected: [String(totalReel)],
        comparator: "number_equal",
        explanation: exp([
          "Définition : on cherche la distance réelle totale.",
          "Méthode : on additionne d’abord les distances sur la carte.",
          `Calcul : ${situation.a} cm + ${situation.b} cm = ${totalPlan} cm.`,
          `Puis ${totalPlan} × ${situation.oneCm} m = ${totalReel} m.`,
          `Conclusion : la distance réelle totale est ${totalReel} m.`,
        ]),
        canvas: distanceReelleCanvas({
          echelleLabel: `1 cm → ${situation.oneCm} m`,
          planDistance: `${situation.a} cm + ${situation.b} cm`,
          reelDistance: "?",
          questionLabel: "Distance réelle totale ?",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_echelle_defi_tpl_3_distance_plan",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour revenir au plan, divise.",
    tags: ["cm2", "echelle", "defi", "template", "distance_plan", "short", "canvas"],
    generate: () => {
      const situation = randomChoice([
        { oneCm: 10, plan: 6 },
        { oneCm: 20, plan: 5 },
        { oneCm: 100, plan: 8 },
        { oneCm: 200, plan: 4 },
      ]);

      const reel = situation.oneCm * situation.plan;

      return {
        text: `Sur une carte, 1 cm représente ${situation.oneCm} m. Une distance réelle mesure ${reel} m. Quelle distance mesure-t-on sur la carte ?`,
        format: "short",
        expected: [String(situation.plan)],
        comparator: "number_equal",
        explanation: exp([
          "Définition : on cherche la distance sur la carte.",
          `Méthode : 1 cm représente ${situation.oneCm} m.`,
          `Calcul : ${reel} ÷ ${situation.oneCm} = ${situation.plan}.`,
          `Conclusion : la distance sur la carte est ${situation.plan} cm.`,
        ]),
        canvas: distancePlanCanvas({
          echelleLabel: `1 cm → ${situation.oneCm} m`,
          planDistance: "?",
          reelDistance: `${reel} m`,
          questionLabel: "Distance sur la carte ?",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_echelle_defi_tpl_4_erreurs",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelle",
    microId: "echelle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Vérifie le sens du problème et l’opération.",
    tags: ["cm2", "echelle", "defi", "template", "erreur", "qcm", "canvas"],
    generate: () => {
      const situation = randomChoice([
        {
          text: "Sur une carte, 1 cm représente 100 m. Une distance mesure 4 cm. Un élève répond 104 m. A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. Il faut multiplier : 4 × 100 m = 400 m. On ne fait pas 100 + 4.",
          canvas: distanceReelleCanvas({
            echelleLabel: "1 cm → 100 m",
            planDistance: "4 cm",
            reelDistance: "?",
            questionLabel: "Erreur d’addition ?",
          }),
        },
        {
          text: "Sur une carte, 1 cm représente 100 m. Une distance réelle mesure 500 m. Un élève répond 5 cm. A-t-il raison ?",
          expected: "oui",
          explanation:
            "Oui. Pour revenir à la carte, on divise : 500 ÷ 100 = 5 cm.",
          canvas: distancePlanCanvas({
            echelleLabel: "1 cm → 100 m",
            planDistance: "?",
            reelDistance: "500 m",
            questionLabel: "Retour vers le plan.",
          }),
        },
        {
          text: "Sur une carte, 1 cm représente 10 m. Une distance mesure 6 cm. Un élève répond 60 cm en réalité. A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. L’échelle indique des mètres : 6 × 10 m = 60 m, pas 60 cm.",
          canvas: distanceReelleCanvas({
            echelleLabel: "1 cm → 10 m",
            planDistance: "6 cm",
            reelDistance: "?",
            questionLabel: "Attention à l’unité.",
          }),
        },
        {
          text: "Sur une carte, 1 cm représente 200 m. Un trajet de 5 cm représente 1 km. Est-ce correct ?",
          expected: "oui",
          explanation:
            "Oui. 5 × 200 m = 1000 m, et 1000 m = 1 km.",
          canvas: distanceReelleCanvas({
            echelleLabel: "1 cm → 200 m",
            planDistance: "5 cm",
            reelDistance: "?",
            questionLabel: "Conversion en km.",
          }),
        },
      ]);

      return {
        text: situation.text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [situation.expected],
        comparator: "mcq_exact",
        explanation: exp([
          "Définition : dans un problème d’échelle, il faut choisir la bonne opération et la bonne unité.",
          `Conclusion : ${situation.explanation}`,
        ]),
        canvas: situation.canvas,
      };
    },
  },
];
