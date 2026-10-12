// ─── Les courbes de la feuille « Analyse graphique » (première spé) ──────────
//
// ⭐ 12/10/2026. Même principe que la seconde (analyse-graphique-courbes.ts) :
// valeurs ENTIÈRES aux graduations, interpolation monotone, tout se lit. Un cran
// au-dessus : trois sommets, un zéro sans changement de signe, des points
// isolés dans les ensembles de solutions, et une vitesse dont le SIGNE donne le
// sens de variation d'une altitude (le pont vers la dérivée).

import { evaluer, type CourbeNoeuds, type FaitDe } from "@/lib/fiches-exercices/analyse-graphique-courbes";

export { evaluer };

export const COURBES = {
  /** f sur [−4 ; 5] : creux −1 en −1, sommet 2 en 2 ; zéros −2, 0, 4. */
  P1: { xa: -4, ys: [2, 1, 0, -1, 0, 1, 2, 1, 0, -1] },
  /** g sur [−3 ; 5] : touche l'axe en −1 (sommet 0), creux −2 en 1, zéro 3, maximum 2 au bord. */
  P2: { xa: -3, ys: [-2, -1, 0, -1, -2, -1, 0, 1, 2] },
  /** Artisan : B(q), centaines d'euros, q dizaines d'objets, [0 ; 7]. */
  ARTISAN: { xa: 0, ys: [-2, -1, 0, 1, 2, 3, 2, 1] },
  /** Montgolfière : v(t), vitesse verticale en m/s, t minutes, [0 ; 8]. */
  BALLON: { xa: 0, ys: [2, 1, 0, -1, -2, -1, 0, 1, 2] },
  /** Solde commercial : S(t), milliards d'euros, t trimestres, [0 ; 8]. */
  SOLDE: { xa: 0, ys: [-3, -2, -1, 0, 1, 0, -1, -2, -1] },
  /** Barrage : N(t), écart à la cote d'alerte en mètres, t mois, [0 ; 12]. */
  BARRAGE: { xa: 0, ys: [-3, -2, -1, 0, 1, 2, 1, 0, -1, -2, -1, 0, 1] },
} satisfies Record<string, CourbeNoeuds>;

export type NomCourbe = keyof typeof COURBES;

export function points(nom: NomCourbe): [number, number][] {
  const c = COURBES[nom];
  const xb = c.xa + c.ys.length - 1;
  const out: [number, number][] = [];
  for (let k = 0; k <= (xb - c.xa) * 12; k += 1) {
    const x = c.xa + k / 12;
    out.push([Math.round(x * 1000) / 1000, Math.round(evaluer(c, x) * 1000) / 1000]);
  }
  return out;
}

type Fait = FaitDe<NomCourbe>;

export const FAITS: Fait[] = [
  // ★
  { ex: 1, c: "P1", image: [-3, 1] }, { ex: 1, c: "P1", image: [-1, -1] }, { ex: 1, c: "P1", image: [2, 2] }, { ex: 1, c: "P1", image: [5, -1] },
  { ex: 2, c: "P1", antecedents: [1, [-3, 1, 3]] }, { ex: 2, c: "P1", antecedents: [2, [-4, 2]] }, { ex: 2, c: "P1", antecedents: [-1, [-1, 5]] }, { ex: 2, c: "P1", antecedents: [3, []] },
  { ex: 3, c: "P2", antecedents: [0, [-1, 3]] }, { ex: 3, c: "P2", antecedents: [-1, [-2, 0, 2]] }, { ex: 3, c: "P2", antecedents: [2, [5]] }, { ex: 3, c: "P2", antecedents: [1, [4]] },
  { ex: 4, c: "P1", signes: [[-4, -2, 0, 4, 5], "+ 0 − 0 + 0 −"] },
  { ex: 5, c: "P2", variations: [[-3, -1, 1, 5], [-2, 0, -2, 2]] },
  { ex: 6, c: "P1", ensemble: ["≥", 1, "[−4 ; −3] ∪ [1 ; 3]"] }, { ex: 6, c: "P1", ensemble: ["<", 0, "]−2 ; 0[ ∪ ]4 ; 5]"] },
  { ex: 7, c: "P2", signes: [[-3, -1, 3, 5], "− 0 − 0 +"] },
  { ex: 8, c: "P2", image: [5, 2] }, { ex: 8, c: "P2", antecedents: [-2, [-3, 1]] },
  // ★★
  { ex: 9, c: "P1", antecedents: [0, [-2, 0, 4]] }, { ex: 9, c: "P1", antecedents: [2, [-4, 2]] }, { ex: 9, c: "P1", antecedents: [-1, [-1, 5]] },
  { ex: 9, c: "P1", variations: [[-4, -1, 2, 5], [2, -1, 2, -1]] },
  { ex: 11, c: "P2", ensemble: ["≥", 0, "{−1} ∪ [3 ; 5]"] }, { ex: 11, c: "P2", ensemble: ["<", 0, "[−3 ; −1[ ∪ ]−1 ; 3["] },
  { ex: 13, c: "P1", ensemble: ["≤", -1, "{−1} ∪ {5}"] }, { ex: 13, c: "P1", ensemble: [">", -1, "[−4 ; −1[ ∪ ]−1 ; 5["] },
  { ex: 14, c: "SOLDE", ensemble: [">", 0, "]3 ; 5["] }, { ex: 14, c: "SOLDE", signes: [[0, 3, 5, 8], "− 0 + 0 −"] },
  { ex: 14, c: "SOLDE", variations: [[0, 4, 7, 8], [-3, 1, -2, -1]] },
  // ★★★
  { ex: 17, c: "ARTISAN", image: [0, -2] }, { ex: 17, c: "ARTISAN", antecedents: [0, [2]] }, { ex: 17, c: "ARTISAN", signes: [[0, 2, 7], "− 0 +"] },
  { ex: 17, c: "ARTISAN", variations: [[0, 5, 7], [-2, 3, 1]] }, { ex: 17, c: "ARTISAN", ensemble: ["≥", 2, "[4 ; 6]"] },
  { ex: 18, c: "BALLON", ensemble: [">", 0, "[0 ; 2[ ∪ ]6 ; 8]"] }, { ex: 18, c: "BALLON", signes: [[0, 2, 6, 8], "+ 0 − 0 +"] },
  { ex: 18, c: "BALLON", image: [4, -2] },
  { ex: 19, c: "BARRAGE", ensemble: [">", 0, "]3 ; 7[ ∪ ]11 ; 12]"] }, { ex: 19, c: "BARRAGE", variations: [[0, 5, 9, 12], [-3, 2, -2, 1]] },
  { ex: 19, c: "BARRAGE", antecedents: [1, [4, 6, 12]] },
  { ex: 20, c: "P2", antecedents: [-2, [-3, 1]] }, { ex: 20, c: "P2", antecedents: [-1, [-2, 0, 2]] }, { ex: 20, c: "P2", antecedents: [0, [-1, 3]] },
  { ex: 20, c: "P2", antecedents: [1, [4]] },
];
