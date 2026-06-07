import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Science — Living world A1 ─────────────────────────────────────────────────
const WORDS = [
  { slug: "cell",    en: "cell",    fr: "cellule",  audio: "/audio/english-maths/science_living/a1/cell.mp3"    },
  { slug: "plant",   en: "plant",   fr: "plante",   audio: "/audio/english-maths/science_living/a1/plant.mp3"   },
  { slug: "animal",  en: "animal",  fr: "animal",   audio: "/audio/english-maths/science_living/a1/animal.mp3"  },
  { slug: "organ",   en: "organ",   fr: "organe",   audio: "/audio/english-maths/science_living/a1/organ.mp3"   },
  { slug: "body",    en: "body",    fr: "corps",    audio: "/audio/english-maths/science_living/a1/body.mp3"    },
  { slug: "leaf",    en: "leaf",    fr: "feuille",  audio: "/audio/english-maths/science_living/a1/leaf.mp3"    },
  { slug: "root",    en: "root",    fr: "racine",   audio: "/audio/english-maths/science_living/a1/root.mp3"    },
  { slug: "seed",    en: "seed",    fr: "graine",   audio: "/audio/english-maths/science_living/a1/seed.mp3"    },
  { slug: "fish",    en: "fish",    fr: "poisson",  audio: "/audio/english-maths/science_living/a1/fish.mp3"    },
  { slug: "bird",    en: "bird",    fr: "oiseau",   audio: "/audio/english-maths/science_living/a1/bird.mp3"    },
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

export const scienceLivingA1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a1_science_living_en_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_science_living",
    microId: "en_a1_science_living_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a living world science word.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["science_living", "a1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_science_living_fr_to_en_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_science_living",
    microId: "en_a1_science_living_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about living things in science.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["science_living", "a1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_science_living_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_science_living",
    microId: "en_a1_science_living_listen",
    difficulty: 2 as const,
    text: `Listen and identify the science word.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The word you heard is "${word.en}" (${word.fr}).`,
    tags: ["science_living", "a1", "listen"],
  },
]);
