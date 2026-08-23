// knowledge/bo6eMaths.ts

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BO6N1", label: "Utiliser et comparer des nombres" },
  { boId: "BO6N2", label: "Comprendre fractions et pourcentages" },
  { boId: "BO6N3", label: "Résoudre des problèmes de proportionnalité" },
  { boId: "BO6N4", label: "Pratiquer le calcul mental et posé" },
  // ⛔ AJOUTÉ LE 22/08/2026 : « Algèbre » est une section à part entière du
  // programme de 6e (modèles pré-algébriques, motifs évolutifs), et aucune des
  // quatre rubriques ci-dessus ne la décrit.
  { boId: "BO6N5", label: "Algèbre" },

  { boId: "BO6G1", label: "Grandeurs et mesures" },
  { boId: "BO6G2", label: "Angles" },
  { boId: "BO6G3", label: "Triangles" },
  { boId: "BO6G4", label: "Quadrilatères et symétrie" },
  // ⛔ AJOUTÉ LE 22/08/2026. « La vision dans l'espace » est l'un des deux
  // chapitres du domaine « Espace et géométrie » du programme de 6e, et aucune
  // des quatre rubriques ci-dessus ne pouvait l'accueillir : elles parlent de
  // figures planes. Une notion rangée sous une rubrique qui ne la décrit pas
  // est une notion qu'on ne retrouve plus.
  { boId: "BO6G5", label: "La vision dans l'espace" },

  { boId: "BO6D1", label: "Données" },
  { boId: "BO6P1", label: "Probabilités" },

  { boId: "BO6I1", label: "Initiation à la pensée informatique" },
];
