import type { CorrecteursMaths } from "./types";
import { CORRECTEURS as conversions } from "./conversions";
import { CORRECTEURS as divisibilite } from "./divisibilite";
import { CORRECTEURS as nombresRelatifs } from "./nombres-relatifs";
import { CORRECTEURS as operationsRelatifs } from "./operations-relatifs";
import { CORRECTEURS as proportionnalite } from "./proportionnalite";
import { CORRECTEURS as statistiques } from "./statistiques";

// Un fichier par banque, écrits en parallèle à partir du 09/10/2026.
export const CORRECTEURS_5E: CorrecteursMaths = {
  ...conversions,
  ...divisibilite,
  ...nombresRelatifs,
  ...operationsRelatifs,
  ...proportionnalite,
  ...statistiques,
};
