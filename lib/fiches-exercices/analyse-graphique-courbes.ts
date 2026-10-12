// ─── Les courbes de la feuille « Analyse graphique » (seconde) ───────────────
//
// ⭐ 12/10/2026. Une courbe = des valeurs ENTIÈRES aux abscisses entières, reliées
// par l'interpolation MONOTONE de Fritsch–Carlson — la même que le coach
// (lib/tutor-v4/questionBank/analyse-graphique-commun.ts) et que la vidéo
// (manim/scripts/seconde/analyse_graphique_2de.py). Entre deux graduations, la
// courbe ne fait que monter ou que descendre : les sommets tombent sur le
// quadrillage, et tout se LIT sans approximation.
// ⛔ Les pas sont de 1 : chaque valeur entière atteinte l'est EN un nœud, donc
// toute équation f(x) = k (k entier) se lit exactement.
//
// Ce module ne contient pas de React : le vérificateur
// (scripts/verifier-exercices-analyse-graphique.ts) le relit tel quel.

export type CourbeNoeuds = { xa: number; ys: number[] };

export const COURBES = {
  /** f sur [−3 ; 4] : une bosse, maximum 2 en 1, zéros −1 et 3. */
  C1: { xa: -3, ys: [-2, -1, 0, 1, 2, 1, 0, -1] },
  /** g sur [−4 ; 3] : un creux, minimum −2 en 0, zéros −2 et 2. */
  C2: { xa: -4, ys: [2, 1, 0, -1, -2, -1, 0, 1] },
  /** h sur [−2 ; 5] : creux −1 en 1, sommet 2 en 4, zéros 0 et 2. */
  C3: { xa: -2, ys: [2, 1, 0, -1, 0, 1, 2, 1] },
  /** u sur [−5 ; 3] : sommet 2 en −2, creux −2 en 2, zéros −4 et 0. */
  C4: { xa: -5, ys: [-1, 0, 1, 2, 1, 0, -1, -2, -1] },
  /** k sur [−3 ; 4] : touche l'axe en −1 sans le traverser, sommet 2 en 1, zéro 3. */
  C5: { xa: -3, ys: [2, 1, 0, 1, 2, 1, 0, -1] },
  /** Food-truck : B(t), centaines d'euros, t mois, [0 ; 8]. */
  FOOD: { xa: 0, ys: [-3, -2, -1, 0, 1, 2, 3, 2, 1] },
  /** Marée : H(t), mètres par rapport au niveau moyen, t heures après minuit, [0 ; 12]. */
  MAREE: { xa: 0, ys: [4, 3, 2, 1, 0, -1, -2, -3, -2, -1, 0, 1, 2] },
  /** Maison solaire : B(t) = production − consommation, kW, t heures après 6 h, [0 ; 12]. */
  SOLAIRE: { xa: 0, ys: [-2, -1, 0, 1, 2, 3, 4, 3, 2, 1, 0, -1, -2] },
  /** Crue : N(t), écart au niveau habituel en mètres, t jours, [0 ; 9]. */
  CRUE: { xa: 0, ys: [-1, 0, 1, 2, 3, 4, 3, 2, 1, 0] },
  /** Compte d'un étudiant : S(t), centaines d'euros, t mois après septembre, [0 ; 10]. */
  COMPTE: { xa: 0, ys: [3, 2, 1, 0, -1, -2, -1, 0, 1, 2, 3] },
} satisfies Record<string, CourbeNoeuds>;

export type NomCourbe = keyof typeof COURBES;

function pentes(ys: number[]): number[] {
  const d = ys.slice(1).map((y, i) => y - ys[i]);
  return ys.map((_, i) => {
    if (i === 0) return d[0];
    if (i === ys.length - 1) return d[d.length - 1];
    if (d[i - 1] * d[i] <= 0) return 0;
    return 2 / (1 / d[i - 1] + 1 / d[i]);
  });
}

export function evaluer(c: CourbeNoeuds, x: number): number {
  const m = pentes(c.ys);
  const i = Math.min(Math.max(Math.floor(x - c.xa), 0), c.ys.length - 2);
  const s = x - c.xa - i;
  return (
    (2 * s ** 3 - 3 * s ** 2 + 1) * c.ys[i] +
    (s ** 3 - 2 * s ** 2 + s) * m[i] +
    (-2 * s ** 3 + 3 * s ** 2) * c.ys[i + 1] +
    (s ** 3 - s ** 2) * m[i + 1]
  );
}

/** Les points tracés : 12 par unité, arrondis au millième. */
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

/**
 * CE QUE LES CORRIGÉS AFFIRMENT, exercice par exercice. Le vérificateur
 * recalcule chacun sur la courbe : une image, des antécédents, un ensemble de
 * solutions, une ligne de signes, une ligne de variations.
 */
export type Fait =
  | { ex: number; c: NomCourbe; image: [number, number] }
  | { ex: number; c: NomCourbe; antecedents: [number, number[]] }
  | { ex: number; c: NomCourbe; ensemble: [string, number, string] } // [op, k, « ]−2 ; 2[ »]
  | { ex: number; c: NomCourbe; signes: [number[], string] } // [bornes, « − 0 + 0 − »]
  | { ex: number; c: NomCourbe; variations: [number[], number[]] };

export const FAITS: Fait[] = [
  // ★
  { ex: 1, c: "C1", image: [-2, -1] }, { ex: 1, c: "C1", image: [0, 1] }, { ex: 1, c: "C1", image: [1, 2] }, { ex: 1, c: "C1", image: [4, -1] },
  { ex: 2, c: "C2", antecedents: [1, [-3, 3]] }, { ex: 2, c: "C2", antecedents: [0, [-2, 2]] }, { ex: 2, c: "C2", antecedents: [-2, [0]] }, { ex: 2, c: "C2", antecedents: [3, []] },
  { ex: 3, c: "C3", antecedents: [1, [-1, 3, 5]] }, { ex: 3, c: "C3", antecedents: [2, [-2, 4]] }, { ex: 3, c: "C3", antecedents: [-1, [1]] }, { ex: 3, c: "C3", antecedents: [3, []] },
  { ex: 4, c: "C1", signes: [[-3, -1, 3, 4], "− 0 + 0 −"] },
  { ex: 5, c: "C2", variations: [[-4, 0, 3], [2, -2, 1]] },
  { ex: 6, c: "C3", ensemble: [">", 0, "[−2 ; 0[ ∪ ]2 ; 5]"] }, { ex: 6, c: "C3", ensemble: ["<", 1, "]−1 ; 3["] },
  { ex: 7, c: "C2", image: [2, 0] }, { ex: 7, c: "C2", antecedents: [2, [-4]] },
  { ex: 8, c: "C3", variations: [[-2, 1, 4, 5], [2, -1, 2, 1]] },
  // ★★
  { ex: 9, c: "C4", image: [-3, 1] }, { ex: 9, c: "C4", image: [2, -2] }, { ex: 9, c: "C4", antecedents: [1, [-3, -1]] },
  { ex: 9, c: "C4", signes: [[-5, -4, 0, 3], "− 0 + 0 −"] }, { ex: 9, c: "C4", variations: [[-5, -2, 2, 3], [-1, 2, -2, -1]] },
  { ex: 9, c: "C4", ensemble: ["≥", 1, "[−3 ; −1]"] },
  { ex: 10, c: "FOOD", image: [0, -3] }, { ex: 10, c: "FOOD", antecedents: [0, [3]] }, { ex: 10, c: "FOOD", signes: [[0, 3, 8], "− 0 +"] },
  { ex: 10, c: "FOOD", variations: [[0, 6, 8], [-3, 3, 1]] },
  { ex: 11, c: "C2", ensemble: ["<", 0, "]−2 ; 2["] }, { ex: 11, c: "C2", ensemble: ["≥", 0, "[−4 ; −2] ∪ [2 ; 3]"] }, { ex: 11, c: "C2", ensemble: [">", -2, "[−4 ; 0[ ∪ ]0 ; 3]"] },
  { ex: 13, c: "C5", signes: [[-3, -1, 3, 4], "+ 0 + 0 −"] },
  { ex: 14, c: "MAREE", image: [7, -3] }, { ex: 14, c: "MAREE", ensemble: ["<", 0, "]4 ; 10["] }, { ex: 14, c: "MAREE", signes: [[0, 4, 10, 12], "+ 0 − 0 +"] },
  { ex: 14, c: "MAREE", ensemble: ["≥", 1, "[0 ; 3] ∪ [11 ; 12]"] },
  { ex: 15, c: "C1", image: [0, 1] }, { ex: 15, c: "C1", antecedents: [-1, [-2, 4]] }, { ex: 15, c: "C1", ensemble: ["≥", 0, "[−1 ; 3]"] },
  { ex: 16, c: "C4", ensemble: ["<", 0, "[−5 ; −4[ ∪ ]0 ; 3]"] }, { ex: 16, c: "C4", ensemble: ["≤", 0, "[−5 ; −4] ∪ [0 ; 3]"] },
  // ★★★
  { ex: 17, c: "SOLAIRE", image: [6, 4] }, { ex: 17, c: "SOLAIRE", antecedents: [0, [2, 10]] }, { ex: 17, c: "SOLAIRE", signes: [[0, 2, 10, 12], "− 0 + 0 −"] },
  { ex: 17, c: "SOLAIRE", variations: [[0, 6, 12], [-2, 4, -2]] }, { ex: 17, c: "SOLAIRE", ensemble: ["≥", 2, "[4 ; 8]"] },
  { ex: 18, c: "CRUE", image: [5, 4] }, { ex: 18, c: "CRUE", ensemble: ["≥", 2, "[3 ; 7]"] }, { ex: 18, c: "CRUE", antecedents: [3, [4, 6]] },
  { ex: 18, c: "CRUE", variations: [[0, 5, 9], [-1, 4, 0]] },
  { ex: 19, c: "COMPTE", image: [0, 3] }, { ex: 19, c: "COMPTE", ensemble: ["<", 0, "]3 ; 7["] }, { ex: 19, c: "COMPTE", variations: [[0, 5, 10], [3, -2, 3]] },
  { ex: 19, c: "COMPTE", ensemble: ["≤", -1, "[4 ; 6]"] },
  { ex: 20, c: "C3", antecedents: [1, [-1, 3, 5]] }, { ex: 20, c: "C3", antecedents: [2, [-2, 4]] }, { ex: 20, c: "C3", antecedents: [-1, [1]] },
  { ex: 20, c: "C3", antecedents: [0, [0, 2]] },
];
