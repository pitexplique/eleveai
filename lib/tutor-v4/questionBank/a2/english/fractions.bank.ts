import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Fractions vocabulary A2 ───────────────────────────────────────────────────
const WORDS = [
  { slug: "numerator",         en: "numerator",          fr: "numérateur",       audio: "/audio/english-maths/fractions/a2/numerator.mp3"         },
  { slug: "denominator",       en: "denominator",        fr: "dénominateur",     audio: "/audio/english-maths/fractions/a2/denominator.mp3"       },
  { slug: "fraction",          en: "fraction",           fr: "fraction",         audio: "/audio/english-maths/fractions/a2/fraction.mp3"          },
  { slug: "half",              en: "half",               fr: "demi",             audio: "/audio/english-maths/fractions/a2/half.mp3"              },
  { slug: "quarter",           en: "quarter",            fr: "quart",            audio: "/audio/english-maths/fractions/a2/quarter.mp3"           },
  { slug: "third",             en: "third",              fr: "tiers",            audio: "/audio/english-maths/fractions/a2/third.mp3"             },
  { slug: "irreducible",       en: "irreducible",        fr: "irréductible",     audio: "/audio/english-maths/fractions/a2/irreducible.mp3"       },
  { slug: "common_denominator",en: "common denominator", fr: "dénominateur commun", audio: "/audio/english-maths/fractions/a2/common_denominator.mp3" },
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

export const fractionsA2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a2_fractions_en_to_fr_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_fractions",
    microId: "en_a2_fractions_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a fractions vocabulary word.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["fractions", "a2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_fractions_fr_to_en_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_fractions",
    microId: "en_a2_fractions_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 3)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about fractions vocabulary.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["fractions", "a2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_fractions_listen_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_fractions",
    microId: "en_a2_fractions_listen",
    difficulty: 3 as const,
    text: `Listen and identify the fractions term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 5)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["fractions", "a2", "listen"],
  },
]);
