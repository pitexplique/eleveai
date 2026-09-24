// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Échantillonnage et
// simulation » de seconde (lib/fiches-exercices/maths-seconde-echantillonnage.tsx).
//
// ⭐ L'AUTRE CHEMIN : chaque intervalle p ± 1/√n est recalculé ici, et chaque
// intervalle DESSINÉ (bornes, crochets) et chaque point (la fréquence observée)
// sont relus dans le source ; on vérifie qu'un point annoncé « dedans » l'est
// vraiment. Les TIRAGES affichés (exercices 11, 12, 13, 19) sont REFAITS par
// Python avec la graine 2026 : un chiffre inventé ne passerait pas.
//
//   node scripts/verifier-exercices-echantillonnage.mjs

import { execFileSync } from "node:child_process";
import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

const ENV = { ...process.env, PYTHONIOENCODING: "utf-8", PYTHONUTF8: "1" };
const py = (code) => execFileSync("python", ["-c", code], { encoding: "utf8", env: ENV }).replace(/\r\n/g, "\n").trim();
const r3 = (x) => Math.round(x * 1000) / 1000;
const marge = (n) => 1 / Math.sqrt(n);

function lireIntervalles(bloc) {
  return [...bloc.matchAll(/intervalles\(([-\d.]+), ([-\d.]+), \[([^\]]*)\](?:, ([\d.]+))?(?:, \[([^\]]*)\])?\)/g)].map((m) => ({
    ivs: [...m[3].matchAll(/\{ de: ([-\d.]+), a: ([-\d.]+)[^}]*label: "([^"]*)"/g)].map((x) => ({ de: Number(x[1]), a: Number(x[2]), label: x[3] })),
    points: [...(m[5] ?? "").matchAll(/value: ([-\d.]+), label: "([^"]*)"/g)].map((x) => ({ value: Number(x[1]), label: x[2] })),
  }));
}
const barres = (bloc) => [...bloc.matchAll(/value: ([\d.]+) \}/g)].map((m) => Number(m[1]));

/** Le programme d'un bloc (les lignes de `programme([...])`). */
const programmeDe = (bloc) => [...bloc.match(/programme\(\[([\s\S]*?)\]\)/)[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) => x[1]).join("\n");

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const b = (k) => f.blocs[k - 1];
  const ecrit = (k, texte) => v.ok(`${k}. le corrigé écrit ${texte}`, c(k).includes(texte), texte);
  /** L'intervalle dessiné (premier de la k-ième figure) est p ± 1/√n, à `tol` près. */
  const intervalleVaut = (k, p, n, tol = 0.0015, rang = 0) => {
    const d = lireIntervalles(b(k))[rang];
    const iv = d?.ivs[0];
    v.ok(`${k}. l'intervalle dessiné est ${p} ± 1/√${n}`, iv && Math.abs(iv.de - (p - marge(n))) < tol && Math.abs(iv.a - (p + marge(n))) < tol, JSON.stringify(iv));
    return d;
  };
  const pointDedans = (k, attendu) => {
    const d = lireIntervalles(b(k))[0];
    const pt = d.points[0], iv = d.ivs[0];
    const dedans = pt.value >= iv.de && pt.value <= iv.a;
    v.ok(`${k}. le point ${pt.value} est ${attendu ? "DANS" : "HORS de"} l'intervalle dessiné`, dedans === attendu);
  };

  v.titre("★ Un seul geste");
  v.ok("1. fréquences 9/20 … 10/20", String([9, 12, 8, 11, 10].map((x) => x / 20)) === String(barres(b(1))));
  v.ok("2. le diagramme : 0,1 ; 0,19 ; 0,1646 ; 1/6", String(barres(b(2)).slice(0, 3)) === "0.1,0.19,0.1646" && Math.abs(barres(b(2))[3] - 1 / 6) < 0.001);
  intervalleVaut(3, 0.5, 100, 1e-9);
  ecrit(3, "= [0{,}4\\,;\\,0{,}6]$");
  intervalleVaut(4, 0.3, 400, 1e-9);
  ecrit(4, "= [0{,}25\\,;\\,0{,}35]$");
  intervalleVaut(5, 0.5, 100, 1e-9);
  pointDedans(5, true);
  intervalleVaut(6, 0.5, 100, 1e-9);
  pointDedans(6, false);
  const i7 = intervalleVaut(7, 0.5, 1000);
  v.ok("7. le programme compte les piles (random() < 0.5) et renvoie p / n", programmeDe(b(7)).includes("if random() < 0.5:") && programmeDe(b(7)).includes("return p / n"));
  ecrit(7, "\\approx 0{,}468$ et $0{,}532$");
  v.ok("8. 382 / 1 000 = 0,382", 382 / 1000 === 0.382 && String(barres(b(8))) === "382,618");

  v.titre("★★ Type devoir");
  const d9 = lireIntervalles(b(9))[0].ivs;
  v.ok("9. trois intervalles : n = 25, 100, 2 500", [25, 100, 2500].every((n, i) => Math.abs(d9[i].de - (0.5 - marge(n))) < 1e-9 && Math.abs(d9[i].a - (0.5 + marge(n))) < 1e-9));
  ecrit(9, "intervalle $[0{,}48\\,;\\,0{,}52]$");

  intervalleVaut(10, 0.5, 1000);
  pointDedans(10, true);
  ecrit(10, "$\\dfrac{1}{\\sqrt{1\\,000}} \\approx 0{,}032$");

  const code11 = programmeDe(b(11));
  const t11 = JSON.parse(py(`from random import random, seed\n${code11}\nseed(2026)\nprint([filles(1000) for _ in range(3)])`));
  v.ok("11. les trois essais sont ceux de Python (graine 2026)", String(t11) === "0.484,0.504,0.533" && String(barres(b(11)).slice(0, 3)) === String(t11), String(t11));
  const lo11 = 0.49 - marge(1000), hi11 = 0.49 + marge(1000);
  v.ok("11. 0,484 et 0,504 dedans, 0,533 dehors", t11[0] >= lo11 && t11[0] <= hi11 && t11[1] <= hi11 && t11[2] > hi11 && Math.abs(r3(lo11) - 0.458) < 0.0015 && Math.abs(r3(hi11) - 0.522) < 0.0015);

  const t12 = JSON.parse(py(`from random import randint, seed\nseed(2026)\ndef six(n):\n    s = 0\n    for i in range(n):\n        if randint(1, 6) == 6:\n            s = s + 1\n    return s / n\nprint([six(1000) for _ in range(4)])`));
  v.ok("12. les quatre séries sont celles de Python (graine 2026), toutes dans [0,135 ; 0,198]", String(t12) === "0.177,0.153,0.158,0.155" && String(barres(b(12)).slice(0, 4)) === String(t12) && t12.every((x) => x >= 1 / 6 - marge(1000) && x <= 1 / 6 + marge(1000)), String(t12));

  const t13 = JSON.parse(py(`from random import random, seed\nseed(2026)\nf = [sum(1 for i in range(100) if random() < 0.5) / 100 for k in range(50)]\nprint([sum(1 for x in f if 0.4 <= x <= 0.6), min(f), max(f)])`));
  v.ok("13. 46 séries sur 50 dans l'intervalle, de 0,41 à 0,64 (Python, graine 2026)", String(t13) === "46,0.41,0.64" && String(barres(b(13))) === "46,4", String(t13));
  ecrit(13, "$\\dfrac{46}{50} = 0{,}92$");

  const i14 = intervalleVaut(14, 1 / 6, 600);
  pointDedans(14, false);
  v.ok("14. f = 130 / 600 ≈ 0,217", r3(130 / 600) === 0.217);

  const chiffres = "7 2 9 0 4 4 8 1 5 3 6 2 9 7 0 5 8 3 1 6".split(" ").map(Number);
  const succes = chiffres.map((x, i) => [i + 1, x]).filter(([, x]) => x <= 2);
  const t15 = JSON.parse(b(15).match(/trace\(\[[^\]]*\], (\[\[[\s\S]*?\]\])\)/)[1]);
  v.ok("15. 6 succès sur 20, aux bons rangs", succes.length === 6 && JSON.stringify(t15.map(([r, x]) => [r, x])) === JSON.stringify(succes) && f.enonces[14].includes(chiffres.join(" ")));
  ecrit(15, "$\\dfrac{6}{20} = 0{,}3$");

  const d16 = lireIntervalles(b(16))[0].ivs;
  v.ok("16. petite : 0,5 ± 1/√15 ; grande : 0,5 ± 1/√45 (au centième)", Math.abs(d16[0].de - (0.5 - marge(15))) < 0.005 && Math.abs(d16[0].a - (0.5 + marge(15))) < 0.005 && Math.abs(d16[1].de - (0.5 - marge(45))) < 0.005 && Math.abs(d16[1].a - (0.5 + marge(45))) < 0.005);

  v.titre("★★★ Problèmes");
  const d17 = lireIntervalles(b(17))[0].ivs;
  v.ok("17. A : 52 ± 3, B : 48 ± 3, et ils se chevauchent", d17[0].de === 49 && d17[0].a === 55 && d17[1].de === 45 && d17[1].a === 51 && d17[1].a > d17[0].de && Math.round(100 * marge(1000)) === 3);
  v.ok("17. marge de 1 point : n = 10 000", marge(10000) === 0.01);
  ecrit(17, "donc $n = 10\\,000$ personnes");

  intervalleVaut(18, 0.512, 400, 1e-9);
  pointDedans(18, true);
  ecrit(18, "$f = \\dfrac{190}{400} = 0{,}475$");

  const code19 = programmeDe(b(19));
  const t19 = JSON.parse(py(`from random import random, seed\n${code19}\nseed(2026)\nprint([quart(n) for n in (100, 1000, 10000)])`));
  v.ok("19. les trois fréquences sont celles de Python (graine 2026)", String(t19) === "0.77,0.783,0.7885", String(t19));
  const pis = t19.map((x) => Math.round(4 * x * 10000) / 10000);
  v.ok("19. le diagramme : 4f pour chaque taille, puis π", String(barres(b(19)).slice(0, 3)) === String(pis) && barres(b(19))[3] === 3.1416, String(pis));
  ecrit(19, "$4 \\times 0{,}7885 = 3{,}154$");

  v.ok("20. 12 / 150 = 0,08 ; 200 / 0,08 = 2 500", 12 / 150 === 0.08 && Math.round(200 / 0.08) === 2500 && b(20).includes('["Lac (estimé)", "200", "2300", "2500"]'));
  ecrit(20, "$\\dfrac{200}{0{,}08} = 2\\,500$");
}

lancer({
  nom: "ÉCHANTILLONNAGE ET SIMULATION · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-echantillonnage.tsx",
  notionId: "echantillonnage_simulation",
  verifier,
  casses: [
    ["ex. 1 : une barre fausse", "{ label: \"G2\", value: 0.6 }", "{ label: \"G2\", value: 0.65 }"],
    ["ex. 3 : 1/n au lieu de 1/√n", "{ de: 0.4, a: 0.6, deInclus: true, aInclus: true, label: \"95 % des séries\"", "{ de: 0.49, a: 0.51, deInclus: true, aInclus: true, label: \"95 % des séries\""],
    ["ex. 4 : l'intervalle faux", "= [0{,}25\\\\,;\\\\,0{,}35]$", "= [0{,}29\\\\,;\\\\,0{,}31]$"],
    ["ex. 5 : la fréquence mal placée", "{ value: 0.58, label: \"f = 0,58\"", "{ value: 0.62, label: \"f = 0,58\""],
    ["ex. 6 : la fréquence mise dedans", "{ value: 0.67, label: \"f = 0,67\"", "{ value: 0.57, label: \"f = 0,67\""],
    ["ex. 9 : un intervalle faux", "{ de: 0.48, a: 0.52, deInclus: true, aInclus: true, label: \"n = 2 500\"", "{ de: 0.49, a: 0.51, deInclus: true, aInclus: true, label: \"n = 2 500\""],
    ["ex. 11 : un tirage inventé", "{ label: \"Essai 3\", value: 0.533 }", "{ label: \"Essai 3\", value: 0.513 }"],
    ["ex. 11 : la probabilité du programme changée", "\"        if random() < 0.49:\"", "\"        if random() < 0.5:\""],
    ["ex. 12 : une série inventée", "{ label: \"Série 1\", value: 0.177 }", "{ label: \"Série 1\", value: 0.167 }"],
    ["ex. 13 : le camembert faux", "{ label: \"Dans [0,4 ; 0,6] : 46\", value: 46 }", "{ label: \"Dans [0,4 ; 0,6] : 46\", value: 48 }"],
    ["ex. 14 : l'intervalle du dé faux", "{ de: 0.126, a: 0.207", "{ de: 0.126, a: 0.227"],
    ["ex. 15 : un succès oublié", "[19, 1, \"oui\"]", "[19, 3, \"oui\"]"],
    ["ex. 17 : les marges ne se chevauchent plus", "{ de: 45, a: 51, deInclus: true, aInclus: true, label: \"B : 48 ± 3\"", "{ de: 45, a: 48, deInclus: true, aInclus: true, label: \"B : 48 ± 3\""],
    ["ex. 19 : une estimation de π fausse", "{ label: \"10 000\", value: 3.154 }", "{ label: \"10 000\", value: 3.14 }"],
    ["ex. 20 : la population fausse", "$\\\\dfrac{200}{0{,}08} = 2\\\\,500$", "$\\\\dfrac{200}{0{,}08} = 1\\\\,600$"],
  ],
});
