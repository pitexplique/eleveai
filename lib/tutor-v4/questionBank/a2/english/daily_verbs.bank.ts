import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Vie quotidienne — Daily verbs A2 ──────────────────────────────────────────
const WORDS = [
  { slug: "eat",   en: "to eat",   fr: "manger",   audio: "/audio/english-maths/daily_verbs/a2/eat.mp3"   },
  { slug: "drink", en: "to drink", fr: "boire",     audio: "/audio/english-maths/daily_verbs/a2/drink.mp3" },
  { slug: "sleep", en: "to sleep", fr: "dormir",    audio: "/audio/english-maths/daily_verbs/a2/sleep.mp3" },
  { slug: "work",  en: "to work",  fr: "travailler",audio: "/audio/english-maths/daily_verbs/a2/work.mp3"  },
  { slug: "play",  en: "to play",  fr: "jouer",     audio: "/audio/english-maths/daily_verbs/a2/play.mp3"  },
  { slug: "read",  en: "to read",  fr: "lire",      audio: "/audio/english-maths/daily_verbs/a2/read.mp3"  },
  { slug: "write", en: "to write", fr: "écrire",    audio: "/audio/english-maths/daily_verbs/a2/write.mp3" },
  { slug: "run",   en: "to run",   fr: "courir",    audio: "/audio/english-maths/daily_verbs/a2/run.mp3"   },
  { slug: "walk",  en: "to walk",  fr: "marcher",   audio: "/audio/english-maths/daily_verbs/a2/walk.mp3"  },
  { slug: "speak", en: "to speak", fr: "parler",    audio: "/audio/english-maths/daily_verbs/a2/speak.mp3" },
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

export const dailyVerbsA2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a2_daily_verbs_en_to_fr_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_daily_verbs",
    microId: "en_a2_daily_verbs_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a common daily verb.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["daily_verbs", "a2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_daily_verbs_fr_to_en_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_daily_verbs",
    microId: "en_a2_daily_verbs_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about everyday actions.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["daily_verbs", "a2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_daily_verbs_listen_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_daily_verbs",
    microId: "en_a2_daily_verbs_listen",
    difficulty: 2 as const,
    text: `Listen and identify the verb.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The verb you heard is "${word.en}" (${word.fr}).`,
    tags: ["daily_verbs", "a2", "listen"],
  },
]);
