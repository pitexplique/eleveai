// lib/tutor-v4/questionBank/ce2/francais/fluence-lecture.bank.ts
//
// La fluence et la lecture expressive au CE2.
//
// CE QU'ELLE REMPLACE, et c'est le pire cas de tout le CE2 :
// `ce2_flue_mots_irreguliers` — « Lire rapidement des mots fréquents et
// irréguliers » — recevait
//
//     « Parmi ces syllabes, laquelle commence par la lettre b ? »
//
// une question de CP, avec `expected: ["ba"]` en dur alors que deux jeux de
// syllabes sur trois sont `ro/no/lo` et `fi/si/di` : deux fois sur trois,
// AUCUNE proposition ne répondait à la question posée.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, CE2) :
//   — « Lire à voix haute un texte court après préparation, à 90 mots par
//     minute » ;
//   — respecter l'ensemble des marques de ponctuation ET les LIAISONS ;
//   — repérer les lettres muettes sans les prononcer ;
//   — décoder un mot inconnu sans perdre de vitesse ;
//   — lire de façon expressive en respectant la structure du texte.
//
// ⚠️ ON N'A PAS DE SON. La fluence se travaille à voix haute, avec un adulte
// qui écoute — le coach ne peut pas faire ça. Ce qu'il peut faire, et c'est ce
// qu'il fait ici : préparer la lecture. Où couper un mot long, quelle lettre ne
// pas prononcer, où poser sa voix, où faire la liaison, et comment savoir si
// l'on est à 90 mots par minute. Le reste appartient à la classe.
//
// ⛔ RIEN QUI DÉPENDE DE L'ACCENT D'ICI. Les liaisons retenues font entendre un
// [z] ou un [t] — deux sons que tout le monde produit pareil. Jamais de [e]
// contre [ɛ]. Et les mots longs se découpent À L'ÉCRIT, sur les lettres, jamais
// en comptant des syllabes orales : « une dizaine » de syllabes ne se compte pas
// de la même façon à Saint-Denis et à Lille.

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
   LES MOTS QUI NE SE LISENT PAS COMME ILS S'ÉCRIVENT
   ═══════════════════════════════════════════════════════════════════════════ */

type MotLecture = {
  readonly mot: string;
  readonly regulier: boolean;
  /** Ce qui surprend quand on le lit. Vide pour les mots réguliers. */
  readonly surprise: string;
};

const MOTS_LECTURE: readonly MotLecture[] = [
  { mot: "femme", regulier: false, surprise: "on écrit « emme » et on lit [am]" },
  { mot: "monsieur", regulier: false, surprise: "on écrit « on » et on lit [e], on écrit « ieur » et on lit [ieu]" },
  { mot: "fils", regulier: false, surprise: "on écrit « ls » et on lit [s]" },
  { mot: "sept", regulier: false, surprise: "le « p » ne se prononce pas" },
  { mot: "doigt", regulier: false, surprise: "ni le « g » ni le « t » ne se prononcent" },
  { mot: "vingt", regulier: false, surprise: "ni le « g » ni le « t » ne se prononcent" },
  { mot: "automne", regulier: false, surprise: "le « m » ne se prononce pas" },
  { mot: "second", regulier: false, surprise: "le « c » se lit [g]" },
  { mot: "compter", regulier: false, surprise: "le « p » ne se prononce pas" },
  { mot: "oignon", regulier: false, surprise: "le « i » ne se prononce pas" },
  { mot: "table", regulier: true, surprise: "" },
  { mot: "salade", regulier: true, surprise: "" },
  { mot: "midi", regulier: true, surprise: "" },
  { mot: "village", regulier: true, surprise: "" },
  { mot: "musique", regulier: true, surprise: "" },
  { mot: "camarade", regulier: true, surprise: "" },
  { mot: "robe", regulier: true, surprise: "" },
  { mot: "sortir", regulier: true, surprise: "" },
  { mot: "lagon", regulier: true, surprise: "" },
  { mot: "cari", regulier: true, surprise: "" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   DÉCOUPER UN MOT LONG POUR LE LIRE

   ⚠️ Le découpage est GRAPHIQUE : on coupe les lettres, on ne compte pas des
   syllabes orales. Compter les syllabes de « tamarinier » à voix haute donne un
   chiffre différent selon l'accent de celui qui compte.
   ═══════════════════════════════════════════════════════════════════════════ */

type MotLong = {
  readonly mot: string;
  readonly decoupe: string;
  readonly fautes: readonly string[];
};

const MOTS_LONGS: readonly MotLong[] = [
  { mot: "margouillat", decoupe: "mar-gouil-lat", fautes: ["marg-ouil-lat", "ma-rgouil-lat", "margo-uil-lat"] },
  { mot: "tamarinier", decoupe: "ta-ma-ri-nier", fautes: ["tam-ar-in-ier", "ta-mar-inier", "tama-rin-ier"] },
  { mot: "hélicoptère", decoupe: "hé-li-cop-tère", fautes: ["hél-ico-ptère", "héli-copt-ère", "hé-lic-optère"] },
  { mot: "rhinocéros", decoupe: "rhi-no-cé-ros", fautes: ["rhin-oc-éros", "rhi-noc-éros", "rhino-cé-ros"] },
  { mot: "anniversaire", decoupe: "an-ni-ver-saire", fautes: ["ann-iver-saire", "anni-vers-aire", "an-niv-ersaire"] },
  { mot: "température", decoupe: "tem-pé-ra-ture", fautes: ["temp-éra-ture", "te-mpé-rature", "tempé-rat-ure"] },
  { mot: "gouvernement", decoupe: "gou-ver-ne-ment", fautes: ["gouv-erne-ment", "gou-vern-ement", "goun-ver-nement"] },
  { mot: "reconnaissance", decoupe: "re-con-nais-sance", fautes: ["rec-onn-aissance", "re-conn-ais-sance", "recon-nai-ssance"] },
  { mot: "extraordinaire", decoupe: "ex-tra-or-di-naire", fautes: ["extr-aor-dinaire", "ex-traor-din-aire", "extra-ordi-naire"] },
  { mot: "immédiatement", decoupe: "im-mé-dia-te-ment", fautes: ["imm-édia-tement", "i-mmé-diatement", "immé-diat-ement"] },
  { mot: "papillonner", decoupe: "pa-pil-lon-ner", fautes: ["pap-illo-nner", "papil-lonn-er", "pa-pillo-nner"] },
  { mot: "vertigineux", decoupe: "ver-ti-gi-neux", fautes: ["vert-igi-neux", "ve-rtigi-neux", "verti-gin-eux"] },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LES LETTRES MUETTES
   ═══════════════════════════════════════════════════════════════════════════ */

type MotMuet = {
  readonly mot: string;
  readonly lettre: string;
  readonly autres: readonly string[];
};

const LETTRES_MUETTES: readonly MotMuet[] = [
  { mot: "tapis", lettre: "le s final", autres: ["le t", "le a", "le p"] },
  { mot: "beaucoup", lettre: "le p final", autres: ["le b", "le c", "le u"] },
  { mot: "petit", lettre: "le t final", autres: ["le p", "le e", "le i"] },
  { mot: "grand", lettre: "le d final", autres: ["le g", "le r", "le n"] },
  { mot: "chant", lettre: "le t final", autres: ["le c", "le h", "le n"] },
  { mot: "long", lettre: "le g final", autres: ["le l", "le o", "le n"] },
  { mot: "gros", lettre: "le s final", autres: ["le g", "le r", "le o"] },
  { mot: "hiver", lettre: "le h du début", autres: ["le i", "le v", "le r"] },
  { mot: "homme", lettre: "le h du début", autres: ["le o", "le m", "le e"] },
  { mot: "galop", lettre: "le p final", autres: ["le g", "le a", "le l"] },
  { mot: "toit", lettre: "le t final", autres: ["le o", "le i", "le premier t"] },
  { mot: "blanc", lettre: "le c final", autres: ["le b", "le l", "le n"] },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LA PONCTUATION, ET CE QU'ELLE DEMANDE À LA VOIX
   ═══════════════════════════════════════════════════════════════════════════ */

type PhraseALire = {
  readonly phrase: string;
  readonly consigne: string;
  readonly signe: string;
};

const PHRASES_A_LIRE: readonly PhraseALire[] = [
  { phrase: "Tu viens avec nous ?", consigne: "en montant la voix à la fin", signe: "le point d'interrogation" },
  { phrase: "Attention à la marche !", consigne: "en forçant un peu la voix", signe: "le point d'exclamation" },
  { phrase: "Le bateau quitte le port.", consigne: "en descendant la voix et en s'arrêtant", signe: "le point" },
  { phrase: "Léa, viens ici tout de suite !", consigne: "en marquant une courte pause après le nom", signe: "la virgule" },
  { phrase: "Est-ce que le cari est prêt ?", consigne: "en montant la voix à la fin", signe: "le point d'interrogation" },
  { phrase: "Comme la mer est calme aujourd'hui !", consigne: "en forçant un peu la voix", signe: "le point d'exclamation" },
  { phrase: "Il prend son cartable, ses clés, et il sort.", consigne: "en marquant une courte pause à chaque virgule", signe: "les virgules" },
  { phrase: "Le margouillat dort sur la pierre chaude.", consigne: "en descendant la voix et en s'arrêtant", signe: "le point" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LES LIAISONS

   ⛔ Uniquement des liaisons en [z] et en [t] : deux sons que tout le monde
   produit de la même façon, quel que soit son accent.
   ═══════════════════════════════════════════════════════════════════════════ */

type Liaison = {
  readonly groupe: string;
  readonly faite: boolean;
  readonly son: string;
  readonly pourquoi: string;
};

const LIAISONS: readonly Liaison[] = [
  { groupe: "les enfants", faite: true, son: "[z]", pourquoi: "le « s » de « les » se réveille devant la voyelle" },
  { groupe: "deux amis", faite: true, son: "[z]", pourquoi: "le « x » de « deux » se lit [z] devant la voyelle" },
  { groupe: "trois heures", faite: true, son: "[z]", pourquoi: "le « s » de « trois » se réveille, et le « h » de « heures » ne compte pas" },
  { groupe: "vous avez", faite: true, son: "[z]", pourquoi: "le « s » de « vous » se réveille devant la voyelle" },
  { groupe: "nous allons", faite: true, son: "[z]", pourquoi: "le « s » de « nous » se réveille devant la voyelle" },
  { groupe: "un petit enfant", faite: true, son: "[t]", pourquoi: "le « t » de « petit », muet d'habitude, se réveille" },
  { groupe: "un grand arbre", faite: true, son: "[t]", pourquoi: "le « d » de « grand » se lit [t] devant la voyelle" },
  { groupe: "quand il arrive", faite: true, son: "[t]", pourquoi: "le « d » de « quand » se lit [t] devant la voyelle" },
  { groupe: "et alors", faite: false, son: "aucun", pourquoi: "après « et », on ne fait JAMAIS la liaison" },
  { groupe: "et ensuite", faite: false, son: "aucun", pourquoi: "après « et », on ne fait JAMAIS la liaison" },
  { groupe: "les héros", faite: false, son: "aucun", pourquoi: "le « h » de « héros » empêche la liaison" },
  { groupe: "en haut", faite: false, son: "aucun", pourquoi: "le « h » de « haut » empêche la liaison" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LES 90 MOTS PAR MINUTE
   ═══════════════════════════════════════════════════════════════════════════ */

type Mesure = { readonly mots: number; readonly secondes: number; readonly parMinute: number };

const MESURES: readonly Mesure[] = [
  { mots: 45, secondes: 30, parMinute: 90 },
  { mots: 40, secondes: 30, parMinute: 80 },
  { mots: 50, secondes: 30, parMinute: 100 },
  { mots: 35, secondes: 30, parMinute: 70 },
  { mots: 60, secondes: 30, parMinute: 120 },
  { mots: 30, secondes: 20, parMinute: 90 },
  { mots: 25, secondes: 20, parMinute: 75 },
  { mots: 36, secondes: 20, parMinute: 108 },
  { mots: 22, secondes: 15, parMinute: 88 },
  { mots: 27, secondes: 15, parMinute: 108 },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LA STRUCTURE, POUR LA LECTURE EXPRESSIVE
   ═══════════════════════════════════════════════════════════════════════════ */

type Passage = {
  readonly texte: string;
  readonly consigne: string;
  readonly autresConsignes: readonly string[];
};

const PASSAGES: readonly Passage[] = [
  {
    texte: "Le pêcheur s'arrêta net. « Tu as entendu ? » demanda-t-il à voix basse.",
    consigne: "changer de voix pour la phrase entre guillemets, et la dire tout bas",
    autresConsignes: [
      "lire toute la phrase sur le même ton",
      "crier la phrase entre guillemets",
      "sauter les guillemets pour aller plus vite",
    ],
  },
  {
    texte: "Il faisait chaud, très chaud, et personne ne bougeait dans la cour.",
    consigne: "marquer une courte pause à chaque virgule",
    autresConsignes: [
      "lire d'une seule traite, sans respirer",
      "s'arrêter longuement après chaque mot",
      "monter la voix à la fin",
    ],
  },
  {
    texte: "— On y va ? demanda Nina.\n— Pas encore, répondit Sofia.",
    consigne: "prendre une voix différente pour chaque personnage",
    autresConsignes: [
      "lire les deux répliques de la même voix",
      "lire seulement ce qui suit les tirets",
      "chuchoter tout le passage",
    ],
  },
  {
    texte: "La pluie tomba. D'abord doucement. Puis d'un coup, comme une vague.",
    consigne: "accélérer un peu à la dernière phrase, pour suivre le sens",
    autresConsignes: [
      "lire les trois phrases au même rythme",
      "ralentir de plus en plus",
      "lire la dernière phrase en chuchotant",
    ],
  },
  {
    texte: "Attention ! Le portail est ouvert !",
    consigne: "forcer la voix aux deux points d'exclamation",
    autresConsignes: [
      "lire calmement, comme une information",
      "monter la voix comme pour une question",
      "faire une longue pause entre les deux phrases",
    ],
  },
  {
    texte: "Elle ouvrit la lettre, la lut deux fois, et sourit.",
    consigne: "enchainer les trois actions sans grande pause, avec une courte respiration aux virgules",
    autresConsignes: [
      "s'arrêter complètement à chaque virgule",
      "lire les trois actions comme trois phrases séparées",
      "monter la voix à chaque virgule",
    ],
  },
  {
    texte: "Le margouillat avança d'un pas… puis s'arrêta net.",
    consigne: "marquer un vrai silence aux points de suspension, avant de reprendre",
    autresConsignes: [
      "lire la phrase d'une seule traite",
      "monter la voix aux points de suspension",
      "ralentir jusqu'à la fin sans jamais s'arrêter",
    ],
  },
  {
    texte: "« Attends ! » cria Sofia. Mais Tom était déjà loin.",
    consigne: "forcer la voix pour le cri, puis revenir à un ton ordinaire pour la suite",
    autresConsignes: [
      "crier les deux phrases",
      "lire le cri à voix basse, pour faire une surprise",
      "lire les deux phrases exactement de la même façon",
    ],
  },
  {
    texte: "Un, deux, trois : la corde tourna, et Nina sauta.",
    consigne: "marquer un temps aux deux points, comme un élan avant la suite",
    autresConsignes: [
      "compter très vite et lire le reste très lentement",
      "s'arrêter après chaque chiffre pendant plusieurs secondes",
      "monter la voix sur chaque chiffre",
    ],
  },
  {
    texte: "Il ne restait plus rien. Rien du tout.",
    consigne: "ralentir sur la seconde phrase, plus courte, pour la faire entendre",
    autresConsignes: [
      "lire la seconde phrase plus vite, puisqu'elle est courte",
      "lire les deux phrases comme une seule",
      "crier la seconde phrase",
    ],
  },
  {
    texte: "Le maitre entra, posa ses livres, et regarda la classe sans rien dire.",
    consigne: "garder un rythme régulier aux virgules, puis ralentir sur la fin",
    autresConsignes: [
      "accélérer de plus en plus jusqu'à la fin",
      "s'arrêter longuement après chaque virgule",
      "lire toute la phrase en chuchotant",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LA BANQUE
   ═══════════════════════════════════════════════════════════════════════════ */

export const fluenceLectureBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_FLUE_MOTS_IRREGULIERS — celle qui recevait « quelle syllabe
     commence par la lettre b ? »
  ========================================================= */
  {
    kind: "template",
    id: "ce2_flue_mots_irreguliers_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_mots_irreguliers",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis le mot dans ta tête, puis compare avec ce que tu vois écrit.",
    tags: ["ce2", "fluence", "mots-irreguliers", "template"],
    generate: () => {
      const m = randomChoice(MOTS_LECTURE);
      return {
        text: `Le mot « ${m.mot} » se lit-il comme il s'écrit ?`,
        format: "qcm" as const,
        choices: ["oui, il se lit comme il s'écrit", "non, il réserve une surprise"],
        expected: [m.regulier ? "oui, il se lit comme il s'écrit" : "non, il réserve une surprise"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Certains mots très fréquents ne se lisent pas comme ils s'écrivent. On ne les déchiffre pas : on les reconnait d'un coup d'œil.",
          "Lis le mot lettre à lettre dans ta tête, puis dis-le en entier. Si les deux ne collent pas, le mot est irrégulier.",
          m.regulier
            ? `« ${m.mot} » se lit exactement comme il s'écrit : chaque lettre fait ce qu'on attend d'elle.`
            : `« ${m.mot} » : ${m.surprise}.`,
          m.regulier ? "Oui, il se lit comme il s'écrit." : "Non, il réserve une surprise.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_flue_mots_irreguliers_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_mots_irreguliers",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare ce qui est écrit et ce que tu prononces.",
    tags: ["ce2", "fluence", "mots-irreguliers", "template"],
    generate: () => {
      const m = randomChoice(MOTS_LECTURE.filter((x) => !x.regulier));
      const autres = shuffle(
        MOTS_LECTURE.filter((x) => !x.regulier && x.surprise !== m.surprise),
      ).map((x) => x.surprise);
      return {
        text: `Qu'est-ce qui surprend quand on lit « ${m.mot} » ?`,
        format: "qcm" as const,
        choices: choix(m.surprise, autres),
        expected: [m.surprise],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot irrégulier a toujours une raison précise d'être piégeux : une lettre qui se tait, ou qui ne fait pas son travail habituel.",
          "Écris le mot, prononce-le, et cherche l'endroit où les deux ne correspondent plus.",
          `« ${m.mot} » : ${m.surprise}.`,
          `Ce qui surprend : ${m.surprise}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_flue_mots_irreguliers_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_mots_irreguliers",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi faut-il reconnaitre les mots fréquents d'un coup d'œil, au lieu de les déchiffrer ?",
    format: "qcm",
    choices: [
      "Parce que déchiffrer prend du temps, et qu'on oublie le début de la phrase",
      "Parce que c'est interdit de déchiffrer au CE2",
      "Parce que les mots fréquents sont plus courts",
      "Parce que déchiffrer abime les yeux",
    ],
    expected: [
      "Parce que déchiffrer prend du temps, et qu'on oublie le début de la phrase",
    ],
    comparator: "mcq_exact",
    hint: "Pense à ce qui se passe dans ta tête quand tu lis une longue phrase lentement.",
    explanation: exp(
      "Lire vite n'est pas un but en soi : c'est ce qui permet de COMPRENDRE. Notre tête ne peut pas garder le début d'une phrase pendant qu'elle déchiffre la fin.",
      "Les mots qui reviennent tout le temps — les, dans, avec, monsieur, femme — s'apprennent en entier, comme des images.",
      "« Le pêcheur range ses filets avant la nuit. » Si tu déchiffres « pêcheur » lettre à lettre, tu as oublié « Le » en arrivant à « range ». Le sens s'écroule.",
      "Parce que déchiffrer prend du temps, et qu'on oublie le début de la phrase.",
    ),
    tags: ["ce2", "fluence", "mots-irreguliers", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_flue_mots_irreguliers_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_mots_irreguliers",
    difficulty: 3,
    theme: "neutral",
    hint: "Celui-là ne se déchiffre pas. Il se reconnait.",
    tags: ["ce2", "fluence", "mots-irreguliers", "methode"],
    generate: () => {
      const m = randomChoice(MOTS_LECTURE.filter((x) => !x.regulier));
      const bonne = "Je le regarde en entier, je ferme les yeux, je le revois — puis je le lis d'un coup, sans le déchiffrer.";
      return {
        text: `Le mot « ${m.mot} » ne se lit pas comme il s'écrit.\n\nComment fais-tu pour le lire sans buter dessus ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // LE piège : déchiffrer un mot irrégulier donne le mauvais son.
          "Je le déchiffre lettre par lettre, lentement.",
          // La voisine : découper, c'est le geste des mots longs réguliers.
          "Je le coupe en syllabes.",
          "Je le saute et je continue.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot irrégulier ne se déchiffre pas : il se reconnait.",
          "Regarde-le, ferme les yeux, revois-le, puis lis-le en entier sans t'arrêter.",
          `« ${m.mot} » : ${m.surprise}.`,
          `Le piège : ${m.surprise}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_FLUE_MOTS_INCONNUS
  ========================================================= */
  {
    kind: "template",
    id: "ce2_flue_mots_inconnus_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_mots_inconnus",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque morceau doit pouvoir se lire tout seul.",
    tags: ["ce2", "fluence", "mots-inconnus", "template"],
    generate: () => {
      const m = randomChoice(MOTS_LONGS);
      return {
        text: `Tu ne connais pas le mot « ${m.mot} ».\n\nComment le découper pour le lire sans t'arrêter ?`,
        format: "qcm" as const,
        choices: shuffle([m.decoupe, ...m.fautes]),
        expected: [m.decoupe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot long ne se lit pas lettre à lettre : on le coupe en morceaux qui se lisent chacun d'un coup.",
          "Coupe après une voyelle, ou entre deux consonnes. Chaque morceau doit se prononcer tout seul.",
          `${m.mot} → ${m.decoupe}. Les autres découpages font des morceaux imprononçables, et on cale dessus.`,
          `On découpe : ${m.decoupe}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_flue_mots_inconnus_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_mots_inconnus",
    difficulty: 3,
    theme: "neutral",
    text: "Tu tombes sur un mot très long que tu n'as jamais vu, au milieu d'une phrase.\n\nQue vaut-il mieux faire ?",
    format: "qcm",
    choices: [
      "Le couper en morceaux, le lire, puis continuer la phrase",
      "Le sauter et continuer sans lui",
      "Recommencer la phrase depuis le début",
      "Le lire lettre par lettre, à voix haute",
    ],
    expected: ["Le couper en morceaux, le lire, puis continuer la phrase"],
    comparator: "mcq_exact",
    hint: "Il faut le lire, mais sans perdre le fil de la phrase.",
    explanation: exp(
      "Décoder un mot inconnu sans perdre de vitesse, c'est le couper en morceaux connus au lieu de le déchiffrer lettre à lettre.",
      "Un coup d'œil pour couper, un souffle pour lire, et on repart. Le mot ne doit pas casser la phrase.",
      "extraordinaire → ex-tra-or-di-naire. Cinq morceaux, et c'est lu. Lettre par lettre, il en faudrait quatorze, et la phrase serait perdue.",
      "Le couper en morceaux, le lire, puis continuer la phrase.",
    ),
    tags: ["ce2", "fluence", "mots-inconnus", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_flue_mots_inconnus_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_mots_inconnus",
    difficulty: 3,
    theme: "neutral",
    hint: "Il y a un endroit où couper, et il n'est pas au milieu.",
    tags: ["ce2", "fluence", "mots-inconnus", "methode"],
    generate: () => {
      const m = randomChoice(MOTS_LONGS);
      const bonne = `Je le coupe en morceaux qui se disent chacun d'un coup : ${m.decoupe}.`;
      return {
        text: `Tu dois lire « ${m.mot} » à voix haute sans t'arrêter.\n\nComment t'y prends-tu ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : couper au milieu, sans écouter les morceaux.
          "Je coupe au milieu, en deux parts égales.",
          "Je le lis lettre par lettre.",
          "Je le lis très vite : on ne verra pas l'erreur.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "On lit un mot long en le coupant en morceaux qui se prononcent chacun d'un coup.",
          "Coupe après une voyelle, ou entre deux consonnes, et vérifie que chaque morceau se dit tout seul.",
          `${m.mot} → ${m.decoupe}.`,
          `On le découpe : ${m.decoupe}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_FLUE_LETTRES_MUETTES
  ========================================================= */
  {
    kind: "template",
    id: "ce2_flue_lettres_muettes_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_lettres_muettes",
    difficulty: 2,
    theme: "neutral",
    hint: "Dis le mot à voix haute et compare avec ce qui est écrit.",
    tags: ["ce2", "fluence", "lettres-muettes", "template"],
    generate: () => {
      const m = randomChoice(LETTRES_MUETTES);
      return {
        text: `Dans le mot « ${m.mot} », quelle lettre ne se prononce PAS ?`,
        format: "qcm" as const,
        choices: shuffle([m.lettre, ...m.autres]),
        expected: [m.lettre],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Beaucoup de mots portent une lettre qui s'écrit et ne se dit pas. La sauter au bon endroit, c'est lire sans buter.",
          "Prononce le mot lentement et pose ton doigt sur chaque lettre : celle qui ne sort pas est muette.",
          `Dans « ${m.mot} », c'est ${m.lettre} qui reste silencieux.`,
          `La lettre muette est ${m.lettre}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_flue_lettres_muettes_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_lettres_muettes",
    difficulty: 3,
    theme: "neutral",
    text: "Une lettre muette ne se prononce pas. Pourquoi l'écrit-on quand même ?",
    format: "qcm",
    choices: [
      "Parce qu'elle réapparait dans la famille du mot : grand → grande, chant → chanter",
      "Parce que le mot serait trop court sans elle",
      "Parce qu'on la prononçait autrefois, et jamais depuis",
      "Parce qu'elle sert à séparer les syllabes",
    ],
    expected: [
      "Parce qu'elle réapparait dans la famille du mot : grand → grande, chant → chanter",
    ],
    comparator: "mcq_exact",
    hint: "Cherche un mot de la même famille où la lettre se met à s'entendre.",
    explanation: exp(
      "Une lettre finale muette n'est pas là par hasard : elle relie le mot à sa famille.",
      "Quand tu hésites, allonge le mot — mets-le au féminin, ou trouve le verbe. La lettre sort de son silence.",
      "petit → petite : le t s'entend. chant → chanter : le t s'entend. En lecture, on la saute ; en écriture, c'est elle qui te sauve.",
      "Parce qu'elle réapparait dans la famille du mot.",
    ),
    tags: ["ce2", "fluence", "lettres-muettes", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_flue_lettres_muettes_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_lettres_muettes",
    difficulty: 3,
    theme: "neutral",
    hint: "Elle gêne la lecture, et elle sert à l'écriture. Allonge le mot pour l'entendre.",
    tags: ["ce2", "fluence", "lettres-muettes", "methode"],
    generate: () => {
      const m = randomChoice(LETTRES_MUETTES.filter((x) => x.lettre.includes("final")));
      const bonne = "À l'écriture : on la retrouve dans la famille du mot, et si on allonge le mot, elle se met à s'entendre.";
      return {
        text: `Dans « ${m.mot} », ${m.lettre} ne se prononce pas.\n\nEn lisant, tu dois le sauter. Alors, à quoi sert-il ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : une lettre inutile, gardée par habitude.
          "À rien : c'est une lettre en trop qu'on garde par habitude.",
          // La voisine : la marque du pluriel est une autre lettre muette,
          // mais celle-ci n'en est pas une.
          "À marquer le pluriel.",
          "À montrer que le mot est difficile.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une lettre finale muette relie le mot aux autres mots de sa famille.",
          "Allonge le mot : la lettre se met à s'entendre, et tu sais qu'il faut l'écrire.",
          `« ${m.mot} » : en lecture on saute ${m.lettre} ; en écriture, c'est la famille du mot qui l'exige.`,
          "Elle sert à l'écriture : on la retrouve dans la famille du mot.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_FLUE_PHRASE_EXPRESSION
  ========================================================= */
  {
    kind: "template",
    id: "ce2_flue_phrase_expression_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_phrase_expression",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde le signe de ponctuation : c'est lui qui commande ta voix.",
    tags: ["ce2", "fluence", "ponctuation", "template"],
    generate: () => {
      const p = randomChoice(PHRASES_A_LIRE);
      const autres = shuffle(PHRASES_A_LIRE.filter((x) => x.consigne !== p.consigne)).map(
        (x) => x.consigne,
      );
      return {
        text: `Comment lis-tu cette phrase à voix haute ?\n\n« ${p.phrase} »`,
        format: "qcm" as const,
        choices: choix(p.consigne, autres),
        expected: [p.consigne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La ponctuation est une partition : elle dit à ta voix où monter, où s'arrêter, où forcer.",
          "Repère le signe avant de commencer à lire, pas au moment où tu l'atteins.",
          `Ici, ${p.signe} demande de lire ${p.consigne}.`,
          `On lit ${p.consigne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_flue_phrase_expression_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_phrase_expression",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le signe qui commande ce mouvement de voix.",
    tags: ["ce2", "fluence", "ponctuation", "template"],
    generate: () => {
      const p = randomChoice(PHRASES_A_LIRE);
      const tous = [...new Set(PHRASES_A_LIRE.map((x) => x.signe))];
      return {
        text: `« ${p.phrase} »\n\nQuel signe de ponctuation te dit comment poser ta voix ?`,
        format: "qcm" as const,
        choices: choix(p.signe, tous),
        expected: [p.signe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chaque signe de ponctuation donne une consigne à la voix : le point la fait descendre, le point d'interrogation la fait monter, la virgule la suspend.",
          "Lis la phrase des yeux jusqu'au bout avant de la dire : tu sauras où tu vas.",
          `Ici, ${p.signe} demande de lire ${p.consigne}.`,
          `C'est ${p.signe}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_flue_phrase_expression_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_phrase_expression",
    difficulty: 3,
    theme: "neutral",
    hint: "Il y a un signe dans la phrase, et c'est lui qui commande.",
    tags: ["ce2", "fluence", "ponctuation", "methode"],
    generate: () => {
      const p = randomChoice(PHRASES_A_LIRE);
      const bonne = `La ponctuation : ${p.signe} demande de lire ${p.consigne}.`;
      return {
        text: `Tu dois lire cette phrase à voix haute devant la classe :\n\n« ${p.phrase} »\n\nQu'est-ce qui dit à ta voix ce qu'elle doit faire ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : la lecture plate, tout au même ton.
          "Rien : on lit tout de la même façon, c'est plus clair.",
          "Le premier mot de la phrase : c'est lui qui donne le ton.",
          "La longueur de la phrase.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La ponctuation dit à la voix ce qu'elle doit faire : monter, descendre, s'arrêter, forcer.",
          "Repère le signe AVANT de commencer : on prépare une lecture, on ne la découvre pas en la faisant.",
          `${p.signe} → on lit ${p.consigne}.`,
          `On lit ${p.consigne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_FLUE_LIAISONS — le BO les ajoute au CE2
  ========================================================= */
  {
    kind: "template",
    id: "ce2_flue_liaisons_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_liaisons",
    difficulty: 3,
    theme: "neutral",
    hint: "Dis les deux mots l'un après l'autre : entends-tu un son de plus entre eux ?",
    tags: ["ce2", "fluence", "liaisons", "template"],
    generate: () => {
      const l = randomChoice(LIAISONS);
      return {
        text: `Quand tu lis « ${l.groupe} » à voix haute, fais-tu la liaison entre les deux mots ?`,
        format: "qcm" as const,
        choices: ["oui", "non"],
        expected: [l.faite ? "oui" : "non"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une liaison, c'est une lettre muette qui se réveille parce que le mot suivant commence par une voyelle.",
          "Dis les deux mots collés : si un son apparait au milieu, c'est une liaison.",
          `« ${l.groupe} » : ${l.pourquoi}.`,
          l.faite ? "Oui, on fait la liaison." : "Non, on ne fait pas la liaison.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_flue_liaisons_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_liaisons",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux sons possibles seulement : celui du « z » ou celui du « t ».",
    tags: ["ce2", "fluence", "liaisons", "template"],
    generate: () => {
      const l = randomChoice(LIAISONS.filter((x) => x.faite));
      return {
        text: `En lisant « ${l.groupe} », quel son entend-on entre les deux mots ?`,
        format: "qcm" as const,
        choices: ["[z]", "[t]", "[s]", "aucun"],
        expected: [l.son],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La lettre qui se réveille ne se prononce pas toujours comme elle s'écrit : le « s » et le « x » donnent [z], le « d » donne [t].",
          "Regarde la dernière lettre du premier mot, puis applique : s ou x → [z], d ou t → [t].",
          `« ${l.groupe} » : ${l.pourquoi}. On entend ${l.son}.`,
          `On entend ${l.son}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_flue_liaisons_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_liaisons",
    difficulty: 3,
    theme: "neutral",
    text: "« et alors » : fait-on la liaison entre « et » et « alors » ?",
    format: "qcm",
    choices: [
      "Non : après « et », on ne fait jamais la liaison",
      "Oui, on entend un [t]",
      "Oui, on entend un [z]",
      "Cela dépend de la phrase",
    ],
    expected: ["Non : après « et », on ne fait jamais la liaison"],
    comparator: "mcq_exact",
    hint: "Celle-là est une règle sans exception. Il faut la connaitre.",
    explanation: exp(
      "La plupart des lettres muettes se réveillent devant une voyelle. Quelques cas l'interdisent, et « et » en fait partie.",
      "Retiens les deux interdictions les plus fréquentes : jamais après « et », jamais devant un « h » comme celui de « héros » ou de « haut ».",
      "et_alors : on marque un petit arrêt, on ne fait pas entendre de [t]. Les héros : pas de [z] non plus. Ce sont les deux pièges de la liaison au CE2.",
      "Non : après « et », on ne fait jamais la liaison.",
    ),
    tags: ["ce2", "fluence", "liaisons", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_flue_liaisons_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_liaisons",
    difficulty: 3,
    theme: "neutral",
    hint: "Ce son n'est pas nouveau : il était déjà écrit, et il se taisait.",
    tags: ["ce2", "fluence", "liaisons", "methode"],
    generate: () => {
      const l = randomChoice(LIAISONS.filter((x) => x.faite));
      const bonne = `De la dernière lettre du premier mot : muette d'habitude, elle se réveille parce que le mot suivant commence par une voyelle — on entend ${l.son}.`;
      return {
        text: `Dans « ${l.groupe} », on entend un son de plus entre les deux mots.\n\nD'où vient-il ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // LE piège : croire qu'on ajoute une lettre qui n'était pas écrite.
          "D'une lettre nouvelle qu'on ajoute entre les deux mots.",
          "De la première lettre du deuxième mot.",
          "De rien : c'est juste une façon de parler vite.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une liaison, c'est une lettre muette qui se réveille parce que le mot d'après commence par une voyelle.",
          "Regarde la dernière lettre du premier mot : c'est elle qu'on entend, pas une lettre nouvelle.",
          `« ${l.groupe} » : ${l.pourquoi}. On entend ${l.son}.`,
          `Le son vient de la dernière lettre du premier mot, qui se réveille : ${l.son}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_FLUE_TEXTE_90 — le repère chiffré du BO
  ========================================================= */
  {
    kind: "template",
    id: "ce2_flue_texte_90_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_texte_90",
    difficulty: 3,
    theme: "neutral",
    hint: "Ramène d'abord à une minute entière.",
    tags: ["ce2", "fluence", "vitesse", "template"],
    generate: () => {
      const m = randomChoice(MESURES);
      const autres = shuffle(MESURES.filter((x) => x.parMinute !== m.parMinute)).map((x) =>
        String(x.parMinute),
      );
      return {
        text: `Tu as lu ${m.mots} mots en ${m.secondes} secondes.\n\nCombien de mots lis-tu en une minute ?`,
        format: "qcm" as const,
        choices: choix(String(m.parMinute), autres),
        expected: [String(m.parMinute)],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La vitesse de lecture se compte en mots par minute. Au CE2, le repère est de 90 mots par minute en fin d'année.",
          `Une minute fait 60 secondes. ${m.secondes} secondes, c'est ${60 / m.secondes === 2 ? "la moitié" : 60 / m.secondes === 3 ? "le tiers" : "une partie"} d'une minute : on multiplie donc par ${60 / m.secondes}.`,
          `${m.mots} × ${60 / m.secondes} = ${m.parMinute} mots par minute.`,
          `Cela fait ${m.parMinute} mots par minute.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_flue_texte_90_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_texte_90",
    difficulty: 3,
    theme: "neutral",
    hint: "Le repère de fin de CE2 est de 90 mots par minute.",
    tags: ["ce2", "fluence", "vitesse", "template"],
    generate: () => {
      const m = randomChoice(MESURES);
      const atteint = m.parMinute >= 90;
      return {
        text: `Tu as lu ${m.mots} mots en ${m.secondes} secondes, soit ${m.parMinute} mots par minute.\n\nAs-tu atteint le repère de fin de CE2 ?`,
        format: "qcm" as const,
        choices: ["oui, 90 mots par minute ou plus", "pas encore, il en manque"],
        expected: [atteint ? "oui, 90 mots par minute ou plus" : "pas encore, il en manque"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le programme fixe un repère : lire un texte court, après préparation, à 90 mots par minute en fin de CE2.",
          "Compare ton chiffre à 90. Et souviens-toi que ce repère se mesure APRÈS avoir préparé le texte, pas à la première lecture.",
          atteint
            ? `${m.parMinute} mots par minute, c'est au-dessus de 90. Le repère est atteint — reste à lire avec le ton.`
            : `${m.parMinute} mots par minute : il manque ${90 - m.parMinute} mots. On relit le même texte deux ou trois fois : la vitesse vient toute seule.`,
          atteint ? "Oui, le repère est atteint." : "Pas encore, il en manque.",
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_flue_texte_90_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_texte_90",
    difficulty: 3,
    theme: "neutral",
    text: "Lire vite n'est pas le but : c'est un moyen.\n\nÀ quoi sert de lire à 90 mots par minute plutôt qu'à 40 ?",
    format: "qcm",
    choices: [
      "À libérer de la place dans la tête pour comprendre : à 40, on a oublié le début de la phrase avant d'arriver au bout.",
      // L'erreur réelle : la vitesse prise pour le but, et non pour le moyen.
      "À finir le livre plus tôt.",
      "À montrer à la maitresse qu'on sait lire.",
      "À ne pas avoir à relire le texte.",
    ],
    expected: [
      "À libérer de la place dans la tête pour comprendre : à 40, on a oublié le début de la phrase avant d'arriver au bout.",
    ],
    comparator: "mcq_exact",
    hint: "Pense à ce qui se passe dans ta tête pendant que tu déchiffres.",
    explanation: exp(
      "La vitesse de lecture n'a d'intérêt que parce qu'elle libère la place pour comprendre.",
      "Pour aller plus vite, on ne lit pas plus vite : on relit le même texte deux ou trois fois, et les mots finissent par se reconnaitre seuls.",
      "À 40 mots par minute, on a oublié le début de la phrase avant d'arriver au bout. Toute la tête est occupée à déchiffrer, il ne reste rien pour comprendre. À 90, les mots viennent seuls, et la tête est libre pour l'histoire.",
      "Cela libère de la place dans la tête pour comprendre ce qu'on lit.",
    ),
    tags: ["ce2", "fluence", "vitesse", "methode", "qcm"],
  },

  /* =========================================================
     CE2_FLUE_EXPRESSIVE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_flue_expressive_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_expressive",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde comment le passage est construit avant de le lire.",
    tags: ["ce2", "fluence", "expressive", "template"],
    generate: () => {
      const p = randomChoice(PASSAGES);
      return {
        text: `Tu prépares la lecture à voix haute de ce passage :\n\n${p.texte}\n\nComment le lis-tu ?`,
        format: "qcm" as const,
        choices: shuffle([p.consigne, ...p.autresConsignes]),
        expected: [p.consigne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Lire de façon expressive, c'est faire entendre la structure du texte : les personnages, les pauses, les changements de rythme.",
          "Lis le passage des yeux d'abord, repère ce qui change, puis décide comment ta voix va le montrer.",
          `Ici, il faut ${p.consigne}.`,
          `On lit en ${p.consigne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_flue_expressive_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_expressive",
    difficulty: 3,
    theme: "neutral",
    hint: "Une lecture expressive se prépare des yeux. Trois regards suffisent.",
    tags: ["ce2", "fluence", "expressive", "methode"],
    generate: () => {
      const p = randomChoice(PASSAGES);
      const bonne = `Je regarde trois choses : qui parle, où sont les pauses, et ce qui change de rythme — ici, ${p.consigne}.`;
      return {
        text: `Tu dois lire ce passage à voix haute devant la classe :\n\n${p.texte}\n\nQue fais-tu AVANT de commencer ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : découvrir le texte en le lisant devant les autres.
          "Rien : je commence, et je verrai bien.",
          "J'apprends le passage par cœur.",
          "Je compte les mots pour savoir combien de temps cela va prendre.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une lecture expressive se prépare : on ne l'improvise pas au moment de parler.",
          "Trois regards avant de lire : qui parle, où sont les pauses, et ce qui change de rythme.",
          `Pour ce passage : ${p.consigne}.`,
          `Il faut ${p.consigne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_FLUE_DEFI — la ponctuation ET la liaison en même temps
  ========================================================= */
  {
    kind: "template",
    id: "ce2_flue_defi_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux choses à surveiller : la liaison au milieu, et le signe à la fin.",
    tags: ["ce2", "fluence", "defi", "template"],
    generate: () => {
      const l = randomChoice(LIAISONS);
      const p = randomChoice(PHRASES_A_LIRE);
      const oui = `on fait la liaison dans « ${l.groupe} »`;
      const non = `on NE fait PAS la liaison dans « ${l.groupe} »`;
      const debutJuste = l.faite ? oui : non;
      const debutFaux = l.faite ? non : oui;
      // ⚠️ Les deux autres consignes sont tirées SANS REMISE d'une liste
      // dédoublonnée. Deux `randomChoice` indépendants tombaient sur la même
      // une fois sur deux — huit phrases ne portent que cinq consignes
      // distinctes — et le QCM se présentait à trois lignes.
      const autresConsignes = shuffle([
        ...new Set(PHRASES_A_LIRE.map((x) => x.consigne).filter((c) => c !== p.consigne)),
      ]);
      const bon = `${debutJuste}, et on lit ${p.consigne}`;
      const faux = [
        `${debutFaux}, et on lit ${p.consigne}`,
        `${debutJuste}, et on lit ${autresConsignes[0]}`,
        `${debutFaux}, et on lit ${autresConsignes[1]}`,
      ];
      return {
        text: `Tu prépares la lecture de : « ${p.phrase} »\net du groupe « ${l.groupe} ».\n\nQuelle préparation est entièrement juste ?`,
        format: "qcm" as const,
        choices: choix(bon, faux),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Préparer une lecture, c'est régler plusieurs choses à la fois : les liaisons, les pauses, le ton.",
          "Traite-les l'une après l'autre : d'abord les liaisons dans les groupes de mots, ensuite la ponctuation de la phrase.",
          `« ${l.groupe} » : ${l.pourquoi}. Et ${p.signe} demande de lire ${p.consigne}.`,
          `La bonne préparation : ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_flue_defi_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce2_flue_defi",
    difficulty: 3,
    theme: "neutral",
    // Le cran de plus : trois vérifications à tenir ensemble, alors que chaque
    // micro-compétence n'en demandait qu'une. Le piège n'en garde qu'une.
    hint: "Une lecture se prépare, et pas sur un seul point.",
    tags: ["ce2", "fluence", "defi", "methode"],
    generate: () => {
      const p = randomChoice(PHRASES_A_LIRE);
      const m = randomChoice(MOTS_LONGS);
      const bonne = `Trois choses : je découpe « ${m.mot} » en ${m.decoupe}, je repère les liaisons, et je regarde la ponctuation jusqu'au bout de la phrase.`;
      return {
        text: `On te demande de lire à voix haute :\n\n« ${p.phrase} »\n\net il y a le mot « ${m.mot} » un peu plus loin.\n\nQue prépares-tu avant de commencer ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // Le piège fin : préparer le mot long seulement, et découvrir la
          // ponctuation la voix déjà lancée.
          "Je prépare le mot long, et je découvrirai la ponctuation en lisant.",
          "Je lis la phrase une fois dans ma tête, et ça suffit.",
          "Je m'entraine à lire le plus vite possible.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une lecture à voix haute se prépare des yeux, avant que la voix ne commence.",
          "Trois choses : découper les mots longs, repérer les liaisons, et regarder la ponctuation jusqu'au bout de la phrase.",
          `« ${m.mot} » se coupe en ${m.decoupe}. Et ${p.signe} demande de lire ${p.consigne}.`,
          `On découpe les mots longs, on repère les liaisons, et on regarde la ponctuation.`,
        ),
      };
    },
  },
];
