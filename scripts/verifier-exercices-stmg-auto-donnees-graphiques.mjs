// Recalcul indépendant de la feuille « Lire des données chiffrées et des
// graphiques » de STMG (22/10/2026) : lib/fiches-exercices/maths-stmg-auto-donnees-graphiques.tsx.
//
// ⭐ L'AUTRE CHEMIN : les hauteurs des barres et des bâtons, les secteurs et les
// cinq nombres des boîtes sont RELUS dans les appels de dessin ; chaque lecture
// « au milieu, entre a et b » est exigée dans le corrigé quand la valeur tombe
// entre deux graduations ; totaux, moyennes, angles, écarts interquartiles,
// rapports « à l'œil » d'un axe tronqué et taux d'évolution sont refaits ici.
// Les quartiles des séries données en liste (6, 19) sont recalculés avec la
// définition du lycée (rang = premier entier ≥ n/4, ≥ 3n/4). Données réelles :
// régions (INSEE), Coupe du monde 2026 (FIFA), hauteurs des tours.
// Usage : node scripts/verifier-exercices-stmg-auto-donnees-graphiques.mjs

import { ouvrirStmg, memes, somme, plus, tx, plat, txA, pcA } from "./verifier-exercices-stmg-donnees-commun.mjs";

const f = ouvrirStmg("lib/fiches-exercices/maths-stmg-auto-donnees-graphiques.tsx", "auto_donnees_graphiques");
const { vrai, dit, enonceDit, dessin, essai, e } = f;
const reponse = (k, texte) => dit(k, `Réponse : ${texte}`);
const val = (data, l) => data.find((d) => d.label === l).value;
const vals = (data) => data.map((d) => d.value);
const milieu = (v, pas) => `au milieu, entre ${plat(v - pas / 2)} et ${plat(v + pas / 2)}`;
/** Chaque barre LUE qui tombe entre deux graduations est annoncée « au milieu ». */
const milieux = (k, data, o, labels = data.map((d) => d.label)) => {
  for (const d of data) if (labels.includes(d.label) && Math.abs(((d.value - (o.debut ?? 0)) / o.pas) % 1) > 1e-9) dit(k, milieu(d.value, o.pas));
};
/** Les cinq nombres d'une série, quartiles à la manière du lycée. */
const cinq = (xs) => {
  const s = [...xs].sort((a, b) => a - b), n = s.length;
  const med = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
  return { min: s[0], q1: s[Math.ceil(n / 4) - 1], mediane: med, q3: s[Math.ceil((3 * n) / 4) - 1], max: s[n - 1] };
};
const nombresListe = (k) => e(k).match(/:\\n([\d, ]+)\./)[1].split(", ").map(Number);

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [data, o] = dessin("barres", 1, "figure");
  milieux(1, data, o);
  const min = data.reduce((m, d) => (d.value < m.value ? d : m));
  vrai("1. c) le mercredi, seul minimum", min.label === "Mer" && data.filter((d) => d.value === min.value).length === 1);
  dit(1, `$${val(data, "Sam")} - ${val(data, "Lun")} = ${val(data, "Sam") - val(data, "Lun")}$ croissants de plus`);
  dit(1, `$${plus(vals(data))} = ${somme(vals(data))}$ croissants`);
  reponse(1, `a) de ${o.pas} en ${o.pas} ; b) ${val(data, "Mar")} ; c) le mercredi ; d) ${val(data, "Sam") - val(data, "Lun")} ; e) ${somme(vals(data))}.`);
});
essai("2", () => {
  const [data, o] = dessin("barres", 2, "figure");
  milieux(2, data, o, ["T3"]);
  const [a, b] = [val(data, "T1") - o.debut, val(data, "T4") - o.debut];
  dit(2, `T1 monte de $${val(data, "T1")} - ${o.debut} = ${a}$, T4 de $${val(data, "T4")} - ${o.debut} = ${b}$. $${b} \\div ${a} = ${tx(b / a)}$`);
  const t = (val(data, "T4") - val(data, "T1")) / val(data, "T1");
  dit(2, `\\approx ${txA(t, 4)}$, soit une hausse d'environ ${pcA(t, 1)} %`);
  reponse(2, `a) ${o.debut}, de ${o.pas} en ${o.pas} ; b) ${val(data, "T3")} milliers d'euros ; c) ${b / a} fois ; d) environ ${pcA(t, 1)} %.`);
});
essai("3", () => {
  const [data] = dessin("camembert", 3, "figure");
  enonceDit(3, "budget annuel de 60 000 €");
  const B = 60000;
  dit(3, `$0{,}35 \\times 60\\,000 = ${tx(0.35 * B)}$ €`);
  dit(3, `$0{,}25 \\times 60\\,000 = ${tx((val(data, "Matériel") + val(data, "Communication")) / 100 * B)}$ €`);
  dit(3, `$0{,}35 \\times 360 = ${tx((val(data, "Loyer") / 100) * 360)}$°`);
  vrai("3. a) les salaires en tête", Math.max(...vals(data)) === val(data, "Salaires"));
  reponse(3, `a) les salaires ; b) $${tx(0.35 * B)}$ € ; c) $${tx(0.25 * B)}$ € ; d) ${tx((val(data, "Loyer") / 100) * 360)}°.`);
});
essai("4", () => {
  const [data, o] = dessin("barres", 4, "figure");
  vrai("4. 30 jours", somme(vals(data)) === 30);
  milieux(4, data, o, ["0", "1", "2", "4"]);
  const tot = somme(data.map((d) => Number(d.label) * d.value));
  dit(4, `$${data.map((d) => `${d.label} \\times ${d.value}`).join(" + ")} = ${data.map((d) => Number(d.label) * d.value).join(" + ")} = ${tot}$ réclamations`);
  reponse(4, `a) ${val(data, "2")} ; b) ${val(data, "0")} ; c) ${val(data, "4") + val(data, "5")} ; d) ${tot}.`);
});
essai("5", () => {
  const [[b]] = dessin("boite", 5, "figure");
  dit(5, `Écart interquartile : $${b.q3} - ${b.q1} = ${b.q3 - b.q1}$ €`);
  dit(5, `$${b.max} - ${b.min} = ${b.max - b.min}$ €`);
  reponse(5, `a) ${b.mediane} € ; b) ${b.q1} € et ${b.q3} €, écart interquartile ${b.q3 - b.q1} € ; c) ${b.max - b.min} € ; d) vrai.`);
});
essai("6", () => {
  const xs = nombresListe(6);
  // ⭐ Données réelles : les départements des 13 régions (INSEE).
  vrai("6. les 13 régions, 96 départements", xs.length === 13 && somme(xs) === 96 && memes(xs, [...xs].sort((a, b) => a - b)));
  const c5 = cinq(xs);
  vrai("6. le schéma", memes(dessin("boite", 6, "schema")[0][0], c5));
  dit(6, `Médiane : ${c5.mediane} départements`);
  dit(6, `la 4e valeur : Q1 = ${c5.q1}`);
  dit(6, `la 10e valeur : Q3 = ${c5.q3}`);
  dit(6, `$${c5.q3} - ${c5.q1} = ${c5.q3 - c5.q1}$ départements`);
  reponse(6, `a) ${c5.mediane} ; b) Q1 = ${c5.q1}, Q3 = ${c5.q3} ; c) ${c5.q3 - c5.q1}, et la boîte ci-dessous.`);
});
essai("7", () => {
  const [data, o] = dessin("barres", 7, "figure");
  milieux(7, data, o);
  const g = dessin("grille", 7, "schema")[1];
  vrai("7. le tableau du schéma", memes(g.slice(0, -1), data.map((d) => [d.label, d.value])) && g.at(-1)[1] === somme(vals(data)));
  dit(7, `$${plus(vals(data))} = ${somme(vals(data))}$ entrées`);
  reponse(7, `a) le tableau ci-dessous ; b) ${somme(vals(data))} ; c) ${val(data, "0-17") + val(data, "18-39")}.`);
});
essai("8", () => {
  // ⭐ Données réelles : Coupe du monde 2026, places par confédération (FIFA).
  const [data] = dessin("camembert", 8, "schema");
  vrai("8. 48 équipes : 16, 9, 8, 6, 6, 1, 2", memes(vals(data), [16, 9, 8, 6, 6, 1, 2]) && somme(vals(data)) === 48);
  for (const d of data) enonceDit(8, `(${d.label}) ${d.value}`.replace("(barrage) 2", "2 places"));
  const a = 360 / 48;
  const ang = vals(data).map((v) => v * a);
  dit(8, `$360 \\div 48 = ${tx(a)}$° par équipe`);
  dit(8, `$${ang.map(tx).join(" + ")} = 360$°`);
  reponse(8, `a) ${plat(a)}° ; b) ${[...new Set(ang)].length === ang.length ? "" : ""}${ang.map((x) => `${plat(x)}°`).slice(0, -1).join(", ")} et ${plat(ang.at(-1))}° ; c) 360°.`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  // ⭐ Données réelles : hauteurs des tours, arrondies au mètre.
  const H = { "Burj Khalifa": 828, "Shanghai Tower": 632, "One World Trade Center": 541, "tour Eiffel": 330, "tour Montparnasse": 210 };
  for (const [n, h] of Object.entries(H)) enonceDit(9, `${n} ${h} m`);
  vrai("9. le schéma", memes(vals(dessin("barres", 9, "schema")[0]), Object.values(H)));
  dit(9, `a) 1 cm pour 100 m : je divise chaque hauteur par 100.\\nBurj Khalifa ${plat(828 / 100)} cm ; Shanghai Tower ${plat(632 / 100)} cm ; One World Trade Center ${plat(541 / 100)} cm ; tour Eiffel ${plat(330 / 100)} cm ; tour Montparnasse ${plat(210 / 100)} cm`);
  const ok = [100, 150, 200].filter((ech) => 828 / ech <= 6);
  vrai("9. b) 150 et 200 conviennent, 150 est la meilleure", memes(ok, [150, 200]));
  dit(9, `$828 \\div 150 = ${tx(828 / 150)}$ cm`);
  dit(9, `$828 \\div 200 = ${tx(828 / 200)}$ cm`);
  dit(9, `$330 \\div 150 = ${tx(330 / 150)}$ cm`);
  reponse(9, `a) ${[828, 632, 541, 330].map((h) => plat(h / 100)).join(" ; ")} et ${plat(2.1)} cm ; b) 1 cm pour 150 m ou pour 200 m, la première est la meilleure ; c) ${plat(330 / 150)} cm.`);
});
essai("10", () => {
  const [data] = dessin("camembert", 10, "schema");
  const T = somme(vals(data));
  enonceDit(10, `${T} logements d'un quartier (modèle) : ${data.map((d) => `${d.label} ${d.value}`).join(", ")}`);
  const a = 360 / T;
  dit(10, `$360 \\div ${T} = ${tx(a)}$° par logement`);
  for (const d of data) dit(10, `$${d.value} \\times ${tx(a)} = ${tx(d.value * a)}$°`);
  dit(10, `$${data.map((d) => tx(d.value * a)).join(" + ")} = 360$°`);
  dit(10, `$60 \\div ${T} = ${tx(60 / T)}$, soit ${plat((60 / T) * 100)} %`);
  reponse(10, `a) ${plat(a)}° ; b) ${data.slice(0, -1).map((d) => `${plat(d.value * a)}°`).join(", ")} et ${plat(data.at(-1).value * a)}° ; c) ${plat((60 / T) * 100)} %.`);
});
essai("11", () => {
  const [data, o] = dessin("barres", 11, "figure");
  milieux(11, data, o, ["2024"]);
  const [a, b] = [val(data, "2022"), val(data, "2025")];
  dit(11, `$${b} - ${a} = ${b - a}$ points`);
  dit(11, `$${b - o.debut} \\div ${a - o.debut} = ${tx((b - o.debut) / (a - o.debut))}$`);
  dit(11, `$${b} \\div ${a} \\approx ${txA(b / a, 2)}$`);
  reponse(11, `a) ${o.debut}, de ${o.pas} en ${o.pas} ; b) ${val(data, "2024")} % ; c) ${b - a} points ; d) ${plat((b - o.debut) / (a - o.debut))} fois ; e) environ ${platA(b / a)}.`);
  function platA(x) {
    return x.toFixed(2).replace(".", ",");
  }
});
essai("12", () => {
  const [[A, B]] = dessin("boite", 12, "figure");
  vrai("12. même médiane", A.mediane === B.mediane);
  dit(12, `A : écart interquartile $${A.q3} - ${A.q1} = ${A.q3 - A.q1}$ h, étendue $${A.max} - ${A.min} = ${A.max - A.min}$ h`);
  dit(12, `B : écart interquartile $${B.q3} - ${B.q1} = ${B.q3 - B.q1}$ h, étendue $${B.max} - ${B.min} = ${B.max - B.min}$ h`);
  vrai("12. c) Q3 de B = 60", B.q3 === 60);
  vrai("12. d) B plus régulier sur les deux mesures", B.q3 - B.q1 < A.q3 - A.q1 && B.max - B.min < A.max - A.min);
  reponse(12, `a) ${A.mediane} h pour les deux ; b) A : ${A.q3 - A.q1} h et ${A.max - A.min} h, B : ${B.q3 - B.q1} h et ${B.max - B.min} h ; c) vrai ; d) B.`);
});
essai("13", () => {
  const [data, o] = dessin("barres", 13, "figure");
  milieux(13, data, o);
  const N = somme(vals(data)), nuits = somme(data.map((d) => Number(d.label) * d.value));
  dit(13, `$${plus(vals(data))} = ${N}$ réservations`);
  dit(13, `$${data.map((d) => `${d.label} \\times ${d.value}`).join(" + ")} = ${data.map((d) => Number(d.label) * d.value).join(" + ")} = ${nuits}$ nuits`);
  dit(13, `$${nuits} \\div ${N} = ${tx(nuits / N)}$ nuits`);
  reponse(13, `a) ${vals(data).slice(0, -1).join(", ")} et ${vals(data).at(-1)} ; b) ${N} ; c) ${nuits} nuits ; d) ${plat(nuits / N)} nuits.`);
});
essai("14", () => {
  const [data] = dessin("camembert", 14, "schema");
  enonceDit(14, `1200 kg de déchets de l'édition (modèle) : ${val(data, "Recyclable")} % de déchets recyclables, ${val(data, "Compost")} % de déchets à composter, ${val(data, "Ordures")} % d'ordures`);
  dit(14, `$0{,}3 \\times 1200 = ${0.3 * 1200}$ kg`);
  for (const d of data) dit(14, `$${tx(d.value / 100)} \\times 360 = ${tx((d.value / 100) * 360)}$°`);
  const [av, ap] = [0.25 * 1200, 0.15 * 1200];
  dit(14, `$${av} - ${ap} = ${av - ap}$ kg de moins`);
  reponse(14, `a) ${0.3 * 1200} kg ; b) ${vals(data).map((v) => `${tx((v / 100) * 360)}°`).slice(0, -1).join(", ")} et ${tx((val(data, "Ordures") / 100) * 360)}° ; c) ${av - ap} kg.`);
});
essai("15", () => {
  const [[b]] = dessin("boite", 15, "figure");
  vrai("15. a) médiane 25", b.mediane === 25);
  vrai("15. b) Q1 15", b.q1 === 15);
  dit(15, `$${b.q3} - ${b.q1} = ${b.q3 - b.q1}$ minutes. Vrai`);
  vrai("15. c) l'écart interquartile vaut bien 25", b.q3 - b.q1 === 25);
  vrai("15. d) le max dépasse une heure", b.max > 60);
  dit(15, `Le maximum vaut ${b.max} minutes`);
  reponse(15, "a) vrai ; b) vrai ; c) vrai ; d) faux ; e) on ne peut pas savoir.");
});
essai("16", () => {
  const [data, o] = dessin("barres", 16, "figure");
  milieux(16, data, o, ["Kiwi", "Pomme", "Figue"]);
  const p = val(data, "Pomme"), fi = val(data, "Figue");
  dit(16, `$2 \\times ${tx(p)} + 1{,}5 \\times ${tx(fi)} = ${tx(2 * p)} + ${tx(1.5 * fi)} = ${tx(2 * p + 1.5 * fi)}$ €`);
  dit(16, `$${tx(fi)} \\div ${tx(p)} = ${tx(fi / p)}$`);
  reponse(16, `a) de ${o.pas} en ${o.pas}, ${val(data, "Kiwi").toFixed(2).replace(".", ",")} € ; b) ${(2 * p + 1.5 * fi).toFixed(2).replace(".", ",")} € ; c) ${fi / p} fois.`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [data, o] = dessin("barres", 17, "figure");
  milieux(17, data, o, ["Avr", "Jan", "Mai"]);
  const T = somme(vals(data));
  enonceDit(17, "L'objectif du semestre était de 330 milliers d'euros");
  dit(17, `$${plus(vals(data))} = ${T}$ milliers d'euros`);
  vrai("17. b) objectif manqué", T < 330);
  dit(17, `$330 - ${T} = ${330 - T}$ milliers`);
  dit(17, `$${T} \\div 6 \\approx ${txA(T / 6, 1)}$ milliers`);
  const t = (val(data, "Juin") - val(data, "Jan")) / val(data, "Jan");
  dit(17, `$\\dfrac{${val(data, "Juin")} - ${val(data, "Jan")}}{${val(data, "Jan")}} = \\dfrac{${val(data, "Juin") - val(data, "Jan")}}{${val(data, "Jan")}} \\approx ${txA(t, 4)}$, soit une hausse d'environ ${pcA(t, 1)} %`);
  reponse(17, `a) ${val(data, "Mar")} et ${val(data, "Avr")} milliers d'euros ; b) ${T}, objectif manqué de ${330 - T} ; c) environ ${plat(Number((T / 6).toFixed(1)))} ; d) environ ${pcA(t, 1)} %.`);
});
essai("18", () => {
  const [data] = dessin("camembert", 18, "figure");
  const eff = vals(data).map((p) => (p / 100) * 400);
  const tab = e(18).match(/voiture (\d+), transports en commun (\d+), vélo (\d+), marche (\d+)/).slice(1).map(Number);
  const faux = tab.map((x, i) => x !== eff[i]);
  vrai("18. une seule erreur, la marche", faux.filter(Boolean).length === 1 && faux[3]);
  dit(18, `Voiture : $0{,}45 \\times 400 = ${eff[0]}$. Transports : $0{,}3 \\times 400 = ${eff[1]}$. Vélo : $0{,}15 \\times 400 = ${eff[2]}$. Marche : $0{,}1 \\times 400 = ${eff[3]}$`);
  dit(18, `$${plus(tab)} = ${somme(tab)}$, plus que les 400`);
  dit(18, `$0{,}15 \\times 360 = ${0.15 * 360}$°`);
  reponse(18, `a) ${eff.slice(0, -1).join(", ")} et ${eff[3]} ; b) la marche, ${eff[3]} au lieu de ${tab[3]} ; c) ${0.15 * 360}°.`);
});
essai("19", () => {
  const xs = nombresListe(19);
  vrai("19. 12 valeurs rangées", xs.length === 12 && memes(xs, [...xs].sort((a, b) => a - b)));
  const c5 = cinq(xs);
  vrai("19. le schéma", memes(dessin("boite", 19, "schema")[0][0], c5));
  dit(19, `$(${xs[5]} + ${xs[6]}) \\div 2 = ${tx(c5.mediane)}$ minutes`);
  dit(19, `la 3e valeur : Q1 = ${c5.q1}`);
  dit(19, `la 9e valeur : Q3 = ${c5.q3}`);
  dit(19, `$${c5.q3} - ${c5.q1} = ${c5.q3 - c5.q1}$ minutes`);
  const n30 = xs.filter((x) => x <= 30).length;
  vrai("19. d) la moitié pile en 30 min au plus", n30 * 2 === xs.length);
  dit(19, `soit ${n30} sur 12`);
  reponse(19, `a) ${plat(c5.mediane)} min ; b) Q1 = ${c5.q1}, Q3 = ${c5.q3} ; c) ${c5.q3 - c5.q1} min ; d) oui, ${n30} patients sur 12.`);
});
essai("20", () => {
  const [data, o] = dessin("barres", 20, "figure");
  const [a, b] = [val(data, "Marque A"), val(data, "Marque B")];
  dit(20, `A monte de $${a} - ${o.debut} = ${a - o.debut}$, B de $${b} - ${o.debut} = ${b - o.debut}$. $${b - o.debut} \\div ${a - o.debut} = ${tx((b - o.debut) / (a - o.debut))}$`);
  vrai("20. « trois fois » à l'œil", (b - o.debut) / (a - o.debut) === 3);
  enonceDit(20, "Trois fois plus de clients satisfaits");
  dit(20, `$${b} - ${a} = ${b - a}$ points. $${b} \\div ${a} \\approx ${txA(b / a, 2)}$`);
  vrai("20. le schéma : mêmes valeurs, depuis 0", memes(vals(dessin("barres", 20, "schema")[0]), [a, b]) && !dessin("barres", 20, "schema")[1].debut);
  reponse(20, `a) ${a} % et ${b} % ; b) 3 fois ; c) ${b - a} points, environ ${(b / a).toFixed(2).replace(".", ",")} ; d) non, l'axe est tronqué.`);
});

f.fin();
