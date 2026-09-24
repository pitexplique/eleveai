// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Nombres rationnels »
// de 3e (lib/fiches-exercices/maths-3e-nombres-rationnels.tsx).
//
// ⭐ L'AUTRE CHEMIN : chaque résultat est refait ici en fractions EXACTES (Q,
// plus, fois, div du module commun) — le corrigé passe par le dénominateur
// commun ou par le décimal, le script par le produit en croix et le PGCD. Puis
// le corrigé doit ÉCRIRE ce résultat dans sa phrase « Réponse : … ». Les
// chaînes « a = b = c » du corrigé sont relues telles qu'elles sont écrites
// (`outilsEgalites`) : tous leurs membres doivent être égaux.
//
// ⭐ ET LES DESSINS SONT RELUS DANS LE SOURCE : chaque point posé sur une droite
// (`intervalles(..., points)`) doit être à la place de son étiquette (« −5/8 »
// en −0,625), chaque intervalle entre les bons nombres, chaque case de tableau
// égale à sa voisine.
//
//   node scripts/verifier-exercices-rationnels-3e.mjs

import { Q, D, plus, moins, fois, div, egal, inf, versNombre, tex, texFrac, lireFeuille, outilsEgalites, lancer } from "./verifier-exercices-commun.mjs";

/** « −5/8 », « 0,875 », « 0,583… » → une fraction exacte (ou null). */
function lab(s) {
  const t = s.replace(/−/g, "-").replace(/\s*\(faux\)/, "").replace(/…/, "").trim();
  const m = /^(-?\d+)\/(\d+)$/.exec(t);
  if (m) return Q(m[1], m[2]);
  if (/^-?\d+(,\d+)?$/.test(t)) return D(t);
  return null;
}
const proche = (x, q, tol = 0.001) => Math.abs(x - versNombre(q)) < tol;
/** Les points d'un bloc : `{ value: -0.75, label: "−3/4"`. */
const pointsDe = (bloc) => [...bloc.matchAll(/\{ value: (-?[\d.]+), label: "([^"]+)"/g)].map((m) => ({ value: Number(m[1]), label: m[2] }));
/** Les intervalles d'un bloc : `{ de: -0.75, a: 0,`. */
const ivsDe = (bloc) => [...bloc.matchAll(/\{ de: (-?[\d.]+), a: (-?[\d.]+),/g)].map((m) => ({ de: Number(m[1]), a: Number(m[2]) }));
/** Les tableaux d'un bloc : `tableau([...], [...])`. */
const tableauxDe = (bloc) =>
  [...bloc.matchAll(/tableau\(\[([^\]]*)\], \[([^\]]*)\]\)/g)].map((m) => [m[1], m[2]].map((l) => [...l.matchAll(/"([^"]*)"/g)].map((x) => x[1])));
/** Les décimales de n/d par la division posée, chiffre après chiffre. */
function decimales(n, d, k) {
  let r = n % d;
  let s = "";
  for (let i = 0; i < k; i++) {
    r *= 10;
    s += Math.floor(r / d);
    r %= d;
  }
  return s;
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const bloc = (k) => f.blocs[k - 1] ?? "";
  const egalites = outilsEgalites(v, f);
  const ecrit = (k, texte) => v.ok(`${k}. le corrigé écrit « ${texte} »`, c(k).includes(texte), texte);
  /** Chaque point dont l'étiquette est un nombre est à sa place. */
  const pointsFideles = (k) => {
    const ps = pointsDe(bloc(k));
    v.ok(`${k}. des points posés sur la droite`, ps.length > 0);
    for (const { value, label } of ps) {
      const parts = label.split(" = ").map(lab);
      if (parts.some((p) => p === null)) continue;
      v.ok(`${k}. le point « ${label} » est en ${value}`, parts.every((p) => proche(value, p)), String(value));
    }
  };
  const intervalle = (k, de, a) => {
    const iv = ivsDe(bloc(k))[0];
    v.ok(`${k}. l'intervalle dessiné va de ${versNombre(de).toFixed(3)} à ${versNombre(a).toFixed(3)}`, !!iv && proche(iv.de, de) && proche(iv.a, a), JSON.stringify(iv));
  };
  /** Un ordre croissant : les nombres sont vraiment rangés, et la chaîne est écrite. */
  const ordre = (k, paires) => {
    const range = paires.every((p, i) => i === 0 || inf(paires[i - 1][0], p[0]));
    const chaine = paires.map((p) => p[1]).join(" < ");
    v.ok(`${k}. ${chaine}`, range && c(k).includes(`Réponse : $${chaine}$`), `rangé : ${range}`);
  };
  const irr = (k, q) => ecrit(k, texFrac(q));

  v.titre("★ Un seul geste");
  // 1
  egalites(1, "-6 = \\dfrac{-6}{1}");
  egalites(1, "0{,}35 = \\dfrac{35}{100} = \\dfrac{7}{20}");
  egalites(1, "-1{,}2 = \\dfrac{-12}{10} = \\dfrac{-6}{5}");
  v.ok("1. 7/20 et 6/5 sont irréductibles", egal(D("0,35"), Q(7, 20)) && Q(7, 20).d === 20n && egal(D("-1,2"), Q(-6, 5)) && Q(-6, 5).d === 5n);
  // 2
  let zero = false;
  try {
    Q(5, 0);
  } catch {
    zero = true;
  }
  v.ok("2. 5/0 ne se calcule pas", zero);
  egalites(2, "\\dfrac{0}{5} = 0");
  egalites(2, "\\dfrac{-3}{-4} = \\dfrac{3}{4}");
  egalites(2, "\\dfrac{9}{3} = 3");
  ecrit(2, "Réponse : seule $\\dfrac{5}{0}$ ne désigne aucun nombre");
  // 3
  const lait = Q(7, 8);
  ecrit(3, `$7 \\div 8 = ${tex(lait)}$`);
  ecrit(3, `Réponse : je mesure $${tex(lait)}$ L de lait, soit $875$ mL`);
  egalites(3, `${tex(lait)} \\times 8 = 7`);
  pointsFideles(3);
  intervalle(3, Q(0), lait);
  // 4
  v.ok("4. 0,15 = 3/20, irréductible", egal(D("0,15"), Q(3, 20)) && Q(15, 100).n === 3n);
  egalites(4, "\\dfrac{15}{100} = \\dfrac{3}{20}");
  ecrit(4, `Réponse : $0{,}15 = ${texFrac(D("0,15"))}$`);
  // 5
  ecrit(5, `$2 \\div 3 = 0{,}${decimales(2, 3, 3)}\\ldots$`);
  ecrit(5, `\\approx ${tex(Q(Math.round((2 / 3) * 100), 100))}$ au centième`);
  egalites(5, `0{,}67 \\times 3 = ${tex(fois(D("0,67"), Q(3)))}`);
  {
    const [[, ...h], [, ...r]] = tableauxDe(bloc(5))[0] ?? [[], []];
    v.ok("5. le tableau : chaque nombre fois 3", h.length === 2 && h.every((x, i) => egal(fois(lab(x), Q(3)), lab(r[i]))), JSON.stringify([h, r]));
  }
  // 6
  v.ok("6. 7/9 < 5/6", inf(Q(7, 9), Q(5, 6)));
  egalites(6, "\\dfrac{5}{6} = \\dfrac{15}{18}");
  egalites(6, "\\dfrac{7}{9} = \\dfrac{14}{18}");
  ecrit(6, "Réponse : la gourde remplie aux $\\dfrac{5}{6}$");
  {
    const [[, ...h], [, ...r]] = tableauxDe(bloc(6))[0] ?? [[], []];
    v.ok("6. le tableau : chaque fraction et son écriture en 18es", h.length === 2 && h.every((x, i) => egal(lab(x), lab(r[i])) && r[i].endsWith("/18")), JSON.stringify([h, r]));
  }
  // 7
  ordre(7, [[Q(-3, 4), "-\\dfrac{3}{4}"], [Q(-2, 5), "-\\dfrac{2}{5}"]]);
  pointsFideles(7);
  intervalle(7, Q(-3, 4), Q(0));
  // 8
  const s8 = plus(Q(3, 4), Q(1, 6));
  egalites(8, `\\dfrac{3}{4} + \\dfrac{1}{6} = \\dfrac{9}{12} + \\dfrac{2}{12} = ${texFrac(s8)}`);
  ecrit(8, `Réponse : $\\dfrac{3}{4} + \\dfrac{1}{6} = ${texFrac(s8)}$`);
  v.ok("8. le faux 4/10 est plus petit que 3/4", inf(Q(4, 10), Q(3, 4)));
  pointsFideles(8);
  intervalle(8, Q(3, 4), s8);

  v.titre("★★ Type devoir");
  // 9
  egalites(9, "\\dfrac{9}{12} = \\dfrac{3}{4} = 0{,}75");
  egalites(9, "-0{,}8 = \\dfrac{-8}{10} = \\dfrac{-4}{5}");
  ecrit(9, `$1 \\div 7 = 0{,}${decimales(1, 7, 12)}\\ldots$`);
  {
    const [[, ...h], [, ...r]] = tableauxDe(bloc(9))[0] ?? [[], []];
    v.ok("9. le tableau : chaque nombre égal à sa forme irréductible", h.length === 4 && h.every((x, i) => egal(lab(x), lab(r[i])) && lab(r[i]).d === BigInt(r[i].split("/")[1])), JSON.stringify([h, r]));
  }
  // 10
  const marathon = D("42,195");
  v.ok("10. 42,195 = 8439/200, irréductible, et 200 = 2 × 2 × 2 × 5 × 5", egal(marathon, Q(8439, 200)) && marathon.d === 200n && 2 * 2 * 2 * 5 * 5 === 200);
  egalites(10, "42{,}195 = \\dfrac{42\\,195}{1\\,000}");
  egalites(10, "\\dfrac{42\\,195}{1\\,000} = \\dfrac{8\\,439}{200}");
  const parcouru = fois(marathon, Q(2, 5));
  ecrit(10, `$42{,}195 \\times 2 = ${tex(fois(marathon, Q(2)))}$`);
  ecrit(10, `Réponse : elle a parcouru $${tex(parcouru)}$ km`);
  // 11
  ordre(11, [
    [D("0,58"), "0{,}58"],
    [Q(7, 12), "\\dfrac{7}{12}"],
    [Q(3, 5), "\\dfrac{3}{5}"],
    [Q(2, 3), "\\dfrac{2}{3}"],
  ]);
  ecrit(11, `$58 \\times 12 = ${58 * 12}$ et $7 \\times 100 = ${7 * 100}$`);
  {
    const [[, ...h], [, ...r]] = tableauxDe(bloc(11))[0] ?? [[], []];
    const hs = h.map(lab);
    v.ok("11. le tableau : décimal fidèle, colonnes rangées", h.length === 4 && hs.every((x, i) => proche(versNombre(lab(r[i])), x, 0.001) && (i === 0 || inf(hs[i - 1], x))), JSON.stringify([h, r]));
  }
  // 12
  ordre(12, [
    [Q(-3, 4), "-\\dfrac{3}{4}"],
    [Q(-5, 8), "-\\dfrac{5}{8}"],
    [Q(-1, 2), "-\\dfrac{1}{2}"],
    [Q(1, 4), "\\dfrac{1}{4}"],
  ]);
  pointsFideles(12);
  intervalle(12, Q(-3, 4), Q(-1, 2));
  // 13
  const A = moins(Q(2, 3), fois(Q(5, 4), Q(2, 5)));
  ecrit(13, `Réponse : $A = ${texFrac(A)}$`);
  egalites(13, "\\dfrac{5}{4} \\times \\dfrac{2}{5} = \\dfrac{10}{20} = \\dfrac{1}{2}");
  egalites(13, "\\dfrac{2}{3} - \\dfrac{1}{2} = \\dfrac{4}{6} - \\dfrac{3}{6} = \\dfrac{1}{6}");
  const faux13 = fois(moins(Q(2, 3), Q(5, 4)), Q(2, 5));
  v.ok("13. de gauche à droite on trouve autre chose, et c'est écrit", !egal(faux13, A) && c(13).includes(`= ${texFrac(faux13)}$`));
  egalites(13, "-\\dfrac{7}{12} \\times \\dfrac{2}{5} = -\\dfrac{7}{30}");
  // 14
  ecrit(14, `Réponse : $\\dfrac{3}{4} \\div \\dfrac{9}{10} = ${texFrac(div(Q(3, 4), Q(9, 10)))}$`);
  egalites(14, "\\dfrac{3}{4} \\times \\dfrac{10}{9} = \\dfrac{30}{36} = \\dfrac{5}{6}");
  const gobelets = div(Q(3, 4), Q(3, 20));
  egalites(14, `\\dfrac{3}{4} \\times \\dfrac{20}{3} = \\dfrac{60}{12} = ${tex(gobelets)}`);
  ecrit(14, `Réponse : on remplit $${tex(gobelets)}$ gobelets`);
  egalites(14, "5 \\times \\dfrac{3}{20} = \\dfrac{15}{20} = \\dfrac{3}{4}");
  {
    const ps = pointsDe(bloc(14));
    v.ok("14. un point par gobelet, le k-ième en k × 3/20", ps.length === Number(gobelets.n) && ps.every((p, i) => p.label === String(i + 1) && proche(p.value, fois(Q(i + 1), Q(3, 20)))), JSON.stringify(ps));
    intervalle(14, Q(0), Q(3, 4));
  }
  // 15
  const B = plus(Q(-5, 6), Q(3, 4));
  const C = fois(Q(-2, 3), Q(-9, 4));
  ecrit(15, `Réponse : $B = ${texFrac(B)}$`);
  ecrit(15, `Réponse : $C = ${texFrac(C)}$`);
  egalites(15, "-\\dfrac{5}{6} + \\dfrac{3}{4} = -\\dfrac{10}{12} + \\dfrac{9}{12} = -\\dfrac{1}{12}");
  egalites(15, "\\left(-\\dfrac{2}{3}\\right) \\times \\left(-\\dfrac{9}{4}\\right) = \\dfrac{2 \\times 9}{3 \\times 4} = \\dfrac{18}{12} = \\dfrac{3}{2}");
  pointsFideles(15);
  intervalle(15, Q(-5, 6), B);
  // 16
  const milieu = (a, b) => div(plus(a, b), Q(2));
  const m1 = milieu(Q(1, 3), Q(1, 2));
  const m2 = milieu(Q(1, 3), m1);
  v.ok("16. 1/3 < 3/8 < 5/12 < 1/2 (deux milieux successifs)", egal(m1, Q(5, 12)) && egal(m2, Q(3, 8)) && inf(Q(1, 3), m2) && inf(m2, m1) && inf(m1, Q(1, 2)));
  egalites(16, "\\dfrac{1}{3} = \\dfrac{4}{12}");
  egalites(16, "\\dfrac{5}{12} = \\dfrac{10}{24}");
  egalites(16, "\\dfrac{9}{24} = \\dfrac{3}{8}");
  ecrit(16, `Réponse : $${texFrac(m2)}$ et $${texFrac(m1)}$ sont compris entre`);
  pointsFideles(16);
  intervalle(16, Q(1, 3), Q(1, 2));

  v.titre("★★★ Problèmes");
  // 17
  const fait = plus(Q(2, 5), Q(1, 3));
  const reste = moins(Q(1), fait);
  egalites(17, `\\dfrac{2}{5} + \\dfrac{1}{3} = \\dfrac{6}{15} + \\dfrac{5}{15} = ${texFrac(fait)}`);
  egalites(17, "\\dfrac{11}{15} = \\dfrac{22}{30}");
  v.ok("17. elle a dépassé la moitié", inf(Q(1, 2), fait) && c(17).includes("Réponse : oui, elle a dépassé la moitié"));
  egalites(17, `1 - \\dfrac{11}{15} = ${texFrac(reste)}`);
  ecrit(17, `Réponse : il lui reste $${tex(fois(reste, Q(45)))}$ km`);
  ecrit(17, `$${tex(fois(fait, Q(45)))} + ${tex(fois(reste, Q(45)))} = 45$`);
  v.ok("17. le faux 3/8 est plus petit que 2/5", inf(Q(3, 8), Q(2, 5)));
  pointsFideles(17);
  intervalle(17, Q(0), fait);
  // 18
  const T = { A: D("-3,5"), B: Q(-10, 3), C: Q(-15, 4), D: Q(-7, 2) };
  ecrit(18, `C : $${tex(T.C)}$ °C`);
  ecrit(18, `D : $${tex(T.D)}$ °C`);
  v.ok("18. A et D sont le même nombre", egal(T.A, T.D) && c(18).includes("$-3{,}5 = -\\dfrac{7}{2}$"));
  ecrit(18, `\\approx ${tex(Q(Math.round(versNombre(T.B) * 100), 100))}$`);
  {
    const rep = c(18).split("\\n").find((l) => l.startsWith("Réponse")) ?? "";
    const iC = rep.indexOf("C ("), iAD = rep.indexOf("A et D"), iB = rep.indexOf("B (");
    v.ok("18. l'ordre C, A = D, B", inf(T.C, T.A) && inf(T.A, T.B) && iC > 0 && iC < iAD && iAD < iB, rep);
    const ps = pointsDe(bloc(18));
    v.ok("18. chaque station est à sa place sur la droite", ps.length === 3 && ps.every((p) => p.label.split(" = ").every((s) => T[s] && proche(p.value, T[s]))), JSON.stringify(ps));
    intervalle(18, T.C, T.B);
  }
  // 19
  const x19 = D("0,995");
  v.ok("19. 0,99 < 0,995 < 1 et 0,995 = 199/200 irréductible", inf(D("0,99"), x19) && inf(x19, Q(1)) && egal(x19, Q(199, 200)) && x19.d === 200n);
  egalites(19, "\\dfrac{995}{1\\,000} = \\dfrac{199}{200}");
  const m19 = milieu(x19, Q(1));
  egalites(19, "\\left(\\dfrac{199}{200} + 1\\right) \\times \\dfrac{1}{2} = \\dfrac{399}{200} \\times \\dfrac{1}{2} = \\dfrac{399}{400}");
  ecrit(19, `Réponse : le milieu est $${texFrac(m19)} = ${tex(m19)}$`);
  v.ok("19. 199 est premier", [...Array(13).keys()].slice(2).every((d) => 199 % d !== 0));
  pointsFideles(19);
  intervalle(19, D("0,99"), Q(1));
  // 20
  const a20 = div(Q(3, 2), Q(1, 4));
  const b20 = div(Q(3, 2), Q(2, 9));
  const pleins = b20.n / b20.d;
  const r20 = moins(Q(3, 2), fois(Q(pleins), Q(2, 9)));
  egalites(20, `\\dfrac{3}{2} \\times \\dfrac{4}{1} = \\dfrac{12}{2} = ${tex(a20)}`);
  ecrit(20, `Réponse : on remplit $${tex(a20)}$ gobelets.`);
  egalites(20, `\\dfrac{3}{2} \\times \\dfrac{9}{2} = \\dfrac{27}{4} = ${tex(b20)}`);
  ecrit(20, `Réponse : on remplit $${pleins}$ gobelets pleins`);
  egalites(20, "6 \\times \\dfrac{2}{9} = \\dfrac{12}{9} = \\dfrac{4}{3}");
  egalites(20, "\\dfrac{3}{2} - \\dfrac{4}{3} = \\dfrac{9}{6} - \\dfrac{8}{6} = \\dfrac{1}{6}");
  ecrit(20, `Réponse : il reste $${texFrac(r20)}$ L`);
  v.ok("20. le reste vaut les 3/4 d'un gobelet", egal(div(r20, Q(2, 9)), Q(3, 4)));
  egalites(20, "\\dfrac{3}{4} \\times \\dfrac{2}{9} = \\dfrac{6}{36} = \\dfrac{1}{6}");
  pointsFideles(20);
  intervalle(20, fois(Q(pleins), Q(2, 9)), Q(3, 2));
}

lancer({
  nom: "NOMBRES RATIONNELS · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-nombres-rationnels.tsx",
  notionId: "fraction_rationnel",
  classe: "3e",
  verifier,
  casses: [
    ["ex. 1 : 35/100 mal simplifié", "\\\\dfrac{35}{100} = \\\\dfrac{7}{20}", "\\\\dfrac{35}{100} = \\\\dfrac{7}{25}"],
    ["ex. 3 : le point 7/8 mal placé", "{ value: 0.875, label: \"7/8 = 0,875\"", "{ value: 0.8, label: \"7/8 = 0,875\""],
    ["ex. 4 : 0,15 pris pour des dixièmes", "Réponse : $0{,}15 = \\\\dfrac{3}{20}$", "Réponse : $0{,}15 = \\\\dfrac{3}{2}$"],
    ["ex. 5 : 0,67 × 3 faux", "$0{,}67 \\\\times 3 = 2{,}01$", "$0{,}67 \\\\times 3 = 2{,}1$"],
    ["ex. 6 : une case du tableau fausse", "\"15/18\", \"14/18\"", "\"15/18\", \"16/18\""],
    ["ex. 7 : l'ordre des positifs gardé", "Réponse : $-\\\\dfrac{3}{4} < -\\\\dfrac{2}{5}$", "Réponse : $-\\\\dfrac{2}{5} < -\\\\dfrac{3}{4}$"],
    ["ex. 7 : −2/5 posé en −0,6", "{ value: -0.4, label: \"−2/5\"", "{ value: -0.6, label: \"−2/5\""],
    ["ex. 8 : la somme fausse", "\\\\dfrac{9}{12} + \\\\dfrac{2}{12} = \\\\dfrac{11}{12}", "\\\\dfrac{9}{12} + \\\\dfrac{2}{12} = \\\\dfrac{13}{12}"],
    ["ex. 9 : −0,8 renversé en −5/4", "\"−4/5\", \"3/1\"", "\"−5/4\", \"3/1\""],
    ["ex. 10 : les 2/5 du marathon faux", "Réponse : elle a parcouru $16{,}878$ km", "Réponse : elle a parcouru $16{,}788$ km"],
    ["ex. 11 : 7/12 et 0,58 échangés", "Réponse : $0{,}58 < \\\\dfrac{7}{12}", "Réponse : $\\\\dfrac{7}{12} < 0{,}58"],
    ["ex. 12 : −5/8 posé du mauvais côté", "{ value: -0.625, label: \"−5/8\"", "{ value: -0.375, label: \"−5/8\""],
    ["ex. 13 : calculé de gauche à droite", "Réponse : $A = \\\\dfrac{1}{6}$", "Réponse : $A = -\\\\dfrac{7}{30}$"],
    ["ex. 14 : six gobelets", "\\\\dfrac{60}{12} = 5$", "\\\\dfrac{60}{12} = 6$"],
    ["ex. 15 : le signe de B perdu", "Réponse : $B = -\\\\dfrac{1}{12}$", "Réponse : $B = \\\\dfrac{1}{12}$"],
    ["ex. 16 : l'intervalle dessiné trop long", "{ de: 0.333, a: 0.5,", "{ de: 0.333, a: 0.6,"],
    ["ex. 17 : le reste en km faux", "Réponse : il lui reste $12$ km", "Réponse : il lui reste $15$ km"],
    ["ex. 18 : B mal placée", "{ value: -3.333, label: \"B\"", "{ value: -3.25, label: \"B\""],
    ["ex. 18 : B prise pour la plus froide", "C ($-3{,}75$ °C), puis A et D à égalité ($-3{,}5$ °C), puis B", "B ($-\\\\dfrac{10}{3}$ °C), puis A et D à égalité ($-3{,}5$ °C), puis C"],
    ["ex. 19 : le milieu faux", "Réponse : le milieu est $\\\\dfrac{399}{400}", "Réponse : le milieu est $\\\\dfrac{397}{400}"],
    ["ex. 20 : le reste faux", "Réponse : il reste $\\\\dfrac{1}{6}$ L", "Réponse : il reste $\\\\dfrac{1}{3}$ L"],
    ["ex. 20 : le reste dessiné faux", "{ de: 1.333, a: 1.5,", "{ de: 1.25, a: 1.5,"],
  ],
});
