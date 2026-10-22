// Recalcul indépendant de la feuille « Fréquences marginales et conditionnelles »
// de STMG (22/10/2026) : lib/fiches-exercices/maths-stmg-donnees-frequences.tsx.
//
// ⭐ L'AUTRE CHEMIN : chaque tableau est relu dans `croise(…)` (marges refaites
// par le socle) ; chaque fréquence est recalculée ici à partir de la case et de
// la marge que la question désigne, puis cherchée dans le corrigé sous sa forme
// exacte (« $90 \div 300 = 0{,}3$, soit 30 % ») ou arrondie (« \approx 0{,}2798$,
// soit environ 28,0 % »). Les tableaux à compléter sont reconstruits à partir
// des pourcentages de l'énoncé et comparés au schéma. Données réelles : ONU,
// Paris 2024, alphabet, cartes, calendrier 2026 (refait par Date).
// Usage : node scripts/verifier-exercices-stmg-donnees-frequences.mjs

import { ouvrirStmg, memes, quotient, pourcent, tx } from "./verifier-exercices-stmg-donnees-commun.mjs";

const f = ouvrirStmg("lib/fiches-exercices/maths-stmg-donnees-frequences.tsx", "donnees_frequences");
const { vrai, dit, enonceDit, dessin, essai, lire } = f;
const Q = (k, a, b) => dit(k, quotient(a, b));
const reponse = (k, texte) => dit(k, `Réponse : ${texte}`);
/** « 25 % de 80 » → la case, et l'écriture du corrigé « $0{,}25 \times 80 = 20$ ». */
const part = (k, p, n) => {
  const v = Math.round(p * n * 1e6) / 1e6;
  vrai(`${k}. ${p * 100} % de ${n} est entier`, Number.isInteger(v));
  dit(k, `$${tx(p)} \\times ${tx(n)} = ${tx(v)}$`);
  return v;
};

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const t = dessin("croise", 1, "figure");
  const T = lire(t, "Total", "Total");
  Q(1, lire(t, "Femmes", "Total"), T);
  Q(1, lire(t, "Total", "Cadre"), T);
  Q(1, lire(t, "Hommes", "Non-cadre"), T);
  reponse(1, `a) ${pourcent(lire(t, "Femmes", "Total"), T)} ; b) ${pourcent(lire(t, "Total", "Cadre"), T)} ; c) ${pourcent(lire(t, "Hommes", "Non-cadre"), T)}.`);
});
essai("2", () => {
  // ⭐ Données réelles : 26 lettres, voyelles a, e, i, o, u, y.
  const voy = e2().match(/a, e, i, o, u et y/) ? 6 : 0;
  vrai("2. six voyelles nommées", voy === 6);
  Q(2, 6, 26);
  Q(2, 20, 26);
  vrai("2. le schéma", memes(dessin("camembert", 2, "schema")[0].map((d) => d.value), [6, 20]));
  reponse(2, `a) $\\dfrac{3}{13}$, ${pourcent(6, 26)} ; b) ${pourcent(20, 26)}.`);
  function e2() {
    return f.e(2);
  }
});
essai("3", () => {
  const t = dessin("croise", 3, "figure");
  const [a, b] = [lire(t, "A vu la pub", "A acheté") / lire(t, "A vu la pub", "Total"), lire(t, "Pas vu la pub", "A acheté") / lire(t, "Pas vu la pub", "Total")];
  Q(3, lire(t, "A vu la pub", "A acheté"), lire(t, "A vu la pub", "Total"));
  Q(3, lire(t, "Pas vu la pub", "A acheté"), lire(t, "Pas vu la pub", "Total"));
  vrai("3. c) la pub semble efficace", a > b);
  reponse(3, `a) ${pourcent(90, 300)} ; b) ${pourcent(108, 900)} ; c) oui.`);
});
essai("4", () => {
  const t = dessin("croise", 4, "figure");
  const L = (l, c) => lire(t, l, c);
  Q(4, L("Chantier", "Mal de dos"), L("Chantier", "Total"));
  Q(4, L("Bureau", "Mal de dos"), L("Bureau", "Total"));
  Q(4, L("Bureau", "Mal de dos"), L("Total", "Mal de dos"));
  vrai("4. le chantier plus de deux fois plus touché", L("Chantier", "Mal de dos") / L("Chantier", "Total") > 2 * (L("Bureau", "Mal de dos") / L("Bureau", "Total")));
  reponse(4, `a) ${pourcent(14, 40)} ; b) ${pourcent(18, 120)} ; c) ${pourcent(18, 32)}.`);
});
essai("5", () => {
  const t = dessin("croise", 5, "figure");
  const c = lire(t, "Étranger", "Visite guidée");
  Q(5, c, lire(t, "Étranger", "Total"));
  Q(5, c, lire(t, "Total", "Visite guidée"));
  reponse(5, `a) ${pourcent(c, lire(t, "Étranger", "Total"))} ; b) ${pourcent(c, lire(t, "Total", "Visite guidée"))} ; c) on ne divise pas par la même marge.`);
});
essai("6", () => {
  const t = dessin("croise", 6, "figure");
  enonceDit(6, "Parmi les commandes livrées, 25 % ont été retournées ; parmi les commandes retirées en magasin, 5 %");
  const nL = lire(t, "Livraison", "Total"), nR = lire(t, "Retrait", "Total");
  const lr = part(6, 0.25, nL), rr = part(6, 0.05, nR);
  const sch = dessin("croise", 6, "schema")[1];
  vrai("6. le schéma", memes(sch, [["Livraison", lr, nL - lr, nL], ["Retrait", rr, nR - rr, nR], ["Total", lr + rr, nL + nR - lr - rr, nL + nR]]));
  Q(6, lr + rr, nL + nR);
  dit(6, "$(25 + 5) \\div 2 = 15$ %");
  reponse(6, `a) ${lr}, ${nL - lr}, ${rr}, ${nR - rr}, ${lr + rr}, ${nL + nR - lr - rr} ; b) ${pourcent(lr + rr, nL + nR)}.`);
});
essai("7", () => {
  const t = dessin("croise", 7, "figure");
  const c = lire(t, "Moins de 25 ans", "Sinistre");
  Q(7, c, lire(t, "Total", "Sinistre"));
  Q(7, c, lire(t, "Moins de 25 ans", "Total"));
  Q(7, lire(t, "25 ans et plus", "Sinistre"), lire(t, "25 ans et plus", "Total"));
  vrai("7. A vraie (30 %), B fausse", c / lire(t, "Total", "Sinistre") === 0.3 && c / lire(t, "Moins de 25 ans", "Total") !== 0.3);
  reponse(7, `a) vraie, 30 % ; b) fausse, ${pourcent(c, 300)} ; c) ${pourcent(140, 1700)}.`);
});
essai("8", () => {
  // ⭐ Données réelles : 193 États membres de l'ONU, 54 en Afrique.
  enonceDit(8, "qui compte 193 États membres. 54 d'entre eux sont en Afrique");
  Q(8, 54, 193);
  dit(8, "$193 \\div 4 = 48{,}25$, et 54 dépasse $48{,}25$");
  vrai("8. le schéma", memes(dessin("camembert", 8, "schema")[0].map((d) => d.value), [54, 139]));
  reponse(8, `a) ${pourcent(54, 193)} ; b) vrai.`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const t = dessin("croise", 9, "figure");
  // ⭐ Données réelles : Paris 2024.
  vrai("9. Paris 2024 : JO 16-26-22, Para 19-28-28", memes(t[1].slice(0, 3).map((l) => l.slice(1, 3)), [[16, 19], [26, 28], [22, 28]]));
  const L = (l, c) => lire(t, l, c);
  Q(9, L("Or", "Total"), L("Total", "Total"));
  Q(9, L("Or", "JO"), L("Total", "JO"));
  Q(9, L("Or", "Paralympiques"), L("Total", "Paralympiques"));
  Q(9, L("Or", "Paralympiques"), L("Or", "Total"));
  vrai("9. e) plus de la moitié", L("Or", "Paralympiques") / L("Or", "Total") > 0.5);
  reponse(9, `a) ${pourcent(35, 139)} ; b) ${pourcent(16, 64)} ; c) ${pourcent(19, 75)} ; d) ${pourcent(19, 35)} ; e) vrai.`);
});
essai("10", () => {
  enonceDit(10, "400 clients de son agence (modèle). 30 % ont un crédit en cours. Parmi les clients qui ont un crédit, 40 % ont moins de 35 ans. Parmi ceux qui n'en ont pas, 25 %");
  const C = part(10, 0.3, 400), S = 400 - C;
  const cj = part(10, 0.4, C), sj = part(10, 0.25, S);
  vrai("10. le schéma", memes(dessin("croise", 10, "schema")[1], [["Crédit", cj, C - cj, C], ["Pas de crédit", sj, S - sj, S], ["Total", cj + sj, 400 - cj - sj, 400]]));
  Q(10, cj, cj + sj);
  reponse(10, `a) le tableau ci-dessous ; b) ${pourcent(cj, cj + sj)}.`);
});
essai("11", () => {
  const t = dessin("croise", 11, "figure");
  const L = (l, c) => lire(t, l, c);
  Q(11, L("Ordures", "Total"), L("Total", "Total"));
  Q(11, L("Verre", "Centre"), L("Total", "Centre"));
  Q(11, L("Verre", "Nord"), L("Verre", "Total"));
  const tri = ["Nord", "Centre", "Sud"].map((q) => [q, L("Verre", q) + L("Emballages", q), L("Total", q)]);
  for (const [, a, b] of tri) Q(11, a, b);
  const best = tri.reduce((m, x) => (x[1] / x[2] > m[1] / m[2] ? x : m));
  vrai("11. d) le Centre trie le mieux, sans trier le plus de tonnes", best[0] === "Centre" && Math.max(...tri.map((x) => x[1])) !== best[1]);
  reponse(11, `a) ${pourcent(500, 750)} ; b) ${pourcent(25, 200)} ; c) ${pourcent(40, 100)} ; d) le Centre, ${pourcent(best[1], best[2])}.`);
});
essai("12", () => {
  const t = dessin("croise", 12, "figure");
  const L = (l, c) => lire(t, l, c);
  Q(12, L("Femmes", "Temps partiel"), L("Total", "Temps partiel"));
  Q(12, L("Femmes", "Temps partiel"), L("Femmes", "Total"));
  Q(12, L("Hommes", "Temps partiel"), L("Hommes", "Total"));
  vrai("12. les trois quarts valent pour les temps partiels, pas pour les femmes", L("Femmes", "Temps partiel") / L("Total", "Temps partiel") > 0.75 && L("Femmes", "Temps partiel") / L("Femmes", "Total") < 0.75);
  reponse(12, `a) ${pourcent(130, 170)} ; b) ${pourcent(130, 480)} ; c) ${pourcent(40, 520)} ; d) non.`);
});
essai("13", () => {
  const [, l] = dessin("croise", 13, "schema");
  vrai("13. le jeu de 52 cartes", memes(l, [["Cœur", 3, 10, 13], ["Carreau", 3, 10, 13], ["Trèfle", 3, 10, 13], ["Pique", 3, 10, 13], ["Total", 12, 40, 52]]));
  Q(13, 3, 13);
  Q(13, 3, 12);
  Q(13, 12, 52);
  vrai("13. d) égales", 3 / 13 === 12 / 52);
  reponse(13, `a) ${pourcent(3, 13)} ; b) ${pourcent(3, 12)} ; c) ${pourcent(12, 52)} ; d) elles sont égales.`);
});
essai("14", () => {
  enonceDit(14, "600 candidatures (modèle). 40 % sont arrivées par le site de l'entreprise, les autres par un autre canal. Parmi les candidatures du site, 10 % ont été retenues ; parmi les autres, 5 %");
  vrai("14. la figure : tout à trouver sauf 600", memes(dessin("croise", 14, "figure")[1].flat().filter((x) => typeof x === "number"), [600]));
  const S = part(14, 0.4, 600), A = 600 - S, sr = part(14, 0.1, S), ar = part(14, 0.05, A);
  vrai("14. le schéma", memes(dessin("croise", 14, "schema")[1], [["Site", sr, S - sr, S], ["Autre canal", ar, A - ar, A], ["Total", sr + ar, 600 - sr - ar, 600]]));
  Q(14, sr + ar, 600);
  Q(14, sr, sr + ar);
  reponse(14, `a) ${S}, ${sr}, ${S - sr}, ${A}, ${ar}, ${A - ar}, ${sr + ar}, ${600 - sr - ar} ; b) ${pourcent(sr + ar, 600)} ; c) ${pourcent(sr, sr + ar)}.`);
});
essai("15", () => {
  const t = dessin("croise", 15, "figure");
  const L = (l, c) => lire(t, l, c);
  Q(15, L("Traitée", "Malade"), L("Total", "Malade"));
  Q(15, L("Traitée", "Malade"), L("Traitée", "Total"));
  Q(15, L("Non traitée", "Malade"), L("Non traitée", "Total"));
  vrai("15. 60 % des malades traitées, et pourtant deux fois moins de malades", L("Traitée", "Malade") / L("Total", "Malade") === 0.6 && 2 * (L("Traitée", "Malade") / L("Traitée", "Total")) === L("Non traitée", "Malade") / L("Non traitée", "Total"));
  reponse(15, "a) 60 %, juste ; b) 20 % et 40 % ; c) non, le traitement divise par deux la fréquence de la maladie.");
});
essai("16", () => {
  const t = dessin("croise", 16, "figure");
  const L = (l, c) => lire(t, l, c);
  vrai("16. un tableau en pourcentages : total 100", L("Total", "Total") === 100);
  Q(16, L("Étranger", "Affaires"), L("Total", "Affaires"));
  Q(16, L("Étranger", "Affaires"), L("Étranger", "Total"));
  dit(16, `$${tx(L("Étranger", "Affaires") / 100)} \\times 12\\,500 = ${(L("Étranger", "Affaires") / 100) * 12500}$ clients`);
  reponse(16, `a) ${L("Étranger", "Total")} % ; b) ${pourcent(16, 40)} ; c) ${pourcent(16, 35)} ; d) ${(L("Étranger", "Affaires") / 100) * 12500} clients.`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  enonceDit(17, "2500 adhérents (modèle). 40 % ont moins de 40 ans. Parmi les moins de 40 ans, 45 % ont déjà fait une téléconsultation ; parmi les 40 ans et plus, 20 %");
  const J = part(17, 0.4, 2500), V = 2500 - J, jt = part(17, 0.45, J), vt = part(17, 0.2, V);
  vrai("17. le schéma", memes(dessin("croise", 17, "schema")[1], [["Moins de 40 ans", jt, J - jt, J], ["40 ans et plus", vt, V - vt, V], ["Total", jt + vt, 2500 - jt - vt, 2500]]));
  Q(17, jt + vt, 2500);
  Q(17, jt, jt + vt);
  reponse(17, `a) le tableau ci-dessous ; b) ${pourcent(jt + vt, 2500)} ; c) ${pourcent(jt, jt + vt)} ; d) ${pourcent(jt, jt + vt).replace(" %", "")} % des utilisateurs ont moins de 40 ans.`);
});
essai("18", () => {
  const t = dessin("croise", 18, "figure");
  const L = (l, c) => lire(t, l, c);
  Q(18, L("Électrique", "Total"), L("Total", "Total"));
  Q(18, L("Électrique", "Entreprise"), L("Total", "Entreprise"));
  Q(18, L("Électrique", "Particulier"), L("Total", "Particulier"));
  Q(18, L("Électrique", "Entreprise"), L("Électrique", "Total"));
  vrai("18. e) vrai", L("Électrique", "Entreprise") / L("Électrique", "Total") > 0.5);
  vrai("18. les entreprises : un tiers des ventes", L("Total", "Entreprise") * 3 === L("Total", "Total"));
  reponse(18, `a) ${pourcent(150, 600)} ; b) ${pourcent(80, 200)} ; c) ${pourcent(70, 400)} ; d) ${pourcent(80, 150)} ; e) vrai.`);
});
essai("19", () => {
  // ⭐ Données réelles : le calendrier 2026, refait par Date.
  const tri = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]].map((ms) => {
    let s = 0, w = 0;
    for (const m of ms) for (let d = 1; new Date(Date.UTC(2026, m, d)).getUTCMonth() === m; d++) [0, 6].includes(new Date(Date.UTC(2026, m, d)).getUTCDay()) ? w++ : s++;
    return [s, w, s + w];
  });
  const noms = ["1er trimestre", "2e trimestre", "3e trimestre", "4e trimestre"];
  const W = tri.reduce((a, x) => a + x[1], 0), S = tri.reduce((a, x) => a + x[0], 0);
  vrai("19. le schéma = le calendrier", memes(dessin("croise", 19, "schema")[1], [...tri.map((x, i) => [noms[i], ...x]), ["Total", S, W, S + W]]));
  enonceDit(19, `comptent ${tri.map((x) => x[2]).slice(0, 3).join(", ")} et ${tri[3][2]} jours, et chacun compte exactement ${tri[0][1]} jours de week-end`);
  vrai("19. 26 jours de week-end dans chaque trimestre", tri.every((x) => x[1] === 26));
  Q(19, 26, tri[0][2]);
  Q(19, 26, tri[2][2]);
  Q(19, 26, W);
  Q(19, W, S + W);
  reponse(19, `a) le tableau ci-dessous ; b) ${pourcent(26, 90)} et ${pourcent(26, 92).replace("environ ", "")} ; c) ${pourcent(26, W)} ; d) ${pourcent(W, 365)}.`);
});
essai("20", () => {
  const t = dessin("croise", 20, "figure");
  const L = (l, c) => lire(t, l, c);
  Q(20, L("Total", "Voiture seule"), L("Total", "Total"));
  Q(20, L("Site A", "Voiture seule"), L("Site A", "Total"));
  Q(20, L("Site B", "Voiture seule"), L("Site B", "Total"));
  const max = part(20, 0.4, L("Site A", "Total"));
  const n = L("Site A", "Voiture seule") - max;
  dit(20, `$${L("Site A", "Voiture seule")} - ${max} = ${n}$ salariés`);
  Q(20, L("Total", "Voiture seule") - n, L("Total", "Total"));
  vrai("20. le site B atteint déjà l'objectif", L("Site B", "Voiture seule") / L("Site B", "Total") <= 0.4);
  reponse(20, `a) ${pourcent(180, 400)} ; b) ${pourcent(120, 200)} et ${pourcent(60, 200)} ; c) ${n} salariés ; d) ${pourcent(180 - n, 400)}.`);
});

f.fin();
