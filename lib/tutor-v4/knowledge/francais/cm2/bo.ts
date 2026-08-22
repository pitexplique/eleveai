// Compétences BO de français pour la classe de CM2.
// Référence : « Programme de français pour le cycle 3 »,
// BO n° 16 du 17 avril 2025, rubriques « Cours moyen deuxième année ».
//
// ⚠️ LA CULTURE LITTÉRAIRE EST UN DOMAINE À PART — ajouté le 22/08/2026.
// Le sommaire du BO lui donne son propre titre, entre « Lecture » et
// « Écriture », et lui prescrit six entrées nommées au cours moyen. Elle était
// rangée sous la Lecture ; c'est la confusion qui avait laissé les six entrées
// sans micro jusqu'au 11/08. La 6e a été corrigée le 22/08 au matin, le CM2 la
// suit.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BOCM2FL1", label: "Lecture — Fluidité, compréhension et œuvres" },
  { boId: "BOCM2FC1", label: "Culture littéraire et artistique" },
  { boId: "BOCM2FE1", label: "Écriture — Copier, apprendre, produire" },
  { boId: "BOCM2FO1", label: "Oral — Écouter, dire, échanger" },
  { boId: "BOCM2FV1", label: "Vocabulaire — Enrichir, relier, réemployer, écrire" },
  { boId: "BOCM2FG1", label: "Grammaire et orthographe grammaticale" },
];
