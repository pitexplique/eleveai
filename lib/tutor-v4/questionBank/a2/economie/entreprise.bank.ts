import { banqueEconomie, type ConceptEco } from "@/lib/tutor-v4/questionBank/economieBanque";

// ── A2 · L'entreprise : produire et vendre ──────────────────────────────────
// ⚠️ « Valeur ajoutée » et « actionnaire » ne sont PAS ici mais en B1 : la
// première ne se comprend qu'une fois le chiffre d'affaires et les coûts en
// place, la seconde suppose de savoir ce qu'est une part d'entreprise.
const CONCEPTS: readonly ConceptEco[] = [
  {
    slug: "production",
    term: "La production",
    definition: "L'ensemble des biens et des services créés par une entreprise",
    situation: "L'usine de Saint-André est sortie de l'année avec 12 000 pots de confiture fabriqués.",
  },
  {
    slug: "chiffre-affaires",
    term: "Le chiffre d'affaires",
    definition: "Le total de ce qu'une entreprise a vendu sur une période, avant d'enlever quoi que ce soit",
    situation: "Le boulanger a encaissé 18 000 € en janvier — avant de payer la farine, le loyer et son employé.",
  },
  {
    slug: "couts-fixes",
    term: "Les coûts fixes",
    definition: "Les dépenses qui ne changent pas selon la quantité produite : loyer, assurance, abonnement",
    situation: "Que la boulangerie vende 100 ou 900 baguettes, le loyer du local reste de 1 200 € par mois.",
  },
  {
    slug: "couts-variables",
    term: "Les coûts variables",
    definition: "Les dépenses qui augmentent avec la quantité produite : matières premières, emballages",
    situation: "Plus le boulanger fait de baguettes, plus il achète de farine.",
  },
  {
    slug: "profit",
    term: "Le profit",
    definition: "Ce qui reste quand on retire toutes les dépenses de tout ce qui a été encaissé",
    situation: "18 000 € encaissés, 15 500 € de dépenses : il reste 2 500 € au boulanger.",
  },
  {
    slug: "investissement",
    term: "L'investissement",
    definition: "L'achat d'un équipement durable pour produire plus ou mieux",
    situation: "Le boulanger achète un second four à 20 000 € qui servira dix ans.",
  },
  {
    slug: "faillite",
    term: "La faillite",
    definition: "La situation d'une entreprise qui ne peut plus payer ce qu'elle doit et cesse son activité",
    situation: "Le magasin baisse définitivement son rideau : il ne pouvait plus régler ses fournisseurs.",
  },
  {
    slug: "entrepreneur",
    term: "L'entrepreneur",
    definition: "Celui qui crée une entreprise, l'organise et prend le risque de la perte",
    situation: "Elle a quitté son emploi, emprunté 30 000 € et ouvert son atelier de couture : si personne n'achète, c'est elle qui perd.",
  },
  {
    slug: "fournisseur",
    term: "Le fournisseur",
    definition: "L'entreprise qui vend à une autre entreprise ce dont elle a besoin pour produire",
    situation: "Le minotier livre la farine à la boulangerie, qui la lui paie à la fin du mois.",
  },
  {
    slug: "stock",
    term: "Le stock",
    definition: "Ce qui a été produit ou acheté et qui attend encore d'être vendu ou utilisé",
    situation: "Il reste 300 paires de sandales dans la réserve du magasin, invendues depuis l'été.",
  },
];

export const entrepriseA2EcoBank = banqueEconomie({
  niveau: "a2",
  notionId: "eco_a2_entreprise",
  concepts: CONCEPTS,
  tags: ["economie", "entreprise", "a2"],
});
