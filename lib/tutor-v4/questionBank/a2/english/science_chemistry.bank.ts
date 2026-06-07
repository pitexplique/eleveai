import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Science — Chemistry A2 ────────────────────────────────────────────────────
const WORDS = [
  { slug: "atom",     en: "atom",     fr: "atome",     audio: "/audio/english-maths/science_chemistry/a2/atom.mp3"     },
  { slug: "molecule", en: "molecule", fr: "molécule",  audio: "/audio/english-maths/science_chemistry/a2/molecule.mp3" },
  { slug: "element",  en: "element",  fr: "élément",   audio: "/audio/english-maths/science_chemistry/a2/element.mp3"  },
  { slug: "mixture",  en: "mixture",  fr: "mélange",   audio: "/audio/english-maths/science_chemistry/a2/mixture.mp3"  },
  { slug: "solution", en: "solution", fr: "solution",  audio: "/audio/english-maths/science_chemistry/a2/solution.mp3" },
  { slug: "acid",     en: "acid",     fr: "acide",     audio: "/audio/english-maths/science_chemistry/a2/acid.mp3"     },
  { slug: "metal",    en: "metal",    fr: "métal",     audio: "/audio/english-maths/science_chemistry/a2/metal.mp3"    },
  { slug: "gas",      en: "gas",      fr: "gaz",       audio: "/audio/english-maths/science_chemistry/a2/gas.mp3"      },
  { slug: "solid",    en: "solid",    fr: "solide",    audio: "/audio/english-maths/science_chemistry/a2/solid.mp3"    },
  { slug: "liquid",   en: "liquid",   fr: "liquide",   audio: "/audio/english-maths/science_chemistry/a2/liquid.mp3"   },
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

export const scienceChemistryA2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a2_science_chemistry_en_to_fr_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_science_chemistry",
    microId: "en_a2_science_chemistry_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a chemistry term (physique-chimie).`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["science_chemistry", "a2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_science_chemistry_fr_to_en_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_science_chemistry",
    microId: "en_a2_science_chemistry_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about matter and chemical substances.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["science_chemistry", "a2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_science_chemistry_listen_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_science_chemistry",
    microId: "en_a2_science_chemistry_listen",
    difficulty: 3 as const,
    text: `Listen and identify the chemistry term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["science_chemistry", "a2", "listen"],
  },
]);
