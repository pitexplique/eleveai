// Renfort des puissances 3e (04/11/2026).
//
// Mesure du 04/11 (scripts/mesurer-squelettes-coach.ts) : 6 à 12 squelettes
// par micro, 15 à 18 répétitions sur 20, alors que la 4e tient (93 à 354).
// Comme pour la proportionnalité (./proportionnalite-renfort.ts), on branche
// les gabarits de la 4e — la 3e « consolide la 4e » — et on y ajoute ce que la
// 3e a de plus : les RÈGLES énoncées (produit, quotient, puissance de
// puissance), leurs enchaînements et le calcul en notation scientifique
// (../../puissances-regles-commun.ts).
//
// Collège : simple à ★1-★2, situations à partir de ★3.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  gabarit4ePuissances,
  genCalculScientifique,
  genEnchainement,
  genExposantNegatif,
  genProduitMemeBase,
  genPuissanceDePuissance,
  genQuotientMemeBase,
  genVraiFaux,
} from "@/lib/tutor-v4/questionBank/puissances-regles-commun";

const gab4e = gabarit4ePuissances;

const C_DEV = gab4e("4e_puissance_comprendre_tpl_1_developper");
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
const X_DIX = gab4e("4e_puissance_calcul_tpl_1_produit_dix");
const X_MIX = gab4e("4e_puissance_calcul_tpl_2_mixte");
const X_SOM = gab4e("4e_puissance_calcul_tpl_3_somme");
const F_DOU = gab4e("4e_puissance_defi_tpl_1_doublement");
const F_ORD = gab4e("4e_puissance_defi_tpl_2_ordre_scientifique");
const F_PLI = gab4e("4e_puissance_defi_tpl_3_pliage");

const simple = { niveau: "3e" as const };
const ctx = { niveau: "3e" as const, contexte: true };
const ctxNeg = { niveau: "3e" as const, contexte: true, negatifs: true };

const rang: Record<string, number> = {};
function tpl(microId: string, difficulty: number, generate: () => any, hint: string): TutorBankItemV4 {
  const cle = `${microId}_${difficulty}`;
  rang[cle] = (rang[cle] ?? 0) + 1;
  return {
    kind: "template",
    id: `3e_puiss_renfort_${cle}_${rang[cle]}`,
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_puissance",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["entier_puissance", "renfort", "template"],
    generate,
  } as TutorBankItemV4;
}

const H_DEF = "aⁿ, c’est a écrit n fois en facteur : a × a × … × a.";
const H_DIX = "10ⁿ : un 1 suivi de n zéros ; 10⁻ⁿ : n chiffres après la virgule, le dernier est 1.";
const H_SCI = "Notation scientifique : a × 10ⁿ avec 1 ≤ a < 10.";
const H_REG = "Même base : produit → on additionne les exposants ; quotient → on soustrait.";
const H_PP = "(aᵐ)ⁿ = aᵐˣⁿ : on multiplie les exposants.";

export const puissancesRenfort3e: TutorBankItemV4[] = [
  // entier_puissance_comprendre — ★1 à ★3
  tpl("entier_puissance_comprendre", 1, C_DEV, H_DEF),
  tpl("entier_puissance_comprendre", 1, C_CON, H_DEF),
  tpl("entier_puissance_comprendre", 2, C_DEV, H_DEF),
  tpl("entier_puissance_comprendre", 2, C_CON, H_DEF),
  tpl("entier_puissance_comprendre", 2, K_PIE, H_DEF),
  tpl("entier_puissance_comprendre", 3, C_CON, H_DEF),
  tpl("entier_puissance_comprendre", 3, K_PIE, H_DEF),
  tpl("entier_puissance_comprendre", 3, () => genVraiFaux(simple), H_DEF),

  // entier_puissance_calculer — ★1 à ★3
  tpl("entier_puissance_calculer", 1, K_VAL, H_DEF),
  tpl("entier_puissance_calculer", 1, C_DEV, H_DEF),
  tpl("entier_puissance_calculer", 1, K_PIE, H_DEF),
  tpl("entier_puissance_calculer", 2, K_VAL, H_DEF),
  tpl("entier_puissance_calculer", 2, K_PIE, H_DEF),
  tpl("entier_puissance_calculer", 2, K_SIG, "Compte les signes moins : un nombre pair de facteurs négatifs donne un résultat positif."),
  tpl("entier_puissance_calculer", 3, K_SIG, "(−a)ⁿ et −aⁿ ne sont pas la même chose : regarde la parenthèse."),
  tpl("entier_puissance_calculer", 3, K_VAL, H_DEF),
  tpl("entier_puissance_calculer", 3, K_PIE, H_DEF),

  // entier_puissance_dix — ★1 à ★4
  tpl("entier_puissance_dix", 1, D_VAL, H_DIX),
  tpl("entier_puissance_dix", 1, D_ECR, H_DIX),
  tpl("entier_puissance_dix", 2, D_VAL, H_DIX),
  tpl("entier_puissance_dix", 2, D_ECR, H_DIX),
  tpl("entier_puissance_dix", 2, D_MUL, H_DIX),
  tpl("entier_puissance_dix", 3, D_MUL, H_DIX),
  tpl("entier_puissance_dix", 3, N_FRA, "10⁻ⁿ = 1/10ⁿ."),
  tpl("entier_puissance_dix", 3, N_DEC, H_DIX),
  tpl("entier_puissance_dix", 4, X_DIX, H_REG),
  tpl("entier_puissance_dix", 4, N_DEC, H_DIX),
  tpl("entier_puissance_dix", 4, () => genExposantNegatif(ctx), "a⁻ⁿ = 1/aⁿ : c’est un inverse, pas un nombre négatif."),

  // entier_puissance_ecriture_scientifique — ★2 à ★4
  tpl("entier_puissance_ecriture_scientifique", 2, S_GRA, H_SCI),
  tpl("entier_puissance_ecriture_scientifique", 2, S_CEX, H_SCI),
  tpl("entier_puissance_ecriture_scientifique", 2, D_MUL, H_DIX),
  tpl("entier_puissance_ecriture_scientifique", 3, S_GRA, H_SCI),
  tpl("entier_puissance_ecriture_scientifique", 3, S_CMA, H_SCI),
  tpl("entier_puissance_ecriture_scientifique", 3, S_PET, H_SCI),
  tpl("entier_puissance_ecriture_scientifique", 3, () => genCalculScientifique(simple), H_SCI),
  tpl("entier_puissance_ecriture_scientifique", 4, S_PET, H_SCI),
  tpl("entier_puissance_ecriture_scientifique", 4, S_RAN, H_SCI),
  tpl("entier_puissance_ecriture_scientifique", 4, () => genCalculScientifique(ctxNeg), H_SCI),

  // entier_puissance_calcul — ★3 et ★4 : les RÈGLES, propres à la 3e
  tpl("entier_puissance_calcul", 3, () => genProduitMemeBase(ctx), H_REG),
  tpl("entier_puissance_calcul", 3, () => genQuotientMemeBase(ctx), H_REG),
  tpl("entier_puissance_calcul", 3, () => genVraiFaux(simple), H_REG),
  tpl("entier_puissance_calcul", 3, X_DIX, H_REG),
  tpl("entier_puissance_calcul", 4, () => genPuissanceDePuissance(ctx), H_PP),
  tpl("entier_puissance_calcul", 4, () => genEnchainement({ niveau: "3e" }), H_REG),
  tpl("entier_puissance_calcul", 4, X_MIX, H_REG),
  tpl("entier_puissance_calcul", 4, X_SOM, "Une somme de puissances se calcule terme à terme : pas de règle sur les exposants."),

  // entier_puissance_defi — ★4 et ★5
  tpl("entier_puissance_defi", 4, F_DOU, H_DEF),
  tpl("entier_puissance_defi", 4, F_ORD, H_SCI),
  tpl("entier_puissance_defi", 4, F_PLI, H_DEF),
  tpl("entier_puissance_defi", 4, () => genEnchainement({ niveau: "3e" }), H_REG),
  tpl("entier_puissance_defi", 5, () => genCalculScientifique(ctxNeg), H_SCI),
  tpl("entier_puissance_defi", 5, () => genVraiFaux({ niveau: "3e", negatifs: true }), H_REG),
  tpl("entier_puissance_defi", 5, F_ORD, H_SCI),
  tpl("entier_puissance_defi", 5, () => genEnchainement({ niveau: "3e" }), H_REG),
];
