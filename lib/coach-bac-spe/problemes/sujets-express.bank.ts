// lib/coach-bac-spe/problemes/sujets-express.bank.ts

import type { CoachBacProblem } from "../types";

export const sujetsExpressBank: CoachBacProblem[] = [
  {
    id: "sujet_express_01",
    title: "Sujet express 1 — Première semaine",
    notions: ["suites", "derivees", "probabilites", "exponentielle", "logarithme"],
    difficulty: 3,
    durationMinutes: 30,
    intro: "Mini-sujet de consolidation : automatismes essentiels et pièges de base.",
    steps: [
      {
        id: "q1",
        text: "Calculer la dérivée de f(x)=x²-4x+1.",
        format: "open",
        hint: "Dérive terme à terme.",
        explanation: "f'(x)=2x-4.",
      },
      {
        id: "q2",
        text: "Une suite arithmétique vérifie u₀=4 et r=3. Calculer u₅.",
        format: "open",
        hint: "uₙ=u₀+nr.",
        explanation: "u₅=4+5×3=19.",
      },
      {
        id: "q3",
        text: "Calculer P(A∩B) si P(A)=0,4 et P_A(B)=0,7.",
        format: "open",
        hint: "Multiplie.",
        explanation: "P(A∩B)=0,4×0,7=0,28.",
      },
      {
        id: "q4",
        text: "Donner la valeur de e⁰ et ln(1).",
        format: "open",
        hint: "Ce sont deux valeurs remarquables.",
        explanation: "e⁰=1 et ln(1)=0.",
      },
    ],
    tags: ["sujet_express", "semaine_1"],
  },

  {
    id: "sujet_express_02",
    title: "Sujet express 2 — Fonctions et probabilités",
    notions: ["fonctions", "limites", "exponentielle", "logarithme", "variables_aleatoires"],
    difficulty: 3,
    durationMinutes: 30,
    intro: "Mini-sujet de deuxième semaine : lecture, calculs et interprétation.",
    steps: [
      {
        id: "q1",
        text: "Si f'(x)>0 sur un intervalle I, que peut-on dire de f sur I ?",
        format: "open",
        hint: "Signe de la dérivée.",
        explanation: "f est croissante sur I.",
      },
      {
        id: "q2",
        text: "Déterminer la limite de (2x²+1)/(x²+3) quand x tend vers +∞.",
        format: "open",
        hint: "Compare les termes dominants.",
        explanation: "La limite vaut 2.",
      },
      {
        id: "q3",
        text: "Résoudre ln(x)=0.",
        format: "open",
        hint: "ln(1)=0.",
        explanation: "x=1.",
      },
      {
        id: "q4",
        text: "X vaut 0 avec probabilité 0,5 et 10 avec probabilité 0,5. Calculer E(X).",
        format: "open",
        hint: "Moyenne pondérée.",
        explanation: "E(X)=0×0,5+10×0,5=5.",
      },
    ],
    tags: ["sujet_express", "semaine_2"],
  },

  {
    id: "sujet_express_03",
    title: "Sujet express 3 — Chronométré",
    notions: ["synthese"],
    difficulty: 4,
    durationMinutes: 30,
    intro: "Dernier sujet court avant le bilan final.",
    steps: [
      {
        id: "q1",
        text: "Calculer la dérivée de e^(2x+1).",
        format: "open",
        hint: "Dérivée composée.",
        explanation: "La dérivée est 2e^(2x+1).",
      },
      {
        id: "q2",
        text: "Dans un arbre, expliquer quand on multiplie et quand on additionne.",
        format: "open",
        hint: "Chemin ou chemins différents ?",
        explanation: "On multiplie le long d’un chemin et on additionne des chemins différents.",
      },
      {
        id: "q3",
        text: "Déterminer le domaine de ln(x-2).",
        format: "open",
        hint: "x-2 doit être strictement positif.",
        explanation: "Il faut x>2.",
      },
    ],
    tags: ["sujet_express", "chronometre"],
  },

  {
    id: "sujet_express_final",
    title: "Sujet express final — Grand bilan",
    notions: ["synthese"],
    difficulty: 4,
    durationMinutes: 35,
    intro: "Dernier bilan : automatismes, pièges et méthodes rentables.",
    steps: [
      {
        id: "q1",
        text: "Pourquoi la dérivée de x+e est-elle 1 ?",
        format: "open",
        hint: "e est une constante.",
        explanation: "La dérivée de x est 1 et celle de e est 0.",
      },
      {
        id: "q2",
        text: "Donner une erreur fréquente avec ln(a+b).",
        format: "open",
        hint: "Il n’y a pas de propriété simple sur une somme.",
        explanation: "L’erreur est d’écrire ln(a+b)=ln(a)+ln(b), ce qui est faux en général.",
      },
      {
        id: "q3",
        text: "Si u₀=10 et r=2 pour une suite arithmétique, calculer u₁₀.",
        format: "open",
        hint: "Attention au départ à u₀.",
        explanation: "u₁₀=10+10×2=30.",
      },
      {
        id: "q4",
        text: "Si une espérance de gain est négative, interpréter le résultat.",
        format: "open",
        hint: "Gain moyen à long terme.",
        explanation: "Le jeu est défavorable au joueur à long terme.",
      },
    ],
    tags: ["sujet_express", "final"],
  },
];