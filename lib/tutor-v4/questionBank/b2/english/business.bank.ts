import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Économie - Gestion — Business B2 ─────────────────────────────────────────
const WORDS = [
  { slug: "shareholder",    en: "shareholder",    fr: "actionnaire",      audio: "/audio/english-maths/business/b2/shareholder.mp3"    },
  { slug: "equity",         en: "equity",         fr: "fonds propres",    audio: "/audio/english-maths/business/b2/equity.mp3"         },
  { slug: "portfolio",      en: "portfolio",      fr: "portefeuille",     audio: "/audio/english-maths/business/b2/portfolio.mp3"      },
  { slug: "liquidity",      en: "liquidity",      fr: "liquidité",        audio: "/audio/english-maths/business/b2/liquidity.mp3"      },
  { slug: "hedge",          en: "hedge",          fr: "couverture",       audio: "/audio/english-maths/business/b2/hedge.mp3"          },
  { slug: "derivative",     en: "derivative",     fr: "produit dérivé",   audio: "/audio/english-maths/business/b2/derivative.mp3"     },
  { slug: "bond",           en: "bond",           fr: "obligation",       audio: "/audio/english-maths/business/b2/bond.mp3"           },
  { slug: "yield",          en: "yield",          fr: "rendement",        audio: "/audio/english-maths/business/b2/yield.mp3"          },
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

export const businessB2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b2_business_en_to_fr_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_business",
    microId: "en_b2_business_en_to_fr",
    difficulty: 3 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's an advanced business or financial markets term.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["business", "b2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_business_fr_to_en_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_business",
    microId: "en_b2_business_fr_to_en",
    difficulty: 4 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about financial markets and investment.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["business", "b2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_business_listen_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_business",
    microId: "en_b2_business_listen",
    difficulty: 4 as const,
    text: `Listen and identify the business term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["business", "b2", "listen"],
  },
]);
