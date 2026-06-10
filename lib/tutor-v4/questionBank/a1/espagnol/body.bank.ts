import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "cabeza",  es: "cabeza",  fr: "tête",    audio: "/audio/espagnol/body/a1/cabeza.mp3"  },
  { slug: "ojo",     es: "ojo",     fr: "œil",     audio: "/audio/espagnol/body/a1/ojo.mp3"     },
  { slug: "nariz",   es: "nariz",   fr: "nez",     audio: "/audio/espagnol/body/a1/nariz.mp3"   },
  { slug: "boca",    es: "boca",    fr: "bouche",  audio: "/audio/espagnol/body/a1/boca.mp3"    },
  { slug: "oreja",   es: "oreja",   fr: "oreille", audio: "/audio/espagnol/body/a1/oreja.mp3"   },
  { slug: "mano",    es: "mano",    fr: "main",    audio: "/audio/espagnol/body/a1/mano.mp3"    },
  { slug: "pie",     es: "pie",     fr: "pied",    audio: "/audio/espagnol/body/a1/pie.mp3"     },
  { slug: "brazo",   es: "brazo",   fr: "bras",    audio: "/audio/espagnol/body/a1/brazo.mp3"   },
  { slug: "pierna",  es: "pierna",  fr: "jambe",   audio: "/audio/espagnol/body/a1/pierna.mp3"  },
  { slug: "espalda", es: "espalda", fr: "dos",     audio: "/audio/espagnol/body/a1/espalda.mp3" },
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
  {
    kind: "fixed" as const,
    id: `es_a1_body_listen_${word.slug}`,
    niveau: "a1" as const,
    matiere: "espagnol" as const,
    notionId: "es_a1_body",
    microId: "es_a1_body_listen",
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
