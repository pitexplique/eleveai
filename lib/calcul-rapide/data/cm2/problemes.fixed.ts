import type { CalculRapideItem } from "../../types";

export const problemesFixedCM2: CalculRapideItem[] = [
  {
    id: "cm2_probleme_pourcentage_remise_001",
    niveau: "CM2",
    type: "probleme",
    mode: "fixed",
    notionId: "pourcentages",
    microId: "remise_simple",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Un jeu coûte 40 euros. Il y a une remise de 10 %. Quel est le montant de la remise ?",
    },
    expected: ["4", "4 euros"],
    hint: "10 %, c'est un dixième.",
    explanation: "10 % de 40 euros = 4 euros.",
    tags: ["pourcentage", "monnaie"],
  },
];
