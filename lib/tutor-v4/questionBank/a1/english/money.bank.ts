import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Économie - Gestion — Money A1 ─────────────────────────────────────────────
const WORDS = [
  { slug: "euro",    en: "euro",    fr: "euro",     audio: "/audio/english-maths/money/a1/euro.mp3"    },
  { slug: "cent",    en: "cent",    fr: "centime",  audio: "/audio/english-maths/money/a1/cent.mp3"    },
  { slug: "price",   en: "price",   fr: "prix",     audio: "/audio/english-maths/money/a1/price.mp3"   },
  { slug: "coin",    en: "coin",    fr: "pièce",    audio: "/audio/english-maths/money/a1/coin.mp3"    },
  { slug: "note",    en: "note",    fr: "billet",   audio: "/audio/english-maths/money/a1/note.mp3"    },
  { slug: "buy",     en: "buy",     fr: "acheter",  audio: "/audio/english-maths/money/a1/buy.mp3"     },
  { slug: "sell",    en: "sell",    fr: "vendre",   audio: "/audio/english-maths/money/a1/sell.mp3"    },
  { slug: "pay",     en: "pay",     fr: "payer",    audio: "/audio/english-maths/money/a1/pay.mp3"     },
  { slug: "change",  en: "change",  fr: "monnaie",  audio: "/audio/english-maths/money/a1/change.mp3"  },
  { slug: "receipt", en: "receipt", fr: "reçu",     audio: "/audio/english-maths/money/a1/receipt.mp3" },
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

export const moneyA1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a1_money_en_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_money",
    microId: "en_a1_money_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a word about money and shopping.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["money", "a1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_money_fr_to_en_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_money",
    microId: "en_a1_money_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about money and everyday transactions.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["money", "a1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_money_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_money",
    microId: "en_a1_money_listen",
    difficulty: 2 as const,
    text: `Listen and identify the word.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The word you heard is "${word.en}" (${word.fr}).`,
    tags: ["money", "a1", "listen"],
  },
]);
