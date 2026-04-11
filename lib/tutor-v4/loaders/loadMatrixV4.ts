import { matrix6eMaths } from "@/lib/tutor-v4/matrix/matrix6eMaths";
import { matrix5eMaths } from "@/lib/tutor-v4/matrix/matrix5eMaths";
import type { SkillMatrix } from "@/lib/tutor-v4/types";

export async function loadMatrixV4(
  classe: string,
  matiere: string
): Promise<SkillMatrix> {
  if (classe === "6e" && matiere === "maths") {
    return matrix6eMaths;
  }

  if (classe === "5e" && matiere === "maths") {
    return matrix5eMaths;
  }

  throw new Error(`Matrix V4 introuvable pour ${classe}/${matiere}`);
}