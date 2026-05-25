import { matrixCm1Maths } from "@/lib/tutor-v4/matrix/matrixCm1Maths";
import { matrixCm2Maths } from "@/lib/tutor-v4/matrix/matrixCm2Maths";
import { matrix6eMaths } from "@/lib/tutor-v4/matrix/matrix6eMaths";
import { matrix5eMaths } from "@/lib/tutor-v4/matrix/matrix5eMaths";
import { matrix4eMaths } from "@/lib/tutor-v4/matrix/matrix4eMaths";
import { matrix3eMaths } from "@/lib/tutor-v4/matrix/matrix3eMaths";
import { matrixTerminaleSpeMaths } from "@/lib/tutor-v4/matrix/matrixTerminaleSpeMaths";

import type { SkillMatrix } from "@/lib/tutor-v4/types";

export async function loadMatrixV4(
  classe: string,
  matiere: string
): Promise<SkillMatrix> {

  if (classe === "cm1" && matiere === "maths") {
    return matrixCm1Maths;
  }

  if (classe === "cm2" && matiere === "maths") {
    return matrixCm2Maths;
  }

  if (classe === "6e" && matiere === "maths") {
    return matrix6eMaths;
  }

  if (classe === "5e" && matiere === "maths") {
    return matrix5eMaths;
  }

  if (classe === "4e" && matiere === "maths") {
    return matrix4eMaths;
  }

  if (classe === "3e" && matiere === "maths") {
    return matrix3eMaths;
  }
    if (classe === "terminale-spe" && matiere === "maths") {
    return matrixTerminaleSpeMaths;
  }

  throw new Error(`Matrix V4 introuvable pour ${classe}/${matiere}`);
}