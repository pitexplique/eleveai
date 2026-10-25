// Tous les programmes de pays déjà mis en correspondance (voir ./types.ts).
import { BELGIQUE_P1, BELGIQUE_P2, BELGIQUE_P3, BELGIQUE_P4, BELGIQUE_P5, BELGIQUE_P6 } from "./belgique-primaire";
import { BELGIQUE_S6 } from "./belgique-humanites";
import { BELGIQUE_S1, BELGIQUE_S2, BELGIQUE_S3 } from "./belgique-secondaire";
import { COTE_DIVOIRE_3E, COTE_DIVOIRE_4E, COTE_DIVOIRE_5E, COTE_DIVOIRE_6E } from "./cote-divoire-college";
import { COTE_DIVOIRE_1RE, COTE_DIVOIRE_2NDE, COTE_DIVOIRE_TLE } from "./cote-divoire-lycee";
import {
  COTE_DIVOIRE_CE1,
  COTE_DIVOIRE_CE2,
  COTE_DIVOIRE_CM1,
  COTE_DIVOIRE_CM2,
  COTE_DIVOIRE_CP1,
  COTE_DIVOIRE_CP2,
} from "./cote-divoire-primaire";
import { ETATS_UNIS_GRADE_8 } from "./etats-unis-grade-8";
import { MAROC_3AC } from "./maroc-3ac";
import { MAROC_1AC, MAROC_2AC } from "./maroc-college";
import { MAROC_1BAC, MAROC_2BAC, MAROC_TC } from "./maroc-lycee";
import { ONTARIO_9E_MTH1W } from "./ontario-9e-mth1w";
import {
  QUEBEC_1E_ANNEE,
  QUEBEC_2E_ANNEE,
  QUEBEC_3E_ANNEE,
  QUEBEC_4E_ANNEE,
  QUEBEC_5E_ANNEE,
  QUEBEC_6E_ANNEE,
} from "./quebec-primaire";
import { QUEBEC_SEC_1, QUEBEC_SEC_2, QUEBEC_SEC_3, QUEBEC_SEC_4, QUEBEC_SEC_5 } from "./quebec-secondaire";
import { SENEGAL_3E, SENEGAL_4E, SENEGAL_5E, SENEGAL_6E } from "./senegal-moyen";
import { SENEGAL_1RE, SENEGAL_2NDE, SENEGAL_TLE } from "./senegal-secondaire";
import { SUISSE_3_4H } from "./suisse-romande-cycle1";
import { SUISSE_5_6H, SUISSE_7_8H } from "./suisse-romande-cycle2";
import { SUISSE_10H, SUISSE_11H, SUISSE_9H } from "./suisse-romande-cycle3";
import { SUISSE_GYMNASE } from "./suisse-romande-gymnase";
import type { ProgrammePays } from "./types";

export const PROGRAMMES_PAYS: ProgrammePays[] = [
  ONTARIO_9E_MTH1W,
  QUEBEC_SEC_1,
  QUEBEC_SEC_2,
  QUEBEC_SEC_3,
  QUEBEC_SEC_4,
  QUEBEC_SEC_5,
  // Le primaire après le secondaire : /pays/quebec sans classe ouvre toujours Sec 1.
  QUEBEC_1E_ANNEE,
  QUEBEC_2E_ANNEE,
  QUEBEC_3E_ANNEE,
  QUEBEC_4E_ANNEE,
  QUEBEC_5E_ANNEE,
  QUEBEC_6E_ANNEE,
  MAROC_1AC,
  MAROC_2AC,
  MAROC_3AC,
  MAROC_TC,
  MAROC_1BAC,
  MAROC_2BAC,
  ETATS_UNIS_GRADE_8,
  // Suisse romande (PER) : le cycle 3 d'abord, /pays/suisse sans classe ouvre 9H.
  SUISSE_9H,
  SUISSE_10H,
  SUISSE_11H,
  SUISSE_3_4H,
  SUISSE_5_6H,
  SUISSE_7_8H,
  SUISSE_GYMNASE,
  // Belgique (FWB) : le secondaire d'abord, /pays/belgique sans classe ouvre S1.
  BELGIQUE_S1,
  BELGIQUE_S2,
  BELGIQUE_S3,
  BELGIQUE_S6,
  BELGIQUE_P1,
  BELGIQUE_P2,
  BELGIQUE_P3,
  BELGIQUE_P4,
  BELGIQUE_P5,
  BELGIQUE_P6,
  SENEGAL_6E,
  SENEGAL_5E,
  SENEGAL_4E,
  SENEGAL_3E,
  SENEGAL_2NDE,
  SENEGAL_1RE,
  SENEGAL_TLE,
  COTE_DIVOIRE_6E,
  COTE_DIVOIRE_5E,
  COTE_DIVOIRE_4E,
  COTE_DIVOIRE_3E,
  COTE_DIVOIRE_2NDE,
  COTE_DIVOIRE_1RE,
  COTE_DIVOIRE_TLE,
  // Le primaire après : /pays/cote-divoire sans classe ouvre la 6e.
  COTE_DIVOIRE_CP1,
  COTE_DIVOIRE_CP2,
  COTE_DIVOIRE_CE1,
  COTE_DIVOIRE_CE2,
  COTE_DIVOIRE_CM1,
  COTE_DIVOIRE_CM2,
];

export type { ProgrammePays, ContenuPays, Couverture, RenvoiMicro } from "./types";
