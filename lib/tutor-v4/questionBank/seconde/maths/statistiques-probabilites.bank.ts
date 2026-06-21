import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { buildMicroSkillCheckBank } from "./core";

export const statistiquesProbabilitesSecondeBank: TutorBankItemV4[] = [
  // info_chiffree, statistiques_descriptives et probabilites ont leurs banques dédiées
  ...buildMicroSkillCheckBank("stats_probas", [
    "echantillonnage_simulation",
  ]),
  {
    kind: "template",
    id: "seconde_stat_moyenne_template_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId: "stat_moyenne",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les valeurs puis divise par le nombre de valeurs.",
    tags: ["seconde", "statistiques", "moyenne"],
    generate: () => ({
      text: "Calcule la moyenne de la serie : 8 ; 10 ; 12 ; 14.",
      format: "short",
      expected: ["11"],
      comparator: "number_equal",
      explanation: "La somme vaut 44 et il y a 4 valeurs. La moyenne vaut 44 / 4 = 11.",
    }),
  },
  {
    kind: "template",
    id: "seconde_proba_calculer_template_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les issues favorables puis divise par le nombre total d'issues.",
    tags: ["seconde", "probabilites", "qcm"],
    generate: () => ({
      text: "On lance un de equilibre a 6 faces. Quelle est la probabilite d'obtenir un nombre pair ?",
      format: "qcm",
      choices: ["1/2", "1/3", "2/3", "1/6"],
      expected: ["1/2"],
      comparator: "mcq_exact",
      explanation: "Les issues paires sont 2, 4 et 6 : 3 issues favorables sur 6, donc 3/6 = 1/2.",
    }),
  },
];
