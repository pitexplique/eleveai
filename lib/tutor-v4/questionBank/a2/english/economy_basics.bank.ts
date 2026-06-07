import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Économie - Gestion — Economy basics A2 ───────────────────────────────────
const WORDS = [
  { slug: "profit",   en: "profit",   fr: "bénéfice",  audio: "/audio/english-maths/economy_basics/a2/profit.mp3"   },
  { slug: "loss",     en: "loss",     fr: "perte",     audio: "/audio/english-maths/economy_basics/a2/loss.mp3"     },
  { slug: "tax",      en: "tax",      fr: "impôt",     audio: "/audio/english-maths/economy_basics/a2/tax.mp3"      },
  { slug: "discount", en: "discount", fr: "remise",    audio: "/audio/english-maths/economy_basics/a2/discount.mp3" },
  { slug: "interest", en: "interest", fr: "intérêt",   audio: "/audio/english-maths/economy_basics/a2/interest.mp3" },
  { slug: "salary",   en: "salary",   fr: "salaire",   audio: "/audio/english-maths/economy_basics/a2/salary.mp3"   },
  { slug: "invoice",  en: "invoice",  fr: "facture",   audio: "/audio/english-maths/economy_basics/a2/invoice.mp3"  },
  { slug: "deposit",  en: "deposit",  fr: "dépôt",     audio: "/audio/english-maths/economy_basics/a2/deposit.mp3"  },
  { slug: "refund",   en: "refund",   fr: "remboursement", audio: "/audio/english-maths/economy_basics/a2/refund.mp3" },
  { slug: "fee",      en: "fee",      fr: "frais",     audio: "/audio/english-maths/economy_basics/a2/fee.mp3"      },
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

export const economyBasicsA2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a2_economy_basics_en_to_fr_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_economy_basics",
    microId: "en_a2_economy_basics_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's an economy or business term.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["economy_basics", "a2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_economy_basics_fr_to_en_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_economy_basics",
    microId: "en_a2_economy_basics_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about profits, taxes and transactions.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["economy_basics", "a2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_economy_basics_listen_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_economy_basics",
    microId: "en_a2_economy_basics_listen",
    difficulty: 3 as const,
    text: `Listen and identify the economy term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["economy_basics", "a2", "listen"],
  },
]);
