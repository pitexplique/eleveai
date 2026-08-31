/**
 * Question Bank 4e Maths
 *
 * Ce fichier regroupe toutes les banques de questions de 4e.
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

import { expressionsLitteralesBank } from "./expressions-litterales.bank";
import { equationsBank } from "./equations.bank";
import { distributiviteBank } from "./distributivite.bank";
import { perimetresBank } from "./perimetres.bank";
import { airesBank } from "./aires.bank";
import { parallelogrammesBank } from "./parallelogrammes.bank";
import { transformationsBank } from "./transformations.bank";
import { pythagoreBank } from "./pythagore.bank";
import { probabilitesBank } from"./probabilites.bank";
import { fractionsBank } from"./fractions.bank";
import { operationsRelatifsBank } from "./operations-relatifs.bank";
import { identitesRemarquablesBank} from "./identites-remarquables.bank"
import { factorisationBank } from "./factorisation.bank";
import { proportionnaliteBank} from "./proportionnalite.bank"
import { volumesBank } from "./volumes.bank";
import { thalesBank } from "./thales.bank";
import { statistiquesBank} from "./statistiques.bank"
import { algorithmiqueBank } from "./algorithmique.bank";
import { cosinusBank } from "./cosinus.bank";
import { puissancesBank } from "./puissances.bank";
import { ratiosBank } from "./ratios.bank";
import { echellesBank } from "./echelles.bank";
import { frequencesBank } from "./frequences.bank";
import { grandeursBank } from "./grandeurs.bank";
import { fonctionsBank } from "./fonctions.bank";
import { trianglesBank } from "./triangles.bank";
import { ordresGrandeurBank } from "./ordres-grandeur.bank";
import { divisibiliteBank } from "./divisibilite.bank";
import { nombresPremiersBank } from "./nombres-premiers.bank";
import { reperageBank } from "./reperage.bank";
import { visionEspaceBank } from "./vision-espace.bank";


// =========================
// AGRÉGATION DES BANKS 4e
// =========================

export const maths4eQuestionBank: TutorBankItemV4[] = [
  ...expressionsLitteralesBank,
  ...equationsBank,
  ...distributiviteBank,
  ...perimetresBank,
  ...airesBank,
  ...parallelogrammesBank,
  ...pythagoreBank,
  ...trianglesBank,
  ...ordresGrandeurBank,
  ...divisibiliteBank,
  ...nombresPremiersBank,
  ...reperageBank,
  ...visionEspaceBank,
  ...transformationsBank,
  ...probabilitesBank,
  ...frequencesBank,
  ...fractionsBank,
  ...operationsRelatifsBank,
  ...puissancesBank,
  ...identitesRemarquablesBank,
  ...factorisationBank,
  ...proportionnaliteBank,
  ...ratiosBank,
  ...echellesBank,
  ...volumesBank,
  ...grandeursBank,
  ...fonctionsBank,
  ...thalesBank,
  ...statistiquesBank,
  ...algorithmiqueBank,
  ...cosinusBank

];

export function getMaths4eQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = maths4eQuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}