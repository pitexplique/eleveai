import { matrixCpMaths } from "@/lib/tutor-v4/matrix/matrixCpMaths";
import { matrixCe1Maths } from "@/lib/tutor-v4/matrix/matrixCe1Maths";
import { matrixCe2Maths } from "@/lib/tutor-v4/matrix/matrixCe2Maths";
import { matrixCm1Maths } from "@/lib/tutor-v4/matrix/matrixCm1Maths";
import { matrixCm2Maths } from "@/lib/tutor-v4/matrix/matrixCm2Maths";
import { matrix6eMaths } from "@/lib/tutor-v4/matrix/matrix6eMaths";
import { matrix5eMaths } from "@/lib/tutor-v4/matrix/matrix5eMaths";
import { matrix4eMaths } from "@/lib/tutor-v4/matrix/matrix4eMaths";
import { matrix3eMaths } from "@/lib/tutor-v4/matrix/matrix3eMaths";
import { matrixTerminaleSpeMaths } from "@/lib/tutor-v4/matrix/matrixTerminaleSpeMaths";
import { matrixAdulteMaths } from "@/lib/tutor-v4/matrix/matrixAdulteMaths";
import { matrixCpFrancais } from "@/lib/tutor-v4/matrix/matrixCpFrancais";
import { matrixCe1Francais } from "@/lib/tutor-v4/matrix/matrixCe1Francais";
import { matrixCe2Francais } from "@/lib/tutor-v4/matrix/matrixCe2Francais";
import { matrixCm1Francais } from "@/lib/tutor-v4/matrix/matrixCm1Francais";
import { matrixCm2Francais } from "@/lib/tutor-v4/matrix/matrixCm2Francais";
import { matrix6eFrancais } from "@/lib/tutor-v4/matrix/matrix6eFrancais";
import { matrix5eFrancais } from "@/lib/tutor-v4/matrix/matrix5eFrancais";
import { matrix4eFrancais } from "@/lib/tutor-v4/matrix/matrix4eFrancais";
import { matrix3eFrancais } from "@/lib/tutor-v4/matrix/matrix3eFrancais";

import type { SkillMatrix } from "@/lib/tutor-v4/types";

export async function loadMatrixV4(
  classe: string,
  matiere: string
): Promise<SkillMatrix> {

  if (classe === "cp" && matiere === "maths") {
    return matrixCpMaths;
  }

  if (classe === "ce1" && matiere === "maths") {
    return matrixCe1Maths;
  }

  if (classe === "ce2" && matiere === "maths") {
    return matrixCe2Maths;
  }

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

  if (classe === "adulte" && matiere === "maths") {
    return matrixAdulteMaths;
  }

  if (classe === "cp"  && matiere === "francais") return matrixCpFrancais;
  if (classe === "ce1" && matiere === "francais") return matrixCe1Francais;
  if (classe === "ce2" && matiere === "francais") return matrixCe2Francais;
  if (classe === "cm1" && matiere === "francais") return matrixCm1Francais;
  if (classe === "cm2" && matiere === "francais") return matrixCm2Francais;
  if (classe === "6e" && matiere === "francais") return matrix6eFrancais;
  if (classe === "5e" && matiere === "francais") return matrix5eFrancais;
  if (classe === "4e" && matiere === "francais") return matrix4eFrancais;
  if (classe === "3e" && matiere === "francais") return matrix3eFrancais;

  throw new Error(`Matrix V4 introuvable pour ${classe}/${matiere}`);
}
