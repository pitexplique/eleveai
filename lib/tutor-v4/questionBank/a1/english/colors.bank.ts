import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Vie quotidienne — Colors A1 ───────────────────────────────────────────────
const WORDS = [
  { slug: "red",    en: "red",    fr: "rouge",  audio: "/audio/english-maths/colors/a1/red.mp3"    },
  { slug: "blue",   en: "blue",   fr: "bleu",   audio: "/audio/english-maths/colors/a1/blue.mp3"   },
  { slug: "green",  en: "green",  fr: "vert",   audio: "/audio/english-maths/colors/a1/green.mp3"  },
  { slug: "yellow", en: "yellow", fr: "jaune",  audio: "/audio/english-maths/colors/a1/yellow.mp3" },
  { slug: "black",  en: "black",  fr: "noir",   audio: "/audio/english-maths/colors/a1/black.mp3"  },
  { slug: "white",  en: "white",  fr: "blanc",  audio: "/audio/english-maths/colors/a1/white.mp3"  },
  { slug: "orange", en: "orange", fr: "orange", audio: "/audio/english-maths/colors/a1/orange.mp3" },
  { slug: "pink",   en: "pink",   fr: "rose",   audio: "/audio/english-maths/colors/a1/pink.mp3"   },
  { slug: "purple", en: "purple", fr: "violet", audio: "/audio/english-maths/colors/a1/purple.mp3" },
  { slug: "grey",   en: "grey",   fr: "gris",   audio: "/audio/english-maths/colors/a1/grey.mp3"   },
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

export const colorsA1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a1_colors_en_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_colors",
    microId: "en_a1_colors_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a colour.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["colors", "a1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_colors_fr_to_en_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_colors",
    microId: "en_a1_colors_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about colours.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["colors", "a1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_colors_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_colors",
    microId: "en_a1_colors_listen",
    difficulty: 2 as const,
    text: `Listen and identify the colour.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The colour you heard is "${word.en}" (${word.fr}).`,
    tags: ["colors", "a1", "listen"],
  },
]);
