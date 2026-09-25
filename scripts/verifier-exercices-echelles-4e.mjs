// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Échelles,
// agrandissements et réductions » de 4e (lib/fiches-exercices/maths-4e-echelles.tsx).
//
// ⭐ DEUX AUTRES CHEMINS pour chaque valeur :
// 1. le calcul, refait ici en fractions EXACTES à partir des données de
//    l'énoncé (recopiées), puis le corrigé doit ÉCRIRE la phrase qui porte le
//    résultat — pas le nombre seul ;
// 2. le DESSIN : on relit dans le source chaque appel `regle()`, `barres()`,
//    `dessin()`, `paves()`, `tableauEch()`, on remesure les figures sur leurs
//    coordonnées (côtés, angles, rapport de similitude, quadrillage), et elles
//    doivent dire la même chose que le texte. Un rectangle agrandi « de rapport
//    2,5 » doit être DESSINÉ 2,5 fois plus grand, avec les mêmes angles.
//
// ⭐ LA MISE EN PAGE EST REFAITE ICI avec les constantes des aides du fichier
// (viewBox de 300, police 15, 8,6 unités par signe) : aucune étiquette ne sort
// du cadre, n'en chevauche une autre, ni ne croise un trait. Police 15 dans 300
// de large : 11,75 px quand le dessin tient dans 235 px, à 375 px d'écran.
//
//   node scripts/verifier-exercices-echelles-4e.mjs

import { lireFeuille, lancer, Q, D, fois, div, plus, moins, egal, inf, tex, versNombre } from "./verifier-exercices-commun.mjs";

/* ── Nombres ────────────────────────────────────────────────────────────── */

const N = (x) => (typeof x === "object" ? x : typeof x === "number" ? D(String(x)) : D(x));
/** Écrit comme dans la feuille : `1\,350\,000`, `13{,}5`. */
const T = (x) => tex(N(x));
/** Un arrondi à n décimales, écrit comme dans la feuille. */
const fr = (x, n) => tex(D((Math.round(x * 10 ** n) / 10 ** n).toFixed(n)));
/** Le texte NU des dessins : 1 000 ; 2,4 (comme `nombre()` du fichier). */
const nombre = (x) => {
  const r = Math.round(x * 1000) / 1000;
  const [e, d] = String(r).split(".");
  return e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : "");
};
/** Le premier nombre d'une étiquette : « 7,5 cm » → 7.5, « 2 100 000 » → 2100000. */
const valeur = (t) => {
  const m = String(t).match(/(\d{1,3}(?: \d{3})+|\d+)(?:,(\d+))?/);
  return m ? Number(m[1].replace(/ /g, "") + (m[2] ? "." + m[2] : "")) : null;
};
const presque = (a, b) => Math.abs(a - b) < 1e-9;

/* ── Relire les appels du source ─────────────────────────────────────────── */

/** Un littéral TypeScript simple (clés nues, virgules finales) → JSON. */
const json = (t) => JSON.parse(t.replace(/([{,]\s*)([a-zA-Z]+):/g, '$1"$2":').replace(/,(\s*[\]}])/g, "$1"));

/** Les appels `nom(…)` d'un bloc, chacun rendu comme la liste de ses arguments. */
function appels(bloc, nom) {
  const res = [];
  for (const m of bloc.matchAll(new RegExp(`\\b${nom}\\(`, "g"))) {
    const args = [];
    let prof = 0;
    let courant = "";
    let chaine = false;
    for (let i = m.index + m[0].length; i < bloc.length; i++) {
      const ch = bloc[i];
      if (chaine) {
        courant += ch;
        if (ch === "\\") courant += bloc[++i];
        else if (ch === '"') chaine = false;
        continue;
      }
      if (ch === '"') {
        chaine = true;
        courant += ch;
        continue;
      }
      if ("([{".includes(ch)) prof++;
      if (")]}".includes(ch)) {
        if (prof === 0) break;
        prof--;
      }
      if (ch === "," && prof === 0) {
        args.push(courant.trim());
        courant = "";
        continue;
      }
      courant += ch;
    }
    if (courant.trim()) args.push(courant.trim());
    res.push(args.map(json));
  }
  return res;
}

/* ── La mise en page, refaite avec les constantes du fichier ─────────────── */

const LARG = (t) => [...t].length * 8.6;
function boite(x, y, ancre, t) {
  const w = LARG(t);
  const x0 = ancre === "start" ? x : ancre === "end" ? x - w : x - w / 2;
  return { x0, x1: x0 + w, y0: y - 11, y1: y + 2, t };
}
const chevauche = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
function croise(b, [P, R]) {
  for (let i = 0; i <= 200; i++) {
    const t = i / 200;
    const x = P[0] + (R[0] - P[0]) * t;
    const y = P[1] + (R[1] - P[1]) * t;
    if (x > b.x0 && x < b.x1 && y > b.y0 && y < b.y1) return true;
  }
  return false;
}
const aretes = (px) => (px.length === 2 ? [[px[0], px[1]]] : px.map((p, i) => [p, px[(i + 1) % px.length]]));

/** `regle({ n, par, unite, pas, marque })`, comme dans le fichier. */
function pageRegle({ n, par, unite, pas = 1, marque }) {
  const X = (i) => 50 + (224 * i) / n;
  const H = marque === undefined ? 90 : 116;
  const b = [boite(4, 31, "start", "cm"), boite(4, 79, "start", unite)];
  for (let i = 0; i <= n; i += pas) b.push(boite(X(i), 31, "middle", nombre(i)), boite(X(i), 79, "middle", nombre(i * par)));
  if (marque !== undefined) {
    const txt = `${nombre(marque)} cm → ${nombre(marque * par)} ${unite}`;
    const xm = Math.min(Math.max(X(marque), 4 + LARG(txt) / 2), 290 - LARG(txt) / 2);
    b.push(boite(xm, 107, "middle", txt));
  }
  return { H, boites: b, segments: [] };
}

/** `barres(lignes, limite)`. */
function pageBarres(lignes, limite) {
  const max = Math.max(...lignes.map((l) => l.cm), limite?.cm ?? 0);
  const s = 280 / max;
  const haut = limite ? 24 : 0;
  const b = [];
  const segments = [];
  if (limite) b.push(boite(Math.min(Math.max(10 + limite.cm * s, 4 + LARG(limite.label) / 2), 290 - LARG(limite.label) / 2), 17, "middle", limite.label));
  lignes.forEach((l, i) => {
    const y = haut + i * 44;
    b.push(boite(10, y + 17, "start", l.label));
    if (limite) segments.push([[10 + limite.cm * s, y + 21], [10 + limite.cm * s, y + 41]]);
  });
  return { H: haut + lignes.length * 44 + 4, boites: b, segments, s };
}

/** `dessin(formes)`. */
function pageDessin(formes) {
  const geo = formes.flatMap((f) => (f.pts ? f.pts : [[f.cercle[0] - f.cercle[2], f.cercle[1] - f.cercle[2]], [f.cercle[0] + f.cercle[2], f.cercle[1] + f.cercle[2]]]));
  const xs = geo.map((p) => p[0]);
  const ys = geo.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min(160 / (x1 - x0 || 1), 130 / (y1 - y0 || 1));
  const MT = formes.some((f) => f.pts && f.nom) ? 32 : 16;
  const H = Math.round(MT + (y1 - y0) * s + 30);
  const dx = 70 + (160 - (x1 - x0) * s) / 2;
  const P = ([x, y]) => [dx + (x - x0) * s, MT + (y1 - y) * s];
  const b = [];
  const segments = [];
  for (const f of formes) {
    if (!f.pts) continue;
    const px = f.pts.map(P);
    segments.push(...aretes(px));
    const cx = px.reduce((t, p) => t + p[0], 0) / px.length;
    const cy = px.reduce((t, p) => t + p[1], 0) / px.length;
    (f.cotes ?? []).forEach((t, i) => {
      if (!t) return;
      const [A, B] = [px[i], px[(i + 1) % px.length]];
      const M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
      const L = Math.hypot(B[0] - A[0], B[1] - A[1]);
      let n = [(B[1] - A[1]) / L, -(B[0] - A[0]) / L];
      if ((M[0] - cx) * n[0] + (M[1] - cy) * n[1] < 0) n = [-n[0], -n[1]];
      const ancre = n[0] > 0.35 ? "start" : n[0] < -0.35 ? "end" : "middle";
      b.push(boite(M[0] + n[0] * 8, M[1] + n[1] * 8 + 5 + (ancre === "middle" ? n[1] * 8 : 0), ancre, t));
    });
    if (f.nom) {
      const [gx0, gx1] = [Math.min(...px.map((p) => p[0])), Math.max(...px.map((p) => p[0]))];
      b.push(boite((gx0 + gx1) / 2, Math.min(...px.map((p) => p[1])) - 9, "middle", f.nom));
    }
  }
  return { H, boites: b, segments, s };
}

/** `paves(liste)`. */
function pagePaves(liste) {
  const PC = 0.35;
  const w = liste.map((p) => p.dims[0] + p.dims[1] * PC);
  const ht = liste.map((p) => p.dims[2] + p.dims[1] * PC);
  const s = Math.min((300 - 56 - 52 - 84 * (liste.length - 1)) / w.reduce((a, c) => a + c, 0), 140 / Math.max(...ht));
  const MT = liste.some((p) => p.nom) ? 32 : 14;
  const base = MT + Math.max(...ht) * s;
  const b = [];
  const segments = [];
  let x = 56;
  liste.forEach((p, k) => {
    const [l, pr, h] = p.dims.map((d) => d * s);
    const e = pr * PC;
    const X = x;
    x += w[k] * s + 84;
    segments.push(
      ...aretes([[X, base], [X + l, base], [X + l, base - h], [X, base - h]]),
      ...aretes([[X, base - h], [X + l, base - h], [X + l + e, base - h - e], [X + e, base - h - e]]),
      ...aretes([[X + l, base], [X + l + e, base - e], [X + l + e, base - h - e], [X + l, base - h]]),
    );
    const [cl, cp, ch] = p.cotes ?? ["", "", ""];
    if (cl) b.push(boite(X + l / 2, base + 21, "middle", cl));
    if (ch) b.push(boite(X - 8, base - h / 2 + 5, "end", ch));
    if (cp) b.push(boite(X + l + e / 2 + 8, base - e / 2 + 14, "start", cp));
    if (p.nom) b.push(boite(X + (w[k] * s) / 2, base - h - e - 10, "middle", p.nom));
  });
  return { H: Math.round(base + 30), boites: b, segments, s };
}

/* ── Géométrie des figures ───────────────────────────────────────────────── */

const long = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const cotesDe = (pts) => (pts.length === 2 ? [long(pts[0], pts[1])] : pts.map((p, i) => long(p, pts[(i + 1) % pts.length])));
function anglesDe(pts) {
  const n = pts.length;
  return pts.map((S, i) => {
    const [A, B] = [pts[(i + n - 1) % n], pts[(i + 1) % n]];
    const u = [A[0] - S[0], A[1] - S[1]];
    const v = [B[0] - S[0], B[1] - S[1]];
    return (Math.atan2(Math.abs(u[0] * v[1] - u[1] * v[0]), u[0] * v[0] + u[1] * v[1]) * 180) / Math.PI;
  });
}
/** Le rapport de B à A si B est une réduction ou un agrandissement de A (mêmes
 *  angles, tous les côtés dans le même rapport), sinon null. */
function rapport(A, B) {
  if (A.length !== B.length) return null;
  const la = cotesDe(A).sort((x, y) => x - y);
  const lb = cotesDe(B).sort((x, y) => x - y);
  const r = lb.map((x, i) => x / la[i]);
  const aa = anglesDe(A).sort((x, y) => x - y);
  const ab = anglesDe(B).sort((x, y) => x - y);
  return r.every((x) => presque(x, r[0])) && aa.every((x, i) => Math.abs(x - ab[i]) < 1e-6) ? r[0] : null;
}
/** Dimensions [largeur, hauteur] d'un rectangle dessiné. */
const dims = (pts) => [Math.max(...pts.map((p) => p[0])) - Math.min(...pts.map((p) => p[0])), Math.max(...pts.map((p) => p[1])) - Math.min(...pts.map((p) => p[1]))];

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const bloc = (k) => f.blocs[k - 1] ?? "";
  const dit = (k, phrase) => v.ok(`${k}. « ${phrase} »`, c(k).includes(phrase), "absent du corrigé");
  const enonce = (k, phrase) => v.ok(`${k}. énoncé : « ${phrase} »`, (f.enonces[k - 1] ?? "").includes(phrase), "absent de l'énoncé");

  /** Une mise en page : tout dans le cadre, rien ne se chevauche, rien ne croise un trait. */
  const propre = (k, quoi, page) => {
    const fautes = [];
    for (const b of page.boites) if (b.x0 < 0 || b.x1 > 300 || b.y0 < 0 || b.y1 > page.H) fautes.push(`« ${b.t} » hors du cadre (${b.x0.toFixed(0)} → ${b.x1.toFixed(0)})`);
    page.boites.forEach((a, i) => page.boites.slice(i + 1).forEach((b) => chevauche(a, b) && fautes.push(`« ${a.t} » touche « ${b.t} »`)));
    for (const b of page.boites) for (const sg of page.segments) if (croise(b, sg)) fautes.push(`« ${b.t} » croise un trait`);
    v.ok(`${k}. ${quoi} : ${page.boites.length} étiquettes dans le cadre, sans chevauchement ni trait croisé`, fautes.length === 0, fautes.slice(0, 2).join(" | "));
  };
  /** Chaque étiquette d'un côté porte la longueur DESSINÉE. */
  const cotesJustes = (k, formes) => {
    const fautes = [];
    for (const fo of formes) {
      if (!fo.pts) continue;
      const L = cotesDe(fo.pts);
      (fo.cotes ?? []).forEach((t, i) => t && !presque(valeur(t), L[i]) && fautes.push(`« ${t} » sur un côté de ${L[i]}`));
    }
    v.ok(`${k}. chaque cote écrite est la longueur dessinée`, fautes.length === 0, fautes.join(" | "));
  };
  const lesDessins = (k) => {
    const ds = appels(bloc(k), "dessin").map((a) => a[0]);
    ds.forEach((d, i) => {
      propre(k, `dessin ${i + 1}`, pageDessin(d));
      cotesJustes(k, d);
    });
    return ds;
  };
  /** Le quadrillage d'un rectangle découpe des cases de ces dimensions. */
  const cases = (fo) => {
    const [w, h] = dims(fo.pts);
    return [w / fo.grille[0], h / fo.grille[1]];
  };
  const laRegle = (k, attendu) => {
    const [r] = appels(bloc(k), "regle").map((a) => a[0]);
    v.ok(`${k}. une règle double dessinée`, !!r);
    if (!r) return;
    propre(k, "règle double", pageRegle(r));
    v.ok(`${k}. règle : 1 cm vaut ${nombre(attendu.par)} ${attendu.unite}`, presque(r.par, attendu.par) && r.unite === attendu.unite, JSON.stringify(r));
    v.ok(`${k}. règle : la marque rouge à ${attendu.marque} cm vaut ${nombre(attendu.reel)} ${attendu.unite}`, presque(r.marque, attendu.marque) && presque(r.marque * r.par, attendu.reel), `${r.marque} × ${r.par}`);
    v.ok(`${k}. règle : la marque tient sur la règle (${r.marque} ≤ ${r.n})`, r.marque <= r.n && r.n % (r.pas ?? 1) === 0);
  };
  const lesPaves = (k) => {
    const [p] = appels(bloc(k), "paves").map((a) => a[0]);
    v.ok(`${k}. deux pavés dessinés`, !!p && p.length === 2);
    if (!p) return null;
    propre(k, "pavés", pagePaves(p));
    const fautes = [];
    for (const pv of p) (pv.cotes ?? []).forEach((t, i) => t && !presque(valeur(t), pv.dims[i]) && fautes.push(`« ${t} » pour ${pv.dims[i]}`));
    v.ok(`${k}. les cotes des pavés sont leurs dimensions dessinées`, fautes.length === 0, fautes.join(" | "));
    const r = p[1].dims.map((d, i) => d / p[0].dims[i]);
    v.ok(`${k}. le grand pavé est le petit agrandi (rapport ${r[0]} sur les trois dimensions)`, r.every((x) => presque(x, r[0])), JSON.stringify(r));
    return { p, k: r[0] };
  };

  /* ───────────────────────── ★ Un seul geste ───────────────────────── */
  v.titre("★ Un seul geste");

  // 1. 1/20 000
  {
    const d = Q(20000);
    const m = div(d, Q(100));
    const cinq = fois(Q(5), m);
    dit(1, `$20\\,000$ cm $= 20\\,000 \\div 100 = ${T(m)}$ m`);
    dit(1, `$5 \\times ${T(m)} = ${T(cinq)}$ m, soit $${T(div(cinq, Q(1000)))}$ km`);
    dit(1, `$20\\,000$ m feraient $${T(div(d, Q(1000)))}$ km`);
    v.ok("1. 1/20 000 est plus petit que 1 : une réduction", inf(div(Q(1), d), Q(1)));
    dit(1, `Réponse : $1$ cm représente $20\\,000$ cm, soit $${T(m)}$ m ; $5$ cm représentent $${T(div(cinq, Q(1000)))}$ km ; c'est une réduction.`);
    laRegle(1, { par: versNombre(m), unite: "m", marque: 5, reel: versNombre(cinq) });
  }

  // 2. 1 km sur trois cartes
  {
    const ds = [10000, 40000, 200000];
    const lac = Q(100000);
    const vals = ds.map((d) => div(lac, Q(d)));
    ds.forEach((d, i) => dit(2, `$100\\,000 \\div ${T(Q(d))} = ${T(vals[i])}$ cm.`));
    v.ok("2. le plus petit dénominateur donne le plus long dessin", inf(vals[1], vals[0]) && inf(vals[2], vals[1]));
    dit(2, `Réponse : $${T(vals[0])}$ cm, $${T(vals[1])}$ cm et $${T(vals[2])}$ cm ; la carte au $\\dfrac{1}{10\\,000}$ est la plus détaillée.`);
    const [[lignes]] = appels(bloc(2), "barres");
    propre(2, "barres", pageBarres(lignes));
    v.ok("2. trois barres, dans l'ordre des cartes", lignes.length === 3 && lignes.every((l, i) => l.label.startsWith(`au 1/${nombre(ds[i])} :`)), lignes.map((l) => l.label).join(" | "));
    v.ok("2. chaque barre a la longueur calculée, et l'écrit", lignes.every((l, i) => presque(l.cm, versNombre(vals[i])) && presque(valeur(l.label.split(":")[1]), versNombre(vals[i]))));
  }

  // 3. 7,4 cm au 1/5 000
  {
    const cm = fois(D("7,4"), Q(5000));
    const m = div(cm, Q(100));
    dit(3, `$7{,}4 \\times 5\\,000 = ${T(cm)}$ cm`);
    dit(3, `$${T(cm)} \\div 100 = ${T(m)}$ m`);
    dit(3, `$1$ cm vaut $${T(div(Q(5000), Q(100)))}$ m`);
    v.ok("3. contrôle : 370 < 8 × 50", inf(m, Q(400)));
    dit(3, `soit $${T(div(cm, Q(1000)))}$ km entre la gare`);
    dit(3, `Réponse : la gare et le stade sont à $${T(m)}$ m l'un de l'autre.`);
    laRegle(3, { par: 50, unite: "m", marque: 7.4, reel: versNombre(m) });
  }

  // 4. 100 m au 1/2 000
  {
    const cm = fois(Q(100), Q(100));
    const plan = div(cm, Q(2000));
    dit(4, `$100$ m $= 100 \\times 100 = ${T(cm)}$ cm`);
    dit(4, `$${T(cm)} \\div 2\\,000 = ${T(plan)}$ cm`);
    const piege = div(Q(100), Q(2000));
    dit(4, `$100 \\div 2\\,000 = ${T(piege)}$`);
    v.ok("4. le piège : 0,05 m font bien 5 cm", egal(fois(piege, Q(100)), plan));
    dit(4, `Réponse : le terrain mesure $${T(plan)}$ cm sur le plan.`);
    laRegle(4, { par: 20, unite: "m", marque: versNombre(plan), reel: 100 });
  }

  // 5. 3 × 2 → 7,5
  {
    const k = div(D("7,5"), Q(3));
    const l = fois(Q(2), k);
    dit(5, `$k = 7{,}5 \\div 3 = ${T(k)}$`);
    dit(5, `largeur $= 2 \\times ${T(k)} = ${T(l)}$ cm`);
    dit(5, `$2 + 4{,}5 = ${T(plus(Q(2), moins(D("7,5"), Q(3))))}$ cm`);
    dit(5, `Réponse : $k = ${T(k)}$ et la largeur mesure $${T(l)}$ cm.`);
    const [d] = lesDessins(5);
    const r = d ? rapport(d[0].pts, d[1].pts) : null;
    v.ok(`5. le dessin : le grand rectangle est le petit agrandi de ${T(k)}`, r !== null && presque(r, versNombre(k)), String(r));
  }

  // 6. 12-16-20 × 3/4
  {
    const k = Q(3, 4);
    const cotes = [12, 16, 20].map((x) => fois(Q(x), k));
    dit(6, `$12 \\times 0{,}75 = ${T(cotes[0])}$ cm ; $16 \\times 0{,}75 = ${T(cotes[1])}$ cm ; $20 \\times 0{,}75 = ${T(cotes[2])}$ cm`);
    v.ok("6. le modèle est rectangle : 12² + 16² = 20²", 144 + 256 === 400);
    const [a, b, h] = cotes.map(versNombre);
    v.ok("6. le réduit aussi : 9² + 12² = 15²", a * a + b * b === h * h);
    dit(6, `$${T(cotes[0])}^2 + ${T(cotes[1])}^2 = ${a * a} + ${b * b} = ${a * a + b * b} = ${T(cotes[2])}^2$`);
    dit(6, `Réponse : $${T(cotes[0])}$ cm, $${T(cotes[1])}$ cm et $${T(cotes[2])}$ cm ; le triangle réduit est rectangle`);
    const [d] = lesDessins(6);
    const r = d ? rapport(d[0].pts, d[1].pts) : null;
    v.ok("6. le dessin : le petit triangle est le grand réduit de 3/4", r !== null && presque(r, 0.75), String(r));
    v.ok("6. l'angle droit est marqué là où il est", !!d && d.every((fo) => Math.abs(anglesDe(fo.pts)[fo.droit] - 90) < 1e-9));
  }

  // 7. 4 × 1 → rapport 3, aire × 9
  {
    const [L, l] = [fois(Q(4), Q(3)), fois(Q(1), Q(3))];
    const [a1, a2] = [fois(Q(4), Q(1)), fois(L, l)];
    dit(7, `$4 \\times 3 = ${T(L)}$ cm et $1 \\times 3 = ${T(l)}$ cm`);
    dit(7, `$4 \\times 1 = ${T(a1)}$ cm². Grand rectangle : $${T(L)} \\times ${T(l)} = ${T(a2)}$ cm²`);
    dit(7, `$${T(a2)} \\div ${T(a1)} = ${T(div(a2, a1))}$ : l'aire a été multipliée par $${T(div(a2, a1))}$`);
    v.ok("7. 36 ÷ 4 = 3 × 3", egal(div(a2, a1), Q(9)));
    dit(7, `Réponse : $${T(L)}$ cm sur $${T(l)}$ cm ; $${T(a1)}$ cm² et $${T(a2)}$ cm² ; l'aire est multipliée par $${T(div(a2, a1))}$.`);
    const [d] = lesDessins(7);
    const r = d ? rapport(d[0].pts, d[1].pts) : null;
    v.ok("7. le dessin : rapport 3", r !== null && presque(r, 3), String(r));
    const cs = d ? cases(d[1]) : [];
    v.ok("7. le quadrillage découpe le grand en 9 copies du modèle (4 × 1)", !!d && presque(cs[0], 4) && presque(cs[1], 1) && d[1].grille[0] * d[1].grille[1] === 9, JSON.stringify(cs));
  }

  // 8. pavé 2 × 1 × 1, rapport 3
  {
    const petit = [2, 1, 1].map((x) => Q(x));
    const grand = petit.map((x) => fois(x, Q(3)));
    const vol = (t) => t.reduce((a, x) => fois(a, x), Q(1));
    dit(8, `$2 \\times 3 = ${T(grand[0])}$ cm, $1 \\times 3 = ${T(grand[1])}$ cm et $1 \\times 3 = ${T(grand[2])}$ cm`);
    dit(8, `Petite boîte : $2 \\times 1 \\times 1 = ${T(vol(petit))}$ cm³. Grande boîte : $${grand.map(T).join(" \\times ")} = ${T(vol(grand))}$ cm³`);
    const r = div(vol(grand), vol(petit));
    dit(8, `$${T(vol(grand))} \\div ${T(vol(petit))} = ${T(r)}$ : le volume est multiplié par $${T(r)} = 3 \\times 3 \\times 3 = 3^3$`);
    dit(8, `Réponse : $${T(grand[0])}$ cm, $${T(grand[1])}$ cm et $${T(grand[2])}$ cm ; $${T(vol(petit))}$ cm³ et $${T(vol(grand))}$ cm³ ; le volume est multiplié par $${T(r)}$.`);
    const pv = lesPaves(8);
    v.ok("8. le dessin : rapport 3, le grand découpé en 3 × 3 × 3 = 27", !!pv && pv.k === 3 && pv.p[1].grille === 3 && 3 ** 3 === versNombre(r));
  }

  /* ───────────────────────── ★★ Type devoir ───────────────────────── */
  v.titre("★★ Type devoir");

  // 9. 1/100 000
  {
    const d = Q(100000);
    const cm = fois(D("13,5"), d);
    const km = div(cm, Q(100000));
    const cm2 = fois(Q(21), Q(100000));
    dit(9, `$13{,}5 \\times 100\\,000 = ${T(cm)}$ cm`);
    dit(9, `$${T(cm)} \\div 100\\,000 = ${T(km)}$ km`);
    dit(9, `$21$ km $= ${T(cm2)}$ cm, et $${T(cm2)} \\div 100\\,000 = ${T(div(cm2, d))}$ cm`);
    dit(9, `$${T(cm)} \\div 1\\,000 = ${T(div(cm, Q(1000)))}$ : une balade à vélo de $${T(div(cm, Q(1000)))}$ km`);
    dit(9, `Réponse : $${T(km)}$ km ; $${T(div(cm2, d))}$ cm ; $1$ cm représente $1$ km.`);
    const [[entetes, t]] = appels(bloc(9), "tableauEch");
    v.ok("9. le tableau : carte (cm), réel (cm), réel (km)", JSON.stringify(entetes) === JSON.stringify(["carte (cm)", "réel (cm)", "réel (km)"]));
    const [carte, reelCm, reelKm] = [0, 1, 2].map((j) => t.map((l) => valeur(l[j])));
    v.ok("9. le tableau : réel (cm) = carte × 100 000", carte.every((x, i) => presque(x * 100000, reelCm[i])), JSON.stringify(t));
    v.ok("9. le tableau : réel (km) = réel (cm) ÷ 100 000, et 13,5 et 21 y sont", reelCm.every((x, i) => presque(x / 100000, reelKm[i])) && carte.includes(13.5) && reelKm.includes(21));
  }

  // 10. la maison sur une feuille A4
  {
    const [L, l] = [Q(1500), Q(960)];
    const au = (d) => [div(L, Q(d)), div(l, Q(d))];
    const [a50, a100] = [au(50), au(100)];
    dit(10, `$15$ m $= 1\\,500$ cm et $9{,}6$ m $= 960$ cm`);
    dit(10, `$1\\,500 \\div 50 = ${T(a50[0])}$ cm et $960 \\div 50 = ${T(a50[1])}$ cm`);
    dit(10, `$1\\,500 \\div 100 = ${T(a100[0])}$ cm et $960 \\div 100 = ${T(a100[1])}$ cm`);
    const A4 = [D("29,7"), Q(21)];
    v.ok("10. au 1/50, la maison dépasse la feuille ; au 1/100, elle tient", inf(A4[0], a50[0]) && !inf(A4[0], a100[0]) && !inf(A4[1], a100[1]));
    dit(10, `Un plan qui dépasse de $${T(fois(moins(a50[0], A4[0]), Q(10)))}$ mm`);
    dit(10, `Réponse : $${T(a50[0])}$ cm sur $${T(a50[1])}$ cm au $\\dfrac{1}{50}$, $${T(a100[0])}$ cm sur $${T(a100[1])}$ cm au $\\dfrac{1}{100}$ ; il choisit le $\\dfrac{1}{100}$.`);
    const ds = lesDessins(10);
    v.ok("10. deux dessins", ds.length === 2);
    ds.forEach((d, i) => {
      const [feuille, maison] = d;
      const attendu = [a50, a100][i].map(versNombre);
      v.ok(`10. dessin ${i + 1} : la feuille A4 fait 29,7 × 21`, presque(dims(feuille.pts)[0], 29.7) && presque(dims(feuille.pts)[1], 21));
      v.ok(`10. dessin ${i + 1} : la maison est dessinée ${attendu.join(" × ")}`, presque(dims(maison.pts)[0], attendu[0]) && presque(dims(maison.pts)[1], attendu[1]), JSON.stringify(dims(maison.pts)));
    });
  }

  // 11. photo → poster
  {
    const k = div(Q(40), Q(10));
    const Lp = fois(Q(15), k);
    dit(11, `$k = 40 \\div 10 = ${T(k)}$`);
    dit(11, `$15 \\times ${T(k)} = ${T(Lp)}$ cm`);
    dit(11, `$10 + 30 = 40$ cm sur $15 + 30 = ${15 + 30}$ cm. Mais $45 \\div 15 = ${T(div(Q(45), Q(15)))}$, alors que $40 \\div 10 = ${T(k)}$`);
    v.ok("11. Léo n'agrandit pas : 45 ÷ 15 ≠ 40 ÷ 10", !egal(div(Q(45), Q(15)), k));
    v.ok("11. Léo élargit : 40/45 > 10/15", inf(div(Q(10), Q(15)), div(Q(40), Q(45))));
    dit(11, `Réponse : $k = ${T(k)}$ ; le poster mesure $40$ cm sur $${T(Lp)}$ cm ; Léo obtiendrait $40$ cm sur $45$ cm`);
    const ds = lesDessins(11);
    const r1 = ds[0] ? rapport(ds[0][0].pts, ds[0][1].pts) : null;
    const r2 = ds[1] ? rapport(ds[1][0].pts, ds[1][1].pts) : 0;
    v.ok("11. le poster dessiné est la photo agrandie de 4", r1 !== null && presque(r1, 4), String(r1));
    v.ok("11. le poster de Léo n'est PAS un agrandissement de la photo", ds.length === 2 && r2 === null);
    v.ok("11. le poster de Léo est dessiné 40 × 45", !!ds[1] && presque(dims(ds[1][1].pts)[0], 40) && presque(dims(ds[1][1].pts)[1], 45));
  }

  // 12. le terrain de basket
  {
    const d = div(Q(2800), D("11,2"));
    const l = div(Q(1500), d);
    const r = div(Q(180), d);
    dit(12, `$2\\,800 \\div 11{,}2 = ${T(d)}$. L'échelle est $\\dfrac{1}{${T(d)}}$`);
    dit(12, `$1\\,500 \\div ${T(d)} = ${T(l)}$ cm`);
    dit(12, `$180 \\div ${T(d)} = ${T(r)}$ cm, soit $${T(fois(r, Q(10)))}$ mm`);
    const q1 = 11.2 / versNombre(l);
    const q2 = 28 / 15;
    v.ok("12. même forme : 11,2 ÷ 6 et 28 ÷ 15 ont le même arrondi", fr(q1, 2) === fr(q2, 2) && presque(q1, q2));
    dit(12, `$11{,}2 \\div ${T(l)} \\approx ${fr(q1, 2)}$ et $28 \\div 15 \\approx ${fr(q2, 2)}$`);
    dit(12, `échelle $\\dfrac{1}{${T(div(Q(28), D("11,2")))}}$`);
    dit(12, `Réponse : l'échelle est $\\dfrac{1}{${T(d)}}$ ; la largeur mesure $${T(l)}$ cm ; le rayon mesure $${T(fois(r, Q(10)))}$ mm.`);
    const [dd] = lesDessins(12);
    const terrain = dd?.[0];
    const cercle = dd?.find((fo) => fo.cercle)?.cercle;
    const ligne = dd?.find((fo) => fo.pts && fo.pts.length === 2)?.pts;
    v.ok("12. le terrain dessiné fait 11,2 × 6", !!terrain && presque(dims(terrain.pts)[0], 11.2) && presque(dims(terrain.pts)[1], versNombre(l)));
    v.ok("12. le cercle central : rayon 0,72, au centre du terrain", !!cercle && presque(cercle[2], versNombre(r)) && presque(cercle[0], 5.6) && presque(cercle[1], 3));
    v.ok("12. la ligne médiane coupe le terrain en deux", !!ligne && presque(ligne[0][0], 5.6) && presque(ligne[1][0], 5.6));
  }

  // 13. la barre d'échelle : 3 cm pour 2,4 km
  {
    const un = div(D("2,4"), Q(3));
    const d = fois(un, Q(100000));
    const reel = fois(D("8,5"), un);
    dit(13, `$2{,}4 \\div 3 = ${T(un)}$ km, soit $${T(fois(un, Q(1000)))}$ m`);
    dit(13, `$${T(un)}$ km $= ${T(d)}$ cm`);
    dit(13, `l'échelle est $\\dfrac{1}{${T(d)}}$`);
    dit(13, `$8{,}5 \\times ${T(un)} = ${T(reel)}$ km`);
    dit(13, `$8{,}5 \\times ${T(d)} = ${T(fois(D("8,5"), d))}$ cm $= ${T(div(fois(D("8,5"), d), Q(100000)))}$ km`);
    dit(13, `Réponse : $1$ cm représente $${T(fois(un, Q(1000)))}$ m ; l'échelle est $\\dfrac{1}{${T(d)}}$ ; les refuges sont à $${T(reel)}$ km.`);
    laRegle(13, { par: versNombre(un), unite: "km", marque: 8.5, reel: versNombre(reel) });
    v.ok("13. la règle porte l'indication de l'énoncé : 3 cm → 2,4 km", presque(3 * versNombre(un), 2.4));
  }

  // 14. le logo 36 → 4 cm²
  {
    const r = div(Q(36), Q(4));
    const racine = (n) => [...Array(20).keys()].find((x) => x * x === n);
    const k = racine(versNombre(r));
    const [c1, c2] = [racine(36), racine(4)];
    dit(14, `$36 \\div 4 = ${T(r)}$ : l'aire a été divisée par $${T(r)}$`);
    dit(14, `C'est $${k}$, car $${k} \\times ${k} = ${T(r)}$`);
    dit(14, `le rapport de réduction est $k = \\dfrac{1}{${k}}$`);
    dit(14, `$${c1} \\times ${c1} = 36$, son côté mesure $${c1}$ cm. Petit logo : $${c2} \\times ${c2} = 4$, son côté mesure $${c2}$ cm. Et $${c1} \\div ${k} = ${c2}$`);
    const faux = Math.round((6 / 9) * 100) / 100;
    dit(14, `$6 \\div 9 \\approx ${fr(6 / 9, 2)}$ cm, et l'aire $${fr(faux, 2)} \\times ${fr(faux, 2)} \\approx ${fr(faux * faux, 2)}$ cm²`);
    dit(14, `Réponse : l'aire est divisée par $${T(r)}$, les longueurs par $${k}$ ; $k = \\dfrac{1}{${k}}$ ; les côtés mesurent $${c1}$ cm et $${c2}$ cm.`);
    const [d] = lesDessins(14);
    const rr = d ? rapport(d[1].pts, d[0].pts) : null;
    v.ok("14. le dessin : le grand logo est le petit agrandi de 3", rr !== null && presque(rr, k), String(rr));
    const cs = d ? cases(d[0]) : [];
    v.ok("14. le quadrillage : le petit logo tient 9 fois dans le grand", !!d && presque(cs[0], c2) && presque(cs[1], c2) && d[0].grille[0] * d[0].grille[1] === versNombre(r));
  }

  // 15. la pelouse × 1,5
  {
    const k = D("1,5");
    const [L, l] = [fois(Q(8), k), fois(Q(5), k)];
    const [a1, a2] = [Q(40), fois(L, l)];
    const g2 = fois(a2, Q(30));
    const g1 = fois(a1, Q(30));
    dit(15, `$8 \\times 1{,}5 = ${T(L)}$ m et $5 \\times 1{,}5 = ${T(l)}$ m`);
    dit(15, `Nouvelle : $${T(L)} \\times ${T(l)} = ${T(a2)}$ m². $${T(a2)} \\div ${T(a1)} = ${T(div(a2, a1))}$`);
    v.ok("15. 90 ÷ 40 = 1,5 × 1,5", egal(div(a2, a1), fois(k, k)));
    dit(15, `$${T(a2)} \\times 30 = ${T(g2)}$ g, soit $${T(div(g2, Q(1000)))}$ kg`);
    dit(15, `$40 \\times 30 = ${T(g1)}$ g ; avec le facteur $k^2$, $${T(g1)} \\times ${T(fois(k, k))} = ${T(fois(g1, fois(k, k)))}$ g`);
    const faux = fois(g1, k);
    dit(15, `$${T(g1)} \\times 1{,}5 = ${T(faux)}$ g. Il manquerait $${T(moins(g2, faux))}$ g`);
    v.ok("15. il manquerait un tiers des graines", egal(div(moins(g2, faux), g2), Q(1, 3)));
    dit(15, `Réponse : $${T(L)}$ m sur $${T(l)}$ m ; $${T(a1)}$ m² puis $${T(a2)}$ m², soit $${T(div(a2, a1))}$ fois plus ; il faut $${T(div(g2, Q(1000)))}$ kg de graines.`);
    const [d] = lesDessins(15);
    const r = d ? rapport(d[0].pts, d[1].pts) : null;
    v.ok("15. le dessin : rapport 1,5", r !== null && presque(r, 1.5), String(r));
  }

  // 16. l'aquarium × 2
  {
    const petit = [40, 25, 30].map((x) => Q(x));
    const grand = petit.map((x) => fois(x, Q(2)));
    const vol = (t) => t.reduce((a, x) => fois(a, x), Q(1));
    const [v1, v2] = [vol(petit), vol(grand)];
    dit(16, `$40 \\times 25 \\times 30 = ${T(v1)}$ cm³`);
    dit(16, `cela fait $${T(div(v1, Q(1000)))}$ L`);
    dit(16, `$${grand.map(T).join(" \\times ")} = ${T(v2)}$ cm³, soit $${T(div(v2, Q(1000)))}$ L`);
    dit(16, `$${T(div(v2, Q(1000)))} \\div ${T(div(v1, Q(1000)))} = ${T(div(v2, v1))}$`);
    v.ok("16. 240 ÷ 30 = 2³", egal(div(v2, v1), Q(8)));
    dit(16, `prévoir $${T(fois(div(v1, Q(1000)), Q(2)))}$ L. Il manquerait $${T(moins(div(v2, Q(1000)), fois(div(v1, Q(1000)), Q(2))))}$ L`);
    dit(16, `Réponse : $${T(div(v1, Q(1000)))}$ L ; $80$ cm, $50$ cm et $60$ cm pour $${T(div(v2, Q(1000)))}$ L ; le vendeur a tort, il y a $${T(div(v2, v1))}$ fois plus d'eau.`);
    const pv = lesPaves(16);
    v.ok("16. le dessin : rapport 2, le grand découpé en 2 × 2 × 2", !!pv && pv.k === 2 && pv.p[1].grille === 2);
  }

  /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
  v.titre("★★★ Problèmes");

  // 17. le marathon
  {
    const cm = fois(D("42,195"), Q(100000));
    const ds = [25000, 50000, 100000];
    const L = ds.map((d) => div(cm, Q(d)));
    dit(17, `$42{,}195 \\times 100\\,000 = ${T(cm)}$ cm`);
    ds.forEach((d, i) => dit(17, `$${T(cm)} \\div ${T(Q(d))} = ${T(L[i])}$, environ $${fr(versNombre(L[i]), 0)}$ cm`));
    const tiennent = L.filter((x) => inf(x, Q(50)));
    v.ok("17. une seule carte tient sur 50 cm : le 1/100 000", tiennent.length === 1 && egal(tiennent[0], L[2]));
    const d1m = div(cm, Q(100));
    dit(17, `$${T(cm)} \\div 100 = ${T(d1m)}$. L'échelle serait $\\dfrac{1}{${T(d1m)}}$`);
    dit(17, `son tracé fait $${fr(versNombre(L[0]) / 100, 2)}$ m`);
    dit(17, `Réponse : $${T(cm)}$ cm ; environ $${fr(versNombre(L[0]), 0)}$ cm, $${fr(versNombre(L[1]), 0)}$ cm et $${fr(versNombre(L[2]), 0)}$ cm ; il faut la carte au $\\dfrac{1}{100\\,000}$ ; à l'échelle $\\dfrac{1}{${T(d1m)}}$, la ficelle mesurerait $1$ m.`);
    const [[lignes, limite]] = appels(bloc(17), "barres");
    propre(17, "barres", pageBarres(lignes, limite));
    v.ok("17. chaque barre a la longueur exacte, et écrit son arrondi", lignes.length === 3 && lignes.every((l, i) => l.label.startsWith(`au 1/${nombre(ds[i])} :`) && presque(l.cm, versNombre(L[i])) && valeur(l.label.split(":")[1]) === Math.round(versNombre(L[i]))), lignes.map((l) => `${l.label} (${l.cm})`).join(" | "));
    v.ok("17. le trait de la table est à 50 cm", !!limite && limite.cm === 50 && valeur(limite.label) === 50);
  }

  // 18. les deux bassins
  {
    const G = [50, 25, 2].map((x) => Q(x));
    const P = [Q(25), D("12,5"), Q(1)];
    const r = P.map((x, i) => div(x, G[i]));
    v.ok("18. les trois rapports sont égaux", r.every((x) => egal(x, r[0])));
    const k = r[0];
    dit(18, `$25 \\div 50 = ${T(r[0])}$ ; $12{,}5 \\div 25 = ${T(r[1])}$ ; $1 \\div 2 = ${T(r[2])}$`);
    const [aG, aP] = [fois(G[0], G[1]), fois(P[0], P[1])];
    const [vG, vP] = [fois(aG, G[2]), fois(aP, P[2])];
    dit(18, `Grand : $50 \\times 25 = ${T(aG)}$ m². Petit : $25 \\times 12{,}5 = ${T(aP)}$ m². $${T(aP)} \\div ${T(aG)} = ${T(div(aP, aG))}$, et $k^2 = ${T(k)} \\times ${T(k)} = ${T(fois(k, k))}$ : l'aire est divisée par $${T(div(aG, aP))}$`);
    v.ok("18. rapport des aires = k²", egal(div(aP, aG), fois(k, k)));
    dit(18, `Grand : $50 \\times 25 \\times 2 = ${T(vG)}$ m³. Petit : $25 \\times 12{,}5 \\times 1 = ${T(vP)}$ m³. $${T(vP)} \\div ${T(vG)} = ${T(div(vP, vG))}$, et $k^3 = ${T(k)} \\times ${T(k)} \\times ${T(k)} = ${T(fois(k, fois(k, k)))}$ : le volume est divisé par $${T(div(vG, vP))}$`);
    v.ok("18. rapport des volumes = k³", egal(div(vP, vG), fois(k, fois(k, k))));
    dit(18, `il en faut $${T(div(aG, aP))}$ pour le grand bassin`);
    dit(18, `le grand bassin contient $${T(fois(vG, Q(1000)))}$ L, le petit $${T(fois(vP, Q(1000)))}$ L`);
    dit(18, `Réponse : $k = ${T(k)}$ ; $${T(aG)}$ m² et $${T(aP)}$ m², rapport $${T(div(aP, aG))}$ ; $${T(vG)}$ m³ et $${T(vP)}$ m³, rapport $${T(div(vP, vG))}$ ; il faut $${T(div(aG, aP))}$ bâches.`);
    const [d] = lesDessins(18);
    const rr = d ? rapport(d[0].pts, d[1].pts) : null;
    v.ok("18. le dessin : le petit bassin est le grand réduit de 0,5", rr !== null && presque(rr, versNombre(k)), String(rr));
    const cs = d ? cases(d[0]) : [];
    v.ok("18. le quadrillage : le petit bassin tient 4 fois dans le grand", !!d && presque(cs[0], 25) && presque(cs[1], 12.5) && d[0].grille[0] * d[0].grille[1] === versNombre(div(aG, aP)));
  }

  // 19. les grêlons
  {
    const m1 = D("0,5");
    const k4 = Q(4);
    const c4 = fois(k4, fois(k4, k4));
    const c8 = fois(Q(8), fois(Q(8), Q(8)));
    dit(19, `$k = 4 \\div 1 = ${T(k4)}$`);
    dit(19, `$k^3 = 4 \\times 4 \\times 4 = ${T(c4)}$`);
    dit(19, `$0{,}5 \\times ${T(c4)} = ${T(fois(m1, c4))}$ g`);
    dit(19, `$8^3 = 8 \\times 8 \\times 8 = ${T(c8)}$. Masse : $0{,}5 \\times ${T(c8)} = ${T(fois(m1, c8))}$ g`);
    v.ok("19. 256 g, plus qu'une plaquette de 250 g", inf(Q(250), fois(m1, c8)));
    dit(19, `$2^3 = 8$ : $${T(fois(m1, c4))} \\times 8 = ${T(fois(fois(m1, c4), Q(8)))}$ g`);
    v.ok("19. de 4 cm à 8 cm : masse × 8", egal(div(fois(m1, c8), fois(m1, c4)), Q(8)));
    dit(19, `pèse $4$ fois plus, soit $${T(fois(m1, Q(4)))}$ g`);
    dit(19, `Réponse : $k = 4$ ; volume et masse multipliés par $${T(c4)}$, soit $${T(fois(m1, c4))}$ g ; par $${T(c8)}$ pour $8$ cm, soit $${T(fois(m1, c8))}$ g ; $8$ fois plus lourd.`);
    const pv = lesPaves(19);
    v.ok("19. le dessin : cube de 1, cube de 4 découpé en 4 × 4 × 4 = 64", !!pv && pv.k === 4 && pv.p[1].grille === 4 && pv.p[0].dims.every((x) => x === 1));
    v.ok("19. les noms du dessin : 0,5 g et 32 g", !!pv && valeur(pv.p[0].nom) === 0.5 && valeur(pv.p[1].nom) === versNombre(fois(m1, c4)));
  }

  // 20. l'Amazonie au 1/1 000 000
  {
    const d = Q(1000000);
    const km = div(d, Q(100000));
    const km2 = fois(km, km);
    const cm2 = div(Q(9000), km2);
    const larg = div(cm2, Q(10));
    dit(20, `$1\\,000\\,000 \\div 100\\,000 = ${T(km)}$ km`);
    dit(20, `d'aire $${T(km)} \\times ${T(km)} = ${T(km2)}$ km²`);
    dit(20, `$9\\,000 \\div ${T(km2)} = ${T(cm2)}$ cm²`);
    dit(20, `$${T(cm2)} \\div 10 = ${T(larg)}$ cm`);
    dit(20, `$${T(fois(Q(10), km))} \\times ${T(fois(larg, km))} = 9\\,000$ km²`);
    v.ok("20. contrôle : 100 km × 90 km = 9 000 km²", egal(fois(fois(Q(10), km), fois(larg, km)), Q(9000)));
    v.ok("20. l'erreur d'Inès : 9 000 ÷ 10 = 900, dix fois trop", egal(div(Q(9000), km), Q(900)) && egal(div(Q(900), cm2), Q(10)));
    dit(20, `Réponse : $1$ cm représente $${T(km)}$ km ; $1$ cm² représente $${T(km2)}$ km² ; $${T(cm2)}$ cm², par exemple un rectangle de $10$ cm sur $${T(larg)}$ cm`);
    const ds = lesDessins(20);
    const [g, dr] = [ds[0]?.[0], ds[1]?.[0]];
    v.ok("20. à gauche : 10 km × 10 km quadrillé en 100 carrés de 1 km²", !!g && presque(dims(g.pts)[0], versNombre(km)) && g.grille[0] * g.grille[1] === versNombre(km2) && presque(cases(g)[0], 1));
    v.ok("20. à droite : 10 cm × 9 cm quadrillé en 90 carrés de 1 cm²", !!dr && presque(dims(dr.pts)[0], 10) && presque(dims(dr.pts)[1], versNombre(larg)) && dr.grille[0] * dr.grille[1] === versNombre(cm2) && presque(cases(dr)[0], 1) && presque(cases(dr)[1], 1));
    v.ok("20. le nom du dessin dit 90 cm² pour 9 000 km²", !!dr && dr.nom === `${nombre(versNombre(cm2))} cm² : 9 000 km²`);
  }

  /* ───────────────────────── Les dessins ───────────────────────── */
  v.titre("Les dessins");
  const dessines = f.blocs.filter((b) => /schema: (regle|barres|dessin|paves|tableauEch|deux)\(/.test(b)).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20);
  const schemas = f.blocs.map((b) => (b.split("schema:")[1] ?? "").split("micros:")[0]);
  v.ok("aucun $ ni antislash dans un dessin (SVG, pas de KaTeX)", schemas.every((s) => !/[$\\]/.test(s)), schemas.find((s) => /[$\\]/.test(s))?.slice(0, 100));
  const polices = [...source.matchAll(/fontSize=\{(\d+)\}/g)].map((m) => Number(m[1]));
  v.ok(`${polices.length} textes de SVG en police 15 au moins (11,75 px à 235 px de large)`, polices.length > 0 && polices.every((p) => p >= 15), polices.join(","));
  const formules = f.textes.flatMap((t) => t.match(/\$[^$]*\$/g) ?? []);
  v.ok(`aucun « % » nu dans ${formules.length} formules`, formules.every((m) => !/(^|[^\\])%/.test(m)));
  v.ok("la fiche de cours et le coach de 4e", source.includes('href: "/fiches-cours/maths/4e/prop-echelle"') && source.includes('coachHref: "/coach-ia/maths?classe=4e"') && source.includes('notion: "prop-echelle"'));
}

lancer({
  nom: "ÉCHELLES, AGRANDISSEMENTS ET RÉDUCTIONS · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-echelles.tsx",
  notionId: "prop_echelle",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : 1 cm lu 2 000 m sur la règle", "regle({ n: 5, par: 200, unite: \"m\", pas: 1, marque: 5 })", "regle({ n: 5, par: 2000, unite: \"m\", pas: 1, marque: 5 })"],
    ["ex. 2 : une barre dessinée à la mauvaise longueur", "{ label: \"au 1/40 000 : 2,5 cm\", cm: 2.5 }", "{ label: \"au 1/40 000 : 2,5 cm\", cm: 4 }"],
    ["ex. 2 : un zéro de trop", "Réponse : $10$ cm, $2{,}5$ cm et $0{,}5$ cm", "Réponse : $10$ cm, $2{,}5$ cm et $0{,}05$ cm"],
    ["ex. 3 : la conversion ratée", "sont à $370$ m l'un de l'autre.", "sont à $37$ m l'un de l'autre."],
    ["ex. 3 : la marque rouge mal placée", "marque: 7.4 })", "marque: 4.7 })"],
    ["ex. 4 : des mètres divisés par un dénominateur en cm", "Réponse : le terrain mesure $5$ cm sur le plan.", "Réponse : le terrain mesure $0{,}05$ cm sur le plan."],
    ["ex. 5 : ajouter au lieu de multiplier", "Réponse : $k = 2{,}5$ et la largeur mesure $5$ cm.", "Réponse : $k = 2{,}5$ et la largeur mesure $6{,}5$ cm."],
    ["ex. 5 : l'agrandi dessiné en ajoutant 4,5 cm", "[12.5, 5], [5, 5]], cotes: [\"7,5 cm\", \"5 cm\"]", "[12.5, 6.5], [5, 6.5]], cotes: [\"7,5 cm\", \"6,5 cm\"]"],
    ["ex. 5 : un nom trop long, qui sort du cadre", "nom: \"× 2,5\"", "nom: \"agrandissement de rapport 2,5\""],
    ["ex. 6 : le triangle réduit déformé", "[[34, 0], [46, 0], [34, 9]]", "[[34, 0], [46, 0], [35, 9]]"],
    ["ex. 7 : l'aire multipliée par k", "l'aire est multipliée par $9$.", "l'aire est multipliée par $3$."],
    ["ex. 7 : le quadrillage qui ne fait que 3 cases", "nom: \"rapport 3\", fond: \"orange\", grille: [3, 3]", "nom: \"rapport 3\", fond: \"orange\", grille: [3, 1]"],
    ["ex. 8 : le volume multiplié par k", "le volume est multiplié par $27$.", "le volume est multiplié par $3$."],
    ["ex. 8 : le grand pavé déformé", "{ dims: [6, 3, 3]", "{ dims: [6, 3, 2]"],
    ["ex. 9 : des cm aux km par 1 000", "Réponse : $13{,}5$ km ; $21$ cm", "Réponse : $1\\\\,350$ km ; $21$ cm"],
    ["ex. 9 : une case fausse dans le tableau", "[\"21\", \"2 100 000\", \"21\"]", "[\"21\", \"210 000\", \"21\"]"],
    ["ex. 10 : la maison du 1/100 dessinée au 1/50 en largeur", "[15, 9.6], [0, 9.6]], cotes: [\"15 cm\", \"9,6 cm\"]", "[15, 19.2], [0, 19.2]], cotes: [\"15 cm\", \"19,2 cm\"]"],
    ["ex. 11 : le poster de Léo dessiné sans déformation", "[[16, 0], [56, 0], [56, 45], [16, 45]], cotes: [\"40 cm\", \"45 cm\"]", "[[16, 0], [56, 0], [56, 60], [16, 60]], cotes: [\"40 cm\", \"60 cm\"]"],
    ["ex. 12 : le cercle central dessiné en mètres", "{ cercle: [5.6, 3, 0.72] }", "{ cercle: [5.6, 3, 1.8] }"],
    ["ex. 12 : l'échelle 1/2,5", "Réponse : l'échelle est $\\\\dfrac{1}{250}$", "Réponse : l'échelle est $\\\\dfrac{1}{2{,}5}$"],
    ["ex. 13 : la règle qui vaut 0,6 km par cm", "par: 0.8", "par: 0.6"],
    ["ex. 14 : le rapport des aires pris pour celui des longueurs", "les côtés mesurent $6$ cm et $2$ cm.", "les côtés mesurent $6$ cm et $0{,}67$ cm."],
    ["ex. 15 : les graines multipliées par k", "il faut $2{,}7$ kg de graines.", "il faut $1{,}8$ kg de graines."],
    ["ex. 16 : le vendeur cru", "il y a $8$ fois plus d'eau.", "il y a $2$ fois plus d'eau."],
    ["ex. 17 : une barre à la mauvaise longueur", "cm: 84.39", "cm: 48.39"],
    ["ex. 17 : un arrondi faux", "environ $169$ cm, $84$ cm et $42$ cm", "environ $169$ cm, $84$ cm et $4$ cm"],
    ["ex. 18 : le volume divisé par 2", "rapport $0{,}125$ ; il faut $4$ bâches.", "rapport $0{,}5$ ; il faut $4$ bâches."],
    ["ex. 18 : les bâches comptées à la longueur", "il en faut $4$ pour le grand bassin", "il en faut $2$ pour le grand bassin"],
    ["ex. 19 : la masse multipliée par k", "soit $32$ g ; par $512$", "soit $2$ g ; par $512$"],
    ["ex. 19 : le grand cube découpé en 27", "nom: \"32 g\", grille: 4", "nom: \"32 g\", grille: 3"],
    ["ex. 20 : l'aire lue avec k et pas k²", "$1$ cm² représente $100$ km² ; $90$ cm²", "$1$ cm² représente $10$ km² ; $900$ cm²"],
    ["ex. 20 : le quadrillage faux", "grille: [10, 9]", "grille: [9, 9]"],
    ["une police de 12 dans un dessin", "fontSize={15} fontWeight={800} fill={BLEU}>cm</text>", "fontSize={12} fontWeight={800} fill={BLEU}>cm</text>"],
    ["un $ dans un dessin", "nom: \"36 cm²\"", "nom: \"$36$ cm²\""],
    ["une micro d'une autre notion", "micros: [\"echelle_distance_plan\"]", "micros: [\"prop_coeff\"]"],
  ],
});
