// LE CONTENU DU JOURNAL DE L'ACCUEIL (maquette du 18/10/2026, /accueil-journal).
//
// Frédéric : « je veux refonder la page d'accueil comme un journal, avec vidéos,
// coach etc », « comme un journal pour la jeunesse », « et les adultes », « avec
// une mise en page à choisir », puis la phrase qui commande tout :
//   « je veux qu'un jeune, un prof se dise : je vais sur ce site, je vais
//     apprendre une chose utile, ou m'entraîner » — et « avoir une perspective
//     d'avenir ».
//
// D'où trois promesses, dans cet ordre, et chaque rubrique en sert une :
//   APPRENDRE    la Une (une vidéo + « ce que tu vas apprendre »), le chiffre
//   S'ENTRAÎNER  le défi du jour (sur la page), le coach par classe, les rituels
//   ET DEMAIN ?  le métier du jour, et les maths qui y servent
//
// ⛔ LES VIDÉOS SONT DÉSIGNÉES PAR LEUR ID DU MANIFESTE (lib/videos/videos-r2.json),
// toutes vérifiées publiées le 18/10. Une vidéo absente de la table ne s'affiche
// pas : la page lit `trouverVideo`, elle n'invente rien.
// ⛔ La rotation se fait au JOUR DE L'ANNÉE, calculée côté serveur (la page est
// régénérée toutes les heures) : pas de `new Date()` dans le rendu client.

export type UneJournal = {
  /** La paysage : id du manifeste. */
  paysage: string;
  /** Son short jumeau, s'il existe. */
  short?: string;
  classe: string;
  /** « Ce que tu vas apprendre » : UNE phrase, vraie, sans formule. */
  utile: string;
};

export const UNES: UneJournal[] = [
  {
    paysage: "974-eau",
    short: "974-eau-short-millimetre",
    classe: "5e",
    utile: "30 mm de pluie, c'est 30 litres d'eau tombés sur chaque mètre carré.",
  },
  {
    paysage: "3e-pythagore-solide",
    short: "3e-pythagore-solide-short",
    classe: "3e",
    utile: "Un triangle rectangle se cache dans un gobelet : Pythagore suffit pour trouver la longueur cherchée.",
  },
  {
    paysage: "974-rond-point",
    short: "974-rond-point-short-hasard",
    classe: "Terminale",
    utile: "Un bouchon peut naître sans accident ni feu rouge, du seul hasard des arrivées.",
  },
  {
    paysage: "seconde-analyse-graphique",
    short: "seconde-analyse-graphique-short-nuit",
    classe: "2de",
    utile: "Sur une courbe, l'image se lit sur l'axe vertical, l'antécédent sur l'axe horizontal.",
  },
  {
    paysage: "5e-relatif-nombre",
    short: "5e-relatif-nombre-short-ti-margo-diagonale",
    classe: "5e",
    utile: "Les nombres relatifs comptent ce qu'on monte (+) et ce qu'on descend (−).",
  },
  {
    paysage: "terminale-continuite-tvi",
    classe: "Terminale",
    utile: "Une courbe sans saut qui passe sous une valeur puis au-dessus la franchit forcément.",
  },
];

/** Les shorts de la rubrique « Une minute pour être surpris ». */
export const SHORTS = [
  "seconde-signes-expression-short-dauphin",
  "5e-relatif-nombre-short-ti-margo-diagonale",
  "6e-duree-temps-short-diagonale",
  "5e-relatif-nombre-short-comparer",
  "3e-pythagore-solide-short",
  "6e-aire-longueur-short-diagonale",
  "974-eau-short-millimetre",
  "5e-relatif-nombre-short-signe",
  "4e-grandeur-composee-short-diagonale",
  "seconde-analyse-graphique-short-nuit",
];

/** « Maths Réel » : les maths qui se passent dehors. */
export const MATHS_REEL = [
  "6e-aire-longueur-convertir-diagonale",
  "974-eau",
  "974-rond-point",
  "3e-pythagore-solide",
  // L'accroche du TVI est le Piton des Neiges (« j'adore la paysage sur le TVI »).
  "terminale-continuite-tvi",
];

/* ── LE DÉFI DU JOUR ────────────────────────────────────────────────────────
   ⛔ Règles du site appliquées ici : jamais deux choix de même valeur
   (« 32 » ≠ « 32 000 »), « ÷ » et jamais 5/2 hors fractions, ×10 expliqué par
   la valeur des chiffres, les billes pour la division. La réponse juste est
   TOUJOURS `choix[bonne]` ; l'ordre affiché est mélangé par la page. */
export type Defi = {
  classe: string;
  /** Ce que le coach attend dans `?classe=`. */
  coach: string;
  question: string;
  choix: string[];
  bonne: number;
  explication: string;
};

export const DEFIS: Defi[] = [
  {
    classe: "6e",
    coach: "6e",
    question: "Combien font 3,5 × 10 ?",
    choix: ["35", "3,50", "30,5"],
    bonne: 0,
    explication: "Chaque chiffre prend une valeur dix fois plus grande : 3 unités deviennent 3 dizaines, 5 dixièmes deviennent 5 unités. Donc 35.",
  },
  {
    classe: "5e",
    coach: "5e",
    question: "Combien vaut 2 + 3 × 4 ?",
    choix: ["14", "20", "24"],
    bonne: 0,
    explication: "La multiplication passe d'abord : 3 × 4 = 12, puis 2 + 12 = 14.",
  },
  {
    classe: "CE2",
    coach: "ce2",
    question: "Combien font 12 ÷ 4 ?",
    choix: ["3", "8", "48"],
    bonne: 0,
    explication: "12 billes rangées en 4 colonnes : 3 billes dans chaque colonne, car 3 × 4 = 12.",
  },
  {
    classe: "4e",
    coach: "4e",
    question: "Un triangle rectangle a des côtés de l'angle droit de 3 cm et 4 cm. Combien mesure l'hypoténuse ?",
    choix: ["5 cm", "7 cm", "25 cm"],
    bonne: 0,
    explication: "3² + 4² = 9 + 16 = 25, et le nombre positif dont le carré vaut 25 est 5.",
  },
  {
    classe: "5e",
    coach: "5e",
    question: "Combien vaut (−3) + 7 ?",
    choix: ["4", "−4", "10"],
    bonne: 0,
    explication: "Tu descends de 3, puis tu remontes de 7 : tu finis 4 au-dessus de zéro.",
  },
  {
    classe: "2de",
    coach: "seconde",
    question: "Un prix de 80 € augmente de 25 %. Quel est le nouveau prix ?",
    choix: ["100 €", "105 €", "85 €"],
    bonne: 0,
    explication: "25 %, c'est le quart : le quart de 80 € fait 20 €. 80 + 20 = 100 €.",
  },
  {
    classe: "CM2",
    coach: "cm2",
    question: "Combien de minutes dans 1 h 30 ?",
    choix: ["90", "130", "80"],
    bonne: 0,
    explication: "1 heure = 60 minutes, plus 30 minutes : 60 + 30 = 90 minutes.",
  },
  {
    classe: "6e",
    coach: "6e",
    question: "Quel nombre est le plus grand ?",
    choix: ["0,7", "0,65", "0,09"],
    bonne: 0,
    explication: "On compare les dixièmes : 7 dixièmes, contre 6 et 0. C'est 0,7 qui gagne, même s'il a moins de chiffres.",
  },
  {
    classe: "3e",
    coach: "3e",
    question: "On lance un dé à 6 faces. Quelle est la probabilité d'obtenir un nombre pair ?",
    choix: ["1 chance sur 2", "1 chance sur 3", "1 chance sur 6"],
    bonne: 0,
    explication: "Les pairs sont 2, 4 et 6 : trois faces sur six, soit une chance sur deux.",
  },
  {
    classe: "CE1",
    coach: "ce1",
    question: "Combien font 7 + 8 ?",
    choix: ["15", "14", "16"],
    bonne: 0,
    explication: "7 + 3 = 10, puis il reste 5 à ajouter : 10 + 5 = 15.",
  },
  {
    classe: "4e",
    coach: "4e",
    question: "Combien vaut 2¹⁰ (2 multiplié par lui-même 10 fois) ?",
    choix: ["1 024", "20", "100"],
    bonne: 0,
    explication: "2, 4, 8, 16, 32, 64, 128, 256, 512, 1 024 : on double dix fois.",
  },
  {
    classe: "CM1",
    coach: "cm1",
    question: "Combien font 25 × 4 ?",
    choix: ["100", "29", "90"],
    bonne: 0,
    explication: "Quatre pièces de 25 centimes font 1 euro, c'est-à-dire 100 centimes.",
  },
];

/* ── LE CHIFFRE DU JOUR ─────────────────────────────────────────────────────
   Repris de lib/chiffre-du-jour.ts (supprimé le 14/08, `git show 03aec7ac`).
   Règle d'authenticité de Frédéric : QUE des chiffres vérifiés ; dans le doute,
   « environ ». ⛔ Retiré au passage : « 0 pub » (on ne parle pas d'argent). */
export const CHIFFRES: { chiffre: string; texte: string }[] = [
  { chiffre: "1 825 mm", texte: "La pluie tombée en 24 heures à Foc-Foc, sur les pentes du volcan, en janvier 1966. Record du monde, toujours invaincu." },
  { chiffre: "3 070 m", texte: "Le Piton des Neiges, plus haut sommet de tout l'océan Indien. L'île entière est son œuvre." },
  { chiffre: "8 000 km", texte: "Le voyage des baleines à bosse depuis l'Antarctique jusqu'aux eaux chaudes de La Réunion, chaque hiver austral. Sans GPS." },
  { chiffre: "118 km/h", texte: "Le seuil de vent qui fait d'une tempête un cyclone tropical." },
  { chiffre: "300 000 km/s", texte: "La vitesse de la lumière. Le rayon de soleil qui te réchauffe a quitté le Soleil il y a un peu plus de 8 minutes." },
  { chiffre: "384 400 km", texte: "La distance moyenne entre la Terre et la Lune : environ 9,6 fois le tour de la Terre." },
  { chiffre: "11 jours et demi", texte: "Ce que dure UN MILLION de secondes. Et un milliard de secondes ? Presque 32 ans. Voilà la différence entre million et milliard." },
  { chiffre: "142 857", texte: "Multiplie-le par 2, 3, 4, 5 ou 6 : les mêmes chiffres reviennent, dans le même ordre, juste décalés. Multiplie-le par 7 : 999 999. Essaie." },
  { chiffre: "1 024", texte: "2 multiplié par lui-même 10 fois. C'est pour ça qu'un « kilo-octet » n'est pas exactement mille octets : l'informatique compte en puissances de 2." },
  { chiffre: "≈ 165 km", texte: "La Diagonale des Fous : traverser La Réunion à pied avec près de 10 000 m de dénivelé. Les plus rapides le font en moins de 24 heures." },
  { chiffre: "2 200 m", texte: "L'altitude du Maïdo. En bas, on se baigne à 28 °C ; là-haut, certains matins d'hiver, il gèle." },
  { chiffre: "200 litres", texte: "Le lait que boit un baleineau chaque jour. Il grossit d'environ 45 kg par jour." },
];

/* ── ET PLUS TARD ? LE MÉTIER DU JOUR ───────────────────────────────────────
   « Avoir une perspective d'avenir » : chaque jour, un métier et LA notion qui
   y sert vraiment, avec un lien vers elle. ⛔ Des usages réels et connus, pas
   des promesses de salaire ni de débouchés chiffrés. */
export type Metier = {
  nom: string;
  /** Ce que la personne fait, en une phrase. */
  fait: string;
  /** Les maths qu'elle utilise, en une phrase concrète. */
  maths: string;
  notion: string;
  href: string;
};

export const METIERS: Metier[] = [
  {
    nom: "Charpentier ou charpentière",
    fait: "Monte les toits et les maisons en bois.",
    maths: "Pour vérifier un angle droit sur un chantier, on mesure 3 m, 4 m… et la diagonale doit faire 5 m. C'est Pythagore.",
    notion: "Pythagore · 4e",
    href: "/coach-ia/maths?classe=4e",
  },
  {
    nom: "Prévisionniste météo",
    fait: "Annonce la pluie, le vent et les cyclones.",
    maths: "Il compte la pluie en millimètres : 1 mm, c'est 1 litre d'eau sur chaque mètre carré.",
    notion: "Grandeurs et mesures · 5e",
    href: "/video/974-eau",
  },
  {
    nom: "Infirmier ou infirmière",
    fait: "Soigne les patients et prépare leurs traitements.",
    maths: "Une dose se calcule selon le poids du patient : c'est de la proportionnalité, et une erreur ne pardonne pas.",
    notion: "Proportionnalité · 6e à 4e",
    href: "/coach-ia/maths?classe=4e",
  },
  {
    nom: "Ingénieur ou ingénieure du trafic",
    fait: "Règle les feux et les ronds-points pour que ça roule.",
    maths: "Les voitures arrivent au hasard : les probabilités disent quand un bouchon va se former.",
    notion: "Probabilités · lycée",
    href: "/video/974-rond-point",
  },
  {
    nom: "Créateur ou créatrice de jeux vidéo",
    fait: "Invente des mondes où l'on joue.",
    maths: "Chaque personnage a des coordonnées (x ; y) dans un repère, et le faire bouger, c'est les faire varier.",
    notion: "Repère · 2de",
    href: "/coach-ia/maths?classe=seconde",
  },
  {
    nom: "Statisticien ou statisticienne",
    fait: "Fait parler les chiffres : santé, sport, élections, climat.",
    maths: "Moyennes, pourcentages, graphiques : savoir lire une courbe, c'est ne pas se laisser tromper.",
    notion: "Lire une courbe · 2de",
    href: "/video/seconde-analyse-graphique",
  },
  {
    nom: "Entraîneur ou entraîneuse de trail",
    fait: "Prépare les coureurs de la Diagonale des Fous.",
    maths: "Vitesse, durée, dénivelé : 7,7 km/h de moyenne sur 165 km, ça se calcule avant le départ.",
    notion: "Vitesses et durées · 4e",
    href: "/video/4e-grandeur-composee-short-diagonale",
  },
  {
    nom: "Architecte",
    fait: "Dessine les maisons, les écoles, les ponts.",
    maths: "Un plan est à l'échelle : 1 cm sur le papier peut valoir 1 m en vrai. Aires et longueurs à chaque trait.",
    notion: "Aires et longueurs · 6e",
    href: "/coach-ia/maths?classe=6e",
  },
];

/** Le jour de l'année (1 → 366), à l'heure de Paris : sert à faire tourner
 *  les rubriques. Appelé côté SERVEUR seulement. */
export function jourDeLAnnee(d = new Date()): number {
  const p = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d); // « 2026-10-18 »
  const [a, m, j] = p.split("-").map(Number);
  return Math.round((Date.UTC(a, m - 1, j) - Date.UTC(a, 0, 0)) / 86400000);
}
