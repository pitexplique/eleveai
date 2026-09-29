// Recalcul indépendant de la feuille « Multiples, diviseurs et divisibilité »
// de 5e (29/09/2026) : lib/fiches-exercices/maths-5e-divisibilite.tsx.
//
// ⭐ Le script ne se sert JAMAIS d'un critère : il divise pour de vrai (reste de
// la division entière), liste les diviseurs par essais de 1 à n, cherche les
// chiffres cachés en essayant les dix chiffres, puis compare aux réponses
// écrites et aux arguments des dessins (rangement, centaine, venn, paires,
// sommeChiffres, frise, carrelage, table), relus dans le source.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-5e-divisibilite.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-5e-divisibilite.tsx", "divisibilite", ["rangement", "centaine", "paires", "sommeChiffres", "frise", "carrelage", "table"]);
const { e, vrai, dit, dessin, essai } = f;

/** Les entiers $…$ d'un texte (« 2\,088 » compris), dans l'ordre. */
const nombres = (texte) => [...texte.matchAll(/\$(\d+(?:\\,\d{3})*)\$/g)].map((m) => Number(m[1].replace(/\\,/g, "")));
/** Un nombre écrit dans un dessin (« 2 088 ») → nombre. */
const nb = (s) => Number(String(s).replace(/\s/g, ""));
/** Une écriture de tableau (« 5 × 999 », « 4 995 ») → valeur. */
const calc = (s) => Function(`return ${String(s).replace(/(\d) (?=\d{3}\b)/g, "$1").replace(/×/g, "*")}`)();
const divise = (d, n) => n % d === 0;
const diviseurs = (n) => Array.from({ length: n }, (_, i) => i + 1).filter((d) => divise(d, n));
const somme = (n) => String(n).split("").reduce((a, c) => a + Number(c), 0);
const memes = (a, b) => JSON.stringify([...a].map(String).sort()) === JSON.stringify([...b].map(String).sort());
const liste = (xs) => xs.map((x) => `$${t(x)}$`).join(", ");
const listeEt = (xs) => `${xs.slice(0, -1).map((x) => `$${t(x)}$`).join(", ")} et $${t(xs.at(-1))}$`;
const chiffresPlus = (n) => String(n).split("").join(" + ");

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [a, b, p] = /\$(\d+) \\times (\d+) = (\d+)\$/.exec(e(1)).slice(1).map(Number);
  vrai(`1. ${a} × ${b} = ${p}`, a * b === p);
  dit(1, `$${p} \\div ${b} = ${a}$`);
  const q = Math.floor(p / 7), r = p % 7;
  vrai("1d. pas un multiple de 7", r !== 0);
  dit(1, `$${p} = 7 \\times ${q} + ${r}$`);
  dit(1, `$7 \\times ${q} = ${7 * q}$ et $7 \\times ${q + 1} = ${7 * (q + 1)}$`);
  dit(1, "Réponse : a) multiple ; b) diviseur ; c) multiple ; d) non.");
  const [n, col] = dessin("rangement", 1);
  vrai("1. le dessin : p jetons en rangées de b, sans reste", n === p && col === b && divise(col, n));
});
essai("2", () => {
  const [k, lo, hi] = nombres(e(2));
  const ms = [];
  for (let m = k; m <= hi; m += k) if (m >= lo) ms.push(m);
  const pairs = ms.filter((m) => divise(2, m));
  dit(2, `Réponse : a) ${liste(ms)} ; b) ${liste(pairs)} ; c) $${ms.length}$.`);
  ms.forEach((m) => dit(2, `$${k} \\times ${m / k} = ${m}$`));
  dit(2, `$${k} \\times ${ms[0] / k - 1} = ${ms[0] - k}$`);
  dit(2, `$${k} \\times ${ms.at(-1) / k + 1} = ${ms.at(-1) + k}$`);
  const [de, a, kk] = dessin("centaine", 2);
  vrai("2. la grille couvre l'intervalle et colore les multiples de k", kk === k && de > lo - 1 && de <= ms[0] && a >= ms.at(-1) && a <= hi);
});
essai("3", () => {
  const xs = nombres(e(3).split("\\n")[1]);
  vrai("3. sept nombres", xs.length === 7);
  const z = { aSeul: xs.filter((x) => divise(2, x) && !divise(5, x)), commun: xs.filter((x) => divise(10, x)), bSeul: xs.filter((x) => divise(5, x) && !divise(2, x)), dehors: xs.filter((x) => !divise(2, x) && !divise(5, x)) };
  const [zones, noms] = dessin("venn", 3);
  for (const cle of Object.keys(z)) vrai(`3. zone ${cle} : ${z[cle]}`, memes(zones[cle].map(Number), z[cle]));
  vrai("3. les cercles nommés", noms.a === "par 2" && noms.b === "par 5");
  vrai("3. le commun est divisible par 10", z.commun.every((x) => divise(10, x)));
  dit(3, `Réponse : par $2$ seulement : ${liste(z.aSeul)} ; par $5$ seulement : ${liste(z.bSeul)} ; dans les deux : ${liste(z.commun)} ; dehors : ${liste(z.dehors)}.`);
  dit(3, `Divisibles par $2$ (unités $0$, $2$, $4$, $6$ ou $8$) : ${liste(xs.filter((x) => divise(2, x)))}.`);
  dit(3, `Divisibles par $5$ (unités $0$ ou $5$) : ${liste(xs.filter((x) => divise(5, x)))}.`);
});
essai("4", () => {
  const xs = nombres(e(4).split("\\n")[1]);
  const [, lignes] = dessin("table", 4);
  xs.forEach((x, i) => {
    dit(4, `$${chiffresPlus(x)} = ${somme(x)}$`);
    vrai(`4. tableau : ${x}`, nb(lignes[i][0]) === x && Number(lignes[i][1]) === somme(x) && lignes[i][2] === `${divise(3, x) ? "oui" : "non"} ; ${divise(9, x) ? "oui" : "non"}`);
  });
  const par3 = xs.filter((x) => divise(3, x) && !divise(9, x)), par9 = xs.filter((x) => divise(9, x)), aucun = xs.filter((x) => !divise(3, x));
  dit(4, `Réponse : ${liste(par3)} par $3$ seulement ; ${par9.map((x) => `$${t(x)}$`).join(" et ")} par $3$ et par $9$ ; ${liste(aucun)} par aucun des deux.`);
  dit(4, `$471 = 3 \\times ${471 / 3}$`);
});
essai("5", () => {
  const [n] = nombres(e(5));
  const ds = diviseurs(n);
  ds.filter((d) => d * d <= n).forEach((d) => dit(5, `$${d} \\times ${n / d} = ${n}$`));
  dit(5, `Réponse : ${listeEt(ds)} : huit diviseurs.`);
  vrai("5. huit diviseurs", ds.length === 8);
  [3, 6, 7].forEach((d) => vrai(`5. ${d} ne divise pas ${n}`, !divise(d, n)));
  const [nn, lst] = dessin("paires", 5);
  vrai("5. l'arc-en-ciel porte la liste", nn === n && JSON.stringify(lst) === JSON.stringify(ds));
});
essai("6", () => {
  const n = 91;
  vrai("6. 91 n'est divisible ni par 2, 5, 10, 3", [2, 5, 10, 3, 9].every((d) => !divise(d, n)));
  vrai("6. 91 = 7 × 13", 7 * 13 === n);
  dit(6, "$7 \\times 13 = 91$");
  const [nn, col] = dessin("rangement", 6);
  vrai("6. le rectangle de 91 en 7 colonnes est plein", nn === n && col === 7 && divise(col, nn));
});
essai("7", () => {
  const ls = e(7).split("\\n").slice(1).map(nombres);
  const regles = [5, 9, 10];
  const intrus = ls.map((l, i) => {
    const hors = l.filter((x) => !divise(regles[i], x));
    vrai(`7${"abc"[i]}. un seul intrus pour « par ${regles[i]} » (${hors})`, hors.length === 1);
    return hors[0];
  });
  ls[1].forEach((x) => dit(7, `$${chiffresPlus(x)} = ${somme(x)}$`));
  vrai("7b. « pair ou impair » donne trois intrus", ls[1].filter((x) => !divise(2, x)).length === 3);
  dit(7, `Réponse : a) $${t(intrus[0])}$ ; b) $${t(intrus[1])}$ ; c) $${t(intrus[2])}$.`);
  const [, lignes] = dessin("table", 7);
  lignes.forEach((l, i) => vrai(`7. tableau ligne ${i + 1}`, l[1] === `par ${regles[i]}` && nb(l[2]) === intrus[i]));
});
essai("8", () => {
  const [n] = nombres(e(8));
  vrai("8. divisible par 2, 3, 5, 9 et 10", [2, 3, 5, 9, 10].every((d) => divise(d, n)));
  let plusPetit = 1;
  while (![1, 2, 3, 4, 5, 6, 7, 8, 9, 10].every((d) => divise(d, plusPetit))) plusPetit++;
  vrai(`8. le plus petit divisible par 1 à 10 : ${plusPetit}`, plusPetit === n);
  dit(8, `$${chiffresPlus(n)} = ${somme(n)}$`);
  dit(8, `Réponse : $${t(n)}$ est divisible par $2$, $3$, $5$, $9$ et $10$.`);
  const [s, d] = dessin("sommeChiffres", 8);
  vrai("8. la somme posée est celle de 2 520, pour 9", nb(s) === n && d === 9);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const ch = [...Array(10).keys()];
  const a = ch.map((d) => 500 + 10 * d + 4).filter((x) => divise(9, x));
  const b = ch.map((d) => 720 + d).filter((x) => divise(3, x) && divise(5, x));
  const c = ch.flatMap((d) => ch.map((u) => 1060 + 100 * d + u)).filter((x) => divise(10, x) && divise(9, x));
  dit(9, `Réponse : a) $${a.join("$ ou $")}$ ; b) $${b.join("$ ou $")}$ ; c) $${c.map(t).join("$ ou $")}$.`);
  dit(9, `Les nombres sont $${a[0]}$ et $${a[1]}$.`);
  const [, lignes] = dessin("table", 9);
  vrai("9. tableau a", lignes[0][2] === a.join(" ; "));
  vrai("9. tableau b", nb(lignes[1][2]) === b[0] && b.length === 1);
  vrai("9. tableau c", nb(lignes[2][2]) === c[0] && c.length === 1);
});
essai("10", () => {
  const [p, q] = nombres(e(10));
  const dp = diviseurs(p), dq = diviseurs(q);
  const communs = dp.filter((d) => dq.includes(d));
  const g = Math.max(...communs);
  dit(10, `Diviseurs de $${p}$ : ${liste(dp)}.`);
  dit(10, `Diviseurs de $${q}$ : ${liste(dq)}.`);
  dit(10, `Réponse : b) ${liste(communs)} ; le plus grand est $${g}$ ; c) $\\dfrac{${p}}{${q}} = \\dfrac{${p / g}}{${q / g}}$.`);
  dit(10, `$${q} = ${p} \\times 1 + ${q % p}$`);
  const [zones, noms] = dessin("venn", 10);
  vrai("10. le commun du diagramme", memes(zones.commun.map(Number), communs));
  vrai("10. les zones seules", memes(zones.aSeul.map(Number), dp.filter((d) => !communs.includes(d))) && memes(zones.bSeul.map(Number), dq.filter((d) => !communs.includes(d))));
  vrai("10. cercles nommés", noms.a === `de ${p}` && noms.b === `de ${q}`);
});
essai("11", () => {
  const [n, minR, minS] = nombres(e(11));
  const ds = diviseurs(n);
  dit(11, `Les diviseurs de $${n}$ sont ${liste(ds)}.`);
  const rangs = ds.filter((r) => r >= minR && n / r >= minS);
  vrai("11. huit plantations", rangs.length === 8);
  dit(11, `${rangs.slice(0, -1).map((r) => `$${r}$`).join(", ")} ou $${rangs.at(-1)}$ rangées.`);
  const [r0] = [...rangs].sort((a, b) => Math.abs(a - n / a) - Math.abs(b - n / b));
  vrai(`11. le plus proche d'un carré : ${r0} × ${n / r0}`, [6, 10].includes(r0));
  dit(11, `$6$ rangées de $10$, ou $10$ rangées de $6$`);
  const [nn, lst] = dessin("paires", 11);
  vrai("11. l'arc-en-ciel de 60", nn === n && JSON.stringify(lst) === JSON.stringify(ds));
});
essai("12", () => {
  vrai("12a. 43 finit par 3 et n'est pas divisible par 3", 43 % 10 === 3 && !divise(3, 43));
  dit(12, "$4 + 3 = 7$");
  vrai("12b. par 2 et 5 ⇒ par 10 (vérifié jusqu'à 10 000)", Array.from({ length: 10000 }, (_, i) => i).every((x) => !(divise(2, x) && divise(5, x)) || divise(10, x)));
  vrai("12c. somme 9 ⇒ divisible par 9 (jusqu'à 10 000)", Array.from({ length: 10000 }, (_, i) => i).every((x) => somme(x) !== 9 || divise(9, x)));
  const d16 = diviseurs(16);
  vrai("12d. 16 a un nombre impair de diviseurs", d16.length % 2 === 1);
  dit(12, `$16$ a cinq diviseurs, ${listeEt(d16)}.`);
  dit(12, "Réponse : a) faux ; b) vrai ; c) vrai ; d) faux.");
  const [nn, lst] = dessin("paires", 12);
  vrai("12. l'arc-en-ciel de 16", nn === 16 && JSON.stringify(lst) === JSON.stringify(d16));
});
essai("13", () => {
  const [n, col] = nombres(e(13));
  const r = n % col;
  vrai("13. pas un multiple de 6", r !== 0);
  dit(13, `$${n} = ${col} \\times ${Math.floor(n / col)} + ${r}$`);
  const bas = n - r, haut = bas + col;
  dit(13, `$${n} - ${bas} = ${n - bas}$`);
  dit(13, `$${haut} - ${n} = ${haut - n}$`);
  const cols = diviseurs(n).filter((c) => c >= 2 && n / c >= 2);
  dit(13, `Réponse : a) non, il reste $${r}$ jetons ; b) enlever $${n - bas}$ jetons, ou en ajouter $${haut - n}$ ; c) $${cols.join("$ ou $")}$ colonnes.`);
  [3, 4, 5, 6].forEach((d) => vrai(`13. ${d} ne divise pas ${n}`, !divise(d, n)));
  const [nn, cc] = dessin("rangement", 13);
  vrai("13. le dessin : 38 jetons en 6 colonnes", nn === n && cc === col);
});
essai("14", () => {
  const xs = nombres(e(14).split("\\n")[1]);
  const D = [2, 3, 5, 9, 10];
  const [, lignes] = dessin("table", 14);
  xs.forEach((x, i) => {
    const oui = D.filter((d) => divise(d, x)), non = D.filter((d) => !divise(d, x));
    dit(14, `$${chiffresPlus(x)} = ${somme(x)}$`);
    vrai(`14. tableau : ${x}`, nb(lignes[i][0]) === x && lignes[i][1] === oui.join(", ") && lignes[i][2] === (non.length ? non.join(", ") : "—"));
  });
  const phrase = (x) => {
    const oui = D.filter((d) => divise(d, x));
    return oui.length === 1 ? `$${t(x)}$ par $${oui[0]}$ seulement` : `$${t(x)}$ par ${listeEt(oui)}`;
  };
  dit(14, `Réponse : ${xs.map(phrase).join(" ; ")}.`);
});
essai("15", () => {
  const sol = Array.from({ length: 99 }, (_, i) => 301 + i).filter((x) => divise(5, x) && divise(9, x) && !divise(10, x));
  vrai(`15. une seule solution (${sol})`, sol.length === 1);
  dit(15, `Réponse : je suis $${sol[0]}$.`);
  dit(15, `$${sol[0]} = 9 \\times ${sol[0] / 9}$`);
  const [s, d] = dessin("sommeChiffres", 15);
  vrai("15. la somme posée", nb(s) === sol[0] && d === 9);
});
essai("16", () => {
  const [a, b, max] = [3, 5, 50];
  const [pa, pb] = nombres(e(16).split("\\n")[0]).slice(1);
  vrai("16. pas de 3 et 5 lus", pa === a && pb === b);
  const ma = Array.from({ length: Math.floor(max / a) }, (_, k) => (k + 1) * a);
  const mb = Array.from({ length: Math.floor(max / b) }, (_, k) => (k + 1) * b);
  const com = ma.filter((m) => mb.includes(m));
  dit(16, `multiples de $${a}$ : ${liste(ma)}.`);
  dit(16, `multiples de $${b}$ : ${liste(mb)}.`);
  dit(16, `Réponse : c) sur ${com.slice(0, -1).map((m) => `$${m}$`).join(", ")} et $${com.at(-1)}$ cm ; la première est $${com[0]}$ cm.`);
  const [mx, fa, fb] = dessin("frise", 16);
  vrai("16. la frise", mx === max && fa === a && fb === b);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const codes = [...Array(10).keys()].map((m) => 7000 + 110 * m).filter((x) => divise(2, x) && divise(5, x) && divise(9, x));
  vrai(`17. un seul code (${codes})`, codes.length === 1);
  dit(17, `Réponse : le code est $${t(codes[0])}$.`);
  dit(17, `$${t(codes[0])} = 9 \\times ${codes[0] / 9}$`);
  dit(17, `$${chiffresPlus(codes[0])} = ${somme(codes[0])}$`);
  const [s, d] = dessin("sommeChiffres", 17);
  vrai("17. la somme posée", nb(s) === codes[0] && d === 9);
});
essai("18", () => {
  const [n, lo, hi] = nombres(e(18));
  const bons = diviseurs(n).filter((d) => d >= lo && d <= hi);
  dit(18, `Les diviseurs de $${n}$ entre $${lo}$ et $${hi}$ sont ${listeEt(bons)}.`);
  bons.forEach((d) => dit(18, `$${n} = ${d} \\times ${n / d}$`));
  const autres = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i).filter((d) => !bons.includes(d) && d !== 9);
  vrai("18. « 11, 13, 14, 16, 17, 18 et 19 : aucun ne tombe juste »", JSON.stringify(autres) === "[11,13,14,16,17,18,19]");
  const paires = bons.filter((d) => divise(2, n / d));
  vrai("18c. seule 15 rangées de 8 disparaît", bons.filter((d) => !paires.includes(d)).join() === "8");
  const n2 = n + 7;
  vrai("18d. 127 n'a aucun diviseur entre 8 et 20", Array.from({ length: hi - lo + 1 }, (_, i) => lo + i).every((d) => !divise(d, n2)));
  [11, 13, 17, 19].forEach((d) => dit(18, `$${n2} = ${d} \\times ${Math.floor(n2 / d)} + ${n2 % d}$`));
  const [, lignes] = dessin("table", 18);
  vrai("18. tableau : les cinq installations", lignes.length === bons.length && lignes.every((l, i) => Number(l[0]) === bons[i] && Number(l[1]) === n / bons[i] && l[2] === (divise(2, n / bons[i]) ? "oui" : "non")));
});
essai("19", () => {
  const n = 5427;
  vrai("19. 9, 99, 999 multiples de 9", [9, 99, 999].every((x) => divise(9, x)));
  const morceaux = [5 * 999, 4 * 99, 2 * 9];
  const s = morceaux.reduce((a, b) => a + b, 0);
  vrai("19. le nombre = les morceaux + la somme des chiffres", s + somme(n) === n);
  dit(19, `$${morceaux.map(t).join(" + ")} = ${t(s)}$, et $${t(s)} = 9 \\times ${s / 9}$`);
  dit(19, `$${chiffresPlus(n)} = ${somme(n)}$`);
  dit(19, `$${t(n)} = 9 \\times ${n / 9}$`);
  const [, lignes] = dessin("table", 19);
  lignes.forEach((l, i) => vrai(`19. tableau ligne ${i + 1} : ${l[0]} = ${l[1]} = ${l[2]}`, calc(l[0]) === calc(l[1]) && calc(l[1]) === calc(l[2]) && divise(9, calc(l[1]))));
});
essai("20", () => {
  const [L, H, c1, c2] = nombres(e(20));
  vrai("20a. 20 ne convient pas, 15 oui", !(divise(c1, L) && divise(c1, H)) && divise(c2, L) && divise(c2, H));
  dit(20, `$${H} = ${c1} \\times ${Math.floor(H / c1)} + ${H % c1}$`);
  dit(20, `$${L / c2} \\times ${H / c2} = ${(L / c2) * (H / c2)}$`);
  const g = Math.max(...diviseurs(H).filter((d) => divise(d, L)));
  dit(20, `Il en faut $${L / g} \\times ${H / g} = ${(L / g) * (H / g)}$.`);
  dit(20, `Je liste les diviseurs de $${H}$, le plus petit des deux nombres : ${liste(diviseurs(H))}.`);
  dit(20, `c) des carreaux de $${g}$ cm, $${(L / g) * (H / g)}$ en tout.`);
  const [l, h, cote] = dessin("carrelage", 20);
  vrai("20. le mur dessiné, avec le plus grand carreau", l === L && h === H && cote === g);
});

f.fin();
