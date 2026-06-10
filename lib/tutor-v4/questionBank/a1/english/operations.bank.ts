import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "plus",       en: "plus",       fr: "plus",       audio: "/audio/english-maths/operations/a1/plus.mp3" },
  { slug: "minus",      en: "minus",      fr: "moins",      audio: "/audio/english-maths/operations/a1/minus.mp3" },
  { slug: "times",      en: "times",      fr: "fois",       audio: "/audio/english-maths/operations/a1/times.mp3" },
  { slug: "divided-by", en: "divided by", fr: "divisé par", audio: "/audio/english-maths/operations/a1/divided-by.mp3" },
  { slug: "equals",     en: "equals",     fr: "égale",      audio: "/audio/english-maths/operations/a1/equals.mp3" },
  { slug: "result",     en: "result",     fr: "résultat",   audio: "/audio/english-maths/operations/a1/result.mp3" },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEn(exclude: string) { return WORDS.filter(w => w.en !== exclude).map(w => w.en).slice(0, 3); }

export const operationsA1Bank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `en_a1_operations_en_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_operations",
    microId: "en_a1_operations_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...dFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `Think about the meaning.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
  },
  {
    kind: "fixed" as const,
    id: `en_a1_operations_fr_to_en_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_operations",
    microId: "en_a1_operations_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...dEn(word.en)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `It starts with "${word.en[0].toUpperCase()}".`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
  },
  {
    kind: "fixed" as const,
    id: `en_a1_operations_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_operations",
    microId: "en_a1_operations_listen",
    difficulty: 2 as const,
    text: `Listen and choose the correct word.`,
    format: "qcm" as const,
    choices: [word.en, ...dEn(word.en)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The word you heard is "${word.en}" (${word.fr}).`,
  },
]);
