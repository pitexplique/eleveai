import { matrix6eMaths } from "@/lib/tutor/matrix/matrix6eMaths";
import type { SkillMatrix } from "@/lib/tutor/types";

export async function loadMatrix(classe: string, matiere: string): Promise<SkillMatrix> {
  if (classe === "6e" && matiere === "maths") {
    return matrix6eMaths;
  }

  throw new Error(
    `Aucune matrice pédagogique disponible pour ${classe}/${matiere}. Configuration supportée: 6e/maths.`
  );
}
