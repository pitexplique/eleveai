import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "circulo",    es: "círculo",    fr: "cercle",    audio: "/audio/espagnol/shapes/circulo.mp3"    },
  { slug: "cuadrado",   es: "cuadrado",   fr: "carré",     audio: "/audio/espagnol/shapes/cuadrado.mp3"   },
  { slug: "triangulo",  es: "triángulo",  fr: "triangle",  audio: "/audio/espagnol/shapes/triangulo.mp3"  },
  { slug: "rectangulo", es: "rectángulo", fr: "rectangle", audio: "/audio/espagnol/shapes/rectangulo.mp3" },
  { slug: "ovalo",      es: "óvalo",      fr: "ovale",     audio: "/audio/espagnol/shapes/ovalo.mp3"      },
  { slug: "rombo",      es: "rombo",      fr: "losange",   audio: "/audio/espagnol/shapes/rombo.mp3"      },
  { slug: "pentagono",  es: "pentágono",  fr: "pentagone", audio: "/audio/espagnol/shapes/pentagono.mp3"  },
  { slug: "hexagono",   es: "hexágono",   fr: "hexagone",  audio: "/audio/espagnol/shapes/hexagono.mp3"   },
  { slug: "esfera",     es: "esfera",     fr: "sphère",    audio: "/audio/espagnol/shapes/esfera.mp3"     },
  { slug: "cubo",       es: "cubo",       fr: "cube",      audio: "/audio/espagnol/shapes/cubo.mp3"       },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const shapesA1EsBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_a1_shapes_es_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_shapes",
    microId: "es_a1_shapes_es_to_fr",
    difficulty: 1 as const,
    text: `Que signifie "${word.es}" en français ?`,
    format: "qcm" as const,
    choices: [word.fr, ...dFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    explanation: `"${word.es}" = "${word.fr}".`,
  },
  {
    kind: "fixed" as const,
    id: `es_a1_shapes_fr_to_es_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_shapes",
    microId: "es_a1_shapes_fr_to_es",
    difficulty: 2 as const,
    text: `Comment dit-on "${word.fr}" en espagnol ?`,
    format: "qcm" as const,
    choices: [word.es, ...dEs(word.es)],
    expected: [word.es],
    comparator: "mcq_exact" as const,
    explanation: `"${word.fr}" se dit "${word.es}" en espagnol.`,
  },
  {
    kind: "fixed" as const,
    id: `es_a1_shapes_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_shapes",
    microId: "es_a1_shapes_es_to_fr",
    difficulty: 2 as const,
    text: `🔊 Écoute et choisis la traduction française.`,
    format: "qcm" as const,
    audioSrc: word.audio,
    choices: [word.fr, ...dFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `Écoute attentivement.`,
    explanation: `La forme entendue est "${word.es}" (${word.fr}).`,
  },
]);
