// knowledge/maths/stmg/bo.ts
//
// Grands domaines du programme de mathématiques du CYCLE TERMINAL de la voie
// technologique — première et terminale réunies en une seule classe EleveAI.
//
// Décision de Frédéric le 15/08/2026 : « on en fera qu'un ». Le programme est
// écrit comme un cycle de deux ans (« les différents thèmes proposés doivent
// être travaillés tout au long des deux années »), les automatismes sont une
// liste unique enrichie en terminale, et les suites commencent en première pour
// se terminer en terminale. Deux classes auraient coupé au milieu des notions.
//
// Sources — les deux annexes du BO, lues intégralement le 15/08/2026 :
// - « Programme de mathématiques de première technologique, séries STD2A,
//   STHR, STI2D, STL, STMG et ST2S » ;
// - « Programme de mathématiques de terminale technologique ».
//
// ⚠️ Le programme est COMMUN à toutes les séries technologiques. Seule la série
// STD2A diverge : elle remplace « algorithmique et programmation » par des
// activités géométriques. Cette classe est nommée `stmg` parce que c'est la
// série visée, mais son contenu vaut pour ST2S, STL, STI2D et STHR.
//
// ⛔ Trois interdits, écrits noir sur blanc dans le texte, à tenir dans CHAQUE
//    item :
//    · « le calcul des racines à l'aide du discriminant ne figure pas au
//      programme » — les racines d'un degré 2 s'obtiennent par la forme
//      factorisée, ou sont évidentes ;
//    · les suites géométriques sont à TERMES STRICTEMENT POSITIFS ;
//    · « la mise sous forme canonique n'est pas un attendu ».
//
// ⚠️ Deux frontières première/terminale que le texte pose explicitement, et
//    qu'il ne faut pas gommer :
//    · le TERME GÉNÉRAL d'une suite est en terminale — « en classe de première,
//      il convient de faire fonctionner la définition par récurrence ;
//      l'expression en fonction de n du terme général est étudiée en classe
//      terminale » ;
//    · en première, la probabilité conditionnelle se calcule UNIQUEMENT sur un
//      tableau croisé — « la représentation à l'aide d'un arbre de probabilités
//      et la formule des probabilités totales relèvent du programme de la
//      classe terminale ».

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "STMGAU", label: "Automatismes" },
  { boId: "STMGSU", label: "Suites numériques" },
  { boId: "STMGFO", label: "Fonctions et polynômes" },
  { boId: "STMGDE", label: "Dérivation" },
  { boId: "STMGEX", label: "Exponentielles et logarithme décimal" },
  { boId: "STMGDC", label: "Données croisées" },
  { boId: "STMGST", label: "Statistique à deux variables" },
  { boId: "STMGPR", label: "Probabilités conditionnelles" },
  { boId: "STMGVA", label: "Variables aléatoires et loi binomiale" },
  { boId: "STMGAL", label: "Algorithmique, tableur et logique" },
];
