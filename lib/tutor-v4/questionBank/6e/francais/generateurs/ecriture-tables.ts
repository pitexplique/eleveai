// LES TABLES DE LA FAMILLE « ÉCRITURE » DU FRANÇAIS DE 6e (05/10/2026).
// Voir ecriture.ts pour les générateurs et leurs correcteurs.
//
// Jetons des phrases : %P = le prénom ; %il / %Il = il ou elle selon le prénom ;
// %e = « e » au féminin. ⛔ Aucun mot à h aspiré en tête de mot (le héros, le
// hibou…) : les contrôles d'élision ne s'y trompent pas ainsi.

export type Prenom = { p: string; f: boolean };

export const PRENOMS: readonly Prenom[] = [
  { p: "Léa", f: true }, { p: "Inès", f: true }, { p: "Chloé", f: true }, { p: "Aïcha", f: true },
  { p: "Zoé", f: true }, { p: "Sofia", f: true }, { p: "Nora", f: true }, { p: "Jade", f: true },
  { p: "Maya", f: true }, { p: "Lina", f: true }, { p: "Amina", f: true }, { p: "Mei", f: true },
  { p: "Elif", f: true }, { p: "Rose", f: true }, { p: "Yasmine", f: true }, { p: "Clara", f: true },
  { p: "Noah", f: false }, { p: "Maël", f: false }, { p: "Yanis", f: false }, { p: "Kenji", f: false },
  { p: "Lucas", f: false }, { p: "Malo", f: false }, { p: "Ibrahim", f: false }, { p: "Tom", f: false },
  { p: "Nathan", f: false }, { p: "Rayan", f: false }, { p: "Diego", f: false }, { p: "Enzo", f: false },
  { p: "Moussa", f: false }, { p: "Théo", f: false }, { p: "Sami", f: false }, { p: "Arthur", f: false },
];

// ════════════════════════════════════════════════════════════════════════
// LA COPIE : des phrases modèles, riches en accents et en lettres doubles.
// ════════════════════════════════════════════════════════════════════════

export const MODELES_COPIE: readonly string[] = [
  "Le soleil se lève derrière la colline.",
  "%P range ses crayons dans sa trousse.",
  "Les élèves écoutent attentivement le professeur.",
  "Le train arrive à la gare à midi.",
  "%P a oublié son cahier de français.",
  "Une tortue traverse lentement le jardin.",
  "La mer est très calme ce matin.",
  "Nous préparons une tarte aux pommes.",
  "%P joue de la guitare après l'école.",
  "Le chat grimpe sur le toit de la cabane.",
  "Les feuilles tombent en automne.",
  "Mon frère collectionne les timbres.",
  "%P court le long de la rivière.",
  "La bibliothèque ferme ses portes le samedi.",
  "Un écureuil cache des noisettes.",
  "L'arbitre siffle la fin du match.",
  "%P observe les étoiles avec une lunette.",
  "Les montagnes sont couvertes de neige.",
  "Ma sœur apprend à nager à la piscine.",
  "Le boulanger sort le pain du four.",
  "%P dessine un bateau sur son carnet.",
  "Les abeilles butinent les fleurs du verger.",
  "Une chouette appelle dans la forêt.",
  "Le vent souffle très fort cette nuit.",
  "%P répète son rôle pour la pièce de théâtre.",
  "Les dauphins sautent près du bateau.",
  "Notre classe visite un musée.",
  "Le facteur apporte une lettre.",
  "%P arrose les tomates du potager.",
  "La pluie tambourine contre la fenêtre.",
  "Les enfants construisent un château de sable.",
  "Le cuisinier épluche des carottes.",
  "%P prépare son sac pour la randonnée.",
  "Un volcan fume au loin.",
  "La grenouille saute dans la mare.",
  "Mon grand-père répare une vieille bicyclette.",
];

// ════════════════════════════════════════════════════════════════════════
// LES CODES DE L'ÉCRIT : types de phrases, noms propres, énumérations, paroles.
// ════════════════════════════════════════════════════════════════════════

/** Questions SANS leur point final ; chacune a une marque visible (inversion, mot interrogatif). */
export const PHRASES_QUESTION: readonly string[] = [
  "As-tu fini ton exercice",
  "Où %P a-t-%il rangé son ballon",
  "Pourquoi le chien aboie-t-il",
  "Est-ce que tu viens au cinéma samedi",
  "Quand partons-nous en voyage",
  "Comment s'appelle ton professeur de musique",
  "Combien de livres as-tu lus cet été",
  "Veux-tu jouer aux échecs avec %P",
  "Est-ce %qP a déjà vu la mer",
  "Où se trouve la salle de sciences",
  "Pourquoi la lune change-t-elle de forme",
  "Avez-vous vu le chat %dP",
  "Quel âge as-tu",
  "Est-ce que le musée ouvre le dimanche",
  "Quand la piscine ferme-t-elle",
];

/** Exclamations SANS leur point final : elles commencent par « Comme » ou « Quel / Quelle ». */
export const PHRASES_EXCLAMATION: readonly string[] = [
  "Comme ce gâteau sent bon",
  "Quelle belle journée",
  "Comme %P court vite",
  "Quel magnifique coucher de soleil",
  "Comme la montagne est haute",
  "Quelle surprise de te voir ici",
  "Comme ce film était drôle",
  "Quel froid ce matin",
  "Comme les vagues sont grandes aujourd'hui",
  "Quelle chance nous avons eue",
  "Comme %P chante bien",
  "Quel bruit dans ce couloir",
];

/** Affirmations SANS leur point final. */
export const PHRASES_AFFIRMATION: readonly string[] = [
  "%P range ses crayons dans sa trousse",
  "Le train arrive à la gare à midi",
  "Une tortue traverse lentement le jardin",
  "Nous préparons une tarte aux pommes",
  "%P joue de la guitare après l'école",
  "Les feuilles tombent en automne",
  "La bibliothèque ferme ses portes le samedi",
  "%P observe les étoiles avec une lunette",
  "Le boulanger sort le pain du four",
  "Les dauphins sautent près du bateau",
  "%P arrose les tomates du potager",
  "Le cuisinier épluche des carottes",
];

/** Un nom propre de lieu, et la phrase qui l'emploie (%L = le lieu, %P = un prénom). */
export const LIEUX: readonly string[] = [
  "Paris", "Lyon", "Marseille", "Lille", "Bordeaux", "Toulouse", "Nantes", "Strasbourg",
  "Madrid", "Rome", "Londres", "Berlin", "Dakar", "Montréal", "Tokyo", "Saint-Denis",
];
export const PHRASES_LIEU: readonly string[] = [
  "Cet été, %P part en vacances à %L.",
  "Le cousin %dP habite à %L.",
  "Notre classe prend le train pour %L.",
  "%P a envoyé une carte postale de %L.",
  "Demain, l'équipe %dP joue un match à %L.",
  "Ma tante travaille dans un musée à %L.",
  "Le grand-père %dP est né à %L.",
  "Nous avons visité un zoo à %L.",
];

/** Une phrase d'énumération : %P, puis 3 ou 4 éléments séparés par des virgules et « et ». */
export const ENUMERATIONS: readonly { debut: string; items: readonly string[] }[] = [
  { debut: "Au marché, %P achète", items: ["des pommes", "des poires", "des prunes", "des cerises"] },
  { debut: "Dans son sac, %P met", items: ["un cahier", "une règle", "une gomme", "un compas"] },
  { debut: "Pour la randonnée, %P emporte", items: ["une gourde", "un chapeau", "une carte", "des biscuits"] },
  { debut: "Au zoo, nous avons vu", items: ["des girafes", "des lions", "des zèbres", "des singes"] },
  { debut: "Pour le gâteau, il faut", items: ["de la farine", "du sucre", "des œufs", "du beurre"] },
  { debut: "Dans la forêt, %P entend", items: ["le vent", "les oiseaux", "un ruisseau", "des branches qui craquent"] },
  { debut: "À la plage, %P ramasse", items: ["des coquillages", "des galets", "du bois flotté", "des algues"] },
  { debut: "Pour son anniversaire, %P invite", items: ["ses cousins", "sa voisine", "deux amis du club", "sa meilleure amie"] },
  { debut: "En sciences, nous observons", items: ["une fourmi", "une feuille", "un caillou", "une plume"] },
  { debut: "Dans l'orchestre, on entend", items: ["des violons", "une flûte", "un piano", "des tambours"] },
];

/** Des paroles rapportées : le verbe de parole et la réplique (avec sa ponctuation). */
export const PAROLES: readonly { verbe: string; replique: string }[] = [
  { verbe: "demande", replique: "Tu viens jouer ?" },
  { verbe: "crie", replique: "Attention au ballon !" },
  { verbe: "annonce", replique: "Le bus est en retard." },
  { verbe: "murmure", replique: "Le bébé dort enfin." },
  { verbe: "propose", replique: "Allons à la bibliothèque." },
  { verbe: "s'exclame", replique: "Quelle belle surprise !" },
  { verbe: "explique", replique: "Il faut d'abord lire la consigne." },
  { verbe: "répond", replique: "Je n'ai pas encore fini." },
  { verbe: "demande", replique: "Où est passé mon stylo ?" },
  { verbe: "dit", replique: "Je préfère le chocolat." },
];

// ════════════════════════════════════════════════════════════════════════
// LES RÉCITS : quatre étapes (situation, problème, action, fin), SANS
// connecteur en tête (la question l'ajoute), et le plan en notes.
// L'étape 1 nomme le personnage (%P) avant tout pronom.
// `mots` : les mots propres à ce récit (une étape étrangère se reconnaît à eux).
// ════════════════════════════════════════════════════════════════════════

export type Recit = { etapes: readonly [string, string, string, string]; notes: readonly [string, string, string, string]; mots: readonly string[] };

export const RECITS: readonly Recit[] = [
  {
    etapes: ["%P emporte son cerf-volant à la plage.", "Une rafale arrache la ficelle de ses mains.", "%Il court derrière le jouet jusqu'aux dunes.", "%Il retrouve son cerf-volant accroché à un buisson."],
    notes: ["aller à la plage avec un cerf-volant", "perdre la ficelle dans une rafale", "courir jusqu'aux dunes", "retrouver le cerf-volant dans un buisson"],
    mots: ["cerf-volant", "ficelle", "rafale", "dunes"],
  },
  {
    etapes: ["%P entend un miaulement sous une voiture.", "%Il découvre un petit chaton tremblant.", "%Il lui apporte une soucoupe de lait.", "Ses parents acceptent de garder le minou."],
    notes: ["entendre un miaulement", "découvrir un chaton", "lui donner du lait", "pouvoir garder le chaton"],
    mots: ["chaton", "miaulement", "soucoupe", "minou"],
  },
  {
    etapes: ["%P rentre de l'école en fin d'après-midi.", "%Il ne trouve plus sa clé dans son sac.", "%Il fouille le trottoir sur tout le trajet.", "La voisine lui rend la clé tombée devant sa porte."],
    notes: ["rentrer de l'école", "ne plus trouver sa clé", "fouiller le trottoir", "récupérer la clé chez la voisine"],
    mots: ["clé", "voisine", "trottoir"],
  },
  {
    etapes: ["%P veut préparer un gâteau pour sa mère.", "%Il casse les œufs et mélange la farine.", "Le four chauffe trop et le dessus brûle.", "%Il cache la croûte noire sous des fraises."],
    notes: ["vouloir faire un gâteau", "préparer la pâte", "brûler le dessus", "le décorer avec des fraises"],
    mots: ["gâteau", "four", "farine", "fraises", "croûte"],
  },
  {
    etapes: ["%P joue son premier match de basket.", "Son équipe perd de dix points à la mi-temps.", "%Il encourage ses camarades sans relâche.", "L'équipe gagne de justesse grâce à un dernier panier."],
    notes: ["jouer son premier match", "être mené à la mi-temps", "encourager ses camarades", "gagner au dernier panier"],
    mots: ["basket", "mi-temps", "panier", "match"],
  },
  {
    etapes: ["%P part en randonnée avec son oncle.", "Le brouillard tombe et cache le sentier.", "%Il sort la carte et la boussole.", "Tous deux atteignent le refuge avant la nuit."],
    notes: ["partir en randonnée", "être surpris par le brouillard", "s'orienter avec la carte", "arriver au refuge"],
    mots: ["randonnée", "brouillard", "boussole", "refuge", "sentier"],
  },
  {
    etapes: ["%P plante une graine de tournesol dans un pot.", "%Il arrose la terre chaque matin.", "Une petite tige verte sort au bout d'une semaine.", "%Il mesure la pousse et note sa taille dans un cahier."],
    notes: ["planter une graine", "arroser chaque matin", "voir la tige sortir", "mesurer la pousse"],
    mots: ["graine", "tournesol", "tige", "pousse", "arrose"],
  },
  {
    etapes: ["%P répète un morceau de piano pour le concert.", "Sur scène, ses mains tremblent sur le clavier.", "%Il respire lentement et se concentre.", "Le public applaudit longuement à la dernière note."],
    notes: ["répéter un morceau", "trembler sur scène", "se concentrer", "être applaudi"],
    mots: ["piano", "concert", "clavier", "scène", "public"],
  },
  {
    etapes: ["%P se promène au bord de la mer.", "%Il aperçoit une bouteille entre deux rochers.", "À l'intérieur, un vieux message attend.", "%Il décide d'écrire à son tour une réponse."],
    notes: ["se promener au bord de la mer", "trouver une bouteille", "lire le message", "écrire une réponse"],
    mots: ["bouteille", "message", "rochers", "réponse"],
  },
  {
    etapes: ["%P part à vélo chez sa grand-mère.", "Un clou crève le pneu avant.", "Un garagiste du village répare la roue.", "%Il arrive chez sa grand-mère à temps pour le goûter."],
    notes: ["partir à vélo", "crever un pneu", "faire réparer la roue", "arriver pour le goûter"],
    mots: ["vélo", "pneu", "roue", "garagiste", "clou", "grand-mère"],
  },
  {
    etapes: ["%P prépare un exposé sur les volcans.", "%Il oublie sa clé USB à la maison.", "%Il présente son travail en dessinant au tableau.", "La classe pose beaucoup de questions sur les volcans."],
    notes: ["préparer un exposé", "oublier la clé USB", "dessiner au tableau", "répondre aux questions"],
    mots: ["exposé", "volcans", "USB", "tableau"],
  },
  {
    etapes: ["%P plonge avec un masque dans le lagon.", "Une tortue marine glisse sous ses yeux.", "%Il la suit sans faire de bruit.", "L'animal disparaît vers le large."],
    notes: ["plonger dans le lagon", "voir une tortue", "la suivre en silence", "la regarder partir"],
    mots: ["lagon", "tortue", "masque", "large"],
  },
  {
    etapes: ["%P se réveille et découvre la neige.", "%Il enfile vite ses bottes et son bonnet.", "Avec sa sœur, %il construit un bonhomme.", "Le redoux fait fondre le bonhomme en une journée."],
    notes: ["découvrir la neige", "s'habiller chaudement", "construire un bonhomme", "le voir fondre"],
    mots: ["neige", "bonhomme", "bonnet", "bottes", "fondre"],
  },
  {
    etapes: ["%P emprunte un livre à la bibliothèque.", "%Il le lit sous la couette avec une lampe.", "Son frère renverse du jus sur la couverture.", "%Il rapporte le livre taché et s'excuse."],
    notes: ["emprunter un livre", "le lire le soir", "le tacher avec du jus", "le rapporter en s'excusant"],
    mots: ["livre", "bibliothèque", "couverture", "taché", "couette"],
  },
  {
    etapes: ["%P prend le train pour aller chez son cousin.", "Le train s'arrête longtemps en pleine campagne.", "%Il observe des vaches par la fenêtre.", "%Il arrive chez son cousin avec une heure de retard."],
    notes: ["prendre le train", "s'arrêter en pleine campagne", "regarder des vaches", "arriver en retard"],
    mots: ["train", "vaches", "campagne", "cousin"],
  },
  {
    etapes: ["%P construit un petit robot avec des pièces de récupération.", "La machine refuse de démarrer.", "%Il vérifie chaque fil avec patience.", "Le robot finit par avancer de quelques pas."],
    notes: ["construire un robot", "voir le robot refuser de démarrer", "vérifier les fils", "voir le robot avancer"],
    mots: ["robot", "machine", "fil", "pièces"],
  },
];

/** Les connecteurs qui OUVRENT un récit, et ceux qui le FERMENT (jamais l'un pour l'autre). */
export const OUVERTURES: readonly string[] = ["Un matin", "Un jour", "Un samedi", "Il y a quelques semaines", "Un mercredi"];
export const FERMETURES: readonly string[] = ["Finalement", "Enfin", "Pour finir", "À la fin"];

// ════════════════════════════════════════════════════════════════════════
// LA COHÉRENCE DES TEMPS : de petits récits de trois phrases, au passé
// simple ET au présent. Une phrase change de temps : c'est elle qui casse.
// ════════════════════════════════════════════════════════════════════════

export const RECITS_TEMPS: readonly (readonly { ps: string; pr: string }[])[] = [
  [
    { ps: "%P ouvrit la porte du grenier.", pr: "%P ouvre la porte du grenier." },
    { ps: "%Il découvrit une vieille malle.", pr: "%Il découvre une vieille malle." },
    { ps: "%Il souleva le couvercle avec précaution.", pr: "%Il soulève le couvercle avec précaution." },
  ],
  [
    { ps: "%P arriva devant la rivière.", pr: "%P arrive devant la rivière." },
    { ps: "%Il chercha un passage entre les rochers.", pr: "%Il cherche un passage entre les rochers." },
    { ps: "%Il traversa en sautant de pierre en pierre.", pr: "%Il traverse en sautant de pierre en pierre." },
  ],
  [
    { ps: "Le vent se leva brusquement.", pr: "Le vent se lève brusquement." },
    { ps: "Les voiles du bateau claquèrent.", pr: "Les voiles du bateau claquent." },
    { ps: "Le capitaine donna l'ordre de rentrer au port.", pr: "Le capitaine donne l'ordre de rentrer au port." },
  ],
  [
    { ps: "%P entra dans la classe.", pr: "%P entre dans la classe." },
    { ps: "%Il posa son cartable près du radiateur.", pr: "%Il pose son cartable près du radiateur." },
    { ps: "%Il sortit son livre de sciences.", pr: "%Il sort son livre de sciences." },
  ],
  [
    { ps: "Un orage éclata au-dessus du village.", pr: "Un orage éclate au-dessus du village." },
    { ps: "Les habitants fermèrent les volets.", pr: "Les habitants ferment les volets." },
    { ps: "La pluie tomba toute la nuit.", pr: "La pluie tombe toute la nuit." },
  ],
  [
    { ps: "%P monta sur le plongeoir.", pr: "%P monte sur le plongeoir." },
    { ps: "%Il regarda l'eau tout en bas.", pr: "%Il regarde l'eau tout en bas." },
    { ps: "%Il sauta en fermant les yeux.", pr: "%Il saute en fermant les yeux." },
  ],
  [
    { ps: "Le renard s'approcha du poulailler.", pr: "Le renard s'approche du poulailler." },
    { ps: "Le chien de la ferme aboya très fort.", pr: "Le chien de la ferme aboie très fort." },
    { ps: "Le voleur disparut dans les bois.", pr: "Le voleur disparaît dans les bois." },
  ],
  [
    { ps: "%P alluma sa lampe de poche.", pr: "%P allume sa lampe de poche." },
    { ps: "%Il avança dans le couloir sombre.", pr: "%Il avance dans le couloir sombre." },
    { ps: "%Il entendit un craquement.", pr: "%Il entend un craquement." },
  ],
  [
    { ps: "Le train quitta la gare à l'aube.", pr: "Le train quitte la gare à l'aube." },
    { ps: "Les voyageurs admirèrent les montagnes.", pr: "Les voyageurs admirent les montagnes." },
    { ps: "Le soleil illumina les sommets.", pr: "Le soleil illumine les sommets." },
  ],
  [
    { ps: "%P trouva un oiseau blessé.", pr: "%P trouve un oiseau blessé." },
    { ps: "%Il le porta jusqu'à la maison.", pr: "%Il le porte jusqu'à la maison." },
    { ps: "%Il lui prépara un nid dans une boîte.", pr: "%Il lui prépare un nid dans une boîte." },
  ],
  [
    { ps: "La cloche sonna la fin de la récréation.", pr: "La cloche sonne la fin de la récréation." },
    { ps: "Les élèves rangèrent leurs ballons.", pr: "Les élèves rangent leurs ballons." },
    { ps: "Ils rejoignirent leur classe en silence.", pr: "Ils rejoignent leur classe en silence." },
  ],
  [
    { ps: "%P grimpa au sommet de la dune.", pr: "%P grimpe au sommet de la dune." },
    { ps: "%Il contempla la mer immense.", pr: "%Il contemple la mer immense." },
    { ps: "%Il dévala la pente en riant.", pr: "%Il dévale la pente en riant." },
  ],
];

// ════════════════════════════════════════════════════════════════════════
// LES REPRISES : un groupe nominal et ce qui peut le reprendre sans répétition.
// Les catégories ne se recouvrent pas : la reprise d'une autre catégorie est fausse.
// ════════════════════════════════════════════════════════════════════════

export type Reprise = { gn: string; reprises: readonly string[]; cat: string; actions: readonly [string, string] };

export const REPRISES: readonly Reprise[] = [
  { gn: "Le chaton", reprises: ["L'animal", "Le petit félin"], cat: "animal", actions: ["dort sur le canapé.", "ronronne doucement."] },
  { gn: "Le dauphin", reprises: ["L'animal", "Le mammifère marin"], cat: "animal", actions: ["saute hors de l'eau.", "replonge aussitôt."] },
  { gn: "La girafe", reprises: ["L'animal", "La grande bête"], cat: "animal", actions: ["mange des feuilles d'acacia.", "tend son long cou vers les branches."] },
  { gn: "L'aigle", reprises: ["L'oiseau", "Le rapace"], cat: "animal", actions: ["tourne au-dessus de la vallée.", "plonge vers un lapin."] },
  { gn: "Le vélo", reprises: ["Le véhicule", "La bicyclette"], cat: "véhicule", actions: ["est garé devant l'école.", "a un pneu crevé."] },
  { gn: "Le bus", reprises: ["Le véhicule", "Le car"], cat: "véhicule", actions: ["arrive en retard.", "s'arrête devant le collège."] },
  { gn: "Le marteau", reprises: ["L'outil", "Cet outil"], cat: "outil", actions: ["est posé sur l'établi.", "sert à enfoncer les clous."] },
  { gn: "La scie", reprises: ["L'outil", "Cet outil"], cat: "outil", actions: ["est accrochée au mur.", "coupe les planches."] },
  { gn: "La guitare", reprises: ["L'instrument", "Cet instrument"], cat: "instrument", actions: ["est rangée dans sa housse.", "a une corde cassée."] },
  { gn: "Le violon", reprises: ["L'instrument", "Cet instrument"], cat: "instrument", actions: ["appartient à mon grand-père.", "sonne merveilleusement bien."] },
  { gn: "Le chêne", reprises: ["L'arbre", "Ce vieil arbre"], cat: "plante", actions: ["pousse au milieu du parc.", "perd ses feuilles en automne."] },
  { gn: "Le tournesol", reprises: ["La fleur", "La plante"], cat: "plante", actions: ["grandit dans le jardin.", "suit la course du soleil."] },
  { gn: "Le château", reprises: ["Le bâtiment", "Cette forteresse"], cat: "bâtiment", actions: ["domine la colline.", "accueille des visiteurs chaque été."] },
  { gn: "Le phare", reprises: ["La tour", "Le bâtiment"], cat: "bâtiment", actions: ["se dresse au bout de la jetée.", "guide les bateaux la nuit."] },
  { gn: "Le boulanger", reprises: ["L'artisan", "Le commerçant"], cat: "personne", actions: ["ouvre sa boutique à six heures.", "pétrit la pâte avec soin."] },
  { gn: "La pomme", reprises: ["Le fruit", "Ce fruit"], cat: "aliment", actions: ["est posée sur la table.", "est bien juteuse."] },
];

// ════════════════════════════════════════════════════════════════════════
// LES RÉPÉTITIONS DU PRÉNOM : deux actions de suite du même personnage.
// ════════════════════════════════════════════════════════════════════════

export const DEUX_ACTIONS: readonly (readonly [string, string])[] = [
  ["prend son sac.", "part à l'école."],
  ["ouvre son cahier.", "commence l'exercice."],
  ["enfile ses chaussures.", "court au stade."],
  ["sort le pain du placard.", "prépare des tartines."],
  ["ramasse un coquillage.", "le montre à sa sœur."],
  ["allume l'ordinateur.", "cherche un documentaire sur les requins."],
  ["monte dans le bus.", "s'assoit près de la fenêtre."],
  ["lit la consigne.", "souligne les mots importants."],
  ["arrose les plantes.", "nourrit le poisson rouge."],
  ["accroche sa veste.", "rejoint ses camarades."],
  ["termine son dessin.", "l'affiche au mur."],
  ["range sa chambre.", "descend pour le dîner."],
  ["écoute la météo.", "prend son parapluie."],
  ["attrape le ballon.", "tire au but."],
  ["regarde la carte.", "choisit le chemin le plus court."],
  ["épluche une orange.", "partage les quartiers avec son frère."],
];

// ════════════════════════════════════════════════════════════════════════
// LES CONNECTEURS LOGIQUES : deux propositions et leur relation.
// %c = le connecteur. Les familles ne se recouvrent pas.
// ════════════════════════════════════════════════════════════════════════

export const CONNECTEURS = {
  cause: ["parce que", "car"],
  consequence: ["donc", "alors"],
  opposition: ["mais", "pourtant"],
} as const;
export type Relation = keyof typeof CONNECTEURS;

export const LIENS: readonly { a: string; b: string; rel: Relation }[] = [
  { a: "%P met son manteau", b: "il fait très froid", rel: "cause" },
  { a: "%P apporte un parapluie", b: "la météo annonce de la pluie", rel: "cause" },
  { a: "%P reste à la maison", b: "%il a de la fièvre", rel: "cause" },
  { a: "%P se couche tôt", b: "%il part en voyage demain matin", rel: "cause" },
  { a: "%P révise ses leçons", b: "%il a un contrôle demain", rel: "cause" },
  { a: "%P arrose le potager", b: "la terre est très sèche", rel: "cause" },
  { a: "%P a très faim", b: "%il prend une pomme", rel: "consequence" },
  { a: "Le bus est en retard", b: "%P arrive après la sonnerie", rel: "consequence" },
  { a: "%P a oublié sa gourde", b: "%il boit à la fontaine", rel: "consequence" },
  { a: "La nuit tombe", b: "%P allume sa lampe", rel: "consequence" },
  { a: "%P a fini son exercice", b: "%il aide son voisin", rel: "consequence" },
  { a: "La piscine est fermée", b: "%P va courir au parc", rel: "consequence" },
  { a: "Il pleut à verse", b: "%P sort sans parapluie", rel: "opposition" },
  { a: "%P est très fatigué%e", b: "%il continue à marcher", rel: "opposition" },
  { a: "%P déteste les épinards", b: "%il les goûte pour faire plaisir", rel: "opposition" },
  { a: "Le film est long", b: "%P ne s'ennuie pas une seconde", rel: "opposition" },
  { a: "%P s'est beaucoup entraîné%e", b: "%il perd la course", rel: "opposition" },
  { a: "L'eau est glacée", b: "%P se baigne", rel: "opposition" },
];

// ════════════════════════════════════════════════════════════════════════
// APPRENDRE PAR L'ÉCRIT : de courts textes documentaires. L'idée principale,
// trois détails AUTONOMES (sans pronom qui renvoie ailleurs : on peut les
// placer n'importe où), un résumé reformulé, un bon titre et un titre trop étroit.
// `cles` : les mots du sujet, qui reviennent exprès d'une phrase à l'autre.
// ════════════════════════════════════════════════════════════════════════

export type Theme = {
  titre: string;
  etroit: string;
  idee: string;
  details: readonly [string, string, string];
  resume: string;
  cles: readonly string[];
};

export const THEMES: readonly Theme[] = [
  {
    titre: "Le travail des abeilles",
    etroit: "La cire des abeilles",
    idee: "Dans une ruche, chaque abeille a un travail précis.",
    details: ["Les butineuses récoltent le nectar des fleurs.", "Les nourrices s'occupent des larves.", "Les gardiennes surveillent l'entrée de la ruche."],
    resume: "Les abeilles d'une ruche se partagent les tâches.",
    cles: ["abeille", "abeilles", "ruche"],
  },
  {
    titre: "Le cycle de l'eau",
    etroit: "La forme des nuages",
    idee: "L'eau de la Terre circule sans cesse entre la mer, le ciel et le sol.",
    details: ["Le soleil chauffe la mer et une partie de l'eau s'évapore.", "La vapeur forme des nuages en refroidissant.", "La pluie retombe et rejoint les rivières."],
    resume: "L'eau voyage en boucle entre la mer, les nuages et la terre.",
    cles: ["eau", "mer"],
  },
  {
    titre: "Les volcans",
    etroit: "La couleur de la lave",
    idee: "Un volcan est une montagne qui laisse sortir la roche fondue des profondeurs.",
    details: ["Sous la croûte terrestre, le magma est très chaud.", "Lors d'une éruption, la lave coule sur les pentes.", "Les cendres peuvent monter à plusieurs kilomètres."],
    resume: "Un volcan rejette sous forme de lave la roche fondue du sous-sol.",
    cles: ["volcan", "lave", "roche"],
  },
  {
    titre: "La migration des oiseaux",
    etroit: "Le vol des cigognes",
    idee: "Chaque automne, de nombreux oiseaux partent vers des pays plus chauds.",
    details: ["Les hirondelles traversent la Méditerranée.", "Les grues volent en formant un grand V.", "Les cigognes passent l'hiver en Afrique."],
    resume: "Beaucoup d'oiseaux voyagent loin pour fuir le froid de l'hiver.",
    cles: ["oiseaux"],
  },
  {
    titre: "Les dents",
    etroit: "Les dents de lait",
    idee: "Nos dents n'ont pas toutes la même forme ni le même rôle.",
    details: ["Les incisives coupent les aliments.", "Les canines déchirent la viande.", "Les molaires écrasent la nourriture."],
    resume: "Chaque sorte de dent a sa forme et son travail pour manger.",
    cles: ["dents", "dent"],
  },
  {
    titre: "La vie des fourmis",
    etroit: "La reine des fourmis",
    idee: "Les fourmis vivent en colonies très organisées.",
    details: ["La reine pond des milliers d'œufs.", "Les ouvrières creusent des galeries dans la terre.", "Les soldats défendent la fourmilière."],
    resume: "Dans une fourmilière, chaque fourmi tient un rôle utile au groupe.",
    cles: ["fourmis", "fourmi", "fourmilière"],
  },
  {
    titre: "Le recyclage du verre",
    etroit: "La couleur des bouteilles",
    idee: "Le verre se recycle presque à l'infini.",
    details: ["Les bouteilles vides vont dans le conteneur à verre.", "À l'usine, le verre est broyé puis fondu.", "On fabrique ensuite de nouveaux pots et flacons."],
    resume: "Le verre jeté au bon endroit redevient de nouveaux objets en verre.",
    cles: ["verre"],
  },
  {
    titre: "Le sommeil",
    etroit: "Les rêves",
    idee: "Le sommeil est indispensable à notre santé.",
    details: ["Pendant la nuit, le corps répare ses muscles.", "Le cerveau range ce qu'on a appris dans la journée.", "Un enfant de onze ans a besoin de dix heures de repos."],
    resume: "Bien dormir aide le corps à se réparer et le cerveau à apprendre.",
    cles: ["sommeil"],
  },
  {
    titre: "Les saisons",
    etroit: "La neige en hiver",
    idee: "Les saisons changent parce que la Terre est penchée en tournant autour du Soleil.",
    details: ["En été, les rayons arrivent presque à la verticale.", "En hiver, la lumière arrive de biais et chauffe moins.", "Les journées raccourcissent quand l'automne approche."],
    resume: "L'inclinaison de la Terre explique le passage des saisons.",
    cles: ["saisons", "terre"],
  },
  {
    titre: "Les pyramides d'Égypte",
    etroit: "La taille des pierres",
    idee: "Les pyramides d'Égypte étaient les tombeaux des pharaons.",
    details: ["Des milliers d'ouvriers ont taillé d'énormes blocs.", "La chambre funéraire était cachée au cœur du monument.", "Des trésors accompagnaient le roi dans l'au-delà."],
    resume: "En Égypte, on bâtissait les pyramides pour enterrer les pharaons.",
    cles: ["pyramides", "pharaons"],
  },
  {
    titre: "Les dinosaures",
    etroit: "Les dents du tyrannosaure",
    idee: "Les dinosaures ont vécu sur Terre pendant des millions d'années.",
    details: ["Le diplodocus mangeait des plantes.", "Le tyrannosaure chassait d'autres reptiles.", "Une météorite a sans doute fait disparaître les dinosaures."],
    resume: "Les dinosaures ont longtemps peuplé la Terre avant de disparaître.",
    cles: ["dinosaures"],
  },
  {
    titre: "La photosynthèse",
    etroit: "Le vert des feuilles",
    idee: "Les plantes fabriquent leur nourriture grâce à la lumière.",
    details: ["Les racines puisent l'eau dans le sol.", "Les feuilles captent le gaz carbonique de l'air.", "En échange, la plante rejette de l'oxygène."],
    resume: "Avec la lumière, l'eau et l'air, une plante produit ce qui la nourrit.",
    cles: ["plante", "plantes", "lumière"],
  },
  {
    titre: "Les Jeux olympiques",
    etroit: "La flamme olympique",
    idee: "Les Jeux olympiques réunissent tous les quatre ans des sportifs du monde entier.",
    details: ["La première édition moderne a eu lieu à Athènes.", "Les anneaux du drapeau représentent les continents.", "Les champions reçoivent une médaille d'or."],
    resume: "Les Jeux olympiques sont une grande fête sportive mondiale.",
    cles: ["jeux", "olympiques"],
  },
  {
    titre: "Les marées",
    etroit: "Les coquillages de la plage",
    idee: "Deux fois par jour, la mer monte puis descend sur les côtes.",
    details: ["La Lune attire les océans vers elle.", "À marée basse, des rochers apparaissent sur l'estran.", "Les pêcheurs à pied consultent l'horaire des marées."],
    resume: "Attirée par la Lune, la mer monte et descend chaque jour.",
    cles: ["marée", "marées", "mer"],
  },
  {
    titre: "Le corps humain en mouvement",
    etroit: "Les os de la main",
    idee: "Pour bouger, notre corps fait travailler ensemble les os et les muscles.",
    details: ["Le squelette compte plus de deux cents os.", "Les muscles tirent sur les os en se contractant.", "Les articulations permettent de plier les bras et les jambes."],
    resume: "Os, muscles et articulations agissent ensemble pour nous faire bouger.",
    cles: ["os", "muscles"],
  },
  {
    titre: "Les forêts",
    etroit: "Les champignons",
    idee: "Les forêts sont indispensables à la vie sur Terre.",
    details: ["Les arbres produisent une grande partie de l'oxygène.", "Des milliers d'espèces animales s'abritent dans les bois.", "Les racines retiennent le sol lors des fortes pluies."],
    resume: "Les forêts nous donnent de l'air et protègent animaux et sols.",
    cles: ["forêts", "forêt", "arbres"],
  },
  {
    titre: "L'invention de l'écriture",
    etroit: "Les tablettes d'argile",
    idee: "L'écriture a été inventée il y a plus de cinq mille ans.",
    details: ["Les Sumériens gravaient des signes dans l'argile.", "Les Égyptiens utilisaient des hiéroglyphes.", "Plus tard, les Phéniciens ont créé un alphabet."],
    resume: "Plusieurs peuples anciens ont inventé des façons d'écrire.",
    cles: ["écriture"],
  },
  {
    titre: "Les requins",
    etroit: "Les dents du requin",
    idee: "Les requins sont des poissons très anciens et souvent mal connus.",
    details: ["La plupart des requins ne sont pas dangereux pour l'homme.", "Le requin-baleine se nourrit de plancton.", "Les grands prédateurs marins régulent la vie des océans."],
    resume: "Le requin est un poisson ancien, utile aux océans et rarement dangereux.",
    cles: ["requins", "requin"],
  },
  {
    titre: "Le chocolat",
    etroit: "Le chocolat blanc",
    idee: "Le chocolat est fabriqué à partir des graines du cacaoyer.",
    details: ["Les fèves de cacao sont récoltées dans les pays chauds.", "Les fèves sèchent au soleil avant d'être grillées.", "Le cacao broyé avec du sucre donne une pâte."],
    resume: "Pour obtenir du chocolat, on transforme les fèves du cacaoyer.",
    cles: ["chocolat", "cacaoyer", "fèves", "cacao"],
  },
  {
    titre: "Le système solaire",
    etroit: "Les anneaux de Saturne",
    idee: "Huit planètes tournent autour du Soleil.",
    details: ["Mercure est la plus proche de notre étoile.", "Jupiter est la plus grosse planète.", "Neptune met environ cent soixante-cinq ans à faire son tour."],
    resume: "Autour du Soleil gravitent huit planètes très différentes.",
    cles: ["planètes", "soleil"],
  },
  {
    titre: "Les castors",
    etroit: "La queue du castor",
    idee: "Les castors transforment les rivières en construisant des barrages.",
    details: ["Les dents du castor abattent des troncs.", "Branches et boue forment une digue solide.", "Derrière un barrage de castor, un étang se crée."],
    resume: "Le castor bâtit des barrages qui changent le cours de l'eau.",
    cles: ["castors", "castor", "barrages", "barrage"],
  },
  {
    titre: "Le vent",
    etroit: "Les girouettes",
    idee: "Le vent est de l'air qui se déplace.",
    details: ["L'air chaud monte et l'air froid prend sa place.", "Les éoliennes transforment la force du vent en électricité.", "Les marins se servent du vent depuis l'Antiquité."],
    resume: "Le vent est un mouvement de l'air que l'homme sait utiliser.",
    cles: ["vent", "air"],
  },
];

/** ⛔ Des thèmes VOISINS (l'eau et les plantes, l'Égypte et l'écriture…) :
 *  une phrase de l'un pourrait passer pour un détail de l'autre. Ils ne se
 *  prêtent jamais de leurres ; le correcteur le refuse. */
export const THEMES_VOISINS: readonly (readonly string[])[] = [
  ["Le cycle de l'eau", "La photosynthèse", "Les marées", "Le vent", "Les forêts", "Les castors"],
  ["Les pyramides d'Égypte", "L'invention de l'écriture"],
  ["Les saisons", "Le système solaire", "Les marées"],
  ["Le travail des abeilles", "La vie des fourmis"],
  ["Les forêts", "La photosynthèse", "Les castors"],
  ["Les dents", "Le corps humain en mouvement", "Le sommeil"],
  ["Les requins", "Les dinosaures", "Les marées"],
  ["Les volcans", "Les saisons"],
];

/** Catégories de reprises trop proches pour se servir de leurre (un marteau est aussi un « instrument »). */
export const CATEGORIES_VOISINES: readonly (readonly string[])[] = [
  ["outil", "instrument"],
  ["plante", "aliment"],
];

// ════════════════════════════════════════════════════════════════════════
// JUSTIFIER UN CHOIX : un choix, sa vraie raison (propre à ce choix), et des
// « non-arguments » qui ne justifient rien.
// ════════════════════════════════════════════════════════════════════════

export const CHOIX: readonly { choix: string; raison: string }[] = [
  { choix: "venir au collège à vélo", raison: "le vélo ne pollue pas et me fait faire du sport" },
  { choix: "lire un roman d'aventures", raison: "les rebondissements me donnent envie de tourner les pages" },
  { choix: "faire mes devoirs dès le retour de l'école", raison: "la leçon du jour est encore fraîche dans ma tête" },
  { choix: "adopter un chat plutôt qu'un chien", raison: "un chat supporte mieux de rester seul la journée" },
  { choix: "partir en vacances à la montagne", raison: "j'aime marcher sur les sentiers et voir les sommets" },
  { choix: "apprendre à jouer de la batterie", raison: "j'adore le rythme et je tape déjà sur tout" },
  { choix: "manger une pomme au goûter", raison: "un fruit donne de l'énergie sans trop de sucre" },
  { choix: "m'inscrire au club de théâtre", raison: "monter sur scène m'aiderait à être moins timide" },
  { choix: "visiter le musée des sciences", raison: "on peut y faire de vraies expériences" },
  { choix: "prendre des notes pendant le cours", raison: "écrire m'aide à retenir l'essentiel" },
  { choix: "faire un exposé sur les requins", raison: "ces poissons me fascinent depuis longtemps" },
  { choix: "planter des tomates au jardin", raison: "on pourra les manger cet été" },
  { choix: "relire ma rédaction avant de la rendre", raison: "je repère ainsi mes fautes d'accord" },
  { choix: "jouer au football à la récréation", raison: "on peut jouer à beaucoup en même temps" },
  { choix: "emprunter une bande dessinée", raison: "les images m'aident à suivre l'histoire" },
  { choix: "camper au bord du lac", raison: "on pourra se baigner et pêcher le matin" },
];
export const NON_ARGUMENTS: readonly string[] = [
  "c'est comme ça",
  "je l'ai décidé",
  "voilà, c'est tout",
  "tout le monde le sait",
  "je n'ai pas envie d'expliquer",
  "c'est évident",
];

// ════════════════════════════════════════════════════════════════════════
// DONNER SON AVIS : un sujet, des arguments POUR, des arguments CONTRE, des faits neutres.
// ════════════════════════════════════════════════════════════════════════

export const DEBATS: readonly { avis: string; contraire: string; pour: readonly string[]; contre: readonly string[]; faits: readonly string[] }[] = [
  {
    avis: "les animaux de compagnie rendent heureux",
    contraire: "les animaux de compagnie donnent trop de travail",
    pour: ["un chien ou un chat tient compagnie quand on est seul", "jouer avec un animal fait oublier les soucis"],
    contre: ["il faut nourrir et sortir un chien tous les jours", "un animal coûte cher en nourriture et en soins"],
    faits: ["Un chat dort environ quinze heures par jour.", "Le chien descend du loup."],
  },
  {
    avis: "la récréation devrait durer plus longtemps",
    contraire: "la récréation est assez longue",
    pour: ["bouger aide à mieux se concentrer ensuite", "on a besoin de temps pour discuter avec ses amis"],
    contre: ["une récréation plus longue raccourcirait les cours", "on se refroidit dans la cour en hiver"],
    faits: ["La récréation dure quinze minutes dans notre collège.", "La sonnerie retentit à dix heures."],
  },
  {
    avis: "les écrans devraient être éteints au dîner",
    contraire: "on peut regarder la télévision au dîner",
    pour: ["sans écran, on se parle davantage en famille", "on fait plus attention à ce qu'on mange"],
    contre: ["le journal télévisé permet de suivre l'actualité ensemble", "certaines émissions font rire toute la famille"],
    faits: ["Le dîner commence à dix-neuf heures chez nous.", "La télévision est dans le salon."],
  },
  {
    avis: "il faut lire tous les jours",
    contraire: "lire tous les jours n'est pas nécessaire",
    pour: ["la lecture enrichit le vocabulaire", "un bon livre fait voyager sans bouger"],
    contre: ["on peut aussi apprendre en regardant des documentaires", "on manque parfois de temps le soir"],
    faits: ["La bibliothèque du quartier ouvre le mercredi.", "Ce roman compte deux cents pages."],
  },
  {
    avis: "l'uniforme scolaire est une bonne idée",
    contraire: "l'uniforme scolaire est une mauvaise idée",
    pour: ["avec un uniforme, personne ne se moque des vêtements", "on gagne du temps le matin pour s'habiller"],
    contre: ["on ne peut plus montrer ses goûts avec ses habits", "acheter un uniforme coûte cher aux familles"],
    faits: ["Certains pays imposent l'uniforme dans les écoles.", "Notre collège n'a pas d'uniforme."],
  },
  {
    avis: "les sorties scolaires sont utiles",
    contraire: "les sorties scolaires font perdre du temps",
    pour: ["on retient mieux ce qu'on a vu de ses yeux", "une visite rapproche les élèves de la classe"],
    contre: ["le trajet en car dure parfois plusieurs heures", "on rattrape ensuite les cours manqués"],
    faits: ["La classe visite le château jeudi.", "Le car part à huit heures."],
  },
  {
    avis: "faire du sport chaque semaine est important",
    contraire: "le sport chaque semaine n'est pas indispensable",
    pour: ["le sport renforce le cœur et les muscles", "on se fait des amis dans une équipe"],
    contre: ["certains préfèrent les activités calmes comme le dessin", "les entraînements prennent beaucoup de temps libre"],
    faits: ["Le gymnase ferme à vingt heures.", "Le club compte trente adhérents."],
  },
  {
    avis: "il faudrait un potager dans chaque collège",
    contraire: "un potager au collège est inutile",
    pour: ["les élèves apprendraient d'où viennent les légumes", "jardiner dehors apaise après les cours"],
    contre: ["personne n'arrose les plantes pendant les vacances", "il faut un terrain que beaucoup de collèges n'ont pas"],
    faits: ["Les tomates poussent en été.", "Le collège a une cour goudronnée."],
  },
];

// ════════════════════════════════════════════════════════════════════════
// LES NORMES : l'accord du verbe avec son sujet (l'erreur qu'on n'entend pas).
// ════════════════════════════════════════════════════════════════════════

export const ACCORDS: readonly { sg: string; pl: string; vsg: string; vpl: string; suite: string }[] = [
  { sg: "Le chien", pl: "Les chiens", vsg: "aboie", vpl: "aboient", suite: "devant la porte" },
  { sg: "L'enfant", pl: "Les enfants", vsg: "joue", vpl: "jouent", suite: "dans la cour" },
  { sg: "La fleur", pl: "Les fleurs", vsg: "pousse", vpl: "poussent", suite: "au bord du chemin" },
  { sg: "Mon voisin", pl: "Mes voisins", vsg: "arrose", vpl: "arrosent", suite: "le potager le soir" },
  { sg: "L'élève", pl: "Les élèves", vsg: "écoute", vpl: "écoutent", suite: "la consigne en silence" },
  { sg: "Le dauphin", pl: "Les dauphins", vsg: "saute", vpl: "sautent", suite: "près du bateau" },
  { sg: "La cloche", pl: "Les cloches", vsg: "sonne", vpl: "sonnent", suite: "à midi pile" },
  { sg: "Le coureur", pl: "Les coureurs", vsg: "franchit", vpl: "franchissent", suite: "la ligne d'arrivée" },
  { sg: "La feuille", pl: "Les feuilles", vsg: "tombe", vpl: "tombent", suite: "sur la route mouillée" },
  { sg: "Le musicien", pl: "Les musiciens", vsg: "accorde", vpl: "accordent", suite: "le vieux piano" },
  { sg: "L'oiseau", pl: "Les oiseaux", vsg: "chante", vpl: "chantent", suite: "dans le cerisier" },
  { sg: "Ma cousine", pl: "Mes cousines", vsg: "dessine", vpl: "dessinent", suite: "un dragon rouge" },
  { sg: "Le cuisinier", pl: "Les cuisiniers", vsg: "goûte", vpl: "goûtent", suite: "la sauce tomate" },
  { sg: "La vague", pl: "Les vagues", vsg: "frappe", vpl: "frappent", suite: "les rochers du port" },
  { sg: "Le joueur", pl: "Les joueurs", vsg: "salue", vpl: "saluent", suite: "le public debout" },
  { sg: "L'abeille", pl: "Les abeilles", vsg: "butine", vpl: "butinent", suite: "les fleurs du verger" },
];
