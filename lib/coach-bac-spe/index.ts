// lib/coach-bac-spe/index.ts

import type { CoachBacItem, CoachBacProblem } from "./types";

import { deriveesBank } from "./banks/derivees.bank";
import { suitesBank } from "./banks/suites.bank";
import { fonctionsBank } from "./banks/fonctions.bank";
import { limitesBank } from "./banks/limites.bank";
import { exponentielleBank } from "./banks/exponentielle.bank";
import { logarithmeBank } from "./banks/logarithme.bank";
import { probabilitesBank } from "./banks/probabilites.bank";
import { variablesAleatoiresBank } from "./banks/variables-aleatoires.bank";
import { geometrieEspaceBank } from "./banks/geometrie-espace.bank";
import { algorithmiqueBank } from "./banks/algorithmique.bank";

import { problemesGuidesBank } from "./problemes/problemes-guides.bank";
import { sujetsExpressBank } from "./problemes/sujets-express.bank";

export const coachBacItems: CoachBacItem[] = [
  ...deriveesBank,
  ...suitesBank,
  ...fonctionsBank,
  ...limitesBank,
  ...exponentielleBank,
  ...logarithmeBank,
  ...probabilitesBank,
  ...variablesAleatoiresBank,
  ...geometrieEspaceBank,
  ...algorithmiqueBank,
];

export const coachBacProblems: CoachBacProblem[] = [
  ...problemesGuidesBank,
  ...sujetsExpressBank,
];

export function getCoachBacItemById(id: string): CoachBacItem | undefined {
  return coachBacItems.find((item) => item.id === id);
}

export function getCoachBacItemsByIds(ids: string[]): CoachBacItem[] {
  return ids
    .map((id) => getCoachBacItemById(id))
    .filter((item): item is CoachBacItem => Boolean(item));
}

export function getCoachBacProblemById(
  id: string
): CoachBacProblem | undefined {
  return coachBacProblems.find((problem) => problem.id === id);
}