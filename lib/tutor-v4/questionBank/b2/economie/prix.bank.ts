import { banqueEconomie, type ConceptEco } from "@/lib/tutor-v4/questionBank/economieBanque";

// ── B2 · Monnaie, inflation et pouvoir d'achat ──────────────────────────────
// ⚠️ « Taux directeur » et « taux d'intérêt » cohabitent : le premier est celui
// que la banque centrale fixe pour les banques, le second celui que la banque
// applique à son client. Les confondre, c'est ne pas comprendre pourquoi une
// décision annoncée à Francfort change le prix d'un crédit à Saint-Denis.
const CONCEPTS: readonly ConceptEco[] = [
  {
    slug: "inflation",
    term: "L'inflation",
    definition: "La hausse générale et durable des prix, qui fait qu'un même euro achète moins",
    situation: "Le même chariot de courses coûte 92 € cette année contre 85 € l'an dernier, et ce n'est pas qu'au supermarché.",
  },
  {
    slug: "deflation",
    term: "La déflation",
    definition: "La baisse générale et durable des prix, souvent le signe d'une économie à l'arrêt",
    situation: "Les prix reculent mois après mois, les ménages repoussent leurs achats en attendant mieux, et les usines tournent au ralenti.",
  },
  {
    slug: "taux-inflation",
    term: "Le taux d'inflation",
    definition: "Le pourcentage de hausse des prix mesuré sur une période, en général un an",
    situation: "L'institut de statistiques annonce 2,4 % sur douze mois.",
  },
  {
    slug: "indice-prix",
    term: "L'indice des prix à la consommation",
    definition: "L'instrument qui suit le prix d'un panier de produits représentatif des achats des ménages",
    situation: "Chaque mois, des enquêteurs relèvent le prix des mêmes centaines de produits dans les mêmes magasins.",
  },
  {
    slug: "pouvoir-achat",
    term: "Le pouvoir d'achat",
    definition: "La quantité de biens et de services qu'un revenu permet réellement d'obtenir",
    situation: "Avec les mêmes 1 560 €, elle remplit un caddie moins garni qu'il y a deux ans.",
  },
  {
    slug: "salaire-reel",
    term: "Le salaire réel",
    definition: "Le salaire une fois corrigé de la hausse des prix — ce qu'il permet vraiment d'acheter",
    situation: "Son salaire a monté de 2 % et les prix de 4 % : en vérité, il a baissé.",
  },
  {
    slug: "banque-centrale",
    term: "La Banque centrale",
    definition: "L'institution qui émet la monnaie et décide de la politique monétaire d'une zone",
    situation: "À Francfort, une décision annoncée un jeudi change le coût du crédit dans vingt pays.",
  },
  {
    slug: "taux-directeur",
    term: "Le taux directeur",
    definition: "Le taux auquel la banque centrale prête aux banques, et qui commande tous les autres",
    situation: "Il passe de 3 % à 4 % : les banques empruntent plus cher, et répercutent aussitôt.",
  },
  {
    slug: "taux-interet",
    term: "Le taux d'intérêt",
    definition: "Le prix d'un crédit : ce que l'emprunteur paie en plus, exprimé en pourcentage",
    situation: "Pour 100 000 € empruntés sur vingt ans, la banque lui demande 3,8 % par an.",
  },
  {
    slug: "politique-monetaire",
    term: "La politique monétaire",
    definition: "L'action sur la monnaie et le coût du crédit pour freiner ou soutenir l'activité",
    situation: "Face à des prix qui s'emballent, l'institution monte ses taux pour calmer la demande.",
  },
];

export const prixB2EcoBank = banqueEconomie({
  niveau: "b2",
  notionId: "eco_b2_prix",
  concepts: CONCEPTS,
  tags: ["economie", "inflation", "b2"],
});
