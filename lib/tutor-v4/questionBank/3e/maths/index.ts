/**
 * Question Bank 3e Maths
 *
 * Ce fichier regroupe toutes les banques de questions de 3e.
 *
 * 👉 Objectif :
 * - centraliser toutes les questions
 * - permettre au loader de récupérer facilement toutes les banks
 *
 * 👉 Convention :
 * - une bank par notion
 * - on les assemble ici
 */

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// =========================
// IMPORT DES BANKS
// =========================

import { nombresRationnelsBank } from "./nombres_rationnels.bank";
import { puissancesBank } from "./puissances.bank";
import { racineCarreeBank } from "./racine_carree.bank";
import { arithmetiqueBank } from "./arithmetique.bank";
import { volumesBank } from "./volumes.bank"; // déjà fait
import { proportionnaliteBank} from "./proportionnalite.bank"
import { pythagore3eBank } from "./pythagore.bank";
import { fonctionsBank } from "./fonctions.bank";
import { trigonometrieBank} from "./trigonometrie.bank"
// (tu ajouteras les autres plus tard)

// =========================
// AGRÉGATION DES BANKS 3e
// =========================

export const maths3eQuestionBank: TutorBankItemV4[] = [
  ...nombresRationnelsBank,
  ...puissancesBank,
  ...racineCarreeBank,
  ...arithmetiqueBank,
  ...volumesBank,
  ...proportionnaliteBank,
  ...pythagore3eBank,
  ...fonctionsBank,
  ...trigonometrieBank
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