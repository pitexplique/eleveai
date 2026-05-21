// lib/calcul-rapide/data/4e/problemes.templates.ts

import type { CalculRapideItem } from "../../types";

export const problemesTemplates4e: CalculRapideItem[] = [
  // ============================================================
  // SEMAINE MESURES
  // ============================================================

  {
    id: "4e_template_randonnee_001",
    niveau: "4e",
    type: "probleme",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_longueur",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une randonnée mesure {{km}} km. Combien cela représente-t-il en mètres ?",
    },
    template:
      "Une randonnée mesure {{km}} km. Combien cela représente-t-il en mètres ?",
    variables: {
      km: [2.8, 4.6, 6.3, 8.5, 10.4],
    },
    answerRule: "km * 1000",
    hint: "1 km = 1000 m.",
    explanationTemplate: "{{km}} × 1000 = {{answer}} m.",
    tags: ["conversion", "longueur", "reunion"],
  },

  {
    id: "4e_template_volume_001",
    niveau: "4e",
    type: "probleme",
    mode: "template",
    notionId: "volumes",
    microId: "volume_contenance",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une bouteille contient {{L}} L. Quelle quantité cela représente-t-il en mL ?",
    },
    template:
      "Une bouteille contient {{L}} L. Quelle quantité cela représente-t-il en mL ?",
    variables: {
      L: [0.5, 1.25, 1.8, 2.4, 3.75],
    },
    answerRule: "L * 1000",
    hint: "1 L = 1000 mL.",
    explanationTemplate: "{{L}} × 1000 = {{answer}} mL.",
    tags: ["volume", "contenance"],
  },

  {
    id: "4e_template_duree_001",
    niveau: "4e",
    type: "probleme",
    mode: "template",
    notionId: "grandeurs_mesures",
    microId: "conversion_duree",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une activité dure {{h}} h {{m}} min. Quelle est la durée totale en minutes ?",
    },
    template:
      "Une activité dure {{h}} h {{m}} min. Quelle est la durée totale en minutes ?",
    variables: {
      h: [1, 2, 3, 5],
      m: [5, 25, 35, 40, 50],
    },
    answerRule: "(h * 60) + m",
    hint: "Transforme les heures en minutes puis ajoute.",
    explanationTemplate:
      "On transforme les heures en minutes puis on ajoute les minutes : résultat = {{answer}} min.",
    tags: ["duree"],
  },

  {
    id: "4e_template_vitesse_001",
    niveau: "4e",
    type: "probleme",
    mode: "template",
    notionId: "proportionnalite",
    microId: "vitesse_simple",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une voiture roule à {{v}} km/h pendant {{t}} h. Quelle distance parcourt-elle ?",
    },
    template:
      "Une voiture roule à {{v}} km/h pendant {{t}} h. Quelle distance parcourt-elle ?",
    variables: {
      v: [55, 68, 75, 95, 105],
      t: [2, 3, 4],
    },
    answerRule: "v * t",
    hint: "Distance = vitesse × temps.",
    explanationTemplate: "{{v}} × {{t}} = {{answer}} km.",
    tags: ["vitesse", "distance"],
  },

  {
    id: "4e_template_aire_001",
    niveau: "4e",
    type: "probleme",
    mode: "template",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une terrasse mesure {{L}} m sur {{l}} m. Quelle est son aire ?",
    },
    template:
      "Une terrasse mesure {{L}} m sur {{l}} m. Quelle est son aire ?",
    variables: {
      L: [7, 9, 11, 14, 16],
      l: [3, 4, 5],
    },
    answerRule: "L * l",
    hint: "Aire = longueur × largeur.",
    explanationTemplate: "{{L}} × {{l}} = {{answer}} m².",
    tags: ["aire", "rectangle"],
  },

  {
    id: "4e_template_piege_aire_001",
    niveau: "4e",
    type: "probleme",
    mode: "template",
    notionId: "aires",
    microId: "aire_unites",
    difficulty: 4,
    durationSec: 60,
    media: {
      text: "Un rectangle mesure {{a}} cm sur {{b}} cm. Un élève répond : “l’aire vaut {{r}} cm”. A-t-il raison ?",
    },
    template:
      "Un rectangle mesure {{a}} cm sur {{b}} cm. Un élève répond : “l’aire vaut {{r}} cm”. A-t-il raison ?",
    variables: {
      a: [7, 8, 9, 10],
      b: [3, 4, 5, 6],
      r: [21, 32, 45, 60],
    },
    answerRule: "'non'",
    hint: "Une aire s’exprime en cm², pas en cm.",
    explanationTemplate:
      "Même si le calcul numérique peut sembler correct, l’unité est fausse : une aire s’exprime en cm².",
    tags: ["aire", "piege", "unites"],
  },

  {
    id: "4e_template_pythagore_001",
    niveau: "4e",
    type: "probleme",
    mode: "template",
    notionId: "pythagore",
    microId: "pythagore_calcul",
    difficulty: 4,
    durationSec: 60,
    media: {
      text: "Dans un triangle rectangle, les côtés de l’angle droit mesurent {{a}} cm et {{b}} cm. Quelle est l’hypoténuse ?",
    },
    template:
      "Dans un triangle rectangle, les côtés de l’angle droit mesurent {{a}} cm et {{b}} cm. Quelle est l’hypoténuse ?",
    variables: {
      a: [5, 9, 16],
      b: [12],
    },
    answerRule: "Math.sqrt(a*a + b*b)",
    hint: "Utilise le théorème de Pythagore.",
    explanationTemplate:
      "On utilise Pythagore : hypoténuse = {{answer}} cm.",
    tags: ["pythagore", "triangle"],
  },

  // ============================================================
  // SEMAINE 19 - CALCUL LITTÉRAL EXPRESS
  // ============================================================

  {
    id: "4e_template_litteral_prix_001",
    niveau: "4e",
    type: "probleme",
    mode: "template",
    notionId: "expressions_litterales",
    microId: "litteral_substitution",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Un objet coûte {{x}} €. On en achète {{a}} et on ajoute {{b}} € de frais. Quel est le prix total ?",
    },
    template:
      "Un objet coûte {{x}} €. On en achète {{a}} et on ajoute {{b}} € de frais. Quel est le prix total ?",
    variables: {
      x: [3, 4, 6, 7],
      a: [2, 3, 4],
      b: [2, 5, 8],
    },
    answerRule: "a * x + b",
    hint: "Le prix total est a × x + b.",
    explanationTemplate:
      "{{a}} × {{x}} + {{b}} = {{answer}} €.",
    tags: ["calcul_litteral", "prix", "substitution"],
  },

  {
    id: "4e_template_litteral_abonnement_001",
    niveau: "4e",
    type: "probleme",
    mode: "template",
    notionId: "expressions_litterales",
    microId: "litteral_substitution",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Un abonnement coûte {{b}} €, puis {{p}} € par séance. Pour {{x}} séances, combien paie-t-on ?",
    },
    template:
      "Un abonnement coûte {{b}} €, puis {{p}} € par séance. Pour {{x}} séances, combien paie-t-on ?",
    variables: {
      b: [6, 9, 12],
      p: [3, 5, 7],
      x: [2, 4, 6],
    },
    answerRule: "b + p * x",
    hint: "Prix total = abonnement + prix par séance × nombre de séances.",
    explanationTemplate:
      "{{b}} + {{p}} × {{x}} = {{answer}} €.",
    tags: ["calcul_litteral", "prix", "substitution"],
  },

  {
    id: "4e_template_litteral_developper_sacs_001",
    niveau: "4e",
    type: "probleme",
    mode: "template",
    notionId: "distributivite",
    microId: "distributivite_developper",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "On a {{k}} sacs contenant chacun x billes et {{a}} billes en plus. Développe l’expression {{k}}(x + {{a}}).",
    },
    template:
      "On a {{k}} sacs contenant chacun x billes et {{a}} billes en plus. Développe l’expression {{k}}(x + {{a}}).",
    variables: {
      k: [3, 4, 6, 7],
      a: [2, 5, 6, 8],
    },
    answerRule: "k + 'x+' + (k * a)",
    hint: "Distribue le nombre devant la parenthèse.",
    explanationTemplate:
      "{{k}}(x + {{a}}) = {{answer}}.",
    tags: ["calcul_litteral", "developper"],
  },

  {
    id: "4e_template_litteral_factoriser_prix_001",
    niveau: "4e",
    type: "probleme",
    mode: "template",
    notionId: "factorisation",
    microId: "factorisation_facteur_commun",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Factorise : {{k}}x + {{n}}.",
    },
    template: "Factorise : {{k}}x + {{n}}.",
    variables: {
      k: [2, 3, 4, 6],
      n: [12, 24, 36, 48],
    },
    answerRule: "k + '(x+' + (n / k) + ')'",
    hint: "Mets le facteur commun devant la parenthèse.",
    explanationTemplate:
      "On met {{k}} en facteur : {{answer}}.",
    tags: ["calcul_litteral", "factoriser"],
  },

  {
    id: "4e_template_equation_simple_001",
    niveau: "4e",
    type: "probleme",
    mode: "template",
    notionId: "equations",
    microId: "equation_simple",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Un nombre augmenté de {{a}} donne {{b}}. Quel est ce nombre ?",
    },
    template:
      "Un nombre augmenté de {{a}} donne {{b}}. Quel est ce nombre ?",
    variables: {
      a: [4, 6, 8, 11],
      b: [19, 23, 31, 42],
    },
    answerRule: "b - a",
    hint: "On cherche x tel que x + a = b.",
    explanationTemplate:
      "x = {{b}} - {{a}} = {{answer}}.",
    tags: ["equation", "calcul_mental"],
  },
];