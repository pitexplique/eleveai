// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Le théorème de
// Pythagore et sa réciproque » de 3e (lib/fiches-exercices/maths-3e-pythagore.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé ANNONCE « $AC = \sqrt{289} = 17$ » ; ici les
// carrés sont refaits en ENTIERS (les longueurs en centièmes), la racine est
// CHERCHÉE par dichotomie (jamais Math.sqrt), et l'arrondi est lu dans la
// phrase. Pour la réciproque, le plus grand côté est retrouvé par tri, le
// sommet de l'angle droit par les lettres, et la conclusion (réciproque ou
// contraposée) doit être celle que dit le calcul.
//
// ⭐ LES DESSINS : chaque `triangle(…)` est relu dans le source. L'angle droit
// est-il au sommet marqué ? Un triangle NON rectangle a-t-il bien tous ses
// angles loin de 90° ? Les côtés chiffrés (« 8 cm », « ? = 17 cm »,
// « ? ≈ 10,3 cm ») sont-ils à l'échelle ? L'étiquette « hypoténuse » est-elle
// en face de l'angle droit ? La hauteur a-t-elle la longueur écrite ?
//
//   node scripts/verifier-exercices-pythagore-3e.mjs

import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/* ── Calcul ─────────────────────────────────────────────────────────────── */

/** Le carré d'une longueur à deux décimales au plus, fait en entiers. */
const carre = (x) => {
  const c = Math.round(x * 100);
  if (Math.abs(c - x * 100) > 1e-6) throw new Error(`plus de deux décimales : ${x}`);
  return (c * c) / 10000;
};
/** √y par dichotomie (60 tours : précision bien meilleure que 1e-9). */
const racine = (y) => {
  let a = 0, b = Math.max(1, y);
  for (let i = 0; i < 80; i++) {
    const m = (a + b) / 2;
    if (m * m > y) b = m;
    else a = m;
  }
  return (a + b) / 2;
};
/** La racine ENTIÈRE ou décimale exacte (deux décimales) si elle existe, par recherche. */
const racineExacte = (y) => {
  for (let k = 0; k * k <= y * 10000 + 1e-6; k++) if (Math.abs(k * k - y * 10000) < 1e-6) return k / 100;
  return null;
};
const arr = (x, n) => Math.round(x * 10 ** n) / 10 ** n;
const proche = (x, y, eps = 1e-9) => Math.abs(x - y) < eps;
/** Écrit comme dans la feuille : 1\,681, 28{,}09. */
function fr(x, d = null) {
  const s = d === null ? String(+x.toFixed(6)) : x.toFixed(d);
  const [e, f] = s.split(".");
  const groupe = e.length >= 4 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : e;
  return f ? `${groupe}{,}${f}` : groupe;
}
/** Tronqué (et non arrondi) à n décimales : « 9{,}746\ldots ». */
const tronque = (x, n) => Math.floor(x * 10 ** n) / 10 ** n;

/** Angle en degrés, au sommet S, entre S→P et S→Q. */
const long = (P, Q) => Math.hypot(Q[0] - P[0], Q[1] - P[1]);
const angle = (S, P, Q) => (Math.acos(((P[0] - S[0]) * (Q[0] - S[0]) + (P[1] - S[1]) * (Q[1] - S[1])) / (long(S, P) * long(S, Q))) * 180) / Math.PI;
const autres = { A: ["B", "C"], B: ["A", "C"], C: ["A", "B"] };
const oppose = { A: "BC", B: "CA", C: "AB" };

/** L'hypoténuse d'un triangle nommé (« RST ») rectangle en un sommet : les deux autres lettres, dans l'ordre. */
const hypotenuse = (nom, droit) => [...nom].filter((l) => l !== droit).join("");

/** La réciproque, par l'autre chemin : on trie, on compare en entiers. */
function reciproque(cotes) {
  const liste = Object.entries(cotes).sort((a, b) => b[1] - a[1]);
  const [[grand, g], [, p1], [, p2]] = liste;
  const gauche = carre(g);
  const droite = carre(p1) + carre(p2);
  return { grand, gauche, droite, rectangle: proche(gauche, droite, 1e-9) };
}
/** Le sommet opposé à un côté « LN » dans le triangle « LMN ». */
const sommetOppose = (nom, cote) => [...nom].find((l) => !cote.includes(l));

/* ── Les triangles dessinés, relus dans le source ──────────────────────── */

function triangles(bloc) {
  return [...bloc.matchAll(/triangle\(\{ A: \[([-\d.]+), ([-\d.]+)\], B: \[([-\d.]+), ([-\d.]+)\], C: \[([-\d.]+), ([-\d.]+)\] \}, \{([^\n]*)\}\)/g)].map((m) => {
    const [ax, ay, bx, by, cx, cy] = m.slice(1, 7).map(Number);
    const o = m[7];
    const cotes = Object.fromEntries([...(o.match(/cotes: \{([^}]*)\}/)?.[1] ?? "").matchAll(/(AB|BC|CA): "([^"]*)"/g)].map((x) => [x[1], x[2]]));
    const droit = o.match(/droit: "([ABC])"/)?.[1];
    const h = o.match(/hauteur: \{ depuis: "([ABC])", label: "([^"]*)" \}/);
    return { P: { A: [ax, ay], B: [bx, by], C: [cx, cy] }, cotes, droit, hauteur: h ? { depuis: h[1], label: h[2] } : null, brut: m[0] };
  });
}
/** Le nombre d'une étiquette : « 8 cm » → 8, « ? = 17 cm » → 17, « ? ≈ 10,3 cm » → 10,3 ; sinon null. */
function nombreDe(t) {
  const apres = t.split(/[=≈]/).at(-1);
  const m = apres.match(/(\d+(?:,\d+)?)/);
  return m ? Number(m[1].replace(",", ".")) : null;
}

function verifier(source, v) {
  const { corrections, blocs } = lireFeuille(source);
  const c = (k) => corrections[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");

  /** Tous les triangles de l'exercice k sont fidèles à leurs étiquettes. */
  const fidele = (k, { inconnue = false } = {}) => {
    const ts = triangles(blocs[k - 1] ?? "");
    v.ok(`${k}. le corrigé a son triangle dessiné`, ts.length > 0);
    for (const t of ts) {
      const { P, cotes, droit } = t;
      const angs = { A: angle(P.A, P.B, P.C), B: angle(P.B, P.A, P.C), C: angle(P.C, P.A, P.B) };
      if (droit) v.ok(`${k}. l'angle droit est bien en ${droit} (${angs[droit].toFixed(3)}°)`, Math.abs(angs[droit] - 90) < 0.05);
      else v.ok(`${k}. triangle sans angle droit marqué : aucun angle n'est droit`, Object.values(angs).every((a) => Math.abs(a - 90) > 0.2), JSON.stringify(angs));
      const L = { AB: long(P.A, P.B), BC: long(P.B, P.C), CA: long(P.C, P.A) };
      const chiffres = Object.entries(cotes).map(([s, e]) => [s, nombreDe(e)]).filter(([, n]) => n !== null);
      const ratios = chiffres.map(([s, n]) => L[s] / n);
      if (t.hauteur) {
        const S = P[t.hauteur.depuis];
        const [Q, R] = autres[t.hauteur.depuis].map((l) => P[l]);
        const d = Math.abs((R[0] - Q[0]) * (Q[1] - S[1]) - (Q[0] - S[0]) * (R[1] - Q[1])) / long(Q, R);
        const n = nombreDe(t.hauteur.label);
        if (n !== null) ratios.push(d / n);
      }
      if (ratios.length >= 2) v.ok(`${k}. les ${ratios.length} longueurs chiffrées sont dessinées à l'échelle`, ratios.every((r) => Math.abs(r / ratios[0] - 1) < 0.006), JSON.stringify(ratios));
      for (const [s, e] of Object.entries(cotes)) {
        if (/hypot/.test(e)) v.ok(`${k}. « hypoténuse » est écrit en face de l'angle droit`, !!droit && oppose[droit] === s, `${s}, angle droit en ${droit}`);
      }
      if (droit) {
        const hyp = oppose[droit];
        v.ok(`${k}. l'hypoténuse dessinée est le plus long côté`, Object.entries(L).every(([s, l]) => s === hyp || l < L[hyp]));
      }
      v.ok(`${k}. pas de $ ni de \\ dans le dessin`, !/[$\\]/.test(t.brut));
    }
    if (inconnue) v.ok(`${k}. le côté cherché est marqué « ? » avec sa valeur`, ts.some((t) => Object.values(t.cotes).some((e) => /^\? [=≈] \d/.test(e))));
    return ts;
  };
  /** La valeur écrite après « ? » dans le dessin de k est bien x (à l'arrondi écrit). */
  const inconnueVaut = (k, x) => {
    const e = triangles(blocs[k - 1] ?? "").flatMap((t) => Object.values(t.cotes)).find((s) => s.startsWith("?"));
    const n = e ? nombreDe(e) : null;
    const dec = e?.match(/,(\d+)/)?.[1].length ?? 0;
    v.ok(`${k}. le « ? » du dessin vaut ${fr(arr(x, dec), dec)}`, n !== null && proche(n, arr(x, dec), 1e-9) && (e.includes("≈") === !proche(x, arr(x, dec), 1e-9)), e);
  };
  /** Une conclusion de réciproque ou de contraposée, cohérente avec le calcul. */
  const conclut = (k, nom, cotes, { phrase = true } = {}) => {
    const r = reciproque(cotes);
    const signe = r.rectangle ? "=" : "\\neq";
    v.ok(`${k}. ${r.grand}² = ${r.gauche}, somme des deux autres = ${r.droite} : ${r.rectangle ? "rectangle" : "pas rectangle"}`, true);
    dit(k, `= ${fr(r.gauche)}$`);
    dit(k, `= ${fr(r.droite)}$`);
    if (r.rectangle) {
      const s = sommetOppose(nom, r.grand);
      if (phrase) dit(k, `après la réciproque du théorème de Pythagore, le triangle $${nom}$ est rectangle en $${s}$`);
      v.ok(`${k}. aucune conclusion « n'est pas rectangle »`, !c(k).includes(`$${nom}$ n'est pas rectangle`));
      return s;
    }
    if (phrase) dit(k, `après la contraposée du théorème de Pythagore, le triangle $${nom}$ n'est pas rectangle`);
    v.ok(`${k}. le « ≠ » est écrit`, c(k).includes(signe));
    v.ok(`${k}. aucune conclusion « est rectangle »`, !new RegExp(`\\$${nom}\\$ est rectangle`).test(c(k)));
    return null;
  };

  v.titre("★ Un seul geste");
  for (const [nom, d] of [["RST", "S"], ["KLM", "K"], ["UVW", "W"]]) dit(1, `l'hypoténuse est $[${hypotenuse(nom, d)}]$`);
  dit(1, "Réponse : $[RT]$ ; $[LM]$ ; $[UV]$");
  const t1 = fidele(1)[0];
  v.ok("1. le dessin est RST rectangle en S, l'hypoténuse [RT] penchée", !!t1 && t1.brut.includes('noms: { A: "R", B: "S", C: "T" }') && t1.P.A[1] !== t1.P.C[1] && t1.P.A[0] !== t1.P.C[0]);

  const h2 = hypotenuse("ABC", "A");
  const egalite2 = `$${h2}^2 = AB^2 + AC^2$`;
  v.ok(`2. l'hypoténuse de ABC rectangle en A est [${h2}]`, h2 === "BC");
  dit(2, `l'hypoténuse SEULE d'un côté du signe égal : ${egalite2}`);
  dit(2, `Réponse : l'hypoténuse est $[${h2}]$, et ${egalite2}`);
  v.ok("2. l'égalité de l'élève isole AB, qui n'est pas l'hypoténuse", hypotenuse("ABC", "C") === "AB" && h2 !== "AB");
  fidele(2);

  const s3 = carre(8) + carre(15);
  const r3 = racineExacte(s3);
  v.ok(`3. 8² + 15² = ${s3}, racine exacte ${r3}`, r3 === 17 && proche(racine(s3), 17, 1e-9));
  dit(3, `$AC^2 = 8^2 + 15^2 = ${carre(8)} + ${carre(15)} = ${s3}$`);
  dit(3, `$AC = \\sqrt{${s3}} = ${r3}$ cm`);
  dit(3, `$8 + 15 = ${8 + 15}$ cm`);
  dit(3, `Réponse : $AC = ${r3}$ cm.`);
  fidele(3, { inconnue: true });
  inconnueVaut(3, r3);

  const s4 = carre(41) - carre(9);
  const r4 = racineExacte(s4);
  v.ok(`4. 41² − 9² = ${s4}, racine ${r4}, plus courte que 41`, r4 === 40 && r4 < 41);
  dit(4, `$EF^2 = 41^2 - 9^2 = ${fr(carre(41))} - ${carre(9)} = ${fr(s4)}$`);
  dit(4, `$EF = \\sqrt{${fr(s4)}} = ${r4}$ cm`);
  dit(4, `$41^2 + 9^2 = ${fr(carre(41) + carre(9))}$ donnerait $EF \\approx ${Math.round(racine(carre(41) + carre(9)))}$ cm`);
  v.ok("4. le piège donne un côté plus long que l'hypoténuse", racine(carre(41) + carre(9)) > 41);
  dit(4, `Réponse : $EF = ${r4}$ cm.`);
  fidele(4, { inconnue: true });
  inconnueVaut(4, r4);

  const s5 = carre(5) + carre(9);
  const r5 = racine(s5);
  v.ok(`5. 5² + 9² = ${s5}, pas un carré parfait, entre 10 et 11`, racineExacte(s5) === null && 10 < r5 && r5 < 11);
  dit(5, `$LM^2 = KL^2 + KM^2 = 5^2 + 9^2 = ${carre(5)} + ${carre(9)} = ${s5}$`);
  dit(5, `$\\sqrt{${s5}} \\approx ${fr(arr(r5, 3), 3)}$`);
  dit(5, `Réponse : $LM = \\sqrt{${s5}} \\approx ${fr(arr(r5, 1), 1)}$ cm.`);
  fidele(5, { inconnue: true });
  inconnueVaut(5, r5);

  const s6 = carre(12) - carre(7);
  const r6 = racine(s6);
  v.ok(`6. 12² − 7² = ${s6}, √${s6} ≈ ${r6.toFixed(4)}`, s6 === 95 && 9 < r6 && r6 < 10);
  dit(6, `$VW^2 = UW^2 - UV^2 = 12^2 - 7^2 = ${carre(12)} - ${carre(7)} = ${s6}$`);
  dit(6, `$${fr(tronque(r6, 3), 3)}\\ldots$`);
  dit(6, `Réponse : $VW = \\sqrt{${s6}} \\approx ${fr(arr(r6, 1), 1)}$ cm.`);
  dit(6, `$12 - 7 = ${12 - 7}$ cm`);
  fidele(6, { inconnue: true });
  inconnueVaut(6, r6);

  const s7 = conclut(7, "LMN", { LM: 20, MN: 21, LN: 29 });
  dit(7, `Réponse : $LMN$ est rectangle en $${s7}$.`);
  fidele(7);

  conclut(8, "ABC", { AB: 11, BC: 9, CA: 6 }, { phrase: false });
  dit(8, "D'après la contraposée du théorème de Pythagore, $ABC$ n'est pas rectangle.");
  dit(8, "$121 \\neq 117$");
  const cosC8 = (carre(9) + carre(6) - carre(11)) / (2 * 9 * 6);
  const angC8 = (Math.acos(cosC8) * 180) / Math.PI;
  dit(8, `environ $${Math.round(angC8)}°$`);
  dit(8, "Réponse : $ABC$ n'est pas rectangle.");
  fidele(8);

  v.titre("★★ Type devoir");
  const s9 = carre(2.8) + carre(4.5);
  const r9 = racineExacte(s9);
  v.ok(`9. 2,8² + 4,5² = ${s9}, racine exacte ${r9}`, r9 === 5.3);
  dit(9, "Dans le triangle $RST$ rectangle en $S$, l'hypoténuse est $[RT]$.");
  dit(9, "D'après le théorème de Pythagore, $RT^2 = RS^2 + ST^2$.");
  dit(9, `$RT^2 = 2{,}8^2 + 4{,}5^2 = ${fr(carre(2.8))} + ${fr(carre(4.5))} = ${fr(s9)}$`);
  dit(9, `$RT = \\sqrt{${fr(s9)}} = ${fr(r9)}$ cm`);
  dit(9, `$2{,}8 \\times 2{,}8 = ${fr(carre(2.8))}$`);
  fidele(9, { inconnue: true });
  inconnueVaut(9, r9);

  const s10 = carre(6.5) - carre(3.3);
  const r10 = racineExacte(s10);
  v.ok(`10. 6,5² − 3,3² = ${s10}, racine exacte ${r10}`, r10 === 5.6);
  dit(10, "Dans le triangle $IJK$ rectangle en $I$, l'hypoténuse est $[JK]$.");
  dit(10, "D'après le théorème de Pythagore, $JK^2 = IJ^2 + IK^2$.");
  dit(10, `$IK^2 = JK^2 - IJ^2 = 6{,}5^2 - 3{,}3^2 = ${fr(carre(6.5))} - ${fr(carre(3.3))} = ${fr(s10)}$`);
  dit(10, `Réponse : $IK = ${fr(r10)}$ cm.`);
  fidele(10, { inconnue: true });
  inconnueVaut(10, r10);

  const s11 = conclut(11, "PQR", { PQ: 1.2, QR: 3.5, PR: 3.7 });
  dit(11, `Réponse : $PQR$ est rectangle en $${s11}$.`);
  dit(11, "D'une part, $PR^2");
  fidele(11);

  conclut(12, "EFG", { EF: 8, FG: 9, EG: 12 });
  const angF12 = (Math.acos((carre(8) + carre(9) - carre(12)) / (2 * 8 * 9)) * 180) / Math.PI;
  v.ok(`12. l'angle en F mesure ${angF12.toFixed(3)}°, pas 90°`, Math.abs(angF12 - 90) > 0.1);
  dit(12, `environ $${fr(arr(angF12, 1), 1)}°$`);
  dit(12, "Réponse : $EFG$ n'est pas rectangle.");
  fidele(12);

  const s13 = conclut(13, "XYZ", { XY: 11, YZ: 60, XZ: 61 });
  dit(13, `Réponse : $XYZ$ est rectangle en $${s13}$, d'après la réciproque.`);
  fidele(13);

  const bh = racineExacte(carre(25) - carre(24));
  const hc = racineExacte(carre(26) - carre(24));
  v.ok(`14. BH = ${bh}, HC = ${hc}, BC = ${bh + hc}`, bh === 7 && hc === 10);
  dit(14, `$BH^2 = 25^2 - 24^2 = ${carre(25)} - ${carre(24)} = ${bh * bh}$ et $BH = \\sqrt{${bh * bh}} = ${bh}$ cm`);
  dit(14, `$HC^2 = 26^2 - 24^2 = ${carre(26)} - ${carre(24)} = ${hc * hc}$ et $HC = \\sqrt{${hc * hc}} = ${hc}$ cm`);
  dit(14, `$BC = BH + HC = ${bh} + ${hc} = ${bh + hc}$ cm`);
  v.ok("14. BC est plus court que AB et AC : pas rectangle en A", bh + hc < 25 && bh + hc < 26);
  dit(14, `Réponse : $BH = ${bh}$ cm, $HC = ${hc}$ cm, $BC = ${bh + hc}$ cm, et $ABC$ n'est pas rectangle en $A$.`);
  const [t14] = fidele(14, { inconnue: true });
  inconnueVaut(14, bh + hc);
  v.ok("14. le pied de la hauteur coupe [BC] en 7 et 10", !!t14 && proche(t14.P.A[0] - t14.P.B[0], bh) && proche(t14.P.C[0] - t14.P.A[0], hc) && t14.P.B[1] === t14.P.C[1]);

  const s15 = carre(18) + carre(25);
  const r15 = racine(s15);
  v.ok(`15. 18² + 25² = ${s15}, entre 30 et 31`, 30 * 30 < s15 && s15 < 31 * 31);
  dit(15, `$PI^2 = PB^2 + BI^2 = 18^2 + 25^2 = ${carre(18)} + ${carre(25)} = ${s15}$`);
  dit(15, `$PI = \\sqrt{${s15}} \\approx ${fr(arr(r15, 1), 1)}$ milles`);
  const m15 = r15 * 1852;
  const km15 = arr(m15 / 1000, 1);
  const kmTrop = arr((arr(r15, 1) * 1852) / 1000, 1);
  v.ok(`15. ${m15.toFixed(1)} m → ${km15} km ; l'arrondi converti donne ${kmTrop} km`, km15 !== kmTrop);
  dit(15, `\\approx ${fr(Math.round(m15))}$ m, soit environ $${fr(km15, 1)}$ km`);
  dit(15, `$30{,}8 \\times 1\\,852 = ${fr(arr(30.8 * 1852, 1), 1)}$ m, soit $${fr(kmTrop, 1)}$ km`);
  dit(15, `Réponse : l'île est à environ $${fr(arr(r15, 1), 1)}$ milles du port, soit $${fr(km15, 1)}$ km.`);
  fidele(15, { inconnue: true });
  inconnueVaut(15, r15);

  const verdicts16 = [[16, 30, 34], [10, 11, 15], [0.9, 4, 4.1]].map(([a, b, cc]) => reciproque({ a, b, cc }));
  v.ok("16. rectangle, pas rectangle, rectangle", verdicts16.map((r) => r.rectangle).join() === "true,false,true");
  dit(16, `$34^2 = ${fr(verdicts16[0].gauche)}$ et $16^2 + 30^2 = ${carre(16)} + ${carre(30)} = ${fr(verdicts16[0].droite)}$`);
  dit(16, `$15^2 = ${verdicts16[1].gauche}$ et $10^2 + 11^2 = ${carre(10)} + ${carre(11)} = ${verdicts16[1].droite}$. $${verdicts16[1].gauche} \\neq ${verdicts16[1].droite}$`);
  dit(16, `$4{,}1^2 = ${fr(verdicts16[2].gauche)}$ et $0{,}9^2 + 4^2 = ${fr(carre(0.9))} + ${carre(4)} = ${fr(verdicts16[2].droite)}$`);
  v.ok("16. 16-30-34 est 8-15-17 multiplié par 2", 16 / 8 === 2 && 30 / 15 === 2 && 34 / 17 === 2);
  dit(16, "Réponse : les triangles a) et c) sont rectangles, le b) ne l'est pas.");
  v.ok("16. deux triangles dessinés", triangles(blocs[15] ?? "").length === 2);
  fidele(16);

  v.titre("★★★ Problèmes");
  const pied = 6 / 4;
  const h17 = carre(6) - carre(pied);
  const r17 = racine(h17);
  v.ok(`17. pied à ${pied} m, h² = ${h17}, h ≈ ${r17.toFixed(4)} < 6`, pied === 1.5 && r17 < 6);
  dit(17, `$6 \\div 4 = ${fr(pied)}$ m`);
  dit(17, `$h^2 = ${carre(6)} - ${fr(carre(pied))} = ${fr(h17)}$`);
  dit(17, `$h = \\sqrt{${fr(h17)}} \\approx ${fr(arr(r17, 2), 2)}$ m`);
  dit(17, `$6^2 + 1{,}5^2 = ${fr(carre(6) + carre(pied))}$, et trouver $h \\approx ${fr(arr(racine(carre(6) + carre(pied)), 2), 2)}$ m`);
  dit(17, `touche le mur à environ $${fr(arr(r17, 2), 2)}$ m`);
  fidele(17, { inconnue: true });
  inconnueVaut(17, r17);

  const s18 = carre(45) + carre(200);
  const r18 = racineExacte(s18);
  v.ok(`18. 45² + 200² = ${s18}, racine exacte ${r18}`, r18 === 205);
  dit(18, `$c^2 = 45^2 + 200^2 = ${fr(carre(45))} + ${fr(carre(200))} = ${fr(s18)}$`);
  dit(18, `$c = \\sqrt{${fr(s18)}} = ${r18}$ m`);
  const s18b = carre(250) - carre(45);
  dit(18, `$d^2 = 250^2 - 45^2 = ${fr(carre(250))} - ${fr(carre(45))} = ${fr(s18b)}$`);
  dit(18, `$d = \\sqrt{${fr(s18b)}} \\approx ${Math.round(racine(s18b))}$ m`);
  v.ok("18. la ligne droite est plus courte que 200 + 45", r18 < 245);
  dit(18, `Réponse : le câble mesure $${r18}$ m ; sur l'autre site, on parcourt environ $${Math.round(racine(s18b))}$ m`);
  fidele(18, { inconnue: true });
  inconnueVaut(18, r18);

  const horiz = (50 / 5) * 100;
  v.ok(`19. horizontale ${horiz} cm = ${horiz / 100} m`, horiz === 1000);
  dit(19, `soit $${fr(horiz)}$ cm, c'est-à-dire $${horiz / 100}$ m`);
  const s19 = carre(10) + carre(0.5);
  const r19 = racine(s19);
  dit(19, `$r^2 = 10^2 + 0{,}5^2 = ${carre(10)} + ${fr(carre(0.5))} = ${fr(s19)}$`);
  dit(19, `$r = \\sqrt{${fr(s19)}} \\approx ${fr(arr(r19, 2), 2)}$ m`);
  v.ok(`19. la rampe dépasse l'horizontale d'environ ${Math.round((r19 - 10) * 100)} cm`, Math.round((r19 - 10) * 100) === 1);
  dit(19, "environ $1$ cm de plus");
  fidele(19, { inconnue: true });
  inconnueVaut(19, r19);

  conclut(20, "ABC", { AB: 105, BC: 68, AC: 126 });
  const s20 = carre(105) + carre(68);
  dit(20, `$AC^2 = ${fr(s20)}$, et $AC = \\sqrt{${fr(s20)}} \\approx ${fr(arr(racine(s20), 1), 1)}$ m`);
  dit(20, `devrait mesurer environ $${fr(arr(racine(s20), 1), 1)}$ m`);
  const t20 = fidele(20, { inconnue: true });
  v.ok("20. deux triangles : le coin mesuré, le coin droit", t20.length === 2 && !t20[0].droit && t20[1].droit === "B");
  const angB20 = t20[0] ? angle(t20[0].P.B, t20[0].P.A, t20[0].P.C) : 0;
  const angCalc20 = (Math.acos((carre(105) + carre(68) - carre(126)) / (2 * 105 * 68)) * 180) / Math.PI;
  v.ok(`20. le coin mesuré est dessiné à ${angB20.toFixed(2)}°, comme le calcul (${angCalc20.toFixed(2)}°), à un degré de l'angle droit`, proche(angB20, angCalc20, 0.01) && Math.round(angCalc20 - 90) === 1);
  inconnueVaut(20, racine(s20));

  v.titre("Les dessins");
  const dessines = blocs.filter((b) => /\btriangle\(/.test(b)).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20);
}

lancer({
  nom: "LE THÉORÈME DE PYTHAGORE · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-pythagore.tsx",
  notionId: "pythagore_theoreme",
  classe: "3e",
  verifier,
  casses: [
    ["ex. 1 : l'hypoténuse mal nommée", "b) L'angle droit est en $K$ : l'hypoténuse est $[LM]$.", "b) L'angle droit est en $K$ : l'hypoténuse est $[KL]$."],
    ["ex. 1 : l'angle droit dessiné ailleurs", "cotes: { CA: \"hypoténuse\" }, droit: \"B\"", "cotes: { CA: \"hypoténuse\" }, droit: \"A\""],
    ["ex. 2 : l'égalité récitée par habitude", "signe égal : $BC^2 = AB^2 + AC^2$", "signe égal : $AB^2 = AC^2 + BC^2$"],
    ["ex. 2 : « hypoténuse » écrit sur un côté de l'angle droit", "cotes: { BC: \"hypoténuse\" }, droit: \"A\"", "cotes: { AB: \"hypoténuse\" }, droit: \"A\""],
    ["ex. 3 : les longueurs additionnées", "$AC = \\\\sqrt{289} = 17$ cm", "$AC = \\\\sqrt{289} = 23$ cm"],
    ["ex. 3 : le triangle pas à l'échelle", "C: [15, 0] }, { cotes: { AB: \"8 cm\"", "C: [12, 0] }, { cotes: { AB: \"8 cm\""],
    ["ex. 4 : l'hypoténuse prise pour un côté", "$EF = \\\\sqrt{1\\\\,600} = 40$ cm", "$EF = \\\\sqrt{1\\\\,762} \\\\approx 42$ cm"],
    ["ex. 5 : la racine oubliée", "Réponse : $LM = \\\\sqrt{106} \\\\approx 10{,}3$ cm.", "Réponse : $LM = 106$ cm."],
    ["ex. 6 : les longueurs soustraites", "Réponse : $VW = \\\\sqrt{95} \\\\approx 9{,}7$ cm.", "Réponse : $VW = 5$ cm."],
    ["ex. 7 : l'angle droit au mauvais sommet", "Réponse : $LMN$ est rectangle en $M$.", "Réponse : $LMN$ est rectangle en $N$."],
    ["ex. 8 : « presque égal » pris pour égal", "Réponse : $ABC$ n'est pas rectangle.", "Réponse : $ABC$ est rectangle en $C$."],
    ["ex. 8 : le triangle dessiné faux", "C: [3.4545, 4.9057]", "C: [3.4545, 5.5]"],
    ["ex. 9 : 2,8² = 5,6", "7{,}84 + 20{,}25 = 28{,}09", "5{,}6 + 20{,}25 = 25{,}85"],
    ["ex. 11 : le théorème au lieu de la réciproque", "D'après la réciproque du théorème de Pythagore, le triangle $PQR$", "D'après le théorème de Pythagore, le triangle $PQR$"],
    ["ex. 12 : 144 et 145 déclarés égaux", "Réponse : $EFG$ n'est pas rectangle.", "Réponse : $EFG$ est rectangle en $F$."],
    ["ex. 12 : l'angle droit marqué sur un angle de 89,6°", "cotes: { AB: \"8 cm\", BC: \"9 cm\", CA: \"12 cm\" } })", "cotes: { AB: \"8 cm\", BC: \"9 cm\", CA: \"12 cm\" }, droit: \"B\" })"],
    ["ex. 14 : un morceau de [BC] faux", "$BC = BH + HC = 7 + 10 = 17$ cm", "$BC = BH + HC = 7 + 12 = 19$ cm"],
    ["ex. 14 : la hauteur dessinée trop courte", "{ A: [7, 24], B: [0, 0], C: [17, 0] }", "{ A: [7, 20], B: [0, 0], C: [17, 0] }"],
    ["ex. 15 : l'arrondi converti", "soit environ $57{,}1$ km.", "soit environ $57{,}0$ km."],
    ["ex. 16 : le b) déclaré rectangle", "les triangles a) et c) sont rectangles, le b) ne l'est pas.", "les trois triangles sont rectangles."],
    ["ex. 17 : l'échelle prise pour un côté de l'angle droit", "$h = \\\\sqrt{33{,}75} \\\\approx 5{,}81$ m.", "$h = \\\\sqrt{38{,}25} \\\\approx 6{,}18$ m."],
    ["ex. 17 : l'échelle dessinée trop haut", "C: [1.5, 5.8095]", "C: [1.5, 6.5]"],
    ["ex. 18 : le câble = 200 + 45", "$c = \\\\sqrt{42\\\\,025} = 205$ m.", "$c = \\\\sqrt{42\\\\,025} = 245$ m."],
    ["ex. 19 : les unités mêlées", "$r^2 = 10^2 + 0{,}5^2 = 100 + 0{,}25 = 100{,}25$", "$r^2 = 10^2 + 50^2 = 100 + 2\\\\,500 = 2\\\\,600$"],
    ["ex. 20 : le théorème pour conclure « droit »", "D'après la contraposée du théorème de Pythagore, le triangle $ABC$ n'est pas rectangle : le coin", "D'après le théorème de Pythagore, le triangle $ABC$ est rectangle : le coin"],
    ["ex. 20 : le coin mesuré marqué droit", "CA: \"126 m\" } })", "CA: \"126 m\" }, droit: \"B\" })"],
    ["un $ dans un dessin", "CA: \"? = 17 cm\"", "CA: \"$AC = 17$ cm\""],
    ["une micro d'une autre notion", "micros: [\"pythagore_calculer_cote\"],\n        },\n        {\n          enonce: \"Le triangle $KLM$", "micros: [\"thales_calculer\"],\n        },\n        {\n          enonce: \"Le triangle $KLM$"],
  ],
});
