import { matrix6eMaths } from "@/lib/tutor-v4/matrix/matrix6eMaths";
import type { SkillMatrix } from "@/lib/tutor-v4/types";

export async function loadMatrixV4(
  classe: string,
  matiere: string
): Promise<SkillMatrix> {

  if (classe === "6e" && matiere === "maths") {
    return matrix6eMaths;
  }

  throw new Error(`Matrix V4 introuvable pour ${classe}/${matiere}`);
}