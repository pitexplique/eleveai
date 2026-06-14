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
      km: [3.1, 4.6, 5.8, 8.1, 9.6],
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
      L: [1.85, 2.1, 2.6, 3.1, 3.6],
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
      h: [3, 4, 5, 6],
      m: [22, 27, 32, 42, 57],
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
      v: [84, 94, 104, 114, 124],
      t: [4, 5, 6],
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
      L: [9, 10, 11, 12, 14],
      l: [7, 8, 9, 10],
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
      t: [-10, -7, -5, -3, 4],
      a: [7, 8, 9, 11, 14],
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
      p: [-5, -7, -10, -12],
      d: [6, 7, 8, 10],
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
      s: [-14, -10, -7, -5, 6],
      g: [15, 17, 19, 22, 27],
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
      a: [-12, -9, -6, -4],
      b: [5, 7, 9, 12],
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
      n: [630, 840, 1050],
      num: [4, 5],
      den: [5, 6, 7],
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
      n: [300, 330, 360, 390, 420],
      num: [3, 4, 5],
      den: [5, 6],
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
      a: [4, 5, 6],
      q: [720, 780, 840],
      b: [8, 10, 12],
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
      s: [-22, -17, -10, 7],
      g: [22, 27, 37, 42],
    },
    answerRule: "s + g",
    hint: "Additionne le solde de depart et l'argent ajoute.",
    explanationTemplate: "{{s}} + {{g}} = {{answer}} euros.",
    tags: ["relatifs", "budget", "quotidien"],
  },
];
