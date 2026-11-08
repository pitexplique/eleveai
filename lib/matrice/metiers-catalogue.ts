// lib/matrice/metiers-catalogue.ts
//
// ⭐ LE CATALOGUE DES MÉTIERS de la matrice de correspondance (08/11/2026).
//
// Frédéric, 20/10 : « un des buts de l'apprentissage est d'ÉVOQUER DES
// VOCATIONS » et « les mathématiques sont TRANSVERSALES ». Chaque notion montre
// donc des métiers réels qui s'en servent (lib/matrice/metiers.ts).
//
// Règles du catalogue :
//   - un métier a ses DEUX formes, féminine et masculine : c'est le LIEN
//     (notion → métier) qui choisit laquelle on montre, pour équilibrer filles
//     et garçons dans chaque classe (scripts/verifier-metiers.ts le mesure) ;
//   - `centres` = 1 à 3 ids de la liste FERMÉE lib/videos/centres-interet.ts,
//     la même que /passions : un élève qui aime la musique voit d'abord
//     l'ingénieure du son ;
//   - `etudes` est indicatif : il montre qu'il y a des métiers à tous les
//     niveaux (CAP compris), sans rien promettre ;
//   - les métiers sont universels ; la touche réunionnaise se met dans le LIEN
//     (`reunion: true`), et reste rare (≈ 4 %, mémoire la-reunion-seulement-4-pourcent).

export type Etudes = "CAP" | "bac pro" | "bac" | "bac+2" | "bac+3" | "bac+5" | "bac+6" | "bac+8" | "bac+9" | "variable";

export type Metier = {
  /** Forme féminine (« ingénieure du son »). */
  f: string;
  /** Forme masculine (« ingénieur du son »). */
  m: string;
  /** Ids de lib/videos/centres-interet.ts — ceux de /passions. */
  centres: string[];
  etudes: Etudes;
  /** Ce que fait ce métier, en une ligne lisible en 6e. */
  ligne: string;
};

export const METIERS = {
  // ─── Santé ───────────────────────────────────────────────────────────────
  infirmier: { f: "infirmière", m: "infirmier", centres: ["corps-sante"], etudes: "bac+3", ligne: "soigne les patients et prépare les doses de médicaments." },
  medecin: { f: "médecin", m: "médecin", centres: ["corps-sante"], etudes: "bac+9", ligne: "examine, soigne et suit la santé des patients." },
  pharmacien: { f: "pharmacienne", m: "pharmacien", centres: ["corps-sante", "sciences"], etudes: "bac+6", ligne: "délivre les médicaments et vérifie les doses." },
  "sage-femme": { f: "sage-femme", m: "maïeuticien", centres: ["corps-sante"], etudes: "bac+5", ligne: "accompagne les grossesses et les naissances." },
  kine: { f: "kinésithérapeute", m: "kinésithérapeute", centres: ["corps-sante", "sport"], etudes: "bac+5", ligne: "rééduque les muscles et les articulations." },
  dieteticien: { f: "diététicienne", m: "diététicien", centres: ["corps-sante", "cuisine"], etudes: "bac+2", ligne: "compose des repas équilibrés." },
  opticien: { f: "opticienne", m: "opticien", centres: ["corps-sante", "sciences"], etudes: "bac+2", ligne: "mesure la vue et fabrique les lunettes." },
  "manip-radio": { f: "manipulatrice en radiologie", m: "manipulateur en radiologie", centres: ["corps-sante", "technologie-ia"], etudes: "bac+3", ligne: "fait les radios et les scanners à l'hôpital." },
  epidemiologiste: { f: "épidémiologiste", m: "épidémiologiste", centres: ["corps-sante", "sciences"], etudes: "bac+5", ligne: "suit la façon dont les maladies se propagent." },
  pompier: { f: "sapeuse-pompière", m: "sapeur-pompier", centres: ["corps-sante", "transports"], etudes: "bac", ligne: "porte secours et combat les incendies." },

  // ─── Animaux, nature, agriculture ────────────────────────────────────────
  veterinaire: { f: "vétérinaire", m: "vétérinaire", centres: ["animaux", "corps-sante"], etudes: "bac+6", ligne: "soigne les animaux." },
  soigneur: { f: "soigneuse animalière", m: "soigneur animalier", centres: ["animaux"], etudes: "bac pro", ligne: "nourrit et soigne les animaux d'un zoo ou d'un refuge." },
  eleveur: { f: "éleveuse", m: "éleveur", centres: ["animaux", "nature-ecologie"], etudes: "bac pro", ligne: "élève des animaux à la ferme." },
  apiculteur: { f: "apicultrice", m: "apiculteur", centres: ["animaux", "nature-ecologie"], etudes: "bac pro", ligne: "élève des abeilles et récolte le miel." },
  agriculteur: { f: "agricultrice", m: "agriculteur", centres: ["nature-ecologie", "cuisine"], etudes: "bac pro", ligne: "cultive les champs et récolte." },
  maraicher: { f: "maraîchère", m: "maraîcher", centres: ["nature-ecologie", "cuisine"], etudes: "bac pro", ligne: "cultive des légumes et les vend au marché." },
  agronome: { f: "ingénieure agronome", m: "ingénieur agronome", centres: ["nature-ecologie", "sciences"], etudes: "bac+5", ligne: "aide les cultures à mieux pousser en abîmant moins la nature." },
  jardinier: { f: "jardinière", m: "jardinier", centres: ["nature-ecologie"], etudes: "CAP", ligne: "plante et entretient les jardins et les parcs." },
  paysagiste: { f: "paysagiste", m: "paysagiste", centres: ["nature-ecologie", "art-design"], etudes: "bac pro", ligne: "dessine et aménage les jardins." },
  fleuriste: { f: "fleuriste", m: "fleuriste", centres: ["nature-ecologie", "art-design"], etudes: "CAP", ligne: "compose et vend des bouquets." },
  "garde-forestier": { f: "garde forestière", m: "garde forestier", centres: ["nature-ecologie", "animaux"], etudes: "bac+2", ligne: "protège et gère les forêts." },
  ranger: { f: "garde de parc naturel", m: "garde de parc naturel", centres: ["nature-ecologie", "animaux"], etudes: "bac", ligne: "veille sur un parc naturel, ses animaux et ses visiteurs." },
  biologiste: { f: "biologiste", m: "biologiste", centres: ["animaux", "sciences", "nature-ecologie"], etudes: "bac+5", ligne: "étudie les êtres vivants, sur le terrain et au laboratoire." },
  oceanographe: { f: "océanographe", m: "océanographe", centres: ["nature-ecologie", "sciences", "animaux"], etudes: "bac+5", ligne: "étudie les océans et leurs courants." },
  "marin-pecheur": { f: "marin-pêcheuse", m: "marin-pêcheur", centres: ["nature-ecologie", "transports"], etudes: "CAP", ligne: "pêche en mer en respectant les quotas." },

  // ─── Climat, Terre, espace, sciences ─────────────────────────────────────
  meteorologue: { f: "météorologue", m: "météorologue", centres: ["meteo-climat", "sciences"], etudes: "bac+3", ligne: "prévoit le temps qu'il va faire." },
  climatologue: { f: "climatologue", m: "climatologue", centres: ["meteo-climat", "sciences"], etudes: "bac+8", ligne: "étudie le climat sur des dizaines d'années." },
  volcanologue: { f: "volcanologue", m: "volcanologue", centres: ["nature-ecologie", "sciences"], etudes: "bac+8", ligne: "surveille les volcans et prévoit les éruptions." },
  geologue: { f: "géologue", m: "géologue", centres: ["sciences", "nature-ecologie"], etudes: "bac+5", ligne: "étudie les roches, les séismes et le sous-sol." },
  astronome: { f: "astrophysicienne", m: "astronome", centres: ["espace", "sciences"], etudes: "bac+8", ligne: "étudie les étoiles, les planètes et les galaxies." },
  "ingenieur-spatial": { f: "ingénieure spatiale", m: "ingénieur spatial", centres: ["espace", "technologie-ia"], etudes: "bac+5", ligne: "conçoit des fusées et des satellites." },
  "technicien-labo": { f: "technicienne de laboratoire", m: "technicien de laboratoire", centres: ["sciences", "corps-sante"], etudes: "bac+2", ligne: "fait les analyses et les mesures au laboratoire." },
  "controleur-qualite": { f: "contrôleuse qualité", m: "contrôleur qualité", centres: ["sciences", "technologie-ia"], etudes: "bac+2", ligne: "vérifie que les produits fabriqués sont bons." },
  "ingenieur-hydraulique": { f: "ingénieure de l'eau", m: "ingénieur de l'eau", centres: ["nature-ecologie", "sciences"], etudes: "bac+5", ligne: "conçoit les barrages, les réservoirs et les réseaux d'eau." },
  "technicien-energie": { f: "technicienne en énergies renouvelables", m: "technicien en énergies renouvelables", centres: ["nature-ecologie", "technologie-ia"], etudes: "bac+2", ligne: "installe et entretient panneaux solaires et éoliennes." },

  // ─── Bâtiment, ville, artisanat ──────────────────────────────────────────
  architecte: { f: "architecte", m: "architecte", centres: ["art-design", "histoire-geographie"], etudes: "bac+5", ligne: "dessine les maisons et les bâtiments." },
  urbaniste: { f: "urbaniste", m: "urbaniste", centres: ["histoire-geographie", "transports"], etudes: "bac+5", ligne: "organise les quartiers, les rues et les transports d'une ville." },
  "ingenieur-btp": { f: "ingénieure en bâtiment", m: "ingénieur en bâtiment", centres: ["sciences", "art-design"], etudes: "bac+5", ligne: "calcule les ponts et les bâtiments pour qu'ils tiennent." },
  "dessinateur-projeteur": { f: "dessinatrice-projeteuse", m: "dessinateur-projeteur", centres: ["art-design", "technologie-ia"], etudes: "bac+2", ligne: "dessine les plans précis d'un bâtiment ou d'une machine." },
  geometre: { f: "géomètre-topographe", m: "géomètre-topographe", centres: ["histoire-geographie", "sciences"], etudes: "bac+2", ligne: "mesure les terrains et trace leurs limites." },
  cartographe: { f: "cartographe", m: "cartographe", centres: ["histoire-geographie"], etudes: "bac+3", ligne: "dessine les cartes." },
  macon: { f: "maçonne", m: "maçon", centres: ["art-design"], etudes: "CAP", ligne: "construit les murs et les fondations." },
  carreleur: { f: "carreleuse", m: "carreleur", centres: ["art-design"], etudes: "CAP", ligne: "pose le carrelage des sols et des murs." },
  menuisier: { f: "menuisière", m: "menuisier", centres: ["art-design"], etudes: "CAP", ligne: "fabrique des meubles, des portes et des fenêtres en bois." },
  charpentier: { f: "charpentière", m: "charpentier", centres: ["art-design"], etudes: "CAP", ligne: "construit les charpentes en bois des toits." },
  electricien: { f: "électricienne", m: "électricien", centres: ["technologie-ia"], etudes: "CAP", ligne: "installe l'électricité dans les bâtiments." },
  mecanicien: { f: "mécanicienne", m: "mécanicien", centres: ["transports", "technologie-ia"], etudes: "CAP", ligne: "répare les voitures, les vélos et les moteurs." },
  "mecanicien-aero": { f: "mécanicienne aéronautique", m: "mécanicien aéronautique", centres: ["transports", "technologie-ia"], etudes: "bac pro", ligne: "entretient les avions avant chaque vol." },
  horloger: { f: "horlogère", m: "horloger", centres: ["art-design", "sciences"], etudes: "CAP", ligne: "fabrique et répare les montres." },

  // ─── Musique, cinéma, art, mode ──────────────────────────────────────────
  "ingenieur-son": { f: "ingénieure du son", m: "ingénieur du son", centres: ["musique", "cinema-series"], etudes: "bac+3", ligne: "enregistre et mixe la musique et les films." },
  compositeur: { f: "compositrice", m: "compositeur", centres: ["musique", "cinema-series"], etudes: "variable", ligne: "écrit la musique des chansons, des films et des jeux." },
  musicien: { f: "musicienne", m: "musicien", centres: ["musique"], etudes: "variable", ligne: "joue d'un instrument en concert ou en studio." },
  dj: { f: "DJ", m: "DJ", centres: ["musique"], etudes: "variable", ligne: "enchaîne les morceaux pour faire danser." },
  eclairagiste: { f: "éclairagiste", m: "éclairagiste", centres: ["musique", "cinema-series"], etudes: "bac+2", ligne: "règle les lumières des concerts et des spectacles." },
  luthier: { f: "luthière", m: "luthier", centres: ["musique", "art-design"], etudes: "CAP", ligne: "fabrique et répare les guitares et les violons." },
  danseur: { f: "danseuse", m: "danseur", centres: ["musique", "sport"], etudes: "variable", ligne: "danse sur scène." },
  choregraphe: { f: "chorégraphe", m: "chorégraphe", centres: ["musique", "sport", "art-design"], etudes: "variable", ligne: "invente les danses et place les danseurs." },
  realisateur: { f: "réalisatrice", m: "réalisateur", centres: ["cinema-series"], etudes: "bac+3", ligne: "dirige le tournage d'un film." },
  monteur: { f: "monteuse vidéo", m: "monteur vidéo", centres: ["cinema-series", "reseaux-sociaux"], etudes: "bac+2", ligne: "assemble les images d'un film ou d'une vidéo." },
  "animateur-3d": { f: "animatrice 3D", m: "animateur 3D", centres: ["cinema-series", "jeux-video", "art-design"], etudes: "bac+3", ligne: "fait bouger les personnages des dessins animés." },
  photographe: { f: "photographe", m: "photographe", centres: ["art-design", "reseaux-sociaux"], etudes: "bac pro", ligne: "prend et retouche les photos." },
  graphiste: { f: "graphiste", m: "graphiste", centres: ["art-design", "reseaux-sociaux"], etudes: "bac+2", ligne: "crée des logos, des affiches et des images." },
  styliste: { f: "styliste", m: "styliste", centres: ["art-design"], etudes: "bac+3", ligne: "invente les vêtements." },
  couturier: { f: "couturière", m: "couturier", centres: ["art-design"], etudes: "CAP", ligne: "coupe et coud les vêtements." },
  peintre: { f: "artiste peintre", m: "artiste peintre", centres: ["art-design"], etudes: "variable", ligne: "peint des tableaux et des fresques." },
  conservateur: { f: "conservatrice de musée", m: "conservateur de musée", centres: ["histoire-geographie", "art-design"], etudes: "bac+5", ligne: "prend soin des œuvres d'un musée." },

  // ─── Numérique ───────────────────────────────────────────────────────────
  "game-designer": { f: "game designer", m: "game designer", centres: ["jeux-video", "technologie-ia"], etudes: "bac+3", ligne: "invente les règles et les niveaux des jeux vidéo." },
  developpeur: { f: "développeuse", m: "développeur", centres: ["technologie-ia", "jeux-video"], etudes: "bac+3", ligne: "écrit les programmes des applis et des sites." },
  "data-analyst": { f: "analyste de données", m: "analyste de données", centres: ["technologie-ia", "argent-budget"], etudes: "bac+5", ligne: "fait parler les grands tableaux de chiffres." },
  cyber: { f: "ingénieure en cybersécurité", m: "ingénieur en cybersécurité", centres: ["technologie-ia"], etudes: "bac+5", ligne: "protège les ordinateurs et les données contre les pirates." },
  roboticien: { f: "ingénieure en robotique", m: "ingénieur en robotique", centres: ["technologie-ia", "sciences"], etudes: "bac+5", ligne: "conçoit et programme des robots." },
  microelec: { f: "ingénieure en microélectronique", m: "ingénieur en microélectronique", centres: ["technologie-ia", "sciences"], etudes: "bac+5", ligne: "dessine les puces des téléphones et des ordinateurs." },
  "chercheur-ia": { f: "chercheuse en intelligence artificielle", m: "chercheur en intelligence artificielle", centres: ["technologie-ia"], etudes: "bac+8", ligne: "invente les IA de demain." },
  "ingenieur-telecom": { f: "ingénieure télécoms", m: "ingénieur télécoms", centres: ["technologie-ia", "reseaux-sociaux"], etudes: "bac+5", ligne: "installe les antennes et les réseaux de téléphone." },
  "technicien-maintenance": { f: "technicienne de maintenance", m: "technicien de maintenance", centres: ["technologie-ia", "transports"], etudes: "bac+2", ligne: "répare et entretient les machines." },
  "community-manager": { f: "community manager", m: "community manager", centres: ["reseaux-sociaux"], etudes: "bac+3", ligne: "anime les réseaux sociaux d'une marque ou d'un club." },
  createur: { f: "créatrice de vidéos", m: "créateur de vidéos", centres: ["reseaux-sociaux", "cinema-series"], etudes: "variable", ligne: "tourne et publie des vidéos en ligne." },
  telepilote: { f: "télépilote de drone", m: "télépilote de drone", centres: ["technologie-ia", "transports"], etudes: "bac", ligne: "pilote des drones pour filmer, cartographier ou inspecter." },

  // ─── Sport ───────────────────────────────────────────────────────────────
  entraineur: { f: "entraîneuse", m: "entraîneur", centres: ["sport"], etudes: "bac+3", ligne: "prépare les sportifs et l'équipe." },
  arbitre: { f: "arbitre", m: "arbitre", centres: ["sport"], etudes: "variable", ligne: "fait respecter les règles du match." },
  "preparateur-physique": { f: "préparatrice physique", m: "préparateur physique", centres: ["sport", "corps-sante"], etudes: "bac+3", ligne: "fait progresser l'endurance et la force des sportifs." },
  "analyste-sportif": { f: "analyste de la performance", m: "analyste de la performance", centres: ["sport", "technologie-ia"], etudes: "bac+5", ligne: "étudie les chiffres d'un match pour faire gagner l'équipe." },
  "maitre-nageur": { f: "maîtresse-nageuse sauveteuse", m: "maître-nageur sauveteur", centres: ["sport"], etudes: "bac", ligne: "surveille la piscine et apprend à nager." },
  "guide-montagne": { f: "guide de haute montagne", m: "guide de haute montagne", centres: ["sport", "nature-ecologie"], etudes: "bac+3", ligne: "emmène les randonneurs et les alpinistes en sécurité." },
  navigateur: { f: "navigatrice", m: "navigateur", centres: ["sport", "transports"], etudes: "variable", ligne: "court en voilier autour du monde." },

  // ─── Cuisine et commerce ─────────────────────────────────────────────────
  boulanger: { f: "boulangère", m: "boulanger", centres: ["cuisine"], etudes: "CAP", ligne: "fait le pain chaque matin." },
  patissier: { f: "pâtissière", m: "pâtissier", centres: ["cuisine"], etudes: "CAP", ligne: "prépare les gâteaux et les desserts." },
  cuisinier: { f: "cheffe cuisinière", m: "chef cuisinier", centres: ["cuisine"], etudes: "CAP", ligne: "invente et prépare les plats d'un restaurant." },
  vendeur: { f: "vendeuse", m: "vendeur", centres: ["argent-budget"], etudes: "bac pro", ligne: "conseille les clients et tient la caisse." },
  commercant: { f: "commerçante", m: "commerçant", centres: ["argent-budget"], etudes: "variable", ligne: "tient sa boutique : achats, prix, ventes." },
  comptable: { f: "comptable", m: "comptable", centres: ["argent-budget"], etudes: "bac+2", ligne: "tient les comptes d'une entreprise." },
  "conseiller-bancaire": { f: "conseillère bancaire", m: "conseiller bancaire", centres: ["argent-budget"], etudes: "bac+2", ligne: "aide à gérer un budget, une épargne ou un prêt." },
  economiste: { f: "économiste", m: "économiste", centres: ["argent-budget", "histoire-geographie"], etudes: "bac+5", ligne: "étudie les prix, les salaires et le commerce d'un pays." },
  actuaire: { f: "actuaire", m: "actuaire", centres: ["argent-budget", "sciences"], etudes: "bac+5", ligne: "calcule les risques pour les assurances." },
  "agent-immobilier": { f: "agente immobilière", m: "agent immobilier", centres: ["argent-budget"], etudes: "bac+2", ligne: "vend et loue des logements." },

  // ─── Transports ──────────────────────────────────────────────────────────
  pilote: { f: "pilote de ligne", m: "pilote de ligne", centres: ["transports"], etudes: "bac+3", ligne: "pilote des avions de passagers." },
  "controleur-aerien": { f: "contrôleuse aérienne", m: "contrôleur aérien", centres: ["transports"], etudes: "bac+3", ligne: "guide les avions dans le ciel depuis la tour." },
  capitaine: { f: "capitaine de navire", m: "capitaine de navire", centres: ["transports"], etudes: "bac+5", ligne: "commande un bateau et trace sa route." },
  logisticien: { f: "logisticienne", m: "logisticien", centres: ["transports", "argent-budget"], etudes: "bac+2", ligne: "organise le stockage et le transport des marchandises." },
  livreur: { f: "livreuse", m: "livreur", centres: ["transports"], etudes: "CAP", ligne: "livre les colis dans les temps." },
  facteur: { f: "factrice", m: "facteur", centres: ["transports"], etudes: "CAP", ligne: "distribue le courrier dans chaque rue." },
  "conducteur-bus": { f: "conductrice de bus", m: "conducteur de bus", centres: ["transports"], etudes: "CAP", ligne: "conduit les passagers en respectant les horaires." },

  // ─── Histoire, géographie, information ───────────────────────────────────
  historien: { f: "historienne", m: "historien", centres: ["histoire-geographie"], etudes: "bac+5", ligne: "étudie le passé à partir des archives." },
  archeologue: { f: "archéologue", m: "archéologue", centres: ["histoire-geographie", "sciences"], etudes: "bac+5", ligne: "fouille le sol pour retrouver les traces du passé." },
  "guide-conferencier": { f: "guide-conférencière", m: "guide-conférencier", centres: ["histoire-geographie"], etudes: "bac+3", ligne: "fait visiter les monuments et les musées." },
  bibliothecaire: { f: "bibliothécaire", m: "bibliothécaire", centres: ["histoire-geographie"], etudes: "bac+2", ligne: "range, prête et conseille les livres." },
  journaliste: { f: "journaliste", m: "journaliste", centres: ["reseaux-sociaux", "histoire-geographie"], etudes: "bac+5", ligne: "enquête et explique l'actualité." },
  sondeur: { f: "chargée d'études en sondages", m: "chargé d'études en sondages", centres: ["reseaux-sociaux", "histoire-geographie"], etudes: "bac+5", ligne: "interroge les gens et tire des conclusions de leurs réponses." },
  statisticien: { f: "statisticienne", m: "statisticien", centres: ["sciences", "argent-budget"], etudes: "bac+5", ligne: "tire des conclusions sûres à partir des données." },
} satisfies Record<string, Metier>;

export type MetierId = keyof typeof METIERS;

/** Un lien notion → métier : ce que CE métier fait de CETTE notion. */
export type LienMetier = {
  metier: MetierId;
  /** La forme montrée : on équilibre filles et garçons dans chaque classe. */
  genre: "f" | "m";
  /** Une phrase, au présent, sujet = le métier ; concrète, chiffrée si possible. */
  usage: string;
  /** Ce métier est déjà montré dans une vidéo de cette notion (manifeste). */
  enVideo?: boolean;
  /** Contexte réunionnais : ≈ 4 % des liens au plus. */
  reunion?: boolean;
};

type Options = { enVideo?: boolean; reunion?: boolean };

/** Lien au féminin. */
export const F = (metier: MetierId, usage: string, o: Options = {}): LienMetier => ({ metier, genre: "f", usage, ...o });
/** Lien au masculin. */
export const M = (metier: MetierId, usage: string, o: Options = {}): LienMetier => ({ metier, genre: "m", usage, ...o });

/** Déjà dans une vidéo de la notion. */
export const V: Options = { enVideo: true };
/** Contexte réunionnais (rare). */
export const R: Options = { reunion: true };
