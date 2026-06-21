import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { buildMicroSkillCheckBank } from "./core";

export const algorithmiqueSecondeBank: TutorBankItemV4[] = [
  // algorithmique_python_2de est désormais servi par algorithmique-python.bank.ts
  // Couverture provisoire de la notion transversale logique (banque dédiée à venir)
  ...buildMicroSkillCheckBank("logique", ["logique_ensembles"]),
];
