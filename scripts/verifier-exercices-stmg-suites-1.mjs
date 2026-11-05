// Recalcul indépendant du lot `suites-1` des feuilles STMG (05/11/2026) :
// suite-notation, suite-termes, suite-arithmetique, suite-geometrique,
// suite-geo-evolution, suite-representation.
// Chaque résultat vient d'un calcul sur les données de l'énoncé, recopiées ici.
// Les tableaux et les nuages dessinés sont relus eux aussi, après rendu.
// Usage : npx --yes tsx@4 scripts/verifier-exercices-stmg-suites-1.mjs
import { renderToStaticMarkup } from "react-dom/server";
import { feuille, fin } from "./verifier-exercices-stmg-lot-commun.mjs";

/** Les termes u(0), u(1)… u(n), de proche en proche. */
const arith = (u0, r, n) => {
  const t = [u0];
  for (let k = 0; k < n; k++) t.push(t[k] + r);
  return t;
};
const geo = (u0, q, n) => {
  const t = [u0];
  for (let k = 0; k < n; k++) t.push(t[k] * q);
  return t;
};
const ecarts = (t) => t.slice(1).map((v, k) => v - t[k]);
const quotients = (t) => t.slice(1).map((v, k) => v / t[k]);
const constant = (l) => l.every((v) => Math.abs(v - l[0]) < 1e-9);
const nature = (t) => (constant(ecarts(t)) ? "arithmétique" : constant(quotients(t)) ? "géométrique" : "ni");
const coef = (t) => 1 + t / 100;
const taux = (q) => `${Number(((q - 1) * 100).toFixed(8))} %`;
const pt = (x, y) => `(${x} ; ${y})`;
const fq = (q) => String(q).replace(".", ",");

/** Les textes rendus d'une figure (cases d'un tableau). */
const casesDe = (element) =>
  [...renderToStaticMarkup(element).matchAll(/<t[dh][^>]*>([^<]*)</g)].map((m) => m[1]);
/** Les ordonnées des points d'un nuage, dans l'ordre, relues sur le SVG (BAS 196, HAUT 28). */
const ordonnees = (element, ymin, ymax) =>
  [...renderToStaticMarkup(element).matchAll(/<circle[^>]* cy="([\d.]+)"/g)].map((m) => ymin + ((196 - Number(m[1])) / 168) * (ymax - ymin));
const memes = (a, b) => a.length === b.length && a.every((v, k) => Math.abs(v - b[k]) < 1e-6);

/* ═══════════════════════════ suite-notation ═══════════════════════════ */
{
  const f = await feuille("suite-notation");
  f.juste(1, "a)", "u_7"); f.juste(1, "b)", "u(12)"); f.faux(1, "a)", "7u"); f.faux(1, "b)", "12u");
  f.juste(2, "a)", 4); f.juste(2, "b)", 250); f.faux(2, "a)", 250);
  const t3 = [5, 9, 14, 20];
  f.juste(3, null, t3[2]); f.faux(3, null, t3[1]);
  f.vrai("notation ex.3 tableau", ["5", "9", "14", "20"].every((v) => casesDe(f.exercices[2].figure).includes(v)));
  f.juste(4, null, "fonctionnelle"); f.faux(4, null, "récurrence");
  f.juste(5, null, "récurrence"); f.juste(5, null, "par récurrence"); f.faux(5, null, "fonctionnelle");
  f.juste(6, null, 2 * 5 + 7); f.faux(6, null, 32);
  f.juste(7, null, arith(40, 6, 1)[1]); f.faux(7, null, 240);
  f.juste(8, null, `u(n+1) = u(n) + ${30}`); f.juste(8, null, "u_n + 30"); f.juste(8, null, "u_{n+1} = u_n + 30"); f.faux(8, null, "u(n+1) = 30 × u(n)"); f.faux(8, null, "30 × u(n)");
  f.juste(9, "a)", 3); f.juste(9, "b)", 420); f.juste(9, "c)", "u(5)");
  f.juste(10, "a)", "fonctionnelle"); f.juste(10, "b)", "récurrence"); f.juste(10, "c)", 12 * 3 + 30); f.juste(10, "d)", arith(30, 12, 3)[3]); f.faux(10, "d)", 42);
  const q11 = coef(8);
  f.juste(11, "a)", q11); f.juste(11, "b)", "u(n+1) = u(n)*1,08"); f.juste(11, "b)", "1,08 × u_n"); f.juste(11, "b)", `${fq(q11)} × u(n)`); f.juste(11, "b)", `u(n+1) = ${fq(q11)}u(n)`); f.faux(11, "b)", "u(n) + 8");
  const q12 = coef(-5);
  f.juste(12, "a)", q12); f.juste(12, "b)", `u(n+1) = ${fq(q12)} × u(n)`); f.faux(12, "a)", 0.05);
  f.juste(13, "a)", 0.85 < 1 ? "diminue" : "augmente"); f.juste(13, "b)", (1 - 0.85) * 100); f.juste(13, "b)", "-15 %"); f.faux(13, "b)", "85 %");
  f.juste(14, "a)", "diminue"); f.juste(14, "b)", 600 - arith(600, -40, 1)[1]); f.juste(14, "c)", arith(600, -40, 2)[2]);
  f.juste(15, "a)", "non"); f.juste(15, "b)", 20 - 0); f.juste(15, "c)", 25 * 20 + 200);
  f.juste(16, "a)", "B"); f.juste(16, "b)", 2 ** 2 + 1); f.juste(16, "c)", geo(3, 2, 2)[2]); f.juste(16, "d)", 5 * 3); f.faux(16, "c)", 6);
  f.juste(17, "a)", "u(n+1) = u(n) + 50"); f.juste(17, "b)", arith(800, 50, 2).slice(1)); f.juste(17, "c)", "fonctionnelle"); f.juste(17, "d)", 50 * 10 + 800); f.faux(17, "d)", 500);
  f.vrai("notation ex.17 : u(2) = v(2)", arith(800, 50, 2)[2] === 50 * 2 + 800);
  f.juste(18, "a)", coef(20)); f.juste(18, "b)", "u(n+1) = 1,2 × u(n)"); f.juste(18, "c)", geo(500, 1.2, 2).slice(1)); f.juste(18, "d)", geo(500, 1.2, 1)[1] - 500 === 20 ? "oui" : "non"); f.juste(18, "d)", "faux"); f.faux(18, "d)", "oui");
  f.juste(19, "a)", "u(n+1) = u(n) + 100"); f.juste(19, "b)", `v(n+1) = ${fq(coef(3))} × v(n)`); f.juste(19, "c)", [5000 + 100, 5000 * coef(3)]); f.juste(19, "d)", 5100 < 5000 * coef(3) ? "A" : "B");
  const g20 = geo(1000, coef(-2), 2);
  f.juste(20, "a)", coef(-2)); f.juste(20, "b)", "u(n+1) = 0,98 × u(n)"); f.juste(20, "c)", g20.slice(1));
  f.juste(20, "d)", constant(ecarts(g20)) ? "vrai" : "faux");
  f.tout();
}

/* ═══════════════════════════ suite-termes ═══════════════════════════ */
{
  const f = await feuille("suite-termes");
  f.juste(1, null, arith(200, 25, 3)[3]); f.faux(1, null, 225);
  f.juste(2, null, arith(500, -40, 3).slice(1)); f.faux(2, null, [540, 580, 620]);
  f.juste(3, null, geo(2, 3, 3)[3]); f.faux(3, null, 18);
  f.juste(4, null, geo(1000, coef(10), 3)[3]); f.faux(4, null, 1320);
  f.vrai("termes ex.4 tableau", casesDe(f.exercices[3].figure).includes("1 210") && !casesDe(f.exercices[3].figure).includes("1 331"));
  f.juste(5, null, 4 - 0); f.faux(5, null, 5);
  const t6 = [5, 8, 13, 20];
  f.juste(6, "a)", ecarts(t6)); f.juste(6, "b)", constant(ecarts(t6)) ? "oui" : "non");
  f.juste(7, null, nature([3, 6, 12, 24])); f.faux(7, null, "ni");
  f.juste(8, null, nature([1, 4, 9, 16])); f.faux(8, null, "arithmétique");
  f.juste(9, "a)", 140 - 15); f.juste(9, "b)", 140 - 4 * 15); f.vrai("termes ex.9", arith(80, 15, 4)[4] === 140); f.faux(9, "b)", 200);
  f.juste(10, "a)", geo(64, coef(25), 3).slice(1)); f.juste(10, "b)", 3); f.faux(10, "a)", [80, 96, 112]);
  f.juste(11, "a)", arith(2, 0.5, 2)[2]); f.juste(11, "b)", 6); f.juste(11, "c)", arith(2, 0.5, 6)[6]); f.faux(11, "c)", 5.5);
  const s12 = geo(1800, coef(2), 2);
  f.juste(12, "a)", s12[1]); f.juste(12, "b)", s12[2]); f.faux(12, "b)", 1872);
  const t13 = [1, 3, 6, 10, 15];
  f.juste(13, "a)", ecarts(t13)); f.juste(13, "b)", quotients(t13).slice(0, 2)); f.juste(13, "c)", nature(t13)); f.faux(13, "c)", "arithmétique");
  const [A, B, C] = [[4, 7, 10, 13], [4, 8, 16, 32], [4, 6, 9, 14]];
  f.juste(14, "a)", nature(A)); f.juste(14, "b)", nature(B)); f.juste(14, "c)", nature(C)); f.faux(14, "c)", "géométrique");
  f.vrai("termes ex.14 tableau", [...A, ...B, ...C].every((v) => casesDe(f.exercices[13].figure).includes(String(v))));
  const t15 = [2, 3, 5, 8, 13];
  f.vrai("termes ex.15 règle", t15.slice(2).every((v, k) => v === t15[k] + t15[k + 1]));
  f.juste(15, "a)", t15[4] + t15[3]); f.juste(15, "b)", nature(t15)); f.faux(15, "a)", 13);
  const t16 = [5, 10, 20, 40];
  f.juste(16, "a)", ecarts(t16)); f.juste(16, "b)", quotients(t16)); f.juste(16, "c)", nature(t16) === "ni" ? "oui" : "non"); f.faux(16, "c)", "oui");
  const s17 = arith(1000, -120, 7);
  f.juste(17, "a)", s17.slice(1, 4)); f.juste(17, "b)", 5); f.juste(17, "c)", s17[5]); f.juste(17, "d)", s17[7]); f.faux(17, "b)", 6);
  const s18 = geo(1500, coef(20), 3);
  f.juste(18, "a)", s18.slice(1)); f.juste(18, "b)", 3); f.juste(18, "c)", Math.abs(s18[3] - (1500 + 3 * 300)) < 1e-9 ? "oui" : "non"); f.faux(18, "a)", [1800, 2100, 2400]);
  const [u19, v19] = [arith(100, 30, 5), geo(100, 1.2, 5)];
  f.juste(19, "a)", u19[3]); f.juste(19, "b)", v19[3]); f.juste(19, "c)", Math.round(v19[5] * 100) / 100); f.juste(19, "d)", u19[5]); f.juste(19, "e)", u19[5] > v19[5] ? "u" : "v");
  f.faux(19, "c)", 248.5); f.faux(19, "c)", 248.82); f.faux(19, "c)", 248.84); f.juste(19, "e)", "plan U");
  f.juste(20, "a)", 70 + 6 * 15); f.juste(20, "b)", 70 + 3 * 15); f.juste(20, "c)", 40 / 2 / 2 / 2); f.vrai("termes ex.20", arith(160, -15, 6)[6] === 70); f.faux(20, "a)", -20);
  f.tout();
}

/* ═══════════════════════════ suite-arithmetique ═══════════════════════════ */
{
  const f = await feuille("suite-arithmetique");
  const sens = (r) => (r > 0 ? "croissante" : r < 0 ? "décroissante" : "constante");
  const t1 = [12, 19, 26, 33];
  f.juste(1, null, ecarts(t1)[0]); f.vrai("arith ex.1 constant", constant(ecarts(t1)));
  const t2 = [100, 88, 76, 64];
  f.juste(2, null, ecarts(t2)[0]); f.vrai("arith ex.2 constant", constant(ecarts(t2))); f.faux(2, null, 12);
  f.vrai("arith ex.1-2 tableaux", casesDe(f.exercices[0].figure).includes("33") && casesDe(f.exercices[1].figure).includes("64"));
  f.juste(3, "a)", sens(-3)); f.juste(3, "b)", sens(7)); f.juste(3, "c)", sens(0)); f.faux(3, "a)", "croissante");
  f.juste(4, null, "u(n+1) = u(n) + 60"); f.faux(4, null, "60 × u(n)");
  f.juste(5, null, "u(n+1) = u(n) - 25"); f.juste(5, null, "u(n) - 25"); f.faux(5, null, "u(n) + 25");
  f.juste(6, null, 47 + 8);
  f.juste(7, null, (6 * 1 + 2) - (6 * 0 + 2)); f.faux(7, null, 2);
  f.juste(8, null, constant(ecarts([2, 5, 8, 12])) ? "oui" : "non");
  f.juste(9, "a)", 6 - 2); f.juste(9, "b)", (136 - 112) / (6 - 2)); f.faux(9, "b)", 4);
  const r10 = (820 - 900) / (5 - 1);
  f.juste(10, "a)", r10); f.juste(10, "b)", 900 + 2 * r10); f.faux(10, "a)", 20);
  f.juste(11, "a)", "u(n+1) = u(n) + 120"); f.juste(11, "b)", 120); f.juste(11, "c)", sens(120)); f.juste(11, "d)", arith(1500, 120, 3)[3]); f.faux(11, "d)", 1980);
  f.juste(12, "a)", "non"); f.juste(12, "a)", "faux"); f.faux(12, "a)", "oui"); f.juste(12, "b)", "u(n+1) = u(n) + 40"); f.juste(12, "c)", [40 * 100, 100 + 40]);
  const u13 = (n) => 2 * n + 7;
  f.juste(13, "a)", "2n + 9"); f.vrai("arith ex.13 forme", [0, 1, 2, 5].every((n) => u13(n + 1) === 2 * n + 9));
  f.juste(13, "b)", u13(4) - u13(3)); f.juste(13, "c)", u13(1) - u13(0)); f.faux(13, "a)", "2n + 8"); f.juste(13, "a)", "u(n+1) = 2n + 9"); f.juste(13, "a)", "9 + 2n"); f.faux(13, "a)", "2(n+1)+7"); f.faux(13, "a)", "2n + 2 + 7");
  const u14 = (n) => -4 * n + 60;
  f.juste(14, "a)", "-4n + 56"); f.juste(14, "a)", "u(n+1) = 56 - 4n"); f.faux(14, "a)", "-4(n+1) + 60"); f.vrai("arith ex.14 forme", [0, 1, 2, 5].every((n) => u14(n + 1) === -4 * n + 56));
  f.juste(14, "b)", u14(4) - u14(3)); f.juste(14, "c)", sens(u14(1) - u14(0))); f.faux(14, "b)", 4);
  const t15 = [120, 105, 90];
  f.vrai("arith ex.15 constant", constant(ecarts(t15)));
  f.juste(15, "a)", ecarts(t15)[0] < 0 ? "négative" : "positive"); f.juste(15, "b)", ecarts(t15)[0]); f.juste(15, "c)", "u(n+1) = u(n) - 15"); f.juste(15, "d)", arith(120, -15, 4)[4]);
  const u16 = (n) => n ** 2 + 1;
  f.juste(16, "a)", u16(1) - u16(0)); f.juste(16, "b)", u16(2) - u16(1)); f.juste(16, "c)", u16(1) - u16(0) === u16(2) - u16(1) ? "oui" : "non");
  const v17 = (n) => 150 * n + 2000;
  f.juste(17, "a)", "u(n+1) = u(n) + 150"); f.juste(17, "b)", arith(2000, 150, 3).slice(1)); f.juste(17, "c)", sens(150)); f.juste(17, "d)", v17(6) - v17(5)); f.faux(17, "d)", 2000);
  const s18 = arith(1200, -75, 10);
  f.juste(18, "a)", -75); f.juste(18, "b)", "u(n) - 75"); f.juste(18, "c)", s18[4]); f.juste(18, "d)", sens(-75)); f.juste(18, "e)", s18[10]); f.faux(18, "a)", 75);
  const r19 = (54 - 58) / (7 - 3);
  f.juste(19, "a)", r19); f.juste(19, "b)", 58 - 3 * r19); f.juste(19, "c)", 54 + 3 * r19); f.juste(19, "d)", sens(r19)); f.faux(19, "a)", -4 / 7);
  const u20 = (n) => 350 * n + 4000;
  f.juste(20, "a)", u20(0)); f.juste(20, "b)", "350n + 4350"); f.juste(20, "b)", "u(n+1) = 350n + 4 350"); f.faux(20, "b)", "350(n+1) + 4000"); f.vrai("arith ex.20 forme", [0, 1, 7].every((n) => u20(n + 1) === 350 * n + 4350));
  f.juste(20, "c)", u20(9) - u20(8)); f.juste(20, "d)", "u(n+1) = u(n) + 350"); f.juste(20, "e)", sens(350)); f.juste(20, "f)", u20(3));
  f.tout();
}

/* ═══════════════════════════ suite-geometrique ═══════════════════════════ */
{
  const f = await feuille("suite-geometrique");
  const t1 = [16, 24, 36, 54];
  f.juste(1, null, quotients(t1)[0]); f.vrai("géo ex.1 constant", constant(quotients(t1))); f.faux(1, null, 8);
  const t2 = [80, 40, 20, 10];
  f.juste(2, null, quotients(t2)[0]); f.vrai("géo ex.2 constant", constant(quotients(t2))); f.faux(2, null, 2);
  f.vrai("géo ex.1-2 tableaux", casesDe(f.exercices[0].figure).includes("54") && casesDe(f.exercices[1].figure).includes("80"));
  f.juste(3, null, 30 / 20); f.faux(3, null, "0,67");
  f.juste(4, null, geo(50, 3, 2)[2]); f.faux(4, null, 300);
  f.juste(5, null, geo(100, 1.5, 3)[3]); f.faux(5, null, 250);
  f.juste(6, null, 160 / 2 / 2 / 2); f.vrai("géo ex.6", geo(20, 2, 3)[3] === 160); f.faux(6, null, 1280);
  f.juste(7, null, constant(quotients([3, 6, 12, 25])) ? "oui" : "non");
  f.juste(8, null, coef(4)); f.faux(8, null, 4); f.faux(8, null, "0,04");
  f.juste(9, "a)", "u(n+1) = 3 × u(n)"); f.juste(9, "b)", geo(5, 3, 3).slice(1)); f.juste(9, "c)", 3); f.faux(9, "a)", "u(n) + 3");
  const s10 = geo(20000, coef(-20), 2);
  f.juste(10, "a)", coef(-20)); f.juste(10, "b)", "u(n+1) = 0,8 × u(n)"); f.juste(10, "c)", s10[1]); f.juste(10, "d)", s10[2]); f.faux(10, "d)", 12000);
  const [A, B] = [[5, 15, 45, 135], [5, 10, 20, 35]];
  f.juste(11, "a)", constant(quotients(A)) ? "oui" : "non"); f.juste(11, "b)", constant(quotients(B)) ? "oui" : "non"); f.juste(11, "c)", quotients(A)[0]);
  f.vrai("géo ex.11 tableau", [...A, ...B].every((v) => casesDe(f.exercices[10].figure).includes(String(v))));
  const s12 = geo(2000, coef(3), 2);
  f.juste(12, "a)", "u(n+1) = 1,03 × u(n)"); f.juste(12, "b)", s12[1] / s12[0]); f.juste(12, "c)", s12.slice(1)); f.juste(12, "d)", ecarts(s12)); f.faux(12, "d)", [60, 60]);
  f.juste(13, "a)", "quotient"); f.juste(13, "b)", "non"); f.juste(13, "c)", coef(-5)); f.faux(13, "a)", "différence");
  f.juste(14, "a)", 90 / 1.5); f.juste(14, "b)", 90 / 1.5 / 1.5); f.faux(14, "b)", 202.5);
  const q15 = 150 / 200;
  f.juste(15, "a)", q15); f.juste(15, "b)", 150 * q15); f.juste(15, "c)", 150 * q15 * q15); f.faux(15, "a)", "1,33");
  const t16 = [2500, 3000, 3600];
  f.juste(16, "a)", ecarts(t16)); f.juste(16, "b)", quotients(t16)); f.juste(16, "c)", nature(t16)); f.juste(16, "d)", 3600 * quotients(t16)[0]); f.faux(16, "d)", 4200);
  const s17 = geo(3000, coef(5), 2);
  f.juste(17, "a)", coef(5)); f.juste(17, "b)", "1,05 × u(n)"); f.juste(17, "c)", s17.slice(1)); f.juste(17, "d)", ecarts(s17)); f.faux(17, "d)", [150, 150]);
  const q18 = 24 / 16;
  f.vrai("géo ex.18 constant", 36 / 24 === q18);
  f.juste(18, "a)", q18); f.juste(18, "b)", geo(16, q18, 4).slice(3)); f.juste(18, "c)", 4); f.juste(18, "d)", geo(16, q18, 4)[4] === 16 + 4 * 8 ? "oui" : "non"); f.faux(18, "d)", "oui"); f.faux(18, "c)", 5);
  f.juste(19, "a)", "u(n+1) = 1,05 × u(n)"); f.juste(19, "b)", "v(n+1) = v(n) + 500"); f.juste(19, "a)", "u(n+1) = u(n)*1,05"); f.juste(19, "b)", "v_n + 500"); f.juste(19, "c)", [geo(10000, 1.05, 2)[2], arith(10000, 500, 2)[2]]); f.juste(19, "d)", "A"); f.faux(19, "d)", "B");
  f.juste(20, "a)", coef(-50)); f.juste(20, "b)", "0,5 × u(n)"); f.juste(20, "c)", geo(400, 0.5, 3)[3]); f.juste(20, "d)", 12.5 / 0.5); f.faux(20, "c)", 0);
  f.tout();
}

/* ═══════════════════════════ suite-geo-evolution ═══════════════════════════ */
{
  const f = await feuille("suite-geo-evolution");
  const sens = (q) => (q > 1 ? "croissante" : q < 1 ? "décroissante" : "constante");
  f.juste(1, "a)", 1.2 > 1 ? "hausse" : "baisse"); f.juste(1, "b)", taux(1.2)); f.faux(1, "b)", "120 %");
  f.juste(2, "a)", 0.85 > 1 ? "hausse" : "baisse"); f.juste(2, "b)", `${(1 - 0.85) * 100} %`); f.juste(2, "b)", "-15 %"); f.juste(2, "a)", "une baisse"); f.juste(1, "a)", "une hausse"); f.faux(2, "b)", "85 %");
  f.juste(3, null, coef(8)); f.faux(3, null, "0,08"); f.faux(3, null, 8);
  f.juste(4, null, coef(-30)); f.faux(4, null, "-0,3"); f.faux(4, null, "1,3");
  f.juste(5, "a)", sens(1.05)); f.juste(5, "b)", sens(0.95)); f.juste(5, "c)", sens(1)); f.faux(5, "b)", "croissante");
  f.juste(6, null, `${(1 - 0.4) * 100} %`); f.faux(6, null, "40 %");
  f.juste(7, null, coef(100)); f.faux(7, null, 100);
  f.juste(8, null, "entre 0 et 1"); f.faux(8, null, "négative"); f.vrai("évol ex.8", 0.9 * 800 === 720);
  f.juste(9, "a)", coef(20)); f.juste(9, "b)", coef(20) ** 2); f.juste(9, "c)", taux(coef(20) ** 2)); f.faux(9, "c)", "40 %");
  f.juste(10, "a)", coef(-10)); f.juste(10, "b)", coef(-10) ** 2); f.juste(10, "c)", taux(coef(-10) ** 2)); f.faux(10, "c)", "-20 %"); f.faux(10, "c)", "19 %");
  f.juste(11, "a)", 920 / 800); f.juste(11, "b)", taux(920 / 800)); f.faux(11, "b)", 120);
  f.juste(12, "a)", 1700 / 2000); f.juste(12, "b)", taux(1700 / 2000)); f.faux(12, "b)", "15 %");
  f.juste(13, "a)", sens(0.96)); f.juste(13, "b)", taux(0.96)); f.juste(13, "c)", 150000 * 0.96); f.faux(13, "b)", "-96 %");
  f.juste(14, "a)", taux(1.25)); f.juste(14, "b)", sens(1.25)); f.juste(14, "c)", geo(1200, 1.25, 1)[1]); f.juste(14, "d)", geo(1200, 1.25, 2)[2]); f.faux(14, "d)", 1800);
  const [qA, qB] = [250 / 200, 1100 / 1000];
  f.juste(15, "a)", qA); f.juste(15, "b)", qB); f.juste(15, "c)", taux(qA)); f.juste(15, "d)", taux(qB)); f.juste(15, "e)", qA > qB ? "A" : "B"); f.faux(15, "e)", "B");
  f.juste(16, "a)", "non"); f.faux(16, "a)", "oui"); f.juste(16, "b)", coef(-20)); f.juste(16, "c)", 500 * -0.2); f.juste(16, "d)", 500 * coef(-20)); f.faux(16, "b)", "-0,2");
  const s17 = geo(500, coef(40), 2);
  f.juste(17, "a)", coef(40)); f.juste(17, "b)", s17.slice(1)); f.juste(17, "c)", taux(s17[2] / 500)); f.juste(17, "d)", sens(coef(40))); f.faux(17, "c)", "80 %");
  const s18 = geo(10000, coef(-5), 2);
  f.juste(18, "a)", coef(-5)); f.juste(18, "b)", s18.slice(1)); f.juste(18, "c)", taux(s18[2] / 10000)); f.juste(18, "d)", sens(coef(-5))); f.faux(18, "c)", "-10 %");
  const t19 = [400, 480, 576, 691.2];
  f.vrai("évol ex.19 constant", constant(quotients(t19)));
  f.vrai("évol ex.19 tableau", casesDe(f.exercices[18].figure).includes("691,2"));
  f.juste(19, "a)", quotients(t19)[0]); f.juste(19, "b)", taux(quotients(t19)[0])); f.juste(19, "c)", sens(quotients(t19)[0])); f.juste(19, "d)", 691.2 * quotients(t19)[0]); f.juste(19, "e)", taux(691.2 / 400)); f.faux(19, "e)", "60 %");
  const [u20, v20] = [geo(1000, 1.1, 5), geo(2000, 0.8, 5)];
  const premier = u20.findIndex((v, k) => v > v20[k]);
  f.juste(20, "a)", sens(1.1)); f.juste(20, "b)", sens(0.8)); f.juste(20, "c)", taux(1.1)); f.juste(20, "d)", taux(0.8)); f.juste(20, "e)", [u20[2], v20[2]]); f.juste(20, "f)", premier); f.faux(20, "f)", 2);
  f.tout();
}

/* ═══════════════════════════ suite-representation ═══════════════════════════ */
{
  const f = await feuille("suite-representation");
  const voit = (k, ymin, ymax, termes, champ = "figure") =>
    f.vrai(`repr ex.${k} : les points dessinés`, memes(ordonnees(f.exercices[k - 1][champ], ymin, ymax), termes));

  const t1 = arith(20, 20, 5);
  voit(1, 0, 140, t1); f.juste(1, null, pt(3, t1[3])); f.faux(1, null, pt(t1[3], 3));
  const t2 = [10, 30, 20, 40, 50];
  voit(2, 0, 60, t2); f.juste(2, null, t2[2]); f.faux(2, null, t2[1]);
  const t3 = arith(100, -20, 4);
  voit(3, 0, 120, t3); f.juste(3, null, t3.indexOf(60)); f.faux(3, null, 3);
  f.juste(4, null, "non"); f.faux(4, null, "oui");
  const t5 = arith(10, 20, 4);
  voit(5, 0, 100, t5); f.juste(5, null, nature(t5)); f.faux(5, null, "géométrique");
  const t6 = geo(5, 2, 4);
  voit(6, 0, 80, t6); f.juste(6, null, nature(t6)); f.faux(6, null, "arithmétique");
  f.juste(7, null, `=B2+${30}`); f.juste(7, null, "=b2+30"); f.juste(7, null, "B2+30"); f.juste(7, null, "=$B2+30"); f.faux(7, null, "=B$2+30"); f.faux(7, null, "=$B$2+30"); f.faux(7, null, "=B3+30"); f.faux(7, null, "=B2*30");
  f.juste(8, null, `=B2*${fq(1.05)}`); f.juste(8, null, "=B2×1,05"); f.juste(8, null, "B2*1.05"); f.faux(8, null, "=B2+1,05");

  const s9 = arith(30, 15, 3);
  voit(9, 0, 90, s9, "schema"); f.juste(9, "a)", s9.slice(1)); f.juste(9, "b)", pt(2, s9[2])); f.faux(9, "b)", pt(2, s9[1]));
  const t10 = arith(40, 20, 4);
  voit(10, 0, 140, t10); f.juste(10, "a)", t10[3]); f.juste(10, "b)", ecarts(t10)[0]); f.juste(10, "c)", t10.indexOf(120)); f.faux(10, "c)", 5);
  const t11 = geo(10, 2, 4);
  voit(11, 0, 160, t11); f.juste(11, "a)", t11[2]); f.juste(11, "b)", t11[3]); f.juste(11, "c)", t11[3] / t11[2]); f.juste(11, "d)", nature(t11));
  const t12 = arith(30, 15, 4);
  voit(12, 0, 105, t12); f.juste(12, "a)", nature(t12)); f.juste(12, "b)", "non"); f.juste(12, "c)", t12[1] - t12[0]); f.faux(12, "b)", "oui");
  const t13 = arith(30, 30, 4);
  voit(13, 0, 180, t13); f.juste(13, "a)", [t13[2], t13[3]]); f.juste(13, "b)", (t13[2] + t13[3]) / 2); f.juste(13, "c)", "non");
  const t14 = geo(160, 0.5, 4);
  voit(14, 0, 160, t14); f.juste(14, "a)", t14[1]); f.juste(14, "b)", t14[1] / t14[0]); f.juste(14, "c)", nature(t14)); f.faux(14, "b)", 2);
  const s15 = arith(500, -40, 5);
  f.juste(15, "a)", "=B2-40"); f.juste(15, "b)", "=B3-40"); f.juste(15, "c)", s15[2]); f.juste(15, "d)", s15[7 - 2]); f.faux(15, "b)", "=B2-40"); f.faux(15, "d)", arith(500, -40, 7)[7]);
  const s16 = geo(1000, 1.1, 2);
  f.juste(16, "a)", "=B2*1,1"); f.juste(16, "a)", "=B2*110%"); f.juste(16, "a)", "=$B2*(1+10%)"); f.juste(16, "b)", "=B3*1,1"); f.juste(16, "b)", "B3*1,1"); f.faux(16, "a)", "=B$2*1,1"); f.juste(16, "c)", s16.slice(1)); f.faux(16, "b)", "=B4*1,1");

  const [A, B, C] = [arith(10, 10, 4), geo(10, 2, 4), [10, 20, 25, 25, 20]];
  f.vrai("repr ex.17 tableau", [...A, ...B, ...C].every((v) => casesDe(f.exercices[16].figure).includes(String(v))));
  f.juste(17, "a)", nature(A) === "arithmétique" ? "A" : "?"); f.juste(17, "b)", nature(B) === "géométrique" ? "B" : "?"); f.juste(17, "c)", nature(C)); f.juste(17, "d)", pt(3, C[3])); f.faux(17, "c)", "arithmétique");
  const s18 = arith(12, 8, 4);
  voit(18, 0, 48, s18, "schema"); f.juste(18, "a)", "=B2+8"); f.juste(18, "b)", s18[3]); f.juste(18, "c)", pt(3, s18[3])); f.juste(18, "d)", constant(ecarts(s18)) ? "oui" : "non"); f.juste(18, "e)", nature(s18)); f.faux(18, "a)", "=B2*8");
  const t19 = geo(100, 2, 3);
  voit(19, 0, 800, t19); f.juste(19, "a)", t19[2]); f.juste(19, "b)", nature(t19)); f.juste(19, "c)", quotients(t19)[0]); f.juste(19, "d)", "=B2*2"); f.juste(19, "e)", t19[3] * 2); f.faux(19, "e)", 1200);
  const s20 = geo(500, coef(20), 3);
  f.juste(20, "a)", s20.slice(1)); f.juste(20, "b)", pt(2, s20[2])); f.juste(20, "c)", 500 * 1.2); f.juste(20, "d)", nature(s20)); f.faux(20, "b)", pt(2, s20[1]));
  f.tout();
}

fin();
