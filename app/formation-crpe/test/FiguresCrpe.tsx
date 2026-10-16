// LES FIGURES DU TEST CRPE (16/10/2026).
//
// Frédéric : « as-tu mis des exemples de Pythagore et Thalès en schéma ? »,
// puis « utilise canvas ». Les figures passent donc par le moteur du coach
// (`CanvasRenderer`, lib/canvas) — mêmes dessins que ceux que les candidats
// retrouveront dans le coach et les fiches, et rien à maintenir en double.
//
// ⛔ CHAQUE FIGURE MONTRE LA SITUATION SANS SOUFFLER LA RÉPONSE :
// - Pythagore : PAS de `rightAngleAt` — la question demande si le triangle
//   est rectangle. Points à l'échelle 5 : 12 : 13.
// - Médiane : les notes dans l'ordre DONNÉ, non rangées (c'est le piège).
// - Dés : les six faces d'un dé, pas les 36 issues. Le tableau des 36 issues,
//   qui donne la réponse, n'apparaît qu'avec la CORRECTION (`des-tableau`).

import { CanvasRenderer } from "@/lib/canvas";
import type { CanvasFigure } from "@/lib/tutor-v4/types";

const FACES = [1, 2, 3, 4, 5, 6];

const FIGURES = {
  pythagore: {
    kind: "triangle",
    // ⚠️ TriangleCanvas plafonne à 240 px d'affichage : le cadre est resserré
    // autour du dessin pour qu'il remplisse cette largeur au lieu d'y flotter.
    size: { width: 270, height: 150 },
    // 12 cm → 200 px, 5 cm → 83 px : le rapport 12/5 est respecté.
    points: { A: { x: 46, y: 122 }, B: { x: 246, y: 122 }, C: { x: 46, y: 39 } },
    display: { showPoints: true, showLabels: true, showSides: true },
    sideLabels: { AB: "12 cm", CA: "5 cm", BC: "13 cm" },
  },
  thales: {
    kind: "thales",
    variant: "triangle",
    // ⚠️ Points À L'ÉCHELLE : par défaut le moteur pose M vers le quart de
    // [AB], or AM = 3 et AB = 5 le mettent aux 3/5. M = A + 0,6 (B − A),
    // N = A + 0,6 (C − A) : (MN) reste parallèle à (BC).
    points: {
      A: { x: 40, y: 230 },
      B: { x: 300, y: 230 },
      C: { x: 210, y: 40 },
      M: { x: 196, y: 230 },
      N: { x: 142, y: 116 },
    },
    labels: { A: "A", B: "B", C: "C", M: "M", N: "N" },
    sideLabels: { AM: "3 cm", AB: "5 cm", BC: "10 cm", MN: "?" },
    display: {
      showPoints: true,
      showLabels: true,
      showSideLabels: true,
      showParallelMarks: true,
      highlightParallel: true,
      showFormula: false, // la formule, c'est la réponse
    },
  },
  echelle: {
    kind: "echelle",
    variant: "distance_reelle",
    echelleLabel: "1/25 000",
    planDistance: "6 cm",
    reelDistance: "?",
    points: { start: "Village A", end: "Village B" },
    display: { showEchelle: true, showLabels: true, showQuestion: true },
  },
  mediane: {
    kind: "tableau_donnees",
    headers: ["n° 1", "n° 2", "n° 3", "n° 4", "n° 5"],
    rows: [{ values: [8, 10, 15, 9, 18] }],
  },
  des: {
    kind: "probabilites",
    variant: "de",
    de: { faces: [1, 2, 3, 4, 5, 6] },
  },
  "des-tableau": {
    kind: "probabilites",
    variant: "tableau",
    tableau: {
      entetes: ["dé 1 \\ dé 2", ...FACES.map(String)],
      lignes: FACES.map((a) => [String(a), ...FACES.map((b) => String(a + b))]),
      // Ligne r (dé 1 = r + 1), colonne c (dé 2 = c) : la somme vaut 7 quand c = 6 − r.
      casesSurlignees: FACES.map((_, r) => [r, 6 - r] as [number, number]),
    },
  },
} satisfies Record<string, CanvasFigure>;

export type NomFigure = keyof typeof FIGURES;

export default function FigureCrpe({ figure }: { figure: NomFigure }) {
  return (
    <div className="mt-5">
      <CanvasRenderer figure={FIGURES[figure]} />
    </div>
  );
}
