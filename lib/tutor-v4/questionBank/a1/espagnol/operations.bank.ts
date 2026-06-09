import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "mas",            es: "más",            fr: "plus",            audio: "/audio/espagnol/operations/mas.mp3"            },
  { slug: "menos",          es: "menos",          fr: "moins",           audio: "/audio/espagnol/operations/menos.mp3"          },
  { slug: "por",            es: "por",            fr: "fois (×)",        audio: "/audio/espagnol/operations/por.mp3"            },
  { slug: "dividido",       es: "dividido",       fr: "divisé par",      audio: "/audio/espagnol/operations/dividido.mp3"       },
  { slug: "igual",          es: "igual",          fr: "égal",            audio: "/audio/espagnol/operations/igual.mp3"          },
  { slug: "suma",           es: "suma",           fr: "addition",        audio: "/audio/espagnol/operations/suma.mp3"           },
  { slug: "resta",          es: "resta",          fr: "soustraction",    audio: "/audio/espagnol/operations/resta.mp3"          },
  { slug: "multiplicacion", es: "multiplicación", fr: "multiplication",  audio: "/audio/espagnol/operations/multiplicacion.mp3" },
  { slug: "division",       es: "división",       fr: "division",        audio: "/audio/espagnol/operations/division.mp3"       },
  { slug: "resultado",      es: "resultado",      fr: "résultat",        audio: "/audio/espagnol/operations/resultado.mp3"      },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const operationsA1EsBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_a1_operations_es_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_operations",
    microId: "es_a1_operations_es_to_fr",
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
    id: `es_a1_operations_fr_to_es_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_operations",
    microId: "es_a1_operations_fr_to_es",
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
    id: `es_a1_operations_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_operations",
    microId: "es_a1_operations_listen",
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
