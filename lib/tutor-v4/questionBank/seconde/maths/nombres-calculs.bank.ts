import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { buildMicroSkillCheckBank } from "./core";

export const nombresCalculsSecondeBank: TutorBankItemV4[] = [
  ...buildMicroSkillCheckBank("nombres_calculs", [
    "reels_intervalles",
    "arithmetique_entiers",
    "calcul_litteral_2de",
    "equations_inequations_1er_degre",
  ]),
  {
    kind: "template",
    id: "seconde_intervalle_appartenance_template_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "reels_intervalles",
    microId: "intervalle_appartenance",
    difficulty: 2,
    theme: "neutral",
    hint: "Un intervalle [a ; b[ contient a mais ne contient pas b.",
    tags: ["seconde", "intervalles", "qcm"],
    generate: () => {
      const a = -2;
      const b = 5;
      return {
        text: `Quel nombre appartient a l'intervalle [${a} ; ${b}[ ?`,
        format: "qcm",
        choices: ["0", "5", "-3", "6"],
        expected: ["0"],
        comparator: "mcq_exact",
        explanation: `L'intervalle [${a} ; ${b}[ contient les nombres superieurs ou egaux a ${a} et strictement inferieurs a ${b}. Donc 0 convient, mais 5 est exclu.`,
      };
    },
  },
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
  {
    kind: "template",
    id: "seconde_litteral_developper_template_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "calcul_litteral_2de",
    microId: "litteral_developper",
    difficulty: 2,
    theme: "neutral",
    hint: "Distribue le facteur devant la parenthese.",
    tags: ["seconde", "calcul_litteral", "qcm"],
    generate: () => ({
      text: "Quelle est la forme developpee de 2(x + 3) ?",
      format: "qcm",
      choices: ["2x + 6", "2x + 3", "x + 6", "2x + 5"],
      expected: ["2x + 6"],
      comparator: "mcq_exact",
      explanation: "On multiplie chaque terme de la parenthese par 2 : 2*x + 2*3 = 2x + 6.",
    }),
  },
];
