import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { buildMicroSkillCheckBank } from "./core";

export const fonctionsSecondeBank: TutorBankItemV4[] = [
  ...buildMicroSkillCheckBank("fonctions", [
    "fonction_vocabulaire_2de",
    "fonction_variations_extremums",
    "fonctions_affines_2de",
    "fonctions_reference_2de",
  ]),
  {
    kind: "template",
    id: "seconde_fonction_image_template_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonction_vocabulaire_2de",
    microId: "fonction_image_formule",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace x par 4 dans l'expression de f.",
    tags: ["seconde", "fonction", "image"],
    generate: () => ({
      text: "Soit f(x) = 2x - 3. Combien vaut f(4) ?",
      format: "short",
      expected: ["5"],
      comparator: "number_equal",
      explanation: "f(4) = 2*4 - 3 = 8 - 3 = 5.",
    }),
  },
  {
    kind: "template",
    id: "seconde_affine_signe_template_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_affines_2de",
    microId: "affine_signe",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche d'abord ou 2x - 6 est nul.",
    tags: ["seconde", "affine", "signe"],
    generate: () => ({
      text: "Pour f(x) = 2x - 6, sur quel intervalle f(x) est-elle positive ?",
      format: "qcm",
      choices: ["[3 ; +infini[", "]-infini ; 3]", "[0 ; 3]", "]-infini ; 0]"],
      expected: ["[3 ; +infini["],
      comparator: "mcq_exact",
      explanation: "2x - 6 >= 0 equivaut a 2x >= 6, donc x >= 3.",
    }),
  },
];
