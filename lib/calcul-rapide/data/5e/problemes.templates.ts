// lib/calcul-rapide/data/5e/problemes.templates.ts

import type { CalculRapideItem } from "../../types";

export const problemesTemplates5e: CalculRapideItem[] = [
  // ============================================================
  // SEMAINE MESURES
  // ============================================================

  {
    id: "5e_template_randonnee_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_longueur",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une randonnée mesure {{km}} km. Combien cela représente-t-il en mètres ?",
    },
    template: "Une randonnée mesure {{km}} km. Combien cela représente-t-il en mètres ?",
    variables: {
      km: [2.5, 4, 5.2, 7.5, 9],
    },
    answerRule: "km * 1000",
    hint: "1 km = 1000 m.",
    explanationTemplate: "{{km}} × 1000 = {{answer}} m.",
    tags: ["longueur", "conversion", "reunion"],
  },

  {
    id: "5e_template_bouteille_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_contenance",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une bouteille contient {{L}} L de jus. Quelle quantité cela représente-t-il en cL ?",
    },
    template:
      "Une bouteille contient {{L}} L de jus. Quelle quantité cela représente-t-il en cL ?",
    variables: {
      L: [1.25, 1.5, 2, 2.5, 3],
    },
    answerRule: "L * 100",
    hint: "1 L = 100 cL.",
    explanationTemplate: "{{L}} × 100 = {{answer}} cL.",
    tags: ["contenance"],
  },

  {
    id: "5e_template_course_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_duree",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une course dure {{h}} h {{m}} min. Quelle est la durée totale en minutes ?",
    },
    template: "Une course dure {{h}} h {{m}} min. Quelle est la durée totale en minutes ?",
    variables: {
      h: [1, 2, 3, 4],
      m: [10, 15, 20, 30, 45],
    },
    answerRule: "(h * 60) + m",
    hint: "Transforme les heures en minutes puis ajoute.",
    explanationTemplate:
      "On transforme les heures en minutes, puis on ajoute les minutes : résultat = {{answer}} min.",
    tags: ["duree"],
  },

  {
    id: "5e_template_vitesse_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "proportionnalite",
    microId: "vitesse_simple",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une voiture roule à {{v}} km/h pendant {{t}} heures. Quelle distance parcourt-elle ?",
    },
    template:
      "Une voiture roule à {{v}} km/h pendant {{t}} heures. Quelle distance parcourt-elle ?",
    variables: {
      v: [60, 70, 80, 90, 100],
      t: [2, 3, 4],
    },
    answerRule: "v * t",
    hint: "Distance = vitesse × temps.",
    explanationTemplate: "{{v}} × {{t}} = {{answer}} km.",
    tags: ["vitesse", "distance"],
  },

  {
    id: "5e_template_aire_rectangle_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une terrasse mesure {{L}} m de longueur et {{l}} m de largeur. Quelle est son aire ?",
    },
    template:
      "Une terrasse mesure {{L}} m de longueur et {{l}} m de largeur. Quelle est son aire ?",
    variables: {
      L: [5, 6, 7, 8, 10],
      l: [3, 4, 5, 6],
    },
    answerRule: "L * l",
    hint: "Aire = longueur × largeur.",
    explanationTemplate: "{{L}} × {{l}} = {{answer}} m².",
    tags: ["aire", "rectangle"],
  },

  // ============================================================
  // SEMAINE RELATIFS
  // ============================================================

  {
    id: "5e_template_relatif_temperature_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "nombres_relatifs",
    microId: "relatifs_additionner",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Il fait {{t}} °C. La température augmente de {{a}} °C. Quelle est la nouvelle température ?",
    },
    template:
      "Il fait {{t}} °C. La température augmente de {{a}} °C. Quelle est la nouvelle température ?",
    variables: {
      t: [-8, -5, -3, -1, 2],
      a: [3, 4, 5, 7, 10],
    },
    answerRule: "t + a",
    hint: "Une augmentation correspond à une addition.",
    explanationTemplate: "{{t}} + {{a}} = {{answer}} °C.",
    tags: ["relatifs", "temperature"],
  },

  {
    id: "5e_template_relatif_plongee_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "nombres_relatifs",
    microId: "relatifs_soustraire",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Un plongeur est à {{p}} m. Il descend de {{d}} m. À quelle profondeur est-il ?",
    },
    template:
      "Un plongeur est à {{p}} m. Il descend de {{d}} m. À quelle profondeur est-il ?",
    variables: {
      p: [-3, -5, -8, -10],
      d: [2, 3, 4, 6],
    },
    answerRule: "p - d",
    hint: "Descendre signifie aller vers les nombres plus petits.",
    explanationTemplate: "{{p}} - {{d}} = {{answer}} m.",
    tags: ["relatifs", "profondeur"],
  },

  {
    id: "5e_template_relatif_score_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "operations_relatifs",
    microId: "relatifs_additionner",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Dans un jeu, tu as {{s}} points puis tu gagnes {{g}} points. Quel est ton score ?",
    },
    template:
      "Dans un jeu, tu as {{s}} points puis tu gagnes {{g}} points. Quel est ton score ?",
    variables: {
      s: [-12, -8, -5, -3, 4],
      g: [3, 5, 7, 10, 15],
    },
    answerRule: "s + g",
    hint: "On additionne le score de départ et les points gagnés.",
    explanationTemplate: "{{s}} + {{g}} = {{answer}}.",
    tags: ["relatifs", "score"],
  },

  {
    id: "5e_template_relatif_ecart_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "nombres_relatifs",
    microId: "relatifs_distance_zero",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Quel est l’écart entre {{a}} °C et {{b}} °C ?",
    },
    template: "Quel est l’écart entre {{a}} °C et {{b}} °C ?",
    variables: {
      a: [-10, -7, -4, -2],
      b: [1, 3, 5, 8],
    },
    answerRule: "Math.abs(b - a)",
    hint: "L’écart est une distance : il est toujours positif.",
    explanationTemplate: "L’écart entre {{a}} et {{b}} est {{answer}} °C.",
    tags: ["relatifs", "temperature", "ecart"],
  },
];