import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Économie - Gestion — Macroeconomics B2 ───────────────────────────────────
const WORDS = [
  { slug: "monetary_policy", en: "monetary policy", fr: "politique monétaire",  audio: "/audio/english-maths/macroeconomics/b2/monetary_policy.mp3" },
  { slug: "fiscal_policy",   en: "fiscal policy",   fr: "politique budgétaire", audio: "/audio/english-maths/macroeconomics/b2/fiscal_policy.mp3"   },
  { slug: "deficit",         en: "deficit",         fr: "déficit",              audio: "/audio/english-maths/macroeconomics/b2/deficit.mp3"          },
  { slug: "surplus",         en: "surplus",         fr: "excédent",             audio: "/audio/english-maths/macroeconomics/b2/surplus.mp3"          },
  { slug: "trade_balance",   en: "trade balance",   fr: "balance commerciale",  audio: "/audio/english-maths/macroeconomics/b2/trade_balance.mp3"    },
  { slug: "exchange_rate",   en: "exchange rate",   fr: "taux de change",       audio: "/audio/english-maths/macroeconomics/b2/exchange_rate.mp3"    },
  { slug: "depreciation",    en: "depreciation",    fr: "dépréciation",         audio: "/audio/english-maths/macroeconomics/b2/depreciation.mp3"     },
  { slug: "appreciation",    en: "appreciation",    fr: "appréciation",         audio: "/audio/english-maths/macroeconomics/b2/appreciation.mp3"     },
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

export const macroeconomicsB2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b2_macroeconomics_en_to_fr_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_macroeconomics",
    microId: "en_b2_macroeconomics_en_to_fr",
    difficulty: 3 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a macroeconomics concept.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["macroeconomics", "b2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_macroeconomics_fr_to_en_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_macroeconomics",
    microId: "en_b2_macroeconomics_fr_to_en",
    difficulty: 4 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about national economic policies.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["macroeconomics", "b2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_macroeconomics_listen_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_macroeconomics",
    microId: "en_b2_macroeconomics_listen",
    difficulty: 4 as const,
    text: `Listen and identify the macroeconomics term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["macroeconomics", "b2", "listen"],
  },
]);
