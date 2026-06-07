import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Vie quotidienne — Home A2 ─────────────────────────────────────────────────
const WORDS = [
  { slug: "bedroom",    en: "bedroom",    fr: "chambre",       audio: "/audio/english-maths/home/a2/bedroom.mp3"    },
  { slug: "kitchen",    en: "kitchen",    fr: "cuisine",       audio: "/audio/english-maths/home/a2/kitchen.mp3"    },
  { slug: "bathroom",   en: "bathroom",   fr: "salle de bain", audio: "/audio/english-maths/home/a2/bathroom.mp3"   },
  { slug: "living_room",en: "living room",fr: "salon",         audio: "/audio/english-maths/home/a2/living_room.mp3"},
  { slug: "door",       en: "door",       fr: "porte",         audio: "/audio/english-maths/home/a2/door.mp3"       },
  { slug: "window",     en: "window",     fr: "fenêtre",       audio: "/audio/english-maths/home/a2/window.mp3"     },
  { slug: "bed",        en: "bed",        fr: "lit",           audio: "/audio/english-maths/home/a2/bed.mp3"        },
  { slug: "sofa",       en: "sofa",       fr: "canapé",        audio: "/audio/english-maths/home/a2/sofa.mp3"       },
  { slug: "floor",      en: "floor",      fr: "sol",           audio: "/audio/english-maths/home/a2/floor.mp3"      },
  { slug: "roof",       en: "roof",       fr: "toit",          audio: "/audio/english-maths/home/a2/roof.mp3"       },
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

export const homeA2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a2_home_en_to_fr_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_home",
    microId: "en_a2_home_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a room or part of a house.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["home", "a2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_home_fr_to_en_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_home",
    microId: "en_a2_home_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about rooms and parts of a house.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["home", "a2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_home_listen_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_home",
    microId: "en_a2_home_listen",
    difficulty: 2 as const,
    text: `Listen and identify the home word.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The word you heard is "${word.en}" (${word.fr}).`,
    tags: ["home", "a2", "listen"],
  },
]);
