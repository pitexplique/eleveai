import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "twenty",   en: "twenty",   fr: "vingt",     audio: "/audio/english-maths/numbers/twenty.mp3" },
  { slug: "thirty",   en: "thirty",   fr: "trente",    audio: "/audio/english-maths/numbers/thirty.mp3" },
  { slug: "forty",    en: "forty",    fr: "quarante",  audio: "/audio/english-maths/numbers/forty.mp3" },
  { slug: "fifty",    en: "fifty",    fr: "cinquante", audio: "/audio/english-maths/numbers/fifty.mp3" },
  { slug: "hundred",  en: "hundred",  fr: "cent",      audio: "/audio/english-maths/numbers/hundred.mp3" },
  { slug: "thousand", en: "thousand", fr: "mille",     audio: "/audio/english-maths/numbers/thousand.mp3" },
  { slug: "million",  en: "million",  fr: "million",   audio: "/audio/english-maths/numbers/million.mp3" },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEn(exclude: string) { return WORDS.filter(w => w.en !== exclude).map(w => w.en).slice(0, 3); }

export const numbersA1Bank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `en_a1_numbers_en_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_numbers",
    microId: "en_a1_numbers_en_to_fr",
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
    id: `en_a1_numbers_fr_to_en_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_numbers",
    microId: "en_a1_numbers_fr_to_en",
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
    id: `en_a1_numbers_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_numbers",
    microId: "en_a1_numbers_listen",
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
