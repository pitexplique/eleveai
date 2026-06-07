import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Géographie - Voyage — Travel & culture B1 ────────────────────────────────
const WORDS = [
  { slug: "heritage",     en: "heritage",     fr: "patrimoine",   audio: "/audio/english-maths/travel_culture/b1/heritage.mp3"     },
  { slug: "tourism",      en: "tourism",      fr: "tourisme",     audio: "/audio/english-maths/travel_culture/b1/tourism.mp3"      },
  { slug: "tradition",    en: "tradition",    fr: "tradition",    audio: "/audio/english-maths/travel_culture/b1/tradition.mp3"    },
  { slug: "diversity",    en: "diversity",    fr: "diversité",    audio: "/audio/english-maths/travel_culture/b1/diversity.mp3"    },
  { slug: "migration",    en: "migration",    fr: "migration",    audio: "/audio/english-maths/travel_culture/b1/migration.mp3"    },
  { slug: "urbanisation", en: "urbanisation", fr: "urbanisation", audio: "/audio/english-maths/travel_culture/b1/urbanisation.mp3" },
  { slug: "exchange",     en: "exchange",     fr: "échange",      audio: "/audio/english-maths/travel_culture/b1/exchange.mp3"     },
  { slug: "custom",       en: "custom",       fr: "coutume",      audio: "/audio/english-maths/travel_culture/b1/custom.mp3"       },
  { slug: "identity",     en: "identity",     fr: "identité",     audio: "/audio/english-maths/travel_culture/b1/identity.mp3"     },
  { slug: "region",       en: "region",       fr: "région",       audio: "/audio/english-maths/travel_culture/b1/region.mp3"       },
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

export const travelCultureB1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b1_travel_culture_en_to_fr_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_travel_culture",
    microId: "en_b1_travel_culture_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a culture or society term.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["travel_culture", "b1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_travel_culture_fr_to_en_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_travel_culture",
    microId: "en_b1_travel_culture_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about cultures, people and travel.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["travel_culture", "b1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_travel_culture_listen_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english-maths" as const,
    notionId: "en_b1_travel_culture",
    microId: "en_b1_travel_culture_listen",
    difficulty: 3 as const,
    text: `Listen and identify the term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["travel_culture", "b1", "listen"],
  },
]);
