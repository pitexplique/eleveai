import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Vie quotidienne — Body A1 ─────────────────────────────────────────────────
const WORDS = [
  { slug: "head",  en: "head",  fr: "tête",  audio: "/audio/english-maths/body/a1/head.mp3"  },
  { slug: "eye",   en: "eye",   fr: "œil",   audio: "/audio/english-maths/body/a1/eye.mp3"   },
  { slug: "ear",   en: "ear",   fr: "oreille",audio: "/audio/english-maths/body/a1/ear.mp3"  },
  { slug: "mouth", en: "mouth", fr: "bouche", audio: "/audio/english-maths/body/a1/mouth.mp3" },
  { slug: "nose",  en: "nose",  fr: "nez",   audio: "/audio/english-maths/body/a1/nose.mp3"  },
  { slug: "hand",  en: "hand",  fr: "main",  audio: "/audio/english-maths/body/a1/hand.mp3"  },
  { slug: "arm",   en: "arm",   fr: "bras",  audio: "/audio/english-maths/body/a1/arm.mp3"   },
  { slug: "leg",   en: "leg",   fr: "jambe", audio: "/audio/english-maths/body/a1/leg.mp3"   },
  { slug: "foot",  en: "foot",  fr: "pied",  audio: "/audio/english-maths/body/a1/foot.mp3"  },
  { slug: "back",  en: "back",  fr: "dos",   audio: "/audio/english-maths/body/a1/back.mp3"  },
] as const;

function distractorsFr(exclude: string, seed: number): string[] {
  const pool = WORDS.filter((w) => w.fr !== exclude).map((w) => w.fr);
  const start = seed % pool.length;
  return [...pool.slice(start), ...pool.slice(0, start)].slice(0, 3);
}
function distractorsEn(exclude: string, seed: number): string[] {
  const pool = WORDS.filter((w) => w.en !== exclude).map((w) => w.en);
  const start = seed % pool.length;
  return [...pool.slice(start), ...pool.slice(0, start)].slice(0, 3);
}

export const bodyA1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a1_body_en_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_body",
    microId: "en_a1_body_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a part of the body.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["body", "a1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_body_fr_to_en_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_body",
    microId: "en_a1_body_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about parts of the body.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["body", "a1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_body_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_body",
    microId: "en_a1_body_listen",
    difficulty: 2 as const,
    text: `Listen and identify the body part.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The word you heard is "${word.en}" (${word.fr}).`,
    tags: ["body", "a1", "listen"],
  },
]);
