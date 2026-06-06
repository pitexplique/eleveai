import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "estimate",  en: "estimate",  fr: "estimer",       audio: "/audio/english-maths/verbs/b1/estimate.mp3",  audioSentence: "/audio/english-maths/verbs/b1/estimate-sentence.mp3" },
  { slug: "explain",   en: "explain",   fr: "expliquer",     audio: "/audio/english-maths/verbs/b1/explain.mp3",   audioSentence: "/audio/english-maths/verbs/b1/explain-sentence.mp3" },
  { slug: "justify",   en: "justify",   fr: "justifier",     audio: "/audio/english-maths/verbs/b1/justify.mp3",   audioSentence: "/audio/english-maths/verbs/b1/justify-sentence.mp3" },
  { slug: "simplify",  en: "simplify",  fr: "simplifier",    audio: "/audio/english-maths/verbs/b1/simplify.mp3",  audioSentence: "/audio/english-maths/verbs/b1/simplify-sentence.mp3" },
  { slug: "convert",   en: "convert",   fr: "convertir",     audio: "/audio/english-maths/verbs/b1/convert.mp3",   audioSentence: "/audio/english-maths/verbs/b1/convert-sentence.mp3" },
  { slug: "represent", en: "represent", fr: "représenter",   audio: "/audio/english-maths/verbs/b1/represent.mp3", audioSentence: "/audio/english-maths/verbs/b1/represent-sentence.mp3" },
] as const;

function distractorsFr(exclude: string): string[] {
  return WORDS.filter((w) => w.fr !== exclude).map((w) => w.fr).slice(0, 3);
}
function distractorsEn(exclude: string): string[] {
  return WORDS.filter((w) => w.en !== exclude).map((w) => w.en).slice(0, 3);
}

export const verbsB1Bank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `en_b1_verbs_en_to_fr_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english" as const,
    notionId: "en_b1_verbs",
    microId: "en_b1_verbs_en_to_fr",
    difficulty: 2 as const,
    text: `What does the verb "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a reasoning/method verb used in maths.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["verbs", "b1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_verbs_fr_to_en_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english" as const,
    notionId: "en_b1_verbs",
    microId: "en_b1_verbs_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `It starts with "${word.en[0].toUpperCase()}".`,
    explanation: `"${word.fr}" translates to "${word.en}" in English.`,
    tags: ["verbs", "b1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b1_verbs_listen_${word.slug}`,
    niveau: "b1" as const,
    matiere: "english" as const,
    notionId: "en_b1_verbs",
    microId: "en_b1_verbs_listen",
    difficulty: 3 as const,
    text: `Listen and choose the correct verb.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully to the pronunciation.`,
    explanation: `The verb you heard is "${word.en}" (${word.fr}).`,
    tags: ["verbs", "b1", "listen"],
  },
]);
