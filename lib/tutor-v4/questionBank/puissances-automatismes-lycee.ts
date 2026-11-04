// L'automatisme `auto_num_puissances` (1re et STMG) : « Effectuer des
// opérations sur les puissances » = le RÉSUMÉ de la 4e, de la 3e et de la 2de.
//
// 04/11/2026 — mesuré : en 1re UN seul gabarit (19 répétitions sur 20), en
// STMG trois (16 à 18). On y branche les générateurs communs
// (./puissances-regles-commun.ts) : les cinq règles, la notation scientifique,
// l'enchaînement, et le vrai/faux des erreurs classiques.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  genCalculScientifique,
  genEnchainement,
  genExposantNegatif,
  genProduitMemeBase,
  genPuissanceDePuissance,
  genQuotientMemeBase,
  genVraiFaux,
} from "./puissances-regles-commun";

const L = { niveau: "lycee" as const };
const LN = { niveau: "lycee" as const, negatifs: true };
const LNC = { niveau: "lycee" as const, negatifs: true, contexte: true };
const HINT = "aᵐ × aⁿ = aᵐ⁺ⁿ ; aᵐ ÷ aⁿ = aᵐ⁻ⁿ ; (aᵐ)ⁿ = aᵐˣⁿ ; a⁻ⁿ = 1/aⁿ.";

type Spec = [number, () => any];

function construire(niveau: "premiere" | "stmg", specs: Spec[]): TutorBankItemV4[] {
  const rang: Record<number, number> = {};
  return specs.map(([difficulty, generate]) => {
    rang[difficulty] = (rang[difficulty] ?? 0) + 1;
    return {
      kind: "template",
      id: `${niveau}_auto_puissances_renfort_${difficulty}_${rang[difficulty]}`,
      niveau,
      matiere: "maths",
      notionId: "auto_fractions_puissances",
      microId: "auto_num_puissances",
      difficulty,
      theme: "neutral",
      hint: HINT,
      tags: [niveau, "maths", "automatisme", "puissances", "renfort", "template"],
      generate,
    } as TutorBankItemV4;
  });
}

/** 1re : l'existant est à ★4 ; on garnit ★3 et ★4. */
export const puissancesAutomatismesPremiere: TutorBankItemV4[] = construire("premiere", [
  [3, () => genProduitMemeBase(LN)],
  [3, () => genQuotientMemeBase(LN)],
  [3, () => genExposantNegatif(LN)],
  [3, () => genVraiFaux(LN)],
  [4, () => genPuissanceDePuissance(LN)],
  [4, () => genEnchainement(LN)],
  [4, () => genCalculScientifique(LNC)],
  [4, () => genVraiFaux(LN)],
  [4, () => genQuotientMemeBase(LNC)],
]);

/** STMG : l'existant est à ★2 et ★3. */
export const puissancesAutomatismesStmg: TutorBankItemV4[] = construire("stmg", [
  [2, () => genProduitMemeBase(L)],
  [2, () => genQuotientMemeBase(L)],
  [2, () => genExposantNegatif(L)],
  [2, () => genVraiFaux(L)],
  [2, () => genPuissanceDePuissance(L)],
  [2, () => genCalculScientifique(L)],
  [3, () => genPuissanceDePuissance(LN)],
  [3, () => genEnchainement(L)],
  [3, () => genCalculScientifique(LNC)],
  [3, () => genExposantNegatif(LNC)],
]);
