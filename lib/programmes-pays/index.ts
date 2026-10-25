// Tous les programmes de pays déjà mis en correspondance (voir ./types.ts).
import { ETATS_UNIS_GRADE_8 } from "./etats-unis-grade-8";
import { MAROC_3AC } from "./maroc-3ac";
import { MAROC_1AC, MAROC_2AC } from "./maroc-college";
import { ONTARIO_9E_MTH1W } from "./ontario-9e-mth1w";
import { QUEBEC_SEC_1, QUEBEC_SEC_2, QUEBEC_SEC_3 } from "./quebec-secondaire";
import { SENEGAL_3E, SENEGAL_4E, SENEGAL_5E, SENEGAL_6E } from "./senegal-moyen";
import type { ProgrammePays } from "./types";

export const PROGRAMMES_PAYS: ProgrammePays[] = [
  ONTARIO_9E_MTH1W,
  QUEBEC_SEC_1,
  QUEBEC_SEC_2,
  QUEBEC_SEC_3,
  MAROC_1AC,
  MAROC_2AC,
  MAROC_3AC,
  ETATS_UNIS_GRADE_8,
  SENEGAL_6E,
  SENEGAL_5E,
  SENEGAL_4E,
  SENEGAL_3E,
];

export type { ProgrammePays, ContenuPays, Couverture, RenvoiMicro } from "./types";
