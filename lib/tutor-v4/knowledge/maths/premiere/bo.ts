// knowledge/maths/premiere/bo.ts
//
// Grands domaines du programme de mathématiques de Première générale pour les
// élèves qui n'ont PAS pris la spécialité maths — le « module spécifique »,
// 1 h 30 par semaine, intégré à l'enseignement scientifique.
//
// À ne pas confondre avec « premiere-spe » (la spécialité, 4 h) : ce sont deux
// classes distinctes dans EleveAI, deux programmes, deux épreuves.
//
// Sources (fournies par Frédéric le 14/08/2026) :
// - le programme EN VIGUEUR, BO n° 27 du 7 juillet 2022 (arrêté du 6-7-2022,
//   NOR MENE2218178A) : trois parties thématiques — information chiffrée,
//   phénomènes aléatoires, phénomènes d'évolution (croissance linéaire,
//   croissance exponentielle, variation instantanée et globale) — et une partie
//   transversale, les automatismes ;
// - le programme RÉNOVÉ « mathématiques intégré à l'enseignement scientifique »,
//   qui garde la même ossature mais ajoute la modélisation quadratique,
//   l'ajustement affine et la répétition d'épreuves de Bernoulli, et n'y fait
//   plus figurer la dérivation ;
// - l'annexe BO du 12 juin 2025 listant les automatismes évaluables à l'épreuve ;
// - les six sujets de l'épreuve anticipée de juin 2026 (Métropole, Antilles,
//   Asie, Polynésie, Amérique du Nord, Centres étrangers).
//
// Les domaines ci-dessous sont l'UNION des deux textes. Décision de Frédéric le
// 14/08/2026 : on suit ce qui tombe à l'épreuve — la dérivée d'un polynôme, le
// nombre dérivé, la tangente, le signe de la dérivée et le tableau de variations
// sont tombés en 2026 (Centres étrangers exercice 2, Asie exercice 3) — sans
// rien retirer de ce que le programme rénové ajoute. Rien ici n'est hors sujet
// pour un élève de première sans spécialité.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

export const bo: KnowledgeBoCompetence[] = [
  { boId: "BOP1AU", label: "Automatismes" },
  { boId: "BOP1IC", label: "Analyse de l'information chiffrée" },
  { boId: "BOP1AL", label: "Phénomènes aléatoires" },
  { boId: "BOP1VL", label: "Variation linéaire" },
  { boId: "BOP1MQ", label: "Modélisation quadratique" },
  { boId: "BOP1VE", label: "Variation exponentielle" },
  { boId: "BOP1DE", label: "Dérivation" },
];
