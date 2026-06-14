// lib/calcul-rapide/data/terminale-spe/problemes.templates.ts

import type { CalculRapideItem } from "../../types";

export const problemesTemplatesTerminaleSpe: CalculRapideItem[] = [
  {
    id: "terminale_spe_template_probleme_tangente_001",
    niveau: "terminale-spe",
    type: "probleme",
    mode: "template",
    notionId: "derivation",
    microId: "tangente_coefficient_directeur",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "On sait que f'({{a}}) = {{m}}. Quel est le coefficient directeur de la tangente au point d’abscisse {{a}} ?",
    },
    template:
      "On sait que f'({{a}}) = {{m}}. Quel est le coefficient directeur de la tangente au point d’abscisse {{a}} ?",
    variables: {
      a: [1, 2, 3, 4, 5],
      m: [-4, -3, -2, 2, 3, 4, 5, 6],
    },
    answerRule: "m",
    hint: "Le coefficient directeur de la tangente en x=a est f'(a).",
    explanationTemplate:
      "Le coefficient directeur de la tangente au point d’abscisse {{a}} est f'({{a}}), donc {{answer}}.",
    tags: ["derivation", "tangente", "bac"],
  },

  {
    id: "terminale_spe_template_probleme_evolution_geo_001",
    niveau: "terminale-spe",
    type: "probleme",
    mode: "template",
    notionId: "suites",
    microId: "suite_geometrique_modele",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une quantité vaut {{u0}} au départ et double {{n}} fois. Quelle est sa valeur finale ?",
    },
    template:
      "Une quantité vaut {{u0}} au départ et double {{n}} fois. Quelle est sa valeur finale ?",
    variables: {
      u0: [35, 45, 75, 125, 225],
      n: [3, 4, 5, 6],
    },
    answerRule: "u0 * Math.pow(2, n)",
    hint: "Doubler n fois revient à multiplier par 2^n.",
    explanationTemplate: "Valeur finale = {{u0}} × 2^{{n}} = {{answer}}.",
    tags: ["suites", "geometrique", "evolution"],
  },

  {
    id: "terminale_spe_template_probleme_ln_exp_001",
    niveau: "terminale-spe",
    type: "probleme",
    mode: "template",
    notionId: "logarithme",
    microId: "ln_exp_simplifier",
    difficulty: 2,
    durationSec: 45,
    media: {
      text: "Dans un calcul de bac, on obtient ln(e^{{a}}). Quelle est la valeur simplifiée ?",
    },
    template:
      "Dans un calcul de bac, on obtient ln(e^{{a}}). Quelle est la valeur simplifiée ?",
    variables: {
      a: [4, 5, 6, 7, 8, 9, 10],
    },
    answerRule: "a",
    hint: "ln(e^a)=a.",
    explanationTemplate: "ln(e^{{a}}) = {{answer}}.",
    tags: ["logarithme", "exponentielle", "bac"],
  },

  {
    id: "terminale_spe_template_probleme_binomiale_001",
    niveau: "terminale-spe",
    type: "probleme",
    mode: "template",
    notionId: "probabilites",
    microId: "loi_binomiale_esperance",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "On répète {{n}} expériences avec une probabilité de succès {{p}}. Quelle est l’espérance du nombre de succès ?",
    },
    template:
      "On répète {{n}} expériences avec une probabilité de succès {{p}}. Quelle est l’espérance du nombre de succès ?",
    variables: {
      n: [16, 26, 36, 46, 56],
      p: [0.15, 0.25, 0.3, 0.35, 0.55],
    },
    answerRule: "n * p",
    hint: "Pour une loi binomiale, E(X)=np.",
    explanationTemplate: "E(X) = {{n}} × {{p}} = {{answer}}.",
    tags: ["probabilites", "binomiale", "esperance", "bac"],
  },

  {
    id: "terminale_spe_template_probleme_aire_integrale_constante_001",
    niveau: "terminale-spe",
    type: "probleme",
    mode: "template",
    notionId: "integrales",
    microId: "integrale_aire_simple",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Sur [0 ; {{a}}], la fonction f est constante égale à {{h}}. Quelle est l’aire sous la courbe ?",
    },
    template:
      "Sur [0 ; {{a}}], la fonction f est constante égale à {{h}}. Quelle est l’aire sous la courbe ?",
    variables: {
      a: [4, 5, 6, 7, 8],
      h: [2, 3, 4, 5, 6],
    },
    answerRule: "a * h",
    hint: "L’aire est celle d’un rectangle : base × hauteur.",
    explanationTemplate: "Aire = {{a}} × {{h}} = {{answer}}.",
    tags: ["integrales", "aire", "bac"],
  },
  // ============================================================
  // SEMAINE 23 - AUTOMATISMES BAC
  // ============================================================

  {
    id: "terminale_spe_template_probleme_automatisme_proba_001",
    niveau: "terminale-spe",
    type: "probleme",
    mode: "template",
    notionId: "probabilites",
    microId: "complementaire",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une probabilite vaut {{p}}. Quelle est la probabilite contraire ?",
    },
    template:
      "Une probabilite vaut {{p}}. Quelle est la probabilite contraire ?",
    variables: {
      p: [0.17, 0.3, 0.42, 0.47, 0.73],
    },
    answerRule: "1 - p",
    hint: "La probabilite contraire complete jusqu'a 1.",
    explanationTemplate: "La probabilite contraire vaut 1 - {{p}} = {{answer}}.",
    tags: ["probabilites", "complementaire", "bac"],
  },
];
