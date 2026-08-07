// lib/matrice/saison.ts
//
// CE QUI TOMBE MAINTENANT — le calendrier scolaire dans la matrice.
//
// Demande de Frédéric (07/08/2026) : « pour 6ᵉ et 4ᵉ il faut proposer en août
// et septembre évaluation nationale ». Le reste de l'année, ces épreuves ne
// sont pas d'actualité et n'ont aucune raison de passer devant le coach.
//
// C'est la première fois que la matrice tient compte de la DATE. Trois choses
// à savoir avant d'en ajouter :
//
// 1. ⚠️ LE BONUS NE S'APPLIQUE PAS PARTOUT. Un élève de 6ᵉ qui écrit
//    « je comprends rien aux fractions » en septembre doit recevoir le coach,
//    pas l'évaluation nationale — sa demande est précise, on ne la recouvre
//    pas avec le calendrier. Le rendez-vous ne remonte que dans deux cas :
//    quand personne n'a rien demandé de précis (on montre les portes du
//    niveau), et quand l'intention lue est « préparer une échéance ».
//    C'est LA règle du fichier ; sans elle, un mois de l'année verrait toutes
//    les réponses converger vers la même page.
//
// 2. ⚠️ LE MOIS EST CELUI DU SERVEUR au premier rendu. Vercel tourne en UTC,
//    La Réunion est à UTC+4 : le 31 août au soir, la page peut être servie en
//    « août » alors qu'il est déjà septembre sur l'île. Un jour de décalage sur
//    une fenêtre de deux mois — on l'accepte, et on le sait.
//
// 3. Les ressources visées existent déjà dans ressources.ts. Ce fichier ne
//    crée rien : il dit seulement QUAND et POUR QUI elles passent devant.

import type { ProfilId } from "./types";

export type RendezVous = {
  id: string;
  /** Les mois où il est d'actualité, en numéros humains (1 = janvier). */
  mois: number[];
  niveaux: ProfilId[];
  /** Les identifiants de ressources.ts à faire remonter. */
  ressources: string[];
  /** Ce qu'on lit sur la pastille. */
  label: string;
  href: string;
  /** Pourquoi maintenant — affiché tel quel, jamais paraphrasé. */
  raison: string;
};

export const RENDEZ_VOUS: RendezVous[] = [
  {
    id: "eval-nationale-6e",
    // Août ET septembre : l'épreuve tombe en septembre, mais c'est en août
    // qu'on peut encore y faire quelque chose. Proposer le jour J ne sert plus.
    mois: [8, 9],
    // ⚠️ Le CM2 aussi : un élève qui entre en 6ᵉ garde souvent « CM2 » dans son
    // profil jusqu'à la rentrée, et c'est LUI que l'épreuve attend.
    niveaux: ["6e", "cm2"],
    ressources: ["eval-nat-6e-maths", "eval-nat-6e-francais", "eval-nationales-hub"],
    label: "Évaluation nationale",
    href: "/evaluation-nationale-college",
    raison: "elle a lieu à la rentrée",
  },
  {
    id: "eval-nationale-4e",
    mois: [8, 9],
    niveaux: ["4e"],
    ressources: ["eval-nat-4e-maths", "eval-nat-4e-francais", "eval-nationales-hub"],
    label: "Évaluation nationale",
    href: "/evaluation-nationale-college",
    raison: "elle a lieu à la rentrée",
  },
];

/** Les rendez-vous d'actualité pour ce niveau, aujourd'hui. */
export function rendezVousDeSaison(
  niveau: ProfilId | null,
  aujourdhui = new Date(),
): RendezVous[] {
  if (!niveau) return [];
  const mois = aujourdhui.getMonth() + 1;
  return RENDEZ_VOUS.filter((r) => r.mois.includes(mois) && r.niveaux.includes(niveau));
}

/**
 * Les identifiants de ressources à faire remonter aujourd'hui, pour ce niveau.
 * Un `Set` parce que le moteur interroge une fois par ressource.
 */
export function ressourcesDeSaison(
  niveau: ProfilId | null,
  aujourdhui = new Date(),
): Set<string> {
  const ids = new Set<string>();
  for (const r of rendezVousDeSaison(niveau, aujourdhui)) {
    for (const id of r.ressources) ids.add(id);
  }
  return ids;
}
