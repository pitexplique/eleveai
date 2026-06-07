import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Économie - Gestion — Economic statistics B2 ───────────────────────────────
const WORDS = [
  { slug: "index",       en: "index",       fr: "indice",        audio: "/audio/english-maths/eco_statistics/b2/index.mp3"       },
  { slug: "elasticity",  en: "elasticity",  fr: "élasticité",    audio: "/audio/english-maths/eco_statistics/b2/elasticity.mp3"  },
  { slug: "forecast",    en: "forecast",    fr: "prévision",     audio: "/audio/english-maths/eco_statistics/b2/forecast.mp3"    },
  { slug: "trend",       en: "trend",       fr: "tendance",      audio: "/audio/english-maths/eco_statistics/b2/trend.mp3"       },
  { slug: "coefficient", en: "coefficient", fr: "coefficient",   audio: "/audio/english-maths/eco_statistics/b2/coefficient.mp3" },
  { slug: "regression",  en: "regression",  fr: "régression",    audio: "/audio/english-maths/eco_statistics/b2/regression.mp3"  },
  { slug: "deviation",   en: "deviation",   fr: "écart",         audio: "/audio/english-maths/eco_statistics/b2/deviation.mp3"   },
  { slug: "indicator",   en: "indicator",   fr: "indicateur",    audio: "/audio/english-maths/eco_statistics/b2/indicator.mp3"   },
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

export const ecoStatisticsB2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b2_eco_statistics_en_to_fr_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_eco_statistics",
    microId: "en_b2_eco_statistics_en_to_fr",
    difficulty: 3 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a statistical or economic analysis term.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["eco_statistics", "b2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_eco_statistics_fr_to_en_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_eco_statistics",
    microId: "en_b2_eco_statistics_fr_to_en",
    difficulty: 4 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about economic data and statistics.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["eco_statistics", "b2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_eco_statistics_listen_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_eco_statistics",
    microId: "en_b2_eco_statistics_listen",
    difficulty: 4 as const,
    text: `Listen and identify the statistics term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["eco_statistics", "b2", "listen"],
  },
]);
