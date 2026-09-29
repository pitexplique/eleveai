// Recalcul indépendant de la feuille « Les échelles » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-prop-echelle.tsx.
//
// ⭐ Les nombres sont relus dans l'ÉNONCÉ ou dans le DESSIN (plan, piece,
// tableauCoef, tableau, table), jamais recopiés ici. Le script connaît seulement
// 1 m = 100 cm et 1 km = 1 000 m : il applique l'échelle dans un sens ou dans
// l'autre, puis cherche la réponse écrite dans le corrigé. Chaque dessin est
// aussi contrôlé : ce qu'il écrit est ce que dit l'échelle, et tout tient dans
// le cadre de 300 sans se chevaucher.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-prop-echelle.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-prop-echelle.tsx", "prop_echelle", ["plan", "piece", "tableauCoef", "table"], "6e");
const { e, vrai, dit, enonceDit, dessin, appels, essai } = f;

const nb = (s) => Number(String(s).replace(/^!/, "").replace(/\{,\}/g, ".").replace(/\\,/g, "").replace(/\s/g, "").replace(",", ".").replace(/[a-zA-Z€]+$/, ""));
const r6 = (x) => Math.round(x * 1e6) / 1e6;
const L = (s) => s.length * 8.8;
const EN_CM = { cm: 1, m: 100, km: 100000 };
/** « 1 cm ↔ 20 m » → ce que vaut 1 cm du plan, en cm réels. */
const echelle = (s) => {
  const m = /^1 cm ↔ ([\d ,]+) (cm|m|km)$/.exec(s);
  if (!m) throw new Error(`échelle illisible : ${s}`);
  return nb(m[1]) * EN_CM[m[2]];
};
/** Le premier nombre $…$ qui suit un morceau de texte. */
const apres = (texte, morceau) => {
  const i = texte.indexOf(morceau);
  if (i < 0) throw new Error(`« ${morceau} » introuvable`);
  const m = /\$([\d\\,{} ]+)\$/.exec(texte.slice(i + morceau.length));
  return nb(m[1]);
};
/** L'échelle d'un énoncé : « $1$ cm représente $20$ m » → 1 cm = 2 000 cm réels. */
const echelleEnonce = (texte) => {
  const m = /\$1\$ cm représente \$([\d\\,{} ]+)\$ (cm|m|km)/.exec(texte);
  if (!m) throw new Error("échelle introuvable dans l'énoncé");
  return nb(m[1]) * EN_CM[m[2]];
};

/* ═════ Les plans : tout tient dans le cadre ═════ */
for (const { args } of appels("plan").filter((a) => a.args)) {
  const [u, ech, traits] = args;
  if (ech) vrai(`plan ${ech} : l'échelle tient`, 12 + u + 8 + L(ech) <= 298);
  for (const tr of traits) {
    vrai(`plan ${ech} : le trait ${tr.nom} tient (${tr.cm} cm)`, 12 + tr.cm * u <= 288);
    vrai(`plan ${ech} : « ${tr.nom} : ${tr.label} » tient`, L(`${tr.nom} : ${tr.label}`) <= 292);
    vrai(`plan ${ech} : l'étiquette dit la longueur du trait`, nb(tr.label.split(" = ")[0]) === tr.cm);
  }
}
/* ═════ Les rectangles : dans le cadre, textes dedans, aucun texte recouvert ═════ */
for (const { args } of appels("piece").filter((a) => a.args)) {
  const [u, ech, formes] = args;
  vrai(`piece ${ech} : l'échelle tient`, 12 + u + 8 + L(ech) <= 298);
  const boites = formes.map((fo) => {
    const x = 12 + fo.x * u, y = 36 + fo.y * u, w = fo.l * u, h = fo.h * u;
    vrai(`piece ${fo.nom} : dans le cadre`, x + w <= 290);
    const cote = `${String(fo.l).replace(".", ",")} × ${String(fo.h).replace(".", ",")} cm`;
    const larg = Math.max(L(fo.nom), fo.cotes ? L(cote) : 0);
    vrai(`piece ${fo.nom} : ses textes tiennent dedans`, larg <= w - 6 && h >= (fo.cotes ? 44 : 24));
    const cx = x + w / 2, cy = y + h / 2;
    return { rect: [x, y, x + w, y + h], texte: [cx - larg / 2, fo.cotes ? cy - 15 : cy - 6, cx + larg / 2, fo.cotes ? cy + 18 : cy + 8] };
  });
  const coupe = (a, b) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];
  boites.forEach((bi, i) => boites.forEach((bj, j) => j > i && vrai(`piece ${formes[j].nom} ne recouvre pas le texte de ${formes[i].nom}`, !coupe(bi.texte, bj.rect))));
}
/* ═════ Les tableaux fléchés : bas = haut × coefficient ═════ */
for (const { args } of appels("tableauCoef").filter((a) => a.args)) {
  const [titres, haut, bas, coef] = args;
  vrai(`tableauCoef ${titres} : autant de cases`, haut.length === bas.length);
  haut.forEach((h, i) => vrai(`tableauCoef ${titres} : ${h} × ${coef} = ${bas[i]}`, r6(nb(h) * nb(coef)) === nb(bas[i])));
}
for (const { args } of appels("table").filter((a) => a.args)) {
  const [entete, lignes] = args;
  vrai(`table ${entete[0]} : 3 colonnes au plus, lignes pleines`, entete.length <= 3 && lignes.every((l) => l.length === entete.length));
}

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const k = echelleEnonce(e(1)) / 100; // en m
  const [, ech, traits] = dessin("plan", 1, "figure");
  vrai("1. le dessin porte l'échelle de l'énoncé", echelle(ech) === k * 100);
  const [a, b] = traits.map((x) => x.cm);
  enonceDit(1, `de $${a}$ cm`);
  enonceDit(1, `de $${b}$ cm`);
  dit(1, `$${a} \\times ${k} = ${t(a * k)}$ m`);
  dit(1, `$${b} \\times ${k} = ${t(b * k)}$ m`);
  dit(1, `Réponse : a) $${t(a * k)}$ m ; b) $${t(b * k)}$ m, soit $${t(b * k / 1000)}$ km.`);
});
essai("2", () => {
  const k = echelleEnonce(e(2)) / 100, cm = apres(e(2), "tilleuls mesure");
  dit(2, `$${cm} \\times ${k} = ${t(cm * k)}$ m`);
  dit(2, `Réponse : l'allée mesure $${t(cm * k)}$ m.`);
  const [, ech, [tr]] = dessin("plan", 2);
  vrai("2. le plan", echelle(ech) === k * 100 && tr.cm === cm && tr.label === `${cm} cm = ${cm * k} m`);
});
essai("3", () => {
  const k = echelleEnonce(e(3)) / 100, reel = apres(e(3), "basket mesure");
  const cm = reel / k;
  dit(3, `$${reel} \\div ${k} = ${t(cm)}$ cm`);
  dit(3, `$${reel} \\times ${k} = ${t(reel * k)}$ cm`);
  dit(3, `Réponse : le terrain mesure $${t(cm)}$ cm sur le plan.`);
  const [, ech, [tr]] = dessin("plan", 3);
  vrai("3. le plan dessine la réponse", echelle(ech) === k * 100 && tr.cm === cm);
});
essai("4", () => {
  const k = echelleEnonce(e(4)) / 100000, cm = apres(e(4), "route mesure");
  const lina = apres(e(4), "la route mesure");
  vrai("4. Lina a divisé", r6(cm / k) === lina);
  dit(4, `$${cm} \\times ${k} = ${t(cm * k)}$ km`);
  dit(4, `Réponse : la route mesure $${t(cm * k)}$ km.`);
});
essai("5", () => {
  const n = 10, cm = apres(e(5), "Elle mesure");
  enonceDit(5, "l'échelle $\\dfrac{1}{10}$");
  dit(5, `$1$ cm sur la miniature représente $${n}$ cm en vrai`);
  dit(5, `$${cm} \\times ${n} = ${cm * n}$ cm`);
  dit(5, `$${cm * n}$ cm $= ${t(cm * n / 100)}$ m`);
  dit(5, `Réponse : la vraie voiture mesure $${cm * n}$ cm, soit $${t(cm * n / 100)}$ m.`);
});
essai("6", () => {
  const k = echelleEnonce(e(6)) / 100000, reel = apres(e(6), "villages sont à");
  const cm = reel / k;
  dit(6, `$${reel} \\div ${k} = ${t(cm)}$ cm`);
  dit(6, `$${t(cm)} \\times ${k} = ${reel}$ km`);
  dit(6, `Réponse : les villages sont à $${t(cm)}$ cm sur la carte.`);
  const [, , [tr]] = dessin("plan", 6);
  vrai("6. le plan dessine la réponse", tr.cm === cm);
});
essai("7", () => {
  const k = echelleEnonce(e(7)) / 100;
  const [ent, lig] = dessin("tableau", 7, "figure");
  vrai("7. la première colonne est l'échelle", nb(ent[1]) === 1 && nb(lig[1]) === k);
  const [p2, p3] = [nb(ent[2]), nb(ent[3])], r4 = nb(lig[4]);
  dit(7, `$${p2} \\times ${k} = ${p2 * k}$ m et $${p3} \\times ${k} = ${p3 * k}$ m`);
  dit(7, `$${r4} \\div ${k} = ${r4 / k}$ cm`);
  dit(7, `Réponse : $${p2 * k}$ m ; $${p3 * k}$ m ; $${r4 / k}$ cm.`);
});
essai("8", () => {
  const reel = apres(e(8), "football de"), cm = apres(e(8), "trait de");
  dit(8, `$${reel} \\div ${cm} = ${reel / cm}$ m`);
  dit(8, `Réponse : $1$ cm représente $${reel / cm}$ m.`);
  const [, ech, [tr]] = dessin("plan", 8);
  vrai("8. le plan : l'échelle trouvée", echelle(ech) === (reel / cm) * 100 && tr.cm === cm);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const k = echelleEnonce(e(9)) / 100;
  const [, ech, traits] = dessin("plan", 9, "figure");
  vrai("9. le plan porte l'échelle", echelle(ech) === k * 100);
  const noms = ["Salon", "Cuisine", "Couloir"];
  traits.forEach((tr, i) => dit(9, `${noms[i]} : $${t(tr.cm)} \\times ${k} = ${t(tr.cm * k)}$ m`));
  const [s, c, co] = traits.map((tr) => tr.cm * k);
  dit(9, `$${t(s)} + ${t(c)} = ${t(s + c)}$ m`);
  vrai("9. le couloir est plus court", co < s + c);
  dit(9, `Réponse : $${t(s)}$ m, $${t(c)}$ m et $${t(co)}$ m ; non, le couloir est plus court.`);
  const [, lignes] = dessin("table", 9);
  vrai("9. le tableau", lignes.every((l, i) => nb(l[1]) === traits[i].cm && nb(l[2]) === traits[i].cm * k));
});
essai("10", () => {
  const k = echelleEnonce(e(10)) / 100000;
  const [, ech, traits] = dessin("plan", 10, "figure");
  vrai("10. le plan porte l'échelle et les longueurs de l'énoncé", echelle(ech) === k * 100000 && traits.every((tr) => e(10).includes(`mesure $${tr.cm}$ cm`)));
  const [a, b] = traits.map((tr) => tr.cm);
  dit(10, `$${a} \\times ${k} = ${a * k}$ km`);
  dit(10, `$${b} \\times ${k} = ${b * k}$ km`);
  dit(10, `$${a * k} + ${b * k} = ${(a + b) * k}$ km`);
  dit(10, `$${a} + ${b} = ${a + b}$ cm sur la carte, et $${a + b} \\times ${k} = ${(a + b) * k}$ km`);
  dit(10, `Réponse : $${a * k}$ km et $${b * k}$ km ; $${(a + b) * k}$ km.`);
});
essai("11", () => {
  const k = echelleEnonce(e(11));
  const [l, h] = [apres(e(11), "Sa chambre mesure"), apres(e(11), "m sur")];
  const [ll, lh] = [apres(e(11), "Son lit mesure"), apres(e(11), `lit mesure $${apres(e(11), "Son lit mesure")}$ m sur`)];
  const cm = (m) => (m * 100) / k;
  dit(11, `$${l * 100} \\div ${k} = ${cm(l)}$ cm et $${h * 100} \\div ${k} = ${cm(h)}$ cm`);
  dit(11, `$${ll * 100} \\div ${k} = ${cm(ll)}$ cm et $${lh * 100} \\div ${k} = ${cm(lh)}$ cm`);
  dit(11, `Réponse : la chambre fait $${cm(l)}$ cm sur $${cm(h)}$ cm ; le lit $${cm(ll)}$ cm sur $${cm(lh)}$ cm.`);
  const [, ech, formes] = dessin("piece", 11);
  vrai("11. le plan dessine la réponse", echelle(ech) === k && formes[0].l === cm(l) && formes[0].h === cm(h) && formes[1].l === cm(ll) && formes[1].h === cm(lh));
  vrai("11. le lit est dans la chambre", formes[1].x + formes[1].l <= formes[0].l && formes[1].y + formes[1].h <= formes[0].h);
});
essai("12", () => {
  const n = 50, haut = apres(e(12), "la maison mesure"), porte = apres(e(12), "porte mesure");
  enonceDit(12, "l'échelle $\\dfrac{1}{50}$");
  dit(12, `$${haut} \\times ${n} = ${haut * n}$ cm`);
  dit(12, `$${haut * n}$ cm $= ${haut * n / 100}$ m`);
  dit(12, `$${porte * 100} \\div ${n} = ${porte * 100 / n}$ cm`);
  dit(12, `Réponse : a) $${haut * n / 100}$ m ; b) $${porte * 100 / n}$ cm.`);
});
essai("13", () => {
  const reel = apres(e(13), "Une route de"), a = apres(e(13), "Carte A :") && apres(e(13), "Carte A : $1$ cm représente"), b = apres(e(13), "Carte B : $1$ cm représente");
  dit(13, `Carte A : $${reel} \\div ${a} = ${reel / a}$ cm`);
  dit(13, `Carte B : $${reel} \\div ${b} = ${reel / b}$ cm`);
  dit(13, `la route est $${(reel / a) / (reel / b)}$ fois plus longue`);
  dit(13, `Réponse : $${reel / a}$ cm et $${reel / b}$ cm ; la carte A.`);
  const [, , traits] = dessin("plan", 13);
  vrai("13. le dessin des deux routes", traits[0].cm === reel / a && traits[1].cm === reel / b);
});
essai("14", () => {
  const k = echelleEnonce(e(14)) / 100;
  const parts = [...e(14).split("trois parties :")[1].matchAll(/\$(\d+)\$ cm/g)].map((m) => nb(m[1]));
  vrai("14. trois parties", parts.length === 3);
  parts.forEach((p) => dit(14, `$${p} \\times ${k} = ${t(p * k)}$ m`));
  const tot = parts.reduce((s, p) => s + p * k, 0);
  dit(14, `$${parts.map((p) => t(p * k)).join(" + ")} = ${t(tot)}$ m`);
  dit(14, `$${parts.join(" + ")} = ${parts.reduce((s, p) => s + p, 0)}$ cm`);
  dit(14, `Réponse : le sentier mesure $${t(tot)}$ m, soit $${t(tot / 1000)}$ km.`);
  const [, lignes] = dessin("table", 14);
  vrai("14. le tableau", lignes.every((l, i) => nb(l[1]) === parts[i] && nb(l[2]) === parts[i] * k));
});
essai("15", () => {
  const k = echelleEnonce(e(15)) / 100, reel = apres(e(15), "immeuble mesure");
  enonceDit(15, `il mesure $${t(reel * k)}$ cm`);
  dit(15, `$${t(reel * k)}$ cm, c'est $${t(reel * k / 100)}$ m`);
  dit(15, `$${reel} \\times ${k} = ${t(reel * k)}$`);
  dit(15, `$${reel} \\div ${k} = ${reel / k}$ cm`);
  dit(15, `Réponse : l'immeuble mesure $${reel / k}$ cm sur le plan.`);
});
essai("16", () => {
  const long = apres(e(16), "handball mesure"), larg = apres(e(16), "de long et"), cm = apres(e(16), "longueur mesure");
  const k = long / cm;
  dit(16, `$${long} \\div ${cm} = ${k}$ m`);
  dit(16, `$${larg} \\div ${k} = ${larg / k}$ cm`);
  dit(16, `Réponse : $1$ cm représente $${k}$ m ; la largeur mesure $${larg / k}$ cm.`);
  const [, ech, [fo]] = dessin("piece", 16);
  vrai("16. le plan", echelle(ech) === k * 100 && fo.l === cm && fo.h === larg / k);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const k = echelleEnonce(e(17)) / 100;
  const a = apres(e(17), "vieux chêne :"), b = apres(e(17), "au puits :"), tr = apres(e(17), "trésor est à");
  dit(17, `$${a} \\times ${k} = ${a * k}$ m`);
  dit(17, `$${b} \\times ${k} = ${b * k}$ m`);
  dit(17, `$${a * k} + ${b * k} = ${(a + b) * k}$ m`);
  dit(17, `$${tr} \\div ${k} = ${tr / k}$ cm`);
  const tot = (a + b) * k + tr;
  dit(17, `$${(a + b) * k} + ${tr} = ${tot}$ m`);
  dit(17, `$${a} + ${b} + ${tr / k} = ${tot / k}$ cm`);
  dit(17, `Réponse : $${a * k}$ m et $${b * k}$ m ; $${(a + b) * k}$ m ; $${tr / k}$ cm ; $${tot}$ m, soit $${tot / k}$ cm.`);
  const [, ech, traits] = dessin("plan", 17);
  vrai("17. le plan", echelle(ech) === k * 100 && JSON.stringify(traits.map((x) => x.cm)) === JSON.stringify([a, b, tr / k]));
});
essai("18", () => {
  const n = 100, m = apres(e(18), "La maquette mesure"), ailes = apres(e(18), "avion mesurent"), table = apres(e(18), "une table de");
  enonceDit(18, "l'échelle $\\dfrac{1}{100}$");
  dit(18, `$${m} \\times ${n} = ${t(m * n)}$ cm`);
  dit(18, `$${t(m * n)}$ cm $= ${m * n / 100}$ m`);
  dit(18, `$${ailes}$ m $= ${t(ailes * 100)}$ cm`);
  dit(18, `$${t(ailes * 100)} \\div ${n} = ${ailes * 100 / n}$ cm`);
  vrai("18. elle tient", m < table && ailes * 100 / n < table);
  dit(18, `Réponse : $${m * n / 100}$ m ; $${ailes * 100 / n}$ cm ; oui, elle tient.`);
  const [, haut, bas] = dessin("tableauCoef", 18);
  vrai("18. le schéma", nb(haut[1]) === m && nb(bas[2]) === ailes * 100);
});
essai("19", () => {
  const k = echelleEnonce(e(19)) / 100, l = apres(e(19), "rectangle de"), h = apres(e(19), "cm sur"), prix = apres(e(19), "grillage coûte");
  const [L1, H1] = [l * k, h * k], P = 2 * (L1 + H1);
  dit(19, `$${l} \\times ${k} = ${L1}$ m et $${h} \\times ${k} = ${H1}$ m`);
  dit(19, `$${L1} + ${H1} + ${L1} + ${H1} = ${P}$ m`);
  dit(19, `$${P} \\times ${prix} = ${P * prix}$ €`);
  dit(19, `$${l} + ${h} + ${l} + ${h} = ${2 * (l + h)}$ cm. Et $${2 * (l + h)} \\times ${k} = ${P}$ m`);
  dit(19, `Réponse : $${L1}$ m sur $${H1}$ m ; $${P}$ m ; $${P * prix}$ €.`);
  const [, ech, [fo]] = dessin("piece", 19, "figure");
  vrai("19. le plan de l'énoncé", echelle(ech) === k * 100 && fo.l === l && fo.h === h);
});
essai("20", () => {
  const rue = apres(e(20), "longue de"), feuille = apres(e(20), "Sa feuille mesure");
  const ech = [...e(20).matchAll(/\$1\$ cm pour \$(\d+)\$ m/g)].map((m) => nb(m[1]));
  vrai("20. trois échelles", ech.length === 3);
  ech.forEach((k) => dit(20, `$${rue} \\div ${k} = ${rue / k}$ cm`));
  const tiennent = ech.filter((k) => rue / k <= feuille);
  const choix = tiennent.reduce((a, b) => (rue / a > rue / b ? a : b));
  dit(20, `Réponse : ${ech.map((k) => `$${rue / k}$ cm`).join(", ").replace(/, ([^,]*)$/, " et $1")} ; l'échelle $1$ cm pour $${choix}$ m.`);
  const [, lignes] = dessin("table", 20);
  vrai("20. le tableau", lignes.every((l, i) => echelle(l[0]) === ech[i] * 100 && nb(l[1]) === rue / ech[i] && (l[2] === "oui") === rue / ech[i] <= feuille));
});

f.fin();
