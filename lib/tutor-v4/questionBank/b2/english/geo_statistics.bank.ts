import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Géographie - Voyage — Geo statistics B2 ──────────────────────────────────
const WORDS = [
  { slug: "density",          en: "density",          fr: "densité",          audio: "/audio/english-maths/geo_statistics/b2/density.mp3"          },
  { slug: "urbanisation_rate",en: "urbanisation rate",fr: "taux d'urbanisation", audio: "/audio/english-maths/geo_statistics/b2/urbanisation_rate.mp3"},
  { slug: "hdi",              en: "HDI",              fr: "IDH",              audio: "/audio/english-maths/geo_statistics/b2/hdi.mp3"              },
  { slug: "gdp_per_capita",   en: "GDP per capita",   fr: "PIB par habitant", audio: "/audio/english-maths/geo_statistics/b2/gdp_per_capita.mp3"   },
  { slug: "birth_rate",       en: "birth rate",       fr: "taux de natalité", audio: "/audio/english-maths/geo_statistics/b2/birth_rate.mp3"       },
  { slug: "death_rate",       en: "death rate",       fr: "taux de mortalité",audio: "/audio/english-maths/geo_statistics/b2/death_rate.mp3"       },
  { slug: "migration_rate",   en: "migration rate",   fr: "taux de migration",audio: "/audio/english-maths/geo_statistics/b2/migration_rate.mp3"   },
  { slug: "growth_rate",      en: "growth rate",      fr: "taux de croissance",audio: "/audio/english-maths/geo_statistics/b2/growth_rate.mp3"     },
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

export const geoStatisticsB2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b2_geo_statistics_en_to_fr_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_geo_statistics",
    microId: "en_b2_geo_statistics_en_to_fr",
    difficulty: 3 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a demographic or geographic statistics term.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["geo_statistics", "b2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_geo_statistics_fr_to_en_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_geo_statistics",
    microId: "en_b2_geo_statistics_fr_to_en",
    difficulty: 4 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about population and geographic indicators.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["geo_statistics", "b2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_geo_statistics_listen_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_geo_statistics",
    microId: "en_b2_geo_statistics_listen",
    difficulty: 4 as const,
    text: `Listen and identify the statistics term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["geo_statistics", "b2", "listen"],
  },
]);
