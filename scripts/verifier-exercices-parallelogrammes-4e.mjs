// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Le parallélogramme :
// propriétés, rectangle, losange, carré » de 4e
// (lib/fiches-exercices/maths-4e-parallelogrammes.tsx).
//
// ⭐ DEUX CHEMINS POUR CHAQUE VALEUR : le corrigé TROUVE une longueur, un angle,
// une aire ; ici on la refait autrement (balayage pour les équations, aire par la
// formule du lacet sur les coordonnées, conversions pied → mètre refaites, loi du
// parallélogramme AC² + BD² = 2(AB² + BC²) pour la cohérence des données), puis
// on la MESURE sur la figure DESSINÉE.
//
// ⭐ LES DESSINS : chaque `quad(…)` est relu dans le source et ÉVALUÉ comme un
// objet JavaScript (il est écrit en clair). On vérifie : la NATURE de la figure
// dessinée (parallélogramme par les milieux des diagonales, rectangle, losange,
// carré), qu'elle est non croisée, les angles étiquetés (à 0,5° près), les angles
// droits, les côtés codés égaux, les côtés codés parallèles, les moitiés de
// diagonales codées égales, la perpendicularité des diagonales marquée, les
// longueurs étiquetées (côtés, moitiés, hauteurs) à la MÊME échelle (1 %), et que
// chaque étiquette tient dans le cadre de 260 × 200 (largeur estimée à 0,62 × la
// police par caractère).
//
//   node scripts/verifier-exercices-parallelogrammes-4e.mjs

import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

const deg = (r) => (r * 180) / Math.PI;
const long = (P, Q) => Math.hypot(Q[0] - P[0], Q[1] - P[1]);
const angle = (S, P, Q) => deg(Math.acos(((P[0] - S[0]) * (Q[0] - S[0]) + (P[1] - S[1]) * (Q[1] - S[1])) / (long(S, P) * long(S, Q))));
const milieu = (P, Q) => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
const croix = (u, v) => u[0] * v[1] - u[1] * v[0];
const vec = (P, Q) => [Q[0] - P[0], Q[1] - P[1]];
const VOISINS = { A: ["D", "B"], B: ["A", "C"], C: ["B", "D"], D: ["C", "A"] };
const SOMMETS = ["A", "B", "C", "D"];
const COTES = ["AB", "BC", "CD", "DA"];
/** Une longueur écrite « 5,5 cm », « 27,43 m » ; NaN pour « 2x + 1 ». */
const mesure = (t) => {
  const m = /^(\d+(?:,\d+)?) (cm|m)$/.exec(String(t));
  return m ? Number(m[1].replace(",", ".")) : NaN;
};
const num = (t) => Number(String(t).match(/\d+(?:,\d+)?/)[0].replace(",", "."));
const pres = (a, b, e = 1e-9) => Math.abs(a - b) < e;

/* ── Les dessins relus ─────────────────────────────────────────────────── */

function appel(texte, debut) {
  let prof = 0;
  let chaine = null;
  for (let i = debut; i < texte.length; i++) {
    const ch = texte[i];
    if (chaine) {
      if (ch === "\\") i++;
      else if (ch === chaine) chaine = null;
      continue;
    }
    if (ch === '"' || ch === "'") chaine = ch;
    else if ("([{".includes(ch)) prof++;
    else if (")]}".includes(ch)) {
      prof--;
      if (prof === 0) return texte.slice(debut + 1, i);
    }
  }
  throw new Error("appel non fermé");
}

/** Les `quad(…)` d'un bloc : { P, opts }. */
function quads(bloc) {
  return [...(bloc ?? "").matchAll(/\bquad\(/g)].map((m) => {
    const brut = appel(bloc, m.index + 4);
    const [P, opts = {}] = Function(`"use strict"; return [${brut}];`)();
    return { P, opts };
  });
}

/** Croisement des droites (AC) et (BD), par Cramer. */
function centre(P) {
  const r = vec(P.A, P.C), s = vec(P.B, P.D);
  const t = croix(vec(P.A, P.B), s) / croix(r, s);
  return [P.A[0] + t * r[0], P.A[1] + t * r[1]];
}

/** La nature, lue sur les coordonnées. */
function nature(P) {
  const d1 = long(P.A, P.C), d2 = long(P.B, P.D);
  const para = long(milieu(P.A, P.C), milieu(P.B, P.D)) < 1e-3 * Math.max(d1, d2);
  const memeLongueur = Math.abs(d1 / d2 - 1) < 2e-3;
  const perp = Math.abs((vec(P.A, P.C)[0] * vec(P.B, P.D)[0] + vec(P.A, P.C)[1] * vec(P.B, P.D)[1]) / (d1 * d2)) < 2e-3;
  const rectangle = para && memeLongueur, losange = para && perp;
  return { para, rectangle, losange, carre: rectangle && losange, perp };
}
const convexe = (P) => {
  const signes = SOMMETS.map((k, i) => {
    const a = P[k], b = P[SOMMETS[(i + 1) % 4]], c = P[SOMMETS[(i + 2) % 4]];
    return Math.sign(croix(vec(a, b), vec(b, c)));
  });
  return signes.every((x) => x === signes[0] && x !== 0);
};
/** Distance de V à la droite (pq). */
const distDroite = (V, p, q) => Math.abs(croix(vec(p, q), vec(p, V))) / long(p, q);
const aireLacet = (pts) => Math.abs(pts.reduce((s, p, i) => s + croix(p, pts[(i + 1) % pts.length]), 0)) / 2;

/* ── La mise en page, refaite (celle de `quad()`) ──────────────────────── */

const W = 260, H = 200, MARGE = 36;
const unit = (x, y) => {
  const n = Math.hypot(x, y) || 1;
  return [x / n, y / n];
};
const ancre = (dx) => (dx > 0.45 ? "start" : dx < -0.45 ? "end" : "middle");
function piedDe(v, p, q) {
  const d = vec(p, q);
  const t = ((v[0] - p[0]) * d[0] + (v[1] - p[1]) * d[1]) / (d[0] * d[0] + d[1] * d[1]);
  return { F: [p[0] + t * d[0], p[1] + t * d[1]], t };
}
function miseEnPage({ P: pts, opts }) {
  const hs = (opts.hauteurs ?? []).map((h) => ({ ...h, ...piedDe(pts[h.de], pts[h.sur[0]], pts[h.sur[1]]) }));
  const reels = [...SOMMETS.map((k) => pts[k]), ...(opts.cadre ?? []), ...(opts.points ?? []).map((p) => p.en), ...hs.map((h) => h.F)];
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * (opts.marge ?? MARGE)) / (x1 - x0 || 1), (H - 2 * MARGE) / (y1 - y0 || 1));
  const ox = (W - (x1 - x0) * s) / 2, oy = (H - (y1 - y0) * s) / 2;
  const px = (p) => [ox + (p[0] - x0) * s, H - oy - (p[1] - y0) * s];
  const Q = Object.fromEntries(SOMMETS.map((k) => [k, px(pts[k])]));
  const G = [SOMMETS.reduce((a, k) => a + Q[k][0], 0) / 4, SOMMETS.reduce((a, k) => a + Q[k][1], 0) / 4];
  const O = centre(Q);
  const textes = [];
  const t = (x, y, texte, taille, a) => textes.push({ x, y, texte, taille, a });
  for (const k of SOMMETS) {
    const d = unit(Q[k][0] - G[0], Q[k][1] - G[1]);
    t(Q[k][0] + d[0] * 15, Q[k][1] + d[1] * 15, opts.noms?.[k] ?? k, 15, ancre(d[0]));
  }
  for (const c of COTES) {
    const lab = opts.cotes?.[c];
    if (!lab) continue;
    const [p, q] = [Q[c[0]], Q[c[1]]];
    const M = milieu(p, q);
    let n = unit(-(q[1] - p[1]), q[0] - p[0]);
    if (n[0] * (M[0] - G[0]) + n[1] * (M[1] - G[1]) < 0) n = [-n[0], -n[1]];
    t(M[0] + n[0] * 14, M[1] + n[1] * 14, lab, 14, ancre(n[0]));
  }
  for (const [k, lab] of Object.entries(opts.angles ?? {})) {
    const V = Q[k];
    const [p, q] = VOISINS[k].map((v) => Q[v]);
    const u1 = unit(p[0] - V[0], p[1] - V[1]), u2 = unit(q[0] - V[0], q[1] - V[1]);
    const ouvert = deg(Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1]))));
    const bi = unit(u1[0] + u2[0], u1[1] + u2[1]);
    const loin = 17 + (ouvert < 35 ? 26 : ouvert < 60 ? 19 : 15);
    t(V[0] + bi[0] * loin, V[1] + bi[1] * loin, lab, 14, "middle");
  }
  for (const [dm, lab] of Object.entries(opts.demi ?? {})) {
    const k = dm[1];
    const V = Q[k];
    const M = milieu(O, V);
    const u = unit(V[0] - O[0], V[1] - O[1]);
    let n = [-u[1], u[0]];
    const [p, q] = VOISINS[k].map((v) => unit(Q[v][0] - O[0], Q[v][1] - O[1]));
    const w = p[0] * u[0] + p[1] * u[1] <= q[0] * u[0] + q[1] * u[1] ? p : q;
    if (n[0] * w[0] + n[1] * w[1] < 0) n = [-n[0], -n[1]];
    t(M[0] + n[0] * 11, M[1] + n[1] * 11, lab, 13, ancre(n[0]));
  }
  for (const h of hs) {
    if (!h.label) continue;
    const V = Q[h.de], F = px(h.F), M = milieu(V, F);
    const [p, q] = [Q[h.sur[0]], Q[h.sur[1]]];
    const u = unit(q[0] - p[0], q[1] - p[1]);
    const sg = (G[0] - M[0]) * u[0] + (G[1] - M[1]) * u[1] >= 0 ? 1 : -1;
    t(M[0] + u[0] * sg * 8, M[1] + u[1] * sg * 8, h.label, 13, ancre(u[0] * sg));
  }
  for (const p of opts.points ?? []) {
    const [x, y] = px(p.en);
    const [dx, dy, a] = p.vers === "haut" ? [0, -14, "middle"] : p.vers === "gauche" ? [-10, 0, "end"] : p.vers === "droite" ? [10, 0, "start"] : p.vers === "basdroite" ? [9, 11, "start"] : [0, 15, "middle"];
    t(x + dx, y + dy, p.nom, 14, a);
  }
  if (opts.centre) t(O[0] + 9, O[1] - 9, opts.centre, 14, "start");
  return { textes, s };
}
function horsCadre(q) {
  return miseEnPage(q).textes.filter(({ x, y, texte, taille, a }) => {
    const l = texte.length * taille * 0.62;
    const [g, d] = a === "start" ? [x, x + l] : a === "end" ? [x - l, x] : [x - l / 2, x + l / 2];
    return g < 1 || d > W - 1 || y - taille / 2 < 1 || y + taille / 2 > H - 1;
  });
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const e = (k) => f.enonces[k - 1] ?? "";
  const b = (k) => f.blocs[k - 1] ?? "";
  const dit = (k, phrase) => v.ok(`${k}. « ${phrase} »`, c(k).includes(phrase), "absent du corrigé");
  let dessines = 0;

  /** Les figures de l'exercice k sont fidèles à leurs étiquettes et codages. */
  const fidele = (k, attendus = 1) => {
    const qs = quads(b(k));
    v.ok(`${k}. ${attendus} figure(s) dessinée(s)`, qs.length === attendus, `${qs.length} lue(s)`);
    if (qs.length) dessines++;
    for (const q of qs) {
      const { P, opts } = q;
      const O = centre(P);
      v.ok(`${k}. quadrilatère non croisé`, convexe(P));
      for (const [s, t] of Object.entries(opts.angles ?? {})) {
        const m = angle(P[s], P[VOISINS[s][0]], P[VOISINS[s][1]]);
        v.ok(`${k}. l'angle ${t} en ${s} est celui du dessin (${m.toFixed(2)}°)`, Math.abs(m - num(t)) < 0.5, m.toFixed(2));
      }
      for (const s of opts.trouve ?? []) {
        const n = opts.angles?.[s] ? String(num(opts.angles[s])) : "?";
        v.ok(`${k}. l'angle trouvé ${n}° est écrit dans le corrigé`, c(k).includes(`${n}°`), n);
      }
      for (const s of opts.droits ?? []) {
        const m = angle(P[s], P[VOISINS[s][0]], P[VOISINS[s][1]]);
        v.ok(`${k}. angle droit en ${s}`, Math.abs(m - 90) < 0.3, m.toFixed(2));
      }
      for (const groupe of opts.egaux ?? []) {
        const L = groupe.map((cote) => long(P[cote[0]], P[cote[1]]));
        v.ok(`${k}. côtés codés égaux ${groupe.join(" = ")}`, L.every((x) => Math.abs(x / L[0] - 1) < 0.01), L.map((x) => x.toFixed(3)).join(" / "));
      }
      for (const groupe of opts.paralleles ?? []) {
        const u = groupe.map((cote) => unit(...vec(P[cote[0]], P[cote[1]])));
        v.ok(`${k}. côtés codés parallèles ${groupe.join(" // ")}`, u.every((x) => Math.abs(croix(x, u[0])) < 3e-3));
      }
      // Les côtés NON codés parallèles ne le sont pas (le trapèze, le cerf-volant…),
      // sauf si la figure est un parallélogramme (le codage peut alors être partiel).
      if ((opts.paralleles ?? []).length === 1 && !nature(P).para) {
        const autres = COTES.filter((x) => !opts.paralleles[0].includes(x));
        const [u1, u2] = autres.map((cote) => unit(...vec(P[cote[0]], P[cote[1]])));
        v.ok(`${k}. les côtés ${autres.join(" et ")}, non codés, ne sont pas parallèles`, Math.abs(croix(u1, u2)) > 0.05);
      }
      for (const groupe of opts.moities ?? []) {
        const L = groupe.map((dm) => long(O, P[dm[1]]));
        v.ok(`${k}. moitiés codées égales ${groupe.join(" = ")}`, L.every((x) => Math.abs(x / L[0] - 1) < 0.01), L.map((x) => x.toFixed(3)).join(" / "));
      }
      if (opts.diagDroit) v.ok(`${k}. diagonales perpendiculaires, comme marqué`, nature(P).perp);
      // Toutes les longueurs étiquetées, à la même échelle.
      const lus = [
        ...Object.entries(opts.cotes ?? {}).map(([cote, t]) => [cote, t, long(P[cote[0]], P[cote[1]])]),
        ...Object.entries(opts.demi ?? {}).map(([dm, t]) => [dm, t, long(O, P[dm[1]])]),
        ...(opts.hauteurs ?? []).map((h) => [`h(${h.de})`, h.label ?? "", distDroite(P[h.de], P[h.sur[0]], P[h.sur[1]])]),
      ].filter(([, t]) => !Number.isNaN(mesure(t)));
      if (lus.length >= 2) {
        const r = lus.map(([, t, L]) => L / mesure(t));
        v.ok(`${k}. ${lus.map((x) => x[0]).join(", ")} à la même échelle`, r.every((x) => Math.abs(x / r[0] - 1) < 0.01), r.map((x) => x.toFixed(4)).join(" / "));
      } else if (lus.length === 1) {
        v.ok(`${k}. une longueur étiquetée (échelle libre)`, true);
      }
      for (const cote of opts.trouveCotes ?? []) {
        const [n, u] = opts.cotes[cote].split(" ");
        dit(k, `= ${n.replace(",", "{,}")}$ ${u}`);
      }
      for (const dm of opts.trouveDemi ?? []) {
        const t = opts.demi[dm];
        v.ok(`${k}. la moitié trouvée ${t} est écrite dans le corrigé`, c(k).includes(`${t.replace(/ (cm|m)$/, "").replace(",", "{,}")}$ ${t.split(" ")[1]}`), t);
      }
      const hors = horsCadre(q);
      v.ok(`${k}. les étiquettes tiennent dans le cadre`, hors.length === 0, hors.map((h) => h.texte).join(", "));
    }
    return qs;
  };

  /* ── ★ Un seul geste ── */
  v.titre("★ Un seul geste");
  const [q1a, q1b] = fidele(1, 2);
  v.ok("1. KLMN dessiné est un parallélogramme, PQRS non", !!q1a && nature(q1a.P).para && !nature(q1b.P).para);
  dit(1, "Réponse : a) oui ; b) non, c'est un trapèze.");

  const [q2] = fidele(2);
  v.ok("2. EFGH dessiné est un parallélogramme", !!q2 && nature(q2.P).para);
  const per2 = 9 + 4.5 + 9 + 4.5;
  v.ok(`2. périmètre recalculé côté par côté : ${per2}`, per2 === 27);
  dit(2, "= 2 \\times 13{,}5 = 27$");
  dit(2, "le périmètre vaut $27$ cm");

  const [q3] = fidele(3);
  v.ok("3. RSTU dessiné est un parallélogramme", !!q3 && nature(q3.P).para);
  dit(3, `\\widehat{S} = 180° - 118° = ${180 - 118}°$`);
  dit(3, "$118 + 62 + 118 + 62 = 360$");
  dit(3, "Réponse : $\\widehat{S} = \\widehat{U} = 62°$ et $\\widehat{T} = 118°$.");

  const [q4] = fidele(4);
  v.ok("4. parallélogramme dessiné, AC = 11 et BD = 7 à l'échelle", !!q4 && nature(q4.P).para && pres(long(q4.P.A, q4.P.C) / long(q4.P.B, q4.P.D), 11 / 7, 1e-3));
  dit(4, `$OA = OC = 11 \\div 2 = ${String(11 / 2).replace(".", "{,}")}$ cm`);
  dit(4, `$OB = OD = 7 \\div 2 = ${String(7 / 2).replace(".", "{,}")}$ cm`);

  const [q5] = fidele(5);
  v.ok("5. hauteur mesurée 5, côté oblique 6, base 10", !!q5 && pres(distDroite(q5.P.D, q5.P.A, q5.P.B), 5, 1e-6) && pres(long(q5.P.A, q5.P.D), 6, 1e-3));
  v.ok("5. l'aire par le lacet sur le dessin vaut 50", !!q5 && pres(aireLacet(SOMMETS.map((s) => q5.P[s])), 50, 1e-6));
  dit(5, "Aire $= 10 \\times 5 = 50$ cm².");
  dit(5, "$10 \\times 6 = 60$ cm²");

  const q6 = fidele(6, 3);
  const n6 = q6.map((q) => nature(q.P));
  v.ok("6. dessinés : un rectangle (pas losange), un losange (pas rectangle), un carré", n6.length === 3 && n6[0].rectangle && !n6[0].losange && n6[1].losange && !n6[1].rectangle && n6[2].carre);
  dit(6, "Réponse : a) rectangle ; b) losange ; c) carré.");

  const [q7] = fidele(7);
  v.ok("7. MNPQ dessiné n'est pas un parallélogramme, I milieu de [MP] seulement", !!q7 && !nature(q7.P).para && pres(long(centre(q7.P), q7.P.A), long(centre(q7.P), q7.P.C), 1e-3));
  v.ok("7. IN ≠ IQ", 3 !== 3.5);
  dit(7, "Réponse : non, $MNPQ$ n'est pas un parallélogramme.");

  const [q8a, q8b] = fidele(8, 2);
  v.ok("8. ABCD dessiné : parallélogramme ; EFGH (côtés égaux consécutifs) : non", !!q8b && nature(q8a.P).para && !nature(q8b.P).para);
  v.ok("8. EFGH : EF = FG = 5 et GH = HE = 3 sur le dessin", !!q8b && [["A", "B", 5], ["B", "C", 5], ["C", "D", 3], ["D", "A", 3]].every(([p, q, L]) => pres(long(q8b.P[p], q8b.P[q]), L, 2e-3)));
  dit(8, "Réponse : a) oui ; b) non.");

  /* ── ★★ Type devoir ── */
  v.titre("★★ Type devoir");
  const x9 = [...Array(181).keys()].filter((x) => 3 * x + 2 * x === 180);
  v.ok(`9. x trouvé par balayage : ${x9}`, x9.length === 1 && x9[0] === 36);
  dit(9, `$x = 180 \\div 5 = ${x9[0]}$`);
  dit(9, `$\\widehat{A} = 3 \\times 36 = ${3 * x9[0]}°$`);
  dit(9, `$\\widehat{B} = 2 \\times 36 = ${2 * x9[0]}°$`);
  const [q9] = fidele(9);
  v.ok("9. parallélogramme dessiné", !!q9 && nature(q9.P).para);

  v.ok("10. données cohérentes : AC² + BD² = 2(AB² + BC²)", 14 ** 2 + 8 ** 2 === 2 * (9 ** 2 + 7 ** 2));
  const [q10] = fidele(10);
  v.ok("10. le dessin a AB = 9, BC = 7, AC = 14, BD = 8", !!q10 && [["A", "B", 9], ["B", "C", 7], ["A", "C", 14], ["B", "D", 8]].every(([p, q, L]) => pres(long(q10.P[p], q10.P[q]), L, 2e-3)));
  dit(10, `$OA + OB + AB = 7 + 4 + 9 = ${7 + 4 + 9}$ cm`);
  dit(10, `$OB + OC + BC = 4 + 7 + 7 = ${4 + 7 + 7}$ cm`);

  const [q11] = fidele(11);
  v.ok("11. EFGH dessiné est un rectangle, pas un carré", !!q11 && nature(q11.P).rectangle && !nature(q11.P).carre);
  dit(11, "Donc $EFGH$ est un rectangle");

  const q12 = fidele(12, 2);
  v.ok("12. les deux figures sont la même", q12.length === 2 && JSON.stringify(q12[0].P) === JSON.stringify(q12[1].P));
  const aire12 = q12[0] ? aireLacet(SOMMETS.map((s) => q12[0].P[s])) : NaN;
  v.ok(`12. aire par le lacet : ${aire12}`, pres(aire12, 40, 1e-9));
  const h12 = q12[1] ? distDroite(q12[1].P.B, q12[1].P.D, q12[1].P.A) : NaN;
  v.ok(`12. hauteur issue de B mesurée : ${h12}`, pres(h12, 8, 1e-9) && pres(aire12 / 5, 8, 1e-9));
  v.ok("12. son pied tombe hors de [AD]", !!q12[1] && piedDe(q12[1].P.B, q12[1].P.A, q12[1].P.D).t > 1);
  dit(12, "aire $= 10 \\times 4 = 40$ cm²");
  dit(12, "$h = 40 \\div 5 = 8$ cm");

  const q13 = fidele(13, 2);
  v.ok("13. KLMN dessiné est un losange (pas un carré)", !!q13[0] && nature(q13[0].P).losange && !nature(q13[0].P).carre);
  const aire13 = q13[0] ? aireLacet(SOMMETS.map((s) => q13[0].P[s])) : NaN;
  v.ok(`13. aire par le lacet : ${aire13}, hauteur ${aire13 / 5}`, pres(aire13, 24, 1e-9) && pres(aire13 / 5, 4.8, 1e-9));
  dit(13, "$4 \\times 6 = 24$ cm²");
  dit(13, "$h = 24 \\div 5 = 4{,}8$ cm");
  dit(13, "$8 \\times 6 = 48$ cm²");

  const [q14] = fidele(14);
  v.ok("14. ABCD dessiné est un parallélogramme, BC = 5", !!q14 && nature(q14.P).para && pres(long(q14.P.B, q14.P.C), 5, 1e-9));
  dit(14, "$AD = BC = 5$ cm");

  const x15 = [...Array(100).keys()].filter((x) => 2 * x + 1 === 3 * x - 4);
  v.ok(`15. x par balayage : ${x15}`, x15.length === 1 && x15[0] === 5);
  const [AB15, BC15] = [2 * x15[0] + 1, x15[0] + 2];
  dit(15, `$2 \\times (11 + 7) = 2 \\times 18 = ${2 * (AB15 + BC15)}$ cm`);
  const [q15] = fidele(15);
  v.ok("15. dessin : AB/BC = 11/7, parallélogramme", !!q15 && nature(q15.P).para && pres(long(q15.P.A, q15.P.B) / long(q15.P.B, q15.P.C), AB15 / BC15, 1e-3));

  const q16 = fidele(16, 2);
  const [n16a, n16b] = q16.map((q) => nature(q.P));
  v.ok("16. b) contre-exemple : un losange aux diagonales inégales (7 et 4)", !!n16a && n16a.losange && !n16a.rectangle && pres(long(q16[0].P.A, q16[0].P.C), 7, 1e-9) && pres(long(q16[0].P.B, q16[0].P.D), 4, 1e-9));
  v.ok("16. c) contre-exemple : diagonales perpendiculaires, pas un parallélogramme", !!n16b && n16b.perp && !n16b.para);
  dit(16, "Réponse : a) vrai ; b) faux ; c) faux ; d) vrai.");

  /* ── ★★★ Problèmes ── */
  v.titre("★★★ Problèmes");
  const q17 = fidele(17, 2);
  for (const [i, a] of [[0, 65], [1, 50]]) {
    const q = q17[i];
    v.ok(`17. position ${a}° : parallélogramme, AB = 32, AD = 10, AD vertical, BC vertical`, !!q && nature(q.P).para && pres(long(q.P.A, q.P.B), 32, 2e-3) && pres(long(q.P.A, q.P.D), 10, 1e-9) && pres(q.P.A[0], q.P.D[0]) && pres(q.P.B[0], q.P.C[0]));
    v.ok(`17. angle DAB mesuré ${a}°`, !!q && Math.abs(angle(q.P.A, q.P.D, q.P.B) - a) < 0.01);
  }
  dit(17, `\\widehat{ABC} = 180° - 65° = ${180 - 65}°$`);
  dit(17, `$50°$ et $${180 - 50}°$`);

  const aire18 = 2.9 * 5.2;
  v.ok(`18. aire ${aire18.toFixed(2)}`, pres(aire18, 15.08, 1e-9));
  const l18 = aire18 / 6;
  v.ok(`18. largeur ${l18.toFixed(4)} ≈ 2,51 > 2,5`, l18.toFixed(2) === "2.51" && l18 > 2.5);
  v.ok("18. données cohérentes : 3² + 5,2² ≈ 6² (avancée de la ligne)", Math.abs(Math.hypot(3, 5.2) - 6) < 0.01);
  let n18 = 0;
  while ((n18 + 1) * 2.9 + 3 <= 60) n18++;
  v.ok(`18. places par ajout une à une : ${n18}`, n18 === 19 && Math.floor(60 / 2.9) === 20);
  dit(18, "Aire $= 2{,}9 \\times 5{,}2 = 15{,}08$ m².");
  dit(18, "$\\ell = 15{,}08 \\div 6 \\approx 2{,}51$ m");
  dit(18, `au plus $${n18}$ places`);
  const [q18] = fidele(18);
  v.ok("18. dessin : parallélogramme, aire par le lacet ≈ 15,08", !!q18 && nature(q18.P).para && Math.abs(aireLacet(SOMMETS.map((s) => q18.P[s])) - 15.08) < 1e-9);

  const pied = 0.3048;
  const [cote19, diag19, lanceur19] = [90 * pied, (127 + (3 + 3 / 8) / 12) * pied, 60.5 * pied];
  v.ok(`19. conversions : ${cote19.toFixed(2)} m, ${diag19.toFixed(2)} m, ${lanceur19.toFixed(2)} m`, cote19.toFixed(2) === "27.43" && diag19.toFixed(2) === "38.80" && lanceur19.toFixed(2) === "18.44");
  const [q19] = fidele(19);
  v.ok("19. le dessin est un carré", !!q19 && nature(q19.P).carre);
  v.ok("19. L dessiné sur [AC] à 18,44 de A", !!q19 && pres(distDroite(q19.opts.points[0].en, q19.P.A, q19.P.C), 0) && pres(long(q19.P.A, q19.opts.points[0].en), 18.44, 1e-9));
  const ecart19 = 38.8 / 2 - 18.44;
  v.ok(`19. écart au centre : ${ecart19.toFixed(2)}`, ecart19.toFixed(2) === "0.96");
  dit(19, "$AO = 38{,}80 \\div 2 = 19{,}40$ m");
  dit(19, "$19{,}40 - 18{,}44 = 0{,}96$ m");

  const [q20] = fidele(20);
  v.ok("20. le losange dessiné : losange, pas carré", !!q20 && nature(q20.P).losange && !nature(q20.P).carre);
  const KM = q20 ? long(q20.P.A, q20.P.C) : NaN, LN = q20 ? long(q20.P.B, q20.P.D) : NaN;
  v.ok(`20. diagonales mesurées : ${KM.toFixed(3)} et ${LN.toFixed(3)}`, pres(KM, 1.66, 1e-9) && pres(LN, 1.06, 1e-9));
  const cadre20 = q20?.opts.cadre ?? [];
  v.ok("20. le cadre est le drapeau 2 × 1,4, sommets à 0,17 du bord", cadre20.length === 4 && pres(aireLacet(cadre20), 2.8, 1e-9) && pres(q20.P.A[0], 0.17) && pres(1.4 - q20.P.D[1], 0.17, 1e-9));
  const aire20 = q20 ? aireLacet(SOMMETS.map((s) => q20.P[s])) : NaN;
  v.ok(`20. aire par le lacet : ${aire20.toFixed(4)}, soit ${(100 * aire20 / 2.8).toFixed(1)} %`, pres(aire20, 0.8798, 1e-9) && Math.round((100 * aire20) / 2.8) === 31 && Math.round((100 * 2 * aire20) / 2.8) === 63);
  dit(20, "$KM = 2 - 0{,}17 - 0{,}17 = 1{,}66$ m");
  dit(20, "$LN = 1{,}4 - 0{,}17 - 0{,}17 = 1{,}06$ m");
  dit(20, "= 0{,}8798$ m²");
  dit(20, "environ $31$ %");

  // Les énoncés portent bien les données relues.
  v.ok("énoncés : 118°, 11 et 7, 3x et 2x, 2x + 1 et 3x - 4", e(3).includes("118°") && e(4).includes("$AC = 11$") && e(9).includes("$3x$") && e(15).includes("$CD = 3x - 4$"));

  v.titre("Les schémas");
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20, String(dessines));
}

lancer({
  nom: "LE PARALLÉLOGRAMME · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-parallelogrammes.tsx",
  notionId: "quadrilatere_parallelogramme",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : le trapèze devient un parallélogramme", "C: [4.5, 3], D: [1, 3]", "C: [7, 3], D: [1, 3]"],
    ["ex. 2 : le demi-périmètre en réponse", "le périmètre vaut $27$ cm", "le périmètre vaut $13{,}5$ cm"],
    ["ex. 3 : un angle faux sur le dessin", "C: \"118°\", D: \"62°\" }, trouve: [\"B\", \"C\", \"D\"]", "C: \"62°\", D: \"62°\" }, trouve: [\"B\", \"C\", \"D\"]"],
    ["ex. 4 : la diagonale entière au lieu de la moitié", "$OA = OC = 11 \\\\div 2 = 5{,}5$ cm", "$OA = OC = 11$ cm"],
    ["ex. 5 : le côté oblique pris pour la hauteur", "Aire $= 10 \\\\times 5 = 50$ cm².", "Aire $= 10 \\\\times 6 = 60$ cm²."],
    ["ex. 5 : hauteur pas à l'échelle", "C: [13.317, 5], D: [3.317, 5]", "C: [13.317, 6], D: [3.317, 6]"],
    ["ex. 6 : le losange dessiné n'en est plus un", "C: [6, 3.464], D: [2, 3.464]", "C: [7, 3.464], D: [3, 3.464]"],
    ["ex. 7 : un seul milieu suffirait", "Réponse : non, $MNPQ$", "Réponse : oui, $MNPQ$"],
    ["ex. 8 : le cerf-volant codé comme un parallélogramme", "egaux: [[\"AB\", \"BC\"], [\"CD\", \"DA\"]]", "egaux: [[\"AB\", \"CD\"], [\"BC\", \"DA\"]]"],
    ["ex. 9 : 3x + 2x = 360", "$x = 180 \\\\div 5 = 36$", "$x = 360 \\\\div 5 = 72$"],
    ["ex. 10 : périmètre faux", "$OA + OB + AB = 7 + 4 + 9 = 20$ cm", "$OA + OB + AB = 14 + 4 + 9 = 27$ cm"],
    ["ex. 11 : le rectangle dessiné de travers", "B: [3.214, -3.83], C: [5, 0], D: [-3.214, 3.83]", "B: [3.214, -3.83], C: [5, 0], D: [-3.214, 3.2]"],
    ["ex. 12 : la hauteur associée à la mauvaise base", "$h = 40 \\\\div 5 = 8$ cm", "$h = 40 \\\\div 10 = 4$ cm"],
    ["ex. 13 : les diagonales multipliées sans diviser", "$4 \\\\times 6 = 24$ cm²", "$8 \\\\times 6 = 48$ cm² (aire)"],
    ["ex. 14 : D mal construit", "C: [8, 2], D: [3, 4] }, { cotes: { BC", "C: [8, 2], D: [3, 5] }, { cotes: { BC"],
    ["ex. 15 : côtés consécutifs égalés", "$2 \\\\times (11 + 7) = 2 \\\\times 18 = 36$ cm", "$2 \\\\times (11 + 3) = 2 \\\\times 14 = 28$ cm"],
    ["ex. 16 : le cerf-volant devient un losange", "A: [-2, 0], B: [0, -2.5], C: [5, 0]", "A: [-5, 0], B: [0, -2.5], C: [5, 0]"],
    ["ex. 17 : angle consécutif faux", "\\\\widehat{ABC} = 180° - 65° = 115°$", "\\\\widehat{ABC} = 180° - 65° = 125°$"],
    ["ex. 17 : le bras levé dessiné penché", "C: [24.513, 30.569]", "C: [25.5, 30.569]"],
    ["ex. 18 : 20 places, la dernière déborde", "au plus $19$ places", "au plus $20$ places"],
    ["ex. 19 : le centre mal placé", "$19{,}40 - 18{,}44 = 0{,}96$ m", "$19{,}40 - 18{,}44 = 1{,}04$ m"],
    ["ex. 19 : le lanceur hors de la diagonale", "en: [0, 18.44]", "en: [1, 18.44]"],
    ["ex. 20 : le losange trop grand dans le drapeau", "A: [0.17, 0.7], B: [1, 0.17], C: [1.83, 0.7], D: [1, 1.23]", "A: [0.1, 0.7], B: [1, 0.17], C: [1.9, 0.7], D: [1, 1.23]"],
    ["ex. 20 : l'étiquette qui sort du cadre", "demi: { OC: \"0,83 m\"", "demi: { OC: \"0,83 m (demi-diagonale KM)\""],
    ["une micro d'une autre notion", "micros: [\"quadrilatere_parallelogramme_propriete\"],\n        },\n        {\n          enonce:\n            \"Vrai ou faux", "micros: [\"pythagore_reconnaitre\"],\n        },\n        {\n          enonce:\n            \"Vrai ou faux"],
    ["un $ dans un canvas", "label: \"5,2 m\"", "label: \"$5{,}2$ m\""],
  ],
});
