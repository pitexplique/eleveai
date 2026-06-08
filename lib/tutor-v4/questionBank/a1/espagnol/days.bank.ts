import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "lunes",      es: "lunes",      fr: "lundi"    },
  { slug: "martes",     es: "martes",     fr: "mardi"    },
  { slug: "miercoles",  es: "miércoles",  fr: "mercredi" },
  { slug: "jueves",     es: "jueves",     fr: "jeudi"    },
  { slug: "viernes",    es: "viernes",    fr: "vendredi" },
  { slug: "sabado",     es: "sábado",     fr: "samedi"   },
  { slug: "domingo",    es: "domingo",    fr: "dimanche" },
  { slug: "enero",      es: "enero",      fr: "janvier"  },
  { slug: "febrero",    es: "febrero",    fr: "février"  },
  { slug: "marzo",      es: "marzo",      fr: "mars"     },
  { slug: "abril",      es: "abril",      fr: "avril"    },
  { slug: "mayo",       es: "mayo",       fr: "mai"      },
  { slug: "junio",      es: "junio",      fr: "juin"     },
  { slug: "julio",      es: "julio",      fr: "juillet"  },
  { slug: "agosto",     es: "agosto",     fr: "août"     },
  { slug: "septiembre", es: "septiembre", fr: "septembre"},
  { slug: "octubre",    es: "octubre",    fr: "octobre"  },
  { slug: "noviembre",  es: "noviembre",  fr: "novembre" },
  { slug: "diciembre",  es: "diciembre",  fr: "décembre" },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const daysA1EsBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_a1_days_es_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_days",
    microId: "es_a1_days_es_to_fr",
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
    id: `es_a1_days_fr_to_es_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_days",
    microId: "es_a1_days_fr_to_es",
    difficulty: 2 as const,
    text: `Comment dit-on "${word.fr}" en espagnol ?`,
    format: "qcm" as const,
    choices: [word.es, ...dEs(word.es)],
    expected: [word.es],
    comparator: "mcq_exact" as const,
    explanation: `"${word.fr}" se dit "${word.es}" en espagnol.`,
  },
]);
