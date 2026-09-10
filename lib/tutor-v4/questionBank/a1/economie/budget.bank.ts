import { banqueEconomie, type ConceptEco } from "@/lib/tutor-v4/questionBank/economieBanque";

// ── A1 · Le budget : ce qui rentre, ce qui sort ─────────────────────────────
// ⚠️ « Déficit » et « excédent » sont ici ceux d'une FAMILLE, jamais ceux de
// l'État : le déficit public est au palier B2, avec la dette et les élections.
// Le même mot, deux paliers, et deux échelles de grandeur.
const CONCEPTS: readonly ConceptEco[] = [
  {
    slug: "budget",
    term: "Le budget",
    definition: "La liste de ce qu'on gagne et de ce qu'on dépense sur une période",
    situation: "Avant les vacances, la famille pose sur une feuille tout ce qui rentre et tout ce qui sort du mois.",
  },
  {
    slug: "revenu",
    term: "Le revenu",
    definition: "L'argent qui rentre : salaire, allocations, loyer reçu",
    situation: "Le 30 du mois, 1 600 € arrivent sur le compte de ton père.",
  },
  {
    slug: "depenses",
    term: "Les dépenses",
    definition: "L'argent qui sort pour acheter des biens ou des services",
    situation: "Courses, essence, abonnement du téléphone : tout cela est parti du compte ce mois-ci.",
  },
  {
    slug: "epargne",
    term: "L'épargne",
    definition: "La part du revenu qu'on ne dépense pas et qu'on met de côté pour plus tard",
    situation: "Chaque mois, 50 € partent sur un livret et personne n'y touche.",
  },
  {
    slug: "budget-equilibre",
    term: "Un budget équilibré",
    definition: "Une situation où ce qui rentre est exactement égal à ce qui sort",
    situation: "En fin de mois, la famille a reçu 1 600 € et dépensé 1 600 € : il ne reste rien, et il ne manque rien.",
  },
  {
    slug: "deficit",
    term: "Le déficit",
    definition: "Une situation où les dépenses dépassent ce qui est rentré",
    situation: "Le compte affiche −40 € à la fin du mois : on a dépensé plus qu'on n'a reçu.",
  },
  {
    slug: "excedent",
    term: "L'excédent",
    definition: "Une situation où il reste de l'argent une fois toutes les dépenses payées",
    situation: "Tout est payé, et il reste encore 120 € sur le compte le 31.",
  },
  {
    slug: "emprunt",
    term: "L'emprunt",
    definition: "De l'argent prêté par une banque, qu'il faudra rembourser petit à petit",
    situation: "Pour la voiture, tes parents versent 200 € par mois pendant quatre ans.",
  },
  {
    slug: "interets",
    term: "Les intérêts",
    definition: "Ce que l'emprunteur paie en plus de la somme qui lui a été prêtée",
    situation: "La voiture coûtait 8 000 €, mais au bout de quatre ans la banque aura reçu 8 900 €.",
  },
  {
    slug: "argent-de-poche",
    term: "L'argent de poche",
    definition: "Une somme donnée régulièrement à un enfant, qu'il gère lui-même",
    situation: "Tes parents te donnent 15 € au début de chaque mois, et c'est à toi de décider ce que tu en fais.",
  },
];

export const budgetA1EcoBank = banqueEconomie({
  niveau: "a1",
  notionId: "eco_a1_budget",
  concepts: CONCEPTS,
  tags: ["economie", "budget", "a1"],
});
