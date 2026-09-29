// Recalcul INDÉPENDANT de la feuille « Calcul vectoriel et produit scalaire »
// de 1re spé (lib/fiches-exercices/maths-premiere-produit-scalaire.tsx), 29/09/2026.
//
// ⭐ L'AUTRE CHEMIN : chaque produit scalaire annoncé est refait ici par
// coordonnées (ou par Al-Kashi quand le corrigé projette, et inversement) ; les
// DESSINS sont relus dans le source — `vecteurs(…)`, `droites(…)`, `triangle(…)`,
// `cercle(…)` — et leurs points, flèches, longueurs et angles doivent dire la
// même chose que l'énoncé et le corrigé.
//
// Plus : les contrôles communs (8 + 8 + 4, dollars, micros toutes couvertes),
// une chaîne jamais coupée par une vraie fin de ligne, des antislashs doublés,
// du texte NU dans les dessins, AU MOINS UN DESSIN PAR EXERCICE, 12 à 14 dessins
// imprimés, et des étiquettes de points qui ne tombent ni sur une graduation ni
// sur un autre point (géométrie du canvas `fonctionGraphique`, mesurée en px).
// Enfin, des contrôles négatifs joués en mémoire.
//
//   node scripts/verifier-exercices-premiere-spe-produit-scalaire.mjs

import fs from "node:fs";
import path from "node:path";
import { RACINE, lireFeuille, controlesCommuns } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-premiere-produit-scalaire.tsx";
const NOTION = "produit_scalaire";
const source = fs.readFileSync(path.join(RACINE, FICHIER), "utf8");

/* ══════════════ Outils ══════════════ */

const { PI, sqrt, cos, acos, abs, hypot } = Math;
const deg = (r) => (r * 180) / PI;
const rad = (d) => (d * PI) / 180;
const proche = (a, b, eps = 1e-9) => abs(a - b) <= eps;
const memePoint = (p, q, eps = 1e-6) => proche(p[0], q[0], eps) && proche(p[1], q[1], eps);
const vec = (a, b) => [b[0] - a[0], b[1] - a[1]];
const dot = (u, v) => u[0] * v[0] + u[1] * v[1];
const norme = (u) => hypot(u[0], u[1]);
const angleDeg = (u, v) => deg(acos(dot(u, v) / (norme(u) * norme(v))));
const colineaires = (u, v, eps = 1e-6) => abs(u[0] * v[1] - u[1] * v[0]) <= eps * Math.max(1, norme(u) * norme(v));
/** Projeté orthogonal de P sur la droite (A, direction u). */
const projete = (P, A, u) => {
  const t = dot(vec(A, P), u) / dot(u, u);
  return [A[0] + t * u[0], A[1] + t * u[1]];
};
/** Un nombre écrit comme dans la feuille : `-7{,}5`, `866`. */
const fr = (x, dec) => {
  const s = dec === undefined ? String(+x.toFixed(10)) : x.toFixed(dec);
  return s.replace(".", "{,}");
};

/** Les arguments de premier niveau d'un appel dont `debut` pointe la parenthèse ouvrante. */
function argumentsDe(texte, debut) {
  const args = [];
  let prof = 0;
  let courant = "";
  let chaine = false;
  for (let i = debut + 1; i < texte.length; i++) {
    const ch = texte[i];
    if (chaine) {
      courant += ch;
      if (ch === "\\") {
        courant += texte[++i];
        continue;
      }
      if (ch === '"') chaine = false;
      continue;
    }
    if (ch === '"') {
      chaine = true;
      courant += ch;
      continue;
    }
    if ("([{".includes(ch)) prof++;
    if (")]}".includes(ch)) {
      if (prof === 0) {
        if (courant.trim()) args.push(courant.trim());
        return args;
      }
      prof--;
    }
    if (ch === "," && prof === 0) {
      args.push(courant.trim());
      courant = "";
    } else courant += ch;
  }
  throw new Error("appel non fermé");
}

const ENV = {
  ORANGE: "#ea580c",
  VERT: "#16a34a",
  VIOLET: "#7c3aed",
  BLEU: "#2563eb",
  ROUGE: "#dc2626",
  GRIS: "#94a3b8",
  cercle: (cx, cy, r, couleur) => [{ cercle: { cx, cy, r, couleur } }],
  parabole: (a, b, c, de, jusqua, couleur) => [{ parabole: { a, b, c, de, jusqua, couleur } }],
};
const evalue = (args) => Function(...Object.keys(ENV), `"use strict"; return [${args.join(", ")}];`)(...Object.values(ENV));

/** Les dessins d'un exercice, relus et évalués. */
function dessinsDe(bloc) {
  return [...bloc.matchAll(/\b(vecteurs|droites|triangle|repere)\(/g)].map((m) => {
    const type = m[1];
    const avant = bloc.slice(0, m.index);
    const role = avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema";
    const ecran = /ecranSeulement\(\s*$/.test(avant);
    const args = evalue(argumentsDe(bloc, m.index + m[0].length - 1));
    if (type === "vecteurs" || type === "droites") {
      const fenetre = args[0];
      const brut = (type === "droites" ? args[3] : args[1]) ?? [];
      return {
        type,
        role,
        ecran,
        plan: true,
        fenetre,
        lignes: type === "droites" ? args[1] ?? [] : [],
        points: args[2] ?? [],
        fleches: brut.filter((f) => f.de),
        cercles: brut.filter((f) => f.cercle).map((f) => f.cercle),
        paraboles: brut.filter((f) => f.parabole).map((f) => f.parabole),
      };
    }
    if (type === "triangle") return { type, role, ecran, pts: args[0], opts: args[1] ?? {} };
    return { type, role, ecran, cadre: args[0], courbes: args[1] ?? [], marques: args[2] ?? [], horizontale: args[3], grand: !!args[4] };
  });
}

/* ── La géométrie du canvas `fonctionGraphique`, en px ──────────────────────
 * Graduations : abscisses centrées sous l'axe (y + 8 à + 17), ordonnées à
 * gauche de l'axe (alignées à droite, 6 px avant lui), un chiffre ≈ 7 px.
 * Étiquette d'un point : à (+7 ; −7) pour `points` (fonte 12), à (+8 ; −8) pour
 * les marques de `repere` (fonte 13). */
// ⛔ MESURÉ À 375 PX LE 29/09 (coordination) : un gabarit au plus juste laissait passer « Ω » sur le « 2 ». Les boîtes
// comptent donc le trait blanc (2 px), la hauteur réelle des glyphes et 1 px de garde ; tout contact est une faute.
const inter = (a, b) => Math.min(a[2], b[2]) - Math.max(a[0], b[0]) > 0 && Math.min(a[3], b[3]) - Math.max(a[1], b[1]) > 0;
function geometrie(fig) {
  let W, H, xmin, xmax, ymin, ymax, dec, fonte, rayon, pts;
  if (fig.plan) {
    [W, H] = [215, 215];
    [xmin, xmax] = fig.fenetre;
    [ymin, ymax] = fig.fenetre;
    [dec, fonte, rayon] = [7, 9, 4.5];
    pts = fig.points;
  } else {
    [W, H] = fig.grand ? [272, 272] : [215, 200];
    [xmin, xmax, ymin, ymax] = fig.cadre;
    [dec, fonte, rayon] = [8, 10, 5];
    pts = fig.marques;
  }
  const X = (x) => ((x - xmin) / (xmax - xmin)) * W;
  const Y = (y) => ((ymax - y) / (ymax - ymin)) * H;
  const x0 = X(0);
  const y0 = Y(0);
  const texte = (k) => (k < 0 ? "−" : "") + abs(k);
  const grads = [];
  const nbX = xmax - xmin + 1;
  const pasX = Math.max(1, Math.ceil(22 / (W / (nbX - 1))));
  for (let k = xmin; k <= xmax; k++) {
    if (!(k === 0 || (k - xmin) % pasX === 0)) continue;
    const w = 7 * texte(k).length;
    const cx = Math.min(W - 10, Math.max(10, X(k))) + (k === 0 && X(k) > 10 ? 8 : 0);
    grads.push({ quoi: `graduation ${texte(k)} (x)`, b: [cx - w / 2 - 1.5, y0 + 6, cx + w / 2 + 1.5, y0 + 19] });
  }
  const nbY = ymax - ymin + 1;
  const pasY = Math.max(1, Math.ceil(16 / (H / (nbY - 1))));
  for (let k = ymin; k <= ymax; k++) {
    if (k === 0 || (k - ymin) % pasY !== 0) continue;
    const w = 7 * texte(k).length;
    const cy = Math.min(H - 7, Math.max(7, Y(k)));
    const b = x0 > 26 ? [x0 - 7.5 - w, cy - 7.5, x0 - 4.5, cy + 7.5] : [x0 + 4.5, cy - 7.5, x0 + 7.5 + w, cy + 7.5];
    grads.push({ quoi: `graduation ${texte(k)} (y)`, b });
  }
  const dots = pts.map((p) => ({ p, b: [X(p.x) - rayon, Y(p.y) - rayon, X(p.x) + rayon, Y(p.y) + rayon] }));
  const labels = pts
    .filter((p) => p.label)
    .map((p) => ({ p, b: [X(p.x) + dec - 1.5, Y(p.y) - dec - fonte - 2.5, X(p.x) + dec + 8.5 * [...p.label].length + 1.5, Y(p.y) - dec + 3] }));
  return { W, H, grads, dots, labels, xmin, xmax, ymin, ymax };
}
function fautesEtiquettes(fig) {
  const g = geometrie(fig);
  const fautes = [];
  for (const l of g.labels) {
    const n = l.p.label;
    if (l.b[0] < 0 || l.b[1] < 0 || l.b[2] > g.W || l.b[3] > g.H) fautes.push(`« ${n} » sort du cadre`);
    for (const gr of g.grads) if (inter(l.b, gr.b)) fautes.push(`« ${n} » sur la ${gr.quoi}`);
    for (const d of g.dots) if (d.p !== l.p && inter(l.b, d.b)) fautes.push(`« ${n} » sur le point ${d.p.label ?? "(" + d.p.x + " ; " + d.p.y + ")"}`);
    for (const m of g.labels) if (m !== l && inter(l.b, m.b)) fautes.push(`« ${n} » sur l'étiquette « ${m.p.label} »`);
  }
  return fautes;
}
/** Tout ce que dessine une figure plane tient dans sa fenêtre. */
function fautesFenetre(fig) {
  const [min, max] = fig.fenetre;
  const f = [];
  const dans = ([x, y], m = 0) => x >= min + m - 1e-9 && x <= max - m + 1e-9 && y >= min + m - 1e-9 && y <= max - m + 1e-9;
  if (!(Number.isInteger(min) && Number.isInteger(max) && min < 0 && max > 0)) f.push(`fenêtre [${min} ; ${max}] (entiers, min < 0 < max)`);
  if (max - min > 15) f.push(`fenêtre de ${max - min} unités (15 au plus)`);
  for (const p of fig.points) if (!dans([p.x, p.y], 0.2)) f.push(`point ${p.label} au bord ou dehors`);
  for (const fl of fig.fleches) if (!dans(fl.de) || !dans(fl.vers)) f.push(`flèche ${JSON.stringify(fl.de)} → ${JSON.stringify(fl.vers)} dehors`);
  for (const c of fig.cercles) if (!dans([c.cx - c.r, c.cy - c.r], 0.2) || !dans([c.cx + c.r, c.cy + c.r], 0.2)) f.push(`cercle (${c.cx} ; ${c.cy}) r = ${c.r} touche le bord`);
  for (const p of fig.paraboles)
    for (let k = 0; k <= 40; k++) {
      const x = p.de + ((p.jusqua - p.de) * k) / 40;
      if (!dans([x, p.a * x * x + p.b * x + p.c])) {
        f.push(`parabole dehors en x = ${x}`);
        break;
      }
    }
  return f;
}

/** Chaînes du source : une vraie fin de ligne dedans, un antislash non doublé. */
function lireChaines(src) {
  const cassees = [];
  const chaines = [];
  let etat = "code";
  let ligne = 1;
  let courant = "";
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    const d = src[i + 1];
    if (etat === "code") {
      if (c === "/" && d === "/") etat = "ligne";
      else if (c === "/" && d === "*") etat = "bloc";
      else if (c === '"') {
        etat = "chaine";
        courant = "";
      }
    } else if (etat === "ligne") {
      if (c === "\n") etat = "code";
    } else if (etat === "bloc") {
      if (c === "*" && d === "/") {
        etat = "code";
        i++;
      }
    } else if (etat === "chaine") {
      if (c === "\\") {
        courant += c + d;
        if (d === "\n") ligne++;
        i++;
        continue;
      }
      if (c === '"') {
        etat = "code";
        chaines.push({ ligne, texte: courant });
      } else if (c === "\n") {
        cassees.push(ligne);
        etat = "code";
      } else courant += c;
    }
    if (c === "\n") ligne++;
  }
  return { cassees, chaines };
}

/* ══════════════ Le vérificateur ══════════════ */

function verifier(src, v) {
  const f = lireFeuille(src);
  const c = (k) => f.corrections[k - 1] ?? "";
  const e = (k) => f.enonces[k - 1] ?? "";
  const D = f.blocs.map((b) => dessinsDe(b));
  const dessin = (k, type, role, i = 0) => {
    const d = D[k - 1].filter((x) => x.type === type && (!role || x.role === role))[i];
    if (!d) throw new Error(`exercice ${k} : pas de ${type} (${role ?? "tout rôle"})`);
    return d;
  };
  const pt = (fig, label) => {
    const p = fig.points.find((q) => q.label === label);
    if (!p) throw new Error(`point ${label} absent`);
    return [p.x, p.y];
  };
  const fleche = (fig, de, vers, eps = 1e-6) => fig.fleches.some((x) => memePoint(x.de, de, eps) && memePoint(x.vers, vers, eps));
  const dit = (k, t) => v.ok(`${k}. le corrigé écrit « ${t} »`, c(k).includes(t), "absent");
  const lit = (k, t) => v.ok(`${k}. l'énoncé donne « ${t} »`, e(k).includes(t), "absent");
  const vrai = (k, quoi, cond, detail = "") => v.ok(`${k}. ${quoi}`, cond, detail);

  v.titre("★ Un seul geste");
  {
    const t = dessin(1, "triangle", "figure");
    const { A, B, C } = t.pts;
    const u = vec(A, B);
    const H = projete(C, A, u);
    const [AB, AH, HB, CH, AC] = [norme(u), norme(vec(A, H)), norme(vec(H, B)), norme(vec(H, C)), norme(vec(A, C))];
    vrai(1, `le dessin : AB = ${AB}, AH = ${AH}, HB = ${HB}, CH = ${CH}, AC = ${AC}`, proche(AB, 6) && proche(AH, 4) && proche(HB, 2) && proche(CH, 3) && proche(AC, 5));
    lit(1, `$AB = ${AB}$, $AH = ${AH}$ et $HB = ${HB}$`);
    vrai(1, "la hauteur est étiquetée CH", t.opts.hauteur?.label === String(CH) && t.opts.hauteur?.depuis === "C");
    const pAB = dot(u, vec(A, C));
    const pBA = dot(vec(B, A), vec(B, C));
    vrai(1, `AB·AC = ${pAB} et BA·BC = ${pBA} (coordonnées)`, proche(pAB, 24) && proche(pBA, 12));
    dit(1, `AB \\times AH = ${AB} \\times ${AH} = ${pAB}$`);
    dit(1, `BA \\times BH = ${AB} \\times ${HB} = ${pBA}$`);
    dit(1, `$AC = ${AC}$, et $${AB} \\times ${AC} = ${AB * AC}$`);
  }
  {
    const a = 4 * 5 * cos(PI / 3);
    const b = 2 * 3 * sqrt(2) * cos((3 * PI) / 4);
    vrai(2, `a) ${a}, b) ${b}, c) 0`, proche(a, 10) && proche(b, -6) && proche(7 * 3 * cos(PI / 2), 0, 1e-12));
    dit(2, "20 \\times \\dfrac{1}{2} = 10$");
    dit(2, "= -\\dfrac{6 \\times 2}{2} = -6$");
    const fig = dessin(2, "vecteurs", "figure");
    const [u, w] = fig.fleches.map((x) => vec(x.de, x.vers));
    vrai(2, `le dessin : ‖u‖ = ${norme(u)}, ‖v‖ = ${norme(w).toFixed(3)}, angle ${angleDeg(u, w).toFixed(2)}°`, proche(norme(u), 4) && proche(norme(w), 5, 0.01) && proche(angleDeg(u, w), 60, 0.1));
  }
  {
    const r = [dot([3, -2], [4, 5]), dot([-1, 4], [6, -3]), dot(vec([2, 1], [5, 3]), vec([2, 1], [-1, 4]))];
    vrai(3, `${r.join(" ; ")}`, r[0] === 2 && r[1] === -18 && r[2] === -3);
    lit(3, "$A(2\\,;\\,1)$, $B(5\\,;\\,3)$ et $C(-1\\,;\\,4)$");
    dit(3, "= 12 - 10 = 2$");
    dit(3, "= -6 - 12 = -18$");
    dit(3, "$\\vec{AB}\\,(3\\,;\\,2)$ et $\\vec{AC}\\,(-3\\,;\\,3)$");
    dit(3, "= -9 + 6 = -3$");
    const fig = dessin(3, "vecteurs", "schema");
    vrai(3, "le dessin : u(3 ; −2) et v(4 ; 5)", fleche(fig, [0, 0], [3, -2]) && fleche(fig, [0, 0], [4, 5]));
  }
  {
    const fig = dessin(4, "vecteurs", "schema");
    const A = pt(fig, "A");
    const B = pt(fig, "B");
    const AB = vec(A, B);
    vrai(4, `‖(−6 ; 8)‖ = ${norme([-6, 8])}, AB = ${norme(AB)}, ‖u/10‖ = ${norme([-0.6, 0.8])}`, norme([-6, 8]) === 10 && proche(norme(AB), 5) && proche(norme([-0.6, 0.8]), 1));
    lit(4, `$A(${A[0]}\\,;\\,${A[1]})$ et $B(${B[0]}\\,;\\,${B[1]})$`);
    dit(4, "= 36 + 64 = 100$, donc $\\|\\vec{u}\\| = \\sqrt{100} = 10$");
    dit(4, `$\\vec{AB}\\,(${AB[0]}\\,;\\,${AB[1]})$`);
    dit(4, "= \\sqrt{25} = 5$");
    dit(4, "$\\vec{w}\\,(-0{,}6\\,;\\,0{,}8)$");
    const coin = [B[0], A[1]];
    vrai(4, "le triangle vert : angle droit, côtés 4 et 3", fleche(fig, A, B) && fleche(fig, A, coin) && fleche(fig, coin, B) && norme(vec(A, coin)) === 4 && norme(vec(coin, B)) === 3);
  }
  {
    const fig = dessin(5, "vecteurs", "schema");
    const [u, w1, w2, s] = fig.fleches.slice(0, 4).map((x) => vec(x.de, x.vers));
    vrai(5, "le dessin respecte les données : ‖u‖ = 2, u·v = 3, u·w = −5", proche(norme(u), 2) && proche(dot(u, w1), 3) && proche(dot(u, w2), -5));
    vrai(5, "la flèche violette est 2v − w", memePoint(s, [2 * w1[0] - w2[0], 2 * w1[1] - w2[1]]));
    const b = dot(u, s);
    vrai(5, `u·(2v − w) = ${b} = 2 × 3 − (−5)`, proche(b, 11) && 2 * 3 - -5 === 11);
    dit(5, "= 2 \\times 3 - (-5) = 11$");
    dit(5, "= 3 \\times 3 = 9$");
    dit(5, `= 4 + 3 = ${dot(u, u) + 3}$`);
    dit(5, "= 2 \\times 5{,}5 + 0 \\times 3 = 11$");
    vrai(5, "le pied violet est la projection de 2v − w sur l'axe de u", fleche(fig, s, [s[0], 0]));
  }
  {
    const r = [dot([-2, 3], [6, 4]), dot([5, 2], [-2, 4])];
    const m = 6 / 4;
    vrai(6, `${r.join(" ; ")} ; m = ${m}`, r[0] === 0 && r[1] === -2 && dot([m, 3], [4, -2]) === 0);
    dit(6, "= -12 + 12 = 0$");
    dit(6, "= -10 + 8 = -2$");
    dit(6, "donc $m = \\dfrac{3}{2}$");
    const fig = dessin(6, "vecteurs", "schema");
    vrai(6, "le dessin : les deux vecteurs du a)", fleche(fig, [0, 0], [-2, 3]) && fleche(fig, [0, 0], [6, 4]));
  }
  {
    const s2 = 16 + 2 * 12 + 25;
    const d2 = 16 - 2 * 12 + 25;
    vrai(7, `‖u+v‖² = ${s2}, ‖u−v‖² = ${d2}`, s2 === 65 && d2 === 17);
    dit(7, `= 16 + 24 + 25 = 65$, donc $\\|\\vec{u} + \\vec{v}\\| = \\sqrt{65} \\approx ${fr(sqrt(65), 2)}$`);
    dit(7, `= 16 - 24 + 25 = 17$, donc $\\|\\vec{u} - \\vec{v}\\| = \\sqrt{17} \\approx ${fr(sqrt(17), 2)}$`);
    const fig = dessin(7, "vecteurs", "schema");
    const u = [4, 0];
    const w = [3, 4];
    vrai(7, "le dessin : ‖u‖ = 4, ‖v‖ = 5, u·v = 12", norme(u) === 4 && norme(w) === 5 && dot(u, w) === 12 && fleche(fig, [0, 0], u) && fleche(fig, [0, 0], w));
    vrai(7, "u + v (violet) et u − v (vert) sont bien dessinés", fleche(fig, [0, 0], [7, 4]) && fleche(fig, w, u) && dot([7, 4], [7, 4]) === 65 && dot([1, -4], [1, -4]) === 17);
  }
  {
    const t = dessin(8, "triangle", "figure");
    const { A, B, C } = t.pts;
    const [AB, AC, BC] = [norme(vec(A, B)), norme(vec(A, C)), norme(vec(B, C))];
    const alk = 25 + 64 - 2 * 5 * 8 * cos(rad(60));
    vrai(8, `le dessin : AB = ${AB}, AC = ${AC.toFixed(3)}, angle ${angleDeg(vec(A, B), vec(A, C)).toFixed(2)}°, BC = ${BC.toFixed(3)}`, proche(AB, 5) && proche(AC, 8, 1e-3) && proche(angleDeg(vec(A, B), vec(A, C)), 60, 0.01) && proche(BC, 7, 1e-3));
    vrai(8, `Al-Kashi : BC² = ${alk}`, proche(alk, 49));
    dit(8, "= 89 - 40 = 49$, donc $BC = 7$");
    vrai(8, "étiquettes du dessin", t.opts.cotes?.AB === "5" && t.opts.cotes?.CA === "8" && t.opts.angles?.A === "60°");
  }

  v.titre("★★ Type devoir");
  {
    const W = 50 * 20 * cos(rad(30));
    vrai(9, `W = ${W.toFixed(3)} J = 500√3`, proche(W, 500 * sqrt(3)));
    dit(9, `= 500\\sqrt{3} \\approx ${fr(W, 0)}$ J`);
    dit(9, `= 25\\sqrt{3} \\approx ${fr(25 * sqrt(3), 1)}$ N`);
    const fig = dessin(9, "vecteurs", "schema");
    const [dep, F] = fig.fleches.slice(0, 2).map((x) => vec(x.de, x.vers));
    const pied = projete(fig.fleches[1].vers, [0, 0], dep);
    vrai(9, `le dessin : la corde à ${angleDeg(dep, F).toFixed(2)}° du sol`, proche(angleDeg(dep, F), 30, 0.01));
    vrai(9, "le pied violet est le projeté de la force sur le déplacement", memePoint(pied, [3.464, 0], 1e-6) && fleche(fig, fig.fleches[1].vers, [3.464, 0]) && fleche(fig, [0, 0], [3.464, 0]));
    vrai(9, "le poids (vert) est perpendiculaire au déplacement", proche(dot(vec(fig.fleches[4].de, fig.fleches[4].vers), dep), 0));
    vrai(9, "A et B aux deux bouts du déplacement", memePoint(pt(fig, "A"), fig.fleches[0].de) && memePoint(pt(fig, "B"), fig.fleches[0].vers));
  }
  {
    const fig = dessin(10, "vecteurs", "figure");
    const [A, B, C, Dd] = ["A", "B", "C", "D"].map((l) => pt(fig, l));
    lit(10, `$A(${A[0]}\\,;\\,${A[1]})$, $B(${B[0]}\\,;\\,${B[1]})$, $C(${C[0]}\\,;\\,${C[1]})$ et $D(${Dd[0]}\\,;\\,${Dd[1]})$`);
    const [AB, AD, DC, AC, BD] = [vec(A, B), vec(A, Dd), vec(Dd, C), vec(A, C), vec(B, Dd)];
    vrai(10, "AB·AD = 0, DC = AB, AB² = AD² = 20, AC·BD = 0", dot(AB, AD) === 0 && memePoint(DC, AB) && dot(AB, AB) === 20 && dot(AD, AD) === 20 && dot(AC, BD) === 0);
    dit(10, `$\\vec{AB}\\,(${AB[0]}\\,;\\,${AB[1]})$ et $\\vec{AD}\\,(${AD[0]}\\,;\\,${AD[1]})$`);
    dit(10, "= 8 - 8 = 0$");
    dit(10, `$\\vec{AC}\\,(${AC[0]}\\,;\\,${AC[1]})$ et $\\vec{BD}\\,(${BD[0]}\\,;\\,${BD[1]})$`);
    dit(10, `de côté $2\\sqrt{5} \\approx ${fr(2 * sqrt(5), 2)}$ m`);
    vrai(10, "le dessin : les quatre côtés", fleche(fig, A, B) && fleche(fig, A, Dd) && fleche(fig, B, C) && fleche(fig, Dd, C));
  }
  {
    const t = dessin(11, "triangle", "figure");
    const { A, B, C } = t.pts;
    const [AB, AC, BC] = [norme(vec(A, B)), norme(vec(A, C)), norme(vec(B, C))];
    vrai(11, `le dessin : ${AB}, ${AC.toFixed(3)}, ${BC.toFixed(3)}`, proche(AB, 3) && proche(AC, 5, 1e-3) && proche(BC, 7, 1e-3));
    const cosA = (9 + 25 - 49) / (2 * 3 * 5);
    vrai(11, `cos A = ${cosA} → ${deg(acos(cosA))}° (le dessin : ${angleDeg(vec(A, B), vec(A, C)).toFixed(2)}°)`, cosA === -0.5 && proche(deg(acos(cosA)), 120, 1e-9) && proche(angleDeg(vec(A, B), vec(A, C)), 120, 0.02));
    dit(11, "$\\widehat{A} = 120°$");
    const p1 = 3 * 5 * cos(rad(120));
    const p2 = (9 + 25 - 49) / 2;
    vrai(11, `AB·AC = ${p1.toFixed(6)} = ${p2}`, proche(p1, -7.5) && p2 === -7.5);
    dit(11, "15 \\times \\left(-\\dfrac{1}{2}\\right) = -7{,}5$");
    dit(11, "(9 + 25 - 49) = -7{,}5$");
  }
  {
    const p = (16 - 9 - 4) / 2;
    const cth = p / 6;
    vrai(12, `F1·F2 = ${p}, cos θ = ${cth}, θ = ${deg(acos(cth)).toFixed(3)}°`, p === 1.5 && cth === 0.25);
    dit(12, "\\vec{F_1} \\cdot \\vec{F_2} = 1{,}5$");
    dit(12, `$\\theta \\approx ${fr(deg(acos(cth)), 1)}°$`);
    dit(12, `$\\sqrt{13} \\approx ${fr(sqrt(13), 2)}$`);
    const fig = dessin(12, "vecteurs", "schema");
    const [F1, F2] = fig.fleches.slice(0, 2).map((x) => vec(x.de, x.vers));
    const S = [F1[0] + F2[0], F1[1] + F2[1]];
    vrai(12, `le dessin : ‖F1‖ = ${norme(F1)}, ‖F2‖ = ${norme(F2).toFixed(3)}, ‖F1 + F2‖ = ${norme(S).toFixed(3)}`, proche(norme(F1), 3) && proche(norme(F2), 2, 0.005) && proche(norme(S), 4, 0.005) && fleche(fig, [0, 0], S));
  }
  {
    const fig = dessin(13, "vecteurs", "schema");
    const [A, B, C, Dd] = ["A", "B", "C", "D"].map((l) => pt(fig, l));
    const AC = vec(A, C);
    const DB = vec(Dd, B);
    vrai(13, "le dessin : AB = 5, AD = 3, ABCD parallélogramme", proche(norme(vec(A, B)), 5) && proche(norme(vec(A, Dd)), 3) && memePoint(vec(A, B), vec(Dd, C)));
    vrai(13, `AC·DB = ${dot(AC, DB).toFixed(6)} = AB² − AD² = 16`, proche(dot(AC, DB), 16) && 25 - 9 === 16);
    dit(13, "= 25 - 9 = 16$");
    dit(13, `$\\vec{AC}\\,(${fr(AC[0])}\\,;\\,${fr(AC[1])})$ et $\\vec{DB}\\,(${fr(DB[0])}\\,;\\,${fr(DB[1])})$`);
    dit(13, "= 21{,}76 - 5{,}76 = 16$");
    vrai(13, "les diagonales dessinées sont AC et DB", fleche(fig, A, C) && fleche(fig, Dd, B));
  }
  {
    const fig = dessin(14, "vecteurs", "schema");
    const [A, B, C, Dd, I] = ["A", "B", "C", "D", "I"].map((l) => pt(fig, l));
    vrai(14, "le dessin : carré de côté 4, I milieu de [BC]", memePoint(I, [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2]) && norme(vec(A, B)) === 4 && dot(vec(A, B), vec(A, Dd)) === 0 && memePoint(vec(A, B), vec(Dd, C)) && norme(vec(A, Dd)) === 4);
    vrai(14, "le projeté de I sur (AB) est B", memePoint(projete(I, A, vec(A, B)), B));
    const [a, cc, d] = [dot(vec(A, B), vec(A, I)), dot(vec(A, I), vec(B, Dd)), dot(vec(A, C), vec(B, Dd))];
    vrai(14, `AB·AI = ${a}, AI·BD = ${cc}, AC·BD = ${d}`, a === 16 && cc === -8 && d === 0);
    dit(14, "= AB^2 = 16$");
    dit(14, "= -16 + 8 = -8$");
    vrai(14, "le dessin : AI (orange) et BD (vert)", fleche(fig, A, I) && fleche(fig, B, Dd));
  }
  {
    const n = [-3, 4];
    const s = [-1, 2];
    const AB = [4, 3];
    const ct = dot(n, s) / (norme(n) * norme(s));
    const ct2 = dot([0, 1], s) / norme(s);
    vrai(15, `n·AB = ${dot(n, AB)}, n·s = ${dot(n, s)}, cos θ = ${ct.toFixed(5)}, cos θ′ = ${ct2.toFixed(5)}`, dot(n, AB) === 0 && dot(n, s) === 11);
    dit(15, `\\approx ${fr(ct, 3)}$, donc $\\theta \\approx ${fr(deg(acos(ct)), 1)}°$`);
    dit(15, `\\approx ${fr(400 * ct, 0)}$ W`);
    dit(15, `\\approx ${fr(ct2, 3)}$, soit $\\theta' \\approx ${fr(deg(acos(ct2)), 1)}°$`);
    dit(15, `\\approx ${fr(400 * ct2, 0)}$ W`);
    dit(15, `environ $${fr(400 * ct - 400 * ct2, 0)}$ W`);
    vrai(15, `avec le panneau : AB·s = ${dot(AB, s)}, cos = 2/(5√5)`, dot(AB, s) === 2);
    const fig = dessin(15, "vecteurs", "schema");
    const [pan, nn, ss] = fig.fleches.map((x) => vec(x.de, x.vers));
    vrai(15, "le dessin : panneau AB, normale ∥ n (vert), Soleil ∥ s (orange), tous deux au milieu du panneau", memePoint(pan, AB) && colineaires(nn, n) && dot(nn, n) > 0 && colineaires(ss, s) && dot(ss, s) > 0 && memePoint(fig.fleches[1].de, [2, 1.5]));
  }
  {
    const bc2 = 36 + 16 - 2 * 6 * 4 * cos(rad(120));
    const t = dessin(16, "triangle", "figure");
    const { A, B, C } = t.pts;
    vrai(16, `BC² = ${bc2.toFixed(6)}`, proche(bc2, 76));
    vrai(16, `le dessin : AB = 6, AC = 4, angle ${angleDeg(vec(A, B), vec(A, C)).toFixed(2)}°, BC = ${norme(vec(B, C)).toFixed(3)}`, proche(norme(vec(A, B)), 6) && proche(norme(vec(A, C)), 4, 1e-3) && proche(angleDeg(vec(A, B), vec(A, C)), 120, 0.01) && proche(norme(vec(B, C)), sqrt(76), 1e-3));
    dit(16, "= 52 + 24 = 76$");
    dit(16, `$BC = \\sqrt{76} = 2\\sqrt{19} \\approx ${fr(sqrt(76), 2)}$ m`);
    vrai(16, "√76 = 2√19", proche(sqrt(76), 2 * sqrt(19)));
    dit(16, `$\\sqrt{52} \\approx ${fr(sqrt(52), 2)}$ m`);
  }

  v.titre("★★★ Problèmes");
  {
    const F = [3, 4];
    const d = [4, 3];
    const ct = dot(F, d) / (norme(F) * norme(d));
    vrai(17, `‖F‖ = ${norme(F)}, F·i = ${dot(F, [1, 0])}, F·d = ${dot(F, d)}, utile ${dot(F, d) / norme(d)}, θ = ${deg(acos(ct)).toFixed(3)}°, F·(4 ; −3) = ${dot(F, [4, -3])}`, norme(F) === 5 && dot(F, d) === 24 && dot(F, d) / norme(d) === 4.8 && dot(F, [4, -3]) === 0);
    dit(17, `donc $\\theta \\approx ${fr(deg(acos(ct)), 1)}°$`);
    dit(17, `$W = 480 \\times 2000 = 960\\,000$ J`);
    vrai(17, "480 × 2000 = 960 000", 480 * 2000 === 960000);
    const fig = dessin(17, "vecteurs", "schema");
    const pied = projete(F, [0, 0], d);
    vrai(17, `le pied violet (${pied.map((x) => x.toFixed(4))}) est le projeté de F sur le cap, et mesure 4,8`, fleche(fig, [0, 0], F) && fleche(fig, F, [3.84, 2.88]) && fleche(fig, [0, 0], [3.84, 2.88]) && memePoint(pied, [3.84, 2.88]) && proche(norme([3.84, 2.88]), 4.8));
    vrai(17, "le cap vert est orthogonal à F", fleche(fig, [0, 0], [4, -3]));
    dit(17, "\\sqrt{3{,}84^2 + 2{,}88^2} = 4{,}8$");
  }
  {
    const ab2 = 900 + 2500 - 2 * 30 * 50 * cos(rad(60));
    vrai(18, `AB² = ${ab2.toFixed(6)}, AB = ${sqrt(ab2).toFixed(4)}`, proche(ab2, 1900));
    dit(18, `= 3400 - 1500 = 1900$`);
    dit(18, `$AB = \\sqrt{1900} = 10\\sqrt{19} \\approx ${fr(sqrt(1900), 1)}$ km`);
    vrai(18, "RA·RB = 750", proche(30 * 50 * cos(rad(60)), 750));
    dit(18, "= 750$");
    vrai(18, "à 10 h 02 : ½(1600 + 900 − 2500) = 0", (1600 + 900 - 2500) / 2 === 0);
    const t1 = dessin(18, "triangle", "figure");
    const t2 = dessin(18, "triangle", "schema");
    const [R1, A1, B1] = [t1.pts.A, t1.pts.B, t1.pts.C];
    vrai(18, `dessin de 10 h 00 : RA = 30, RB = 50, angle 60°, AB = ${norme(vec(A1, B1)).toFixed(3)}`, proche(norme(vec(R1, A1)), 30) && proche(norme(vec(R1, B1)), 50, 1e-3) && proche(angleDeg(vec(R1, A1), vec(R1, B1)), 60, 0.01) && proche(norme(vec(A1, B1)), sqrt(1900), 1e-2));
    const [R2, A2, B2] = [t2.pts.A, t2.pts.B, t2.pts.C];
    vrai(18, "dessin de 10 h 02 : 40, 30, 50 et l'angle droit en R", proche(norme(vec(R2, A2)), 40) && proche(norme(vec(R2, B2)), 30) && proche(norme(vec(A2, B2)), 50) && dot(vec(R2, A2), vec(R2, B2)) === 0 && t2.opts.droit === "A");
  }
  {
    const fig = dessin(19, "droites", "schema");
    const [A, B, I, M] = ["A", "B", "I", "M"].map((l) => pt(fig, l));
    vrai(19, "I milieu de [AB], AB = 8", memePoint(I, [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2]) && norme(vec(A, B)) === 8);
    const MA = vec(M, A);
    const MB = vec(M, B);
    const MI2 = dot(vec(M, I), vec(M, I));
    vrai(19, `MA·MB = ${dot(MA, MB)} = MI² − 16 = ${MI2 - 16}`, dot(MA, MB) === 9 && MI2 - 16 === 9);
    dit(19, `$\\vec{MA}\\,(${MA[0]}\\,;\\,${MA[1]})$ et $\\vec{MB}\\,(${MB[0]}\\,;\\,${MB[1]})$`);
    dit(19, "= -7 + 16 = 9$");
    dit(19, "et $25 - 16 = 9$");
    const [c4, c5] = fig.cercles;
    vrai(19, "les cercles dessinés : centre I, rayons IA = 4 et 5 ; M sur le second", c4 && c5 && memePoint([c4.cx, c4.cy], I) && proche(c4.r, norme(vec(I, A))) && memePoint([c5.cx, c5.cy], I) && proche(c5.r, sqrt(MI2)) && c5.r === 5);
    vrai(19, "les segments MA et MB", fleche(fig, M, A) && fleche(fig, M, B));
  }
  {
    const AB = [360, 150];
    const L = norme(AB);
    const T = [300, 200];
    const cb = dot(T, AB) / (norme(T) * L);
    const tot = dot(T, AB) + dot([0, -700], AB) - 50 * L;
    vrai(20, `AB = ${L}, cos α = ${AB[0] / L}, W_P = ${dot([0, -700], AB)}, W_T = ${dot(T, AB)}, ‖T‖ = ${norme(T).toFixed(3)}, cos β = ${cb.toFixed(5)}, W_f = ${-50 * L}, total ${tot}`, L === 390 && dot([0, -700], AB) === -105000 && dot(T, AB) === 138000 && tot === 13500);
    dit(20, `\\sqrt{152\\,100} = 390$ m`);
    dit(20, `donc $\\alpha \\approx ${fr(deg(acos(AB[0] / L)), 1)}°$`);
    dit(20, "= -105\\,000$ J");
    dit(20, "= 108\\,000 + 30\\,000 = 138\\,000$ J");
    dit(20, `\\approx ${fr(norme(T), 1)}$ N`);
    dit(20, `\\approx ${fr(cb, 3)}$ et $\\beta \\approx ${fr(deg(acos(cb)), 1)}°$`);
    dit(20, "= -19\\,500$ J");
    dit(20, "= 13\\,500$ J");
    vrai(20, "(−150 ; 360) et (−5 ; 12) sont orthogonaux à AB", dot([-150, 360], AB) === 0 && dot([-5, 12], AB) === 0);
    const fig = dessin(20, "vecteurs", "schema");
    const [piste, t, p, r] = fig.fleches.map((x) => vec(x.de, x.vers));
    vrai(20, "le dessin : piste ∥ AB (entre A et B), T ∥ (300 ; 200), P vertical vers le bas, réaction ⟂ piste", colineaires(piste, AB) && memePoint(pt(fig, "A"), fig.fleches[0].de) && memePoint(pt(fig, "B"), fig.fleches[0].vers) && colineaires(t, T) && dot(t, T) > 0 && p[0] === 0 && p[1] < 0 && proche(dot(r, piste), 0, 1e-9) && r[1] > 0);
  }

  /* ── Les dessins et le rendu ── */
  v.titre("Les dessins");
  const sansDessin = f.blocs.map((b, i) => (/\b(figure|schema):/.test(b) ? 0 : i + 1)).filter(Boolean);
  v.ok("chaque exercice a au moins un dessin (figure ou schéma)", sansDessin.length === 0, `sans dessin : ${sansDessin.join(", ")}`);
  const tous = D.flat();
  const ecran = tous.filter((d) => d.ecran).length;
  const imprimes = tous.length - ecran;
  v.ok(`${imprimes} dessins imprimés (12 à 14), ${ecran} à l'écran seulement`, imprimes >= 12 && imprimes <= 14);
  const fautesE = [];
  const fautesF = [];
  D.forEach((ds, i) =>
    ds.forEach((d) => {
      if (d.plan) {
        fautesF.push(...fautesFenetre(d).map((x) => `${i + 1} : ${x}`));
        fautesE.push(...fautesEtiquettes(d).map((x) => `${i + 1} : ${x}`));
      } else if (d.type === "repere") {
        const [x1, x2, y1, y2] = d.cadre;
        if (!(y1 < 0)) fautesF.push(`${i + 1} : repère avec ymin ≥ 0`);
        if ((x2 - x1 > 10 || y2 - y1 > 10) && !d.grand) fautesF.push(`${i + 1} : repère de plus de 10 unités sans « grand »`);
        if (x2 - x1 > 15 || y2 - y1 > 15) fautesF.push(`${i + 1} : repère de plus de 15 unités`);
        fautesE.push(...fautesEtiquettes(d).map((x) => `${i + 1} : ${x}`));
      }
    }),
  );
  v.ok("fenêtres carrées et entières, tout dedans, rien au bord, 15 unités au plus", fautesF.length === 0, fautesF.slice(0, 3).join(" | "));
  v.ok("aucune étiquette sur une graduation, un autre point ou une autre étiquette (mesuré en px)", fautesE.length === 0, fautesE.slice(0, 20).join(" | "));
  const textesSvg = tous.flatMap((d) =>
    d.type === "triangle"
      ? [...Object.values(d.opts.cotes ?? {}), ...Object.values(d.opts.angles ?? {}), ...Object.values(d.opts.noms ?? {}), d.opts.hauteur?.label ?? ""]
      : (d.points ?? d.marques ?? []).map((p) => p.label ?? ""),
  );
  const sales = textesSvg.filter((t) => /[$\\]|-\d/.test(t));
  v.ok(`${textesSvg.length} textes de dessin NUS (ni $, ni antislash, vrai signe « − »)`, sales.length === 0, sales.join(" | "));

  v.titre("Le source");
  const { cassees, chaines } = lireChaines(src);
  v.ok("aucune chaîne coupée par une vraie fin de ligne", cassees.length === 0, `lignes ${cassees.join(", ")}`);
  const simples = chaines.filter(({ texte }) => {
    for (let i = 0; i < texte.length; i++) if (texte[i] === "\\") {
      if (!["\\", "n", '"'].includes(texte[i + 1])) return true;
      i++;
    }
    return false;
  });
  v.ok(`antislashs doublés dans les ${chaines.length} chaînes`, simples.length === 0, simples.slice(0, 2).map((s) => `ligne ${s.ligne}`).join(", "));
  const nbCorr = (src.match(/\bcorrection:/g) ?? []).length;
  v.ok(`${nbCorr} « correction: »`, nbCorr === 20);
  if (src.includes("tableau(")) {
    const faux = [...src.matchAll(/tableau\((\[[^\]]*\]),\s*(\[[^\]]*\])/g)].filter((m) => evalue([m[1]])[0].length !== evalue([m[2]])[0].length);
    v.ok("tableaux : entête et ligne de même longueur", faux.length === 0);
  }
  return { imprimes, ecran, illustres: 20 - sansDessin.length };
}

/* ══════════════ Lancement ══════════════ */

function passe(src, bavard) {
  let justes = 0;
  let fausses = 0;
  const v = {
    ok(nom, cond, detail = "") {
      if (cond) {
        justes++;
        if (bavard) console.log(`  ✓ ${nom}`);
      } else {
        fausses++;
        if (bavard) console.log(`  ✗ ${nom}${detail ? " — " + detail : ""}`);
      }
    },
    titre(t) {
      if (bavard) console.log(`\n${t}`);
    },
  };
  let bilan = null;
  try {
    bilan = verifier(src, v);
  } catch (err) {
    v.ok("le recalcul s'exécute", false, String(err?.message ?? err));
  }
  controlesCommuns(v, src, { notionId: NOTION, classe: "premiere-spe" });
  return { justes, fausses, bilan };
}

console.log(`\nCalcul vectoriel et produit scalaire (1re spé) — ${FICHIER}`);
const r = passe(source, true);

const CASSES = [
  ["ex. 1 : le sommet C du triangle déplacé", 'C: [4, 3] }, { cotes: { AB: "6" }', 'C: [3, 3] }, { cotes: { AB: "6" }'],
  ["ex. 8 : BC faux", "donc $BC = 7$", "donc $BC = 8$"],
  ["ex. 17 : pied de la projection faux", "vers: [3.84, 2.88], couleur: VIOLET, pointe: false", "vers: [3.8, 2.9], couleur: VIOLET, pointe: false"],
  ["ex. 20 : total des travaux faux", "= 13\\\\,500$ J", "= 12\\\\,500$ J"],
  ["une vraie fin de ligne dans une chaîne", 'titre: "Un seul geste",', 'titre: "Un seul\ngeste",'],
  ["ex. 3 : le dessin retiré", "schema: ecranSeulement(vecteurs([-3, 6]", "autre: ecranSeulement(vecteurs([-3, 6]"],
  ["un $ dans une étiquette de point", 'label: "M" }', 'label: "$M$" }'],
  ["ex. 4 : B glissé, son étiquette sur une graduation", "{ x: 2, y: -1, label: \"B\" }", "{ x: 1.6, y: -1, label: \"B\" }"],
];
console.log("\nContrôles négatifs — joués en mémoire, le fichier n'est jamais touché");
let rateees = 0;
if (r.fausses > 0) {
  console.log("  ✗ NON PROBANTS : la passe propre n'est pas verte");
  rateees = CASSES.length;
} else
  for (const [quoi, avant, apres] of CASSES) {
    const n = source.split(avant).length - 1;
    if (n !== 1) {
      rateees++;
      console.log(`  ✗ NON jouée (${n} occurrence(s)) : ${quoi}`);
      continue;
    }
    const x = passe(source.replace(avant, apres), false);
    if (x.fausses > 0) console.log(`  ✓ attrapée (${x.fausses} écart${x.fausses > 1 ? "s" : ""}) : ${quoi}`);
    else {
      rateees++;
      console.log(`  ✗ PASSÉE INAPERÇUE : ${quoi}`);
    }
  }
const intact = fs.readFileSync(path.join(RACINE, FICHIER), "utf8") === source;
if (!intact) rateees++;

if (r.bilan) console.log(`\n${r.bilan.illustres}/20 exercices illustrés, ${r.bilan.imprimes} dessins imprimés, ${r.bilan.ecran} écran seulement`);
console.log(`${r.justes + CASSES.length - rateees} vérifications justes, ${r.fausses + rateees} fausses`);
process.exitCode = r.fausses + rateees ? 1 : 0;
