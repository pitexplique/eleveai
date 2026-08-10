// lib/tutor-v4/questionBank/ce2/francais/orthographe.bank.ts
//
// L'orthographe grammaticale du CE2, écrite à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, CE2) :
//   — « Marquer les accords dans le groupe nominal » ;
//   — « Marquer l'accord du verbe avec son sujet » ;
//   — « Gérer les chaines d'accord dans la phrase » — c'est-à-dire au-delà du
//     seul groupe nominal ;
//   — les PLURIELS IRRÉGULIERS : les noms en -x, et les noms en -al qui font
//     -aux ;
//   — le FÉMININ QUI S'ENTEND : lecteur / lectrice, joyeux / joyeuse. Le BO
//     donne ces deux couples lui-même ;
//   — les homophones grammaticaux les plus fréquents ;
//   — les mots invariables.
//
// CE QUI MANQUAIT : les pluriels irréguliers et le féminin qui s'entend n'ont
// jamais eu une seule question. Le repli servait au CE2 les questions du CP,
// où la marque du pluriel est un « s » et rien d'autre.
//
// LE PIÈGE DE LA NOTION, celui du CP prolongé d'un cran : au CP, le « s » ne
// s'entend pas et c'est le déterminant qui prévient. Au CE2, la chaine s'allonge
// — déterminant, nom, adjectif, puis le verbe — et certaines marques, elles,
// s'entendent enfin : lectrice, joyeuse, chevaux. L'enfant qui a appris que
// « ça ne s'entend jamais » se fait piéger par celles qu'on entend.
//
// ⚠️ AUCUN GROUPE NOMINAL RECOMPOSÉ. Coller un déterminant, un adjectif et un
// nom donne « une mûre mangue » et « le bleu lagon », proposés comme la BONNE
// réponse. Chaque groupe est écrit au singulier ET au pluriel, à la main.
//
// ⚠️ AUCUN PIÈGE FABRIQUÉ. « mon » à l'envers donne « nom », « les » donne
// « sel », « dans » + e donne « danse », « bien » + s donne « biens ». Des mots
// bien réels : l'élève aurait deux bonnes réponses sous les yeux. Les formes
// fautives sont écrites une par une, et phonétiquement plausibles.
//
// ⛔ RIEN QUI DÉPENDE DE L'ACCENT D'ICI. Pas de [e] contre [ɛ] : « lait » se dit
// [lɛ] dans le nord et souvent [le] à La Réunion. Les féminins retenus sont ceux
// où une CONSONNE apparait — lectrice, joyeuse, boulangère — et celle-là
// s'entend partout, quel que soit l'accent.

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
   LES GROUPES NOMINAUX, écrits en toutes lettres
   ═══════════════════════════════════════════════════════════════════════════ */

type GroupeNominal = {
  readonly singulier: string;
  readonly pluriel: string;
  readonly genre: "m" | "f";
  readonly nom: string;
  readonly adjectif: string;
};

const GROUPES: readonly GroupeNominal[] = [
  { singulier: "une mangue mûre", pluriel: "des mangues mûres", genre: "f", nom: "mangue", adjectif: "mûre" },
  { singulier: "un letchi sucré", pluriel: "des letchis sucrés", genre: "m", nom: "letchi", adjectif: "sucré" },
  { singulier: "une case créole", pluriel: "des cases créoles", genre: "f", nom: "case", adjectif: "créole" },
  { singulier: "un sentier étroit", pluriel: "des sentiers étroits", genre: "m", nom: "sentier", adjectif: "étroit" },
  { singulier: "une vague bruyante", pluriel: "des vagues bruyantes", genre: "f", nom: "vague", adjectif: "bruyante" },
  { singulier: "un cahier neuf", pluriel: "des cahiers neufs", genre: "m", nom: "cahier", adjectif: "neuf" },
  { singulier: "une fleur blanche", pluriel: "des fleurs blanches", genre: "f", nom: "fleur", adjectif: "blanche" },
  { singulier: "un pêcheur patient", pluriel: "des pêcheurs patients", genre: "m", nom: "pêcheur", adjectif: "patient" },
  { singulier: "une classe bruyante", pluriel: "des classes bruyantes", genre: "f", nom: "classe", adjectif: "bruyante" },
  // ⚠️ Pas d'adjectif en -eux ici : « un chemin boueux » donne « des chemins
  // boueux », et l'adjectif ne bouge pas. Demander « combien de mots portent la
  // marque du pluriel ? » n'aurait alors plus de réponse nette.
  { singulier: "un chemin glissant", pluriel: "des chemins glissants", genre: "m", nom: "chemin", adjectif: "glissant" },
  { singulier: "une histoire drôle", pluriel: "des histoires drôles", genre: "f", nom: "histoire", adjectif: "drôle" },
  { singulier: "un margouillat rapide", pluriel: "des margouillats rapides", genre: "m", nom: "margouillat", adjectif: "rapide" },
  { singulier: "une plante verte", pluriel: "des plantes vertes", genre: "f", nom: "plante", adjectif: "verte" },
  { singulier: "un cari épicé", pluriel: "des caris épicés", genre: "m", nom: "cari", adjectif: "épicé" },
  { singulier: "une pierre chaude", pluriel: "des pierres chaudes", genre: "f", nom: "pierre", adjectif: "chaude" },
  { singulier: "un filet lourd", pluriel: "des filets lourds", genre: "m", nom: "filet", adjectif: "lourd" },
  { singulier: "une chanson connue", pluriel: "des chansons connues", genre: "f", nom: "chanson", adjectif: "connue" },
  { singulier: "un tamarin immense", pluriel: "des tamarins immenses", genre: "m", nom: "tamarin", adjectif: "immense" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LES PLURIELS IRRÉGULIERS — la nouveauté du CE2
   ═══════════════════════════════════════════════════════════════════════════ */

type Pluriel = {
  readonly singulier: string;
  readonly pluriel: string;
  readonly famille: string;
  /** La forme que l'enfant écrit quand il applique la règle du « s ». */
  readonly regularise: string;
};

const PLURIELS_IRREGULIERS: readonly Pluriel[] = [
  { singulier: "bateau", pluriel: "bateaux", famille: "-eau → -eaux", regularise: "bateaus" },
  { singulier: "chapeau", pluriel: "chapeaux", famille: "-eau → -eaux", regularise: "chapeaus" },
  { singulier: "gâteau", pluriel: "gâteaux", famille: "-eau → -eaux", regularise: "gâteaus" },
  { singulier: "oiseau", pluriel: "oiseaux", famille: "-eau → -eaux", regularise: "oiseaus" },
  { singulier: "couteau", pluriel: "couteaux", famille: "-eau → -eaux", regularise: "couteaus" },
  { singulier: "cadeau", pluriel: "cadeaux", famille: "-eau → -eaux", regularise: "cadeaus" },
  { singulier: "tuyau", pluriel: "tuyaux", famille: "-au → -aux", regularise: "tuyaus" },
  { singulier: "noyau", pluriel: "noyaux", famille: "-au → -aux", regularise: "noyaus" },
  { singulier: "cheveu", pluriel: "cheveux", famille: "-eu → -eux", regularise: "cheveus" },
  { singulier: "jeu", pluriel: "jeux", famille: "-eu → -eux", regularise: "jeus" },
  { singulier: "feu", pluriel: "feux", famille: "-eu → -eux", regularise: "feus" },
  { singulier: "neveu", pluriel: "neveux", famille: "-eu → -eux", regularise: "neveus" },
  { singulier: "cheval", pluriel: "chevaux", famille: "-al → -aux", regularise: "chevals" },
  { singulier: "animal", pluriel: "animaux", famille: "-al → -aux", regularise: "animals" },
  { singulier: "journal", pluriel: "journaux", famille: "-al → -aux", regularise: "journals" },
  { singulier: "hôpital", pluriel: "hôpitaux", famille: "-al → -aux", regularise: "hôpitals" },
  { singulier: "bocal", pluriel: "bocaux", famille: "-al → -aux", regularise: "bocals" },
  { singulier: "végétal", pluriel: "végétaux", famille: "-al → -aux", regularise: "végétals" },
  { singulier: "bijou", pluriel: "bijoux", famille: "les sept en -oux", regularise: "bijous" },
  { singulier: "caillou", pluriel: "cailloux", famille: "les sept en -oux", regularise: "caillous" },
  { singulier: "chou", pluriel: "choux", famille: "les sept en -oux", regularise: "chous" },
  { singulier: "genou", pluriel: "genoux", famille: "les sept en -oux", regularise: "genous" },
  { singulier: "hibou", pluriel: "hiboux", famille: "les sept en -oux", regularise: "hibous" },
  { singulier: "pou", pluriel: "poux", famille: "les sept en -oux", regularise: "pous" },
];

/** Les noms déjà terminés par -s, -x ou -z : au pluriel, rien ne bouge. */
const PLURIELS_INVARIABLES: readonly string[] = [
  "souris",
  "nez",
  "prix",
  "bois",
  "tapis",
  "voix",
  "croix",
  "pays",
];

/** Les exceptions AUX exceptions. Le BO ne les exige pas, mais un enfant qui
 *  écrit « des pneux » a bien appliqué la règle : il mérite qu'on la lui borne. */
const EXCEPTIONS_PLURIEL: readonly Pluriel[] = [
  { singulier: "pneu", pluriel: "pneus", famille: "exception en -eu", regularise: "pneux" },
  { singulier: "bleu", pluriel: "bleus", famille: "exception en -eu", regularise: "bleux" },
  { singulier: "bal", pluriel: "bals", famille: "exception en -al", regularise: "baux" },
  { singulier: "carnaval", pluriel: "carnavals", famille: "exception en -al", regularise: "carnavaux" },
  { singulier: "festival", pluriel: "festivals", famille: "exception en -al", regularise: "festivaux" },
  { singulier: "trou", pluriel: "trous", famille: "-ou ordinaire", regularise: "troux" },
  { singulier: "clou", pluriel: "clous", famille: "-ou ordinaire", regularise: "cloux" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LE FÉMININ QUI S'ENTEND — l'autre nouveauté du CE2

   ⛔ Uniquement des couples où une CONSONNE apparait au féminin : lectrice,
   joyeuse, boulangère, sportive, chienne. Cette consonne-là s'entend partout,
   quel que soit l'accent. On ne demande JAMAIS de distinguer [e] de [ɛ] :
   « lait » se dit [lɛ] dans le nord et souvent [le] ici, et l'enfant aurait
   faux à cause de son accent, pas de son orthographe.
   ═══════════════════════════════════════════════════════════════════════════ */

type CoupleGenre = {
  readonly m: string;
  readonly f: string;
  readonly regle: string;
  /** La forme fautive, écrite à la main : le « e » ajouté bêtement. */
  readonly regularise: string;
  /** Vrai pour un NOM. ⚠️ Les adjectifs sont écartés du gabarit qui demande
   *  « écris ce mot au féminin pluriel » : « un vif », « des neuves » ne se
   *  disent pas, et la question n'aurait plus de sens. */
  readonly estNom: boolean;
};

const FEMININS_ENTENDUS: readonly CoupleGenre[] = [
  { m: "lecteur", f: "lectrice", regle: "-teur → -trice", regularise: "lecteure", estNom: true },
  { m: "acteur", f: "actrice", regle: "-teur → -trice", regularise: "acteure", estNom: true },
  { m: "directeur", f: "directrice", regle: "-teur → -trice", regularise: "directeure", estNom: true },
  { m: "instituteur", f: "institutrice", regle: "-teur → -trice", regularise: "instituteure", estNom: true },
  { m: "agriculteur", f: "agricultrice", regle: "-teur → -trice", regularise: "agriculteure", estNom: true },
  { m: "chanteur", f: "chanteuse", regle: "-eur → -euse", regularise: "chanteure", estNom: true },
  { m: "danseur", f: "danseuse", regle: "-eur → -euse", regularise: "danseure", estNom: true },
  { m: "vendeur", f: "vendeuse", regle: "-eur → -euse", regularise: "vendeure", estNom: true },
  { m: "nageur", f: "nageuse", regle: "-eur → -euse", regularise: "nageure", estNom: true },
  { m: "coiffeur", f: "coiffeuse", regle: "-eur → -euse", regularise: "coiffeure", estNom: true },
  { m: "joyeux", f: "joyeuse", regle: "-eux → -euse", regularise: "joyeuxe", estNom: false },
  { m: "heureux", f: "heureuse", regle: "-eux → -euse", regularise: "heureuxe", estNom: false },
  { m: "curieux", f: "curieuse", regle: "-eux → -euse", regularise: "curieuxe", estNom: false },
  { m: "peureux", f: "peureuse", regle: "-eux → -euse", regularise: "peureuxe", estNom: false },
  { m: "boulanger", f: "boulangère", regle: "-er → -ère", regularise: "boulangere", estNom: true },
  { m: "fermier", f: "fermière", regle: "-er → -ère", regularise: "fermiere", estNom: true },
  { m: "infirmier", f: "infirmière", regle: "-er → -ère", regularise: "infirmiere", estNom: true },
  { m: "écolier", f: "écolière", regle: "-er → -ère", regularise: "écoliere", estNom: true },
  { m: "cuisinier", f: "cuisinière", regle: "-er → -ère", regularise: "cuisiniere", estNom: true },
  { m: "sportif", f: "sportive", regle: "-f → -ve", regularise: "sportife", estNom: true },
  { m: "vif", f: "vive", regle: "-f → -ve", regularise: "vife", estNom: false },
  { m: "neuf", f: "neuve", regle: "-f → -ve", regularise: "neufe", estNom: false },
  { m: "chien", f: "chienne", regle: "la consonne double", regularise: "chiene", estNom: true },
  { m: "lion", f: "lionne", regle: "la consonne double", regularise: "lione", estNom: true },
  { m: "champion", f: "championne", regle: "la consonne double", regularise: "champione", estNom: true },
  { m: "muet", f: "muette", regle: "la consonne double", regularise: "muete", estNom: false },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LA CHAINE D'ACCORD DANS LA PHRASE — au-delà du groupe nominal
   ═══════════════════════════════════════════════════════════════════════════ */

type Chaine = {
  readonly singulier: string;
  readonly pluriel: string;
  readonly sujetSg: string;
  readonly sujetPl: string;
  readonly verbeSg: string;
  readonly verbePl: string;
  /** Combien de mots portent une marque de pluriel, dans la version plurielle. */
  readonly marques: number;
  readonly detailMarques: string;
};

const CHAINES: readonly Chaine[] = [
  {
    singulier: "La mangue mûre tombe dans l'herbe.",
    pluriel: "Les mangues mûres tombent dans l'herbe.",
    sujetSg: "La mangue mûre",
    sujetPl: "Les mangues mûres",
    verbeSg: "tombe",
    verbePl: "tombent",
    marques: 4,
    detailMarques: "Les, mangues, mûres, tombent",
  },
  {
    singulier: "Le petit bateau quitte le port.",
    pluriel: "Les petits bateaux quittent le port.",
    sujetSg: "Le petit bateau",
    sujetPl: "Les petits bateaux",
    verbeSg: "quitte",
    verbePl: "quittent",
    marques: 4,
    detailMarques: "Les, petits, bateaux, quittent",
  },
  {
    // ⚠️ « Un élève » et non « L'élève » : les deux phrases d'une scène doivent
    // avoir le MÊME NOMBRE DE MOTS. Le gabarit du défi fabrique ses pièges en
    // remettant un maillon au singulier, mot par mot ; avec « L'élève » d'un
    // côté et « Les élèves » de l'autre, les rangs se décalent et la phrase
    // sort abimée — « L'élève élèves attentifs écoutent… ».
    singulier: "Un élève attentif écoute la consigne.",
    pluriel: "Des élèves attentifs écoutent la consigne.",
    sujetSg: "Un élève attentif",
    sujetPl: "Des élèves attentifs",
    verbeSg: "écoute",
    verbePl: "écoutent",
    marques: 4,
    detailMarques: "Des, élèves, attentifs, écoutent",
  },
  {
    singulier: "La vague bruyante couvre le sable.",
    pluriel: "Les vagues bruyantes couvrent le sable.",
    sujetSg: "La vague bruyante",
    sujetPl: "Les vagues bruyantes",
    verbeSg: "couvre",
    verbePl: "couvrent",
    marques: 4,
    detailMarques: "Les, vagues, bruyantes, couvrent",
  },
  {
    singulier: "Le pêcheur patient répare son filet.",
    pluriel: "Les pêcheurs patients réparent leur filet.",
    sujetSg: "Le pêcheur patient",
    sujetPl: "Les pêcheurs patients",
    verbeSg: "répare",
    verbePl: "réparent",
    marques: 4,
    detailMarques: "Les, pêcheurs, patients, réparent",
  },
  {
    singulier: "Le touriste fatigué monte le sentier.",
    pluriel: "Les touristes fatigués montent le sentier.",
    sujetSg: "Le touriste fatigué",
    sujetPl: "Les touristes fatigués",
    verbeSg: "monte",
    verbePl: "montent",
    marques: 4,
    detailMarques: "Les, touristes, fatigués, montent",
  },
  {
    singulier: "La fleur blanche pousse près de la case.",
    pluriel: "Les fleurs blanches poussent près de la case.",
    sujetSg: "La fleur blanche",
    sujetPl: "Les fleurs blanches",
    verbeSg: "pousse",
    verbePl: "poussent",
    marques: 4,
    detailMarques: "Les, fleurs, blanches, poussent",
  },
  {
    singulier: "Le margouillat rapide file entre les pierres.",
    pluriel: "Les margouillats rapides filent entre les pierres.",
    sujetSg: "Le margouillat rapide",
    sujetPl: "Les margouillats rapides",
    verbeSg: "file",
    verbePl: "filent",
    marques: 4,
    detailMarques: "Les, margouillats, rapides, filent",
  },
  {
    singulier: "Le grand oiseau plane au-dessus du lagon.",
    pluriel: "Les grands oiseaux planent au-dessus du lagon.",
    sujetSg: "Le grand oiseau",
    sujetPl: "Les grands oiseaux",
    verbeSg: "plane",
    verbePl: "planent",
    marques: 4,
    detailMarques: "Les, grands, oiseaux, planent",
  },
  {
    singulier: "Le cheval noir traverse le champ.",
    pluriel: "Les chevaux noirs traversent le champ.",
    sujetSg: "Le cheval noir",
    sujetPl: "Les chevaux noirs",
    verbeSg: "traverse",
    verbePl: "traversent",
    marques: 4,
    detailMarques: "Les, chevaux, noirs, traversent",
  },
  {
    singulier: "La chanson connue résonne dans la cour.",
    pluriel: "Les chansons connues résonnent dans la cour.",
    sujetSg: "La chanson connue",
    sujetPl: "Les chansons connues",
    verbeSg: "résonne",
    verbePl: "résonnent",
    marques: 4,
    detailMarques: "Les, chansons, connues, résonnent",
  },
  {
    singulier: "Le journal local annonce la fête.",
    pluriel: "Les journaux locaux annoncent la fête.",
    sujetSg: "Le journal local",
    sujetPl: "Les journaux locaux",
    verbeSg: "annonce",
    verbePl: "annoncent",
    marques: 4,
    detailMarques: "Les, journaux, locaux, annoncent",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LES HOMOPHONES GRAMMATICAUX

   Chacun vient avec son TRUC : le mot de remplacement qui tranche. Sans lui, la
   question n'apprend rien — l'élève choisit au son, et le son est le même.
   ═══════════════════════════════════════════════════════════════════════════ */

type Homophone = {
  readonly phrase: string;
  readonly bon: string;
  readonly autre: string;
  readonly truc: string;
  readonly preuve: string;
  /** Deux distracteurs de plus, choisis à la main pour être clairement faux
   *  DANS CETTE PHRASE-LÀ. */
  readonly autresFaux: readonly string[];
};

const HOMOPHONES: readonly Homophone[] = [
  {
    phrase: "Léa ___ ramassé des letchis.",
    bon: "a",
    autre: "à",
    truc: "avait",
    preuve: "Léa AVAIT ramassé des letchis : ça se dit, donc c'est « a », le verbe avoir.",
    autresFaux: ["ou", "et"],
  },
  {
    phrase: "Nous allons ___ la plage.",
    bon: "à",
    autre: "a",
    truc: "avait",
    preuve: "« Nous allons avait la plage » ne se dit pas : ce n'est donc pas le verbe avoir, mais « à » avec son accent.",
    autresFaux: ["est", "ont"],
  },
  {
    phrase: "Le cari ___ prêt.",
    bon: "est",
    autre: "et",
    truc: "était",
    preuve: "Le cari ÉTAIT prêt : ça se dit, donc c'est « est », le verbe être.",
    autresFaux: ["ont", "où"],
  },
  {
    phrase: "Tom ___ Léa grimpent au tamarin.",
    bon: "et",
    autre: "est",
    truc: "et puis",
    preuve: "Tom ET PUIS Léa : ça se dit, donc c'est « et », le petit mot qui relie.",
    autresFaux: ["a", "sont"],
  },
  {
    phrase: "Les letchis ___ mûrs.",
    bon: "sont",
    autre: "son",
    truc: "étaient",
    preuve: "Les letchis ÉTAIENT mûrs : ça se dit, donc c'est « sont », le verbe être.",
    autresFaux: ["ont", "et"],
  },
  {
    phrase: "Yann range ___ filet.",
    bon: "son",
    autre: "sont",
    truc: "mon",
    preuve: "Yann range MON filet : ça se dit, donc c'est « son », le petit mot qui dit à qui c'est.",
    autresFaux: ["ont", "est"],
  },
  {
    phrase: "___ entend les vagues d'ici.",
    bon: "On",
    autre: "Ont",
    truc: "il",
    preuve: "IL entend les vagues : ça se dit, donc c'est « On », le pronom sujet.",
    autresFaux: ["Sont", "Est"],
  },
  {
    phrase: "Les enfants ___ trouvé un coquillage.",
    bon: "ont",
    autre: "on",
    truc: "avaient",
    preuve: "Les enfants AVAIENT trouvé : ça se dit, donc c'est « ont », le verbe avoir.",
    autresFaux: ["sont", "est"],
  },
  {
    phrase: "Tu préfères le cari ___ le rougail ?",
    bon: "ou",
    autre: "où",
    truc: "ou bien",
    preuve: "Le cari OU BIEN le rougail : ça se dit, donc c'est « ou » sans accent.",
    autresFaux: ["et", "a"],
  },
  {
    phrase: "Sais-tu ___ se cache le margouillat ?",
    bon: "où",
    autre: "ou",
    truc: "à quel endroit",
    preuve: "Sais-tu À QUEL ENDROIT il se cache : c'est un lieu, donc « où » avec son accent.",
    autresFaux: ["a", "est"],
  },
  {
    phrase: "Regarde ___ mangues, elles sont mûres.",
    bon: "ces",
    autre: "ses",
    truc: "ces mangues-là",
    preuve: "CES MANGUES-LÀ : on les montre du doigt, donc c'est « ces ».",
    autresFaux: ["c'est", "sait"],
  },
  {
    phrase: "Le pêcheur répare ___ filets.",
    bon: "ses",
    autre: "ces",
    truc: "les siens",
    preuve: "Le pêcheur répare LES SIENS : ils sont à lui, donc c'est « ses ».",
    autresFaux: ["c'est", "sait"],
  },
  {
    phrase: "Pose le panier ___ , près de la porte.",
    bon: "là",
    autre: "la",
    truc: "à cet endroit",
    preuve: "Pose-le À CET ENDROIT : c'est un lieu, donc « là » avec son accent.",
    autresFaux: ["l'a", "las"],
  },
  {
    phrase: "Mamie prépare ___ soupe du soir.",
    bon: "la",
    autre: "là",
    truc: "une",
    preuve: "Mamie prépare UNE soupe : c'est un déterminant, donc « la » sans accent.",
    autresFaux: ["l'a", "las"],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LES MOTS INVARIABLES

   ⚠️ Les fautes sont ÉCRITES À LA MAIN. Fabriquer un piège en ajoutant un
   « s » à « bien » donnerait « biens », en ajoutant un « e » à « dans »
   donnerait « danse », à « puis » donnerait « puise ». Trois mots bien réels.
   ═══════════════════════════════════════════════════════════════════════════ */

type MotInvariable = {
  readonly mot: string;
  readonly phrase: string;
  readonly fautes: readonly string[];
};

const INVARIABLES: readonly MotInvariable[] = [
  { mot: "avec", phrase: "Je pars ___ mon cousin.", fautes: ["avecs", "aveque", "avéc"] },
  { mot: "pour", phrase: "C'est un cadeau ___ mamie.", fautes: ["pours", "poure", "pourr"] },
  { mot: "sans", phrase: "Il est sorti ___ son chapeau.", fautes: ["san", "sant", "sens"] },
  { mot: "chez", phrase: "Nous dormons ___ Tom.", fautes: ["chés", "chè", "chez'"] },
  { mot: "depuis", phrase: "Il pleut ___ ce matin.", fautes: ["depui", "depuit", "dpuis"] },
  { mot: "pendant", phrase: "Range ta chambre ___ que je cuisine.", fautes: ["pandant", "pendan", "pendand"] },
  { mot: "toujours", phrase: "Mamie se lève ___ tôt.", fautes: ["toujour", "toujourt", "toujourss"] },
  { mot: "jamais", phrase: "Je ne suis ___ allé à Mafate.", fautes: ["jamai", "jamet", "jammais"] },
  { mot: "beaucoup", phrase: "Il y a ___ de letchis cette année.", fautes: ["bocoup", "beaucou", "beaucoups"] },
  { mot: "assez", phrase: "J'ai ___ marché pour aujourd'hui.", fautes: ["assé", "asser", "assai"] },
  { mot: "aussi", phrase: "Ma sœur vient ___ à la plage.", fautes: ["aussis", "aussie", "auci"] },
  { mot: "alors", phrase: "Il pleuvait, ___ nous sommes rentrés.", fautes: ["alor", "allors", "alorts"] },
  { mot: "encore", phrase: "Tu en veux ___ un peu ?", fautes: ["ancore", "encors", "encor"] },
  { mot: "parmi", phrase: "Cherche ton nom ___ la liste.", fautes: ["parmis", "parmit", "parmie"] },
  { mot: "malgré", phrase: "Nous sommes sortis ___ la pluie.", fautes: ["malgrés", "malgret", "malgrè"] },
  { mot: "surtout", phrase: "N'oublie ___ pas ta gourde.", fautes: ["surtou", "surtous", "surtoux"] },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LA BANQUE
   ═══════════════════════════════════════════════════════════════════════════ */

export const orthographeBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_ORTH_ACCORD_GN
  ========================================================= */
  {
    kind: "template",
    id: "ce2_orth_accord_gn_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_accord_gn",
    difficulty: 2,
    theme: "neutral",
    hint: "Le déterminant, le nom et l'adjectif doivent aller ensemble.",
    tags: ["ce2", "orthographe", "accord", "template"],
    generate: () => {
      const g = randomChoice(GROUPES);
      const autres = shuffle(GROUPES.filter((x) => x.pluriel !== g.pluriel)).map((x) => x.pluriel);
      return {
        text: `« ${g.singulier} » — écris ce groupe au pluriel.`,
        format: "qcm" as const,
        choices: choix(g.pluriel, autres),
        expected: [g.pluriel],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Dans un groupe nominal, le déterminant, le nom et l'adjectif forment une chaine : si un maillon change, les autres suivent.",
          "Change le déterminant, puis relis tout le groupe en corrigeant chaque mot.",
          `${g.singulier} → ${g.pluriel}. Trois mots ont bougé, et aucun ne s'entend.`,
          `On écrit « ${g.pluriel} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orth_accord_gn_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_accord_gn",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les mots qui portent un « s » ou un « x ».",
    tags: ["ce2", "orthographe", "accord", "template"],
    generate: () => {
      const g = randomChoice(GROUPES);
      return {
        text: `Dans « ${g.pluriel} », combien de mots portent la marque du pluriel ?`,
        format: "qcm" as const,
        choices: ["1", "2", "3", "aucun"],
        expected: ["3"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Au pluriel, le déterminant, le nom ET l'adjectif portent chacun leur marque.",
          "Regarde la fin de chaque mot du groupe, l'un après l'autre.",
          `des | ${g.nom}s | ${g.adjectif}s — le déterminant « des » annonce déjà plusieurs, et les deux autres suivent.`,
          "Trois mots portent la marque du pluriel.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orth_accord_gn_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_accord_gn",
    difficulty: 3,
    theme: "neutral",
    hint: "Dis dans quel ordre tu regardes les mots du groupe.",
    tags: ["ce2", "orthographe", "accord", "ouverte"],
    generate: () => {
      const g = randomChoice(GROUPES);
      return {
        text: `« ${g.singulier} » devient « ${g.pluriel} ».\n\nQu'est-ce qui a changé, et pourquoi ne l'entend-on pas ? Explique.`,
        format: "open" as const,
        expected: ["s", "chaine", "chaîne", "tous", "trois", "déterminant", "determinant", "adjectif", "entend pas"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Le déterminant, le nom et l'adjectif forment une chaine d'accord : ils portent tous la marque du pluriel.",
          "Relis le groupe mot à mot et vérifie que chacun porte sa marque.",
          `${g.singulier} → ${g.pluriel}. Trois maillons ont bougé, et le « s » ne s'entend sur aucun : c'est « des » qui prévient.`,
          "Les trois mots ont pris la marque du pluriel, et elle ne s'entend pas.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_ORTH_PLURIEL
  ========================================================= */
  {
    kind: "template",
    id: "ce2_orth_pluriel_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_pluriel",
    difficulty: 2,
    theme: "neutral",
    hint: "La plupart des noms prennent simplement un « s ».",
    tags: ["ce2", "orthographe", "pluriel", "template"],
    generate: () => {
      const g = randomChoice(GROUPES);
      const bon = `${g.nom}s`;
      const autres = shuffle(GROUPES.filter((x) => x.nom !== g.nom)).map((x) => `${x.nom}s`);
      return {
        text: `Comment s'écrit « ${g.nom} » quand il y en a plusieurs ?`,
        format: "qcm" as const,
        choices: choix(bon, [`${g.nom}x`, g.nom], autres),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La marque du pluriel des noms est le plus souvent un « s ». Il s'écrit, mais ne s'entend pas.",
          "Ajoute le « s » même si tu ne l'entends pas : c'est le déterminant devant qui te prévient.",
          `un ${g.nom} → des ${bon}.`,
          `On écrit « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orth_pluriel_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_pluriel",
    difficulty: 3,
    theme: "neutral",
    hint: "Certains noms se terminent DÉJÀ par s, x ou z. Que leur ajouter ?",
    tags: ["ce2", "orthographe", "pluriel", "template"],
    generate: () => {
      const mot = randomChoice(PLURIELS_INVARIABLES);
      const autres = shuffle(PLURIELS_INVARIABLES.filter((m) => m !== mot));
      return {
        text: `Comment s'écrit « ${mot} » quand il y en a plusieurs ?`,
        format: "qcm" as const,
        // ⚠️ Pas de « ${mot}es » : « bois » donnerait « boises », qui est une
        // forme du verbe boiser. On s'en tient au « s » et au « x », qui sont
        // exactement les deux marques que l'enfant ajoute par réflexe.
        choices: choix(mot, [`${mot}s`, `${mot}x`], autres),
        expected: [mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un nom qui se termine déjà par « s », « x » ou « z » ne change pas au pluriel.",
          "Regarde la dernière lettre du mot : si c'est un s, un x ou un z, ne touche à rien.",
          `une ${mot} → des ${mot}. Le déterminant est le seul à changer : c'est lui qui prévient.`,
          `On écrit « ${mot} », sans rien ajouter.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orth_pluriel_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_pluriel",
    difficulty: 3,
    theme: "neutral",
    hint: "Si l'oreille ne sert à rien, qu'est-ce qui sert ?",
    tags: ["ce2", "orthographe", "pluriel", "ouverte"],
    generate: () => {
      const g = randomChoice(GROUPES);
      return {
        text: `« ${g.singulier} » et « ${g.pluriel} » se disent presque pareil.\n\nÀ quoi vois-tu qu'il faut mettre un « s » ? Explique.`,
        format: "open" as const,
        expected: ["déterminant", "determinant", "des", "petit mot", "devant", "plusieurs"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "La marque du pluriel s'écrit mais ne s'entend pas. C'est le déterminant qui annonce combien il y en a.",
          "Regarde le petit mot devant le nom : des, les, deux, mes, ces… Il t'oblige à mettre le « s ».",
          `« ${g.singulier} » et « ${g.pluriel} » : ta bouche dit la même chose. C'est « des » qui prévient.`,
          "C'est le déterminant devant le nom qui prévient qu'il en faut un.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_ORTH_PLURIEL_IRREGULIER — le BO l'ajoute au CE2
  ========================================================= */
  {
    kind: "template",
    id: "ce2_orth_pluriel_irregulier_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_pluriel_irregulier",
    difficulty: 3,
    theme: "neutral",
    hint: "Celui-là ne prend pas de « s ». Regarde sa fin au singulier.",
    tags: ["ce2", "orthographe", "pluriel", "template"],
    generate: () => {
      const p = randomChoice(PLURIELS_IRREGULIERS);
      const autres = shuffle(PLURIELS_IRREGULIERS.filter((x) => x.pluriel !== p.pluriel)).map(
        (x) => x.pluriel,
      );
      return {
        text: `Comment s'écrit « ${p.singulier} » au pluriel ?`,
        format: "qcm" as const,
        choices: choix(p.pluriel, [p.regularise], autres),
        expected: [p.pluriel],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Quelques familles de noms prennent un « x » au lieu du « s », et certaines changent même de fin.",
          "Regarde comment le mot se termine au singulier, puis applique la famille.",
          `${p.famille} : un ${p.singulier} → des ${p.pluriel}. « ${p.regularise} » suit la règle du « s », et c'est justement pour ça que c'est faux.`,
          `On écrit « ${p.pluriel} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orth_pluriel_irregulier_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_pluriel_irregulier",
    difficulty: 3,
    theme: "neutral",
    hint: "Range le mot dans sa famille avant de l'écrire.",
    tags: ["ce2", "orthographe", "pluriel", "template"],
    generate: () => {
      const p = randomChoice(PLURIELS_IRREGULIERS);
      const familles = [...new Set(PLURIELS_IRREGULIERS.map((x) => x.famille))];
      return {
        text: `« un ${p.singulier} » → « des ${p.pluriel} ».\n\nÀ quelle famille appartient ce pluriel ?`,
        format: "qcm" as const,
        choices: choix(p.famille, familles),
        expected: [p.famille],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les pluriels irréguliers se rangent en familles : -eau et -au font -aux, -eu fait -eux, -al fait -aux, et sept noms en -ou font -oux.",
          "Regarde les deux ou trois dernières lettres du singulier : elles t'annoncent la famille.",
          `${p.singulier} → ${p.pluriel}, famille « ${p.famille} ».`,
          `C'est la famille « ${p.famille} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orth_pluriel_irregulier_tpl_3",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_pluriel_irregulier",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention : celui-là fait exception À l'exception.",
    tags: ["ce2", "orthographe", "pluriel", "template"],
    generate: () => {
      const p = randomChoice(EXCEPTIONS_PLURIEL);
      const autres = shuffle(PLURIELS_IRREGULIERS).map((x) => x.pluriel);
      return {
        text: `Comment s'écrit « ${p.singulier} » au pluriel ?`,
        format: "qcm" as const,
        choices: choix(p.pluriel, [p.regularise], autres),
        expected: [p.pluriel],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les familles ont chacune leurs exceptions, et elles s'apprennent une par une.",
          "Quand tu hésites, souviens-toi que la règle du « s » est celle qui gagne le plus souvent.",
          `un ${p.singulier} → des ${p.pluriel}. En suivant la famille, on écrirait « ${p.regularise} » — et ce serait faux. ${p.famille}.`,
          `On écrit « ${p.pluriel} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_orth_pluriel_irregulier_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_pluriel_irregulier",
    difficulty: 3,
    theme: "neutral",
    text: "Sept noms en « -ou » prennent un « x » au pluriel. Lequel de ces mots en fait partie ?",
    format: "qcm",
    choices: ["genou", "trou", "clou", "sou"],
    expected: ["genou"],
    comparator: "mcq_exact",
    hint: "Il y en a exactement sept, et on les apprend comme une comptine.",
    explanation: exp(
      "La règle des noms en -ou est le « s ». Sept mots seulement font exception et prennent un « x ».",
      "Apprends-les comme une phrase : bijou, caillou, chou, genou, hibou, joujou, pou.",
      "des genoux, mais des trous, des clous et des sous. Sept mots contre tous les autres : c'est la liste qui se retient, pas la règle.",
      "C'est « genou » : des genoux.",
    ),
    tags: ["ce2", "orthographe", "pluriel", "remarquable", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_orth_pluriel_irregulier_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_pluriel_irregulier",
    difficulty: 3,
    theme: "neutral",
    hint: "Cette fois, la marque du pluriel s'entend. C'est nouveau.",
    tags: ["ce2", "orthographe", "pluriel", "ouverte"],
    generate: () => {
      const p = randomChoice(PLURIELS_IRREGULIERS.filter((x) => x.famille === "-al → -aux"));
      return {
        text: `« un ${p.singulier} » devient « des ${p.pluriel} ».\n\nEn quoi ce pluriel est-il différent de « des letchis » ? Explique.`,
        format: "open" as const,
        expected: ["entend", "aux", "toute la fin", "change", "pas un s", "irrégulier", "irregulier"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Les noms en -al font leur pluriel en -aux : ce n'est pas un « s » ajouté, c'est toute la fin qui change.",
          "Dis les deux à voix haute et compare : letchi / letchis se disent pareil, cheval / chevaux non.",
          `${p.singulier} → ${p.pluriel} : là, ça s'entend. C'est la première fois qu'une marque de pluriel arrive jusqu'à l'oreille.`,
          "Toute la fin du mot change, et cette fois on l'entend.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_ORTH_FEMININ_ENTENDU — l'autre nouveauté
  ========================================================= */
  {
    kind: "template",
    id: "ce2_orth_feminin_entendu_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_feminin_entendu",
    difficulty: 2,
    theme: "neutral",
    hint: "Au féminin, une consonne apparait — et cette fois, tu l'entends.",
    tags: ["ce2", "orthographe", "feminin", "template"],
    generate: () => {
      const c = randomChoice(FEMININS_ENTENDUS);
      const autres = shuffle(FEMININS_ENTENDUS.filter((x) => x.f !== c.f)).map((x) => x.f);
      return {
        text: `Quel est le féminin de « ${c.m} » ?`,
        format: "qcm" as const,
        choices: choix(c.f, [c.regularise], autres),
        expected: [c.f],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Certains mots ne prennent pas seulement un « e » au féminin : leur fin change, et une consonne apparait.",
          "Repère la fin du masculin, puis applique sa règle.",
          `${c.regle} : ${c.m} → ${c.f}. Ajouter un « e » donnerait « ${c.regularise} », qui n'existe pas.`,
          `Le féminin est « ${c.f} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orth_feminin_entendu_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_feminin_entendu",
    difficulty: 3,
    theme: "neutral",
    hint: "Range le couple dans sa règle.",
    tags: ["ce2", "orthographe", "feminin", "template"],
    generate: () => {
      const c = randomChoice(FEMININS_ENTENDUS);
      const regles = [...new Set(FEMININS_ENTENDUS.map((x) => x.regle))];
      return {
        text: `« ${c.m} » devient « ${c.f} » au féminin.\n\nQuelle règle a-t-on appliquée ?`,
        format: "qcm" as const,
        choices: choix(c.regle, regles),
        expected: [c.regle],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le féminin ne s'obtient pas toujours en ajoutant un « e » : plusieurs règles se partagent le travail.",
          "Regarde comment le masculin se termine — en -teur, en -eur, en -eux, en -er, en -f — et applique la règle qui va avec.",
          `${c.m} → ${c.f} : c'est ${c.regle}.`,
          `La règle est ${c.regle}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_orth_feminin_entendu_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_feminin_entendu",
    difficulty: 3,
    theme: "neutral",
    text: "Au CP, tu as appris que la marque du féminin — le « e » — ne s'entend pas toujours. « lecteur » devient « lectrice ». Est-ce pareil ?",
    format: "qcm",
    choices: [
      "Non : ici, la fin du mot change, et on l'entend nettement",
      "Oui, on n'entend aucune différence",
      "Non, mais seulement parce qu'on parle vite",
      "Oui, c'est juste un « e » de plus",
    ],
    expected: ["Non : ici, la fin du mot change, et on l'entend nettement"],
    comparator: "mcq_exact",
    hint: "Dis les deux mots à voix haute, l'un après l'autre.",
    explanation: exp(
      "Certaines marques de genre s'écrivent sans s'entendre — grand / grande —, d'autres changent toute la fin du mot et s'entendent très bien.",
      "Prononce les deux formes. Si ta bouche change, l'orthographe change aussi, et beaucoup.",
      "lecteur → lectrice : ce n'est pas un « e » ajouté, c'est « -teur » remplacé par « -trice ». Pareil pour joyeux → joyeuse : on entend le « z » arriver. Celles-là, ton oreille peut t'aider à les trouver.",
      "Non : ici, la fin du mot change, et on l'entend nettement.",
    ),
    tags: ["ce2", "orthographe", "feminin", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_orth_feminin_entendu_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_feminin_entendu",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare ce qui se passe dans ta bouche, puis sur ta feuille.",
    tags: ["ce2", "orthographe", "feminin", "ouverte"],
    generate: () => {
      const c = randomChoice(FEMININS_ENTENDUS);
      return {
        text: `Dis « ${c.m} », puis « ${c.f} ».\n\nQu'entends-tu de différent, et qu'est-ce qui a changé à l'écrit ? Explique.`,
        format: "open" as const,
        expected: ["entend", "fin", "consonne", c.f, "change"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Quand le féminin fait apparaitre une consonne, on l'entend — contrairement au « s » du pluriel.",
          "Prononce les deux formes lentement et écoute la fin.",
          `${c.m} → ${c.f} (${c.regle}). Ta bouche change, et l'écriture aussi.`,
          `On entend la fin changer : « ${c.m} » devient « ${c.f} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_ORTH_CHAINE_PHRASE — la chaine au-delà du groupe
  ========================================================= */
  {
    kind: "template",
    id: "ce2_orth_chaine_phrase_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_chaine_phrase",
    difficulty: 3,
    theme: "neutral",
    hint: "Quatre mots bougent : le déterminant, le nom, l'adjectif, puis le verbe.",
    tags: ["ce2", "orthographe", "chaine", "template"],
    generate: () => {
      const c = randomChoice(CHAINES);
      const autres = shuffle(CHAINES.filter((x) => x.pluriel !== c.pluriel)).map((x) => x.pluriel);
      return {
        text: `« ${c.singulier} »\n\nÉcris cette phrase au pluriel.`,
        format: "qcm" as const,
        choices: choix(c.pluriel, autres),
        expected: [c.pluriel],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La chaine d'accord ne s'arrête pas au groupe nominal : le verbe en fait partie lui aussi.",
          "Change le sujet en entier, puis descends jusqu'au verbe sans t'arrêter en route.",
          `${c.singulier} → ${c.pluriel}. Quatre mots ont changé : ${c.detailMarques}.`,
          `On écrit « ${c.pluriel} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orth_chaine_phrase_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_chaine_phrase",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte-les un par un, du début de la phrase jusqu'au verbe.",
    tags: ["ce2", "orthographe", "chaine", "template"],
    generate: () => {
      const c = randomChoice(CHAINES);
      return {
        text: `« ${c.pluriel} »\n\nCombien de mots ont changé par rapport à « ${c.singulier} » ?`,
        format: "qcm" as const,
        choices: ["2", "3", "4", "1"],
        expected: [String(c.marques)],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Quand le sujet passe au pluriel, tout le monde suit : le déterminant, le nom, l'adjectif, et le verbe.",
          "Compare les deux phrases mot à mot, de gauche à droite.",
          `${c.detailMarques} — quatre mots, et pas un ne s'entend différemment.`,
          `${c.marques} mots ont changé.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orth_chaine_phrase_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_chaine_phrase",
    difficulty: 3,
    theme: "neutral",
    hint: "Le verbe est loin du déterminant, et pourtant il obéit au même sujet.",
    tags: ["ce2", "orthographe", "chaine", "ouverte"],
    generate: () => {
      const c = randomChoice(CHAINES);
      return {
        text: `« ${c.pluriel} »\n\nPourquoi le verbe « ${c.verbePl} » prend-il « -nt » ? Explique.`,
        format: "open" as const,
        expected: ["sujet", "pluriel", "plusieurs", c.sujetPl.toLowerCase(), "accorde"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Le verbe s'accorde avec son sujet, même quand le sujet est un groupe de plusieurs mots.",
          `Pose la question « Qui est-ce qui ${c.verbePl} ? », puis compte : un seul, ou plusieurs ?`,
          `Qui est-ce qui ${c.verbePl} ? ${c.sujetPl} — ils sont plusieurs, donc « -nt ».`,
          `Parce que son sujet, « ${c.sujetPl} », est au pluriel.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_ORTH_SUJET_VERBE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_orth_sujet_verbe_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_sujet_verbe",
    difficulty: 2,
    theme: "neutral",
    hint: "Remonte au sujet et compte : un seul, ou plusieurs ?",
    tags: ["ce2", "orthographe", "sujet-verbe", "template"],
    generate: () => {
      const c = randomChoice(CHAINES);
      const pluriel = Math.random() < 0.5;
      const sujet = pluriel ? c.sujetPl : c.sujetSg;
      const bon = pluriel ? c.verbePl : c.verbeSg;
      const reste = (pluriel ? c.pluriel : c.singulier).slice(
        (pluriel ? c.pluriel : c.singulier).indexOf(bon) + bon.length,
      );
      return {
        text: `Complète : « ${sujet} ___${reste} »`,
        format: "qcm" as const,
        choices: choix(bon, [c.verbeSg, c.verbePl], CHAINES.flatMap((x) => [x.verbeSg, x.verbePl])),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le verbe s'accorde avec son sujet. Si le sujet est au pluriel, le verbe prend « -nt ».",
          "Pose la question « Qui est-ce qui… ? », puis compte combien ils sont.",
          pluriel
            ? `« ${sujet} » : ils sont plusieurs, donc « ${bon} », avec « -nt » qu'on n'entend pas.`
            : `« ${sujet} » : il n'y en a qu'un, donc « ${bon} », sans « -nt ».`,
          `On écrit « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_orth_sujet_verbe_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_sujet_verbe",
    difficulty: 3,
    theme: "neutral",
    text: "« Les élèves de la classe voisine ___ dans la cour. » — verbe « jouer » au présent",
    format: "qcm",
    choices: ["jouent", "joue", "joues", "jouons"],
    expected: ["jouent"],
    comparator: "mcq_exact",
    hint: "Le mot juste avant le verbe n'est pas forcément le sujet.",
    explanation: exp(
      "Le verbe s'accorde avec le SUJET, pas avec le mot le plus proche de lui.",
      "Pose la question « Qui est-ce qui joue ? » et prends toute la réponse, pas seulement sa fin.",
      "Qui est-ce qui joue ? Les élèves — pas « la classe voisine », qui n'est là que pour dire lesquels. Le sujet est au pluriel, donc « jouent ». C'est l'erreur la plus fréquente : l'œil s'arrête au mot d'à côté.",
      "On écrit « Les élèves de la classe voisine jouent dans la cour. »",
    ),
    tags: ["ce2", "orthographe", "sujet-verbe", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_orth_sujet_verbe_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_sujet_verbe",
    difficulty: 3,
    theme: "neutral",
    hint: "Dis la question que tu poses avant d'écrire la fin du verbe.",
    tags: ["ce2", "orthographe", "sujet-verbe", "ouverte"],
    generate: () => {
      const c = randomChoice(CHAINES);
      return {
        text: `« ${c.singulier} » devient « ${c.pluriel} ».\n\nPourquoi « ${c.verbeSg} » devient-il « ${c.verbePl} » ? Explique.`,
        format: "open" as const,
        expected: ["sujet", "pluriel", "plusieurs", "accorde", "nt"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Le verbe suit son sujet : plusieurs, il prend « -nt ».",
          "Remonte du verbe vers le sujet, et compte.",
          `${c.verbeSg} → ${c.verbePl}. Ta bouche dit la même chose ; c'est le sujet qui prévient.`,
          `Parce que le sujet est passé au pluriel : « ${c.sujetPl} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_ORTH_HOMOPHONES
  ========================================================= */
  {
    kind: "template",
    id: "ce2_orth_homophones_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_homophones",
    difficulty: 3,
    theme: "neutral",
    hint: "Ils se disent pareil. Remplace par un autre mot pour trancher.",
    tags: ["ce2", "orthographe", "homophones", "template"],
    generate: () => {
      const h = randomChoice(HOMOPHONES);
      return {
        text: `Complète : « ${h.phrase} »`,
        format: "qcm" as const,
        choices: shuffle([h.bon, h.autre, ...h.autresFaux]),
        expected: [h.bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux mots qui se disent pareil et s'écrivent autrement sont des homophones. L'oreille ne peut pas les séparer.",
          `Remplace par « ${h.truc} » : si la phrase se dit encore, c'est la bonne forme.`,
          h.preuve,
          `On écrit « ${h.bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orth_homophones_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_homophones",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque paire a son mot de remplacement à elle.",
    tags: ["ce2", "orthographe", "homophones", "template"],
    generate: () => {
      const h = randomChoice(HOMOPHONES);
      const trucs = [...new Set(HOMOPHONES.map((x) => x.truc))];
      return {
        text: `Tu hésites entre « ${h.bon} » et « ${h.autre} » dans :\n\n« ${h.phrase} »\n\nPar quel mot peux-tu essayer de remplacer, pour trancher ?`,
        format: "qcm" as const,
        choices: choix(h.truc, trucs),
        expected: [h.truc],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Pour séparer deux homophones, on ne les écoute pas : on remplace l'un d'eux par un mot qui, lui, ne se confond avec rien.",
          `Essaie « ${h.truc} » dans la phrase, à voix haute. Si ça se dit, tu tiens ta réponse.`,
          h.preuve,
          `Le mot de remplacement est « ${h.truc} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orth_homophones_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_homophones",
    difficulty: 3,
    theme: "neutral",
    hint: "Ne dis pas la réponse : dis le geste qui te la donne.",
    tags: ["ce2", "orthographe", "homophones", "ouverte"],
    generate: () => {
      const h = randomChoice(HOMOPHONES);
      return {
        text: `« ${h.phrase} »\n\nComment fais-tu pour choisir entre « ${h.bon} » et « ${h.autre} » ? Explique ton truc.`,
        format: "open" as const,
        expected: [h.truc, "remplace", "remplacer", "essaie", "se dit"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Les homophones se disent pareil : l'oreille seule ne suffit jamais.",
          `Remplace par « ${h.truc} » et écoute si la phrase tient debout.`,
          h.preuve,
          `On remplace par « ${h.truc} » : c'est le seul moyen sûr.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_ORTH_MOTS_INVARIABLES
  ========================================================= */
  {
    kind: "template",
    id: "ce2_orth_mots_invariables_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_mots_invariables",
    difficulty: 2,
    theme: "neutral",
    hint: "Ces mots-là s'apprennent par cœur : ils ne se devinent pas.",
    tags: ["ce2", "orthographe", "invariables", "template"],
    generate: () => {
      const m = randomChoice(INVARIABLES);
      return {
        text: `Complète : « ${m.phrase} »`,
        format: "qcm" as const,
        choices: shuffle([m.mot, ...m.fautes]),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot invariable s'écrit toujours de la même façon : ni « s » au pluriel, ni « e » au féminin.",
          "Il n'y a rien à calculer. On les reconnait de l'œil, à force de les lire et de les recopier.",
          `On écrit « ${m.mot} », et jamais « ${m.fautes[0]} ».`,
          `On écrit « ${m.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orth_mots_invariables_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_mots_invariables",
    difficulty: 2,
    theme: "neutral",
    hint: "Essaie de lui ajouter un « s ». Est-ce que ça se fait ?",
    tags: ["ce2", "orthographe", "invariables", "template"],
    generate: () => {
      const m = randomChoice(INVARIABLES);
      return {
        text: `Comment écrit-on le mot invariable « ${m.mot} » quand il y a plusieurs choses ?`,
        format: "qcm" as const,
        choices: shuffle([m.mot, ...m.fautes]),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot invariable ne prend jamais de marque : ni le genre ni le nombre ne l'atteignent.",
          "Ne lui ajoute rien du tout : il s'écrit pareil qu'il y en ait un ou mille.",
          `« ${m.mot} » reste « ${m.mot} ». C'est justement ce qui le définit.`,
          `On écrit « ${m.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_orth_mots_invariables_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_mots_invariables",
    difficulty: 3,
    theme: "neutral",
    text: "Les mots invariables ne suivent aucune règle : on ne peut pas les deviner.\n\nQuel moyen utilises-tu pour les retenir ? Explique.",
    format: "open",
    expected: ["recopie", "relis", "par cœur", "par coeur", "cahier", "liste", "apprends", "mémoire", "memoire"],
    comparator: "contains_keyword",
    hint: "Pense à ce que tu fais quand tu dois retenir un mot difficile.",
    explanation: exp(
      "Un mot invariable s'écrit toujours pareil, et rien dans le mot ne dit comment.",
      "Il n'y a que deux chemins : le lire souvent, et le recopier. La main retient ce que la règle ne peut pas donner.",
      "Recopier « aujourd'hui » trois fois de suite marche mieux que se le répéter dix fois dans sa tête : l'œil et la main travaillent ensemble.",
      "On les apprend par cœur, en les relisant et en les recopiant.",
    ),
    tags: ["ce2", "orthographe", "invariables", "methode", "ouverte"],
  },

  /* =========================================================
     CE2_ORTH_DEFI — la chaine entière, d'un bout à l'autre
  ========================================================= */
  {
    kind: "template",
    id: "ce2_orth_defi_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Une seule est juste d'un bout à l'autre. Vérifie chaque mot.",
    tags: ["ce2", "orthographe", "defi", "template"],
    generate: () => {
      const c = randomChoice(CHAINES);
      const mots = c.pluriel.split(" ");
      // Quatre phrases fautives possibles, chacune avec UN maillon laissé au
      // singulier — déterminant, nom, adjectif, puis le VERBE, qui est l'oubli
      // le plus fréquent. `choix` en retiendra trois.
      const singuliers = c.singulier.split(" ");
      const faux = [0, 1, 2, 3]
        .map((i) => {
          if (i >= mots.length || i >= singuliers.length) return null;
          const copie = [...mots];
          copie[i] = singuliers[i];
          return copie.join(" ");
        })
        .filter((x): x is string => x !== null && x !== c.pluriel);
      return {
        text: `« ${c.singulier} »\n\nUne seule de ces phrases en est le pluriel CORRECT, d'un bout à l'autre. Laquelle ?`,
        format: "qcm" as const,
        choices: choix(c.pluriel, faux, [c.singulier]),
        expected: [c.pluriel],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une chaine d'accord ne vaut que si TOUS ses maillons tiennent : il suffit d'un mot resté au singulier pour que la phrase soit fausse.",
          "Relis de gauche à droite en posant ton doigt sur chaque mot : déterminant, nom, adjectif, verbe.",
          `« ${c.pluriel} » — ${c.detailMarques} portent tous leur marque. Dans les autres, un maillon est resté en arrière.`,
          `La phrase correcte est « ${c.pluriel} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orth_defi_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux choses à faire : le pluriel du nom, puis le féminin.",
    tags: ["ce2", "orthographe", "defi", "template"],
    generate: () => {
      const c = randomChoice(FEMININS_ENTENDUS.filter((x) => x.estNom));
      const bon = `des ${c.f}s`;
      const faux = [`des ${c.m}s`, `des ${c.regularise}s`, `une ${c.f}`, `des ${c.f}`];
      return {
        text: `« un ${c.m} » — écris ce mot au FÉMININ PLURIEL.`,
        format: "qcm" as const,
        choices: choix(bon, faux),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot peut porter deux marques à la fois : celle du genre, et celle du nombre.",
          "Fais-le en deux temps. D'abord le féminin, ensuite le pluriel — jamais les deux d'un coup.",
          `${c.m} → ${c.f} (${c.regle}) → ${bon}. Le féminin s'entend ; le « s » du pluriel, non.`,
          `On écrit « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orth_defi_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe",
    microId: "ce2_orth_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Toutes les marques ne se comportent pas pareil. Lesquelles s'entendent ?",
    tags: ["ce2", "orthographe", "defi", "ouverte"],
    generate: () => {
      const c = randomChoice(CHAINES);
      return {
        text: `« ${c.pluriel} »\n\nCombien de mots portent une marque de pluriel, et combien en entends-tu ? Explique.`,
        format: "open" as const,
        expected: ["4", "quatre", "entend pas", "aucun", "muet", "déterminant", "determinant"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "La chaine d'accord traverse toute la phrase : déterminant, nom, adjectif, verbe.",
          "Compte d'abord ce que tu écris, puis compte ce que tu entends. Les deux comptes ne donnent pas le même chiffre.",
          `${c.detailMarques} : quatre marques écrites. À l'oreille, seul le déterminant « Les » prévient — les trois autres sont muettes.`,
          "Quatre mots portent une marque, et on n'en entend presque aucune.",
        ),
      };
    },
  },
];
