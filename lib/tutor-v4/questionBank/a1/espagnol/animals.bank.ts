import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "perro",    es: "perro",    fr: "chien",    audio: "/audio/espagnol/animals/perro.mp3"    },
  { slug: "gato",     es: "gato",     fr: "chat",     audio: "/audio/espagnol/animals/gato.mp3"     },
  { slug: "caballo",  es: "caballo",  fr: "cheval",   audio: "/audio/espagnol/animals/caballo.mp3"  },
  { slug: "vaca",     es: "vaca",     fr: "vache",    audio: "/audio/espagnol/animals/vaca.mp3"     },
  { slug: "pajaro",   es: "pájaro",   fr: "oiseau",   audio: "/audio/espagnol/animals/pajaro.mp3"   },
  { slug: "pez",      es: "pez",      fr: "poisson (vivant)", audio: "/audio/espagnol/animals/pez.mp3" },
  { slug: "conejo",   es: "conejo",   fr: "lapin",    audio: "/audio/espagnol/animals/conejo.mp3"   },
  { slug: "leon",     es: "león",     fr: "lion",     audio: "/audio/espagnol/animals/leon.mp3"     },
  { slug: "elefante", es: "elefante", fr: "éléphant", audio: "/audio/espagnol/animals/elefante.mp3" },
  { slug: "tortuga",  es: "tortuga",  fr: "tortue",   audio: "/audio/espagnol/animals/tortuga.mp3"  },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const animalsA1EsBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_a1_animals_es_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_animals",
    microId: "es_a1_animals_es_to_fr",
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
    id: `es_a1_animals_fr_to_es_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_animals",
    microId: "es_a1_animals_fr_to_es",
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
    id: `es_a1_animals_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_animals",
    microId: "es_a1_animals_es_to_fr",
    difficulty: 2 as const,
    text: `🔊 Écoute et choisis la traduction française.`,
    format: "qcm" as const,
    audioSrc: word.audio,
    choices: [word.fr, ...dFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `Écoute attentivement.`,
    explanation: `L'animal entendu est "${word.es}" (${word.fr}).`,
  },
]);
