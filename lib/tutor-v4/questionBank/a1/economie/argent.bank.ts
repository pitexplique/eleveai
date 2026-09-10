import { banqueEconomie, type ConceptEco } from "@/lib/tutor-v4/questionBank/economieBanque";

// ── A1 · L'argent : payer et échanger ───────────────────────────────────────
// ⚠️ Les scènes se passent là où vit l'élève : une boulangerie, une cour de
// récréation, un marché. Aucune ne demande de connaître une entreprise.
const CONCEPTS: readonly ConceptEco[] = [
  {
    slug: "monnaie",
    term: "La monnaie",
    definition: "Un moyen de paiement que tout le monde accepte pour obtenir des biens ou des services",
    situation: "À la boulangerie, tu tends une pièce de 2 € et tu repars avec une baguette.",
  },
  {
    slug: "troc",
    term: "Le troc",
    definition: "L'échange direct d'un objet contre un autre, sans aucun paiement",
    situation: "Dans la cour, Lina donne trois billes à Sami et repart avec sa gomme parfumée.",
  },
  {
    slug: "especes",
    term: "Les espèces",
    definition: "Les pièces et les billets, que l'on donne de la main à la main",
    situation: "Le vendeur du marché de Saint-Pierre n'a pas de terminal de paiement : il faut des pièces et des billets.",
  },
  {
    slug: "carte-bancaire",
    term: "La carte bancaire",
    definition: "Un moyen de paiement qui prend directement l'argent sur un compte, sans pièces ni billets",
    situation: "Au supermarché, ta mère pose un rectangle de plastique sur le lecteur et tape un code à quatre chiffres.",
  },
  {
    slug: "compte-bancaire",
    term: "Le compte bancaire",
    definition: "L'endroit où l'argent de quelqu'un est gardé, et d'où partent ses paiements",
    situation: "Le salaire arrive quelque part le 30 du mois, et c'est de là que le loyer est prélevé le 5.",
  },
  {
    slug: "banque",
    term: "La banque",
    definition: "L'établissement qui garde l'argent des gens, leur en prête et gère leurs paiements",
    situation: "Tes parents prennent rendez-vous dans une agence pour emprunter de quoi acheter une voiture.",
  },
  {
    slug: "virement",
    term: "Le virement",
    definition: "Un paiement qui va d'un compte vers un autre, sans espèces ni carte",
    situation: "Ta grand-mère t'envoie 30 € pour ton anniversaire : l'argent apparaît sur le compte sans que personne ne se déplace.",
  },
  {
    slug: "prix",
    term: "Le prix",
    definition: "La somme qu'il faut donner pour obtenir un bien ou un service",
    situation: "Sur l'étiquette du cahier, il est écrit 2,40 €.",
  },
  {
    slug: "ticket-de-caisse",
    term: "Le ticket de caisse",
    definition: "Le papier qui prouve un achat et détaille ce qui a été payé",
    situation: "Le pull est trop petit : le magasin accepte de l'échanger, mais demande la preuve de l'achat.",
  },
  {
    slug: "euro",
    term: "L'euro",
    definition: "La monnaie commune à vingt pays de l'Union européenne",
    situation: "En vacances en Espagne, ta famille paie avec les mêmes billets qu'à La Réunion.",
  },
];

export const argentA1EcoBank = banqueEconomie({
  niveau: "a1",
  notionId: "eco_a1_argent",
  concepts: CONCEPTS,
  tags: ["economie", "argent", "a1"],
});
