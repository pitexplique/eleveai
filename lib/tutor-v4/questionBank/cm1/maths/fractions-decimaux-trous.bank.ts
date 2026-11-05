// FRACTIONS ET DÉCIMAUX : LES TROUS DU PROGRAMME DE CM1 (05/11/2026).
// Additionner des fractions, regrouper entier + fraction, écrire un décimal en
// somme de fractions décimales, comparer des fractions décimales, × et ÷ par 10,
// 100, 1 000, ajouter des dixièmes et des centièmes. QCM seulement.
// ⛔ × 10 s'explique d'abord par la VALEUR DES CHIFFRES, jamais par « la virgule bouge ».

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { CALC, LETTRES, atelier, entre, etapes, fr, melange, qcm, qcmN, tournure, un } from "./trous-outils";

const MOTS: Record<number, [string, string]> = { 2: ["demi", "demis"], 3: ["tiers", "tiers"], 4: ["quart", "quarts"], 5: ["cinquième", "cinquièmes"], 6: ["sixième", "sixièmes"], 7: ["septième", "septièmes"], 8: ["huitième", "huitièmes"], 9: ["neuvième", "neuvièmes"], 10: ["dixième", "dixièmes"], 12: ["douzième", "douzièmes"] };
const DEN = [3, 4, 5, 6, 7, 8, 9, 10, 12];
const mot = (n: number, d: number) => `${n} ${MOTS[d][n > 1 ? 1 : 0]}`;
const f = (n: number, d: number) => `${n}/${d}`;
const barre = (n: number, d: number) => ({ kind: "fraction", model: "bar", fraction: { numerator: n, denominator: d }, display: { showParts: true, showLabel: false, showFraction: false }, size: { width: 300, height: 90 } }) as CanvasFigure;
/** Leurres d'une somme : dénominateurs ajoutés, numérateurs multipliés, voisin. */
const leurresFrac = (n: number, d: number, a: number, b: number, plus: boolean) => [
  f(n, plus ? d + d : d * 2), f(plus ? a * b : a + b, d), f(n + 1, d), f(Math.max(n - 1, 1), d + 1), f(d, n > 0 ? n : 1),
].filter((x) => x !== f(n, d));

/* ═════════════════ fraction_additionner ═════════════════ */
const A = atelier("cm1", "fraction", "fraction_additionner", "cm1_");
const HINT_A = "Le dénominateur ne change pas : on ajoute ou on retire les parts.";
const explA = (a: number, b: number, d: number, plus: boolean) =>
  etapes(`les parts ont la même taille (des ${MOTS[d][1]}). On ${plus ? "ajoute" : "retire"} le nombre de parts, le dénominateur ne change pas.`, `${a} ${plus ? "+" : "−"} ${b} = ${plus ? a + b : a - b}, donc ${f(a, d)} ${plus ? "+" : "−"} ${f(b, d)} = ${f(plus ? a + b : a - b, d)}.`, `le résultat est ${f(plus ? a + b : a - b, d)}.`);
const tirerOp = (depasse = false) => {
  const d = un(DEN);
  const plus = Math.random() < 0.5;
  const s = depasse ? entre(d + 1, 2 * d - 1) : entre(2, d - 1);
  const a = entre(1, s - 1);
  return plus ? { d, plus, a, b: s - a, n: s } : { d, plus, a: s, b: a, n: s - a };
};
const CTX_ADD: [string, string][] = [
  ["Léa mange {a} d’une pizza. Tom mange {b} de la même pizza.", "Quelle fraction de la pizza ont-ils mangée ?"],
  ["Une équipe peint {a} d’un mur le matin et {b} l’après-midi.", "Quelle fraction du mur est peinte ?"],
  ["Un boulanger utilise {a} d’un sac de farine, puis {b}.", "Quelle fraction du sac a-t-il utilisée ?"],
  ["Une randonneuse fait {a} du trajet avant midi et {b} après.", "Quelle fraction du trajet a-t-elle faite ?"],
  ["Un jardinier plante {a} d’une parcelle lundi et {b} mardi.", "Quelle fraction de la parcelle est plantée ?"],
  ["Une infirmière voit {a} de ses patients le matin et {b} le soir.", "Quelle fraction de ses patients a-t-elle vue ?"],
  ["Un maçon pose {a} d’un muret, puis {b}.", "Quelle fraction du muret est posée ?"],
  ["Une chanteuse répète {a} d’une chanson hier et {b} aujourd’hui.", "Quelle fraction de la chanson a-t-elle répétée ?"],
  ["Noé lit {a} d’un livre samedi et {b} dimanche.", "Quelle fraction du livre a-t-il lue ?"],
  ["Une cuve reçoit {a} de sa contenance, puis {b}.", "Quelle fraction de la cuve est remplie ?"],
  ["Une couturière coud {a} d’une robe, puis {b}.", "Quelle fraction de la robe est cousue ?"],
  ["Un pêcheur vend {a} de sa pêche le matin et {b} le midi.", "Quelle fraction de sa pêche est vendue ?"],
];
const CTX_SOUS: [string, string][] = [
  ["Une bouteille est pleine aux {a}. Inès boit {b} de la bouteille.", "Quelle fraction reste-t-il ?"],
  ["Il reste {a} d’un gâteau. Sami en mange {b}.", "Quelle fraction du gâteau reste-t-il ?"],
  ["Un réservoir est plein aux {a}. Le moteur consomme {b} du réservoir.", "Quelle fraction reste dans le réservoir ?"],
  ["Une batterie est chargée aux {a}. Une vidéo utilise {b} de la batterie.", "Quelle fraction de charge reste-t-il ?"],
  ["Un fermier a semé {a} de son champ. Il récolte {b} du champ.", "Quelle fraction reste à récolter ?"],
  ["Une classe a fait {a} de son projet. Le groupe A a fait {b} du projet.", "Quelle fraction ont fait les autres ?"],
  ["Une pâtissière a {a} d’un sac de sucre. Elle en utilise {b}.", "Quelle fraction du sac lui reste-t-il ?"],
  ["Un mur est peint aux {a}. La pluie abîme {b} du mur.", "Quelle fraction du mur reste bien peinte ?"],
  ["Une piscine est remplie aux {a}. On vide {b} de la piscine.", "Quelle fraction de la piscine reste remplie ?"],
  ["Une coureuse a fait {a} de la course. Elle a marché sur {b} de la course.", "Sur quelle fraction a-t-elle couru ?"],
  ["Une médecin a vu {a} de ses patients. {b} de ses patients étaient des enfants.", "Quelle fraction étaient des adultes ?"],
  ["Un vigneron a rempli {a} de sa cuve. Il tire {b} de la cuve.", "Quelle fraction reste dans la cuve ?"],
];
const OP = (a: number, b: number, d: number, plus: boolean) => `${f(a, d)} ${plus ? "+" : "−"} ${f(b, d)}`;

const fractionAdditionner: TutorBankItemV4[] = [
  A(1, 1, HINT_A, () => {
    const { a, b, d, n, plus } = tirerOp();
    return { text: un(CALC(OP(a, b, d, plus))), ...qcm(f(n, d), leurresFrac(n, d, a, b, plus)), explanation: explA(a, b, d, plus) };
  }),
  A(2, 1, HINT_A, () => {
    const { a, b, d, n, plus } = tirerOp();
    return {
      text: tournure(plus ? [`La barre montre ${f(a, d)}.`, `Voici ${f(a, d)} sur la barre.`] : [`La barre montre ${f(a, d)}.`, `Voici ${f(a, d)} sur la barre.`], plus ? [`On ajoute ${f(b, d)}.`, `On colorie encore ${f(b, d)}.`] : [`On retire ${f(b, d)}.`, `On enlève ${f(b, d)}.`], ["Combien a-t-on ?", "Quelle fraction obtient-on ?", "Quel est le résultat ?", "Que trouve-t-on ?"]),
      ...qcm(f(n, d), leurresFrac(n, d, a, b, plus)),
      canvas: barre(a, d),
      explanation: explA(a, b, d, plus),
    };
  }),
  A(3, 1, "Compte les parts : 2 quarts + 1 quart, c’est comme 2 pommes + 1 pomme.", () => {
    const { a, b, d, n, plus } = tirerOp();
    const x = `${mot(a, d)} ${plus ? "+" : "−"} ${mot(b, d)}`;
    return {
      text: un([`${x}, cela fait combien ?`, `Combien font ${x} ?`, `Calcule ${x}.`]),
      ...qcm(mot(n, d), [mot(n + 1, d), mot(n, DEN[(DEN.indexOf(d) + 1) % DEN.length]), mot(plus ? a * b + 1 : a + b, d), mot(Math.max(n - 1, 1), d)]),
      explanation: etapes(`les parts ont la même taille : on compte les ${MOTS[d][1]}.`, `${a} ${plus ? "+" : "−"} ${b} = ${n}.`, `${x} = ${mot(n, d)}.`),
    };
  }),
  A(4, 2, HINT_A, () => {
    const { a, b, d, n, plus } = tirerOp(true);
    return { text: un(CALC(OP(a, b, d, plus))), ...qcm(f(n, d), leurresFrac(n, d, a, b, plus)), explanation: explA(a, b, d, plus) };
  }),
  A(5, 2, "Cherche le numérateur manquant : c’est une addition ou une soustraction à trou.", () => {
    const { a, b, d, n, plus } = tirerOp();
    return {
      text: tournure(["Complète :", "Trouve la fraction manquante :", "Quelle fraction manque ?", "Cherche le terme manquant :"], [`${f(a, d)} ${plus ? "+" : "−"} … = ${f(n, d)}`]).replace(/([^ ])$/, "$1."),
      ...qcm(f(b, d), [f(n, d), f(b + 1, d), f(b, d + d), f(a, d)]),
      explanation: etapes(`on travaille sur les numérateurs, le dénominateur ne change pas.`, `${a} ${plus ? "+" : "−"} ${b} = ${n}.`, `il manque ${f(b, d)}.`),
    };
  }),
  A(6, 2, "1 unité, c’est toutes les parts : 7/7, 5/5, 8/8…", () => {
    const d = un(DEN);
    const a = entre(1, d - 1);
    const plus = Math.random() < 0.5;
    return {
      text: plus
        ? un([`Complète : ${f(a, d)} + … = 1.`, `Que faut-il ajouter à ${f(a, d)} pour obtenir 1 ?`, `Combien manque-t-il à ${f(a, d)} pour faire 1 ?`, `Pour arriver à 1 depuis ${f(a, d)}, quelle fraction ajouter ?`, `${f(a, d)} + … = 1. Trouve la fraction.`, `Quelle fraction complète ${f(a, d)} jusqu’à 1 ?`, `Trouve le complément de ${f(a, d)} à 1.`, `Quelle fraction ajoutée à ${f(a, d)} donne 1 ?`])
        : un(CALC(`1 − ${f(a, d)}`)),
      ...qcm(f(d - a, d), [f(a, d), f(d - a + 1, d), f(d, a), f(d - a, d + 1), f(1, d)]),
      explanation: etapes(`1 unité, c’est ${f(d, d)}.`, `${d} − ${a} = ${d - a}.`, `la réponse est ${f(d - a, d)}.`),
    };
  }),
  A(7, 3, HINT_A, () => {
    const d = un(DEN);
    const a = entre(1, d - 2);
    const b = entre(1, d - a - 1);
    const [t, fin] = un(CTX_ADD);
    return { text: `${t.replace("{a}", f(a, d)).replace("{b}", f(b, d))} ${un([fin, "Quel est le total, en fraction ?", "Écris la fraction obtenue."])}`, ...qcm(f(a + b, d), leurresFrac(a + b, d, a, b, true)), explanation: explA(a, b, d, true) };
  }),
  A(8, 3, HINT_A, () => {
    const d = un(DEN);
    const a = entre(2, d - 1);
    const b = entre(1, a - 1);
    const [t, fin] = un(CTX_SOUS);
    return { text: `${t.replace("{a}", f(a, d)).replace("{b}", f(b, d))} ${un([fin, "Quelle fraction obtient-on ?", "Écris la fraction obtenue."])}`, ...qcm(f(a - b, d), leurresFrac(a - b, d, a, b, false)), explanation: explA(a, b, d, false) };
  }),
  A(9, 4, "Calcule de gauche à droite sur les numérateurs.", () => {
    const d = un([7, 8, 9, 10, 12]);
    const a = entre(2, 4), b = entre(1, 3), c = entre(1, 2);
    const moins = Math.random() < 0.5;
    const n = moins ? a + b - c : a + b + c;
    const x = `${f(a, d)} + ${f(b, d)} ${moins ? "−" : "+"} ${f(c, d)}`;
    return {
      text: tournure(["Trois étapes.", "Un calcul en chaîne.", "Calcule de gauche à droite."], CALC(x)),
      ...qcm(f(n, d), [f(n + 1, d), f(n, 3 * d), f(moins ? a + b + c : a + b - c, d), f(Math.max(n - 1, 1), d)]),
      explanation: etapes(`on calcule sur les numérateurs, de gauche à droite.`, `${a} + ${b} ${moins ? "−" : "+"} ${c} = ${n}.`, `le résultat est ${f(n, d)}.`),
    };
  }),
  A(10, 4, "Calcule la somme, puis compare le numérateur au dénominateur.", () => {
    const d = un(DEN);
    const a = entre(1, d - 1), b = entre(1, d - 1);
    if (a + b === d) return { ...somme1(a, b, d) };
    const s = a + b;
    return {
      text: tournure([`Un jeu demande ${OP(a, b, d, true)}.`, `Un défi : ${OP(a, b, d, true)}.`, `Maya calcule ${OP(a, b, d, true)}.`, `Regarde ${OP(a, b, d, true)}.`, `Yanis additionne ${f(a, d)} et ${f(b, d)}.`, `Voici la somme ${OP(a, b, d, true)}.`], ["Le résultat dépasse-t-il 1 ?", "Le résultat est-il plus grand que 1 ?", "Dépasse-t-on 1 ?"]),
      ...qcm(s > d ? "Oui" : "Non", [s > d ? "Non" : "Oui"]),
      explanation: etapes(`on calcule, puis on compare à ${f(d, d)}, qui vaut 1.`, `${a} + ${b} = ${s}, donc ${f(s, d)}.`, s > d ? `${s} est plus grand que ${d} : on dépasse 1.` : `${s} est plus petit que ${d} : on ne dépasse pas 1.`),
    };
  }),
  A(11, 4, "Ce qui reste : on part de 1 unité, on retire chaque part.", () => {
    const d = un([7, 8, 9, 10, 12]);
    const a = entre(1, 3), b = entre(1, 3);
    const n = d - a - b;
    const c = un(["Un ruban est coupé. On enlève {a}, puis {b}.", "Un sac de riz est plein. On utilise {a}, puis {b}.", "Une tablette de chocolat est entière. Léo mange {a}, Zoé mange {b}.", "Un champ est à labourer. Le lundi, {a} ; le mardi, {b}.", "Une corde est entière. Une équipe en utilise {a}, une autre {b}.", "Un tonneau est plein. On retire {a}, puis {b}.", "Une pizza est entière. Le chef sert {a}, puis {b}.", "Un rouleau de tissu est neuf. Une tailleuse prend {a}, puis {b}."]);
    return {
      text: `${c.replace("{a}", f(a, d)).replace("{b}", f(b, d))} ${un(["Quelle fraction reste-t-il ?", "Quelle part reste-t-il ?", "Il reste quelle fraction ?"])}`,
      ...qcm(f(n, d), [f(a + b, d), f(n + 1, d), f(n, d + d), f(Math.max(n - 1, 1), d)]),
      explanation: etapes(`le tout entier vaut ${f(d, d)}. On retire les deux parts.`, `${d} − ${a} − ${b} = ${n}.`, `il reste ${f(n, d)}.`),
    };
  }),
];
function somme1(a: number, b: number, d: number) {
  return {
    text: tournure([`Un jeu demande ${OP(a, b, d, true)}.`, `Un défi : ${OP(a, b, d, true)}.`, `Regarde ${OP(a, b, d, true)}.`], ["Le résultat dépasse-t-il 1 ?", "Le résultat est-il plus grand que 1 ?"]),
    ...qcm("Non", ["Oui"]),
    explanation: etapes(`on calcule, puis on compare à ${f(d, d)}, qui vaut 1.`, `${a} + ${b} = ${d}, donc ${f(d, d)} = 1.`, `le résultat vaut exactement 1 : il ne le dépasse pas.`),
  };
}

/* ═════════════════ fraction_mixte_regrouper ═════════════════ */
const R = atelier("cm1", "fraction", "fraction_mixte_regrouper", "cm1_");
const HINT_R = "Écris d’abord l’entier avec le même dénominateur : 2 = 8/4.";
const FORMES_R = (x: string) => [`Écris ${x} en une seule fraction.`, `Écris ${x} sous forme d’une fraction.`, `Transforme ${x} en une fraction.`, `Regroupe ${x} en une fraction.`, `Quelle fraction est égale à ${x} ?`, `Trouve la fraction égale à ${x}.`, `Quelle fraction vaut ${x} ?`, `${x} : quelle est la fraction ?`];
const explR = (k: number, a: number, d: number) =>
  etapes(`on écrit l’entier avec le dénominateur ${d}, puis on ajoute.`, `${k} = ${f(k * d, d)}. ${f(k * d, d)} + ${f(a, d)} = ${f(k * d + a, d)}.`, `${k} + ${f(a, d)} = ${f(k * d + a, d)}.`);
const leurresR = (k: number, a: number, d: number) => [f(k + a, d), f(k * a, d), f(k * d, d + a), f(k * d + a, d * k), f(k * d + a + 1, d), f(k * d, a)].filter((x) => x !== f(k * d + a, d));
const sommeMixte = (k: number, a: number, d: number) => (Math.random() < 0.5 ? `${k} + ${f(a, d)}` : `${f(a, d)} + ${k}`);
const CTX_R: [string, string][] = [
  ["pizzas entières", "pizza"], ["tartes entières", "tarte"], ["tablettes de chocolat entières", "tablette"], ["gâteaux entiers", "gâteau"], ["bouteilles pleines", "bouteille"], ["rubans entiers", "ruban"],
  ["pains entiers", "pain"], ["cartons pleins", "carton"], ["sacs de riz pleins", "sac de riz"], ["rouleaux de tissu entiers", "rouleau de tissu"], ["fromages entiers", "fromage"], ["ananas entiers", "ananas"], ["melons entiers", "melon"], ["bidons pleins", "bidon"],
];

const fractionMixte: TutorBankItemV4[] = [
  R(1, 1, HINT_R, () => {
    const d = un(DEN);
    const a = entre(1, d - 1);
    return { text: un(FORMES_R(sommeMixte(1, a, d))), ...qcm(f(d + a, d), leurresR(1, a, d)), explanation: explR(1, a, d) };
  }),
  R(2, 1, "Dans 1 unité, il y a 4 quarts, 5 cinquièmes…", () => {
    const d = un(DEN);
    const k = entre(1, 5);
    const pl = MOTS[d][1];
    return {
      text: un([`Combien de ${pl} y a-t-il dans ${k} unité${k > 1 ? "s" : ""} ?`, `${k} unité${k > 1 ? "s" : ""}, cela fait combien de ${pl} ?`, `Dans ${k} unité${k > 1 ? "s" : ""}, on compte combien de ${pl} ?`]),
      ...qcmN(k * d, [k + d, d, k * d + k, k * d + 1, k * d - 1], pl),
      explanation: etapes(`dans 1 unité, il y a ${d} ${pl}.`, `${k} × ${d} = ${k * d}.`, `il y a ${k * d} ${pl}.`),
    };
  }),
  R(3, 1, "Multiplie l’entier par le dénominateur.", () => {
    const d = un(DEN);
    const k = entre(2, 6);
    return {
      text: un([`Complète : ${k} = …/${d}.`, `Quel numérateur écrire ? ${k} = …/${d}.`, `Écris ${k} avec le dénominateur ${d}.`, `${k} = …/${d}. Trouve le numérateur.`, `Quelle fraction de dénominateur ${d} vaut ${k} ?`, `Écris l’entier ${k} sur ${d}.`, `Change ${k} en fraction : …/${d}.`, `${k}, c’est quelle fraction sur ${d} ?`, `Trouve la fraction égale à ${k}, sur ${d}.`, `Quel nombre manque ? ${k} = …/${d}.`, `Pour écrire ${k} sur ${d}, quel numérateur ?`, `Mets ${k} sous la forme …/${d}.`, `${k} s’écrit …/${d}. Par quoi remplacer les points ?`, `Donne l’écriture de ${k} en …/${d}.`, `Le nombre ${k} égale …/${d}. Complète.`]),
      ...qcm(f(k * d, d), [f(k, d), f(k + d, d), f(k * d + 1, d), ...(d === k * k ? [] : [f(d, k)])]),
      explanation: etapes(`dans 1 unité, il y a ${f(d, d)}.`, `${k} × ${d} = ${k * d}.`, `${k} = ${f(k * d, d)}.`),
    };
  }),
  R(4, 2, HINT_R, () => {
    const d = un(DEN);
    const k = entre(2, 6);
    const a = entre(1, d - 1);
    return { text: un(FORMES_R(sommeMixte(k, a, d))), ...qcm(f(k * d + a, d), leurresR(k, a, d)), explanation: explR(k, a, d) };
  }),
  R(5, 2, HINT_R, () => {
    const d = un([3, 4, 5, 6, 8]);
    const k = entre(1, 4);
    const a = entre(1, d - 1);
    return {
      text: tournure([`La barre montre ${f(a, d)}.`, `Sur la barre, on voit ${f(a, d)}.`, `Voici ${f(a, d)}.`, `Regarde ces ${f(a, d)}.`], [`On ajoute ${k} unité${k > 1 ? "s" : ""}.`, `On y joint ${k} unité${k > 1 ? "s" : ""}.`], ["Quelle fraction obtient-on ?", "Quelle est la fraction totale ?"]),
      ...qcm(f(k * d + a, d), leurresR(k, a, d)),
      canvas: barre(a, d),
      explanation: explR(k, a, d),
    };
  }),
  R(6, 2, HINT_R, () => {
    const d = un(DEN);
    const k = entre(2, 6);
    const a = entre(1, d - 1);
    const pl = MOTS[d][1];
    return {
      text: un([`${k} + ${f(a, d)}, cela fait combien de ${pl} ?`, `Combien de ${pl} dans ${k} + ${f(a, d)} ?`, `Compte les ${pl} dans ${k} + ${f(a, d)}.`]),
      ...qcmN(k * d + a, [k + a, k * a, k * d, k * d + a + 1, k * d + a - 1], pl),
      explanation: explR(k, a, d),
    };
  }),
  R(7, 3, HINT_R, () => {
    const d = un([3, 4, 5, 6, 8, 10]);
    const k = entre(2, 5);
    const a = entre(1, d - 1);
    const [ent, s] = un(CTX_R);
    return {
      text: tournure([`Il y a ${k} ${ent} et ${f(a, d)} ${/^[aeiou]/.test(s) ? "d’" : "de "}${s}.`, `Sur la table : ${k} ${ent} et ${f(a, d)} ${/^[aeiou]/.test(s) ? "d’" : "de "}${s}.`], ["Quelle fraction cela représente-t-il en tout ?", `Écris le tout en une seule fraction.`]),
      ...qcm(f(k * d + a, d), leurresR(k, a, d)),
      explanation: explR(k, a, d),
    };
  }),
  R(8, 3, HINT_R, () => {
    const d = un([2, 4, 5, 10]);
    const k = entre(2, 9);
    const a = entre(1, d - 1);
    const c = un([["Une planche mesure", "m"], ["Un sentier mesure", "km"], ["Une corde mesure", "m"], ["Un marathonien court", "km"], ["Un bidon contient", "L"], ["Une tige mesure", "cm"], ["Une pastèque pèse", "kg"], ["Un trajet dure", "h"], ["Une nageuse parcourt", "km"], ["Une cuve contient", "L"], ["Une bande mesure", "m"], ["Un sac pèse", "kg"]]);
    return {
      text: tournure([`${c[0]} ${k} ${c[1]} et ${f(a, d)} de ${c[1]}.`], [`Combien de ${MOTS[d][1]} de ${c[1]} cela fait-il ?`, `Cela fait combien de ${MOTS[d][1]} de ${c[1]} ?`]),
      ...qcmN(k * d + a, [k + a, k * a, k * d, k * d + a + 1, k * d + a - d], MOTS[d][1]),
      explanation: explR(k, a, d),
    };
  }),
  R(9, 4, "Calcule la fraction de chaque proposition.", () => {
    const d = un(DEN);
    const k = entre(2, 5);
    const a = entre(1, d - 1);
    const n = k * d + a;
    const juste = `${k} + ${f(a, d)}`;
    const faux = [`${k + 1} + ${f(a, d)}`, `${k} + ${f(a === d - 1 ? a - 1 || 1 : a + 1, d)}`, `${a} + ${f(k >= d ? 1 : k, d)}`, `${k - 1} + ${f(a, d)}`];
    return {
      text: tournure(["Un élève écrit {n} autrement.", "Sur son cahier, Lina a {n}.", "Une affiche montre {n}.", "Le prof écrit {n} au tableau.", "Une recette demande {n} de litre.", "Un plan indique {n} de mètre."], ["Quelle somme est égale à cette fraction ?", "Quelle écriture a la même valeur ?", "Quelle somme convient ?"]).replace("{n}", f(n, d)),
      ...qcm(juste, faux.filter((x) => x !== juste)),
      explanation: etapes(`on cherche combien de fois ${f(d, d)} il y a dans ${f(n, d)}.`, `${n} = ${k} × ${d} + ${a}.`, `${f(n, d)} = ${juste}.`),
    };
  }),
  R(10, 4, "Écris les deux nombres avec le même dénominateur.", () => {
    const d = un(DEN);
    const k = entre(1, 4);
    const a = entre(1, d - 1);
    const n = k * d + a + un([-1, 1, 2, -2].filter((x) => x !== 0));
    const x = `${k} + ${f(a, d)}`, y = f(n, d);
    const g = k * d + a;
    if (g === n) throw new Error("égalité impossible ici");
    const plus = Math.random() < 0.5;
    const juste = (plus ? g > n : g < n) ? x : y;
    return {
      text: tournure([`Deux gourdes contiennent ${x} L et ${y} L.`, `Deux rubans mesurent ${x} m et ${y} m.`, `Deux coureuses font ${x} km et ${y} km.`, `Deux seaux pèsent ${x} kg et ${y} kg.`, `Sur une ardoise : ${x} et ${y}.`, `Au tableau : ${x} et ${y}.`, `Deux élèves écrivent ${x} et ${y}.`], [plus ? "Quel est le plus grand nombre ?" : "Quel est le plus petit nombre ?"]),
      ...qcm(juste, [juste === x ? y : x]),
      explanation: etapes(`on écrit ${x} en une seule fraction.`, `${x} = ${f(g, d)}. On compare ${g} et ${n}.`, `le plus ${plus ? "grand" : "petit"} est ${juste}.`),
    };
  }),
];

/* ═════════════════ decimal_somme_fractions ═════════════════ */
const S = atelier("cm1", "nombre_decimal", "decimal_somme_fractions", "cm1_");
const HINT_S = "Après la virgule : d’abord les dixièmes, puis les centièmes.";
const FORMES_S = (x: string) => [`Écris ${x} comme une somme.`, `Décompose ${x} en somme.`, `Quelle somme est égale à ${x} ?`, `Choisis la somme égale à ${x}.`, `${x} est égal à quelle somme ?`, `Trouve la décomposition de ${x}.`, `Comment écrire ${x} avec des fractions décimales ?`, `Quelle décomposition convient pour ${x} ?`];
const dec = (e: number, a: number, b = 0) => e + a / 10 + b / 100;
const som2 = (e: number, a: number, b: number) => `${e} + ${f(a, 10)} + ${f(b, 100)}`;
const explS = (e: number, a: number, b: number) =>
  etapes(`on lit la valeur de chaque chiffre : ${a} dixième${a > 1 ? "s" : ""}${b ? ` et ${b} centième${b > 1 ? "s" : ""}` : ""}.`, `${b ? som2(e, a, b) : `${e} + ${f(a, 10)}`} = ${fr(dec(e, a, b))}.`, `${fr(dec(e, a, b))} = ${b ? som2(e, a, b) : `${e} + ${f(a, 10)}`}.`);

const decimalSomme: TutorBankItemV4[] = [
  S(1, 1, HINT_S, () => {
    const e = entre(1, 40), a = entre(1, 9);
    const x = dec(e, a);
    return { text: un([...FORMES_S(fr(x)), `Écris ${fr(x)} avec une fraction décimale.`, `${fr(x)}, c’est ${e} plus combien ?`, `Sépare la partie entière de ${fr(x)}.`, `Écris ${fr(x)} : entier + fraction.`, `Quel calcul donne ${fr(x)} ?`, `Quelle addition donne ${fr(x)} ?`, `Pour écrire ${fr(x)}, quelle somme choisir ?`]), ...qcm(`${e} + ${f(a, 10)}`, [`${e} + ${f(a, 100)}`, `${a} + ${f(e, 10)}`, `${e * 10} + ${f(a, 10)}`, `${e} + ${f(10, a)}`]), explanation: explS(e, a, 0) };
  }),
  S(2, 1, HINT_S, () => {
    const e = entre(1, 40), a = entre(1, 9);
    const dix = Math.random() < 0.5;
    const x = dix ? `${e} + ${f(a, 10)}` : `${f(a, 10)} + ${e}`;
    return { text: un(CALC(x)), ...qcmN(dec(e, a), [e + a / 100, a + e / 10, e * 10 + a, e + a]), explanation: explS(e, a, 0) };
  }),
  S(3, 1, "Le 1er chiffre après la virgule compte les dixièmes, le 2e les centièmes.", () => {
    const e = entre(1, 90), a = entre(1, 9);
    let b = entre(1, 9);
    if (b === a) b = a === 9 ? 8 : a + 1;
    const dizieme = Math.random() < 0.5;
    const c = dizieme ? a : b;
    const juste = dizieme ? f(a, 10) : f(b, 100);
    return {
      text: un([`Dans ${fr(dec(e, a, b))}, que vaut le chiffre ${c} ?`, `Le chiffre ${c} de ${fr(dec(e, a, b))} vaut combien ?`, `Quelle est la valeur du chiffre ${c} dans ${fr(dec(e, a, b))} ?`, `${fr(dec(e, a, b))} : que vaut le ${c} ?`, `Regarde ${fr(dec(e, a, b))}. Que vaut le ${c} ?`, `Dans ${fr(dec(e, a, b))}, le ${c} représente quelle fraction ?`, `Quelle fraction donne le chiffre ${c} de ${fr(dec(e, a, b))} ?`, `Écris la valeur du ${c} dans ${fr(dec(e, a, b))}.`, `Écris le chiffre ${c} de ${fr(dec(e, a, b))} en fraction.`, `Quelle fraction montre le ${c} de ${fr(dec(e, a, b))} ?`, `${fr(dec(e, a, b))} : écris la valeur du ${c}.`, `Cherche la valeur du ${c} dans ${fr(dec(e, a, b))}.`, `Trouve la valeur du chiffre ${c} : ${fr(dec(e, a, b))}.`, `Que représente le ${c} dans ${fr(dec(e, a, b))} ?`, `Le ${c} de ${fr(dec(e, a, b))}, c’est quelle fraction ?`]),
      ...qcm(juste, [dizieme ? f(a, 100) : f(b, 10), String(c), f(c, 1000), dizieme ? f(10, a) : f(100, b)]),
      explanation: etapes(`après la virgule : les dixièmes, puis les centièmes.`, `dans ${fr(dec(e, a, b))}, ${a} compte les dixièmes et ${b} les centièmes.`, `le chiffre ${c} vaut ${juste}.`),
    };
  }),
  S(4, 2, HINT_S, () => {
    const e = entre(1, 90), a = entre(1, 9), b = entre(1, 9);
    const trouB = Math.random() < 0.5;
    const x = fr(dec(e, a, b));
    const tr = trouB ? `${x} = ${e} + ${f(a, 10)} + …` : `${x} = ${e} + … + ${f(b, 100)}`;
    return {
      text: un([`Complète : ${tr}.`, `Trouve la fraction manquante : ${tr}.`, `Quelle fraction manque ? ${tr}.`, `${tr}. Par quoi remplacer les points ?`, `Que faut-il écrire ? ${tr}.`, `Cherche le terme manquant : ${tr}.`, `Termine l’écriture : ${tr}.`, `Écris ce qui manque : ${tr}.`]),
      ...qcm(trouB ? f(b, 100) : f(a, 10), trouB ? [f(b, 10), String(b), f(100, b), f(b, 1000)] : [f(a, 100), String(a), f(10, a), f(a, 1000)]),
      explanation: explS(e, a, b),
    };
  }),
  S(5, 2, HINT_S, () => {
    const e = entre(1, 90), a = entre(1, 9);
    let b = entre(1, 9);
    if (a === b) b = a === 9 ? 1 : a + 1;
    return {
      text: un(FORMES_S(fr(dec(e, a, b)))),
      ...qcm(som2(e, a, b), [`${e} + ${f(b, 10)} + ${f(a, 100)}`, `${e} + ${f(a, 10)} + ${f(b, 10)}`, `${e * 10} + ${f(a, 10)} + ${f(b, 100)}`]),
      explanation: explS(e, a, b),
    };
  }),
  S(6, 2, HINT_S, () => {
    const e = entre(1, 90), a = entre(1, 9), b = entre(1, 9);
    const c = un([som2(e, a, b), `${e} + ${f(b, 100)} + ${f(a, 10)}`]);
    return { text: un(CALC(c)), ...qcmN(dec(e, a, b), [dec(e, b, a), e + a / 100 + b / 10, e + a + b, e * 10 + a + b / 10]), explanation: explS(e, a, b) };
  }),
  S(7, 2, "Pas de dixièmes : le chiffre des dixièmes est 0.", () => {
    const e = entre(1, 90), b = entre(1, 9);
    const c = un([`${e} + ${f(b, 100)}`, `${f(b, 100)} + ${e}`]);
    return { text: un(CALC(c)), ...qcmN(dec(e, 0, b), [dec(e, b), e * 100 + b, e + b, e + b / 1000]), explanation: etapes(`il n’y a aucun dixième : on écrit un 0 juste après la virgule.`, `${b} centièmes, c’est 0,0${b}. ${e} + 0,0${b} = ${fr(dec(e, 0, b))}.`, `le nombre est ${fr(dec(e, 0, b))}.`) };
  }),
  S(8, 2, "10 cases, c’est 1 dixième.", () => {
    const n = entre(11, 99);
    const a = Math.floor(n / 10), b = n % 10 || 1;
    const k = a * 10 + b;
    return {
      text: tournure(["La grille a 100 cases.", "Voici une grille de 100 cases.", "Regarde cette grille de 100 cases."], ["Les cases colorées montrent une fraction.", "On colorie une partie.", "Une partie est colorée."], [`${f(k, 100)} = ${f(a, 10)} + …`, `Complète : ${f(k, 100)} = ${f(a, 10)} + …`]),
      ...qcm(f(b, 100), [f(b, 10), f(a, 100), String(b), f(b, 1000)]),
      canvas: { kind: "fraction", model: "grid", grid: { rows: 10, cols: 10, shaded: k }, display: { showLabel: false, showFraction: false }, size: { width: 240, height: 220 } } as CanvasFigure,
      explanation: etapes(`${a} groupes de 10 cases, c’est ${f(a, 10)}. Il reste ${b} cases.`, `${f(k, 100)} = ${f(a, 10)} + ${f(b, 100)}.`, `il manque ${f(b, 100)}.`),
    };
  }),
  S(9, 3, HINT_S, () => {
    const c = un([["Une planche mesure", "m"], ["Un sac pèse", "kg"], ["Un cahier coûte", "€"], ["Une bouteille contient", "L"], ["Une corde mesure", "m"], ["Un colis pèse", "kg"], ["Un trajet fait", "km"], ["Un livre coûte", "€"], ["Une gourde contient", "L"], ["Une table mesure", "m"], ["Une pastèque pèse", "kg"], ["Un chemin fait", "km"]]);
    const e = entre(1, 30), a = entre(1, 9);
    let b = entre(1, 9);
    if (a === b) b = a === 9 ? 1 : a + 1;
    return {
      text: tournure([`${c[0]} ${fr(dec(e, a, b))} ${c[1]}.`], [`Quelle somme donne cette mesure ?`, `Quelle décomposition convient ?`]),
      ...qcm(`${e} + ${f(a, 10)} + ${f(b, 100)}`, [`${e} + ${f(b, 10)} + ${f(a, 100)}`, `${e} + ${f(a, 10)} + ${f(b, 10)}`, `${e * 10} + ${f(a, 10)} + ${f(b, 100)}`]),
      explanation: explS(e, a, b),
    };
  }),
  S(10, 3, HINT_S, () => {
    const c = un([["Un ruban mesure", "m"], ["Un melon pèse", "kg"], ["Une carafe contient", "L"], ["Une piste fait", "km"], ["Un bébé pèse", "kg"], ["Un poteau mesure", "m"], ["Un seau contient", "L"], ["Une rando fait", "km"], ["Un poisson pèse", "kg"], ["Un tuyau mesure", "m"], ["Un bidon contient", "L"], ["Un chat pèse", "kg"]]);
    const e = entre(2, 20), a = entre(1, 9);
    return {
      text: tournure([`${c[0]} ${e} ${c[1]} et ${f(a, 10)} de ${c[1]}.`], ["Écris cette mesure avec une virgule.", "Quelle est cette mesure en écriture décimale ?"]),
      ...qcmN(dec(e, a), [e + a / 100, a + e / 10, e + a, e * 10 + a], c[1]),
      explanation: explS(e, a, 0),
    };
  }),
  S(11, 4, "Range les morceaux : entier, puis dixièmes, puis centièmes.", () => {
    const e = entre(1, 90), a = entre(1, 9), b = entre(1, 9);
    const t = un([`${f(b, 100)} + ${e} + ${f(a, 10)}`, `${f(a, 10)} + ${f(b, 100)} + ${e}`, `${f(b, 100)} + ${f(a, 10)} + ${e}`]);
    return { text: un(CALC(t)), ...qcmN(dec(e, a, b), [dec(e, b, a), e + a + b, e * 100 + a + b, b + a / 10 + e / 100]), explanation: explS(e, a, b) };
  }),
  S(12, 4, "27 centièmes, c’est 2 dixièmes et 7 centièmes.", () => {
    const e = entre(1, 90), k = entre(11, 99);
    const juste = e + k / 100;
    const t = un([`${e} + ${f(k, 100)}`, `${f(k, 100)} + ${e}`]);
    return {
      text: tournure(["Attention aux centièmes.", "Un défi.", "Regarde bien le dénominateur."], CALC(t)),
      ...qcmN(juste, [e + k / 10, e * 100 + k, k + e / 100, e + k]),
      explanation: etapes(`${k} centièmes, c’est ${Math.floor(k / 10)} dixième(s) et ${k % 10} centième(s).`, `${e} + ${fr(k / 100)} = ${fr(juste)}.`, `le nombre est ${fr(juste)}.`),
    };
  }),
];

/* ═════════════════ fraction_decimale_comparer ═════════════════ */
const C = atelier("cm1", "nombre_decimal", "fraction_decimale_comparer", "cm1_");
const HINT_C = "Écris les deux fractions avec le même dénominateur, puis compare les numérateurs.";
const signe = (x: number, y: number) => (x < y ? "<" : x > y ? ">" : "=");
const cmp = (p: string, q: string, s: string) => `${p} ${s} ${q}`;
const QCMP = (p: string, q: string) => [`Compare ${p} et ${q}.`, `Quel signe entre ${p} et ${q} ?`, `Choisis le bon signe : ${p} et ${q}.`, `${p} et ${q} : quelle écriture est juste ?`, `Quelle comparaison de ${p} et ${q} est juste ?`, `Range ${p} et ${q} avec un signe.`, `Compare ces deux fractions : ${p} et ${q}.`, `Regarde ${p} et ${q}. Quel signe convient ?`];
/** Une fraction décimale et sa valeur en centièmes. */
type FD = { t: string; c: number };
const fd = (n: number, d: 10 | 100): FD => ({ t: f(n, d), c: d === 10 ? n * 10 : n });

const fractionDecimale: TutorBankItemV4[] = [
  C(1, 1, "Même dénominateur : le plus grand numérateur donne la plus grande fraction.", () => {
    const d = un([10, 100] as const);
    const a = entre(1, d === 10 ? 12 : 120);
    let b = entre(1, d === 10 ? 12 : 120);
    if (a === b) b += 1;
    const [p, q] = [f(a, d), f(b, d)];
    const s = signe(a, b);
    return { text: tournure(["", "Même dénominateur.", "Regarde les numérateurs."], QCMP(p, q)), ...qcm(cmp(p, q, s), [cmp(p, q, s === "<" ? ">" : "<"), cmp(p, q, "=")]), explanation: etapes(`même dénominateur : on compare les numérateurs.`, `${a} ${s} ${b}.`, `${cmp(p, q, s)}.`) };
  }),
  C(2, 1, HINT_C, () => {
    const a = entre(1, 9);
    const b = un([a * 10, a * 10 + entre(1, 9), a * 10 - entre(1, 9), (a + 1) * 10 - entre(1, 5)]);
    const [p, q] = Math.random() < 0.5 ? [f(a, 10), f(b, 100)] : [f(b, 100), f(a, 10)];
    const [x, y] = p === f(a, 10) ? [a * 10, b] : [b, a * 10];
    const s = signe(x, y);
    return { text: tournure(["", "Écris tout en centièmes."], QCMP(p, q)), ...qcm(cmp(p, q, s), ["<", ">", "="].filter((z) => z !== s).map((z) => cmp(p, q, z))), explanation: etapes(`on écrit tout en centièmes.`, `${f(a, 10)} = ${f(a * 10, 100)}. On compare ${a * 10} et ${b}.`, `${cmp(p, q, s)}.`) };
  }),
  C(3, 1, "1 dixième = 10 centièmes.", () => {
    const a = entre(1, 9);
    const versCent = Math.random() < 0.5;
    return {
      text: versCent
        ? un([`Complète : ${f(a, 10)} = …/100.`, `Écris ${f(a, 10)} en centièmes.`, `${f(a, 10)}, c’est combien de centièmes ?`, `Quelle fraction sur 100 vaut ${f(a, 10)} ?`, `Trouve la fraction égale à ${f(a, 10)}, sur 100.`, `Change ${f(a, 10)} en centièmes.`, `${f(a, 10)} = …/100. Trouve le numérateur.`, `Combien de centièmes dans ${f(a, 10)} ?`])
        : un([`Complète : ${f(a * 10, 100)} = …/10.`, `Écris ${f(a * 10, 100)} en dixièmes.`, `${f(a * 10, 100)}, c’est combien de dixièmes ?`, `Quelle fraction sur 10 vaut ${f(a * 10, 100)} ?`, `Trouve la fraction égale à ${f(a * 10, 100)}, sur 10.`, `Change ${f(a * 10, 100)} en dixièmes.`, `${f(a * 10, 100)} = …/10. Trouve le numérateur.`, `Combien de dixièmes dans ${f(a * 10, 100)} ?`]),
      ...(versCent ? qcm(f(a * 10, 100), [f(a, 100), f(a * 100, 100), f(a + 10, 100), f(a * 10 + 1, 100)]) : qcm(f(a, 10), [f(a * 10, 10), f(a * 100, 10), f(a + 1, 10), f(10, a)])),
      explanation: etapes(`1 dixième, c’est 10 centièmes.`, `${a} × 10 = ${a * 10}, donc ${f(a, 10)} = ${f(a * 10, 100)}.`, `${f(a, 10)} = ${f(a * 10, 100)}.`),
    };
  }),
  C(4, 2, HINT_C, () => {
    const l: FD[] = [];
    while (l.length < 4) {
      const x = Math.random() < 0.4 ? fd(entre(1, 12), 10) : fd(entre(5, 125), 100);
      if (!l.some((y) => y.c === x.c)) l.push(x);
    }
    const grand = Math.random() < 0.5;
    const tri = [...l].sort((a, b) => a.c - b.c);
    const j = grand ? tri[3] : tri[0];
    const mot = grand ? "grande" : "petite";
    return {
      text: un([`Quelle est la plus ${mot} fraction ?`, `Choisis la plus ${mot} fraction.`, `Cherche la plus ${mot} de ces fractions.`, `Laquelle est la plus ${mot} ?`, `Trouve la fraction la plus ${mot}.`, `Parmi ces fractions, laquelle est la plus ${mot} ?`, `Écris tout en centièmes. Quelle est la plus ${mot} ?`, `Regarde les dénominateurs. Quelle est la plus ${mot} ?`]),
      ...qcm(j.t, l.filter((x) => x !== j).map((x) => x.t)),
      explanation: etapes(`on écrit tout en centièmes.`, l.map((x) => `${x.t} = ${f(x.c, 100)}`).join(" ; ") + ".", `la plus ${mot} est ${j.t}.`),
    };
  }),
  C(5, 2, "Regarde les dixièmes juste avant et juste après.", () => {
    const entier = Math.random() < 0.5;
    if (entier) {
      const e = entre(1, 9), a = entre(1, 9);
      const n = e * 10 + a;
      return {
        text: un([`Encadre ${f(n, 10)} par deux entiers.`, `Entre quels entiers se trouve ${f(n, 10)} ?`, `${f(n, 10)} est entre quels entiers ?`, `Quel encadrement par deux entiers convient à ${f(n, 10)} ?`, `Choisis l’encadrement de ${f(n, 10)} par des entiers.`, `Quels entiers entourent ${f(n, 10)} ?`, `Encadre : … < ${f(n, 10)} < … avec des entiers.`, `Place ${f(n, 10)} entre deux entiers.`]),
        ...qcm(`${e} < ${f(n, 10)} < ${e + 1}`, [`${e + 1} < ${f(n, 10)} < ${e + 2}`, `${n} < ${f(n, 10)} < ${n + 1}`, `${a} < ${f(n, 10)} < ${a + 1}`].filter((x) => !x.startsWith(`${e} <`))),
        explanation: etapes(`10 dixièmes font 1 unité.`, `${e * 10}/10 = ${e} et ${(e + 1) * 10}/10 = ${e + 1}.`, `${e} < ${f(n, 10)} < ${e + 1}.`),
      };
    }
    const a = entre(1, 8), b = entre(1, 9);
    const n = a * 10 + b;
    return {
      text: un([`Encadre ${f(n, 100)} par deux dixièmes.`, `Entre quels dixièmes se trouve ${f(n, 100)} ?`, `${f(n, 100)} est entre quels dixièmes ?`, `Quel encadrement par deux dixièmes convient à ${f(n, 100)} ?`, `Choisis l’encadrement de ${f(n, 100)} par des dixièmes.`, `Quels dixièmes entourent ${f(n, 100)} ?`, `Encadre : … < ${f(n, 100)} < … avec des dixièmes.`, `Place ${f(n, 100)} entre deux dixièmes.`]),
      ...qcm(`${f(a, 10)} < ${f(n, 100)} < ${f(a + 1, 10)}`, [`${f(a + 1, 10)} < ${f(n, 100)} < ${f(a + 2, 10)}`, `${f(b, 10)} < ${f(n, 100)} < ${f(b + 1, 10)}`, `${f(a - 1 || 9, 10)} < ${f(n, 100)} < ${f(a === 1 ? 10 : a, 10)}`].filter((x) => x !== `${f(a, 10)} < ${f(n, 100)} < ${f(a + 1, 10)}`)),
      explanation: etapes(`on écrit les dixièmes en centièmes.`, `${f(a, 10)} = ${f(a * 10, 100)} et ${f(a + 1, 10)} = ${f((a + 1) * 10, 100)}.`, `${f(a, 10)} < ${f(n, 100)} < ${f(a + 1, 10)}.`),
    };
  }),
  C(6, 2, "Entre deux entiers, compte les dixièmes.", () => {
    const n = entre(2, 39);
    const k = n % 10 === 0 ? n + 1 : n;
    const L = un(LETTRES);
    return {
      text: un(["Quelle fraction décimale repère {L} ?", "Le point {L} repère quelle fraction ?", "Lis la fraction du point {L}.", "Quelle fraction est au point {L} ?", "Quelle fraction sur 10 repère {L} ?"]).replace("{L}", L),
      ...qcm(f(k, 10), [f(k, 100), f(k + 1, 10), f(k + 10, 10), f(Math.max(k - 1, 1), 10)]),
      canvas: { kind: "number_line", size: { width: 320, height: 100 }, min: 0, max: 4, step: 1, minorStep: 0.1, points: [{ value: k / 10, label: L }], display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true } } as CanvasFigure,
      explanation: etapes(`l’unité est coupée en 10 : chaque graduation vaut 1 dixième.`, `depuis 0, on compte ${k} graduations.`, `${L} repère ${f(k, 10)}.`),
    };
  }),
  C(7, 2, HINT_C, () => {
    const l: FD[] = [];
    while (l.length < 3) {
      const x = l.length === 0 ? fd(entre(1, 9), 10) : fd(entre(5, 95), 100);
      if (!l.some((y) => y.c === x.c)) l.push(x);
    }
    const tri = [...l].sort((a, b) => a.c - b.c).map((x) => x.t);
    const croissant = Math.random() < 0.5;
    const ord = (t: string[]) => t.join(croissant ? " < " : " > ");
    const juste = ord(croissant ? tri : [...tri].reverse());
    const autres = [[tri[0], tri[2], tri[1]], [tri[1], tri[0], tri[2]], [tri[2], tri[1], tri[0]], [tri[1], tri[2], tri[0]]].map((t) => ord(croissant ? t : [...t].reverse()));
    const sens = croissant ? "du plus petit au plus grand" : "du plus grand au plus petit";
    return {
      text: un([`Range ${sens} : ${melange(l).map((x) => x.t).join(", ")}.`, `Classe ${sens} : ${melange(l).map((x) => x.t).join(", ")}.`, `Ordonne ${sens} : ${melange(l).map((x) => x.t).join(", ")}.`, `Quel rangement ${sens} est juste ?`, `Choisis le bon ordre, ${sens}.`, `Écris tout en centièmes, puis range ${sens}.`, `Trouve le rangement ${sens}.`, `Quel classement ${sens} convient ?`]),
      ...qcm(juste, autres),
      explanation: etapes(`on écrit tout en centièmes.`, l.map((x) => `${x.t} = ${f(x.c, 100)}`).join(" ; ") + ".", `${juste}.`),
    };
  }),
  C(8, 3, HINT_C, () => {
    const c = un<[string, string, string]>([["Léa court", "Tom court", "km"], ["Une pompe verse", "Un robinet verse", "L"], ["Ana boit", "Malo boit", "L"], ["Un sac pèse", "Un carton pèse", "kg"], ["Une corde mesure", "Une ficelle mesure", "m"], ["Un maçon pose", "Une maçonne pose", "m"], ["Une tortue avance de", "Un escargot avance de", "m"], ["Un fromage pèse", "Un pain pèse", "kg"], ["Une nageuse fait", "Un nageur fait", "km"], ["Un vase contient", "Un bol contient", "L"], ["Une table mesure", "Une chaise mesure", "m"], ["Un pompier parcourt", "Une pompière parcourt", "km"]]);
    const a = entre(1, 9);
    let b = entre(5, 95);
    if (b === a * 10) b += 1;
    const dix = Math.random() < 0.5;
    const [p, q, vp, vq] = dix ? [f(a, 10), f(b, 100), a * 10, b] : [f(b, 100), f(a, 10), b, a * 10];
    const nom = (s: string) => s.replace(/ (court|verse|boit|pèse|mesure|pose|avance de|fait|contient|parcourt)$/, "");
    const juste = vp > vq ? nom(c[0]) : nom(c[1]);
    return {
      text: tournure([`${c[0]} ${p} ${c[2]}. ${c[1]} ${q} ${c[2]}.`], ["Qui a la plus grande mesure ?", "Lequel a la plus grande mesure ?"]),
      ...qcm(juste, [juste === nom(c[0]) ? nom(c[1]) : nom(c[0])]),
      explanation: etapes(`on écrit les deux mesures en centièmes.`, `${f(a, 10)} = ${f(a * 10, 100)}. On compare ${a * 10} et ${b}.`, `la plus grande mesure : ${juste}.`),
    };
  }),
  C(9, 3, "Écris les deux dixièmes en centièmes : 3/10 = 30/100.", () => {
    const a = entre(1, 8);
    const n = a * 10 + entre(1, 9);
    const q = un(["Une bouteille est remplie entre {a} et {b}.", "Une batterie est chargée entre {a} et {b}.", "Un trajet est fait entre {a} et {b}.", "Un mur est peint entre {a} et {b}.", "Une cuve est pleine entre {a} et {b}.", "Un livre est lu entre {a} et {b}.", "Un champ est récolté entre {a} et {b}.", "Une tarte est mangée entre {a} et {b}.", "Un puzzle est fini entre {a} et {b}.", "Une jauge indique entre {a} et {b}.", "Un sac est rempli entre {a} et {b}.", "Une piste est faite entre {a} et {b}."]).replace("{a}", f(a, 10)).replace("{b}", f(a + 1, 10));
    return {
      text: tournure([q], ["Quelle fraction est possible ?", "Quelle fraction peut convenir ?"]),
      ...qcm(f(n, 100), [f(n + 10 > 100 ? n - 20 : n + 10, 100), f(a * 10 - entre(1, 5) > 0 ? a * 10 - 5 : 5, 100), f(a + 2, 10), f(a * 10 + 15, 100)]),
      explanation: etapes(`on écrit les deux dixièmes en centièmes.`, `${f(a * 10, 100)} < ${f(n, 100)} < ${f((a + 1) * 10, 100)}.`, `${f(n, 100)} convient.`),
    };
  }),
  C(10, 4, HINT_C, () => {
    const l: FD[] = [];
    while (l.length < 4) {
      const x = Math.random() < 0.5 ? fd(entre(5, 25), 10) : fd(entre(50, 250), 100);
      if (!l.some((y) => y.c === x.c)) l.push(x);
    }
    const tri = [...l].sort((a, b) => a.c - b.c).map((x) => x.t);
    const juste = tri.join(" < ");
    const autres = [[tri[1], tri[0], tri[2], tri[3]], [tri[0], tri[2], tri[1], tri[3]], [tri[0], tri[1], tri[3], tri[2]], [tri[3], tri[2], tri[1], tri[0]]].map((t) => t.join(" < "));
    return {
      text: tournure(["Attention : certaines dépassent 1.", "Quatre sauts en longueur, en mètres.", "Quatre planches, en mètres.", "Quatre masses, en kilogrammes.", "Quatre temps, en heures.", "Quatre bouteilles, en litres.", "Quatre distances, en kilomètres.", "Quatre élèves mesurent un fil, en mètres."], ["Quel rangement du plus petit au plus grand est juste ?", "Quel est le bon ordre croissant ?", "Lequel range ces valeurs du plus petit au plus grand ?"]),
      ...qcm(juste, autres),
      explanation: etapes(`on écrit tout en centièmes.`, l.map((x) => `${x.t} = ${f(x.c, 100)}`).join(" ; ") + ".", `${juste}.`),
    };
  }),
  C(11, 4, HINT_C, () => {
    const a = entre(11, 29);
    const b = a * 10 + un([-5, -3, -1, 1, 3, 5, 0]);
    const [p, q, vp, vq] = Math.random() < 0.5 ? [f(a, 10), f(b, 100), a * 10, b] : [f(b, 100), f(a, 10), b, a * 10];
    const s = signe(vp, vq);
    return {
      text: tournure(["Deux courses.", "Deux sauts.", "Deux bouteilles.", "Deux masses.", "Deux durées.", "Deux longueurs.", "Deux records.", "Deux réservoirs."], QCMP(p, q).slice(0, 5)),
      ...qcm(cmp(p, q, s), ["<", ">", "="].filter((z) => z !== s).map((z) => cmp(p, q, z))),
      explanation: etapes(`on écrit tout en centièmes.`, `${f(a, 10)} = ${f(a * 10, 100)}. On compare ${a * 10} et ${b}.`, `${cmp(p, q, s)}.`),
    };
  }),
];

/* ═════════════════ decimal_puissance_dix ═════════════════ */
const P = atelier("cm1", "nombre_decimal", "decimal_puissance_dix", "cm1_");
const HINT_P = "× 10 : chaque chiffre vaut 10 fois plus. ÷ 10 : chaque chiffre vaut 10 fois moins.";
const NOM_RANG: Record<number, string> = { 1000: "millier", 100: "centaine", 10: "dizaine", 1: "unité", 0.1: "dixième", 0.01: "centième", 0.001: "millième" };
const PLURIEL: Record<string, string> = { millier: "milliers", centaine: "centaines", dizaine: "dizaines", unité: "unités", dixième: "dixièmes", centième: "centièmes", millième: "millièmes" };
/** Le récit par la valeur des chiffres : « 3 unités deviennent 3 dizaines ». */
function recit(x: number, k: number, fois: boolean): string {
  const [e, d = ""] = fr(x).replace(/ /g, "").split(",");
  const morceaux: string[] = [];
  [...e].forEach((c, i) => { if (c !== "0") morceaux.push(`${c} ${NOM_RANG[10 ** (e.length - 1 - i)]}`); });
  [...d].forEach((c, i) => { if (c !== "0") morceaux.push(`${c} ${NOM_RANG[Number((10 ** -(i + 1)).toFixed(i + 1))]}`); });
  const pas = Math.round(Math.log10(k));
  const nv = morceaux.map((m) => {
    const [c, r] = m.split(" ");
    const v = Object.entries(NOM_RANG).find(([, s]) => s === r)![0];
    const nvR = Number(v) * (fois ? 10 ** pas : 10 ** -pas);
    const lib = NOM_RANG[Number(nvR.toPrecision(1))] ?? `${fr(nvR)}`;
    return `${c} ${lib}`;
  });
  return `${morceaux.join(", ")} deviennent ${nv.join(", ")}`.replace(/(\d) (unité|dizaine|centaine|millier|dixième|centième|millième)(?=,| deviennent|$)/g, (_, c, r) => (Number(c) > 1 ? `${c} ${PLURIEL[r]}` : `${c} ${r}`));
}
const explP = (x: number, k: number, fois: boolean) => {
  const r = fois ? x * k : x / k;
  return etapes(`${fois ? "× " + fr(k) : "÷ " + fr(k)} : chaque chiffre vaut ${fr(k)} fois ${fois ? "plus" : "moins"}.`, `${recit(x, k, fois)}.`, `${fr(x)} ${fois ? "×" : "÷"} ${fr(k)} = ${fr(r)}.`);
};
const leurresP = (x: number, k: number, fois: boolean) => {
  const r = fois ? x * k : x / k;
  return [fois ? x / k : x * k, r * 10, r / 10, r * 100, r / 100].filter((v) => Math.round(v * 1000) / 1000 === v && v > 0);
};
const tirerX = () => entre(11, 999) / (Math.random() < 0.6 ? 10 : 100);
/** × tout décimal ; ÷ en gardant 3 décimales au plus. */
function tirerOpP(ks: number[]) {
  const fois = Math.random() < 0.5;
  const k = un(ks);
  if (fois) return { x: tirerX(), k, fois };
  if (k === 1000) return { x: entre(120, 9800), k, fois };
  if (k === 100) return { x: entre(11, 999) / 10, k, fois };
  return { x: tirerX(), k, fois };
}
const ecrP = (x: number, k: number, fois: boolean) => `${fr(x)} ${fois ? "×" : "÷"} ${fr(k)}`;
const RANGS = [["dixièmes", 0.1], ["centièmes", 0.01]] as const;

const decimalPuissance: TutorBankItemV4[] = [
  P(1, 1, HINT_P, () => {
    const { x, k, fois } = tirerOpP([10]);
    return { text: tournure(["", "Pense à la valeur des chiffres.", "Chaque chiffre change de valeur."], CALC(ecrP(x, k, fois))), ...qcmN(fois ? x * k : x / k, leurresP(x, k, fois)), explanation: explP(x, k, fois) };
  }),
  P(2, 1, "Quand on multiplie par 10, les dixièmes deviennent des unités.", () => {
    const [e, a, b] = melange([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const x = e + a / 10 + b / 100;
    const dix = Math.random() < 0.5;
    const juste = dix ? `${a} unités` : `${b} dixièmes`;
    const c = dix ? a : b;
    return {
      text: un([`Dans ${fr(x)} × 10, que devient le chiffre ${c} ?`, `On calcule ${fr(x)} × 10. Que vaut le chiffre ${c} ensuite ?`, `${fr(x)} × 10 : quelle valeur prend le ${c} ?`, `Après ${fr(x)} × 10, le chiffre ${c} vaut combien ?`, `On multiplie ${fr(x)} par 10. Que vaut alors le ${c} ?`, `Que vaut le chiffre ${c} de ${fr(x)} après × 10 ?`, `${fr(x)} est multiplié par 10. Le ${c} devient quoi ?`, `Regarde ${fr(x)} × 10. Que devient le ${c} ?`]),
      ...qcm(juste, dix ? [`${a} dixièmes`, `${a} centièmes`, `${a} dizaines`] : [`${b} centièmes`, `${b} unités`, `${b} millièmes`]),
      explanation: etapes(`× 10 : chaque chiffre vaut 10 fois plus.`, dix ? `${a} dixièmes × 10 = ${a} unités.` : `${b} centièmes × 10 = ${b} dixièmes.`, `le chiffre ${c} vaut maintenant ${juste}.`),
    };
  }),
  P(3, 1, "Compare les deux nombres : ont-ils les mêmes chiffres ?", () => {
    const x = entre(11, 99) / 10;
    const fois = Math.random() < 0.5;
    const r = fois ? x * 10 : x / 10;
    const t = fois ? `${fr(x)} × … = ${fr(r)}` : `${fr(x)} ÷ … = ${fr(r)}`;
    return {
      text: un([`Complète : ${t}.`, `Quel nombre manque ? ${t}.`, `Trouve le nombre manquant : ${t}.`, `${t}. Par quoi remplacer les points ?`, `Que faut-il écrire ? ${t}.`, `Cherche le nombre caché : ${t}.`, `Écris ce qui manque : ${t}.`, `Termine le calcul : ${t}.`]),
      ...qcmN(10, [100, 1000, 2, 5]),
      explanation: etapes(`on regarde de combien la valeur des chiffres a changé.`, `chaque chiffre vaut 10 fois ${fois ? "plus" : "moins"}.`, `${fr(x)} ${fois ? "×" : "÷"} 10 = ${fr(r)}.`),
    };
  }),
  P(4, 2, HINT_P, () => {
    const { x, k, fois } = tirerOpP([100, 1000]);
    return { text: tournure(["", "Pense à la valeur des chiffres."], CALC(ecrP(x, k, fois))), ...qcmN(fois ? x * k : x / k, leurresP(x, k, fois)), explanation: explP(x, k, fois) };
  }),
  P(5, 2, "De combien chaque chiffre a-t-il changé de rang ?", () => {
    const { x, k, fois } = tirerOpP([10, 100, 1000]);
    const r = fois ? x * k : x / k;
    const t = fois ? `${fr(x)} × … = ${fr(r)}` : `${fr(x)} ÷ … = ${fr(r)}`;
    return {
      text: un([`Complète : ${t}.`, `Quel nombre manque ? ${t}.`, `Trouve le nombre manquant : ${t}.`, `${t}. Par quoi remplacer les points ?`, `Que faut-il écrire ? ${t}.`, `Cherche le nombre caché : ${t}.`, `Écris ce qui manque : ${t}.`, `Termine le calcul : ${t}.`]),
      ...qcmN(k, [10, 100, 1000, 10000]),
      explanation: etapes(`on regarde de combien la valeur des chiffres a changé.`, `chaque chiffre vaut ${fr(k)} fois ${fois ? "plus" : "moins"}.`, `${t.replace("…", fr(k))}.`),
    };
  }),
  P(6, 2, "÷ 10 : les unités deviennent des dixièmes.", () => {
    const [u, a] = melange([2, 3, 4, 5, 6, 7, 8, 9]);
    const x = 10 + u + a / 10;
    const unites = Math.random() < 0.5;
    const c = unites ? u : a;
    const juste = unites ? `${u} dixième${u > 1 ? "s" : ""}` : `${a} centième${a > 1 ? "s" : ""}`;
    return {
      text: un([`Dans ${fr(x)} ÷ 10, que devient le chiffre ${c} ?`, `On calcule ${fr(x)} ÷ 10. Que vaut le chiffre ${c} ensuite ?`, `${fr(x)} ÷ 10 : quelle valeur prend le ${c} ?`, `Après ${fr(x)} ÷ 10, le chiffre ${c} vaut combien ?`, `On divise ${fr(x)} par 10. Que vaut alors le ${c} ?`, `Que vaut le chiffre ${c} de ${fr(x)} après ÷ 10 ?`, `${fr(x)} est divisé par 10. Le ${c} devient quoi ?`, `Regarde ${fr(x)} ÷ 10. Que devient le ${c} ?`]),
      ...qcm(juste, unites ? [`${u} unité${u > 1 ? "s" : ""}`, `${u} dizaine${u > 1 ? "s" : ""}`, `${u} centième${u > 1 ? "s" : ""}`] : [`${a} dixième${a > 1 ? "s" : ""}`, `${a} millième${a > 1 ? "s" : ""}`, `${a} unité${a > 1 ? "s" : ""}`]),
      explanation: etapes(`÷ 10 : chaque chiffre vaut 10 fois moins.`, unites ? `${u} unité(s) ÷ 10 = ${u} dixième(s).` : `${a} dixième(s) ÷ 10 = ${a} centième(s).`, `le chiffre ${c} vaut maintenant ${juste}.`),
    };
  }),
  P(7, 3, HINT_P, () => {
    const o = un<[string, number, number]>([["Un cahier coûte", 150, 495], ["Un stylo coûte", 80, 250], ["Une baguette coûte", 90, 130], ["Un ticket de bus coûte", 110, 220], ["Un paquet de riz coûte", 120, 390], ["Une balle de tennis coûte", 150, 480], ["Un citron coûte", 30, 75], ["Une pomme coûte", 35, 85], ["Un timbre coûte", 110, 195], ["Une gomme coûte", 60, 145], ["Un fruit coûte", 45, 120], ["Une bille coûte", 15, 45]]);
    const cents = entre(o[1], o[2]);
    const px = cents / 100;
    const k = un([10, 100]);
    return {
      text: tournure([`${o[0]} ${fr(px)} €.`], [`Combien coûtent ${k} articles identiques ?`, `On en achète ${k}. Quel est le prix total ?`]),
      ...qcmN(px * k, [px * k * 10, px * k / 10, px + k], "€", 1),
      explanation: explP(px, k, true),
    };
  }),
  P(8, 3, HINT_P, () => {
    const o = un<[string, string]>([["billes identiques pèsent", "g"], ["sacs identiques pèsent", "kg"], ["bouteilles identiques contiennent", "L"], ["pas identiques mesurent", "m"], ["planches identiques mesurent", "m"], ["cartons identiques pèsent", "kg"], ["verres identiques contiennent", "L"], ["livres identiques pèsent", "kg"], ["tours de piste font", "km"], ["pierres identiques pèsent", "kg"], ["ballots identiques pèsent", "kg"], ["seaux identiques contiennent", "L"]]);
    const x = entre(111, 999) / 10;
    return {
      text: tournure([`10 ${o[0]} ${fr(x)} ${o[1]} en tout.`], ["Combien pour 1 ?", "Divise par 10 : combien pour 1 ?"]),
      ...qcmN(x / 10, [x, x * 10, x / 100, x - 10], o[1]),
      explanation: explP(x, 10, false),
    };
  }),
  P(9, 4, "Cherche combien de petites unités il y a dans la grande.", () => {
    const [de, a, k, fois] = un<[string, string, number, boolean]>([["m", "cm", 100, true], ["km", "m", 1000, true], ["kg", "g", 1000, true], ["L", "cL", 100, true], ["m", "mm", 1000, true], ["cm", "mm", 10, true], ["cm", "m", 100, false], ["m", "km", 1000, false], ["g", "kg", 1000, false], ["cL", "L", 100, false], ["mm", "cm", 10, false], ["dm", "m", 10, false]]);
    const x = !fois && k === 1000 ? entre(120, 9800) : !fois && k === 100 ? entre(11, 999) / 10 : tirerX();
    const r = fois ? x * k : x / k;
    const obj = un(["On mesure", "Une mesure indique", "On lit", "On note", "Un carnet indique", "Un écran affiche"]);
    return {
      text: tournure([`${obj} ${fr(x)} ${de}.`], [`Écris cette mesure en ${a}.`, `Combien cela fait-il en ${a} ?`, `Convertis en ${a}.`]),
      ...qcmN(r, leurresP(x, k, fois), a),
      explanation: etapes(`${fois ? `1 ${de} = ${fr(k)} ${a}` : `1 ${a} = ${fr(k)} ${de}`} : on ${fois ? "multiplie" : "divise"} par ${fr(k)}.`, `${recit(x, k, fois)}.`, `${fr(x)} ${de} = ${fr(r)} ${a}.`),
    };
  }),
  P(10, 4, "Fais les deux calculs l’un après l’autre.", () => {
    const x = entre(11, 999) / 10;
    const [o1, k1, o2, k2] = un<[string, number, string, number]>([["×", 10, "÷", 100], ["×", 100, "÷", 10], ["÷", 10, "×", 100], ["×", 1000, "÷", 100], ["÷", 10, "×", 1000], ["×", 10, "×", 10]]);
    const app = (v: number, o: string, k: number) => (o === "×" ? v * k : v / k);
    const r = Math.round(app(app(x, o1, k1), o2, k2) * 1000) / 1000;
    return {
      text: tournure(["Deux étapes.", "Calcule de gauche à droite.", "Un calcul en chaîne.", "Un défi."], CALC(`${fr(x)} ${o1} ${fr(k1)} ${o2} ${fr(k2)}`)),
      ...qcmN(r, [r * 10, r / 10, r * 100, r / 100]),
      explanation: etapes(`on calcule de gauche à droite, chaque chiffre change de valeur.`, `${fr(x)} ${o1} ${fr(k1)} = ${fr(app(x, o1, k1))}, puis ${fr(app(x, o1, k1))} ${o2} ${fr(k2)} = ${fr(r)}.`, `le résultat est ${fr(r)}.`),
    };
  }),
];

/* ═════════════════ decimal_ajouter_dixiemes ═════════════════ */
const J = atelier("cm1", "nombre_decimal", "decimal_ajouter_dixiemes", "cm1_");
const HINT_J = "1 dixième = 0,1. 1 centième = 0,01.";
const AJ = (x: string, n: number, m: string) => [`Ajoute ${n} ${m} à ${x}.`, `Calcule ${x} + ${n} ${m}.`, `${x} + ${n} ${m}, cela fait combien ?`, `Que vaut ${x} + ${n} ${m} ?`, `Combien font ${x} et ${n} ${m} ?`, `On ajoute ${n} ${m} à ${x}. Quel nombre obtient-on ?`, `Trouve ${x} + ${n} ${m}.`, `Quel nombre vient ${n} ${m} après ${x} ?`];
const RE = (x: string, n: number, m: string) => [`Enlève ${n} ${m} à ${x}.`, `Calcule ${x} − ${n} ${m}.`, `${x} − ${n} ${m}, cela fait combien ?`, `Que vaut ${x} − ${n} ${m} ?`, `Retire ${n} ${m} de ${x}.`, `On enlève ${n} ${m} à ${x}. Quel nombre obtient-on ?`, `Trouve ${x} − ${n} ${m}.`, `Quel nombre vient ${n} ${m} avant ${x} ?`];
const cal = (x: number, dl: number) => Math.round((x + dl) * 1000) / 1000;
const leurresJ = (x: number, n: number, v: number, signeP: number) => [cal(x, signeP * n), cal(x, signeP * n * (v === 0.1 ? 0.01 : 0.1)), cal(x, -signeP * n * v), cal(x, signeP * (n + 1) * v), cal(x, signeP * (n * v * 10))];
const explJ = (x: number, n: number, v: number, m: string, plus: boolean) => etapes(`${n} ${m}, c’est ${fr(n * v)}.`, `${fr(x)} ${plus ? "+" : "−"} ${fr(n * v)} = ${fr(cal(x, plus ? n * v : -n * v))}.`, `le résultat est ${fr(cal(x, plus ? n * v : -n * v))}.`);
const tirerAJ = (retenue: boolean) => {
  const [m, v] = un(RANGS);
  const n = entre(1, retenue ? 8 : 4);
  const e = entre(1, 40);
  if (v === 0.1) {
    const a = retenue ? entre(10 - n, 9) : entre(1, 9 - n);
    return { x: e + a / 10, n, v, m };
  }
  const a = entre(1, 8);
  const b = retenue ? entre(10 - n, 9) : entre(1, 9 - n);
  return { x: e + a / 10 + b / 100, n, v, m };
};
const unMot = (n: number, m: string) => (n > 1 ? m : m.replace(/s$/, ""));

const decimalAjouter: TutorBankItemV4[] = [
  J(1, 1, HINT_J, () => {
    const { x, n, v, m } = tirerAJ(false);
    return { text: un(AJ(fr(x), n, unMot(n, m))), ...qcmN(cal(x, n * v), leurresJ(x, n, v, 1)), explanation: explJ(x, n, v, unMot(n, m), true) };
  }),
  J(2, 1, HINT_J, () => {
    const { x, n, v, m } = tirerAJ(false);
    const y = cal(x, n * v);
    return { text: un(RE(fr(y), n, unMot(n, m))), ...qcmN(x, leurresJ(y, n, v, -1)), explanation: explJ(y, n, v, unMot(n, m), false) };
  }),
  J(3, 1, HINT_J, () => {
    const { x, n, v } = tirerAJ(false);
    const plus = Math.random() < 0.5;
    const y = cal(x, n * v);
    const [de, r] = plus ? [x, y] : [y, x];
    return { text: un(CALC(`${fr(de)} ${plus ? "+" : "−"} ${fr(n * v)}`)), ...qcmN(r, leurresJ(de, n, v, plus ? 1 : -1)), explanation: etapes(`on ${plus ? "ajoute" : "retire"} ${fr(n * v)}.`, `${fr(de)} ${plus ? "+" : "−"} ${fr(n * v)} = ${fr(r)}.`, `le résultat est ${fr(r)}.`) };
  }),
  J(4, 2, "10 dixièmes font 1 unité. 10 centièmes font 1 dixième.", () => {
    const { x, n, v, m } = tirerAJ(true);
    return { text: un(AJ(fr(x), n, unMot(n, m))), ...qcmN(cal(x, n * v), leurresJ(x, n, v, 1)), explanation: explJ(x, n, v, unMot(n, m), true) };
  }),
  J(5, 2, "Ajoute les dixièmes, puis les centièmes.", () => {
    const e = entre(1, 40), a = entre(1, 5), b = entre(1, 5);
    const x = e + a / 10 + b / 100;
    const d = entre(1, 4), c = entre(1, 4);
    const r = cal(x, d / 10 + c / 100);
    const t = `${d} ${unMot(d, "dixièmes")} et ${c} ${unMot(c, "centièmes")}`;
    return {
      text: un([`Ajoute ${t} à ${fr(x)}.`, `Calcule ${fr(x)} + ${t}.`, `${fr(x)} et ${t}, cela fait combien ?`, `Que vaut ${fr(x)} + ${t} ?`, `On ajoute ${t} à ${fr(x)}. Quel nombre obtient-on ?`, `Trouve ${fr(x)} + ${t}.`]),
      ...qcmN(r, [cal(x, c / 10 + d / 100), cal(x, d / 10), cal(x, c / 100), cal(x, d + c)]),
      explanation: etapes(`${t}, c’est ${fr(d / 10 + c / 100)}.`, `${fr(x)} + ${fr(d / 10 + c / 100)} = ${fr(r)}.`, `le résultat est ${fr(r)}.`),
    };
  }),
  J(6, 2, "Aligne les rangs : les dixièmes avec les dixièmes.", () => {
    const e = entre(1, 40), a = entre(1, 8), b = entre(1, 9);
    const x = e + a / 10 + b / 100;
    const n = entre(1, 9 - a);
    const plus = Math.random() < 0.5;
    const y = cal(x, n / 10);
    const [de, r] = plus ? [x, y] : [y, x];
    return {
      text: tournure(["Attention aux rangs.", "Aligne les chiffres.", "Regarde bien les rangs."], CALC(`${fr(de)} ${plus ? "+" : "−"} ${fr(n / 10)}`)),
      ...qcmN(r, [cal(de, (plus ? 1 : -1) * n / 100), cal(de, (plus ? -1 : 1) * n / 10), cal(de, (plus ? 1 : -1) * n), cal(r, 0.1)]),
      explanation: etapes(`${fr(n / 10)}, c’est ${n} ${unMot(n, "dixièmes")} : on change le chiffre des dixièmes.`, `${fr(de)} ${plus ? "+" : "−"} ${fr(n / 10)} = ${fr(r)}.`, `le résultat est ${fr(r)}.`),
    };
  }),
  J(7, 3, HINT_J, () => {
    const c = un<[string, string, string]>([["Une sprinteuse court en", "s", "gagne"], ["Un nageur fait son 50 m en", "s", "gagne"], ["Un cycliste fait son tour en", "s", "gagne"], ["Une skieuse descend en", "s", "gagne"], ["Un coureur boucle en", "s", "gagne"], ["Une rameuse finit en", "s", "gagne"], ["Un patineur finit en", "s", "perd"], ["Une nageuse fait son 100 m en", "s", "perd"], ["Un motard boucle en", "s", "perd"], ["Une coureuse finit en", "s", "perd"], ["Un sauteur mesure son saut :", "m", "gagne"], ["Une lanceuse note son lancer :", "m", "perd"]]);
    const [m, v] = un(RANGS);
    const n = entre(1, 4);
    const u = c[1] === "s" ? entre(10, 60) : entre(3, 9);
    const a = entre(1, 8), b = entre(5, 9);
    const x = v === 0.1 ? u + (entre(5, 9)) / 10 + b / 100 : u + a / 10 + b / 100;
    // « gagne » sur un chrono = moins de temps ; sur une longueur = plus de mètres.
    const baisse = c[1] === "s" ? c[2] === "gagne" : c[2] === "perd";
    const r = cal(x, baisse ? -n * v : n * v);
    return {
      text: tournure([`${c[0]} ${fr(x)} ${c[1]}.`], [`La fois suivante : ${n} ${unMot(n, m)} de ${baisse ? "moins" : "plus"}.`, `Le lendemain : ${n} ${unMot(n, m)} de ${baisse ? "moins" : "plus"}.`], ["Quelle est la nouvelle mesure ?", "Quel est le nouveau résultat ?"]),
      ...qcmN(r, [cal(x, baisse ? n * v : -n * v), cal(x, (baisse ? -1 : 1) * n * (v === 0.1 ? 0.01 : 0.1)), cal(x, baisse ? -n : n), cal(r, 0.1)], c[1]),
      explanation: explJ(x, n, v, unMot(n, m), !baisse).replace(/le résultat est (.+)\./, `le résultat est $1 ${c[1]}.`),
    };
  }),
  J(8, 3, "5 centimes, c’est 5 centièmes d’euro : 0,05 €.", () => {
    const o = un(["Un stylo", "Une gomme", "Un ticket", "Une baguette", "Un cahier", "Une pomme", "Un jus", "Une règle", "Un timbre", "Un citron", "Un croissant", "Une bille"]);
    const e = entre(1, 9);
    const c = entre(10, 90);
    const dc = un([1, 2, 3, 4, 5]);
    const hausse = Math.random() < 0.5;
    const x = e + c / 100;
    const r = cal(x, (hausse ? 1 : -1) * dc / 100);
    return {
      text: tournure([`${o} coûte ${fr(x)} €.`], [hausse ? `Le prix monte de ${dc} centimes.` : `Le prix baisse de ${dc} centimes.`], ["Quel est le nouveau prix ?", "Combien coûte-t-il maintenant ?"]).replace(/\b1 centimes/, "1 centime"),
      ...qcmN(r, [cal(x, (hausse ? 1 : -1) * dc / 10), cal(x, (hausse ? -1 : 1) * dc / 100), cal(x, (hausse ? 1 : -1) * dc), cal(r, 0.1)], "€"),
      explanation: etapes(`${dc} centime(s), c’est ${dc} centième(s) d’euro : ${fr(dc / 100)} €.`, `${fr(x)} ${hausse ? "+" : "−"} ${fr(dc / 100)} = ${fr(r)}.`, `le nouveau prix est ${fr(r)} €.`),
    };
  }),
  J(9, 4, "Fais les deux étapes l’une après l’autre.", () => {
    const e = entre(1, 40), a = entre(2, 7), b = entre(3, 7);
    const x = e + a / 10 + b / 100;
    const d = entre(1, 2), c = entre(1, 2);
    const ordre = Math.random() < 0.5;
    const r = cal(x, d / 10 - c / 100);
    const t1 = `${d} ${unMot(d, "dixièmes")}`, t2 = `${c} ${unMot(c, "centièmes")}`;
    return {
      text: tournure([`Un nombre vaut ${fr(x)}.`, `Pars de ${fr(x)}.`, `Un compteur affiche ${fr(x)}.`, `Une balance indique ${fr(x)}.`, `Une jauge marque ${fr(x)}.`, `Un thermomètre indique ${fr(x)}.`], [ordre ? `Ajoute ${t1}, puis enlève ${t2}.` : `Enlève ${t2}, puis ajoute ${t1}.`], ["Quel nombre obtiens-tu ?", "Quel est le résultat ?", "Que lis-tu à la fin ?"]),
      ...qcmN(r, [cal(x, d / 10 + c / 100), cal(x, -d / 10 + c / 100), cal(x, c / 10 - d / 100), cal(x, d - c)]),
      explanation: etapes(`on fait les deux étapes.`, `${fr(x)} + ${fr(d / 10)} − ${fr(c / 100)} = ${fr(r)}.`, `le résultat est ${fr(r)}.`),
    };
  }),
  J(10, 4, "Compte ce qu’il manque pour arriver au nombre rond.", () => {
    const e = entre(1, 40);
    const dix = Math.random() < 0.5;
    const a = entre(1, 9);
    const x = dix ? e + a / 10 : e + 0.9 + a / 100;
    const cible = dix ? e + 1 : e + 1;
    const n = dix ? 10 - a : 10 - a;
    const m = dix ? "dixièmes" : "centièmes";
    return {
      text: tournure([`Pars de ${fr(x)}.`, `Un compteur affiche ${fr(x)}.`, `Une jauge indique ${fr(x)}.`, `Un écran montre ${fr(x)}.`, `Une calculatrice affiche ${fr(x)}.`, `Une ardoise porte ${fr(x)}.`], [`Combien de ${m} manque-t-il pour arriver à ${fr(cible)} ?`, `Combien de ${m} faut-il ajouter pour atteindre ${fr(cible)} ?`, `Il faut combien de ${m} pour faire ${fr(cible)} ?`]),
      ...qcmN(n, [a, n + 1, Math.max(n - 1, 1), 10, n + 2], m),
      explanation: etapes(`on compte ce qu’il manque en ${m}.`, `${fr(x)} + ${fr(n * (dix ? 0.1 : 0.01))} = ${fr(cible)}.`, `il manque ${n} ${m}.`),
    };
  }),
];

export const fractionsDecimauxTrousBank: TutorBankItemV4[] = [...fractionAdditionner, ...fractionMixte, ...decimalSomme, ...fractionDecimale, ...decimalPuissance, ...decimalAjouter];
