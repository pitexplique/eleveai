import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "triangle",  en: "triangle",  fr: "triangle",  audio: "/audio/english-maths/geometry/a1/triangle.mp3" },
  { slug: "square",    en: "square",    fr: "carré",     audio: "/audio/english-maths/geometry/a1/square.mp3" },
  { slug: "rectangle", en: "rectangle", fr: "rectangle", audio: "/audio/english-maths/geometry/a1/rectangle.mp3" },
  { slug: "circle",    en: "circle",    fr: "cercle",    audio: "/audio/english-maths/geometry/a1/circle.mp3" },
  { slug: "point",     en: "point",     fr: "point",     audio: "/audio/english-maths/geometry/a1/point.mp3" },
  { slug: "line",      en: "line",      fr: "droite",    audio: "/audio/english-maths/geometry/a1/line.mp3" },
  { slug: "side",      en: "side",      fr: "côté",      audio: "/audio/english-maths/geometry/a1/side.mp3" },
  { slug: "angle",     en: "angle",     fr: "angle",     audio: "/audio/english-maths/geometry/a1/angle.mp3" },
  { slug: "vertex",    en: "vertex",    fr: "sommet",    audio: "/audio/english-maths/geometry/a1/vertex.mp3" },
  { slug: "perimeter", en: "perimeter", fr: "périmètre", audio: "/audio/english-maths/geometry/a1/perimeter.mp3" },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEn(exclude: string) { return WORDS.filter(w => w.en !== exclude).map(w => w.en).slice(0, 3); }

export const geometryA1Bank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `en_a1_shapes_en_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_shapes",
    microId: "en_a1_shapes_en_to_fr",
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
    id: `en_a1_shapes_fr_to_en_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_shapes",
    microId: "en_a1_shapes_fr_to_en",
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
    id: `en_a1_shapes_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english-maths" as const,
    notionId: "en_a1_shapes",
    microId: "en_a1_shapes_listen",
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
