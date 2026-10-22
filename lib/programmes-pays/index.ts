// Tous les programmes de pays déjà mis en correspondance (voir ./types.ts).
import { ETATS_UNIS_GRADE_8 } from "./etats-unis-grade-8";
import { MAROC_3AC } from "./maroc-3ac";
import { ONTARIO_9E_MTH1W } from "./ontario-9e-mth1w";
import { QUEBEC_SEC_1, QUEBEC_SEC_2, QUEBEC_SEC_3 } from "./quebec-secondaire";
import type { ProgrammePays } from "./types";

export const PROGRAMMES_PAYS: ProgrammePays[] = [
  ONTARIO_9E_MTH1W,
  QUEBEC_SEC_1,
  QUEBEC_SEC_2,
  QUEBEC_SEC_3,
  MAROC_3AC,
  ETATS_UNIS_GRADE_8,
];

export type { ProgrammePays, ContenuPays, Couverture, RenvoiMicro } from "./types";
