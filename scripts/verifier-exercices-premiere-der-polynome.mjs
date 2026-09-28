// Recalcul indépendant de la feuille « Dériver un polynôme » (1re sans spé,
// 28/09/2026) : lib/fiches-exercices/maths-premiere-der-polynome.tsx
//
// Chaque dérivée écrite dans un corrigé est LUE (y compris l'étape
// intermédiaire, « 4 \times 2x - 3 = 8x - 3 ») et comparée au taux
// d'accroissement de la fonction de l'énoncé, en onze points. Chaque nombre
// dérivé annoncé, chaque image, chaque case de tableau est recalculée ; chaque
// tangente dessinée est testée. Plus les règles de rendu et le socle commun.
// Usage : node scripts/verifier-exercices-premiere-der-polynome.mjs

import { ouvrir, d, poly } from "./verifier-exercices-premiere-der-commun.mjs";

const F = ouvrir("lib/fiches-exercices/maths-premiere-der-polynome.tsx", "der_polynome");
const { exercice, estLaCourbe, tangente, annonce, derivee, dit, vaut, vrai, dessin } = F;
/** Le tableau de l'exercice k : chaque case de la ligne est G(entête). */
const tableauSuit = (k, role, G) => {
  const [entete, ligne] = dessin(k, role, "tableau").args;
  entete.slice(1).forEach((x, i) => vaut(`${k}. tableau, ${entete[0]} = ${x}`, G(Number(String(x).replace(",", "."))), ligne[i + 1], 1e-6));
};
const D = (f, x) => d(f, x); // lisibilité
const e5 = { eps: 1e-5 };

/* ── ★ ── */
exercice(1, () => {
  derivee(1, "5 \\times 2x", "10x", poly(5, 0, 0));
  derivee(1, "-2 \\times 3x^2", "-6x^2", poly(-2, 0, 0, 0));
  derivee(1, "0{,}5 \\times 2x", "x", poly(0.5, 0, 0));
  derivee(1, "-7 \\times 1", "-7", poly(-7, 0));
});
exercice(2, () => {
  derivee(2, "f'(x)", "2x + 3x^2", poly(1, 1, 0, 0));
  derivee(2, "3x^2 - 1 + 0", "3x^2 - 1", poly(1, 0, -1, 4));
});
exercice(3, () => {
  derivee(3, "4 \\times 2x - 3", "8x - 3", poly(4, -3, 8));
  derivee(3, "g'(x)", "-2x + 6", poly(-1, 6, -5));
  derivee(3, "0{,}5 \\times 2x + 2", "x + 2", poly(0.5, 2, 0));
  const g = poly(-1, 6, -5);
  annonce(3, "g'(1) = -2 + 6 = 4", D(g, 1), e5);
  estLaCourbe(3, "schema", 0, g, "g");
  tangente(3, "schema", 1, g, 1);
});
exercice(4, () => {
  const f = poly(2, -6, 1, -4);
  derivee(4, "f'(x)", "6x^2 - 12x + 1", f);
  estLaCourbe(4, "schema", 0, f);
  tangente(4, "schema", 1, f, 0);
});
exercice(5, () => {
  const f = poly(1, 0, -4, 1);
  derivee(5, "f'(x)", "3x^2 - 4", f);
  annonce(5, "f'(2) = 3 \\times 4 - 4 = 8", D(f, 2), e5);
  annonce(5, "f'(0) = -4", D(f, 0), e5);
  annonce(5, "f'(-1) = 3 \\times 1 - 4 = -1", D(f, -1), e5);
  annonce(5, "f(2) = 8 - 8 + 1 = 1", f(2));
  estLaCourbe(5, "schema", 0, f);
  tangente(5, "schema", 1, f, 0);
});
exercice(6, () => {
  const f = poly(3, -2, 7);
  derivee(6, "f'(x)", "-2 + 6x", f);
  derivee(6, "f'(x)", "6x - 2", f);
});
exercice(7, () => derivee(7, "g'(x)", "x^2 - 4x", poly(1 / 3, -2, 0, 5)));
exercice(8, () => {
  const f = poly(-1, 4, 0);
  derivee(8, "f'(x)", "-2x + 4", f);
  annonce(8, "f'(1) = -2 + 4 = 2", D(f, 1), e5);
  annonce(8, "f'(2) = -4 + 4 = 0", D(f, 2), e5);
  annonce(8, "f'(3) = -6 + 4 = -2", D(f, 3), e5);
  estLaCourbe(8, "figure", 0, f);
  tangente(8, "figure", 1, f, 1);
  tangente(8, "figure", 2, f, 3);
});

/* ── ★★ ── */
exercice(9, () => {
  const dd = poly(4.9, 0, 0);
  derivee(9, "4{,}9 \\times 2t", "9{,}8t", dd, { variable: "t" });
  annonce(9, "v(1) = 9{,}8", D(dd, 1), e5);
  annonce(9, "v(2) = 19{,}6", D(dd, 2), e5);
  annonce(9, "v(3) = 29{,}4", D(dd, 3), e5);
  annonce(9, "19{,}6 \\times 3{,}6 = 70{,}56", 19.6 * 3.6, { eps: 1e-9 });
  annonce(9, "d(2) = 19{,}6", dd(2), { eps: 1e-9 });
  tableauSuit(9, "schema", (t) => D(dd, t));
});
exercice(10, () => {
  const C = poly(0.5, 10, 200);
  derivee(10, "0{,}5 \\times 2q + 10", "q + 10", C, { variable: "q" });
  annonce(10, "C'(20) = 30", D(C, 20), e5);
  annonce(10, "C(20) = 200 + 200 + 200 = 600", C(20));
  annonce(10, "C(21) = 220{,}5 + 210 + 200 = 630{,}5", C(21));
  annonce(10, "C(21) - C(20) = 30{,}5", C(21) - C(20), { eps: 1e-9 });
});
exercice(11, () => {
  const h = poly(-0.25, 1.5, 0, 2);
  derivee(11, "-0{,}25 \\times 3x^2 + 1{,}5 \\times 2x", "-0{,}75x^2 + 3x", h);
  annonce(11, "h'(2) = -0{,}75 \\times 4 + 6 = 3", D(h, 2), e5);
  annonce(11, "h'(4) = -0{,}75 \\times 16 + 12 = 0", D(h, 4), e5);
  annonce(11, "h'(5) = -0{,}75 \\times 25 + 15 = -3{,}75", D(h, 5), e5);
  annonce(11, "-0{,}75 \\times 25 = -18{,}75", -0.75 * 25);
  dit(11, "$37{,}5$ %");
  estLaCourbe(11, "figure", 0, h, "h");
  tangente(11, "figure", 1, h, 2);
  tangente(11, "figure", 2, h, 4);
});
exercice(12, () => {
  const N = poly(-0.5, 6, 0, 40);
  derivee(12, "-0{,}5 \\times 3t^2 + 6 \\times 2t", "-1{,}5t^2 + 12t", N, { variable: "t" });
  annonce(12, "N'(2) = -1{,}5 \\times 4 + 24 = 18", D(N, 2), e5);
  annonce(12, "N'(8) = -1{,}5 \\times 64 + 96 = 0", D(N, 8), e5);
  annonce(12, "N'(10) = -1{,}5 \\times 100 + 120 = -30", D(N, 10), e5);
  annonce(12, "N(8) = -256 + 384 + 40 = 168", N(8));
  tableauSuit(12, "schema", (t) => D(N, t));
});
exercice(13, () => {
  const h = poly(-0.05, 0.75, 2);
  derivee(13, "-0{,}05 \\times 2x + 0{,}75", "-0{,}1x + 0{,}75", h);
  annonce(13, "h'(0) = 0{,}75", D(h, 0), e5);
  annonce(13, "h'(10) = -1 + 0{,}75 = -0{,}25", D(h, 10), e5);
  vaut("13. h'(7,5) = 0", D(h, 7.5), 0, 1e-5);
  annonce(13, "h(7{,}5) = 4{,}8125", h(7.5), { eps: 1e-9 });
});
exercice(14, () => {
  const R = poly(0.5, -6, 20);
  derivee(14, "0{,}5 \\times 2t - 6", "t - 6", R, { variable: "t" });
  annonce(14, "R'(2) = -4", D(R, 2), e5);
  annonce(14, "R'(6) = 0", D(R, 6), e5);
  annonce(14, "R'(8) = 2", D(R, 8), e5);
  annonce(14, "R(6) = 18 - 36 + 20 = 2", R(6));
});
exercice(15, () => {
  const T = poly(-0.5, 20, 20);
  derivee(15, "-0{,}5 \\times 2t + 20", "-t + 20", T, { variable: "t" });
  annonce(15, "T'(0) = 20", D(T, 0), e5);
  annonce(15, "T'(10) = 10", D(T, 10), e5);
  annonce(15, "T'(20) = 0", D(T, 20), e5);
  annonce(15, "T(20) = -0{,}5 \\times 400 + 400 + 20 = 220", T(20));
});
exercice(16, () => {
  const h = poly(0.5, -1.5, 0, 2);
  derivee(16, "0{,}5 \\times 3x^2 - 1{,}5 \\times 2x", "1{,}5x^2 - 3x", h);
  annonce(16, "h'(0) = 0", D(h, 0), e5);
  annonce(16, "h'(1) = 1{,}5 - 3 = -1{,}5", D(h, 1), e5);
  annonce(16, "h'(2) = 6 - 6 = 0", D(h, 2), e5);
  annonce(16, "h'(3) = 13{,}5 - 9 = 4{,}5", D(h, 3), e5);
  vaut("16. B au niveau du sol", h(2), 0);
  estLaCourbe(16, "figure", 0, h, "h");
  tangente(16, "figure", 1, h, 1);
});

/* ── ★★★ ── */
exercice(17, () => {
  const N = poly(-1, 15, 0, 100);
  derivee(17, "-3t^2 + 15 \\times 2t", "-3t^2 + 30t", N, { variable: "t" });
  annonce(17, "N'(2) = -12 + 60 = 48", D(N, 2), e5);
  annonce(17, "N'(5) = -75 + 150 = 75", D(N, 5), e5);
  annonce(17, "N'(8) = -192 + 240 = 48", D(N, 8), e5);
  annonce(17, "N'(10) = -300 + 300 = 0", D(N, 10), e5);
  annonce(17, "N(8) = 548", N(8));
  annonce(17, "N(5) = 350", N(5));
  dit(17, "$600$ malades");
  vaut("17. le pic à 600", N(10), 600);
  estLaCourbe(17, "figure", 0, (t) => N(t) / 100, "N / 100");
});
exercice(18, () => {
  const B = poly(-1, 12, -21, -10);
  derivee(18, "-3x^2 + 12 \\times 2x - 21", "-3x^2 + 24x - 21", B);
  annonce(18, "B'(1) = -3 + 24 - 21 = 0", D(B, 1), e5);
  annonce(18, "B'(4) = -48 + 96 - 21 = 27", D(B, 4), e5);
  annonce(18, "B'(7) = -147 + 168 - 21 = 0", D(B, 7), e5);
  annonce(18, "B'(9) = -243 + 216 - 21 = -48", D(B, 9), e5);
  annonce(18, "B(4) = -64 + 192 - 84 - 10 = 34", B(4));
  annonce(18, "B(5) = -125 + 300 - 105 - 10 = 60", B(5));
  annonce(18, "B(5) - B(4) = 26", B(5) - B(4));
  dit(18, "$2\\,700$ €", "$4\\,800$ €");
  tableauSuit(18, "schema", (x) => D(B, x));
});
exercice(19, () => {
  const P = poly(-0.1, 1.5, 0, 2);
  derivee(19, "-0{,}1 \\times 3t^2 + 1{,}5 \\times 2t", "-0{,}3t^2 + 3t", P, { variable: "t" });
  annonce(19, "P'(1) = -0{,}3 + 3 = 2{,}7", D(P, 1), e5);
  annonce(19, "P'(5) = -0{,}3 \\times 25 + 15 = 7{,}5", D(P, 5), e5);
  annonce(19, "P'(10) = -0{,}3 \\times 100 + 30 = 0", D(P, 10), e5);
  annonce(19, "P(10) = -100 + 150 + 2 = 52", P(10));
  dit(19, "$27\\,000$ habitants", "$75\\,000$ habitants", "$520\\,000$ habitants");
  vrai("19. t = 5 : le plus rapide des trois", D(P, 5) > D(P, 1) && D(P, 5) > D(P, 10));
});
exercice(20, () => {
  const h = poly(-5, 20, 1.5);
  derivee(20, "-5 \\times 2t + 20", "-10t + 20", h, { variable: "t" });
  annonce(20, "v(0) = 20", D(h, 0), e5);
  annonce(20, "v(1) = 10", D(h, 1), e5);
  annonce(20, "v(2) = 0", D(h, 2), e5);
  annonce(20, "v(3) = -10", D(h, 3), e5);
  annonce(20, "h(2) = -20 + 40 + 1{,}5 = 21{,}5", h(2));
  derivee(20, "v'(t)", "-10", (t) => -10 * t + 20, { variable: "t" });
  tableauSuit(20, "schema", (t) => D(h, t));
});

/* ── Les dessins d'appoint (28/09 au soir) ── */
/** Un tableau « terme → dérivée » : chaque paire relue et vérifiée par taux d'accroissement. */
const paires = (k, termes) => {
  const [entete, ligne] = dessin(k, "schema", "tableau").args;
  const lu = (s) => String(s).replace(/−/g, "-").replace(/,/g, "{,}").replace(/²/g, "^2").replace(/³/g, "^3").replace("(1/3)", "\\dfrac{1}{3}");
  entete.slice(1).forEach((t, i) => {
    const f = F.lire(lu(t));
    const g = F.lire(lu(ligne[i + 1]));
    vrai(`${k}. tableau : (${t})′ = ${ligne[i + 1]}`, [-2, -1, 0.5, 1, 3].every((x) => Math.abs(D(f, x) - g(x)) < 1e-5));
  });
  vaut(`${k}. tableau : ${termes} termes`, entete.length - 1, termes);
};
exercice(1, () => paires(1, 4));
exercice(2, () => paires(2, 3));
exercice(6, () => paires(6, 3));
exercice(7, () => paires(7, 3));
exercice(10, () => tableauSuit(10, "schema", poly(0.5, 10, 200)));
exercice(13, () => F.signes.juste(13, { 0: "-0{,}1x + 0{,}75" }));
exercice(14, () => tableauSuit(14, "schema", (an) => D(poly(0.5, -6, 20), (an - 1900) / 10)));
exercice(15, () => tableauSuit(15, "schema", (t) => D(poly(-0.5, 20, 20), t)));
exercice(19, () => tableauSuit(19, "schema", (an) => D(poly(-0.1, 1.5, 0, 2), (an - 1960) / 10)));

F.fin("Dériver un polynôme (1re)");
