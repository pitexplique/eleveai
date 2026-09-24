// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Multiples, diviseurs
// et facteurs premiers » de 3e (lib/fiches-exercices/maths-3e-arithmetique.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé ANNONCE une décomposition, un PGCD, une liste
// de diviseurs ; ici on les CHERCHE par force brute — les diviseurs en essayant
// 1, 2, 3… jusqu'au nombre lui-même, « premier » en comptant ses diviseurs, le
// PGCD en balayant les diviseurs communs, le plus petit multiple commun en
// balayant les entiers. Une décomposition écrite est relue, ses facteurs
// remultipliés et testés un à un. Chaque résultat est ensuite lu dans la phrase
// du corrigé. Les schémas (échelles de divisions, grilles, crible, pavage) sont
// relus dans le source et confrontés au même recalcul.
//
//   node scripts/verifier-exercices-arithmetique-3e.mjs

import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/* ── La force brute ─────────────────────────────────────────────────────── */

/** Tous les diviseurs de n, par essais de 1 à n. */
const diviseurs = (n) => {
  const d = [];
  for (let k = 1; k <= n; k++) if (n % k === 0) d.push(k);
  return d;
};
/** Premier = exactement deux diviseurs (on les compte). */
const premier = (n) => diviseurs(n).length === 2;
/** Le PGCD : le plus grand des diviseurs de a qui divisent aussi b. */
const pgcd = (a, b) => Math.max(...diviseurs(a).filter((d) => b % d === 0));
/** Le plus petit multiple commun : on balaie 1, 2, 3… */
const ppcm = (a, b) => {
  let m = 1;
  while (m % a !== 0 || m % b !== 0) m++;
  return m;
};
/** Les facteurs premiers de n, du plus petit au plus grand : on cherche, parmi
 *  les diviseurs, le plus petit qui soit premier, et on recommence. */
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
/** `2^3 \times 3^2 \times 5`, comme dans les corrigés. */
const tex = (n) => groupes(n).map(([p, e]) => (e > 1 ? `${p}^${e}` : `${p}`)).join(" \\times ");
/** `2³ × 3² × 5`, comme dans les schémas. */
const uni = (n) => groupes(n).map(([p, e]) => (e > 1 ? `${p}${SUP[e]}` : `${p}`)).join(" × ");
/** Relit un produit écrit en clair (`2 × 5² × 7`, `1 × 2 × 17`) : ses facteurs. */
const lireProduit = (t) =>
  t.split("×").map((s) => {
    const m = /^\s*(\d+)([²³⁴⁵]?)\s*$/.exec(s);
    if (!m) throw new Error(`produit illisible : ${t}`);
    const e = m[2] ? Number(Object.keys(SUP).find((k) => SUP[k] === m[2])) : 1;
    return { base: Number(m[1]), e };
  });
const valeur = (fs) => fs.reduce((x, { base, e }) => x * base ** e, 1);
const tousPremiers = (fs) => fs.every(({ base }) => premier(base));
/** « $1$, $2$, $4$ et $7$ » ou « $1$, $2$, $4$, $7$ ». */
const liste = (xs, et = true) => (et && xs.length > 1 ? `$${xs.slice(0, -1).join("$, $")}$ et $${xs.at(-1)}$` : `$${xs.join("$, $")}$`);
const milliers = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");

/* ── Relire les schémas ──────────────────────────────────────────────────── */

/** Les arguments de `nom(…)` dans le bloc, parsés en JSON (virgules finales ôtées). */
function appel(bloc, nom) {
  const i = bloc.indexOf(`${nom}(`);
  if (i < 0) return null;
  let prof = 0;
  let j = i + nom.length;
  for (; j < bloc.length; j++) {
    if (bloc[j] === "(") prof++;
    if (bloc[j] === ")" && --prof === 0) break;
  }
  const dedans = bloc
    .slice(i + nom.length + 1, j)
    .replace(/,(\s*\n\s*[\]}])/g, "$1")
    .replace(/,\s*$/, "");
  return dedans;
}
const grilleDe = (bloc) => {
  const t = appel(bloc, "grille");
  if (t === null) return null;
  const [entete, lignes, surligne = []] = JSON.parse(`[${t}]`);
  return { entete, lignes, surligne };
};
const echellesDe = (bloc) =>
  [...bloc.matchAll(/\{ e: (\[\[[^\n]*?\]\]), r: "([^"]*)" \}/g)].map((m) => ({ e: JSON.parse(m[1]), r: m[2] }));

function verifier(source, v) {
  const { corrections, enonces, blocs } = lireFeuille(source);
  const c = (k) => corrections[k - 1] ?? "";
  const b = (k) => blocs[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");
  const grilleOk = (k, quoi, test) => {
    const g = grilleDe(b(k));
    v.ok(`${k}. le schéma : ${quoi}`, !!g && test(g), g ? JSON.stringify(g.lignes).slice(0, 140) : "pas de grille");
  };
  /** Une échelle dessinée : chaque étape divise par le PLUS PETIT premier, la
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
  /** La décomposition de n, trouvée par force brute, écrite « n = … » dans le corrigé. */
  const dec = (k, n, avant = "") => {
    const fs = lireProduit(uni(n));
    v.ok(`${k}. ${n} = ${uni(n)} (facteurs premiers, produit ${valeur(fs)})`, valeur(fs) === n && tousPremiers(fs));
    dit(k, `${avant}${n} = ${tex(n)}$`);
  };
  const oui = (x) => (x ? "oui" : "non");

  v.titre("★ Un seul geste");
  v.ok("1. 104 = 8 × 13, donc 13 divise 104", 104 % 13 === 0 && 104 / 8 === 13);
  const d28 = diviseurs(28);
  dit(1, `Les diviseurs de $28$ sont ${liste(d28)}.`);
  v.ok("1. on peut s'arrêter à 6 : 6 × 6 > 28", 6 * 6 > 28 && 5 * 5 < 28);
  dit(1, `$96 = 8 \\times ${96 / 8}$ : oui`);
  dit(1, `$52 = 5 \\times ${Math.floor(52 / 5)} + ${52 % 5}$`);
  dit(1, `Réponse : a) diviseur, multiple ; b) ${liste(d28, false)} ; c) ${96 % 8 === 0 ? "oui" : "non"} ; d) ${52 % 5 === 0 ? "oui" : "non"}.`, "la réponse");
  grilleOk(1, "chaque produit vaut 28, et les paires donnent tous les diviseurs", (g) => {
    const vus = g.lignes.flatMap(([p]) => p.split(" × ").map(Number));
    return g.lignes.every(([p]) => valeur(lireProduit(p)) === 28) && JSON.stringify([...new Set(vus)].sort((x, y) => x - y)) === JSON.stringify(d28);
  });

  const q2 = Math.floor(100 / 7);
  dit(2, `$100 = 7 \\times ${q2} + ${100 % 7}$`);
  const m7 = [...Array(200).keys()].filter((x) => x > 0 && x % 7 === 0);
  const proche = m7.reduce((best, x) => (Math.abs(x - 100) < Math.abs(best - 100) ? x : best));
  dit(2, `le plus proche est $${proche}$`);
  const entre = m7.filter((x) => x >= 50 && x <= 80);
  dit(2, `Réponse : $100 = 7 \\times ${q2} + ${100 % 7}$ ; non ; $${proche}$ ; ${liste(entre)}.`, "la réponse");
  grilleOk(2, "chaque « 7 × k » est juste, et le rouge = les multiples entre 50 et 80, plus 98", (g) =>
    g.lignes.every(([p, m]) => valeur(lireProduit(p)) === Number(m)) &&
    JSON.stringify(g.surligne.map((i) => Number(g.lignes[i][1]))) === JSON.stringify([...entre, proche]),
  );

  const nb3 = [1530, 2745, 8124];
  const div3 = [2, 3, 5, 9, 10];
  const par = (n) => div3.filter((d) => n % d === 0);
  v.ok(`3. 1 530 → ${par(1530)} ; 2 745 → ${par(2745)} ; 8 124 → ${par(8124)}`, true);
  dit(3, `Réponse : $1\\,530$ est divisible par les cinq ; $2\\,745$ par ${liste(par(2745))} ; $8\\,124$ par ${liste(par(8124))}.`, "la réponse");
  v.ok("3. 1 530 est divisible par les cinq", par(1530).length === 5);
  dit(3, `$8\\,124 = 3 \\times ${milliers(8124 / 3)}$`);
  grilleOk(3, "chaque case oui/non recalculée par le reste", (g) =>
    JSON.stringify(g.entete.slice(1).map(Number)) === JSON.stringify(div3) &&
    g.lignes.every(([n, ...cases], i) => Number(n.replace(/\s/g, "")) === nb3[i] && cases.every((x, j) => x === oui(nb3[i] % div3[j] === 0))),
  );

  const chiffres = [...Array(10).keys()];
  const a4 = chiffres.map((x) => 3402 + 10 * x).filter((n) => n % 9 === 0);
  const b4 = chiffres.map((x) => 508 + 10 * x).filter((n) => n % 3 === 0);
  const c4 = chiffres.map((x) => 710 + x).filter((n) => n % 2 === 0 && n % 3 === 0);
  dit(4, `Réponse : a) ${a4.map((n) => `$${milliers(n)}$`).join(" ou ")} ; b) ${b4.map((n) => `$${n}$`).slice(0, -1).join(", ")} ou $${b4.at(-1)}$ ; c) ${c4.map((n) => `$${n}$`).join(" ou ")}.`, "la réponse, retrouvée en essayant les dix chiffres");
  grilleOk(4, "sommes et verdicts des chiffres pairs de 71■", (g) =>
    g.lignes.every(([x, s, d]) => Number(x) % 2 === 0 && Number(s) === 8 + Number(x) && d === oui((710 + Number(x)) % 3 === 0)) && g.lignes.length === 5 && g.surligne.join() === "2",
  );

  const nb5 = [31, 39, 49, 53, 87, 91];
  const premiers5 = nb5.filter(premier);
  dit(5, `Réponse : ${liste(premiers5)} sont premiers ; les autres non.`, "la réponse");
  for (const n of nb5.filter((x) => !premier(x))) {
    const p = diviseurs(n)[1];
    dit(5, `$${n} = ${p} \\times ${n / p}$`);
  }
  grilleOk(5, "plus petit diviseur premier et verdict, nombre par nombre", (g) =>
    g.lignes.every(([n, p, verdict]) => {
      const pp = diviseurs(Number(n))[1];
      return premier(Number(n)) ? p === "aucun" && verdict === "oui" : Number(p) === pp && verdict === "non";
    }) && JSON.stringify(g.surligne) === JSON.stringify(g.lignes.map((l, i) => (l[2] === "oui" ? i : -1)).filter((i) => i >= 0)),
  );

  const p6 = [...Array(21).keys()].map((i) => 60 + i).filter(premier);
  dit(6, `Réponse : ${liste(p6)}.`, "la réponse");
  dit(6, "$77 = 7 \\times 11$");
  v.ok("6. on peut s'arrêter à 7 : 11² > 80", 11 * 11 > 80);
  const cr6 = /crible\((\d+), (\d+), (\[[^\]]*\])\)/.exec(b(6));
  v.ok("6. le crible dessiné va de 60 à 80 et colore exactement les premiers", !!cr6 && cr6[1] === "60" && cr6[2] === "80" && JSON.stringify(JSON.parse(cr6[3])) === JSON.stringify(p6), cr6?.[0]);

  for (const n of [90, 150, 132]) {
    dec(7, n, "$");
    dit(7, `${facteurs(n).join(" \\times ")} = ${tex(n)}$`, `${n} : le produit développé, puis regroupé`);
    echelleOk(7, n);
  }
  dit(7, `Réponse : $90 = ${tex(90)}$ ; $150 = ${tex(150)}$ ; $132 = ${tex(132)}$.`, "la réponse");

  const ecritures8 = [
    [350, "2 × 7 × 25"],
    [52, "2² × 13"],
    [44, "4 × 11"],
    [195, "3 × 5 × 13"],
    [34, "1 × 2 × 17"],
  ];
  const bonnes8 = ecritures8.map(([n, t]) => valeur(lireProduit(t)) === n && tousPremiers(lireProduit(t)));
  v.ok("8. chaque écriture vaut bien son nombre", ecritures8.every(([n, t]) => valeur(lireProduit(t)) === n));
  v.ok("8. seules b) et d) n'ont que des facteurs premiers", JSON.stringify(bonnes8) === "[false,true,false,true,false]");
  ["a", "b", "c", "d", "e"].forEach((l, i) => dit(8, `${l}) ${bonnes8[i] ? "Oui" : "Non"} :`));
  for (const [n] of ecritures8.filter((_, i) => !bonnes8[i])) dit(8, `$${n} = ${tex(n)}$`);
  grilleOk(8, "facteur fautif et décomposition, écriture par écriture", (g) =>
    g.lignes.every(([ecr, fautif, decomp], i) => {
      const [n, t] = ecr.split(" = ");
      const fs = lireProduit(t);
      const nonPremiers = fs.filter((f) => !premier(f.base)).map((f) => String(f.base));
      return Number(n) === ecritures8[i][0] && t === ecritures8[i][1] && (nonPremiers.length ? nonPremiers.join() === fautif : fautif === "aucun") && decomp === uni(Number(n));
    }),
  );

  v.titre("★★ Type devoir");
  dec(9, 360, "Donc $");
  echelleOk(9, 360);
  const d9 = [8, 7, 27, 40].map((d) => 360 % d === 0);
  v.ok("9. divisible par 8 et 40, pas par 7 ni 27", JSON.stringify(d9) === "[true,false,false,true]");
  dit(9, `$360 = 8 \\times ${360 / 8}$`);
  dit(9, `$360 = 40 \\times ${360 / 40}$`);
  dit(9, `$27 = ${tex(27)}$`);

  dec(10, 168, " : $");
  dec(10, 120, " : $");
  echelleOk(10, 168);
  echelleOk(10, 120);
  const g10 = pgcd(168, 120);
  dit(10, `$\\text{PGCD}(168 ; 120) = 2^3 \\times 3 = ${g10}$`);
  dit(10, `$168 = ${g10} \\times ${168 / g10}$ et $120 = ${g10} \\times ${120 / g10}$`);
  v.ok(`10. le piège vaut ${ppcm(168, 120)}, le plus petit multiple commun`, ppcm(168, 120) === 840);
  dit(10, "= 840$");

  for (const [a, bb] of [[140, 196], [234, 390]]) {
    const g = pgcd(a, bb);
    v.ok(`11. PGCD(${a} ; ${bb}) = ${g}`, true);
    dit(11, `$${a} = ${tex(a)}$ et $${bb} = ${tex(bb)}$`);
    dit(11, `= ${g}$`);
    dit(11, `$\\dfrac{${a}}{${bb}} = \\dfrac{${a / g}}{${bb / g}}$`);
    v.ok(`11. ${a / g}/${bb / g} est irréductible`, pgcd(a / g, bb / g) === 1);
  }
  dit(11, "\\dfrac{140}{196} = \\dfrac{70}{98}$");
  v.ok("11. 70/98 se simplifie encore par 14", pgcd(70, 98) === 14);
  grilleOk(11, "facteurs relus et remultipliés, « en commun » = PGCD", (g) => {
    const [l1, l2, l3, l4, l5, l6] = g.lignes;
    const bonne = ([n, t]) => valeur(lireProduit(t)) === Number(n) && tousPremiers(lireProduit(t));
    const commun = ([, t], x) => Number(t.split(" = ")[1]) === x && valeur(lireProduit(t.split(" = ")[0])) === x;
    return bonne(l1) && bonne(l2) && bonne(l4) && bonne(l5) && commun(l3, pgcd(140, 196)) && commun(l6, pgcd(234, 390));
  });

  v.ok("12. 221 = 13 × 17 n'est pas premier, 223 l'est", !premier(221) && premier(223) && 13 * 17 === 221);
  v.ok("12. 15 × 15 = 225 dépasse 221 et 223, 14 × 14 non", 15 * 15 > 223 && 14 * 14 < 221);
  dit(12, "Réponse : $221$ n'est pas premier ; $223$ est premier.");
  for (const [p, n] of [[7, 221], [11, 221], [13, 221]]) dit(12, `$${p} \\times ${Math.floor(n / p)} = ${p * Math.floor(n / p)}$, reste $${n % p}$`);
  for (const p of [7, 11, 13]) dit(12, `Par $${p}$ : reste $${223 % p}$`);
  grilleOk(12, "les restes des divisions, essai par essai", (g) =>
    g.lignes.every(([p, r1, r2]) => premier(Number(p)) && Number(r1) === 221 % Number(p) && Number(r2) === 223 % Number(p)) && g.lignes.map((l) => l[0]).join() === "2,3,5,7,11,13",
  );

  const P = [...Array(200).keys()].filter(premier);
  const a13 = P.every((x) => P.every((y) => (x + y) % 2 === 0));
  const b13 = [...Array(2000).keys()].every((n) => n % 9 !== 0 || n % 3 === 0);
  const c13 = [...Array(2000).keys()].every((n) => !(n % 4 === 0 && n % 6 === 0) || n % 24 === 0);
  const d13 = P.every((p) => p <= 2 || p % 2 === 1);
  const v13 = [a13, b13, c13, d13];
  v.ok("13. faux, vrai, faux, vrai (balayé jusqu'à 2 000)", JSON.stringify(v13) === "[false,true,false,true]");
  ["a", "b", "c", "d"].forEach((l, i) => dit(13, `${l}) ${v13[i] ? "VRAI" : "FAUX"}.`));
  const contre = [...Array(100).keys()].find((n) => n > 0 && n % 4 === 0 && n % 6 === 0 && n % 24 !== 0);
  v.ok(`13. le plus petit contre-exemple du c) est ${contre}`, contre === 12);
  dit(13, `c) FAUX. $${contre}$ est divisible`);
  dit(13, `il suffit de $2^2 \\times 3 = ${ppcm(4, 6)}$`);
  dit(13, "Réponse : faux, vrai, faux, vrai.");

  dec(14, 72, "Donc $");
  const d72 = diviseurs(72);
  dit(14, `Les diviseurs de $72$ sont ${liste(d72)} : il y en a $${d72.length}$`);
  v.ok("14. 72 n'est pas divisible par 16", 72 % 16 !== 0);
  grilleOk(14, "les paires de diviseurs, de produit 72, les couvrent tous", (g) =>
    g.lignes.every(([x, y, p]) => Number(x) * Number(y) === 72 && Number(p) === 72) &&
    JSON.stringify(g.lignes.flatMap(([x, y]) => [Number(x), Number(y)]).sort((a, z) => a - z)) === JSON.stringify(d72),
  );

  const d48 = diviseurs(48);
  const d80 = diviseurs(80);
  const com = d48.filter((d) => 80 % d === 0);
  dit(15, `Diviseurs de $48$ : ${liste(d48, false)}.`);
  dit(15, `Diviseurs de $80$ : ${liste(d80, false)}.`);
  dit(15, `Les diviseurs communs sont ${liste(com)}. Le plus grand : $\\text{PGCD}(48 ; 80) = ${pgcd(48, 80)}$`);
  dit(15, `$48 = ${tex(48)}$ et $80 = ${tex(80)}$`);
  v.ok("15. les diviseurs communs sont les diviseurs du PGCD", JSON.stringify(com) === JSON.stringify(diviseurs(pgcd(48, 80))));
  grilleOk(15, "les trois listes du tableau sont les listes recalculées", (g) =>
    [d48, d80, com].every((l, i) => g.lignes[i][1] === l.join(", ")) && g.surligne.join() === "2",
  );

  const cand16 = [...Array(90).keys()].map((i) => i + 10).filter((n) => Math.floor(n / 10) + (n % 10) === 10);
  const renverse = (n) => (n % 10) * 10 + Math.floor(n / 10);
  const sol16 = cand16.filter((n) => premier(n) && premier(renverse(n)) && Math.floor(n / 10) < n % 10);
  v.ok(`16. une seule solution : ${sol16}`, sol16.length === 1);
  dit(16, `Réponse : je suis $${sol16[0]}$.`);
  dit(16, `${cand16.map((n) => `$${n}$`).join(", ")}.`, "la liste des neuf candidats");
  dit(16, `Restent les premiers : ${liste(cand16.filter(premier))}.`);
  grilleOk(16, "verdicts « premier » et « renversé premier » des neuf candidats", (g) =>
    JSON.stringify(g.lignes.map((l) => Number(l[0]))) === JSON.stringify(cand16) &&
    g.lignes.every(([n, p, r]) => p === oui(premier(Number(n))) && (premier(Number(n)) ? r === `${oui(premier(renverse(Number(n))))} (${renverse(Number(n))})` : r === "—")) &&
    g.surligne.map((i) => Number(g.lignes[i][0])).join() === sol16.join(),
  );

  v.titre("★★★ Problèmes");
  dit(17, `$294 = 35 \\times ${Math.floor(294 / 35)} + ${294 % 35}$`);
  v.ok("17. 35 divise 210 mais pas 294", 210 % 35 === 0 && 294 % 35 !== 0);
  dec(17, 210, " : $");
  dec(17, 294, " : $");
  echelleOk(17, 210);
  echelleOk(17, 294);
  const g17 = pgcd(210, 294);
  dit(17, `$\\text{PGCD}(210 ; 294) = 2 \\times 3 \\times 7 = ${g17}$`);
  dit(17, `Réponse : $${g17}$ sacs au plus, avec $${210 / g17}$ bouteilles d'eau et $${294 / g17}$ bananes dans chacun.`);

  const g18 = pgcd(480, 300);
  v.ok("18. 45 ne divise ni 480 ni 300", 480 % 45 !== 0 && 300 % 45 !== 0);
  dit(18, `$480 = 45 \\times ${Math.floor(480 / 45)} + ${480 % 45}$`);
  dit(18, `$480 = ${tex(480)}$ et $300 = ${tex(300)}$`);
  dit(18, `= ${g18}$. Les dalles mesurent $${g18}$ cm`);
  dit(18, `Il en faut $${480 / g18} \\times ${300 / g18} = ${(480 / g18) * (300 / g18)}$`);
  dit(18, `$${milliers(480 * 300)} \\div ${milliers(g18 * g18)} = ${(480 * 300) / (g18 * g18)}$`);
  dit(18, `Réponse : des dalles de $${g18}$ cm de côté, $${(480 / g18) * (300 / g18)}$ en tout.`);
  const pv = /pavage\((\d+), (\d+), (\d+)\)/.exec(b(18));
  v.ok("18. le pavage dessiné : 480 sur 300, en carrés de côté le PGCD", !!pv && Number(pv[1]) === 480 && Number(pv[2]) === 300 && Number(pv[3]) === g18, pv?.[0]);

  const m19 = ppcm(12, 30);
  dit(19, `$12 = ${tex(12)}$ et $30 = ${tex(30)}$`);
  dit(19, `$2^2 \\times 3 \\times 5 = ${m19}$`);
  dit(19, `Jupiter fait $${m19} \\div 12 = ${m19 / 12}$ tours, Saturne $${m19} \\div 30 = ${m19 / 30}$ tours`);
  dit(19, `$12 \\times 30 = ${12 * 30}$`);
  dit(19, `$2 \\times 3 = ${pgcd(12, 30)}$`);
  dit(19, `Réponse : au bout de $${m19}$ ans environ, après $${m19 / 12}$ tours de Jupiter et $${m19 / 30}$ tours de Saturne.`);
  v.ok("19. le cycle réel : 5 × 11,86 et 2 × 29,46 tombent près de 60", Math.abs(5 * 11.86 - m19) < 1 && Math.abs(2 * 29.46 - m19) < 1.5);
  const mult = (p) => [...Array(m19 / p).keys()].map((i) => (i + 1) * p).join(", ");
  grilleOk(19, "les retours listés sont les multiples jusqu'au premier commun", (g) => g.lignes[0][1] === mult(12) && g.lignes[1][1] === mult(30));

  dec(20, 330, "Donc $");
  const sports = [["basket", 5], ["handball", 7], ["football", 11], ["rugby à XV", 15]];
  for (const [, n] of sports) {
    if (330 % n === 0) dit(20, `$330 = ${n} \\times ${330 / n}$ : $${330 / n}$ équipes`);
    else dit(20, `$330 = ${n} \\times ${Math.floor(330 / n)} + ${330 % n}$`);
  }
  const groupes20 = diviseurs(330).filter((d) => d >= 20 && d <= 40);
  dit(20, `des groupes de ${groupes20.map((d) => `$${d}$`).slice(0, -1).join(", ")} ou $${groupes20.at(-1)}$ personnes`, "les tailles de groupe");
  v.ok("20. 15 et 55 encadrent bien l'intervalle parmi les diviseurs", diviseurs(330).filter((d) => d < 20).at(-1) === 15 && diviseurs(330).find((d) => d > 40) === 55);
  grilleOk(20, "joueurs et nombre d'équipes, sport par sport", (g) =>
    g.lignes.every(([s, j, e], i) => s === sports[i][0] && Number(j) === sports[i][1] && e === (330 % sports[i][1] === 0 ? String(330 / sports[i][1]) : "impossible")),
  );

  v.ok("tous les énoncés sont là", enonces.length === 20);
  // ⛔ Les schémas sont du HTML/SVG nu : ni `$`, ni `\`, ni `^` dans leurs cases.
  const schemas = blocs.map((bl) => (bl.split("schema:")[1] ?? "").split("micros:")[0]);
  const sales = schemas.filter((s) => /[$\\^]/.test(s));
  v.ok(`${schemas.filter(Boolean).length} schémas, aucun $ ni LaTeX dans leurs cases`, sales.length === 0 && schemas.filter(Boolean).length >= 15, sales[0]?.slice(0, 100));
}

lancer({
  nom: "MULTIPLES, DIVISEURS ET FACTEURS PREMIERS · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-arithmetique.tsx",
  notionId: "entier_arithmetique",
  classe: "3e",
  verifier,
  casses: [
    ["ex. 1 : 3 compté parmi les diviseurs de 28", "Les diviseurs de $28$ sont $1$, $2$, $4$, $7$, $14$ et $28$.", "Les diviseurs de $28$ sont $1$, $2$, $3$, $4$, $7$, $14$ et $28$."],
    ["ex. 1 : une paire fausse dans le tableau", "[\"4 × 7\", \"4 et 7\"]", "[\"3 × 9\", \"3 et 9\"]"],
    ["ex. 2 : 56 oublié (table commencée à 7 × 10)", "$56$, $63$, $70$ et $77$.", "$63$, $70$ et $77$."],
    ["ex. 3 : 8 124 déclaré divisible par 9", "[\"8 124\", \"oui\", \"oui\", \"non\", \"non\", \"non\"]", "[\"8 124\", \"oui\", \"oui\", \"non\", \"oui\", \"non\"]"],
    ["ex. 4 : le chiffre 9 oublié", "a) $3\\\\,402$ ou $3\\\\,492$ ;", "a) $3\\\\,402$ ;"],
    ["ex. 5 : 91 déclaré premier", "Réponse : $31$ et $53$ sont premiers", "Réponse : $31$, $53$ et $91$ sont premiers"],
    ["ex. 6 : 77 gardé dans le crible", "crible(60, 80, [61, 67, 71, 73, 79])", "crible(60, 80, [61, 67, 71, 73, 77, 79])"],
    ["ex. 7 : 132 = 4 × 33 dans l'échelle", "{ e: [[132, 2], [66, 2], [33, 3], [11, 11]], r: \"132 = 2² × 3 × 11\" }", "{ e: [[132, 4], [33, 3], [11, 11]], r: \"132 = 4 × 3 × 11\" }"],
    ["ex. 8 : le 1 laissé dans la décomposition", "e) Non : $1$ n'est pas", "e) Oui : $1$ n'est pas"],
    ["ex. 9 : 360 = 2² × 3² × 5", "Donc $360 = 2^3 \\\\times 3^2 \\\\times 5$.", "Donc $360 = 2^2 \\\\times 3^2 \\\\times 5$."],
    ["ex. 10 : le PGCD pris avec tous les facteurs", "$\\\\text{PGCD}(168 ; 120) = 2^3 \\\\times 3 = 24$", "$\\\\text{PGCD}(168 ; 120) = 2^3 \\\\times 3 = 12$"],
    ["ex. 11 : simplifié par 2 seulement", "donc $\\\\dfrac{140}{196} = \\\\dfrac{5}{7}$", "donc $\\\\dfrac{140}{196} = \\\\dfrac{70}{98}$"],
    ["ex. 11 : un PGCD faux dans le tableau", "[\"en commun\", \"2 × 3 × 13 = 78\"]", "[\"en commun\", \"2 × 13 = 26\"]"],
    ["ex. 12 : un reste faux", "[\"7\", \"4\", \"6\"]", "[\"7\", \"4\", \"5\"]"],
    ["ex. 13 : 4 et 6 donnent 24", "c) FAUX. $12$ est divisible", "c) VRAI. $12$ est divisible"],
    ["ex. 14 : 11 diviseurs (1 ou 72 oublié)", "$36$ et $72$ : il y en a $12$", "$36$ et $72$ : il y en a $11$"],
    ["ex. 15 : 80 pris pour plus grand diviseur commun", "Le plus grand : $\\\\text{PGCD}(48 ; 80) = 16$", "Le plus grand : $\\\\text{PGCD}(48 ; 80) = 8$"],
    ["ex. 16 : la réponse 73", "Réponse : je suis $37$.", "Réponse : je suis $73$."],
    ["ex. 17 : les deux 7 gardés", "$\\\\text{PGCD}(210 ; 294) = 2 \\\\times 3 \\\\times 7 = 42$", "$\\\\text{PGCD}(210 ; 294) = 2 \\\\times 3 \\\\times 7 = 294$"],
    ["ex. 18 : un pavage à 30 cm", "pavage(480, 300, 60)", "pavage(480, 300, 30)"],
    ["ex. 19 : 12 × 30 = 360 ans", "Réponse : au bout de $60$ ans environ", "Réponse : au bout de $360$ ans environ"],
    ["ex. 20 : le handball accepté", "[\"handball\", \"7\", \"impossible\"]", "[\"handball\", \"7\", \"47\"]"],
    ["une micro d'une autre notion", "micros: [\"entier_multiple_diviseur\", \"entier_pgcd_ppcm\"],", "micros: [\"entier_racine_calculer\", \"entier_pgcd_ppcm\"],"],
    ["un $ dans un canvas", "[\"2\", \"1\", \"1\"]", "[\"$2$\", \"1\", \"1\"]"],
  ],
});
