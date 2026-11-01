// L'ARBRE DU JOUR (01/11/2026) — Ti Margo grimpe chaque jour sur un arbre réel.
//
// Frédéric, devant la page d'entrée : « du coup Ti Margo monte sur un arbre,
// avec son contexte, que l'on mettra dans le journal ». L'arbre est dessiné sur
// eleveai.fr/ (app/ChoixEntree.tsx) ; son histoire et sa question de maths sont
// dans le Journal (encadré « L'arbre du jour », ancre #arbre-du-jour).
// Un arbre par pays du site. ⛔ La Réunion ne revient qu'un jour sur 25.
// ⚠️ Les CHIFFRES DE LA QUESTION sont un cas posé (« un bâton de 1 m… ») ; seuls
// les faits du `contexte` parlent du vrai arbre : n'y écrire que du sûr.

import { jourParis } from "./journal";

export type FormeFeuillage = "rond" | "cone" | "parasol";

export type Arbre = {
  slug: string;
  /** « le baobab » : avec l'article, pour « Ti Margo grimpe sur le baobab ». */
  nom: string;
  /** « un baobab » */
  unNom: string;
  pays: string;
  contexte: string;
  question: string;
  reponse: string;
  metier: string;
  dessin: { forme: FormeFeuillage; fonce: string; clair: string; tronc: string; epaisseur: number };
};

const ARBRES: Arbre[] = [
  {
    slug: "chene",
    nom: "le chêne",
    unNom: "un chêne",
    pays: "France",
    contexte:
      "Le chêne est l'arbre le plus présent dans les forêts françaises. Son bois, très solide, sert aux charpentes, aux meubles et aux tonneaux. Ses fruits sont les glands.",
    question:
      "Un bâton de 1 m fait une ombre de 0,8 m. Au même moment, l'ombre du chêne mesure 20 m. Quelle est la hauteur du chêne ?",
    reponse: "25 m. L'ombre est proportionnelle à la hauteur : 20 ÷ 0,8 = 25.",
    metier: "Technicienne forestière : elle mesure les arbres sans y grimper, avec ce calcul d'ombres.",
    dessin: { forme: "rond", fonce: "#3f8a34", clair: "#5fae47", tronc: "#7a4b2a", epaisseur: 9 },
  },
  {
    slug: "meleze",
    nom: "le mélèze",
    unNom: "un mélèze",
    pays: "Suisse romande",
    contexte:
      "Le mélèze pousse haut dans les Alpes. C'est un conifère étonnant : en automne, ses aiguilles deviennent jaune d'or, puis tombent. Elles poussent en petits bouquets.",
    question: "Un rameau porte 12 bouquets de 30 aiguilles. Combien d'aiguilles en tout ?",
    reponse: "360 aiguilles : 12 × 30 = 360.",
    metier: "Garde forestier de montagne : il compte, surveille et protège les arbres des Alpes.",
    dessin: { forme: "cone", fonce: "#c49a1c", clair: "#e6c64a", tronc: "#6b3f22", epaisseur: 8 },
  },
  {
    slug: "hetre",
    nom: "le hêtre",
    unNom: "un hêtre",
    pays: "Belgique",
    contexte:
      "Près de Bruxelles, la forêt de Soignes est célèbre pour ses grands hêtres, droits comme les colonnes d'une cathédrale. Une partie de cette forêt est inscrite au patrimoine mondial de l'UNESCO.",
    question:
      "Chaque année, un arbre fabrique un cerne dans son bois. Un hêtre coupé en 2026 montre 180 cernes. En quelle année a-t-il commencé à pousser ?",
    reponse: "En 1846 : 2026 − 180 = 1846.",
    metier: "Dendrochronologue : il lit l'âge et l'histoire du climat dans les cernes du bois.",
    dessin: { forme: "rond", fonce: "#4c9a3a", clair: "#7cc35b", tronc: "#8c8a85", epaisseur: 9 },
  },
  {
    slug: "erable",
    nom: "l'érable à sucre",
    unNom: "un érable à sucre",
    pays: "Québec",
    contexte:
      "Au printemps, on recueille la sève de l'érable à sucre, puis on la fait bouillir longtemps : il reste le sirop d'érable. Le Québec produit environ 7 bouteilles de sirop d'érable sur 10 dans le monde.",
    question: "Il faut environ 40 L de sève pour faire 1 L de sirop. Combien de litres de sève pour 6 L de sirop ?",
    reponse: "240 L : 40 × 6 = 240.",
    metier: "Acéricultrice : elle récolte la sève et la transforme en sirop, à la cabane à sucre.",
    dessin: { forme: "rond", fonce: "#d9481f", clair: "#f08a24", tronc: "#6b3f22", epaisseur: 9 },
  },
  {
    slug: "arganier",
    nom: "l'arganier",
    unNom: "un arganier",
    pays: "Maroc",
    contexte:
      "L'arganier pousse surtout dans le sud-ouest du Maroc. Ses fruits donnent l'huile d'argan. Et Ti Margo n'est pas le seul à y grimper : les chèvres montent dans ses branches pour manger les feuilles et les fruits !",
    question: "Une chèvre est montée à 3 m de haut dans un arganier de 9 m. À quelle fraction de la hauteur de l'arbre est-elle ?",
    reponse: "Au tiers : 3 sur 9, c'est 1/3.",
    metier: "Ingénieure agronome : elle aide les coopératives à protéger les arganiers et à mieux récolter.",
    dessin: { forme: "parasol", fonce: "#2f6b3a", clair: "#4d8a4f", tronc: "#6e4a2e", epaisseur: 9 },
  },
  {
    slug: "baobab",
    nom: "le baobab",
    unNom: "un baobab",
    pays: "Sénégal",
    contexte:
      "Le baobab est l'emblème du Sénégal : il figure sur ses armoiries. Son tronc énorme garde de l'eau pour la saison sèche, et certains baobabs vivent plus de mille ans.",
    question: "Le tour du tronc d'un baobab mesure 15 m. Son diamètre vaut environ le tour ÷ 3,14. Combien mesure-t-il, à peu près ?",
    reponse: "Environ 4,8 m : 15 ÷ 3,14 ≈ 4,78.",
    metier: "Botaniste : elle étudie les plantes, leur âge, leur croissance et leur protection.",
    dessin: { forme: "parasol", fonce: "#6a9b3c", clair: "#8bb85a", tronc: "#8a6a55", epaisseur: 15 },
  },
  {
    slug: "fromager",
    nom: "le fromager",
    unNom: "un fromager",
    pays: "Côte d'Ivoire",
    contexte:
      "Le fromager est l'un des plus grands arbres d'Afrique : il peut dépasser 50 m. Au pied de son tronc, de grandes racines en forme d'ailes le tiennent debout. Ses fruits donnent le kapok, une fibre qui remplit les coussins.",
    question: "Un fromager mesure 54 m. Un étage d'immeuble mesure 3 m. Ce fromager est aussi haut qu'un immeuble de combien d'étages ?",
    reponse: "18 étages : 54 ÷ 3 = 18.",
    metier: "Forestier : il connaît chaque grand arbre de la forêt et décide lesquels protéger.",
    dessin: { forme: "parasol", fonce: "#3d8b3d", clair: "#62b062", tronc: "#9a8a78", epaisseur: 10 },
  },
];

const TAMARIN: Arbre = {
  slug: "tamarin",
  nom: "le tamarin des Hauts",
  unNom: "un tamarin des Hauts",
  pays: "La Réunion",
  contexte:
    "Le tamarin des Hauts ne pousse nulle part ailleurs qu'à La Réunion, dans les forêts des Hauts, comme la forêt de Bélouve. Son bois sert à fabriquer de beaux meubles.",
  question: "Un sentier part de 900 m d'altitude et arrive à 1 500 m dans une forêt de tamarins. De combien de mètres monte-t-on ?",
  reponse: "600 m : 1 500 − 900 = 600.",
  metier: "Accompagnateur en montagne : il guide les randonneurs et leur raconte la forêt.",
  dessin: { forme: "parasol", fonce: "#2e6e3f", clair: "#4f9a5a", tronc: "#6b3f22", epaisseur: 9 },
};

/** Pour voir un arbre précis : eleveai.fr/?arbre=baobab (l'aperçu, pas le tirage). */
export function arbreParSlug(slug: string): Arbre | undefined {
  return [...ARBRES, TAMARIN].find((a) => a.slug === slug);
}

/** L'arbre du jour (heure de Paris, comme le Journal) : le même sur / et sur /journal. */
export function arbreDuJour(jour = jourParis()): Arbre {
  if (jour % 25 === 0) return TAMARIN;
  return ARBRES[jour % ARBRES.length];
}
