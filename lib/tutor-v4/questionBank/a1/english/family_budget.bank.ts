import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Économie - Gestion — Family budget A1 ────────────────────────────────────
const WORDS = [
  { slug: "rent",      en: "rent",      fr: "loyer",     audio: "/audio/english-maths/family_budget/a1/rent.mp3"      },
  { slug: "food",      en: "food",      fr: "nourriture",audio: "/audio/english-maths/family_budget/a1/food.mp3"      },
  { slug: "bill",      en: "bill",      fr: "facture",   audio: "/audio/english-maths/family_budget/a1/bill.mp3"      },
  { slug: "save",      en: "save",      fr: "épargner",  audio: "/audio/english-maths/family_budget/a1/save.mp3"      },
  { slug: "spend",     en: "spend",     fr: "dépenser",  audio: "/audio/english-maths/family_budget/a1/spend.mp3"     },
  { slug: "budget",    en: "budget",    fr: "budget",    audio: "/audio/english-maths/family_budget/a1/budget.mp3"    },
  { slug: "income",    en: "income",    fr: "revenu",    audio: "/audio/english-maths/family_budget/a1/income.mp3"    },
  { slug: "cost",      en: "cost",      fr: "coût",      audio: "/audio/english-maths/family_budget/a1/cost.mp3"      },
  { slug: "free",      en: "free",      fr: "gratuit",   audio: "/audio/english-maths/family_budget/a1/free.mp3"      },
  { slug: "expensive", en: "expensive", fr: "cher",      audio: "/audio/english-maths/family_budget/a1/expensive.mp3" },
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

export const familyBudgetA1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a1_family_budget_en_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_family_budget",
    microId: "en_a1_family_budget_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a family budget word.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["family_budget", "a1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_family_budget_fr_to_en_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_family_budget",
    microId: "en_a1_family_budget_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about managing money at home.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["family_budget", "a1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_family_budget_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_family_budget",
    microId: "en_a1_family_budget_listen",
    difficulty: 2 as const,
    text: `Listen and identify the word.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The word you heard is "${word.en}" (${word.fr}).`,
    tags: ["family_budget", "a1", "listen"],
  },
]);
