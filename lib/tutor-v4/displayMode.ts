/**
 * QUEL VISAGE DU TUTOR ON OUVRE — LE MODE SIMPLE, TOUJOURS
 *
 * Le tutor-v4 a deux vues. La vue « simple » pose UNE question, choisie pour
 * l'élève, sur un écran nu : pas de choix entre deux énoncés, pas de panneau
 * latéral. La vue « complète » rend la main : les deux énoncés proposés, le
 * détail des micro-compétences, la progression.
 *
 * ⭐⭐ 09/09/2026 — LA RÈGLE DEVIENT « SIMPLE PAR DÉFAUT, PARTOUT ».
 * Frédéric, et c'est SA FILLE qui le lui a signalé : on tape « dérivée » sur
 * l'accueil, on arrive bien au bon endroit du tutor… en mode complet. « Tous les
 * appels au tutor-v4 sont par défaut mode simple. »
 *
 * Ce que disait la règle d'avant, et pourquoi elle tombe : la vue complète
 * commençait au collège, au motif qu'un entrant de 6e « n'a pas à se voir
 * retirer le choix ». L'argument valait pour quelqu'un qui VIENT travailler et
 * sait ce qu'il cherche. Il ne vaut pas pour quelqu'un qu'un lien vient de
 * déposer là : deux énoncés au choix, un tableau de bord et une colonne de
 * compétences, ce n'est pas rendre la main, c'est demander une décision de plus
 * à qui venait justement d'en prendre une. La porte s'ouvre donc sur la
 * question, en grand.
 *
 * ⭐ ET LE MODE SIMPLE RÈGLE LA QUESTION DOUBLE (Frédéric, dans la foulée : « et
 * en plus il n'y a pas de problème de question double »). La vue complète pose
 * DEUX énoncés côte à côte et demande lequel on veut — un élève qui arrive par
 * un lien lit donc deux problèmes avant d'en résoudre un seul, et il peut très
 * bien croire qu'on lui en demande deux. La vue simple en pose un. Ce n'est pas
 * un effet de bord agréable du changement : c'est un défaut d'affichage connu
 * qui disparaît avec lui.
 *
 * ⛔ ET ON NE RETIRE RIEN À PERSONNE. « Mode complet » reste à un bouton, et le
 * choix est retenu (`tutorv4-mode-choisi`, TutorV4Client.tsx) : on change le
 * DÉFAUT, pas le possible.
 * ⚠️ La bascule du téléphone (09/09, plus tôt le même jour) devient redondante
 * et reste en place : elle ne peut plus que confirmer ce défaut, jamais le
 * contredire. On la garde tant que la règle est neuve — le jour où l'on voudra
 * la retirer, c'est TutorV4Client.tsx qu'il faudra relire, pas ce fichier.
 * ⚠️ Un `?display=complete` explicite dans une adresse gagne toujours : c'est
 * `urlDisplayMode ?? defaultDisplayModeForClasse(...)` qui décide, et cette
 * fonction n'est que le second terme.
 *
 * ⚠️ Ce fichier n'importe QUE le type `Classe` (effacé à la compilation) :
 * l'inclure ne tire pas la banque de questions dans le bundle de la page.
 */

import type { Classe } from "@/lib/tutor-v4/catalog";

export type TutorDisplayMode = "simple" | "complete";

/**
 * ⚠️ LA CLASSE N'EST PLUS LUE, et le paramètre reste quand même.
 * Neuf points d'appel passent par ici ou par `displayParamForClasse` (matrice,
 * coach-ia, tableau de bord, évaluation nationale, liens internes du tutor).
 * Leur faire tous perdre leur argument serait un remaniement à la place d'un
 * changement de règle — et il faudrait le refaire à l'envers le jour où une
 * classe redemande le mode complet. La signature dit ce qu'on POURRAIT décider ;
 * le corps dit ce qu'on décide aujourd'hui.
 */
export function defaultDisplayModeForClasse(
  _classe: Classe | string | null | undefined,
): TutorDisplayMode {
  return "simple";
}

/**
 * Le fragment `display=…` à coller dans un lien vers `/tutor-v4`.
 * À utiliser partout où on écrivait `&display=simple` en dur.
 */
export function displayParamForClasse(
  classe: Classe | string | null | undefined,
): string {
  return `display=${defaultDisplayModeForClasse(classe)}`;
}
