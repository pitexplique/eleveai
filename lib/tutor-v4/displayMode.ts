/**
 * QUEL VISAGE DU TUTOR ON OUVRE, SELON LA CLASSE
 *
 * Le tutor-v4 a deux vues. La vue « simple » pose UNE question, choisie pour
 * l'élève, sur un écran nu : pas de choix entre deux énoncés, pas de panneau
 * latéral. La vue « complète » rend la main : les deux énoncés proposés, le
 * détail des micro-compétences, la progression.
 *
 * La règle : la vue complète commence AU COLLÈGE, dès la 6e ; le primaire garde
 * la vue simple. Un enfant de CE1 n'a rien à faire d'un tableau de bord, et un
 * entrant de 6e n'a pas à se voir retirer le choix — il vient d'arriver dans
 * un établissement où on lui demande justement d'apprendre à choisir.
 *
 * Les niveaux du CECRL (a1 → c1, pour l'anglais, l'espagnol et l'IA) ne sont
 * pas des classes : ils gardent la vue simple, comme aujourd'hui.
 *
 * ⚠️ Ce fichier n'importe QUE le type `Classe` (effacé à la compilation) :
 * l'inclure ne tire pas la banque de questions dans le bundle de la page.
 */

import type { Classe } from "@/lib/tutor-v4/catalog";

export type TutorDisplayMode = "simple" | "complete";

const CLASSES_MODE_SIMPLE: readonly string[] = [
  "cp",
  "ce1",
  "ce2",
  "cm1",
  "cm2",
  "a1",
  "a2",
  "b1",
  "b2",
  "c1",
];

export function defaultDisplayModeForClasse(
  classe: Classe | string | null | undefined,
): TutorDisplayMode {
  if (!classe) return "simple";
  return CLASSES_MODE_SIMPLE.includes(classe) ? "simple" : "complete";
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
