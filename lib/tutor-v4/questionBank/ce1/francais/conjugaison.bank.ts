// lib/tutor-v4/questionBank/ce1/francais/conjugaison.bank.ts
//
// La conjugaison du CE1, écrite à la main par-dessus le moteur du même dossier.
//
// CE QU'ELLE REMPLACE : douze énoncés pour dix micro-compétences, servis par le
// générateur commun aux trois classes du cycle 2. Trois verbes (chanter, jouer,
// manger), le seul présent, et trois questions figées sur être et avoir. Les
// dix micro-compétences recevaient les MÊMES douze questions — « Conjugue le
// verbe manger au présent avec je » arrivait aussi bien sur « Reconnaître
// l'infinitif » que sur « Retrouver l'infinitif d'un verbe conjugué ».
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours élémentaire première année) :
//   — « Apprendre à conjuguer au présent, à l'imparfait, au futur puis au passé
//     composé de l'indicatif être et avoir et les verbes du premier groupe » ;
//   — « Identifier le radical et la terminaison » ;
//   — exemple de réussite : « ils plieront, tu as plié → plier ».
//
// ⛔ L'IMPARFAIT ET LE FUTUR SONT AU CE1. Le coach les rangeait au CE2 : ce
// n'était pas un choix, c'était un écart, corrigé dans les micro-compétences le
// 09/08/2026 (commit 462a1860) et servi ici pour la première fois.
// ⛔ Pas de verbe irrégulier du 3ᵉ groupe conjugué : faire, aller, dire, venir,
// pouvoir, voir, vouloir, prendre sont au CE2.
//
// LES DEUX PIÈGES DE LA NOTION, et ils s'entendent tous les deux :
//   — « je chanterai » (futur) et « je chantais » (imparfait) se ressemblent à
//     une lettre près, et l'oreille ne tranche pas entre -ai et -ais ;
//   — « j'ai chanté » et « j'ai chanter » se disent EXACTEMENT pareil. Le -é du
//     participe passé et le -er de l'infinitif sonnent identiques. C'est la
//     faute la plus fréquente du cycle 2, et aucune oreille ne la rattrape.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* ═══════════════════════════════════════════════════════════════════════════
   LE MOTEUR DE CONJUGAISON DU CE1
   ═══════════════════════════════════════════════════════════════════════════

   ⚠️ POURQUOI LE MOTEUR EST DANS LE MÊME FICHIER QUE LA BANQUE, et pourquoi il
   ne faut pas le sortir dans un `conjugationEngine.ts` voisin :
   `scripts/verifier-generateurs.mjs` charge chaque banque avec `import()` de
   Node. Node ne résout pas un import relatif sans extension, et TypeScript
   refuse l'extension `.ts` sans `allowImportingTsExtensions` — un réglage qui
   vit dans le `tsconfig.json` commun. Séparé, ce fichier tombait dans « Hors de
   portée de ce contrôle » : les générateurs n'étaient PLUS JAMAIS EXÉCUTÉS, et
   le rapport annonçait quand même « aucun problème ». Essayé le 10/08/2026,
   remis ensemble le jour même.

   ⛔ Ne pas le mettre non plus dans un fichier partagé du cycle 2 : le CP et le
   CE2 ont chacun le leur, et trois sessions travaillent en parallèle. On
   factorisera quand les trois classes seront posées.

   Le modèle est `cycle3/francais/conjugationEngine.ts` (CM1, CM2, 6ᵉ) : on ne
   s'en sert pas ici, il conjugue huit verbes du 3ᵉ groupe qui sont au CE2.

   ── Les quatre pièges qui ont décidé du contenu des tables ─────────────────

   1. LES VERBES QUI PRENNENT « ÊTRE » AU PASSÉ COMPOSÉ. Le BO du CE1 dit « le
      passé composé avec avoir ». Or *tomber*, *rester*, *monter*, *arriver*,
      *entrer* et *rentrer* sont d'excellents verbes du 1ᵉʳ groupe qui font
      « il EST tombé » — et « les letchis sont tombéS » avec un accord en prime.
      Ils restent dans la liste pour le présent, l'imparfait et le futur ; le
      champ `auxEtre` les écarte du seul passé composé.

   2. LES RADICAUX QUI BOUGENT. -ger (nous mangeons), -cer (nous plaçons),
      -eler / -eter (il appelle, il jette), -yer (il essuie), -e_er (il lève),
      -é_er (il répète) : la règle « radical + terminaison » y devient fausse.
      Aucun de ces verbes n'entre dans la liste.

   3. LES VERBES EN -IER. *plier* fait « nous pliions » à l'imparfait, avec deux
      i. C'est juste, et c'est illisible pour un enfant de sept ans. Ils sont
      rangés à part, dans PLIER_ET_CIE, et ne servent qu'à retrouver
      l'infinitif — où le BO donne justement *ils plieront, tu as plié → plier*.

   4. L'ÉLISION. « je » devient « j' » devant une voyelle, et cela dépend de la
      FORME, pas du verbe : on dit « je serai » mais « j'ai ». Elle se calcule
      donc sur la forme conjuguée, jamais sur l'infinitif.
   ═══════════════════════════════════════════════════════════════════════════ */

export type Temps = "present" | "imparfait" | "futur" | "passeCompose";

export type Verbe = {
  readonly inf: string;
  /** Prend « être » au passé composé → écarté de ce seul temps (piège 1). */
  readonly auxEtre: boolean;
};

/** Les six personnes, dans l'ordre du tableau de conjugaison. */
export const PRONOMS: readonly string[] = ["je", "tu", "il", "nous", "vous", "ils"];

export const TEMPS: readonly Temps[] = ["present", "imparfait", "futur", "passeCompose"];

/** « au présent », mais « à l'imparfait » : l'élision est écrite, pas devinée. */
export const TEMPS_PHRASE: Record<Temps, string> = {
  present: "au présent",
  imparfait: "à l'imparfait",
  futur: "au futur",
  passeCompose: "au passé composé",
};

export const TEMPS_NOM: Record<Temps, string> = {
  present: "le présent",
  imparfait: "l'imparfait",
  futur: "le futur",
  passeCompose: "le passé composé",
};

/** Ce que chaque temps raconte, dit à un enfant de sept ans. */
export const TEMPS_SENS: Record<Temps, string> = {
  present: "ce qui se passe maintenant",
  imparfait: "ce qui durait avant, autrefois",
  futur: "ce qui n'est pas encore arrivé",
  passeCompose: "ce qui est fini, ce qui a déjà eu lieu",
};

/** Les mots qui plantent le temps au début de la phrase. */
export const REPERES: Record<Temps, readonly string[]> = {
  present: ["En ce moment", "Aujourd'hui", "Maintenant", "Chaque matin"],
  imparfait: ["Autrefois", "Avant", "L'an dernier", "Tous les soirs, l'an dernier"],
  futur: ["Demain", "Bientôt", "L'année prochaine", "Samedi prochain"],
  passeCompose: ["Hier", "Ce matin", "La semaine dernière", "Samedi dernier"],
};

/* ── Les verbes du 1ᵉʳ groupe ────────────────────────────────────────────────
   Radical stable, terminaisons régulières : la règle du CE1 y est exacte. */
export const VERBES_ER: readonly Verbe[] = [
  { inf: "chanter", auxEtre: false },
  { inf: "jouer", auxEtre: false },
  { inf: "marcher", auxEtre: false },
  { inf: "danser", auxEtre: false },
  { inf: "sauter", auxEtre: false },
  { inf: "regarder", auxEtre: false },
  { inf: "montrer", auxEtre: false },
  { inf: "donner", auxEtre: false },
  { inf: "trouver", auxEtre: false },
  { inf: "raconter", auxEtre: false },
  { inf: "porter", auxEtre: false },
  { inf: "fermer", auxEtre: false },
  { inf: "pousser", auxEtre: false },
  { inf: "ramasser", auxEtre: false },
  { inf: "dessiner", auxEtre: false },
  { inf: "grimper", auxEtre: false },
  { inf: "glisser", auxEtre: false },
  { inf: "gratter", auxEtre: false },
  { inf: "frapper", auxEtre: false },
  { inf: "attraper", auxEtre: false },
  { inf: "attacher", auxEtre: false },
  { inf: "planter", auxEtre: false },
  { inf: "arroser", auxEtre: false },
  { inf: "chercher", auxEtre: false },
  { inf: "quitter", auxEtre: false },
  { inf: "saluer", auxEtre: false },
  { inf: "souffler", auxEtre: false },
  { inf: "siffler", auxEtre: false },
  { inf: "verser", auxEtre: false },
  { inf: "préparer", auxEtre: false },
  { inf: "escalader", auxEtre: false },
  { inf: "bavarder", auxEtre: false },
  { inf: "chuchoter", auxEtre: false },
  { inf: "écouter", auxEtre: false },
  { inf: "aider", auxEtre: false },
  { inf: "aimer", auxEtre: false },
  { inf: "allumer", auxEtre: false },
  { inf: "inviter", auxEtre: false },
  { inf: "avaler", auxEtre: false },
  { inf: "goûter", auxEtre: false },
  { inf: "pêcher", auxEtre: false },
  { inf: "cuisiner", auxEtre: false },
  { inf: "réciter", auxEtre: false },
  { inf: "décorer", auxEtre: false },
  { inf: "tomber", auxEtre: true },
  { inf: "rester", auxEtre: true },
  { inf: "monter", auxEtre: true },
  { inf: "arriver", auxEtre: true },
  { inf: "entrer", auxEtre: true },
  { inf: "rentrer", auxEtre: true },
];

/** Ceux qu'on peut mettre au passé composé sans convoquer « être ». */
export const VERBES_ER_AVOIR: readonly Verbe[] = VERBES_ER.filter((v) => !v.auxEtre);

/** Les -ier : justes partout, mais « nous pliions » ne se montre pas au CE1.
 *  Réservés à « retrouver l'infinitif », l'exemple même du BO. */
export const PLIER_ET_CIE: readonly string[] = [
  "plier", "crier", "copier", "oublier", "étudier", "remercier",
];

/* ── Être et avoir, écrits à la main ─────────────────────────────────────── */

export type TableVerbe = {
  readonly inf: string;
  readonly present: readonly string[];
  readonly imparfait: readonly string[];
  readonly futur: readonly string[];
  readonly participe: string;
};

export const ETRE: TableVerbe = {
  inf: "être",
  present: ["suis", "es", "est", "sommes", "êtes", "sont"],
  imparfait: ["étais", "étais", "était", "étions", "étiez", "étaient"],
  futur: ["serai", "seras", "sera", "serons", "serez", "seront"],
  participe: "été",
};

export const AVOIR: TableVerbe = {
  inf: "avoir",
  present: ["ai", "as", "a", "avons", "avez", "ont"],
  imparfait: ["avais", "avais", "avait", "avions", "aviez", "avaient"],
  futur: ["aurai", "auras", "aura", "aurons", "aurez", "auront"],
  participe: "eu",
};

/* ── Les règles ──────────────────────────────────────────────────────────── */

const PRESENT_ER: readonly string[] = ["e", "es", "e", "ons", "ez", "ent"];
const IMPARFAIT_ER: readonly string[] = ["ais", "ais", "ait", "ions", "iez", "aient"];
const FUTUR_TERMINAISONS: readonly string[] = ["ai", "as", "a", "ons", "ez", "ont"];

/** Les terminaisons du temps demandé, pour un verbe du 1ᵉʳ groupe. */
export function terminaisons(temps: Temps): readonly string[] {
  if (temps === "imparfait") return IMPARFAIT_ER;
  if (temps === "futur") return FUTUR_TERMINAISONS;
  return PRESENT_ER;
}

/** « chanter » → « chant ». La règle du CE1 : on enlève le -er. */
export function radical(inf: string): string {
  return inf.slice(0, -2);
}

/** « chanter » → « chanté ». Le participe passé du 1ᵉʳ groupe est toujours en -é. */
export function participe(inf: string): string {
  return `${radical(inf)}é`;
}

/** Une forme conjuguée d'un verbe du 1ᵉʳ groupe, pour la personne demandée. */
export function conjuguerEr(inf: string, temps: Temps, personne: number): string {
  if (temps === "passeCompose") return `${AVOIR.present[personne]} ${participe(inf)}`;
  if (temps === "futur") return `${inf}${FUTUR_TERMINAISONS[personne]}`;
  return `${radical(inf)}${terminaisons(temps)[personne]}`;
}

/** Une forme conjuguée d'être ou d'avoir. Leur passé composé se fait avec avoir. */
export function conjuguerTable(v: TableVerbe, temps: Temps, personne: number): string {
  if (temps === "passeCompose") return `${AVOIR.present[personne]} ${v.participe}`;
  if (temps === "imparfait") return v.imparfait[personne];
  if (temps === "futur") return v.futur[personne];
  return v.present[personne];
}

/* ── L'élision, calculée sur la FORME ────────────────────────────────────── */

const COMMENCE_PAR_UNE_VOYELLE = /^[aàâeéèêëiîïoôuûù]/i;

/** « je » + « ai » → « j'ai » ; « je » + « serai » → « je serai ». */
export function avecPronom(personne: number, forme: string): string {
  const pronom = PRONOMS[personne];
  if (pronom === "je" && COMMENCE_PAR_UNE_VOYELLE.test(forme)) return `j'${forme}`;
  return `${pronom} ${forme}`;
}

/** « je » ou « Je » selon l'endroit de la phrase, mais toujours élidé pareil. */
function elide(sujet: string, forme: string): string | null {
  if (sujet.toLowerCase() !== "je") return null;
  if (!COMMENCE_PAR_UNE_VOYELLE.test(forme)) return null;
  return sujet === "Je" ? "J'" : "j'";
}

/** Le sujet écrit devant un trou : « J'___ » quand la forme commence par une voyelle. */
export function sujetAvecTrou(sujet: string, forme: string): string {
  const j = elide(sujet, forme);
  return j ? `${j}___` : `${sujet} ___`;
}

/** Le sujet et sa forme, recollés : « J'écoute », « Le margouillat grimpe ». */
export function sujetAvecForme(sujet: string, forme: string): string {
  const j = elide(sujet, forme);
  return j ? `${j}${forme}` : `${sujet} ${forme}`;
}

/* ── Les accents, côté réponse libre ─────────────────────────────────────── */

// Les diacritiques combinants, désignés par leurs points de code. Écrits en
// clair dans une expression régulière, ils sont invisibles à la relecture et ne
// survivent pas au premier copier-coller.
const DIACRITIQUES = new RegExp("[\\u0300-\\u036f]", "g");

export function sansAccent(mot: string): string {
  return mot.normalize("NFD").replace(DIACRITIQUES, "");
}

/**
 * Ce qu'on accepte d'un enfant de sept ans sur un clavier. Le comparateur
 * `exact_text` ne retire pas les accents : « écoutais » tapé « ecoutais »
 * serait compté faux. Ici l'accent est dans le RADICAL, jamais dans la
 * terminaison — ce n'est pas ce qu'on évalue. La forme accentuée vient en tête.
 *
 * ⛔ JAMAIS SUR UN PARTICIPE PASSÉ. `sansAccent("ramassé")` rend « ramasse »,
 * qui est une AUTRE forme du même verbe : on accepterait la faute qu'on
 * cherchait justement à corriger. Le participe passé se demande en QCM, où le
 * -é et le -er se regardent côte à côte.
 * ⛔ Ni sur une micro-compétence d'accentuation : là, l'accent EST la question.
 */
export function reponsesAcceptees(forme: string): string[] {
  const nu = sansAccent(forme);
  return nu === forme ? [forme] : [forme, nu];
}

/** Les vingt-quatre formes d'un verbe du 1ᵉʳ groupe : le vivier des pièges. */
export function toutesLesFormesEr(inf: string): string[] {
  const out: string[] = [inf];
  for (const t of TEMPS) {
    if (t === "passeCompose" && VERBES_ER.find((v) => v.inf === inf)?.auxEtre) continue;
    for (let p = 0; p < 6; p += 1) out.push(conjuguerEr(inf, t, p));
  }
  return out;
}

export function toutesLesFormesTable(v: TableVerbe): string[] {
  const out: string[] = [v.inf];
  for (const t of TEMPS) for (let p = 0; p < 6; p += 1) out.push(conjuguerTable(v, t, p));
  return out;
}

/* ═══════════════════════════════════════════════════════════════════════════
   LA BANQUE
   ═══════════════════════════════════════════════════════════════════════════ */

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

/* ── Les phrases ────────────────────────────────────────────────────────────
   Le sujet est écrit tel qu'il s'affiche ; `p` dit à quelle personne du
   tableau il correspond. « Elle » et « Les vagues » pointent tous les deux
   vers une ligne du tableau, la 3ᵉ et la 6ᵉ.
   ⚠️ Les phrases ne sont pas recomposées : sujet, verbe et suite sont écrits
   ensemble, et se relisent ensemble. */

type PhraseEr = {
  readonly sujet: string;
  readonly p: number;
  readonly verbe: string;
  readonly suite: string;
  /** Un sujet qui peut vouloir quelque chose : « Le vent aime souffler » se lit
   *  mal. Seuls les sujets animés servent aux phrases à deux verbes. */
  readonly anime: boolean;
};

const PHRASES_ER: readonly PhraseEr[] = [
  { sujet: "Le margouillat", p: 2, verbe: "grimper", suite: "sur le mur", anime: true },
  { sujet: "Les letchis", p: 5, verbe: "tomber", suite: "dans l'herbe", anime: false },
  { sujet: "Léa", p: 2, verbe: "ramasser", suite: "des mangues", anime: true },
  { sujet: "Nous", p: 3, verbe: "marcher", suite: "sur le sentier", anime: true },
  { sujet: "Je", p: 0, verbe: "écouter", suite: "la pluie sur le toit", anime: true },
  { sujet: "Tu", p: 1, verbe: "chanter", suite: "très fort", anime: true },
  { sujet: "Vous", p: 4, verbe: "regarder", suite: "le lagon", anime: true },
  { sujet: "Papa", p: 2, verbe: "préparer", suite: "un cari", anime: true },
  { sujet: "Les enfants", p: 5, verbe: "jouer", suite: "dans la cour", anime: true },
  { sujet: "Le bateau", p: 2, verbe: "quitter", suite: "le port", anime: false },
  { sujet: "Ma sœur", p: 2, verbe: "dessiner", suite: "un margouillat", anime: true },
  { sujet: "Nous", p: 3, verbe: "arroser", suite: "les fleurs", anime: true },
  { sujet: "Le vent", p: 2, verbe: "souffler", suite: "sur le piton", anime: false },
  { sujet: "Tu", p: 1, verbe: "aider", suite: "ton petit frère", anime: true },
  { sujet: "Les pêcheurs", p: 5, verbe: "rentrer", suite: "avant la nuit", anime: true },
  { sujet: "Je", p: 0, verbe: "grimper", suite: "sur le rocher", anime: true },
  { sujet: "Mamie", p: 2, verbe: "raconter", suite: "une histoire", anime: true },
  { sujet: "Vous", p: 4, verbe: "danser", suite: "dans la cour", anime: true },
  { sujet: "Le maitre", p: 2, verbe: "montrer", suite: "la carte de l'île", anime: true },
  { sujet: "Les oiseaux", p: 5, verbe: "chanter", suite: "le matin", anime: true },
  { sujet: "Tom", p: 2, verbe: "porter", suite: "son cartable", anime: true },
  { sujet: "Nous", p: 3, verbe: "escalader", suite: "le piton", anime: true },
  { sujet: "Je", p: 0, verbe: "attraper", suite: "le ballon", anime: true },
  { sujet: "Tu", p: 1, verbe: "fermer", suite: "la porte", anime: true },
  { sujet: "Les vagues", p: 5, verbe: "glisser", suite: "sur le sable", anime: false },
  { sujet: "Elle", p: 2, verbe: "saluer", suite: "la voisine", anime: true },
  { sujet: "Vous", p: 4, verbe: "planter", suite: "un tamarin", anime: true },
  { sujet: "Le chien", p: 2, verbe: "gratter", suite: "à la porte", anime: true },
  { sujet: "Les élèves", p: 5, verbe: "réciter", suite: "une poésie", anime: true },
  { sujet: "Je", p: 0, verbe: "goûter", suite: "le cari de mamie", anime: true },
  { sujet: "Nous", p: 3, verbe: "chercher", suite: "des coquillages", anime: true },
  { sujet: "Le pêcheur", p: 2, verbe: "verser", suite: "l'eau dans le seau", anime: true },
  { sujet: "Tu", p: 1, verbe: "siffler", suite: "un air connu", anime: true },
  { sujet: "Les cousins", p: 5, verbe: "bavarder", suite: "sous le manguier", anime: true },
  { sujet: "Papa", p: 2, verbe: "allumer", suite: "le feu", anime: true },
];

/** Les prénoms gardent leur majuscule au milieu d'une phrase, les autres non.
 *  Sans cette liste, « Autrefois, Le margouillat grimpait » — un coach de
 *  français ne peut pas écrire ça. */
const NOMS_PROPRES: ReadonlySet<string> = new Set(["Léa", "Papa", "Mamie", "Tom"]);

/** Le sujet tel qu'il s'écrit APRÈS une virgule : « Autrefois, le margouillat… ». */
function apresVirgule(sujet: string): string {
  if (NOMS_PROPRES.has(sujet)) return sujet;
  return sujet.charAt(0).toLowerCase() + sujet.slice(1);
}

/** Celles dont le verbe prend « avoir » : les seules qu'on met au passé composé. */
const PHRASES_ER_PC: readonly PhraseEr[] = PHRASES_ER.filter(
  (ph) => !VERBES_ER.find((v) => v.inf === ph.verbe)?.auxEtre,
);

type PhraseAux = {
  readonly sujet: string;
  readonly p: number;
  readonly aux: "etre" | "avoir";
  readonly suite: string;
  /** Faux quand le passé composé de cette phrase-là ne se dirait pas. */
  readonly pc: boolean;
};

const PHRASES_AUX: readonly PhraseAux[] = [
  { sujet: "Le margouillat", p: 2, aux: "etre", suite: "sur le mur", pc: false },
  { sujet: "Léa", p: 2, aux: "etre", suite: "contente", pc: true },
  { sujet: "Je", p: 0, aux: "etre", suite: "en retard", pc: true },
  { sujet: "Nous", p: 3, aux: "etre", suite: "dans la cour", pc: false },
  { sujet: "Vous", p: 4, aux: "etre", suite: "prêts à partir", pc: false },
  { sujet: "Tu", p: 1, aux: "etre", suite: "malade", pc: true },
  { sujet: "Les letchis", p: 5, aux: "etre", suite: "mûrs", pc: false },
  { sujet: "Le bateau", p: 2, aux: "etre", suite: "en retard", pc: true },
  { sujet: "Elles", p: 5, aux: "etre", suite: "à la plage", pc: false },
  { sujet: "Mon frère", p: 2, aux: "etre", suite: "content", pc: true },
  { sujet: "Nous", p: 3, aux: "etre", suite: "à l'abri sous la varangue", pc: false },
  { sujet: "Je", p: 0, aux: "avoir", suite: "un cahier bleu", pc: true },
  { sujet: "Tu", p: 1, aux: "avoir", suite: "une gomme neuve", pc: true },
  { sujet: "Le chien", p: 2, aux: "avoir", suite: "soif", pc: true },
  { sujet: "Nous", p: 3, aux: "avoir", suite: "faim", pc: true },
  { sujet: "Vous", p: 4, aux: "avoir", suite: "raison", pc: true },
  { sujet: "Les enfants", p: 5, aux: "avoir", suite: "des billes", pc: true },
  { sujet: "Mamie", p: 2, aux: "avoir", suite: "un beau jardin", pc: true },
  { sujet: "Je", p: 0, aux: "avoir", suite: "peur du noir", pc: true },
  { sujet: "Les pêcheurs", p: 5, aux: "avoir", suite: "de la chance", pc: true },
  { sujet: "Tu", p: 1, aux: "avoir", suite: "de la peinture sur les doigts", pc: true },
  { sujet: "Elle", p: 2, aux: "avoir", suite: "mal aux dents", pc: true },
  { sujet: "Vous", p: 4, aux: "etre", suite: "en avance", pc: true },
  { sujet: "Le cari", p: 2, aux: "etre", suite: "encore chaud", pc: false },
  { sujet: "Tu", p: 1, aux: "etre", suite: "le premier de la file", pc: true },
  { sujet: "Nous", p: 3, aux: "etre", suite: "au bord du lagon", pc: false },
  { sujet: "Je", p: 0, aux: "etre", suite: "content de te voir", pc: false },
  { sujet: "Les margouillats", p: 5, aux: "etre", suite: "sur la varangue", pc: false },
  { sujet: "Le maitre", p: 2, aux: "etre", suite: "au tableau", pc: false },
  { sujet: "Nous", p: 3, aux: "avoir", suite: "un margouillat dans la classe", pc: true },
  { sujet: "Vous", p: 4, aux: "avoir", suite: "de la place dans le canot", pc: true },
  { sujet: "Je", p: 0, aux: "avoir", suite: "une trousse rouge", pc: true },
  { sujet: "Les cousins", p: 5, aux: "avoir", suite: "un chien noir", pc: true },
  { sujet: "Tom", p: 2, aux: "avoir", suite: "besoin d'aide", pc: true },
  { sujet: "Tu", p: 1, aux: "avoir", suite: "du sable dans les cheveux", pc: true },
  { sujet: "Nous", p: 3, aux: "avoir", suite: "trois letchis chacun", pc: true },
  { sujet: "Elles", p: 5, aux: "avoir", suite: "peur de l'orage", pc: true },
  { sujet: "Je", p: 0, aux: "avoir", suite: "chaud sous le manguier", pc: false },
];

/** Les phrases en « avoir » : les seules dont on peut changer le sujet sans
 *  toucher au reste. « Léa est contente » deviendrait « ils sont contente » —
 *  l'attribut s'accorde, et la phrase serait fausse. */
const PHRASES_AVOIR: readonly PhraseAux[] = PHRASES_AUX.filter((ph) => ph.aux === "avoir");

function tableDe(aux: "etre" | "avoir") {
  return aux === "etre" ? ETRE : AVOIR;
}

/** Les formes simples d'un verbe du 1ᵉʳ groupe : le vivier des pièges d'un mot. */
function formesSimples(inf: string): string[] {
  return toutesLesFormesEr(inf).filter((f) => f !== inf && !f.includes(" "));
}

/** Les personnes dont la forme ne se confond avec aucune autre du même temps.
 *  « chantais » va avec « je » ET « tu » : on ne peut pas demander laquelle. */
function personnesSansJumelle(formes: readonly string[]): number[] {
  return formes
    .map((f, i) => (formes.filter((g) => g === f).length === 1 ? i : -1))
    .filter((i) => i >= 0);
}

const TOUS_TEMPS: readonly Temps[] = ["present", "imparfait", "futur", "passeCompose"];

/* ── Les repères du défi ────────────────────────────────────────────────────
   ⚠️ « Hier, je jouais » et « hier, j'ai joué » sont tous les deux justes. En
   français, ce n'est PAS le mot du début qui sépare l'imparfait du passé
   composé, c'est l'aspect — ce qui durait contre ce qui est arrivé une fois.
   Un défi qui proposerait les deux aurait donc deux bonnes réponses, et rien
   ne le signalerait : la question serait bien formée, elle serait juste
   fausse. Le repère ne tranche que la ZONE — avant, maintenant, pas encore —
   et on n'offre jamais les deux temps du passé dans le même défi.
   Pour la même raison, « Aujourd'hui » et « Chaque matin » ne sont pas des
   repères de présent utilisables ici : « aujourd'hui, j'ai ramassé » et
   « chaque matin, il grimpait » se disent aussi. */
type RepereDefi = { readonly mot: string; readonly temps: Temps };

const REPERES_DEFI: readonly RepereDefi[] = [
  { mot: "En ce moment", temps: "present" },
  { mot: "Maintenant", temps: "present" },
  { mot: "En ce moment même", temps: "present" },
  { mot: "Regarde", temps: "present" },
  { mot: "Autrefois", temps: "imparfait" },
  { mot: "Avant", temps: "imparfait" },
  { mot: "Tous les soirs, l'an dernier", temps: "imparfait" },
  { mot: "Chaque jour, autrefois", temps: "imparfait" },
  { mot: "Demain", temps: "futur" },
  { mot: "Bientôt", temps: "futur" },
  { mot: "L'année prochaine", temps: "futur" },
  { mot: "Samedi prochain", temps: "futur" },
  { mot: "Hier", temps: "passeCompose" },
  { mot: "Ce matin", temps: "passeCompose" },
  { mot: "La semaine dernière", temps: "passeCompose" },
  { mot: "Samedi dernier", temps: "passeCompose" },
];

/** Les trois autres temps à proposer contre celui-là : les deux autres zones,
 *  jamais l'autre temps du passé. */
function contreTemps(bon: Temps): Temps[] {
  if (bon === "present") return ["futur", "passeCompose"];
  if (bon === "futur") return ["present", "imparfait"];
  return ["present", "futur"];
}

/** Une personne dont la forme diffère de celle-là : le quatrième piège du défi
 *  est le bon temps avec la mauvaise personne. Au présent, « je chante » et
 *  « il chante » s'écrivent pareil — on ne les oppose pas. */
function autrePersonne(inf: string, temps: Temps, p: number): number {
  const forme = conjuguerEr(inf, temps, p);
  const candidats = [0, 1, 2, 3, 4, 5].filter(
    (q) => q !== p && conjuguerEr(inf, temps, q) !== forme,
  );
  return randomChoice(candidats);
}

export const conjugaisonBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_CONJ_INFINITIF — le nom du verbe
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_conj_infinitif_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_infinitif",
    difficulty: 1,
    theme: "neutral",
    text: "Qu'est-ce que l'infinitif d'un verbe ?",
    format: "qcm",
    choices: [
      "Son nom : la forme qu'on trouve dans le dictionnaire",
      "Sa forme avec « je »",
      "Sa forme au futur",
      "Sa forme la plus longue",
    ],
    expected: ["Son nom : la forme qu'on trouve dans le dictionnaire"],
    comparator: "mcq_exact",
    hint: "Si tu cherches « chantons » dans le dictionnaire, tu ne le trouveras pas. Cherche autre chose.",
    explanation: exp(
      "L'infinitif, c'est le nom du verbe. Il ne change jamais : ni avec la personne, ni avec le temps.",
      "Pour le trouver, dis « je suis en train de… » : ce qui suit est l'infinitif.",
      "chante, chantons, chantais, chanteras : quatre habits pour un seul verbe, « chanter ». C'est lui qui est écrit dans le dictionnaire.",
      "L'infinitif, c'est le nom du verbe, celui du dictionnaire.",
    ),
    tags: ["ce1", "conjugaison", "infinitif", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_conj_infinitif_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_infinitif",
    difficulty: 2,
    theme: "neutral",
    hint: "Essaie de mettre « je suis en train de » devant. Si ça se dit, c'est l'infinitif.",
    tags: ["ce1", "conjugaison", "infinitif", "template"],
    generate: () => {
      const v = randomChoice(VERBES_ER);
      const infinitif = Math.random() < 0.4;
      const mot = infinitif ? v.inf : randomChoice(formesSimples(v.inf));
      const bon = infinitif ? "à l'infinitif" : "déjà conjugué";
      return {
        text: `« ${mot} » : ce verbe est-il à l'infinitif, ou déjà conjugué ?`,
        format: "qcm" as const,
        choices: ["à l'infinitif", "déjà conjugué"],
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un verbe à l'infinitif ne dit ni qui fait l'action, ni quand. Un verbe conjugué le dit.",
          "Pose « je suis en train de… » devant le mot : seul l'infinitif accepte.",
          infinitif
            ? `« Je suis en train de ${v.inf} » se dit. Le mot est bien l'infinitif : il ne dit ni qui, ni quand.`
            : `« Je suis en train de ${mot} » ne se dit pas. « ${mot} » a déjà choisi sa personne et son temps ; son infinitif est « ${v.inf} ».`,
          `« ${mot} » est ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_conj_infinitif_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_infinitif",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans une phrase, deux verbes se suivent : le second reste à l'infinitif.",
    tags: ["ce1", "conjugaison", "infinitif", "template"],
    generate: () => {
      // Un sujet animé : « Le vent aime souffler » se lit mal.
      const ph = randomChoice(PHRASES_ER.filter((x) => x.anime));
      // « aimer » est du 1ᵉʳ groupe : on conjugue ce qu'on a le droit de
      // conjuguer, et le second verbe reste tout nu.
      const premier = conjuguerEr("aimer", "present", ph.p);
      const phrase = `${sujetAvecForme(ph.sujet, premier)} ${ph.verbe} ${ph.suite}.`;
      const motsSuite = ph.suite.split(" ");
      return {
        text: `Dans cette phrase, deux verbes se suivent. Lequel est resté à l'infinitif ?\n\n« ${phrase} »`,
        format: "qcm" as const,
        choices: makeChoices(ph.verbe, [premier, motsSuite[motsSuite.length - 1], motsSuite[0]]),
        expected: [ph.verbe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Quand deux verbes se suivent, le premier se conjugue et le second reste à l'infinitif.",
          "Trouve celui qui dit qui fait l'action : c'est le conjugué. Celui qui le suit ne bouge pas.",
          `« ${premier} » a choisi sa personne. « ${ph.verbe} » n'a rien choisi du tout : c'est l'infinitif.`,
          `Le verbe à l'infinitif est « ${ph.verbe} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CONJ_RADICAL_TERMINAISON — ce qui tient, ce qui bouge
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_conj_radical_terminaison_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_radical_terminaison",
    difficulty: 1,
    theme: "neutral",
    text: "Comment trouve-t-on le radical d'un verbe comme « chanter » ?",
    format: "qcm",
    choices: [
      "On enlève le « -er » de l'infinitif : il reste « chant »",
      "On enlève la première lettre",
      "On garde les trois premières lettres",
      "On ajoute un « s »",
    ],
    expected: ["On enlève le « -er » de l'infinitif : il reste « chant »"],
    comparator: "mcq_exact",
    hint: "Le radical, c'est le morceau qui ne bouge jamais.",
    explanation: exp(
      "Un verbe se coupe en deux : le radical, qui porte le sens, et la terminaison, qui change avec la personne et le temps.",
      "Pars de l'infinitif et enlève le « -er ».",
      "chanter → chant. Ensuite tout se colle derrière : chant + e, chant + ons, chant + ais.",
      "On enlève le « -er » : il reste « chant ».",
    ),
    tags: ["ce1", "conjugaison", "radical", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_conj_radical_terminaison_fixed_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_radical_terminaison",
    difficulty: 3,
    theme: "neutral",
    text: "Au futur, « je chanterai » : où s'arrête le morceau qui ne bouge pas ?",
    format: "qcm",
    choices: [
      "Après « chanter » : au futur, la terminaison se colle à l'infinitif entier",
      "Après « chant » : c'est toujours le radical",
      "Après « chante »",
      "Après « ch »",
    ],
    expected: ["Après « chanter » : au futur, la terminaison se colle à l'infinitif entier"],
    comparator: "mcq_exact",
    hint: "Écris l'infinitif en entier, puis ajoute. Ne coupe rien.",
    explanation: exp(
      "Au présent et à l'imparfait, la terminaison se colle au radical. Au futur, elle se colle à l'infinitif TOUT ENTIER.",
      "Pour le futur, n'enlève rien : écris l'infinitif, puis ajoute ai, as, a, ons, ez, ont.",
      "chanter + ai = chanterai. On voit encore le « -er » au milieu du mot, et c'est normal.",
      "Le morceau qui ne bouge pas s'arrête après « chanter ».",
    ),
    tags: ["ce1", "conjugaison", "radical", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_conj_radical_terminaison_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_radical_terminaison",
    difficulty: 2,
    theme: "neutral",
    hint: "Le radical, c'est l'infinitif sans son « -er ».",
    tags: ["ce1", "conjugaison", "radical", "template"],
    generate: () => {
      const v = randomChoice(VERBES_ER);
      // Présent et imparfait seulement : au futur, la terminaison se colle à
      // l'infinitif entier, et la question n'aurait plus la même réponse.
      const temps = randomChoice(["present", "imparfait"] as const);
      const p = Math.floor(Math.random() * 6);
      const forme = conjuguerEr(v.inf, temps, p);
      const rad = radical(v.inf);
      return {
        text: `Dans « ${avecPronom(p, forme)} », quel est le RADICAL du verbe ?`,
        format: "qcm" as const,
        choices: makeChoices(rad, [forme, v.inf, terminaisons(temps)[p], rad.slice(0, -1)]),
        expected: [rad],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le radical porte le sens du verbe. C'est le morceau qui ne bouge jamais.",
          "Prends l'infinitif, enlève le « -er », et regarde ce qui reste.",
          `${v.inf} → ${rad}. Dans « ${avecPronom(p, forme)} », c'est bien « ${rad} » qu'on retrouve au début.`,
          `Le radical est « ${rad} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_conj_radical_terminaison_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_radical_terminaison",
    difficulty: 2,
    theme: "neutral",
    hint: "La terminaison, c'est la fin du verbe : le morceau qui change de personne en personne.",
    tags: ["ce1", "conjugaison", "terminaison", "template"],
    generate: () => {
      const v = randomChoice(VERBES_ER);
      const temps = randomChoice(["present", "imparfait"] as const);
      const p = Math.floor(Math.random() * 6);
      const forme = conjuguerEr(v.inf, temps, p);
      const fin = terminaisons(temps)[p];
      const vivier = [...terminaisons("present"), ...terminaisons("imparfait")];
      return {
        text: `Dans « ${avecPronom(p, forme)} », quelle est la TERMINAISON du verbe ?`,
        format: "qcm" as const,
        choices: makeChoices(fin, vivier),
        expected: [fin],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La terminaison est la fin du verbe. C'est elle qui dit la personne et le temps.",
          "Cache le radical avec ton doigt : ce qui dépasse, c'est la terminaison.",
          `${radical(v.inf)} + ${fin} = ${forme}. Change de personne, et seule cette fin-là bougera.`,
          `La terminaison est « ${fin} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_conj_radical_terminaison_tpl_3",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_radical_terminaison",
    difficulty: 2,
    theme: "neutral",
    hint: "Enlève le « -er » et écris ce qui reste.",
    tags: ["ce1", "conjugaison", "radical", "template"],
    generate: () => {
      const v = randomChoice(VERBES_ER);
      const rad = radical(v.inf);
      return {
        text: `Écris le radical du verbe « ${v.inf} ».`,
        format: "short" as const,
        expected: reponsesAcceptees(rad),
        comparator: "exact_text" as const,
        explanation: exp(
          "Le radical d'un verbe du 1ᵉʳ groupe, c'est l'infinitif sans son « -er ».",
          "Barre les deux dernières lettres et recopie le début.",
          `${v.inf} → ${rad}.`,
          `Le radical est « ${rad} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CONJ_PRESENT_ETRE_AVOIR
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_conj_present_etre_avoir_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_present_etre_avoir",
    difficulty: 3,
    theme: "neutral",
    text: "« Tu ___ en retard » et « Tu ___ un vélo ». Quels verbes faut-il ?",
    format: "qcm",
    choices: [
      "Tu ES en retard, tu AS un vélo",
      "Tu AS en retard, tu ES un vélo",
      "Tu ES dans les deux",
      "Tu AS dans les deux",
    ],
    expected: ["Tu ES en retard, tu AS un vélo"],
    comparator: "mcq_exact",
    hint: "L'un dit comment tu es, l'autre dit ce que tu possèdes.",
    explanation: exp(
      "Le verbe être dit comment on est. Le verbe avoir dit ce qu'on possède.",
      "Demande-toi : est-ce que la phrase décrit, ou est-ce qu'elle donne quelque chose ?",
      "« en retard » décrit → être : tu es. « un vélo » se possède → avoir : tu as. Les deux formes se ressemblent, mais elles ne font pas le même travail.",
      "Tu ES en retard, et tu AS un vélo.",
    ),
    tags: ["ce1", "conjugaison", "etre-avoir", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_conj_present_etre_avoir_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_present_etre_avoir",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde qui fait l'action, puis récite le verbe dans ta tête.",
    tags: ["ce1", "conjugaison", "etre-avoir", "template"],
    generate: () => {
      const ph = randomChoice(PHRASES_AUX);
      const table = tableDe(ph.aux);
      const forme = conjuguerTable(table, "present", ph.p);
      return {
        text: `Complète au présent, avec le verbe « ${table.inf} » :\n\n« ${sujetAvecTrou(ph.sujet, forme)} ${ph.suite}. »`,
        format: "qcm" as const,
        choices: makeChoices(forme, table.present),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          `Le verbe ${table.inf} au présent : ${table.present.map((f, i) => avecPronom(i, f)).join(", ")}.`,
          "Repère qui fait l'action, puis descends la liste jusqu'à cette personne-là.",
          `« ${ph.sujet} », c'est « ${PRONOMS[ph.p]} » : le verbe fait « ${forme} ».`,
          `On écrit « ${sujetAvecForme(ph.sujet, forme)} ${ph.suite}. »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_conj_present_etre_avoir_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_present_etre_avoir",
    difficulty: 3,
    theme: "neutral",
    hint: "Est-ce que la phrase DÉCRIT, ou est-ce qu'elle dit ce qu'on possède ?",
    tags: ["ce1", "conjugaison", "etre-avoir", "template"],
    generate: () => {
      const ph = randomChoice(PHRASES_AUX);
      const table = tableDe(ph.aux);
      const forme = conjuguerTable(table, "present", ph.p);
      return {
        text: `Dans cette phrase, le verbe est-il « être » ou « avoir » ?\n\n« ${sujetAvecForme(ph.sujet, forme)} ${ph.suite}. »`,
        format: "qcm" as const,
        choices: ["être", "avoir"],
        expected: [table.inf],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le verbe être dit comment on est ou où on est. Le verbe avoir dit ce qu'on possède ou ce qu'on ressent.",
          "Récite les deux listes : suis, es, est, sommes, êtes, sont — ai, as, a, avons, avez, ont. Cherche dans laquelle se trouve la forme.",
          `« ${forme} » est dans la liste du verbe ${table.inf}.`,
          `Le verbe de cette phrase est « ${table.inf} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_conj_present_etre_avoir_tpl_3",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_present_etre_avoir",
    difficulty: 2,
    theme: "neutral",
    hint: "Récite : je suis, tu es, il est… ou : j'ai, tu as, il a…",
    tags: ["ce1", "conjugaison", "etre-avoir", "template"],
    generate: () => {
      const table = randomChoice([ETRE, AVOIR]);
      const p = Math.floor(Math.random() * 6);
      const forme = conjuguerTable(table, "present", p);
      return {
        text: `Avec « ${PRONOMS[p]} », comment se conjugue le verbe « ${table.inf} » au présent ?`,
        format: "qcm" as const,
        choices: makeChoices(forme, [...table.present, ...table.imparfait]),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          `Le verbe ${table.inf} au présent : ${table.present.map((f, i) => avecPronom(i, f)).join(", ")}.`,
          "Récite la liste depuis le début jusqu'au bon pronom : elle vient toute seule à force.",
          `${avecPronom(p, forme)}.`,
          `Avec « ${PRONOMS[p]} », on écrit « ${forme} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce1_conj_present_etre_avoir_tpl_4",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_present_etre_avoir",
    difficulty: 3,
    theme: "neutral",
    hint: "Le sujet change, donc le verbe change aussi. Le reste de la phrase ne bouge pas.",
    tags: ["ce1", "conjugaison", "etre-avoir", "template"],
    generate: () => {
      // ⚠️ Uniquement des phrases en « avoir » : dans « Léa est contente »,
      // l'attribut s'accorde avec le sujet, et changer de sujet donnerait
      // « ils sont contente ». Après « avoir », rien ne s'accorde.
      const ph = randomChoice(PHRASES_AVOIR);
      const cible = randomChoice([0, 1, 2, 3, 4, 5].filter((p) => p !== ph.p));
      const depart = conjuguerTable(AVOIR, "present", ph.p);
      const arrivee = conjuguerTable(AVOIR, "present", cible);
      const sujetCible = PRONOMS[cible].charAt(0).toUpperCase() + PRONOMS[cible].slice(1);
      const bon = `${sujetAvecForme(sujetCible, arrivee)} ${ph.suite}.`;
      return {
        text: `« ${sujetAvecForme(ph.sujet, depart)} ${ph.suite}. »\n\nÉcris la même phrase avec « ${PRONOMS[cible]} ».`,
        format: "qcm" as const,
        choices: makeChoices(
          bon,
          AVOIR.present.map((f) => `${sujetAvecForme(sujetCible, f)} ${ph.suite}.`),
        ),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le verbe avoir suit son sujet : j'ai, tu as, il a, nous avons, vous avez, ils ont.",
          "Change le sujet, puis descends à la bonne ligne du verbe. Le reste de la phrase ne bouge pas.",
          `${avecPronom(ph.p, depart)} → ${avecPronom(cible, arrivee)}. Seul le verbe a changé.`,
          `On écrit « ${bon} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CONJ_PRESENT_ER
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_conj_present_er_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_present_er",
    difficulty: 3,
    theme: "neutral",
    text: "je chante · tu chantes · il chante — trois personnes. Combien entend-on de sons différents ?",
    format: "qcm",
    choices: [
      "Un seul : les trois se disent pareil, seul le « s » de « tu » s'écrit",
      "Trois, un par personne",
      "Deux : « je » et « il » se ressemblent",
      "Aucun, ce sont trois verbes différents",
    ],
    expected: ["Un seul : les trois se disent pareil, seul le « s » de « tu » s'écrit"],
    comparator: "mcq_exact",
    hint: "Dis les trois à voix haute, l'une après l'autre.",
    explanation: exp(
      "Au présent, les terminaisons -e, -es et -ent ne s'entendent pas. Elles ne font que s'écrire.",
      "Ne compte pas sur ton oreille : regarde le pronom, et écris la terminaison qui va avec.",
      "je chante, tu chantes, il chante, ils chantent : ta bouche dit quatre fois la même chose. C'est le petit mot devant qui prévient.",
      "Un seul son. Seul le « s » de « tu » s'écrit — et il ne s'entend pas.",
    ),
    tags: ["ce1", "conjugaison", "present", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_conj_present_er_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_present_er",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde le sujet, puis colle la terminaison du présent au radical.",
    tags: ["ce1", "conjugaison", "present", "template"],
    generate: () => {
      const ph = randomChoice(PHRASES_ER);
      const forme = conjuguerEr(ph.verbe, "present", ph.p);
      return {
        text: `Complète au présent, avec le verbe « ${ph.verbe} » :\n\n« ${sujetAvecTrou(ph.sujet, forme)} ${ph.suite}. »`,
        format: "qcm" as const,
        choices: makeChoices(forme, formesSimples(ph.verbe)),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Au présent, les verbes en -er prennent : -e, -es, -e, -ons, -ez, -ent.",
          "Trouve d'abord qui fait l'action, puis prends la terminaison de cette personne-là.",
          `« ${ph.sujet} », c'est « ${PRONOMS[ph.p]} » : ${radical(ph.verbe)} + ${terminaisons("present")[ph.p]} = ${forme}.`,
          `On écrit « ${sujetAvecForme(ph.sujet, forme)} ${ph.suite}. »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_conj_present_er_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_present_er",
    difficulty: 2,
    theme: "neutral",
    hint: "-e, -es, -e, -ons, -ez, -ent : la liste du présent.",
    tags: ["ce1", "conjugaison", "present", "template"],
    generate: () => {
      const v = randomChoice(VERBES_ER);
      const p = Math.floor(Math.random() * 6);
      const forme = conjuguerEr(v.inf, "present", p);
      return {
        text: `Conjugue « ${v.inf} » au présent avec « ${PRONOMS[p]} ».`,
        format: "qcm" as const,
        choices: makeChoices(forme, formesSimples(v.inf)),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Au présent, un verbe en -er fait : -e, -es, -e, -ons, -ez, -ent.",
          "Enlève le « -er », garde le radical, ajoute la terminaison du pronom.",
          `${v.inf} → ${radical(v.inf)} + ${terminaisons("present")[p]} = ${avecPronom(p, forme)}.`,
          `On écrit « ${avecPronom(p, forme)} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_conj_present_er_tpl_3",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_present_er",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris seulement le verbe, sans le pronom.",
    tags: ["ce1", "conjugaison", "present", "template"],
    generate: () => {
      const v = randomChoice(VERBES_ER);
      const p = Math.floor(Math.random() * 6);
      const forme = conjuguerEr(v.inf, "present", p);
      return {
        text: `Écris le verbe « ${v.inf} » au présent avec « ${PRONOMS[p]} ».`,
        format: "short" as const,
        expected: reponsesAcceptees(forme),
        comparator: "exact_text" as const,
        explanation: exp(
          "Au présent, un verbe en -er fait : -e, -es, -e, -ons, -ez, -ent.",
          "Radical d'abord, terminaison ensuite. Ne te fie pas à ce que tu entends.",
          `${radical(v.inf)} + ${terminaisons("present")[p]} = ${forme}.`,
          `On écrit « ${avecPronom(p, forme)} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CONJ_IMPARFAIT — nouveau au CE1
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_conj_imparfait_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_imparfait",
    difficulty: 1,
    theme: "neutral",
    text: "Que raconte un verbe à l'imparfait ?",
    format: "qcm",
    choices: [
      "Ce qui durait avant, autrefois",
      "Ce qui se passe maintenant",
      "Ce qui n'est pas encore arrivé",
      "Ce qui ne se passera jamais",
    ],
    expected: ["Ce qui durait avant, autrefois"],
    comparator: "mcq_exact",
    hint: "C'est le temps des histoires qui commencent par « Il était une fois ».",
    explanation: exp(
      "L'imparfait raconte ce qui durait, ce qui revenait souvent, dans un temps passé.",
      "Cherche les mots du début de phrase : autrefois, avant, l'an dernier, tous les soirs.",
      "« Il était une fois » : toutes les histoires commencent à l'imparfait, parce qu'elles plantent un décor qui dure.",
      "L'imparfait raconte ce qui durait avant.",
    ),
    tags: ["ce1", "conjugaison", "imparfait", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_conj_imparfait_fixed_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_imparfait",
    difficulty: 3,
    theme: "neutral",
    text: "« je chantais » et « je chanterai » : lequel raconte AVANT ?",
    format: "qcm",
    choices: [
      "je chantais, avec « -ais » : l'imparfait",
      "je chanterai, avec « -ai » : l'imparfait",
      "Les deux racontent avant",
      "Aucun des deux",
    ],
    expected: ["je chantais, avec « -ais » : l'imparfait"],
    comparator: "mcq_exact",
    hint: "Regarde la toute dernière lettre. Il y en a une de plus dans un des deux.",
    explanation: exp(
      "L'imparfait de « je » finit par « -ais ». Le futur de « je » finit par « -ai ».",
      "Cherche le « s » de la fin : s'il est là, c'est l'imparfait, donc avant.",
      "Autrefois je chantAIS. Demain je chanterAI. Une seule lettre les sépare, et elle ne s'entend presque pas — mais elle change le moment de toute la phrase.",
      "C'est « je chantais », avec « -ais ».",
    ),
    tags: ["ce1", "conjugaison", "imparfait", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_conj_imparfait_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_imparfait",
    difficulty: 2,
    theme: "neutral",
    hint: "-ais, -ais, -ait, -ions, -iez, -aient : toutes les six ont un « i » ou un « a ».",
    tags: ["ce1", "conjugaison", "imparfait", "template"],
    generate: () => {
      const ph = randomChoice(PHRASES_ER);
      const forme = conjuguerEr(ph.verbe, "imparfait", ph.p);
      const repere = randomChoice(REPERES.imparfait);
      const sujet = apresVirgule(ph.sujet);
      return {
        text: `Complète à l'imparfait, avec le verbe « ${ph.verbe} » :\n\n« ${repere}, ${sujetAvecTrou(sujet, forme)} ${ph.suite}. »`,
        format: "qcm" as const,
        choices: makeChoices(forme, formesSimples(ph.verbe)),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "À l'imparfait, les verbes en -er prennent : -ais, -ais, -ait, -ions, -iez, -aient.",
          "Repère le mot du début qui plante le temps, puis prends la terminaison de la bonne personne.",
          `« ${repere} » annonce du passé qui dure. ${radical(ph.verbe)} + ${terminaisons("imparfait")[ph.p]} = ${forme}.`,
          `On écrit « ${repere}, ${sujetAvecForme(sujet, forme)} ${ph.suite}. »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_conj_imparfait_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_imparfait",
    difficulty: 2,
    theme: "neutral",
    hint: "Toutes les terminaisons de l'imparfait contiennent un « i » ou un « ai ».",
    tags: ["ce1", "conjugaison", "imparfait", "template"],
    generate: () => {
      const surAux = Math.random() < 0.3;
      if (surAux) {
        const table = randomChoice([ETRE, AVOIR]);
        const p = Math.floor(Math.random() * 6);
        const forme = conjuguerTable(table, "imparfait", p);
        return {
          text: `Conjugue « ${table.inf} » à l'imparfait avec « ${PRONOMS[p]} ».`,
          format: "qcm" as const,
          choices: makeChoices(forme, toutesLesFormesTable(table).filter((f) => !f.includes(" "))),
          expected: [forme],
          comparator: "mcq_exact" as const,
          explanation: exp(
            `${table.inf} à l'imparfait : ${table.imparfait.map((f, i) => avecPronom(i, f)).join(", ")}.`,
            "Récite la liste : elle se retient comme une comptine.",
            `${avecPronom(p, forme)}.`,
            `Avec « ${PRONOMS[p]} », on écrit « ${forme} ».`,
          ),
        };
      }
      const v = randomChoice(VERBES_ER);
      const p = Math.floor(Math.random() * 6);
      const forme = conjuguerEr(v.inf, "imparfait", p);
      return {
        text: `Conjugue « ${v.inf} » à l'imparfait avec « ${PRONOMS[p]} ».`,
        format: "qcm" as const,
        choices: makeChoices(forme, formesSimples(v.inf)),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "À l'imparfait, un verbe en -er fait : -ais, -ais, -ait, -ions, -iez, -aient.",
          "Enlève le « -er », garde le radical, ajoute la terminaison de l'imparfait.",
          `${radical(v.inf)} + ${terminaisons("imparfait")[p]} = ${avecPronom(p, forme)}.`,
          `On écrit « ${avecPronom(p, forme)} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_conj_imparfait_tpl_3",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_imparfait",
    difficulty: 3,
    theme: "neutral",
    hint: "N'oublie pas le « s » de « -ais » : c'est lui qui dit que c'était avant.",
    tags: ["ce1", "conjugaison", "imparfait", "template"],
    generate: () => {
      const v = randomChoice(VERBES_ER);
      const p = Math.floor(Math.random() * 6);
      const forme = conjuguerEr(v.inf, "imparfait", p);
      return {
        text: `Écris le verbe « ${v.inf} » à l'imparfait avec « ${PRONOMS[p]} ».`,
        format: "short" as const,
        expected: reponsesAcceptees(forme),
        comparator: "exact_text" as const,
        explanation: exp(
          "À l'imparfait, un verbe en -er fait : -ais, -ais, -ait, -ions, -iez, -aient.",
          "Radical, puis terminaison. Relis la fin du mot avant de valider.",
          `${radical(v.inf)} + ${terminaisons("imparfait")[p]} = ${forme}.`,
          `On écrit « ${avecPronom(p, forme)} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CONJ_FUTUR — nouveau au CE1
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_conj_futur_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_futur",
    difficulty: 3,
    theme: "neutral",
    text: "Pour écrire « chanter » au futur avec « nous », que fait-on du « -er » ?",
    format: "qcm",
    choices: [
      "On le garde : chanter + ons = chanterons",
      "On l'enlève : chant + ons = chantons",
      "On le remplace par un « r »",
      "On le double",
    ],
    expected: ["On le garde : chanter + ons = chanterons"],
    comparator: "mcq_exact",
    hint: "Au futur, on n'enlève rien du tout. On ajoute derrière.",
    explanation: exp(
      "Au futur, la terminaison se colle à l'infinitif ENTIER, pas au radical.",
      "Écris l'infinitif en entier, puis ajoute : ai, as, a, ons, ez, ont.",
      "chanter + ons = chanterons. Si on avait enlevé le « -er », on aurait écrit « chantons », qui est le présent : la phrase aurait changé de moment.",
      "On garde le « -er » : chanterons.",
    ),
    tags: ["ce1", "conjugaison", "futur", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_conj_futur_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_futur",
    difficulty: 2,
    theme: "neutral",
    hint: "Écris l'infinitif en entier, puis ajoute la terminaison.",
    tags: ["ce1", "conjugaison", "futur", "template"],
    generate: () => {
      const ph = randomChoice(PHRASES_ER);
      const forme = conjuguerEr(ph.verbe, "futur", ph.p);
      const repere = randomChoice(REPERES.futur);
      const sujet = apresVirgule(ph.sujet);
      return {
        text: `Complète au futur, avec le verbe « ${ph.verbe} » :\n\n« ${repere}, ${sujetAvecTrou(sujet, forme)} ${ph.suite}. »`,
        format: "qcm" as const,
        choices: makeChoices(forme, formesSimples(ph.verbe)),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Au futur, la terminaison se colle à l'infinitif entier : -ai, -as, -a, -ons, -ez, -ont.",
          "N'enlève rien. Écris le verbe en entier, puis ajoute.",
          `« ${repere} » annonce ce qui n'est pas encore arrivé. ${ph.verbe} + ${terminaisons("futur")[ph.p]} = ${forme}.`,
          `On écrit « ${repere}, ${sujetAvecForme(sujet, forme)} ${ph.suite}. »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_conj_futur_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_futur",
    difficulty: 2,
    theme: "neutral",
    hint: "Être et avoir sont irréguliers au futur : je serai, j'aurai.",
    tags: ["ce1", "conjugaison", "futur", "template"],
    generate: () => {
      const surAux = Math.random() < 0.35;
      if (surAux) {
        const table = randomChoice([ETRE, AVOIR]);
        const p = Math.floor(Math.random() * 6);
        const forme = conjuguerTable(table, "futur", p);
        return {
          text: `Conjugue « ${table.inf} » au futur avec « ${PRONOMS[p]} ».`,
          format: "qcm" as const,
          choices: makeChoices(forme, toutesLesFormesTable(table).filter((f) => !f.includes(" "))),
          expected: [forme],
          comparator: "mcq_exact" as const,
          explanation: exp(
            `${table.inf} au futur : ${table.futur.map((f, i) => avecPronom(i, f)).join(", ")}.`,
            "Ces deux verbes-là ne suivent pas la règle : leur futur s'apprend par cœur.",
            `${avecPronom(p, forme)}.`,
            `Avec « ${PRONOMS[p]} », on écrit « ${forme} ».`,
          ),
        };
      }
      const v = randomChoice(VERBES_ER);
      const p = Math.floor(Math.random() * 6);
      const forme = conjuguerEr(v.inf, "futur", p);
      return {
        text: `Conjugue « ${v.inf} » au futur avec « ${PRONOMS[p]} ».`,
        format: "qcm" as const,
        choices: makeChoices(forme, formesSimples(v.inf)),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Au futur, un verbe en -er garde son infinitif entier et ajoute : -ai, -as, -a, -ons, -ez, -ont.",
          "Écris l'infinitif, puis colle la terminaison derrière.",
          `${v.inf} + ${terminaisons("futur")[p]} = ${avecPronom(p, forme)}.`,
          `On écrit « ${avecPronom(p, forme)} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_conj_futur_tpl_3",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_futur",
    difficulty: 3,
    theme: "neutral",
    hint: "L'infinitif tout entier, puis la terminaison. On voit encore le « -er » au milieu.",
    tags: ["ce1", "conjugaison", "futur", "template"],
    generate: () => {
      const v = randomChoice(VERBES_ER);
      const p = Math.floor(Math.random() * 6);
      const forme = conjuguerEr(v.inf, "futur", p);
      return {
        text: `Écris le verbe « ${v.inf} » au futur avec « ${PRONOMS[p]} ».`,
        format: "short" as const,
        expected: reponsesAcceptees(forme),
        comparator: "exact_text" as const,
        explanation: exp(
          "Au futur, la terminaison se colle à l'infinitif entier.",
          "Recopie le verbe en entier, puis ajoute -ai, -as, -a, -ons, -ez ou -ont.",
          `${v.inf} + ${terminaisons("futur")[p]} = ${forme}.`,
          `On écrit « ${avecPronom(p, forme)} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CONJ_PASSE_COMPOSE — le -é qui se dit comme -er
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_conj_passe_compose_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_passe_compose",
    difficulty: 3,
    theme: "neutral",
    text: "« Hier, j'ai chant___ ». Faut-il écrire « chanté » ou « chanter » ?",
    format: "qcm",
    choices: [
      "chanté, avec un « é » : les deux se disent pareil, mais après « ai » on écrit -é",
      "chanter, avec « -er » : c'est le nom du verbe",
      "Les deux se disent, donc les deux s'écrivent",
      "chantez, avec « -ez »",
    ],
    expected: ["chanté, avec un « é » : les deux se disent pareil, mais après « ai » on écrit -é"],
    comparator: "mcq_exact",
    hint: "Remplace par « mordre » : dirais-tu « j'ai mordu » ou « j'ai mordre » ?",
    explanation: exp(
      "Au passé composé, le second morceau est le participe passé. Pour un verbe en -er, il s'écrit avec un « é ».",
      "Remplace le verbe par « mordre » : on entend alors la différence. « J'ai mordu » se dit ; « j'ai mordre » ne se dit pas. Donc il faut le participe : chanté.",
      "j'ai chanté / j'ai chanter : ta bouche dit exactement la même chose. Aucune oreille ne peut trancher — c'est la seule faute du CE1 que l'on ne peut pas entendre.",
      "On écrit « j'ai chanté », avec un « é ».",
    ),
    tags: ["ce1", "conjugaison", "passe-compose", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_conj_passe_compose_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_passe_compose",
    difficulty: 2,
    theme: "neutral",
    hint: "Le passé composé s'écrit en deux morceaux : « avoir » au présent, puis le verbe en -é.",
    tags: ["ce1", "conjugaison", "passe-compose", "template"],
    generate: () => {
      const ph = randomChoice(PHRASES_ER_PC);
      const forme = conjuguerEr(ph.verbe, "passeCompose", ph.p);
      const repere = randomChoice(REPERES.passeCompose);
      const pp = participe(ph.verbe);
      const sujet = apresVirgule(ph.sujet);
      return {
        text: `Complète au passé composé, avec le verbe « ${ph.verbe} » :\n\n« ${repere}, ${sujetAvecTrou(sujet, forme)} ${ph.suite}. »`,
        format: "qcm" as const,
        choices: makeChoices(forme, [
          `${AVOIR.present[ph.p]} ${ph.verbe}`,
          `${AVOIR.imparfait[ph.p]} ${pp}`,
          conjuguerEr(ph.verbe, "present", ph.p),
          conjuguerEr(ph.verbe, "futur", ph.p),
        ]),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le passé composé se fabrique en deux morceaux : le verbe avoir au présent, puis le participe passé en -é.",
          "Écris d'abord « avoir » à la bonne personne, puis le verbe avec un « é » à la fin.",
          `« ${repere} » annonce du fini. ${AVOIR.present[ph.p]} + ${pp} = ${forme}.`,
          `On écrit « ${repere}, ${sujetAvecForme(sujet, forme)} ${ph.suite}. »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_conj_passe_compose_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_passe_compose",
    difficulty: 3,
    theme: "neutral",
    hint: "Garde le sujet, change le verbe : avoir au présent, puis le participe en -é.",
    tags: ["ce1", "conjugaison", "passe-compose", "template"],
    generate: () => {
      const ph = randomChoice(PHRASES_ER_PC);
      const repere = randomChoice(REPERES.passeCompose);
      const sujet = apresVirgule(ph.sujet);
      const present = conjuguerEr(ph.verbe, "present", ph.p);
      const pc = conjuguerEr(ph.verbe, "passeCompose", ph.p);
      const pp = participe(ph.verbe);
      const bon = `${repere}, ${sujetAvecForme(sujet, pc)} ${ph.suite}.`;
      return {
        text: `Mets cette phrase au passé composé, avec « ${repere} » devant :\n\n« ${sujetAvecForme(ph.sujet, present)} ${ph.suite}. »`,
        format: "qcm" as const,
        choices: makeChoices(bon, [
          `${repere}, ${sujetAvecForme(sujet, `${AVOIR.present[ph.p]} ${ph.verbe}`)} ${ph.suite}.`,
          `${repere}, ${sujetAvecForme(sujet, `${AVOIR.imparfait[ph.p]} ${pp}`)} ${ph.suite}.`,
          `${repere}, ${sujetAvecForme(sujet, conjuguerEr(ph.verbe, "imparfait", ph.p))} ${ph.suite}.`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le passé composé se compose de deux mots : avoir au PRÉSENT, puis le participe passé en -é.",
          "Ne touche pas au sujet. Remplace seulement le verbe par ses deux morceaux.",
          `${present} → ${pc}. Le premier morceau (${AVOIR.present[ph.p]}) reste au présent, même si toute la phrase parle du passé.`,
          `On écrit « ${bon} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_conj_passe_compose_tpl_3",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_passe_compose",
    difficulty: 3,
    theme: "neutral",
    hint: "Le participe passé d'un verbe en -er se termine par « é ».",
    // ⚠️ En QCM, jamais en réponse libre : « ramassé » tapé sans accent donne
    // « ramasse », qui est une autre forme du verbe. On accepterait la faute
    // qu'on cherche précisément à corriger.
    tags: ["ce1", "conjugaison", "participe", "template"],
    generate: () => {
      const v = randomChoice(VERBES_ER);
      const pp = participe(v.inf);
      const rad = radical(v.inf);
      return {
        text: `Quel est le participe passé du verbe « ${v.inf} » ? (celui qu'on écrit après « avoir »)`,
        format: "qcm" as const,
        choices: shuffle([pp, v.inf, `${rad}e`, `${rad}ez`]),
        expected: [pp],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le participe passé est le morceau qui suit « avoir » au passé composé. Pour un verbe en -er, il se termine par « é ».",
          "Prends le radical et ajoute « é ». Un seul accent, sur le e final.",
          `${rad} + é = ${pp}. On écrit « j'ai ${pp} ». « ${v.inf} », « ${rad}e » et « ${rad}ez » se disent presque pareil, et aucun ne convient.`,
          `Le participe passé est « ${pp} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce1_conj_passe_compose_tpl_4",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_passe_compose",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace le verbe par « mordre ». Dirais-tu « a mordu » ou « a mordre » ?",
    tags: ["ce1", "conjugaison", "passe-compose", "template"],
    generate: () => {
      const ph = randomChoice(PHRASES_ER_PC);
      const repere = randomChoice(REPERES.passeCompose);
      const sujet = apresVirgule(ph.sujet);
      const rad = radical(ph.verbe);
      const pp = participe(ph.verbe);
      const aux = AVOIR.present[ph.p];
      const debut = `${repere}, ${sujetAvecForme(sujet, aux)} ${rad}`;
      return {
        text: `Le verbe se termine-t-il par « é », « er », « e » ou « ez » ?\n\n« ${debut}___ ${ph.suite}. »`,
        format: "qcm" as const,
        choices: shuffle([pp, ph.verbe, `${rad}e`, `${rad}ez`]),
        expected: [pp],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Après « avoir », on écrit le participe passé. Pour un verbe en -er, il finit par « é ».",
          "Remplace le verbe par « mordre » : « a mordu » se dit, « a mordre » ne se dit pas. Donc il faut le participe.",
          `${aux} ${pp} : les quatre propositions se disent presque pareil, et une seule s'écrit. C'est la faute qu'aucune oreille ne rattrape.`,
          `On écrit « ${debut}${pp.slice(rad.length)} ${ph.suite}. »`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CONJ_PERSONNE — changer qui, et voir bouger la fin
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_conj_personne_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_personne",
    difficulty: 2,
    theme: "neutral",
    text: "Quand on change la personne d'un verbe, quelle partie du mot bouge ?",
    format: "qcm",
    choices: [
      "La fin : la terminaison",
      "Le début : le radical",
      "Tout le mot",
      "Rien ne bouge",
    ],
    expected: ["La fin : la terminaison"],
    comparator: "mcq_exact",
    hint: "Compare : je marche, nous marchons, vous marchez. Qu'est-ce qui reste pareil ?",
    explanation: exp(
      "Le radical porte le sens et ne bouge pas. La terminaison dit la personne et change à chaque ligne.",
      "Écris deux formes l'une sous l'autre et pose ton doigt là où elles se séparent.",
      "je marche, nous marchons, vous marchez : « march » ne bouge pas d'un poil. C'est la fin qui travaille.",
      "C'est la fin du verbe, la terminaison, qui bouge.",
    ),
    tags: ["ce1", "conjugaison", "personne", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_conj_personne_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_personne",
    difficulty: 2,
    theme: "neutral",
    hint: "Le temps ne change pas. Seule la personne change, donc seule la fin bouge.",
    tags: ["ce1", "conjugaison", "personne", "template"],
    generate: () => {
      const v = randomChoice(VERBES_ER_AVOIR);
      const temps = randomChoice(TOUS_TEMPS);
      const depart = Math.floor(Math.random() * 6);
      const arrivee = randomChoice([0, 1, 2, 3, 4, 5].filter((p) => p !== depart));
      const formeDepart = conjuguerEr(v.inf, temps, depart);
      const formeArrivee = conjuguerEr(v.inf, temps, arrivee);
      const vivier =
        temps === "passeCompose"
          ? [0, 1, 2, 3, 4, 5].map((p) => conjuguerEr(v.inf, "passeCompose", p))
          : formesSimples(v.inf);
      return {
        text: `« ${avecPronom(depart, formeDepart)} » — écris la même chose avec « ${PRONOMS[arrivee]} ».`,
        format: "qcm" as const,
        choices: makeChoices(formeArrivee, vivier),
        expected: [formeArrivee],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Changer de personne ne change pas le temps : on garde le même temps et on change seulement la terminaison.",
          "Repère le temps, garde-le, puis descends à la bonne ligne du tableau.",
          `${avecPronom(depart, formeDepart)} → ${avecPronom(arrivee, formeArrivee)}. On est resté ${TEMPS_PHRASE[temps]}.`,
          `Avec « ${PRONOMS[arrivee]} », on écrit « ${formeArrivee} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_conj_personne_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_personne",
    difficulty: 3,
    theme: "neutral",
    hint: "La terminaison trahit la personne : -ons va avec nous, -ez avec vous, -nt avec ils.",
    tags: ["ce1", "conjugaison", "personne", "template"],
    generate: () => {
      const v = randomChoice(VERBES_ER);
      // ⚠️ « chantais » va avec « je » ET « tu » : demander la personne d'une
      // forme jumelle aurait deux bonnes réponses. On ne garde que les formes
      // qui n'appartiennent qu'à une seule ligne du tableau.
      const temps = randomChoice(["present", "imparfait", "futur"] as const);
      const table = [0, 1, 2, 3, 4, 5].map((p) => conjuguerEr(v.inf, temps, p));
      const uniques = personnesSansJumelle(table);
      const p = randomChoice(uniques);
      return {
        text: `« ${table[p]} » : avec quel pronom ce verbe se conjugue-t-il ?`,
        format: "qcm" as const,
        choices: makeChoices(PRONOMS[p], PRONOMS),
        expected: [PRONOMS[p]],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chaque terminaison appartient à une personne : -ons à nous, -ez à vous, -nt à ils.",
          "Regarde la fin du mot et cherche à quelle ligne du tableau elle appartient.",
          `${avecPronom(p, table[p])} — la terminaison « ${terminaisons(temps)[p]} » ne va avec personne d'autre.`,
          `C'est « ${PRONOMS[p]} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CONJ_RETROUVER_INFINITIF — l'exemple du BO
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_conj_retrouver_infinitif_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_retrouver_infinitif",
    difficulty: 2,
    theme: "neutral",
    text: "« ils plieront » et « tu as plié » : de quel verbe viennent ces deux formes ?",
    format: "qcm",
    choices: ["plier", "plire", "plieront", "pliage"],
    expected: ["plier"],
    comparator: "mcq_exact",
    hint: "Dis « je suis en train de… » : que dis-tu ensuite ?",
    explanation: exp(
      "Deux formes très différentes peuvent venir du même verbe : c'est l'infinitif qui les relie.",
      "Enlève ce qui a été ajouté à la fin et dis « je suis en train de… » pour vérifier.",
      "ils plieront : le futur, avec l'infinitif entier dedans. tu as plié : le passé composé, avec le participe en -é. Les deux viennent de « plier ». « pliage » est un nom, pas un verbe.",
      "Les deux viennent du verbe « plier ».",
    ),
    tags: ["ce1", "conjugaison", "infinitif", "remarquable", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_conj_retrouver_infinitif_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_retrouver_infinitif",
    difficulty: 2,
    theme: "neutral",
    hint: "Dis « je suis en train de… » : le mot qui suit est l'infinitif.",
    tags: ["ce1", "conjugaison", "infinitif", "template"],
    generate: () => {
      const v = randomChoice(VERBES_ER);
      const temps = randomChoice(TOUS_TEMPS);
      // ⛔ « il est tombé » : le passé composé de ces verbes-là demande « être »,
      // que le CE1 ne fait pas. On les laisse au présent.
      const t: Temps = temps === "passeCompose" && v.auxEtre ? "present" : temps;
      const p = Math.floor(Math.random() * 6);
      const forme = conjuguerEr(v.inf, t, p);
      const autres = shuffle(VERBES_ER.filter((x) => x.inf !== v.inf))
        .slice(0, 3)
        .map((x) => x.inf);
      return {
        text: `Quel est l'infinitif du verbe dans « ${avecPronom(p, forme)} » ?`,
        format: "qcm" as const,
        choices: makeChoices(v.inf, autres),
        expected: [v.inf],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'infinitif est le nom du verbe : celui qu'on trouve dans le dictionnaire.",
          "Enlève la terminaison, garde le radical, et remets « -er » à la fin.",
          `${forme} → ${radical(v.inf)} → ${v.inf}. « Je suis en train de ${v.inf} » se dit : c'est bien lui.`,
          `L'infinitif est « ${v.inf} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_conj_retrouver_infinitif_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_retrouver_infinitif",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris le nom du verbe, celui du dictionnaire : il finit par « -er ».",
    tags: ["ce1", "conjugaison", "infinitif", "template"],
    generate: () => {
      // Les -ier viennent ici, et ici seulement : le BO donne « ils plieront,
      // tu as plié → plier », et leur imparfait à deux i ne se montre pas.
      const inf = randomChoice([...VERBES_ER.map((v) => v.inf), ...PLIER_ET_CIE]);
      const t = randomChoice(["present", "futur"] as const);
      const p = Math.floor(Math.random() * 6);
      const forme = conjuguerEr(inf, t, p);
      return {
        text: `Écris l'infinitif du verbe conjugué « ${avecPronom(p, forme)} ».`,
        format: "short" as const,
        expected: reponsesAcceptees(inf),
        comparator: "exact_text" as const,
        explanation: exp(
          "Retrouver l'infinitif, c'est retrouver le nom du verbe, celui qui ne change jamais.",
          "Enlève la terminaison, garde le radical, ajoute « -er ». Puis vérifie avec « je suis en train de… ».",
          `${forme} → ${inf}.`,
          `L'infinitif est « ${inf} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CONJ_DEFI — le temps ET la forme, d'un coup
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_conj_defi_meth_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_defi",
    difficulty: 3,
    theme: "neutral",
    text: "« Demain, nous chanterons dans la cour. »\n\nComment sais-tu qu'il faut écrire le verbe au futur ?",
    format: "qcm",
    choices: [
      "Le mot « Demain » prévient : ce n'est pas encore arrivé.",
      // L'erreur réelle : « -ons » dit QUI, pas QUAND.
      "Parce que le verbe se termine par « -ons ».",
      "Parce qu'il y a une virgule après le premier mot.",
      "Parce que la phrase parle de la cour.",
    ],
    expected: ["Le mot « Demain » prévient : ce n'est pas encore arrivé."],
    comparator: "mcq_exact",
    hint: "Regarde le tout premier mot de la phrase.",
    explanation: exp(
      "Un petit mot au début de la phrase plante le moment, et le verbe n'a plus qu'à suivre.",
      "Lis le premier mot et demande-toi : avant, maintenant, ou pas encore ?",
      "« Demain » : ce n'est pas encore arrivé. Donc le verbe se met au futur, et il fait « chanterons ».",
      "C'est le mot « demain » qui prévient : la phrase parle de ce qui n'est pas encore arrivé.",
    ),
    tags: ["ce1", "conjugaison", "defi", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_conj_defi_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux choses à trouver : d'abord le temps, à cause du mot du début. Ensuite la forme.",
    tags: ["ce1", "conjugaison", "defi", "template"],
    generate: () => {
      const ph = randomChoice(PHRASES_ER_PC);
      const r = randomChoice(REPERES_DEFI);
      const temps = r.temps;
      const sujet = apresVirgule(ph.sujet);
      const reponse = (t: Temps, p: number) =>
        `${TEMPS_NOM[t]}, « ${conjuguerEr(ph.verbe, t, p)} »`;
      const mauvaisePersonne = autrePersonne(ph.verbe, temps, ph.p);
      return {
        text: `« ${r.mot}, ${sujetAvecTrou(sujet, conjuguerEr(ph.verbe, temps, ph.p))} ${ph.suite}. » (verbe « ${ph.verbe} »)\n\nÀ quel temps faut-il écrire le verbe, et quelle forme prend-il ?`,
        format: "qcm" as const,
        choices: shuffle([
          reponse(temps, ph.p),
          ...contreTemps(temps).map((t) => reponse(t, ph.p)),
          reponse(temps, mauvaisePersonne),
        ]),
        expected: [reponse(temps, ph.p)],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le mot du début plante le temps de toute la phrase. Ensuite, c'est le sujet qui décide de la fin du verbe.",
          "Deux vérifications, dans cet ordre : le mot du début pour le temps, le sujet pour la terminaison.",
          `« ${r.mot} » annonce ${TEMPS_SENS[temps]} : c'est donc ${TEMPS_NOM[temps]}. Puis « ${ph.sujet} », c'est « ${PRONOMS[ph.p]} » : le verbe fait « ${conjuguerEr(ph.verbe, temps, ph.p)} », et pas « ${conjuguerEr(ph.verbe, temps, mauvaisePersonne)} ».`,
          `C'est ${reponse(temps, ph.p)}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_conj_defi_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce1_conj_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Une seule phrase met d'accord le mot du début et la fin du verbe.",
    tags: ["ce1", "conjugaison", "defi", "template"],
    generate: () => {
      const ph = randomChoice(PHRASES_ER_PC);
      const r = randomChoice(REPERES_DEFI);
      const temps = r.temps;
      const sujet = apresVirgule(ph.sujet);
      const phrase = (t: Temps, p: number) => {
        const f = conjuguerEr(ph.verbe, t, p);
        return `${r.mot}, ${sujetAvecForme(sujet, f)} ${ph.suite}.`;
      };
      const mauvaisePersonne = autrePersonne(ph.verbe, temps, ph.p);
      return {
        text: `« ${r.mot}, ${sujet} … ${ph.suite}. » — verbe « ${ph.verbe} ».\n\nUne seule de ces quatre phrases est correcte. Laquelle ?`,
        format: "qcm" as const,
        choices: shuffle([
          phrase(temps, ph.p),
          ...contreTemps(temps).map((t) => phrase(t, ph.p)),
          phrase(temps, mauvaisePersonne),
        ]),
        expected: [phrase(temps, ph.p)],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le mot qui ouvre la phrase et la terminaison du verbe doivent raconter le même moment — et la terminaison doit aussi aller avec le sujet.",
          "Lis le mot du début pour le temps, puis remonte au sujet pour la terminaison.",
          `« ${r.mot} » annonce ${TEMPS_SENS[temps]}. Deux phrases mettent le verbe à un autre temps ; une troisième est au bon temps mais avec la mauvaise personne — « ${conjuguerEr(ph.verbe, temps, mauvaisePersonne)} » ne va pas avec « ${ph.sujet} ».`,
          `La bonne phrase est « ${phrase(temps, ph.p)} »`,
        ),
      };
    },
  },
];
