import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "escuela",   es: "escuela",   fr: "école",     audio: "/audio/espagnol/school/escuela.mp3"   },
  { slug: "clase",     es: "clase",     fr: "classe",    audio: "/audio/espagnol/school/clase.mp3"     },
  { slug: "libro",     es: "libro",     fr: "livre",     audio: "/audio/espagnol/school/libro.mp3"     },
  { slug: "lapiz",     es: "lápiz",     fr: "crayon",    audio: "/audio/espagnol/school/lapiz.mp3"     },
  { slug: "boligrafo", es: "bolígrafo", fr: "stylo",     audio: "/audio/espagnol/school/boligrafo.mp3" },
  { slug: "cuaderno",  es: "cuaderno",  fr: "cahier",    audio: "/audio/espagnol/school/cuaderno.mp3"  },
  { slug: "mochila",   es: "mochila",   fr: "cartable",  audio: "/audio/espagnol/school/mochila.mp3"   },
  { slug: "pizarra",   es: "pizarra",   fr: "tableau",   audio: "/audio/espagnol/school/pizarra.mp3"   },
  { slug: "profe",     es: "profe",     fr: "prof",      audio: "/audio/espagnol/school/profe.mp3"     },
  { slug: "alumno",    es: "alumno",    fr: "élève",     audio: "/audio/espagnol/school/alumno.mp3"    },
  { slug: "examen",    es: "examen",    fr: "examen",    audio: "/audio/espagnol/school/examen.mp3"    },
  { slug: "deberes",   es: "deberes",   fr: "devoirs",   audio: "/audio/espagnol/school/deberes.mp3"   },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const schoolA1EsBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_a1_school_es_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_school",
    microId: "es_a1_school_es_to_fr",
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
    id: `es_a1_school_fr_to_es_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_school",
    microId: "es_a1_school_fr_to_es",
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
    id: `es_a1_school_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_school",
    microId: "es_a1_school_es_to_fr",
    difficulty: 2 as const,
    text: `🔊 Écoute et choisis la traduction française.`,
    format: "qcm" as const,
    audioSrc: word.audio,
    choices: [word.fr, ...dFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `Écoute attentivement.`,
    explanation: `Le mot entendu est "${word.es}" (${word.fr}).`,
  },
]);
