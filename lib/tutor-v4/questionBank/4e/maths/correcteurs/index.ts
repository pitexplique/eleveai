import type { CorrecteursMaths } from "./types";
import { CORRECTEURS as proportionnalite } from "./proportionnalite";
import { CORRECTEURS as ratios } from "./ratios";
import { CORRECTEURS as echelles } from "./echelles";

// 07/10/2026 : la proportionnalité d'abord (cours de Frédéric le 08/10) ; les
// autres chapitres de 4e s'ajouteront ici, un fichier par banque.
export const CORRECTEURS_4E: CorrecteursMaths = {
  ...proportionnalite,
  ...ratios,
  ...echelles,
};
