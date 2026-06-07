import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Économie - Gestion — Family finance A2 ────────────────────────────────────
const WORDS = [
  { slug: "savings",      en: "savings",      fr: "épargne",       audio: "/audio/english-maths/family_finance/a2/savings.mp3"      },
  { slug: "expense",      en: "expense",      fr: "dépense",       audio: "/audio/english-maths/family_finance/a2/expense.mp3"      },
  { slug: "insurance",    en: "insurance",    fr: "assurance",     audio: "/audio/english-maths/family_finance/a2/insurance.mp3"    },
  { slug: "loan",         en: "loan",         fr: "prêt",          audio: "/audio/english-maths/family_finance/a2/loan.mp3"         },
  { slug: "subscription", en: "subscription", fr: "abonnement",    audio: "/audio/english-maths/family_finance/a2/subscription.mp3" },
  { slug: "mortgage",     en: "mortgage",     fr: "prêt immobilier",audio: "/audio/english-maths/family_finance/a2/mortgage.mp3"    },
  { slug: "utility",      en: "utility bill", fr: "facture d'énergie", audio: "/audio/english-maths/family_finance/a2/utility.mp3"  },
  { slug: "credit",       en: "credit",       fr: "crédit",        audio: "/audio/english-maths/family_finance/a2/credit.mp3"       },
  { slug: "account",      en: "account",      fr: "compte",        audio: "/audio/english-maths/family_finance/a2/account.mp3"      },
  { slug: "transfer",     en: "transfer",     fr: "virement",      audio: "/audio/english-maths/family_finance/a2/transfer.mp3"     },
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

export const familyFinanceA2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a2_family_finance_en_to_fr_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_family_finance",
    microId: "en_a2_family_finance_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a family finance or household management term.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["family_finance", "a2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_family_finance_fr_to_en_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_family_finance",
    microId: "en_a2_family_finance_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about managing the family budget.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["family_finance", "a2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_family_finance_listen_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_family_finance",
    microId: "en_a2_family_finance_listen",
    difficulty: 3 as const,
    text: `Listen and identify the finance term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["family_finance", "a2", "listen"],
  },
]);
