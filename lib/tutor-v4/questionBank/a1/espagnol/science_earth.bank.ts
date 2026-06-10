import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "aire",     es: "aire",     fr: "air",     audio: "/audio/espagnol/science_earth/a1/aire.mp3"     },
  { slug: "nube",     es: "nube",     fr: "nuage",   audio: "/audio/espagnol/science_earth/a1/nube.mp3"     },
  { slug: "luna",     es: "luna",     fr: "lune",    audio: "/audio/espagnol/science_earth/a1/luna.mp3"     },
  { slug: "roca",     es: "roca",     fr: "roche",   audio: "/audio/espagnol/science_earth/a1/roca.mp3"     },
  { slug: "suelo",    es: "suelo",    fr: "sol",     audio: "/audio/espagnol/science_earth/a1/suelo.mp3"    },
  { slug: "estrella", es: "estrella", fr: "étoile",  audio: "/audio/espagnol/science_earth/a1/estrella.mp3" },
  { slug: "planeta",  es: "planeta",  fr: "planète", audio: "/audio/espagnol/science_earth/a1/planeta.mp3"  },
  { slug: "tierra",   es: "tierra",   fr: "terre",   audio: "/audio/espagnol/science_earth/a1/tierra.mp3"   },
  { slug: "fuego",    es: "fuego",    fr: "feu",     audio: "/audio/espagnol/science_earth/a1/fuego.mp3"    },
  { slug: "agua",     es: "agua",     fr: "eau",     audio: "/audio/espagnol/science_earth/a1/agua.mp3"     },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const scienceEarthA1EsBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_a1_science_earth_es_to_fr_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_science_earth",
    microId: "es_a1_science_earth_es_to_fr",
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
    id: `es_a1_science_earth_fr_to_es_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_science_earth",
    microId: "es_a1_science_earth_fr_to_es",
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
    id: `es_a1_science_earth_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_science_earth",
    microId: "es_a1_science_earth_listen",
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
