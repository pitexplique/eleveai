import type { CalculRapideItem } from "../../types";

export const problemesFixedAdulte: CalculRapideItem[] = [
  {
    id: "adulte_probleme_prix_kilo_001",
    niveau: "adulte",
    type: "probleme",
    mode: "fixed",
    notionId: "prix_comparer",
    microId: "prix_unitaire",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "2 kg de riz coûtent 6 euros. Quel est le prix pour 1 kg ?",
    },
    expected: ["3", "3 euros"],
    hint: "Divise 6 euros par 2 kg.",
    explanation: "6 ÷ 2 = 3 euros par kg.",
    tags: ["adulte", "prix"],
  },
  {
    id: "adulte_probleme_horaire_001",
    niveau: "adulte",
    type: "probleme",
    mode: "fixed",
    notionId: "durees_trajets",
    microId: "horaire_arrivee",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Tu pars à 14 h 20 pour un trajet de 45 min. À quelle heure arrives-tu ?",
    },
    expected: ["15h05", "15 h 05", "15:05", "15h5"],
    hint: "Ajoute 40 min, puis 5 min.",
    explanation: "14 h 20 + 45 min = 15 h 05.",
    tags: ["adulte", "duree"],
  },
];
