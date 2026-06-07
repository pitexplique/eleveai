import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Algebra vocabulary B1 ─────────────────────────────────────────────────────
const WORDS = [
  { slug: "equation",    en: "equation",    fr: "équation",    audio: "/audio/english-maths/algebra/b1/equation.mp3"    },
  { slug: "variable",    en: "variable",    fr: "variable",    audio: "/audio/english-maths/algebra/b1/variable.mp3"    },
  { slug: "coefficient", en: "coefficient", fr: "coefficient", audio: "/audio/english-maths/algebra/b1/coefficient.mp3" },
  { slug: "expression",  en: "expression",  fr: "expression",  audio: "/audio/english-maths/algebra/b1/expression.mp3"  },
  { slug: "inequality",  en: "inequality",  fr: "inégalité",   audio: "/audio/english-maths/algebra/b1/inequality.mp3"  },
  { slug: "solution",    en: "solution",    fr: "solution",    audio: "/audio/english-maths/algebra/b1/solution.mp3"    },
  { slug: "formula",     en: "formula",     fr: "formule",     audio: "/audio/english-maths/algebra/b1/formula.mp3"     },
  { slug: "function",    en: "function",    fr: "fonction",    audio: "/audio/english-maths/algebra/b1/function.mp3"    },
] as const;

function distractorsFr(exclude: string, seed: number): string[] {
  const pool = WORDS.filter((w) => w.fr !== exclude).map((w) => w.fr);
  const start = seed % pool.length;
  return [...pool.slice(start), ...pool.slice(0, start)].slice(0, 3);
}
function distractorsEn(exclude: string, seed: number): string[] {
  const pool = WORDS.filter((w) => w.en !== exclude).map((w) => w.en);
  const start = seed % pool.length;
  return [...pool.slice(start), ...pool.slice(0, start)].slice(0, 3);
}

export const algebraB1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b1_algebra_en_to_fr_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_algebra",
    microId: "en_b1_algebra_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's an algebra term used in equations and expressions.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["algebra", "b1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_algebra_fr_to_en_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_algebra",
    microId: "en_b1_algebra_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 3)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about algebra and equations.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["algebra", "b1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_algebra_listen_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_algebra",
    microId: "en_b1_algebra_listen",
    difficulty: 3 as const,
    text: `Listen and identify the algebra term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 5)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["algebra", "b1", "listen"],
  },
]);
