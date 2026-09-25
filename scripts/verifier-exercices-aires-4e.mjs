// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Les aires : rectangle,
// triangle, parallélogramme et figures composées » de 4e
// (lib/fiches-exercices/maths-4e-aires.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé ANNONCE « 11 × 4 ÷ 2 = 22 cm² » ; ici chaque
// aire est aussi refaite par la FORMULE DU LACET sur les coordonnées que la
// figure DESSINE. Les carreaux de l'exercice 1 sont COMPTÉS un par un (un
// carreau est dans la figure si son centre y est) ; le triangle quadrillé de
// l'exercice 12 est refait par la FORMULE DE PICK (points intérieurs comptés,
// points du bord par PGCD), sans aucun rectangle englobant.
//
// ⭐ LES DESSINS : chaque `plan("unité", [...])` est relu dans le source et
// évalué. Chaque cote chiffrée doit mesurer sur le dessin ce qu'elle annonce ;
// chaque hauteur doit partir d'un sommet et tomber PERPENDICULAIREMENT sur la
// droite d'un côté ; chaque angle droit marqué doit en être un ; sur un
// quadrillage, chaque sommet doit tomber sur un nœud ; et les surfaces ombrées
// (les trous en négatif) doivent valoir les aires du corrigé.
//
//   node scripts/verifier-exercices-aires-4e.mjs

import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/* ── Calcul ─────────────────────────────────────────────────────────────── */

/** Formule du lacet (aire géométrique, sans signe). */
const lacet = (pts) => {
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    s += x1 * y2 - x2 * y1;
  }
  return Math.abs(s) / 2;
};
/** Le point est-il strictement dans le polygone ? (lancer de rayon) */
const dedans = ([x, y], poly) => {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
};
/** Le point est-il sur le bord du polygone ? */
const surBord = ([x, y], poly) =>
  poly.some((P, i) => {
    const Q = poly[(i + 1) % poly.length];
    const croix = (Q[0] - P[0]) * (y - P[1]) - (Q[1] - P[1]) * (x - P[0]);
    const entre = Math.min(P[0], Q[0]) - 1e-9 <= x && x <= Math.max(P[0], Q[0]) + 1e-9 && Math.min(P[1], Q[1]) - 1e-9 <= y && y <= Math.max(P[1], Q[1]) + 1e-9;
    return Math.abs(croix) < 1e-9 && entre;
  });
const pgcd = (a, b) => (b === 0 ? Math.abs(a) : pgcd(b, a % b));

const arr = (x, n) => Math.round(x * 10 ** n) / 10 ** n;
const proche = (x, y, eps = 1e-9) => Math.abs(x - y) < eps;
/** Écrit comme dans la feuille : 1\,296, 12{,}25. */
function fr(x, d = null) {
  const s = d === null ? String(+x.toFixed(6)) : x.toFixed(d);
  const [e, f] = s.split(".");
  const groupe = e.replace("-", "").length >= 4 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : e;
  return f ? `${groupe}{,}${f}` : groupe;
}

/** Les carrés des conversions. */
const M2 = 100 * 100; // cm² dans 1 m²
const HA = 100 * 100; // m² dans 1 ha
/** Une longueur, en mètres. */
const EN_METRES = { km: 1000, m: 1, cm: 0.01, mm: 0.001 };

/* ── Les figures dessinées, relues dans le source ──────────────────────── */

/** Chaque `plan("u", [ ... ])` du bloc : son unité, ses formes (évaluées), son texte brut. */
function plans(bloc) {
  const out = [];
  let i = 0;
  while ((i = bloc.indexOf('plan("', i)) >= 0) {
    const unite = bloc.slice(i + 6, bloc.indexOf('"', i + 6));
    const debut = bloc.indexOf("[", i);
    let prof = 0, j = debut, dansChaine = false;
    for (; j < bloc.length; j++) {
      const c = bloc[j];
      if (c === '"' && bloc[j - 1] !== "\\") dansChaine = !dansChaine;
      if (dansChaine) continue;
      if (c === "[") prof++;
      else if (c === "]" && --prof === 0) break;
    }
    const brut = bloc.slice(debut, j + 1);
    out.push({ unite, formes: new Function(`return ${brut}`)(), brut });
    i = j;
  }
  return out;
}
/** La longueur annoncée par une étiquette, convertie dans l'unité du plan ; null sans longueur. */
function longueurDe(label, unite) {
  const apres = label.split(/[=≈]/).at(-1);
  const m = apres.match(/(\d+(?:,\d+)?)\s*(km|cm|mm|m)(?![a-z²])/);
  return m ? (Number(m[1].replace(",", ".")) * EN_METRES[m[2]]) / EN_METRES[unite] : null;
}
const dist = (P, Q) => Math.hypot(Q[0] - P[0], Q[1] - P[1]);
/** L'aire signée d'une forme de fond (négative pour un trou), null si ce n'est pas une surface. */
function aireForme(f) {
  if (!f.poly) return null;
  const a = lacet(f.poly);
  return f.fond === "trou" ? -a : a;
}

function verifier(source, v) {
  const { corrections, blocs } = lireFeuille(source);
  const c = (k) => corrections[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");

  /** Toutes les figures de l'exercice k sont fidèles à leurs étiquettes. */
  const fidele = (k) => {
    const ps = plans(blocs[k - 1] ?? "");
    v.ok(`${k}. l'exercice a sa figure dessinée`, ps.length > 0);
    for (const { unite, formes, brut } of ps) {
      const sommets = formes.filter((f) => f.poly).flatMap((f) => f.poly);
      const cotes = [];
      for (const f of formes) {
        const seg = f.cote ?? f.haut;
        if (!seg || !f.label) continue;
        const n = longueurDe(f.label, unite);
        if (n !== null) cotes.push([f.label, dist(seg[0], seg[1]), n]);
      }
      const faux = cotes.filter(([, l, n]) => Math.abs(l / n - 1) > 0.005);
      v.ok(`${k}. les ${cotes.length} longueurs chiffrées sont dessinées à l'échelle (${unite})`, cotes.length > 0 && faux.length === 0, JSON.stringify(faux));
      for (const f of formes.filter((f) => f.haut)) {
        const [S, H] = f.haut;
        const sommet = sommets.some((p) => proche(p[0], S[0]) && proche(p[1], S[1]));
        const bases = formes.filter((g) => g.poly).flatMap((g) => g.poly.map((p, i) => [p, g.poly[(i + 1) % g.poly.length]]));
        const surBase = bases.some(([Q, R]) => {
          const e = [R[0] - Q[0], R[1] - Q[1]];
          const L = Math.hypot(...e);
          const aligne = Math.abs(e[0] * (H[1] - Q[1]) - e[1] * (H[0] - Q[0])) / L < 1e-6;
          const perp = Math.abs(e[0] * (S[0] - H[0]) + e[1] * (S[1] - H[1])) / (L * dist(S, H)) < 1e-6;
          return aligne && perp;
        });
        v.ok(`${k}. la hauteur part d'un sommet et tombe perpendiculairement sur la droite d'un côté`, sommet && surBase, `sommet : ${sommet} ; perpendiculaire à un côté : ${surBase}`);
      }
      for (const f of formes.filter((f) => f.droit)) {
        const [V, U, W] = f.droit;
        const cos = ((U[0] - V[0]) * (W[0] - V[0]) + (U[1] - V[1]) * (W[1] - V[1])) / (dist(V, U) * dist(V, W));
        v.ok(`${k}. l'angle droit marqué en (${V}) en est un`, Math.abs(cos) < 1e-9);
      }
      const g = formes.find((f) => f.grille);
      if (g) {
        const pas = g.pas ?? 1;
        const horsNoeud = sommets.filter(([x, y]) => !proche(x / pas, Math.round(x / pas)) || !proche(y / pas, Math.round(y / pas)));
        v.ok(`${k}. sur le quadrillage, les ${sommets.length} sommets sont sur des nœuds`, horsNoeud.length === 0, JSON.stringify(horsNoeud));
      }
      v.ok(`${k}. pas de $ ni de \\ dans le dessin`, !/[$\\]/.test(brut));
    }
    return ps;
  };
  /** Les surfaces ombrées de chaque plan de k valent les aires attendues (dans l'unité du plan). */
  const ombre = (k, attendues) => {
    const ps = fidele(k);
    v.ok(`${k}. ${attendues.length} figure(s) attendue(s)`, ps.length === attendues.length, `${ps.length} dessinée(s)`);
    ps.forEach((p, i) => {
      const lues = p.formes.map(aireForme).filter((a) => a !== null).sort((a, b) => a - b);
      const att = [...(attendues[i] ?? [])].sort((a, b) => a - b);
      const ok = lues.length === att.length && lues.every((a, j) => Math.abs(a - att[j]) <= 1e-6 * Math.max(1, Math.abs(att[j])));
      v.ok(`${k}. surfaces ombrées de la figure ${i + 1} : ${att.map((a) => +a.toFixed(4)).join(" ; ")} ${p.unite}²`, ok, `lues : ${lues.map((a) => +a.toFixed(4)).join(" ; ")}`);
    });
    return ps;
  };

  v.titre("★ Un seul geste");

  // 1 — compter les carreaux, pas le tour
  {
    const ps = plans(blocs[0] ?? "");
    const L = ps[0]?.formes.find((f) => f.poly)?.poly ?? [];
    let n = 0;
    for (let x = 0; x < 6; x++) for (let y = 0; y < 5; y++) if (dedans([x + 0.5, y + 0.5], L)) n++;
    const tour = L.reduce((s, P, i) => s + dist(P, L[(i + 1) % L.length]), 0);
    v.ok(`1. ${n} carreaux comptés un par un dans la figure de l'énoncé ; tour ${tour}`, n === 18 && tour === 22);
    dit(1, `soit $2 \\times 6 = 12$`);
    dit(1, `soit $3 \\times 2 = 6$`);
    dit(1, `En tout : $12 + 6 = ${n}$ carreaux`);
    dit(1, `$6 + 2 + 4 + 3 + 2 + 5 = ${tour}$`);
    dit(1, `Réponse : $${n}$ carreaux, soit une aire de $${n}$ cm² ; Léo a mesuré le périmètre, $${tour}$ cm.`);
    ombre(1, [[n], [12, 6]]);
  }

  // 2 — la carte postale
  const a2 = 15 * 10.5;
  dit(2, `$15 \\times 10 = 150$ et $15 \\times 0{,}5 = 7{,}5$, donc $\\mathcal{A} = 150 + 7{,}5 = ${fr(a2)}$ cm²`);
  dit(2, `$15 + 10{,}5 = ${fr(15 + 10.5)}$`);
  dit(2, `Réponse : $\\mathcal{A} = ${fr(a2)}$ cm².`);
  ombre(2, [[a2]]);

  // 3 — de l'aire à la largeur
  const l3 = 56 / 8;
  v.ok(`3. 56 ÷ 8 = ${l3}, et ${l3} × 8 = 56`, l3 * 8 === 56);
  dit(3, `$\\ell = 56 \\div 8 = ${l3}$ m`);
  dit(3, `$56 - 8 = ${56 - 8}$ m`);
  dit(3, `Réponse : la salle mesure $${l3}$ m de large.`);
  ombre(3, [[56]]);

  // 4 — le carré d'un décimal
  const a4 = 3.5 * 3.5;
  dit(4, `$3 \\times 3{,}5 = 10{,}5$ et $0{,}5 \\times 3{,}5 = 1{,}75$, donc $\\mathcal{A} = 10{,}5 + 1{,}75 = ${fr(a4)}$ cm²`);
  dit(4, `$3{,}5 \\times 2 = ${fr(3.5 * 2)}$`);
  dit(4, `$4 \\times 3{,}5 = ${fr(4 * 3.5)}$ cm`);
  dit(4, `Réponse : $\\mathcal{A} = ${fr(a4)}$ cm².`);
  ombre(4, [[a4]]);

  // 5 — le côté d'un carré
  let c5 = 0;
  while (c5 * c5 < 144) c5++;
  v.ok(`5. ${c5} × ${c5} = 144 (cherché pas à pas)`, c5 * c5 === 144);
  dit(5, `$${c5} \\times ${c5} = 144$ : c'est lui`);
  dit(5, `$144 \\div 4 = ${144 / 4}$`);
  dit(5, `$36 \\times 36 = ${fr(36 * 36)}$ cm², neuf fois trop`);
  v.ok("5. 1 296 ÷ 144 = 9", (36 * 36) / 144 === 9);
  dit(5, `Réponse : le côté mesure $${c5}$ cm.`);
  ombre(5, [[144]]);

  // 6 — la moitié du rectangle
  const a6 = (11 * 4) / 2;
  dit(6, `$\\mathcal{A} = \\dfrac{11 \\times 4}{2} = \\dfrac{${11 * 4}}{2} = ${a6}$ cm²`);
  dit(6, `répondre $${11 * 4}$ cm²`);
  dit(6, `Réponse : $\\mathcal{A} = ${a6}$ cm².`);
  ombre(6, [[a6]]);

  // 7 — le triangle rectangle
  const a7 = (6 * 4.5) / 2;
  v.ok("7. 6² + 4,5² = 7,5² : le triangle dessiné est bien rectangle", proche(6 * 6 + 4.5 * 4.5, 7.5 * 7.5));
  dit(7, `\\dfrac{6 \\times 4{,}5}{2} = \\dfrac{${6 * 4.5}}{2} = ${fr(a7)}$ cm²`);
  dit(7, `$\\dfrac{6 \\times 7{,}5}{2} = ${fr((6 * 7.5) / 2)}$ cm²`);
  dit(7, `Réponse : $\\mathcal{A} = ${fr(a7)}$ cm².`);
  ombre(7, [[a7]]);

  // 8 — le parallélogramme
  const a8 = 6 * 3.5;
  dit(8, `$\\mathcal{A} = 6 \\times 3{,}5 = ${a8}$ cm²`);
  dit(8, `$6 \\times 3{,}7 = ${fr(6 * 3.7)}$ cm²`);
  dit(8, `Réponse : $\\mathcal{A} = ${a8}$ cm².`);
  ombre(8, [[a8]]);

  v.titre("★★ Type devoir");

  // 9 — deux bases, une même aire
  {
    const A = [0, 0], B = [12, 0], D = [6, 8];
    const aire = lacet([A, B, [18, 8], D]);
    // distance de B à la droite (AD), par le produit vectoriel
    const bh = Math.abs((D[0] - A[0]) * (B[1] - A[1]) - (D[1] - A[1]) * (B[0] - A[0])) / dist(A, D);
    v.ok(`9. aire ${aire} ; distance de B à (AD) : ${bh}`, aire === 96 && proche(bh, 9.6));
    dit(9, `$\\mathcal{A} = AB \\times 8 = 12 \\times 8 = ${aire}$ cm²`);
    dit(9, `$10 \\times BH = ${aire}$ et $BH = ${aire} \\div 10 = ${fr(bh)}$ cm`);
    dit(9, `$12 \\times 10 = ${12 * 10}$ cm²`);
    dit(9, `Réponse : $\\mathcal{A} = ${aire}$ cm² et $BH = ${fr(bh)}$ cm.`);
    ombre(9, [[aire]]);
  }

  // 10 — le L
  const a10 = [9 * 4, 5 * (7 - 4)];
  dit(10, `$\\mathcal{A}_1 = 9 \\times 4 = ${a10[0]}$ m²`);
  dit(10, `$7 - 4 = 3$ m. $\\mathcal{A}_2 = 5 \\times 3 = ${a10[1]}$ m²`);
  dit(10, `$\\mathcal{A} = 36 + 15 = ${a10[0] + a10[1]}$ m²`);
  dit(10, `$63 - 12 = ${9 * 7 - (9 - 5) * (7 - 4)}$ m²`);
  dit(10, `Réponse : la pièce a une aire de $${a10[0] + a10[1]}$ m².`);
  ombre(10, [[a10[0] + a10[1]], a10]);

  // 11 — le fanion
  const r11 = 10 * 6, t11 = (6 * 4) / 2;
  dit(11, `$\\dfrac{6 \\times 4}{2} = ${t11}$ cm²`);
  dit(11, `$\\mathcal{A} = 60 - 12 = ${r11 - t11}$ cm²`);
  dit(11, `$60 - 24 = ${r11 - 2 * t11}$ cm²`);
  dit(11, `$60 + 12 = ${r11 + t11}$ cm²`);
  dit(11, `Réponse : le fanion a une aire de $${r11 - t11}$ cm².`);
  ombre(11, [[r11, -t11]]);

  // 12 — Pick, sans rectangle englobant
  {
    const T = [[0, 0], [6, 2], [2, 5]];
    let I = 0;
    for (let x = 0; x <= 6; x++) for (let y = 0; y <= 5; y++) if (dedans([x, y], T) && !surBord([x, y], T)) I++;
    const Bd = T.reduce((s, P, i) => { const Q = T[(i + 1) % 3]; return s + pgcd(Q[0] - P[0], Q[1] - P[1]); }, 0);
    const pick = I + Bd / 2 - 1;
    v.ok(`12. Pick : ${I} points intérieurs, ${Bd} sur le bord → ${pick} cm²`, pick === 13 && lacet(T) === 13);
    dit(12, `$6 \\times 5 = 30$ cm²`);
    dit(12, `$\\dfrac{6 \\times 2}{2} = 6$ cm²`);
    dit(12, `$\\dfrac{4 \\times 3}{2} = 6$ cm²`);
    dit(12, `$\\dfrac{2 \\times 5}{2} = 5$ cm²`);
    dit(12, `$\\mathcal{A} = 30 - (6 + 6 + 5) = 30 - 17 = ${pick}$ cm²`);
    dit(12, `$30 - (12 + 12 + 10) = ${30 - 34}$`);
    dit(12, `Réponse : $\\mathcal{A} = ${pick}$ cm².`);
    ombre(12, [[pick], [pick, 6, 6, 5]]);
  }

  // 13 — de l'aire à la hauteur
  const h13 = (2 * 30) / 7.5;
  dit(13, `$7{,}5 \\times h = 30 \\times 2 = 60$`);
  dit(13, `$h = 60 \\div 7{,}5 = ${h13}$ cm`);
  dit(13, `$30 \\div 7{,}5 = ${30 / 7.5}$ cm`);
  dit(13, `ne serait que $${(7.5 * (30 / 7.5)) / 2}$ cm²`);
  dit(13, `Réponse : la hauteur mesure $${h13}$ cm.`);
  ombre(13, [[30]]);

  // 14 — le carrelage
  {
    const salle = 4 * 3, carreau = 50 * 50;
    const n = (salle * M2) / carreau;
    v.ok(`14. ${salle * M2} ÷ ${carreau} = ${n} = 8 × 6`, n === (400 / 50) * (300 / 50));
    dit(14, `$12$ m² $= ${fr(salle * M2)}$ cm²`);
    dit(14, `$\\mathcal{A} = 50 \\times 50 = ${fr(carreau)}$ cm²`);
    dit(14, `$120\\,000 \\div 2\\,500 = ${n}$ carreaux`);
    dit(14, `$1\\,200$ cm², moins qu'un seul carreau`);
    v.ok("14. 1 200 < 2 500", salle * 100 < carreau);
    dit(14, `$12 \\div 0{,}5 = ${salle / 0.5}$`);
    dit(14, `Réponse : $12$ m² $= ${fr(salle * M2)}$ cm² ; $${fr(carreau)}$ cm² par carreau ; $${n}$ carreaux.`);
    ombre(14, [[salle, carreau / M2]]);
  }

  // 15 — la flèche
  const a15 = [6 * 2, (4 * 3) / 2];
  dit(15, `$\\mathcal{A}_1 = 6 \\times 2 = ${a15[0]}$ cm²`);
  dit(15, `$\\mathcal{A}_2 = \\dfrac{4 \\times 3}{2} = ${a15[1]}$ cm²`);
  dit(15, `$\\mathcal{A} = 12 + 6 = ${a15[0] + a15[1]}$ cm²`);
  dit(15, `$12 + 12 = ${a15[0] + 4 * 3}$ cm²`);
  dit(15, `Réponse : la flèche a une aire de $${a15[0] + a15[1]}$ cm².`);
  ombre(15, [a15]);

  // 16 — même base, même hauteur
  {
    const ps = ombre(16, [[12, 12, 12]]);
    const aires = ps[0]?.formes.filter((f) => f.poly).map((f) => lacet(f.poly)) ?? [];
    v.ok(`16. les trois triangles dessinés : ${aires.join(", ")} cm²`, aires.length === 3 && aires.every((a) => a === 12));
    const ae = dist([0, 0], [9, 4]);
    v.ok(`16. [AE] mesure ${ae.toFixed(3)} cm : « presque 10 »`, ae > 9.5 && ae < 10);
    dit(16, `$\\mathcal{A} = \\dfrac{6 \\times 4}{2} = 12$ cm², pour chacun des trois`);
    dit(16, `$\\dfrac{6 \\times 10}{2} = ${(6 * 10) / 2}$ cm², plus du double`);
    dit(16, `Réponse : $12$ cm² pour chacun`);
  }

  v.titre("★★★ Problèmes");

  // 17 — le terrain de basket
  {
    const t = 28 * 15, tout = (28 + 4) * (15 + 4), bande = tout - t;
    const pots = Math.ceil(bande / 25);
    const faux = (28 + 2) * (15 + 2) - t;
    dit(17, `$\\mathcal{A} = 28 \\times 15 = ${t}$ m²`);
    dit(17, `$28 + 2 + 2 = 32$ m sur $15 + 2 + 2 = 19$ m, donc $32 \\times 19 = ${tout}$ m²`);
    dit(17, `$608 - 420 = ${bande}$ m²`);
    dit(17, `$188 \\div 25 = ${fr(bande / 25)}$ : sept pots ne suffisent pas, il en faut $${pots}$`);
    dit(17, `$30 \\times 17 = ${30 * 17}$ m², ce qui donnerait une bande de $${faux}$ m²`);
    v.ok(`17. ${faux} < la moitié de ${bande}`, faux < bande / 2);
    dit(17, `Réponse : $${t}$ m² de terrain, $${tout}$ m² en tout, $${bande}$ m² de bande, donc $${pots}$ pots.`);
    ombre(17, [[tout, t]]);
  }

  // 18 — le toit et la pluie
  {
    const tuiles = 2 * 10 * 5, sol = 10 * 8;
    v.ok("18. pignon : 3² + 4² = 5², et 4 m au sol = la moitié de 8", 3 * 3 + 4 * 4 === 5 * 5 && 8 / 2 === 4);
    dit(18, `$2 \\times 50 = ${tuiles}$ m² de tuiles`);
    dit(18, `$10 \\times 8 = ${sol}$ m²`);
    dit(18, `$80 \\times 640 = ${fr(sol * 640)}$ L`);
    dit(18, `$100 \\times 640 = ${fr(tuiles * 640)}$ L`);
    dit(18, `Réponse : $${tuiles}$ m² de tuiles, $${sol}$ m² au sol, et environ $${fr(sol * 640)}$ L d'eau par an.`);
    ombre(18, [[(8 * 3) / 2], [40, 40]]);
  }

  // 19 — le parking en épi
  {
    const place = 2.9 * 5;
    const n = Math.round(58 / 2.9);
    v.ok(`19. 58 ÷ 2,9 = ${n}, sans reste`, proche(n * 2.9, 58, 1e-9));
    const cote = Math.hypot(2, 5);
    v.ok(`19. le côté penché dessiné mesure ${cote.toFixed(3)} m : « environ 5,4 m »`, arr(cote, 1) === 5.4);
    dit(19, `$\\mathcal{A} = 2{,}9 \\times 5 = ${fr(place)}$ m²`);
    dit(19, `$58 \\div 2{,}9 = ${n}$ places`);
    dit(19, `$20 \\times 14{,}5 = ${fr(n * place)}$ m²`);
    dit(19, `$58 \\times 5 = ${58 * 5}$ m²`);
    v.ok("19. les deux chemins donnent la même aire", proche(n * place, 58 * 5));
    dit(19, `$2{,}9 \\times 5{,}4 = ${fr(2.9 * 5.4)}$ m²`);
    dit(19, `Réponse : $${fr(place)}$ m² par place, $${n}$ places, $${fr(n * place)}$ m² en tout.`);
    ombre(19, [[place, place, place, place]]);
  }

  // 20 — le champ des deux sœurs
  {
    const A = [0, 0], B = [120, 0], C = [40, 80];
    const champ = lacet([A, B, C]);
    const M = [60, 0];
    const parts = [lacet([A, M, C]), lacet([M, B, C])];
    // la clôture : intersection des côtés avec y = 40
    const sur = (P, Q, y) => [P[0] + ((Q[0] - P[0]) * (y - P[1])) / (Q[1] - P[1]), y];
    const G = sur(A, C, 40), D = sur(B, C, 40);
    const haut = lacet([G, D, C]);
    v.ok(`20. champ ${champ} m² ; parts de Lina ${parts.join(" et ")} ; clôture de ${dist(G, D)} m ; part du haut ${haut}`, champ === 4800 && parts[0] === parts[1] && dist(G, D) === 60 && haut === 1200);
    dit(20, `$\\mathcal{A} = \\dfrac{120 \\times 80}{2} = ${fr(champ)}$ m²`);
    dit(20, `$4\\,800 \\div 10\\,000 = ${fr(champ / HA)}$ ha`);
    dit(20, `$\\dfrac{60 \\times 80}{2} = ${fr(parts[0])}$ m² chacune`);
    dit(20, `$\\dfrac{60 \\times 40}{2} = ${fr(haut)}$ m²`);
    dit(20, `$4\\,800 - 1\\,200 = ${fr(champ - haut)}$ m², trois fois plus`);
    v.ok("20. 3 600 = 3 × 1 200, et 1 200 = un quart de 4 800", champ - haut === 3 * haut && haut * 4 === champ);
    dit(20, `Réponse : $${fr(champ)}$ m², soit $${fr(champ / HA)}$ ha ; la coupe de Lina donne deux parts de $${fr(parts[0])}$ m² ; la clôture de Sarah donne $${fr(haut)}$ m² et $${fr(champ - haut)}$ m²`);
    ombre(20, [parts, [haut, champ - haut]]);
  }

  v.titre("Les dessins");
  const dessines = blocs.filter((b) => {
    const i = b.indexOf("schema:");
    return i >= 0 && b.indexOf('plan("', i) >= 0;
  }).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20);
  const enonces = blocs.filter((b) => /figure: plan\("/.test(b)).length;
  v.ok(`${enonces} énoncés avec leur figure (1, 10, 12)`, enonces === 3);
}

lancer({
  nom: "LES AIRES · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-aires.tsx",
  notionId: "aire_surface",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : 20 carreaux annoncés", "Réponse : $18$ carreaux", "Réponse : $20$ carreaux"],
    ["ex. 1 : la figure de l'énoncé avec un carreau de trop", "{ poly: [[0, 0], [6, 0], [6, 2], [2, 2], [2, 5], [0, 5]], fond: \"bleu\" },\n            { cote: [[0, 0], [1, 0]]", "{ poly: [[0, 0], [6, 0], [6, 2], [3, 2], [3, 3], [2, 3], [2, 5], [0, 5]], fond: \"bleu\" },\n            { cote: [[0, 0], [1, 0]]"],
    ["ex. 2 : les côtés additionnés", "Réponse : $\\\\mathcal{A} = 157{,}5$ cm².", "Réponse : $\\\\mathcal{A} = 25{,}5$ cm²."],
    ["ex. 3 : soustraire au lieu de diviser", "Réponse : la salle mesure $7$ m de large.", "Réponse : la salle mesure $48$ m de large."],
    ["ex. 4 : 3,5² = 7", "Réponse : $\\\\mathcal{A} = 12{,}25$ cm².", "Réponse : $\\\\mathcal{A} = 7$ cm²."],
    ["ex. 5 : 144 ÷ 4", "Réponse : le côté mesure $12$ cm.", "Réponse : le côté mesure $36$ cm."],
    ["ex. 6 : le ÷ 2 oublié", "Réponse : $\\\\mathcal{A} = 22$ cm².", "Réponse : $\\\\mathcal{A} = 44$ cm²."],
    ["ex. 7 : l'hypoténuse prise pour hauteur", "Réponse : $\\\\mathcal{A} = 13{,}5$ cm².", "Réponse : $\\\\mathcal{A} = 22{,}5$ cm²."],
    ["ex. 7 : l'angle droit marqué ailleurs", "{ droit: [[0, 0], [6, 0], [0, 4.5]] }", "{ droit: [[6, 0], [0, 0], [0, 4.5]] }"],
    ["ex. 8 : le côté penché", "Réponse : $\\\\mathcal{A} = 21$ cm².", "Réponse : $\\\\mathcal{A} = 22{,}2$ cm²."],
    ["ex. 8 : la hauteur dessinée penchée", "haut: [[1.2, 3.5], [1.2, 0]]", "haut: [[1.2, 3.5], [0.5, 0]]"],
    ["ex. 9 : BH = 96 ÷ 12", "Réponse : $\\\\mathcal{A} = 96$ cm² et $BH = 9{,}6$ cm.", "Réponse : $\\\\mathcal{A} = 96$ cm² et $BH = 8$ cm."],
    ["ex. 9 : le pied H mal placé", "haut: [[12, 0], [4.32, 5.76]]", "haut: [[12, 0], [4.5, 6]]"],
    ["ex. 10 : le coin vide compté", "Réponse : la pièce a une aire de $51$ m².", "Réponse : la pièce a une aire de $63$ m²."],
    ["ex. 10 : le rectangle du haut dessiné trop haut", "{ poly: [[0, 4], [5, 4], [5, 7], [0, 7]], fond: \"orange\" }", "{ poly: [[0, 4], [5, 4], [5, 8], [0, 8]], fond: \"orange\" }"],
    ["ex. 11 : l'encoche ajoutée", "Réponse : le fanion a une aire de $48$ cm².", "Réponse : le fanion a une aire de $72$ cm²."],
    ["ex. 11 : l'encoche dessinée pleine", "{ poly: [[10, 0], [6, 3], [10, 6]], fond: \"trou\" }", "{ poly: [[10, 0], [6, 3], [10, 6]], fond: \"bleu\" }"],
    ["ex. 12 : un sommet hors nœud", "{ poly: [[0, 0], [6, 2], [2, 5]], fond: \"bleu\" },\n            { poly: [[0, 0], [6, 0], [6, 2]]", "{ poly: [[0, 0], [6, 2], [2.5, 5]], fond: \"bleu\" },\n            { poly: [[0, 0], [6, 0], [6, 2]]"],
    ["ex. 12 : 30 − 16", "$\\\\mathcal{A} = 30 - (6 + 6 + 5) = 30 - 17 = 13$ cm²", "$\\\\mathcal{A} = 30 - (6 + 6 + 4) = 30 - 16 = 14$ cm²"],
    ["ex. 13 : 30 ÷ 7,5", "Réponse : la hauteur mesure $8$ cm.", "Réponse : la hauteur mesure $4$ cm."],
    ["ex. 14 : 1 m² = 100 cm²", "c) $120\\\\,000 \\\\div 2\\\\,500 = 48$ carreaux.", "c) $1\\\\,200 \\\\div 2\\\\,500 = 0{,}48$ carreaux."],
    ["ex. 14 : le carreau dessiné de 60 cm", "label: \"50 cm\"", "label: \"60 cm\""],
    ["ex. 15 : la pointe sans ÷ 2", "Réponse : la flèche a une aire de $18$ cm².", "Réponse : la flèche a une aire de $24$ cm²."],
    ["ex. 16 : le sommet E dessiné hors de la parallèle", "{ poly: [[0, 0], [6, 0], [9, 4]], fond: \"vert\" }", "{ poly: [[0, 0], [6, 0], [9, 5]], fond: \"vert\" }"],
    ["ex. 17 : 2 m d'un seul côté", "donc $32 \\\\times 19 = 608$ m²", "donc $30 \\\\times 17 = 510$ m²"],
    ["ex. 17 : 7 pots", "il en faut $8$.", "il en faut $7$."],
    ["ex. 18 : la pluie sur les tuiles", "Réponse : $100$ m² de tuiles, $80$ m² au sol, et environ $51\\\\,200$ L", "Réponse : $100$ m² de tuiles, $80$ m² au sol, et environ $64\\\\,000$ L"],
    ["ex. 18 : le pignon dessiné trop haut", "{ poly: [[0, 0], [8, 0], [4, 3]], fond: \"orange\" }", "{ poly: [[0, 0], [8, 0], [4, 4]], fond: \"orange\" }"],
    ["ex. 19 : le côté penché", "Réponse : $14{,}5$ m² par place", "Réponse : $15{,}66$ m² par place"],
    ["ex. 20 : mi-hauteur = moitié", "donne $1\\\\,200$ m² et $3\\\\,600$ m², un partage injuste", "donne $2\\\\,400$ m² et $2\\\\,400$ m², un partage injuste"],
    ["ex. 20 : la clôture dessinée trop longue", "{ cote: [[20, 40], [80, 40]], label: \"60 m\", sens: -1 }", "{ cote: [[20, 40], [80, 40]], label: \"70 m\", sens: -1 }"],
    ["un $ dans un dessin", 'label: "3,7 cm" },\n            { point: [0, 0], label: "E" }', 'label: "$3,7$ cm" },\n            { point: [0, 0], label: "E" }'],
    ["une micro d'une autre notion", 'micros: ["aire_parallelogramme", "aire_probleme"]', 'micros: ["aire_parallelogramme", "prop_echelle_aire"]'],
  ],
});
