// knowledge/maths/3e/bo.ts
//
// Compétences BO de mathématiques pour la classe de 3e.
// Fichier aligné avec la structure 5e / 4e.
//
// Objectif :
// - garder une cohérence verticale 6e → 5e → 4e → 3e ;
// - permettre une exploitation directe dans Tutor V4 ;
// - préparer les notions communes et progressives du cycle 4 ;
// - éviter une granularité trop fine dans le BO,
//   qui sera plutôt portée par notions.ts et microSkills.ts.
//
// Choix :
// - structure proche de la 4e ;
// - ajout explicite de fonctions, car elles deviennent centrales en 3e ;
// - ajout explicite de pensée informatique, car le BO 2026 l’identifie comme un domaine du cycle 4 ;
// - séparation Géométrie plane / Espace / Grandeurs pour garder les volumes lisibles ;
// - probabilités séparées des statistiques pour permettre des banks différentes.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [

  
    { "boId": "BO3N1", "label": "Nombres rationnels, puissances et racines carrées" },
    { "boId": "BO3N2", "label": "Multiples, diviseurs et arithmétique" },
    { "boId": "BO3P1", "label": "Proportionnalité" },
    { "boId": "BO3F1", "label": "Fonctions" },
    { "boId": "BO3A1", "label": "Calcul littéral et algébrique" },
    { "boId": "BO3G1", "label": "Géométrie plane" },
    { "boId": "BO3G2", "label": "Géométrie dans l’espace" },
    { "boId": "BO3M1", "label": "Grandeurs et mesures" },
    { "boId": "BO3D1", "label": "Statistiques" },
    { "boId": "BO3D2", "label": "Probabilités" },
    { "boId": "BO3I1", "label": "Pensée informatique et algorithmique" }
  ];