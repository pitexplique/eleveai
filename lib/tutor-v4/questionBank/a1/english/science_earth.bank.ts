import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Science — Earth & environment A1 ─────────────────────────────────────────
const WORDS = [
  { slug: "water",   en: "water",   fr: "eau",      audio: "/audio/english-maths/science_earth/a1/water.mp3"   },
  { slug: "air",     en: "air",     fr: "air",      audio: "/audio/english-maths/science_earth/a1/air.mp3"     },
  { slug: "soil",    en: "soil",    fr: "sol",      audio: "/audio/english-maths/science_earth/a1/soil.mp3"    },
  { slug: "rock",    en: "rock",    fr: "roche",    audio: "/audio/english-maths/science_earth/a1/rock.mp3"    },
  { slug: "sun",     en: "sun",     fr: "soleil",   audio: "/audio/english-maths/science_earth/a1/sun.mp3"     },
  { slug: "moon",    en: "moon",    fr: "lune",     audio: "/audio/english-maths/science_earth/a1/moon.mp3"    },
  { slug: "star",    en: "star",    fr: "étoile",   audio: "/audio/english-maths/science_earth/a1/star.mp3"    },
  { slug: "cloud",   en: "cloud",   fr: "nuage",    audio: "/audio/english-maths/science_earth/a1/cloud.mp3"   },
  { slug: "rain",    en: "rain",    fr: "pluie",    audio: "/audio/english-maths/science_earth/a1/rain.mp3"    },
  { slug: "volcano", en: "volcano", fr: "volcan",   audio: "/audio/english-maths/science_earth/a1/volcano.mp3" },
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

export const scienceEarthA1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a1_science_earth_en_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_science_earth",
    microId: "en_a1_science_earth_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a word about Earth, nature or space.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["science_earth", "a1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_science_earth_fr_to_en_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_science_earth",
    microId: "en_a1_science_earth_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 3)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about nature and our planet.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["science_earth", "a1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_science_earth_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_science_earth",
    microId: "en_a1_science_earth_listen",
    difficulty: 2 as const,
    text: `Listen and identify the word.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The word you heard is "${word.en}" (${word.fr}).`,
    tags: ["science_earth", "a1", "listen"],
  },
]);
