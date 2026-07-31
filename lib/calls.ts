// lib/calls.ts — « En direct » : LA source de vérité des calls (sessions visio
// avec le fondateur). Ajouter / modifier un call = éditer CE fichier, rien
// d'autre : l'encart d'accueil et /api/call lisent tous les deux cette liste.
// Les inscriptions, elles, vivent en base (table call_messages).
//
// ⚠️ lienVisio est PRIVÉ : jamais affiché sur le site, envoyé par email aux
// inscrits avant le call (anti-intrusion). Le laisser vide tant que le lien
// Meet n'est pas créé — ça n'empêche pas les inscriptions.

export type CallRole = "eleve" | "parent" | "enseignant" | "etablissement";

export type CallEnDirect = {
  /** Identifiant stable, stocké dans call_messages.call_id. Ne pas renommer après ouverture des inscriptions. */
  id: string;
  titre: string;
  /** Une phrase d'accroche affichée sous le titre. */
  description: string;
  /** Public visé — pré-sélectionne le rôle dans le formulaire. */
  publicVise: CallRole;
  /** Date/heure AVEC le fuseau Réunion explicite (+04:00). */
  date: string;
  /** Durée indicative affichée, ex. "45 min". */
  duree: string;
  /** Lien Meet/Jitsi — PRIVÉ (envoyé par email), jamais rendu côté client. */
  lienVisio: string;
  /** false = brouillon : invisible sur le site. */
  actif: boolean;
  /**
   * Créneau qui revient chaque semaine. `date` ne sert alors que de gabarit
   * (jour de la semaine + heure) : la date réellement affichée est la
   * prochaine occurrence, recalculée à chaque affichage. Un rendez-vous
   * hebdomadaire ne périme donc jamais tout seul.
   */
  recurrence?: "hebdomadaire";
};

export const CALLS: CallEnDirect[] = [
  {
    id: "decouverte-2026-07",
    titre: "Découvrir EleveAI — rencontre avec le fondateur, Frédéric Lacoste",
    description:
      "Qui je suis, pourquoi j'ai créé EleveAI à La Réunion, une démo en direct, et vos questions. Parents bienvenus — enseignants curieux aussi.",
    publicVise: "parent",
    date: "2026-07-22T18:00:00+04:00",
    duree: "45 min",
    lienVisio: "https://meet.google.com/wwb-fyhk-yns",
    actif: true,
  },
  {
    id: "revision-premiere-2026-08",
    titre: "Révision maths en direct — entrée en Première",
    description:
      "On fait ensemble les pages clés du cahier de vacances « Vers la Première » avant la rentrée du 17 août. Viens avec ton cahier !",
    publicVise: "eleve",
    date: "2026-08-12T18:00:00+04:00",
    duree: "1 h",
    lienVisio: "https://meet.google.com/ari-jdic-mev",
    actif: true,
  },
  {
    // Créneau hebdomadaire de soutien — le seul rendez-vous payant du site
    // (le contenu reste gratuit, c'est le temps de Frédéric qui est vendu).
    // ⚠️ Le gabarit ci-dessous fixe le jour et l'heure : mercredi 18 h.
    // Changer `date` change le créneau de TOUTES les semaines à venir.
    id: "soutien-maths-visio-hebdo",
    titre: "Soutien maths en visio — mini-groupe de 3 à 4",
    description:
      "Un créneau chaque semaine, en tout petit groupe. Tu viens avec tes questions ou ton dernier contrôle, et on déroule ensemble. Quatre élèves au maximum, pour que chacun puisse parler.",
    publicVise: "eleve",
    date: "2026-08-05T18:00:00+04:00",
    duree: "1 h",
    lienVisio: "",
    actif: true,
    recurrence: "hebdomadaire",
  },
];

/**
 * Date de la prochaine séance : identique à `date` pour un call ponctuel,
 * prochaine occurrence à venir pour un créneau hebdomadaire.
 * (La Réunion n'a pas de changement d'heure : ajouter 7 jours conserve
 * l'heure locale.)
 */
export function prochaineDate(call: CallEnDirect, maintenant: Date = new Date()): string {
  if (call.recurrence !== "hebdomadaire") return call.date;
  const d = new Date(call.date);
  while (d.getTime() <= maintenant.getTime()) d.setDate(d.getDate() + 7);
  return d.toISOString();
}

/**
 * Les calls actifs à venir, du plus proche au plus lointain.
 * La date renvoyée est déjà résolue : les composants d'affichage n'ont pas à
 * savoir si le call est ponctuel ou hebdomadaire.
 */
export function callsAVenir(maintenant: Date = new Date()): CallEnDirect[] {
  return CALLS.filter((c) => c.actif)
    .map((c) => ({ ...c, date: prochaineDate(c, maintenant) }))
    .filter((c) => new Date(c.date).getTime() > maintenant.getTime())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/** « mercredi 22 juillet · 18 h (heure Réunion) » — affichage stable quel que
 *  soit le fuseau du visiteur (diaspora incluse : 18 h Réunion = 10 h New York). */
export function formatDateCall(iso: string): string {
  const d = new Date(iso);
  const jour = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Indian/Reunion",
  }).format(d);
  const heure = new Intl.DateTimeFormat("fr-FR", {
    hour: "numeric",
    timeZone: "Indian/Reunion",
  }).format(d);
  return `${jour} · ${heure} (heure Réunion)`;
}

/** « 16 h en métropole · 10 h à New York » — équivalences pour la famille en
 *  métropole et la diaspora. Intl gère l'heure d'été des deux fuseaux tout seul. */
export function formatHeuresMonde(iso: string): string {
  const d = new Date(iso);
  const h = (timeZone: string) =>
    new Intl.DateTimeFormat("fr-FR", { hour: "numeric", timeZone }).format(d);
  return `${h("Europe/Paris")} en métropole · ${h("America/New_York")} à New York`;
}
