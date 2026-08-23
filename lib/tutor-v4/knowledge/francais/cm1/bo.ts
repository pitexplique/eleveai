// Compétences BO de français pour la classe de CM1.
// Référence : « Programme de français pour le cycle 3 »,
// BO n° 16 du 17 avril 2025, rubriques « Cours moyen première année ».
//
// ⚠️ LA CULTURE LITTÉRAIRE EST UN DOMAINE À PART — ajouté le 22/08/2026.
// Le sommaire du BO lui donne son propre titre, entre « Lecture » et
// « Écriture », et lui prescrit six entrées nommées au cours moyen. Elle était
// rangée sous la Lecture ; c'est la confusion qui avait laissé les six entrées
// sans micro jusqu'au 11/08. La 6e et le CM2 ont été corrigés le 22/08, le CM1
// les suit — les trois classes lisent le même texte.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BOCM1FL1", label: "Lecture — Fluidité, compréhension et œuvres" },
  { boId: "BOCM1FC1", label: "Culture littéraire et artistique" },
  { boId: "BOCM1FE1", label: "Écriture — Copier, apprendre, produire" },
  { boId: "BOCM1FO1", label: "Oral — Écouter, dire, échanger" },
  { boId: "BOCM1FV1", label: "Vocabulaire — Enrichir, relier, réemployer, écrire" },
  { boId: "BOCM1FG1", label: "Grammaire et orthographe grammaticale" },
];
