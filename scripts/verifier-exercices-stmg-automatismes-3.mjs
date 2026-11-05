// Recalcul indépendant du lot « automatismes-3 » de STMG (05/11/2026) : coefficient
// multiplicateur, taux d'évolution, évolutions successives et réciproque, indice
// base 100. lib/fiches-exercices/maths-stmg-auto-{evo-coefficient,evo-taux,evo-enchainees,indice}.tsx
// Usage : npx --yes tsx@4 scripts/verifier-exercices-stmg-automatismes-3.mjs
import { feuille, fin } from "./verifier-exercices-stmg-lot-commun.mjs";

const hausse = (t) => 1 + t / 100;
const baisse = (t) => 1 - t / 100;
// Le taux d'évolution, en pourcentage, recalculé sur les deux valeurs.
const taux = (vi, vf) => ((vf - vi) / vi) * 100;
const pct = (k) => (k - 1) * 100;
const indice = (v, ref) => (v / ref) * 100;
const pc = (x) => `${Number(x.toFixed(8))} %`;

/* ═══════════════ auto-evo-coefficient ═══════════════ */
{
  const f = await feuille("auto-evo-coefficient");
  f.juste(1, null, hausse(8)); f.faux(1, null, 0.08); f.faux(1, null, 1.8);
  f.juste(2, "a)", hausse(30)); f.juste(2, "b)", hausse(3)); f.faux(2, "b)", 1.3); f.juste(2, "c)", hausse(100));
  f.juste(3, null, pc(pct(1.15))); f.faux(3, null, "115 %");
  f.juste(4, null, baisse(25)); f.faux(4, null, 0.25);
  f.juste(5, "a)", baisse(3)); f.faux(5, "a)", 0.3); f.juste(5, "b)", baisse(40)); f.juste(5, "c)", baisse(12.5));
  f.juste(6, "a)", 0.85 < 1 ? "baisse" : "hausse"); f.faux(6, "a)", "hausse"); f.juste(6, "b)", pc((1 - 0.85) * 100)); f.juste(6, "b)", "−15 %"); f.faux(6, "b)", "85 %");
  f.juste(7, null, 600 * hausse(5)); f.faux(7, null, 605);
  f.juste(8, "a)", 200 * hausse(10)); f.juste(8, "b)", 120 * baisse(25)); f.faux(8, "b)", 30); f.juste(8, "c)", 40 * baisse(50));
  f.juste(9, "a)", baisse(15)); f.juste(9, "b)", 240 * baisse(15)); f.faux(9, "b)", 225);
  f.juste(10, "a)", baisse(12)); f.juste(10, "b)", 1800 * baisse(12)); f.juste(10, "c)", 1800 * 0.12); f.faux(10, "a)", 0.12);
  f.juste(11, "a)", hausse(20)); f.juste(11, "b)", 250 * hausse(20)); f.juste(11, "c)", 540 / hausse(20)); f.faux(11, "c)", 432);
  f.juste(12, "a)", baisse(20)); f.juste(12, "b)", 36 / baisse(20)); f.faux(12, "b)", 36 * 1.2);
  f.juste(13, "a)", hausse(25)); f.juste(13, "b)", 15 / hausse(25)); f.faux(13, "b)", 15 * 0.75);
  f.juste(14, "a)", hausse(150)); f.faux(14, "a)", 1.5); f.juste(14, "b)", 2000 * hausse(150));
  const nage = 80 * baisse(5);
  f.juste(15, "a)", baisse(5)); f.juste(15, "b)", nage); f.faux(15, "b)", 75); f.juste(15, "c)", nage < 75 ? "oui" : "non");
  f.juste(16, "a)", "C"); f.vrai("coef ex.16", Math.abs(18 * hausse(10) - 19.8) < 1e-9); f.faux(16, "a)", "B"); f.juste(16, "b)", 18 * hausse(10));
  const k17 = hausse(3.5);
  f.juste(17, "a)", k17); f.faux(17, "a)", 1.35); f.juste(17, "b)", 2000 * k17); f.juste(17, "c)", 1863 / k17); f.juste(17, "d)", 1863 - 1863 / k17);
  f.juste(18, "a)", baisse(12)); f.juste(18, "b)", 5000 * baisse(12)); f.juste(18, "c)", 6000 / baisse(20)); f.faux(18, "c)", 7200); f.juste(18, "d)", 6000 / baisse(20) - 6000);
  const k19 = hausse(5.5);
  f.juste(19, "a)", k19); f.faux(19, "a)", 1.55); f.juste(19, "b)", 20 * k19); f.juste(19, "c)", 12.66 / k19); f.juste(19, "d)", 12.66 - 12.66 / k19);
  const avant = 8400 / baisse(30);
  f.juste(20, "a)", baisse(30)); f.juste(20, "b)", avant); f.faux(20, "b)", 10920); f.vrai("ex.20 technicien", Math.abs(8400 * 1.3 - 10920) < 1e-9); f.juste(20, "c)", avant === 10920 ? "oui" : "non"); f.juste(20, "d)", avant - 8400);
  f.tout();
}

/* ═══════════════ auto-evo-taux ═══════════════ */
{
  const f = await feuille("auto-evo-taux");
  f.juste(1, null, 10 - 8); f.faux(1, null, "25 %");
  f.juste(2, null, pc(taux(200, 250))); f.faux(2, null, "20 %");
  f.juste(3, null, pc(taux(80, 60))); f.faux(3, null, "25 %");
  f.juste(4, "a)", pc(taux(50, 60))); f.faux(4, "a)", "10 %"); f.juste(4, "b)", pc(taux(400, 360))); f.juste(4, "c)", pc(taux(100, 103)));
  f.juste(5, "a)", "proportion"); f.faux(5, "a)", "évolution"); f.juste(5, "b)", "évolution"); f.faux(5, "b)", "proportion");
  f.juste(6, "a)", pc(pct(1.35))); f.juste(6, "b)", pc(pct(0.88))); f.faux(6, "b)", "-88 %");
  f.juste(7, "a)", 240 - 200); f.juste(7, "b)", pc(taux(200, 240))); f.faux(7, "a)", 20);
  f.juste(8, null, "C"); f.faux(8, null, "A");
  f.juste(9, "a)", 250 - 200); f.juste(9, "b)", 880 - 800); f.juste(9, "c)", pc(taux(200, 250))); f.juste(9, "d)", pc(taux(800, 880)));
  f.juste(9, "e)", taux(200, 250) > taux(800, 880) ? "A" : "B"); f.faux(9, "e)", "B");
  f.juste(10, "a)", pc(taux(40, 50))); f.juste(10, "b)", pc(taux(50, 45))); f.faux(10, "b)", pc(((45 - 50) / 45) * 100)); f.juste(10, "c)", pc(taux(40, 45)));
  f.juste(11, "a)", 30 - 40); f.juste(11, "b)", pc(taux(40, 30))); f.faux(11, "b)", pc(((30 - 40) / 30) * 100));
  f.juste(12, "a)", 200 - 160); f.juste(12, "b)", pc(taux(160, 200))); f.faux(12, "b)", "40 %"); f.juste(12, "c)", taux(160, 200) === 40 ? "oui" : "non");
  f.juste(13, "a)", pc((120 / 400) * 100)); f.juste(13, "b)", "proportion"); f.juste(13, "c)", pc(taux(120, 150))); f.faux(13, "c)", "7,5 %"); f.juste(13, "d)", "évolution");
  f.juste(14, "a)", 425 - 500); f.juste(14, "b)", pc(taux(500, 425))); f.juste(14, "c)", 425 / 500);
  f.vrai("ex.15 même écart", 92 - 80 === 132 - 120);
  f.juste(15, "a)", 92 - 80); f.juste(15, "b)", pc(taux(80, 92))); f.juste(15, "c)", pc(taux(120, 132))); f.juste(15, "d)", taux(80, 92) > taux(120, 132) ? "Bleu" : "Vert"); f.faux(15, "d)", "Vert");
  f.juste(16, "a)", pc(taux(250, 260))); f.juste(16, "b)", pc(taux(500, 490))); f.juste(16, "c)", "évolution");
  f.juste(17, "a)", pc(taux(20000, 25000))); f.juste(17, "b)", pc(taux(25000, 22500))); f.juste(17, "c)", pc(taux(20000, 22500))); f.faux(17, "c)", "15 %"); f.juste(17, "d)", Math.abs(taux(20000, 22500) - (taux(20000, 25000) + taux(25000, 22500))) < 1e-9 ? "oui" : "non"); f.faux(17, "d)", "oui");
  const p0 = 300 / 2000, p1 = 375 / 2500;
  f.juste(18, "a)", pc(taux(2000, 2500))); f.juste(18, "b)", pc(taux(300, 375))); f.juste(18, "c)", pc(p0 * 100)); f.juste(18, "d)", pc(p1 * 100)); f.juste(18, "e)", p1 > p0 ? "oui" : "non");
  f.juste(19, "a)", [380 - 400, 90 - 100]); f.faux(19, "a)", [90 - 100, 380 - 400]);
  f.juste(19, "b)", [taux(400, 380), taux(100, 90)]); f.juste(19, "c)", 400 - 380 > 100 - 90 ? "A" : "B"); f.juste(19, "d)", -taux(400, 380) > -taux(100, 90) ? "A" : "B"); f.faux(19, "d)", "A");
  f.juste(20, "a)", [1680 - 1600, 3090 - 3000]); f.juste(20, "b)", [taux(1600, 1680), taux(3000, 3090)]);
  f.juste(20, "c)", 1680 - 1600 > 3090 - 3000 ? "ouvrier" : "cadre"); f.juste(20, "d)", taux(1600, 1680) > taux(3000, 3090) ? "ouvrier" : "cadre"); f.faux(20, "d)", "cadre");
  f.tout();
}

/* ═══════════════ auto-evo-enchainees ═══════════════ */
{
  const f = await feuille("auto-evo-enchainees");
  f.juste(1, null, hausse(10) * hausse(20)); f.faux(1, null, 1.3);
  f.juste(2, null, baisse(10) * baisse(20)); f.faux(2, null, 0.7);
  f.juste(3, "a)", hausse(50) * baisse(20)); f.faux(3, "a)", 1.3); f.juste(3, "b)", hausse(25) * hausse(20)); f.juste(3, "c)", baisse(50) * hausse(10));
  f.juste(4, null, pc(pct(1.44))); f.faux(4, null, "144 %");
  f.juste(5, null, pc(pct(0.68))); f.faux(5, null, "-68 %"); f.faux(5, null, "32 %");
  f.juste(6, null, 1 / 0.8); f.faux(6, null, 1.2);
  f.juste(7, null, pc(pct(1 / baisse(50)))); f.faux(7, null, "50 %");
  f.juste(8, "a)", 100 * baisse(20)); f.juste(8, "b)", 100 * baisse(20) * hausse(20)); f.faux(8, "b)", 100); f.juste(8, "c)", Math.abs(baisse(20) * hausse(20) - 1) < 1e-9 ? "oui" : "non");
  const k9 = baisse(30) * baisse(20);
  f.juste(9, "a)", k9); f.juste(9, "b)", 80 * k9); f.juste(9, "c)", pc(pct(k9))); f.faux(9, "c)", "-50 %"); f.juste(9, "d)", Math.abs(pct(k9) + 50) < 1e-9 ? "oui" : "non");
  const k10 = hausse(5) * hausse(5);
  f.juste(10, "a)", k10); f.juste(10, "b)", 1000 * k10); f.juste(10, "c)", pc(pct(k10))); f.faux(10, "c)", "10 %");
  f.juste(11, "a)", hausse(25) * baisse(20)); f.juste(11, "b)", 400 * hausse(25) * baisse(20)); f.juste(11, "c)", Math.abs(hausse(25) * baisse(25) - 1) < 1e-9 ? "oui" : "non"); f.juste(11, "d)", 400 * hausse(25) * baisse(25)); f.faux(11, "d)", 400);
  f.juste(12, "a)", hausse(20)); f.juste(12, "b)", 0.9 / hausse(20)); f.faux(12, "b)", 0.9 - 1.2); f.juste(12, "c)", pc(pct(0.9 / hausse(20))));
  f.juste(13, "a)", hausse(25)); f.juste(13, "b)", 1 / hausse(25)); f.juste(13, "c)", pc(pct(1 / hausse(25)))); f.faux(13, "c)", "-25 %");
  const k14 = hausse(10) * baisse(20);
  f.juste(14, "a)", k14); f.juste(14, "b)", 110 / k14); f.faux(14, "b)", 110 * 1.1); f.faux(14, "b)", 100);
  f.juste(15, "a)", 400 * baisse(25) * hausse(25)); f.faux(15, "a)", 400); f.juste(15, "b)", baisse(25) * hausse(25)); f.juste(15, "c)", pc(pct(baisse(25) * hausse(25))));
  const a16 = hausse(10) * baisse(10), b16 = baisse(10) * hausse(10);
  f.juste(16, "a)", a16); f.juste(16, "b)", b16); f.juste(16, "c)", Math.abs(a16 - b16) < 1e-12 ? "oui" : "non"); f.juste(16, "d)", pc(pct(a16))); f.faux(16, "d)", "0 %");
  const p17 = 20 * hausse(25);
  f.juste(17, "a)", p17); f.juste(17, "b)", pc(pct(20 / p17))); f.juste(17, "c)", p17 * baisse(10)); f.juste(17, "d)", pc(taux(20, p17 * baisse(10)))); f.faux(17, "d)", "15 %");
  const k18 = hausse(10) * hausse(10);
  f.juste(18, "a)", k18); f.juste(18, "b)", pc(pct(k18))); f.faux(18, "b)", "20 %"); f.juste(18, "c)", 12100 / k18); f.juste(18, "d)", 12100 - 12100 / k18);
  const k19 = hausse(20) * baisse(25);
  f.juste(19, "a)", k19); f.juste(19, "b)", 200 * k19); f.juste(19, "c)", pc(pct(k19))); f.faux(19, "c)", "-5 %"); f.juste(19, "d)", Math.abs(pct(k19) + 5) < 1e-9 ? "vrai" : "faux");
  const apres = 500 * baisse(60);
  f.juste(20, "a)", apres); f.juste(20, "b)", apres * hausse(60)); f.juste(20, "c)", pc(taux(500, apres * hausse(60)))); f.juste(20, "d)", pc(taux(apres, 500))); f.faux(20, "d)", "60 %");
  f.tout();
}

/* ═══════════════ auto-indice ═══════════════ */
{
  const f = await feuille("auto-indice");
  f.juste(1, null, pc(112 - 100)); f.faux(1, null, "112 %");
  f.juste(2, null, pc(85 - 100)); f.faux(2, null, "85 %"); f.faux(2, null, "15 %");
  f.juste(3, "a)", 100 + 8); f.faux(3, "a)", 8); f.faux(3, "a)", 1.08); f.juste(3, "b)", 100 - 20);
  const tab4 = { 2020: 100, 2021: 104, 2022: 110, 2023: 97 };
  f.juste(4, "a)", Object.keys(tab4).find((a) => tab4[a] === 100)); f.juste(4, "b)", pc(tab4[2022] - 100)); f.juste(4, "c)", pc(tab4[2023] - 100));
  f.juste(5, null, indice(230, 200)); f.faux(5, null, 15); f.faux(5, null, 30);
  f.juste(6, null, indice(340, 400)); f.faux(6, null, indice(400, 340));
  f.juste(7, null, 130 > 115 ? "laine" : "coton"); f.faux(7, null, "coton");
  f.juste(8, null, pc(taux(120, 150))); f.faux(8, null, "30 %");
  f.juste(9, "a)", indice(420, 400)); f.juste(9, "b)", indice(500, 400)); f.juste(9, "c)", indice(460, 400)); f.faux(9, "c)", indice(460, 500));
  f.juste(10, "a)", (250 * 120) / 100); f.faux(10, "a)", 370); f.juste(10, "b)", (250 * 90) / 100);
  f.juste(11, "a)", pc(taux(125, 150))); f.faux(11, "a)", "25 %"); f.juste(11, "b)", pc(taux(150, 120))); f.faux(11, "b)", "-30 %");
  const sect = { tourisme: 125, industrie: 105, agricole: 90 };
  const noms = Object.keys(sect);
  f.juste(12, "a)", noms.reduce((a, b) => (sect[a] > sect[b] ? a : b))); f.juste(12, "b)", noms.find((n) => sect[n] < 100)); f.juste(12, "c)", pc(sect.industrie - 100)); f.faux(12, "c)", "105 %");
  f.juste(13, "a)", indice(25, 20)); f.juste(13, "b)", indice(220, 200)); f.juste(13, "c)", indice(25, 20) > indice(220, 200) ? "CA" : "salariés"); f.faux(13, "c)", "salariés"); f.juste(13, "d)", "non");
  f.juste(14, "a)", pc(130 - 100)); f.juste(14, "b)", 130 - 104); f.juste(14, "c)", pc(taux(104, 130))); f.faux(14, "c)", "26 %");
  f.juste(15, "a)", (1600 * 125) / 100); f.juste(15, "b)", (1600 * 110) / 100); f.juste(15, "c)", pc(taux(125, 110))); f.faux(15, "c)", "-15 %");
  f.vrai("ex.15 sur les valeurs", Math.abs(taux(2000, 1760) - taux(125, 110)) < 1e-9);
  f.juste(16, "a)", pc(60 - 100)); f.juste(16, "b)", pc(90 - 100)); f.juste(16, "c)", pc(taux(60, 90))); f.faux(16, "c)", "30 %");
  f.juste(17, "a)", indice(6000, 5000)); f.juste(17, "b)", indice(300, 200)); f.juste(17, "c)", indice(300, 200) > indice(6000, 5000) ? "solaire" : "consommation"); f.faux(17, "c)", "consommation"); f.juste(17, "d)", pc(taux(250, 300)));
  f.juste(18, "a)", pc(120 - 100)); f.juste(18, "b)", pc(112 - 100)); f.juste(18, "c)", 120 > 112 ? "prix" : "salaires"); f.faux(18, "c)", "salaires"); f.juste(18, "d)", (150 * 120) / 100); f.juste(18, "e)", (2000 * 112) / 100);
  const ref19 = (8000 * 100) / 160;
  f.juste(19, "a)", 200 - 160); f.juste(19, "b)", pc(taux(160, 200))); f.faux(19, "b)", "40 %"); f.juste(19, "c)", taux(160, 200) === 40 ? "vrai" : "faux"); f.juste(19, "d)", ref19); f.juste(19, "e)", (ref19 * 200) / 100);
  const p20 = { blé: indice(480, 400), lait: indice(1100, 1000), pommes: indice(225, 250) };
  const noms20 = Object.keys(p20);
  f.juste(20, "a)", [p20.blé, p20.lait, p20.pommes]); f.faux(20, "a)", [p20.pommes, p20.lait, p20.blé]);
  f.juste(20, "b)", noms20.reduce((a, b) => (p20[a] > p20[b] ? a : b))); f.juste(20, "c)", noms20.find((n) => p20[n] < 100)); f.juste(20, "d)", pc(taux(250, 225)));
  f.tout();
}

fin();
