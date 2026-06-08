import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "rojo",      es: "rojo",      fr: "rouge"       },
  { slug: "azul",      es: "azul",      fr: "bleu"        },
  { slug: "verde",     es: "verde",     fr: "vert"        },
  { slug: "amarillo",  es: "amarillo",  fr: "jaune"       },
  { slug: "negro",     es: "negro",     fr: "noir"        },
  { slug: "blanco",    es: "blanco",    fr: "blanc"       },
  { slug: "naranja",   es: "naranja",   fr: "orange"      },
  { slug: "rosa",      es: "rosa",      fr: "rose"        },
  { slug: "morado",    es: "morado",    fr: "violet"      },
  { slug: "marron",    es: "marrón",    fr: "marron"      },
  { slug: "gris",      es: "gris",      fr: "gris"        },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const colorsA1EsBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_a1_colors_es_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_colors",
    microId: "es_a1_colors_es_to_fr",
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
    id: `es_a1_colors_fr_to_es_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_colors",
    microId: "es_a1_colors_fr_to_es",
    difficulty: 2 as const,
    text: `Comment dit-on "${word.fr}" en espagnol ?`,
    format: "qcm" as const,
    choices: [word.es, ...dEs(word.es)],
    expected: [word.es],
    comparator: "mcq_exact" as const,
    explanation: `"${word.fr}" se dit "${word.es}" en espagnol.`,
  },
]);
