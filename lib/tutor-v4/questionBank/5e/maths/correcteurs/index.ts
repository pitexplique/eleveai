import type { CorrecteursMaths } from "./types";
import { CORRECTEURS as aires } from "./aires";
import { CORRECTEURS as algorithmique } from "./algorithmique";
import { CORRECTEURS as algoEvenement } from "./algo-evenement";
import { CORRECTEURS as angles } from "./angles";
import { CORRECTEURS as calculLitteral } from "./calcul-litteral";
import { CORRECTEURS as conversions } from "./conversions";
import { CORRECTEURS as divisibilite } from "./divisibilite";
import { CORRECTEURS as fractions } from "./fractions";
import { CORRECTEURS as nombresRelatifs } from "./nombres-relatifs";
import { CORRECTEURS as operationsRelatifs } from "./operations-relatifs";
import { CORRECTEURS as parallelogrammes } from "./parallelogrammes";
import { CORRECTEURS as probabilites } from "./probabilites";
import { CORRECTEURS as proportionnalite } from "./proportionnalite";
import { CORRECTEURS as statistiques } from "./statistiques";
import { CORRECTEURS as symetrieCentrale } from "./symetrie_centrale";
import { CORRECTEURS as triangles } from "./triangles";
import { CORRECTEURS as valeursApprochees } from "./valeurs-approchees";
import { CORRECTEURS as volumes } from "./volumes";
import { CORRECTEURS as polygonesReguliers } from "./polygones-reguliers";
import { CORRECTEURS as airesLosangeTrapeze } from "./aires-losange-trapeze";

// Un fichier par banque, écrits en parallèle à partir du 09/10/2026.
export const CORRECTEURS_5E: CorrecteursMaths = {
  ...aires,
  ...algorithmique,
  ...algoEvenement,
  ...angles,
  ...calculLitteral,
  ...conversions,
  ...divisibilite,
  ...fractions,
  ...nombresRelatifs,
  ...operationsRelatifs,
  ...parallelogrammes,
  ...probabilites,
  ...proportionnalite,
  ...statistiques,
  ...symetrieCentrale,
  ...triangles,
  ...valeursApprochees,
  ...volumes,
  ...polygonesReguliers,
  ...airesLosangeTrapeze,
};
