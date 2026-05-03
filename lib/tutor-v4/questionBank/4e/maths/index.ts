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
import { pythagoreBank } from "./pythagore.bank";
import { probabilitesBank } from"./probabilites.bank";
import { fractionsBank } from"./fractions.bank";
import { operationsRelatifsBank } from "./operations-relatifs.banks";
import { identitesRemarquablesBank} from "./identites-remarquables.bank"
import { factorisationBank } from "./factorisation.bank";
import { proportionnaliteBank} from "./proportionnalite.bank"
import { volumesBank } from "./volumes.bank";
import { thalesBank } from "./thales.bank";


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
  ...probabilitesBank,
  ...fractionsBank,
  ...operationsRelatifsBank,
  ...identitesRemarquablesBank,
  ...factorisationBank,
  ...proportionnaliteBank,
  ...volumesBank,
  ...thalesBank
  
];