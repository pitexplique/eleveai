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

// ⚠️ CES TROIS ACTIONS MÈNENT À DES PAGES QUI EXISTENT DÉJÀ — et c'est tout
// l'objet de cette version.
//
// La demande de Frédéric (point 12) décrivait QUATRE OUTILS À CONSTRUIRE :
// un filtre de ressources par niveau/matière/notion/type/objectif, un
// constructeur de progression annuelle, un constructeur d'évaluation (durée,
// barème, critères, remédiation), et un générateur de prompt pédagogique.
// Je les ai câblés vers `/enseignants/ressources`, `/progression`,
// `/evaluation` et `/prompt` — quatre routes qui n'existent pas. Résultat :
// quatre 404 servis à des professeurs, mesurés avant de m'en apercevoir.
//
// Tranché avec Frédéric le 07/08 : on branche sur l'existant maintenant, les
// outils viendront dans leur propre session. Une action qui ouvre une page
// approchante vaut mieux qu'une action qui ouvre une erreur.
//
// ⭐ « ÉCRIRE UN PROMPT PÉDAGOGIQUE » EST REVENUE LE 08/08 — ET ELLE EXISTAIT
// DÉJÀ. Je l'avais retirée la veille : c'était le seul des quatre outils sans
// équivalent en ligne, et le brancher sur une page approchante aurait été un
// mensonge. Or l'outil tournait depuis des mois sous le nom `/optimiseur`,
// avec un titre qui parlait d'autre chose. Renommé `/prompt-pedagogique`, il
// est devenu trouvable — pour Google comme pour cette liste.
// 🔑 La leçon vaut au-delà : avant de déclarer qu'une chose n'existe pas,
// chercher sous quel autre nom elle vit. C'est la quatrième fois de la semaine.
//
// ⚠️ IL EST RÉSERVÉ AUX CONNECTÉS (`if (!eleve)` dans OptimiseurClient) et il
// sert AUSSI AUX ÉLÈVES — Frédéric : « un prof ou un élève tape un prompt et ça
// l'optimise ». S'il entre un jour dans les chips des élèves, ce n'est pas un
// oubli à corriger ici : c'est une décision à prendre.
//
// ⏳ CE QU'IL FAUDRA CONSTRUIRE, et la donnée est déjà là :
//   — « Trouver une ressource » : `type` et `resultat` viennent d'entrer dans
//     ressources.ts (07/08), c'est exactement de quoi filtrer « les ressources
//     que mes élèves peuvent faire, et dont je verrai un résultat revenir » ;
//   — « Préparer une progression » : les 431 notions du programme portent
//     désormais leurs PRÉREQUIS (notions.generated.ts, régénéré le 07/08) —
//     de quoi proposer un ordre, pas seulement une liste.
// ⭐ LES QUATRE ACTIONS DU PROFESSEUR, DANS L'ORDRE DICTÉ PAR FRÉDÉRIC (08/08) :
//   1. Coach — « le prof se met à la place de l'élève » ;
//   2. Évaluation — c'est le PARCOURS ;
//   3. Espace Profs ;
//   4. Prompt pédagogique.
//
// Ce qui change par rapport à la veille : les trois premières menaient à des
// pages approchantes faute de mieux (`/explorer`, `/programme/6e`,
// `/evaluation-nationale-college`). Elles mènent maintenant aux outils que le
// professeur ouvre vraiment — et les quatre existent, ce qui n'était pas le cas
// il y a vingt-quatre heures.
const PROF: ActionProfil[] = [
  {
    // Le coach, vu du côté de l'élève. C'est comme ça qu'un enseignant décide
    // s'il le donne à sa classe : en le faisant lui-même, pas en lisant une
    // page qui le décrit.
    // ⚠️ Le coach n'était PAS ouvert au profil `prof` dans ressources.ts avant
    // le 08/08 — la ressource la plus utilisée du site était invisible à celui
    // qui la prescrit.
    label: "Coach",
    href: "/coach-ia/maths",
    aide: "Se mettre à la place de l'élève : une question à la fois, corrigée",
    intention: "enseigner",
  },
  {
    // ⭐ « ÉVALUATION » ET NON « PARCOURS » (Frédéric, 08/08 : « parcours ne
    // veut rien dire, changer en évaluation dans les chips »).
    //
    // Le mot « parcours » est du vocabulaire d'EleveAI : il dit comment la
    // chose est faite, pas à quoi elle sert. Un professeur, lui, cherche « une
    // évaluation toute faite » — ses mots exacts, suivis de « je l'ai utilisée
    // l'année dernière ! ». C'est la meilleure raison de renommer quelque
    // chose : quelqu'un l'a utilisé et ne l'appelle pas comme nous.
    //
    // ⚠️ La destination NE CHANGE PAS — c'est bien /parcours qui s'ouvre, et
    // c'est lui qui rend un bilan de compétences noté. On a changé le mot, pas
    // la chose.
    //
    // ⏳ CE QU'ELLE NE FAIT PAS ENCORE, et il faut le savoir avant de la
    // promettre : elle évalue TOUS LES CHAPITRES de l'année, en bloc. Frédéric,
    // 08/08 : « plus tard on pourra sélectionner le chapitre ». Tant que ce
    // n'est pas fait, l'aide dit « toute l'année » — un professeur qui la lance
    // en septembre pour évaluer une seule notion serait déçu, et c'est le genre
    // de déception qui coûte un utilisateur.
    // ⭐ ET ÇA SERT DE DEVOIR MAISON (Frédéric, 08/08). Ce n'est pas un détail
    // d'habillage : une évaluation se passe en classe, sous surveillance, et se
    // range dans un créneau ; un devoir maison se donne le vendredi et se
    // relève le lundi. Même outil, deux moments de la semaine — et c'est le
    // second qui fait qu'on s'en sert souvent plutôt qu'une fois par trimestre.
    label: "Évaluation",
    href: "/parcours",
    aide: "Une évaluation toute faite sur toute l'année, ou un devoir maison — bilan noté",
    intention: "tester",
  },
  {
    label: "Espace Profs",
    href: "/espace-profs",
    aide: "Le suivi élève par élève, et les ressources à donner",
    intention: "suivre",
  },
  {
    label: "Prompt pédagogique",
    href: "/prompt-pedagogique",
    aide: "Votre demande est notée sur 20, complétée, puis réécrite",
    intention: "enseigner",
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
