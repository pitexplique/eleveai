// LES CENTRES D'INTÉRÊT — la liste FERMÉE qui étiquette chaque vidéo (24/10/2026).
//
// Frédéric : « on va définir tous les centres d'intérêt et chaque vidéo aura des
// tags centres d'intérêt », « le plus important est de créer des vidéos en
// connaissant les centres d'intérêt multinationaux par tranche d'âge ».
// Puis la veille, devant l'accueil de Bing : « si tous les élèves pouvaient
// apprendre avec leurs passions, ça serait cool ».
//
// ⭐ UNE SEULE LISTE pour tout le site : les vidéos (champ `centres` du
// manifeste), plus tard l'accueil (« choisis tes passions ») et le coach.
// Ajouter un centre = une entrée ici. Les étiquettes des vidéos publiées sont dans
// lib/videos/centres-interet-etiquettes.json, fusionnées par scripts/taguer-centres-interet.ts.
// ⭐ Les sujets sont UNIVERSELS (ils parlent à tous les pays qui enseignent en
// français) ; la touche locale se règle dans la vidéo (manim/centres-interet-par-age.md).
// ⚠️ Les tranches d'âge disent où le centre MARCHE LE MIEUX, pas où il est interdit.

export type TrancheAge = "6-8" | "9-11" | "12-14" | "15-18" | "adultes";

export type CentreInteret = {
  id: string;
  nom: string;
  /** Une phrase : ce qu'on y met, pour choisir sans hésiter. */
  contenu: string;
  tranches: TrancheAge[];
};

export const CENTRES_INTERET: CentreInteret[] = [
  {
    id: "sport",
    nom: "Sport",
    contenu: "Matchs, scores, records, courses, trail, JO, chronos, entraînement.",
    tranches: ["9-11", "12-14", "15-18", "adultes"],
  },
  {
    id: "musique",
    nom: "Musique",
    contenu: "Rythme, tempo, playlists, concerts, festivals, instruments, écoutes.",
    tranches: ["9-11", "12-14", "15-18"],
  },
  {
    id: "animaux",
    nom: "Animaux",
    contenu: "Vitesses, tailles, migrations, populations, soins, espèces protégées.",
    tranches: ["6-8", "9-11", "12-14"],
  },
  {
    id: "nature-ecologie",
    nom: "Nature et écologie",
    contenu: "Forêts, océans, volcans, eau, déchets, énergie, biodiversité.",
    tranches: ["6-8", "9-11", "12-14", "15-18"],
  },
  {
    id: "meteo-climat",
    nom: "Météo et climat",
    contenu: "Pluie, températures, cyclones, saisons, réchauffement, prévisions.",
    tranches: ["9-11", "12-14", "15-18"],
  },
  {
    id: "espace",
    nom: "Espace et astronomie",
    contenu: "Planètes, distances, satellites, fusées, la Lune, les étoiles.",
    tranches: ["6-8", "9-11", "12-14", "15-18"],
  },
  {
    id: "jeux-video",
    nom: "Jeux vidéo",
    contenu: "Niveaux, points d'expérience, scores, tournois, probabilités de butin.",
    tranches: ["9-11", "12-14", "15-18"],
  },
  {
    id: "jeux-defis",
    nom: "Jeux, énigmes et défis",
    contenu: "Énigmes, jeux de société, dés, cartes, labyrinthes (pas les « défis » de format des vidéos).",
    tranches: ["6-8", "9-11", "12-14", "15-18", "adultes"],
  },
  {
    id: "reseaux-sociaux",
    nom: "Réseaux sociaux",
    contenu: "Vues, likes, abonnés, viralité, faux chiffres, temps d'écran.",
    tranches: ["12-14", "15-18"],
  },
  {
    id: "technologie-ia",
    nom: "Technologie et IA",
    contenu: "Smartphones, robots, codage, intelligence artificielle, cryptographie.",
    tranches: ["9-11", "12-14", "15-18", "adultes"],
  },
  {
    id: "cuisine",
    nom: "Cuisine",
    contenu: "Recettes, proportions, cuisson, marché, goûter, boulangerie.",
    tranches: ["6-8", "9-11", "12-14", "adultes"],
  },
  {
    id: "cinema-series",
    nom: "Cinéma et séries",
    contenu: "Durées, images par seconde, box-office, montage, salles.",
    tranches: ["12-14", "15-18", "adultes"],
  },
  {
    id: "corps-sante",
    nom: "Corps humain et santé",
    contenu: "Cœur, taille, sommeil, alimentation, épidémies, médicaments.",
    tranches: ["9-11", "12-14", "15-18", "adultes"],
  },
  {
    id: "argent-budget",
    nom: "Argent et budget",
    contenu: "Prix, soldes, pourcentages, épargne, salaires, monnaies.",
    tranches: ["12-14", "15-18", "adultes"],
  },
  {
    id: "transports",
    nom: "Transports et voyages",
    contenu: "Vitesses, trajets, bouchons, avions, trains, cartes et itinéraires.",
    tranches: ["9-11", "12-14", "15-18", "adultes"],
  },
  {
    id: "histoire-geographie",
    nom: "Histoire et géographie",
    contenu: "Populations, cartes, frises, monuments, peuples, records du monde.",
    tranches: ["9-11", "12-14", "15-18", "adultes"],
  },
  {
    id: "art-design",
    nom: "Art, dessin et mode",
    contenu: "Formes, symétries, couleurs, architecture, mode, photo.",
    tranches: ["6-8", "9-11", "12-14", "15-18"],
  },
  {
    id: "sciences",
    nom: "Sciences et inventions",
    contenu: "Expériences, mesures, laboratoire, inventions, physique du quotidien.",
    tranches: ["9-11", "12-14", "15-18"],
  },
];

export const CENTRE_PAR_ID = new Map(CENTRES_INTERET.map((c) => [c.id, c]));

// ─── L'ICÔNE ET LES PRÉCISIONS, pour que l'ÉLÈVE choisisse (30/10/2026) ───────
//
// Frédéric : « quand les élèves se connectent, ce serait bien qu'ils
// sélectionnent leurs centres d'intérêt » — « mets une icône ou une image »
// (ses 6e lisent mal) — et « j'ai un élève de 6e qui adore la lutte » : « Sport »
// est trop large pour accrocher CET élève-là. D'où un deuxième niveau, et une
// case libre « Autre ». ⭐ Le but : partir de la passion pour amener l'élève,
// petit à petit, vers les maths (« je faisais des cours sur le rugby à un élève
// de soutien scolaire : là il comprenait »).
// Les vidéos restent étiquetées au premier niveau ; une précision (« lutte »)
// dit à Frédéric quelle vidéo écrire ensuite (tableau /admin/passions).

export type PrecisionCentre = { id: string; nom: string; emoji: string };

export const EMOJI_CENTRE: Record<string, string> = {
  sport: "⚽",
  musique: "🎵",
  animaux: "🐢",
  "nature-ecologie": "🌋",
  "meteo-climat": "🌀",
  espace: "🚀",
  "jeux-video": "🎮",
  "jeux-defis": "🧩",
  "reseaux-sociaux": "📱",
  "technologie-ia": "🤖",
  cuisine: "🍳",
  "cinema-series": "🎬",
  "corps-sante": "❤️",
  "argent-budget": "💰",
  transports: "✈️",
  "histoire-geographie": "🗺️",
  "art-design": "🎨",
  sciences: "🔬",
};

export const PRECISIONS_CENTRE: Record<string, PrecisionCentre[]> = {
  sport: [
    { id: "football", nom: "Football", emoji: "⚽" },
    { id: "rugby", nom: "Rugby", emoji: "🏉" },
    { id: "lutte", nom: "Lutte", emoji: "🤼" },
    { id: "judo-karate-boxe", nom: "Judo, karaté, boxe", emoji: "🥋" },
    { id: "basket", nom: "Basket", emoji: "🏀" },
    { id: "handball-volley", nom: "Hand, volley", emoji: "🤾" },
    { id: "natation", nom: "Natation", emoji: "🏊" },
    { id: "surf", nom: "Surf, mer", emoji: "🏄" },
    { id: "course-trail", nom: "Course, trail", emoji: "🏃" },
    { id: "velo", nom: "Vélo, BMX", emoji: "🚴" },
    { id: "tennis", nom: "Tennis, badminton", emoji: "🎾" },
    { id: "danse", nom: "Danse", emoji: "💃" },
  ],
  musique: [
    { id: "rap", nom: "Rap", emoji: "🎤" },
    { id: "chant", nom: "Chant", emoji: "🎙️" },
    { id: "instrument", nom: "Jouer d'un instrument", emoji: "🎸" },
    { id: "maloya-sega", nom: "Maloya, séga", emoji: "🥁" },
    { id: "electro-dj", nom: "Électro, DJ", emoji: "🎧" },
  ],
  animaux: [
    { id: "chiens-chats", nom: "Chiens et chats", emoji: "🐶" },
    { id: "chevaux", nom: "Chevaux", emoji: "🐴" },
    { id: "animaux-marins", nom: "Animaux marins", emoji: "🐋" },
    { id: "dinosaures", nom: "Dinosaures", emoji: "🦖" },
  ],
  "jeux-video": [
    { id: "construction", nom: "Construction", emoji: "🧱" },
    { id: "combat-action", nom: "Action, combat", emoji: "⚔️" },
    { id: "course-auto", nom: "Course auto", emoji: "🏎️" },
    { id: "foot-console", nom: "Sport sur console", emoji: "🕹️" },
  ],
  transports: [
    { id: "voitures-motos", nom: "Voitures, motos", emoji: "🏍️" },
    { id: "avions", nom: "Avions", emoji: "🛩️" },
    { id: "bateaux", nom: "Bateaux", emoji: "⛵" },
  ],
  "art-design": [
    { id: "dessin-manga", nom: "Dessin, manga", emoji: "✏️" },
    { id: "mode", nom: "Mode", emoji: "👗" },
    { id: "photo", nom: "Photo", emoji: "📷" },
  ],
};

/**
 * Une passion enregistrée : « sport », « sport:lutte » ou « autre:pétanque ».
 * Le premier niveau sert à trouver les vidéos ; le reste informe Frédéric.
 */
export function centreDePassion(passion: string): string | null {
  const [centre] = passion.split(":");
  return CENTRE_PAR_ID.has(centre) ? centre : null;
}

export function libellePassion(passion: string): { nom: string; emoji: string } {
  const [centre, precision] = passion.split(":");
  if (centre === "autre") return { nom: precision ?? "Autre", emoji: "⭐" };
  const p = precision ? PRECISIONS_CENTRE[centre]?.find((x) => x.id === precision) : null;
  if (p) return { nom: p.nom, emoji: p.emoji };
  return { nom: CENTRE_PAR_ID.get(centre)?.nom ?? centre, emoji: EMOJI_CENTRE[centre] ?? "⭐" };
}

/** Valide une passion envoyée par le navigateur (liste fermée + « autre:» court). */
export function passionValide(passion: unknown): passion is string {
  if (typeof passion !== "string" || passion.length > 60) return false;
  const [centre, precision, ...reste] = passion.split(":");
  if (reste.length) return false;
  if (centre === "autre") return !!precision && precision.trim().length >= 2;
  if (!CENTRE_PAR_ID.has(centre)) return false;
  return !precision || !!PRECISIONS_CENTRE[centre]?.some((x) => x.id === precision);
}

export const MAX_PASSIONS = 3;
