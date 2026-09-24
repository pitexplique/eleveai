// Recalcul INDÉPENDANT des vingt corrigés de la feuille « La géométrie dans
// l'espace » de 3e (lib/fiches-exercices/maths-3e-geometrie-espace.tsx).
//
// ⭐ L'AUTRE CHEMIN :
// - les solides dessinés ne sont pas recomptés sur leur liste d'arêtes : le
//   script reconstruit leur ENVELOPPE CONVEXE à partir des seuls sommets (un
//   plan d'appui par triplet de sommets), en déduit faces, arêtes et sommets,
//   contrôle la relation d'Euler F − A + S = 2, puis retrouve les arêtes
//   CACHÉES par l'orientation des faces vers l'œil de la perspective cavalière
//   (direction (0,354 ; −1 ; 0,354)) — et les compare aux pointillés du dessin ;
// - le ballon de football est construit (icosaèdre tronqué, sommets en φ) et
//   compté de la même façon ;
// - les coordonnées d'un pavé sont reconstruites à partir de ses dimensions,
//   chaque déplacement du drone rejoué ordre par ordre ;
// - les villes sont confrontées à une table de coordonnées décimales
//   (GeoNames), arrondies ici au degré, lettres N/S, E/O comprises ; antipodes
//   et distances recalculées par la formule de haversine.
//
//   node scripts/verifier-exercices-geometrie-espace-3e.mjs

import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/* ── Géométrie ─────────────────────────────────────────────────────────── */
const K = 0.5 * Math.SQRT1_2;
const VERS_OEIL = [K, -1, K];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const trie = (nom) => [...nom].sort().join("");

/** Faces, arêtes (et lesquelles sont cachées) d'un polyèdre convexe, à partir de ses SEULS sommets. */
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
  return { F: liste.length, A: aretes.length, S: noms.length, faces: liste, aretes, cachees: aretes.filter((a) => a.cachee).map((a) => a.nom).sort() };
}

const sommetsPave = (a, b, c) => ({ A: [0, 0, 0], B: [a, 0, 0], C: [a, b, 0], D: [0, b, 0], E: [0, 0, c], F: [a, 0, c], G: [a, b, c], H: [0, b, c] });
const nb = (s) => Number(s);
const virgule = (x) => String(+x.toFixed(2)).replace(".", ",");
const coord = (p) => `(${p.map(virgule).join(" ; ")})`;

/* ── La Terre ──────────────────────────────────────────────────────────── */
// GeoNames, en degrés décimaux (Nord et Est positifs).
const VILLES = {
  Paris: [48.853, 2.349],
  Sydney: [-33.868, 151.207],
  Quito: [-0.2299, -78.525],
  Reykjavik: [64.135, -21.895],
  Tokyo: [35.69, 139.692],
  Stockholm: [59.329, 18.069],
  "Le Cap": [-33.926, 18.423],
  Madrid: [40.417, -3.704],
  Greenwich: [51.477, -0.0015],
  Weber: [-40.4, 176.32],
  Barfleur: [49.67, -1.26],
  "îles des Antipodes": [-49.68, 178.77],
  Hangzhou: [30.27, 120.15],
};
const r0 = (x) => (Math.round(x) === 0 ? 0 : Math.round(x));
const geo = (lat, lon) => {
  const [la, lo] = [r0(lat), r0(lon)];
  const L = la === 0 ? "0°" : `${Math.abs(la)}° ${la > 0 ? "N" : "S"}`;
  const G = lo === 0 ? "0°" : `${Math.abs(lo)}° ${lo > 0 ? "E" : "O"}`;
  return `(${L} ; ${G})`;
};
const TOUR = 40008; // km, par les pôles
function haversine([la1, lo1], [la2, lo2]) {
  const r = (d) => (d * Math.PI) / 180;
  const h = Math.sin(r(la2 - la1) / 2) ** 2 + Math.cos(r(la1)) * Math.cos(r(la2)) * Math.sin(r(lo2 - lo1) / 2) ** 2;
  return (TOUR / Math.PI) * Math.asin(Math.sqrt(h));
}
const antipode = ([la, lo]) => [-la, lo > 0 ? lo - 180 : lo + 180];

function verifier(source, v) {
  const { enonces, corrections, blocs } = lireFeuille(source);
  const e = (k) => enonces[k - 1] ?? "";
  const c = (k) => corrections[k - 1] ?? "";
  const b = (k) => blocs[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");

  // Les arêtes que le helper `pave` trace, relues dans sa définition.
  const def = source.slice(source.indexOf("const pave = "));
  const aretesPave = JSON.parse(/aretes: (\[[^\]]*\])/.exec(def)[1]);

  /** Les solides dessinés dans le bloc k : `pave(a, b, c, [cachees]` et `solide({ sommets: … })`. */
  const solides = (k) => {
    const res = [];
    for (const m of b(k).matchAll(/\bpave\(([\d.]+), ([\d.]+), ([\d.]+), (\[[^\]]*\])(, \{[^\n]*)?\)/g))
      res.push({ dims: [nb(m[1]), nb(m[2]), nb(m[3])], sommets: sommetsPave(nb(m[1]), nb(m[2]), nb(m[3])), aretes: aretesPave, cachees: JSON.parse(m[4]), options: m[5] ?? "" });
    for (const m of b(k).matchAll(/\bsolide\(\{ sommets: \{([^}]*)\}, aretes: (\[[^\]]*\]), cachees: (\[[^\]]*\])/g)) {
      const sommets = Object.fromEntries([...m[1].matchAll(/([A-Z]): \[(-?[\d.]+), (-?[\d.]+), (-?[\d.]+)\]/g)].map((x) => [x[1], [nb(x[2]), nb(x[3]), nb(x[4])]]));
      res.push({ sommets, aretes: JSON.parse(m[2]), cachees: JSON.parse(m[3]), options: "" });
    }
    return res;
  };
  /** Le dessin k : arêtes tracées = arêtes de l'enveloppe, pointillés = arêtes cachées, Euler. */
  const dessinJuste = (k, i = 0) => {
    const s = solides(k)[i];
    if (!s) {
      v.ok(`${k}. un solide est dessiné`, false, "aucun appel pave( ou solide( lu");
      return null;
    }
    const env = enveloppe(s.sommets);
    const traces = s.aretes.map(trie).sort();
    const vraies = env.aretes.map((a) => a.nom).sort();
    v.ok(`${k}. les ${traces.length} arêtes tracées sont celles du solide (${env.F} faces, ${env.A} arêtes, ${env.S} sommets)`, JSON.stringify(traces) === JSON.stringify(vraies), `tracées ${traces} ; vraies ${vraies}`);
    v.ok(`${k}. Euler : ${env.F} − ${env.A} + ${env.S} = 2`, env.F - env.A + env.S === 2);
    const pointilles = s.cachees.map(trie).sort();
    v.ok(`${k}. pointillés = arêtes cachées à l'œil (${env.cachees.join(", ")})`, JSON.stringify(pointilles) === JSON.stringify(env.cachees), `dessinées ${pointilles}`);
    return { ...s, env };
  };
  const points = (k) => [...b(k).matchAll(/\{ nom: "([^"]*)", p: \[(-?[\d.]+), (-?[\d.]+), (-?[\d.]+)\]/g)].map((m) => ({ nom: m[1], p: [nb(m[2]), nb(m[3]), nb(m[4])] }));
  const point = (k, nom) => points(k).find((p) => p.nom === nom)?.p;
  const memePoint = (p, q) => !!p && !!q && p.every((x, i) => Math.abs(x - q[i]) < 1e-9);
  const dans = (p, dims) => p.every((x, i) => x >= 0 && x <= dims[i]);
  const villes = (k) => [...b(k).matchAll(/\{ nom: "([^"]+)", lat: (-?[\d.]+), lon: (-?[\d.]+)/g)].map((m) => ({ nom: m[1], lat: nb(m[2]), lon: nb(m[3]) }));
  /** La première liste « [XY], [XY] et [XY] » du corrigé k = les arêtes cachées recalculées. */
  const cachees3 = (k, env) => {
    const m = /\[(\w\w)\], \[(\w\w)\] et \[(\w\w)\]/.exec(c(k));
    const lues = m ? m.slice(1).map(trie).sort() : [];
    v.ok(`${k}. le corrigé nomme les arêtes cachées recalculées (${env.cachees.join(", ")})`, JSON.stringify(lues) === JSON.stringify(env.cachees), `lu ${m?.[0]}`);
  };

  /* ── Toutes les villes écrites dans le texte, contre la table ─────────── */
  v.titre("Les villes, contre GeoNames");
  // Le Paris inversé de l'exercice 6 est le piège de l'énoncé : contrôlé à part.
  const piege6 = `Un élève écrit Paris ${geo(VILLES.Paris[1], VILLES.Paris[0])}`;
  v.ok("6. l'énoncé donne le piège : Paris aux coordonnées inversées", e(6).includes(piege6));
  const tout = [...enonces, ...corrections].join("\n").replace(piege6, "");
  for (const [nom, pos] of Object.entries(VILLES)) {
    const lus = [...tout.matchAll(new RegExp(`${nom} (\\([^)]*\\))`, "g"))].map((m) => m[1]);
    if (lus.length) v.ok(`${nom} ${geo(...pos)} partout où elle est écrite (${lus.length} fois)`, lus.every((t) => t === geo(...pos)), `lu ${lus.join(" | ")}`);
  }
  let dessinees = 0;
  const fautes = [];
  blocs.forEach((_, i) => {
    for (const w of villes(i + 1))
      if (VILLES[w.nom]) {
        dessinees++;
        if (r0(VILLES[w.nom][0]) !== w.lat || r0(VILLES[w.nom][1]) !== w.lon) fautes.push(`${i + 1} : ${w.nom} (${w.lat} ; ${w.lon})`);
      }
  });
  v.ok(`${dessinees} villes dessinées, toutes à leur place au degré près`, dessinees >= 7 && fautes.length === 0, fautes.join(" | "));

  // ⛔ Un dessin ne traverse pas KaTeX : aucun `$` dans un schéma ou une figure.
  const dollars = blocs
    .map((bl, i) => [i + 1, bl.slice(bl.search(/\b(schema|figure):/)).replace(/\n\s+correction:[\s\S]*?\n\s+(schema:|micros:)/, "\n$1")])
    .filter(([, t]) => /(schema|figure):/.test(t) && t.split("micros:")[0].includes("$"));
  v.ok("aucun $ dans les schémas et les figures", dollars.length === 0, dollars.map(([k]) => k).join(", "));

  v.titre("★ Un seul geste");
  const s1 = dessinJuste(1);
  v.ok("1. le dessin est une pyramide à base carrée (une face à 4 sommets, 4 triangles)", !!s1 && s1.env.faces.filter((f) => f.sommets.length === 4).length === 1 && s1.env.faces.filter((f) => f.sommets.length === 3).length === 4);
  dit(1, "c'est une pyramide à base carrée (le dessin)");
  dit(1, "Réponse : cube ; cylindre ; pyramide à base carrée ; prisme droit ; boule ; cône.");

  const s2 = dessinJuste(2);
  if (s2) {
    const { F, A, S } = s2.env;
    const tri = s2.env.faces.filter((f) => f.sommets.length === 3).length;
    const rect = s2.env.faces.filter((f) => f.sommets.length === 4).length;
    v.ok(`2. ${tri} triangles et ${rect} rectangles`, tri === 2 && rect === 3);
    dit(2, `En tout ${tri} + ${rect} = ${F} faces`);
    dit(2, `6 + 3 = ${A} arêtes`);
    dit(2, `3 + 3 = ${S} sommets`);
    dit(2, `$${F} - ${A} + ${S} = 2$`);
    const t = s2.env.cachees;
    v.ok(`2. les arêtes cachées partent toutes de D : ${t.join(", ")}`, t.length === 3 && t.every((n) => n.includes("D")));
    dit(2, `${t.length} pointillés, et ${A} − ${t.length} = ${A - t.length} traits pleins`);
    dit(2, `${F} faces (2 triangles et 3 rectangles), ${A} arêtes, ${S} sommets, dont ${t.length} arêtes cachées`);
    dit(2, "[AD], [DE] et [DF]");
  }

  const s3 = dessinJuste(3);
  if (s3) {
    cachees3(3, s3.env);
    const G = s3.sommets;
    const droit = (p, q, r) => Math.abs(dot(sub(G[p], G[q]), sub(G[r], G[q]))) < 1e-9;
    v.ok("3. BCGF a quatre angles droits : un rectangle", droit("B", "C", "G") && droit("C", "G", "F") && droit("G", "F", "B") && droit("F", "B", "C"));
    dit(3, "BCGF est un rectangle.");
    const paralleles = aretesPave.filter((n) => n !== "AE" && Math.hypot(...cross(sub(G[n[1]], G[n[0]]), sub(G.E, G.A))) < 1e-9);
    v.ok(`3. parallèles à [AE] : ${paralleles.join(", ")}`, paralleles.join() === "BF,CG,DH");
    dit(3, "[AD], [DC] et [DH] ; BCGF est un rectangle ; [BF], [CG] et [DH].");
  }

  const secs = { "cylindre/parallele_axe": "rectangle", "cylindre/parallele_base": "disque", "cube/parallele_face": "carré" };
  const m4 = /coupe\("(\w+)", "(\w+)", "([^"]*)"\)/.exec(b(4));
  v.ok(`4. le dessin : ${m4?.[1]} coupé ${m4?.[2]}, soit un ${secs[`${m4?.[1]}/${m4?.[2]}`]}`, !!m4 && secs[`${m4[1]}/${m4[2]}`] === "rectangle" && m4[3].includes("rectangle"));
  dit(4, "la section est un rectangle (le dessin)");
  dit(4, "Réponse : un carré ; un disque ; un rectangle ; un carré plus petit ; un disque.");

  const d5 = /AB = (\d+), AD = (\d+) et AE = (\d+)/.exec(e(5))?.slice(1).map(nb);
  const s5 = dessinJuste(5);
  v.ok(`5. le pavé dessiné a les dimensions de l'énoncé (${d5})`, !!s5 && !!d5 && JSON.stringify(s5.dims) === JSON.stringify(d5));
  if (d5) {
    const S5 = sommetsPave(...d5);
    for (const n of ["A", "B", "D", "E", "C", "G"]) dit(5, `${n}${coord(S5[n])}`);
    dit(5, `puis je monte de ${d5[2]} (le chemin orange) : G${coord(S5.G)}`);
    v.ok("5. le point marqué est G, avec son chemin", memePoint(point(5, "G"), S5.G) && /chemin: true/.test(b(5)));
    const faux = [S5.G[0], S5.G[2], S5.G[1]];
    v.ok(`5. le piège G${coord(faux)} n'est pas G`, !memePoint(faux, S5.G));
    dit(5, `G${coord(faux)}`, "le piège nommé");
  }

  const w6 = Object.fromEntries(villes(6).map((w) => [w.nom, w]));
  v.ok("6. le dessin place Paris, angle de latitude compris", !!w6.Paris && /angle: true/.test(b(6)));
  const hemi = (pos) => `${pos[0] > 0 ? "N, donc au nord" : "S, donc au sud"} de l'équateur ; ${pos[1] > 0 ? "E, donc à l'est" : "O, donc à l'ouest"} de Greenwich`;
  dit(6, `Paris ${geo(...VILLES.Paris)} : ${hemi(VILLES.Paris)}`);
  dit(6, `Sydney ${geo(...VILLES.Sydney)} : ${hemi(VILLES.Sydney)}`);
  const inverse = [r0(VILLES.Paris[1]), r0(VILLES.Paris[0])];
  const loin6 = haversine(VILLES.Paris, inverse);
  v.ok(`6. le Paris inversé ${geo(...inverse)} est à ${Math.round(loin6)} km de Paris (plus de 5 000)`, loin6 > 5000);
  dit(6, `${geo(...inverse)} voudrait dire`);
  dit(6, `les ${r0(VILLES.Paris[0])}° de Paris sont un ANGLE`);

  v.titre("Latitudes et longitudes : les bornes");
  v.ok("7. Quito arrondie a une latitude de 0°", r0(VILLES.Quito[0]) === 0);
  v.ok("7. une latitude ≤ 90, une longitude ≤ 180 : 120 n'est possible que pour la longitude", 120 > 90 && 120 <= 180);
  dit(7, "120° est impossible");
  dit(7, "120° E existe");
  dit(7, "90° N");
  v.ok("7. Quito et Greenwich dessinés", villes(7).some((w) => w.nom === "Quito") && villes(7).some((w) => w.nom === "Greenwich"));

  v.ok("8. le parallèle 60° mesure cos 60° = 0,5 fois l'équateur", Math.abs(Math.cos(Math.PI / 3) - 0.5) < 1e-12);
  v.ok("8. la moitié de l'équateur (40 075 km) : environ 20 000 km", Math.abs(40075 / 2 - 20000) / 20000 < 0.01);
  dit(8, "Le parallèle 60° N mesure même la moitié de l'équateur : environ 20 000 km.");
  v.ok("8. le dessin surligne le parallèle 60°", /surligne: 60/.test(b(8)));

  v.titre("★★ Type devoir");
  const d9 = /(\d+) m de long, (\d+) m de large, (\d+) m de haut/.exec(e(9))?.slice(1).map(nb);
  const s9 = dessinJuste(9);
  v.ok(`9. le pavé dessiné a les dimensions de la pièce (${d9})`, !!s9 && JSON.stringify(s9.dims) === JSON.stringify(d9));
  if (d9) {
    dit(9, `Ses coordonnées sont ${coord(d9)}`);
    const L9 = [d9[0] / 2, d9[1] / 2, d9[2]];
    dit(9, `tout en haut : L${coord(L9)}`);
    v.ok("9. le point L dessiné est le centre du plafond", memePoint(point(9, "L"), L9));
    const D9 = point(9, "D");
    v.ok(`9. le drone dessiné est D(5 ; 1 ; 2), dans la pièce`, memePoint(D9, [5, 1, 2]) && dans(D9, d9));
    v.ok("9. (2 ; 7 ; 1) et (1 ; 5 ; 2) sont hors de la pièce", !dans([2, 7, 1], d9) && !dans([1, 5, 2], d9));
    dit(9, `mais la pièce n'a que ${d9[1]} m de large`);
  }

  const d10 = /bloc de (\d+) conteneurs de long, (\d+) de large et (\d+) de haut/.exec(e(10))?.slice(1).map(nb);
  const s10 = dessinJuste(10);
  v.ok(`10. le bloc dessiné a ${d10?.join(" × ")} conteneurs`, !!s10 && JSON.stringify(s10.dims) === JSON.stringify(d10));
  if (d10) {
    let etage4 = 0;
    for (let i = 1; i <= d10[0]; i++) for (let j = 1; j <= d10[1]; j++) etage4++;
    dit(10, `$${d10[0]} \\times ${d10[1]} = ${etage4}$ conteneurs`);
    const rouge = [4, 2, 3];
    dit(10, `Au-dessus, seul l'étage change, les deux premiers nombres restent : ${coord([4, 2, 4])}. En dessous : ${coord([4, 2, 2])}`);
    let dessus = 0;
    for (let z = rouge[2] + 1; z <= d10[2]; z++) dessus++;
    v.ok(`10. ${dessus} conteneur au-dessus du rouge`, dessus === 1);
    dit(10, "Un seul conteneur à enlever");
    const toit = +(rouge[2] * 2.59).toFixed(2);
    dit(10, `$3 \\times 2{,}59 = ${virgule(toit).replace(",", "{,}")}$ m`);
    const bo = /boites: \[\{ de: \[(\d+), (\d+), (\d+)\], a: \[(\d+), (\d+), (\d+)\] \}\]/.exec(b(10))?.slice(1).map(nb);
    v.ok("10. la boîte rouge dessinée occupe la case (4 ; 2 ; 3)", !!bo && JSON.stringify(bo.slice(3)) === JSON.stringify(rouge) && bo.slice(0, 3).every((x, i) => x === rouge[i] - 1));
    v.ok("10. le piège (2 ; 4 ; 3) n'existe pas dans le bloc", 4 > d10[1]);
  }

  const G11 = /G\((\d+) ; (\d+) ; (\d+)\)/.exec(e(11))?.slice(1).map(nb);
  const s11 = dessinJuste(11);
  v.ok(`11. le pavé dessiné a pour sommet G${G11 && coord(G11)}`, !!s11 && !!G11 && memePoint(s11.sommets.G, G11));
  if (G11) {
    dit(11, `AB = ${G11[0]}, AD = ${G11[1]} et AE = ${G11[2]}`);
    const S11 = sommetsPave(...G11);
    for (const n of ["B", "C", "D", "E", "F", "H"]) dit(11, `${n}${coord(S11[n])}`);
    const I = G11.map((x) => x / 2);
    dit(11, `Donc I${coord(I)}`);
    v.ok("11. le point I dessiné est le milieu de [AG]", memePoint(point(11, "I"), I) && /segments: \["AG"\]/.test(b(11)));
  }

  const w12 = villes(12);
  const nord = [...w12].sort((x, y) => y.lat - x.lat)[0];
  v.ok(`12. la plus au nord : ${nord?.nom}`, nord?.nom === "Reykjavik");
  dit(12, `${nord?.nom} est la plus au nord`);
  const sud = w12.filter((w) => VILLES[w.nom][0] < 0 && r0(VILLES[w.nom][0]) < 0).map((w) => w.nom);
  v.ok(`12. hémisphère Sud (latitude arrondie) : ${sud.join(", ")}`, sud.join() === "Sydney");
  v.ok(`12. Quito est juste au sud, à ${Math.round((-VILLES.Quito[0] * TOUR) / 360)} km de l'équateur (moins de 30)`, (-VILLES.Quito[0] * TOUR) / 360 < 30 && VILLES.Quito[0] < 0);
  const ouest = w12.filter((w) => w.lon < 0).map((w) => w.nom);
  dit(12, `à l'ouest de Greenwich : ${ouest.join(" et ")}`);
  const ecart = r0(VILLES.Tokyo[0]) - r0(VILLES.Sydney[0]);
  dit(12, `$36 + 34 = ${ecart}$ degrés`);

  const lecture = (lat, lon) => {
    const n = (x) => Math.abs(x) / 30;
    const la = lat === 0 ? "sur l'équateur" : `${n(lat)} ligne${n(lat) > 1 ? "s" : ""} ${lat > 0 ? "au-dessus" : "au-dessous"}`;
    return `${la}, ${n(lon)} ${lon > 0 ? "à droite" : "à gauche"}`;
  };
  const pts13 = villes(13);
  v.ok("13. la figure et le schéma portent les mêmes quatre points", pts13.length === 8 && ["A", "B", "C", "D"].every((l) => pts13.filter((w) => w.nom === l).length === 2 && new Set(pts13.filter((w) => w.nom === l).map((w) => `${w.lat},${w.lon}`)).size === 1));
  for (const w of pts13.slice(4)) {
    v.ok(`13. ${w.nom} sur un nœud de la grille de 30°`, w.lat % 30 === 0 && w.lon % 30 === 0);
    dit(13, `${w.nom} : ${lecture(w.lat, w.lon)}. ${w.nom}${geo(w.lat, w.lon)}`);
  }
  const B13 = pts13.find((w) => w.nom === "B");
  v.ok(`13. B est à ${Math.round(haversine([B13?.lat, B13?.lon], VILLES.Hangzhou))} km de Hangzhou`, !!B13 && haversine([B13.lat, B13.lon], VILLES.Hangzhou) < 50);
  const A13 = pts13.find((w) => w.nom === "A");
  v.ok("13. A est au sud-ouest de Reykjavik", !!A13 && A13.lat < VILLES.Reykjavik[0] && A13.lon < VILLES.Reykjavik[1]);

  const s14 = dessinJuste(14);
  const pyramide = (n) => {
    const s = { S: [0, 0, 5] };
    for (let i = 0; i < n; i++) s[String.fromCharCode(65 + i)] = [3 * Math.cos((2 * Math.PI * i) / n), 3 * Math.sin((2 * Math.PI * i) / n), 0];
    return enveloppe(s);
  };
  const p4 = pyramide(4);
  dit(14, `1 base + 4 triangles = ${p4.F} faces`);
  dit(14, `4 qui montent au sommet = ${p4.A} arêtes`);
  dit(14, `le sommet = ${p4.S} sommets`);
  if (s14) {
    const { F, A, S } = s14.env;
    v.ok("14. le dessin est une pyramide à base hexagonale", s14.env.faces.filter((f) => f.sommets.length === 6).length === 1 && s14.env.faces.filter((f) => f.sommets.length === 3).length === 6);
    dit(14, `1 + 6 = ${F} faces ; 6 + 6 = ${A} arêtes ; 6 + 1 = ${S} sommets`);
    const h = s14.env.cachees.length;
    dit(14, `${h} arêtes sont en pointillés : je compte ${A}, pas ${A - h}`);
  }
  const formules = [3, 5, 6, 7, 8, 12].every((n) => {
    const p = pyramide(n);
    return p.F === n + 1 && p.A === 2 * n && p.S === n + 1 && p.F - p.A + p.S === 2;
  });
  v.ok("14. pour n = 3, 5, 6, 7, 8, 12 : n + 1 faces, 2n arêtes, n + 1 sommets", formules);
  v.ok("14. 15 = 2n n'a pas de solution entière", !Number.isInteger(15 / 2));

  dit(15, "un rectangle de 6 cm sur 3 cm");
  dit(15, `un rectangle de $2 \\times 5 = 10$ cm sur 12 cm`);
  const b15 = /coupeBoule\(([\d.]+), ([\d.]+)\)/.exec(b(15))?.slice(1).map(nb);
  v.ok(`15. le dessin coupe une boule de rayon 5 à 3 du centre`, !!b15 && b15[0] === 5 && b15[1] === 3);
  if (b15) {
    let r = 0;
    while (r * r < b15[0] ** 2 - b15[1] ** 2) r++;
    v.ok(`15. rayon de la section : ${r} (entier trouvé par balayage)`, r * r === b15[0] ** 2 - b15[1] ** 2);
    dit(15, `$HM^2 = 5^2 - 3^2 = 25 - 9 = ${r * r}$, donc HM = ${r} cm`);
  }

  const s16 = dessinJuste(16);
  if (s16) {
    const a16 = s16.dims[0];
    v.ok("16. un cube (trois dimensions égales)", s16.dims.every((x) => x === a16));
    const proj = (p) => [p[0] + K * p[1], p[2] + K * p[1]];
    const [pA, pB, pC] = ["A", "B", "C"].map((n) => proj(s16.sommets[n]));
    const bcDessin = Math.hypot(pC[0] - pB[0], pC[1] - pB[1]);
    dit(16, `Sur le dessin, $${a16} \\div 2 = ${virgule(bcDessin)}$ cm`);
    const u = [pA[0] - pB[0], pA[1] - pB[1]];
    const w = [pC[0] - pB[0], pC[1] - pB[1]];
    const angle = (Math.acos((u[0] * w[0] + u[1] * w[1]) / (Math.hypot(...u) * Math.hypot(...w))) * 180) / Math.PI;
    v.ok(`16. l'angle ABC dessiné mesure ${angle.toFixed(1)}°`, Math.abs(angle - 135) < 1e-9 && e(16).includes("135°"));
    v.ok("16. l'angle ABC réel est droit", Math.abs(dot(sub(s16.sommets.A, s16.sommets.B), sub(s16.sommets.C, s16.sommets.B))) < 1e-9);
    const AC = Math.hypot(...sub(s16.sommets.C, s16.sommets.A));
    dit(16, `$AC^2 = 4^2 + 4^2 = ${a16 ** 2 * 2}$, donc $AC = \\sqrt{32} \\approx ${virgule(AC).replace(",", "{,}")}$ cm`);
    cachees3(16, s16.env);
  }

  v.titre("★★★ Problèmes");
  const d17 = /(\d+) m de long, (\d+) m de large et (\d+) m de haut/.exec(e(17))?.slice(1).map(nb);
  const s17 = dessinJuste(17);
  v.ok(`17. la salle dessinée mesure ${d17?.join(" × ")}`, !!s17 && JSON.stringify(s17.dims) === JSON.stringify(d17));
  const P17 = [2, 2, 0];
  const ordres = [[0, 12], [1, 6], [2, 5]];
  const etapes = [P17];
  for (const [axe, dist] of ordres) {
    const q = [...etapes.at(-1)];
    q[axe] += dist;
    etapes.push(q);
  }
  const M17 = etapes.at(-1);
  dit(17, `Donc M${coord(M17)}`);
  const ch = /chemin: (\[\[[^\n]*?\]\]),/.exec(b(17));
  v.ok("17. le chemin dessiné rejoue les trois ordres, un axe à la fois", !!ch && JSON.stringify(JSON.parse(ch[1])) === JSON.stringify(etapes));
  v.ok("17. P et M dessinés", memePoint(point(17, "P"), P17) && memePoint(point(17, "M"), M17));
  if (d17) {
    const C17 = [d17[0] / 2, d17[1] / 2, d17[2]];
    dit(17, `donc C${coord(C17)}`);
    v.ok("17. la caméra dessinée est au centre du plafond", memePoint(point(17, "C"), C17));
    const cible = [C17[0], C17[1], C17[2] - 2];
    dit(17, `c'est le point ${coord(cible)}`);
    dit(17, `reculer de $${M17[0]} - ${cible[0]} = ${M17[0] - cible[0]}$ m selon les abscisses, reculer de $${M17[1]} - ${cible[1]} = ${M17[1] - cible[1]}$ m selon les ordonnées, monter de $${cible[2]} - ${M17[2]} = ${cible[2] - M17[2]}$ m`);
    v.ok("17. monter de 3 m sort par le plafond", cible[2] + 3 > d17[2]);
    dit(17, `$${cible[2]} + 3 = ${cible[2] + 3}$ m`);
    v.ok("17. tous les points du trajet sont dans la salle", etapes.every((p) => dans(p, d17)));
  }

  const [st, cap] = [VILLES.Stockholm, VILLES["Le Cap"]];
  v.ok(`18. Stockholm et Le Cap : ${Math.abs(st[1] - cap[1]).toFixed(2)}° d'écart de longitude (même méridien au degré)`, r0(st[1]) === r0(cap[1]));
  const angle18 = r0(st[0]) - r0(cap[0]);
  dit(18, `$59 + 34 = ${angle18}$ degrés`);
  const dist18 = (angle18 / 360) * 40000;
  dit(18, `\\times 40\\,000 \\approx ${Math.round(dist18).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\\,")}$ km, soit environ ${Math.round(dist18 / 100) * 100} km`.replace(/(\d)(\d{3}) km$/, "$1 $2 km"));
  dit(18, `$93 \\times 111 = ${(93 * 111).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\\,")}$ km`);
  v.ok(`18. avec les vraies latitudes : ${Math.round(haversine(st, cap))} km, à moins de 1 % du calcul le long du méridien`, Math.abs(haversine(st, cap) - ((st[0] - cap[0]) / 360) * TOUR) / haversine(st, cap) < 0.01);
  const mer = [...b(18).matchAll(/\{ nom: "([^"]+)", lat: (-?\d+) \}/g)].map((m) => [m[1], nb(m[2])]);
  v.ok("18. le cercle dessiné place Stockholm et Le Cap à leurs latitudes", mer.length === 2 && mer.every(([n, la]) => r0(VILLES[n][0]) === la));
  dit(18, "$59 - 34 = 25$");

  const am = antipode(VILLES.Madrid);
  dit(19, `L'antipode de Madrid est ${geo(...am)}`);
  v.ok(`19. l'antipode de Madrid est à ${haversine(am, VILLES.Weber).toFixed(1)} km de Weber`, haversine(am, VILLES.Weber) < 10);
  v.ok("19. et à 20 004 km de Madrid (la moitié du tour)", Math.abs(haversine(am, VILLES.Madrid) - TOUR / 2) < 1);
  const ai = antipode(VILLES["îles des Antipodes"]);
  dit(19, `Le point ${geo(...ai)} est en Normandie`);
  v.ok(`19. l'antipode des îles est à ${haversine(ai, VILLES.Barfleur).toFixed(1)} km de Barfleur`, haversine(ai, VILLES.Barfleur) < 10);
  const w19 = villes(19).find((w) => w.nom === "antipode");
  v.ok("19. le point « antipode » dessiné est bien celui de Madrid", !!w19 && geo(w19.lat, w19.lon) === geo(...am));
  const piege19 = [-r0(VILLES.Madrid[0]), -r0(VILLES.Madrid[1])];
  v.ok(`19. le piège ${geo(...piege19)} est à ${Math.round(haversine(piege19, am))} km du vrai antipode`, haversine(piege19, am) > 5000);
  dit(19, `Le point ${geo(...piege19)} est en plein océan`);

  // Le ballon : un icosaèdre tronqué CONSTRUIT (permutations circulaires de
  // (0 ; ±1 ; ±3φ), (±1 ; ±(2 + φ) ; ±2φ), (±φ ; ±2 ; ±(2φ + 1))), puis compté.
  const phi = (1 + Math.sqrt(5)) / 2;
  const base = [[0, 1, 3 * phi], [1, 2 + phi, 2 * phi], [phi, 2, 2 * phi + 1]];
  const pts = new Map();
  for (const [a, bb, cc] of base)
    for (const sa of [1, -1]) for (const sb of [1, -1]) for (const sc of [1, -1]) {
      const p = [a * sa, bb * sb, cc * sc];
      for (let r = 0; r < 3; r++) {
        const q = [p[r % 3], p[(r + 1) % 3], p[(r + 2) % 3]];
        pts.set(q.map((x) => x.toFixed(6)).join(","), q);
      }
    }
  const noms20 = {};
  [...pts.values()].forEach((p, i) => (noms20[`v${i}`] = p));
  const ballon = enveloppe(noms20);
  const penta = ballon.faces.filter((f) => f.sommets.length === 5).length;
  const hexa = ballon.faces.filter((f) => f.sommets.length === 6).length;
  v.ok(`20. l'icosaèdre tronqué construit : ${penta} pentagones, ${hexa} hexagones, ${ballon.A} arêtes, ${ballon.S} sommets`, penta === 12 && hexa === 20 && ballon.F === 32);
  // Arêtes : chaque paire de sommets voisins, comptée à part (distance minimale).
  const P20 = Object.values(noms20);
  const dmin = Math.min(...P20.flatMap((p, i) => P20.slice(i + 1).map((q) => Math.hypot(...sub(p, q)))));
  let voisins = 0;
  P20.forEach((p, i) => P20.slice(i + 1).forEach((q) => { if (Math.abs(Math.hypot(...sub(p, q)) - dmin) < 1e-6) voisins++; }));
  v.ok(`20. ${voisins} paires de sommets voisins = ${ballon.A} arêtes de l'enveloppe`, voisins === ballon.A && ballon.A === 90);
  dit(20, `$12 + 20 = ${ballon.F}$ faces`);
  const cotes = 12 * 5 + 20 * 6;
  dit(20, `$60 + 120 = ${cotes}$ côtés`);
  dit(20, `$${cotes} \\div 2 = ${ballon.A}$ arêtes`);
  dit(20, `$${cotes} \\div 3 = ${ballon.S}$ sommets`);
  dit(20, `$${ballon.F} - ${ballon.A} + ${ballon.S} = 2$`);
  const lignes20 = [...b(20).matchAll(/\["(\w+)", "(\d+)", "(\d*)", "(\d+)"\]/g)].map((m) => m.slice(1));
  v.ok("20. le tableau : 12 × 5 = 60, 20 × 6 = 120, 32 pièces, 180 côtés", lignes20.length === 3 && lignes20[0].join() === "pentagones,12,5,60" && lignes20[1].join() === "hexagones,20,6,120" && lignes20[2][1] === String(penta + hexa) && lignes20[2][3] === String(cotes));
}

lancer({
  nom: "LA GÉOMÉTRIE DANS L'ESPACE · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-geometrie-espace.tsx",
  notionId: "volume_geometrie_espace",
  classe: "3e",
  verifier,
  casses: [
    ["ex. 14 : une arête cachée à la mauvaise place", 'cachees: ["DE", "EF", "FA", "SE", "SF"]', 'cachees: ["CD", "DE", "EF", "SD", "SE"]'],
    ["ex. 1 : une arête cachée de trop sur la pyramide", 'cachees: ["CD", "DA", "SD"]', 'cachees: ["CD", "DA", "SD", "SC"]'],
    ["ex. 2 : 6 faces au prisme", "En tout 2 + 3 = 5 faces", "En tout 2 + 3 = 6 faces"],
    ["ex. 2 : le mauvais sommet caché", 'cachees: ["AD", "DE", "FD"]', 'cachees: ["AD", "DE", "EF"]'],
    ["ex. 2 : les traits visibles comptés comme arêtes", "6 + 3 = 9 arêtes", "3 + 3 = 6 arêtes"],
    ["ex. 3 : BCGF déclaré parallélogramme", "angles droits. BCGF est un rectangle.", "angles droits. BCGF est un parallélogramme."],
    ["ex. 5 : G écrit dans le désordre", "puis je monte de 2 (le chemin orange) : G(4 ; 3 ; 2)", "puis je monte de 2 (le chemin orange) : G(4 ; 2 ; 3)"],
    ["ex. 5 : le point G dessiné ailleurs", 'p: [4, 3, 2], texte: ""', 'p: [4, 2, 3], texte: ""'],
    ["ex. 6 : Paris dessinée en (2 ; 49)", '{ nom: "Paris", lat: 49, lon: 2, angle: true }', '{ nom: "Paris", lat: 2, lon: 49, angle: true }'],
    ["ex. 6 : Sydney mise au nord", "Sydney (34° S ; 151° E) : S, donc au sud", "Sydney (34° S ; 151° E) : N, donc au nord"],
    ["ex. 9 : la lampe au mauvais endroit", "tout en haut : L(3 ; 2 ; 3)", "tout en haut : L(3 ; 3 ; 2)"],
    ["ex. 10 : le conteneur rouge dessiné dans le désordre", "de: [3, 1, 2], a: [4, 2, 3]", "de: [1, 3, 2], a: [2, 4, 3]"],
    ["ex. 10 : deux étages au lieu de trois", "$3 \\\\times 2{,}59 = 7{,}77$ m", "$2 \\\\times 2{,}59 = 5{,}18$ m"],
    ["ex. 11 : le centre dessiné à côté", "p: [2.5, 1.5, 2] }", "p: [2.5, 2, 1.5] }"],
    ["ex. 12 : Quito à l'est de Greenwich", '{ nom: "Quito", lat: 0, lon: -79 },\n              { nom: "Tokyo"', '{ nom: "Quito", lat: 0, lon: 79 },\n              { nom: "Tokyo"'],
    ["ex. 13 : C lu à l'est", "C(0° ; 90° O), aux", "C(0° ; 90° E), aux"],
    ["ex. 14 : les pointillés oubliés", "je compte 12, pas 7", "je compte 12, pas 6"],
    ["ex. 15 : la boule coupée à 4 cm", "coupeBoule(5, 3)", "coupeBoule(5, 4)"],
    ["ex. 16 : la fuyante mesurée à la règle", "Sur le dessin, $4 \\\\div 2 = 2$ cm", "Sur le dessin, $4 \\\\div 1 = 4$ cm"],
    ["ex. 17 : le chemin monte trop", "[14, 8, 0], [14, 8, 5]]", "[14, 8, 0], [14, 8, 6]]"],
    ["ex. 18 : les latitudes soustraites", "$59 + 34 = 93$ degrés", "$59 - 34 = 25$ degrés"],
    ["ex. 18 : Le Cap dessiné au nord", '{ nom: "Le Cap", lat: -34 }', '{ nom: "Le Cap", lat: 34 }'],
    ["ex. 19 : l'antipode sans demi-tour", "L'antipode de Madrid est (40° S ; 176° E)", "L'antipode de Madrid est (40° S ; 4° E)"],
    ["ex. 20 : chaque arête comptée une fois", "$180 \\\\div 2 = 90$ arêtes", "$180 \\\\div 1 = 180$ arêtes"],
    ["une micro d'une autre notion", 'micros: ["volume_section"],\n        },\n      ],\n    },', 'micros: ["section_reconnaitre"],\n        },\n      ],\n    },'],
    ["un $ dans un canvas", '["pentagones", "12", "5", "60"]', '["pentagones", "$12$", "5", "60"]'],
  ],
});
