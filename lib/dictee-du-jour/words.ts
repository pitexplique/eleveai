// La dictée du jour — 1 mot à écouter et écrire, qui change CHAQUE JOUR.
// Objectif : un rituel quotidien (« comme un journal ») pour faire revenir les
// élèves. Le tirage est DÉTERMINISTE par date → tout le monde a le même mot le
// même jour (effet « édition du jour »), et il change à minuit.
//
// Audio : lecture par la synthèse vocale du navigateur (speakText), avec la
// bonne voix selon `lang` — donc AUCUN mp3 à produire. On choisit des mots à
// l'orthographe piégeuse : c'est là qu'est la valeur d'une dictée.
//
// Rotation des matières : la liste finale est ENTRELACÉE (round-robin) pour
// qu'un jour donné tombe sur une matière différente de la veille.

export type DicteeLang = "fr" | "en" | "es";

export type DicteeMot = {
  matiere: string; // libellé affiché
  lang: DicteeLang; // voix de lecture
  mot: string; // le mot à écrire (accents compris — ils comptent !)
  indice: string; // sens / définition, révélé en aide et à la correction
};

// ── Français ─────────────────────────────────────────────────
const FRANCAIS: DicteeMot[] = [
  { matiere: "Français", lang: "fr", mot: "aujourd'hui", indice: "Le jour où l'on est." },
  { matiere: "Français", lang: "fr", mot: "parmi", indice: "Au milieu de (jamais de « s »)." },
  { matiere: "Français", lang: "fr", mot: "quelconque", indice: "Ordinaire, sans importance particulière." },
  { matiere: "Français", lang: "fr", mot: "malgré", indice: "En dépit de." },
  { matiere: "Français", lang: "fr", mot: "longtemps", indice: "Pendant une longue durée." },
  { matiere: "Français", lang: "fr", mot: "accueil", indice: "Manière de recevoir quelqu'un." },
  { matiere: "Français", lang: "fr", mot: "rythme", indice: "Le mouvement régulier d'une musique." },
  { matiere: "Français", lang: "fr", mot: "professeur", indice: "Celui qui enseigne." },
  { matiere: "Français", lang: "fr", mot: "deuxième", indice: "Juste après le premier." },
  { matiere: "Français", lang: "fr", mot: "cauchemar", indice: "Un mauvais rêve (pas de « d » !)." },
];

// ── Maths ────────────────────────────────────────────────────
const MATHS: DicteeMot[] = [
  { matiere: "Maths", lang: "fr", mot: "hypoténuse", indice: "Le plus grand côté d'un triangle rectangle." },
  { matiere: "Maths", lang: "fr", mot: "quotient", indice: "Le résultat d'une division." },
  { matiere: "Maths", lang: "fr", mot: "parallélépipède", indice: "Un solide type « boîte »." },
  { matiere: "Maths", lang: "fr", mot: "périmètre", indice: "Le tour d'une figure." },
  { matiere: "Maths", lang: "fr", mot: "symétrie", indice: "Répétition en miroir." },
  { matiere: "Maths", lang: "fr", mot: "numérateur", indice: "Le nombre du haut d'une fraction." },
  { matiere: "Maths", lang: "fr", mot: "losange", indice: "Quadrilatère aux 4 côtés égaux." },
  { matiere: "Maths", lang: "fr", mot: "pourcentage", indice: "Une proportion sur cent." },
  { matiere: "Maths", lang: "fr", mot: "diagonale", indice: "Relie deux sommets opposés." },
  { matiere: "Maths", lang: "fr", mot: "multiplication", indice: "L'opération « fois »." },
];

// ── Anglais (on entend le mot anglais, on l'écrit) ───────────
const ANGLAIS: DicteeMot[] = [
  { matiere: "Anglais", lang: "en", mot: "Wednesday", indice: "mercredi" },
  { matiere: "Anglais", lang: "en", mot: "beautiful", indice: "beau / magnifique" },
  { matiere: "Anglais", lang: "en", mot: "because", indice: "parce que" },
  { matiere: "Anglais", lang: "en", mot: "friend", indice: "ami" },
  { matiere: "Anglais", lang: "en", mot: "weather", indice: "le temps (météo)" },
  { matiere: "Anglais", lang: "en", mot: "always", indice: "toujours" },
  { matiere: "Anglais", lang: "en", mot: "tomorrow", indice: "demain" },
  { matiere: "Anglais", lang: "en", mot: "enough", indice: "assez / suffisamment" },
  { matiere: "Anglais", lang: "en", mot: "through", indice: "à travers" },
  { matiere: "Anglais", lang: "en", mot: "different", indice: "différent" },
];

// ── Espagnol (on entend le mot espagnol, on l'écrit) ─────────
const ESPAGNOL: DicteeMot[] = [
  { matiere: "Espagnol", lang: "es", mot: "corazón", indice: "cœur (avec l'accent !)" },
  { matiere: "Espagnol", lang: "es", mot: "mañana", indice: "demain (avec le ñ)" },
  { matiere: "Espagnol", lang: "es", mot: "ciudad", indice: "ville" },
  { matiere: "Espagnol", lang: "es", mot: "amarillo", indice: "jaune" },
  { matiere: "Espagnol", lang: "es", mot: "trabajar", indice: "travailler" },
  { matiere: "Espagnol", lang: "es", mot: "familia", indice: "famille" },
  { matiere: "Espagnol", lang: "es", mot: "gracias", indice: "merci" },
  { matiere: "Espagnol", lang: "es", mot: "pequeño", indice: "petit (avec le ñ)" },
  { matiere: "Espagnol", lang: "es", mot: "escuela", indice: "école" },
  { matiere: "Espagnol", lang: "es", mot: "jueves", indice: "jeudi" },
];

// ── Histoire (mots français) ─────────────────────────────────
const HISTOIRE: DicteeMot[] = [
  { matiere: "Histoire", lang: "fr", mot: "Révolution", indice: "Grand bouleversement, ex. 1789." },
  { matiere: "Histoire", lang: "fr", mot: "République", indice: "Un régime politique sans roi." },
  { matiere: "Histoire", lang: "fr", mot: "Antiquité", indice: "L'époque des Grecs et des Romains." },
  { matiere: "Histoire", lang: "fr", mot: "préhistoire", indice: "Avant l'invention de l'écriture." },
  { matiere: "Histoire", lang: "fr", mot: "monarchie", indice: "Un gouvernement dirigé par un roi." },
  { matiere: "Histoire", lang: "fr", mot: "démocratie", indice: "Le pouvoir appartient au peuple." },
  { matiere: "Histoire", lang: "fr", mot: "chevalier", indice: "Un guerrier du Moyen Âge, à cheval." },
  { matiere: "Histoire", lang: "fr", mot: "cathédrale", indice: "Une très grande église." },
  { matiere: "Histoire", lang: "fr", mot: "empereur", indice: "Napoléon en était un." },
  { matiere: "Histoire", lang: "fr", mot: "esclavage", indice: "Réduire un humain en propriété (aboli en 1848)." },
];

// ── Géographie (mots français) ───────────────────────────────
const GEOGRAPHIE: DicteeMot[] = [
  { matiere: "Géographie", lang: "fr", mot: "continent", indice: "L'Afrique, l'Europe… en sont." },
  { matiere: "Géographie", lang: "fr", mot: "équateur", indice: "La ligne imaginaire au milieu du globe." },
  { matiere: "Géographie", lang: "fr", mot: "hémisphère", indice: "Une moitié de la Terre (nord ou sud)." },
  { matiere: "Géographie", lang: "fr", mot: "péninsule", indice: "Une terre entourée d'eau sur trois côtés." },
  { matiere: "Géographie", lang: "fr", mot: "archipel", indice: "Un groupe d'îles." },
  { matiere: "Géographie", lang: "fr", mot: "frontière", indice: "La limite entre deux pays." },
  { matiere: "Géographie", lang: "fr", mot: "altitude", indice: "La hauteur au-dessus de la mer." },
  { matiere: "Géographie", lang: "fr", mot: "métropole", indice: "Une grande ville principale." },
  { matiere: "Géographie", lang: "fr", mot: "latitude", indice: "La position nord-sud sur le globe." },
  { matiere: "Géographie", lang: "fr", mot: "volcan", indice: "Une montagne qui peut cracher de la lave." },
];

// ── Écologie (mots français) ─────────────────────────────────
const ECOLOGIE: DicteeMot[] = [
  { matiere: "Écologie", lang: "fr", mot: "biodiversité", indice: "La variété des espèces vivantes." },
  { matiere: "Écologie", lang: "fr", mot: "écosystème", indice: "Un milieu + les êtres vivants qui y vivent." },
  { matiere: "Écologie", lang: "fr", mot: "recyclage", indice: "Transformer les déchets pour les réutiliser." },
  { matiere: "Écologie", lang: "fr", mot: "réchauffement", indice: "La hausse des températures du climat." },
  { matiere: "Écologie", lang: "fr", mot: "atmosphère", indice: "La couche de gaz autour de la Terre." },
  { matiere: "Écologie", lang: "fr", mot: "pollution", indice: "La salissure de l'environnement." },
  { matiere: "Écologie", lang: "fr", mot: "oxygène", indice: "Le gaz que l'on respire." },
  { matiere: "Écologie", lang: "fr", mot: "planète", indice: "La Terre en est une." },
  { matiere: "Écologie", lang: "fr", mot: "espèce", indice: "Un type d'animal ou de plante." },
  { matiere: "Écologie", lang: "fr", mot: "déchet", indice: "Ce que l'on jette." },
];

// ── Physique (mots français) ─────────────────────────────────
const PHYSIQUE: DicteeMot[] = [
  { matiere: "Physique", lang: "fr", mot: "molécule", indice: "Un assemblage d'atomes." },
  { matiere: "Physique", lang: "fr", mot: "énergie", indice: "Ce qui permet d'agir, de bouger, de chauffer." },
  { matiere: "Physique", lang: "fr", mot: "électricité", indice: "Le courant qui circule dans les fils." },
  { matiere: "Physique", lang: "fr", mot: "vitesse", indice: "La distance parcourue par unité de temps." },
  { matiere: "Physique", lang: "fr", mot: "température", indice: "Ce que mesure un thermomètre." },
  { matiere: "Physique", lang: "fr", mot: "lumière", indice: "Ce qui permet de voir." },
  { matiere: "Physique", lang: "fr", mot: "pression", indice: "Une force exercée sur une surface." },
  { matiere: "Physique", lang: "fr", mot: "aimant", indice: "Un objet qui attire le fer." },
  { matiere: "Physique", lang: "fr", mot: "particule", indice: "Un tout petit morceau de matière." },
  { matiere: "Physique", lang: "fr", mot: "circuit", indice: "Le chemin fermé où circule le courant." },
];

// ── SVT — Sciences de la Vie et de la Terre (mots français) ──
const SVT: DicteeMot[] = [
  { matiere: "SVT", lang: "fr", mot: "chromosome", indice: "Il porte les gènes dans la cellule." },
  { matiere: "SVT", lang: "fr", mot: "photosynthèse", indice: "Les plantes fabriquent leur énergie grâce à la lumière." },
  { matiere: "SVT", lang: "fr", mot: "respiration", indice: "Absorber de l'oxygène, rejeter du CO2." },
  { matiere: "SVT", lang: "fr", mot: "cellule", indice: "La plus petite unité du vivant." },
  { matiere: "SVT", lang: "fr", mot: "squelette", indice: "L'ensemble des os du corps." },
  { matiere: "SVT", lang: "fr", mot: "digestion", indice: "La transformation des aliments." },
  { matiere: "SVT", lang: "fr", mot: "organisme", indice: "Un être vivant." },
  { matiere: "SVT", lang: "fr", mot: "neurone", indice: "Une cellule du cerveau." },
  { matiere: "SVT", lang: "fr", mot: "génétique", indice: "L'étude des gènes et de l'hérédité." },
  { matiere: "SVT", lang: "fr", mot: "muscle", indice: "Il permet le mouvement du corps." },
];

// ── Musique (mots français) ──────────────────────────────────
const MUSIQUE: DicteeMot[] = [
  { matiere: "Musique", lang: "fr", mot: "partition", indice: "La feuille où sont écrites les notes." },
  { matiere: "Musique", lang: "fr", mot: "mélodie", indice: "Une suite de notes agréable." },
  { matiere: "Musique", lang: "fr", mot: "croche", indice: "Une figure de note (avec une queue)." },
  { matiere: "Musique", lang: "fr", mot: "portée", indice: "Les 5 lignes où l'on écrit les notes." },
  { matiere: "Musique", lang: "fr", mot: "orchestre", indice: "Un grand ensemble de musiciens." },
  { matiere: "Musique", lang: "fr", mot: "harmonie", indice: "Un accord agréable de plusieurs sons." },
  { matiere: "Musique", lang: "fr", mot: "instrument", indice: "Un objet pour faire de la musique." },
  { matiere: "Musique", lang: "fr", mot: "silence", indice: "Un moment sans son (il a une durée)." },
  { matiere: "Musique", lang: "fr", mot: "tempo", indice: "La vitesse d'un morceau de musique." },
  { matiere: "Musique", lang: "fr", mot: "symphonie", indice: "Une grande œuvre pour orchestre." },
];

// ── Arts plastiques (mots français) ──────────────────────────
const ARTS: DicteeMot[] = [
  { matiere: "Arts plastiques", lang: "fr", mot: "perspective", indice: "Donne l'impression de profondeur sur un dessin." },
  { matiere: "Arts plastiques", lang: "fr", mot: "esquisse", indice: "Un premier dessin rapide." },
  { matiere: "Arts plastiques", lang: "fr", mot: "nuance", indice: "Une variation légère de couleur." },
  { matiere: "Arts plastiques", lang: "fr", mot: "pinceau", indice: "L'outil pour peindre." },
  { matiere: "Arts plastiques", lang: "fr", mot: "sculpture", indice: "Une œuvre en volume." },
  { matiere: "Arts plastiques", lang: "fr", mot: "palette", indice: "Le support où l'on mélange les couleurs." },
  { matiere: "Arts plastiques", lang: "fr", mot: "contraste", indice: "Une opposition forte (clair / sombre)." },
  { matiere: "Arts plastiques", lang: "fr", mot: "silhouette", indice: "La forme, le contour d'une figure." },
  { matiere: "Arts plastiques", lang: "fr", mot: "aquarelle", indice: "Une peinture à l'eau." },
  { matiere: "Arts plastiques", lang: "fr", mot: "collage", indice: "Assembler des morceaux collés." },
];

// Les 11 matières (l'ordre fixe sert au tirage tournant).
const GROUPES: DicteeMot[][] = [
  FRANCAIS,
  MATHS,
  ANGLAIS,
  ESPAGNOL,
  HISTOIRE,
  GEOGRAPHIE,
  ECOLOGIE,
  PHYSIQUE,
  SVT,
  MUSIQUE,
  ARTS,
];

// Numéro de jour stable (jours depuis l'époque, en UTC pour éviter les demi-jours).
function daySerial(date: Date): number {
  return Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000
  );
}

/**
 * La dictée du jour : `n` mots (5 par défaut), de `n` MATIÈRES DIFFÉRENTES,
 * tirés de façon DÉTERMINISTE par date (même dictée pour tous, ce jour-là).
 * - Matières : fenêtre de n matières qui tourne chaque jour (n < 11 → distinctes).
 * - Mot dans la matière : varie selon le jour.
 * Le cycle complet (matières × mots) ne reboucle qu'au bout de ~110 jours.
 */
export function getDicteeDuJour(date: Date, n = 5): DicteeMot[] {
  const s = daySerial(date);
  const M = GROUPES.length; // 11
  const out: DicteeMot[] = [];
  for (let i = 0; i < n; i++) {
    const g = GROUPES[(((s * n + i) % M) + M) % M];
    const wIdx = (((s + i) % g.length) + g.length) % g.length;
    out.push(g[wIdx]);
  }
  return out;
}

/** Comparaison « dictée » : casse et espaces ignorés, mais ACCENTS conservés. */
export function reponseCorrecte(saisie: string, mot: string): boolean {
  const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");
  return norm(saisie) === norm(mot);
}
