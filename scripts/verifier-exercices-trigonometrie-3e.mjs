// Recalcul INDÉPENDANT des vingt corrigés de la feuille « La trigonométrie :
// cosinus, sinus, tangente » de 3e (lib/fiches-exercices/maths-3e-trigonometrie.tsx).
//
// ⭐ DEUX AUTRES CHEMINS pour chaque valeur :
// 1. la formule, refaite ici en degrés (Math.cos, Math.atan…), puis le corrigé
//    doit ÉCRIRE le bon arrondi ;
// 2. le TRIANGLE DESSINÉ : on relit ses coordonnées dans le source, on mesure
//    ses angles avec Math.atan2 et ses côtés avec Math.hypot, on le remet à
//    l'échelle d'une longueur donnée, et la valeur mesurée doit tomber sur le
//    même arrondi. Un triangle de 52° doit être DESSINÉ à 52°.
//
// ⭐ LES DESSINS : angle droit au sommet marqué, côtés chiffrés à l'échelle (1 %),
// angles en degrés à 0,5° près, mots « hypoténuse / adjacent / opposé » justes
// PAR RAPPORT À L'ANGLE MARQUÉ, étiquettes dans le cadre du canvas (260 × 210).
//
// ⛔ LE BUG CONNU (AC / CA) : tout segment à deux lettres écrit dans un énoncé ou
// un corrigé, dont les deux lettres sont des sommets du triangle dessiné, doit
// être nommé dans l'ORDRE DES CLÉS du canvas (AB, BC, CA). Et les mots des
// corrigés (« l'hypoténuse est $[FD]$ ») sont déduits de la GÉOMÉTRIE du dessin.
//
//   node scripts/verifier-exercices-trigonometrie-3e.mjs

import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/* ── Calcul ─────────────────────────────────────────────────────────────── */

const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;
const arr = (x, n) => Math.round(x * 10 ** n) / 10 ** n;
/** Écrit comme dans la feuille : 4{,}9 ; 17\,173 ; -10{,}76. */
function fr(x, n = 0) {
  const r = arr(x, n);
  let [e, f] = Math.abs(r).toFixed(n).split(".");
  if (e.length >= 4) e = e.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
  return (r < 0 ? "-" : "") + e + (f ? `{,}${f}` : "");
}
/** Tronqué à n décimales : « 4{,}925\ldots ». */
const tr = (x, n) => fr(Math.floor(x * 10 ** n) / 10 ** n, n);

/* ── Les triangles dessinés, relus dans le source ──────────────────────── */

const W = 260, H = 210, M = 34;
const cles = ["A", "B", "C"];
const cotesDe = { AB: ["A", "B"], BC: ["B", "C"], CA: ["C", "A"] };
const oppose = { A: "BC", B: "CA", C: "AB" };

function triangles(bloc) {
  return [...bloc.matchAll(/triangle\(\{ A: \[([-\d.]+), ([-\d.]+)\], B: \[([-\d.]+), ([-\d.]+)\], C: \[([-\d.]+), ([-\d.]+)\] \}, \{([^\n]*)\}\)/g)].map((m) => {
    const [ax, ay, bx, by, cx, cy] = m.slice(1, 7).map(Number);
    const o = m[7];
    const dict = (cle, re) => Object.fromEntries([...(o.match(new RegExp(`${cle}: \\{([^}]*)\\}`))?.[1] ?? "").matchAll(re)].map((x) => [x[1], x[2]]));
    const noms = { A: "A", B: "B", C: "C", ...dict("noms", /([ABC]): "([^"]*)"/g) };
    const h = o.match(/hauteur: \{ depuis: "([ABC])", label: "([^"]*)" \}/);
    return {
      P: { A: [ax, ay], B: [bx, by], C: [cx, cy] },
      noms,
      cotes: dict("cotes", /(AB|BC|CA): "([^"]*)"/g),
      angles: dict("angles", /([ABC]): "([^"]*)"/g),
      droit: o.match(/droit: "([ABC])"/)?.[1],
      hauteur: h ? { depuis: h[1], label: h[2] } : null,
      brut: m[0],
    };
  });
}
const long = (P, Q) => Math.hypot(Q[0] - P[0], Q[1] - P[1]);
/** L'angle au sommet S, par atan2 (|produit vectoriel|, produit scalaire). */
function angleAt(P, s) {
  const [u, w] = cles.filter((x) => x !== s).map((x) => [P[x][0] - P[s][0], P[x][1] - P[s][1]]);
  return deg(Math.atan2(Math.abs(u[0] * w[1] - u[1] * w[0]), u[0] * w[0] + u[1] * w[1]));
}
const L = (t, cote) => long(t.P[cotesDe[cote][0]], t.P[cotesDe[cote][1]]);
/** Le nom d'un segment dans l'ORDRE DES CLÉS : clé CA, noms C → F et A → D : « FD ». */
const nomCote = (t, cote) => cotesDe[cote].map((k) => t.noms[k]).join("");
/** Hypoténuse, adjacent, opposé PAR RAPPORT au sommet r, déduits de la géométrie. */
function roles(t, r) {
  const hyp = oppose[t.droit];
  const adj = Object.keys(cotesDe).find((c) => c !== hyp && cotesDe[c].includes(r));
  return { hyp, adj, opp: oppose[r] };
}
/** Le nombre d'une étiquette (« ? ≈ 17 173 m » → 17173, « 6,5 cm » → 6,5), sinon null. */
function nombreDe(t) {
  const apres = t.split(/[=≈]/).at(-1);
  const m = apres.match(/(\d{1,3}(?: \d{3})+|\d+)(?:,(\d+))?/);
  return m ? Number(m[1].replace(/ /g, "") + (m[2] ? "." + m[2] : "")) : null;
}
/** Pixels du canvas, comme `triangle()` de figures.tsx. */
function pixels(t) {
  const xs = cles.map((k) => t.P[k][0]), ys = cles.map((k) => t.P[k][1]);
  const [x0, y0] = [Math.min(...xs), Math.min(...ys)];
  const s = Math.min((W - 2 * M) / (Math.max(...xs) - x0 || 1), (H - 2 * M) / (Math.max(...ys) - y0 || 1));
  return Object.fromEntries(cles.map((k) => [k, [M + (t.P[k][0] - x0) * s, H - M - (t.P[k][1] - y0) * s]]));
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const tri = (k) => triangles(f.blocs[k - 1] ?? "");
  const dit = (k, phrase) => v.ok(`${k}. « ${phrase} »`, c(k).includes(phrase), "absent du corrigé");

  /** Tout ce que le dessin affirme est vrai. */
  const fidele = (k) => {
    const ts = tri(k);
    v.ok(`${k}. le corrigé a son triangle dessiné`, ts.length > 0);
    for (const t of ts) {
      const ang = Object.fromEntries(cles.map((s) => [s, angleAt(t.P, s)]));
      if (t.droit) v.ok(`${k}. l'angle droit est bien en ${t.noms[t.droit]} (${ang[t.droit].toFixed(3)}°)`, Math.abs(ang[t.droit] - 90) < 0.05);
      else v.ok(`${k}. sans angle droit marqué, aucun angle n'est droit`, Object.values(ang).every((a) => Math.abs(a - 90) > 0.5));
      // Les longueurs chiffrées, à l'échelle.
      const ratios = Object.entries(t.cotes).map(([s, e]) => [nombreDe(e), L(t, s)]).filter(([n]) => n !== null).map(([n, l]) => l / n);
      if (t.hauteur) {
        const S = t.P[t.hauteur.depuis];
        const [Q, R] = cles.filter((x) => x !== t.hauteur.depuis).map((x) => t.P[x]);
        const d = Math.abs((R[0] - Q[0]) * (Q[1] - S[1]) - (Q[0] - S[0]) * (R[1] - Q[1])) / long(Q, R);
        const n = nombreDe(t.hauteur.label);
        if (n !== null) ratios.push(d / n);
      }
      if (ratios.length >= 2) v.ok(`${k}. les ${ratios.length} longueurs chiffrées sont à l'échelle (1 %)`, ratios.every((r) => Math.abs(r / ratios[0] - 1) < 0.01), JSON.stringify(ratios));
      // Les angles écrits en degrés.
      for (const [s, e] of Object.entries(t.angles)) {
        if (!/°/.test(e)) continue;
        const d = Number(e.replace(/[^\d,]/g, "").replace(",", "."));
        v.ok(`${k}. l'angle « ${e} » en ${t.noms[s]} est celui du dessin (${ang[s].toFixed(2)}°)`, Math.abs(ang[s] - d) < 0.5);
      }
      // Les rôles : hypoténuse / adjacent / opposé, par rapport à l'angle marqué.
      const refs = Object.keys(t.angles);
      for (const [cote, e] of Object.entries(t.cotes)) {
        const mot = /hypot|hyp\./.test(e) ? "hyp" : /adjacent|adj\./.test(e) ? "adj" : /oppos|opp\./.test(e) ? "opp" : null;
        if (!mot) continue;
        v.ok(`${k}. « ${e} » : un angle droit et un seul angle de référence marqués`, !!t.droit && refs.length === 1);
        if (!t.droit || refs.length !== 1) continue;
        const r = refs[0];
        const vise = e.match(/ à (\S+)$/)?.[1];
        if (vise) v.ok(`${k}. « ${e} » vise l'angle marqué (${t.noms[r]})`, vise === t.noms[r]);
        v.ok(`${k}. « ${e} » est bien sur ${nomCote(t, cote)} par rapport à ${t.noms[r]}`, roles(t, r)[mot] === cote, `attendu ${nomCote(t, roles(t, r)[mot])}`);
      }
      // Les étiquettes dans le cadre (police 15 gras ≈ 8,5 px par signe ; angles 16 ≈ 9,5 px).
      const px = pixels(t);
      for (const [cote, e] of Object.entries(t.cotes)) {
        const [p, q] = cotesDe[cote].map((x) => px[x]);
        const mx = (p[0] + q[0]) / 2, demi = ([...e].length * 8.5) / 2;
        v.ok(`${k}. l'étiquette « ${e} » tient dans le cadre`, mx - demi >= 0 && mx + demi <= W, `${(mx - demi).toFixed(0)} → ${(mx + demi).toFixed(0)}`);
      }
      for (const [s, e] of Object.entries(t.angles)) {
        const x = px[s][0] + (s === "B" ? -24 : 10);
        v.ok(`${k}. l'angle « ${e} » tient dans le cadre`, x - 4 >= 0 && x + [...e].length * 9.5 <= W);
      }
      v.ok(`${k}. pas de $ ni de \\ dans le dessin`, !/[$\\]/.test(t.brut));
    }
    // ⛔ AC / CA : les segments écrits, dans l'ordre des clés.
    const permis = new Set(ts.flatMap((t) => Object.keys(cotesDe).map((cote) => nomCote(t, cote))));
    const sommets = new Set(ts.flatMap((t) => Object.values(t.noms)));
    const maths = [f.enonces[k - 1] ?? "", c(k)].join(" ").match(/\$[^$]*\$/g) ?? [];
    const lus = maths.flatMap((m) => [...m.matchAll(/(?<![A-Za-z\\])([A-Z])([A-Z])(?![A-Za-z])/g)].map((x) => x[1] + x[2]));
    const faux = [...new Set(lus.filter((s) => sommets.has(s[0]) && sommets.has(s[1]) && !permis.has(s)))];
    v.ok(`${k}. ${lus.length} segments écrits, tous dans l'ordre du dessin (${[...permis].join(", ")})`, faux.length === 0, faux.join(", "));
    return ts;
  };
  /** Les mots du corrigé : « l'hypoténuse est $[FD]$ »…, déduits du dessin. */
  const nomme = (k, quels, i = 0) => {
    const t = tri(k)[i];
    const r = Object.keys(t.angles)[0];
    const ro = roles(t, r);
    const phrases = { hyp: `hypoténuse est $[${nomCote(t, ro.hyp)}]$`, adj: `côté adjacent est $[${nomCote(t, ro.adj)}]$`, opp: `côté opposé est $[${nomCote(t, ro.opp)}]$` };
    for (const q of quels) v.ok(`${k}. « ${phrases[q]} »`, c(k).toLowerCase().includes(phrases[q].toLowerCase()), "absent du corrigé");
  };
  /** Une longueur MESURÉE sur le dessin, remise à l'échelle d'une longueur donnée. */
  const mesure = (k, cote, connu, valeur, i = 0) => {
    const t = tri(k)[i];
    return (L(t, cote) / L(t, connu)) * valeur;
  };
  /** Le dessin et la formule donnent le même arrondi, et le corrigé l'écrit. */
  const accord = (k, quoi, formule, dessin, n) => v.ok(`${k}. ${quoi} : formule ${formule.toFixed(4)}, dessin ${dessin.toFixed(4)} → ${fr(formule, n)}`, fr(formule, n) === fr(dessin, n));
  const angleDessin = (k, s = "A", i = 0) => angleAt(tri(k)[i].P, s);

  v.titre("★ Un seul geste");
  fidele(1);
  nomme(1, ["hyp", "adj", "opp"], 0);
  {
    const t = tri(1)[1];
    const ro = roles(t, "C");
    dit(1, `adjacent à $\\widehat{F}$ est $[${nomCote(t, ro.adj)}]$`);
    dit(1, `opposé à $\\widehat{F}$ est $[${nomCote(t, ro.opp)}]$`);
    v.ok("1. deux figures : le même triangle, deux angles de référence", tri(1).length === 2 && tri(1)[0].brut.split("cotes")[0] === tri(1)[1].brut.split("cotes")[0]);
  }

  fidele(2);
  nomme(2, ["hyp", "adj", "opp"]);
  v.ok("2. 24² + 7² = 25²", 24 * 24 + 7 * 7 === 25 * 25);
  accord(2, "cos K", 24 / 25, Math.cos(rad(angleDessin(2))), 2);
  accord(2, "sin K", 7 / 25, Math.sin(rad(angleDessin(2))), 2);
  accord(2, "tan K", 7 / 24, Math.tan(rad(angleDessin(2))), 2);
  dit(2, `\\dfrac{24}{25} = ${fr(24 / 25, 2)}$`);
  dit(2, `\\dfrac{7}{25} = ${fr(7 / 25, 2)}$`);
  dit(2, `\\dfrac{7}{24} \\approx ${fr(7 / 24, 2)}$`);
  accord(2, "cos M", 7 / 25, Math.cos(rad(angleDessin(2, "C"))), 2);
  dit(2, `$\\cos \\widehat{M} = \\dfrac{LM}{MK} = \\dfrac{7}{25} = ${fr(7 / 25, 2)}$`);

  const v3 = 8 * Math.cos(rad(52));
  fidele(3);
  nomme(3, ["hyp", "adj"]);
  accord(3, "AB", v3, mesure(3, "AB", "CA", 8), 1);
  dit(3, `$\\cos \\widehat{A} = \\dfrac{AB}{CA}$`);
  dit(3, `$AB = 8 \\times \\cos 52° \\approx ${fr(v3, 1)}$ cm (la calculatrice affiche $${tr(v3, 3)}\\ldots$)`);
  dit(3, `$8 \\times \\cos 52 \\approx ${fr(8 * Math.cos(52), 2)}$`);
  v.ok("3. en radians, la longueur est négative", 8 * Math.cos(52) < 0);
  dit(3, `Réponse : $AB \\approx ${fr(v3, 1)}$ cm.`);

  const v4 = 15 * Math.sin(rad(23));
  fidele(4);
  nomme(4, ["hyp", "opp"]);
  accord(4, "QR", v4, mesure(4, "BC", "CA", 15), 1);
  dit(4, `$QR = 15 \\times \\sin 23° \\approx ${fr(v4, 1)}$ cm (la calculatrice affiche $${tr(v4, 3)}\\ldots$)`);
  dit(4, `$15 \\times \\cos 23° \\approx ${fr(15 * Math.cos(rad(23)), 1)}$ cm`);
  dit(4, `Réponse : $QR \\approx ${fr(v4, 1)}$ cm.`);

  const v5 = 6.5 * Math.tan(rad(38));
  fidele(5);
  nomme(5, ["hyp", "adj", "opp"]);
  accord(5, "VW", v5, mesure(5, "BC", "AB", 6.5), 1);
  dit(5, `$VW = 6{,}5 \\times \\tan 38° \\approx ${fr(v5, 1)}$ cm (la calculatrice affiche $${tr(v5, 3)}\\ldots$)`);
  dit(5, `$6{,}5 \\div \\tan 38° \\approx ${fr(6.5 / Math.tan(rad(38)), 1)}$ cm`);
  dit(5, `Réponse : $VW \\approx ${fr(v5, 1)}$ cm.`);

  const v6 = 9 / Math.cos(rad(34));
  fidele(6);
  nomme(6, ["hyp", "adj"]);
  accord(6, "GE", v6, mesure(6, "CA", "AB", 9), 1);
  dit(6, `$GE = \\dfrac{9}{\\cos 34°} \\approx ${fr(v6, 1)}$ cm (la calculatrice affiche $${tr(v6, 3)}\\ldots$)`);
  dit(6, `$9 \\times \\cos 34° \\approx ${fr(9 * Math.cos(rad(34)), 1)}$ cm`);
  v.ok("6. le piège donne une hypoténuse plus courte que l'adjacent", 9 * Math.cos(rad(34)) < 9 && v6 > 9);
  dit(6, `Réponse : $GE \\approx ${fr(v6, 1)}$ cm.`);

  const a7 = deg(Math.acos(7 / 11));
  fidele(7);
  nomme(7, ["hyp", "adj"]);
  accord(7, "X", a7, deg(Math.atan2(Math.sqrt(11 * 11 - 49), 7)), 1);
  accord(7, "X dessiné", a7, angleDessin(7), 1);
  dit(7, `$\\widehat{X} = \\cos^{-1}\\left(\\dfrac{7}{11}\\right) \\approx ${fr(a7, 1)}°$`);
  dit(7, `$90° - ${fr(a7, 1)}° = ${fr(90 - arr(a7, 1), 1)}°$`);
  dit(7, `donne $\\approx ${fr(1 / Math.cos(rad(7 / 11)), 4)}$`);
  dit(7, `Réponse : $\\widehat{X} \\approx ${fr(a7, 1)}°$.`);

  const a8 = deg(Math.atan2(4.2, 7.5));
  fidele(8);
  nomme(8, ["hyp", "adj", "opp"]);
  accord(8, "R dessiné", a8, angleDessin(8), 1);
  dit(8, `= \\dfrac{4{,}2}{7{,}5} = ${fr(4.2 / 7.5, 2)}$`);
  dit(8, `$\\widehat{R} = \\tan^{-1}(0{,}56) \\approx ${fr(a8, 1)}°$`);
  const t8 = deg(Math.atan2(7.5, 4.2));
  accord(8, "T dessiné", t8, angleDessin(8, "C"), 1);
  dit(8, `\\approx ${fr(t8, 1)}°$ : c'est l'angle $\\widehat{T}$`);
  v.ok("8. les deux arrondis font 90°", arr(a8, 1) + arr(t8, 1) === 90);
  dit(8, `$${fr(a8, 1)}° + ${fr(t8, 1)}° = 90°$`);
  dit(8, `Réponse : $\\widehat{R} \\approx ${fr(a8, 1)}°$.`);

  v.titre("★★ Type devoir");
  const v9 = 13 * Math.sin(rad(27));
  fidele(9);
  nomme(9, ["hyp", "adj", "opp"]);
  accord(9, "TU", v9, mesure(9, "BC", "CA", 13), 1);
  dit(9, "Dans le triangle $STU$ rectangle en $T$, $\\sin \\widehat{S} = \\dfrac{TU}{US}$");
  dit(9, `$TU = 13 \\times \\sin 27° \\approx ${fr(v9, 1)}$ cm`);
  dit(9, `$13 \\times \\cos 27° \\approx ${fr(13 * Math.cos(rad(27)), 1)}$ cm : c'est $ST$`);
  dit(9, `Réponse : $TU \\approx ${fr(v9, 1)}$ cm.`);

  const v10 = 7.4 / Math.tan(rad(61));
  fidele(10);
  nomme(10, ["hyp", "adj", "opp"]);
  accord(10, "IH", v10, mesure(10, "AB", "BC", 7.4), 1);
  dit(10, `$IH = \\dfrac{7{,}4}{\\tan 61°} \\approx ${fr(v10, 1)}$ cm`);
  dit(10, `$7{,}4 \\times \\tan 61° \\approx ${fr(7.4 * Math.tan(rad(61)), 1)}$ cm`);
  dit(10, `Réponse : $IH \\approx ${fr(v10, 1)}$ cm.`);

  const a11 = deg(Math.asin(0.35 / 4.2));
  fidele(11);
  accord(11, "P dessiné", a11, angleDessin(11), 1);
  dit(11, `l'hypoténuse est la rampe $[${nomCote(tri(11)[0], "CA")}]$`);
  dit(11, `\\right) \\approx ${fr(a11, 1)}°$`);
  dit(11, `$\\sin^{-1}(0{,}08) \\approx ${fr(deg(Math.asin(0.08)), 1)}°$`);
  v.ok("11. l'arrondi trop tôt change le dixième", fr(a11, 1) !== fr(deg(Math.asin(0.08)), 1));
  dit(11, `$0{,}35 \\div 4{,}2 = ${tr(0.35 / 4.2, 4)}\\ldots$`);
  dit(11, `on perd $${Math.round(((0.35 / 4.2 - 0.08) / (0.35 / 4.2)) * 100)}$ %`);
  dit(11, `$${fr(a11, 1) === "4{,}8" ? "0{,}2" : "?"}°$`);
  dit(11, `environ $${fr(a11, 1)}°$ avec le sol.`);

  const a12 = deg(Math.atan2(3.8, 5.3));
  const ca12 = 3.8 / Math.sin(rad(a12));
  fidele(12);
  nomme(12, ["hyp", "adj", "opp"]);
  accord(12, "A dessiné", a12, angleDessin(12), 1);
  accord(12, "CA par Pythagore", ca12, Math.hypot(3.8, 5.3), 2);
  accord(12, "CA dessiné", ca12, mesure(12, "CA", "AB", 5.3), 2);
  dit(12, `\\right) \\approx ${fr(a12, 1)}°$`);
  dit(12, `$CA \\approx ${fr(ca12, 2)}$ cm`);
  dit(12, `$CA^2 = 5{,}3^2 + 3{,}8^2 = ${fr(5.3 ** 2, 2)} + ${fr(3.8 ** 2, 2)} = ${fr(5.3 ** 2 + 3.8 ** 2, 2)}$, et $\\sqrt{${fr(5.3 ** 2 + 3.8 ** 2, 2)}} \\approx ${fr(Math.hypot(5.3, 3.8), 2)}$ cm`);
  dit(12, `$3{,}8 \\div \\sin 36° \\approx ${fr(3.8 / Math.sin(rad(36)), 2)}$ cm`);
  dit(12, `avec $35{,}6°$ on trouve $${fr(3.8 / Math.sin(rad(35.6)), 2)}$ cm`);
  v.ok("12. les deux arrondis trop tôt donnent un autre centième", fr(3.8 / Math.sin(rad(36)), 2) !== fr(ca12, 2) && fr(3.8 / Math.sin(rad(35.6)), 2) !== fr(ca12, 2));
  dit(12, `Réponse : $\\widehat{A} \\approx ${fr(a12, 1)}°$ et $CA \\approx ${fr(ca12, 2)}$ cm.`);

  const bh = 6 / Math.tan(rad(42)), hc = 6 / Math.tan(rad(28));
  const [t13] = fidele(13);
  // Sur le dessin : le pied de la hauteur issue de A (clé C) coupe [BC] (clé AB).
  const pied13 = t13 ? t13.P.C[0] - t13.P.A[0] : 0;
  accord(13, "BH dessiné", bh, t13 ? (pied13 / t13.P.C[1]) * 6 : 0, 2);
  accord(13, "HC dessiné", hc, t13 ? ((t13.P.B[0] - t13.P.C[0]) / t13.P.C[1]) * 6 : 0, 2);
  v.ok("13. la base du dessin est horizontale", !!t13 && t13.P.A[1] === t13.P.B[1]);
  dit(13, `$BH = \\dfrac{6}{\\tan 42°} \\approx ${fr(bh, 2)}$ cm`);
  dit(13, `$HC = \\dfrac{6}{\\tan 28°} \\approx ${fr(hc, 2)}$ cm`);
  dit(13, `$BC \\approx ${fr(bh + hc, 2)}$, soit $${fr(bh + hc, 1)}$ cm`);
  dit(13, `$${fr(bh, 1)} + ${fr(hc, 1)} = ${fr(arr(bh, 1) + arr(hc, 1), 1)}$ cm`);
  v.ok("13. l'arrondi trop tôt change le dixième", fr(arr(bh, 1) + arr(hc, 1), 1) !== fr(bh + hc, 1));
  dit(13, `$BC \\approx ${fr(bh + hc, 1)}$ cm.`);

  const a14 = deg(Math.acos(5.6 / 8));
  fidele(14);
  nomme(14, ["hyp"]);
  accord(14, "J dessiné", a14, angleDessin(14), 1);
  v.ok("14. 5,6 ÷ 8 = 0,7", Math.abs(5.6 / 8 - 0.7) < 1e-12);
  v.ok(`14. l'énoncé : 1 ÷ cos(0,7) donne ${fr(1 / Math.cos(rad(0.7)), 4)} en degrés`, (f.enonces[13] ?? "").includes(`trouve $${fr(1 / Math.cos(rad(0.7)), 4)}$`));
  dit(14, `$\\widehat{J} = \\cos^{-1}(0{,}7) \\approx ${fr(a14, 1)}°$`);
  dit(14, `$\\cos ${fr(a14, 1)}° \\approx ${fr(Math.cos(rad(arr(a14, 1))), 2)}$`);
  dit(14, `Réponse : $\\widehat{J} \\approx ${fr(a14, 1)}°$.`);

  const v15 = 14 * Math.sin(rad(48));
  fidele(15);
  accord(15, "HV dessiné", v15, mesure(15, "BC", "CA", 14), 1);
  dit(15, `L'hypoténuse est le fil $[${nomCote(tri(15)[0], "CA")}]$`);
  dit(15, `$HV = 14 \\times \\sin 48° \\approx ${fr(v15, 1)}$ m`);
  dit(15, `$14 \\times \\sin 48 \\approx ${fr(14 * Math.sin(48), 2)}$`);
  v.ok("15. sin 30° = 0,5", Math.abs(Math.sin(rad(30)) - 0.5) < 1e-12);
  dit(15, `environ $${fr(v15, 1)}$ m au-dessus`);

  const v16 = 3.5 / Math.tan(rad(20)), a16 = deg(Math.acos(9 / 12));
  fidele(16);
  v.ok("16. deux triangles dessinés", tri(16).length === 2);
  nomme(16, ["hyp"], 0);
  nomme(16, ["hyp"], 1);
  accord(16, "EF dessiné", v16, mesure(16, "AB", "BC", 3.5, 0), 1);
  accord(16, "R dessiné", a16, angleDessin(16, "A", 1), 1);
  dit(16, `$EF = \\dfrac{3{,}5}{\\tan 20°} \\approx ${fr(v16, 1)}$ cm`);
  dit(16, `$\\cos \\widehat{R} = \\dfrac{9}{12} = ${fr(9 / 12, 2)}$, donc $\\widehat{R} = \\cos^{-1}(0{,}75) \\approx ${fr(a16, 1)}°$`);
  dit(16, `Réponse : a) $EF \\approx ${fr(v16, 1)}$ cm ; b) $\\widehat{R} \\approx ${fr(a16, 1)}°$.`);

  v.titre("★★★ Problèmes");
  const h17 = 400 * Math.tan(rad(39.5));
  fidele(17);
  accord(17, "PS dessiné", h17, mesure(17, "BC", "AB", 400), 1);
  dit(17, `$PS = 400 \\times \\tan 39{,}5° \\approx ${fr(h17, 1)}$ m`);
  dit(17, `À $${Math.round((330 - h17) * 100)}$ cm près`);
  dit(17, `$SO = \\dfrac{400}{\\cos 39{,}5°} \\approx ${fr(400 / Math.cos(rad(39.5)), 0)}$ m`);
  dit(17, `$400 \\times \\sin 39{,}5° \\approx ${fr(400 * Math.sin(rad(39.5)), 0)}$ m, une tour trop petite de $${330 - Math.round(400 * Math.sin(rad(39.5)))}$ m`);
  dit(17, `Réponse : la tour mesure environ $${fr(h17, 1)}$ m`);
  dit(17, `à environ $${fr(400 / Math.cos(rad(39.5)), 0)}$ m de l'élève`);

  const h18 = 7 * Math.sin(rad(75)), p18 = 7 * Math.cos(rad(75));
  fidele(18);
  accord(18, "MH dessiné", h18, mesure(18, "BC", "CA", 7), 2);
  accord(18, "PM dessiné", p18, mesure(18, "AB", "CA", 7), 2);
  dit(18, `$MH = 7 \\times \\sin 75° \\approx ${fr(h18, 2)}$ m`);
  dit(18, `$PM = 7 \\times \\cos 75° \\approx ${fr(p18, 2)}$ m`);
  dit(18, `$7 \\div 4 = ${fr(7 / 4, 2)}$ m`);
  dit(18, `à $${Math.round((arr(p18, 2) - 7 / 4) * 100)}$ cm près`);
  dit(18, `Réponse : l'échelle touche le mur à environ $${fr(h18, 2)}$ m, le pied est à environ $${fr(p18, 2)}$ m`);

  const a19 = deg(Math.atan(0.1)), b19 = deg(Math.atan(0.35));
  fidele(19);
  accord(19, "10 % dessiné", a19, angleDessin(19, "A", 0), 1);
  accord(19, "35 % dessiné", b19, angleDessin(19, "A", 1), 1);
  dit(19, `$\\alpha = \\tan^{-1}(0{,}1) \\approx ${fr(a19, 1)}°$`);
  dit(19, `$\\beta = \\tan^{-1}(0{,}35) \\approx ${fr(b19, 1)}°$`);
  dit(19, `$2\\,000 \\times \\sin \\alpha \\approx ${fr(2000 * Math.sin(rad(a19)), 0)}$ m`);
  dit(19, `$\\tan 10° \\approx ${fr(Math.tan(rad(10)), 3)}$, soit une pente de $${fr(Math.tan(rad(10)) * 100, 1)}$ %`);
  dit(19, `Réponse : $10$ % correspond à environ $${fr(a19, 1)}°$, $35$ % à environ $${fr(b19, 1)}°$ ; la voiture descend d'environ $${fr(2000 * Math.sin(rad(a19)), 0)}$ m.`);

  const d20 = 900 / Math.tan(rad(3)), l20 = 900 / Math.sin(rad(3));
  fidele(20);
  accord(20, "TB dessiné", d20, mesure(20, "AB", "BC", 900), 0);
  dit(20, `$TB = \\dfrac{900}{\\tan 3°} \\approx ${fr(d20, 0)}$ m, soit environ $${fr(d20 / 1000, 1)}$ km`);
  dit(20, `$5\\,000 \\times \\tan 3° \\approx ${fr(5000 * Math.tan(rad(3)), 0)}$ m`);
  dit(20, `$AT = \\dfrac{900}{\\sin 3°} \\approx ${fr(l20, 0)}$ m`);
  dit(20, `seulement $${Math.round(l20 - d20)}$ m de plus`);
  dit(20, `Réponse : l'avion est à environ $${fr(d20 / 1000, 1)}$ km de la piste ; à $5$ km, il devrait voler à environ $${fr(5000 * Math.tan(rad(3)), 0)}$ m ; il parcourt environ $${fr(l20, 0)}$ m`);

  v.titre("Les dessins");
  const dessines = f.blocs.filter((b) => /\btriangle\(/.test(b)).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20);
}

lancer({
  nom: "LA TRIGONOMÉTRIE · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-trigonometrie.tsx",
  notionId: "trigo_trigonometrie",
  classe: "3e",
  verifier,
  casses: [
    ["ex. 1 : adjacent et opposé échangés sur le dessin", "AB: \"adjacent à D\", BC: \"opposé à D\"", "AB: \"opposé à D\", BC: \"adjacent à D\""],
    ["ex. 1 : le segment nommé à l'envers (le bug AC / CA)", "Le côté adjacent est $[DE]$", "Le côté adjacent est $[ED]$"],
    ["ex. 2 : les rôles lus depuis M au lieu de K", "AB: \"adjacent 24 cm\", BC: \"opposé 7 cm\"", "AB: \"opposé 24 cm\", BC: \"adjacent 7 cm\""],
    ["ex. 3 : AC au lieu de CA dans la formule", "$\\\\cos \\\\widehat{A} = \\\\dfrac{AB}{CA}$", "$\\\\cos \\\\widehat{A} = \\\\dfrac{AB}{AC}$"],
    ["ex. 3 : le sinus au lieu du cosinus", "Réponse : $AB \\\\approx 4{,}9$ cm.", "Réponse : $AB \\\\approx 6{,}3$ cm."],
    ["ex. 3 : l'angle de 52° mal dessiné", "C: [2.6045, 7.5641]", "C: [2.6045, 6.5]"],
    ["ex. 4 : le cosinus par habitude", "Réponse : $QR \\\\approx 5{,}9$ cm.", "Réponse : $QR \\\\approx 13{,}8$ cm."],
    ["ex. 5 : le rapport renversé", "Réponse : $VW \\\\approx 5{,}1$ cm.", "Réponse : $VW \\\\approx 8{,}3$ cm."],
    ["ex. 6 : multiplier au lieu de diviser", "Réponse : $GE \\\\approx 10{,}9$ cm.", "Réponse : $GE \\\\approx 7{,}5$ cm."],
    ["ex. 7 : l'autre angle", "Réponse : $\\\\widehat{X} \\\\approx 50{,}5°$.", "Réponse : $\\\\widehat{X} \\\\approx 39{,}5°$."],
    ["ex. 8 : l'angle écrit sur le dessin ne colle plus", "angles: { A: \"? ≈ 29,2°\" }", "angles: { A: \"? ≈ 32,2°\" }"],
    ["ex. 9 : l'angle droit marqué au mauvais sommet", "angles: { A: \"27°\" }, droit: \"B\"", "angles: { A: \"27°\" }, droit: \"C\""],
    ["ex. 10 : multiplier quand l'inconnue est en bas", "Réponse : $IH \\\\approx 4{,}1$ cm.", "Réponse : $IH \\\\approx 13{,}3$ cm."],
    ["ex. 11 : l'arrondi pris trop tôt", "environ $4{,}8°$ avec le sol.", "environ $4{,}6°$ avec le sol."],
    ["ex. 12 : l'angle arrondi avant de s'en servir", "et $CA \\\\approx 6{,}52$ cm.", "et $CA \\\\approx 6{,}46$ cm."],
    ["ex. 13 : les morceaux arrondis avant l'addition", "$BC \\\\approx 17{,}9$ cm.", "$BC \\\\approx 18{,}0$ cm."],
    ["ex. 13 : la hauteur dessinée trop longue", "C: [6.6637, 6]", "C: [6.6637, 7]"],
    ["ex. 14 : cos⁻¹ lu comme 1 ÷ cos", "Réponse : $\\\\widehat{J} \\\\approx 45{,}6°$.", "Réponse : $\\\\widehat{J} \\\\approx 1{,}0001°$."],
    ["ex. 15 : la calculatrice en radians", "environ $10{,}4$ m au-dessus", "environ $-10{,}76$ m au-dessus"],
    ["ex. 17 : la distance au sol prise pour l'hypoténuse", "Réponse : la tour mesure environ $329{,}7$ m", "Réponse : la tour mesure environ $254{,}4$ m"],
    ["ex. 17 : la tour dessinée trop petite", "C: [400, 329.7346]", "C: [400, 254.4313]"],
    ["ex. 17 : une étiquette qui sort du cadre", "BC: \"? ≈ 329,7 m\"", "BC: \"opposé ? ≈ 329,7 m\""],
    ["ex. 18 : sinus et cosinus échangés sur le dessin", "AB: \"? ≈ 1,81 m\", BC: \"? ≈ 6,76 m\"", "AB: \"? ≈ 6,76 m\", BC: \"? ≈ 1,81 m\""],
    ["ex. 19 : 10 % pris pour 10°", "Réponse : $10$ % correspond à environ $5{,}7°$", "Réponse : $10$ % correspond à environ $10°$"],
    ["ex. 20 : le trajet pris pour la distance au sol", "\\\\approx 17\\\\,173$ m, soit environ", "\\\\approx 17\\\\,197$ m, soit environ"],
    ["un $ dans un dessin", "CA: \"hyp. 8 cm\" }, angles: { A: \"52°\" }", "CA: \"$CA = 8$ cm\" }, angles: { A: \"52°\" }"],
    ["une micro d'une autre notion", "micros: [\"trigo_sinus\", \"trigo_calculer_longueur\"],\n        },\n        {\n          enonce: \"Le triangle $UVW$", "micros: [\"pythagore_calculer_cote\"],\n        },\n        {\n          enonce: \"Le triangle $UVW$"],
  ],
});
