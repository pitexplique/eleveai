import { banqueEconomie, type ConceptEco } from "@/lib/tutor-v4/questionBank/economieBanque";

// ── B1 · La protection sociale : cotiser, être couvert ──────────────────────
// ⚠️ C'est la notion qui explique enfin l'écart brut/net vu en A2 : les
// cotisations ne « disparaissent » pas, elles paient la santé, la retraite et
// le chômage. Le palier A2 constate le prélèvement, celui-ci le rend lisible.
const CONCEPTS: readonly ConceptEco[] = [
  {
    slug: "cotisations-sociales",
    term: "Les cotisations sociales",
    definition: "Les sommes prélevées sur les salaires pour financer la santé, la retraite et le chômage",
    situation: "Les 440 € qui séparent les 2 000 € du contrat des 1 560 € reçus ne sont pas perdus : ils paient cela.",
  },
  {
    slug: "securite-sociale",
    term: "La Sécurité sociale",
    definition: "L'organisme public qui couvre les grands risques de la vie : maladie, famille, vieillesse, accident",
    situation: "Créée en 1945, elle rembourse les soins de tout le monde, quel que soit le revenu de chacun.",
  },
  {
    slug: "assurance-maladie",
    term: "L'assurance maladie",
    definition: "La branche qui rembourse une partie des soins, des médicaments et des hospitalisations",
    situation: "La consultation coûte 30 € ; 21 € reviennent sur le compte quelques jours plus tard.",
  },
  {
    slug: "mutuelle",
    term: "La mutuelle",
    definition: "Une couverture complémentaire, souscrite en plus, qui rembourse ce qui reste à payer",
    situation: "L'assurance maladie a remboursé 21 € des 30 € ; un second organisme verse les 9 € restants.",
  },
  {
    slug: "assurance-chomage",
    term: "L'assurance chômage",
    definition: "Le système qui verse un revenu de remplacement à celui qui perd son emploi",
    situation: "Licencié en mars, il touche chaque mois une somme calculée sur ses anciens salaires pendant qu'il cherche.",
  },
  {
    slug: "retraite",
    term: "La retraite",
    definition: "Le revenu versé à la fin de la vie active, financé par ceux qui travaillent aujourd'hui",
    situation: "Sa grand-mère ne travaille plus depuis dix ans et reçoit pourtant une somme chaque mois.",
  },
  {
    slug: "allocations-familiales",
    term: "Les allocations familiales",
    definition: "Des aides versées aux familles pour l'entretien et l'éducation des enfants",
    situation: "À partir du deuxième enfant, une somme est versée au foyer chaque mois, sans rapport avec un travail.",
  },
  {
    slug: "minima-sociaux",
    term: "Les minima sociaux",
    definition: "Des revenus garantis aux personnes sans ressources, pour éviter qu'elles ne tombent trop bas",
    situation: "Sans emploi et sans droit au chômage, elle reçoit malgré tout une somme mensuelle pour vivre.",
  },
  {
    slug: "service-public",
    term: "Le service public",
    definition: "Un service organisé par la collectivité pour tous, financé par l'impôt plutôt que par son prix",
    situation: "L'année de collège de ton voisin ne lui a rien coûté à l'inscription, et elle a bien été payée par quelqu'un.",
  },
  {
    slug: "mutualisation",
    term: "La mutualisation du risque",
    definition: "Le principe qui fait payer tout le monde un peu, pour couvrir les quelques-uns que le malheur frappe",
    situation: "Des millions de personnes cotisent chaque mois ; seules quelques milliers seront hospitalisées cette semaine.",
  },
];

export const protectionB1EcoBank = banqueEconomie({
  niveau: "b1",
  notionId: "eco_b1_protection",
  concepts: CONCEPTS,
  tags: ["economie", "protection-sociale", "b1"],
});
