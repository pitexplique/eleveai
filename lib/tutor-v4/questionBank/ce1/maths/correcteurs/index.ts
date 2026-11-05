// Correcteurs des gabarits de maths de CE1 (05/11/2026) : même contrat que la 6e
// (voir lib/tutor-v4/questionBank/6e/maths/correcteurs/types.ts). Seuls les gabarits
// ajoutés depuis ont un correcteur : le vérificateur se lance donc en CE1 sur des
// micros nommées, pas sur toute la classe.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { CORRECTEURS as trierClasser } from "./trier-classer";

export const CORRECTEURS_CE1: CorrecteursMaths = {
  ...trierClasser,
};
