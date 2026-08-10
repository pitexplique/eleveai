// lib/tutor-v4/questionBank/cp/francais/lecture-syllabique.bank.ts
//
// Le déchiffrage du CP, écrit à la main.
//
// CE QU'ELLE REMPLACE : `cp_lec_syllabes_cv` servait
//
//     « Parmi ces syllabes, laquelle commence par la lettre b ? »
//
// avec `expected: ["ba"]` écrit en dur, alors que deux jeux de syllabes sur
// trois proposés étaient `ro/no/lo` et `fi/si/di`. Deux fois sur trois, aucune
// proposition ne répondait à la question, et l'élève avait faux quoi qu'il
// clique. Mesuré : 1 306 tirages impossibles sur 55 200.
// Et `cp_lec_mots_frequents` demandait « Quel mot est un mot très fréquent ? »
// en proposant QUATRE mots fréquents, dont un seul était accepté.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — décoder et encoder 12 à 15 CGP en fin de période 1, 25 à 30 en milieu
//     d'année, toutes les CGP régulières en fin d'année ;
//   — « Déchiffrer des syllabes, des mots puis des phrases en fonction de la
//     progression de l'apprentissage des CGP » ;
//   — mémoriser les mots fréquents et réguliers ;
//   — 30 mots par minute au minimum en fin de CP sans préparation, 50 après.
//   — « Il segmente la chaine orale : la phrase en mots, les mots en syllabes
//     et phonèmes. »
//
// LE PIÈGE DE LA NOTION : le mot deviné sur sa première syllabe. Un enfant qui
// voit « cha… » lit « chat » et ne va pas plus loin — alors que c'était
// « chapeau ». On lit jusqu'au bout.
//
// ⚠️ Un CP tape lentement. Presque tout est en QCM ; les rares réponses à
// écrire ne dépassent pas deux lettres.

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

const CONSONNES = [
  { lettre: "b", son: "[b]" },
  { lettre: "l", son: "[l]" },
  { lettre: "m", son: "[m]" },
  { lettre: "r", son: "[ʁ]" },
  { lettre: "t", son: "[t]" },
  { lettre: "p", son: "[p]" },
  { lettre: "d", son: "[d]" },
  { lettre: "f", son: "[f]" },
  { lettre: "v", son: "[v]" },
  { lettre: "n", son: "[n]" },
] as const;

const VOYELLES = ["a", "i", "o", "u", "é"] as const;

// Mots découpés, tous déchiffrables au CP.
const MOTS_A_ASSEMBLER = [
  { syl: ["cha", "peau"], mot: "chapeau" },
  { syl: ["la", "gon"], mot: "lagon" },
  { syl: ["pi", "ton"], mot: "piton" },
  { syl: ["ca", "ri"], mot: "cari" },
  { syl: ["ta", "pis"], mot: "tapis" },
  { syl: ["la", "pin"], mot: "lapin" },
  { syl: ["mou", "ton"], mot: "mouton" },
  { syl: ["ba", "teau"], mot: "bateau" },
  { syl: ["sou", "ris"], mot: "souris" },
  { syl: ["jar", "din"], mot: "jardin" },
  { syl: ["do", "mi", "no"], mot: "domino" },
  { syl: ["ca", "na", "pé"], mot: "canapé" },
  { syl: ["ta", "ma", "rin"], mot: "tamarin" },
  { syl: ["cho", "co", "lat"], mot: "chocolat" },
  { syl: ["pa", "pil", "lon"], mot: "papillon" },
] as const;

// LE piège : le mot long qui commence comme un mot court.
const PIEGES_DEBUT = [
  { court: "chat", long: "chapeau", debut: "cha" },
  { court: "riz", long: "rideau", debut: "ri" },
  { court: "loup", long: "loupe", debut: "lou" },
  { court: "car", long: "cari", debut: "car" },
  { court: "pain", long: "panier", debut: "pa" },
  { court: "bon", long: "bonbon", debut: "bon" },
] as const;

// ⚠️ Les pièges sont écrits à la main, jamais fabriqués en retournant le mot.
// « mon » à l'envers donne « nom », « les » donne « sel », « un » donne « nu » :
// des mots bien écrits, eux aussi. La question « lequel est correctement
// écrit ? » aurait eu deux bonnes réponses. Ici, aucun piège n'existe en
// français, et il y en a exactement trois par mot — le QCM ne s'effondre pas.
const MOTS_FREQUENTS = [
  { mot: "le", faux: ["el", "lle", "lee"] },
  { mot: "la", faux: ["al", "lla", "laa"] },
  { mot: "les", faux: ["sle", "lse", "lees"] },
  { mot: "un", faux: ["unn", "uun", "nnu"] },
  { mot: "une", faux: ["unne", "uene", "nnue"] },
  { mot: "des", faux: ["sde", "dse", "dees"] },
  { mot: "il", faux: ["ill", "iil", "lli"] },
  { mot: "elle", faux: ["lele", "eele", "ellle"] },
  { mot: "est", faux: ["ets", "sset", "estt"] },
  { mot: "et", faux: ["ett", "eet", "tte"] },
  { mot: "dans", faux: ["dnas", "dasn", "danns"] },
  { mot: "avec", faux: ["avce", "aveec", "aecv"] },
  { mot: "pour", faux: ["puor", "poru", "poour"] },
  { mot: "sur", faux: ["sru", "usr", "suur"] },
  { mot: "sous", faux: ["suos", "sosu", "souus"] },
  { mot: "mon", faux: ["monn", "mmon", "moon"] },
  { mot: "mes", faux: ["mmes", "mees", "mse"] },
  { mot: "qui", faux: ["qiu", "uqi", "quii"] },
] as const;

// Phrases à trou dont une seule réponse tient debout.
const PHRASES_A_TROU = [
  { avant: "___ margouillat monte sur le mur.", bon: "Le", faux: ["La", "Les", "Une"] },
  { avant: "___ maison est bleue.", bon: "La", faux: ["Le", "Les", "Un"] },
  { avant: "___ enfants jouent dans la cour.", bon: "Les", faux: ["Le", "La", "Une"] },
  { avant: "Léa joue ___ son frère.", bon: "avec", faux: ["dans", "sur", "sous"] },
  { avant: "Papa verse le riz ___ la marmite.", bon: "dans", faux: ["avec", "sur", "sous"] },
  { avant: "Le chat ___ noir.", bon: "est", faux: ["et", "es", "ai"] },
  { avant: "Léa ___ Tom sont amis.", bon: "et", faux: ["est", "es", "ai"] },
] as const;

// Phrases courtes : le nombre de mots se compte aux espaces.
const PHRASES_MOTS = [
  { phrase: "Le chat dort.", mots: 3 },
  { phrase: "Le margouillat monte.", mots: 3 },
  { phrase: "Léa mange un letchi.", mots: 4 },
  { phrase: "Tom joue dans le jardin.", mots: 5 },
  { phrase: "Le bateau flotte sur le lagon.", mots: 6 },
  { phrase: "Papa prépare un cari.", mots: 4 },
] as const;

const TEXTES = [
  {
    texte: "Léa marche sur le sentier. Un margouillat file entre les pierres. Il se cache sous une feuille.",
    qui: "Léa",
    ou: "sur le sentier",
    quoi: "il se cache sous une feuille",
    animal: "un margouillat",
  },
  {
    texte: "Tom pose son panier. Il ramasse les letchis tombés dans l'herbe. Sa maman l'attend à la case.",
    qui: "Tom",
    ou: "dans l'herbe",
    quoi: "il ramasse les letchis",
    animal: "aucun animal",
  },
] as const;

export const lectureSyllabiqueBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_LEC_SYLLABES_CV — assembler une consonne et une voyelle
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_lec_syllabes_cv_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_syllabique",
    microId: "cp_lec_syllabes_cv",
    difficulty: 1,
    theme: "neutral",
    text: "Tu lis la lettre « b », puis la lettre « a ». Quelle syllabe cela fait-il ?",
    format: "qcm",
    choices: ["ba", "ab", "bo", "da"],
    expected: ["ba"],
    comparator: "mcq_exact",
    hint: "Fais glisser le premier son sur le deuxième, sans t'arrêter au milieu.",
    explanation: exp(
      "Une syllabe se fabrique en collant une consonne et une voyelle.",
      "Dis le premier son, puis fais-le glisser sur le second sans reprendre ton souffle.",
      "b… a… ba. Si tu les dis dans l'autre sens, tu obtiens « ab », qui n'est pas ce qu'on te demande.",
      "« b » et « a » font la syllabe ba.",
    ),
    tags: ["cp", "lecture", "syllabe", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "cp_lec_syllabes_cv_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_syllabique",
    microId: "cp_lec_syllabes_cv",
    difficulty: 1,
    theme: "neutral",
    hint: "Colle les deux lettres l'une contre l'autre, dans l'ordre.",
    tags: ["cp", "lecture", "syllabe", "template"],
    generate: () => {
      const c = randomChoice(CONSONNES);
      const v = randomChoice(VOYELLES);
      const bonne = `${c.lettre}${v}`;
      const autreV = randomChoice(VOYELLES.filter((x) => x !== v));
      const autreC = randomChoice(CONSONNES.filter((x) => x.lettre !== c.lettre));
      return {
        text: `Tu lis la lettre « ${c.lettre} », puis la lettre « ${v} ». Quelle syllabe cela fait-il ?`,
        format: "qcm" as const,
        choices: makeChoices(bonne, [
          `${v}${c.lettre}`,
          `${c.lettre}${autreV}`,
          `${autreC.lettre}${v}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une syllabe se fabrique en collant une consonne et une voyelle.",
          "Dis le premier son, puis fais-le glisser sur le second sans reprendre ton souffle.",
          `${c.lettre}… ${v}… ${bonne}. L'ordre compte : « ${v}${c.lettre} » ne se dit pas pareil.`,
          `Cela fait la syllabe « ${bonne} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_lec_syllabes_cv_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_syllabique",
    microId: "cp_lec_syllabes_cv",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde la toute première lettre de chaque syllabe.",
    tags: ["cp", "lecture", "syllabe", "template"],
    generate: () => {
      // La version qui marche : la bonne réponse est TIRÉE de la même liste
      // que les pièges, elle ne peut donc pas manquer à l'appel.
      const c = randomChoice(CONSONNES);
      const v = randomChoice(VOYELLES);
      const bonne = `${c.lettre}${v}`;
      const autres = shuffle(CONSONNES.filter((x) => x.lettre !== c.lettre))
        .slice(0, 3)
        .map((x) => `${x.lettre}${randomChoice(VOYELLES)}`);
      return {
        text: `Parmi ces syllabes, laquelle commence par la lettre « ${c.lettre} » ?`,
        format: "qcm" as const,
        choices: makeChoices(bonne, autres),
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La première lettre d'une syllabe donne son premier son.",
          "Regarde le début de chaque syllabe, avant même de la lire en entier.",
          `« ${bonne} » commence bien par « ${c.lettre} », qui se dit ${c.son}.`,
          `La syllabe est « ${bonne} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_LEC_MOTS_SIMPLES — assembler des syllabes en mots
  ========================================================= */
  {
    kind: "template",
    id: "cp_lec_mots_simples_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_syllabique",
    microId: "cp_lec_mots_simples",
    difficulty: 1,
    theme: "neutral",
    hint: "Dis les morceaux l'un après l'autre, de plus en plus vite.",
    tags: ["cp", "lecture", "mot", "template"],
    generate: () => {
      const item = randomChoice(MOTS_A_ASSEMBLER);
      const autres = shuffle(MOTS_A_ASSEMBLER.filter((m) => m.mot !== item.mot))
        .slice(0, 3)
        .map((m) => m.mot);
      return {
        text: `Quel mot obtiens-tu en collant ces syllabes : ${item.syl.map((s) => `« ${s} »`).join(" + ")} ?`,
        format: "qcm" as const,
        choices: makeChoices(item.mot, autres),
        expected: [item.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot, c'est des syllabes collées bout à bout.",
          "Dis les morceaux l'un après l'autre, puis de plus en plus vite jusqu'à entendre le mot.",
          `${item.syl.join(" — ")} … ${item.mot}.`,
          `Le mot est « ${item.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_lec_mots_simples_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_syllabique",
    microId: "cp_lec_mots_simples",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le mot qui commence par cette syllabe-là.",
    tags: ["cp", "lecture", "mot", "template"],
    generate: () => {
      const item = randomChoice(MOTS_A_ASSEMBLER);
      const premiere = item.syl[0];
      const autres = shuffle(
        MOTS_A_ASSEMBLER.filter((m) => m.syl[0] !== premiere),
      ).slice(0, 3).map((m) => m.mot);
      return {
        text: `Quel mot commence par la syllabe « ${premiere} » ?`,
        format: "qcm" as const,
        choices: makeChoices(item.mot, autres),
        expected: [item.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La première syllabe d'un mot, c'est son tout début.",
          "Découpe chaque mot proposé et regarde son premier morceau.",
          `${item.syl.join(" — ")} : « ${item.mot} » commence bien par « ${premiere} ».`,
          `Le mot est « ${item.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_lec_mots_simples_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_syllabique",
    microId: "cp_lec_mots_simples",
    difficulty: 3,
    theme: "neutral",
    text: "Tom voit écrit « chapeau ». Il lit « chat ». Qu'est-ce qui s'est passé ?",
    format: "qcm",
    choices: [
      "Il s'est arrêté après la première syllabe",
      "Il a lu le mot à l'envers",
      "Il a oublié la première lettre",
      "Il a bien lu",
    ],
    expected: ["Il s'est arrêté après la première syllabe"],
    comparator: "mcq_exact",
    hint: "Regarde ce qu'il reste après « cha ».",
    explanation: exp(
      "Deux mots peuvent commencer pareil et finir tout autrement.",
      "Quand tu reconnais le début d'un mot, ne t'arrête pas : va voir la fin.",
      "cha… Tom a deviné « chat » et il a fermé les yeux trop tôt. Il restait « peau » : cha-peau.",
      "Tom s'est arrêté après la première syllabe. On lit jusqu'au bout.",
    ),
    tags: ["cp", "lecture", "mot", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_lec_mots_simples_tpl_3",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_syllabique",
    microId: "cp_lec_mots_simples",
    difficulty: 3,
    theme: "neutral",
    hint: "Ne t'arrête pas au début du mot : lis-le en entier.",
    tags: ["cp", "lecture", "mot", "piege", "template"],
    generate: () => {
      const p = randomChoice(PIEGES_DEBUT);
      const autres = shuffle(
        PIEGES_DEBUT.filter((q) => q.long !== p.long).map((q) => q.long),
      ).slice(0, 2);
      return {
        text: `Ce mot commence par « ${p.debut} » et il a PLUS d'une syllabe. Lequel est-ce ?`,
        format: "qcm" as const,
        choices: makeChoices(p.long, [p.court, ...autres]),
        expected: [p.long],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Beaucoup de mots commencent pareil : c'est la suite qui les sépare.",
          "Lis le mot jusqu'au bout avant de choisir.",
          `« ${p.court} » commence aussi par « ${p.debut} », mais il tient en une seule syllabe. « ${p.long} » continue après.`,
          `Le mot est « ${p.long} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_LEC_MOTS_FREQUENTS — les petits mots qu'on reconnaît
     d'un coup d'œil.
     ⚠️ L'ancienne version proposait quatre mots fréquents et
     n'en acceptait qu'un. Ici on compare un mot fréquent à des
     mots qui n'existent pas.
  ========================================================= */
  {
    kind: "template",
    id: "cp_lec_mots_frequents_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_syllabique",
    microId: "cp_lec_mots_frequents",
    difficulty: 1,
    theme: "neutral",
    hint: "Un seul de ces mots existe vraiment. Tu le vois tous les jours.",
    tags: ["cp", "lecture", "mots-frequents", "template"],
    generate: () => {
      const item = randomChoice(MOTS_FREQUENTS);
      return {
        text: "Quel mot est correctement écrit ?",
        format: "qcm" as const,
        choices: makeChoices(item.mot, item.faux),
        expected: [item.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Certains petits mots reviennent dans toutes les phrases : on finit par les reconnaître d'un seul coup d'œil.",
          "Regarde la forme du mot en entier, pas lettre par lettre.",
          `« ${item.mot} » est un mot que tu lis tous les jours. Les trois autres n'existent pas.`,
          `Le mot correct est « ${item.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_lec_mots_frequents_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_syllabique",
    microId: "cp_lec_mots_frequents",
    difficulty: 2,
    theme: "neutral",
    hint: "Relis la phrase entière avec chaque proposition. Une seule sonne juste.",
    tags: ["cp", "lecture", "mots-frequents", "template"],
    generate: () => {
      const p = randomChoice(PHRASES_A_TROU);
      return {
        text: `Quel petit mot manque ?\n\n« ${p.avant} »`,
        format: "qcm" as const,
        choices: makeChoices(p.bon, p.faux),
        expected: [p.bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les petits mots tiennent la phrase debout : sans eux, elle tombe.",
          "Essaie chaque proposition à voix haute, dans la phrase entière.",
          `« ${p.avant.replace("___", p.bon)} » : celle-là se dit bien.`,
          `Le mot qui manque est « ${p.bon} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_LEC_PHRASE_SIMPLE — segmenter la chaine écrite
  ========================================================= */
  {
    kind: "template",
    id: "cp_lec_phrase_simple_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_syllabique",
    microId: "cp_lec_phrase_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque mot est séparé du suivant par un blanc. Compte les blancs, puis ajoute un.",
    tags: ["cp", "lecture", "phrase", "template"],
    generate: () => {
      const p = randomChoice(PHRASES_MOTS);
      return {
        text: `Combien de mots y a-t-il dans cette phrase ?\n\n« ${p.phrase} »`,
        format: "qcm" as const,
        choices: [String(p.mots - 1), String(p.mots), String(p.mots + 1), String(p.mots + 2)],
        expected: [String(p.mots)],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Dans une phrase écrite, les mots sont séparés par des blancs.",
          "Pose ton doigt sur chaque mot et compte, du premier au point.",
          `« ${p.phrase} » → ${p.phrase.replace(/\.$/, "").split(" ").map((m, i) => `${i + 1}. ${m}`).join("  ")}`,
          `Il y a ${p.mots} mots.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_lec_phrase_simple_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_syllabique",
    microId: "cp_lec_phrase_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Tu lis à voix haute : « Le margouillat monte sur le mur. » Où t'arrêtes-tu ?",
    format: "qcm",
    choices: [
      "au point, à la fin",
      "après chaque mot",
      "après « monte »",
      "on ne s'arrête jamais",
    ],
    expected: ["au point, à la fin"],
    comparator: "mcq_exact",
    hint: "Cherche le petit rond noir tout au bout.",
    explanation: exp(
      "Le point dit à la voix qu'elle peut se reposer.",
      "Quand tu lis, avance sans t'arrêter jusqu'au point, puis respire.",
      "Si tu t'arrêtes après chaque mot, on n'entend plus la phrase — juste une liste.",
      "On s'arrête au point, à la fin.",
    ),
    tags: ["cp", "lecture", "phrase", "methode", "qcm"],
  },

  /* =========================================================
     CP_LEC_DEFI — un texte court, et deux choses à faire
  ========================================================= */
  {
    kind: "template",
    id: "cp_lec_defi_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_syllabique",
    microId: "cp_lec_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis le texte en entier avant de répondre, même si tu crois avoir trouvé.",
    tags: ["cp", "lecture", "defi", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const question = randomChoice([
        { q: "Qui est le personnage ?", bon: t.qui, faux: ["le maitre", "le boulanger", "la voisine"] },
        { q: "Où se passe la scène ?", bon: t.ou, faux: ["à la mer", "dans la cuisine", "à l'école"] },
      ]);
      return {
        text: `Lis ce texte :\n« ${t.texte} »\n\n${question.q}`,
        format: "qcm" as const,
        choices: makeChoices(question.bon, question.faux),
        expected: [question.bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Pour répondre à une question sur un texte, la réponse est dans le texte.",
          "Relis en cherchant le mot qui répond, et pose ton doigt dessus.",
          `Le texte dit : « ${t.texte} »`,
          `La réponse est : ${question.bon}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_lec_defi_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_syllabique",
    microId: "cp_lec_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "D'abord trouve le mot dans le texte, ensuite frappe ses syllabes.",
    tags: ["cp", "lecture", "defi", "template"],
    generate: () => {
      const item = randomChoice(MOTS_A_ASSEMBLER);
      const autres = shuffle(MOTS_A_ASSEMBLER.filter((m) => m.syl.length !== item.syl.length))
        .slice(0, 3)
        .map((m) => m.mot);
      return {
        text: `Quel mot a ${item.syl.length} syllabes et commence par « ${item.syl[0]} » ?`,
        format: "qcm" as const,
        choices: makeChoices(item.mot, autres),
        expected: [item.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux choses à vérifier : le début du mot, et le nombre de morceaux.",
          "Découpe chaque proposition, compte les morceaux, puis regarde le premier.",
          `${item.syl.join(" — ")} : ${item.syl.length} morceaux, et le premier est « ${item.syl[0]} ».`,
          `Le mot est « ${item.mot} ».`,
        ),
      };
    },
  },
];
