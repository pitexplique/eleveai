import type { CorrecteursMaths } from "./types";
import { CORRECTEURS as aires } from "./aires";
import { CORRECTEURS as algorithmique } from "./algorithmique";
import { CORRECTEURS as cosinus } from "./cosinus";
import { CORRECTEURS as distributivite } from "./distributivite";
import { CORRECTEURS as divisibilite } from "./divisibilite";
import { CORRECTEURS as echelles } from "./echelles";
import { CORRECTEURS as equations } from "./equations";
import { CORRECTEURS as expressionsLitterales } from "./expressions-litterales";
import { CORRECTEURS as factorisation } from "./factorisation";
import { CORRECTEURS as fonctions } from "./fonctions";
import { CORRECTEURS as fractions } from "./fractions";
import { CORRECTEURS as identitesRemarquables } from "./identites-remarquables";
import { CORRECTEURS as nombresPremiers } from "./nombres-premiers";
import { CORRECTEURS as operationsRelatifs } from "./operations-relatifs";
import { CORRECTEURS as ordresGrandeur } from "./ordres-grandeur";
import { CORRECTEURS as parallelogrammes } from "./parallelogrammes";
import { CORRECTEURS as perimetres } from "./perimetres";
import { CORRECTEURS as proportionnalite } from "./proportionnalite";
import { CORRECTEURS as puissances } from "./puissances";
import { CORRECTEURS as pythagore } from "./pythagore";
import { CORRECTEURS as ratios } from "./ratios";
import { CORRECTEURS as reperage } from "./reperage";
import { CORRECTEURS as thales } from "./thales";
import { CORRECTEURS as transformations } from "./transformations";
import { CORRECTEURS as triangles } from "./triangles";

// Un fichier par banque (proportionnalité le 07/10, le reste à partir du 08/10).
export const CORRECTEURS_4E: CorrecteursMaths = {
  ...aires,
  ...algorithmique,
  ...cosinus,
  ...distributivite,
  ...divisibilite,
  ...echelles,
  ...equations,
  ...expressionsLitterales,
  ...factorisation,
  ...fonctions,
  ...fractions,
  ...identitesRemarquables,
  ...nombresPremiers,
  ...operationsRelatifs,
  ...ordresGrandeur,
  ...parallelogrammes,
  ...perimetres,
  ...proportionnalite,
  ...puissances,
  ...pythagore,
  ...ratios,
  ...reperage,
  ...thales,
  ...transformations,
  ...triangles,
};
