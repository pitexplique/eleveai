// Recalcul indépendant du lot STMG « algorithmique, tableur, logique » (05/11/2026) :
// algo-variables, algo-boucles, algo-listes, algo-fonctions, tableur-formules,
// tableur-recopie, logique-connecteurs, logique-raisonnement.
//
// ⭐ LES PROGRAMMES SONT EXÉCUTÉS, DEUX FOIS : traduits en JavaScript ici (la valeur
// passe au vrai correcteur du site), puis les lignes DESSINÉES dans la feuille
// passent à Python (`py`), quand Python est là. Ainsi une faute de frappe dans le
// dessin se voit, et un affichage bruité (165.00000000000003) aussi.
// ⭐ LES FORMULES DE TABLEUR sont calculées par un petit moteur (`cal`) sur les
// cellules de l'énoncé, et leur recopie par `recopie`, qui décale les références
// relatives et respecte les $ : aucune formule recopiée n'est écrite à la main.
//
// Usage : npx --yes tsx@4 scripts/verifier-exercices-stmg-algo-tableur-logique.mjs
import { execFileSync } from "node:child_process";
import { feuille, fin } from "./verifier-exercices-stmg-lot-commun.mjs";

/* ───────────────────────── outils ───────────────────────── */

// Les lignes du dessin `programme` : <div><pre>{<div>ligne</div>…}</pre></div>.
const lignesDe = (figure) => {
  const pre = figure?.props?.children;
  const enfants = pre?.props?.children;
  if (!Array.isArray(enfants)) return null;
  return enfants.map((d) => String(d.props.children));
};

let pythonLa = true;
try {
  execFileSync("python", ["--version"], { stdio: "ignore" });
} catch {
  pythonLa = false;
  console.log("(Python absent : les programmes ne sont exécutés qu'en JavaScript)");
}
let nbPython = 0;

/** Exécute avec Python les lignes dessinées dans l'exercice k et compare la sortie. */
function py(f, k, ...attendu) {
  if (!pythonLa) return;
  const lignes = lignesDe(f.exercices[k - 1].figure);
  f.vrai(`ex.${k} : pas de programme dessiné`, !!lignes);
  if (!lignes) return;
  const sortie = execFileSync("python", ["-"], { input: lignes.join("\n") + "\n", encoding: "utf8" }).trim().split(/\s+/);
  nbPython++;
  f.vrai(`ex.${k} : Python affiche ${sortie.join(" ")}, le recalcul donne ${attendu.join(" ")}`, sortie.length === attendu.length && sortie.every((s, i) => (typeof attendu[i] === "number" ? Math.abs(Number(s) - attendu[i]) < 1e-9 : s === attendu[i])));
  f.vrai(`ex.${k} : affichage bruité (${sortie.join(" ")})`, sortie.every((s) => s.length <= 10));
}

/** Contrôle commun des dessins `programme` : 30 signes, ni guillemet double ni antislash. */
function dessins(f) {
  f.exercices.forEach((ex, i) => {
    for (const l of lignesDe(ex.figure) ?? []) {
      f.vrai(`ex.${i + 1} : ligne trop longue « ${l} »`, l.length <= 30);
      f.vrai(`ex.${i + 1} : guillemet ou antislash « ${l} »`, !/["\\]/.test(l));
    }
  });
}

/* Le moteur de tableur : `cal(formule, cellules)`. */
const lire = (ref, cellules) => {
  const v = cellules[ref.replace(/\$/g, "")];
  return v === undefined || v === "" ? 0 : v; // une cellule vide vaut 0 dans un tableur
};
const cal = (formule, cellules) => {
  const js = formule
    .replace(/^=/, "")
    .replace(/(\d),(\d)/g, "$1.$2")
    .replace(/\$?[A-Z]\$?\d+/g, (r) => `(${lire(r, cellules)})`);
  return Function(`return (${js});`)();
};
/** Recopie : décale de (dl lignes, dc colonnes) ce qui n'est pas figé par un $. */
const recopie = (formule, dl, dc = 0) =>
  formule.replace(/(\$?)([A-Z])(\$?)(\d+)/g, (_, d1, col, d2, lig) => `${d1}${d1 ? col : String.fromCharCode(col.charCodeAt(0) + dc)}${d2}${d2 ? lig : Number(lig) + dl}`);

const arr2 = (x) => Math.round(x * 100) / 100;

/* ═══════════════════════════ algo-variables ═══════════════════════════ */
{
  const f = await feuille("algo-variables");
  dessins(f);
  // ★
  { let x = 7; x = x + 5; f.juste(1, null, x); f.faux(1, null, 7); py(f, 1, x); }
  { let a = 4; const b = 9; a = a * b; f.juste(2, "a)", a); f.juste(2, "b)", b); f.faux(2, "a)", 13); }
  { let N = 20; N = N - 6; N = 2 * N; f.juste(3, null, N); f.faux(3, null, 40); }
  { let x = 5, y = 8; x = y; y = x; f.juste(4, null, [x, y]); f.faux(4, null, [8, 5]); py(f, 4, x, y); }
  { let c = 0; let s = 0; for (const v of [12, 7, 15, 9, 18]) if (v > 10) { c = c + 1; s += v; } f.juste(5, null, c); f.faux(5, null, s); py(f, 5, c); }
  { let s = 0; for (const v of [4, 6, 10, 5]) s = s + v; f.juste(6, null, s); f.faux(6, null, 4); py(f, 6, s); }
  f.juste(7, "a)", "compteur"); f.juste(7, "b)", "accumulateur"); f.faux(7, "a)", "accumulateur");
  f.juste(8, null, 0.3); f.faux(8, null, 1 - 0.3);
  // ★★
  { let p = 120; p = p - 35; f.juste(9, "a)", p); p = p + 50; f.juste(9, "b)", p); f.faux(9, "b)", 170); py(f, 9, p); }
  {
    const t = [37, 39, 38, 40, 36, 38];
    const c = t.filter((v) => v > 38).length;
    f.juste(10, "a)", c); f.juste(10, "b)", t.filter((v) => v >= 38).length); f.faux(10, "a)", 4); py(f, 10, c);
  }
  { let s = 0; const km = [8, 12, 5, 15, 10]; for (const v of km) s = s + v; f.juste(11, "a)", s); f.juste(11, "b)", s / km.length); f.faux(11, "a)", 15); py(f, 11, s); }
  {
    const h = [3, 14, 9, 21, 6]; let c = 0;
    for (const v of h) { c = 0; if (v > 8) c = c + 1; }
    f.juste(12, "a)", c); f.juste(12, "b)", h.filter((v) => v > 8).length); f.juste(12, "c)", "c = 0"); f.faux(12, "a)", 3); py(f, 12, c);
  }
  {
    let s = 1; for (const c of [1.1, 0.9, 1.2]) s = s * c; s = Math.round(s * 1000) / 1000;
    let z = 0; for (const c of [1.1, 0.9, 1.2]) z = z * c;
    f.juste(13, "a)", s); f.juste(13, "b)", z); f.faux(13, "b)", s); py(f, 13, s);
  }
  f.juste(14, "a)", "r < 0,8"); f.juste(14, "a)", "r<0.8"); f.juste(14, "a)", "r > 0,2"); f.faux(14, "a)", "r > 0,8"); f.faux(14, "a)", "r < 0,2"); f.juste(14, "b)", 1 - 0.8);
  f.juste(15, "a)", "B"); f.faux(15, "a)", "C"); f.juste(15, "b)", 50 * 0.6); f.juste(15, "c)", 50); f.juste(15, "d)", "non");
  {
    let t = 0, c = 0; const e = [120, 80, 200, 40]; for (const v of e) { t = t + v; c = c + 1; }
    f.juste(16, "a)", t); f.juste(16, "b)", c); f.juste(16, "c)", t / c); f.faux(16, "b)", t); py(f, 16, t / c);
  }
  // ★★★
  {
    let total = 0, n = 0; const prix = [12, 25, 12, 40, 25];
    for (const p of prix) { total += p; if (p > 20) n += 1; }
    f.juste(17, "a)", total); f.juste(17, "b)", n); f.juste(17, "c)", n / prix.length); f.juste(17, "d)", total / prix.length); f.faux(17, "b)", 2); py(f, 17, total, n);
  }
  {
    let x = 30, y = 70; const z = x; x = y; y = z;
    f.juste(18, "a)", z); f.juste(18, "b)", [x, y]); f.faux(18, "b)", [30, 70]); py(f, 18, x, y);
    let u = 30, w = 70; u = w; w = u; f.juste(18, "c)", [u, w]);
  }
  {
    let s = 0, c = 0; const p = [3, 5, 8, 9, 6, 2];
    for (const v of p) { s += v; if (v >= 6) c += 1; }
    f.juste(19, "a)", s); f.juste(19, "b)", c); f.juste(19, "c)", s / p.length); f.juste(19, "d)", c / p.length); f.faux(19, "b)", 2); py(f, 19, s, c);
  }
  f.juste(20, "a)", 25 / 100); f.juste(20, "b)", 200 * 0.25); f.juste(20, "c)", 46 / 200); f.juste(20, "d)", Math.abs(46 / 200 - 0.25) < 0.1 ? "non" : "oui");
  f.tout();
}

/* ═══════════════════════════ algo-boucles ═══════════════════════════ */
{
  const f = await feuille("algo-boucles");
  dessins(f);
  // ★
  { let s = 0, t = 0; for (let i = 0; i < 6; i++) { s += 2; t++; } f.juste(1, "a)", t); f.juste(1, "b)", s); f.faux(1, "a)", 5); py(f, 1, s); }
  { const v = []; for (let i = 3; i < 8; i++) v.push(i); f.juste(2, "a)", v.length); f.juste(2, "b)", v.at(-1)); f.faux(2, "b)", 8); py(f, 2, ...v); }
  { const v = []; for (let i = 0; i < 4; i++) v.push(i); f.juste(3, null, v); f.faux(3, null, [1, 2, 3, 4]); py(f, 3, ...v); }
  { const note = 8; const m = note >= 10 ? "oui" : "non"; f.juste(4, null, m); f.faux(4, null, "oui"); py(f, 4, m); }
  { const age = 16; const p = age < 12 ? 5 : age < 18 ? 8 : 12; f.juste(5, null, p); f.faux(5, null, 12); py(f, 5, p); }
  { const m = 900; const r = m >= 200 ? 5 : m >= 500 ? 15 : 0; f.juste(6, null, r); f.faux(6, null, 15); py(f, 6, r); }
  { let x = 1, n = 0; while (x < 20) { x *= 2; n++; } f.juste(7, null, n); f.faux(7, null, x); py(f, 7, n); }
  { let u = 3, n = 0; while (n < 3) { u += 4; n++; } f.juste(8, null, u); f.faux(8, null, 19); }
  // ★★
  { let c = 500, t = 0; for (let i = 0; i < 3; i++) { c *= 1.1; t++; } c = arr2(c); f.juste(9, "a)", t); f.juste(9, "b)", c); f.faux(9, "b)", 650); py(f, 9, c); }
  {
    const m = (t) => (t > 35 ? "alerte" : t > 28 ? "aerer" : "rien");
    f.juste(10, "a)", m(31)); f.juste(10, "b)", m(40)); f.juste(10, "c)", m(28)); f.faux(10, "c)", "aerer"); py(f, 10, m(31));
  }
  { let V = 60, n = 0; while (V < 70) { V *= 1.05; n++; } f.juste(11, "a)", 1 + 5 / 100); f.juste(11, "b)", n); f.juste(11, "c)", 2024 + n); f.faux(11, "c)", n); f.dit(11, "72,93"); f.vrai("boucles ex.11 trace", arr2(V) === 72.93); }
  { let N = 8000, A = 2025; while (N > 5000) { N *= 0.9; A++; } f.juste(12, "a)", "0,9 × N"); f.juste(12, "a)", "N*0.9"); f.juste(12, "a)", "0,9N"); f.juste(12, "a)", "N - 0,1N"); f.faux(12, "a)", "N - 10"); f.faux(12, "a)", "0,1 × N"); f.juste(12, "b)", A); }
  { let C = 200, A = 2024; while (C < 350) { A += 1; C += 30; } f.juste(13, "a)", "A + 1"); f.juste(13, "b)", "C + 30"); f.faux(13, "b)", "1,3 × C"); f.juste(13, "c)", A); }
  { const p = [2, 14, 0, 25, 11, 16]; const c = p.filter((v) => v > 10).length; f.juste(14, "a)", c); f.juste(14, "b)", p.length); f.faux(14, "b)", c); py(f, 14, c); }
  { const s = []; let u = 3; for (let i = 0; i < 4; i++) { u = 2 * u + 1; s.push(u); } f.juste(15, "a)", s[0]); f.juste(15, "b)", s[1]); f.juste(15, "c)", u); f.faux(15, "c)", 31); py(f, 15, u); }
  { let C = 2000, N = 0, t = 0; while (N < 3) { C *= 1.2; N++; t++; } f.juste(16, "a)", t); f.juste(16, "b)", N); f.juste(16, "c)", arr2(C)); f.faux(16, "c)", 7200); }
  // ★★★
  {
    let Q = 1200, n = 0; const tr = [];
    while (Q > 600) { Q *= 0.85; n++; tr.push(arr2(Q)); }
    f.juste(17, "a)", "0,85 × Q"); f.juste(17, "a)", "0,85Q"); f.faux(17, "a)", "0,15 × Q"); f.juste(17, "b)", "Q > 600"); f.faux(17, "b)", "Q < 600"); f.juste(17, "c)", n); f.juste(17, "d)", 2025 + n);
    f.vrai("boucles ex.17 trace", tr.at(-1) === 532.45 && tr[3] === 626.41 && tr[2] === 736.95);
  }
  {
    const ages = [10, 15, 30, 17, 40]; const c = (a) => (a < 12 ? 20 : a < 18 ? 35 : 60);
    const total = ages.reduce((s, a) => s + c(a), 0);
    f.juste(18, "a)", ages.length); f.juste(18, "b)", c(15)); f.juste(18, "c)", total); f.faux(18, "b)", 55); py(f, 18, total);
  }
  {
    let a = 100, b = 100, m = 0; const tr = [];
    while (b <= a) { a += 30; b *= 1.2; m++; tr.push([a, arr2(b)]); }
    f.juste(19, "a)", tr[0][0]); f.juste(19, "b)", tr[0][1]); f.juste(19, "c)", m); f.juste(19, "d)", a); f.faux(19, "c)", 5); py(f, 19, m);
    f.vrai("boucles ex.19 trace", tr[4][1] === 248.83 && tr[5][1] === 298.6);
  }
  {
    const c5 = arr2(600 * 1.02 ** 5);
    let l = 600, n = 0; while (l <= 650) { l *= 1.02; n++; }
    f.juste(20, "a)", c5); f.juste(20, "b)", n); f.juste(20, "c)", "while"); f.faux(20, "c)", "for"); f.faux(20, "a)", 650); f.faux(20, "a)", 662.44); f.faux(20, "a)", 662.46); py(f, 20, n);
  }
  f.tout();
}

/* ═══════════════════════════ algo-listes ═══════════════════════════ */
{
  const f = await feuille("algo-listes");
  dessins(f);
  // ★
  { const L = [15, 8, 23, 4]; f.juste(1, null, L[2]); f.faux(1, null, L[1]); py(f, 1, L[2]); }
  { const L = [30, 12, 45, 9, 27]; f.juste(2, "a)", L[0]); f.juste(2, "b)", L[4]); f.juste(2, "c)", L.length); f.faux(2, "c)", 4); }
  { const L = [5, 9, 1, 7, 3, 8]; f.juste(3, null, `L[${L.length - 1}]`); f.faux(3, null, `L[${L.length}]`); f.juste(3, null, "L[-1]"); }
  { const L = [0, 1, 2, 3].map((i) => 2 * i); f.juste(4, null, L); f.juste(4, null, `[${L.join(", ")}]`); f.juste(4, null, `[${L.join(" ; ")}]`); f.faux(4, null, [2, 4, 6, 8]); f.faux(4, null, "[2 ; 4 ; 6 ; 8]"); }
  { const C = [0, 1, 2, 3, 4].map((i) => i * i); f.juste(5, null, C); f.faux(5, null, [1, 4, 9, 16, 25]); }
  { const L = [3, 6]; L.push(9); L.push(1); f.juste(6, null, L); f.faux(6, null, [1, 3, 6, 9]); }
  { const L = [7, 2, 5]; const v = L.map((_, i) => i); f.juste(7, null, v); f.faux(7, null, L); py(f, 7, ...v); }
  { let s = 0; for (const v of [4, 11, 6, 9]) s += v; f.juste(8, null, s); f.faux(8, null, 6); py(f, 8, s); }
  // ★★
  { const d = [12, 45, 8, 33, 27, 51]; const L = []; for (const v of d) if (v > 30) L.push(v); f.juste(9, "a)", L); f.juste(9, "b)", L.length); f.faux(9, "b)", d.length); py(f, 9, L.length); }
  {
    const L = [1200, 850, 2100, 1700]; let m = L[0]; const tr = [];
    for (const v of L) { if (v > m) m = v; tr.push(m); }
    f.juste(10, "a)", tr[1]); f.juste(10, "b)", m); f.faux(10, "b)", L.at(-1)); py(f, 10, m);
  }
  {
    const A = [0, 1, 2, 3].map((i) => 5 * i), B = [0, 1, 2, 3].map((i) => 5 * (i + 1)), C = [1, 2, 3].map((i) => 5 * i);
    const voulu = "5,10,15,20";
    f.juste(11, "a)", B.join() === voulu && A.join() !== voulu && C.join() !== voulu ? "B" : "?"); f.faux(11, "a)", "A"); f.juste(11, "b)", A);
  }
  { const S = [1900, 2300, 2100, 3000]; f.juste(12, "a)", S[1]); f.juste(12, "b)", S.length - 1); f.juste(12, "c)", S[4] === undefined ? "oui" : "non"); f.faux(12, "a)", S[0]); }
  { const C = [320, 280, 410, 350]; f.juste(13, "a)", C[0] + C[3]); f.juste(13, "b)", C[2] - C[1]); f.faux(13, "a)", C[0] + C[2]); py(f, 13, C[0] + C[3], C[2] - C[1]); }
  { let x = 100; const L = [x]; for (let i = 0; i < 3; i++) { x *= 2; L.push(x); } f.juste(14, "a)", L); f.juste(14, "b)", L[3]); f.faux(14, "a)", [200, 400, 800]); }
  { const n = [12, 8, 15, 9, 16]; const s = n.reduce((a, b) => a + b, 0); f.juste(15, "a)", n.length); f.juste(15, "b)", s); f.juste(15, "c)", s / n.length); f.faux(15, "c)", s / 4); py(f, 15, s / n.length); }
  { const P = [80, 120, 95, 150, 100]; const r = P.flatMap((v, i) => (v >= 100 ? [i] : [])); f.juste(16, "a)", r); f.juste(16, "b)", P[3]); f.faux(16, "a)", [120, 150, 100]); py(f, 16, ...r); }
  // ★★★
  {
    const P = [2, 15, 8, 31, 12, 12]; const L = []; let total = 0;
    for (const v of P) if (v > 10) { L.push(v); total += v; }
    f.juste(17, "a)", L); f.juste(17, "b)", L.length); f.juste(17, "c)", total); f.juste(17, "d)", total / P.reduce((a, b) => a + b, 0)); f.faux(17, "a)", [15, 31, 12]);
    f.vrai("listes ex.17 : la masse totale annoncée", P.reduce((a, b) => a + b, 0) === 80);
  }
  { const S = [0, 1, 2, 3, 4].map((i) => 3 * i + 1); f.juste(18, "a)", S); f.juste(18, "b)", S[2]); const S2 = [...S, 20]; f.juste(18, "c)", S2.length); f.juste(18, "d)", S2.length - 1); f.faux(18, "a)", [4, 7, 10, 13, 16]); }
  {
    const V = [420, 510, 380, 640, 590]; let m = V[0], r = 0;
    V.forEach((v, i) => { if (v > m) { m = v; r = i; } });
    f.juste(19, "a)", m); f.juste(19, "b)", r); f.juste(19, "c)", ["janvier", "février", "mars", "avril", "mai"][r]); f.juste(19, "c)", "en avril"); f.faux(19, "c)", "mars"); py(f, 19, m, r);
  }
  {
    const T = [14, 16, 19, 23, 21]; const E = [];
    for (let i = 0; i < 4; i++) E.push(T[i + 1] - T[i]);
    f.juste(20, "a)", E); f.juste(20, "b)", E.length); f.juste(20, "c)", Math.max(...E)); f.juste(20, "d)", T[5] === undefined ? "oui" : "non"); f.faux(20, "a)", [2, 3, 4, 2]);
  }
  f.tout();
}

/* ═══════════════════════════ algo-fonctions ═══════════════════════════ */
{
  const f = await feuille("algo-fonctions");
  dessins(f);
  // ★
  { const double = (x) => 2 * x; f.juste(1, null, double(7)); f.faux(1, null, 7); py(f, 1, double(7)); }
  { const aire = (a, b) => a * b; f.juste(2, "a)", aire.length); f.juste(2, "b)", aire(6, 4)); f.faux(2, "a)", 3); py(f, 2, aire(6, 4)); }
  f.juste(3, null, "taux"); f.faux(3, null, "prix_ttc");
  { const g = (x) => { const y = 3 * x + 1; return y; }; f.juste(4, "a)", "y"); f.juste(4, "b)", g(2)); f.faux(4, "a)", "x"); }
  f.juste(5, "a)", "non"); f.juste(5, "b)", "return nouveau"); f.juste(5, "b)", "return(nouveau)"); f.faux(5, "b)", "print(nouveau)");
  f.vrai("fonctions ex.5 : pas de return dans le dessin", !lignesDe(f.exercices[4].figure).join(" ").includes("return"));
  { const ecart = (a, b) => a - b; f.juste(6, null, ecart(3, 10)); f.faux(6, null, 7); py(f, 6, ecart(3, 10)); }
  { const total = (a, b) => a + b; f.juste(7, "a)", total.length); f.juste(7, "b)", [5].length); f.faux(7, "a)", 1); }
  { const frais = (m) => (m >= 100 ? 0 : 8); f.juste(8, "a)", frais(150)); f.juste(8, "b)", frais(60)); f.juste(8, "c)", frais(100)); f.faux(8, "c)", 8); }
  // ★★
  { const p = (h, t) => h * (1 + t / 100); f.juste(9, "a)", p(200, 20)); f.juste(9, "b)", p(20, 200)); f.faux(9, "b)", 240); py(f, 9, p(200, 20)); }
  { const imc = (m, t) => m / (t * t); f.juste(10, "a)", Math.round(imc(64, 1.6) * 10) / 10); f.juste(10, "b)", imc(72, 1.5)); f.faux(10, "a)", 64 / 1.6); py(f, 10, 25); }
  { const an = (c) => c * 1.1; f.juste(11, "a)", arr2(an(1000))); f.juste(11, "b)", arr2(an(an(1000)))); f.faux(11, "b)", 1200); py(f, 11, arr2(an(an(1000)))); }
  { const v = (d, t) => d / t; f.juste(12, "a)", v.length); f.juste(12, "b)", v(20, 2)); f.juste(12, "c)", v(42, 3)); f.faux(12, "c)", 3 / 42); }
  { const marge = (vente, achat) => vente - achat; f.juste(13, "a)", "vente - achat"); f.juste(13, "a)", "return vente - achat"); f.faux(13, "a)", "achat - vente"); f.juste(13, "b)", marge(30, 18)); }
  { const farine = (n) => 250 * n; let t = farine(4); f.juste(14, "a)", t); t = t + 100; f.juste(14, "b)", t); f.faux(14, "b)", 350); py(f, 14, t); }
  { const l = lignesDe(f.exercices[14].figure); const avec = l.filter((x) => /\*\s*1\.2/.test(x)).length; f.juste(15, "a)", avec); f.juste(15, "b)", 1); f.faux(15, "a)", 4); }
  {
    const ttc = (h) => h * 1.2; const panier = [10, 20, 30]; let total = 0, appels = 0;
    for (const p of panier) { total += ttc(p); appels++; }
    f.juste(16, "a)", appels); f.juste(16, "b)", arr2(total)); f.juste(16, "c)", lignesDe(f.exercices[15].figure).filter((x) => x.includes("1.2")).length); f.faux(16, "c)", 3); py(f, 16, arr2(total));
  }
  // ★★★
  {
    const tarif = (age) => (age < 4 ? 0 : age < 18 ? 12 : 20);
    const total = [2, 9, 15, 40, 43].reduce((s, a) => s + tarif(a), 0);
    f.juste(17, "a)", tarif.length); f.juste(17, "b)", tarif(4)); f.juste(17, "c)", total); f.faux(17, "b)", 0); py(f, 17, total);
  }
  {
    const r = (p, t) => p * (1 - t / 100); const fin2 = r(r(200, 10), 20);
    f.juste(18, "a)", r(200, 10)); f.juste(18, "b)", fin2); f.juste(18, "c)", (200 - fin2) / 200); f.faux(18, "c)", "30 %"); py(f, 18, fin2);
  }
  {
    const facture = (k) => 15 + 0.2 * k; const annee = (k) => 12 * facture(k);
    f.juste(19, "a)", facture(100)); f.juste(19, "b)", facture(0)); f.juste(19, "c)", annee(100)); f.juste(19, "d)", lignesDe(f.exercices[18].figure).filter((x) => x.includes("0.2")).length); f.faux(19, "c)", 1200); py(f, 19, annee(100));
  }
  {
    const mois = (c, s) => { let n = 0; while (c < s) { c *= 1.5; n++; } return n; };
    f.juste(20, "a)", "n"); f.juste(20, "b)", mois(100, 300)); f.juste(20, "c)", mois(100, 1000)); f.faux(20, "c)", 9);
  }
  f.tout();
}

/* ═══════════════════════════ tableur-formules ═══════════════════════════ */
{
  const f = await feuille("tableur-formules");
  // ★
  { const c = { B2: 420, B3: 380, B4: 510, B5: 460 }; f.juste(1, null, c.B4); f.faux(1, null, c.B5); }
  f.juste(2, null, "B3"); f.faux(2, null, "3B"); f.faux(2, null, "B2");
  f.juste(3, null, cal("=B2+B3", { B2: 120, B3: 80 }));
  f.faux(3, null, 5);
  f.juste(4, null, cal("=B4-B2", { B2: 150, B3: 210, B4: 300 })); f.faux(4, null, -150);
  f.juste(5, null, cal("=B2*1,1", { B2: 200 })); f.faux(5, null, 201.1);
  f.juste(6, null, 1 - 0.8 > 0 && Math.abs(1 - 0.8 - 0.2) < 1e-9 ? "B" : "?"); f.faux(6, null, "C");
  f.juste(7, null, "=B2*1,05"); f.juste(7, null, "=1,05*B2"); f.juste(7, null, "=B2*1.05"); f.juste(7, null, "B2*1,05"); f.juste(7, null, "B3=B2*1,05"); f.juste(7, null, "=B2*105%"); f.juste(7, null, "=$B2*1,05"); f.juste(7, null, "=B2*(1+5%)"); f.faux(7, null, "=B3*1,05"); f.faux(7, null, "=$B$2*1,05"); f.faux(7, null, "=B2*5%");
  f.vrai("formules ex.7 : recopie", recopie("=B2*1,05", 1) === "=B3*1,05");
  f.juste(8, null, "=B2+50"); f.faux(8, null, "=B2*50"); f.vrai("formules ex.8", cal("=B2+50", { B2: 100 }) === 150);
  // ★★
  {
    const c = { B2: 20, C2: 24, B3: 16, C3: 18, B4: 30, C4: 26 };
    f.juste(9, "a)", c.C3); f.juste(9, "b)", cal("=B4-C4", c)); f.juste(9, "c)", Object.keys(c).find((k) => c[k] === 24)); f.faux(9, "a)", c.C4);
  }
  {
    const c = { B2: 1.2, C2: 50, B3: 1.1, C3: 40 };
    f.juste(10, "a)", cal("=B2*C2", c)); f.juste(10, "b)", recopie("=B2*C2", 1)); f.juste(10, "c)", cal(recopie("=B2*C2", 1), c)); f.faux(10, "b)", "=B2*C2");
  }
  {
    const c = { B2: 120, C2: 150, B3: 80, C3: 70 };
    f.juste(11, "a)", "=B2*B3"); f.juste(11, "a)", "=B$2*B$3"); f.faux(11, "a)", "=$B2*$B3"); f.juste(11, "b)", recopie("=B2*B3", 0, 1)); f.juste(11, "c)", cal(recopie("=B2*B3", 0, 1), c)); f.faux(11, "b)", "=B3*B4");
  }
  {
    const c = { B2: 5000 }; c.B3 = cal("=B2*1,02", c); c.B4 = cal(recopie("=B2*1,02", 1), c);
    f.juste(12, "a)", "=B2*1,02"); f.juste(12, "b)", recopie("=B2*1,02", 1)); f.juste(12, "c)", c.B3); f.juste(12, "d)", c.B4); f.faux(12, "d)", 5200);
  }
  {
    const c = { B2: 30, C2: 120, B3: 45, C3: 150 };
    f.juste(13, "a)", cal("=B2/C2", c)); f.juste(13, "b)", recopie("=B2/C2", 1)); f.juste(13, "c)", cal(recopie("=B2/C2", 1), c)); f.faux(13, "b)", "=C3/B3");
  }
  { const c = { B2: 400 }; f.juste(14, "a)", 1 - 0.75); f.juste(14, "b)", cal("=B2*0,75", c)); f.juste(14, "c)", "=B2*1,4"); f.juste(14, "c)", recopie("=B2*1,4", 0)); f.faux(14, "a)", "75 %"); f.faux(14, "c)", "=B2*0,4"); }
  { const c = { B2: 350, B3: 420, B4: 130 }; f.juste(15, "a)", "=B2+B3+B4"); f.juste(15, "a)", "=B4+B2+B3"); f.juste(15, "a)", "=SOMME(B2:B4)"); f.faux(15, "a)", "=B2+B3"); f.juste(15, "b)", cal("=B2+B3+B4", c)); f.juste(15, "c)", "B3"); }
  {
    const c = { B2: 50 };
    f.juste(16, "a)", "=B2*1,2"); f.faux(16, "a)", "=B3*1,2"); f.faux(16, "a)", "B2*1,2"); f.faux(16, "a)", "=B2*20");
    f.juste(16, "b)", "Sofia"); f.juste(16, "c)", cal("=B2*20", c)); f.juste(16, "d)", cal("=B2*1,2", c));
  }
  // ★★★
  {
    const c = { B2: 12, C2: 90, B3: 20, C3: 110 }; c.D3 = cal(recopie("=B2*C2", 1), c);
    f.juste(17, "a)", "=B2*C2"); f.juste(17, "b)", "=D2*0,85"); f.juste(17, "b)", "=D2-D2*0,15"); f.juste(17, "b)", "=D2*85%"); f.faux(17, "b)", "=D2*0,15"); f.juste(17, "c)", c.D3); f.juste(17, "d)", cal(recopie("=D2*0,85", 1), c)); f.faux(17, "b)", "=D2*15");
  }
  {
    const c = { B2: 1000 }; c.B3 = cal("=B2*1,1-200", c); c.B4 = cal(recopie("=B2*1,1-200", 1), c);
    f.juste(18, "a)", "=B2*1,1-200"); f.faux(18, "a)", "=B3*1,1-200"); f.faux(18, "a)", "=B2*1,1-B2*200"); f.juste(18, "b)", c.B3); f.juste(18, "c)", c.B4); f.juste(18, "d)", c.B4 > c.B3 ? "oui" : "non");
  }
  {
    const c = { B2: 8, C2: 3, B3: 9, C3: 2 }; const a = cal("=B2*3+C2", c), l = cal(recopie("=B2*3+C2", 1), c);
    f.juste(19, "a)", "=B2*3+C2"); f.juste(19, "b)", recopie("=B2*3+C2", 1)); f.juste(19, "c)", l); f.juste(19, "d)", l > a ? "Loups" : "Aigles"); f.faux(19, "a)", "=B2+C2"); f.faux(19, "d)", "Aigles");
  }
  {
    const c = { B2: 100, B3: 150 };
    f.juste(20, "a)", "=60+B2*3,5"); f.juste(20, "a)", "=60+B2*3,50"); f.faux(20, "a)", "=(60+B2)*3,5"); f.juste(20, "b)", cal("=60+B2*3,5", c)); f.juste(20, "c)", cal(recopie("=60+B2*3,5", 1), c)); f.juste(20, "d)", (235 - 60) / 3.5);
  }
  f.tout();
}

/* ═══════════════════════════ tableur-recopie ═══════════════════════════ */
{
  const f = await feuille("tableur-recopie");
  // ★
  f.juste(1, null, recopie("=B2*C2", 1)); f.juste(1, null, "B3*C3"); f.juste(1, null, "D3=B3*C3"); f.faux(1, null, "=B2*C2");
  f.juste(2, null, recopie("=B2*$C$1", 1)); f.faux(2, null, "=B3*$C$2"); f.faux(2, null, "=B3*C2");
  f.juste(3, null, recopie("=B3*C$1", 3)); f.faux(3, null, "=B4*C$1");
  f.juste(4, null, recopie("=B2+B3", 0, 1)); f.faux(4, null, "=B3+B4");
  f.juste(5, null, "=B2*$D$1"); f.juste(5, null, "=B2*D$1"); f.faux(5, null, "=B2*D1"); f.faux(5, null, "=$B$2*$D$1");
  {
    const a = [[0, 1000], [1, 1200], [2, 1440], [3, 1728], [4, 2074]];
    f.juste(6, null, a.find(([, v]) => v > 1500)[0]); f.faux(6, null, 5);
  }
  { const v = [80, 140, 100, 180, 120, 160]; f.juste(7, null, v.filter((x) => x > 120).length); f.faux(7, null, v.filter((x) => x >= 120).length); }
  f.juste(8, null, "B"); f.faux(8, null, "A");
  // ★★
  {
    const c = { B2: 200000, B3: 150000, D1: 0.05 };
    f.juste(9, "a)", "=B2*$D$1"); f.faux(9, "a)", "=$B$2*$D$1");
    const fausse = recopie("=B2*D1", 1);
    f.juste(9, "b)", fausse); f.juste(9, "c)", cal(fausse, c)); f.juste(9, "d)", cal(recopie("=B2*$D$1", 1), c)); f.faux(9, "b)", "=B3*D1");
  }
  {
    const c = { B1: 2, C1: 3, D1: 4, A2: 5, A3: 6 }; const m = "=$A2*B$1";
    f.juste(10, "a)", recopie(m, 0, 1)); f.juste(10, "b)", recopie(m, 1, 0)); f.juste(10, "c)", cal(recopie(m, 1, 2), c)); f.faux(10, "a)", "=$B2*C$1"); f.faux(10, "b)", "=$A3*B$2");
  }
  {
    const c = { B2: 2000, E1: 0.78 };
    f.juste(11, "a)", "=B2*$E$1"); f.juste(11, "b)", recopie("=B2*$E$1", 2)); f.juste(11, "b)", "=B4*E$1"); f.juste(11, "b)", "=$B4*$E$1"); f.faux(11, "b)", "=B4*E1"); f.juste(11, "c)", cal("=B2*$E$1", c)); f.juste(11, "d)", 1); f.faux(11, "b)", "=B2*$E$1");
  }
  {
    const t = [["lundi", 25], ["mardi", 28], ["mercredi", 33], ["jeudi", 31], ["vendredi", 29], ["samedi", 35], ["dimanche", 27]];
    f.juste(12, "a)", t.filter(([, v]) => v > 30).length); f.juste(12, "b)", t.find(([, v]) => v > 30)[0]);
    const i = t.findIndex(([, v]) => v === Math.max(...t.map((x) => x[1]))); f.juste(12, "c)", `B${i + 2}`); f.faux(12, "c)", `B${i + 1}`); f.faux(12, "a)", 1);
  }
  {
    const v = [800]; for (let k = 1; k <= 4; k++) v.push(cal(recopie("=B2*1,5", k - 1), { [`B${k + 1}`]: v[k - 1] }));
    f.juste(13, "a)", "=B2*1,5"); f.juste(13, "a)", "=B2*150%"); f.juste(13, "a)", "=B2+B2*50%"); f.juste(13, "a)", "=0,5*B2+B2"); f.juste(13, "a)", "=$B2*1,5"); f.faux(13, "a)", "=$B$2*1,5"); f.faux(13, "a)", "=B2*50%"); f.juste(13, "b)", v[4]); f.juste(13, "c)", v.findIndex((x) => x > 2000));
  }
  f.juste(14, "a)", "courbe"); f.juste(14, "a)", "la courbe"); f.juste(14, "b)", "circulaire"); f.juste(14, "b)", "un camembert"); f.juste(14, "c)", "barres"); f.juste(14, "c)", "un diagramme en barres"); f.faux(14, "c)", "circulaire"); f.faux(14, "a)", "barres");
  f.juste(15, "a)", "B"); f.juste(15, "b)", "courbe"); f.juste(15, "b)", "barres"); f.faux(15, "a)", "A"); f.faux(15, "b)", "circulaire");
  {
    const c = { B2: 40, C2: 3, B3: 25, C3: 4 }; const m = "=$B$2*$C$2";
    f.vrai("recopie ex.16 : tout figé", recopie(m, 1) === m);
    f.juste(16, "a)", recopie(m, 1)); f.juste(16, "b)", cal(recopie(m, 1), c)); f.juste(16, "c)", cal(recopie("=B2*C2", 1), c)); f.juste(16, "d)", "=B2*C2"); f.juste(16, "d)", "=$B2*$C2"); f.faux(16, "d)", "=$B$2*$C$2"); f.faux(16, "a)", "=B3*C3");
  }
  // ★★★
  {
    const p = [50, 120, 80, 60, 90]; const s = p.map((x) => arr2(x * 0.7));
    f.juste(17, "a)", "=B2*$E$1"); f.juste(17, "b)", s.filter((x) => x > 50).length); f.juste(17, "c)", arr2(s.reduce((a, b) => a + b, 0))); f.juste(17, "d)", "barres"); f.faux(17, "b)", p.filter((x) => x > 50).length);
    f.vrai("recopie ex.17 : les 4 articles du piège", p.filter((x) => x > 50).length === 4);
  }
  {
    const v = [2000]; for (let k = 1; k <= 4; k++) v.push(v[k - 1] * 1.04);
    f.juste(18, "a)", "=B2*(1+$D$1)"); f.juste(18, "a)", "=B2*($D$1+1)"); f.juste(18, "a)", "=$D$1*B2+B2"); f.juste(18, "a)", "=$B2*(1+$D$1)"); f.juste(18, "b)", recopie("=B2*(1+$D$1)", 1)); f.juste(18, "c)", v.findIndex((x) => x > 2300)); f.juste(18, "d)", "courbe"); f.faux(18, "a)", "=$B$2*(1+$D$1)"); f.faux(18, "a)", "=B2*(1+D1)");
    f.vrai("recopie ex.18 : la colonne du corrigé", arr2(v[2]) === 2163.2 && arr2(v[3]) === 2249.73 && arr2(v[4]) === 2339.72);
  }
  {
    const eq = { Rouges: [6, 4], Bleus: [8, 1], Verts: [5, 3], Jaunes: [7, 0] };
    const pts = Object.fromEntries(Object.entries(eq).map(([k, [b, c]]) => [k, cal("=B2*$E$1+C2*$E$2", { B2: b, C2: c, E1: 3, E2: 1 })]));
    f.juste(19, "a)", recopie("=B2*$E$1+C2*$E$2", 2)); f.juste(19, "b)", pts.Bleus); f.juste(19, "c)", Object.values(pts).filter((x) => x > 20).length);
    f.juste(19, "d)", Object.entries(pts).sort((a, b) => b[1] - a[1])[0][0]); f.faux(19, "a)", "=B4*$E$3+C4*$E$4");
  }
  {
    const k = [400, 350, 260, 150, 320];
    f.juste(20, "a)", "=B2*$D$1"); f.juste(20, "b)", k.filter((x) => x * 0.2 > 60).length); f.juste(20, "c)", cal("=B2*$D$1", { B2: 400, D1: 0.25 })); f.juste(20, "d)", "circulaire"); f.faux(20, "a)", "=B2*D1");
  }
  f.tout();
}

/* ═══════════════════════════ logique-connecteurs ═══════════════════════════ */
{
  const f = await feuille("logique-connecteurs");
  const vf = (b) => (b ? "vrai" : "faux");
  const on = (b) => (b ? "oui" : "non");
  // ★
  { const p = (x) => x > 5 && x < 10; f.juste(1, "a)", vf(p(7))); f.juste(1, "a)", "vraie"); f.juste(1, "b)", vf(p(12))); f.juste(1, "b)", "fausse"); f.faux(1, "b)", "vrai"); f.faux(1, "b)", "vraie"); }
  { const p = (x) => x < 3 || x > 10; f.juste(2, "a)", vf(p(12))); f.juste(2, "b)", vf(p(5))); f.faux(2, "a)", "faux"); }
  { const n = 14; f.juste(3, null, vf(n % 2 === 0 || n > 10)); f.faux(3, null, "faux"); }
  // Les négations : on teste sur des valeurs, le cas d'égalité compris.
  const nie = (p, q, vals) => vals.every((x) => p(x) !== q(x));
  {
    const vals = [499, 500, 501], p = (m) => m > 500;
    const bonne = Object.entries({ A: (m) => m < 500, B: (m) => m <= 500, C: (m) => m === 500 }).filter(([, q]) => nie(p, q, vals)).map(([k]) => k);
    f.vrai("connecteurs ex.4 : une seule négation", bonne.length === 1); f.juste(4, null, bonne[0]); f.faux(4, null, "A");
  }
  {
    const vals = [7, 8, 9], p = (x) => x < 8;
    const bonne = Object.entries({ A: (x) => x > 8, B: (x) => x >= 8, C: (x) => x <= 8 }).filter(([, q]) => nie(p, q, vals)).map(([k]) => k);
    f.vrai("connecteurs ex.5 : une seule négation", bonne.length === 1); f.juste(5, null, bonne[0]); f.faux(5, null, "A");
  }
  {
    // Tous les cas d'un petit lot de trois colis.
    const lots = [0, 1, 2, 3, 4, 5, 6, 7].map((m) => [m & 1, m & 2, m & 4].map(Boolean));
    const p = (l) => l.every(Boolean);
    const bonne = Object.entries({ A: (l) => !l.some(Boolean), B: (l) => l.some((x) => !x), C: (l) => l.filter(Boolean).length === 1.5 }).filter(([, q]) => lots.every((l) => p(l) !== q(l))).map(([k]) => k);
    f.vrai("connecteurs ex.6", bonne.length === 1); f.juste(6, null, bonne[0]); f.faux(6, null, "A");
  }
  {
    const lots = [0, 1, 2, 3, 4, 5, 6, 7].map((m) => [m & 1, m & 2, m & 4].map(Boolean));
    const p = (l) => l.some(Boolean);
    const bonne = Object.entries({ A: (l) => !l.some(Boolean), B: (l) => l.every(Boolean), C: (l) => l.some((x) => !x) }).filter(([, q]) => lots.every((l) => p(l) !== q(l))).map(([k]) => k);
    f.vrai("connecteurs ex.7", bonne.length === 1); f.juste(7, null, bonne[0]); f.faux(7, null, "C");
  }
  f.juste(8, null, "exclusif"); f.faux(8, null, "inclusif");
  // ★★
  {
    const L = [[400, 6], [250, 3], [700, 2], [550, 8], [320, 7], [900, 4]];
    const et = L.filter(([c, a]) => c > 300 && a > 5).length;
    f.juste(9, "a)", et); f.juste(9, "b)", L.filter(([c, a]) => c > 300 || a > 5).length); f.faux(9, "a)", 4); py(f, 9, et);
  }
  f.juste(10, "a)", "and"); f.juste(10, "b)", "or"); f.faux(10, "a)", "or");
  {
    const F = [[130, 8], [95, 9], [140, 6], [110, 5], [125, 7], [150, 9]];
    const et = F.filter(([d, n]) => d > 120 && n > 7).length, ou = F.filter(([d, n]) => d > 120 || n > 7).length;
    f.juste(11, "a)", et); f.juste(11, "b)", ou); f.juste(11, "c)", F.length - ou); f.faux(11, "a)", F.filter(([d, n]) => d > 120 && n >= 7).length);
  }
  { f.juste(12, "a)", on(12 <= 30)); f.juste(12, "b)", 50 - 30); f.juste(12, "c)", 30 - 12); f.faux(12, "a)", "non"); }
  { const p = (m, fid) => m > 50 || fid; f.juste(13, "a)", on(p(30, true))); f.juste(13, "b)", on(p(60, false))); f.juste(13, "c)", on(p(30, false))); f.juste(13, "d)", on(p(60, true))); f.faux(13, "d)", "non"); }
  {
    const E = [[15, 18000], [13, 15000], [16, 25000], [14, 19000]];
    f.juste(14, "a)", E.filter(([m, r]) => m >= 14 && r < 20000).length); f.faux(14, "a)", 1);
    const vals = [13, 14, 15], p = (m) => m >= 14;
    const bonne = Object.entries({ A: (m) => m <= 14, B: (m) => m < 14, C: (m) => m > 14 }).filter(([, q]) => nie(p, q, vals)).map(([k]) => k);
    f.juste(14, "b)", bonne[0]); f.faux(14, "b)", "A");
  }
  {
    const nc = 1, n = 200;
    f.juste(15, "a)", vf(nc === 0)); f.juste(15, "b)", vf(nc === n)); f.juste(15, "c)", vf(nc >= 1)); f.faux(15, "b)", "vrai");
  }
  f.juste(16, "a)", "exclusif"); f.juste(16, "b)", "inclusif"); f.juste(16, "c)", "exclusif"); f.faux(16, "b)", "exclusif");
  // ★★★
  {
    const L = [[22, 16], [27, 18], [19, 12], [24, 15], [30, 10]];
    const et = L.filter(([a, n]) => a < 25 && n >= 15).length, ou = L.filter(([a, n]) => a < 25 || n >= 15).length;
    f.juste(17, "a)", et); f.juste(17, "b)", ou); f.juste(17, "c)", L.length - ou); f.juste(17, "d)", et / L.length); f.faux(17, "a)", 1); py(f, 17, et);
  }
  {
    const d = (v) => v >= 10 && v <= 25;
    f.juste(18, "a)", on(d(8))); f.juste(18, "b)", on(d(18))); f.juste(18, "c)", on(d(25))); f.juste(18, "d)", "B"); f.faux(18, "c)", "non"); f.faux(18, "d)", "A");
  }
  {
    const t = (a) => (a < 18 || a > 65 ? 5 : 9);
    const total = [12, 30, 70, 65, 17].reduce((s, a) => s + t(a), 0);
    f.juste(19, "a)", t(65)); f.juste(19, "b)", total); f.juste(19, "c)", "B"); f.juste(19, "d)", "non"); f.faux(19, "a)", 5); py(f, 19, total);
  }
  {
    const n = 200, l = 120, v = 70, d = 40;
    f.juste(20, "a)", d); f.juste(20, "b)", l + v - d); f.juste(20, "c)", n - (l + v - d)); f.juste(20, "d)", on(n - l > 0)); f.faux(20, "b)", l + v);
  }
  f.tout();
}

/* ═══════════════════════════ logique-raisonnement ═══════════════════════════ */
{
  const f = await feuille("logique-raisonnement");
  const seul = (cas, test) => { const r = cas.filter(test); return r.length === 1 ? r[0] : `plusieurs : ${r}`; };
  const vf = (b) => (b ? "vraie" : "fausse");
  const on = (b) => (b ? "oui" : "non");
  // ★ : le contre-exemple est CHERCHÉ parmi les cas de l'énoncé.
  f.juste(1, null, seul([0.5, 3, 7, 12], (x) => !(x * x > x))); f.faux(1, null, 3);
  f.juste(2, null, seul([-4, 2, 9, 15], (x) => !(x < 2 * x))); f.faux(2, null, 2);
  f.juste(3, null, seul([9, 15, 12, 21], (x) => x % 3 === 0 && x % 2 === 0)); f.faux(3, null, 9);
  f.juste(4, null, 100 * 1.5 * 0.5); f.faux(4, null, 100);
  f.juste(5, "a)", "B"); f.faux(5, "a)", "C"); f.faux(5, "a)", "A"); f.juste(5, "b)", "C"); f.faux(5, "b)", "A"); f.faux(5, "b)", "B");
  f.juste(6, null, vf([0, 1, 3, 10].every((x) => x <= 0 || x === 10))); f.juste(6, null, "faux"); f.faux(6, null, "vraie");
  f.juste(7, null, "suffisante"); f.juste(7, null, "condition suffisante"); f.faux(7, null, "nécessaire");
  f.juste(8, null, "nécessaire"); f.faux(8, null, "suffisante");
  // ★★
  f.juste(9, "a)", "B"); f.juste(9, "b)", "fausse"); f.juste(9, "c)", "suffisante"); f.faux(9, "a)", "A");
  {
    const sc = { A: [2, 0], B: [1, 3], C: [0, 0] };
    f.juste(10, "a)", vf(Object.values(sc).every(([m, a]) => m === 0 || m > a)));
    f.juste(10, "b)", seul(Object.keys(sc), (k) => sc[k][0] >= 1 && !(sc[k][0] > sc[k][1]))); f.faux(10, "b)", "C");
    f.juste(10, "c)", "nécessaire");
    // La contraposée a la valeur de vérité de la phrase : on la teste sur tous les scores d'une petite grille.
    const scores = [0, 1, 2, 3].flatMap((m) => [0, 1, 2, 3].map((a) => [m, a]));
    const phrase = scores.every(([m, a]) => !(m > a) || m >= 1), contra = scores.every(([m, a]) => !(m === 0) || !(m > a));
    f.vrai("raisonnement ex.10 : phrase et contraposée vraies", phrase && contra);
    f.juste(10, "d)", vf(contra)); f.faux(10, "d)", "fausse");
  }
  {
    const p = (x) => Math.abs(x * 1.2 - x - x * 0.2) < 1e-9;
    f.juste(11, "a)", vf([1, 80000, 3.5].every(p))); f.juste(11, "b)", "oui"); f.juste(11, "c)", 80000 * 1.2); f.faux(11, "a)", "fausse");
  }
  {
    const S = { A: [5, 10, 20, 40], B: [1, 4, 7, 10], C: [8, 4, 2, 1] };
    const croissante = (u) => u.every((v, i) => i === 0 || v > u[i - 1]);
    const raison2 = (u) => u.every((v, i) => i === 0 || v === 2 * u[i - 1]);
    f.juste(12, null, seul(Object.keys(S), (k) => croissante(S[k]) && !raison2(S[k]))); f.faux(12, null, "C");
  }
  {
    const moy = (a) => a.reduce((s, x) => s + x, 0) / a.length;
    f.juste(13, "a)", moy([8, 12])); f.juste(13, "b)", moy([10, 10])); f.juste(13, "c)", vf(moy([8, 12]) !== moy([10, 10]))); f.faux(13, "c)", "vraie");
  }
  { const m = 100 * 1.1 * 1.1; f.juste(14, "a)", arr2(m)); f.juste(14, "b)", arr2(m) - 100); f.juste(14, "c)", vf(Math.abs(m - 120) < 1e-9)); f.faux(14, "b)", "20 %"); }
  { f.juste(15, "a)", 1 / 2); f.juste(15, "b)", 1 / 4); f.juste(15, "c)", vf(1 / 4 > 1 / 2)); f.faux(15, "c)", "vraie"); }
  {
    // On teste les deux sens sur des valeurs : nécessaire, suffisante ou les deux.
    const vals = [0, 5, 9, 10, 12, 14, 16, 20];
    const nature = (a, b) => {
      const suff = vals.every((x) => !a(x) || b(x)), nec = vals.every((x) => !b(x) || a(x));
      return suff && nec ? "les deux" : suff ? "suffisante" : nec ? "nécessaire" : "aucune";
    };
    f.juste(16, "a)", nature((m) => m >= 14, (m) => m >= 10)); f.juste(16, "b)", nature((m) => m >= 10, (m) => m >= 14)); f.juste(16, "c)", nature((x) => x === 5, (x) => x + 1 === 6)); f.juste(16, "c)", "nécessaire et suffisante"); f.faux(16, "c)", "suffisante"); f.faux(16, "b)", "suffisante");
  }
  // ★★★
  {
    const regle = (v) => v > 50000; // si vrai : prime. La prime peut venir d'ailleurs.
    f.juste(17, "a)", on(regle(60000))); f.juste(17, "b)", "non"); f.juste(17, "c)", "non"); f.juste(17, "d)", "suffisante"); f.faux(17, "c)", "oui");
  }
  {
    const c = 2000 * 1.1, g = 1.1 * 0.9;
    f.juste(18, "a)", arr2(c)); f.juste(18, "b)", arr2(c * 0.9)); f.juste(18, "c)", arr2(g)); f.juste(18, "d)", vf(arr2(c * 0.9) === 2000)); f.faux(18, "b)", 2000);
  }
  {
    f.juste(19, "a)", seul([12, 18, 9, 24], (x) => x % 3 === 0 && x % 6 !== 0)); f.juste(19, "b)", vf(9 % 6 === 0)); f.juste(19, "c)", "nécessaire"); f.juste(19, "d)", on([...Array(100).keys()].some((x) => x % 3 !== 0 && x % 6 === 0))); f.faux(19, "d)", "oui"); f.faux(19, "a)", 12);
  }
  {
    f.juste(20, "a)", "A"); f.juste(20, "b)", seul([2, 12, 20], (x) => x > 0 && !(x > 10)));
    const carre = (x) => Number.isInteger(Math.sqrt(x));
    f.juste(20, "c)", seul([16, 25, 7], (x) => x > 0 && !carre(x))); f.faux(20, "a)", "B");
  }
  f.tout();
}

fin();
