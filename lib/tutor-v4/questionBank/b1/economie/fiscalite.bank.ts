import { banqueEconomie, type ConceptEco } from "@/lib/tutor-v4/questionBank/economieBanque";

// ── B1 · L'impôt : qui paie quoi ────────────────────────────────────────────
// ⭐ L'OCTROI DE MER EST DANS LA LISTE, ET CE N'EST PAS UNE COQUETTERIE LOCALE.
// C'est la taxe que les élèves de La Réunion voient tous les jours sans jamais
// l'avoir nommée : elle est dans le prix du paquet de céréales importé. Un
// impôt qu'on peut montrer du doigt en sortant du magasin s'apprend autrement
// qu'un impôt qu'on lit dans un manuel.
const CONCEPTS: readonly ConceptEco[] = [
  {
    slug: "impot",
    term: "L'impôt",
    definition: "Un prélèvement obligatoire, sans contrepartie directe, versé à l'État ou à une collectivité",
    situation: "On le paie parce que la loi l'exige, et personne ne reçoit un service précis en échange de sa part.",
  },
  {
    slug: "tva",
    term: "La TVA",
    definition: "Un impôt déjà compris dans le prix affiché des biens et des services",
    situation: "Sur le ticket, sous le total, une ligne indique 20 % que le magasin reversera à l'État.",
  },
  {
    slug: "impot-revenu",
    term: "L'impôt sur le revenu",
    definition: "Un impôt calculé chaque année sur ce qu'un foyer a gagné",
    situation: "Au printemps, la famille déclare les salaires de l'année passée et reçoit ensuite un montant à payer.",
  },
  {
    slug: "impot-progressif",
    term: "L'impôt progressif",
    definition: "Un impôt dont le taux augmente à mesure que ce qui est imposé augmente",
    situation: "Sur les premiers 11 000 € on ne prélève rien, sur la tranche suivante 11 %, puis 30 % au-delà.",
  },
  {
    slug: "impot-proportionnel",
    term: "L'impôt proportionnel",
    definition: "Un impôt dont le taux reste le même quel que soit le montant concerné",
    situation: "Le smicard et le cadre paient exactement 20 % sur le même paquet de pâtes.",
  },
  {
    slug: "prelevements-obligatoires",
    term: "Les prélèvements obligatoires",
    definition: "L'ensemble de ce que l'État et la protection sociale prélèvent sans qu'on puisse le refuser",
    situation: "En additionnant impôts et cotisations, on obtient environ 43 % de tout ce qui est produit en France.",
  },
  {
    slug: "redistribution",
    term: "La redistribution",
    definition: "Le mécanisme qui prélève d'un côté et reverse de l'autre, en aides et en services",
    situation: "L'argent pris sur les revenus des uns finance l'hôpital, l'école et les allocations des autres.",
  },
  {
    slug: "impot-societes",
    term: "L'impôt sur les sociétés",
    definition: "L'impôt payé par les entreprises sur les bénéfices qu'elles ont réalisés",
    situation: "L'entreprise a dégagé 200 000 € de bénéfice ; une part part au Trésor public avant tout partage.",
  },
  {
    slug: "octroi-de-mer",
    term: "L'octroi de mer",
    definition: "Une taxe appliquée outre-mer aux marchandises qui entrent sur le territoire",
    situation: "Le même paquet de céréales coûte plus cher à Saint-Denis qu'à Marseille : une taxe s'est ajoutée en arrivant au port.",
  },
  {
    slug: "declaration-revenus",
    term: "La déclaration de revenus",
    definition: "Le document par lequel un foyer annonce à l'administration ce qu'il a gagné",
    situation: "Chaque printemps, ses parents remplissent un formulaire en ligne avant une date limite affichée partout.",
  },
];

export const fiscaliteB1EcoBank = banqueEconomie({
  niveau: "b1",
  notionId: "eco_b1_fiscalite",
  concepts: CONCEPTS,
  tags: ["economie", "fiscalite", "b1"],
});
