// Correcteurs des gabarits ajoutés depuis le 05/11/2026 (contrat : 6e/maths/correcteurs/types.ts).
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";

import { CORRECTEURS as statistiquesClasses } from "./statistiques-classes";
import { CORRECTEURS as croisementVariables } from "./croisement-variables";
import { CORRECTEURS as logiqueRaisonnement } from "./logique-raisonnement";
import { CORRECTEURS as vecteurCombinaison } from "./vecteur-combinaison";
import { CORRECTEURS as fonctionModeliser } from "./fonction-modeliser";
import { CORRECTEURS as demiPlansSystemes } from "./demi-plans-systemes";
import { CORRECTEURS as systemesDeterminant } from "./systemes-determinant";
import { CORRECTEURS as courbesAssociees } from "./courbes-associees";
import { CORRECTEURS as polynomesDivision } from "./polynomes-division";
import { CORRECTEURS as projectionDroite } from "./projection-droite";
import { CORRECTEURS as espacePosition } from "./espace-position";
import { CORRECTEURS as composeesTransformations } from "./composees-transformations";
import { CORRECTEURS as encadrementsOperations } from "./encadrements-operations";
import { CORRECTEURS as racineDenominateur } from "./racine-denominateur";
import { CORRECTEURS as valeurAbsolueEquations } from "./valeur-absolue-equations";
import { CORRECTEURS as homographiquePartieEntiere } from "./homographique-partie-entiere";
import { CORRECTEURS as fonctionsParIntervalles } from "./fonctions-par-intervalles";
import { CORRECTEURS as droitesPerpendiculaires } from "./droites-perpendiculaires";

export const CORRECTEURS_SECONDE: CorrecteursMaths = {
  ...statistiquesClasses,
  ...croisementVariables,
  ...logiqueRaisonnement,
  ...vecteurCombinaison,
  ...fonctionModeliser,
  ...demiPlansSystemes,
  ...systemesDeterminant,
  ...courbesAssociees,
  ...polynomesDivision,
  ...projectionDroite,
  ...espacePosition,
  ...composeesTransformations,
  ...encadrementsOperations,
  ...racineDenominateur,
  ...valeurAbsolueEquations,
  ...homographiquePartieEntiere,
  ...fonctionsParIntervalles,
  ...droitesPerpendiculaires,
};
