// Domaines du programme de français pour la classe de 5e.
// Référence : « Annexe 1 – Programme de français pour le cycle 4 »,
// BO n° 10 du 5 mars 2026 (arrêté du 18 février 2026).
//
// ⚠️ ÉCRIT EN LITTÉRAL DEPUIS LE 24/08/2026, comme `notions.ts` et
// `microSkills.ts` : la 5e s'est détachée de la fabrique du cycle 4
// (`shared/buildCollegeFrancaisSources.ts`), qui sert encore la 4e et la 3e —
// restées sur le programme de 2015 consolidé en 2020 jusqu'en 2027 et 2028.
//
// ⛔ LES SIX `boId` NE CHANGENT PAS. Ils sont écrits dans les notions, dans les
// items de banque et dans les données déjà enregistrées : les renommer perdrait
// le rattachement de tout ce qui existe.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BO5EFRL", label: "Lecture et compréhension" },
  { boId: "BO5EFRC", label: "Culture littéraire et artistique" },
  { boId: "BO5EFRE", label: "Écriture et production de textes" },
  { boId: "BO5EFRO", label: "Oral, mise en voix et échanges" },
  { boId: "BO5EFRV", label: "Vocabulaire et orthographe lexicale" },
  { boId: "BO5EFRG", label: "Grammaire, orthographe grammaticale et conjugaison" },
];
