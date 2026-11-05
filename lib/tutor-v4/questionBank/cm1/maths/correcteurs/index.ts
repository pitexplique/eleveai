// Correcteurs des gabarits de maths de CM1 (05/11/2026) : même contrat que la 6e
// (voir lib/tutor-v4/questionBank/6e/maths/correcteurs/types.ts). Seuls les gabarits
// ajoutés depuis ont un correcteur : le vérificateur se lance donc en CM1 sur des
// micros nommées, pas sur toute la classe.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { CORRECTEURS as nombresEntiers } from "./nombres-entiers-trous";
import { CORRECTEURS as fractionsDecimaux } from "./fractions-decimaux-trous";
import { CORRECTEURS as calcul } from "./calcul-trous";
import { CORRECTEURS as geometrie } from "./geometrie-trous";
import { CORRECTEURS as trierClasser } from "./trier-classer";
import { correcteursAngleReconnaitre } from "@/lib/tutor-v4/questionBank/cm2/maths/correcteurs/angle-reconnaitre";
import { correcteursAnglesRepere } from "@/lib/tutor-v4/questionBank/cm2/maths/correcteurs/angles-repere-droit";
import { correcteursPropRenfort } from "@/lib/tutor-v4/questionBank/cm2/maths/correcteurs/proportionnalite-renfort";

export const CORRECTEURS_CM1: CorrecteursMaths = {
  ...nombresEntiers,
  ...fractionsDecimaux,
  ...calcul,
  ...geometrie,
  ...trierClasser,
  ...correcteursAngleReconnaitre("cm1"),
  ...correcteursAnglesRepere("cm1"),
  ...correcteursPropRenfort("cm1"),
};
