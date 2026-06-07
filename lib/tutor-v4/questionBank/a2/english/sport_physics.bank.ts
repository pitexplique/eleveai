import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Sport physics A2 — vitesse, accélération, distance… ──────────────────────
const WORDS = [
  { slug: "speed",        en: "speed",        fr: "vitesse",       audio: "/audio/english-maths/sport_physics/a2/speed.mp3"        },
  { slug: "distance",     en: "distance",     fr: "distance",      audio: "/audio/english-maths/sport_physics/a2/distance.mp3"     },
  { slug: "time",         en: "time",         fr: "temps",         audio: "/audio/english-maths/sport_physics/a2/time.mp3"         },
  { slug: "weight",       en: "weight",       fr: "poids",         audio: "/audio/english-maths/sport_physics/a2/weight.mp3"       },
  { slug: "height",       en: "height",       fr: "hauteur",       audio: "/audio/english-maths/sport_physics/a2/height.mp3"       },
  { slug: "acceleration", en: "acceleration", fr: "accélération",  audio: "/audio/english-maths/sport_physics/a2/acceleration.mp3" },
  { slug: "force",        en: "force",        fr: "force",         audio: "/audio/english-maths/sport_physics/a2/force.mp3"        },
  { slug: "velocity",     en: "velocity",     fr: "vélocité",      audio: "/audio/english-maths/sport_physics/a2/velocity.mp3"     },
  { slug: "energy",       en: "energy",       fr: "énergie",       audio: "/audio/english-maths/sport_physics/a2/energy.mp3"       },
  { slug: "power",        en: "power",        fr: "puissance",     audio: "/audio/english-maths/sport_physics/a2/power.mp3"        },
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

export const sportPhysicsA2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a2_sport_physics_en_to_fr_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_sport_physics",
    microId: "en_a2_sport_physics_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a physics or measurement term used in sport.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["sport_physics", "a2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_sport_physics_fr_to_en_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_sport_physics",
    microId: "en_a2_sport_physics_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 5)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about physics in sport: speed, force, energy…`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["sport_physics", "a2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_sport_physics_listen_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_sport_physics",
    microId: "en_a2_sport_physics_listen",
    difficulty: 3 as const,
    text: `Listen and identify the physics term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 8)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["sport_physics", "a2", "listen"],
  },
]);
