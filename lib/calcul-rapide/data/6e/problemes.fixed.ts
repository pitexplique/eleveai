// lib/calcul-rapide/data/6e/problemes.fixed.ts

import type { CalculRapideItem } from "../../types";

export const problemesFixed6e: CalculRapideItem[] = [
  {
    id: "6e_probleme_aire_carre_001",
    niveau: "6e",
    type: "probleme",
    mode: "fixed",
    notionId: "aires",
    microId: "aire_carre",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Combien vaut l’aire d’un carré de périmètre 24 cm ?",
    },
    expected: ["36", "36 cm²", "36 cm2"],
    hint: "Commence par trouver la longueur d’un côté du carré.",
    explanation:
      "Un carré a 4 côtés égaux. 24 ÷ 4 = 6 cm. Son aire vaut 6 × 6 = 36 cm².",
    tags: ["aire", "carre", "perimetre"],
  },
  {
    id: "6e_probleme_proba_boules_001",
    niveau: "6e",
    type: "probleme",
    mode: "fixed",
    notionId: "probabilites",
    microId: "probabilite_simple",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Dans un sac, il y a 8 boules : 2 jaunes et 6 grises. Quelle est la probabilité de tirer une boule jaune ?",
      image: "/images/calcul-rapide/6e/proba-boules.png",
    },
    expected: ["2/8", "1/4", "0,25", "0.25", "25%"],
    hint: "Probabilité = nombre de cas favorables ÷ nombre total de cas.",
    explanation:
      "Il y a 2 boules jaunes sur 8 boules au total. La probabilité est 2/8 = 1/4.",
    tags: ["probabilites", "fraction", "boules"],
  },
  {
    id: "6e_probleme_angle_triangle_001",
    niveau: "6e",
    type: "probleme",
    mode: "fixed",
    notionId: "triangles",
    microId: "triangle_somme_angles",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Le triangle ABC est rectangle en A et AB = AC. Combien mesure l’angle ABC ?",
    },
    expected: ["45", "45°"],
    hint: "Un triangle rectangle isocèle a deux angles égaux en plus de l’angle droit.",
    explanation:
      "Le triangle est rectangle en A, donc l’angle A mesure 90°. Il reste 90° pour les deux autres angles égaux. Donc ABC = 45°.",
    tags: ["triangle", "angle", "rectangle", "isocele"],
  },
  {
    id: "6e_probleme_pourcentage_college_001",
    niveau: "6e",
    type: "probleme",
    mode: "fixed",
    notionId: "proportionnalite",
    microId: "pourcentage_simple",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Dans un collège de 800 élèves, il y a 600 demi-pensionnaires. Donne en pourcentage la proportion d’élèves demi-pensionnaires.",
    },
    expected: ["75", "75%", "75 %"],
    hint: "Cherche quelle part représente 600 sur 800.",
    explanation:
      "600 ÷ 800 = 0,75. Donc la proportion est de 75 %.",
    tags: ["pourcentage", "proportionnalite", "college"],
  },
];