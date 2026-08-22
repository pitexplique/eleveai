// Compétences BO de français pour la classe de 6e.
// Référence : « Programme de français pour le cycle 3 »,
// BO n° 16 du 17 avril 2025 — la 6e y est la TROISIÈME année du cycle,
// à côté du CM1 et du CM2, dans le même texte et le même tableau.
//
// ─── LA 6e SORT DE LA FABRIQUE COLLÈGE (22/08/2026) ───────────────────────────
// Jusqu'ici, `bo`, `notions` et `microSkills` de la 6e étaient produits par
// `shared/buildCollegeFrancaisSources.ts`, le module qui sert aussi la 5e, la 4e
// et la 3e — avec un bloc `if (level === "6e")` pour rattraper ce qui manquait.
// C'était le mauvais parent : la 6e ne suit pas le programme du cycle 4, elle
// FERME le cycle 3. Les trois fichiers sont donc écrits ici, en littéral, comme
// ceux du CM1 et du CM2, et se relisent directement sur le texte du BO.
//
// ⚠️ LA CULTURE LITTÉRAIRE EST UN DOMAINE À PART, pas une sous-partie de la
// Lecture : le sommaire du BO lui donne son propre titre, entre « Lecture » et
// « Écriture », et lui prescrit CINQ entrées nommées en 6e.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BO6EFRL", label: "Lecture — Fluidité, compréhension et œuvres" },
  { boId: "BO6EFRC", label: "Culture littéraire et artistique" },
  { boId: "BO6EFRE", label: "Écriture — Écrire à la main, pour apprendre, pour produire" },
  { boId: "BO6EFRO", label: "Oral — Écouter, dire, échanger" },
  { boId: "BO6EFRV", label: "Vocabulaire — Enrichir, relier, réemployer, écrire" },
  { boId: "BO6EFRG", label: "Grammaire et orthographe grammaticale" },
];
