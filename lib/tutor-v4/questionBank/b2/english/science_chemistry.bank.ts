import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Science — Chemistry B2 ────────────────────────────────────────────────────
const WORDS = [
  { slug: "electrolysis",   en: "electrolysis",   fr: "électrolyse",     audio: "/audio/english-maths/science_chemistry/b2/electrolysis.mp3"   },
  { slug: "titration",      en: "titration",      fr: "titration",       audio: "/audio/english-maths/science_chemistry/b2/titration.mp3"      },
  { slug: "equilibrium",    en: "equilibrium",    fr: "équilibre",       audio: "/audio/english-maths/science_chemistry/b2/equilibrium.mp3"    },
  { slug: "entropy",        en: "entropy",        fr: "entropie",        audio: "/audio/english-maths/science_chemistry/b2/entropy.mp3"        },
  { slug: "polymer",        en: "polymer",        fr: "polymère",        audio: "/audio/english-maths/science_chemistry/b2/polymer.mp3"        },
  { slug: "isomer",         en: "isomer",         fr: "isomère",         audio: "/audio/english-maths/science_chemistry/b2/isomer.mp3"         },
  { slug: "oxidation_state",en: "oxidation state",fr: "degré d'oxydation",audio: "/audio/english-maths/science_chemistry/b2/oxidation_state.mp3"},
  { slug: "stoichiometry",  en: "stoichiometry",  fr: "stœchiométrie",   audio: "/audio/english-maths/science_chemistry/b2/stoichiometry.mp3"  },
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

export const scienceChemistryB2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b2_science_chemistry_en_to_fr_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_science_chemistry",
    microId: "en_b2_science_chemistry_en_to_fr",
    difficulty: 3 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's an advanced chemistry term (terminale).`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["science_chemistry", "b2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_science_chemistry_fr_to_en_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_science_chemistry",
    microId: "en_b2_science_chemistry_fr_to_en",
    difficulty: 4 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about advanced reactions and chemical analysis.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["science_chemistry", "b2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_science_chemistry_listen_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_science_chemistry",
    microId: "en_b2_science_chemistry_listen",
    difficulty: 4 as const,
    text: `Listen and identify the chemistry term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["science_chemistry", "b2", "listen"],
  },
]);
