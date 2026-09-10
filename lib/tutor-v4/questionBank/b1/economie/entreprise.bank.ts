import { banqueEconomie, type ConceptEco } from "@/lib/tutor-v4/questionBank/economieBanque";

// ── B1 · L'entreprise et le marché, de plus près ────────────────────────────
// ⚠️ DOUZE CONCEPTS ET NON DIX : cette notion tient les deux promesses laissées
// par le palier A2 — la valeur ajoutée et l'actionnaire, annoncés « pour plus
// tard » dans a2/entreprise.bank.ts — ET la face sombre du marché, celle où la
// concurrence disparaît. Les deux moitiés se répondent : c'est parce qu'il y a
// de la valeur à capter qu'un marché finit par se fermer.
const CONCEPTS: readonly ConceptEco[] = [
  {
    slug: "valeur-ajoutee",
    term: "La valeur ajoutée",
    definition: "La richesse réellement créée : ce qui a été vendu, moins ce qu'il a fallu acheter pour le produire",
    situation: "La boulangerie a vendu pour 18 000 € et acheté pour 6 000 € de farine et d'électricité : elle a créé 12 000 €.",
  },
  {
    slug: "marge",
    term: "La marge",
    definition: "L'écart entre le prix de vente d'un produit et ce qu'il a coûté au vendeur",
    situation: "Le tee-shirt est acheté 4 € au grossiste et revendu 15 € en magasin.",
  },
  {
    slug: "productivite",
    term: "La productivité",
    definition: "Ce qui est produit rapporté au travail qu'il a fallu : par heure ou par personne",
    situation: "Avec le second four, la même équipe sort 900 baguettes par jour au lieu de 600.",
  },
  {
    slug: "actionnaire",
    term: "L'actionnaire",
    definition: "Celui qui détient une part d'une entreprise, en partage les bénéfices et les pertes",
    situation: "Elle a acheté 200 parts de la société : elle n'y travaille pas, mais une partie des résultats lui revient.",
  },
  {
    slug: "dividende",
    term: "Le dividende",
    definition: "La part du bénéfice versée à ceux qui détiennent des parts de l'entreprise",
    situation: "L'entreprise a gagné 1 million ; 300 000 € sont partagés entre les détenteurs de parts.",
  },
  {
    slug: "bourse",
    term: "La Bourse",
    definition: "Le marché où s'achètent et se vendent les parts des grandes entreprises",
    situation: "Le cours de la société a perdu 8 % dans la journée, sans qu'aucune machine ne se soit arrêtée.",
  },
  {
    slug: "monopole",
    term: "Le monopole",
    definition: "La situation d'un marché où un seul vendeur fait face à tous les acheteurs",
    situation: "Une seule société dessert l'île pour ce service : refuser son prix, c'est se passer du service.",
  },
  {
    slug: "oligopole",
    term: "L'oligopole",
    definition: "La situation d'un marché tenu par un très petit nombre de grandes entreprises",
    situation: "Trois enseignes se partagent 90 % des ventes, et elles surveillent surtout les prix les unes des autres.",
  },
  {
    slug: "entente",
    term: "L'entente",
    definition: "L'accord secret entre concurrents pour fixer les prix ou se partager les clients — interdit par la loi",
    situation: "Les trois enseignes se sont mises d'accord au téléphone pour ne pas descendre sous 2 € le litre.",
  },
  {
    slug: "barriere-entree",
    term: "La barrière à l'entrée",
    definition: "Ce qui empêche un nouveau vendeur de venir concurrencer ceux qui sont déjà en place",
    situation: "Pour se lancer, il faudrait 40 millions d'euros d'installations : personne ne tente sa chance.",
  },
  {
    slug: "autorite-concurrence",
    term: "L'Autorité de la concurrence",
    definition: "L'institution publique qui surveille les marchés et sanctionne les accords interdits",
    situation: "Les trois enseignes écopent d'une amende de 20 millions d'euros après enquête sur leurs prix.",
  },
  {
    slug: "elasticite",
    term: "L'élasticité de la demande",
    definition: "La force avec laquelle la quantité demandée réagit à une variation du prix",
    situation: "Le prix du soda monte de 10 % et les ventes chutent de 30 % ; pour le pain, elles bougent à peine.",
  },
];

export const entrepriseB1EcoBank = banqueEconomie({
  niveau: "b1",
  notionId: "eco_b1_entreprise",
  concepts: CONCEPTS,
  tags: ["economie", "entreprise", "concurrence", "b1"],
});
