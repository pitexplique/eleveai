import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Vie quotidienne — Food A1 ─────────────────────────────────────────────────
const WORDS = [
  { slug: "bread",     en: "bread",     fr: "pain",     audio: "/audio/english-maths/food/a1/bread.mp3"     },
  { slug: "rice",      en: "rice",      fr: "riz",      audio: "/audio/english-maths/food/a1/rice.mp3"      },
  { slug: "fruit",     en: "fruit",     fr: "fruit",    audio: "/audio/english-maths/food/a1/fruit.mp3"     },
  { slug: "vegetable", en: "vegetable", fr: "légume",   audio: "/audio/english-maths/food/a1/vegetable.mp3" },
  { slug: "water",     en: "water",     fr: "eau",      audio: "/audio/english-maths/food/a1/water.mp3"     },
  { slug: "milk",      en: "milk",      fr: "lait",     audio: "/audio/english-maths/food/a1/milk.mp3"      },
  { slug: "meat",      en: "meat",      fr: "viande",   audio: "/audio/english-maths/food/a1/meat.mp3"      },
  { slug: "fish",      en: "fish",      fr: "poisson",  audio: "/audio/english-maths/food/a1/fish.mp3"      },
  { slug: "egg",       en: "egg",       fr: "œuf",      audio: "/audio/english-maths/food/a1/egg.mp3"       },
  { slug: "juice",     en: "juice",     fr: "jus",      audio: "/audio/english-maths/food/a1/juice.mp3"     },
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

export const foodA1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a1_food_en_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_food",
    microId: "en_a1_food_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a food or drink.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["food", "a1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_food_fr_to_en_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_food",
    microId: "en_a1_food_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about food and drinks.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["food", "a1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_food_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_food",
    microId: "en_a1_food_listen",
    difficulty: 2 as const,
    text: `Listen and identify the food word.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The word you heard is "${word.en}" (${word.fr}).`,
    tags: ["food", "a1", "listen"],
  },
]);
