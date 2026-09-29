// Recalcul INDÉPENDANT de la feuille « Géométrie repérée » de 1re spé
// (lib/fiches-exercices/maths-premiere-geometrie-reperee.tsx), 29/09/2026.
//
// ⭐ L'AUTRE CHEMIN : les droites sont refaites ici depuis un point et un vecteur
// normal, les intersections par Cramer, les projetés par la formule
// H = M − (ax + by + c)/(a² + b²) · (a ; b) (le corrigé, lui, passe par
// H = M + t n) ; centres et rayons sortent de −D/2, −E/2 et D²/4 + E²/4 − F ;
// l'entrée et la sortie du radar se retrouvent en partant du projeté, sans
// équation du second degré. Les DESSINS sont relus dans le source — `droites(…)`,
// `repere(…)`, `cercle(…)`, `parabole(…)` — et doivent dire la même chose que
// l'énoncé et le corrigé.
//
// Plus : les contrôles communs (8 + 8 + 4, dollars, micros toutes couvertes),
// une chaîne jamais coupée par une vraie fin de ligne, des antislashs doublés,
// du texte NU dans les dessins, AU MOINS UN DESSIN PAR EXERCICE, 12 à 14 dessins
// imprimés, et des étiquettes de points qui ne tombent ni sur une graduation ni
// sur un autre point (géométrie du canvas `fonctionGraphique`, mesurée en px).
// Enfin, des contrôles négatifs joués en mémoire.
//
//   node scripts/verifier-exercices-premiere-spe-geometrie-reperee.mjs

import fs from "node:fs";
import path from "node:path";
import { RACINE, lireFeuille, controlesCommuns } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-premiere-geometrie-reperee.tsx";
const NOTION = "geometrie_reperee";
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

  /* Droites : `{ a, b, c }` pour ax + by + c = 0. */
  const L = (l) => (Array.isArray(l) ? l : [l.a, l.b, l.c]);
  const memeDroite = (l, m) => {
    const [p, q] = [L(l), L(m)];
    return abs(p[0] * q[1] - p[1] * q[0]) < 1e-9 && abs(p[0] * q[2] - p[2] * q[0]) < 1e-9 && abs(p[1] * q[2] - p[2] * q[1]) < 1e-9;
  };
  const sur = (P, l) => {
    const [a, b, cc] = L(l);
    return abs(a * P[0] + b * P[1] + cc) < 1e-9;
  };
  /** La droite passant par P, de vecteur normal n. */
  const parNormal = (P, n) => [n[0], n[1], -(n[0] * P[0] + n[1] * P[1])];
  /** Cramer. */
  const interDroites = (l, m) => {
    const [a, b, cc] = L(l);
    const [d, ee, ff] = L(m);
    const det = a * ee - b * d;
    return [(b * ff - cc * ee) / det, (cc * d - a * ff) / det];
  };
  /** Projeté orthogonal de P sur la droite l (par la formule, pas par le corrigé). */
  const projDroite = (P, l) => {
    const [a, b, cc] = L(l);
    const k = (a * P[0] + b * P[1] + cc) / (a * a + b * b);
    return [P[0] - k * a, P[1] - k * b];
  };
  /** x² + y² + Dx + Ey + F = 0 → centre et r². */
  const cercleDe = (Dx, Ey, F) => ({ centre: [-Dx / 2, -Ey / 2], r2: (Dx * Dx) / 4 + (Ey * Ey) / 4 - F });
  const milieu = (P, Q) => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
  const ecrit = (P) => `(${fr(P[0])}\\,;\\,${fr(P[1])})`;
  const lignes = (fig) => fig.lignes.map(L);
  const cercleDessine = (fig, centre, r, i = 0) => {
    const cc = fig.cercles[i];
    return !!cc && memePoint([cc.cx, cc.cy], centre) && proche(cc.r, r, 1e-9);
  };

  v.titre("★ Un seul geste");
  {
    const fig = dessin(1, "droites", "schema");
    const d1 = [2, -3, 5];
    const n1 = [d1[0], d1[1]];
    const fl = fig.fleches[0];
    vrai(1, "le dessin : d1, et n1 partant d'un point de d1", memeDroite(fig.lignes[0], d1) && sur(fl.de, d1) && memePoint(vec(fl.de, fl.vers), n1));
    dit(1, "$\\vec{n_1}\\,(2\\,;\\,-3)$");
    vrai(1, "y = 4x − 1 ⇔ 4x − y − 1 = 0 (deux points)", [0, 1].every((x) => sur([x, 4 * x - 1], [4, -1, -1])));
    dit(1, "$4x - y - 1 = 0$. Donc $\\vec{n_2}\\,(4\\,;\\,-1)$");
    dit(1, "$\\vec{n_3}\\,(1\\,;\\,0)$");
    vrai(1, "m = −2 n1", memePoint([-4, 6], [-2 * n1[0], -2 * n1[1]]));
    dit(1, "$\\vec{m} = -2\\,\\vec{n_1}$");
  }
  {
    const fig = dessin(2, "droites", "schema");
    const d = [3, 2, -6];
    const u = [-d[1], d[0]];
    const fl = fig.fleches[0];
    vrai(2, "le dessin : d, et u de d à d", memeDroite(fig.lignes[0], d) && sur(fl.de, d) && sur(fl.vers, d) && memePoint(vec(fl.de, fl.vers), u));
    dit(2, `$\\vec{u}\\,(${u[0]}\\,;\\,${u[1]})$`);
    vrai(2, "w = −2u ; d′ : (1 ; 5), pente 5", memePoint([4, -6], [-2 * u[0], -2 * u[1]]) && memePoint([1, 5], [1, 5]) && dot([5, -1], [1, 5]) === 0);
    dit(2, "$\\vec{w} = -2\\,\\vec{u}$");
    dit(2, "$\\vec{u'}\\,(1\\,;\\,5)$");
    vrai(2, "(2 ; 3) et (3 ; 2) ne dirigent pas d", dot([3, 2], [2, 3]) !== 0 && dot([3, 2], [3, 2]) !== 0);
  }
  {
    const fig = dessin(3, "droites", "schema");
    const A = pt(fig, "A");
    const B = pt(fig, "B");
    const da = parNormal(A, [3, 1]);
    const db = parNormal(B, [1, -2]);
    vrai(3, `droites recalculées : (${da}) et (${db})`, memeDroite(da, [3, 1, -1]) && memeDroite(db, [1, -2, 4]));
    lit(3, `$A(${A[0]}\\,;\\,${A[1]})$`);
    lit(3, `$B(${B[0]}\\,;\\,${B[1]})$`);
    dit(3, "soit $3x + y - 1 = 0$");
    dit(3, "D'où $x - 2y + 4 = 0$");
    vrai(3, "le dessin : les deux droites, et les normaux partant de A et de B", memeDroite(fig.lignes[0], da) && memeDroite(fig.lignes[1], db) && fleche(fig, A, [A[0] + 3, A[1] + 1]) && fleche(fig, B, [B[0] + 1, B[1] - 2]));
  }
  {
    const fig = dessin(4, "droites", "schema");
    const [d1, d2, d3] = lignes(fig);
    vrai(4, "le dessin : d1, d2, d3 de l'énoncé", memeDroite(d1, [2, -1, 1]) && memeDroite(d2, [1, 2, -4]) && memeDroite(d3, [4, -2, 7]));
    vrai(4, "d1 ∥ d3 (non confondues), d1 ⟂ d2, d3 ⟂ d2", colineaires([d1[0], d1[1]], [d3[0], d3[1]]) && !memeDroite(d1, d3) && dot([d1[0], d1[1]], [d2[0], d2[1]]) === 0 && dot([d3[0], d3[1]], [d2[0], d2[1]]) === 0);
    vrai(4, "(0 ; 1) sur d1, et 4 × 0 − 2 × 1 + 7 = 5 dans d3", sur([0, 1], d1) && 4 * 0 - 2 * 1 + 7 === 5);
    dit(4, "$4 \\times 0 - 2 \\times 1 + 7 = 5$");
    dit(4, "$\\vec{n_1} \\cdot \\vec{n_2} = 2 \\times 1 + (-1) \\times 2 = 0$");
  }
  {
    const fig = dessin(5, "droites", "schema");
    const d = [1, -2, 1];
    const M = [4, 5];
    const H = projDroite(M, d);
    vrai(5, `H = (${H})`, memePoint(H, [5, 3]));
    dit(5, `$H(5\\,;\\,3)$`);
    dit(5, `$MH = \\sqrt{1 + 4} = \\sqrt{5} \\approx ${fr(sqrt(5), 2)}$`);
    vrai(5, "MH = √5 ; (4 ; 2,5) est sur d, mais n'est pas H", proche(norme(vec(M, H)), sqrt(5)) && sur([4, 2.5], d));
    vrai(5, "le dessin : d, M, H et le segment [MH]", memeDroite(fig.lignes[0], d) && memePoint(pt(fig, "M"), M) && memePoint(pt(fig, "H"), H) && fleche(fig, M, H));
  }
  {
    const fig = dessin(6, "droites", "schema");
    vrai(6, "le dessin : cercle de centre Ω(−2 ; 2), rayon 2", cercleDessine(fig, [-2, 2], 2) && memePoint(pt(fig, "Ω"), [-2, 2]));
    dit(6, "soit $(x + 2)^2 + (y - 2)^2 = 4$");
    dit(6, "$x^2 + y^2 = 5$");
    const AB = norme(vec([3, -1], [0, 3]));
    vrai(6, `AB = ${AB}`, AB === 5);
    dit(6, "$(x - 3)^2 + (y + 1)^2 = 25$");
  }
  {
    const a = cercleDe(-2, 2, -7);
    const b = cercleDe(6, 0, 10);
    vrai(7, `a) centre (${a.centre}), r² = ${a.r2} ; b) r² = ${b.r2}`, memePoint(a.centre, [1, -1]) && a.r2 === 9 && b.r2 === -1);
    dit(7, "soit $(x - 1)^2 + (y + 1)^2 = 9$");
    dit(7, "soit $(x + 3)^2 + y^2 = -1$");
    const fig = dessin(7, "droites", "schema");
    vrai(7, "le dessin : le cercle du a)", cercleDessine(fig, a.centre, sqrt(a.r2)) && memePoint(pt(fig, "Ω"), a.centre));
  }
  {
    const fig = dessin(8, "repere", "schema");
    const [p1, p2] = fig.courbes.map((x) => x.q);
    const sommet = ([a, b, cc]) => [-b / (2 * a), cc - (b * b) / (4 * a)];
    vrai(8, "les paraboles dessinées sont celles de l'énoncé", JSON.stringify(p1) === "[2,-8,5]" && JSON.stringify(p2) === "[-1,6,-5]");
    const [S, T] = [sommet(p1), sommet(p2)];
    vrai(8, `sommets (${S}) et (${T}), marqués S et T`, memePoint(S, [2, -3]) && memePoint(T, [3, 4]) && fig.marques.some((m) => m.label === "S" && memePoint([m.x, m.y], S)) && fig.marques.some((m) => m.label === "T" && memePoint([m.x, m.y], T)));
    dit(8, "sommet $S(2\\,;\\,-3)$");
    dit(8, "sommet $T(3\\,;\\,4)$");
    vrai(8, "forme canonique 2(x − 2)² − 3", [-1, 0, 1, 2, 5].every((x) => proche(2 * (x - 2) ** 2 - 3, 2 * x * x - 8 * x + 5)));
    vrai(8, "le cadre a son ymin < 0 et garde deux unités au-dessus de T", fig.cadre[2] < 0 && fig.cadre[3] - T[1] >= 2);
  }

  v.titre("★★ Type devoir");
  {
    const fig = dessin(9, "droites", "schema");
    const [A, B] = [[-2, 1], [4, 3]];
    const I = milieu(A, B);
    const med = parNormal(I, vec(A, B));
    const route = [0, 1, 1];
    const E = interDroites(med, route);
    vrai(9, `I = (${I}), médiatrice (${med}), E = (${E})`, memePoint(I, [1, 2]) && memeDroite(med, [3, 1, -5]) && memePoint(E, [2, -1]));
    vrai(9, "EA = EB = √20", proche(norme(vec(E, A)), sqrt(20)) && proche(norme(vec(E, B)), sqrt(20)));
    dit(9, "soit $I(1\\,;\\,2)$");
    dit(9, "$3x + y - 5 = 0$");
    dit(9, "$E(2\\,;\\,-1)$");
    dit(9, `$EA = EB = \\sqrt{20} = 2\\sqrt{5} \\approx ${fr(sqrt(20), 2)}$ km`);
    vrai(9, "le dessin : médiatrice, route, A, B, I, E, segment [AB]", memeDroite(fig.lignes[0], med) && memeDroite(fig.lignes[1], route) && ["A", "B", "I", "E"].every((l, i) => memePoint(pt(fig, l), [A, B, I, E][i])) && fleche(fig, A, B));
  }
  {
    const fig = dessin(10, "droites", "schema");
    const d = [1, -3, 6];
    const F = [4, 0];
    const u = [-d[1], d[0]];
    const chemin = parNormal(F, u);
    const H = interDroites(d, chemin);
    const canal = parNormal(F, [d[0], d[1]]);
    vrai(10, `u = (${u}), chemin (${chemin}), H = (${H}), canal (${canal})`, memePoint(u, [3, 1]) && memeDroite(chemin, [3, 1, -12]) && memePoint(H, [3, 3]) && memeDroite(canal, [1, -3, -4]));
    vrai(10, "H est bien le projeté de F sur la route", memePoint(projDroite(F, d), H));
    dit(10, "Chemin : $3x + y - 12 = 0$");
    dit(10, "$H(3\\,;\\,3)$");
    dit(10, `$FH = \\sqrt{1 + 9} = \\sqrt{10} \\approx ${fr(sqrt(10), 2)}$ km`);
    dit(10, "$x - 3y - 4 = 0$");
    const fl = fig.fleches[0];
    vrai(10, "le dessin : route, chemin, canal, F, H, et u posé sur la route", memeDroite(fig.lignes[0], d) && memeDroite(fig.lignes[1], chemin) && memeDroite(fig.lignes[2], canal) && memePoint(pt(fig, "F"), F) && memePoint(pt(fig, "H"), H) && sur(fl.de, d) && memePoint(vec(fl.de, fl.vers), u));
  }
  {
    const fig = dessin(11, "droites", "schema");
    const [A, B] = [[0, 2], [6, -2]];
    const O = milieu(A, B);
    const r2 = dot(vec(O, A), vec(O, A));
    const d2 = (P) => dot(vec(O, P), vec(O, P));
    const [R, T, P] = [[5, 3], [2, 4], [4, -1]];
    vrai(11, `Ω = (${O}), r² = ${r2} ; ΩR² = ${d2(R)}, ΩT² = ${d2(T)}, ΩP² = ${d2(P)}`, memePoint(O, [3, 0]) && r2 === 13 && d2(R) === 13 && d2(T) === 17 && d2(P) === 2);
    vrai(11, "RA·RB = 0", dot(vec(R, A), vec(R, B)) === 0);
    dit(11, `$r = \\sqrt{13} \\approx ${fr(sqrt(13), 2)}$ m`);
    dit(11, "$(x - 3)^2 + y^2 = 13$");
    dit(11, "= 1 + 16 = 17 > 13$");
    dit(11, "$(4 - 3)^2 + (-1)^2 = 2 < 13$");
    dit(11, "$\\vec{RA} \\cdot \\vec{RB} = -5 + 5 = 0$");
    vrai(11, "le dessin : le cercle et les six points", cercleDessine(fig, O, sqrt(13)) && ["A", "B", "Ω", "R", "T", "P"].every((l, i) => memePoint(pt(fig, l), [A, B, O, R, T, P][i])));
  }
  {
    const fig = dessin(12, "droites", "schema");
    const k = cercleDe(-4, -2, -4);
    const O = k.centre;
    vrai(12, `centre (${O}), r² = ${k.r2}`, memePoint(O, [2, 1]) && k.r2 === 9);
    vrai(12, "le banc : ΩA² = 8 < 9", dot(vec(O, [4, 3]), vec(O, [4, 3])) === 8);
    // L'allée y = 4 : (x − 2)² = 9 − (4 − 1)² ; y = 1 : (x − 2)² = 9.
    vrai(12, "y = 4 : un seul point (discriminant nul) ; y = 1 : x = −1 et 5, longueur 6", k.r2 - (4 - O[1]) ** 2 === 0 && k.r2 - (1 - O[1]) ** 2 === 9 && O[0] - 3 === -1 && O[0] + 3 === 5);
    dit(12, "soit $(x - 2)^2 + (y - 1)^2 = 9$");
    dit(12, "$(4 - 2)^2 + (3 - 1)^2 = 8 < 9$");
    dit(12, "UN seul point, $T(2\\,;\\,4)$");
    dit(12, "soit $x = 5$ ou $x = -1$");
    vrai(12, "le dessin : cercle, allées y = 4 et y = 1, Ω, A, T", cercleDessine(fig, O, 3) && memeDroite(fig.lignes[0], [0, 1, -4]) && memeDroite(fig.lignes[1], [0, 1, -1]) && memePoint(pt(fig, "T"), [2, 4]) && memePoint(pt(fig, "A"), [4, 3]) && memePoint(pt(fig, "Ω"), O));
  }
  {
    const fig = dessin(13, "droites", "schema");
    const d = [3, -4, 5];
    const [M, Lp] = [[-2, 6], [5, 5]];
    const H = projDroite(M, d);
    const ML = norme(vec(M, Lp));
    vrai(13, `H = (${H}), MH = ${norme(vec(M, H))}, L sur d, ML = ${ML.toFixed(4)}, HL = ${norme(vec(H, Lp))}`, memePoint(H, [1, 2]) && proche(norme(vec(M, H)), 5) && sur(Lp, d) && proche(norme(vec(H, Lp)), 5));
    dit(13, "$t = 1$ et $H(1\\,;\\,2)$");
    dit(13, `$ML = \\sqrt{49 + 1} = \\sqrt{50} \\approx ${fr(ML, 2)}$`);
    dit(13, `environ $${fr(10 * ML, 1)}$ m : à peu près $${fr(10 * ML - 50, 1)}$ m de plus`);
    vrai(13, "(−2 ; −0,25) est sur d", sur([-2, -0.25], d));
    vrai(13, "le dessin : d, M, H, L, [MH] et [ML]", memeDroite(fig.lignes[0], d) && ["M", "H", "L"].every((l, i) => memePoint(pt(fig, l), [M, H, Lp][i])) && fleche(fig, M, H) && fleche(fig, M, Lp));
  }
  {
    const fig = dessin(14, "repere", "schema");
    const f = (x) => -0.25 * x * x + 2 * x;
    vrai(14, "sommet (4 ; 4), racines 0 et 8, f(3) = f(5) = 3,75", proche(-2 / (2 * -0.25), 4) && proche(f(4), 4) && proche(f(0), 0) && proche(f(8), 0) && proche(f(3), 3.75) && proche(f(5), 3.75));
    vrai(14, "forme canonique −0,25(x − 4)² + 4", [-1, 0, 2, 7].every((x) => proche(-0.25 * (x - 4) ** 2 + 4, f(x))));
    dit(14, "donc $S(4\\,;\\,4)$");
    dit(14, "$y = -0{,}25 \\times (3 - 4)^2 + 4 = 3{,}75$");
    vrai(14, "le dessin : la parabole, S, les deux coins du toit, la hauteur 3,75", JSON.stringify(fig.courbes[0].q) === "[-0.25,2,0]" && fig.marques.every((m) => proche(f(m.x), m.y)) && fig.marques.some((m) => m.label === "S" && m.x === 4) && fig.horizontale === 3.75 && fig.cadre[3] - 4 >= 2);
  }
  {
    const fig = dessin(15, "droites", "schema");
    const [A, B, C, Dd, E, F, K] = ["A", "B", "C", "D", "E", "F", "K"].map((l) => pt(fig, l));
    vrai(15, "le dessin : carré de côté 4, E et F milieux", memePoint(A, [0, 0]) && memePoint(C, [4, 4]) && memePoint(E, milieu(A, B)) && memePoint(F, milieu(B, C)) && memePoint(Dd, [0, 4]));
    vrai(15, "DE·AF = 0", dot(vec(Dd, E), vec(A, F)) === 0);
    const af = parNormal(A, vec(Dd, E));
    const de = parNormal(Dd, vec(A, F));
    const Kc = interDroites(af, de);
    vrai(15, `(AF) : (${af}) passe par F ; (DE) : (${de}) passe par E ; K = (${Kc})`, sur(F, af) && sur(E, de) && memeDroite(af, [1, -2, 0]) && memeDroite(de, [2, 1, -4]) && memePoint(Kc, K) && memePoint(Kc, [1.6, 0.8]));
    dit(15, "donc $x - 2y = 0$");
    dit(15, "donc $2x + y - 4 = 0$");
    dit(15, "$K(1{,}6\\,;\\,0{,}8)$");
    vrai(15, "K sur le cercle de diamètre [AD]", proche(dot(vec(milieu(A, Dd), K), vec(milieu(A, Dd), K)), 4));
    dit(15, "= 2{,}56 + 1{,}44 = 4$");
    vrai(15, "les allées dessinées : [DE] et [AF]", fleche(fig, Dd, E) && fleche(fig, A, F));
  }
  {
    const fig = dessin(16, "droites", "schema");
    const [O, A, P] = [[1, 1], [2, 3], [6, 1]];
    const r2 = dot(vec(O, A), vec(O, A));
    const t = parNormal(A, vec(O, A));
    vrai(16, `r² = ${r2}, tangente (${t}), P dessus, AP·ΩA = ${dot(vec(A, P), vec(O, A))}`, r2 === 5 && memeDroite(t, [1, 2, -8]) && sur(P, t) && dot(vec(A, P), vec(O, A)) === 0);
    dit(16, "$(x - 1)^2 + (y - 1)^2 = 5$");
    dit(16, "Tangente : $x + 2y - 8 = 0$");
    vrai(16, "le dessin : cercle, tangente, rayon, Ω, A, P", cercleDessine(fig, O, sqrt(5)) && memeDroite(fig.lignes[0], t) && fleche(fig, O, A) && ["Ω", "A", "P"].every((l, i) => memePoint(pt(fig, l), [O, A, P][i])));
  }

  v.titre("★★★ Problèmes");
  {
    const fig = dessin(17, "droites", "schema");
    const k = cercleDe(-2, -2, -23);
    const O = k.centre;
    const d = [3, 4, -22];
    const H = projDroite(O, d);
    // Entrée et sortie : on parcourt d depuis H selon sa direction (4 ; −3)/5, de ±√(r² − ΩH²).
    const ecart = sqrt(k.r2 - dot(vec(O, H), vec(O, H)));
    const E = [H[0] - (ecart * 4) / 5, H[1] + (ecart * 3) / 5];
    const S = [H[0] + (ecart * 4) / 5, H[1] - (ecart * 3) / 5];
    vrai(17, `Ω = (${O}), r = ${sqrt(k.r2)}, H = (${H.map((x) => +x.toFixed(9))}), ΩH = ${norme(vec(O, H))}`, memePoint(O, [1, 1]) && k.r2 === 25 && memePoint(H, [2.8, 3.4]) && proche(norme(vec(O, H)), 3));
    vrai(17, `E = (${E.map((x) => +x.toFixed(9))}), S = (${S.map((x) => +x.toFixed(9))}), ES = ${norme(vec(E, S))}`, memePoint(E, [-0.4, 5.8]) && memePoint(S, [6, 1]) && proche(norme(vec(E, S)), 8));
    vrai(17, "5x² − 28x − 12 a pour racines −0,4 et 6 ; Δ = 1024", [-0.4, 6].every((x) => proche(5 * x * x - 28 * x - 12, 0)) && 28 * 28 + 4 * 5 * 12 === 1024);
    vrai(17, "80 km à 800 km/h : 6 min", (80 / 800) * 60 === 6);
    dit(17, "$t = 0{,}6$ et $H(2{,}8\\,;\\,3{,}4)$");
    dit(17, "$5x^2 - 28x - 12 = 0$");
    dit(17, "= 784 + 240 = 1024 = 32^2$");
    dit(17, "$E(-0{,}4\\,;\\,5{,}8)$ et sort en $S(6\\,;\\,1)$");
    dit(17, "soit $6$ minutes");
    vrai(17, "le dessin : cercle, trajectoire, Ω, H, E, S, rayon [ΩH]", cercleDessine(fig, O, 5) && memeDroite(fig.lignes[0], d) && ["Ω", "H", "E", "S"].every((l, i) => memePoint(pt(fig, l), [O, H, E, S][i])) && fleche(fig, O, [2.8, 3.4]));
  }
  {
    const fig = dessin(18, "droites", "schema");
    const [A, B, C, Dh] = [[0, 4], [4, 4], [5, -1], [0, -2]];
    const m1 = parNormal(milieu(A, B), vec(A, B));
    const m2 = parNormal(milieu(B, C), vec(B, C));
    const O = interDroites(m1, m2);
    const r2 = dot(vec(O, A), vec(O, A));
    vrai(18, `médiatrices (${m1}) et (${m2}), Ω = (${O}), r² = ${r2}`, memeDroite(m1, [1, 0, -2]) && memeDroite(m2, [1, -5, 3]) && memePoint(O, [2, 1]) && r2 === 13);
    vrai(18, "ΩB² = ΩC² = ΩD² = 13", [B, C, Dh].every((P) => proche(dot(vec(O, P), vec(O, P)), 13)));
    dit(18, "$x - 5y + 3 = 0$");
    dit(18, "Le relais va en $\\Omega(2\\,;\\,1)$");
    dit(18, `portée minimale $\\sqrt{13} \\approx ${fr(sqrt(13), 2)}$ km`);
    dit(18, "$(x - 2)^2 + (y - 1)^2 = 13$");
    vrai(18, "le dessin : les deux médiatrices, le cercle, A, B, C, D, Ω", memeDroite(fig.lignes[0], m1) && memeDroite(fig.lignes[1], m2) && cercleDessine(fig, O, sqrt(13)) && ["A", "B", "C", "D", "Ω"].every((l, i) => memePoint(pt(fig, l), [A, B, C, Dh, O][i])));
  }
  {
    const fig = dessin(19, "droites", "schema");
    const f = (x) => 0.5 * x * x - 3 * x + 2.5;
    const S = [3, f(3)];
    const [A, B] = [[1, f(1)], [5, f(5)]];
    vrai(19, `S = (${S}), A = (${A}), B = (${B})`, memePoint(S, [3, -2]) && memePoint(A, [1, 0]) && memePoint(B, [5, 0]) && proche(-(-3) / (2 * 0.5), 3));
    vrai(19, "SA·SB = 0 ; S sur le cercle de centre (3 ; 0), rayon 2", dot(vec(S, A), vec(S, B)) === 0 && proche(norme(vec([3, 0], S)), 2));
    const yc = -sqrt(4 - (2 - 3) ** 2);
    vrai(19, `en x = 2 : parabole ${f(2)}, demi-cercle ${yc.toFixed(4)}, écart ${(f(2) - yc).toFixed(3)}`, proche(f(2), -1.5) && f(2) > yc);
    dit(19, "$S(3\\,;\\,-2)$");
    dit(19, "$A(1\\,;\\,0)$ et $B(5\\,;\\,0)$");
    dit(19, "$\\mathcal{C} : (x - 3)^2 + y^2 = 4$");
    dit(19, `$y = -\\sqrt{3} \\approx ${fr(yc, 2)}$`);
    dit(19, `d'environ $${fr(f(2) - yc, 2)}$ m`);
    const pa = fig.paraboles[0];
    vrai(19, "le dessin : la parabole (0,5 ; −3 ; 2,5), le cercle, A, B, S", pa && pa.a === 0.5 && pa.b === -3 && pa.c === 2.5 && cercleDessine(fig, [3, 0], 2) && ["A", "B", "S"].every((l, i) => memePoint(pt(fig, l), [A, B, S][i])));
    vrai(19, "entre A et S, la parabole reste au-dessus du demi-cercle", [1.25, 1.5, 2, 2.5, 2.9].every((x) => f(x) > -sqrt(4 - (x - 3) ** 2)));
  }
  {
    const fig = dessin(20, "droites", "schema");
    const d = [1, 2, -4];
    const [A, B] = [[3, 3], [7, 1]];
    const H = projDroite(A, d);
    const Ap = [2 * H[0] - A[0], 2 * H[1] - A[1]];
    const n = [1, -3];
    const ab = parNormal(Ap, n);
    const I = interDroites(d, ab);
    vrai(20, `H = (${H}), A′ = (${Ap}), (A′B) : (${ab}), I = (${I})`, memePoint(H, [2, 1]) && memePoint(Ap, [1, -1]) && sur(B, ab) && dot(n, vec(Ap, B)) === 0 && memeDroite(ab, [1, -3, -4]) && memePoint(I, [4, 0]));
    const nn = [1, 2];
    const c1 = dot(vec(I, A), nn) / (norme(vec(I, A)) * norme(nn));
    const c2 = dot(vec(I, B), nn) / (norme(vec(I, B)) * norme(nn));
    vrai(20, `cosinus égaux : ${c1.toFixed(6)} = ${c2.toFixed(6)} = √2/2 ; IA·IB = ${dot(vec(I, A), vec(I, B))}`, proche(c1, c2) && proche(c1, sqrt(2) / 2) && dot(vec(I, A), vec(I, B)) === 0);
    vrai(20, "A et B du même côté du miroir", (A[0] + 2 * A[1] - 4) * (B[0] + 2 * B[1] - 4) > 0);
    dit(20, "$t = -1$ et $H(2\\,;\\,1)$");
    dit(20, "soit $A'(1\\,;\\,-1)$");
    dit(20, "soit $x - 3y - 4 = 0$");
    dit(20, "$y = 0$ et $I(4\\,;\\,0)$");
    dit(20, "Les deux angles valent $45°$");
    vrai(20, "le dessin : miroir, rayons A → I → B, trait A′I, segment [AA′], les cinq points", memeDroite(fig.lignes[0], d) && fleche(fig, A, I) && fleche(fig, I, B) && fleche(fig, Ap, I) && fleche(fig, A, Ap) && ["A", "B", "H", "A′", "I"].every((l, i) => memePoint(pt(fig, l), [A, B, H, Ap, I][i])));
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

console.log(`\nGéométrie repérée (1re spé) — ${FICHIER}`);
const r = passe(source, true);

const CASSES = [
  ["ex. 5 : H déplacé sur le dessin", '{ x: 5, y: 3, label: "H" }', '{ x: 5, y: 2, label: "H" }'],
  ["ex. 12 : rayon du cercle dessiné faux", "...cercle(2, 1, 3)]", "...cercle(2, 1, 2.5)]"],
  ["ex. 17 : discriminant faux", "= 784 + 240 = 1024", "= 784 + 240 = 1044"],
  ["ex. 18 : médiatrice de [BC] fausse sur le dessin", "{ a: 1, b: -5, c: 3, couleur: VERT }", "{ a: 1, b: -5, c: 4, couleur: VERT }"],
  ["une vraie fin de ligne dans une chaîne", 'titre: "Un seul geste",', 'titre: "Un seul\ngeste",'],
  ["ex. 1 : le dessin retiré", "schema: ecranSeulement(droites([-3, 5], [{ a: 2, b: -3, c: 5 }]", "autre: ecranSeulement(droites([-3, 5], [{ a: 2, b: -3, c: 5 }]"],
  ["un $ dans une étiquette de point", 'label: "K" }', 'label: "$K$" }'],
  ["ex. 20 : I glissé sous l'axe, son étiquette sur la graduation 5", '{ x: 4, y: 0, label: "I" }', '{ x: 4.6, y: -1, label: "I" }'],
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
