import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const WORDS = [
  { slug: "medio_ambiente", es: "medio ambiente", fr: "environnement",    notionId: "es_b1_environment" },
  { slug: "contaminacion",  es: "contaminación",  fr: "pollution",        notionId: "es_b1_environment" },
  { slug: "reciclaje",      es: "reciclaje",       fr: "recyclage",        notionId: "es_b1_environment" },
  { slug: "cambio_climatico",es: "cambio climático",fr: "changement climatique", notionId: "es_b1_environment" },
  { slug: "energia_solar",  es: "energía solar",  fr: "énergie solaire",  notionId: "es_b1_environment" },
  { slug: "opinion",        es: "opinión",         fr: "opinion",          notionId: "es_b1_opinions" },
  { slug: "creo_que",       es: "creo que",        fr: "je pense que",     notionId: "es_b1_opinions" },
  { slug: "estoy_de_acuerdo",es:"estoy de acuerdo",fr: "je suis d'accord", notionId: "es_b1_opinions" },
  { slug: "periodico",      es: "periódico",       fr: "journal",          notionId: "es_b1_media" },
  { slug: "television",     es: "televisión",      fr: "télévision",       notionId: "es_b1_media" },
  { slug: "economia",       es: "economía",        fr: "économie",         notionId: "es_b1_economy" },
  { slug: "empresa",        es: "empresa",         fr: "entreprise",       notionId: "es_b1_economy" },
  { slug: "laboratorio",    es: "laboratorio",     fr: "laboratoire",      notionId: "es_b1_science" },
  { slug: "experimento",    es: "experimento",     fr: "expérience",       notionId: "es_b1_science" },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

export const espagnolB1QuestionBank: TutorBankItemV4[] = WORDS.flatMap((word) => [
  {
    kind: "fixed" as const,
    id: `es_b1_${word.slug}_es_to_fr`,
    niveau: "b1" as const,
    matiere: "espagnol" as const,
    notionId: word.notionId,
    microId: `${word.notionId}_es_to_fr`,
    difficulty: 2 as const,
    text: `Que signifie "${word.es}" en français ?`,
    format: "qcm" as const,
    choices: [word.fr, ...dFr(word.fr)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    explanation: `"${word.es}" = "${word.fr}".`,
  },
  {
    kind: "fixed" as const,
    id: `es_b1_${word.slug}_fr_to_es`,
    niveau: "b1" as const,
    matiere: "espagnol" as const,
    notionId: word.notionId,
    microId: `${word.notionId}_fr_to_es`,
    difficulty: 3 as const,
    text: `Comment dit-on "${word.fr}" en espagnol ?`,
    format: "qcm" as const,
    choices: [word.es, ...dEs(word.es)],
    expected: [word.es],
    comparator: "mcq_exact" as const,
    explanation: `"${word.fr}" se dit "${word.es}" en espagnol.`,
  },
]);
