import type {
  ComparatorName,
  QuestionFormat,
  SchoolLevel,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

type Cycle4Level = Extract<SchoolLevel, "5e" | "4e" | "3e">;

type Generated = TutorGeneratedQuestionV4 & {
  format: QuestionFormat;
  comparator: ComparatorName;
};

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  return shuffle([correct, ...wrongs.filter((w) => w !== correct)]).slice(0, 4);
}

function exp(methode: string, exemple: string, conclusion: string) {
  return `Methode : ${methode}\n\nExemple : ${exemple}\n\nConclusion : ${conclusion}`;
}

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function lectureQuestion(level: Cycle4Level): Generated {
  const item = pick([
    {
      text: "Le narrateur avance dans une ville inconnue. Chaque rue semble lui rappeler un souvenir qu'il croyait perdu.",
      question: "Quelle interpretation est la plus solide ?",
      correct: "Le lieu fait remonter la memoire du personnage",
      wrongs: ["Le narrateur est un guide touristique", "La ville est decrite comme un plan", "Le texte donne une recette"],
    },
    {
      text: "Elle repond calmement, mais ses mains tremblent sous la table.",
      question: "Que suggere l'implicite de cette phrase ?",
      correct: "Le personnage cache une emotion forte",
      wrongs: ["Le personnage dort", "La table est cassee", "La scene est comique uniquement"],
    },
  ]);

  return {
    text: `Niveau ${level}. Lis :\n"${item.text}"\n\n${item.question}`,
    format: "qcm",
    choices: makeChoices(item.correct, item.wrongs),
    expected: [item.correct],
    comparator: "mcq_exact",
    explanation: exp(
      "On interprete en reliant le sens global et les indices du texte.",
      `L'indice utile conduit a comprendre que : ${item.correct}.`,
      "Une interpretation doit toujours etre justifiee par le texte."
    ),
  };
}

function cultureQuestion(level: Cycle4Level): Generated {
  const themes: Record<Cycle4Level, string> = {
    "5e": "heros, voyage, theatre et recits pour instruire",
    "4e": "fiction, poesie, theatre, jugement et heritage des Lumieres",
    "3e": "temoignage, engagement humaniste, poesie et theatre citoyen",
  };

  return {
    text: `En ${level}, quel choix correspond le mieux a la perspective litteraire du niveau ?`,
    format: "qcm",
    choices: makeChoices(themes[level], [
      "uniquement apprendre des listes de dates",
      "remplacer toute lecture par des resumes",
      "etudier seulement des textes techniques",
    ]),
    expected: [themes[level]],
    comparator: "mcq_exact",
    explanation: exp(
      "Chaque niveau du cycle 4 organise les lectures autour d'une perspective annuelle.",
      `Pour ${level}, on travaille notamment : ${themes[level]}.`,
      "La culture litteraire relie textes, oeuvres, genres et enjeux humains."
    ),
  };
}

function ecritureQuestion(): Generated {
  return {
    text: "Quelle revision rend un ecrit plus solide au cycle 4 ?",
    format: "qcm",
    choices: makeChoices("verifier la coherence, enrichir le lexique et corriger les accords", [
      "changer seulement la police d'ecriture",
      "supprimer tous les connecteurs",
      "ne garder que la premiere phrase",
    ]),
    expected: ["verifier la coherence, enrichir le lexique et corriger les accords"],
    comparator: "mcq_exact",
    explanation: exp(
      "Reviser, c'est ameliorer le fond et la langue.",
      "On controle l'organisation, le vocabulaire, la syntaxe et l'orthographe.",
      "Un ecrit evolue par relecture active."
    ),
  };
}

function oralQuestion(): Generated {
  return {
    text: "Dans un debat interpretatif, quelle prise de parole est la plus attendue ?",
    format: "qcm",
    choices: makeChoices("Je pense que ce personnage hesite, car le texte dit que sa voix tremble.", [
      "Je n'aime pas, c'est tout.",
      "Tout le monde a tort sauf moi.",
      "Je change de sujet.",
    ]),
    expected: ["Je pense que ce personnage hesite, car le texte dit que sa voix tremble."],
    comparator: "mcq_exact",
    explanation: exp(
      "Une parole argumentee donne une idee et une justification.",
      "La reponse correcte s'appuie sur un indice du texte.",
      "Au cycle 4, on apprend a defendre son interpretation."
    ),
  };
}

function vocabulaireQuestion(): Generated {
  const item = pick([
    { question: "Quel mot appartient au champ lexical du jugement ?", correct: "valeur", wrongs: ["fenetre", "cuillere", "triangle"] },
    { question: "Quel prefixe marque souvent l'opposition ou la negation ?", correct: "in-", wrongs: ["re-", "pre-", "micro-"] },
    { question: "Quel mot est le plus precis pour remplacer tres triste ?", correct: "accable", wrongs: ["content", "rapide", "visible"] },
  ]);

  return {
    text: item.question,
    format: "qcm",
    choices: makeChoices(item.correct, item.wrongs),
    expected: [item.correct],
    comparator: "mcq_exact",
    explanation: exp(
      "On choisit le mot selon son sens, sa formation et son contexte.",
      `La reponse correcte est : ${item.correct}.`,
      "Le vocabulaire aide a comprendre et exprimer avec precision."
    ),
  };
}

function grammaireQuestion(): Generated {
  const item = pick([
    {
      question: "Dans 'Les temoins racontent leur histoire avec emotion', quelle est la fonction de 'Les temoins' ?",
      correct: "sujet du verbe racontent",
      wrongs: ["complement de phrase", "adjectif", "verbe conjugue"],
    },
    {
      question: "Quelle phrase utilise un registre plus soutenu ?",
      correct: "Je vous prie de bien vouloir patienter.",
      wrongs: ["Attends deux secondes.", "Bouge pas.", "C'est bon, patiente."],
    },
    {
      question: "Quelle phrase contient des paroles rapportees directement ?",
      correct: "Elle murmura : 'Je reviendrai demain.'",
      wrongs: ["Elle dit qu'elle reviendrait.", "Elle reviendra demain.", "Demain, elle revient."],
    },
  ]);

  return {
    text: item.question,
    format: "qcm",
    choices: makeChoices(item.correct, item.wrongs),
    expected: [item.correct],
    comparator: "mcq_exact",
    explanation: exp(
      "On observe la phrase, les fonctions et la situation de communication.",
      `La reponse correcte est : ${item.correct}.`,
      "L'analyse grammaticale sert la lecture et l'ecriture."
    ),
  };
}

function conjugaisonQuestion(): Generated {
  const item = pick([
    { question: "Conjugue 'defendre' au present avec nous.", correct: "defendons", wrongs: ["defendent", "defendions", "defendrons"] },
    { question: "Dans 'Il avait compris', quel temps est employe ?", correct: "plus-que-parfait", wrongs: ["present", "futur", "imperatif"] },
    { question: "Quel mode exprime un ordre ou un conseil ?", correct: "imperatif", wrongs: ["indicatif", "infinitif", "participe"] },
  ]);

  return {
    text: item.question,
    format: item.correct.endsWith("ons") ? "short" : "qcm",
    choices: item.correct.endsWith("ons") ? undefined : makeChoices(item.correct, item.wrongs),
    expected: [item.correct],
    comparator: item.correct.endsWith("ons") ? "exact_text" : "mcq_exact",
    explanation: exp(
      "On identifie le verbe, le sujet, le temps et le mode.",
      `La reponse attendue est : ${item.correct}.`,
      "Les formes verbales se construisent avec radical, marque de temps et terminaison."
    ),
  };
}

function questionForNotion(level: Cycle4Level, notionId: string): Generated {
  if (notionId.includes("lecture_comprehension")) return lectureQuestion(level);
  if (notionId.includes("lecture_voix")) return oralQuestion();
  if (notionId.includes("culture")) return cultureQuestion(level);
  if (notionId.includes("ecriture")) return ecritureQuestion();
  if (notionId.includes("oral")) return oralQuestion();
  if (notionId.includes("vocabulaire")) return vocabulaireQuestion();
  if (notionId.includes("conjugaison")) return conjugaisonQuestion();
  return grammaireQuestion();
}

function makeTemplate(
  level: Cycle4Level,
  micro: MicroSkillSource,
  variant: 0 | 1
): TutorBankItemV4 {
  return {
    kind: "template",
    id: `${level}_${micro.id}_fr_cycle4_tpl_${variant + 1}`,
    niveau: level,
    matiere: "francais",
    notionId: micro.notionId,
    microId: micro.id,
    difficulty: variant === 0 ? 3 : 4,
    theme: "neutral",
    hint: micro.label,
    tags: [level, micro.notionId, micro.id, "cycle4", "francais", "template"],
    generate: () => questionForNotion(level, micro.notionId),
  };
}

export function buildCycle4FrancaisBank(
  level: Cycle4Level,
  microSkills: readonly MicroSkillSource[]
): TutorBankItemV4[] {
  return microSkills.flatMap((micro) => [
    makeTemplate(level, micro, 0),
    makeTemplate(level, micro, 1),
    {
      ...makeTemplate(level, micro, 1),
      id: `${level}_${micro.id}_fr_cycle4_tpl_3_defi`,
      difficulty: 5,
      tags: [level, micro.notionId, micro.id, "cycle4", "francais", "template", "defi"],
    },
  ]);
}
