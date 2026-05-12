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
import { puissancesBank } from "./puissances.bank";
import { racineCarreeBank } from "./racine_carree.bank";
import { arithmetiqueBank } from "./arithmetique.bank";

import { proportionnaliteBank } from "./proportionnalite.bank";

import { calculLitteralBank } from "./calcul_litteral.bank";
import { equationsBank } from "./equations.bank";

import { fonctionsBank } from "./fonctions.bank";
import { affineBank } from "./affine.bank";

import { pythagore3eBank } from "./pythagore.bank";
import { trigonometrieBank } from "./trigonometrie.bank";
import { trianglesBank } from "./triangles.bank";
import { thalesBank } from "./thales.bank";

import { transformationsBank } from "./transformations.bank";

import { geometrieEspaceBank } from "./geometrie-espace.bank";
import { airesBank } from "./aires.bank";
import { perimetresBank } from "./perimetres.bank";
import { volumesBank } from "./volumes.bank";
import { sectionsSolidesBank } from "./sections_solides.bank";

import { probabilitesBank } from "./probabilites.bank";
import { statistiquesBank } from "./statistiques.bank";

import { algorithmiqueBank } from "./algorithmique.bank";

// =========================
// AGRÉGATION DES BANKS 3e
// =========================

export const maths3eQuestionBank: TutorBankItemV4[] = [
  ...nombresRationnelsBank,
  ...puissancesBank,
  ...racineCarreeBank,
  ...arithmetiqueBank,

  ...proportionnaliteBank,

  ...calculLitteralBank,
  ...equationsBank,

  ...fonctionsBank,
  ...affineBank,

  ...pythagore3eBank,
  ...trigonometrieBank,
  ...trianglesBank,
  ...thalesBank,

  ...transformationsBank,

  ...geometrieEspaceBank,
  ...airesBank,
  ...perimetresBank,
  ...volumesBank,
  ...sectionsSolidesBank,

  ...probabilitesBank,
  ...statistiquesBank,

  ...algorithmiqueBank
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