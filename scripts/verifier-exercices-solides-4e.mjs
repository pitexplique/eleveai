// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Solides et
// représentations » de 4e (lib/fiches-exercices/maths-4e-solides.tsx).
//
// ⭐ L'AUTRE CHEMIN :
// - les solides dessinés ne sont pas recomptés sur leur liste d'arêtes : le
//   script reconstruit leur ENVELOPPE CONVEXE à partir des seuls sommets (un
//   plan d'appui par triplet), en déduit faces, arêtes et sommets, contrôle
//   F − A + S = 2, puis retrouve les arêtes CACHÉES par l'orientation des faces
//   vers l'œil de la perspective cavalière — et les compare aux pointillés ;
// - ⛔ LA LEÇON DE LA FEUILLE « ESPACE » DE 3e (des étiquettes y croisaient des
//   arêtes) : le script refait la projection et la mise à l'échelle de chaque
//   dessin, pose la boîte de chaque nom de sommet et de chaque cote dans sa
//   direction, et vérifie qu'AUCUN trait ne la traverse et qu'aucune étiquette
//   n'en chevauche une autre ;
// - les patrons de cube sont PLIÉS : un cube roule de case en case, et deux
//   cases qui touchent le sol par la même face tombent sur la même face ;
// - les vues sont recalculées à partir des empilements (plus haute pile par
//   colonne) ou par PROJECTION orthogonale des sommets (enveloppe convexe 2D) ;
// - « au moins / au plus » : tous les empilements compatibles avec les trois
//   vues sont énumérés ;
// - le cube peint et le podium sont découpés en cubes unité, et leurs faces
//   exposées comptées une à une ;
// - les plans de coupe sont relus dans les dessins : points sur les arêtes,
//   coplanaires, parallèles à la bonne face, et la section mesurée ;
// - toute cote chiffrée d'une figure plane (`aPlat`) est la longueur de son bord.
//
//   node scripts/verifier-exercices-solides-4e.mjs

import { lireFeuille, lancer, Q, D, plus, fois, div, egal } from "./verifier-exercices-commun.mjs";

/* ── Lire les appels du source ─────────────────────────────────────────── */

/** Un littéral TypeScript (objet, tableau, chaîne, nombre, booléen) → valeur JS. */
function litteral(t) {
  let i = 0;
  const ws = () => {
    while (i < t.length && /\s/.test(t[i])) i++;
  };
  const chaine = () => {
    i++;
    let s = "";
    while (t[i] !== '"') {
      if (t[i] === "\\") {
        s += t[i + 1];
        i += 2;
      } else s += t[i++];
    }
    i++;
    return s;
  };
  const val = () => {
    ws();
    const ch = t[i];
    if (ch === "{") {
      i++;
      const o = {};
      ws();
      while (t[i] !== "}") {
        let k;
        if (t[i] === '"') k = chaine();
        else {
          const m = /^[A-Za-z_][\w]*/.exec(t.slice(i));
          if (!m) throw new Error(`clé illisible : ${t.slice(i, i + 30)}`);
          k = m[0];
          i += k.length;
        }
        ws();
        if (t[i] !== ":") throw new Error(`« : » attendu : ${t.slice(i, i + 30)}`);
        i++;
        o[k] = val();
        ws();
        if (t[i] === ",") i++;
        ws();
      }
      i++;
      return o;
    }
    if (ch === "[") {
      i++;
      const a = [];
      ws();
      while (t[i] !== "]") {
        a.push(val());
        ws();
        if (t[i] === ",") i++;
        ws();
      }
      i++;
      return a;
    }
    if (ch === '"') return chaine();
    const m = /^-?\d+(\.\d+)?/.exec(t.slice(i));
    if (m) {
      i += m[0].length;
      return Number(m[0]);
    }
    const w = /^(true|false)/.exec(t.slice(i));
    if (w) {
      i += w[0].length;
      return w[0] === "true";
    }
    throw new Error(`littéral illisible : ${t.slice(i, i + 40)}`);
  };
  return val();
}

/** Les arguments de premier niveau d'un appel dont `debut` pointe la parenthèse ouvrante (chaînes comprises). */
function argumentsDe(texte, debut) {
  const args = [];
  let prof = 0;
  let courant = "";
  for (let i = debut + 1; i < texte.length; i++) {
    const ch = texte[i];
    if (ch === '"') {
      let j = i + 1;
      while (texte[j] !== '"') j += texte[j] === "\\" ? 2 : 1;
      courant += texte.slice(i, j + 1);
      i = j;
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

/** Les appels `nom(…)` d'un bloc, dans l'ordre, avec leur rôle (figure de l'énoncé ou schéma du corrigé). */
function appels(bloc, noms) {
  const re = new RegExp(`(?<![\\w.])(${noms.join("|")})\\(`, "g");
  return [...bloc.matchAll(re)].map((m) => {
    const avant = bloc.slice(0, m.index);
    return {
      nom: m[1],
      role: avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema",
      args: argumentsDe(bloc, m.index + m[0].length - 1),
    };
  });
}

/* ── Géométrie dans l'espace ───────────────────────────────────────────── */

const K = 0.5 * Math.SQRT1_2;
const VERS_OEIL = [K, -1, K];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norme = (a) => Math.hypot(...a);
const trie = (nom) => [...nom].sort().join("");
const proche = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;

/** Faces, arêtes (et lesquelles sont cachées) d'un polyèdre convexe, à partir de ses SEULS sommets. */
function enveloppe(sommets) {
  const noms = Object.keys(sommets);
  const P = noms.map((n) => sommets[n]);
  const faces = new Map();
  for (let i = 0; i < P.length; i++)
    for (let j = i + 1; j < P.length; j++)
      for (let k = j + 1; k < P.length; k++) {
        let n = cross(sub(P[j], P[i]), sub(P[k], P[i]));
        const L = norme(n);
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
  return { F: liste.length, A: aretes.length, S: noms.length, faces: liste, aretes, cachees: aretes.filter((a) => a.cachee).map((a) => a.nom).sort() };
}
const nbFaces = (env, n) => env.faces.filter((f) => f.sommets.length === n).length;

const sommetsPave = (a, b, c) => ({ A: [0, 0, 0], B: [a, 0, 0], C: [a, b, 0], D: [0, b, 0], E: [0, 0, c], F: [a, 0, c], G: [a, b, c], H: [0, b, c] });

/* ── Les étiquettes : la même mise en page que le dessin, puis les croisements ─ */

const LARGEUR = 180;
const HAUTEUR = 130;
const ECART = 5;
const SIGNES = { h: [0, -1], b: [0, 1], g: [-1, 0], d: [1, 0], hg: [-1, -1], hd: [1, -1], bg: [-1, 1], bd: [1, 1] };
function boite(x, y, t, d, taille) {
  const w = [...t].length * taille * 0.6;
  const h = taille;
  const [sx, sy] = SIGNES[d];
  const e = sx !== 0 && sy !== 0 ? ECART * 0.7 : ECART;
  return { cx: x + sx * (e + w / 2), cy: y + sy * (e + h / 2), w, h, t };
}
/** Le segment traverse-t-il la boîte (réduite d'1 px sur chaque bord) ? Liang–Barsky. */
function traverse([x1, y1], [x2, y2], b) {
  const [xmin, xmax, ymin, ymax] = [b.cx - b.w / 2 + 1, b.cx + b.w / 2 - 1, b.cy - b.h / 2 + 1, b.cy + b.h / 2 - 1];
  let [t0, t1] = [0, 1];
  const dx = x2 - x1;
  const dy = y2 - y1;
  const p = [-dx, dx, -dy, dy];
  const q = [x1 - xmin, xmax - x1, y1 - ymin, ymax - y1];
  for (let i = 0; i < 4; i++) {
    if (p[i] === 0) {
      if (q[i] < 0) return false;
    } else {
      const r = q[i] / p[i];
      if (p[i] < 0) {
        if (r > t1) return false;
        if (r > t0) t0 = r;
      } else {
        if (r < t0) return false;
        if (r < t1) t1 = r;
      }
    }
  }
  return true;
}
const chevauchent = (a, b) => Math.abs(a.cx - b.cx) < (a.w + b.w) / 2 && Math.abs(a.cy - b.cy) < (a.h + b.h) / 2;
function fautesEtiquettes(segments, boites) {
  const f = [];
  for (const b of boites) for (const [p, q, nom] of segments) if (traverse(p, q, b)) f.push(`« ${b.t} » traversée par ${nom}`);
  for (let i = 0; i < boites.length; i++) for (let j = i + 1; j < boites.length; j++) if (chevauchent(boites[i], boites[j])) f.push(`« ${boites[i].t} » et « ${boites[j].t} » se chevauchent`);
  return f;
}

/** Projection et mise à l'échelle d'un solide, comme `solide` du fichier. */
function ecranDe(s) {
  const proj = (q) => [q[0] + K * q[1], q[2] + K * q[1]];
  const pts = Object.values(s.sommets).map(proj);
  const [minX, maxX] = [Math.min(...pts.map((p) => p[0])), Math.max(...pts.map((p) => p[0]))];
  const [minY, maxY] = [Math.min(...pts.map((p) => p[1])), Math.max(...pts.map((p) => p[1]))];
  const e = Math.min(LARGEUR / (maxX - minX), HAUTEUR / (maxY - minY));
  return (q) => {
    const [X, Y] = proj(q);
    return [(X - minX) * e, (maxY - Y) * e];
  };
}
function etiquettesSolide(s) {
  const E = ecranDe(s);
  const segments = s.aretes.map((n) => [E(s.sommets[n[0]]), E(s.sommets[n[1]]), `[${n}]`]);
  (s.plan ?? []).forEach((p, i, t) => segments.push([E(p), E(t[(i + 1) % t.length]), "le plan de coupe"]));
  const boites = [];
  for (const [n, d] of Object.entries(s.noms ?? {})) boites.push(boite(...E(s.sommets[n]), n, d, 14));
  for (const [n, [t, d]] of Object.entries(s.cotes ?? {})) {
    const [a, b] = [E(s.sommets[n[0]]), E(s.sommets[n[1]])];
    boites.push(boite((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, t, d, 13));
  }
  return { n: boites.length, fautes: fautesEtiquettes(segments, boites) };
}

/* ── Géométrie plane ───────────────────────────────────────────────────── */

const long2 = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);
/** Enveloppe convexe 2D (chaîne monotone), sans point aligné. */
function contour(points) {
  const pts = [...new Map(points.map((p) => [`${+p[0].toFixed(6)},${+p[1].toFixed(6)}`, p])).values()].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const x = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const bas = [];
  for (const p of pts) {
    while (bas.length >= 2 && x(bas.at(-2), bas.at(-1), p) <= 1e-9) bas.pop();
    bas.push(p);
  }
  const haut = [];
  for (const p of [...pts].reverse()) {
    while (haut.length >= 2 && x(haut.at(-2), haut.at(-1), p) <= 1e-9) haut.pop();
    haut.push(p);
  }
  return [...bas.slice(0, -1), ...haut.slice(0, -1)];
}
const cleContour = (pts) => contour(pts).map((p) => `${+p[0].toFixed(6)},${+p[1].toFixed(6)}`).sort().join(" ");
/** Le polygone d'une vue est-il la projection du solide ? */
const memeContour = (poly, pts3, axes) => cleContour(poly) === cleContour(pts3.map((q) => axes.map((i) => q[i])));
/** Les bords libres d'un patron (ceux qu'aucune autre pièce ne partage). */
function bordsLibres(pieces) {
  const cle = (a, b) => [a, b].map((p) => `${p[0]},${p[1]}`).sort().join("|");
  const compte = new Map();
  for (const p of pieces)
    p.pts.forEach((a, i) => {
      const b = p.pts[(i + 1) % p.pts.length];
      const k = cle(a, b);
      compte.set(k, { n: (compte.get(k)?.n ?? 0) + 1, a, b });
    });
  return [...compte.entries()].filter(([, v]) => v.n === 1).map(([k, v]) => ({ k, ...v }));
}

/* ── Patrons de cube : on roule le cube de case en case ────────────────── */

const ROT = {
  "1,0": [[0, 0, 1], [0, 1, 0], [-1, 0, 0]],
  "-1,0": [[0, 0, -1], [0, 1, 0], [1, 0, 0]],
  "0,1": [[1, 0, 0], [0, 0, 1], [0, -1, 0]],
  "0,-1": [[1, 0, 0], [0, 0, -1], [0, 1, 0]],
};
const mul = (A, B) => A.map((r) => [0, 1, 2].map((j) => r[0] * B[0][j] + r[1] * B[1][j] + r[2] * B[2][j]));
const transp = (A) => [0, 1, 2].map((i) => [0, 1, 2].map((j) => A[j][i]));
const app = (A, v) => A.map((r) => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]);
/** Pour chaque case (colonne ; ligne vers le bas), la face du cube qui touche le sol. */
function plier(cases) {
  const cle = (c) => c.join(",");
  const dans = new Set(cases.map(cle));
  const face = new Map();
  const pile = [[cases[0], [[1, 0, 0], [0, 1, 0], [0, 0, 1]]]];
  while (pile.length) {
    const [c, R] = pile.pop();
    if (face.has(cle(c))) continue;
    face.set(cle(c), app(transp(R), [0, 0, -1]).join(","));
    for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const v = [c[0] + dc, c[1] + dr];
      // une ligne vers le bas du dessin, c'est −y dans le plan de la table
      if (dans.has(cle(v)) && !face.has(cle(v))) pile.push([v, mul(ROT[`${dc},${-dr}`], R)]);
    }
  }
  return cases.map((c) => face.get(cle(c)));
}
const estPatron = (cases) => new Set(plier(cases)).size === 6 && plier(cases).every(Boolean);

/* ── Empilements ───────────────────────────────────────────────────────── */

const vueDessus = (h) => [...h].reverse().map((l) => l.map((n) => (n > 0 ? 1 : 0)));
const vueFace = (h) => h[0].map((_, x) => Math.max(...h.map((l) => l[x])));
const vueDroite = (h) => h.map((l) => Math.max(...l));
const total = (h) => h.flat().reduce((s, n) => s + n, 0);
/** Les faces unité exposées d'un empilement, par direction (le dessous exclu). */
function facesExposees(h) {
  const plein = (x, y, z) => y >= 0 && y < h.length && x >= 0 && x < h[0].length && z >= 0 && z < h[y][x];
  const n = { "-x": 0, "+x": 0, "-y": 0, "+y": 0, "+z": 0 };
  h.forEach((l, y) =>
    l.forEach((hauteur, x) => {
      for (let z = 0; z < hauteur; z++) {
        if (!plein(x - 1, y, z)) n["-x"]++;
        if (!plein(x + 1, y, z)) n["+x"]++;
        if (!plein(x, y - 1, z)) n["-y"]++;
        if (!plein(x, y + 1, z)) n["+y"]++;
        if (!plein(x, y, z + 1)) n["+z"]++;
      }
    }),
  );
  return n;
}

/** Un calcul écrit « a + b = c » : chaque membre évalué (×, ÷, virgule). */
const calc = (s) => Function(`return (${s.replace(/\\times/g, "*").replace(/\\div/g, "/").replace(/\{,\}/g, ".").replace(/,/g, ".")});`)();

function verifier(source, v) {
  const { enonces, corrections, blocs } = lireFeuille(source);
  const e = (k) => enonces[k - 1] ?? "";
  const c = (k) => corrections[k - 1] ?? "";
  const b = (k) => blocs[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");
  /** « a + b = c » écrit dans le corrigé, et juste. */
  const egalite = (k, texte) => {
    const m = texte.split(" = ").map(calc);
    v.ok(`${k}. ${texte}`, m.every((x) => proche(x, m[0], 1e-9)) && c(k).includes(texte), `membres ${m.join(" ; ")} ; écrit : ${c(k).includes(texte)}`);
  };

  const def = source.slice(source.indexOf("const pave = "));
  const ARETES_PAVE = litteral(/aretes: (\[[^\]]*\])/.exec(def)[1]);
  const lireSolide = (a) => {
    if (a.nom === "solide") return { ...litteral(a.args[0]), role: a.role };
    const [x, y, z] = a.args.slice(0, 3).map(Number);
    return { sommets: sommetsPave(x, y, z), aretes: ARETES_PAVE, cachees: litteral(a.args[3]), ...(a.args[4] ? litteral(a.args[4]) : {}), dims: [x, y, z], role: a.role };
  };
  const solides = (k, role) => appels(b(k), ["solide", "pave"]).filter((a) => !role || a.role === role).map(lireSolide);
  const lire = (k, nom, role) => appels(b(k), [nom]).filter((a) => !role || a.role === role).map((a) => a.args.map(litteral));

  /* ── Tous les dessins de solides ───────────────────────────────────── */
  v.titre("Les solides dessinés : enveloppe convexe, pointillés, étiquettes");
  let nSolides = 0;
  let nEtiquettes = 0;
  const fautesAr = [];
  const fautesPt = [];
  const fautesEt = [];
  blocs.forEach((_, i) => {
    solides(i + 1).forEach((s, j) => {
      nSolides++;
      const env = enveloppe(s.sommets);
      const traces = s.aretes.map(trie).sort();
      if (JSON.stringify(traces) !== JSON.stringify(env.aretes.map((a) => a.nom).sort())) fautesAr.push(`${i + 1}.${j + 1}`);
      if (env.F - env.A + env.S !== 2) fautesAr.push(`${i + 1}.${j + 1} Euler`);
      // L'exercice 11 montre EXPRÈS le dessin faux de Léa : contrôlé à part.
      const pointilles = JSON.stringify(s.cachees.map(trie).sort());
      if (!(i + 1 === 11 && s.role === "figure") && pointilles !== JSON.stringify(env.cachees)) fautesPt.push(`${i + 1}.${j + 1} : ${pointilles} au lieu de ${env.cachees}`);
      const et = etiquettesSolide(s);
      nEtiquettes += et.n;
      fautesEt.push(...et.fautes.map((f) => `${i + 1}.${j + 1} ${f}`));
    });
  });
  v.ok(`${nSolides} solides : les arêtes tracées sont celles de l'enveloppe, et F − A + S = 2`, nSolides >= 18 && fautesAr.length === 0, fautesAr.join(" | "));
  v.ok(`${nSolides} solides : pointillés = arêtes cachées à l'œil`, fautesPt.length === 0, fautesPt.join(" | "));
  v.ok(`${nEtiquettes} étiquettes de solides : aucune n'est traversée par un trait, aucune n'en chevauche une autre`, nEtiquettes >= 40 && fautesEt.length === 0, fautesEt.slice(0, 40).join(" | "));

  /* ── Toutes les figures planes : cotes = longueurs, étiquettes libres ─ */
  let nCotes = 0;
  const fautesCotes = [];
  const fautesEtPlat = [];
  blocs.forEach((_, i) => {
    for (const [pieces, bords = [], u = 14] of lire(i + 1, "aPlat")) {
      const tous = pieces.flatMap((p) => p.pts);
      const x0 = Math.min(...tous.map((p) => p[0]));
      const y1 = Math.max(...tous.map((p) => p[1]));
      const E = (p) => [(p[0] - x0) * u, (y1 - p[1]) * u];
      const segments = pieces.flatMap((p) => p.pts.map((a, j) => [E(a), E(p.pts[(j + 1) % p.pts.length]), "un bord"]));
      const boites = [];
      for (const bo of bords) {
        const m = /^([\d,]+) (cm|m)$/.exec(bo.texte ?? "");
        if (m) {
          nCotes++;
          if (!proche(long2(bo.de, bo.a), Number(m[1].replace(",", ".")), 1e-6)) fautesCotes.push(`${i + 1} : « ${bo.texte} » sur un bord de ${long2(bo.de, bo.a)}`);
        }
        if (bo.texte && bo.cote) {
          const [a, bb] = [E(bo.de), E(bo.a)];
          boites.push(boite((a[0] + bb[0]) / 2, (a[1] + bb[1]) / 2, bo.texte, bo.cote, 13));
        }
      }
      fautesEtPlat.push(...fautesEtiquettes(segments, boites).map((f) => `${i + 1} ${f}`));
    }
  });
  v.ok(`${nCotes} cotes de figures planes : chacune est la longueur de son bord`, nCotes >= 12 && fautesCotes.length === 0, fautesCotes.join(" | "));
  v.ok("les cotes des figures planes ne croisent aucun bord", fautesEtPlat.length === 0, fautesEtPlat.slice(0, 3).join(" | "));

  // ⛔ Un dessin ne traverse pas KaTeX : aucun `$` dans un schéma ou une figure.
  const dollars = blocs.map((bl, i) => [i + 1, bl.replace(/(enonce|correction):\s*\n?\s*"(?:[^"\\]|\\.)*"/g, "")]).filter(([, t]) => t.split("micros:")[0].includes("$"));
  v.ok("aucun $ dans les schémas et les figures", dollars.length === 0, dollars.map(([k]) => k).join(", "));
  const dessines = blocs.filter((bl) => /\n\s+schema:/.test(bl.split("micros:")[0])).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20);

  /* ── ★ Un seul geste ──────────────────────────────────────────────── */
  v.titre("★ Un seul geste");
  {
    const ordre = appels(b(1), ["solide", "rond"]).filter((a) => a.role === "figure").map((a) => a.nom === "rond" ? litteral(a.args[0]) : "polyedre");
    v.ok("1. la figure : polyèdre, cylindre, cône, polyèdre", ordre.join() === "polyedre,cylindre,cone,polyedre", ordre.join());
    const [p1, p4] = solides(1, "figure").map((s) => enveloppe(s.sommets));
    const triangles1 = p1.faces.filter((f) => f.sommets.length === 3);
    v.ok("1. ① : 2 triangles parallèles et 3 rectangles, un prisme", nbFaces(p1, 3) === 2 && nbFaces(p1, 4) === 3 && proche(Math.abs(dot(triangles1[0].normale, triangles1[1].normale)), 1));
    v.ok("1. ① est couché : ses bases sont verticales", triangles1.every((f) => proche(f.normale[2], 0)));
    v.ok("1. ④ : 4 faces triangulaires, une pyramide à base triangulaire", p4.F === 4 && nbFaces(p4, 3) === 4);
    const [q1, q4] = solides(1, "schema");
    const bases1 = triangles1.map((f) => trie(f.sommets.join(""))).sort();
    v.ok(`1. schéma : les bases de ① en orange (${bases1})`, JSON.stringify((q1.faces ?? []).map(trie).sort()) === JSON.stringify(bases1));
    v.ok("1. schéma : une base de ④ en orange", (q4.faces ?? []).length === 1 && p4.faces.some((f) => trie(f.sommets.join("")) === trie(q4.faces[0])));
    const ronds = lire(1, "rond", "schema");
    v.ok("1. schéma : les bases du cylindre et du cône en orange", ronds.length === 2 && ronds.every((r) => r[1] === true));
    dit(1, "c'est un prisme droit à base triangulaire, couché");
    dit(1, "c'est un cylindre, couché");
    dit(1, "c'est un cône, la pointe en bas");
    dit(1, "Réponse : ① prisme droit à base triangulaire ; ② cylindre ; ③ cône ; ④ pyramide à base triangulaire.");
  }
  {
    const [s] = solides(2);
    const env = enveloppe(s.sommets);
    v.ok(`2. le crayon : ${nbFaces(env, 6)} hexagones et ${nbFaces(env, 4)} rectangles`, nbFaces(env, 6) === 2 && nbFaces(env, 4) === 6);
    egalite(2, `$2 + 6 = ${env.F}$`.slice(1, -1));
    egalite(2, `12 + 6 = ${env.A}`);
    egalite(2, `6 + 6 = ${env.S}`);
    egalite(2, `${env.F} - ${env.A} + ${env.S} = 2`);
    const h = env.cachees.length;
    dit(2, `${h} arêtes sont en pointillés`);
    dit(2, `je compte ${env.A}, pas ${env.A - h}`);
    v.ok("2. les hexagones en orange sont les bases", JSON.stringify((s.faces ?? []).map(trie).sort()) === JSON.stringify(env.faces.filter((f) => f.sommets.length === 6).map((f) => trie(f.sommets.join(""))).sort()));
    dit(2, `Réponse : ${env.F} faces (2 hexagones et 6 rectangles), ${env.A} arêtes, ${env.S} sommets.`);
  }
  {
    const [[h]] = lire(3, "empilement", "figure");
    const [liste] = lire(3, "vues", "schema")[0];
    const dessus = liste.find((x) => x.titre === "de dessus");
    const face = liste.find((x) => x.titre === "de face");
    v.ok(`3. la vue de dessus dessinée est celle de l'empilement (${JSON.stringify(vueDessus(h))})`, JSON.stringify(dessus?.cases) === JSON.stringify(vueDessus(h)));
    v.ok(`3. la vue de face dessinée est celle de l'empilement (${vueFace(h)})`, JSON.stringify(face?.hauteurs) === JSON.stringify(vueFace(h)));
    const nd = vueDessus(h).flat().reduce((s, n) => s + n, 0);
    dit(3, `la vue de dessus a ${nd} carrés`);
    egalite(3, `${vueFace(h).join(" + ")} = ${vueFace(h).reduce((s, n) => s + n, 0)}`);
    dit(3, `seulement la rangée de devant (${h[0].slice(0, -1).join(", ")} et ${h[0].at(-1)})`);
    v.ok("3. le piège est bien différent de la vraie vue de face", JSON.stringify(h[0]) !== JSON.stringify(vueFace(h)));
  }
  {
    const [s] = solides(4, "schema");
    const env = enveloppe(s.sommets);
    const [liste] = lire(4, "vues", "figure")[0];
    const pts = Object.values(s.sommets);
    v.ok("4. la vue de face est la projection du solide dessiné", memeContour(liste.find((x) => x.titre === "de face").poly, pts, [0, 2]));
    v.ok("4. la vue de dessus est la projection du solide dessiné", memeContour(liste.find((x) => x.titre === "de dessus").poly, pts, [0, 1]));
    const tri = env.faces.filter((f) => f.sommets.length === 3);
    v.ok("4. un prisme à base triangulaire, bases horizontales (debout)", nbFaces(env, 3) === 2 && nbFaces(env, 4) === 3 && tri.every((f) => proche(Math.abs(f.normale[2]), 1)));
    dit(4, "Réponse : un prisme droit à base triangulaire, debout sur sa base.");
  }
  {
    const nets = lire(5, "patronCube", "figure").map((a) => a[0]);
    const schemas = lire(5, "patronCube", "schema");
    const noms = ["A", "B", "C", "D"];
    const valides = nets.map(estPatron);
    const oui = noms.filter((_, i) => valides[i]);
    const non = noms.filter((_, i) => !valides[i]);
    dit(5, `Réponse : ${oui.join(" et ")} sont des patrons de cube ; ${non.join(" et ")} n'en sont pas.`);
    nets.forEach((n, i) => {
      const faces = plier(n);
      const doublons = faces.map((f, j) => (faces.indexOf(f) !== j || faces.lastIndexOf(f) !== j ? j : -1)).filter((j) => j >= 0);
      const [cases, o] = schemas[i] ?? [];
      v.ok(`5. ${noms[i]} : schéma identique, « ${valides[i] ? "oui" : "non"} », cases en rouge = ${JSON.stringify(doublons)}`, JSON.stringify(cases) === JSON.stringify(n) && o?.etat === (valides[i] ? "oui" : "non") && JSON.stringify((o?.rouges ?? []).sort()) === JSON.stringify(doublons));
    });
    const B = plier(nets[1]);
    v.ok("5. B : le cinquième carré de la bande retombe sur le premier", B[4] === B[0]);
    const D5 = plier(nets[3]);
    const bande = nets[3].map((p, j) => [p, j]).filter(([p]) => p[1] === 2).sort((x, y) => x[0][0] - y[0][0]);
    const haut = nets[3].findIndex((p) => p[1] === 0);
    v.ok("5. D : le carré tout en haut retombe sur le troisième carré de la bande", D5[haut] === D5[bande[2][1]]);
  }
  {
    const [f] = solides(6, "figure");
    const [s] = solides(6, "schema");
    const env = enveloppe(f.sommets);
    const S = f.sommets;
    const proj = (q) => [q[0] + K * q[1], q[2] + K * q[1]];
    const dessine = (n) => long2(proj(S[n[0]]), proj(S[n[1]]));
    const vrai = (n) => norme(sub(S[n[1]], S[n[0]]));
    v.ok("6. ABC rectangle en A", proche(dot(sub(S.B, S.A), sub(S.C, S.A)), 0));
    v.ok("6. la face avant est en vraie grandeur, la fuyante réduite de moitié", proche(dessine("AB"), vrai("AB")) && proche(dessine("CA"), vrai("CA")) && proche(dessine("BE"), vrai("BE") / 2));
    const lu = (t) => Number(t.replace(" cm", "").replace(",", "."));
    v.ok(`6. l'énoncé : les cotes du dessin sont ses longueurs dessinées (AB ${dessine("AB")}, AC ${dessine("CA")}, BE ${dessine("BE")})`, ["AB", "CA", "BE"].every((n) => proche(lu(f.cotes[n][0]), dessine(n), 1e-6)) && e(6).includes(`BE = ${f.cotes.BE[0]}`));
    v.ok(`6. le schéma : BE vaut ${vrai("BE")} en vrai`, proche(lu(s.cotes.BE[0]), vrai("BE")));
    egalite(6, `3{,}5 \\times 2 = ${vrai("BE")}`);
    v.ok(`6. les trois arêtes cachées partent de D (${env.cachees})`, env.cachees.length === 3 && env.cachees.every((n) => n.includes("D")));
    const liste6 = env.cachees.map((n) => `[${n}]`);
    const texte6 = `${liste6.slice(0, -1).join(", ")} et ${liste6.at(-1)}`;
    dit(6, `${texte6}, sont en pointillés`, `${texte6} : les arêtes cachées recalculées`);
    dit(6, `Réponse : AB = 4 cm, AC = 3 cm ; BE = ${vrai("BE")} cm ; ${texte6} sont en pointillés.`);
  }
  {
    const [sa, sb] = solides(7, "schema");
    const S = sa.sommets;
    v.ok("7. la base : AB = 4, isocèle en C, hauteur 3, arêtes de 6", proche(norme(sub(S.B, S.A)), 4) && proche(norme(sub(S.C, S.A)), norme(sub(S.C, S.B))) && proche(S.C[2] - S.A[2], 3) && proche(norme(sub(S.D, S.A)), 6));
    const surArete = (s, p) => s.aretes.some((n) => {
      const [a, bb] = [s.sommets[n[0]], s.sommets[n[1]]];
      return proche(norme(sub(p, a)) + norme(sub(bb, p)), norme(sub(bb, a)), 1e-9);
    });
    const normaleDe = (pts) => {
      const n = cross(sub(pts[1], pts[0]), sub(pts[2], pts[0]));
      return n.map((x) => x / norme(n));
    };
    const coplanaire = (pts) => pts.every((p) => proche(dot(normaleDe(pts), sub(p, pts[0])), 0));
    const parallele = (pts, face) => proche(Math.abs(dot(normaleDe(pts), normaleDe(face))), 1);
    const cotesDe = (pts) => pts.map((p, i) => norme(sub(pts[(i + 1) % pts.length], p))).sort((x, y) => x - y);
    const A = sa.plan;
    v.ok("7. a) le plan : 3 points sur les arêtes, parallèle à ABC", A.length === 3 && A.every((p) => surArete(sa, p)) && parallele(A, [S.A, S.B, S.C]));
    v.ok("7. a) la section a les côtés de la base (triangle identique)", JSON.stringify(cotesDe(A).map((x) => x.toFixed(6))) === JSON.stringify(cotesDe([S.A, S.B, S.C]).map((x) => x.toFixed(6))));
    const B7 = sb.plan;
    v.ok("7. b) le plan : 4 points sur les arêtes, coplanaires, parallèle à ABED", B7.length === 4 && B7.every((p) => surArete(sb, p)) && coplanaire(B7) && parallele(B7, [S.A, S.B, S.E]));
    const angles = B7.map((p, i) => dot(sub(B7[(i + 1) % 4], p), sub(B7[(i + 3) % 4], p)));
    v.ok(`7. b) la section est un rectangle, de longueur ${Math.max(...cotesDe(B7))}`, angles.every((x) => proche(x, 0)) && proche(Math.max(...cotesDe(B7)), norme(sub(S.D, S.A))));
    dit(7, "Réponse : a) un triangle isocèle identique à ABC ; b) un rectangle de 6 cm de long.");
  }
  {
    const [s] = solides(8, "schema");
    const S = s.sommets;
    const milieu = (p, q) => p.map((x, i) => (x + q[i]) / 2);
    const plan = s.plan;
    v.ok("8. le plan passe par les milieux de [SA], [SB] et [SC]", ["A", "B", "C"].every((n, i) => milieu(S.S, S[n]).every((x, j) => proche(x, plan[i][j]))));
    const cotes = (pts) => pts.map((p, i) => norme(sub(pts[(i + 1) % 3], p)));
    const base = cotes([S.A, S.B, S.C]);
    v.ok(`8. la base est équilatérale de côté 8 (${base.map((x) => x.toFixed(3))})`, base.every((x) => Math.abs(x / 8 - 1) < 0.01));
    v.ok("8. chaque côté de la section est la moitié du côté de la base", cotes(plan).every((x, i) => proche(x, base[i] / 2, 1e-9)));
    const [[pieces]] = lire(8, "aPlat");
    const c2 = (pts) => pts.map((p, i) => long2(p, pts[(i + 1) % 3]));
    v.ok("8. à plat : la base de 8 et la section de 4, à la même échelle", c2(pieces[0].pts).every((x) => Math.abs(x / 8 - 1) < 0.01) && c2(pieces[1].pts).every((x) => Math.abs(x / 4 - 1) < 0.01));
    egalite(8, "8 \\div 2 = 4");
    dit(8, "Réponse : un triangle équilatéral de 4 cm de côté, plus petit que la base.");
  }

  /* ── ★★ Type devoir ───────────────────────────────────────────────── */
  v.titre("★★ Type devoir");
  {
    const [[pf, bf]] = lire(9, "aPlat", "figure");
    const [[ps, bs]] = lire(9, "aPlat", "schema");
    v.ok("9. le schéma reprend le patron de l'énoncé", JSON.stringify(pf) === JSON.stringify(ps));
    const tris = pf.filter((p) => p.pts.length === 3);
    const rects = pf.filter((p) => p.pts.length === 4);
    v.ok("9. 2 triangles et 3 rectangles : 5 faces", tris.length === 2 && rects.length === 3);
    const cotes = (p) => p.pts.map((a, i) => long2(a, p.pts[(i + 1) % p.pts.length])).sort((x, y) => x - y);
    const t = cotes(tris[0]);
    v.ok(`9. le triangle a pour côtés ${t.join(", ")}, rectangle (3² + 4² = 5²)`, proche(t[0] ** 2 + t[1] ** 2, t[2] ** 2) && JSON.stringify(cotes(tris[1])) === JSON.stringify(t));
    const largeurs = rects.map((r) => Math.min(...cotes(r))).sort((x, y) => x - y);
    v.ok(`9. les largeurs des rectangles sont les côtés du triangle (${largeurs})`, JSON.stringify(largeurs) === JSON.stringify(t));
    const inconnu = bf.find((x) => x.texte === "?");
    const lg = long2(inconnu.de, inconnu.a);
    v.ok(`9. le bord « ? » mesure ${lg}`, proche(lg, t[2]));
    dit(9, `Le troisième a donc ${lg} cm de large`);
    dit(9, `? = ${lg} cm`);
    const libres = bordsLibres(pf);
    const cle = (a, bb) => [a, bb].map((p) => `${p[0]},${p[1]}`).sort().join("|");
    const couleurs = new Map();
    for (const x of bs.filter((x) => x.couleur)) couleurs.set(x.couleur, [...(couleurs.get(x.couleur) ?? []), x]);
    const paires = [...couleurs.values()];
    v.ok(`9. ${paires.length} paires de bords qui se collent, chacune de même longueur`, paires.length === 5 && paires.every((p) => p.length === 2 && proche(long2(p[0].de, p[0].a), long2(p[1].de, p[1].a))));
    const colles = new Set(paires.flat().map((x) => cle(x.de, x.a)));
    v.ok(`9. les ${libres.length} bords libres du patron sont tous appariés`, libres.length === 10 && libres.every((l) => colles.has(l.k)) && colles.size === 10);
    // Le côté de 5 du triangle du HAUT et le haut du rectangle de 5 ont la même couleur.
    const haut = tris.find((p) => p.pts.some((q) => q[1] > 8));
    const hyp = haut.pts.map((a, i) => [a, haut.pts[(i + 1) % 3]]).find(([a, bb]) => proche(long2(a, bb), t[2]));
    const paireHyp = paires.find((p) => p.some((x) => cle(x.de, x.a) === cle(...hyp)));
    const autre = paireHyp?.find((x) => cle(x.de, x.a) !== cle(...hyp));
    const rect5 = rects.find((r) => proche(Math.min(...cotes(r)), t[2]));
    const hautRect5 = rect5.pts.map((a, i) => [a, rect5.pts[(i + 1) % 4]]).find(([a, bb]) => a[1] === bb[1] && a[1] === Math.max(...rect5.pts.map((q) => q[1])));
    v.ok("9. le côté de 5 du triangle du haut se colle contre le haut du rectangle de 5", !!autre && cle(autre.de, autre.a) === cle(...hautRect5));
    dit(9, "Réponse : un prisme droit à base triangulaire, 5 faces ; ? = 5 cm ; contre le haut du rectangle de 5 cm.");
  }
  {
    const [liste] = lire(10, "vues", "figure")[0];
    const dessus = liste.find((x) => x.titre === "de dessus").cases;
    const face = liste.find((x) => x.titre === "de face").hauteurs;
    const droite = liste.find((x) => x.titre === "de droite").hauteurs;
    // Tous les empilements : chaque case occupée reçoit de 1 à hmax cubes.
    const occ = [...dessus].reverse();
    const cellules = [];
    occ.forEach((l, y) => l.forEach((n, x) => n && cellules.push([y, x])));
    const hmax = Math.max(...face, ...droite);
    let [mini, maxi, nb] = [Infinity, -Infinity, 0];
    const h = occ.map((l) => l.map(() => 0));
    const essai = (i) => {
      if (i === cellules.length) {
        if (JSON.stringify(vueFace(h)) === JSON.stringify(face) && JSON.stringify(vueDroite(h)) === JSON.stringify(droite)) {
          nb++;
          mini = Math.min(mini, total(h));
          maxi = Math.max(maxi, total(h));
        }
        return;
      }
      const [y, x] = cellules[i];
      for (let n = 1; n <= hmax; n++) {
        h[y][x] = n;
        essai(i + 1);
      }
      h[y][x] = 0;
    };
    essai(0);
    v.ok(`10. ${nb} empilements ont ces trois vues : de ${mini} à ${maxi} cubes`, nb > 1 && mini === 9 && maxi === 11);
    const [plus, moins] = lire(10, "empilement", "schema").map((a) => a[0]);
    const memes = (x) => JSON.stringify(vueDessus(x)) === JSON.stringify(dessus) && JSON.stringify(vueFace(x)) === JSON.stringify(face) && JSON.stringify(vueDroite(x)) === JSON.stringify(droite);
    v.ok(`10. les deux empilements dessinés ont les trois vues, avec ${total(plus)} et ${total(moins)} cubes`, memes(plus) && memes(moins) && total(plus) === maxi && total(moins) === mini);
    egalite(10, `${plus.flat().join(" + ")} = ${maxi}`);
    egalite(10, `${moins.flat().join(" + ")} = ${mini}`);
    dit(10, `Réponse : au plus ${maxi} cubes, au moins ${mini}.`);
  }
  {
    const [f] = solides(11, "figure");
    const [s] = solides(11, "schema");
    const env = enveloppe(f.sommets);
    const dessine = new Set(f.cachees.map(trie));
    const vrai = new Set(env.cachees);
    const faux = [...new Set([...dessine, ...vrai])].filter((n) => dessine.has(n) !== vrai.has(n)).sort();
    v.ok(`11. le dessin de Léa a exactement deux erreurs : ${faux.join(", ")}`, faux.length === 2);
    const plein = faux.find((n) => vrai.has(n));
    const pointille = faux.find((n) => !vrai.has(n));
    dit(11, `Léa a tracé [${plein}] en trait plein`);
    dit(11, `elle a mis [${pointille}] en pointillés`);
    const m = /\[(\w\w)\], \[(\w\w)\] et \[(\w\w)\]/.exec(c(11));
    v.ok(`11. le corrigé nomme les arêtes cachées recalculées (${env.cachees})`, JSON.stringify(m ? m.slice(1).map(trie).sort() : []) === JSON.stringify(env.cachees));
    const proj = (q) => [q[0] + K * q[1], q[2] + K * q[1]];
    const dess = (n) => long2(proj(f.sommets[n[0]]), proj(f.sommets[n[1]]));
    const lu = (t) => Number(t.replace(" cm", "").replace(",", "."));
    v.ok("11. les cotes du dessin de Léa sont ses longueurs dessinées", ["AB", "AE", "BC"].every((n) => proche(lu(f.cotes[n][0]), dess(n))) && e(11).includes(`BC = ${f.cotes.BC[0]}`));
    v.ok(`11. le schéma : BC = ${f.dims[1]} en vrai`, proche(lu(s.cotes.BC[0]), f.dims[1]));
    egalite(11, `2 \\times 2 = ${f.dims[1]}`);
    dit(11, `le pavé mesure ${f.dims[0]} cm, ${f.dims[1]} cm et ${f.dims[2]} cm`);
  }
  {
    const [[cases, o]] = lire(12, "patronCube", "figure");
    const [[cases2, o2]] = lire(12, "patronCube", "schema");
    const faces = plier(cases);
    v.ok("12. c'est un patron de cube", estPatron(cases) && JSON.stringify(cases) === JSON.stringify(cases2));
    const oppose = (i) => faces.findIndex((f) => f === faces[i].split(",").map((x) => String(-Number(x) || 0)).join(","));
    const valeurs = [...o.marques];
    ["a", "b", "c"].forEach((l) => {
      const i = valeurs.indexOf(l);
      const j = oppose(i);
      const connu = Number(o.marques[j]);
      valeurs[i] = String(7 - connu);
      dit(12, `$${l} = 7 - ${connu} = ${7 - connu}$`, `${l} = 7 − ${connu} = ${7 - connu} (face opposée recalculée en pliant)`);
    });
    v.ok(`12. le schéma porte ${valeurs.join(", ")}`, JSON.stringify(o2.marques) === JSON.stringify(valeurs));
    v.ok("12. 1 à 6 une fois chacun, opposés de somme 7", new Set(valeurs).size === 6 && valeurs.every((x, i) => Number(x) + Number(valeurs[oppose(i)]) === 7));
    const [i2, ia] = [o.marques.indexOf("2"), o.marques.indexOf("a")];
    v.ok("12. 2 et a se font face sans être dans la même rangée", oppose(i2) === ia && cases[i2][1] !== cases[ia][1]);
    dit(12, `Réponse : a = ${valeurs[3]}, b = ${valeurs[4]}, c = ${valeurs[5]}.`);
  }
  {
    const [s] = solides(13, "schema");
    const S = s.sommets;
    v.ok("13. le plan de coupe passe par A, C, G et E", ["A", "C", "G", "E"].every((n, i) => s.plan[i].every((x, j) => proche(x, S[n][j]))));
    const [ab, bc, ae] = s.dims;
    v.ok(`13. le bloc dessiné mesure ${s.dims.join(" × ")}`, e(13).includes(`AB = ${ab} cm, BC = ${bc} cm et AE = ${ae} cm`));
    const AC = norme(sub(S.C, S.A));
    v.ok(`13. AC mesuré dans l'espace : ${AC}`, proche(AC, 13));
    dit(13, `$AC^2 = ${ab}^2 + ${bc}^2 = ${ab * ab} + ${bc * bc} = ${ab * ab + bc * bc}$, et $AC = ${AC}$ cm`);
    egalite(13, `${AC} \\times ${ae} = ${AC * ae}`);
    egalite(13, `${ab} \\times ${ae} = ${ab * ae}`);
    v.ok("13. la section est plus grande que la face ABFE", AC * ae > ab * ae);
    const [[pieces]] = lire(13, "aPlat");
    const dims = (p) => [Math.max(...p.pts.map((q) => q[0])) - Math.min(...p.pts.map((q) => q[0])), Math.max(...p.pts.map((q) => q[1])) - Math.min(...p.pts.map((q) => q[1]))];
    v.ok("13. à plat : la section 13 × 7 et la face 12 × 7", dims(pieces[0]).join() === `${AC},${ae}` && dims(pieces[1]).join() === `${ab},${ae}`);
    dit(13, `Réponse : un rectangle de ${AC} cm sur ${ae} cm, d'aire ${AC * ae} cm², plus grand que la face ABFE (${ab * ae} cm²).`);
  }
  {
    const FORMES = { "cube/diagonale": "rectangle", "cone/verticale": "triangle", "cylindre/parallele_base": "disque", "pyramide/parallele_base": "petit_carre", "cube/parallele_face": "carre", "cylindre/parallele_axe": "rectangle" };
    const MOTS = { rectangle: "un rectangle", triangle: "un triangle", disque: "un disque", petit_carre: "un carré plus petit" };
    const coupes = lire(14, "coupe", "figure").map(([s, p]) => FORMES[`${s}/${p}`]);
    const [liste] = lire(14, "formes", "schema")[0];
    v.ok(`14. les formes dessinées suivent les coupes (${coupes})`, JSON.stringify(liste.map((x) => x.forme)) === JSON.stringify(coupes));
    const rep = coupes.map((f, i) => `${"①②③④"[i]} ${MOTS[f]}`).join(" ; ");
    dit(14, `Réponse : ${rep}.`);
    v.ok("14. l'énoncé nomme les solides dans l'ordre des dessins", lire(14, "coupe", "figure").map(([s]) => s).join() === "cube,cone,cylindre,pyramide" && e(14).includes("① un cube, ② un cône, ③ un cylindre, ④ une pyramide"));
  }
  {
    const [s] = solides(15, "figure");
    const env = enveloppe(s.sommets);
    const penta = env.faces.filter((f) => f.sommets.length === 5);
    v.ok(`15. la maison : ${penta.length} pentagones parallèles et ${nbFaces(env, 4)} rectangles`, penta.length === 2 && nbFaces(env, 4) === 5 && proche(Math.abs(dot(penta[0].normale, penta[1].normale)), 1));
    v.ok("15. les pignons sont debout, sur les côtés (normales horizontales)", penta.every((f) => proche(f.normale[2], 0)));
    egalite(15, `5 + 5 = 10`);
    egalite(15, `10 + 5 = ${env.A}`);
    dit(15, `$5 + 5 = ${env.S}$`, "les sommets");
    dit(15, `soit ${env.F} faces`);
    egalite(15, "6 + 5 = 11");
    const [liste] = lire(15, "vues", "schema")[0];
    const pts = Object.values(s.sommets);
    const AXES = { "de face": [0, 2], "de droite": [1, 2], "de dessus": [0, 1] };
    for (const vu of liste) {
      v.ok(`15. vue ${vu.titre} : le contour est la projection du solide`, memeContour(vu.poly, pts, AXES[vu.titre]));
      for (const l of vu.lignes ?? []) {
        const ax = AXES[vu.titre];
        const vient = s.aretes.some((n) => {
          const [p, q] = [s.sommets[n[0]], s.sommets[n[1]]].map((x) => ax.map((i) => x[i]));
          return (long2(p, l[0]) < 1e-9 && long2(q, l[1]) < 1e-9) || (long2(p, l[1]) < 1e-9 && long2(q, l[0]) < 1e-9);
        });
        v.ok(`15. vue ${vu.titre} : le trait intérieur est une arête projetée`, vient);
      }
    }
    dit(15, `Réponse : un prisme droit à base pentagonale (les pignons) ; ${env.F} faces, ${env.A} arêtes, ${env.S} sommets.`);
  }
  {
    const [[h, o]] = lire(16, "empilement", "schema");
    const n = 3;
    v.ok("16. le schéma : le cube 3 × 3 × 3 entier, peint", h.length === n && h.every((l) => l.length === n && l.every((x) => x === n)) && o?.peint === true);
    const compte = [0, 0, 0, 0];
    for (let x = 0; x < n; x++) for (let y = 0; y < n; y++) for (let z = 0; z < n; z++) compte[[x, y, z].filter((t) => t === 0 || t === n - 1).length]++;
    egalite(16, `3 \\times 3 \\times 3 = ${n ** 3}`);
    dit(16, `sommets : ${compte[3]} cubes`, "coins");
    dit(16, `12 arêtes : ${compte[2]} cubes`);
    dit(16, `Un par face : ${compte[1]} cubes`);
    dit(16, `: ${compte[0]} cube, invisible`);
    egalite(16, `${compte[3]} + ${compte[2]} + ${compte[1]} + ${compte[0]} = 27`);
    const [[, lignes]] = lire(16, "tableauProba");
    v.ok("16. le tableau : 8, 12, 6, 1", JSON.stringify(lignes[0].slice(1)) === JSON.stringify([compte[3], compte[2], compte[1], compte[0]].map(String)));
    dit(16, `Réponse : 27 cubes ; ${compte[3]} avec 3 faces peintes, ${compte[2]} avec 2, ${compte[1]} avec 1, et ${compte[0]} sans peinture.`);
  }

  /* ── ★★★ Problèmes ────────────────────────────────────────────────── */
  v.titre("★★★ Problèmes");
  {
    const [f] = solides(17, "figure");
    const [s1, s2] = solides(17, "schema");
    v.ok("17. la figure et le premier schéma sont le même cristal", JSON.stringify(f.sommets) === JSON.stringify(s1.sommets));
    const e1 = enveloppe(s1.sommets);
    const e2 = enveloppe(s2.sommets);
    v.ok(`17. une pointe : 1 hexagone, ${nbFaces(e1, 4)} rectangles, ${nbFaces(e1, 3)} triangles`, nbFaces(e1, 6) === 1 && nbFaces(e1, 4) === 6 && nbFaces(e1, 3) === 6);
    egalite(17, `1 + 6 + 6 = ${e1.F}`);
    egalite(17, `6 + 6 + 6 + 6 = ${e1.A}`);
    egalite(17, `6 + 6 + 1 = ${e1.S}`);
    egalite(17, `${e1.F} - ${e1.A} + ${e1.S} = 2`);
    v.ok(`17. deux pointes : ${e2.F} faces, ${e2.A} arêtes, ${e2.S} sommets`, nbFaces(e2, 3) === 12 && nbFaces(e2, 4) === 6);
    egalite(17, `6 + 6 + 6 = ${e2.F}`);
    egalite(17, `${e1.A} + 6 = ${e2.A}`);
    egalite(17, `${e1.S} + 1 = ${e2.S}`);
    egalite(17, `${e2.F} - ${e2.A} + ${e2.S} = 2`);
    const prisme = enveloppe(Object.fromEntries(Object.entries(s1.sommets).filter(([n]) => n !== "S")));
    const pyr = enveloppe(Object.fromEntries(Object.entries(s1.sommets).filter(([n]) => "GHIJKLS".includes(n))));
    v.ok(`17. le piège : prisme ${prisme.F} faces + pyramide ${pyr.F} faces − 2 = ${e1.F}`, prisme.F + pyr.F - 2 === e1.F);
    egalite(17, `${prisme.F + pyr.F} - 2 = ${e1.F}`);
    dit(17, `${e1.F} faces, ${e1.A} arêtes, ${e1.S} sommets ; avec deux pointes, ${e2.F} faces, ${e2.A} arêtes, ${e2.S} sommets.`);
  }
  {
    const [[R, Hc, Ht, coupes]] = lire(18, "silo");
    v.ok(`18. le silo dessiné : diamètre ${2 * R} m, fût ${Hc} m, toit ${Ht} m`, e(18).includes(`${2 * R} m de diamètre et de ${Hc} m de haut`) && e(18).includes(`${Ht} m de haut`));
    v.ok("18. les coupes à 4 m et 11 m", JSON.stringify(coupes) === "[4,11]" && e(18).includes("à 4 m du sol") && e(18).includes("à 11 m du sol"));
    // Le profil du toit : de (R ; Hc) à la pointe (0 ; Hc + Ht). Son milieu, par les coordonnées.
    const milieu = [(R + 0) / 2, (Hc + Hc + Ht) / 2];
    v.ok(`18. 11 m est la mi-hauteur du toit (${milieu[1]} m), où la demi-largeur vaut ${milieu[0]} m`, milieu[1] === 11 && milieu[0] === 1.5);
    v.ok("18. à 4 m, dans le fût : le rayon de la base", 4 <= Hc);
    const [liste] = lire(18, "vues")[0];
    v.ok("18. les deux disques dessinés : rayons 3 et 1,5", JSON.stringify(liste.map((x) => x.cercle)) === JSON.stringify([R, milieu[0]]));
    egalite(18, "6 \\div 2 = 3");
    egalite(18, "3 \\div 2 = 1{,}5");
    dit(18, "à 4 m, un disque de rayon 3 m ; à 11 m, un disque de rayon 1,5 m ; par l'axe, un pentagone.");
  }
  {
    const [[L, p1, p2, x, exag]] = lire(19, "bassin");
    v.ok(`19. le bassin dessiné : ${L} m, de ${p1} m à ${p2} m, coupe à ${x} m`, e(19).includes(`${L} m de long`) && e(19).includes(`de ${p1} m au petit bain à ${p2} m`) && e(19).includes(`à ${x} m du petit bain`));
    const larg = D(/et ([\d,]+) m de large/.exec(e(19))[1]);
    v.ok("19. 5 couloirs de 2,5 m font la largeur", egal(fois(Q(5), D("2,5")), larg));
    // L'eau : le prisme construit à partir des nombres de l'énoncé.
    const l = Number(larg.n) / Number(larg.d);
    const eau = enveloppe({ A: [0, 0, p2 - p1], B: [L, 0, 0], C: [L, l, 0], D: [0, l, p2 - p1], E: [0, 0, p2], F: [L, 0, p2], G: [L, l, p2], H: [0, l, p2] });
    const bases = eau.faces.filter((f) => proche(Math.abs(f.normale[1]), 1));
    v.ok(`19. l'eau : ${eau.F} faces, ${eau.A} arêtes, ${eau.S} sommets, et ses deux faces de côté sont les bases`, eau.F === 6 && eau.A === 12 && eau.S === 8 && bases.length === 2);
    egalite(19, "4 + 4 + 4 = 12");
    egalite(19, "4 + 4 = 8");
    const p = plus(D(String(p1)), div(fois(D(String(p2 - p1)), D(String(x))), D(String(L))));
    v.ok(`19. profondeur à ${x} m : ${Number(p.n) / Number(p.d)} m (fraction exacte)`, egal(p, D("1,4")));
    egalite(19, "1 \\div 25 = 0{,}04");
    egalite(19, "10 \\times 0{,}04 = 0{,}4");
    egalite(19, "1 + 0{,}4 = 1{,}4");
    v.ok("19. le piège : la moyenne 1,5 m n'est pas la bonne profondeur", !egal(p, D("1,5")) && c(19).includes("1,5 m"));
    const [[pieces]] = lire(19, "aPlat");
    const pts = pieces[0].pts;
    v.ok("19. à plat : le rectangle 12,5 × 1,4", proche(Math.max(...pts.map((q) => q[0])), l) && proche(Math.max(...pts.map((q) => q[1])), 1.4));
    dit(19, "Réponse : un prisme droit à base trapèze ; 6 faces, 12 arêtes, 8 sommets ; un trapèze ; un rectangle de 12,5 m sur 1,4 m.");
  }
  {
    const [[h]] = lire(20, "empilement");
    const [liste] = lire(20, "vues")[0];
    v.ok("20. le podium : 3 rangées, marches de 2, 3 et 1 cubes, 3 de large", h.length === 3 && h.every((l) => l.join() === "2,2,2,3,3,3,1,1,1"));
    const n = total(h);
    egalite(20, `18 + 27 + 9 = ${n}`);
    egalite(20, "9 \\times 2 = 18");
    egalite(20, "9 \\times 3 = 27");
    v.ok("20. les vues : de face l'escalier, de droite 3 × 3", JSON.stringify(liste.find((x) => x.titre === "de face").hauteurs) === JSON.stringify(vueFace(h)) && JSON.stringify(liste.find((x) => x.titre === "de droite").hauteurs) === JSON.stringify(vueDroite(h)));
    const fx = facesExposees(h);
    v.ok(`20. faces exposées : devant ${fx["-y"]}, derrière ${fx["+y"]}, dessus ${fx["+z"]}, vers la gauche ${fx["-x"]}, vers la droite ${fx["+x"]}`, fx["-y"] === 18 && fx["+y"] === 18 && fx["+z"] === 27 && fx["-x"] === 6 + 3 && fx["+x"] === 3 + 6);
    const somme = Object.values(fx).reduce((s, x) => s + x, 0);
    egalite(20, `3 \\times 2 + 3 \\times 3 + 3 \\times 1 = ${fx["-y"]}`);
    egalite(20, `18 + 18 + 27 + 6 + 3 + 3 + 6 = ${somme}`);
    const aire = fois(Q(somme), fois(D("0,2"), D("0,2")));
    v.ok(`20. aire : ${somme} × 0,04 = ${Number(aire.n) / Number(aire.d)} m² (exact)`, egal(aire, D("3,24")));
    egalite(20, "0{,}2 \\times 0{,}2 = 0{,}04");
    egalite(20, `${somme} \\times 0{,}04 = 3{,}24`);
    dit(20, `Réponse : ${n} cubes ; ${somme} carrés à peindre, soit 3,24 m².`);
  }
}

lancer({
  nom: "SOLIDES ET REPRÉSENTATIONS · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-solides.tsx",
  notionId: "vision_espace",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : une base orange qui n'en est pas une", 'faces: ["ABC", "DEF"] }),\n              rond("cylindre", true)', 'faces: ["ABC", "ABED"] }),\n              rond("cylindre", true)'],
    ["ex. 2 : les arêtes cachées oubliées", "je compte 18, pas 13", "je compte 13, pas 18"],
    ["ex. 2 : une arête cachée de trop sur le crayon", 'cachees: ["AB", "AF", "AG", "EF", "FL"]', 'cachees: ["AB", "AF", "AG", "EF", "FL", "KL"]'],
    ["ex. 3 : la vue de face réduite à la rangée de devant", '{ titre: "de face", hauteurs: [3, 1, 1] }]', '{ titre: "de face", hauteurs: [2, 1, 1] }]'],
    ["ex. 4 : la vue de dessus qui ne colle plus au solide", "poly: [[0, 0], [4, 0], [2.5, 3]] }", "poly: [[0, 0], [4, 0], [2, 3]] }"],
    ["ex. 5 : B déclaré patron", "A et C sont des patrons de cube ; B et D n'en sont pas", "A, B et C sont des patrons de cube ; D n'en est pas"],
    ["ex. 5 : la mauvaise case en rouge sur D", '[3, 2]], { etat: "non", rouges: [0, 4] }', '[3, 2]], { etat: "non", rouges: [0, 3] }'],
    ["ex. 6 : la fuyante mesurée à la règle", "Réponse : AB = 4 cm, AC = 3 cm ; BE = 7 cm", "Réponse : AB = 4 cm, AC = 3 cm ; BE = 3,5 cm"],
    ["ex. 6 : une étiquette posée sur une arête", 'noms: { A: "bg", B: "bd", C: "g", D: "hg", E: "d", F: "h" }, cotes: { AB: ["4 cm", "b"], CA: ["3 cm", "g"], BE: ["7 cm"', 'noms: { A: "bg", B: "bd", C: "g", D: "d", E: "d", F: "h" }, cotes: { AB: ["4 cm", "b"], CA: ["3 cm", "g"], BE: ["7 cm"'],
    ["ex. 7 : le plan b) plus parallèle au dessous", "plan: [[1, 0, 1.5], [3, 0, 1.5], [3, 6, 1.5], [1, 6, 1.5]]", "plan: [[1, 0, 1.5], [3, 0, 1.5], [3, 6, 1], [1, 6, 1]]"],
    ["ex. 7 : le plan a) plus parallèle aux bases", "plan: [[0, 3, 0], [4, 3, 0], [2, 3, 3]]", "plan: [[0, 3, 0], [4, 3, 0], [2, 2, 3]]"],
    ["ex. 8 : la section gardée à 8 cm", "Réponse : un triangle équilatéral de 4 cm de côté", "Réponse : un triangle équilatéral de 8 cm de côté"],
    ["ex. 9 : « ? » deviné à 4 cm", "Le troisième a donc 5 cm de large", "Le troisième a donc 4 cm de large"],
    ["ex. 9 : deux bords collés de longueurs différentes", '{ de: [3, 8], a: [3, 11], couleur: "#16a34a" }', '{ de: [3, 8], a: [7, 8], couleur: "#16a34a" }'],
    ["ex. 10 : un seul empilement possible", "Réponse : au plus 11 cubes, au moins 9.", "Réponse : au plus 11 cubes, au moins 11."],
    ["ex. 10 : l'empilement « au moins » ne donne plus la vue de droite", "empilement([[1, 1, 3], [2, 1, 1]])", "empilement([[1, 1, 3], [1, 1, 1]])"],
    ["ex. 11 : l'erreur de Léa mal nommée", "Léa a tracé [DH] en trait plein", "Léa a tracé [CG] en trait plein"],
    ["ex. 12 : a lu dans la mauvaise rangée", "Réponse : a = 5, b = 6, c = 4.", "Réponse : a = 6, b = 5, c = 4."],
    ["ex. 13 : la section prise pour la face", "Réponse : un rectangle de 13 cm sur 7 cm, d'aire 91 cm²", "Réponse : un rectangle de 12 cm sur 7 cm, d'aire 84 cm²"],
    ["ex. 13 : une cote fausse sur la figure plane", 'texte: "13 cm", cote: "b" }', 'texte: "12 cm", cote: "b" }'],
    ["ex. 14 : le cube coupé déclaré carré", "Réponse : ① un rectangle ; ② un triangle", "Réponse : ① un carré ; ② un triangle"],
    ["ex. 15 : faces du pavé et du toit additionnées", "soit 7 faces", "soit 11 faces"],
    ["ex. 15 : la vue de droite sans le toit", "poly: [[0, 0], [4, 0], [4, 3], [2, 5], [0, 3]]", "poly: [[0, 0], [4, 0], [4, 3], [0, 3]]"],
    ["ex. 16 : le cube du centre oublié", "Réponse : 27 cubes ; 8 avec 3 faces peintes, 12 avec 2, 6 avec 1, et 1 sans peinture.", "Réponse : 27 cubes ; 8 avec 3 faces peintes, 12 avec 2, 6 avec 1, et 0 sans peinture."],
    ["ex. 17 : faces du prisme et de la pyramide additionnées", "; 13 faces, 24 arêtes, 13 sommets ;", "; 15 faces, 24 arêtes, 13 sommets ;"],
    ["ex. 18 : le toit coupé au rayon du fût", "à 11 m, un disque de rayon 1,5 m ; par l'axe", "à 11 m, un disque de rayon 3 m ; par l'axe"],
    ["ex. 18 : le disque du toit dessiné trop grand", '{ titre: "à 11 m : rayon 1,5 m", cercle: 1.5 }', '{ titre: "à 11 m : rayon 1,5 m", cercle: 3 }'],
    ["ex. 19 : la profondeur moyenne", "Réponse : un prisme droit à base trapèze ; 6 faces, 12 arêtes, 8 sommets ; un trapèze ; un rectangle de 12,5 m sur 1,4 m.", "Réponse : un prisme droit à base trapèze ; 6 faces, 12 arêtes, 8 sommets ; un trapèze ; un rectangle de 12,5 m sur 1,5 m."],
    ["ex. 20 : les contremarches oubliées", "Réponse : 54 cubes ; 81 carrés à peindre, soit 3,24 m².", "Réponse : 54 cubes ; 72 carrés à peindre, soit 2,88 m²."],
    ["une micro d'une autre notion", 'micros: ["vision_vues", "vision_defi"],\n        },\n      ],\n    },\n  ],', 'micros: ["volume_solide_reconnaitre"],\n        },\n      ],\n    },\n  ],'],
    ["un $ dans un canvas", '[["petits cubes", "8", "12", "6", "1"]]', '[["petits cubes", "$8$", "12", "6", "1"]]'],
  ],
});
