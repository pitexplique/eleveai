// LA FAMILLE DES « MACHINES DANS TA MAIN » — les simulateurs interactifs de
// l'île + les animations « un peu de maths ». Source UNIQUE, partagée par la
// page hub /simulateurs et l'accueil (réclame de la plus récente + avant-goût).
//
// Règle produit (24/07) : chaque machine est une PORTE — elle fait comprendre,
// puis renvoie au coach pour s'entraîner (le pont vit dans DefisSimulateur).
// Voir la mémoire « coach-destination-journal-porte ».

export type Machine = {
  href: string;
  emoji: string;
  nom: string;
  /** Ce qu'on comprend en la réglant. */
  notion: string;
  /** Le verbe pour agir (le bouton de la machine). */
  cta: string;
  /** L'illustration dessinée (webp photo-BD pour l'île, svg pour les maths). */
  image: string;
  /** « reel » = en vrai à La Réunion · « maths » = un peu de maths. */
  groupe: "reel" | "maths";
  /** Date de parution (ISO) — pour trier « la plus récente ». */
  date: string;
};

export const MACHINES: Machine[] = [
  // ── En vrai, à La Réunion ──────────────────────────────────────────────────
  { href: "/simulateur-cyclone", emoji: "🌀", nom: "Dans l'œil du cyclone", notion: "Trajectoire et vent : la trigonométrie de la tempête.", cta: "Lancer ton cyclone", image: "/images/cyclone-simulateur.webp", groupe: "reel", date: "2026-07-18" },
  { href: "/simulateur-sucre", emoji: "🏭", nom: "L'usine à sucre", notion: "Du champ de canne au sucre et à la lumière : rendements et proportions.", cta: "Faire tourner l'usine", image: "/images/usine-sucre.webp", groupe: "reel", date: "2026-07-18" },
  { href: "/simulateur-fromage", emoji: "🧀", nom: "La fromagerie", notion: "Du lait des Hauts au pot : proportions et transformations.", cta: "Remplir les pots", image: "/images/fromagerie.webp", groupe: "reel", date: "2026-07-18" },
  { href: "/simulateur-barrage", emoji: "💧", nom: "Le barrage de Takamaka", notion: "L'eau tombe de 500 m, l'île s'allume : l'énergie m·g·h.", cta: "Ouvrir les vannes", image: "/images/barrage-takamaka.webp", groupe: "reel", date: "2026-07-19" },
  { href: "/simulateur-volcan", emoji: "🌋", nom: "Le volcan de la Fournaise", notion: "La Fournaise fabrique l'île : débit, volume, vitesse.", cta: "Régler la lave", image: "/images/volcan-piton-de-la-fournaise.webp", groupe: "reel", date: "2026-07-19" },
  { href: "/simulateur-lagon", emoji: "🐠", nom: "Le lagon de l'Ermitage", notion: "La barrière casse 90 % de la houle : pourcentages et énergie.", cta: "Régler la houle", image: "/images/lagon.webp", groupe: "reel", date: "2026-07-20" },
  { href: "/simulateur-energie", emoji: "💪", nom: "La centrale, c'est toi", notion: "Tes watts deviennent des joules, des kcal, des ampoules — puis l'assiette répare le muscle.", cta: "Régler ton effort", image: "/images/salle-energie.svg", groupe: "reel", date: "2026-07-24" },
  { href: "/simulateur-hotel", emoji: "🏨", nom: "L'hôtel Le Terre Sainte", notion: "La vraie grille d'un hôtel de Saint-Pierre : trois catégories, quatre saisons — le tableau à double entrée, la moyenne pondérée, le RevPAR et le point mort.", cta: "Remplir l'hôtel", image: "/images/hotel-terre-sainte.svg", groupe: "reel", date: "2026-08-05" },
  // ── Un peu de maths ─────────────────────────────────────────────────────────
  { href: "/simulateur-epsilon", emoji: "⚡", nom: "La machine des epsilons", notion: "Un petit coefficient k, une suite géométrique : des epsilons engendrent des infinis.", cta: "Activer un epsilon", image: "/images/coeur-epsilon-infini.svg", groupe: "maths", date: "2026-07-20" },
  { href: "/loi-normale", emoji: "🔔", nom: "La courbe en cloche", notion: "La planche de Galton et la loi normale : le théorème de De Moivre-Laplace.", cta: "Régler la cloche", image: "/images/binomiale-vers-normale.svg", groupe: "maths", date: "2026-07-21" },
  { href: "/exponentielle", emoji: "📈", nom: "L'exponentielle en miroir", notion: "eˣ qui monte, la courbe de l'oubli qui descend.", cta: "Faire grimper la courbe", image: "/images/exponentielle-miroir.svg", groupe: "maths", date: "2026-07-22" },
  { href: "/loi-performance", emoji: "🧠", nom: "La loi de la performance", notion: "Le neurone du dessin : Σ aᵢxᵢ — améliorer ses défauts ou ses qualités ?", cta: "Régler tes coefficients", image: "/images/adn-reseau-coeur.svg", groupe: "maths", date: "2026-07-22" },
  { href: "/loi-pareto", emoji: "⚽", nom: "Le but qui sort de la moyenne", notion: "La loi de Pareto : la queue lourde où naissent les records, face à la cloche.", cta: "Faire surgir les records", image: "/images/pareto-mbappe.svg", groupe: "maths", date: "2026-07-22" },
  { href: "/diagonale-des-fous", emoji: "🏃", nom: "La Diagonale des Fous", notion: "L'équation différentielle du coureur : la réserve se vide au carré de l'effort (Euler).", cta: "Doser ta course", image: "/images/diagonale-des-fous.svg", groupe: "maths", date: "2026-07-23" },
  { href: "/aiguille-de-kakeya", emoji: "🪡", nom: "L'aiguille de Kakeya", notion: "Hong Wang, médaille Fields 2026 : le demi-tour le plus économe — l'aire divisée par 2 à chaque ruse, vers 0.", cta: "Faire tourner l'aiguille", image: "/images/aiguille-de-kakeya.svg", groupe: "maths", date: "2026-07-25" },
  { href: "/dimension-du-volcan", emoji: "📏", nom: "La dimension du volcan", notion: "Compte les carrés sur le rempart de la Fournaise : la rugosité est un nombre — la dimension fractale, d ≈ 1,25.", cta: "Mesurer le rempart", image: "/images/dimension-volcan.svg", groupe: "maths", date: "2026-07-26" },
  { href: "/pourquoi-les-bulles-sont-rondes", emoji: "🫧", nom: "Pourquoi les bulles sont rondes", notion: "À ficelle égale, quelle forme enferme le plus ? Le cercle, toujours — la question d'enfance de Yilin Wang. Avec des défis du CP à la Terminale.", cta: "Souffler la bulle", image: "/images/bulles-rondes.svg", groupe: "maths", date: "2026-07-30" },
];

/** Le compte, écrit une seule fois : les pages disent « les N machines ». */
export const NB_MACHINES = MACHINES.length;

/** Les machines, de la plus récente à la plus ancienne (réclame + avant-goût). */
export const MACHINES_RECENTES: Machine[] = [...MACHINES].sort((a, b) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : 0
);
