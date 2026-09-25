// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Fractions et nombres
// rationnels » de 4e (lib/fiches-exercices/maths-4e-fractions-nombres.tsx).
//
// ⭐ L'AUTRE CHEMIN : chaque résultat est refait ici en fractions EXACTES (Q du
// module commun, réduites par le PGCD) — le corrigé passe par « je divise par 5 »
// ou par le dénominateur commun, le script par la réduction et le produit en
// croix. Les écritures décimales sont refaites par la DIVISION POSÉE, chiffre
// après chiffre (`decimales`), et un décimal est « exact » quand son dénominateur
// réduit n'a que des 2 et des 5. Puis le corrigé doit ÉCRIRE ce résultat, dans sa
// phrase « Réponse : … ». Les chaînes « a = b = c » du corrigé sont relues telles
// qu'elles sont écrites (`outilsEgalites`) : tous leurs membres doivent être égaux.
//
// ⭐ ET LES DESSINS SONT RELUS DANS LE SOURCE : chaque point posé sur la droite
// (« 7/12 » en 0,583, « Tom » en 0,72), chaque intervalle entre les bons nombres,
// chaque case de tableau égale à sa voisine (et irréductible quand elle le dit),
// les divisions du tableau d'étapes refaites ligne par ligne, les deux barres du
// canvas `fraction`, les carreaux coloriés des grilles de cent. Et on COMPTE les
// corrigés dessinés : vingt sur vingt.
//
//   node scripts/verifier-exercices-fractions-nombres-4e.mjs

import { Q, D, fois, div, egal, inf, versNombre, tex, texFrac, lireFeuille, outilsEgalites, lancer } from "./verifier-exercices-commun.mjs";

/** « −5/8 », « 0,875 », « 1/9 (faux) » → une fraction exacte (ou null). */
function lab(s) {
  const t = s.replace(/−/g, "-").replace(/\s*\(faux\)/, "").trim();
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
/** Les tableaux d'un bloc : `tableau([...], [...])`, ou `tableau([...], [...], true)`. */
const tableauxDe = (bloc) =>
  [...bloc.matchAll(/tableau\(\[([^\]]*)\], \[([^\]]*)\](?:, true)?\)/g)].map((m) => [m[1], m[2]].map((l) => [...l.matchAll(/"([^"]*)"/g)].map((x) => x[1])));
/** Le tableau d'étapes : `etapes([entête], [[ligne], [ligne]])`. */
function etapesDe(bloc) {
  const m = /etapes\(\[([^\]]*)\], \[(.*)\]\),?\n/.exec(bloc);
  if (!m) return null;
  const cases = (l) => [...l.matchAll(/"([^"]*)"/g)].map((x) => x[1]);
  return { entete: cases(m[1]), lignes: [...m[2].matchAll(/\[([^\]]*)\]/g)].map((x) => cases(x[1])) };
}
/** Les deux barres du canvas `fraction` : `comparer([a, b], [c, d])`. */
function barresDe(bloc) {
  const m = /comparer\(\[(\d+), (\d+)\], \[(\d+), (\d+)\]\)/.exec(bloc);
  return m ? [Q(m[1], m[2]), Q(m[3], m[4])] : null;
}
/** Les grilles de cent carreaux : `grille(85, "Léa : 17/20 = 85/100")`. */
const grillesDe = (bloc) => [...bloc.matchAll(/grille\((\d+), "([^"]*)"\)/g)].map((m) => ({ colories: Number(m[1]), legende: m[2] }));

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
/** Les restes successifs de la division posée de n par d. */
function restes(n, d, k) {
  let r = n % d;
  const out = [];
  for (let i = 0; i < k; i++) {
    r = (r * 10) % d;
    out.push(r);
  }
  return out;
}
/** Une écriture décimale exacte existe-t-elle ? Le dénominateur réduit n'a que des 2 et des 5. */
function finie(q) {
  let d = q.d;
  for (const p of [2n, 5n]) while (d % p === 0n) d /= p;
  return d === 1n;
}
/** Une case « 0,4166… » : ses chiffres sont ceux de la division posée. Une case
 *  sans « … » : le nombre exact. */
function caseDecimale(q, texte) {
  if (!texte.endsWith("…")) return egal(lab(texte), q);
  const [ent, dec] = texte.slice(0, -1).split(",");
  const n = Number(q.n), d = Number(q.d);
  return Number(ent) === Math.floor(n / d) && decimales(n, d, dec.length) === dec && !finie(q);
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const e = (k) => f.enonces[k - 1] ?? "";
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
  /** Des points étiquetés par un NOM (« Tom », « A ») : chacun à la valeur de son nom. */
  const pointsNommes = (k, valeurs, tol = 0.001) => {
    const ps = pointsDe(bloc(k)).filter((p) => p.label in valeurs);
    v.ok(`${k}. ${Object.keys(valeurs).join(", ")} : chacun à sa place sur la droite`, ps.length === Object.keys(valeurs).length && ps.every((p) => proche(p.value, valeurs[p.label], tol)), JSON.stringify(ps));
  };
  const intervalle = (k, de, a) => {
    const iv = ivsDe(bloc(k))[0];
    v.ok(`${k}. l'intervalle dessiné va de ${versNombre(de).toFixed(3)} à ${versNombre(a).toFixed(3)}`, !!iv && proche(iv.de, de) && proche(iv.a, a), JSON.stringify(iv));
  };
  /** Un ordre croissant : les nombres sont vraiment rangés, et la chaîne est écrite. */
  const ordre = (k, paires, prefixe = "Réponse : $") => {
    const range = paires.every((p, i) => i === 0 || inf(paires[i - 1][0], p[0]));
    const chaine = paires.map((p) => p[1]).join(" < ");
    v.ok(`${k}. ${chaine}`, range && c(k).includes(`${prefixe}${chaine}$`), `rangé : ${range}`);
  };
  /** Le tableau : chaque case du haut égale à celle du bas ; `irr` : le bas est irréductible. */
  const tableauEgal = (k, { irr = false } = {}) => {
    const [[, ...h], [, ...r]] = tableauxDe(bloc(k))[0] ?? [[], []];
    const ok = h.length > 0 && h.length === r.length && h.every((x, i) => lab(x) && lab(r[i]) && egal(lab(x), lab(r[i])) && (!irr || !r[i].includes("/") || lab(r[i]).d === BigInt(r[i].split("/")[1])));
    v.ok(`${k}. le tableau : chaque case du haut égale à celle du bas${irr ? ", irréductible" : ""}`, ok, JSON.stringify([h, r]));
    return [h, r];
  };
  const tableauDecimal = (k) => {
    const [[, ...h], [, ...r]] = tableauxDe(bloc(k))[0] ?? [[], []];
    v.ok(`${k}. le tableau : chaque écriture décimale est celle de la division posée`, h.length > 0 && h.length === r.length && h.every((x, i) => caseDecimale(lab(x), r[i])), JSON.stringify([h, r]));
  };
  const irreductible = (q, n, d) => q.n === BigInt(n) && q.d === BigInt(d);

  v.titre("★ Un seul geste");
  // 1 — le terme manquant, par la proportion : ? = 20 × 3/5.
  const t1a = fois(Q(20), Q(3, 5)), t1b = div(Q(12), Q(4, 7)), t1c = fois(Q(45), Q(2, 9));
  v.ok("1. les termes manquants sont entiers : 12, 21, 10", egal(t1a, Q(12)) && egal(t1b, Q(21)) && egal(t1c, Q(10)));
  egalites(1, `\\dfrac{3}{5} = \\dfrac{${tex(t1a)}}{20}`);
  egalites(1, `\\dfrac{4}{7} = \\dfrac{12}{${tex(t1b)}}`);
  egalites(1, `\\dfrac{2}{9} = \\dfrac{${tex(t1c)}}{45}`);
  ecrit(1, `Donc $\\dfrac{4}{7} = \\dfrac{12}{${tex(t1b)}}$`);
  ecrit(1, `Réponse : $\\dfrac{3}{5} = \\dfrac{${tex(t1a)}}{20}$ ; $\\dfrac{4}{7} = \\dfrac{12}{${tex(t1b)}}$ ; $\\dfrac{2}{9} = \\dfrac{${tex(t1c)}}{45}$.`);
  egalites(1, "\\dfrac{3 + 15}{20} = \\dfrac{18}{20}");
  v.ok("1. ajouter 15 change le nombre (0,9 contre 0,6), et c'est écrit", !egal(Q(18, 20), Q(3, 5)) && c(1).includes(`qui vaut $${tex(Q(18, 20))}$, alors que $\\dfrac{3}{5}$ vaut $${tex(Q(3, 5))}$`));
  {
    const b = barresDe(bloc(1));
    v.ok("1. les deux barres dessinées sont 3/5 et 12/20, égales", !!b && egal(b[0], Q(3, 5)) && egal(b[1], Q(12, 20)) && /comparer\(\[3, 5\], \[12, 20\]\)/.test(bloc(1)));
  }
  // 2
  {
    const fr2 = [[8, 12], [10, 15], [6, 10], [14, 21]];
    const egales = fr2.filter(([n, d]) => egal(Q(n, d), Q(2, 3)));
    for (const [n, d] of fr2) egalites(2, `\\dfrac{${n}}{${d}} = ${texFrac(Q(n, d))}`);
    const liste = egales.map(([n, d]) => `$\\dfrac{${n}}{${d}}$`);
    const autres = fr2.filter((x) => !egales.includes(x)).map(([n, d]) => `$\\dfrac{${n}}{${d}}$`);
    ecrit(2, `Réponse : ${liste.slice(0, -1).join(", ")} et ${liste.at(-1)} sont égales à $\\dfrac{2}{3}$ ; ${autres.join(", ")} ne l'est pas.`);
    v.ok("2. le « même écart » trompe : 2/3 et 5/6", 3 - 2 === 6 - 5 && inf(Q(2, 3), Q(5, 6)));
    const [h, r] = tableauEgal(2, { irr: true });
    v.ok("2. le tableau dit la même chose que la réponse", h.length === 4 && r.filter((x) => x === "2/3").length === egales.length);
  }
  // 3
  {
    const q3 = Q(30, 42);
    egalites(3, "\\dfrac{30}{42} = \\dfrac{15}{21}");
    egalites(3, "\\dfrac{15}{21} = \\dfrac{5}{7}");
    ecrit(3, `Réponse : $\\dfrac{30}{42} = ${texFrac(q3)}$.`);
    v.ok("3. 5/7 est irréductible, et le PGCD de 30 et 42 est 6", irreductible(q3, 5, 7) && 30 / Number(q3.n) === 6);
    ecrit(3, `$${30 / Number(q3.n)}$ divise $30$ et $42$`);
    const t = etapesDe(bloc(3));
    let ok = !!t && t.lignes.length === 3;
    if (ok) {
      for (let i = 1; i < t.lignes.length; i++) {
        const k = Number(t.lignes[i][0].replace("÷ ", ""));
        ok &&= Number(t.lignes[i - 1][1]) / k === Number(t.lignes[i][1]) && Number(t.lignes[i - 1][2]) / k === Number(t.lignes[i][2]);
      }
      const der = t.lignes.at(-1);
      ok &&= irreductible(Q(der[1], der[2]), der[1], der[2]) && egal(Q(der[1], der[2]), q3);
    }
    v.ok("3. le tableau d'étapes : chaque ligne est la précédente divisée, la dernière irréductible", ok, JSON.stringify(t));
  }
  // 4
  {
    const q4 = Q(13, 39);
    v.ok("4. 39 = 3 × 13", 3 * 13 === 39);
    ecrit(4, "$39 = 3 \\times 13$");
    ecrit(4, `Donc $\\dfrac{13}{39} = ${texFrac(q4)}$.`);
    ecrit(4, `$\\dfrac{1}{9} \\approx ${tex(Q(Math.round(100 / 9), 100))}$ et $\\dfrac{1}{3} \\approx ${tex(Q(Math.round(100 / 3), 100))}$`);
    v.ok("4. 1/9 est trois fois plus petit que 1/3", egal(div(q4, Q(1, 9)), Q(3)) && c(4).includes("trois fois trop petit"));
    ecrit(4, `Réponse : Mila a tort ; $\\dfrac{13}{39} = ${texFrac(q4)}$.`);
    pointsFideles(4);
    intervalle(4, Q(0), q4);
  }
  // 5
  {
    const n5 = [[9, 20], [11, 4], [7, 5]];
    for (const [n, d] of n5) ecrit(5, `$${n} \\div ${d} = ${tex(Q(n, d))}$`);
    egalites(5, "\\dfrac{9}{20} = \\dfrac{45}{100}");
    ecrit(5, `Réponse : ${n5.map(([n, d]) => `$\\dfrac{${n}}{${d}} = ${tex(Q(n, d))}$`).join(" ; ")}.`);
    v.ok("5. le piège : 7,5 n'est pas 7/5", !egal(D("7,5"), Q(7, 5)) && c(5).includes("écrire $7{,}5$ pour $\\dfrac{7}{5}$"));
    ecrit(5, `$4 \\times 2 = 8$, il reste $3$, et $3 \\div 4 = ${tex(Q(3, 4))}$`);
    pointsFideles(5);
    intervalle(5, Q(0), Q(11, 4));
  }
  // 6
  {
    const d6 = ["0,125", "2,4", "0,06"];
    egalites(6, "0{,}125 = \\dfrac{125}{1\\,000}");
    egalites(6, "\\dfrac{125}{1\\,000} = \\dfrac{1}{8}");
    egalites(6, "125 \\times 8 = 1\\,000");
    egalites(6, "2{,}4 = \\dfrac{24}{10} = \\dfrac{12}{5}");
    egalites(6, "0{,}06 = \\dfrac{6}{100} = \\dfrac{3}{50}");
    egalites(6, "\\dfrac{6}{10} = 0{,}6");
    v.ok("6. 6/10 est dix fois 0,06", egal(Q(6, 10), fois(D("0,06"), Q(10))));
    ecrit(6, `Réponse : ${d6.map((x) => `$${tex(D(x))} = ${texFrac(D(x))}$`).join(" ; ")}.`);
    tableauEgal(6, { irr: true });
  }
  // 7
  {
    egalites(7, "-9 = \\dfrac{-9}{1}");
    egalites(7, "1{,}75 = \\dfrac{175}{100} = \\dfrac{7}{4}");
    egalites(7, "-0{,}3 = \\dfrac{-3}{10}");
    const d22 = decimales(22, 7, 6);
    const pi = String(Math.PI).slice(2, 7);
    ecrit(7, `$22 \\div 7 = 3{,}${d22}\\ldots$ alors que $\\pi = 3{,}${pi}\\ldots$`);
    const i = [...d22].findIndex((ch, j) => ch !== pi[j]);
    v.ok(`7. 22/7 et π diffèrent au ${i + 1}e chiffre après la virgule`, i === 2 && c(7).includes("dès le troisième chiffre après la virgule"));
    ecrit(7, "Réponse : $-9 = \\dfrac{-9}{1}$, $1{,}75 = \\dfrac{7}{4}$, $-0{,}3 = \\dfrac{-3}{10}$ et $\\dfrac{22}{7}$ sont rationnels");
    tableauEgal(7, { irr: true });
  }
  // 8
  {
    v.ok("8. 9/13 < 11/13 et 4/9 < 4/7", inf(Q(9, 13), Q(11, 13)) && inf(Q(4, 9), Q(4, 7)));
    ecrit(8, `$\\dfrac{4}{9} = 0{,}${decimales(4, 9, 3)}\\ldots$ et $\\dfrac{4}{7} = 0{,}${decimales(4, 7, 3)}\\ldots$`);
    ecrit(8, `Réponse : $\\dfrac{11}{13} ${inf(Q(9, 13), Q(11, 13)) ? ">" : "<"} \\dfrac{9}{13}$ et $\\dfrac{4}{9} ${inf(Q(4, 9), Q(4, 7)) ? "<" : ">"} \\dfrac{4}{7}$.`);
    const b = barresDe(bloc(8));
    v.ok("8. les deux barres : 4/9 et 4/7, même numérateur", !!b && egal(b[0], Q(4, 9)) && egal(b[1], Q(4, 7)));
  }

  v.titre("★★ Type devoir");
  // 9
  {
    const liste = [[Q(1, 3), "\\dfrac{1}{3}"], [Q(7, 12), "\\dfrac{7}{12}"], [Q(3, 4), "\\dfrac{3}{4}"], [Q(5, 6), "\\dfrac{5}{6}"]];
    ordre(9, liste);
    for (const [n, d, m] of [[5, 6, 10], [3, 4, 9], [1, 3, 4]]) egalites(9, `\\dfrac{${n}}{${d}} = \\dfrac{${m}}{12}`);
    // Le piège : ranger d'après les numérateurs de départ met 7/12 en dernier.
    const naif = [[1, 3], [3, 4], [5, 6], [7, 12]].sort((a, b) => a[0] - b[0]);
    const vrai = [[1, 3], [7, 12], [3, 4], [5, 6]];
    v.ok("9. l'ordre des numérateurs met 7/12 dernier, le vrai rang est deuxième", naif.at(-1)[1] === 12 && vrai[1][1] === 12 && c(9).includes("alors qu'il est deuxième"));
    pointsFideles(9);
    intervalle(9, Q(1, 3), Q(5, 6));
  }
  // 10
  {
    egalites(10, "\\dfrac{7}{10} = \\dfrac{21}{30}");
    egalites(10, "\\dfrac{5}{6} = \\dfrac{25}{30}");
    v.ok("10. 7/10 < 5/6, écrit", inf(Q(7, 10), Q(5, 6)) && c(10).includes("donc $\\dfrac{7}{10} < \\dfrac{5}{6}$"));
    v.ok("10. −5/6 < −7/10, écrit", inf(Q(-5, 6), Q(-7, 10)) && c(10).includes(": $-\\dfrac{5}{6} < -\\dfrac{7}{10}$"));
    egalites(10, "-1 = -\\dfrac{30}{30}");
    ordre(10, [[Q(-1), "-1"], [Q(-5, 6), "-\\dfrac{5}{6}"], [Q(-7, 10), "-\\dfrac{7}{10}"], [Q(1, 5), "\\dfrac{1}{5}"]]);
    pointsFideles(10);
    intervalle(10, Q(-5, 6), Q(-7, 10));
  }
  // 11
  {
    const lea = Q(17, 20), ines = Q(9, 10);
    v.ok("11. biathlon : 20 cibles = 4 tirs de 5, 10 cibles = 2 tirs de 5", 4 * 5 === 20 && 2 * 5 === 10);
    egalites(11, `\\dfrac{17}{20} = \\dfrac{${tex(fois(lea, Q(100)))}}{100} = ${tex(lea)}`);
    egalites(11, `\\dfrac{9}{10} = \\dfrac{${tex(fois(ines, Q(100)))}}{100} = ${tex(ines)}`);
    v.ok("11. 17/20 < 9/10, écrit", inf(lea, ines) && c(11).includes("donc $\\dfrac{17}{20} < \\dfrac{9}{10}$"));
    const [gagne, perd, pg, pp] = inf(lea, ines) ? ["Inès", "Léa", ines, lea] : ["Léa", "Inès", lea, ines];
    ecrit(11, `Réponse : ${gagne} a le meilleur taux de réussite, $${tex(fois(pg, Q(100)))}$ % contre $${tex(fois(pp, Q(100)))}$ % pour ${perd}.`);
    const g = grillesDe(bloc(11));
    v.ok("11. deux grilles : les carreaux coloriés disent chaque fraction de la légende", g.length === 2 && g.every((x) => x.legende.split(": ")[1].split(" = ").every((s) => egal(lab(s), Q(x.colories, 100)))), JSON.stringify(g));
    v.ok("11. les grilles sont celles de Léa (17/20) et d'Inès (9/10)", g.length === 2 && egal(Q(g[0].colories, 100), lea) && egal(Q(g[1].colories, 100), ines));
  }
  // 12
  {
    const f12 = [[3, 8], [7, 25], [5, 12], [4, 15]];
    ecrit(12, `$3 \\div 8 = ${tex(Q(3, 8))}$`);
    ecrit(12, `$7 \\div 25 = ${tex(Q(7, 25))}$`);
    ecrit(12, `$5 \\div 12 = 0{,}${decimales(5, 12, 5)}\\ldots$`);
    ecrit(12, `$4 \\div 15 = 0{,}${decimales(4, 15, 4)}\\ldots$`);
    const r12 = restes(5, 12, 8).slice(2), r15 = restes(4, 15, 8);
    v.ok(`12. les restes de 5 ÷ 12 valent toujours ${r12[0]} à partir du troisième chiffre`, r12.every((x) => x === r12[0]) && c(12).includes(`le reste vaut toujours $${r12[0]}$, et le chiffre $6$`));
    v.ok(`12. les restes de 4 ÷ 15 valent toujours ${r15[1]}`, r15.slice(1).every((x) => x === r15[1]) && c(12).includes(`le reste vaut toujours $${r15[1]}$, le $6$`));
    egalites(12, "\\dfrac{7}{25} = \\dfrac{28}{100}");
    egalites(12, "8 \\times 125 = 1\\,000");
    egalites(12, "25 \\times 4 = 100");
    const exactes = f12.filter(([n, d]) => finie(Q(n, d))).map(([n, d]) => `$\\dfrac{${n}}{${d}}$`);
    const infinies = f12.filter(([n, d]) => !finie(Q(n, d))).map(([n, d]) => `$\\dfrac{${n}}{${d}}$`);
    ecrit(12, `Réponse : ${exactes.join(" et ")} ont une écriture décimale exacte, ${infinies.join(" et ")} non ; les quatre sont des nombres rationnels.`);
    v.ok("12. 12 et 15 sont des multiples de 3, et 3 ne divise ni 10, ni 100, ni 1 000", 12 % 3 === 0 && 15 % 3 === 0 && [10, 100, 1000].every((x) => x % 3 !== 0));
    tableauDecimal(12);
  }
  // 13
  {
    const a = Q(45, 105), b = Q(36, 84);
    v.ok("13. 45/105 = 36/84 = 3/7, par la réduction", egal(a, b) && irreductible(a, 3, 7));
    v.ok("13. les PGCD sont 15 et 12", 45 / Number(a.n) === 15 && 36 / Number(b.n) === 12);
    for (const t of ["45 = 15 \\times 3", "105 = 15 \\times 7", "36 = 12 \\times 3", "84 = 12 \\times 7", "\\dfrac{45}{105} = \\dfrac{3}{7}", "\\dfrac{36}{84} = \\dfrac{3}{7}", `45 \\times 84 = ${tex(Q(45 * 84))}`, `105 \\times 36 = ${tex(Q(105 * 36))}`]) egalites(13, t);
    v.ok("13. les produits en croix sont égaux", 45 * 84 === 105 * 36);
    ecrit(13, `Réponse : $\\dfrac{45}{105} = \\dfrac{36}{84} = ${texFrac(a)}$.`);
    const t = etapesDe(bloc(13));
    const ok = !!t && t.entete.slice(1).every((h, i) => {
      const [n, d] = h.split("/").map(Number);
      const k = Number(t.lignes[0][i + 1]);
      return Q(n / k, d / k) && lab(t.lignes[1][i + 1]) && egal(lab(t.lignes[1][i + 1]), Q(n, d)) && t.lignes[1][i + 1] === `${n / k}/${d / k}` && egal(Q(n / k, d / k), Q(n, d)) && irreductible(Q(n / k, d / k), n / k, d / k);
    });
    v.ok("13. le tableau : chaque fraction divisée par son PGCD donne 3/7, irréductible", ok, JSON.stringify(t));
  }
  // 14
  {
    const q14 = Q(65, 100);
    egalites(14, `\\dfrac{65}{100} = ${texFrac(q14)}`);
    egalites(14, `\\dfrac{65}{100} = ${tex(q14)}`);
    egalites(14, "\\dfrac{13}{20} = \\dfrac{39}{60}");
    egalites(14, "\\dfrac{2}{3} = \\dfrac{40}{60}");
    egalites(14, "\\dfrac{3}{5} = \\dfrac{60}{100} = 0{,}6");
    v.ok("14. 13 est premier : 13/20 irréductible", [2, 3, 5, 7, 11].every((p) => 13 % p !== 0) && irreductible(q14, 13, 20));
    ecrit(14, `$65$ % est un peu ${inf(q14, Q(2, 3)) ? "MOINS" : "PLUS"} que les deux tiers`);
    ecrit(14, `${inf(Q(3, 5), q14) ? "Oui, c'est vrai" : "Non"}.`);
    ecrit(14, `Réponse : $65$ %, c'est ${texFrac(q14) ? `$${texFrac(q14)}$` : ""}, soit $${tex(q14)}$ ; c'est un peu ${inf(q14, Q(2, 3)) ? "moins" : "plus"} que les deux tiers, et ${inf(Q(3, 5), q14) ? "plus" : "moins"} que les trois cinquièmes.`);
    const g = grillesDe(bloc(14));
    v.ok("14. la grille : 65 carreaux sur 100, et la légende dit 65/100 = 13/20", g.length === 1 && egal(Q(g[0].colories, 100), q14) && g[0].legende.split(": ")[1].split(" = ").every((s) => egal(lab(s), q14)), JSON.stringify(g));
  }
  // 15
  {
    const n15 = [[Q(3, 5), "\\dfrac{3}{5} = 0{,}6"], [Q(6, 5), "\\dfrac{6}{5} = 1{,}2"], [Q(7, 4), "\\dfrac{7}{4} = 1{,}75"]];
    for (const [n, d] of [[7, 4], [3, 5], [6, 5]]) ecrit(15, `$\\dfrac{${n}}{${d}} = ${n} \\div ${d} = ${tex(Q(n, d))}$`);
    v.ok("15. 3/5 et 0,6 sont le même nombre", egal(Q(3, 5), D("0,6")));
    v.ok("15. 6/5 et 7/4 dépassent 1", inf(Q(1), Q(6, 5)) && inf(Q(1), Q(7, 4)));
    v.ok("15. rangés de gauche à droite, et écrits ainsi", n15.every((p, i) => i === 0 || inf(n15[i - 1][0], p[0])) && c(15).includes(`Réponse : de gauche à droite, $${n15[0][1]}$, puis $${n15[1][1]}$, puis $${n15[2][1]}$.`));
    pointsFideles(15);
    intervalle(15, Q(0), Q(1));
  }
  // 16
  {
    const entre = [13, 14, 15].map((k) => Q(k, 28));
    v.ok("16. 13/28, 14/28, 15/28 sont strictement entre 3/7 et 4/7", entre.every((q) => inf(Q(3, 7), q) && inf(q, Q(4, 7))));
    v.ok("16. en quatorzièmes, une seule fraction entre les deux", [7].every((k) => inf(Q(3, 7), Q(k, 14)) && inf(Q(k, 14), Q(4, 7))) && !inf(Q(3, 7), Q(6, 14)) && !inf(Q(8, 14), Q(4, 7)));
    for (const t of ["\\dfrac{3}{7} = \\dfrac{6}{14}", "\\dfrac{4}{7} = \\dfrac{8}{14}", "\\dfrac{7}{14} = \\dfrac{1}{2}", "\\dfrac{3}{7} = \\dfrac{12}{28}", "\\dfrac{4}{7} = \\dfrac{16}{28}", "\\dfrac{14}{28} = \\dfrac{1}{2}"]) egalites(16, t);
    ordre(16, [[Q(3, 7), "\\dfrac{3}{7}"], [entre[0], "\\dfrac{13}{28}"], [entre[1], texFrac(entre[1])], [entre[2], "\\dfrac{15}{28}"], [Q(4, 7), "\\dfrac{4}{7}"]]);
    pointsFideles(16);
    intervalle(16, Q(3, 7), Q(4, 7));
  }

  v.titre("★★★ Problèmes");
  // 17
  {
    const T = { Awa: Q(42, 48), Julie: Q(35, 40), Nina: Q(27, 30) };
    egalites(17, `\\dfrac{42}{48} = ${texFrac(T.Awa)}`);
    egalites(17, `\\dfrac{35}{40} = ${texFrac(T.Julie)}`);
    egalites(17, `\\dfrac{27}{30} = ${texFrac(T.Nina)}`);
    v.ok("17. les diviseurs écrits sont les PGCD (6, 5, 3)", 42 / Number(T.Awa.n) === 6 && 35 / Number(T.Julie.n) === 5 && 27 / Number(T.Nina.n) === 3 && c(17).includes("je divise par $6$") && c(17).includes("je divise par $5$") && c(17).includes("je divise par $3$"));
    v.ok("17. Awa et Julie ont le même taux, Nina un autre", egal(T.Awa, T.Julie) && !egal(T.Awa, T.Nina) && c(17).includes("b) Awa et Julie"));
    ecrit(17, `$\\dfrac{7}{8} = 7 \\div 8 = ${tex(Q(7, 8))}$ et $\\dfrac{9}{10} = ${tex(Q(9, 10))}$`);
    const meilleure = Object.entries(T).reduce((m, x) => (inf(m[1], x[1]) ? x : m))[0];
    v.ok(`17. la meilleure est ${meilleure}, et le corrigé le dit`, c(17).includes(`: ${meilleure} est la meilleure tireuse.`));
    v.ok("17. Awa a le plus de réussites sans avoir le meilleur taux", 42 > 35 && 42 > 27 && meilleure !== "Awa");
    pointsFideles(17);
    intervalle(17, Q(7, 8), Q(9, 10));
  }
  // 18
  {
    const P = { Paul: Q(150, 200), Marc: Q(7, 10), Tom: D("0,72") };
    egalites(18, `\\dfrac{150}{200} = ${texFrac(P.Paul)}`);
    egalites(18, `${texFrac(P.Paul)} = ${tex(P.Paul)}`);
    egalites(18, `\\dfrac{7}{10} = ${tex(P.Marc)}`);
    egalites(18, `\\dfrac{72}{100} = ${texFrac(P.Tom)}`);
    ecrit(18, "$0{,}70 < 0{,}72 < 0{,}75$");
    const rang = Object.keys(P).sort((a, b) => (inf(P[a], P[b]) ? 1 : -1));
    // ⚠️ Le source porte `\n` en deux signes : on coupe sur l'antislash-n.
    const rep = c(18).split("\\n").find((l) => l.startsWith("Réponse")) ?? "";
    v.ok(`18. le classement ${rang.join(", ")}, dans la réponse`, rang.every((n, i) => i === 0 || rep.indexOf(n) > rep.indexOf(rang[i - 1])) && rep.includes(`${rang[0]} est en tête`), rep);
    ecrit(18, `Réponse : Paul est en tête avec les $${texFrac(P.Paul)}$ de l'étape, puis Tom avec $${texFrac(P.Tom)}$, puis Marc avec $${texFrac(P.Marc)}$.`);
    pointsNommes(18, P);
    intervalle(18, P.Marc, P.Paul);
  }
  // 19
  {
    egalites(19, "\\dfrac{50}{20} = \\dfrac{5}{2} = 2{,}5");
    egalites(19, "\\dfrac{34}{17} = 2");
    egalites(19, "34 = 2 \\times 17");
    egalites(19, "\\dfrac{34}{20} = \\dfrac{17}{10} = 1{,}7");
    egalites(19, "\\dfrac{50}{28} = \\dfrac{25}{14}");
    ecrit(19, `$25 \\div 14 = 1{,}${decimales(25, 14, 3)}\\ldots$`);
    egalites(19, `34 \\times 28 = ${34 * 28}`);
    egalites(19, `20 \\times 50 = ${tex(Q(20 * 50))}`);
    v.ok("19. 34/20 < 50/28, écrit", inf(Q(34, 20), Q(50, 28)) && c(19).includes("donc $\\dfrac{34}{20} < \\dfrac{50}{28}$"));
    v.ok("19. 50/11 : pas de décimal exact", !finie(Q(50, 11)));
    ecrit(19, `$50 \\div 11 = 4{,}${decimales(50, 11, 6)}\\ldots$`);
    v.ok("19. les pignons cités (17, 20, 28, 11) sont dans la cassette 11-28", [17, 20, 28, 11].every((p) => p >= 11 && p <= 28));
    ecrit(19, `Réponse : $\\dfrac{50}{20} = ${tex(Q(50, 20))}$ et $\\dfrac{34}{17} = ${tex(Q(34, 17))}$ ; $\\dfrac{50}{28}$ est plus grand que $\\dfrac{34}{20}$`);
    tableauDecimal(19);
  }
  // 20
  {
    const A = Q(12, 28), B = Q(13, 30);
    egalites(20, `\\dfrac{12}{28} = ${texFrac(A)}`);
    v.ok("20. 13/30 est irréductible", irreductible(B, 13, 30));
    ecrit(20, `$3 \\div 7 = 0{,}${decimales(3, 7, 6)}\\ldots$ et $13 \\div 30 = 0{,}${decimales(13, 30, 4)}\\ldots$`);
    v.ok("20. aucune des deux n'a d'écriture décimale exacte", !finie(A) && !finie(B));
    const mil = (q) => tex(Q(Math.round(versNombre(q) * 1000), 1000));
    ecrit(20, `Au millième : $${mil(A)}$ et $${mil(B)}$.`);
    v.ok("20. au dixième, les deux arrondis sont égaux (0,4)", Math.round(versNombre(A) * 10) === 4 && Math.round(versNombre(B) * 10) === 4 && c(20).includes("les deux parts valent $0{,}4$"));
    egalites(20, "7 \\times 30 = 210");
    egalites(20, "\\dfrac{3}{7} = \\dfrac{90}{210}");
    egalites(20, "\\dfrac{13}{30} = \\dfrac{91}{210}");
    egalites(20, "\\dfrac{2}{5} = \\dfrac{84}{210}");
    v.ok("20. 3/7 < 13/30 : la 4e B", inf(A, B) && c(20).includes("Réponse : la 4e B a la plus grande part"));
    v.ok("20. 2/5 est sous les deux parts : la principale a raison", inf(Q(2, 5), A) && inf(Q(2, 5), B) && c(20).includes("Elle a raison."));
    pointsFideles(20);
    pointsNommes(20, { A, B }, 0.0002);
    intervalle(20, Q(2, 5), D("0,44"));
  }

  v.titre("Les dessins");
  const dessines = f.blocs.filter((b) => /\bschema:/.test(b)).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20);
  v.ok("les énoncés ne réclament pas d'opération (ni somme, ni produit de fractions)", f.enonces.every((t) => !/Calcule|Additionne|Multiplie/.test(t)));
  void e;
}

lancer({
  nom: "FRACTIONS ET NOMBRES RATIONNELS · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-fractions-nombres.tsx",
  notionId: "fraction_nombre",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : 7 × 3 mal fait", "Donc $\\\\dfrac{4}{7} = \\\\dfrac{12}{21}$", "Donc $\\\\dfrac{4}{7} = \\\\dfrac{12}{28}$"],
    ["ex. 1 : la seconde barre n'est plus égale", "comparer([3, 5], [12, 20])", "comparer([3, 5], [12, 25])"],
    ["ex. 2 : 6/10 déclarée égale à 2/3 dans le tableau", "\"3/5\", \"2/3\"]", "\"2/3\", \"2/3\"]"],
    ["ex. 3 : arrêt avant l'irréductible", "Réponse : $\\\\dfrac{30}{42} = \\\\dfrac{5}{7}$", "Réponse : $\\\\dfrac{30}{42} = \\\\dfrac{15}{21}$"],
    ["ex. 3 : une ligne du tableau d'étapes fausse", "[\"÷ 3\", \"5\", \"7\"]", "[\"÷ 3\", \"5\", \"9\"]"],
    ["ex. 4 : 1/9 posé au mauvais endroit", "{ value: 0.111, label: \"1/9 (faux)\"", "{ value: 0.2, label: \"1/9 (faux)\""],
    ["ex. 5 : la barre lue comme une virgule", "\\\\dfrac{7}{5} = 1{,}4$.", "\\\\dfrac{7}{5} = 7{,}5$."],
    ["ex. 6 : 3/50 devenu 3/5", "$0{,}06 = \\\\dfrac{3}{50}$.", "$0{,}06 = \\\\dfrac{3}{5}$."],
    ["ex. 7 : 1,75 mal écrit dans le tableau", "\"7/4\", \"−3/10\"", "\"7/5\", \"−3/10\""],
    ["ex. 8 : le grand dénominateur pris pour une grande fraction", "et $\\\\dfrac{4}{9} < \\\\dfrac{4}{7}$.", "et $\\\\dfrac{4}{9} > \\\\dfrac{4}{7}$."],
    ["ex. 9 : rangé d'après les numérateurs", "Réponse : $\\\\dfrac{1}{3} < \\\\dfrac{7}{12} < \\\\dfrac{3}{4}", "Réponse : $\\\\dfrac{1}{3} < \\\\dfrac{3}{4} < \\\\dfrac{7}{12}"],
    ["ex. 10 : −7/10 posé trop à gauche", "{ value: -0.7, label: \"−7/10\"", "{ value: -0.9, label: \"−7/10\""],
    ["ex. 10 : l'ordre des positifs gardé chez les négatifs", "Réponse : $-1 < -\\\\dfrac{5}{6} < -\\\\dfrac{7}{10}", "Réponse : $-1 < -\\\\dfrac{7}{10} < -\\\\dfrac{5}{6}"],
    ["ex. 11 : la grille d'Inès mal coloriée", "grille(90, ", "grille(80, "],
    ["ex. 11 : le nombre de cibles pris pour le taux", "Réponse : Inès a le meilleur", "Réponse : Léa a le meilleur"],
    ["ex. 12 : la division posée fausse", "$5 \\\\div 12 = 0{,}41666\\\\ldots$", "$5 \\\\div 12 = 0{,}41777\\\\ldots$"],
    ["ex. 12 : 5/12 arrondi dans le tableau", "\"0,4166…\"", "\"0,4167…\""],
    ["ex. 13 : un produit en croix faux", "$45 \\\\times 84 = 3\\\\,780$", "$45 \\\\times 84 = 3\\\\,760$"],
    ["ex. 14 : « près des deux tiers » lu comme « plus »", "un peu MOINS que les deux tiers", "un peu PLUS que les deux tiers"],
    ["ex. 14 : la grille du nucléaire mal coloriée", "grille(65, ", "grille(56, "],
    ["ex. 15 : 6/5 placé avant 1", "{ value: 1.2, label: \"6/5\"", "{ value: 0.8, label: \"6/5\""],
    ["ex. 16 : une fraction hors de l'intervalle", "\\\\dfrac{13}{28} < \\\\dfrac{1}{2}", "\\\\dfrac{11}{28} < \\\\dfrac{1}{2}"],
    ["ex. 17 : le plus de réussites pris pour le meilleur taux", "Nina est la meilleure tireuse", "Awa est la meilleure tireuse"],
    ["ex. 17 : 7/8 mal placé", "{ value: 0.875, label: \"7/8\"", "{ value: 0.85, label: \"7/8\""],
    ["ex. 18 : 0,7 et 0,72 lus comme 7 et 72", "puis Tom avec $\\\\dfrac{18}{25}$, puis Marc avec $\\\\dfrac{7}{10}$", "puis Marc avec $\\\\dfrac{7}{10}$, puis Tom avec $\\\\dfrac{18}{25}$"],
    ["ex. 18 : Tom posé devant Paul", "{ value: 0.72, label: \"Tom\"", "{ value: 0.77, label: \"Tom\""],
    ["ex. 19 : un produit en croix faux", "$34 \\\\times 28 = 952$", "$34 \\\\times 28 = 925$"],
    ["ex. 19 : 25/14 mal divisé dans le tableau", "\"1,785…\"", "\"1,758…\""],
    ["ex. 20 : 13/30 mal mis en 210es", "\\\\dfrac{13}{30} = \\\\dfrac{91}{210}", "\\\\dfrac{13}{30} = \\\\dfrac{93}{210}"],
    ["ex. 20 : la 4e A posée trop à droite", "{ value: 0.4286, label: \"A\"", "{ value: 0.4386, label: \"A\""],
    ["un corrigé sans dessin", "          schema: comparer([4, 9], [4, 7]),\n", ""],
    ["une micro de la notion sœur (fraction_calcul)", "micros: [\"fraction_rationnel\"],", "micros: [\"fraction_additionner\"],"],
    ["un $ dans un dessin", "label: \"de 0 à 1\"", "label: \"de $0$ à 1\""],
  ],
});
