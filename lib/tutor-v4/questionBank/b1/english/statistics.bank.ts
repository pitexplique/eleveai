import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Statistics vocabulary B1 ──────────────────────────────────────────────────
const WORDS = [
  { slug: "mean",        en: "mean",        fr: "moyenne",      audio: "/audio/english-maths/statistics/b1/mean.mp3"        },
  { slug: "median",      en: "median",      fr: "médiane",      audio: "/audio/english-maths/statistics/b1/median.mp3"      },
  { slug: "mode",        en: "mode",        fr: "mode",         audio: "/audio/english-maths/statistics/b1/mode.mp3"        },
  { slug: "range",       en: "range",       fr: "étendue",      audio: "/audio/english-maths/statistics/b1/range.mp3"       },
  { slug: "frequency",   en: "frequency",   fr: "fréquence",    audio: "/audio/english-maths/statistics/b1/frequency.mp3"   },
  { slug: "probability", en: "probability", fr: "probabilité",  audio: "/audio/english-maths/statistics/b1/probability.mp3" },
  { slug: "data",        en: "data",        fr: "données",      audio: "/audio/english-maths/statistics/b1/data.mp3"        },
  { slug: "sample",      en: "sample",      fr: "échantillon",  audio: "/audio/english-maths/statistics/b1/sample.mp3"      },
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

export const statisticsB1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b1_statistics_en_to_fr_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_statistics",
    microId: "en_b1_statistics_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a statistics term.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["statistics", "b1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_statistics_fr_to_en_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_statistics",
    microId: "en_b1_statistics_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 3)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about data and statistics.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["statistics", "b1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_statistics_listen_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_statistics",
    microId: "en_b1_statistics_listen",
    difficulty: 3 as const,
    text: `Listen and identify the statistics term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 5)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["statistics", "b1", "listen"],
  },
]);
