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
  // ⭐ AJOUTÉ LE 28/08/2026 avec la notion `puissance_ecriture`. Elles auraient
  // pu se ranger sous BO4N1, mais « Nombres relatifs et calculs » ne nomme pas
  // ce que l'élève travaille : le BO du cycle 4 énonce « Puissance d'un nombre »
  // et « Notation scientifique » comme deux connaissances distinctes des
  // relatifs. Une compétence qui ne se lit pas est une compétence qui ment.
  {
    boId: "BO4N3",
    label: "Puissances et notation scientifique",
  },
  // ⭐ AJOUTÉ LE 30/08/2026 avec la notion `ordre_grandeur`. Même raison que
  // BO4N3 : le BO du cycle 4 énonce « Les préfixes de nano à giga » et
  // « Associer à des objets des ordres de grandeur » comme des connaissances
  // à part, et « Puissances et notation scientifique » ne les nomme pas.
  // ⚠️ Et le contrôle est réel : inventer un `boId` absent d'ici fait échouer
  // `buildKnowledge` — la compétence n'est pas une étiquette libre.
  {
    boId: "BO4N4",
    label: "Ordres de grandeur et préfixes",
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
  // ⭐ AJOUTÉ LE 28/08/2026 avec la notion `prop_echelle`. Le BO range bien
  // l'échelle et l'agrandissement sous « Grandeurs et mesures » (thème C,
  // chapitre « Comprendre l'effet de quelques transformations sur les figures »),
  // mais ce libellé-là ne NOMME pas ce que l'élève travaille. Même raison que
  // BO4N3 pour les puissances : une compétence qui ne se lit pas est une
  // compétence qui ment.
  {
    boId: "BO4M2",
    label: "Agrandissement, réduction et échelles",
  },
  {
    boId: "BO4D1",
    label: "Statistiques",
  },
  {
    boId: "BO4D2",
    label: "Probabilités",
  },
  // ⭐ AJOUTÉ LE 28/08/2026 avec la notion `fonction_dependance`. Le BO range les
  // fonctions dans le thème B, « Organisation et gestion de données, FONCTIONS »,
  // et aucun des libellés existants ne les nommait — ni « Statistiques », ni
  // « Probabilités ». Même raison que BO4N3 pour les puissances.
  {
    boId: "BO4D3",
    label: "Fonctions",
  },
  { boId: "BO4I1", label: "Pensée informatique et algorithmique" }
];