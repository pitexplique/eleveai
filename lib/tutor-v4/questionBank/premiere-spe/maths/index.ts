import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// --- Banques par notion (1 banque par notion, standard seconde/terminale, >=10 items/micro) ---
import { suitesBank } from "./suites.bank";
import { secondDegreBank } from "./second-degre.bank";
import { derivationBank } from "./derivation.bank";
import { variationsFonctionsBank } from "./variations-fonctions.bank";
import { exponentielleBank } from "./exponentielle.bank";
import { trigonometrieBank } from "./trigonometrie.bank";
import { produitScalaireBank } from "./produit-scalaire.bank";
import { geometrieRepereeBank } from "./geometrie-reperee.bank";
import { probabilitesConditionnellesBank } from "./probabilites-conditionnelles.bank";
import { variablesAleatoiresBank } from "./variables-aleatoires.bank";
import { algorithmiqueBank } from "./algorithmique.bank";

export const mathsPremiereSpeQuestionBank: TutorBankItemV4[] = [
  // === ALGÈBRE ===
  ...suitesBank,
  ...secondDegreBank,
  // === ANALYSE ===
  ...derivationBank,
  ...variationsFonctionsBank,
  ...exponentielleBank,
  ...trigonometrieBank,
  // === GÉOMÉTRIE ===
  ...produitScalaireBank,
  ...geometrieRepereeBank,
  // === PROBABILITÉS ET STATISTIQUES ===
  ...probabilitesConditionnellesBank,
  ...variablesAleatoiresBank,
  // === ALGORITHMIQUE ===
  ...algorithmiqueBank,
];

export function getMathsPremiereSpeQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = mathsPremiereSpeQuestionBank;
  if (args?.notionId) bank = bank.filter((i) => i.notionId === args.notionId);
  if (args?.microId) bank = bank.filter((i) => i.microId === args.microId);
  return bank;
}
