import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "subtract",  en: "subtract",  fr: "soustraire",       audio: "/audio/english-maths/verbs/a2/subtract.mp3",  audioSentence: "/audio/english-maths/verbs/a2/subtract-sentence.mp3" },
  { slug: "multiply",  en: "multiply",  fr: "multiplier",       audio: "/audio/english-maths/verbs/a2/multiply.mp3",  audioSentence: "/audio/english-maths/verbs/a2/multiply-sentence.mp3" },
  { slug: "divide",    en: "divide",    fr: "diviser",          audio: "/audio/english-maths/verbs/a2/divide.mp3",    audioSentence: "/audio/english-maths/verbs/a2/divide-sentence.mp3" },
  { slug: "order",     en: "order",     fr: "ordonner / ranger", audio: "/audio/english-maths/verbs/a2/order.mp3",    audioSentence: "/audio/english-maths/verbs/a2/order-sentence.mp3" },
  { slug: "calculate", en: "calculate", fr: "calculer",         audio: "/audio/english-maths/verbs/a2/calculate.mp3", audioSentence: "/audio/english-maths/verbs/a2/calculate-sentence.mp3" },
  { slug: "solve",     en: "solve",     fr: "résoudre",         audio: "/audio/english-maths/verbs/a2/solve.mp3",     audioSentence: "/audio/english-maths/verbs/a2/solve-sentence.mp3" },
] as const;

function distractorsFr(exclude: string): string[] {
  return WORDS.filter((w) => w.fr !== exclude).map((w) => w.fr).slice(0, 3);
}
function distractorsEn(exclude: string): string[] {
  return WORDS.filter((w) => w.en !== exclude).map((w) => w.en).slice(0, 3);
}

export const verbsA2Bank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `en_a2_verbs_en_to_fr_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_verbs",
    microId: "en_a2_verbs_en_to_fr",
    difficulty: 1 as const,
    text: `What does the verb "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's an A2 maths operation verb.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["verbs", "a2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_verbs_fr_to_en_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_verbs",
    microId: "en_a2_verbs_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `It starts with "${word.en[0].toUpperCase()}".`,
    explanation: `"${word.fr}" translates to "${word.en}" in English.`,
    tags: ["verbs", "a2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_verbs_listen_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_verbs",
    microId: "en_a2_verbs_listen",
    difficulty: 2 as const,
    text: `Listen and choose the correct verb.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully to the pronunciation.`,
    explanation: `The verb you heard is "${word.en}" (${word.fr}).`,
    tags: ["verbs", "a2", "listen"],
  },
]);
