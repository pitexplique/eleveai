import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Économie - Gestion — Percentages & rates A2 ───────────────────────────────
const WORDS = [
  { slug: "percentage", en: "percentage", fr: "pourcentage",  audio: "/audio/english-maths/percentages_eco/a2/percentage.mp3" },
  { slug: "increase",   en: "increase",   fr: "augmentation", audio: "/audio/english-maths/percentages_eco/a2/increase.mp3"   },
  { slug: "decrease",   en: "decrease",   fr: "diminution",   audio: "/audio/english-maths/percentages_eco/a2/decrease.mp3"   },
  { slug: "reduction",  en: "reduction",  fr: "réduction",    audio: "/audio/english-maths/percentages_eco/a2/reduction.mp3"  },
  { slug: "rate",       en: "rate",       fr: "taux",         audio: "/audio/english-maths/percentages_eco/a2/rate.mp3"       },
  { slug: "net",        en: "net",        fr: "net",          audio: "/audio/english-maths/percentages_eco/a2/net.mp3"        },
  { slug: "gross",      en: "gross",      fr: "brut",         audio: "/audio/english-maths/percentages_eco/a2/gross.mp3"      },
  { slug: "total",      en: "total",      fr: "total",        audio: "/audio/english-maths/percentages_eco/a2/total.mp3"      },
  { slug: "vat",        en: "VAT",        fr: "TVA",          audio: "/audio/english-maths/percentages_eco/a2/vat.mp3"        },
  { slug: "balance",    en: "balance",    fr: "solde",        audio: "/audio/english-maths/percentages_eco/a2/balance.mp3"    },
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

export const percentagesEcoA2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a2_percentages_eco_en_to_fr_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_percentages_eco",
    microId: "en_a2_percentages_eco_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a percentage or rate term in economics.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["percentages_eco", "a2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_percentages_eco_fr_to_en_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_percentages_eco",
    microId: "en_a2_percentages_eco_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about rates, percentages and amounts.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["percentages_eco", "a2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_percentages_eco_listen_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_percentages_eco",
    microId: "en_a2_percentages_eco_listen",
    difficulty: 3 as const,
    text: `Listen and identify the term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["percentages_eco", "a2", "listen"],
  },
]);
