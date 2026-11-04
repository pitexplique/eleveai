// Renfort des puissances 2de (04/11/2026).
//
// Mesure du 04/11 (scripts/mesurer-squelettes-coach.ts) : 5 à 9 squelettes
// par micro, 15 à 19 répétitions sur 20. On branche les générateurs communs
// (../../puissances-regles-commun.ts : règles, exposants négatifs, enchaînement
// du contrôle commun de mars 2025, notation scientifique) et, pour le calcul
// d'une puissance et la notation scientifique, les gabarits de la 4e.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  gabarit4ePuissances as gab4e,
  genCalculScientifique,
  genEnchainement,
  genExposantNegatif,
  genProduitMemeBase,
  genPuissanceDePuissance,
  genQuotientMemeBase,
  genVraiFaux,
} from "@/lib/tutor-v4/questionBank/puissances-regles-commun";

const C_CON = gab4e("4e_puissance_comprendre_tpl_2_condenser");
const K_VAL = gab4e("4e_puissance_calculer_tpl_1");
const K_PIE = gab4e("4e_puissance_calculer_tpl_2_piege_multiplication");
const K_SIG = gab4e("4e_puissance_calculer_tpl_3_signe");
const N_FRA = gab4e("4e_puissance_exposant_negatif_tpl_1_fraction");
const N_DEC = gab4e("4e_puissance_exposant_negatif_tpl_2_decimal");
const D_VAL = gab4e("4e_puissance_dix_tpl_1_valeur");
const D_ECR = gab4e("4e_puissance_dix_tpl_2_ecrire");
const D_MUL = gab4e("4e_puissance_dix_tpl_3_multiplier");
const S_GRA = gab4e("4e_puissance_notation_scientifique_tpl_1_grand");
const S_PET = gab4e("4e_puissance_notation_scientifique_tpl_2_petit");
const S_CEX = gab4e("4e_puissance_comparer_tpl_1_exposants");
const S_CMA = gab4e("4e_puissance_comparer_tpl_2_mantisses");
const S_RAN = gab4e("4e_puissance_comparer_tpl_3_ranger");
const F_ORD = gab4e("4e_puissance_defi_tpl_2_ordre_scientifique");

const L = { niveau: "lycee" as const };
const LN = { niveau: "lycee" as const, negatifs: true };
const LNC = { niveau: "lycee" as const, negatifs: true, contexte: true };

const rang: Record<string, number> = {};
function tpl(microId: string, difficulty: number, generate: () => any, hint: string): TutorBankItemV4 {
  const cle = `${microId}_${difficulty}`;
  rang[cle] = (rang[cle] ?? 0) + 1;
  return {
    kind: "template",
    id: `seconde_puiss_renfort_${cle}_${rang[cle]}`,
    niveau: "seconde",
    matiere: "maths",
    notionId: "puissances_2de",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["seconde", "maths", "puissances", "renfort", "template"],
    generate,
  } as TutorBankItemV4;
}

const H_DEF = "aⁿ, c’est a écrit n fois en facteur.";
const H_PQ = "Même base : aᵐ × aⁿ = aᵐ⁺ⁿ et aᵐ ÷ aⁿ = aᵐ⁻ⁿ.";
const H_PP = "(aᵐ)ⁿ = aᵐˣⁿ : on multiplie les exposants.";
const H_NEG = "a⁻ⁿ = 1/aⁿ : un inverse, jamais un nombre négatif.";
const H_ENC = "Parenthèses d’abord (puissance de puissance), puis produits, puis quotient.";
const H_SCI = "Notation scientifique : a × 10ⁿ avec 1 ≤ a < 10.";

export const puissancesRenfort2de: TutorBankItemV4[] = [
  // puiss_calcul — ★1 à ★3
  tpl("puiss_calcul", 1, K_VAL, H_DEF),
  tpl("puiss_calcul", 1, C_CON, H_DEF),
  tpl("puiss_calcul", 1, D_VAL, H_DEF),
  tpl("puiss_calcul", 2, K_VAL, H_DEF),
  tpl("puiss_calcul", 2, K_PIE, H_DEF),
  tpl("puiss_calcul", 2, K_SIG, "Regarde la parenthèse : (−a)ⁿ n’est pas −aⁿ."),
  tpl("puiss_calcul", 2, D_ECR, H_DEF),
  tpl("puiss_calcul", 3, K_SIG, "Regarde la parenthèse : (−a)ⁿ n’est pas −aⁿ."),
  tpl("puiss_calcul", 3, K_PIE, H_DEF),
  tpl("puiss_calcul", 3, () => genVraiFaux(L), H_PQ),

  // puiss_produit_quotient — ★2 à ★4
  tpl("puiss_produit_quotient", 2, () => genProduitMemeBase(L), H_PQ),
  tpl("puiss_produit_quotient", 2, () => genQuotientMemeBase(L), H_PQ),
  tpl("puiss_produit_quotient", 2, () => genVraiFaux(L), H_PQ),
  tpl("puiss_produit_quotient", 3, () => genProduitMemeBase(LN), H_PQ),
  tpl("puiss_produit_quotient", 3, () => genQuotientMemeBase(LN), H_PQ),
  tpl("puiss_produit_quotient", 3, () => genVraiFaux(LN), H_PQ),
  tpl("puiss_produit_quotient", 4, () => genProduitMemeBase(LNC), H_PQ),
  tpl("puiss_produit_quotient", 4, () => genQuotientMemeBase(LNC), H_PQ),
  tpl("puiss_produit_quotient", 4, () => genEnchainement(LN), H_ENC),

  // puiss_puissance_puissance — ★2 à ★4
  tpl("puiss_puissance_puissance", 2, () => genPuissanceDePuissance(L), H_PP),
  tpl("puiss_puissance_puissance", 2, () => genVraiFaux(L), H_PP),
  tpl("puiss_puissance_puissance", 2, () => genPuissanceDePuissance({ niveau: "lycee", contexte: true }), H_PP),
  tpl("puiss_puissance_puissance", 3, () => genPuissanceDePuissance(LN), H_PP),
  tpl("puiss_puissance_puissance", 3, () => genVraiFaux(LN), H_PP),
  tpl("puiss_puissance_puissance", 3, () => genEnchainement(LN), H_ENC),
  tpl("puiss_puissance_puissance", 4, () => genPuissanceDePuissance(LNC), H_PP),
  tpl("puiss_puissance_puissance", 4, () => genEnchainement(LN), H_ENC),
  tpl("puiss_puissance_puissance", 4, () => genPuissanceDePuissance(LN), H_PP),

  // puiss_exposant_negatif — ★2 à ★4
  tpl("puiss_exposant_negatif", 2, () => genExposantNegatif(L), H_NEG),
  tpl("puiss_exposant_negatif", 2, N_DEC, H_NEG),
  tpl("puiss_exposant_negatif", 2, N_FRA, H_NEG),
  tpl("puiss_exposant_negatif", 3, () => genExposantNegatif(LN), H_NEG),
  tpl("puiss_exposant_negatif", 3, N_FRA, H_NEG),
  tpl("puiss_exposant_negatif", 3, () => genVraiFaux(LN), H_NEG),
  tpl("puiss_exposant_negatif", 4, () => genExposantNegatif(LNC), H_NEG),
  tpl("puiss_exposant_negatif", 4, () => genQuotientMemeBase(LN), H_PQ),
  tpl("puiss_exposant_negatif", 4, () => genEnchainement(LN), H_ENC),

  // puiss_expression_composee — ★3 à ★5
  tpl("puiss_expression_composee", 3, () => genEnchainement(L), H_ENC),
  tpl("puiss_expression_composee", 3, () => genProduitMemeBase(LN), H_PQ),
  tpl("puiss_expression_composee", 3, () => genVraiFaux(LN), H_PQ),
  tpl("puiss_expression_composee", 4, () => genEnchainement(LN), H_ENC),
  tpl("puiss_expression_composee", 4, () => genQuotientMemeBase(LNC), H_PQ),
  tpl("puiss_expression_composee", 4, () => genPuissanceDePuissance(LN), H_PP),
  tpl("puiss_expression_composee", 5, () => genEnchainement(LN), H_ENC),
  tpl("puiss_expression_composee", 5, () => genEnchainement(LN), H_ENC),
  tpl("puiss_expression_composee", 5, () => genVraiFaux(LN), H_PQ),

  // puiss_notation_scientifique — ★2 à ★5
  tpl("puiss_notation_scientifique", 2, S_GRA, H_SCI),
  tpl("puiss_notation_scientifique", 2, S_CEX, H_SCI),
  tpl("puiss_notation_scientifique", 2, D_MUL, H_SCI),
  tpl("puiss_notation_scientifique", 3, S_PET, H_SCI),
  tpl("puiss_notation_scientifique", 3, S_CMA, H_SCI),
  tpl("puiss_notation_scientifique", 3, () => genCalculScientifique(L), H_SCI),
  tpl("puiss_notation_scientifique", 4, () => genCalculScientifique(LN), H_SCI),
  tpl("puiss_notation_scientifique", 4, S_RAN, H_SCI),
  tpl("puiss_notation_scientifique", 4, S_PET, H_SCI),
  tpl("puiss_notation_scientifique", 5, () => genCalculScientifique(LNC), H_SCI),
  tpl("puiss_notation_scientifique", 5, F_ORD, H_SCI),
  tpl("puiss_notation_scientifique", 5, S_RAN, H_SCI),
];
