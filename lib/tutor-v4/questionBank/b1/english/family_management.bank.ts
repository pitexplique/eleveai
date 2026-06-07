import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Économie - Gestion — Family management B1 ────────────────────────────────
const WORDS = [
  { slug: "household",     en: "household",     fr: "foyer",             audio: "/audio/english-maths/family_management/b1/household.mp3"     },
  { slug: "installment",   en: "installment",   fr: "mensualité",        audio: "/audio/english-maths/family_management/b1/installment.mp3"   },
  { slug: "interest_rate", en: "interest rate", fr: "taux d'intérêt",    audio: "/audio/english-maths/family_management/b1/interest_rate.mp3" },
  { slug: "debit",         en: "debit",         fr: "débit",             audio: "/audio/english-maths/family_management/b1/debit.mp3"         },
  { slug: "statement",     en: "statement",     fr: "relevé de compte",  audio: "/audio/english-maths/family_management/b1/statement.mp3"     },
  { slug: "allowance",     en: "allowance",     fr: "allocation",        audio: "/audio/english-maths/family_management/b1/allowance.mp3"     },
  { slug: "pension",       en: "pension",       fr: "retraite",          audio: "/audio/english-maths/family_management/b1/pension.mp3"       },
  { slug: "tax_return",    en: "tax return",    fr: "déclaration d'impôts", audio: "/audio/english-maths/family_management/b1/tax_return.mp3" },
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

export const familyManagementB1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b1_family_management_en_to_fr_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_family_management",
    microId: "en_b1_family_management_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a family or household management term.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["family_management", "b1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_family_management_fr_to_en_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_family_management",
    microId: "en_b1_family_management_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about managing the family finances.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["family_management", "b1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_family_management_listen_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_family_management",
    microId: "en_b1_family_management_listen",
    difficulty: 3 as const,
    text: `Listen and identify the term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["family_management", "b1", "listen"],
  },
]);
