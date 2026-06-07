import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Géographie - Voyage — Basic geography A1 ─────────────────────────────────
const WORDS = [
  { slug: "island",   en: "island",   fr: "île",      audio: "/audio/english-maths/geography_basic/a1/island.mp3"   },
  { slug: "mountain", en: "mountain", fr: "montagne", audio: "/audio/english-maths/geography_basic/a1/mountain.mp3" },
  { slug: "river",    en: "river",    fr: "rivière",  audio: "/audio/english-maths/geography_basic/a1/river.mp3"    },
  { slug: "sea",      en: "sea",      fr: "mer",      audio: "/audio/english-maths/geography_basic/a1/sea.mp3"      },
  { slug: "ocean",    en: "ocean",    fr: "océan",    audio: "/audio/english-maths/geography_basic/a1/ocean.mp3"    },
  { slug: "beach",    en: "beach",    fr: "plage",    audio: "/audio/english-maths/geography_basic/a1/beach.mp3"    },
  { slug: "forest",   en: "forest",   fr: "forêt",    audio: "/audio/english-maths/geography_basic/a1/forest.mp3"   },
  { slug: "city",     en: "city",     fr: "ville",    audio: "/audio/english-maths/geography_basic/a1/city.mp3"     },
  { slug: "village",  en: "village",  fr: "village",  audio: "/audio/english-maths/geography_basic/a1/village.mp3"  },
  { slug: "road",     en: "road",     fr: "route",    audio: "/audio/english-maths/geography_basic/a1/road.mp3"     },
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

export const geographyBasicA1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a1_geography_basic_en_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_geography_basic",
    microId: "en_a1_geography_basic_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a geography or landscape word.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["geography_basic", "a1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_geography_basic_fr_to_en_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_geography_basic",
    microId: "en_a1_geography_basic_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about landscapes and natural features.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["geography_basic", "a1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_geography_basic_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_geography_basic",
    microId: "en_a1_geography_basic_listen",
    difficulty: 2 as const,
    text: `Listen and identify the geography word.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The word you heard is "${word.en}" (${word.fr}).`,
    tags: ["geography_basic", "a1", "listen"],
  },
]);
