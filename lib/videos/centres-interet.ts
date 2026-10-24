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
