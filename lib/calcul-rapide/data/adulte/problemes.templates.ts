import type { CalculRapideItem } from "../../types";

export const problemesTemplatesAdulte: CalculRapideItem[] = [
  {
    id: "adulte_template_probleme_recette_001",
    niveau: "adulte",
    type: "probleme",
    mode: "template",
    notionId: "proportionnalite_pratique",
    microId: "adapter_recette",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Une recette pour 2 personnes demande {{q}} g de riz. Combien faut-il pour 4 personnes ?",
    },
    template:
      "Une recette pour 2 personnes demande {{q}} g de riz. Combien faut-il pour 4 personnes ?",
    variables: { q: [150, 200, 250, 300] },
    answerRule: "q * 2",
    hint: "4 personnes, c'est deux fois plus que 2.",
    explanationTemplate: "{{q}} x 2 = {{answer}} g.",
    tags: ["adulte", "recette"],
  },
  {
    id: "adulte_template_probleme_budget_001",
    niveau: "adulte",
    type: "probleme",
    mode: "template",
    notionId: "argent_budget",
    microId: "budget_reste",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Budget de {{budget}} euros. Dépenses : {{a}} euros et {{b}} euros. Combien reste-t-il ?",
    },
    template:
      "Budget de {{budget}} euros. Dépenses : {{a}} euros et {{b}} euros. Combien reste-t-il ?",
    variables: { budget: [80, 100, 150, 200], a: [20, 35, 50], b: [10, 25, 40] },
    answerRule: "budget - a - b",
    hint: "Additionne les dépenses puis soustrais.",
    explanationTemplate: "{{budget}} - {{a}} - {{b}} = {{answer}} euros.",
    tags: ["adulte", "budget"],
  },
  {
    id: "adulte_template_probleme_tableau_001",
    niveau: "adulte",
    type: "probleme",
    mode: "template",
    notionId: "donnees_tableaux",
    microId: "lire_tableau",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Budget : alimentation {{a}} euros, transport {{t}} euros, loisirs {{l}} euros. Quelle dépense est la plus élevée ?",
    },
    template:
      "Budget : alimentation {{a}} euros, transport {{t}} euros, loisirs {{l}} euros. Quelle dépense est la plus élevée ?",
    variables: { a: [180, 220, 260], t: [60, 80, 120], l: [40, 90, 110] },
    answerRule: "'alimentation'",
    hint: "Compare les trois montants.",
    explanationTemplate: "Le montant alimentation est le plus élevé ici.",
    tags: ["adulte", "donnees"],
  },
];
