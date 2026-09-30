// lib/tutor-v4/questionBank/4e/maths/reperage.bank.ts
//
// ⭐ NOTION OUVERTE LE 31/08/2026 : `reperage`. Avec sa sœur `vision_espace`,
// elle ferme le DERNIER bloc du programme de 4e — « Représenter l'espace ».
//
// ⭐ TROIS MICROS REPRENNENT LEURS IDENTIFIANTS DE LA 6e : `abscisse_lire`,
// `abscisse_placer`, `abscisse_fraction`. La 4e y ajoute ce que le BO place
// ici : le plan muni d'un repère, le pavé droit, la sphère.
//
// ⚠️⚠️ SON PRÉALABLE A ÉTÉ LEVÉ LE 30/08/2026. Deux gabarits de translation
// comptaient l'ordonnée VERS LE BAS (« ordonnée écran »), si bien que la
// réponse mathématiquement juste y était proposée comme LEURRE. Ouvrir le
// repérage par-dessus aurait figé l'erreur. ⭐ DANS UN REPÈRE, L'AXE DES
// ORDONNÉES MONTE — tous les items d'ici le disent, et plusieurs corrigés
// nomment l'erreur de l'écran d'ordinateur pour qu'elle cesse d'être un
// réflexe.
//
// ⛔ L'ORDRE DES COORDONNÉES EST LA DIFFICULTÉ CENTRALE, et elle ne se devine
// pas : on lit TOUJOURS l'abscisse d'abord. Un point (3 ; 5) n'est pas le point
// (5 ; 3), et c'est l'erreur qui coûte le plus de points de tout le chapitre.
// Elle a donc son gabarit dédié, pas seulement une phrase de corrigé.
//
// ⭐ TROIS CANVAS PORTENT LA NOTION :
//   · `number_line` pour la droite graduée — ⚠️ il CENTRE ses étiquettes sur
//     leur valeur, donc aucun point sur le minimum ni le maximum ;
//   · `reperage` pour le plan quadrillé, plafonné à 360 px ;
//   · `repere3d` pour le pavé droit, plafonné à 360 px lui aussi.
// Les largeurs sont posées à ces plafonds : l'échelle vaut alors 1, et les
// libellés sortent à leur taille nominale.
//
// ⛔⛔ 30/09/2026 — « DES QUESTIONS REVIENNENT SOUVENT ». Mesuré : 3 à 18
// squelettes d'énoncé par micro, jusqu'à 17 répétitions sur une série de 20.
// Chaque gabarit compose désormais une SITUATION (plans, cartes, objets, villes
// du monde…) × une TOURNURE (3 ou 4 façons de poser la même question). Les
// canvas gardent les noms de points et les coordonnées du texte.
// Mesure : scripts/mesurer-squelettes-coach.ts 4e reperage.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ⚠️ On écarte les doublons ET la bonne réponse, puis on coupe à trois : il faut
// donc fournir PLUS de quatre leurres, sinon le QCM tombe à trois lignes.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** « le plan, muni d'un repère » mais « la carte, munie d'un repère ». */
const muni = (lieu: string) => (/^(la|une) /.test(lieu) ? "munie" : "muni");

/** L'accord : 0 et 1 au singulier, au-delà au pluriel. */
function pl(n: number, sing: string, plur = sing + "s") {
  return Math.abs(n) > 1 ? plur : sing;
}

/** Les noms de points, pour que l'élève ne reconnaisse pas une figure apprise. */
const NOMS_POINTS = ["A", "B", "C", "D", "E", "F", "M", "N", "P", "R", "S", "T"];

/** Des prénoms variés, pour les petites mises en scène. */
const PRENOMS = ["Léa", "Tom", "Inès", "Noah", "Hugo", "Maya", "Karim", "Zoé", "Jade", "Enzo", "Lina", "Sacha"];

/**
 * La droite graduée. ⚠️ `number_line` centre ses étiquettes sur leur valeur :
 * un point posé sur le minimum ou le maximum déborderait de la moitié de sa
 * largeur. On garde donc une marge d'un pas à chaque bout.
 */
function droite(min: number, max: number, step: number, points: { value: number; label?: string }[]) {
  return {
    kind: "number_line" as const,
    min,
    max,
    step,
    points: points.map((p) => ({ ...p, color: "#0f172a" })),
    display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
    size: { width: 320, height: 140 },
  };
}

/** Le plan quadrillé, à la largeur du plafond du canvas. */
function plan(points: { x: number; y: number; label?: string; color?: string }[], cols = 8, rows = 8) {
  return {
    kind: "reperage" as const,
    grid: { rows, cols },
    points,
    size: { width: 360, height: 320 },
  };
}

/* ---------------------------------------------------------------------------
   LES TABLES DE SITUATIONS
--------------------------------------------------------------------------- */

/** Les supports d'une droite graduée ; `neg` : un nombre négatif y a un sens. */
const SUPPORTS_DROITE = [
  { s: "une droite graduée", neg: true },
  { s: "une droite graduée tracée au tableau", neg: true },
  { s: "l'axe horizontal d'un thermomètre (unité : 1 °C)", neg: true },
  { s: "une frise des altitudes, le niveau de la mer étant l'origine (unité : 1 km)", neg: true },
  { s: "le ruban gradué d'une piste de saut en longueur (unité : 1 m)", neg: false },
  { s: "la règle d'une couturière (unité : 1 dm)", neg: false },
  { s: "la jauge d'un réservoir (unité : 1 L)", neg: false },
  { s: "le profil d'un sentier de randonnée (unité : 1 km)", neg: false },
  { s: "la ligne de temps d'un morceau de musique (unité : une mesure)", neg: false },
  { s: "la barre de lecture d'une vidéo (unité : 1 min)", neg: false },
  { s: "le mètre ruban d'un bricoleur (unité : 1 m)", neg: false },
  { s: "le schéma d'une piste d'athlétisme (unité : un tour)", neg: false },
  { s: "l'axe d'un compte en banque (unité : 100 €)", neg: true },
];

/** Des quantités entre 1 et 4 unités, qu'on écrit en fraction. */
const QUANTITES_FRACTION: ((f: string) => string)[] = [
  (f) => `Un randonneur a parcouru ${f} km depuis le départ.`,
  (f) => `Un bidon contient ${f} L d'eau.`,
  (f) => `Un film dure ${f} h.`,
  (f) => `Une planche de bois mesure ${f} m.`,
  (f) => `Une coureuse a fait ${f} tours de piste.`,
  (f) => `Un gâteau pèse ${f} kg.`,
  (f) => `Une nageuse a parcouru ${f} longueurs de bassin.`,
  (f) => `Une corde à linge mesure ${f} m.`,
  (f) => `Un paquet de riz pèse ${f} kg.`,
  (f) => `Une recette demande ${f} tasses de farine.`,
  (f) => `Une musicienne a répété ${f} h ce week-end.`,
  (f) => `Une tortue a avancé de ${f} m en une minute.`,
  (f) => `Le réservoir d'une tondeuse contient ${f} L d'essence.`,
  (f) => `Au goûter, la classe a mangé ${f} pizzas.`,
  (f) => `Sur une droite graduée, un point a pour abscisse ${f}.`,
];

/** Des plans munis d'un repère, et ce qu'on y a marqué. */
const LIEUX_PLAN = [
  { lieu: "le plan d'un camping", objet: "la tente de la famille Martin" },
  { lieu: "la carte d'une chasse au trésor", objet: "le coffre" },
  { lieu: "le plan d'un potager", objet: "le pied de tomates" },
  { lieu: "le plan d'un parc", objet: "la fontaine" },
  { lieu: "le plan d'un quartier", objet: "la boulangerie" },
  { lieu: "la grille d'une bataille navale", objet: "le sous-marin" },
  { lieu: "la carte d'une course d'orientation", objet: "la balise numéro un" },
  { lieu: "le plan d'un musée", objet: "la statue grecque" },
  { lieu: "le plan d'une salle de classe", objet: "le bureau du professeur" },
  { lieu: "le plan d'un stade", objet: "le poteau de corner" },
  { lieu: "le plan d'une plage", objet: "le poste de secours" },
  { lieu: "le plan d'un zoo", objet: "l'enclos des girafes" },
  { lieu: "le plan du marché forain de Saint-Pierre", objet: "l'étal de litchis" },
  { lieu: "la carte d'un jeu vidéo d'aventure", objet: "le château" },
  { lieu: "le plan d'un aéroport", objet: "la tour de contrôle" },
];

/** Ce qui se déplace verticalement sur un quadrillage. `nord` : le haut est le nord. */
const MOBILES = [
  { qui: "un pion", f: false, ou: "sur un plateau de jeu quadrillé", u: ["case", "cases"], nord: false },
  { qui: "un robot aspirateur", f: false, ou: "sur le plan quadrillé d'un salon", u: ["carreau", "carreaux"], nord: false },
  { qui: "un bateau", f: false, ou: "sur une carte marine quadrillée, le nord en haut", u: ["unité", "unités"], nord: true },
  { qui: "une randonneuse", f: true, ou: "sur une carte de randonnée quadrillée, le nord en haut", u: ["carreau", "carreaux"], nord: true },
  { qui: "une fourmi", f: true, ou: "sur une feuille quadrillée", u: ["carreau", "carreaux"], nord: false },
  { qui: "une voiture télécommandée", f: true, ou: "sur le plan quadrillé d'un parking", u: ["carreau", "carreaux"], nord: false },
  { qui: "un ballon", f: false, ou: "sur le schéma quadrillé d'un terrain de handball", u: ["carreau", "carreaux"], nord: false },
  { qui: "un point", f: false, ou: "dans un repère", u: ["unité", "unités"], nord: false },
  { qui: "une coccinelle", f: true, ou: "sur un carrelage", u: ["carreau", "carreaux"], nord: false },
  { qui: "une tortue marine équipée d'une balise", f: true, ou: "sur une carte quadrillée, le nord en haut", u: ["unité", "unités"], nord: true },
  { qui: "une perle", f: true, ou: "sur une grille de broderie", u: ["carreau", "carreaux"], nord: false },
  { qui: "un bus", f: false, ou: "sur le plan quadrillé d'une ville, le nord en haut", u: ["carreau", "carreaux"], nord: true },
];

/** Des objets en forme de pavé droit : unité et dimensions plausibles. */
const PAVES = [
  { objet: "un pavé droit", u: "", L: [2, 5], l: [2, 4], h: [2, 4] },
  { objet: "une boîte à chaussures", u: "dm", L: [3, 4], l: [2, 2], h: [1, 2] },
  { objet: "un aquarium", u: "dm", L: [5, 8], l: [3, 4], h: [3, 5] },
  { objet: "un carton de déménagement", u: "dm", L: [4, 6], l: [3, 4], h: [3, 4] },
  { objet: "un conteneur de chantier", u: "m", L: [4, 6], l: [2, 3], h: [2, 3] },
  { objet: "une chambre", u: "m", L: [3, 5], l: [3, 4], h: [2, 3] },
  { objet: "un bac à compost", u: "dm", L: [6, 10], l: [5, 8], h: [6, 9] },
  { objet: "une valise", u: "dm", L: [5, 7], l: [2, 3], h: [4, 5] },
  { objet: "une serre de jardin", u: "m", L: [3, 6], l: [2, 3], h: [2, 3] },
  { objet: "une piscine hors-sol", u: "m", L: [4, 8], l: [3, 4], h: [1, 1] },
  { objet: "une caisse de pommes", u: "dm", L: [5, 6], l: [3, 4], h: [3, 3] },
  { objet: "une benne à gravats", u: "m", L: [4, 6], l: [2, 2], h: [1, 2] },
  { objet: "une boîte de jeu de société", u: "dm", L: [3, 4], l: [2, 3], h: [1, 1] },
];

/** Les villes de repères, pour la latitude et la longitude. `latDeg` sert aux saisons. */
const VILLES = [
  { nom: "Saint-Denis de La Réunion", lat: "20° 53′ SUD", lon: "55° 27′ EST", hemisphere: "sud", latDeg: 21 },
  { nom: "Paris", lat: "48° 51′ NORD", lon: "2° 21′ EST", hemisphere: "nord", latDeg: 49 },
  { nom: "Quito", lat: "0° 13′ SUD", lon: "78° 30′ OUEST", hemisphere: "sud", latDeg: 0 },
  { nom: "Sydney", lat: "33° 52′ SUD", lon: "151° 12′ EST", hemisphere: "sud", latDeg: 34 },
  { nom: "Reykjavik", lat: "64° 08′ NORD", lon: "21° 56′ OUEST", hemisphere: "nord", latDeg: 64 },
  { nom: "Port-Louis (Maurice)", lat: "20° 10′ SUD", lon: "57° 30′ EST", hemisphere: "sud", latDeg: 20 },
  { nom: "New York", lat: "40° 43′ NORD", lon: "74° 00′ OUEST", hemisphere: "nord", latDeg: 41 },
  { nom: "Tokyo", lat: "35° 41′ NORD", lon: "139° 41′ EST", hemisphere: "nord", latDeg: 36 },
  { nom: "Durban", lat: "29° 51′ SUD", lon: "31° 01′ EST", hemisphere: "sud", latDeg: 30 },
  { nom: "Rio de Janeiro", lat: "22° 54′ SUD", lon: "43° 10′ OUEST", hemisphere: "sud", latDeg: 23 },
  { nom: "Dakar", lat: "14° 42′ NORD", lon: "17° 27′ OUEST", hemisphere: "nord", latDeg: 15 },
  { nom: "Montréal", lat: "45° 30′ NORD", lon: "73° 34′ OUEST", hemisphere: "nord", latDeg: 46 },
  { nom: "Nouméa", lat: "22° 16′ SUD", lon: "166° 27′ EST", hemisphere: "sud", latDeg: 22 },
  { nom: "Moscou", lat: "55° 45′ NORD", lon: "37° 37′ EST", hemisphere: "nord", latDeg: 56 },
  { nom: "Athènes", lat: "37° 59′ NORD", lon: "23° 44′ EST", hemisphere: "nord", latDeg: 38 },
  { nom: "Buenos Aires", lat: "34° 36′ SUD", lon: "58° 23′ OUEST", hemisphere: "sud", latDeg: 35 },
  { nom: "Antananarivo", lat: "18° 53′ SUD", lon: "47° 31′ EST", hemisphere: "sud", latDeg: 19 },
  { nom: "Bombay", lat: "19° 04′ NORD", lon: "72° 53′ EST", hemisphere: "nord", latDeg: 19 },
  { nom: "Pointe-à-Pitre", lat: "16° 14′ NORD", lon: "61° 32′ OUEST", hemisphere: "nord", latDeg: 16 },
  { nom: "Lima", lat: "12° 03′ SUD", lon: "77° 03′ OUEST", hemisphere: "sud", latDeg: 12 },
  { nom: "Nairobi", lat: "1° 17′ SUD", lon: "36° 49′ EST", hemisphere: "sud", latDeg: 1 },
  { nom: "Singapour", lat: "1° 17′ NORD", lon: "103° 51′ EST", hemisphere: "nord", latDeg: 1 },
  { nom: "Brest", lat: "48° 23′ NORD", lon: "4° 29′ OUEST", hemisphere: "nord", latDeg: 48 },
  { nom: "Marseille", lat: "43° 18′ NORD", lon: "5° 22′ EST", hemisphere: "nord", latDeg: 43 },
];

export const reperageBank: TutorBankItemV4[] = [
  /* =========================================================================
     ABSCISSE_LIRE — réactivation 6e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_abscisse_lire_tpl_1_entier",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "abscisse_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les graduations à partir de zéro, dans le bon sens.",
    tags: ["reperage", "abscisse", "droite_graduee", "template", "canvas"],
    generate: () => {
      const pas = randomChoice([1, 2, 5]);
      const min = -5 * pas;
      const max = 5 * pas;
      const v = randomInt(-4, 4) * pas;
      const nom = randomChoice(NOMS_POINTS);
      const nb = Math.abs(v / pas);
      return {
        text: `Sur cette droite graduée, quelle est l'abscisse du point ${nom} ?`,
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        explanation:
          "Définition : l'abscisse d'un point est le nombre qui lui correspond sur la droite graduée. C'est une COORDONNÉE, pas une distance.\n\n" +
          "Méthode : on part de zéro et on compte les graduations, en tenant compte du pas — ici chaque graduation vaut " +
          `${pas}.\n\n` +
          (v === 0
            ? `Calcul : le point ${nom} est sur l'origine, donc son abscisse vaut 0.\n\n`
            : `Calcul : le point ${nom} est ${v < 0 ? "à gauche" : "à droite"} de l'origine, à ${nb} ${pl(nb, "graduation")}, donc son abscisse vaut ${v}.\n\n`) +
          `Conclusion : ⚠️ l'abscisse d'un point à gauche de zéro est NÉGATIVE. Une distance est toujours positive, une abscisse non — c'est ce qui les distingue.`,
        canvas: droite(min, max, pas, [{ value: v, label: nom }]),
      };
    },
  },
  {
    kind: "template",
    id: "4e_abscisse_lire_tpl_2_deux_points",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "abscisse_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "La distance entre deux points est la différence de leurs abscisses, dans l'ordre qui donne un nombre positif.",
    tags: ["reperage", "abscisse", "distance", "template", "canvas"],
    generate: () => {
      const pas = randomChoice([1, 2]);
      const a = randomInt(-4, 1) * pas;
      const b = randomInt(2, 4) * pas;
      const [n1, n2] = shuffle([...NOMS_POINTS]).slice(0, 2);
      return {
        text: `Sur cette droite graduée, quelle est la DISTANCE entre les points ${n1} et ${n2} ?`,
        format: "short",
        expected: [String(b - a)],
        comparator: "number_equal",
        explanation:
          "Définition : la distance entre deux points est un nombre POSITIF — elle ne dépend pas de l'ordre dans lequel on les nomme.\n\n" +
          "Méthode : on soustrait la plus petite abscisse à la plus grande. Ou, ce qui revient au même, on compte les graduations entre les deux.\n\n" +
          `Calcul : les abscisses valent ${a} et ${b}, donc la distance vaut ${b} − (${a}) = ${b - a}.\n\n` +
          `Conclusion : ⚠️ soustraire un nombre négatif revient à l'AJOUTER — c'est là que le calcul dérape. Et ${a} − ${b} = ${a - b} n'est pas une distance : une distance ne peut pas être négative.`,
        canvas: droite(-5 * pas, 5 * pas, pas, [
          { value: a, label: n1 },
          { value: b, label: n2 },
        ]),
      };
    },
  },

  /* =========================================================================
     ABSCISSE_PLACER — réactivation 6e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_abscisse_placer_tpl_1_ou",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "abscisse_placer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le signe dit le côté, le nombre dit combien de graduations.",
    tags: ["reperage", "abscisse", "placer", "qcm", "template", "canvas"],
    generate: () => {
      const pas = randomChoice([1, 2, 5]);
      const v = randomInt(-4, 4) * pas;
      const nom = randomChoice(NOMS_POINTS);
      const cote = v < 0 ? "à gauche de l'origine" : v > 0 ? "à droite de l'origine" : "sur l'origine";
      const nb = Math.abs(v / pas);
      const g = (n: number) => `${n} ${pl(n, "graduation")}`;
      const correct = v === 0 ? "sur l'origine" : `${cote}, à ${g(nb)}`;
      return {
        text: `Où faut-il placer le point ${nom} d'abscisse ${v} sur cette droite graduée de pas ${pas} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "sur l'origine",
          `à gauche de l'origine, à ${g(nb)}`,
          `à droite de l'origine, à ${g(nb)}`,
          `${cote}, à ${g(Math.abs(v))}`,
          `${cote}, à ${g(nb + 1)}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : placer un point d'abscisse donnée, c'est trouver la graduation qui porte ce nombre.\n\n" +
          "Méthode : le SIGNE dit de quel côté de l'origine, et le nombre divisé par le pas dit combien de graduations.\n\n" +
          `Calcul : ${v} ${v < 0 ? "est négatif, donc à gauche" : v > 0 ? "est positif, donc à droite" : "vaut zéro, donc sur l'origine"}. Et ${Math.abs(v)} ÷ ${pas} = ${g(nb)}.\n\n` +
          `Conclusion : ⚠️ quand le pas ne vaut pas 1, compter ${Math.abs(v)} graduations au lieu de ${nb} est l'erreur classique. On divise toujours par le pas.`,
        canvas: droite(-5 * pas, 5 * pas, pas, []),
      };
    },
  },

  {
    // ⭐ SECOND GABARIT EXIGÉ PAR LE MODE COMPLET, qui oppose deux questions et
    // ne peut pas le faire avec un seul. Il prend le geste par l'autre bout :
    // au lieu de dire OÙ placer un point, on demande LEQUEL de deux points est
    // le plus à droite — c'est-à-dire de comparer deux relatifs sur la droite.
    kind: "template",
    id: "4e_abscisse_placer_tpl_2_lequel_droite",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "abscisse_placer",
    difficulty: 3,
    theme: "neutral",
    hint: "Sur une droite graduée, le plus à droite est le plus GRAND.",
    tags: ["reperage", "abscisse", "comparer", "qcm", "template", "canvas"],
    generate: () => {
      const pas = randomChoice([1, 2, 5]);
      const a = randomInt(-4, 4) * pas;
      let b = randomInt(-4, 4) * pas;
      while (b === a) b = randomInt(-4, 4) * pas;
      const [n1, n2] = shuffle([...NOMS_POINTS]).slice(0, 2);
      const correct = a > b ? n1 : n2;
      return {
        text: `Sur cette droite graduée, le point ${n1} a pour abscisse ${a} et le point ${n2} a pour abscisse ${b}. Lequel est le plus à DROITE ?`,
        format: "qcm",
        choices: shuffle([n1, n2]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : sur une droite graduée, un point est à droite d'un autre exactement quand son abscisse est plus GRANDE.\n\n" +
          "Méthode : on compare les deux nombres — sans oublier que chez les négatifs, l'ordre s'inverse par rapport aux distances.\n\n" +
          `Calcul : ${Math.max(a, b)} > ${Math.min(a, b)}, donc ${correct} est le plus à droite.\n\n` +
          (a < 0 && b < 0
            ? `Conclusion : ⚠️ les deux abscisses sont négatives, et c'est là que le piège se referme : ${Math.max(a, b)} est plus GRAND que ${Math.min(a, b)}, même si son écart à zéro est plus petit. « Plus grand » et « plus loin de zéro » ne veulent pas dire la même chose.`
            : "Conclusion : ⭐ la droite graduée range les nombres : ce qui est à droite est plus grand, toujours."),
        canvas: droite(-5 * pas, 5 * pas, pas, [
          { value: a, label: n1 },
          { value: b, label: n2 },
        ]),
      };
    },
  },

  /* =========================================================================
     ABSCISSE_FRACTION — la puce 4e-A-comparaisons-4
  ========================================================================= */
  {
    kind: "template",
    id: "4e_abscisse_fraction_tpl_1_lire",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "abscisse_fraction",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte en combien de parts chaque unité est découpée.",
    tags: ["reperage", "abscisse", "fraction", "qcm", "template"],
    generate: () => {
      const den = randomChoice([2, 3, 4, 5]);
      let num = randomInt(1, den * 3 - 1);
      while (num % den === 0) num = randomInt(1, den * 3 - 1);
      const sup = randomChoice(SUPPORTS_DROITE);
      const negatif = sup.neg && Math.random() < 0.4;
      const signe = negatif ? "-" : "";
      const nom = randomChoice(NOMS_POINTS);
      const cote = negatif ? "à gauche" : "à droite";
      const parts = `${num} ${pl(num, "part")}`;
      const grads = `${num} ${pl(num, "graduation")}`;
      const correct = `$${signe}\\dfrac{${num}}{${den}}$`;
      const tournures = [
        `Sur ${sup.s}, chaque unité est découpée en ${den} parts égales. Le point ${nom} est ${cote} de l'origine, à ${parts}. Quelle est son abscisse ?`,
        `Sur ${sup.s}, une unité compte ${den} graduations. En partant de zéro, on compte ${grads} vers la ${negatif ? "gauche" : "droite"} et on place le point ${nom}. Quelle abscisse faut-il écrire sous ${nom} ?`,
        `Le point ${nom} est à ${grads} ${cote} de zéro sur ${sup.s}, où chaque unité est partagée en ${den} parts égales. Quel nombre repère ${nom} ?`,
        `Quelle est l'abscisse du point ${nom} ? Sur ${sup.s}, il y a ${den} graduations par unité, et ${nom} se trouve ${cote} de l'origine, ${grads} plus loin.`,
      ];
      return {
        text: randomChoice(tournures),
        format: "qcm",
        choices: makeChoices(correct, [
          `$${signe}\\dfrac{${den}}{${num}}$`,
          `$${negatif ? "" : "-"}\\dfrac{${num}}{${den}}$`,
          `$${signe}${num}$`,
          `$${signe}\\dfrac{${num}}{${den + 1}}$`,
          `$${signe}\\dfrac{${num + 1}}{${den}}$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : quand chaque unité est découpée en parts égales, chaque graduation vaut une FRACTION d'unité.\n\n" +
          `Méthode : le DÉNOMINATEUR est le nombre de parts par unité — ici ${den}. Le NUMÉRATEUR est le nombre de parts comptées depuis l'origine.\n\n` +
          `Calcul : ${parts} de $\\dfrac{1}{${den}}$ ${num > 1 ? "font" : "fait"} $\\dfrac{${num}}{${den}}$, ${negatif ? "et le point est à gauche, donc l'abscisse est négative" : "et le point est à droite, donc l'abscisse est positive"}.\n\n` +
          `Conclusion : ⚠️ retourner la fraction — écrire $\\dfrac{${den}}{${num}}$ — est le piège le plus fréquent. Le dénominateur compte les PARTS D'UNE UNITÉ, jamais les parts comptées.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_abscisse_fraction_tpl_2_encadrer",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "abscisse_fraction",
    difficulty: 4,
    theme: "neutral",
    hint: "Entre quels deux entiers consécutifs cette fraction se place-t-elle ?",
    tags: ["reperage", "abscisse", "fraction", "encadrer", "template"],
    generate: () => {
      const den = randomChoice([3, 4, 5, 6, 7]);
      let num = randomInt(den + 1, den * 4 - 1);
      while (num % den === 0) num = randomInt(den + 1, den * 4 - 1);
      const bas = Math.floor(num / den);
      const f = `$\\dfrac{${num}}{${den}}$`;
      const intro = randomChoice(QUANTITES_FRACTION)(f);
      const tournures = [
        `${intro} Entre quels deux entiers consécutifs se place ${f} sur une droite graduée ? Donne l'entier de GAUCHE.`,
        `${intro} Quel est le plus grand nombre entier inférieur à ${f} ?`,
        `${intro} On encadre ${f} par deux entiers consécutifs : … < ${f} < … . Quel entier écrit-on à GAUCHE ?`,
        `${intro} Placé sur une droite graduée en unités, ${f} tombe entre deux graduations entières. Quelle est la plus petite des deux ?`,
      ];
      return {
        text: randomChoice(tournures),
        format: "short",
        expected: [String(bas)],
        comparator: "number_equal",
        explanation:
          "Définition : placer une fraction, c'est d'abord savoir entre quels entiers elle tombe.\n\n" +
          "Méthode : on fait la division euclidienne du numérateur par le dénominateur. Le QUOTIENT est l'entier de gauche.\n\n" +
          `Calcul : ${num} ÷ ${den} donne ${bas} et il reste ${num - bas * den}. Donc $\\dfrac{${num}}{${den}}$ est entre ${bas} et ${bas + 1}.\n\n` +
          `Conclusion : ⭐ le reste dit où exactement : ${num - bas * den} ${pl(num - bas * den, "part")} sur ${den} après ${bas}. C'est ici que la division euclidienne SERT à quelque chose de visible.`,
      };
    },
  },

  /* =========================================================================
     REPERE_PLAN — abscisse, ordonnée, et l'ordre qui coûte cher
  ========================================================================= */
  {
    kind: "template",
    id: "4e_repere_plan_tpl_1_lire",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "repere_plan",
    difficulty: 3,
    theme: "neutral",
    hint: "On lit l'abscisse d'abord : combien à droite, puis combien en haut.",
    tags: ["reperage", "plan", "coordonnees", "qcm", "template", "canvas"],
    generate: () => {
      const x = randomInt(1, 7);
      const y = randomInt(1, 7);
      const nom = randomChoice(NOMS_POINTS);
      const { lieu, objet } = randomChoice(LIEUX_PLAN);
      const correct = `(${x} ; ${y})`;
      const tournures = [
        `Dans ce repère, quelles sont les coordonnées du point ${nom} ?`,
        `Sur ${lieu}, ${muni(lieu)} d'un repère, ${objet} se trouve au point ${nom}. Quelles sont les coordonnées de ${nom} ?`,
        `Lis les coordonnées du point ${nom}, qui marque ${objet} sur ${lieu}.`,
        `Quelles coordonnées faut-il écrire à côté du point ${nom}, qui représente ${objet} sur ${lieu} ?`,
      ];
      return {
        text: randomChoice(tournures),
        format: "qcm",
        choices: makeChoices(correct, [
          `(${y} ; ${x})`,
          `(${x} ; ${y + 1})`,
          `(${x + 1} ; ${y})`,
          `(${x} ; ${-y})`,
          `(${-x} ; ${y})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : les coordonnées d'un point s'écrivent (abscisse ; ordonnée) — l'ABSCISSE D'ABORD, toujours.\n\n" +
          "Méthode : on descend du point jusqu'à l'axe horizontal pour lire l'abscisse, puis on va du point jusqu'à l'axe vertical pour lire l'ordonnée.\n\n" +
          `Calcul : le point ${nom} est à ${x} vers la droite et à ${y} vers le haut, donc ses coordonnées sont (${x} ; ${y}).\n\n` +
          `Conclusion : ⚠️ (${y} ; ${x}) désigne un AUTRE point${x === y ? " — sauf ici, où les deux coordonnées sont égales" : ""}. L'ordre n'est pas une convention d'écriture : il change le point désigné.`,
        canvas: plan([{ x, y, label: nom, color: "#2563eb" }]),
      };
    },
  },
  {
    // ⭐ LE GABARIT DE L'ORDRE DES COORDONNÉES. C'est l'erreur la plus coûteuse
    // du chapitre, et elle mérite mieux qu'une phrase de corrigé : ici, les
    // deux points sont DESSINÉS ensemble, et l'élève voit qu'ils sont
    // différents.
    kind: "template",
    id: "4e_repere_plan_tpl_2_ordre",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "repere_plan",
    difficulty: 4,
    theme: "neutral",
    hint: "Place les deux points et regarde s'ils tombent au même endroit.",
    tags: ["reperage", "plan", "ordre", "piege", "qcm", "template", "canvas"],
    generate: () => {
      const x = randomInt(1, 6);
      const y = randomInt(1, 6);
      const memePoint = x === y;
      const OUI = "oui : ici, les deux coordonnées sont égales";
      const NON = "non : ce sont deux points différents";
      const correct = memePoint ? OUI : NON;
      const [p1, p2] = shuffle([...PRENOMS]).slice(0, 2);
      const [n1, n2] = shuffle([...NOMS_POINTS]).slice(0, 2);
      const { lieu, objet } = randomChoice(LIEUX_PLAN);
      const tournures = [
        `Le point de coordonnées (${x} ; ${y}) et le point de coordonnées (${y} ; ${x}) sont-ils au même endroit ?`,
        `Sur ${lieu}, ${p1} dessine ${objet} au point (${x} ; ${y}), et ${p2} au point (${y} ; ${x}). Les deux dessins sont-ils au même endroit ?`,
        `${p1} lit la position de ${objet} sur ${lieu} : (${x} ; ${y}). En la recopiant, ${p2} écrit (${y} ; ${x}). Le point recopié est-il le même que le point lu ?`,
        `Les points ${n1}(${x} ; ${y}) et ${n2}(${y} ; ${x}) sont-ils confondus, c'est-à-dire au même endroit ?`,
      ];
      return {
        text: randomChoice(tournures),
        format: "qcm",
        choices: shuffle([OUI, NON]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : (abscisse ; ordonnée) est un couple ORDONNÉ. Échanger les deux nombres désigne un autre point.\n\n" +
          "Méthode : on place les deux et on regarde.\n\n" +
          (memePoint
            ? `Calcul : ici ${x} = ${y}, donc les deux écritures désignent le même point — le seul cas où l'échange ne change rien.\n\nConclusion : oui, et c'est une exception. Sur la diagonale, abscisse et ordonnée sont égales.`
            : `Calcul : (${x} ; ${y}) est à ${x} vers la droite et ${y} vers le haut ; (${y} ; ${x}) est à ${y} vers la droite et ${x} vers le haut.\n\nConclusion : non. ⭐ Les deux points sont symétriques par rapport à la diagonale — et ils ne se confondent que lorsque les deux coordonnées sont égales.`),
        canvas: plan(
          memePoint
            ? [{ x, y, label: "les deux", color: "#7c3aed" }]
            : [
                { x, y, label: `(${x} ; ${y})`, color: "#2563eb" },
                { x: y, y: x, label: `(${y} ; ${x})`, color: "#ef4444" },
              ]
        ),
      };
    },
  },
  {
    // ⭐⭐ LE GABARIT QUI NOMME L'ERREUR DE L'ÉCRAN. Deux gabarits de
    // translation de cette classe comptaient l'ordonnée vers le bas jusqu'au
    // 30/08/2026 ; l'élève a pu l'apprendre. On la lui reprend ici.
    kind: "template",
    id: "4e_repere_plan_tpl_3_sens_des_axes",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "repere_plan",
    difficulty: 4,
    theme: "neutral",
    hint: "Dans un repère, l'axe des ordonnées monte.",
    tags: ["reperage", "plan", "axes", "piege", "qcm", "template"],
    generate: () => {
      const x = randomInt(1, 6);
      const y = randomInt(2, 6);
      const d = randomInt(1, 3);
      const versLeHaut = Math.random() < 0.5;
      const m = randomChoice(MOBILES);
      const unite = `${d} ${d > 1 ? m.u[1] : m.u[0]}`;
      const dir = m.nord
        ? versLeHaut ? "vers le NORD" : "vers le SUD"
        : versLeHaut ? "vers le HAUT" : "vers le BAS";
      const correct = versLeHaut ? `(${x} ; ${y + d})` : `(${x} ; ${y - d})`;
      const tournures = [
        `${cap(m.qui)}, ${m.ou}, est au point de coordonnées (${x} ; ${y}). ${m.f ? "Elle" : "Il"} avance de ${unite} ${dir}. Quelles sont ses nouvelles coordonnées ?`,
        `${cap(m.ou)}, ${m.qui} part du point (${x} ; ${y}) et avance de ${unite} ${dir}. Quelles sont les coordonnées de son point d'arrivée ?`,
        `${cap(m.qui)} part de (${x} ; ${y}), ${m.ou}. Après un déplacement de ${unite} ${dir}, où arrive-t-${m.f ? "elle" : "il"} ? Donne ses coordonnées.`,
        `Point de départ : (${x} ; ${y}), ${m.ou}. Déplacement : ${unite} ${dir}. Quel est le point d'arrivée ?`,
      ];
      return {
        text: randomChoice(tournures),
        format: "qcm",
        choices: makeChoices(correct, [
          versLeHaut ? `(${x} ; ${y - d})` : `(${x} ; ${y + d})`,
          `(${x + d} ; ${y})`,
          `(${x - d} ; ${y})`,
          `(${y} ; ${x})`,
          `(${x} ; ${d})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans un repère, l'axe des ordonnées MONTE. Aller vers le haut AJOUTE à l'ordonnée ; aller vers le bas en RETIRE.\n\n" +
          "Méthode : un déplacement vertical ne touche que l'ordonnée ; l'abscisse ne change pas." +
          (m.nord ? " Sur cette carte, le nord est en haut : aller vers le nord, c'est monter ; vers le sud, c'est descendre." : "") +
          "\n\n" +
          `Calcul : ${y} ${versLeHaut ? "+" : "−"} ${d} = ${versLeHaut ? y + d : y - d}, et l'abscisse reste ${x}.\n\n` +
          `Conclusion : ⚠️⚠️ C'EST L'INVERSE SUR UN ÉCRAN D'ORDINATEUR, où l'origine est en haut à gauche et où descendre AUGMENTE la coordonnée. Un repère de mathématiques n'est pas un écran : ici, monter augmente.`,
      };
    },
  },

  /* =========================================================================
     REPERE_ESPACE — le pavé droit, trois coordonnées
  ========================================================================= */
  {
    kind: "template",
    id: "4e_repere_espace_tpl_1_sommet",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "repere_espace",
    difficulty: 4,
    theme: "neutral",
    hint: "Trois nombres : combien en largeur, en profondeur, en hauteur.",
    tags: ["reperage", "espace", "pave", "qcm", "template", "canvas"],
    generate: () => {
      const p = randomChoice(PAVES);
      const L = randomInt(p.L[0], p.L[1]);
      const l = randomInt(p.l[0], p.l[1]);
      const h = randomInt(p.h[0], p.h[1]);
      const u = (n: number) => (p.u ? `${n} ${p.u}` : String(n));
      const cas = randomChoice([
        { nom: "sommet opposé à l'origine", c: [L, l, h] },
        { nom: "sommet situé juste au-dessus de l'origine", c: [0, 0, h] },
        { nom: "sommet situé au bout de l'arête posée sur l'axe des abscisses", c: [L, 0, 0] },
        { nom: "sommet situé au bout de l'arête posée sur l'axe des profondeurs", c: [0, l, 0] },
        { nom: "sommet de la face du bas le plus éloigné de l'origine", c: [L, l, 0] },
        { nom: `sommet situé juste au-dessus du point (${L} ; 0 ; 0)`, c: [L, 0, h] },
        { nom: `sommet situé juste au-dessus du point (0 ; ${l} ; 0)`, c: [0, l, h] },
      ]);
      const correct = `(${cas.c[0]} ; ${cas.c[1]} ; ${cas.c[2]})`;
      const estPave = p.objet === "un pavé droit";
      const forme = estPave ? cap(p.objet) : `${cap(p.objet)}, en forme de pavé droit,`;
      const tournures = [
        `${forme} a pour longueur ${u(L)} (le long de l'axe des abscisses), pour largeur ${u(l)} (en profondeur) et pour hauteur ${u(h)}. L'un de ses sommets est à l'origine du repère. Quelles sont les coordonnées du ${cas.nom} ?`,
        `On repère ${p.objet}${estPave ? "" : ", en forme de pavé droit,"} avec un sommet à l'origine : ${u(L)} le long de l'axe des abscisses, ${u(l)} en profondeur et ${u(h)} en hauteur. Où se trouve le ${cas.nom} ? Donne ses coordonnées.`,
        `Dans un repère de l'espace, ${p.objet} occupe un pavé droit : ${u(L)} en abscisse, ${u(l)} en profondeur, ${u(h)} en altitude, et un sommet à l'origine. Quelles coordonnées a le ${cas.nom} ?`,
      ];
      return {
        text: randomChoice(tournures),
        format: "qcm",
        choices: makeChoices(correct, [
          `(${L} ; ${l} ; ${h})`,
          `(0 ; 0 ; ${h})`,
          `(${L} ; 0 ; 0)`,
          `(0 ; ${l} ; 0)`,
          `(${L} ; ${l} ; 0)`,
          `(${L} ; 0 ; ${h})`,
          `(0 ; ${l} ; ${h})`,
          `(${h} ; ${l} ; ${L})`,
          `(0 ; 0 ; 0)`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans l'espace, il faut TROIS nombres pour désigner un point — deux ne suffisent plus.\n\n" +
          "Méthode : on lit dans l'ordre (abscisse ; profondeur ; altitude) — la même règle que dans le plan, avec un nombre de plus.\n\n" +
          `Calcul : le ${cas.nom} se trouve à ${cas.c[0]} sur le premier axe, ${cas.c[1]} sur le deuxième et ${cas.c[2]} sur le troisième.\n\n` +
          `Conclusion : ⭐ un sommet posé sur un axe a DEUX coordonnées nulles ; un sommet sur une face qui touche l'origine en a UNE. Compter les zéros dit tout de suite où l'on est.`,
        canvas: {
          kind: "repere3d",
          titre: "Le pavé et ses sommets",
          points: [
            { x: 0, y: 0, z: 0, label: "O" },
            { x: cas.c[0], y: cas.c[1], z: cas.c[2], label: "?", couleur: "#7c3aed" },
          ],
          afficherAxes: true,
          size: { width: 360, height: 300 },
        },
      };
    },
  },
  {
    kind: "template",
    id: "4e_repere_espace_tpl_2_combien",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "repere_espace",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les nombres nécessaires, pas les dimensions de l'objet.",
    tags: ["reperage", "espace", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { quoi: "un point sur une droite graduée", n: 1, detail: "une abscisse" },
        { quoi: "un point dans le plan d'une feuille", n: 2, detail: "une abscisse et une ordonnée" },
        { quoi: "un point à l'intérieur d'un pavé droit", n: 3, detail: "une abscisse, une profondeur et une altitude" },
        { quoi: "un lieu à la surface de la Terre", n: 2, detail: "une latitude et une longitude" },
        { quoi: "une mouche qui vole dans une salle de classe", n: 3, detail: "trois nombres, dont la hauteur" },
        { quoi: "une marque sur un ruban gradué", n: 1, detail: "une seule mesure le long du ruban" },
        { quoi: "un wagon sur une voie ferrée", n: 1, detail: "la distance parcourue le long de la voie" },
        { quoi: "une case d'un échiquier", n: 2, detail: "une colonne et une ligne" },
        { quoi: "un poisson dans un aquarium", n: 3, detail: "une position en longueur, en largeur et en hauteur" },
        { quoi: "un drone en vol dans un gymnase", n: 3, detail: "deux nombres au sol et une hauteur" },
        { quoi: "une voiture sur une autoroute", n: 1, detail: "le point kilométrique" },
        { quoi: "un navire en pleine mer", n: 2, detail: "une latitude et une longitude" },
        { quoi: "un randonneur sur un sentier balisé", n: 1, detail: "la distance depuis le départ du sentier" },
        { quoi: "une ampoule suspendue dans une pièce", n: 3, detail: "deux nombres au sol et une hauteur" },
        { quoi: "un magasin sur le plan d'une ville", n: 2, detail: "une abscisse et une ordonnée (ou une lettre et un numéro)" },
        { quoi: "une perle sur un fil tendu", n: 1, detail: "une seule abscisse le long du fil" },
        { quoi: "un oiseau dans une volière", n: 3, detail: "une position en longueur, en largeur et en hauteur" },
        { quoi: "un pion sur un plateau de jeu quadrillé", n: 2, detail: "une colonne et une ligne" },
      ]);
      const tournures = [
        `Combien faut-il de nombres pour repérer ${cas.quoi} ?`,
        `Pour repérer ${cas.quoi} sans ambiguïté, combien de coordonnées sont nécessaires ?`,
        `On veut indiquer exactement où se trouve ${cas.quoi}. Combien de nombres faut-il donner, au minimum ?`,
        `Combien de coordonnées suffisent pour situer ${cas.quoi} ?`,
      ];
      const correct = String(cas.n);
      return {
        text: randomChoice(tournures),
        format: "qcm",
        choices: shuffle(["1", "2", "3"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : le nombre de coordonnées nécessaires est la DIMENSION de l'espace où l'on se repère.\n\n" +
          "Méthode : on se demande de combien de libertés on dispose pour bouger sans quitter le support.\n\n" +
          `Calcul : pour repérer ${cas.quoi}, il faut ${cas.n} ${pl(cas.n, "nombre")} : ${cas.detail}.\n\n` +
          "Conclusion : ⭐ la surface de la Terre demande DEUX nombres alors qu'elle est dans l'espace : on ne peut pas s'en écarter, donc une sphère se repère comme une feuille. C'est la dimension du SUPPORT qui compte, pas celle du monde autour.",
      };
    },
  },

  /* =========================================================================
     REPERE_TERRE — latitude et longitude
  ========================================================================= */
  {
    kind: "template",
    id: "4e_repere_terre_tpl_1_lire",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "repere_terre",
    difficulty: 3,
    theme: "neutral",
    hint: "La latitude se compte depuis l'équateur, la longitude depuis Greenwich.",
    tags: ["reperage", "terre", "latitude", "qcm", "template", "canvas"],
    generate: () => {
      const v = randomChoice(VILLES);
      const demandeLat = Math.random() < 0.5;
      const correct = demandeLat ? v.lat : v.lon;
      const autre = demandeLat ? v.lon : v.lat;
      const MOT = demandeLat ? "LATITUDE" : "LONGITUDE";
      const tournures = [
        `${v.nom} se situe à ${v.lat} et ${v.lon}. Quelle est sa ${MOT} ?`,
        `Un GPS indique la position de ${v.nom} : ${v.lat}, ${v.lon}. Laquelle de ces valeurs est sa ${MOT} ?`,
        `Sur un atlas, on lit pour ${v.nom} : ${v.lon} et ${v.lat}. Quelle est la ${MOT} de cette ville ?`,
        `${v.nom} est repérée par ${v.lat} et ${v.lon}. Quelle est sa position mesurée depuis ${demandeLat ? "l'équateur" : "le méridien de Greenwich"} ?`,
      ];
      const autres = shuffle(
        VILLES.filter((x) => x.nom !== v.nom).map((x) => (Math.random() < 0.5 ? x.lat : x.lon))
      ).filter((w) => w !== correct && w !== autre);
      return {
        text: randomChoice(tournures),
        format: "qcm",
        choices: shuffle([correct, autre, ...autres.slice(0, 2)]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : la LATITUDE mesure l'écart à l'ÉQUATEUR, vers le nord ou vers le sud. La LONGITUDE mesure l'écart au méridien de Greenwich, vers l'est ou vers l'ouest.\n\n" +
          "Méthode : on retient le mot par ce qu'il mesure — la latitude dit à quelle HAUTEUR sur le globe, la longitude à quel niveau sur le tour. Et la mention NORD ou SUD accompagne toujours la latitude, EST ou OUEST la longitude.\n\n" +
          `Calcul : ${v.nom} est à ${v.lat} (latitude) et ${v.lon} (longitude) : la ${MOT.toLowerCase()} vaut donc ${correct}.\n\n` +
          `Conclusion : ⭐ un moyen sûr de ne pas les confondre : la latitude va de 0° à 90° seulement — pas plus, puisque le pôle est le maximum. La longitude, elle, monte jusqu'à 180°. Un angle de plus de 90° ne peut donc être qu'une longitude.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_repere_terre_tpl_2_hemisphere",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "repere_terre",
    difficulty: 4,
    theme: "neutral",
    hint: "Le mot « sud » ou « nord » accompagne la latitude ; « est » ou « ouest », la longitude.",
    tags: ["reperage", "terre", "hemisphere", "qcm", "template"],
    generate: () => {
      const v = randomChoice(VILLES);
      if (Math.random() < 0.3) {
        // L'autre moitié du globe : est ou ouest de Greenwich, lue sur la longitude.
        // ⚠️ « OUEST » contient « EST » : on teste la fin du mot.
        const ew = v.lon.endsWith("OUEST") ? "ouest" : "est";
        const correct = `à l'${ew} du méridien de Greenwich`;
        const tournures = [
          `${v.nom} se situe à ${v.lon}. Cette ville est-elle à l'est ou à l'ouest du méridien de Greenwich ?`,
          `La longitude de ${v.nom} vaut ${v.lon}. De quel côté du méridien de Greenwich se trouve-t-elle ?`,
          `Un navigateur relève la position de ${v.nom} : ${v.lat}, ${v.lon}. Par rapport au méridien de Greenwich, où est cette ville ?`,
        ];
        return {
          text: randomChoice(tournures),
          format: "qcm",
          choices: makeChoices(correct, [
            "à l'est du méridien de Greenwich",
            "à l'ouest du méridien de Greenwich",
            "sur le méridien de Greenwich exactement",
            "on ne peut pas le savoir avec la longitude seule",
          ]),
          expected: [correct],
          comparator: "mcq_exact",
          explanation:
            "Définition : la longitude porte toujours une mention EST ou OUEST : elle dit de quel côté du méridien de Greenwich on se trouve. La latitude, elle, ne dit rien de l'est ou de l'ouest.\n\n" +
            "Méthode : on lit le mot qui suit la longitude.\n\n" +
            `Calcul : ${v.nom} est à ${v.lon}, donc ${correct}.\n\n` +
            "Conclusion : ⭐ le méridien de Greenwich passe près de Londres, et aussi en France, non loin du Havre. Les villes de France qui sont à l'ouest de cette ligne, comme Brest, ont une longitude OUEST.",
        };
      }
      const correct = `l'hémisphère ${v.hemisphere}`;
      const tournures = [
        `${v.nom} se situe à ${v.lat}. Dans quel hémisphère se trouve cette ville ?`,
        `Un navigateur relève la position de ${v.nom} : ${v.lat}, ${v.lon}. Dans quel hémisphère est cette ville ?`,
        `La latitude de ${v.nom} vaut ${v.lat}. Dans quelle moitié du globe, par rapport à l'équateur, se trouve-t-elle ?`,
      ];
      return {
        text: randomChoice(tournures),
        format: "qcm",
        choices: makeChoices(correct, [
          "l'hémisphère nord",
          "l'hémisphère sud",
          "sur l'équateur exactement",
          "on ne peut pas le savoir avec la latitude seule",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : la latitude porte toujours une mention NORD ou SUD, et c'est elle qui donne l'hémisphère. La longitude, elle, ne dit rien de l'hémisphère nord ou sud.\n\n" +
          "Méthode : on lit le mot qui suit la latitude.\n\n" +
          `Calcul : ${v.nom} est à ${v.lat}, donc dans l'hémisphère ${v.hemisphere}.\n\n` +
          (v.latDeg < 10
            ? `Conclusion : ⭐ ${v.nom} est tout près de l'équateur, mais du côté ${v.hemisphere} : même une latitude de quelques minutes seulement porte sa mention. Si près de l'équateur, les saisons se marquent à peine.`
            : `Conclusion : ⭐ l'hémisphère se lit sur la latitude, et il décide des saisons : à ${v.nom}, l'hiver tombe en ${v.hemisphere === "sud" ? "juillet" : "janvier"}.`),
      };
    },
  },

  /* =========================================================================
     REPERE_DEFI
  ========================================================================= */
  {
    kind: "template",
    id: "4e_repere_defi_tpl_1_symetrique",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "repere_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Une symétrie par rapport à un axe ne change qu'UNE des deux coordonnées.",
    tags: ["reperage", "defi", "symetrie", "qcm", "template"],
    generate: () => {
      const x = randomInt(1, 6) * (Math.random() < 0.3 ? -1 : 1);
      const y = randomInt(1, 6) * (Math.random() < 0.3 ? -1 : 1);
      const nom = randomChoice(NOMS_POINTS);
      const cas = randomChoice([
        { axe: "l'axe des abscisses", res: `(${x} ; ${-y})`, quoi: "l'ordonnée change de signe" },
        { axe: "l'axe des ordonnées", res: `(${-x} ; ${y})`, quoi: "l'abscisse change de signe" },
        { axe: "l'origine", res: `(${-x} ; ${-y})`, quoi: "les DEUX changent de signe" },
      ]);
      const ctx = randomChoice([
        { lieu: "le plan d'un jardin à la française", objet: "une statue" },
        { lieu: "le dessin d'un papillon", objet: "une tache sur une aile" },
        { lieu: "un motif de carrelage", objet: "un losange bleu" },
        { lieu: "le plan d'un terrain de football, dont le centre est l'origine", objet: "un joueur" },
        { lieu: "le schéma d'un logo", objet: "une étoile" },
        { lieu: "le plan d'une place de village", objet: "un banc" },
        { lieu: "le patron d'un masque de carnaval", objet: "le trou d'un œil" },
        { lieu: "le plan d'un parc", objet: "un lampadaire" },
        { lieu: "le dessin d'un vitrail", objet: "un morceau de verre rouge" },
        { lieu: "le plan d'une salle de spectacle", objet: "un projecteur" },
        { lieu: "le motif d'une broderie", objet: "une perle" },
        { lieu: "la carte d'un jeu vidéo", objet: "un coffre" },
      ]);
      const tournures = [
        `Quel est le symétrique du point ${nom}(${x} ; ${y}) par rapport à ${cas.axe} ?`,
        `Le point ${nom}′ est le symétrique de ${nom}(${x} ; ${y}) par rapport à ${cas.axe}. Quelles sont les coordonnées de ${nom}′ ?`,
        `Sur ${ctx.lieu}, ${muni(ctx.lieu)} d'un repère, ${ctx.objet} est au point ${nom}(${x} ; ${y}). On dessine son symétrique par rapport à ${cas.axe}. Quelles sont ses coordonnées ?`,
        `Sur ${ctx.lieu}, ${muni(ctx.lieu)} d'un repère, on veut dessiner ${ctx.objet} en double, symétriquement par rapport à ${cas.axe}. Le modèle est au point (${x} ; ${y}) : quelles sont les coordonnées de la copie ?`,
      ];
      return {
        text: randomChoice(tournures),
        format: "qcm",
        choices: makeChoices(cas.res, [
          `(${x} ; ${-y})`,
          `(${-x} ; ${y})`,
          `(${-x} ; ${-y})`,
          `(${y} ; ${x})`,
          `(${x} ; ${y})`,
        ]),
        expected: [cas.res],
        comparator: "mcq_exact",
        explanation:
          "Définition : une symétrie par rapport à un axe garde la coordonnée LE LONG de cet axe et change l'autre de signe.\n\n" +
          "Méthode : on se demande de quel côté le point traverse. S'il traverse l'axe horizontal, c'est la hauteur qui s'inverse — donc l'ordonnée.\n\n" +
          `Calcul : le point de départ est (${x} ; ${y}). Par rapport à ${cas.axe}, ${cas.quoi}. Le symétrique est donc ${cas.res}.\n\n` +
          "Conclusion : ⭐ la symétrie par rapport à l'ORIGINE est un demi-tour : c'est la seule des trois qui change les deux coordonnées. Et changer de signe un nombre négatif le rend positif.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_repere_defi_tpl_2_milieu",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "repere_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le milieu est à mi-chemin sur chaque coordonnée, séparément.",
    tags: ["reperage", "defi", "milieu", "template", "canvas"],
    generate: () => {
      // Des coordonnées de même parité, pour que le milieu tombe sur un entier.
      const x1 = randomInt(0, 3) * 2;
      const x2 = randomInt(2, 4) * 2;
      const y1 = randomInt(0, 3) * 2;
      let y2 = randomInt(2, 4) * 2;
      // Deux points distincts, sinon il n'y a pas de segment.
      while (x1 === x2 && y1 === y2) y2 = randomInt(2, 4) * 2;
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      const [A, B, M] = shuffle([...NOMS_POINTS]).slice(0, 3);
      const abs = Math.random() < 0.5;
      const COORD = abs ? "ABSCISSE" : "ORDONNÉE";
      const coord = abs ? "abscisse" : "ordonnée";
      const rep = abs ? mx : my;
      const c = randomChoice([
        { lieu: "la carte d'une randonnée", a: "le refuge", b: "le lac", m: "un panneau" },
        { lieu: "le plan d'un jardin", a: "le pommier", b: "le cerisier", m: "un banc" },
        { lieu: "le plan d'un quartier", a: "l'école", b: "la gare", m: "un arrêt de bus" },
        { lieu: "le schéma d'un terrain de sport", a: "un premier plot", b: "un second plot", m: "le ballon" },
        { lieu: "le plan d'un camping", a: "les douches", b: "l'accueil", m: "une poubelle" },
        { lieu: "la carte d'une île", a: "le phare", b: "le port", m: "une borne d'appel" },
        { lieu: "le plan d'une ferme", a: "la grange", b: "le puits", m: "un abreuvoir" },
        { lieu: "le plan d'un parc éolien", a: "une première éolienne", b: "une seconde éolienne", m: "un poste électrique" },
        { lieu: "la carte d'un jeu vidéo", a: "le château", b: "la forêt", m: "un coffre" },
        { lieu: "le plan d'une cour d'école", a: "le préau", b: "le portail", m: "un arbre" },
        { lieu: "le plan d'un zoo", a: "l'enclos des lions", b: "la volière", m: "un kiosque" },
        { lieu: "le plan d'un chantier", a: "la grue", b: "la bétonnière", m: "un projecteur" },
      ]);
      const pa = `${A}(${x1} ; ${y1})`;
      const pb = `${B}(${x2} ; ${y2})`;
      const tournures = [
        `On donne les points ${pa} et ${pb}. Quelle est l'${COORD} du milieu du segment [${A}${B}] ?`,
        `Le point ${M} est le milieu du segment [${A}${B}], avec ${pa} et ${pb}. Calcule l'${coord} de ${M}.`,
        `Sur ${c.lieu}, ${muni(c.lieu)} d'un repère, ${c.a} est en ${pa} et ${c.b} en ${pb}. On place ${c.m} exactement à mi-chemin, au point ${M}. Quelle est l'${COORD} de ${M} ?`,
        `Sur ${c.lieu}, ${muni(c.lieu)} d'un repère, ${c.a} est au point (${x1} ; ${y1}) et ${c.b} au point (${x2} ; ${y2}). Quelle est l'${COORD} du point situé exactement au milieu ?`,
      ];
      const texte = randomChoice(tournures);
      // Le canvas reprend les noms du texte : la quatrième tournure n'en donne pas.
      const sansNoms = texte.includes("du point situé exactement au milieu");
      return {
        text: texte,
        format: "short",
        expected: [String(rep)],
        comparator: "number_equal",
        explanation:
          "Définition : le milieu d'un segment est à mi-chemin — et cela se calcule coordonnée par coordonnée, séparément.\n\n" +
          "Méthode : on fait la moyenne des abscisses, puis la moyenne des ordonnées. Les deux calculs ne se mélangent jamais.\n\n" +
          `Calcul : (${x1} + ${x2}) ÷ 2 = ${mx} pour l'abscisse, et (${y1} + ${y2}) ÷ 2 = ${my} pour l'ordonnée. L'${coord} demandée vaut donc ${rep}.\n\n` +
          `Conclusion : le milieu est le point (${mx} ; ${my}). ⭐ Faire une moyenne des quatre nombres d'un coup n'a aucun sens : abscisses avec abscisses, ordonnées avec ordonnées.`,
        canvas: plan([
          { x: x1, y: y1, label: sansNoms ? `(${x1} ; ${y1})` : A, color: "#2563eb" },
          { x: x2, y: y2, label: sansNoms ? `(${x2} ; ${y2})` : B, color: "#2563eb" },
          { x: mx, y: my, label: "?", color: "#7c3aed" },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "4e_repere_defi_tpl_3_quel_support",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "repere_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Quelle grandeur manque pour désigner l'endroit sans ambiguïté ?",
    tags: ["reperage", "defi", "probleme", "qcm", "template"],
    generate: () => {
      const LL = "latitude et longitude";
      const LLA = "latitude, longitude et altitude";
      const XY = "abscisse et ordonnée";
      const X = "une seule abscisse";
      const XYZ = "trois coordonnées";
      const cas = randomChoice([
        { situation: "donner la position d'un bateau en pleine mer", rep: LL },
        { situation: "donner la position d'un avion en vol", rep: LLA },
        { situation: "désigner une case sur un plan quadrillé", rep: XY },
        { situation: "repérer un défaut sur un câble tendu", rep: X },
        { situation: "désigner un point dans une pièce", rep: XYZ },
        { situation: "situer une borne sur une autoroute rectiligne", rep: X },
        { situation: "repérer un phare sur une carte marine du globe", rep: LL },
        { situation: "suivre un ballon-sonde météo", rep: LLA },
        { situation: "indiquer la position d'un parapentiste en vol", rep: LLA },
        { situation: "placer un pion sur un plateau de jeu quadrillé", rep: XY },
        { situation: "repérer une perle sur un fil de collier tendu", rep: X },
        { situation: "désigner l'emplacement d'une lampe suspendue dans une salle", rep: XYZ },
        { situation: "indiquer la position d'un poisson dans un aquarium", rep: XYZ },
        { situation: "situer une île de l'océan Pacifique", rep: LL },
        { situation: "placer un point sur une feuille de papier millimétré", rep: XY },
        { situation: "repérer un wagon sur une voie ferrée rectiligne", rep: X },
        { situation: "donner la position d'un satellite autour de la Terre", rep: LLA },
        { situation: "désigner un point à l'intérieur d'un carton", rep: XYZ },
        { situation: "annoncer un tir au jeu de la bataille navale", rep: XY },
        { situation: "situer le port de Saint-Pierre sur le globe", rep: LL },
      ]);
      // ⚠️ « trois coordonnées » serait AUSSI juste pour un avion, et
      // « latitude, longitude et altitude » pour un point d'une pièce : le leurre
      // concurrent est écarté.
      const exclus = cas.rep === LLA ? XYZ : cas.rep === XYZ ? LLA : "";
      const prenom = randomChoice(PRENOMS);
      const tournures = [
        `Pour ${cas.situation}, de quoi a-t-on besoin ?`,
        `On veut ${cas.situation}. Quelles coordonnées faut-il donner ?`,
        `Quel repérage convient pour ${cas.situation} ?`,
        `${prenom} doit ${cas.situation}. Que faut-il indiquer ?`,
      ];
      return {
        text: randomChoice(tournures),
        format: "qcm",
        choices: makeChoices(
          cas.rep,
          [LL, LLA, XY, X, XYZ].filter((w) => w !== exclus)
        ),
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation:
          "Définition : le nombre de coordonnées dépend du SUPPORT sur lequel on se déplace, pas de l'espace autour.\n\n" +
          "Méthode : on se demande combien de libertés de mouvement existent réellement.\n\n" +
          `Calcul : pour ${cas.situation}, il faut ${cas.rep}.\n\n` +
          "Conclusion : ⭐ un bateau ne peut pas quitter la surface, deux nombres suffisent. Un avion le peut : il en faut trois. C'est la même différence qu'entre une feuille et une salle.",
      };
    },
  },
];
