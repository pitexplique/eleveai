// lib/tutor-v4/questionBank/ce1/francais/vocabulaire.bank.ts
//
// Le vocabulaire du CE1, écrit à la main. Treize micro-compétences : la plus
// grosse notion de la classe, et celle qui sert partout ailleurs.
//
// CE QU'ELLE REMPLACE : six énoncés pour treize micro-compétences. Le
// générateur commun aux trois classes ne connaissait que deux exercices — un
// intrus dans une famille de mots, et un synonyme parmi trois. « Préfixe »,
// « suffixe », « niveaux de langue », « termes génériques », « sens propre et
// figuré » et « dictionnaire » recevaient l'un ou l'autre au hasard.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours élémentaire première année) :
//   — cinq corpus de vocabulaire par période ;
//   — « Identifier des relations entre les mots : familles, synonymes,
//     antonymes, termes génériques et spécifiques » ;
//   — « Comprendre la formation des mots : préfixes et suffixes » ;
//   — « Distinguer les niveaux de langue : familier, courant, soutenu » ;
//   — « Comprendre qu'un mot peut avoir plusieurs sens, et distinguer le sens
//     propre du sens figuré » ;
//   — « Consulter un article de dictionnaire ».
//
// ⛔ Ce qui n'est PAS au CE1 : la GRADATION dans la synonymie (crainte > peur >
// épouvante) et la dérivation savante (port / portuaire / aéroport). Elles
// arrivent au CE2.
//
// LE PIÈGE DE LA NOTION, et le BO donne lui-même l'exemple : SOUFFLER SES
// BOUGIES et SOUFFLER UNE RÉPONSE. Le même mot, deux sens, et rien dans le mot
// lui-même ne dit lequel — c'est la phrase autour qui décide. Un enfant qui
// n'a qu'un sens par mot bute sur la moitié de ce qu'il lit.
//
// L'ÎLE EST DANS LES MOTS, pas en décor : le manguier porte les mangues comme
// le pommier porte les pommes, et c'est le suffixe -ier qui le dit. Une nasse,
// une varangue, une ravine sont des mots qu'un enfant d'ici entend dehors et
// ne voit jamais écrits.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

/* ── Deviner un mot par ce qu'il y a autour ──────────────────────────────── */

type MotEnContexte = {
  readonly phrase: string;
  readonly mot: string;
  readonly sens: string;
  readonly faux: readonly string[];
  /** Le morceau de phrase qui met sur la piste. */
  readonly indice: string;
};

const CONTEXTES: readonly MotEnContexte[] = [
  { phrase: "Le pêcheur pose sa nasse dans le lagon pour attraper des poissons.", mot: "nasse", sens: "un piège à poissons", faux: ["une rame", "un chapeau", "une canne à sucre"], indice: "pour attraper des poissons" },
  { phrase: "On mange dehors, sur la varangue, à l'abri de la pluie.", mot: "varangue", sens: "une terrasse couverte", faux: ["une casserole", "une route", "un arbre"], indice: "à l'abri de la pluie" },
  { phrase: "Après l'averse, l'eau descend en grondant dans la ravine.", mot: "ravine", sens: "un creux où l'eau descend", faux: ["une échelle", "un panier", "une chanson"], indice: "l'eau descend en grondant" },
  { phrase: "La pirogue avance sans bruit, poussée par deux rameurs.", mot: "pirogue", sens: "un petit bateau", faux: ["une charrette", "un cerf-volant", "une cabane"], indice: "poussée par deux rameurs" },
  { phrase: "La houle soulève le bateau, puis le repose doucement.", mot: "houle", sens: "le mouvement des vagues", faux: ["une odeur", "un oiseau", "une corde"], indice: "soulève le bateau" },
  { phrase: "Léa met un hameçon au bout de son fil pour pêcher.", mot: "hameçon", sens: "un petit crochet pointu", faux: ["un bouchon", "une gomme", "un caillou"], indice: "au bout de son fil pour pêcher" },
  { phrase: "Papa remue le cari avec une grande louche.", mot: "louche", sens: "une grosse cuillère", faux: ["une fourchette", "une assiette", "un tabouret"], indice: "remue le cari" },
  { phrase: "Sur le tronc, l'écorce est rugueuse et se détache par plaques.", mot: "écorce", sens: "la peau de l'arbre", faux: ["une fleur", "un fruit", "une branche cassée"], indice: "sur le tronc" },
  { phrase: "Au printemps, chaque bourgeon s'ouvre et donne une feuille.", mot: "bourgeon", sens: "un bouton qui va s'ouvrir", faux: ["une racine", "un caillou", "un nid"], indice: "s'ouvre et donne une feuille" },
  { phrase: "Nous montons jusqu'au sommet, tout en haut du piton.", mot: "sommet", sens: "le point le plus haut", faux: ["le fond", "le milieu", "le bord"], indice: "tout en haut" },
  { phrase: "Le versant du piton est raide : la pente descend d'un coup.", mot: "versant", sens: "le côté en pente d'une montagne", faux: ["un chemin plat", "une rivière", "un mur de maison"], indice: "la pente descend" },
  { phrase: "Le matin, la brume cache le piton et on ne voit plus rien.", mot: "brume", sens: "un brouillard léger", faux: ["un feu", "un rocher", "une odeur"], indice: "on ne voit plus rien" },
  { phrase: "Après la pluie, une éclaircie laisse enfin passer le soleil.", mot: "éclaircie", sens: "un moment sans nuages", faux: ["un orage", "une nuit", "une flaque"], indice: "laisse enfin passer le soleil" },
  { phrase: "La brise vient de la mer et rafraichit toute la case.", mot: "brise", sens: "un vent léger", faux: ["une pluie", "une lumière", "une odeur de cari"], indice: "rafraichit toute la case" },
  { phrase: "Le sentier serpente entre les tamarins jusqu'à la cascade.", mot: "serpente", sens: "avance en tournant", faux: ["s'arrête net", "descend tout droit", "disparait"], indice: "entre les tamarins" },
  { phrase: "La sécheresse dure : il n'a pas plu depuis trois mois.", mot: "sécheresse", sens: "une longue période sans pluie", faux: ["une grosse averse", "un vent fort", "une inondation"], indice: "il n'a pas plu depuis trois mois" },
];

/* ── Les familles de mots ────────────────────────────────────────────────── */

type Famille = {
  readonly base: string;
  readonly mots: readonly string[];
  readonly intrus: string;
  readonly racine: string;
};

const FAMILLES: readonly Famille[] = [
  { base: "jardin", mots: ["jardiner", "jardinier", "jardinage"], intrus: "cuisine", racine: "jardin" },
  { base: "dent", mots: ["dentiste", "dentifrice", "édenté"], intrus: "menton", racine: "dent" },
  { base: "terre", mots: ["terrain", "atterrir", "enterrer"], intrus: "tomber", racine: "terr" },
  { base: "chant", mots: ["chanter", "chanteur", "chanson"], intrus: "danser", racine: "chan" },
  { base: "pêche", mots: ["pêcheur", "pêcher", "pêcherie"], intrus: "nager", racine: "pêch" },
  { base: "fleur", mots: ["fleurir", "fleuriste", "fleuri"], intrus: "feuille", racine: "fleur" },
  { base: "lait", mots: ["laitier", "laitage", "laiterie"], intrus: "beurre", racine: "lait" },
  { base: "montagne", mots: ["montagnard", "montagneux"], intrus: "vallée", racine: "montagn" },
  { base: "voyage", mots: ["voyager", "voyageur", "voyageuse"], intrus: "rester", racine: "voyag" },
  { base: "fruit", mots: ["fruité", "fruitier", "fruitière"], intrus: "légume", racine: "fruit" },
  { base: "cuisine", mots: ["cuisiner", "cuisinier", "cuisinière"], intrus: "manger", racine: "cuisin" },
  // La racine est « danse » et non « dans » : « dans » est un autre mot, et un
  // enfant de sept ans le lirait comme tel.
  { base: "danse", mots: ["danser", "danseur", "danseuse"], intrus: "sauter", racine: "danse" },
  { base: "mer", mots: ["marin", "marée", "maritime"], intrus: "lac", racine: "mar" },
  { base: "porte", mots: ["portail", "portière", "portillon"], intrus: "fenêtre", racine: "port" },
  { base: "glace", mots: ["glacier", "glacé", "glacière"], intrus: "chaud", racine: "glac" },
  { base: "vent", mots: ["ventilateur", "venteux", "éventail"], intrus: "pluie", racine: "vent" },
  { base: "jour", mots: ["journée", "journal", "bonjour"], intrus: "nuit", racine: "jour" },
  { base: "sable", mots: ["sablier", "sableux", "ensablé"], intrus: "cailloux", racine: "sabl" },
  { base: "bois", mots: ["boisé", "boiserie", "déboiser"], intrus: "pierre", racine: "bois" },
  { base: "poisson", mots: ["poissonnier", "poissonnerie", "empoissonner"], intrus: "viande", racine: "poisson" },
];

/** Les familles assez fournies pour qu'on demande d'en trouver un membre. */
const FAMILLES_FOURNIES = FAMILLES.filter((f) => f.mots.length >= 3);

/* ── Les préfixes, ceux que le BO nomme ──────────────────────────────────── */

type Affixe = {
  readonly affixe: string;
  readonly sens: string;
  readonly mots: readonly string[];
};

const PREFIXES: readonly Affixe[] = [
  { affixe: "dé-", sens: "le contraire", mots: ["défaire", "décoller", "démonter", "déranger", "déplier"] },
  { affixe: "re-", sens: "encore une fois", mots: ["refaire", "relire", "redire", "revenir", "recommencer"] },
  { affixe: "in-", sens: "le contraire", mots: ["incorrect", "invisible", "inutile", "incapable"] },
  { affixe: "im-", sens: "le contraire", mots: ["impossible", "impoli", "impatient", "imprudent"] },
  { affixe: "para-", sens: "qui protège de", mots: ["parapluie", "parasol", "paravent", "paratonnerre"] },
  { affixe: "multi-", sens: "plusieurs", mots: ["multicolore", "multiprise"] },
  { affixe: "anti-", sens: "contre", mots: ["antivol", "antigel", "antimoustique"] },
  { affixe: "mal-", sens: "mal, de travers", mots: ["maladroit", "malheureux", "malpoli"] },
];

const SUFFIXES: readonly Affixe[] = [
  { affixe: "-eur", sens: "celui qui fait l'action", mots: ["chanteur", "danseur", "nageur", "vendeur", "coiffeur"] },
  { affixe: "-euse", sens: "celle qui fait l'action", mots: ["chanteuse", "danseuse", "nageuse", "vendeuse", "coiffeuse"] },
  { affixe: "-ier", sens: "l'arbre qui donne le fruit, ou le métier", mots: ["manguier", "bananier", "pommier", "boulanger", "cuisinier"] },
  { affixe: "-ette", sens: "en plus petit", mots: ["fillette", "maisonnette", "camionnette", "tablette"] },
  { affixe: "-able", sens: "qu'on peut faire", mots: ["lavable", "mangeable", "aimable", "réparable"] },
];

/** Le fruit et son arbre : le suffixe -ier, montré là où l'enfant le voit. */
const ARBRES: readonly { readonly fruit: string; readonly arbre: string }[] = [
  { fruit: "mangue", arbre: "manguier" },
  { fruit: "banane", arbre: "bananier" },
  { fruit: "pomme", arbre: "pommier" },
  { fruit: "orange", arbre: "oranger" },
  { fruit: "citron", arbre: "citronnier" },
  { fruit: "prune", arbre: "prunier" },
  { fruit: "cerise", arbre: "cerisier" },
  { fruit: "figue", arbre: "figuier" },
];

/* ── Synonymes et antonymes ──────────────────────────────────────────────── */

type Couple = {
  readonly mot: string;
  readonly autre: string;
  readonly faux: readonly string[];
};

const SYNONYMES: readonly Couple[] = [
  { mot: "rapide", autre: "vite", faux: ["lent", "lourd", "sale"] },
  { mot: "content", autre: "heureux", faux: ["triste", "fâché", "fatigué"] },
  { mot: "minuscule", autre: "tout petit", faux: ["énorme", "large", "long"] },
  { mot: "joli", autre: "beau", faux: ["laid", "vieux", "cassé"] },
  { mot: "bavarder", autre: "discuter", faux: ["se taire", "courir", "dormir"] },
  { mot: "commencer", autre: "débuter", faux: ["finir", "arrêter", "oublier"] },
  { mot: "attraper", autre: "saisir", faux: ["lâcher", "jeter", "perdre"] },
  { mot: "effrayé", autre: "apeuré", faux: ["rassuré", "amusé", "endormi"] },
  { mot: "fatigué", autre: "épuisé", faux: ["reposé", "réveillé", "pressé"] },
  { mot: "malin", autre: "rusé", faux: ["bête", "lent", "timide"] },
  { mot: "abimé", autre: "cassé", faux: ["neuf", "propre", "solide"] },
  { mot: "regarder", autre: "observer", faux: ["écouter", "toucher", "sentir"] },
  { mot: "crier", autre: "hurler", faux: ["chuchoter", "chanter", "siffler"] },
  { mot: "sale", autre: "crasseux", faux: ["propre", "sec", "neuf"] },
  { mot: "délicieux", autre: "très bon", faux: ["mauvais", "froid", "dur"] },
  { mot: "calme", autre: "tranquille", faux: ["agité", "bruyant", "rapide"] },
];

const ANTONYMES: readonly Couple[] = [
  { mot: "grand", autre: "petit", faux: ["large", "haut", "gros"] },
  { mot: "chaud", autre: "froid", faux: ["tiède", "mouillé", "sec"] },
  { mot: "jour", autre: "nuit", faux: ["matin", "midi", "heure"] },
  { mot: "monter", autre: "descendre", faux: ["marcher", "sauter", "courir"] },
  { mot: "ouvrir", autre: "fermer", faux: ["pousser", "tirer", "tourner"] },
  { mot: "content", autre: "triste", faux: ["heureux", "joyeux", "calme"] },
  { mot: "devant", autre: "derrière", faux: ["dessus", "loin", "à côté"] },
  { mot: "plein", autre: "vide", faux: ["lourd", "rond", "ouvert"] },
  { mot: "propre", autre: "sale", faux: ["neuf", "sec", "clair"] },
  { mot: "vieux", autre: "jeune", faux: ["grand", "sage", "lent"] },
  { mot: "lourd", autre: "léger", faux: ["gros", "long", "dur"] },
  { mot: "bruyant", autre: "silencieux", faux: ["fort", "rapide", "joyeux"] },
  { mot: "dur", autre: "mou", faux: ["sec", "froid", "lisse"] },
  { mot: "arriver", autre: "partir", faux: ["attendre", "rester", "courir"] },
  { mot: "commencer", autre: "finir", faux: ["continuer", "essayer", "réussir"] },
  { mot: "mouillé", autre: "sec", faux: ["froid", "propre", "chaud"] },
];

/* ── Du général au particulier ───────────────────────────────────────────── */

type Generique = {
  readonly generique: string;
  readonly specifiques: readonly string[];
  readonly intrus: string;
};

const GENERIQUES: readonly Generique[] = [
  { generique: "un fruit", specifiques: ["une mangue", "un letchi", "une banane", "une goyave"], intrus: "une chaise" },
  { generique: "un animal", specifiques: ["un margouillat", "une tortue", "un paille-en-queue", "un chien"], intrus: "un tabouret" },
  { generique: "un véhicule", specifiques: ["une voiture", "un camion", "un vélo", "un bateau"], intrus: "une armoire" },
  { generique: "un meuble", specifiques: ["une table", "une chaise", "une armoire", "un lit"], intrus: "une mangue" },
  { generique: "un vêtement", specifiques: ["un pantalon", "une chemise", "une robe", "un short"], intrus: "une casserole" },
  { generique: "un aliment", specifiques: ["du riz", "du pain", "du fromage", "un cari"], intrus: "un crayon" },
  { generique: "une fleur", specifiques: ["une rose", "un hibiscus", "une tulipe", "un frangipanier"], intrus: "un marteau" },
  { generique: "un arbre", specifiques: ["un manguier", "un tamarin", "un filao", "un bananier"], intrus: "un poisson" },
  { generique: "un outil", specifiques: ["un marteau", "une scie", "un tournevis", "une pince"], intrus: "un nuage" },
  { generique: "un instrument de musique", specifiques: ["une guitare", "un tambour", "un kayamb", "une flûte"], intrus: "une gomme" },
  { generique: "un oiseau", specifiques: ["un paille-en-queue", "un moineau", "une poule", "un cardinal"], intrus: "un lézard" },
  { generique: "un objet de l'école", specifiques: ["une trousse", "un cahier", "une règle", "une gomme"], intrus: "une casserole" },
  { generique: "un poisson", specifiques: ["une sardine", "un thon", "une carpe", "un requin"], intrus: "une tortue" },
  { generique: "un insecte", specifiques: ["une fourmi", "une abeille", "un papillon", "une mouche"], intrus: "un margouillat" },
  { generique: "un légume", specifiques: ["une carotte", "un chouchou", "une tomate", "un haricot"], intrus: "une banane" },
  { generique: "une couleur", specifiques: ["le rouge", "le bleu", "le vert", "le jaune"], intrus: "le sable" },
  { generique: "un jour de la semaine", specifiques: ["lundi", "mercredi", "samedi", "dimanche"], intrus: "janvier" },
  { generique: "un bâtiment", specifiques: ["une école", "une case", "une mairie", "un magasin"], intrus: "un chemin" },
  { generique: "un jeu", specifiques: ["la marelle", "les billes", "le loup", "la corde à sauter"], intrus: "le cartable" },
  { generique: "un métier", specifiques: ["un pêcheur", "une boulangère", "un maitre", "une infirmière"], intrus: "un cousin" },
];

/* ── Les niveaux de langue ───────────────────────────────────────────────── */

type Registre = {
  readonly familier: string;
  readonly courant: string;
  readonly soutenu: string;
};

const REGISTRES: readonly Registre[] = [
  { familier: "une bagnole", courant: "une voiture", soutenu: "une automobile" },
  { familier: "un bouquin", courant: "un livre", soutenu: "un ouvrage" },
  { familier: "des godasses", courant: "des chaussures", soutenu: "des souliers" },
  { familier: "le boulot", courant: "le travail", soutenu: "le labeur" },
  { familier: "un gamin", courant: "un enfant", soutenu: "un jeune garçon" },
  { familier: "des fringues", courant: "des vêtements", soutenu: "des habits" },
  { familier: "se marrer", courant: "rire", soutenu: "s'esclaffer" },
  { familier: "bouffer", courant: "manger", soutenu: "se restaurer" },
  { familier: "piquer", courant: "voler", soutenu: "dérober" },
  { familier: "un truc", courant: "un objet", soutenu: "un ustensile" },
  { familier: "crevé", courant: "fatigué", soutenu: "épuisé" },
];

/* ── Un mot, plusieurs sens ──────────────────────────────────────────────── */

type Polyseme = {
  readonly mot: string;
  readonly sens: readonly { readonly phrase: string; readonly sens: string }[];
};

const POLYSEMES: readonly Polyseme[] = [
  { mot: "glace", sens: [
    { phrase: "Léa mange une glace à la vanille.", sens: "un dessert glacé" },
    { phrase: "Maman se regarde dans la glace.", sens: "un miroir" },
  ] },
  { mot: "carte", sens: [
    { phrase: "Le maitre montre l'île sur la carte.", sens: "un dessin du pays" },
    { phrase: "Tom pioche une carte et gagne la partie.", sens: "un carton pour jouer" },
  ] },
  { mot: "feuille", sens: [
    { phrase: "Une feuille tombe du manguier.", sens: "la partie verte d'un arbre" },
    { phrase: "Je plie ma feuille en deux.", sens: "une page de papier" },
  ] },
  { mot: "pied", sens: [
    { phrase: "J'ai mal au pied depuis la course.", sens: "le bout de la jambe" },
    { phrase: "Le pied de la table est cassé.", sens: "ce qui soutient un meuble" },
  ] },
  { mot: "souris", sens: [
    { phrase: "Une souris grignote sous l'armoire.", sens: "un petit animal" },
    { phrase: "Clique avec la souris de l'ordinateur.", sens: "l'objet qui déplace la flèche" },
  ] },
  { mot: "orange", sens: [
    { phrase: "Je pèle une orange bien juteuse.", sens: "un fruit" },
    { phrase: "Le ciel est orange au coucher du soleil.", sens: "une couleur" },
  ] },
  { mot: "bouchon", sens: [
    { phrase: "Remets le bouchon sur la bouteille.", sens: "ce qui ferme une bouteille" },
    { phrase: "On est resté une heure dans le bouchon.", sens: "des voitures arrêtées" },
  ] },
  { mot: "règle", sens: [
    { phrase: "Je trace un trait avec ma règle.", sens: "un objet pour tracer droit" },
    { phrase: "La règle du jeu tient en trois phrases.", sens: "ce qu'il faut respecter" },
  ] },
  { mot: "avocat", sens: [
    { phrase: "L'avocat est mûr, on le mange à la cuillère.", sens: "un fruit vert" },
    { phrase: "L'avocat parle devant le juge.", sens: "quelqu'un qui défend" },
  ] },
  { mot: "grève", sens: [
    { phrase: "Les vagues meurent sur la grève.", sens: "le bord de la mer" },
    { phrase: "Les bus sont en grève aujourd'hui.", sens: "un arrêt du travail" },
  ] },
  { mot: "bras", sens: [
    { phrase: "Léa lève le bras pour répondre.", sens: "une partie du corps" },
    { phrase: "La rivière se sépare en deux bras.", sens: "une branche de rivière" },
  ] },
  { mot: "cœur", sens: [
    { phrase: "Mon cœur bat très vite après la course.", sens: "l'organe qui bat" },
    { phrase: "On se retrouve au cœur du village.", sens: "le milieu" },
  ] },
  { mot: "vol", sens: [
    { phrase: "Le vol du paille-en-queue est silencieux.", sens: "le fait de voler dans le ciel" },
    { phrase: "Il y a eu un vol dans le magasin cette nuit.", sens: "le fait de prendre ce qui n'est pas à soi" },
  ] },
  { mot: "toile", sens: [
    { phrase: "L'araignée tisse sa toile dans un coin.", sens: "le fil que l'araignée tend" },
    { phrase: "Le peintre pose sa toile sur le chevalet.", sens: "le tissu sur lequel on peint" },
  ] },
  { mot: "cirque", sens: [
    { phrase: "Le cirque de Salazie est entouré de remparts.", sens: "un grand creux entouré de montagnes" },
    { phrase: "Au cirque, les acrobates marchent sur un fil.", sens: "un spectacle sous un chapiteau" },
  ] },
  { mot: "opération", sens: [
    { phrase: "Je pose l'opération dans mon cahier.", sens: "un calcul" },
    { phrase: "Le chirurgien prépare l'opération.", sens: "un soin à l'hôpital" },
  ] },
];

/* ── Sens propre, sens figuré. L'exemple est du BO. ──────────────────────── */

type SensFigure = {
  readonly mot: string;
  readonly propre: string;
  readonly figure: string;
  readonly sensFigure: string;
};

const FIGURES: readonly SensFigure[] = [
  { mot: "souffler", propre: "Léa souffle ses bougies.", figure: "Tom souffle la réponse à son voisin.", sensFigure: "la dire tout bas" },
  { mot: "dévorer", propre: "Le chien dévore sa gamelle.", figure: "Je dévore ce livre depuis hier.", sensFigure: "le lire avec passion" },
  { mot: "tomber", propre: "Le letchi tombe dans l'herbe.", figure: "La nuit tombe sur le lagon.", sensFigure: "arriver, s'installer" },
  { mot: "briller", propre: "Le soleil brille sur la mer.", figure: "Léa brille en calcul mental.", sensFigure: "être très forte" },
  { mot: "geler", propre: "L'eau gèle dans le congélateur.", figure: "On gèle sous la varangue ce matin.", sensFigure: "avoir très froid" },
  { mot: "croquer", propre: "Je croque une pomme verte.", figure: "Il croque la vie à pleines dents.", sensFigure: "profiter de tout" },
  { mot: "voler", propre: "Le paille-en-queue vole au-dessus du lagon.", figure: "Léa vole au secours de son frère.", sensFigure: "arriver très vite pour aider" },
  { mot: "monter", propre: "Nous montons au sommet du piton.", figure: "La colère monte doucement.", sensFigure: "grandir, augmenter" },
  { mot: "couper", propre: "Papa coupe le pain en tranches.", figure: "La route coupe le champ en deux.", sensFigure: "traverser, séparer" },
  { mot: "pleurer", propre: "Le bébé pleure dans son berceau.", figure: "Le ciel pleure depuis ce matin.", sensFigure: "il pleut" },
  { mot: "attraper", propre: "Le chat attrape une mouche.", figure: "Léa a attrapé un rhume.", sensFigure: "être tombée malade" },
  { mot: "casser", propre: "Tom casse une branche sèche.", figure: "Cette musique me casse les oreilles.", sensFigure: "faire trop de bruit" },
  { mot: "grignoter", propre: "La souris grignote un bout de pain.", figure: "La mer grignote la plage chaque année.", sensFigure: "l'user petit à petit" },
  { mot: "porter", propre: "Papa porte le sac de riz.", figure: "Ce manguier porte beaucoup de fruits.", sensFigure: "donner beaucoup de fruits" },
  { mot: "avaler", propre: "J'avale une gorgée d'eau.", figure: "Elle a avalé son livre en une soirée.", sensFigure: "l'avoir lu très vite" },
  { mot: "glisser", propre: "Le pied glisse sur le rocher mouillé.", figure: "Le temps glisse sans qu'on le voie.", sensFigure: "passer sans qu'on s'en aperçoive" },
];

type Expression = {
  readonly expression: string;
  readonly sens: string;
  readonly faux: readonly string[];
};

const EXPRESSIONS: readonly Expression[] = [
  { expression: "avoir une peur bleue", sens: "avoir très peur", faux: ["avoir froid", "être malade", "porter du bleu"] },
  { expression: "tomber dans les pommes", sens: "s'évanouir", faux: ["tomber d'un arbre", "manger des pommes", "glisser"] },
  { expression: "avoir un cœur d'or", sens: "être très gentil", faux: ["être riche", "être malade", "porter un collier"] },
  { expression: "casser les pieds", sens: "embêter quelqu'un", faux: ["se blesser", "danser", "courir vite"] },
  { expression: "poser un lapin", sens: "ne pas venir au rendez-vous", faux: ["offrir un animal", "s'assoir", "dessiner"] },
  { expression: "avoir la tête dure", sens: "ne pas vouloir changer d'avis", faux: ["avoir mal à la tête", "porter un casque", "être fort"] },
  { expression: "être haut comme trois pommes", sens: "être tout petit", faux: ["être gourmand", "grimper aux arbres", "être très grand"] },
  { expression: "donner sa langue au chat", sens: "renoncer à deviner", faux: ["nourrir un chat", "se taire pour toujours", "tirer la langue"] },
  { expression: "avoir la main verte", sens: "savoir s'occuper des plantes", faux: ["se salir les mains", "peindre en vert", "être malade"] },
  { expression: "coûter les yeux de la tête", sens: "coûter très cher", faux: ["faire mal aux yeux", "être gratuit", "être lourd"] },
  { expression: "avoir un chat dans la gorge", sens: "être enroué, avoir du mal à parler", faux: ["avoir faim", "aimer les chats", "tousser exprès"] },
  { expression: "mettre la main à la pâte", sens: "aider à faire le travail", faux: ["faire un gâteau", "se salir", "regarder les autres"] },
  { expression: "être dans la lune", sens: "ne pas écouter, rêver", faux: ["être en voyage", "avoir sommeil", "regarder le ciel"] },
  { expression: "prendre ses jambes à son cou", sens: "partir en courant très vite", faux: ["se blesser", "s'assoir", "porter quelqu'un"] },
  { expression: "avoir la tête dans les nuages", sens: "être distrait", faux: ["être très grand", "avoir chaud", "prendre l'avion"] },
  { expression: "en faire tout un fromage", sens: "faire une histoire pour pas grand-chose", faux: ["cuisiner", "avoir faim", "se disputer pour de vrai"] },
  { expression: "être comme un poisson dans l'eau", sens: "se sentir tout à fait à sa place", faux: ["savoir nager", "avoir froid", "être mouillé"] },
  { expression: "avoir les yeux plus gros que le ventre", sens: "prendre plus que ce qu'on peut manger", faux: ["être malade", "grandir vite", "voir loin"] },
  { expression: "chercher midi à quatorze heures", sens: "compliquer ce qui est simple", faux: ["être en retard", "regarder l'heure", "avoir faim"] },
  { expression: "avoir le cœur gros", sens: "être triste", faux: ["être malade", "courir vite", "avoir trop mangé"] },
];

/* ── Le dictionnaire ─────────────────────────────────────────────────────── */

type Article = {
  readonly mot: string;
  readonly classe: string;
  readonly classeLongue: string;
  readonly definition: string;
  readonly exemple: string;
};

const ARTICLES: readonly Article[] = [
  { mot: "mangue", classe: "n. f.", classeLongue: "un nom féminin", definition: "Fruit du manguier, à chair jaune et sucrée.", exemple: "Léa pèle une mangue bien mûre." },
  { mot: "margouillat", classe: "n. m.", classeLongue: "un nom masculin", definition: "Petit lézard qui grimpe sur les murs.", exemple: "Un margouillat file derrière le cadre." },
  { mot: "grimper", classe: "v.", classeLongue: "un verbe", definition: "Monter en s'aidant des mains et des pieds.", exemple: "Il grimpe jusqu'à la première branche." },
  { mot: "varangue", classe: "n. f.", classeLongue: "un nom féminin", definition: "Terrasse couverte devant une maison.", exemple: "On mange sur la varangue quand il pleut." },
  { mot: "sucré", classe: "adj.", classeLongue: "un adjectif", definition: "Qui a le goût du sucre.", exemple: "Ce letchi est très sucré." },
  { mot: "ravine", classe: "n. f.", classeLongue: "un nom féminin", definition: "Creux profond où l'eau descend après la pluie.", exemple: "La ravine gronde depuis l'averse." },
  { mot: "pirogue", classe: "n. f.", classeLongue: "un nom féminin", definition: "Bateau long et étroit, poussé à la rame.", exemple: "La pirogue glisse sur le lagon." },
  { mot: "bavarder", classe: "v.", classeLongue: "un verbe", definition: "Parler beaucoup, de choses sans importance.", exemple: "Les cousins bavardent sous le manguier." },
  { mot: "fatigué", classe: "adj.", classeLongue: "un adjectif", definition: "Qui a besoin de se reposer.", exemple: "Le pêcheur rentre fatigué." },
  { mot: "tamarin", classe: "n. m.", classeLongue: "un nom masculin", definition: "Grand arbre des hauts, au bois très dur.", exemple: "Le sentier passe entre les tamarins." },
];

/** Une liste de mots pour l'ordre alphabétique. Sans accent initial : le
 *  classement d'un dictionnaire ne se joue pas là-dessus au CE1. */
const MOTS_ALPHABET: readonly string[] = [
  "arbre", "avion", "bateau", "banane", "case", "cahier", "danse", "dent",
  "école", "étoile", "fleur", "fusée", "gomme", "gâteau", "hibou", "herbe",
  "image", "île", "jardin", "jeu", "kayamb", "lagon", "letchi", "mangue",
  "margouillat", "nuage", "nasse", "orange", "oiseau", "piton", "pirogue",
  "quille", "ravine", "rocher", "sable", "sentier", "tortue", "tamarin",
  "usine", "vague", "varangue", "wagon", "zébu",
];

export const vocabulaireBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_VOC_CONTEXTE — deviner par ce qu'il y a autour
  ========================================================= */
  {
    kind: "template",
    id: "ce1_voc_contexte_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_contexte",
    difficulty: 2,
    theme: "reunion",
    hint: "Ne t'arrête pas sur le mot. Lis toute la phrase et cherche ce qu'il fait là.",
    tags: ["ce1", "vocabulaire", "contexte", "template"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      return {
        text: `Lis cette phrase :\n« ${c.phrase} »\n\nQue veut dire « ${c.mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(c.sens, c.faux),
        expected: [c.sens],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Quand on ne connait pas un mot, la phrase autour de lui donne souvent la réponse.",
          "Relis la phrase en entier, puis demande-toi à quoi sert la chose dont on parle.",
          `« ${c.indice} » : voilà l'indice. Un mot inconnu se devine presque toujours comme ça, sans dictionnaire.`,
          `« ${c.mot} », c'est ${c.sens}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_voc_contexte_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_contexte",
    difficulty: 3,
    theme: "reunion",
    hint: "Un seul morceau de la phrase t'a mis sur la piste. Retrouve-le.",
    tags: ["ce1", "vocabulaire", "contexte", "template"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      const autres = shuffle(CONTEXTES.filter((x) => x.mot !== c.mot))
        .slice(0, 3)
        .map((x) => x.indice);
      return {
        text: `« ${c.phrase} »\n\nOn comprend que « ${c.mot} » veut dire « ${c.sens} ». Quel morceau de la phrase te le fait deviner ?`,
        format: "qcm" as const,
        choices: makeChoices(c.indice, autres),
        expected: [c.indice],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deviner un mot, ce n'est pas inventer : on s'appuie toujours sur un morceau de la phrase.",
          "Cherche l'endroit qui dit à quoi sert la chose, ou ce qu'elle fait, puis pose ton doigt dessus.",
          `« ${c.indice} » explique tout. Sans lui, « ${c.mot} » resterait un mot vide.`,
          `L'indice est « ${c.indice} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_VOC_FAMILLE
  ========================================================= */
  {
    kind: "template",
    id: "ce1_voc_famille_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_famille",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le petit morceau qui revient au début de chaque mot.",
    tags: ["ce1", "vocabulaire", "famille", "template"],
    generate: () => {
      const f = randomChoice(FAMILLES);
      return {
        text: `Quel mot ne fait PAS partie de la famille de « ${f.base} » ?`,
        format: "qcm" as const,
        choices: shuffle([f.intrus, ...f.mots.slice(0, 3)]),
        expected: [f.intrus],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les mots d'une même famille partagent un morceau — la racine — et un sens proche.",
          "Souligne le morceau commun. Celui qui ne l'a pas est l'intrus.",
          `${f.mots.map((m) => `« ${m} »`).join(", ")} : tous portent « ${f.racine} ». « ${f.intrus} » parle d'autre chose.`,
          `L'intrus est « ${f.intrus} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_voc_famille_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_famille",
    difficulty: 3,
    theme: "neutral",
    hint: "La racine est le morceau qu'on retrouve dans tous les mots de la famille.",
    tags: ["ce1", "vocabulaire", "famille", "template"],
    generate: () => {
      const f = randomChoice(FAMILLES_FOURNIES);
      const autres = shuffle(FAMILLES.filter((x) => x.racine !== f.racine))
        .slice(0, 3)
        .map((x) => x.racine);
      return {
        text: `« ${f.mots.join(" · ")} »\n\nQuel morceau ces mots ont-ils en commun ?`,
        format: "qcm" as const,
        choices: makeChoices(f.racine, autres),
        expected: [f.racine],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La racine, c'est le morceau de mot qui porte le sens et qu'on retrouve dans toute la famille.",
          "Écris les mots l'un sous l'autre et regarde ce qui se répète.",
          `${f.mots.map((m) => `« ${m} »`).join(", ")} — chacun contient « ${f.racine} ».`,
          `La racine commune est « ${f.racine} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_VOC_PREFIXE
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_voc_prefixe_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_prefixe",
    difficulty: 1,
    theme: "neutral",
    text: "Où se place un préfixe dans un mot ?",
    format: "qcm",
    choices: ["Au début", "À la fin", "Au milieu", "N'importe où"],
    expected: ["Au début"],
    comparator: "mcq_exact",
    hint: "Dans « défaire », qu'est-ce qui a été ajouté à « faire » ?",
    explanation: exp(
      "Un préfixe est un petit morceau collé au DÉBUT d'un mot, qui change son sens.",
      "Enlève le début du mot : s'il reste un vrai mot, tu as trouvé le préfixe.",
      "défaire = dé + faire. On enlève « dé », il reste « faire ». Le préfixe « dé- » a retourné le sens.",
      "Un préfixe se place au début.",
    ),
    tags: ["ce1", "vocabulaire", "prefixe", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_voc_prefixe_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_prefixe",
    difficulty: 2,
    theme: "neutral",
    hint: "Enlève le début du mot et regarde ce qui reste.",
    tags: ["ce1", "vocabulaire", "prefixe", "template"],
    generate: () => {
      const p = randomChoice(PREFIXES);
      const mot = randomChoice(p.mots);
      const autres = shuffle(PREFIXES.filter((x) => x.affixe !== p.affixe))
        .slice(0, 3)
        .map((x) => x.affixe);
      return {
        text: `Quel est le préfixe du mot « ${mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(p.affixe, autres),
        expected: [p.affixe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le préfixe est le morceau collé au début du mot.",
          "Cache le début avec ton doigt : ce qui reste doit être un mot que tu connais.",
          `${mot} = ${p.affixe.replace("-", "")} + ${mot.slice(p.affixe.replace("-", "").length)}. Le préfixe « ${p.affixe} » veut dire ${p.sens}.`,
          `Le préfixe est « ${p.affixe} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_voc_prefixe_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_prefixe",
    difficulty: 3,
    theme: "neutral",
    hint: "Un préfixe ne change pas le mot : il change ce qu'il veut dire.",
    tags: ["ce1", "vocabulaire", "prefixe", "template"],
    generate: () => {
      const p = randomChoice(PREFIXES);
      const mot = randomChoice(p.mots);
      // ⚠️ « dé- », « in- » et « im- » veulent tous les trois dire « le
      // contraire ». Tirer trois PRÉFIXES puis prendre leur sens pouvait donc
      // sortir trois fois la même ligne, et le QCM tombait à deux propositions.
      // On dédoublonne les SENS avant de tirer, pas après.
      const autres = shuffle([
        ...new Set(PREFIXES.filter((x) => x.sens !== p.sens).map((x) => x.sens)),
      ]).slice(0, 3);
      return {
        text: `Dans « ${mot} », que veut dire le préfixe « ${p.affixe} » ?`,
        format: "qcm" as const,
        choices: makeChoices(p.sens, autres),
        expected: [p.sens],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chaque préfixe a son sens à lui, et il le donne à tous les mots qu'il commence.",
          "Compare deux mots qui partagent le même préfixe : ce qu'ils ont de commun, c'est son sens.",
          `${p.mots.slice(0, 3).map((m) => `« ${m} »`).join(", ")} : tous veulent dire ${p.sens}.`,
          `« ${p.affixe} » veut dire ${p.sens}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_VOC_SUFFIXE — et l'arbre qui porte le fruit
  ========================================================= */
  {
    kind: "template",
    id: "ce1_voc_suffixe_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_suffixe",
    difficulty: 2,
    theme: "neutral",
    hint: "Le suffixe se colle à la FIN du mot.",
    tags: ["ce1", "vocabulaire", "suffixe", "template"],
    generate: () => {
      const s = randomChoice(SUFFIXES);
      const mot = randomChoice(s.mots);
      const autres = shuffle(SUFFIXES.filter((x) => x.affixe !== s.affixe))
        .slice(0, 3)
        .map((x) => x.affixe);
      return {
        text: `Quel est le suffixe du mot « ${mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(s.affixe, autres),
        expected: [s.affixe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le suffixe est le morceau collé à la FIN du mot. Il dit ce que le mot est devenu.",
          "Cache la fin du mot : ce qui reste doit ressembler à un mot que tu connais.",
          `« ${mot} » finit par « ${s.affixe} », qui veut dire : ${s.sens}.`,
          `Le suffixe est « ${s.affixe} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_voc_suffixe_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_suffixe",
    difficulty: 2,
    theme: "reunion",
    hint: "Le manguier donne les mangues. Le suffixe « -ier » dit « l'arbre de ».",
    tags: ["ce1", "vocabulaire", "suffixe", "template"],
    generate: () => {
      const a = randomChoice(ARBRES);
      const autres = shuffle(ARBRES.filter((x) => x.arbre !== a.arbre))
        .slice(0, 3)
        .map((x) => x.arbre);
      return {
        text: `Comment s'appelle l'arbre qui donne les ${a.fruit}s ?`,
        format: "qcm" as const,
        choices: makeChoices(a.arbre, autres),
        expected: [a.arbre],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le suffixe « -ier » sert à nommer l'arbre à partir de son fruit.",
          "Prends le nom du fruit, enlève sa dernière lettre s'il en a une de trop, et ajoute « -ier ».",
          `${a.fruit} → ${a.arbre}. C'est la même fabrique pour le pommier, le bananier et le citronnier.`,
          `C'est le ${a.arbre}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_voc_suffixe_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_suffixe",
    difficulty: 3,
    theme: "neutral",
    text: "« chanteur » et « chanteuse » : que change le suffixe ?",
    format: "qcm",
    choices: [
      "Il dit si c'est un garçon ou une fille",
      "Il dit combien ils sont",
      "Il dit quand ça se passe",
      "Il ne change rien",
    ],
    expected: ["Il dit si c'est un garçon ou une fille"],
    comparator: "mcq_exact",
    hint: "Compare « un danseur » et « une danseuse ».",
    explanation: exp(
      "Les suffixes « -eur » et « -euse » nomment celui ou celle qui fait l'action.",
      "Regarde la fin du mot, puis le petit mot devant : les deux vont ensemble.",
      "un chanteur / une chanteuse, un nageur / une nageuse, un vendeur / une vendeuse. La racine ne bouge pas, la fin dit qui c'est.",
      "Il dit si c'est un garçon ou une fille.",
    ),
    tags: ["ce1", "vocabulaire", "suffixe", "methode", "qcm"],
  },

  /* =========================================================
     CE1_VOC_SYNONYME
  ========================================================= */
  {
    kind: "template",
    id: "ce1_voc_synonyme_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_synonyme",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le mot qu'on pourrait mettre à la place sans changer le sens.",
    tags: ["ce1", "vocabulaire", "synonyme", "template"],
    generate: () => {
      const s = randomChoice(SYNONYMES);
      return {
        text: `Quel mot veut dire à peu près la même chose que « ${s.mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(s.autre, s.faux),
        expected: [s.autre],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux synonymes veulent dire à peu près la même chose : on peut échanger l'un contre l'autre.",
          "Fais l'échange dans une phrase : si la phrase garde son sens, c'est un synonyme.",
          `« ${s.mot} » et « ${s.autre} » disent la même chose. Les autres mots parlent d'autre chose.`,
          `Le synonyme est « ${s.autre} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_voc_synonyme_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_synonyme",
    difficulty: 3,
    theme: "neutral",
    hint: "Essaie d'échanger les deux mots dans une phrase. Le sens tient-il ?",
    tags: ["ce1", "vocabulaire", "synonyme", "template"],
    // ⚠️ La première écriture demandait « lequel N'A PAS le même sens que X ? »
    // avec, parmi les propositions, le synonyme d'un AUTRE mot. Il n'avait pas
    // le même sens non plus : la question avait deux bonnes réponses, et rien
    // ne le signalait. On ne présente donc qu'un couple à la fois.
    generate: () => {
      const s = randomChoice(SYNONYMES);
      const vrai = Math.random() < 0.5;
      const second = vrai ? s.autre : randomChoice(s.faux);
      return {
        text: `Vrai ou faux : « ${s.mot} » et « ${second} » veulent dire à peu près la même chose.`,
        format: "qcm" as const,
        choices: ["vrai", "faux"],
        expected: [vrai ? "vrai" : "faux"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux synonymes peuvent s'échanger dans une phrase sans que le sens change.",
          "Fabrique une petite phrase avec le premier mot, puis remplace-le par le second et écoute.",
          vrai
            ? `« ${s.mot} » et « ${s.autre} » disent bien la même chose : on peut mettre l'un pour l'autre.`
            : `« ${s.mot} » veut dire la même chose que « ${s.autre} », pas que « ${second} ». Remplace, et la phrase ne veut plus dire pareil.`,
          vrai ? "C'est vrai." : "C'est faux.",
        ),
      };
    },
  },

  /* =========================================================
     CE1_VOC_ANTONYME
  ========================================================= */
  {
    kind: "template",
    id: "ce1_voc_antonyme_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_antonyme",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le mot qui dit exactement l'inverse.",
    tags: ["ce1", "vocabulaire", "antonyme", "template"],
    generate: () => {
      const a = randomChoice(ANTONYMES);
      return {
        text: `Quel est le contraire de « ${a.mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(a.autre, a.faux),
        expected: [a.autre],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux contraires disent l'inverse l'un de l'autre.",
          "Imagine les deux choses côte à côte : si elles s'opposent, ce sont des contraires.",
          `« ${a.mot} » et « ${a.autre} » s'opposent. Les autres mots sont seulement différents, pas contraires.`,
          `Le contraire de « ${a.mot} » est « ${a.autre} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_voc_antonyme_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_antonyme",
    difficulty: 3,
    theme: "neutral",
    hint: "Le préfixe « in- », « im- » ou « dé- » retourne le sens du mot.",
    tags: ["ce1", "vocabulaire", "antonyme", "template"],
    generate: () => {
      const p = randomChoice(PREFIXES.filter((x) => x.sens === "le contraire"));
      const mot = randomChoice(p.mots);
      const base = mot.slice(p.affixe.replace("-", "").length);
      const autres = shuffle(
        PREFIXES.filter((x) => x.sens !== "le contraire").map((x) => x.mots[0]),
      ).slice(0, 3);
      return {
        text: `Quel mot veut dire le contraire de « ${base} » ?`,
        format: "qcm" as const,
        choices: makeChoices(mot, [base, ...autres]),
        expected: [mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "On peut fabriquer un contraire en collant un préfixe au début : dé-, in-, im-.",
          "Essaie de poser le préfixe devant et dis le mot à voix haute : si ça se dit, c'est le bon.",
          `${base} → ${mot}. Le préfixe « ${p.affixe} » a retourné le sens sans toucher au reste du mot.`,
          `Le contraire de « ${base} » est « ${mot} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_VOC_GENERIQUE_SPECIFIQUE — du général au particulier
  ========================================================= */
  {
    kind: "template",
    id: "ce1_voc_generique_specifique_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_generique_specifique",
    difficulty: 2,
    theme: "reunion",
    hint: "Cherche le mot qui les contient tous.",
    tags: ["ce1", "vocabulaire", "generique", "template"],
    generate: () => {
      const g = randomChoice(GENERIQUES);
      const autres = shuffle(GENERIQUES.filter((x) => x.generique !== g.generique))
        .slice(0, 3)
        .map((x) => x.generique);
      return {
        text: `${g.specifiques.slice(0, 3).join(" · ")}\n\nQuel mot les regroupe tous ?`,
        format: "qcm" as const,
        choices: makeChoices(g.generique, autres),
        expected: [g.generique],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un terme générique est un mot large : il contient tous les autres, comme une boite.",
          "Demande-toi : « tout ça, c'est quoi ? » La réponse est le mot général.",
          `${g.specifiques.slice(0, 3).join(", ")} : tout ça, c'est ${g.generique}.`,
          `Le mot qui les regroupe est « ${g.generique} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_voc_generique_specifique_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_generique_specifique",
    difficulty: 2,
    theme: "reunion",
    hint: "Trois vont dans la même boite, un seul n'y entre pas.",
    tags: ["ce1", "vocabulaire", "generique", "template"],
    generate: () => {
      const g = randomChoice(GENERIQUES);
      return {
        text: `Lequel de ces mots n'est PAS ${g.generique} ?`,
        format: "qcm" as const,
        choices: shuffle([g.intrus, ...shuffle(g.specifiques).slice(0, 3)]),
        expected: [g.intrus],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot particulier entre dans la boite du mot général — ou n'y entre pas.",
          "Pose la question pour chacun : est-ce que c'est bien ça ?",
          `${g.specifiques.slice(0, 3).join(", ")} sont ${g.generique}. « ${g.intrus} », non.`,
          `« ${g.intrus} » n'est pas ${g.generique}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_voc_generique_specifique_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_generique_specifique",
    difficulty: 3,
    theme: "neutral",
    text: "Range du plus GÉNÉRAL au plus PARTICULIER : fromage · aliment · laitage.",
    format: "qcm",
    choices: [
      "aliment → laitage → fromage",
      "fromage → laitage → aliment",
      "laitage → aliment → fromage",
      "fromage → aliment → laitage",
    ],
    expected: ["aliment → laitage → fromage"],
    comparator: "mcq_exact",
    hint: "La plus grande boite d'abord, la plus petite à la fin.",
    explanation: exp(
      "Les mots se rangent comme des boites : la grande contient la moyenne, qui contient la petite.",
      "Demande-toi ce qui contient quoi : un fromage est un laitage, et un laitage est un aliment.",
      "aliment (tout ce qui se mange) → laitage (ce qui vient du lait) → fromage (un laitage précis).",
      "L'ordre est : aliment → laitage → fromage.",
    ),
    tags: ["ce1", "vocabulaire", "generique", "remarquable", "qcm"],
  },

  /* =========================================================
     CE1_VOC_NIVEAUX_LANGUE
  ========================================================= */
  {
    kind: "template",
    id: "ce1_voc_niveaux_langue_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_niveaux_langue",
    difficulty: 2,
    theme: "neutral",
    hint: "Lequel dirais-tu à un copain, et lequel écrirais-tu dans un cahier ?",
    tags: ["ce1", "vocabulaire", "registre", "template"],
    generate: () => {
      const r = randomChoice(REGISTRES);
      return {
        text: `« ${r.familier} » et « ${r.courant} » veulent dire la même chose.\n\nLequel se dit entre copains, mais ne s'écrit pas dans un cahier ?`,
        format: "qcm" as const,
        choices: shuffle([r.familier, r.courant]),
        expected: [r.familier],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "On ne parle pas pareil à un copain et à la maitresse. C'est le niveau de langue.",
          "Demande-toi : est-ce que je l'écrirais dans un cahier ? Si non, c'est du langage familier.",
          `« ${r.familier} » est familier : ça se dit dans la cour. « ${r.courant} » est courant : ça se dit et ça s'écrit partout.`,
          `Le mot familier est « ${r.familier} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_voc_niveaux_langue_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_niveaux_langue",
    difficulty: 3,
    theme: "neutral",
    hint: "Le mot courant est celui qu'on peut dire et écrire partout.",
    tags: ["ce1", "vocabulaire", "registre", "template"],
    generate: () => {
      const r = randomChoice(REGISTRES);
      const autres = shuffle(REGISTRES.filter((x) => x.courant !== r.courant))
        .slice(0, 2)
        .map((x) => x.courant);
      return {
        text: `Comment dit-on « ${r.familier} » en langage courant ?`,
        format: "qcm" as const,
        choices: makeChoices(r.courant, [r.familier, ...autres]),
        expected: [r.courant],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le langage courant est celui qu'on peut employer partout : à l'école comme à la maison.",
          "Cherche le mot que la maitresse écrirait au tableau.",
          `« ${r.familier} » (familier) → « ${r.courant} » (courant) → « ${r.soutenu} » (soutenu, dans les livres).`,
          `En langage courant, on dit « ${r.courant} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_VOC_POLYSEMIE — un mot, plusieurs sens
  ========================================================= */
  {
    kind: "template",
    id: "ce1_voc_polysemie_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_polysemie",
    difficulty: 2,
    theme: "neutral",
    hint: "Le mot ne change pas. C'est la phrase autour qui décide du sens.",
    tags: ["ce1", "vocabulaire", "polysemie", "template"],
    generate: () => {
      const p = randomChoice(POLYSEMES);
      const s = randomChoice(p.sens);
      const autresSens = shuffle(
        POLYSEMES.filter((x) => x.mot !== p.mot).flatMap((x) => x.sens.map((y) => y.sens)),
      ).slice(0, 2);
      const autreSensDuMot = p.sens.find((x) => x.sens !== s.sens);
      return {
        text: `« ${s.phrase} »\n\nQue veut dire « ${p.mot} » dans cette phrase ?`,
        format: "qcm" as const,
        choices: makeChoices(s.sens, [
          ...(autreSensDuMot ? [autreSensDuMot.sens] : []),
          ...autresSens,
        ]),
        expected: [s.sens],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un même mot peut avoir plusieurs sens. Rien dans le mot ne dit lequel : c'est la phrase autour qui décide.",
          "Relis toute la phrase et demande-toi de quoi on parle vraiment.",
          `Ici, « ${p.mot} » veut dire ${s.sens}.${autreSensDuMot ? ` Ailleurs, le même mot veut dire ${autreSensDuMot.sens} — « ${autreSensDuMot.phrase} »` : ""}`,
          `Dans cette phrase, « ${p.mot} » veut dire ${s.sens}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_voc_polysemie_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_polysemie",
    difficulty: 3,
    theme: "neutral",
    hint: "Les deux phrases contiennent le même mot, écrit exactement pareil.",
    tags: ["ce1", "vocabulaire", "polysemie", "template"],
    generate: () => {
      const p = randomChoice(POLYSEMES);
      const autres = shuffle(POLYSEMES.filter((x) => x.mot !== p.mot))
        .slice(0, 3)
        .map((x) => x.mot);
      return {
        text: `« ${p.sens[0].phrase} »\n« ${p.sens[1].phrase} »\n\nQuel mot est écrit pareil dans les deux phrases, mais ne veut pas dire la même chose ?`,
        format: "qcm" as const,
        choices: makeChoices(p.mot, autres),
        expected: [p.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot qui a plusieurs sens s'écrit toujours de la même façon : seul le sens change.",
          "Cherche le mot qui revient dans les deux phrases, puis demande-toi ce qu'il désigne à chaque fois.",
          `« ${p.mot} » : ${p.sens[0].sens} dans la première, ${p.sens[1].sens} dans la seconde.`,
          `C'est le mot « ${p.mot} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_VOC_SENS_PROPRE_FIGURE — l'exemple est du BO
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_voc_sens_propre_figure_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_sens_propre_figure",
    difficulty: 3,
    theme: "neutral",
    text: "« Léa souffle ses bougies. » et « Tom souffle la réponse à son voisin. »\n\nDans laquelle le mot « souffle » garde son sens de tous les jours ?",
    format: "qcm",
    choices: [
      "La première : elle envoie vraiment de l'air",
      "La seconde : il envoie vraiment de l'air",
      "Les deux",
      "Aucune des deux",
    ],
    expected: ["La première : elle envoie vraiment de l'air"],
    comparator: "mcq_exact",
    hint: "Dans laquelle est-ce qu'on souffle pour de vrai ?",
    explanation: exp(
      "Le sens propre est le sens de tous les jours, celui qu'on peut voir. Le sens figuré est une image.",
      "Demande-toi si ça se passe pour de vrai. Si oui, c'est le sens propre.",
      "Léa envoie de l'air sur ses bougies : c'est du vrai souffle. Tom, lui, dit la réponse tout bas — personne ne voit d'air sortir.",
      "C'est la première.",
    ),
    tags: ["ce1", "vocabulaire", "sens-figure", "remarquable", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_voc_sens_propre_figure_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_sens_propre_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Est-ce que ça se passe pour de vrai, ou est-ce une image ?",
    tags: ["ce1", "vocabulaire", "sens-figure", "template"],
    generate: () => {
      const f = randomChoice(FIGURES);
      const propre = Math.random() < 0.5;
      const phrase = propre ? f.propre : f.figure;
      const bon = propre ? "au sens propre : ça se passe pour de vrai" : "au sens figuré : c'est une image";
      return {
        text: `« ${phrase} »\n\nLe mot « ${f.mot} » est-il employé au sens propre ou au sens figuré ?`,
        format: "qcm" as const,
        choices: [
          "au sens propre : ça se passe pour de vrai",
          "au sens figuré : c'est une image",
        ],
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le sens propre se voit et se touche. Le sens figuré est une image : on ne peut pas le photographier.",
          "Essaie de faire un dessin de la phrase : si tu n'y arrives pas, c'est du sens figuré.",
          propre
            ? `« ${f.propre } » : ça se passe vraiment. Mais « ${f.figure} » veut dire ${f.sensFigure} — et là, on ne peut rien dessiner.`
            : `« ${f.figure} » veut dire ${f.sensFigure}. Le vrai sens du mot, on le voit dans « ${f.propre} ».`,
          `Ici, c'est ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_voc_sens_propre_figure_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_sens_propre_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche ce que la phrase veut VRAIMENT dire, pas ce qu'elle dit mot à mot.",
    tags: ["ce1", "vocabulaire", "sens-figure", "template"],
    generate: () => {
      const f = randomChoice(FIGURES);
      const autres = shuffle(FIGURES.filter((x) => x.mot !== f.mot))
        .slice(0, 3)
        .map((x) => x.sensFigure);
      return {
        text: `« ${f.figure} »\n\nQue veut dire cette phrase ?`,
        format: "qcm" as const,
        choices: makeChoices(f.sensFigure, autres),
        expected: [f.sensFigure],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Au sens figuré, la phrase ne dit pas ce qu'elle a l'air de dire : elle fabrique une image.",
          "Oublie le mot à mot et demande-toi ce que la personne veut vraiment faire comprendre.",
          `« ${f.figure} » veut dire ${f.sensFigure}. Au sens propre, « ${f.mot} », c'est ce qui se passe dans « ${f.propre} »`,
          `Cette phrase veut dire ${f.sensFigure}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_VOC_EXPRESSIONS
  ========================================================= */
  {
    kind: "template",
    id: "ce1_voc_expressions_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_expressions",
    difficulty: 2,
    theme: "neutral",
    hint: "Une expression ne se comprend pas mot à mot.",
    tags: ["ce1", "vocabulaire", "expressions", "template"],
    generate: () => {
      const e = randomChoice(EXPRESSIONS);
      return {
        text: `Que veut dire « ${e.expression} » ?`,
        format: "qcm" as const,
        choices: makeChoices(e.sens, e.faux),
        expected: [e.sens],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une expression est un groupe de mots qui, ensemble, veut dire autre chose que chaque mot pris à part.",
          "Ne traduis pas mot à mot : demande-toi dans quelle situation on dit ça.",
          `« ${e.expression} » veut dire ${e.sens}. Mot à mot, la phrase n'aurait aucun sens.`,
          `Cela veut dire ${e.sens}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_voc_expressions_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_expressions",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche l'expression qui va avec cette situation-là.",
    tags: ["ce1", "vocabulaire", "expressions", "template"],
    generate: () => {
      const e = randomChoice(EXPRESSIONS);
      const autres = shuffle(EXPRESSIONS.filter((x) => x.expression !== e.expression))
        .slice(0, 3)
        .map((x) => x.expression);
      return {
        text: `Quelle expression veut dire « ${e.sens} » ?`,
        format: "qcm" as const,
        choices: makeChoices(e.expression, autres),
        expected: [e.expression],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chaque expression a son sens à elle, qu'on apprend en l'entendant.",
          "Repère le mot qui donne l'image : la peur bleue, le cœur d'or, la main verte.",
          `« ${e.expression} » veut dire ${e.sens}.`,
          `C'est « ${e.expression} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_VOC_DICTIONNAIRE
  ========================================================= */
  {
    kind: "template",
    id: "ce1_voc_dictionnaire_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_dictionnaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Un dictionnaire range les mots dans l'ordre de l'alphabet.",
    tags: ["ce1", "vocabulaire", "dictionnaire", "template"],
    generate: () => {
      const quatre = shuffle(MOTS_ALPHABET).slice(0, 4);
      const premier = [...quatre].sort((a, b) => a.localeCompare(b, "fr"))[0];
      return {
        text: `Dans le dictionnaire, lequel de ces mots vient en PREMIER ?\n\n${quatre.join(" · ")}`,
        format: "qcm" as const,
        choices: shuffle(quatre),
        expected: [premier],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un dictionnaire range les mots dans l'ordre de l'alphabet : a, b, c, d…",
          "Compare d'abord les premières lettres. Si elles sont pareilles, passe à la deuxième.",
          `Ici, « ${premier} » arrive avant les autres.`,
          `Le premier est « ${premier} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_voc_dictionnaire_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_dictionnaire",
    difficulty: 3,
    theme: "reunion",
    hint: "Regarde les petites lettres juste après le mot : n. f., n. m., v., adj.",
    tags: ["ce1", "vocabulaire", "dictionnaire", "template"],
    generate: () => {
      const a = randomChoice(ARTICLES);
      const autres = shuffle([
        ...new Set(ARTICLES.filter((x) => x.classeLongue !== a.classeLongue).map((x) => x.classeLongue)),
      ]).slice(0, 3);
      return {
        text: `Voici un article de dictionnaire :\n\n${a.mot}, ${a.classe} — ${a.definition}\nEx. : ${a.exemple}\n\nQue nous apprend « ${a.classe} » juste après le mot ?`,
        format: "qcm" as const,
        choices: makeChoices(a.classeLongue, autres),
        expected: [a.classeLongue],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Dans un article de dictionnaire, les petites lettres après le mot disent sa classe : n. m. et n. f. pour les noms, v. pour les verbes, adj. pour les adjectifs.",
          "Repère l'abréviation, puis lis la définition et l'exemple.",
          `« ${a.mot}, ${a.classe} » : c'est donc ${a.classeLongue}.`,
          `« ${a.classe} » veut dire : ${a.classeLongue}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_voc_dictionnaire_tpl_3",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_dictionnaire",
    difficulty: 2,
    theme: "reunion",
    hint: "La définition explique le mot. L'exemple le montre dans une phrase.",
    tags: ["ce1", "vocabulaire", "dictionnaire", "template"],
    generate: () => {
      const a = randomChoice(ARTICLES);
      const autres = shuffle(ARTICLES.filter((x) => x.mot !== a.mot))
        .slice(0, 3)
        .map((x) => x.definition);
      return {
        text: `Dans le dictionnaire, quelle définition trouve-t-on au mot « ${a.mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(a.definition, autres),
        expected: [a.definition],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La définition d'un dictionnaire explique le mot avec d'autres mots, plus simples.",
          "Lis la définition, puis vérifie avec l'exemple : les deux doivent aller ensemble.",
          `${a.mot}, ${a.classe} — ${a.definition} Ex. : ${a.exemple}`,
          `La définition est : ${a.definition}`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_VOC_DEFI
  ========================================================= */
  {
    kind: "template",
    id: "ce1_voc_defi_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux choses à trouver : le contraire, puis comment il est fabriqué.",
    tags: ["ce1", "vocabulaire", "defi", "template"],
    generate: () => {
      const p = randomChoice(PREFIXES.filter((x) => x.sens === "le contraire"));
      const mot = randomChoice(p.mots);
      const base = mot.slice(p.affixe.replace("-", "").length);
      const bon = `« ${mot} », fabriqué avec le préfixe « ${p.affixe} »`;
      // ⚠️ « mal- » est écarté du vivier : « malpoli » est un contraire de
      // « poli » AUTANT que « impoli ». La question aurait eu deux bonnes
      // réponses, sur un énoncé parfaitement bien formé.
      const autresPrefixes = shuffle(
        PREFIXES.filter((x) => x.sens !== "le contraire" && x.sens !== "mal, de travers"),
      ).slice(0, 3);
      return {
        text: `Quel est le contraire de « ${base} », et comment ce mot est-il fabriqué ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          ...autresPrefixes.map(
            (x) => `« ${x.affixe.replace("-", "")}${base} », fabriqué avec le préfixe « ${x.affixe} »`,
          ),
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un contraire se fabrique souvent en collant un préfixe au début du mot. Encore faut-il le bon.",
          "Essaie les préfixes à voix haute : un seul se dit vraiment.",
          `${base} → ${mot}. « ${p.affixe} » veut dire ${p.sens}, et c'est celui-là qui se dit.`,
          `C'est ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_voc_defi_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Une seule réponse est juste des deux côtés : le sens ET le niveau de langue.",
    tags: ["ce1", "vocabulaire", "defi", "template"],
    generate: () => {
      const r = randomChoice(REGISTRES);
      const autre = randomChoice(REGISTRES.filter((x) => x.courant !== r.courant));
      const bon = `« ${r.courant} », et c'est du langage courant`;
      return {
        text: `« ${r.familier} » : comment dit-on la même chose sans langage familier ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `« ${r.courant} », et c'est du langage familier`,
          `« ${autre.courant} », et c'est du langage courant`,
          `« ${r.familier} », et c'est déjà du langage courant`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une réponse n'est juste que si TOUT est juste : le mot, et le niveau de langue.",
          "Trouve d'abord le mot qui veut dire la même chose, puis vérifie qu'il s'écrirait dans un cahier.",
          `« ${r.familier} » se dit entre copains. « ${r.courant} » se dit et s'écrit partout : c'est du langage courant.`,
          `La réponse juste est : ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_voc_defi_meth_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce1_voc_defi",
    difficulty: 3,
    theme: "reunion",
    text: "« Le pêcheur pose sa nasse dans le lagon pour attraper des poissons. »\n\nTu ne connais pas le mot « nasse ». Comment peux-tu quand même deviner ce que c'est ?",
    format: "qcm",
    choices: [
      "La phrase le dit juste après : « pour attraper des poissons ». C'est donc un piège à poissons.",
      // L'erreur réelle : chercher dans le mot au lieu de chercher autour.
      "Je regarde sa première lettre et je cherche un mot connu qui commence pareil.",
      "Je saute le mot : il n'est pas important.",
      "Je cherche dans le dictionnaire : c'est le seul moyen.",
    ],
    expected: [
      "La phrase le dit juste après : « pour attraper des poissons ». C'est donc un piège à poissons.",
    ],
    comparator: "mcq_exact",
    hint: "Qu'est-ce que la phrase dit AUTOUR du mot ?",
    explanation: exp(
      "Un mot inconnu se devine presque toujours grâce à la phrase qui l'entoure.",
      "Relis la phrase entière et cherche ce que la chose FAIT, ou à quoi elle SERT.",
      "« pour attraper des poissons » : c'est écrit juste après. Une nasse sert donc à attraper des poissons — c'est un piège. On n'a pas eu besoin du dictionnaire.",
      "La phrase dit « pour attraper des poissons » : c'est elle qui donne la réponse.",
    ),
    tags: ["ce1", "vocabulaire", "defi", "methode", "qcm"],
  },
];
