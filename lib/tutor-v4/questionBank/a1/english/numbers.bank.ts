import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "number",   en: "number",   fr: "nombre",  audio: "/audio/english-maths/numbers/number.mp3",   audioSentence: "/audio/english-maths/numbers/number-sentence.mp3" },
  { slug: "ten",      en: "ten",      fr: "dix",     audio: "/audio/english-maths/numbers/ten.mp3",      audioSentence: "/audio/english-maths/numbers/ten-sentence.mp3" },
  { slug: "hundred",  en: "hundred",  fr: "cent",    audio: "/audio/english-maths/numbers/hundred.mp3",  audioSentence: "/audio/english-maths/numbers/hundred-sentence.mp3" },
  { slug: "thousand", en: "thousand", fr: "mille",   audio: "/audio/english-maths/numbers/thousand.mp3", audioSentence: "/audio/english-maths/numbers/thousand-sentence.mp3" },
  { slug: "half",     en: "half",     fr: "moitié",  audio: "/audio/english-maths/numbers/half.mp3",     audioSentence: "/audio/english-maths/numbers/half-sentence.mp3" },
] as const;

function distractorsFr(exclude: string): string[] {
  return WORDS.filter((w) => w.fr !== exclude).map((w) => w.fr).slice(0, 3);
}
function distractorsEn(exclude: string): string[] {
  return WORDS.filter((w) => w.en !== exclude).map((w) => w.en).slice(0, 3);
}

export const numbersA1Bank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `en_a1_numbers_en_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english" as const,
    notionId: "en_a1_numbers",
    microId: "en_a1_numbers_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `Think about numbers in maths class.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["numbers", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_numbers_fr_to_en_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english" as const,
    notionId: "en_a1_numbers",
    microId: "en_a1_numbers_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `It starts with the letter "${word.en[0].toUpperCase()}".`,
    explanation: `"${word.fr}" translates to "${word.en}" in English.`,
    tags: ["numbers", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_numbers_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english" as const,
    notionId: "en_a1_numbers",
    microId: "en_a1_numbers_listen",
    difficulty: 2 as const,
    text: `Listen and choose the correct word.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully to the pronunciation.`,
    explanation: `The word you heard is "${word.en}" (${word.fr}).`,
    tags: ["numbers", "listen"],
  },
]);
