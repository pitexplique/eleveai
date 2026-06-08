import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "camisa",    es: "camisa",    fr: "chemise"    },
  { slug: "pantalon",  es: "pantalón",  fr: "pantalon"   },
  { slug: "zapato",    es: "zapato",    fr: "chaussure"  },
  { slug: "vestido",   es: "vestido",   fr: "robe"       },
  { slug: "falda",     es: "falda",     fr: "jupe"       },
  { slug: "calcetín",  es: "calcetín",  fr: "chaussette" },
  { slug: "abrigo",    es: "abrigo",    fr: "manteau"    },
  { slug: "gorra",     es: "gorra",     fr: "casquette"  },
  { slug: "bufanda",   es: "bufanda",   fr: "écharpe"    },
  { slug: "sudadera",  es: "sudadera",  fr: "sweat"      },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const clothesA1EsBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_a1_clothes_es_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_clothes",
    microId: "es_a1_clothes_es_to_fr",
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
    id: `es_a1_clothes_fr_to_es_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_clothes",
    microId: "es_a1_clothes_fr_to_es",
    difficulty: 2 as const,
    text: `Comment dit-on "${word.fr}" en espagnol ?`,
    format: "qcm" as const,
    choices: [word.es, ...dEs(word.es)],
    expected: [word.es],
    comparator: "mcq_exact" as const,
    explanation: `"${word.fr}" se dit "${word.es}" en espagnol.`,
  },
]);
