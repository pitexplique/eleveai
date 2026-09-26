// lib/automatismes/cm1.ts
//
// Automatismes de CM1 — 26/09/2026.
//
// ⭐ RÉFÉRENCE : la rubrique « Calcul mental » du CM1 dans le programme du
// cycle 3 (BO n° 16 du 17 avril 2025, en vigueur au CM1 depuis la rentrée
// 2025) — voir l'en-tête de cm2.ts. Les générateurs sont ceux du CM2,
// appelés avec les LIMITES du CM1 :
// - mémoriser : faits numériques usuels (entiers), relations entre fractions
//   usuelles, leur écriture décimale ;
// - numération : ajouter ou soustraire, sans retenue, un nombre entier < 10
//   d'unités, de dizaines, de centaines, de dixièmes ou de centièmes à un
//   décimal ; un entier × 10, 100, 1 000 ; un décimal × 10 et ÷ 10 ;
// - procédures : ± 8, 9, 18, 19, 28, 29, 38, 39 ; un chiffre × des dizaines
//   ou des centaines ; un entier × 4 ou × 8 ; un entier × 5 ; distributivité
//   simple.
// ⛔ Pas au CM1 : la moitié des impairs, ÷ 100 et ÷ 1 000 d'un décimal,
// l'addition de deux décimaux, 30 × 400, ÷ 4 et ÷ 8, × 50 — c'est le CM2.

import type { AutoNiveau } from "./types";
import {
  ajouterAuDecimal,
  dizainesCentaines,
  distributivite,
  faitsNumeriques,
  fois10,
  foisCinq,
  fractionsUsuelles,
  plusNeuf,
  quatreHuit,
  tables,
} from "./cm2";

export const automatismesCm1: AutoNiveau = {
  classe: "cm1",
  label: "CM1",
  duree: 10,
  examen: "Pas d'épreuve en CM1 : le calcul mental que le programme demande (faits numériques et procédures), de tête, sans calculatrice",
  nbQuestions: 10,
  themes: [
    // Mémoriser des faits numériques
    { id: "tables", label: "Tables de multiplication", generateurs: [tables] },
    { id: "faits", label: "Doubles, moitiés, compléments", generateurs: [faitsNumeriques("cm1")] },
    { id: "fractions", label: "Fractions usuelles", generateurs: [fractionsUsuelles("cm1")] },
    // Utiliser la numération
    { id: "numeration", label: "Ajouter à un décimal", generateurs: [ajouterAuDecimal("cm1")] },
    { id: "fois10", label: "× 10, 100, 1 000 et ÷ 10", generateurs: [fois10("cm1")] },
    // Procédures
    { id: "plus9", label: "Ajouter, soustraire 9, 19… 39", generateurs: [plusNeuf("cm1")] },
    { id: "zeros", label: "Multiplier par des dizaines, des centaines", generateurs: [dizainesCentaines("cm1")] },
    { id: "quatrehuit", label: "Multiplier par 4 ou par 8", generateurs: [quatreHuit("cm1")] },
    { id: "cinq", label: "Multiplier par 5", generateurs: [foisCinq("cm1")] },
    { id: "distributivite", label: "Décomposer pour multiplier", generateurs: [distributivite] },
  ],
};
