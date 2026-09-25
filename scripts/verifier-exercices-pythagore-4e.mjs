// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Le théorème de
// Pythagore et sa réciproque » de 4e (lib/fiches-exercices/maths-4e-pythagore.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé ANNONCE « $FD = \sqrt{2\,809} = 53$ » ; ici les
// carrés sont refaits en ENTIERS (les longueurs en centièmes), la racine est
// CHERCHÉE par dichotomie (jamais Math.sqrt), et l'arrondi est lu dans la
// phrase. Pour la réciproque, le plus grand côté est retrouvé par tri, le
// sommet de l'angle droit par les lettres, et la conclusion doit être celle que
// dit le calcul.
//
// ⭐ LES DESSINS : chaque `triangle(…)` est relu dans le source. L'angle droit
// est-il au sommet marqué ? Un triangle NON rectangle a-t-il bien tous ses
// angles loin de 90° ? Les côtés chiffrés (« 28 cm », « ? = 53 cm »,
// « ? ≈ 9,2 cm ») et la hauteur sont-ils à l'échelle ? L'étiquette
// « hypoténuse » est-elle en face de l'angle droit ? ⭐ ET LES NOMS : un côté
// dessiné se nomme dans l'ORDRE DES CLÉS (clé CA, noms D…F → « FD ») ; la
// longueur écrite sur le dessin doit être celle que l'énoncé donne à CE
// segment. Le tableau des carrés de l'exercice 1 est relu case par case.
//
//   node scripts/verifier-exercices-pythagore-4e.mjs

import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/* ── Calcul ─────────────────────────────────────────────────────────────── */

/** Le carré d'une longueur à deux décimales au plus, fait en entiers. */
const carre = (x) => {
  const c = Math.round(x * 100);
  if (Math.abs(c - x * 100) > 1e-6) throw new Error(`plus de deux décimales : ${x}`);
  return (c * c) / 10000;
};
/** √y par dichotomie. */
const racine = (y) => {
  let a = 0, b = Math.max(1, y);
  for (let i = 0; i < 80; i++) {
    const m = (a + b) / 2;
    if (m * m > y) b = m;
    else a = m;
  }
  return (a + b) / 2;
};
/** La racine exacte (deux décimales au plus) si elle existe, par recherche. */
const racineExacte = (y) => {
  for (let k = 0; k * k <= y * 10000 + 1e-6; k++) if (Math.abs(k * k - y * 10000) < 1e-6) return k / 100;
  return null;
};
const arr = (x, n) => Math.round(x * 10 ** n) / 10 ** n;
const proche = (x, y, eps = 1e-9) => Math.abs(x - y) < eps;
/** Écrit comme dans la feuille : 2\,809, 53{,}29. */
function fr(x, d = null) {
  const s = d === null ? String(+x.toFixed(6)) : x.toFixed(d);
  const [e, f] = s.split(".");
  const groupe = e.length >= 4 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : e;
  return f ? `${groupe}{,}${f}` : groupe;
}

const long = (P, Q) => Math.hypot(Q[0] - P[0], Q[1] - P[1]);
const angle = (S, P, Q) => (Math.acos(((P[0] - S[0]) * (Q[0] - S[0]) + (P[1] - S[1]) * (Q[1] - S[1])) / (long(S, P) * long(S, Q))) * 180) / Math.PI;
const autres = { A: ["B", "C"], B: ["A", "C"], C: ["A", "B"] };
const oppose = { A: "BC", B: "CA", C: "AB" };

/** La réciproque, par l'autre chemin : on trie, on compare. */
function reciproque(cotes) {
  const [[grand, g], [, p1], [, p2]] = Object.entries(cotes).sort((a, b) => b[1] - a[1]);
  const gauche = carre(g);
  const droite = carre(p1) + carre(p2);
  return { grand, gauche, droite, rectangle: proche(gauche, droite) };
}
/** Le sommet opposé à un côté « EV » dans le triangle « VUE ». */
const sommetOppose = (nom, cote) => [...nom].find((l) => !cote.includes(l));

/* ── Les triangles dessinés, relus dans le source ──────────────────────── */

function triangles(bloc) {
  return [...bloc.matchAll(/triangle\(\{ A: \[([-\d.]+), ([-\d.]+)\], B: \[([-\d.]+), ([-\d.]+)\], C: \[([-\d.]+), ([-\d.]+)\] \}, \{([^\n]*)\}\)/g)].map((m) => {
    const [ax, ay, bx, by, cx, cy] = m.slice(1, 7).map(Number);
    const o = m[7];
    const cotes = Object.fromEntries([...(o.match(/cotes: \{([^}]*)\}/)?.[1] ?? "").matchAll(/(AB|BC|CA): "([^"]*)"/g)].map((x) => [x[1], x[2]]));
    const noms = { A: "A", B: "B", C: "C", ...Object.fromEntries([...(o.match(/noms: \{([^}]*)\}/)?.[1] ?? "").matchAll(/([ABC]): "([^"]*)"/g)].map((x) => [x[1], x[2]])) };
    const droit = o.match(/droit: "([ABC])"/)?.[1];
    const h = o.match(/hauteur: \{ depuis: "([ABC])", label: "([^"]*)" \}/);
    return { P: { A: [ax, ay], B: [bx, by], C: [cx, cy] }, cotes, noms, droit, hauteur: h ? { depuis: h[1], label: h[2] } : null, brut: m[0] };
  });
}
/** Le nombre d'une étiquette : « 8 cm » → 8, « ? = 53 cm » → 53, « ? ≈ 9,2 cm » → 9,2 ; sinon null. */
function nombreDe(t) {
  const m = t.split(/[=≈]/).at(-1).match(/(\d+(?:,\d+)?)/);
  return m ? Number(m[1].replace(",", ".")) : null;
}
/** Le nom d'un côté dans l'ordre des clés : clé CA, noms C = F, A = D → « FD ». */
const segment = (t, cle) => t.noms[cle[0]] + t.noms[cle[1]];
/** La hauteur issue de S, mesurée dans les coordonnées. */
const hauteurDe = (t) => {
  const S = t.P[t.hauteur.depuis];
  const [Q, R] = autres[t.hauteur.depuis].map((l) => t.P[l]);
  return Math.abs((R[0] - Q[0]) * (Q[1] - S[1]) - (Q[0] - S[0]) * (R[1] - Q[1])) / long(Q, R);
};

function verifier(source, v) {
  const { enonces, corrections, blocs } = lireFeuille(source);
  const e = (k) => enonces[k - 1] ?? "";
  const c = (k) => corrections[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");

  /** Tous les triangles de l'exercice k sont fidèles à leurs étiquettes et à l'énoncé. */
  const fidele = (k, { inconnue = false, convertis = [] } = {}) => {
    const ts = triangles(blocs[k - 1] ?? "");
    v.ok(`${k}. le corrigé a son triangle dessiné`, ts.length > 0);
    for (const t of ts) {
      const { P, cotes, droit } = t;
      const angs = { A: angle(P.A, P.B, P.C), B: angle(P.B, P.A, P.C), C: angle(P.C, P.A, P.B) };
      if (droit) v.ok(`${k}. l'angle droit est bien en ${t.noms[droit]} (${angs[droit].toFixed(3)}°)`, Math.abs(angs[droit] - 90) < 0.05);
      else v.ok(`${k}. triangle sans angle droit marqué : aucun angle n'est droit`, Object.values(angs).every((a) => Math.abs(a - 90) > 0.2), JSON.stringify(angs));
      const L = { AB: long(P.A, P.B), BC: long(P.B, P.C), CA: long(P.C, P.A) };
      const chiffres = Object.entries(cotes).map(([s, et]) => [s, nombreDe(et)]).filter(([, n]) => n !== null);
      const ratios = chiffres.map(([s, n]) => L[s] / n);
      if (t.hauteur) {
        const n = nombreDe(t.hauteur.label);
        if (n !== null) ratios.push(hauteurDe(t) / n);
      }
      if (ratios.length >= 2) v.ok(`${k}. les ${ratios.length} longueurs chiffrées sont dessinées à l'échelle`, ratios.every((r) => Math.abs(r / ratios[0] - 1) < 0.006), JSON.stringify(ratios));
      for (const [s, et] of Object.entries(cotes)) {
        if (/hypot/.test(et)) v.ok(`${k}. « hypoténuse » est écrit en face de l'angle droit`, !!droit && oppose[droit] === s, `${s}, angle droit en ${droit}`);
      }
      if (droit) {
        const hyp = oppose[droit];
        v.ok(`${k}. l'hypoténuse dessinée est le plus long côté`, Object.entries(L).every(([s, l]) => s === hyp || l < L[hyp]));
      }
      // ⭐ Le nom du côté, dans l'ordre des clés, porte dans l'énoncé la longueur du dessin.
      if (t.brut.includes("noms:")) {
        for (const [s, n] of chiffres) {
          if (cotes[s].startsWith("?")) continue;
          const seg = segment(t, s);
          const ecrits = [fr(n), ...(convertis.includes(seg) ? [fr(arr(n * 100, 2))] : [])].map((x) => `$${seg} = ${x}$`);
          const ecritAvecAutres = new RegExp(`\\$(?:[^$]* )?${seg} =[^$]*${fr(n).replace(/[{}\\,]/g, (ch) => "\\" + ch)}\\$`).test(e(k));
          v.ok(`${k}. le côté ${seg} (clé ${s}) mesure ${fr(n)} dans l'énoncé`, ecrits.some((x) => e(k).includes(x)) || ecritAvecAutres, ecrits.join(" ou "));
        }
      }
      v.ok(`${k}. pas de $ ni de \\ dans le dessin`, !/[$\\]/.test(t.brut));
    }
    if (inconnue) v.ok(`${k}. le côté cherché est marqué « ? » avec sa valeur`, ts.some((t) => [...Object.values(t.cotes), t.hauteur?.label ?? ""].some((et) => /^\? [=≈] \d/.test(et))));
    return ts;
  };
  /** La valeur écrite après le « ? » du dessin (côté ou hauteur), n-ième du genre, est x à l'arrondi écrit. */
  const inconnueVaut = (k, x, rang = 0) => {
    const tous = triangles(blocs[k - 1] ?? "").flatMap((t) => [...Object.values(t.cotes), t.hauteur?.label ?? ""]).filter((s) => s.startsWith("?"));
    const et = tous[rang];
    const n = et ? nombreDe(et) : null;
    const dec = et?.match(/,(\d+)/)?.[1].length ?? 0;
    v.ok(`${k}. le « ? » du dessin vaut ${fr(arr(x, dec), dec)}`, n !== null && proche(n, arr(x, dec)) && et.includes("≈") === !proche(x, arr(x, dec)), et);
  };
  /** Le nom de l'hypoténuse d'un triangle dessiné : la clé CA dans l'ordre des clés. */
  const hypDessinee = (k, i = 0) => {
    const t = triangles(blocs[k - 1] ?? "")[i];
    return t && t.droit ? segment(t, oppose[t.droit]) : "?";
  };
  /** Réciproque : les deux membres écrits, et la conclusion que dit le calcul. */
  const conclut = (k, nom, cotes, { phrase = true } = {}) => {
    const r = reciproque(cotes);
    v.ok(`${k}. ${r.grand}² = ${r.gauche}, somme des deux autres = ${r.droite} : ${r.rectangle ? "rectangle" : "pas rectangle"}`, true);
    dit(k, `${r.grand}^2 = `, `${r.grand}² calculé : c'est le plus grand côté`);
    dit(k, `= ${fr(r.gauche)}$`);
    dit(k, `= ${fr(r.droite)}$`);
    if (r.rectangle) {
      const s = sommetOppose(nom, r.grand);
      if (phrase) dit(k, `après la réciproque du théorème de Pythagore, le triangle $${nom}$ est rectangle en $${s}$`);
      v.ok(`${k}. aucune conclusion « n'est pas rectangle »`, !c(k).includes(`$${nom}$ n'est pas rectangle`));
      return s;
    }
    v.ok(`${k}. le « ≠ » est écrit`, c(k).includes(`${fr(r.gauche)} \\neq ${fr(r.droite)}`));
    v.ok(`${k}. aucune conclusion « est rectangle »`, !new RegExp(`\\$${nom}\\$ est rectangle`).test(c(k)));
    return null;
  };

  v.titre("★ Un seul geste");
  // 1. Les carrés et les racines, et le tableau des carrés parfaits.
  dit(1, `$11^2 = 11 \\times 11 = ${carre(11)}$`);
  dit(1, `$0{,}6^2 = 0{,}6 \\times 0{,}6 = ${fr(carre(0.6))}$`);
  dit(1, `$1{,}2^2 = 1{,}2 \\times 1{,}2 = ${fr(carre(1.2))}$`);
  for (const n of [81, 144, 1]) dit(1, `$\\sqrt{${n}} = ${racineExacte(n)}$`);
  const bas50 = [...Array(20).keys()].filter((k) => k * k < 50).at(-1);
  v.ok(`1. √50 entre ${bas50} et ${bas50 + 1}, ≈ ${racine(50).toFixed(4)}`, bas50 === 7 && racineExacte(50) === null);
  dit(1, `$${bas50}^2 = ${bas50 ** 2} < 50 < ${(bas50 + 1) ** 2} = ${bas50 + 1}^2$`);
  dit(1, `$\\sqrt{50} \\approx ${fr(arr(racine(50), 1), 1)}$`);
  const tab = (blocs[0] ?? "").match(/tableau\(\[([^\]]*)\], \[([^\]]*)\]/);
  const nombres = tab ? tab[1].split(",").slice(1).map((s) => Number(s.trim().replace(/"/g, ""))) : [];
  const carres = tab ? tab[2].split(",").slice(1).map((s) => Number(s.trim().replace(/"/g, ""))) : [];
  v.ok(`1. le tableau des carrés : ${nombres.length} cases, chacune juste`, nombres.length >= 5 && nombres.length === carres.length && nombres.every((n, i) => carre(n) === carres[i] && n * n <= 144), `${nombres} / ${carres}`);

  // 2. L'hypoténuse nommée, lue sur les dessins.
  v.ok("2. les deux triangles dessinés", triangles(blocs[1] ?? "").length === 2);
  dit(2, `l'hypoténuse est $[${hypDessinee(2, 0)}]$`, `a) [${hypDessinee(2, 0)}]`);
  dit(2, `l'hypoténuse est $[${hypDessinee(2, 1)}]$`, `b) [${hypDessinee(2, 1)}]`);
  v.ok("2. le a) est GHJ rectangle en H, le b) NPO rectangle en P", hypDessinee(2, 0) === "JG" && hypDessinee(2, 1) === "ON" && e(2).includes("$GHJ$ est rectangle en $H$") && e(2).includes("$NPO$ est rectangle en $P$"));
  v.ok("2. c) BUS rectangle en U : hypoténuse [BS]", sommetOppose("BUS", "BS") === "U");
  dit(2, "Réponse : $[JG]$ ; $[ON]$ ; $[BS]$");
  const t2 = fidele(2)[0];
  v.ok("2. au a), l'hypoténuse est EN HAUT du dessin", !!t2 && t2.P.C[1] === t2.P.A[1] && t2.P.B[1] < t2.P.A[1]);

  // 3.
  const s3 = carre(28) + carre(45);
  const r3 = racineExacte(s3);
  v.ok(`3. 28² + 45² = ${s3}, racine exacte ${r3}`, r3 === 53);
  dit(3, `hypoténuse est le côté en face, $[${hypDessinee(3)}]$`);
  dit(3, `$FD^2 = 28^2 + 45^2 = ${carre(28)} + ${fr(carre(45))} = ${fr(s3)}$`);
  dit(3, `$FD = \\sqrt{${fr(s3)}} = ${r3}$ cm`);
  dit(3, `$28 + 45 = ${28 + 45}$ cm`);
  dit(3, `Réponse : $FD = ${r3}$ cm.`);
  fidele(3, { inconnue: true });
  inconnueVaut(3, r3);

  // 4.
  const s4 = carre(109) - carre(60);
  const r4 = racineExacte(s4);
  v.ok(`4. 109² − 60² = ${s4}, racine ${r4}, plus courte que 109`, r4 === 91);
  dit(4, `l'hypoténuse est $[${hypDessinee(4)}]$`);
  dit(4, `$OL^2 = 109^2 - 60^2 = ${fr(carre(109))} - ${fr(carre(60))} = ${fr(s4)}$`);
  dit(4, `$OL = \\sqrt{${fr(s4)}} = ${r4}$ mm`);
  const faux4 = carre(109) + carre(60);
  v.ok("4. le piège donne un côté plus long que l'hypoténuse", racine(faux4) > 109);
  dit(4, `$109^2 + 60^2 = ${fr(faux4)}$ donnerait $OL \\approx ${Math.round(racine(faux4))}$ mm`);
  dit(4, `Réponse : $OL = ${r4}$ mm.`);
  fidele(4, { inconnue: true });
  inconnueVaut(4, r4);

  // 5.
  const s5 = carre(6) + carre(7);
  const r5 = racine(s5);
  v.ok(`5. 6² + 7² = ${s5}, pas un carré parfait, entre 9 et 10`, racineExacte(s5) === null && 9 < r5 && r5 < 10);
  dit(5, `l'hypoténuse est $[${hypDessinee(5)}]$`);
  dit(5, `$CT^2 = TI^2 + IC^2 = 6^2 + 7^2 = ${carre(6)} + ${carre(7)} = ${s5}$`);
  dit(5, `$9^2 = 81 < ${s5} < 100 = 10^2$`);
  dit(5, `$\\sqrt{${s5}} \\approx ${fr(arr(r5, 2), 2)}$`);
  dit(5, `Réponse : $CT = \\sqrt{${s5}} \\approx ${fr(arr(r5, 1), 1)}$ cm.`);
  fidele(5, { inconnue: true });
  inconnueVaut(5, r5);

  // 6.
  const s6 = carre(10) - carre(7);
  const r6 = racine(s6);
  v.ok(`6. 10² − 7² = ${s6}, √${s6} ≈ ${r6.toFixed(4)}`, s6 === 51 && 7 < r6 && r6 < 8);
  dit(6, `l'hypoténuse est $[${hypDessinee(6)}]$`);
  dit(6, `$ER^2 = RM^2 - ME^2 = 10^2 - 7^2 = ${carre(10)} - ${carre(7)} = ${s6}$`);
  dit(6, `$\\sqrt{${s6}} \\approx ${fr(arr(r6, 3), 3)}$`);
  dit(6, `Réponse : $ER = \\sqrt{${s6}} \\approx ${fr(arr(r6, 1), 1)}$ cm.`);
  dit(6, `$10 - 7 = ${10 - 7}$ cm`);
  fidele(6, { inconnue: true });
  inconnueVaut(6, r6);

  // 7.
  const s7 = conclut(7, "VUE", { VU: 65, UE: 72, EV: 97 });
  dit(7, `Réponse : $VUE$ est rectangle en $${s7}$.`);
  dit(7, `a) Le plus grand côté est $[EV]$`);
  fidele(7);

  // 8.
  conclut(8, "FOU", { FO: 7, OU: 11, UF: 13 });
  const angO8 = (Math.acos((carre(7) + carre(11) - carre(13)) / (2 * 7 * 11)) * 180) / Math.PI;
  v.ok(`8. l'angle en O mesure ${angO8.toFixed(3)}°, pas 90°`, Math.abs(angO8 - 90) > 0.2);
  dit(8, `environ $${fr(arr(angO8, 1), 1)}°$`);
  dit(8, "Réponse : $FOU$ n'est pas rectangle.");
  const [t8] = fidele(8);
  v.ok(`8. l'angle en O est dessiné à ${t8 ? angle(t8.P.B, t8.P.A, t8.P.C).toFixed(2) : "?"}°, comme le calcul`, !!t8 && proche(angle(t8.P.B, t8.P.A, t8.P.C), angO8, 0.01));

  v.titre("★★ Type devoir");
  const s9 = carre(4.8) + carre(5.5);
  const r9 = racineExacte(s9);
  v.ok(`9. 4,8² + 5,5² = ${s9}, racine exacte ${r9}`, r9 === 7.3);
  dit(9, `Dans le triangle $SUD$ rectangle en $U$, l'hypoténuse est $[${hypDessinee(9)}]$. D'après le théorème de Pythagore, $DS^2 = SU^2 + UD^2$.`);
  dit(9, `$DS^2 = 4{,}8^2 + 5{,}5^2 = ${fr(carre(4.8))} + ${fr(carre(5.5))} = ${fr(s9)}$`);
  dit(9, `$DS = \\sqrt{${fr(s9)}} = ${fr(r9)}$ cm`);
  dit(9, `$4{,}8 \\times 4{,}8 = ${fr(carre(4.8))}$, pas $4{,}8 \\times 2$`);
  dit(9, `Réponse : $DS = ${fr(r9)}$ cm.`);
  fidele(9, { inconnue: true });
  inconnueVaut(9, r9);

  const s10 = carre(8.5) - carre(7.7);
  const r10 = racineExacte(s10);
  v.ok(`10. 8,5² − 7,7² = ${s10}, racine exacte ${r10}`, r10 === 3.6);
  dit(10, `Dans le triangle $LOT$ rectangle en $O$, l'hypoténuse est $[${hypDessinee(10)}]$. D'après le théorème de Pythagore, $TL^2 = LO^2 + OT^2$.`);
  dit(10, `$OT^2 = TL^2 - LO^2 = 8{,}5^2 - 7{,}7^2 = ${fr(carre(8.5))} - ${fr(carre(7.7))} = ${fr(s10)}$`);
  dit(10, `Réponse : $OT = ${fr(r10)}$ cm.`);
  fidele(10, { inconnue: true });
  inconnueVaut(10, r10);

  const s11 = conclut(11, "NID", { NI: 3.9, ID: 8, DN: 8.9 });
  dit(11, `Réponse : $NID$ est rectangle en $${s11}$.`);
  dit(11, "D'une part, $DN^2");
  fidele(11);

  const sA12 = conclut(12, "ROC", { RO: 13.3, OC: 15.6, CR: 20.5 }, { phrase: false });
  dit(12, `d'après la réciproque du théorème de Pythagore, $ROC$ est rectangle en $${sA12}$`);
  conclut(12, "MIR", { RM: 7.6, MI: 4.5, IR: 6 });
  const angI12 = (Math.acos((carre(4.5) + carre(6) - carre(7.6)) / (2 * 4.5 * 6)) * 180) / Math.PI;
  dit(12, `environ $${fr(arr(angI12, 1), 1)}°$`);
  v.ok("12. au b), le plus grand côté est donné en premier dans l'énoncé", e(12).indexOf("$RM = 7{,}6$") < e(12).indexOf("$MI = 4{,}5$"));
  dit(12, `Réponse : le triangle $ROC$ est rectangle en $${sA12}$ ; le triangle $MIR$ ne l'est pas.`);
  const t12 = fidele(12);
  v.ok("12. deux triangles : le rectangle, puis l'autre", t12.length === 2 && t12[0].droit === "B" && !t12[1].droit);
  v.ok(`12. le MIR dessiné a son angle en I à ${t12[1] ? angle(t12[1].P.B, t12[1].P.A, t12[1].P.C).toFixed(2) : "?"}°`, !!t12[1] && proche(angle(t12[1].P.B, t12[1].P.A, t12[1].P.C), angI12, 0.01));

  const s13 = carre(21) + carre(29.7);
  const r13 = racine(s13);
  dit(13, `$CA^2 = AB^2 + BC^2 = 21^2 + 29{,}7^2 = ${carre(21)} + ${fr(carre(29.7))} = ${fr(s13)}$`);
  dit(13, `$CA = \\sqrt{${fr(s13)}} \\approx ${fr(arr(r13, 2), 2)}$ cm, soit $${fr(arr(r13, 1), 1)}$ cm`);
  const s13b = carre(29.7) + carre(42);
  const r13b = racine(s13b);
  dit(13, `$d^2 = 29{,}7^2 + 42^2 = ${fr(carre(29.7))} + ${fr(carre(42))} = ${fr(s13b)}$, et $d = \\sqrt{${fr(s13b)}} \\approx ${fr(arr(r13b, 1), 1)}$ cm`);
  v.ok(`13. l'A3 n'a pas le double de la diagonale de l'A4 (${r13b.toFixed(2)} contre ${(2 * r13).toFixed(2)})`, r13b < 2 * r13 && proche(r13b / r13, racine(2), 1e-3));
  dit(13, `$21 + 29{,}7 = ${fr(21 + 29.7)}$ cm`);
  dit(13, `Réponse : la diagonale de l'A4 mesure environ $${fr(arr(r13, 1), 1)}$ cm, celle de l'A3 environ $${fr(arr(r13b, 1), 1)}$ cm.`);
  fidele(13, { inconnue: true });
  inconnueVaut(13, r13);

  const sh14 = 8 / 2;
  const s14 = carre(9) - carre(sh14);
  const r14 = racine(s14);
  const aire14 = (8 * r14) / 2;
  const aireTrop = (8 * arr(r14, 1)) / 2;
  v.ok(`14. IH² = ${s14}, IH ≈ ${r14.toFixed(4)}, aire ≈ ${aire14.toFixed(3)} ; avec l'arrondi ${aireTrop}`, arr(aire14, 1) !== arr(aireTrop, 1));
  dit(14, `$SH = 8 \\div 2 = ${sh14}$ cm`);
  dit(14, `$IH^2 = 9^2 - 4^2 = ${carre(9)} - ${carre(4)} = ${s14}$`);
  dit(14, `$IH = \\sqrt{${s14}} \\approx ${fr(arr(r14, 2), 2)}$, soit $IH \\approx ${fr(arr(r14, 1), 1)}$ cm`);
  dit(14, `$8 \\times \\sqrt{${s14}} \\div 2 \\approx ${fr(arr(aire14, 1), 1)}$ cm²`);
  dit(14, `$8 \\times ${fr(arr(r14, 1), 1)} \\div 2 = ${fr(aireTrop)}$ cm²`);
  dit(14, `Réponse : $IH \\approx ${fr(arr(r14, 1), 1)}$ cm et l'aire mesure environ $${fr(arr(aire14, 1), 1)}$ cm².`);
  const [t14] = fidele(14, { inconnue: true });
  inconnueVaut(14, r14);
  v.ok("14. isocèle en I, H au milieu de [SO]", !!t14 && proche(long(t14.P.C, t14.P.A), long(t14.P.C, t14.P.B), 1e-3) && proche(t14.P.C[0], (t14.P.A[0] + t14.P.B[0]) / 2) && t14.hauteur?.depuis === "C");

  const s15 = conclut(15, "TAE", { TA: 6.3, AE: 160 / 100, ET: 6.5 });
  dit(15, "$AE = 160$ cm $= 1{,}6$ m");
  dit(15, `$6{,}3^2 + 160^2 = ${fr(carre(6.3) + carre(160))}$`);
  dit(15, `Réponse : oui, le mât et la bôme forment un angle droit en $${s15}$.`);
  fidele(15, { convertis: ["AE"] });

  const s16 = carre(16.9) - carre(12);
  const r16 = racineExacte(s16);
  const tom = carre(12) + carre(16.9);
  v.ok(`16. EL = ${r16} ; Tom : √${tom} ≈ ${racine(tom).toFixed(3)} > 16,9`, r16 === 11.9 && racine(tom) > 16.9);
  v.ok("16. l'erreur de Tom est bien dans l'énoncé", e(16).includes(`= ${fr(tom)}$, donc $EL \\approx ${fr(arr(racine(tom), 1), 1)}$ cm`));
  dit(16, `l'hypoténuse est $[${hypDessinee(16)}]$`);
  dit(16, `$EL^2 = LS^2 - SE^2 = 16{,}9^2 - 12^2 = ${fr(carre(16.9))} - ${carre(12)} = ${fr(s16)}$`);
  dit(16, `$EL = \\sqrt{${fr(s16)}} = ${fr(r16)}$ cm`);
  dit(16, `Réponse : $EL = ${fr(r16)}$ cm.`);
  fidele(16, { inconnue: true });
  inconnueVaut(16, r16);

  v.titre("★★★ Problèmes");
  conclut(17, "DAB", { DA: 8.8, AB: 10.5, BD: 13.7 });
  const r17b = reciproque({ DA: 8.8, AB: 10.5, BD: 13.6 });
  v.ok(`17. b) 13,6² = ${r17b.gauche} ≠ ${r17b.droite}`, !r17b.rectangle);
  dit(17, `$BD^2 = 13{,}6^2 = ${fr(r17b.gauche)}$`);
  dit(17, `$${fr(r17b.gauche)} \\neq ${fr(r17b.droite)}$`);
  const angA17 = (Math.acos((carre(8.8) + carre(10.5) - carre(13.6)) / (2 * 8.8 * 10.5)) * 180) / Math.PI;
  dit(17, `environ $${fr(arr(angA17, 1), 1)}°$`);
  dit(17, "Réponse : sur le premier chantier, l'angle en $A$ est droit ; sur le second, il ne l'est pas.");
  const t17 = fidele(17);
  v.ok("17. deux triangles : l'angle droit, puis l'angle de travers", t17.length === 2 && t17[0].droit === "B" && !t17[1].droit);
  v.ok(`17. le second est dessiné à ${t17[1] ? angle(t17[1].P.B, t17[1].P.A, t17[1].P.C).toFixed(2) : "?"}°, comme le calcul (${angA17.toFixed(2)}°)`, !!t17[1] && proche(angle(t17[1].P.B, t17[1].P.A, t17[1].P.C), angA17, 0.01));

  const s18 = carre(23.77) + carre(10.97);
  const s18b = carre(23.77) + carre(8.23);
  const r18 = racine(s18), r18b = racine(s18b);
  dit(18, `$d^2 = 23{,}77^2 + 10{,}97^2 = ${fr(carre(23.77))} + ${fr(carre(10.97))} = ${fr(s18)}$`);
  dit(18, `$d = \\sqrt{${fr(s18)}} \\approx ${fr(arr(r18, 2), 2)}$ m`);
  dit(18, `$s^2 = 23{,}77^2 + 8{,}23^2 = ${fr(carre(23.77))} + ${fr(carre(8.23))} = ${fr(s18b)}$, et $s = \\sqrt{${fr(s18b)}} \\approx ${fr(arr(r18b, 2), 2)}$ m`);
  const tour = 23.77 + 10.97;
  const gain = arr(tour - arr(r18, 2), 2);
  v.ok(`18. ${tour.toFixed(2)} − ${r18.toFixed(4)} : ${gain} m, le même au centième sans arrondir`, gain === arr(tour - r18, 2));
  dit(18, `$23{,}77 + 10{,}97 = ${fr(arr(tour, 2), 2)}$ m`);
  dit(18, `$${fr(arr(tour, 2), 2)} - ${fr(arr(r18, 2), 2)} = ${fr(gain, 2)}$ m`);
  dit(18, `Réponse : environ $${fr(arr(r18, 2), 2)}$ m en double, $${fr(arr(r18b, 2), 2)}$ m en simple, et $${fr(gain, 2)}$ m économisés.`);
  const t18 = fidele(18, { inconnue: true });
  v.ok("18. deux terrains dessinés, double puis simple", t18.length === 2);
  inconnueVaut(18, r18, 0);
  inconnueVaut(18, r18b, 1);

  const hd19 = 1.4 / 2;
  const s19 = carre(1.2) - carre(hd19);
  const r19 = racine(s19);
  const cm19 = Math.round(r19 * 100);
  v.ok(`19. SH² = ${s19}, SH ≈ ${r19.toFixed(4)} m = ${cm19} cm, plus que 90 cm`, cm19 === 97 && r19 * 100 > 90);
  dit(19, `$HD = 1{,}4 \\div 2 = ${fr(hd19)}$ m`);
  dit(19, `$SH^2 = DS^2 - HD^2 = 1{,}2^2 - 0{,}7^2 = ${fr(carre(1.2))} - ${fr(carre(0.7))} = ${fr(s19)}$`);
  dit(19, `$SH = \\sqrt{${fr(s19)}} \\approx ${fr(arr(r19, 3), 3)}$ m, soit environ $${cm19}$ cm`);
  dit(19, `Il lui reste environ $${cm19 - 90}$ cm`);
  const s19c = carre(0.7) + carre(1);
  const r19c = racine(s19c);
  const haut19 = Math.ceil(r19c * 100) / 100;
  const bas19 = Math.round(r19c * 100) / 100;
  v.ok(`19. c) √${s19c} ≈ ${r19c.toFixed(5)} : ${haut19} au-dessus, ${bas19} au plus proche, et ${bas19} ne suffit pas`, haut19 === 1.23 && bas19 === 1.22 && racine(carre(bas19) - carre(0.7)) < 1 && racine(carre(haut19) - carre(0.7)) >= 1);
  v.ok(`19. c) avec ${bas19}, il manque moins d'un millimètre de toile`, (r19c - bas19) * 1000 < 1);
  dit(19, `$SD^2 = 0{,}7^2 + 1^2 = ${fr(carre(0.7))} + 1 = ${fr(s19c)}$, et $SD = \\sqrt{${fr(s19c)}} \\approx ${fr(arr(r19c, 4), 4)}$ m`);
  dit(19, `au moins $${fr(haut19, 2)}$ m de toile`);
  dit(19, `Réponse : la tente fait environ $${cm19}$ cm de haut, le randonneur y tient assis ; pour $1$ m de haut, il faudrait des pans de $${fr(haut19, 2)}$ m.`);
  const [t19] = fidele(19, { inconnue: true });
  inconnueVaut(19, r19);
  v.ok("19. la tente est isocèle, le sommet au-dessus du milieu", !!t19 && proche(t19.P.C[0], (t19.P.A[0] + t19.P.B[0]) / 2) && proche(long(t19.P.C, t19.P.A), long(t19.P.C, t19.P.B), 1e-9));

  const d2 = carre(55) + carre(35);
  const D2 = d2 + carre(25);
  const d20 = racine(d2), D20 = racine(D2);
  v.ok(`20. d ≈ ${d20.toFixed(3)} < 68 < D ≈ ${D20.toFixed(3)}`, d20 < 68 && 68 < D20);
  dit(20, `$d^2 = 55^2 + 35^2 = ${fr(carre(55))} + ${fr(carre(35))} = ${fr(d2)}$, et $d = \\sqrt{${fr(d2)}} \\approx ${fr(arr(d20, 1), 1)}$ cm`);
  dit(20, `$D^2 = d^2 + 25^2 = ${fr(d2)} + ${carre(25)} = ${fr(D2)}$, et $D = \\sqrt{${fr(D2)}} \\approx ${fr(arr(D20, 1), 1)}$ cm`);
  dit(20, `$${fr(arr(d20, 1), 1)} < 68$`);
  dit(20, `$${fr(arr(D20, 1), 1)} > 68$`);
  v.ok(`20. la marge : ${(D20 - 68).toFixed(2)} cm, moins de deux centimètres`, D20 - 68 < 2 && D20 - 68 > 1);
  dit(20, `Réponse : le bâton ne tient pas à plat (diagonale du fond d'environ $${fr(arr(d20, 1), 1)}$ cm), mais il tient en travers (grande diagonale d'environ $${fr(arr(D20, 1), 1)}$ cm).`);
  const t20 = fidele(20, { inconnue: true });
  v.ok("20. le second triangle part de la diagonale du fond", t20.length === 2 && proche(t20[1].P.C[0], d20, 1e-3));
  inconnueVaut(20, d20, 0);
  inconnueVaut(20, D20, 1);

  v.titre("Les dessins");
  const dessines = blocs.filter((b) => /\b(triangle|tableau)\(/.test(b)).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20);
}

lancer({
  nom: "LE THÉORÈME DE PYTHAGORE · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-pythagore.tsx",
  notionId: "pythagore_theoreme",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : 0,6² pris pour un double", "0{,}6 \\\\times 0{,}6 = 0{,}36$ ;", "0{,}6 \\\\times 0{,}6 = 1{,}2$ ;"],
    ["ex. 1 : une case fausse dans le tableau des carrés", "[\"son carré\", 1, 49, 64, 81, 121, 144]", "[\"son carré\", 1, 49, 64, 81, 120, 144]"],
    ["ex. 2 : l'hypoténuse cherchée en bas", "L'angle droit est en $P$ : l'hypoténuse est $[ON]$.", "L'angle droit est en $P$ : l'hypoténuse est $[PN]$."],
    ["ex. 2 : « hypoténuse » écrit sur un côté de l'angle droit", "C: [3, 5] }, { noms: { A: \"N\", B: \"P\", C: \"O\" }, cotes: { CA: \"hypoténuse\" }", "C: [3, 5] }, { noms: { A: \"N\", B: \"P\", C: \"O\" }, cotes: { AB: \"hypoténuse\" }"],
    ["ex. 3 : les longueurs additionnées", "$FD = \\\\sqrt{2\\\\,809} = 53$ cm", "$FD = \\\\sqrt{2\\\\,809} = 73$ cm"],
    ["ex. 3 : le triangle pas à l'échelle", "C: [45, 0] }, { noms: { A: \"D\"", "C: [40, 0] }, { noms: { A: \"D\""],
    ["ex. 3 : les noms du dessin qui ne suivent plus l'énoncé", "noms: { A: \"D\", B: \"E\", C: \"F\" }", "noms: { A: \"F\", B: \"E\", C: \"D\" }"],
    ["ex. 4 : additionner pour un côté de l'angle droit", "$OL = \\\\sqrt{8\\\\,281} = 91$ mm.", "$OL = \\\\sqrt{15\\\\,481} \\\\approx 124$ mm."],
    ["ex. 5 : la racine oubliée", "Réponse : $CT = \\\\sqrt{85} \\\\approx 9{,}2$ cm.", "Réponse : $CT = 85$ cm."],
    ["ex. 6 : les longueurs soustraites", "Réponse : $ER = \\\\sqrt{51} \\\\approx 7{,}1$ cm.", "Réponse : $ER = 3$ cm."],
    ["ex. 7 : l'angle droit au mauvais sommet", "Réponse : $VUE$ est rectangle en $U$.", "Réponse : $VUE$ est rectangle en $E$."],
    ["ex. 8 : « presque égal » pris pour égal", "Réponse : $FOU$ n'est pas rectangle.", "Réponse : $FOU$ est rectangle en $O$."],
    ["ex. 8 : l'angle droit marqué sur un angle de 89,6°", "CA: \"13 cm\" } })", "CA: \"13 cm\" }, droit: \"B\" })"],
    ["ex. 9 : 4,8² = 9,6", "= 23{,}04 + 30{,}25 = 53{,}29$", "= 9{,}6 + 30{,}25 = 39{,}85$"],
    ["ex. 11 : le théorème au lieu de la réciproque", "D'après la réciproque du théorème de Pythagore, le triangle $NID$", "D'après le théorème de Pythagore, le triangle $NID$"],
    ["ex. 12 : le b) déclaré rectangle", "le triangle $MIR$ ne l'est pas.", "le triangle $MIR$ l'est aussi."],
    ["ex. 12 : le MIR dessiné faux", "A: [-0.1258, 4.4982]", "A: [-0.5, 4.4982]"],
    ["ex. 13 : un chiffre de la diagonale A4 faux", "soit $36{,}4$ cm au millimètre", "soit $36{,}3$ cm au millimètre"],
    ["ex. 14 : l'arrondi pris trop tôt", "Réponse : $IH \\\\approx 8{,}1$ cm et l'aire mesure environ $32{,}2$ cm².", "Réponse : $IH \\\\approx 8{,}1$ cm et l'aire mesure environ $32{,}4$ cm²."],
    ["ex. 14 : la hauteur dessinée trop haute", "C: [4, 8.0623]", "C: [4, 9]"],
    ["ex. 15 : l'angle droit au mauvais sommet", "Réponse : oui, le mât et la bôme forment un angle droit en $A$.", "Réponse : oui, le mât et la bôme forment un angle droit en $T$."],
    ["ex. 16 : l'erreur de Tom recopiée", "$EL = \\\\sqrt{141{,}61} = 11{,}9$ cm.", "$EL = \\\\sqrt{429{,}61} \\\\approx 20{,}7$ cm."],
    ["ex. 17 : 13,6 m déclaré droit", "sur le second, il ne l'est pas.", "sur le second aussi."],
    ["ex. 17 : l'angle de travers marqué droit", "CA: \"13,6 m\" } })", "CA: \"13,6 m\" }, droit: \"B\" })"],
    ["ex. 18 : la diagonale du simple fausse", "CA: \"? ≈ 25,15 m\"", "CA: \"? ≈ 25,51 m\""],
    ["ex. 19 : l'arrondi au plus proche", "il faudrait des pans de $1{,}23$ m.", "il faudrait des pans de $1{,}22$ m."],
    ["ex. 20 : la hauteur de la valise oubliée", "grande diagonale d'environ $69{,}8$ cm).", "grande diagonale d'environ $65{,}2$ cm)."],
    ["un $ dans un dessin", "CA: \"? = 53 cm\"", "CA: \"$FD = 53$ cm\""],
    ["une micro d'une autre notion", "micros: [\"pythagore_calculer_cote\"],", "micros: [\"cos_cotes\"],"],
  ],
});
