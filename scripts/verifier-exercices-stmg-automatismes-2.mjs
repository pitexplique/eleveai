// Recalcul indépendant du lot « automatismes 2 » de STMG (05/11/2026) :
// auto-droites, auto-lecture-graphique, auto-resolution-graphique, auto-signes,
// auto-terminale-derivee, auto-terminale-reconnaitre (lib/fiches-exercices/maths-stmg-*.tsx).
//
// ⭐ Les réponses lues sur un dessin sont recalculées À PARTIR DU DESSIN : le script
// relit les courbes dans `ex.figure` (les props du canvas), puis lit l'image, cherche
// les antécédents et résout les inéquations par balayage numérique. Les tableaux de
// signes et de variations dessinés sont relus eux aussi. Les dérivées sont calculées
// sur les coefficients de l'énoncé, recopiés ici.
//
// Usage : npx --yes tsx@4 scripts/verifier-exercices-stmg-automatismes-2.mjs
import { feuille, fin } from "./verifier-exercices-stmg-lot-commun.mjs";

/* ─────────────── lire un élément React : le canvas d'une figure ─────────────── */

// Tous les `figure` (props du canvas) sous un élément, dans l'ordre.
function canvasDe(el) {
  if (!el || typeof el !== "object") return [];
  if (Array.isArray(el)) return el.flatMap(canvasDe);
  if (el.props?.figure) return [el.props.figure];
  return canvasDe(el.props?.children);
}

// La fonction d'une courbe du canvas, sans passer par les coefficients de l'énoncé.
function fonctionDe(courbe) {
  if (courbe.type === "quadratique") return (x) => courbe.a * x * x + courbe.b * x + courbe.c;
  const pts = courbe.points;
  return (x) => {
    for (let i = 0; i + 1 < pts.length; i++) {
      if (x >= pts[i].x - 1e-9 && x <= pts[i + 1].x + 1e-9) {
        const t = (x - pts[i].x) / (pts[i + 1].x - pts[i].x);
        return pts[i].y + t * (pts[i + 1].y - pts[i].y);
      }
    }
    return NaN;
  };
}

const courbeDe = (f, k, i = 0) => fonctionDe(canvasDe(f.exercices[k - 1].figure)[0].courbes[i]);
const bornesDe = (f, k, i = 0) => {
  const c = canvasDe(f.exercices[k - 1].figure)[0];
  const pts = c.courbes[i].points;
  return pts ? [pts[0].x, pts[pts.length - 1].x] : [c.xmin, c.xmax];
};
const racine = (x) => Number(x.toFixed(6));

/* ─────────────── résoudre par balayage ─────────────── */

// Les x de [lo ; hi] où g s'annule : changement de signe ou contact.
function zeros(g, lo, hi) {
  const res = [];
  const pas = (hi - lo) / 20011;
  const ajoute = (x) => {
    const r = racine(x);
    if (!res.some((y) => Math.abs(y - r) < 1e-4)) res.push(r);
  };
  if (Math.abs(g(lo)) < 1e-9) ajoute(lo);
  for (let i = 0; i < 20011; i++) {
    let a = lo + i * pas;
    let b = a + pas;
    let ga = g(a);
    const gb = g(b);
    if (ga === 0) ajoute(a);
    if (ga * gb < 0) {
      for (let n = 0; n < 60; n++) {
        const m = (a + b) / 2;
        if (g(m) * ga <= 0) b = m;
        else { a = m; ga = g(a); }
      }
      ajoute((a + b) / 2);
    }
  }
  if (Math.abs(g(hi)) < 1e-9) ajoute(hi);
  return res.sort((u, v) => u - v);
}

const antecedents = (fn, k, lo, hi) => zeros((x) => fn(x) - k, lo, hi);

// L'ensemble des x de [lo ; hi] (±Infinity permis) où fn(x) op k, écrit comme un élève.
function ensemble(fn, op, k, lo, hi) {
  const a = Number.isFinite(lo) ? lo : -200;
  const b = Number.isFinite(hi) ? hi : 200;
  const large = op === "<=" || op === ">=";
  const ok = (x) => (op === "<" || op === "<=" ? fn(x) - k < 0 : fn(x) - k > 0);
  const coupes = [a, ...zeros((x) => fn(x) - k, a, b).filter((z) => z > a && z < b), b];
  const morceaux = [];
  for (let i = 0; i + 1 < coupes.length; i++) {
    if (ok((coupes[i] + coupes[i + 1]) / 2)) {
      const g = coupes[i], d = coupes[i + 1];
      morceaux.push({
        g,
        d,
        gf: g === a ? Number.isFinite(lo) && (Math.abs(fn(a) - k) > 1e-9 || large) : large,
        df: d === b ? Number.isFinite(hi) && (Math.abs(fn(b) - k) > 1e-9 || large) : large,
      });
    }
  }
  const ecrire = (x, inf) => (Number.isFinite(x) ? String(x) : inf);
  return morceaux
    .map((m) => `${m.gf ? "[" : "]"}${m.g === a && !Number.isFinite(lo) ? "-∞" : ecrire(m.g)} ; ${m.d === b && !Number.isFinite(hi) ? "+∞" : ecrire(m.d)}${m.df ? "]" : "["}`)
    .join(" ∪ ");
}

// Le signe (+ / -) de fn sur les intervalles délimités par ses racines.
function signes(fn, coupes) {
  const s = [];
  for (let i = 0; i + 1 < coupes.length; i++) {
    const g = Number.isFinite(coupes[i]) ? coupes[i] : coupes[i + 1] - 50;
    const d = Number.isFinite(coupes[i + 1]) ? coupes[i + 1] : coupes[i] + 50;
    s.push(fn((g + d) / 2) > 0 ? "+" : "-");
  }
  return s;
}
const mot = (v) => (v > 0 ? "positif" : "négatif");

// Les intervalles de [lo ; hi] où fn monte (sens = 1) ou descend (sens = -1), en crochets fermés.
function monotonie(fn, sens, lo, hi) {
  const pas = 1 / 64;
  const res = [];
  let debut = null;
  for (let x = lo; x < hi - 1e-9; x += pas) {
    const bon = Math.sign(fn(x + pas) - fn(x)) === sens;
    if (bon && debut === null) debut = x;
    if (!bon && debut !== null) { res.push([debut, x]); debut = null; }
  }
  if (debut !== null) res.push([debut, hi]);
  return res.map(([a, b]) => `[${a} ; ${b}]`).join(" ∪ ");
}

// Les règles des dessins (brief, figures.tsx) : ymin < 0, 15 unités au plus, `grand` au-delà de 10.
function ctrlCadres(f) {
  f.exercices.forEach((ex, i) => {
    for (const c of [...canvasDe(ex.figure), ...canvasDe(ex.schema)]) {
      if (c.kind !== "fonctionGraphique") continue;
      const dx = c.xmax - c.xmin, dy = c.ymax - c.ymin;
      f.vrai(`${f.fiche.notion} ex.${i + 1} : ymin < 0`, c.ymin < 0);
      f.vrai(`${f.fiche.notion} ex.${i + 1} : 15 unités au plus`, dx <= 15 && dy <= 15);
      f.vrai(`${f.fiche.notion} ex.${i + 1} : grand au-delà de 10 unités`, Math.max(dx, dy) <= 10 || c.size.width === 272);
    }
  });
}

// Une évolution se reconnaît à son texte : un pourcentage répété, ou une quantité fixe.
const sorte = (phrase) => (phrase.includes("%") ? "géométrique" : "arithmétique");
const ligne = (f, k, debut) => f.exercices[k - 1].enonce.split("\n").find((l) => l.startsWith(debut));

/* ─────────────── relire les tableaux dessinés ─────────────── */

const nb = (t) => {
  const s = String(t).replace(/−/g, "-").replace(/\$/g, "");
  if (/^-∞$/.test(s)) return -Infinity;
  if (/^\+?∞$/.test(s)) return Infinity;
  return Number(s);
};

// La dernière ligne (ou la ligne i) d'un tableau de signes : conforme à fn ?
function ctrlSignes(f, k, fn, ou = "schema", i = -1) {
  const tab = canvasDe(f.exercices[k - 1][ou]).find((c) => c.kind === "tableau_signes");
  const ligne = tab.lignes[i < 0 ? tab.lignes.length + i : i];
  const coupes = tab.bornes.map(nb);
  f.vrai(`${f.fiche.notion} ex.${k} : tableau de signes (${ligne.label})`, signes(fn, coupes).join("") === ligne.signes.join(""));
}
// Un tableau de variations : ses valeurs sont-elles celles de fn aux bornes ?
function ctrlVariations(f, k, fn, ou = "schema") {
  const tab = canvasDe(f.exercices[k - 1][ou]).find((c) => c.kind === "tableau_variations");
  const bornes = tab.bornes.map(nb);
  const vals = tab.variations.valeurs.map(nb);
  f.vrai(`${f.fiche.notion} ex.${k} : tableau de variations`, bornes.every((x, j) => Math.abs(fn(x) - vals[j]) < 1e-9));
  // Entre deux bornes, fn reste monotone : les flèches du tableau disent vrai.
  for (let j = 0; j + 1 < bornes.length; j++) {
    const sens = Math.sign(vals[j + 1] - vals[j]);
    let monotone = true;
    for (let t = 0; t < 40; t++) {
      const u = bornes[j] + ((bornes[j + 1] - bornes[j]) * t) / 40;
      const v = bornes[j] + ((bornes[j + 1] - bornes[j]) * (t + 1)) / 40;
      if (Math.sign(fn(v) - fn(u)) !== sens && Math.abs(fn(v) - fn(u)) > 1e-9) monotone = false;
    }
    f.vrai(`${f.fiche.notion} ex.${k} : monotonie entre ${bornes[j]} et ${bornes[j + 1]}`, monotone);
  }
}

/* ─────────────── polynômes : coefficients du plus haut degré au plus bas ─────────────── */

const P = (coefs) => (x) => coefs.reduce((s, c) => s * x + c, 0);
const derivee = (coefs) => coefs.slice(0, -1).map((c, i) => c * (coefs.length - 1 - i));
function texte(coefs) {
  const n = coefs.length - 1;
  const parts = coefs
    .map((c, i) => [c, n - i])
    .filter(([c]) => c !== 0)
    .map(([c, d]) => `${c < 0 ? "-" : "+"}${Math.abs(c) === 1 && d > 0 ? "" : Math.abs(c)}${d === 0 ? "" : d === 1 ? "x" : `x^${d}`}`);
  return parts.join("").replace(/^\+/, "");
}
// Coefficient et ordonnée à l'origine d'une droite, depuis deux de ses points.
const parDeuxPoints = ([xa, ya], [xb, yb]) => {
  const a = (yb - ya) / (xb - xa);
  return { a, b: ya - a * xa, y: (x) => a * x + (ya - a * xa) };
};
const eq = ({ a, b }) => `y = ${a}x ${b < 0 ? "-" : "+"} ${Math.abs(b)}`;
// La droite lue dans la figure : deux lectures, en x = 0 et x = 1.
const droiteLue = (f, k, i = 0) => {
  const fn = courbeDe(f, k, i);
  return parDeuxPoints([0, fn(0)], [1, fn(1)]);
};

/* ═══════════════════════════ auto-droites ═══════════════════════════ */
{
  const f = await feuille("auto-droites");
  f.juste(1, null, 2 * 3 + 1); f.faux(1, null, 2 * 3);
  f.juste(2, "a)", `(${0} ; ${-0 + 4})`); f.juste(2, "b)", `(3 ; ${-3 + 4})`); f.faux(2, "b)", "(3 ; 7)"); f.faux(2, "a)", "(4 ; 0)");
  const d3 = droiteLue(f, 3);
  f.juste(3, "a)", d3.b); f.juste(3, "b)", d3.a); f.faux(3, "a)", 0.5);
  const d4 = droiteLue(f, 4);
  f.juste(4, null, eq(d4)); f.faux(4, null, "y = 3x - 2");
  const d5 = droiteLue(f, 5);
  f.juste(5, null, eq(d5)); f.faux(5, null, "y = x + 2");
  f.juste(6, null, droiteLue(f, 6).a); f.faux(6, null, -1);
  f.juste(7, null, parDeuxPoints([1, 2], [3, 10]).a); f.faux(7, null, 2 / 8);
  f.juste(8, null, parDeuxPoints([-1, 5], [2, -1]).a); f.faux(8, null, 2); f.faux(8, null, -6);
  f.juste(9, "a)", 2 * 3); f.juste(9, "b)", `(${1 + 2} ; ${2 + 2 * 3})`); f.juste(9, "c)", (2 + 2 * 3) * 100); f.faux(9, "a)", 3);
  const d10 = parDeuxPoints([1, 50], [4, 140]);
  f.juste(10, "a)", d10.a); f.juste(10, "b)", d10.b); f.juste(10, "c)", eq(d10)); f.faux(10, "b)", 50);
  const d11 = parDeuxPoints([0, -3], [2, 5]);
  f.juste(11, "a)", d11.a); f.juste(11, "b)", eq(d11)); f.juste(11, "c)", d11.y(5) * 100); f.faux(11, "c)", d11.y(50) * 100);
  const d12 = droiteLue(f, 12);
  f.juste(12, "a)", d12.b); f.juste(12, "b)", d12.a); f.juste(12, "c)", eq(d12)); f.juste(12, "d)", -d12.b / d12.a); f.faux(12, "b)", 1);
  const lena = parDeuxPoints([0, 0], [2, 40]).a, tom = parDeuxPoints([1, 25], [3, 70]).a;
  f.juste(13, "a)", lena); f.juste(13, "b)", tom); f.juste(13, "c)", tom > lena ? "Tom" : "Léna"); f.faux(13, "c)", "Léna");
  const h = (x) => 0.5 * x + 2;
  f.juste(14, "a)", [h(0), h(2), h(4)]); f.juste(14, "b)", h(6)); f.faux(14, "a)", [0, 3, 4]);
  const d15 = droiteLue(f, 15);
  f.juste(15, "a)", d15.a); f.juste(15, "b)", d15.b); f.juste(15, "c)", eq(d15)); f.juste(15, "d)", d15.a === 3 && d15.b === 2 ? "oui" : "non"); f.faux(15, "c)", "y = 3x + 2");
  const d16 = parDeuxPoints([20, 700], [60, 1500]);
  f.juste(16, "a)", d16.a); f.juste(16, "b)", d16.b); f.juste(16, "c)", d16.y(100)); f.faux(16, "a)", 700 / 20);
  const d17 = parDeuxPoints([5, 12], [15, 26]);
  f.juste(17, "a)", d17.a); f.juste(17, "b)", d17.b); f.juste(17, "c)", `y = ${String(d17.a).replace(".", ",")}x + ${d17.b}`); f.juste(17, "d)", d17.y(30)); f.faux(17, "d)", 52);
  const d18 = droiteLue(f, 18);
  f.juste(18, "a)", d18.b); f.juste(18, "b)", d18.a); f.juste(18, "c)", eq(d18)); f.juste(18, "d)", d18.y(3)); f.juste(18, "e)", (-d18.b / d18.a) * 10); f.faux(18, "e)", "5 ans");
  const A = parDeuxPoints([0, 20], [10, 50]), B = parDeuxPoints([0, 0], [4, 20]);
  f.juste(19, "a)", A.a); f.juste(19, "b)", eq(A)); f.juste(19, "c)", `y = ${B.a}x`); f.juste(19, "d)", A.y(15)); f.juste(19, "e)", B.y(15)); f.juste(19, "f)", A.y(15) < B.y(15) ? "A" : "B"); f.faux(19, "f)", "B");
  const d20 = parDeuxPoints([10, 400], [30, 300]);
  f.juste(20, "a)", d20.a); f.juste(20, "b)", d20.b); f.juste(20, "c)", eq(d20)); f.juste(20, "d)", -d20.b / d20.a); f.faux(20, "a)", 5);
  ctrlCadres(f);
  f.tout();
}

/* ═══════════════════════ auto-lecture-graphique ═══════════════════════ */
{
  const f = await feuille("auto-lecture-graphique");
  f.juste(1, null, courbeDe(f, 1)(4)); f.faux(1, null, 5);
  f.juste(2, null, antecedents(courbeDe(f, 2), 7, -4, 4)); f.faux(2, null, 3);
  const c3 = courbeDe(f, 3);
  f.juste(3, "a)", c3(3)); f.juste(3, "b)", c3(3) * 1000); f.faux(3, "b)", 4);
  f.juste(4, "a)", 100 / 5); f.juste(4, "b)", 3 * (100 / 5));
  const d5 = (x) => 2 * x - 1;
  f.juste(5, "a)", d5(3) === 5 ? "oui" : "non"); f.juste(5, "b)", d5(2) === 4 ? "oui" : "non"); f.faux(5, "b)", "oui");
  f.juste(6, null, (-2) ** 2 - 3); f.faux(6, null, -7);
  f.juste(7, null, (10 - 4) / 3); f.faux(7, null, 34);
  const pts8 = canvasDe(f.exercices[7].figure)[0].courbes[0].points;
  f.juste(8, null, pts8.find((p) => p.y > 5).x); f.faux(8, null, 6);
  const c9 = courbeDe(f, 9);
  f.juste(9, "a)", c9(4)); f.juste(9, "b)", c9(8)); f.juste(9, "c)", c9(8) - c9(4)); f.juste(9, "d)", antecedents(c9, 4, 0, 10)); f.faux(9, "c)", 4);
  const c10 = courbeDe(f, 10);
  f.juste(10, "a)", c10(4) * 100); f.juste(10, "b)", c10(2) * 100); f.juste(10, "c)", (c10(6) - c10(3)) * 100); f.faux(10, "c)", 5);
  const c11 = courbeDe(f, 11);
  const pts11 = canvasDe(f.exercices[10].figure)[0].courbes[0].points;
  const haut = pts11.reduce((m, p) => (p.y > m.y ? p : m));
  f.juste(11, "a)", 2020 + 3); f.juste(11, "b)", c11(3) * 1000); f.juste(11, "c)", [2020 + haut.x, haut.y * 1000]); f.faux(11, "a)", 3);
  const d12 = (x) => 5 * x + 20;
  f.juste(12, "a)", d12(4) === 40 ? "oui" : "non"); f.juste(12, "b)", d12(10) === 60 ? "oui" : "non"); f.juste(12, "c)", d12(6)); f.juste(12, "d)", (95 - 20) / 5); f.faux(12, "d)", 5 * 95 + 20);
  const c13 = courbeDe(f, 13);
  f.vrai("lecture ex.13 : la figure est bien la courbe de l'énoncé", [0, 1, 2, 3, 4].every((x) => c13(x) === -(x ** 2) + 4 * x + 1));
  f.juste(13, "a)", c13(2)); f.juste(13, "b)", c13(3) === 4 ? "oui" : "non"); f.juste(13, "c)", c13(4) === 2 ? "oui" : "non"); f.faux(13, "a)", 13);
  const pts14 = canvasDe(f.exercices[13].figure)[0].courbes[0].points;
  f.juste(14, "a)", pts14.find((p) => p.y > 6).x); f.juste(14, "b)", pts14.filter((p) => p.y > 8).length); f.juste(14, "c)", pts14.reduce((m, p) => (p.y > m.y ? p : m)).x); f.faux(14, "a)", 5);
  const pts15 = canvasDe(f.exercices[14].figure)[0].courbes[0].points;
  f.juste(15, "a)", pts15.find((p) => p.x === 3).y * 10); f.juste(15, "b)", pts15.find((p) => p.y * 10 > 120).x); f.juste(15, "c)", pts15.filter((p) => p.y * 10 > 110).length); f.faux(15, "a)", 13);
  const c16 = courbeDe(f, 16);
  const pts16 = canvasDe(f.exercices[15].figure)[0].courbes[0].points;
  f.juste(16, "a)", c16(2) * 100); f.juste(16, "b)", antecedents(c16, 6, 0, 8)[0]); f.vrai("lecture ex.16 : une seule semaine à la hauteur 6", antecedents(c16, 6, 0, 8).length === 1);
  f.juste(16, "c)", pts16.find((p) => p.y * 100 < 500).x); f.juste(16, "d)", (c16(8) - c16(0)) * 100); f.faux(16, "c)", 4);
  const pts17 = canvasDe(f.exercices[16].figure)[0].courbes[0].points;
  const c17 = courbeDe(f, 17);
  f.juste(17, "a)", c17(3) * 100); f.juste(17, "b)", (c17(5) - c17(3)) * 100); f.juste(17, "c)", pts17.filter((p) => p.y * 100 > 650).length); f.juste(17, "d)", pts17.reduce((s, p) => s + p.y, 0) * 100); f.faux(17, "c)", 4);
  const c18 = courbeDe(f, 18);
  f.vrai("lecture ex.18 : la figure est la droite y = 2x + 3", droiteLue(f, 18).a === 2 && droiteLue(f, 18).b === 3);
  f.juste(18, "a)", c18(3)); f.juste(18, "b)", c18(3) * 1000); f.juste(18, "c)", c18(4) === 11 ? "oui" : "non"); f.juste(18, "d)", ((13 - 3) / 2) * 100); f.juste(18, "e)", ((8 - 3) / 2) * 100); f.faux(18, "d)", 5);
  const c19 = courbeDe(f, 19);
  f.vrai("lecture ex.19 : la figure est la courbe de l'énoncé", [0, 1, 2, 5].every((x) => c19(x) === -(x ** 2) + 6 * x));
  let max19 = -Infinity; for (let x = 0; x <= 6; x += 0.001) max19 = Math.max(max19, c19(x));
  f.juste(19, "a)", c19(1) * 10); f.juste(19, "b)", max19 * 10); f.juste(19, "c)", antecedents(c19, 8, 0, 6)); f.juste(19, "d)", c19(5) === 5 ? "oui" : "non");
  const a19 = antecedents(c19, 5, 0, 6); f.juste(19, "e)", a19[1] - a19[0]); f.faux(19, "c)", 8);
  const c20 = courbeDe(f, 20);
  f.juste(20, "a)", c20(2)); f.juste(20, "b)", c20(4)); f.juste(20, "c)", antecedents(c20, 7, 0, 6)[0]); f.juste(20, "d)", c20(5)); f.juste(20, "e)", c20(5) * 1000); f.faux(20, "c)", 3); f.faux(20, "d)", 2.25);
  ctrlCadres(f);
  f.tout();
}

/* ═════════════════════ auto-resolution-graphique ═════════════════════ */
{
  const f = await feuille("auto-resolution-graphique");
  const I = Infinity;
  const c1 = courbeDe(f, 1);
  f.juste(1, null, antecedents(c1, 3, -2, 5)); f.faux(1, null, c1(3));
  f.juste(2, null, antecedents(courbeDe(f, 2), 1, -2, 6)); f.faux(2, null, 4);
  f.juste(3, null, ensemble(courbeDe(f, 3), "<", 1, -I, I)); f.faux(3, null, "]-∞ ; 2["); f.faux(3, null, "]1 ; +∞[");
  f.juste(4, null, ensemble(courbeDe(f, 4), ">=", 4, 0, 6)); f.faux(4, null, "]2 ; 5[");
  f.juste(5, null, ensemble(courbeDe(f, 5), ">", 0, -I, I)); f.faux(5, null, "]0 ; +∞[");
  const c6 = courbeDe(f, 6);
  f.juste(6, "a)", ensemble(c6, "<", 0, -I, I)); f.juste(6, "b)", ensemble(c6, ">", 0, -I, I)); f.faux(6, "b)", "]3 ; +∞["); ctrlSignes(f, 6, c6);
  const c7 = courbeDe(f, 7);
  f.juste(7, "a)", monotonie(c7, 1, 0, 6)); f.juste(7, "b)", monotonie(c7, -1, 0, 6)); f.juste(7, "c)", Math.max(c7(0), c7(2), c7(6))); f.faux(7, "c)", 2); ctrlVariations(f, 7, c7);
  const c8 = courbeDe(f, 8);
  f.vrai("résolution ex.8 : la courbe suit x² − 4x + 5", [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4].every((x) => c8(x) === x * x - 4 * x + 5));
  f.juste(8, "a)", monotonie(c8, -1, 0, 4)); f.juste(8, "b)", monotonie(c8, 1, 0, 4)); f.juste(8, "c)", c8(2)); f.faux(8, "c)", 2); ctrlVariations(f, 8, c8);
  const c9 = courbeDe(f, 9);
  f.juste(9, "a)", antecedents(c9, 1, 0, 8)); f.juste(9, "b)", ensemble(c9, "<=", 1, 0, 8)); f.juste(9, "c)", ensemble(c9, "<", 0, 0, 8)); f.faux(9, "c)", "]2 ; 6[");
  const c10 = courbeDe(f, 10);
  f.juste(10, "a)", antecedents(c10, 6, 0, 7)); f.juste(10, "b)", ensemble(c10, "<=", 6, 0, 7)); f.juste(10, "c)", antecedents(c10, 6, 0, 7)[0] * 100); f.faux(10, "b)", "]-∞ ; 4]");
  const c11 = courbeDe(f, 11);
  f.juste(11, "a)", antecedents(c11, 0, 0, 7)); f.juste(11, "b)", ensemble(c11, ">", 0, 0, I)); f.juste(11, "c)", ensemble(c11, "<", 0, 0, I)); f.juste(11, "d)", mot(c11(1))); f.faux(11, "c)", "[0 ; 3]"); ctrlSignes(f, 11, c11);
  const c12 = courbeDe(f, 12);
  f.juste(12, "a)", antecedents(c12, 0, 1, 7)); f.juste(12, "b)", ensemble(c12, ">", 0, 1, 7)); f.juste(12, "c)", ensemble(c12, "<", 0, 1, 7)); f.faux(12, "c)", "]-∞ ; 2[ ∪ ]6 ; +∞["); ctrlSignes(f, 12, c12);
  const c13 = courbeDe(f, 13);
  f.juste(13, "a)", monotonie(c13, 1, 0, 3)); f.juste(13, "b)", monotonie(c13, -1, 0, 8)); f.juste(13, "c)", monotonie(c13, 1, 3, 8)); f.juste(13, "d)", Math.max(c13(0), c13(3), c13(5), c13(8)) * 10); f.faux(13, "d)", 70); ctrlVariations(f, 13, c13);
  const c14 = courbeDe(f, 14);
  f.juste(14, "a)", monotonie(c14, -1, 0, 10)); f.juste(14, "b)", Math.min(c14(0), c14(4), c14(10))); f.juste(14, "c)", monotonie(c14, 1, 0, 10)); f.juste(14, "d)", antecedents(c14, 5, 0, 10)); f.faux(14, "a)", "[0 ; 10]"); ctrlVariations(f, 14, c14);
  const c15 = courbeDe(f, 15);
  f.juste(15, "a)", ensemble(c15, "<", 0, 0, 8)); f.juste(15, "b)", ensemble(c15, ">", 0, 0, 8)); f.juste(15, "c)", antecedents(c15, 2, 0, 8)); f.faux(15, "a)", "[2 ; 4]"); ctrlSignes(f, 15, c15);
  const c16 = courbeDe(f, 16);
  f.vrai("résolution ex.16 : la courbe suit −t² + 4t", [0, 1, 1.5, 2, 3, 4].every((x) => c16(x) === -x * x + 4 * x));
  f.juste(16, "a)", monotonie(c16, 1, 0, 4)); f.juste(16, "b)", monotonie(c16, -1, 0, 4)); f.juste(16, "c)", c16(2)); f.juste(16, "d)", antecedents(c16, 3, 0, 4)); f.faux(16, "c)", 2); ctrlVariations(f, 16, c16);
  const c17 = courbeDe(f, 17);
  const a17 = antecedents(c17, 4, 0, 9);
  f.juste(17, "a)", a17); f.juste(17, "b)", ensemble(c17, "<", 4, 0, 9)); f.juste(17, "c)", a17[1] - a17[0]); f.juste(17, "d)", ensemble(c17, ">=", 6, 0, 9)); f.juste(17, "e)", Math.min(c17(0), c17(3), c17(6), c17(9))); f.faux(17, "d)", "[5 ; 8]"); ctrlVariations(f, 17, c17);
  const c18 = courbeDe(f, 18);
  f.juste(18, "a)", antecedents(c18, 0, 0, 6)); f.juste(18, "b)", ensemble(c18, ">", 0, 0, 6)); f.juste(18, "c)", ensemble(c18, ">=", 3, 0, 6)); f.juste(18, "d)", c18(3) * 100); f.juste(18, "e)", monotonie(c18, 1, 0, 6)); f.faux(18, "e)", "]1 ; 5["); ctrlSignes(f, 18, c18); ctrlVariations(f, 18, c18);
  const c19 = courbeDe(f, 19);
  f.juste(19, "a)", antecedents(c19, 8, 0, 8)); f.juste(19, "b)", ensemble(c19, ">=", 8, 0, 8)); f.juste(19, "c)", monotonie(c19, -1, 0, 8)); f.juste(19, "d)", (c19(3) - c19(0) + c19(8) - c19(5)) * 100); f.faux(19, "d)", 800); ctrlVariations(f, 19, c19);
  const c20 = courbeDe(f, 20);
  f.juste(20, "a)", antecedents(c20, 0, 0, 10)); f.juste(20, "b)", ensemble(c20, ">", 0, 0, 10)); f.juste(20, "c)", antecedents(c20, 2, 0, 10)); f.juste(20, "d)", monotonie(c20, -1, 0, 10)); f.juste(20, "e)", c20(4) * 1000); f.faux(20, "d)", "]7 ; 9["); ctrlSignes(f, 20, c20); ctrlVariations(f, 20, c20);
  f.juste(19, "a)", "2, 4 et 6"); f.juste(20, "a)", "1, 7 et 9"); f.juste(20, "c)", "2, 6 et 10"); f.faux(19, "a)", "2 ; 4");
  ctrlCadres(f);
  f.tout();
}

/* ═══════════════════════════ auto-signes ═══════════════════════════ */
{
  const f = await feuille("auto-signes");
  const I = Infinity;
  const e1 = (x) => x - 3;
  f.juste(1, "a)", zeros(e1, -20, 20)); f.juste(1, "b)", ensemble(e1, ">", 0, -I, I)); f.faux(1, "a)", -3); ctrlSignes(f, 1, e1);
  const e2 = (x) => -2 * x + 8;
  f.juste(2, "a)", zeros(e2, -20, 20)); f.juste(2, "b)", ensemble(e2, ">", 0, -I, I)); f.faux(2, "b)", "]4 ; +∞["); ctrlSignes(f, 2, e2);
  const e3 = (x) => 3 * x + 6;
  f.juste(3, "a)", zeros(e3, -20, 20)); f.juste(3, "b)", mot(e3(5))); f.juste(3, "c)", mot(e3(-4))); f.faux(3, "a)", 2);
  const e4 = (x) => (x - 1) * (x - 5);
  f.juste(4, null, zeros(e4, -20, 20)); f.faux(4, null, "-1 ; -5");
  f.juste(5, null, mot((0 - 2) * (0 + 3))); f.faux(5, null, "positif");
  const e6 = (x) => -2 * (x - 1) * (x - 4);
  f.vrai("signes ex.6 : le signe ne change pas entre 1 et 4", [1.1, 2, 3, 3.9].every((x) => e6(x) > 0));
  f.juste(6, null, mot(e6(2))); f.faux(6, null, "négatif");
  const e7 = (x) => (x + 1) * (x - 3);
  f.juste(7, "a)", mot(e7(-5))); f.juste(7, "b)", mot(e7(0))); f.juste(7, "c)", mot(e7(5))); f.faux(7, "a)", "négatif"); ctrlSignes(f, 7, e7); ctrlSignes(f, 7, (x) => x + 1, "figure", 0); ctrlSignes(f, 7, (x) => x - 3, "figure", 1);
  const e8 = (x) => (x + 4) * (x - 2);
  f.juste(8, null, ensemble(e8, "<=", 0, -I, I)); f.faux(8, null, "]-4 ; 2["); ctrlSignes(f, 8, e8, "figure");
  const b9 = (x) => 14 * x - 500;
  const seuil = (m, fixes) => Math.ceil(fixes / m);
  f.juste(9, "a)", b9(30)); f.juste(9, "b)", seuil(14, 500)); f.juste(9, "c)", b9(seuil(14, 500))); f.faux(9, "b)", 35);
  const t10 = (x) => 12 - 6 * x;
  f.juste(10, "a)", zeros(t10, 0, 20)); f.juste(10, "b)", ensemble(t10, ">", 0, 0, I)); f.juste(10, "c)", mot(t10(3))); f.juste(10, "d)", zeros(t10, 0, 20)[0] * 1000); f.faux(10, "b)", "]2 ; +∞["); ctrlSignes(f, 10, t10);
  const r11 = (x) => 900 - 30 * x;
  f.juste(11, "a)", zeros(r11, 0, 100)); f.juste(11, "b)", ensemble(r11, ">", 0, 0, I)); f.juste(11, "c)", r11(12)); f.faux(11, "b)", "[0 ; 30]"); ctrlSignes(f, 11, r11);
  const b12 = (x) => -2 * (x - 3) * (x - 10);
  f.juste(12, "a)", zeros(b12, -50, 50)); f.juste(12, "b)", mot(-2)); f.juste(12, "c)", ensemble(b12, ">", 0, -I, I)); f.juste(12, "d)", b12(5)); f.faux(12, "c)", "]-∞ ; 3[ ∪ ]10 ; +∞[");
  const h13 = (t) => -5 * (t + 1) * (t - 2);
  f.juste(13, "a)", zeros(h13, -50, 50)); f.juste(13, "b)", h13(1)); f.juste(13, "c)", ensemble(h13, ">", 0, 0, I)); f.faux(13, "c)", "]-1 ; 2[");
  const e14 = (t) => (t - 2) * (t - 8);
  const c14 = courbeDe(f, 14);
  f.vrai("signes ex.14 : la figure est la courbe de l'énoncé", [0, 1, 3, 5, 9].every((x) => c14(x) === e14(x)));
  f.juste(14, "a)", zeros(e14, 0, 10)); f.juste(14, "b)", mot(e14(5))); f.juste(14, "c)", ensemble(e14, ">", 0, 0, 10)); f.juste(14, "d)", e14(1)); f.faux(14, "c)", "]2 ; 8["); ctrlSignes(f, 14, e14);
  const e15 = (x) => (x + 2) * (x - 1);
  f.juste(15, "a)", zeros(e15, -20, 20)); f.juste(15, "b)", signes(e15, [-I, -2, 1, I])); f.juste(15, "c)", ensemble(e15, "<", 0, -I, I)); f.juste(15, "d)", ensemble(e15, ">=", 0, -I, I)); f.faux(15, "b)", "- ; + ; -"); f.faux(15, "c)", "[-2 ; 1]"); ctrlSignes(f, 15, e15);
  const e16 = (x) => (4 - x) * (x + 1);
  f.juste(16, "a)", zeros(e16, -20, 20)); f.juste(16, "b)", signes(e16, [-I, -1, 4, I])); f.juste(16, "c)", ensemble(e16, ">", 0, 0, I)); f.juste(16, "d)", e16(2)); f.faux(16, "b)", "+ ; - ; +"); ctrlSignes(f, 16, e16); ctrlSignes(f, 16, (x) => 4 - x, "schema", 0);
  const b17 = (x) => 16 * x - 740, b17n = (x) => 16 * x - 840;
  f.juste(17, "a)", b17(46)); f.juste(17, "b)", seuil(16, 740)); f.juste(17, "c)", seuil(16, 840)); f.juste(17, "d)", b17n(seuil(16, 840))); f.faux(17, "c)", 147);
  const b18 = (x) => -0.5 * (x - 2) * (x - 12);
  f.juste(18, "a)", zeros(b18, -50, 50)); f.juste(18, "b)", signes(b18, [-I, 2, 12, I])); f.juste(18, "c)", ensemble(b18, ">", 0, 0, I)); f.juste(18, "d)", b18(7)); f.juste(18, "e)", mot(b18(13))); f.faux(18, "e)", "positif"); ctrlSignes(f, 18, b18);
  const e19 = (t) => (2 * t - 8) * (t - 1);
  const r19 = zeros(e19, 0, 6);
  f.juste(19, "a)", r19); f.juste(19, "b)", signes(e19, [0, ...r19, 6])); f.juste(19, "c)", ensemble(e19, "<=", 0, 0, 6)); f.juste(19, "d)", r19[1] - r19[0]); f.faux(19, "a)", "1 ; 8"); ctrlSignes(f, 19, e19);
  const p20 = (x) => -(x + 3) * (x - 2);
  f.juste(20, "a)", p20(0) > 0 ? "vrai" : "faux"); f.juste(20, "b)", [-2, 0, 1].every((x) => p20(x) < 0) ? "vrai" : "faux"); f.juste(20, "c)", ensemble(p20, ">=", 0, -I, I)); f.juste(20, "d)", p20(3)); f.faux(20, "b)", "vrai"); ctrlSignes(f, 20, p20);
  f.juste(3, "b)", "positive"); f.juste(3, "c)", "négative"); f.juste(3, "b)", "+"); f.faux(3, "b)", "-"); f.faux(3, "b)", "négative");
  ctrlCadres(f);
  f.tout();
}

/* ═══════════════════════ auto-terminale-derivee ═══════════════════════ */
{
  const f = await feuille("auto-terminale-derivee");
  const fprime = (coefs) => texte(derivee(coefs));
  // Une tangente dessinée : passe par le point marqué, et sa pente vaut le nombre dérivé.
  const ctrlTangente = (k, x0) => {
    const fig = canvasDe(f.exercices[k - 1].figure)[0];
    const [c, t] = fig.courbes;
    const co = [c.a, c.b, c.c];
    const pente = P(derivee(co))(x0);
    const pt = fig.misesEnEvidence.find((m) => m.point).point;
    f.vrai(`dérivée ex.${k} : le point marqué est sur la courbe`, pt.x === x0 && P(co)(x0) === pt.y);
    f.vrai(`dérivée ex.${k} : la droite tracée est la tangente`, t.b === pente && t.a === 0 && t.b * x0 + t.c === pt.y);
    return pente;
  };
  f.juste(1, null, fprime([4, 0, 0])); f.faux(1, null, "4x"); f.faux(1, null, "2x");
  f.juste(2, null, fprime([5, -7])); f.faux(2, null, "5x"); f.faux(2, null, "-7");
  f.juste(3, null, fprime([3, -2, 6])); f.faux(3, null, "6x + 4");
  f.juste(4, null, fprime([1, 2, -5, 1])); f.faux(4, null, "x^2 + 2x - 5"); f.faux(4, null, "3x^2 + 4x - 4");
  f.juste(5, null, fprime([-2, 0, 1, 0])); f.faux(5, null, "-6x^2");
  f.juste(6, null, P(derivee([1, 3, 0]))(1)); f.faux(6, null, P([1, 3, 0])(1));
  f.juste(7, null, ctrlTangente(7, 1)); f.faux(7, null, 1);
  f.juste(8, null, ctrlTangente(8, 2)); f.faux(8, null, 3);
  const c9 = [2, 10, 50];
  f.juste(9, "a)", fprime(c9)); f.juste(9, "b)", P(derivee(c9))(5)); f.juste(9, "c)", P(c9)(5)); f.faux(9, "b)", P(c9)(5));
  const b10 = [-2, 24, -40];
  f.juste(10, "a)", fprime(b10)); f.juste(10, "b)", -derivee(b10)[1] / derivee(b10)[0]); f.juste(10, "c)", P(b10)(6)); f.vrai("dérivée ex.10 : B'(6) = 0", P(derivee(b10))(6) === 0); f.faux(10, "b)", 2);
  const c11 = [2, 2, 3, 9];
  f.juste(11, "a)", fprime(c11)); f.juste(11, "b)", c11[3]); f.faux(11, "a)", "6x^2 + 4x + 12");
  f.juste(12, "a)", ctrlTangente(12, 1)); f.juste(12, "b)", mot(ctrlTangente(12, 1))); f.juste(12, "c)", ctrlTangente(12, 1) > 0 ? "croissante" : "décroissante"); f.faux(12, "c)", "décroissante");
  f.juste(13, "a)", ctrlTangente(13, 2)); f.juste(13, "b)", mot(ctrlTangente(13, 2))); f.juste(13, "c)", ctrlTangente(13, 2) > 0 ? "croissante" : "décroissante"); f.faux(13, "a)", 2);
  const fig14 = canvasDe(f.exercices[13].figure)[0];
  const c14 = [fig14.courbes[0].a, fig14.courbes[0].b, fig14.courbes[0].c];
  const x14 = -c14[1] / (2 * c14[0]);
  const penteDroite14 = droiteLue(f, 14, 1).a;
  f.juste(14, "a)", penteDroite14); f.juste(14, "b)", x14); f.juste(14, "c)", P(c14)(x14)); f.vrai("dérivée ex.14 : f'(2) = 0", P(derivee(c14))(x14) === 0); f.vrai("dérivée ex.14 : le javelot part au-dessus du sol", P(c14)(0) > 0); f.faux(14, "a)", P(c14)(x14));
  const c15 = [1, -3, 0, 2];
  f.juste(15, "a)", fprime(c15)); f.juste(15, "b)", P(derivee(c15))(3)); f.juste(15, "c)", P(derivee(c15))(2)); f.juste(15, "d)", P(derivee(c15))(2) === 0 ? "oui" : "non"); f.faux(15, "b)", 0);
  const c16 = [0.5, 3, 20];
  f.juste(16, "a)", fprime(c16)); f.juste(16, "b)", P(derivee(c16))(4)); f.juste(16, "c)", P(derivee(c16))(10)); f.juste(16, "d)", P(derivee(c16))(10) > P(derivee(c16))(4) ? 10 : 4); f.faux(16, "a)", "0,5x + 3");
  const b17 = [-1, 14, -24];
  f.juste(17, "a)", fprime(b17)); f.juste(17, "b)", P(derivee(b17))(3)); f.juste(17, "c)", P(derivee(b17))(3) > 0 ? "croissant" : "décroissant"); f.juste(17, "d)", -derivee(b17)[1] / derivee(b17)[0]); f.juste(17, "e)", P(b17)(7) * 100); f.faux(17, "e)", 0);
  const c18 = [1, -2, -1];
  const p18 = ctrlTangente(18, 3);
  f.vrai("dérivée ex.18 : la figure est la courbe de l'énoncé", [-1, 0, 2].every((x) => courbeDe(f, 18)(x) === P(c18)(x)));
  f.juste(18, "a)", p18); f.juste(18, "b)", fprime(c18)); f.juste(18, "c)", P(derivee(c18))(3)); f.juste(18, "d)", -derivee(c18)[1] / derivee(c18)[0]); f.juste(18, "e)", P(c18)(1)); f.faux(18, "e)", 0);
  const v19 = [1, 0, -12, 20];
  f.juste(19, "a)", fprime(v19)); f.juste(19, "b)", P(derivee(v19))(1)); f.juste(19, "c)", P(derivee(v19))(3)); f.juste(19, "d)", P(derivee(v19))(2)); f.juste(19, "e)", P(v19)(2)); f.faux(19, "c)", -3);
  const c20 = [3, -4, 2];
  f.juste(20, "a)", fprime(c20)); f.juste(20, "b)", P(derivee(c20))(2)); f.juste(20, "c)", P(c20)(2)); f.juste(20, "d)", P(derivee(c20))(2) === 6 ? "oui" : "non"); f.faux(20, "b)", 6);
  // La forme avec « f'(x) = » écrite dans la liste est acceptée telle quelle.
  f.vrai("dérivée : la forme longue est écrite", f.exercices[3].reponses[0].attendu.includes("f'(x) = 3x^2 + 4x - 5"));
  // Relecture du 05/11 : le membre de gauche, dans un autre ordre, et le masculin.
  f.juste(3, null, "f'(x) = -2 + 6x"); f.faux(3, null, "f'(x) = 6x - 2 + 6"); f.juste(12, "c)", "croissant"); f.juste(12, "b)", "positive");
  ctrlCadres(f);
  f.tout();
}

/* ═════════════════════ auto-terminale-reconnaitre ═════════════════════ */
{
  const f = await feuille("auto-terminale-reconnaitre");
  const I = Infinity;
  const q = (t) => Number((1 + t / 100).toFixed(6));
  const taux = (r) => Number(((r - 1) * 100).toFixed(6));
  const avecSigne = (t) => `${t > 0 ? "+" : "-"}${String(Math.abs(t)).replace(".", ",")} %`;
  f.juste(1, null, sorte(f.exercices[0].enonce)); f.faux(1, null, "arithmétique");
  f.juste(2, null, sorte(f.exercices[1].enonce)); f.faux(2, null, "géométrique");
  f.juste(3, null, ["A", "B", "C"].find((l) => sorte(ligne(f, 3, `${l} :`)) === "arithmétique")); f.faux(3, null, "C");
  f.juste(4, null, q(8)); f.faux(4, null, 8 / 100); f.faux(4, null, 8);
  f.juste(5, null, q(-25)); f.faux(5, null, q(25)); f.faux(5, null, 0.25);
  f.juste(6, "a)", 0.92 < 1 ? "baisse" : "hausse"); f.juste(6, "b)", `${-taux(0.92)} %`); f.faux(6, "b)", 92);
  f.juste(7, null, mot(2 * (6 - 1) * (6 - 4))); f.faux(7, null, "négatif");
  f.juste(8, null, mot(-(5 + 2) * (5 - 3))); f.faux(8, null, "positif");
  f.juste(9, "a)", sorte(f.exercices[8].enonce)); f.juste(9, "b)", q(12)); f.juste(9, "c)", 500 * q(12)); f.faux(9, "c)", 512);
  f.juste(10, "a)", ["A", "B", "C"].find((l) => sorte(ligne(f, 10, `${l} :`)) === "arithmétique")); f.juste(10, "b)", q(5)); f.juste(10, "c)", q(-2)); f.faux(10, "c)", 0.8);
  f.juste(11, "a)", q(-15)); f.juste(11, "b)", 20000 * q(-15)); f.juste(11, "c)", 20000 * q(-15) ** 2); f.faux(11, "c)", 14000);
  f.juste(12, "a)", avecSigne(taux(1.06))); f.juste(12, "b)", avecSigne(taux(0.7))); f.juste(12, "c)", avecSigne(taux(1.015))); f.faux(12, "b)", "-70 %");
  const b13 = (x) => -2 * (x - 1) * (x - 6);
  f.juste(13, "a)", zeros(b13, -20, 20)); f.juste(13, "b)", -2 > 0 ? "haut" : "bas"); f.juste(13, "c)", mot(b13(3))); f.juste(13, "d)", mot(b13(8))); f.faux(13, "c)", "négatif");
  const e14 = (x) => 3 * (x + 1) * (x - 4);
  f.juste(14, "a)", ensemble(e14, "<", 0, -I, I)); f.juste(14, "b)", ensemble(e14, ">", 0, -I, I)); f.faux(14, "b)", "]4 ; +∞[");
  const e15 = (x) => -(x - 2) * (x - 5);
  f.juste(15, "a)", ensemble(e15, ">", 0, 0, 8)); f.juste(15, "b)", ensemble(e15, "<", 0, 0, 8)); f.faux(15, "a)", "[0 ; 2[ ∪ ]5 ; 8]");
  const A = [1000, 1100, 1210, 1331], B = [1000, 1100, 1200, 1300];
  const rapportsA = A.slice(1).map((v, i) => Number((v / A[i]).toFixed(9)));
  const ecartsB = B.slice(1).map((v, i) => v - B[i]);
  f.vrai("reconnaître ex.16 : A a un rapport constant, pas B", new Set(rapportsA).size === 1 && new Set(B.slice(1).map((v, i) => Number((v / B[i]).toFixed(9)))).size > 1);
  f.vrai("reconnaître ex.16 : B a un écart constant", new Set(ecartsB).size === 1);
  f.juste(16, "a)", new Set(rapportsA).size === 1 ? "A" : "B"); f.juste(16, "b)", rapportsA[0]); f.juste(16, "c)", `${taux(rapportsA[0])} %`); f.juste(16, "d)", ecartsB[0]); f.faux(16, "a)", "B");
  const a2 = 100 * q(8) ** 2, b2 = 100 + 2 * 10;
  f.juste(17, "a)", sorte("8 %")); f.juste(17, "b)", q(8)); f.juste(17, "c)", sorte("10 €")); f.juste(17, "d)", Number(a2.toFixed(6))); f.juste(17, "e)", b2); f.juste(17, "f)", a2 < b2 ? "A" : "B"); f.faux(17, "d)", 116);
  const r = q(-25);
  f.juste(18, "a)", r); f.juste(18, "b)", 1600 * r); f.juste(18, "c)", 1600 * r * r); f.juste(18, "d)", `${String((1 - r * r) * 100).replace(".", ",")} %`); f.faux(18, "d)", "50 %");
  const b19 = (x) => -3 * (x - 2) * (x - 9);
  f.juste(19, "a)", zeros(b19, 0, 12)); f.juste(19, "b)", -3 > 0 ? "haut" : "bas"); f.juste(19, "c)", ensemble(b19, ">", 0, 0, 12)); f.juste(19, "d)", ensemble(b19, "<", 0, 0, 12)); f.juste(19, "e)", mot(b19(1000 / 100))); f.faux(19, "e)", "positif");
  const s20 = (x) => (x + 3) * (x - 1);
  f.juste(20, "a)", sorte("4 %")); f.juste(20, "b)", q(-4)); f.juste(20, "c)", 5000 * q(-4)); f.juste(20, "d)", mot(s20(0))); f.juste(20, "e)", ensemble(s20, "<", 0, -I, I)); f.faux(20, "c)", 4996);
  f.juste(6, "a)", "une baisse"); f.juste(6, "b)", "-8 %"); f.juste(13, "b)", "vers le bas"); f.juste(16, "a)", "le magazine A"); f.faux(16, "a)", "le magazine B"); f.juste(7, null, "positive");
  ctrlCadres(f);
  f.tout();
}

fin();
