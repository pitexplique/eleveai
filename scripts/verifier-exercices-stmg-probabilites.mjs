// Recalcul indépendant du lot « probabilités » des feuilles STMG (05/11/2026) :
// proba-conditionnelle-tableau, proba-conditionnelle-distinguer,
// proba-epreuves-independantes, proba-arbre, proba-arbre-calcul, proba-independance.
// Usage : npx --yes tsx@4 scripts/verifier-exercices-stmg-probabilites.mjs
import { feuille, fin } from "./verifier-exercices-stmg-lot-commun.mjs";

/* ─────────── proba-conditionnelle-tableau ─────────── */
{
  const f = await feuille("proba-conditionnelle-tableau");
  f.juste(1, null, "conditionnelle"); f.juste(1, null, "une probabilité conditionnelle"); f.faux(1, null, "intersection");
  f.juste(2, null, "intersection"); f.juste(2, null, "une intersection"); f.faux(2, null, "conditionnelle");
  f.juste(10, "c)", "les maisons"); f.juste(14, "c)", "au balcon"); f.juste(19, "c)", "l'agence Gare");
  // Le clavier maths n'a pas de touche indice : PA(B) se tape au clavier ordinaire.
  f.juste(3, null, "P_A(B)"); f.juste(3, null, "PA(B)"); f.juste(3, null, "pa(b)"); f.juste(3, null, "P A (B)"); f.faux(3, null, "P_B(A)"); f.faux(3, null, "PB(A)"); f.faux(3, null, "P(B)");
  f.juste(4, null, "P_B(A)"); f.juste(4, null, "PB(A)"); f.faux(4, null, "P_A(B)"); f.faux(4, null, "PA(B)");
  f.juste(5, null, 90 + 110); f.faux(5, null, 300);
  f.juste(6, null, 30 / (30 + 20)); f.faux(6, null, 30 / 100);
  f.juste(7, null, 20 / (60 + 20)); f.faux(7, null, 20 / 50);
  f.juste(8, null, 70 / (70 + 30)); f.faux(8, null, 70 / 80);

  f.juste(9, "a)", "P_A(B)"); f.juste(9, "b)", 48 / (48 + 32)); f.juste(9, "c)", 48 / (48 + 30)); f.faux(9, "c)", 48 / 80);
  f.juste(10, "a)", 140 / (140 + 60)); f.juste(10, "b)", 30 / (30 + 270)); f.juste(10, "c)", 140 / 200 > 30 / 300 ? "maison" : "immeuble"); f.faux(10, "a)", 140 / 500);
  f.juste(11, "a)", 90 / (90 + 210)); f.juste(11, "b)", 20 / (90 + 20)); f.juste(11, "c)", 180 / (20 + 180)); f.faux(11, "b)", 20 / 200);
  const soirB = 200 - 120;
  f.vrai("tableau ex.12 colonne Soir", soirB + 10 === 90);
  f.juste(12, "a)", soirB); f.juste(12, "b)", soirB / 200); f.juste(12, "c)", soirB / 90); f.faux(12, "c)", soirB / 200);
  f.juste(13, "a)", 3); f.juste(13, "b)", 12 / (28 + 12)); f.faux(13, "a)", 2);
  f.juste(14, "a)", 50 / (150 + 50)); f.juste(14, "b)", 50 / (50 + 110)); f.juste(14, "c)", "balcon"); f.faux(14, "c)", "abonnés");
  f.juste(15, "a)", 60 / (240 + 60)); f.juste(15, "b)", 60 / (140 + 60)); f.juste(15, "c)", 60 / (60 + 60));
  f.juste(16, "a)", 45 + 255); f.juste(16, "b)", 45 / 300); f.juste(16, "c)", 60 / (60 + 140)); f.juste(16, "d)", 60 / (60 + 45) === 60 / 200 ? "vrai" : "faux");

  const terRetard = 600 * 0.15;
  f.juste(17, "a)", terRetard); f.juste(17, "b)", terRetard + 50); f.juste(17, "c)", 50 / 200); f.juste(17, "d)", 50 / (terRetard + 50)); f.faux(17, "d)", 0.25);
  f.juste(18, "a)", "conditionnelle"); f.juste(18, "b)", 40 / 160); f.juste(18, "c)", 120 / 240); f.juste(18, "d)", 120 / (40 + 120)); f.faux(18, "d)", 120 / 240);
  f.vrai("tableau ex.19 lignes", 36 + 144 === 180 && 30 + 90 === 120 && 36 + 30 === 66);
  f.juste(19, "a)", 36 / 180); f.juste(19, "b)", 30 / 120); f.juste(19, "c)", 30 / 120 > 36 / 180 ? "Gare" : "Centre"); f.juste(19, "d)", 36 / 66); f.faux(19, "c)", "Centre");
  f.juste(20, "a)", 72 / (72 + 18)); f.juste(20, "b)", 27 / (27 + 243)); f.juste(20, "c)", 72 / (72 + 27)); f.juste(20, "d)", 27 + 18); f.faux(20, "c)", 0.8);
  f.tout();
}

/* ─────────── proba-conditionnelle-distinguer ─────────── */
{
  const f = await feuille("proba-conditionnelle-distinguer");
  f.juste(1, null, 30 / (30 + 20 + 30 + 120)); f.faux(1, null, 30 / 50);
  f.juste(2, null, 40 / (40 + 10)); f.faux(2, null, 40 / 100);
  f.juste(3, null, 24 / (24 + 8)); f.faux(3, null, 24 / 120);
  f.juste(4, null, 1 - 0.35); f.faux(4, null, 0.35);
  f.juste(5, null, "P_B(A)"); f.juste(5, null, "PB(A)"); f.faux(5, null, "P_A(B)"); f.faux(5, null, "PA(B)");
  f.juste(6, null, "intersection"); f.juste(6, null, "une intersection"); f.faux(6, null, "conditionnelle");
  f.juste(7, null, 980 - 950); f.faux(7, null, 2);
  f.juste(8, null, 100 - 95); f.faux(8, null, 20);

  const tot9 = 60 + 90 + 40 + 210;
  f.juste(9, "a)", 60 / tot9); f.juste(9, "b)", 60 / (60 + 90)); f.juste(9, "c)", 60 / (60 + 40)); f.faux(9, "b)", 0.15);
  f.juste(10, "a)", 20 / (20 + 180)); f.juste(10, "b)", 1); f.juste(10, "c)", 20 / (20 + 60)); f.juste(10, "d)", 20 / 500); f.faux(10, "b)", 2);
  f.juste(11, "a)", 140 / 200); f.juste(11, "b)", 60 / 200); f.juste(11, "c)", 135 / 150); f.faux(11, "c)", 0.3);
  f.juste(12, "a)", 45 / (45 + 5)); f.juste(12, "b)", 855 / (95 + 855)); f.juste(12, "c)", 950 - 855); f.faux(12, "a)", 45 / 140);
  f.juste(13, "a)", 1900 / 2000); f.juste(13, "b)", 7600 / 8000); f.juste(13, "c)", 1900 / (1900 + 400)); f.faux(13, "c)", 0.95);
  // ex.14 : c) et d) ne donnent plus 20 % (réponse du a)) : « plus d'un sur quatre ».
  f.juste(14, "a)", 60 / 300); f.juste(14, "b)", 60 / (60 + 90)); f.juste(14, "c)", 60 / 300 > 1 / 4 ? "vrai" : "faux"); f.juste(14, "d)", 60 / 150 > 1 / 4 ? "vrai" : "faux"); f.faux(14, "c)", "vrai"); f.faux(14, "d)", "faux");
  const sains = 2000 - 100, fp = sains * 0.05;
  f.juste(15, "a)", fp); f.juste(15, "b)", 100 - 80); f.juste(15, "c)", 80 + fp); f.juste(15, "d)", 80 / (80 + fp)); f.faux(15, "d)", 0.8);
  f.juste(16, "a)", "P_B(M)"); f.juste(16, "b)", 30 / (30 + 50)); f.juste(16, "c)", 30 / 200); f.faux(16, "b)", 30 / 120);

  const mal = 10000 * 0.01, vp = mal * 0.9, fp17 = (10000 - mal) * 0.05;
  f.juste(17, "a)", vp); f.juste(17, "b)", fp17); f.juste(17, "c)", vp + fp17); f.juste(17, "d)", vp / (vp + fp17)); f.faux(17, "d)", "90 %");
  const faux18 = 5000 * 0.02, vrais = 5000 - faux18, ref = faux18 * 0.95, tort = vrais * 0.02;
  f.juste(18, "a)", faux18 - ref); f.juste(18, "b)", ref / faux18); f.juste(18, "c)", (vrais - tort) / vrais); f.juste(18, "d)", ref / (ref + tort)); f.faux(18, "d)", 0.95);
  f.juste(19, "a)", 30 / (30 + 20)); f.juste(19, "b)", 30 / (30 + 220)); f.juste(19, "c)", 30 / 250 === 0.6 ? "vrai" : "faux"); f.juste(19, "d)", 30 / 500); f.faux(19, "c)", "vrai");
  const sans = 20000 - 40, fp20 = sans * 0.05;
  f.juste(20, "a)", 40 - 38); f.juste(20, "b)", fp20); f.juste(20, "c)", 38 / 40); f.juste(20, "d)", 38 / (38 + fp20)); f.faux(20, "d)", 0.95);
  f.vrai("ex.20 cases", 19960 - fp20 === 18962 && 38 + fp20 === 1036);
  f.tout();
}

/* ─────────── proba-epreuves-independantes ─────────── */
{
  const f = await feuille("proba-epreuves-independantes");
  f.juste(1, null, 0.6 ** 2); f.faux(1, null, 1.2);
  f.juste(2, null, (1 - 0.3) ** 2); f.faux(2, null, 1 - 0.3 ** 2);
  f.juste(3, null, 1 - 0.8); f.faux(3, null, 0.8 * 0.2);
  f.juste(4, null, 0.4); f.faux(4, null, 0.4 * 0.4);
  f.juste(5, null, 2 ** 3); f.faux(5, null, 6);
  f.juste(6, null, 0.5 ** 3); f.faux(6, null, 1.5);
  f.juste(7, null, "oui"); f.faux(7, null, "non");
  f.juste(8, null, "2/9"); f.faux(8, null, "3/10");

  const p9 = 0.4, q9 = 1 - p9;
  f.juste(9, "a)", p9 * p9); f.juste(9, "b)", q9 * q9); f.juste(9, "c)", 2 * p9 * q9); f.faux(9, "c)", p9 * q9);
  f.vrai("ex.9 somme", Math.abs(p9 * p9 + q9 * q9 + 2 * p9 * q9 - 1) < 1e-9);
  f.juste(10, "a)", 0.8 * 0.2); f.juste(10, "b)", 2 * 0.8 * 0.2); f.faux(10, "b)", 0.8 * 0.2);
  f.juste(11, "a)", 0.8 ** 3); f.juste(11, "b)", 1 - 0.8 ** 3); f.faux(11, "b)", 0.6);
  f.juste(12, "a)", (4 / 20) ** 2); f.juste(12, "b)", (4 / 20) * (3 / 19)); f.faux(12, "b)", 0.04);
  f.juste(13, "a)", 2 ** 4); f.juste(13, "b)", 0.9 ** 4); f.juste(13, "c)", 1 - 0.9 ** 4); f.faux(13, "c)", 0.4);
  f.juste(14, "a)", 0.7 ** 2); f.juste(14, "b)", "aucune"); f.juste(14, "c)", 1 - 0.7 ** 2); f.faux(14, "b)", "les deux");
  f.juste(15, "a)", "1/3"); f.vrai("ex.15 a)", 3 / 9 === 1 / 3); f.juste(15, "b)", "4/9"); f.juste(15, "c)", "2/15"); f.vrai("ex.15 c)", Math.abs((4 / 10) * (3 / 9) - 2 / 15) < 1e-12); f.faux(15, "a)", "3/9");
  f.juste(16, "a)", 0.9 * 0.8); f.juste(16, "b)", 1 - 0.9 * 0.8); f.faux(16, "b)", 0.3);

  f.juste(17, "a)", 0.1 ** 3); f.juste(17, "b)", 1 - 0.1 ** 3); f.juste(17, "c)", 0.9 ** 3); f.faux(17, "c)", 1 - 0.1 ** 3);
  f.juste(18, "a)", 2 ** 4); f.juste(18, "b)", 0.7 ** 4); f.juste(18, "c)", 0.3 ** 4); f.juste(18, "d)", 1 - 0.3 ** 4); f.faux(18, "d)", 1 - 0.7 ** 4);
  f.juste(19, "a)", "non"); f.juste(19, "b)", (5 / 50) * (4 / 49)); f.juste(19, "c)", (45 / 50) * (44 / 49)); f.juste(19, "d)", 1 - (45 / 50) * (44 / 49)); f.faux(19, "b)", 0.01);
  f.juste(20, "a)", 0.75 ** 3); f.juste(20, "b)", 1 - 0.75 ** 3); f.juste(20, "c)", Math.abs(0.75 ** 3 - 0.75) < 1e-9 ? "vrai" : "faux"); f.faux(20, "a)", 0.75);
  f.tout();
}

/* ─────────── proba-arbre ─────────── */
{
  const f = await feuille("proba-arbre");
  f.juste(1, null, 1 - 0.35); f.faux(1, null, 0.8);
  f.juste(2, null, 1 - 0.3); f.faux(2, null, 0.5);
  f.juste(3, null, "conditionnelle"); f.faux(3, null, "simple");
  f.juste(4, null, "simple"); f.faux(4, null, "conditionnelle");
  f.juste(5, null, "P_V(L)"); f.juste(5, null, "PV(L)"); f.faux(5, null, "P_L(V)"); f.faux(5, null, "PL(V)");
  f.juste(6, null, 60 / 100); f.faux(6, null, 0.4 * 0.6);
  f.juste(7, null, 1 - 0.3); f.faux(7, null, 0.8);
  f.juste(8, null, 1); f.faux(8, null, 2);

  f.juste(9, "a)", 1 - 0.5 - 0.3); f.juste(9, "b)", 3 + 3 * 2); f.faux(9, "b)", 6);
  f.juste(10, "a)", 1 - 0.7); f.juste(10, "b)", 1 - 0.6); f.juste(10, "c)", 1 - 0.1); f.faux(10, "c)", 0.4);
  f.juste(11, "a)", 200 / 800); f.juste(11, "b)", 150 / 200); f.juste(11, "c)", 300 / (800 - 200)); f.faux(11, "b)", 150 / 800);
  f.juste(12, "a)", "P_M(B)"); f.juste(12, "a)", "PM(B)"); f.faux(12, "a)", "P(M)"); f.juste(12, "b)", 0.4); f.juste(12, "c)", 100 * 0.4); f.faux(12, "a)", "P_B(M)");
  f.juste(13, "a)", 1 - 0.25); f.juste(13, "b)", 1 - 0.2); f.juste(13, "c)", 1 - 0.6); f.faux(13, "c)", 0.8);
  f.vrai("ex.14 la phrase 3 est le produit des deux autres", Math.abs(0.3 * 0.4 - 0.12) < 1e-12);
  f.juste(14, "a)", 1); f.juste(14, "b)", 2); f.juste(14, "c)", "non"); f.faux(14, "c)", "oui");
  f.juste(15, "a)", 320 / 400); f.juste(15, "b)", 16 / 320); f.juste(15, "c)", 20 / (400 - 320)); f.faux(15, "c)", 20 / 400);
  f.juste(16, "a)", "internat"); f.juste(16, "a)", "l'internat"); f.juste(16, "b)", 1 - 0.3); f.juste(16, "c)", 0.25); f.faux(16, "a)", "cantine");

  f.juste(17, "a)", 400 / 1000); f.juste(17, "b)", 600 / 1000); f.juste(17, "c)", 100 / 400); f.juste(17, "d)", 240 / 600); f.juste(17, "e)", 1 - 240 / 600); f.faux(17, "c)", 100 / 1000);
  f.juste(18, "a)", 1 - 0.45 - 0.35); f.juste(18, "b)", 1 - 0.4); f.juste(18, "c)", 1 - 0.05); f.juste(18, "d)", 3 * 2); f.faux(18, "a)", 1 - 0.45);
  f.vrai("ex.19 : 0,075 = 0,75 × 0,1", Math.abs(0.75 * 0.1 - 0.075) < 1e-12);
  f.juste(19, "a)", 1 - 0.75); f.juste(19, "b)", 10 / 100); f.juste(19, "c)", 1 - 0.1); f.juste(19, "d)", Math.abs(0.3 + 0.7 - 1) < 1e-9 ? "oui" : "non"); f.faux(19, "b)", 0.075);
  f.juste(20, "a)", 200 / 500); f.juste(20, "b)", 150 / 200); f.juste(20, "c)", (150 + 100) / 500); f.juste(20, "d)", 150 / (150 + 100)); f.faux(20, "d)", 0.75);
  f.tout();
}

/* ─────────── proba-arbre-calcul ─────────── */
{
  const f = await feuille("proba-arbre-calcul");
  f.juste(1, null, 0.6 * 0.5); f.faux(1, null, 0.5);
  f.juste(2, null, 0.25 * 0.8); f.faux(2, null, 1.05);
  f.juste(3, null, 0.24 + 0.18); f.faux(3, null, 0.24 * 0.18);
  f.juste(4, null, 0.5 * 0.2 + 0.5 * 0.4); f.faux(4, null, 0.6);
  f.juste(5, null, 0.3 / 0.6); f.faux(5, null, 0.3);
  f.juste(6, null, 2); f.faux(6, null, 3);
  f.juste(7, null, 1000 * 0.3); f.faux(7, null, 0.3);
  f.juste(8, null, 120 / (120 + 80)); f.faux(8, null, 120 / 500);

  f.juste(9, "a)", 0.4 * 0.75); f.juste(9, "b)", 0.6 * 0.25); f.juste(9, "c)", 0.4 * 0.75 + 0.6 * 0.25); f.faux(9, "b)", 0.4 * 0.25);
  f.juste(10, "a)", 0.7 * 0.02); f.juste(10, "b)", 0.3 * 0.05); f.juste(10, "c)", 0.7 * 0.02 + 0.3 * 0.05); f.faux(10, "c)", "3,5 %");
  f.vrai("ex.11 : le calcul faux de l'élève", Math.abs(0.6 + 0.4 * 0.5 - 0.8) < 1e-9);
  f.juste(11, "a)", 0.7); f.juste(11, "b)", 0.6 * 0.7 + 0.4 * 0.5); f.faux(11, "b)", 0.8);
  f.juste(12, "a)", 1 - 0.5 - 0.3); f.juste(12, "b)", 0.5 * 0.1 + 0.3 * 0.2 + 0.2 * 0.3); f.faux(12, "b)", 0.11);
  const conf = 0.2 * 0.9 + 0.8 * 0.6;
  f.juste(13, "a)", conf); f.juste(13, "b)", 1 - conf); f.juste(13, "c)", 0.2 * (1 - 0.9)); f.faux(13, "c)", 0.2 * 0.9);
  f.vrai("ex.13 chemins du contraire", Math.abs(0.2 * 0.1 + 0.8 * 0.4 - (1 - conf)) < 1e-9);
  const ligne = 500 * 0.4, bout = 500 - ligne;
  f.juste(14, "a)", ligne * 0.6); f.juste(14, "b)", bout * (1 - 0.2)); f.juste(14, "c)", ligne * 0.6 + bout * 0.2); f.faux(14, "b)", bout * 0.2);
  f.juste(15, "a)", 150 / 400); f.juste(15, "b)", 90 / 150); f.juste(15, "c)", 50 / 250); f.juste(15, "d)", (150 / 400) * (90 / 150)); f.faux(15, "b)", 90 / 400);
  f.vrai("ex.15 d) = case ÷ total", Math.abs((150 / 400) * (90 / 150) - 90 / 400) < 1e-12);
  f.juste(16, "a)", 0.04 / 0.4); f.juste(16, "b)", 0.12 / (1 - 0.4)); f.juste(16, "c)", 0.04 + 0.12); f.faux(16, "b)", 0.12 / 0.4);

  f.juste(17, "a)", 0.3 * 0.8); f.juste(17, "b)", 0.7 * 0.5); f.juste(17, "c)", 0.3 * 0.8 + 0.7 * 0.5); f.juste(17, "d)", 400 * (0.3 * 0.8 + 0.7 * 0.5)); f.faux(17, "c)", "65 %");
  const ouv = 0.6 * 0.5 + 0.4 * 0.25;
  f.juste(18, "a)", 0.6 * 0.5); f.juste(18, "b)", ouv); f.juste(18, "c)", 2000 * ouv); f.juste(18, "d)", 2000 * ouv >= 800 ? "oui" : "non"); f.faux(18, "b)", 0.75);
  const c19 = 1 - 0.25 - 0.35, nc = 0.25 * 0.04 + 0.35 * 0.02 + c19 * 0.05;
  f.juste(19, "a)", c19); f.juste(19, "b)", c19 * 0.05); f.juste(19, "c)", nc); f.juste(19, "d)", 1 - nc); f.faux(19, "c)", 0.11);
  const journee = 600 - 150;
  f.juste(20, "a)", 150 / 600); f.juste(20, "b)", 30 / 150); f.juste(20, "c)", 90 / journee); f.juste(20, "d)", (150 / 600) * (30 / 150) + (journee / 600) * (90 / journee)); f.juste(20, "e)", journee - 90); f.faux(20, "e)", 90);
  f.vrai("ex.20 d) = total ÷ général", Math.abs((30 + 90) / 600 - 0.2) < 1e-12);
  f.tout();
}

/* ─────────── proba-independance ─────────── */
{
  const f = await feuille("proba-independance");
  f.juste(1, null, 0.3 === 0.3 ? "oui" : "non"); f.faux(1, null, "non");
  f.juste(2, null, 0.4 === 0.5 ? "oui" : "non"); f.faux(2, null, "oui");
  f.juste(3, null, 0.5 * 0.2); f.faux(3, null, 0.7);
  f.juste(4, null, 0.8 * 0.25); f.faux(4, null, 1.05);
  f.juste(5, null, 0.12 / 0.4); f.faux(5, null, 0.12 * 0.4);
  f.juste(6, "a)", "non"); f.juste(6, "b)", 0 === 0.5 * 0.5 ? "oui" : "non"); f.faux(6, "b)", "oui");
  f.juste(7, null, 0.3 === 0.3 ? "oui" : "non"); f.faux(7, null, "non");
  f.juste(8, null, "indépendants"); f.juste(8, null, "indépendant"); f.faux(8, null, "incompatibles");

  const eg = (x, y) => Math.abs(x - y) < 1e-9;
  f.juste(9, "a)", 400 / 1000); f.juste(9, "b)", 500 / 1000); f.juste(9, "c)", 200 / 1000); f.juste(9, "d)", eg(0.4 * 0.5, 0.2) ? "oui" : "non"); f.faux(9, "d)", "non");
  f.juste(10, "a)", (200 / 500) * (250 / 500)); f.juste(10, "b)", 120 / 500); f.juste(10, "c)", eg((200 / 500) * (250 / 500), 120 / 500) ? "oui" : "non"); f.faux(10, "c)", "oui");
  f.juste(11, "a)", 0.4); f.juste(11, "b)", 0.1 * 0.4 + 0.9 * 0.4); f.juste(11, "c)", eg(0.4, 0.1 * 0.4 + 0.9 * 0.4) ? "oui" : "non"); f.faux(11, "b)", 0.8);
  f.juste(12, "a)", 0.9 * 0.8); f.juste(12, "b)", 1000 * 0.9 * 0.8); f.faux(12, "a)", 0.8);
  f.juste(13, "a)", 0.15 / 0.5); f.juste(13, "b)", 0.15 / 0.5); f.faux(13, "b)", 0.15);
  f.juste(14, "a)", 0); f.juste(14, "b)", 0.3 * 0.4); f.juste(14, "c)", "incompatibles"); f.faux(14, "c)", "les deux");
  f.juste(15, "a)", 1); f.juste(15, "b)", 2); f.juste(15, "c)", 3); f.faux(15, "c)", 2);
  f.juste(16, "a)", 120 / 400); f.juste(16, "b)", 30 / 100); f.juste(16, "c)", eg(120 / 400, 30 / 100) ? "oui" : "non"); f.faux(16, "c)", "non");

  f.juste(17, "a)", 30 / 120); f.juste(17, "b)", 75 / 300); f.juste(17, "c)", eg(30 / 120, 75 / 300) ? "oui" : "non"); f.juste(17, "d)", 30 / 120 < 45 / 180 ? "vrai" : "faux"); f.faux(17, "d)", "vrai");
  f.juste(18, "a)", 0.1 * 0.2); f.juste(18, "b)", 40 / 1000); f.juste(18, "c)", eg(0.02, 0.04) ? "oui" : "non"); f.faux(18, "c)", "oui");
  f.juste(19, "a)", 0); f.juste(19, "b)", "oui"); f.juste(19, "c)", eg(0, 0.6 * 0.4) ? "oui" : "non"); f.juste(19, "d)", "oui"); f.juste(19, "e)", 0.6 * 0.4); f.faux(19, "c)", "oui");
  f.juste(20, "a)", 0.6 * 0.7 + 0.4 * 0.7); f.juste(20, "b)", 0.7 === 0.7 ? "oui" : "non"); f.juste(20, "c)", 0.6 * 0.7 + 0.4 * 0.5); f.juste(20, "d)", eg(0.7, 0.62) ? "oui" : "non"); f.faux(20, "d)", "oui");
  f.tout();
}

fin();
