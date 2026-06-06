import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "point",     en: "point",     fr: "point",     audio: "/audio/english-maths/geometry/point.mp3",     audioSentence: "/audio/english-maths/geometry/point-sentence.mp3" },
  { slug: "line",      en: "line",      fr: "droite",    audio: "/audio/english-maths/geometry/line.mp3",      audioSentence: "/audio/english-maths/geometry/line-sentence.mp3" },
  { slug: "circle",    en: "circle",    fr: "cercle",    audio: "/audio/english-maths/geometry/circle.mp3",    audioSentence: "/audio/english-maths/geometry/circle-sentence.mp3" },
  { slug: "triangle",  en: "triangle",  fr: "triangle",  audio: "/audio/english-maths/geometry/triangle.mp3",  audioSentence: "/audio/english-maths/geometry/triangle-sentence.mp3" },
  { slug: "square",    en: "square",    fr: "carré",     audio: "/audio/english-maths/geometry/square.mp3",    audioSentence: "/audio/english-maths/geometry/square-sentence.mp3" },
  { slug: "rectangle", en: "rectangle", fr: "rectangle", audio: "/audio/english-maths/geometry/rectangle.mp3", audioSentence: "/audio/english-maths/geometry/rectangle-sentence.mp3" },
  { slug: "side",      en: "side",      fr: "côté",      audio: "/audio/english-maths/geometry/side.mp3",      audioSentence: "/audio/english-maths/geometry/side-sentence.mp3" },
  { slug: "vertex",    en: "vertex",    fr: "sommet",    audio: "/audio/english-maths/geometry/vertex.mp3",    audioSentence: "/audio/english-maths/geometry/vertex-sentence.mp3" },
  { slug: "perimeter", en: "perimeter", fr: "périmètre", audio: "/audio/english-maths/geometry/perimeter.mp3", audioSentence: "/audio/english-maths/geometry/perimeter-sentence.mp3" },
] as const;

function distractorsFr(exclude: string): string[] {
  return WORDS.filter((w) => w.fr !== exclude).map((w) => w.fr).slice(0, 3);
}
function distractorsEn(exclude: string): string[] {
  return WORDS.filter((w) => w.en !== exclude).map((w) => w.en).slice(0, 3);
}

export const geometryA1Bank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `en_a1_geometry_en_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english" as const,
    notionId: "en_a1_geometry",
    microId: "en_a1_geometry_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a geometry term.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["geometry", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_geometry_fr_to_en_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english" as const,
    notionId: "en_a1_geometry",
    microId: "en_a1_geometry_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about the geometry shape or element.`,
    explanation: `"${word.fr}" translates to "${word.en}" in English.`,
    tags: ["geometry", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a1_geometry_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "english" as const,
    notionId: "en_a1_geometry",
    microId: "en_a1_geometry_listen",
    difficulty: 2 as const,
    text: `Listen and choose the correct geometry word.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully to the pronunciation.`,
    explanation: `The word you heard is "${word.en}" (${word.fr}).`,
    tags: ["geometry", "listen"],
  },
]);
