// Correcteurs des gabarits de maths de CM2 (05/11/2026) : même contrat que la 6e
// (voir lib/tutor-v4/questionBank/6e/maths/correcteurs/types.ts). Seuls les
// gabarits ajoutés depuis ont un correcteur : le vérificateur se lance donc en
// CM2 sur des micros nommées, pas sur toute la classe.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/types";
import { CORRECTEURS as entiersDiviseurs } from "./entiers-diviseurs";
import { CORRECTEURS as aiguillesPatronsProbas } from "./aiguilles-patrons-probas";
import { CORRECTEURS as figuresCodage } from "./figures-codage";
import { CORRECTEURS as anglesSansMesure } from "./angles-sans-mesure";
import { CORRECTEURS as airesUnites } from "./aires-unites";
import { CORRECTEURS as problemesRecherche } from "./problemes-recherche";
import { CORRECTEURS as operationsDecimales } from "./operations-decimales";
import { CORRECTEURS as calculMentalDecimal } from "./calcul-mental-decimal";
import { CORRECTEURS as decimauxFractionsDecimales } from "./decimaux-fractions-decimales";

export const CORRECTEURS_CM2: CorrecteursMaths = {
  ...entiersDiviseurs,
  ...aiguillesPatronsProbas,
  ...figuresCodage,
  ...anglesSansMesure,
  ...airesUnites,
  ...problemesRecherche,
  ...operationsDecimales,
  ...calculMentalDecimal,
  ...decimauxFractionsDecimales,
};
