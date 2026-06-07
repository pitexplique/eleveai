import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Sport physics B1 — physique approfondie ───────────────────────────────────
const WORDS = [
  { slug: "velocity",     en: "velocity",     fr: "vitesse (vecteur)",    audio: "/audio/english-maths/sport_physics/b1/velocity.mp3"     },
  { slug: "acceleration", en: "acceleration", fr: "accélération",         audio: "/audio/english-maths/sport_physics/b1/acceleration.mp3" },
  { slug: "momentum",     en: "momentum",     fr: "quantité de mouvement",audio: "/audio/english-maths/sport_physics/b1/momentum.mp3"     },
  { slug: "displacement", en: "displacement", fr: "déplacement",          audio: "/audio/english-maths/sport_physics/b1/displacement.mp3" },
  { slug: "frequency",    en: "frequency",    fr: "fréquence",            audio: "/audio/english-maths/sport_physics/b1/frequency.mp3"    },
  { slug: "amplitude",    en: "amplitude",    fr: "amplitude",            audio: "/audio/english-maths/sport_physics/b1/amplitude.mp3"    },
  { slug: "trajectory",   en: "trajectory",   fr: "trajectoire",          audio: "/audio/english-maths/sport_physics/b1/trajectory.mp3"   },
  { slug: "resistance",   en: "resistance",   fr: "résistance",           audio: "/audio/english-maths/sport_physics/b1/resistance.mp3"   },
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

export const sportPhysicsB1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b1_sport_physics_en_to_fr_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_sport_physics",
    microId: "en_b1_sport_physics_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a physics term used in sport science.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["sport_physics", "b1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_sport_physics_fr_to_en_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_sport_physics",
    microId: "en_b1_sport_physics_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 3)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about forces and motion in sport.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["sport_physics", "b1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_sport_physics_listen_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_sport_physics",
    microId: "en_b1_sport_physics_listen",
    difficulty: 3 as const,
    text: `Listen and identify the physics term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["sport_physics", "b1", "listen"],
  },
]);
