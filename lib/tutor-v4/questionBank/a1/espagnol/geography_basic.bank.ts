import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "playa",     es: "playa",     fr: "plage",    audio: "/audio/espagnol/geography_basic/a1/playa.mp3"     },
  { slug: "ciudad",    es: "ciudad",    fr: "ville",    audio: "/audio/espagnol/geography_basic/a1/ciudad.mp3"    },
  { slug: "bosque",    es: "bosque",    fr: "forêt",    audio: "/audio/espagnol/geography_basic/a1/bosque.mp3"    },
  { slug: "isla",      es: "isla",      fr: "île",      audio: "/audio/espagnol/geography_basic/a1/isla.mp3"      },
  { slug: "montana",   es: "montaña",   fr: "montagne", audio: "/audio/espagnol/geography_basic/a1/montana.mp3"   },
  { slug: "oceano",    es: "océano",    fr: "océan",    audio: "/audio/espagnol/geography_basic/a1/oceano.mp3"    },
  { slug: "rio",       es: "río",       fr: "rivière",  audio: "/audio/espagnol/geography_basic/a1/rio.mp3"       },
  { slug: "carretera", es: "carretera", fr: "route",    audio: "/audio/espagnol/geography_basic/a1/carretera.mp3" },
  { slug: "mar",       es: "mar",       fr: "mer",      audio: "/audio/espagnol/geography_basic/a1/mar.mp3"       },
  { slug: "pueblo",    es: "pueblo",    fr: "village",  audio: "/audio/espagnol/geography_basic/a1/pueblo.mp3"    },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const geographyBasicA1EsBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_a1_geography_basic_es_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_geography_basic",
    microId: "es_a1_geography_basic_es_to_fr",
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
    id: `es_a1_geography_basic_fr_to_es_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_geography_basic",
    microId: "es_a1_geography_basic_fr_to_es",
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
    id: `es_a1_geography_basic_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_geography_basic",
    microId: "es_a1_geography_basic_listen",
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
