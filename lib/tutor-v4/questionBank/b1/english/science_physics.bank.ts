import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Science — Physics B1 ──────────────────────────────────────────────────────
const WORDS = [
  { slug: "refraction",  en: "refraction",  fr: "réfraction",    audio: "/audio/english-maths/science_physics/b1/refraction.mp3"  },
  { slug: "resistance",  en: "resistance",  fr: "résistance",    audio: "/audio/english-maths/science_physics/b1/resistance.mp3"  },
  { slug: "voltage",     en: "voltage",     fr: "tension",       audio: "/audio/english-maths/science_physics/b1/voltage.mp3"     },
  { slug: "frequency",   en: "frequency",   fr: "fréquence",     audio: "/audio/english-maths/science_physics/b1/frequency.mp3"   },
  { slug: "spectrum",    en: "spectrum",    fr: "spectre",       audio: "/audio/english-maths/science_physics/b1/spectrum.mp3"    },
  { slug: "radiation",   en: "radiation",   fr: "rayonnement",   audio: "/audio/english-maths/science_physics/b1/radiation.mp3"   },
  { slug: "circuit",     en: "circuit",     fr: "circuit",       audio: "/audio/english-maths/science_physics/b1/circuit.mp3"     },
  { slug: "nuclear",     en: "nuclear",     fr: "nucléaire",     audio: "/audio/english-maths/science_physics/b1/nuclear.mp3"     },
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

export const sciencePhysicsB1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b1_science_physics_en_to_fr_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_science_physics",
    microId: "en_b1_science_physics_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a physics term (physique-chimie — level B1).`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["science_physics", "b1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_science_physics_fr_to_en_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_science_physics",
    microId: "en_b1_science_physics_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about waves, electricity and optics.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["science_physics", "b1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_science_physics_listen_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_science_physics",
    microId: "en_b1_science_physics_listen",
    difficulty: 3 as const,
    text: `Listen and identify the physics term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["science_physics", "b1", "listen"],
  },
]);
