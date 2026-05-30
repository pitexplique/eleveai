import { fractionsBank } from "./banks/fractions.bank";
import { puissancesBank } from "./banks/puissances.bank";
import { proportionnaliteBank } from "./banks/proportionnalite.bank";
import { algebreBank } from "./banks/algebre.bank";
import { geometrieBank } from "./banks/geometrie.bank";
import { fonctionsBank } from "./banks/fonctions.bank";
import { statistiquesProbabilitesBank } from "./banks/statistiques-probabilites.bank";
import { problemesGuidesBank } from "./problemes/problemes-guides.bank";
import { sujetsExpressBank } from "./problemes/sujets-express.bank";

import type { CoachBrevetItem, CoachBrevetProblem } from "./types";

export const coachBrevetItems: CoachBrevetItem[] = [
  ...fractionsBank,
  ...puissancesBank,
  ...proportionnaliteBank,
  ...algebreBank,
  ...geometrieBank,
  ...fonctionsBank,
  ...statistiquesProbabilitesBank,
];

export const coachBrevetProblems: CoachBrevetProblem[] = [
  ...problemesGuidesBank,
  ...sujetsExpressBank,
];

export function getCoachBrevetItemById(id: string): CoachBrevetItem | undefined {
  return coachBrevetItems.find((item) => item.id === id);
}

export function getCoachBrevetItemsByIds(ids: string[]): CoachBrevetItem[] {
  return ids
    .map((id) => getCoachBrevetItemById(id))
    .filter((item): item is CoachBrevetItem => item !== undefined);
}

export function getCoachBrevetProblemById(id: string): CoachBrevetProblem | undefined {
  return coachBrevetProblems.find((p) => p.id === id);
}

export { coachBrevetWeekly } from "./weekly";
export type {
  CoachBrevetItem,
  CoachBrevetFixedItem,
  CoachBrevetTemplateItem,
  CoachBrevetProblem,
  CoachBrevetDay,
  CoachBrevetNotionId,
  CoachBrevetFormat,
  CoachBrevetDifficulty,
  CoachBrevetAnswerResult,
} from "./types";
