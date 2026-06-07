import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Géographie - Voyage — Directions A2 ──────────────────────────────────────
const WORDS = [
  { slug: "north",    en: "north",    fr: "nord",     audio: "/audio/english-maths/directions/a2/north.mp3"    },
  { slug: "south",    en: "south",    fr: "sud",      audio: "/audio/english-maths/directions/a2/south.mp3"    },
  { slug: "east",     en: "east",     fr: "est",      audio: "/audio/english-maths/directions/a2/east.mp3"     },
  { slug: "west",     en: "west",     fr: "ouest",    audio: "/audio/english-maths/directions/a2/west.mp3"     },
  { slug: "left",     en: "left",     fr: "gauche",   audio: "/audio/english-maths/directions/a2/left.mp3"     },
  { slug: "right",    en: "right",    fr: "droite",   audio: "/audio/english-maths/directions/a2/right.mp3"    },
  { slug: "near",     en: "near",     fr: "près",     audio: "/audio/english-maths/directions/a2/near.mp3"     },
  { slug: "far",      en: "far",      fr: "loin",     audio: "/audio/english-maths/directions/a2/far.mp3"      },
  { slug: "between",  en: "between",  fr: "entre",    audio: "/audio/english-maths/directions/a2/between.mp3"  },
  { slug: "opposite", en: "opposite", fr: "en face",  audio: "/audio/english-maths/directions/a2/opposite.mp3" },
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

export const directionsA2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a2_directions_en_to_fr_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_directions",
    microId: "en_a2_directions_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a direction or position word.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["directions", "a2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_directions_fr_to_en_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_directions",
    microId: "en_a2_directions_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about directions on a map.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["directions", "a2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_directions_listen_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_directions",
    microId: "en_a2_directions_listen",
    difficulty: 2 as const,
    text: `Listen and identify the direction.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The direction you heard is "${word.en}" (${word.fr}).`,
    tags: ["directions", "a2", "listen"],
  },
]);
