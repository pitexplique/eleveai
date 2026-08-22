// lib/matrice/vitrine.ts
//
// CE QU'ON MONTRE QUAND ON NE SAIT ENCORE RIEN DE PERSONNE.
//
// ── LE TROU QU'ELLE BOUCHE (22/08/2026) ──────────────────────────────────────
// Frédéric : « on est à 62 % de bounce, on doit trouver des solutions
// différentes pour la page d'accueil », puis : « s'il arrive sans élève, classe
// et matière, une chose doit s'afficher par défaut », puis : « on pourrait lui
// montrer nos trois ressources phares, ou celles qu'on veut proposer, celles
// d'actualité ».
//
// L'accueil ne répondait RIEN tant qu'une classe n'était pas cliquée. La règle
// est juste et elle ne bouge pas — « la même phrase ne veut pas dire la même
// chose en CP et en Terminale », donc le moteur ne devine pas un niveau. Mais
// elle avait une conséquence que personne n'avait regardée en face : un
// visiteur qui arrive de Google voit un formulaire, une ligne grise, et rien
// d'autre. Il ne rebondit pas parce qu'on lui a mal répondu — il rebondit parce
// qu'on ne lui a rien montré.
//
// ⭐ ET CE N'EST PAS UNE ENTORSE À LA RÈGLE, C'EST SON COMPLÉMENT. Le moteur
// refuse de deviner un NIVEAU ; ce fichier ne devine rien du tout. Il ne
// calcule pas, il ne classe pas : c'est une liste ÉCRITE À LA MAIN, celle que
// Frédéric mettrait en vitrine s'il devait choisir sans rien savoir de la
// personne. Un choix éditorial assumé n'est pas une supposition.
//
// ⛔ N'Y METTRE QUE CE QUI VAUT POUR TOUT LE MONDE. Une ressource de Terminale
// posée ici serait exactement la faute qu'on reproche au moteur : montrer le
// monde d'un lycéen à un CM1. Les rituels, les cahiers, le coach et les pages
// d'entrée conviennent à n'importe qui ; une fiche de 3ᵉ, non.
//
// ⛔ ET ELLE DISPARAÎT AU PREMIER CLIC. Dès qu'une classe est dite, c'est le
// moteur qui répond — cette liste n'est pas un bandeau permanent, c'est ce
// qu'il y a À LA PLACE du vide.

import { RESSOURCES, STATUTS_PUBLIABLES } from "./ressources";
import { NB_MAX } from "./moteur";
import type { Recommandation } from "./types";

export type EntreeVitrine = {
  /** Un identifiant de RESSOURCES. Absent de l'inventaire = sauté en silence. */
  id: string;
  /**
   * Les mois où elle est d'actualité (1 = janvier). Absent = toute l'année.
   *
   * ⚠️ LE MOIS EST CELUI DU NAVIGATEUR, pas du serveur — cette liste est
   * calculée dans un composant client. C'est même mieux qu'ailleurs : à La
   * Réunion (UTC+4), `saison.ts` peut se tromper d'un jour parce qu'il lit
   * l'heure de Vercel ; ici on lit l'heure de la personne.
   */
  mois?: number[];
  /** Pourquoi elle est là — écrit à la main, affiché tel quel sous la carte. */
  raison?: string;
};

/**
 * ⭐ LA VITRINE, DANS L'ORDRE OÙ ELLE S'AFFICHE.
 *
 * C'est LE fichier à rouvrir quand on veut changer ce que voit un inconnu. Il
 * n'y a rien d'autre à toucher : pas de score à régler, pas de filtre à
 * comprendre. On écrit une ligne, elle sort.
 *
 * L'ordre suit une idée : d'abord ce qui se fait EN CINQ MINUTES sans compte et
 * sans savoir où l'on en est (les deux rituels), ensuite ce qui est
 * D'ACTUALITÉ, enfin la porte qui mène à tout le reste. Un inconnu ne cherche
 * pas le meilleur outil du site : il cherche à essayer quelque chose tout de
 * suite.
 *
 * ⚠️ SIX AU MAXIMUM (`NB_MAX`), comme les réponses du moteur — et ce n'est pas
 * une symétrie gratuite : c'est le même écran, et deux longueurs de liste
 * différentes au même endroit feraient sauter la page au premier clic.
 * Écrire HUIT lignes pour six places n'est donc pas une erreur : deux d'entre
 * elles sont saisonnières, et la liste doit rester pleine quand elles se
 * taisent. En août il en sort six, en janvier six autres.
 *
 * ⚠️ L'ORDRE TIENT COMPTE DES COULEURS, et il faut le savoir avant d'y toucher.
 * Chaque carte porte la teinte de son `type` (ApercuRessource.tsx) : rituel,
 * évaluation et cahier sont tous les trois OCRE. Rangés à la suite, ils font
 * quatre vignettes identiques de haut en bas — la monotonie qu'on venait
 * justement de corriger. La liste alterne donc les familles, et elle le fait
 * DANS LES DEUX RÉGIMES : d'août (les deux saisonniers sortent) comme de
 * janvier (aucun). Déplacer une ligne, c'est vérifier les deux.
 *
 * ⚠️ ELLE N'EST FILTRÉE PAR AUCUN NIVEAU — c'est tout son objet. Deux entrées
 * (le dico, le cahier) sont écrites pour le cycle 3 et le collège : un CP qui
 * arrive les verra. On l'accepte parce qu'elles ne l'humilient pas et qu'il
 * cliquera sa classe dans la seconde ; on ne l'accepterait pas d'une fiche de
 * Terminale, qui lui dirait que ce site n'est pas pour lui.
 */
export const VITRINE: EntreeVitrine[] = [
  {
    // Cinq minutes, chrono, sans compte et sans savoir où l'on en est. C'est la
    // marche la plus basse du site, et un inconnu ne cherche pas le meilleur
    // outil : il cherche à essayer quelque chose tout de suite.
    id: "calcul-rapide",
    raison: "sans compte, tout de suite",
  },
  {
    // Le produit du site, en deuxième et pas en premier : il demande de choisir
    // une classe et une matière, donc plus d'engagement qu'un rituel. On ne met
    // pas la marche la plus haute devant la porte.
    id: "coach-maths",
    raison: "la ressource la plus utilisée du site",
  },
  {
    // Les cahiers font l'essentiel du trafic du site — Google et Bing y
    // déposent la plupart des visiteurs. Un inconnu qui arrive en juillet ou en
    // août cherche très souvent exactement ça.
    id: "cahier-maths",
    mois: [6, 7, 8],
    raison: "à imprimer avant la rentrée",
  },
  {
    // L'histoire du site, et la seule carte qui ne demande pas de travailler.
    // Elle est là pour celui qui n'est pas venu réviser.
    id: "maths-974",
  },
  {
    // ⭐ L'ACTUALITÉ DE LA RENTRÉE. Les évaluations nationales tombent en
    // septembre, et c'est en août qu'on peut encore y faire quelque chose —
    // même fenêtre que `saison.ts`, et pour la même raison.
    // ⚠️ Le HUB, et non `eval-nat-4e-maths` : ici on ne connaît pas la classe.
    // C'est justement la page qui les range toutes.
    id: "eval-nationales-hub",
    mois: [8, 9],
    raison: "elles ont lieu à la rentrée",
  },
  {
    // Le français de la liste, et il ne demande rien : un mot qu'on n'a pas
    // compris, c'est la plus petite demande qu'un élève sache formuler.
    id: "dico",
  },
  {
    // L'autre rituel. Il passe après les saisonniers parce qu'il est là toute
    // l'année : c'est lui qui remplit la liste quand elle se vide, en janvier.
    id: "dictee-du-jour",
    raison: "cinq minutes, tous les jours",
  },
  {
    // Le filet. Quelqu'un que rien de ce qui précède n'a accroché doit pouvoir
    // aller voir par lui-même plutôt que de repartir.
    id: "explorer",
  },
];

/**
 * Les cartes de la vitrine, prêtes à passer dans `CarteRessource`.
 *
 * ⚠️ ON REND DES `Recommandation`, ET C'EST VOLONTAIRE : la carte est la même
 * que celle du moteur, donc une vitrine ne peut pas diverger visuellement des
 * réponses. `score` vaut 0 (personne ne le lit) et `ciblee` vaut false — il n'y
 * a pas de notion à viser puisqu'il n'y a pas eu de question.
 *
 * ⚠️ LE STATUT EST RELU ICI AUSSI. Une liste écrite à la main n'est pas une
 * autorisation de publier : si une ressource retombe en `a_verifier`, elle doit
 * disparaître de la vitrine comme elle disparaît des réponses.
 */
export function vitrine(aujourdhui = new Date()): Recommandation[] {
  const mois = aujourdhui.getMonth() + 1;
  const cartes: Recommandation[] = [];

  for (const entree of VITRINE) {
    if (cartes.length >= NB_MAX) break;
    if (entree.mois && !entree.mois.includes(mois)) continue;

    const ressource = RESSOURCES.find((r) => r.id === entree.id);
    if (!ressource) continue;
    if (!STATUTS_PUBLIABLES.includes(ressource.statut)) continue;

    cartes.push({
      ressource,
      score: 0,
      raison: entree.raison ?? "",
      url: ressource.url,
      ciblee: false,
    });
  }

  return cartes;
}
