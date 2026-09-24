// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Les probabilités » de
// 3e (lib/fiches-exercices/maths-3e-probabilites.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé ANNONCE une probabilité ; ici on la RETROUVE en
// ÉNUMÉRANT les issues, une à une : chaque boule de l'urne dessinée, chaque
// secteur de la roue dessinée (découpée en parts égales), les 36 couples de deux
// dés, les couples de tirages avec ou sans remise, les suites de six lancers
// d'une pièce, les chemins pondérés d'un arbre. Le résultat est ensuite LU dans
// la phrase du corrigé. Les schémas sont relus dans le source : chaque nœud d'un
// arbre fait 1, et ses branches sont celles que donne l'urne (ou la roue) ; les
// cases surlignées d'un tableau sont EXACTEMENT celles de l'événement.
//
//   node scripts/verifier-exercices-probabilites-3e.mjs

import { Q, plus, moins, fois, egal, inf, tex, lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

const F = (n, d = 1) => Q(BigInt(n), BigInt(d));
const lit = (t) => { const s = t.replace(",", "."); if (s.includes("/")) { const [n, d] = s.split("/"); return F(Number(n), Number(d)); } const [e, dec = ""] = s.split("."); return F(Number(e + dec), 10 ** dec.length); };
const somme = (l) => l.reduce(plus, F(0));
/** P(événement) sur un univers d'issues équiprobables, par comptage. */
const compte = (univers, pred) => F(univers.filter(pred).length, univers.length);
/** `\dfrac{n}{d}`, ou l'entier. */
const tf = (q) => (q.d === 1n ? `${q.n}` : `\\dfrac{${q.n}}{${q.d}}`);
const DE = [1, 2, 3, 4, 5, 6];
const DEUX_DES = DE.flatMap((a) => DE.map((b) => [a, b]));
const cle = (i, j) => `${i},${j}`;
const memes = (a, b) => a.length === b.length && [...a].sort().join("|") === [...b].sort().join("|");

/** L'argument (tableau) d'un appel `nom([...])` dans le bloc, en JSON. */
function argument(bloc, nom) {
  const i = bloc.indexOf(`${nom}(`);
  if (i < 0) return null;
  const j = i + nom.length + 1;
  let prof = 0, k = j;
  for (; k < bloc.length; k++) {
    if (bloc[k] === "[") prof++;
    if (bloc[k] === "]") { prof--; if (prof === 0) break; }
  }
  const brut = bloc.slice(j, k + 1).replace(/(\w+):/g, '"$1":').replace(/,(\s*[\]}])/g, "$1");
  return JSON.parse(brut.replace(/couleur": (\w+)/g, 'couleur": "$1"'));
}
/** Les arguments de `tableauProba(entetes, lignes, surligne)`. */
function tableauDe(bloc) {
  const i = bloc.indexOf("tableauProba(");
  const s = bloc.slice(i + "tableauProba(".length);
  let prof = 0, k = 0;
  for (; k < s.length; k++) { if (s[k] === "(") prof++; if (s[k] === ")") { if (prof === 0) break; prof--; } }
  return JSON.parse(`[${s.slice(0, k)}]`.replace(/,(\s*[\]}])/g, "$1"));
}
/** Une roue relue, découpée en parts ÉGALES (pgcd des poids) : l'univers équiprobable. */
function partsDeRoue(segments) {
  const pgcd = (a, b) => (b ? pgcd(b, a % b) : a);
  const g = segments.reduce((x, s) => pgcd(x, s.poids), 0);
  return segments.flatMap((s) => Array(s.poids / g).fill(s.label));
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const e = (k) => f.enonces[k - 1] ?? "";
  const blocs = f.blocs;
  const ecrit = (k, texte) => v.ok(`${k}. le corrigé écrit « ${texte} »`, c(k).includes(texte), "absent du corrigé");
  const vaut = (k, quoi, x, y) => v.ok(`${k}. ${quoi} = ${y.n}/${y.d}`, egal(x, y), `${x.n}/${x.d}`);
  /** Chaque nœud de l'arbre : ses branches font 1. */
  const arbreJuste = (k) => {
    const a = argument(blocs[k - 1], "arbre");
    const faux = [];
    const tour = (enfants, chemin) => {
      if (!egal(somme(enfants.map((x) => lit(x.proba))), F(1))) faux.push(chemin || "racine");
      enfants.forEach((x) => x.enfants && tour(x.enfants, `${chemin}${x.label}`));
    };
    tour(a, "");
    v.ok(`${k}. chaque nœud de l'arbre a des branches de somme 1`, a.length > 0 && faux.length === 0, faux.join(", "));
    return a;
  };
  /** L'arbre porte-t-il, à chaque nœud, les probabilités données par `loi(chemin)` ? */
  const arbreSuit = (k, a, loi, quoi) => {
    const faux = [];
    const tour = (enfants, chemin) => enfants.forEach((x) => {
      const attendu = loi(chemin, x.label);
      if (!egal(lit(x.proba), attendu)) faux.push(`${chemin.join("")}${x.label} : ${x.proba} au lieu de ${attendu.n}/${attendu.d}`);
      if (x.enfants) tour(x.enfants, [...chemin, x.label]);
    });
    tour(a, []);
    v.ok(`${k}. ${quoi}`, faux.length === 0, faux.join(" ; "));
  };
  /** Les chemins complets d'un arbre, avec leur probabilité (produit des branches). */
  const chemins = (a) => {
    const out = [];
    const tour = (enfants, chemin, p) => enfants.forEach((x) => {
      const q = fois(p, lit(x.proba));
      if (x.enfants) tour(x.enfants, [...chemin, x.label], q);
      else out.push({ chemin: [...chemin, x.label], p: q });
    });
    tour(a, [], F(1));
    return out;
  };
  const pChemins = (liste, pred) => somme(liste.filter((x) => pred(x.chemin)).map((x) => x.p));
  /** Les cases surlignées d'un tableau sont-elles EXACTEMENT celles attendues ? */
  const surlignees = (k, surl, attendues, quoi) =>
    v.ok(`${k}. ${quoi} (${attendues.length} cases)`, memes(surl.map(([i, j]) => cle(i, j)), attendues), JSON.stringify(surl));

  v.titre("★ Un seul geste");
  // 1 — la roue de 8 secteurs égaux
  const r1 = argument(blocs[0], "roue");
  v.ok("1. la roue : 8 secteurs de même poids, numérotés de 1 à 8", r1.length === 8 && r1.every((s, i) => s.poids === r1[0].poids && s.label === String(i + 1)));
  const u1 = partsDeRoue(r1).map(Number);
  ecrit(1, `$P(A) = ${tf(compte(u1, (x) => x === 9))}$`);
  ecrit(1, `$P(B) = ${tf(compte(u1, (x) => x <= 8))}$`);
  v.ok("1. « obtenir 5 » : une seule issue", u1.filter((x) => x === 5).length === 1);
  const d1 = [...new Set(u1)].filter((x) => x % 3 === 0);
  ecrit(1, `sur la roue sont $${d1.join("$ et $")}$`);

  // 2 — l'urne : on compte les BOULES
  const u2 = argument(blocs[1], "billes").map((b) => b.couleur);
  const n2 = (col) => u2.filter((x) => x === col).length;
  v.ok("2. l'énoncé décrit l'urne dessinée", e(2).includes(`$${n2("B")}$ boules bleues, $${n2("R")}$ rouges et $${n2("V")}$ verte`));
  ecrit(2, `= ${u2.length}$ issues`);
  ecrit(2, `$P(\\text{bleue}) = \\dfrac{${n2("B")}}{${u2.length}} = ${tf(compte(u2, (x) => x === "B"))}$`);
  ecrit(2, `$P(\\text{rouge}) = ${tf(compte(u2, (x) => x === "R"))}$`);
  ecrit(2, `$P(\\text{verte}) = ${tf(compte(u2, (x) => x === "V"))}$`);
  v.ok("2. les couleurs ne sont PAS équiprobables", !egal(compte(u2, (x) => x === "V"), F(1, 3)));

  // 3 — la roue inégale
  const r3 = argument(blocs[2], "roue");
  v.ok("3. la roue fait 360° et l'énoncé donne ses angles", r3.reduce((s, x) => s + x.poids, 0) === 360 && e(3).includes(`rouge ($${r3[0].poids}°$), bleu ($${r3[1].poids}°$) et vert ($${r3[2].poids}°$)`));
  const u3 = partsDeRoue(r3);
  ecrit(3, `$P(\\text{rouge}) = \\dfrac{${r3[0].poids}}{360} = ${tf(compte(u3, (x) => x.startsWith("rouge")))}$`);

  // 4 — décrire un événement
  const A4 = DE.filter((x) => 6 % x === 0);
  const B4 = DE.filter((x) => DE.concat([7, 8, 9, 10]).filter((d) => x % d === 0).length === 2);
  const AB4 = A4.filter((x) => B4.includes(x));
  ecrit(4, `Réponse : $A$ : $${A4.join("$, $")}$ ; $B$ : $${B4.join("$, $")}$ ; les deux à la fois : $${AB4.join("$ et $")}$.`);
  v.ok(`4. le dé surligne A = {${A4}}`, blocs[3].includes(`de([${A4.join(", ")}])`));
  v.ok("4. 1, 3, 5 sont les impairs du dé", DE.filter((x) => x % 2 === 1).join() === "1,3,5");

  // 5 — la tombola
  const j5 = Array.from({ length: 20 }, (_, i) => i + 1);
  const m5 = (x) => x % 5 === 0, g5 = (x) => x >= 15;
  ecrit(5, `$P = \\dfrac{${j5.filter(m5).length}}{20} = ${tf(compte(j5, m5))}$`);
  ecrit(5, `$P = \\dfrac{${j5.filter(g5).length}}{20} = ${tf(compte(j5, g5))}$`);
  ecrit(5, `$P = \\dfrac{${j5.filter((x) => m5(x) && g5(x)).length}}{20} = ${tf(compte(j5, (x) => m5(x) && g5(x)))}$`);
  const [, l5, s5] = tableauDe(blocs[4]);
  v.ok("5. le tableau montre les jetons 1 à 20, chacun une fois", l5.flatMap((l) => l.slice(1)).map(Number).join() === j5.join());
  surlignees(5, s5, l5.flatMap((l, i) => l.slice(1).map((x, j) => [i, j + 1, Number(x)])).filter(([, , x]) => m5(x)).map(([i, j]) => cle(i, j)), "les cases surlignées sont les multiples de 5");

  // 6 — garçon ou fille
  const pG = 105 / 205;
  v.ok(`6. 105/205 = ${pG.toFixed(4)} ≈ 0,512`, pG.toFixed(3) === "0.512");
  ecrit(6, `$P(F) = 1 - 0{,}512 = ${tex(moins(F(1), lit("0,512")))}$`);
  const r6 = argument(blocs[5], "roue");
  v.ok("6. la roue : 512 et 488 sur 1 000", r6[0].poids === 512 && r6[1].poids === 488 && r6[0].label.endsWith("0,512") && r6[1].label.endsWith("0,488"));

  // 7 — une pièce, puis un dé
  const u7 = ["P", "F"].flatMap((p) => DE.map((d) => `${p}${d}`));
  ecrit(7, `$2 \\times 6 = ${u7.length}$ issues`);
  ecrit(7, `P6 : $P = ${tf(compte(u7, (x) => x === "P6"))}$`);
  const fp7 = (x) => x[0] === "F" && Number(x[1]) % 2 === 0;
  ecrit(7, `$P = \\dfrac{${u7.filter(fp7).length}}{12} = ${tf(compte(u7, fp7))}$`);
  const [, l7, s7] = tableauDe(blocs[6]);
  v.ok("7. le tableau croise pile/face et les six faces", l7.length === 2 && l7.every((l) => l.slice(1).every((x, j) => x === `${l[0][0]}${j + 1}`)));
  surlignees(7, s7, l7.flatMap((l, i) => l.slice(1).map((x, j) => [i, j + 1, x])).filter(([, , x]) => fp7(x)).map(([i, j]) => cle(i, j)), "les cases surlignées sont « face et pair »");

  // 8 — la pièce n'a pas de mémoire : toutes les suites de 6 lancers
  const suites = Array.from({ length: 64 }, (_, n) => [...n.toString(2).padStart(6, "0")].map((b) => (b === "1" ? "P" : "F")).join(""));
  const apres5F = suites.filter((s) => s.startsWith("FFFFF"));
  const p8 = compte(apres5F, (s) => s[5] === "P");
  vaut(8, "P(pile au 6e | 5 faces avant), sur les 64 suites", p8, F(1, 2));
  ecrit(8, `$P(\\text{pile}) = ${tf(p8)}$`);
  arbreJuste(8);

  v.titre("★★ Type devoir");
  // 9 — la somme de deux dés
  const p9 = (s) => compte(DEUX_DES, ([a, b]) => a + b === s);
  ecrit(9, `$P(7) = \\dfrac{${DEUX_DES.filter(([a, b]) => a + b === 7).length}}{36} = ${tf(p9(7))}$`);
  ecrit(9, `$P(2) = ${tf(p9(2))}$`);
  v.ok("9. 7 est six fois plus probable que 2", egal(p9(7), fois(F(6), p9(2))));
  const [, l9, s9] = tableauDe(blocs[8]);
  v.ok("9. chaque case du tableau est la somme de sa ligne et de sa colonne", l9.every((l, i) => l.slice(1).every((x, j) => Number(x) === i + 1 + j + 1)));
  surlignees(9, s9, DEUX_DES.filter(([a, b]) => a + b === 7).map(([a, b]) => cle(a - 1, b)), "les cases surlignées sont les sommes 7");

  // 10 — avec remise : les 16 couples de boules
  const u10 = argument(blocs[9], "billes").map((b) => b.couleur);
  v.ok("10. l'urne dessinée : 3 bleues, 1 rouge", u10.filter((x) => x === "B").length === 3 && u10.filter((x) => x === "R").length === 1 && e(10).includes("$3$ boules bleues et $1$ rouge"));
  const avec = u10.flatMap((a) => u10.map((b) => a + b));
  const pBB10 = compte(avec, (x) => x === "BB");
  ecrit(10, `$P(BB) = \\dfrac{3}{4} \\times \\dfrac{3}{4} = ${tf(pBB10)}$`);
  ecrit(10, `$P = 1 - ${tf(pBB10)} = ${tf(compte(avec, (x) => x.includes("R")))}$`);
  const a10 = arbreJuste(10);
  arbreSuit(10, a10, (_, col) => compte(u10, (x) => x === col), "les branches sont celles de l'urne, la même aux deux tirages (avec remise)");
  vaut(10, "P(BB) lu sur l'arbre", pChemins(chemins(a10), (ch) => ch.join("") === "BB"), pBB10);

  // 11 — sans remise : les 12 couples de boules DIFFÉRENTES
  v.ok("11. même urne que l'exercice 10", e(11).includes("$3$ boules bleues et $1$ rouge"));
  const sans = u10.flatMap((a, i) => u10.filter((_, j) => j !== i).map((b) => a + b));
  const pBB11 = compte(sans, (x) => x === "BB");
  ecrit(11, `$P(BB) = \\dfrac{3}{4} \\times \\dfrac{2}{3} = \\dfrac{6}{12} = ${tf(pBB11)}$`);
  const pRR11 = compte(sans, (x) => x === "RR");
  vaut(11, "P(RR) sans remise", pRR11, F(0));
  ecrit(11, `= ${tf(pRR11)}$ : c'est un événement IMPOSSIBLE`);
  const a11 = arbreJuste(11);
  arbreSuit(11, a11, (ch, col) => {
    const reste = [...u10];
    if (ch.length) reste.splice(reste.indexOf(ch[0]), 1);
    return compte(reste, (x) => x === col);
  }, "les branches du second tirage sont celles de l'urne APRÈS le premier (sans remise)");
  ecrit(11, `sans remise, $${tf(pBB11)} = \\dfrac{8}{16}$`);
  v.ok("11. sans remise, BB est moins probable qu'avec", egal(pBB11, F(8, 16)) && egal(pBB10, F(9, 16)));

  // 12 — la roue de loterie tournée deux fois
  const r12 = argument(blocs[11], "roue");
  v.ok("12. la roue : 120° et 240°, 360° en tout", r12[0].poids === 120 && r12[1].poids === 240);
  const u12 = partsDeRoue(r12).map((l) => (l.startsWith("gagné") ? "G" : "P"));
  const deux12 = u12.flatMap((a) => u12.map((b) => a + b));
  ecrit(12, `$P(G) = \\dfrac{120}{360} = ${tf(compte(u12, (x) => x === "G"))}$`);
  ecrit(12, `$P(GG) = \\dfrac{1}{3} \\times \\dfrac{1}{3} = ${tf(compte(deux12, (x) => x === "GG"))}$`);
  const une12 = compte(deux12, (x) => x === "GP" || x === "PG");
  ecrit(12, `$\\dfrac{1}{3} \\times \\dfrac{2}{3} + \\dfrac{2}{3} \\times \\dfrac{1}{3} = \\dfrac{2}{9} + \\dfrac{2}{9} = ${tf(une12)}$`);
  ecrit(12, `$P(PP) = \\dfrac{2}{3} \\times \\dfrac{2}{3} = ${tf(compte(deux12, (x) => x === "PP"))}$`);
  const a12 = arbreJuste(12);
  arbreSuit(12, a12, (_, col) => compte(u12, (x) => x === col), "l'arbre porte les probabilités de la roue à chaque tour");

  // 13 — fréquence et probabilité
  const barres = [...blocs[12].matchAll(/label: "(\d)", value: (\d+)/g)].map((m) => [Number(m[1]), Number(m[2])]);
  v.ok("13. le diagramme : 6 barres, 50 lancers, celles de l'énoncé", barres.length === 6 && barres.reduce((s, [, n]) => s + n, 0) === 50 && barres.every(([face, n]) => e(13).includes(`$${face}$ sort $${n}$ fois`)));
  const n6 = barres.find(([face]) => face === 6)[1];
  ecrit(13, `$\\dfrac{${n6}}{50} = ${tex(F(n6, 50))}$`);
  ecrit(13, `$P(6) = \\dfrac{1}{6} \\approx ${tex(F(Math.round(100 / 6), 100))}$`);
  v.ok("13. la barre du 6 est surlignée", /value: 12 \}\], 5\)/.test(blocs[12]));
  v.ok("13. fréquence ≠ probabilité", !egal(F(n6, 50), F(1, 6)));

  // 14 — pierre-feuille-ciseaux
  const G14 = ["Pierre", "Feuille", "Ciseaux"];
  const bat = { Pierre: "Ciseaux", Ciseaux: "Feuille", Feuille: "Pierre" };
  const gagnant = (l, h) => (l === h ? "=" : bat[l] === h ? "Léa" : "Hugo");
  const u14 = G14.flatMap((l) => G14.map((h) => gagnant(l, h)));
  ecrit(14, `$3 \\times 3 = ${u14.length}$ issues`);
  ecrit(14, `$P(\\text{égalité}) = \\dfrac{3}{9} = ${tf(compte(u14, (x) => x === "="))}$`);
  ecrit(14, `$P(\\text{Léa gagne}) = \\dfrac{3}{9} = ${tf(compte(u14, (x) => x === "Léa"))}$`);
  const [ent14, l14, s14] = tableauDe(blocs[13]);
  v.ok("14. chaque case du tableau porte le bon gagnant", ent14.slice(1).join() === G14.join() && l14.every((l, i) => l[0] === G14[i] && l.slice(1).every((x, j) => x === gagnant(G14[i], G14[j]))));
  surlignees(14, s14, G14.flatMap((l, i) => G14.map((h, j) => [i, j + 1, gagnant(l, h)])).filter(([, , g]) => g === "Léa").map(([i, j]) => cle(i, j)), "les cases surlignées sont celles où Léa gagne");

  // 15 — au moins un 6
  const sans6 = DEUX_DES.filter(([a, b]) => a !== 6 && b !== 6).length;
  ecrit(15, `$5 \\times 5 = ${sans6}$ cases`);
  const p15 = compte(DEUX_DES, ([a, b]) => a === 6 || b === 6);
  ecrit(15, `$P = 1 - \\dfrac{${sans6}}{36} = ${tf(p15)}$`);
  v.ok("15. le piège 1/6 + 1/6 donne autre chose", !egal(plus(F(1, 6), F(1, 6)), p15));
  const [, l15, s15] = tableauDe(blocs[14]);
  v.ok("15. chaque case du tableau est le couple (ligne ; colonne)", l15.every((l, i) => l.slice(1).every((x, j) => x === `${i + 1};${j + 1}`)));
  surlignees(15, s15, DEUX_DES.filter(([a, b]) => a === 6 || b === 6).map(([a, b]) => cle(a - 1, b)), "les cases surlignées contiennent au moins un 6");

  // 16 — deux urnes
  const U1 = ["R", "R", "B"], U2 = ["R", "B", "B", "B"];
  v.ok("16. l'énoncé décrit U1 (2 R, 1 B) et U2 (1 R, 3 B)", e(16).includes("contient $2$ boules rouges et $1$ bleue") && e(16).includes("contient $1$ boule rouge et $3$ bleues"));
  const u16 = U1.flatMap((a) => U2.map((b) => a + b));
  ecrit(16, `$P(RR) = \\dfrac{2}{3} \\times \\dfrac{1}{4} = \\dfrac{2}{12} = ${tf(compte(u16, (x) => x === "RR"))}$`);
  ecrit(16, `$P = \\dfrac{2}{12} + \\dfrac{3}{12} = ${tf(compte(u16, (x) => x[0] === x[1]))}$`);
  const a16 = arbreJuste(16);
  arbreSuit(16, a16, (ch, col) => compte(ch.length ? U2 : U1, (x) => x === col), "l'arbre porte U1 au premier tirage, U2 au second");

  v.titre("★★★ Problèmes");
  /** Deux épreuves indépendantes de loi { label: proba } : les 4 chemins pondérés. */
  const deuxFois = (loi1, loi2 = loi1) => Object.entries(loi1).flatMap(([a, p]) => Object.entries(loi2).map(([b, q]) => ({ chemin: [a, b], p: fois(lit(p), lit(q)) })));
  const controlerArbre = (k, loi1, loi2 = loi1) => {
    const a = arbreJuste(k);
    arbreSuit(k, a, (ch, col) => lit((ch.length ? loi2 : loi1)[col]), "l'arbre porte la loi de l'énoncé à chaque nœud");
    return a;
  };

  // 17 — les tirs au but
  const t17 = { M: "0,75", R: "0,25" };
  v.ok("17. 0,25 = 1 − 0,75", egal(lit(t17.R), moins(F(1), lit(t17.M))) && e(17).includes("probabilité $0{,}75$"));
  const c17 = deuxFois(t17);
  const MM = pChemins(c17, (ch) => ch.join("") === "MM");
  ecrit(17, `$P(MM) = 0{,}75 \\times 0{,}75 = ${tex(MM)}$`);
  ecrit(17, `= 0{,}1875 + 0{,}1875 = ${tex(pChemins(c17, (ch) => ch[0] !== ch[1]))}$`);
  ecrit(17, `$1 - ${tex(MM)} = ${tex(pChemins(c17, (ch) => ch.includes("R")))}$`);
  ecrit(17, `$P(RR) = 0{,}25 \\times 0{,}25 = ${tex(pChemins(c17, (ch) => ch.join("") === "RR"))}$`);
  controlerArbre(17, t17);

  // 18 — la météo du week-end
  const sam = { Pluie: "0,3", Sec: "0,7" }, dim = { Pluie: "0,6", Sec: "0,4" };
  v.ok("18. l'énoncé : 30 % samedi, 60 % dimanche", e(18).includes("$30$ % pour samedi et de $60$ % pour dimanche"));
  const c18 = deuxFois(sam, dim);
  const sec18 = pChemins(c18, (ch) => ch.join() === "Sec,Sec");
  ecrit(18, `$0{,}7 \\times 0{,}4 = ${tex(sec18)}$`);
  ecrit(18, `$1 - ${tex(sec18)} = ${tex(pChemins(c18, (ch) => ch.includes("Pluie")))}$`);
  ecrit(18, `$0{,}3 \\times 0{,}6 = ${tex(pChemins(c18, (ch) => ch.join() === "Pluie,Pluie"))}$`);
  v.ok("18. le piège 0,3 + 0,6 ne donne pas « au moins un jour »", !egal(plus(lit("0,3"), lit("0,6")), pChemins(c18, (ch) => ch.includes("Pluie"))));
  controlerArbre(18, sam, dim);

  // 19 — deux donneurs de sang
  const g19 = { O: "0,42", "non O": "0,58" };
  v.ok("19. 0,58 = 1 − 0,42", egal(lit(g19["non O"]), moins(F(1), lit(g19.O))) && e(19).includes("$42$ %"));
  const c19 = deuxFois(g19);
  const nO = (ch) => ch.filter((x) => x === "O").length;
  const aucun = pChemins(c19, (ch) => nO(ch) === 0);
  ecrit(19, `$P(\\text{O et O}) = 0{,}42 \\times 0{,}42 = ${tex(pChemins(c19, (ch) => nO(ch) === 2))}$`);
  ecrit(19, `$0{,}58 \\times 0{,}58 = ${tex(aucun)}$`);
  ecrit(19, `$1 - ${tex(aucun)} = ${tex(pChemins(c19, (ch) => nO(ch) >= 1))}$`);
  ecrit(19, `= ${tex(fois(lit("0,42"), lit("0,58")))} + ${tex(fois(lit("0,42"), lit("0,58")))} = ${tex(pChemins(c19, (ch) => nO(ch) === 1))}$`);
  controlerArbre(19, g19);

  // 20 — le jeu est-il équitable ?
  const alice = ([a, b]) => [6, 7, 8].includes(a + b);
  const nS = (s) => DEUX_DES.filter(([a, b]) => a + b === s).length;
  ecrit(20, `la somme $6$ occupe $${nS(6)}$ cases, la somme $7$ en occupe $${nS(7)}$, la somme $8$ en occupe $${nS(8)}$`);
  const pA20 = compte(DEUX_DES, alice);
  ecrit(20, `$P(\\text{Alice}) = \\dfrac{${DEUX_DES.filter(alice).length}}{36} = ${tf(pA20)}$`);
  ecrit(20, `= \\dfrac{${DEUX_DES.filter((x) => !alice(x)).length}}{36} = ${tf(compte(DEUX_DES, (x) => !alice(x)))}$`);
  v.ok("20. Bruno est avantagé : P(Alice) < 1/2", inf(pA20, F(1, 2)));
  const paire = DEUX_DES.filter(([a, b]) => (a + b) % 2 === 0).length;
  ecrit(20, `= ${paire}$ cases, et $\\dfrac{${paire}}{36} = ${tf(F(paire, 36))}$`);
  v.ok("20. « somme paire » est équitable", egal(F(paire, 36), F(1, 2)));
  const [, l20, s20] = tableauDe(blocs[19]);
  v.ok("20. chaque case du tableau est la somme de sa ligne et de sa colonne", l20.every((l, i) => l.slice(1).every((x, j) => Number(x) === i + 1 + j + 1)));
  surlignees(20, s20, DEUX_DES.filter(alice).map(([a, b]) => cle(a - 1, b)), "les cases surlignées sont celles d'Alice (6, 7 ou 8)");
}

lancer({
  nom: "LES PROBABILITÉS · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-probabilites.tsx",
  notionId: "proba_experience",
  classe: "3e",
  verifier,
  casses: [
    ["ex. 1 : le 6 oublié dans les multiples de 3", "sur la roue sont $3$ et $6$", "sur la roue sont $3$ et $9$"],
    ["ex. 2 : une boule rouge devenue bleue", "{ couleur: B }, { couleur: R }, { couleur: R }, { couleur: R }, { couleur: V }]", "{ couleur: B }, { couleur: B }, { couleur: R }, { couleur: R }, { couleur: V }]"],
    ["ex. 3 : la roue ne fait plus 360°", "{ label: \"vert 60°\", poids: 60", "{ label: \"vert 60°\", poids: 90"],
    ["ex. 4 : le 1 oublié dans les diviseurs de 6", "schema: de([1, 2, 3, 6])", "schema: de([2, 3, 6])"],
    ["ex. 5 : une case surlignée fausse", "[[0, 5], [1, 5], [2, 5], [3, 5]]", "[[0, 5], [1, 5], [2, 5], [3, 4]]"],
    ["ex. 5 : 20 − 15 = 5 jetons", "$P = \\\\dfrac{6}{20} = \\\\dfrac{3}{10}$", "$P = \\\\dfrac{5}{20} = \\\\dfrac{1}{4}$"],
    ["ex. 6 : le contraire mal calculé", "= 1 - 0{,}512 = 0{,}488$", "= 1 - 0{,}512 = 0{,}498$"],
    ["ex. 7 : F5 surligné au lieu de F6", "[[1, 2], [1, 4], [1, 6]]", "[[1, 2], [1, 4], [1, 5]]"],
    ["ex. 8 : « pile est dû »", "{ label: \"Face\", proba: \"1/2\" }]", "{ label: \"Face\", proba: \"1/6\" }]"],
    ["ex. 9 : une case de somme 7 mal surlignée", "[[0, 6], [1, 5], [2, 4], [3, 3], [4, 2], [5, 1]]", "[[0, 6], [1, 5], [2, 4], [3, 3], [4, 2], [5, 2]]"],
    ["ex. 9 : 1/11 « une somme sur onze »", "$P(7) = \\\\dfrac{6}{36} = \\\\dfrac{1}{6}$", "$P(7) = \\\\dfrac{6}{36} = \\\\dfrac{1}{11}$"],
    ["ex. 10 : additionner le long de la branche", "$P(BB) = \\\\dfrac{3}{4} \\\\times \\\\dfrac{3}{4} = \\\\dfrac{9}{16}$", "$P(BB) = \\\\dfrac{3}{4} + \\\\dfrac{3}{4} = \\\\dfrac{6}{4}$"],
    ["ex. 11 : sans remise traité comme avec", "{ label: \"B\", proba: \"3/4\", enfants: [{ label: \"B\", proba: \"2/3\" }, { label: \"R\", proba: \"1/3\" }] }", "{ label: \"B\", proba: \"3/4\", enfants: [{ label: \"B\", proba: \"3/4\" }, { label: \"R\", proba: \"1/4\" }] }"],
    ["ex. 12 : un seul chemin pour « exactement une fois »", "$\\\\dfrac{1}{3} \\\\times \\\\dfrac{2}{3} + \\\\dfrac{2}{3} \\\\times \\\\dfrac{1}{3} = \\\\dfrac{2}{9} + \\\\dfrac{2}{9} = \\\\dfrac{4}{9}$", "$\\\\dfrac{1}{3} \\\\times \\\\dfrac{2}{3} = \\\\dfrac{2}{9}$"],
    ["ex. 13 : la barre du 6 fausse", "{ label: \"6\", value: 12 }", "{ label: \"6\", value: 10 }"],
    ["ex. 13 : la fréquence fausse", "\\\\dfrac{12}{50} = 0{,}24$", "\\\\dfrac{12}{50} = 0{,}2$"],
    ["ex. 14 : le gagnant d'une case inversé", "[\"Feuille\", \"Léa\", \"=\", \"Hugo\"]", "[\"Feuille\", \"Hugo\", \"=\", \"Léa\"]"],
    ["ex. 15 : 1/6 + 1/6, le double 6 compté deux fois", "$P = 1 - \\\\dfrac{25}{36} = \\\\dfrac{11}{36}$", "$P = 1 - \\\\dfrac{25}{36} = \\\\dfrac{12}{36}$"],
    ["ex. 16 : les deux urnes mélangées", "{ label: \"B\", proba: \"1/3\", enfants: [{ label: \"R\", proba: \"1/4\" }, { label: \"B\", proba: \"3/4\" }] }", "{ label: \"B\", proba: \"1/3\", enfants: [{ label: \"R\", proba: \"3/7\" }, { label: \"B\", proba: \"4/7\" }] }"],
    ["ex. 17 : 0,75 + 0,75", "$P(MM) = 0{,}75 \\\\times 0{,}75 = 0{,}5625$", "$P(MM) = 0{,}75 + 0{,}75 = 1{,}5$"],
    ["ex. 18 : « au moins un jour » = 0,3 + 0,6", "$1 - 0{,}28 = 0{,}72$", "$1 - 0{,}28 = 0{,}9$"],
    ["ex. 18 : une branche du dimanche fausse", "{ label: \"Sec\", proba: \"0,7\", enfants: [{ label: \"Pluie\", proba: \"0,6\" }", "{ label: \"Sec\", proba: \"0,7\", enfants: [{ label: \"Pluie\", proba: \"0,3\" }"],
    ["ex. 19 : un produit faux", "$P(\\\\text{O et O}) = 0{,}42 \\\\times 0{,}42 = 0{,}1764$", "$P(\\\\text{O et O}) = 0{,}42 \\\\times 0{,}42 = 0{,}1664$"],
    ["ex. 20 : 3/11 « trois sommes sur onze »", "$P(\\\\text{Alice}) = \\\\dfrac{16}{36} = \\\\dfrac{4}{9}$", "$P(\\\\text{Alice}) = \\\\dfrac{3}{11}$"],
    ["ex. 20 : une case d'Alice mal surlignée", "[5, 1], [5, 2]]", "[5, 1], [5, 3]]"],
    ["une micro d'une autre notion", "micros: [\"proba_evenement\"],", "micros: [\"stat_moyenne\"],"],
    ["un $ dans un canvas", "{ label: \"garçon 0,512\"", "{ label: \"$0{,}512$\""],
  ],
});
