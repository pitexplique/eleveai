import { matrix6eMaths } from "@/lib/tutor/matrix/matrix6eMaths";
import type { SkillMatrix } from "@/lib/tutor/types";

export async function loadMatrix(classe: string, matiere: string): Promise<SkillMatrix> {
  if (classe !== "6e" || matiere !== "maths") {
    throw new Error("Seule la matrice 6e/maths est disponible dans cette V3.");
  }

  return matrix6eMaths;
}