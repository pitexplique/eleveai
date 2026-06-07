import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Sport measurements A1 ─────────────────────────────────────────────────────
const WORDS = [
  { slug: "metre",      en: "metre",      fr: "mètre",        audio: "/audio/english-maths/sport_measurements/a1/metre.mp3"      },
  { slug: "kilometre",  en: "kilometre",  fr: "kilomètre",    audio: "/audio/english-maths/sport_measurements/a1/kilometre.mp3"  },
  { slug: "second",     en: "second",     fr: "seconde",      audio: "/audio/english-maths/sport_measurements/a1/second.mp3"     },
  { slug: "minute",     en: "minute",     fr: "minute",       audio: "/audio/english-maths/sport_measurements/a1/minute.mp3"     },
  { slug: "hour",       en: "hour",       fr: "heure",        audio: "/audio/english-maths/sport_measurements/a1/hour.mp3"       },
  { slug: "kilogram",   en: "kilogram",   fr: "kilogramme",   audio: "/audio/english-maths/sport_measurements/a1/kilogram.mp3"   },
  { slug: "centimetre", en: "centimetre", fr: "centimètre",   audio: "/audio/english-maths/sport_measurements/a1/centimetre.mp3" },
  { slug: "lap",        en: "lap",        fr: "tour de piste",audio: "/audio/english-maths/sport_measurements/a1/lap.mp3"        },
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

export const sportMeasurementsA1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a1_sport_measurements_en_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_sport_measurements",
    microId: "en_a1_sport_measurements_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a unit or measurement used in sport.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["sport_measurements", "a1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_sport_measurements_fr_to_en_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_sport_measurements",
    microId: "en_a1_sport_measurements_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 3)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about units of measurement in sport.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["sport_measurements", "a1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_sport_measurements_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_sport_measurements",
    microId: "en_a1_sport_measurements_listen",
    difficulty: 2 as const,
    text: `Listen and identify the measurement.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 5)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The measurement you heard is "${word.en}" (${word.fr}).`,
    tags: ["sport_measurements", "a1", "listen"],
  },
]);
