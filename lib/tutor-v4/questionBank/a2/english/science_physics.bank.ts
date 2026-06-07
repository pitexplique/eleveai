import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Science — Physics A2 ──────────────────────────────────────────────────────
const WORDS = [
  { slug: "light",       en: "light",       fr: "lumière",      audio: "/audio/english-maths/science_physics/a2/light.mp3"       },
  { slug: "sound",       en: "sound",       fr: "son",          audio: "/audio/english-maths/science_physics/a2/sound.mp3"       },
  { slug: "wave",        en: "wave",        fr: "onde",         audio: "/audio/english-maths/science_physics/a2/wave.mp3"        },
  { slug: "temperature", en: "temperature", fr: "température",  audio: "/audio/english-maths/science_physics/a2/temperature.mp3" },
  { slug: "pressure",    en: "pressure",    fr: "pression",     audio: "/audio/english-maths/science_physics/a2/pressure.mp3"    },
  { slug: "current",     en: "current",     fr: "courant",      audio: "/audio/english-maths/science_physics/a2/current.mp3"     },
  { slug: "magnet",      en: "magnet",      fr: "aimant",       audio: "/audio/english-maths/science_physics/a2/magnet.mp3"      },
  { slug: "circuit",     en: "circuit",     fr: "circuit",      audio: "/audio/english-maths/science_physics/a2/circuit.mp3"     },
  { slug: "energy",      en: "energy",      fr: "énergie",      audio: "/audio/english-maths/science_physics/a2/energy.mp3"      },
  { slug: "voltage",     en: "voltage",     fr: "tension",      audio: "/audio/english-maths/science_physics/a2/voltage.mp3"     },
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

export const sciencePhysicsA2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a2_science_physics_en_to_fr_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_science_physics",
    microId: "en_a2_science_physics_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a physics term (physique-chimie).`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["science_physics", "a2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_science_physics_fr_to_en_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_science_physics",
    microId: "en_a2_science_physics_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 5)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about light, sound and electricity.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["science_physics", "a2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_science_physics_listen_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_science_physics",
    microId: "en_a2_science_physics_listen",
    difficulty: 3 as const,
    text: `Listen and identify the physics term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 8)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["science_physics", "a2", "listen"],
  },
]);
