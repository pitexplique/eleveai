// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Puissances et notation
// scientifique » de 4e (lib/fiches-exercices/maths-4e-puissances.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé écrit les puissances en clair et compte les
// zéros ; ici, chaque puissance est recalculée en fractions EXACTES par
// multiplications répétées (`puissance()` du module commun, une boucle), chaque
// notation scientifique par `sci` / `texSci`, et chaque chaîne d'égalités du
// corrigé est RELUE et évaluée membre par membre (`outilsEgalites`, `evalTex`).
// Le résultat doit ensuite se LIRE dans la phrase du corrigé.
//
// ⭐ LES SCHÉMAS SONT RELUS : les cases des tableaux, les barres des diagrammes,
// les points de la droite graduée (11) et les rectangles du carré découpé (10)
// sont extraits du source et comparés au recalcul. Et on les COMPTE : Frédéric
// veut un schéma dans la grande majorité des corrigés (25/09).
//
//   node scripts/verifier-exercices-puissances-4e.mjs
//
// Sort en code 1 à la première divergence, ou si un contrôle négatif passe
// inaperçu. Le socle (structure, dollars, micros, casses) : verifier-exercices-commun.mjs.

import {
  Q, D, fois, div, plus, moins, egal, inf, puissance, sci, tex, texSci, texFrac, lireFeuille, litPuissance, outilsEgalites, lancer,
} from "./verifier-exercices-commun.mjs";

const dix = (n) => puissance(Q(10), n);

const SUP = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-" };
const exposantSup = (s) => Number([...s].map((c) => SUP[c]).join(""));

/** Une case → fraction exacte : « 1 024 », « 0,0001 », « −8 », « 10⁻⁴ », « 3,2 × 10⁻⁴ ». */
function lireCase(s) {
  const t = s.replace(/\s/g, "").replace(/−/g, "-");
  const m = t.match(/^(?:([-\d,]+)×)?10([⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+)$/);
  if (m) return fois(m[1] ? D(m[1]) : Q(1), dix(exposantSup(m[2])));
  return D(t);
}
/** Une puissance écrite dans une case : « (−3)⁴ », « −3⁴ », « 2⁻⁴ », « 11⁴ ». */
function lirePuissanceCase(s) {
  const t = s.replace(/−/g, "-").trim();
  const m = t.match(/^(-?)(?:\((-?\d+)\)|(\d+))([⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+)$/);
  if (!m) throw new Error(`puissance illisible : ${s}`);
  const base = Q(m[2] ?? m[3]);
  const val = puissance(base, exposantSup(m[4]));
  return { base, n: exposantSup(m[4]), val: m[1] ? fois(Q(-1), val) : val, parentheses: !!m[2] };
}
/** « a op b » ou « a op b = c » dans une case : op ∈ ×, ÷. Renvoie [valeur calculée, c lu]. */
function lireOperation(s) {
  const [gauche, droite] = s.split("=").map((x) => x.trim());
  const m = gauche.match(/^(.+?)\s*([×÷])\s*(.+)$/);
  const val = m ? (m[2] === "×" ? fois(lireCase(m[1]), lireCase(m[3])) : div(lireCase(m[1]), lireCase(m[3]))) : lireCase(gauche);
  return [val, droite === undefined ? null : lireCase(droite)];
}
/** Les lignes des `tableau([...])` d'un bloc, rangées par leur en-tête. */
function lignesTableau(bloc) {
  const rows = {};
  for (const m of bloc.matchAll(/\[\s*("(?:[^"\\]|\\.)*"(?:,\s*"(?:[^"\\]|\\.)*")+)\s*,?\s*\]/g)) {
    const cells = JSON.parse(`[${m[1]}]`);
    if (!cells[0].startsWith("puissance_")) rows[cells[0]] = cells.slice(1);
  }
  return rows;
}
/** Les barres des `diagramme(...)` d'un bloc. */
const barres = (bloc) => [...bloc.matchAll(/label: "([^"]+)", value: ([\d.]+)/g)].map((m) => [m[1], Number(m[2])]);
/** Les points de la droite graduée d'un bloc. */
const points = (bloc) => Object.fromEntries([...bloc.matchAll(/\{ value: (-?[\d.]+), label: "([^"]+)" \}/g)].map((m) => [m[2], D(m[1])]));

function verifier(source, v) {
  const f = lireFeuille(source);
  const { corrections, blocs, enonces } = f;
  const c = (k) => corrections[k - 1] ?? "";
  const b = (k) => blocs[k - 1] ?? "";
  const e = (k) => enonces[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");
  const lit = (k, base, n) => v.ok(`${k}. le corrigé écrit « = ${base}^${n} »`, litPuissance(c(k), base, n));
  const egalites = outilsEgalites(v, { corrections });
  // ⚠️ Dans le texte relu, le saut de ligne est encore la séquence `\n` du source.
  const etapes = (k) => c(k).split("\\n");
  const ligne = (k, lettre) => etapes(k).find((l) => l.startsWith(`${lettre})`)) ?? "";
  const reponse = (k) => etapes(k).find((l) => l.startsWith("Réponse :")) ?? "";

  v.titre("Les corrigés dessinés");
  // ⭐ Vingt sur vingt : cette feuille dessine chaque corrigé, et un schéma
  // retiré par mégarde doit se voir.
  const dessines = blocs.filter((bl) => /\n\s+schema:/.test(bl)).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20, "Frédéric : des schémas dans la grande majorité des corrigés");
  const sansReponse = corrections.findIndex((t) => !t.split("\\n").at(-1).startsWith("Réponse : "));
  v.ok("chaque corrigé finit par sa ligne « Réponse : »", sansReponse === -1, `corrigé ${sansReponse + 1}`);
  v.ok("chaque corrigé nomme son piège", corrections.every((t) => t.includes("⛔ Le piège :")));
  v.ok("aucune règle de 3e sur les exposants (a^{m+n}, a^{m-n})", !/\^\{[^}]*[+][^}]*\}|\^\{\d+ ?- ?\d+\}|\^\{[a-z] ?[+\-] ?[a-z]\}/.test(corrections.join(" ") + f.textes.join(" ")));

  v.titre("★ Un seul geste");
  // 1.
  lit(1, 6, 5);
  lit(1, "(-4)", 2);
  dit(1, `11^4 = 11 \\times 11 \\times 11 \\times 11$`);
  dit(1, `$6^5 = ${tex(puissance(Q(6), 5))}$`);
  v.ok("1. le piège : 6 × 5 n'est pas 6⁵", !egal(Q(30), puissance(Q(6), 5)) && c(1).includes("$6 \\times 5 = 30$"));
  const t1 = lignesTableau(b(1));
  v.ok("1. schéma : chaque produit a « exposant » facteurs égaux à la base", (t1["Produit"] ?? []).length === 3 && t1["Produit"].every((p, i) => {
    const facteurs = p.split("×").map((x) => x.replace(/[()]/g, "").replace(/−/g, "-"));
    const lu = lirePuissanceCase(t1["Écriture"][i]);
    return facteurs.length === Number(t1["Exposant"][i]) && facteurs.every((x) => egal(D(x), lireCase(t1["Base"][i]))) && lu.n === facteurs.length && egal(lu.base, D(facteurs[0]));
  }));

  // 2.
  const r2 = [[2, 6], [5, 3], [9, 2], [8, 0]].map(([a, n]) => [a, n, puissance(Q(a), n)]);
  dit(2, `2^6 = 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 = ${tex(r2[0][2])}$`);
  dit(2, `5^3 = 5 \\times 5 \\times 5 = ${tex(r2[1][2])}$`);
  dit(2, `9^2 = 9 \\times 9 = ${tex(r2[2][2])}$`);
  dit(2, `8^0 = 8 \\div 8 = ${tex(div(puissance(Q(8), 1), Q(8)))}$`);
  v.ok("2. 8⁰ = 8¹ ÷ 8 = 1", egal(div(puissance(Q(8), 1), Q(8)), r2[3][2]));
  dit(2, `Réponse : ${r2.map(([a, n, r]) => `$${a}^${n} = ${tex(r)}$`).join(" ; ")}.`, "la ligne Réponse recalculée");
  const b2 = barres(b(2));
  v.ok("2. schéma : les six barres sont 2¹ à 2⁶", b2.length === 6 && b2.every(([l, val], i) => egal(lirePuissanceCase(l).val, puissance(Q(2), i + 1)) && egal(Q(val), puissance(Q(2), i + 1))));
  const t2 = lignesTableau(b(2));
  v.ok("2. schéma : l'échelle des 8ⁿ", (t2["Puissance"] ?? []).length === 3 && t2["Puissance"].every((p, i) => egal(lirePuissanceCase(p).val, D(t2["Valeur"][i]))));
  v.ok("2. schéma : chaque marche divise par 8", (t2["Valeur"] ?? []).every((x, i, t) => i === 0 || egal(div(D(t[i - 1]), D(t2["On divise par"][i])), D(x))));

  // 3.
  dit(3, `(-3)^4 = (-3) \\times (-3) \\times (-3) \\times (-3) = ${tex(puissance(Q(-3), 4))}$`);
  dit(3, `-3^4 = -(3 \\times 3 \\times 3 \\times 3) = ${tex(fois(Q(-1), puissance(Q(3), 4)))}$`);
  dit(3, `(-5)^3 = (-5) \\times (-5) \\times (-5) = ${tex(puissance(Q(-5), 3))}$`);
  dit(3, `$(-1)^7 = ${tex(puissance(Q(-1), 7))}$`);
  const t3 = lignesTableau(b(3));
  v.ok("3. schéma : chaque écriture vaut sa valeur", (t3["Écriture"] ?? []).length === 4 && t3["Écriture"].every((s, i) => egal(lirePuissanceCase(s).val, lireCase(t3["Valeur"][i]))));
  v.ok("3. schéma : les signes", (t3["Signe"] ?? []).every((s, i) => s === (inf(lireCase(t3["Valeur"][i]), Q(0)) ? "−" : "+")));
  v.ok("3. schéma : les facteurs négatifs comptés", (t3["Facteurs négatifs"] ?? []).every((s, i) => {
    const p = lirePuissanceCase(t3["Écriture"][i]);
    const n = p.parentheses && inf(p.base, Q(0)) ? p.n : 0;
    return s === (n === 0 ? "aucun" : String(n));
  }));
  dit(3, `Réponse : a) $${tex(puissance(Q(-3), 4))}$ ; b) $${tex(fois(Q(-1), puissance(Q(3), 4)))}$ ; c) $${tex(puissance(Q(-5), 3))}$ ; d) $${tex(puissance(Q(-1), 7))}$.`, "la ligne Réponse recalculée");

  // 4.
  egalites(4, `2^{-4} = \\dfrac{1}{2^4} = \\dfrac{1}{16}`);
  dit(4, `$1 \\div 16 = ${tex(puissance(Q(2), -4))}$`);
  egalites(4, `5^{-1} = \\dfrac{1}{5^1} = \\dfrac{1}{5} = 0{,}2`);
  egalites(4, `3^{-2} = \\dfrac{1}{3^2} = \\dfrac{1}{9}`);
  v.ok("4. 3⁻² est positif", inf(Q(0), puissance(Q(3), -2)));
  dit(4, `$2^{-4} = ${texFrac(puissance(Q(2), -4))} = ${tex(puissance(Q(2), -4))}$ ; $5^{-1} = ${texFrac(puissance(Q(5), -1))} = ${tex(puissance(Q(5), -1))}$ ; $3^{-2} = ${texFrac(puissance(Q(3), -2))}$`, "la ligne Réponse recalculée");
  const t4 = lignesTableau(b(4));
  v.ok("4. schéma : chaque 2ⁿ vaut sa case, de 2² à 2⁻⁴", (t4["Puissance"] ?? []).length === 7 && t4["Puissance"].every((p, i) => { const lu = lirePuissanceCase(p); return lu.n === 2 - i && egal(lu.val, D(t4["Valeur"][i])); }));

  // 5.
  dit(5, `$10^7 = ${tex(dix(7))}$`);
  dit(5, `$10^{-5} = ${tex(dix(-5))}$`);
  v.ok("5. 10 000 = 10⁴ et 0,000001 = 10⁻⁶", egal(D(10000), dix(4)) && egal(D("0,000001"), dix(-6)));
  dit(5, `$10\\,000 = 10^4$`);
  const n5 = [...Array(21).keys()].map((k) => -k).find((k) => egal(dix(k), D("0,000001")));
  dit(5, `sixième rang après la virgule : $0{,}000001 = 10^{${n5}}$`);
  dit(5, `Réponse : $10^7 = ${tex(dix(7))}$ ; $10^{-5} = ${tex(dix(-5))}$ ; $10\\,000 = 10^4$ ; $0{,}000001 = 10^{${n5}}$.`, "la ligne Réponse recalculée");
  v.ok("5. le piège : 10⁻⁷ n'est pas 0,000001", !egal(dix(-7), D("0,000001")));
  const t5 = lignesTableau(b(5));
  v.ok("5. schéma : chaque puissance vaut son écriture décimale", (t5["Puissance"] ?? []).length === 4 && t5["Puissance"].every((p, i) => egal(lireCase(p), lireCase(t5["Décimal"][i]))));
  v.ok("5. schéma : n zéros pour 10ⁿ, n rangs pour 10⁻ⁿ", (t5["Ce qu'on compte"] ?? []).every((s, i) => {
    const n = exposantSup(t5["Puissance"][i].slice(2));
    const [k, mot] = s.split(" ");
    return n < 0 ? mot === "rangs" && Number(k) === -n : mot === "zéros" && Number(k) === n;
  }));

  // 6.
  dit(6, `6{,}4 \\times 10^3 = ${tex(sci("6,4", 3))}$`);
  dit(6, `271 \\times 10^{-2} = ${tex(sci(271, -2))}$`);
  dit(6, `0{,}05 \\times 10^4 = ${tex(sci("0,05", 4))}$`);
  dit(6, `Réponse : a) $${tex(sci("6,4", 3))}$ ; b) $${tex(sci(271, -2))}$ ; c) $${tex(sci("0,05", 4))}$.`, "la ligne Réponse recalculée");
  const t6 = lignesTableau(b(6));
  v.ok("6. schéma : chaque calcul donne son résultat", (t6["Calcul"] ?? []).length === 3 && t6["Calcul"].every((s, i) => egal(lireCase(s), lireCase(t6["Résultat"][i]))));
  v.ok("6. schéma : la virgule bouge d'autant de rangs que l'exposant, dans son sens", (t6["La virgule"] ?? []).every((s, i) => {
    const n = exposantSup(t6["Calcul"][i].split("10")[1]);
    const [k, , , sens] = s.split(" ");
    return Number(k) === Math.abs(n) && sens === (n > 0 ? "droite" : "gauche");
  }));

  // 7.
  [[72000, "72\\,000"], ["0,00039", "0{,}00039"], [506, "506"], ["0,8", "0{,}8"]].forEach(([x, ecrit]) => dit(7, `$${ecrit} = ${texSci(D(x))}$`));
  v.ok("7. le piège : 5,6 × 10² vaut 560, pas 506", egal(sci("5,6", 2), Q(560)) && !egal(sci("5,6", 2), Q(506)));
  dit(7, `Réponse : a) $${texSci(D(72000))}$ ; b) $${texSci(D("0,00039"))}$ ; c) $${texSci(D(506))}$ ; d) $${texSci(D("0,8"))}$.`, "la ligne Réponse recalculée");
  const t7 = lignesTableau(b(7));
  v.ok("7. schéma : nombre = notation scientifique", (t7["Nombre"] ?? []).length === 4 && t7["Nombre"].every((s, i) => egal(lireCase(s), lireCase(t7["Scientifique"][i]))));
  v.ok("7. schéma : la mantisse est entre 1 et 10, les rangs valent |exposant|", (t7["Scientifique"] ?? []).every((s, i) => {
    const [m, p] = s.split(" × 10");
    return !inf(D(m), Q(1)) && inf(D(m), Q(10)) && Number(t7["La virgule bouge de"][i].split(" ")[0]) === Math.abs(exposantSup(p));
  }));

  // 8.
  const paires8 = [[["4,1", 6], ["9,7", 5]], [["2,3", -3], ["2,3", -2]], [["6,05", 4], ["6,5", 4]]];
  const ecrit = ([m, n]) => `${m.replace(",", "{,}")} \\times 10^{${n}}`;
  const symboles8 = paires8.map(([x, y]) => (inf(sci(...x), sci(...y)) ? "<" : ">"));
  paires8.forEach(([x, y], i) => {
    const l = "abc"[i];
    v.ok(`8. ${l}) ${ecrit(x)} ${symboles8[i]} ${ecrit(y)}`, ligne(8, l).includes(`${ecrit(x)} ${symboles8[i]} ${ecrit(y)}$`), ligne(8, l).slice(-80));
  });
  dit(8, `Réponse : a) $${symboles8[0]}$ ; b) $${symboles8[1]}$ ; c) $${symboles8[2]}$.`, "la ligne Réponse recalculée");
  const t8 = lignesTableau(b(8));
  v.ok("8. schéma : chaque ligne en clair, avec le bon signe", ["a)", "b)", "c)"].every((k, i) => {
    const [g, s, d] = t8[k] ?? [];
    return g && egal(lireCase(g), sci(...paires8[i][0])) && egal(lireCase(d), sci(...paires8[i][1])) && s === symboles8[i];
  }));
  const b8 = barres(b(8));
  v.ok("8. schéma : les deux barres du a)", b8.length === 2 && b8.every(([l, val], i) => egal(lireCase(l), sci(...paires8[0][i])) && egal(Q(val), sci(...paires8[0][i]))));

  v.titre("★★ Type devoir");
  // 9. Les produits en clair, recalculés en décimaux exacts.
  const A9 = fois(dix(6), dix(3));
  const B9 = fois(D("0,01"), D("0,001"));
  const C9 = div(dix(7), dix(4));
  dit(9, `$A = ${tex(dix(6))} \\times ${tex(dix(3))} = ${tex(A9)}$`);
  dit(9, `$B = 0{,}01 \\times 0{,}001 = ${tex(B9)}$`);
  dit(9, `$C = ${tex(dix(7))} \\div ${tex(dix(4))} = ${tex(C9)}$`);
  [[A9, "A"], [B9, "B"], [C9, "C"]].forEach(([val, nom]) => {
    const n = [...Array(41).keys()].map((k) => k - 20).find((k) => egal(dix(k), val));
    v.ok(`9. ${nom} = 10^${n}`, n !== undefined && reponse(9).includes(`$${nom} = 10^${n < 0 || n > 9 ? `{${n}}` : n}$`), reponse(9));
    lit(9, 10, n);
  });
  v.ok("9. le piège : 10¹⁸ n'est pas un milliard", !egal(dix(18), A9));
  const t9 = lignesTableau(b(9));
  v.ok("9. schéma : calcul, en clair, résultat et puissance concordent", (t9["Calcul"] ?? []).length === 3 && t9["Calcul"].every((s, i) => {
    const [a] = lireOperation(s);
    const [clair] = lireOperation(t9["En clair"][i]);
    return egal(a, clair) && egal(clair, lireCase(t9["Résultat"][i])) && egal(clair, lireCase(t9["Puissance de 10"][i]));
  }));

  // 10. Chaque chaîne d'égalités, évaluée membre par membre.
  egalites(10, "2^5 + 3^3 = 32 + 27 = 59");
  egalites(10, "4^2 \\times 10^3 = 16 \\times 1\\,000 = 16\\,000");
  egalites(10, "5 \\times 2^3 - 6^2 = 5 \\times 8 - 36 = 40 - 36 = 4");
  // Le résultat se lit À SA PLACE, fermé par son dollar : « = 4 » est aussi le début de « = 44 ».
  dit(10, `= 40 - 36 = ${tex(moins(fois(Q(5), puissance(Q(2), 3)), puissance(Q(6), 2)))}$.`);
  egalites(10, "(2 + 3)^2 = 5^2 = 25");
  egalites(10, "2^2 + 3^2 = 4 + 9 = 13");
  v.ok("10. D ≠ E", !egal(puissance(Q(5), 2), plus(puissance(Q(2), 2), puissance(Q(3), 2))));
  dit(10, `$A = 59$ ; $B = 16\\,000$ ; $C = 4$ ; $D = 25$ et $E = 13$`);
  const carre = [...source.matchAll(/^\s*\[(\d+), (\d+), (\d+), (\d+), "(\d+)"\],\r?$/gm)].map((m) => m.slice(1).map(Number));
  const couvre = carre.length === 4 && carre.reduce((s, r) => s + r[2] * r[3], 0) === 25 && carre.every(([x, y, w, h]) => x + w <= 5 && y + h <= 5);
  const disjoints = carre.every((r, i) => carre.every((s, j) => i >= j || r[0] + r[2] <= s[0] || s[0] + s[2] <= r[0] || r[1] + r[3] <= s[1] || s[1] + s[3] <= r[1]));
  v.ok("10. schéma : quatre rectangles qui pavent le carré de 5 sur 5", couvre && disjoints);
  v.ok("10. schéma : chaque aire écrite est la bonne", carre.every(([, , w, h, a]) => w * h === a));
  v.ok("10. schéma : un carré de 2 × 2, un de 3 × 3, deux rectangles 2 × 3", carre.map(([, , w, h]) => `${w}x${h}`).sort().join(" ") === "2x2 2x3 3x2 3x3");
  v.ok("10. l'écart (2 + 3)² − (2² + 3²) = 12 = les deux rectangles", egal(moins(Q(25), Q(13)), Q(12)) && c(10).includes("soit $12$ cases"));

  // 11.
  const v11 = { A: puissance(Q(2), -1), B: fois(Q(-1), puissance(Q(2), 1)), C: puissance(Q(4), 0), D: puissance(Q(-1), 5), E: puissance(Q(2), 1) };
  egalites(11, "2^{-1} = \\dfrac{1}{2} = 0{,}5");
  egalites(11, "-2^{1} = -2");
  egalites(11, "4^{0} = 1");
  egalites(11, "(-1)^{5} = -1");
  egalites(11, "2^{1} = 2");
  v.ok("11. les valeurs de l'énoncé", e(11).includes("$A = 2^{-1}$, $B = -2^{1}$, $C = 4^{0}$, $D = (-1)^{5}$ et $E = 2^{1}$"));
  const ordre11 = Object.keys(v11).sort((x, y) => (inf(v11[x], v11[y]) ? -1 : 1));
  dit(11, `Réponse : $${ordre11.join(" < ")}$, soit $${ordre11.map((k) => tex(v11[k])).join(" < ")}$.`, `l'ordre recalculé : ${ordre11.join(" < ")}`);
  const p11 = points(b(11));
  v.ok("11. schéma : les cinq points à leur place sur la droite", Object.keys(v11).every((k) => p11[k] && egal(p11[k], v11[k])) && Object.keys(p11).length === 5);
  v.ok("11. schéma : A à droite de zéro, B à gauche", inf(Q(0), p11.A) && inf(p11.B, Q(0)));

  // 12.
  egalites(12, "23 \\times 10^{5} = 2\\,300\\,000");
  egalites(12, "2\\,300\\,000 = 2{,}3 \\times 10^{6}");
  egalites(12, "0{,}47 \\times 10^{-2} = 0{,}47 \\times 0{,}01 = 0{,}0047");
  egalites(12, "0{,}0047 = 4{,}7 \\times 10^{-3}");
  egalites(12, "715 \\times 10^{-6} = 0{,}000715");
  egalites(12, "0{,}000715 = 7{,}15 \\times 10^{-4}");
  dit(12, `Réponse : a) $${texSci(sci(23, 5))}$ ; b) $${texSci(sci("0,47", -2))}$ ; c) $${texSci(sci(715, -6))}$.`, "la ligne Réponse recalculée");
  v.ok("12. le piège : 2,3 × 10⁴ = 23 000", egal(sci("2,3", 4), Q(23000)) && c(12).includes("vaut $23\\,000$"));
  const t12 = lignesTableau(b(12));
  v.ok("12. schéma : donné = en clair = scientifique", (t12["Donné"] ?? []).length === 3 && t12["Donné"].every((s, i) => egal(lireCase(s), lireCase(t12["En clair"][i])) && egal(lireCase(s), lireCase(t12["Scientifique"][i]))));

  // 13.
  dit(13, `$1\\,400\\,000 = ${texSci(D(1400000))}$ km`);
  dit(13, `$0{,}000002 = ${texSci(D("0,000002"))}$ m`);
  dit(13, `$30\\,000\\,000\\,000\\,000 = ${texSci(D("30000000000000"))}$ cellules`);
  v.ok("13. d) 30 × 10¹² vaut bien le nombre", egal(sci(30, 12), D("30000000000000")));
  v.ok("13. le piège : 3 × 10¹² est dix fois trop petit", egal(fois(sci(3, 12), Q(10)), D("30000000000000")));
  const t13 = lignesTableau(b(13));
  v.ok("13. schéma : en clair = scientifique, mantisses entre 1 et 10", (t13["En clair"] ?? []).length === 3 && t13["En clair"].every((s, i) => egal(lireCase(s), lireCase(t13["Scientifique"][i])) && texSci(lireCase(s)).replace(/\{,\}/g, ",") .startsWith(t13["Scientifique"][i].split(" ")[0])));

  // 14. On trie les valeurs exactes.
  const aRanger = [["7{,}5 \\times 10^{-3}", sci("7,5", -3)], ["1{,}2 \\times 10^{-2}", sci("1,2", -2)], ["9 \\times 10^{-4}", sci(9, -4)], ["0{,}008", D("0,008")], ["3{,}4 \\times 10^{-3}", sci("3,4", -3)]];
  const ordre14 = [...aRanger].sort((x, y) => (inf(x[1], y[1]) ? -1 : 1)).map((x) => x[0]).join(" < ");
  dit(14, `Réponse : $${ordre14}$.`, `l'ordre recalculé : ${ordre14}`);
  dit(14, `$0{,}008 = ${texSci(D("0,008"))}$`);
  const t14 = lignesTableau(b(14));
  v.ok("14. schéma : écriture = décimal, colonnes croissantes", (t14["Écriture"] ?? []).length === 5 && t14["Écriture"].every((s, i) => egal(lireCase(s), D(t14["Décimal"][i]))) && t14["Décimal"].map(D).every((x, i, t) => i === 0 || inf(t[i - 1], x)));
  v.ok("14. schéma : la ligne des exposants", (t14["Exposant"] ?? []).every((s, i) => Number(s.replace("−", "-")) === exposantSup(t14["Écriture"][i].split("10")[1])));

  // 15.
  egalites(15, "(5 \\times 4) \\times (10^{3} \\times 10^{2}) = 20 \\times (1\\,000 \\times 100) = 20 \\times 100\\,000 = 2\\,000\\,000");
  egalites(15, "\\dfrac{9}{3} \\times \\dfrac{100\\,000}{100} = 3 \\times 1\\,000 = 3\\,000");
  egalites(15, "(2{,}5 \\times 4) \\times 10^{-2} = 10 \\times 0{,}01 = 0{,}1");
  const A15 = fois(sci(5, 3), sci(4, 2));
  const B15 = div(sci(9, 5), sci(3, 2));
  const C15 = fois(sci("2,5", -2), Q(4));
  [["A", A15], ["B", B15], ["C", C15]].forEach(([nom, val]) => dit(15, `Donc $${nom} = ${texSci(val)}$.`));
  dit(15, `Réponse : $A = ${texSci(A15)}$ ; $B = ${texSci(B15)}$ ; $C = ${texSci(C15)}$.`, "la ligne Réponse recalculée");
  v.ok("15. le piège : 20 × 10⁵ vaut A", egal(sci(20, 5), A15));
  const t15 = lignesTableau(b(15));
  const ops15 = [...(t15["Les nombres"] ?? []), ...(t15["Les puissances de 10"] ?? [])].filter((s) => s.includes("="));
  v.ok("15. schéma : chaque opération écrite est juste", ops15.length === 5 && ops15.every((s) => { const [val, lu] = lireOperation(s); return egal(val, lu); }));
  v.ok("15. schéma : nombres × puissances = résultat", ["A", "B", "C"].every((_, i) => {
    const n = lireOperation(t15["Les nombres"][i])[1];
    const p = lireOperation(t15["Les puissances de 10"][i]);
    return egal(fois(n, p[1] ?? p[0]), lireCase(t15["Résultat"][i])) && egal(lireCase(t15["Résultat"][i]), [A15, B15, C15][i]);
  }));

  // 16.
  const cotes16 = [
    [fois(puissance(Q(2), 3), puissance(Q(2), 2)), puissance(Q(2), 5), "="],
    [plus(puissance(Q(3), 2), puissance(Q(3), 2)), puissance(Q(3), 4), "="],
    [puissance(Q(10), -2), puissance(Q(10), -3), "<"],
    [fois(puissance(Q(5), 2), puissance(Q(2), 2)), puissance(Q(10), 2), "="],
  ];
  const vrai16 = cotes16.map(([g, d, rel]) => (rel === "=" ? egal(g, d) : inf(g, d)));
  v.ok("16. vrai, faux, faux, vrai", JSON.stringify(vrai16) === "[true,false,false,true]");
  ["a", "b", "c", "d"].forEach((l, i) => {
    const s = ligne(16, l);
    v.ok(`16. ${l}) ${vrai16[i] ? "VRAI" : "FAUX"}`, s.includes(vrai16[i] ? "VRAI" : "FAUX") && !s.includes(vrai16[i] ? "FAUX" : "VRAI"), s.slice(0, 60));
  });
  dit(16, `Réponse : ${vrai16.map((x, i) => `${"abcd"[i]}) ${x ? "vrai" : "faux"}`).join(" ; ")}.`, "la ligne Réponse recalculée");
  egalites(16, "3^2 + 3^2 = 9 + 9 = 18");
  egalites(16, "5^2 \\times 2^2 = 25 \\times 4 = 100");
  dit(16, `alors que $3^4 = ${tex(puissance(Q(3), 4))}$`);
  const t16 = lignesTableau(b(16));
  v.ok("16. schéma : les deux côtés et le verdict", (t16["Verdict"] ?? []).length === 4 && cotes16.every(([g, d], i) => egal(D(t16["À gauche"][i]), g) && egal(D(t16["À droite"][i]), d) && t16["Verdict"][i] === (vrai16[i] ? "VRAI" : "FAUX")));

  v.titre("★★★ Problèmes");
  // 17.
  const parc = fois(Q(40), sci(5, 6));
  dit(17, `$40 \\times 5\\,000\\,000 = ${tex(parc)}$ kWh`);
  dit(17, `$${texSci(parc)}$ kWh`);
  const foyers = div(parc, sci(5, 3));
  dit(17, `$${tex(parc)} \\div 5\\,000 = ${tex(foyers)}$ foyers`);
  v.ok("17. contrôle : 40 000 × 5 000", egal(fois(foyers, Q(5000)), parc) && c(17).includes(`$${tex(foyers)} \\times 5\\,000 = ${tex(parc)}$`));
  const parcs = div(sci("4,5", 11), parc);
  dit(17, `$4{,}5 \\times 10^{11} = ${tex(sci("4,5", 11))}$`);
  dit(17, `$${tex(sci("4,5", 11))} \\div ${tex(parc)} = 4\\,500 \\div 2 = ${tex(parcs)}$ parcs`);
  v.ok("17. retirer huit zéros aux deux ne change pas le quotient", egal(div(div(sci("4,5", 11), dix(8)), div(parc, dix(8))), div(Q(4500), Q(2))));
  v.ok("17. le piège : 2,25 est mille fois trop petit", egal(fois(div(D("4,5"), Q(2)), Q(1000)), parcs) && c(17).includes("$4{,}5 \\div 2 = 2{,}25$"));
  dit(17, `Réponse : a) $${texSci(parc)}$ kWh ; b) $${tex(foyers)}$ foyers ; c) environ $${tex(parcs)}$ parcs.`, "la ligne Réponse recalculée");
  const t17 = lignesTableau(b(17));
  const attendus17 = [sci(5, 6), parc, sci(5, 3), sci("4,5", 11)];
  v.ok("17. schéma : les quatre grandeurs, en scientifique et en clair", (t17["kWh par an"] ?? []).length === 4 && attendus17.every((x, i) => egal(lireCase(t17["kWh par an"][i]), x) && egal(lireCase(t17["En clair"][i]), x)));

  // 18.
  const m3 = fois(fois(Q(50), Q(25)), Q(2));
  const litres = fois(m3, dix(3));
  const mL = fois(litres, dix(3));
  const goutte = div(Q(1), Q(20));
  const gouttes = div(mL, goutte);
  dit(18, `$50 \\times 25 \\times 2 = ${tex(m3)}$ m³`);
  dit(18, `$${tex(m3)} \\times 1\\,000 = ${tex(litres)}$ L, soit $${texSci(litres)}$ L`);
  dit(18, `$${tex(litres)} \\times 1\\,000 = ${tex(mL)}$ mL, soit $${texSci(mL)}$ mL`);
  dit(18, `$1 \\div 20 = ${tex(goutte)}$ mL, soit $${texSci(goutte)}$ mL`);
  dit(18, `$${tex(mL)} \\times 20 = ${tex(gouttes)}$, soit $${texSci(gouttes)}$ gouttes`);
  v.ok("18. diviser par 0,05, c'est multiplier par 20", egal(div(mL, D("0,05")), fois(mL, Q(20))));
  v.ok("18. plus de gouttes que de millilitres", inf(mL, gouttes));
  const t18 = lignesTableau(b(18));
  const q18 = (t18["Quantité"] ?? []).map(lireCase);
  v.ok("18. schéma : 2 500 m³, puis L, mL, gouttes", q18.length === 4 && egal(q18[0], m3) && egal(q18[1], litres) && egal(q18[2], mL) && egal(q18[3], gouttes));
  v.ok("18. schéma : chaque passage multiplie par ce qui est écrit", q18.every((x, i) => i === 0 || egal(fois(q18[i - 1], lireCase(t18["On multiplie par"][i])), x)));

  // 19.
  const animaux = { abeille: sci(1, -4), colibri: sci(2, -3), humain: sci(7, 1), éléphant: sci(6, 3), baleine: sci("1,5", 5) };
  v.ok("19. les masses de l'énoncé", e(19).includes("baleine bleue : $1{,}5 \\times 10^{5}$ ; abeille : $1 \\times 10^{-4}$ ; éléphant d'Afrique : $6 \\times 10^{3}$ ; colibri d'Elena : $2 \\times 10^{-3}$ ; être humain : $7 \\times 10^{1}$"));
  const ordre19 = Object.keys(animaux).sort((x, y) => (inf(animaux[x], animaux[y]) ? -1 : 1));
  const noms19 = ordre19.map((k) => (k === "humain" ? "être humain" : k)).join(", ");
  dit(19, `Ordre : ${noms19}.`, `l'ordre recalculé : ${noms19}`);
  const r19b = div(animaux.baleine, animaux["éléphant"]);
  const r19c = div(animaux.colibri, animaux.abeille);
  dit(19, `$${tex(animaux.baleine)} \\div ${tex(animaux["éléphant"])} = 150 \\div 6 = ${tex(r19b)}$`);
  dit(19, `$${tex(animaux.colibri)} \\div ${tex(animaux.abeille)} = 20 \\div 1 = ${tex(r19c)}$`);
  v.ok("19. multiplier par 10 000 ne change pas le quotient", egal(div(fois(animaux.colibri, Q(10000)), fois(animaux.abeille, Q(10000))), Q(20)));
  const grammes = fois(animaux.abeille, dix(3));
  dit(19, `$0{,}0001 \\times 1\\,000 = ${tex(grammes)}$ g`);
  dit(19, `Réponse : a) ${noms19} ; b) $${tex(r19b)}$ fois ; c) $${tex(r19c)}$ abeilles ; d) $${tex(grammes)}$ g.`, "la ligne Réponse recalculée");
  const t19 = lignesTableau(b(19));
  v.ok("19. schéma : animaux dans l'ordre croissant", (t19["Animal"] ?? []).join(",") === ordre19.join(","));
  v.ok("19. schéma : masses et écritures en clair concordent", (t19["Animal"] ?? []).every((k, i) => egal(lireCase(t19["Masse (kg)"][i]), animaux[k]) && egal(lireCase(t19["En clair (kg)"][i]), animaux[k])));

  // 20. Le tournoi simulé, tour par tour.
  const joueurs = [128];
  while (joueurs.at(-1) > 1) joueurs.push(joueurs.at(-1) / 2);
  const tours = joueurs.length - 1;
  v.ok("20. 128 = 2⁷ : sept tours", tours === 7 && egal(puissance(Q(2), tours), Q(128)));
  lit(20, 2, tours);
  egalites(20, `128 = ${Array(tours).fill(2).join(" \\times ")} = 2^${tours}`);
  dit(20, `il faut $${tours}$ tours`);
  const quarts = joueurs[4];
  dit(20, `$128 \\div 2 \\div 2 \\div 2 \\div 2 = ${quarts}$ joueurs`);
  egalites(20, "\\dfrac{8}{128} = \\dfrac{1}{16} = \\dfrac{1}{2^4} = 2^{-4}");
  v.ok("20. 8/128 = 2⁻⁴", egal(Q(quarts, 128), puissance(Q(2), -4)));
  const matchs = joueurs.slice(0, -1).map((j) => j / 2);
  v.ok("20. 127 matchs = 128 − 1", matchs.reduce((s, x) => s + x, 0) === 127);
  dit(20, `$${matchs.join(" + ")} = ${matchs.reduce((s, x) => s + x, 0)}$ matchs`);
  let n1024 = 0;
  for (let x = 1024; x > 1; x /= 2) n1024++;
  v.ok("20. 1 024 joueurs : dix tours", n1024 === 10 && egal(puissance(Q(2), 10), Q(1024)));
  dit(20, `$1\\,024 = 2^{10}$, donc $${n1024}$ tours`);
  const t20 = lignesTableau(b(20));
  v.ok("20. schéma : joueurs et matchs de chaque tour", (t20["Tour"] ?? []).length === 7 && t20["Joueurs"].every((s, i) => Number(s) === joueurs[i]) && t20["Matchs"].every((s, i) => Number(s) === matchs[i]));
  const b20 = barres(b(20));
  v.ok("20. schéma : les sept barres se divisent par deux", b20.length === 7 && b20.every(([l, val], i) => l === `${i + 1}` && val === joueurs[i]));
  // ⛔ Mesuré à 375 px le 25/09 : un canvas SVG de plus de 220 de large fait
  // tomber ses textes sous 11 px effectifs (dessin rendu à ~235 px).
  const larges = [...source.matchAll(/size: \{ width: (\d+)/g)].map((m) => Number(m[1])).filter((w) => w > 220);
  const vb = source.match(/viewBox=\{`0 0 \$\{5 \* U \+ MARGE \+ 8\}/) ? 5 * 34 + 24 + 8 : 0;
  v.ok("les canvas font au plus 220 de large, le carré SVG aussi (≥ 11 px à 375)", larges.length === 0 && vb > 0 && vb <= 220 && 13 * 208 / vb >= 11, `largeurs : ${larges.join(", ")} ; carré : ${vb}`);
}

lancer({
  nom: "PUISSANCES ET NOTATION SCIENTIFIQUE · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-puissances.tsx",
  notionId: "puissance_ecriture",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : 6⁵ pris pour 6⁴", "= 6^5$.\\nb)", "= 6^4$.\\nb)"],
    ["ex. 2 : le piège appliqué, 2⁶ = 12", "\\\\times 2 \\\\times 2 = 64$. J'avance", "\\\\times 2 \\\\times 2 = 12$. J'avance"],
    ["ex. 3 : −3⁴ = 81", "(3 \\\\times 3 \\\\times 3 \\\\times 3) = -81$", "(3 \\\\times 3 \\\\times 3 \\\\times 3) = 81$"],
    ["ex. 4 : 5⁻¹ = −5", "\\\\dfrac{1}{5} = 0{,}2$.\\nc)", "\\\\dfrac{1}{5} = -5$.\\nc)"],
    ["ex. 5 : 0,000001 = 10⁻⁷", "après la virgule : $0{,}000001 = 10^{-6}$", "après la virgule : $0{,}000001 = 10^{-7}$"],
    ["ex. 6 : 271 × 10⁻² = 27,1", "271 \\\\times 10^{-2} = 2{,}71$", "271 \\\\times 10^{-2} = 27{,}1$"],
    ["ex. 7 : le zéro du milieu perdu", "je garde le $0$ du milieu : $506 = 5{,}06 \\\\times 10^{2}$", "je garde le $0$ du milieu : $506 = 5{,}6 \\\\times 10^{2}$"],
    ["ex. 8 : la mantisse décide", "4{,}1 \\\\times 10^{6} > 9{,}7 \\\\times 10^{5}$.", "4{,}1 \\\\times 10^{6} < 9{,}7 \\\\times 10^{5}$."],
    ["ex. 9 : A = 10¹⁸", "Réponse : $A = 10^9$", "Réponse : $A = 10^{18}$"],
    ["ex. 10 : 5 × 2³ − 6² = 44", "= 40 - 36 = 4$", "= 40 - 36 = 44$"],
    ["ex. 11 : A placé à −0,5", "{ value: 0.5, label: \"A\" }", "{ value: -0.5, label: \"A\" }"],
    ["ex. 12 : virgule et exposant dans le même sens", "$2\\\\,300\\\\,000 = 2{,}3 \\\\times 10^{6}$", "$2\\\\,300\\\\,000 = 2{,}3 \\\\times 10^{4}$"],
    ["ex. 13 : un zéro oublié", "= 3 \\\\times 10^{13}$ cellules", "= 3 \\\\times 10^{12}$ cellules"],
    ["ex. 14 : 9 × 10⁻⁴ rangé en dernier", "Réponse : $9 \\\\times 10^{-4} < 3{,}4", "Réponse : $3{,}4"],
    ["ex. 15 : B = 3 × 10²", "Donc $B = 3 \\\\times 10^{3}$", "Donc $B = 3 \\\\times 10^{2}$"],
    ["ex. 16 : b) déclaré vrai", "$3^4 = 81$. FAUX", "$3^4 = 81$. VRAI"],
    ["ex. 17 : 2 250 parcs devenus 2 500", "= 4\\\\,500 \\\\div 2 = 2\\\\,250$ parcs", "= 4\\\\,500 \\\\div 2 = 2\\\\,500$ parcs"],
    ["ex. 18 : la goutte à 5 × 10⁻³ mL", "mL, soit $5 \\\\times 10^{-2}$ mL", "mL, soit $5 \\\\times 10^{-3}$ mL"],
    ["ex. 19 : la baleine 250 fois plus lourde", "= 150 \\\\div 6 = 25$", "= 150 \\\\div 6 = 250$"],
    ["ex. 20 : 128 = 2⁸", "\\\\times 2 = 2^7$. Chaque", "\\\\times 2 = 2^8$. Chaque"],
    ["ex. 2 schéma : une barre fausse", "{ label: \"2⁵\", value: 32 }", "{ label: \"2⁵\", value: 30 }"],
    ["ex. 4 schéma : 2⁻³ = 0,25", "\"0,25\", \"0,125\", \"0,0625\"", "\"0,25\", \"0,25\", \"0,0625\""],
    ["ex. 10 schéma : un rectangle de travers", "[2, 2, 3, 3, \"9\"],", "[2, 2, 3, 3, \"8\"],"],
    ["ex. 18 schéma : un passage à × 100", "[\"On multiplie par\", \"\", \"1 000\", \"1 000\", \"20\"]", "[\"On multiplie par\", \"\", \"100\", \"1 000\", \"20\"]"],
    ["ex. 20 schéma : les matchs faux", "[\"Matchs\", \"64\", \"32\", \"16\", \"8\", \"4\", \"2\", \"1\"]", "[\"Matchs\", \"64\", \"32\", \"16\", \"8\", \"4\", \"2\", \"2\"]"],
    ["ex. 19 schéma : colibri et abeille échangés", "[\"Animal\", \"abeille\", \"colibri\"", "[\"Animal\", \"colibri\", \"abeille\""],
    ["un corrigé qui perd son schéma (19 sur 20)", "schema: carreDecoupe,", ""],
    ["les barres remises à 300 de large (8,7 px à 375)", "size: { width: 220, height: 190 }", "size: { width: 300, height: 220 }"],
    ["ex. 1 : un dollar perdu", "Réponse : a) $6^5$ ;", "Réponse : a) 6^5$ ;"],
    ["une micro inconnue du coach", "micros: [\"puissance_comprendre\"],", "micros: [\"puissance_inconnue\"],"],
    ["une règle de 3e glissée dans un corrigé", "Donc $A = 10^9$, un milliard.", "Donc $A = 10^{6+3} = 10^9$, un milliard."],
  ],
});
