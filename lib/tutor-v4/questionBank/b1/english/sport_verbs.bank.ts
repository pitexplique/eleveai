import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Sport verbs B1 — analyse, calculate, measure… ────────────────────────────
const WORDS = [
  { slug: "analyse",   en: "analyse",   fr: "analyser",     audio: "/audio/english-maths/sport_verbs/b1/analyse.mp3"   },
  { slug: "calculate", en: "calculate", fr: "calculer",     audio: "/audio/english-maths/sport_verbs/b1/calculate.mp3" },
  { slug: "measure",   en: "measure",   fr: "mesurer",      audio: "/audio/english-maths/sport_verbs/b1/measure.mp3"   },
  { slug: "compare",   en: "compare",   fr: "comparer",     audio: "/audio/english-maths/sport_verbs/b1/compare.mp3"   },
  { slug: "estimate",  en: "estimate",  fr: "estimer",      audio: "/audio/english-maths/sport_verbs/b1/estimate.mp3"  },
  { slug: "convert",   en: "convert",   fr: "convertir",    audio: "/audio/english-maths/sport_verbs/b1/convert.mp3"   },
  { slug: "plot",      en: "plot",      fr: "tracer",       audio: "/audio/english-maths/sport_verbs/b1/plot.mp3"      },
  { slug: "represent", en: "represent", fr: "représenter",  audio: "/audio/english-maths/sport_verbs/b1/represent.mp3" },
  { slug: "record",    en: "record",    fr: "enregistrer",  audio: "/audio/english-maths/sport_verbs/b1/record.mp3"    },
  { slug: "compute",   en: "compute",   fr: "calculer (informatique)", audio: "/audio/english-maths/sport_verbs/b1/compute.mp3" },
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

export const sportVerbsB1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b1_sport_verbs_en_to_fr_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_sport_verbs",
    microId: "en_b1_sport_verbs_en_to_fr",
    difficulty: 2 as const,
    text: `What does the verb "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's used in sports analysis and data.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["sport_verbs", "b1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_sport_verbs_fr_to_en_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_sport_verbs",
    microId: "en_b1_sport_verbs_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about analysis and measurement verbs.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["sport_verbs", "b1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_sport_verbs_listen_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_sport_verbs",
    microId: "en_b1_sport_verbs_listen",
    difficulty: 3 as const,
    text: `Listen and choose the correct verb.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The verb you heard is "${word.en}" (${word.fr}).`,
    tags: ["sport_verbs", "b1", "listen"],
  },
]);
