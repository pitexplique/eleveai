import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "plus",         en: "plus",         fr: "plus",            audio: "/audio/english-maths/operations/plus.mp3",         audioSentence: "/audio/english-maths/operations/plus-sentence.mp3" },
  { slug: "minus",        en: "minus",        fr: "moins",           audio: "/audio/english-maths/operations/minus.mp3",        audioSentence: "/audio/english-maths/operations/minus-sentence.mp3" },
  { slug: "equal",        en: "equal",        fr: "égal",            audio: "/audio/english-maths/operations/equal.mp3",        audioSentence: "/audio/english-maths/operations/equal-sentence.mp3" },
  { slug: "greater-than", en: "greater than", fr: "plus grand que",  audio: "/audio/english-maths/operations/greater-than.mp3", audioSentence: "/audio/english-maths/operations/greater-than-sentence.mp3" },
  { slug: "less-than",    en: "less than",    fr: "plus petit que",  audio: "/audio/english-maths/operations/less-than.mp3",    audioSentence: "/audio/english-maths/operations/less-than-sentence.mp3" },
] as const;

function distractorsFr(exclude: string): string[] {
  return WORDS.filter((w) => w.fr !== exclude).map((w) => w.fr).slice(0, 3);
}
function distractorsEn(exclude: string): string[] {
  return WORDS.filter((w) => w.en !== exclude).map((w) => w.en).slice(0, 3);
}

export const operationsA1Bank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `en_a1_operations_en_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english" as const,
    notionId: "en_a1_operations",
    microId: "en_a1_operations_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a maths operation symbol.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["operations", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_operations_fr_to_en_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english" as const,
    notionId: "en_a1_operations",
    microId: "en_a1_operations_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about the maths symbol it represents.`,
    explanation: `"${word.fr}" translates to "${word.en}" in English.`,
    tags: ["operations", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_operations_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english" as const,
    notionId: "en_a1_operations",
    microId: "en_a1_operations_listen",
    difficulty: 2 as const,
    text: `Listen and choose the correct word.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully to the pronunciation.`,
    explanation: `The word you heard is "${word.en}" (${word.fr}).`,
    tags: ["operations", "listen"],
  },
]);
