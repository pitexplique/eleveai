import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "add",       en: "add",       fr: "additionner", audio: "/audio/english-maths/verbs/a1/add.mp3" },
  { slug: "subtract",  en: "subtract",  fr: "soustraire",  audio: "/audio/english-maths/verbs/a1/subtract.mp3" },
  { slug: "count",     en: "count",     fr: "compter",     audio: "/audio/english-maths/verbs/a1/count.mp3" },
  { slug: "measure",   en: "measure",   fr: "mesurer",     audio: "/audio/english-maths/verbs/a1/measure.mp3" },
  { slug: "draw",      en: "draw",      fr: "tracer",      audio: "/audio/english-maths/verbs/a1/draw.mp3" },
  { slug: "calculate", en: "calculate", fr: "calculer",    audio: "/audio/english-maths/verbs/a1/calculate.mp3" },
  { slug: "find",      en: "find",      fr: "trouver",     audio: "/audio/english-maths/verbs/a1/find.mp3" },
  { slug: "write",     en: "write",     fr: "écrire",      audio: "/audio/english-maths/verbs/a1/write.mp3" },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEn(exclude: string) { return WORDS.filter(w => w.en !== exclude).map(w => w.en).slice(0, 3); }

export const verbsA1Bank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `en_a1_verbs_en_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_verbs",
    microId: "en_a1_verbs_en_to_fr",
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
    id: `en_a1_verbs_fr_to_en_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_verbs",
    microId: "en_a1_verbs_fr_to_en",
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
    id: `en_a1_verbs_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_verbs",
    microId: "en_a1_verbs_listen",
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
