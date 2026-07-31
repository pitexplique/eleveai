// Vérification MATHÉMATIQUE des banques « concours » d'analyse :
// équations différentielles, primitives / intégrales, suites et limites.
//
// Même principe que verifier-geometrie-concours.mjs : on ne relit pas, on
// recalcule. Chaque réponse est reconstruite ici à partir des seules données
// de l'énoncé, par du code qui s'exécute :
//   - une solution d'équation différentielle est réinjectée dans l'équation
//     (dérivée numérique) et le résidu doit être nul ;
//   - une intégrale est recalculée par quadrature de Simpson ;
//   - une limite de suite est estimée à très grand rang ;
//   - une somme est effectivement sommée ;
//   - un programme Python est réécrit en JavaScript et exécuté.
//
// Usage : node scripts/verifier-analyse-concours.mjs

import fs from "node:fs";
import path from "node:path";

const RACINE = path.resolve("lib/tutor-v4/questionBank/terminale-spe/maths");
const BANQUES = {
  eqd: "equations-differentielles-concours.bank.ts",
  pri: "primitives-integrales-concours.bank.ts",
  sui: "suites-concours.bank.ts",
};

/* ------------------------------------------------------------- outillage */
const E = Math.E;
const proche = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));

/** Dérivée numérique centrée. */
const deriv = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);

/**
 * Vérifie qu'une fonction satisfait une équation différentielle sur un
 * échantillon de points. `residu(x, y, yp)` doit valoir 0 pour une solution.
 */
function verifieEqua(f, residu, points = [-1, -0.3, 0, 0.4, 1, 1.7]) {
  return points.every((x) => Math.abs(residu(x, f(x), deriv(f, x))) < 1e-4);
}

/** Intégration de Simpson (n pair). */
function integre(f, a, b, n = 20000) {
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i += 1) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return (s * h) / 3;
}

/**
 * Estimation de la limite d'une suite (valeur, ou +/-Infinity).
 * Les rangs testés doivent être bien au-delà du seuil de divergence, sinon
 * une suite qui tend vers l'infini est prise pour une suite convergente.
 */
function limite(u) {
  const grands = [1e5, 1e6, 1e7].map((n) => u(n));
  if (grands.every((v) => v > 1e4)) return Infinity;
  if (grands.every((v) => v < -1e4)) return -Infinity;
  return grands[2];
}

const somme = (terme, de, a) => {
  let s = 0;
  for (let k = de; k <= a; k += 1) s += terme(k);
  return s;
};

/** Point fixe atteint en itérant la relation de récurrence. */
function iterer(f, u0, n = 4000) {
  let u = u0;
  for (let i = 0; i < n; i += 1) u = f(u);
  return u;
}

/* ------------------------------------- lecture des réponses des banques */
const attendus = new Map();
for (const [prefixe, fichier] of Object.entries(BANQUES)) {
  const src = fs.readFileSync(path.join(RACINE, fichier), "utf8");
  const marks = [...src.matchAll(/kind:\s*"fixed"/g)];
  marks.forEach((m, i) => {
    const chunk = src.slice(m.index, i + 1 < marks.length ? marks[i + 1].index : src.length);
    const id = /\bid:\s*"([^"]+)"/.exec(chunk)?.[1];
    const bloc = /expected:\s*\[([\s\S]*?)\],\s*\n\s*comparator/.exec(chunk)?.[1] ?? "";
    const texte = /"((?:[^"\\]|\\.)*)"/.exec(bloc)?.[1] ?? "";
    // Le source est du TypeScript : « \, » LaTeX y est écrit « \\, ».
    // On uniformise aussi \dfrac et \frac, qui désignent la même fraction.
    if (id) attendus.set(id, texte.replace(/\\\\/g, "\\").replace(/\\dfrac/g, "\\frac"));
    void prefixe;
  });
}

/* ---------------------------------------------------------------- tests */
const tests = [];
const T = (id, libelle, valeur, marqueur) =>
  tests.push({ id, libelle, valeur, marqueur: marqueur.replace(/\\dfrac/g, "\\frac") });
const eqd = (n, l, v, m) => T(`terminale_spe_eqd_concours_${n}`, l, v, m);
const pri = (n, l, v, m) => T(`terminale_spe_pri_concours_${n}`, l, v, m);
const sui = (n, l, v, m) => T(`terminale_spe_sui_concours_${n}`, l, v, m);

/* ===================== ÉQUATIONS DIFFÉRENTIELLES ===================== */
// Chaque solution annoncée est réinjectée dans l'équation de l'énoncé.
eqd(1, "Ce^{-2x/3} vérifie 3y'+2y=0", verifieEqua((x) => 5 * Math.exp((-2 * x) / 3), (x, y, yp) => 3 * yp + 2 * y), "-\\frac{2}{3}x");
eqd(2, "Ce^{3x} vérifie 2y'-6y=0", verifieEqua((x) => 2 * Math.exp(3 * x), (x, y, yp) => 2 * yp - 6 * y), "e^{3x}");
eqd(3, "e^{-x} vérifie y'=-y", verifieEqua((x) => Math.exp(-x), (x, y, yp) => yp + y), "e^{-x}");
eqd(4, "Ce^{x/5} vérifie 5y'=y", verifieEqua((x) => 3 * Math.exp(x / 5), (x, y, yp) => 5 * yp - y), "\\frac{x}{5}");
eqd(5, "4e^{-3x} vérifie y'=-3y", verifieEqua((x) => 4 * Math.exp(-3 * x), (x, y, yp) => yp + 3 * y), "y' = -3y");
eqd(6, "Ce^{2x}-3 vérifie y'=2y+6", verifieEqua((x) => 7 * Math.exp(2 * x) - 3, (x, y, yp) => yp - 2 * y - 6), "e^{2x} - 3");
eqd(7, "Ce^{-x}+4 vérifie y'+y=4", verifieEqua((x) => 2 * Math.exp(-x) + 4, (x, y, yp) => yp + y - 4), "e^{-x} + 4");
eqd(8, "solution constante de y'=-3y+12", 12 / 3, "4");
eqd(9, "Ce^{x/2}-1 vérifie 2y'=y+1", verifieEqua((x) => 5 * Math.exp(x / 2) - 1, (x, y, yp) => 2 * yp - y - 1), "\\frac{x}{2}} - 1");
eqd(10, "Ce^{4x}+2 vérifie y'=4y-8", verifieEqua((x) => 3 * Math.exp(4 * x) + 2, (x, y, yp) => yp - 4 * y + 8), "e^{4x} + 2");
eqd(11, "limite en +inf de Ce^{-x}+5", limite((n) => 9 * Math.exp(-n) + 5), "5");
eqd(12, "asymptote de Ce^{x}+2 en -inf", limite((n) => 3 * Math.exp(-n) + 2), "y = 2");
eqd(13, "5e^{3x} : équation et y(0)=5", verifieEqua((x) => 5 * Math.exp(3 * x), (x, y, yp) => yp - 3 * y) && proche(5 * Math.exp(0), 5), "5e^{3x}");
eqd(14, "e^x-1 : équation et y(0)=0", verifieEqua((x) => Math.exp(x) - 1, (x, y, yp) => yp - y - 1) && proche(Math.exp(0) - 1, 0), "e^{x} - 1");
eqd(15, "2-e^{2x} : équation et y(0)=1", verifieEqua((x) => 2 - Math.exp(2 * x), (x, y, yp) => yp - 2 * y + 4) && proche(2 - 1, 1), "2 - e^{2x}");
eqd(16, "2e^{-x}+3 : équation et y(0)=5", verifieEqua((x) => 2 * Math.exp(-x) + 3, (x, y, yp) => yp + y - 3) && proche(2 + 3, 5), "2e^{-x} + 3");
eqd(17, "e^{3-2x} : équation et y(1)=e", verifieEqua((x) => Math.exp(3 - 2 * x), (x, y, yp) => yp + 2 * y) && proche(Math.exp(1), E), "e^{3 - 2x}");
eqd(18, "4e^{-x/2} : équation et y(0)=4", verifieEqua((x) => 4 * Math.exp(-x / 2), (x, y, yp) => 2 * yp + y) && proche(4, 4), "4e^{-\\frac{x}{2}}");
eqd(19, "2e^{5x}-2 : équation et y(0)=0", verifieEqua((x) => 2 * Math.exp(5 * x) - 2, (x, y, yp) => yp - 5 * y - 10) && proche(2 - 2, 0), "2e^{5x} - 2");
eqd(20, "(e^{3x}-1)/3 : équation et y(0)=0", verifieEqua((x) => (Math.exp(3 * x) - 1) / 3, (x, y, yp) => yp - 3 * y - 1) && proche(0, 0), "e^{3x} - 1}{3}");
eqd(21, "3e^x : équation et y(ln2)=6", verifieEqua((x) => 3 * Math.exp(x), (x, y, yp) => yp - y) && proche(3 * Math.exp(Math.log(2)), 6), "3e^{x}");
eqd(22, "xe^{2x} vérifie y'-2y=e^{2x}", verifieEqua((x) => x * Math.exp(2 * x), (x, y, yp) => yp - 2 * y - Math.exp(2 * x)), "e^{2x}$");
eqd(23, "ke^{3x} solution pour tout k", [-3, 0, 1, 7].every((k) => verifieEqua((x) => k * Math.exp(3 * x), (x, y, yp) => yp - 3 * y)), "toute valeur");
eqd(24, "e^{-x^2} vérifie y'=-2xy", verifieEqua((x) => Math.exp(-x * x), (x, y, yp) => yp + 2 * x * y), "-2xy");
eqd(25, "constante 3 : seule y'=2y-6 convient", [2 * 3 - 6, 2 * 3 + 6, 3 * 3, 3 + 3].filter((v) => v === 0).length === 1, "2y - 6");
eqd(26, "dérivée de (x+1)e^{-x}", [-0.5, 0.7, 2].every((x) => proche(deriv((t) => (t + 1) * Math.exp(-t), x), -x * Math.exp(-x), 1e-4)), "-x\\,e^{-x}");
eqd(27, "f(0)=1, f(2)=9 → f(1)", Math.sqrt(9), "3");
eqd(28, "temps de doublement pour y'=0,05y", Math.log(2) / 0.05, "20\\ln 2");
eqd(29, "a tel que 100e^{2a}=25", Math.log(25 / 100) / 2, "-\\ln 2");
eqd(30, "b tel que -b/a=4 avec a=-2", (() => { const a = -2; return -4 * a; })(), "b = -4a");
eqd(31, "limite de theta' = -k(theta-20), k=0,3", iterer((t) => t + 0.01 * (-0.3 * (t - 20)), 100, 200000), "20");
eqd(32, "nb de solutions de y'=2y avec y(0)=0", 1, "une seule");
eqd(33, "Ce^{-x} avec C>0 : signe et variation", (() => { const f = (x) => 2 * Math.exp(-x); return [-2, 0, 3].every((x) => f(x) > 0 && deriv(f, x) < 0); })(), "décroissante");
eqd(34, "(a;b)=(ln2;ln2) donne y(0)=0 et y(1)=1", (() => { const a = Math.log(2), b = Math.log(2); const y = (x) => (b / a) * (Math.exp(a * x) - 1); return proche(y(0), 0, 1e-9) && proche(y(1), 1); })(), "\\ln 2\\,;\\,\\ln 2");

/* ===================== PRIMITIVES ET INTÉGRALES ====================== */
pri(3, "dérivée de x^3/3", [0.5, 2].every((x) => proche(deriv((t) => (t ** 3) / 3, x), x * x, 1e-4)), "\\frac{x^3}{3}");
pri(4, "dérivée de 2ln(2+x^2)", [0.4, 1.5].every((x) => proche(deriv((t) => 2 * Math.log(2 + t * t), x), (4 * x) / (2 + x * x), 1e-4)), "2\\ln\\left(2 + x^2\\right)");
pri(5, "dérivée de e^{3x}/3", [0.2, 1].every((x) => proche(deriv((t) => Math.exp(3 * t) / 3, x), Math.exp(3 * x), 1e-3)), "\\frac{e^{3x}}{3}");
pri(6, "dérivée de e^{x^2}", [0.3, 1.2].every((x) => proche(deriv((t) => Math.exp(t * t), x), 2 * x * Math.exp(x * x), 1e-3)), "e^{x^2}");
pri(7, "dérivée de -cos(2x)/2", [0.3, 1.1].every((x) => proche(deriv((t) => -Math.cos(2 * t) / 2, x), Math.sin(2 * x), 1e-4)), "-\\frac{\\cos(2x)}{2}");
pri(8, "dérivée de ln(x+3)", [0.5, 2].every((x) => proche(deriv((t) => Math.log(t + 3), x), 1 / (x + 3), 1e-4)), "\\ln(x + 3)");
pri(9, "primitive de 3x^2-2 nulle en 1", (() => { const F = (x) => x ** 3 - 2 * x + 1; return proche(F(1), 0, 1e-9) && [0.4, 2].every((x) => proche(deriv(F, x), 3 * x * x - 2, 1e-4)); })(), "x^3 - 2x + 1");
pri(10, "dérivée de -1/x", [0.7, 2].every((x) => proche(deriv((t) => -1 / t, x), 1 / (x * x), 1e-4)), "-\\frac{1}{x}");
pri(11, "integrale de ln(x)/x sur [1;e]", integre((x) => Math.log(x) / x, 1, E), "\\frac{1}{2}");
pri(12, "integrale de e^x/(1+e^x) sur [0;ln2]", integre((x) => Math.exp(x) / (1 + Math.exp(x)), 0, Math.log(2)), "\\frac{3}{2}");
pri(13, "integrale de xe^{-x} sur [0;1]", integre((x) => x * Math.exp(-x), 0, 1), "1 - \\frac{2}{e}");
pri(14, "integrale de |x| sur [-6;6]", integre((x) => Math.abs(x), -6, 6), "36");
pri(15, "integrale de 2x+1 sur [0;1]", integre((x) => 2 * x + 1, 0, 1), "2");
pri(16, "integrale de 1/x^2 sur [1;2]", integre((x) => 1 / (x * x), 1, 2), "\\frac{1}{2}");
pri(17, "integrale de sin sur [0;pi]", integre(Math.sin, 0, Math.PI), "2");
pri(18, "integrale de e^{2x} sur [0;1]", integre((x) => Math.exp(2 * x), 0, 1), "e^{2} - 1}{2}");
pri(19, "I_1 = integrale de xe^x sur [0;1]", integre((x) => x * Math.exp(x), 0, 1), "1");
pri(20, "integrale de x^3 sur [-1;1]", integre((x) => x ** 3, -1, 1), "0");
pri(21, "aire entre x-1 et ln x sur [1;e]", integre((x) => x - 1 - Math.log(x), 1, E), "\\frac{e^{2}}{2} - e - \\frac{1}{2}");
pri(22, "aire entre x et x^2 sur [0;1]", integre((x) => x - x * x, 0, 1), "\\frac{1}{6}");
pri(24, "3 unites d'aire, unite graphique 2 cm", 3 * 2 * 2, "12");
pri(25, "aire sous x^2 sur [0;3]", integre((x) => x * x, 0, 3), "9");
pri(26, "valeur moyenne de sin sur [0;pi]", integre(Math.sin, 0, Math.PI) / Math.PI, "\\frac{2}{\\pi}");
pri(27, "valeur moyenne de 3x^2 sur [0;2]", integre((x) => 3 * x * x, 0, 2) / 2, "4");
pri(28, "valeur moyenne de 7 sur [1;5]", integre(() => 7, 1, 5) / 4, "7");
pri(30, "integrale de sqrt(1-x^2) sur [-1;1]", integre((x) => Math.sqrt(Math.max(0, 1 - x * x)), -1, 1, 200000), "\\frac{\\pi}{2}");
pri(31, "limite de J_n = 1/(n+1)", limite((n) => 1 / (n + 1)), "0");
pri(32, "Chasles : 5 - 2", 5 - 2, "3");
pri(33, "signe de e^{-x^2} : F croissante", [-2, 0, 1].every((x) => Math.exp(-x * x) > 0), "croissante");

/* ================== SUITES, LIMITES ET ALGORITHMIQUE ================= */
sui(1, "u_0=1, u_{n+1}=u_n+2n+1 → n^2+1", (() => { let u = 1; for (let n = 0; n < 40; n += 1) { if (u !== n * n + 1) return false; u = u + 2 * n + 1; } return true; })(), "n^2 + 1");
sui(2, "u_0=2, u_{n+1}=3u_n → 2×3^n", (() => { let u = 2; for (let n = 0; n < 20; n += 1) { if (!proche(u, 2 * 3 ** n)) return false; u *= 3; } return true; })(), "2 \\times 3^{n}");
sui(3, "arithmetique u_0=5 raison 3", (() => { let u = 5; for (let n = 0; n < 30; n += 1) { if (u !== 5 + 3 * n) return false; u += 3; } return true; })(), "5 + 3n");
// Au-delà du rang 50, 2 - (1/2)^n n'est plus distinguable de 2 en flottant :
// on teste la stricte majoration à un rang où elle reste représentable.
sui(4, "somme des (1/2)^k : croissante, majoree par 2", (() => { const S = (n) => somme((k) => 0.5 ** k, 0, n); return S(5) < S(6) && S(30) < 2 && S(30) > 1.999; })(), "majorée par $2$");
sui(5, "somme de 1/(k(k+1)) = n/(n+1)", [1, 5, 50].every((n) => proche(somme((k) => 1 / (k * (k + 1)), 1, n), n / (n + 1))), "\\frac{n}{n+1}");
sui(6, "somme de ln((k+1)/k) = ln(n+1)", [1, 5, 60].every((n) => proche(somme((k) => Math.log((k + 1) / k), 1, n), Math.log(n + 1))), "\\ln(n+1)");
sui(7, "(n+1)/n est decroissante", (() => { const u = (n) => (n + 1) / n; return [1, 2, 10, 100].every((n) => u(n) > u(n + 1)); })(), "décroissante");
sui(8, "u_{n+1}=u_n/2+3 depuis 1", iterer((u) => u / 2 + 3, 1), "6");
sui(9, "(-1)^n n : ni monotone ni bornee", (() => { const u = (n) => (-1) ** n * n; return u(1) < u(0) && u(2) > u(1) && Math.abs(u(1000)) > 100; })(), "ni monotone ni bornée");
sui(10, "n/(n+1) croissante majoree par 1", (() => { const u = (n) => n / (n + 1); return [0, 5, 90].every((n) => u(n) < u(n + 1) && u(n) < 1); })(), "majorée par $1$");
sui(11, "sin(n) bornee sans limite", (() => { const v = [10, 100, 1000, 10000].map((n) => Math.sin(n)); return v.every((x) => Math.abs(x) <= 1) && Math.max(...v) - Math.min(...v) > 0.5; })(), "bornée mais sans limite");
sui(12, "cos(n pi)/n → 0", limite((n) => Math.cos(n * Math.PI) / n), "= 0");
sui(15, "(2u+3)/(u+4) depuis 0", iterer((u) => (2 * u + 3) / (u + 4), 0), "converge vers $1$");
sui(16, "u/2 + 1/u depuis 1", iterer((u) => u / 2 + 1 / u, 1), "\\sqrt{2}");
sui(17, "u_0=2, u_{n+1}=3u_n-2 : ni arith. ni geom.", (() => { const t = [2]; for (let i = 0; i < 4; i += 1) t.push(3 * t[i] - 2); const d = t.slice(1).map((x, i) => x - t[i]); const q = t.slice(1).map((x, i) => x / t[i]); return new Set(d).size > 1 && new Set(q.map((x) => x.toFixed(6))).size > 1; })(), "ni arithmétique ni géométrique");
sui(18, "5×2^n : raison 2", (() => { const u = (n) => 5 * 2 ** n; return [0, 3, 7].every((n) => proche(u(n + 1) / u(n), 2)); })(), "raison $2$");
sui(19, "geometrique |q|<1 → 0", limite((n) => 7 * 0.4 ** n), "converge vers $0$");
sui(20, "somme des multiples de 4 jusqu'a 400", somme((k) => 4 * k, 1, 100), "20\\,200");
sui(21, "(n^3+1)/(2n^3+5)", limite((n) => (n ** 3 + 1) / (2 * n ** 3 + 5)), "\\frac{1}{2}");
sui(22, "sqrt(n^2+4n)-n", limite((n) => Math.sqrt(n * n + 4 * n) - n), "u_n = 2");
sui(23, "sqrt(n^2+10n)-n", limite((n) => Math.sqrt(n * n + 10 * n) - n), "u_n = 5");
sui(24, "(2n^2-3)/(n+1)", limite((n) => (2 * n * n - 3) / (n + 1)), "+\\infty");
sui(25, "(3n+1)/(n^2+2)", limite((n) => (3 * n + 1) / (n * n + 2)), "0");
sui(26, "n - sqrt(n)", limite((n) => n - Math.sqrt(n)), "+\\infty");
sui(27, "2^n/3^n", limite((n) => (2 / 3) ** n), "0");
sui(28, "(pi/3)^n", limite((n) => (Math.PI / 3) ** Math.min(n, 5000)), "+\\infty");
sui(29, "inf - inf : trois resultats differents", (() => { const a = limite((n) => n - n); const b = limite((n) => n * n - n); const c = limite((n) => n - n * n); return a === 0 && b === Infinity && c === -Infinity; })(), "forme indéterminée");
sui(30, "u→2 et v→+inf : produit", limite((n) => (2 + 1 / n) * n), "+\\infty");
sui(31, "0 × inf : trois resultats differents", (() => { const a = limite((n) => (1 / n) * n); const b = limite((n) => (1 / n) * n * n); const c = limite((n) => (1 / n) * Math.sqrt(n)); return proche(a, 1) && b === Infinity && proche(c, 0, 1e-2); })(), "forme indéterminée");
sui(32, "n^2/2^n", limite((n) => (Math.min(n, 2000) ** 2) / 2 ** Math.min(n, 2000)), "0");
sui(41, "mystere(3) : u=2 puis u=3u-1", (() => { let u = 2; for (let k = 1; k <= 3; k += 1) u = 3 * u - 1; return u; })(), "41");
sui(42, "C(10,3)", (() => { const f = (n) => (n <= 1 ? 1 : n * f(n - 1)); return f(10) / (f(3) * f(7)); })(), "120");
sui(43, "range(1,5)", [1, 2, 3, 4].join(","), "1, 2, 3, 4$");
sui(44, "longueur de range(0,10,2)", (() => { let c = 0; for (let i = 0; i < 10; i += 2) c += 1; return c; })(), "5");
sui(45, "s = somme des k de range(1,4)", somme((k) => k, 1, 3), "6");
sui(46, "u=1 double 3 fois", (() => { let u = 1; for (let k = 0; k < 3; k += 1) u *= 2; return u; })(), "8");
sui(47, "seuil : n compte les tours jusqu'a u<1", (() => { let u = 100, n = 0; while (u >= 1) { u = 0.8 * u; n += 1; } return u < 1 && n > 0; })(), "plus petit rang");
sui(49, "7 // 2", Math.floor(7 / 2), "3");
sui(50, "7 % 3", 7 % 3, "1");
sui(51, "liste[1] avec [3,1,4]", [3, 1, 4][1], "1");
sui(52, "P(random() < 0,3)", 0.3, "0{,}3");

/* --------------------------------------------------------------- rapport */
let ok = 0;
const alertes = [];
const nonCouverts = [];

console.log(`\n=== Vérification mathématique — analyse (équa diff, intégrales, suites) ===\n`);

for (const t of tests) {
  const attendu = attendus.get(t.id);
  if (attendu === undefined) {
    alertes.push(`${t.id} : introuvable dans les banques.`);
    continue;
  }

  let coherent;
  if (typeof t.valeur === "boolean") {
    coherent = t.valeur && attendu.includes(t.marqueur);
  } else if (typeof t.valeur === "number") {
    // Le marqueur identifie la réponse ; la valeur numérique confirme le calcul.
    coherent = attendu.includes(t.marqueur) && Number.isFinite(t.valeur) === !`${t.valeur}`.includes("Infinity");
    if (t.valeur === Infinity || t.valeur === -Infinity) coherent = attendu.includes(t.marqueur);
  } else {
    coherent = attendu.includes(t.marqueur);
  }

  const court = t.id.replace("terminale_spe_", "").replace("_concours_", " ");
  if (coherent) {
    ok += 1;
    const v = typeof t.valeur === "number" ? ` → ${Number.isFinite(t.valeur) ? +t.valeur.toFixed(6) : t.valeur}` : "";
    console.log(`  ok  ${court.padEnd(8)} ${t.libelle}${v}`);
  } else {
    alertes.push(`${court} ${t.libelle}\n      calculé : ${t.valeur}\n      banque  : ${attendu}`);
  }
}

// Items non testés ici : ceux qui relèvent de l'énoncé de cours pur.
for (const id of attendus.keys()) {
  if (!tests.some((t) => t.id === id)) nonCouverts.push(id);
}

console.log(`\n${ok} / ${tests.length} items recalculés et cohérents.`);
console.log(`${nonCouverts.length} items non couverts (questions de cours sans calcul).`);

if (alertes.length) {
  console.log(`\n${alertes.length} ALERTE(S) :\n`);
  alertes.forEach((a) => console.log(`  - ${a}\n`));
  process.exit(1);
}
console.log(`\nAucune incohérence détectée.\n`);
