import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Science — Physics B2 ──────────────────────────────────────────────────────
const WORDS = [
  { slug: "quantum",         en: "quantum",         fr: "quantique",          audio: "/audio/english-maths/science_physics/b2/quantum.mp3"         },
  { slug: "electromagnetic", en: "electromagnetic", fr: "électromagnétique",  audio: "/audio/english-maths/science_physics/b2/electromagnetic.mp3" },
  { slug: "thermodynamics",  en: "thermodynamics",  fr: "thermodynamique",    audio: "/audio/english-maths/science_physics/b2/thermodynamics.mp3"  },
  { slug: "interference",    en: "interference",    fr: "interférence",       audio: "/audio/english-maths/science_physics/b2/interference.mp3"    },
  { slug: "photoelectric",   en: "photoelectric",   fr: "photoélectrique",    audio: "/audio/english-maths/science_physics/b2/photoelectric.mp3"   },
  { slug: "wave_function",   en: "wave function",   fr: "fonction d'onde",    audio: "/audio/english-maths/science_physics/b2/wave_function.mp3"   },
  { slug: "relativity",      en: "relativity",      fr: "relativité",         audio: "/audio/english-maths/science_physics/b2/relativity.mp3"      },
  { slug: "entropy",         en: "entropy",         fr: "entropie",           audio: "/audio/english-maths/science_physics/b2/entropy.mp3"         },
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

export const sciencePhysicsB2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b2_science_physics_en_to_fr_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_science_physics",
    microId: "en_b2_science_physics_en_to_fr",
    difficulty: 3 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's an advanced physics concept (terminale / prépa).`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["science_physics", "b2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_science_physics_fr_to_en_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_science_physics",
    microId: "en_b2_science_physics_fr_to_en",
    difficulty: 4 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about modern physics: quantum, waves, relativity.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["science_physics", "b2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_science_physics_listen_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_science_physics",
    microId: "en_b2_science_physics_listen",
    difficulty: 4 as const,
    text: `Listen and identify the physics term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["science_physics", "b2", "listen"],
  },
]);
