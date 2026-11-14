// lib/tutor-v4/questionBank/cm2/maths/suites.bank.ts
//
// ⭐ 14/11/2026 — Notion `suite` du CM2 réécrite en gabarits (voir
// suites-outils.ts) : avant, 2 à 9 squelettes par micro, des réponses courtes
// sans leurres et des flèches « +3 » qui donnaient la règle. Les anciens items
// (fixed_1… et tpl_1…) sont remplacés ; les gabarits qui reprennent leur rôle
// gardent leur id (tpl_1_addition, tpl_2_soustraction, tpl_4_decimal,
// tpl_5_piege_ecarts_variables, tpl_3_sentier, tpl_4_eau_decroissante,
// tpl_5_alternance, tpl_2_piege_multiplicatif…).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { suiteContinuerGabarits, suiteCroissanteGabarits, suiteDefiGabarits, suiteRegleGabarits } from "./suites-outils";

export const suitesBank: TutorBankItemV4[] = [
  ...suiteContinuerGabarits,
  ...suiteRegleGabarits,
  ...suiteCroissanteGabarits,
  ...suiteDefiGabarits,
];
