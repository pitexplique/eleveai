// Recalcul indépendant de la feuille « Les nombres entiers » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-entier-nombre.tsx.
//
// ⭐ Les nombres sont relus dans l'ÉNONCÉ ou dans le DESSIN (numeration,
// droiteRel, table), jamais recopiés ici. Le script écrit lui-même les nombres
// en lettres (orthographe traditionnelle : « quatre-vingts », « deux cent
// mille »), relit les rangs chiffre par chiffre, compare, encadre, et essaie
// toutes les possibilités des défis. Puis il cherche la réponse dans le corrigé.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-entier-nombre.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-entier-nombre.tsx", "entier_nombre", ["numeration", "droiteRel", "table"], "6e");
const { c, e, vrai, verif, dit, enonceDit, dessin, essai } = f;

/* ── Les nombres en lettres, calculés ici (orthographe traditionnelle) ── */
const U = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize"];
const DIZ = { 20: "vingt", 30: "trente", 40: "quarante", 50: "cinquante", 60: "soixante" };
/** `fin` : le morceau finit le nombre (ou précède un nom, « millions ») — « cents », « quatre-vingts » y prennent un s. */
function moinsDe100(n, fin) {
  if (n <= 16) return U[n];
  if (n < 20) return "dix-" + U[n - 10];
  if (n < 70) {
    const d = Math.floor(n / 10) * 10, u = n % 10;
    return u === 0 ? DIZ[d] : u === 1 ? `${DIZ[d]} et un` : `${DIZ[d]}-${U[u]}`;
  }
  if (n < 80) return n === 71 ? "soixante et onze" : "soixante-" + moinsDe100(n - 60, fin);
  if (n === 80) return fin ? "quatre-vingts" : "quatre-vingt";
  return "quatre-vingt-" + moinsDe100(n - 80, fin);
}
function moinsDe1000(n, fin) {
  if (n < 100) return moinsDe100(n, fin);
  const k = Math.floor(n / 100), r = n % 100;
  const tete = k === 1 ? "cent" : `${U[k]} cent`;
  if (r === 0) return k > 1 && fin ? tete + "s" : tete;
  return `${tete} ${moinsDe100(r, fin)}`;
}
function lettres(n) {
  const mi = Math.floor(n / 1e6), k = Math.floor(n / 1000) % 1000, r = n % 1000;
  const p = [];
  if (mi) p.push(`${moinsDe1000(mi, true)} ${mi > 1 ? "millions" : "million"}`);
  if (k) p.push(k === 1 ? "mille" : `${moinsDe1000(k, false)} mille`);
  if (r) p.push(moinsDe1000(r, true));
  return p.join(" ");
}

/** Les entiers $…$ d'un texte (« 30\,915\,624 » compris), dans l'ordre. */
const nombres = (texte) => [...texte.matchAll(/\$(\d+(?:\\,\d{3})*)\$/g)].map((m) => Number(m[1].replace(/\\,/g, "")));
/** Un nombre écrit dans un dessin (« 3 684 ») → nombre. */
const nb = (s) => Number(String(s).replace(/\s/g, ""));
/** Le chiffre de rang r (0 = unités) et le « nombre de » ce rang. */
const chiffre = (n, r) => Math.floor(n / 10 ** r) % 10;
const nombreDe = (n, r) => Math.floor(n / 10 ** r);
const RANGS = ["unités", "dizaines", "centaines", "unités de mille", "dizaines de mille", "centaines de mille", "millions", "dizaines de millions", "centaines de millions"];
const lignes = (k) => e(k).split("\\n");
const memes = (a, b) => JSON.stringify([...a].sort((x, y) => x - y)) === JSON.stringify([...b].sort((x, y) => x - y));

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const mots = lignes(1).slice(1).map((l) => l.replace(/^[a-d]\) /, ""));
  // Le nombre écrit en lettres dans l'énoncé est retrouvé par essais : celui dont l'écriture colle.
  const [nums] = dessin("numeration", 1);
  const lus = nums.map(Number);
  lus.forEach((n, i) => vrai(`1${"abcd"[i]}. « ${mots[i]} » = ${n}`, lettres(n) === mots[i], lettres(n)));
  dit(1, `Réponse : a) $${t(lus[0])}$ ; b) $${t(lus[1])}$ ; c) $${t(lus[2])}$ ; d) $${t(lus[3])}$.`);
  lus.forEach((n) => dit(1, `$${t(n)}$`));
  dit(1, "$020$");
  dit(1, "$009$");
  vrai("1. le piège : 6 009 n'est pas 600 009", 6009 !== lus[3]);
});
essai("2", () => {
  const xs = lignes(2).slice(1).map((l) => nombres(l)[0]);
  vrai("2. quatre nombres", xs.length === 4);
  dit(2, `Réponse : ${xs.map((x, i) => `${"abcd"[i]}) ${lettres(x)}`).join(" ; ")}.`);
  const [, lg] = dessin("table", 2);
  lg.forEach((l, i) => vrai(`2. tableau ligne ${i + 1} : ${l[0]} → « ${l[1]} »`, nb(l[0]) === xs[i] && l[1] === lettres(xs[i])));
  vrai("2. « quatre-vingts mille » est bien fautif", lettres(80000) === "quatre-vingt mille");
});
essai("3", () => {
  const [n] = nombres(e(3));
  dit(3, `Réponse : a) $${chiffre(n, 2)}$ ; b) $${nombreDe(n, 2)}$ ; c) $${chiffre(n, 1)}$ ; d) $${t(nombreDe(n, 1))}$.`);
  dit(3, `$${nombreDe(n, 2)} \\times 100 = ${t(nombreDe(n, 2) * 100)}$`);
  const [nums, { surligne }] = dessin("numeration", 3);
  vrai("3. le tableau porte le nombre, centaines allumées", nb(nums[0]) === n && surligne === 2);
});
essai("4", () => {
  const [n] = nombres(e(4));
  const r9 = String(n).length - 1 - String(n).indexOf("9");
  const r3 = String(n).length - 1 - String(n).indexOf("3");
  vrai(`4. le 9 est aux ${RANGS[r9]}`, RANGS[r9] === "centaines de mille");
  dit(4, `Réponse : a) $${chiffre(n, 6)}$ ; b) $${chiffre(n, 4)}$ ; c) les ${RANGS[r9]} ; d) $${t(3 * 10 ** r3)}$.`);
  const classes = [Math.floor(n / 1e6), Math.floor(n / 1000) % 1000, n % 1000];
  dit(4, `$${classes[0]}$, $${classes[1]}$ et $${classes[2]}$`);
  const [nums, { surligne }] = dessin("numeration", 4);
  vrai("4. le tableau porte le nombre, millions allumés", nb(nums[0]) === n && surligne === 6 && chiffre(n, surligne) === 0);
});
essai("5", () => {
  const paires = lignes(5).slice(1).map(nombres);
  const signes = paires.map(([a, b]) => (a < b ? "<" : ">"));
  dit(5, `Réponse : ${signes.map((s, i) => `${"abcd"[i]}) $${s}$`).join(" ; ")}.`);
  paires.forEach(([a, b], i) => dit(5, `$${t(a)} ${signes[i]} ${t(b)}$`));
  vrai("5a. 9 870 commence par 9 et perd", String(paires[0][0])[0] === "9" && signes[0] === "<");
  const [nums] = dessin("numeration", 5);
  vrai("5. le tableau montre le b)", memes(nums.map(Number), paires[1]));
});
essai("6", () => {
  const xs = lignes(6).slice(1).map((l) => nombres(l)[0]);
  for (const n of xs) {
    const rangs = String(n).split("").map(Number).map((d, j, a) => [d, a.length - 1 - j]).filter(([d]) => d !== 0);
    dit(6, `$${t(n)} = ${rangs.map(([d, r]) => t(d * 10 ** r)).join(" + ")}$`);
    dit(6, `$${t(n)} = ${rangs.map(([d, r]) => (r === 0 ? `${d}` : `${d} \\times ${t(10 ** r)}`)).join(" + ")}$`);
    vrai(`6. la somme redonne ${n}`, rangs.reduce((s, [d, r]) => s + d * 10 ** r, 0) === n);
  }
  const [nums] = dessin("numeration", 6);
  vrai("6. le tableau porte les deux nombres", memes(nums.map(Number), xs));
});
essai("7", () => {
  const [n] = nombres(e(7));
  for (const p of [10, 100, 1000]) {
    const bas = Math.floor(n / p) * p;
    dit(7, `$${t(bas)} < ${t(n)} < ${t(bas + p)}$`);
  }
  const [min, max, pas, points] = dessin("droiteRel", 7);
  vrai("7. la droite va de centaine en centaine, graduée par dizaines", min === 3600 && max === 3700 && pas === 10);
  vrai("7. le point est le nombre", points.length === 1 && points[0].value === n && nb(points[0].label) === n);
  vrai("7. plus près de 3 700", 3700 - n < n - 3600);
});
essai("8", () => {
  const xs = nombres(lignes(8)[1]);
  const r = [...xs].sort((a, b) => a - b);
  dit(8, `Réponse : $${r.map(t).join(" < ")}$.`);
  const [nums] = dessin("numeration", 8);
  vrai("8. le tableau les montre rangés", JSON.stringify(nums.map(Number)) === JSON.stringify(r));
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const noms = ["Mars", "Mercure", "Jupiter", "La Terre", "Vénus"];
  const dist = {};
  for (const l of lignes(9)) {
    const m = /^(Mars|Mercure|Jupiter|La Terre|Vénus) : (.*) millions\.$/.exec(l);
    if (!m) continue;
    // Le nombre de millions dont l'écriture en lettres est celle de l'énoncé.
    const mi = Array.from({ length: 999 }, (_, i) => i + 1).find((x) => moinsDe1000(x, true) === m[2]);
    vrai(`9. « ${m[2]} millions » lu`, mi !== undefined);
    dist[m[1]] = mi;
  }
  vrai("9. cinq planètes", noms.every((p) => dist[p]));
  dit(9, `La Terre est à $${t(dist["La Terre"] * 1e6)}$ km. Jupiter est à $${t(dist.Jupiter * 1e6)}$ km.`);
  const r = [...noms].sort((a, b) => dist[a] - dist[b]);
  dit(9, `$${r.map((p) => dist[p]).join(" < ")}$.`);
  dit(9, `L'ordre : ${r.map((p) => p.replace("La Terre", "la Terre")).join(", ")}.`);
  dit(9, `Mars est à $${t(dist.Mars * 1e6)}$ km.`);
  dit(9, `Le chiffre des dizaines de millions est $${chiffre(dist.Mars * 1e6, 7)}$.`);
  const [, , , points] = dessin("droiteRel", 9);
  const noms2 = { Mercure: "Mercure", Vénus: "Vénus", Terre: "La Terre", Mars: "Mars", Jupiter: "Jupiter" };
  vrai("9. la droite porte chaque planète à sa distance (en millions)", points.length === 5 && points.every((p) => dist[noms2[p.label]] === p.value));
});
essai("10", () => {
  const [, a, b, cc, d] = lignes(10);
  /** Tous les entiers d'une ligne, dans ou hors formule. */
  const tous = (l) => [...l.matchAll(/\d+(?:\\,\d{3})*/g)].map((m) => Number(m[0].replace(/\\,/g, "")));
  const va = (() => { const [x, p, y, q, z] = tous(a); return x * p + y * q + z; })();
  const [m, ce, u] = tous(b), vb = m * 1000 + ce * 100 + u;
  const vc = (() => { const [x, p, y, q] = tous(cc); return x * p + y * q; })();
  const [dm, uu] = tous(d), vd = dm * 10000 + uu;
  const vals = [va, vb, vc, vd];
  dit(10, `Réponse : ${vals.map((v, i) => `${"abcd"[i]}) $${t(v)}$`).join(" ; ")}.`);
  dit(10, `$${t(m * 1000)} + ${t(ce * 100)} + ${u} = ${t(vb)}$`);
  vrai("10b. le piège 7 125 est faux", vb !== 7125);
  const [nums] = dessin("numeration", 10);
  vrai("10. le tableau porte les quatre réponses", JSON.stringify(nums.map(Number)) === JSON.stringify(vals));
});
essai("11", () => {
  const st = Object.fromEntries([...e(11).matchAll(/[Ss]tade ([A-D]) : \$(\d+\\,\d{3})\$/g)].map((m) => [m[1], nb(m[2].replace("\\,", ""))]));
  vrai("11. quatre stades lus", Object.keys(st).length === 4);
  const r = Object.keys(st).sort((a, b) => st[b] - st[a]);
  dit(11, `$${r.map((s) => t(st[s])).join(" > ")}$ : ${r.slice(0, -1).join(", ")}, puis ${r.at(-1)}.`);
  const plus = Object.keys(st).filter((s) => st[s] > 42500).sort();
  dit(11, `Ce sont les stades ${plus.join(" et ")}.`);
  const C = st.C;
  dit(11, `$${t(Math.floor(C / 1000) * 1000)} < ${t(C)} < ${t(Math.floor(C / 1000) * 1000 + 1000)}$`);
  const [, , , points] = dessin("droiteRel", 11);
  vrai("11. la droite porte chaque stade", points.length === 4 && points.every((p) => st[p.label] === p.value));
});
essai("12", () => {
  const [p1, p2] = nombres(e(12));
  const cb = Math.floor(p1 / 100) * 100, db = Math.floor(p1 / 10) * 10;
  dit(12, `$${t(cb)} < ${t(p1)} < ${t(cb + 100)}$.`);
  dit(12, `De $${t(p1)}$ à $${t(cb + 100)}$, il y a $${cb + 100 - p1}$. De $${t(cb)}$ à $${t(p1)}$, il y a $${p1 - cb}$.`);
  const proche = p1 - cb < cb + 100 - p1 ? cb : cb + 100;
  dit(12, `Le prix est plus proche de $${t(proche)}$.`);
  dit(12, `$${t(db)} < ${t(p1)} < ${t(db + 10)}$.`);
  vrai("12d. le second est moins cher", p2 < p1);
  dit(12, `Donc $${t(p2)} < ${t(p1)}$`);
  const [, , , points] = dessin("droiteRel", 12);
  vrai("12. la droite porte les deux prix", memes(points.map((p) => p.value), [p1, p2]));
});
essai("13", () => {
  const [n, sac, carton] = nombres(e(13));
  vrai("13. sacs de 100, cartons de 1 000", sac === 100 && carton === 1000);
  const sacs = Math.floor(n / sac), reste = n % sac, cartons = Math.floor(n / carton), r2 = n % carton;
  dit(13, `Réponse : a) $${sacs}$ sacs, reste $${reste}$ ; b) $${cartons}$ cartons ; c) $${carton - r2}$ bouchons.`);
  dit(13, `Or $${r2} + ${carton - r2} = ${t(carton)}$.`);
  vrai("13. le piège : le chiffre des centaines", chiffre(n, 2) === 5);
  const [nums, { surligne }] = dessin("numeration", 13);
  vrai("13. le tableau, centaines allumées", nb(nums[0]) === n && surligne === 2);
});
essai("14", () => {
  const ch = nombres(lignes(14)[0]);
  vrai("14. cinq chiffres lus", ch.length === 5);
  // Toutes les permutations, sans 0 en tête.
  const perms = (xs) => (xs.length <= 1 ? [xs] : xs.flatMap((x, i) => perms([...xs.slice(0, i), ...xs.slice(i + 1)]).map((p) => [x, ...p])));
  const tous = perms(ch).filter((p) => p[0] !== 0).map((p) => Number(p.join("")));
  const grand = Math.max(...tous), petit = Math.min(...tous), impair = Math.min(...tous.filter((x) => x % 2 === 1));
  dit(14, `Réponse : a) $${t(grand)}$ ; b) $${t(petit)}$ ; c) $${t(impair)}$.`);
  dit(14, `il commence par $3$ : $${t(Math.min(...tous.filter((x) => x % 10 === 1)))}$`);
  const [nums] = dessin("numeration", 14);
  vrai("14. le tableau porte les trois réponses", JSON.stringify(nums.map(Number)) === JSON.stringify([grand, petit, impair]));
});
essai("15", () => {
  const [min, max, pas, points, { nombres: ecrits }] = dessin("droiteRel", 15, "figure");
  const n = ecrits / pas;
  dit(15, `je compte $${n}$ intervalles`);
  dit(15, `$${t(ecrits)} \\div ${n} = ${t(pas)}$`);
  dit(15, `Réponse : ${points.map((p) => `${p.label} $${t(p.value)}$`).join(" ; ")}.`);
  points.forEach((p) => {
    const avant = Math.floor(p.value / ecrits) * ecrits;
    dit(15, `${p.label} : $${(p.value - avant) / pas}$ graduations après $${t(avant)}$, donc $${t(p.value)}$.`);
  });
  const [v] = nombres(e(15));
  dit(15, `$${t(Math.floor(v / pas) * pas)} < ${t(v)} < ${t(Math.floor(v / pas) * pas + pas)}$`);
  vrai("15. 21 000 hors graduation, au milieu", v % pas !== 0 && v % pas === pas / 2 && min === 0 && max >= v);
});
essai("16", () => {
  const verites = [9999 < 10000, chiffre(60500, 2) === 5, 3 * 10000 === 300 * 100, nombreDe(4580, 1) === 8];
  dit(16, `Réponse : ${verites.map((v, i) => `${"abcd"[i]}) ${v ? "vrai" : "faux"}`).join(" ; ")}.`);
  dit(16, `Le nombre de dizaines se lit jusqu'à sa colonne : $${nombreDe(4580, 1)}$.`);
  dit(16, `$300 \\times 100 = ${t(30000)}$`);
  const [nums] = dessin("numeration", 16);
  vrai("16. le tableau porte 60 500 et 4 580", memes(nums.map(Number), [60500, 4580]));
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [prix, a, b, limite] = nombres(e(17));
  dit(17, `Le prix s'écrit : ${lettres(prix)} euros.`);
  const r = [prix, a, b].sort((x, y) => x - y);
  dit(17, `$${r.map(t).join(" < ")}$.`);
  const ok = r.filter((x) => x < limite);
  dit(17, `c) celles à $${t(ok[0])}$ € et à $${t(ok[1])}$ €`);
  const m = Math.floor(prix / 1000) * 1000;
  const proche = prix - m < m + 1000 - prix ? m : m + 1000;
  dit(17, `d) $${t(proche)}$.`);
  const [, , , points] = dessin("droiteRel", 17);
  vrai("17. la droite porte les trois prix", memes(points.map((p) => p.value), [prix, a, b]) && points.every((p) => nb(p.label) === p.value));
});
essai("18", () => {
  const sol = [];
  for (let n = 45001; n < 46000; n++) {
    const [dm, , ce, di, u] = String(n).split("").map(Number);
    const s = String(n).split("").reduce((x, y) => x + Number(y), 0);
    if (ce === 2 * dm && u === ce - 1 && s === 25) sol.push(n);
  }
  vrai(`18. une seule solution (${sol})`, sol.length === 1);
  dit(18, `Je suis $${t(sol[0])}$ : ${lettres(sol[0])}.`);
  dit(18, `$${String(sol[0]).split("").join(" + ")} = 25$`);
  const [nums] = dessin("numeration", 18);
  vrai("18. le tableau porte la solution", nb(nums[0]) === sol[0]);
});
essai("19", () => {
  const xs = nombres(lignes(19)[1]);
  const [et, mo, gr] = xs;
  dit(19, `On écrit : ${lettres(mo)}.`);
  dit(19, `$${[...xs].sort((a, b) => b - a).map(t).join(" > ")}$`);
  const bas = Math.floor(et / 10000) * 10000;
  dit(19, `$${t(bas)} < ${t(et)} < ${t(bas + 10000)}$.`);
  vrai("19d. centaines d'étourneaux = grues", nombreDe(et, 2) === gr);
  dit(19, `$${t(nombreDe(et, 2))}$ centaines`);
  vrai("19. dix fois, puis dix fois", et === 10 * mo && mo === 10 * gr);
  const [nums] = dessin("numeration", 19);
  vrai("19. le tableau porte les trois espèces", JSON.stringify(nums.map(Number)) === JSON.stringify(xs));
});
essai("20", () => {
  const [n] = nombres(e(20));
  const suite = Array.from({ length: 5 }, (_, i) => n + i + 1);
  dit(20, `J'ajoute $1$ à chaque fois : $${suite.map(t).join("$, $")}$.`);
  const change = [...String(28999)].filter((ch, i) => ch !== String(29000)[i]).length;
  vrai("20b. quatre chiffres changent", change === 4);
  dit(20, "Quatre chiffres changent.");
  dit(20, `$${t(Math.floor(n / 1000) * 1000)} < ${t(n)} < ${t(Math.floor(n / 1000) * 1000 + 1000)}$`);
  dit(20, `Il est à $${Math.ceil(n / 1000) * 1000 - n}$ km de $${t(Math.ceil(n / 1000) * 1000)}$`);
  const rep = [11111, 22222, 33333, 44444].find((x) => x > n);
  dit(20, `Le premier après $${t(n)}$ est $${t(rep)}$.`);
  const [, , , points, { sauts }] = dessin("droiteRel", 20);
  vrai("20. la droite : départ, +5", memes(points.map((p) => p.value), [n, n + 5]) && sauts[0].de === n && sauts[0].vers === suite.at(-1));
});

f.fin();
