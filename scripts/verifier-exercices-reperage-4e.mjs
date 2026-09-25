// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Se repérer » de 4e
// (lib/fiches-exercices/maths-4e-reperage.tsx).
//
// ⭐ L'AUTRE CHEMIN :
// - les droites graduées sont RELUES dans le source (`graduee({ min, max, pas,
//   sous, lus, points })`) : chaque abscisse est recalculée en fraction exacte à
//   partir du nombre de parts, et l'étiquette dessinée (« B 7/3 », « −16,25 »)
//   doit dire la même valeur que le point ;
// - les points du plan sont relus dans les appels `vecteurs(…)` ; chaque
//   déplacement est REJOUÉ ordre par ordre avec « vers le haut = + » (le bug de
//   l'ordonnée écran), et les flèches dessinées doivent suivre ce trajet ;
// - symétriques, milieux et quatrièmes sommets sont recalculés en entiers ;
// - les pavés sont reconstruits à partir de leurs dimensions ; leurs arêtes
//   cachées retrouvées par l'enveloppe convexe des sommets et l'orientation des
//   faces vers l'œil de la perspective cavalière ;
// - le Rubik's Cube est ÉNUMÉRÉ (27 triplets) ;
// - les lieux sont confrontés à une table de coordonnées décimales (GeoNames),
//   arrondies ici au degré ; les distances au pôle, par haversine.
//
//   node scripts/verifier-exercices-reperage-4e.mjs

import { Q, D, egal, inf, plus, moins, fois, div, texFrac, lireFeuille, outilsEgalites, lancer } from "./verifier-exercices-commun.mjs";

/* ── Écritures ─────────────────────────────────────────────────────────── */
const tx = (n) => String(n).replace(".", "{,}");
const pt2 = ([x, y]) => `(${tx(x)}\\,;\\,${tx(y)})`;
const pt3 = ([x, y, z]) => `(${tx(x)}\\,;\\,${tx(y)}\\,;\\,${tx(z)})`;
const milliers = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
const memes = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const versQ = (x) => D(String(x));

/* ── Lecture des appels de dessin dans le source d'un exercice ─────────── */
const roleEn = (bloc, idx) => {
  const avant = bloc.slice(0, idx);
  return avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema";
};
function appels(bloc, nom) {
  const res = [];
  for (const m of bloc.matchAll(new RegExp(`\\b${nom}\\(`, "g"))) {
    const i = m.index + m[0].length - 1;
    let prof = 0;
    let j = i;
    for (; j < bloc.length; j++) {
      if (bloc[j] === "(") prof++;
      else if (bloc[j] === ")" && --prof === 0) break;
    }
    res.push({ role: roleEn(bloc, m.index), texte: bloc.slice(i + 1, j) });
  }
  return res;
}
function graduees(bloc) {
  return appels(bloc, "graduee").map(({ role, texte }) => {
    const num = (cle) => {
      const m = new RegExp(`\\b${cle}: (-?[\\d.]+)`).exec(texte);
      return m ? Number(m[1]) : undefined;
    };
    const lus = /lus: \[([^\]]*)\]/.exec(texte)?.[1].split(",").map(Number);
    const points = [...texte.matchAll(/\{ v: (-?\d+(?:\.\d+)?)(?: \/ (\d+))?, nom: "([^"]*)"(?:, texte: "([^"]*)")?(?:, couleur: (\w+))? \}/g)].map((m) => ({
      q: m[2] ? Q(m[1], m[2]) : D(m[1]),
      nom: m[3],
      texte: m[4],
      couleur: m[5],
    }));
    return { role, min: num("min"), max: num("max"), pas: num("pas"), sous: num("sous") ?? 1, lus, points };
  });
}
function plans(bloc) {
  return appels(bloc, "vecteurs").map(({ role, texte }) => {
    const f = /^\s*\[(-?\d+), (-?\d+)\]/.exec(texte);
    const fleches = [...texte.matchAll(/\{ de: \[(-?\d+), (-?\d+)\], vers: \[(-?\d+), (-?\d+)\](, couleur: \w+)?(, pointe: false)? \}/g)].map((m) => ({
      de: [+m[1], +m[2]],
      vers: [+m[3], +m[4]],
      segment: !!m[6],
    }));
    const points = Object.fromEntries([...texte.matchAll(/\{ x: (-?\d+), y: (-?\d+), label: "(\w+)" \}/g)].map((m) => [m[3], [+m[1], +m[2]]]));
    return { role, fenetre: f ? [+f[1], +f[2]] : null, fleches, points };
  });
}
function paves(bloc) {
  return appels(bloc, "pave").map(({ role, texte }) => {
    const m = /^(\d+), (\d+), (\d+), (\[[^\]]*\])/.exec(texte);
    return {
      role,
      dims: m ? [+m[1], +m[2], +m[3]] : null,
      cachees: m ? JSON.parse(m[4]) : [],
      points: Object.fromEntries([...texte.matchAll(/\{ nom: "(\w+)", p: \[(-?[\d.]+), (-?[\d.]+), (-?[\d.]+)\]/g)].map((x) => [x[1], [+x[2], +x[3], +x[4]]])),
      boites: [...texte.matchAll(/\{ de: \[(\d+), (\d+), (\d+)\], a: \[(\d+), (\d+), (\d+)\], couleur: (\w+) \}/g)].map((x) => ({ de: [+x[1], +x[2], +x[3]], a: [+x[4], +x[5], +x[6]], couleur: x[7] })),
    };
  });
}
const lieux = (bloc) => Object.fromEntries([...bloc.matchAll(/\{ nom: "([^"]+)", lat: (-?\d+), lon: (-?\d+)/g)].map((m) => [m[1], [+m[2], +m[3]]]));

/** La valeur écrite à la fin d'une étiquette (« B 7/3 », « −16,25 »), ou null. */
function valeurEtiquette(t) {
  const tok = t.split(" ").pop().replace("−", "-");
  if (/^-?\d+\/\d+$/.test(tok)) return Q(...tok.split("/"));
  if (/^-?\d+(,\d+)?$/.test(tok)) return D(tok);
  return null;
}

/* ── Géométrie dans l'espace (enveloppe convexe, perspective cavalière) ─ */
const K = 0.5 * Math.SQRT1_2;
const VERS_OEIL = [K, -1, K];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const trie = (nom) => [...nom].sort().join("");
function enveloppe(sommets) {
  const noms = Object.keys(sommets);
  const P = noms.map((n) => sommets[n]);
  const faces = new Map();
  for (let i = 0; i < P.length; i++)
    for (let j = i + 1; j < P.length; j++)
      for (let k = j + 1; k < P.length; k++) {
        let n = cross(sub(P[j], P[i]), sub(P[k], P[i]));
        const L = Math.hypot(...n);
        if (L < 1e-9) continue;
        n = n.map((x) => x / L);
        const d = P.map((q) => dot(n, sub(q, P[i])));
        const pos = d.some((x) => x > 1e-6);
        const neg = d.some((x) => x < -1e-6);
        if (pos && neg) continue;
        const sur = noms.filter((_, m) => Math.abs(d[m]) <= 1e-6);
        const cle = [...sur].sort().join(",");
        if (!faces.has(cle)) faces.set(cle, { sommets: sur, normale: pos ? n.map((x) => -x) : n });
      }
  const liste = [...faces.values()];
  const aretes = [];
  for (let i = 0; i < noms.length; i++)
    for (let j = i + 1; j < noms.length; j++) {
      const communes = liste.filter((f) => f.sommets.includes(noms[i]) && f.sommets.includes(noms[j]));
      if (communes.length === 2) aretes.push({ nom: trie(noms[i] + noms[j]), cachee: communes.every((f) => dot(f.normale, VERS_OEIL) < 0) });
    }
  return { aretes, cachees: aretes.filter((a) => a.cachee).map((a) => a.nom).sort() };
}
const sommetsPave = (a, b, c) => ({ A: [0, 0, 0], B: [a, 0, 0], C: [a, b, 0], D: [0, b, 0], E: [0, 0, c], F: [a, 0, c], G: [a, b, c], H: [0, b, c] });
const milieu3 = (p, q) => p.map((x, i) => (x + q[i]) / 2);

/* ── La Terre ──────────────────────────────────────────────────────────── */
// GeoNames, en degrés décimaux (Nord et Est positifs).
const VILLES = {
  "Rio de Janeiro": [-22.906, -43.182],
  "New York": [40.714, -74.006],
  Naples: [40.852, 14.268],
  Lima: [-12.043, -77.028],
  "mont Blanc": [45.833, 6.865],
  Kilimandjaro: [-3.076, 37.353],
  Aconcagua: [-32.653, -70.011],
  Everest: [27.988, 86.925],
  Wellington: [-41.287, 174.776],
};
const ALTITUDES = { "mont Blanc": 4805.59, Kilimandjaro: 5895, Aconcagua: 6961, Everest: 8848.86 };
const r0 = (x) => (Math.round(x) === 0 ? 0 : Math.round(x));
const geo = (lat, lon) => {
  const [la, lo] = [r0(lat), r0(lon)];
  const L = la === 0 ? "0°" : `${Math.abs(la)}° ${la > 0 ? "N" : "S"}`;
  const G = lo === 0 ? "0°" : `${Math.abs(lo)}° ${lo > 0 ? "E" : "O"}`;
  return `(${L} ; ${G})`;
};
const TOUR = 40008; // km, par les pôles (WGS 84)
function haversine([la1, lo1], [la2, lo2]) {
  const r = (d) => (d * Math.PI) / 180;
  const h = Math.sin(r(la2 - la1) / 2) ** 2 + Math.cos(r(la1)) * Math.cos(r(la2)) * Math.sin(r(lo2 - lo1) / 2) ** 2;
  return (TOUR / Math.PI) * Math.asin(Math.sqrt(h));
}
/** Une écriture « (95° N ; 20° E) » désigne-t-elle un lieu ? */
function lieuPossible(t) {
  const m = /\((\d+)°(?: ([NS]))? ; (\d+)°(?: ([EO]))?\)/.exec(t);
  return !!m && +m[1] <= 90 && +m[3] <= 180;
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const { enonces, corrections, blocs } = f;
  const e = (k) => enonces[k - 1] ?? "";
  const c = (k) => corrections[k - 1] ?? "";
  const b = (k) => blocs[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");
  const enonceDit = (k, phrase) => v.ok(`${k}. l'énoncé donne « ${phrase} »`, e(k).includes(phrase), "absent de l'énoncé");
  const egalites = outilsEgalites(v, f);

  /* ── Contrôles de toute la feuille ──────────────────────────────────── */
  v.titre("Les dessins de la feuille");
  const dessines = blocs.filter((bl) => /\bschema:/.test(bl.split(/\n\s+micros:/)[0])).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20, `${dessines}`);

  const dollars = blocs
    .map((bl, i) => [i + 1, bl.split(/\n\s+micros:/)[0].replace(/\bcorrection:\s*\n?\s*"(?:[^"\\]|\\.)*"/, "").replace(/^\s*"(?:[^"\\]|\\.)*"/, "")])
    .filter(([, t]) => /(schema|figure):/.test(t) && t.includes("$"));
  v.ok("aucun $ dans les schémas et les figures", dollars.length === 0, dollars.map(([k]) => k).join(", "));

  // Les droites graduées : points dans le cadre, étiquette = valeur, lisibilité.
  let nbDroites = 0;
  const fautesDroites = [];
  blocs.forEach((bl, i) => {
    for (const g of graduees(bl)) {
      nbDroites++;
      const majeures = Math.round((g.max - g.min) / g.pas) + 1;
      if (majeures > 11) fautesDroites.push(`${i + 1} : ${majeures} graduations chiffrées`);
      for (const l of g.lus ?? []) if (!Number.isInteger((l - g.min) / g.pas)) fautesDroites.push(`${i + 1} : ${l} n'est pas une graduation`);
      for (const p of g.points) {
        if (!(inf(versQ(g.min), p.q) && inf(p.q, versQ(g.max)))) fautesDroites.push(`${i + 1} : ${p.nom} hors du cadre`);
        if (p.texte) {
          const val = valeurEtiquette(p.texte);
          if (val && !egal(val, p.q)) fautesDroites.push(`${i + 1} : l'étiquette « ${p.texte} » ne dit pas la valeur du point`);
        }
      }
    }
  });
  v.ok(`${nbDroites} droites graduées : points dans le cadre, étiquettes justes, 11 graduations au plus`, nbDroites >= 10 && fautesDroites.length === 0, fautesDroites.join(" | "));

  // Les repères du plan : points à 2 carreaux des bords, hors des axes.
  let nbPlans = 0;
  const fautesPlans = [];
  blocs.forEach((bl, i) => {
    for (const p of plans(bl)) {
      nbPlans++;
      const [mn, mx] = p.fenetre ?? [0, 0];
      if (!(mn < 0 && mx > 0)) fautesPlans.push(`${i + 1} : fenêtre ${p.fenetre}`);
      for (const [l, [x, y]] of Object.entries(p.points)) {
        if ([x, y].some((t) => t < mn + 2 || t > mx - 2)) fautesPlans.push(`${i + 1} : ${l}(${x} ; ${y}) à moins de 2 carreaux du bord`);
        if (x === 0 || y === 0) fautesPlans.push(`${i + 1} : ${l} sur un axe`);
      }
    }
  });
  v.ok(`${nbPlans} repères : points à 2 carreaux au moins du bord, hors des axes`, nbPlans === 8 && fautesPlans.length === 0, fautesPlans.join(" | "));

  // Les pavés : les pointillés sont les arêtes cachées à l'œil.
  const def = source.slice(source.indexOf("const pave = "));
  const aretesPave = JSON.parse(/aretes: (\[[^\]]*\])/.exec(def)[1]);
  let nbPaves = 0;
  const fautesPaves = [];
  blocs.forEach((bl, i) => {
    for (const p of paves(bl)) {
      nbPaves++;
      const env = enveloppe(sommetsPave(...p.dims));
      if (!memes(aretesPave.map(trie).sort(), env.aretes.map((a) => a.nom).sort())) fautesPaves.push(`${i + 1} : arêtes tracées`);
      if (!memes(p.cachees.map(trie).sort(), env.cachees)) fautesPaves.push(`${i + 1} : pointillés ${p.cachees} au lieu de ${env.cachees}`);
    }
  });
  v.ok(`${nbPaves} pavés : pointillés = arêtes cachées à l'œil`, nbPaves === 3 && fautesPaves.length === 0, fautesPaves.join(" | "));

  // Les lieux écrits dans le texte, contre la table.
  v.titre("Les lieux, contre GeoNames");
  const piege20 = "« Everest (87° N ; 28° E) »";
  v.ok("20. l'énoncé donne le piège : l'Everest aux coordonnées inversées", e(20).includes(piege20) && `(87° N ; 28° E)` === geo(VILLES.Everest[1], VILLES.Everest[0]));
  const tout = [...enonces, ...corrections].join("\n").replace(piege20, "");
  for (const [nom, pos] of Object.entries(VILLES)) {
    const lus = [...tout.matchAll(new RegExp(`${nom} (\\([^)]*\\))`, "g"))].map((m) => m[1]);
    if (lus.length) v.ok(`${nom} ${geo(...pos)} partout où il est écrit (${lus.length} fois)`, lus.every((t) => t === geo(...pos)), `lu ${lus.join(" | ")}`);
  }

  /* ── ★ Un seul geste ─────────────────────────────────────────────────── */
  v.titre("★ Un seul geste");
  {
    const [fig, sch] = [graduees(b(1)).find((g) => g.role === "figure"), graduees(b(1)).find((g) => g.role === "schema")];
    v.ok("1. la figure ne chiffre que 0 et 3, graduées de 3 en 3", !!fig && memes(fig.lus, [0, 3]) && fig.pas === 3);
    const P = Object.fromEntries((fig?.points ?? []).map((p) => [p.nom, p.q]));
    v.ok("1. le schéma montre les mêmes points que la figure", !!sch && sch.points.every((p) => egal(p.q, P[p.nom])) && sch.points.length === 2);
    const pas = Q(fig?.pas ?? 1);
    const nK = div(P.K, pas);
    const nL = div(P.L, pas);
    v.ok(`1. K à ${-Number(nK.n)} graduations à gauche, L à ${nL.n} à droite`, nK.d === 1n && nL.d === 1n && nK.n < 0n && nL.n > 0n);
    dit(1, `à $${-nK.n}$ graduations : $${-nK.n} \\times 3 = ${-nK.n * 3n}$, et à gauche`);
    dit(1, `L'abscisse de $K$ est $${texFrac(P.K)}$`);
    dit(1, `à $${nL.n}$ graduations : $${nL.n} \\times 3 = ${texFrac(P.L)}$`);
    const KL = moins(P.L, P.K);
    egalites(1, `KL = 12 - (-9) = 12 + 9 = 21`.replace("KL = ", ""));
    v.ok(`1. KL = ${KL.n}`, egal(KL, Q(21)) && c(1).includes(`$KL = 12 - (-9) = 12 + 9 = ${KL.n}$`));
    dit(1, `il y a $${div(KL, pas).n}$ graduations de $3$, et $${div(KL, pas).n} \\times 3 = ${KL.n}$`);
    dit(1, "répondre $-3$ et $4$", "le piège : les graduations sans le pas");
  }
  {
    const pas = D("0.5");
    const M = { A: D("2.5"), B: D("-1.5"), C: Q(-3) };
    enonceDit(2, "d'abscisses $2{,}5$, $-1{,}5$ et $-3$");
    enonceDit(2, "chaque graduation vaut $0{,}5$");
    const n = Object.fromEntries(Object.entries(M).map(([l, x]) => [l, div(x, pas)]));
    v.ok("2. 5, −3, −6 graduations", egal(n.A, Q(5)) && egal(n.B, Q(-3)) && egal(n.C, Q(-6)));
    dit(2, "$2{,}5 \\div 0{,}5 = 5$, donc $5$ graduations à droite");
    dit(2, "$1{,}5 \\div 0{,}5 = 3$, et le signe est moins : $3$ graduations à gauche");
    dit(2, "$3 \\div 0{,}5 = 6$, donc $6$ graduations à gauche");
    const ordre = ["A", "B", "C", "O"].map((l) => [l, M[l] ?? Q(0)]).sort((x, y) => (inf(x[1], y[1]) ? -1 : 1)).map(([l]) => `$${l}$`).join(", ");
    dit(2, `De gauche à droite : ${ordre}.`);
    const sch = graduees(b(2)).find((g) => g.role === "schema");
    const pasFin = sch ? div(versQ(sch.pas), Q(sch.sous)) : Q(1);
    v.ok("2. le schéma : une petite graduation vaut 0,5, les points à leur place et sur une graduation", !!sch && egal(pasFin, pas) && sch.points.length === 3 && sch.points.every((p) => egal(p.q, M[p.nom]) && div(moins(p.q, versQ(sch.min)), pasFin).d === 1n));
  }
  {
    const gs = graduees(b(3));
    const fig = gs.find((g) => g.role === "figure");
    const sch = gs.find((g) => g.role === "schema");
    v.ok("3. une unité en 3 parts, le schéma reprend les points de la figure", !!fig && fig.sous === 3 && !!sch && sch.sous === 3 && memes(sch.points.map((p) => [p.nom, `${p.q.n}/${p.q.d}`]), fig.points.map((p) => [p.nom, `${p.q.n}/${p.q.d}`])));
    for (const p of fig?.points ?? []) {
      const parts = fois(p.q, Q(fig.sous));
      v.ok(`3. ${p.nom} sur une graduation (${parts.n} parts)`, parts.d === 1n);
      dit(3, `à $${parts.n < 0n ? -parts.n : parts.n}$ parts à ${parts.n < 0n ? "gauche" : "droite"}`, `${p.nom} : ${parts.n} parts`);
      dit(3, `$${p.nom}$ a pour abscisse $${texFrac(p.q)}$`);
    }
    const B = fig?.points.find((p) => p.nom === "B")?.q ?? Q(0);
    const ent = B.n / B.d;
    dit(3, `$${B.n} = ${B.d} \\times ${ent} + ${B.n - B.d * ent}$`);
    dit(3, "écrire $\\dfrac{3}{2}$ pour $A$", "le piège : la fraction retournée");
  }
  {
    const M = { D: Q(9, 4), E: Q(-5, 4), F: Q(3, 2) };
    enonceDit(4, "d'abscisses $\\dfrac{9}{4}$, $-\\dfrac{5}{4}$ et $\\dfrac{3}{2}$");
    const encadre = (q) => {
      let a = Q(-10);
      while (!inf(q, plus(a, Q(1)))) a = plus(a, Q(1));
      return [a.n, a.n + 1n];
    };
    const [d0, d1] = encadre(M.D);
    const [e0, e1] = encadre(M.E);
    dit(4, `$9 = 4 \\times ${d0} + ${9n - 4n * d0}$`);
    dit(4, `$5 = 4 \\times 1 + 1$`);
    dit(4, `Réponse : $${d0} < \\dfrac{9}{4} < ${d1}$ et $${e0} < -\\dfrac{5}{4} < ${e1}$`);
    dit(4, "$-\\dfrac{5}{4} = -1{,}25$ est PLUS PETIT que $-1$");
    v.ok("4. −5/4 = −1,25", egal(M.E, D("-1.25")));
    const parts = Object.fromEntries(Object.entries(M).map(([l, q]) => [l, fois(q, Q(4))]));
    dit(4, `$D$ à $${parts.D.n}$ parts à droite, $E$ à $${-parts.E.n}$ parts à gauche, $F$ à $${parts.F.n}$ parts à droite`);
    dit(4, `$\\dfrac{3}{2} = \\dfrac{${parts.F.n}}{4}$`);
    const sch = graduees(b(4)).find((g) => g.role === "schema");
    v.ok("4. le schéma : unité en 4 parts, D, E, F à leur place", !!sch && sch.sous === 4 && sch.points.length === 3 && sch.points.every((p) => egal(p.q, M[p.nom])));
  }
  {
    const [fig, sch] = [plans(b(5)).find((p) => p.role === "figure"), plans(b(5)).find((p) => p.role === "schema")];
    const P = fig?.points ?? {};
    const V = [-5, -3];
    enonceDit(5, `Placer le point $V${pt2(V)}$`);
    dit(5, `a) ${["R", "S", "T", "U"].map((l) => `$${l}${pt2(P[l] ?? [])}$`).join(", ").replace(/, (\$U)/, " et $1")}`);
    v.ok("5. le schéma reprend R, S, T, U et place V", !!sch && ["R", "S", "T", "U"].every((l) => memes(sch.points[l], P[l])) && memes(sch.points.V, V));
    const guides = (sch?.fleches ?? []).filter((x) => x.segment).map((x) => JSON.stringify([x.de, x.vers]));
    v.ok("5. les deux traits orange vont des axes à V", memes(guides.sort(), [JSON.stringify([[V[0], 0], V]), JSON.stringify([[0, V[1]], V])].sort()));
    dit(5, `j'avance de $${-V[0]}$ carreaux vers la GAUCHE (abscisse négative), puis je descends de $${-V[1]}$ carreaux`);
    dit(5, `$S${pt2([P.S?.[1], P.S?.[0]])}$`, "le piège : S lu à l'envers");
  }

  /** Rejoue des ordres [axe, pas] depuis `depart` — l'axe 1 (ordonnée) MONTE. */
  const rejouer = (depart, ordres) => {
    const etapes = [depart];
    for (const [axe, d] of ordres) {
      const q = [...etapes.at(-1)];
      q[axe] += d;
      etapes.push(q);
    }
    return etapes;
  };
  /** Les flèches du schéma suivent-elles le trajet, étape par étape ? */
  const cheminDessine = (k, etapes) => {
    const fl = (plans(b(k)).find((p) => p.role === "schema")?.fleches ?? []).filter((x) => !x.segment);
    const attendu = etapes.slice(1).map((q, i) => [etapes[i], q]);
    v.ok(`${k}. les ${fl.length} flèches du schéma suivent le trajet`, memes(fl.map((x) => [x.de, x.vers]), attendu), JSON.stringify(fl.map((x) => [x.de, x.vers])));
  };
  {
    const M = [-2, 1];
    enonceDit(6, `Le point $M${pt2(M)}$ se déplace de $4$ carreaux vers le haut`);
    const et = rejouer(M, [[1, 4], [0, 3], [1, -6]]);
    const [N, , P] = [et[1], et[2], et[3]];
    dit(6, `Donc $N${pt2(N)}$`);
    dit(6, `Donc $P${pt2(P)}$`);
    dit(6, `$1 + 4 = ${N[1]}$`);
    dit(6, `$5 - 6 = ${P[1]}$`);
    const ecran = rejouer(M, [[1, -4]])[1];
    dit(6, `On trouverait $N${pt2(ecran)}$`, "le piège de l'écran, calculé");
    cheminDessine(6, et);
    const pts = plans(b(6))[0]?.points ?? {};
    v.ok("6. M, N, P dessinés à leur place", memes(pts.M, M) && memes(pts.N, N) && memes(pts.P, P));
  }
  {
    const dims = /\$AB = (\d+)\$, \$AD = (\d+)\$ et \$AE = (\d+)\$/.exec(e(7))?.slice(1).map(Number) ?? [];
    const S = sommetsPave(...dims);
    const nomDe = (p) => Object.keys(S).find((n) => memes(S[n], p));
    dit(7, `C'est le sommet $${nomDe([6, 2, 0])}$, au sol`);
    dit(7, `C'est le sommet $${nomDe([0, 2, 3])}$, en haut`);
    dit(7, `Donc $F${pt3(S.F)}$`);
    const zeros = S.B.filter((x) => x === 0).length;
    dit(7, `$B${pt3(S.B)}$ a ${zeros === 2 ? "deux" : zeros} coordonnées nulles`);
    v.ok("7. une profondeur de 3 sort du pavé", 3 > dims[1]);
    dit(7, `Le pavé n'a que $${dims[1]}$ de profondeur`);
    v.ok("7. le pavé dessiné a les dimensions de l'énoncé", memes(paves(b(7))[0]?.dims, dims));
  }
  {
    const rio = geo(...VILLES["Rio de Janeiro"]);
    enonceDit(8, `Rio de Janeiro a pour coordonnées géographiques ${rio}`);
    dit(8, `${rio.slice(1).split(" ; ")[0]} : Rio est au sud de l'équateur`);
    dit(8, "elle est à l'ouest de Greenwich");
    const ecritures = [...e(8).matchAll(/\(\d+°(?: [NS])? ; \d+°(?: [EO])?\)/g)].map((m) => m[0]).filter((t) => t !== rio);
    v.ok(`8. quatre écritures proposées`, ecritures.length === 4);
    for (const t of ecritures) dit(8, `${t} ${lieuPossible(t) ? "existe" : "est impossible"}`.replace("(0° ; 180°) existe", "(0° ; 180°) aussi"), `${t} : ${lieuPossible(t) ? "possible" : "impossible"}`);
    v.ok("8. 170° O est à l'est de la Nouvelle-Zélande (au-delà de 180°)", 360 - 170 > VILLES.Wellington[1]);
    const w = lieux(b(8)).Rio;
    v.ok("8. le globe place Rio au degré près, angle compris", !!w && w[0] === r0(VILLES["Rio de Janeiro"][0]) && w[1] === r0(VILLES["Rio de Janeiro"][1]) && /angle: true/.test(b(8)));
  }

  /* ── ★★ Type devoir ──────────────────────────────────────────────────── */
  v.titre("★★ Type devoir");
  {
    const gs = graduees(b(9));
    const fig = gs.find((g) => g.role === "figure");
    const sch = gs.find((g) => g.role === "schema");
    const part = Q(1, fig?.sous ?? 1);
    dit(9, `une part vaut $1 \\div ${fig?.sous} = ${tx(Number(part.n) / Number(part.d))}$`);
    const P = Object.fromEntries((fig?.points ?? []).map((p) => [p.nom, p.q]));
    for (const [l, q] of Object.entries(P)) v.ok(`9. ${l} sur une petite graduation`, div(q, part).d === 1n);
    dit(9, "$3 \\times 0{,}2 = 0{,}6$, donc son abscisse est $-0{,}6$");
    v.ok("9. A = −3 parts, B = 4 parts, C = 1 + 2 parts", egal(div(P.A, part), Q(-3)) && egal(div(P.B, part), Q(4)) && egal(P.C, plus(Q(1), fois(Q(2), part))));
    egalites(9, "4 \\times 0{,}2 = 0{,}8");
    egalites(9, "1 + 2 \\times 0{,}2 = 1{,}4");
    egalites(9, "1{,}4 - (-0{,}6) = 1{,}4 + 0{,}6 = 2");
    v.ok("9. AC = C − A = 2", egal(moins(P.C, P.A), Q(2)));
    const Mi = div(plus(P.A, P.C), Q(2));
    egalites(9, "\\dfrac{-0{,}6 + 1{,}4}{2} = \\dfrac{0{,}8}{2} = 0{,}4");
    v.ok("9. M = (A + C) / 2 = 0,4", egal(Mi, D("0.4")));
    const Ms = sch?.points.find((p) => p.nom === "M");
    v.ok("9. le schéma place M au milieu, en orange, et reprend A, B, C", !!Ms && egal(Ms.q, Mi) && Ms.couleur === "ORANGE" && ["A", "B", "C"].every((l) => egal(sch.points.find((p) => p.nom === l)?.q ?? Q(99), P[l])));
    dit(9, "écrire $-0{,}3$ pour $A$", "le piège : la part lue comme un dixième");
  }
  {
    const M = { A: Q(5, 6), B: Q(4, 3), C: Q(-1, 2), D: Q(11, 6) };
    enonceDit(10, "d'abscisses $\\dfrac{5}{6}$, $\\dfrac{4}{3}$, $-\\dfrac{1}{2}$ et $\\dfrac{11}{6}$");
    const parts = Object.fromEntries(Object.entries(M).map(([l, q]) => [l, fois(q, Q(6))]));
    v.ok("10. 5, 8, −3, 11 parts", Object.values(parts).every((p) => p.d === 1n));
    dit(10, `$\\dfrac{4}{3} = \\dfrac{${parts.B.n}}{6}$ : $${parts.B.n}$ parts à droite`);
    dit(10, `$-\\dfrac{1}{2} = -\\dfrac{${-parts.C.n}}{6}$ : $${-parts.C.n}$ parts à gauche`);
    const ordre = Object.keys(M).sort((x, y) => (inf(M[x], M[y]) ? -1 : 1));
    dit(10, `de gauche à droite : ${ordre.map((l) => `$${l}$`).join(", ")}`);
    dit(10, `Donc $${ordre.map((l) => texFrac(M[l])).join(" < ")}$`);
    const CD = moins(M.D, M.C);
    egalites(10, "\\dfrac{11}{6} - \\left(-\\dfrac{3}{6}\\right) = \\dfrac{14}{6} = \\dfrac{7}{3}");
    v.ok(`10. CD = ${CD.n}/${CD.d}`, egal(CD, Q(7, 3)));
    dit(10, `les $${fois(CD, Q(6)).n}$ parts qu'on compte sur le dessin`);
    const sch = graduees(b(10)).find((g) => g.role === "schema");
    v.ok("10. le schéma : unité en 6 parts, A, B, C, D à leur place", !!sch && sch.sous === 6 && sch.points.length === 4 && sch.points.every((p) => egal(p.q, M[p.nom])));
  }
  {
    const P = { A: [-4, -1], B: [2, -1], C: [2, 3] };
    enonceDit(11, `$A${pt2(P.A)}$, $B${pt2(P.B)}$ et $C${pt2(P.C)}$`);
    v.ok("11. [AB] horizontal, [BC] vertical : angle droit en B", P.A[1] === P.B[1] && P.B[0] === P.C[0]);
    const Dp = [P.A[0] + P.C[0] - P.B[0], P.A[1] + P.C[1] - P.B[1]];
    dit(11, `Donc $D${pt2(Dp)}$`);
    const [ab, bc] = [P.B[0] - P.A[0], P.C[1] - P.B[1]];
    egalites(11, "AB = 2 - (-4) = 6".replace("AB = ", ""));
    egalites(11, "3 - (-1) = 4");
    v.ok(`11. AB = ${ab}, BC = ${bc}`, ab === 6 && bc === 4);
    egalites(11, `2 \\times (6 + 4) = ${2 * (ab + bc)}`);
    egalites(11, `6 \\times 4 = ${ab * bc}`);
    dit(11, `$D${pt2([Dp[1], Dp[0]])}$`, "le piège : D à l'envers");
    const sch = plans(b(11))[0];
    const cotes = [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]].map(([x, y]) => JSON.stringify([({ ...P, D: Dp })[x], ({ ...P, D: Dp })[y]]));
    v.ok("11. le rectangle dessiné est ABCD", !!sch && memes(sch.fleches.map((x) => JSON.stringify([x.de, x.vers])).sort(), cotes.sort()) && memes(sch.points.D, Dp) && ["A", "B", "C"].every((l) => memes(sch.points[l], P[l])));
  }
  {
    const Kp = [5, 2];
    enonceDit(12, `Soit le point $K${pt2(Kp)}$`);
    const L = [Kp[0], -Kp[1]];
    const M = [-Kp[0], Kp[1]];
    const N = [-Kp[0], -Kp[1]];
    dit(12, `l'ordonnée change de signe : $L${pt2(L)}$`);
    dit(12, `l'abscisse change de signe : $M${pt2(M)}$`);
    dit(12, `les DEUX coordonnées changent de signe. $N${pt2(N)}$`);
    dit(12, `c'est un rectangle, de $${2 * Kp[0]}$ carreaux sur $${2 * Kp[1]}$`);
    v.ok("12. O est le milieu de [KN]", (Kp[0] + N[0]) / 2 === 0 && (Kp[1] + N[1]) / 2 === 0);
    dit(12, `$L${pt2(M)}$`, "le piège : les deux axes confondus");
    const sch = plans(b(12))[0];
    v.ok("12. K, L, M, N dessinés à leur place", !!sch && memes(sch.points.K, Kp) && memes(sch.points.L, L) && memes(sch.points.M, M) && memes(sch.points.N, N));
    const attendus = [[Kp, L], [L, N], [N, M], [M, Kp], [Kp, N]].map((s) => JSON.stringify(s)).sort();
    v.ok("12. les côtés et la diagonale [KN] dessinés", !!sch && memes(sch.fleches.map((x) => JSON.stringify([x.de, x.vers])).sort(), attendus));
  }
  {
    const dims = /\$AB = (\d+)\$ dm, \$AD = (\d+)\$ dm et \$AE = (\d+)\$ dm/.exec(e(13))?.slice(1).map(Number) ?? [];
    const S = sommetsPave(...dims);
    const M = milieu3(S.E, S.F);
    const N = milieu3(S.B, S.G);
    const P = [4, 4, 0];
    dit(13, `$G${pt3(S.G)}$`);
    dit(13, `$E${pt3(S.E)}$ et $F${pt3(S.F)}$`);
    dit(13, `Donc $M${pt3(M)}$`);
    dit(13, `Donc $N${pt3(N)}$`);
    enonceDit(13, `$P${pt3(P)}$`);
    v.ok("13. P est le milieu de [DC]", memes(milieu3(S.D, S.C), P));
    dit(13, "$P$ est le milieu de l'arête $[DC]$");
    dit(13, `$N${pt3([N[0], N[2], N[1]])}$`, "le piège : la hauteur avant la profondeur");
    const pv = paves(b(13))[0];
    v.ok("13. le pavé dessiné a les dimensions de l'énoncé, M, N, P à leur place", !!pv && memes(pv.dims, dims) && memes(pv.points.M, M) && memes(pv.points.N, N) && memes(pv.points.P, P));
  }
  {
    const [ny, na, li] = [VILLES["New York"], VILLES.Naples, VILLES.Lima];
    enonceDit(14, `New York a pour coordonnées géographiques ${geo(...ny)}`);
    v.ok("14. New York et Naples au même parallèle, au degré près", r0(ny[0]) === r0(na[0]));
    dit(14, `Même latitude, ${Math.abs(r0(ny[0]))}° N`);
    v.ok("14. Naples est à l'est de New York", na[1] > ny[1]);
    dit(14, "Naples est la plus à l'est");
    const ecartLon = Math.abs(r0(ny[1])) + Math.abs(r0(na[1]));
    dit(14, `$${Math.abs(r0(ny[1]))} + ${Math.abs(r0(na[1]))} = ${ecartLon}$ degrés`);
    v.ok(`14. écart de longitude recalculé : ${ecartLon}°`, ecartLon === r0(na[1]) - r0(ny[1]));
    const ecartLat = r0(ny[0]) - r0(li[0]);
    dit(14, `$${r0(ny[0])} + ${-r0(li[0])} = ${ecartLat}$ degrés`);
    dit(14, `$${Math.abs(r0(ny[1]))} - ${Math.abs(r0(na[1]))} = ${Math.abs(r0(ny[1])) - Math.abs(r0(na[1]))}$`, "le piège : les longitudes soustraites");
    const w = lieux(b(14));
    const carte = { Y: "New York", N: "Naples", L: "Lima" };
    v.ok("14. le planisphère place Y, N, L au degré près", Object.entries(carte).every(([l, n]) => memes(w[l], [r0(VILLES[n][0]), r0(VILLES[n][1])])));
    v.ok("14. le parallèle surligné est 41° N", new RegExp(`",\\s*${r0(ny[0])},\\s*\\)`).test(b(14)));
  }
  {
    const R = [-3, -4];
    enonceDit(15, `$R${pt2(R)}$`);
    const et = rejouer(R, [[1, 7], [0, 5], [1, -2], [0, -8]]);
    dit(15, `Réponse : ${et.slice(1, 4).map((p) => `$${pt2(p)}$`).join(", ")}, puis $${pt2(et[4])}$`);
    dit(15, `Il arrive en $${pt2(et[4])}$`);
    const ecran = rejouer(R, [[1, -7], [0, 5], [1, 2], [0, -8]]).at(-1);
    enonceDit(15, `$${pt2(ecran)}$`);
    egalites(15, `-4 - 7 + 2 = ${ecran[1]}`);
    cheminDessine(15, et);
    const pts = plans(b(15))[0]?.points ?? {};
    v.ok("15. R et l'arrivée A dessinés", memes(pts.R, R) && memes(pts.A, et.at(-1)));
  }
  {
    const A = [-4, 3];
    const B = [2, -1];
    enonceDit(16, `$A${pt2(A)}$ et $B${pt2(B)}$`);
    const I = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    const C = [2 * B[0] - A[0], 2 * B[1] - A[1]];
    egalites(16, "\\dfrac{-4 + 2}{2} = \\dfrac{-2}{2} = -1");
    egalites(16, "\\dfrac{3 + (-1)}{2} = \\dfrac{2}{2} = 1");
    dit(16, `Donc $I${pt2(I)}$`);
    dit(16, `j'avance de $${B[0] - A[0]}$ carreaux vers la droite et je descends de $${A[1] - B[1]}$`);
    dit(16, `Donc $C${pt2(C)}$`);
    v.ok("16. B est le milieu de [AC]", (A[0] + C[0]) / 2 === B[0] && (A[1] + C[1]) / 2 === B[1]);
    egalites(16, "\\dfrac{-4 + 3 + 2 + (-1)}{4} = 0");
    const sch = plans(b(16))[0];
    v.ok("16. A, I, B, C dessinés à leur place", !!sch && memes(sch.points.A, A) && memes(sch.points.I, I) && memes(sch.points.B, B) && memes(sch.points.C, C));
    const fl = (sch?.fleches ?? []).filter((x) => !x.segment).map((x) => [x.de, x.vers]);
    v.ok("16. les flèches refont le trajet de A à B, depuis B", memes(fl, [[B, [C[0], B[1]]], [[C[0], B[1]], C]]));
    const seg = (sch?.fleches ?? []).find((x) => x.segment);
    const aligne = (p) => (p[0] - A[0]) * (C[1] - A[1]) - (p[1] - A[1]) * (C[0] - A[0]) === 0;
    v.ok("16. le segment [AC] passe par I et B", !!seg && memes([seg.de, seg.vers], [A, C]) && aligne(I) && aligne(B));
  }

  /* ── ★★★ Problèmes ───────────────────────────────────────────────────── */
  v.titre("★★★ Problèmes");
  {
    const Dp = [-5, -3];
    enonceDit(17, `Le départ est en $D${pt2(Dp)}$`);
    const dir = { nord: [1, 1], sud: [1, -1], est: [0, 1], ouest: [0, -1] };
    const ordres = [...e(17).matchAll(/\$(\d+)\$ m vers l'(est|ouest)|\$(\d+)\$ m vers le (nord|sud)/g)].map((m) => {
      const [axe, s] = dir[m[2] ?? m[4]];
      return [axe, (s * Number(m[1] ?? m[3])) / 100];
    });
    v.ok("17. quatre ordres lus dans l'énoncé", ordres.length === 4);
    const et = rejouer(Dp, ordres);
    dit(17, `La balise est $K${pt2(et[2])}$`);
    dit(17, `L'arrivée est $A${pt2(et[4])}$`);
    const total = ordres.reduce((s, [, d]) => s + Math.abs(d) * 100, 0);
    egalites(17, `400 + 700 + 600 + 300 = ${milliers(total)}`);
    const [dx, dy] = [Dp[0] - et[4][0], Dp[1] - et[4][1]];
    dit(17, `soit $${-dx}$ carreaux vers l'ouest, $${-dx * 100}$ m`);
    egalites(17, `7 - (-3) = ${-dy}`);
    dit(17, `carreaux vers le sud, $${milliers(-dy * 100)}$ m`);
    dit(17, `Le retour fait $${milliers((Math.abs(dx) + Math.abs(dy)) * 100)}$ m`);
    cheminDessine(17, et);
    const pts = plans(b(17))[0]?.points ?? {};
    v.ok("17. D, K, A dessinés à leur place", memes(pts.D, Dp) && memes(pts.K, et[2]) && memes(pts.A, et[4]));
  }
  {
    const R = { V: D("-89.2"), M: D("56.7"), P: D("42.6") };
    for (const x of ["-89{,}2", "56{,}7", "42{,}6"]) enonceDit(18, `$${x}$ °C`);
    const tranche = (q) => {
      let a = Q(-120);
      while (!inf(q, plus(a, Q(30)))) a = plus(a, Q(30));
      return [a.n, a.n + 30n];
    };
    for (const [l, q] of Object.entries(R)) {
      const [a0, a1] = tranche(q);
      const t = tx(Number(q.n) / Number(q.d));
      dit(18, `$${t}$ est entre $${a0}$ et $${a1}$`, `${l} entre ${a0} et ${a1}`);
    }
    egalites(18, "56{,}7 - (-89{,}2) = 56{,}7 + 89{,}2 = 145{,}9");
    v.ok("18. écart des records = M − V = 145,9", egal(moins(R.M, R.V), D("145.9")));
    egalites(18, "42{,}6 - (-89{,}2) = 42{,}6 + 89{,}2 = 131{,}8");
    v.ok("18. écart Paris − Vostok = 131,8", egal(moins(R.P, R.V), D("131.8")));
    const mi = div(plus(R.V, R.M), Q(2));
    egalites(18, "\\dfrac{-89{,}2 + 56{,}7}{2} = \\dfrac{-32{,}5}{2} = -16{,}25");
    v.ok("18. le milieu vaut −16,25, à 72,95 des deux", egal(mi, D("-16.25")) && egal(moins(mi, R.V), D("72.95")) && egal(moins(R.M, mi), D("72.95")));
    dit(18, "il y a $72{,}95$ degrés");
    egalites(18, "89{,}2 - 56{,}7 = 32{,}5");
    const sch = graduees(b(18))[0];
    v.ok("18. la droite est graduée de 30 en 30, comme l'énoncé", !!sch && sch.pas === 30 && e(18).includes("de $30$ en $30$"));
    const S = Object.fromEntries((sch?.points ?? []).map((p) => [p.nom, p.q]));
    v.ok("18. V, M, P dessinés à leur température, I au milieu", ["V", "M", "P"].every((l) => S[l] && egal(S[l], R[l])) && !!S.I && egal(S.I, mi));
  }
  {
    const cubes = [];
    for (let x = 1; x <= 3; x++) for (let y = 1; y <= 3; y++) for (let z = 1; z <= 3; z++) cubes.push([x, y, z]);
    const deux = (p) => p.filter((t) => t === 2).length;
    const par = [0, 1, 2, 3].map((n) => cubes.filter((p) => deux(p) === n).length);
    v.ok(`19. 27 cubes : ${par[3]} au cœur, ${par[2]} centres de face, ${par[1]} arêtes, ${par[0]} coins`, cubes.length === 27 && memes(par, [8, 12, 6, 1]));
    dit(19, `$${pt3([2, 2, 2])}$. Il ne touche aucune face`);
    dit(19, `$3 \\times 2 = ${par[2]}$ cubes`);
    dit(19, `$2 \\times 2 \\times 2 = ${par[0]}$ coins`);
    dit(19, `$27 - 1 - 6 - 8 = ${par[1]}$ cubes d'arête`);
    dit(19, `$3 \\times 4 = ${par[1]}$`);
    const carres = cubes.reduce((s, p) => s + p.filter((t) => t !== 2).length, 0);
    egalites(19, `6 \\times 1 + 12 \\times 2 + 8 \\times 3 = ${carres}`);
    v.ok("19. 54 carrés colorés = 6 faces de 9", carres === 54 && carres === 6 * 9);
    const pv = paves(b(19))[0];
    v.ok("19. le cube dessiné est 3 × 3 × 3", memes(pv?.dims, [3, 3, 3]));
    const role = { 2: "ORANGE", 1: "VIOLET", 0: "ROUGE" };
    const boites = pv?.boites ?? [];
    v.ok("19. chaque carré coloré a la couleur de son cube (centre, arête, coin)", boites.length === 3 && boites.every((bo) => bo.a.every((t, i) => t - bo.de[i] === 1) && role[deux(bo.a)] === bo.couleur));
    const legende = /"(orange [^"]*)"/.exec(b(19))?.[1] ?? "";
    v.ok("19. la légende nomme les cubes dessinés", boites.every((bo) => legende.includes(`${bo.couleur.toLowerCase()} (${bo.a.join(" ; ")})`)));
    v.ok("19. le cube de l'énoncé (2 ; 1 ; 2) est un centre de face", deux([2, 1, 2]) === 2 && e(19).includes(`$${pt3([2, 1, 2])}$ est au centre de la face avant`));
  }
  {
    const noms = ["mont Blanc", "Kilimandjaro", "Aconcagua"];
    for (const n of noms) enonceDit(20, `${n} ${geo(...VILLES[n])}, $${milliers(Math.round(ALTITUDES[n]))}$ m`);
    const nord = noms.filter((n) => r0(VILLES[n][0]) > 0);
    v.ok(`20. hémisphère Nord : ${nord}`, memes(nord, ["mont Blanc"]));
    dit(20, `seul le mont Blanc ${geo(...VILLES["mont Blanc"])} est au Nord`);
    const est = noms.filter((n) => VILLES[n][1] > 0);
    dit(20, `le ${est[0]} et le ${est[1]} ${geo(...VILLES[est[1]])} sont à l'est de Greenwich`);
    const proche = [...noms].sort((x, y) => Math.abs(VILLES[x][0]) - Math.abs(VILLES[y][0]))[0];
    dit(20, `Le plus proche de l'équateur est le ${proche}, à ${Math.abs(r0(VILLES[proche][0]))}° seulement`);
    const ecart = r0(VILLES["mont Blanc"][0]) - r0(VILLES.Kilimandjaro[0]);
    dit(20, `$46 + 3 = ${ecart}$ degrés`);
    egalites(20, `5\\,500 - 4\\,806 = ${5500 - Math.round(ALTITUDES["mont Blanc"])}`);
    const inverse = [r0(VILLES.Everest[1]), r0(VILLES.Everest[0])];
    const auPole = haversine(inverse, [90, 0]);
    v.ok(`20. le point inversé est à ${Math.round(auPole)} km du pôle (1° ≈ ${(TOUR / 360).toFixed(1)} km)`, Math.abs(auPole - 333) < 5 && Math.round(TOUR / 360) === 111);
    egalites(20, `(90 - ${inverse[0]}) \\times 111 = 333`);
    v.ok(`20. et à ${Math.round(haversine(inverse, VILLES.Everest))} km de l'Everest (des milliers)`, haversine(inverse, VILLES.Everest) > 3000);
    enonceDit(20, `L'Everest est en ${geo(...VILLES.Everest)}`);
    const w = lieux(b(20));
    const carte = { B: "mont Blanc", K: "Kilimandjaro", A: "Aconcagua", E: "Everest" };
    v.ok("20. le planisphère place B, K, A, E au degré près", Object.entries(carte).every(([l, n]) => memes(w[l], [r0(VILLES[n][0]), r0(VILLES[n][1])])));
  }
}

lancer({
  nom: "SE REPÉRER · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-reperage.tsx",
  notionId: "reperage",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : K dessiné à −6 dans la figure", 'lus: [0, 3], points: [{ v: -9, nom: "K" }', 'lus: [0, 3], points: [{ v: -6, nom: "K" }'],
    ["ex. 1 : la distance sans le signe", "$KL = 12 - (-9) = 12 + 9 = 21$", "$KL = 12 - (-9) = 12 - 9 = 3$"],
    ["ex. 2 : l'ordre de gauche à droite faux", "De gauche à droite : $C$, $B$, $O$, $A$.", "De gauche à droite : $B$, $C$, $O$, $A$."],
    ["ex. 3 : la fraction retournée", "$A$ a pour abscisse $\\\\dfrac{2}{3}$, $B$", "$A$ a pour abscisse $\\\\dfrac{3}{2}$, $B$"],
    ["ex. 3 : une étiquette qui ne dit pas la valeur", 'texte: "B 7/3"', 'texte: "B 8/3"'],
    ["ex. 4 : E placé entre −1 et 0", '{ v: -5 / 4, nom: "E"', '{ v: -3 / 4, nom: "E"'],
    ["ex. 5 : S lu à l'envers", "a) $R(2\\\\,;\\\\,4)$, $S(-4\\\\,;\\\\,3)$", "a) $R(2\\\\,;\\\\,4)$, $S(3\\\\,;\\\\,-4)$"],
    ["ex. 6 : l'ordonnée comptée vers le bas", "Donc $N(-2\\\\,;\\\\,5)$", "Donc $N(-2\\\\,;\\\\,-3)$"],
    ["ex. 6 : une flèche qui ne suit pas le trajet", "{ de: [-2, 5], vers: [1, 5] }", "{ de: [-2, 5], vers: [1, 4] }"],
    ["ex. 7 : le mauvais sommet", "C'est le sommet $C$", "C'est le sommet $B$"],
    ["ex. 7 : le pavé dessiné dans le désordre", "pave(6, 2, 3,", "pave(6, 3, 2,"],
    ["ex. 7 : un corrigé sans schéma", "schema: pave(6, 2, 3,", "figure: pave(6, 2, 3,"],
    ["ex. 8 : une longitude de 200° acceptée", "(10° N ; 200° E) est impossible", "(10° N ; 200° E) existe"],
    ["ex. 8 : Rio dessinée au nord", "lat: -23, lon: -43", "lat: 23, lon: -43"],
    ["ex. 9 : le milieu faux", "\\\\dfrac{0{,}8}{2} = 0{,}4", "\\\\dfrac{0{,}8}{2} = 0{,}5"],
    ["ex. 10 : l'ordre croissant faux", "de gauche à droite : $C$, $A$, $B$, $D$", "de gauche à droite : $C$, $B$, $A$, $D$"],
    ["ex. 10 : 4/3 placé à 4 parts", '{ v: 4 / 3, nom: "B", texte: "B 4/3" }', '{ v: 4 / 6, nom: "B", texte: "B 4/3" }'],
    ["ex. 11 : D écrit à l'envers", "Donc $D(-4\\\\,;\\\\,3)$", "Donc $D(3\\\\,;\\\\,-4)$"],
    ["ex. 12 : les deux axes confondus", "l'ordonnée change de signe : $L(5\\\\,;\\\\,-2)$", "l'ordonnée change de signe : $L(-5\\\\,;\\\\,2)$"],
    ["ex. 12 : un point collé au bord du cadre", '[{ x: 5, y: 2, label: "K" }', '[{ x: 6, y: 2, label: "K" }'],
    ["ex. 13 : la hauteur avant la profondeur", "Donc $N(8\\\\,;\\\\,2\\\\,;\\\\,3)$", "Donc $N(8\\\\,;\\\\,3\\\\,;\\\\,2)$"],
    ["ex. 13 : P dessiné ailleurs", "p: [4, 4, 0]", "p: [4, 0, 4]"],
    ["ex. 14 : les longitudes soustraites", "$74 + 14 = 88$ degrés", "$74 - 14 = 60$ degrés"],
    ["ex. 14 : Naples dessinée à l'ouest", '{ nom: "N", lat: 41, lon: 14 }', '{ nom: "N", lat: 41, lon: -14 }'],
    ["ex. 15 : l'arrivée de l'écran", "Il arrive en $(-6\\\\,;\\\\,1)$", "Il arrive en $(-6\\\\,;\\\\,-9)$"],
    ["ex. 16 : C faux", "Donc $C(8\\\\,;\\\\,-5)$", "Donc $C(8\\\\,;\\\\,-3)$"],
    ["ex. 17 : le nord compté vers le bas", "La balise est $K(2\\\\,;\\\\,1)$", "La balise est $K(2\\\\,;\\\\,-7)$"],
    ["ex. 18 : l'écart sans le signe", "56{,}7 - (-89{,}2) = 56{,}7 + 89{,}2 = 145{,}9", "56{,}7 - (-89{,}2) = 56{,}7 + 89{,}2 = 32{,}5"],
    ["ex. 18 : le milieu dessiné à côté", '{ v: -16.25, nom: "I"', '{ v: -16.5, nom: "I"'],
    ["ex. 19 : six coins", "$2 \\\\times 2 \\\\times 2 = 8$ coins", "$2 \\\\times 2 \\\\times 2 = 6$ coins"],
    ["ex. 19 : un cube d'arête coloré comme un centre", "a: [2, 1, 3], couleur: VIOLET", "a: [2, 1, 3], couleur: ORANGE"],
    ["ex. 20 : les latitudes soustraites", "$46 + 3 = 49$ degrés", "$46 - 3 = 43$ degrés"],
    ["ex. 20 : l'Aconcagua dessiné à l'est", '{ nom: "A", lat: -33, lon: -70 }', '{ nom: "A", lat: -33, lon: 70 }'],
    ["un $ dans un dessin", 'texte: "A 2/3"', 'texte: "A $2/3$"'],
    ["une micro d'une autre notion", 'micros: ["repere_espace"],', 'micros: ["vision_espace_patron"],'],
  ],
});
