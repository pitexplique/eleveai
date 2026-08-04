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

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(methode: string, calcul: string, conclusion: string) {
  return `Methode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function rangeForLevel(level: Cycle2Level) {
  if (level === "cp") return { small: 20, medium: 80, large: 100 };
  if (level === "ce1") return { small: 50, medium: 300, large: 1000 };
  return { small: 100, medium: 900, large: 10000 };
}

function formatNumber(n: number) {
  return n.toLocaleString("fr-FR");
}

function numberQuestion(level: Cycle2Level, variant: number): Generated {
  const range = rangeForLevel(level);

  if (variant === 0) {
    const a = randomInt(1, range.medium);
    const b = a + randomInt(1, Math.max(5, Math.floor(range.medium / 8)));
    const correct = a < b ? "<" : ">";

    return {
      text: `Complete : ${formatNumber(a)} ... ${formatNumber(b)}`,
      format: "qcm",
      choices: ["<", ">", "="],
      expected: [correct],
      comparator: "mcq_exact",
      explanation: exp(
        "Pour comparer deux nombres, on regarde lequel represente la plus grande quantite.",
        `${formatNumber(a)} est plus petit que ${formatNumber(b)}.`,
        `On ecrit ${formatNumber(a)} ${correct} ${formatNumber(b)}.`
      ),
    };
  }

  const dizaines = level === "cp" ? randomInt(2, 9) : randomInt(12, 98);
  const unites = randomInt(1, 9);
  const n = dizaines * 10 + unites;
  const correct = `${formatNumber(dizaines * 10)} + ${unites}`;

  return {
    text: `Quelle est la bonne decomposition de ${formatNumber(n)} ?`,
    format: "qcm",
    choices: makeChoices(correct, [
      `${formatNumber(dizaines)} + ${unites}`,
      `${formatNumber(dizaines * 10)} + ${unites * 10}`,
      `${formatNumber((dizaines + unites) * 10)}`,
    ]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "On separe les dizaines et les unites.",
      `${formatNumber(n)} = ${formatNumber(dizaines * 10)} + ${unites}.`,
      `La bonne decomposition est ${correct}.`
    ),
  };
}

function suiteQuestion(level: Cycle2Level, variant: number): Generated {
  const step = randomChoice(level === "cp" ? [1, 2, 5, 10] : [2, 5, 10, 20, 100]);
  const start = randomInt(1, level === "ce2" ? 500 : level === "ce1" ? 120 : 40);
  const values = [start, start + step, start + 2 * step];
  const next = start + 3 * step;

  if (variant === 0) {
    return {
      text: `Continue la suite : ${values.map(formatNumber).join(" ; ")} ; ...`,
      format: "short",
      expected: [String(next), formatNumber(next)],
      comparator: "number_equal",
      explanation: exp(
        "On cherche de combien la suite avance a chaque etape.",
        `Ici, on ajoute ${step} a chaque fois.`,
        `Le nombre suivant est ${formatNumber(next)}.`
      ),
    };
  }

  return {
    text: `Quel est le pas de la suite : ${values
      .concat(next)
      .map(formatNumber)
      .join(" ; ")} ?`,
    format: "qcm",
    choices: makeChoices(String(step), [String(step + 1), String(step * 2), String(Math.max(1, step - 1))]),
    expected: [String(step)],
    comparator: "mcq_exact",
    explanation: exp(
      "Le pas est ce qu'on ajoute entre deux nombres consecutifs.",
      `${formatNumber(start + step)} - ${formatNumber(start)} = ${step}.`,
      `Le pas de la suite est ${step}.`
    ),
  };
}

function addSubQuestion(level: Cycle2Level, variant: number): Generated {
  const max = level === "cp" ? 30 : level === "ce1" ? 200 : 900;
  const a = randomInt(8, max);
  const b = randomInt(2, Math.min(a - 1, level === "cp" ? 15 : 80));

  if (variant === 0) {
    const result = a + b;
    return {
      text: `Calcule : ${formatNumber(a)} + ${formatNumber(b)}`,
      format: "short",
      expected: [String(result), formatNumber(result)],
      comparator: "number_equal",
      explanation: exp(
        "Pour additionner, on rassemble deux quantites.",
        `${formatNumber(a)} + ${formatNumber(b)} = ${formatNumber(result)}.`,
        `La reponse est ${formatNumber(result)}.`
      ),
    };
  }

  const result = a - b;
  return {
    text: `Calcule : ${formatNumber(a)} - ${formatNumber(b)}`,
    format: "short",
    expected: [String(result), formatNumber(result)],
    comparator: "number_equal",
    explanation: exp(
      "Pour soustraire, on retire une quantite.",
      `${formatNumber(a)} - ${formatNumber(b)} = ${formatNumber(result)}.`,
      `La reponse est ${formatNumber(result)}.`
    ),
  };
}

function multiplicationQuestion(level: Cycle2Level, variant: number): Generated {
  const table = randomChoice(level === "ce1" ? [2, 5, 10] : [2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const factor = randomInt(2, level === "ce1" ? 8 : 10);
  const result = table * factor;

  if (variant === 0) {
    return {
      text: `Calcule : ${table} x ${factor}`,
      format: "short",
      expected: [String(result)],
      comparator: "number_equal",
      explanation: exp(
        "Une multiplication represente des groupes egaux.",
        `${table} x ${factor} = ${result}.`,
        `La reponse est ${result}.`
      ),
    };
  }

  return {
    text: `Quel calcul correspond a ${factor} groupes de ${table} objets ?`,
    format: "qcm",
    choices: makeChoices(`${factor} x ${table}`, [`${factor} + ${table}`, `${factor} - ${table}`, `${table} - ${factor}`]),
    expected: [`${factor} x ${table}`],
    comparator: "mcq_exact",
    explanation: exp(
      "Des groupes egaux se representent par une multiplication.",
      `${factor} groupes de ${table}, c'est ${factor} x ${table}.`,
      `Le bon calcul est ${factor} x ${table}.`
    ),
  };
}

function divisionQuestion(_level: Cycle2Level, variant: number): Generated {
  const divisor = randomChoice([2, 3, 4, 5, 6, 8, 10]);
  const quotient = randomInt(2, 9);
  const total = divisor * quotient;

  if (variant === 0) {
    return {
      text: `On partage ${total} jetons en ${divisor} groupes egaux. Combien y a-t-il de jetons dans chaque groupe ?`,
      format: "short",
      expected: [String(quotient)],
      comparator: "number_equal",
      explanation: exp(
        "Partager en groupes egaux revient a diviser.",
        `${total} divise par ${divisor} = ${quotient}.`,
        `Il y a ${quotient} jetons dans chaque groupe.`
      ),
    };
  }

  return {
    text: `${total} est-il partageable en groupes de ${divisor} sans reste ?`,
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    explanation: exp(
      "On verifie si le total est dans la table du diviseur.",
      `${divisor} x ${quotient} = ${total}.`,
      "Oui, le partage est exact."
    ),
  };
}

function mentalQuestion(level: Cycle2Level, variant: number): Generated {
  if (variant === 0) {
    const target = level === "cp" ? 10 : level === "ce1" ? 100 : 1000;
    const n = randomChoice(
      level === "cp" ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : level === "ce1" ? [20, 25, 40, 60, 75, 80] : [100, 250, 400, 600, 750, 900]
    );
    const result = target - n;

    return {
      text: `Quel nombre faut-il ajouter a ${formatNumber(n)} pour obtenir ${formatNumber(target)} ?`,
      format: "short",
      expected: [String(result), formatNumber(result)],
      comparator: "number_equal",
      explanation: exp(
        "On cherche un complement.",
        `${formatNumber(target)} - ${formatNumber(n)} = ${formatNumber(result)}.`,
        `Il faut ajouter ${formatNumber(result)}.`
      ),
    };
  }

  const n = randomInt(2, level === "cp" ? 10 : 50);
  const result = n * 2;
  return {
    text: `Quel est le double de ${n} ?`,
    format: "short",
    expected: [String(result)],
    comparator: "number_equal",
    explanation: exp(
      "Le double d'un nombre, c'est ce nombre ajoute a lui-meme.",
      `${n} + ${n} = ${result}.`,
      `Le double de ${n} est ${result}.`
    ),
  };
}

function fractionQuestion(_level: Cycle2Level, variant: number): Generated {
  if (variant === 0) {
    return {
      text: "On partage une tarte en 4 parts egales. Une part correspond a quelle fraction ?",
      format: "qcm",
      choices: ["1/4", "1/2", "4/1", "3/4"],
      expected: ["1/4"],
      comparator: "mcq_exact",
      explanation: exp(
        "Le denominateur indique en combien de parts egales l'unite est partagee.",
        "Une part sur 4 s'ecrit 1/4.",
        "La fraction est 1/4."
      ),
    };
  }

  return {
    text: "Quelle fraction represente la moitie d'une unite ?",
    format: "qcm",
    choices: ["1/2", "1/3", "1/4", "2/1"],
    expected: ["1/2"],
    comparator: "mcq_exact",
    explanation: exp(
      "La moitie correspond a un partage en deux parts egales.",
      "Une part sur 2 s'ecrit 1/2.",
      "La bonne reponse est 1/2."
    ),
  };
}

function problemQuestion(level: Cycle2Level, variant: number): Generated {
  const a = randomInt(8, level === "cp" ? 30 : 90);
  const b = randomInt(2, level === "cp" ? 10 : 30);

  if (variant === 0) {
    const result = a + b;
    return {
      text: `Mila a ${a} images. Elle en gagne ${b}. Combien d'images a-t-elle maintenant ?`,
      format: "short",
      expected: [String(result)],
      comparator: "number_equal",
      explanation: exp(
        "Elle gagne des images, donc on additionne.",
        `${a} + ${b} = ${result}.`,
        `Mila a ${result} images.`
      ),
    };
  }

  const result = a - b;
  return {
    text: `Noa a ${a} billes. Il en donne ${b}. Combien lui reste-t-il de billes ?`,
    format: "short",
    expected: [String(result)],
    comparator: "number_equal",
    explanation: exp(
      "Il donne des billes, donc on soustrait.",
      `${a} - ${b} = ${result}.`,
      `Il lui reste ${result} billes.`
    ),
  };
}

function measureQuestion(level: Cycle2Level, variant: number): Generated {
  if (variant === 0) {
    const a = randomInt(5, level === "cp" ? 30 : 120);
    const b = randomInt(2, Math.min(30, a));
    const result = a + b;
    return {
      text: `Un ruban mesure ${a} cm. On ajoute ${b} cm. Quelle est sa nouvelle longueur ?`,
      format: "short",
      expected: [String(result)],
      comparator: "number_equal",
      explanation: exp(
        "Quand on ajoute une longueur, on fait une addition.",
        `${a} cm + ${b} cm = ${result} cm.`,
        `La nouvelle longueur est ${result} cm.`
      ),
    };
  }

  return {
    text: "Quelle unite convient le mieux pour mesurer la longueur d'un crayon ?",
    format: "qcm",
    choices: ["centimetre", "kilometre", "litre", "kilogramme"],
    expected: ["centimetre"],
    comparator: "mcq_exact",
    explanation: exp(
      "On choisit une unite adaptee a l'objet mesure.",
      "Un crayon est un petit objet : le centimetre convient.",
      "La bonne unite est le centimetre."
    ),
  };
}

function geometryQuestion(_level: Cycle2Level, variant: number): Generated {
  if (variant === 0) {
    return {
      text: "Combien de cotes a un triangle ?",
      format: "short",
      expected: ["3"],
      comparator: "number_equal",
      explanation: exp(
        "Un triangle est une figure plane fermee.",
        "Il possede 3 cotes.",
        "Un triangle a 3 cotes."
      ),
    };
  }

  return {
    text: "Quelle figure a 4 cotes egaux ?",
    format: "qcm",
    choices: ["carre", "triangle", "cercle", "cube"],
    expected: ["carre"],
    comparator: "mcq_exact",
    explanation: exp(
      "On reconnait une figure grace a ses proprietes.",
      "Un carre a 4 cotes egaux.",
      "La bonne reponse est carre."
    ),
  };
}

function dataQuestion(_level: Cycle2Level, variant: number): Generated {
  if (variant === 0) {
    return {
      text: "Dans un tableau, la ligne 'pommes' indique 12. Combien y a-t-il de pommes ?",
      format: "short",
      expected: ["12"],
      comparator: "number_equal",
      explanation: exp(
        "On lit l'information dans la ligne demandee.",
        "La ligne pommes indique 12.",
        "Il y a 12 pommes."
      ),
    };
  }

  return {
    text: "Quel outil est pratique pour organiser des nombres par categories ?",
    format: "qcm",
    choices: ["un tableau", "une gomme", "une horloge", "un compas"],
    expected: ["un tableau"],
    comparator: "mcq_exact",
    explanation: exp(
      "Un tableau sert a ranger des donnees.",
      "Il permet de lire les informations par lignes ou colonnes.",
      "La bonne reponse est un tableau."
    ),
  };
}

function algorithmQuestion(_level: Cycle2Level, variant: number): Generated {
  if (variant === 0) {
    return {
      text: "Un robot avance de 2 cases puis encore de 3 cases. De combien de cases a-t-il avance ?",
      format: "short",
      expected: ["5"],
      comparator: "number_equal",
      explanation: exp(
        "On suit les instructions dans l'ordre.",
        "2 cases + 3 cases = 5 cases.",
        "Le robot a avance de 5 cases."
      ),
    };
  }

  return {
    text: "Quelle instruction signifie tourner vers la droite ?",
    format: "qcm",
    choices: ["tourne a droite", "avance de 2", "recule", "efface"],
    expected: ["tourne a droite"],
    comparator: "mcq_exact",
    explanation: exp(
      "Une instruction indique une action precise.",
      "'Tourne a droite' indique un changement de direction.",
      "La bonne instruction est 'tourne a droite'."
    ),
  };
}

function questionForNotion(
  level: Cycle2Level,
  notionId: string,
  variant: number
): Generated {
  if (notionId.includes("suite")) return suiteQuestion(level, variant);
  if (notionId.includes("addition") || notionId.includes("soustraction")) return addSubQuestion(level, variant);
  if (notionId.includes("multiplication")) return multiplicationQuestion(level, variant);
  if (notionId.includes("division")) return divisionQuestion(level, variant);
  if (notionId.includes("calcul")) return mentalQuestion(level, variant);
  if (notionId.includes("fraction")) return fractionQuestion(level, variant);
  if (notionId.includes("probleme")) return problemQuestion(level, variant);
  if (
    notionId.includes("longueur") ||
    notionId.includes("masse") ||
    notionId.includes("contenance") ||
    notionId.includes("duree") ||
    notionId.includes("monnaie") ||
    notionId.includes("perimetre")
  ) {
    return measureQuestion(level, variant);
  }
  if (
    notionId.includes("reperage") ||
    notionId.includes("figure") ||
    notionId.includes("solide") ||
    notionId.includes("symetrie") ||
    notionId.includes("droite")
  ) {
    return geometryQuestion(level, variant);
  }
  if (notionId.includes("donnees")) return dataQuestion(level, variant);
  if (notionId.includes("algorithmique")) return algorithmQuestion(level, variant);

  return numberQuestion(level, variant);
}

function makeTemplate(
  level: Cycle2Level,
  micro: MicroSkillSource,
  variant: 0 | 1
): TutorBankItemV4 {
  return {
    kind: "template",
    id: `${level}_${micro.id}_tpl_${variant + 1}`,
    niveau: level,
    matiere: "maths",
    notionId: micro.notionId,
    microId: micro.id,
    difficulty: variant === 0 ? 1 : 2,
    theme: "neutral",
    hint: micro.label,
    tags: [level, micro.notionId, micro.id, "cycle2", "template"],
    generate: () => questionForNotion(level, micro.notionId, variant),
  };
}

export function buildCycle2QuestionBank(
  level: Cycle2Level,
  microSkills: readonly MicroSkillSource[]
): TutorBankItemV4[] {
  return microSkills.flatMap((micro) => [
    makeTemplate(level, micro, 0),
    makeTemplate(level, micro, 1),
    {
      ...makeTemplate(level, micro, 1),
      id: `${level}_${micro.id}_tpl_3_defi`,
      difficulty: 3,
      tags: [level, micro.notionId, micro.id, "cycle2", "template", "defi"],
    },
  ]);
}
