// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Nombres premiers et
// décomposition » de 4e (lib/fiches-exercices/maths-4e-nombres-premiers.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé ANNONCE une liste de premiers, une
// décomposition, un nombre de diviseurs, une fraction irréductible ; ici on les
// CHERCHE par force brute — les diviseurs en essayant 1, 2, 3… jusqu'au nombre
// lui-même, « premier » en COMPTANT ces diviseurs, les restes par `%`, les
// fractions en fractions exactes (`Q`, `evalTex`). Chaque résultat est ensuite
// lu dans la phrase du corrigé. Les schémas (échelles, cribles, arbres de
// facteurs, jetons, tableaux) sont relus dans le source et confrontés au même
// recalcul ; on compte aussi les corrigés dessinés.
//
//   node scripts/verifier-exercices-nombres-premiers-4e.mjs

import { lireFeuille, lancer, Q, egal, evalTex } from "./verifier-exercices-commun.mjs";

/* ── La force brute ─────────────────────────────────────────────────────── */

/** Tous les diviseurs de n, par essais de 1 à n. */
const diviseurs = (n) => {
  const d = [];
  for (let k = 1; k <= n; k++) if (n % k === 0) d.push(k);
  return d;
};
/** Premier = exactement deux diviseurs (on les compte). */
const premier = (n) => diviseurs(n).length === 2;
/** Les facteurs premiers de n, du plus petit au plus grand. */
const facteurs = (n) => {
  const f = [];
  let m = n;
  while (m > 1) {
    const p = diviseurs(m).find((d) => d > 1 && premier(d));
    f.push(p);
    m /= p;
  }
  return f;
};
const groupes = (n) => {
  const g = new Map();
  for (const p of facteurs(n)) g.set(p, (g.get(p) ?? 0) + 1);
  return [...g];
};
const SUP = { 2: "²", 3: "³", 4: "⁴", 5: "⁵" };
/** `2^3 \times 5`, comme dans les corrigés. */
const tex = (n) => groupes(n).map(([p, e]) => (e > 1 ? `${p}^${e}` : `${p}`)).join(" \\times ");
/** `2³ × 5`, comme dans les schémas. */
const uni = (n) => groupes(n).map(([p, e]) => (e > 1 ? `${p}${SUP[e]}` : `${p}`)).join(" × ");
/** `2 \times 2 \times 19` : le produit développé. */
const dev = (n) => facteurs(n).join(" \\times ");
/** Relit un produit écrit en clair (`2 × 5²`, `2 × 2 × 3`) : sa valeur. */
const valeurProduit = (t) =>
  t.split("×").reduce((x, s) => {
    const m = /^\s*(\d+)([²³⁴⁵]?)\s*$/.exec(s);
    if (!m) throw new Error(`produit illisible : ${t}`);
    const e = m[2] ? Number(Object.keys(SUP).find((k) => SUP[k] === m[2])) : 1;
    return x * Number(m[1]) ** e;
  }, 1);
const facteursProduit = (t) => t.split("×").map((s) => Number(s.trim().replace(/[²³⁴⁵]/, "")));
/** « $1$, $2$ et $4$ » ou « $1$, $2$, $4$ ». */
const liste = (xs, et = true) => (et && xs.length > 1 ? `$${xs.slice(0, -1).join("$, $")}$ et $${xs.at(-1)}$` : `$${xs.join("$, $")}$`);
const MOTS = ["zéro", "un", "deux", "trois", "quatre", "cinq"];
const oui = (x) => (x ? "oui" : "non");
const entre = (a, b) => [...Array(b - a + 1).keys()].map((i) => a + i);

/* ── Relire les schémas ──────────────────────────────────────────────────── */

function appel(bloc, nom) {
  const i = bloc.indexOf(`${nom}(`);
  if (i < 0) return null;
  let prof = 0;
  let j = i + nom.length;
  let chaine = false;
  for (; j < bloc.length; j++) {
    // Une parenthèse DANS une case (« a) … ») ne compte pas.
    if (bloc[j] === '"' && bloc[j - 1] !== "\\") chaine = !chaine;
    if (chaine) continue;
    if (bloc[j] === "(") prof++;
    if (bloc[j] === ")" && --prof === 0) break;
  }
  return bloc
    .slice(i + nom.length + 1, j)
    .replace(/,(\s*\n\s*[\]}])/g, "$1")
    .replace(/,\s*$/, "");
}
const grilleDe = (bloc) => {
  const t = appel(bloc, "grille");
  if (t === null) return null;
  const [entete, lignes, surligne = []] = JSON.parse(`[${t}]`);
  return { entete, lignes, surligne };
};
const echellesDe = (bloc) =>
  [...bloc.matchAll(/\{ e: (\[\[[^\n]*?\]\]), r: "([^"]*)" \}/g)].map((m) => ({ e: JSON.parse(m[1]), r: m[2] }));
const cribleDe = (bloc) => {
  const m = /\bcrible\((\d+), (\d+), (\[[^\]]*\])\)/.exec(bloc);
  return m ? { de: Number(m[1]), a: Number(m[2]), premiers: JSON.parse(m[3]) } : null;
};
const arbresDe = (bloc) => [...bloc.matchAll(/arbreFacteurs\((\[.*?\]), "([^"]*)"\)/g)].map((m) => ({ a: JSON.parse(m[1]), r: m[2] }));
const jetonsDe = (bloc) => [...bloc.matchAll(/jetons\((\d+), (\d+), "([^"]*)"\)/g)].map((m) => ({ r: Number(m[1]), j: Number(m[2]), legende: m[3] }));

/** Un arbre est juste si chaque nœud vaut le produit de ses branches et si
 *  toutes ses feuilles sont premières. Renvoie les feuilles, ou null. */
const feuillesArbre = (a) => {
  if (typeof a === "number") return premier(a) ? [a] : null;
  const [v, g, d] = a;
  const val = (x) => (typeof x === "number" ? x : x[0]);
  if (val(g) * val(d) !== v) return null;
  const fg = feuillesArbre(g);
  const fd = feuillesArbre(d);
  return fg && fd ? [...fg, ...fd] : null;
};

function verifier(source, v) {
  const { corrections, enonces, blocs } = lireFeuille(source);
  const c = (k) => corrections[k - 1] ?? "";
  const e = (k) => enonces[k - 1] ?? "";
  const b = (k) => blocs[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");
  const grilleOk = (k, quoi, test) => {
    let g = null;
    try {
      g = grilleDe(b(k));
    } catch {
      g = null;
    }
    v.ok(`${k}. le schéma : ${quoi}`, !!g && test(g), g ? JSON.stringify(g.lignes).slice(0, 160) : "pas de grille lisible");
  };
  /** L'échelle de n : chaque étape divise par le PLUS PETIT premier, la
   *  suivante est le quotient, on finit à 1 ; la légende est la décomposition. */
  const echelleOk = (k, n) => {
    const ech = echellesDe(b(k)).find((x) => x.e[0]?.[0] === n);
    let ok = !!ech;
    let m = n;
    if (ech)
      for (const [a, p] of ech.e) {
        const plusPetit = diviseurs(a).find((d) => d > 1);
        if (a !== m || p !== plusPetit || !premier(p)) ok = false;
        m = a / p;
      }
    v.ok(`${k}. l'échelle de ${n} descend jusqu'à 1 par les plus petits premiers, légende « ${n} = ${uni(n)} »`, ok && m === 1 && ech.r === `${n} = ${uni(n)}`, ech ? `${JSON.stringify(ech.e)} → ${m} ; ${ech.r}` : "absente");
  };
  /** La décomposition de n, trouvée par force brute : « n = développé = regroupé$ ». */
  const dec = (k, n, avant = "$") => dit(k, `${avant}${n} = ${dev(n)} = ${tex(n)}$`, `${n} = ${dev(n)} = ${tex(n)}`);
  /** Le crible dessiné colore exactement les premiers de l'intervalle. */
  const cribleOk = (k, de, a) => {
    const cr = cribleDe(b(k));
    const attendus = entre(de, a).filter(premier);
    v.ok(`${k}. le crible dessiné va de ${de} à ${a} et colore exactement ${attendus.length} premiers`, !!cr && cr.de === de && cr.a === a && JSON.stringify(cr.premiers) === JSON.stringify(attendus), JSON.stringify(cr));
    return attendus;
  };
  /** Une grille « essai | division | reste » : chaque ligne recalculée par `%`. */
  const essaisOk = (k, n, essais) =>
    grilleOk(k, `les divisions de ${n}, essai par essai (${essais.join(", ")})`, (g) =>
      g.lignes.length === essais.length &&
      g.lignes.every(([p, division, r], i) => {
        const pp = Number(p);
        const q = Math.floor(n / pp);
        return pp === essais[i] && premier(pp) && division === `${n} = ${pp} × ${q} + ${n % pp}` && Number(r) === n % pp;
      }) &&
      JSON.stringify(g.surligne) === JSON.stringify(g.lignes.map((l, i) => (l[2] === "0" ? i : -1)).filter((i) => i >= 0)),
    );

  v.titre("★ Un seul geste");
  const nb1 = [17, 25, 1, 33];
  for (const n of nb1) {
    const d = diviseurs(n);
    const verdict = premier(n) ? "est premier" : "n'est pas premier";
    if (n === 1) dit(1, `Le seul diviseur de $1$ est $1$ : un seul diviseur, $1$ ${verdict}`);
    else dit(1, `Les diviseurs de $${n}$ sont ${liste(d)} : ${MOTS[d.length]} diviseurs, $${n}$ ${verdict}`);
  }
  dit(1, `Réponse : seul ${nb1.filter(premier).map((n) => `$${n}$`).join()} est premier`, "la réponse");
  v.ok("1. un seul premier parmi 17, 25, 1, 33", nb1.filter(premier).join() === "17");
  grilleOk(1, "diviseurs, nombre et verdict recalculés", (g) =>
    g.lignes.every(([n, d, combien, verdict]) => d === diviseurs(Number(n)).join(", ") && Number(combien) === diviseurs(Number(n)).length && verdict === oui(premier(Number(n)))) &&
    g.lignes.map((l) => Number(l[0])).join() === nb1.join() &&
    g.surligne.join() === "0",
  );

  const p30 = cribleOk(2, 1, 30);
  v.ok("2. la figure de l'énoncé : la grille nue de 1 à 30", /cases\(1, 30\)/.test(b(2)));
  dit(2, `a) Il reste ${liste(p30)}.`);
  dit(2, `Il y en a $${p30.length}$.`);
  dit(2, `Réponse : ${liste(p30)}, soit $${p30.length}$ nombres premiers.`, "la réponse");
  v.ok("2. 2 est le seul premier pair de la grille", p30.filter((n) => n % 2 === 0).join() === "2");
  v.ok("2. on peut s'arrêter à 5 : 7 × 7 > 30", 7 * 7 > 30 && 5 * 5 <= 30);
  dit(2, "$25 = 5 \\times 5$");

  const rect = (n) => diviseurs(n).filter((d) => d >= 2 && n / d >= 2 && d <= n / d);
  v.ok(`3. 10 jetons : un rectangle (${rect(10).map((d) => `${d}×${10 / d}`)}), 11 jetons : aucun`, rect(10).join() === "2" && rect(11).length === 0 && premier(11) && !premier(10));
  dit(3, "a) $10 = 2 \\times 5$ : $2$ rangées de $5$ jetons");
  dit(3, "Réponse : a) $2$ rangées de $5$ ; b) aucun rectangle");
  const jt = jetonsDe(b(3));
  v.ok("3. les jetons dessinés : 2 × 5 = 10 et une ligne de 11", jt.length === 2 && jt[0].r * jt[0].j === 10 && jt[0].r === 2 && jt[1].r === 1 && jt[1].j === 11 && jt[0].legende === "10 = 2 × 5", JSON.stringify(jt));

  const essais89 = [2, 3, 5, 7, 11].filter((p) => p * p <= 89);
  v.ok(`4. on essaie ${essais89} (11² = 121 > 89), et 89 est premier`, essais89.join() === "2,3,5,7" && premier(89));
  dit(4, `$89 = 7 \\times ${Math.floor(89 / 7)} + ${89 % 7}$, reste $${89 % 7}$`);
  dit(4, `Réponse : on essaie ${liste(essais89)} ; $89$ est premier.`, "la réponse");
  v.ok("4. l'argument : 10 × 10 = 100 dépasse 89", 10 * 10 > 89);
  essaisOk(4, 89, essais89);

  const nb5 = [51, 57, 59, 65, 85];
  v.ok("5. seul 59 est premier", nb5.filter(premier).join() === "59");
  for (const n of nb5.filter((x) => !premier(x))) dit(5, `$${n} = ${diviseurs(n)[1]} \\times ${n / diviseurs(n)[1]}$`);
  dit(5, `$59 = 7 \\times ${Math.floor(59 / 7)} + ${59 % 7}$`);
  dit(5, "Réponse : seul $59$ est premier.");
  grilleOk(5, "plus petit diviseur premier et verdict, nombre par nombre", (g) =>
    g.lignes.map((l) => Number(l[0])).join() === nb5.join() &&
    g.lignes.every(([n, p, verdict]) => (premier(Number(n)) ? p === "aucun" && verdict === "oui" : Number(p) === diviseurs(Number(n))[1] && verdict === "non")) &&
    JSON.stringify(g.surligne) === JSON.stringify(g.lignes.map((l, i) => (l[2] === "oui" ? i : -1)).filter((i) => i >= 0)),
  );

  const p6 = cribleOk(6, 31, 50);
  dit(6, `a) Il reste ${liste(p6)}.`);
  dit(6, `Réponse : ${liste(p6)}.`, "la réponse");
  v.ok("6. 49 passe 2, 3 et 5 mais vaut 7 × 7", 49 % 2 && 49 % 3 && 49 % 5 && 49 === 7 * 7);
  const impairs6 = entre(31, 50).filter((n) => n % 2);
  dit(6, `Restent ${liste(impairs6)}.`);
  const par = (p, deja) => impairs6.filter((n) => n % p === 0 && !deja.some((q) => n % q === 0));
  dit(6, `Par $3$ (somme des chiffres) : ${liste(par(3, []))}, barrés.`);
  dit(6, `Par $5$ : ${liste(par(5, [3]))}, barré`);

  for (const n of [76, 98, 117]) {
    dec(7, n);
    echelleOk(7, n);
  }
  dit(7, `Réponse : $76 = ${tex(76)}$ ; $98 = ${tex(98)}$ ; $117 = ${tex(117)}$.`, "la réponse");
  dit(7, "$9 \\times 13 = 117$");

  const arbres = arbresDe(b(8));
  const f100 = facteurs(100);
  v.ok(
    "8. deux arbres de 100, chaque nœud = produit de ses branches, feuilles premières = les facteurs de 100",
    arbres.length === 2 &&
      arbres.every(({ a, r }) => {
        const f = feuillesArbre(a);
        return a[0] === 100 && f && JSON.stringify([...f].sort((x, y) => x - y)) === JSON.stringify(f100) && r.endsWith(`100 = ${uni(100)}`);
      }),
    JSON.stringify(arbres),
  );
  v.ok("8. Tom part de 4 × 25, Inès de 10 × 10, comme l'énoncé", arbres[0]?.a[1][0] === 4 && arbres[0]?.a[2][0] === 25 && arbres[1]?.a[1][0] === 10 && arbres[1]?.a[2][0] === 10 && e(8).includes("$100 = 4 \\times 25$") && e(8).includes("$100 = 10 \\times 10$"));
  dit(8, `Réponse : les deux arbres donnent $100 = ${tex(100)}$.`);

  v.titre("★★ Type devoir");
  const milliers = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
  for (const n of [2024, 2025]) {
    dit(9, `Donc $${milliers(n)} = ${dev(n)} = ${tex(n)}$`, `${n} = ${dev(n)} = ${tex(n)}`);
    echelleOk(9, n);
  }
  v.ok("9. 253 = 11 × 23 résiste à 2, 3, 5, 7", 253 === 11 * 23 && [2, 3, 5, 7].every((p) => 253 % p) && premier(23));
  dit(9, `$253 = 7 \\times ${Math.floor(253 / 7)} + ${253 % 7}$`);
  const r2025 = Math.round(Math.sqrt(2025));
  v.ok(`9. 2 025 = ${r2025}², et ${r2025} = 3² × 5`, r2025 * r2025 === 2025 && valeurProduit("3² × 5") === r2025);
  dit(9, `$2\\,025 = ${tex(2025)} = ${r2025}^2$`, "la réponse c)");

  const fr10 = [[105, 147], [182, 286]];
  for (const [n, d] of fr10) {
    const f = Q(n, d);
    dit(10, `$${n} = ${dev(n)}$ et $${d} = ${dev(d)}$`);
    dit(10, `$\\dfrac{${n}}{${d}} = \\dfrac{${f.n}}{${f.d}}$`);
  }
  v.ok("10. 182/286 ÷ 2 = 91/143, encore réductible par 13", egal(Q(182 / 2, 286 / 2), Q(7, 11)) && 91 % 13 === 0 && 143 % 13 === 0);
  dit(10, "$91 = 7 \\times 13$ et $143 = 11 \\times 13$");
  dit(10, `Réponse : $\\dfrac{${Q(105, 147).n}}{${Q(105, 147).d}}$ et $\\dfrac{${Q(182, 286).n}}{${Q(182, 286).d}}$.`);
  grilleOk(10, "chaque produit remultiplié, « il reste » = la fraction irréductible", (g) => {
    const [l1, l2, l3, l4, l5, l6] = g.lignes;
    const bon = ([n, t]) => valeurProduit(t) === Number(n) && facteursProduit(t).every(premier);
    const reste = ([, t], n, d) => {
      const [h, bb] = t.split(" / ").map(Number);
      return egal(Q(h, bb), Q(n, d)) && Q(h, bb).n === BigInt(h);
    };
    return bon(l1) && bon(l2) && bon(l4) && bon(l5) && reste(l3, 105, 147) && reste(l6, 182, 286) && g.surligne.join() === "2,5";
  });

  const p11 = cribleOk(11, 40, 75);
  const jum = p11.filter((p) => p11.includes(p + 2));
  dit(11, `Il reste ${liste(p11)}.`);
  const txtJum = jum.map((p) => `$${p}$ et $${p + 2}$`).join(", ").replace(/, ([^,]*)$/, ", $1");
  dit(11, `Réponse : ${txtJum}.`, `la réponse : ${jum.length} couples`);
  v.ok(`11. ${jum.length} couples de jumeaux : ${jum.map((p) => `${p}-${p + 2}`)}`, jum.length === 3);
  dit(11, `$${jum.map((p) => p + 1).join("$, $")}$`, "les nombres pairs du milieu");
  const barres11 = (p, deja) => entre(40, 75).filter((n) => n % 2 && n % p === 0 && !deja.some((q) => n % q === 0));
  dit(11, `par $3$ : $${barres11(3, []).join("$, $")}$ ; par $5$ : $${barres11(5, [3]).join("$ et $")}$ ; par $7$ : $${barres11(7, [3, 5]).join("$ et $")}$`, "les nombres barrés par 3, 5, 7");

  const P = entre(1, 500).filter(premier);
  const impairs = entre(1, 500).filter((n) => n % 2);
  const v12 = [
    impairs.every(premier),
    P.filter((p) => p % 2 === 0).join() === "2",
    P.every((p) => P.every((q) => premier(p + q))),
    P.slice(0, 20).every((p) => P.slice(0, 20).every((q) => !premier(p * q))),
  ];
  v.ok("12. faux, vrai, faux, vrai (balayé jusqu'à 500)", JSON.stringify(v12) === "[false,true,false,true]");
  ["a", "b", "c", "d"].forEach((l, i) => dit(12, `${l}) ${v12[i] ? "VRAI" : "FAUX"}.`));
  v.ok("12. les contre-exemples : 35 = 5 × 7 impair non premier, 3 + 5 = 8", !premier(35) && 35 % 2 && !premier(3 + 5));
  dit(12, "Réponse : a) faux ; b) vrai ; c) faux ; d) vrai.");
  grilleOk(12, "exemples recalculés et verdicts identiques au corrigé", (g) =>
    g.lignes.every(([, , verdict], i) => verdict === (v12[i] ? "vrai" : "faux")) && g.lignes[0][1] === "35 = 5 × 7" && valeurProduit("5 × 7") === 35 && g.lignes[3][1] === `3 × 5 = ${3 * 5}` && !premier(15),
  );

  const nbDiv = (n) => groupes(n).reduce((x, [, ex]) => x * (ex + 1), 1);
  for (const n of [40, 30, 81]) v.ok(`13. ${n} = ${uni(n)} : ${diviseurs(n).length} diviseurs comptés un à un, ${nbDiv(n)} par les choix`, diviseurs(n).length === nbDiv(n));
  dit(13, `a) $40 = ${dev(40)} = ${tex(40)}$ ; $30 = ${tex(30)}$ ; $81 = ${dev(81)} = ${tex(81)}$`);
  dit(13, `$4 \\times 2 = ${diviseurs(40).length}$ diviseurs`);
  dit(13, `$2 \\times 2 \\times 2 = ${diviseurs(30).length}$ diviseurs`);
  dit(13, `donc $5$ choix. $${diviseurs(81).length}$ diviseurs`);
  dit(13, `Les diviseurs de $40$ sont ${liste(diviseurs(40))} : il y en a bien $${diviseurs(40).length}$`);
  dit(13, `Réponse : $40$ et $30$ ont $${diviseurs(40).length}$ diviseurs chacun, $81$ en a $${diviseurs(81).length}$.`);
  grilleOk(13, "décomposition, produit des choix et nombre de diviseurs", (g) =>
    g.lignes.map((l) => Number(l[0])).join() === "40,30,81" &&
    g.lignes.every(([n, d, choix, nd]) => d === uni(Number(n)) && valeurProduit(choix) === diviseurs(Number(n)).length && Number(nd) === diviseurs(Number(n)).length),
  );

  const N = 2 * 3 ** 2 * 11;
  v.ok(`14. N = ${N}`, N === 198 && e(14).includes("$N = 2 \\times 3^2 \\times 11$"));
  dit(14, `= 18 \\times 11 = ${N}$`);
  const d14 = [22, 4, 33, 27].map((d) => N % d === 0);
  v.ok("14. divisible par 22 et 33, pas par 4 ni 27", JSON.stringify(d14) === "[true,false,true,false]");
  dit(14, `Oui, $198 = 22 \\times ${N / 22}$`);
  dit(14, `Oui, $198 = 33 \\times ${N / 33}$`);
  dit(14, "demande deux $2$ ; $N$ n'en a qu'un. Non.", "4 : non");
  dit(14, "demande trois $3$ ; $N$ n'en a que deux. Non.", "27 : non");
  dit(14, `= ${tex(6 * N)}$, soit $${milliers(6 * N)}$`, `6N = ${tex(6 * N)}`);
  echelleOk(14, 198);
  echelleOk(14, 1188);

  const essais = (n) => P.filter((p) => p * p <= n);
  v.ok(`15. pour 143 on essaie jusqu'à ${essais(143).at(-1)}, pour 149 aussi`, essais(143).join() === "2,3,5,7,11" && essais(149).join() === "2,3,5,7,11");
  v.ok("15. 143 = 11 × 13 n'est pas premier, 149 l'est ; « 2, 3, 5, 7 » suffit jusqu'à 120", !premier(143) && 143 === 11 * 13 && premier(149) && essais(120).join() === "2,3,5,7" && essais(121).join() === "2,3,5,7,11");
  dit(15, `$149 = 7 \\times ${Math.floor(149 / 7)} + ${149 % 7}$`);
  dit(15, `$149 = 11 \\times ${Math.floor(149 / 11)} + ${149 % 11}$`);
  dit(15, "Réponse : $143 = 11 \\times 13$ n'est pas premier ; $149$ est premier");
  grilleOk(15, "les restes de 143 et 149, essai par essai", (g) =>
    g.lignes.map((l) => l[0]).join() === essais(149).join() && g.lignes.every(([p, r1, r2]) => Number(r1) === 143 % Number(p) && Number(r2) === 149 % Number(p)) && g.surligne.join() === "4",
  );

  const trois = entre(1, 100).filter((n) => diviseurs(n).length === 3);
  v.ok(`16. les nombres ≤ 100 à trois diviseurs : ${trois} — les carrés de premiers`, trois.every((n) => premier(Math.round(Math.sqrt(n))) && Math.round(Math.sqrt(n)) ** 2 === n));
  dit(16, `Réponse : ${liste(trois)}.`);
  dit(16, `mais il a cinq diviseurs : ${liste(diviseurs(16))}`);
  for (const n of [4, 9, 25]) dit(16, `$${diviseurs(n).join("$, $")}$`, `diviseurs de ${n}`);
  grilleOk(16, "diviseurs et nombre de diviseurs, ligne par ligne ; rouge = trois diviseurs", (g) =>
    g.lignes.every(([n, d, k]) => d === diviseurs(Number(n)).join(", ") && Number(k) === diviseurs(Number(n)).length) &&
    JSON.stringify(g.surligne) === JSON.stringify(g.lignes.map((l, i) => (l[2] === "3" ? i : -1)).filter((i) => i >= 0)),
  );

  v.titre("★★★ Problèmes");
  const cycles = entre(12, 18);
  const predateurs = entre(2, 6);
  const auRdv = (n) => predateurs.filter((p) => n % p === 0);
  const libres = cycles.filter((n) => auRdv(n).length === 0);
  v.ok(`17. cycles sans prédateur : ${libres} — exactement les premiers de 12 à 18`, JSON.stringify(libres) === JSON.stringify(cycles.filter(premier)) && libres.join() === "13,17");
  dit(17, `a) ${cycles.map((n) => (premier(n) ? `$${n}$ est premier` : `$${n} = ${tex(n)}$`)).join(" ; ")}.`, "les sept décompositions");
  for (const n of cycles) {
    const r = auRdv(n);
    dit(17, `$${n}$ : ${r.length ? liste(r) : "aucun"}.`, `${n} : ${r.join(", ") || "aucun"}`);
  }
  dit(17, "Réponse : $13$ et $17$");
  grilleOk(17, "décompositions et prédateurs au rendez-vous, cycle par cycle", (g) =>
    g.lignes.map((l) => Number(l[0])).join() === cycles.join() &&
    g.lignes.every(([n, d, pr]) => (premier(Number(n)) ? d === "premier" : d === uni(Number(n))) && pr === (auRdv(Number(n)).join(", ") || "aucun")) &&
    g.surligne.map((i) => g.lignes[i][0]).join() === "13,17",
  );

  v.ok("18. 23 équipes de 8 = 184", 23 * 8 === 184);
  const rangs = (n) => diviseurs(n).filter((d) => d >= 2 && d < n / d);
  dit(18, `Donc $184 = ${tex(184)}$`);
  dit(18, `$182 = ${dev(182)}$`);
  const txtR = (n) => rangs(n).map((d) => `$${d}$ rangs de $${n / d}$`).join(", ");
  dit(18, `plus de coureurs par rang que de rangs : ${txtR(184)}.`, `rectangles de 184 : ${rangs(184)}`);
  dit(18, `Les rangs possibles : ${txtR(182)}.`, `rectangles de 182 : ${rangs(182)}`);
  const carre = rangs(182).reduce((best, d) => (182 / d - d < 182 / best - best ? d : best));
  dit(18, `Le plus proche d'un carré : $${carre}$ rangs de $${182 / carre}$ coureurs.`);
  grilleOk(18, "chaque ligne rangs × par rang = coureurs, et tous les rectangles y sont", (g) =>
    g.lignes.every(([n, r, p]) => Number(r) * Number(p) === Number(n) && Number(r) < Number(p) && Number(r) >= 2) &&
    [184, 182].every((n) => g.lignes.filter((l) => Number(l[0]) === n).map((l) => Number(l[1])).join() === rangs(n).join()) &&
    g.surligne.map((i) => g.lignes[i][1]).join() === String(carre),
  );

  for (const n of [50, 34, 15, 24, 27]) dit(19, `$${n} = ${tex(n)}$`);
  const rap = [[50, 15], [34, 24], [34, 27]];
  for (const [h, bas] of rap) {
    const f = Q(h, bas);
    const ecrit = new RegExp(`\\\\dfrac\\{${h}\\}\\{${bas}\\} = (\\\\dfrac\\{[^$]*?\\}\\{[^$]*?\\}) = \\\\dfrac\\{(\\d+)\\}\\{(\\d+)\\}`).exec(c(19));
    if (f.n === BigInt(h)) {
      v.ok(`19. ${h}/${bas} est déjà irréductible`, c(19).includes(`$\\dfrac{${h}}{${bas}}$ est déjà irréductible`));
    } else {
      const milieu = ecrit ? evalTex(ecrit[1], Q(0)) : null;
      v.ok(`19. ${h}/${bas} = ${f.n}/${f.d}, en passant par les facteurs`, !!ecrit && egal(milieu, Q(h, bas)) && ecrit[2] === String(f.n) && ecrit[3] === String(f.d), ecrit?.[0]);
    }
  }
  v.ok("19. 3 tours de pédalier, pas moins", [1, 2].every((t) => (50 * t) % 15 !== 0) && (50 * 3) % 15 === 0 && (50 * 3) / 15 === 10);
  dit(19, "pour $3$ tours de pédalier, la roue fait exactement $10$ tours");
  dit(19, "Réponse : $\\dfrac{10}{3}$, $\\dfrac{17}{12}$ et $\\dfrac{34}{27}$ ; il faut $3$ tours");
  grilleOk(19, "plateau et pignon remultipliés, fraction irréductible recalculée", (g) =>
    g.lignes.every(([r, pl, pi, irr], i) => {
      const [h, bas] = rap[i];
      const f = Q(h, bas);
      return r === `${h}/${bas}` && valeurProduit(pl) === h && valeurProduit(pi) === bas && facteursProduit(pl).every(premier) && facteursProduit(pi).every(premier) && irr === `${f.n}/${f.d}`;
    }),
  );

  v.ok("20. 13 × 29 = 377", 13 * 29 === 377);
  dit(20, "$13 \\times 29 = 377$");
  const f391 = facteurs(391);
  v.ok(`20. 391 = ${f391.join(" × ")}, deux premiers`, f391.length === 2 && f391.every(premier));
  dit(20, `Par $${f391[0]}$ : $391 = ${f391[0]} \\times ${f391[1]}$, reste $0$`);
  dit(20, `Réponse : $13 \\times 29 = 377$ ; $391 = ${f391[0]} \\times ${f391[1]}$.`);
  const essais391 = P.filter((p) => p <= f391[0]);
  v.ok(`20. ${essais391.length} essais jusqu'à ${f391[0]} (« sept essais »)`, essais391.length === 7 && c(20).includes("sept essais"));
  v.ok("20. 20 × 20 = 400 > 391, et 17 × 17 = 289 < 391", 20 * 20 > 391 && 17 * 17 < 391);
  dit(20, "$17 \\times 17 = 289$");
  for (const p of [7, 11, 13]) dit(20, `$391 = ${p} \\times ${Math.floor(391 / p)} + ${391 % p}$`);
  essaisOk(20, 391, essais391);
  const chiffres = (2n ** 2048n).toString().length;
  v.ok(`20. une clé de 2 048 bits : ${chiffres} chiffres`, chiffres === 617 && e(20).includes(`$${chiffres}$ chiffres`));

  v.ok("tous les énoncés sont là", enonces.length === 20);
  // ⭐ Frédéric, 25/09 : « les élèves adorent les schémas » — on les compte.
  const dessines = blocs.filter((bl) => /\n\s*schema:/.test(bl)).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20);
  // ⛔ Les schémas sont du HTML/SVG nu : ni `$`, ni `\`, ni `^` dans leurs cases.
  const schemas = blocs.map((bl) => (bl.split("schema:")[1] ?? "").split("micros:")[0]);
  const sales = schemas.filter((s) => /[$\\^]/.test(s));
  v.ok("aucun $ ni LaTeX dans les schémas", sales.length === 0, sales[0]?.slice(0, 100));
}

lancer({
  nom: "NOMBRES PREMIERS ET DÉCOMPOSITION · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-nombres-premiers.tsx",
  notionId: "nombre_premier",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : 1 déclaré premier", "[\"1\", \"1\", \"1\", \"non\"]", "[\"1\", \"1\", \"1\", \"oui\"]"],
    ["ex. 1 : 11 oublié parmi les diviseurs de 33", "Les diviseurs de $33$ sont $1$, $3$, $11$ et $33$", "Les diviseurs de $33$ sont $1$, $3$ et $33$"],
    ["ex. 2 : 25 gardé dans le crible", "crible(1, 30, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29])", "crible(1, 30, [2, 3, 5, 7, 11, 13, 17, 19, 23, 25, 29])"],
    ["ex. 3 : un rectangle de 3 × 4 pour 10 jetons", "jetons(2, 5, \"10 = 2 × 5\")", "jetons(3, 4, \"10 = 2 × 5\")"],
    ["ex. 4 : un reste faux", "[\"7\", \"89 = 7 × 12 + 5\", \"5\"]", "[\"7\", \"89 = 7 × 12 + 4\", \"4\"]"],
    ["ex. 5 : 57 déclaré premier", "[\"57\", \"3\", \"non\"]", "[\"57\", \"aucun\", \"oui\"]"],
    ["ex. 6 : 49 gardé", "Réponse : $31$, $37$, $41$, $43$ et $47$.", "Réponse : $31$, $37$, $41$, $43$, $47$ et $49$."],
    ["ex. 7 : 117 = 9 × 13 dans l'échelle", "{ e: [[117, 3], [39, 3], [13, 13]], r: \"117 = 3² × 13\" }", "{ e: [[117, 9], [13, 13]], r: \"117 = 9 × 13\" }"],
    ["ex. 8 : l'arbre d'Inès arrêté à 10 × 10", "arbreFacteurs([100, [10, 2, 5], [10, 2, 5]]", "arbreFacteurs([100, 10, [10, 2, 5]]"],
    ["ex. 9 : 253 pris pour premier", "{ e: [[2024, 2], [1012, 2], [506, 2], [253, 11], [23, 23]], r: \"2024 = 2³ × 11 × 23\" }", "{ e: [[2024, 2], [1012, 2], [506, 2], [253, 253]], r: \"2024 = 2³ × 253\" }"],
    ["ex. 10 : arrêté à 91/143", "Je les barre : $\\\\dfrac{182}{286} = \\\\dfrac{7}{11}$", "Je les barre : $\\\\dfrac{182}{286} = \\\\dfrac{91}{143}$"],
    ["ex. 11 : 47 et 49 pris pour jumeaux", "crible(40, 75, [41, 43, 47, 53, 59, 61, 67, 71, 73])", "crible(40, 75, [41, 43, 47, 49, 53, 59, 61, 67, 71, 73])"],
    ["ex. 12 : la somme de deux premiers déclarée première", "c) FAUX. $3$ et $5$", "c) VRAI. $3$ et $5$"],
    ["ex. 13 : le choix « zéro fois » oublié", "[\"40\", \"2³ × 5\", \"4 × 2\", \"8\"]", "[\"40\", \"2³ × 5\", \"3 × 1\", \"3\"]"],
    ["ex. 14 : N divisible par 4", "$4 = 2 \\\\times 2$ demande deux $2$ ; $N$ n'en a qu'un. Non.", "$4 = 2 \\\\times 2$ : oui, $198 = 4 \\\\times 49$."],
    ["ex. 15 : 143 déclaré premier", "[\"11\", \"0\", \"6\"]", "[\"11\", \"1\", \"6\"]"],
    ["ex. 16 : 16 compté parmi les nombres à trois diviseurs", "Réponse : $4$, $9$, $25$ et $49$.", "Réponse : $4$, $9$, $16$, $25$ et $49$."],
    ["ex. 17 : 6 oublié pour 12", "[\"12\", \"2² × 3\", \"2, 3, 4, 6\"]", "[\"12\", \"2² × 3\", \"2, 3, 4\"]"],
    ["ex. 18 : 4 rangs de 46 oublié", "[\"184\", \"4\", \"46\"], ", ""],
    ["ex. 19 : 34/27 « simplifié »", "[\"34/27\", \"2 × 17\", \"3 × 3 × 3\", \"34/27\"]", "[\"34/27\", \"2 × 17\", \"3 × 3 × 3\", \"17/9\"]"],
    ["ex. 20 : un mauvais facteur", "$391 = 17 \\\\times 23$, reste $0$", "$391 = 17 \\\\times 24$, reste $0$"],
    ["ex. 20 : une clé de 600 chiffres", "Une clé actuelle est un nombre de $617$ chiffres.", "Une clé actuelle est un nombre de $600$ chiffres."],
    ["un corrigé sans schéma", "          schema: crible(31, 50, [31, 37, 41, 43, 47]),\n", ""],
    ["une micro d'une autre notion", "micros: [\"premier_decomposer\"],\n        },\n        {\n          titre: \"Le cadenas", "micros: [\"div_lister_diviseurs\"],\n        },\n        {\n          titre: \"Le cadenas"],
    ["un $ dans un schéma", "[\"2\", \"1\", \"1\"]", "[\"$2$\", \"1\", \"1\"]"],
  ],
});
