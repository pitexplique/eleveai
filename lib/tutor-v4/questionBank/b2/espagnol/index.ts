import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "globalizacion", es: "globalización", fr: "mondialisation", notionId: "es_b2_economics",   audio: "/audio/espagnol/economics/globalizacion.mp3" },
  { slug: "desigualdad",   es: "desigualdad",   fr: "inégalité",       notionId: "es_b2_economics",   audio: "/audio/espagnol/economics/desigualdad.mp3"   },
  { slug: "democracia",    es: "democracia",    fr: "démocratie",      notionId: "es_b2_geopolitics", audio: "/audio/espagnol/geopolitics/democracia.mp3"   },
  { slug: "dictadura",     es: "dictadura",     fr: "dictature",       notionId: "es_b2_geopolitics", audio: "/audio/espagnol/geopolitics/dictadura.mp3"    },
  { slug: "inmigracion",   es: "inmigración",   fr: "immigration",     notionId: "es_b2_geopolitics", audio: "/audio/espagnol/geopolitics/inmigracion.mp3"  },
  { slug: "literatura",    es: "literatura",    fr: "littérature",     notionId: "es_b2_literature",  audio: "/audio/espagnol/literature/literatura.mp3"    },
  { slug: "poesia",        es: "poesía",         fr: "poésie",          notionId: "es_b2_literature",  audio: "/audio/espagnol/literature/poesia.mp3"        },
  { slug: "etica",         es: "ética",          fr: "éthique",         notionId: "es_b2_philosophy",  audio: "/audio/espagnol/philosophy/etica.mp3"         },
  { slug: "libertad",      es: "libertad",      fr: "liberté",         notionId: "es_b2_philosophy",  audio: "/audio/espagnol/philosophy/libertad.mp3"      },
  { slug: "justicia",      es: "justicia",      fr: "justice",         notionId: "es_b2_philosophy",  audio: "/audio/espagnol/philosophy/justicia.mp3"      },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const espagnolB2QuestionBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_b2_${word.slug}_es_to_fr`,
    niveau: "b2" as const,
    matiere: "espagnol" as const,
    notionId: word.notionId,
    microId: `${word.notionId}_es_to_fr`,
    difficulty: 3 as const,
    text: `Que signifie "${word.es}" en français ?`,
    format: "qcm" as const,
    choices: [word.fr, ...dFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    explanation: `"${word.es}" = "${word.fr}".`,
  },
  {
    kind: "fixed" as const,
    id: `es_b2_${word.slug}_fr_to_es`,
    niveau: "b2" as const,
    matiere: "espagnol" as const,
    notionId: word.notionId,
    microId: `${word.notionId}_fr_to_es`,
    difficulty: 4 as const,
    text: `Comment dit-on "${word.fr}" en espagnol ?`,
    format: "qcm" as const,
    choices: [word.es, ...dEs(word.es)],
    expected: [word.es],
    comparator: "mcq_exact" as const,
    explanation: `"${word.fr}" se dit "${word.es}" en espagnol.`,
  },
  {
    kind: "fixed" as const,
    id: `es_b2_${word.slug}_listen`,
    niveau: "b2" as const,
    matiere: "espagnol" as const,
    notionId: word.notionId,
    microId: `${word.notionId}_listen`,
    difficulty: 4 as const,
    text: `🔊 Écoute et choisis la traduction française.`,
    format: "qcm" as const,
    audioSrc: word.audio,
    choices: [word.fr, ...dFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `Écoute attentivement la prononciation.`,
    explanation: `Le mot entendu est "${word.es}" (${word.fr}).`,
  },
]);
