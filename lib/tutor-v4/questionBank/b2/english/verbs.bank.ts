import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "prove",       en: "prove",       fr: "démontrer / prouver", audio: "/audio/english-maths/verbs/b2/prove.mp3",       audioSentence: "/audio/english-maths/verbs/b2/prove-sentence.mp3" },
  { slug: "interpret",   en: "interpret",   fr: "interpréter",         audio: "/audio/english-maths/verbs/b2/interpret.mp3",   audioSentence: "/audio/english-maths/verbs/b2/interpret-sentence.mp3" },
  { slug: "model",       en: "model",       fr: "modéliser",           audio: "/audio/english-maths/verbs/b2/model.mp3",       audioSentence: "/audio/english-maths/verbs/b2/model-sentence.mp3" },
  { slug: "evaluate",    en: "evaluate",    fr: "évaluer",             audio: "/audio/english-maths/verbs/b2/evaluate.mp3",    audioSentence: "/audio/english-maths/verbs/b2/evaluate-sentence.mp3" },
  { slug: "approximate", en: "approximate", fr: "approximer",          audio: "/audio/english-maths/verbs/b2/approximate.mp3", audioSentence: "/audio/english-maths/verbs/b2/approximate-sentence.mp3" },
  { slug: "derive",      en: "derive",      fr: "dériver / déduire",   audio: "/audio/english-maths/verbs/b2/derive.mp3",      audioSentence: "/audio/english-maths/verbs/b2/derive-sentence.mp3" },
] as const;

function distractorsFr(exclude: string): string[] {
  return WORDS.filter((w) => w.fr !== exclude).map((w) => w.fr).slice(0, 3);
}
function distractorsEn(exclude: string): string[] {
  return WORDS.filter((w) => w.en !== exclude).map((w) => w.en).slice(0, 3);
}

export const verbsB2Bank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `en_b2_verbs_en_to_fr_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_verbs",
    microId: "en_b2_verbs_en_to_fr",
    difficulty: 3 as const,
    text: `What does the verb "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's an academic maths verb.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["verbs", "b2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_verbs_fr_to_en_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_verbs",
    microId: "en_b2_verbs_fr_to_en",
    difficulty: 4 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `It starts with "${word.en[0].toUpperCase()}".`,
    explanation: `"${word.fr}" translates to "${word.en}" in English.`,
    tags: ["verbs", "b2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_verbs_listen_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_verbs",
    microId: "en_b2_verbs_listen",
    difficulty: 4 as const,
    text: `Listen and choose the correct verb.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully to the pronunciation.`,
    explanation: `The verb you heard is "${word.en}" (${word.fr}).`,
    tags: ["verbs", "b2", "listen"],
  },
]);
