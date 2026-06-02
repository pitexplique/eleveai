// lib/calcul-rapide/data/3e/problemes.templates.ts

import type { CalculRapideItem } from "../../types";

export const problemesTemplates3e: CalculRapideItem[] = [
  {
    id: "3e_template_probleme_puissance_doublement_001",
    niveau: "3e",
    type: "probleme",
    mode: "template",
    notionId: "puissances",
    microId: "puissance_calculer",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une quantité double {{n}} fois. Par quel nombre est-elle multipliée ?",
    },
    template:
      "Une quantité double {{n}} fois. Par quel nombre est-elle multipliée ?",
    variables: {
      n: [2, 3, 4, 5, 6],
    },
    answerRule: "Math.pow(2, n)",
    hint: "Doubler n fois revient à calculer 2^n.",
    explanationTemplate: "2^{{n}} = {{answer}}.",
    tags: ["puissances", "doublement"],
  },

  {
    id: "3e_template_probleme_scientifique_001",
    niveau: "3e",
    type: "probleme",
    mode: "template",
    notionId: "puissances",
    microId: "ecriture_scientifique",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une distance vaut {{a}} × 10^{{n}} m. Écris cette distance en mètres.",
    },
    template:
      "Une distance vaut {{a}} × 10^{{n}} m. Écris cette distance en mètres.",
    variables: {
      a: [2, 3, 4, 5, 7, 9],
      n: [2, 3, 4, 5, 6],
    },
    answerRule: "a * Math.pow(10, n)",
    hint: "Multiplie par la puissance de 10.",
    explanationTemplate: "{{a}} × 10^{{n}} = {{answer}}.",
    tags: ["puissances", "ecriture_scientifique"],
  },

  {
    id: "3e_template_probleme_racine_carre_001",
    niveau: "3e",
    type: "probleme",
    mode: "template",
    notionId: "racines_carrees",
    microId: "racine_carree_simple",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "L’aire d’un carré est {{n}} cm². Quelle est la longueur de son côté ?",
    },
    template:
      "L’aire d’un carré est {{n}} cm². Quelle est la longueur de son côté ?",
    variables: {
      n: [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144],
    },
    answerRule: "Math.sqrt(n)",
    hint: "Le côté est la racine carrée de l’aire.",
    explanationTemplate: "√{{n}} = {{answer}}.",
    tags: ["racine_carree", "aire"],
  },

  {
    id: "3e_template_probleme_pythagore_racine_001",
    niveau: "3e",
    type: "probleme",
    mode: "template",
    notionId: "pythagore",
    microId: "pythagore_racine",
    difficulty: 4,
    durationSec: 60,
    media: {
      text: "Dans un triangle rectangle, on obtient c² = {{n}}. Quelle est la longueur c ?",
    },
    template:
      "Dans un triangle rectangle, on obtient c² = {{n}}. Quelle est la longueur c ?",
    variables: {
      n: [25, 36, 49, 64, 81, 100, 121, 144, 169],
    },
    answerRule: "Math.sqrt(n)",
    hint: "Cherche la racine carrée de ce nombre.",
    explanationTemplate: "c = √{{n}} = {{answer}}.",
    tags: ["pythagore", "racine_carree"],
  },
  // ============================================================
  // SEMAINE 20 - EQUATIONS ET FONCTIONS AFFINES
  // ============================================================

  {
    id: "3e_template_probleme_fonction_tarif_001",
    niveau: "3e",
    type: "probleme",
    mode: "template",
    notionId: "fonctions",
    microId: "fonction_affine_tarif",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Un abonnement coute {{f}} euros puis {{p}} euros par entree. Quel prix pour {{n}} entrees ?",
    },
    template:
      "Un abonnement coute {{f}} euros puis {{p}} euros par entree. Quel prix pour {{n}} entrees ?",
    variables: {
      f: [3, 5, 8, 10],
      p: [2, 3, 4, 5],
      n: [4, 5, 6, 8],
    },
    answerRule: "f + p * n",
    hint: "Calcule la partie fixe puis ajoute le prix des entrees.",
    explanationTemplate: "{{f}} + {{p}} x {{n}} = {{answer}}.",
    tags: ["fonction", "affine", "tarif"],
  },
  {
    id: "3e_template_probleme_fonction_forfait_001",
    niveau: "3e",
    type: "probleme",
    mode: "template",
    notionId: "fonctions",
    microId: "fonction_affine_tarif",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Un forfait coute {{f}} euros puis {{p}} euros par mois. Quel prix pour {{n}} mois ?",
    },
    template:
      "Un forfait coute {{f}} euros puis {{p}} euros par mois. Quel prix pour {{n}} mois ?",
    variables: {
      f: [5, 10, 15],
      p: [8, 12, 20],
      n: [2, 3, 6],
    },
    answerRule: "f + p * n",
    hint: "Prix = partie fixe + prix mensuel x nombre de mois.",
    explanationTemplate: "{{f}} + {{p}} x {{n}} = {{answer}} euros.",
    tags: ["fonction", "affine", "forfait", "quotidien"],
  },
  {
    id: "3e_template_probleme_equation_budget_001",
    niveau: "3e",
    type: "probleme",
    mode: "template",
    notionId: "equations",
    microId: "equation_ax_b",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "{{a}} articles identiques et {{b}} euros de frais coutent {{t}} euros. Prix d'un article ?",
    },
    template:
      "{{a}} articles identiques et {{b}} euros de frais coutent {{t}} euros. Prix d'un article ?",
    variables: {
      a: [2, 3, 4],
      b: [5, 8, 10],
      t: [25, 38, 50],
    },
    answerRule: "(t - b) / a",
    hint: "Enleve les frais, puis divise par le nombre d'articles.",
    explanationTemplate: "({{t}} - {{b}}) / {{a}} = {{answer}} euros.",
    tags: ["equation", "budget", "quotidien"],
  },
  {
    id: "3e_template_probleme_puissance_partage_001",
    niveau: "3e",
    type: "probleme",
    mode: "template",
    notionId: "puissances",
    microId: "puissance_calculer",
    difficulty: 3,
    durationSec: 60,
    media: {
      text: "Une information est partagee a 3 personnes, puis chacune a 3 personnes, pendant {{n}} tours. Combien de personnes au dernier tour ?",
    },
    template:
      "Une information est partagee a 3 personnes, puis chacune a 3 personnes, pendant {{n}} tours. Combien de personnes au dernier tour ?",
    variables: {
      n: [2, 3, 4, 5],
    },
    answerRule: "Math.pow(3, n)",
    hint: "C'est une puissance de 3.",
    explanationTemplate: "3^{{n}} = {{answer}}.",
    tags: ["puissances", "quotidien"],
  },
];
