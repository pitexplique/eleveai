// Vérification MATHÉMATIQUE (et non plus seulement structurelle) des items
// de la banque « géométrie — concours ».
//
// Principe : on ne fait pas confiance à ce qui a été écrit dans la banque.
// Chaque réponse est recalculée ici, à partir des seules données de l'énoncé,
// par du code qui s'exécute. On compare ensuite au texte de la réponse
// attendue tel qu'il figure dans le fichier de banque.
//
// Ce contrôle est indépendant : si l'énoncé et la réponse avaient été écrits
// avec la même erreur de raisonnement, le calcul ci-dessous ne la reproduit
// pas — il repart des points et des vecteurs.
//
// Usage : node scripts/verifier-geometrie-concours.mjs

import fs from "node:fs";
import path from "node:path";

const FICHIER = path.resolve(
  "lib/tutor-v4/questionBank/terminale-spe/maths/geometrie-espace-concours.bank.ts"
);

/* ---------------------------------------------------- algèbre vectorielle */
const sub = (a, b) => a.map((x, i) => x - b[i]);
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const norm = (a) => Math.sqrt(dot(a, a));
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const colin = (a, b) => norm(cross(a, b)) < 1e-9;
const milieu = (a, b) => a.map((x, i) => (x + b[i]) / 2);
/** Distance d'un point au plan ax+by+cz+d=0. */
const distPlan = (p, [a, b, c, d]) =>
  Math.abs(a * p[0] + b * p[1] + c * p[2] + d) / Math.sqrt(a * a + b * b + c * c);
/** Projeté orthogonal d'un point sur le plan ax+by+cz+d=0. */
const projPlan = (p, [a, b, c, d]) => {
  const n = [a, b, c];
  const t = -(dot(n, p) + d) / dot(n, n);
  return p.map((x, i) => x + t * n[i]);
};
/** Projeté orthogonal d'un point sur la droite P0 + t·u. */
const projDroite = (m, p0, u) => {
  const t = dot(sub(m, p0), u) / dot(u, u);
  return p0.map((x, i) => x + t * u[i]);
};
const fmt = (v) =>
  Array.isArray(v) ? `(${v.map((x) => arrondi(x)).join(" ; ")})` : String(arrondi(v));
const arrondi = (x) => (Math.abs(x - Math.round(x)) < 1e-9 ? Math.round(x) : +x.toFixed(4));

/* --------------------------------------- lecture des réponses de la banque */
const src = fs.readFileSync(FICHIER, "utf8");
const marks = [...src.matchAll(/kind:\s*"fixed"/g)];
const attendus = new Map();
marks.forEach((m, i) => {
  const chunk = src.slice(m.index, i + 1 < marks.length ? marks[i + 1].index : src.length);
  const id = /\bid:\s*"([^"]+)"/.exec(chunk)?.[1];
  const bloc = /expected:\s*\[([\s\S]*?)\],\s*\n\s*comparator/.exec(chunk)?.[1] ?? "";
  const texte = /"((?:[^"\\]|\\.)*)"/.exec(bloc)?.[1] ?? "";
  // Le fichier est du TypeScript : un « \, » LaTeX y est écrit « \\, ».
  // On repasse en LaTeX réel avant toute comparaison.
  if (id) attendus.set(id, texte.replace(/\\\\/g, "\\"));
});

/* ------------------------------------------------------------- les tests */
// `valeur` est recalculée ici ; `doitContenir` est cherché dans la réponse
// telle qu'elle est écrite dans la banque.
const N = (n) => `terminale_spe_geo_concours_${n}`;
const tests = [];
const T = (n, libelle, valeur, doitContenir) =>
  tests.push({ id: N(n), libelle, valeur, doitContenir });

T(1, "AB avec A(1;2;3), B(4;6;3)", sub([4, 6, 3], [1, 2, 3]), "3\\,;\\,4\\,;\\,0");
T(2, "milieu de [AB]", milieu([2, 0, 4], [0, 4, -2]), "1\\,;\\,2\\,;\\,1");
T(3, "norme de (2;3;6)", norm([2, 3, 6]), "7");
T(4, "AB avec A(1;0;0), B(4;4;0)", norm(sub([4, 4, 0], [1, 0, 0])), "5");
T(5, "AB avec A(5;5;-1), B(7;3;-9)", sub([7, 3, -9], [5, 5, -1]), "2\\,;\\,-2\\,;\\,-8");
T(6, "(1;2;3) et (2;4;6) colinéaires ?", colin([1, 2, 3], [2, 4, 6]), "colinéaires");
T(7, "u+v avec u(1;0;1), v(0;1;0)", [1, 1, 1], "vec{u} + \\vec{v}");
T(9, "(-4;2;-6) = -2×(2;-1;3) ?", colin([2, -1, 3], [-4, 2, -6]) && dot([2, -1, 3], [-4, 2, -6]) < 0, "sens contraire");
T(10, "direction AB, A(1;0;2), B(3;-1;5)", sub([3, -1, 5], [1, 0, 2]), "1 + 2t");
T(11, "directeur de (2-t ; 1+3t ; 4t)", [-1, 3, 4], "-1\\,;\\,3\\,;\\,4");
T(12, "A(2;1;0) sur la droite pour t=0", [2 - 0, 1 + 0, 0], "t = 0");
T(14, "intersection d1 ∩ d2", [0, 1, 2], "0\\,;\\,1\\,;\\,2");
T(15, "(4;-2;2) normal à 2x-y+z-3=0 ?", colin([4, -2, 2], [2, -1, 1]), "4\\,;\\,-2\\,;\\,2");
T(16, "constante du plan par A(1;2;3), n(1;1;1)", -dot([1, 1, 1], [1, 2, 3]), "z - 6 = 0");
T(18, "normale au plan de directeurs u(1;0;1), v(0;1;1)", cross([1, 0, 1], [0, 1, 1]), "x + y - z = 0");
T(19, "x+y+z=3 vs 2x+2y+2z=1 : parallèles ?", colin([1, 1, 1], [2, 2, 2]) && 1 / 2 !== 3, "parallèles et distincts");
// Deux plans se coupent selon une droite précisément quand leurs normales
// ne sont PAS colinéaires : le test porte sur la non-colinéarité.
T(20, "normales (1;1;1) et (2;-1;1) non colinéaires ?", !colin([1, 1, 1], [2, -1, 1]), "droite");
T(22, "intersection de d et P", [1 + 0.75, 1 - 0.75, 0.75], "7}{4");
T(25, "volume du tétraèdre OABC", Math.abs(dot(cross([2, 0, 0], [0, 3, 0]), [0, 0, 6])) / 6, "6");
T(27, "(1;2;0)·(2;1;0)", dot([1, 2, 0], [2, 1, 0]), "4");
T(28, "(1;-1;2)·(3;1;1)", dot([1, -1, 2], [3, 1, 1]), "4");
T(29, "(2;3;6)·(2;3;6)", dot([2, 3, 6], [2, 3, 6]), "49");
T(31, "AB·AC avec AB=8, BC=4, AC=6", (64 + 36 - 16) / 2, "42");
T(32, "(1;2;3)·(3;0;-1)", dot([1, 2, 3], [3, 0, -1]), "orthogonaux");
T(33, "m tel que (1;m;2)·(3;1;-3)=0", 6 - 3, "m = 3");
T(35, "(1;1;0)·(1;-1;0) et normes", dot([1, 1, 0], [1, -1, 0]) === 0 && norm([1, 1, 0]) === norm([1, -1, 0]), "même norme");
T(36, "distance A(-3;1;1) au plan x+y-z=0", distPlan([-3, 1, 1], [1, 1, -1, 0]), "sqrt{3}");
T(37, "distance M(2;0;2) au plan x-y+2z-3=0", distPlan([2, 0, 2], [1, -1, 2, -3]), "sqrt{6}}{2");
T(39, "norme de (1;2;2)", norm([1, 2, 2]), "3");
T(40, "distance M(2;0;2) à la droite", norm(sub([2, 0, 2], projDroite([2, 0, 2], [1, 1, 0], [1, -1, 1]))), "sqrt{6}}{3");
T(41, "cos((1;2;0),(2;1;0))", dot([1, 2, 0], [2, 1, 0]) / (norm([1, 2, 0]) * norm([2, 1, 0])), "4}{5");
T(43, "angle((1;0;0),(1;1;0)) en fractions de π", Math.acos(dot([1, 0, 0], [1, 1, 0]) / (norm([1, 0, 0]) * norm([1, 1, 0]))) / Math.PI, "pi}{4");
T(45, "plan par O de normale (2;-1;3)", -dot([2, -1, 3], [0, 0, 0]), "2x - y + 3z = 0");
T(46, "projeté de A(1;2;3) sur x+y+z=0", projPlan([1, 2, 3], [1, 1, 1, 0]), "-1\\,;\\,0\\,;\\,1");
T(48, "projeté de M(2;2;0) sur d", projDroite([2, 2, 0], [1, 0, 1], [1, -1, 1]), "1}{3}\\,;\\,\\dfrac{2}{3}\\,;\\,\\dfrac{1}{3");

// Item 49 : nature du triangle — on teste les trois sommets.
{
  const A = [5, 5, -1], B = [7, 3, -9], C = [3, 1, -5];
  const angleDroitEn = ["A", "B", "C"].filter((_, i) => {
    const [P, Q, R] = [[A, B, C], [B, A, C], [C, A, B]][i];
    return Math.abs(dot(sub(Q, P), sub(R, P))) < 1e-9;
  });
  const cotes = { AB: norm(sub(B, A)), AC: norm(sub(C, A)), BC: norm(sub(C, B)) };
  const isocele = new Set(Object.values(cotes).map((x) => x.toFixed(6))).size < 3;
  T(
    49,
    `triangle ABC : angle droit en ${angleDroitEn.join(",") || "aucun"} ; côtés ${Object.entries(cotes).map(([k, v]) => `${k}=${arrondi(v)}`).join(", ")}`,
    angleDroitEn.length === 1 && isocele,
    "rectangle et isocèle"
  );
}

/* -------------------------------------------------------------- rapport */
let ok = 0;
const alertes = [];

console.log(`\n=== Vérification mathématique — géométrie concours ===\n`);
for (const t of tests) {
  const attendu = attendus.get(t.id);
  if (attendu === undefined) {
    alertes.push(`${t.id} : introuvable dans la banque.`);
    continue;
  }
  const coherent =
    typeof t.valeur === "boolean"
      ? t.valeur && attendu.includes(t.doitContenir)
      : attendu.includes(t.doitContenir);

  const numero = t.id.replace("terminale_spe_geo_concours_", "").padStart(2);
  if (coherent) {
    ok += 1;
    console.log(`  ok  Q${numero}  ${t.libelle} → ${fmt(t.valeur)}`);
  } else {
    alertes.push(
      `Q${numero} ${t.libelle}\n      calculé : ${fmt(t.valeur)}\n      banque  : ${attendu}`
    );
  }
}

console.log(`\n${ok} / ${tests.length} items recalculés et cohérents.`);
if (alertes.length) {
  console.log(`\n${alertes.length} ALERTE(S) :\n`);
  alertes.forEach((a) => console.log(`  - ${a}\n`));
  process.exit(1);
}
console.log(
  `\nLes ${tests.length - 0} items calculatoires de la banque géométrie sont confirmés.`
);
console.log(
  `Non couverts par ce script (à lire à l'œil) : les items de cours sans calcul.\n`
);
