import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Sport scores & stats A2 ───────────────────────────────────────────────────
const WORDS = [
  { slug: "score",      en: "score",      fr: "score",        audio: "/audio/english-maths/sport_stats/a2/score.mp3"      },
  { slug: "goal",       en: "goal",       fr: "but",          audio: "/audio/english-maths/sport_stats/a2/goal.mp3"       },
  { slug: "point",      en: "point",      fr: "point",        audio: "/audio/english-maths/sport_stats/a2/point.mp3"      },
  { slug: "record",     en: "record",     fr: "record",       audio: "/audio/english-maths/sport_stats/a2/record.mp3"     },
  { slug: "average",    en: "average",    fr: "moyenne",      audio: "/audio/english-maths/sport_stats/a2/average.mp3"    },
  { slug: "ranking",    en: "ranking",    fr: "classement",   audio: "/audio/english-maths/sport_stats/a2/ranking.mp3"    },
  { slug: "percentage", en: "percentage", fr: "pourcentage",  audio: "/audio/english-maths/sport_stats/a2/percentage.mp3" },
  { slug: "total",      en: "total",      fr: "total",        audio: "/audio/english-maths/sport_stats/a2/total.mp3"      },
  { slug: "result",     en: "result",     fr: "résultat",     audio: "/audio/english-maths/sport_stats/a2/result.mp3"     },
  { slug: "champion",   en: "champion",   fr: "champion",     audio: "/audio/english-maths/sport_stats/a2/champion.mp3"   },
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

export const sportStatsA2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a2_sport_stats_en_to_fr_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_sport_stats",
    microId: "en_a2_sport_stats_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a sport score or statistics term.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["sport_stats", "a2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_sport_stats_fr_to_en_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_sport_stats",
    microId: "en_a2_sport_stats_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about scores and statistics in sport.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["sport_stats", "a2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_sport_stats_listen_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_sport_stats",
    microId: "en_a2_sport_stats_listen",
    difficulty: 3 as const,
    text: `Listen and identify the stats term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["sport_stats", "a2", "listen"],
  },
]);
