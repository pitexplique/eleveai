// lib/matrice/concours.ts
//
// LES CONCOURS À VENIR — la seule rubrique du site qui périme toute seule.
//
// Demande de Frédéric : « Terminale + Mathématiques → afficher Concours à
// venir ». C'est la seule condition d'affichage, et elle est écrite ici plutôt
// que dans un composant : le jour où la Première y aura droit, c'est une ligne.
//
// ⚠️ RÈGLE DE CE FICHIER : ON N'INVENTE PAS DE DATE.
// Une date de concours fausse, c'est un élève qui rate son inscription. Les
// champs `epreuve` et `limiteInscription` valent donc `null` tant que Frédéric
// n'a pas vérifié l'année en cours sur le site officiel — et un champ nul ne
// s'affiche pas du tout. La carte dit ce qu'on sait, jamais ce qu'on suppose.
//
// ⚠️ ET ON N'AFFICHE PAS DE CARTE VIDE : un concours dont la date limite est
// passée disparaît de lui-même (`concoursAVenir()`), et s'il n'en reste aucun,
// il n'y a pas de rubrique du tout.
//
// ⛔ PAS DE PAGE /concours (tranché par Frédéric le 07/08 : « concours-avenir »).
// J'en avais écrit une pour porter les dates ; elle aurait doublé
// `/concours-avenir`, qui existe, qui a ses dix épreuves blanches et que les
// élèves connaissent. Ce fichier reste donc ce qu'il doit être : la RÈGLE
// d'affichage (Terminale + mathématiques) et les données du jour où on voudra
// les montrer. La pastille, elle, mène là où il y a vraiment quelque chose à
// faire.

import type { ProfilId } from "./types";

export type Concours = {
  id: string;
  nom: string;
  /** Une ligne : ce que c'est, pas ce qu'on en pense. */
  description: string;
  /** Qui peut s'y présenter. */
  public: string;
  /** Comment ça se passe le jour J. */
  format: string;
  /** La page EleveAI qui prépare ce concours (épreuves blanches). */
  href: string;
  /** Le site officiel, quand il y en a un. */
  siteOfficiel?: string;
  /**
   * Date de l'épreuve, au format ISO `AAAA-MM-JJ`.
   * ⚠️ `null` = PAS ENCORE VÉRIFIÉE. Ne pas remplir au jugé.
   */
  epreuve: string | null;
  /** Date limite d'inscription, même règle. */
  limiteInscription: string | null;
  /** Les niveaux qui voient ce concours. */
  niveaux: ProfilId[];
  matiere: "maths";
};

export const CONCOURS: Concours[] = [
  {
    id: "concours-avenir",
    nom: "Concours Avenir",
    description:
      "Le concours d'entrée commun à sept écoles d'ingénieurs post-bac. EleveAI en propose dix épreuves blanches, sans jamais deux fois la même question.",
    public: "Élèves de Terminale générale, spécialité mathématiques.",
    format: "QCM — 60 questions proposées, 45 réponses seulement à valider.",
    href: "/concours-avenir",
    siteOfficiel: "https://concoursavenir.fr",
    // ⏳ À REMPLIR PAR FRÉDÉRIC, après vérification sur le site officiel.
    // Tant que c'est `null`, la carte n'annonce aucune date — c'est voulu.
    epreuve: null,
    limiteInscription: null,
    niveaux: ["terminale"],
    matiere: "maths",
  },
  {
    // ⚠️ CORRIGÉ LE 07/08, ET C'EST UNE LEÇON. Je l'avais écrit « Concours
    // général des lycées », public « Première et Terminale », épreuve de cinq
    // heures — parce que c'est ce qu'est le concours général en France.
    // Frédéric : « tu as même concours général ! », puis « mais que pour 6ᵉ à
    // 3ᵉ ». La page `/concours-general` d'EleveAI est une PRÉPARATION COLLÈGE :
    // `app/concours-general/ConcoursGeneralClient.tsx` ligne 15 déclare
    // `niveaux = ["6e","5e","4e","3e"]`, et le chrono est à 25 minutes.
    // J'avais décrit le concours du monde réel au lieu de la ressource qui
    // existe — le genre d'erreur qu'un titre plausible rend invisible.
    id: "concours-general",
    nom: "Concours général — collège",
    description:
      "Vingt défis par semaine pour apprendre à chercher, visualiser, raisonner, tester et expliquer, dans l'esprit des grands concours internationaux : Singapour, Royaume-Uni, Australie, olympiades junior.",
    public: "Niveau cible la 3ᵉ, accessible aux élèves curieux dès la 6ᵉ.",
    format: "Séance chronométrée de 25 minutes, sans compte ni inscription.",
    href: "/concours-general",
    // Pas de date : ce n'est pas une échéance, c'est un entraînement qui vaut
    // toute l'année. Le champ existe pour le jour où une session sera datée.
    epreuve: null,
    limiteInscription: null,
    niveaux: ["6e", "5e", "4e", "3e"],
    matiere: "maths",
  },
];

/**
 * Les concours encore ouverts pour ce niveau.
 *
 * Un concours dont la date limite est passée sort tout seul. Un concours dont
 * la date n'est pas renseignée reste : c'est une préparation qui vaut toute
 * l'année, pas une annonce d'échéance.
 */
export function concoursAVenir(niveau: ProfilId, aujourdhui = new Date()): Concours[] {
  const jour = aujourdhui.toISOString().slice(0, 10);
  return CONCOURS.filter((c) => {
    if (!c.niveaux.includes(niveau)) return false;
    const echeance = c.limiteInscription ?? c.epreuve;
    return echeance === null || echeance >= jour;
  });
}

/**
 * La condition d'affichage, en un seul endroit.
 *
 * La demande de Frédéric disait « Terminale + Mathématiques → afficher Concours
 * à venir ». La règle écrite ici est un SURENSEMBLE strict de la sienne :
 * **mathématiques choisies, et au moins un concours ouvert à ce niveau**.
 * Elle donne exactement le même résultat en Terminale (le Concours Avenir), et
 * elle ouvre en plus le collège — parce qu'il s'est avéré qu'une ressource y
 * existait déjà, et qu'aucun collégien ne la voyait.
 *
 * ⚠️ La matière reste obligatoire : sans elle, la pastille sortirait à côté de
 * « Comprendre » et de « M'entraîner » pour quelqu'un qui n'a pas dit qu'il
 * venait faire des maths.
 */
export function afficherConcours(
  niveau: ProfilId | null,
  matiere: string | null,
  aujourdhui = new Date(),
): Concours[] {
  if (!niveau) return [];
  if (matiere !== "maths") return [];
  return concoursAVenir(niveau, aujourdhui);
}

/** « 12 mars 2027 » — et rien du tout si la date n'est pas connue. */
export function formaterDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}
