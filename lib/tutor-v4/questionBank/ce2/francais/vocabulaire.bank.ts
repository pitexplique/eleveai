// lib/tutor-v4/questionBank/ce2/francais/vocabulaire.bank.ts
//
// Le vocabulaire du CE2 — quinze micro-compétences, la plus grosse notion de
// la classe.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, CE2). Le BO donne lui-même trois
// exemples, et ils sont repris tels quels ici :
//   — la GRADATION : « la crainte, la peur, l'épouvante » ;
//   — la DÉRIVATION : « port / portuaire / aéroport » ;
//   — le SENS PROPRE ET FIGURÉ : « souffler ses bougies / souffler une
//     réponse ».
// S'y ajoutent : six corpus par période, les niveaux de langue selon les
// interlocuteurs, le dictionnaire, et le répertoire lexical personnel.
//
// CE QUI MANQUAIT : la gradation, la dérivation, le sens figuré, les niveaux de
// langue et le répertoire personnel n'avaient jamais eu une seule question.
//
// L'ÎLE EST DANS LES MOTS, au même titre que le reste : letchi, lagon,
// margouillat, cari, piton, tamarin, case. Pas comme décor — comme vocabulaire.
// Un enfant d'ici doit pouvoir ranger « margouillat » dans « les animaux » sans
// avoir à traduire d'abord.
//
// ⚠️ UNE SEULE BONNE RÉPONSE. C'est le piège permanent du vocabulaire :
// « joyeux » est un synonyme de « content », mais « gai » aussi, et « ravi »
// presque. Les distracteurs sont donc pris dans des CHAMPS ÉLOIGNÉS — jamais
// dans le même champ que la réponse — et chaque série est écrite à la main.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function choix(correct: string, ...reserves: readonly (readonly string[])[]): string[] {
  const vus = new Set<string>([correct]);
  const faux: string[] = [];
  for (const mot of shuffle(reserves.flat())) {
    if (vus.has(mot)) continue;
    vus.add(mot);
    faux.push(mot);
    if (faux.length === 3) break;
  }
  return shuffle([correct, ...faux]);
}

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPRENDRE UN MOT PAR LE CONTEXTE
   ═══════════════════════════════════════════════════════════════════════════ */

type MotEnContexte = {
  readonly phrase: string;
  readonly mot: string;
  readonly sens: string;
  readonly indice: string;
  readonly faux: readonly string[];
};

const CONTEXTES: readonly MotEnContexte[] = [
  {
    phrase: "Le pêcheur remonte sa nasse pleine de poissons.",
    mot: "nasse",
    sens: "un panier pour attraper les poissons",
    indice: "« remonte » et « pleine de poissons »",
    faux: ["une petite barque", "un filet déchiré", "une chanson de marin"],
  },
  {
    phrase: "Le sentier serpente entre les champs de cannes.",
    mot: "serpente",
    sens: "fait des courbes",
    indice: "« sentier » et « entre les champs »",
    faux: ["monte tout droit", "s'arrête brusquement", "descend très vite"],
  },
  {
    phrase: "Il a englouti son cari en deux minutes.",
    mot: "englouti",
    sens: "mangé très vite",
    indice: "« en deux minutes »",
    faux: ["préparé avec soin", "laissé refroidir", "partagé avec sa sœur"],
  },
  {
    phrase: "Elle scrute l'horizon pour apercevoir le bateau.",
    mot: "scrute",
    sens: "regarde très attentivement",
    indice: "« pour apercevoir »",
    faux: ["dessine sur une feuille", "écoute sans bouger", "appelle très fort"],
  },
  {
    phrase: "Le vent a couché les hautes herbes du terrain.",
    mot: "couché",
    sens: "fait tomber à plat",
    indice: "« le vent » et « les hautes herbes »",
    faux: ["fait pousser plus vite", "arrosé toute la nuit", "coupé bien net"],
  },
  {
    phrase: "Un vacarme monte de la cour de récréation.",
    mot: "vacarme",
    sens: "un très grand bruit",
    indice: "« la cour de récréation »",
    faux: ["un silence complet", "une odeur de cuisine", "une lumière très forte"],
  },
  {
    phrase: "Le chemin devient escarpé avant le sommet.",
    mot: "escarpé",
    sens: "très pentu, difficile à monter",
    indice: "« avant le sommet »",
    faux: ["tout plat et facile", "couvert de sable fin", "bordé de maisons"],
  },
  {
    phrase: "Il a esquissé un sourire avant de repartir.",
    mot: "esquissé",
    sens: "fait à peine, tout petit",
    indice: "« avant de repartir »",
    faux: ["éclaté de rire très fort", "caché derrière sa main", "gardé pendant une heure"],
  },
  {
    phrase: "La chaleur est accablante au milieu de la journée.",
    mot: "accablante",
    sens: "très pénible à supporter",
    indice: "« au milieu de la journée »",
    faux: ["agréable et légère", "impossible à mesurer", "attendue depuis longtemps"],
  },
  {
    phrase: "Les touristes admirent le panorama depuis le piton.",
    mot: "panorama",
    sens: "la vue très large qu'on a de haut",
    indice: "« depuis le piton »",
    faux: ["le bruit de la forêt", "un sentier très étroit", "le nom d'un village"],
  },
  {
    phrase: "Le margouillat s'est immobilisé sur la pierre chaude.",
    mot: "immobilisé",
    sens: "arrêté sans plus bouger du tout",
    indice: "« sur la pierre chaude »",
    faux: ["mis à courir très vite", "endormi pour la nuit", "caché sous une feuille"],
  },
  {
    phrase: "Mamie a émincé les oignons pour le cari.",
    mot: "émincé",
    sens: "coupé en tranches très fines",
    indice: "« pour le cari »",
    faux: ["fait cuire à l'eau", "acheté au marché", "épluché puis jeté"],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   FAMILLES DE MOTS ET DÉRIVATION — l'exemple du BO : port / portuaire / aéroport
   ═══════════════════════════════════════════════════════════════════════════ */

type FamilleLexicale = {
  readonly radical: string;
  readonly derives: readonly string[];
  readonly intrus: string;
};

const FAMILLES_LEXICALES: readonly FamilleLexicale[] = [
  { radical: "port", derives: ["portuaire", "aéroport", "porter"], intrus: "porte" },
  { radical: "terre", derives: ["terrain", "atterrir", "souterrain"], intrus: "tirer" },
  { radical: "mer", derives: ["marin", "maritime", "sous-marin"], intrus: "mère" },
  { radical: "jour", derives: ["journée", "journal", "bonjour"], intrus: "jouer" },
  { radical: "fleur", derives: ["fleuriste", "fleurir", "floraison"], intrus: "fleuve" },
  { radical: "dent", derives: ["dentiste", "dentaire", "dentifrice"], intrus: "dedans" },
  { radical: "chant", derives: ["chanter", "chanteur", "chanson"], intrus: "champ" },
  { radical: "froid", derives: ["froideur", "refroidir", "frigo"], intrus: "fraise" },
  { radical: "long", derives: ["longueur", "allonger", "rallonge"], intrus: "langue" },
  { radical: "livre", derives: ["librairie", "libraire", "livret"], intrus: "libre" },
  { radical: "école", derives: ["écolier", "scolaire", "scolarité"], intrus: "écouter" },
  { radical: "feuille", derives: ["feuillage", "feuilleter", "feuillu"], intrus: "fauteuil" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PRÉFIXES, SUFFIXES, ET PRÉFIXES NÉGATIFS
   ═══════════════════════════════════════════════════════════════════════════ */

type Affixe = {
  readonly mot: string;
  readonly base: string;
  readonly affixe: string;
  readonly type: "préfixe" | "suffixe";
  readonly sens: string;
};

const AFFIXES: readonly Affixe[] = [
  { mot: "refaire", base: "faire", affixe: "re-", type: "préfixe", sens: "faire une deuxième fois" },
  { mot: "relire", base: "lire", affixe: "re-", type: "préfixe", sens: "lire une deuxième fois" },
  { mot: "repartir", base: "partir", affixe: "re-", type: "préfixe", sens: "partir à nouveau" },
  { mot: "prévoir", base: "voir", affixe: "pré-", type: "préfixe", sens: "voir à l'avance" },
  { mot: "chanteur", base: "chanter", affixe: "-eur", type: "suffixe", sens: "celui qui chante" },
  { mot: "nageur", base: "nager", affixe: "-eur", type: "suffixe", sens: "celui qui nage" },
  { mot: "dentiste", base: "dent", affixe: "-iste", type: "suffixe", sens: "celui qui soigne les dents" },
  { mot: "fleuriste", base: "fleur", affixe: "-iste", type: "suffixe", sens: "celui qui vend des fleurs" },
  { mot: "maisonnette", base: "maison", affixe: "-ette", type: "suffixe", sens: "une petite maison" },
  { mot: "tablette", base: "table", affixe: "-ette", type: "suffixe", sens: "une petite table" },
  { mot: "lavage", base: "laver", affixe: "-age", type: "suffixe", sens: "l'action de laver" },
  { mot: "pliage", base: "plier", affixe: "-age", type: "suffixe", sens: "l'action de plier" },
  { mot: "lavable", base: "laver", affixe: "-able", type: "suffixe", sens: "qu'on peut laver" },
  { mot: "portuaire", base: "port", affixe: "-aire", type: "suffixe", sens: "qui concerne le port" },
];

type PrefixeNegatif = {
  readonly mot: string;
  readonly base: string;
  readonly prefixe: string;
  readonly sens: string;
};

const PREFIXES_NEGATIFS: readonly PrefixeNegatif[] = [
  { mot: "défaire", base: "faire", prefixe: "dé-", sens: "faire le contraire de faire" },
  { mot: "déplier", base: "plier", prefixe: "dé-", sens: "faire le contraire de plier" },
  { mot: "décoller", base: "coller", prefixe: "dé-", sens: "faire le contraire de coller" },
  { mot: "démonter", base: "monter", prefixe: "dé-", sens: "faire le contraire de monter" },
  { mot: "désordre", base: "ordre", prefixe: "dés-", sens: "le contraire de l'ordre" },
  { mot: "désobéir", base: "obéir", prefixe: "dés-", sens: "le contraire d'obéir" },
  { mot: "impossible", base: "possible", prefixe: "im-", sens: "qui n'est pas possible" },
  { mot: "impoli", base: "poli", prefixe: "im-", sens: "qui n'est pas poli" },
  { mot: "invisible", base: "visible", prefixe: "in-", sens: "qu'on ne peut pas voir" },
  { mot: "incapable", base: "capable", prefixe: "in-", sens: "qui n'est pas capable" },
  { mot: "malheureux", base: "heureux", prefixe: "mal-", sens: "qui n'est pas heureux" },
  { mot: "maladroit", base: "adroit", prefixe: "mal-", sens: "qui n'est pas adroit" },
  { mot: "irréel", base: "réel", prefixe: "ir-", sens: "qui n'est pas réel" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   SYNONYMES ET ANTONYMES

   ⚠️ Un seul synonyme par ligne, et les distracteurs viennent d'AUTRES lignes :
   « joyeux » et « gai » conviennent tous les deux pour « content », et l'élève
   aurait deux bonnes réponses.
   ═══════════════════════════════════════════════════════════════════════════ */

type Trio = {
  readonly mot: string;
  readonly synonyme: string;
  readonly antonyme: string;
};

const SYNONYMES: readonly Trio[] = [
  { mot: "grand", synonyme: "immense", antonyme: "petit" },
  { mot: "content", synonyme: "joyeux", antonyme: "triste" },
  { mot: "rapide", synonyme: "véloce", antonyme: "lent" },
  { mot: "beau", synonyme: "joli", antonyme: "laid" },
  { mot: "chaud", synonyme: "brulant", antonyme: "froid" },
  { mot: "facile", synonyme: "simple", antonyme: "difficile" },
  { mot: "fort", synonyme: "puissant", antonyme: "faible" },
  { mot: "calme", synonyme: "tranquille", antonyme: "agité" },
  { mot: "vieux", synonyme: "ancien", antonyme: "neuf" },
  { mot: "clair", synonyme: "lumineux", antonyme: "sombre" },
  { mot: "gentil", synonyme: "aimable", antonyme: "méchant" },
  { mot: "propre", synonyme: "net", antonyme: "sale" },
  { mot: "bruyant", synonyme: "sonore", antonyme: "silencieux" },
  { mot: "riche", synonyme: "fortuné", antonyme: "pauvre" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LA GRADATION — l'exemple du BO : la crainte, la peur, l'épouvante
   ═══════════════════════════════════════════════════════════════════════════ */

type Gradation = {
  /** Du plus faible au plus fort. Toujours trois crans. */
  readonly echelle: readonly string[];
  readonly idee: string;
};

const GRADATIONS: readonly Gradation[] = [
  { echelle: ["la crainte", "la peur", "l'épouvante"], idee: "avoir peur" },
  { echelle: ["content", "joyeux", "ravi"], idee: "être content" },
  { echelle: ["tiède", "chaud", "brulant"], idee: "la chaleur" },
  { echelle: ["petit", "minuscule", "microscopique"], idee: "la petitesse" },
  { echelle: ["grand", "immense", "gigantesque"], idee: "la grandeur" },
  { echelle: ["fatigué", "épuisé", "exténué"], idee: "la fatigue" },
  { echelle: ["bon", "délicieux", "exquis"], idee: "le gout" },
  { echelle: ["humide", "mouillé", "trempé"], idee: "l'eau sur soi" },
  { echelle: ["vieux", "ancien", "antique"], idee: "l'âge" },
  { echelle: ["murmurer", "parler", "crier"], idee: "la force de la voix" },
  { echelle: ["surpris", "étonné", "stupéfait"], idee: "la surprise" },
  { echelle: ["ennuyé", "fâché", "furieux"], idee: "la colère" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   DU GÉNÉRAL AU PARTICULIER
   ═══════════════════════════════════════════════════════════════════════════ */

type Categorie = {
  readonly generique: string;
  readonly membres: readonly string[];
  readonly intrus: string;
};

const CATEGORIES: readonly Categorie[] = [
  { generique: "un fruit", membres: ["un letchi", "une mangue", "une banane"], intrus: "une brouette" },
  { generique: "un animal", membres: ["un margouillat", "un chien", "un oiseau"], intrus: "un cahier" },
  { generique: "un meuble", membres: ["une table", "une chaise", "une armoire"], intrus: "une mangue" },
  { generique: "un véhicule", membres: ["une voiture", "un bateau", "un vélo"], intrus: "un tamarin" },
  { generique: "un arbre", membres: ["un tamarin", "un filao", "un manguier"], intrus: "un bateau" },
  { generique: "un vêtement", membres: ["une robe", "une chemise", "un pantalon"], intrus: "un marteau" },
  { generique: "un métier", membres: ["un pêcheur", "un boulanger", "un dentiste"], intrus: "un letchi" },
  { generique: "un instrument de musique", membres: ["une guitare", "un tambour", "une flute"], intrus: "une armoire" },
  { generique: "une fleur", membres: ["une rose", "un hibiscus", "une orchidée"], intrus: "un tambour" },
  { generique: "un outil", membres: ["un marteau", "un tournevis", "une scie"], intrus: "une orchidée"},
];

/* ═══════════════════════════════════════════════════════════════════════════
   LA POLYSÉMIE — un mot, deux sens selon le contexte
   ═══════════════════════════════════════════════════════════════════════════ */

type Polyseme = {
  readonly mot: string;
  readonly phraseA: string;
  readonly sensA: string;
  readonly phraseB: string;
  readonly sensB: string;
};

const POLYSEMES: readonly Polyseme[] = [
  {
    mot: "glace",
    phraseA: "Je me regarde dans la glace de la salle de bain.",
    sensA: "un miroir",
    phraseB: "J'ai mangé une glace au coco.",
    sensB: "un dessert glacé",
  },
  {
    mot: "feuille",
    phraseA: "Une feuille est tombée du tamarin.",
    sensA: "la partie verte d'un arbre",
    phraseB: "Écris ton nom sur ta feuille.",
    sensB: "un morceau de papier",
  },
  {
    mot: "souris",
    phraseA: "Une souris court sous l'armoire.",
    sensA: "un petit animal",
    phraseB: "Clique avec la souris de l'ordinateur.",
    sensB: "l'objet qui déplace le curseur",
  },
  {
    mot: "carte",
    phraseA: "Cherche La Réunion sur la carte.",
    sensA: "un dessin du monde ou d'un pays",
    phraseB: "Il lui reste une carte à jouer.",
    sensB: "un carton d'un jeu",
  },
  {
    mot: "bouton",
    phraseA: "Un bouton manque à ta chemise.",
    sensA: "la petite pièce qui ferme un vêtement",
    phraseB: "Le bouton de la fleur va s'ouvrir.",
    sensB: "une fleur pas encore ouverte",
  },
  {
    mot: "pièce",
    phraseA: "Il a trouvé une pièce de deux euros.",
    sensA: "une monnaie en métal",
    phraseB: "Cette pièce de la case est la plus fraiche.",
    sensB: "une salle d'une maison",
  },
  {
    mot: "règle",
    phraseA: "Trace un trait avec ta règle.",
    sensA: "l'objet plat qui sert à tracer",
    phraseB: "Tu n'as pas respecté la règle du jeu.",
    sensB: "ce qu'il faut suivre",
  },
  {
    mot: "tour",
    phraseA: "C'est à ton tour de jouer.",
    sensA: "le moment où c'est à toi",
    phraseB: "On voit la tour depuis la plage.",
    sensB: "un bâtiment très haut",
  },
  {
    mot: "bureau",
    phraseA: "Range tes crayons dans ton bureau.",
    sensA: "un meuble pour travailler",
    phraseB: "Maman travaille dans un bureau en ville.",
    sensB: "une salle où l'on travaille",
  },
  {
    mot: "cœur",
    phraseA: "Le cœur bat plus vite quand on court.",
    sensA: "l'organe qui envoie le sang",
    phraseB: "Il connait sa poésie par cœur.",
    sensB: "de mémoire, sans regarder",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   SENS PROPRE ET SENS FIGURÉ — l'exemple du BO est le premier de la liste
   ═══════════════════════════════════════════════════════════════════════════ */

type SensFigure = {
  readonly verbe: string;
  readonly propre: string;
  readonly figure: string;
  readonly sensFigure: string;
};

const SENS_FIGURES: readonly SensFigure[] = [
  {
    verbe: "souffler",
    propre: "Il souffle ses bougies d'anniversaire.",
    figure: "Il souffle la réponse à son voisin.",
    sensFigure: "dire tout bas à quelqu'un",
  },
  {
    verbe: "dévorer",
    propre: "Le chien dévore sa gamelle.",
    figure: "Elle dévore son livre en une soirée.",
    sensFigure: "lire avec beaucoup d'envie",
  },
  {
    verbe: "briser",
    propre: "La vague a brisé la barque.",
    figure: "Sa question a brisé le silence.",
    sensFigure: "faire cesser d'un coup",
  },
  {
    verbe: "monter",
    propre: "Nous montons le sentier jusqu'au piton.",
    figure: "Monte un peu le son de la radio.",
    sensFigure: "augmenter",
  },
  {
    verbe: "attraper",
    propre: "Il attrape le ballon d'une main.",
    figure: "Elle a attrapé un rhume à la plage.",
    sensFigure: "tomber malade",
  },
  {
    verbe: "tomber",
    propre: "Les letchis tombent dans l'herbe.",
    figure: "La nuit tombe très vite ici.",
    sensFigure: "arriver, s'installer",
  },
  {
    verbe: "couler",
    propre: "L'eau coule du robinet.",
    figure: "Le temps coule sans qu'on le voie.",
    sensFigure: "passer",
  },
  {
    verbe: "dévorer",
    propre: "Le feu dévore les branches sèches.",
    figure: "La curiosité le dévore depuis ce matin.",
    sensFigure: "occuper entièrement",
  },
  {
    verbe: "planter",
    propre: "Papa plante un manguier derrière la case.",
    figure: "Il a planté sa tente près de la rivière.",
    sensFigure: "installer, dresser",
  },
  {
    verbe: "peser",
    propre: "Le marchand pèse les mangues.",
    figure: "Cette décision pèse sur toute la classe.",
    sensFigure: "être difficile à supporter",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   EXPRESSIONS ET LOCUTIONS
   ═══════════════════════════════════════════════════════════════════════════ */

type Expression = {
  readonly expression: string;
  readonly sens: string;
  /** Le sens qu'on obtiendrait en prenant les mots un par un. */
  readonly piegeLitteral: string;
  /** ⚠️ Écrits à la main, et sans ponctuation. Les découper à la volée depuis
   *  `sens` produirait des clés comme « distrait, » — avec la virgule — que
   *  `contains_keyword` chercherait telle quelle dans la réponse de l'élève. */
  readonly motsCles: readonly string[];
};

const EXPRESSIONS: readonly Expression[] = [
  {
    expression: "avoir un chat dans la gorge",
    sens: "être enroué, avoir du mal à parler",
    piegeLitteral: "avoir avalé un petit animal",
    motsCles: ["enroué", "enroue", "parler", "voix", "rhume"],
  },
  {
    expression: "il pleut des cordes",
    sens: "il pleut très fort",
    piegeLitteral: "des cordes tombent du ciel",
    motsCles: ["pleut", "pluie", "fort", "averse", "orage"],
  },
  {
    expression: "avoir la tête dans les nuages",
    sens: "être distrait, rêver au lieu d'écouter",
    piegeLitteral: "être plus grand que les nuages",
    motsCles: ["distrait", "rêve", "reve", "écoute pas", "ecoute pas", "pense à autre"],
  },
  {
    expression: "tomber dans les pommes",
    sens: "s'évanouir",
    piegeLitteral: "tomber dans un panier de fruits",
    motsCles: ["évanoui", "evanoui", "malaise", "tombe", "connaissance"],
  },
  {
    expression: "donner sa langue au chat",
    sens: "renoncer à deviner",
    piegeLitteral: "offrir sa langue à un animal",
    motsCles: ["renonce", "devine", "trouve pas", "abandonne", "réponse"],
  },
  {
    expression: "avoir le cœur sur la main",
    sens: "être très généreux",
    piegeLitteral: "porter son cœur dans sa paume",
    motsCles: ["généreux", "genereux", "donne", "partage", "gentil"],
  },
  {
    expression: "mettre la main à la pâte",
    sens: "participer au travail",
    piegeLitteral: "toucher de la farine",
    motsCles: ["participe", "aide", "travail", "coup de main"],
  },
  {
    expression: "être comme un poisson dans l'eau",
    sens: "se sentir tout à fait à l'aise",
    piegeLitteral: "savoir nager très bien",
    motsCles: ["à l'aise", "a l'aise", "bien", "content", "habitude"],
  },
  {
    expression: "avoir un poil dans la main",
    sens: "être très paresseux",
    piegeLitteral: "avoir un cheveu sur la paume",
    motsCles: ["paresseux", "flemme", "travaille pas", "fait rien"],
  },
  {
    expression: "casser les pieds",
    sens: "ennuyer quelqu'un",
    piegeLitteral: "faire mal aux jambes",
    motsCles: ["ennuie", "embête", "embete", "agace", "énerve", "enerve"],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LES NIVEAUX DE LANGUE — « selon les interlocuteurs », dit le BO
   ═══════════════════════════════════════════════════════════════════════════ */

type NiveauLangue = {
  readonly familier: string;
  readonly courant: string;
  readonly soutenu: string;
};

const NIVEAUX: readonly NiveauLangue[] = [
  { familier: "bagnole", courant: "voiture", soutenu: "automobile" },
  { familier: "bouquin", courant: "livre", soutenu: "ouvrage" },
  { familier: "godasses", courant: "chaussures", soutenu: "souliers" },
  { familier: "bosser", courant: "travailler", soutenu: "œuvrer" },
  { familier: "se marrer", courant: "rire", soutenu: "s'esclaffer" },
  { familier: "bouffer", courant: "manger", soutenu: "se restaurer" },
  { familier: "môme", courant: "enfant", soutenu: "bambin" },
  { familier: "baraque", courant: "maison", soutenu: "demeure" },
  { familier: "flotte", courant: "eau", soutenu: "onde" },
  { familier: "cabot", courant: "chien", soutenu: "canidé" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LE DICTIONNAIRE ET LE RÉPERTOIRE PERSONNEL
   ═══════════════════════════════════════════════════════════════════════════ */

/** Des couples de mots dont l'ordre alphabétique se décide sur une lettre
 *  précise — écrits à la main pour que la difficulté soit voulue. */
type CoupleAlphabetique = {
  readonly premier: string;
  readonly second: string;
  readonly rang: string;
};

const ALPHABETIQUE: readonly CoupleAlphabetique[] = [
  { premier: "cari", second: "case", rang: "la troisième lettre : r vient avant s" },
  { premier: "lagon", second: "letchi", rang: "la deuxième lettre : a vient avant e" },
  { premier: "mangue", second: "margouillat", rang: "la troisième lettre : n vient avant r" },
  { premier: "piton", second: "plage", rang: "la deuxième lettre : i vient avant l" },
  { premier: "case", second: "cerise", rang: "la deuxième lettre : a vient avant e" },
  // ⛔ Pas de couple où la décision se joue sur une lettre accentuée (bateau /
  // bâton) : l'ordre de « a » et « â » dans le dictionnaire est une subtilité
  // qui n'apprend rien à un enfant de neuf ans, et l'embrouille.
  { premier: "tamarin", second: "tapis", rang: "la troisième lettre : m vient avant p" },
  { premier: "école", second: "élève", rang: "la deuxième lettre : c vient avant l" },
  { premier: "fleur", second: "forêt", rang: "la deuxième lettre : l vient avant o" },
  { premier: "chemin", second: "cheval", rang: "la quatrième lettre : m vient avant v" },
];

/** Sous quelle forme chercher un mot rencontré dans un texte. C'est la
 *  compétence la plus utile du dictionnaire, et celle qui manque le plus. */
type FormeDico = {
  readonly rencontre: string;
  readonly cherche: string;
  readonly regle: string;
};

const FORMES_DICO: readonly FormeDico[] = [
  { rencontre: "chantaient", cherche: "chanter", regle: "les verbes sont rangés à l'infinitif" },
  { rencontre: "prendrons", cherche: "prendre", regle: "les verbes sont rangés à l'infinitif" },
  { rencontre: "voyions", cherche: "voir", regle: "les verbes sont rangés à l'infinitif" },
  { rencontre: "ramassera", cherche: "ramasser", regle: "les verbes sont rangés à l'infinitif" },
  { rencontre: "chevaux", cherche: "cheval", regle: "les noms sont rangés au singulier" },
  { rencontre: "journaux", cherche: "journal", regle: "les noms sont rangés au singulier" },
  { rencontre: "letchis", cherche: "letchi", regle: "les noms sont rangés au singulier" },
  { rencontre: "genoux", cherche: "genou", regle: "les noms sont rangés au singulier" },
  { rencontre: "joyeuses", cherche: "joyeux", regle: "les adjectifs sont rangés au masculin singulier" },
  { rencontre: "mûres", cherche: "mûr", regle: "les adjectifs sont rangés au masculin singulier" },
  { rencontre: "lectrices", cherche: "lecteur", regle: "les noms de personnes sont rangés au masculin singulier" },
  { rencontre: "boulangères", cherche: "boulanger", regle: "les noms de personnes sont rangés au masculin singulier" },
];

type ThemeLexical = {
  readonly theme: string;
  readonly mots: readonly string[];
  readonly intrus: string;
};

const THEMES: readonly ThemeLexical[] = [
  { theme: "la mer", mots: ["lagon", "vague", "bateau", "pêcheur"], intrus: "cartable" },
  { theme: "l'école", mots: ["cahier", "cartable", "récréation", "maitresse"], intrus: "lagon" },
  { theme: "la cuisine", mots: ["cari", "marmite", "épice", "riz"], intrus: "vague" },
  { theme: "la montagne", mots: ["piton", "sentier", "sommet", "nuage"], intrus: "marmite" },
  { theme: "les fruits", mots: ["letchi", "mangue", "banane", "ananas"], intrus: "sentier" },
  { theme: "la maison", mots: ["case", "volet", "toit", "cour"], intrus: "letchi" },
  { theme: "le temps qu'il fait", mots: ["pluie", "vent", "soleil", "orage"], intrus: "volet" },
  { theme: "les animaux", mots: ["margouillat", "oiseau", "chien", "poisson"], intrus: "orage" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LA BANQUE
   ═══════════════════════════════════════════════════════════════════════════ */

export const vocabulaireBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_VOC_CONTEXTE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_voc_contexte_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_contexte",
    difficulty: 2,
    theme: "neutral",
    hint: "Tu n'as pas besoin de connaitre le mot : le reste de la phrase te le dit.",
    tags: ["ce2", "vocabulaire", "contexte", "template"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      return {
        text: `Lis : « ${c.phrase} »\n\nQue veut dire « ${c.mot} » ?`,
        format: "qcm" as const,
        choices: shuffle([c.sens, ...c.faux]),
        expected: [c.sens],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le contexte, ce sont les mots qui entourent le mot inconnu. Ils suffisent souvent à en deviner le sens.",
          "Relis la phrase en sautant le mot difficile, puis demande-toi ce qui pourrait aller à sa place.",
          `Ici, ${c.indice} te met sur la piste : « ${c.mot} » veut dire ${c.sens}.`,
          `« ${c.mot} » veut dire ${c.sens}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_contexte_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_contexte",
    difficulty: 3,
    theme: "neutral",
    hint: "Quel morceau de la phrase t'a permis de deviner ?",
    tags: ["ce2", "vocabulaire", "contexte", "template"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      const autres = shuffle(CONTEXTES.filter((x) => x.mot !== c.mot)).map((x) => x.indice);
      return {
        text: `Lis : « ${c.phrase} »\n\nOn devine que « ${c.mot} » veut dire ${c.sens}. Quel morceau de la phrase te le fait deviner ?`,
        format: "qcm" as const,
        choices: choix(c.indice, autres),
        expected: [c.indice],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deviner un mot par le contexte, ce n'est pas inventer : c'est s'appuyer sur un morceau précis de la phrase.",
          "Cherche les mots qui parlent de la même chose que le mot inconnu, et pose ton doigt dessus.",
          `${c.indice} : voilà l'indice. Sans lui, on ne pourrait rien deviner.`,
          `L'indice est ${c.indice}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_contexte_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_contexte",
    difficulty: 3,
    theme: "neutral",
    hint: "Dis ce que tu fais quand tu tombes sur un mot que tu ne connais pas.",
    tags: ["ce2", "vocabulaire", "contexte", "ouverte"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      return {
        text: `« ${c.phrase} »\n\nTu ne connais pas le mot « ${c.mot} ». Explique comment tu t'y prends pour en deviner le sens.`,
        format: "open" as const,
        expected: ["autour", "contexte", "phrase", "relis", "indice", "reste", "avant", "après", "apres"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Un mot inconnu se devine grâce aux mots qui l'entourent : c'est ce qu'on appelle le contexte.",
          "Relis la phrase entière, saute le mot, et demande-toi ce qui aurait du sens à sa place.",
          `${c.indice} → « ${c.mot} » veut dire ${c.sens}.`,
          "On regarde les mots autour, dans la phrase, pour deviner le sens.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_VOC_FAMILLE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_voc_famille_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_famille",
    difficulty: 2,
    theme: "neutral",
    hint: "Même début ET même idée. Les deux, pas un seul.",
    tags: ["ce2", "vocabulaire", "famille", "template"],
    generate: () => {
      const f = randomChoice(FAMILLES_LEXICALES);
      const dedans = shuffle(f.derives).slice(0, 3);
      return {
        text: "Trois de ces mots sont de la même famille. Lequel est l'intrus ?",
        format: "qcm" as const,
        choices: shuffle([f.intrus, ...dedans]),
        expected: [f.intrus],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les mots d'une même famille partagent un radical ET une idée. Les deux à la fois.",
          "Ne te fie pas au début du mot : demande-toi s'ils parlent bien de la même chose.",
          `${dedans.map((m) => `« ${m} »`).join(", ")} tournent autour de « ${f.radical} ». « ${f.intrus} » lui ressemble, mais parle d'autre chose.`,
          `L'intrus est « ${f.intrus} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_famille_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_famille",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le mot le plus court : c'est souvent lui, le radical.",
    tags: ["ce2", "vocabulaire", "famille", "template"],
    generate: () => {
      const f = randomChoice(FAMILLES_LEXICALES);
      const autres = shuffle(FAMILLES_LEXICALES.filter((x) => x.radical !== f.radical)).map(
        (x) => x.radical,
      );
      return {
        text: `${f.derives.join(", ")}.\n\nDe quel mot cette famille est-elle née ?`,
        format: "qcm" as const,
        choices: choix(f.radical, [f.intrus], autres),
        expected: [f.radical],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une famille de mots pousse à partir d'un mot simple : le radical.",
          "Enlève les morceaux ajoutés devant et derrière. Ce qui reste partout, c'est le radical.",
          `${f.derives.join(", ")} → tous poussent sur « ${f.radical} ».`,
          `La famille est née de « ${f.radical} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_famille_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_famille",
    difficulty: 3,
    theme: "neutral",
    hint: "Il ne suffit pas que les mots commencent pareil.",
    tags: ["ce2", "vocabulaire", "famille", "ouverte"],
    generate: () => {
      const f = randomChoice(FAMILLES_LEXICALES);
      return {
        text: `« ${f.radical} » et « ${f.intrus} » commencent presque pareil, mais ne sont PAS de la même famille.\n\nExplique pourquoi.`,
        format: "open" as const,
        expected: ["sens", "idée", "idee", "même chose", "meme chose", "parle", "veut dire", "signifie"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Une famille de mots, ce n'est pas une ressemblance de lettres : c'est une parenté de SENS.",
          "Demande-toi si les deux mots parlent de la même chose. Si non, ce sont des voisins, pas des parents.",
          `« ${f.radical} » et ses dérivés (${f.derives.join(", ")}) parlent tous de la même idée. « ${f.intrus} » n'a rien à voir, malgré son début.`,
          "Parce qu'ils ne parlent pas de la même chose : seul le début se ressemble.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_VOC_PREFIXE_SUFFIXE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_voc_prefixe_suffixe_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_prefixe_suffixe",
    difficulty: 2,
    theme: "neutral",
    hint: "Le préfixe se colle DEVANT, le suffixe se colle DERRIÈRE.",
    tags: ["ce2", "vocabulaire", "affixes", "template"],
    generate: () => {
      const a = randomChoice(AFFIXES);
      return {
        text: `Dans le mot « ${a.mot} », le morceau « ${a.affixe} » est-il un préfixe ou un suffixe ?`,
        format: "qcm" as const,
        choices: ["un préfixe", "un suffixe"],
        expected: [a.type === "préfixe" ? "un préfixe" : "un suffixe"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un préfixe s'ajoute devant le radical ; un suffixe s'ajoute derrière.",
          "Regarde où le morceau est collé : au début du mot, ou à la fin ?",
          `${a.mot} est fabriqué sur « ${a.base} », avec « ${a.affixe} » ${a.type === "préfixe" ? "devant" : "derrière"}. Cela veut dire « ${a.sens} ».`,
          `« ${a.affixe} » est ${a.type === "préfixe" ? "un préfixe" : "un suffixe"}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_prefixe_suffixe_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_prefixe_suffixe",
    difficulty: 3,
    theme: "neutral",
    hint: "Découpe le mot en morceaux et lis-le comme une petite phrase.",
    tags: ["ce2", "vocabulaire", "affixes", "template"],
    generate: () => {
      const a = randomChoice(AFFIXES);
      const autres = shuffle(AFFIXES.filter((x) => x.sens !== a.sens)).map((x) => x.sens);
      return {
        text: `Que veut dire « ${a.mot} » ?`,
        format: "qcm" as const,
        choices: choix(a.sens, autres),
        expected: [a.sens],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chaque affixe a un sens fixe : re- veut dire « à nouveau », -eur veut dire « celui qui », -ette veut dire « petit ».",
          "Découpe le mot, lis chaque morceau, puis recolle le sens.",
          `${a.mot} = ${a.base} + ${a.affixe} → ${a.sens}.`,
          `« ${a.mot} » veut dire « ${a.sens} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_prefixe_suffixe_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_prefixe_suffixe",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux morceaux, deux rôles. Dis-les tous les deux.",
    tags: ["ce2", "vocabulaire", "affixes", "ouverte"],
    generate: () => {
      const a = randomChoice(AFFIXES);
      return {
        text: `Découpe « ${a.mot} » en morceaux et dis ce que chacun apporte.`,
        format: "open" as const,
        expected: [a.base, a.affixe.replace(/-/g, ""), a.type, "devant", "derrière", "derriere"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Un mot construit se lit en morceaux : le radical porte l'idée, l'affixe la modifie.",
          "Cherche d'abord le mot que tu connais à l'intérieur, puis regarde ce qui l'entoure.",
          `${a.mot} = ${a.base} + ${a.affixe}, un ${a.type} → ${a.sens}.`,
          `« ${a.mot} » est fait de « ${a.base} » et du ${a.type} « ${a.affixe} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_VOC_PREFIXES_NEGATIFS
  ========================================================= */
  {
    kind: "template",
    id: "ce2_voc_prefixes_negatifs_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_prefixes_negatifs",
    difficulty: 2,
    theme: "neutral",
    hint: "Un petit morceau devant le mot suffit à le retourner.",
    tags: ["ce2", "vocabulaire", "prefixes", "template"],
    generate: () => {
      const p = randomChoice(PREFIXES_NEGATIFS);
      const autres = shuffle(PREFIXES_NEGATIFS.filter((x) => x.mot !== p.mot)).map((x) => x.mot);
      return {
        text: `Quel mot veut dire le CONTRAIRE de « ${p.base} » ?`,
        format: "qcm" as const,
        choices: choix(p.mot, autres),
        expected: [p.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Certains préfixes retournent le sens du mot : dé-, dés-, in-, im-, ir-, mal-.",
          "Colle le préfixe devant le mot de départ, sans rien changer d'autre.",
          `${p.base} → ${p.mot} : « ${p.sens} ».`,
          `Le contraire de « ${p.base} » est « ${p.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_prefixes_negatifs_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_prefixes_negatifs",
    difficulty: 3,
    theme: "neutral",
    hint: "Quel morceau a-t-on collé devant ?",
    tags: ["ce2", "vocabulaire", "prefixes", "template"],
    generate: () => {
      const p = randomChoice(PREFIXES_NEGATIFS);
      const tous = [...new Set(PREFIXES_NEGATIFS.map((x) => x.prefixe))];
      return {
        text: `« ${p.mot} » est le contraire de « ${p.base} ».\n\nQuel préfixe a-t-on ajouté ?`,
        format: "qcm" as const,
        choices: choix(p.prefixe, tous, ["re-", "pré-"]),
        expected: [p.prefixe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les préfixes du contraire sont peu nombreux : dé-, dés-, in-, im-, ir-, mal-.",
          "Compare le mot et sa base : ce qui est en plus au début, c'est le préfixe.",
          `${p.base} → ${p.mot} : on a ajouté « ${p.prefixe} ». Attention, « re- » et « pré- » ne disent pas le contraire, eux.`,
          `Le préfixe est « ${p.prefixe} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_prefixes_negatifs_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_prefixes_negatifs",
    difficulty: 3,
    theme: "neutral",
    hint: "Il y en a plusieurs, et ils ne se mettent pas devant n'importe quel mot.",
    tags: ["ce2", "vocabulaire", "prefixes", "ouverte"],
    generate: () => {
      const p = randomChoice(PREFIXES_NEGATIFS);
      return {
        text: `« ${p.mot} » veut dire ${p.sens}.\n\nDonne un autre mot qui utilise un préfixe pour dire le contraire, et explique comment il est fabriqué.`,
        format: "open" as const,
        expected: ["dé", "de-", "in", "im", "mal", "dés", "contraire", "préfixe", "prefixe", "devant"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Un préfixe négatif retourne le sens du mot sans toucher au reste.",
          "Prends un mot que tu connais et essaie de lui coller dé-, in-, im- ou mal- devant.",
          `${p.base} → ${p.mot}. Pareil pour faire → défaire, poli → impoli, adroit → maladroit.`,
          `On colle un préfixe comme « ${p.prefixe} » devant le mot, et le sens se retourne.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_VOC_DERIVATION — port / portuaire / aéroport, l'exemple du BO
  ========================================================= */
  {
    kind: "template",
    id: "ce2_voc_derivation_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_derivation",
    difficulty: 3,
    theme: "neutral",
    hint: "Un seul mot pousse sur ce radical-là.",
    tags: ["ce2", "vocabulaire", "derivation", "template"],
    generate: () => {
      const f = randomChoice(FAMILLES_LEXICALES);
      const bon = randomChoice(f.derives);
      const autres = shuffle(
        FAMILLES_LEXICALES.filter((x) => x.radical !== f.radical).flatMap((x) => [...x.derives]),
      );
      return {
        text: `Quel mot est dérivé de « ${f.radical} » ?`,
        format: "qcm" as const,
        choices: choix(bon, [f.intrus], autres),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Dériver un mot, c'est en fabriquer un nouveau à partir d'un mot simple, en ajoutant un morceau devant ou derrière.",
          "Cherche le radical à l'intérieur du mot, puis vérifie que le sens colle.",
          `${f.radical} → ${f.derives.join(", ")}. On y retrouve « ${f.radical} », et tous parlent de la même idée.`,
          `« ${bon} » est dérivé de « ${f.radical} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_voc_derivation_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_derivation",
    difficulty: 3,
    theme: "neutral",
    text: "« port », « portuaire », « aéroport ».\n\nOù se trouve le radical dans « aéroport » ?",
    format: "qcm",
    choices: [
      "À la fin du mot : aéro-PORT",
      "Au début du mot : AÉRO-port",
      "Au milieu, entre les deux",
      "Il n'y en a pas dans ce mot",
    ],
    expected: ["À la fin du mot : aéro-PORT"],
    comparator: "mcq_exact",
    hint: "Cherche le mot simple que tu connais déjà à l'intérieur.",
    explanation: exp(
      "Dans un mot dérivé, le radical n'est pas toujours au début : il peut être précédé d'un morceau ajouté.",
      "Cherche le petit mot que tu connais déjà, où qu'il soit, puis regarde ce qui l'entoure.",
      "aéroport = aéro (l'air) + port. Un aéroport est un port pour ce qui vole. portuaire = port + uaire. Le radical « port » est au début dans l'un, à la fin dans l'autre — et c'est le même mot.",
      "À la fin du mot : aéro-PORT.",
    ),
    tags: ["ce2", "vocabulaire", "derivation", "remarquable", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_voc_derivation_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_derivation",
    difficulty: 3,
    theme: "neutral",
    hint: "Dis ce qu'ils ont en commun, et ce qui les distingue.",
    tags: ["ce2", "vocabulaire", "derivation", "ouverte"],
    generate: () => {
      const f = randomChoice(FAMILLES_LEXICALES);
      return {
        text: `« ${f.radical} », « ${f.derives[0]} », « ${f.derives[1]} ».\n\nQu'ont ces trois mots en commun ? Explique.`,
        format: "open" as const,
        expected: [f.radical, "radical", "famille", "même", "meme", "idée", "idee"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Des mots dérivés partagent un radical et une idée : ils sont fabriqués les uns à partir des autres.",
          "Souligne le morceau commun, puis dis en une phrase l'idée qu'ils partagent.",
          `« ${f.radical} » se retrouve dans ${f.derives.join(", ")}. Chacun ajoute quelque chose, mais l'idée de départ reste.`,
          `Ils partagent le radical « ${f.radical} » et la même idée.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_VOC_SYNONYME_ANTONYME
  ========================================================= */
  {
    kind: "template",
    id: "ce2_voc_synonyme_antonyme_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_synonyme_antonyme",
    difficulty: 2,
    theme: "neutral",
    hint: "Un synonyme veut dire à peu près la même chose.",
    tags: ["ce2", "vocabulaire", "synonymes", "template"],
    generate: () => {
      const t = randomChoice(SYNONYMES);
      // ⚠️ Les distracteurs viennent d'AUTRES lignes : deux synonymes du même
      // mot dans la même liste donneraient deux bonnes réponses.
      const autres = shuffle(SYNONYMES.filter((x) => x.mot !== t.mot)).flatMap((x) => [
        x.synonyme,
        x.antonyme,
      ]);
      return {
        text: `Quel mot veut dire à peu près la même chose que « ${t.mot} » ?`,
        format: "qcm" as const,
        choices: choix(t.synonyme, [t.antonyme], autres),
        expected: [t.synonyme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux synonymes veulent dire à peu près la même chose. On peut souvent remplacer l'un par l'autre.",
          "Essaie le mot dans une phrase à la place de l'autre : si la phrase garde son sens, ce sont des synonymes.",
          `« ${t.mot} » et « ${t.synonyme} » disent la même idée. « ${t.antonyme} » dit le contraire.`,
          `Le synonyme est « ${t.synonyme} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_synonyme_antonyme_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_synonyme_antonyme",
    difficulty: 2,
    theme: "neutral",
    hint: "Un antonyme dit exactement le contraire.",
    tags: ["ce2", "vocabulaire", "antonymes", "template"],
    generate: () => {
      const t = randomChoice(SYNONYMES);
      const autres = shuffle(SYNONYMES.filter((x) => x.mot !== t.mot)).flatMap((x) => [
        x.synonyme,
        x.antonyme,
      ]);
      return {
        text: `Quel mot veut dire le CONTRAIRE de « ${t.mot} » ?`,
        format: "qcm" as const,
        choices: choix(t.antonyme, [t.synonyme], autres),
        expected: [t.antonyme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux antonymes disent le contraire l'un de l'autre.",
          "Demande-toi ce qu'on obtiendrait en disant « pas… » : le mot qui correspond est l'antonyme.",
          `« ${t.mot} » ↔ « ${t.antonyme} ». « ${t.synonyme} », lui, dit la même chose que « ${t.mot} ».`,
          `Le contraire est « ${t.antonyme} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_synonyme_antonyme_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_synonyme_antonyme",
    difficulty: 3,
    theme: "neutral",
    hint: "À quoi ça sert d'avoir deux mots pour la même idée ?",
    tags: ["ce2", "vocabulaire", "synonymes", "ouverte"],
    generate: () => {
      const t = randomChoice(SYNONYMES);
      return {
        text: `« ${t.mot} » et « ${t.synonyme} » veulent dire à peu près la même chose.\n\nÀ quoi cela peut-il te servir quand tu écris un texte ? Explique.`,
        format: "open" as const,
        expected: ["répéter", "repeter", "répétition", "repetition", "varier", "changer", "plusieurs fois", "même mot", "meme mot"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Les synonymes servent à ne pas répéter le même mot dans un texte.",
          "Quand tu relis ton texte, entoure les mots qui reviennent, et remplace-en un par un synonyme.",
          `Au lieu d'écrire deux fois « ${t.mot} », on peut écrire « ${t.synonyme} » la seconde fois. Le sens reste, la répétition disparait.`,
          "Ils permettent de ne pas répéter toujours le même mot.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_VOC_GRADATION — la crainte, la peur, l'épouvante
  ========================================================= */
  {
    kind: "template",
    id: "ce2_voc_gradation_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_gradation",
    difficulty: 3,
    theme: "neutral",
    hint: "Les trois disent la même chose, mais pas avec la même force.",
    tags: ["ce2", "vocabulaire", "gradation", "template"],
    generate: () => {
      const g = randomChoice(GRADATIONS);
      const bon = g.echelle[2];
      return {
        text: `« ${g.echelle.join(" », « ")} » parlent tous de ${g.idee}.\n\nLequel est le plus FORT ?`,
        format: "qcm" as const,
        choices: choix(
          bon,
          [g.echelle[0], g.echelle[1]],
          GRADATIONS.filter((x) => x.idee !== g.idee).map((x) => x.echelle[1]),
        ),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Plusieurs mots peuvent dire la même idée avec des forces différentes. C'est ce qu'on appelle une gradation.",
          "Range les mots comme des marches d'escalier, du plus doux au plus fort.",
          `${g.echelle.join(" < ")}. Le dernier est le plus fort.`,
          `Le plus fort est « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_gradation_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_gradation",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la marche du bas de l'escalier.",
    tags: ["ce2", "vocabulaire", "gradation", "template"],
    generate: () => {
      const g = randomChoice(GRADATIONS);
      const bon = g.echelle[0];
      return {
        text: `« ${g.echelle.join(" », « ")} » parlent tous de ${g.idee}.\n\nLequel est le plus FAIBLE ?`,
        format: "qcm" as const,
        choices: choix(
          bon,
          [g.echelle[1], g.echelle[2]],
          GRADATIONS.filter((x) => x.idee !== g.idee).map((x) => x.echelle[2]),
        ),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une gradation range les mots du plus faible au plus fort, comme des marches.",
          "Imagine la scène : lequel des trois décrit le moins ce qui se passe ?",
          `${g.echelle.join(" < ")}. Le premier est le plus doux — c'est celui qu'on emploie quand ce n'est pas encore grave.`,
          `Le plus faible est « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_gradation_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_gradation",
    difficulty: 3,
    theme: "neutral",
    hint: "Range-les comme des marches, et dis pourquoi dans cet ordre.",
    tags: ["ce2", "vocabulaire", "gradation", "ouverte"],
    generate: () => {
      const g = randomChoice(GRADATIONS);
      const melange = shuffle([...g.echelle]);
      return {
        text: `Range ces trois mots du plus faible au plus fort : « ${melange.join(" », « ")} ».\n\nExplique ton choix.`,
        format: "open" as const,
        expected: [g.echelle[0], g.echelle[2], "fort", "faible", "moins", "plus"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Une gradation, ce sont des mots qui disent la même idée avec des forces différentes.",
          "Imagine trois scènes : une petite, une moyenne, une très grande. Attribue un mot à chacune.",
          `${g.echelle.join(" < ")}. Le BO donne lui-même l'exemple : la crainte, la peur, l'épouvante.`,
          `L'ordre est : ${g.echelle.join(", puis ")}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_VOC_GENERIQUE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_voc_generique_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_generique",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le mot qui contient tous les autres.",
    tags: ["ce2", "vocabulaire", "generique", "template"],
    generate: () => {
      const c = randomChoice(CATEGORIES);
      const autres = shuffle(CATEGORIES.filter((x) => x.generique !== c.generique)).map(
        (x) => x.generique,
      );
      return {
        text: `${c.membres.join(", ")}.\n\nCes mots sont tous… ?`,
        format: "qcm" as const,
        choices: choix(c.generique, autres),
        expected: [c.generique],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot générique est un mot large qui contient plusieurs mots plus précis.",
          "Demande-toi : si je devais les ranger dans une seule boite, quel nom écrirais-je dessus ?",
          `${c.membres.join(", ")} : ce sont tous des exemples de « ${c.generique} ».`,
          `Ce sont tous ${c.generique}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_generique_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_generique",
    difficulty: 2,
    theme: "neutral",
    hint: "Trois vont dans la même boite. Le quatrième non.",
    tags: ["ce2", "vocabulaire", "generique", "template"],
    generate: () => {
      const c = randomChoice(CATEGORIES);
      return {
        text: `Trois de ces mots sont ${c.generique}. Lequel est l'intrus ?`,
        format: "qcm" as const,
        choices: shuffle([c.intrus, ...c.membres]),
        expected: [c.intrus],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Ranger du général au particulier, c'est savoir quels mots entrent dans une même catégorie.",
          "Essaie de dire « c'est un… » devant chaque mot, avec le mot large.",
          `${c.membres.join(", ")} sont bien ${c.generique}. « ${c.intrus} », non.`,
          `L'intrus est « ${c.intrus} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_generique_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_generique",
    difficulty: 3,
    theme: "neutral",
    hint: "Donne trois exemples, pas un seul.",
    tags: ["ce2", "vocabulaire", "generique", "ouverte"],
    generate: () => {
      const c = randomChoice(CATEGORIES);
      return {
        text: `« ${c.generique} » est un mot général.\n\nDonne trois mots plus précis qui entrent dedans.`,
        format: "open" as const,
        expected: c.membres.map((m) => m.replace(/^(un |une )/, "")),
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Un mot générique contient plusieurs mots particuliers, comme une boite contient des objets.",
          "Pense à ce que tu connais autour de toi qui entre dans cette catégorie.",
          `${c.generique} → ${c.membres.join(", ")}, et bien d'autres.`,
          `Par exemple : ${c.membres.join(", ")}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_VOC_POLYSEMIE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_voc_polysemie_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_polysemie",
    difficulty: 2,
    theme: "neutral",
    hint: "Le même mot, mais la phrase n'est pas la même.",
    tags: ["ce2", "vocabulaire", "polysemie", "template"],
    generate: () => {
      const p = randomChoice(POLYSEMES);
      const premiere = Math.random() < 0.5;
      const phrase = premiere ? p.phraseA : p.phraseB;
      const bon = premiere ? p.sensA : p.sensB;
      const autre = premiere ? p.sensB : p.sensA;
      const autres = shuffle(POLYSEMES.filter((x) => x.mot !== p.mot)).flatMap((x) => [
        x.sensA,
        x.sensB,
      ]);
      return {
        text: `Lis : « ${phrase} »\n\nQue veut dire « ${p.mot} » dans cette phrase ?`,
        format: "qcm" as const,
        choices: choix(bon, [autre], autres),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un même mot peut avoir plusieurs sens. C'est la phrase autour qui dit lequel.",
          "Relis toute la phrase, pas seulement le mot : les autres mots te donnent la réponse.",
          `Ici, « ${p.mot} » veut dire ${bon}. Dans « ${premiere ? p.phraseB : p.phraseA} », il voudrait dire ${autre} — le même mot, un autre sens.`,
          `Dans cette phrase, « ${p.mot} » veut dire ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_polysemie_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_polysemie",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche celle où le mot ne veut pas dire la même chose.",
    tags: ["ce2", "vocabulaire", "polysemie", "template"],
    generate: () => {
      const p = randomChoice(POLYSEMES);
      return {
        text: `Dans laquelle de ces deux phrases le mot « ${p.mot} » veut-il dire « ${p.sensB} » ?`,
        format: "qcm" as const,
        choices: shuffle([p.phraseB, p.phraseA]),
        expected: [p.phraseB],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot polysémique a plusieurs sens, et seul le contexte permet de choisir.",
          "Remplace le mot par le sens proposé dans chaque phrase, et écoute laquelle tient debout.",
          `« ${p.phraseB} » → ${p.sensB}. « ${p.phraseA} » → ${p.sensA}. Même mot, deux mondes.`,
          `C'est dans « ${p.phraseB} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_polysemie_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_polysemie",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris une phrase à toi, où le mot a l'autre sens.",
    tags: ["ce2", "vocabulaire", "polysemie", "ouverte"],
    generate: () => {
      const p = randomChoice(POLYSEMES);
      return {
        text: `Dans « ${p.phraseA} », le mot « ${p.mot} » veut dire ${p.sensA}.\n\nDonne un autre sens de ce mot, ou écris une phrase où il veut dire autre chose.`,
        format: "open" as const,
        expected: [p.sensB.split(" ").filter((w) => w.length > 4)[0] ?? p.mot, p.mot, "autre sens"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Beaucoup de mots courants ont deux sens ou plus : on les appelle des mots polysémiques.",
          "Cherche dans quel autre endroit de ta vie tu emploies ce mot-là.",
          `« ${p.mot} » : ${p.sensA} dans une phrase, ${p.sensB} dans une autre — par exemple « ${p.phraseB} »`,
          `« ${p.mot} » peut aussi vouloir dire ${p.sensB}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_VOC_SENS_PROPRE_FIGURE — l'exemple du BO
  ========================================================= */
  {
    kind: "template",
    id: "ce2_voc_sens_propre_figure_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_sens_propre_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Le sens propre, c'est celui qu'on peut voir pour de vrai.",
    tags: ["ce2", "vocabulaire", "sens-figure", "template"],
    generate: () => {
      const s = randomChoice(SENS_FIGURES);
      const propre = Math.random() < 0.5;
      const phrase = propre ? s.propre : s.figure;
      return {
        text: `« ${phrase} »\n\nLe verbe « ${s.verbe} » est-il employé au sens propre ou au sens figuré ?`,
        format: "qcm" as const,
        choices: ["au sens propre", "au sens figuré"],
        expected: [propre ? "au sens propre" : "au sens figuré"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le sens propre est le sens de départ, celui qu'on peut voir pour de vrai. Le sens figuré est une image.",
          "Demande-toi si tu pourrais prendre une photo de la scène. Si oui, c'est le sens propre.",
          `${s.propre} — on peut le voir. ${s.figure} — là, « ${s.verbe} » veut dire ${s.sensFigure} : c'est une image.`,
          `Ici, c'est ${propre ? "le sens propre" : "le sens figuré"}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_sens_propre_figure_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_sens_propre_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace le verbe par ce qu'il veut vraiment dire ici.",
    tags: ["ce2", "vocabulaire", "sens-figure", "template"],
    generate: () => {
      const s = randomChoice(SENS_FIGURES);
      const autres = shuffle(SENS_FIGURES.filter((x) => x.sensFigure !== s.sensFigure)).map(
        (x) => x.sensFigure,
      );
      return {
        text: `« ${s.figure} »\n\nQue veut dire « ${s.verbe} » dans cette phrase ?`,
        format: "qcm" as const,
        choices: choix(s.sensFigure, autres),
        expected: [s.sensFigure],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Au sens figuré, un verbe garde son idée mais change de monde : on l'emploie comme une image.",
          "Remplace le verbe par une expression plus simple : celle qui tient debout est la bonne.",
          `${s.propre} : le sens propre. ${s.figure} : ici, « ${s.verbe} » veut dire ${s.sensFigure}.`,
          `« ${s.verbe} » veut dire ici ${s.sensFigure}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_voc_sens_propre_figure_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_sens_propre_figure",
    difficulty: 3,
    theme: "neutral",
    text: "« Il souffle ses bougies. » et « Il souffle la réponse à son voisin. »\n\nExplique la différence entre ces deux emplois de « souffler ».",
    format: "open",
    expected: ["propre", "figuré", "figure", "image", "vraiment", "de vrai", "tout bas", "air"],
    comparator: "contains_keyword",
    hint: "Dans un des deux cas, il y a vraiment de l'air qui sort.",
    explanation: exp(
      "Le sens propre est le sens premier, concret. Le sens figuré est une image bâtie sur lui.",
      "Demande-toi si la scène est photographiable telle quelle.",
      "Souffler ses bougies : de l'air sort de la bouche, on peut le voir. Souffler une réponse : personne n'éteint rien — on dit tout bas, et l'image de l'air qui passe est restée. C'est l'exemple que le programme donne lui-même.",
      "Le premier est le sens propre, le second le sens figuré : dire tout bas.",
    ),
    tags: ["ce2", "vocabulaire", "sens-figure", "definition", "ouverte"],
  },

  /* =========================================================
     CE2_VOC_EXPRESSIONS
  ========================================================= */
  {
    kind: "template",
    id: "ce2_voc_expressions_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_expressions",
    difficulty: 3,
    theme: "neutral",
    hint: "Ne prends pas les mots un par un : l'expression se comprend entière.",
    tags: ["ce2", "vocabulaire", "expressions", "template"],
    generate: () => {
      const e = randomChoice(EXPRESSIONS);
      const autres = shuffle(EXPRESSIONS.filter((x) => x.sens !== e.sens)).map((x) => x.sens);
      return {
        text: `Que veut dire l'expression « ${e.expression} » ?`,
        format: "qcm" as const,
        choices: choix(e.sens, [e.piegeLitteral], autres),
        expected: [e.sens],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une expression est un groupe de mots dont le sens ne se devine pas mot à mot. Il faut la connaitre en entier.",
          "Cherche dans quelle situation tu l'as déjà entendue : c'est la situation qui donne le sens.",
          `« ${e.expression} » veut dire ${e.sens}. Pris mot à mot, on comprendrait « ${e.piegeLitteral} » — et ce serait absurde.`,
          `Cela veut dire ${e.sens}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_expressions_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_expressions",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche l'expression qui dit cela sans le dire.",
    tags: ["ce2", "vocabulaire", "expressions", "template"],
    generate: () => {
      const e = randomChoice(EXPRESSIONS);
      const autres = shuffle(EXPRESSIONS.filter((x) => x.expression !== e.expression)).map(
        (x) => x.expression,
      );
      return {
        text: `Quelle expression veut dire « ${e.sens} » ?`,
        format: "qcm" as const,
        choices: choix(e.expression, autres),
        expected: [e.expression],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les expressions disent les choses par des images. Elles se retiennent comme des mots entiers.",
          "Repère l'image : le chat, la pluie, les nuages… puis relie-la à ce qu'elle raconte vraiment.",
          `« ${e.expression} » = ${e.sens}.`,
          `L'expression est « ${e.expression} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_expressions_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_expressions",
    difficulty: 3,
    theme: "neutral",
    hint: "Raconte une situation où tu pourrais la dire.",
    tags: ["ce2", "vocabulaire", "expressions", "ouverte"],
    generate: () => {
      const e = randomChoice(EXPRESSIONS);
      return {
        text: `L'expression « ${e.expression} » veut dire ${e.sens}.\n\nRaconte une situation où tu pourrais l'employer.`,
        format: "open" as const,
        expected: [...e.motsCles],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Une expression ne s'apprend pas seule : elle s'apprend avec la situation où on l'emploie.",
          "Imagine une scène de ta vie, puis vérifie que l'expression y aurait sa place.",
          `« ${e.expression} » = ${e.sens}. Pris mot à mot, ce serait « ${e.piegeLitteral} ».`,
          `On l'emploie quand ${e.sens}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_VOC_NIVEAUX_LANGUE — « selon les interlocuteurs »
  ========================================================= */
  {
    kind: "template",
    id: "ce2_voc_niveaux_langue_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_niveaux_langue",
    difficulty: 3,
    theme: "neutral",
    hint: "On ne parle pas à la maitresse comme à son meilleur ami.",
    tags: ["ce2", "vocabulaire", "niveaux-langue", "template"],
    generate: () => {
      const n = randomChoice(NIVEAUX);
      const cas = randomChoice([
        { mot: n.familier, niveau: "familier" },
        { mot: n.courant, niveau: "courant" },
        { mot: n.soutenu, niveau: "soutenu" },
      ]);
      return {
        text: `Le mot « ${cas.mot} » appartient à quel niveau de langue ?`,
        format: "qcm" as const,
        choices: ["familier", "courant", "soutenu"],
        expected: [cas.niveau],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "On change de mots selon la personne à qui l'on parle : le langage familier entre amis, le courant partout, le soutenu à l'écrit ou dans les grandes occasions.",
          "Demande-toi à qui tu dirais ce mot-là : à un copain, à la maitresse, ou dans un livre ?",
          `${n.familier} (familier) / ${n.courant} (courant) / ${n.soutenu} (soutenu) — trois mots pour la même chose, trois situations différentes.`,
          `« ${cas.mot} » est du langage ${cas.niveau}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_niveaux_langue_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_niveaux_langue",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans une rédaction, on écrit en langage courant.",
    tags: ["ce2", "vocabulaire", "niveaux-langue", "template"],
    generate: () => {
      const n = randomChoice(NIVEAUX);
      const autres = shuffle(NIVEAUX.filter((x) => x.courant !== n.courant)).map((x) => x.courant);
      return {
        text: `Tu écris une rédaction pour la classe. Par quel mot remplaces-tu « ${n.familier} » ?`,
        format: "qcm" as const,
        choices: choix(n.courant, [n.familier], autres),
        expected: [n.courant],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le langage familier s'emploie entre proches, à l'oral. À l'écrit et à l'école, on emploie le langage courant.",
          "Demande-toi si tu écrirais ce mot dans une lettre à quelqu'un que tu connais peu.",
          `« ${n.familier} » se dit entre copains. Dans une rédaction, on écrit « ${n.courant} ». Et « ${n.soutenu} » se garde pour les textes très soignés.`,
          `On écrit « ${n.courant} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_niveaux_langue_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_niveaux_langue",
    difficulty: 3,
    theme: "neutral",
    hint: "Ce n'est pas une question de bien ou de mal : c'est une question de situation.",
    tags: ["ce2", "vocabulaire", "niveaux-langue", "ouverte"],
    generate: () => {
      const n = randomChoice(NIVEAUX);
      return {
        text: `« ${n.familier} » et « ${n.courant} » veulent dire la même chose.\n\nÀ qui dirais-tu l'un, à qui dirais-tu l'autre ? Explique.`,
        format: "open" as const,
        expected: ["copain", "ami", "maitresse", "maîtresse", "école", "ecole", "écrit", "ecrit", "familier", "courant", "adulte"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Le niveau de langue se choisit selon la personne à qui l'on s'adresse.",
          "Pose-toi la question avant de parler ou d'écrire : à qui je parle, et où ?",
          `« ${n.familier} » entre copains, dans la cour. « ${n.courant} » à l'école, dans une rédaction, avec quelqu'un qu'on connait peu. Aucun des deux n'est mauvais — chacun a sa place.`,
          `On dit « ${n.familier} » à ses copains et « ${n.courant} » à l'école.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_VOC_DICTIONNAIRE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_voc_dictionnaire_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_dictionnaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les mots lettre par lettre, en partant du début.",
    tags: ["ce2", "vocabulaire", "dictionnaire", "template"],
    generate: () => {
      const c = randomChoice(ALPHABETIQUE);
      return {
        text: `Dans le dictionnaire, lequel de ces deux mots vient en premier : « ${c.premier} » ou « ${c.second} » ?`,
        format: "qcm" as const,
        choices: shuffle([c.premier, c.second]),
        expected: [c.premier],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le dictionnaire range les mots dans l'ordre alphabétique, lettre après lettre.",
          "Compare la première lettre. Si elle est la même, passe à la deuxième, et ainsi de suite.",
          `« ${c.premier} » vient avant « ${c.second} » : on le voit à ${c.rang}.`,
          `« ${c.premier} » vient en premier.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_voc_dictionnaire_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_dictionnaire",
    difficulty: 3,
    theme: "neutral",
    text: "Tu cherches le mot « chantaient » dans le dictionnaire, mais tu ne le trouves pas. Pourquoi ?",
    format: "qcm",
    choices: [
      "Les verbes sont rangés à l'infinitif : il faut chercher « chanter »",
      "Le mot n'existe pas",
      "Il faut chercher à la lettre A, à cause de « aient »",
      "Le dictionnaire ne contient pas les verbes",
    ],
    expected: ["Les verbes sont rangés à l'infinitif : il faut chercher « chanter »"],
    comparator: "mcq_exact",
    hint: "Sous quelle forme un verbe est-il rangé ?",
    explanation: exp(
      "Le dictionnaire range chaque mot sous une seule forme : les verbes à l'infinitif, les noms au singulier, les adjectifs au masculin singulier.",
      "Avant de chercher, ramène le mot à sa forme de base.",
      "chantaient → chanter. chevaux → cheval. joyeuses → joyeux. Sinon on cherche longtemps, et pour rien.",
      "Les verbes sont rangés à l'infinitif : il faut chercher « chanter ».",
    ),
    tags: ["ce2", "vocabulaire", "dictionnaire", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_voc_dictionnaire_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_dictionnaire",
    difficulty: 3,
    theme: "neutral",
    hint: "Le dictionnaire ne range chaque mot que sous UNE forme.",
    tags: ["ce2", "vocabulaire", "dictionnaire", "template"],
    generate: () => {
      const f = randomChoice(FORMES_DICO);
      const autres = shuffle(FORMES_DICO.filter((x) => x.cherche !== f.cherche)).map(
        (x) => x.cherche,
      );
      return {
        text: `Tu as lu le mot « ${f.rencontre} » dans un texte.\n\nSous quelle forme dois-tu le chercher dans le dictionnaire ?`,
        format: "qcm" as const,
        choices: choix(f.cherche, [f.rencontre], autres),
        expected: [f.cherche],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le dictionnaire ne range chaque mot que sous une seule forme, celle du départ.",
          "Avant de chercher, ramène le mot à sa forme de base : c'est presque toujours la plus courte.",
          `« ${f.rencontre} » → on cherche « ${f.cherche} », parce que ${f.regle}.`,
          `On cherche « ${f.cherche} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_dictionnaire_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_dictionnaire",
    difficulty: 3,
    theme: "neutral",
    hint: "Le dictionnaire ne donne pas que le sens.",
    tags: ["ce2", "vocabulaire", "dictionnaire", "ouverte"],
    generate: () => {
      const p = randomChoice(POLYSEMES);
      return {
        text: `Tu cherches « ${p.mot} » dans le dictionnaire et tu trouves DEUX définitions.\n\nComment sais-tu laquelle est la bonne ? Explique.`,
        format: "open" as const,
        expected: ["phrase", "contexte", "texte", "sens", "exemple", "autour", "situation"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Un mot polysémique a plusieurs définitions dans le dictionnaire, numérotées les unes après les autres.",
          "Reviens à ta phrase de départ : c'est elle qui dit laquelle des définitions convient. Les exemples du dictionnaire t'aident aussi.",
          `« ${p.mot} » : ${p.sensA} dans « ${p.phraseA} », ${p.sensB} dans « ${p.phraseB} ». Sans la phrase, on ne peut pas choisir.`,
          "On revient à la phrase où on a lu le mot : c'est elle qui décide.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_VOC_REPERTOIRE — le répertoire lexical personnel
  ========================================================= */
  {
    kind: "template",
    id: "ce2_voc_repertoire_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_repertoire",
    difficulty: 2,
    theme: "neutral",
    hint: "Un répertoire range les mots par thème, pas au hasard.",
    tags: ["ce2", "vocabulaire", "repertoire", "template"],
    generate: () => {
      const t = randomChoice(THEMES);
      const autres = shuffle(THEMES.filter((x) => x.theme !== t.theme)).map((x) => x.theme);
      return {
        text: `${t.mots.join(", ")}.\n\nDans quelle page de ton répertoire rangerais-tu ces mots ?`,
        format: "qcm" as const,
        choices: choix(t.theme, autres),
        expected: [t.theme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un répertoire lexical, c'est un carnet où l'on range les mots nouveaux par thème, pour les retrouver et les réemployer.",
          "Demande-toi de quoi parlent tous ces mots à la fois.",
          `${t.mots.join(", ")} : ils appartiennent tous à « ${t.theme} ».`,
          `On les rangerait dans « ${t.theme} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_repertoire_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_repertoire",
    difficulty: 2,
    theme: "neutral",
    hint: "Un mot s'est trompé de page.",
    tags: ["ce2", "vocabulaire", "repertoire", "template"],
    generate: () => {
      const t = randomChoice(THEMES);
      const trois = shuffle([...t.mots]).slice(0, 3);
      return {
        text: `Voici la page « ${t.theme} » d'un répertoire. Quel mot s'est trompé de page ?`,
        format: "qcm" as const,
        choices: shuffle([t.intrus, ...trois]),
        expected: [t.intrus],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Ranger un mot dans un répertoire, c'est déjà le comprendre : on ne peut pas le classer sans savoir de quoi il parle.",
          "Relis chaque mot en te demandant s'il parle bien du thème de la page.",
          `${trois.join(", ")} parlent de « ${t.theme} ». « ${t.intrus} », non.`,
          `Le mot mal rangé est « ${t.intrus} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_repertoire_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_repertoire",
    difficulty: 3,
    theme: "neutral",
    hint: "Un répertoire ne sert à rien si on ne s'en ressert pas.",
    tags: ["ce2", "vocabulaire", "repertoire", "ouverte"],
    generate: () => {
      const t = randomChoice(THEMES);
      return {
        text: `Tu tiens un carnet où tu ranges les mots nouveaux par thème.\n\nDonne deux mots que tu écrirais dans la page « ${t.theme} », et dis à quoi ce carnet peut te servir.`,
        format: "open" as const,
        expected: [...t.mots, "écrire", "ecrire", "retrouver", "réemployer", "reemployer", "texte", "rédaction", "redaction"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Un répertoire lexical personnel est un carnet de mots rangés par thème, qu'on enrichit toute l'année.",
          "Quand tu écris un texte, ouvre la page du thème : les mots précis sont déjà là, tu n'as plus à les chercher.",
          `Page « ${t.theme} » : ${t.mots.join(", ")}. Le jour où tu écris sur ce sujet, tu ne repars pas de zéro.`,
          `Par exemple ${t.mots[0]} et ${t.mots[1]}, pour les réemployer quand on écrit.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_VOC_DEFI — plusieurs outils dans la même question
  ========================================================= */
  {
    kind: "template",
    id: "ce2_voc_defi_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Le mot le plus fort n'est pas le plus long.",
    tags: ["ce2", "vocabulaire", "defi", "template"],
    generate: () => {
      const g = randomChoice(GRADATIONS);
      // ⚠️ Par `choix`, jamais par un `shuffle` d'une liste écrite en dur : un
      // même mot vit dans deux tables. « brulant » est le dernier cran de la
      // gradation de la chaleur ET le synonyme de « chaud » ; « petit » est le
      // premier cran de la petitesse ET l'antonyme de « grand ». Le QCM tombait
      // alors à trois lignes.
      const t = randomChoice(
        SYNONYMES.filter(
          (x) => !g.echelle.includes(x.synonyme) && !g.echelle.includes(x.antonyme),
        ),
      );
      return {
        text: `Parmi ces quatre mots, un seul dit ${g.idee} avec le plus de force. Lequel ?`,
        format: "qcm" as const,
        choices: choix(g.echelle[2], [g.echelle[0]], [t.synonyme, t.antonyme]),
        expected: [g.echelle[2]],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Choisir un mot, c'est choisir sa force autant que son sens.",
          "Écarte d'abord ceux qui ne parlent pas du tout de l'idée, puis range les autres du plus doux au plus fort.",
          `${g.echelle.join(" < ")}. « ${t.synonyme} » et « ${t.antonyme} » parlent d'autre chose.`,
          `Le plus fort est « ${g.echelle[2]} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_defi_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux questions en une : le sens, et le niveau de langue.",
    tags: ["ce2", "vocabulaire", "defi", "template"],
    generate: () => {
      const n = randomChoice(NIVEAUX);
      const autres = shuffle(NIVEAUX.filter((x) => x.courant !== n.courant)).flatMap((x) => [
        x.courant,
        x.familier,
      ]);
      return {
        text: `Tu écris une lettre à la directrice de l'école.\n\nQuel mot emploies-tu pour parler de « ${n.familier} » ?`,
        format: "qcm" as const,
        choices: choix(n.courant, [n.familier], autres),
        expected: [n.courant],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Bien choisir un mot, c'est tenir compte de son sens ET de la personne à qui l'on parle.",
          "Écarte d'abord les mots qui ne veulent pas dire la même chose, puis choisis le niveau de langue qui convient.",
          `« ${n.familier} » et « ${n.courant} » disent la même chose, mais on n'écrit pas « ${n.familier} » à une directrice.`,
          `On emploie « ${n.courant} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_voc_defi_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "ce2_voc_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Tu as plusieurs outils : le contexte, la famille, le dictionnaire.",
    tags: ["ce2", "vocabulaire", "defi", "ouverte"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      return {
        text: `Tu lis « ${c.phrase} » et tu ne connais pas « ${c.mot} ».\n\nRaconte tout ce que tu peux essayer pour en trouver le sens, dans l'ordre.`,
        format: "open" as const,
        expected: ["contexte", "autour", "phrase", "famille", "dictionnaire", "relis", "indice"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Devant un mot inconnu, on a plusieurs outils, et on les essaie dans l'ordre du plus rapide au plus long.",
          "D'abord le contexte : les mots autour. Ensuite la forme du mot : sa famille, ses préfixes. En dernier, le dictionnaire.",
          `Ici, ${c.indice} suffit : « ${c.mot} » veut dire ${c.sens}. Pas besoin d'ouvrir le dictionnaire.`,
          "On regarde d'abord le contexte, puis la famille du mot, et enfin le dictionnaire.",
        ),
      };
    },
  },
];
