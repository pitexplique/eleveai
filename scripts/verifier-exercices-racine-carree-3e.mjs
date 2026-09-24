// Recalcul INDÉPENDANT des vingt corrigés de la feuille « La racine carrée » de
// 3e (lib/fiches-exercices/maths-3e-racine-carree.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé ANNONCE une racine (« √196 = 14 ») ; ici on la
// CHERCHE, entier par entier ou centième par centième. Un encadrement est
// retrouvé par un balayage des carrés, une équation x² = a par un balayage des
// entiers de −100 à 100, un « plus petit n » par essais successifs. Chaque
// résultat est ensuite lu dans la phrase du corrigé. Les dessins (points de la
// droite graduée, sommets des triangles, côtés des carrés, points de la courbe)
// sont relus dans le source et confrontés au même recalcul.
//
//   node scripts/verifier-exercices-racine-carree-3e.mjs

import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/** La racine entière de n si n est un carré parfait, sinon null — par recherche. */
function racineEntiere(n) {
  for (let k = 0; k * k <= n; k++) if (k * k === n) return k;
  return null;
}
/** Le k tel que k² ≤ x < (k + 1)², par balayage. */
function partieEntiereRacine(x) {
  let k = 0;
  while ((k + 1) * (k + 1) <= x) k++;
  return k;
}
/** L'encadrement au pas donné (0,1…), par balayage : [a, a + pas]. */
function encadrementAuPas(x, pas) {
  const n = Math.round(1 / pas);
  let k = 0;
  while (((k + 1) / n) ** 2 <= x) k++;
  return [k / n, (k + 1) / n];
}
const proche = (x, y, eps = 1e-9) => Math.abs(x - y) < eps;
/** Un nombre écrit comme dans la feuille : 1\,566{,}61. */
function fr(x, d = null) {
  const s = d === null ? String(+x.toFixed(6)) : x.toFixed(d);
  const [e, f] = s.split(".");
  const groupe = e.length >= 4 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : e;
  return f ? `${groupe}{,}${f}` : groupe;
}

function verifier(source, v) {
  const { corrections, blocs } = lireFeuille(source);
  const c = (k) => corrections[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");
  /** √n trouvée par recherche, et lue « \sqrt{n} = r$ » dans le corrigé. */
  const rac = (k, n, suffixe = "$") => {
    const r = racineEntiere(n);
    v.ok(`${k}. √${n} = ${r} (trouvée par recherche)`, r !== null);
    dit(k, `\\sqrt{${fr(n)}} = ${r}${suffixe}`);
    return r;
  };
  /** √x encadrée par balayage, et l'encadrement lu dans le corrigé. */
  const enc = (k, x, sujet = `\\sqrt{${fr(x)}}`, avant = "") => {
    const a = partieEntiereRacine(x);
    v.ok(`${k}. ${a}² ≤ ${x} < ${a + 1}² et ${x} n'est pas un carré`, a * a < x && x < (a + 1) ** 2);
    dit(k, `${avant}${a} < ${sujet} < ${a + 1}$`);
    return a;
  };
  /** Un morceau du bloc de l'exercice k (le schéma est relu dans le source). */
  const dessin = (k, morceau) => v.ok(`${k}. le dessin porte « ${morceau} »`, (blocs[k - 1] ?? "").includes(morceau), "absent du schéma");

  v.titre("★ Un seul geste");
  v.ok("1. les nombres de carré 36 sont 6 et −6", [...Array(201).keys()].map((i) => i - 100).filter((x) => x * x === 36).join() === "-6,6");
  rac(1, 36, "$.");
  dit(1, "\\sqrt{-36}$ n'existe pas");

  v.ok("2. (√13)² = 13, √(11²) = 11, √3 × √3 = 3, (√0,7)² = 0,7", proche(Math.sqrt(13) ** 2, 13) && Math.sqrt(11 ** 2) === 11 && proche(Math.sqrt(3) * Math.sqrt(3), 3) && proche(Math.sqrt(0.7) ** 2, 0.7));
  dit(2, "\\left(\\sqrt{13}\\right)^2 = 13$");
  dit(2, "\\sqrt{11^2} = 11$");
  dit(2, "\\left(\\sqrt{3}\\right)^2 = 3$");
  dit(2, "\\left(\\sqrt{0{,}7}\\right)^2 = 0{,}7$");

  const liste3 = [64, 90, 121, 150, 196, 225, 250];
  const parfaits3 = liste3.filter((n) => racineEntiere(n) !== null);
  v.ok(`3. carrés parfaits : ${parfaits3.join(", ")}`, parfaits3.join() === "64,121,196,225");
  for (const n of parfaits3) rac(3, n, "$.");
  dit(3, `$${parfaits3.slice(0, -1).join("$, $")}$ et $${parfaits3.at(-1)}$.`, "la liste de la réponse");

  const unites = new Set([...Array(10).keys()].map((i) => (i * i) % 10));
  v.ok("4. les carrés finissent par 0, 1, 4, 5, 6 ou 9", [...unites].sort().join() === "0,1,4,5,6,9");
  const candidats4 = [2023, 1764, 578, 3600].filter((n) => unites.has(n % 10));
  v.ok("4. seuls 1 764 et 3 600 passent le test, et ce sont des carrés", candidats4.join() === "1764,3600" && candidats4.every((n) => racineEntiere(n) !== null));
  for (const n of candidats4) dit(4, `${racineEntiere(n)}^2 = ${fr(n)}$`);
  v.ok("4. 41 finit par 1 et n'est pas un carré", racineEntiere(41) === null);

  for (const [n, s] of [[81, "9"], [400, "20"], [0.25, "0{,}5"], [1, "1"], [0.04, "0{,}2"]]) {
    const r = Math.round(Math.sqrt(n) * 1e6) / 1e6;
    v.ok(`5. √${n} = ${r}, et ${r}² = ${n}`, fr(r) === s && proche(r * r, n));
    dit(5, `\\sqrt{${fr(n)}} = ${s}$`);
  }
  dit(5, `0{,}02^2 = ${fr(0.02 * 0.02)}$`);

  dit(6, `32^2 = ${fr(32 * 32)}$`);
  rac(6, 64, "$.");
  // √x = x ÷ 2, par balayage fin : les seules solutions sont 0 et 4.
  const sol6 = [];
  for (let i = 0; i <= 10000; i++) if (proche(Math.sqrt(i / 100), i / 200, 1e-12)) sol6.push(i / 100);
  v.ok("6. √x = x ÷ 2 seulement pour 0 et 4", sol6.join() === "0,4");
  dit(6, "seulement pour $x = 4$");
  const pts6 = [...(blocs[5] ?? "").matchAll(/\[([\d.]+), ([\d.]+)\]/g)].map((m) => [Number(m[1]), Number(m[2])]);
  v.ok(`6. les ${pts6.length} points de la courbe vérifient y = √x`, pts6.length >= 8 && pts6.every(([x, y]) => proche(y, Math.sqrt(x), 1e-4)));
  dessin(6, "{ x: 4, y: 2,");
  v.ok("6. la moitié tracée est y = 0,5x, et elle passe par (4 ; 2)", (blocs[5] ?? "").includes("q: [0, 0.5, 0]") && 0.5 * 4 === 2);

  for (const n of [30, 85, 3]) {
    const a = enc(7, n, undefined, "Donc $");
    dessin(7, `{ de: ${a}, a: ${a + 1}, deInclus: false, aInclus: false }`);
    const pt = (blocs[6] ?? "").match(new RegExp(`value: ([\\d.]+), label: "√${n}"`));
    v.ok(`7. le point de √${n} est à ${pt?.[1]}, soit √${n} au centième`, !!pt && Number(pt[1]) === +Math.sqrt(n).toFixed(2));
  }

  const nombres8 = [["4", 4], ["\\sqrt{17}", Math.sqrt(17)], ["4{,}2", 4.2], ["\\sqrt{15}", Math.sqrt(15)]];
  const ordre8 = [...nombres8].sort((x, y) => x[1] - y[1]).map((x) => x[0]).join(" < ");
  v.ok(`8. ordre recalculé : ${ordre8}`, ordre8 === "\\sqrt{15} < 4 < \\sqrt{17} < 4{,}2");
  dit(8, `Donc $${ordre8}$`);
  dit(8, `4{,}2^2 = ${fr(4.2 * 4.2)}$`);

  v.titre("★★ Type devoir");
  const A9 = 3 * Math.sqrt(25) - Math.sqrt(36);
  const B9 = Math.sqrt(8 ** 2 + 15 ** 2);
  const C9 = Math.sqrt(100 - 36);
  v.ok(`9. A = ${A9}, B = ${B9}, C = ${C9}, tous entiers`, [A9, B9, C9].every(Number.isInteger));
  dit(9, `A = 3 \\times 5 - 6 = ${A9}$`);
  dit(9, `B = \\sqrt{${8 ** 2 + 15 ** 2}} = ${B9}$`);
  dit(9, `C = \\sqrt{64} = ${C9}$`);
  v.ok("9. les pièges donnent autre chose : 8 + 15 ≠ B et √100 − √36 ≠ C", 8 + 15 !== B9 && Math.sqrt(100) - Math.sqrt(36) !== C9);
  dit(9, `Réponse : $A = ${A9}$ ; $B = ${B9}$ ; $C = ${C9}$.`);

  const sol = (a) => [...Array(201).keys()].map((i) => i - 100).filter((x) => x * x === a);
  v.ok("10. x² = 81 : −9 et 9 ; x² = −4 : rien ; x² = 0 : 0", sol(81).join() === "-9,9" && sol(-4).length === 0 && sol(0).join() === "0");
  dit(10, "$x = 9$ ou $x = -9$");
  dit(10, "une seule solution, $x = 0$");
  v.ok("10. √7 n'est pas entier, et (±√7)² = 7", sol(7).length === 0 && proche((-Math.sqrt(7)) ** 2, 7));
  const m10 = [...(blocs[9] ?? "").matchAll(/x: (-?[\d.]+), y: 7/g)].map((m) => Number(m[1]));
  v.ok(`10. les points du dessin (${m10.join(" ; ")}) sont ±√7 au centième, sur y = x²`, m10.length === 2 && m10[0] === -(+Math.sqrt(7).toFixed(2)) && m10[1] === +Math.sqrt(7).toFixed(2));
  dessin(10, "[{ q: [1, 0, 0] }]");

  enc(11, 200);
  const [d11a, d11b] = encadrementAuPas(200, 0.1);
  dit(11, `$${fr(d11a)}^2 = ${fr(d11a * d11a, 2)}$`);
  dit(11, `$${fr(d11b)}^2 = ${fr(d11b * d11b, 2)}$`);
  dit(11, `au dixième $${fr(d11a)} < \\sqrt{200} < ${fr(d11b)}$`);
  dessin(11, `{ de: ${d11a}, a: ${d11b}, deInclus: false, aInclus: false }`);
  dessin(11, `value: ${Math.sqrt(200).toFixed(2)}, label: "√200"`);

  for (const m of [12, 50, 45]) {
    let n = 1;
    while (racineEntiere(m * n) === null) n++;
    v.ok(`12. plus petit n pour ${m} : ${n} (${m} × ${n} = ${racineEntiere(m * n)}²)`, true);
    dit(12, `$n = ${n}$, et $${m} \\times ${n} = ${m * n} = ${racineEntiere(m * n)}^2$`);
  }

  const c13 = Math.sqrt(0.09);
  v.ok("13. côté √0,09 = 0,3 m", proche(c13, 0.3));
  dit(13, "\\sqrt{0{,}09} = 0{,}3$ m, soit $30$ cm");
  dit(13, `$3{,}6 \\div 0{,}3 = ${Math.round(3.6 / c13)}$`);
  const cote13 = Math.sqrt(12.96);
  const n13 = Math.round(cote13 / c13) ** 2;
  v.ok(`13. pièce de côté ${cote13} m : ${n13} carreaux, et 12,96 ÷ 0,09 = ${Math.round(12.96 / 0.09)}`, proche(cote13, 3.6) && n13 === Math.round(12.96 / 0.09));
  dit(13, `12 \\times 12 = ${n13}$ carreaux`);
  dessin(13, `{ cote: ${+c13.toFixed(6)}, aire: "0,09 m²", coteTexte: "√0,09 = 0,3 m" }`);

  const verdicts = [
    proche(Math.sqrt(36 + 64), Math.sqrt(36) + Math.sqrt(64)),
    proche(Math.sqrt(4 * 25), Math.sqrt(4) * Math.sqrt(25)),
    [0.25, 0.5, 2, 9].every((x) => Math.sqrt(x) < x),
    proche(Math.sqrt(16), 16 / 2),
  ];
  v.ok("14. faux, vrai, faux, faux", JSON.stringify(verdicts) === "[false,true,false,false]");
  ["a", "b", "c", "d"].forEach((l, i) => dit(14, `${l}) ${verdicts[i] ? "VRAI" : "FAUX"}.`));
  dit(14, `= 6 + 8 = ${Math.sqrt(36) + Math.sqrt(64)}$`);
  dit(14, `\\sqrt{0{,}25} = ${fr(Math.sqrt(0.25))}$`);

  const n15 = [...Array(200).keys()].filter((n) => 6 < Math.sqrt(n) && Math.sqrt(n) < 7);
  v.ok(`15. ${n15.length} entiers, de ${n15[0]} à ${n15.at(-1)}`, n15.length === 12);
  dit(15, `$${n15.at(-1)} - ${n15[0]} + 1 = ${n15.length}$`);
  const max15 = Math.max(...[...Array(200).keys()].filter((n) => Math.sqrt(n) < 10));
  dit(15, `Le plus grand entier est $n = ${max15}$`);

  const A16 = Math.sqrt(6) ** 2 + Math.sqrt(7 ** 2);
  const B16 = Math.sqrt(3) ** 2 * Math.sqrt(3) ** 2;
  const C16 = Math.sqrt(Math.sqrt(81));
  const D16 = (2 * Math.sqrt(5)) ** 2;
  v.ok("16. A = 13, B = 9, C = 3, D = 20", [A16, B16, C16, D16].every((x, i) => proche(x, [13, 9, 3, 20][i])));
  dit(16, `Réponse : $A = ${Math.round(A16)}$ ; $B = ${Math.round(B16)}$ ; $C = ${Math.round(C16)}$ ; $D = ${Math.round(D16)}$.`);
  dit(16, `= 4 \\times 5 = ${Math.round(D16)}$`);

  v.titre("★★★ Problèmes");
  rac(17, 10000, "$ m");
  enc(17, 20000);
  v.ok("17. 141,5² > 20 000 : l'arrondi au mètre est 141", 141.5 ** 2 > 20000 && Math.round(Math.sqrt(20000)) === 141);
  dit(17, `$141{,}5^2 = ${fr(141.5 ** 2)}$`);
  dit(17, `environ $${Math.round(Math.sqrt(20000))}$ m`);
  dit(17, `environ $${fr(Math.sqrt(20000) / 100, 2)}$, pas par $2$`);
  dit(17, `$200^2 = ${fr(200 ** 2)}$ m², soit QUATRE hectares`);
  const cotes17 = [...(blocs[16] ?? "").matchAll(/cote: ([\d.]+), aire: "(\d) ha"/g)].map((m) => [Number(m[1]), Number(m[2])]);
  v.ok("17. les carrés dessinés ont pour côté √(aire), à l'échelle", cotes17.length === 2 && cotes17.every(([cote, ha]) => proche(cote, Math.sqrt(ha * 10000), 0.01)));

  const d2 = 40 ** 2 + 20 ** 2;
  v.ok(`18. 40² + 20² = ${d2}`, d2 === 2000);
  dit(18, `= 1\\,600 + 400 = ${fr(d2)}$`);
  enc(18, d2, "d");
  const d18 = +Math.sqrt(d2).toFixed(2);
  dit(18, `\\sqrt{2\\,000} \\approx ${fr(d18, 2)}$ m. C'est bien entre`);
  dit(18, `$60 - ${fr(d18, 2)} = ${fr(60 - d18, 2)}$ m`);
  const t18 = (blocs[17] ?? "").match(/A: \[(\d+), (\d+)\], B: \[(\d+), (\d+)\], C: \[(\d+), (\d+)\]/)?.slice(1).map(Number);
  v.ok("18. le triangle dessiné est rectangle en B, de côtés 40 et 20", !!t18 && Math.hypot(t18[2] - t18[0], t18[3] - t18[1]) === 40 && Math.hypot(t18[4] - t18[2], t18[5] - t18[3]) === 20 && (t18[2] - t18[0]) * (t18[4] - t18[2]) + (t18[3] - t18[1]) * (t18[5] - t18[3]) === 0);
  v.ok("18. et son hypoténuse vaut √2000", !!t18 && proche(Math.hypot(t18[4] - t18[0], t18[5] - t18[1]) ** 2, 2000, 1e-6));

  const d19carre = 34.5 ** 2 + 19.4 ** 2;
  v.ok(`19. 34,5² + 19,4² = ${d19carre.toFixed(2)}`, proche(d19carre, 1566.61, 1e-6));
  dit(19, `= ${fr(34.5 ** 2, 2)} + ${fr(19.4 ** 2, 2)} = ${fr(d19carre, 2)}$`);
  const d19 = Math.sqrt(d19carre);
  dit(19, `\\approx ${fr(d19, 1)}$ cm`);
  v.ok(`19. ${partieEntiereRacine(d19carre)} < d < ${partieEntiereRacine(d19carre) + 1}`, partieEntiereRacine(d19carre) === 39);
  dit(19, "donc $39 < d < 40$");
  dit(19, `\\approx ${fr(d19 / 2.54, 1)}$ pouces`);
  v.ok("19. la somme des côtés dépasse la diagonale", 34.5 + 19.4 > d19);
  const t19 = (blocs[18] ?? "").match(/A: \[([\d.]+), ([\d.]+)\], B: \[([\d.]+), ([\d.]+)\], C: \[([\d.]+), ([\d.]+)\]/)?.slice(1).map(Number);
  v.ok("19. le triangle dessiné a les côtés de l'écran, et son hypoténuse ≈ 39,6", !!t19 && proche(t19[2] - t19[0], 34.5) && proche(t19[5] - t19[3], 19.4) && Math.hypot(t19[4] - t19[0], t19[5] - t19[1]).toFixed(1) === "39.6");
  dessin(19, `CA: "≈ ${fr(d19, 1).replace("{,}", ",")} cm"`);

  const t = (h) => Math.sqrt(h / 4.9);
  v.ok("20. t(19,6) = 2 et t(78,4) = 4", proche(t(19.6), 2) && proche(t(78.4), 4));
  dit(20, `$t = \\sqrt{4} = ${Math.round(t(19.6))}$ s`);
  dit(20, `$t = \\sqrt{16} = ${Math.round(t(78.4))}$ s`);
  const h20 = +(3 ** 2 * 4.9).toFixed(2);
  v.ok(`20. hauteur pour 3 s : ${h20} m, et t(${h20}) = 3`, proche(t(h20), 3));
  dit(20, `$h = 9 \\times 4{,}9 = ${fr(h20)}$ m`);
  dit(20, `\\sqrt{3} \\approx ${fr(Math.sqrt(3), 2)}$ s`);
  v.ok("20. hauteur × 4 → temps × 2", proche(t(4 * 19.6) / t(19.6), 2));
}

lancer({
  nom: "LA RACINE CARRÉE · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-racine-carree.tsx",
  notionId: "entier_racine_carree",
  classe: "3e",
  verifier,
  casses: [
    ["ex. 1 : la racine négative", "le nombre POSITIF dont le carré vaut $36$ : $\\\\sqrt{36} = 6$.", "le nombre POSITIF dont le carré vaut $36$ : $\\\\sqrt{36} = -6$."],
    ["ex. 3 : 150 déclaré carré parfait", "les carrés parfaits sont $64$, $121$, $196$ et $225$.", "les carrés parfaits sont $64$, $121$, $150$ et $225$."],
    ["ex. 4 : une racine fausse", "$42^2 = 1\\\\,764$ et", "$41^2 = 1\\\\,764$ et"],
    ["ex. 5 : le piège du décimal", "donc $\\\\sqrt{0{,}04} = 0{,}2$", "donc $\\\\sqrt{0{,}04} = 0{,}02$"],
    ["ex. 6 : la racine, c'est la moitié", "{ x: 4, y: 2, label", "{ x: 4, y: 3, label"],
    ["ex. 7 : √30 encadrée par 15 et 16", "Donc $5 < \\\\sqrt{30} < 6$", "Donc $15 < \\\\sqrt{30} < 16$"],
    ["ex. 7 : le point de √85 mal placé", "value: 9.22", "value: 9.5"],
    ["ex. 8 : √17 après 4,2", "Donc $\\\\sqrt{15} < 4 < \\\\sqrt{17} < 4{,}2$", "Donc $\\\\sqrt{15} < 4 < 4{,}2 < \\\\sqrt{17}$"],
    ["ex. 9 : B = 8 + 15", "B = \\\\sqrt{289} = 17$", "B = \\\\sqrt{289} = 23$"],
    ["ex. 10 : un point du dessin décalé", "{ x: 2.65, y: 7, label", "{ x: 2.5, y: 7, label"],
    ["ex. 11 : un encadrement au dixième faux", "au dixième $14{,}1 < \\\\sqrt{200} < 14{,}2$", "au dixième $14{,}2 < \\\\sqrt{200} < 14{,}3$"],
    ["ex. 12 : n = 12 au lieu de 3", "$n = 3$, et $12 \\\\times 3 = 36 = 6^2$", "$n = 12$, et $12 \\\\times 12 = 144 = 12^2$"],
    ["ex. 14 : √(a + b) = √a + √b déclaré vrai", "a) FAUX.", "a) VRAI."],
    ["ex. 15 : les bornes comptées", "$48 - 37 + 1 = 12$", "$49 - 36 + 1 = 14$"],
    ["ex. 16 : le 2 pas élevé au carré", "= 4 \\\\times 5 = 20$", "= 2 \\\\times 5 = 10$"],
    ["ex. 17 : le carré de deux hectares à 200 m", "{ cote: 141.42, aire: \"2 ha\"", "{ cote: 200, aire: \"2 ha\""],
    ["ex. 18 : l'arrondi faux", "\\\\sqrt{2\\\\,000} \\\\approx 44{,}72$ m. C'est", "\\\\sqrt{2\\\\,000} \\\\approx 44{,}27$ m. C'est"],
    ["ex. 18 : le triangle dessiné faux", "B: [40, 0], C: [40, 20]", "B: [40, 0], C: [40, 30]"],
    ["ex. 19 : la diagonale = largeur + hauteur", "Donc $d = \\\\sqrt{1\\\\,566{,}61} \\\\approx 39{,}6$ cm.", "Donc $d = \\\\sqrt{1\\\\,566{,}61} \\\\approx 53{,}9$ cm."],
    ["ex. 20 : le carré oublié", "$h = 9 \\\\times 4{,}9 = 44{,}1$ m", "$h = 3 \\\\times 4{,}9 = 14{,}7$ m"],
    ["une micro d'une autre notion", "micros: [\"entier_racine_carre_parfait\"],\n        },\n        {\n          enonce:\n            \"Calculer sans calculatrice.", "micros: [\"entier_puissance_calculer\"],\n        },\n        {\n          enonce:\n            \"Calculer sans calculatrice."],
    ["un $ dans un canvas", "{ value: 14.14, label: \"√200\" }", "{ value: 14.14, label: \"$\\\\sqrt{200}$\" }"],
  ],
});
