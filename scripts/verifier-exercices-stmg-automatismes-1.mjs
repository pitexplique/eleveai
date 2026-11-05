// Recalcul indépendant des feuilles STMG de la famille « automatismes-1 »
// (05/11/2026) : lib/fiches-exercices/maths-stmg-<slug>.tsx, pour les slugs
// auto-developper-factoriser, auto-equations, auto-formules,
// auto-fractions-puissances, auto-ordres-unites.
// Usage : npx --yes tsx@4 scripts/verifier-exercices-stmg-automatismes-1.mjs
import { feuille, fin } from "./verifier-exercices-stmg-lot-commun.mjs";

/* ─────────── écrire une expression à partir de ses COEFFICIENTS ─────────── */

/** a x² + b x + c, termes nuls omis, écrit comme le taperait un élève. */
function poly(a, b, c) {
  const morceaux = [];
  const ajoute = (k, lettre) => {
    if (k === 0) return;
    const abs = Math.abs(k);
    const nombre = abs === 1 && lettre ? "" : String(abs);
    morceaux.push(`${k < 0 ? "-" : morceaux.length ? "+" : ""}${nombre}${lettre}`);
  };
  ajoute(a, "x²");
  ajoute(b, "x");
  ajoute(c, "");
  return morceaux.join("");
}
/** (ax + b)(cx + d) développé. */
const developpe = (a, b, c, d) => poly(a * c, a * d + b * c, b * d);
const pgcd = (a, b) => (b === 0 ? Math.abs(a) : pgcd(b, a % b));
/** A x² + B x, factorisé par son plus grand facteur commun. */
function facteurCommun(A, B) {
  const k = pgcd(A, B);
  return `${k}x(${poly(0, A / k, B / k)})`;
}
/** A x² − C, avec A et C carrés : (ux − v)(ux + v). */
function differenceCarres(A, C) {
  const u = Math.sqrt(A);
  const v = Math.sqrt(C);
  const ux = u === 1 ? "x" : `${u}x`;
  return `(${ux}-${v})(${ux}+${v})`;
}
/** Les deux écritures s'accordent-elles en un point ? */
const memeValeur = (f, g, x) => Math.abs(f(x) - g(x)) < 1e-9;

/* ═════════════════════ auto-developper-factoriser ═════════════════════ */
{
  const f = await feuille("auto-developper-factoriser");

  // ★
  f.juste(1, null, developpe(1, 3, 1, 5)); f.faux(1, null, "x²+15");
  f.juste(2, null, developpe(2, -3, 1, 4)); f.faux(2, null, "2x²-12"); f.faux(2, null, "(2x-3)(x+4)");
  f.juste(3, null, 3 * -5 + 2 * 2); f.faux(3, null, -15); f.faux(3, null, 4);
  f.juste(4, null, developpe(1, 6, 1, 6)); f.faux(4, null, "x²+36"); f.faux(4, null, "(x+6)^2");
  f.juste(5, null, developpe(1, -4, 1, -4)); f.faux(5, null, "x²-8x-16"); f.faux(5, null, "x²-16");
  f.juste(6, null, facteurCommun(4, 10)); f.faux(6, null, "x(4x+10)"); f.faux(6, null, "2(2x²+5x)"); f.faux(6, null, "4x²+10x");
  f.juste(7, null, `${pgcd(6, 9)}x`); f.faux(7, null, "3"); f.faux(7, null, "x");
  f.juste(8, null, differenceCarres(1, 49)); f.faux(8, null, "(x-7)^2"); f.faux(8, null, "x²-49");
  f.juste(8, null, "(x+7)(x-7)");

  // ★★
  f.juste(9, "a)", developpe(1, 8, 1, 3)); f.juste(9, "b)", (20 + 8) * (20 + 3)); f.vrai("ex.9 b) deux formes", 400 + 220 + 24 === 644); f.faux(9, "a)", "x²+24");
  f.juste(10, "a)", developpe(3, 2, 3, 2)); f.juste(10, "b)", (3 * 10 + 2) ** 2); f.faux(10, "a)", "3x²+12x+4"); f.faux(10, "a)", "9x²+4");
  f.juste(11, "a)", (1 + 5) ** 2); f.juste(11, "b)", 1 ** 2 + 25); f.juste(11, "c)", `${2 * 5}x`); f.juste(11, "c)", "2×5×x"); f.juste(11, "c)", "x×10"); f.faux(11, "c)", "5x"); f.faux(11, "c)", 10);
  // (30 − x)(100 + 10x)
  f.juste(12, "a)", poly(-1 * 10, 30 * 10 - 100, 30 * 100)); f.juste(12, "b)", (30 - 5) * (100 + 10 * 5));
  f.juste(13, "a)", "(b+a)x"); f.juste(13, "b)", 6 * (120 + 80)); f.faux(13, "a)", "ax+bx"); f.faux(13, "a)", "abx");
  f.juste(14, "a)", facteurCommun(6, 15)); f.juste(14, "b)", "5+2x"); f.juste(14, "c)", 3 * 4 * (2 * 4 + 5)); f.vrai("ex.14 c) deux formes", 6 * 16 + 15 * 4 === 156);
  f.faux(14, "a)", "6x²+15x");
  f.juste(15, "a)", "-9+x^2"); f.juste(15, "b)", differenceCarres(1, 3 ** 2)); f.juste(15, "c)", 13 ** 2 - 9); f.faux(15, "b)", "(x-3)^2");
  f.vrai("ex.16 a) seule B a un plus", ["x²-25", "x²+16", "4x²-9", "49x²-1"].filter((e) => e.includes("+")).length === 1);
  f.juste(16, "a)", "b"); f.faux(16, "a)", "A");
  f.juste(16, "b)", differenceCarres(1, 25)); f.juste(16, "c)", differenceCarres(4, 9)); f.faux(16, "c)", "(4x-3)(4x+3)");
  f.enonceDit(16, "B $= x^2 + 16$");

  // ★★★
  f.juste(17, "a)", developpe(1, 6, 1, 6)); f.juste(17, "b)", poly(0, 2 * 6, 6 * 6)); f.juste(17, "c)", "12(3+x)"); f.juste(17, "d)", 26 ** 2 - 20 ** 2); f.faux(17, "b)", "(x+6)^2-x^2");
  f.vrai("ex.17 c) 12(x+3) = 12x+36", memeValeur((x) => 12 * (x + 3), (x) => (x + 6) ** 2 - x ** 2, 7));
  // (8 + x)(200 − 10x)
  f.juste(18, "a)", poly(-10, 8 * -10 + 200, 8 * 200)); f.juste(18, "b)", "10x(12-x)"); f.juste(18, "c)", (8 + 5) * (200 - 50) - 8 * 200); f.faux(18, "b)", "10x(12+x)"); f.faux(18, "b)", "120x-10x²");
  f.vrai("ex.18 b) gain", memeValeur((x) => (8 + x) * (200 - 10 * x) - 1600, (x) => 120 * x - 10 * x * x, 3));
  f.vrai("ex.18 b) forme factorisée", memeValeur((x) => 10 * x * (12 - x), (x) => 120 * x - 10 * x * x, 3));
  f.juste(19, "a)", 101 ** 2); f.juste(19, "b)", 98 ** 2); f.juste(19, "c)", 52 ** 2 - 48 ** 2); f.faux(19, "a)", "10 001"); f.faux(19, "c)", "(52-48)(52+48)");
  f.juste(20, "a)", developpe(2, 3, 2, 3)); f.juste(20, "b)", poly(4, 12, 0)); f.juste(20, "c)", facteurCommun(4, 12)); f.juste(20, "d)", (2 * 5 + 3) ** 2 - 9); f.faux(20, "c)", "2x(2x+6)");

  f.tout();
}

/* ═══════════════════════════ auto-equations ═══════════════════════════ */
{
  const f = await feuille("auto-equations");
  /** ax + b = cx + d */
  const resout = (a, b, c, d) => (d - b) / (a - c);

  // ★
  f.juste(1, null, resout(3, 4, 0, 19)); f.faux(1, null, 23 / 3);
  f.juste(2, null, resout(7, -2, 4, 16)); f.faux(2, null, 14 / 3);
  f.juste(3, null, resout(5, 9, 2, -6)); f.faux(3, null, 5);
  // 2x − 3 ≤ 7 : coefficient positif, le sens reste
  f.juste(4, null, `x ≤ ${(7 + 3) / 2}`); f.juste(4, null, `x <= ${(7 + 3) / 2}`); f.faux(4, null, "x ≥ 5"); f.faux(4, null, "5");
  // −3x + 2 ≥ 14 : coefficient négatif, le sens se retourne
  f.juste(5, null, `x ≤ ${(14 - 2) / -3}`); f.juste(5, null, `]-∞ ; ${(14 - 2) / -3}]`); f.faux(5, null, "x ≥ -4"); f.faux(5, null, "x ≤ 4");
  f.vrai("ex.5 test", -3 * -5 + 2 >= 14 && !(-3 * -3 + 2 >= 14));
  f.juste(6, null, [Math.sqrt(81), -Math.sqrt(81)]); f.juste(6, null, "x = -9 ou x = 9"); f.faux(6, null, 9); f.faux(6, null, "x²=81");
  f.vrai("ex.7 aucune solution", -16 < 0);
  f.juste(7, null, 0); f.juste(7, null, "aucune"); f.faux(7, null, 2); f.faux(7, null, -4);
  f.juste(8, null, [3, -7]); f.faux(8, null, "-3 ; 7"); f.faux(8, null, 3);
  f.vrai("ex.8 test", (3 - 3) * (3 + 7) === 0 && (-7 - 3) * (-7 + 7) === 0);

  // ★★
  const mois = resout(12, 30, 7, 90);
  f.juste(9, "a)", "12x+30"); f.juste(9, "b)", mois); f.juste(9, "c)", 30 + 12 * mois); f.vrai("ex.9 c) B", 90 + 7 * mois === 174); f.faux(9, "a)", "30x+12");
  f.juste(10, "a)", "-30x+900"); f.juste(10, "b)", `x ≤ ${(300 - 900) / -30}`); f.faux(10, "b)", "x ≥ 20");
  f.juste(11, "a)", `x < ${-28 / -4}`); f.juste(11, "b)", `x > ${35 / -5}`); f.faux(11, "a)", "x > 7"); f.faux(11, "a)", "x < -7"); f.faux(11, "b)", "x < -7");
  f.enonceDit(12, "On note $x$ le nombre d'heures");
  f.juste(12, "a)", `x ≤ ${(900 - 400) / 50}`); f.juste(12, "b)", 400 + 50 * 11 <= 900 ? "oui" : "non"); f.faux(12, "a)", "x ≤ 18");
  f.juste(13, "a)", [Math.sqrt(144), -Math.sqrt(144)]); f.juste(13, "b)", Math.sqrt(144)); f.faux(13, "b)", -12); f.faux(13, "a)", 72);
  f.juste(14, "a)", 125 / 5); f.juste(14, "a)", "t²=25"); f.juste(14, "a)", "t^2=25"); f.faux(14, "a)", 125); f.juste(14, "b)", [Math.sqrt(125 / 5), -Math.sqrt(125 / 5)]); f.juste(14, "c)", Math.sqrt(125 / 5)); f.faux(14, "c)", 25);
  f.juste(15, "a)", [20, 60]); f.juste(15, "b)", (40 - 20) * (60 - 40)); f.faux(15, "a)", "20 ; -60");
  f.vrai("ex.15 a) test", (20 - 20) * (60 - 20) === 0 && (60 - 20) * (60 - 60) === 0);
  const p16 = (x) => (x - 1) * (x - 3);
  f.juste(16, "a)", p16(9)); f.juste(16, "b)", p16(9) === 8 ? "oui" : "non"); f.juste(16, "c)", p16(5)); f.juste(16, "d)", p16(5) === 8 ? "oui" : "non");
  f.vrai("ex.16 Théo : x − 1 = 8 donne 9", 8 + 1 === 9);

  // ★★★
  const seuil = (180 - 120) / (0.2 - 0.15);
  f.juste(17, "a)", "0,2x+120"); f.juste(17, "b)", seuil); f.juste(17, "c)", `x ≤ ${Math.round(seuil)}`);
  f.juste(17, "d)", 120 + 0.2 * 3000 < 180 + 0.15 * 3000 ? "A" : "B"); f.juste(17, "d)", "contrat B"); f.faux(17, "d)", "A"); f.faux(17, "d)", "contrat A");
  f.vrai("ex.17 d)", Math.abs(120 + 0.2 * 3000 - 720) < 1e-9 && Math.abs(180 + 0.15 * 3000 - 630) < 1e-9);
  const parVoyage = (1480 - 80) / 35;
  f.juste(18, "a)", `x ≤ ${parVoyage}`); f.juste(18, "b)", Math.ceil(100 / parVoyage)); f.juste(18, "c)", 100 - 2 * parVoyage); f.faux(18, "b)", 2);
  f.juste(19, "a)", 15 - 6 * 2); f.juste(19, "b)", 15 / 6); f.juste(19, "c)", `x > ${(-9 - 15) / -6}`); f.faux(19, "c)", "x < 4");
  const cote = Math.sqrt(225);
  f.juste(20, "a)", [15, -15]); f.juste(20, "b)", cote ** 2 === 225 && (-cote) ** 2 === 225 ? "oui" : "non"); f.faux(20, "b)", "non"); f.juste(20, "c)", cote); f.juste(20, "d)", 4 * cote * 12); f.faux(20, "d)", 225 * 12);

  f.tout();
}

/* ═══════════════════════════ auto-formules ═══════════════════════════ */
{
  const f = await feuille("auto-formules");
  /** (ax + b) − (cx + d) réduit. */
  const moins = (a, b, c, d) => poly(0, a - c, b - d);

  // ★
  f.juste(1, null, moins(4, 7, 1, 2)); f.faux(1, null, "3x+9"); f.faux(1, null, "(4x+7)-(x+2)");
  f.juste(2, null, moins(2, -5, 3, -1)); f.faux(2, null, "-x-6"); f.juste(2, null, "-4-x");
  f.juste(3, null, "R=C+B"); f.faux(3, null, "R = B - C"); f.vrai("ex.3 test", 700 === 300 + 400 && 300 === 700 - 400);
  f.juste(4, null, "t = d÷v"); f.juste(4, null, "d/v"); f.faux(4, null, "t = v/d"); f.faux(4, null, "t = d×v");
  f.juste(5, null, "p"); f.faux(5, null, "q");
  f.juste(6, null, 2400 - 1400); f.faux(6, null, 3800);
  f.juste(7, null, 200 * (1 + 20 / 100)); f.faux(7, null, 220);
  f.juste(8, null, 300 + 12 * 50); f.faux(8, null, (300 + 12) * 50);

  // ★★
  f.juste(9, "a)", moins(5, 6, 2, -4)); f.juste(9, "b)", (6 + 4) - (6 - 4)); f.faux(9, "a)", "3x+2"); f.faux(9, "a)", "(5x+6)-(2x-4)");
  f.juste(10, "a)", moins(15, 200, 9, 500)); f.juste(10, "b)", 15 * 100 + 200 - (9 * 100 + 500)); f.faux(10, "a)", "6x+700");
  f.juste(11, "a)", "v = d÷t"); f.juste(11, "b)", 90 / 2.5); f.faux(11, "b)", 225); f.faux(11, "a)", "v = t/d");
  f.juste(12, "a)", "(p-2b)/2"); f.juste(12, "b)", 46 / 2 - 8); f.faux(12, "a)", "p-2b"); f.vrai("ex.12 test", 2 * (15 + 8) === 46);
  f.juste(13, "a)", "v = tq"); f.juste(13, "b)", 125 * 8); f.faux(13, "a)", "v = q/t");
  f.juste(14, "a)", 1 + 5.5 / 100); f.juste(14, "b)", 21.1 / 1.055); f.faux(14, "b)", 21.1 * (1 - 0.055)); f.faux(14, "a)", "1+5,5/100");
  f.vrai("ex.14 corrigé 19,94", Math.abs(21.1 * (1 - 0.055) - 19.94) < 0.005);
  f.juste(15, "a)", "(c-f)÷u"); f.juste(15, "b)", (2000 - 800) / 15); f.faux(15, "a)", "c/u-f");
  f.juste(16, "a)", "V = A + M"); f.juste(16, "b)", "a=v-m"); f.juste(16, "c)", 180 + 420); f.faux(16, "b)", "A = M - V");

  // ★★★
  const heures = (285 - 60) / 45;
  f.juste(17, "a)", 60 + 45 * 3); f.juste(17, "b)", "x=(c-f)/u"); f.juste(17, "c)", heures); f.juste(17, "d)", 285 * 1.1); f.faux(17, "c)", 285 / 45);
  f.vrai("ex.17 c) test", 60 + 45 * heures === 285);
  f.juste(18, "a)", "b×t"); f.juste(18, "b)", 0.8 * 25000); f.juste(18, "c)", "a÷t"); f.juste(18, "d)", 18000 / 0.72); f.faux(18, "d)", 18000 * 0.72); f.faux(18, "c)", "b=t/a");
  f.juste(19, "a)", poly(0, 25 - 12, -650)); f.juste(19, "b)", 25 * 100 - (12 * 100 + 650)); f.juste(19, "c)", 650 / (25 - 12)); f.faux(19, "a)", "13x+650");
  f.vrai("ex.19 c) test", 25 * 50 === 12 * 50 + 650);
  f.juste(20, "a)", 1.8 * 30 + 32); f.juste(20, "a)", "86 °F"); f.faux(20, "a)", "68 °F"); f.juste(20, "b)", "c=(f-32)÷1,8"); f.juste(20, "c)", (212 - 32) / 1.8); f.juste(20, "d)", (98.6 - 32) / 1.8); f.faux(20, "b)", "f/1,8-32");

  f.tout();
}

/* ═════════════════════ auto-fractions-puissances ═════════════════════ */
{
  const f = await feuille("auto-fractions-puissances");
  /** a/b en fraction irréductible, écrite au clavier. */
  const frac = (a, b) => {
    const d = pgcd(a, b);
    return `${a / d}/${b / d}`;
  };
  const somme = (a, b, c, d) => frac(a * d + c * b, b * d);
  const produit = (a, b, c, d) => frac(a * c, b * d);
  /** Un nombre en écriture scientifique, exposant calculé. */
  const sci = (x) => {
    const e = Math.floor(Math.log10(x) + 1e-12);
    const m = Number((x / 10 ** e).toFixed(8));
    return `${String(m).replace(".", ",")}×10^${e}`;
  };

  // ★
  f.juste(1, null, somme(1, 2, 1, 3)); f.juste(1, null, "(5)/(6)"); f.faux(1, null, "2/5"); f.faux(1, null, "1/2+1/3");
  f.juste(2, null, (120 * 3) / 4); f.faux(2, null, 30);
  f.juste(3, null, 3 / 4 > 5 / 8 ? "3/4" : "5/8"); f.faux(3, null, "5/8");
  f.juste(4, null, `2^${3 + 4}`); f.faux(4, null, "2^12"); f.faux(4, null, "4^7"); f.faux(4, null, "2^3×2^4");
  f.juste(5, null, 10 ** (5 - 2)); f.faux(5, null, "10^5×10^-2"); f.faux(5, null, "10000");
  f.juste(6, "a)", 7 ** 0); f.juste(6, "b)", frac(1, 2 ** 3)); f.juste(6, "b)", 2 ** -3); f.faux(6, "a)", 0); f.faux(6, "b)", -8); f.faux(6, "b)", "2^-3");
  f.juste(7, null, sci(34000)); f.juste(7, null, "3,4 x 10^4"); f.juste(7, null, "3,4*10^(4)"); f.faux(7, null, "34×10^3"); f.faux(7, null, "34000");
  f.juste(8, null, 3 / 8); f.faux(8, null, "3,8"); f.faux(8, null, "3/8");

  // ★★
  f.juste(9, "a)", produit(1, 2, 1, 5)); f.juste(9, "b)", (() => { const [n, d] = produit(1, 2, 1, 5).split("/").map(Number); return somme(1, 4, n, d); })());
  f.vrai("ex.9 b) 7/20", Math.abs(1 / 4 + (1 / 2) * (1 / 5) - 7 / 20) < 1e-12); f.faux(9, "b)", "3/20"); f.faux(9, "b)", 0.35);
  f.juste(10, "a)", (300 * 2) / 3); f.juste(10, "b)", ((300 * 2) / 3) / 4); f.juste(10, "c)", produit(2, 3, 1, 4)); f.vrai("ex.10 c)", Math.abs(50 / 300 - 1 / 6) < 1e-12);
  f.faux(10, "c)", "2/12");
  f.juste(11, "a)", [(7 * 30) / 10, (2 * 30) / 3]); f.juste(11, "b)", 7 / 10 > 2 / 3 ? "Noa" : "Malik"); f.faux(11, "a)", "20 ; 21"); f.faux(11, "b)", "Malik");
  const parts = [[3, 8], [5, 9], [3, 5], [7, 10]].filter(([a, b]) => a / b < 1 / 2);
  f.vrai("ex.12 une seule part sous la moitié", parts.length === 1);
  f.juste(12, null, `${parts[0][0]}/${parts[0][1]}`); f.faux(12, null, "5/9"); f.faux(12, null, "3/5");
  f.juste(13, "a)", `2^${30 - 20}`); f.juste(13, "b)", 2 ** 10); f.faux(13, "a)", "2^30÷2^20");
  f.juste(14, "a)", `2^${3 * 4}`); f.juste(14, "b)", `2^${3 * 4 - 5}`); f.juste(14, "c)", 2 ** (3 * 4 - 5)); f.faux(14, "a)", "2^7"); f.faux(14, "c)", "2^7");
  f.juste(15, "a)", sci(150000000)); f.juste(15, "a)", "1,5×10^8 km"); f.juste(15, "b)", 150000000 / (3 * 10 ** 5)); f.faux(15, "a)", "15×10^7"); f.faux(15, "b)", 50);
  f.vrai("ex.15 un peu plus de 8 minutes", 500 / 60 > 8 && 500 / 60 < 9);
  f.juste(16, "a)", 6 * 2.5); f.juste(16, "b)", sci(6e6 * 2.5e3)); f.juste(16, "b)", "1,5×10^10 kWh"); f.faux(16, "b)", "15×10^9"); f.faux(16, "b)", "1,5×10^9");

  // ★★★
  f.juste(17, "a)", somme(1, 3, 1, 4)); f.juste(17, "b)", frac(12 - 4 - 3, 12)); f.juste(17, "c)", (48000 * 5) / 12);
  const postes = { livres: 48000 / 3, "numérique": 48000 / 4, animations: 48000 - 48000 / 3 - 48000 / 4 };
  f.juste(17, "d)", Object.entries(postes).sort((a, b) => b[1] - a[1])[0][0]); f.juste(17, "d)", "les animations"); f.faux(17, "d)", "livres");
  f.vrai("ex.17 total", postes.livres === 16000 && postes["numérique"] === 12000 && postes.animations === 20000);
  const tries = (3200 * 5) / 8;
  f.juste(18, "a)", tries); f.juste(18, "b)", (tries * 3) / 5); f.juste(18, "c)", produit(5, 8, 3, 5)); f.juste(18, "d)", (tries * 3) / 5 / 3200 >= 1 / 2 ? "oui" : "non");
  f.faux(18, "b)", (3200 * 3) / 5);
  const capacite = 2e4 * 5e12;
  f.juste(19, "a)", sci(capacite)); f.juste(19, "b)", sci(capacite / 2e9)); f.juste(19, "c)", capacite / 2e9); f.juste(19, "a)", "1×10^17 octets"); f.juste(19, "b)", "5×10^7 vidéos"); f.faux(19, "b)", "0,5×10^8"); f.faux(19, "a)", "10×10^16");
  f.juste(20, "a)", sci(0.000005)); f.juste(20, "a)", "5×10^-6 m"); f.juste(20, "b)", `10^${Math.round(Math.log10(0.01))}`); f.juste(20, "c)", 0.01 / 0.000005); f.faux(20, "a)", "5×10^6"); f.faux(20, "b)", "0,01");

  f.tout();
}

/* ═════════════════════════ auto-ordres-unites ═════════════════════════ */
{
  const f = await feuille("auto-ordres-unites");
  const pct = (t, x) => (x * t) / 100;

  // ★
  f.juste(1, null, pct(25, 360)); f.faux(1, null, 335);
  f.juste(2, null, pct(75, 80)); f.faux(2, null, 20);
  f.juste(3, null, 240 * 0.25); f.faux(3, null, "240×0,25");
  f.juste(4, null, 120 * 1.5); f.faux(4, null, 60); f.faux(4, null, "120×1,5");
  f.juste(5, null, 40 * 400); f.faux(5, null, 1600); f.faux(5, null, 39 * 412);
  f.juste(6, null, 2 * 60 + 45); f.faux(6, null, 245);
  f.juste(7, null, 2.4 * 1000); f.faux(7, null, 240);
  f.juste(8, "a)", 0.5 * 60); f.juste(8, "b)", 1.5 * 60); f.juste(8, "c)", 0.75 * 60); f.faux(8, "a)", 50);

  // ★★
  f.juste(9, "a)", pct(20, 160)); f.juste(9, "b)", 160 - pct(20, 160)); f.faux(9, "b)", 140);
  f.juste(10, "a)", 2000 * 3); f.juste(10, "b)", 61380 / (2000 * 3) > 5 ? "non" : "oui"); f.vrai("ex.10 exact", Math.abs(1980 * 3.1 - 6138) < 1e-6);
  f.faux(10, "a)", 2003);
  f.juste(11, null, 25000 / 50); f.juste(11, null, "environ 500 jeux"); f.juste(11, null, "≈ 500"); f.faux(11, null, "environ 5000 jeux"); f.vrai("ex.11 proche du vrai", 23760 / 48 === 495); f.faux(11, null, 5000); f.faux(11, null, 25000 * 50);
  f.vrai("ex.12 a) 40 min = 2/3 h", 40 * 3 === 60 * 2); f.juste(12, "a)", "2/3"); f.juste(12, "a)", "(2)/(3)"); f.juste(12, "b)", 75 * (40 / 60)); f.faux(12, "b)", 75 * 40); f.faux(12, "a)", "0,4"); f.faux(12, "a)", "40/60");
  f.juste(13, "a)", 3.5 * 1000); f.juste(13, "b)", (3.5 * 1000) / 25); f.faux(13, "b)", 3.5 / 25);
  const trajet = 11 * 60 + 15 - (8 * 60 + 45);
  f.juste(14, "a)", trajet); f.juste(14, "b)", trajet / 60); f.faux(14, "b)", "2,30"); f.faux(14, "b)", "150/60");
  f.juste(15, "a)", 70 * 60); f.juste(15, "b)", 4000 * 25); f.faux(15, "b)", 1000000);
  f.juste(16, "a)", 8 * 250); f.juste(16, "b)", (8 * 250) / 1000); f.juste(16, "c)", ((8 * 250) / 1000) * 1.5); f.faux(16, "c)", 2000 * 1.5);

  // ★★★
  const duree = 135 / 90;
  const horaire = (m) => `${Math.floor(m / 60)} h ${m % 60}`;
  const depart = 7 * 60 + 45;
  f.juste(17, "a)", duree); f.juste(17, "b)", duree * 60); f.juste(17, "c)", horaire(depart + duree * 60)); f.juste(17, "c)", "9h15"); f.juste(17, "c)", "9h15min"); f.juste(17, "c)", "à 9 h 15"); f.juste(17, "d)", horaire(depart + duree * 60 + 20)); f.faux(17, "c)", "9 h 35"); f.faux(17, "c)", "à 9 h 35");
  f.juste(18, "a)", 700 * 20); f.juste(18, "a)", "environ 14 000 kg"); f.juste(18, "b)", (690 * 18) / 1000); f.juste(18, "c)", Math.floor(12000 / 18)); f.faux(18, "c)", 667);
  f.vrai("ex.18 c) limite", 666 * 18 === 11988 && 667 * 18 === 12006 && 12000 / 18 > 666.6 && 12000 / 18 < 666.7);
  const kwh = 6 * 1.5;
  f.juste(19, "a)", 1 + 30 / 60); f.juste(19, "b)", kwh); f.juste(19, "c)", kwh * 0.2 * 30); f.juste(19, "d)", pct(20, kwh * 0.2 * 30)); f.faux(19, "a)", "1,30");
  f.vrai("ex.19 piège 1,30 h = 1 h 18", Math.round(0.3 * 60) === 18);
  f.juste(20, "a)", 40000 * 20); f.juste(20, "b)", pct(25, 40000)); f.juste(20, "c)", pct(25, 40000) * 8); f.juste(20, "d)", 40000 * 20 + pct(25, 40000) * 8); f.faux(20, "a)", 80000);

  f.tout();
}

fin();
