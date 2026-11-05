// Recalcul indépendant des 4 feuilles « logarithme » de STMG (05/11/2026) :
// lib/fiches-exercices/maths-stmg-log-{definition,proprietes,equations,applications}.tsx.
// Usage : npx --yes tsx@4 scripts/verifier-exercices-stmg-logarithme.mjs
//
// ⭐ Deux chemins pour chaque résultat tiré d'un tableau : `seuil(b, a)` calcule le
// quotient avec les valeurs ARRONDIES au dix-millième (ce que fait l'élève avec le
// tableau) et avec les vraies valeurs (ce que fait sa calculatrice) ; les deux
// doivent donner le même entier, sinon la question serait injuste.
import { feuille, fin } from "./verifier-exercices-stmg-lot-commun.mjs";

const log = Math.log10;
const t4 = (x) => Math.round(log(x) * 1e4) / 1e4;
const encadre = (x) => [Math.floor(log(x)), Math.floor(log(x)) + 1];
const chiffres = (l) => Math.floor(l) + 1;
const egal = (a, b) => Math.abs(a - b) < 1e-9;
const vf = (c) => (c ? "vrai" : "faux");
// L'arrondi au rang demandé : une réponse en `exact` n'admet que le nombre arrondi.
const r2 = (v) => Math.round(v * 100) / 100;
const r3 = (v) => Math.round(v * 1000) / 1000;
const r4 = (v) => Math.round(v * 10000) / 10000;
const on = (c) => (c ? "oui" : "non");

// Le premier entier au-dessus de log(b) ÷ log(a), par les deux chemins.
function seuil(f, nom, b, a) {
  const vrai = log(b) / log(a);
  const table = t4(b) / t4(a);
  f.vrai(`${nom} : les deux chemins donnent le même entier (${vrai.toFixed(3)} / ${table.toFixed(3)})`, Math.floor(vrai) === Math.floor(table));
  return Math.floor(vrai) + 1;
}
// Les valeurs imprimées dans un tableau de feuille, relues dans son source.
function tableauxJustes(f, slug) {
  let lues = 0;
  f.exercices.forEach((ex, i) => {
    const props = ex.figure?.props?.children?.props?.children;
    const lignes = Array.isArray(props) ? props : null;
    if (!lignes) return;
    const th = lignes[0]?.props?.children?.props?.children;
    const td = lignes[1]?.props?.children?.[0]?.props?.children;
    if (!Array.isArray(th) || !Array.isArray(td)) return;
    const xs = th.slice(1).map((c) => Number(String(c.props.children).replace(/\s/g, "").replace(",", ".")));
    const ys = td.slice(1).map((c) => Number(String(c.props.children).replace("−", "-").replace(",", ".")));
    lues += xs.length;
    xs.forEach((x, k) => f.vrai(`${slug} ex.${i + 1} : log(${x}) lu ${ys[k]}, vrai ${t4(x)}`, egal(ys[k], t4(x))));
  });
  // La feuille de définition n'a pas de tableau de valeurs : ce compteur garde
  // que les autres sont bien relues (le dessin pourrait changer de structure).
  f.vrai(`${slug} : ${lues} valeurs de tableau relues`, slug === "log-definition" || lues > 10);
  console.log(`${slug} : ${lues} valeurs de tableau relues`);
}

/* ═══════════════════════════ log-definition ═══════════════════════════ */
{
  const f = await feuille("log-definition");
  tableauxJustes(f, "log-definition");
  // ★
  f.juste(1, null, `10^x = ${10 ** log(100000)}`);
  f.faux(1, null, "x^10 = 100000"); f.faux(1, null, "10x = 100000");
  f.juste(2, "a)", log(100)); f.juste(2, "b)", log(1)); f.juste(2, "c)", log(10)); f.faux(2, "b)", 1); f.faux(2, "a)", "log(100)");
  f.juste(3, "a)", log(10 ** 7)); f.juste(3, "b)", log(1000000)); f.juste(3, "c)", log(0.001)); f.faux(3, "c)", 3);
  f.juste(4, null, 10 ** 4); f.faux(4, null, 4);
  f.juste(5, "a)", 10 ** -2); f.juste(5, "b)", 10 ** 0); f.faux(5, "a)", -100);
  f.juste(6, "a)", log(35) < log(60) ? "<" : ">"); f.juste(6, "b)", log(0.5) < log(0.2) ? "<" : ">"); f.faux(6, "b)", "<");
  f.juste(7, "a)", log(2) < log(3) ? "croissante" : "décroissante"); f.juste(7, "b)", 10 ** 0);
  f.faux(7, "a)", "décroissante");
  f.juste(8, null, encadre(350)); f.faux(8, null, [3, 4]); f.faux(8, null, [3, 2]);
  // ★★
  f.juste(9, "a)", 10 * log(10 ** 6)); f.juste(9, "b)", 10 * log(1)); f.juste(9, "c)", 10 * log(100000000));
  f.faux(9, "a)", 10 ** 7);
  f.juste(10, "a)", -log(0.001)); f.juste(10, "b)", -log(0.0000001)); f.juste(10, "c)", 10 ** -2); f.faux(10, "a)", -3);
  f.juste(11, "a)", 10 ** 5); f.juste(11, "b)", 10 ** 3); f.juste(11, "c)", 10 ** 5 / 10 ** 3); f.faux(11, "c)", 2);
  f.juste(12, "a)", encadre(72000)); f.juste(12, "b)", encadre(8600000)); f.juste(12, "c)", encadre(950)); f.faux(12, "c)", [3, 4]);
  f.juste(13, "a)", log(0.4) < 0 ? "négatif" : "positif"); f.juste(13, "b)", log(25) > 0 ? "positif" : "négatif");
  f.juste(13, "c)", log(1) === 0 ? "nul" : "positif"); f.juste(13, "d)", Number.isNaN(log(-5)) ? "non" : "oui");
  const musees = { A: 4.6, B: 5.2, C: 3.9 };
  const tri = Object.entries(musees).sort((a, b) => a[1] - b[1]).map(([k]) => k);
  f.juste(14, "a)", tri[2]); f.juste(14, "b)", tri[0]); f.juste(14, "c)", 10 ** Math.floor(musees.B)); f.faux(14, "a)", "A");
  f.juste(15, "a)", `x > ${10 ** 3}`); f.juste(15, "a)", `]${10 ** 3} ; +∞[`); f.juste(15, "b)", log(850) > 3 ? "oui" : "non");
  f.juste(15, "c)", `0 < x < ${10 ** 5}`); f.juste(15, "c)", `x < ${10 ** 5}`); f.juste(15, "c)", `]0 ; ${10 ** 5}[`);
  f.juste(15, "a)", "x > 10^3"); f.juste(15, "c)", "0 < x < 10^5");
  f.faux(15, "a)", "x > 3"); f.faux(15, "c)", "x < 5");
  f.juste(16, "a)", log(100000)); f.juste(16, "b)", 10 ** 7); f.juste(16, "c)", 10 ** 7 / 10 ** 5); f.faux(16, "c)", 2);
  // ★★★
  f.juste(17, "a)", [log(100), log(10000), log(1000000)]); f.juste(17, "b)", 10 ** 5);
  f.juste(17, "c)", [10 ** Math.floor(3.5), 10 ** (Math.floor(3.5) + 1)]); f.juste(17, "d)", 10 ** 4 / 10 ** 3); f.faux(17, "a)", [6, 4, 2]);
  const cDil = (n) => 10 ** -n;
  let nDil = 0; while (!(log(cDil(nDil)) < -6 - 1e-9)) nDil++;
  f.juste(18, "a)", "0,0001"); f.vrai("log-definition ex.18 a)", egal(cDil(4), 0.0001));
  f.juste(18, "b)", log(cDil(4))); f.juste(18, "c)", nDil); f.juste(18, "d)", log(cDil(nDil)) < 0 ? "négatif" : "positif"); f.faux(18, "c)", 6);
  const ecoutes = { A: 2500000, B: 40000, C: 640 };
  f.juste(19, "a)", encadre(ecoutes.A)); f.juste(19, "b)", encadre(ecoutes.B)); f.juste(19, "c)", encadre(ecoutes.C));
  const gardes = Object.entries(ecoutes).filter(([, v]) => log(v) > 5).map(([k]) => k);
  f.vrai("log-definition ex.19 d) : un seul artiste", gardes.length === 1);
  f.juste(19, "d)", gardes[0]); f.faux(19, "d)", "B");
  f.juste(20, "a)", vf(egal(log(1000), 3))); f.juste(20, "b)", vf(egal(log(1), 1))); f.juste(20, "c)", vf(egal(log(0.1), -1)));
  f.juste(20, "d)", vf(log(50) > 2 === 50 > 2)); f.juste(20, "e)", vf(log(50) > 2));
  f.tout();
}

/* ═══════════════════════════ log-proprietes ═══════════════════════════ */
{
  const f = await feuille("log-proprietes");
  tableauxJustes(f, "log-proprietes");
  // ★
  f.vrai("ex.1", egal(log(7 * 12), log(7) + log(12)));
  f.juste(1, null, "log(7)+log(12)"); f.juste(1, null, "log(12) + log(7)"); f.juste(1, null, "log 7 + log 12"); f.faux(1, null, "log(84)"); f.faux(1, null, "log(7)*log(12)");
  f.juste(2, null, t4(2) + t4(7)); f.juste(2, null, r3(log(14))); f.faux(2, null, t4(2) * t4(7)); f.faux(2, null, "log(14)");
  f.juste(3, null, log(100000) - log(100)); f.faux(3, null, 5 / 2); f.faux(3, null, "log(1000)");
  f.vrai("ex.4", egal(log(20 / 7), log(20) - log(7)));
  f.juste(4, null, "log(20)-log(7)"); f.juste(4, null, "log 20 - log 7"); f.faux(4, null, "log(7)-log(20)"); f.faux(4, null, "log(20)/log(7)");
  f.vrai("ex.5", egal(log(1.05 ** 12), 12 * log(1.05)));
  f.juste(5, null, "12log(1,05)"); f.juste(5, null, "12×log(1,05)"); f.juste(5, null, "12 log 1,05"); f.faux(5, null, "log(1,05^12)"); f.faux(5, null, "1,05log(12)");
  f.juste(6, null, 4 * t4(3)); f.juste(6, null, r3(log(3 ** 4))); f.faux(6, null, t4(4)); f.faux(6, null, "log(3^4)");
  f.juste(7, null, -3); f.vrai("ex.7", egal(log(1 / 1000), -log(1000))); f.faux(7, null, 3); f.faux(7, null, "1/3");
  f.juste(8, null, -t4(2)); f.juste(8, null, r3(log(0.5))); f.faux(8, null, t4(2)); f.faux(8, null, t4(5)); f.faux(8, null, "log(0,5)");
  // ★★
  f.juste(9, "a)", 8000 / 200); f.juste(9, "b)", "log(8000)-log(200)"); f.faux(9, "b)", "log(40)");
  f.juste(9, "c)", r4(t4(8000) - t4(200))); f.juste(9, "c)", r3(log(8000 / 200))); f.faux(9, "c)", "log(8000)-log(200)"); f.faux(9, "c)", t4(8000) / t4(200));
  f.juste(10, "a)", 10 * log(100)); f.juste(10, "b)", 10 * (t4(2) + log(10))); f.juste(10, "b)", 10 * log(20)); f.faux(10, "b)", 13.02);
  f.juste(10, "c)", 10 * log(100) + 10 * (t4(2) + 1)); f.juste(10, "c)", 10 * log(100 * 20)); f.faux(10, "c)", 20 * 13.01);
  f.juste(11, "a)", "12log(1,05)"); f.faux(11, "a)", "log(1,05^12)"); f.juste(11, "b)", 12 * t4(1.05)); f.juste(11, "b)", r4(12 * log(1.05))); f.faux(11, "b)", t4(1.8)); f.faux(11, "b)", "12log(1,05)");
  f.vrai("ex.11 c) : les deux chemins concluent pareil", 12 * t4(1.05) < t4(1.8) && 1.05 ** 12 < 1.8);
  f.juste(11, "c)", on(1.05 ** 12 >= 1.8)); f.faux(11, "c)", "oui");
  f.juste(12, "a)", log(10 ** 9)); f.juste(12, "b)", t4(7) + 9); f.juste(12, "b)", r3(log(7e9))); f.faux(12, "b)", "log(7*10^9)"); f.faux(12, "b)", t4(7) * 9);
  f.juste(13, "a)", -t4(250)); f.juste(13, "a)", r3(log(0.004))); f.faux(13, "a)", "log(0,004)"); f.vrai("ex.13 a)", egal(1 / 250, 0.004));
  f.juste(13, "b)", -t4(4)); f.juste(13, "b)", r3(log(0.25))); f.faux(13, "b)", "log(0,25)"); f.vrai("ex.13 b)", egal(1 / 4, 0.25)); f.faux(13, "a)", t4(250));
  f.juste(14, "a)", log(1000) - log(10)); f.juste(14, "b)", vf(egal(log(1000 / 10), log(1000) / log(10)))); f.juste(14, "c)", log(100000) - log(100)); f.faux(14, "a)", 3);
  f.juste(15, "a)", 5 ** 3); f.juste(15, "b)", 7 ** 2); f.juste(15, "c)", 2 ** 4); f.faux(15, "c)", 4 * 2); f.faux(15, "a)", 15);
  f.vrai("ex.15", egal(log(125), 3 * log(5)) && egal(log(49), 2 * log(7)) && egal(log(16), 4 * log(2)));
  f.juste(16, "a)", log(4) + log(25)); f.juste(16, "b)", 4 * 25); f.faux(16, "b)", 4 + 25);
  // ★★★
  f.juste(17, "a)", 2.5 * log(100)); f.juste(17, "b)", 2.5 * log(1000));
  f.juste(17, "c)", r3(t4(5) - t4(2))); f.juste(17, "c)", r3(log(2.5))); f.faux(17, "c)", "log(2,5)"); f.juste(17, "d)", 2.5 * (t4(5) - t4(2))); f.juste(17, "d)", Math.round(2.5 * log(2.5)));
  f.faux(17, "c)", t4(5) / t4(2));
  const logN = t4(5) + 2 + 10 * t4(1.2);
  f.juste(18, "a)", r3(t4(5) + 2)); f.juste(18, "a)", r3(log(500))); f.faux(18, "a)", "log(500)"); f.juste(18, "b)", r3(10 * t4(1.2))); f.juste(18, "b)", r3(log(1.2 ** 10)));
  f.juste(18, "c)", r3(logN)); f.juste(18, "c)", r3(log(500 * 1.2 ** 10))); f.juste(18, "d)", r4(t4(3) + 3)); f.juste(18, "d)", r3(log(3000))); f.faux(18, "d)", "log(3000)");
  f.vrai("ex.18 e) : deux chemins", logN > t4(3) + 3 && 500 * 1.2 ** 10 > 3000);
  f.juste(18, "e)", on(500 * 1.2 ** 10 > 3000)); f.faux(18, "c)", (t4(5) + 2) * 10 * t4(1.2));
  f.juste(19, "a)", r2(8 * t4(26))); f.juste(19, "a)", r2(log(26 ** 8))); f.faux(19, "a)", "log(26^8)"); f.juste(19, "b)", log(10 ** 4));
  f.juste(19, "c)", r2(8 * t4(26) - 4)); f.juste(19, "c)", r2(log(26 ** 8 / 10 ** 4))); f.faux(19, "c)", (8 * t4(26)) / 4);
  f.juste(19, "d)", encadre(26 ** 8 / 10 ** 4));
  f.juste(20, "a)", vf(egal(log(2 + 3), log(2) + log(3)))); f.juste(20, "b)", vf(egal(log(6), log(2) + log(3))));
  f.juste(20, "c)", vf(egal(log(2 ** 5), 5 * log(2)))); f.juste(20, "d)", vf(egal(log(1 / 7), -log(7))));
  f.juste(20, "e)", vf(egal(log(8 / 2), log(8) / log(2))));
  f.tout();
}

/* ═══════════════════════════ log-equations ═══════════════════════════ */
{
  const f = await feuille("log-equations");
  tableauxJustes(f, "log-equations");
  // ★
  f.juste(1, null, "x = log(20)/log(3)"); f.juste(1, null, "log(20)÷log(3)"); f.vrai("ex.1", egal(3 ** (log(20) / log(3)), 20));
  f.faux(1, null, "log(3)/log(20)"); f.faux(1, null, "log(20)-log(3)");
  f.juste(2, null, t4(50) / t4(1.5)); f.juste(2, null, log(50) / log(1.5)); f.faux(2, null, 50 / 1.5); f.faux(2, null, t4(1.5) / t4(50)); f.faux(2, null, 9.66);
  f.juste(3, null, 2 / t4(2)); f.juste(3, null, log(100) / log(2)); f.faux(3, null, log(100) - log(2)); f.faux(3, null, 6.65);
  f.juste(4, null, t4(2) / t4(1.05)); f.juste(4, null, log(2) / log(1.05)); f.faux(4, null, t4(2) / t4(1.1)); f.faux(4, null, 14.1);
  f.juste(5, null, 125 ** (1 / 3)); f.faux(5, null, 125 / 3);
  f.juste(6, null, 1296 ** (1 / 4)); f.faux(6, null, 1296 / 4);
  f.vrai("ex.7 : B a pour solution 3", egal(243 ** (1 / 5), 3));
  f.juste(7, null, "B"); f.faux(7, null, "A");
  f.juste(8, null, seuil(f, "éq. ex.8", 100, 2)); f.vrai("ex.8", 2 ** 6 <= 100 && 2 ** 7 > 100); f.faux(8, null, 6);
  // ★★
  f.juste(9, "a)", t4(5) / t4(1.2)); f.juste(9, "a)", log(5) / log(1.2)); f.juste(9, "b)", seuil(f, "éq. ex.9", 5, 1.2)); f.faux(9, "a)", 5 / 1.2);
  f.juste(10, "a)", "log(3)/log(1,1)"); f.juste(10, "b)", t4(3) / t4(1.1)); f.juste(10, "b)", log(3) / log(1.1)); f.juste(10, "c)", seuil(f, "éq. ex.10", 3, 1.1)); f.faux(10, "c)", 20);
  f.juste(11, "a)", "x^3 = 64"); f.faux(11, "a)", "3^x = 64"); f.faux(11, "a)", "3x = 64");
  f.juste(11, "b)", 64 ** (1 / 3)); f.juste(11, "b)", "4 m"); f.juste(11, "c)", 216 ** (1 / 3)); f.faux(11, "b)", 64 / 3);
  f.vrai("ex.11 : solutions entières, comme le coach", 4 ** 3 === 64 && 6 ** 3 === 216);
  f.juste(12, "a)", on(log(0.8) < 0)); f.faux(12, "a)", "non"); f.juste(12, "b)", seuil(f, "éq. ex.12", 0.1, 0.8)); f.vrai("ex.12", 0.8 ** 10 >= 0.1 && 0.8 ** 11 < 0.1); f.faux(12, "b)", 10);
  f.juste(13, "a)", 1 - 15 / 100); f.juste(13, "b)", seuil(f, "éq. ex.13", 0.5, 0.85)); f.vrai("ex.13", 0.85 ** 4 >= 0.5 && 0.85 ** 5 < 0.5); f.faux(13, "a)", 1.15);
  f.juste(14, "a)", 20000 / 500); f.juste(14, "b)", seuil(f, "éq. ex.14", 40, 1.25)); f.vrai("ex.14", 500 * 1.25 ** 16 <= 20000 && 500 * 1.25 ** 17 > 20000); f.faux(14, "b)", 16);
  f.juste(15, "a)", 81 ** (1 / 4)); f.juste(15, "b)", t4(81) / t4(4)); f.juste(15, "b)", log(81) / log(4)); f.juste(15, "c)", "B"); f.faux(15, "b)", 3);
  f.juste(16, "a)", t4(12) / t4(2)); f.juste(16, "a)", log(12) / log(2)); f.juste(16, "b)", seuil(f, "éq. ex.16", 12, 2)); f.faux(16, "a)", 6);
  // ★★★
  f.juste(17, "a)", 1 / t4(1.5)); f.juste(17, "a)", log(10) / log(1.5)); f.juste(17, "b)", seuil(f, "éq. ex.17", 10, 1.5));
  f.juste(17, "c)", 1.5 ** 5); f.juste(17, "d)", 1.5 ** 6); f.faux(17, "b)", 5); f.faux(17, "a)", 5.69);
  f.juste(18, "a)", 1 - 3 / 100); f.juste(18, "b)", seuil(f, "éq. ex.18 b", 0.5, 0.97)); f.juste(18, "c)", seuil(f, "éq. ex.18 c", 0.25, 0.97));
  f.vrai("ex.18", 0.97 ** 22 >= 0.5 && 0.97 ** 23 < 0.5 && 0.97 ** 45 >= 0.25 && 0.97 ** 46 < 0.25);
  f.juste(18, "d)", `${(0.97 ** 23 * 100).toFixed(1).replace(".", ",")} %`); f.faux(18, "b)", 17); f.faux(18, "d)", "49,7 %");
  f.juste(19, "a)", 12000 / 8000); f.juste(19, "b)", seuil(f, "éq. ex.19 b", 1.5, 1.04)); f.juste(19, "c)", seuil(f, "éq. ex.19 c", 1.5, 1.06));
  f.juste(19, "d)", seuil(f, "éq. ex.19 d1", 1.5, 1.04) - seuil(f, "éq. ex.19 d2", 1.5, 1.06)); f.faux(19, "b)", 10);
  f.juste(20, "a)", log(64) / log(2)); f.juste(20, "b)", seuil(f, "éq. ex.20 b", 500, 2)); f.juste(20, "c)", seuil(f, "éq. ex.20 c", 0.01, 0.5)); f.juste(20, "d)", Math.sqrt(529));
  f.vrai("ex.20", 2 ** 8 < 500 && 2 ** 9 >= 500 && 0.5 ** 6 >= 0.01 && 0.5 ** 7 < 0.01); f.faux(20, "b)", 8);
  f.tout();
}

/* ═══════════════════════════ log-applications ═══════════════════════════ */
{
  const f = await feuille("log-applications");
  tableauxJustes(f, "log-applications");
  // ★
  f.juste(1, null, 1 + 5 / 100); f.faux(1, null, 0.05);
  f.juste(2, null, 3000 / 2000); f.faux(2, null, 1000);
  f.juste(3, null, seuil(f, "app. ex.3", 1.5, 1.05)); f.faux(3, null, 8);
  f.juste(4, null, "1,1^x = 2"); f.faux(4, null, "x^1,1 = 2");
  f.juste(5, null, t4(2) / t4(1.1)); f.juste(5, null, log(2) / log(1.1)); f.faux(5, null, 10); f.faux(5, null, 7.2);
  f.juste(6, null, t4(0.5) / t4(0.9)); f.juste(6, null, log(0.5) / log(0.9)); f.faux(6, null, 5);
  f.juste(7, null, chiffres(12.38)); f.faux(7, null, 12);
  f.juste(8, null, chiffres(20 * t4(2))); f.vrai("ex.8", String(2 ** 20).length === 7); f.faux(8, null, 6);
  // ★★
  f.juste(9, "a)", 2400 / 1500); f.juste(9, "b)", seuil(f, "app. ex.9", 1.6, 1.03)); f.vrai("ex.9", 1500 * 1.03 ** 15 <= 2400 && 1500 * 1.03 ** 16 > 2400); f.faux(9, "b)", 15);
  f.juste(10, "a)", 15000 / 12000); f.juste(10, "b)", seuil(f, "app. ex.10", 1.25, 1.02)); f.vrai("ex.10 linéaire", 3000 / (12000 * 0.02) === 12.5); f.faux(10, "b)", 11);
  f.juste(11, "a)", 1 + 8 / 100); f.juste(11, "b)", seuil(f, "app. ex.11", 1000 / 400, 1.08)); f.vrai("ex.11", 400 * 1.08 ** 11 <= 1000 && 400 * 1.08 ** 12 > 1000);
  f.faux(11, "b)", 11);
  f.juste(12, "a)", t4(2) / t4(1.06)); f.juste(12, "a)", log(2) / log(1.06)); f.juste(12, "b)", seuil(f, "app. ex.12", 2, 1.06)); f.juste(12, "c)", "non"); f.faux(12, "c)", "oui");
  f.juste(13, "a)", t4(0.5) / t4(0.92)); f.juste(13, "a)", log(0.5) / log(0.92)); f.juste(13, "b)", t4(0.25) / t4(0.92)); f.juste(13, "b)", log(0.25) / log(0.92)); f.faux(13, "a)", 50 / 8);
  f.juste(14, "a)", t4(0.5) / t4(0.85)); f.juste(14, "a)", log(0.5) / log(0.85)); f.juste(14, "b)", seuil(f, "app. ex.14", 0.5, 0.85)); f.faux(14, "a)", 50 / 15);
  f.juste(15, "a)", 50 * t4(2)); f.juste(15, "a)", r2(50 * log(2))); f.faux(15, "a)", "log(2^50)"); f.juste(15, "b)", chiffres(50 * t4(2))); f.vrai("ex.15", String(2 ** 50).length === 16);
  f.juste(15, "c)", [Math.floor(50 * log(2)), Math.floor(50 * log(2)) + 1]); f.faux(15, "b)", 15);
  f.juste(16, "a)", [Math.floor(13.4), Math.floor(13.4) + 1]); f.juste(16, "b)", chiffres(13.4)); f.juste(16, "c)", "faux");
  f.faux(16, "b)", 13);
  // ★★★
  f.juste(17, "a)", 1 - 10 / 100); f.juste(17, "b)", 5000 / 20000); f.juste(17, "c)", seuil(f, "app. ex.17 c", 0.25, 0.9)); f.juste(17, "d)", seuil(f, "app. ex.17 d", 0.25, 0.8));
  f.vrai("ex.17", 20000 * 0.9 ** 13 >= 5000 && 20000 * 0.9 ** 14 < 5000 && 20000 * 0.8 ** 6 >= 5000 && 20000 * 0.8 ** 7 < 5000); f.faux(17, "c)", 13);
  f.juste(18, "a)", t4(2) / t4(1.07)); f.juste(18, "a)", log(2) / log(1.07)); f.juste(18, "b)", seuil(f, "app. ex.18", 2, 1.07));
  f.juste(18, "c)", t4(2) / t4(1.05)); f.juste(18, "c)", log(2) / log(1.05)); f.juste(18, "d)", log(2) / log(1.05) - log(2) / log(1.07)); f.faux(18, "b)", 10);
  f.vrai("ex.18 corrigé 1,97", Math.abs(1.07 ** 10 - 1.97) < 0.005);
  f.juste(19, "a)", 64 - 1); f.juste(19, "b)", r2(63 * t4(2))); f.juste(19, "b)", r2(63 * log(2))); f.faux(19, "b)", "log(2^63)"); f.juste(19, "c)", chiffres(63 * log(2))); f.juste(19, "d)", chiffres(39 * log(2)));
  f.vrai("ex.19", (2n ** 63n).toString().length === 19 && (2n ** 39n).toString().length === 12); f.faux(19, "c)", 18);
  f.juste(20, "a)", 1 + 12 / 100); f.juste(20, "b)", t4(2) / t4(1.12)); f.juste(20, "b)", log(2) / log(1.12)); f.juste(20, "c)", 1000 / 250); f.juste(20, "d)", seuil(f, "app. ex.20", 4, 1.12));
  f.vrai("ex.20", 250 * 1.12 ** 12 <= 1000 && 250 * 1.12 ** 13 > 1000); f.faux(20, "d)", 12);
  f.tout();
}

fin();
