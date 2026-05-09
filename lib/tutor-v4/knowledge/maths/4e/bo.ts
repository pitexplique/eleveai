// knowledge/maths/4e/bo.ts
//
// Compétences BO de mathématiques pour la classe de 4e.
// Ce fichier est aligné avec la structure 5e (mêmes types, même logique).
//
// Objectif :
// - garder une cohérence verticale 6e → 5e → 4e ;
// - permettre une exploitation directe dans Tutor V4 ;
// - éviter toute refonte ultérieure.
//
// Choix :
// - granularité identique à la 5e ;
// - séparation claire : Nombres / Algèbre / Géométrie / Données.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  {
    boId: "BO4N1",
    label: "Nombres relatifs et calculs",
  },
  {
    boId: "BO4N2",
    label: "Fractions et nombres rationnels",
  },
  {
    boId: "BO4P1",
    label: "Proportionnalité",
  },
  {
    boId: "BO4A1",
    label: "Calcul littéral et algébrique",
  },
  {
    boId: "BO4G1",
    label: "Géométrie plane",
  },
  {
    boId: "BO4G2",
    label: "Géométrie dans l’espace",
  },
  {
    boId: "BO4M1",
    label: "Grandeurs et mesures",
  },
  {
    boId: "BO4D1",
    label: "Statistiques",
  },
  {
    boId: "BO4D2",
    label: "Probabilités",
  },
  { boId: "BO4I1", label: "Pensée informatique et algorithmique" }
];