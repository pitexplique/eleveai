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
      km: [2.85, 4.35, 5.55, 7.85, 9.35],
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
      L: [1.6, 1.85, 2.35, 2.85, 3.35],
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
      h: [2, 3, 4, 5],
      m: [16, 21, 26, 36, 51],
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
      v: [72, 82, 92, 102, 112],
      t: [3, 4, 5],
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
      L: [7, 8, 9, 10, 12],
      l: [5, 6, 7, 8],
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
      t: [-9, -6, -4, -2, 3],
      a: [5, 6, 7, 9, 12],
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
      p: [-4, -6, -9, -11],
      d: [4, 5, 6, 8],
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
      s: [-13, -9, -6, -4, 5],
      g: [9, 11, 13, 16, 21],
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
      a: [-11, -8, -5, -3],
      b: [3, 5, 7, 10],
    },
    answerRule: "Math.abs(b - a)",
    hint: "L’écart est une distance : il est toujours positif.",
    explanationTemplate: "L’écart entre {{a}} et {{b}} est {{answer}} °C.",
    tags: ["relatifs", "temperature", "ecart"],
  },
  // ============================================================
  // SEMAINE 20 - FRACTIONS ET PROPORTIONS
  // ============================================================

  {
    id: "5e_template_probleme_fraction_classe_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Dans un groupe de {{n}} personnes, les {{num}}/{{den}} participent a une activite. Combien de personnes participent ?",
    },
    template:
      "Dans un groupe de {{n}} personnes, les {{num}}/{{den}} participent a une activite. Combien de personnes participent ?",
    variables: {
      n: [80, 140, 200],
      num: [3, 4],
      den: [4, 5, 6],
    },
    answerRule: "n * num / den",
    hint: "Calcule la fraction de la quantite.",
    explanationTemplate: "{{num}}/{{den}} de {{n}} = {{answer}}.",
    tags: ["fractions", "quantite"],
  },
  {
    id: "5e_template_fraction_budget_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "fractions",
    microId: "fraction_quantite",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Un budget de {{n}} euros est utilise aux {{num}}/{{den}}. Combien d'euros sont utilises ?",
    },
    template:
      "Un budget de {{n}} euros est utilise aux {{num}}/{{den}}. Combien d'euros sont utilises ?",
    variables: {
      n: [80, 100, 120, 140, 170],
      num: [2, 3, 4],
      den: [4, 5],
    },
    answerRule: "n * num / den",
    hint: "Calcule la fraction du budget.",
    explanationTemplate: "{{num}}/{{den}} de {{n}} = {{answer}} euros.",
    tags: ["fractions", "budget", "quotidien"],
  },
  {
    id: "5e_template_proportion_recette_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "proportionnalite",
    microId: "proportion_prix",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Pour {{a}} personnes, il faut {{q}} g de riz. Pour {{b}} personnes, combien faut-il ?",
    },
    template:
      "Pour {{a}} personnes, il faut {{q}} g de riz. Pour {{b}} personnes, combien faut-il ?",
    variables: {
      a: [3, 4, 5],
      q: [225, 325, 425],
      b: [6, 8, 10],
    },
    answerRule: "q / a * b",
    hint: "Calcule la quantite pour 1 personne, puis multiplie.",
    explanationTemplate: "{{q}} / {{a}} x {{b}} = {{answer}} g.",
    tags: ["proportionnalite", "recette", "quotidien"],
  },
  {
    id: "5e_template_relatif_compte_001",
    niveau: "5e",
    type: "probleme",
    mode: "template",
    notionId: "nombres_relatifs",
    microId: "relatifs_additionner",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Ton compte est a {{s}} euros. Tu ajoutes {{g}} euros. Nouveau solde ?",
    },
    template:
      "Ton compte est a {{s}} euros. Tu ajoutes {{g}} euros. Nouveau solde ?",
    variables: {
      s: [-21, -16, -9, 6],
      g: [16, 21, 31, 36],
    },
    answerRule: "s + g",
    hint: "Additionne le solde de depart et l'argent ajoute.",
    explanationTemplate: "{{s}} + {{g}} = {{answer}} euros.",
    tags: ["relatifs", "budget", "quotidien"],
  },
];
