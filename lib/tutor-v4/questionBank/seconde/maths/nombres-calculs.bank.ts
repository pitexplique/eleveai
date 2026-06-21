import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { buildMicroSkillCheckBank } from "./core";

export const nombresCalculsSecondeBank: TutorBankItemV4[] = [
  // reels_intervalles, arithmetique_entiers, puissances_2de et racine_carree_2de
  // sont servis par leurs banques dédiées.
  // Couverture provisoire des chapitres calcul littéral pas encore refaits :
  ...buildMicroSkillCheckBank("nombres_calculs", [
    "equations_inequations_1er_degre",
  ]),
  {
    kind: "template",
    id: "seconde_equation_resoudre_template_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "equations_inequations_1er_degre",
    microId: "equation_resoudre",
    difficulty: 2,
    theme: "neutral",
    hint: "Isole x en effectuant la meme operation des deux cotes.",
    tags: ["seconde", "equation", "short"],
    generate: () => ({
      text: "Resous l'equation 3x + 4 = 19. Donne la valeur de x.",
      format: "short",
      expected: ["5"],
      comparator: "number_equal",
      explanation: "On soustrait 4 : 3x = 15. Puis on divise par 3 : x = 5.",
    }),
  },
];
