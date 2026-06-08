import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// Vocabulaire A2 — vie quotidienne, voyage, métiers
const WORDS = [
  { slug: "ciudad",      es: "ciudad",      fr: "ville"        },
  { slug: "calle",       es: "calle",       fr: "rue"          },
  { slug: "tienda",      es: "tienda",      fr: "magasin"      },
  { slug: "mercado",     es: "mercado",     fr: "marché"       },
  { slug: "hospital",    es: "hospital",    fr: "hôpital"      },
  { slug: "farmacia",    es: "farmacia",    fr: "pharmacie"    },
  { slug: "banco",       es: "banco",       fr: "banque"       },
  { slug: "autobus",     es: "autobús",     fr: "bus"          },
  { slug: "tren",        es: "tren",        fr: "train"        },
  { slug: "avion",       es: "avión",       fr: "avion"        },
  { slug: "medico",      es: "médico",      fr: "médecin"      },
  { slug: "enfermero",   es: "enfermero",   fr: "infirmier"    },
  { slug: "maestro",     es: "maestro",     fr: "instituteur"  },
  { slug: "policia",     es: "policía",     fr: "policier"     },
  { slug: "bombero",     es: "bombero",     fr: "pompier"      },
  { slug: "tiempo",      es: "tiempo",      fr: "temps / météo"},
  { slug: "lluvia",      es: "lluvia",      fr: "pluie"        },
  { slug: "sol",         es: "sol",         fr: "soleil"       },
  { slug: "viento",      es: "viento",      fr: "vent"         },
  { slug: "nieve",       es: "nieve",       fr: "neige"        },
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
  ];
});
