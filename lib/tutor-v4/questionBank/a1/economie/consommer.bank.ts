import { banqueEconomie, type ConceptEco } from "@/lib/tutor-v4/questionBank/economieBanque";

// ── A1 · Acheter : besoin, envie, comparer ──────────────────────────────────
// ⚠️ Le prix unitaire est le seul concept de ce palier qui demande un calcul —
// et c'est voulu : c'est le pont avec « Calculs du quotidien », la classe
// adulte du coach de maths (prix au kilo, comparer deux offres).
const CONCEPTS: readonly ConceptEco[] = [
  {
    slug: "bien",
    term: "Un bien",
    definition: "Un objet matériel qu'on achète et qu'on peut toucher",
    situation: "Tu ressors du magasin de sport avec un ballon sous le bras.",
  },
  {
    slug: "service",
    term: "Un service",
    definition: "Une prestation qu'on paie sans qu'elle soit un objet",
    situation: "Le coiffeur te coupe les cheveux : tu paies, mais tu ne repars avec rien dans les mains.",
  },
  {
    slug: "besoin",
    term: "Un besoin",
    definition: "Ce qui est nécessaire pour vivre : se nourrir, se loger, se soigner",
    situation: "Le loyer et le riz sont payés avant tout le reste, parce qu'on ne peut pas s'en passer.",
  },
  {
    slug: "envie",
    term: "Une envie",
    definition: "Ce qu'on aimerait avoir sans que ce soit nécessaire pour vivre",
    situation: "Tes baskets marchent très bien, mais le modèle vu dans la pub te plaît beaucoup.",
  },
  {
    slug: "publicite",
    term: "La publicité",
    definition: "Un message payé par un vendeur pour donner envie d'acheter",
    situation: "Avant ta vidéo, quinze secondes vantent un téléphone que tu ne cherchais pas.",
  },
  {
    slug: "promotion",
    term: "Une promotion",
    definition: "Une baisse temporaire du prix habituel",
    situation: "Le pull était affiché 40 € la semaine dernière, il est à 28 € jusqu'à dimanche.",
  },
  {
    slug: "prix-unitaire",
    term: "Le prix unitaire",
    definition: "Le prix ramené à une même quantité — le kilo, le litre — pour comparer deux offres",
    situation: "Le paquet de 500 g coûte 3 € et celui de 2 kg coûte 10 € : ce calcul dit lequel revient le moins cher.",
  },
  {
    slug: "garantie",
    term: "La garantie",
    definition: "L'engagement du vendeur à réparer ou remplacer pendant une durée donnée",
    situation: "Le téléphone tombe en panne au bout de huit mois, et le magasin le remplace sans rien te faire payer.",
  },
  {
    slug: "consommateur",
    term: "Le consommateur",
    definition: "Celui qui achète un bien ou un service pour l'utiliser",
    situation: "Dans le magasin il y a celui qui vend, et celui qui repart avec le produit pour s'en servir.",
  },
  {
    slug: "occasion",
    term: "L'occasion",
    definition: "Un bien déjà utilisé, revendu moins cher que neuf",
    situation: "Le vélo a servi deux ans ; son propriétaire le revend 80 € alors qu'il en coûtait 250 € neuf.",
  },
];

export const consommerA1EcoBank = banqueEconomie({
  niveau: "a1",
  notionId: "eco_a1_consommer",
  concepts: CONCEPTS,
  tags: ["economie", "consommation", "a1"],
});
