// LES TABLES DE LA FAMILLE « CULTURE » DU FRANÇAIS DE 6e (05/10/2026).
// Voir culture.ts pour les générateurs et leurs correcteurs.
//
// ⛔ DES FAITS SÛRS UNIQUEMENT. Aucune date discutable, aucune attribution
// douteuse (l'Odyssée n'est attribuée à personne ; pas de tableau dont
// l'auteur est débattu). Chaque relation est une FONCTION dans la réalité :
// une clé n'a qu'une réponse juste parmi les réponses de sa table. Quand ce
// n'est pas vrai (Athéna est aussi déesse de la guerre), la clé ou la valeur
// gênante a été retirée, pas « tolérée ».

/** Un fait : [clé, valeur]. La relation se lit dans les deux sens. */
export type Fait = readonly [string, string];

/** Une relation interrogeable dans les deux sens.
 *  Tournures : « %s » = la clé brute, « %S » = la clé avec majuscule,
 *  « %de » = « de / d' / du / des » + la clé, « %dt » = « de / du / des »
 *  + le TITRE entre guillemets (« du « Petit Poucet » »). */
export type Relation = {
  nom: string;
  faits: readonly Fait[];
  /** La clé est dans la phrase, on demande la valeur. */
  versValeur: readonly string[];
  /** La valeur est dans la phrase, on demande la clé. */
  versCle: readonly string[];
  methodeValeur: string;
  methodeCle: string;
  /** Paires [clé, valeur] FAUSSES dans la table mais PAS ASSEZ fausses pour
   *  servir de leurre (un alexandrin EST une ligne de poème, une fable EST un
   *  poème). Le générateur ne les propose jamais ; le correcteur les refuse. */
  proches?: readonly Fait[];
};

export const PRENOMS: readonly { p: string; f: boolean }[] = [
  { p: "Léa", f: true }, { p: "Inès", f: true }, { p: "Chloé", f: true }, { p: "Aïcha", f: true },
  { p: "Zoé", f: true }, { p: "Sofia", f: true }, { p: "Nora", f: true }, { p: "Jade", f: true },
  { p: "Maya", f: true }, { p: "Lina", f: true }, { p: "Amina", f: true }, { p: "Mei", f: true },
  { p: "Elif", f: true }, { p: "Rose", f: true }, { p: "Yasmine", f: true }, { p: "Clara", f: true },
  { p: "Noah", f: false }, { p: "Maël", f: false }, { p: "Yanis", f: false }, { p: "Kenji", f: false },
  { p: "Lucas", f: false }, { p: "Hugo", f: false }, { p: "Malo", f: false }, { p: "Ibrahim", f: false },
  { p: "Tom", f: false }, { p: "Nathan", f: false }, { p: "Rayan", f: false }, { p: "Diego", f: false },
  { p: "Enzo", f: false }, { p: "Moussa", f: false }, { p: "Théo", f: false }, { p: "Sami", f: false },
];

// ════════════════════════════════════════════════════════════════════════
// POÉSIE
// ════════════════════════════════════════════════════════════════════════

export const POESIE_TERMES: Relation = {
  nom: "poésie : mots du poème",
  faits: [
    ["vers", "une ligne d'un poème"],
    ["strophe", "un groupe de vers séparé des autres par une ligne blanche"],
    ["rime", "le retour d'un même son à la fin de deux vers"],
    ["quatrain", "une strophe de quatre vers"],
    ["tercet", "une strophe de trois vers"],
    ["distique", "une strophe de deux vers"],
    ["quintil", "une strophe de cinq vers"],
    ["sizain", "une strophe de six vers"],
    ["sonnet", "un poème de quatorze vers : deux quatrains puis deux tercets"],
    ["alexandrin", "un vers de douze syllabes"],
    ["décasyllabe", "un vers de dix syllabes"],
    ["octosyllabe", "un vers de huit syllabes"],
    ["vers libre", "un vers qui ne suit aucune règle de rime ni de longueur"],
    ["rimes plates", "des rimes qui se suivent deux par deux : AABB"],
    ["rimes croisées", "des rimes qui alternent : ABAB"],
    ["rimes embrassées", "une rime qui en entoure une autre : ABBA"],
    ["comparaison", "une image qui rapproche deux choses avec un mot comme « comme »"],
    ["métaphore", "une image qui rapproche deux choses sans mot de comparaison"],
    ["personnification", "une image qui prête des gestes humains à une chose ou à un animal"],
    ["refrain", "un ou plusieurs vers qui reviennent régulièrement dans le poème"],
    ["recueil", "un livre qui rassemble plusieurs poèmes"],
    ["calligramme", "un poème dont les mots dessinent une forme"],
    ["haïku", "un très court poème japonais de trois vers"],
    ["poète", "la personne qui écrit des poèmes"],
    ["allitération", "la répétition d'un même son de consonne"],
    ["assonance", "la répétition d'un même son de voyelle"],
    ["anaphore", "la reprise d'un même mot au début de plusieurs vers"],
    ["prose", "une écriture en phrases qui vont jusqu'au bout de la ligne, sans vers"],
    ["enjambement", "une phrase qui continue sur le vers suivant"],
  ],
  versValeur: [
    "En poésie, que veut dire le mot « %s » ?",
    "Dans un poème, qu'appelle-t-on « %s » ?",
    "Que désigne le mot « %s » quand on parle d'un poème ?",
  ],
  versCle: [
    "En poésie, quel mot désigne %s ?",
    "Comment appelle-t-on %s ?",
    "Quel est le mot juste pour %s ?",
  ],
  methodeValeur: "Rappelle-toi la leçon sur le poème : chaque mot désigne une partie précise.",
  methodeCle: "Lis bien la définition, puis cherche le mot de la leçon qui lui correspond.",
  proches: [
    ...["alexandrin", "décasyllabe", "octosyllabe", "vers libre"].map((k) => [k, "une ligne d'un poème"] as const),
    ...["quatrain", "tercet", "distique", "quintil", "sizain", "refrain"].map(
      (k) => [k, "un groupe de vers séparé des autres par une ligne blanche"] as const,
    ),
    ...["rimes plates", "rimes croisées", "rimes embrassées", "assonance"].map(
      (k) => [k, "le retour d'un même son à la fin de deux vers"] as const,
    ),
    ["rime", "la répétition d'un même son de voyelle"],
    ["haïku", "une strophe de trois vers"],
    ["tercet", "un très court poème japonais de trois vers"],
  ],
};

export const POEMES_POETES: Relation = {
  nom: "poésie : poèmes et poètes",
  faits: [
    ["« Demain, dès l'aube… »", "Victor Hugo"],
    ["« Le Dormeur du val »", "Arthur Rimbaud"],
    ["« Ma Bohème »", "Arthur Rimbaud"],
    ["« Chanson d'automne »", "Paul Verlaine"],
    ["« Le Pont Mirabeau »", "Guillaume Apollinaire"],
    ["« L'Albatros »", "Charles Baudelaire"],
    ["« Liberté »", "Paul Éluard"],
    ["« Le Cancre »", "Jacques Prévert"],
    ["« Déjeuner du matin »", "Jacques Prévert"],
    ["« Pour faire le portrait d'un oiseau »", "Jacques Prévert"],
    ["« Heureux qui, comme Ulysse, a fait un beau voyage »", "Joachim du Bellay"],
    ["« Mignonne, allons voir si la rose »", "Pierre de Ronsard"],
    ["« Le Pélican »", "Robert Desnos"],
    ["« Le Corbeau et le Renard »", "Jean de La Fontaine"],
    ["« La Cigale et la Fourmi »", "Jean de La Fontaine"],
  ],
  versValeur: [
    "Qui a écrit le poème %s ?",
    "Le poème %s a été écrit par…",
    "Quel poète a écrit %s ?",
  ],
  versCle: [
    "Quel poème a écrit %s ?",
    "Parmi ces poèmes, lequel est %de ?",
  ],
  methodeValeur: "Associe le titre au poète étudié en classe.",
  methodeCle: "Cherche, parmi les titres, celui que ce poète a écrit.",
};

/** Sujets et images pour fabriquer comparaisons, métaphores, personnifications. */
export const POESIE_SUJETS: readonly { s: string; f: boolean; images: readonly string[] }[] = [
  { s: "la lune", f: true, images: ["une lanterne", "une pièce d'argent", "un ballon pâle"] },
  { s: "la mer", f: true, images: ["un miroir", "un drap froissé", "un tapis bleu"] },
  { s: "le soleil", f: false, images: ["une orange", "un ballon d'or", "une lampe géante"] },
  { s: "la neige", f: true, images: ["un manteau blanc", "un tapis de sucre"] },
  { s: "le ciel", f: false, images: ["un toit bleu", "un grand océan"] },
  { s: "la nuit", f: true, images: ["un manteau noir", "une grande cape"] },
  { s: "la rivière", f: true, images: ["un ruban d'argent", "un serpent qui brille"] },
  { s: "la forêt", f: true, images: ["une cathédrale verte", "un grand château"] },
  { s: "le nuage", f: false, images: ["un mouton", "un flocon de coton"] },
  { s: "la route", f: true, images: ["un ruban gris", "un long serpent"] },
  { s: "la ville", f: true, images: ["une fourmilière", "une ruche"] },
  { s: "l'arbre", f: false, images: ["un géant immobile", "une grande main ouverte"] },
  { s: "le volcan", f: false, images: ["une marmite qui bout", "un dragon endormi"] },
  { s: "la montagne", f: true, images: ["un géant endormi", "un mur de pierre"] },
  { s: "le lac", f: false, images: ["un miroir", "une assiette d'argent"] },
];

/** Verbes qui prêtent un geste HUMAIN : ils signent la personnification. */
export const VERBES_HUMAINS: readonly string[] = [
  "sourit", "pleure", "chante", "murmure", "soupire", "chuchote", "rêve", "se fâche", "bavarde", "dort",
];
export const COMPLEMENTS_PERSO: readonly string[] = [
  "doucement", "toute la nuit", "en silence", "sans s'arrêter", "ce matin", "tout bas",
];

/** Familles de rimes : même son final. */
export const FAMILLES_RIMES: readonly (readonly string[])[] = [
  ["chanson", "maison", "saison", "poisson", "horizon", "buisson"],
  ["rivière", "lumière", "prière", "clairière", "poussière"],
  ["fleur", "couleur", "chaleur", "douceur", "bonheur"],
  ["nuage", "plage", "rivage", "voyage", "orage", "feuillage"],
  ["oiseau", "ruisseau", "bateau", "château", "roseau"],
  ["rosée", "pensée", "allée", "matinée", "fumée"],
  ["plaisir", "soupir", "désir", "loisir", "avenir"],
];

// ════════════════════════════════════════════════════════════════════════
// THÉÂTRE
// ════════════════════════════════════════════════════════════════════════

export const THEATRE_TERMES: Relation = {
  nom: "théâtre : mots de la scène",
  faits: [
    ["réplique", "ce que dit un personnage quand vient son tour de parler"],
    ["didascalie", "une indication écrite pour le jeu, le ton ou le décor, qui n'est pas dite"],
    ["tirade", "une longue réplique adressée à d'autres personnages présents"],
    ["monologue", "un personnage seul en scène qui parle à voix haute"],
    ["aparté", "une réplique dite pour le public, que les autres personnages n'entendent pas"],
    ["dialogue", "un échange de répliques entre personnages"],
    ["scène", "une partie de la pièce qui change quand un personnage entre ou sort"],
    ["acte", "une grande partie d'une pièce, faite de plusieurs scènes"],
    ["comédie", "une pièce qui cherche à faire rire"],
    ["tragédie", "une pièce qui finit mal pour le héros"],
    ["quiproquo", "un malentendu : on prend une personne ou une chose pour une autre"],
    ["coup de théâtre", "un événement imprévu qui change toute la situation"],
    ["dramaturge", "l'auteur d'une pièce de théâtre"],
    ["metteur en scène", "la personne qui dirige les comédiens et organise le spectacle"],
    ["comédien", "la personne qui joue un rôle sur scène"],
    ["spectateur", "la personne qui regarde la pièce dans la salle"],
    ["décor", "ce qui représente le lieu de l'action sur la scène"],
    ["coulisses", "l'espace caché derrière la scène"],
    ["costume", "les vêtements que porte le comédien pour son rôle"],
    ["répétition", "une séance où les comédiens travaillent la pièce avant le spectacle"],
    ["scène d'exposition", "la première scène, qui fait comprendre la situation au public"],
    ["dénouement", "la fin de la pièce, quand tout se résout"],
    ["liste des personnages", "la liste écrite des rôles, placée avant le début de la pièce"],
  ],
  proches: [
    ...["tirade", "aparté", "monologue"].map((k) => [k, "ce que dit un personnage quand vient son tour de parler"] as const),
    ["monologue", "une réplique dite pour le public, que les autres personnages n'entendent pas"],
  ],
  versValeur: [
    "Au théâtre, que veut dire le mot « %s » ?",
    "Au théâtre, qu'appelle-t-on « %s » ?",
    "Que désigne le mot « %s » quand on parle d'une pièce ?",
  ],
  versCle: [
    "Au théâtre, quel mot désigne %s ?",
    "Au théâtre, comment appelle-t-on %s ?",
    "Quel est le mot juste pour %s ?",
  ],
  methodeValeur: "Rappelle-toi la leçon sur le théâtre : chaque mot désigne un élément précis de la pièce.",
  methodeCle: "Lis bien la définition, puis cherche le mot du théâtre qui lui correspond.",
};

export const MOLIERE: Relation = {
  nom: "théâtre : les pièces de Molière",
  faits: [
    ["Scapin", "Les Fourberies de Scapin"],
    ["Harpagon", "L'Avare"],
    ["Argan", "Le Malade imaginaire"],
    ["Monsieur Jourdain", "Le Bourgeois gentilhomme"],
    ["Sganarelle, le bûcheron forcé de jouer au médecin", "Le Médecin malgré lui"],
    ["un valet rusé qui invente mille tours", "Les Fourberies de Scapin"],
    ["un vieil homme qui cache sa cassette pleine d'argent", "L'Avare"],
    ["un homme qui se croit toujours malade", "Le Malade imaginaire"],
    ["un bourgeois qui veut vivre comme un noble", "Le Bourgeois gentilhomme"],
    ["la réplique « Que diable allait-il faire dans cette galère ? »", "Les Fourberies de Scapin"],
    ["la réplique « Sans dot ! »", "L'Avare"],
    ["la réplique « Le poumon ! »", "Le Malade imaginaire"],
  ],
  versValeur: [
    "Dans quelle pièce de Molière trouve-t-on %s ?",
    "Chez Molière, on rencontre %s dans…",
  ],
  versCle: [
    "Que trouve-t-on dans « %s », une pièce de Molière ?",
    "Lequel de ces éléments vient %dt, de Molière ?",
  ],
  methodeValeur: "Pense au personnage principal de chaque comédie de Molière.",
  methodeCle: "Le titre de la pièce annonce souvent son personnage principal.",
};

/** Petites scènes : trois répliques chacune, la vie d'un enfant de 11 ans. */
export const SCENES: readonly (readonly [string, string, string])[] = [
  ["Où as-tu caché mon ballon ?", "Je ne l'ai pas touché !", "Alors pourquoi est-il sous ton lit ?"],
  ["Ça sent le brûlé !", "Oh non, mon gâteau !", "Ouvre vite la fenêtre."],
  ["Tu as fait l'exercice de maths ?", "Pas encore, il est trop dur.", "Viens, on le fait ensemble."],
  ["Le train part dans cinq minutes !", "J'ai oublié mon billet !", "Il est dans ta poche, regarde."],
  ["Regarde, un dauphin !", "Où ça ? Je ne vois rien.", "Là-bas, près du bateau."],
  ["Le sommet est encore loin ?", "Encore une heure de marche.", "Alors je m'assois un instant."],
  ["Tu joues trop fort !", "C'est un concert, pas une berceuse !", "Mes oreilles ne sont pas d'accord."],
  ["Passe-moi la balle !", "Attrape !", "But ! On a gagné !"],
  ["Le chat a encore volé le jambon.", "Ce n'est pas lui, c'est le chien.", "Le chien dort depuis ce matin."],
  ["Le volcan va déborder !", "Ajoute moins de vinaigre.", "Trop tard, il y en a partout."],
  ["C'est mon tour de lancer le dé.", "Non, tu as déjà joué.", "Bon, d'accord, vas-y."],
  ["Chut, j'entends un bruit.", "C'est sûrement un écureuil.", "Ou un loup…"],
  ["Tu as rendu le livre ?", "Je l'ai perdu.", "Cherche bien, il est peut-être dans ton sac."],
  ["L'eau est glacée !", "Saute, tu vas t'habituer.", "Toi d'abord !"],
  ["Tu as goûté les letchis ?", "Pas encore, ils sont mûrs ?", "Oui, cueille ceux du haut."],
  ["Surprise !", "Vous m'avez fait peur !", "Joyeux anniversaire !"],
];

/** Didascalies quasi synonymes : jamais l'une en leurre quand l'autre est la bonne. */
export const GROUPES_DIDASCALIES: readonly (readonly string[])[] = [
  ["en chuchotant", "à voix basse", "tout bas"],
  ["en criant", "en hurlant", "très fort"],
  ["en riant", "en souriant"],
  ["en soupirant", "d'un air las"],
  ["d'un air inquiet", "d'un air soucieux"],
];

export const DIDASCALIES: readonly string[] = [
  "en riant", "en chuchotant", "en soupirant", "à voix basse", "en criant",
  "en haussant les épaules", "en se grattant la tête", "sans lever les yeux", "en levant les bras", "d'un air inquiet",
];

/** Indices de forme : à quoi voit-on le genre d'un texte. */
export const INDICES_GENRE_FORME: Relation = {
  nom: "poème ou théâtre : les indices",
  faits: [
    ["des noms de personnages devant chaque réplique", "une pièce de théâtre"],
    ["des indications de jeu entre parenthèses", "une pièce de théâtre"],
    ["des actes et des scènes numérotés", "une pièce de théâtre"],
    ["une liste des personnages au début", "une pièce de théâtre"],
    ["des strophes séparées par des lignes blanches", "un poème"],
    ["des quatrains et des tercets", "un poème"],
    ["un refrain qui revient entre les strophes", "un poème"],
    ["des mots disposés pour dessiner une forme", "un poème"],
    ["des chapitres et un narrateur qui raconte", "un roman"],
    ["la formule « Il était une fois »", "un conte"],
  ],
  versValeur: [
    "Un texte a %s. C'est sans doute…",
    "Je repère dans un texte %s. De quel genre s'agit-il ?",
  ],
  versCle: [
    "À quoi voit-on que c'est %s ?",
    "Quel indice montre que le texte est %s ?",
  ],
  methodeValeur: "Regarde la forme du texte sur la page : elle trahit son genre.",
  methodeCle: "Cherche l'indice qu'on ne trouve que dans ce genre-là.",
};

// ════════════════════════════════════════════════════════════════════════
// RÉCITS DES ORIGINES
// ════════════════════════════════════════════════════════════════════════

export const ORIGINES_ACTIONS: Relation = {
  nom: "origines : ce que fait le personnage",
  faits: [
    ["Prométhée", "vole le feu des dieux pour le donner aux hommes"],
    ["Pandore", "ouvre la jarre d'où s'échappent les malheurs du monde"],
    ["Noé", "construit une arche pour sauver sa famille et les animaux du Déluge"],
    ["Ève", "mange le fruit défendu dans le jardin d'Éden"],
    ["Caïn", "tue son frère Abel par jalousie"],
    ["Arachné", "est changée en araignée après avoir défié une déesse au tissage"],
    ["Narcisse", "tombe amoureux de son reflet et devient une fleur"],
    ["Daphné", "est changée en laurier pour échapper à Apollon"],
    ["la nymphe Écho", "ne peut plus que répéter les derniers mots qu'elle entend"],
    ["le roi Midas", "change en or tout ce qu'il touche"],
    ["Phaéton", "perd le contrôle du char du Soleil, son père"],
    ["Deucalion", "repeuple la Terre avec Pyrrha en jetant des pierres derrière lui"],
    ["Perséphone", "est enlevée par Hadès et doit passer une partie de l'année aux Enfers"],
    ["Cronos", "avale ses enfants pour garder le pouvoir"],
    ["Icare", "vole trop près du soleil avec des ailes collées à la cire"],
    ["Dédale", "construit le Labyrinthe, puis fabrique des ailes pour s'enfuir"],
    ["Philémon", "accueille avec sa femme Baucis des dieux déguisés en voyageurs"],
    ["Orphée", "descend aux Enfers pour ramener Eurydice"],
  ],
  versValeur: [
    "Dans son récit, %s…",
    "D'après le mythe, %s…",
    "Complète la phrase : %s…",
  ],
  versCle: [
    "Dans les mythes et dans la Bible, qui %s ?",
    "Quel personnage %s ?",
    "Qui est le personnage qui %s ?",
  ],
  methodeValeur: "Rappelle-toi l'histoire de ce personnage : ce qu'il fait est le cœur de son récit.",
  methodeCle: "Retrouve le récit qui raconte cette action, puis son personnage principal.",
  // Dans le mythe grec, Deucalion échappe lui aussi au déluge dans un coffre flottant.
  proches: [["Deucalion", "construit une arche pour sauver sa famille et les animaux du Déluge"]],
};

export const ORIGINES_EXPLICATIONS: Relation = {
  nom: "origines : ce que le récit explique",
  faits: [
    ["le récit d'Arachné", "pourquoi l'araignée tisse sa toile"],
    ["le récit de Narcisse", "d'où vient la fleur appelée narcisse"],
    ["le récit de la nymphe Écho", "pourquoi la montagne répète nos derniers mots"],
    ["le récit de Daphné", "pourquoi le laurier est l'arbre d'Apollon"],
    ["le récit de Perséphone", "pourquoi il y a des saisons"],
    ["le récit de Prométhée", "comment les hommes ont reçu le feu"],
    ["le récit de Pandore", "d'où viennent les malheurs des hommes"],
    ["le récit de la tour de Babel", "pourquoi les hommes parlent des langues différentes"],
    ["le récit de la Création, dans la Genèse", "pourquoi la semaine compte un jour de repos"],
    ["le récit de Deucalion et Pyrrha", "comment la Terre s'est repeuplée après le déluge"],
  ],
  versValeur: [
    "%S explique…",
    "Que cherche à expliquer %s ?",
    "Que nous apprend %s sur l'origine des choses ?",
  ],
  versCle: [
    "Quel récit explique %s ?",
    "Pour savoir %s, quel récit faut-il lire ?",
  ],
  methodeValeur: "Un récit des origines répond à une question : « d'où cela vient-il ? ».",
  methodeCle: "Cherche le récit dont la fin explique cette chose du monde.",
};

export const DIEUX: Relation = {
  nom: "origines : les dieux grecs",
  faits: [
    ["Zeus", "le roi des dieux, maître de la foudre"],
    ["Poséidon", "le dieu de la mer"],
    ["Hadès", "le dieu des Enfers"],
    ["Héra", "la reine des dieux, épouse de Zeus"],
    ["Athéna", "la déesse de la sagesse"],
    ["Aphrodite", "la déesse de l'amour et de la beauté"],
    ["Hermès", "le messager des dieux"],
    ["Héphaïstos", "le dieu du feu et de la forge"],
    ["Déméter", "la déesse des moissons"],
    ["Dionysos", "le dieu de la vigne et du vin"],
    ["Artémis", "la déesse de la chasse"],
    ["Apollon", "le dieu de la musique et de la lumière"],
    ["Gaïa", "la Terre, mère des premiers dieux"],
    ["Éole", "le maître des vents"],
    ["Hestia", "la déesse du foyer"],
  ],
  versValeur: [
    "Dans la mythologie grecque, %s est…",
    "Qui est %s chez les Grecs ?",
    "Chez les Grecs de l'Antiquité, %s, c'est…",
  ],
  versCle: [
    "Chez les Grecs, qui est %s ?",
    "Dans les mythes grecs, comment s'appelle %s ?",
  ],
  methodeValeur: "Chaque dieu grec règne sur un domaine : rappelle-toi lequel.",
  methodeCle: "Cherche le nom du dieu qui règne sur ce domaine.",
};

export const SOURCES_RECITS: Relation = {
  nom: "d'où vient ce personnage",
  faits: [
    ["Noé", "la Genèse, dans la Bible"],
    ["Ève", "la Genèse, dans la Bible"],
    ["Caïn", "la Genèse, dans la Bible"],
    ["Abel", "la Genèse, dans la Bible"],
    ["Prométhée", "les mythes grecs et romains"],
    ["Pandore", "les mythes grecs et romains"],
    ["Arachné", "les mythes grecs et romains"],
    ["Narcisse", "les mythes grecs et romains"],
    ["Perséphone", "les mythes grecs et romains"],
    ["Icare", "les mythes grecs et romains"],
    ["Orphée", "les mythes grecs et romains"],
    ["le Petit Poucet", "les contes de Charles Perrault"],
    ["le Chat botté", "les contes de Charles Perrault"],
    ["la Barbe bleue", "les contes de Charles Perrault"],
    ["Sindbad le marin", "les Mille et Une Nuits"],
    ["Shéhérazade", "les Mille et Une Nuits"],
    ["Ali Baba", "les Mille et Une Nuits"],
  ],
  versValeur: [
    "Dans quels récits rencontre-t-on %s ?",
    "D'où vient le personnage %de ?",
  ],
  versCle: [
    "Quel personnage vient %de ?",
    "Lequel de ces personnages trouve-t-on dans %s ?",
  ],
  methodeValeur: "Range le personnage dans sa famille de récits : Bible, mythes, contes…",
  methodeCle: "Cherche le personnage qui appartient à cette famille de récits.",
};

// ════════════════════════════════════════════════════════════════════════
// RÉCITS D'AVENTURE
// ════════════════════════════════════════════════════════════════════════

export const AVENTURE_HEROS: Relation = {
  nom: "aventure : personnages et livres",
  faits: [
    ["Vendredi", "Robinson Crusoé"],
    ["Phileas Fogg", "Le Tour du monde en quatre-vingts jours"],
    ["Passepartout", "Le Tour du monde en quatre-vingts jours"],
    ["le capitaine Nemo", "Vingt Mille Lieues sous les mers"],
    ["le professeur Lidenbrock", "Voyage au centre de la Terre"],
    ["Jim Hawkins", "L'Île au trésor"],
    ["Long John Silver", "L'Île au trésor"],
    ["Sindbad le marin", "Les Mille et Une Nuits"],
    ["le Lapin blanc", "Alice au pays des merveilles"],
    ["Mowgli", "Le Livre de la jungle"],
    ["Baloo", "Le Livre de la jungle"],
    ["Geppetto", "Les Aventures de Pinocchio"],
    ["Ulysse", "l'Odyssée"],
    ["Bilbo", "Le Hobbit"],
    ["Buck, le chien de traîneau", "L'Appel de la forêt"],
    ["d'Artagnan", "Les Trois Mousquetaires"],
    ["le capitaine Crochet", "Peter Pan"],
    ["Dorothy", "Le Magicien d'Oz"],
  ],
  versValeur: [
    "Dans quel livre d'aventure rencontre-t-on %s ?",
    "On rencontre %s dans…",
    "Quel récit d'aventure a pour personnage %s ?",
  ],
  versCle: [
    "Quel personnage rencontre-t-on dans « %s » ?",
    "Lequel de ces personnages vient %dt ?",
  ],
  methodeValeur: "Pense aux livres d'aventure lus ou vus en classe et à leurs personnages.",
  methodeCle: "Cherche le personnage qui vit les aventures de ce livre.",
};

export const AVENTURE_AUTEURS: Relation = {
  nom: "aventure : livres et auteurs",
  faits: [
    ["Robinson Crusoé", "Daniel Defoe"],
    ["Le Tour du monde en quatre-vingts jours", "Jules Verne"],
    ["Vingt Mille Lieues sous les mers", "Jules Verne"],
    ["Voyage au centre de la Terre", "Jules Verne"],
    ["Michel Strogoff", "Jules Verne"],
    ["L'Île au trésor", "Robert Louis Stevenson"],
    ["Les Voyages de Gulliver", "Jonathan Swift"],
    ["Alice au pays des merveilles", "Lewis Carroll"],
    ["Le Livre de la jungle", "Rudyard Kipling"],
    ["Les Aventures de Pinocchio", "Carlo Collodi"],
    ["Les Aventures de Tom Sawyer", "Mark Twain"],
    ["L'Appel de la forêt", "Jack London"],
    ["Croc-Blanc", "Jack London"],
    ["Le Hobbit", "J. R. R. Tolkien"],
    ["Les Trois Mousquetaires", "Alexandre Dumas"],
    ["Le Magicien d'Oz", "L. Frank Baum"],
    ["Le Petit Prince", "Antoine de Saint-Exupéry"],
    ["Vendredi ou la Vie sauvage", "Michel Tournier"],
    ["Le Merveilleux Voyage de Nils Holgersson", "Selma Lagerlöf"],
  ],
  versValeur: [
    "Qui a écrit « %s » ?",
    "« %s » est un livre de…",
    "Quel écrivain est l'auteur %dt ?",
  ],
  versCle: [
    "Quel livre a écrit %s ?",
    "Parmi ces livres, lequel est %de ?",
  ],
  methodeValeur: "Le nom de l'auteur est écrit sur la couverture : associe le titre à son écrivain.",
  methodeCle: "Cherche le titre écrit par cet auteur.",
};

export const AVENTURE_MOTS: Relation = {
  nom: "aventure : les mots du récit",
  faits: [
    ["situation initiale", "le début, qui présente le héros et son monde avant l'aventure"],
    ["élément déclencheur", "l'événement qui lance l'aventure"],
    ["péripéties", "les obstacles et les rebondissements de l'aventure"],
    ["dénouement", "le moment où l'aventure se résout"],
    ["situation finale", "la fin, quand le héros a changé ou est rentré chez lui"],
    ["quête", "la recherche d'un objet ou d'un but important"],
    ["épreuve", "un danger que le héros doit surmonter"],
    ["adjuvant", "un personnage qui aide le héros"],
    ["opposant", "un personnage qui gêne le héros"],
    ["journal de bord", "le cahier où un marin note chaque jour son voyage"],
    ["naufrage", "la perte d'un bateau en mer"],
    ["boussole", "l'instrument qui indique le nord"],
    ["escale", "un arrêt pendant un long voyage"],
    ["expédition", "un long voyage organisé pour explorer"],
  ],
  versValeur: [
    "Dans un récit d'aventure, qu'appelle-t-on « %s » ?",
    "Que veut dire « %s » quand on parle d'un récit d'aventure ?",
  ],
  versCle: [
    "Dans un récit d'aventure, quel mot désigne %s ?",
    "Comment appelle-t-on %s ?",
  ],
  methodeValeur: "Rappelle-toi les étapes et les mots du récit d'aventure.",
  methodeCle: "Lis bien la définition et cherche le mot de la leçon qui lui correspond.",
  proches: [
    ["péripéties", "un danger que le héros doit surmonter"],
    ["épreuve", "les obstacles et les rebondissements de l'aventure"],
    ["expédition", "la recherche d'un objet ou d'un but important"],
    ["dénouement", "la fin, quand le héros a changé ou est rentré chez lui"],
    ["situation finale", "le moment où l'aventure se résout"],
  ],
};

/** Récits d'aventure en cinq étapes. {P} prénom, {il} il/elle, {le} le/la. */
export const RECITS_ETAPES: readonly (readonly [string, string, string, string, string])[] = [
  [
    "{P} vivait dans un petit village au bord de la mer.",
    "Un jour, {il} trouva une bouteille avec une carte à l'intérieur.",
    "Alors {il} prit une barque et rama jusqu'à une île inconnue.",
    "Enfin, {il} découvrit un coffre caché sous un rocher.",
    "Depuis ce jour, {P} rêve de nouveaux voyages.",
  ],
  [
    "{P} habitait au bord d'une grande forêt.",
    "Un jour, son chien disparut entre les arbres.",
    "Alors {P} suivit ses traces et se perdit dans le brouillard.",
    "Enfin, un aboiement {le} guida jusqu'à une clairière.",
    "Depuis ce jour, {P} n'a plus peur de la forêt.",
  ],
  [
    "{P} passait ses vacances dans un chalet, en montagne.",
    "Un jour, un orage éclata pendant sa promenade.",
    "Alors {il} grimpa jusqu'à une vieille cabane pour s'abriter.",
    "Enfin, le guide du village {le} retrouva au petit matin.",
    "Depuis ce jour, {P} écoute la météo avant de partir.",
  ],
  [
    "{P} jouait du violon chaque soir dans sa chambre.",
    "Un jour, {il} reçut une invitation pour un grand concours.",
    "Alors {il} prit le train seul, avec son violon dans les bras.",
    "Enfin, {il} monta sur scène et joua sans trembler.",
    "Depuis ce jour, {P} n'a plus peur du public.",
  ],
  [
    "{P} aimait observer les étoiles avec sa lunette.",
    "Un jour, {il} vit une lumière étrange tomber dans le champ voisin.",
    "Alors {il} traversa le champ en pleine nuit, une lampe à la main.",
    "Enfin, {il} trouva une petite pierre encore chaude : une météorite !",
    "Depuis ce jour, la pierre brille sur son bureau.",
  ],
  [
    "{P} aidait sa grand-mère à la boulangerie tous les samedis.",
    "Un jour, le four tomba en panne juste avant la fête du village.",
    "Alors {il} courut chez les voisins pour emprunter leurs fours.",
    "Enfin, tous les gâteaux furent prêts à temps.",
    "Depuis ce jour, {P} est la vedette de la boulangerie.",
  ],
  [
    "{P} s'entraînait au football chaque mercredi.",
    "Un jour, le gardien de l'équipe se blessa à la cheville.",
    "Alors {P} enfila les gants et prit sa place dans les buts.",
    "Enfin, {il} arrêta le dernier tir du match.",
    "Depuis ce jour, toute l'équipe l'appelle « le mur ».",
  ],
  [
    "{P} soignait les animaux du refuge pendant les vacances.",
    "Un jour, un jeune renard blessé arriva au refuge.",
    "Alors {P} le nourrit et le soigna pendant des semaines.",
    "Enfin, le renard put retourner dans la forêt.",
    "Depuis ce jour, {P} veut devenir vétérinaire.",
  ],
  [
    "{P} passait l'été sur un voilier avec sa famille.",
    "Un jour, une tempête arracha la voile du bateau.",
    "Alors {il} aida son père à réparer la voile sous la pluie.",
    "Enfin, le bateau atteignit un port abrité.",
    "Depuis ce jour, {P} sait faire tous les nœuds marins.",
  ],
  [
    "{P} passait ses dimanches chez son oncle, dans une vieille maison.",
    "Un jour, {il} trouva une clé rouillée dans le grenier.",
    "Alors {il} essaya la clé sur toutes les portes de la maison.",
    "Enfin, une petite porte s'ouvrit sur une pièce pleine de vieux jouets.",
    "Depuis ce jour, cette pièce est sa cachette préférée.",
  ],
  [
    "{P} vivait dans une grande ville, loin de ses cousins.",
    "Un jour, {il} reçut une lettre qui l'invitait au Japon.",
    "Alors {il} prit l'avion pour la première fois, le cœur battant.",
    "Enfin, {il} retrouva ses cousins à l'aéroport de Tokyo.",
    "Depuis ce jour, {P} apprend le japonais.",
  ],
  [
    "{P} habitait au pied du piton de la Fournaise, à La Réunion.",
    "Un jour, le volcan se réveilla en pleine nuit.",
    "Alors {il} monta avec sa tante voir la coulée de lave de loin.",
    "Enfin, {il} vit la lave rouge couler jusqu'à la mer.",
    "Depuis ce jour, {P} veut devenir volcanologue.",
  ],
  [
    "{P} passait ses récréations à la bibliothèque de l'école.",
    "Un jour, un vieux livre tomba d'une étagère et s'ouvrit tout seul.",
    "Alors {il} lut la première page et se retrouva dans une forêt magique.",
    "Enfin, {il} trouva la porte qui ramenait à la bibliothèque.",
    "Depuis ce jour, {P} choisit ses livres avec prudence.",
  ],
  [
    "{P} suivait sa mère, archéologue, dans le désert.",
    "Un jour, le vent souleva le sable et fit apparaître une porte de pierre.",
    "Alors {il} descendit un escalier sombre avec sa lampe.",
    "Enfin, {il} découvrit une salle couverte de dessins anciens.",
    "Depuis ce jour, {P} collectionne les cartes anciennes.",
  ],
  [
    "{P} faisait du vélo chaque matin sur les chemins de la campagne.",
    "Un jour, {il} trouva un oisillon tombé du nid.",
    "Alors {il} grimpa dans l'arbre avec l'oisillon dans sa casquette.",
    "Enfin, {il} reposa l'oisillon dans son nid.",
    "Depuis ce jour, {P} passe voir le nid tous les matins.",
  ],
];

// ════════════════════════════════════════════════════════════════════════
// MONSTRES
// ════════════════════════════════════════════════════════════════════════

export const MONSTRES_PORTRAITS: Relation = {
  nom: "monstres : leur portrait",
  faits: [
    ["le Minotaure", "un corps d'homme et une tête de taureau"],
    ["un centaure", "un buste d'homme sur un corps de cheval"],
    ["Méduse", "des serpents à la place des cheveux et un regard qui change en pierre"],
    ["le Cyclope Polyphème", "un seul œil au milieu du front"],
    ["Cerbère", "trois têtes de chien"],
    ["l'Hydre de Lerne", "plusieurs têtes qui repoussent quand on les coupe"],
    ["une sirène de l'Odyssée", "un chant qui attire les marins vers les rochers"],
    ["la Chimère", "une tête de lion, un corps de chèvre et une queue de serpent"],
    ["la Sphinge de Thèbes", "une tête de femme, un corps de lion et des ailes"],
    ["le géant Argus", "cent yeux qui ne dorment jamais tous en même temps"],
    ["un griffon", "un corps de lion avec la tête et les ailes d'un aigle"],
    ["une harpie", "un corps d'oiseau et un visage de femme"],
    ["la Bête du conte « La Belle et la Bête »", "un aspect effrayant et un cœur plein de bonté"],
    ["un loup-garou", "le pouvoir de se changer en loup les nuits de pleine lune"],
  ],
  versValeur: [
    "Dans les récits, %s a…",
    "Qu'est-ce qui rend %s reconnaissable ?",
    "Quel détail permet de reconnaître %s ?",
  ],
  versCle: [
    "Quel monstre a %s ?",
    "Quelle créature a %s ?",
  ],
  methodeValeur: "Un monstre se reconnaît à un détail de son corps ou à un pouvoir.",
  methodeCle: "Cherche la créature à qui appartient ce détail.",
};

export const MONSTRES_HEROS: Relation = {
  nom: "monstres : le héros qui les affronte",
  faits: [
    ["le Minotaure", "Thésée"],
    ["le Cyclope Polyphème", "Ulysse"],
    ["Méduse", "Persée"],
    ["l'Hydre de Lerne", "Héraclès"],
    ["la Sphinge de Thèbes", "Œdipe"],
    ["la Chimère", "Bellérophon"],
    ["le géant Goliath", "David"],
    ["l'ogre", "le Petit Poucet"],
    ["le géant Argus", "Hermès"],
  ],
  versValeur: [
    "Quel héros affronte %s ?",
    "Qui vient à bout %de ?",
    "Dans les récits, qui affronte %s ?",
  ],
  versCle: [
    "Quel monstre %s doit-il affronter ?",
    "Contre quel monstre se mesure %s ?",
  ],
  methodeValeur: "Chaque monstre célèbre a son héros : rappelle-toi qui l'a affronté.",
  methodeCle: "Rappelle-toi le récit de ce héros et la créature qu'il y rencontre.",
};

export const MONSTRES_RUSES: Relation = {
  nom: "monstres : la ruse ou l'arme du héros",
  faits: [
    ["un fil déroulé dans le Labyrinthe", "le Minotaure"],
    ["un bouclier poli qui sert de miroir", "Méduse"],
    ["un pieu enfoncé dans son œil unique", "le Cyclope Polyphème"],
    ["un faux nom : « Personne »", "le Cyclope Polyphème"],
    ["la cire dans les oreilles des marins", "les Sirènes"],
    ["une fronde et une simple pierre", "le géant Goliath"],
    ["la bonne réponse à une énigme", "la Sphinge de Thèbes"],
    ["le feu sur les cous coupés pour que les têtes ne repoussent pas", "l'Hydre de Lerne"],
    ["les bottes de sept lieues, volées pendant que le monstre dort", "l'ogre"],
  ],
  versValeur: [
    "Un héros se sert %de. Quel monstre affronte-t-il ?",
    "Contre quel monstre le héros utilise-t-il %s ?",
  ],
  versCle: [
    "Quelle ruse ou quelle arme sert contre %s ?",
    "Comment le héros s'en sort-il contre %s ?",
  ],
  methodeValeur: "La ruse du héros est taillée pour SON monstre : pense à son point fort.",
  methodeCle: "Rappelle-toi le danger de ce monstre : la ruse sert à l'éviter.",
};

export const MONSTRES_MOTS: Relation = {
  nom: "monstres : les mots",
  faits: [
    ["monstre hybride", "un être fait de morceaux de plusieurs animaux, ou d'un humain et d'un animal"],
    ["métamorphose", "la transformation d'un être en un autre"],
    ["labyrinthe", "un lieu aux couloirs si compliqués qu'on s'y perd"],
    ["Enfers", "le monde souterrain des morts chez les Grecs"],
    ["géant", "un être d'une taille et d'une force hors du commun"],
    ["compassion", "le sentiment de pitié pour celui qui souffre"],
    ["ogre", "un géant des contes qui mange les enfants"],
  ],
  proches: [["ogre", "un être d'une taille et d'une force hors du commun"]],
  versValeur: [
    "Dans les récits de monstres, que veut dire « %s » ?",
    "Qu'appelle-t-on « %s » ?",
  ],
  versCle: [
    "Quel mot désigne %s ?",
    "Comment appelle-t-on %s ?",
  ],
  methodeValeur: "Rappelle-toi les mots de la leçon sur les monstres.",
  methodeCle: "Lis bien la définition et cherche le mot qui lui correspond.",
};

/** Résumés à classer : ce dont parle SURTOUT le récit. */
export const TYPES_RECITS: Relation = {
  nom: "type de récit",
  faits: [
    ["Arachné est changée en araignée : depuis, les araignées tissent.", "l'origine du monde ou des choses"],
    ["Prométhée donne le feu aux hommes, qui apprennent à s'en servir.", "l'origine du monde ou des choses"],
    ["Dieu crée le ciel, la terre, puis l'homme et la femme.", "l'origine du monde ou des choses"],
    ["Les hommes de Babel ne se comprennent plus : ainsi naissent les langues.", "l'origine du monde ou des choses"],
    ["Perséphone passe une partie de l'année aux Enfers : ainsi naissent les saisons.", "l'origine du monde ou des choses"],
    ["Phileas Fogg parie qu'il fera le tour du monde en quatre-vingts jours.", "le départ à l'aventure"],
    ["Jim quitte l'auberge de sa mère pour chercher un trésor sur une île.", "le départ à l'aventure"],
    ["Nils voyage sur le dos d'une oie à travers toute la Suède.", "le départ à l'aventure"],
    ["Le professeur Lidenbrock descend dans un volcan pour atteindre le centre de la Terre.", "le départ à l'aventure"],
    ["Un être mi-homme, mi-taureau vit enfermé au cœur d'un labyrinthe.", "la rencontre d'un monstre"],
    ["Une créature aux cheveux de serpents change en pierre ceux qui la regardent.", "la rencontre d'un monstre"],
    ["Un chien à trois têtes garde la porte des Enfers.", "la rencontre d'un monstre"],
    ["Une créature aux têtes qui repoussent terrorise le pays de Lerne.", "la rencontre d'un monstre"],
  ],
  versValeur: [
    "Lis ce résumé : « %s » Quel est le thème principal de ce récit ?",
    "« %s » De quoi parle surtout ce récit ?",
  ],
  versCle: [],
  methodeValeur: "Demande-toi ce qui compte le plus : expliquer le monde, partir, ou affronter une créature.",
  methodeCle: "",
};

// ════════════════════════════════════════════════════════════════════════
// REPÈRES : GENRES, CONTEXTE, RÉSEAU, TRACE
// ════════════════════════════════════════════════════════════════════════

export const OEUVRES_GENRES: Relation = {
  nom: "œuvres et genres",
  faits: [
    ["Le Corbeau et le Renard", "une fable"],
    ["La Cigale et la Fourmi", "une fable"],
    ["Le Lièvre et la Tortue", "une fable"],
    ["Le Loup et l'Agneau", "une fable"],
    ["Le Chêne et le Roseau", "une fable"],
    ["Le Lion et le Rat", "une fable"],
    ["Le Rat de ville et le Rat des champs", "une fable"],
    ["Le Petit Chaperon rouge", "un conte"],
    ["Cendrillon", "un conte"],
    ["Le Petit Poucet", "un conte"],
    ["Le Chat botté", "un conte"],
    ["Blanche-Neige", "un conte"],
    ["Hansel et Gretel", "un conte"],
    ["La Petite Sirène", "un conte"],
    ["Le Vilain Petit Canard", "un conte"],
    ["La Belle et la Bête", "un conte"],
    ["Les Fourberies de Scapin", "une pièce de théâtre"],
    ["L'Avare", "une pièce de théâtre"],
    ["Le Malade imaginaire", "une pièce de théâtre"],
    ["Le Médecin malgré lui", "une pièce de théâtre"],
    ["Le Bourgeois gentilhomme", "une pièce de théâtre"],
    ["Robinson Crusoé", "un roman"],
    ["L'Île au trésor", "un roman"],
    ["Vingt Mille Lieues sous les mers", "un roman"],
    ["Croc-Blanc", "un roman"],
    ["Les Trois Mousquetaires", "un roman"],
    ["l'Odyssée", "une épopée"],
    ["l'Iliade", "une épopée"],
    ["Le Dormeur du val", "un poème"],
    ["Chanson d'automne", "un poème"],
    ["Le Pont Mirabeau", "un poème"],
    ["Demain, dès l'aube…", "un poème"],
  ],
  versValeur: [
    "« %s », c'est…",
    "À quel genre appartient « %s » ?",
    "Quel est le genre %dt ?",
  ],
  versCle: [
    "Lequel de ces titres est %s ?",
    "Parmi ces œuvres, laquelle est %s ?",
  ],
  methodeValeur: "Rappelle-toi la forme de l'œuvre : morale, « Il était une fois », répliques, vers ou chapitres.",
  methodeCle: "Cherche l'œuvre qui a la forme de ce genre.",
  // Les fables de La Fontaine et les épopées sont écrites en vers : « un poème » n'est pas un leurre pour elles.
  proches: [
    ...[
      "Le Corbeau et le Renard", "La Cigale et la Fourmi", "Le Lièvre et la Tortue", "Le Loup et l'Agneau",
      "Le Chêne et le Roseau", "Le Lion et le Rat", "Le Rat de ville et le Rat des champs", "l'Odyssée", "l'Iliade",
    ].map((k) => [k, "un poème"] as const),
  ],
};

export const INDICES_GENRES: Relation = {
  nom: "les indices du genre",
  faits: [
    ["une courte histoire d'animaux suivie d'une morale", "une fable"],
    ["la formule « Il était une fois »", "un conte"],
    ["une fée, un ogre ou une sorcière", "un conte"],
    ["des répliques et des didascalies", "une pièce de théâtre"],
    ["une liste des personnages, puis des actes et des scènes", "une pièce de théâtre"],
    ["des vers et des strophes, sans histoire ni personnages", "un poème"],
    ["des chapitres et une longue histoire en prose", "un roman"],
    ["les exploits d'un héros, chantés en très longs vers", "une épopée"],
    ["un titre, un chapeau et des informations sur l'actualité", "un article de journal"],
    ["un récit qui explique l'origine du monde ou d'une chose", "un mythe"],
  ],
  versValeur: [
    "Un texte contient %s. C'est sans doute…",
    "Dans un texte, je repère %s. De quel genre s'agit-il sans doute ?",
  ],
  versCle: [
    "À quoi reconnaît-on %s ?",
    "Quel indice montre que le texte est %s ?",
  ],
  methodeValeur: "Chaque genre a sa marque : repère-la et nomme le genre.",
  methodeCle: "Cherche l'indice qui n'appartient qu'à ce genre.",
  proches: [
    ["les exploits d'un héros, chantés en très longs vers", "un poème"],
    ["les exploits d'un héros, chantés en très longs vers", "un mythe"],
    ["une courte histoire d'animaux suivie d'une morale", "un conte"],
    ["une courte histoire d'animaux suivie d'une morale", "un poème"],
    ["une fée, un ogre ou une sorcière", "un mythe"],
    ["une fée, un ogre ou une sorcière", "une épopée"],
    ["un récit qui explique l'origine du monde ou d'une chose", "un conte"],
  ],
};

export const AUTEURS_GENRES: Relation = {
  nom: "auteurs et genres",
  faits: [
    ["Jean de La Fontaine", "des fables"],
    ["Ésope", "des fables"],
    ["Charles Perrault", "des contes"],
    ["les frères Grimm", "des contes"],
    ["Hans Christian Andersen", "des contes"],
    ["Molière", "des pièces de théâtre"],
    ["Jules Verne", "des romans d'aventure"],
    ["Robert Louis Stevenson", "des romans d'aventure"],
    ["Paul Verlaine", "des poèmes"],
    ["Arthur Rimbaud", "des poèmes"],
  ],
  versValeur: [
    "Quand on cite %s, on pense surtout à…",
    "Qu'a surtout écrit %s ?",
  ],
  versCle: [
    "Quel auteur est surtout connu pour %s ?",
    "Lequel de ces auteurs a surtout écrit %s ?",
  ],
  methodeValeur: "Associe l'auteur au genre qui l'a rendu célèbre.",
  methodeCle: "Cherche l'auteur célèbre pour ce genre.",
};

export const EPOQUES: Relation = {
  nom: "époque des œuvres",
  faits: [
    ["l'Odyssée", "l'Antiquité"],
    ["l'Iliade", "l'Antiquité"],
    ["les fables d'Ésope", "l'Antiquité"],
    ["les Métamorphoses d'Ovide", "l'Antiquité"],
    ["le Roman de Renart", "le Moyen Âge"],
    ["la Chanson de Roland", "le Moyen Âge"],
    ["les romans de chevalerie de Chrétien de Troyes", "le Moyen Âge"],
    ["les Fables de La Fontaine", "le XVIIe siècle"],
    ["les comédies de Molière", "le XVIIe siècle"],
    ["les contes de Charles Perrault", "le XVIIe siècle"],
    ["Robinson Crusoé, de Daniel Defoe", "le XVIIIe siècle"],
    ["Les Voyages de Gulliver, de Jonathan Swift", "le XVIIIe siècle"],
    ["Le Tour du monde en quatre-vingts jours, de Jules Verne", "le XIXe siècle"],
    ["les contes des frères Grimm", "le XIXe siècle"],
    ["les contes d'Andersen", "le XIXe siècle"],
    ["L'Île au trésor, de Stevenson", "le XIXe siècle"],
    ["Alice au pays des merveilles, de Lewis Carroll", "le XIXe siècle"],
    ["Le Petit Prince, de Saint-Exupéry", "le XXe siècle"],
    ["Le Hobbit, de Tolkien", "le XXe siècle"],
    ["Vendredi ou la Vie sauvage, de Michel Tournier", "le XXe siècle"],
    ["Croc-Blanc, de Jack London", "le XXe siècle"],
  ],
  versValeur: [
    "À quelle époque faut-il situer %s ?",
    "À quelle époque situe-t-on %s ?",
    "Sur une frise du temps, où placer %s ?",
  ],
  versCle: [
    "Quelle œuvre date %de ?",
    "Laquelle de ces œuvres a été écrite pendant %s ?",
  ],
  methodeValeur: "Pense à la frise : Antiquité, Moyen Âge, puis les siècles XVIIe, XVIIIe, XIXe, XXe.",
  methodeCle: "Place chaque œuvre sur la frise du temps et garde celle de cette époque.",
};

export const CONTEXTE_AUTEURS: Relation = {
  nom: "ce qu'on sait de l'auteur",
  faits: [
    ["Molière", "joue ses pièces à la cour du roi Louis XIV"],
    ["Jean de La Fontaine", "dédie ses premières fables au fils du roi Louis XIV"],
    ["Charles Perrault", "publie Le Petit Chaperon rouge et Cendrillon"],
    ["Ésope", "est un fabuliste grec de l'Antiquité"],
    ["Ovide", "est un poète latin, au temps de l'empereur Auguste"],
    ["Antoine de Saint-Exupéry", "est aussi aviateur, comme le narrateur du Petit Prince"],
    ["Hans Christian Andersen", "écrit des contes au Danemark, comme La Petite Sirène"],
  ],
  versValeur: [
    "Pour situer l'auteur : %s…",
    "Complète ce repère sur l'auteur : %s…",
  ],
  versCle: [
    "Quel auteur %s ?",
    "Lequel de ces auteurs %s ?",
  ],
  methodeValeur: "Situer une œuvre, c'est savoir qui l'a écrite, quand et où.",
  methodeCle: "Rappelle-toi l'époque et la vie de chaque auteur.",
};

export const PAYS_AUTEURS: Relation = {
  nom: "pays des auteurs",
  faits: [
    ["Hans Christian Andersen", "le Danemark"],
    ["les frères Grimm", "l'Allemagne"],
    ["Charles Perrault", "la France"],
    ["Molière", "la France"],
    ["Jules Verne", "la France"],
    ["Ésope", "la Grèce antique"],
    ["Ovide", "la Rome antique"],
    ["Carlo Collodi", "l'Italie"],
    ["Robert Louis Stevenson", "l'Écosse"],
    ["Mark Twain", "les États-Unis"],
    ["L. Frank Baum", "les États-Unis"],
    ["Selma Lagerlöf", "la Suède"],
    ["Lewis Carroll", "l'Angleterre"],
    ["Daniel Defoe", "l'Angleterre"],
    ["Jonathan Swift", "l'Irlande"],
    ["Miguel de Cervantès", "l'Espagne"],
  ],
  versValeur: [
    "De quel pays vient %s ?",
    "Quel est le pays d'origine %de ?",
  ],
  versCle: [
    "Quel écrivain vient de ce pays : %s ?",
    "Lequel de ces écrivains est originaire de ce pays : %s ?",
  ],
  methodeValeur: "Situer un auteur, c'est aussi savoir d'où il vient.",
  methodeCle: "Cherche l'écrivain qui a vécu dans ce pays.",
};

export const RESEAU_MOTS: Relation = {
  nom: "réseau : les mots",
  faits: [
    ["réécriture", "une nouvelle version d'une histoire déjà racontée par un autre auteur"],
    ["adaptation", "le passage d'une œuvre vers un autre art, par exemple du livre au film"],
    ["illustration", "une image qui accompagne un texte"],
    ["parodie", "une imitation d'une œuvre pour faire rire"],
    ["bande dessinée", "un récit raconté en images et en bulles"],
    ["ballet", "un spectacle où l'histoire est racontée par la danse"],
    ["opéra", "une pièce de théâtre entièrement chantée"],
    ["film d'animation", "un film fait de dessins ou de figurines qui bougent"],
    ["sculpture", "une œuvre taillée ou modelée en volume"],
    ["tableau", "une œuvre peinte"],
    ["source", "l'œuvre plus ancienne dont une autre s'inspire"],
  ],
  versValeur: [
    "Quand on relie des œuvres entre elles, qu'appelle-t-on « %s » ?",
    "Que veut dire le mot « %s » ?",
  ],
  versCle: [
    "Quel mot désigne %s ?",
    "Comment appelle-t-on %s ?",
  ],
  methodeValeur: "Relier des œuvres, c'est voir comment une histoire passe d'un texte ou d'un art à l'autre.",
  methodeCle: "Lis bien la définition et cherche le mot qui lui correspond.",
  proches: [
    ["adaptation", "une nouvelle version d'une histoire déjà racontée par un autre auteur"],
    ["parodie", "une nouvelle version d'une histoire déjà racontée par un autre auteur"],
    ["illustration", "une œuvre peinte"],
    ["tableau", "une image qui accompagne un texte"],
    ["bande dessinée", "une image qui accompagne un texte"],
  ],
};

export const RESEAU_LIENS: Relation = {
  nom: "réseau : ce qui relie deux œuvres",
  faits: [
    ["le Petit Chaperon rouge de Perrault et celui des frères Grimm", "la même histoire, écrite par deux écrivains"],
    ["la Cendrillon de Perrault et celle des frères Grimm", "la même histoire, écrite par deux écrivains"],
    ["la fable « La Cigale et la Fourmi » d'Ésope et celle de La Fontaine", "la même histoire, écrite par deux écrivains"],
    ["la fable « Le Corbeau et le Renard » d'Ésope et celle de La Fontaine", "la même histoire, écrite par deux écrivains"],
    ["le conte « La Belle au bois dormant » et le ballet de Tchaïkovski", "un conte devenu un spectacle de danse"],
    ["le conte « Cendrillon » et le ballet de Prokofiev", "un conte devenu un spectacle de danse"],
    ["le livre « Le Livre de la jungle » et son dessin animé", "un livre devenu un film"],
    ["le livre « Alice au pays des merveilles » et ses films", "un livre devenu un film"],
    ["le mythe de Méduse et le bouclier peint par le Caravage", "un mythe devenu une peinture"],
  ],
  versValeur: [
    "Qu'est-ce qui relie %s ?",
    "Comment décrire le lien entre %s ?",
  ],
  versCle: [],
  methodeValeur: "Demande-toi si l'histoire change d'auteur, ou si elle change d'art.",
  methodeCle: "",
};

/** Thèmes pour mettre des œuvres en réseau. Chaque œuvre n'a qu'un thème ici ;
 *  `interdits` : thèmes trop proches pour servir de leurre. */
export const THEMES: readonly { theme: string; oeuvres: readonly string[]; interdits: readonly string[] }[] = [
  {
    theme: "un héros face à un monstre",
    oeuvres: ["le mythe de Thésée et du Minotaure", "le mythe de Persée et de Méduse", "l'épisode d'Ulysse chez le Cyclope"],
    interdits: ["un enfant perdu dans la forêt", "un voyage dans un monde étrange"],
  },
  {
    theme: "un naufragé sur une île",
    oeuvres: ["Robinson Crusoé", "Vendredi ou la Vie sauvage", "L'Île mystérieuse"],
    interdits: [],
  },
  {
    theme: "une transformation",
    oeuvres: ["le mythe d'Arachné", "le mythe de Narcisse", "Le Vilain Petit Canard"],
    interdits: [],
  },
  {
    theme: "des animaux qui donnent une leçon",
    oeuvres: ["Le Corbeau et le Renard", "Le Lièvre et la Tortue", "La Cigale et la Fourmi"],
    interdits: [],
  },
  {
    theme: "un enfant perdu dans la forêt",
    oeuvres: ["Hansel et Gretel", "Blanche-Neige"],
    interdits: ["un héros face à un monstre"],
  },
  {
    theme: "un voyage dans un monde étrange",
    oeuvres: ["Alice au pays des merveilles", "Le Magicien d'Oz", "Peter Pan"],
    interdits: ["un héros face à un monstre"],
  },
];

export const CARNET: Relation = {
  nom: "carnet de lecteur",
  faits: [
    ["le titre et le nom de l'auteur", "retrouver le livre plus tard, ou le conseiller"],
    ["un court résumé", "se rappeler l'histoire sans tout relire"],
    ["un avis justifié", "dire ce qu'on a pensé du livre, avec une raison"],
    ["une phrase recopiée entre guillemets", "garder les mots exacts d'un passage aimé"],
    ["un dessin d'une scène", "montrer comment on imagine un passage"],
    ["la liste des personnages", "ne pas se perdre parmi les personnages"],
    ["une question qu'on se pose", "préparer une discussion avec la classe"],
    ["la date de fin de lecture", "suivre son parcours de lecteur au fil de l'année"],
    ["un mot nouveau et son sens", "enrichir son vocabulaire"],
  ],
  versValeur: [
    "Dans un carnet de lecteur, à quoi sert de noter %s ?",
    "Pourquoi écrire %s dans son carnet de lecteur ?",
  ],
  versCle: [
    "Que noter dans son carnet de lecteur pour %s ?",
    "Pour %s, que faut-il écrire dans son carnet ?",
  ],
  methodeValeur: "Chaque trace du carnet a un but : se souvenir, comprendre ou partager.",
  methodeCle: "Pense au but, puis à la trace qui permet de l'atteindre.",
};

/** Des livres de 6e, avec de quoi construire avis, résumés et souvenirs. */
export type Livre = {
  titre: string;
  auteur: string;
  resume: string;
  raisons: readonly string[];
  critique: string;
  experience: string;
};

export const LIVRES: readonly Livre[] = [
  {
    titre: "L'Île au trésor", auteur: "Robert Louis Stevenson",
    resume: "Jim Hawkins part en mer à la recherche d'un trésor de pirates.",
    raisons: ["le pirate Long John Silver est à la fois drôle et inquiétant", "chaque chapitre finit sur un nouveau danger"],
    critique: "les scènes de bateau sont parfois difficiles à suivre",
    experience: "Moi aussi, j'ai déjà cherché un trésor caché avec mes amis.",
  },
  {
    titre: "Le Petit Prince", auteur: "Antoine de Saint-Exupéry",
    resume: "Un petit prince venu d'une autre planète raconte ses voyages à un aviateur.",
    raisons: ["le renard explique très bien ce qu'est l'amitié", "les dessins aident à imaginer les planètes"],
    critique: "certains passages sont difficiles à comprendre",
    experience: "Moi aussi, j'ai un ami que je trouve unique au monde.",
  },
  {
    titre: "Robinson Crusoé", auteur: "Daniel Defoe",
    resume: "Robinson survit seul pendant des années sur une île déserte.",
    raisons: ["on apprend comment il construit sa maison avec presque rien", "l'arrivée de Vendredi change toute l'histoire"],
    critique: "le début est long avant le naufrage",
    experience: "Moi aussi, j'ai déjà construit une cabane dans les bois.",
  },
  {
    titre: "Le Livre de la jungle", auteur: "Rudyard Kipling",
    resume: "Mowgli, un petit garçon, grandit parmi les loups de la jungle.",
    raisons: ["Baloo et Bagheera sont des amis fidèles", "on découvre les lois de la jungle"],
    critique: "le tigre Shere Khan apparaît trop peu",
    experience: "Moi aussi, je ne me sens pas toujours à ma place dans un groupe.",
  },
  {
    titre: "Alice au pays des merveilles", auteur: "Lewis Carroll",
    resume: "Alice suit un lapin blanc et tombe dans un monde où rien n'est normal.",
    raisons: ["les jeux de mots sont très drôles", "chaque personnage est plus bizarre que le précédent"],
    critique: "l'histoire saute d'une scène à l'autre sans logique",
    experience: "Moi aussi, j'ai déjà fait un rêve où tout était à l'envers.",
  },
  {
    titre: "Les Fourberies de Scapin", auteur: "Molière",
    resume: "Le valet Scapin invente des ruses pour aider deux jeunes gens.",
    raisons: ["les ruses de Scapin font beaucoup rire", "la scène du sac est très drôle à jouer"],
    critique: "on se perd un peu entre les pères et les fils",
    experience: "Moi aussi, j'ai déjà joué un tour à mon grand frère.",
  },
  {
    titre: "Le Tour du monde en quatre-vingts jours", auteur: "Jules Verne",
    resume: "Phileas Fogg parie qu'il fera le tour du monde en quatre-vingts jours.",
    raisons: ["la course contre la montre donne envie de lire la suite", "on voyage dans de nombreux pays"],
    critique: "certaines descriptions de trains sont longues",
    experience: "Moi aussi, j'ai déjà couru pour ne pas rater un train.",
  },
  {
    titre: "Vingt Mille Lieues sous les mers", auteur: "Jules Verne",
    resume: "Le professeur Aronnax est retenu à bord du sous-marin du capitaine Nemo.",
    raisons: ["on découvre les fonds marins", "le capitaine Nemo est un personnage mystérieux"],
    critique: "les listes de poissons sont parfois longues",
    experience: "Moi aussi, j'ai déjà observé des poissons avec un masque et un tuba.",
  },
  {
    titre: "Croc-Blanc", auteur: "Jack London",
    resume: "Croc-Blanc, un chien-loup, grandit dans le Grand Nord.",
    raisons: ["on vit l'histoire du point de vue de l'animal", "on voit Croc-Blanc changer au fil du livre"],
    critique: "certaines scènes de combat sont dures",
    experience: "Moi aussi, j'ai déjà apprivoisé un animal craintif.",
  },
  {
    titre: "Les Aventures de Pinocchio", auteur: "Carlo Collodi",
    resume: "Un pantin de bois rêve de devenir un vrai petit garçon.",
    raisons: ["ses bêtises sont drôles", "on a envie qu'il réussisse"],
    critique: "il refait souvent les mêmes erreurs",
    experience: "Moi aussi, j'ai déjà menti et je l'ai regretté.",
  },
  {
    titre: "Le Hobbit", auteur: "J. R. R. Tolkien",
    resume: "Bilbo, un hobbit tranquille, part avec des nains reprendre un trésor gardé par un dragon.",
    raisons: ["le voyage est plein de créatures étonnantes", "Bilbo devient courageux peu à peu"],
    critique: "il y a beaucoup de nains à retenir",
    experience: "Moi aussi, j'ai déjà quitté ma maison pour un voyage qui me faisait peur.",
  },
  {
    titre: "Fables", auteur: "Jean de La Fontaine",
    resume: "Des animaux qui parlent donnent des leçons aux hommes.",
    raisons: ["les morales sont faciles à retenir", "les animaux ressemblent à des gens qu'on connaît"],
    critique: "certains mots anciens sont difficiles",
    experience: "Moi aussi, j'ai déjà rencontré un vrai flatteur.",
  },
  {
    titre: "Le Petit Poucet", auteur: "Charles Perrault",
    resume: "Le plus petit de sept frères sauve toute la fratrie de l'ogre.",
    raisons: ["le Petit Poucet est malin malgré sa taille", "la scène des bottes de sept lieues est magique"],
    critique: "l'abandon des enfants au début est très triste",
    experience: "Moi aussi, j'ai déjà eu peur de me perdre dans une forêt.",
  },
  {
    titre: "Le Magicien d'Oz", auteur: "L. Frank Baum",
    resume: "Dorothy est emportée par une tornade jusqu'au pays d'Oz.",
    raisons: ["ses compagnons de route sont attachants", "chacun découvre qu'il avait déjà ce qu'il cherchait"],
    critique: "la fin arrive trop vite",
    experience: "Moi aussi, j'ai déjà eu très envie de rentrer à la maison.",
  },
  {
    titre: "Vendredi ou la Vie sauvage", auteur: "Michel Tournier",
    resume: "Robinson et Vendredi apprennent à vivre ensemble sur une île.",
    raisons: ["Vendredi apprend à Robinson à jouer et à rire", "on voit naître l'amitié entre deux êtres très différents"],
    critique: "Robinson est longtemps très sévère",
    experience: "Moi aussi, j'ai un ami très différent de moi.",
  },
  {
    titre: "l'Odyssée", auteur: "",
    resume: "Ulysse met dix ans à rentrer chez lui après la guerre de Troie.",
    raisons: ["les monstres comme le Cyclope sont impressionnants", "Ulysse se sort de tout grâce à sa ruse"],
    critique: "il y a beaucoup de dieux à retenir",
    experience: "Moi aussi, j'ai déjà eu hâte de retrouver ma famille après un long voyage.",
  },
];

// ════════════════════════════════════════════════════════════════════════
// LECTURE D'ŒUVRES
// ════════════════════════════════════════════════════════════════════════

export const STRATEGIES_LECTURE: Relation = {
  nom: "suivre une œuvre longue",
  // Chaque situation nomme UN manque précis, et chaque méthode comble CE manque :
  // sinon deux méthodes seraient bonnes à la fois.
  faits: [
    ["quand tu as oublié ce qui s'est passé au chapitre d'avant", "relire le résumé du chapitre précédent dans ton carnet"],
    ["quand tu ne te souviens plus de qui est un personnage", "regarder la liste des personnages de ton carnet"],
    ["quand un mot inconnu t'empêche de comprendre une phrase", "chercher ce mot dans le dictionnaire"],
    ["quand tu veux retrouver plus tard un passage que tu as aimé", "noter la page et recopier une phrase"],
    ["quand tu ne sais plus dans quel lieu se passe l'action", "chercher dans le texte les indices de lieu"],
    ["quand tu ne sais plus à quelle époque se passe l'histoire", "chercher dans le texte les indices de temps"],
    ["quand tu ne sais plus qui raconte l'histoire", "chercher qui dit « je » dans le chapitre"],
    ["quand tu as peur de ne jamais finir un livre très long", "te fixer quelques pages à lire chaque jour"],
  ],
  versValeur: [
    "Pendant la lecture d'un long roman, que faire %s ?",
    "Que peux-tu faire %s ?",
  ],
  versCle: [
    "Dans quelle situation est-il utile de %s ?",
    "Quand faut-il penser à %s ?",
  ],
  methodeValeur: "Pour lire un long livre, on garde le fil : on note, on résume, on revient en arrière.",
  methodeCle: "Demande-toi quel problème de lecteur cette méthode règle.",
};

export const EVENEMENTS_CHAPITRES: readonly string[] = [
  "trouve une vieille carte", "rencontre un voyageur mystérieux", "se perd dans le brouillard",
  "découvre un passage secret", "reçoit une lettre étrange", "perd son sac dans la rivière",
  "sauve un chien blessé", "monte à bord d'un bateau", "entend un bruit dans le grenier",
  "résout une énigme gravée sur une porte", "échappe à une tempête", "répare une vieille radio",
  "traverse un pont de cordes", "dort dans une grotte",
];

/** Rôles des personnages secondaires : [féminin, masculin]. */
export const ROLES: readonly (readonly [string, string])[] = [
  ["sa cousine", "son cousin"],
  ["sa voisine", "son voisin"],
  ["la capitaine du bateau", "le capitaine du bateau"],
  ["sa meilleure amie", "son meilleur ami"],
  ["la gardienne du phare", "le gardien du phare"],
  ["sa grande sœur", "son grand frère"],
  ["la libraire du quartier", "le libraire du quartier"],
  ["l'institutrice du village", "l'instituteur du village"],
  ["la boulangère", "le boulanger"],
  ["la pilote de l'avion", "le pilote de l'avion"],
];

/** Signes d'un sentiment, à l'imparfait, sans sujet. */
export const SENTIMENTS: readonly { nom: string; signes: readonly string[] }[] = [
  { nom: "la peur", signes: ["tremblait de tout son corps", "sentait son cœur battre très fort", "reculait sans faire de bruit", "n'osait plus bouger"] },
  { nom: "la joie", signes: ["souriait jusqu'aux oreilles", "sautait sur place en riant", "chantait à tue-tête"] },
  { nom: "la colère", signes: ["serrait les poings", "frappait du pied", "criait, rouge jusqu'aux oreilles"] },
  { nom: "la tristesse", signes: ["avait les larmes aux yeux", "baissait la tête en silence", "pleurait doucement"] },
  { nom: "la surprise", signes: ["ouvrait de grands yeux", "restait bouche bée"] },
  { nom: "la fatigue", signes: ["bâillait sans arrêt", "avait les paupières lourdes"] },
];

export const AMORCES_PASSAGE: readonly string[] = [
  "La cloche sonna.", "La lettre arriva enfin.", "Le train s'arrêta.", "Le maître annonça les résultats.",
  "La porte s'ouvrit.", "La nuit tomba sur le camp.", "Le match se termina.", "Le rideau se leva.",
];

// ⛔ Pas de table « situation de débat → bonne attitude » : plusieurs attitudes
// sont bonnes à la fois (écouter, citer le texte, reformuler…). Le débat est
// servi par des briques calculées (culture.ts), où une seule réponse argumente.
export const REPONSES_IMPOLIES: readonly string[] = [
  "Tu dis n'importe quoi !",
  "C'est nul, un point c'est tout.",
  "Ton avis ne compte pas.",
  "Je n'ai pas lu le livre, mais tu as tort.",
  "Arrête, personne ne pense comme toi.",
];

// ── Débuts d'extraits pour reconnaître un genre ──────────────────────────────

export const CONTE_SUJETS: readonly string[] = [
  "un meunier", "une reine", "un pauvre bûcheron", "une jeune fille", "un vieux roi", "une princesse", "un pêcheur", "une fermière",
];
export const CONTE_SUITES: readonly string[] = [
  "vivait au bord d'une forêt", "avait trois enfants", "rêvait de voir la mer", "n'avait plus rien à manger",
  "possédait un miroir magique", "habitait un château sur une colline",
];
export const FABLE_ANIMAUX: readonly string[] = [
  "le renard", "le corbeau", "la fourmi", "le lion", "le rat", "la tortue", "le lièvre", "le loup", "l'agneau", "la grenouille",
];
export const MORALES: readonly string[] = [
  "Il ne faut pas se moquer des plus petits que soi.",
  "Qui se vante trop finit par tomber.",
  "Mieux vaut réfléchir avant d'agir.",
  "La patience vaut mieux que la force.",
  "Un ami fidèle vaut mieux qu'un trésor.",
];
export const ROMAN_PHRASES: readonly string[] = [
  "se leva avant l'aube et descendit sans bruit",
  "ouvrit la porte du grenier et retint son souffle",
  "regarda le bateau s'éloigner du quai",
  "glissa la lettre dans sa poche et sortit",
  "entendit soudain des pas derrière la porte",
];
export const POEMES_COURTS: readonly string[] = [
  "Le vent du soir chante une chanson / Il fait danser les feuilles du buisson / La lune monte au-dessus des toits / Et tout s'endort au fond des bois",
  "Sur la plage, un petit coquillage / Garde le bruit des vagues du rivage / Je le colle tout près de mon oreille / Et j'entends la mer qui se réveille",
  "La pluie tape sur le carreau / Elle chante avec les ruisseaux / Les escargots sortent sans bruit / Pour leur promenade de minuit",
  "Un papillon jaune et léger / Danse au-dessus du cerisier / Il se pose sur une fleur / Et repart vers d'autres couleurs",
  "La neige tombe sur la ville / Les flocons dansent, tranquilles / Les enfants courent dans la rue / Le froid ne les arrête plus",
  "Le soleil se couche sur la mer / Il la peint de rouge et de lumière / Les bateaux rentrent tout doucement / Bercés par la chanson du vent",
];
