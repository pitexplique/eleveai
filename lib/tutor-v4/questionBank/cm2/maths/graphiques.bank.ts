// lib/tutor-v4/question-banks/maths/cm2/graphiques.bank.ts

import type {
  TutorBankItemV4,
  StatGraphCanvasData,
} from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: readonly T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function statGraphCanvas(
  data: Omit<StatGraphCanvasData, "kind">
): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    ...data,
  };
}

// ============================================================
// COULEURS DOUCES
// ============================================================

const STAT_COLORS = {
  bleu: "#bfdbfe",
  vert: "#bbf7d0",
  jaune: "#fde68a",
  rose: "#fecdd3",
  violet: "#ddd6fe",
  orange: "#fed7aa",
};

// ============================================================
// HELPERS CANVAS
// ============================================================

/** `axe` (21/10/2026) : aucune valeur écrite, un axe gradué de 2 en 2.
 *  Foot 12 et Basket 10 tombent sur une graduation ; Danse 9 et Nage 7 au milieu. */
function graphiqueActivitesCanvas(
  highlightIndex?: number,
  axe = false,
): StatGraphCanvasData {
  return statGraphCanvas({
    graphType: "barres",
    data: [
      { label: "Foot", value: 12, color: STAT_COLORS.bleu },
      { label: "Danse", value: 9, color: STAT_COLORS.rose },
      { label: "Nage", value: 7, color: STAT_COLORS.vert },
      { label: "Basket", value: 10, color: STAT_COLORS.jaune },
    ],
    display: axe
      ? { showLabels: true, showValues: false, showAxis: true, step: 2, axeY: "élèves", highlightIndex }
      : { showLabels: true, showValues: true, highlightIndex },
  });
}

function graphiqueFruitsCanvas(
  highlightIndex?: number
): StatGraphCanvasData {
  return statGraphCanvas({
    graphType: "barres",
    data: [
      { label: "Ananas", value: 24, color: STAT_COLORS.jaune },
      { label: "Bananes", value: 28, color: STAT_COLORS.vert },
      { label: "Mangues", value: 15, color: STAT_COLORS.orange },
      { label: "Letchis", value: 18, color: STAT_COLORS.rose },
    ],
    display: {
      showLabels: true,
      showValues: true,
      highlightIndex,
    },
  });
}

function graphiqueLivresCanvas(
  highlightIndex?: number
): StatGraphCanvasData {
  return statGraphCanvas({
    graphType: "batons",
    data: [
      { label: "Romans", value: 14, color: STAT_COLORS.bleu },
      { label: "BD", value: 22, color: STAT_COLORS.jaune },
      { label: "Mangas", value: 18, color: STAT_COLORS.violet },
      { label: "Docs", value: 9, color: STAT_COLORS.vert },
    ],
    display: {
      showLabels: true,
      showValues: true,
      highlightIndex,
    },
  });
}

/** `axe` (21/10/2026) : aucune valeur écrite, un axe gradué de 2 en 2 (toutes sur une graduation). */
function graphiqueCantineCanvas(
  highlightIndex?: number,
  axe = false,
): StatGraphCanvasData {
  return statGraphCanvas({
    graphType: "barres",
    data: [
      { label: "Cari", value: 16, color: STAT_COLORS.orange },
      { label: "Rougail", value: 14, color: STAT_COLORS.rose },
      { label: "Salade", value: 8, color: STAT_COLORS.vert },
      { label: "Sandwich", value: 12, color: STAT_COLORS.bleu },
    ],
    display: axe
      ? { showLabels: true, showValues: false, showAxis: true, step: 2, axeY: "élèves", highlightIndex }
      : { showLabels: true, showValues: true, highlightIndex },
  });
}

function graphiqueMeteoCanvas(
  highlightIndex?: number
): StatGraphCanvasData {
  return statGraphCanvas({
    graphType: "batons",
    data: [
      { label: "Lun", value: 25, color: STAT_COLORS.bleu },
      { label: "Mar", value: 27, color: STAT_COLORS.vert },
      { label: "Mer", value: 26, color: STAT_COLORS.jaune },
      { label: "Jeu", value: 28, color: STAT_COLORS.orange },
    ],
    display: {
      showLabels: true,
      showValues: true,
      highlightIndex,
    },
  });
}

function graphiqueCamembertGoutsCanvas(
  highlightIndex?: number
): StatGraphCanvasData {
  return statGraphCanvas({
    graphType: "camembert",
    data: [
      { label: "Vanille", value: 10, color: STAT_COLORS.jaune },
      { label: "Choco", value: 8, color: STAT_COLORS.orange },
      { label: "Fraise", value: 6, color: STAT_COLORS.rose },
      { label: "Coco", value: 6, color: STAT_COLORS.bleu },
    ],
    display: {
      showLabels: true,
      showValues: true,
      // Les questions lisent la valeur d'une part (« Vanille : 10 ») : on l'écrit.
      valeursParts: true,
      highlightIndex,
    },
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   ⭐ 20/10/2026 — DES SITUATIONS, PAS UN SEUL DÉCOR (robustesse des stats).
   Mesuré avant : 24 à 28 squelettes par micro, jusqu'à 18 répétitions sur 20
   (les mêmes « activités », « fruits », « livres » revenaient sans cesse).
   Chaque gabarit ci-dessous croise une SITUATION (une trentaine de relevés :
   sport, marché, pluie, oiseaux, tortues, déchets d'une plage, musique,
   cinéma, histoire, car jaune…) × une TOURNURE × des nombres tirés, et dessine
   le graphique avec EXACTEMENT les nombres de l'énoncé (multiples de 1, 2, 5
   ou 10 pour une lecture facile). Un cran au-dessus du CM1 : écarts, totaux,
   regroupements, valeur manquante, « double », « moitié », « quart ».
   ═══════════════════════════════════════════════════════════════════════════ */

type GCat = { label: string; gn: string; f?: boolean };
const gc = (label: string, gn: string, f?: boolean): GCat => ({ label, gn, f });

type GSit = {
  /** Phrase de situation, posée en tête d'énoncé. */
  intro: string;
  /** Titre du graphique. */
  titre: string;
  /** Ce que l'on compte (« élèves », « kilos »). */
  unite: string;
  combien: (c: GCat) => string;
  qMax: string;
  qMin: string;
  cats: GCat[];
  pas: number;
  min: number;
  max: number;
};

const MOIS = [
  gc("Janv.", "janvier"), gc("Févr.", "février"), gc("Mars", "mars"),
  gc("Avril", "avril"), gc("Mai", "mai"), gc("Juin", "juin"),
];
const JOURS = [
  gc("Lundi", "lundi"), gc("Mardi", "mardi"), gc("Merc.", "mercredi"),
  gc("Jeudi", "jeudi"), gc("Vendr.", "vendredi"), gc("Samedi", "samedi"),
];
const CLASSES = [gc("CP", "CP"), gc("CE1", "CE1"), gc("CE2", "CE2"), gc("CM1", "CM1"), gc("CM2", "CM2")];
const ENFANTS_F = [gc("Léa", "Léa"), gc("Inès", "Inès"), gc("Zoé", "Zoé"), gc("Maëlys", "Maëlys"), gc("Jade", "Jade"), gc("Nora", "Nora")];
const ENFANTS = [
  gc("Léa", "Léa"), gc("Noé", "Noé"), gc("Inès", "Inès"), gc("Tom", "Tom"),
  gc("Zoé", "Zoé"), gc("Enzo", "Enzo"), gc("Maëlys", "Maëlys"), gc("Kylian", "Kylian"),
];

const G_SITS: GSit[] = [
  {
    intro: "Les élèves de CM2 ont voté pour leur sport préféré.",
    titre: "Sport préféré", unite: "élèves",
    combien: (c) => `Combien d’élèves ont choisi ${c.gn} ?`,
    qMax: "Quel sport a été le plus choisi ?", qMin: "Quel sport a été le moins choisi ?",
    cats: [gc("Foot", "le foot"), gc("Danse", "la danse"), gc("Nage", "la natation"), gc("Basket", "le basket"), gc("Judo", "le judo"), gc("Rugby", "le rugby")],
    pas: 1, min: 3, max: 20,
  },
  {
    intro: "Au marché de Saint-Pierre, un marchand note les kilos de fruits vendus.",
    titre: "Fruits vendus (kg)", unite: "kilos",
    combien: (c) => `Combien de kilos ${c.gn} ont été vendus ?`,
    qMax: "Quel fruit a été le plus vendu ?", qMin: "Quel fruit a été le moins vendu ?",
    cats: [gc("Ananas", "d’ananas"), gc("Bananes", "de bananes"), gc("Mangues", "de mangues"), gc("Letchis", "de letchis"), gc("Papayes", "de papayes"), gc("Goyaves", "de goyaves")],
    pas: 5, min: 10, max: 60,
  },
  {
    intro: "La bibliothécaire compte les livres empruntés dans chaque rayon.",
    titre: "Livres empruntés", unite: "livres",
    combien: (c) => `Combien de livres du rayon « ${c.label} » ont été empruntés ?`,
    qMax: "Quel rayon a eu le plus d’emprunts ?", qMin: "Quel rayon a eu le moins d’emprunts ?",
    cats: [gc("Romans", ""), gc("BD", ""), gc("Mangas", ""), gc("Contes", ""), gc("Docs", ""), gc("Poésie", "")],
    pas: 1, min: 4, max: 30,
  },
  {
    intro: "Une météorologue relève le nombre de jours de pluie à Saint-Denis.",
    titre: "Jours de pluie", unite: "jours de pluie",
    combien: (c) => `Combien de jours de pluie y a-t-il eu en ${c.gn} ?`,
    qMax: "Quel mois a été le plus pluvieux ?", qMin: "Quel mois a été le moins pluvieux ?",
    cats: MOIS, pas: 1, min: 3, max: 22,
  },
  {
    intro: "Une ornithologue compte les oiseaux venus dans le jardin de l’école.",
    titre: "Oiseaux observés", unite: "oiseaux",
    combien: (c) => `Combien de ${c.gn} ont été comptés ?`,
    qMax: "Quel oiseau a été le plus observé ?", qMin: "Quel oiseau a été le moins observé ?",
    cats: [gc("Merles", "merles"), gc("Moineaux", "moineaux"), gc("Martins", "martins"), gc("Bulbuls", "bulbuls"), gc("Cardinaux", "cardinaux"), gc("Pigeons", "pigeons")],
    pas: 1, min: 2, max: 18,
  },
  {
    intro: "Des bénévoles nettoient une plage de Saint-Leu et comptent les déchets.",
    titre: "Déchets ramassés", unite: "déchets",
    combien: (c) => `Combien de déchets « ${c.label} » ont été ramassés ?`,
    qMax: "Quel déchet a été le plus ramassé ?", qMin: "Quel déchet a été le moins ramassé ?",
    cats: [gc("Bouteilles", ""), gc("Canettes", ""), gc("Bouchons", ""), gc("Mégots", ""), gc("Sacs", ""), gc("Filets", "")],
    pas: 5, min: 10, max: 80,
  },
  {
    intro: "Une biologiste de Kélonia compte les tortues marines vues chaque mois.",
    titre: "Tortues observées", unite: "tortues",
    combien: (c) => `Combien de tortues ont été vues en ${c.gn} ?`,
    qMax: "Quel mois a compté le plus de tortues ?", qMin: "Quel mois a compté le moins de tortues ?",
    cats: MOIS, pas: 2, min: 4, max: 30,
  },
  {
    intro: "L’école de musique compte ses élèves par instrument.",
    titre: "Instruments joués", unite: "élèves",
    combien: (c) => `Combien d’élèves jouent ${c.gn} ?`,
    qMax: "Quel instrument a le plus d’élèves ?", qMin: "Quel instrument a le moins d’élèves ?",
    cats: [gc("Guitare", "de la guitare"), gc("Piano", "du piano"), gc("Batterie", "de la batterie"), gc("Violon", "du violon"), gc("Flûte", "de la flûte"), gc("Kayamb", "du kayamb")],
    pas: 1, min: 3, max: 20,
  },
  {
    intro: "Un cinéma compte les spectateurs de la journée pour chaque genre de film.",
    titre: "Spectateurs par genre", unite: "spectateurs",
    combien: (c) => `Combien de spectateurs pour le genre « ${c.label} » ?`,
    qMax: "Quel genre a attiré le plus de spectateurs ?", qMin: "Quel genre a attiré le moins de spectateurs ?",
    cats: [gc("Animation", ""), gc("Aventure", ""), gc("Comédie", ""), gc("Policier", ""), gc("Docu", ""), gc("SF", "")],
    pas: 10, min: 20, max: 150,
  },
  {
    intro: "Le directeur demande aux élèves comment ils viennent à l’école.",
    titre: "Venir à l’école", unite: "élèves",
    combien: (c) => `Combien d’élèves viennent ${c.gn} ?`,
    qMax: "Quel moyen de transport est le plus utilisé ?", qMin: "Quel moyen de transport est le moins utilisé ?",
    cats: [gc("À pied", "à pied"), gc("Bus", "en bus"), gc("Car", "en car jaune"), gc("Vélo", "à vélo"), gc("Voiture", "en voiture")],
    pas: 1, min: 2, max: 20,
  },
  {
    intro: "À la cantine, le cuisinier note le plat choisi par chaque élève.",
    titre: "Plats choisis", unite: "élèves",
    combien: (c) => `Combien d’élèves ont choisi ${c.gn} ?`,
    qMax: "Quel plat a été le plus choisi ?", qMin: "Quel plat a été le moins choisi ?",
    cats: [gc("Cari", "le cari"), gc("Rougail", "le rougail"), gc("Pâtes", "les pâtes"), gc("Pizza", "la pizza"), gc("Salade", "la salade"), gc("Poisson", "le poisson")],
    pas: 2, min: 6, max: 40,
  },
  {
    intro: "À la kermesse, on compte les glaces vendues pour chaque parfum.",
    titre: "Glaces vendues", unite: "glaces",
    combien: (c) => `Combien de glaces ${c.gn} ont été vendues ?`,
    qMax: "Quel parfum a été le plus vendu ?", qMin: "Quel parfum a été le moins vendu ?",
    cats: [gc("Vanille", "à la vanille"), gc("Chocolat", "au chocolat"), gc("Fraise", "à la fraise"), gc("Coco", "à la coco"), gc("Mangue", "à la mangue"), gc("Citron", "au citron")],
    pas: 5, min: 10, max: 60,
  },
  {
    intro: "Pour la tombola de l’école, chaque classe a vendu des tickets.",
    titre: "Tickets de tombola", unite: "tickets",
    combien: (c) => `Combien de tickets la classe de ${c.gn} a-t-elle vendus ?`,
    qMax: "Quelle classe a vendu le plus de tickets ?", qMin: "Quelle classe a vendu le moins de tickets ?",
    cats: CLASSES, pas: 5, min: 15, max: 70,
  },
  {
    intro: "À la récréation, des enfants comptent leurs billes.",
    titre: "Billes de chacun", unite: "billes",
    combien: (c) => `Combien de billes possède ${c.gn} ?`,
    qMax: "Qui possède le plus de billes ?", qMin: "Qui possède le moins de billes ?",
    cats: ENFANTS, pas: 2, min: 4, max: 40,
  },
  {
    intro: "Une entraîneuse de basket note les points marqués par ses joueuses.",
    titre: "Points marqués", unite: "points",
    combien: (c) => `Combien de points pour ${c.gn} ?`,
    qMax: "Quelle joueuse a marqué le plus de points ?", qMin: "Quelle joueuse a marqué le moins de points ?",
    cats: ENFANTS_F, pas: 2, min: 2, max: 30,
  },
  {
    intro: "Un guide compte les randonneurs montés au Piton de la Fournaise.",
    titre: "Randonneurs au volcan", unite: "randonneurs",
    combien: (c) => `Combien de randonneurs sont montés au volcan ${c.gn} ?`,
    qMax: "Quel jour a eu le plus de randonneurs ?", qMin: "Quel jour a eu le moins de randonneurs ?",
    cats: JOURS, pas: 10, min: 30, max: 150,
  },
  {
    intro: "En sciences, la classe a semé des graines dans des pots.",
    titre: "Graines germées", unite: "graines",
    combien: (c) => `Combien de graines ont germé dans le ${c.gn} ?`,
    qMax: "Quel pot a le plus de graines germées ?", qMin: "Quel pot a le moins de graines germées ?",
    cats: [gc("Pot A", "pot A"), gc("Pot B", "pot B"), gc("Pot C", "pot C"), gc("Pot D", "pot D"), gc("Pot E", "pot E")],
    pas: 1, min: 2, max: 20,
  },
  {
    intro: "En histoire, chaque élève choisit une époque pour son exposé.",
    titre: "Sujets d’exposé", unite: "élèves",
    combien: (c) => `Combien d’élèves ont choisi ${c.gn} ?`,
    qMax: "Quel sujet a été le plus choisi ?", qMin: "Quel sujet a été le moins choisi ?",
    cats: [gc("Égypte", "l’Égypte"), gc("Romains", "les Romains"), gc("Gaulois", "les Gaulois"), gc("Vikings", "les Vikings"), gc("Châteaux", "les châteaux forts"), gc("Pirates", "les pirates")],
    pas: 1, min: 2, max: 15,
  },
  {
    intro: "Une animatrice radio demande aux élèves leur musique préférée.",
    titre: "Musique préférée", unite: "élèves",
    combien: (c) => `Combien d’élèves préfèrent ${c.gn} ?`,
    qMax: "Quelle musique est la plus aimée ?", qMin: "Quelle musique est la moins aimée ?",
    cats: [gc("Maloya", "le maloya"), gc("Séga", "le séga"), gc("Rap", "le rap"), gc("Pop", "la pop"), gc("Rock", "le rock"), gc("Jazz", "le jazz")],
    pas: 1, min: 2, max: 20,
  },
  {
    intro: "Une famille compte les vidéos regardées en un mois, par thème.",
    titre: "Vidéos regardées", unite: "vidéos",
    combien: (c) => `Combien de vidéos du thème « ${c.label} » ont été regardées ?`,
    qMax: "Quel thème a été le plus regardé ?", qMin: "Quel thème a été le moins regardé ?",
    cats: [gc("Sport", ""), gc("Jeux", ""), gc("Animaux", ""), gc("Cuisine", ""), gc("Sciences", ""), gc("Musique", "")],
    pas: 5, min: 5, max: 60,
  },
  {
    intro: "Une vétérinaire demande aux élèves quel animal ils ont à la maison.",
    titre: "Animaux de compagnie", unite: "élèves",
    combien: (c) => `Combien d’élèves ont ${c.gn} ?`,
    qMax: "Quel animal est le plus présent ?", qMin: "Quel animal est le moins présent ?",
    cats: [gc("Chien", "un chien"), gc("Chat", "un chat"), gc("Poisson", "un poisson"), gc("Lapin", "un lapin"), gc("Oiseau", "un oiseau"), gc("Tortue", "une tortue")],
    pas: 1, min: 2, max: 18,
  },
  {
    intro: "Des amis comptent leurs victoires au jeu de l’oie pendant les vacances.",
    titre: "Parties gagnées", unite: "victoires",
    combien: (c) => `Combien de victoires pour ${c.gn} ?`,
    qMax: "Qui a gagné le plus de parties ?", qMin: "Qui a gagné le moins de parties ?",
    cats: ENFANTS, pas: 1, min: 1, max: 15,
  },
  {
    intro: "La ludothèque demande aux enfants leur jeu de société préféré.",
    titre: "Jeu préféré", unite: "enfants",
    combien: (c) => `Combien d’enfants préfèrent ${c.gn} ?`,
    qMax: "Quel jeu est le plus aimé ?", qMin: "Quel jeu est le moins aimé ?",
    cats: [gc("Uno", "le Uno"), gc("Dames", "les dames"), gc("Échecs", "les échecs"), gc("Dominos", "les dominos"), gc("Memory", "le Memory"), gc("Oie", "le jeu de l’oie")],
    pas: 1, min: 2, max: 20,
  },
  {
    intro: "Léo note les pages lues dans son roman chaque jour.",
    titre: "Pages lues par Léo", unite: "pages",
    combien: (c) => `Combien de pages Léo a-t-il lues ${c.gn} ?`,
    qMax: "Quel jour Léo a-t-il lu le plus de pages ?", qMin: "Quel jour Léo a-t-il lu le moins de pages ?",
    cats: JOURS, pas: 5, min: 5, max: 50,
  },
  {
    intro: "Le chauffeur du car jaune compte les voyageurs montés à chaque arrêt.",
    titre: "Voyageurs du car jaune", unite: "voyageurs",
    combien: (c) => `Combien de voyageurs sont montés ${c.gn} ?`,
    qMax: "À quel arrêt sont montés le plus de voyageurs ?", qMin: "À quel arrêt sont montés le moins de voyageurs ?",
    cats: [gc("Cilaos", "à Cilaos"), gc("Salazie", "à Salazie"), gc("Tampon", "au Tampon"), gc("St-Leu", "à Saint-Leu"), gc("St-Paul", "à Saint-Paul"), gc("Ilet", "à l’îlet")],
    pas: 5, min: 5, max: 50,
  },
  {
    intro: "Un loueur de vélos de Saint-Gilles compte ses locations de la semaine.",
    titre: "Vélos loués", unite: "vélos",
    combien: (c) => `Combien de vélos ont été loués ${c.gn} ?`,
    qMax: "Quel jour a eu le plus de locations ?", qMin: "Quel jour a eu le moins de locations ?",
    cats: JOURS, pas: 5, min: 10, max: 60,
  },
  {
    intro: "Aux Jeux des îles de l’océan Indien, on compte les médailles de chaque île.",
    titre: "Médailles gagnées", unite: "médailles",
    combien: (c) => `Combien de médailles pour ${c.gn} ?`,
    qMax: "Quelle île a gagné le plus de médailles ?", qMin: "Quelle île a gagné le moins de médailles ?",
    cats: [gc("Réunion", "La Réunion"), gc("Maurice", "Maurice"), gc("Madagascar", "Madagascar"), gc("Seychelles", "les Seychelles"), gc("Comores", "les Comores"), gc("Mayotte", "Mayotte")],
    pas: 2, min: 4, max: 60,
  },
  {
    intro: "Pour la planète, chaque classe de l’école a planté des arbres.",
    titre: "Arbres plantés", unite: "arbres",
    combien: (c) => `Combien d’arbres la classe de ${c.gn} a-t-elle plantés ?`,
    qMax: "Quelle classe a planté le plus d’arbres ?", qMin: "Quelle classe a planté le moins d’arbres ?",
    cats: CLASSES, pas: 2, min: 4, max: 30,
  },
  {
    intro: "À Cilaos, un agriculteur mesure l’eau de pluie récoltée dans sa cuve.",
    titre: "Eau récoltée (litres)", unite: "litres",
    combien: (c) => `Combien de litres d’eau ont été récoltés en ${c.gn} ?`,
    qMax: "Quel mois a donné le plus d’eau ?", qMin: "Quel mois a donné le moins d’eau ?",
    cats: MOIS, pas: 10, min: 20, max: 120,
  },
  {
    intro: "Une plongeuse compte les poissons du lagon de l’Ermitage par espèce.",
    titre: "Poissons du lagon", unite: "poissons",
    combien: (c) => `Combien de poissons de l’espèce « ${c.label} » ont été comptés ?`,
    qMax: "Quelle espèce a été la plus comptée ?", qMin: "Quelle espèce a été la moins comptée ?",
    cats: [gc("Clowns", ""), gc("Mérous", ""), gc("Balistes", ""), gc("Perroquets", ""), gc("Chirurgiens", ""), gc("Demoiselles", "")],
    pas: 2, min: 4, max: 40,
  },
  {
    intro: "La classe élit ses délégués. On compte les voix de chaque candidat.",
    titre: "Élection des délégués", unite: "voix",
    combien: (c) => `Combien de voix pour ${c.gn} ?`,
    qMax: "Qui a obtenu le plus de voix ?", qMin: "Qui a obtenu le moins de voix ?",
    cats: ENFANTS, pas: 1, min: 1, max: 14,
  },
  {
    intro: "Au stand de la kermesse, on compte les douceurs vendues.",
    titre: "Douceurs vendues", unite: "douceurs",
    combien: (c) => `Combien de ${c.gn} ont été vendu${c.f ? "es" : "s"} ?`,
    qMax: "Quelle douceur a été la plus vendue ?", qMin: "Quelle douceur a été la moins vendue ?",
    cats: [gc("Crêpes", "crêpes", true), gc("Gaufres", "gaufres", true), gc("Beignets", "beignets"), gc("Samoussas", "samoussas"), gc("Bouchons", "bouchons"), gc("Cookies", "cookies")],
    pas: 5, min: 10, max: 70,
  },
  {
    intro: "Nina vide son sachet de bonbons et les trie par couleur.",
    titre: "Bonbons du sachet", unite: "bonbons",
    combien: (c) => `Combien de bonbons ${c.gn} y a-t-il ?`,
    qMax: "Quelle couleur de bonbon est la plus nombreuse ?", qMin: "Quelle couleur de bonbon est la moins nombreuse ?",
    cats: [gc("Rouges", "rouges"), gc("Verts", "verts"), gc("Jaunes", "jaunes"), gc("Bleus", "bleus"), gc("Orange", "orange"), gc("Violets", "violets")],
    pas: 1, min: 3, max: 20,
  },
  {
    intro: "La fermière compte les œufs ramassés au poulailler.",
    titre: "Œufs ramassés", unite: "œufs",
    combien: (c) => `Combien d’œufs ont été ramassés ${c.gn} ?`,
    qMax: "Quel jour a donné le plus d’œufs ?", qMin: "Quel jour a donné le moins d’œufs ?",
    cats: JOURS, pas: 1, min: 4, max: 20,
  },
  {
    intro: "Un club de foot compte les buts marqués par ses joueurs dans la saison.",
    titre: "Buts marqués", unite: "buts",
    combien: (c) => `Combien de buts pour ${c.gn} ?`,
    qMax: "Qui a marqué le plus de buts ?", qMin: "Qui a marqué le moins de buts ?",
    cats: ENFANTS, pas: 1, min: 1, max: 16,
  },
];

const G_COULEURS = Object.values(STAT_COLORS);

/** `n` éléments distincts, dans l'ordre d'origine (les mois restent dans l'ordre). */
function gSans<T>(arr: readonly T[], n: number): T[] {
  return shuffle(arr.map((_, i) => i))
    .slice(0, n)
    .sort((x, y) => x - y)
    .map((i) => arr[i]);
}

function gMultiples(s: GSit): number[] {
  const out: number[] = [];
  for (let v = Math.ceil(s.min / s.pas) * s.pas; v <= s.max; v += s.pas) out.push(v);
  return out;
}

type GTirage = { s: GSit; cats: GCat[]; vals: number[] };

/** Une situation, `n` catégories, `n` valeurs DISTINCTES (un seul maximum, un seul minimum). */
function gTirer(n = 4, s: GSit = randomChoice(G_SITS)): GTirage {
  const k = Math.min(n, s.cats.length);
  const cats = gSans(s.cats, k);
  const vals = shuffle(gMultiples(s)).slice(0, k);
  return { s, cats, vals };
}

function gCanvas(
  t: GTirage,
  opts: { type?: "barres" | "batons" | "camembert"; hi?: number; sans?: number; axe?: number } = {},
): StatGraphCanvasData {
  const type = opts.type ?? randomChoice(["barres", "batons"] as const);
  const data = t.cats
    .map((c, i) => ({ label: c.label, value: t.vals[i], color: G_COULEURS[i % G_COULEURS.length] }))
    .filter((_, i) => i !== opts.sans);
  // ⭐ 20/10/2026 — `axe` (le pas) : AUCUN nombre écrit sur les barres, un axe
  // gradué à la place. Lire, c'est suivre la ligne jusqu'à l'axe.
  if (opts.axe && type !== "camembert") {
    return statGraphCanvas({
      graphType: type,
      title: t.s.titre,
      data,
      display: {
        showLabels: true, showValues: false, showAxis: true, step: opts.axe,
        axeY: t.s.unite, highlightIndex: opts.hi,
      },
    });
  }
  return statGraphCanvas({
    graphType: type,
    title: t.s.titre,
    data,
    // Camembert : depuis le 20/10/2026, sans `valeursParts`, seul le total est
    // écrit. Ces questions lisent la valeur d'une part : on l'écrit.
    display: { showLabels: true, showValues: true, highlightIndex: opts.hi, valeursParts: type === "camembert" ? true : undefined },
  });
}

/* ─── LIRE SUR UN AXE GRADUÉ (20/10/2026) ──────────────────────────────────
   Le pas de l'axe est un nombre rond (1, 2, 5, 10, 20, 50) : au plus 10
   graduations, et assez de graduations dans [min ; max] pour n barres.
   Les valeurs tombent SUR une graduation. `milieu` : UNE barre s'arrête au
   milieu de deux graduations (pas pair seulement : 13 entre 12 et 14). */
function gPasAxe(s: GSit, n: number): number {
  for (const A of [1, 2, 5, 10, 20, 50]) {
    if (Math.ceil(s.max / A) > 10) continue;
    let k = 0;
    for (let v = Math.ceil(s.min / A) * A; v <= s.max; v += A) if (v > 0) k++;
    if (k >= n) return A;
  }
  // ⚠️ 21/10/2026 — aucun pas ne convient (« jours de pluie », 3 à 22, pour
  // cinq barres : pas de 5 → seulement 5, 10, 15, 20). Avant, on rendait 50 et
  // AUCUNE valeur : des barres « undefined ». gTirerAxe change de situation.
  return 0;
}

type GTirageAxe = GTirage & { A: number };

function gTirerAxe(n = 4, s0?: GSit): GTirageAxe {
  let s = s0 ?? randomChoice(G_SITS);
  for (let essai = 0; !s0 && essai < 50 && !gPasAxe(s, Math.min(n, s.cats.length)); essai++) s = randomChoice(G_SITS);
  const k = Math.min(n, s.cats.length);
  const A = gPasAxe(s, k) || s.pas;
  const mult: number[] = [];
  for (let v = Math.ceil(s.min / A) * A; v <= s.max; v += A) if (v > 0) mult.push(v);
  return { s, cats: gSans(s.cats, k), vals: shuffle(mult).slice(0, k), A };
}

/** La barre i s'arrête au milieu de deux graduations (si le pas est pair). */
function gMettreAuMilieu(t: GTirageAxe, i: number): boolean {
  if (t.A % 2 !== 0) return false;
  const h = t.A / 2;
  const cands: number[] = [];
  for (let v = h; v < Math.ceil(t.s.max / t.A) * t.A; v += t.A) if (v >= t.s.min && v > t.A) cands.push(v);
  if (!cands.length) return false;
  t.vals[i] = randomChoice(cands);
  return true;
}

/** Comment on lit : du haut de la barre jusqu'à l'axe. */
function gCommentLire(t: GTirageAxe, i: number, obj = "la barre"): string {
  const v = t.vals[i];
  const c = t.cats[i];
  if (v % t.A === 0) {
    return `Je pars du haut de ${obj} ${gGuil(c)}, je suis la ligne jusqu’à l’axe, je lis ${v}.`;
  }
  const bas = v - t.A / 2, haut = v + t.A / 2;
  return `Je pars du haut de ${obj} ${gGuil(c)}, je suis la ligne jusqu’à l’axe. ${obj === "le bâton" ? "Il" : "Elle"} s’arrête au milieu, entre ${bas} et ${haut} : je lis ${v}.`;
}

/** Leurres de lecture : les graduations voisines, et le pas lu à la place de la valeur. */
function gLeurresAxe(t: GTirageAxe, i: number): number[] {
  const v = t.vals[i];
  // Exactement trois leurres quand c'est possible : makeChoices les garde tous.
  const voisins = (v % t.A === 0 ? [v - t.A, v + t.A] : [v - t.A / 2, v + t.A / 2]).filter((x) => x > 0);
  const autres = [t.A, ...t.vals.filter((_, k) => k !== i)].filter((x) => x > 0 && x !== v && !voisins.includes(x));
  return Array.from(new Set([...voisins, ...shuffle(autres)])).slice(0, 3);
}

/** Choix numériques : la bonne réponse + de vrais leurres, jamais deux fois la même valeur. */
function gNum(correct: number, wrongs: number[], pas = 1): string[] {
  const w = wrongs.filter((x) => x >= 0 && x !== correct);
  for (const d of [pas, -pas, 2 * pas, -2 * pas, 1, -1, 10, -10]) {
    if (new Set(w).size >= 3) break;
    const x = correct + d;
    if (x >= 0 && x !== correct) w.push(x);
  }
  return makeChoices(String(correct), w.map(String));
}

const gSomme = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const gGuil = (c: GCat) => `« ${c.label} »`;
const gListe = (t: GTirage, idx: number[] = t.cats.map((_, i) => i)) =>
  idx.map((i) => `${gGuil(t.cats[i])} : ${t.vals[i]}`).join(", ");
const gIdxMax = (vals: number[]) => vals.indexOf(Math.max(...vals));
const gIdxMin = (vals: number[]) => vals.indexOf(Math.min(...vals));
/** Deux indices distincts, le premier de plus grande valeur. */
function gPaire(t: GTirage): [number, number] {
  const [i, j] = shuffle(t.cats.map((_, k) => k)).slice(0, 2);
  return t.vals[i] > t.vals[j] ? [i, j] : [j, i];
}

const G_PRENOMS = [
  { n: "Léa", f: true }, { n: "Noé", f: false }, { n: "Inès", f: true }, { n: "Tom", f: false },
  { n: "Zoé", f: true }, { n: "Enzo", f: false }, { n: "Maëlys", f: true }, { n: "Kylian", f: false },
  { n: "Jade", f: true }, { n: "Ilyes", f: false },
];

function gGab(
  id: string,
  microId: string,
  difficulty: 1 | 2 | 3 | 4 | 5,
  hint: string,
  tags: string[],
  generate: () => any,
): TutorBankItemV4 {
  return {
    kind: "template", id, niveau: "cm2", matiere: "maths", notionId: "graphique", microId,
    difficulty, theme: "neutral", hint, tags: ["cm2", "graphique", ...tags, "template", "qcm", "canvas"],
    generate,
  } as TutorBankItemV4;
}

const gObj = (type: string) => (type === "barres" ? "la barre" : type === "batons" ? "le bâton" : "la part");

/* ─── LES COURBES (21/10/2026) ─────────────────────────────────────────────
   Programme du cycle 3 : « lire et interpréter des courbes ». Une évolution
   (mois, heures, semaines, années), six points reliés, un axe gradué, AUCUNE
   valeur écrite. Chaque relevé est porté par un MÉTIER. Les valeurs sont des
   multiples du pas (`A`) ; la `forme` garde un relevé vraisemblable :
   « monte » (une plante pousse), « cloche » (la pluie de la saison des pluies,
   la chaleur d'une journée), « libre ». Ordres de grandeur de La Réunion :
   saison des pluies de janvier à mars (Saint-Denis, plus de 200 mm par mois),
   baleines à bosse de juin à octobre, au plus fort en août-septembre. */
type GCourbe = {
  intro: string;
  titre: string;
  /** Nom de l'axe vertical et unité des réponses. */
  unite: string;
  points: GCat[];
  /** Le pas de l'axe. */
  A: number;
  forme: "monte" | "cloche" | "libre";
  /** Cloche : le sommet tombe sur l'un de ces rangs. */
  sommet?: number[];
  /** Bornes des valeurs, en nombre de pas (1 à 10 : au plus 10 graduations). */
  bas: number;
  haut: number;
  valeur: (c: GCat) => string;
  qMax: string;
  qMin: string;
};

const G_COURBES: GCourbe[] = [
  {
    intro: "Une météorologue de Météo-France relève la pluie tombée à Saint-Denis, mois par mois.",
    titre: "Pluie à Saint-Denis (mm)", unite: "mm",
    points: MOIS, A: 50, forme: "cloche", sommet: [0, 1, 2], bas: 1, haut: 7,
    valeur: (c) => `Combien de millimètres de pluie sont tombés en ${c.gn} ?`,
    qMax: "Quel mois a été le plus pluvieux ?", qMin: "Quel mois a été le moins pluvieux ?",
  },
  {
    intro: "Au Maïdo, un guide de montagne relève la température toutes les deux heures.",
    titre: "Température au Maïdo (°C)", unite: "°C",
    points: [gc("6 h", "à 6 h"), gc("8 h", "à 8 h"), gc("10 h", "à 10 h"), gc("12 h", "à 12 h"), gc("14 h", "à 14 h"), gc("16 h", "à 16 h")],
    A: 2, forme: "cloche", sommet: [3, 4], bas: 2, haut: 10,
    valeur: (c) => `Quelle température fait-il ${c.gn} ?`,
    qMax: "À quelle heure fait-il le plus chaud ?", qMin: "À quelle heure fait-il le plus froid ?",
  },
  {
    intro: "Une jardinière mesure un plant de tomate chaque semaine (S1 : semaine 1).",
    titre: "Taille du plant (cm)", unite: "cm",
    points: [gc("S1", "la semaine 1"), gc("S2", "la semaine 2"), gc("S3", "la semaine 3"), gc("S4", "la semaine 4"), gc("S5", "la semaine 5"), gc("S6", "la semaine 6")],
    A: 2, forme: "monte", bas: 1, haut: 10,
    valeur: (c) => `Combien mesure le plant ${c.gn} ?`,
    qMax: "Quelle semaine le plant est-il le plus grand ?", qMin: "Quelle semaine le plant est-il le plus petit ?",
  },
  {
    intro: "Une guide de la Cité du Volcan compte les visiteurs du musée, mois par mois.",
    titre: "Visiteurs du musée", unite: "visiteurs",
    points: [gc("Juil.", "juillet"), gc("Août", "août"), gc("Sept.", "septembre"), gc("Oct.", "octobre"), gc("Nov.", "novembre"), gc("Déc.", "décembre")],
    A: 100, forme: "libre", bas: 2, haut: 9,
    valeur: (c) => `Combien de visiteurs sont venus en ${c.gn} ?`,
    qMax: "Quel mois a eu le plus de visiteurs ?", qMin: "Quel mois a eu le moins de visiteurs ?",
  },
  {
    intro: "Un urbaniste étudie la population d’une commune de La Réunion, tous les dix ans.",
    titre: "Population (milliers d’habitants)", unite: "milliers d’habitants",
    points: [gc("1970", "en 1970"), gc("1980", "en 1980"), gc("1990", "en 1990"), gc("2000", "en 2000"), gc("2010", "en 2010"), gc("2020", "en 2020")],
    A: 10, forme: "monte", bas: 2, haut: 10,
    valeur: (c) => `Combien de milliers d’habitants la commune compte-t-elle ${c.gn} ?`,
    qMax: "En quelle année la commune compte-t-elle le plus d’habitants ?", qMin: "En quelle année la commune compte-t-elle le moins d’habitants ?",
  },
  {
    intro: "Une cétologue compte les baleines à bosse vues au large de Saint-Gilles, mois par mois.",
    titre: "Baleines observées", unite: "baleines",
    points: [gc("Juin", "juin"), gc("Juil.", "juillet"), gc("Août", "août"), gc("Sept.", "septembre"), gc("Oct.", "octobre"), gc("Nov.", "novembre")],
    A: 5, forme: "cloche", sommet: [2, 3], bas: 1, haut: 10,
    valeur: (c) => `Combien de baleines ont été vues en ${c.gn} ?`,
    qMax: "Quel mois a compté le plus de baleines ?", qMin: "Quel mois a compté le moins de baleines ?",
  },
  {
    intro: "Une boulangère du Tampon note les baguettes vendues chaque jour.",
    titre: "Baguettes vendues", unite: "baguettes",
    points: JOURS, A: 20, forme: "libre", bas: 2, haut: 10,
    valeur: (c) => `Combien de baguettes ont été vendues ${c.gn} ?`,
    qMax: "Quel jour a-t-on vendu le plus de baguettes ?", qMin: "Quel jour a-t-on vendu le moins de baguettes ?",
  },
];

type GTirageCourbe = { c: GCourbe; vals: number[] };

/** Six valeurs DISTINCTES (un seul point le plus haut, un seul le plus bas), selon la forme. */
function gTirerCourbe(c: GCourbe = randomChoice(G_COURBES)): GTirageCourbe {
  const n = c.points.length;
  for (let essai = 0; essai < 200; essai++) {
    let k: number[] = [];
    if (c.forme === "libre") {
      k = Array.from({ length: n }, () => randomInt(c.bas, c.haut));
    } else if (c.forme === "monte") {
      k = [randomInt(c.bas, c.bas + 2)];
      for (let i = 1; i < n; i++) k.push(k[i - 1] + randomChoice([1, 1, 2]));
    } else {
      const p = randomChoice(c.sommet ?? [2]);
      k = new Array(n).fill(0);
      k[p] = randomInt(Math.max(c.bas + 2, c.haut - 2), c.haut);
      for (let i = p - 1; i >= 0; i--) k[i] = k[i + 1] - randomChoice([1, 1, 2]);
      for (let i = p + 1; i < n; i++) k[i] = k[i - 1] - randomChoice([1, 2]);
    }
    if (k.some((x) => x < c.bas || x > c.haut)) continue;
    if (new Set(k).size !== n) continue;
    return { c, vals: k.map((x) => x * c.A) };
  }
  // Repli sûr : une montée régulière d'un pas.
  return { c, vals: c.points.map((_, i) => (c.bas + i) * c.A) };
}

/** Le point i passe au milieu de deux graduations (pas pair seulement). */
function gCourbeMilieu(t: GTirageCourbe, i: number): boolean {
  const h = t.c.A / 2;
  if (t.c.A % 2 !== 0) return false;
  const sens = randomChoice([-1, 1]);
  for (const s of [sens, -sens]) {
    const v = t.vals[i] + s * h;
    if (v > t.c.A && v < t.c.haut * t.c.A) { t.vals[i] = v; return true; }
  }
  return false;
}

function gCourbeCanvas(t: GTirageCourbe, hi?: number): StatGraphCanvasData {
  return statGraphCanvas({
    graphType: "courbe",
    title: t.c.titre,
    data: t.c.points.map((p, i) => ({ label: p.label, value: t.vals[i] })),
    display: { showLabels: true, showValues: false, showAxis: true, step: t.c.A, axeY: t.c.unite, highlightIndex: hi },
  });
}

/** Comment on lit un point : de lui, on suit la ligne vers la gauche jusqu'à l'axe. */
function gCourbeLire(t: GTirageCourbe, i: number): string {
  const v = t.vals[i], A = t.c.A;
  const debut = `Je pars du point ${gGuil(t.c.points[i])}, je suis la ligne vers la gauche jusqu’à l’axe`;
  if (v % A === 0) return `${debut}, je lis ${v}.`;
  return `${debut}. Le point est au milieu, entre ${v - A / 2} et ${v + A / 2} : je lis ${v}.`;
}

/** Leurres de lecture d'un point : les graduations voisines, le pas. */
function gCourbeLeurres(t: GTirageCourbe, i: number): number[] {
  const v = t.vals[i], A = t.c.A;
  const voisins = (v % A === 0 ? [v - A, v + A] : [v - A / 2, v + A / 2]).filter((x) => x > 0);
  const autres = [A, ...t.vals.filter((_, k) => k !== i)].filter((x) => x > 0 && x !== v && !voisins.includes(x));
  return Array.from(new Set([...voisins, ...shuffle(autres)])).slice(0, 3);
}

// ─── GRAPHIQUE_LIRE ─────────────────────────────────────────────────────────
const G_LIRE: TutorBankItemV4[] = [
  gGab("cm2_graphique_lire_gen_1_valeur", "graphique_lire", 1,
    "Trouve l’étiquette sous le graphique, puis lis le nombre en haut.",
    ["lire", "valeur"],
    () => {
      const type = randomChoice(["barres", "batons"] as const);
      const obj = gObj(type);
      // ⭐ 20/10/2026 — deux fois sur trois, l'axe gradué : on LIT, on ne recopie pas.
      if (Math.random() < 0.67) {
        const t = gTirerAxe(4);
        const i = randomInt(0, 3);
        const c = t.cats[i];
        const v = t.vals[i];
        const q = randomChoice([
          t.s.combien(c),
          `Suis le haut ${obj === "le bâton" ? "du bâton" : "de la barre"} ${gGuil(c)} jusqu’à l’axe. Quel nombre lis-tu ?`,
          `Lis sur l’axe gradué la valeur de ${gGuil(c)}.`,
          `Que vaut ${obj} ${gGuil(c)} ? Aide-toi de l’axe.`,
        ]);
        return {
          text: `${t.s.intro} ${q}`,
          format: "qcm",
          choices: gNum(v, gLeurresAxe(t, i), t.A),
          expected: [String(v)],
          comparator: "mcq_exact",
          explanation: `${gCommentLire(t, i, obj)} L’axe compte de ${t.A} en ${t.A}. Réponse : ${v} ${t.s.unite}.`,
          canvas: gCanvas(t, { type, hi: i, axe: t.A }),
        };
      }
      const t = gTirer(4);
      const i = randomInt(0, 3);
      const c = t.cats[i];
      const v = t.vals[i];
      const q = randomChoice([
        t.s.combien(c),
        `Que vaut ${obj} ${gGuil(c)} ?`,
        `Lis le graphique : quel nombre correspond à ${gGuil(c)} ?`,
        `Quel nombre est écrit en haut ${obj === "le bâton" ? "du bâton" : "de la barre"} ${gGuil(c)} ?`,
      ]);
      return {
        text: `${t.s.intro} ${q}`,
        format: "qcm",
        choices: gNum(v, [...t.vals.filter((_, k) => k !== i), v + t.s.pas], t.s.pas),
        expected: [String(v)],
        comparator: "mcq_exact",
        explanation: `On cherche l’étiquette ${gGuil(c)} sous le graphique, puis on lit le nombre en haut ${obj === "le bâton" ? "du bâton" : "de la barre"} : ${v}. Réponse : ${v} ${t.s.unite}.`,
        canvas: gCanvas(t, { type, hi: i }),
      };
    }),

  gGab("cm2_graphique_lire_gen_2_etiquette", "graphique_lire", 1,
    "Cherche le nombre demandé en haut des barres, puis lis l’étiquette dessous.",
    ["lire", "etiquette"],
    () => {
      if (Math.random() < 0.67) {
        const t = gTirerAxe(4);
        const i = randomInt(0, 3);
        const c = t.cats[i];
        const v = t.vals[i];
        const q = randomChoice([
          `Quelle barre monte jusqu’à ${v} ?`,
          `Sur l’axe, trouve la graduation ${v}. Quelle barre s’arrête à cette hauteur ?`,
          `Quelle étiquette correspond à ${v} ${t.s.unite} ?`,
          `Le graphique indique ${v} ${t.s.unite}. Pour quelle étiquette ?`,
        ]);
        return {
          text: `${t.s.intro} ${q}`,
          format: "qcm",
          choices: shuffle(t.cats.map((x) => x.label)),
          expected: [c.label],
          comparator: "mcq_exact",
          explanation: `Je trouve ${v} sur l’axe, puis je suis la ligne vers la droite : elle touche le haut de ${gGuil(c)}. Réponse : ${gGuil(c)}.`,
          canvas: gCanvas(t, { type: "barres", axe: t.A }),
        };
      }
      const t = gTirer(4);
      const i = randomInt(0, 3);
      const c = t.cats[i];
      const v = t.vals[i];
      const q = randomChoice([
        `Quelle étiquette correspond à ${v} ${t.s.unite} ?`,
        `Sur le graphique, quelle étiquette porte le nombre ${v} ?`,
        `Le graphique indique ${v} ${t.s.unite}. Pour quelle étiquette ?`,
        `Quelle catégorie a la valeur ${v} ?`,
      ]);
      return {
        text: `${t.s.intro} ${q}`,
        format: "qcm",
        choices: shuffle(t.cats.map((x) => x.label)),
        expected: [c.label],
        comparator: "mcq_exact",
        explanation: `On cherche le nombre ${v} en haut des barres : il est sur ${gGuil(c)}. Les valeurs sont : ${gListe(t)}.`,
        canvas: gCanvas(t),
      };
    }),

  gGab("cm2_graphique_lire_gen_3_deux_valeurs", "graphique_lire", 2,
    "Lis les deux valeurs une par une, sans les inverser.",
    ["lire", "deux_valeurs"],
    () => {
      const axe = Math.random() < 0.67;
      const ta = gTirerAxe(randomChoice([4, 5]));
      const t: GTirage = axe ? ta : gTirer(randomChoice([4, 5]));
      const [i, j] = shuffle(t.cats.map((_, k) => k)).slice(0, 2);
      const a = t.cats[i], b = t.cats[j];
      if (axe) {
        // Une graduation d'écart : le leurre typique de la lecture sur l'axe.
        const ok = `${a.label} : ${t.vals[i]} et ${b.label} : ${t.vals[j]}`;
        const wrongs = [
          `${a.label} : ${t.vals[j]} et ${b.label} : ${t.vals[i]}`,
          `${a.label} : ${t.vals[i] + ta.A} et ${b.label} : ${t.vals[j]}`,
          `${a.label} : ${t.vals[i]} et ${b.label} : ${t.vals[j] - ta.A}`,
          `${a.label} : ${t.vals[i] - ta.A} et ${b.label} : ${t.vals[j] + ta.A}`,
        ];
        return {
          text: `${t.s.intro} ${randomChoice([
            `Lis sur l’axe les valeurs de ${gGuil(a)} et de ${gGuil(b)}.`,
            `Quelle lecture de l’axe est juste pour ${gGuil(a)} et ${gGuil(b)} ?`,
            `Suis le haut de ${gGuil(a)}, puis de ${gGuil(b)}, jusqu’à l’axe. Que lis-tu ?`,
          ])}`,
          format: "qcm",
          choices: makeChoices(ok, wrongs),
          expected: [ok],
          comparator: "mcq_exact",
          explanation: `${gCommentLire(ta, i)} ${gCommentLire(ta, j)} L’axe compte de ${ta.A} en ${ta.A} : une graduation de trop, et la lecture est fausse.`,
          canvas: gCanvas(t, { type: "barres", axe: ta.A }),
        };
      }
      const ok = `${a.label} : ${t.vals[i]} et ${b.label} : ${t.vals[j]}`;
      const autre = t.vals.find((_, k) => k !== i && k !== j) ?? t.vals[i] + t.s.pas;
      const wrongs = [
        `${a.label} : ${t.vals[j]} et ${b.label} : ${t.vals[i]}`,
        `${a.label} : ${t.vals[i]} et ${b.label} : ${autre}`,
        `${a.label} : ${autre} et ${b.label} : ${t.vals[j]}`,
        `${a.label} : ${t.vals[i] + t.s.pas} et ${b.label} : ${t.vals[j]}`,
      ];
      const q = randomChoice([
        `Quelles sont les valeurs de ${gGuil(a)} et de ${gGuil(b)} ?`,
        `Lis le graphique pour ${gGuil(a)} puis pour ${gGuil(b)}.`,
        `Quelle lecture du graphique est juste pour ${gGuil(a)} et ${gGuil(b)} ?`,
      ]);
      return {
        text: `${t.s.intro} ${q}`,
        format: "qcm",
        choices: makeChoices(ok, wrongs),
        expected: [ok],
        comparator: "mcq_exact",
        explanation: `On lit ${gGuil(a)} : ${t.vals[i]} ${t.s.unite}. Puis ${gGuil(b)} : ${t.vals[j]} ${t.s.unite}. Attention à ne pas inverser les deux.`,
        canvas: gCanvas(t),
      };
    }),

  gGab("cm2_graphique_lire_gen_4_cinq_barres", "graphique_lire", 2,
    "Avec cinq barres, suis bien l’étiquette demandée jusqu’en haut.",
    ["lire", "valeur"],
    () => {
      if (Math.random() < 0.67) {
        const t = gTirerAxe(5);
        const i = randomInt(0, t.cats.length - 1);
        // Une fois sur deux, la barre s'arrête entre deux graduations.
        const milieu = Math.random() < 0.5 && gMettreAuMilieu(t, i);
        const c = t.cats[i];
        const v = t.vals[i];
        const q = randomChoice([
          t.s.combien(c),
          `Lis sur l’axe la valeur de ${gGuil(c)}.`,
          `Jusqu’à quel nombre monte la barre ${gGuil(c)} ?`,
        ]);
        return {
          text: `${t.s.intro} ${q}${milieu ? " Regarde bien où s’arrête la barre." : ""}`,
          format: "qcm",
          choices: gNum(v, gLeurresAxe(t, i), t.A),
          expected: [String(v)],
          comparator: "mcq_exact",
          explanation: `${gCommentLire(t, i)} Réponse : ${v} ${t.s.unite}.`,
          canvas: gCanvas(t, { type: "barres", axe: t.A }),
        };
      }
      const t = gTirer(5);
      const i = randomInt(0, t.cats.length - 1);
      const c = t.cats[i];
      const v = t.vals[i];
      const q = randomChoice([
        t.s.combien(c),
        `Combien indique le graphique pour ${gGuil(c)} ?`,
        `Quelle est la valeur de ${gGuil(c)} sur le graphique ?`,
      ]);
      const voisins = [t.vals[i - 1], t.vals[i + 1]].filter((x) => x !== undefined) as number[];
      return {
        text: `${t.s.intro} ${q}`,
        format: "qcm",
        choices: gNum(v, [...voisins, ...t.vals.filter((_, k) => k !== i)], t.s.pas),
        expected: [String(v)],
        comparator: "mcq_exact",
        explanation: `L’étiquette ${gGuil(c)} indique ${v}. Réponse : ${v} ${t.s.unite}. Les barres voisines (${voisins.join(" et ")}) sont un piège.`,
        canvas: gCanvas(t),
      };
    }),

  gGab("cm2_graphique_lire_gen_5_camembert", "graphique_lire", 3,
    "Dans un diagramme circulaire, chaque part porte son nombre ; le total est écrit dessous.",
    ["lire", "camembert"],
    () => {
      const t = gTirer(4);
      const i = randomInt(0, 3);
      const c = t.cats[i];
      const v = t.vals[i];
      const total = gSomme(t.vals);
      const mode = randomInt(0, 2);
      if (mode === 0) {
        return {
          text: `${t.s.intro} Dans le diagramme circulaire, quel est le total écrit sous le diagramme ?`,
          format: "qcm",
          choices: gNum(total, [Math.max(...t.vals), total - v, total + t.s.pas], t.s.pas),
          expected: [String(total)],
          comparator: "mcq_exact",
          explanation: `Le total est écrit sous le diagramme : ${total}. On peut vérifier : ${t.vals.join(" + ")} = ${total} ${t.s.unite}.`,
          canvas: gCanvas(t, { type: "camembert" }),
        };
      }
      if (mode === 1) {
        return {
          text: `${t.s.intro} Dans le diagramme circulaire : ${t.s.combien(c).charAt(0).toLowerCase()}${t.s.combien(c).slice(1)}`,
          format: "qcm",
          choices: gNum(v, [...t.vals.filter((_, k) => k !== i), total], t.s.pas),
          expected: [String(v)],
          comparator: "mcq_exact",
          explanation: `La part ${gGuil(c)} porte le nombre ${v}. Le total (${total}) n’est pas la réponse : il compte toutes les parts. Réponse : ${v} ${t.s.unite}.`,
          canvas: gCanvas(t, { type: "camembert", hi: i }),
        };
      }
      return {
        text: `${t.s.intro} Dans le diagramme circulaire, quelle part vaut ${v} ?`,
        format: "qcm",
        choices: shuffle(t.cats.map((x) => x.label)),
        expected: [c.label],
        comparator: "mcq_exact",
        explanation: `On cherche la part qui porte ${v} : c’est ${gGuil(c)}. Les parts sont : ${gListe(t)}.`,
        canvas: gCanvas(t, { type: "camembert" }),
      };
    }),

  gGab("cm2_graphique_lire_gen_6_vrai_faux", "graphique_lire", 3,
    "Vérifie sur le graphique : lis toi-même la bonne barre.",
    ["lire", "erreur", "vrai_faux"],
    () => {
      if (Math.random() < 0.67) {
        const t = gTirerAxe(randomChoice([4, 5]));
        const i = randomInt(0, t.cats.length - 1);
        const milieu = Math.random() < 0.5 && gMettreAuMilieu(t, i);
        const c = t.cats[i];
        const v = t.vals[i];
        const p = randomChoice(G_PRENOMS);
        const pas = milieu ? t.A / 2 : t.A;
        const mode = randomInt(0, 3);
        // 0 : juste ; 1 : la graduation voisine ; 2 : celle d'en dessous ; 3 : le pas.
        const dit = mode === 0 ? v : mode === 1 ? v + pas : mode === 2 ? v - pas : t.A;
        const juste = dit === v;
        const q = randomChoice([
          `${p.n} lit l’axe et dit : « ${c.label} vaut ${dit}. » A-t-${p.f ? "elle" : "il"} raison ?`,
          `${p.n} suit le haut de la barre ${gGuil(c)} jusqu’à l’axe et lit ${dit}. A-t-${p.f ? "elle" : "il"} raison ?`,
        ]);
        return {
          text: `${t.s.intro} ${q}`,
          format: "qcm",
          choices: ["oui", "non"],
          expected: [juste ? "oui" : "non"],
          comparator: "mcq_exact",
          explanation: juste
            ? `Oui. ${gCommentLire(t, i)}`
            : `Non. ${gCommentLire(t, i)}${dit === t.A && mode === 3 ? ` ${dit}, c’est le pas de l’axe, pas la valeur de la barre.` : ` ${dit} est une graduation voisine.`}`,
          canvas: gCanvas(t, { type: "barres", axe: t.A }),
        };
      }
      const t = gTirer(randomChoice([4, 5]));
      const i = randomInt(0, t.cats.length - 1);
      const c = t.cats[i];
      const v = t.vals[i];
      const p = randomChoice(G_PRENOMS);
      const voisin = t.vals[i + 1] ?? t.vals[i - 1];
      const mode = randomInt(0, 2);
      const dit = mode === 0 ? v : mode === 1 ? voisin : v + randomChoice([t.s.pas, -t.s.pas, 2 * t.s.pas]);
      const juste = dit === v;
      const q = randomChoice([
        `${p.n} dit : « ${c.label} vaut ${dit}. » A-t-${p.f ? "elle" : "il"} raison ?`,
        `${p.n} lit ${dit} ${t.s.unite} pour ${gGuil(c)}. Sa lecture est-elle juste ?`,
      ]);
      const oui = q.includes("raison") ? "oui" : "oui, elle est juste";
      const non = q.includes("raison") ? "non" : "non, elle est fausse";
      return {
        text: `${t.s.intro} ${q}`,
        format: "qcm",
        choices: [oui, non],
        expected: [juste ? oui : non],
        comparator: "mcq_exact",
        explanation: juste
          ? `Oui. Sur le graphique, ${gGuil(c)} vaut bien ${v}.`
          : `Non. Sur le graphique, ${gGuil(c)} vaut ${v}, pas ${dit}.${dit === voisin ? " Ce nombre est celui de la barre voisine." : ""}`,
        canvas: gCanvas(t),
      };
    }),

  // ⭐ 21/10/2026 — LIRE UNE COURBE : un point, une valeur, sur l'axe gradué.
  gGab("cm2_graphique_lire_gen_7_courbe", "graphique_lire", 3,
    "Pars du point, suis la ligne vers la gauche jusqu’à l’axe, puis lis le nombre.",
    ["lire", "courbe", "axe_gradue"],
    () => {
      const t = gTirerCourbe();
      const n = t.c.points.length;
      const i = randomInt(0, n - 1);
      const p = t.c.points[i];
      if (Math.random() < 0.65) {
        // Une fois sur trois, le point tombe au milieu de deux graduations.
        const milieu = Math.random() < 0.35 && gCourbeMilieu(t, i);
        const v = t.vals[i];
        const q = randomChoice([
          t.c.valeur(p),
          `Lis sur la courbe la valeur du point ${gGuil(p)}.`,
          `Le point ${gGuil(p)} est en orange. Quelle valeur lis-tu sur l’axe ?`,
        ]);
        return {
          text: `${t.c.intro} ${q}${milieu ? " Regarde bien où se trouve le point." : ""}`,
          format: "qcm",
          choices: gNum(v, gCourbeLeurres(t, i), t.c.A),
          expected: [String(v)],
          comparator: "mcq_exact",
          explanation: `${gCourbeLire(t, i)} L’axe compte de ${t.c.A} en ${t.c.A}. Réponse : ${v} ${t.c.unite}.`,
          canvas: gCourbeCanvas(t, i),
        };
      }
      // Le chemin inverse : une valeur sur l'axe, on cherche le moment.
      const v = t.vals[i];
      const autres = shuffle(t.c.points.filter((_, k) => k !== i)).slice(0, 3).map((x) => x.label);
      return {
        text: `${t.c.intro} ${randomChoice([
          `Sur l’axe, trouve ${v}. À quel moment la courbe passe-t-elle par ${v} ?`,
          `Quel point de la courbe est à la hauteur de ${v} ${t.c.unite} ?`,
        ])}`,
        format: "qcm",
        choices: shuffle([p.label, ...autres]),
        expected: [p.label],
        comparator: "mcq_exact",
        explanation: `Je trouve ${v} sur l’axe, je suis la ligne vers la droite : elle touche le point ${gGuil(p)}. Réponse : ${gGuil(p)}.`,
        canvas: gCourbeCanvas(t),
      };
    }),
];

// ─── GRAPHIQUE_COMPLETER ────────────────────────────────────────────────────
const G_COMPLETER: TutorBankItemV4[] = [
  gGab("cm2_graphique_completer_gen_1_hauteur", "graphique_completer", 1,
    "Cherche dans le relevé le nombre de la barre qui manque.",
    ["completer", "barre_manquante"],
    () => {
      const t = gTirer(4);
      const m = randomInt(0, 3);
      const c = t.cats[m];
      const v = t.vals[m];
      const q = randomChoice([
        `La barre ${gGuil(c)} n’est pas encore tracée. Quelle hauteur doit-elle avoir ?`,
        `Il manque ${gGuil(c)} sur le graphique. Quel nombre faut-il écrire en haut de sa barre ?`,
        `Pour finir le graphique, jusqu’à quelle valeur faut-il monter la barre ${gGuil(c)} ?`,
      ]);
      return {
        text: `${t.s.intro} Le relevé donne : ${gListe(t)}. ${q}`,
        format: "qcm",
        choices: gNum(v, [...t.vals.filter((_, k) => k !== m), v + t.s.pas], t.s.pas),
        expected: [String(v)],
        comparator: "mcq_exact",
        explanation: `Dans le relevé, ${gGuil(c)} vaut ${v}. La barre ${gGuil(c)} doit donc monter jusqu’à ${v}.`,
        canvas: gCanvas(t, { type: "barres", sans: m }),
      };
    }),

  gGab("cm2_graphique_completer_gen_2_etiquette", "graphique_completer", 1,
    "Compare le relevé et le graphique : quelle donnée n’est pas encore dessinée ?",
    ["completer", "etiquette"],
    () => {
      const t = gTirer(4);
      const m = randomInt(0, 3);
      const c = t.cats[m];
      const v = t.vals[m];
      const q = randomChoice([
        `On ajoute une barre de hauteur ${v}. Quelle étiquette faut-il écrire dessous ?`,
        `Une nouvelle barre monte jusqu’à ${v}. Quel nom porte-t-elle ?`,
        `Quelle étiquette manque-t-il sur le graphique ?`,
      ]);
      return {
        text: `${t.s.intro} Le relevé donne : ${gListe(t)}. ${q}`,
        format: "qcm",
        choices: shuffle(t.cats.map((x) => x.label)),
        expected: [c.label],
        comparator: "mcq_exact",
        explanation: `Le graphique montre déjà ${t.cats.filter((_, k) => k !== m).map(gGuil).join(", ")}. Il manque ${gGuil(c)}, qui vaut ${v} dans le relevé.`,
        canvas: gCanvas(t, { type: "barres", sans: m }),
      };
    }),

  gGab("cm2_graphique_completer_gen_3_de_plus_de_moins", "graphique_completer", 2,
    "« De plus » : on ajoute. « De moins » : on enlève.",
    ["completer", "relation", "barre_manquante"],
    () => {
      // Deux fois sur trois, la barre de référence se LIT sur l'axe gradué.
      const ta = Math.random() < 0.67 ? gTirerAxe(4) : null;
      const t: GTirage = ta ?? gTirer(4);
      const [m, r] = shuffle([0, 1, 2, 3]).slice(0, 2);
      const c = t.cats[m], cr = t.cats[r];
      const v = t.vals[m], vr = t.vals[r];
      const d = Math.abs(v - vr);
      const lu = ta ? `${gCommentLire(ta, r)} ` : "";
      const plus = v > vr;
      const rel = plus ? `${d} ${t.s.unite} de plus que` : `${d} ${t.s.unite} de moins que`;
      const q = randomChoice([
        `La barre ${gGuil(c)} manque. On sait que ${gGuil(c)} a ${rel} ${gGuil(cr)}. Quelle hauteur faut-il tracer ?`,
        `Il faut ajouter la barre ${gGuil(c)} : ${gGuil(c)} a ${rel} ${gGuil(cr)}. Quel nombre écrire en haut de cette barre ?`,
      ]);
      const faux = plus ? vr - d : vr + d;
      return {
        text: `${t.s.intro} ${q}`,
        format: "qcm",
        choices: gNum(v, [faux, vr, d, v + t.s.pas], t.s.pas),
        expected: [String(v)],
        comparator: "mcq_exact",
        explanation: `${lu}${gGuil(cr)} vaut ${vr} sur le graphique. ${plus ? `On ajoute : ${vr} + ${d} = ${v}` : `On enlève : ${vr} - ${d} = ${v}`}. La barre ${gGuil(c)} monte jusqu’à ${v}.`,
        canvas: gCanvas(t, { type: "barres", sans: m, axe: ta?.A }),
      };
    }),

  gGab("cm2_graphique_completer_gen_4_tableau", "graphique_completer", 2,
    "Lis la barre sur le graphique et recopie son nombre dans le tableau.",
    ["completer", "tableau"],
    () => {
      if (Math.random() < 0.67) {
        const t = gTirerAxe(5);
        const i = randomInt(0, t.cats.length - 1);
        const milieu = Math.random() < 0.4 && gMettreAuMilieu(t, i);
        const c = t.cats[i];
        const v = t.vals[i];
        const q = randomChoice([
          `On remplit un tableau à partir du graphique. Quel nombre écrire dans la case ${gGuil(c)} ?`,
          `Le tableau a une case vide : ${gGuil(c)}. Lis l’axe : quel nombre faut-il y écrire ?`,
          `Pour compléter le tableau, lis sur l’axe la valeur de ${gGuil(c)}.`,
        ]);
        return {
          text: `${t.s.intro} ${q}${milieu ? " Attention : la barre s’arrête entre deux graduations." : ""}`,
          format: "qcm",
          choices: gNum(v, gLeurresAxe(t, i), t.A),
          expected: [String(v)],
          comparator: "mcq_exact",
          explanation: `${gCommentLire(t, i)} On écrit ${v} dans la case ${gGuil(c)}.`,
          canvas: gCanvas(t, { type: "barres", axe: t.A }),
        };
      }
      const t = gTirer(5);
      const i = randomInt(0, t.cats.length - 1);
      const c = t.cats[i];
      const v = t.vals[i];
      const q = randomChoice([
        `On remplit un tableau à partir du graphique. Quel nombre écrire dans la case ${gGuil(c)} ?`,
        `Le tableau a une case vide : ${gGuil(c)}. Quel nombre faut-il y recopier ?`,
        `Pour compléter le tableau, que vaut ${gGuil(c)} ?`,
      ]);
      return {
        text: `${t.s.intro} ${q}`,
        format: "qcm",
        choices: gNum(v, t.vals.filter((_, k) => k !== i), t.s.pas),
        expected: [String(v)],
        comparator: "mcq_exact",
        explanation: `Sur le graphique, ${gGuil(c)} vaut ${v}. On écrit ${v} dans la case ${gGuil(c)}.`,
        canvas: gCanvas(t),
      };
    }),

  gGab("cm2_graphique_completer_gen_5_total", "graphique_completer", 3,
    "Additionne TOUTES les barres, sans en oublier une.",
    ["completer", "total"],
    () => {
      const t = gTirer(randomChoice([4, 5]));
      const total = gSomme(t.vals);
      const oubli = total - t.vals[randomInt(0, t.vals.length - 1)];
      const q = randomChoice([
        "Quel total faut-il écrire sous le graphique ?",
        `Il faut écrire le nombre total de ${t.s.unite} sous le graphique. Lequel ?`,
        `Pour compléter la légende « Total : … », quel nombre écrire ?`,
      ]);
      return {
        text: `${t.s.intro} ${q}`,
        format: "qcm",
        choices: gNum(total, [oubli, total + t.s.pas, total - t.s.pas, Math.max(...t.vals) * t.vals.length], t.s.pas),
        expected: [String(total)],
        comparator: "mcq_exact",
        explanation: `On additionne toutes les barres : ${t.vals.join(" + ")} = ${total}. Le total est ${total} ${t.s.unite}.`,
        canvas: gCanvas(t),
      };
    }),

  gGab("cm2_graphique_completer_gen_6_double_moitie", "graphique_completer", 3,
    "Le double : on multiplie par 2. La moitié : on divise par 2.",
    ["completer", "double", "moitie", "barre_manquante"],
    () => {
      let t = gTirer(4);
      let m = 0, r = 1, double = true;
      for (let essai = 0; essai < 40; essai++) {
        t = gTirer(4);
        [m, r] = shuffle([0, 1, 2, 3]).slice(0, 2);
        double = Math.random() < 0.5;
        const vr = t.vals[r];
        const v = double ? 2 * vr : vr / 2;
        if (!Number.isInteger(v) || v <= 0 || v % t.s.pas !== 0) continue;
        if (t.vals.some((x, k) => k !== m && x === v)) continue;
        t.vals[m] = v;
        break;
      }
      if (t.vals[m] !== (double ? 2 * t.vals[r] : t.vals[r] / 2)) {
        double = true;
        t.vals[m] = 2 * t.vals[r];
      }
      const c = t.cats[m], cr = t.cats[r];
      const v = t.vals[m], vr = t.vals[r];
      const rel = double ? "le double de" : "la moitié de";
      const q = randomChoice([
        `La barre ${gGuil(c)} manque. ${gGuil(c)} vaut ${rel} ${gGuil(cr)}. Quelle hauteur faut-il tracer ?`,
        `On sait que ${gGuil(c)} représente ${rel} ${gGuil(cr)}. Quel nombre écrire en haut de la barre ${gGuil(c)} ?`,
      ]);
      return {
        text: `${t.s.intro} ${q}`,
        format: "qcm",
        choices: gNum(v, double ? [vr + 2, vr, vr / 2] : [vr * 2, vr, vr - 2], t.s.pas),
        expected: [String(v)],
        comparator: "mcq_exact",
        explanation: double
          ? `${gGuil(cr)} vaut ${vr}. Le double, c’est ${vr} × 2 = ${v}. La barre ${gGuil(c)} monte jusqu’à ${v}.`
          : `${gGuil(cr)} vaut ${vr}. La moitié, c’est ${vr} ÷ 2 = ${v}. La barre ${gGuil(c)} monte jusqu’à ${v}.`,
        canvas: gCanvas(t, { type: "barres", sans: m }),
      };
    }),

  gGab("cm2_graphique_completer_gen_7_manquante_total", "graphique_completer", 4,
    "Additionne les barres tracées, puis retire ce nombre du total.",
    ["completer", "valeur_manquante", "total"],
    () => {
      const t = gTirer(randomChoice([4, 5]));
      const m = randomInt(0, t.cats.length - 1);
      const c = t.cats[m];
      const v = t.vals[m];
      const total = gSomme(t.vals);
      const connus = total - v;
      const q = randomChoice([
        `En tout, il y a ${total} ${t.s.unite}. La barre ${gGuil(c)} a été effacée. Quelle hauteur avait-elle ?`,
        `Le total est ${total} ${t.s.unite}, mais il manque la barre ${gGuil(c)}. Quel nombre faut-il écrire en haut ?`,
        `Il manque ${gGuil(c)} sur le graphique. On sait qu’il y a ${total} ${t.s.unite} au total. Combien pour ${gGuil(c)} ?`,
      ]);
      return {
        text: `${t.s.intro} ${q}`,
        format: "qcm",
        choices: gNum(v, [connus, total, v + t.s.pas, v - t.s.pas], t.s.pas),
        expected: [String(v)],
        comparator: "mcq_exact",
        explanation: `Les barres tracées font ${t.vals.filter((_, k) => k !== m).join(" + ")} = ${connus}. Il manque ${total} - ${connus} = ${v}. La barre ${gGuil(c)} monte jusqu’à ${v}.`,
        canvas: gCanvas(t, { type: "barres", sans: m }),
      };
    }),

  gGab("cm2_graphique_completer_gen_8_ensemble", "graphique_completer", 4,
    "Ensemble, c’est une addition : on retire la barre connue.",
    ["completer", "valeur_manquante", "regrouper"],
    () => {
      const ta = Math.random() < 0.67 ? gTirerAxe(4) : null;
      const t: GTirage = ta ?? gTirer(4);
      const [m, r] = shuffle([0, 1, 2, 3]).slice(0, 2);
      const c = t.cats[m], cr = t.cats[r];
      const v = t.vals[m], vr = t.vals[r];
      const n = v + vr;
      const lu = ta ? `${gCommentLire(ta, r)} ` : "";
      const q = randomChoice([
        `${gGuil(c)} et ${gGuil(cr)} ensemble font ${n} ${t.s.unite}. La barre ${gGuil(c)} manque. Quelle hauteur lui donner ?`,
        `À eux deux, ${gGuil(cr)} et ${gGuil(c)} comptent ${n} ${t.s.unite}. Quel nombre écrire en haut de la barre ${gGuil(c)} ?`,
      ]);
      return {
        text: `${t.s.intro} ${q}`,
        format: "qcm",
        choices: gNum(v, [n + vr, n, vr, v + t.s.pas], t.s.pas),
        expected: [String(v)],
        comparator: "mcq_exact",
        explanation: `${lu}Sur le graphique, ${gGuil(cr)} vaut ${vr}. Il reste ${n} - ${vr} = ${v} pour ${gGuil(c)}.`,
        canvas: gCanvas(t, { type: "barres", sans: m, axe: ta?.A }),
      };
    }),
];

// ─── GRAPHIQUE_INTERPRETER ──────────────────────────────────────────────────
const G_INTERPRETER: TutorBankItemV4[] = [
  gGab("cm2_graphique_interpreter_gen_1_max_min", "graphique_interpreter", 1,
    "Le plus : la barre la plus haute. Le moins : la plus basse.",
    ["interpreter", "maximum", "minimum"],
    () => {
      // ⭐ 21/10/2026 — une fois sur deux, l'axe gradué : on compare les HAUTEURS.
      const ta = Math.random() < 0.5 ? gTirerAxe(randomChoice([4, 5])) : null;
      const t: GTirage = ta ?? gTirer(randomChoice([4, 5]));
      const max = Math.random() < 0.5;
      const i = max ? gIdxMax(t.vals) : gIdxMin(t.vals);
      return {
        text: `${t.s.intro} ${max ? t.s.qMax : t.s.qMin}`,
        format: "qcm",
        choices: makeChoices(t.cats[i].label, t.cats.map((x) => x.label)),
        expected: [t.cats[i].label],
        comparator: "mcq_exact",
        explanation: ta
          ? `Je cherche la barre la plus ${max ? "haute" : "basse"} : c’est ${gGuil(t.cats[i])}. ${gCommentLire(ta, i)}`
          : `On compare : ${gListe(t)}. La ${max ? "plus grande" : "plus petite"} valeur est ${t.vals[i]}, pour ${gGuil(t.cats[i])}.`,
        canvas: ta ? gCanvas(t, { type: "barres", axe: ta.A }) : gCanvas(t),
      };
    }),

  gGab("cm2_graphique_interpreter_gen_2_qui_plus", "graphique_interpreter", 1,
    "Compare la hauteur des deux barres demandées.",
    ["interpreter", "comparer"],
    () => {
      // ⭐ 21/10/2026 — une fois sur deux, l'axe gradué (sans nombres sur les barres).
      const ta = Math.random() < 0.5 ? gTirerAxe(4) : null;
      const t: GTirage = ta ?? gTirer(4);
      const [i, j] = gPaire(t);
      const [a, b] = shuffle([i, j]);
      const plus = Math.random() < 0.5;
      const rep = plus ? i : j;
      const q = plus
        ? `Quelle barre est la plus haute : ${gGuil(t.cats[a])} ou ${gGuil(t.cats[b])} ?`
        : `Quelle barre est la plus basse : ${gGuil(t.cats[a])} ou ${gGuil(t.cats[b])} ?`;
      return {
        text: `${t.s.intro} ${q}`,
        format: "qcm",
        choices: [t.cats[a].label, t.cats[b].label],
        expected: [t.cats[rep].label],
        comparator: "mcq_exact",
        explanation: ta
          ? `${gCommentLire(ta, i)} ${gCommentLire(ta, j)} ${t.vals[i]} > ${t.vals[j]}, donc la réponse est ${gGuil(t.cats[rep])}.`
          : `${gGuil(t.cats[i])} vaut ${t.vals[i]} et ${gGuil(t.cats[j])} vaut ${t.vals[j]}. ${t.vals[i]} > ${t.vals[j]}, donc la réponse est ${gGuil(t.cats[rep])}.`,
        canvas: gCanvas(t, { type: "barres", axe: ta?.A }),
      };
    }),

  gGab("cm2_graphique_interpreter_gen_3_ecart", "graphique_interpreter", 2,
    "Pour un écart, on soustrait la petite valeur à la grande.",
    ["interpreter", "difference"],
    () => {
      // Une fois sur deux, les deux valeurs se LISENT d'abord sur l'axe.
      const ta = Math.random() < 0.5 ? gTirerAxe(4) : null;
      const t: GTirage = ta ?? gTirer(4);
      const [i, j] = gPaire(t);
      const d = t.vals[i] - t.vals[j];
      const u = t.s.unite;
      if (ta) {
        return {
          text: `${t.s.intro} ${randomChoice([
            `Lis sur l’axe ${gGuil(t.cats[i])} et ${gGuil(t.cats[j])}. Quel est l’écart entre les deux ?`,
            `Combien de ${u} de plus pour ${gGuil(t.cats[i])} que pour ${gGuil(t.cats[j])} ? Lis d’abord l’axe.`,
          ])}`,
          format: "qcm",
          choices: gNum(d, [t.vals[i] + t.vals[j], d + ta.A, d - ta.A, t.vals[i]], ta.A),
          expected: [String(d)],
          comparator: "mcq_exact",
          explanation: `${gCommentLire(ta, i)} ${gCommentLire(ta, j)} L’écart est ${t.vals[i]} - ${t.vals[j]} = ${d} ${u}.`,
          canvas: gCanvas(t, { type: "barres", axe: ta.A }),
        };
      }
      const q = randomChoice([
        `Combien de ${u} de plus pour ${gGuil(t.cats[i])} que pour ${gGuil(t.cats[j])} ?`,
        `Combien de ${u} de moins pour ${gGuil(t.cats[j])} que pour ${gGuil(t.cats[i])} ?`,
        `Quel est l’écart entre ${gGuil(t.cats[i])} et ${gGuil(t.cats[j])} ?`,
      ]);
      return {
        text: `${t.s.intro} ${q}`,
        format: "qcm",
        choices: gNum(d, [t.vals[i] + t.vals[j], d + t.s.pas, d - t.s.pas, t.vals[i]], t.s.pas),
        expected: [String(d)],
        comparator: "mcq_exact",
        explanation: `${gGuil(t.cats[i])} vaut ${t.vals[i]} et ${gGuil(t.cats[j])} vaut ${t.vals[j]}. L’écart est ${t.vals[i]} - ${t.vals[j]} = ${d} ${u}.`,
        canvas: gCanvas(t),
      };
    }),

  gGab("cm2_graphique_interpreter_gen_4_etendue", "graphique_interpreter", 2,
    "Trouve la plus grande et la plus petite valeur, puis soustrais.",
    ["interpreter", "ecart", "max_min"],
    () => {
      const t = gTirer(randomChoice([4, 5]));
      const hi = Math.max(...t.vals), lo = Math.min(...t.vals);
      const ihi = gIdxMax(t.vals), ilo = gIdxMin(t.vals);
      const d = hi - lo;
      const q = randomChoice([
        "Quel est l’écart entre la plus grande et la plus petite valeur ?",
        `Combien de ${t.s.unite} séparent la barre la plus haute de la plus basse ?`,
      ]);
      return {
        text: `${t.s.intro} ${q}`,
        format: "qcm",
        choices: gNum(d, [hi + lo, hi, t.cats.length, d + t.s.pas], t.s.pas),
        expected: [String(d)],
        comparator: "mcq_exact",
        explanation: `La plus haute est ${gGuil(t.cats[ihi])} (${hi}), la plus basse ${gGuil(t.cats[ilo])} (${lo}). L’écart est ${hi} - ${lo} = ${d} ${t.s.unite}.`,
        canvas: gCanvas(t),
      };
    }),

  gGab("cm2_graphique_interpreter_gen_5_total_regroupe", "graphique_interpreter", 3,
    "Additionne seulement les barres demandées.",
    ["interpreter", "total", "regrouper"],
    () => {
      const t = gTirer(randomChoice([4, 5]));
      const u = t.s.unite;
      if (Math.random() < 0.4) {
        const total = gSomme(t.vals);
        return {
          text: `${t.s.intro} ${randomChoice([`Combien de ${u} en tout sur le graphique ?`, `Quel est le nombre total de ${u} ?`])}`,
          format: "qcm",
          choices: gNum(total, [total - t.vals[0], total + t.s.pas, Math.max(...t.vals)], t.s.pas),
          expected: [String(total)],
          comparator: "mcq_exact",
          explanation: `On additionne toutes les barres : ${t.vals.join(" + ")} = ${total} ${u}.`,
          canvas: gCanvas(t),
        };
      }
      const [i, j] = shuffle(t.cats.map((_, k) => k)).slice(0, 2);
      const n = t.vals[i] + t.vals[j];
      const q = randomChoice([
        `Combien de ${u} pour ${gGuil(t.cats[i])} et ${gGuil(t.cats[j])} réunis ?`,
        `Si on regroupe ${gGuil(t.cats[i])} et ${gGuil(t.cats[j])}, combien de ${u} obtient-on ?`,
      ]);
      return {
        text: `${t.s.intro} ${q}`,
        format: "qcm",
        choices: gNum(n, [Math.abs(t.vals[i] - t.vals[j]), gSomme(t.vals), n + t.s.pas], t.s.pas),
        expected: [String(n)],
        comparator: "mcq_exact",
        explanation: `${gGuil(t.cats[i])} vaut ${t.vals[i]} et ${gGuil(t.cats[j])} vaut ${t.vals[j]}. Réunis : ${t.vals[i]} + ${t.vals[j]} = ${n} ${u}.`,
        canvas: gCanvas(t),
      };
    }),

  gGab("cm2_graphique_interpreter_gen_6_combien_depassent", "graphique_interpreter", 3,
    "Compare chaque barre au nombre donné, une par une.",
    ["interpreter", "seuil", "compter"],
    () => {
      const t = gTirer(5);
      const tri = [...t.vals].sort((a, b) => a - b);
      // Seuil strictement entre deux valeurs : aucune barre ne lui est égale.
      const k = randomInt(1, tri.length - 1);
      let seuil = Math.floor((tri[k - 1] + tri[k]) / 2);
      if (seuil <= tri[k - 1]) seuil = tri[k - 1] + 1;
      if (seuil >= tri[k]) seuil = tri[k - 1];
      const plus = Math.random() < 0.6;
      const n = plus ? t.vals.filter((x) => x > seuil).length : t.vals.filter((x) => x < seuil).length;
      const q = plus
        ? `Combien de barres dépassent ${seuil} ${t.s.unite} ?`
        : `Combien de barres sont en dessous de ${seuil} ${t.s.unite} ?`;
      const lesquelles = t.cats.filter((_, i) => (plus ? t.vals[i] > seuil : t.vals[i] < seuil)).map(gGuil);
      return {
        text: `${t.s.intro} ${q}`,
        format: "qcm",
        choices: gNum(n, [t.cats.length - n, n + 1, n - 1, t.cats.length]),
        expected: [String(n)],
        comparator: "mcq_exact",
        explanation: `Les valeurs sont : ${gListe(t)}. ${plus ? "Plus de" : "Moins de"} ${seuil} : ${lesquelles.join(", ") || "aucune"}. Cela fait ${n} barre${n > 1 ? "s" : ""}.`,
        canvas: gCanvas(t, { type: "barres" }),
      };
    }),

  gGab("cm2_graphique_interpreter_gen_7_fois_plus", "graphique_interpreter", 4,
    "« Combien de fois plus » : on cherche par combien multiplier la petite valeur.",
    ["interpreter", "fois_plus", "multiplication"],
    () => {
      // On fabrique la grande valeur comme un multiple EXACT de la petite.
      let t = gTirer(4);
      let i = 0, j = 1, k = 2;
      for (let essai = 0; essai < 60; essai++) {
        t = gTirer(4);
        [i, j] = shuffle([0, 1, 2, 3]).slice(0, 2);
        k = randomChoice([2, 3, 4]);
        const big = k * t.vals[j];
        if (big > t.s.max * 2 || t.vals.some((x, q) => q !== i && x === big)) continue;
        t.vals[i] = big;
        break;
      }
      if (t.vals[i] !== k * t.vals[j]) { k = 2; t.vals[i] = 2 * t.vals[j]; }
      const a = t.cats[i], b = t.cats[j];
      const q = randomChoice([
        `Combien de fois plus de ${t.s.unite} pour ${gGuil(a)} que pour ${gGuil(b)} ?`,
        `${gGuil(a)} vaut combien de fois ${gGuil(b)} ?`,
        `Par combien faut-il multiplier ${gGuil(b)} pour obtenir ${gGuil(a)} ?`,
      ]);
      const ecart = t.vals[i] - t.vals[j];
      return {
        text: `${t.s.intro} ${q}`,
        format: "qcm",
        choices: makeChoices(String(k), [String(k + 1), String(k - 1 || 5), String(ecart), String(k * 10)]),
        expected: [String(k)],
        comparator: "mcq_exact",
        explanation: `${gGuil(a)} vaut ${t.vals[i]} et ${gGuil(b)} vaut ${t.vals[j]}. ${t.vals[j]} × ${k} = ${t.vals[i]}, donc ${k} fois plus. (L’écart ${t.vals[i]} - ${t.vals[j]} = ${ecart} ne répond pas à « combien de fois ».)`,
        canvas: gCanvas(t),
      };
    }),

  gGab("cm2_graphique_interpreter_gen_8_affirmation", "graphique_interpreter", 4,
    "Vérifie l’affirmation avec les nombres du graphique.",
    ["interpreter", "erreur", "vrai_faux"],
    () => {
      const t = gTirer(4);
      const p = randomChoice(G_PRENOMS);
      const u = t.s.unite;
      const [i, j] = gPaire(t);
      const d = t.vals[i] - t.vals[j];
      const total = gSomme(t.vals);
      const imax = gIdxMax(t.vals);
      const second = t.vals.indexOf([...t.vals].sort((x, y) => y - x)[1]);
      const cas = randomChoice([
        { dit: `Il y a ${d} ${u} de plus pour ${gGuil(t.cats[i])} que pour ${gGuil(t.cats[j])}.`.replace(/[«»] ?| ?»/g, ""), vrai: true, pourquoi: `${t.vals[i]} - ${t.vals[j]} = ${d}.` },
        { dit: `Il y a ${d + t.s.pas} ${u} de plus pour ${gGuil(t.cats[i])} que pour ${gGuil(t.cats[j])}.`.replace(/[«»] ?| ?»/g, ""), vrai: false, pourquoi: `${t.vals[i]} - ${t.vals[j]} = ${d}, pas ${d + t.s.pas}.` },
        { dit: `Il y a ${total} ${u} en tout.`.replace(/[«»] ?| ?»/g, ""), vrai: true, pourquoi: `${t.vals.join(" + ")} = ${total}.` },
        { dit: `Il y a ${total - t.vals[j]} ${u} en tout.`.replace(/[«»] ?| ?»/g, ""), vrai: false, pourquoi: `${t.vals.join(" + ")} = ${total} : ${gGuil(t.cats[j])} a été oublié.` },
        { dit: `${gGuil(t.cats[imax])} a la plus grande valeur.`.replace(/[«»] ?| ?»/g, ""), vrai: true, pourquoi: `${gGuil(t.cats[imax])} vaut ${t.vals[imax]}, c’est le maximum.` },
        { dit: `${gGuil(t.cats[second])} a la plus grande valeur.`.replace(/[«»] ?| ?»/g, ""), vrai: false, pourquoi: `${gGuil(t.cats[second])} vaut ${t.vals[second]}, mais ${gGuil(t.cats[imax])} vaut ${t.vals[imax]}.` },
      ]);
      return {
        text: `${t.s.intro} ${p.n} affirme : « ${cas.dit} » A-t-${p.f ? "elle" : "il"} raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [cas.vrai ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: `${cas.vrai ? "Oui" : "Non"}. ${cas.pourquoi}`,
        canvas: gCanvas(t),
      };
    }),

  // ⭐ 21/10/2026 — INTERPRÉTER UNE COURBE : le plus haut, le plus bas, quand ça
  // monte, quand ça descend, de combien.
  gGab("cm2_graphique_interpreter_gen_9_courbe", "graphique_interpreter", 3,
    "La courbe monte : la valeur augmente. Elle descend : la valeur diminue.",
    ["interpreter", "courbe", "evolution", "axe_gradue"],
    () => {
      const t = gTirerCourbe();
      const P = t.c.points, V = t.vals, u = t.c.unite;
      const n = P.length;
      const mode = randomInt(0, 3);
      if (mode === 0) {
        const max = Math.random() < 0.5;
        const i = max ? gIdxMax(V) : gIdxMin(V);
        return {
          text: `${t.c.intro} ${max ? t.c.qMax : t.c.qMin}`,
          format: "qcm",
          choices: makeChoices(P[i].label, P.map((x) => x.label)),
          expected: [P[i].label],
          comparator: "mcq_exact",
          explanation: `Je cherche le point le plus ${max ? "haut" : "bas"} de la courbe : c’est ${gGuil(P[i])}. ${gCourbeLire(t, i)}`,
          canvas: gCourbeCanvas(t),
        };
      }
      if (mode === 1) {
        // Entre deux points qui se suivent : la courbe monte ou descend ?
        const i = randomInt(0, n - 2);
        const monte = V[i + 1] > V[i];
        const q = `Entre ${gGuil(P[i])} et ${gGuil(P[i + 1])}, que fait la courbe ?`;
        return {
          text: `${t.c.intro} ${q}`,
          format: "qcm",
          choices: ["elle monte", "elle descend"],
          expected: [monte ? "elle monte" : "elle descend"],
          comparator: "mcq_exact",
          explanation: `${gGuil(P[i])} : ${V[i]}. ${gGuil(P[i + 1])} : ${V[i + 1]}. ${V[i + 1]} ${monte ? ">" : "<"} ${V[i]} : la valeur ${monte ? "augmente, la courbe monte" : "diminue, la courbe descend"}.`,
          canvas: gCourbeCanvas(t),
        };
      }
      if (mode === 2) {
        // De combien entre deux points ?
        const [a, b] = shuffle(P.map((_, k) => k)).slice(0, 2).sort((x, y) => x - y);
        const d = Math.abs(V[b] - V[a]);
        const monte = V[b] > V[a];
        return {
          text: `${t.c.intro} De ${gGuil(P[a])} à ${gGuil(P[b])}, la courbe ${monte ? "monte" : "descend"}. De combien de ${u} ?`,
          format: "qcm",
          choices: gNum(d, [V[a] + V[b], d + t.c.A, d - t.c.A, V[b]], t.c.A),
          expected: [String(d)],
          comparator: "mcq_exact",
          explanation: `${gCourbeLire(t, a)} ${gCourbeLire(t, b)} ${monte ? `${V[b]} - ${V[a]}` : `${V[a]} - ${V[b]}`} = ${d} ${u}.`,
          canvas: gCourbeCanvas(t),
        };
      }
      // La plus forte hausse (ou baisse) entre deux points qui se suivent.
      const ecarts = P.slice(1).map((_, k) => V[k + 1] - V[k]);
      const hausse = ecarts.some((e) => e > 0) && (ecarts.every((e) => e > 0) || Math.random() < 0.5);
      const cible = hausse ? Math.max(...ecarts) : Math.min(...ecarts);
      if (ecarts.filter((e) => e === cible).length !== 1) {
        const i = gIdxMax(V);
        return {
          text: `${t.c.intro} ${t.c.qMax}`,
          format: "qcm",
          choices: makeChoices(P[i].label, P.map((x) => x.label)),
          expected: [P[i].label],
          comparator: "mcq_exact",
          explanation: `Je cherche le point le plus haut de la courbe : c’est ${gGuil(P[i])}. ${gCourbeLire(t, i)}`,
          canvas: gCourbeCanvas(t),
        };
      }
      const k = ecarts.indexOf(cible);
      const lib = (j: number) => `entre ${P[j].label} et ${P[j + 1].label}`;
      const ok = lib(k);
      return {
        text: `${t.c.intro} Entre deux points qui se suivent, quand la courbe ${hausse ? "monte-t" : "descend"}-elle le plus ?`,
        format: "qcm",
        choices: makeChoices(ok, P.slice(1).map((_, j) => lib(j))),
        expected: [ok],
        comparator: "mcq_exact",
        explanation: `Je compare les écarts d’un point au suivant : ${ecarts.map((e, j) => `${lib(j)} ${e > 0 ? "+" : ""}${e}`).join(" ; ")}. La plus forte ${hausse ? "hausse" : "baisse"} est ${ok} (${hausse ? "+" : ""}${cible} ${u}) : c’est là que la ligne est la plus raide.`,
        canvas: gCourbeCanvas(t),
      };
    }),
];

// ─── GRAPHIQUE_DEFI ─────────────────────────────────────────────────────────
const G_DEFI: TutorBankItemV4[] = [
  gGab("cm2_graphique_defi_gen_1_conclusion", "graphique_defi", 4,
    "Vérifie chaque phrase avec un calcul : une seule est vraie.",
    ["defi", "conclusion"],
    () => {
      const t = gTirer(4);
      const u = t.s.unite;
      const [i, j] = gPaire(t);
      const d = t.vals[i] - t.vals[j];
      const total = gSomme(t.vals);
      const imax = gIdxMax(t.vals), imin = gIdxMin(t.vals);
      const second = t.vals.indexOf([...t.vals].sort((x, y) => y - x)[1]);
      const vraies = [
        { s: `Il y a ${d} ${u} de plus pour ${t.cats[i].label} que pour ${t.cats[j].label}.`, e: `${t.vals[i]} - ${t.vals[j]} = ${d}` },
        { s: `Il y a ${total} ${u} en tout.`, e: `${t.vals.join(" + ")} = ${total}` },
        { s: `${t.cats[imax].label} a la plus grande valeur et ${t.cats[imin].label} la plus petite.`, e: `${t.cats[imax].label} vaut ${t.vals[imax]} et ${t.cats[imin].label} vaut ${t.vals[imin]}` },
        { s: `${t.cats[i].label} et ${t.cats[j].label} réunis font ${t.vals[i] + t.vals[j]} ${u}.`, e: `${t.vals[i]} + ${t.vals[j]} = ${t.vals[i] + t.vals[j]}` },
      ];
      const vraie = randomChoice(vraies);
      const fausses = [
        `Il y a ${t.vals[i] + t.vals[j]} ${u} de plus pour ${t.cats[i].label} que pour ${t.cats[j].label}.`,
        `Il y a ${total - Math.min(...t.vals)} ${u} en tout.`,
        `${t.cats[second].label} a la plus grande valeur.`,
        `Il y a ${d} ${u} de plus pour ${t.cats[j].label} que pour ${t.cats[i].label}.`,
        `${t.cats[i].label} et ${t.cats[j].label} réunis font ${t.vals[i] + t.vals[j] + t.s.pas} ${u}.`,
      ];
      return {
        text: `${t.s.intro} ${randomChoice(["Quelle phrase est vraie ?", "Quelle conclusion peut-on tirer du graphique ?", "Une seule de ces phrases est juste. Laquelle ?"])}`,
        format: "qcm",
        choices: makeChoices(vraie.s, fausses),
        expected: [vraie.s],
        comparator: "mcq_exact",
        explanation: `On vérifie avec les nombres : ${vraie.e}. Valeurs du graphique : ${gListe(t)}.`,
        canvas: gCanvas(t),
      };
    }),

  gGab("cm2_graphique_defi_gen_2_moitie_rang", "graphique_defi", 4,
    "La moitié du total : total ÷ 2. Range les barres de la plus haute à la plus basse.",
    ["defi", "moitie", "rang"],
    () => {
      const t = gTirer(4);
      const u = t.s.unite;
      if (Math.random() < 0.5) {
        // Plus de la moitié ? On évite le cas d'égalité exacte.
        const total = gSomme(t.vals);
        const pairs: [number, number][] = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
        const [i, j] = randomChoice(pairs.filter(([a, b]) => 2 * (t.vals[a] + t.vals[b]) !== total));
        const n = t.vals[i] + t.vals[j];
        const vrai = 2 * n > total;
        return {
          text: `${t.s.intro} ${gGuil(t.cats[i])} et ${gGuil(t.cats[j])} réunis font-ils plus de la moitié du total ?`,
          format: "qcm",
          choices: ["oui", "non"],
          expected: [vrai ? "oui" : "non"],
          comparator: "mcq_exact",
          explanation: `Total : ${t.vals.join(" + ")} = ${total}. Réunis : ${t.vals[i]} + ${t.vals[j]} = ${n}. Le double de ${n} est ${2 * n}, ${vrai ? "plus" : "moins"} que ${total} : ${vrai ? "oui, c’est plus" : "non, c’est moins"} de la moitié.`,
          canvas: gCanvas(t),
        };
      }
      const ordre = t.vals.map((_, k) => k).sort((a, b) => t.vals[b] - t.vals[a]);
      const rang = randomChoice([1, 2] as const);
      const rep = t.cats[ordre[rang]];
      const mot = rang === 1 ? "deuxième" : "troisième";
      return {
        text: `${t.s.intro} On range les barres de la plus haute à la plus basse. Quelle est la ${mot} ?`,
        format: "qcm",
        choices: shuffle(t.cats.map((x) => x.label)),
        expected: [rep.label],
        comparator: "mcq_exact",
        explanation: `Rangement : ${ordre.map((k) => `${t.cats[k].label} (${t.vals[k]})`).join(" > ")}. La ${mot} est ${gGuil(rep)}.`,
        canvas: gCanvas(t),
      };
    }),

  gGab("cm2_graphique_defi_gen_3_deux_etapes", "graphique_defi", 5,
    "Deux étapes : d’abord un premier calcul avec le graphique, puis le second.",
    ["defi", "probleme", "deux_etapes"],
    () => {
      const t = gTirer(4);
      const u = t.s.unite;
      const total = gSomme(t.vals);
      const mode = randomInt(0, 2);
      if (mode === 0) {
        const i = randomInt(0, 3);
        const rep = total - t.vals[i];
        return {
          text: `${t.s.intro} Combien de ${u} en tout, sans compter ${gGuil(t.cats[i])} ?`,
          format: "qcm",
          choices: gNum(rep, [total, t.vals[i], rep + t.s.pas, rep - t.s.pas], t.s.pas),
          expected: [String(rep)],
          comparator: "mcq_exact",
          explanation: `Total : ${t.vals.join(" + ")} = ${total}. Sans ${gGuil(t.cats[i])} : ${total} - ${t.vals[i]} = ${rep} ${u}.`,
          canvas: gCanvas(t),
        };
      }
      if (mode === 1) {
        // Combien faut-il ajouter à la plus petite pour égaler deux autres réunies ?
        const ordre = t.vals.map((_, k) => k).sort((a, b) => t.vals[a] - t.vals[b]);
        const lo = ordre[0];
        const [a, b] = shuffle(ordre.slice(1)).slice(0, 2);
        const cible = t.vals[a] + t.vals[b];
        const rep = cible - t.vals[lo];
        return {
          text: `${t.s.intro} Combien de ${u} faudrait-il ajouter à ${gGuil(t.cats[lo])} pour égaler ${gGuil(t.cats[a])} et ${gGuil(t.cats[b])} réunis ?`,
          format: "qcm",
          choices: gNum(rep, [cible, cible + t.vals[lo], Math.abs(t.vals[a] - t.vals[lo]), rep + t.s.pas], t.s.pas),
          expected: [String(rep)],
          comparator: "mcq_exact",
          explanation: `Réunis : ${t.vals[a]} + ${t.vals[b]} = ${cible}. ${gGuil(t.cats[lo])} vaut ${t.vals[lo]}. Il faut ajouter ${cible} - ${t.vals[lo]} = ${rep} ${u}.`,
          canvas: gCanvas(t),
        };
      }
      const m = randomInt(0, 3);
      const [r] = shuffle([0, 1, 2, 3].filter((k) => k !== m));
      const v = t.vals[m];
      const d = Math.abs(v - t.vals[r]);
      const plus = v > t.vals[r];
      return {
        text: `${t.s.intro} En tout, il y a ${total} ${u}, mais la barre ${gGuil(t.cats[m])} a été effacée. Quel est l’écart entre ${gGuil(t.cats[m])} et ${gGuil(t.cats[r])} ?`,
        format: "qcm",
        choices: gNum(d, [v, total - t.vals[r], d + t.s.pas, v + t.vals[r]], t.s.pas),
        expected: [String(d)],
        comparator: "mcq_exact",
        explanation: `D’abord la barre effacée : ${total} - (${t.vals.filter((_, k) => k !== m).join(" + ")}) = ${total} - ${total - v} = ${v}. Puis l’écart : ${plus ? `${v} - ${t.vals[r]}` : `${t.vals[r]} - ${v}`} = ${d} ${u}.`,
        canvas: gCanvas(t, { type: "barres", sans: m }),
      };
    }),

  gGab("cm2_graphique_defi_gen_4_quart_moitie", "graphique_defi", 5,
    "Le quart : total ÷ 4. La moitié : total ÷ 2. Calcule le total d’abord.",
    ["defi", "quart", "moitie", "camembert"],
    () => {
      // On FABRIQUE une part égale à la moitié ou au quart du total exact.
      const s = randomChoice(G_SITS);
      const moitie = Math.random() < 0.5;
      const cats = gSans(s.cats, 4);
      const mult = gMultiples(s);
      let vals: number[] = [];
      for (let essai = 0; essai < 200; essai++) {
        const [a, b] = shuffle(mult).slice(0, 2);
        const x = randomChoice(mult);
        // moitié : x = a + b + c ; quart : 3x = a + b + c.
        const c = (moitie ? x : 3 * x) - a - b;
        const cand = [x, a, b, c];
        if (c <= 0 || c % s.pas !== 0 || new Set(cand).size !== 4) continue;
        vals = cand;
        break;
      }
      if (!vals.length) {
        const p = s.pas;
        vals = moitie ? [6 * p, p, 2 * p, 3 * p] : [4 * p, 2 * p, 3 * p, 7 * p];
      }
      // La part cherchée prend une place au hasard.
      const ordre = shuffle([0, 1, 2, 3]);
      const t: GTirage = { s, cats, vals: ordre.map((k) => vals[k]) };
      const ix = ordre.indexOf(0);
      const total = gSomme(t.vals);
      const part = moitie ? total / 2 : total / 4;
      const type = Math.random() < 0.5 ? "camembert" : "barres";
      return {
        text: `${s.intro} Quelle étiquette représente exactement ${moitie ? "la moitié" : "le quart"} du total ?`,
        format: "qcm",
        choices: shuffle(cats.map((c) => c.label)),
        expected: [cats[ix].label],
        comparator: "mcq_exact",
        explanation: `Total : ${t.vals.join(" + ")} = ${total}. ${moitie ? `La moitié : ${total} ÷ 2` : `Le quart : ${total} ÷ 4`} = ${part}. C’est la valeur de ${gGuil(cats[ix])}.`,
        canvas: gCanvas(t, { type }),
      };
    }),

  // ⭐ 21/10/2026 — UNE COURBE, DEUX ÉTAPES : lire deux points, puis calculer.
  gGab("cm2_graphique_defi_gen_5_courbe", "graphique_defi", 5,
    "Lis d’abord les points utiles sur l’axe, puis fais le calcul.",
    ["defi", "courbe", "evolution", "axe_gradue"],
    () => {
      const t = gTirerCourbe();
      const P = t.c.points, V = t.vals, u = t.c.unite;
      const mode = randomInt(0, 2);
      if (mode === 0) {
        const ih = gIdxMax(V), ib = gIdxMin(V);
        const d = V[ih] - V[ib];
        return {
          text: `${t.c.intro} ${randomChoice([
            "Quel est l’écart entre le point le plus haut et le point le plus bas de la courbe ?",
            `Combien de ${u} séparent le point le plus haut du point le plus bas ?`,
          ])}`,
          format: "qcm",
          choices: gNum(d, [V[ih], V[ih] + V[ib], d + t.c.A, d - t.c.A], t.c.A),
          expected: [String(d)],
          comparator: "mcq_exact",
          explanation: `Le plus haut : ${gGuil(P[ih])}. ${gCourbeLire(t, ih)} Le plus bas : ${gGuil(P[ib])}. ${gCourbeLire(t, ib)} L’écart : ${V[ih]} - ${V[ib]} = ${d} ${u}.`,
          canvas: gCourbeCanvas(t),
        };
      }
      if (mode === 1) {
        // Combien de fois la courbe descend-elle (ou monte-t-elle) d'un point au suivant ?
        const ecarts = P.slice(1).map((_, k) => V[k + 1] - V[k]);
        const monte = Math.random() < 0.5;
        const r = ecarts.filter((e) => (monte ? e > 0 : e < 0)).length;
        const lesquels = P.slice(1)
          .map((_, k) => k)
          .filter((k) => (monte ? ecarts[k] > 0 : ecarts[k] < 0))
          .map((k) => `entre ${P[k].label} et ${P[k + 1].label}`);
        return {
          text: `${t.c.intro} D’un point au suivant, combien de fois la courbe ${monte ? "monte-t" : "descend"}-elle ?`,
          format: "qcm",
          choices: gNum(r, [ecarts.length - r, r + 1, Math.max(0, r - 1), ecarts.length]),
          expected: [String(r)],
          comparator: "mcq_exact",
          explanation: `Il y a ${P.length} points, donc ${ecarts.length} passages d’un point au suivant. La courbe ${monte ? "monte" : "descend"} ${r} fois${r ? ` : ${lesquels.join(" ; ")}` : ""}`,
          canvas: gCourbeCanvas(t),
        };
      }
      // Un seuil SUR une graduation, qu'aucun point n'atteint exactement : combien
      // de points au-dessus ? (Une somme n'aurait pas de sens pour des °C ou des cm.)
      const lo = Math.min(...V), hi = Math.max(...V);
      const seuils: number[] = [];
      for (let g = Math.ceil((lo + 1) / t.c.A) * t.c.A; g < hi; g += t.c.A) if (!V.includes(g)) seuils.push(g);
      const S = seuils.length ? randomChoice(seuils) : Math.round((lo + hi) / 2);
      const dessus = Math.random() < 0.6;
      const qui = P.filter((_, k) => (dessus ? V[k] > S : V[k] < S));
      const r = qui.length;
      return {
        text: `${t.c.intro} Combien de points de la courbe sont ${dessus ? "au-dessus" : "en dessous"} de ${S} ${u} ?`,
        format: "qcm",
        choices: gNum(r, [P.length - r, r + 1, Math.max(0, r - 1), P.length]),
        expected: [String(r)],
        comparator: "mcq_exact",
        explanation: `Je trouve ${S} sur l’axe et j’imagine une ligne droite à cette hauteur. Les points ${dessus ? "au-dessus" : "en dessous"} : ${qui.map(gGuil).join(", ") || "aucun"}. Cela fait ${r} point${r > 1 ? "s" : ""}.`,
        canvas: gCourbeCanvas(t),
      };
    }),
];

/** Total d'un graphique tiré au hasard (sert aux anciens gabarits « total »). */
function gQTotal() {
  const t = gTirer(randomChoice([4, 5]));
  const total = gSomme(t.vals);
  return {
    text: `${t.s.intro} ${randomChoice(["Quel est le total du graphique ?", `Combien de ${t.s.unite} au total ?`])}`,
    format: "qcm" as const,
    choices: gNum(total, [total - t.vals[1], total + t.s.pas, Math.max(...t.vals)], t.s.pas),
    expected: [String(total)],
    comparator: "mcq_exact" as const,
    explanation: `On additionne toutes les barres : ${t.vals.join(" + ")} = ${total} ${t.s.unite}.`,
    canvas: gCanvas(t),
  };
}

/** Lecture d'une valeur sur un graphique tiré au hasard. */
function gQValeur(completer: boolean) {
  // ⭐ 20/10/2026 : axe gradué, aucune valeur écrite sur les barres.
  const t = gTirerAxe(4);
  const i = randomInt(0, 3);
  const c = t.cats[i];
  const v = t.vals[i];
  return {
    text: `${t.s.intro} ${completer ? `On recopie le graphique dans un tableau. Quel nombre faut-il écrire pour ${gGuil(c)} ? Lis l’axe.` : t.s.combien(c)}`,
    format: "qcm" as const,
    choices: gNum(v, gLeurresAxe(t, i), t.A),
    expected: [String(v)],
    comparator: "mcq_exact" as const,
    explanation: `${gCommentLire(t, i)} Réponse : ${v} ${t.s.unite}.`,
    canvas: gCanvas(t, { type: "barres", hi: i, axe: t.A }),
  };
}

/** Écart entre deux barres d'un graphique tiré au hasard. */
function gQEcart() {
  const t = gTirer(4);
  const [i, j] = gPaire(t);
  const d = t.vals[i] - t.vals[j];
  return {
    text: `${t.s.intro} Combien de ${t.s.unite} de plus pour ${gGuil(t.cats[i])} que pour ${gGuil(t.cats[j])} ?`,
    format: "qcm" as const,
    choices: gNum(d, [t.vals[i] + t.vals[j], d + t.s.pas, t.vals[j]], t.s.pas),
    expected: [String(d)],
    comparator: "mcq_exact" as const,
    explanation: `${gGuil(t.cats[i])} vaut ${t.vals[i]} et ${gGuil(t.cats[j])} vaut ${t.vals[j]}. ${t.vals[i]} - ${t.vals[j]} = ${d} ${t.s.unite}.`,
    canvas: gCanvas(t),
  };
}

// ============================================================
// BANK
// ============================================================

export const graphiquesBank: TutorBankItemV4[] = [
  // ============================================================
  // GRAPHIQUE_LIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    text: "À quoi sert un graphique ?",
    format: "qcm",
    choices: [
      "à représenter des données pour les lire plus facilement",
      "à remplacer toutes les phrases par des dessins",
      "à cacher les données",
      "à faire seulement de la géométrie",
    ],
    expected: ["à représenter des données pour les lire plus facilement"],
    comparator: "mcq_exact",
    hint: "Un graphique rend les données plus visuelles.",
    explanation:
      "Un graphique sert à représenter des données de façon visuelle. Il aide à lire, comparer et interpréter des informations.",
    tags: ["cm2", "graphique", "lire", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_2_barres",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un diagramme en barres, une barre plus haute signifie souvent...",
    format: "qcm",
    choices: [
      "une valeur plus grande",
      "une valeur toujours égale à zéro",
      "une erreur",
      "une valeur plus petite",
    ],
    expected: ["une valeur plus grande"],
    comparator: "mcq_exact",
    hint: "La hauteur de la barre représente la valeur.",
    explanation:
      "Dans un diagramme en barres, la hauteur de chaque barre représente une valeur. Une barre plus haute correspond souvent à une valeur plus grande.",
    tags: ["cm2", "graphique", "lire", "barres", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_3_lire_foot",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’élèves ont choisi le football ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Pars du haut de la barre “Foot” et suis la ligne jusqu’à l’axe.",
    explanation:
      "Je pars du haut de la barre “Foot”, je suis la ligne jusqu’à l’axe, je lis 12. L’axe compte de 2 en 2. Donc 12 élèves ont choisi le football.",
    tags: ["cm2", "graphique", "lire", "barres", "sport", "short", "canvas", "axe_gradue"],
    canvas: graphiqueActivitesCanvas(0, true),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_4_lire_danse",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’élèves ont choisi la danse ?",
    format: "qcm",
    choices: ["9", "8", "10", "2"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "La barre “Danse” s’arrête entre deux graduations : regarde bien lesquelles.",
    explanation:
      "Je pars du haut de la barre “Danse”, je suis la ligne jusqu’à l’axe. Elle s’arrête au milieu, entre 8 et 10 : je lis 9. La bonne réponse est donc 9 élèves.",
    tags: ["cm2", "graphique", "lire", "barres", "sport", "qcm", "canvas", "axe_gradue", "milieu"],
    canvas: graphiqueActivitesCanvas(1, true),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_5_lire_natation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’élèves ont choisi la natation ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Sur le graphique, la natation est notée “Nage”. Sa barre s’arrête entre deux graduations.",
    explanation:
      "Je pars du haut de la barre “Nage”, je suis la ligne jusqu’à l’axe. Elle s’arrête au milieu, entre 6 et 8 : je lis 7. Donc 7 élèves ont choisi la natation.",
    tags: ["cm2", "graphique", "lire", "barres", "sport", "short", "canvas", "axe_gradue", "milieu"],
    canvas: graphiqueActivitesCanvas(2, true),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_6_lire_fruits_ananas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "reunion",
    text: "Combien d’ananas ont été vendus ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Lis la valeur de la barre “Ananas”.",
    explanation:
      "La barre “Ananas” indique 24. Il y a donc 24 ananas vendus.",
    tags: ["cm2", "graphique", "lire", "fruits", "reunion", "short", "canvas"],
    canvas: graphiqueFruitsCanvas(0),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_7_lire_fruits_bananes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "reunion",
    text: "Combien de bananes ont été vendues ?",
    format: "qcm",
    choices: ["28", "24", "15", "18"],
    expected: ["28"],
    comparator: "mcq_exact",
    hint: "Cherche la barre “Bananes”.",
    explanation:
      "La barre “Bananes” indique 28. La bonne réponse est 28.",
    tags: ["cm2", "graphique", "lire", "fruits", "reunion", "qcm", "canvas"],
    canvas: graphiqueFruitsCanvas(1),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_8_lire_livres_bd",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de BD ont été lues ?",
    format: "short",
    expected: ["22"],
    comparator: "number_equal",
    hint: "Lis la valeur du bâton “BD”.",
    explanation:
      "Le bâton “BD” indique 22. Les élèves ont donc lu 22 BD.",
    tags: ["cm2", "graphique", "lire", "batons", "livres", "short", "canvas"],
    canvas: graphiqueLivresCanvas(1),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_9_lire_livres_docs",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de documentaires ont été lus ?",
    format: "qcm",
    choices: ["9", "14", "18", "22"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "Sur le graphique, “Docs” signifie documentaires.",
    explanation:
      "Le bâton “Docs” indique 9. Il y a donc 9 documentaires lus.",
    tags: ["cm2", "graphique", "lire", "batons", "livres", "qcm", "canvas"],
    canvas: graphiqueLivresCanvas(3),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_10_lire_cantine",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 2,
    theme: "reunion",
    text: "Combien d’élèves ont choisi le rougail ?",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Pars du haut de la barre “Rougail” et suis la ligne jusqu’à l’axe.",
    explanation:
      "Je pars du haut de la barre “Rougail”, je suis la ligne jusqu’à l’axe, je lis 14. L’axe compte de 2 en 2. Donc 14 élèves ont choisi le rougail.",
    tags: ["cm2", "graphique", "lire", "cantine", "reunion", "short", "canvas", "axe_gradue"],
    canvas: graphiqueCantineCanvas(1, true),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_11_lire_temperature",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 2,
    theme: "reunion",
    text: "Quelle température a été relevée jeudi ?",
    format: "qcm",
    choices: ["28", "25", "26", "27"],
    expected: ["28"],
    comparator: "mcq_exact",
    hint: "Jeudi est noté “Jeu”.",
    explanation:
      "Le bâton “Jeu” indique 28. La température du jeudi est donc 28°C.",
    tags: ["cm2", "graphique", "lire", "temperature", "qcm", "canvas"],
    canvas: graphiqueMeteoCanvas(3),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_12_camembert_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le diagramme circulaire, quel est le total indiqué ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Lis l’indication “total” sous le diagramme.",
    explanation:
      "Le diagramme indique un total de 30. Cela représente l’ensemble des réponses.",
    tags: ["cm2", "graphique", "lire", "camembert", "total", "short", "canvas"],
    canvas: graphiqueCamembertGoutsCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_13_camembert_vanille",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le diagramme circulaire, combien d’élèves ont choisi vanille ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Repère la partie “Vanille”.",
    explanation:
      "La partie “Vanille” correspond à 10 réponses.",
    tags: ["cm2", "graphique", "lire", "camembert", "vanille", "short", "canvas"],
    canvas: graphiqueCamembertGoutsCanvas(0),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_14_erreur_label",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève veut connaître la valeur de “Basket”, mais il lit la barre “Danse”. Est-ce correct ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut lire la bonne étiquette.",
    explanation:
      "Non. Pour connaître la valeur de “Basket”, il faut regarder la barre “Basket”, pas la barre “Danse”.",
    tags: ["cm2", "graphique", "lire", "erreur", "label", "qcm", "canvas"],
    canvas: graphiqueActivitesCanvas(3),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_15_erreur_valeur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit que la barre “Foot” vaut 10. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Suis le haut de la barre “Foot” jusqu’à l’axe : quelle graduation touches-tu ?",
    explanation:
      "Non. Je pars du haut de la barre “Foot”, je suis la ligne jusqu’à l’axe, je lis 12. 10 est la graduation juste en dessous.",
    tags: ["cm2", "graphique", "lire", "erreur", "valeur", "qcm", "canvas", "axe_gradue"],
    canvas: graphiqueActivitesCanvas(0, true),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_16_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment lire une valeur dans un graphique en barres.",
    format: "open",
    expected: ["barre", "étiquette", "valeur", "hauteur", "lire"],
    comparator: "contains_keyword",
    hint: "Parle de l’étiquette et de la valeur de la barre.",
    explanation:
      "Pour lire une valeur dans un graphique en barres, on repère d’abord l’étiquette demandée. Ensuite, on lit la valeur indiquée par la hauteur de la barre ou par le nombre écrit au-dessus.",
    tags: ["cm2", "graphique", "lire", "open", "methode", "barres"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_lire_fixed_17_open_interet",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi un graphique peut-il être plus visuel qu’un tableau ?",
    format: "open",
    expected: ["voir", "comparer", "barres", "valeurs", "rapidement"],
    comparator: "contains_keyword",
    hint: "Pense aux barres plus hautes ou plus basses.",
    explanation:
      "Un graphique est souvent plus visuel qu’un tableau car on voit rapidement les différences entre les valeurs. Par exemple, une barre plus haute attire tout de suite l’attention.",
    tags: ["cm2", "graphique", "lire", "open", "raisonnement"],
  },

  {
    kind: "template",
    id: "cm2_graphique_lire_tpl_1_activites",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la valeur au-dessus de la barre demandée.",
    tags: ["cm2", "graphique", "lire", "activites", "template", "qcm", "canvas"],
    generate: () => {
      // ⭐ 20/10/2026 : trois fois sur quatre, une situation tirée parmi une trentaine.
      if (Math.random() < 0.75) return gQValeur(false);
      const items = [
        { label: "Foot", value: 12, index: 0 },
        { label: "Danse", value: 9, index: 1 },
        { label: "Nage", value: 7, index: 2 },
        { label: "Basket", value: 10, index: 3 },
      ];

      const item = randomChoice(items);

      return {
        text: `Quelle valeur correspond à “${item.label}” ? Lis l’axe gradué.`,
        format: "qcm",
        choices: makeChoices(String(item.value), [String(item.value - 1), String(item.value + 1), String(item.value + 2), "2"]),
        expected: [String(item.value)],
        comparator: "mcq_exact",
        // ⭐ 21/10/2026 — axe de 2 en 2 : 9 et 7 sont au milieu de deux graduations.
        explanation: item.value % 2 === 0
          ? `Je pars du haut de la barre “${item.label}”, je suis la ligne jusqu’à l’axe, je lis ${item.value}.`
          : `Je pars du haut de la barre “${item.label}”, je suis la ligne jusqu’à l’axe. Elle s’arrête au milieu, entre ${item.value - 1} et ${item.value + 1} : je lis ${item.value}.`,
        canvas: graphiqueActivitesCanvas(item.index, true),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_graphique_lire_tpl_2_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 2,
    theme: "reunion",
    hint: "Cherche la barre du fruit demandé.",
    tags: ["cm2", "graphique", "lire", "fruits", "reunion", "template", "short", "canvas"],
    generate: () => {
      // ⭐ 20/10/2026 : trois fois sur quatre, une situation tirée parmi une trentaine.
      if (Math.random() < 0.75) return gQValeur(false);
      const items = [
        { label: "Ananas", value: 24, index: 0 },
        { label: "Bananes", value: 28, index: 1 },
        { label: "Mangues", value: 15, index: 2 },
        { label: "Letchis", value: 18, index: 3 },
      ];

      const item = randomChoice(items);

      return {
        text: `Combien de ${item.label.toLowerCase()} ont été vendus ?`,
        format: "short",
        expected: [String(item.value)],
        comparator: "number_equal",
        explanation:
          `La barre “${item.label}” indique ${item.value}.`,
        canvas: graphiqueFruitsCanvas(item.index),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_graphique_lire_tpl_3_livres",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la valeur du bâton demandé.",
    tags: ["cm2", "graphique", "lire", "livres", "template", "qcm", "canvas"],
    generate: () => {
      // ⭐ 20/10/2026 : trois fois sur quatre, une situation tirée parmi une trentaine.
      if (Math.random() < 0.75) return gQValeur(false);
      const items = [
        { label: "Romans", value: 14, index: 0 },
        { label: "BD", value: 22, index: 1 },
        { label: "Mangas", value: 18, index: 2 },
        { label: "Docs", value: 9, index: 3 },
      ];

      const item = randomChoice(items);

      return {
        text: `Combien indique le bâton “${item.label}” ?`,
        format: "qcm",
        choices: makeChoices(String(item.value), ["9", "14", "18", "22", "25"]),
        expected: [String(item.value)],
        comparator: "mcq_exact",
        explanation:
          `Le bâton “${item.label}” indique ${item.value}.`,
        canvas: graphiqueLivresCanvas(item.index),
      };
    },
  },
    // ============================================================
  // GRAPHIQUE_COMPLETER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 1,
    theme: "neutral",
    text: "Compléter un graphique, c’est...",
    format: "qcm",
    choices: [
      "ajouter une valeur ou une barre manquante à partir des données",
      "changer toutes les couleurs au hasard",
      "effacer les étiquettes",
      "remplacer le graphique par une phrase",
    ],
    expected: ["ajouter une valeur ou une barre manquante à partir des données"],
    comparator: "mcq_exact",
    hint: "Il manque une information sur le graphique.",
    explanation:
      "Compléter un graphique, c’est ajouter une information manquante : une valeur, une barre, un bâton ou une étiquette.",
    tags: ["cm2", "graphique", "completer", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_2_lire_donnee",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 1,
    theme: "neutral",
    text: "Avant de compléter une barre, il faut d’abord...",
    format: "qcm",
    choices: [
      "lire la donnée à représenter",
      "choisir une hauteur au hasard",
      "mettre toutes les barres à la même hauteur",
      "supprimer le titre",
    ],
    expected: ["lire la donnée à représenter"],
    comparator: "mcq_exact",
    hint: "La hauteur de la barre dépend de la valeur.",
    explanation:
      "Avant de compléter une barre, il faut lire la donnée à représenter. La hauteur de la barre doit correspondre à cette valeur.",
    tags: ["cm2", "graphique", "completer", "methode", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_3_foot",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour compléter le graphique, quelle valeur faut-il écrire au-dessus de la barre “Foot” ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Lis la barre “Foot” sur l’axe gradué.",
    explanation:
      "Je pars du haut de la barre “Foot”, je suis la ligne jusqu’à l’axe, je lis 12. Il faut donc écrire 12.",
    tags: ["cm2", "graphique", "completer", "activites", "short", "canvas", "axe_gradue"],
    canvas: graphiqueActivitesCanvas(0, true),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_4_basket",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour compléter le graphique, quelle valeur faut-il écrire pour “Basket” ?",
    format: "qcm",
    choices: ["10", "8", "12", "2"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "Suis le haut de la barre “Basket” jusqu’à l’axe.",
    explanation:
      "Je pars du haut de la barre “Basket”, je suis la ligne jusqu’à l’axe, je lis 10. Il faut donc écrire 10. (2 est le pas de l’axe, pas la valeur.)",
    tags: ["cm2", "graphique", "completer", "activites", "qcm", "canvas", "axe_gradue"],
    canvas: graphiqueActivitesCanvas(3, true),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_5_ananas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "reunion",
    text: "Pour compléter le graphique des fruits, quelle valeur faut-il écrire pour “Ananas” ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Lis la valeur de la barre “Ananas”.",
    explanation:
      "La barre “Ananas” indique 24. Il faut donc écrire 24.",
    tags: ["cm2", "graphique", "completer", "fruits", "reunion", "short", "canvas"],
    canvas: graphiqueFruitsCanvas(0),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_6_mangues",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "reunion",
    text: "Pour compléter le graphique des fruits, quelle valeur correspond à “Mangues” ?",
    format: "qcm",
    choices: ["15", "18", "24", "28"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "Cherche la barre “Mangues”.",
    explanation:
      "La barre “Mangues” indique 15. La valeur à écrire est 15.",
    tags: ["cm2", "graphique", "completer", "fruits", "reunion", "qcm", "canvas"],
    canvas: graphiqueFruitsCanvas(2),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_7_livres_mangas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour compléter le diagramme en bâtons, quelle valeur faut-il écrire pour “Mangas” ?",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "Lis le bâton “Mangas”.",
    explanation:
      "Le bâton “Mangas” indique 18. Il faut donc écrire 18.",
    tags: ["cm2", "graphique", "completer", "livres", "batons", "short", "canvas"],
    canvas: graphiqueLivresCanvas(2),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_8_temperature_mardi",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "reunion",
    text: "Pour compléter le graphique météo, quelle valeur faut-il écrire pour mardi ?",
    format: "qcm",
    choices: ["27", "25", "26", "28"],
    expected: ["27"],
    comparator: "mcq_exact",
    hint: "Mardi est noté “Mar”.",
    explanation:
      "Le bâton “Mar” indique 27. Il faut donc écrire 27.",
    tags: ["cm2", "graphique", "completer", "temperature", "qcm", "canvas"],
    canvas: graphiqueMeteoCanvas(1),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_9_total_camembert",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 3,
    theme: "neutral",
    text: "Pour compléter le total du diagramme circulaire, on additionne 10 + 8 + 6 + 6. Quel total faut-il écrire ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Additionne les quatre valeurs.",
    explanation:
      "On additionne les valeurs : 10 + 8 + 6 + 6 = 30. Le total à écrire est 30.",
    tags: ["cm2", "graphique", "completer", "camembert", "total", "short", "canvas"],
    canvas: graphiqueCamembertGoutsCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_10_valeur_manquante_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 4,
    theme: "neutral",
    text: "Un graphique représente 30 réponses. On connaît 10, 8 et 6 réponses. Quelle valeur manque-t-il ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Additionne les valeurs connues puis soustrais au total.",
    explanation:
      "On additionne les valeurs connues : 10 + 8 + 6 = 24. Il manque 30 - 24 = 6 réponses.",
    tags: ["cm2", "graphique", "completer", "valeur_manquante", "short"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_11_erreur_hauteur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève complète la barre “Foot” avec la valeur 10 au lieu de 12. Est-ce correct ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Relis la barre “Foot” sur l’axe gradué.",
    explanation:
      "Non. Je pars du haut de la barre “Foot”, je suis la ligne jusqu’à l’axe, je lis 12. 10 est la graduation voisine : elle ne correspond pas à la donnée.",
    tags: ["cm2", "graphique", "completer", "erreur", "activites", "qcm", "canvas", "axe_gradue"],
    canvas: graphiqueActivitesCanvas(0, true),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_12_erreur_hasard",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève complète une barre sans lire la donnée. Est-ce une bonne méthode ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La hauteur doit représenter une vraie donnée.",
    explanation:
      "Non. On ne complète pas un graphique au hasard. La hauteur ou la valeur d’une barre doit correspondre à la donnée représentée.",
    tags: ["cm2", "graphique", "completer", "erreur", "methode", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_13_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment compléter une barre manquante dans un graphique.",
    format: "open",
    expected: ["donnée", "valeur", "barre", "hauteur", "étiquette"],
    comparator: "contains_keyword",
    hint: "Parle de la donnée et de la hauteur de la barre.",
    explanation:
      "Pour compléter une barre manquante, on repère d’abord son étiquette. Ensuite, on lit la donnée à représenter et on trace ou complète la barre à la bonne hauteur.",
    tags: ["cm2", "graphique", "completer", "open", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_completer_fixed_14_open_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment compléter un total à partir d’un graphique.",
    format: "open",
    expected: ["additionner", "valeurs", "total", "graphique", "données"],
    comparator: "contains_keyword",
    hint: "Un total s’obtient en additionnant les valeurs.",
    explanation:
      "Pour compléter un total, on lit toutes les valeurs utiles du graphique, puis on les additionne. Il faut vérifier que l’on n’oublie aucune donnée.",
    tags: ["cm2", "graphique", "completer", "open", "total"],
  },

  {
    kind: "template",
    id: "cm2_graphique_completer_tpl_1_activites",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde la barre demandée.",
    tags: ["cm2", "graphique", "completer", "activites", "template", "qcm", "canvas"],
    generate: () => {
      // ⭐ 20/10/2026 : trois fois sur quatre, une situation tirée parmi une trentaine.
      if (Math.random() < 0.75) return gQValeur(true);
      const items = [
        { label: "Foot", value: 12, index: 0 },
        { label: "Danse", value: 9, index: 1 },
        { label: "Nage", value: 7, index: 2 },
        { label: "Basket", value: 10, index: 3 },
      ];

      const item = randomChoice(items);

      return {
        text: `Quelle valeur faut-il écrire en haut de la barre “${item.label}” ? Lis l’axe gradué.`,
        format: "qcm",
        choices: makeChoices(String(item.value), [String(item.value - 1), String(item.value + 1), String(item.value - 2), "2"]),
        expected: [String(item.value)],
        comparator: "mcq_exact",
        // ⭐ 21/10/2026 — axe de 2 en 2 : 9 et 7 sont au milieu de deux graduations.
        explanation: item.value % 2 === 0
          ? `Je pars du haut de la barre “${item.label}”, je suis la ligne jusqu’à l’axe, je lis ${item.value}. Il faut donc écrire ${item.value}.`
          : `Je pars du haut de la barre “${item.label}”, je suis la ligne jusqu’à l’axe. Elle s’arrête au milieu, entre ${item.value - 1} et ${item.value + 1} : je lis ${item.value}. Il faut donc écrire ${item.value}.`,
        canvas: graphiqueActivitesCanvas(item.index, true),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_graphique_completer_tpl_2_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "reunion",
    hint: "Lis la valeur du fruit demandé.",
    tags: ["cm2", "graphique", "completer", "fruits", "reunion", "template", "short", "canvas"],
    generate: () => {
      // ⭐ 20/10/2026 : trois fois sur quatre, une situation tirée parmi une trentaine.
      if (Math.random() < 0.75) return gQValeur(true);
      const items = [
        { label: "Ananas", value: 24, index: 0 },
        { label: "Bananes", value: 28, index: 1 },
        { label: "Mangues", value: 15, index: 2 },
        { label: "Letchis", value: 18, index: 3 },
      ];

      const item = randomChoice(items);

      return {
        text: `Quelle valeur faut-il écrire pour compléter “${item.label}” ?`,
        format: "short",
        expected: [String(item.value)],
        comparator: "number_equal",
        explanation:
          `La barre “${item.label}” indique ${item.value}.`,
        canvas: graphiqueFruitsCanvas(item.index),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_graphique_completer_tpl_3_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les valeurs du graphique.",
    tags: ["cm2", "graphique", "completer", "total", "template", "short", "canvas"],
    generate: () => {
      // ⭐ 20/10/2026 : trois fois sur quatre, une situation tirée parmi une trentaine.
      if (Math.random() < 0.75) return gQTotal();
      const item = randomChoice([
        {
          text: "Quel total faut-il écrire pour les activités ?",
          values: [12, 9, 7, 10],
          total: 38,
          canvas: graphiqueActivitesCanvas,
          explanation:
            "On additionne les activités : 12 + 9 + 7 + 10 = 38.",
        },
        {
          text: "Quel total faut-il écrire pour les livres lus ?",
          values: [14, 22, 18, 9],
          total: 63,
          canvas: graphiqueLivresCanvas,
          explanation:
            "On additionne les livres : 14 + 22 + 18 + 9 = 63.",
        },
        {
          text: "Quel total faut-il écrire pour les fruits vendus ?",
          values: [24, 28, 15, 18],
          total: 85,
          canvas: graphiqueFruitsCanvas,
          explanation:
            "On additionne les fruits : 24 + 28 + 15 + 18 = 85.",
        },
      ]);

      return {
        text: item.text,
        format: "short",
        expected: [String(item.total)],
        comparator: "number_equal",
        explanation: item.explanation,
        canvas: item.canvas(),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_graphique_completer_tpl_4_valeur_manquante_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les valeurs connues puis retire-les au total.",
    tags: ["cm2", "graphique", "completer", "valeur_manquante", "template", "short"],
    // ⭐ 20/10/2026 : une situation tirée au lieu d'une seule phrase (même
    // calcul : total - valeurs connues), sans graphique, données dans le texte.
    generate: () => {
      const t = gTirer(4);
      const m = randomInt(0, 3);
      const total = gSomme(t.vals);
      const connus = total - t.vals[m];
      const missing = t.vals[m];
      const autres = t.cats.map((_, k) => k).filter((k) => k !== m);
      const q = randomChoice([
        `Le graphique doit représenter ${total} ${t.s.unite} en tout. On connaît ${gListe(t, autres)}. Quelle valeur manque-t-il pour ${gGuil(t.cats[m])} ?`,
        `Total : ${total} ${t.s.unite}. Valeurs déjà tracées : ${gListe(t, autres)}. Quelle hauteur pour la barre ${gGuil(t.cats[m])} ?`,
      ]);

      return {
        text: `${t.s.intro} ${q}`,
        format: "qcm",
        choices: gNum(missing, [connus, total, missing + t.s.pas, missing - t.s.pas], t.s.pas),
        expected: [String(missing)],
        comparator: "mcq_exact",
        explanation:
          `On additionne les valeurs connues : ${autres.map((k) => t.vals[k]).join(" + ")} = ${connus}. Puis on calcule ${total} - ${connus} = ${missing}.`,
      };
    },
  },
    // ============================================================
  // GRAPHIQUE_INTERPRETER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 1,
    theme: "neutral",
    text: "Interpréter un graphique, c’est...",
    format: "qcm",
    choices: [
      "utiliser les données du graphique pour répondre à une question",
      "regarder uniquement les couleurs",
      "ignorer les valeurs",
      "changer les étiquettes du graphique",
    ],
    expected: ["utiliser les données du graphique pour répondre à une question"],
    comparator: "mcq_exact",
    hint: "Interpréter, c’est donner du sens aux données.",
    explanation:
      "Interpréter un graphique, c’est utiliser les données représentées pour comparer, calculer ou tirer une conclusion.",
    tags: ["cm2", "graphique", "interpreter", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_2_max_activite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle activité a été choisie par le plus d’élèves ?",
    format: "qcm",
    choices: ["Foot", "Danse", "Nage", "Basket"],
    expected: ["Foot"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus haute.",
    explanation:
      "On compare les valeurs : Foot 12, Danse 9, Nage 7, Basket 10. La plus grande valeur est 12, donc l’activité la plus choisie est Foot.",
    tags: ["cm2", "graphique", "interpreter", "maximum", "activites", "qcm", "canvas"],
    canvas: graphiqueActivitesCanvas(0),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_3_min_activite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle activité a été choisie par le moins d’élèves ?",
    format: "qcm",
    choices: ["Nage", "Foot", "Danse", "Basket"],
    expected: ["Nage"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus basse.",
    explanation:
      "La plus petite valeur est 7, pour “Nage”. C’est donc l’activité la moins choisie.",
    tags: ["cm2", "graphique", "interpreter", "minimum", "activites", "qcm", "canvas"],
    canvas: graphiqueActivitesCanvas(2),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_4_difference_foot_nage",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Combien d’élèves de plus ont choisi Foot que Nage ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compare 12 et 7.",
    explanation:
      "Foot correspond à 12 élèves et Nage à 7 élèves. La différence est 12 - 7 = 5.",
    tags: ["cm2", "graphique", "interpreter", "difference", "activites", "short", "canvas"],
    canvas: graphiqueActivitesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_5_total_activites",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Combien d’élèves ont répondu au total au graphique des activités ?",
    format: "short",
    expected: ["38"],
    comparator: "number_equal",
    hint: "Additionne toutes les valeurs.",
    explanation:
      "On additionne les valeurs : 12 + 9 + 7 + 10 = 38. Il y a donc 38 élèves au total.",
    tags: ["cm2", "graphique", "interpreter", "total", "activites", "short", "canvas"],
    canvas: graphiqueActivitesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_6_max_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "reunion",
    text: "Quel fruit a été le plus vendu ?",
    format: "qcm",
    choices: ["Bananes", "Ananas", "Mangues", "Letchis"],
    expected: ["Bananes"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus haute.",
    explanation:
      "Les valeurs sont : Ananas 24, Bananes 28, Mangues 15, Letchis 18. La plus grande valeur est 28, donc les bananes ont été les plus vendues.",
    tags: ["cm2", "graphique", "interpreter", "maximum", "fruits", "reunion", "qcm", "canvas"],
    canvas: graphiqueFruitsCanvas(1),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_7_min_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "reunion",
    text: "Quel fruit a été le moins vendu ?",
    format: "qcm",
    choices: ["Mangues", "Ananas", "Bananes", "Letchis"],
    expected: ["Mangues"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus basse.",
    explanation:
      "La plus petite valeur est 15, pour les mangues. Les mangues ont donc été les moins vendues.",
    tags: ["cm2", "graphique", "interpreter", "minimum", "fruits", "reunion", "qcm", "canvas"],
    canvas: graphiqueFruitsCanvas(2),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_8_total_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Combien de fruits ont été vendus au total ?",
    format: "short",
    expected: ["85"],
    comparator: "number_equal",
    hint: "Additionne les quatre valeurs du graphique.",
    explanation:
      "On additionne les fruits : 24 + 28 + 15 + 18 = 85. Au total, 85 fruits ont été vendus.",
    tags: ["cm2", "graphique", "interpreter", "total", "fruits", "reunion", "short", "canvas"],
    canvas: graphiqueFruitsCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_9_difference_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Combien de bananes de plus que de mangues ont été vendues ?",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Compare 28 et 15.",
    explanation:
      "Bananes : 28. Mangues : 15. La différence est 28 - 15 = 13.",
    tags: ["cm2", "graphique", "interpreter", "difference", "fruits", "reunion", "short", "canvas"],
    canvas: graphiqueFruitsCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_10_livres_max",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Quel type de livre a été le plus lu ?",
    format: "qcm",
    choices: ["BD", "Romans", "Mangas", "Docs"],
    expected: ["BD"],
    comparator: "mcq_exact",
    hint: "Cherche le bâton le plus haut.",
    explanation:
      "Les BD ont la valeur 22, qui est la plus grande du graphique. Ce sont donc les livres les plus lus.",
    tags: ["cm2", "graphique", "interpreter", "livres", "maximum", "qcm", "canvas"],
    canvas: graphiqueLivresCanvas(1),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_11_livres_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de livres ont été lus au total ?",
    format: "short",
    expected: ["63"],
    comparator: "number_equal",
    hint: "Additionne les quatre valeurs.",
    explanation:
      "On additionne : 14 + 22 + 18 + 9 = 63. Les élèves ont lu 63 livres au total.",
    tags: ["cm2", "graphique", "interpreter", "livres", "total", "short", "canvas"],
    canvas: graphiqueLivresCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_12_meteo_max",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "reunion",
    text: "Quel jour la température est-elle la plus élevée ?",
    format: "qcm",
    choices: ["Jeu", "Lun", "Mar", "Mer"],
    expected: ["Jeu"],
    comparator: "mcq_exact",
    hint: "Cherche le bâton le plus haut.",
    explanation:
      "La plus grande valeur est 28, pour “Jeu”. La température est donc la plus élevée jeudi.",
    tags: ["cm2", "graphique", "interpreter", "meteo", "maximum", "qcm", "canvas"],
    canvas: graphiqueMeteoCanvas(3),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_13_meteo_ecart",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Quel est l’écart entre la température la plus haute et la plus basse ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Soustrais la plus petite température à la plus grande.",
    explanation:
      "La température la plus haute est 28 et la plus basse est 25. L’écart est 28 - 25 = 3.",
    tags: ["cm2", "graphique", "interpreter", "meteo", "ecart", "short", "canvas"],
    canvas: graphiqueMeteoCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_14_cantine_plus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "reunion",
    text: "Quel menu est le plus choisi ?",
    format: "qcm",
    choices: ["Cari", "Rougail", "Salade", "Sandwich"],
    expected: ["Cari"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus haute.",
    explanation:
      "La barre “Cari” indique 16, c’est la plus grande valeur. Le cari est donc le menu le plus choisi.",
    tags: ["cm2", "graphique", "interpreter", "cantine", "maximum", "qcm", "canvas"],
    canvas: graphiqueCantineCanvas(0),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_15_camembert_plus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le diagramme circulaire, quel goût est le plus choisi ?",
    format: "qcm",
    choices: ["Vanille", "Choco", "Fraise", "Coco"],
    expected: ["Vanille"],
    comparator: "mcq_exact",
    hint: "Compare les valeurs des parts.",
    explanation:
      "Les valeurs sont : Vanille 10, Choco 8, Fraise 6, Coco 6. La plus grande valeur est 10, donc le goût le plus choisi est Vanille.",
    tags: ["cm2", "graphique", "interpreter", "camembert", "maximum", "qcm", "canvas"],
    canvas: graphiqueCamembertGoutsCanvas(0),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_16_erreur_max",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Nage est l’activité la plus choisie.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare les valeurs des quatre barres.",
    explanation:
      "Non. Nage vaut 7, alors que Foot vaut 12. L’activité la plus choisie est Foot.",
    tags: ["cm2", "graphique", "interpreter", "erreur", "maximum", "qcm", "canvas"],
    canvas: graphiqueActivitesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_17_erreur_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit que le total des activités est 28. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Refais l’addition des quatre valeurs.",
    explanation:
      "Non. Le total correct est 12 + 9 + 7 + 10 = 38. L’élève a fait une erreur de calcul.",
    tags: ["cm2", "graphique", "interpreter", "erreur", "total", "qcm", "canvas"],
    canvas: graphiqueActivitesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_18_open_maximum",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment trouver la valeur la plus grande dans un graphique.",
    format: "open",
    expected: ["comparer", "barres", "valeurs", "plus", "grande"],
    comparator: "contains_keyword",
    hint: "Regarde les hauteurs ou les valeurs.",
    explanation:
      "Pour trouver la valeur la plus grande, on compare les barres ou les valeurs écrites. La barre la plus haute ou la valeur la plus grande donne la réponse.",
    tags: ["cm2", "graphique", "interpreter", "open", "maximum", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_interpreter_fixed_19_open_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment calculer un total à partir d’un graphique.",
    format: "open",
    expected: ["lire", "valeurs", "additionner", "total", "graphique"],
    comparator: "contains_keyword",
    hint: "Lis toutes les valeurs utiles, puis additionne-les.",
    explanation:
      "Pour calculer un total, on lit toutes les valeurs nécessaires dans le graphique, puis on les additionne. Il faut vérifier que toutes les données utiles ont été prises en compte.",
    tags: ["cm2", "graphique", "interpreter", "open", "total", "methode"],
  },

  {
    kind: "template",
    id: "cm2_graphique_interpreter_tpl_1_maximum",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la plus grande valeur.",
    tags: ["cm2", "graphique", "interpreter", "maximum", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Quelle activité est la plus choisie ?",
          correct: "Foot",
          choices: ["Foot", "Danse", "Nage", "Basket"],
          explanation:
            "Foot vaut 12, c’est la plus grande valeur.",
          canvas: graphiqueActivitesCanvas(0),
        },
        {
          text: "Quel fruit est le plus vendu ?",
          correct: "Bananes",
          choices: ["Ananas", "Bananes", "Mangues", "Letchis"],
          explanation:
            "Bananes vaut 28, c’est la plus grande valeur.",
          canvas: graphiqueFruitsCanvas(1),
        },
        {
          text: "Quel type de livre est le plus lu ?",
          correct: "BD",
          choices: ["Romans", "BD", "Mangas", "Docs"],
          explanation:
            "BD vaut 22, c’est la plus grande valeur.",
          canvas: graphiqueLivresCanvas(1),
        },
        {
          text: "Quel menu est le plus choisi ?",
          correct: "Cari",
          choices: ["Cari", "Rougail", "Salade", "Sandwich"],
          explanation:
            "Cari vaut 16, c’est la plus grande valeur.",
          canvas: graphiqueCantineCanvas(0),
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: shuffle(item.choices),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_graphique_interpreter_tpl_2_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les valeurs du graphique.",
    tags: ["cm2", "graphique", "interpreter", "total", "template", "short", "canvas"],
    generate: () => {
      // ⭐ 20/10/2026 : trois fois sur quatre, une situation tirée parmi une trentaine.
      if (Math.random() < 0.75) return gQTotal();
      const item = randomChoice([
        {
          text: "Quel est le total des activités ?",
          total: 38,
          explanation:
            "On additionne : 12 + 9 + 7 + 10 = 38.",
          canvas: graphiqueActivitesCanvas(),
        },
        {
          text: "Quel est le total des fruits vendus ?",
          total: 85,
          explanation:
            "On additionne : 24 + 28 + 15 + 18 = 85.",
          canvas: graphiqueFruitsCanvas(),
        },
        {
          text: "Quel est le total des livres lus ?",
          total: 63,
          explanation:
            "On additionne : 14 + 22 + 18 + 9 = 63.",
          canvas: graphiqueLivresCanvas(),
        },
        {
          text: "Quel est le total des menus choisis ?",
          total: 50,
          explanation:
            "On additionne : 16 + 14 + 8 + 12 = 50.",
          canvas: graphiqueCantineCanvas(),
        },
      ]);

      return {
        text: item.text,
        format: "short",
        expected: [String(item.total)],
        comparator: "number_equal",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_graphique_interpreter_tpl_3_difference",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour trouver un écart, on soustrait.",
    tags: ["cm2", "graphique", "interpreter", "difference", "template", "short", "canvas"],
    generate: () => {
      // ⭐ 20/10/2026 : trois fois sur quatre, une situation tirée parmi une trentaine.
      if (Math.random() < 0.75) return gQEcart();
      const item = randomChoice([
        {
          text: "Combien d’élèves de plus ont choisi Foot que Nage ?",
          expected: 5,
          explanation:
            "Foot vaut 12 et Nage vaut 7. L’écart est 12 - 7 = 5.",
          canvas: graphiqueActivitesCanvas(),
        },
        {
          text: "Combien de bananes de plus que de mangues ont été vendues ?",
          expected: 13,
          explanation:
            "Bananes vaut 28 et Mangues vaut 15. L’écart est 28 - 15 = 13.",
          canvas: graphiqueFruitsCanvas(),
        },
        {
          text: "Combien de BD de plus que de documentaires ont été lues ?",
          expected: 13,
          explanation:
            "BD vaut 22 et Docs vaut 9. L’écart est 22 - 9 = 13.",
          canvas: graphiqueLivresCanvas(),
        },
        {
          text: "Quel est l’écart entre jeudi et lundi ?",
          expected: 3,
          explanation:
            "Jeudi vaut 28 et lundi vaut 25. L’écart est 28 - 25 = 3.",
          canvas: graphiqueMeteoCanvas(),
        },
      ]);

      return {
        text: item.text,
        format: "short",
        expected: [String(item.expected)],
        comparator: "number_equal",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },
  // ============================================================
  // GRAPHIQUE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_1_conclusion_activites",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle conclusion est vraie à partir du graphique des activités ?",
    format: "qcm",
    choices: [
      "Foot est l’activité la plus choisie",
      "Nage est l’activité la plus choisie",
      "Danse et Basket ont la même valeur",
      "Aucune activité n’a été choisie",
    ],
    expected: ["Foot est l’activité la plus choisie"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus haute.",
    explanation:
      "La barre “Foot” vaut 12, c’est la plus grande valeur du graphique. Donc Foot est l’activité la plus choisie.",
    tags: ["cm2", "graphique", "defi", "conclusion", "activites", "qcm", "canvas"],
    canvas: graphiqueActivitesCanvas(0),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_2_conclusion_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Au marché, quelle conclusion est correcte ?",
    format: "qcm",
    choices: [
      "Les bananes sont les fruits les plus vendus",
      "Les mangues sont les fruits les plus vendus",
      "Les ananas sont les fruits les moins vendus",
      "Tous les fruits ont été vendus en même quantité",
    ],
    expected: ["Les bananes sont les fruits les plus vendus"],
    comparator: "mcq_exact",
    hint: "Compare les hauteurs des barres.",
    explanation:
      "Les valeurs sont : Ananas 24, Bananes 28, Mangues 15, Letchis 18. La plus grande valeur est 28, donc les bananes sont les fruits les plus vendus.",
    tags: ["cm2", "graphique", "defi", "fruits", "reunion", "conclusion", "qcm", "canvas"],
    canvas: graphiqueFruitsCanvas(1),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_3_total_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Quel écart y a-t-il entre le fruit le plus vendu et le moins vendu ?",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Trouve la barre la plus haute et la plus basse, puis soustrais.",
    explanation:
      "La barre la plus haute monte à 28, la plus basse à 15. L’écart est la différence entre les deux : 28 - 15 = 13. Attention, on ne compte pas les barres, on lit leur hauteur.",
    tags: ["cm2", "graphique", "defi", "fruits", "reunion", "total", "short", "canvas"],
    canvas: graphiqueFruitsCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_4_total_activites",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Combien d’élèves ont répondu au graphique des activités ?",
    format: "short",
    expected: ["38"],
    comparator: "number_equal",
    hint: "Additionne les quatre activités.",
    explanation:
      "On additionne : 12 + 9 + 7 + 10 = 38. Il y a donc 38 élèves au total.",
    tags: ["cm2", "graphique", "defi", "activites", "total", "short", "canvas"],
    canvas: graphiqueActivitesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_5_difference_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Combien de bananes de plus que de letchis ont été vendues ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Compare 28 et 18.",
    explanation:
      "Bananes : 28. Letchis : 18. On calcule 28 - 18 = 10.",
    tags: ["cm2", "graphique", "defi", "fruits", "difference", "reunion", "short", "canvas"],
    canvas: graphiqueFruitsCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_6_difference_livres",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de BD de plus que de romans ont été lues ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Compare 22 et 14.",
    explanation:
      "BD : 22. Romans : 14. On calcule 22 - 14 = 8.",
    tags: ["cm2", "graphique", "defi", "livres", "difference", "short", "canvas"],
    canvas: graphiqueLivresCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_7_temperature_ecart",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Quel est l’écart entre la température la plus élevée et la plus basse ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Cherche la plus grande valeur et la plus petite valeur.",
    explanation:
      "La température la plus élevée est 28 et la plus basse est 25. L’écart est 28 - 25 = 3.",
    tags: ["cm2", "graphique", "defi", "temperature", "ecart", "short", "canvas"],
    canvas: graphiqueMeteoCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_8_deux_groupes_sport",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Combien d’élèves ont choisi Foot ou Basket ?",
    format: "short",
    expected: ["22"],
    comparator: "number_equal",
    hint: "Additionne seulement Foot et Basket.",
    explanation:
      "Foot vaut 12 et Basket vaut 10. On additionne 12 + 10 = 22.",
    tags: ["cm2", "graphique", "defi", "activites", "regrouper", "short", "canvas"],
    canvas: graphiqueActivitesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_9_deux_groupes_livres",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Combien de livres de loisirs ont été lus si on regroupe BD et mangas ?",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "Additionne BD et Mangas.",
    explanation:
      "BD vaut 22 et Mangas vaut 18. On additionne 22 + 18 = 40.",
    tags: ["cm2", "graphique", "defi", "livres", "regrouper", "short", "canvas"],
    canvas: graphiqueLivresCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_10_camembert_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans le diagramme circulaire, combien d’élèves ont répondu au total ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Lis le total indiqué ou additionne les parts.",
    explanation:
      "On peut lire le total indiqué : 30. On peut aussi additionner les parts : 10 + 8 + 6 + 6 = 30.",
    tags: ["cm2", "graphique", "defi", "camembert", "total", "short", "canvas"],
    canvas: graphiqueCamembertGoutsCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_11_camembert_difference",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans le diagramme circulaire, combien d’élèves de plus ont choisi Vanille que Fraise ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Compare Vanille 10 et Fraise 6.",
    explanation:
      "Vanille vaut 10 et Fraise vaut 6. La différence est 10 - 6 = 4.",
    tags: ["cm2", "graphique", "defi", "camembert", "difference", "short", "canvas"],
    canvas: graphiqueCamembertGoutsCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_12_erreur_conclusion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : “Il y a 4 activités, donc chacune a été choisie par un quart des élèves.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les barres ont-elles toutes la même hauteur ?",
    explanation:
      "Non. Compter les activités ne dit rien sur le nombre d’élèves. Les barres n’ont pas la même hauteur : Foot en réunit 12, Nage seulement 7. Quatre activités ne veulent pas dire quatre parts égales.",
    tags: ["cm2", "graphique", "defi", "erreur", "conclusion", "qcm", "canvas"],
    canvas: graphiqueActivitesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_13_erreur_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : “Le total des livres lus est 53.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Additionne les quatre valeurs du graphique.",
    explanation:
      "Non. Le total correct est 14 + 22 + 18 + 9 = 63. L’élève a fait une erreur de calcul.",
    tags: ["cm2", "graphique", "defi", "erreur", "total", "qcm", "canvas"],
    canvas: graphiqueLivresCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_14_erreur_lecture",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Un élève dit : “Les mangues sont les fruits les plus vendus.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Cherche la plus grande barre.",
    explanation:
      "Non. Les mangues valent 15, alors que les bananes valent 28. Les bananes sont donc les fruits les plus vendus.",
    tags: ["cm2", "graphique", "defi", "erreur", "fruits", "qcm", "canvas"],
    canvas: graphiqueFruitsCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_15_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique une méthode pour résoudre un problème à partir d’un graphique.",
    format: "open",
    expected: ["question", "graphique", "valeurs", "comparer", "calcul", "réponse"],
    comparator: "contains_keyword",
    hint: "Commence par lire la question, puis cherche les valeurs utiles.",
    explanation:
      "Méthode : on lit d’abord la question. Ensuite, on repère les valeurs utiles dans le graphique. Puis on compare ou on calcule selon ce qui est demandé. Enfin, on rédige une réponse claire.",
    tags: ["cm2", "graphique", "defi", "open", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_16_open_conclusion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 5,
    theme: "neutral",
    text: "À partir du graphique des activités, rédige une conclusion vraie.",
    format: "open",
    expected: ["Foot", "12", "Nage", "7", "plus", "moins"],
    comparator: "contains_keyword",
    hint: "Tu peux parler de l’activité la plus choisie ou de la moins choisie.",
    explanation:
      "Exemples de conclusions vraies : Foot est l’activité la plus choisie avec 12 élèves ; Nage est l’activité la moins choisie avec 7 élèves.",
    tags: ["cm2", "graphique", "defi", "open", "conclusion", "activites", "canvas"],
    canvas: graphiqueActivitesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_graphique_defi_fixed_17_open_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi ne faut-il pas se contenter de regarder les couleurs d’un graphique ?",
    format: "open",
    expected: ["valeurs", "étiquettes", "barres", "lire", "comparer"],
    comparator: "contains_keyword",
    hint: "Les couleurs aident à voir, mais elles ne donnent pas toujours la réponse.",
    explanation:
      "Les couleurs peuvent aider à distinguer les données, mais il faut surtout lire les étiquettes et les valeurs. Pour répondre correctement, on doit comparer les nombres représentés.",
    tags: ["cm2", "graphique", "defi", "open", "erreur", "lecture"],
  },

  {
    kind: "template",
    id: "cm2_graphique_defi_tpl_1_conclusion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche la conclusion qui correspond vraiment au graphique.",
    tags: ["cm2", "graphique", "defi", "conclusion", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Quelle conclusion est vraie pour le graphique des activités ?",
          correct: "Foot est l’activité la plus choisie",
          wrongs: [
            "Nage est l’activité la plus choisie",
            "Danse vaut 20",
            "Toutes les activités ont la même valeur",
          ],
          explanation:
            "Foot vaut 12, c’est la plus grande valeur.",
          canvas: graphiqueActivitesCanvas(0),
        },
        {
          text: "Quelle conclusion est vraie pour le graphique des fruits ?",
          correct: "Les bananes sont les fruits les plus vendus",
          wrongs: [
            "Les mangues sont les plus vendues",
            "Les ananas valent 12",
            "Tous les fruits ont la même valeur",
          ],
          explanation:
            "Bananes vaut 28, c’est la plus grande valeur.",
          canvas: graphiqueFruitsCanvas(1),
        },
        {
          text: "Quelle conclusion est vraie pour le graphique des livres ?",
          correct: "Les BD sont les livres les plus lus",
          wrongs: [
            "Les documentaires sont les plus lus",
            "Les romans valent 22",
            "Tous les livres ont la même valeur",
          ],
          explanation:
            "BD vaut 22, c’est la plus grande valeur.",
          canvas: graphiqueLivresCanvas(1),
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_graphique_defi_tpl_2_totaux",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne toutes les valeurs utiles.",
    tags: ["cm2", "graphique", "defi", "total", "template", "short", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Quel est le total des activités ?",
          total: 38,
          explanation:
            "On additionne : 12 + 9 + 7 + 10 = 38.",
          canvas: graphiqueActivitesCanvas(),
        },
        {
          text: "Quel est le total des fruits vendus ?",
          total: 85,
          explanation:
            "On additionne : 24 + 28 + 15 + 18 = 85.",
          canvas: graphiqueFruitsCanvas(),
        },
        {
          text: "Quel est le total des livres lus ?",
          total: 63,
          explanation:
            "On additionne : 14 + 22 + 18 + 9 = 63.",
          canvas: graphiqueLivresCanvas(),
        },
        {
          text: "Quel est le total des menus choisis ?",
          total: 50,
          explanation:
            "On additionne : 16 + 14 + 8 + 12 = 50.",
          canvas: graphiqueCantineCanvas(),
        },
      ]);

      return {
        text: item.text,
        format: "short",
        expected: [String(item.total)],
        comparator: "number_equal",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_graphique_defi_tpl_3_differences",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Pour calculer un écart, on fait une soustraction.",
    tags: ["cm2", "graphique", "defi", "difference", "template", "short", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Combien d’élèves de plus ont choisi Foot que Danse ?",
          expected: 3,
          explanation:
            "Foot vaut 12 et Danse vaut 9. On calcule 12 - 9 = 3.",
          canvas: graphiqueActivitesCanvas(),
        },
        {
          text: "Combien de bananes de plus que de mangues ont été vendues ?",
          expected: 13,
          explanation:
            "Bananes vaut 28 et Mangues vaut 15. On calcule 28 - 15 = 13.",
          canvas: graphiqueFruitsCanvas(),
        },
        {
          text: "Combien de BD de plus que de romans ont été lues ?",
          expected: 8,
          explanation:
            "BD vaut 22 et Romans vaut 14. On calcule 22 - 14 = 8.",
          canvas: graphiqueLivresCanvas(),
        },
        {
          text: "Quel est l’écart entre jeudi et lundi ?",
          expected: 3,
          explanation:
            "Jeudi vaut 28 et lundi vaut 25. On calcule 28 - 25 = 3.",
          canvas: graphiqueMeteoCanvas(),
        },
      ]);

      return {
        text: item.text,
        format: "short",
        expected: [String(item.expected)],
        comparator: "number_equal",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_graphique_defi_tpl_4_erreurs",
    niveau: "cm2",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Relis la valeur ou refais le calcul.",
    tags: ["cm2", "graphique", "defi", "erreur", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Un élève dit : “Nage est l’activité la plus choisie.” A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. Nage vaut 7, alors que Foot vaut 12.",
          canvas: graphiqueActivitesCanvas(),
        },
        {
          text: "Un élève dit : “Les bananes sont les fruits les plus vendus.” A-t-il raison ?",
          expected: "oui",
          explanation:
            "Oui. Les bananes valent 28, c’est la plus grande valeur.",
          canvas: graphiqueFruitsCanvas(),
        },
        {
          text: "Un élève dit : “Le total des activités est 28.” A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. Le total correct est 12 + 9 + 7 + 10 = 38.",
          canvas: graphiqueActivitesCanvas(),
        },
        {
          text: "Un élève dit : “Les BD sont les livres les plus lus.” A-t-il raison ?",
          expected: "oui",
          explanation:
            "Oui. Les BD valent 22, c’est la plus grande valeur.",
          canvas: graphiqueLivresCanvas(),
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },
  // ⭐ 20/10/2026 — les générateurs situation × tournure (voir plus haut).
  ...G_LIRE,
  ...G_COMPLETER,
  ...G_INTERPRETER,
  ...G_DEFI,
];