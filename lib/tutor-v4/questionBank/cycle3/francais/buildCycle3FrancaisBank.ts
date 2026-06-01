import type {
  ComparatorName,
  QuestionFormat,
  SchoolLevel,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

type Cycle3PrimaryLevel = Extract<SchoolLevel, "cm1" | "cm2" | "6e">;

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

function lectureQuestion(): Generated {
  const item = pick([
    {
      text: "Le vent secouait les volets. Nina serra son manteau et traversa la cour sans courir.",
      question: "Quel indice montre qu'il fait probablement froid ?",
      correct: "Nina serre son manteau",
      wrongs: ["Nina court vite", "les volets sont rouges", "la cour est vide"],
    },
    {
      text: "Le rideau se leve. Deux personnages entrent et parlent chacun leur tour.",
      question: "De quel genre de texte s'agit-il surtout ?",
      correct: "un extrait de theatre",
      wrongs: ["un article documentaire", "une recette", "une lettre"],
    },
  ]);

  return {
    text: `Lis ce passage :\n"${item.text}"\n\n${item.question}`,
    format: "qcm",
    choices: makeChoices(item.correct, item.wrongs),
    expected: [item.correct],
    comparator: "mcq_exact",
    explanation: exp(
      "On justifie sa reponse avec un indice precis du texte.",
      `L'indice utile est : ${item.correct}.`,
      "La bonne reponse s'appuie sur le texte."
    ),
  };
}

function documentQuestion(): Generated {
  return {
    text: "Un document indique : Titre : Les volcans. Source : magazine scientifique junior. Date : mars 2025. Quelle information donne la source ?",
    format: "qcm",
    choices: makeChoices("d'ou vient le document", [
      "le sujet principal",
      "le nom du lecteur",
      "la conclusion du texte",
    ]),
    expected: ["d'ou vient le document"],
    comparator: "mcq_exact",
    explanation: exp(
      "La source indique l'origine du document.",
      "Ici, le document vient d'un magazine scientifique junior.",
      "La source sert a savoir d'ou vient l'information."
    ),
  };
}

function oeuvreQuestion(): Generated {
  return {
    text: "Apres la lecture d'un conte, quelle trace est la plus utile dans un carnet de lecteur ?",
    format: "qcm",
    choices: makeChoices("un avis personnel avec un passage qui le justifie", [
      "seulement le nombre de pages",
      "une liste de calculs",
      "la couleur de la couverture seulement",
    ]),
    expected: ["un avis personnel avec un passage qui le justifie"],
    comparator: "mcq_exact",
    explanation: exp(
      "Un carnet de lecteur garde la memoire de ce qu'on a compris et ressenti.",
      "Un avis justifie montre que l'on s'approprie l'oeuvre.",
      "La trace utile relie impression personnelle et texte lu."
    ),
  };
}

function ecritureQuestion(): Generated {
  if (Math.random() < 0.5) {
    return {
      text: "Quelle phrase est la plus claire et correctement ponctuee ?",
      format: "qcm",
      choices: makeChoices("Le cheval traverse la prairie, puis il rejoint l'etable.", [
        "Le cheval traverse la prairie puis",
        "traverse prairie cheval etable",
        "Le cheval traverse la prairie puis il rejoint l'etable",
      ]),
      expected: ["Le cheval traverse la prairie, puis il rejoint l'etable."],
      comparator: "mcq_exact",
      explanation: exp(
        "Une phrase claire a un sens complet et une ponctuation correcte.",
        "La phrase choisie commence par une majuscule et finit par un point.",
        "Elle est complete et lisible."
      ),
    };
  }

  return {
    text: "Pour ameliorer un paragraphe, que faut-il verifier en priorite ?",
    format: "qcm",
    choices: makeChoices("l'ordre des idees, les accords et la ponctuation", [
      "uniquement la couleur du stylo",
      "le nombre exact de lignes",
      "la taille du cahier",
    ]),
    expected: ["l'ordre des idees, les accords et la ponctuation"],
    comparator: "mcq_exact",
    explanation: exp(
      "Relire sert a rendre l'ecrit plus clair et plus correct.",
      "On verifie les idees, les phrases et l'orthographe.",
      "La revision aide le lecteur a comprendre."
    ),
  };
}

function oralQuestion(): Generated {
  return {
    text: "Pendant un debat en classe, quelle attitude est attendue ?",
    format: "qcm",
    choices: makeChoices("ecouter les autres et justifier son avis", [
      "couper la parole pour parler plus fort",
      "changer de sujet sans prevenir",
      "repeter exactement la meme phrase",
    ]),
    expected: ["ecouter les autres et justifier son avis"],
    comparator: "mcq_exact",
    explanation: exp(
      "Participer a un echange suppose d'ecouter et de repondre clairement.",
      "Un avis est plus solide quand il est justifie.",
      "On respecte la parole d'autrui."
    ),
  };
}

function vocabulaireQuestion(): Generated {
  const item = pick([
    {
      question: "Quel mot appartient a la meme famille que terre ?",
      correct: "terrien",
      wrongs: ["terreur", "tasse", "tour"],
    },
    {
      question: "Dans la phrase 'La piece est sombre', quel synonyme peut remplacer sombre ?",
      correct: "obscure",
      wrongs: ["bruyante", "rapide", "ancienne"],
    },
    {
      question: "Dans 'Il a une operation a faire' et 'une operation mathematique', que remarque-t-on ?",
      correct: "operation a plusieurs sens",
      wrongs: ["operation est toujours un verbe", "operation n'a aucun sens", "operation est un determinant"],
    },
  ]);

  return {
    text: item.question,
    format: "qcm",
    choices: makeChoices(item.correct, item.wrongs),
    expected: [item.correct],
    comparator: "mcq_exact",
    explanation: exp(
      "On observe le sens du mot et ses liens avec d'autres mots.",
      `Ici, la reponse correcte est : ${item.correct}.`,
      "Le vocabulaire s'appuie sur le contexte et les familles de mots."
    ),
  };
}

function grammaireQuestion(): Generated {
  const item = pick([
    {
      question: "Dans 'Les grands arbres bougent doucement', quel est le sujet ?",
      correct: "Les grands arbres",
      wrongs: ["bougent", "doucement", "grands"],
    },
    {
      question: "Quel groupe nominal est correctement accorde ?",
      correct: "les fleurs rouges",
      wrongs: ["les fleur rouge", "la fleurs rouges", "un fleurs rouge"],
    },
    {
      question: "Quelle phrase accorde correctement le verbe avec le sujet ?",
      correct: "Les enfants jouent dans la cour.",
      wrongs: ["Les enfants joue dans la cour.", "Les enfant jouent dans la cour.", "Les enfants joues dans la cour."],
    },
  ]);

  return {
    text: item.question,
    format: "qcm",
    choices: makeChoices(item.correct, item.wrongs),
    expected: [item.correct],
    comparator: "mcq_exact",
    explanation: exp(
      "On repere les groupes de la phrase et les accords.",
      `La forme correcte est : ${item.correct}.`,
      "La grammaire aide a ecrire des phrases correctes."
    ),
  };
}

function conjugaisonQuestion(): Generated {
  const item = pick([
    {
      question: "Conjugue le verbe chanter au present avec nous.",
      correct: "chantons",
      wrongs: ["chantent", "chantez", "chantais"],
    },
    {
      question: "Conjugue le verbe finir a l'imparfait avec je.",
      correct: "finissais",
      wrongs: ["finis", "finirai", "finissant"],
    },
    {
      question: "Dans 'Demain, nous partirons', quel temps est utilise ?",
      correct: "le futur",
      wrongs: ["le present", "l'imparfait", "le passe compose"],
    },
  ]);

  return {
    text: item.question,
    format: item.correct.endsWith("s") || item.correct.endsWith("ons") ? "short" : "qcm",
    choices: item.correct.startsWith("le ") ? makeChoices(item.correct, item.wrongs) : undefined,
    expected: [item.correct],
    comparator: item.correct.startsWith("le ") ? "mcq_exact" : "exact_text",
    explanation: exp(
      "On identifie le verbe, le sujet et le temps demande.",
      `La reponse attendue est : ${item.correct}.`,
      "La terminaison depend du sujet et du temps."
    ),
  };
}

function questionForNotion(notionId: string): Generated {
  if (notionId.includes("fluence")) return lectureQuestion();
  if (notionId.includes("comprehension")) return Math.random() < 0.5 ? lectureQuestion() : documentQuestion();
  if (notionId.includes("oeuvre")) return oeuvreQuestion();
  if (notionId.includes("ecriture")) return ecritureQuestion();
  if (notionId.includes("oral")) return oralQuestion();
  if (notionId.includes("vocabulaire")) return vocabulaireQuestion();
  if (notionId.includes("conjugaison")) return conjugaisonQuestion();
  if (notionId.includes("grammaire")) return grammaireQuestion();
  return lectureQuestion();
}

function makeTemplate(
  level: Cycle3PrimaryLevel,
  micro: MicroSkillSource,
  variant: 0 | 1
): TutorBankItemV4 {
  return {
    kind: "template",
    id: `${level}_${micro.id}_fr_cycle3_tpl_${variant + 1}`,
    niveau: level,
    matiere: "francais",
    notionId: micro.notionId,
    microId: micro.id,
    difficulty: variant === 0 ? 2 : 3,
    theme: "neutral",
    hint: micro.label,
    tags: [level, micro.notionId, micro.id, "cycle3", "francais", "template"],
    generate: () => questionForNotion(micro.notionId),
  };
}

export function buildCycle3FrancaisBank(
  level: Cycle3PrimaryLevel,
  microSkills: readonly MicroSkillSource[]
): TutorBankItemV4[] {
  return microSkills.flatMap((micro) => [
    makeTemplate(level, micro, 0),
    makeTemplate(level, micro, 1),
    {
      ...makeTemplate(level, micro, 1),
      id: `${level}_${micro.id}_fr_cycle3_tpl_3_defi`,
      difficulty: 4,
      tags: [level, micro.notionId, micro.id, "cycle3", "francais", "template", "defi"],
    },
  ]);
}
