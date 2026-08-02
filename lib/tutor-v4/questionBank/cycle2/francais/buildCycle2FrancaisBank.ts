import type {
  ComparatorName,
  QuestionFormat,
  SchoolLevel,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

type Cycle2Level = Extract<SchoolLevel, "cp" | "ce1" | "ce2">;

type Generated = TutorGeneratedQuestionV4 & {
  format: QuestionFormat;
  comparator: ComparatorName;
};

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  return shuffle(Array.from(new Set([correct, ...wrongs]))).slice(0, 4);
}

function exp(methode: string, exemple: string, conclusion: string) {
  return `Methode : ${methode}\n\nExemple : ${exemple}\n\nConclusion : ${conclusion}`;
}

// ──────────────────────────────────────────────────────────────────────────────
// GÉNÉRATEURS PAR NOTION
// ──────────────────────────────────────────────────────────────────────────────

function phonologieQuestion(_level: Cycle2Level, variant: number): Generated {
  if (variant === 0) {
    const mots = [
      { mot: "cha-peau", syllabes: "2" },
      { mot: "pa-pi-llon", syllabes: "3" },
      { mot: "so-leil", syllabes: "2" },
      { mot: "ca-na-pé", syllabes: "3" },
      { mot: "la-pin", syllabes: "2" },
      { mot: "do-mi-no", syllabes: "3" },
      { mot: "mou-ton", syllabes: "2" },
      { mot: "é-lé-phant", syllabes: "3" },
    ];
    const item = randomChoice(mots);
    return {
      text: `Combien de syllabes entends-tu dans le mot « ${item.mot.replace(/-/g, "")} » ?`,
      format: "qcm",
      choices: makeChoices(item.syllabes, ["1", "4"]),
      expected: [item.syllabes],
      comparator: "mcq_exact",
      explanation: exp(
        "On compte les syllabes en frappant dans ses mains.",
        `${item.mot} → ${item.syllabes} syllabes.`,
        `Le mot « ${item.mot.replace(/-/g, "")} » a ${item.syllabes} syllabes.`
      ),
    };
  }

  const paires = [
    { a: "chat", b: "rat", riment: "oui" },
    { a: "maison", b: "garçon", riment: "non" },
    { a: "soleil", b: "oreille", riment: "oui" },
    { a: "table", b: "porte", riment: "non" },
    { a: "bateau", b: "gâteau", riment: "oui" },
    { a: "souris", b: "tapis", riment: "oui" },
    { a: "lapin", b: "sapin", riment: "oui" },
    { a: "fleur", b: "maison", riment: "non" },
    { a: "livre", b: "cheval", riment: "non" },
    { a: "papillon", b: "table", riment: "non" },
  ];
  const paire = randomChoice(paires);
  return {
    text: `Est-ce que « ${paire.a} » et « ${paire.b} » riment ?`,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [paire.riment],
    comparator: "mcq_exact",
    explanation: exp(
      "Deux mots riment quand leur fin se prononce pareil.",
      `« ${paire.a} » et « ${paire.b} » → ${paire.riment === "oui" ? "meme terminaison" : "terminaisons differentes"}.`,
      `La reponse est « ${paire.riment} ».`
    ),
  };
}

function graphemePhonemeQuestion(_level: Cycle2Level, variant: number): Generated {
  if (variant === 0) {
    const sons = [
      { son: "ou", mots: ["loup", "chou", "hibou"], faux: ["chat", "nid", "pied"] },
      { son: "an", mots: ["dent", "vent", "chant"], faux: ["lit", "roi", "nuit"] },
      { son: "on", mots: ["bon", "son", "pont"], faux: ["main", "bras", "oeil"] },
      { son: "in", mots: ["pain", "main", "lapin"], faux: ["boul", "sac", "dos"] },
    ];
    const item = randomChoice(sons);
    const correct = randomChoice(item.mots);
    return {
      text: `Quel mot contient le son « ${item.son} » ?`,
      format: "qcm",
      choices: makeChoices(correct, item.faux),
      expected: [correct],
      comparator: "mcq_exact",
      explanation: exp(
        `On cherche le mot qui contient le son « ${item.son} ».`,
        `« ${correct} » contient bien le son « ${item.son} ».`,
        `La bonne reponse est « ${correct} ».`
      ),
    };
  }

  const graphemes = [
    { grapheme: "ch", son: "ch comme dans chat", exemple: "chapeau" },
    { grapheme: "ou", son: "ou comme dans loup", exemple: "hibou" },
    { grapheme: "an", son: "an comme dans vent", exemple: "enfant" },
    { grapheme: "ph", son: "f comme dans telephone", exemple: "photo" },
  ];
  const item = randomChoice(graphemes);
  return {
    text: `Quel est le son de la lettre ou du groupe de lettres « ${item.grapheme} » ?`,
    format: "qcm",
    choices: makeChoices(item.son, graphemes.filter((g) => g.grapheme !== item.grapheme).map((g) => g.son)),
    expected: [item.son],
    comparator: "mcq_exact",
    explanation: exp(
      `Le grapheme « ${item.grapheme} » se prononce comme le son « ${item.son.split(" ")[0]} ».`,
      `Exemple : « ${item.exemple} ».`,
      `Le son de « ${item.grapheme} » est ${item.son}.`
    ),
  };
}

function lectureSyllabiqueQuestion(_level: Cycle2Level, variant: number): Generated {
  if (variant === 0) {
    const syllabes = [
      { syllabes: ["ba", "la", "ma"], correct: "ba" },
      { syllabes: ["ro", "no", "lo"], correct: "ro" },
      { syllabes: ["fi", "si", "di"], correct: "fi" },
    ];
    const item = randomChoice(syllabes);
    return {
      text: `Parmi ces syllabes, laquelle commence par la lettre « b » ?`,
      format: "qcm",
      choices: shuffle(item.syllabes),
      expected: ["ba"],
      comparator: "mcq_exact",
      explanation: exp(
        "On regarde la premiere lettre de chaque syllabe.",
        "« ba » commence bien par la lettre b.",
        "La bonne reponse est « ba »."
      ),
    };
  }

  const mots_frequents = ["le", "la", "les", "un", "une", "est", "et", "dans", "avec", "pour"];
  const correct = randomChoice(mots_frequents);
  const faux = mots_frequents.filter((m) => m !== correct).slice(0, 3);
  return {
    text: `Quel mot est un mot tres frequent que tu dois reconnaitre sans dechiffrer ?`,
    format: "qcm",
    choices: shuffle([correct, ...faux]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Certains mots tres frequents se reconnaissent d'un coup d'oeil.",
      `« ${correct} » est un mot tres courant en lecture.`,
      `La bonne reponse est « ${correct} ».`
    ),
  };
}

function comprehensionQuestion(_level: Cycle2Level, variant: number): Generated {
  const textes = [
    {
      texte: "Tom est dans le jardin. Il voit un lapin blanc. Le lapin mange des carottes.",
      personnage: "Tom",
      lieu: "le jardin",
      action: "manger des carottes",
      sujet: "le lapin",
    },
    {
      texte: "Lea va a l'ecole. Elle porte un grand sac bleu. Son ami Paul l'attend devant la porte.",
      personnage: "Lea",
      lieu: "l'ecole",
      action: "attendre Lea",
      sujet: "Paul",
    },
  ];
  const t = randomChoice(textes);

  if (variant === 0) {
    return {
      text: `Lis ce texte :\n« ${t.texte} »\n\nQui est le personnage principal ?`,
      format: "qcm",
      choices: makeChoices(t.personnage, ["le chat", "la maitresse", "le boulanger"]),
      expected: [t.personnage],
      comparator: "mcq_exact",
      explanation: exp(
        "Le personnage principal est celui dont on parle le plus dans le texte.",
        `Dans ce texte, on parle surtout de ${t.personnage}.`,
        `Le personnage principal est ${t.personnage}.`
      ),
    };
  }

  return {
    text: `Lis ce texte :\n« ${t.texte} »\n\nOu se passe l'histoire ?`,
    format: "qcm",
    choices: makeChoices(t.lieu, ["la cuisine", "la foret", "la mer"]),
    expected: [t.lieu],
    comparator: "mcq_exact",
    explanation: exp(
      "Pour trouver le lieu, on cherche les mots qui indiquent ou on est.",
      `Le texte dit que ${t.personnage} est dans ${t.lieu}.`,
      `L'histoire se passe dans ${t.lieu}.`
    ),
  };
}

function copieQuestion(_level: Cycle2Level, variant: number): Generated {
  if (variant === 0) {
    const mots = ["maison", "soleil", "chapeau", "jardin", "enfant"];
    const mot = randomChoice(mots);
    const faux = mot.split("").reverse().join("");
    return {
      text: `Quel mot est ecrit correctement ?`,
      format: "qcm",
      choices: makeChoices(mot, [faux, mot.slice(1), mot + "s"]),
      expected: [mot],
      comparator: "mcq_exact",
      explanation: exp(
        "On copie un mot lettre par lettre dans le bon ordre.",
        `Le mot « ${mot} » s'ecrit avec ces lettres dans cet ordre.`,
        `La bonne orthographe est « ${mot} ».`
      ),
    };
  }

  return {
    text: `Quelle phrase est correctement ecrite avec une majuscule au debut et un point a la fin ?`,
    format: "qcm",
    choices: [
      "Le chat dort sur le canape.",
      "le chat dort sur le canape.",
      "Le chat dort sur le canape",
      "le chat dort sur le canape",
    ],
    expected: ["Le chat dort sur le canape."],
    comparator: "mcq_exact",
    explanation: exp(
      "Une phrase commence par une majuscule et se termine par un point.",
      "« Le chat dort sur le canape. » est bien formee.",
      "La bonne reponse est « Le chat dort sur le canape. »"
    ),
  };
}

function dicteeQuestion(_level: Cycle2Level, variant: number): Generated {
  if (variant === 0) {
    const items = [
      { question: "Comment ecrit-on le son « o » dans le mot « gateau » ?", correct: "eau", faux: ["o", "au", "ot"] },
      { question: "Comment ecrit-on le son « s » au debut du mot « sac » ?", correct: "s", faux: ["c", "ss", "z"] },
      { question: "Comment ecrit-on le son « f » dans le mot « photo » ?", correct: "ph", faux: ["f", "ff", "v"] },
    ];
    const item = randomChoice(items);
    return {
      text: item.question,
      format: "qcm",
      choices: makeChoices(item.correct, item.faux),
      expected: [item.correct],
      comparator: "mcq_exact",
      explanation: exp(
        "Un son peut s'ecrire de plusieurs facons en français.",
        `Dans ce mot, on utilise « ${item.correct} ».`,
        `La bonne reponse est « ${item.correct} ».`
      ),
    };
  }

  const mots_courants = [
    { question: "Comment s'ecrit le mot qui signifie « pas maintenant » ?", correct: "non", faux: ["nom", "mon", "bon"] },
    { question: "Comment s'ecrit le mot qui relie deux idees ?", correct: "et", faux: ["est", "ai", "aie"] },
    { question: "Comment s'ecrit le petit mot qui designe un endroit ?", correct: "ou", faux: ["ou", "ou", "au"] },
  ];
  const item = randomChoice(mots_courants);
  return {
    text: item.question,
    format: "qcm",
    choices: makeChoices(item.correct, item.faux),
    expected: [item.correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Certains mots tres courants ont une orthographe a connaitre par coeur.",
      `Le mot « ${item.correct} » fait partie des mots a memoriser.`,
      `La bonne reponse est « ${item.correct} ».`
    ),
  };
}

function productionEcriteQuestion(_level: Cycle2Level, variant: number): Generated {
  if (variant === 0) {
    return {
      text: "Pour ecrire une bonne phrase, qu'est-ce qui est indispensable ?",
      format: "qcm",
      choices: [
        "Un verbe et un sujet",
        "Seulement un nom",
        "Deux adjectifs",
        "Des chiffres",
      ],
      expected: ["Un verbe et un sujet"],
      comparator: "mcq_exact",
      explanation: exp(
        "Une phrase contient toujours un sujet et un verbe.",
        "« Le chat dort » : chat = sujet, dort = verbe.",
        "Une phrase a besoin d'un verbe et d'un sujet."
      ),
    };
  }

  return {
    text: "Quel debut de phrase permet de decrire une image d'un chien dans un jardin ?",
    format: "qcm",
    choices: [
      "Le chien joue dans le jardin.",
      "Demain il pleuvra.",
      "Deux plus deux font quatre.",
      "La lune est ronde.",
    ],
    expected: ["Le chien joue dans le jardin."],
    comparator: "mcq_exact",
    explanation: exp(
      "On ecrit une phrase qui correspond a ce qu'on voit dans l'image.",
      "L'image montre un chien dans un jardin.",
      "La bonne phrase est « Le chien joue dans le jardin. »"
    ),
  };
}

function grammairePhrase(_level: Cycle2Level, variant: number): Generated {
  if (variant === 0) {
    return {
      text: "Laquelle de ces suites de mots est une vraie phrase ?",
      format: "qcm",
      choices: [
        "Le soleil brille aujourd'hui.",
        "chien rouge mange",
        "courir vite tres bien",
        "la maison et le arbre",
      ],
      expected: ["Le soleil brille aujourd'hui."],
      comparator: "mcq_exact",
      explanation: exp(
        "Une phrase a un sens complet, un sujet, un verbe, une majuscule et un point.",
        "« Le soleil brille aujourd'hui. » a un sujet (le soleil), un verbe (brille) et une ponctuation.",
        "La bonne reponse est « Le soleil brille aujourd'hui. »"
      ),
    };
  }

  const phrases = [
    { phrase: "Le petit chat dort sur le canape.", sujet: "Le petit chat", verbe: "dort" },
    { phrase: "Les enfants jouent dans la cour.", sujet: "Les enfants", verbe: "jouent" },
    { phrase: "Ma soeur mange une pomme.", sujet: "Ma soeur", verbe: "mange" },
  ];
  const item = randomChoice(phrases);
  return {
    text: `Dans la phrase « ${item.phrase} », quel est le verbe ?`,
    format: "qcm",
    choices: makeChoices(item.verbe, ["chat", "canape", "petit", "les"]),
    expected: [item.verbe],
    comparator: "mcq_exact",
    explanation: exp(
      "Le verbe exprime l'action ou l'etat dans la phrase.",
      `Dans « ${item.phrase} », le verbe est « ${item.verbe} ».`,
      `Le verbe est « ${item.verbe} ».`
    ),
  };
}

function orthographeQuestion(_level: Cycle2Level, variant: number): Generated {
  if (variant === 0) {
    const groupes = [
      { correct: "le chat", faux: ["la chat", "les chat", "un chats"] },
      { correct: "une fleur", faux: ["un fleur", "les fleur", "la fleurs"] },
      { correct: "les enfants", faux: ["le enfants", "les enfant", "la enfants"] },
    ];
    const item = randomChoice(groupes);
    return {
      text: `Quel groupe est ecrit correctement ?`,
      format: "qcm",
      choices: makeChoices(item.correct, item.faux),
      expected: [item.correct],
      comparator: "mcq_exact",
      explanation: exp(
        "Le determinant s'accorde en genre et en nombre avec le nom.",
        `« ${item.correct} » : le determinant et le nom sont bien accordes.`,
        `La bonne reponse est « ${item.correct} ».`
      ),
    };
  }

  const homophones = [
    { question: "Laquelle de ces phrases utilise correctement « est » ?", correct: "Le chat est gris.", faux: ["Le chat et gris.", "Et chat est gris.", "Le chat es gris."] },
    { question: "Laquelle de ces phrases utilise correctement « et » ?", correct: "Tom et Lea jouent.", faux: ["Tom est Lea jouent.", "Tom ai Lea jouent.", "Tom e Lea jouent."] },
  ];
  const item = randomChoice(homophones);
  return {
    text: item.question,
    format: "qcm",
    choices: makeChoices(item.correct, item.faux),
    expected: [item.correct],
    comparator: "mcq_exact",
    explanation: exp(
      "« est » vient du verbe etre. « et » relie deux elements.",
      `« ${item.correct} » utilise le bon mot.`,
      `La bonne reponse est « ${item.correct} ».`
    ),
  };
}

function vocabulaireQuestion(_level: Cycle2Level, variant: number): Generated {
  if (variant === 0) {
    const familles = [
      { mot: "jardin", famille: ["jardiner", "jardinier", "jardinage"], intrus: "cuisine" },
      { mot: "lire", famille: ["lecture", "lecteur", "livre"], intrus: "courir" },
      { mot: "froid", famille: ["froideur", "refroidir", "froidement"], intrus: "chaud" },
    ];
    const item = randomChoice(familles);
    return {
      text: `Quel mot ne fait PAS partie de la famille du mot « ${item.mot} » ?`,
      format: "qcm",
      choices: shuffle([...item.famille.slice(0, 2), item.intrus]),
      expected: [item.intrus],
      comparator: "mcq_exact",
      explanation: exp(
        "Les mots d'une meme famille ont une meme racine et un sens proche.",
        `« ${item.intrus} » n'a pas de lien avec « ${item.mot} ».`,
        `L'intrus est « ${item.intrus} ».`
      ),
    };
  }

  const synonymes = [
    { mot: "rapide", synonyme: "vite", faux: ["lent", "gros", "bleu"] },
    { mot: "content", synonyme: "heureux", faux: ["triste", "mechant", "rouge"] },
    { mot: "petit", synonyme: "minuscule", faux: ["grand", "fort", "beau"] },
  ];
  const item = randomChoice(synonymes);
  return {
    text: `Quel mot a le meme sens que « ${item.mot} » ?`,
    format: "qcm",
    choices: makeChoices(item.synonyme, item.faux),
    expected: [item.synonyme],
    comparator: "mcq_exact",
    explanation: exp(
      "Un synonyme est un mot qui a un sens tres proche.",
      `« ${item.synonyme} » et « ${item.mot} » veulent dire la meme chose.`,
      `La bonne reponse est « ${item.synonyme} ».`
    ),
  };
}

function langageOralQuestion(_level: Cycle2Level, variant: number): Generated {
  if (variant === 0) {
    return {
      text: "On te lit la phrase : « Les oiseaux chantent dans les arbres. » De quoi parle-t-on ?",
      format: "qcm",
      choices: ["Des oiseaux qui chantent", "Des poissons qui nagent", "Des enfants qui courent", "Du vent qui souffle"],
      expected: ["Des oiseaux qui chantent"],
      comparator: "mcq_exact",
      explanation: exp(
        "On ecoute les mots cles pour comprendre le sujet de la phrase.",
        "La phrase parle d'oiseaux qui chantent dans les arbres.",
        "La bonne reponse est « Des oiseaux qui chantent »."
      ),
    };
  }

  return {
    text: "Pour bien raconter ce qu'on a vu ou lu, quelle est la meilleure facon de faire ?",
    format: "qcm",
    choices: [
      "Raconter dans l'ordre avec ses propres mots",
      "Repeter mot a mot sans comprendre",
      "Ne rien dire",
      "Inventer une autre histoire",
    ],
    expected: ["Raconter dans l'ordre avec ses propres mots"],
    comparator: "mcq_exact",
    explanation: exp(
      "Reformuler, c'est redire avec ses propres mots en gardant les idees importantes.",
      "On garde l'ordre des evenements et on utilise ses propres mots.",
      "La bonne reponse est « Raconter dans l'ordre avec ses propres mots »."
    ),
  };
}

// CE1 — notions supplementaires
function fluenceQuestion(_level: Cycle2Level, variant: number): Generated {
  if (variant === 0) {
    return {
      text: "Pour lire avec fluidite, que doit-on faire ?",
      format: "qcm",
      choices: [
        "Reconnaitre les mots rapidement sans les dechiffrer lettre par lettre",
        "Lire tres lentement chaque lettre",
        "Sauter les mots difficiles",
        "Lire uniquement les majuscules",
      ],
      expected: ["Reconnaitre les mots rapidement sans les dechiffrer lettre par lettre"],
      comparator: "mcq_exact",
      explanation: exp(
        "La fluence, c'est lire vite et sans effort grace a la reconnaissance des mots.",
        "Un lecteur fluent reconnait les mots d'un seul coup d'oeil.",
        "La bonne reponse est « Reconnaitre les mots rapidement »."
      ),
    };
  }

  return {
    text: "Quel signe de ponctuation indique qu'il faut s'arreter et baisser la voix ?",
    format: "qcm",
    choices: ["le point (.)", "la virgule (,)", "le point d'exclamation (!)", "les deux points (:)"],
    expected: ["le point (.)"],
    comparator: "mcq_exact",
    explanation: exp(
      "Le point marque la fin d'une phrase : on s'arrete et on baisse la voix.",
      "Quand on voit « . », on fait une pause complete.",
      "La bonne reponse est « le point (.) »."
    ),
  };
}

function sonsComplexesQuestion(_level: Cycle2Level, variant: number): Generated {
  if (variant === 0) {
    const sons = [
      { question: "Comment prononce-t-on les lettres « gn » dans « montagne » ?", correct: "gn comme dans agneau", faux: ["g dur", "j", "n seul"] },
      { question: "Comment prononce-t-on « ill » dans « fille » ?", correct: "ill comme dans famille", faux: ["il", "ille", "i seul"] },
    ];
    const item = randomChoice(sons);
    return {
      text: item.question,
      format: "qcm",
      choices: makeChoices(item.correct, item.faux),
      expected: [item.correct],
      comparator: "mcq_exact",
      explanation: exp(
        "Certains groupes de lettres forment un son special.",
        `« gn » se prononce comme dans « ${item.correct.split(" ").pop()} ».`,
        `La bonne reponse est « ${item.correct} ».`
      ),
    };
  }

  const accents = [
    { question: "Quel mot contient un « e » avec un accent aigu ?", correct: "ecole", faux: ["arbre", "table", "livre"] },
    { question: "Dans quel mot le « e » est-il muet (ne se prononce pas) ?", correct: "grande", faux: ["ete", "porte", "fete"] },
  ];
  const item = randomChoice(accents);
  return {
    text: item.question,
    format: "qcm",
    choices: makeChoices(item.correct, item.faux),
    expected: [item.correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Les accents changent la prononciation du « e ».",
      `Dans « ${item.correct} », le « e » est particulier.`,
      `La bonne reponse est « ${item.correct} ».`
    ),
  };
}

function classesMots(_level: Cycle2Level, variant: number): Generated {
  if (variant === 0) {
    const phrases = [
      { phrase: "Le petit chien aboie.", nom: "chien", adj: "petit", verbe: "aboie" },
      { phrase: "La jolie fleur pousse.", nom: "fleur", adj: "jolie", verbe: "pousse" },
    ];
    const item = randomChoice(phrases);
    return {
      text: `Dans « ${item.phrase} », quel mot est un adjectif ?`,
      format: "qcm",
      choices: makeChoices(item.adj, [item.nom, item.verbe, "le"]),
      expected: [item.adj],
      comparator: "mcq_exact",
      explanation: exp(
        "L'adjectif qualificatif decrit le nom. Il repond a la question « comment ? ».",
        `Dans « ${item.phrase} », ${item.adj} decrit le ${item.nom}.`,
        `L'adjectif est « ${item.adj} ».`
      ),
    };
  }

  const noms = [
    { question: "Quel mot est un nom propre ?", correct: "Paris", faux: ["ville", "grande", "belle"] },
    { question: "Quel mot est un nom commun ?", correct: "maison", faux: ["Marie", "France", "Lundi"] },
  ];
  const item = randomChoice(noms);
  return {
    text: item.question,
    format: "qcm",
    choices: makeChoices(item.correct, item.faux),
    expected: [item.correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Les noms propres designent une personne ou un lieu unique et prennent une majuscule. Les noms communs designent une categorie.",
      `« ${item.correct} » est un ${item.correct[0] === item.correct[0].toUpperCase() ? "nom propre" : "nom commun"}.`,
      `La bonne reponse est « ${item.correct} ».`
    ),
  };
}

function conjugaisonQuestion(_level: Cycle2Level, variant: number): Generated {
  const verbes_er = [
    { inf: "chanter", je: "chante", tu: "chantes", il: "chante", nous: "chantons", ils: "chantent" },
    { inf: "jouer", je: "joue", tu: "joues", il: "joue", nous: "jouons", ils: "jouent" },
    { inf: "manger", je: "mange", tu: "manges", il: "mange", nous: "mangeons", ils: "mangent" },
  ];

  if (variant === 0) {
    const v = randomChoice(verbes_er);
    const pronoms = [
      { pronom: "je", correct: v.je },
      { pronom: "nous", correct: v.nous },
      { pronom: "ils", correct: v.ils },
    ];
    const item = randomChoice(pronoms);
    return {
      text: `Conjugue le verbe « ${v.inf} » au present avec « ${item.pronom} » :`,
      format: "short",
      expected: [item.correct],
      comparator: "exact_text",
      explanation: exp(
        `Les verbes en -er se conjuguent : je -e, tu -es, il -e, nous -ons, vous -ez, ils -ent.`,
        `${v.inf} → ${item.pronom} ${item.correct}.`,
        `La bonne reponse est « ${item.correct} ».`
      ),
    };
  }

  const etreAvoir = [
    { question: "Conjugue « etre » au present avec « il » :", correct: "est", faux: ["es", "suis", "sommes"] },
    { question: "Conjugue « avoir » au present avec « nous » :", correct: "avons", faux: ["ont", "as", "a"] },
    { question: "Conjugue « etre » au present avec « nous » :", correct: "sommes", faux: ["etes", "sont", "suis"] },
  ];
  const item = randomChoice(etreAvoir);
  return {
    text: item.question,
    format: "qcm",
    choices: makeChoices(item.correct, item.faux),
    expected: [item.correct],
    comparator: "mcq_exact",
    explanation: exp(
      "« etre » et « avoir » sont des verbes irreguliers a apprendre par coeur.",
      `La forme correcte est « ${item.correct} ».`,
      `La bonne reponse est « ${item.correct} ».`
    ),
  };
}

function typesTextesQuestion(_level: Cycle2Level, variant: number): Generated {
  if (variant === 0) {
    return {
      text: "Un texte qui raconte une histoire avec des personnages est un texte…",
      format: "qcm",
      choices: ["narratif", "documentaire", "poetique", "prescriptif"],
      expected: ["narratif"],
      comparator: "mcq_exact",
      explanation: exp(
        "Un texte narratif raconte une histoire avec des personnages, un lieu et des evenements.",
        "« Il etait une fois une fee... » est un texte narratif.",
        "La bonne reponse est « narratif »."
      ),
    };
  }

  return {
    text: "Quelle caracteristique reconnaissable appartient au texte poetique ?",
    format: "qcm",
    choices: ["les rimes et les vers", "les paragraphes numerotes", "les schemas et tableaux", "les listes a puces"],
    expected: ["les rimes et les vers"],
    comparator: "mcq_exact",
    explanation: exp(
      "Un poeme est organize en vers et utilise souvent des rimes.",
      "On reconnait un poeme a sa disposition en lignes courtes et ses sonorities.",
      "La bonne reponse est « les rimes et les vers »."
    ),
  };
}

// ──────────────────────────────────────────────────────────────────────────────
// ROUTEUR
// ──────────────────────────────────────────────────────────────────────────────

function questionForNotion(level: Cycle2Level, notionId: string, variant: number): Generated {
  if (notionId.includes("phonolog")) return phonologieQuestion(level, variant);
  if (notionId.includes("grapheme")) return graphemePhonemeQuestion(level, variant);
  if (notionId.includes("lecture_syllab") || notionId.includes("fluence")) return lectureSyllabiqueQuestion(level, variant);
  if (notionId.includes("comprehension")) return comprehensionQuestion(level, variant);
  if (notionId.includes("copie")) return copieQuestion(level, variant);
  if (notionId.includes("ecriture") || notionId.includes("dict")) return dicteeQuestion(level, variant);
  if (notionId.includes("production")) return productionEcriteQuestion(level, variant);
  if (notionId.includes("grammaire")) return grammairePhrase(level, variant);
  if (notionId.includes("orthographe")) return orthographeQuestion(level, variant);
  if (notionId.includes("vocabulaire")) return vocabulaireQuestion(level, variant);
  if (notionId.includes("oral")) return langageOralQuestion(level, variant);
  if (notionId.includes("sons_complexes")) return sonsComplexesQuestion(level, variant);
  if (notionId.includes("classes_mots")) return classesMots(level, variant);
  if (notionId.includes("conjugaison")) return conjugaisonQuestion(level, variant);
  if (notionId.includes("types_textes")) return typesTextesQuestion(level, variant);

  return langageOralQuestion(level, variant);
}

// ──────────────────────────────────────────────────────────────────────────────
// BUILDER PRINCIPAL
// ──────────────────────────────────────────────────────────────────────────────

function makeTemplate(
  level: Cycle2Level,
  micro: MicroSkillSource,
  variant: 0 | 1
): TutorBankItemV4 {
  return {
    kind: "template",
    id: `${level}_${micro.id}_fr_tpl_${variant + 1}`,
    niveau: level,
    matiere: "francais",
    notionId: micro.notionId,
    microId: micro.id,
    difficulty: variant === 0 ? 1 : 2,
    theme: "neutral",
    hint: micro.label,
    tags: [level, micro.notionId, micro.id, "cycle2", "francais", "template"],
    generate: () => questionForNotion(level, micro.notionId, variant),
  };
}

export function buildCycle2FrancaisBank(
  level: Cycle2Level,
  microSkills: readonly MicroSkillSource[]
): TutorBankItemV4[] {
  return microSkills.flatMap((micro) => [
    makeTemplate(level, micro, 0),
    makeTemplate(level, micro, 1),
    {
      ...makeTemplate(level, micro, 1),
      id: `${level}_${micro.id}_fr_tpl_3_defi`,
      difficulty: 3,
      tags: [level, micro.notionId, micro.id, "cycle2", "francais", "template", "defi"],
    },
  ]);
}
