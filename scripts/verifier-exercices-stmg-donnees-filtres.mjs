// Recalcul indépendant de la feuille « Filtrer des données : ET, OU, NON » de
// STMG (22/10/2026) : lib/fiches-exercices/maths-stmg-donnees-filtres.tsx.
//
// ⭐ L'AUTRE CHEMIN : chaque filtre est REJOUÉ ligne par ligne sur l'extrait de
// tableur relu dans `grille(…)` (prédicat écrit ici, à part), la liste gardée
// est cherchée dans le corrigé, et chaque OU est refait par le contraire
// (total − ceux qui ne vérifient aucun critère). Sur les tableaux croisés, ET,
// OU et NON sont recalculés case par case. Les énoncés sans tableau (8, 14,
// 15, 18, 19, 20) sont reconstruits en tableau croisé et comparés au schéma.
// Données réelles : planètes (IMCCE), régions (INSEE), calendrier 2026 (Date).
// Usage : node scripts/verifier-exercices-stmg-donnees-filtres.mjs

import { ouvrirStmg, memes, somme, plus } from "./verifier-exercices-stmg-donnees-commun.mjs";

const f = ouvrirStmg("lib/fiches-exercices/maths-stmg-donnees-filtres.tsx", "donnees_filtres");
const { vrai, dit, enonceDit, dessin, essai, lire } = f;
const reponse = (k, texte) => dit(k, `Réponse : ${texte}`);
const liste = (xs) => (xs.length === 1 ? String(xs[0]) : `${xs.slice(0, -1).join(", ")} et ${xs.at(-1)}`);
const min1 = (s) => s.charAt(0).toLowerCase() + s.slice(1);
/** Les lignes d'un extrait de tableur, en objets { colonne: valeur }. */
const table = (k) => {
  const [ent, lignes] = dessin("grille", k, "figure");
  return lignes.map((l) => Object.fromEntries(ent.map((e, j) => [e, l[j]])));
};
const noms = (rows, p, col) => rows.filter(p).map((r) => r[col]);
/** OU = |A| + |B| − |A ET B|, et le même nombre par le contraire. */
const ou = (k, rows, pA, pB) => {
  const [a, b, ab] = [rows.filter(pA).length, rows.filter(pB).length, rows.filter((r) => pA(r) && pB(r)).length];
  const n = rows.filter((r) => pA(r) || pB(r)).length;
  vrai(`${k}. OU par le contraire`, n === rows.length - rows.filter((r) => !pA(r) && !pB(r)).length);
  dit(k, `$${a} + ${b} - ${ab} = ${n}$`);
  return n;
};

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const R = table(1);
  const a = noms(R, (r) => r.Service === "Commercial", "Nom");
  const b = noms(R, (r) => r["Ancienneté"] >= 5, "Nom");
  const c = noms(R, (r) => r["Télétravail"] === "oui", "Nom");
  dit(1, `Colonne « Service » : ${liste(a)}. ${a.length} salariés`);
  dit(1, `5 compris : ${liste(b)}. ${b.length} salariés`);
  dit(1, `Colonne « Télétravail » : ${liste(c)}. ${c.length} salariés`);
  vrai("1. Farid a 5 ans pile", R.find((r) => r.Nom === "Farid")["Ancienneté"] === 5);
  reponse(1, `a) ${liste(a)}, ${a.length} salariés ; b) ${b.length} ; c) ${c.length}.`);
});
essai("2", () => {
  const R = table(2);
  const a = noms(R, (r) => r["Prix (€)"] > 20, "Produit").map(min1);
  const b = noms(R, (r) => r.Stock <= 5, "Produit").map(min1);
  const c = noms(R, (r) => r.Stock === 0, "Produit").map(min1);
  dit(2, `strictement plus de 20 € : ${liste(a)}. ${a.length} produits`);
  dit(2, `5 compris : ${liste(b)}. ${b.length} produits`);
  vrai("2. un produit à 20 € pile, écarté", R.some((r) => r["Prix (€)"] === 20));
  reponse(2, `a) ${liste(a)} ; b) ${b.length} ; c) le ${c[0]}.`);
});
essai("3", () => {
  const t = dessin("croise", 3, "figure");
  reponse(3, `a) ${lire(t, "Moins de 26 ans", "Abonné")} ; b) ${lire(t, "26 ans et plus", "Non abonné")} ; c) une case croise les deux critères.`);
  dit(3, `lire ${lire(t, "Total", "Abonné")}, la marge des abonnés`);
});
essai("4", () => {
  const t = dessin("croise", 4, "figure");
  const L = (l, c) => lire(t, l, c);
  const a = L("Total", "Formule premium") + L("Plus d'un an", "Total") - L("Plus d'un an", "Formule premium");
  const ni = L("Cette année", "Formule simple");
  vrai("4. a) par le contraire", a === L("Total", "Total") - ni);
  dit(4, `$${L("Total", "Formule premium")} + ${L("Plus d'un an", "Total")} - ${L("Plus d'un an", "Formule premium")} = ${a}$ adhérents`);
  const c = L("Total", "Formule simple") + L("Cette année", "Total") - L("Cette année", "Formule simple");
  dit(4, `$${L("Total", "Formule simple")} + ${L("Cette année", "Total")} - ${ni} = ${c}$ adhérents`);
  reponse(4, `a) ${a} ; b) $${L("Total", "Total")} - ${ni} = ${a}$ ; c) ${c}.`);
});
essai("5", () => {
  const t = dessin("croise", 5, "figure");
  const L = (l, c) => lire(t, l, c);
  const a = L("Total", "Total") - L("France", "Total");
  vrai("5. a) contrôle", a === L("Europe hors France", "Total") + L("Hors Europe", "Total"));
  const b = L("Total", "Total") - L("Total", "Été");
  const c = L("France", "Hiver") + L("Europe hors France", "Hiver");
  dit(5, `$${L("Total", "Total")} - ${L("France", "Total")} = ${a}$`);
  dit(5, `$${L("France", "Hiver")} + ${L("Europe hors France", "Hiver")} = ${c}$`);
  dit(5, `$${L("Total", "Total")} - ${L("Total", "Été")} = ${b}$`);
  reponse(5, `a) ${a} ; b) ${b} ; c) ${c}.`);
});
essai("6", () => {
  const R = table(6);
  const s30 = noms(R, (r) => r["Surface (m²)"] >= 30, "Logement");
  const a = noms(R, (r) => r["Surface (m²)"] >= 30 && r["Loyer (€)"] <= 700, "Logement");
  const b = noms(R, (r) => r["Surface (m²)"] >= 30 && r["Loyer (€)"] <= 700 && r.Ville === "Lyon", "Logement");
  dit(6, `Surface ≥ 30 : ${liste(s30)}. Parmi eux, loyer ≤ 700 : ${liste(a)}. ${a.length} logements`);
  vrai("6. L4 à 30 m² et 700 € pile", R.find((r) => r.Logement === "L4")["Surface (m²)"] === 30 && R.find((r) => r.Logement === "L4")["Loyer (€)"] === 700);
  reponse(6, `a) ${liste(a)} ; b) ${liste(b)}.`);
});
essai("7", () => {
  const R = table(7);
  const bd = (r) => r.Genre === "BD", e20 = (r) => r.Emprunts >= 20;
  dit(7, `Genre = BD : ${liste(noms(R, bd, "Livre"))}, soit ${R.filter(bd).length}`);
  dit(7, `Emprunts ≥ 20 : ${liste(noms(R, e20, "Livre"))}, soit ${R.filter(e20).length}`);
  const n = ou(7, R, bd, e20);
  const et = noms(R, (r) => bd(r) && e20(r), "Livre");
  reponse(7, `a) ${n} ; b) ${et.length}.`);
  dit(7, `${liste(et)} sont dans les deux listes`);
});
essai("8", () => {
  enonceDit(8, "120 patients (modèle). 50 font du sport chaque semaine, 30 suivent un régime, et 12 font les deux");
  const [T, S, R, SR] = [120, 50, 30, 12];
  vrai("8. le schéma", memes(dessin("croise", 8, "schema")[1], [["Sport", SR, S - SR, S], ["Pas de sport", R - SR, T - S - R + SR, T - S], ["Total", R, T - R, T]]));
  dit(8, `$${S} + ${R} - ${SR} = ${S + R - SR}$ patients`);
  dit(8, `$${T} - ${S + R - SR} = ${T - S - R + SR}$ patients`);
  dit(8, `$${R} - ${SR} = ${R - SR}$`);
  reponse(8, `a) ${S + R - SR} ; b) ${T - S - R + SR} ; c) ${R - SR}.`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const R = table(9);
  // ⭐ Données réelles : demi-grands axes (IMCCE) arrondis au dixième, anneaux des géantes.
  const UA = { Mercure: 0.39, Vénus: 0.72, Terre: 1, Mars: 1.52, Jupiter: 5.2, Saturne: 9.54, Uranus: 19.19, Neptune: 30.07 };
  vrai("9. distances au dixième", R.every((r) => Math.abs(r["Distance (UA)"] - Math.round(UA[r["Planète"]] * 10) / 10) < 1e-9));
  vrai("9. anneaux = géantes", R.every((r) => (r.Anneaux === "oui") === (r.Type === "géante")));
  const art = (n) => (n === "Terre" ? "la Terre" : n);
  const a = noms(R, (r) => r.Anneaux === "oui" && r["Distance (UA)"] < 10, "Planète");
  dit(9, `à moins de 10 UA : ${liste(a)}. ${a.length} planètes`);
  const n = ou(9, R, (r) => r.Type === "tellurique", (r) => r["Distance (UA)"] > 15);
  const c = noms(R, (r) => r.Anneaux !== "oui", "Planète").map(art);
  dit(9, `Sans anneaux : ${liste(c)}, soit ${c.length} planètes`);
  reponse(9, `a) ${liste(a)} ; b) ${n} ; c) ${c.length} planètes, les telluriques.`);
});
essai("10", () => {
  const R = table(10);
  // ⭐ Données réelles : départements par région (INSEE), 96 en métropole.
  vrai("10. 13 régions, 96 départements", R.length === 13 && somme(R.map((r) => r["Départements"])) === 96);
  const d10 = (r) => r["Départements"] >= 10, sans = (r) => r["Façade"] === "non";
  dit(10, `Au moins 10 départements : ${liste(noms(R, d10, "Région"))}. Parmi elles, avec une façade : ${liste(noms(R, (r) => d10(r) && !sans(r), "Région"))}`);
  dit(10, `Sans façade : ${liste(noms(R, sans, "Région"))}, soit ${R.filter(sans).length}`);
  const n = ou(10, R, d10, sans);
  const deps = R.filter(sans).map((r) => r["Départements"]);
  dit(10, `$${plus(deps)} = ${somme(deps)}$`);
  reponse(10, `a) ${liste(noms(R, (r) => d10(r) && !sans(r), "Région"))} ; b) ${n} ; c) ${R.filter(sans).length} régions, ${somme(deps)} départements.`);
});
essai("11", () => {
  const t = dessin("croise", 11, "figure");
  const L = (l, c) => lire(t, l, c);
  const b = L("RH et communication", "Total") + L("Total", "Filles") - L("RH et communication", "Filles");
  const ni = ["Gestion et finance", "Mercatique", "Systèmes d'information"].map((s) => L(s, "Garçons"));
  vrai("11. b) par le contraire", b === L("Total", "Total") - somme(ni));
  dit(11, `$${L("RH et communication", "Total")} + ${L("Total", "Filles")} - ${L("RH et communication", "Filles")} = ${b}$ élèves`);
  dit(11, `$${plus(ni)} = ${somme(ni)}$, et $${L("Total", "Total")} - ${somme(ni)} = ${b}$`);
  const c = L("Total", "Total") - L("Gestion et finance", "Total");
  const d = L("Total", "Garçons") - L("Systèmes d'information", "Garçons");
  dit(11, `$${L("Total", "Total")} - ${L("Gestion et finance", "Total")} = ${c}$ élèves`);
  dit(11, `$${L("Total", "Garçons")} - ${L("Systèmes d'information", "Garçons")} = ${d}$ élèves`);
  reponse(11, `a) ${L("Mercatique", "Filles")} ; b) ${b} ; c) ${c} ; d) ${d}.`);
});
essai("12", () => {
  const R = table(12);
  const p500 = noms(R, (r) => r["Montant (€)"] > 500, "N°");
  const a = noms(R, (r) => r["Montant (€)"] > 500 && r.Pays !== "France", "N°");
  dit(12, `Plus de 500 € : les n° ${liste(p500)}. Parmi eux, hors de France : les n° ${liste(a)}. ${a.length} paiements`);
  const enl = (r) => r["En ligne"] === "oui", m1000 = (r) => r["Montant (€)"] > 1000;
  dit(12, `En ligne : les n° ${liste(noms(R, enl, "N°"))}, soit ${R.filter(enl).length}. Plus de 1000 € : les n° ${liste(noms(R, m1000, "N°"))}, soit ${R.filter(m1000).length}`);
  const n = ou(12, R, enl, m1000);
  const ni = noms(R, (r) => !enl(r) && !m1000(r), "N°");
  dit(12, `les n° ${liste(ni)}. $10 - ${ni.length} = ${n}$`);
  const c = noms(R, (r) => !enl(r), "N°");
  dit(12, `Pas en ligne : les n° ${liste(c)}. ${c.length} paiements`);
  reponse(12, `a) les n° ${liste(a)} ; b) ${n} ; c) ${c.length}.`);
});
essai("13", () => {
  const t = dessin("croise", 13, "figure");
  const L = (l, c) => lire(t, l, c);
  const b = L("Instagram", "Total") + L("Total", "TikTok") - L("Instagram", "TikTok");
  vrai("13. b) par le contraire", b === L("Total", "Total") - L("Pas Instagram", "Pas TikTok"));
  vrai("13. c) 300 + 250 dépasse 500", L("Instagram", "Total") + L("Total", "TikTok") === 550);
  const d = L("Instagram", "Pas TikTok") + L("Pas Instagram", "TikTok");
  vrai("13. d) deux chemins", d === b - L("Instagram", "TikTok"));
  dit(13, `$${L("Instagram", "Total")} + ${L("Total", "TikTok")} - ${L("Instagram", "TikTok")} = ${b}$ jeunes`);
  dit(13, `$${L("Total", "Total")} - ${L("Pas Instagram", "Pas TikTok")} = ${b}$`);
  dit(13, `$${L("Instagram", "Pas TikTok")} + ${L("Pas Instagram", "TikTok")} = ${d}$`);
  reponse(13, `a) ${L("Instagram", "TikTok")} ; b) ${b} ; c) on ne peut pas dépasser 500 ; d) ${d}.`);
});
essai("14", () => {
  enonceDit(14, "800 pots (modèle). 30 ont un défaut d'étiquette, 20 un défaut de poids, et 8 ont les deux défauts");
  const [T, E, P, EP] = [800, 30, 20, 8];
  vrai("14. le schéma", memes(dessin("croise", 14, "schema")[1], [["Étiquette fausse", EP, E - EP, E], ["Étiquette juste", P - EP, T - E - P + EP, T - E], ["Total", P, T - P, T]]));
  dit(14, `$${E} + ${P} - ${EP} = ${E + P - EP}$ pots`);
  dit(14, `$${T} - ${E + P - EP} = ${T - E - P + EP}$ pots`);
  dit(14, `$${E + P - EP} - ${EP} = ${E + P - 2 * EP}$ pots`);
  dit(14, `$${E} - ${EP} = ${E - EP}$ pots`);
  reponse(14, `a) ${E + P - EP} ; b) ${T - E - P + EP} ; c) ${E + P - 2 * EP} ; d) ${E - EP}.`);
});
essai("15", () => {
  enonceDit(15, "250 inscrits (modèle) : 140 hommes et 110 femmes. 90 inscrits sont licenciés dans un club, dont 60 hommes");
  const [T, H, F, Li, HL] = [250, 140, 110, 90, 60];
  vrai("15. 140 + 110 = 250", H + F === T);
  const FL = Li - HL, FN = F - FL;
  vrai("15. le schéma", memes(dessin("croise", 15, "schema")[1], [["Hommes", HL, H - HL, H], ["Femmes", FL, FN, F], ["Total", Li, T - Li, T]]));
  vrai("15. b) par le contraire", H + Li - HL === T - FN);
  dit(15, `$${Li} - ${HL} = ${FL}$. Femmes non licenciées : $${F} - ${FL} = ${FN}$`);
  dit(15, `$${H} + ${Li} - ${HL} = ${H + Li - HL}$ inscrits`);
  dit(15, `$${T} - ${HL} = ${T - HL}$ inscrits`);
  reponse(15, `a) ${FN} ; b) ${H + Li - HL} ; c) ${T - HL}.`);
});
essai("16", () => {
  const R = table(16);
  // ⭐ Données réelles : le calendrier 2026, refait par Date.
  const M = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  const cal = M.map((nom, m) => {
    let n = 0, w = 0;
    for (let d = 1; new Date(Date.UTC(2026, m, d)).getUTCMonth() === m; d++) {
      n++;
      if ([0, 6].includes(new Date(Date.UTC(2026, m, d)).getUTCDay())) w++;
    }
    return { Mois: nom, Jours: n, "Week-end": w };
  });
  vrai("16. le tableau = le calendrier 2026", memes(R, cal));
  const a = noms(R, (r) => r.Jours === 31 && r["Week-end"] === 9, "Mois").map(min1);
  dit(16, `9 jours de week-end : ${liste(a)}`);
  const n = ou(16, R, (r) => r.Jours === 30, (r) => r["Week-end"] >= 10);
  const c = R.filter((r) => r.Jours !== 31).length;
  dit(16, `$12 - ${12 - c} = ${c}$ mois`);
  dit(16, `$${plus(R.map((r) => r["Week-end"]))} = ${somme(R.map((r) => r["Week-end"]))}$ jours`);
  reponse(16, `a) ${liste(a)} ; b) ${n} ; c) ${c} ; d) ${somme(R.map((r) => r["Week-end"]))}.`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const R = table(17);
  const sans = (r) => r.Carte === "non", jeune = (r) => r["Âge"] < 30;
  const a = noms(R, (r) => sans(r) && r["Achats (€)"] >= 300, "Client");
  dit(17, `Sans carte : ${liste(noms(R, sans, "Client"))}. Parmi eux, au moins 300 € : ${liste(a)}. ${a.length} clients`);
  vrai("17. C06 à 300 € pile", R.find((r) => r.Client === "C06")["Achats (€)"] === 300);
  const n = ou(17, R, jeune, (r) => !sans(r));
  const c = noms(R, (r) => !jeune(r) && sans(r), "Client");
  dit(17, `C02, C03, C10 et C12, et $12 - ${c.length} = ${n}$`);
  vrai("17. c) la liste du contrôle", liste(c) === "C02, C03, C10 et C12");
  enonceDit(17, "un bon de 15 €");
  dit(17, `$${a.length} \\times 15 = ${a.length * 15}$ €`);
  reponse(17, `a) ${liste(a)} ; b) ${n} SMS ; c) ${c.length} ; d) ${a.length * 15} €.`);
});
essai("18", () => {
  enonceDit(18, "200 candidatures pour l'été (modèle). 110 candidats parlent anglais, 60 ont le BAFA, et 35 ont les deux");
  const [T, A, B, AB] = [200, 110, 60, 35];
  const ni = T - AB - (A - AB) - (B - AB);
  vrai("18. le schéma", memes(dessin("croise", 18, "schema")[1], [["Anglais", AB, A - AB, A], ["Pas d'anglais", B - AB, ni, T - A], ["Total", B, T - B, T]]));
  vrai("18. d) par le contraire", ni === T - (A + B - AB));
  vrai("18. quatre réponses différentes", new Set([AB, A + B - AB, B - AB, ni]).size === 4);
  dit(18, `$${T} - ${AB} - ${A - AB} - ${B - AB} = ${ni}$ candidats`);
  dit(18, `$${A} + ${B} - ${AB} = ${A + B - AB}$ candidats`);
  dit(18, `$${B} - ${AB} = ${B - AB}$ candidats`);
  dit(18, `$${T} - ${A + B - AB} = ${ni}$`);
  reponse(18, `a) ${AB} ; b) ${A + B - AB} ; c) ${B - AB} ; d) ${ni}.`);
});
essai("19", () => {
  enonceDit(19, "240 vols, dont 90 internationaux. 36 vols ont eu du retard, dont 20 internationaux");
  const [T, I, R, IR] = [240, 90, 36, 20];
  const N = T - I, NR = R - IR, NH = N - NR;
  vrai("19. le schéma", memes(dessin("croise", 19, "schema")[1], [["International", IR, I - IR, I], ["National", NR, NH, N], ["Total", R, T - R, T]]));
  const d = T - IR;
  vrai("19. d) deux chemins", d === N + (T - R) - NH);
  dit(19, `$${N} + ${T - R} - ${NH} = ${d}$`);
  dit(19, `$${N} - ${NR} = ${NH}$ vols`);
  dit(19, `$${I} + ${R} - ${IR} = ${I + R - IR}$ vols`);
  dit(19, `$${T} - ${R} = ${T - R}$ vols`);
  reponse(19, `a) ${NH} ; b) ${I + R - IR} ; c) ${T - R} ; d) ${d}.`);
});
essai("20", () => {
  enonceDit(20, "500 références de médicaments (modèle). 320 se vendent sans ordonnance. 150 se conservent au réfrigérateur, dont 40 sans ordonnance");
  const [T, S, F, SF] = [500, 320, 150, 40];
  const O = T - S, OF = F - SF, SN = S - SF;
  vrai("20. le schéma", memes(dessin("croise", 20, "schema")[1], [["Sans ordonnance", SF, SN, S], ["Avec ordonnance", OF, O - OF, O], ["Total", F, T - F, T]]));
  const c = O + F - OF;
  vrai("20. c) par le contraire", c === T - SN);
  dit(20, `$${O} + ${F} - ${OF} = ${c}$ références`);
  dit(20, `$${F} - ${SF} = ${OF}$ références`);
  dit(20, `$${S} - ${SF} = ${SN}$ références`);
  reponse(20, `a) ${OF} ; b) ${SN} ; c) ${c} ; d) $${T} - ${SN} = ${c}$.`);
});

f.fin();
