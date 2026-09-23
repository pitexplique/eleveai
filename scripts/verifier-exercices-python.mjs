// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Algorithmique et
// Python » de seconde (lib/fiches-exercices/maths-seconde-python.tsx).
//
// ⭐ L'AUTRE CHEMIN, LE PLUS DIRECT : chaque programme dessiné (`programme([…])`)
// est RELU dans le source et EXÉCUTÉ par Python, avec quelques lignes d'appel
// ajoutées ; ce qu'il affiche est comparé au corrigé. Les traces (`trace(…)`)
// sont relues et comparées à une exécution pas à pas. Les simulations tournent
// avec une graine fixe (2026), la même que celle du diagramme de l'exercice 17.
//
//   node scripts/verifier-exercices-python.mjs

import { execFileSync } from "node:child_process";
import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/** Exécute du Python, renvoie { sortie, erreur }.
 *  ⛔ Sous Windows, Python écrit des `\r\n` et dans la page de code du
 *  terminal (« Âge » arrivait en « �ge ») : on force l'UTF-8 et on normalise. */
const ENV = { ...process.env, PYTHONIOENCODING: "utf-8", PYTHONUTF8: "1" };
const net = (s) => String(s ?? "").replace(/\r\n/g, "\n").trim();
function py(code, entree = "") {
  try {
    return { sortie: net(execFileSync("python", ["-c", code], { input: entree, encoding: "utf8", env: ENV, stdio: ["pipe", "pipe", "pipe"] })), erreur: null };
  } catch (e) {
    return { sortie: net(e.stdout), erreur: net(e.stderr).split("\n").pop() };
  }
}

/** Les programmes d'un bloc, dans l'ordre (énoncé puis corrigé). */
function programmes(bloc) {
  return [...bloc.matchAll(/programme\(\[([\s\S]*?)\](?:, \d+)?\)/g)].map((m) => [...m[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) => x[1]).join("\n"));
}
/** Les lignes de la trace d'un bloc (le second argument est du JSON valide). */
function traceDe(bloc) {
  const m = bloc.match(/trace\((\[[^\]]*\]), (\[\[[\s\S]*?\]\])\)/);
  return m ? JSON.parse(m[2]) : null;
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const ecrit = (k, texte) => v.ok(`${k}. le corrigé écrit ${texte}`, c(k).includes(texte), texte);
  const prog = (k, i = 0) => programmes(f.blocs[k - 1])[i] ?? "";
  const tr = (k) => traceDe(f.blocs[k - 1]);
  /** Le programme k (plus des lignes d'appel) affiche exactement `attendu`. */
  const affiche = (k, suite, attendu, { i = 0, entree = "", remplace } = {}) => {
    let code = prog(k, i);
    if (remplace) code = code.replace(remplace[0], remplace[1]);
    const r = py(`${code}\n${suite}`, entree);
    v.ok(`${k}. Python affiche ${JSON.stringify(attendu)}`, !r.erreur && r.sortie === attendu, r.erreur ?? r.sortie);
    return r.sortie;
  };
  const colonne = (t, j) => (t ?? []).map((l) => l[j]);

  v.titre("★ Un seul geste");
  affiche(1, "print(a, b)", "3 5");
  ecrit(1, "a vaut $3$ et b vaut $5$");
  const pas1 = py("a=5\nprint(a,'-')\nb=3\nprint(a,b)\na=a+b\nprint(a,b)\nb=a-b\nprint(a,b)\na=a-b\nprint(a,b)").sortie.split("\n").map((l) => l.split(" "));
  v.ok("1. la trace est celle de l'exécution pas à pas", JSON.stringify(tr(1).map((l) => [String(l[1]), String(l[2]).replace("–", "-")])) === JSON.stringify(pas1));

  affiche(2, "print(x)", "49");
  v.ok("2. trace 2, 7, 49", JSON.stringify(colonne(tr(2), 1)) === "[2,7,49]");

  const exprs3 = ["7", "7.0", "7 / 2", "7 // 2", "7 % 2", "'7'", "3 < 5"];
  const r3 = py(exprs3.map((e) => `print(repr(${e}), type(${e}).__name__)`).join("\n")).sortie.split("\n").map((l) => l.split(" "));
  v.ok("3. valeurs et types = ceux de Python", JSON.stringify(tr(3).map((l) => [String(l[1]), l[2]])) === JSON.stringify(r3), JSON.stringify(r3));

  const exprs4 = ["6 / 3", "'3' + '4'", "3 + 4", "int('3') + 4", "'3' * 2"];
  const r4 = py(exprs4.map((e) => `print(repr(${e}))`).join("\n")).sortie.split("\n");
  v.ok("4. résultats = ceux de Python", JSON.stringify(tr(4).map((l) => String(l[1]))) === JSON.stringify(r4), JSON.stringify(r4));

  affiche(5, "", "impair");
  affiche(5, "", "pair", { remplace: ["n = 17", "n = 40"] });

  affiche(6, "print(prix(8), prix(12), prix(17), prix(18))", "5 7 7 10");
  v.ok("6. la trace donne 5, 7, 7, 10", JSON.stringify(colonne(tr(6), 3)) === "[5,7,7,10]");

  affiche(7, "", "15");
  v.ok("7. trace de s : 1, 3, 6, 10, 15", JSON.stringify(colonne(tr(7), 2)) === "[1,3,6,10,15]");

  affiche(8, "", "128");
  const tours8 = py(prog(8).replace("    n = n * 2", "    n = n * 2\n    t = t + 1").replace("n = 1", "n = 1\nt = 0") + "\nprint(t)").sortie.split("\n").pop();
  v.ok("8. la boucle tourne 7 fois, comme la trace", tours8 === "7" && tr(8).length === 7 && c(8).includes("La boucle a tourné $7$ fois"));
  // ⛔ Le nombre de lignes ne suffisait pas : une trace qui s'arrête à 64 passait (casse du 23/09).
  const pas8 = py("n = 1\nwhile n < 100:\n    print(n, 'oui' if n < 100 else 'non', n * 2)\n    n = n * 2").sortie.split("\n").map((l) => l.split(" "));
  v.ok("8. chaque ligne de la trace est celle de l'exécution", JSON.stringify(tr(8).map((l) => [String(l[1]), l[2], String(l[3])])) === JSON.stringify(pas8), JSON.stringify(pas8));

  v.titre("★★ Type devoir");
  affiche(9, "print(f(2), f(-1), f(0))", "7 -2 -5");
  v.ok("9. « -1 ** 2 » vaut bien -1 en Python", py("print(-1 ** 2)").sortie === "-1");

  affiche(10, "", "12.0");
  affiche(11, "", "11");
  const c11 = py("c = 1000\nL = []\nfor n in range(12):\n    L.append(round(c, 2))\n    c = c * 1.04\nprint(L)").sortie;
  const L11 = JSON.parse(c11);
  const lus11 = tr(11).map(([n, x]) => [n, Number(String(x).replace(/\s/g, "").replace(",", "."))]);
  v.ok("11. chaque capital de la trace est juste au centime", lus11.every(([n, x]) => Math.abs(L11[n] - x) < 0.005), c11);
  ecrit(11, "$1\\,480{,}24$ €");
  ecrit(11, "$1\\,539{,}45$ €");

  affiche(12, "print(est_multiple(21, 7), est_multiple(22, 7))", "True False");
  affiche(13, "", "385");
  affiche(14, "", "8");
  const suite14 = py(prog(14).replace("        n = n // 2", "        n = n // 2").replace("    etapes = etapes + 1", "    etapes = etapes + 1\n    L.append(n)").replace("n = 6", "n = 6\nL = [6]") + "\nprint(L)").sortie.split("\n").pop();
  v.ok("14. la trace est la suite de Syracuse de 6", JSON.stringify(colonne(tr(14), 1)) === suite14.replace(/ /g, ""), suite14);

  const casse15 = py(prog(15, 0), "15");
  v.ok("15. le programme de l'énoncé plante (TypeError)", /TypeError/.test(casse15.erreur ?? ""), casse15.erreur ?? "aucune erreur");
  affiche(15, "", "Âge ? 16", { i: 1, entree: "15" });

  affiche(16, "print(somme(4), somme(100))", "10 5050");

  v.titre("★★★ Problèmes");
  const essai = affiche(17, "from random import seed\nseed(2026)\nprint([lancers(n) for n in (10, 100, 10000)])", "[0.1, 0.19, 0.1646]");
  const barres17 = [...f.blocs[16].matchAll(/value: ([\d.]+)/g)].map((m) => Number(m[1]));
  v.ok("17. le diagramme porte le VRAI essai, puis 1/6", essai && String(barres17.slice(0, 3)) === String(JSON.parse(essai)) && Math.abs(barres17[3] - 1 / 6) < 0.001);

  affiche(18, "", "2035");
  affiche(18, "", "2033", { remplace: ["co2 + 2.5", "co2 + 3"] });
  affiche(18, "print(type(co2).__name__, co2)", "2035\nfloat 451.5");

  const complet19 = prog(19).replace("if ...:", "if s == 7:").replace("if ...:", "if s == 12:");
  const r19 = py(`from random import seed\nseed(2026)\n${complet19}`).sortie.split(" ").map(Number);
  v.ok("19. la simulation donne environ 6 000 et 1 000", Math.abs(r19[0] - 6000) < 300 && Math.abs(r19[1] - 1000) < 150, String(r19));
  const theo = py("print([sum(1 for a in range(1,7) for b in range(1,7) if a+b==s) for s in range(2,13)])").sortie;
  const barres19 = [...f.blocs[18].matchAll(/value: (\d+)/g)].map((m) => Number(m[1]));
  v.ok("19. le diagramme compte les 36 couples de chaque somme", JSON.stringify(barres19) === theo.replace(/ /g, ""), theo);
  ecrit(19, "« if s == 7: » et « if s == 12: »");

  affiche(20, "", "1.5000000000000004");
  affiche(20, "", "1.4200000000000004", { remplace: ["x + 0.1", "x + 0.01"] });
  v.ok("20. 1,4² < 2 < 1,5² et 1,41² < 2 < 1,42²", 1.96 < 2 && 2 < 2.25 && 1.41 ** 2 < 2 && 2 < 1.42 ** 2 && c(20).includes("$1{,}41 < \\sqrt{2} < 1{,}42$"));
}

lancer({
  nom: "ALGORITHMIQUE ET PYTHON · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-python.tsx",
  notionId: "algorithmique_python_2de",
  verifier,
  casses: [
    ["ex. 1 : une ligne du programme changée", "\"b = a - b\", \"a = a - b\"]", "\"b = a - b\", \"a = a + b\"]"],
    ["ex. 1 : la trace fausse", "[4, 8, 5], [5, 3, 5]", "[4, 8, 5], [5, 5, 3]"],
    ["ex. 3 : un type faux", "[\"7 / 2\", \"3.5\", \"float\"]", "[\"7 / 2\", \"3.5\", \"int\"]"],
    ["ex. 4 : 6 / 3 = 2", "[\"6 / 3\", \"2.0\"]", "[\"6 / 3\", \"2\"]"],
    ["ex. 6 : la borne 12 incluse", "\"    if age < 12:\"", "\"    if age <= 12:\""],
    ["ex. 7 : range jusqu'à 7", "\"for i in range(1, 6):\"", "\"for i in range(1, 7):\""],
    ["ex. 8 : la trace s'arrête à 64", "[7, 64, \"oui\", 128]", "[7, 64, \"non\", 64]"],
    ["ex. 11 : un capital faux dans la trace", "[10, \"1 480,24\"]", "[10, \"1 480,00\"]"],
    ["ex. 13 : range(1, 10)", "\"for k in range(1, 11):\"", "\"for k in range(1, 10):\""],
    ["ex. 14 : la suite de Syracuse fausse", "[3, 5], [4, 16]", "[3, 5], [4, 15]"],
    ["ex. 15 : la correction oublie int()", "programme([\"age = int(input('Âge ? '))\"", "programme([\"age = input('Âge ? ')\""],
    ["ex. 17 : le diagramme n'est pas le vrai essai", "{ label: \"100\", value: 0.19 }", "{ label: \"100\", value: 0.2 }"],
    ["ex. 18 : la hausse annuelle changée", "\"    co2 = co2 + 2.5\"", "\"    co2 = co2 + 2\""],
    ["ex. 19 : une barre fausse", "{ label: \"8\", value: 5 }", "{ label: \"8\", value: 6 }"],
    ["ex. 20 : l'encadrement faux", "$1{,}41 < \\\\sqrt{2} < 1{,}42$", "$1{,}42 < \\\\sqrt{2} < 1{,}43$"],
  ],
});
