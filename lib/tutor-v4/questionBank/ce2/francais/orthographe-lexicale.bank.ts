// lib/tutor-v4/questionBank/ce2/francais/orthographe-lexicale.bank.ts
//
// L'orthographe lexicale du CE2 — comment s'écrivent les MOTS, par opposition à
// l'orthographe grammaticale, qui règle les accords.
//
// NOTION NEUVE : `orthographe_lexicale` a été créée le 09/08/2026 en relisant
// le BO. Le repli l'envoyait sur un générateur hors sujet, faute de savoir quoi
// en faire.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, CE2) :
//   — « Tenir compte des accents » ;
//   — « S'appuyer sur le radical d'un mot pour l'orthographier » — l'exemple du
//     BO est beau → beauté ;
//   — « S'appuyer sur les préfixes et les suffixes » ;
//   — écrire un mot nouveau par ANALOGIE avec un mot déjà connu ;
//   — trouver la LETTRE FINALE MUETTE en cherchant un mot de la même famille.
//
// L'IDÉE DE LA NOTION, et c'est la même dans les six micro-compétences : un mot
// ne s'écrit pas au son. Il s'écrit en se rappelant sa famille. « chant » prend
// un « t » qu'on n'entend pas, et c'est « chanter » qui le dit.
//
// ⛔ RIEN QUI DÉPENDE DE L'ACCENT D'ICI. On ne demande jamais « quel son
// entends-tu ? » : on demande « comment s'écrit ce mot ? ». « lait » se dit
// [lɛ] dans le nord et souvent [le] à La Réunion — un enfant d'ici aurait faux
// à cause de son accent, pas de son orthographe. Les accents graves et
// circonflexes sont donc travaillés PAR LA GRAPHIE, jamais par l'oreille.
//
// ⚠️ AUCUNE FAUTE FABRIQUÉE. Toutes les formes erronées sont écrites une par
// une, et phonétiquement plausibles : bocou, écolle, maizon. Une anagramme ne
// trompe personne, et un « s » ajouté au hasard tombe souvent sur un vrai mot.

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
   LES ACCENTS

   ⚠️ La question est TOUJOURS « comment s'écrit ce mot ? », jamais « quel
   accent entends-tu ? ». La phrase à trou désigne le mot sans l'orthographier.
   ═══════════════════════════════════════════════════════════════════════════ */

type MotAccentue = {
  readonly mot: string;
  readonly phrase: string;
  readonly regle: string;
  readonly fautes: readonly string[];
};

const ACCENTS: readonly MotAccentue[] = [
  {
    mot: "élève",
    phrase: "Chaque ___ range son cahier.",
    regle: "un accent aigu sur le premier e, un accent grave sur le second",
    fautes: ["éléve", "elève", "élêve"],
  },
  {
    mot: "frère",
    phrase: "Mon ___ a deux ans de plus que moi.",
    regle: "un accent grave devant une syllabe muette",
    fautes: ["frére", "frere", "frêre"],
  },
  {
    mot: "mère",
    phrase: "La ___ de Tom est infirmière.",
    regle: "un accent grave devant une syllabe muette",
    fautes: ["mére", "mere", "mêre"],
  },
  {
    mot: "règle",
    phrase: "Trace le trait avec ta ___ .",
    regle: "un accent grave devant deux consonnes suivies d'un e muet",
    fautes: ["régle", "regle", "rêgle"],
  },
  {
    mot: "fête",
    phrase: "La ___ du village a lieu samedi.",
    regle: "un accent circonflexe, souvenir d'un « s » disparu",
    fautes: ["fete", "fète", "féte"],
  },
  {
    mot: "tête",
    phrase: "Il s'est cogné la ___ contre la branche.",
    regle: "un accent circonflexe, souvenir d'un « s » disparu",
    fautes: ["tete", "tète", "téte"],
  },
  {
    mot: "forêt",
    phrase: "Nous marchons dans la ___ de Bélouve.",
    regle: "un accent circonflexe, souvenir d'un « s » disparu",
    fautes: ["foret", "forét", "forèt"],
  },
  {
    mot: "gâteau",
    phrase: "Mamie prépare un ___ au coco.",
    regle: "un accent circonflexe sur le a",
    fautes: ["gateau", "gâtau", "gâteaux"],
  },
  {
    mot: "école",
    phrase: "Nous partons à l'___ à sept heures.",
    regle: "un accent aigu au début du mot",
    fautes: ["ecole", "écolle", "ècole"],
  },
  {
    mot: "été",
    phrase: "En ___ , il fait chaud toute la journée.",
    regle: "deux accents aigus",
    fautes: ["eté", "étè", "ete"],
  },
  {
    mot: "près",
    phrase: "La case est tout ___ du lagon.",
    regle: "un accent grave, et un « s » muet à la fin",
    fautes: ["prés", "pres", "prêt"],
  },
  {
    mot: "après",
    phrase: "On rentre ___ la récréation.",
    regle: "un accent grave, et un « s » muet à la fin",
    fautes: ["aprés", "apres", "aprais"],
  },
  {
    mot: "île",
    phrase: "Notre ___ est entourée par l'océan.",
    regle: "un accent circonflexe sur le i",
    fautes: ["ile", "ïle", "îlle"],
  },
  {
    mot: "bâton",
    phrase: "Il marche avec un ___ de bois.",
    regle: "un accent circonflexe sur le a",
    fautes: ["baton", "bâtton", "battôn"],
  },
  {
    mot: "hôpital",
    phrase: "Ma tante travaille à l'___ de Saint-Pierre.",
    regle: "un accent circonflexe sur le o",
    fautes: ["hopital", "hôpitale", "ôpital"],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LES FAMILLES DE MOTS ET LE RADICAL — l'exemple du BO est beau → beauté
   ═══════════════════════════════════════════════════════════════════════════ */

type Famille = {
  readonly radical: string;
  readonly mots: readonly string[];
  /** Un mot qui SONNE comme la famille sans en être : le piège du radical. */
  readonly intrus: string;
};

const FAMILLES: readonly Famille[] = [
  { radical: "beau", mots: ["beau", "beauté", "embellir"], intrus: "bateau" },
  { radical: "chant", mots: ["chant", "chanter", "chanteur", "chanson"], intrus: "champ" },
  { radical: "dent", mots: ["dent", "dentiste", "dentaire"], intrus: "dedans" },
  { radical: "grand", mots: ["grand", "grandeur", "grandir", "agrandir"], intrus: "gronder" },
  { radical: "fort", mots: ["fort", "force", "renforcer", "fortifier"], intrus: "forêt" },
  { radical: "lait", mots: ["lait", "laitier", "laiterie"], intrus: "laid" },
  { radical: "froid", mots: ["froid", "froideur", "refroidir"], intrus: "fraise" },
  { radical: "long", mots: ["long", "longueur", "allonger", "rallonge"], intrus: "langue" },
  { radical: "saut", mots: ["saut", "sauter", "sauteur", "sursaut"], intrus: "sceau" },
  { radical: "terre", mots: ["terre", "terrain", "atterrir", "souterrain"], intrus: "tirer" },
  { radical: "jour", mots: ["jour", "journée", "journal", "bonjour"], intrus: "jouer" },
  { radical: "mer", mots: ["mer", "marin", "maritime", "sous-marin"], intrus: "mère" },
  { radical: "fleur", mots: ["fleur", "fleuriste", "fleurir"], intrus: "fleuve" },
  { radical: "port", mots: ["port", "portuaire", "aéroport"], intrus: "porte" },
  { radical: "dessin", mots: ["dessin", "dessiner", "dessinateur"], intrus: "destin" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PRÉFIXES ET SUFFIXES
   ═══════════════════════════════════════════════════════════════════════════ */

type MotConstruit = {
  readonly mot: string;
  readonly prefixe: string | null;
  readonly suffixe: string | null;
  readonly base: string;
  readonly sens: string;
};

const MOTS_CONSTRUITS: readonly MotConstruit[] = [
  { mot: "refaire", prefixe: "re-", suffixe: null, base: "faire", sens: "faire une deuxième fois" },
  { mot: "relire", prefixe: "re-", suffixe: null, base: "lire", sens: "lire une deuxième fois" },
  { mot: "recommencer", prefixe: "re-", suffixe: null, base: "commencer", sens: "commencer à nouveau" },
  { mot: "défaire", prefixe: "dé-", suffixe: null, base: "faire", sens: "faire le contraire de faire" },
  { mot: "déplier", prefixe: "dé-", suffixe: null, base: "plier", sens: "faire le contraire de plier" },
  { mot: "décoller", prefixe: "dé-", suffixe: null, base: "coller", sens: "faire le contraire de coller" },
  { mot: "impossible", prefixe: "im-", suffixe: null, base: "possible", sens: "qui n'est pas possible" },
  { mot: "invisible", prefixe: "in-", suffixe: null, base: "visible", sens: "qu'on ne peut pas voir" },
  { mot: "malheureux", prefixe: "mal-", suffixe: null, base: "heureux", sens: "qui n'est pas heureux" },
  { mot: "chanteur", prefixe: null, suffixe: "-eur", base: "chanter", sens: "celui qui chante" },
  { mot: "nageur", prefixe: null, suffixe: "-eur", base: "nager", sens: "celui qui nage" },
  { mot: "fleuriste", prefixe: null, suffixe: "-iste", base: "fleur", sens: "celui qui vend des fleurs" },
  { mot: "dentiste", prefixe: null, suffixe: "-iste", base: "dent", sens: "celui qui soigne les dents" },
  { mot: "maisonnette", prefixe: null, suffixe: "-ette", base: "maison", sens: "une petite maison" },
  { mot: "fillette", prefixe: null, suffixe: "-ette", base: "fille", sens: "une petite fille" },
  { mot: "lavage", prefixe: null, suffixe: "-age", base: "laver", sens: "l'action de laver" },
  { mot: "pliage", prefixe: null, suffixe: "-age", base: "plier", sens: "l'action de plier" },
  { mot: "buvable", prefixe: null, suffixe: "-able", base: "boire", sens: "qu'on peut boire" },
  { mot: "lavable", prefixe: null, suffixe: "-able", base: "laver", sens: "qu'on peut laver" },
  { mot: "portuaire", prefixe: null, suffixe: "-aire", base: "port", sens: "qui concerne le port" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   L'ANALOGIE — écrire un mot nouveau en s'appuyant sur un mot connu
   ═══════════════════════════════════════════════════════════════════════════ */

type Analogie = {
  readonly connu: string;
  readonly nouveau: string;
  readonly fin: string;
  readonly fautes: readonly string[];
};

const ANALOGIES: readonly Analogie[] = [
  { connu: "bateau", nouveau: "manteau", fin: "-eau", fautes: ["manto", "mantau", "mantô"] },
  { connu: "chapeau", nouveau: "rideau", fin: "-eau", fautes: ["rido", "ridau", "ridots"] },
  { connu: "bouteille", nouveau: "oreille", fin: "-eille", fautes: ["oreye", "oreil", "oreillle"] },
  { connu: "abeille", nouveau: "corbeille", fin: "-eille", fautes: ["corbeye", "corbeil", "corbeillle"] },
  { connu: "montagne", nouveau: "campagne", fin: "-agne", fautes: ["campane", "campaigne", "campagnne"] },
  { connu: "lapin", nouveau: "jardin", fin: "-in", fautes: ["jardain", "jardein", "jardins"] },
  { connu: "maison", nouveau: "saison", fin: "-aison", fautes: ["saizon", "sézon", "saisson"] },
  { connu: "chaussure", nouveau: "voiture", fin: "-ure", fautes: ["voitur", "voitture", "voiteure"] },
  { connu: "coiffeur", nouveau: "vendeur", fin: "-eur", fautes: ["vendeure", "vendeurr", "vandeur"] },
  { connu: "bouton", nouveau: "wagon", fin: "-on", fautes: ["vagon", "wagonne", "ouagon"] },
  { connu: "cheval", nouveau: "journal", fin: "-al", fautes: ["journale", "jurnal", "journall"] },
  { connu: "gâteau", nouveau: "château", fin: "-eau", fautes: ["chato", "chateau", "châto"] },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LA LETTRE FINALE MUETTE — c'est la famille qui la révèle
   ═══════════════════════════════════════════════════════════════════════════ */

type LettreMuette = {
  readonly mot: string;
  readonly lettre: string;
  readonly famille: string;
  readonly phrase: string;
  readonly fautes: readonly string[];
};

const LETTRES_MUETTES: readonly LettreMuette[] = [
  { mot: "chant", lettre: "t", famille: "chanter", phrase: "Le ___ des oiseaux me réveille.", fautes: ["chan", "chand", "chanp"] },
  { mot: "saut", lettre: "t", famille: "sauter", phrase: "Il réussit un ___ énorme.", fautes: ["sau", "saud", "sauf"] },
  { mot: "petit", lettre: "t", famille: "petite", phrase: "Le ___ frère de Léa a trois ans.", fautes: ["peti", "petid", "petis"] },
  { mot: "grand", lettre: "d", famille: "grande", phrase: "Le ___ tamarin donne de l'ombre.", fautes: ["gran", "grant", "grang"] },
  { mot: "froid", lettre: "d", famille: "froide", phrase: "L'eau du bassin est ___ le matin.", fautes: ["froi", "froit", "froie"] },
  { mot: "bord", lettre: "d", famille: "border", phrase: "Assieds-toi au ___ du chemin.", fautes: ["bor", "bort", "bore"] },
  { mot: "tard", lettre: "d", famille: "tarder", phrase: "Nous sommes rentrés ___ hier soir.", fautes: ["tar", "tart", "tare"] },
  { mot: "lait", lettre: "t", famille: "laitier", phrase: "Verse le ___ dans le bol.", fautes: ["lai", "laid", "lais"] },
  { mot: "dent", lettre: "t", famille: "dentiste", phrase: "J'ai perdu une ___ ce matin.", fautes: ["dan", "dend", "denps"] },
  { mot: "toit", lettre: "t", famille: "toiture", phrase: "La pluie tambourine sur le ___ .", fautes: ["toi", "toid", "toix"] },
  { mot: "rang", lettre: "g", famille: "ranger", phrase: "Mets-toi au premier ___ .", fautes: ["ran", "rant", "rand"] },
  { mot: "long", lettre: "g", famille: "longue", phrase: "Le sentier est très ___ .", fautes: ["lon", "lont", "lond"] },
  { mot: "blanc", lettre: "c", famille: "blanche", phrase: "Le sable est presque ___ .", fautes: ["blan", "blant", "bland"] },
  { mot: "galop", lettre: "p", famille: "galoper", phrase: "Le cheval part au ___ .", fautes: ["galo", "galot", "gallop"] },
  { mot: "camp", lettre: "p", famille: "camper", phrase: "Nous montons le ___ près de la rivière.", fautes: ["can", "cam", "campt"] },
  { mot: "gros", lettre: "s", famille: "grosse", phrase: "Un ___ nuage cache le piton.", fautes: ["gro", "grot", "groz"] },
  { mot: "tapis", lettre: "s", famille: "tapisserie", phrase: "Essuie tes pieds sur le ___ .", fautes: ["tapi", "tapit", "tapid"] },
  { mot: "pied", lettre: "d", famille: "piéton", phrase: "Je me suis fait mal au ___ .", fautes: ["pié", "piet", "piè"] },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LA BANQUE
   ═══════════════════════════════════════════════════════════════════════════ */

export const orthographeLexicaleBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_ORTHLEX_ACCENTS
  ========================================================= */
  {
    kind: "template",
    id: "ce2_orthlex_accents_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce2_orthlex_accents",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde le mot en entier : chaque accent est à sa place ou il n'y est pas.",
    tags: ["ce2", "orthographe-lexicale", "accents", "template"],
    generate: () => {
      const m = randomChoice(ACCENTS);
      return {
        text: `Complète : « ${m.phrase} »`,
        format: "qcm" as const,
        choices: shuffle([m.mot, ...m.fautes]),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un accent n'est pas un ornement : il fait partie du mot, comme une lettre. Sans lui, le mot est mal écrit.",
          "Écris le mot, puis relis-le lettre à lettre en vérifiant chaque accent.",
          `« ${m.mot} » : ${m.regle}. « ${m.fautes[0]} » se dirait presque pareil, et ce serait faux.`,
          `On écrit « ${m.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orthlex_accents_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce2_orthlex_accents",
    difficulty: 3,
    theme: "neutral",
    hint: "Un seul de ces quatre mots est écrit correctement.",
    tags: ["ce2", "orthographe-lexicale", "accents", "template"],
    generate: () => {
      const m = randomChoice(ACCENTS);
      const autresFautes = shuffle(
        ACCENTS.filter((x) => x.mot !== m.mot).flatMap((x) => [...x.fautes]),
      );
      return {
        text: "Parmi ces quatre mots, un seul porte les bons accents. Lequel ?",
        format: "qcm" as const,
        choices: choix(m.mot, autresFautes),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les accents se voient : ils ne se devinent pas au son.",
          "Relis chaque mot lentement en t'arrêtant sur les voyelles accentuées.",
          `« ${m.mot} » est le seul bien écrit — ${m.regle}. Les autres portent un accent de trop, de moins, ou du mauvais côté.`,
          `Le mot correct est « ${m.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_orthlex_accents_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce2_orthlex_accents",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi sert l'accent circonflexe de « forêt » ?",
    format: "qcm",
    choices: [
      "Il rappelle un « s » qui existait autrefois — on le retrouve dans « forestier »",
      "Il indique qu'il faut parler plus fort",
      "Il sert à séparer les deux syllabes",
      "Il ne sert à rien, c'est une décoration",
    ],
    expected: [
      "Il rappelle un « s » qui existait autrefois — on le retrouve dans « forestier »",
    ],
    comparator: "mcq_exact",
    hint: "Cherche un mot de la même famille où une lettre est revenue.",
    explanation: exp(
      "L'accent circonflexe garde souvent la trace d'un « s » que le français a cessé d'écrire il y a longtemps.",
      "Quand tu hésites, cherche un mot de la même famille : la lettre disparue y est parfois restée.",
      "forêt → forestier. fête → festival. tête → têtu, mais aussi « tester » qui vient d'ailleurs. hôpital → hospitalier. À chaque fois, le « s » réapparait dans la famille : c'est lui que l'accent remplace.",
      "Il rappelle un « s » qui existait autrefois — on le retrouve dans « forestier ».",
    ),
    tags: ["ce2", "orthographe-lexicale", "accents", "remarquable", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_orthlex_accents_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce2_orthlex_accents",
    difficulty: 3,
    theme: "neutral",
    hint: "Un accent, c'est comme une lettre : il compte.",
    tags: ["ce2", "orthographe-lexicale", "accents", "methode"],
    generate: () => {
      const m = randomChoice(ACCENTS);
      const bonne = `L'accent n'est pas le bon, ou pas au bon endroit : on écrit « ${m.mot} ». Un accent fait partie du mot, comme une lettre.`;
      return {
        text: `Un camarade écrit « ${m.fautes[0]} ».\n\nQu'est-ce qui ne va pas ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // LE piège : l'accent tenu pour un ornement facultatif.
          "Rien : l'accent, ça ne compte pas vraiment.",
          "Il manque une lettre au mot.",
          "Le mot est au pluriel alors qu'il devrait être au singulier.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un accent fait partie du mot au même titre qu'une lettre : le déplacer, c'est faire une faute.",
          "Recopie le mot correct, puis compare-le au tien voyelle par voyelle.",
          `On écrit « ${m.mot} » : ${m.regle}.`,
          `Il faut écrire « ${m.mot} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_ORTHLEX_RADICAL — l'exemple du BO : beau → beauté
  ========================================================= */
  {
    kind: "template",
    id: "ce2_orthlex_radical_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce2_orthlex_radical",
    difficulty: 2,
    theme: "neutral",
    hint: "Trois mots partagent le même début ET la même idée.",
    tags: ["ce2", "orthographe-lexicale", "radical", "template"],
    generate: () => {
      const f = randomChoice(FAMILLES);
      const dedans = shuffle(f.mots).slice(0, 3);
      return {
        text: `Trois de ces mots sont de la même famille. Lequel est l'intrus ?`,
        format: "qcm" as const,
        choices: shuffle([f.intrus, ...dedans]),
        expected: [f.intrus],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les mots d'une même famille partagent un morceau commun — le radical — et une idée commune.",
          "Ne te fie pas au son : demande-toi si les mots parlent bien de la même chose.",
          `${dedans.map((m) => `« ${m} »`).join(", ")} tournent tous autour de « ${f.radical} ». « ${f.intrus} » lui ressemble, mais ne parle pas de la même chose.`,
          `L'intrus est « ${f.intrus} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orthlex_radical_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce2_orthlex_radical",
    difficulty: 3,
    theme: "neutral",
    hint: "Le radical est le morceau qu'on retrouve dans tous les mots de la famille.",
    tags: ["ce2", "orthographe-lexicale", "radical", "template"],
    generate: () => {
      const f = randomChoice(FAMILLES);
      const trois = shuffle(f.mots).slice(0, 3);
      const autres = shuffle(FAMILLES.filter((x) => x.radical !== f.radical)).map((x) => x.radical);
      return {
        text: `${trois.join(", ")}.\n\nQuel est le radical commun à ces mots ?`,
        format: "qcm" as const,
        choices: choix(f.radical, [f.intrus], autres),
        expected: [f.radical],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le radical est la partie commune à tous les mots d'une famille. C'est lui qui porte le sens.",
          "Écris les mots les uns sous les autres et souligne ce qui se répète.",
          `${trois.join(", ")} — on retrouve « ${f.radical} » dans chacun.`,
          `Le radical est « ${f.radical} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orthlex_radical_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce2_orthlex_radical",
    difficulty: 3,
    theme: "neutral",
    hint: "Si tu sais écrire un mot de la famille, tu en sais déjà beaucoup sur les autres.",
    tags: ["ce2", "orthographe-lexicale", "radical", "methode"],
    generate: () => {
      const f = randomChoice(FAMILLES);
      const bonne = `Le radical « ${f.radical} » s'écrit pareil dans toute la famille : si je sais écrire l'un, je sais écrire le début des autres.`;
      return {
        text: `« ${f.mots.join(" », « ")} » sont de la même famille.\n\nEn quoi cela t'aide-t-il à les écrire ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // LE piège : croire que chaque mot s'apprend seul.
          "Cela n'aide pas : chaque mot a sa propre orthographe.",
          // L'erreur réelle : c'est le DÉBUT qui est commun, pas la fin.
          "Cela aide pour la fin des mots : ils se terminent tous pareil.",
          "Cela aide à savoir combien de syllabes ils ont.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les mots d'une famille s'écrivent tous avec le même radical, même quand on ne l'entend plus pareil.",
          "Quand tu hésites sur un mot, cherche un mot de sa famille où la lettre douteuse s'entend.",
          `« ${f.radical} » se retrouve dans ${f.mots.join(", ")}. Si tu sais écrire l'un, tu sais écrire le début des autres.`,
          `Le radical « ${f.radical} » s'écrit pareil dans toute la famille.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_ORTHLEX_AFFIXES
  ========================================================= */
  {
    kind: "template",
    id: "ce2_orthlex_affixes_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce2_orthlex_affixes",
    difficulty: 2,
    theme: "neutral",
    hint: "Le préfixe est collé DEVANT, le suffixe est collé DERRIÈRE.",
    tags: ["ce2", "orthographe-lexicale", "affixes", "template"],
    generate: () => {
      const m = randomChoice(MOTS_CONSTRUITS);
      const estPrefixe = m.prefixe !== null;
      const morceau = estPrefixe ? m.prefixe : m.suffixe;
      const tousMorceaux = [
        ...new Set(
          MOTS_CONSTRUITS.flatMap((x) => [x.prefixe, x.suffixe]).filter(
            (x): x is string => x !== null,
          ),
        ),
      ];
      return {
        text: `Le mot « ${m.mot} » est fabriqué sur « ${m.base} ».\n\nQuel morceau lui a-t-on ajouté ?`,
        format: "qcm" as const,
        choices: choix(morceau as string, tousMorceaux),
        expected: [morceau as string],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "On fabrique des mots en ajoutant un morceau devant — le préfixe — ou derrière — le suffixe.",
          "Compare le mot fabriqué et le mot de départ : ce qui est en plus, c'est le morceau ajouté.",
          `${m.base} → ${m.mot} : on a ajouté « ${morceau} » ${estPrefixe ? "devant" : "derrière"}. Cela veut dire « ${m.sens} ».`,
          `Le morceau ajouté est « ${morceau} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orthlex_affixes_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce2_orthlex_affixes",
    difficulty: 3,
    theme: "neutral",
    hint: "Le morceau ajouté change le sens du mot. Lis-le comme une petite phrase.",
    tags: ["ce2", "orthographe-lexicale", "affixes", "template"],
    generate: () => {
      const m = randomChoice(MOTS_CONSTRUITS);
      const autres = shuffle(MOTS_CONSTRUITS.filter((x) => x.sens !== m.sens)).map((x) => x.sens);
      return {
        text: `Que veut dire « ${m.mot} » ?`,
        format: "qcm" as const,
        choices: choix(m.sens, autres),
        expected: [m.sens],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un préfixe ou un suffixe ne change pas seulement la forme du mot : il en change le sens, toujours de la même façon.",
          "Découpe le mot en deux et lis chaque morceau : re- veut dire « à nouveau », dé- veut dire « le contraire », -eur veut dire « celui qui ».",
          `${m.mot} = ${m.prefixe ?? ""}${m.base}${m.suffixe ? ` + ${m.suffixe}` : ""} → ${m.sens}.`,
          `« ${m.mot} » veut dire « ${m.sens} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orthlex_affixes_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce2_orthlex_affixes",
    difficulty: 3,
    theme: "neutral",
    // ⚠️ Le découpage en lui-même est déjà demandé côté vocabulaire
    // (ce2_voc_prefixe_suffixe_meth_1). Ici, la question est orthographique :
    // à quoi le découpage sert-il quand il s'agit d'ÉCRIRE le mot ?
    hint: "Tu sais déjà écrire une partie de ce mot. Laquelle ?",
    tags: ["ce2", "orthographe-lexicale", "affixes", "methode"],
    generate: () => {
      const m = randomChoice(MOTS_CONSTRUITS);
      const bonne = `Parce que je connais déjà « ${m.base} » : je l'écris comme d'habitude, et j'ajoute le morceau autour.`;
      return {
        text: `Tu dois écrire « ${m.mot} ».\n\nEn quoi le découper en morceaux t'aide-t-il à ne pas faire de faute ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // Le piège fin : le découpage sert aux deux, au sens ET à l'écriture.
          "Cela aide à trouver son sens, mais pas son orthographe.",
          "Cela n'aide pas : un mot construit s'écrit comme il s'entend.",
          "Cela aide à savoir combien de lettres il faut.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot construit se lit en morceaux : le radical porte le sens, l'affixe le modifie.",
          "Cherche d'abord le mot que tu connais à l'intérieur, puis regarde ce qui l'entoure.",
          `${m.mot} = ${m.prefixe ?? ""}${m.base}${m.suffixe ? ` + ${m.suffixe}` : ""} → ${m.sens}.`,
          `« ${m.mot} » est fabriqué sur « ${m.base} », et veut dire « ${m.sens} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_ORTHLEX_ANALOGIE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_orthlex_analogie_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce2_orthlex_analogie",
    difficulty: 2,
    theme: "neutral",
    hint: "Tu connais déjà un mot qui finit pareil. Copie sa fin.",
    tags: ["ce2", "orthographe-lexicale", "analogie", "template"],
    generate: () => {
      const a = randomChoice(ANALOGIES);
      return {
        text: `Tu sais écrire « ${a.connu} ».\n\nComment s'écrit « ${a.nouveau} », qui finit de la même façon ?`,
        format: "qcm" as const,
        choices: shuffle([a.nouveau, ...a.fautes]),
        expected: [a.nouveau],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot nouveau s'écrit souvent comme un mot qu'on connait déjà : c'est l'analogie.",
          "Cherche dans ta tête un mot que tu sais écrire et qui finit par le même son. Recopie sa fin.",
          `${a.connu} finit par « ${a.fin} », et ${a.nouveau} aussi. Une fois qu'on tient l'un, on tient l'autre.`,
          `On écrit « ${a.nouveau} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orthlex_analogie_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce2_orthlex_analogie",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche celui qui se termine exactement comme le mot proposé.",
    tags: ["ce2", "orthographe-lexicale", "analogie", "template"],
    generate: () => {
      const a = randomChoice(ANALOGIES);
      const autres = shuffle(ANALOGIES.filter((x) => x.fin !== a.fin)).map((x) => x.connu);
      return {
        text: `Tu ne sais pas écrire « ${a.nouveau} ».\n\nSur quel mot connu peux-tu t'appuyer ?`,
        format: "qcm" as const,
        choices: choix(a.connu, autres),
        expected: [a.connu],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Écrire par analogie, c'est prendre appui sur un mot connu qui se termine pareil.",
          "Prononce la fin du mot difficile, puis cherche un mot familier qui finit sur le même son.",
          `${a.nouveau} finit par « ${a.fin} », comme ${a.connu}. Les autres finissent autrement.`,
          `On peut s'appuyer sur « ${a.connu} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orthlex_analogie_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce2_orthlex_analogie",
    difficulty: 3,
    theme: "neutral",
    hint: "Appelle à l'aide un mot que tu sais déjà écrire, et qui finit pareil.",
    tags: ["ce2", "orthographe-lexicale", "analogie", "methode"],
    generate: () => {
      const a = randomChoice(ANALOGIES);
      const bonne = `J'appelle un mot connu qui finit par le même son — « ${a.connu} » — et je recopie sa fin exactement : « ${a.fin} ».`;
      return {
        text: `Tu dois écrire « ${a.nouveau} » et tu hésites sur la fin.\n\nComment fais-tu ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // LE piège : écrire la fin au son, alors qu'un même son a plusieurs fins.
          "J'écris la fin comme je l'entends.",
          // L'erreur réelle : le bon outil, appliqué au mauvais bout du mot.
          "Je cherche un mot connu qui COMMENCE pareil.",
          "Je choisis la fin la plus courte.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'analogie consiste à écrire un mot nouveau en copiant la fin d'un mot déjà connu.",
          "Cherche un mot familier qui se termine par le même son, puis recopie sa fin exactement.",
          `${a.connu} → ${a.nouveau} : les deux finissent par « ${a.fin} ».`,
          `On peut s'appuyer sur « ${a.connu} », qui finit par « ${a.fin} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_ORTHLEX_LETTRE_MUETTE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_orthlex_lettre_muette_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce2_orthlex_lettre_muette",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche un mot de la famille : la lettre muette y devient sonore.",
    tags: ["ce2", "orthographe-lexicale", "lettre-muette", "template"],
    generate: () => {
      const l = randomChoice(LETTRES_MUETTES);
      return {
        text: `Complète : « ${l.phrase} »\n\n(aide-toi de « ${l.famille} »)`,
        format: "qcm" as const,
        choices: shuffle([l.mot, ...l.fautes]),
        expected: [l.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Beaucoup de mots se terminent par une lettre qu'on n'entend pas. Elle est là parce que la famille du mot la garde.",
          "Cherche un mot de la même famille, plus long : la lettre muette s'y entend.",
          `${l.famille} → on entend le « ${l.lettre} ». Donc « ${l.mot} » s'écrit avec un « ${l.lettre} » à la fin, même si on ne l'entend pas.`,
          `On écrit « ${l.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orthlex_lettre_muette_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce2_orthlex_lettre_muette",
    difficulty: 3,
    theme: "neutral",
    hint: "Quel mot de la famille fait entendre la dernière lettre ?",
    tags: ["ce2", "orthographe-lexicale", "lettre-muette", "template"],
    generate: () => {
      const l = randomChoice(LETTRES_MUETTES);
      const autres = shuffle(LETTRES_MUETTES.filter((x) => x.famille !== l.famille)).map(
        (x) => x.famille,
      );
      return {
        text: `Quel mot te permet de deviner la lettre muette à la fin de « ${l.mot} » ?`,
        format: "qcm" as const,
        choices: choix(l.famille, autres),
        expected: [l.famille],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La lettre finale muette d'un mot se retrouve dans les autres mots de sa famille.",
          "Allonge le mot : ajoute -er, -e, -ier, -iste… La lettre cachée se met à s'entendre.",
          `« ${l.mot} » → « ${l.famille} » : le « ${l.lettre} » se fait entendre, il faut donc l'écrire.`,
          `C'est « ${l.famille} » qui le dit.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orthlex_lettre_muette_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce2_orthlex_lettre_muette",
    difficulty: 3,
    theme: "neutral",
    hint: "Allonge le mot, et la lettre sort de son silence.",
    tags: ["ce2", "orthographe-lexicale", "lettre-muette", "methode"],
    generate: () => {
      const l = randomChoice(LETTRES_MUETTES);
      const bonne = `J'allonge le mot : je cherche un mot de la même famille — « ${l.famille} » — et la lettre se met à s'entendre.`;
      return {
        text: `Le mot « ${l.mot} » se termine par une lettre qu'on n'entend pas.\n\nComment la trouver sans la connaitre par cœur ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // LE piège : renoncer, alors que la notion existe justement pour
          // montrer que cette lettre se déduit.
          "On ne peut pas : il faut l'apprendre par cœur.",
          // L'erreur réelle : le pluriel ajoute un « s », il ne révèle rien.
          "Je mets le mot au pluriel : la lettre apparait.",
          "Je regarde la première lettre du mot.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La lettre finale muette n'est pas là par hasard : elle vient de la famille du mot.",
          "Allonge le mot — mets-le au féminin, ou trouve le verbe de la famille. La lettre se met à s'entendre.",
          `${l.mot} → ${l.famille} : le « ${l.lettre} » sort de son silence.`,
          `On cherche un mot de la même famille, comme « ${l.famille} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_ORTHLEX_DEFI — deux outils au lieu d'un
  ========================================================= */
  {
    kind: "template",
    id: "ce2_orthlex_defi_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce2_orthlex_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Toutes les fins ne se valent pas : une seule appartient à ce mot-là.",
    tags: ["ce2", "orthographe-lexicale", "defi", "template"],
    generate: () => {
      const l = randomChoice(LETTRES_MUETTES);
      const autresMots = shuffle(LETTRES_MUETTES.filter((x) => x.mot !== l.mot)).map((x) => x.mot);
      return {
        text: `« ${l.famille} » appartient à la famille de quel mot ?`,
        format: "qcm" as const,
        choices: choix(l.mot, autresMots),
        expected: [l.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une famille de mots se reconnait à son radical et à son idée, pas seulement à son début.",
          "Enlève la terminaison du mot long : ce qui reste est le mot court de la famille.",
          `${l.famille} − sa terminaison → ${l.mot}. Et au passage, le « ${l.lettre} » final de « ${l.mot} » s'explique.`,
          `« ${l.famille} » est de la famille de « ${l.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orthlex_defi_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce2_orthlex_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Un accent mal placé compte autant qu'une lettre oubliée.",
    tags: ["ce2", "orthographe-lexicale", "defi", "template"],
    generate: () => {
      const a = randomChoice(ACCENTS);
      const l = randomChoice(LETTRES_MUETTES);
      const bon = a.mot;
      return {
        text: `Un seul de ces quatre mots est écrit sans aucune faute. Lequel ?`,
        format: "qcm" as const,
        choices: shuffle([bon, a.fautes[0], l.fautes[0], l.fautes[1]]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Écrire un mot correctement, c'est tenir en même temps ses accents et ses lettres muettes.",
          "Relis chaque mot deux fois : une fois pour les accents, une fois pour la dernière lettre.",
          `« ${bon} » est juste — ${a.regle}. Les autres ont perdu une lettre finale ou un accent en route.`,
          `Le mot correct est « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_orthlex_defi_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce2_orthlex_defi",
    difficulty: 3,
    theme: "neutral",
    // Le cran de plus : le micro voisin demande UN geste ; le défi en demande
    // trois, et son piège le plus fin s'arrête au premier.
    hint: "Tu as trois outils, pas un seul. Si le premier ne répond pas, il en reste deux.",
    tags: ["ce2", "orthographe-lexicale", "defi", "methode"],
    generate: () => {
      const l = randomChoice(LETTRES_MUETTES);
      const bonne = `Trois gestes : chercher un mot de la famille — « ${l.famille} » —, mettre au féminin, ou penser à un mot connu qui finit pareil.`;
      return {
        text: `Tu dois écrire le mot « ${l.mot} » et tu ne sais pas s'il y a une lettre à la fin.\n\nQu'essaies-tu ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // Le piège fin : s'arrêter au premier outil, et conclure trop vite.
          "Un seul geste suffit : si la famille ne répond pas, c'est qu'il n'y a pas de lettre.",
          "J'écris le mot sans lettre finale : c'est le plus fréquent.",
          "Je demande à quelqu'un, c'est plus rapide.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Devant un mot difficile, on ne devine pas : on essaie des outils, l'un après l'autre.",
          "Trois gestes : chercher un mot de la famille, mettre au féminin, ou penser à un mot connu qui finit pareil.",
          `Pour « ${l.mot} », c'est la famille qui répond : « ${l.famille} » fait entendre le « ${l.lettre} ».`,
          `On cherche un mot de la même famille, comme « ${l.famille} ».`,
        ),
      };
    },
  },
];
