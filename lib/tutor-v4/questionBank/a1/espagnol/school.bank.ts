import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "escuela",    es: "escuela",    fr: "école"      },
  { slug: "clase",      es: "clase",      fr: "classe"     },
  { slug: "libro",      es: "libro",      fr: "livre"      },
  { slug: "lapiz",      es: "lápiz",      fr: "crayon"     },
  { slug: "bolígrafo",  es: "bolígrafo",  fr: "stylo"      },
  { slug: "cuaderno",   es: "cuaderno",   fr: "cahier"     },
  { slug: "mochila",    es: "mochila",    fr: "cartable"   },
  { slug: "pizarra",    es: "pizarra",    fr: "tableau"    },
  { slug: "profe",      es: "profe",      fr: "prof"       },
  { slug: "alumno",     es: "alumno",     fr: "élève"      },
  { slug: "examen",     es: "examen",     fr: "examen"     },
  { slug: "deberes",    es: "deberes",    fr: "devoirs"    },
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
]);
