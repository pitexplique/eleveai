// ─── Les figures des feuilles « Modélisation quadratique » (1re sans spé) ─────
//
// Écrites le 28/09/2026 pour les quatre feuilles du chapitre BOP1MQ (parabole,
// sommet et axe, variations, racines et signe). C'est `repere()` de
// `figures.tsx`, avec ce qui manquait à une parabole : son AXE DE SYMÉTRIE,
// tracé en pointillés orange (la `verticale` du canvas `fonctionGraphique`,
// que `repere()` ne transmet pas), et une horizontale facultative — la droite
// y = c qui coupe la parabole en deux points symétriques, la méthode du
// programme pour trouver l'axe (« en résolvant f(x) = c »).
//
// ⛔ Mêmes contraintes que `repere()` : cadre 215 × 200 (272 × 272 en `grand`),
// `ymin` < 0, au-delà de 10 unités sur un axe passer `grand`, jamais plus de
// ~15 unités ; le canvas gradue les ENTIERS seulement. Texte NU dans les
// étiquettes (SVG), vrai signe moins « − ».
// ⭐ Les scripts de recalcul RELISENT ces appels dans le source de chaque
// feuille : coefficients, points, axe et horizontale écrits EN CLAIR.

import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { BLEU } from "@/lib/fiches-exercices/figures";

export const VERT = "#16a34a";

/** `q: [a, b, c]` pour ax² + bx + c (a = 0 : une droite) ; `pts` pour une
 *  ligne brisée (un rectangle, un camion sous une arche…). */
export type CourbeParabole = { q?: [number, number, number]; pts?: [number, number][]; couleur?: string };

export const parabole = (
  cadre: [number, number, number, number],
  courbes: CourbeParabole[],
  marques: { x: number; y: number; label?: string }[] = [],
  options: { axe?: number; horizontale?: number; grand?: boolean } = {},
) => {
  const [xmin, xmax, ymin, ymax] = cadre;
  const grand = options.grand ?? false;
  return (
    <div className={`mx-auto w-full ${grand ? "max-w-[17rem] print:max-w-[13rem]" : "max-w-[16rem] print:max-w-[12rem]"}`}>
      <CanvasRenderer
        figure={{
          kind: "fonctionGraphique",
          size: grand ? { width: 272, height: 272 } : { width: 215, height: 200 },
          xmin,
          xmax,
          ymin,
          ymax,
          grille: true,
          courbes: courbes.map((c, i) => {
            const couleur = c.couleur ?? BLEU;
            if (c.q) return { id: `c${i}`, type: "quadratique" as const, a: c.q[0], b: c.q[1], c: c.q[2], couleur };
            const points = (c.pts ?? []).filter(([x]) => x >= xmin && x <= xmax).map(([x, y]) => ({ x, y }));
            return { id: `c${i}`, type: "points" as const, points, couleur };
          }),
          misesEnEvidence: [
            ...(options.axe === undefined ? [] : [{ verticale: { x: options.axe } }]),
            ...(options.horizontale === undefined ? [] : [{ horizontale: { y: options.horizontale } }]),
            ...marques.map((pt) => ({ point: { x: pt.x, y: pt.y, label: pt.label, couleur: "#dc2626" } })),
          ],
        }}
      />
    </div>
  );
};
