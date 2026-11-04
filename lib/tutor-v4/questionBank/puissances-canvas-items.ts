// Les gabarits À CANVAS des puissances, branchés en 4e, 3e et 2de (04/11/2026).
// Générateurs : ./puissances-canvas-commun.ts (carré quadrillé, cube, arbre,
// table des puissances de 10). Seulement aux premières étoiles de « comprendre »
// et des puissances de 10 : là où le dessin fait comprendre l'écriture.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { genArbreChemins, genCarreQuadrillage, genCubeVolume, genPuissanceZero, genTableDix } from "./puissances-canvas-commun";

type Spec = [microId: string, difficulty: number, generate: () => any, hint: string];

const H_ECR = "L’exposant compte combien de fois le nombre est écrit en facteur.";
const H_DIX = "D’une ligne à l’autre, on multiplie ou on divise par 10.";
const H_ZERO = "En descendant d’une puissance, on divise par la base : a¹ ÷ a = 1.";

function construire(niveau: "4e" | "3e" | "seconde", notionId: string, specs: Spec[]): TutorBankItemV4[] {
  const rang: Record<string, number> = {};
  return specs.map(([microId, difficulty, generate, hint]) => {
    const cle = `${microId}_${difficulty}`;
    rang[cle] = (rang[cle] ?? 0) + 1;
    return {
      kind: "template",
      id: `${niveau}_puiss_canvas_${cle}_${rang[cle]}`,
      niveau,
      matiere: "maths",
      notionId,
      microId,
      difficulty,
      theme: "neutral",
      hint,
      tags: ["puissances", "canvas", "template"],
      generate,
    } as TutorBankItemV4;
  });
}

export const puissancesCanvas4e = construire("4e", "puissance_ecriture", [
  ["puissance_comprendre", 1, genCarreQuadrillage, H_ECR],
  ["puissance_comprendre", 1, genCubeVolume, H_ECR],
  ["puissance_comprendre", 1, genArbreChemins, H_ECR],
  ["puissance_comprendre", 1, () => genPuissanceZero(), H_ZERO],
  ["puissance_dix", 1, () => genTableDix(), H_DIX],
  ["puissance_dix", 2, () => genTableDix(), H_DIX],
  ["puissance_dix", 2, () => genPuissanceZero(), H_ZERO],
  // ⚠️ Pas à ★2 : seul gabarit de l'étoile, il y tournait en boucle (8 répétitions sur 20).
  ["puissance_exposant_negatif", 3, () => genTableDix({ negatifs: true }), H_DIX],
]);

export const puissancesCanvas3e = construire("3e", "entier_puissance", [
  ["entier_puissance_comprendre", 1, genCarreQuadrillage, H_ECR],
  ["entier_puissance_comprendre", 1, genCubeVolume, H_ECR],
  ["entier_puissance_comprendre", 2, genArbreChemins, H_ECR],
  ["entier_puissance_comprendre", 2, () => genPuissanceZero({ regles: true }), H_ZERO],
  ["entier_puissance_calculer", 1, () => genPuissanceZero(), H_ZERO],
  ["entier_puissance_dix", 1, () => genTableDix(), H_DIX],
  ["entier_puissance_dix", 3, () => genTableDix({ negatifs: true }), H_DIX],
]);

export const puissancesCanvas2de = construire("seconde", "puissances_2de", [
  ["puiss_calcul", 1, genArbreChemins, H_ECR],
  ["puiss_calcul", 1, genCubeVolume, H_ECR],
  ["puiss_calcul", 2, () => genPuissanceZero({ regles: true }), H_ZERO],
  ["puiss_produit_quotient", 2, () => genPuissanceZero({ regles: true }), H_ZERO],
  ["puiss_exposant_negatif", 2, () => genTableDix({ negatifs: true }), H_DIX],
]);
