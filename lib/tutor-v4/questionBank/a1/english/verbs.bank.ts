import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "add",     en: "add",     fr: "additionner / ajouter", audio: "/audio/english-maths/verbs/a1/add.mp3",     audioSentence: "/audio/english-maths/verbs/a1/add-sentence.mp3" },
  { slug: "count",   en: "count",   fr: "compter",               audio: "/audio/english-maths/verbs/a1/count.mp3",   audioSentence: "/audio/english-maths/verbs/a1/count-sentence.mp3" },
  { slug: "draw",    en: "draw",    fr: "tracer / dessiner",     audio: "/audio/english-maths/verbs/a1/draw.mp3",    audioSentence: "/audio/english-maths/verbs/a1/draw-sentence.mp3" },
  { slug: "compare", en: "compare", fr: "comparer",              audio: "/audio/english-maths/verbs/a1/compare.mp3", audioSentence: "/audio/english-maths/verbs/a1/compare-sentence.mp3" },
  { slug: "measure", en: "measure", fr: "mesurer",               audio: "/audio/english-maths/verbs/a1/measure.mp3", audioSentence: "/audio/english-maths/verbs/a1/measure-sentence.mp3" },
  { slug: "check",   en: "check",   fr: "vérifier",              audio: "/audio/english-maths/verbs/a1/check.mp3",   audioSentence: "/audio/english-maths/verbs/a1/check-sentence.mp3" },
] as const;

function distractorsFr(exclude: string): string[] {
  return WORDS.filter((w) => w.fr !== exclude).map((w) => w.fr).slice(0, 3);
}
function distractorsEn(exclude: string): string[] {
  return WORDS.filter((w) => w.en !== exclude).map((w) => w.en).slice(0, 3);
}

export const verbsA1Bank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `en_a1_verbs_en_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english" as const,
    notionId: "en_a1_verbs",
    microId: "en_a1_verbs_en_to_fr",
    difficulty: 1 as const,
    text: `What does the verb "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's an action you do in maths class.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["verbs", "a1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_verbs_fr_to_en_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english" as const,
    notionId: "en_a1_verbs",
    microId: "en_a1_verbs_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `It starts with "${word.en[0].toUpperCase()}".`,
    explanation: `"${word.fr}" translates to "${word.en}" in English.`,
    tags: ["verbs", "a1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_verbs_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english" as const,
    notionId: "en_a1_verbs",
    microId: "en_a1_verbs_listen",
    difficulty: 2 as const,
    text: `Listen and choose the correct verb.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully to the pronunciation.`,
    explanation: `The verb you heard is "${word.en}" (${word.fr}).`,
    tags: ["verbs", "a1", "listen"],
  },
]);
