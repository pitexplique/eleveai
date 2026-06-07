import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Geometry vocabulary A2 ────────────────────────────────────────────────────
const WORDS = [
  { slug: "angle",         en: "angle",         fr: "angle",          audio: "/audio/english-maths/geometry/a2/angle.mp3"         },
  { slug: "right_angle",   en: "right angle",   fr: "angle droit",    audio: "/audio/english-maths/geometry/a2/right_angle.mp3"   },
  { slug: "parallel",      en: "parallel",      fr: "parallèle",      audio: "/audio/english-maths/geometry/a2/parallel.mp3"      },
  { slug: "perpendicular", en: "perpendicular", fr: "perpendiculaire",audio: "/audio/english-maths/geometry/a2/perpendicular.mp3" },
  { slug: "diagonal",      en: "diagonal",      fr: "diagonale",      audio: "/audio/english-maths/geometry/a2/diagonal.mp3"      },
  { slug: "axis",          en: "axis",          fr: "axe",            audio: "/audio/english-maths/geometry/a2/axis.mp3"          },
  { slug: "symmetry",      en: "symmetry",      fr: "symétrie",       audio: "/audio/english-maths/geometry/a2/symmetry.mp3"      },
  { slug: "polygon",       en: "polygon",       fr: "polygone",       audio: "/audio/english-maths/geometry/a2/polygon.mp3"       },
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

export const geometryA2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a2_geometry_en_to_fr_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_geometry",
    microId: "en_a2_geometry_en_to_fr",
    difficulty: 2 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a geometry term.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["geometry", "a2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_geometry_fr_to_en_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_geometry",
    microId: "en_a2_geometry_fr_to_en",
    difficulty: 3 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about shapes and geometric properties.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["geometry", "a2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_geometry_listen_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_geometry",
    microId: "en_a2_geometry_listen",
    difficulty: 3 as const,
    text: `Listen and identify the geometry term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["geometry", "a2", "listen"],
  },
]);
