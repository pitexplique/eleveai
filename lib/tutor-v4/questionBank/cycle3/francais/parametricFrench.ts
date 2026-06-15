// Generateurs parametriques francais (cycle 3) : ACCORDS du groupe nominal et
// HOMOPHONES grammaticaux. Meme principe que conjugationEngine.ts : des milliers
// de questions correctes a partir de tables, au lieu d'ecrire chaque question.
//
// Tout est en QCM : on choisit la bonne forme / la bonne phrase. Les accents ne
// posent donc aucun probleme (l'eleve clique, il ne tape pas).

import type { ConjItem } from "@/lib/tutor-v4/questionBank/cycle3/francais/conjugationEngine";

export type { ConjItem };

function randInt(max: number): number {
  return Math.floor(Math.random() * max);
}
function pick<T>(items: readonly T[]): T {
  return items[randInt(items.length)];
}

// ── ACCORDS DU GROUPE NOMINAL ───────────────────────────────────────────────

// Noms a initiale consonne uniquement (pas d'elision le'/cet a gerer).
type Noun = { sing: string; plur: string; genre: "m" | "f" };
const NOUNS: Noun[] = [
  { sing: "chat", plur: "chats", genre: "m" },
  { sing: "chien", plur: "chiens", genre: "m" },
  { sing: "livre", plur: "livres", genre: "m" },
  { sing: "jardin", plur: "jardins", genre: "m" },
  { sing: "ballon", plur: "ballons", genre: "m" },
  { sing: "gâteau", plur: "gâteaux", genre: "m" },
  { sing: "bateau", plur: "bateaux", genre: "m" },
  { sing: "cheval", plur: "chevaux", genre: "m" },
  { sing: "journal", plur: "journaux", genre: "m" },
  { sing: "vélo", plur: "vélos", genre: "m" },
  { sing: "cahier", plur: "cahiers", genre: "m" },
  { sing: "chapeau", plur: "chapeaux", genre: "m" },
  { sing: "mouton", plur: "moutons", genre: "m" },
  { sing: "camion", plur: "camions", genre: "m" },
  { sing: "maison", plur: "maisons", genre: "f" },
  { sing: "fleur", plur: "fleurs", genre: "f" },
  { sing: "voiture", plur: "voitures", genre: "f" },
  { sing: "table", plur: "tables", genre: "f" },
  { sing: "pomme", plur: "pommes", genre: "f" },
  { sing: "chaise", plur: "chaises", genre: "f" },
  { sing: "fenêtre", plur: "fenêtres", genre: "f" },
  { sing: "route", plur: "routes", genre: "f" },
  { sing: "montagne", plur: "montagnes", genre: "f" },
  { sing: "valise", plur: "valises", genre: "f" },
  { sing: "casquette", plur: "casquettes", genre: "f" },
  { sing: "tortue", plur: "tortues", genre: "f" },
];

// Adjectifs : 4 formes explicites (m.s, f.s, m.pl, f.pl) + position.
type Adjective = { ms: string; fs: string; mp: string; fp: string; pos: "before" | "after" };
const ADJECTIVES: Adjective[] = [
  { ms: "petit", fs: "petite", mp: "petits", fp: "petites", pos: "before" },
  { ms: "grand", fs: "grande", mp: "grands", fp: "grandes", pos: "before" },
  { ms: "joli", fs: "jolie", mp: "jolis", fp: "jolies", pos: "before" },
  { ms: "gros", fs: "grosse", mp: "gros", fp: "grosses", pos: "before" },
  { ms: "bon", fs: "bonne", mp: "bons", fp: "bonnes", pos: "before" },
  { ms: "rouge", fs: "rouge", mp: "rouges", fp: "rouges", pos: "after" },
  { ms: "vert", fs: "verte", mp: "verts", fp: "vertes", pos: "after" },
  { ms: "bleu", fs: "bleue", mp: "bleus", fp: "bleues", pos: "after" },
  { ms: "noir", fs: "noire", mp: "noirs", fp: "noires", pos: "after" },
  { ms: "blanc", fs: "blanche", mp: "blancs", fp: "blanches", pos: "after" },
  { ms: "content", fs: "contente", mp: "contents", fp: "contentes", pos: "after" },
  { ms: "gentil", fs: "gentille", mp: "gentils", fp: "gentilles", pos: "after" },
  { ms: "calme", fs: "calme", mp: "calmes", fp: "calmes", pos: "after" },
  { ms: "rapide", fs: "rapide", mp: "rapides", fp: "rapides", pos: "after" },
];

const DET_M_SING = ["un", "le", "ce", "mon"];
const DET_F_SING = ["une", "la", "cette", "ma"];
const DET_PLUR = ["des", "les", "ces", "mes"];

function adjForm(adj: Adjective, genre: "m" | "f", plural: boolean): string {
  if (genre === "m") return plural ? adj.mp : adj.ms;
  return plural ? adj.fp : adj.fs;
}

function buildGN(det: string, adj: string, noun: string, pos: "before" | "after"): string {
  return pos === "before" ? `${det} ${adj} ${noun}` : `${det} ${noun} ${adj}`;
}

export function generateAgreementItem(): ConjItem {
  const noun = pick(NOUNS);
  const adj = pick(ADJECTIVES);
  const plural = Math.random() < 0.5;
  const genre = noun.genre;

  const detList = plural ? DET_PLUR : genre === "m" ? DET_M_SING : DET_F_SING;
  const det = pick(detList);
  const nounForm = plural ? noun.plur : noun.sing;
  const correct = buildGN(det, adjForm(adj, genre, plural), nounForm, adj.pos);

  // 3 distracteurs : un seul element mal accorde a chaque fois.
  const wrongAdj = buildGN(det, adjForm(adj, genre, !plural), nounForm, adj.pos);
  const wrongNoun = buildGN(det, adjForm(adj, genre, plural), plural ? noun.sing : noun.plur, adj.pos);
  const wrongDetList = plural ? (genre === "m" ? DET_M_SING : DET_F_SING) : DET_PLUR;
  const wrongDet = buildGN(pick(wrongDetList), adjForm(adj, genre, plural), nounForm, adj.pos);

  const wrongs = [wrongAdj, wrongNoun, wrongDet].filter(
    (w, i, arr) => w !== correct && arr.indexOf(w) === i
  );
  // Securite : si une corruption a coincide avec le correct (formes invariables),
  // on complete avec une autre corruption.
  while (wrongs.length < 3) {
    const alt = buildGN(
      pick(wrongDetList),
      adjForm(adj, genre, !plural),
      plural ? noun.sing : noun.plur,
      adj.pos
    );
    if (alt !== correct && !wrongs.includes(alt)) wrongs.push(alt);
    else break;
  }

  return {
    kind: "qcm",
    text: "Choisis le groupe nominal correctement accordé.",
    correct,
    wrongs: wrongs.slice(0, 3),
    methode: "Le déterminant, le nom et l'adjectif s'accordent en genre et en nombre.",
  };
}

// ── HOMOPHONES GRAMMATICAUX ─────────────────────────────────────────────────

// Pour chaque famille : un jeu de mots confondus (>= 4 pour avoir 4 choix) et
// des phrases a trou avec le mot correct connu. On genere la bonne phrase + 3
// phrases fausses (meme phrase avec un autre mot de la famille).
type HomophoneFamily = {
  forms: string[];
  frames: { slot: string; correct: string }[];
};

const HOMOPHONE_FAMILIES: HomophoneFamily[] = [
  {
    forms: ["a", "à", "as", "ah"],
    frames: [
      { slot: "Il ___ un nouveau vélo.", correct: "a" },
      { slot: "Elle va ___ l'école.", correct: "à" },
      { slot: "Tu ___ raison.", correct: "as" },
      { slot: "Léa ___ gagné le match.", correct: "a" },
      { slot: "On part ___ midi.", correct: "à" },
      { slot: "Tu ___ de la chance.", correct: "as" },
    ],
  },
  {
    forms: ["et", "est", "es", "ai"],
    frames: [
      { slot: "Mon frère ___ grand.", correct: "est" },
      { slot: "Le chat ___ le chien dorment.", correct: "et" },
      { slot: "Tu ___ gentil avec moi.", correct: "es" },
      { slot: "J'___ faim ce matin.", correct: "ai" },
      { slot: "Il fait beau ___ chaud.", correct: "et" },
      { slot: "La porte ___ ouverte.", correct: "est" },
    ],
  },
  {
    forms: ["ces", "ses", "c'est", "s'est"],
    frames: [
      { slot: "Range ___ affaires (les tiennes).", correct: "ses" },
      { slot: "Regarde ___ fleurs-là.", correct: "ces" },
      { slot: "___ très joli.", correct: "c'est" },
      { slot: "Il ___ caché derrière l'arbre.", correct: "s'est" },
      { slot: "Elle a perdu ___ clés (les siennes).", correct: "ses" },
      { slot: "___ bientôt les vacances.", correct: "c'est" },
    ],
  },
  {
    forms: ["la", "là", "l'a", "l'as"],
    frames: [
      { slot: "Pose ___ valise sur la table.", correct: "la" },
      { slot: "Viens ___, près de moi.", correct: "là" },
      { slot: "Il ___ pris dans son sac.", correct: "l'a" },
      { slot: "Tu ___ vu hier ?", correct: "l'as" },
      { slot: "Mets ___ voiture au garage.", correct: "la" },
    ],
  },
  {
    forms: ["mes", "mais", "mai", "met"],
    frames: [
      { slot: "J'ai rangé ___ livres.", correct: "mes" },
      { slot: "Il pleut, ___ je sors quand même.", correct: "mais" },
      { slot: "On est au mois de ___.", correct: "mai" },
      { slot: "Elle ___ la table pour le dîner.", correct: "met" },
      { slot: "Voici ___ deux chiens.", correct: "mes" },
    ],
  },
];

export function generateHomophoneItem(): ConjItem {
  const family = pick(HOMOPHONE_FAMILIES);
  const frame = pick(family.frames);
  const correctSentence = frame.slot.replace("___", frame.correct);

  const wrongForms = family.forms.filter((f) => f !== frame.correct);
  // melange et prend 3
  for (let i = wrongForms.length - 1; i > 0; i--) {
    const j = randInt(i + 1);
    [wrongForms[i], wrongForms[j]] = [wrongForms[j], wrongForms[i]];
  }
  const wrongs = wrongForms.slice(0, 3).map((f) => frame.slot.replace("___", f));

  return {
    kind: "qcm",
    text: "Choisis la phrase correctement écrite.",
    correct: correctSentence,
    wrongs,
    methode: `On choisit le bon homophone : ici, c'est « ${frame.correct} ».`,
  };
}

// ── ACCORD SUJET-VERBE ──────────────────────────────────────────────────────

// Sujet (avec son index de personne 0..5) x verbe (present) -> le verbe doit
// s'accorder avec le sujet. Distracteurs = verbe a une autre personne.
type SvSubject = { display: string; person: number };
const SV_SUBJECTS: SvSubject[] = [
  { display: "Je", person: 0 },
  { display: "Tu", person: 1 },
  { display: "Il", person: 2 },
  { display: "Elle", person: 2 },
  { display: "On", person: 2 },
  { display: "Le chat", person: 2 },
  { display: "La maîtresse", person: 2 },
  { display: "Mon ami", person: 2 },
  { display: "Tom", person: 2 },
  { display: "Nous", person: 3 },
  { display: "Vous", person: 4 },
  { display: "Ils", person: 5 },
  { display: "Elles", person: 5 },
  { display: "Les chats", person: 5 },
  { display: "Les enfants", person: 5 },
  { display: "Mes amis", person: 5 },
  { display: "Paul et Léa", person: 5 },
];

const ER_PRESENT_SV = ["e", "es", "e", "ons", "ez", "ent"];
const ETRE_PRES = ["suis", "es", "est", "sommes", "êtes", "sont"];
const AVOIR_PRES = ["ai", "as", "a", "avons", "avez", "ont"];

type SvVerb =
  | { type: "er"; inf: string; comp: string }
  | { type: "etre"; comp: string }
  | { type: "avoir"; comp: string };

const SV_VERBS: SvVerb[] = [
  { type: "er", inf: "jouer", comp: "dans la cour" },
  { type: "er", inf: "chanter", comp: "une belle chanson" },
  { type: "er", inf: "danser", comp: "tous les samedis" },
  { type: "er", inf: "marcher", comp: "jusqu'à l'école" },
  { type: "er", inf: "regarder", comp: "un film" },
  { type: "er", inf: "parler", comp: "doucement" },
  { type: "er", inf: "travailler", comp: "le matin" },
  { type: "er", inf: "ranger", comp: "la chambre" },
  { type: "etre", comp: "dehors" },
  { type: "etre", comp: "en retard" },
  { type: "etre", comp: "a la maison" },
  { type: "avoir", comp: "faim" },
  { type: "avoir", comp: "un chien" },
  { type: "avoir", comp: "raison" },
];

function svVerbForm(verb: SvVerb, person: number): string {
  if (verb.type === "etre") return ETRE_PRES[person];
  if (verb.type === "avoir") return AVOIR_PRES[person];
  return verb.inf.slice(0, -2) + ER_PRESENT_SV[person];
}

export function generateSubjectVerbItem(): ConjItem {
  const subject = pick(SV_SUBJECTS);
  const verb = pick(SV_VERBS);
  const comp = verb.type === "er" ? verb.comp : verb.comp;
  const make = (p: number) => `${subject.display} ${svVerbForm(verb, p)} ${comp}.`;
  const correct = make(subject.person);

  // Distracteurs : memes phrase et sujet, verbe mal accorde (autres personnes).
  const wrongPersons = [0, 1, 2, 3, 4, 5].filter((p) => svVerbForm(verb, p) !== svVerbForm(verb, subject.person));
  for (let i = wrongPersons.length - 1; i > 0; i--) {
    const j = randInt(i + 1);
    [wrongPersons[i], wrongPersons[j]] = [wrongPersons[j], wrongPersons[i]];
  }
  const wrongs: string[] = [];
  for (const p of wrongPersons) {
    const s = make(p);
    if (s !== correct && !wrongs.includes(s)) wrongs.push(s);
    if (wrongs.length === 3) break;
  }
  // Filet : verbe a l'infinitif si pas assez de distracteurs.
  if (wrongs.length < 3 && verb.type === "er") {
    const s = `${subject.display} ${verb.inf} ${comp}.`;
    if (!wrongs.includes(s)) wrongs.push(s);
  }

  return {
    kind: "qcm",
    text: "Choisis la phrase où le verbe est bien accordé avec le sujet.",
    correct,
    wrongs: wrongs.slice(0, 3),
    methode: "Le verbe s'accorde avec son sujet : on cherche qui fait l'action.",
  };
}

// ── VOCABULAIRE (synonymes / antonymes / familles) ──────────────────────────

const SYNONYMS: { mot: string; syn: string }[] = [
  { mot: "rapide", syn: "vif" }, { mot: "content", syn: "heureux" },
  { mot: "joli", syn: "beau" }, { mot: "grand", syn: "immense" },
  { mot: "maison", syn: "demeure" }, { mot: "peur", syn: "crainte" },
  { mot: "calme", syn: "tranquille" }, { mot: "fatigué", syn: "épuisé" },
  { mot: "drôle", syn: "amusant" }, { mot: "rapidement", syn: "vite" },
  { mot: "content", syn: "ravi" }, { mot: "difficile", syn: "dur" },
  { mot: "gentil", syn: "aimable" }, { mot: "bizarre", syn: "étrange" },
  { mot: "début", syn: "commencement" }, { mot: "bateau", syn: "navire" },
];

const ANTONYMS: { mot: string; ant: string }[] = [
  { mot: "grand", ant: "petit" }, { mot: "content", ant: "triste" },
  { mot: "monter", ant: "descendre" }, { mot: "ouvert", ant: "fermé" },
  { mot: "jour", ant: "nuit" }, { mot: "chaud", ant: "froid" },
  { mot: "rapide", ant: "lent" }, { mot: "propre", ant: "sale" },
  { mot: "plein", ant: "vide" }, { mot: "facile", ant: "difficile" },
  { mot: "haut", ant: "bas" }, { mot: "vieux", ant: "jeune" },
  { mot: "début", ant: "fin" }, { mot: "premier", ant: "dernier" },
  { mot: "ami", ant: "ennemi" }, { mot: "fort", ant: "faible" },
];

const FAMILIES: { mot: string; membre: string }[] = [
  { mot: "terre", membre: "terrien" }, { mot: "dent", membre: "dentiste" },
  { mot: "fleur", membre: "fleuriste" }, { mot: "lait", membre: "laitier" },
  { mot: "jardin", membre: "jardinier" }, { mot: "chant", membre: "chanteur" },
  { mot: "livre", membre: "librairie" }, { mot: "danse", membre: "danseur" },
  { mot: "mer", membre: "marin" }, { mot: "froid", membre: "refroidir" },
  { mot: "grand", membre: "grandir" }, { mot: "porte", membre: "portier" },
  { mot: "montagne", membre: "montagnard" }, { mot: "soleil", membre: "ensoleillé" },
];

// Mots quelconques pour les distracteurs (sans rapport avec la bonne reponse).
const DISTRACTOR_WORDS = [
  "table", "voiture", "nuage", "crayon", "fenêtre", "ballon", "tortue",
  "musique", "chaussure", "ordinateur", "banane", "montre", "lampe",
  "valise", "casquette", "trottoir", "fourchette", "parapluie", "carotte",
];

function distractorsFrom(pool: string[], exclude: string[], n: number): string[] {
  const candidates = pool.filter((w) => !exclude.includes(w));
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = randInt(i + 1);
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  return candidates.slice(0, n);
}

export function generateVocabularyItem(kind: "syn" | "ant" | "famille"): ConjItem {
  if (kind === "ant") {
    const item = pick(ANTONYMS);
    return {
      kind: "qcm",
      text: `Quel est le contraire de « ${item.mot} » ?`,
      correct: item.ant,
      wrongs: distractorsFrom(
        [...DISTRACTOR_WORDS, ...SYNONYMS.map((s) => s.syn)],
        [item.ant, item.mot],
        3
      ),
      methode: "Un antonyme a le sens opposé.",
    };
  }
  if (kind === "famille") {
    const item = pick(FAMILIES);
    return {
      kind: "qcm",
      text: `Quel mot appartient à la même famille que « ${item.mot} » ?`,
      correct: item.membre,
      wrongs: distractorsFrom(DISTRACTOR_WORDS, [item.membre, item.mot], 3),
      methode: "Les mots d'une même famille partagent une racine et un sens proche.",
    };
  }
  const item = pick(SYNONYMS);
  return {
    kind: "qcm",
    text: `Quel est un synonyme de « ${item.mot} » ?`,
    correct: item.syn,
    wrongs: distractorsFrom(
      [...DISTRACTOR_WORDS, ...ANTONYMS.map((a) => a.ant)],
      [item.syn, item.mot],
      3
    ),
    methode: "Un synonyme a (à peu près) le même sens.",
  };
}
