import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Économie - Gestion — Economy B1 ──────────────────────────────────────────
const WORDS = [
  { slug: "inflation",    en: "inflation",    fr: "inflation",    audio: "/audio/english-maths/economy/b1/inflation.mp3"    },
  { slug: "recession",    en: "recession",    fr: "récession",    audio: "/audio/english-maths/economy/b1/recession.mp3"    },
  { slug: "gdp",          en: "GDP",          fr: "PIB",          audio: "/audio/english-maths/economy/b1/gdp.mp3"          },
  { slug: "unemployment", en: "unemployment", fr: "chômage",      audio: "/audio/english-maths/economy/b1/unemployment.mp3" },
  { slug: "export",       en: "export",       fr: "exportation",  audio: "/audio/english-maths/economy/b1/export.mp3"       },
  { slug: "import",       en: "import",       fr: "importation",  audio: "/audio/english-maths/economy/b1/import.mp3"       },
  { slug: "market",       en: "market",       fr: "marché",       audio: "/audio/english-maths/economy/b1/market.mp3"       },
  { slug: "demand",       en: "demand",       fr: "demande",      audio: "/audio/english-maths/economy/b1/demand.mp3"       },
  { slug: "supply",       en: "supply",       fr: "offre",        audio: "/audio/english-maths/economy/b1/supply.mp3"       },
  { slug: "growth",       en: "growth",       fr: "croissance",   audio: "/audio/english-maths/economy/b1/growth.mp3"       },
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

export const economyB1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b1_economy_en_to_fr_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_economy",
    microId: "en_b1_economy_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a macroeconomics term.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["economy", "b1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_economy_fr_to_en_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_economy",
    microId: "en_b1_economy_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about national economy and trade.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["economy", "b1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_economy_listen_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_economy",
    microId: "en_b1_economy_listen",
    difficulty: 3 as const,
    text: `Listen and identify the economy term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["economy", "b1", "listen"],
  },
]);
