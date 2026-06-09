import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// Vocabulaire A2 — vie quotidienne, voyage, métiers
const WORDS = [
  { slug: "ciudad",      es: "ciudad",      fr: "ville",         audio: "/audio/espagnol/daily_life/ciudad.mp3"      },
  { slug: "calle",       es: "calle",       fr: "rue",           audio: "/audio/espagnol/daily_life/calle.mp3"       },
  { slug: "tienda",      es: "tienda",      fr: "magasin",       audio: "/audio/espagnol/shopping/tienda.mp3"        },
  { slug: "mercado",     es: "mercado",     fr: "marché",        audio: "/audio/espagnol/shopping/mercado.mp3"       },
  { slug: "hospital",    es: "hospital",    fr: "hôpital",       audio: "/audio/espagnol/health/hospital.mp3"        },
  { slug: "farmacia",    es: "farmacia",    fr: "pharmacie",     audio: "/audio/espagnol/health/farmacia.mp3"        },
  { slug: "banco",       es: "banco",       fr: "banque",        audio: "/audio/espagnol/shopping/banco.mp3"         },
  { slug: "autobus",     es: "autobús",     fr: "bus",           audio: "/audio/espagnol/travel/autobus.mp3"         },
  { slug: "tren",        es: "tren",        fr: "train",         audio: "/audio/espagnol/travel/tren.mp3"            },
  { slug: "avion",       es: "avión",       fr: "avion",         audio: "/audio/espagnol/travel/avion.mp3"           },
  { slug: "medico",      es: "médico",      fr: "médecin",       audio: "/audio/espagnol/jobs/medico.mp3"            },
  { slug: "enfermero",   es: "enfermero",   fr: "infirmier",     audio: "/audio/espagnol/jobs/enfermero.mp3"         },
  { slug: "maestro",     es: "maestro",     fr: "instituteur",   audio: "/audio/espagnol/jobs/maestro.mp3"           },
  { slug: "policia",     es: "policía",     fr: "policier",      audio: "/audio/espagnol/jobs/policia.mp3"           },
  { slug: "bombero",     es: "bombero",     fr: "pompier",       audio: "/audio/espagnol/jobs/bombero.mp3"           },
  { slug: "tiempo",      es: "tiempo",      fr: "temps / météo", audio: "/audio/espagnol/weather/tiempo.mp3"         },
  { slug: "lluvia",      es: "lluvia",      fr: "pluie",         audio: "/audio/espagnol/weather/lluvia.mp3"         },
  { slug: "sol",         es: "sol",         fr: "soleil",        audio: "/audio/espagnol/weather/sol.mp3"            },
  { slug: "viento",      es: "viento",      fr: "vent",          audio: "/audio/espagnol/weather/viento.mp3"         },
  { slug: "nieve",       es: "nieve",       fr: "neige",         audio: "/audio/espagnol/weather/nieve.mp3"          },
] as const;

function dFr(exclude: string) { return WORDS.filter(w => w.fr !== exclude).map(w => w.fr).slice(0, 3); }
function dEs(exclude: string) { return WORDS.filter(w => w.es !== exclude).map(w => w.es).slice(0, 3); }

const notionMap: Record<string, string> = {
  ciudad: "es_a2_daily_life", calle: "es_a2_daily_life",
  tienda: "es_a2_shopping", mercado: "es_a2_shopping", banco: "es_a2_shopping",
  hospital: "es_a2_health", farmacia: "es_a2_health",
  autobus: "es_a2_travel", tren: "es_a2_travel", avion: "es_a2_travel",
  medico: "es_a2_jobs", enfermero: "es_a2_jobs", maestro: "es_a2_jobs", policia: "es_a2_jobs", bombero: "es_a2_jobs",
  tiempo: "es_a2_weather", lluvia: "es_a2_weather", sol: "es_a2_weather", viento: "es_a2_weather", nieve: "es_a2_weather",
};

export const espagnolA2QuestionBank: TutorBankItemV4[] = WORDS.flatMap((word) => {
  const notionId = notionMap[word.slug] ?? "es_a2_daily_life";
  return [
    {
      kind: "fixed" as const,
      id: `es_a2_${word.slug}_es_to_fr`,
      niveau: "a2" as const,
      matiere: "espagnol" as const,
      notionId,
      microId: `${notionId}_es_to_fr`,
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
      id: `es_a2_${word.slug}_fr_to_es`,
      niveau: "a2" as const,
      matiere: "espagnol" as const,
      notionId,
      microId: `${notionId}_fr_to_es`,
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
      id: `es_a2_${word.slug}_listen`,
      niveau: "a2" as const,
      matiere: "espagnol" as const,
      notionId,
      microId: `${notionId}_listen`,
      difficulty: 2 as const,
      text: `🔊 Écoute et choisis la traduction française.`,
      format: "qcm" as const,
      audioSrc: word.audio,
      choices: [word.fr, ...dFr(word.fr)],
      expected: [word.fr],
      comparator: "mcq_exact" as const,
      hint: `Écoute attentivement la prononciation.`,
      explanation: `Le mot entendu est "${word.es}" (${word.fr}).`,
    },
  ];
});
