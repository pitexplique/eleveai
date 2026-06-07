import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Science — Chemistry B1 ────────────────────────────────────────────────────
const WORDS = [
  { slug: "oxidation",     en: "oxidation",     fr: "oxydation",       audio: "/audio/english-maths/science_chemistry/b1/oxidation.mp3"     },
  { slug: "reaction",      en: "reaction",      fr: "réaction",        audio: "/audio/english-maths/science_chemistry/b1/reaction.mp3"      },
  { slug: "bond",          en: "bond",          fr: "liaison",         audio: "/audio/english-maths/science_chemistry/b1/bond.mp3"          },
  { slug: "concentration", en: "concentration", fr: "concentration",   audio: "/audio/english-maths/science_chemistry/b1/concentration.mp3" },
  { slug: "compound",      en: "compound",      fr: "composé",         audio: "/audio/english-maths/science_chemistry/b1/compound.mp3"      },
  { slug: "ion",           en: "ion",           fr: "ion",             audio: "/audio/english-maths/science_chemistry/b1/ion.mp3"           },
  { slug: "electron",      en: "electron",      fr: "électron",        audio: "/audio/english-maths/science_chemistry/b1/electron.mp3"      },
  { slug: "periodic",      en: "periodic table",fr: "tableau périodique", audio: "/audio/english-maths/science_chemistry/b1/periodic.mp3"  },
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

export const scienceChemistryB1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b1_science_chemistry_en_to_fr_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_science_chemistry",
    microId: "en_b1_science_chemistry_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a chemistry term (physique-chimie — level B1).`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["science_chemistry", "b1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_science_chemistry_fr_to_en_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_science_chemistry",
    microId: "en_b1_science_chemistry_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about atoms, reactions and matter.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["science_chemistry", "b1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_science_chemistry_listen_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_science_chemistry",
    microId: "en_b1_science_chemistry_listen",
    difficulty: 3 as const,
    text: `Listen and identify the chemistry term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["science_chemistry", "b1", "listen"],
  },
]);
