import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Géographie - Voyage — Geography A2 ───────────────────────────────────────
const WORDS = [
  { slug: "continent",  en: "continent",  fr: "continent",    audio: "/audio/english-maths/geography/a2/continent.mp3"  },
  { slug: "capital",    en: "capital",    fr: "capitale",     audio: "/audio/english-maths/geography/a2/capital.mp3"    },
  { slug: "coast",      en: "coast",      fr: "côte",         audio: "/audio/english-maths/geography/a2/coast.mp3"      },
  { slug: "volcano",    en: "volcano",    fr: "volcan",       audio: "/audio/english-maths/geography/a2/volcano.mp3"    },
  { slug: "coral_reef", en: "coral reef", fr: "récif corallien", audio: "/audio/english-maths/geography/a2/coral_reef.mp3" },
  { slug: "lagoon",     en: "lagoon",     fr: "lagon",        audio: "/audio/english-maths/geography/a2/lagoon.mp3"     },
  { slug: "climate",    en: "climate",    fr: "climat",       audio: "/audio/english-maths/geography/a2/climate.mp3"    },
  { slug: "population", en: "population", fr: "population",   audio: "/audio/english-maths/geography/a2/population.mp3" },
  { slug: "border",     en: "border",     fr: "frontière",    audio: "/audio/english-maths/geography/a2/border.mp3"     },
  { slug: "latitude",   en: "latitude",   fr: "latitude",     audio: "/audio/english-maths/geography/a2/latitude.mp3"   },
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

export const geographyA2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a2_geography_en_to_fr_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_geography",
    microId: "en_a2_geography_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a geography term.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["geography", "a2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_geography_fr_to_en_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_geography",
    microId: "en_a2_geography_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about maps, landscapes and geography.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["geography", "a2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_geography_listen_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_geography",
    microId: "en_a2_geography_listen",
    difficulty: 3 as const,
    text: `Listen and identify the geography term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["geography", "a2", "listen"],
  },
]);
