// lib/tutor-v4/questionBank/ce1/francais/grammaire-phrase.bank.ts
//
// La grammaire de la phrase au CE1, écrite à la main. Dix micro-compétences.
//
// CE QU'ELLE REMPLACE : trois énoncés pour dix micro-compétences — « Laquelle
// de ces suites de mots est une vraie phrase ? » et « Dans la phrase X, quel
// est le verbe ? », avec trois phrases en tout. Les TROIS TRANSFORMATIONS que
// le BO ajoute au CE1 — substitution, déplacement, suppression — ne recevaient
// rien du tout.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours élémentaire première année) :
//   — « Identifier et NOMMER le groupe sujet, le verbe, les compléments, sans
//     distinguer ces derniers entre eux » ;
//   — « Reconnaitre les trois types de phrases : déclarative, interrogative,
//     impérative » ;
//   — « Reconnaitre les formes négative et exclamative, et savoir effectuer
//     les transformations » ;
//   — « Effectuer des manipulations : substitution, déplacement, suppression ».
//
// ⛔ Ce qui n'est PAS au CE1, et le BO l'écrit lui-même : on ne distingue PAS
// les compléments entre eux. Ni COD, ni COI, ni attribut, ni complément
// circonstanciel — ces mots-là sont du cycle 3. Ici on dit « un complément »,
// et on le manipule : on le déplace, on le supprime, on le remplace.
// ⛔ Pas d'adverbe ni de discours rapporté : ils arrivent au CE2.
//
// LE PIÈGE DE LA NOTION : on croit qu'un groupe se déplace ou se supprime
// parce qu'il est à la fin. C'est faux — « Léa ramasse des mangues » ne peut
// pas devenir « Des mangues, Léa ramasse ». Ce qui décide, c'est le rôle du
// groupe dans la phrase, pas sa place. C'est justement pour ça que le BO
// demande de MANIPULER : c'est en essayant qu'on voit lequel bouge.
//
// ⚠️ AUCUNE PHRASE N'EST FABRIQUÉE. Chaque phrase est écrite avec ses groupes
// séparés, et l'on sait pour chacun s'il se déplace et s'il se supprime. Coller
// un sujet, un verbe et un complément pris dans trois listes donnerait des
// phrases qui ne se disent pas, proposées comme la bonne réponse.

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

/** Les prénoms gardent leur majuscule au milieu d'une phrase. */
const NOMS_PROPRES: ReadonlySet<string> = new Set(["Léa", "Tom", "Papa", "Mamie"]);

function apresVirgule(groupe: string): string {
  if (NOMS_PROPRES.has(groupe)) return groupe;
  return groupe.charAt(0).toLowerCase() + groupe.slice(1);
}

function majuscule(groupe: string): string {
  return groupe.charAt(0).toUpperCase() + groupe.slice(1);
}

/* ── Les phrases analysées ───────────────────────────────────────────────────
   Trois morceaux écrits séparément :
     — le groupe sujet, avec le pronom qui peut le remplacer ;
     — le verbe ;
     — un complément qui NE bouge PAS (« des mangues » : la phrase en a
       besoin), et un complément qui bouge et qu'on peut enlever.
   ⚠️ `autreSujet` est toujours de la même personne que `sujet` : remplacer
   « Léa » par « les enfants » demanderait de changer le verbe aussi, et la
   substitution n'est pas ça. */

type PhraseGram = {
  readonly sujet: string;
  readonly pronom: string;
  readonly autreSujet: string;
  readonly verbe: string;
  /** Le complément dont la phrase a besoin. */
  readonly tenu: string;
  /** Celui qui se déplace en tête et qu'on peut enlever. */
  readonly libre: string;
};

const PHRASES: readonly PhraseGram[] = [
  { sujet: "Léa", pronom: "elle", autreSujet: "Ma sœur", verbe: "ramasse", tenu: "des mangues", libre: "chaque matin" },
  { sujet: "Le margouillat", pronom: "il", autreSujet: "Le lézard", verbe: "attrape", tenu: "un moustique", libre: "sous la varangue" },
  { sujet: "Papa", pronom: "il", autreSujet: "Mon oncle", verbe: "prépare", tenu: "un cari", libre: "le dimanche" },
  // ⚠️ Le complément « tenu » ne commence jamais par une préposition de lieu :
  // « À la marelle, les enfants jouent » se dirait presque, et le gabarit du
  // déplacement l'annonce comme impossible. Un ballon, lui, ne se déplace pas.
  { sujet: "Les enfants", pronom: "ils", autreSujet: "Les cousins", verbe: "poussent", tenu: "un ballon", libre: "dans la cour" },
  { sujet: "Le pêcheur", pronom: "il", autreSujet: "Mon voisin", verbe: "répare", tenu: "ses filets", libre: "près du bateau" },
  { sujet: "Mamie", pronom: "elle", autreSujet: "La maitresse", verbe: "raconte", tenu: "une histoire", libre: "le soir" },
  { sujet: "Tom", pronom: "il", autreSujet: "Mon frère", verbe: "range", tenu: "son cartable", libre: "après l'école" },
  { sujet: "La maitresse", pronom: "elle", autreSujet: "Notre maitre", verbe: "écrit", tenu: "la date", libre: "au tableau" },
  { sujet: "Les cousins", pronom: "ils", autreSujet: "Les élèves", verbe: "mangent", tenu: "des letchis", libre: "sous le manguier" },
  { sujet: "Ma sœur", pronom: "elle", autreSujet: "Léa", verbe: "dessine", tenu: "un margouillat", libre: "sur son cahier" },
  { sujet: "Le vent", pronom: "il", autreSujet: "L'orage", verbe: "secoue", tenu: "les branches", libre: "depuis ce matin" },
  { sujet: "Le maitre", pronom: "il", autreSujet: "Le directeur", verbe: "montre", tenu: "l'île", libre: "sur la carte" },
  { sujet: "Les élèves", pronom: "ils", autreSujet: "Les enfants", verbe: "récitent", tenu: "une poésie", libre: "le vendredi" },
  { sujet: "Le chien", pronom: "il", autreSujet: "Le chat", verbe: "attend", tenu: "son maitre", libre: "devant la porte" },
  { sujet: "Mon frère", pronom: "il", autreSujet: "Tom", verbe: "cherche", tenu: "ses chaussures", libre: "dans la case" },
  { sujet: "La voisine", pronom: "elle", autreSujet: "Mamie", verbe: "arrose", tenu: "ses fleurs", libre: "avant midi" },
  { sujet: "Les pêcheurs", pronom: "ils", autreSujet: "Les marins", verbe: "poussent", tenu: "la pirogue", libre: "sur le sable" },
  { sujet: "La tortue", pronom: "elle", autreSujet: "La sardine", verbe: "quitte", tenu: "la plage", libre: "à la nuit tombée" },
  { sujet: "Le boulanger", pronom: "il", autreSujet: "Le marchand", verbe: "sort", tenu: "les pains", libre: "très tôt" },
  { sujet: "Les oiseaux", pronom: "ils", autreSujet: "Les margouillats", verbe: "réveillent", tenu: "toute la case", libre: "au lever du jour" },
];

const complete = (p: PhraseGram) => `${p.sujet} ${p.verbe} ${p.tenu} ${p.libre}.`;
const sansLibre = (p: PhraseGram) => `${p.sujet} ${p.verbe} ${p.tenu}.`;
const libreEnTete = (p: PhraseGram) =>
  `${majuscule(p.libre)}, ${apresVirgule(p.sujet)} ${p.verbe} ${p.tenu}.`;

/* ── Les types de phrases ────────────────────────────────────────────────── */

const INTERROGATIVES: readonly string[] = [
  "Où est mon cahier ?",
  "Qui a pris la gomme ?",
  "Est-ce que tu viens avec nous ?",
  "Quand part le bateau ?",
  "Comment s'appelle ton chien ?",
  "Pourquoi le margouillat se cache-t-il ?",
  "Combien de letchis as-tu ramassés ?",
  "Que fais-tu ce matin ?",
  "Est-ce que le cari est prêt ?",
  "Où vont les pirogues ?",
  "Qui veut réciter la poésie ?",
  "Quel jour sommes-nous ?",
];

const IMPERATIVES: readonly string[] = [
  "Ferme la porte.",
  "Range tes affaires.",
  "Viens sous la varangue.",
  "Écoute bien la consigne.",
  "Regarde le tableau.",
  "Ouvre ton cahier.",
  "Prends ton crayon.",
  "Lève la main pour parler.",
  "Ramasse les letchis tombés.",
  "Attends-moi devant l'école.",
];

const EXCLAMATIVES: readonly string[] = [
  "Quel beau lagon !",
  "Comme c'est joli !",
  "Quelle chaleur aujourd'hui !",
  "Que ce cari est bon !",
  "Comme le piton est haut !",
  "Quel grand margouillat !",
  "Comme il pleut fort !",
  "Quelle bonne idée !",
];

/** Une phrase qui raconte, et la même transformée. Écrites par paires : la
 *  transformation exclamative n'est pas mécanique — « Ce lagon est beau »
 *  donne « Comme ce lagon est beau ! », pas « Ce lagon est beau ! ». */
type PaireForme = { readonly declarative: string; readonly transformee: string };

const EXCLAMATIONS: readonly PaireForme[] = [
  { declarative: "Ce lagon est beau.", transformee: "Comme ce lagon est beau !" },
  { declarative: "Ce cari est bon.", transformee: "Que ce cari est bon !" },
  { declarative: "Le piton est haut.", transformee: "Comme le piton est haut !" },
  { declarative: "Il fait chaud.", transformee: "Qu'il fait chaud !" },
  { declarative: "Tu as de la chance.", transformee: "Quelle chance tu as !" },
  { declarative: "Ce margouillat est rapide.", transformee: "Comme ce margouillat est rapide !" },
  { declarative: "La mer est calme.", transformee: "Comme la mer est calme !" },
  { declarative: "Ces letchis sont sucrés.", transformee: "Comme ces letchis sont sucrés !" },
];

const NEGATIVES: readonly PaireForme[] = [
  { declarative: "Le chat dort.", transformee: "Le chat ne dort pas." },
  { declarative: "Il pleut.", transformee: "Il ne pleut pas." },
  { declarative: "Tom joue dehors.", transformee: "Tom ne joue pas dehors." },
  { declarative: "Le bateau part.", transformee: "Le bateau ne part pas." },
  { declarative: "Papa dort.", transformee: "Papa ne dort pas." },
  { declarative: "Le vent souffle.", transformee: "Le vent ne souffle pas." },
  { declarative: "Elle chante.", transformee: "Elle ne chante pas." },
  { declarative: "Les letchis sont mûrs.", transformee: "Les letchis ne sont pas mûrs." },
  { declarative: "Le chien aboie.", transformee: "Le chien n'aboie pas." },
  { declarative: "Tom a peur.", transformee: "Tom n'a pas peur." },
  { declarative: "Léa arrive.", transformee: "Léa n'arrive pas." },
  { declarative: "Les élèves écoutent.", transformee: "Les élèves n'écoutent pas." },
  { declarative: "La maitresse est fâchée.", transformee: "La maitresse n'est pas fâchée." },
  { declarative: "Nous partons demain.", transformee: "Nous ne partons pas demain." },
];

export const grammairePhraseBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_GRAM_PHRASE_TYPES
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_gram_phrase_types_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_phrase_types",
    difficulty: 3,
    theme: "neutral",
    text: "Tom écrit : « Où est mon cahier. » Qu'a-t-il oublié ?",
    format: "qcm",
    choices: [
      "Le point d'interrogation : sa phrase pose une question",
      "La majuscule",
      "Un verbe",
      "Rien, la phrase est correcte",
    ],
    expected: ["Le point d'interrogation : sa phrase pose une question"],
    comparator: "mcq_exact",
    hint: "Lis la phrase à voix haute : ta voix monte-t-elle à la fin ?",
    explanation: exp(
      "Une phrase interrogative pose une question et se termine par un point d'interrogation.",
      "Lis la phrase à voix haute : si ta voix monte à la fin, il faut un « ? ».",
      "« Où est mon cahier ? » attend une réponse. Avec un simple point, on croirait que Tom raconte quelque chose.",
      "Il a oublié le point d'interrogation.",
    ),
    tags: ["ce1", "grammaire", "types-phrases", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_gram_phrase_types_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_phrase_types",
    difficulty: 2,
    theme: "neutral",
    hint: "Trois questions : est-ce qu'elle raconte, est-ce qu'elle demande, ou est-ce qu'elle commande ?",
    tags: ["ce1", "grammaire", "types-phrases", "template"],
    generate: () => {
      const type = randomChoice(["declarative", "interrogative", "imperative"] as const);
      const phrase =
        type === "declarative"
          ? complete(randomChoice(PHRASES))
          : type === "interrogative"
            ? randomChoice(INTERROGATIVES)
            : randomChoice(IMPERATIVES);
      const bon =
        type === "declarative"
          ? "une phrase déclarative : elle raconte"
          : type === "interrogative"
            ? "une phrase interrogative : elle pose une question"
            : "une phrase impérative : elle donne un ordre";
      return {
        text: `Quel type de phrase est-ce ?\n\n« ${phrase} »`,
        format: "qcm" as const,
        choices: shuffle([
          "une phrase déclarative : elle raconte",
          "une phrase interrogative : elle pose une question",
          "une phrase impérative : elle donne un ordre",
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase peut raconter (déclarative), demander (interrogative) ou commander (impérative).",
          "Regarde le signe de la fin, puis demande-toi ce que la phrase attend de toi.",
          type === "interrogative"
            ? `« ${phrase} » finit par un point d'interrogation : elle attend une réponse.`
            : type === "imperative"
              ? `« ${phrase} » te demande de faire quelque chose : personne n'est nommé devant le verbe, et c'est le signe d'un ordre.`
              : `« ${phrase} » te dit simplement ce qui se passe.`,
          `C'est ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_gram_phrase_types_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_phrase_types",
    difficulty: 3,
    theme: "neutral",
    hint: "Une phrase impérative n'a personne devant son verbe : elle s'adresse à toi.",
    tags: ["ce1", "grammaire", "types-phrases", "template"],
    generate: () => {
      const ordre = randomChoice(IMPERATIVES);
      const bon = "Personne n'est nommé devant le verbe : c'est à toi qu'elle parle";
      return {
        text: `« ${ordre} »\n\nCette phrase donne un ordre. À quoi le voit-on ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          "Elle finit par un point d'exclamation",
          "Elle commence par une majuscule",
          "Elle est plus courte que les autres",
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase impérative donne un ordre ou un conseil. Son verbe n'a pas de sujet écrit devant lui.",
          "Cherche qui fait l'action : si personne n'est nommé, c'est qu'on s'adresse directement à toi.",
          `« ${ordre} » commence par le verbe. Dans « Léa ferme la porte. », on sait qui ferme ; ici, c'est toi.`,
          bon,
        ),
      };
    },
  },

  /* =========================================================
     CE1_GRAM_FORME_NEGATIVE — reconnaitre ET transformer
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_gram_forme_negative_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_forme_negative",
    difficulty: 3,
    theme: "neutral",
    text: "Léa écrit : « Le chat ne dort. » Qu'est-ce qui manque ?",
    format: "qcm",
    choices: [
      "Le mot « pas » : la négation se fait à deux",
      "Le point à la fin",
      "La majuscule",
      "Rien, c'est correct",
    ],
    expected: ["Le mot « pas » : la négation se fait à deux"],
    comparator: "mcq_exact",
    hint: "La négation, ce sont deux petits mots qui encadrent le verbe.",
    explanation: exp(
      "Pour dire le contraire, on encadre le verbe avec DEUX petits mots : ne… pas.",
      "Vérifie que les deux morceaux sont là, un de chaque côté du verbe.",
      "Le chat NE dort PAS. À l'oral on avale souvent le « ne » — mais à l'écrit, il en faut deux.",
      "Il manque le mot « pas ».",
    ),
    tags: ["ce1", "grammaire", "negation", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_gram_forme_negative_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_forme_negative",
    difficulty: 2,
    theme: "neutral",
    hint: "Mets « ne » devant le verbe et « pas » derrière.",
    tags: ["ce1", "grammaire", "negation", "template"],
    generate: () => {
      const n = randomChoice(NEGATIVES);
      const sansNe = n.transformee.replace("ne ", "").replace("n'", "");
      const sansPas = n.transformee.replace(" pas", "");
      return {
        text: `Mets cette phrase à la forme négative :\n\n« ${n.declarative} »`,
        format: "qcm" as const,
        choices: shuffle([n.transformee, sansNe, sansPas, n.declarative]),
        expected: [n.transformee],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La négation se fait à deux : « ne » devant le verbe, « pas » derrière.",
          "Repère le verbe, puis pose un morceau de chaque côté.",
          `« ${n.transformee} ». Avec un seul des deux morceaux, la phrase boite.`,
          `La forme négative est « ${n.transformee} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_gram_forme_negative_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_forme_negative",
    difficulty: 3,
    theme: "neutral",
    hint: "Enlève les deux petits mots qui encadrent le verbe.",
    tags: ["ce1", "grammaire", "negation", "template"],
    generate: () => {
      const n = randomChoice(NEGATIVES);
      const autres = shuffle(NEGATIVES.filter((x) => x.declarative !== n.declarative))
        .slice(0, 3)
        .map((x) => x.declarative);
      return {
        text: `Cette phrase dit NON. Écris-la pour qu'elle dise OUI :\n\n« ${n.transformee} »`,
        format: "qcm" as const,
        choices: makeChoices(n.declarative, autres),
        expected: [n.declarative],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Pour repasser à la forme affirmative, on retire les DEUX morceaux de la négation.",
          "Barre « ne » et « pas », puis relis : la phrase doit se dire toute seule.",
          `« ${n.transformee} » → « ${n.declarative} ». Les deux petits mots sont partis ensemble.`,
          `La phrase devient « ${n.declarative} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_GRAM_FORME_EXCLAMATIVE
  ========================================================= */
  {
    kind: "template",
    id: "ce1_gram_forme_exclamative_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_forme_exclamative",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le point qui a un trait dressé au-dessus.",
    tags: ["ce1", "grammaire", "exclamation", "template"],
    generate: () => {
      const exclamative = Math.random() < 0.5;
      const phrase = exclamative
        ? randomChoice(EXCLAMATIVES)
        : sansLibre(randomChoice(PHRASES));
      return {
        text: `« ${phrase} »\n\nCette phrase est-elle à la forme exclamative ?`,
        format: "qcm" as const,
        choices: ["oui", "non"],
        expected: [exclamative ? "oui" : "non"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La forme exclamative dit une émotion forte : surprise, admiration, joie, colère. Elle se termine par un point d'exclamation.",
          "Regarde le signe de la fin, puis lis à voix haute : est-ce que la voix se soulève ?",
          exclamative
            ? `« ${phrase} » finit par « ! » et se lit avec la voix qui monte : c'est bien une exclamation.`
            : `« ${phrase} » finit par un point et raconte calmement : elle n'exprime aucune émotion forte.`,
          exclamative ? "Oui, elle est exclamative." : "Non, elle raconte simplement.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_gram_forme_exclamative_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_forme_exclamative",
    difficulty: 3,
    theme: "neutral",
    hint: "Un mot s'ajoute au début, et le point devient un point d'exclamation.",
    tags: ["ce1", "grammaire", "exclamation", "template"],
    generate: () => {
      const e = randomChoice(EXCLAMATIONS);
      const autres = shuffle(EXCLAMATIONS.filter((x) => x.declarative !== e.declarative))
        .slice(0, 2)
        .map((x) => x.transformee);
      // ⚠️ Le simple point d'exclamation collé à la phrase est le piège :
      // « Ce lagon est beau ! » se dit, mais ce n'est pas la transformation
      // demandée par le BO, qui attend « Comme… ! » ou « Que… ! ».
      const naif = e.declarative.replace(".", " !");
      return {
        text: `Transforme cette phrase en exclamation, avec « Comme » ou « Que » :\n\n« ${e.declarative} »`,
        format: "qcm" as const,
        choices: makeChoices(e.transformee, [naif, ...autres]),
        expected: [e.transformee],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La forme exclamative ajoute un mot au début — « Comme », « Que », « Quel » — et remplace le point par un « ! ».",
          "Pose le mot d'exclamation devant, garde le reste, puis change le point.",
          `« ${e.declarative} » → « ${e.transformee} ». Ajouter seulement le « ! » ne suffit pas : c'est le mot du début qui fait l'exclamation.`,
          `On écrit « ${e.transformee} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_GRAM_GROUPE_SUJET — le NOMMER, c'est nouveau au CE1
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_gram_groupe_sujet_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_groupe_sujet",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle question pose-t-on pour trouver le groupe sujet d'une phrase ?",
    format: "qcm",
    choices: [
      "« Qui est-ce qui… ? » devant le verbe",
      "« Quand… ? » devant le verbe",
      "« Où… ? » devant le verbe",
      "« Comment… ? » devant le verbe",
    ],
    expected: ["« Qui est-ce qui… ? » devant le verbe"],
    comparator: "mcq_exact",
    hint: "On cherche celui qui fait l'action.",
    explanation: exp(
      "Le groupe sujet est le groupe de mots qui dit QUI fait l'action.",
      "Trouve d'abord le verbe, puis pose « Qui est-ce qui… ? » juste devant. La réponse est le groupe sujet.",
      "« Le margouillat attrape un moustique. » Qui est-ce qui attrape ? Le margouillat. On peut aussi l'encadrer : « C'est LE MARGOUILLAT qui attrape ».",
      "On pose « Qui est-ce qui… ? » devant le verbe.",
    ),
    tags: ["ce1", "grammaire", "groupe-sujet", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_gram_groupe_sujet_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_groupe_sujet",
    difficulty: 2,
    theme: "neutral",
    hint: "Pose « Qui est-ce qui… ? » devant le verbe.",
    tags: ["ce1", "grammaire", "groupe-sujet", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      return {
        text: `« ${complete(p)} »\n\nQuel est le groupe sujet de cette phrase ?`,
        format: "qcm" as const,
        choices: makeChoices(p.sujet, [p.verbe, p.tenu, p.libre]),
        expected: [p.sujet],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le groupe sujet dit qui fait l'action. C'est lui qui commande le verbe.",
          "Trouve d'abord le verbe, puis pose « Qui est-ce qui… ? » juste devant lui.",
          `Qui est-ce qui ${p.verbe} ? « ${p.sujet} ». On peut aussi l'encadrer : « C'est ${apresVirgule(p.sujet)} qui ${p.verbe}… ».`,
          `Le groupe sujet est « ${p.sujet} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_gram_groupe_sujet_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_groupe_sujet",
    difficulty: 3,
    theme: "neutral",
    hint: "Le groupe sujet n'est pas toujours au début : ici, un autre groupe est passé devant.",
    tags: ["ce1", "grammaire", "groupe-sujet", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      return {
        text: `« ${libreEnTete(p)} »\n\nAttention, un groupe est passé devant. Quel est le groupe SUJET ?`,
        format: "qcm" as const,
        choices: makeChoices(p.sujet, [majuscule(p.libre), p.verbe, p.tenu]),
        expected: [p.sujet],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le groupe sujet est celui qui fait l'action, où qu'il se trouve dans la phrase.",
          "Ne prends pas le premier groupe venu : trouve le verbe, et demande qui le fait.",
          `Qui est-ce qui ${p.verbe} ? « ${apresVirgule(p.sujet)} », et pas « ${apresVirgule(p.libre)} », qui dit seulement où ou quand.`,
          `Le groupe sujet est « ${p.sujet} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_GRAM_SUJET_VERBE
  ========================================================= */
  {
    kind: "template",
    id: "ce1_gram_sujet_verbe_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_sujet_verbe",
    difficulty: 2,
    theme: "neutral",
    hint: "Le verbe dit ce qui se passe. Essaie de le changer de temps : lui seul bouge.",
    tags: ["ce1", "grammaire", "sujet-verbe", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      // Les pièges sont pris DANS la phrase : un mot venu d'ailleurs se
      // repérerait sans réfléchir.
      const motsSujet = p.sujet.split(" ");
      const motsTenu = p.tenu.split(" ");
      const motsLibre = p.libre.split(" ");
      return {
        text: `« ${complete(p)} »\n\nQuel mot est le VERBE ?`,
        format: "qcm" as const,
        choices: makeChoices(p.verbe, [
          motsSujet[motsSujet.length - 1],
          motsTenu[motsTenu.length - 1],
          motsLibre[motsLibre.length - 1],
        ]),
        expected: [p.verbe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le verbe dit ce qui se passe dans la phrase.",
          "Mets la phrase à un autre moment — « demain… », « hier… ». Le seul mot qui change de forme, c'est le verbe.",
          `Dans « ${complete(p)} », l'action est « ${p.verbe} ». Les autres mots disent qui, quoi, ou quand.`,
          `Le verbe est « ${p.verbe} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_gram_sujet_verbe_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_sujet_verbe",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux choses à repérer : qui fait l'action, et quelle est l'action.",
    tags: ["ce1", "grammaire", "sujet-verbe", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const bon = `sujet : ${p.sujet} · verbe : ${p.verbe}`;
      return {
        text: `« ${complete(p)} »\n\nQuel est le sujet, et quel est le verbe ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `sujet : ${p.tenu} · verbe : ${p.verbe}`,
          `sujet : ${p.sujet} · verbe : ${p.tenu}`,
          `sujet : ${p.libre} · verbe : ${p.verbe}`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le sujet dit qui fait l'action, le verbe dit quelle est l'action. Les deux vont ensemble.",
          "Trouve le verbe d'abord, puis pose « Qui est-ce qui… ? » devant lui.",
          `${p.verbe} : voilà l'action. Qui est-ce qui ${p.verbe} ? « ${p.sujet} ». Le reste de la phrase complète, mais ne fait rien.`,
          `C'est ${bon}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_GRAM_COMPLEMENT — sans les distinguer entre eux
  ========================================================= */
  {
    kind: "template",
    id: "ce1_gram_complement_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_complement",
    difficulty: 2,
    theme: "neutral",
    hint: "Un complément complète : ce n'est ni celui qui fait l'action, ni l'action.",
    tags: ["ce1", "grammaire", "complement", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const bon = randomChoice([p.tenu, p.libre]);
      return {
        text: `« ${complete(p)} »\n\nLequel de ces groupes est un complément ?`,
        format: "qcm" as const,
        choices: shuffle([bon, p.sujet, p.verbe, "aucun de ces groupes"]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un complément complète la phrase : il n'est ni le groupe sujet, ni le verbe.",
          "Barre le groupe sujet et le verbe. Tout ce qui reste, ce sont des compléments.",
          `« ${p.sujet} » fait l'action, « ${p.verbe} » est l'action. Restent « ${p.tenu} » et « ${p.libre} » : deux compléments.`,
          `« ${bon} » est un complément.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_gram_complement_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_complement",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les groupes qui restent une fois le sujet et le verbe mis de côté.",
    tags: ["ce1", "grammaire", "complement", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      // ⚠️ Une phrase sur deux est amputée de son complément libre : sinon la
      // réponse serait toujours « 2 », et l'élève l'apprendrait par cœur sans
      // jamais compter.
      const deux = Math.random() < 0.5;
      const phrase = deux ? complete(p) : sansLibre(p);
      const bon = deux ? "2" : "1";
      return {
        text: `« ${phrase} »\n\nCombien y a-t-il de compléments dans cette phrase ?`,
        format: "qcm" as const,
        choices: ["1", "2", "3", "aucun"],
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase peut avoir un complément, plusieurs, ou aucun. Au CE1, on ne cherche pas à les distinguer entre eux : on les repère, c'est tout.",
          "Mets de côté le groupe sujet et le verbe, puis compte les groupes qui restent.",
          deux
            ? `« ${p.sujet} » (sujet) · « ${p.verbe} » (verbe) · restent « ${p.tenu} » et « ${p.libre} » : deux compléments.`
            : `« ${p.sujet} » (sujet) · « ${p.verbe} » (verbe) · reste « ${p.tenu} » : un seul complément.`,
          `Il y en a ${bon}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_GRAM_SUBSTITUTION
  ========================================================= */
  {
    kind: "template",
    id: "ce1_gram_substitution_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_substitution",
    difficulty: 2,
    theme: "neutral",
    hint: "Un seul mot peut remplacer tout le groupe sujet.",
    tags: ["ce1", "grammaire", "substitution", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      return {
        text: `« ${complete(p)} »\n\nPar quel petit mot peut-on remplacer le groupe sujet « ${p.sujet} » ?`,
        format: "qcm" as const,
        choices: shuffle(["il", "elle", "ils", "elles"]),
        expected: [p.pronom],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Remplacer un groupe par un autre, c'est la substitution. Un groupe sujet se remplace par un pronom.",
          "Demande-toi : combien sont-ils, et est-ce masculin ou féminin ?",
          `« ${p.sujet} » → « ${majuscule(p.pronom)} ${p.verbe} ${p.tenu} ${p.libre}. » La phrase tient toujours debout.`,
          `On peut le remplacer par « ${p.pronom} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_gram_substitution_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_substitution",
    difficulty: 3,
    theme: "neutral",
    hint: "Le nouveau groupe doit tenir la même place, et le verbe ne doit pas bouger.",
    tags: ["ce1", "grammaire", "substitution", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const bon = `${p.autreSujet} ${p.verbe} ${p.tenu} ${p.libre}.`;
      return {
        text: `« ${complete(p)} »\n\nRemplace le groupe sujet par « ${p.autreSujet} ». Que devient la phrase ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `${p.sujet} ${p.autreSujet} ${p.verbe} ${p.tenu} ${p.libre}.`,
          `${p.autreSujet} ${p.tenu} ${p.verbe} ${p.libre}.`,
          `${p.autreSujet} ${p.verbe} ${p.libre}.`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La substitution échange un groupe contre un autre, à la même place, sans toucher au reste.",
          "Barre l'ancien groupe, écris le nouveau exactement au même endroit, et relis toute la phrase.",
          `« ${p.sujet} » sort, « ${p.autreSujet} » entre. Le verbe et les compléments ne bougent pas d'un mot.`,
          `La phrase devient « ${bon} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_GRAM_DEPLACEMENT
  ========================================================= */
  {
    kind: "template",
    id: "ce1_gram_deplacement_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_deplacement",
    difficulty: 3,
    theme: "neutral",
    hint: "Essaie chaque groupe au début de la phrase, et écoute si ça se dit.",
    tags: ["ce1", "grammaire", "deplacement", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      return {
        text: `« ${complete(p)} »\n\nQuel groupe peut-on déplacer au DÉBUT de la phrase ?`,
        format: "qcm" as const,
        choices: shuffle([p.libre, p.tenu, p.verbe, "aucun de ces groupes"]),
        expected: [p.libre],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Certains groupes se déplacent librement dans la phrase, d'autres non. Ce n'est pas leur place qui décide, c'est leur rôle.",
          "Essaie de mettre chaque groupe en tête, avec une virgule, et écoute si la phrase se dit encore.",
          `« ${libreEnTete(p)} » se dit très bien. « ${majuscule(p.tenu)}, ${apresVirgule(p.sujet)} ${p.verbe}… » ne se dit pas : ce complément-là est tenu par le verbe.`,
          `Le groupe qui se déplace est « ${p.libre} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_gram_deplacement_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_deplacement",
    difficulty: 2,
    theme: "neutral",
    hint: "Le groupe passe devant, suivi d'une virgule. Le reste ne bouge pas.",
    tags: ["ce1", "grammaire", "deplacement", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const bon = libreEnTete(p);
      return {
        text: `« ${complete(p)} »\n\nÉcris cette phrase en commençant par « ${p.libre} ».`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `${majuscule(p.libre)} ${apresVirgule(p.sujet)} ${p.verbe} ${p.tenu}.`,
          `${majuscule(p.libre)}, ${p.verbe} ${apresVirgule(p.sujet)} ${p.tenu}.`,
          `${majuscule(p.libre)}, ${apresVirgule(p.sujet)} ${p.tenu} ${p.verbe}.`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Quand un groupe passe en tête de phrase, on met une virgule derrière lui. Le reste garde son ordre.",
          "Déplace le groupe, ajoute la virgule, puis recopie le reste sans rien intervertir.",
          `« ${complete(p)} » → « ${bon} » Le sujet reste devant son verbe, et le verbe devant son complément.`,
          `On écrit « ${bon} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_GRAM_SUPPRESSION
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_gram_suppression_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_suppression",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une phrase, qu'est-ce qu'on ne peut JAMAIS enlever ?",
    format: "qcm",
    choices: [
      "Le groupe sujet et le verbe",
      "Les compléments",
      "Le premier groupe de la phrase",
      "Le dernier groupe de la phrase",
    ],
    expected: ["Le groupe sujet et le verbe"],
    comparator: "mcq_exact",
    hint: "Sans eux, il ne reste plus de phrase du tout.",
    explanation: exp(
      "Le groupe sujet et le verbe sont la charpente de la phrase : sans eux, elle s'écroule.",
      "Enlève un groupe et relis. Si la phrase ne veut plus rien dire, c'est qu'il était indispensable.",
      "« Léa ramasse des mangues chaque matin. » On peut enlever « chaque matin ». Enlève « Léa », et on ne sait plus qui ramasse. Enlève « ramasse », et il ne se passe plus rien.",
      "On ne peut jamais enlever le groupe sujet ni le verbe.",
    ),
    tags: ["ce1", "grammaire", "suppression", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_gram_suppression_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_suppression",
    difficulty: 3,
    theme: "neutral",
    hint: "Enlève un groupe, relis, et vois si la phrase tient encore debout.",
    tags: ["ce1", "grammaire", "suppression", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      return {
        text: `« ${complete(p)} »\n\nQuel groupe peut-on ENLEVER sans casser la phrase ?`,
        format: "qcm" as const,
        choices: shuffle([p.libre, p.sujet, p.verbe, p.tenu]),
        expected: [p.libre],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Certains groupes ajoutent une précision : on peut les retirer, la phrase reste une phrase.",
          "Cache un groupe avec ton doigt et relis à voix haute. Si ça se dit encore, il était en plus.",
          `« ${sansLibre(p)} » se dit très bien. Sans « ${p.tenu} », en revanche, la phrase reste en l'air.`,
          `On peut enlever « ${p.libre} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_gram_suppression_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_suppression",
    difficulty: 2,
    theme: "neutral",
    hint: "Recopie la phrase sans ce groupe-là, et sans rien changer d'autre.",
    tags: ["ce1", "grammaire", "suppression", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const bon = sansLibre(p);
      return {
        text: `« ${complete(p)} »\n\nQue reste-t-il si on enlève « ${p.libre} » ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `${p.sujet} ${p.verbe}.`,
          `${p.verbe} ${p.tenu}.`,
          `${p.sujet} ${p.tenu}.`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Supprimer un groupe, c'est le retirer sans toucher au reste.",
          "Barre le groupe demandé, recopie tout le reste dans le même ordre.",
          `« ${complete(p)} » → « ${bon} » Le sujet, le verbe et l'autre complément sont restés à leur place.`,
          `Il reste « ${bon} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_GRAM_DEFI — les trois manipulations d'un coup
  ========================================================= */
  {
    kind: "template",
    id: "ce1_gram_defi_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois choses à faire dans l'ordre : remplacer, déplacer, enlever.",
    tags: ["ce1", "grammaire", "defi", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const bon = `${majuscule(p.libre)}, ${p.pronom} ${p.verbe} ${p.tenu}.`;
      return {
        text: `« ${complete(p)} »\n\nRemplace le groupe sujet par un pronom, puis mets « ${p.libre} » au début. Que devient la phrase ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `${majuscule(p.libre)}, ${p.sujet} ${p.verbe} ${p.tenu}.`,
          // Le pronom prend sa majuscule même dans un piège : une phrase qui
          // commence par une minuscule n'a rien à faire sous les yeux d'un CE1.
          `${majuscule(p.pronom)} ${p.verbe} ${p.tenu} ${p.libre}.`,
          `${majuscule(p.libre)}, ${p.pronom} ${p.tenu} ${p.verbe}.`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "On peut enchainer les manipulations : remplacer un groupe, puis en déplacer un autre. La phrase doit rester juste à chaque étape.",
          "Fais une chose à la fois, et relis après chaque étape.",
          `1. « ${p.sujet} » → « ${p.pronom} ». 2. « ${p.libre} » passe en tête, avec sa virgule. Résultat : « ${bon} »`,
          `La phrase devient « ${bon} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_gram_defi_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde d'abord ce que fait la phrase, ensuite son signe de fin.",
    tags: ["ce1", "grammaire", "defi", "template"],
    generate: () => {
      const cas = randomChoice([
        { phrase: randomChoice(INTERROGATIVES), type: "une question", signe: "?" },
        { phrase: randomChoice(EXCLAMATIVES), type: "une exclamation", signe: "!" },
        { phrase: sansLibre(randomChoice(PHRASES)), type: "une phrase qui raconte", signe: "." },
        { phrase: randomChoice(IMPERATIVES), type: "un ordre", signe: "." },
      ]);
      const bon = `${cas.type}, et elle finit par « ${cas.signe} »`;
      return {
        text: `« ${cas.phrase} »\n\nQu'est-ce que c'est, et par quel signe cela se termine-t-il ?`,
        format: "qcm" as const,
        choices: shuffle([
          "une question, et elle finit par « ? »",
          "une exclamation, et elle finit par « ! »",
          "une phrase qui raconte, et elle finit par « . »",
          "un ordre, et elle finit par « . »",
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le signe de la fin et ce que fait la phrase vont ensemble. Mais attention : un ordre finit par un point, comme une phrase qui raconte.",
          "Lis la phrase à voix haute, décide de ce qu'elle fait, puis vérifie son dernier signe.",
          `« ${cas.phrase} » est ${cas.type} et finit par « ${cas.signe} ». Le point ne suffit donc pas à reconnaitre le type : il faut lire.`,
          `C'est ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_gram_defi_meth_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce1_gram_defi",
    difficulty: 3,
    theme: "neutral",
    text: "« Léa ramasse des mangues chaque matin. »\n\nOn peut enlever « chaque matin », mais pas « des mangues ». Comment le sais-tu ?",
    format: "qcm",
    choices: [
      "J'enlève un groupe, je relis à voix haute, et j'écoute si la phrase tient encore.",
      // L'erreur réelle : décider par la place plutôt que par l'essai.
      "Je regarde lequel est le plus près du verbe.",
      "Je regarde lequel est à la fin de la phrase.",
      "Je regarde lequel est le plus long.",
    ],
    expected: [
      "J'enlève un groupe, je relis à voix haute, et j'écoute si la phrase tient encore.",
    ],
    comparator: "mcq_exact",
    hint: "Enlève un groupe, relis la phrase à voix haute, et écoute.",
    explanation: exp(
      "Un groupe qu'on peut enlever ajoute une précision. Un groupe qu'on ne peut pas enlever est tenu par le verbe.",
      "Cache un groupe avec ton doigt et relis à voix haute : si la phrase se dit encore, tu pouvais l'enlever.",
      "« Léa ramasse des mangues. » se dit très bien. « Léa ramasse chaque matin. » laisse une question en l'air : ramasse quoi ? Le verbe réclame son complément.",
      "On enlève, on relit, et on écoute si la phrase tient encore debout.",
    ),
    tags: ["ce1", "grammaire", "defi", "methode", "qcm"],
  },
];
