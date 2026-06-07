import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Géographie - Voyage — Climate science B2 ─────────────────────────────────
const WORDS = [
  { slug: "greenhouse",     en: "greenhouse effect", fr: "effet de serre",   audio: "/audio/english-maths/climate_science/b2/greenhouse.mp3"     },
  { slug: "carbon_footprint",en:"carbon footprint",  fr: "empreinte carbone",audio: "/audio/english-maths/climate_science/b2/carbon_footprint.mp3"},
  { slug: "sea_level",      en: "sea level",         fr: "niveau de la mer", audio: "/audio/english-maths/climate_science/b2/sea_level.mp3"      },
  { slug: "desertification",en: "desertification",   fr: "désertification",  audio: "/audio/english-maths/climate_science/b2/desertification.mp3" },
  { slug: "el_nino",        en: "El Niño",           fr: "El Niño",          audio: "/audio/english-maths/climate_science/b2/el_nino.mp3"        },
  { slug: "precipitation",  en: "precipitation",     fr: "précipitations",   audio: "/audio/english-maths/climate_science/b2/precipitation.mp3"  },
  { slug: "ozone",          en: "ozone layer",       fr: "couche d'ozone",   audio: "/audio/english-maths/climate_science/b2/ozone.mp3"          },
  { slug: "anomaly",        en: "anomaly",           fr: "anomalie",         audio: "/audio/english-maths/climate_science/b2/anomaly.mp3"        },
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

export const climateScienceB2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b2_climate_science_en_to_fr_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_climate_science",
    microId: "en_b2_climate_science_en_to_fr",
    difficulty: 3 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a climate science term.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["climate_science", "b2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_climate_science_fr_to_en_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_climate_science",
    microId: "en_b2_climate_science_fr_to_en",
    difficulty: 4 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about global warming and climate change.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["climate_science", "b2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_climate_science_listen_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_climate_science",
    microId: "en_b2_climate_science_listen",
    difficulty: 4 as const,
    text: `Listen and identify the climate term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["climate_science", "b2", "listen"],
  },
]);
