import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Sport science B2 — physique avancée ───────────────────────────────────────
const WORDS = [
  { slug: "trajectory",      en: "trajectory",      fr: "trajectoire",           audio: "/audio/english-maths/sport_science/b2/trajectory.mp3"      },
  { slug: "projectile",      en: "projectile",      fr: "projectile",            audio: "/audio/english-maths/sport_science/b2/projectile.mp3"      },
  { slug: "friction",        en: "friction",        fr: "frottement",            audio: "/audio/english-maths/sport_science/b2/friction.mp3"        },
  { slug: "gravity",         en: "gravity",         fr: "gravité",               audio: "/audio/english-maths/sport_science/b2/gravity.mp3"         },
  { slug: "momentum",        en: "momentum",        fr: "quantité de mouvement", audio: "/audio/english-maths/sport_science/b2/momentum.mp3"        },
  { slug: "kinetic_energy",  en: "kinetic energy",  fr: "énergie cinétique",     audio: "/audio/english-maths/sport_science/b2/kinetic_energy.mp3"  },
  { slug: "potential_energy",en: "potential energy",fr: "énergie potentielle",   audio: "/audio/english-maths/sport_science/b2/potential_energy.mp3" },
  { slug: "resultant",       en: "resultant",       fr: "résultante",            audio: "/audio/english-maths/sport_science/b2/resultant.mp3"       },
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

export const sportScienceB2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b2_sport_science_en_to_fr_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_sport_science",
    microId: "en_b2_sport_science_en_to_fr",
    difficulty: 3 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's an advanced physics concept in sport science.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["sport_science", "b2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_sport_science_fr_to_en_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_sport_science",
    microId: "en_b2_sport_science_fr_to_en",
    difficulty: 4 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about forces, motion and energy in sport.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["sport_science", "b2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_sport_science_listen_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_sport_science",
    microId: "en_b2_sport_science_listen",
    difficulty: 4 as const,
    text: `Listen and identify the sport science term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["sport_science", "b2", "listen"],
  },
]);
