import { banqueEconomie, type ConceptEco } from "@/lib/tutor-v4/questionBank/economieBanque";

// ── A2 · Le marché : offre et demande ───────────────────────────────────────
// ⚠️ Monopole, oligopole et élasticité sont en B1 : ce palier-ci montre un
// marché qui fonctionne, le suivant montre ce qui l'empêche de fonctionner.
const CONCEPTS: readonly ConceptEco[] = [
  {
    slug: "marche",
    term: "Le marché",
    definition: "Le lieu, réel ou en ligne, où des acheteurs et des vendeurs se rencontrent pour échanger",
    situation: "Le samedi matin à Saint-Paul, des dizaines d'étals font face à des centaines de paniers.",
  },
  {
    slug: "offre",
    term: "L'offre",
    definition: "La quantité qu'un ensemble de vendeurs accepte de vendre à un prix donné",
    situation: "À 3 € le kilo, les producteurs de letchis acceptent d'en sortir 2 tonnes.",
  },
  {
    slug: "demande",
    term: "La demande",
    definition: "La quantité que les acheteurs souhaitent acheter à un prix donné",
    situation: "À 3 € le kilo, les familles du marché veulent en emporter 5 tonnes.",
  },
  {
    slug: "prix-equilibre",
    term: "Le prix d'équilibre",
    definition: "Le prix auquel la quantité proposée et la quantité souhaitée sont enfin égales",
    situation: "À 3 € il en manquait, à 8 € il en restait : c'est à 5 € que tout part et que rien ne manque.",
  },
  {
    slug: "concurrence",
    term: "La concurrence",
    definition: "La compétition entre des vendeurs qui proposent des produits proches sur un même marché",
    situation: "Quatre marchands vendent les mêmes mangues à dix mètres les uns des autres.",
  },
  {
    slug: "penurie",
    term: "La pénurie",
    definition: "La situation où ce que les acheteurs veulent dépasse ce qui est disponible",
    situation: "Après le cyclone, les rayons de bouteilles d'eau sont vides à 9 heures du matin.",
  },
  {
    slug: "producteur",
    term: "Le producteur",
    definition: "Celui qui fabrique ou cultive ce qui sera ensuite vendu",
    situation: "C'est lui qui a planté, arrosé et récolté avant que quiconque ne pose un prix.",
  },
  {
    slug: "distributeur",
    term: "Le distributeur",
    definition: "L'intermédiaire qui achète pour revendre, sans rien fabriquer lui-même",
    situation: "Le supermarché n'a ni champ ni usine : il achète en gros et revend au détail.",
  },
  {
    slug: "marque",
    term: "La marque",
    definition: "Le nom qui permet de reconnaître le produit d'un vendeur parmi ceux des autres",
    situation: "Deux paires de baskets sont fabriquées dans la même usine, mais l'une porte un logo qui la fait payer 40 € de plus.",
  },
  {
    slug: "circuit-court",
    term: "Le circuit court",
    definition: "Une vente qui va du producteur à l'acheteur avec au plus un intermédiaire",
    situation: "L'agriculteur vend lui-même ses tomates devant son exploitation, sans passer par un magasin.",
  },
];

export const marcheA2EcoBank = banqueEconomie({
  niveau: "a2",
  notionId: "eco_a2_marche",
  concepts: CONCEPTS,
  tags: ["economie", "marche", "a2"],
});
