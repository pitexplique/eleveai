import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "twenty",   en: "twenty",   fr: "vingt",     audio: "/audio/english-maths/numbers/a1/twenty.mp3" },
  { slug: "thirty",   en: "thirty",   fr: "trente",    audio: "/audio/english-maths/numbers/a1/thirty.mp3" },
  { slug: "forty",    en: "forty",    fr: "quarante",  audio: "/audio/english-maths/numbers/a1/forty.mp3" },
  { slug: "fifty",    en: "fifty",    fr: "cinquante", audio: "/audio/english-maths/numbers/a1/fifty.mp3" },
  { slug: "hundred",  en: "hundred",  fr: "cent",      audio: "/audio/english-maths/numbers/a1/hundred.mp3" },
  { slug: "thousand", en: "thousand", fr: "mille",     audio: "/audio/english-maths/numbers/a1/thousand.mp3" },
  { slug: "million",  en: "million",  fr: "million",   audio: "/audio/english-maths/numbers/a1/million.mp3" },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEn(exclude: string) { return WORDS.filter(w => w.en !== exclude).map(w => w.en).slice(0, 3); }

// Masque les lettres du milieu pour l'exercice d'orthographe (cf. colors.bank).
function maskWord(w: string): string {
  if (w.length <= 2) return w.split("").join(" ");
  const middle = "_ ".repeat(w.length - 2).trim();
  return `${w[0]} ${middle} ${w[w.length - 1]}`;
}

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
  // Orthographe (saisie libre) — densifie sans nouvel audio (Option B).
  // fr → en : produire le mot anglais.
  {
    kind: "fixed" as const,
    id: `en_a1_numbers_spell_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_numbers",
    microId: "en_a1_numbers_fr_to_en",
    difficulty: 2 as const,
    text: `Écris en anglais le mot pour « ${word.fr} ». Indice : ${maskWord(word.en)}`,
    format: "short" as const,
    expected: [word.en],
    comparator: "exact_text" as const,
    hint: `${word.en.length} lettres. Commence par « ${word.en[0]} ».`,
    explanation: `« ${word.fr} » s'écrit "${word.en}" en anglais.`,
  },
  // en → fr : produire le mot français (numbers sans accent → exact_text OK).
  {
    kind: "fixed" as const,
    id: `en_a1_numbers_spellfr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_numbers",
    microId: "en_a1_numbers_en_to_fr",
    difficulty: 1 as const,
    text: `Écris en français le mot pour "${word.en}". Indice : ${maskWord(word.fr)}`,
    format: "short" as const,
    expected: [word.fr],
    comparator: "exact_text" as const,
    hint: `${word.fr.length} lettres. Commence par « ${word.fr[0]} ».`,
    explanation: `"${word.en}" se dit « ${word.fr} » en français.`,
  },
]);
