// lib/matrice/actions.ts
//
// CE QU'UN ADULTE PEUT FAIRE — et qui n'est pas « chercher une ressource ».
//
// Les chips des élèves se DÉDUISENT des ressources (chips.ts) : une intention
// sans ressource n'apparaît pas, et c'est la bonne règle pour qui cherche à
// apprendre. Elle ne marche pas pour qui cherche à ENSEIGNER : un professeur
// qui prépare sa progression ne veut pas trois liens, il veut un outil. Une
// intention déduite ne peut pas produire un outil qui n'existe pas encore.
//
// D'où ce fichier : pour le professeur et le chef d'établissement, les actions
// sont ÉCRITES, et chacune mène à un endroit précis. C'est une liste courte —
// quatre et trois — parce qu'un menu de travail qui déborde ne se lit plus.
//
// ⛔ « Comprendre une notion » a été retirée des deux (Frédéric, 07/08). Un
// professeur connaît sa notion ; la lui proposer en premier geste, c'est se
// tromper de personne. Et un chef d'établissement n'a jamais demandé ça.
//
// ⚠️ Une action `href` NAVIGUE. Elle ne filtre pas la matrice : quand on clique
// « Voir la progression », on veut le tableau de bord, pas trois cartes qui
// parlent du tableau de bord.

import type { Intention, ProfilId } from "./types";

export type ActionProfil = {
  /** Ce qu'on lit sur la pastille. */
  label: string;
  /** La page qu'elle ouvre. */
  href: string;
  /** Dit en une ligne au survol — et lu par les lecteurs d'écran. */
  aide: string;
  /**
   * L'intention correspondante, quand il y en a une. Elle sert au suivi et à
   * la matrice le jour où l'outil renverra aussi des ressources.
   */
  intention?: Intention;
  /**
   * L'action accepte une matière et un niveau en paramètres : le clic les
   * emporte, et l'outil s'ouvre déjà filtré.
   */
  accepteFiltres?: boolean;
};

const PROF: ActionProfil[] = [
  {
    label: "Trouver une ressource",
    href: "/enseignants/ressources",
    aide: "Les ressources que vos élèves peuvent vraiment faire, avec un résultat à la clé",
    intention: "enseigner",
    accepteFiltres: true,
  },
  {
    label: "Préparer une progression",
    href: "/enseignants/progression",
    aide: "L'ordre des notions de l'année, avec leurs prérequis",
    intention: "enseigner",
    accepteFiltres: true,
  },
  {
    label: "Préparer une évaluation",
    href: "/enseignants/evaluation",
    aide: "Notion, durée, barème, critères de réussite et remédiation",
    intention: "preparer",
    accepteFiltres: true,
  },
  {
    label: "Écrire un prompt pédagogique",
    href: "/enseignants/prompt",
    aide: "Une demande simple devient un prompt complet, prêt à copier",
    intention: "enseigner",
    accepteFiltres: true,
  },
];

const DIRECTION: ActionProfil[] = [
  {
    // ⭐ Elle ouvre le tableau de bord DIRECTEMENT (Frédéric, 07/08). C'est la
    // seule chose qu'un chef d'établissement vient chercher en premier ; lui
    // proposer une carte qui mène au tableau de bord ajoutait un clic pour
    // rien.
    label: "Voir la progression",
    href: "/dashboard-principal",
    aide: "L'activité de l'établissement, classe par classe",
    intention: "suivre",
  },
  {
    label: "Préparer une évaluation nationale",
    href: "/evaluation-nationale-college",
    aide: "Ce sur quoi l'établissement est attendu, et de quoi s'y préparer",
    intention: "preparer",
  },
  {
    // Les compétences numériques et l'IA : c'est la 3ᵉ au printemps, pas la
    // rentrée — mais c'est ce qu'on lui demandera, et il n'avait aucune porte.
    label: "Pix IA",
    href: "/eval-pix-ia",
    aide: "Compétences numériques et IA : l'évaluation blanche et son référentiel",
    intention: "preparer",
  },
];

/**
 * Les actions écrites d'un profil — vide pour tous les autres, et c'est le
 * signal que les chips déduites doivent prendre le relais.
 */
export function actionsPour(profil: ProfilId): ActionProfil[] {
  if (profil === "prof") return PROF;
  if (profil === "direction") return DIRECTION;
  return [];
}

/**
 * L'URL d'une action, avec ce que la personne a déjà choisi.
 *
 * Cliquer « Mathématiques » puis « Préparer une évaluation » doit ouvrir le
 * constructeur DÉJÀ en mathématiques : sinon on redemande, à l'écran suivant,
 * ce qui vient d'être répondu à celui-ci.
 */
export function urlAction(
  action: ActionProfil,
  filtres: { matiere?: string | null; niveau?: string | null },
): string {
  if (!action.accepteFiltres) return action.href;
  const params = new URLSearchParams();
  if (filtres.matiere) params.set("matiere", filtres.matiere);
  if (filtres.niveau) params.set("niveau", filtres.niveau);
  const q = params.toString();
  return q ? `${action.href}?${q}` : action.href;
}
