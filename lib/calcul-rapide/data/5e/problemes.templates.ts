// lib/calcul-rapide/data/5e/problemes.templates.ts

import type { CalculRapideItem } from "../../types";

export const problemesTemplates5e: CalculRapideItem[] = [
  {
    id: "5e_template_temperature_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "operations_relatifs",
    microId: "relatif_addition",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Le matin, il fait {{depart}} °C. La température varie de {{variation}} °C. Quelle est la température finale ?",
    },
    template:
      "Le matin, il fait {{depart}} °C. La température varie de {{variation}} °C. Quelle est la température finale ?",
    variables: {
      depart: [-8, -5, -3, 2, 4],
      variation: [6, 7, 9, -4, -6],
    },
    answerRule: "depart + variation",
    hint: "Ajoute la variation à la température de départ.",
    explanationTemplate:
      "{{depart}} + {{variation}} = {{answer}}. La température finale est {{answer}} °C.",
    tags: ["relatifs", "temperature", "template"],
  },
  {
    id: "5e_template_fraction_partage_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "fractions",
    microId: "fraction_produit",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "On prend {{a}}/{{b}} de {{n}} fruits. Combien de fruits cela représente-t-il en fraction?",
    },
    template:
      "On prend {{a}}/{{b}} de {{n}} fruits. Combien de fruits cela représente-t-il en fractions?",
    variables: {
      a: [1, 2, 3],
      b: [2, 3, 4],
      n: [12, 18, 24, 36, 48],
    },
    answerRule: "(a * n) / b",
    hint: "Calcule d’abord un b-ième de la quantité.",
    explanationTemplate:
      "{{a}}/{{b}} de {{n}}, c’est ({{a}} × {{n}}) ÷ {{b}} = {{answer}}.",
    tags: ["fractions", "partage", "template"],
  },
  {
    id: "5e_template_marche_prix_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "proportionnalite",
    microId: "proportionnalite_calculer",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Au marché, {{q1}} fruits coûtent {{p1}} €. Combien coûtent {{q2}} fruits ?",
    },
    template:
      "Au marché, {{q1}} fruits coûtent {{p1}} €. Combien coûtent {{q2}} fruits ?",
    variables: {
      q1: [2, 3, 4],
      p1: [6, 9, 12, 16],
      q2: [5, 6, 8],
    },
    answerRule: "(p1 / q1) * q2",
    hint: "Cherche le prix d’un fruit.",
    explanationTemplate:
      "Un fruit coûte {{p1}} ÷ {{q1}} €. Donc {{q2}} fruits coûtent {{answer}} €.",
    tags: ["proportionnalite", "prix", "reunion", "template"],
  },
  {
    id: "5e_template_aire_rectangle_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Un rectangle mesure {{longueur}} cm de longueur et {{largeur}} cm de largeur. Quelle est son aire ?",
    },
    template:
      "Un rectangle mesure {{longueur}} cm de longueur et {{largeur}} cm de largeur. Quelle est son aire ?",
    variables: {
      longueur: [6, 7, 8, 9, 12],
      largeur: [3, 4, 5, 6],
    },
    answerRule: "longueur * largeur",
    hint: "Aire du rectangle = longueur × largeur.",
    explanationTemplate:
      "{{longueur}} × {{largeur}} = {{answer}}. L’aire est {{answer}} cm².",
    tags: ["aire", "rectangle", "template"],
  },
];