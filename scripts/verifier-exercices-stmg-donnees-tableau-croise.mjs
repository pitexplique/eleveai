// Recalcul indépendant de la feuille « Le tableau croisé d'effectifs » de STMG
// (22/10/2026) : lib/fiches-exercices/maths-stmg-donnees-tableau-croise.tsx.
//
// ⭐ L'AUTRE CHEMIN : chaque tableau est RELU dans les appels `croise(…)` (les
// marges y sont refaites dans les deux sens par le socle), chaque nombre
// effacé est retrouvé ici par le calcul, puis cherché dans le corrigé et dans
// le tableau complété du schéma. Les listes brutes (ex. 7) et les régions
// (ex. 9) sont recomptées dans l'énoncé, le calendrier 2026 (ex. 12) refait
// par Date, les phrases-indices (11, 15, 17, 18, 20) résolues à part.
// Usage : node scripts/verifier-exercices-stmg-donnees-tableau-croise.mjs

import { ouvrirStmg, somme, memes, plus } from "./verifier-exercices-stmg-donnees-commun.mjs";

const f = ouvrirStmg("lib/fiches-exercices/maths-stmg-donnees-tableau-croise.tsx", "donnees_tableau_croise", {
  ecartsAttendus: ["ligne « Total »", "colonne « Total »"],
});
const { e, c, vrai, dit, enonceDit, dessin, essai, lire } = f;

/** Le tableau complété (schéma) : mêmes entêtes, et chaque case connue de la figure retrouvée. */
const coherent = (k, fig, sch) => {
  vrai(`${k}. schéma : mêmes entêtes que la figure`, memes(fig[0], sch[0]));
  fig[1].forEach((l, i) => l.forEach((x, j) => typeof x === "number" && vrai(`${k}. schéma : la case (${l[0]}, ${fig[0][j]}) recopiée`, sch[1][i][j] === x)));
};
/** Une ligne et une colonne de données, sans les marges. */
const donnees = ([ent, lignes]) => lignes.filter((l) => !/^total$/i.test(l[0])).map((l) => l.slice(1, ent.indexOf("Total")));
const reponse = (k, texte) => dit(k, `Réponse : ${texte}`);

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const t = dessin("croise", 1, "figure");
  enonceDit(1, `interrogé ${lire(t, "Total", "Total")} clients`);
  const [a, b, cc, d] = [lire(t, "Site web", "Satisfait"), lire(t, "Total", "Pas satisfait"), lire(t, "Magasin", "Total"), lire(t, "Magasin", "Pas satisfait")];
  vrai("1. quatre réponses différentes", new Set([a, b, cc, d]).size === 4);
  dit(1, `je lis ${lire(t, "Site web", "Satisfait")}`);
  dit(1, `lire ${lire(t, "Total", "Satisfait")}, le total de la colonne`);
  reponse(1, `a) ${a} ; b) ${b} ; c) ${cc} ; d) ${d}.`);
});
essai("2", () => {
  const t = dessin("croise", 2, "figure");
  // ⭐ Données réelles : 4 couleurs × 13 cartes, 3 figures par couleur.
  vrai("2. le jeu de 52 cartes", ["Cœur", "Carreau", "Trèfle", "Pique"].every((x) => lire(t, x, "Figure") === 3 && lire(t, x, "Total") === 13) && lire(t, "Total", "Total") === 52);
  const rouges = lire(t, "Cœur", "Total") + lire(t, "Carreau", "Total");
  dit(2, `$13 + 13 = ${rouges}$ cartes rouges`);
  dit(2, `Par les lignes : $13 + 13 + 13 + 13 = 52$. Par les colonnes : $${lire(t, "Total", "Figure")} + ${lire(t, "Total", "Autre carte")} = 52$`);
  reponse(2, `a) ${lire(t, "Trèfle", "Figure")} ; b) ${lire(t, "Total", "Autre carte")} ; c) ${rouges} ; d) 52 par les deux chemins.`);
});
essai("3", () => {
  const fig = dessin("croise", 3, "figure");
  const d = donnees(fig);
  const L = d.map(somme);
  const C = [0, 1].map((j) => somme(d.map((l) => l[j])));
  const T = somme(L);
  vrai("3. le total par les deux chemins", T === somme(C));
  dit(3, `Production $${plus(d[0])} = ${L[0]}$ ; Commercial $${plus(d[1])} = ${L[1]}$ ; Administration $${plus(d[2])} = ${L[2]}$`);
  dit(3, `CDI $${plus(d.map((l) => l[0]))} = ${C[0]}$ ; CDD $${plus(d.map((l) => l[1]))} = ${C[1]}$`);
  dit(3, `$${plus(L)} = ${T}$ ; par les colonnes : $${plus(C)} = ${T}$`);
  reponse(3, `${L[0]}, ${L[1]} et ${L[2]} salariés par service ; ${C[0]} CDI et ${C[1]} CDD ; ${T} salariés en tout.`);
  coherent(3, fig, dessin("croise", 3, "schema"));
});
essai("4", () => {
  const t = dessin("croise", 4, "figure");
  // ⭐ Données réelles : sans satellite, Mercure et Vénus ; 4 telluriques, 4 géantes.
  vrai("4. les planètes : 2 + 2 telluriques, 4 + 0 géantes", memes(donnees(t), [[2, 2], [4, 0]]));
  enonceDit(4, "Seules Mercure et Vénus n'ont aucun satellite");
  reponse(4, "a) 4, 4, 6, 2 et 8 ; b) 6 ; c) Mercure et Vénus.");
});
essai("5", () => {
  const fig = dessin("croise", 5, "figure");
  const [T1, T2, T] = [lire(fig, "Moins de 65 ans", "Total"), lire(fig, "65 ans et plus", "Total"), lire(fig, "Total", "Total")];
  vrai("5. 300 + 200 = 500", T1 + T2 === T);
  const a = T1 - lire(fig, "Moins de 65 ans", "Vacciné");
  const b = T2 - lire(fig, "65 ans et plus", "Non vacciné");
  const V = lire(fig, "Moins de 65 ans", "Vacciné") + b;
  const N = a + lire(fig, "65 ans et plus", "Non vacciné");
  dit(5, `$${T1} - ${lire(fig, "Moins de 65 ans", "Vacciné")} = ${a}$`);
  dit(5, `$${T2} - ${lire(fig, "65 ans et plus", "Non vacciné")} = ${b}$`);
  dit(5, `$${V} + ${N} = ${T}$`);
  vrai("5. contrôle", V + N === T);
  reponse(5, `${a} ; ${b} ; ${V} vaccinés ; ${N} non vaccinés.`);
  coherent(5, fig, dessin("croise", 5, "schema"));
});
essai("6", () => {
  const fig = dessin("croise", 6, "figure");
  const cv = lire(fig, "Chêne", "Vivant"), ct = lire(fig, "Chêne", "Total"), em = lire(fig, "Érable", "Mort"), tv = lire(fig, "Total", "Vivant");
  const cm = ct - cv, ev = tv - cv, et = ev + em, tm = cm + em, T = ct + et;
  vrai("6. le total par les deux chemins", T === tv + tm);
  dit(6, `$${ct} - ${cv} = ${cm}$`);
  dit(6, `$${tv} - ${cv} = ${ev}$`);
  dit(6, `$${ev} + ${em} = ${et}$`);
  dit(6, `$${cm} + ${em} = ${tm}$`);
  dit(6, `$${ct} + ${et} = ${T}$ par les lignes, et $${tv} + ${tm} = ${T}$`);
  reponse(6, `${cm} ; ${ev} ; ${et} ; ${tm} ; ${T} arbres plantés.`);
  coherent(6, fig, dessin("croise", 6, "schema"));
});
essai("7", () => {
  const liste = e(7).match(/\\n((?:[MW][RG], )+[MW][RG])\./)[1].split(", ");
  vrai("7. 16 commandes", liste.length === 16);
  enonceDit(7, `relève ${liste.length} commandes`);
  const n = (x) => liste.filter((y) => y === x).length;
  const [MR, MG, WR, WG] = ["MR", "MG", "WR", "WG"].map(n);
  dit(7, `MR ${MR} fois, MG ${MG} fois, WR ${WR} fois, WG ${WG} fois`);
  dit(7, `magasin $${MR} + ${MG} = ${MR + MG}$ ; domicile $${WR} + ${WG} = ${WR + WG}$ ; retournées $${MR} + ${WR} = ${MR + WR}$ ; gardées $${MG} + ${WG} = ${MG + WG}$`);
  vrai("7. le schéma", memes(dessin("croise", 7, "schema")[1], [["Magasin", MR, MG, MR + MG], ["Domicile", WR, WG, WR + WG], ["Total", MR + WR, MG + WG, 16]]));
  reponse(7, `a) le tableau ci-dessous ; b) ${WR} commandes.`);
});
essai("8", () => {
  const [T, F, O, FO] = [40, 25, 30, 18];
  enonceDit(8, `${T} stagiaires ont passé le titre professionnel. ${F} sont des femmes. ${O} stagiaires ont obtenu le titre, dont ${FO} femmes`);
  const H = T - F, P = T - O, FP = F - FO, HO = O - FO, HP = H - HO;
  vrai("8. contrôle colonne", FP + HP === P);
  dit(8, `Hommes : $${T} - ${F} = ${H}$. Pas obtenu : $${T} - ${O} = ${P}$`);
  dit(8, `Hommes sans le titre : $${H} - ${HO} = ${HP}$`);
  vrai("8. le schéma", memes(dessin("croise", 8, "schema")[1], [["Femmes", FO, FP, F], ["Hommes", HO, HP, H], ["Total", O, P, T]]));
  reponse(8, `a) le tableau ci-dessous ; b) ${HP} hommes.`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const met = e(9).match(/En métropole, (\d+) régions ont une façade maritime : ([^.]+)\./);
  const noms = met[2].split(/, | et /);
  vrai("9. 8 régions littorales nommées", noms.length === Number(met[1]) && noms.length === 8);
  const om = e(9).match(/d'outre-mer \(([^)]+)\)/)[1].split(", ");
  vrai("9. 5 régions d'outre-mer", om.length === 5);
  // ⭐ Données réelles : les 13 régions métropolitaines (loi du 16 janvier 2015).
  const METRO = ["Hauts-de-France", "Normandie", "Bretagne", "Pays de la Loire", "Nouvelle-Aquitaine", "Occitanie", "Provence-Alpes-Côte d'Azur", "Corse", "Grand Est", "Île-de-France", "Centre-Val de Loire", "Bourgogne-Franche-Comté", "Auvergne-Rhône-Alpes"];
  const sans = METRO.filter((r) => !noms.includes(r));
  vrai("9. 13 en métropole, 5 sans façade", METRO.length === 13 && sans.length === 5);
  dit(9, `en métropole : ${sans.slice(0, -1).join(", ")} et ${sans.at(-1)}`);
  vrai("9. le schéma", memes(dessin("croise", 9, "schema")[1], [["Métropole", 8, 5, 13], ["Outre-mer", 5, 0, 5], ["Total", 13, 5, 18]]));
  reponse(9, "a) le tableau ci-dessous ; b) 5 régions ; c) 13 régions.");
});
essai("10", () => {
  const fig = dessin("croise", 10, "figure");
  const hE = lire(fig, "Haute saison", "Étranger"), hT = lire(fig, "Haute saison", "Total"), bF = lire(fig, "Basse saison", "France"), T = lire(fig, "Total", "Total");
  const hF = hT - hE, bT = T - hT, bE = bT - bF, F = hF + bF, E = hE + bE;
  vrai("10. contrôle", F + E === T);
  dit(10, `France $${hT} - ${hE} = ${hF}$`);
  dit(10, `basse saison $${T} - ${hT} = ${bT}$`);
  dit(10, `étranger $${bT} - ${bF} = ${bE}$`);
  dit(10, `$2 \\times ${bT} = ${2 * bT}$ : oui`);
  vrai("10. d) le double exact", 2 * bT === hT);
  reponse(10, `a) ${hF}, ${bT}, ${bE}, ${F}, ${E} ; b) ${bE} ; c) ${F} ; d) oui.`);
  coherent(10, fig, dessin("croise", 10, "schema"));
});
essai("11", () => {
  const fig = dessin("croise", 11, "figure");
  const T = lire(fig, "Total", "Total"), mN = lire(fig, "Maison", "Neuf");
  enonceDit(11, "trois fois plus de ventes dans l'ancien que dans le neuf");
  enonceDit(11, "quatre fois plus d'appartements que de maisons");
  enonceDit(11, "10 appartements de plus que de maisons");
  const N = T / 4, A = 3 * N, aN = 4 * mN;
  vrai("11. le neuf : 24 + 6 = 30", aN + mN === N);
  const mA = (A - 10) / 2, aA = mA + 10;
  vrai("11. résolution entière", Number.isInteger(N) && Number.isInteger(mA));
  dit(11, `$${T} \\div 4 = ${N}$ ventes dans le neuf, $3 \\times ${N} = ${A}$`);
  dit(11, `$${A} - 10 = ${A - 10}$, et $${A - 10} \\div 2 = ${mA}$ maisons, donc $${mA} + 10 = ${aA}$`);
  dit(11, `appartements $${aN} + ${aA} = ${aN + aA}$ ; maisons $${mN} + ${mA} = ${mN + mA}$`);
  coherent(11, fig, dessin("croise", 11, "schema"));
  vrai("11. le schéma", memes(dessin("croise", 11, "schema")[1], [["Appartement", aN, aA, aN + aA], ["Maison", mN, mA, mN + mA], ["Total", N, A, T]]));
});
essai("12", () => {
  // ⭐ Données réelles : le calendrier 2026, refait par Date (UTC).
  const jours = (m) => {
    let sem = 0, we = 0;
    for (let d = 1; ; d++) {
      const x = new Date(Date.UTC(2026, m, d));
      if (x.getUTCMonth() !== m) break;
      [0, 6].includes(x.getUTCDay()) ? we++ : sem++;
    }
    return [sem, we, sem + we];
  };
  vrai("12. le 1er janvier 2026 est un jeudi", new Date(Date.UTC(2026, 0, 1)).getUTCDay() === 4);
  vrai("12. Pâques 2026 le 5 avril (dimanche)", new Date(Date.UTC(2026, 3, 5)).getUTCDay() === 0);
  const [J, F, M] = [0, 1, 2].map(jours);
  const S = J[0] + F[0] + M[0], W = J[1] + F[1] + M[1];
  vrai("12. le schéma", memes(dessin("croise", 12, "schema")[1], [["Janvier", ...J], ["Février", ...F], ["Mars", ...M], ["Total", S, W, S + W]]));
  dit(12, `Week-end : $5 + 4 = ${J[1]}$ jours ; du lundi au vendredi : $31 - ${J[1]} = ${J[0]}$`);
  dit(12, `$${plus([J[0], F[0], M[0]])} = ${S}$ jours. Contrôle : $${S} + ${W} = ${S + W}$`);
  dit(12, `$${J[0]} - 1 = ${J[0] - 1}$ jours travaillés`);
  reponse(12, `a) le tableau ci-dessous ; b) ${S} jours ; c) ${J[0] - 1} jours.`);
});
essai("13", () => {
  const t = dessin("croise", 13, "figure");
  const d = donnees(t);
  const vrai1000 = somme(d.flat());
  vrai("13. une seule erreur, dans le coin", lire(t, "Total", "Total") !== vrai1000 && somme(d.map((l) => l[0])) === lire(t, "Total", "À l'heure") && somme(d.map((l) => l[1])) === lire(t, "Total", "En retard"));
  dit(13, `Le tableau écrit ${lire(t, "Total", "Total")} : c'est lui, le nombre faux. Il faut ${vrai1000}`);
  reponse(13, `a) le total général, ${vrai1000} et non ${lire(t, "Total", "Total")} ; b) ${lire(t, "Transporteur B", "En retard")} ; c) ${lire(t, "Total", "À l'heure")}.`);
});
essai("14", () => {
  const t = dessin("croise", 14, "figure");
  const conso = ["18-30 ans", "31-50 ans", "51 ans et plus"].map((a) => lire(t, a, "Conso"));
  vrai("14. d) les 18-30 ans seuls en tête", conso[0] === Math.max(...conso) && conso.filter((x) => x === conso[0]).length === 1);
  const moins = lire(t, "18-30 ans", "Total") + lire(t, "31-50 ans", "Total");
  const pasImmo = lire(t, "Total", "Total") - lire(t, "Total", "Immobilier");
  vrai("14. e) contrôle", pasImmo === lire(t, "Total", "Auto") + lire(t, "Total", "Conso"));
  dit(14, `$${lire(t, "18-30 ans", "Total")} + ${lire(t, "31-50 ans", "Total")} = ${moins}$ crédits`);
  reponse(14, `a) ${lire(t, "31-50 ans", "Auto")} ; b) ${lire(t, "Total", "Immobilier")} ; c) ${moins} ; d) les 18-30 ans, avec ${conso[0]} ; e) ${pasImmo}.`);
});
essai("15", () => {
  const fig = dessin("croise", 15, "figure");
  const T = lire(fig, "Total", "Total"), P = lire(fig, "Total", "Paralympiques"), JO = T - P;
  const aJ = lire(fig, "Argent", "Total") - lire(fig, "Argent", "Paralympiques");
  const bP = lire(fig, "Argent", "Paralympiques"), oP = P - 2 * bP;
  // ⭐ Données réelles : Paris 2024, JO 16-26-22 (64), Paralympiques 19-28-28 (75).
  vrai("15. Paris 2024 : JO 16, 26, 22 ; Para 19, 28, 28", memes([lire(fig, "Or", "JO"), aJ, lire(fig, "Bronze", "JO"), oP, bP, bP], [16, 26, 22, 19, 28, 28]) && JO === 64 && P === 75);
  dit(15, `$${T} - ${P} = ${JO}$ médailles`);
  dit(15, `$${P} - ${bP} - ${bP} = ${oP}$`);
  reponse(15, `a) ${oP}, ${16 + oP}, ${aJ}, ${bP}, ${22 + bP}, ${JO} ; b) ${oP} ; c) ${16 + oP}.`);
  coherent(15, fig, dessin("croise", 15, "schema"));
});
essai("16", () => {
  const fig = dessin("croise", 16, "figure");
  const s = (l, k) => lire(fig, l, k);
  const cS = s("Commerce", "Total") - s("Commerce", "Micro-entreprise");
  const iT = s("Industrie", "Micro-entreprise") + s("Industrie", "Société");
  const sM = s("Total", "Micro-entreprise") - s("Commerce", "Micro-entreprise") - s("Industrie", "Micro-entreprise");
  const sT = sM + s("Services", "Société");
  const tS = cS + s("Services", "Société") + s("Industrie", "Société");
  const T = s("Commerce", "Total") + sT + iT;
  vrai("16. total par les deux chemins", T === s("Total", "Micro-entreprise") + tS);
  dit(16, `$${s("Total", "Micro-entreprise")} - ${s("Commerce", "Micro-entreprise")} - ${s("Industrie", "Micro-entreprise")} = ${sM}$`);
  reponse(16, `a) ${cS}, ${iT}, ${sM}, ${sT}, ${tS}, ${T} ; b) ${tS} ; c) ${sM} ; d) ${T}.`);
  coherent(16, fig, dessin("croise", 16, "schema"));
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [T, Sa, R, RSa, pP, pR] = [5000, 2800, 1500, 900, 50, 30];
  enonceDit(17, `${T} billets ont été vendus, dont ${Sa} pour le samedi. ${R} billets sont à tarif réduit, dont ${RSa} pour le samedi. Le billet plein tarif coûte ${pP} €, le billet réduit ${pR} €`);
  const Di = T - Sa, P = T - R, PSa = Sa - RSa, RDi = R - RSa, PDi = Di - RDi;
  vrai("17. contrôle colonne", PSa + PDi === P);
  const recDi = PDi * pP + RDi * pR, recT = P * pP + R * pR;
  const k = (x) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
  dit(17, `$${PDi} \\times ${pP} + ${RDi} \\times ${pR} = ${k(PDi * pP)} + ${k(RDi * pR)} = ${k(recDi)}$ €`);
  dit(17, `$${P} \\times ${pP} + ${R} \\times ${pR} = ${k(P * pP)} + ${k(R * pR)} = ${k(recT)}$ €`);
  vrai("17. le schéma", memes(dessin("croise", 17, "schema")[1], [["Samedi", PSa, RSa, Sa], ["Dimanche", PDi, RDi, Di], ["Total", P, R, T]]));
  reponse(17, `a) le tableau ci-dessous ; b) ${PDi} ; c) $${k(recDi)}$ € ; d) $${k(recT)}$ €.`);
});
essai("18", () => {
  const t = dessin("croise", 18, "figure");
  enonceDit(18, "deux fois plus de véhicules commerciaux que de véhicules de livraison");
  const eL = lire(t, "Essence", "Total") - lire(t, "Essence", "Commercial");
  const elL = lire(t, "Électrique", "Total") / 3, elC = 2 * elL;
  const dT = lire(t, "Total", "Total") - lire(t, "Essence", "Total") - lire(t, "Électrique", "Total");
  const dC = dT - lire(t, "Diesel", "Livraison");
  const L = eL + lire(t, "Diesel", "Livraison") + elL;
  vrai("18. colonne Commercial", lire(t, "Essence", "Commercial") + dC + elC === lire(t, "Total", "Commercial"));
  vrai("18. total", lire(t, "Total", "Commercial") + L === lire(t, "Total", "Total"));
  const elec = lire(t, "Électrique", "Total") + lire(t, "Diesel", "Livraison");
  dit(18, `$18 + 26 = ${elec}$ véhicules électriques`);
  reponse(18, `a) ${eL}, ${dC}, ${dT}, ${elC}, ${elL}, ${L} ; b) ${dC} ; c) ${elec} ; d) ${dC}.`);
});
essai("19", () => {
  const t = dessin("croise", 19, "figure");
  const PRIX = { Extra: 18, "Catégorie I": 12, "Catégorie II": 7 };
  enonceDit(19, `${PRIX.Extra} € en catégorie Extra, ${PRIX["Catégorie I"]} € en catégorie I et ${PRIX["Catégorie II"]} € en catégorie II`);
  const pI = lire(t, "Pommes", "Total") - lire(t, "Pommes", "Extra") - lire(t, "Pommes", "Catégorie II");
  const poE = lire(t, "Total", "Extra") - lire(t, "Pommes", "Extra");
  const poII = lire(t, "Poires", "Total") - poE - lire(t, "Poires", "Catégorie I");
  const I = pI + lire(t, "Poires", "Catégorie I"), II = lire(t, "Pommes", "Catégorie II") + poII, T = lire(t, "Pommes", "Total") + lire(t, "Poires", "Total");
  vrai("19. total par les deux chemins", lire(t, "Total", "Extra") + I + II === T);
  const pommes = [lire(t, "Pommes", "Extra"), pI, lire(t, "Pommes", "Catégorie II")];
  const tous = [lire(t, "Total", "Extra"), I, II];
  const p = [18, 12, 7];
  const rec = (q) => q.map((x, i) => x * p[i]);
  dit(19, `$${q2(pommes, p)} = ${rec(pommes).join(" + ")} = ${somme(rec(pommes))}$ €`);
  dit(19, `$${q2(tous, p)} = ${rec(tous).join(" + ")} = ${somme(rec(tous))}$ €`);
  reponse(19, `a) ${pI}, ${poE}, ${poII}, ${I}, ${II}, ${T} ; b) ${I} ; c) ${somme(rec(pommes))} € ; d) ${somme(rec(tous))} €.`);
  function q2(q, pr) {
    return q.map((x, i) => `${x} \\times ${pr[i]}`).join(" + ");
  }
});
essai("20", () => {
  const [T, V, P, D, DV, DP] = [240, 100, 60, 150, 70, 35];
  enonceDit(20, `servi ${T} repas lundi (modèle) : ${V} avec de la viande, ${P} avec du poisson, les autres végétariens. ${D} repas ont été pris avec un dessert, dont ${DV} avec de la viande et ${DP} avec du poisson`);
  const G = T - V - P, S = T - D, DG = D - DV - DP, SG = G - DG;
  vrai("20. contrôle colonne", V - DV + P - DP + SG === S);
  vrai("20. le schéma", memes(dessin("croise", 20, "schema")[1], [["Viande", DV, V - DV, V], ["Poisson", DP, P - DP, P], ["Végétarien", DG, SG, G], ["Total", D, S, T]]));
  dit(20, `$5 \\times ${SG} = ${5 * SG}$ repas`);
  reponse(20, `a) le tableau ci-dessous ; b) ${SG} ; c) ${5 * SG} repas.`);
});

void c;
f.fin();
