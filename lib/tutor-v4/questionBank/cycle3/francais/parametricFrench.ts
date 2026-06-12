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
  { sing: "gateau", plur: "gateaux", genre: "m" },
  { sing: "bateau", plur: "bateaux", genre: "m" },
  { sing: "cheval", plur: "chevaux", genre: "m" },
  { sing: "journal", plur: "journaux", genre: "m" },
  { sing: "velo", plur: "velos", genre: "m" },
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
  { sing: "fenetre", plur: "fenetres", genre: "f" },
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
    text: "Choisis le groupe nominal correctement accorde.",
    correct,
    wrongs: wrongs.slice(0, 3),
    methode: "Le determinant, le nom et l'adjectif s'accordent en genre et en nombre.",
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
      { slot: "Il ___ un nouveau velo.", correct: "a" },
      { slot: "Elle va ___ l'ecole.", correct: "à" },
      { slot: "Tu ___ raison.", correct: "as" },
      { slot: "Lea ___ gagne le match.", correct: "a" },
      { slot: "On part ___ midi.", correct: "à" },
      { slot: "Tu ___ de la chance.", correct: "as" },
    ],
  },
  {
    forms: ["et", "est", "es", "ai"],
    frames: [
      { slot: "Mon frere ___ grand.", correct: "est" },
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
      { slot: "Regarde ___ fleurs-la.", correct: "ces" },
      { slot: "___ tres joli.", correct: "c'est" },
      { slot: "Il ___ cache derriere l'arbre.", correct: "s'est" },
      { slot: "Elle a perdu ___ cles (les siennes).", correct: "ses" },
      { slot: "___ bientot les vacances.", correct: "c'est" },
    ],
  },
  {
    forms: ["la", "là", "l'a", "l'as"],
    frames: [
      { slot: "Pose ___ valise sur la table.", correct: "la" },
      { slot: "Viens ___, pres de moi.", correct: "là" },
      { slot: "Il ___ pris dans son sac.", correct: "l'a" },
      { slot: "Tu ___ vu hier ?", correct: "l'as" },
      { slot: "Mets ___ voiture au garage.", correct: "la" },
    ],
  },
  {
    forms: ["mes", "mais", "mai", "met"],
    frames: [
      { slot: "J'ai range ___ livres.", correct: "mes" },
      { slot: "Il pleut, ___ je sors quand meme.", correct: "mais" },
      { slot: "On est au mois de ___.", correct: "mai" },
      { slot: "Elle ___ la table pour le diner.", correct: "met" },
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
    text: "Choisis la phrase correctement ecrite.",
    correct: correctSentence,
    wrongs,
    methode: `On choisit le bon homophone : ici, c'est « ${frame.correct} ».`,
  };
}
