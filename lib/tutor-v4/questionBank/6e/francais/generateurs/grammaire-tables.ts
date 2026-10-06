// TABLES DES GÉNÉRATEURS DE GRAMMAIRE DE 6e (05/10/2026). Voir grammaire.ts.
// Chaque constituant est TYPÉ (sujet, verbe, COD, COI, CC de lieu, de temps,
// de manière, de cause, épithète, complément du nom, attribut) : la fonction
// demandée est connue par construction, et le correcteur la retrouve à part.

export type Genre = "m" | "f";
export type Nombre = "s" | "p";
export type Prenom = { p: string; g: Genre };
export type GN = { t: string; g: Genre; n: Nombre };
/** Une action à COD : verbe au présent (3e sg, 3e pl), participe passé, COD. */
export type Action = { v: string; vp: string; pp: string; cod: GN; suite?: string };
export type Scene = { nom: string; lieux: string[]; actions: Action[]; causes: string[] };

export const NB = " ";

export const PRENOMS: Prenom[] = [
  { p: "Léa", g: "f" }, { p: "Inès", g: "f" }, { p: "Noah", g: "m" }, { p: "Maël", g: "m" },
  { p: "Yanis", g: "m" }, { p: "Chloé", g: "f" }, { p: "Kenji", g: "m" }, { p: "Aïcha", g: "f" },
  { p: "Lucas", g: "m" }, { p: "Zoé", g: "f" }, { p: "Hugo", g: "m" }, { p: "Sofia", g: "f" },
  { p: "Malo", g: "m" }, { p: "Nora", g: "f" }, { p: "Adam", g: "m" }, { p: "Jade", g: "f" },
  { p: "Ibrahim", g: "m" }, { p: "Manon", g: "f" }, { p: "Tiago", g: "m" }, { p: "Lina", g: "f" },
  { p: "Mathis", g: "m" }, { p: "Emma", g: "f" }, { p: "Rayan", g: "m" }, { p: "Louise", g: "f" },
  { p: "Nathan", g: "m" }, { p: "Yasmine", g: "f" }, { p: "Théo", g: "m" }, { p: "Anaïs", g: "f" },
  { p: "Mamadou", g: "m" }, { p: "Mei", g: "f" }, { p: "Gabriel", g: "m" }, { p: "Lucie", g: "f" },
];

const gn = (t: string, g: Genre, n: Nombre = "s"): GN => ({ t, g, n });
const a = (v: string, vp: string, pp: string, cod: GN, suite?: string): Action => ({ v, vp, pp, cod, suite });

export const SCENES: Scene[] = [
  {
    nom: "école",
    lieux: ["dans la classe", "au CDI", "dans la cour"],
    causes: ["par habitude", "à cause de la pluie"],
    actions: [
      a("range", "rangent", "rangé", gn("sa trousse", "f"), "pose sur la table"),
      a("copie", "copient", "copié", gn("la leçon", "f"), "relit deux fois"),
      a("prépare", "préparent", "préparé", gn("un exposé", "m"), "présente à la classe"),
      a("termine", "terminent", "terminé", gn("ses exercices", "m", "p"), "montre au professeur"),
      a("colle", "collent", "collé", gn("une étiquette", "f"), "décore avec soin"),
    ],
  },
  {
    nom: "cuisine",
    lieux: ["dans la cuisine", "chez sa grand-mère"],
    causes: ["par gourmandise", "par habitude"],
    actions: [
      a("prépare", "préparent", "préparé", gn("une tarte aux pommes", "f"), "met au four"),
      a("coupe", "coupent", "coupé", gn("des carottes", "f", "p"), "verse dans la soupe"),
      a("mélange", "mélangent", "mélangé", gn("la pâte", "f"), "verse dans un moule"),
      a("goûte", "goûtent", "goûté", gn("la soupe", "f"), "trouve trop salée"),
      a("lave", "lavent", "lavé", gn("les verres", "m", "p"), "range dans le placard"),
      a("pétrit", "pétrissent", "pétri", gn("le pain", "m"), "laisse lever"),
    ],
  },
  {
    nom: "football",
    lieux: ["sur le terrain", "au stade", "dans le gymnase"],
    causes: ["par plaisir", "par habitude"],
    actions: [
      a("lance", "lancent", "lancé", gn("le ballon", "m"), "passe à son équipe"),
      a("porte", "portent", "porté", gn("un maillot bleu", "m"), "lave après le match"),
      a("lace", "lacent", "lacé", gn("ses chaussures", "f", "p"), "serre bien fort"),
      a("ramasse", "ramassent", "ramassé", gn("les plots", "m", "p"), "range dans un sac"),
    ],
  },
  {
    nom: "mer",
    lieux: ["sur la plage", "à la piscine", "au bord de la mer"],
    causes: ["par plaisir", "par habitude"],
    actions: [
      a("ramasse", "ramassent", "ramassé", gn("des coquillages", "m", "p"), "garde dans un seau"),
      a("construit", "construisent", "construit", gn("un château de sable", "m"), "décore avec des algues"),
      a("plie", "plient", "plié", gn("sa serviette", "f"), "range dans son sac"),
      a("regarde", "regardent", "regardé", gn("les vagues", "f", "p"), "compte une à une"),
      a("nettoie", "nettoient", "nettoyé", gn("son masque", "m"), "fait sécher au soleil"),
    ],
  },
  {
    nom: "montagne",
    lieux: ["en montagne", "sur le sentier", "au sommet"],
    causes: ["par curiosité", "par prudence"],
    actions: [
      a("porte", "portent", "porté", gn("un gros sac", "m"), "pose près du refuge"),
      a("observe", "observent", "observé", gn("une marmotte", "f"), "photographie de loin"),
      a("remplit", "remplissent", "rempli", gn("sa gourde", "f"), "ferme bien"),
      a("déplie", "déplient", "déplié", gn("la carte", "f"), "tient à deux mains"),
      a("photographie", "photographient", "photographié", gn("les sommets", "m", "p"), "montre à ses parents"),
    ],
  },
  {
    nom: "musique",
    lieux: ["au conservatoire", "dans sa chambre", "sur la scène"],
    causes: ["par plaisir", "par habitude"],
    actions: [
      a("accorde", "accordent", "accordé", gn("sa guitare", "f"), "pose sur ses genoux"),
      a("répète", "répètent", "répété", gn("une chanson", "f"), "chante sans erreur"),
      a("range", "rangent", "rangé", gn("ses partitions", "f", "p"), "classe par ordre"),
      a("joue", "jouent", "joué", gn("un morceau", "m"), "connaît par cœur"),
    ],
  },
  {
    nom: "jeux",
    lieux: ["dans le salon", "chez son cousin"],
    causes: ["par plaisir", "à cause de la pluie"],
    actions: [
      a("mélange", "mélangent", "mélangé", gn("les cartes", "f", "p"), "distribue aux joueurs"),
      a("termine", "terminent", "terminé", gn("le puzzle", "m"), "colle sur un carton"),
      a("lance", "lancent", "lancé", gn("les dés", "m", "p"), "ramasse aussitôt"),
      a("installe", "installent", "installé", gn("le jeu de société", "m"), "présente aux autres"),
    ],
  },
  {
    nom: "sciences",
    lieux: ["au laboratoire", "dans la salle de sciences"],
    causes: ["par curiosité", "par prudence"],
    actions: [
      a("observe", "observent", "observé", gn("une fourmi", "f"), "dessine dans son cahier"),
      a("mesure", "mesurent", "mesuré", gn("la température", "f"), "note au tableau"),
      a("remplit", "remplissent", "rempli", gn("un tube", "m"), "bouche avec soin"),
      a("note", "notent", "noté", gn("les résultats", "m", "p"), "compare avec son voisin"),
    ],
  },
  {
    nom: "animaux",
    lieux: ["dans le jardin", "dans le salon", "devant la maison"],
    causes: ["par habitude", "par plaisir"],
    actions: [
      a("nourrit", "nourrissent", "nourri", gn("son lapin", "m"), "caresse doucement"),
      a("brosse", "brossent", "brossé", gn("le chien", "m"), "promène ensuite"),
      a("caresse", "caressent", "caressé", gn("la chatte", "f"), "prend dans ses bras"),
      a("nettoie", "nettoient", "nettoyé", gn("la cage", "f"), "remplit de paille"),
      a("promène", "promènent", "promené", gn("les chiots", "m", "p"), "ramène avant la nuit"),
    ],
  },
  {
    nom: "voyage",
    lieux: ["à la gare", "dans le train", "à l'aéroport"],
    causes: ["par prudence", "par habitude"],
    actions: [
      a("fait", "font", "fait", gn("sa valise", "f"), "ferme avec peine"),
      a("montre", "montrent", "montré", gn("son billet", "m"), "range dans sa poche"),
      a("cherche", "cherchent", "cherché", gn("sa place", "f"), "trouve enfin"),
      a("tire", "tirent", "tiré", gn("une grosse valise", "f"), "pose près du siège"),
    ],
  },
  {
    nom: "forêt",
    lieux: ["dans la forêt", "au bord de la rivière"],
    causes: ["par curiosité", "par plaisir"],
    actions: [
      a("ramasse", "ramassent", "ramassé", gn("des châtaignes", "f", "p"), "met dans un panier"),
      a("observe", "observent", "observé", gn("un écureuil", "m"), "suit des yeux"),
      a("cueille", "cueillent", "cueilli", gn("des mûres", "f", "p"), "mange aussitôt"),
      a("suit", "suivent", "suivi", gn("le sentier", "m"), "connaît par cœur"),
    ],
  },
  {
    nom: "bibliothèque",
    lieux: ["à la bibliothèque", "à la médiathèque"],
    causes: ["par curiosité", "par plaisir"],
    actions: [
      a("emprunte", "empruntent", "emprunté", gn("une bande dessinée", "f"), "lit en une soirée"),
      a("rend", "rendent", "rendu", gn("son livre", "m"), "pose sur le comptoir"),
      a("choisit", "choisissent", "choisi", gn("un roman", "m"), "glisse dans son sac"),
      a("feuillette", "feuillettent", "feuilleté", gn("les albums", "m", "p"), "remet en place"),
    ],
  },
  {
    nom: "potager",
    lieux: ["dans le potager", "dans le jardin"],
    causes: ["par habitude", "par plaisir"],
    actions: [
      a("arrose", "arrosent", "arrosé", gn("les tomates", "f", "p"), "surveille chaque jour"),
      a("plante", "plantent", "planté", gn("des radis", "m", "p"), "surveille chaque soir"),
      a("cueille", "cueillent", "cueilli", gn("une salade", "f"), "lave à l'eau froide"),
      a("ramasse", "ramassent", "ramassé", gn("les feuilles mortes", "f", "p"), "met dans une brouette"),
    ],
  },
  {
    nom: "vélo",
    lieux: ["dans la rue", "au parc", "sur la piste cyclable"],
    causes: ["par prudence", "par habitude"],
    actions: [
      a("répare", "réparent", "réparé", gn("son vélo", "m"), "range dans le garage"),
      a("gonfle", "gonflent", "gonflé", gn("les pneus", "m", "p"), "vérifie ensuite"),
      a("attache", "attachent", "attaché", gn("son casque", "m"), "serre sous le menton"),
      a("pousse", "poussent", "poussé", gn("sa trottinette", "f"), "laisse devant la porte"),
    ],
  },
  {
    nom: "dessin",
    lieux: ["dans l'atelier", "dans sa chambre"],
    causes: ["par plaisir", "à cause de la pluie"],
    actions: [
      a("dessine", "dessinent", "dessiné", gn("un dragon", "m"), "colorie en vert"),
      a("peint", "peignent", "peint", gn("un bateau", "m"), "suspend au mur"),
      a("découpe", "découpent", "découpé", gn("une étoile", "f"), "colle sur la porte"),
      a("colorie", "colorient", "colorié", gn("la carte", "f"), "montre à la classe"),
    ],
  },
  {
    nom: "lagon",
    lieux: ["au bord du lagon", "au marché de Saint-Pierre"],
    causes: ["par curiosité", "par gourmandise"],
    actions: [
      a("achète", "achètent", "acheté", gn("des letchis", "m", "p"), "partage avec sa sœur"),
      a("goûte", "goûtent", "goûté", gn("un samoussa", "m"), "trouve délicieux"),
      a("observe", "observent", "observé", gn("les poissons", "m", "p"), "compte un à un"),
    ],
  },
  {
    nom: "fête",
    lieux: ["dans le salon", "chez ses cousins"],
    causes: ["par plaisir", "par habitude"],
    actions: [
      a("décore", "décorent", "décoré", gn("le gâteau", "m"), "pose au milieu de la table"),
      a("gonfle", "gonflent", "gonflé", gn("des ballons", "m", "p"), "suspend au plafond"),
      a("emballe", "emballent", "emballé", gn("un cadeau", "m"), "cache sous la table"),
      a("allume", "allument", "allumé", gn("les bougies", "f", "p"), "souffle d'un coup"),
    ],
  },
];

export const CC_TEMPS = [
  "ce matin", "chaque samedi", "après l'école", "le mercredi", "pendant les vacances", "à midi",
  "ce soir", "tous les jours", "avant le dîner", "le dimanche", "en hiver", "au printemps",
];
export const CC_MANIERE = [
  "avec soin", "en silence", "lentement", "calmement", "avec patience", "sans bruit",
  "rapidement", "avec attention", "doucement", "en chantant",
];
export const CC_LIEUX = [...new Set(SCENES.flatMap((s) => s.lieux))];
export const CC_CAUSES = [...new Set(SCENES.flatMap((s) => s.causes))];

/** Verbes à complément d'objet INDIRECT, et leurs compléments (personnes : pronom lui / leur). */
export type VerbeIndirect = { v: string; vp: string; pp: string; coi: GN[]; personnes: boolean };
const PERSONNES: GN[] = [
  gn("à sa sœur", "f"), gn("à son grand-père", "m"), gn("à sa voisine", "f"), gn("à ses cousins", "m", "p"),
  gn("à son entraîneur", "m"), gn("à sa professeure", "f"), gn("au boulanger", "m"), gn("à ses parents", "m", "p"),
  gn("à sa grand-mère", "f"), gn("à son meilleur ami", "m"), gn("aux nouvelles élèves", "f", "p"),
];
export const VERBES_INDIRECTS: VerbeIndirect[] = [
  { v: "parle", vp: "parlent", pp: "parlé", coi: PERSONNES, personnes: true },
  { v: "téléphone", vp: "téléphonent", pp: "téléphoné", coi: PERSONNES, personnes: true },
  { v: "sourit", vp: "sourient", pp: "souri", coi: PERSONNES, personnes: true },
  { v: "répond", vp: "répondent", pp: "répondu", coi: PERSONNES, personnes: true },
  { v: "écrit", vp: "écrivent", pp: "écrit", coi: PERSONNES, personnes: true },
  { v: "obéit", vp: "obéissent", pp: "obéi", coi: [gn("à son entraîneur", "m"), gn("à ses parents", "m", "p"), gn("au maître-nageur", "m"), gn("à sa professeure", "f")], personnes: true },
  { v: "ressemble", vp: "ressemblent", pp: "ressemblé", coi: [gn("à son père", "m"), gn("à sa mère", "f"), gn("à son grand frère", "m"), gn("à sa tante", "f")], personnes: true },
  { v: "pense", vp: "pensent", pp: "pensé", coi: [gn("à son match", "m"), gn("aux vacances", "f", "p"), gn("à son anniversaire", "m"), gn("à la sortie au zoo", "f")], personnes: false },
  { v: "rêve", vp: "rêvent", pp: "rêvé", coi: [gn("d'un voyage en Islande", "m"), gn("d'un chiot", "m"), gn("de la mer", "f"), gn("d'une cabane dans les arbres", "f")], personnes: false },
  { v: "profite", vp: "profitent", pp: "profité", coi: [gn("du soleil", "m"), gn("des vacances", "f", "p"), gn("de la piscine", "f"), gn("du beau temps", "m")], personnes: false },
];

/** Adjectifs : [masc. sg, fém. sg, masc. pl, fém. pl]. */
export type Adjectif = [string, string, string, string];
export const ADJ_ATTRIBUTS: Adjectif[] = [
  ["content", "contente", "contents", "contentes"], ["fatigué", "fatiguée", "fatigués", "fatiguées"],
  ["heureux", "heureuse", "heureux", "heureuses"], ["calme", "calme", "calmes", "calmes"],
  ["sérieux", "sérieuse", "sérieux", "sérieuses"], ["curieux", "curieuse", "curieux", "curieuses"],
  ["inquiet", "inquiète", "inquiets", "inquiètes"], ["fier", "fière", "fiers", "fières"],
  ["prêt", "prête", "prêts", "prêtes"], ["timide", "timide", "timides", "timides"],
  ["joyeux", "joyeuse", "joyeux", "joyeuses"], ["nerveux", "nerveuse", "nerveux", "nerveuses"],
  ["attentif", "attentive", "attentifs", "attentives"], ["impatient", "impatiente", "impatients", "impatientes"],
  ["ravi", "ravie", "ravis", "ravies"], ["surpris", "surprise", "surpris", "surprises"],
  ["déçu", "déçue", "déçus", "déçues"], ["concentré", "concentrée", "concentrés", "concentrées"],
];
/** Verbes d'état : [3e sg, 3e pl]. */
export const VERBES_ETAT: [string, string][] = [["est", "sont"], ["semble", "semblent"], ["devient", "deviennent"], ["reste", "restent"]];
/** Groupes nominaux attributs [masculin, féminin] — et les verbes d'action qui en font un COD. */
export const GN_ATTRIBUTS: [string, string][] = [
  ["un bon gardien", "une bonne gardienne"], ["le capitaine de l'équipe", "la capitaine de l'équipe"],
  ["un excellent cuisinier", "une excellente cuisinière"], ["un grand champion", "une grande championne"],
  ["un vrai musicien", "une vraie musicienne"], ["un lecteur passionné", "une lectrice passionnée"],
  ["le meilleur nageur du club", "la meilleure nageuse du club"],
];
export const VERBES_PERSONNE_COD: string[] = ["admire", "applaudit", "rencontre", "encourage", "attend", "photographie"];

// ── La phrase complexe : propositions qui vont ensemble ──────────────────────
// {P} = un prénom ; {il} = il ou elle selon le prénom ; {e} = « e » au féminin.
/** [effet, cause] : « Léa prend son parapluie parce qu'il pleut ». */
export const PAIRES_CAUSE: [string, string][] = [
  ["{P} prend son parapluie", "il pleut"], ["{P} met un pull", "il fait froid"],
  ["{P} reste à la maison", "{il} a de la fièvre"], ["{P} court vers l'arrêt", "le bus arrive"],
  ["{P} allume la lampe", "la nuit tombe"], ["{P} boit un grand verre d'eau", "{il} a soif"],
  ["{P} se couche tôt", "{il} est fatigué{e}"], ["{P} révise sa leçon", "{il} a un contrôle demain"],
  ["{P} sourit", "{il} a gagné le match"], ["{P} ferme la fenêtre", "le vent souffle fort"],
  ["{P} mange une pomme", "{il} a faim"], ["{P} enfile ses bottes", "le chemin est boueux"],
  ["{P} chuchote", "son petit frère dort"], ["{P} met de la crème solaire", "le soleil brûle"],
  ["{P} prend une photo", "le ciel est magnifique"],
];
/** [d'abord, ensuite] : « Quand la cloche sonne, les élèves sortent ». */
export const PAIRES_TEMPS: [string, string][] = [
  ["la cloche sonne", "les élèves sortent"], ["{P} rentre de l'école", "{il} goûte"],
  ["l'arbitre siffle", "le match commence"], ["le soleil se lève", "les oiseaux chantent"],
  ["{P} ouvre le portail", "le chien entre"], ["le train arrive", "les voyageurs descendent"],
  ["{P} finit ses devoirs", "{il} joue dehors"], ["la pluie s'arrête", "{P} sort son vélo"],
  ["le film commence", "la salle devient silencieuse"], ["{P} lance la balle", "le chien court"],
  ["l'eau bout", "{P} verse les pâtes"], ["la marée descend", "{P} ramasse des coquillages"],
];
/** [a, b, « alors que » possible] : « Léa aime la mer, mais son frère préfère la montagne ». */
export const PAIRES_OPPOSITION: [string, string, boolean][] = [
  ["{P} aime la mer", "son frère préfère la montagne", true], ["{P} court vite", "{il} perd la course", false],
  ["le ciel est gris", "il ne pleut pas", false], ["{P} cherche ses clés", "{il} ne les trouve pas", false],
  ["{P} a peur du noir", "{il} dort sans lumière", false], ["{P} joue du piano", "sa sœur joue du violon", true],
  ["{P} parle anglais", "son ami parle espagnol", true], ["le gâteau est beau", "il n'est pas très bon", false],
];
/** Trois actions qui se suivent (trois propositions). */
export const SUITES_TROIS: [string, string, string][] = [
  ["{P} entre dans la classe", "{il} pose son sac", "{il} sort ses cahiers"],
  ["{P} ouvre le frigo", "{il} prend du lait", "{il} remplit son bol"],
  ["le gardien plonge", "le ballon touche le poteau", "le public crie"],
  ["{P} arrive au parc", "{il} attache son vélo", "{il} rejoint ses amis"],
  ["le vent se lève", "les nuages arrivent", "la pluie commence"],
  ["{P} prépare la pâte", "{il} chauffe la poêle", "{il} fait des crêpes"],
];
/** Une seule proposition, avec un verbe à l'infinitif (piège : il ne compte pas). */
export const SIMPLES_INFINITIF = [
  "{P} aime lire des bandes dessinées", "{P} veut construire une cabane", "{P} apprend à nager",
  "{P} commence à jouer de la guitare", "{P} adore cuisiner des crêpes", "{P} va visiter le musée",
];
/** Les verbes CONJUGUÉS de ces phrases, écrits à la main : le correcteur les recompte. */
export const VERBES_CONJUGUES_COMPLEXE = new Set([
  "prend", "pleut", "met", "fait", "reste", "a", "court", "arrive", "allume", "tombe", "boit", "couche", "est",
  "révise", "sourit", "ferme", "souffle", "mange", "enfile", "chuchote", "dort", "brûle", "sonne", "sortent",
  "rentre", "goûte", "siffle", "commence", "lève", "chantent", "ouvre", "entre", "descendent", "finit", "joue",
  "arrête", "sort", "devient", "lance", "bout", "verse", "descend", "ramasse", "aime", "préfère", "perd",
  "cherche", "trouve", "parle", "pose", "remplit", "plonge", "touche", "crie", "attache", "rejoint", "arrivent",
  "prépare", "chauffe", "veut", "apprend", "adore", "va",
]);

// ── Le groupe nominal : noms, épithètes, compléments du nom ──────────────────
/** Adjectifs épithètes [m. sg, f. sg, m. pl, f. pl]. Les premiers se placent AVANT le nom. */
export const EPITHETES: Record<string, Adjectif> = {
  petit: ["petit", "petite", "petits", "petites"], grand: ["grand", "grande", "grands", "grandes"],
  gros: ["gros", "grosse", "gros", "grosses"], joli: ["joli", "jolie", "jolis", "jolies"],
  vieux: ["vieux", "vieille", "vieux", "vieilles"], nouveau: ["nouveau", "nouvelle", "nouveaux", "nouvelles"],
  rouge: ["rouge", "rouge", "rouges", "rouges"], bleu: ["bleu", "bleue", "bleus", "bleues"],
  vert: ["vert", "verte", "verts", "vertes"], noir: ["noir", "noire", "noirs", "noires"],
  blanc: ["blanc", "blanche", "blancs", "blanches"], lourd: ["lourd", "lourde", "lourds", "lourdes"],
  léger: ["léger", "légère", "légers", "légères"], rapide: ["rapide", "rapide", "rapides", "rapides"],
  délicieux: ["délicieux", "délicieuse", "délicieux", "délicieuses"], ancien: ["ancien", "ancienne", "anciens", "anciennes"],
  rond: ["rond", "ronde", "ronds", "rondes"], énorme: ["énorme", "énorme", "énormes", "énormes"],
};
export const ANTEPOSES = new Set(["petit", "grand", "gros", "joli", "vieux", "nouveau"]);
/** Noms (commencent tous par une consonne) : épithètes possibles et compléments du nom de chose. */
export type Nom = { s: string; p: string; g: Genre; adj: string[]; cn: string[] };
export const NOMS: Nom[] = [
  { s: "vélo", p: "vélos", g: "m", adj: ["petit", "nouveau", "vieux", "rouge", "bleu", "noir", "rapide", "léger"], cn: ["de course"] },
  { s: "maison", p: "maisons", g: "f", adj: ["petit", "grand", "vieux", "joli", "blanc", "ancien"], cn: ["en bois", "de vacances"] },
  { s: "bateau", p: "bateaux", g: "m", adj: ["petit", "grand", "vieux", "blanc", "rouge", "rapide"], cn: ["en bois", "de pêche"] },
  { s: "chien", p: "chiens", g: "m", adj: ["petit", "gros", "vieux", "noir", "blanc", "rapide"], cn: ["de berger"] },
  { s: "robe", p: "robes", g: "f", adj: ["joli", "nouveau", "rouge", "bleu", "vert", "léger"], cn: ["en coton", "de soirée"] },
  { s: "cahier", p: "cahiers", g: "m", adj: ["petit", "gros", "nouveau", "rouge", "vert", "bleu"], cn: ["de brouillon", "de dessin"] },
  { s: "table", p: "tables", g: "f", adj: ["petit", "grand", "vieux", "rond", "lourd", "ancien"], cn: ["en bois", "de cuisine"] },
  { s: "sac", p: "sacs", g: "m", adj: ["petit", "gros", "nouveau", "noir", "lourd", "léger"], cn: ["de sport", "de plage", "en toile"] },
  { s: "bouteille", p: "bouteilles", g: "f", adj: ["petit", "grand", "vert", "lourd", "énorme"], cn: ["en verre", "de jus"] },
  { s: "gâteau", p: "gâteaux", g: "m", adj: ["petit", "gros", "énorme", "délicieux", "rond"], cn: ["au chocolat", "d'anniversaire"] },
  { s: "tente", p: "tentes", g: "f", adj: ["petit", "grand", "nouveau", "vert", "bleu", "léger"], cn: ["de camping"] },
  { s: "panier", p: "paniers", g: "m", adj: ["petit", "gros", "vieux", "lourd", "rond"], cn: ["en osier", "de fruits"] },
  { s: "valise", p: "valises", g: "f", adj: ["petit", "grand", "vieux", "nouveau", "rouge", "noir", "lourd"], cn: ["en cuir", "de voyage"] },
  { s: "tortue", p: "tortues", g: "f", adj: ["petit", "vieux", "énorme", "vert"], cn: ["de mer"] },
  { s: "lampe", p: "lampes", g: "f", adj: ["petit", "vieux", "nouveau", "bleu", "blanc"], cn: ["de poche", "de chevet"] },
  { s: "ballon", p: "ballons", g: "m", adj: ["petit", "gros", "nouveau", "rouge", "blanc", "léger"], cn: ["de football", "de plage"] },
  { s: "boîte", p: "boîtes", g: "f", adj: ["petit", "grand", "vieux", "rond", "rouge", "lourd"], cn: ["en carton", "de crayons"] },
  { s: "manteau", p: "manteaux", g: "m", adj: ["gros", "nouveau", "vieux", "noir", "bleu", "léger"], cn: ["en laine", "d'hiver"] },
  { s: "chapeau", p: "chapeaux", g: "m", adj: ["petit", "grand", "vieux", "noir", "blanc", "rond"], cn: ["de paille"] },
  { s: "tarte", p: "tartes", g: "f", adj: ["petit", "grand", "délicieux", "énorme"], cn: ["aux pommes", "aux fraises"] },
];
