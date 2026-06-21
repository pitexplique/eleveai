import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { buildMicroSkillCheckBank } from "./core";

export const geometrieSecondeBank: TutorBankItemV4[] = [
  ...buildMicroSkillCheckBank("geometrie", [
    "vecteurs_plan",
    "repere_coordonnees",
    "droites_plan",
    "geometrie_espace_2de",
  ]),
  {
    kind: "template",
    id: "seconde_repere_milieu_template_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_milieu",
    difficulty: 2,
    theme: "neutral",
    hint: "On fait la moyenne des abscisses puis la moyenne des ordonnees.",
    tags: ["seconde", "coordonnees", "milieu"],
    generate: () => ({
      text: "A(2 ; 4) et B(8 ; 10). Quelle est l'abscisse du milieu de [AB] ?",
      format: "short",
      expected: ["5"],
      comparator: "number_equal",
      explanation: "L'abscisse du milieu vaut (2 + 8) / 2 = 5.",
    }),
  },
  {
    kind: "template",
    id: "seconde_droite_equation_template_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_equation_reduite",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans y = ax + b, a est le coefficient directeur et b l'ordonnee a l'origine.",
    tags: ["seconde", "droite", "qcm"],
    generate: () => ({
      text: "Quelle droite a pour coefficient directeur 2 et pour ordonnee a l'origine -1 ?",
      format: "qcm",
      choices: ["y = 2x - 1", "y = -x + 2", "y = 2x + 1", "y = x - 2"],
      expected: ["y = 2x - 1"],
      comparator: "mcq_exact",
      explanation: "Une equation reduite s'ecrit y = ax + b. Ici a = 2 et b = -1, donc y = 2x - 1.",
    }),
  },
];
