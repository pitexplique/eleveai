/**
 * Question Bank 3e Maths
 *
 * Ce fichier regroupe toutes les banques de questions de 3e.
 */

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// =========================
// IMPORT DES BANKS
// =========================

import { nombresRationnelsBank } from "./nombres_rationnels.bank";
import { calculLitteralBank } from "./calcul_litteral.bank";
import { puissancesBank } from "./puissances.bank";
import { racineCarreeBank } from "./racine_carree.bank";
import { arithmetiqueBank } from "./arithmetique.bank";
import { volumesBank } from "./volumes.bank";
import { proportionnaliteBank } from "./proportionnalite.bank";
import { pythagore3eBank } from "./pythagore.bank";
import { fonctionsBank } from "./fonctions.bank";
import { trigonometrieBank } from "./trigonometrie.bank";
import { probabilitesBank } from "./probabilites.bank";
import { equationsBank } from "./equations.bank";
import { statistiquesBank } from "./statistiques.bank";
import { affineBank } from "./affine.bank";

// =========================
// AGRÉGATION DES BANKS 3e
// =========================

export const maths3eQuestionBank: TutorBankItemV4[] = [
  ...nombresRationnelsBank,
  ...calculLitteralBank,
  ...puissancesBank,
  ...racineCarreeBank,
  ...arithmetiqueBank,
  ...volumesBank,
  ...proportionnaliteBank,
  ...pythagore3eBank,
  ...fonctionsBank,
  ...trigonometrieBank,
  ...probabilitesBank,
  ...equationsBank,
  ...statistiquesBank,
  ...affineBank,
];

export function getMaths3eQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = maths3eQuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}