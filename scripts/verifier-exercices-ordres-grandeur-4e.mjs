// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Ordres de grandeur et
// préfixes » de 4e (lib/fiches-exercices/maths-4e-ordres-grandeur.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé raisonne en EXPOSANTS (« j'ajoute », « je
// soustrais ») ; ici, chaque grandeur est convertie en fraction EXACTE dans
// l'unité de base (`grandeur()`), chaque ordre de grandeur est CHERCHÉ par
// encadrement (`ordre()`, qui refuse un nombre où les deux conventions — la plus
// proche en distance, la plus proche en rangs — ne s'accordent pas), chaque
// estimation « à un chiffre non nul » est refaite (`arrondi1()`), puis le
// résultat doit se LIRE dans la phrase du corrigé.
//
// ⭐ LES DESSINS SONT RELUS : chaque point d'une échelle doit être à log₁₀ de sa
// grandeur (à 0,006 près), chaque arc orange doit porter le vrai facteur entre
// ses deux points, les étiquettes ne doivent ni se chevaucher ni être traversées
// par un trait (même mise en page que le SVG), et les cases des tableaux sont
// recalculées. Les corrigés dessinés sont COMPTÉS : vingt sur vingt.
//
//   node scripts/verifier-exercices-ordres-grandeur-4e.mjs
//
// Sort en code 1 à la première divergence, ou si un contrôle négatif passe
// inaperçu. Le socle (structure, dollars, micros, casses) : verifier-exercices-commun.mjs.

import { Q, D, fois, div, moins, egal, inf, versNombre, puissance, tex, texSci, lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

const dix = (n) => puissance(Q(10), n);
const sci = (m, e) => fois(D(m), dix(e));

/* ── Les nombres des dessins ─────────────────────────────────────────────── */

const SUP = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-" };
const expo = (s) => Number([...s].map((c) => SUP[c]).join(""));
/** « 3 500 mg », « 2 × 10⁶ W », « 10⁻⁹ s », « ≈ 1 090 909 », « 1,3 cm » → le NOMBRE, exact. */
function lireNb(s) {
  const t = s.replace(/^[≈×÷\s]+/, "");
  const p = t.match(/^10([⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+)/);
  if (p) return dix(expo(p[1]));
  const m = t.match(/^(\d[\d ]*(?:,\d+)?)(?:\s*×\s*10([⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+))?/);
  if (!m) throw new Error(`case illisible : ${s}`);
  const a = D(m[1].replace(/ /g, ""));
  return m[2] ? fois(a, dix(expo(m[2]))) : a;
}

/* ── Les grandeurs : un préfixe, une unité ──────────────────────────────── */

const SYMB = { n: -9, "µ": -6, m: -3, c: -2, k: 3, M: 6, G: 9 };
const BASES = ["m", "g", "s", "W", "o", "L"];
/** « 25 µm » → 25 × 10⁻⁶ (en m), « 6 t » → 6 × 10⁶ (en g). */
function grandeur(s) {
  const m = s.trim().match(/^(.*?)\s*([A-Za-zµ]+)$/);
  const n = lireNb(m[1]);
  const u = m[2];
  if (u === "t") return fois(n, dix(6));
  if (BASES.includes(u)) return n;
  if (u.length === 2 && u[0] in SYMB && BASES.includes(u[1])) return fois(n, dix(SYMB[u[0]]));
  throw new Error(`unité inconnue : ${s}`);
}

/** L'exposant n tel que 10ⁿ ⩽ q < 10ⁿ⁺¹ — cherché, pas calculé. */
function rang(q) {
  let n = 0;
  while (inf(q, dix(n))) n--;
  while (!inf(q, dix(n + 1))) n++;
  return n;
}
/** L'ordre de grandeur. ⛔ Refuse un nombre où les deux conventions divergent. */
function ordre(q) {
  const n = rang(q);
  const lin = inf(moins(q, dix(n)), moins(dix(n + 1), q)) ? n : n + 1;
  const log = inf(fois(q, q), dix(2 * n + 1)) ? n : n + 1;
  if (lin !== log) throw new Error(`ordre ambigu pour ${versNombre(q)} : ${lin} ou ${log}`);
  return lin;
}
/** Arrondi à UN chiffre non nul (exact). */
function arrondi1(q) {
  const n = rang(q);
  const chiffre = Math.round(versNombre(div(q, dix(n))));
  return fois(Q(chiffre), dix(n));
}
const log10 = (q) => Math.log10(versNombre(q));
const proche = (a, b, tol) => Math.abs(versNombre(a) / versNombre(b) - 1) <= tol;

/* ── Les tableaux et les échelles, relus dans le source ─────────────────── */

function lignesTableau(bloc) {
  const rows = {};
  for (const m of bloc.matchAll(/\[\s*("(?:[^"\\]|\\.)*"(?:,\s*"(?:[^"\\]|\\.)*")+)\s*,?\s*\]/g)) {
    const cells = JSON.parse(`[${m[1]}]`);
    if (!cells[0].startsWith("ordre_")) rows[cells[0]] = cells.slice(1);
  }
  return rows;
}

function echelles(bloc, source) {
  const prefixes = source.slice(source.indexOf("const PREFIXES"), source.indexOf("export const exercices"));
  const appels = [...bloc.matchAll(/echelle\((-?[\d.]+), (-?[\d.]+), (PREFIXES|\[)/g)];
  return appels.map((m, i) => {
    const fin = i + 1 < appels.length ? appels[i + 1].index : bloc.length;
    const seg = bloc.slice(m.index, fin);
    const pts = [...(m[3] === "PREFIXES" ? prefixes : seg).matchAll(/\{ e: (-?[\d.]+), label: "([^"]+)"(, faux: true)? \}/g)].map((p) => ({ e: Number(p[1]), label: p[2], faux: !!p[3] }));
    const sauts = [...seg.matchAll(/\{ de: (-?[\d.]+), a: (-?[\d.]+), label: "([^"]+)" \}/g)].map((s) => ({ de: Number(s[1]), a: Number(s[2]), label: s[3] }));
    return { min: Number(m[1]), max: Number(m[2]), pas: Number(seg.match(/pas: (\d+)/)?.[1] ?? 1), unite: seg.match(/unite: "([^"]+)"/)?.[1], pts, sauts };
  });
}

/** La mise en page du SVG (mêmes nombres que `echelle()` du fichier de données :
 *  cadre de 240, axe de 18 à 222, étiquettes en 12 gras ≈ 7,44 px par signe). */
const CADRE = 240;
const SIGNE = 7.44;
function miseEnPage(ech) {
  const x = (e) => 18 + ((e - ech.min) * 204) / (ech.max - ech.min);
  const tri = [...ech.pts].sort((p, q) => p.e - q.e);
  const boites = tri.map((p, i) => {
    const w = p.label.length * SIGNE;
    const cx = Math.min(Math.max(x(p.e), 2 + w / 2), CADRE - 2 - w / 2);
    return { label: p.label, haut: i % 2 === 1, px: x(p.e), g: cx - w / 2, d: cx + w / 2 };
  });
  const fautes = [];
  for (const etage of [true, false]) {
    const b = boites.filter((o) => o.haut === etage);
    for (let i = 1; i < b.length; i++) if (b[i].g < b[i - 1].d + 4) fautes.push(`« ${b[i - 1].label} » et « ${b[i].label} » se touchent`);
  }
  for (const h of boites.filter((o) => o.haut))
    for (const l of boites.filter((o) => !o.haut)) if (h.px > l.g - 2 && h.px < l.d + 2) fautes.push(`le trait de « ${h.label} » traverse « ${l.label} »`);
  // Une graduation « 10⁻¹² » en 12 : deux chiffres (≈ 0,56 em) et des exposants (≈ 0,42 em).
  const largeurGrad = (n) => 12 * (2 * 0.56 + String(n).length * 0.42);
  const lues = [];
  for (let n = Math.ceil(ech.min); n <= ech.max; n++) if (n % ech.pas === 0) lues.push(n);
  for (let i = 1; i < lues.length; i++) if (x(lues[i]) - x(lues[i - 1]) < (largeurGrad(lues[i]) + largeurGrad(lues[i - 1])) / 2 + 4) fautes.push(`graduations 10^${lues[i - 1]} et 10^${lues[i]} trop serrées`);
  if (ech.pts.some((p) => p.e <= ech.min || p.e >= ech.max)) fautes.push("un point sur un bord");
  const arcs = ech.sauts.map((s) => ({ c: (x(s.de) + x(s.a)) / 2, w: s.label.length * SIGNE })).sort((a, b) => a.c - b.c);
  for (let i = 1; i < arcs.length; i++) if (arcs[i].c - arcs[i].w / 2 < arcs[i - 1].c + arcs[i - 1].w / 2 + 4) fautes.push("deux facteurs d'arcs se touchent");
  return fautes;
}

function verifier(source, v) {
  const { corrections, blocs } = lireFeuille(source);
  const c = (k) => corrections[k - 1] ?? "";
  const b = (k) => blocs[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");
  const ligne = (k, debut) => c(k).split("\\n").find((l) => l.startsWith(debut)) ?? "";
  const tab = (k) => lignesTableau(b(k));

  /** Tout ce qu'affirme l'échelle de l'exercice k : places, arcs, mise en page. */
  const echelle = (k, places, i = 0) => {
    const ech = echelles(b(k), source)[i];
    if (!ech) return v.ok(`${k}. le corrigé a son échelle`, false);
    const fautes = [];
    for (const [label, val] of Object.entries(places)) {
      const p = ech.pts.find((q) => q.label === label);
      if (!p) fautes.push(`« ${label} » absent`);
      else if (Math.abs(p.e - log10(val)) > 0.006) fautes.push(`« ${label} » en ${p.e}, log₁₀ = ${log10(val).toFixed(3)}`);
    }
    if (ech.pts.length !== Object.keys(places).length) fautes.push(`${ech.pts.length} points dessinés pour ${Object.keys(places).length} attendus`);
    v.ok(`${k}. échelle : ${ech.pts.length} points, chacun à log₁₀ de sa grandeur`, fautes.length === 0, fautes.join(" ; "));
    for (const s of ech.sauts) {
      const lu = lireNb(s.label.replace(/^[≈\s]*/, ""));
      const tol = s.label.startsWith("≈") ? 0.25 : 0.015;
      v.ok(`${k}. l'arc « ${s.label} » dit le facteur entre ses deux points (10^${(s.a - s.de).toFixed(2)})`, Math.abs(10 ** (s.a - s.de) / versNombre(lu) - 1) <= tol);
    }
    const mp = miseEnPage(ech);
    v.ok(`${k}. échelle : étiquettes lisibles, rien ne se chevauche`, mp.length === 0, mp.join(" ; "));
    return ech;
  };
  /** Le facteur écrit sur l'arc `de → a` de l'échelle k est bien `attendu`. */
  const arc = (k, attendu, tol = 0.015, i = 0) => {
    const ech = echelles(b(k), source)[i];
    const ok = ech?.sauts.some((s) => proche(lireNb(s.label.replace(/^[≈\s]*/, "")), attendu, tol));
    v.ok(`${k}. un arc porte le facteur ${versNombre(attendu)}`, !!ok);
  };

  v.titre("Les dessins");
  // ⭐ MESURÉ DANS LE NAVIGATEUR (25/09) : à 375 px, le SVG se rend sur ≈ 235 px.
  // Taille effective = police × 235 ÷ largeur du cadre : ≥ 11 px partout.
  {
    const svg = source.slice(source.indexOf("const echelle ="), source.indexOf("// Le tableau d'un corrigé"));
    const cadre = Number(source.match(/const L = (\d+);/)?.[1]);
    const police = Number(source.match(/const POLICE = (\d+);/)?.[1]);
    const tailles = [...svg.matchAll(/fontSize=\{([^}]+)\}/g)].map((m) => (m[1] === "POLICE" ? police : Number(m[1])));
    const plus_petite = Math.min(...tailles) * (235 / cadre);
    v.ok(`échelles : ${tailles.length} textes, le plus petit à ${plus_petite.toFixed(2)} px effectifs à 375 px (≥ 11)`, tailles.length >= 4 && plus_petite >= 11 && svg.includes("viewBox={`0 0 ${L}") && cadre === CADRE);
  }
  const dessines = blocs.filter((x) => /\bschema:/.test(x)).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20);

  v.titre("★ Un seul geste");
  // 1. Les préfixes, lus dans la table des symboles.
  [["km", "m"], ["ns", "s"], ["MW", "W"], ["µg", "g"]].forEach(([u, base]) => {
    const n = rang(grandeur(`1 ${u}`));
    dit(1, `$1$ ${u} $= 10^{${n}}$ ${base}`);
  });
  echelle(1, { nano: dix(-9), micro: dix(-6), milli: dix(-3), "unité": Q(1), kilo: dix(3), "méga": dix(6), giga: dix(9) });

  // 2. Le nombre devant, puis le préfixe.
  [["7", "GW", "W"], ["25", "µm", "m"], ["0,4", "mg", "g"]].forEach(([n, u, base]) => {
    const val = grandeur(`${n} ${u}`);
    dit(2, `$= ${tex(D(n))} \\times 10^{${rang(grandeur(`1 ${u}`))}}$ ${base} $= ${tex(val)}$ ${base}`);
    const row = tab(2)[`${n} ${u}`] ?? [];
    v.ok(`2. tableau : ${n} ${u}`, row.length === 2 && egal(lireNb(row[0]), grandeur(`1 ${u}`)) && egal(grandeur(row[1]), val));
  });

  // 3. De préfixe à préfixe : on DIVISE les deux grandeurs.
  [["mm", "µm", "micromètres"], ["Go", "Mo", "mégaoctets"], ["kg", "mg", "milligrammes"]].forEach(([gros, petit, mot]) => {
    const f = div(grandeur(`1 ${gros}`), grandeur(`1 ${petit}`));
    dit(3, `$10^{${rang(f)}} = ${tex(f)}$ ${mot}`);
  });
  echelle(3, { nano: dix(-9), micro: dix(-6), milli: dix(-3), "unité": Q(1), kilo: dix(3), "méga": dix(6), giga: dix(9) });
  arc(3, Q(1000));
  arc(3, dix(6));

  // 4. Chaque objet en mètres, puis son ordre cherché par encadrement.
  const objets4 = [["a", "carte", grandeur("0,76 mm")], ["b", "Everest", grandeur("8849 m")], ["c", "ADN", grandeur("2 nm")], ["d", "foot", grandeur("105 m")], ["e", "Terre", grandeur("12 700 km")]];
  objets4.forEach(([l, , val]) => {
    const n = ordre(val);
    v.ok(`4. ${l}) ordre 10^${n}`, ligne(4, `${l})`).endsWith(`$10^{${n}}$ m.`), ligne(4, `${l})`).slice(-40));
    dit(4, `${l}) $10^{${n}}$ m`);
  });
  echelle(4, Object.fromEntries(objets4.map(([, lab, val]) => [lab, val])));

  // 5.
  const nb5 = ["9 600", "0,0012", "1 850 000", "0,09"];
  nb5.forEach((s) => {
    const q = lireNb(s);
    const n = ordre(q);
    const row = tab(5)[s] ?? [];
    v.ok(`5. tableau : ${s} entre 10^${rang(q)} et 10^${rang(q) + 1}, le plus proche 10^${n}`, row.length === 3 && egal(lireNb(row[0]), dix(rang(q))) && egal(lireNb(row[1]), dix(rang(q) + 1)) && egal(lireNb(row[2]), dix(n)));
  });
  dit(5, `Réponse : ${nb5.map((s) => `$10^{${ordre(lireNb(s))}}$`).join(" ; ")}.`);
  dit(5, "n'est qu'à $400$ de $10\\,000$");

  // 6 et 7. Les ordres des facteurs, puis celui du résultat — et le résultat exact doit tomber dans le même ordre.
  const operations = (k, liste, op, signe) => {
    const reps = [];
    liste.forEach(([l, a, bb]) => {
      const [qa, qb] = [lireNb(a), lireNb(bb)];
      const n = signe === "+" ? ordre(qa) + ordre(qb) : ordre(qa) - ordre(qb);
      const exact = op(qa, qb);
      v.ok(`${k}. ${l}) le résultat exact est bien de l'ordre de 10^${n}`, ordre(exact) === n);
      v.ok(`${k}. ${l}) le corrigé conclut « = 10^{${n}} »`, (ligne(k, `${l})`).includes(`= 10^{${n}}$`) || ligne(k, `${l})`).includes(`= 10^{${n}} = `)), ligne(k, `${l})`).slice(-40));
      const row = tab(k)[`${l})`] ?? [];
      const [ga, gb] = (row[0] ?? "").split(/ [×÷] /);
      v.ok(`${k}. tableau ${l}) : arrondis, ordre et exact`, row.length === 3 && egal(lireNb(ga), dix(ordre(qa))) && egal(lireNb(gb), dix(ordre(qb))) && egal(lireNb(row[1]), dix(n)) && proche(lireNb(row[2]), exact, 3e-3));
      reps.push(n);
    });
    return reps;
  };
  const r6 = operations(6, [["a", "2 100", "89 000"], ["b", "0,012", "980"], ["c", "1 200 000", "0,0009"]], fois, "+");
  dit(6, `Réponse : ${r6.map((n) => `$10^{${n}}$`).join(" ; ")}.`);
  dit(6, `valent $${tex(fois(D(2100), D(89000)))}$, $${tex(fois(D("0,012"), D(980)))}$ et $${tex(fois(D(1200000), D("0,0009")))}$`);
  const r7 = operations(7, [["a", "8 900 000", "1 100"], ["b", "0,0021", "0,0009"], ["c", "12 000", "0,011"]], div, "-");
  dit(7, `Réponse : $10^{${r7[0]}}$ ; $10^{${r7[1]}}$, soit $1$ ; $10^{${r7[2]}}$.`);

  // 8. Estimation à un chiffre, puis verdict par le rapport annoncé ÷ exact.
  [["a", "312", "29", fois, "90 480"], ["b", "4 870", "52", div, "9,4"], ["c", "0,21", "0,48", fois, "0,1008"]].forEach(([l, a, bb, op, annonce]) => {
    const [qa, qb, qan] = [lireNb(a), lireNb(bb), lireNb(annonce)];
    const est = op(arrondi1(qa), arrondi1(qb));
    const exact = op(qa, qb);
    const r = versNombre(qan) / versNombre(exact);
    const plausible = r > 0.5 && r < 2;
    const s = ligne(8, `${l})`);
    v.ok(`8. ${l}) estimation ${versNombre(est)} écrite`, s.includes(`= ${tex(est)}$`), s.slice(0, 80));
    v.ok(`8. ${l}) ${plausible ? "plausible" : "NON plausible"} (annoncé ÷ exact = ${r.toFixed(3)})`, plausible ? !s.includes("NON") && s.includes("plausible") : s.includes("NON plausible"));
    const row = tab(8)[`${l})`] ?? [];
    const verdict = plausible ? "plausible" : `faux, ${r > 1 ? "×" : "÷"} ${Math.round(r > 1 ? r : 1 / r)}`;
    v.ok(`8. tableau ${l}) : « ${verdict} »`, row.length === 3 && egal(lireNb(row[0]), est) && egal(lireNb(row[1]), qan) && row[2] === verdict, row.join(" | "));
  });
  dit(8, `Le vrai résultat est $${tex(fois(D(312), D(29)))}$`);
  dit(8, `environ $${String(Math.round(versNombre(div(D(4870), D(52))) * 10) / 10).replace(".", "{,}")}$`);

  v.titre("★★ Type devoir");
  // 9.
  const led = grandeur("9 W");
  const eol = grandeur("3 MW");
  const rea = grandeur("900 MW");
  dit(9, `$3$ MW $= ${texSci(eol)}$ W`);
  dit(9, `$= ${texSci(rea)}$ W`);
  dit(9, `$900 \\div 3 = ${tex(div(rea, eol))}$`);
  const amp = div(rea, led);
  dit(9, `\\dfrac{9 \\times 10^{8}}{9} = 10^{${rang(amp)}}$`);
  v.ok("9. le réacteur alimente exactement 10⁸ ampoules", egal(amp, dix(8)));
  v.ok("9. huit rangs de l'ampoule au réacteur", ordre(rea) - ordre(led) === 8 && c(9).includes("huit rangs"));
  echelle(9, { LED: led, "éolienne": eol, "réacteur": rea });
  arc(9, amp);

  // 10.
  const m10 = { colibri: grandeur("2 g"), "éléphant": grandeur("6 t"), baleine: grandeur("150 t") };
  // (en grammes ici : on repasse en kg en divisant par 1 000)
  const kg = (q) => div(q, dix(3));
  const abeille = grandeur("0,1 g");
  dit(10, `$0{,}1$ g $= ${tex(kg(abeille))}$ kg $= 10^{${ordre(kg(abeille))}}$ kg`);
  dit(10, `$2$ g $= ${tex(kg(m10.colibri))}$ kg`);
  dit(10, `ordre de grandeur $10^{${ordre(kg(m10.colibri))}}$ kg`);
  dit(10, `$6$ t $= ${tex(kg(m10["éléphant"]))}$ kg`);
  dit(10, `$10^{${ordre(kg(m10["éléphant"]))}}$ kg.\\nBaleine`, `éléphant : 10^${ordre(kg(m10["éléphant"]))} kg`);
  dit(10, `$150$ t $= ${tex(kg(m10.baleine))}$ kg, tout près de $100\\,000$ : $10^{${ordre(kg(m10.baleine))}}$ kg`);
  const r10 = div(m10.baleine, m10.colibri);
  dit(10, `= 10^{${ordre(kg(m10.baleine)) - ordre(kg(m10.colibri))}}$ : environ cent millions`);
  dit(10, `= ${tex(r10)}$, soit $${texSci(r10)}$`);
  v.ok("10. le rapport exact est bien de l'ordre de 10⁸", ordre(r10) === 8);
  echelle(10, Object.fromEntries(Object.entries(m10).map(([k, q]) => [k, kg(q)])));
  arc(10, r10);

  // 11.
  const an = fois(fois(Q(365), Q(24)), fois(Q(60), Q(60)));
  const est11 = fois(fois(arrondi1(Q(365)), arrondi1(Q(24))), arrondi1(Q(3600)));
  dit(11, `$400 \\times 20 \\times 4\\,000 = ${tex(est11)}$`);
  dit(11, `$8\\,760 \\times 3\\,600 = ${tex(an)}$`);
  v.ok("11. l'estimation est à moins de 2 % de l'exact", proche(est11, an, 0.02) && c(11).includes("moins de $2$ %"));
  dit(11, `\\approx ${String(Math.round(versNombre(div(dix(9), an)) * 10) / 10).replace(".", "{,}")}$`);
  dit(11, `environ $${Math.round(versNombre(div(dix(9), an)))}$ ans`);
  dit(11, `environ $${String(Math.round(versNombre(div(dix(6), Q(86400))) * 10) / 10).replace(".", "{,}")}$ jours`);
  dit(11, `$365 \\times 24 \\times 60 = ${tex(fois(fois(Q(365), Q(24)), Q(60)))}$`);
  const t11 = tab(11);
  v.ok("11. tableau : chaque arrondi à un chiffre", ["jours", "heures", "secondes"].every((l) => t11[l] && egal(arrondi1(lireNb(t11[l][0])), lireNb(t11[l][1]))));
  v.ok("11. tableau : les deux produits", egal(lireNb(t11.produit?.[0] ?? "0"), an) && egal(lireNb(t11.produit?.[1] ?? "0"), est11));

  // 12.
  const co2 = fois(Q(420), dix(-6));
  dit(12, `$420$ ppm $= 420 \\times 10^{-6} = ${tex(co2)}$`);
  const pct = fois(co2, Q(100));
  dit(12, `\\times 100 = ${tex(pct)}$, donc`);
  const f12 = div(D("4,2"), pct);
  dit(12, `$4{,}2 \\div ${tex(pct)} = ${tex(f12)}$`);
  echelle(12, { "1 ppm": dix(-6), "réel": co2, "1 %": D("0,01"), "annoncé": div(D("4,2"), Q(100)) });
  arc(12, f12);
  v.ok("12. le point de l'exposé est marqué faux", echelles(b(12), source)[0]?.pts.find((p) => p.label === "annoncé")?.faux === true);

  // 13.
  const film = grandeur("14 Go");
  dit(13, `$2 \\times 7 = 14$ Go`);
  dit(13, `soit $${texSci(film)}$ octets`);
  dit(13, `$64 \\div 7 \\approx ${String(Math.round((64 / 7) * 10) / 10).replace(".", "{,}")}$`);
  const f13 = div(film, grandeur("14 Mo"));
  dit(13, `écart $9 - 6 = ${rang(f13)}$ rangs, un facteur $${tex(f13)}$`);
  dit(13, `environ $${Math.round(versNombre(div(grandeur("14 Mo"), div(grandeur("7 Go"), Q(3600)))))}$ secondes`);
  echelle(13, { "14 Mo": grandeur("14 Mo"), "14 Go": film });
  arc(13, f13);

  // 14.
  const jour = fois(Q(70), fois(Q(24), Q(60)));
  dit(14, `$70 \\times 1\\,440 = ${tex(jour)}$ battements par jour, environ $10^{${ordre(jour)}}$`);
  const an14 = fois(dix(ordre(jour)), arrondi1(Q(365)));
  dit(14, `environ $${texSci(an14)}$ battements`);
  const vie = fois(an14, Q(80));
  dit(14, `= ${texSci(vie)}$ battements`);
  const exact14 = fois(fois(jour, Q(365)), Q(80));
  dit(14, `$100\\,800 \\times 365 \\times 80 = ${tex(exact14)}$`);
  v.ok("14. estimation et exact : même rang (des milliards)", rang(vie) === rang(exact14) && rang(vie) === 9);
  v.ok("14. l'affiche : 3 rangs, un facteur 1 000", rang(vie) - rang(sci(3, 6)) === 3 && c(14).includes("un facteur $1\\,000$"));
  v.ok("14. trois millions de battements : moins d'un mois", versNombre(div(sci(3, 6), jour)) < 31);
  const t14 = tab(14);
  v.ok("14. tableau : 1 jour", egal(lireNb(t14["1 jour"]?.[0] ?? "0"), dix(ordre(jour))) && egal(lireNb(t14["1 jour"]?.[1] ?? "0"), jour));
  v.ok("14. tableau : 1 an", egal(lireNb(t14["1 an"]?.[0] ?? "0"), an14) && egal(lireNb(t14["1 an"]?.[1] ?? "0"), fois(jour, Q(365))));
  v.ok("14. tableau : 80 ans", egal(lireNb(t14["80 ans"]?.[0] ?? "0"), vie) && egal(lireNb(t14["80 ans"]?.[1] ?? "0"), exact14));

  // 15.
  const cheveu = grandeur("70 µm");
  const virus = grandeur("100 nm");
  dit(15, `$= ${texSci(cheveu)}$ m`);
  dit(15, `ordre de grandeur $10^{${ordre(cheveu)}}$ m`);
  dit(15, `$100$ nm $= 100 \\times 10^{-9}$ m $= 10^{${ordre(virus)}}$ m`);
  dit(15, `= 10^{${ordre(cheveu) - ordre(virus)}}$. Environ mille`);
  const r15 = div(cheveu, virus);
  dit(15, `= ${tex(r15)}$ virus`);
  echelle(15, { virus, cheveu });
  arc(15, r15);

  // 16.
  const cas16 = [["Léa", "3,5 kg", "mg", "3 500 mg"], ["Noé", "45 µs", "s", "0,045 s"], ["Inès", "2 GW", "W", "2 × 10⁶ W"]];
  cas16.forEach(([qui, donnee, u, rep]) => {
    const juste = div(grandeur(donnee), grandeur(`1 ${u}`));
    const f = div(grandeur(rep), grandeur(donnee));
    const row = tab(16)[qui] ?? [];
    const sens = inf(f, Q(1)) ? "×" : "÷";
    const fac = inf(f, Q(1)) ? div(Q(1), f) : f;
    v.ok(`16. ${qui} : juste ${tex(juste)} ${u}, facteur ${sens} ${tex(fac)}`, row.length === 3 && egal(grandeur(row[0]), grandeur(rep)) && egal(grandeur(row[1]), grandeur(donnee)) && row[2] === `${sens} ${tex(fac).replace("\\,", " ")}`, row.join(" | "));
    v.ok(`16. ${qui} : facteur 1 000`, egal(fac, Q(1000)));
  });
  dit(16, `$= ${tex(fois(D("3,5"), dix(6)))}$ mg`);
  dit(16, `$= ${tex(fois(Q(45), dix(-6)))}$ s`);
  dit(16, `$3\\,500\\,000 \\div 3\\,500 = 1\\,000$`);
  dit(16, `$0{,}045 \\div 0{,}000045 = 1\\,000$`);

  v.titre("★★★ Problèmes");
  // 17.
  const T = sci("1,3", 4);
  const S = sci("1,4", 6);
  const TS = sci("1,5", 8);
  const echMaquette = dix(4);
  [[T, "1,3 cm"], [S, "140 cm"], [TS, "15 000 cm"]].forEach(([q, cm]) => {
    const m = div(q, echMaquette);
    dit(17, `= ${tex(m)}$ cm`);
    v.ok(`17. ${cm} sur la maquette`, egal(m, lireNb(cm)));
  });
  dit(17, `$1{,}3 \\times 10^{4}$ : ordre $10^{${ordre(T)}}$ km. $1{,}4 \\times 10^{6}$ : ordre $10^{${ordre(S)}}$ km. $1{,}5 \\times 10^{8}$ : ordre $10^{${ordre(TS)}}$ km`);
  v.ok("17. deux rangs à chaque fois, des rapports voisins de 100", ordre(S) - ordre(T) === 2 && ordre(TS) - ordre(S) === 2 && proche(div(S, T), Q(100), 0.1) && proche(div(TS, S), Q(100), 0.1));
  const metres = div(div(TS, echMaquette), Q(100));
  dit(17, `soit $${tex(metres)}$ m`);
  dit(17, `$${tex(metres)} \\div 10 = ${tex(div(metres, Q(10)))}$`);
  v.ok("17. un terrain et demi", egal(div(metres, Q(100)), D("1,5")) && c(17).includes("un terrain de football et demi"));
  echelle(17, { Terre: T, Soleil: S, distance: TS });
  const t17 = tab(17);
  v.ok("17. tableau : réel ÷ 10⁴ = maquette", ["Terre", "Soleil", "Distance"].every((l) => t17[l] && egal(div(lireNb(t17[l][0]), echMaquette), lireNb(t17[l][1]))));

  // 18.
  const lum = sci(3, 8);
  const ns = fois(lum, dix(-9));
  dit(18, `= ${tex(ns)}$ m, soit $${tex(fois(ns, Q(100)))}$ cm`);
  const cycle = div(lum, sci(3, 9));
  dit(18, `= 10^{${rang(cycle)}}$ m, soit $${tex(fois(cycle, Q(100)))}$ cm`);
  const us = fois(lum, dix(-6));
  dit(18, `= ${tex(us)}$ m. L'élève annonce $300$ km, mille fois trop`);
  v.ok("18. 300 km ÷ 300 m = 1 000", egal(div(grandeur("300 km"), us), Q(1000)));
  const t18 = tab(18);
  v.ok("18. tableau : 4 durées, distance = vitesse × durée", ["1 ns", "1 µs", "1 ms", "1 s"].every((l) => t18[l] && egal(grandeur(l), lireNb(t18[l][0])) && egal(grandeur(t18[l][1]), fois(lum, grandeur(l)))), JSON.stringify(t18));

  // 19.
  const arbres = sci(3, 12);
  const abattus = sci("1,5", 10);
  const humains = sci(8, 9);
  dit(19, `$3 \\times 10^{12}$ : ordre $10^{${ordre(arbres)}}$. $1{,}5 \\times 10^{10}$ : ordre $10^{${ordre(abattus)}}$.`);
  dit(19, `ordre $10^{${ordre(humains)}}$`);
  dit(19, `$10^{12} \\div 10^{10} = 10^{${ordre(arbres) - ordre(humains)}}$`);
  const parHumain = div(arbres, humains);
  dit(19, `= ${tex(parHumain)}$ arbres par être humain`);
  v.ok("19. 375 est bien « des centaines »", rang(parHumain) === ordre(arbres) - ordre(humains));
  const annees = div(arbres, abattus);
  dit(19, `= ${tex(annees)}$ ans`);
  const titre = sci("1,5", 7);
  dit(19, `écart $10 - 7 = ${rang(div(abattus, titre))}$ rangs, un facteur $${tex(div(abattus, titre))}$`);
  echelle(19, { "le titre": titre, "abattus/an": abattus, arbres });
  arc(19, div(abattus, titre));
  arc(19, annees);

  // 20.
  const vol = fois(fois(Q(50), Q(25)), Q(2));
  dit(20, `= ${tex(vol)}$ m³`);
  const litres = fois(vol, Q(1000));
  dit(20, `= ${tex(litres)}$ L, soit $${texSci(litres)}$ L`);
  const parL = fois(Q(1000), Q(20));
  dit(20, `= ${tex(parL)}$ gouttes par litre`);
  const gouttes = fois(litres, parL);
  dit(20, `= ${texSci(gouttes)}$, cinquante milliards`);
  const eleve = fois(litres, Q(20));
  v.ok("20. l'erreur de l'élève : 20 gouttes par litre donne bien 5 × 10⁷", egal(eleve, sci(5, 7)));
  dit(20, `= 10^{${rang(div(gouttes, eleve))}}$ : un facteur $1\\,000$`);
  v.ok("20. une goutte par seconde : plus de 1 500 ans", versNombre(div(gouttes, an)) > 1500 && c(20).includes("plus de $1\\,500$ ans"));
  const t20 = tab(20);
  v.ok("20. tableau : volume, litres, gouttes par litre, gouttes", egal(lireNb(t20.volume?.[1] ?? "0"), vol) && egal(lireNb(t20["en litres"]?.[1] ?? "0"), litres) && egal(lireNb(t20["gouttes par litre"]?.[1] ?? "0"), parL) && egal(lireNb(t20.gouttes?.[1] ?? "0"), gouttes));
  echelle(20, { "l'élève": eleve, juste: gouttes }, 0);
  arc(20, div(gouttes, eleve));
}

lancer({
  nom: "ORDRES DE GRANDEUR ET PRÉFIXES · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-ordres-grandeur.tsx",
  notionId: "ordre_grandeur",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : nano pris pour micro", "milliardième : $1$ ns $= 10^{-9}$ s", "milliardième : $1$ ns $= 10^{-6}$ s"],
    ["ex. 2 : un zéro de moins", "$= 0{,}000025$ m.", "$= 0{,}00025$ m."],
    ["ex. 3 : le piège appliqué, kilo → milli = 1 000", "contient $10^{6} = 1\\\\,000\\\\,000$ milligrammes", "contient $10^{3} = 1\\\\,000$ milligrammes"],
    ["ex. 4 schéma : l'Everest un rang trop haut", "{ e: 3.95, label: \"Everest\" }", "{ e: 4.95, label: \"Everest\" }"],
    ["ex. 5 schéma : 9 600 arrondi à 10³", "[\"9 600\", \"10³\", \"10⁴\", \"10⁴\"]", "[\"9 600\", \"10³\", \"10⁴\", \"10³\"]"],
    ["ex. 6 : les exposants multipliés", "= 10^{3+5} = 10^{8}$", "= 10^{3+5} = 10^{15}$"],
    ["ex. 7 : 4 − (−2) = 2", "= 10^{4-(-2)} = 10^{6}$", "= 10^{4-(-2)} = 10^{2}$"],
    ["ex. 8 : c) déclaré NON plausible", "est du même rang : plausible", "est du même rang : NON plausible"],
    ["ex. 9 schéma : l'arc à 10⁷", "label: \"× 10⁸\"", "label: \"× 10⁷\""],
    ["ex. 10 schéma : le colibri un rang trop bas", "{ e: -2.7, label: \"colibri\" }", "{ e: -3.7, label: \"colibri\" }"],
    ["ex. 11 : l'année exacte fausse", "3\\\\,600 = 31\\\\,536\\\\,000$", "3\\\\,600 = 31\\\\,536\\\\,600$"],
    ["ex. 12 : ppm lu comme pour dix mille", "= 0{,}042$, donc", "= 0{,}42$, donc"],
    ["ex. 13 : la division de la clé", "\\\\approx 9{,}1$", "\\\\approx 9{,}7$"],
    ["ex. 14 schéma : une année fausse", "[\"1 an\", \"4 × 10⁷\", \"36 792 000\"]", "[\"1 an\", \"4 × 10⁷\", \"36 790 000\"]"],
    ["ex. 15 : 70 virus", "= 700$ virus", "= 70$ virus"],
    ["ex. 16 schéma : le sens du facteur de Noé", "\"0,000045 s\", \"÷ 1 000\"", "\"0,000045 s\", \"× 1 000\""],
    ["ex. 17 : la distance de la maquette", "= 15\\\\,000$ cm", "= 1\\\\,500$ cm"],
    ["ex. 18 schéma : la milliseconde à 30 km", "[\"1 ms\", \"10⁻³ s\", \"300 km\"]", "[\"1 ms\", \"10⁻³ s\", \"30 km\"]"],
    ["ex. 19 : 37,5 arbres par humain", "= 375$ arbres", "= 37{,}5$ arbres"],
    ["ex. 20 : les gouttes à 10¹¹", "= 5 \\\\times 10^{10}$, cinquante", "= 5 \\\\times 10^{11}$, cinquante"],
    ["ex. 12 schéma : une étiquette trop longue, traversée par un trait", "{ e: -2, label: \"1 %\" }", "{ e: -2, label: \"un pour cent, soit\" }"],
    ["ex. 16 : le schéma passe dans l'énoncé (19 corrigés dessinés)", "schema: tableau([\n            [\"Élève\"", "figure: tableau([\n            [\"Élève\""],
    ["ex. 1 : un dollar perdu", "Réponse : $10^{3}$ m ;", "Réponse : 10^{3}$ m ;"],
    ["une micro inconnue du coach", "micros: [\"ordre_associer\", \"ordre_estimer\"],", "micros: [\"ordre_associer\", \"ordre_inconnue\"],"],
  ],
});
