// lib/tutor-v4/questionBank/ce1/francais/orthographe.bank.ts
//
// L'orthographe grammaticale du CE1, écrite à la main.
//
// CE QU'ELLE REMPLACE : trois énoncés pour huit micro-compétences. Le
// générateur commun aux trois classes servait « Quel groupe est écrit
// correctement ? » avec « le chat / la chat » — une question écrite pour un CP
// — et deux phrases d'homophones. « Accorder un adjectif éloigné de son nom »,
// qui est la nouveauté du CE1, ne recevait rien qui y ressemble.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours élémentaire première année) :
//   — « Comprendre le fonctionnement du groupe nominal : déterminant, nom,
//     adjectif, et les marques d'accord qui les relient » ;
//   — « Identifier la relation sujet-verbe et réaliser les accords » ;
//   — exemple de réussite : « marque de pluriel des verbes = nt ».
//
// ⛔ Ce qui n'est PAS au CE1 : les pluriels en -al/-aux, le féminin des noms de
// métier qui s'entend (lecteur/lectrice, joyeux/joyeuse) et la gradation. Ils
// arrivent au CE2.
//
// LES DEUX PIÈGES DE LA NOTION, et ils ne s'entendent ni l'un ni l'autre :
//   — la marque du pluriel du NOM est un « s » muet. « une pomme » et « des
//     pommes » se disent pareil ; c'est le petit mot devant qui prévient ;
//   — la marque du pluriel du VERBE est « -nt », et elle ne s'entend pas non
//     plus. « Il chante » et « ils chantent » : ta bouche dit la même chose.
//
// ET LA NOUVEAUTÉ DU CE1 : l'adjectif peut être LOIN de son nom. « Les mangues
// sont mûres » — le verbe s'est glissé entre les deux, et l'accord tient quand
// même. Au CP, le déterminant, le nom et l'adjectif se touchaient.
//
// ⚠️ AUCUN GROUPE NOMINAL N'EST RECOMPOSÉ. Coller un déterminant, un adjectif
// et un nom tirés de trois listes donne « une mûre mangue » et « le bleu
// lagon » — proposés comme la BONNE réponse, et aucun script ne l'attrape : la
// question est bien formée, elle est juste fausse. Chaque groupe est écrit avec
// son genre, son nombre et LA PLACE DE SON ADJECTIF. Seules les marques
// d'accord se déplacent, jamais l'ordre des mots.

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

/* ── Les groupes nominaux ────────────────────────────────────────────────────
   `avant` dit où se place l'adjectif, et c'est ce champ-là qui empêche
   « une mûre mangue ». On ne compose jamais deux listes entre elles : chaque
   ligne est un groupe qui existe, écrit une fois pour toutes.
   ⚠️ Les groupes dont l'adjectif est DEVANT prennent « le/les » ou « la/les »,
   jamais « un/des » : au pluriel, le BO écrit « un joli vélo → DE jolis vélos ».
   Cette subtilité-là n'est pas du CE1, on l'évite en choisissant le
   déterminant. */

type GroupeNominal = {
  readonly det: string;
  readonly detP: string;
  readonly nom: string;
  readonly nomP: string;
  readonly genre: "m" | "f";
  readonly avant: boolean;
  /** Les QUATRE accords de l'adjectif, dans l'ordre : masculin singulier,
   *  masculin pluriel, féminin singulier, féminin pluriel. Un piège d'accord
   *  n'est honnête que s'il est un accord — « petitees » n'existe pas et ne
   *  trompe personne, « petits » devant un nom féminin trompe tout le monde. */
  readonly formes: readonly [string, string, string, string];
};

const GROUPES: readonly GroupeNominal[] = [
  { det: "le", detP: "les", nom: "garçon", nomP: "garçons", genre: "m", avant: true, formes: ["petit", "petits", "petite", "petites"] },
  { det: "la", detP: "les", nom: "fille", nomP: "filles", genre: "f", avant: true, formes: ["petit", "petits", "petite", "petites"] },
  { det: "le", detP: "les", nom: "bateau", nomP: "bateaux", genre: "m", avant: true, formes: ["grand", "grands", "grande", "grandes"] },
  { det: "la", detP: "les", nom: "coquille", nomP: "coquilles", genre: "f", avant: true, formes: ["joli", "jolis", "jolie", "jolies"] },
  { det: "le", detP: "les", nom: "sentier", nomP: "sentiers", genre: "m", avant: true, formes: ["long", "longs", "longue", "longues"] },
  { det: "la", detP: "les", nom: "cour", nomP: "cours", genre: "f", avant: true, formes: ["grand", "grands", "grande", "grandes"] },
  { det: "la", detP: "les", nom: "vague", nomP: "vagues", genre: "f", avant: true, formes: ["petit", "petits", "petite", "petites"] },
  { det: "le", detP: "les", nom: "dessin", nomP: "dessins", genre: "m", avant: true, formes: ["joli", "jolis", "jolie", "jolies"] },
  { det: "une", detP: "des", nom: "mangue", nomP: "mangues", genre: "f", avant: false, formes: ["mûr", "mûrs", "mûre", "mûres"] },
  { det: "le", detP: "les", nom: "lagon", nomP: "lagons", genre: "m", avant: false, formes: ["bleu", "bleus", "bleue", "bleues"] },
  { det: "un", detP: "des", nom: "letchi", nomP: "letchis", genre: "m", avant: false, formes: ["sucré", "sucrés", "sucrée", "sucrées"] },
  { det: "la", detP: "les", nom: "fleur", nomP: "fleurs", genre: "f", avant: false, formes: ["blanc", "blancs", "blanche", "blanches"] },
  { det: "un", detP: "des", nom: "cahier", nomP: "cahiers", genre: "m", avant: false, formes: ["neuf", "neufs", "neuve", "neuves"] },
  { det: "une", detP: "des", nom: "trousse", nomP: "trousses", genre: "f", avant: false, formes: ["vert", "verts", "verte", "vertes"] },
  { det: "le", detP: "les", nom: "chien", nomP: "chiens", genre: "m", avant: false, formes: ["noir", "noirs", "noire", "noires"] },
  { det: "la", detP: "les", nom: "route", nomP: "routes", genre: "f", avant: false, formes: ["étroit", "étroits", "étroite", "étroites"] },
  { det: "un", detP: "des", nom: "margouillat", nomP: "margouillats", genre: "m", avant: false, formes: ["têtu", "têtus", "têtue", "têtues"] },
  { det: "le", detP: "les", nom: "piton", nomP: "pitons", genre: "m", avant: false, formes: ["fumant", "fumants", "fumante", "fumantes"] },
  { det: "un", detP: "des", nom: "cari", nomP: "caris", genre: "m", avant: false, formes: ["chaud", "chauds", "chaude", "chaudes"] },
  { det: "le", detP: "les", nom: "manguier", nomP: "manguiers", genre: "m", avant: false, formes: ["vert", "verts", "verte", "vertes"] },
  { det: "la", detP: "les", nom: "maitresse", nomP: "maitresses", genre: "f", avant: false, formes: ["content", "contents", "contente", "contentes"] },
  { det: "un", detP: "des", nom: "crayon", nomP: "crayons", genre: "m", avant: false, formes: ["cassé", "cassés", "cassée", "cassées"] },
  { det: "une", detP: "des", nom: "histoire", nomP: "histoires", genre: "f", avant: false, formes: ["court", "courts", "courte", "courtes"] },
  { det: "un", detP: "des", nom: "oiseau", nomP: "oiseaux", genre: "m", avant: false, formes: ["blanc", "blancs", "blanche", "blanches"] },
  { det: "une", detP: "des", nom: "feuille", nomP: "feuilles", genre: "f", avant: false, formes: ["vert", "verts", "verte", "vertes"] },
  { det: "le", detP: "les", nom: "pêcheur", nomP: "pêcheurs", genre: "m", avant: false, formes: ["fatigué", "fatigués", "fatiguée", "fatiguées"] },
  { det: "une", detP: "des", nom: "varangue", nomP: "varangues", genre: "f", avant: false, formes: ["bleu", "bleus", "bleue", "bleues"] },
  { det: "un", detP: "des", nom: "gâteau", nomP: "gâteaux", genre: "m", avant: false, formes: ["sucré", "sucrés", "sucrée", "sucrées"] },
  { det: "la", detP: "les", nom: "tortue", nomP: "tortues", genre: "f", avant: false, formes: ["lent", "lents", "lente", "lentes"] },
  { det: "une", detP: "des", nom: "case", nomP: "cases", genre: "f", avant: false, formes: ["ancien", "anciens", "ancienne", "anciennes"] },
];

/** L'adjectif au singulier, dans le genre du nom. */
const adjDe = (g: GroupeNominal) => (g.genre === "m" ? g.formes[0] : g.formes[2]);
/** L'adjectif au pluriel, dans le genre du nom. */
const adjPluriel = (g: GroupeNominal) => (g.genre === "m" ? g.formes[1] : g.formes[3]);
/** Les trois autres accords : de vrais mots, tous faux ici. */
const autresAccords = (g: GroupeNominal) =>
  g.formes.filter((f) => f !== adjPluriel(g));

/** Le groupe écrit dans SON ordre à lui. */
function ecrire(g: GroupeNominal, det: string, nom: string, adj: string): string {
  return g.avant ? `${det} ${adj} ${nom}` : `${det} ${nom} ${adj}`;
}

/** Le sujet d'une phrase où l'adjectif se retrouve après le verbe : toujours
 *  « Les », avec sa majuscule. Le déterminant du groupe (« des letchis ») ne
 *  s'écrit pas en tête de phrase, et un coach de français ne montre pas une
 *  phrase qui commence par une minuscule. */
const sujetPluriel = (g: GroupeNominal) => `Les ${g.nomP}`;

const auSingulier = (g: GroupeNominal) => ecrire(g, g.det, g.nom, adjDe(g));
const auPluriel = (g: GroupeNominal) => ecrire(g, g.detP, g.nomP, adjPluriel(g));

/** Les deux façons de rater le pluriel avec UN SEUL maillon en retard :
 *  l'adjectif oublié, ou le nom oublié. */
function unSeulMaillonManque(g: GroupeNominal): { texte: string; manque: string }[] {
  return [
    { texte: ecrire(g, g.detP, g.nomP, adjDe(g)), manque: "l'adjectif" },
    { texte: ecrire(g, g.detP, g.nom, adjPluriel(g)), manque: "le nom" },
  ];
}

/** Les trois façons de rater le pluriel, y compris les deux à la fois.
 *  Distracteurs seulement : tous faux, aucun ambigu. */
function plurielsRates(g: GroupeNominal): string[] {
  return [
    ...unSeulMaillonManque(g).map((x) => x.texte),
    ecrire(g, g.detP, g.nom, adjDe(g)),
  ];
}

/* ── Le genre ────────────────────────────────────────────────────────────────
   `sEntend` distingue les féminins qu'on ENTEND (petit → petite, le « t » se
   réveille) de ceux qu'on ne fait qu'écrire (joli → jolie).
   ⛔ Aucune paire ne repose sur un [e] contre un [ɛ] : un enfant d'ici aurait
   faux à cause de son accent, pas de son orthographe. Ce qui s'entend ici, ce
   sont des consonnes — t, d, n, l, r — audibles partout. */

type PaireGenre = {
  readonly m: string;
  readonly f: string;
  readonly sEntend: boolean;
};

const ADJECTIFS_GENRE: readonly PaireGenre[] = [
  { m: "petit", f: "petite", sEntend: true },
  { m: "grand", f: "grande", sEntend: true },
  { m: "vert", f: "verte", sEntend: true },
  { m: "content", f: "contente", sEntend: true },
  { m: "froid", f: "froide", sEntend: true },
  { m: "chaud", f: "chaude", sEntend: true },
  { m: "fort", f: "forte", sEntend: true },
  { m: "lourd", f: "lourde", sEntend: true },
  { m: "court", f: "courte", sEntend: true },
  { m: "haut", f: "haute", sEntend: true },
  { m: "plein", f: "pleine", sEntend: true },
  { m: "brun", f: "brune", sEntend: true },
  { m: "gentil", f: "gentille", sEntend: true },
  { m: "bon", f: "bonne", sEntend: true },
  { m: "mignon", f: "mignonne", sEntend: true },
  { m: "ancien", f: "ancienne", sEntend: true },
  { m: "premier", f: "première", sEntend: true },
  { m: "dernier", f: "dernière", sEntend: true },
  { m: "léger", f: "légère", sEntend: true },
  { m: "blanc", f: "blanche", sEntend: true },
  { m: "noir", f: "noire", sEntend: false },
  { m: "bleu", f: "bleue", sEntend: false },
  { m: "joli", f: "jolie", sEntend: false },
  { m: "sucré", f: "sucrée", sEntend: false },
  { m: "fatigué", f: "fatiguée", sEntend: false },
  { m: "poli", f: "polie", sEntend: false },
  { m: "carré", f: "carrée", sEntend: false },
  { m: "pointu", f: "pointue", sEntend: false },
];

const NOMS_GENRE: readonly PaireGenre[] = [
  { m: "un boulanger", f: "une boulangère", sEntend: true },
  { m: "un marchand", f: "une marchande", sEntend: true },
  { m: "un cousin", f: "une cousine", sEntend: true },
  { m: "un voisin", f: "une voisine", sEntend: true },
  { m: "un chat", f: "une chatte", sEntend: true },
  { m: "un chien", f: "une chienne", sEntend: true },
  { m: "un lion", f: "une lionne", sEntend: true },
  { m: "un maitre", f: "une maitresse", sEntend: true },
  { m: "un ami", f: "une amie", sEntend: false },
  { m: "un cousin germain", f: "une cousine germaine", sEntend: true },
];

/* ── Le pluriel des noms ─────────────────────────────────────────────────── */

type PairePluriel = { readonly s: string; readonly p: string };

const PLURIELS_S: readonly PairePluriel[] = [
  { s: "lapin", p: "lapins" }, { s: "ami", p: "amis" },
  { s: "pomme", p: "pommes" }, { s: "olive", p: "olives" },
  { s: "vélo", p: "vélos" }, { s: "letchi", p: "letchis" },
  { s: "mangue", p: "mangues" }, { s: "chien", p: "chiens" },
  { s: "fleur", p: "fleurs" }, { s: "cahier", p: "cahiers" },
  { s: "margouillat", p: "margouillats" }, { s: "case", p: "cases" },
  { s: "piton", p: "pitons" }, { s: "sentier", p: "sentiers" },
  { s: "coquille", p: "coquilles" }, { s: "tortue", p: "tortues" },
  { s: "crayon", p: "crayons" }, { s: "trousse", p: "trousses" },
  { s: "cousin", p: "cousins" }, { s: "tamarin", p: "tamarins" },
  { s: "canot", p: "canots" }, { s: "cloche", p: "cloches" },
  { s: "porte", p: "portes" }, { s: "camion", p: "camions" },
  { s: "manguier", p: "manguiers" }, { s: "varangue", p: "varangues" },
  { s: "pêcheur", p: "pêcheurs" }, { s: "élève", p: "élèves" },
  { s: "histoire", p: "histoires" }, { s: "route", p: "routes" },
];

// Le pluriel en -x. ⛔ Pas de -al/-aux : le BO les met au CE2.
const PLURIELS_X: readonly PairePluriel[] = [
  { s: "bateau", p: "bateaux" }, { s: "chapeau", p: "chapeaux" },
  { s: "gâteau", p: "gâteaux" }, { s: "oiseau", p: "oiseaux" },
  { s: "couteau", p: "couteaux" }, { s: "tableau", p: "tableaux" },
  { s: "drapeau", p: "drapeaux" }, { s: "morceau", p: "morceaux" },
  { s: "manteau", p: "manteaux" }, { s: "seau", p: "seaux" },
];

/* ── Le sujet et le verbe ────────────────────────────────────────────────────
   Écrites par paires, singulier et pluriel, jamais fabriquées. Les six
   dernières éloignent le sujet du verbe : c'est là que l'accord se perd. */

type SujetVerbe = {
  readonly s: string;
  readonly p: string;
  readonly nomS: string;
  readonly nomP: string;
  readonly verbeS: string;
  readonly verbeP: string;
};

// ⚠️ Tous les verbes sont du 1ᵉʳ groupe, et leur 3ᵉ personne du singulier finit
// par « e ». C'est ce qui rend les pièges honnêtes : « miaule / miaules /
// miaulez / miaulent » sont quatre formes qui EXISTENT, et l'enfant doit
// choisir. Avec « fleurit », il aurait fallu inventer « fleurits », qui ne
// trompe personne — un piège d'orthographe ne se fabrique pas.
const SUJET_VERBE: readonly SujetVerbe[] = [
  { s: "Le chat miaule.", p: "Les chats miaulent.", nomS: "chat", nomP: "chats", verbeS: "miaule", verbeP: "miaulent" },
  { s: "La voiture roule.", p: "Les voitures roulent.", nomS: "voiture", nomP: "voitures", verbeS: "roule", verbeP: "roulent" },
  { s: "L'oiseau chante.", p: "Les oiseaux chantent.", nomS: "oiseau", nomP: "oiseaux", verbeS: "chante", verbeP: "chantent" },
  { s: "Le letchi tombe.", p: "Les letchis tombent.", nomS: "letchi", nomP: "letchis", verbeS: "tombe", verbeP: "tombent" },
  { s: "La fleur pousse.", p: "Les fleurs poussent.", nomS: "fleur", nomP: "fleurs", verbeS: "pousse", verbeP: "poussent" },
  { s: "Le bateau arrive.", p: "Les bateaux arrivent.", nomS: "bateau", nomP: "bateaux", verbeS: "arrive", verbeP: "arrivent" },
  { s: "L'élève récite.", p: "Les élèves récitent.", nomS: "élève", nomP: "élèves", verbeS: "récite", verbeP: "récitent" },
  { s: "Le margouillat grimpe.", p: "Les margouillats grimpent.", nomS: "margouillat", nomP: "margouillats", verbeS: "grimpe", verbeP: "grimpent" },
  { s: "La vague glisse.", p: "Les vagues glissent.", nomS: "vague", nomP: "vagues", verbeS: "glisse", verbeP: "glissent" },
  { s: "Le pêcheur rentre.", p: "Les pêcheurs rentrent.", nomS: "pêcheur", nomP: "pêcheurs", verbeS: "rentre", verbeP: "rentrent" },
  { s: "La tortue avance.", p: "Les tortues avancent.", nomS: "tortue", nomP: "tortues", verbeS: "avance", verbeP: "avancent" },
  { s: "Le manguier pousse vite.", p: "Les manguiers poussent vite.", nomS: "manguier", nomP: "manguiers", verbeS: "pousse", verbeP: "poussent" },
  // Le sujet s'éloigne : un groupe se glisse entre lui et son verbe. C'est là
  // que l'accord se perd — l'enfant accorde avec le mot le plus proche.
  { s: "Le chien de Léa aboie.", p: "Les chiens de Léa aboient.", nomS: "chien", nomP: "chiens", verbeS: "aboie", verbeP: "aboient" },
  { s: "La case du pêcheur résiste au vent.", p: "Les cases du pêcheur résistent au vent.", nomS: "case", nomP: "cases", verbeS: "résiste", verbeP: "résistent" },
  { s: "Le cahier de Tom traine par terre.", p: "Les cahiers de Tom trainent par terre.", nomS: "cahier", nomP: "cahiers", verbeS: "traine", verbeP: "trainent" },
  { s: "L'enfant du voisin joue dehors.", p: "Les enfants du voisin jouent dehors.", nomS: "enfant", nomP: "enfants", verbeS: "joue", verbeP: "jouent" },
  { s: "La fleur du jardin penche vers le soleil.", p: "Les fleurs du jardin penchent vers le soleil.", nomS: "fleur", nomP: "fleurs", verbeS: "penche", verbeP: "penchent" },
  { s: "Le bateau du port klaxonne fort.", p: "Les bateaux du port klaxonnent fort.", nomS: "bateau", nomP: "bateaux", verbeS: "klaxonne", verbeP: "klaxonnent" },
  { s: "La vague du lagon monte doucement.", p: "Les vagues du lagon montent doucement.", nomS: "vague", nomP: "vagues", verbeS: "monte", verbeP: "montent" },
  { s: "Le crayon de ma sœur roule sous la table.", p: "Les crayons de ma sœur roulent sous la table.", nomS: "crayon", nomP: "crayons", verbeS: "roule", verbeP: "roulent" },
  { s: "L'élève de la classe lève la main.", p: "Les élèves de la classe lèvent la main.", nomS: "élève", nomP: "élèves", verbeS: "lève", verbeP: "lèvent" },
  { s: "Le canot du pêcheur tangue un peu.", p: "Les canots du pêcheur tanguent un peu.", nomS: "canot", nomP: "canots", verbeS: "tangue", verbeP: "tanguent" },
  { s: "La cloche de l'école sonne à midi.", p: "Les cloches de l'école sonnent à midi.", nomS: "cloche", nomP: "cloches", verbeS: "sonne", verbeP: "sonnent" },
  { s: "Le cousin de Léa arrive demain.", p: "Les cousins de Léa arrivent demain.", nomS: "cousin", nomP: "cousins", verbeS: "arrive", verbeP: "arrivent" },
  { s: "La feuille du manguier tombe sans bruit.", p: "Les feuilles du manguier tombent sans bruit.", nomS: "feuille", nomP: "feuilles", verbeS: "tombe", verbeP: "tombent" },
  { s: "Le camion de la mairie klaxonne au virage.", p: "Les camions de la mairie klaxonnent au virage.", nomS: "camion", nomP: "camions", verbeS: "klaxonne", verbeP: "klaxonnent" },
  { s: "La porte de la case grince un peu.", p: "Les portes de la case grincent un peu.", nomS: "porte", nomP: "portes", verbeS: "grince", verbeP: "grincent" },
  { s: "Le gâteau de mamie chauffe encore.", p: "Les gâteaux de mamie chauffent encore.", nomS: "gâteau", nomP: "gâteaux", verbeS: "chauffe", verbeP: "chauffent" },
  { s: "L'oiseau du jardin siffle le matin.", p: "Les oiseaux du jardin sifflent le matin.", nomS: "oiseau", nomP: "oiseaux", verbeS: "siffle", verbeP: "sifflent" },
  { s: "La maitresse de la classe explique la règle.", p: "Les maitresses de la classe expliquent la règle.", nomS: "maitresse", nomP: "maitresses", verbeS: "explique", verbeP: "expliquent" },
];

/** Le radical d'un verbe du 1ᵉʳ groupe à la 3ᵉ personne : « miaule » → « miaul ». */
const radicalDe = (verbeS: string) => verbeS.slice(0, -1);

/** Trois formes qui existent, et qui sont toutes fausses ici. */
function autresFormes(sv: SujetVerbe, bon: string): string[] {
  const r = radicalDe(sv.verbeS);
  return [sv.verbeS, sv.verbeP, `${r}es`, `${r}ez`].filter((f) => f !== bon);
}

/**
 * Les trois transformations RATÉES : le verbe oublié, le nom oublié, les deux.
 * Servir d'autres phrases du corpus comme pièges ne demanderait rien à
 * l'élève — il lui suffirait de reconnaitre le sujet. Ici, les quatre
 * propositions racontent la même chose, et une seule est accordée jusqu'au bout.
 */
function transformationsRatees(sv: SujetVerbe, versPluriel: boolean): string[] {
  // On part de la phrase JUSTE et on retire une marque à la fois. Le
  // déterminant, lui, reste toujours accordé : c'est le seul des trois qui
  // s'entende, et un enfant ne l'oublie pas.
  const bon = versPluriel ? sv.p : sv.s;
  const nomBon = versPluriel ? sv.nomP : sv.nomS;
  const nomFaux = versPluriel ? sv.nomS : sv.nomP;
  const verbeBon = versPluriel ? sv.verbeP : sv.verbeS;
  const verbeFaux = versPluriel ? sv.verbeS : sv.verbeP;
  return [
    bon.replace(nomBon, nomFaux),
    bon.replace(verbeBon, verbeFaux),
    bon.replace(nomBon, nomFaux).replace(verbeBon, verbeFaux),
  ];
}

/* ── Les homophones ──────────────────────────────────────────────────────────
   ⚠️ Le générateur commun demandait « Comment s'écrit le petit mot qui désigne
   un endroit ? » en attendant « ou » — alors que le mot est « où ». Les deux
   graphies sont ici écrites au caractère près, et le comparateur ne retire pas
   les accents. */

type Homophone = {
  readonly phrase: string;
  readonly bon: string;
  readonly autre: string;
  readonly test: string;
  readonly paire: string;
};

const HOMOPHONES: readonly Homophone[] = [
  { phrase: "Léa ___ un margouillat sur son cahier.", bon: "a", autre: "à", test: "On peut dire « Léa AVAIT un margouillat » : c'est le verbe avoir.", paire: "a / à" },
  { phrase: "Papa ___ faim.", bon: "a", autre: "à", test: "« Papa AVAIT faim » se dit : c'est le verbe avoir.", paire: "a / à" },
  { phrase: "Tom ___ mal aux dents.", bon: "a", autre: "à", test: "« Tom AVAIT mal » se dit : c'est le verbe avoir.", paire: "a / à" },
  { phrase: "Nous partons ___ la plage.", bon: "à", autre: "a", test: "« Nous partons AVAIT la plage » ne se dit pas : ce n'est pas le verbe avoir.", paire: "a / à" },
  { phrase: "Le bateau va ___ Saint-Pierre.", bon: "à", autre: "a", test: "« va AVAIT Saint-Pierre » ne se dit pas : ce n'est pas le verbe avoir.", paire: "a / à" },
  { phrase: "Je pense ___ mon frère.", bon: "à", autre: "a", test: "« Je pense AVAIT mon frère » ne se dit pas.", paire: "a / à" },
  { phrase: "Tu veux un letchi ___ une mangue ?", bon: "ou", autre: "où", test: "On peut dire « OU BIEN une mangue » : c'est le petit mot du choix.", paire: "ou / où" },
  { phrase: "Le cari est doux ___ pimenté.", bon: "ou", autre: "où", test: "« OU BIEN pimenté » se dit : c'est le choix.", paire: "ou / où" },
  { phrase: "On y va à pied ___ en bus ?", bon: "ou", autre: "où", test: "« OU BIEN en bus » se dit : c'est le choix.", paire: "ou / où" },
  { phrase: "___ as-tu rangé ma trousse ?", bon: "Où", autre: "Ou", test: "« OU BIEN as-tu rangé » ne se dit pas : ici on demande un endroit, il faut l'accent.", paire: "ou / où" },
  { phrase: "Voici la case ___ habite Mamie.", bon: "où", autre: "ou", test: "« OU BIEN habite Mamie » ne se dit pas : c'est un endroit, il faut l'accent.", paire: "ou / où" },
  { phrase: "Je ne sais pas ___ est mon crayon.", bon: "où", autre: "ou", test: "On parle d'un endroit : il faut l'accent.", paire: "ou / où" },
  { phrase: "Le lagon ___ calme ce matin.", bon: "est", autre: "et", test: "On peut dire « le lagon ÉTAIT calme » : c'est le verbe être.", paire: "et / est" },
  { phrase: "Mon cousin ___ plus grand que moi.", bon: "est", autre: "et", test: "« mon cousin ÉTAIT plus grand » se dit : c'est le verbe être.", paire: "et / est" },
  { phrase: "La porte ___ ouverte.", bon: "est", autre: "et", test: "« la porte ÉTAIT ouverte » se dit : c'est le verbe être.", paire: "et / est" },
  { phrase: "Tom ___ Léa ramassent des letchis.", bon: "et", autre: "est", test: "On peut dire « Tom ET PUIS Léa » : ce petit mot relie deux choses.", paire: "et / est" },
  { phrase: "J'ai pris mon cahier ___ ma trousse.", bon: "et", autre: "est", test: "« mon cahier ET PUIS ma trousse » se dit : il relie deux choses.", paire: "et / est" },
  { phrase: "Il pleut ___ le vent souffle.", bon: "et", autre: "est", test: "« ET PUIS le vent souffle » se dit : il relie deux idées.", paire: "et / est" },
  { phrase: "Les letchis ___ mûrs.", bon: "sont", autre: "son", test: "On peut dire « les letchis ÉTAIENT mûrs » : c'est le verbe être.", paire: "son / sont" },
  { phrase: "Mes cousins ___ à la plage.", bon: "sont", autre: "son", test: "« mes cousins ÉTAIENT à la plage » se dit : c'est le verbe être.", paire: "son / sont" },
  { phrase: "Les bateaux ___ rentrés au port.", bon: "sont", autre: "son", test: "« les bateaux ÉTAIENT rentrés » se dit : c'est le verbe être.", paire: "son / sont" },
  { phrase: "Léa a oublié ___ cahier.", bon: "son", autre: "sont", test: "« a oublié ÉTAIENT cahier » ne se dit pas. On peut dire « LE SIEN » : c'est le petit mot qui dit à qui c'est.", paire: "son / sont" },
  { phrase: "Tom range ___ crayon.", bon: "son", autre: "sont", test: "« range ÉTAIENT crayon » ne se dit pas : c'est le petit mot qui dit à qui c'est.", paire: "son / sont" },
  { phrase: "Le chien remue ___ museau.", bon: "son", autre: "sont", test: "« remue ÉTAIENT museau » ne se dit pas : c'est le petit mot qui dit à qui c'est.", paire: "son / sont" },
];

export const orthographeBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_ORTH_ACCORD_GN — le groupe entier bouge ensemble
  ========================================================= */
  {
    kind: "template",
    id: "ce1_orth_accord_gn_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_accord_gn",
    difficulty: 2,
    theme: "neutral",
    hint: "Trois mots, trois marques à poser. Fais le tour du groupe.",
    tags: ["ce1", "orthographe", "accord-gn", "template"],
    generate: () => {
      const g = randomChoice(GROUPES);
      const bon = auPluriel(g);
      return {
        text: `« ${auSingulier(g)} » : écris ce groupe au pluriel.`,
        format: "qcm" as const,
        choices: makeChoices(bon, plurielsRates(g)),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Dans un groupe nominal, le déterminant, le nom et l'adjectif portent tous la même marque.",
          "Fais le tour du groupe mot par mot : déterminant, nom, adjectif. Chacun doit recevoir sa marque.",
          `${auSingulier(g)} → ${bon}. Trois mots ont changé, et aucun des trois ne s'entend.`,
          `On écrit « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_orth_accord_gn_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_accord_gn",
    difficulty: 2,
    theme: "neutral",
    hint: "Le déterminant a déjà prévenu qu'ils sont plusieurs. À toi de suivre.",
    tags: ["ce1", "orthographe", "accord-gn", "template"],
    generate: () => {
      const g = randomChoice(GROUPES);
      const trou = g.avant
        ? `${g.detP} ___ ${g.nomP}`
        : `${g.detP} ${g.nomP} ___`;
      const bon = adjPluriel(g);
      return {
        text: `Complète : « ${trou} » avec l'adjectif « ${g.formes[0]} ».`,
        format: "qcm" as const,
        choices: makeChoices(bon, autresAccords(g)),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'adjectif prend le genre ET le nombre du nom qu'il décrit.",
          "Deux questions dans l'ordre : masculin ou féminin ? un seul ou plusieurs ? Puis choisis la forme.",
          `« ${g.nomP} » est ${g.genre === "m" ? "masculin" : "féminin"} et ils sont plusieurs : l'adjectif s'écrit « ${bon} ». Les trois autres formes existent, mais elles vont avec d'autres noms.`,
          `On écrit « ${auPluriel(g)} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_orth_accord_gn_tpl_3",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_accord_gn",
    difficulty: 3,
    theme: "neutral",
    hint: "Relis mot à mot et compare avec la version au singulier.",
    tags: ["ce1", "orthographe", "accord-gn", "template"],
    generate: () => {
      const g = randomChoice(GROUPES);
      // ⚠️ Un SEUL maillon en retard : le troisième raté en oublie deux, et la
      // question « lequel ? » n'aurait alors pas une seule bonne réponse.
      const { texte: rate, manque } = randomChoice(unSeulMaillonManque(g));
      return {
        text: `« ${rate} » — un mot n'a pas reçu sa marque du pluriel. Lequel ?`,
        format: "qcm" as const,
        choices: shuffle(["le déterminant", "le nom", "l'adjectif", "aucun, c'est correct"]),
        expected: [manque],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Quand un mot du groupe passe au pluriel, tous les autres doivent suivre. Il suffit qu'un seul reste en arrière pour que le groupe soit faux.",
          "Pose ton doigt sur chaque mot et demande-toi : porte-t-il sa marque ?",
          `Il fallait écrire « ${auPluriel(g)} ». Ici, ${manque} est resté au singulier.`,
          `Le mot en retard, c'est ${manque}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ORTH_MARQUE_FEMININ — le « e » qui s'entend, et celui qui ne s'entend pas
  ========================================================= */
  {
    kind: "template",
    id: "ce1_orth_marque_feminin_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_marque_feminin",
    difficulty: 2,
    theme: "neutral",
    hint: "Le plus souvent, on ajoute un « e ». Mais pas toujours seulement.",
    tags: ["ce1", "orthographe", "feminin", "template"],
    generate: () => {
      const a = randomChoice(ADJECTIFS_GENRE);
      const autres = shuffle(ADJECTIFS_GENRE.filter((x) => x.f !== a.f))
        .slice(0, 2)
        .map((x) => x.f);
      return {
        text: `Écris l'adjectif « ${a.m} » au féminin.`,
        format: "qcm" as const,
        choices: makeChoices(a.f, [a.m, `${a.m}e`, ...autres]),
        expected: [a.f],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Au féminin, l'adjectif prend un « e ». Certains doublent aussi leur dernière consonne, ou changent leur fin.",
          "Dis le mot au féminin à voix haute : parfois une consonne se réveille, et c'est elle qui te dit quoi écrire.",
          a.sEntend
            ? `${a.m} → ${a.f}. On ENTEND la différence : la consonne de la fin se réveille.`
            : `${a.m} → ${a.f}. On n'entend RIEN de plus : le « e » ne s'écrit que pour les yeux.`,
          `Au féminin, on écrit « ${a.f} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_orth_marque_feminin_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_marque_feminin",
    difficulty: 3,
    theme: "neutral",
    hint: "Dis les deux mots à voix haute, l'un après l'autre. Ta bouche change-t-elle ?",
    tags: ["ce1", "orthographe", "feminin", "template"],
    generate: () => {
      const a = randomChoice(ADJECTIFS_GENRE);
      const bon = a.sEntend
        ? "Oui, on entend une lettre de plus à la fin"
        : "Non, les deux se disent exactement pareil";
      return {
        text: `« ${a.m} » et « ${a.f} » : entend-on une différence quand on les dit ?`,
        format: "qcm" as const,
        choices: [
          "Oui, on entend une lettre de plus à la fin",
          "Non, les deux se disent exactement pareil",
        ],
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le « e » du féminin réveille parfois la consonne d'avant, et parfois non.",
          "Prononce les deux mots l'un après l'autre et écoute la toute fin.",
          a.sEntend
            ? `${a.m} … ${a.f} : la fin change, on l'entend. C'est ton oreille qui peut t'aider.`
            : `${a.m} … ${a.f} : ta bouche dit la même chose. Ici, ton oreille ne sert à rien — il faut se souvenir que le nom est féminin.`,
          bon,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_orth_marque_feminin_tpl_3",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_marque_feminin",
    difficulty: 2,
    theme: "neutral",
    hint: "Certains noms changent la fin de leur mot, pas seulement leur dernière lettre.",
    tags: ["ce1", "orthographe", "feminin", "template"],
    generate: () => {
      const n = randomChoice(NOMS_GENRE);
      const autres = shuffle(NOMS_GENRE.filter((x) => x.f !== n.f))
        .slice(0, 2)
        .map((x) => x.f);
      const naif = `${n.m.replace(/^un /, "une ")}e`;
      return {
        text: `« ${n.m} » : comment dit-on au féminin ?`,
        format: "qcm" as const,
        choices: makeChoices(n.f, [naif, ...autres]),
        expected: [n.f],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le nom aussi change de forme au féminin, et le déterminant change avec lui.",
          "Change d'abord le petit mot devant, puis la fin du nom.",
          `${n.m} → ${n.f}. Ajouter un « e » tout seul ne suffit pas toujours : « ${naif} » ne se dit pas.`,
          `Au féminin, on dit « ${n.f} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_orth_marque_feminin_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_marque_feminin",
    difficulty: 3,
    theme: "neutral",
    text: "« bon » au féminin : « bone » ou « bonne » ?",
    format: "qcm",
    choices: ["bonne, avec deux « n »", "bone, avec un seul « n »", "bon, ça ne change pas", "bonée"],
    expected: ["bonne, avec deux « n »"],
    comparator: "mcq_exact",
    hint: "Dis « bo-ne » et « bonne ». Le premier ne se dit pas comme il faut.",
    explanation: exp(
      "Quelques adjectifs doublent leur dernière consonne au féminin : bon → bonne, mignon → mignonne, gentil → gentille, ancien → ancienne.",
      "Écris le mot, puis relis-le à voix haute : si ça ne sonne pas juste, c'est qu'il manque une lettre.",
      "« bone » se lirait « bo-ne ». Il faut deux « n » pour que le son reste celui de « bonne ».",
      "On écrit « bonne », avec deux « n ».",
    ),
    tags: ["ce1", "orthographe", "feminin", "piege", "qcm"],
  },

  /* =========================================================
     CE1_ORTH_PLURIEL — un « s » qu'on n'entend pas
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_orth_pluriel_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_pluriel",
    difficulty: 3,
    theme: "neutral",
    text: "« une pomme » et « des pommes » : entend-on le « s » quand on les dit ?",
    format: "qcm",
    choices: [
      "Non : c'est le petit mot devant qui prévient",
      "Oui, on entend un sifflement à la fin",
      "Oui, le second est plus long",
      "Non, et il ne s'écrit pas non plus",
    ],
    expected: ["Non : c'est le petit mot devant qui prévient"],
    comparator: "mcq_exact",
    hint: "Dis les deux à voix haute et compare la fin.",
    explanation: exp(
      "La marque du pluriel des noms est un « s ». Il s'écrit, mais il ne s'entend pas.",
      "Regarde le déterminant : des, les, deux, mes annoncent plusieurs. Le nom doit alors prendre son s.",
      "une pomme / des pommes : ta bouche dit la même chose. C'est « des » qui prévient qu'il y en a plusieurs.",
      "Non : c'est le petit mot devant qui prévient.",
    ),
    tags: ["ce1", "orthographe", "pluriel", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_orth_pluriel_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_pluriel",
    difficulty: 2,
    theme: "neutral",
    hint: "La plupart des noms prennent un « s ». Quelques-uns prennent un « x ».",
    tags: ["ce1", "orthographe", "pluriel", "template"],
    generate: () => {
      const enX = Math.random() < 0.4;
      const mot = enX ? randomChoice(PLURIELS_X) : randomChoice(PLURIELS_S);
      // ⚠️ Deux pièges, pas trois, et les deux sont de VRAIES erreurs d'enfant :
      // oublier la marque, ou se tromper de marque. Fabriquer un troisième
      // (« manteauxs », « lapines ») donnerait un mot qui ne trompe personne —
      // ou pire, un mot qui existe. Les trois propositions se disent d'ailleurs
      // exactement pareil : la marque du pluriel ne s'entend jamais.
      const autres = enX ? [mot.s, `${mot.s}s`] : [mot.s, `${mot.s}x`];
      return {
        text: `Écris le nom « ${mot.s} » au pluriel.`,
        format: "qcm" as const,
        choices: makeChoices(mot.p, autres),
        expected: [mot.p],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Au pluriel, presque tous les noms prennent un « s ». Les noms en -eau prennent un « x ».",
          "Regarde la fin du nom au singulier : s'il finit par -eau, ce sera un « x ».",
          enX
            ? `un ${mot.s} → des ${mot.p}. Le « x » remplace le « s », et lui non plus ne s'entend pas.`
            : `un ${mot.s} → des ${mot.p}. Un « s » de plus, et rien de plus à entendre.`,
          `On écrit « ${mot.p} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_orth_pluriel_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_pluriel",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde la fin de chaque mot, l'un après l'autre.",
    tags: ["ce1", "orthographe", "pluriel", "template"],
    generate: () => {
      const g = randomChoice(GROUPES);
      const bon = "2 : le nom et l'adjectif";
      return {
        text: `Dans « ${auPluriel(g)} », combien de mots portent la marque du pluriel, sans compter le petit mot du début ?`,
        format: "qcm" as const,
        choices: [
          "2 : le nom et l'adjectif",
          `1 : ${g.nomP} seulement`,
          `1 : ${adjPluriel(g)} seulement`,
          "aucun",
        ],
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Dans un groupe au pluriel, le nom ET l'adjectif portent la marque.",
          "Regarde la fin de chaque mot : qui porte un « s » ou un « x » ?",
          `${g.nomP} et ${adjPluriel(g)} en portent un chacun. « ${g.detP} » avait déjà prévenu, mais on ne le compte pas ici.`,
          "Deux mots la portent : le nom et l'adjectif.",
        ),
      };
    },
  },

  /* =========================================================
     CE1_ORTH_ADJECTIF_ELOIGNE — la nouveauté du CE1
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_orth_adjectif_eloigne_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_adjectif_eloigne",
    difficulty: 3,
    theme: "neutral",
    text: "« Les mangues sont mûr___ ». L'adjectif est loin du nom : doit-il s'accorder quand même ?",
    format: "qcm",
    choices: [
      "Oui : « mûres », il obéit toujours au nom, même de loin",
      "Non : il est trop loin, il ne bouge plus",
      "Non : c'est le verbe qui décide",
      "Oui, mais il prend seulement un « e »",
    ],
    expected: ["Oui : « mûres », il obéit toujours au nom, même de loin"],
    comparator: "mcq_exact",
    hint: "Demande-toi de qui on parle : mûres, ce sont les mangues.",
    explanation: exp(
      "Un adjectif obéit au nom qu'il décrit, même quand un verbe s'est glissé entre les deux.",
      "Pose la question : qui est mûr ? La réponse te donne le nom, et l'accord suit.",
      "Les mangues sont mûres. Le verbe « sont » sépare les deux mots, mais « mûres » parle bien des mangues : féminin, pluriel.",
      "Oui : on écrit « mûres ».",
    ),
    tags: ["ce1", "orthographe", "adjectif-eloigne", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_orth_adjectif_eloigne_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_adjectif_eloigne",
    difficulty: 3,
    theme: "neutral",
    hint: "Le verbe s'est glissé au milieu. L'adjectif obéit quand même au nom.",
    tags: ["ce1", "orthographe", "adjectif-eloigne", "template"],
    generate: () => {
      const g = randomChoice(GROUPES);
      const debut = `${sujetPluriel(g)} sont`;
      const bon = adjPluriel(g);
      return {
        text: `Complète : « ${debut} ___. » (adjectif « ${g.formes[0]} »)`,
        format: "qcm" as const,
        choices: makeChoices(bon, autresAccords(g)),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'adjectif s'accorde avec le nom dont il parle, même séparé de lui par un verbe.",
          "Remonte du verbe jusqu'au nom, puis compte : un seul, ou plusieurs ? Masculin, ou féminin ?",
          `Qui est ${g.formes[0]} ? « ${g.nomP} » : ${g.genre === "m" ? "masculin" : "féminin"}, et ils sont plusieurs. On écrit « ${bon} ».`,
          `On écrit « ${debut} ${bon}. »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_orth_adjectif_eloigne_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_adjectif_eloigne",
    difficulty: 3,
    theme: "neutral",
    hint: "Pose la question : de qui, ou de quoi, parle cet adjectif ?",
    tags: ["ce1", "orthographe", "adjectif-eloigne", "template"],
    generate: () => {
      const g = randomChoice(GROUPES);
      const bon = adjPluriel(g);
      const phrase = `${sujetPluriel(g)} sont ${bon}.`;
      const autres = shuffle(GROUPES.filter((x) => x.nomP !== g.nomP))
        .slice(0, 3)
        .map((x) => x.nomP);
      return {
        text: `« ${phrase} »\n\nÀ quel mot l'adjectif « ${bon} » obéit-il ?`,
        format: "qcm" as const,
        choices: makeChoices(g.nomP, [...autres, "sont"]),
        expected: [g.nomP],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un adjectif prend toujours le genre et le nombre du nom dont il parle.",
          "Pose la question « qui est… ? » et cherche la réponse dans la phrase.",
          `Qui est ${bon} ? « ${g.nomP} ». C'est donc à lui que l'adjectif obéit — pas au verbe, qui ne fait que se trouver au milieu.`,
          `L'adjectif obéit à « ${g.nomP} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ORTH_ACCORD_SUJ_V
  ========================================================= */
  {
    kind: "template",
    id: "ce1_orth_accord_suj_v_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_accord_suj_v",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte d'abord : un seul, ou plusieurs ? Le verbe suivra.",
    tags: ["ce1", "orthographe", "sujet-verbe", "template"],
    generate: () => {
      const sv = randomChoice(SUJET_VERBE);
      const versPluriel = Math.random() < 0.5;
      const depart = versPluriel ? sv.s : sv.p;
      const arrivee = versPluriel ? sv.p : sv.s;
      return {
        text: `« ${depart} »\n\nÉcris la même phrase ${versPluriel ? "au PLURIEL" : "au SINGULIER"}.`,
        format: "qcm" as const,
        choices: makeChoices(arrivee, transformationsRatees(sv, versPluriel)),
        expected: [arrivee],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le verbe s'accorde avec son sujet : si le sujet passe au pluriel, le verbe aussi.",
          "Change d'abord le sujet en entier, puis regarde la fin du verbe.",
          `${sv.s} → ${sv.p}. Le nom prend son « s », le verbe prend « -nt ». Ni l'un ni l'autre ne s'entend.`,
          `On écrit « ${arrivee} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_orth_accord_suj_v_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_accord_suj_v",
    difficulty: 3,
    theme: "neutral",
    hint: "Remonte du verbe jusqu'au sujet, en sautant ce qu'il y a entre les deux.",
    tags: ["ce1", "orthographe", "sujet-verbe", "template"],
    generate: () => {
      const sv = randomChoice(SUJET_VERBE);
      const pluriel = Math.random() < 0.5;
      const phrase = pluriel ? sv.p : sv.s;
      const bon = pluriel ? sv.verbeP : sv.verbeS;
      const trou = phrase.replace(bon, "___");
      return {
        text: `Complète : « ${trou} »`,
        format: "qcm" as const,
        choices: makeChoices(bon, autresFormes(sv, bon)),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le verbe obéit à son sujet. Pour le trouver, on demande : qui fait l'action ?",
          "Pose la question « qui est-ce qui … ? » devant le verbe, puis compte combien ils sont.",
          `Ici, ils sont ${pluriel ? "plusieurs" : "un seul"} : le verbe s'écrit « ${bon} ».`,
          `On écrit « ${phrase} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ORTH_PLURIEL_VERBE — « -nt », et il ne s'entend pas
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_orth_pluriel_verbe_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_pluriel_verbe",
    difficulty: 3,
    theme: "neutral",
    text: "« Il chante » et « ils chantent » : qu'est-ce qui te prévient qu'il faut écrire « -ent » ?",
    format: "qcm",
    choices: [
      "Le « s » de « ils » : ta bouche dit la même chose dans les deux cas",
      "On entend le « nt » à la fin",
      "Le verbe est plus long",
      "Rien, il faut deviner",
    ],
    expected: ["Le « s » de « ils » : ta bouche dit la même chose dans les deux cas"],
    comparator: "mcq_exact",
    hint: "Dis les deux à voix haute, l'une après l'autre.",
    explanation: exp(
      "La marque du pluriel des verbes est « -nt ». Elle s'écrit et ne s'entend pas.",
      "Ne compte pas sur ton oreille : remonte au sujet et compte combien ils sont.",
      "Il chante. Ils chantent. Ta bouche dit exactement la même chose. C'est le « s » de « ils » qui prévient.",
      "C'est le « s » de « ils » qui prévient.",
    ),
    tags: ["ce1", "orthographe", "pluriel-verbe", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_orth_pluriel_verbe_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_pluriel_verbe",
    difficulty: 3,
    theme: "neutral",
    hint: "Le sujet est-il au pluriel ? Alors le verbe doit finir par « -nt ».",
    tags: ["ce1", "orthographe", "pluriel-verbe", "template"],
    generate: () => {
      const sv = randomChoice(SUJET_VERBE);
      const abimee = sv.p.replace(sv.verbeP, sv.verbeS);
      return {
        text: `« ${abimee} »\n\nQu'est-ce qui ne va pas dans cette phrase ?`,
        format: "qcm" as const,
        choices: shuffle([
          `Le verbe : il faut « ${sv.verbeP} », parce qu'ils sont plusieurs`,
          "Le nom : il ne devrait pas prendre de « s »",
          "Le déterminant : il faudrait « le »",
          "Rien, la phrase est correcte",
        ]),
        expected: [`Le verbe : il faut « ${sv.verbeP} », parce qu'ils sont plusieurs`],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Quand le sujet est au pluriel, le verbe prend « -nt ».",
          "Remonte du verbe vers le sujet et compte combien ils sont.",
          `Le sujet annonce plusieurs, mais le verbe est resté au singulier. Il fallait écrire « ${sv.p} » — et ça se dit pareil, ce qui rend la faute invisible à l'oreille.`,
          `C'est le verbe : il faut « ${sv.verbeP} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_orth_pluriel_verbe_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_pluriel_verbe",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la fin en « -nt ».",
    tags: ["ce1", "orthographe", "pluriel-verbe", "template"],
    generate: () => {
      const sv = randomChoice(SUJET_VERBE);
      // ⚠️ Plusieurs phrases du corpus partagent un verbe — « pousse » revient
      // deux fois, « klaxonne » aussi. Tirer trois phrases au hasard faisait
      // parfois sortir deux fois le même mot, et le QCM tombait à trois lignes.
      // On dédoublonne le vivier AVANT de tirer.
      const vivier = [...new Set(SUJET_VERBE.map((x) => x.verbeS))].filter(
        (v) => v !== sv.verbeS && v !== sv.verbeP,
      );
      const autres = shuffle(vivier).slice(0, 2);
      return {
        text: `Dans « ${sv.p} », quel mot porte la marque du pluriel des verbes ?`,
        format: "qcm" as const,
        choices: makeChoices(sv.verbeP, [sv.verbeS, ...autres]),
        expected: [sv.verbeP],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La marque du pluriel des verbes, c'est « -nt » à la fin.",
          "Cherche le mot qui dit l'action, puis regarde ses deux dernières lettres.",
          `« ${sv.verbeP} » finit par « -nt ». Au singulier, il s'écrirait « ${sv.verbeS} », et se dirait exactement pareil.`,
          `Le mot est « ${sv.verbeP} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ORTH_HOMOPHONE — a/à, ou/où, et/est, son/sont
  ========================================================= */
  {
    kind: "template",
    id: "ce1_orth_homophone_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_homophone",
    difficulty: 3,
    theme: "neutral",
    hint: "Ces deux mots se disent pareil. Essaie de les remplacer pour trancher.",
    tags: ["ce1", "orthographe", "homophones", "template"],
    generate: () => {
      const h = randomChoice(HOMOPHONES);
      return {
        text: `Complète avec le bon mot :\n\n« ${h.phrase} »`,
        format: "qcm" as const,
        choices: shuffle([h.bon, h.autre]),
        expected: [h.bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          `« ${h.paire} » : deux mots qui se disent pareil et qui ne veulent pas dire la même chose.`,
          "Remplace le mot par un autre pour voir lequel tient debout.",
          h.test,
          `Ici, on écrit « ${h.bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_orth_homophone_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_homophone",
    difficulty: 3,
    theme: "neutral",
    hint: "Le remplacement, c'est le seul moyen sûr. Ton oreille ne peut pas t'aider.",
    tags: ["ce1", "orthographe", "homophones", "template"],
    generate: () => {
      const h = randomChoice(HOMOPHONES);
      const juste = Math.random() < 0.5;
      const phrase = h.phrase.replace("___", juste ? h.bon : h.autre);
      return {
        text: `Cette phrase est-elle correctement écrite ?\n\n« ${phrase} »`,
        format: "qcm" as const,
        choices: ["oui", "non"],
        expected: [juste ? "oui" : "non"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          `« ${h.paire} » : deux mots qui se disent pareil et s'écrivent autrement. Ton oreille ne peut pas trancher.`,
          "Remplace le mot par un autre : garde la phrase qui tient encore debout.",
          h.test,
          juste
            ? `Oui : « ${h.bon} » est le bon mot ici.`
            : `Non : il fallait « ${h.bon} », pas « ${h.autre} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_orth_homophone_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_homophone",
    difficulty: 2,
    theme: "neutral",
    text: "Quel mot faut-il essayer à la place, pour savoir si on écrit « a » ou « à » ?",
    format: "qcm",
    choices: ["avait", "était", "et puis", "ou bien"],
    expected: ["avait"],
    comparator: "mcq_exact",
    hint: "« a » vient d'un verbe. Lequel ?",
    explanation: exp(
      "« a » est le verbe avoir. « à » est un petit mot qui ne change jamais.",
      "Remplace par « avait » : si la phrase tient encore, c'est le verbe, donc « a » sans accent.",
      "Léa A un margouillat → Léa AVAIT un margouillat : ça se dit, donc « a ». Nous partons À la plage → nous partons AVAIT la plage : ça ne se dit pas, donc « à » avec l'accent.",
      "Le mot à essayer est « avait ».",
    ),
    tags: ["ce1", "orthographe", "homophones", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_orth_homophone_fixed_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_homophone",
    difficulty: 2,
    theme: "neutral",
    text: "« Voici la case ___ habite Mamie. » Quel mot faut-il ?",
    format: "qcm",
    choices: ["où, avec l'accent : c'est un endroit", "ou, sans accent", "au", "houx"],
    expected: ["où, avec l'accent : c'est un endroit"],
    comparator: "mcq_exact",
    hint: "Essaie « ou bien » à la place. Est-ce que ça se dit ?",
    explanation: exp(
      "« ou » sert à choisir entre deux choses. « où » sert à dire un endroit, et il porte un accent.",
      "Remplace par « ou bien » : si ça se dit, c'est « ou » sans accent. Sinon, c'est « où ».",
      "« la case OU BIEN habite Mamie » ne se dit pas : on parle d'un endroit, donc il faut l'accent.",
      "Il faut « où », avec l'accent.",
    ),
    tags: ["ce1", "orthographe", "homophones", "piege", "qcm"],
  },

  /* =========================================================
     CE1_ORTH_DEFI — le groupe ET le verbe, dans la même phrase
  ========================================================= */
  {
    kind: "template",
    id: "ce1_orth_defi_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux accords à vérifier : dans le groupe, puis entre le sujet et le verbe.",
    tags: ["ce1", "orthographe", "defi", "template"],
    generate: () => {
      const g = randomChoice(GROUPES);
      const adjP = adjPluriel(g);
      const adjS = adjDe(g);
      // Deux accords dans la même phrase : le nom au pluriel, et l'adjectif
      // qui le suit de loin. Trois façons d'en rater au moins un.
      const bon = `Les ${g.nomP} sont ${adjP}.`;
      const faux = [
        `Les ${g.nom} sont ${adjP}.`,
        `Les ${g.nomP} sont ${adjS}.`,
        `Les ${g.nom} sont ${adjS}.`,
      ];
      return {
        text: `On parle de plusieurs « ${g.nom} », et l'adjectif est « ${g.formes[0]} ».\n\nQuelle phrase est entièrement correcte ?`,
        format: "qcm" as const,
        choices: shuffle([bon, ...faux]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase n'est juste que si TOUS les accords le sont : celui du nom, et celui de l'adjectif qui le suit de loin.",
          "Vérifie dans l'ordre : le nom d'abord, l'adjectif après le verbe ensuite.",
          `${bon} Deux marques du pluriel, et pas une seule ne s'entend. Il suffit qu'un maillon lâche pour que la phrase soit fausse.`,
          `La phrase correcte est « ${bon} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_orth_defi_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux lettres muettes à trouver : celle du nom, celle du verbe.",
    tags: ["ce1", "orthographe", "defi", "template"],
    generate: () => {
      const sv = randomChoice(SUJET_VERBE);
      // Le nom du sujet et son verbe : les deux mots qui portent une marque
      // qu'on n'entend pas. Le nom est lu dans la table, pas cherché dans la
      // phrase — « bateaux » ne finit pas par un « s ».
      const bon = `« ${sv.nomP} » et « ${sv.verbeP} »`;
      return {
        text: `« ${sv.p} »\n\nDeux mots portent une marque du pluriel qu'on n'entend pas. Lesquels ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `« Les » et « ${sv.nomP} »`,
          `« ${sv.verbeP} » seulement`,
          "« Les » seulement",
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le nom prend un « s » ou un « x », le verbe prend « -nt ». Aucune des deux marques ne s'entend : seul « les », au début, se dit vraiment.",
          "Dis la phrase au singulier dans ta tête et compare : les mots qui changent à l'écrit sans changer à l'oreille sont ceux-là.",
          `${sv.s} → ${sv.p}. « ${sv.nomP} » et « ${sv.verbeP} » ont pris leur marque en silence. « Les », lui, s'entend bien.`,
          `Ce sont ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_orth_defi_ouverte_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce1_orth_defi",
    difficulty: 3,
    theme: "neutral",
    text: "« Les margouillats grimpent sur le mur. »\n\nQuatre lettres de cette phrase ne s'entendent pas du tout. Explique avec tes mots comment tu sais qu'il faut les écrire.",
    format: "open",
    expected: ["les", "plusieurs", "pluriel", "s", "nt", "petit mot", "sujet", "devant"],
    comparator: "contains_keyword",
    hint: "Regarde le petit mot du début, puis la fin du nom, puis la fin du verbe.",
    explanation: exp(
      "Le « s » du nom et le « -nt » du verbe s'écrivent sans jamais s'entendre. Seul le petit mot du début prévient.",
      "Lis le déterminant, compte, puis pose la marque sur le nom et sur le verbe.",
      "« Les » annonce plusieurs. Donc « margouillats » prend un « s », et « grimpent » prend « -nt ». Dis la phrase au singulier : ta bouche dit presque la même chose.",
      "C'est « les », au début, qui prévient qu'il faut écrire le « s » et le « -nt ».",
    ),
    tags: ["ce1", "orthographe", "defi", "methode", "open"],
  },
];
