// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Ensembles et
// logique » de seconde (lib/fiches-exercices/maths-seconde-logique.tsx).
//
// ⭐ L'AUTRE CHEMIN : les ensembles finis sont reconstruits ICI (diviseurs,
// multiples, parités), les intervalles sont testés point par point sur une
// grille fine (un réel est-il dans I ∩ J ? dans la négation ?), les
// contre-exemples sont recalculés. Puis les schémas sont relus : les quatre
// zones de chaque diagramme de Venn, chaque intervalle dessiné (bornes et
// crochets), chaque ligne de tableau.
//
//   node scripts/verifier-exercices-logique.mjs

import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const trie = (s) => [...s].sort((x, y) => x - y);
const eq = (a, b) => JSON.stringify(trie(a)) === JSON.stringify(trie(b));
const diviseurs = (n) => range(1, n).filter((d) => n % d === 0);
const premier = (n) => n > 1 && range(2, Math.floor(Math.sqrt(n))).every((d) => n % d);
/** Un intervalle { de, a, deInclus, aInclus } contient-il x ? */
const dans = (iv, x) => (iv.de === undefined || x > iv.de || (iv.deInclus && x === iv.de)) && (iv.a === undefined || x < iv.a || (iv.aInclus && x === iv.a));
const GRILLE = range(-400, 400).map((k) => k / 20); // de −20 à 20, pas 0,05 — bornes comprises
const memeEnsemble = (p, q, g = GRILLE) => g.every((x) => p(x) === q(x));

function lireIntervalles(bloc) {
  return [...bloc.matchAll(/\{ ((?:de|a): [-\d.]+[^}]*)\}/g)]
    .map((m) => m[1])
    .filter((t) => /label:/.test(t))
    .map((t) => ({
      de: t.match(/\bde: ([-\d.]+)/) ? Number(t.match(/\bde: ([-\d.]+)/)[1]) : undefined,
      a: t.match(/\ba: ([-\d.]+)/) ? Number(t.match(/\ba: ([-\d.]+)/)[1]) : undefined,
      deInclus: /deInclus: true/.test(t),
      aInclus: /aInclus: true/.test(t),
      label: t.match(/label: "([^"]*)"/)[1],
    }));
}
function lireVenn(bloc) {
  const m = bloc.match(/venn\(\{ aSeul: \[([^\]]*)\], commun: \[([^\]]*)\], bSeul: \[([^\]]*)\](?:, dehors: \[([^\]]*)\])? \}/);
  const liste = (s) => (s ?? "").match(/"([^"]*)"/g)?.map((x) => x.slice(1, -1)).join(" ").split(/\s+/).filter(Boolean).map((x) => (/^\d+$/.test(x) ? Number(x) : x)) ?? [];
  return m && { aSeul: liste(m[1]), commun: liste(m[2]), bSeul: liste(m[3]), dehors: liste(m[4]) };
}
function lireTrace(bloc) {
  const m = bloc.match(/trace\((\[[^\]]*\]), (\[\[[\s\S]*?\]\])\)/);
  return m ? JSON.parse(m[2]) : null;
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const b = (k) => f.blocs[k - 1];
  const ecrit = (k, texte) => v.ok(`${k}. le corrigé écrit ${texte}`, c(k).includes(texte), texte);
  /** L'intervalle dessiné d'étiquette `label` est exactement l'ensemble `pred` (réunion des morceaux de même étiquette). */
  // ⛔ La grille doit couvrir les bornes : l'aquarium (22 à 30 °C) sortait de
  // −20…20, et une intersection fausse y passait inaperçue (casse du 24/09).
  const dessine = (k, label, pred, g = GRILLE) => {
    const ivs = lireIntervalles(b(k)).filter((iv) => iv.label === label);
    v.ok(`${k}. l'intervalle dessiné « ${label} » est le bon`, ivs.length > 0 && memeEnsemble((x) => ivs.some((iv) => dans(iv, x)), pred, g), JSON.stringify(ivs));
  };
  const G20 = range(300, 700).map((k) => k / 20);
  const vennJuste = (k, A, B, E) => {
    const z = lireVenn(b(k));
    const ok = z && eq(z.aSeul, A.filter((x) => !B.includes(x))) && eq(z.commun, A.filter((x) => B.includes(x))) && eq(z.bSeul, B.filter((x) => !A.includes(x)));
    v.ok(`${k}. les trois zones du diagramme de Venn sont justes`, ok, JSON.stringify(z));
    if (E) v.ok(`${k}. le « dehors » compte les éléments hors de A ∪ B`, z.dehors.includes(E.filter((x) => !A.includes(x) && !B.includes(x)).length));
  };

  v.titre("★ Un seul geste");
  ecrit(1, "$-2 \\notin \\mathbb{N}$");
  ecrit(1, "$\\sqrt{2} \\notin \\mathbb{Q}$");
  ecrit(1, "$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$");
  const t1 = b(1).match(/tableauProba\(\[[^\]]*\], (\[\[[\s\S]*?\]\]), (\[\[[\s\S]*?\]\])\)/);
  const lignes1 = JSON.parse(t1[1]);
  const vrai1 = { "3": [1, 1, 1, 1], "−2": [0, 1, 1, 1], "0,5": [0, 0, 1, 1], "√2": [0, 0, 0, 1], "π": [0, 0, 0, 1] };
  v.ok("1. le tableau d'appartenance est juste", lignes1.every((l) => JSON.stringify(l.slice(1).map((x) => (x === "oui" ? 1 : 0))) === JSON.stringify(vrai1[l[0]])));

  const A2 = [2, 4, 6, 8], B2 = range(1, 10).filter((x) => x % 2 === 0);
  v.ok("2. A ⊂ B et B ⊄ A (10)", A2.every((x) => B2.includes(x)) && B2.filter((x) => !A2.includes(x)).join() === "10");
  ecrit(2, "$B = \\{2\\,;\\,4\\,;\\,6\\,;\\,8\\,;\\,10\\}$");
  vennJuste(2, A2, B2);

  const I3 = { de: -2, a: 5, deInclus: true, aInclus: true }, J3 = { de: 1, a: 7, deInclus: false, aInclus: true };
  v.ok("3. I ∩ J = ]1 ; 5] et I ∪ J = [−2 ; 7]", memeEnsemble((x) => dans(I3, x) && dans(J3, x), (x) => x > 1 && x <= 5) && memeEnsemble((x) => dans(I3, x) || dans(J3, x), (x) => x >= -2 && x <= 7));
  ecrit(3, "$I \\cap J = \\,]1\\,;\\,5]$");
  ecrit(3, "$I \\cup J = [-2\\,;\\,7]$");
  dessine(3, "I", (x) => dans(I3, x));
  dessine(3, "J", (x) => dans(J3, x));
  dessine(3, "I ∩ J", (x) => x > 1 && x <= 5);

  const A4 = diviseurs(12), B4 = diviseurs(18);
  v.ok("4. A ∩ B = {1 ; 2 ; 3 ; 6}, PGCD 6", eq(A4.filter((x) => B4.includes(x)), [1, 2, 3, 6]) && Math.max(...A4.filter((x) => B4.includes(x))) === 6);
  ecrit(4, "$A \\cap B = \\{1\\,;\\,2\\,;\\,3\\,;\\,6\\}$");
  ecrit(4, "$A \\cup B = \\{1\\,;\\,2\\,;\\,3\\,;\\,4\\,;\\,6\\,;\\,9\\,;\\,12\\,;\\,18\\}$");
  vennJuste(4, A4, B4);

  dessine(5, "a)", (x) => x > 2 && x < 5);
  dessine(5, "b)", (x) => x < -1 || x > 3);
  ecrit(5, "$]2\\,;\\,5[$");

  dessine(6, "x ≥ 3", (x) => x >= 3);
  dessine(6, "sa négation : x < 3", (x) => !(x >= 3));
  ecrit(6, "« $x < 3$ »");

  v.ok("7. 0,5² = 0,25 < 0,5 (contre-exemple) ; x² < x exactement sur ]0 ; 1[", 0.5 ** 2 === 0.25 && memeEnsemble((x) => x * x < x, (x) => x > 0 && x < 1));
  ecrit(7, "$0{,}5^2 = 0{,}25$, et $0{,}25 < 0{,}5$");

  const t8 = lireTrace(b(8));
  v.ok("8. la trace : parité et multiples de 4 justes", t8.every(([n, p, m]) => (n % 2 === 0 ? "oui" : "non") === p && (n % 4 === 0 ? "oui" : "non") === m));
  v.ok("8. 6 contredit la réciproque", 6 % 2 === 0 && 6 % 4 !== 0 && c(8).includes("$6$ est pair, mais n'est pas un multiple de $4$"));

  v.titre("★★ Type devoir");
  v.ok("9. x² = 4 ⇔ x ∈ {−2 ; 2}", range(-50, 50).filter((x) => x * x === 4).join() === "-2,2");
  ecrit(9, "$x^2 = 4 \\Leftrightarrow x = 2$ ou $x = -2$");
  v.ok("9. le repère marque (−2 ; 4) et (2 ; 4), et la droite y = 4", b(9).includes("[{ x: -2, y: 4 }, { x: 2, y: 4 }], 4)"));

  const A10 = { a: 2, aInclus: true }, B10 = { de: 0, a: 5, deInclus: true, aInclus: true };
  dessine(10, "A", (x) => dans(A10, x));
  dessine(10, "complémentaire de A", (x) => !dans(A10, x));
  dessine(10, "B", (x) => dans(B10, x));
  v.ok("10. A ∩ B = [0 ; 2], Ā ∩ B = ]2 ; 5]", memeEnsemble((x) => dans(A10, x) && dans(B10, x), (x) => x >= 0 && x <= 2) && memeEnsemble((x) => !dans(A10, x) && dans(B10, x), (x) => x > 2 && x <= 5));
  ecrit(10, "$\\overline{A} = \\,]2\\,;\\,+\\infty[$");

  dessine(11, "[1 ; 4]", (x) => x >= 1 && x <= 4);
  dessine(11, "négation", (x) => !(x >= 1 && x <= 4));
  ecrit(11, "« $x < 1$ OU $x > 4$ »");

  const E12 = range(1, 20), A12 = E12.filter((x) => x % 3 === 0), B12 = E12.filter((x) => x % 5 === 0);
  const U12 = E12.filter((x) => A12.includes(x) || B12.includes(x));
  v.ok("12. A ∩ B = {15}, |A ∪ B| = 9, complémentaire 11", eq(A12.filter((x) => B12.includes(x)), [15]) && U12.length === 9 && 20 - U12.length === 11);
  ecrit(12, "$6 + 4 - 1 = 9$ éléments");
  ecrit(12, "$20 - 9 = 11$");
  vennJuste(12, A12, B12, E12);

  const t13 = lireTrace(b(13));
  v.ok("13. les nombres du tableau sont premiers, et seul 2 est pair", t13.length === 5 && t13.every(([n, p]) => premier(n) && (n % 2 === 0 ? "oui" : "non") === p));
  ecrit(13, "$2$ est premier et pair");

  v.ok("14. n = 2k + 1 ⇒ n² = 2(2k² + 2k) + 1, vérifié pour k de −50 à 50", range(-50, 50).every((k) => (2 * k + 1) ** 2 === 2 * (2 * k * k + 2 * k) + 1));
  const t14 = lireTrace(b(14));
  v.ok("14. la trace : n² et sa parité justes", t14.every(([n, c2, p]) => c2 === n * n && p === (n % 2 ? "impair" : "pair")));

  dessine(15, "a)", (x) => 2 * x - 1 > 3 && x <= 6);
  dessine(15, "b)", (x) => 2 * x - 1 > 3 || x <= 0);
  ecrit(15, "$]2\\,;\\,6]$");

  const P16 = { A: [1, 1], B: [6, 1], C: [6, 4], D: [1, 4] };
  const d2 = (P, Q) => (P[0] - Q[0]) ** 2 + (P[1] - Q[1]) ** 2;
  v.ok("16. le rectangle dessiné a des diagonales égales mais n'est pas un carré", d2(P16.A, P16.C) === d2(P16.B, P16.D) && d2(P16.A, P16.B) !== d2(P16.B, P16.C));
  v.ok("16. les points dessinés sont ceux du rectangle", ["A", "B", "C", "D"].every((l) => b(16).includes(`{ x: ${P16[l][0]}, y: ${P16[l][1]}, label: "${l}" }`)));

  v.titre("★★★ Problèmes");
  v.ok("17. le tableau n'a qu'une case d'infraction : rouge et je passe", (b(17).match(/INFRACTION/g) ?? []).length === 1 && b(17).includes('[["Feu rouge", "règle respectée", "INFRACTION"]') && b(17).includes("[[0, 2]]"));
  ecrit(17, "« le feu est rouge ET je ne m'arrête pas »");

  const gens = [["Lou", 19, "etudiant"], ["Malik", 23, "salarie"], ["Nina", 31, "de"], ["Theo", 24, "de"]];
  const aide = gens.map(([, age, st]) => age < 25 && (st === "etudiant" || st === "de"));
  const autre = gens.map(([, age, st]) => (age < 25 && st === "etudiant") || st === "de");
  v.ok("18. aide : Lou et Théo ; l'autre lecture ajoute Nina", aide.join() === "true,false,false,true" && autre.join() === "true,false,true,true");
  v.ok("18. le tableau surligne Lou et Théo", b(18).includes("[[0, 3], [3, 3]]") && (b(18).match(/"OUI"/g) ?? []).length === 2);

  const euler = (n) => n * n + n + 41;
  v.ok("19. premier de 0 à 39, pas à 40 (1 681 = 41²)", range(0, 39).every((n) => premier(euler(n))) && euler(40) === 1681 && 41 * 41 === 1681 && !premier(1681));
  const t19 = lireTrace(b(19));
  v.ok("19. la trace : valeurs et primalité justes", t19.every(([n, val, p]) => val === euler(n) && (premier(val) ? p === "oui" : p.startsWith("NON"))));
  ecrit(19, "$40^2 + 40 + 41 = 1\\,600 + 40 + 41 = 1\\,681 = 41^2 = 41 \\times 41$");

  const N20 = { de: 22, a: 28, deInclus: true, aInclus: true }, D20 = { de: 25, a: 30, deInclus: true, aInclus: true };
  dessine(20, "néon", (x) => dans(N20, x), G20);
  dessine(20, "disque", (x) => dans(D20, x), G20);
  dessine(20, "les deux", (x) => dans(N20, x) && dans(D20, x), G20);
  v.ok("20. N ∩ D = [25 ; 28], N ∪ D = [22 ; 30], 24 ∈ N mais pas D", memeEnsemble((x) => dans(N20, x) && dans(D20, x), (x) => x >= 25 && x <= 28, range(300, 700).map((k) => k / 20)) && memeEnsemble((x) => dans(N20, x) || dans(D20, x), (x) => x >= 22 && x <= 30, range(300, 700).map((k) => k / 20)) && dans(N20, 24) && !dans(D20, 24));
  ecrit(20, "$N \\cap D = [25\\,;\\,28]$");
}

lancer({
  nom: "ENSEMBLES ET LOGIQUE · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-logique.tsx",
  notionId: "logique_ensembles",
  verifier,
  casses: [
    ["ex. 1 : une appartenance fausse", "[\"0,5\", \"non\", \"non\", \"oui\", \"oui\"]", "[\"0,5\", \"non\", \"oui\", \"oui\", \"oui\"]"],
    ["ex. 2 : le 10 mis dans A", "venn({ aSeul: [], commun: [\"2\", \"4\", \"6\", \"8\"], bSeul: [\"10\"] })", "venn({ aSeul: [], commun: [\"2\", \"4\", \"6\", \"8\", \"10\"], bSeul: [] })"],
    ["ex. 3 : la borne 1 incluse dans l'intersection", "{ de: 1, a: 5, deInclus: false, aInclus: true, label: \"I ∩ J\"", "{ de: 1, a: 5, deInclus: true, aInclus: true, label: \"I ∩ J\""],
    ["ex. 4 : un diviseur commun oublié", "commun: [\"1\", \"2\", \"3\", \"6\"], bSeul: [\"9\", \"18\"]", "commun: [\"1\", \"2\", \"3\"], bSeul: [\"6\", \"9\", \"18\"]"],
    ["ex. 5 : le « ou » dessiné en un seul morceau", "{ de: 3, deInclus: false, label: \"b)\", color: ORANGE }]),\n          micros: [\"logique_connecteurs\"],\n        },\n        {\n          enonce: \"Écrire la négation", "{ de: 3, deInclus: true, label: \"b)\", color: ORANGE }]),\n          micros: [\"logique_connecteurs\"],\n        },\n        {\n          enonce: \"Écrire la négation"],
    ["ex. 6 : la négation de x ≥ 3 écrite x ≤ 3", "{ a: 3, aInclus: false, label: \"sa négation : x < 3\"", "{ a: 3, aInclus: true, label: \"sa négation : x < 3\""],
    ["ex. 8 : une parité fausse dans la trace", "[6, \"oui\", \"non\"]", "[6, \"oui\", \"oui\"]"],
    ["ex. 10 : le 2 dans le complémentaire", "{ de: 2, deInclus: false, label: \"complémentaire de A\"", "{ de: 2, deInclus: true, label: \"complémentaire de A\""],
    ["ex. 11 : la négation en « et »", "« $x < 1$ OU $x > 4$ »", "« $x < 1$ ET $x > 4$ »"],
    ["ex. 12 : 15 compté deux fois", "$6 + 4 - 1 = 9$ éléments", "$6 + 4 = 10$ éléments"],
    ["ex. 14 : un carré faux", "[4, 16, \"pair\"]", "[4, 18, \"pair\"]"],
    ["ex. 15 : la borne 6 exclue", "{ de: 2, a: 6, deInclus: false, aInclus: true, label: \"a)\"", "{ de: 2, a: 6, deInclus: false, aInclus: false, label: \"a)\""],
    ["ex. 16 : le rectangle devenu carré", "{ x: 6, y: 1, label: \"B\" }, { x: 6, y: 4, label: \"C\" }", "{ x: 4, y: 1, label: \"B\" }, { x: 6, y: 4, label: \"C\" }"],
    ["ex. 18 : Nina surlignée", "[[0, 3], [3, 3]]", "[[0, 3], [2, 3], [3, 3]]"],
    ["ex. 19 : 1 681 déclaré premier", "[40, 1681, \"NON : 41 × 41\"]", "[40, 1681, \"oui\"]"],
    ["ex. 20 : l'intersection fausse", "{ de: 25, a: 28, deInclus: true, aInclus: true, label: \"les deux\"", "{ de: 25, a: 30, deInclus: true, aInclus: true, label: \"les deux\""],
  ],
});
