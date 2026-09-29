// Recalcul indépendant de la feuille « Convertir les grandeurs » de 5e
// (29/09/2026) : lib/fiches-exercices/maths-5e-grandeur-conversion.tsx.
//
// ⭐ Les nombres sont relus dans l'ÉNONCÉ ou dans le DESSIN (conversion, bande,
// regle, tableau, table), jamais recopiés ici. Le script connaît seulement la
// valeur de chaque unité (1 km = 1 000 m…) et 1 h = 60 min : il convertit,
// compte les durées en minutes, puis cherche la réponse écrite dans le corrigé.
// Chaque TABLEAU DE CONVERSION est relu chiffre par chiffre : le nombre lu dans
// l'unité de départ et celui lu dans l'unité d'arrivée doivent désigner la même
// grandeur. Chaque BANDE et chaque RÈGLE : étiquettes dans le cadre, sans
// chevauchement (8,8 par signe en corps 14 gras).
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-5e-grandeur-conversion.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-5e-grandeur-conversion.tsx", "grandeur_conversion", ["conversion", "bande", "regle", "table"]);
const { e, c, vrai, dit, enonceDit, dessin, dessins, appels, essai } = f;

/** La valeur de chaque unité dans l'unité de base de sa grandeur (m, g, L). */
const U = {
  km: ["L", 1000], hm: ["L", 100], dam: ["L", 10], m: ["L", 1], dm: ["L", 0.1], cm: ["L", 0.01], mm: ["L", 0.001],
  t: ["M", 1e6], kg: ["M", 1000], hg: ["M", 100], dag: ["M", 10], g: ["M", 1], mg: ["M", 0.001],
  hL: ["C", 100], daL: ["C", 10], L: ["C", 1], dL: ["C", 0.1], cL: ["C", 0.01], mL: ["C", 0.001],
};
const r9 = (x) => Math.round(x * 1e9) / 1e9;
/** v unités `de` exprimées en `vers`. */
const conv = (v, de, vers) => {
  if (U[de][0] !== U[vers][0]) throw new Error(`${de} et ${vers} : pas la même grandeur`);
  return r9((v * U[de][1]) / U[vers][1]);
};
/** « 1\,050 », « 0{,}99 », « 1 200 », « 3,8 » → nombre. */
const nb = (s) => Number(String(s).replace(/\{,\}/g, ".").replace(/\\,/g, "").replace(/\s/g, "").replace(",", "."));
const L8 = (s) => s.length * 8.8;
/** Le nombre d'une étiquette de dessin : « 95 min » → 95, « 0,012 L » → 0.012. */
const nbTexte = (s) => nb(String(s).replace(/[^\d,\s]/g, "").trim());
/** Minutes → « 2$ h $28 » (à encadrer de $…$). */
const hm = (min) => `$${Math.floor(min / 60)}$ h $${min % 60}$ min`;
/** Horaire « $9$ h $47$ » → minutes depuis minuit. */
const horaire = (h, m) => 60 * h + m;
const ecritH = (min) => `$${Math.floor(min / 60)}$ h $${String(min % 60).padStart(2, "0")}$`;

/* ═════ Les dessins, chacun pour lui-même ═════ */
/** Le nombre qu'une ligne du tableau de conversion affiche dans l'unité `u`. */
const lire = (unites, cases, u) => {
  const i = unites.indexOf(u);
  const ent = cases.slice(0, i + 1).join("") || "0";
  const dec = cases.slice(i + 1).join("") || "0";
  return Number(`${ent}.${dec}`);
};
for (const { args } of appels("conversion").filter((a) => a.args)) {
  const [unites, lignes] = args;
  vrai(`conversion ${unites} : six colonnes au plus`, unites.length <= 6);
  const largeur = unites.reduce((s, u) => s + Math.max(u.length, 1) * 8.5 + 14, 0);
  vrai(`conversion ${unites} : tient dans 230 px (${Math.round(largeur)})`, largeur <= 230);
  for (const li of lignes) {
    vrai(`conversion ${unites} : une case par colonne, un chiffre par case`, li.cases.length === unites.length && li.cases.every((x) => /^\d?$/.test(x)));
    vrai(`conversion ${unites} : ${li.de} → ${li.vers} dans le tableau`, unites.includes(li.de) && unites.includes(li.vers));
    const a = lire(unites, li.cases, li.de), b = lire(unites, li.cases, li.vers);
    vrai(`conversion ${unites} : ${a} ${li.de} = ${b} ${li.vers}`, conv(a, li.de, li.vers) === b);
  }
}
for (const { args } of appels("bande").filter((a) => a.args)) {
  const [total, morceaux, bornes = []] = args;
  const somme = morceaux.reduce((s, m) => s + m.valeur, 0);
  const u = 276 / somme;
  vrai(`bande ${total} : le titre tient`, L8(`total : ${total}`) <= 290);
  vrai(`bande ${total} : une borne par frontière`, bornes.length === 0 || bornes.length === morceaux.length + 1);
  let x = 12, fin = -Infinity;
  for (const m of morceaux) {
    const w = m.valeur * u;
    if (L8(m.label) > w - 6) {
      const demi = L8(m.label) / 2;
      const cx = Math.min(Math.max(x + w / 2, 12 + demi), 288 - demi);
      vrai(`bande ${total} : « ${m.label} » (dessous) ne touche pas sa voisine`, cx - demi >= fin + 4);
      fin = cx + demi;
    }
    x += w;
  }
  let finB = -Infinity;
  bornes.forEach((b, i) => {
    if (!b) return;
    const xb = 12 + morceaux.slice(0, i).reduce((s, m) => s + m.valeur, 0) * u;
    const [g, d] = i === 0 ? [xb, xb + L8(b)] : i === morceaux.length ? [xb - L8(b), xb] : [xb - L8(b) / 2, xb + L8(b) / 2];
    vrai(`bande ${total} : l'horaire « ${b} » tient et ne touche pas son voisin`, g >= finB + 4 && g >= 0 && d <= 300);
    finB = d;
  });
}
for (const { args } of appels("regle").filter((a) => a.args)) {
  const [max, objets] = args;
  vrai(`règle de ${max} cm : onze nombres au plus`, max <= 10);
  for (const o of objets) vrai(`règle : ${o.label} sur la règle, au millimètre`, o.de >= 0 && o.a <= max && Number.isInteger(r9(o.a * 10)));
}

/* ═════ Les conversions « a) $4{,}2$ km en m » ═════ */
const lignesConv = (k) =>
  e(k)
    .split("\\n")
    .slice(1)
    .map((l) => /\$([^$]+)\$ (\w+) en (\w+)/.exec(l))
    .map((m) => ({ v: nb(m[1]), de: m[2], vers: m[3] }));
const geste = ({ v, de, vers }) => {
  const r = U[de][1] / U[vers][1];
  const res = conv(v, de, vers);
  return { res, calcul: r > 1 ? `$${t(v)} \\times ${t(Math.round(r))} = ${t(res)}$` : `$${t(v)} \\div ${t(Math.round(1 / r))} = ${t(res)}$` };
};
const conversionsSimples = (k) => {
  const L = lignesConv(k);
  vrai(`${k}. quatre conversions lues`, L.length === 4);
  const res = L.map((l) => {
    const g = geste(l);
    dit(k, g.calcul);
    return g.res;
  });
  dit(k, `Réponse : ${L.map((l, i) => `${"abcd"[i]}) $${t(res[i])}$ ${l.vers}`).join(" ; ")}.`);
  // Chaque ligne des tableaux de conversion reprend une conversion de l'énoncé.
  for (const { args } of dessins("conversion", k)) {
    const [unites, lignes] = args;
    for (const li of lignes) vrai(`${k}. la ligne ${li.de} → ${li.vers} du tableau est celle de l'énoncé`, L.some((l) => l.de === li.de && l.vers === li.vers && lire(unites, li.cases, li.de) === l.v));
  }
};

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => conversionsSimples(1));
essai("2", () => conversionsSimples(2));
essai("3", () => conversionsSimples(3));
essai("4", () => {
  const L = e(4).split("\\n").slice(1);
  const mins = L.map((l) => {
    if (/demi-heure/.test(l)) return 30;
    const h = nb(/\$(\d+)\$ h/.exec(l)[1]);
    const m = /h \$(\d+)\$ min/.exec(l);
    return 60 * h + (m ? nb(m[1]) : 0);
  });
  dit(4, `$3 \\times 60 = ${mins[0]}$ min`);
  dit(4, `$60 + 35 = ${mins[1]}$ min`);
  dit(4, `$2 \\times 60 = 120$, puis $120 + 5 = ${mins[2]}$ min`);
  dit(4, `$${mins[3]}$ min`);
  dit(4, `Réponse : ${mins.map((m, i) => `${"abcd"[i]}) $${m}$ min`).join(" ; ")}.`);
  const [total, morceaux] = dessin("bande", 4);
  vrai("4. la bande du b)", morceaux.reduce((s, m) => s + m.valeur, 0) === mins[1] && nbTexte(total) === mins[1]);
});
essai("5", () => {
  const L = [...e(5).matchAll(/\$(\d+)\$ min/g)].map((m) => nb(m[1]));
  vrai("5. trois durées", L.length === 3);
  const [a, b, cc] = L;
  dit(5, `$${a} = 60 + ${a - 60}$ : ${hm(a)}`);
  for (const n of [b, cc]) {
    const h = Math.floor(n / 60);
    dit(5, `$${h} \\times 60 = ${60 * h}$, et $${n} - ${60 * h} = ${n % 60}$ : ${hm(n)}`);
  }
  dit(5, `Réponse : a) ${hm(a)} ; b) ${hm(b)} ; c) ${hm(cc)}.`);
  const [total, morceaux] = dessin("bande", 5);
  vrai("5. la bande du c) : des heures pleines, puis le reste", morceaux.reduce((s, m) => s + m.valeur, 0) === cc && morceaux.filter((m) => m.valeur === 60).length === Math.floor(cc / 60) && morceaux.at(-1).valeur === cc % 60 && total === `${cc} min = ${Math.floor(cc / 60)} h ${cc % 60} min`);
});
essai("6", () => {
  const [max, objets] = dessin("regle", 6, "figure");
  const [cle, gomme] = objets.map((o) => r9(o.a - o.de));
  vrai("6. les objets partent du zéro", objets.every((o) => o.de === 0));
  const grad = (v) => Math.round((v - Math.floor(v)) * 10);
  dit(6, `La clé s'arrête $${grad(cle)}$ petites graduations après le $${Math.floor(cle)}$ : elle mesure $${t(cle)}$ cm`);
  dit(6, `La gomme s'arrête $${grad(gomme)}$ petites graduations après le $${Math.floor(gomme)}$ : $${t(gomme)}$ cm`);
  const [mc, mg] = [conv(cle, "cm", "mm"), conv(gomme, "cm", "mm")];
  dit(6, `$${t(cle)} \\times 10 = ${t(mc)}$ mm et $${t(gomme)} \\times 10 = ${t(mg)}$ mm`);
  dit(6, `$${t(mc)} - ${t(mg)} = ${t(mc - mg)}$ mm`);
  dit(6, `$${t(mc - mg)} \\div 10 = ${t(conv(mc - mg, "mm", "cm"))}$ cm`);
  dit(6, `$${t(cle)} - ${t(gomme)} = ${t(r9(cle - gomme))}$ cm`);
  dit(6, `Réponse : a) $${t(cle)}$ cm et $${t(gomme)}$ cm ; b) $${t(mc)}$ mm et $${t(mg)}$ mm ; c) $${t(mc - mg)}$ mm, soit $${t(conv(mc - mg, "mm", "cm"))}$ cm.`);
  vrai("6. la règle va au-delà de la clé", max > cle);
});
essai("7", () => {
  // Des ordres de grandeur, en unités de base : le script cherche l'UNIQUE unité plausible.
  // (L : longueur en m ; C : contenance en L ; M : masse en g)
  const plausible = [
    ["crayon", "L", [0.1, 0.3]],
    ["baignoire", "C", [100, 400]],
    ["fourmi", "M", [0.0005, 0.05]],
    ["marathon", "L", [30000, 60000]],
    ["cuillère", "C", [0.002, 0.02]],
  ];
  const offertes = /parmi : ([^.]+)\./.exec(e(7))[1].split(", ");
  const lignes = e(7).split("\\n").slice(1);
  const rep = plausible.map(([mot, grandeur, [lo, hi]], i) => {
    vrai(`7. la ligne ${i + 1} parle de ${mot}`, lignes[i].includes(mot));
    const v = nb(/\$(\d+)\$/.exec(lignes[i])[1]);
    const ok = offertes.filter((u) => U[u][0] === grandeur && v * U[u][1] >= lo && v * U[u][1] <= hi);
    vrai(`7. ${mot} : une seule unité plausible (${ok})`, ok.length === 1);
    return ok[0];
  });
  dit(7, `Réponse : ${rep.map((u, i) => `${"abcde"[i]}) ${u}`).join(" ; ")}.`);
});
essai("8", () => {
  const L = e(8).split("\\n").slice(1).map((l) => {
    const m = /\$([^$]+)\$ (\w+) \$= ([^$]+)\$ (\w+)/.exec(l);
    return { v: nb(m[1]), de: m[2], w: nb(m[3]), vers: m[4] };
  });
  const juste = L.map((l) => (l.de === "h" ? l.v * 60 : conv(l.v, l.de, l.vers)));
  const vraie = L.map((l, i) => juste[i] === l.w);
  vrai("8. deux vraies, deux fausses", vraie.filter(Boolean).length === 2);
  dit(8, `Réponse : ${L.map((l, i) => `${"abcd"[i]}) ${vraie[i] ? "vrai" : `faux, $${t(juste[i])}$ ${l.vers}`}`).join(" ; ")}.`);
  L.forEach((l, i) => !vraie[i] && dit(8, `La bonne égalité : $${t(l.v)}$ ${l.de} $= ${t(juste[i])}$ ${l.vers}.`));
  const [unites, [li]] = dessin("conversion", 8);
  vrai("8. le tableau montre le a)", lire(unites, li.cases, li.de) === L[0].v && lire(unites, li.cases, li.vers) === juste[0]);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const masses = [...e(9).split("\\n")[0].matchAll(/\$([^$]+)\$ (kg|g)/g)].map((m) => ({ ecrit: m[1], u: m[2], g: conv(nb(m[1]), m[2], "g") }));
  vrai("9. quatre masses", masses.length === 4);
  const r = [...masses].sort((a, b) => a.g - b.g);
  dit(9, `$${r.map((m) => t(m.g)).join(" < ")}$`);
  dit(9, `Réponse : a) ${r.map((m) => `$${m.ecrit}$ ${m.u}`).join(" $<$ ").replace(/\$ \$<\$ \$/g, " < ")} ; b) $${t(r[3].g - r[0].g)}$ g.`.replace(/\$ (kg|g) \$<\$ \$/g, "$ $1 $< "));
  dit(9, `$${t(r[3].g)} - ${t(r[0].g)} = ${t(r[3].g - r[0].g)}$ g`);
  const [ent, lig] = dessin("tableau", 9);
  vrai("9. le tableau : chaque masse et sa valeur en g", masses.every((m, i) => ent[i + 1] === `${m.ecrit.replace("{,}", ",").replace("\\,", " ")} ${m.u}` && nb(lig[i + 1]) === m.g));
});
essai("10", () => {
  const avant = e(10).split("\\na)")[0];
  const obj = [...avant.matchAll(/\$([^$]+)\$ (kg|g)/g)].map((m) => conv(nb(m[1]), m[2], "g"));
  vrai("10. cinq masses lues", obj.length === 5);
  const tot = obj.reduce((s, x) => s + x, 0);
  dit(10, `$${obj.map(t).join(" + ")} = ${t(tot)}$ g`);
  dit(10, `$${t(tot)} \\div 1\\,000 = ${t(tot / 1000)}$ kg`);
  const max = apres(e(10), "un sac de");
  vrai("10. sous la limite", tot / 1000 <= max);
  dit(10, `$${t(tot / 1000)} < ${max}$ : le sac respecte le conseil, avec $${t(max * 1000 - tot)}$ g de marge`);
  const [, lignes] = dessin("table", 10);
  vrai("10. le tableau", JSON.stringify(lignes.map((l) => nb(l[1]))) === JSON.stringify([...obj, tot]));
});
function apres(texte, morceau) {
  const i = texte.indexOf(morceau);
  if (i < 0) throw new Error(`« ${morceau} » introuvable`);
  return nb(/\$([^$]+)\$/.exec(texte.slice(i + morceau.length))[1]);
}
essai("11", () => {
  const p = conv(apres(e(11), "une planche de"), "m", "cm"), n = apres(e(11), "coupe"), m = apres(e(11), "morceaux de");
  const reste = p - n * m;
  dit(11, `$${t(apres(e(11), "une planche de"))}$ m $= ${t(p)}$ cm`);
  dit(11, `$${n} \\times ${m} = ${n * m}$ cm`);
  dit(11, `Il reste $${t(p)} - ${n * m} = ${t(reste)}$ cm, soit $${t(conv(reste, "cm", "m"))}$ m`);
  vrai("11. pas de quatrième morceau", reste < m);
  const [total, morceaux] = dessin("bande", 11);
  vrai("11. la bande : la planche, les morceaux, le reste", morceaux.reduce((s, x) => s + x.valeur, 0) === p && morceaux.filter((x) => x.valeur === m).length === n && morceaux.at(-1).valeur === reste && total.endsWith(`${p} cm`));
});
/** Les horaires « $9$ h $47$ » d'un texte, en minutes depuis minuit. */
const horaires = (texte) => [...texte.matchAll(/\$(\d+)\$ h \$(\d+)\$(?! min)/g)].map((m) => horaire(nb(m[1]), nb(m[2])));
/** Les étapes d'un trajet de a à b : jusqu'à l'heure pile, les heures, le reste. */
const etapes = (a, b) => {
  const pile = Math.ceil(a / 60) * 60, dernier = Math.floor(b / 60) * 60;
  return [pile - a, dernier - pile, b - dernier];
};
essai("12", () => {
  const [a, b] = horaires(e(12));
  const [x, y, z] = etapes(a, b);
  dit(12, `De ${ecritH(a)} à $${Math.ceil(a / 60)}$ h : $${x}$ min.`);
  dit(12, `De $${Math.ceil(a / 60)}$ h à $${b / 60 | 0}$ h : $${y / 60}$ h.`);
  dit(12, `De $${b / 60 | 0}$ h à ${ecritH(b)} : $${z}$ min.`);
  dit(12, `En tout : $${y / 60}$ h et $${x} + ${z} = ${x + z}$ min, soit ${hm(b - a)}.`);
  dit(12, `$${Math.floor((b - a) / 60)} \\times 60 = ${60 * Math.floor((b - a) / 60)}$, puis $${60 * Math.floor((b - a) / 60)} + ${(b - a) % 60} = ${b - a}$ min`);
  dit(12, `Réponse : a) ${hm(b - a)} ; b) $${b - a}$ min.`);
  const [total, morceaux, bornes] = dessin("bande", 12);
  vrai("12. la bande : les trois étapes et les deux horaires", JSON.stringify(morceaux.map((m) => m.valeur)) === JSON.stringify([x, y, z]) && total === `${Math.floor((b - a) / 60)} h ${(b - a) % 60} min` && bornes[0] === `${a / 60 | 0} h ${a % 60}` && bornes.at(-1) === `${b / 60 | 0} h ${b % 60}`);
});
essai("13", () => {
  const temps = [...e(13).matchAll(/\$(\d+)\$ min \$(\d+)\$ s/g)].map((m) => [nb(m[1]), nb(m[2])]);
  vrai("13. quatre temps", temps.length === 4);
  const mn = temps.reduce((s, x) => s + x[0], 0), sec = temps.reduce((s, x) => s + x[1], 0);
  dit(13, `Minutes : $${temps.map((x) => x[0]).join(" + ")} = ${mn}$ min. Secondes : $${temps.map((x) => x[1]).join(" + ")} = ${sec}$ s.`);
  dit(13, `$${sec} = ${Math.floor(sec / 60)} \\times 60 + ${sec % 60}$`);
  const tot = 60 * mn + sec;
  dit(13, `$${Math.floor(tot / 60)} \\times 60 = ${60 * Math.floor(tot / 60)}$, puis $${60 * Math.floor(tot / 60)} + ${tot % 60} = ${tot}$ s`);
  dit(13, `$${temps.map((x) => 60 * x[0] + x[1]).join(" + ")} = ${tot}$ s`);
  dit(13, `Réponse : a) $${Math.floor(tot / 60)}$ min $${tot % 60}$ s ; b) $${tot}$ s.`);
  const [, lignes] = dessin("table", 13);
  vrai("13. le tableau", lignes.slice(0, 4).every((l, i) => nb(l[2]) === 60 * temps[i][0] + temps[i][1]) && nb(lignes[4][2]) === tot);
});
essai("14", () => {
  const L = e(14).split("\\n").slice(1).map((l) => {
    const d = /\$([^$]+)\$ h \$([^$]+)\$ min \$= ([^$]+)\$ min/.exec(l);
    if (d) return { src: `$${d[1]}$ h $${d[2]}$ min`, juste: 60 * nb(d[1]) + nb(d[2]), ecrit: nb(d[3]), vers: "min" };
    const m = /\$([^$]+)\$ (\w+) \$= ([^$]+)\$ (\w+)/.exec(l);
    return { src: `$${m[1]}$ ${m[2]}`, juste: conv(nb(m[1]), m[2], m[4]), ecrit: nb(m[3]), vers: m[4] };
  });
  vrai("14. quatre égalités, toutes fausses", L.length === 4 && L.every((l) => l.juste !== l.ecrit));
  L.forEach((l) => dit(14, `${l.src} $= ${t(l.juste)}$ ${l.vers}`));
  dit(14, `Réponse : ${L.map((l, i) => `${"abcd"[i]}) $${t(l.juste)}$ ${l.vers}`).join(" ; ")}.`);
  const [, lignes] = dessin("table", 14);
  vrai("14. le tableau", lignes.every((r, i) => nbTexte(r[1]) === L[i].juste && r[1].endsWith(L[i].vers)));
});
essai("15", () => {
  const V = apres(e(15), "un aquarium de"), carafe = apres(e(15), "une carafe de"), verre = apres(e(15), "un verre de"), bout = apres(e(15), "une bouteille de");
  const [cl, ml] = [conv(V, "L", "cL"), conv(V, "L", "mL")];
  dit(15, `$${V} \\div ${t(carafe)} = ${t(V / carafe)}$ carafes`);
  dit(15, `$${V}$ L $= ${t(cl)}$ cL, et $${t(cl)} \\div ${verre} = ${t(cl / verre)}$ verres`);
  dit(15, `$${V}$ L $= ${t(ml)}$ mL, et $${t(ml)} \\div ${bout} = ${t(ml / bout)}$ bouteilles`);
  vrai("15. la bouteille est la moitié de la carafe", conv(bout, "mL", "L") * 2 === carafe);
  dit(15, `$2 \\times ${t(V / carafe)} = ${t(ml / bout)}$`);
  dit(15, `Réponse : a) $${t(V / carafe)}$ carafes ; b) $${t(cl / verre)}$ verres ; c) $${t(ml / bout)}$ bouteilles.`);
  const [unites, lignes] = dessin("conversion", 15);
  vrai("15. le tableau : 54 L en cL, puis en mL", lire(unites, lignes[0].cases, "L") === V && lire(unites, lignes[0].cases, "cL") === cl && lire(unites, lignes[1].cases, "mL") === ml);
});
essai("16", () => {
  const g = apres(e(16), "gouttes de");
  const parML = Math.round(1 / g);
  dit(16, `$1 \\div ${t(g)} = ${parML}$`);
  dit(16, `$${t(conv(1, "cL", "mL"))} \\times ${parML} = ${t(10 * parML)}$ gouttes`);
  dit(16, `$${t(conv(1, "L", "mL"))} \\times ${parML} = ${t(1000 * parML)}$ gouttes`);
  enonceDit(16, `c'est à peu près $${parML}$ gouttes`);
  dit(16, `Réponse : a) $${parML}$ ; b) $${10 * parML}$ ; c) $${t(1000 * parML)}$ gouttes ; d) Hugo a tort, $${parML}$ gouttes font $1$ mL.`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const dist = [...e(17).split("\\n")[0].matchAll(/\$([^$]+)\$ (km|m)/g)].map((m) => conv(nb(m[1]), m[2], "km"));
  vrai("17. trois étapes", dist.length === 3);
  const D = r9(dist.reduce((s, x) => s + x, 0));
  dit(17, `$8\\,400$ m $= ${t(dist[1])}$ km`);
  dit(17, `$${dist.map(t).join(" + ")} = ${t(D)}$ km`);
  const [a, b] = horaires(e(17).split("\\n")[0]);
  const [x, y, z] = etapes(a, b);
  dit(17, `De ${ecritH(a)} à $${Math.ceil(a / 60)}$ h : $${x}$ min. De $${Math.ceil(a / 60)}$ h à $${b / 60 | 0}$ h : $${y / 60}$ h. De $${b / 60 | 0}$ h à ${ecritH(b)} : $${z}$ min.`);
  dit(17, `soit ${hm(b - a)}. En minutes : $${Math.floor((b - a) / 60)} \\times 60 + ${(b - a) % 60} = ${b - a}$ min.`);
  const nR = apres(e(17), "chacun des"), nG = apres(e(17), "elle boit"), vG = apres(e(17), "gobelets de");
  const cl = nR * nG * vG;
  dit(17, `$${nR} \\times ${nG} = ${nR * nG}$ gobelets, et $${nR * nG} \\times ${vG} = ${cl}$ cL`);
  dit(17, `$${cl}$ cL $= ${t(conv(cl, "cL", "L"))}$ L`);
  const montre = apres(e(17), "sa montre affiche « ");
  vrai("17. la montre compte en mètres", conv(D, "km", "m") === montre);
  dit(17, `$${t(D)}$ km $= ${t(montre)}$ m`);
  dit(17, `Réponse : a) $${t(D)}$ km ; b) ${hm(b - a)}, soit $${b - a}$ min ; c) $${t(conv(cl, "cL", "L"))}$ L ; d) des mètres, c'est cohérent.`);
  const [total, morceaux] = dessin("bande", 17);
  vrai("17. la bande", JSON.stringify(morceaux.map((m) => m.valeur)) === JSON.stringify([x, y, z]) && total === `${Math.floor((b - a) / 60)} h ${(b - a) % 60} min`);
});
essai("18", () => {
  const eau = apres(e(18), "personnes :"), jus = apres(e(18), "L d'eau,"), sucre = apres(e(18), "cL de jus de citron et");
  const tot = conv(eau, "L", "cL") + jus;
  dit(18, `$${eau}$ L $= ${t(conv(eau, "L", "cL"))}$ cL. Puis $${t(conv(eau, "L", "cL"))} + ${jus} = ${t(tot)}$ cL, soit $${t(conv(tot, "cL", "L"))}$ L`);
  const verre = apres(e(18), "des verres de");
  dit(18, `$${t(tot)} \\div ${verre} = ${t(tot / verre)}$`);
  vrai("18. un nombre entier de verres", Number.isInteger(tot / verre));
  const k = apres(e(18), "il faut"), s2 = r9(sucre * k), paquets = Math.ceil(conv(s2, "g", "kg"));
  dit(18, `$${sucre} \\times ${t(k)} = ${t(s2)}$ g, soit $${t(conv(s2, "g", "kg"))}$ kg`);
  dit(18, `il faut acheter $${paquets}$ paquets`);
  enonceDit(18, `« $${t(conv(tot, "cL", "L"))}$ L, c'est $${t(conv(tot, "cL", "L") * 10)}$ cL »`);
  dit(18, `$${t(conv(tot, "cL", "L"))} \\times 100 = ${t(tot)}$ cL`);
  dit(18, `Réponse : a) $${t(tot)}$ cL, soit $${t(conv(tot, "cL", "L"))}$ L ; b) $${t(tot / verre)}$ verres ; c) $${paquets}$ paquets ; d) $${t(conv(tot, "cL", "L"))}$ L $= ${t(tot)}$ cL.`);
  const [, lignes] = dessin("table", 18);
  vrai("18. le tableau", nb(lignes[0][1]) === conv(eau, "L", "cL") && nb(lignes[1][1]) === jus && nb(lignes[2][1]) === tot);
});
essai("19", () => {
  const [depart] = horaires(e(19));
  const durees = [...e(19).split("\\na)")[0].matchAll(/(?:\$(\d+)\$ h )?\$(\d+)\$ min/g)].map((m) => 60 * (m[1] ? nb(m[1]) : 0) + nb(m[2]));
  vrai(`19. quatre durées (${durees})`, durees.length === 4);
  const t1 = depart + durees[0], t2 = t1 + durees[1], t3 = t2 + durees[2], t4 = t3 + durees[3];
  dit(19, `la visite commence à ${ecritH(t1)}`);
  dit(19, `la visite finit à ${ecritH(t2)}`);
  const [d3, h3, m3] = [durees[3], Math.floor(t3 / 60), t3 % 60];
  dit(19, `$= ${h3}$ h $${m3}$. Retour : $${h3}$ h $${m3} + ${Math.floor(d3 / 60)}$ h $${d3 % 60} = ${Math.floor(t4 / 60)}$ h $${t4 % 60}$.`);
  dit(19, `$${Math.floor(t2 / 60)}$ h $${t2 % 60} + ${durees[2]}$ min $= ${Math.floor(t2 / 60)}$ h $${(t2 % 60) + durees[2]}$ min`);
  const tot = durees.reduce((s, x) => s + x, 0);
  vrai("19. la durée totale colle aux horaires", t4 - depart === tot);
  dit(19, `$${durees.join(" + ")} = ${tot}$ min, et $${tot} = ${Math.floor(tot / 60)} \\times 60 + ${tot % 60}$ : ${hm(tot)}`);
  const attente = horaires(e(19).split("\\nd)")[1])[0];
  dit(19, `la classe arrive $${attente - t4}$ min en avance`);
  dit(19, `Réponse : a) de ${ecritH(t1)} à ${ecritH(t2)} ; b) ${ecritH(t4)} ; c) ${hm(tot)}, soit $${tot}$ min ; d) oui, $${attente - t4}$ min en avance.`);
  const [total, morceaux, bornes] = dessin("bande", 19);
  vrai("19. la bande", JSON.stringify(morceaux.map((m) => m.valeur)) === JSON.stringify(durees) && total === `${Math.floor(tot / 60)} h ${tot % 60} min` && bornes[0] === `${depart / 60 | 0} h ${depart % 60}` && bornes.at(-1) === `${t4 / 60 | 0} h ${t4 % 60}`);
});
essai("20", () => {
  const jour = apres(e(20), "Léa boit"), b = apres(e(20), "des bouteilles de"), an = apres(e(20), "un an de"), g = apres(e(20), "vide pèse"), gourde = apres(e(20), "une gourde de");
  const cl = conv(jour, "L", "cL"), parJour = cl / b, parAn = parJour * an, plastique = parAn * g;
  dit(20, `$${t(jour)}$ L $= ${t(cl)}$ cL. Puis $${t(cl)} \\div ${b} = ${parJour}$ bouteilles par jour`);
  dit(20, `$${parJour} \\times ${an} = ${t(parAn)}$ bouteilles`);
  dit(20, `$${t(parAn)} \\times ${g} = ${t(plastique)}$ g. En kg : $${t(plastique)} \\div 1\\,000 = ${t(conv(plastique, "g", "kg"))}$ kg`);
  const ml = conv(jour, "L", "mL");
  dit(20, `$${t(jour)}$ L $= ${t(ml)}$ mL, et $${t(ml)} \\div ${gourde} = ${t(ml / gourde)}$`);
  dit(20, `Réponse : a) $${parJour}$ par jour, $${t(parAn)}$ par an ; b) $${t(conv(plastique, "g", "kg"))}$ kg ; c) $${t(ml / gourde)}$ fois ; d) non, c'est environ $13$ kg.`);
  vrai("20. environ 13 kg", Math.round(conv(plastique, "g", "kg")) === 13);
  const [, lignes] = dessin("table", 20);
  vrai("20. le tableau en mL", nb(lignes[0][1]) === ml && nb(lignes[1][1]) === conv(b, "cL", "mL") && nb(lignes[2][1]) === gourde);
});

f.fin();
