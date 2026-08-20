// lib/tutor-v4/questionBank/cp/francais/grammaire-phrase.bank.ts
//
// La grammaire de la phrase au CP, écrite à la main. La plus grosse notion de
// la classe : onze micro-compétences, dont six qui n'existaient pas dans
// l'ancienne liste — les trois types de phrases, les formes négative et
// exclamative, l'adjectif et le pronom personnel.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire), au mot près :
//   — « S'approprier progressivement la notion de phrase simple et ses trois
//     marqueurs essentiels : majuscule initiale, ponctuation finale forte,
//     et sens » ;
//   — « Comprendre que certains éléments (sujet/verbe et déterminants/noms/
//     adjectifs) fonctionnent ensemble et constituent un système » ;
//   — « S'appuyer sur la ponctuation pour reconnaitre les trois types de
//     phrases (déclarative, interrogative et impérative) » ;
//   — « Reconnaitre les formes négative et exclamative » ;
//   — « Constituer des corpus par classe de mots : noms, verbes, déterminants,
//     adjectifs, pronoms personnels » ;
//   — exemple de réussite : « Il sait ordonner et produire une phrase simple
//     (repère la place des groupes). »
//
// ⛔ Pas de sujet ni de complément NOMMÉS : le BO réserve « groupe sujet » au
// CE1 et les compléments au CE1 aussi. Au CP on dit « qui fait l'action ».
// ⛔ Pas d'adverbe : il arrive au CE2.
//
// LES DEUX PIÈGES DE LA NOTION :
//   — la question sans point d'interrogation, et la négation dont on oublie
//     la moitié : « ne » tout seul, ou « pas » tout seul ;
//   — le même mot change de classe selon la phrase : LA PORTE se referme,
//     et IL PORTE un cartable. On ne classe pas un mot tout seul, on le
//     classe dans sa phrase.

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

// Phrases étiquetées : chaque mot sait ce qu'il est.
// ⚠️ `groupe` est écrit à la main, pas recomposé : « une mangue mûre » et
// « le lagon bleu » mettent l'adjectif APRÈS le nom. Coller det + adj + nom
// donnait « une mûre mangue », qui ne se dit pas — et c'était proposé à
// l'élève comme la bonne réponse.
const PHRASES = [
  { phrase: "Le petit chien dort.", det: "Le", adj: "petit", nom: "chien", verbe: "dort", groupe: "Le petit chien", genre: "m", nombre: "s" },
  { phrase: "La jolie fleur pousse.", det: "La", adj: "jolie", nom: "fleur", verbe: "pousse", groupe: "La jolie fleur", genre: "f", nombre: "s" },
  { phrase: "Un gros letchi tombe.", det: "Un", adj: "gros", nom: "letchi", verbe: "tombe", groupe: "Un gros letchi", genre: "m", nombre: "s" },
  { phrase: "Les grands bateaux arrivent.", det: "Les", adj: "grands", nom: "bateaux", verbe: "arrivent", groupe: "Les grands bateaux", genre: "m", nombre: "p" },
  { phrase: "Ma petite sœur chante.", det: "Ma", adj: "petite", nom: "sœur", verbe: "chante", groupe: "Ma petite sœur", genre: "f", nombre: "s" },
  { phrase: "Le vieux margouillat dort.", det: "Le", adj: "vieux", nom: "margouillat", verbe: "dort", groupe: "Le vieux margouillat", genre: "m", nombre: "s" },
  { phrase: "Une mangue mûre tombe.", det: "Une", adj: "mûre", nom: "mangue", verbe: "tombe", groupe: "Une mangue mûre", genre: "f", nombre: "s" },
  { phrase: "Le lagon bleu brille.", det: "Le", adj: "bleu", nom: "lagon", verbe: "brille", groupe: "Le lagon bleu", genre: "m", nombre: "s" },
  { phrase: "Mon grand frère lit.", det: "Mon", adj: "grand", nom: "frère", verbe: "lit", groupe: "Mon grand frère", genre: "m", nombre: "s" },
  { phrase: "La vieille case tient.", det: "La", adj: "vieille", nom: "case", verbe: "tient", groupe: "La vieille case", genre: "f", nombre: "s" },
  { phrase: "Les petites filles rient.", det: "Les", adj: "petites", nom: "filles", verbe: "rient", groupe: "Les petites filles", genre: "f", nombre: "p" },
] as const;

const PHRASES_SIMPLES = [
  "Le margouillat monte sur le mur.",
  "Léa mange une mangue.",
  "Papa prépare un cari.",
  "Les enfants jouent dans la cour.",
  "Le bateau flotte sur le lagon.",
  "Tom ramasse des letchis.",
  "La maitresse ouvre la porte.",
  "Mon frère lit un livre.",
  "Le vent souffle fort.",
  "Le soleil brille sur la mer.",
  "La pluie tombe sur le toit.",
  "Le cari sent bon.",
  "Ma sœur dessine un margouillat.",
  "Le maitre écrit au tableau.",
  "Les oiseaux chantent le matin.",
  "Papa gare la voiture.",
  "Le piton fume au loin.",
  "Léa range ses affaires.",
  "Le chien court dans le sable.",
  "Nous partons à la plage.",
] as const;

// Suites de mots qui n'en sont pas : pas de verbe, ou aucun sens.
const NON_PHRASES = [
  "chien rouge mange le",
  "dans la et le",
  "courir vite très bien",
  "la maison et le arbre",
  "mangue Léa une",
  "sous le très pour",
] as const;

const INTERROGATIVES = [
  "Où est mon cahier ?",
  "Qui a pris la gomme ?",
  "Est-ce que tu viens ?",
  "Quand part le bateau ?",
  "Comment s'appelle ton chien ?",
  "Pourquoi le chien aboie-t-il ?",
  "Combien de letchis as-tu ?",
  "Que fais-tu ce matin ?",
  "Est-ce que le cari est prêt ?",
  "Où vont les bateaux ?",
] as const;

const IMPERATIVES = [
  "Ferme la porte.",
  "Range tes affaires.",
  "Viens ici.",
  "Écoute bien.",
  "Regarde le tableau.",
  "Ouvre ton cahier.",
  "Assieds-toi.",
  "Prends ton crayon.",
  "Ne cours pas dans la classe.",
  "Lève la main pour parler.",
] as const;

const EXCLAMATIVES = [
  "Quel beau lagon !",
  "Comme c'est joli !",
  "Quelle chaleur !",
  "Que ce cari est bon !",
  "Comme le piton est haut !",
  "Quel beau margouillat !",
  "Que c'est bon !",
  "Comme il pleut fort !",
] as const;

const NEGATIVES = [
  { positive: "Le chat dort.", negative: "Le chat ne dort pas." },
  { positive: "Léa mange une mangue.", negative: "Léa ne mange pas de mangue." },
  { positive: "Il pleut.", negative: "Il ne pleut pas." },
  { positive: "Tom joue dehors.", negative: "Tom ne joue pas dehors." },
  { positive: "Le bateau part.", negative: "Le bateau ne part pas." },
  { positive: "Papa dort.", negative: "Papa ne dort pas." },
  { positive: "Le vent souffle.", negative: "Le vent ne souffle pas." },
  { positive: "Elle chante.", negative: "Elle ne chante pas." },
  { positive: "Les letchis sont mûrs.", negative: "Les letchis ne sont pas mûrs." },
  { positive: "Je veux du cari.", negative: "Je ne veux pas de cari." },
  { positive: "Le chien aboie.", negative: "Le chien n'aboie pas." },
  { positive: "Tom a peur.", negative: "Tom n'a pas peur." },
] as const;

const PRONOMS = ["je", "tu", "il", "elle", "nous", "vous", "ils", "elles"] as const;
const DETERMINANTS = ["le", "la", "les", "un", "une", "des", "mon", "ma", "mes", "ton"] as const;

// Le même mot, deux classes, selon la phrase.
const MOTS_DOUBLES = [
  { mot: "porte", nom: "La porte est ouverte.", verbe: "Il porte un cartable." },
  { mot: "livre", nom: "Le livre est sur la table.", verbe: "Le facteur livre le colis." },
  { mot: "danse", nom: "La danse commence.", verbe: "Elle danse très bien." },
  { mot: "vole", nom: "Le vol dure deux heures.", verbe: "L'oiseau vole haut." },
] as const;

export const grammairePhraseBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_GRAM_PHRASE_RECONNAITRE — les trois marqueurs du BO
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_gram_phrase_reconnaitre_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_phrase_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Il faut trois choses pour qu'une suite de mots soit une phrase. Lesquelles ?",
    format: "qcm",
    choices: [
      "Une majuscule, un point, et un sens",
      "Une majuscule, un point, et cinq mots",
      "Un sens, un point, et une couleur",
      "Un verbe, un point, et une virgule",
    ],
    expected: ["Une majuscule, un point, et un sens"],
    comparator: "mcq_exact",
    hint: "Deux se voient aux extrémités, la troisième s'entend quand on la lit.",
    explanation: exp(
      "Une phrase commence par une majuscule, se termine par un point, et veut dire quelque chose.",
      "Vérifie les trois : le début, la fin, et le sens.",
      "« Le vent souffle fort. » a bien les trois. « courir vite très bien » n'a ni majuscule, ni point, ni sens complet.",
      "Il faut une majuscule, un point, et un sens.",
    ),
    tags: ["cp", "grammaire", "phrase", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "cp_gram_phrase_reconnaitre_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_phrase_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Trois marqueurs à vérifier : majuscule, point, et sens.",
    tags: ["cp", "grammaire", "phrase", "template"],
    generate: () => {
      const bonne = randomChoice(PHRASES_SIMPLES);
      const autres = shuffle(NON_PHRASES).slice(0, 3);
      return {
        text: "Laquelle de ces suites de mots est une vraie phrase ?",
        format: "qcm" as const,
        choices: makeChoices(bonne, autres),
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase commence par une majuscule, se termine par un point, et veut dire quelque chose.",
          "Regarde le début, la fin, puis demande-toi si tu comprends.",
          `« ${bonne} » a ses trois marqueurs. Les autres sont des mots posés côte à côte, sans majuscule, sans point, et sans rien dire.`,
          `La vraie phrase est « ${bonne} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_GRAM_MAJUSCULE_POINT
  ========================================================= */
  {
    kind: "template",
    id: "cp_gram_majuscule_point_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_majuscule_point",
    difficulty: 1,
    theme: "neutral",
    hint: "Regarde la toute première lettre, puis le tout dernier signe.",
    tags: ["cp", "grammaire", "ponctuation", "template"],
    generate: () => {
      const p = randomChoice(PHRASES_SIMPLES);
      const sansMaj = p.charAt(0).toLowerCase() + p.slice(1);
      const sansPoint = p.slice(0, -1);
      const sansRien = sansMaj.slice(0, -1);
      return {
        text: "Quelle phrase est correctement écrite ?",
        format: "qcm" as const,
        choices: shuffle([p, sansMaj, sansPoint, sansRien]),
        expected: [p],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase porte une majuscule au début et un point à la fin. Ce sont ses deux bornes.",
          "Vérifie d'abord la première lettre, ensuite le dernier signe.",
          `« ${p} » commence par une majuscule et finit par un point. Les autres ont perdu l'un, l'autre, ou les deux.`,
          `La phrase correcte est « ${p} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_gram_majuscule_point_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_majuscule_point",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi sert le point à la fin d'une phrase ?",
    format: "qcm",
    choices: [
      "Il dit que la phrase est finie",
      "Il sépare les syllabes",
      "Il montre que c'est joli",
      "Il remplace un mot",
    ],
    expected: ["Il dit que la phrase est finie"],
    comparator: "mcq_exact",
    hint: "Quand tu lis à voix haute, que fais-tu en le voyant ?",
    explanation: exp(
      "Le point marque la fin d'une phrase.",
      "Quand tu lis et que tu vois un point, tu t'arrêtes et tu respires.",
      "Sans point, on ne saurait pas où une idée s'arrête et où la suivante commence.",
      "Le point dit que la phrase est finie.",
    ),
    tags: ["cp", "grammaire", "ponctuation", "definition", "qcm"],
  },

  {
    kind: "template",
    id: "cp_gram_majuscule_point_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_majuscule_point",
    difficulty: 2,
    theme: "neutral",
    hint: "Une phrase a deux bornes : une au début, une à la fin.",
    tags: ["cp", "grammaire", "ponctuation", "template"],
    generate: () => {
      const p = randomChoice(PHRASES_SIMPLES);
      const casse = randomChoice(["majuscule", "point"] as const);
      const abimee =
        casse === "majuscule"
          ? p.charAt(0).toLowerCase() + p.slice(1)
          : p.slice(0, -1);
      return {
        text: `Qu'est-ce qui manque à cette phrase ?

« ${abimee} »`,
        format: "qcm" as const,
        choices: shuffle([
          "la majuscule au début",
          "le point à la fin",
          "un verbe",
          "rien, elle est correcte",
        ]),
        expected: [casse === "majuscule" ? "la majuscule au début" : "le point à la fin"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase a deux bornes : une majuscule au début, un point à la fin.",
          "Regarde la première lettre, puis le dernier signe.",
          casse === "majuscule"
            ? `« ${abimee} » commence par une minuscule. Il faut écrire « ${p} ».`
            : `« ${abimee} » s'arrête sans rien. Il faut écrire « ${p} ».`,
          `Il manque ${casse === "majuscule" ? "la majuscule au début" : "le point à la fin"}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_GRAM_ORDONNER_PHRASE
  ========================================================= */
  {
    kind: "template",
    id: "cp_gram_ordonner_phrase_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_ordonner_phrase",
    difficulty: 2,
    theme: "neutral",
    hint: "Commence par celui qui fait l'action, puis dis ce qu'il fait.",
    tags: ["cp", "grammaire", "ordre", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const mots = p.phrase.replace(/\.$/, "").split(" ");
      const melange1 = [mots[3], mots[0], mots[1], mots[2]].join(" ") + ".";
      const melange2 = [mots[1], mots[2], mots[3], mots[0]].join(" ") + ".";
      const melange3 = [mots[2], mots[3], mots[0], mots[1]].join(" ") + ".";
      return {
        text: `Remets ces mots dans l'ordre : ${shuffle(mots).map((m) => `« ${m} »`).join(", ")}`,
        format: "qcm" as const,
        choices: shuffle([p.phrase, melange1, melange2, melange3]),
        expected: [p.phrase],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Dans une phrase, les mots ne se mettent pas n'importe où : chacun a sa place.",
          "Cherche d'abord qui fait l'action, mets-le devant, puis dis ce qu'il fait.",
          `${p.det} ${p.adj} ${p.nom} : voilà celui dont on parle. Ensuite vient ce qu'il fait : ${p.verbe}.`,
          `La phrase est « ${p.phrase} »`,
        ),
      };
    },
  },

  /* =========================================================
     CP_GRAM_TYPES_PHRASES — la ponctuation décide
  ========================================================= */
  {
    kind: "template",
    id: "cp_gram_types_phrases_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_types_phrases",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde le signe tout à la fin : point, ou point d'interrogation ?",
    tags: ["cp", "grammaire", "types-phrases", "template"],
    generate: () => {
      const genre = randomChoice(["declarative", "interrogative", "imperative"] as const);
      const phrase =
        genre === "declarative"
          ? randomChoice(PHRASES_SIMPLES)
          : genre === "interrogative"
            ? randomChoice(INTERROGATIVES)
            : randomChoice(IMPERATIVES);
      const bon =
        genre === "declarative"
          ? "elle raconte quelque chose"
          : genre === "interrogative"
            ? "elle pose une question"
            : "elle donne un ordre";
      return {
        text: `Que fait cette phrase ?\n\n« ${phrase} »`,
        format: "qcm" as const,
        choices: shuffle([
          "elle raconte quelque chose",
          "elle pose une question",
          "elle donne un ordre",
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase peut raconter, questionner ou commander. La ponctuation aide à le voir.",
          "Regarde le signe de la fin, puis demande-toi ce que la phrase veut de toi.",
          genre === "interrogative"
            ? `« ${phrase} » finit par un point d'interrogation : elle attend une réponse.`
            : genre === "imperative"
              ? `« ${phrase} » te demande de faire quelque chose : c'est un ordre.`
              : `« ${phrase} » te dit simplement ce qui se passe.`,
          `Cette phrase ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_gram_types_phrases_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_types_phrases",
    difficulty: 3,
    theme: "neutral",
    text: "Tom écrit : « Où est mon cahier. » Qu'a-t-il oublié ?",
    format: "qcm",
    choices: [
      "Le point d'interrogation, car c'est une question",
      "La majuscule au début de la phrase",
      "Un verbe, car il n'y en a aucun",
      "Rien du tout, la phrase est correcte",
    ],
    expected: ["Le point d'interrogation, car c'est une question"],
    comparator: "mcq_exact",
    hint: "Lis la phrase à voix haute : ta voix monte-t-elle à la fin ?",
    explanation: exp(
      "Une phrase qui pose une question se termine par un point d'interrogation.",
      "Lis la phrase à voix haute : si ta voix monte à la fin, c'est une question.",
      "« Où est mon cahier ? » attend une réponse. Avec un simple point, on dirait que Tom raconte quelque chose.",
      "Il a oublié le point d'interrogation.",
    ),
    tags: ["cp", "grammaire", "types-phrases", "piege", "qcm"],
  },

  /* =========================================================
     CP_GRAM_FORME_NEGATIVE — ne… pas, les deux morceaux
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_gram_forme_negative_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_forme_negative",
    difficulty: 3,
    theme: "neutral",
    text: "Léa écrit : « Le chat ne dort. » Qu'est-ce qui manque ?",
    format: "qcm",
    choices: [
      "Le mot « pas », car la négation va à deux",
      "Le point à la fin de la phrase",
      "La majuscule au début du mot « le »",
      "Rien du tout, la phrase est correcte",
    ],
    expected: ["Le mot « pas », car la négation va à deux"],
    comparator: "mcq_exact",
    hint: "La négation, c'est deux petits mots qui encadrent le verbe.",
    explanation: exp(
      "Pour dire le contraire, on encadre le verbe avec DEUX petits mots : ne… pas.",
      "Vérifie que les deux morceaux sont là, un de chaque côté du verbe.",
      "Le chat NE dort PAS. À l'oral, on avale souvent le « ne » — mais à l'écrit, il faut les deux.",
      "Il manque le mot « pas ».",
    ),
    tags: ["cp", "grammaire", "negation", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_gram_forme_negative_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_forme_negative",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche les deux petits mots qui encadrent le verbe.",
    tags: ["cp", "grammaire", "negation", "template"],
    generate: () => {
      const n = randomChoice(NEGATIVES);
      const autres = shuffle(NEGATIVES.filter((x) => x.positive !== n.positive))
        .slice(0, 3)
        .map((x) => x.positive);
      return {
        text: "Quelle phrase dit NON (forme négative) ?",
        format: "qcm" as const,
        choices: makeChoices(n.negative, autres),
        expected: [n.negative],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La forme négative encadre le verbe avec deux petits mots : ne… pas.",
          "Cherche « ne » avant le verbe et « pas » après.",
          `« ${n.negative} » : les deux morceaux sont là. « ${n.positive} » dit oui.`,
          `La phrase négative est « ${n.negative} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_gram_forme_negative_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_forme_negative",
    difficulty: 3,
    theme: "neutral",
    hint: "Mets « ne » devant le verbe et « pas » derrière.",
    tags: ["cp", "grammaire", "negation", "template"],
    generate: () => {
      const n = randomChoice(NEGATIVES);
      const sansNe = n.negative.replace("ne ", "").replace("n'", "");
      const sansPas = n.negative.replace(" pas", "");
      return {
        text: `Mets cette phrase à la forme négative :\n\n« ${n.positive} »`,
        format: "qcm" as const,
        choices: shuffle([n.negative, sansNe, sansPas, n.positive]),
        expected: [n.negative],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La négation se fait à deux : « ne » devant le verbe, « pas » derrière.",
          "Repère le verbe, puis pose un morceau de chaque côté.",
          `« ${n.negative} ». Avec un seul des deux morceaux, la phrase boite.`,
          `La forme négative est « ${n.negative} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_GRAM_FORME_EXCLAMATIVE
  ========================================================= */
  {
    kind: "template",
    id: "cp_gram_forme_exclamative_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_forme_exclamative",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le point qui a un trait au-dessus.",
    tags: ["cp", "grammaire", "exclamation", "template"],
    generate: () => {
      const e = randomChoice(EXCLAMATIVES);
      const autres = shuffle([...PHRASES_SIMPLES]).slice(0, 3);
      return {
        text: "Quelle phrase montre une émotion, une surprise ou de l'admiration ?",
        format: "qcm" as const,
        choices: makeChoices(e, autres),
        expected: [e],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La forme exclamative sert à dire une émotion forte. Elle se termine par un point d'exclamation.",
          "Cherche le « ! » à la fin, et écoute si la phrase s'exclame.",
          `« ${e} » : on entend la surprise ou l'admiration. Les autres racontent calmement.`,
          `La phrase exclamative est « ${e} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_gram_forme_exclamative_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_forme_exclamative",
    difficulty: 1,
    theme: "neutral",
    text: "Quel signe termine une phrase exclamative ?",
    format: "qcm",
    choices: ["le point d'exclamation (!)", "le point (.)", "le point d'interrogation (?)", "la virgule (,)"],
    expected: ["le point d'exclamation (!)"],
    comparator: "mcq_exact",
    hint: "C'est un point avec un trait dressé au-dessus.",
    explanation: exp(
      "Le point d'exclamation marque une émotion : la surprise, la joie, la colère, l'admiration.",
      "Quand tu lis un « ! », ta voix se soulève.",
      "« Quel beau lagon ! » ne se lit pas comme « Le lagon est beau. »",
      "C'est le point d'exclamation (!).",
    ),
    tags: ["cp", "grammaire", "exclamation", "definition", "qcm"],
  },

  /* =========================================================
     CP_GRAM_NOM_VERBE
  ========================================================= */
  {
    kind: "template",
    id: "cp_gram_nom_verbe_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_nom_verbe",
    difficulty: 2,
    theme: "neutral",
    hint: "Le verbe dit ce qu'on FAIT. Le nom dit ce que c'est.",
    tags: ["cp", "grammaire", "nom-verbe", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const chercheVerbe = randomChoice([true, false]);
      const bon = chercheVerbe ? p.verbe : p.nom;
      const autres = [p.det, p.adj, chercheVerbe ? p.nom : p.verbe];
      return {
        text: `Dans « ${p.phrase} », quel mot est ${chercheVerbe ? "le VERBE" : "le NOM"} ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, autres),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le nom dit ce qu'est la chose ou la personne. Le verbe dit ce qu'elle fait.",
          chercheVerbe
            ? "Demande-toi : qu'est-ce qui se passe dans cette phrase ?"
            : "Demande-toi : de quoi ou de qui parle-t-on ?",
          chercheVerbe
            ? `Dans « ${p.phrase} », l'action est « ${p.verbe} ».`
            : `Dans « ${p.phrase} », on parle du « ${p.nom} ».`,
          `${chercheVerbe ? "Le verbe" : "Le nom"} est « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_gram_nom_verbe_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_nom_verbe",
    difficulty: 3,
    theme: "neutral",
    hint: "Un mot tout seul ne dit pas ce qu'il est. Regarde la phrase.",
    tags: ["cp", "grammaire", "nom-verbe", "piege", "template"],
    generate: () => {
      const m = randomChoice(MOTS_DOUBLES);
      const chercheNom = randomChoice([true, false]);
      const bon = chercheNom ? m.nom : m.verbe;
      const autres = shuffle(
        MOTS_DOUBLES.filter((x) => x.mot !== m.mot).flatMap((x) => [x.nom, x.verbe]),
      ).slice(0, 3);
      return {
        text: `Dans quelle phrase « ${m.mot} » est-il ${chercheNom ? "un NOM" : "un VERBE"} ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, autres),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot ne porte pas sa classe sur le dos : c'est la phrase qui la lui donne.",
          "Regarde ce que fait le mot dans la phrase : est-ce une chose dont on parle, ou une action ?",
          `« ${m.nom} » — ici c'est une chose. « ${m.verbe} » — ici c'est une action. Le même mot, deux métiers.`,
          `C'est dans « ${bon} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_GRAM_DETERMINANT
  ========================================================= */
  {
    kind: "template",
    id: "cp_gram_determinant_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_determinant",
    difficulty: 1,
    theme: "neutral",
    hint: "Le déterminant est le petit mot planté juste devant le nom.",
    tags: ["cp", "grammaire", "determinant", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      return {
        text: `Dans « ${p.phrase} », quel mot est le déterminant ?`,
        format: "qcm" as const,
        choices: makeChoices(p.det, [p.nom, p.adj, p.verbe]),
        expected: [p.det],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le déterminant se place juste devant le nom : le, la, les, un, une, des, mon, ma, mes…",
          "Cherche le nom, puis regarde le petit mot qui le précède.",
          `Dans « ${p.phrase} », le nom est « ${p.nom} », et devant lui il y a « ${p.det} ».`,
          `Le déterminant est « ${p.det} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_gram_determinant_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_determinant",
    difficulty: 2,
    theme: "neutral",
    hint: "Essaie de le poser devant un nom : « ___ chien ».",
    tags: ["cp", "grammaire", "determinant", "template"],
    generate: () => {
      const det = randomChoice(DETERMINANTS);
      const autres = shuffle([
        ...new Set([...PHRASES.map((p) => p.verbe), ...PHRASES.map((p) => p.adj)]),
      ]).slice(0, 3);
      return {
        text: "Parmi ces mots, lequel est un déterminant ?",
        format: "qcm" as const,
        choices: makeChoices(det, autres),
        expected: [det],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le déterminant annonce le nom : le, la, les, un, une, des, mon, ma, mes…",
          "Essaie de poser le mot devant un nom : « ___ chien ». Si ça marche, c'est un déterminant.",
          `« ${det} chien » se dit. Les autres mots ne peuvent pas se mettre là.`,
          `Le déterminant est « ${det} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_GRAM_ADJECTIF
  ========================================================= */
  {
    kind: "template",
    id: "cp_gram_adjectif_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_adjectif",
    difficulty: 2,
    theme: "neutral",
    hint: "L'adjectif répond à la question « comment est-il ? ».",
    tags: ["cp", "grammaire", "adjectif", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      return {
        text: `Dans « ${p.phrase} », quel mot dit COMMENT est le ${p.nom} ?`,
        format: "qcm" as const,
        choices: makeChoices(p.adj, [p.det, p.nom, p.verbe]),
        expected: [p.adj],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'adjectif décrit le nom : il dit comment il est.",
          "Pose la question « comment est-il ? » et cherche le mot qui répond.",
          `Comment est le ${p.nom} ? Il est ${p.adj}. C'est l'adjectif.`,
          `L'adjectif est « ${p.adj} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_gram_adjectif_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_adjectif",
    difficulty: 2,
    theme: "neutral",
    text: "Si on enlève « petit » de « Le petit chien dort. », que se passe-t-il ?",
    format: "qcm",
    choices: [
      "La phrase marche encore, mais on en sait moins",
      "La phrase ne veut plus rien dire du tout",
      "Le chien disparait de la phrase avec lui",
      "Il faut enlever le point de la fin aussi",
    ],
    expected: ["La phrase marche encore, mais on en sait moins"],
    comparator: "mcq_exact",
    hint: "Essaie : « Le chien dort. » Est-ce que ça se dit ?",
    explanation: exp(
      "L'adjectif ajoute une précision au nom. La phrase tient debout sans lui, mais elle en dit moins.",
      "Enlève le mot et relis : si la phrase se dit encore, c'est un adjectif.",
      "« Le chien dort. » se dit très bien. On a juste perdu sa taille.",
      "La phrase marche encore, mais on sait moins de choses.",
    ),
    tags: ["cp", "grammaire", "adjectif", "methode", "qcm"],
  },

  {
    kind: "template",
    id: "cp_gram_adjectif_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_adjectif",
    difficulty: 2,
    theme: "neutral",
    hint: "L'adjectif dit comment est la chose. Essaie : « un chien ___ ».",
    tags: ["cp", "grammaire", "adjectif", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const autres = shuffle([
        ...new Set([
          ...PHRASES.map((x) => x.nom),
          ...PHRASES.map((x) => x.verbe),
          ...DETERMINANTS,
        ]),
      ]).slice(0, 3);
      return {
        text: "Parmi ces mots, lequel est un adjectif ?",
        format: "qcm" as const,
        choices: makeChoices(p.adj, autres),
        expected: [p.adj],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'adjectif décrit : il dit comment est la chose ou la personne.",
          "Essaie de placer le mot après « un chien… ». Si ça décrit le chien, c'est un adjectif.",
          `« un chien ${p.adj} » se dit : ${p.adj} décrit le chien. Les autres mots nomment, agissent ou annoncent.`,
          `L'adjectif est « ${p.adj} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_GRAM_PRONOM
  ========================================================= */
  {
    kind: "template",
    id: "cp_gram_pronom_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_pronom",
    difficulty: 2,
    theme: "neutral",
    hint: "Le pronom remplace celui dont on vient de parler.",
    tags: ["cp", "grammaire", "pronom", "template"],
    generate: () => {
      const pronom = randomChoice(PRONOMS);
      const autres = shuffle([
        ...new Set([...PHRASES.map((p) => p.nom), ...PHRASES.map((p) => p.adj)]),
      ]).slice(0, 3);
      return {
        text: "Parmi ces mots, lequel est un pronom personnel ?",
        format: "qcm" as const,
        choices: makeChoices(pronom, autres),
        expected: [pronom],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les pronoms personnels remplacent un nom : je, tu, il, elle, nous, vous, ils, elles.",
          "Récite la liste des huit dans ta tête.",
          `« ${pronom} » en fait partie. Les autres mots désignent des choses ou les décrivent.`,
          `Le pronom personnel est « ${pronom} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_gram_pronom_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_pronom",
    difficulty: 3,
    theme: "neutral",
    hint: "Un seul, ou plusieurs ? Masculin, ou féminin ?",
    tags: ["cp", "grammaire", "pronom", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const bon =
        p.nombre === "p"
          ? (p.genre === "f" ? "elles" : "ils")
          : (p.genre === "f" ? "elle" : "il");
      return {
        text: `Par quel pronom peut-on remplacer « ${p.groupe} » ?`,
        format: "qcm" as const,
        choices: shuffle(["il", "elle", "ils", "elles"]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un pronom personnel remplace un groupe de mots pour éviter de le répéter.",
          "Demande-toi : combien sont-ils ? Et est-ce masculin ou féminin ?",
          `« ${p.groupe} » → « ${bon} ${p.verbe} ».`,
          `On peut le remplacer par « ${bon} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_GRAM_DEFI — deux choses à vérifier
  ========================================================= */
  {
    kind: "template",
    id: "cp_gram_defi_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde d'abord ce que fait la phrase, ensuite son signe de fin.",
    tags: ["cp", "grammaire", "defi", "template"],
    generate: () => {
      const cas = randomChoice([
        { phrase: randomChoice(INTERROGATIVES), type: "une question", signe: "?" },
        { phrase: randomChoice(EXCLAMATIVES), type: "une exclamation", signe: "!" },
        { phrase: randomChoice(PHRASES_SIMPLES), type: "une phrase qui raconte", signe: "." },
      ]);
      const bon = `${cas.type}, et elle finit par « ${cas.signe} »`;
      return {
        text: `Qu'est-ce que c'est, et par quel signe cela se termine-t-il ?\n\n« ${cas.phrase} »`,
        format: "qcm" as const,
        choices: shuffle([
          "une question, et elle finit par « ? »",
          "une exclamation, et elle finit par « ! »",
          "une phrase qui raconte, et elle finit par « . »",
          "un ordre, et elle finit par « ? »",
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le signe de la fin dit ce que fait la phrase : le point raconte, le point d'interrogation demande, le point d'exclamation s'exclame.",
          "Lis la phrase à voix haute, puis regarde son dernier signe : les deux doivent aller ensemble.",
          `« ${cas.phrase} » est ${cas.type} et finit bien par « ${cas.signe} ».`,
          `C'est ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_gram_defi_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Trouve d'abord le nom, puis le mot qui le décrit.",
    tags: ["cp", "grammaire", "defi", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const bon = p.groupe;
      const autres = shuffle(PHRASES.filter((x) => x.nom !== p.nom))
        .slice(0, 3)
        .map((x) => x.groupe);
      return {
        text: `Dans « ${p.phrase} », quel groupe de mots dit DE QUI ou DE QUOI on parle ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, autres),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le déterminant, l'adjectif et le nom marchent ensemble : ils forment un groupe qui tient debout tout seul.",
          "Trouve le nom, puis emporte avec lui le petit mot devant et celui qui le décrit.",
          `« ${bon} » : voilà de qui on parle. Ensuite seulement vient ce qu'il fait, « ${p.verbe} ».`,
          `Le groupe est « ${bon} ».`,
        ),
      };
    },
  },

  /* ═══════════════════════════════════════════════════════════════════════
     LE SECOND ITEM (20/08/2026)
     ---------------------------------------------------------------------
     `cp_gram_ordonner_phrase` portait UN SEUL item : la ligne cliquée ouvrait
     `cp_gram_phrase_reconnaitre`. Celui-ci resserre sur le PREMIER mot au lieu
     de demander la phrase entière — l'élève qui ne sait pas encore tout ranger
     peut déjà savoir par où l'on commence.
     ═══════════════════════════════════════════════════════════════════════ */
  {
    kind: "template",
    id: "cp_gram_ordonner_phrase_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "cp_gram_ordonner_phrase",
    difficulty: 2,
    theme: "neutral",
    hint: "Une phrase commence par une majuscule. Cherche ce mot-là.",
    tags: ["cp", "grammaire", "ordonner", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const mots = p.phrase.replace(/\.$/, "").split(" ");
      const premier = mots[0];
      return {
        text: `Ces mots forment une phrase, mais ils sont mal rangés :\n\n${shuffle(mots).map((m) => `« ${m} »`).join(", ")}\n\nQuel mot se place en premier ?`,
        format: "qcm" as const,
        choices: shuffle(mots),
        expected: [premier],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase se range dans un ordre : d'abord de qui on parle, ensuite ce qu'il fait. Et le premier mot porte la majuscule.",
          "Le premier exercice demandait de ranger toute la phrase. Celui-ci ne demande que le début : cherche le mot qui commence par une majuscule.",
          `La phrase est « ${p.phrase} » : elle commence par « ${premier} ».`,
          `Le premier mot est « ${premier} ».`,
        ),
      };
    },
  },
];
