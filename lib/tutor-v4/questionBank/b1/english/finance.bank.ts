import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Économie - Gestion — Finance B1 ──────────────────────────────────────────
const WORDS = [
  { slug: "investment",    en: "investment",    fr: "investissement",  audio: "/audio/english-maths/finance/b1/investment.mp3"    },
  { slug: "dividend",      en: "dividend",      fr: "dividende",       audio: "/audio/english-maths/finance/b1/dividend.mp3"      },
  { slug: "capital",       en: "capital",       fr: "capital",         audio: "/audio/english-maths/finance/b1/capital.mp3"       },
  { slug: "asset",         en: "asset",         fr: "actif",           audio: "/audio/english-maths/finance/b1/asset.mp3"         },
  { slug: "revenue",       en: "revenue",       fr: "chiffre d'affaires", audio: "/audio/english-maths/finance/b1/revenue.mp3"   },
  { slug: "margin",        en: "margin",        fr: "marge",           audio: "/audio/english-maths/finance/b1/margin.mp3"        },
  { slug: "balance_sheet", en: "balance sheet", fr: "bilan",           audio: "/audio/english-maths/finance/b1/balance_sheet.mp3" },
  { slug: "liability",     en: "liability",     fr: "passif",          audio: "/audio/english-maths/finance/b1/liability.mp3"     },
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

export const financeB1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b1_finance_en_to_fr_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_finance",
    microId: "en_b1_finance_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a business finance or accounting term.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["finance", "b1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_finance_fr_to_en_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_finance",
    microId: "en_b1_finance_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about company accounts and investments.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["finance", "b1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_finance_listen_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_finance",
    microId: "en_b1_finance_listen",
    difficulty: 3 as const,
    text: `Listen and identify the finance term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["finance", "b1", "listen"],
  },
]);
