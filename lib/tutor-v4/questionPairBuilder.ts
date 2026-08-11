// app/tutor-v4/questionpairbuilder
import { randomUUID } from "crypto";
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

/**
 * Les propositions d'un QCM, sans doublon. On compare les chaînes rognées :
 * deux lignes qui ne diffèrent que par une espace sont la même pour l'élève.
 */
function uniques(choices: string[]): string[] {
  const vus = new Set<string>();
  return choices.filter((c) => {
    const k = c.trim();
    if (vus.has(k)) return false;
    vus.add(k);
    return true;
  });
}

/**
 * Mélange les choix QCM de façon déterministe (seed basé sur l'id de la question)
 * afin que la bonne réponse ne soit jamais systématiquement en première position.
 *
 * FILET, PAS CORRECTIF (02/08/2026) : on retire au passage les propositions en
 * double. Un gabarit dont le piège coïncide avec la bonne réponse pour certains
 * tirages — les coordonnées inversées quand x = y, $a^{m+n}$ quand m = n = 2 —
 * affichait deux lignes identiques, toutes les deux justes. Trois propositions
 * distinctes valent mieux que quatre dont deux se répètent, mais ça reste un
 * pis-aller : le vrai correctif est dans la banque, et
 * `scripts/verifier-doublons-choix.ts` dit lesquelles restent à écrire.
 */
function shuffleChoices(choices: string[], id: string): string[] {
  // Seed numérique simple depuis les charCodes de l'id
  let seed = 0;
  for (let i = 0; i < id.length; i++) seed = (seed * 31 + id.charCodeAt(i)) >>> 0;

  const arr = uniques(choices);
  for (let i = arr.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    // ⚠️ 11/08/2026 — c'était `seed % (i + 1)`, et le mélange était FAUX sur
    // les QCM à quatre lignes : la bonne réponse tombait en 1ʳᵉ ligne 33,3 %
    // du temps et en 2ᵉ 16,7 %, au lieu de 25 % partout. Mesuré sur 200 000
    // tirages, à trois lignes comme à deux le biais n'apparaissait pas — d'où
    // son invisibilité.
    // La cause : le dernier tour fait `% 2`, c'est-à-dire le BIT DE POIDS
    // FAIBLE d'un générateur congruentiel de modulo 2³². Ce bit-là alterne, il
    // n'est pas aléatoire. On lit donc les bits de POIDS FORT, qui le sont.
    // Un enfant qui cliquait toujours la première ligne avait 33 % de réussite
    // au lieu de 25.
    const j = Math.floor((seed / 0x100000000) * (i + 1));
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
      // ⚠️ 11/08/2026 — le mélange était amorcé par `item.id`, CONSTANT pour un
      // item figé : la permutation était donc la même pour tous les élèves, à
      // tous les tirages, pour toujours. Mesuré sur les 686 items fixes du
      // français : 0 changeaient de place, et la bonne réponse tombait en
      // PREMIÈRE ligne dans 33,5 % des cas. Un enfant qui refait le même item
      // retient la position, pas la réponse.
      // Les gabarits, eux, allaient bien : leur `generatedId` contient déjà
      // l'horloge et un aléa. On leur emprunte leur amorce.
      // ⚠️ Ne change RIEN à la correction : `ChoiceDiagnostic.choice` est le
      // TEXTE du distracteur et `mcq_exact` compare du texte — jamais un rang.
      choices: item.choices
        ? shuffleChoices(
            item.choices as string[],
            `${item.id}__${Date.now()}_${Math.floor(Math.random() * 10000)}`,
          )
        : undefined,
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
