// lib/concours-general/index.ts

import type {
  ConcoursGeneralDifficulty,
  ConcoursGeneralItem,
  ConcoursGeneralNiveau,
  ConcoursGeneralTheme,
} from "./types";

import { nombresLogiqueBank } from "./banks/nombres-logique.bank";
import { proportionnaliteGrandeursBank } from "./banks/proportionnalite-grandeurs.bank";
import { geometrieBank } from "./banks/geometrie.bank";
import { mathsSciencesDonneesBank } from "./banks/maths-sciences-donnees.bank";

export const concoursGeneralBank: ConcoursGeneralItem[] = [
  ...nombresLogiqueBank,
  ...proportionnaliteGrandeursBank,
  ...geometrieBank,
  ...mathsSciencesDonneesBank,
];

const niveauOrder: Record<ConcoursGeneralNiveau, number> = {
  "6e": 1,
  "5e": 2,
  "4e": 3,
  "3e": 4,
};

export function getConcoursGeneralBank(args?: {
  theme?: ConcoursGeneralTheme | null;
  accessibleFor?: ConcoursGeneralNiveau | null;
  difficulty?: ConcoursGeneralDifficulty | null;
}) {
  let bank = concoursGeneralBank;

  if (args?.theme) {
    bank = bank.filter((item) => item.theme === args.theme);
  }

  if (args?.accessibleFor) {
    const userLevel = niveauOrder[args.accessibleFor];

    bank = bank.filter((item) => {
      const minLevel = niveauOrder[item.accessibleFrom];
      return minLevel <= userLevel;
    });
  }

  if (args?.difficulty) {
    bank = bank.filter((item) => item.difficulty === args.difficulty);
  }

  return bank;
}

export function getConcoursGeneralItemById(id: string) {
  return concoursGeneralBank.find((item) => item.id === id) ?? null;
}

export function getConcoursGeneralItemsByIds(ids: string[]) {
  return ids
    .map((id) => getConcoursGeneralItemById(id))
    .filter((item): item is ConcoursGeneralItem => item !== null);
}