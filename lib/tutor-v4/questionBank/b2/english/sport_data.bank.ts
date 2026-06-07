import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Sport data analysis B2 ────────────────────────────────────────────────────
const WORDS = [
  { slug: "dataset",     en: "dataset",      fr: "jeu de données",  audio: "/audio/english-maths/sport_data/b2/dataset.mp3"     },
  { slug: "distribution",en: "distribution", fr: "distribution",    audio: "/audio/english-maths/sport_data/b2/distribution.mp3"},
  { slug: "outlier",     en: "outlier",      fr: "valeur aberrante",audio: "/audio/english-maths/sport_data/b2/outlier.mp3"     },
  { slug: "regression",  en: "regression",   fr: "régression",      audio: "/audio/english-maths/sport_data/b2/regression.mp3"  },
  { slug: "coefficient", en: "coefficient",  fr: "coefficient",     audio: "/audio/english-maths/sport_data/b2/coefficient.mp3" },
  { slug: "histogram",   en: "histogram",    fr: "histogramme",     audio: "/audio/english-maths/sport_data/b2/histogram.mp3"   },
  { slug: "correlation", en: "correlation",  fr: "corrélation",     audio: "/audio/english-maths/sport_data/b2/correlation.mp3" },
  { slug: "scatter_plot",en: "scatter plot", fr: "nuage de points", audio: "/audio/english-maths/sport_data/b2/scatter_plot.mp3"},
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

export const sportDataB2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b2_sport_data_en_to_fr_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_sport_data",
    microId: "en_b2_sport_data_en_to_fr",
    difficulty: 3 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a data analysis term used in sport science.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["sport_data", "b2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_sport_data_fr_to_en_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_sport_data",
    microId: "en_b2_sport_data_fr_to_en",
    difficulty: 4 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about statistical tools for sport data.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["sport_data", "b2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_sport_data_listen_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_sport_data",
    microId: "en_b2_sport_data_listen",
    difficulty: 4 as const,
    text: `Listen and identify the data analysis term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["sport_data", "b2", "listen"],
  },
]);
