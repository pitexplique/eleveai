import { randomUUID } from "crypto";
import { evaluateAnswer } from "@/lib/tutor/evaluator";
import { appendAudit, guardFeedback } from "@/lib/tutor/governance";
import { loadKnowledge } from "@/lib/tutor/loadKnowledge";
import { initMastery, updateMastery } from "@/lib/tutor/mastery";
import { createSession, getSession, saveSession } from "@/lib/tutor/sessionStore";
import type {
  GraphEdge,
  KnowledgeGraph,
  KnowledgePack,
  Notion,
  StudentStyle,
  TutorMode,
  TutorQuestion,
  TutorSession,
} from "@/lib/tutor/types";

type QuestionVariant = {
  text: string;
  format: "short" | "qcm";
  choices?: string[];
  expected: string[];
  hint?: string;
};

function findNotion(pack: KnowledgePack, notionId: string) {
  return pack.notions.find((n) => n.id === notionId) ?? pack.notions[0];
}

function getStrongPrereq(graph: KnowledgeGraph, notionId: string): string | null {
  const strong = graph.edges.find((e) => e.to === notionId && e.strength === "strong");
  if (strong) return strong.from;

  const fallback = graph.edges.find((e) => e.to === notionId);
  return fallback?.from ?? null;
}

function getQuestionVariants(notion: Notion, difficulty: number, style: StudentStyle, mode: TutorMode): QuestionVariant[] {
  const isQcm = style === "dys";

  if (notion.id === "fractions") {
    if (difficulty <= 2) {
      return [
        {
          text: "Quelle fraction représente 1 part sur 4 parts égales ?",
          format: isQcm ? "qcm" : "short",
          choices: isQcm ? ["1/2", "1/4", "4/1"] : undefined,
          expected: ["1/4", "1 / 4"],
          hint: "Le numérateur compte les parts prises."
        },
        {
          text: "Un gâteau est partagé en 4 parts égales. Tu prends 1 part. Quelle fraction as-tu ?",
          format: isQcm ? "qcm" : "short",
          choices: isQcm ? ["1/3", "1/4", "2/4"] : undefined,
          expected: ["1/4", "1 / 4"],
          hint: "Une part sur quatre."
        },
        {
          text: "Quelle fraction représente la moitié ?",
          format: isQcm ? "qcm" : "short",
          choices: isQcm ? ["1/2", "1/3", "2/5"] : undefined,
          expected: ["1/2", "2/4", "0.5", "0,5"],
          hint: "La moitié = deux parts égales."
        }
      ];
    }

    return [
      {
        text: "Compare 3/5 et 4/5 : lequel est le plus grand ?",
        format: "short",
        expected: ["4/5", "4 / 5", "4/5 est plus grand", "4/5 > 3/5"],
        hint: "Même dénominateur : compare les numérateurs."
      },
      {
        text: "Écris en décimal : 7/10",
        format: "short",
        expected: ["0,7", "0.7", "0,70", "0.70"],
        hint: "7 dixièmes = 0,7."
      }
    ];
  }

  if (notion.id === "decimaux") {
    return [
      {
        text: "Quel nombre est le plus grand : 0,7 ou 0,65 ?",
        format: "short",
        expected: ["0,7", "0.7"],
        hint: "Compare d'abord les dixièmes."
      },
      {
        text: "Écris en décimal : 3/4",
        format: "short",
        expected: ["0,75", "0.75", "3/4"],
        hint: "3 quarts = 0,75."
      },
      {
        text: "Quel nombre est le plus petit : 0,4 ou 0,8 ?",
        format: isQcm ? "qcm" : "short",
        choices: isQcm ? ["0,4", "0,8", "ils sont égaux"] : undefined,
        expected: ["0,4", "0.4"],
        hint: "Regarde les dixièmes."
      }
    ];
  }

  if (notion.id === "proportionnalite") {
    return [
      {
        text: "4 cahiers coûtent 8 €. Combien coûtent 2 cahiers ?",
        format: "short",
        expected: ["4", "4 €", "4€"],
        hint: "Si on divise par 2 le nombre de cahiers, on divise aussi le prix par 2."
      },
      {
        text: "Complète : 3 bonbons → 6 €, donc 1 bonbon → ?",
        format: "short",
        expected: ["2", "2 €", "2€"],
        hint: "Cherche le prix d'un seul bonbon."
      }
    ];
  }

  if (notion.id === "perimetre") {
    return [
      {
        text: "Quel est le périmètre d’un carré de côté 5 cm ?",
        format: "short",
        expected: ["20", "20 cm", "20cm"],
        hint: "Le périmètre d’un carré = 4 × côté."
      },
      {
        text: "Un rectangle mesure 3 cm sur 7 cm. Quel est son périmètre ?",
        format: "short",
        expected: ["20", "20 cm", "20cm"],
        hint: "2 × longueur + 2 × largeur."
      }
    ];
  }

  if (notion.id === "aires") {
    return [
      {
        text: "Quelle est l’aire d’un rectangle de 4 cm sur 3 cm ?",
        format: "short",
        expected: ["12", "12 cm²", "12 cm2", "12cm²", "12cm2"],
        hint: "Aire = longueur × largeur."
      },
      {
        text: "Quelle est l’aire d’un carré de côté 5 cm ?",
        format: "short",
        expected: ["25", "25 cm²", "25 cm2", "25cm²", "25cm2"],
        hint: "Aire du carré = côté × côté."
      }
    ];
  }

  if (notion.id === "angles") {
    return [
      {
        text: "Un angle droit mesure combien de degrés ?",
        format: isQcm ? "qcm" : "short",
        choices: isQcm ? ["45", "90", "180"] : undefined,
        expected: ["90", "90°"],
        hint: "L’angle droit correspond au coin d’un carré."
      },
      {
        text: "Quel est le plus grand : 30° ou 80° ?",
        format: "short",
        expected: ["80", "80°"],
        hint: "Compare simplement les nombres."
      }
    ];
  }

  return [
    {
      text: `Question courte sur ${notion.label}.`,
      format: "short",
      expected: ["ok"],
      hint: mode === "coaching" ? "Décris une première étape de raisonnement." : undefined
    }
  ];
}

function chooseVariant(
  notion: Notion,
  difficulty: number,
  style: StudentStyle,
  mode: TutorMode,
  recentQuestionIds: string[]
): TutorQuestion {
  const variants = getQuestionVariants(notion, difficulty, style, mode);

  let selectedIndex = 0;
  for (let i = 0; i < variants.length; i++) {
    const candidateId = `${notion.id}-${difficulty}-${i}`;
    if (!recentQuestionIds.includes(candidateId)) {
      selectedIndex = i;
      break;
    }
  }

  const selected = variants[selectedIndex];
  return {
    id: `${notion.id}-${difficulty}-${selectedIndex}`,
    notionId: notion.id,
    text: selected.text,
    format: selected.format,
    choices: selected.choices,
    expected: selected.expected,
    hint: selected.hint
  };
}

export async function startTutorSession(input: {
  classe: string;
  matiere: string;
  notion: string;
  style: StudentStyle;
}) {
  const { pack, graph } = await loadKnowledge(input.classe, input.matiere);
  const notion = findNotion(pack, input.notion);
  const mastery = initMastery(pack);

  const session: TutorSession = createSession({
    id: randomUUID(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    classe: input.classe,
    matiere: input.matiere,
    style: input.style,
    mode: "evaluation",
    notionFocus: notion.id,
    difficulty: 2,
    consecutiveErrors: 0,
    consecutiveSuccess: 0,
    masteryByNotion: mastery.notion,
    masteryByBo: mastery.bo,
    knowledgePackId: pack.id,
    graphId: graph.id,
    audit: [],
    recentQuestionIds: []
  });

  const question = chooseVariant(notion, session.difficulty, session.style, session.mode, session.recentQuestionIds);
  session.lastQuestion = question;
  session.recentQuestionIds = [question.id];

  appendAudit(session, {
    at: new Date().toISOString(),
    event: "start",
    notionId: notion.id,
    mode: session.mode,
    difficulty: session.difficulty,
    reason: "session_start",
    flags: []
  });

  saveSession(session);

  return {
    sessionId: session.id,
    question,
    notionCatalog: pack.notions.map((n) => ({ id: n.id, label: n.label })),
    mastery: {
      boMastery: session.masteryByBo,
      notionMastery: session.masteryByNotion
    },
    mode: session.mode
  };
}

export async function handleTutorMessage(input: { sessionId: string; answer: string }) {
  const session = getSession(input.sessionId);
  if (!session) {
    throw new Error("Session introuvable ou expirée.");
  }

  const { pack, graph } = await loadKnowledge(session.classe, session.matiere);
  const currentNotion = findNotion(pack, session.notionFocus);

  const currentQuestion =
    session.lastQuestion ??
    chooseVariant(currentNotion, session.difficulty, session.style, session.mode, session.recentQuestionIds);

  const result = evaluateAnswer(currentQuestion, input.answer);

  if (result.ok) {
    session.consecutiveSuccess += 1;
    session.consecutiveErrors = 0;
  } else {
    session.consecutiveErrors += 1;
    session.consecutiveSuccess = 0;
  }

  let reason = "continue_same_notion";

  if (session.consecutiveErrors >= 2) {
    session.mode = "coaching";
    session.difficulty = Math.max(1, session.difficulty - 1);

    const prereq = getStrongPrereq(graph, session.notionFocus);
    if (prereq) {
      session.notionFocus = prereq;
      reason = "fallback_to_strong_prereq";
    } else {
      reason = "coaching_same_notion";
    }
  } else if (session.consecutiveSuccess >= 2) {
    if (session.mode === "coaching") {
      session.mode = "evaluation";
      reason = "return_to_evaluation";
    }
    session.difficulty = Math.min(5, session.difficulty + 1);
  }

  const notionUsedForMastery = findNotion(pack, currentQuestion.notionId);
  updateMastery(
    session.masteryByNotion,
    session.masteryByBo,
    notionUsedForMastery.id,
    notionUsedForMastery.boId,
    result.ok
  );

  const nextNotion = findNotion(pack, session.notionFocus);
  const nextQuestion = chooseVariant(
    nextNotion,
    session.difficulty,
    session.style,
    session.mode,
    session.recentQuestionIds
  );

  session.lastQuestion = nextQuestion;
  session.updatedAt = Date.now();
  session.recentQuestionIds = [...session.recentQuestionIds.slice(-4), nextQuestion.id];

  const guarded = guardFeedback(result.feedback, session.mode);
  const flags = [...(result.flags ?? []), ...guarded.flags];

  appendAudit(session, {
    at: new Date().toISOString(),
    event: "turn",
    notionId: session.notionFocus,
    mode: session.mode,
    difficulty: session.difficulty,
    reason,
    flags
  });

  saveSession(session);

  return {
    feedback: guarded.text,
    result: { ok: result.ok, flags },
    nextQuestion,
    mastery: {
      boMastery: session.masteryByBo,
      notionMastery: session.masteryByNotion
    },
    mode: session.mode
  };
}