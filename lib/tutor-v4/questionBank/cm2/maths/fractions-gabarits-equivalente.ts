// CM2 · fraction_equivalente — PRÉPARER LA SIMPLIFICATION (25/10/2026, voir fractions-gabarits-outils.ts).
// ⛔ Sa première erreur sur les copies : ses élèves ne savent pas simplifier.
// Leurres tirés de là : ajouter (ou enlever) le même nombre en haut et en bas
// (2/3 = 4/5), ne diviser que le haut (6/8 → 3/8) ou que le bas (6/8 → 6/4).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { OBJETS, PRENOMS, deuxPrenoms, tirer, entre, il, Il, exp, qcm, gabarit, figure, deuxBarres, pgcd, pluriel, deP, cadre } from "./fractions-gabarits-outils";

/** Une fraction irréductible a/b avec a < b. */
function irreductible(dens = [2, 3, 4, 5, 6]) {
  let a = 1, b = 2;
  do { b = tirer(dens); a = entre(1, b - 1); } while (pgcd(a, b) !== 1);
  return [a, b] as const;
}
const AUTANT = "autant tous les deux";

export const fractionsGabaritsEquivalente: TutorBankItemV4[] = [
  gabarit("cm2_fraction_equivalente_tpl_1_moitie", "fraction_equivalente", 1, "La moitié, c’est la moitié des parts.", ["equivalente", "moitie"], () => {
    const P = tirer(PRENOMS), O = tirer(OBJETS), d = tirer([4, 6, 8, 10, 12]), m = d / 2;
    const text = tirer([
      `${P.p} partage ${O.un} en ${d} ${O.parts} ${O.egales} et en ${O.verbe} la moitié. Quelle fraction ${O.du} a-t-${il(P)} ${O.pp} ?`,
      `${P.p} ${O.pc} la moitié ${O.du}, qui a ${d} ${O.parts} ${O.egales}. Quelle fraction écrit-on ?`,
      `${O.le.charAt(0).toUpperCase()}${O.le.slice(1)} ${deP(P)} a ${d} ${O.parts} ${O.egales}. Quelle fraction est égale à 1/2 ${O.du} ?`,
    ]);
    return qcm(text, `${m}/${d}`, [`1/${d}`, `2/${d}`, `${m + 1}/${d}`, `${m}/${d + m}`, `${d}/${m}`],
      exp("La moitié d’un tout, c’est 1/2.", `Avec ${d} ${O.parts}, la moitié c’est ${d} ÷ 2 = ${m} ${O.parts}.`, `1/2 = ${m}/${d} (on a multiplié le haut et le bas par ${m}).`, `${P.p} en a ${O.pc.slice(2)} ${m}/${d}.`),
      { canvas: figure(O.modele, m, d) as any });
  }),

  gabarit("cm2_fraction_equivalente_tpl_2_meme_quantite", "fraction_equivalente", 1, "Regarde les deux figures : la même longueur coloriée, c’est la même quantité.", ["equivalente", "figure"], () => {
    const [P, Q] = deuxPrenoms(), O = tirer(OBJETS), [a, b] = irreductible([2, 3, 4, 5]), k = tirer([2, 3]);
    const egal = Math.random() < 0.6, A = egal ? a * k : a * k + (a * k + 1 < b * k ? 1 : -1), B = b * k;
    const bonne = egal ? AUTANT : A > a * k ? Q.p : P.p;
    const text = tirer([
      `Deux ${pluriel(O)} ${O.un.startsWith("une") ? "pareilles" : "pareils"} : ${P.p} en ${O.pc} ${a}/${b}, ${Q.p} ${A}/${B}. Qui en a ${O.pc.slice(2)} le plus ?`,
      `${P.p} ${O.pc} ${a}/${b} ${O.du}, ${Q.p} ${A}/${B} d’${O.un} identique. Qui en a ${O.pc.slice(2)} le plus ?`,
      `Regarde les deux figures. ${P.p} a ${a}/${b}, ${Q.p} a ${A}/${B}. Qui a le plus ?`,
    ]);
    return qcm(text, bonne, [P.p, Q.p, AUTANT].filter((x) => x !== bonne),
      exp("Deux fractions sont égales quand elles représentent la même part du tout.", `On multiplie le haut ET le bas de ${a}/${b} par ${k}.`,
        `${a}/${b} = ${a * k}/${B}${egal ? "" : `, et ${A}/${B} ${A > a * k ? ">" : "<"} ${a * k}/${B}`}.`, egal ? "Ils en ont autant tous les deux." : `${bonne} en a le plus.`),
      { canvas: deuxBarres([a, b, P.p], [A, B, Q.p]) });
  }),

  gabarit("cm2_fraction_equivalente_tpl_3_manquant", "fraction_equivalente", 2, "Par combien a-t-on multiplié le bas ? Fais pareil en haut.", ["equivalente", "nombre_manquant"], () => {
    const P = tirer(PRENOMS), O = tirer(OBJETS), [a, b] = irreductible(), k = tirer([2, 3, 4, 5]), B = b * k, A = a * k;
    const text = tirer([
      cadre(P, `Complète : ${a}/${b} = …/${B}. Quel nombre manque ?`),
      `${P.p} veut écrire ${a}/${b} avec le dénominateur ${B}. Quel numérateur doit-${il(P)} écrire ?`,
      `${P.p} ${O.pc} ${a}/${b} ${O.du}. En ${B} ${O.parts} ${O.egales}, cela fait combien de ${O.parts} ?`,
      cadre(P, `${a}/${b} = ?/${B}. ${P.p} cherche le « ? ». Lequel est juste ?`),
    ]);
    return qcm(text, String(A), [String(a + B - b), String(a), String(a + k), String(A + 1), String(B - A)],
      exp("On obtient une fraction égale en multipliant le haut ET le bas par le même nombre.", `Le bas passe de ${b} à ${B} : ${b} × ${k} = ${B}. On fait pareil en haut (ajouter ${B - b} en haut et en bas ne marche pas).`,
        `${a} × ${k} = ${A}.`, `${a}/${b} = ${A}/${B}.`),
      { canvas: deuxBarres([a, b, `${a}/${b}`], [A, B, `?/${B}`]) });
  }),

  gabarit("cm2_fraction_equivalente_tpl_4_simplifier", "fraction_equivalente", 2, "Divise le haut ET le bas par le même nombre.", ["equivalente", "simplifier"], () => {
    const P = tirer(PRENOMS), O = tirer(OBJETS), [a, b] = irreductible(), k = tirer([2, 3, 4, 5]), A = a * k, B = b * k;
    const text = tirer([
      cadre(P, `Simplifie ${A}/${B} en divisant le haut et le bas par ${k}.`),
      `${P.p} ${O.pc} ${A}/${B} ${O.du}. ${Il(P)} divise le haut et le bas par ${k}. Quelle fraction trouve-t-${il(P)} ?`,
      cadre(P, `Quelle fraction est égale à ${A}/${B}, avec des nombres ${k} fois plus petits ?`),
    ]);
    const leurres = [`${a}/${B}`, `${A}/${b}`, `${A - 1}/${B - 1}`, `${b}/${a}`];
    if (A > k) leurres.push(`${A - k}/${B - k}`);
    return qcm(text, `${a}/${b}`, leurres,
      exp("Simplifier une fraction, c’est l’écrire avec des nombres plus petits sans changer sa valeur.", "On divise le numérateur ET le dénominateur par le même nombre — jamais en enlevant le même nombre en haut et en bas.",
        `${A} ÷ ${k} = ${a} et ${B} ÷ ${k} = ${b}.`, `${A}/${B} = ${a}/${b}.`),
      { canvas: figure(O.modele, A, B) as any });
  }),

  gabarit("cm2_fraction_equivalente_tpl_5_erreur_ajout", "fraction_equivalente", 2, "Ajouter le même nombre en haut et en bas change la fraction ; multiplier par le même nombre, non.", ["equivalente", "erreur"], () => {
    const [P, Q] = deuxPrenoms(), [a, b] = irreductible([2, 3, 4, 5]), c = tirer([1, 2, 3]), k = tirer([2, 3]);
    const faux = `${a + c}/${b + c}`, bonne = `${a * k}/${b * k}`;
    const text = tirer([
      `${P.p} écrit : « ${a}/${b} = ${faux}, j’ai ajouté ${c} en haut et en bas. » Quelle fraction est vraiment égale à ${a}/${b} ?`,
      `Pour trouver une fraction égale à ${a}/${b}, ${P.p} ajoute ${c} en haut et en bas et trouve ${faux}. ${Q.p} n’est pas d’accord. Quelle fraction est égale à ${a}/${b} ?`,
      `${P.p} pense que ${a}/${b} = ${faux}. Regarde les deux barres. Quelle fraction est bien égale à ${a}/${b} ?`,
    ]);
    return qcm(text, bonne, [faux, `${a + k}/${b + k}`, `${a * k}/${b}`, `${a}/${b * k}`],
      exp("Deux fractions sont égales si elles représentent la même part du tout.", "On multiplie (ou on divise) le haut ET le bas par le même nombre. Ajouter le même nombre ne garde pas la valeur : les barres ne sont pas pareilles.",
        `${a} × ${k} = ${a * k} et ${b} × ${k} = ${b * k}, donc ${a}/${b} = ${bonne} ; ${faux} n’a pas la même longueur coloriée.`, `${a}/${b} = ${bonne}.`),
      { canvas: deuxBarres([a, b, `${a}/${b}`], [a + c, b + c, faux]) });
  }),

  gabarit("cm2_fraction_equivalente_tpl_6_egalite_vraie", "fraction_equivalente", 3, "Vérifie : a-t-on multiplié le haut ET le bas par le même nombre ?", ["equivalente", "egalite"], () => {
    const P = tirer(PRENOMS), [a, b] = irreductible(), k = tirer([2, 3, 4]), c = tirer([1, 2, 3]);
    const bonne = `${a}/${b} = ${a * k}/${b * k}`;
    const text = tirer([
      cadre(P, "Quelle égalité est vraie ?"),
      `${P.p} a écrit quatre égalités au tableau. Laquelle est juste ?`,
      `Une seule de ces égalités est vraie. Laquelle ${P.p} doit-${il(P)} entourer ?`,
      `Pour son contrôle, ${P.p} vérifie ses égalités de fractions. Laquelle est vraie ?`,
    ]);
    const fausses = [[a + c, b + c], [a * k, b], [b, a], [a * k, b * k + 1], [a + k, b * k]].filter(([x, y]) => x * b !== y * a);
    return qcm(text, bonne, fausses.map(([x, y]) => `${a}/${b} = ${x}/${y}`),
      exp("Deux fractions sont égales si l’on passe de l’une à l’autre en multipliant le haut ET le bas par le même nombre.", "Pour chaque égalité, on cherche ce multiplicateur.",
        `${a} × ${k} = ${a * k} et ${b} × ${k} = ${b * k}.`, `L’égalité vraie est ${bonne}.`));
  }),

  gabarit("cm2_fraction_equivalente_tpl_7_simplifier_max", "fraction_equivalente", 3, "Divise par le plus grand nombre possible, ou plusieurs fois de suite.", ["equivalente", "simplifier"], () => {
    const P = tirer(PRENOMS), [a, b] = irreductible([2, 3, 4, 5]), g = tirer([4, 6, 8, 9]), A = a * g, B = b * g;
    const text = tirer([
      cadre(P, `Simplifie le plus possible la fraction ${A}/${B}.`),
      `${P.p} a eu ${A} bonnes réponses sur ${B} au quiz. Écris sa note sous la forme d’une fraction la plus simple possible.`,
      `Au club de basket, ${P.p} a marqué ${A} paniers sur ${B} tirs. Quelle fraction la plus simple dit la même chose ?`,
      `${A} élèves sur ${B} de l’école ${deP(P)} viennent à pied. Écris cette fraction le plus simplement possible.`,
    ]);
    const leurres = [`${a}/${B}`, `${A}/${b}`, `${A - g}/${B - g}`, `${b}/${a}`, `${A - 1}/${B - 1}`];
    return qcm(text, `${a}/${b}`, leurres,
      exp("Simplifier le plus possible, c’est diviser le haut et le bas jusqu’à ne plus pouvoir.", `${A} et ${B} sont tous les deux dans la table de ${g}.`,
        `${A} ÷ ${g} = ${a} et ${B} ÷ ${g} = ${b}.`, `${A}/${B} = ${a}/${b}.`));
  }),

  gabarit("cm2_fraction_equivalente_tpl_8_meme_score", "fraction_equivalente", 3, "Écris les deux fractions avec le même dénominateur, ou simplifie-les.", ["equivalente", "comparer"], () => {
    const [P, Q] = deuxPrenoms(), [a, b] = irreductible([2, 3, 4, 5]), k1 = tirer([2, 3]), k2 = tirer([4, 5]);
    const egal = Math.random() < 0.6;
    const A1 = a * k1, B1 = b * k1, B2 = b * k2, A2 = egal ? a * k2 : a * k2 + (a * k2 + 1 < B2 ? 1 : -1);
    const bonne = egal ? "le même score" : A2 > a * k2 ? `${Q.p} a mieux réussi` : `${P.p} a mieux réussi`;
    const jeu = tirer(["au quiz de sciences", "au tir à l’arc", "aux lancers francs", "à la dictée de mots", "au jeu de fléchettes", "au calcul mental"]);
    const text = tirer([
      `${jeu.charAt(0).toUpperCase()}${jeu.slice(1)}, ${P.p} réussit ${A1}/${B1} et ${Q.p} ${A2}/${B2}. Qui a le meilleur score ?`,
      `${P.p} : ${A1} réussites sur ${B1}. ${Q.p} : ${A2} sur ${B2}, ${jeu}. Compare leurs scores.`,
    ]);
    return qcm(text, bonne, ["le même score", `${P.p} a mieux réussi`, `${Q.p} a mieux réussi`, "on ne peut pas comparer"].filter((x) => x !== bonne),
      exp("Pour comparer deux fractions, on les écrit le plus simplement possible ou avec le même dénominateur.", `On divise chaque fraction pour retrouver ${a}/${b}.`,
        `${A1}/${B1} = ${a}/${b}${egal ? ` et ${A2}/${B2} = ${a}/${b}` : ` ; ${A2}/${B2} ${A2 > a * k2 ? ">" : "<"} ${a * k2}/${B2} = ${a}/${b}`}.`, egal ? "Ils ont le même score." : `${bonne.replace(" a mieux réussi", "")} a le meilleur score.`),
      { canvas: deuxBarres([A1, B1, P.p], [A2, B2, Q.p]) });
  }),
];
