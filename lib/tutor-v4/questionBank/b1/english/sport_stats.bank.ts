import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Sport statistics B1 ───────────────────────────────────────────────────────
const WORDS = [
  { slug: "mean",         en: "mean",         fr: "moyenne",         audio: "/audio/english-maths/sport_stats/b1/mean.mp3"         },
  { slug: "median",       en: "median",       fr: "médiane",         audio: "/audio/english-maths/sport_stats/b1/median.mp3"       },
  { slug: "variance",     en: "variance",     fr: "variance",        audio: "/audio/english-maths/sport_stats/b1/variance.mp3"     },
  { slug: "deviation",    en: "deviation",    fr: "écart-type",      audio: "/audio/english-maths/sport_stats/b1/deviation.mp3"    },
  { slug: "ratio",        en: "ratio",        fr: "rapport",         audio: "/audio/english-maths/sport_stats/b1/ratio.mp3"        },
  { slug: "proportion",   en: "proportion",   fr: "proportion",      audio: "/audio/english-maths/sport_stats/b1/proportion.mp3"   },
  { slug: "sample",       en: "sample",       fr: "échantillon",     audio: "/audio/english-maths/sport_stats/b1/sample.mp3"       },
  { slug: "distribution", en: "distribution", fr: "distribution",    audio: "/audio/english-maths/sport_stats/b1/distribution.mp3" },
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

export const sportStatsB1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b1_sport_stats_en_to_fr_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_sport_stats",
    microId: "en_b1_sport_stats_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a statistics term used in sport performance analysis.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["sport_stats", "b1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_sport_stats_fr_to_en_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_sport_stats",
    microId: "en_b1_sport_stats_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 3)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about statistical analysis in sport.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["sport_stats", "b1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_sport_stats_listen_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_sport_stats",
    microId: "en_b1_sport_stats_listen",
    difficulty: 3 as const,
    text: `Listen and identify the statistics term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["sport_stats", "b1", "listen"],
  },
]);
