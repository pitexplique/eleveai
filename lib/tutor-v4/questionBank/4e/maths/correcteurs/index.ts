import type { CorrecteursMaths } from "./types";
import { CORRECTEURS as algorithmique } from "./algorithmique";
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
import { CORRECTEURS as proportionnalite } from "./proportionnalite";
import { CORRECTEURS as puissances } from "./puissances";
import { CORRECTEURS as ratios } from "./ratios";

// Un fichier par banque (proportionnalité le 07/10, le reste à partir du 08/10).
export const CORRECTEURS_4E: CorrecteursMaths = {
  ...algorithmique,
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
  ...proportionnalite,
  ...puissances,
  ...ratios,
};
