// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Le cosinus dans le
// triangle rectangle » de 4e (lib/fiches-exercices/maths-4e-cosinus.tsx).
// Méthode reprise de la feuille de trigonométrie de 3e.
//
// ⭐ DEUX AUTRES CHEMINS pour chaque valeur :
// 1. la formule, refaite ici en degrés (Math.cos, Math.acos, Math.hypot…), puis
//    le corrigé doit ÉCRIRE le bon arrondi ;
// 2. le TRIANGLE DESSINÉ : on relit ses coordonnées dans le source, on mesure
//    ses angles avec Math.atan2 et ses côtés avec Math.hypot, on le remet à
//    l'échelle d'une longueur donnée, et la valeur mesurée doit tomber sur le
//    même arrondi. Un triangle de 41° doit être DESSINÉ à 41°.
//
// ⭐ LES DESSINS : angle droit au sommet marqué, côtés chiffrés à l'échelle (1 %),
// angles en degrés à 0,5° près, mots « hypoténuse / adjacent » justes PAR
// RAPPORT À L'ANGLE MARQUÉ, étiquettes dans le cadre du canvas (260 × 210).
// Le quart de cercle de l'exercice 8 : chaque valeur écrite sous l'axe est
// l'arrondi du cosinus de son angle.
//
// ⛔ LE BUG CONNU (AC / CA) : tout segment à deux lettres écrit dans un énoncé ou
// un corrigé, dont les deux lettres sont des sommets du triangle dessiné, doit
// être nommé dans l'ORDRE DES CLÉS du canvas (AB, BC, CA). Et les mots des
// corrigés (« l'hypoténuse est $[PM]$ ») sont déduits de la GÉOMÉTRIE du dessin.
//
// ⛔ LE PROGRAMME DE 4e : seul le cosinus. Aucun « sinus », « tangente »,
// « opposé », « CAH-SOH-TOA » dans ce que l'élève lit.
//
//   node scripts/verifier-exercices-cosinus-4e.mjs

import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/* ── Calcul ─────────────────────────────────────────────────────────────── */

const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;
const arr = (x, n) => Math.round(x * 10 ** n) / 10 ** n;
/** Écrit comme dans la feuille : 9{,}1 ; 1\,113 ; -11{,}85. */
function fr(x, n = 0) {
  const r = arr(x, n);
  let [e, f] = Math.abs(r).toFixed(n).split(".");
  if (e.length >= 4) e = e.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
  return (r < 0 ? "-" : "") + e + (f ? `{,}${f}` : "");
}
/** Tronqué à n décimales : « 9{,}056\ldots ». */
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
    return {
      P: { A: [ax, ay], B: [bx, by], C: [cx, cy] },
      noms: { A: "A", B: "B", C: "C", ...dict("noms", /([ABC]): "([^"]*)"/g) },
      cotes: dict("cotes", /(AB|BC|CA): "([^"]*)"/g),
      angles: dict("angles", /([ABC]): "([^"]*)"/g),
      droit: o.match(/droit: "([ABC])"/)?.[1],
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
/** Le nom d'un segment dans l'ORDRE DES CLÉS : clé CA, noms C → P et A → M : « PM ». */
const nomCote = (t, cote) => cotesDe[cote].map((k) => t.noms[k]).join("");
/** Hypoténuse et adjacent PAR RAPPORT au sommet r, déduits de la géométrie. */
function roles(t, r) {
  const hyp = oppose[t.droit];
  const adj = Object.keys(cotesDe).find((c) => c !== hyp && cotesDe[c].includes(r));
  return { hyp, adj };
}
/** Le nombre d'une étiquette (« ? ≈ 1 113 m » → 1113, « 7,5 cm » → 7,5), sinon null. */
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
  const e = (k) => f.enonces[k - 1] ?? "";
  const tri = (k) => triangles(f.blocs[k - 1] ?? "");
  const dit = (k, phrase) => v.ok(`${k}. « ${phrase} »`, c(k).includes(phrase), "absent du corrigé");

  /** Tout ce que le dessin affirme est vrai. */
  const fidele = (k) => {
    const ts = tri(k);
    v.ok(`${k}. le corrigé a son triangle dessiné`, ts.length > 0);
    for (const t of ts) {
      const ang = Object.fromEntries(cles.map((s) => [s, angleAt(t.P, s)]));
      v.ok(`${k}. l'angle droit est bien en ${t.noms[t.droit]} (${t.droit ? ang[t.droit].toFixed(3) : "?"}°)`, !!t.droit && Math.abs(ang[t.droit] - 90) < 0.05);
      // Les longueurs chiffrées, à l'échelle.
      const ratios = Object.entries(t.cotes).map(([s, et]) => [nombreDe(et), L(t, s)]).filter(([n]) => n !== null).map(([n, l]) => l / n);
      if (ratios.length >= 2) v.ok(`${k}. les ${ratios.length} longueurs chiffrées sont à l'échelle (1 %)`, ratios.every((r) => Math.abs(r / ratios[0] - 1) < 0.01), JSON.stringify(ratios));
      // Les angles écrits en degrés.
      for (const [s, et] of Object.entries(t.angles)) {
        if (!/°/.test(et)) continue;
        const d = Number(et.replace(/[^\d,]/g, "").replace(",", "."));
        v.ok(`${k}. l'angle « ${et} » en ${t.noms[s]} est celui du dessin (${ang[s].toFixed(2)}°)`, Math.abs(ang[s] - d) < 0.5);
      }
      // Les rôles : hypoténuse / adjacent, par rapport à l'angle marqué.
      const refs = Object.keys(t.angles);
      v.ok(`${k}. un seul angle de référence marqué, et il est aigu`, refs.length === 1 && refs[0] !== t.droit);
      for (const [cote, et] of Object.entries(t.cotes)) {
        const mot = /hypot|hyp\./.test(et) ? "hyp" : /adjacent|adj\./.test(et) ? "adj" : null;
        if (!mot || refs.length !== 1) continue;
        const r = refs[0];
        const vise = et.match(/ à (\S+)$/)?.[1];
        if (vise) v.ok(`${k}. « ${et} » vise l'angle marqué (${t.noms[r]})`, vise === t.noms[r]);
        v.ok(`${k}. « ${et} » est bien sur ${nomCote(t, cote)} par rapport à ${t.noms[r]}`, roles(t, r)[mot] === cote, `attendu ${nomCote(t, roles(t, r)[mot])}`);
      }
      // Les étiquettes dans le cadre (police 15 gras ≈ 8,5 px par signe ; angles 16 ≈ 9,5 px).
      const px = pixels(t);
      for (const [cote, et] of Object.entries(t.cotes)) {
        const [p, q] = cotesDe[cote].map((x) => px[x]);
        const mx = (p[0] + q[0]) / 2, demi = ([...et].length * 8.5) / 2;
        v.ok(`${k}. l'étiquette « ${et} » tient dans le cadre`, mx - demi >= 0 && mx + demi <= W, `${(mx - demi).toFixed(0)} → ${(mx + demi).toFixed(0)}`);
      }
      for (const [s, et] of Object.entries(t.angles)) {
        const x = px[s][0] + (s === "B" ? -24 : 10);
        v.ok(`${k}. l'angle « ${et} » tient dans le cadre`, x - 4 >= 0 && x + [...et].length * 9.5 <= W);
      }
      v.ok(`${k}. pas de $ ni de \\ dans le dessin`, !/[$\\]/.test(t.brut));
    }
    // ⛔ AC / CA : les segments écrits, dans l'ordre des clés.
    const permis = new Set(ts.flatMap((t) => Object.keys(cotesDe).map((cote) => nomCote(t, cote))));
    const sommets = new Set(ts.flatMap((t) => Object.values(t.noms)));
    const maths = [e(k), c(k)].join(" ").match(/\$[^$]*\$/g) ?? [];
    const lus = maths.flatMap((m) => [...m.matchAll(/(?<![A-Za-z\\])([A-Z])([A-Z])(?![A-Za-z])/g)].map((x) => x[1] + x[2]));
    const faux = [...new Set(lus.filter((s) => sommets.has(s[0]) && sommets.has(s[1]) && !permis.has(s)))];
    v.ok(`${k}. ${lus.length} segments écrits, tous dans l'ordre du dessin (${[...permis].join(", ")})`, faux.length === 0, faux.join(", "));
    return ts;
  };
  /** Les mots du corrigé : « l'hypoténuse est $[PM]$ »…, déduits du dessin. */
  const nomme = (k, quels, i = 0) => {
    const t = tri(k)[i];
    if (!t) return v.ok(`${k}. triangle ${i} présent`, false);
    const r = Object.keys(t.angles)[0];
    const ro = roles(t, r);
    const phrases = { hyp: `hypoténuse est $[${nomCote(t, ro.hyp)}]$`, adj: `côté adjacent est $[${nomCote(t, ro.adj)}]$` };
    for (const q of quels) v.ok(`${k}. « ${phrases[q]} »`, c(k).toLowerCase().includes(phrases[q].toLowerCase()), "absent du corrigé");
  };
  /** Une longueur MESURÉE sur le dessin, remise à l'échelle d'une longueur donnée. */
  const mesure = (k, cote, connu, valeur, i = 0) => {
    const t = tri(k)[i];
    return t ? (L(t, cote) / L(t, connu)) * valeur : NaN;
  };
  /** Le dessin et la formule donnent le même arrondi. */
  const accord = (k, quoi, formule, dessin, n) => v.ok(`${k}. ${quoi} : formule ${formule.toFixed(4)}, dessin ${Number(dessin).toFixed(4)} → ${fr(formule, n)}`, fr(formule, n) === fr(dessin, n));
  const angleDessin = (k, s = "A", i = 0) => (tri(k)[i] ? angleAt(tri(k)[i].P, s) : NaN);

  v.titre("Le programme de 4e : le cosinus seul");
  const interdits = f.textes.filter((t) => /sinus|\\sin\b|\btan\b|\\tan\b|tangente|oppos|CAH|SOH|TOA/i.test(t.replace(/cosinus/gi, "")));
  v.ok("ni sinus, ni tangente, ni « opposé », ni CAH-SOH-TOA", interdits.length === 0, interdits[0]?.slice(0, 120));

  v.titre("★ Un seul geste");
  fidele(1);
  nomme(1, ["hyp", "adj"], 0);
  {
    const t = tri(1)[1];
    dit(1, `adjacent à $\\widehat{P}$ est $[${nomCote(t, roles(t, "C").adj)}]$`);
    v.ok("1. deux figures : le même triangle, deux angles de référence", tri(1).length === 2 && tri(1)[0].brut.split("cotes")[0] === tri(1)[1].brut.split("cotes")[0]);
    v.ok("1. d) [MN] ne touche pas P", !cotesDe.AB.includes("C") && tri(1)[0].noms.C === "P" && nomCote(tri(1)[0], "AB") === "MN");
  }

  fidele(2);
  nomme(2, ["hyp", "adj"]);
  v.ok("2. 12² + 5² = 13²", 12 * 12 + 5 * 5 === 13 * 13);
  accord(2, "cos R", 12 / 13, Math.cos(rad(angleDessin(2))), 2);
  accord(2, "cos T", 5 / 13, Math.cos(rad(angleDessin(2, "C"))), 2);
  dit(2, `$\\cos \\widehat{R} = \\dfrac{RS}{TR} = \\dfrac{12}{13} \\approx ${fr(12 / 13, 2)}$`);
  dit(2, `$\\cos \\widehat{T} = \\dfrac{ST}{TR} = \\dfrac{5}{13} \\approx ${fr(5 / 13, 2)}$`);
  dit(2, `c'est maintenant $[${nomCote(tri(2)[0], "BC")}]$`);
  dit(2, `Réponse : $\\cos \\widehat{R} \\approx ${fr(12 / 13, 2)}$ et $\\cos \\widehat{T} \\approx ${fr(5 / 13, 2)}$.`);

  fidele(3);
  nomme(3, ["hyp", "adj"]);
  v.ok("3. 15² + 8² = 17²", 15 * 15 + 8 * 8 === 17 * 17);
  v.ok(`3. l'énoncé : 17 ÷ 15 ≈ ${fr(17 / 15, 2)}, plus grand que 1`, e(3).includes(`\\dfrac{17}{15} \\approx ${fr(17 / 15, 2)}$`) && 17 / 15 > 1);
  accord(3, "cos E", 15 / 17, Math.cos(rad(angleDessin(3))), 2);
  dit(3, `$\\cos \\widehat{E} = \\dfrac{EF}{GE} = \\dfrac{15}{17} \\approx ${fr(15 / 17, 2)}$`);
  dit(3, `Réponse : $\\cos \\widehat{E} \\approx ${fr(15 / 17, 2)}$.`);

  const v4 = 12 * Math.cos(rad(41));
  fidele(4);
  nomme(4, ["hyp", "adj"]);
  accord(4, "KL dessiné", v4, mesure(4, "AB", "CA", 12), 1);
  dit(4, `$\\cos \\widehat{K} = \\dfrac{KL}{MK}$`);
  dit(4, `$KL = 12 \\times \\cos 41° \\approx ${fr(v4, 1)}$ cm (la calculatrice affiche $${tr(v4, 3)}\\ldots$)`);
  dit(4, `$12 \\times \\cos 41 \\approx ${fr(12 * Math.cos(41), 2)}$`);
  v.ok("4. en radians, la longueur est négative", 12 * Math.cos(41) < 0);
  dit(4, `Réponse : $KL \\approx ${fr(v4, 1)}$ cm.`);

  const v5 = 7.5 / Math.cos(rad(28));
  fidele(5);
  nomme(5, ["hyp", "adj"]);
  accord(5, "FD dessiné", v5, mesure(5, "CA", "AB", 7.5), 1);
  dit(5, `$FD = \\dfrac{7{,}5}{\\cos 28°} \\approx ${fr(v5, 1)}$ cm (la calculatrice affiche $${tr(v5, 3)}\\ldots$)`);
  dit(5, `$7{,}5 \\times \\cos 28° \\approx ${fr(7.5 * Math.cos(rad(28)), 1)}$ cm`);
  v.ok("5. le piège donne une hypoténuse plus courte que l'adjacent", 7.5 * Math.cos(rad(28)) < 7.5 && v5 > 7.5);
  dit(5, `Réponse : $FD \\approx ${fr(v5, 1)}$ cm.`);

  const a6 = deg(Math.acos(5.2 / 8));
  fidele(6);
  nomme(6, ["hyp", "adj"]);
  accord(6, "A dessiné", a6, angleDessin(6), 1);
  dit(6, `= \\dfrac{5{,}2}{8} = ${fr(5.2 / 8, 2)}$`);
  dit(6, `$\\widehat{A} = \\cos^{-1}(0{,}65) \\approx ${fr(a6, 1)}°$`);
  v.ok("6. cos⁻¹(5,2) n'existe pas", Number.isNaN(Math.acos(5.2)));
  dit(6, `Réponse : $\\widehat{A} \\approx ${fr(a6, 1)}°$.`);

  const a7 = deg(Math.acos(6.6 / 11));
  fidele(7);
  nomme(7, ["hyp", "adj"]);
  accord(7, "P dessiné", a7, angleDessin(7), 1);
  v.ok("7. 6,6 ÷ 11 = 0,6", Math.abs(6.6 / 11 - 0.6) < 1e-12);
  dit(7, `$\\widehat{P} = \\cos^{-1}(0{,}6) \\approx ${fr(a7, 1)}°$`);
  dit(7, `$\\cos ${fr(a7, 1)}° \\approx ${fr(Math.cos(rad(arr(a7, 1))), 2)}$`);
  dit(7, `$\\cos(0{,}6) \\approx ${fr(Math.cos(rad(0.6)), 4)}$`);
  dit(7, `Réponse : $\\widehat{P} \\approx ${fr(a7, 1)}°$.`);

  {
    const bloc = f.blocs[7] ?? "";
    const m = bloc.match(/quartDeCercle\(\[([^\n]*)\]\)/);
    const rayons = m ? [...m[1].matchAll(/\[(\d+), "([^"]*)"\]/g)].map((x) => [Number(x[1]), x[2]]) : [];
    v.ok("8. le quart de cercle dessiné a ses trois angles (25°, 50°, 75°)", JSON.stringify(rayons.map((x) => x[0])) === "[25,50,75]");
    for (const [a, lab] of rayons) {
      v.ok(`8. sous l'axe, cos ${a}° s'écrit ${lab}`, fr(Math.cos(rad(a)), 2).replace("{,}", ",") === lab);
      dit(8, `$\\cos ${a}° \\approx ${fr(Math.cos(rad(a)), 2)}$`);
    }
    dit(8, `La moitié de $${fr(Math.cos(rad(25)), 2)}$, c'est environ $${fr(Math.floor((arr(Math.cos(rad(25)), 2) / 2) * 100) / 100, 2)}$`);
    v.ok("8. cos 50° n'est pas la moitié de cos 25°", Math.abs(Math.cos(rad(50)) - Math.cos(rad(25)) / 2) > 0.1);
    v.ok("8. cos 80° < cos 40° < cos 10°", Math.cos(rad(80)) < Math.cos(rad(40)) && Math.cos(rad(40)) < Math.cos(rad(10)));
    dit(8, "Donc $\\cos 80° < \\cos 40° < \\cos 10°$.");
  }

  v.titre("★★ Type devoir");
  const v9 = 9.4 * Math.cos(rad(33)), kl9 = Math.sqrt(9.4 ** 2 - v9 ** 2);
  fidele(9);
  nomme(9, ["hyp", "adj"]);
  accord(9, "JK dessiné", v9, mesure(9, "AB", "CA", 9.4), 1);
  accord(9, "KL dessiné", kl9, mesure(9, "BC", "CA", 9.4), 1);
  accord(9, "KL par Pythagore = 9,4 × sin 33° (autre chemin)", kl9, 9.4 * Math.sin(rad(33)), 1);
  dit(9, `$JK = 9{,}4 \\times \\cos 33° \\approx ${fr(v9, 1)}$ cm`);
  dit(9, `$KL = \\sqrt{9{,}4^2 - JK^2} \\approx ${fr(kl9, 1)}$ cm`);
  dit(9, `$9{,}4 \\div \\cos 33° \\approx ${fr(9.4 / Math.cos(rad(33)), 1)}$ cm`);
  dit(9, `Réponse : $JK \\approx ${fr(v9, 1)}$ cm et $KL \\approx ${fr(kl9, 1)}$ cm.`);

  const v10 = 4.6 / Math.cos(rad(57));
  fidele(10);
  nomme(10, ["hyp"]);
  dit(10, `Le côté adjacent est $[${nomCote(tri(10)[0], "AB")}]$`);
  accord(10, "GI dessiné", v10, mesure(10, "CA", "AB", 4.6), 1);
  dit(10, `$GI = \\dfrac{4{,}6}{\\cos 57°} \\approx ${fr(v10, 1)}$ cm (la calculatrice affiche $${tr(v10, 3)}\\ldots$)`);
  dit(10, `$\\cos 57° \\approx ${fr(Math.cos(rad(57)), 4)}$ ; arrondi à $${fr(Math.cos(rad(57)), 1)}$, il donne $4{,}6 \\div ${fr(Math.cos(rad(57)), 1)} = ${fr(4.6 / arr(Math.cos(rad(57)), 1), 1)}$ cm`);
  v.ok("10. l'arrondi trop tôt change le résultat", fr(4.6 / arr(Math.cos(rad(57)), 1), 1) !== fr(v10, 1));
  dit(10, `Réponse : $GI \\approx ${fr(v10, 1)}$ cm.`);

  const a11 = deg(Math.acos(6.1 / 7.4));
  fidele(11);
  nomme(11, ["hyp", "adj"]);
  accord(11, "V dessiné", a11, angleDessin(11), 1);
  dit(11, `\\right) \\approx ${fr(a11, 1)}°$`);
  dit(11, `$6{,}1 \\div 7{,}4 = ${tr(6.1 / 7.4, 4)}\\ldots$`);
  dit(11, `$\\cos^{-1}(0{,}82) \\approx ${fr(deg(Math.acos(0.82)), 1)}°$`);
  v.ok("11. l'arrondi trop tôt change le dixième", fr(deg(Math.acos(0.82)), 1) !== fr(a11, 1));
  dit(11, `Réponse : $\\widehat{V} \\approx ${fr(a11, 1)}°$.`);

  const ca12 = Math.hypot(7, 2.4), a12 = deg(Math.acos(7 / ca12)), c12 = deg(Math.acos(2.4 / ca12));
  fidele(12);
  v.ok("12. deux triangles dessinés, le même", tri(12).length === 2 && tri(12)[0].brut.split("cotes")[0] === tri(12)[1].brut.split("cotes")[0]);
  nomme(12, ["hyp", "adj"], 0);
  dit(12, `l'adjacent devient $[${nomCote(tri(12)[1], roles(tri(12)[1], "C").adj)}]$`);
  v.ok("12. CA = 7,4 exactement (35-12-37)", 35 * 35 + 12 * 12 === 37 * 37 && Math.abs(ca12 - 7.4) < 1e-12);
  accord(12, "CA dessiné", ca12, mesure(12, "CA", "AB", 7), 2);
  accord(12, "A dessiné", a12, angleDessin(12, "A", 0), 1);
  accord(12, "C dessiné", c12, angleDessin(12, "C", 1), 1);
  dit(12, `$CA^2 = AB^2 + BC^2 = 49 + 5{,}76 = 54{,}76$, donc $CA = \\sqrt{54{,}76} = 7{,}4$ cm`);
  dit(12, `\\dfrac{7}{7{,}4}\\right) \\approx ${fr(a12, 1)}°$`);
  dit(12, `\\dfrac{2{,}4}{7{,}4}\\right) \\approx ${fr(c12, 1)}°$`);
  v.ok("12. les deux arrondis font 90°", arr(a12, 1) + arr(c12, 1) === 90);
  dit(12, `$${fr(a12, 1)}° + ${fr(c12, 1)}° = 90°$`);
  dit(12, `\\dfrac{7}{54{,}76} \\approx ${fr(7 / 54.76, 2)}$ et un angle de $${fr(deg(Math.acos(7 / 54.76)), 1)}°$`);
  dit(12, `Réponse : $CA = 7{,}4$ cm, $\\widehat{A} \\approx ${fr(a12, 1)}°$ et $\\widehat{C} \\approx ${fr(c12, 1)}°$.`);

  const v13 = 1200 * Math.cos(rad(22));
  fidele(13);
  dit(13, `l'hypoténuse est le câble $[${nomCote(tri(13)[0], "CA")}]$`);
  dit(13, `le côté adjacent est $[${nomCote(tri(13)[0], "AB")}]$`);
  accord(13, "DH dessiné", v13, mesure(13, "AB", "CA", 1200), 0);
  accord(13, "angle D dessiné", 22, angleDessin(13), 1);
  dit(13, `$DH = 1\\,200 \\times \\cos 22° \\approx ${fr(v13, 0)}$ m`);
  dit(13, `$1\\,200 - ${fr(v13, 0)} = ${1200 - arr(v13, 0)}$ m`);
  dit(13, `$1\\,200 \\div \\cos 22° \\approx ${fr(1200 / Math.cos(rad(22)), 0)}$ m`);
  dit(13, `Réponse : la distance horizontale est d'environ $${fr(v13, 0)}$ m, $${1200 - arr(v13, 0)}$ m de moins que le câble.`);

  const v14 = 1.7 * Math.cos(rad(30));
  fidele(14);
  dit(14, `L'hypoténuse est le panneau $[${nomCote(tri(14)[0], "CA")}]$`);
  dit(14, `le côté adjacent est $[${nomCote(tri(14)[0], "AB")}]$`);
  accord(14, "PS dessiné", v14, mesure(14, "AB", "CA", 1.7), 2);
  dit(14, `$PS = 1{,}7 \\times \\cos 30° \\approx ${fr(v14, 2)}$ m`);
  dit(14, `$6 \\div ${fr(v14, 2)} \\approx ${fr(6 / arr(v14, 2), 2)}$ : $${Math.floor(6 / v14)}$ rangées`);
  v.ok("14. le calcul exact donne aussi 4 rangées", Math.floor(6 / v14) === 4 && Math.floor(6 / arr(v14, 2)) === 4);
  dit(14, `$6 \\div 1{,}7 \\approx ${fr(6 / 1.7, 2)}$, et ne poser que $${Math.floor(6 / 1.7)}$ rangées`);
  dit(14, `on peut poser $${Math.floor(6 / v14)}$ rangées.`);

  const a15 = deg(Math.acos(3.9 / 4.5));
  fidele(15);
  dit(15, `L'hypoténuse est le toboggan $[${nomCote(tri(15)[0], "CA")}]$`);
  dit(15, `le côté adjacent est $[${nomCote(tri(15)[0], "AB")}]$`);
  accord(15, "B dessiné", a15, angleDessin(15), 1);
  accord(15, "le toboggan dessiné fait 4,5 m", 4.5, mesure(15, "CA", "AB", 3.9), 2);
  dit(15, `\\right) \\approx ${fr(a15, 1)}°$`);
  dit(15, `$90° - ${fr(a15, 1)}° = ${fr(90 - arr(a15, 1), 1)}°$`);
  dit(15, `environ $${fr(a15, 1)}°$ avec le sol.`);

  const a16 = deg(Math.acos(5.5 / 12.5));
  fidele(16);
  nomme(16, ["hyp"]);
  dit(16, `c'est le côté adjacent à $\\widehat{U}$`);
  v.ok(`16. [UV] est bien l'adjacent de U sur le dessin`, roles(tri(16)[0], "A").adj === "AB" && nomCote(tri(16)[0], "AB") === "UV");
  accord(16, "U dessiné", a16, angleDessin(16), 1);
  dit(16, `\\dfrac{5{,}5}{12{,}5} = ${fr(5.5 / 12.5, 2)}$`);
  dit(16, `$\\widehat{U} = \\cos^{-1}(0{,}44) \\approx ${fr(a16, 1)}°$`);
  dit(16, `$\\widehat{W} \\approx 90° - ${fr(a16, 1)}° = ${fr(90 - arr(a16, 1), 1)}°$`);
  accord(16, "W dessiné", 90 - a16, angleDessin(16, "C"), 1);
  dit(16, `$\\widehat{U} \\approx ${fr(a16, 1)}°$ et $\\widehat{W} \\approx ${fr(90 - arr(a16, 1), 1)}°$.`);

  v.titre("★★★ Problèmes");
  const gh17 = Math.sqrt(108 ** 2 - 36 ** 2), a17 = deg(Math.acos(gh17 / 108));
  fidele(17);
  dit(17, `La voie $[${nomCote(tri(17)[0], "CA")}]$ est l'hypoténuse`);
  dit(17, `le côté adjacent est $[${nomCote(tri(17)[0], "AB")}]$`);
  accord(17, "GH dessiné", gh17, mesure(17, "AB", "CA", 108), 1);
  accord(17, "G dessiné", a17, angleDessin(17), 1);
  accord(17, "G par un autre chemin : 90° − cos⁻¹(36/108)", a17, 90 - deg(Math.acos(36 / 108)), 1);
  dit(17, `$GH^2 = SG^2 - HS^2 = 11\\,664 - 1\\,296 = 10\\,368$, donc $GH = \\sqrt{10\\,368} \\approx ${fr(gh17, 1)}$ m`);
  v.ok("17. 108² = 11 664, 36² = 1 296", 108 ** 2 === 11664 && 36 ** 2 === 1296);
  dit(17, `\\dfrac{GH}{108}\\right) \\approx ${fr(a17, 1)}°$`);
  dit(17, `\\dfrac{36}{108}\\right) \\approx ${fr(deg(Math.acos(36 / 108)), 1)}°$`);
  dit(17, `$${fr(a17, 1)}° + ${fr(deg(Math.acos(36 / 108)), 1)}° = 90°$`);
  dit(17, `environ $${fr(gh17, 1)}$ m à l'horizontale et monte avec un angle d'environ $${fr(a17, 1)}°$.`);

  const vd18 = 6 / Math.cos(rad(45));
  fidele(18);
  dit(18, `L'hypoténuse est le bord $[${nomCote(tri(18)[0], "CA")}]$`);
  dit(18, `Le côté adjacent est $[${nomCote(tri(18)[0], "AB")}]$`);
  accord(18, "VD dessiné", vd18, mesure(18, "CA", "AB", 6), 2);
  dit(18, `$VD = \\dfrac{6}{\\cos 45°} \\approx ${fr(vd18, 2)}$ milles`);
  dit(18, `$2 \\times VD \\approx ${fr(2 * vd18, 2)}$ milles`);
  dit(18, `$${fr(2 * vd18, 2)} \\div 12 \\approx ${fr((2 * vd18) / 12, 2)}$`);
  dit(18, `soit $${Math.round(((2 * vd18) / 12 - 1) * 100)}$ % de plus`);
  dit(18, `$6 \\times \\cos 45° \\approx ${fr(6 * Math.cos(rad(45)), 2)}$ milles`);
  dit(18, `Réponse : chaque bord mesure environ $${fr(vd18, 2)}$ milles ; le voilier parcourt environ $${fr(2 * vd18, 2)}$ milles`);

  const r19 = 6371 * Math.cos(rad(49)), l19 = 2 * Math.PI * r19, eq19 = 2 * Math.PI * 6371;
  fidele(19);
  nomme(19, ["hyp", "adj"]);
  accord(19, "PH dessiné", r19, mesure(19, "AB", "CA", 6371), 0);
  accord(19, "P dessiné", 49, angleDessin(19), 1);
  dit(19, `$PH = 6\\,371 \\times \\cos 49° \\approx ${fr(r19, 0)}$ km`);
  dit(19, `$2 \\times \\pi \\times PH \\approx ${fr(l19, 0)}$ km`);
  dit(19, `$${fr(l19, 0)} \\div 24 \\approx ${fr(l19 / 24, 0)}$ km/h`);
  dit(19, `$2 \\times \\pi \\times 6\\,371 \\approx ${fr(eq19, 0)}$ km, soit environ $${fr(eq19 / 24, 0)}$ km/h`);
  dit(19, `$\\cos 49° \\approx ${fr(Math.cos(rad(49)), 2)}$`);
  dit(19, `Réponse : le cercle de Paris a un rayon d'environ $${fr(r19, 0)}$ km et une longueur d'environ $${fr(l19, 0)}$ km ; Paris tourne à environ $${fr(l19 / 24, 0)}$ km/h, contre $${fr(eq19 / 24, 0)}$ km/h à l'équateur.`);

  const a20 = deg(Math.acos(45 / 52)), fp20 = Math.sqrt(52 ** 2 - 45 ** 2), l20 = 45 / Math.cos(rad(15));
  fidele(20);
  dit(20, `l'hypoténuse est le trajet $[${nomCote(tri(20)[0], "CA")}]$`);
  dit(20, `Le côté adjacent est $[${nomCote(tri(20)[0], "AB")}]$`);
  accord(20, "D dessiné", a20, angleDessin(20), 1);
  accord(20, "FP dessiné", fp20, mesure(20, "BC", "CA", 52), 1);
  dit(20, `\\dfrac{45}{52}\\right) \\approx ${fr(a20, 1)}°$`);
  v.ok("20. 52² = 2 704, 45² = 2 025, écart 679", 52 ** 2 === 2704 && 45 ** 2 === 2025 && 2704 - 2025 === 679);
  dit(20, `$FP = \\sqrt{679} \\approx ${fr(fp20, 1)}$ m`);
  dit(20, `$\\dfrac{45}{\\cos 15°} \\approx ${fr(l20, 1)}$ m`);
  dit(20, `$52 - 45 = ${52 - 45}$ m`);
  dit(20, `Réponse : elle nage avec un angle d'environ $${fr(a20, 1)}°$ et arrive à environ $${fr(fp20, 1)}$ m du point visé ; par eau calme, elle nagerait environ $${fr(l20, 1)}$ m.`);

  v.titre("Les dessins");
  const dessines = f.blocs.filter((b) => /\bschema: /.test(b)).length;
  const triangles20 = f.blocs.filter((b) => /\btriangle\(/.test(b)).length;
  v.ok(`${dessines} corrigés dessinés sur 20 (${triangles20} triangles, 1 quart de cercle)`, dessines === 20 && triangles20 === 19);
}

lancer({
  nom: "LE COSINUS · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-cosinus.tsx",
  notionId: "trigo_cosinus",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : l'hypoténuse étiquetée comme l'adjacent", "cotes: { AB: \"adjacent à M\", CA: \"hypoténuse\" }", "cotes: { AB: \"hypoténuse\", CA: \"adjacent à M\" }"],
    ["ex. 1 : le segment nommé à l'envers (le bug AC / CA)", "donc le côté adjacent est $[MN]$", "donc le côté adjacent est $[NM]$"],
    ["ex. 2 : l'adjacent gardé en changeant d'angle", "Réponse : $\\\\cos \\\\widehat{R} \\\\approx 0{,}92$ et $\\\\cos \\\\widehat{T} \\\\approx 0{,}38$.", "Réponse : $\\\\cos \\\\widehat{R} \\\\approx 0{,}92$ et $\\\\cos \\\\widehat{T} \\\\approx 0{,}92$."],
    ["ex. 3 : le quotient renversé", "Réponse : $\\\\cos \\\\widehat{E} \\\\approx 0{,}88$.", "Réponse : $\\\\cos \\\\widehat{E} \\\\approx 1{,}13$."],
    ["ex. 4 : AC au lieu de CA (ici MK → KM)", "$\\\\cos \\\\widehat{K} = \\\\dfrac{KL}{MK}$", "$\\\\cos \\\\widehat{K} = \\\\dfrac{KL}{KM}$"],
    ["ex. 4 : l'angle de 41° mal dessiné", "C: [6.7103, 9.9485]", "C: [6.7103, 8.5]"],
    ["ex. 5 : multiplier au lieu de diviser", "Réponse : $FD \\\\approx 8{,}5$ cm.", "Réponse : $FD \\\\approx 6{,}6$ cm."],
    ["ex. 6 : l'autre angle", "Réponse : $\\\\widehat{A} \\\\approx 49{,}5°$.", "Réponse : $\\\\widehat{A} \\\\approx 40{,}5°$."],
    ["ex. 7 : la touche cos au lieu de cos⁻¹", "Réponse : $\\\\widehat{P} \\\\approx 53{,}1°$.", "Réponse : $\\\\widehat{P} \\\\approx 0{,}9999°$."],
    ["ex. 8 : une valeur fausse sous l'axe", "[50, \"0,64\"]", "[50, \"0,45\"]"],
    ["ex. 9 : 9,4 pris pour l'adjacent", "Réponse : $JK \\\\approx 7{,}9$ cm", "Réponse : $JK \\\\approx 11{,}2$ cm"],
    ["ex. 9 : le troisième côté dessiné trop long", "C: [5.5252, 7.6048]", "C: [5.2, 8.4]"],
    ["ex. 10 : le cosinus arrondi trop tôt", "Réponse : $GI \\\\approx 8{,}4$ cm.", "Réponse : $GI \\\\approx 9{,}2$ cm."],
    ["ex. 11 : le quotient arrondi trop tôt", "Réponse : $\\\\widehat{V} \\\\approx 34{,}5°$.", "Réponse : $\\\\widehat{V} \\\\approx 34{,}9°$."],
    ["ex. 12 : l'adjacent de C mal placé sur le dessin", "BC: \"adj. 2,4 cm\"", "BC: \"hyp. 2,4 cm\""],
    ["ex. 12 : la racine carrée oubliée", "Réponse : $CA = 7{,}4$ cm", "Réponse : $CA = 54{,}76$ cm"],
    ["ex. 13 : diviser au lieu de multiplier", "$DH = 1\\\\,200 \\\\times \\\\cos 22° \\\\approx 1\\\\,113$ m", "$DH = 1\\\\,200 \\\\times \\\\cos 22° \\\\approx 1\\\\,294$ m"],
    ["ex. 14 : la longueur du panneau prise pour son emprise", "on peut poser $4$ rangées.", "on peut poser $3$ rangées."],
    ["ex. 15 : l'angle avec la verticale", "environ $29{,}9°$ avec le sol.", "environ $60{,}1°$ avec le sol."],
    ["ex. 16 : l'angle droit marqué au mauvais sommet", "angles: { A: \"? ≈ 63,9°\" }, droit: \"B\"", "angles: { A: \"? ≈ 63,9°\" }, droit: \"C\""],
    ["ex. 17 : le dénivelé pris pour l'adjacent", "monte avec un angle d'environ $19{,}5°$.", "monte avec un angle d'environ $70{,}5°$."],
    ["ex. 17 : une étiquette qui sort du cadre", "BC: \"36 m\"", "BC: \"dénivelé 36 m\""],
    ["ex. 18 : multiplier par réflexe", "$VD = \\\\dfrac{6}{\\\\cos 45°} \\\\approx 8{,}49$ milles", "$VD = \\\\dfrac{6}{\\\\cos 45°} \\\\approx 4{,}24$ milles"],
    ["ex. 19 : le rayon de la Terre gardé pour Paris", "Paris tourne à environ $1\\\\,094$ km/h", "Paris tourne à environ $1\\\\,668$ km/h"],
    ["ex. 19 : Paris dessiné à la mauvaise latitude", "A: [4179.7521, 4808.2547], B: [0, 4808.2547]", "A: [4808.2547, 4179.7521], B: [0, 4179.7521]"],
    ["ex. 20 : la dérive par une soustraction", "$FP = \\\\sqrt{679} \\\\approx 26{,}1$ m", "$FP = \\\\sqrt{679} \\\\approx 7$ m"],
    ["le sinus qui s'invite en 4e", "L'hypoténuse est le plus long côté d'un triangle rectangle.", "L'hypoténuse est le plus long côté d'un triangle rectangle, comme le dit le sinus."],
    ["un $ dans un dessin", "CA: \"hyp. 8 cm\" }, angles: { A: \"? ≈ 49,5°\" }", "CA: \"$CA = 8$ cm\" }, angles: { A: \"? ≈ 49,5°\" }"],
    ["une micro d'une autre notion", "micros: [\"cos_calculer_longueur\"],\n        },\n        {\n          enonce: \"Le triangle $DEF$", "micros: [\"pythagore_reconnaitre\"],\n        },\n        {\n          enonce: \"Le triangle $DEF$"],
  ],
});
