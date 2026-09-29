// Recalcul indépendant de la feuille « Les longueurs » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-aire-longueur.tsx.
//
// ⭐ Les nombres sont relus dans l'ÉNONCÉ ou dans le DESSIN, jamais recopiés ici.
// Le script connaît seulement la valeur de chaque unité (1 km = 1 000 m…) : il
// convertit, calcule, puis cherche la réponse écrite dans le corrigé.
// Chaque TABLEAU DE CONVERSION est relu chiffre par chiffre ; chaque BANDE et
// chaque RÈGLE : étiquettes dans le cadre, sans chevauchement ; le PLAN du trajet
// à vélo : chaque cote mesurée à l'échelle, étiquettes qui ne se touchent pas.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-aire-longueur.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-aire-longueur.tsx", "aire_longueur", ["conversion", "bande", "regle", "table", "plan", "guirlande"], "6e");
const { e, c, vrai, verif, dit, enonceDit, dessin, dessins, appels, essai } = f;

/** La valeur de chaque unité de longueur, en m. */
const U = { km: 1000, hm: 100, dam: 10, m: 1, dm: 0.1, cm: 0.01, mm: 0.001 };
const r9 = (x) => Math.round(x * 1e9) / 1e9;
const conv = (v, de, vers) => r9((v * U[de]) / U[vers]);
/** « 1\,050 », « 0{,}99 », « 1 200 », « 3,8 » → nombre. */
const nb = (s) => Number(String(s).replace(/\{,\}/g, ".").replace(/\\,/g, "").replace(/\s/g, "").replace(",", "."));
const L8 = (s) => s.length * 8.8;
/** « 1 km 50 m », « 1,2 km », « 850 m » → la longueur en m. */
const enM = (s) => r9([...String(s).matchAll(/(\d+(?:[,.]\d+)?)\s*(km|dm|cm|mm|m)\b/g)].reduce((a, m) => a + nb(m[1]) * U[m[2]], 0));
/** Les longueurs « $x$ unité » (et « $1$ km $200$ m ») d'un texte, en m. */
const longueurs = (texte) => [...texte.matchAll(/\$([^$]+)\$ (km|dm|cm|mm|m)(?: \$([^$]+)\$ (cm|mm|m)\b)?/g)].map((m) => r9(nb(m[1]) * U[m[2]] + (m[3] ? nb(m[3]) * U[m[4]] : 0)));

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
  vrai(`conversion ${unites} : quatre colonnes au plus`, unites.length <= 4);
  for (const li of lignes) {
    vrai(`conversion ${unites} : une case par colonne, un chiffre par case`, li.cases.length === unites.length && li.cases.every((x) => /^\d?$/.test(x)));
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
  vrai(`bande ${total} : le total est la somme des morceaux (${somme})`, total.split("=").map((p) => nb(p.replace(/[^\d,\s]/g, "").trim())).includes(r9(somme)));
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
    vrai(`bande ${total} : le repère « ${b} » tient et ne touche pas son voisin`, g >= finB + 4 && g >= 0 && d <= 300);
    finB = d;
  });
}
for (const { args } of appels("regle").filter((a) => a.args)) {
  const [max, objets] = args;
  vrai(`règle de ${max} cm : onze nombres au plus`, max <= 10);
  for (const o of objets) vrai(`règle : ${o.label} sur la règle, au millimètre`, o.de >= 0 && o.a <= max && Number.isInteger(r9(o.a * 10)) && Number.isInteger(r9(o.de * 10)));
}
for (const { args } of appels("guirlande").filter((a) => a.args)) {
  const [n, fanion, espace] = args;
  const w = (fanion * 276) / (n * fanion + (n - 1) * espace);
  vrai("guirlande : « 15 cm » tient sous son fanion", L8(`${fanion} cm`) <= w + 20);
}

/* Le plan : même calcul que `plan()` dans la feuille (échelle, centre, étiquettes). */
function rendu(formes) {
  const geo = [];
  for (const x of formes) geo.push(...(x.trait ?? x.cote ?? [x.point]));
  const xs = geo.map((p) => p[0]), ys = geo.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min(170 / (x1 - x0 || 1), 160 / (y1 - y0 || 1));
  const P = ([x, y]) => [+((x - x0) * s).toFixed(1), +((y1 - y) * s).toFixed(1)];
  const C = [((x1 - x0) * s) / 2, ((y1 - y0) * s) / 2];
  const et = [];
  const ancre = (nx) => (nx > 0.35 ? "start" : nx < -0.35 ? "end" : "middle");
  const poser = (M, n, t) => {
    const a = ancre(n[0]);
    const d = a === "middle" ? 14 : 8;
    et.push({ x: M[0] + n[0] * d, y: M[1] + n[1] * d, t, a });
  };
  for (const x of formes) {
    if (x.cote) {
      const [a, b] = x.cote.map(P);
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const M = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      let n = [-(b[1] - a[1]) / L, (b[0] - a[0]) / L];
      if (n[0] * (M[0] - C[0]) + n[1] * (M[1] - C[1]) < 0) n = [-n[0], -n[1]];
      if (x.sens === -1) n = [-n[0], -n[1]];
      poser(M, n, x.label);
    } else if (x.point) {
      const p = P(x.point);
      const L = Math.hypot(p[0] - C[0], p[1] - C[1]);
      poser(p, L < 1 ? [0, -1] : [(p[0] - C[0]) / L, (p[1] - C[1]) / L], x.label);
    }
  }
  const boites = et.map((q) => {
    const L = q.t.length * 14 * 0.56;
    const g = q.a === "start" ? q.x : q.a === "end" ? q.x - L : q.x - L / 2;
    return { t: q.t, g, d: g + L, y: q.y };
  });
  let [bx0, bx1] = [0, (x1 - x0) * s];
  for (const b of boites) [bx0, bx1] = [Math.min(bx0, b.g), Math.max(bx1, b.d)];
  return { largeur: bx1 - bx0 + 12, boites };
}
for (const a of appels("plan").filter((a) => a.args)) {
  const [, formes] = a.args;
  for (const x of formes.filter((x) => x.cote)) verif(`plan : cote « ${x.label} » mesurée sur le dessin`, Math.hypot(x.cote[1][0] - x.cote[0][0], x.cote[1][1] - x.cote[0][1]), enM(x.label), 1e-5);
  const r = rendu(formes);
  vrai(`plan : viewBox de ${Math.round(r.largeur)} de large, 300 au plus`, r.largeur <= 300);
  for (let i = 0; i < r.boites.length; i++)
    for (let j = i + 1; j < r.boites.length; j++) {
      const [b1, b2] = [r.boites[i], r.boites[j]];
      vrai(`plan : « ${b1.t} » et « ${b2.t} » ne se touchent pas`, !(Math.min(b1.d, b2.d) - Math.max(b1.g, b2.g) > 0 && Math.abs(b1.y - b2.y) < 18));
    }
}

/* ═════ Les conversions « a) $6$ m en cm » ═════ */
const lignesConv = (k) =>
  e(k)
    .split("\\n")
    .slice(1)
    .map((l) => /\$([^$]+)\$ (\w+) en (\w+)/.exec(l))
    .map((m) => ({ v: nb(m[1]), de: m[2], vers: m[3] }));
const geste = ({ v, de, vers }) => {
  const r = U[de] / U[vers];
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
  for (const { args } of dessins("conversion", k)) {
    const [unites, lignes] = args;
    for (const li of lignes) vrai(`${k}. la ligne ${li.de} → ${li.vers} du tableau est celle de l'énoncé`, L.some((l) => l.de === li.de && l.vers === li.vers && lire(unites, li.cases, li.de) === l.v));
  }
};

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
const lecture = (v) => [Math.floor(v + 1e-9), Math.round((v - Math.floor(v + 1e-9)) * 10)];
essai("1", () => {
  const [, objets] = dessin("regle", 1, "figure");
  vrai("1. les objets partent du zéro", objets.every((o) => o.de === 0));
  const [p, tr] = objets.map((o) => r9(o.a - o.de));
  const [pe, pt] = lecture(p), [te, tt] = lecture(tr);
  dit(1, `La plume s'arrête $${pt}$ petits traits après le $${pe}$ : elle mesure $${t(p)}$ cm.`);
  dit(1, `Le trombone s'arrête $${tt}$ petits traits après le $${te}$ : il mesure $${t(tr)}$ cm.`);
  dit(1, `$${t(p)} \\times 10 = ${t(conv(p, "cm", "mm"))}$ mm et $${t(tr)} \\times 10 = ${t(conv(tr, "cm", "mm"))}$ mm`);
  dit(1, `Réponse : a) $${t(p)}$ cm et $${t(tr)}$ cm ; b) $${t(conv(p, "cm", "mm"))}$ mm et $${t(conv(tr, "cm", "mm"))}$ mm.`);
});
essai("2", () => {
  const [, [o]] = dessin("regle", 2, "figure");
  const L = r9(o.a - o.de);
  const [be, bt] = lecture(o.a);
  dit(2, `La chenille commence au $${t(o.de)}$.`);
  dit(2, `Elle finit $${bt}$ petits traits après le $${be}$, donc à $${t(o.a)}$.`);
  dit(2, `$${t(o.a)} - ${t(o.de)} = ${t(L)}$ cm.`);
  dit(2, `$${t(L)} \\times 10 = ${t(conv(L, "cm", "mm"))}$ mm`);
  dit(2, `et répondre $${t(o.a)}$ cm`);
  dit(2, `Réponse : la chenille mesure $${t(L)}$ cm, soit $${t(conv(L, "cm", "mm"))}$ mm.`);
});
essai("3", () => {
  const L = e(3).split("\\n").slice(1).map((l) => /\$1\$ (\w+) = … (\w+)/.exec(l)).map((m) => conv(1, m[1], m[2]));
  vrai("3. cinq relations", L.length === 5);
  dit(3, `Réponse : ${L.map((v, i) => `${"abcde"[i]}) $${t(v)}$`).join(" ; ")}.`);
  dit(3, `écrire $10$ cm. $10$ cm, c'est seulement $1$ dm`);
  vrai("3. le piège : 10 cm = 1 dm", conv(10, "cm", "dm") === 1);
});
essai("4", () => conversionsSimples(4));
essai("5", () => conversionsSimples(5));
essai("6", () => {
  const avant = e(6).split("\\n")[0];
  const L = [...avant.matchAll(/\$([^$]+)\$ (cm|m)/g)].map((m) => ({ ecrit: `$${m[1]}$ ${m[2]}`, cm: conv(nb(m[1]), m[2], "cm") }));
  vrai("6. quatre rubans", L.length === 4);
  const r = [...L].sort((a, b) => a.cm - b.cm);
  dit(6, `$${r.map((x) => t(x.cm)).join(" < ")}$`);
  dit(6, `Réponse : ${r.map((x) => x.ecrit).join(", puis ")}.`);
  const [ent, lig] = dessin("tableau", 6);
  vrai("6. le tableau : chaque ruban et sa valeur en cm", L.every((x, i) => nb(lig[i + 1]) === x.cm && ent[i + 1] === x.ecrit.replace(/\$/g, "").replace("{,}", ",")));
});
essai("7", () => {
  // Des ordres de grandeur, en m : le script cherche l'UNIQUE unité plausible.
  const plausible = [
    ["terrain", [50, 150]],
    ["téléphone", [0.004, 0.015]],
    ["villes", [5000, 60000]],
    ["baguette", [0.4, 0.9]],
    ["girafe", [3, 7]],
  ];
  const offertes = /unité : ([^.]+)\./.exec(e(7))[1].replace(" ou ", ", ").split(", ");
  const lignes = e(7).split("\\n").slice(1);
  const rep = plausible.map(([mot, [lo, hi]], i) => {
    vrai(`7. la ligne ${i + 1} parle de ${mot}`, lignes[i].includes(mot));
    const v = nb(/\$(\d+)\$/.exec(lignes[i])[1]);
    const ok = offertes.filter((u) => v * U[u] >= lo && v * U[u] <= hi);
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
  const juste = L.map((l) => conv(l.v, l.de, l.vers));
  const vraie = L.map((l, i) => juste[i] === l.w);
  vrai("8. deux vraies, deux fausses", vraie.filter(Boolean).length === 2);
  dit(8, `Réponse : ${L.map((l, i) => `${"abcd"[i]}) ${vraie[i] ? "vrai" : `faux, $${t(juste[i])}$ ${l.vers}`}`).join(" ; ")}.`);
  dit(8, `$${t(L[3].v)} \\div 100 = ${t(juste[3])}$ m`);
  const [unites, lignes] = dessin("conversion", 8);
  vrai("8. le tableau montre le a) et le d)", lire(unites, lignes[0].cases, lignes[0].de) === L[0].v && lire(unites, lignes[0].cases, lignes[0].vers) === juste[0] && lire(unites, lignes[1].cases, "cm") === L[3].v);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const L = e(9).split("\\n").slice(1).map((l) => {
    const m = /\$(\d+)\$ (\w+) \$(\d+)\$ (\w+), en (\w+)/.exec(l);
    const grand = conv(nb(m[1]), m[2], m[5]);
    return { grand, petit: conv(nb(m[3]), m[4], m[5]), vers: m[5], txt: `$${m[1]}$ ${m[2]} $= ${t(grand)}$ ${m[5]}` };
  });
  L.forEach((l) => {
    dit(9, l.txt);
    dit(9, `$${t(l.grand)} + ${t(l.petit)} = ${t(l.grand + l.petit)}$ ${l.vers}`);
  });
  dit(9, `Réponse : ${L.map((l, i) => `${"abc"[i]}) $${t(l.grand + l.petit)}$ ${l.vers}`).join(" ; ")}.`);
  dit(9, `écrire $${5 * 10 + 8}$ cm`);
  const [unites, lignes] = dessin("conversion", 9);
  vrai("9. le tableau : 5 m 8 cm et 1 m 5 mm", lire(unites, lignes[0].cases, "cm") === L[1].grand + L[1].petit && lire(unites, lignes[1].cases, "mm") === L[2].grand + L[2].petit);
});
essai("10", () => {
  const s = [...e(10).matchAll(/(?<=\\n|\. )(\p{L}+) : \$([^$]+)\$ (dm|cm|m)/gu)].map((m) => ({ nom: m[1], cm: conv(nb(m[2]), m[3], "cm") }));
  vrai("10. trois sauts", s.length === 3);
  const r = [...s].sort((a, b) => b.cm - a.cm);
  dit(10, `$${r.map((x) => x.cm).join(" > ")}$`);
  dit(10, `$${r[0].cm} - ${r[2].cm} = ${r[0].cm - r[2].cm}$ cm`);
  dit(10, `Réponse : a) ${r.map((x) => x.nom).join(", ")} ; b) $${r[0].cm - r[2].cm}$ cm.`);
  const [, lignes] = dessin("table", 10);
  vrai("10. le tableau", lignes.every((l, i) => l[0] === r[i].nom && nb(l[2]) === r[i].cm));
});
essai("11", () => {
  const P = e(11).split("\\n").slice(1).map((l) => [...l.matchAll(/\$([^$]+)\$ (km|dm|cm|mm|m)/g)].map((m) => ({ ecrit: `$${m[1]}$ ${m[2]}`, m: conv(nb(m[1]), m[2], "m") })));
  vrai("11. quatre paires", P.length === 4 && P.every((p) => p.length === 2 && p[0].m !== p[1].m));
  dit(11, `Réponse : ${P.map((p, i) => `${"abcd"[i]}) ${(p[0].m > p[1].m ? p[0] : p[1]).ecrit}`).join(" ; ")}.`);
  dit(11, `$2{,}5$ km $= 2\\,500$ m`);
  dit(11, `$5$ cm $= 50$ mm`);
  dit(11, `$7$ dm $= 70$ cm`);
  dit(11, `$1\\,000$ mm $= 1$ m`);
});
essai("12", () => {
  const [pelote, echarpe, bonnet] = longueurs(e(12));
  const reste = conv(pelote - echarpe, "m", "cm");
  dit(12, `$${t(conv(pelote, "m", "cm"))} - ${t(conv(echarpe, "m", "cm"))} = ${t(reste)}$ cm`);
  dit(12, `$${t(reste)} \\div 100 = ${t(conv(reste, "cm", "m"))}$ m`);
  vrai("12. pas assez pour le bonnet", conv(reste, "cm", "m") < bonnet);
  dit(12, `Il manque $${t(bonnet)} - ${t(conv(reste, "cm", "m"))} = ${t(r9(bonnet - conv(reste, "cm", "m")))}$ m, soit $${t(conv(r9(bonnet - conv(reste, "cm", "m")), "m", "cm"))}$ cm.`);
  const [total, morceaux] = dessin("bande", 12);
  vrai("12. la bande", morceaux[0].valeur === conv(echarpe, "m", "cm") && morceaux[1].valeur === reste && total.endsWith(`${t(conv(pelote, "m", "cm")).replace("\\,", " ")} cm`));
});
essai("13", () => {
  const [piste] = longueurs(e(13));
  const tours = nb(/fait \$(\d+)\$ tours et demi/.exec(e(13))[1]);
  const D = tours * piste + piste / 2;
  dit(13, `$${tours} \\times ${piste} = ${t(tours * piste)}$ m`);
  dit(13, `$${t(tours * piste)} + ${piste / 2} = ${t(D)}$ m`);
  dit(13, `$${t(D)} \\div 1\\,000 = ${t(conv(D, "m", "km"))}$ km`);
  const [, morceaux] = dessin("bande", 13);
  vrai("13. la bande : six tours et un demi", morceaux.length === tours + 1 && morceaux.slice(0, tours).every((m) => m.valeur === piste) && morceaux.at(-1).valeur === piste / 2);
});
essai("14", () => {
  const [me, ep, pm] = longueurs(e(14).split("\\na)")[0]);
  const [, formes] = dessin("plan", 14, "figure");
  const cotes = formes.filter((x) => x.cote).map((x) => enM(x.label));
  vrai("14. le plan porte les trois distances de l'énoncé", JSON.stringify(cotes) === JSON.stringify([me, ep, pm]));
  const tot = me + ep + pm;
  dit(14, `$${t(me)} + ${t(ep)} + ${t(pm)} = ${t(tot)}$ m`);
  dit(14, `$${t(tot)} \\div 1\\,000 = ${t(conv(tot, "m", "km"))}$ km`);
  dit(14, `$${t(pm)} + ${t(ep)} = ${t(pm + ep)}$ m`);
  dit(14, `$${t(pm + ep)} - ${t(me)} = ${t(pm + ep - me)}$ m de plus`);
});
essai("15", () => {
  const v = nb(/de \$(\d+)\$ mm chaque seconde/.exec(e(15))[1]);
  dit(15, `$10 \\times ${v} = ${10 * v}$ mm. Et $${10 * v}$ mm $= ${t(conv(10 * v, "mm", "cm"))}$ cm.`);
  dit(15, `$60 \\times ${v} = ${60 * v}$ mm, soit $${t(conv(60 * v, "mm", "cm"))}$ cm`);
  dit(15, `$1\\,000 \\div ${v} = ${1000 / v}$ secondes`);
  vrai("15. un nombre entier de secondes", Number.isInteger(1000 / v));
  const [, lignes] = dessin("table", 15);
  vrai("15. le tableau", lignes.every((l) => nb(l[0].replace(" s", "")) * v === nb(l[1].split(" mm")[0])));
});
essai("16", () => {
  const parMm = nb(/\$(\d+)\$ feuilles font \$1\$ mm/.exec(e(16))[1]);
  const ram = nb(/a \$(\d+)\$ feuilles/.exec(e(16))[1]);
  dit(16, `$${ram} \\div ${parMm} = ${ram / parMm}$ : la ramette fait $${ram / parMm}$ mm.`);
  dit(16, `$${ram / parMm} \\div 10 = ${t(conv(ram / parMm, "mm", "cm"))}$ cm`);
  dit(16, `$1\\,000 \\times ${parMm} = ${t(1000 * parMm)}$ feuilles`);
  const [unites, lignes] = dessin("conversion", 16);
  vrai("16. le tableau : 50 mm = 5 cm, 1 m = 1 000 mm", lire(unites, lignes[0].cases, "mm") === ram / parMm && lire(unites, lignes[1].cases, "mm") === 1000);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const et = longueurs(e(17).split("\\na)")[0]);
  vrai("17. quatre étapes", et.length === 4);
  const D = et.reduce((s, x) => s + x, 0);
  dit(17, `$${et.map(t).join(" + ")} = ${t(D)}$ m`);
  dit(17, `$${t(D)} \\div 1\\,000 = ${t(conv(D, "m", "km"))}$ km`);
  const fait = et[0] + et[1];
  dit(17, `$${et[0]} + ${et[1]} = ${t(fait)}$ m`);
  dit(17, `$${t(D)} - ${t(fait)} = ${t(D - fait)}$ m`);
  vrai("17. l'étape B2 → B3 est la plus longue", Math.max(...et) === et[2]);
  const [total, morceaux] = dessin("bande", 17);
  vrai("17. la bande", JSON.stringify(morceaux.map((m) => m.valeur)) === JSON.stringify(et) && total.startsWith(t(D).replace("\\,", " ")));
});
essai("18", () => {
  const etag = longueurs(e(18))[0];
  const nBD = nb(/range d'abord \$(\d+)\$ BD/.exec(e(18))[1]);
  const [bd, livre] = [nb(/fait \$(\d+)\$ mm/.exec(e(18))[1]), nb(/livres de \$(\d+)\$ cm/.exec(e(18))[1])];
  const bdCm = conv(nBD * bd, "mm", "cm"), reste = conv(etag, "m", "cm") - bdCm;
  dit(18, `$${nBD} \\times ${bd} = ${nBD * bd}$ mm`);
  dit(18, `$${nBD * bd} \\div 10 = ${bdCm}$ cm`);
  dit(18, `$${conv(etag, "m", "cm")} - ${bdCm} = ${reste}$ cm`);
  dit(18, `$${reste} \\div ${livre} = ${reste / livre}$ livres`);
  vrai("18. un nombre entier de livres", Number.isInteger(reste / livre));
  const [, morceaux] = dessin("bande", 18);
  vrai("18. la bande", morceaux[0].valeur === bdCm && morceaux[1].valeur === reste && morceaux[1].label.startsWith(`${reste / livre} livres`));
});
essai("19", () => {
  const h0 = conv(longueurs(e(19))[0], "m", "cm");
  const p = nb(/de \$(\d+)\$ cm chaque jour/.exec(e(19))[1]);
  const sem = 7 * p;
  dit(19, `$7 \\times ${p} = ${sem}$ cm`);
  dit(19, `$${sem} \\div 100 = ${t(conv(sem, "cm", "m"))}$ m`);
  dit(19, `$${h0} + ${sem} = ${h0 + sem}$ cm, soit $${t(conv(h0 + sem, "cm", "m"))}$ m`);
  const manque = 500 - h0;
  const j = Math.ceil(manque / p);
  dit(19, `$500 - ${h0} = ${manque}$ cm`);
  dit(19, `$${j - 1} \\times ${p} = ${(j - 1) * p}$ : au bout de $${j - 1}$ jours, il manque encore $${manque - (j - 1) * p}$ cm.`);
  dit(19, `$${j} \\times ${p} = ${j * p}$ : au bout de $${j}$ jours`);
  dit(19, `c) au bout de $${j}$ jours.`);
  const [, morceaux] = dessin("bande", 19);
  vrai("19. la bande", morceaux[0].valeur === h0 && morceaux[1].valeur === sem);
});
essai("20", () => {
  const n = nb(/de \$(\d+)\$ fanions/.exec(e(20))[1]);
  const [fan, esp, bout, rouleau] = longueurs(e(20).split("\\na)")[0] + e(20).split("\\nc)")[1]).map((x) => conv(x, "m", "cm"));
  const L = n * fan + (n - 1) * esp + 2 * bout;
  dit(20, `il y a $${n - 1}$ espaces`);
  dit(20, `$${n} \\times ${fan} = ${n * fan}$ cm`);
  dit(20, `$${n - 1} \\times ${esp} = ${(n - 1) * esp}$ cm`);
  dit(20, `$2 \\times ${bout} = ${2 * bout}$ cm`);
  dit(20, `$${n * fan} + ${(n - 1) * esp} + ${2 * bout} = ${L}$ cm, soit $${t(conv(L, "cm", "m"))}$ m`);
  const k = Math.ceil(L / rouleau);
  dit(20, `c) $${k}$ rouleaux`);
  dit(20, `Il restera $${k * rouleau - L}$ cm`);
  const [g, gf, ge] = dessin("guirlande", 20);
  vrai("20. la guirlande à l'échelle de l'énoncé", gf === fan && ge === esp);
  dit(20, `$${g}$ fanions ont $${g - 1}$ espaces`);
});

f.fin();
