import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "cabeza",   es: "cabeza",   fr: "tête"     },
  { slug: "ojo",      es: "ojo",      fr: "œil"      },
  { slug: "nariz",    es: "nariz",    fr: "nez"      },
  { slug: "boca",     es: "boca",     fr: "bouche"   },
  { slug: "oreja",    es: "oreja",    fr: "oreille"  },
  { slug: "mano",     es: "mano",     fr: "main"     },
  { slug: "pie",      es: "pie",      fr: "pied"     },
  { slug: "brazo",    es: "brazo",    fr: "bras"     },
  { slug: "pierna",   es: "pierna",   fr: "jambe"    },
  { slug: "espalda",  es: "espalda",  fr: "dos"      },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const bodyA1EsBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_a1_body_es_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_body",
    microId: "es_a1_body_es_to_fr",
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
    id: `es_a1_body_fr_to_es_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_body",
    microId: "es_a1_body_fr_to_es",
    difficulty: 2 as const,
    text: `Comment dit-on "${word.fr}" en espagnol ?`,
    format: "qcm" as const,
    choices: [word.es, ...dEs(word.es)],
    expected: [word.es],
    comparator: "mcq_exact" as const,
    explanation: `"${word.fr}" se dit "${word.es}" en espagnol.`,
  },
]);
