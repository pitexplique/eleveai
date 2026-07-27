// app/tutor-v4/questionpairbuilder
import { randomUUID } from "crypto";
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

/**
 * Mélange les choix QCM de façon déterministe (seed basé sur l'id de la question)
 * afin que la bonne réponse ne soit jamais systématiquement en première position.
 */
function shuffleChoices(choices: string[], id: string): string[] {
  // Seed numérique simple depuis les charCodes de l'id
  let seed = 0;
  for (let i = 0; i < id.length; i++) seed = (seed * 31 + id.charCodeAt(i)) >>> 0;

  const arr = [...choices];
  for (let i = arr.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
import type {
  CanvasFigure,
  ChoiceDiagnostic,
  ComparatorName,
  DifficultyLevel,
  QuestionFormat,
  QuestionTheme,
  StarLevel,
  TutorQuestionOption,
  TutorQuestionPair,
} from "@/lib/tutor-v4/types";

// Empreinte de CONTENU (texte + choix triés) : sert à ne pas reservir la même
// question générée, même quand le gabarit varie à chaque tirage. On l'encode
// dans l'id généré (`__fp<hash>__`) pour qu'elle voyage dans recentQuestionIds
// sans toucher au moteur ni au type de session.
function hashString(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h.toString(36);
}
function contentFingerprint(text: string, choices?: string[]): string {
  const c = choices ? [...choices].sort().join("~") : "";
  return hashString(`${text}||${c}`);
}
const FP_MARKER = /__fp([0-9a-z]+)__/;
function extractFingerprint(id: string): string | null {
  const m = id.match(FP_MARKER);
  return m ? m[1] : null;
}

function materializeBankItem(
  item: TutorBankItemV4,
  avoidFingerprints?: Set<string>
): {
  id: string;
  notionId: string;
  microId: string;
  text: string;
  format: QuestionFormat;
  choices?: string[];
  expected: string[];
  comparator: ComparatorName;
  hint?: string;
  explanation?: string;
  canvas?: CanvasFigure;
  audioSrc?: string;
  choiceDiagnostics?: ChoiceDiagnostic[];
  difficulty: number;
} {
  if (item.kind === "fixed") {
    return {
      id: item.id,
      notionId: item.notionId,
      microId: item.microId,
      text: item.text,
      format: item.format,
      choices: item.choices ? shuffleChoices(item.choices as string[], item.id) : undefined,
      expected: item.expected,
      comparator: item.comparator,
      hint: item.hint,
      explanation: item.explanation,
      canvas: item.canvas,
      audioSrc: item.audioSrc,
      choiceDiagnostics: item.choiceDiagnostics,
      difficulty: item.difficulty,
    };
  }

  // Anti-répétition de CONTENU : on retire jusqu'à 10 tirages pour éviter de
  // reservir une question vue récemment (les gabarits n'ont pas de mémoire du
  // contenu qu'ils génèrent). Petit pool → on garde le dernier tirage.
  let generated = item.generate();
  let fp = contentFingerprint(generated.text, generated.choices);
  if (avoidFingerprints && avoidFingerprints.size > 0) {
    for (let k = 0; k < 10 && avoidFingerprints.has(fp); k++) {
      generated = item.generate();
      fp = contentFingerprint(generated.text, generated.choices);
    }
  }
  const generatedId = `${item.id}__fp${fp}__${Date.now()}_${Math.floor(Math.random() * 10000)}`;

  return {
    id: generatedId,
    notionId: item.notionId,
    microId: item.microId,
    text: generated.text,
    format: generated.format ?? "short",
    choices: generated.choices ? shuffleChoices(generated.choices, generatedId) : undefined,
    expected: generated.expected,
    comparator: generated.comparator,
    hint: item.hint,
    explanation: generated.explanation,
    canvas: generated.canvas,
    choiceDiagnostics: generated.choiceDiagnostics,
    difficulty: item.difficulty,
  };
}

function normalizeDifficulty(difficulty: number): DifficultyLevel {
  if (difficulty <= 1) return 1;
  if (difficulty === 2) return 2;
  if (difficulty === 3) return 3;
  if (difficulty === 4) return 4;
  return 5;
}

function difficultyToStar(difficulty: number): StarLevel {
  return normalizeDifficulty(difficulty);
}

function inferTheme(text: string): QuestionTheme {
  const t = text.toLowerCase();

  if (
    t.includes("réunion") ||
    t.includes("saint-pierre") ||
    t.includes("saint-paul") ||
    t.includes("samoussa") ||
    t.includes("bouchon") ||
    t.includes("mangue")
  ) {
    return "reunion";
  }

  if (
    t.includes("sport") ||
    t.includes("foot") ||
    t.includes("tournoi") ||
    t.includes("maillot") ||
    t.includes("gourde")
  ) {
    return "sport";
  }

  if (
    t.includes("cuisine") ||
    t.includes("recette") ||
    t.includes("yaourt") ||
    t.includes("œuf") ||
    t.includes("oeuf")
  ) {
    return "cuisine";
  }

  if (
    t.includes("jeu vidéo") ||
    t.includes("jeux vidéo") ||
    t.includes("potion") ||
    t.includes("pièce") ||
    t.includes("pièces")
  ) {
    return "jeux_video";
  }

  return "neutral";
}

function inferFamilyId(item: TutorBankItemV4): string {
  if (item.id.includes("qcm")) return `${item.microId}_qcm`;
  if (item.id.includes("tpl")) return `${item.microId}_template`;
  if (item.id.includes("canvas")) return `${item.microId}_canvas`;
  return `${item.microId}_fixed`;
}

function toTutorQuestionOption(
  item: TutorBankItemV4,
  avoidFingerprints?: Set<string>
): TutorQuestionOption {
  const q = materializeBankItem(item, avoidFingerprints);
  const difficulty = normalizeDifficulty(q.difficulty);
  const starLevel = difficultyToStar(q.difficulty);

  return {
    id: q.id,
    notionId: q.notionId,
    microId: q.microId,
    text: q.text,
    format: q.format,
    choices: q.choices,
    expected: q.expected,
    comparator: q.comparator,
    hint: q.hint,
    explanation: q.explanation,
    canvas: q.canvas,
    audioSrc: q.audioSrc,
    choiceDiagnostics: q.choiceDiagnostics,
    meta: {
      familyId: inferFamilyId(item),
      theme: inferTheme(q.text),
      supportLevel: q.hint ? "medium" : "low",
      readingLoad:
        q.text.length < 60 ? "short" : q.text.length < 120 ? "medium" : "long",
      challengeType: q.format === "qcm" ? "guided" : "direct",
      difficulty,
      starLevel,
    },
  };
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function isGoodContrast(a: TutorQuestionOption, b: TutorQuestionOption): boolean {
  if (a.id === b.id) return false;

  return (
    a.meta.theme !== b.meta.theme ||
    a.meta.familyId !== b.meta.familyId ||
    a.format !== b.format ||
    a.meta.difficulty !== b.meta.difficulty
  );
}

export function buildQuestionPair(args: {
  bank: TutorBankItemV4[];
  notionId: string;
  microId: string;
  recommendedStar: StarLevel;
  recentQuestionIds?: string[];
  preferExactStar?: boolean;
}): TutorQuestionPair {
  const { bank, notionId, microId, recommendedStar, recentQuestionIds = [], preferExactStar = false } =
    args;

  const allForMicro = bank.filter(
    (item) => item.notionId === notionId && item.microId === microId
  );

  // Les questions générées (kind "template") sont matérialisées avec un id
  // suffixé (`${item.id}_${Date.now()}_${aléa}`) : recentQuestionIds contient
  // ces ids générés, jamais l'id du gabarit nu. On compare donc aussi par
  // préfixe, sinon le filtre anti-répétition est inopérant (retour élève du
  // 11/06/2026 : « ça me repose la même question en boucle »).
  const lastSeenIndex = (item: TutorBankItemV4) => {
    for (let i = recentQuestionIds.length - 1; i >= 0; i--) {
      const recentId = recentQuestionIds[i];
      if (recentId === item.id || recentId.startsWith(`${item.id}_`)) return i;
    }
    return -1;
  };

  const filtered = allForMicro.filter((item) => lastSeenIndex(item) === -1);

  // Banque trop petite pour éviter toutes les questions récentes : on reprend
  // alors les moins récemment posées, en écartant si possible les plus
  // récentes.
  let usable: typeof allForMicro;
  if (filtered.length >= 2) {
    usable = filtered;
  } else {
    const byRecency = [...allForMicro].sort(
      (x, y) => lastSeenIndex(x) - lastSeenIndex(y)
    );
    usable = byRecency.slice(0, Math.max(2, byRecency.length - 2));
  }

  if (usable.length < 2) {
    throw new Error(
      `Pas assez de questions disponibles pour ${notionId}/${microId} en V4.`
    );
  }

  const nearLevel = usable.filter((item) => {
    const star = difficultyToStar(item.difficulty);
    return Math.abs(star - recommendedStar) <= 1;
  });

  const exactLevel = usable.filter((item) => {
    const star = difficultyToStar(item.difficulty);
    return star === recommendedStar;
  });

  const source =
    preferExactStar && exactLevel.length >= 2
      ? exactLevel
      : nearLevel.length >= 2
      ? nearLevel
      : usable;

  // Empreintes de contenu récemment servies (extraites des ids récents) : on
  // évite de reposer la même question, et que les deux options d'une paire
  // soient identiques.
  const avoidFingerprints = new Set<string>();
  for (const id of recentQuestionIds) {
    const fp = extractFingerprint(id);
    if (fp) avoidFingerprints.add(fp);
  }

  const firstItem = pickRandom(source);
  const optionA = toTutorQuestionOption(firstItem, avoidFingerprints);

  const remaining = source.filter((item) => item.id !== firstItem.id);

  if (remaining.length === 0) {
    throw new Error(
      `Impossible de construire une paire contrastée pour ${notionId}/${microId}.`
    );
  }

  // Option B : on évite aussi le contenu exact de l'option A.
  const avoidForB = new Set(avoidFingerprints);
  avoidForB.add(contentFingerprint(optionA.text, optionA.choices));

  const contrasted = remaining
    .map((item) => toTutorQuestionOption(item, avoidForB))
    .filter((candidate) => isGoodContrast(optionA, candidate));

  const optionB =
    contrasted.length > 0
      ? pickRandom(contrasted)
      : toTutorQuestionOption(pickRandom(remaining), avoidForB);

  const recommendedDifficulty: DifficultyLevel = recommendedStar;

  return {
    pairId: randomUUID(),
    notionId,
    microId,
    recommendedDifficulty,
    recommendedStar,
    optionA,
    optionB,
  };
}
