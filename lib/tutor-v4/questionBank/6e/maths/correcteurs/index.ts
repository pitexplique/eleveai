import type { CorrecteursMaths } from "./types";
import { CORRECTEURS as aires } from "./aires";
import { CORRECTEURS as algebre } from "./algebre";
import { CORRECTEURS as angles } from "./angles";
import { CORRECTEURS as bissectrice } from "./bissectrice";
import { CORRECTEURS as calculMental } from "./calcul-mental";
import { CORRECTEURS as calculPose } from "./calcul-pose";
import { CORRECTEURS as cercle } from "./cercle";
import { CORRECTEURS as cercleCirconscrit } from "./cercle-circonscrit";
import { CORRECTEURS as decimaux } from "./decimaux";
import { CORRECTEURS as demiDroite } from "./demi-droite";
import { CORRECTEURS as distances } from "./distances";
import { CORRECTEURS as durees } from "./durees";
import { CORRECTEURS as echelles } from "./echelles";
import { CORRECTEURS as entiers } from "./entiers";
import { CORRECTEURS as fractions } from "./fractions";
import { CORRECTEURS as fractionsCalcul } from "./fractions-calcul";
import { CORRECTEURS as longueurs } from "./longueurs";
import { CORRECTEURS as mediatrice } from "./mediatrice";
import { CORRECTEURS as perimetres } from "./perimetres";
import { CORRECTEURS as pourcentages } from "./pourcentages";
import { CORRECTEURS as proportionnalite } from "./proportionnalite";
import { CORRECTEURS as quadrilateres } from "./quadrilateres";
import { CORRECTEURS as symetrie } from "./symetrie";
import { CORRECTEURS as triangles } from "./triangles";
import { CORRECTEURS as visionEspace } from "./vision-espace";
import { CORRECTEURS as volumes } from "./volumes";

// Un fichier par banque : ils sont écrits en parallèle (06/10/2026).
export const CORRECTEURS_6E: CorrecteursMaths = {
  ...aires,
  ...algebre,
  ...angles,
  ...bissectrice,
  ...calculMental,
  ...calculPose,
  ...cercle,
  ...cercleCirconscrit,
  ...decimaux,
  ...demiDroite,
  ...distances,
  ...durees,
  ...echelles,
  ...entiers,
  ...fractions,
  ...fractionsCalcul,
  ...longueurs,
  ...mediatrice,
  ...perimetres,
  ...pourcentages,
  ...proportionnalite,
  ...quadrilateres,
  ...symetrie,
  ...triangles,
  ...visionEspace,
  ...volumes,
};
