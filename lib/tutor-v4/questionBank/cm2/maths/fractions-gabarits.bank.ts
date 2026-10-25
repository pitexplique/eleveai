// CM2 · notion « fraction » — les GÉNÉRATEURS des 7 micros (25/10/2026).
//
// ⛔⛔ Mesuré le 25/10 (scripts/mesurer-squelettes-coach.ts cm2 fraction) : les
// 7 micros rouges, 4 à 12 squelettes, 14 à 18 phrases déjà vues sur 20 ; quatre
// micros (comparer, équivalente, décimale, défi) sans aucun gabarit. Les anciens
// gabarits de fractions.bank.ts (une seule phrase chacun) sont remplacés ici,
// avec leurs ids quand l'idée est la même. Les items figés y restent.
// Chaque gabarit tire prénom × objet/situation × tournure ; outils et règles
// (jamais deux choix de même valeur) dans fractions-gabarits-outils.ts.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { fractionsGabaritsLire } from "./fractions-gabarits-lire";
import { fractionsGabaritsRepresenter } from "./fractions-gabarits-representer";
import { fractionsGabaritsDroite } from "./fractions-gabarits-droite";
import { fractionsGabaritsComparer } from "./fractions-gabarits-comparer";
import { fractionsGabaritsEquivalente } from "./fractions-gabarits-equivalente";
import { fractionsGabaritsDecimale } from "./fractions-gabarits-decimale";
import { fractionsGabaritsDefi } from "./fractions-gabarits-defi";

export const fractionsGabaritsBank: TutorBankItemV4[] = [
  ...fractionsGabaritsLire,
  ...fractionsGabaritsRepresenter,
  ...fractionsGabaritsDroite,
  ...fractionsGabaritsComparer,
  ...fractionsGabaritsEquivalente,
  ...fractionsGabaritsDecimale,
  ...fractionsGabaritsDefi,
];
