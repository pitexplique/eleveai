// lib/tutor-v4/questionBank/cm2/maths/contenance.bank.ts
//
// ⭐ 15/11/2026 — Les contenances du CM2 : les gabarits sont dans
// `contenance-outils.ts` (décimaux, hL, dL, problèmes à étapes ; vocabulaire de
// la vidéo `manim/scripts/cm2/contenance.py`). Ici ne restent que les items
// figés justes à quatre choix, dont les trois exemples de la vidéo (1 L contre
// 500 mL, 1,5 L = 1 500 mL, 1 L de jus + 750 mL de sirop). Retirés : les QCM
// « oui / non », les choix « Impossible », les réponses courtes sans unité, le
// canvas « comparaison » qui donnait la réponse, et les anciens gabarits
// (15 à 28 squelettes par micro).

import type { TutorBankItemV4, ContenanceCanvasData } from "@/lib/tutor-v4/types";
import {
  contenanceComparerGabarits,
  contenanceConvertirGabarits,
  contenanceDefiGabarits,
  contenanceEstimerGabarits,
} from "./contenance-outils";

function contenanceCanvas(data: Omit<ContenanceCanvasData, "kind">): ContenanceCanvasData {
  return { kind: "contenance", ...data };
}

const itemsFiges: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm2_contenance_comparer_fixed_v1_1l_500ml",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Qu'est-ce qui contient le plus : une bouteille de 1 L ou une gourde de 500 mL ?",
    format: "qcm",
    choices: ["la bouteille de 1 L", "la gourde de 500 mL", "les deux contiennent autant", "on ne peut pas comparer des L et des mL"],
    expected: ["la bouteille de 1 L"],
    comparator: "mcq_exact",
    hint: "Même unité d'abord : 1 L = 1 000 mL.",
    explanation: "Méthode : même unité d'abord.\n\nCalcul : 1 L = 1 000 mL, et 1 000 mL est plus que 500 mL.\n\nConclusion : la bouteille de 1 L contient le plus.",
    canvas: contenanceCanvas({
      variant: "objets",
      objets: [
        { label: "Bouteille", icon: "🧴", contenance: "1 L" },
        { label: "Gourde", icon: "🚰", contenance: "500 mL" },
      ],
      questionLabel: "Laquelle contient le plus ?",
      display: { showContenances: true, showLabels: true, showComparison: false },
    }),
    tags: ["cm2", "contenance", "contenance_comparer", "video", "qcm"],
  },
  {
    kind: "fixed",
    id: "cm2_contenance_convertir_fixed_v1_1_5l",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Une grande bouteille contient 1,5 L. Combien de millilitres cela fait-il ?",
    format: "qcm",
    choices: ["1 500 mL", "150 mL", "15 mL", "1 005 mL"],
    expected: ["1 500 mL"],
    comparator: "mcq_exact",
    hint: "1 L = 1 000 mL : on multiplie par 1 000.",
    explanation: "Méthode : des litres vers les millilitres, on multiplie par 1 000.\n\nCalcul : 1,5 × 1 000 = 1 500 (1 L = 1 000 mL et 0,5 L = 500 mL).\n\nConclusion : 1,5 L = 1 500 mL.",
    canvas: contenanceCanvas({ variant: "conversion", from: "1,5 L", to: "?", questionLabel: "Combien de millilitres ?" }),
    tags: ["cm2", "contenance", "contenance_convertir", "video", "qcm"],
  },
  {
    kind: "fixed",
    id: "cm2_contenance_convertir_fixed_v2_250ml",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Un verre contient 250 mL. Combien de litres cela fait-il ?",
    format: "qcm",
    choices: ["0,25 L", "2,5 L", "25 L", "250 L"],
    expected: ["0,25 L"],
    comparator: "mcq_exact",
    hint: "1 000 mL = 1 L : on divise par 1 000.",
    explanation: "Méthode : des millilitres vers les litres, on divise par 1 000.\n\nCalcul : 250 ÷ 1 000 = 0,25.\n\nConclusion : 250 mL = 0,25 L.",
    canvas: contenanceCanvas({ variant: "conversion", from: "250 mL", to: "?", questionLabel: "Combien de litres ?" }),
    tags: ["cm2", "contenance", "contenance_convertir", "qcm"],
  },
  {
    kind: "fixed",
    id: "cm2_contenance_estimer_fixed_v1_verre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle contenance est la plus raisonnable pour un verre d'eau ?",
    format: "qcm",
    choices: ["250 mL", "25 L", "250 L", "2 mL"],
    expected: ["250 mL"],
    comparator: "mcq_exact",
    hint: "Un verre contient une petite quantité de liquide.",
    explanation: "Méthode : estimer, c'est choisir une contenance raisonnable (pas exacte).\n\nCalcul : un verre contient environ 250 mL ; une bouteille 1,5 L ; un seau 10 L.\n\nConclusion : la contenance raisonnable est 250 mL.",
    canvas: contenanceCanvas({ variant: "estimation", objet: { label: "Verre", icon: "🥛" }, questionLabel: "Quelle contenance est raisonnable ?", display: { showLabels: true } }),
    tags: ["cm2", "contenance", "contenance_estimer", "video", "qcm"],
  },
  {
    kind: "fixed",
    id: "cm2_contenance_estimer_fixed_v2_seau",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle contenance est la plus raisonnable pour un seau ?",
    format: "qcm",
    choices: ["10 L", "10 mL", "1 000 L", "10 cL"],
    expected: ["10 L"],
    comparator: "mcq_exact",
    hint: "Un seau, c'est à peu près 7 grandes bouteilles d'eau.",
    explanation: "Méthode : on compare à des repères.\n\nCalcul : un seau contient environ 10 L ; 10 mL, ce serait deux petites cuillères ; 1 000 L, une grosse citerne.\n\nConclusion : la contenance raisonnable est 10 L.",
    canvas: contenanceCanvas({ variant: "estimation", objet: { label: "Seau", icon: "🪣" }, questionLabel: "Quelle contenance est raisonnable ?", display: { showLabels: true } }),
    tags: ["cm2", "contenance", "contenance_estimer", "video", "qcm"],
  },
  {
    kind: "fixed",
    id: "cm2_contenance_defi_fixed_v1_jus_sirop",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Pour le goûter, on a une brique de jus de 1 L et une bouteille de sirop de 750 mL. Quelle est la contenance totale, en mL ?",
    format: "qcm",
    choices: ["1 750 mL", "751 mL", "850 mL", "7 501 mL"],
    expected: ["1 750 mL"],
    comparator: "mcq_exact",
    hint: "Mets tout en millilitres d'abord.",
    explanation: "Méthode : même unité d'abord : 1 L = 1 000 mL.\n\nCalcul : 1 000 + 750 = 1 750.\n\nConclusion : en tout, 1 750 mL.",
    canvas: contenanceCanvas({
      variant: "objets",
      objets: [
        { label: "Brique de jus", icon: "🧃", contenance: "1 L" },
        { label: "Sirop", icon: "🧴", contenance: "750 mL" },
      ],
      questionLabel: "Combien de mL en tout ?",
      display: { showContenances: true, showLabels: true, showComparison: false },
    }),
    tags: ["cm2", "contenance", "contenance_defi", "video", "qcm"],
  },
];

export const contenancesBank: TutorBankItemV4[] = [
  ...itemsFiges,
  ...contenanceComparerGabarits,
  ...contenanceConvertirGabarits,
  ...contenanceEstimerGabarits,
  ...contenanceDefiGabarits,
];
