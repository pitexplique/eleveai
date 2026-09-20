// Recalcul INDÉPENDANT des vingt corrigés de la fiche d'exercices « Calculer avec
// les fractions » de 5e (lib/fiches-exercices/maths-5e-fraction-calcul.tsx).
//
// Même règle que pour les feuilles de 1re : on ne relit pas le corrigé, on REFAIT
// le calcul par un autre chemin. Le corrigé redécoupe au plus petit multiple
// commun ; ici on passe par le produit en croix (a/b + c/d = (ad + bc)/bd), puis
// on réduit par le PGCD — et on recoupe le tout en décimal. Si les deux chemins
// arrivent au même endroit, ce n'est pas parce qu'ils se sont copiés.
//
// ⭐ ET LE TEXTE EST ATTACHÉ AU CALCUL : pour chaque exercice, la fraction
// recalculée doit se LIRE dans le corrigé (`\dfrac{n}{d}`, ou l'entier). Un
// script qui recalcule juste à côté d'un corrigé faux ne vérifie rien.
//
//   node scripts/verifier-exercices-fractions-5e.mjs
//
// Sort en code 1 à la première divergence. Vérifie aussi que chaque `$` est
// apparié, que chaque micro citée existe en 5e, que les quatre micros de la
// notion ont un exercice, et que rien du programme de 4e ne s'est glissé ici
// (ni division de fractions, ni inverse, ni nombre négatif).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.join(__dirname, "..");

let erreurs = 0;
function ok(nom, condition, detail = "") {
  if (condition) console.log(`  ✓ ${nom}`);
  else {
    erreurs++;
    console.log(`  ✗ ${nom}${detail ? " — " + detail : ""}`);
  }
}

// ── Des fractions exactes, en entiers ───────────────────────────────────────
const pgcd = (a, b) => (b === 0 ? Math.abs(a) : pgcd(b, a % b));
const F = (n, d = 1) => {
  const g = pgcd(n, d) || 1;
  return { n: n / g, d: d / g };
};
const plus = (a, b) => F(a.n * b.d + b.n * a.d, a.d * b.d);
const moins = (a, b) => F(a.n * b.d - b.n * a.d, a.d * b.d);
const fois = (a, b) => F(a.n * b.n, a.d * b.d);
const egal = (a, b) => a.n === b.n && a.d === b.d;
const dec = (a) => a.n / a.d;
const proche = (x, y) => Math.abs(x - y) < 1e-12;
const ecrit = (a) => (a.d === 1 ? `${a.n}` : `${a.n}/${a.d}`);
/** La même valeur, non réduite : 4/10 et 2/5 sont égales sans être identiques. */
const vaut = (n, d, a) => n * a.d === a.n * d;

// ── La feuille, lue comme un texte ──────────────────────────────────────────
const source = fs.readFileSync(
  path.join(RACINE, "lib", "fiches-exercices", "maths-5e-fraction-calcul.tsx"),
  "utf8",
);
const corrections = [...source.matchAll(/correction:\s*\n?\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
const enonces = [...source.matchAll(/enonce:\s*\n?\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
/** `\\dfrac{5}{8}` dans le source = \dfrac{5}{8} à l'écran. Un entier se lit
 *  comme un nombre ENTIER : « 30 » dans « $90 \div 3 = 30$ », mais ni dans
 *  « 300 » ni dans « 0,30 ». (Première version : `$30$` exigé seul entre deux
 *  dollars — l'exercice 18 sortait faux alors que son corrigé était juste.) */
const lit = (texte, a) =>
  a.d === 1
    ? new RegExp(`(^|[^\\d,])${a.n}($|[^\\d,])`).test(texte)
    : texte.includes(`dfrac{${a.n}}{${a.d}}`);

/** Recalcule, recoupe en décimal, et vérifie que le corrigé n° k l'écrit. */
function exo(k, nom, resultat, attendu, decimal) {
  const c = corrections[k - 1] ?? "";
  ok(
    `${k}. ${nom} = ${ecrit(attendu)}`,
    egal(resultat, attendu) && proche(dec(resultat), decimal) && lit(c, attendu),
    `recalculé ${ecrit(resultat)} (${dec(resultat)}) ; lu dans le corrigé : ${lit(c, attendu)}`,
  );
}

console.log("★ Un seul geste");
exo(1, "3/8 + 2/8", plus(F(3, 8), F(2, 8)), F(5, 8), 0.375 + 0.25);
exo(2, "7/10 − 3/10", moins(F(7, 10), F(3, 10)), F(2, 5), 0.7 - 0.3);
ok("2. l'étape non simplifiée 4/10 vaut bien 2/5", vaut(4, 10, F(2, 5)) && lit(corrections[1], { n: 4, d: 10 }));
exo(3, "2/5 + 3/10", plus(F(2, 5), F(3, 10)), F(7, 10), 0.4 + 0.3);
ok("3. 2/5 = 4/10 (le redécoupage du corrigé ET du dessin)", vaut(4, 10, F(2, 5)) && source.includes("calculDessine([4, 10], \"+\", [3, 10], [7, 10])"));
exo(4, "5/6 − 1/2", moins(F(5, 6), F(1, 2)), F(1, 3), 5 / 6 - 0.5);
ok("4. 1/2 = 3/6, et le dessin 5/6 − 3/6 = 2/6", vaut(3, 6, F(1, 2)) && vaut(2, 6, F(1, 3)) && 5 - 3 === 2);
exo(5, "3/5 × 2/7", fois(F(3, 5), F(2, 7)), F(6, 35), 0.6 * (2 / 7));
ok("5. 6/35 est irréductible", pgcd(6, 35) === 1);
exo(6, "3/4 × 2/9", fois(F(3, 4), F(2, 9)), F(1, 6), 0.75 * (2 / 9));
ok("6. 6/36 = 3/18 = 1/6", vaut(6, 36, F(1, 6)) && vaut(3, 18, F(1, 6)));
exo(7, "2/3 de 24", fois(F(2, 3), F(24)), F(16), 16);
ok("7. 24 ÷ 3 = 8 puis 8 × 2 = 16", 24 / 3 === 8 && 8 * 2 === 16);
exo(8, "3/10 de 250 g", fois(F(3, 10), F(250)), F(75), 75);
ok("8. 250 ÷ 10 = 25 puis 25 × 3 = 75", 250 / 10 === 25 && 25 * 3 === 75);

console.log("★★ Type devoir");
exo(9, "1/4 + 1/6", plus(F(1, 4), F(1, 6)), F(5, 12), 0.25 + 1 / 6);
ok("9. en douzièmes 3/12 + 2/12 ; en vingt-quatrièmes 6/24 + 4/24 = 10/24", vaut(3, 12, F(1, 4)) && vaut(2, 12, F(1, 6)) && vaut(6, 24, F(1, 4)) && vaut(4, 24, F(1, 6)) && vaut(10, 24, F(5, 12)));
exo(10, "3/4 − 2/5", moins(F(3, 4), F(2, 5)), F(7, 20), 0.75 - 0.4);
ok("10. 15/20 − 8/20, et 7/20 irréductible", vaut(15, 20, F(3, 4)) && vaut(8, 20, F(2, 5)) && pgcd(7, 20) === 1);
exo(11, "1/2 + 1/4 + 1/8", plus(plus(F(1, 2), F(1, 4)), F(1, 8)), F(7, 8), 0.5 + 0.25 + 0.125);
ok("11. il manque 1/8 pour faire 1", egal(moins(F(1), F(7, 8)), F(1, 8)));
exo(12, "1/2 + 1/3 (l'erreur du short)", plus(F(1, 2), F(1, 3)), F(5, 6), 0.5 + 1 / 3);
ok("12a. 2/5 = 0,4 est plus petit que 1/2 = 0,5 : la « somme » est impossible", dec(F(2, 5)) === 0.4 && dec(F(1, 2)) === 0.5 && dec(F(2, 5)) < dec(F(1, 2)) && corrections[11].includes("0{,}4") && corrections[11].includes("0{,}5"));
ok("12c. 3/6 + 2/6", vaut(3, 6, F(1, 2)) && vaut(2, 6, F(1, 3)));
exo(13, "4/9 × 3/8", fois(F(4, 9), F(3, 8)), F(1, 6), (4 / 9) * 0.375);
ok("13. 12/72 = 1/6, et simplifié avant : 1/3 × 1/2", vaut(12, 72, F(1, 6)) && egal(fois(F(1, 3), F(1, 2)), F(1, 6)) && 4 / 4 === 1 && 8 / 4 === 2 && 3 / 3 === 1 && 9 / 3 === 3);
exo(14, "3/5 × 2/5 (l'erreur 6/5)", fois(F(3, 5), F(2, 5)), F(6, 25), 0.6 * 0.4);
ok("14a. le produit est plus petit que 2/5, et 6/5 dépasse 1", dec(F(6, 25)) < dec(F(2, 5)) && dec(F(6, 5)) > 1);
exo(15, "3/4 de 2/5", fois(F(3, 4), F(2, 5)), F(3, 10), 0.75 * 0.4);
ok("15. 6/20 = 3/10, plus petit que 2/5 = 4/10", vaut(6, 20, F(3, 10)) && vaut(4, 10, F(2, 5)) && dec(F(3, 10)) < dec(F(2, 5)));
exo(16, "28 élèves, 3/7 à la cantine : ceux qui n'y mangent pas", moins(F(28), fois(F(3, 7), F(28))), F(16), 16);
ok("16. 12 à la cantine ; autre chemin : 4/7 de 28", egal(fois(F(3, 7), F(28)), F(12)) && egal(fois(moins(F(1), F(3, 7)), F(28)), F(16)) && lit(corrections[15], F(12)));

console.log("★★★ Problèmes");
const mange = plus(F(1, 3), F(1, 4));
exo(17, "gâteau patate : 1/3 + 1/4", mange, F(7, 12), 1 / 3 + 0.25);
ok("17b/c. reste 5/12, moins que la moitié (6/12) ; et 2/7 < 1/3, d'où l'impossible", egal(moins(F(1), mange), F(5, 12)) && dec(F(5, 12)) < 0.5 && vaut(6, 12, F(1, 2)) && dec(F(2, 7)) < dec(F(1, 3)) && lit(corrections[16], F(5, 12)));
const vendu = fois(F(5, 8), F(240));
const reste = moins(F(240), vendu);
const donne = fois(F(1, 3), reste);
const garde = moins(reste, donne);
exo(18, "letchis : ce qu'il garde sur 240 kg", garde, F(60), 60);
ok("18a-d. 150 kg vendus, 90 restent, 30 donnés, 60/240 = 1/4 ; le piège 1/3 de 240 = 80", egal(vendu, F(150)) && egal(reste, F(90)) && egal(donne, F(30)) && egal(F(60, 240), F(1, 4)) && egal(fois(F(1, 3), F(240)), F(80)) && [F(150), F(90), F(30), F(80)].every((v) => lit(corrections[17], v)) && lit(corrections[17], F(1, 4)));
exo(19, "recette : 2/3 de 3/4 L de lait", fois(F(2, 3), F(3, 4)), F(1, 2), (2 / 3) * 0.75);
ok("19a/c. 4/6 = 2/3 ; farine 2/3 × 1/2 = 1/3 ; les deux résultats plus petits qu'au départ", egal(F(4, 6), F(2, 3)) && egal(fois(F(2, 3), F(1, 2)), F(1, 3)) && dec(F(1, 2)) < dec(F(3, 4)) && dec(F(1, 3)) < dec(F(1, 2)) && lit(corrections[18], F(1, 3)));
const A = moins(F(3, 4), fois(F(1, 4), F(2, 3)));
exo(20, "A = 3/4 − 1/4 × 2/3 (la multiplication d'abord)", A, F(7, 12), 0.75 - 0.25 * (2 / 3));
const fauxA = fois(moins(F(3, 4), F(1, 4)), F(2, 3));
const B = fois(plus(F(1, 2), F(1, 3)), F(3, 5));
ok("20b/c. de gauche à droite on trouve 1/3 (≠ A) ; B = (1/2 + 1/3) × 3/5 = 1/2", egal(fauxA, F(1, 3)) && !egal(fauxA, A) && egal(B, F(1, 2)) && vaut(15, 30, F(1, 2)) && vaut(9, 12, F(3, 4)) && vaut(2, 12, F(1, 6)) && lit(corrections[19], F(1, 3)) && lit(corrections[19], F(1, 2)));

// ⛔ UN ENTIER NE SE « LIT » PAS COMME UNE FRACTION. `lit()` cherche le nombre
// dans le corrigé ; pour $\dfrac{7}{20}$ c'est sans ambiguïté, pour « 60 » non :
// le contrôle négatif du 20/09 a remplacé « Il garde $60$ kg » par 70, et le
// script a dit vert — parce que 60 se lisait encore dans $\dfrac{60}{240}$. Les
// réponses ENTIÈRES sont donc vérifiées par leur PHRASE, mot pour mot.
console.log("Les réponses entières, par leur phrase");
const PHRASES = [
  [7, "vaut $16$."],
  [8, "Il faut $75$ g de farine."],
  [16, "$16$ élèves ne mangent pas à la cantine."],
  [16, "$4 \\\\times 3 = 12$ élèves"],
  [18, "Il vend $150$ kg."],
  [18, "$240 - 150 = 90$. Il lui reste $90$ kg."],
  [18, "$90 \\\\div 3 = 30$ kg."],
  [18, "$90 - 30 = 60$. Il garde $60$ kg."],
  [18, "$\\\\dfrac{60}{240} = \\\\dfrac{1}{4}$"],
];
for (const [k, phrase] of PHRASES) {
  ok(`${k}. « ${phrase.replace(/\\\\/g, "\\")} »`, (corrections[k - 1] ?? "").includes(phrase));
}
ok("et les calculs de ces phrases sont justes", 240 - 150 === 90 && 90 / 3 === 30 && 90 - 30 === 60 && 4 * 3 === 12 && 28 - 12 === 16);

console.log("Les rappels de cours");
ok("2/9 + 5/9 = 7/9 et 1/3 = 4/12", egal(plus(F(2, 9), F(5, 9)), F(7, 9)) && vaut(4, 12, F(1, 3)));
ok("12 est un multiple commun de 4 et de 6 (et le plus petit)", 12 % 4 === 0 && 12 % 6 === 0 && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].every((m) => m % 4 !== 0 || m % 6 !== 0));

console.log("Le texte de la fiche");
const chaines = source.match(/"(?:[^"\\]|\\.)*"/g) ?? [];
const impaires = chaines.filter((c) => (c.match(/\$/g) ?? []).length % 2 === 1);
ok(`dollars appariés dans ${chaines.length} chaînes`, impaires.length === 0, impaires.slice(0, 3).join(" | "));
ok("20 énoncés, 20 corrigés", enonces.length === 20 && corrections.length === 20, `${enonces.length} / ${corrections.length}`);
const nbParSerie = source.split(/niveau: [123],/).slice(1).map((bloc) => (bloc.match(/^\s*enonce:/gm) ?? []).length);
ok("8 + 8 + 4 : le format arrêté", JSON.stringify(nbParSerie) === "[8,8,4]", JSON.stringify(nbParSerie));

// ⛔ Une fraction écrite « 1/2 » hors formule s'afficherait telle quelle, en
// clair, à côté des vraies fractions : dans un texte d'élève, tout passe par
// \dfrac. (Les commentaires du fichier, eux, ont le droit.)
const enClair = [...enonces, ...corrections].filter((t) => /(^|[^\d{}\\])\d+\/\d+/.test(t.replace(/\$[^$]*\$/g, "")));
ok("aucune fraction écrite en clair (1/2) hors d'une formule", enClair.length === 0, enClair.slice(0, 2).join(" | ").slice(0, 160));

// ⛔ Rien de la 4e : la division de fractions et l'inverse ont quitté la 5e le
// 04/08/2026, et la banque de cette notion ne calcule aucun nombre négatif.
const textes = [...enonces, ...corrections].join("\n");
const divisionDeFractions = /\}\s*\\div\s*\\dfrac|\\dfrac\{[^}]*\}\{[^}]*\}\s*\\div\s*\\dfrac/.test(textes);
ok("ni division de fractions, ni inverse, ni nombre négatif", !divisionDeFractions && !/inverse/i.test(textes) && !/\$-\s*\\dfrac|\(-\s*\d/.test(textes));

const micros = new Set(
  [...source.matchAll(/micros: \[([^\]]*)\]/g)].flatMap((m) => m[1].match(/"([^"]+)"/g).map((s) => s.slice(1, -1))),
);
const microSkills = fs.readFileSync(
  path.join(RACINE, "lib", "tutor-v4", "knowledge", "maths", "5e", "microSkills.ts"),
  "utf8",
);
const inconnues = [...micros].filter((id) => !microSkills.includes(`id: "${id}"`));
ok(`${micros.size} micros citées, toutes connues du coach de 5e`, inconnues.length === 0, inconnues.join(", "));
// Les micros de la notion fraction_calcul, lues dans microSkills.ts (pas recopiées).
const deLaNotion = [...microSkills.matchAll(/id: "([a-z_]+)",\s*\n\s*label:[^\n]*\n\s*notionId: "fraction_calcul"/g)].map((m) => m[1]);
const sansExercice = deLaNotion.filter((id) => !micros.has(id));
ok(`les ${deLaNotion.length} micros de fraction_calcul ont chacune un exercice`, deLaNotion.length === 4 && sansExercice.length === 0, sansExercice.join(", "));
const horsNotion = [...micros].filter((id) => !deLaNotion.includes(id));
ok("aucune micro d'une autre notion", horsNotion.length === 0, horsNotion.join(", "));

console.log(erreurs ? `\n✗ ${erreurs} divergence(s)` : "\n✓ les vingt corrigés sont recalculés sans écart");
process.exitCode = erreurs ? 1 : 0;
