import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Vie quotidienne — Adjectives A2 ───────────────────────────────────────────
const WORDS = [
  { slug: "big",   en: "big",   fr: "grand",  audio: "/audio/english-maths/adjectives/a2/big.mp3"   },
  { slug: "small", en: "small", fr: "petit",  audio: "/audio/english-maths/adjectives/a2/small.mp3" },
  { slug: "hot",   en: "hot",   fr: "chaud",  audio: "/audio/english-maths/adjectives/a2/hot.mp3"   },
  { slug: "cold",  en: "cold",  fr: "froid",  audio: "/audio/english-maths/adjectives/a2/cold.mp3"  },
  { slug: "fast",  en: "fast",  fr: "rapide", audio: "/audio/english-maths/adjectives/a2/fast.mp3"  },
  { slug: "slow",  en: "slow",  fr: "lent",   audio: "/audio/english-maths/adjectives/a2/slow.mp3"  },
  { slug: "tall",  en: "tall",  fr: "grand",  audio: "/audio/english-maths/adjectives/a2/tall.mp3"  },
  { slug: "short", en: "short", fr: "court",  audio: "/audio/english-maths/adjectives/a2/short.mp3" },
  { slug: "old",   en: "old",   fr: "vieux",  audio: "/audio/english-maths/adjectives/a2/old.mp3"   },
  { slug: "young", en: "young", fr: "jeune",  audio: "/audio/english-maths/adjectives/a2/young.mp3" },
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

export const adjectivesA2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a2_adjectives_en_to_fr_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_adjectives",
    microId: "en_a2_adjectives_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a describing word (adjective).`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["adjectives", "a2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_adjectives_fr_to_en_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_adjectives",
    microId: "en_a2_adjectives_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about describing words.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["adjectives", "a2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_adjectives_listen_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_adjectives",
    microId: "en_a2_adjectives_listen",
    difficulty: 2 as const,
    text: `Listen and identify the adjective.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The adjective you heard is "${word.en}" (${word.fr}).`,
    tags: ["adjectives", "a2", "listen"],
  },
]);
