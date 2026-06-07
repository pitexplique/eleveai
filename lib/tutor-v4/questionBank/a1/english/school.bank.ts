import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Vie quotidienne — School A1 ───────────────────────────────────────────────
const WORDS = [
  { slug: "pen",       en: "pen",       fr: "stylo",    audio: "/audio/english-maths/school/a1/pen.mp3"       },
  { slug: "pencil",    en: "pencil",    fr: "crayon",   audio: "/audio/english-maths/school/a1/pencil.mp3"    },
  { slug: "book",      en: "book",      fr: "livre",    audio: "/audio/english-maths/school/a1/book.mp3"      },
  { slug: "bag",       en: "bag",       fr: "sac",      audio: "/audio/english-maths/school/a1/bag.mp3"       },
  { slug: "ruler",     en: "ruler",     fr: "règle",    audio: "/audio/english-maths/school/a1/ruler.mp3"     },
  { slug: "table",     en: "table",     fr: "table",    audio: "/audio/english-maths/school/a1/table.mp3"     },
  { slug: "chair",     en: "chair",     fr: "chaise",   audio: "/audio/english-maths/school/a1/chair.mp3"     },
  { slug: "board",     en: "board",     fr: "tableau",  audio: "/audio/english-maths/school/a1/board.mp3"     },
  { slug: "classroom", en: "classroom", fr: "salle de classe", audio: "/audio/english-maths/school/a1/classroom.mp3" },
  { slug: "teacher",   en: "teacher",   fr: "professeur", audio: "/audio/english-maths/school/a1/teacher.mp3" },
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

export const schoolA1Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a1_school_en_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_school",
    microId: "en_a1_school_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a school object or place.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["school", "a1", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_school_fr_to_en_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_school",
    microId: "en_a1_school_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about the classroom.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["school", "a1", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_school_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_school",
    microId: "en_a1_school_listen",
    difficulty: 2 as const,
    text: `Listen and identify the school word.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The word you heard is "${word.en}" (${word.fr}).`,
    tags: ["school", "a1", "listen"],
  },
]);
