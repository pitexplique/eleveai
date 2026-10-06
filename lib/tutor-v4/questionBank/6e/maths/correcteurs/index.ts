import type { CorrecteursMaths } from "./types";
import { CORRECTEURS as algebre } from "./algebre";
import { CORRECTEURS as calculMental } from "./calcul-mental";
import { CORRECTEURS as calculPose } from "./calcul-pose";
import { CORRECTEURS as decimaux } from "./decimaux";
import { CORRECTEURS as demiDroite } from "./demi-droite";
import { CORRECTEURS as echelles } from "./echelles";
import { CORRECTEURS as entiers } from "./entiers";
import { CORRECTEURS as fractions } from "./fractions";
import { CORRECTEURS as fractionsCalcul } from "./fractions-calcul";
import { CORRECTEURS as pourcentages } from "./pourcentages";
import { CORRECTEURS as proportionnalite } from "./proportionnalite";

// Un fichier par banque : ils sont écrits en parallèle (06/10/2026).
export const CORRECTEURS_6E: CorrecteursMaths = {
  ...algebre,
  ...calculMental,
  ...calculPose,
  ...decimaux,
  ...demiDroite,
  ...echelles,
  ...entiers,
  ...fractions,
  ...fractionsCalcul,
  ...pourcentages,
  ...proportionnalite,
};
