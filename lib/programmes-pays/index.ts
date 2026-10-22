// Tous les programmes de pays déjà mis en correspondance (voir ./types.ts).
import { MAROC_3AC } from "./maroc-3ac";
import { ONTARIO_9E_MTH1W } from "./ontario-9e-mth1w";
import type { ProgrammePays } from "./types";

export const PROGRAMMES_PAYS: ProgrammePays[] = [ONTARIO_9E_MTH1W, MAROC_3AC];

export type { ProgrammePays, ContenuPays, Couverture, RenvoiMicro } from "./types";
