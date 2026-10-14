import type { CorrecteursMaths } from "./types";
import { CORRECTEURS as aires } from "./aires";
import { CORRECTEURS as algorithmique } from "./algorithmique";
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
import { CORRECTEURS as volumes } from "./volumes";

// Un fichier par banque, écrits en parallèle à partir du 09/10/2026.
export const CORRECTEURS_5E: CorrecteursMaths = {
  ...aires,
  ...algorithmique,
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
  ...volumes,
};
