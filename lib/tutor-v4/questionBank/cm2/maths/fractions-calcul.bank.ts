// ─── Calculer avec les fractions (CM2) ─────────────────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (23/08/2026). Trois objectifs du programme de
// CM2 n'avaient AUCUNE micro — la banque de fractions savait lire, représenter
// et comparer, mais on n'y CALCULAIT jamais :
//   · « Additionner et soustraire des fractions. »       [cm2-N-fractions-8]
//   · « Calculer le produit d'un entier et d'une fraction. » [cm2-N-fractions-9]
//   · « Déterminer une fraction d'une quantité ou d'une grandeur. »
//                                                        [cm2-N-fractions-10]
//
// ⭐ UN SEUL PRINCIPE PORTE LES TROIS : une fraction est un NOMBRE DE PARTS, et
// le dénominateur dit lesquelles. Trois quarts plus deux quarts font cinq
// quarts, comme trois pommes plus deux pommes font cinq pommes — c'est la
// verbalisation que le BO demande, et elle rend la règle inutile à mémoriser.
// Le dénominateur ne s'additionne jamais : il nomme l'unité, il ne se compte pas.
//
// ⭐ LES BORNES DU BO, ET ON NE LES DÉPASSE PAS. Pour l'addition, les exemples
// de réussite (p. 4) s'arrêtent à deux cas : même dénominateur, puis
// dénominateurs dont l'un est MULTIPLE de l'autre — 3/2 + 7/8, 5/6 − 1/12,
// 11/40 − 1/8. Jamais 1/3 + 1/4, qui demanderait un dénominateur commun
// quelconque : cela relève de la 6e. Aucun item de cette banque n'en propose.
//
// ⭐ LE PRODUIT EST UNE ADDITION ITÉRÉE, pas une règle. Le BO fait verbaliser :
// « trois fois cinq quarts, c'est cinq quarts plus cinq quarts plus cinq quarts,
// cela fait quinze quarts ». 3 × 5/4 = 15/4 — on multiplie le numérateur, le
// dénominateur ne bouge pas, et on VOIT pourquoi.
//
// ⚠️ LA FRACTION D'UNE QUANTITÉ SE FAIT EN DEUX TEMPS, dans cet ordre : on
// partage d'abord (le dénominateur), on prend ensuite (le numérateur). « Pour
// trouver deux tiers de douze œufs, je partage douze en trois parts égales, cela
// fait quatre ; deux tiers, c'est deux fois quatre, cela fait huit. » Diviser
// PUIS multiplier garde des nombres petits — l'ordre inverse marche aussi mais
// fait manipuler 24 avant de retomber sur 8.
//
// ⛔ PAS DE QUESTION OUVERTE AU PRIMAIRE : `applyMathsKeyboardFree` les retire et
// transforme les `short` numériques en QCM cliquables. Les questions de méthode
// sont donc posées en QCM, avec le raisonnement dans les propositions.

import type { TutorBankItemV4, SchemaBarreCanvasData, FractionCanvasData } from "@/lib/tutor-v4/types";
import {
  type Prenom, tirer, entre, deuxPrenoms, il, Il, deP, pgcd, simplifiee, parts, enParts,
  choix, dec, tournureCalcul, fabriqueGabarit,
} from "./fractions-cm2-outils";

const gabarit = fabriqueGabarit("fraction_calcul");

/* ⭐ 25/10/2026 — LES SITUATIONS. `tout` : la fraction porte sur un objet entier
   (pizza, livre…) — on peut alors parler de pourcentage ; sinon c'est une
   grandeur (L, km, m) et seul le décimal a du sens. */
type Histoire = { tout: boolean; t: (x: Prenom, y: Prenom, f1: string, f2: string) => string };
const ils = (x: Prenom, y: Prenom) => (x.f && y.f ? "elles" : "ils");
const SOMMES: Histoire[] = [
  { tout: true, t: (x, y, a, b) => `${x.p} mange ${a} de la pizza au goûter, puis ${b} au dîner. Quelle fraction de la pizza a-t-${il(x)} mangée en tout ?` },
  { tout: true, t: (x, y, a, b) => `${x.p} peint ${a} de la clôture le matin et ${b} l’après-midi. Quelle fraction de la clôture est peinte ?` },
  { tout: true, t: (x, y, a, b) => `${x.p} lit ${a} de son livre lundi et ${b} mardi. Quelle fraction du livre a-t-${il(x)} lue ?` },
  { tout: false, t: (x, y, a, b) => `Pour sa recette de crêpes, ${x.p} verse ${a} L de lait, puis encore ${b} L. Combien de litres de lait a-t-${il(x)} versés ?` },
  { tout: false, t: (x, y, a, b) => `${x.p} marche ${a} km jusqu’à la boulangerie, puis ${b} km jusqu’au parc. Quelle distance, en km, a-t-${il(x)} parcourue ?` },
  { tout: true, t: (x, y, a, b) => `${x.p} colorie ${a} de sa grille en bleu et ${b} en rouge. Quelle fraction de la grille est coloriée ?` },
  { tout: true, t: (x, y, a, b) => `${x.p} et ${y.p} partagent une tablette de chocolat : ${x.p} en mange ${a}, ${y.p} ${b}. Quelle fraction de la tablette ont-${ils(x, y)} mangée à ${x.f && y.f ? "elles" : "eux"} deux ?` },
  { tout: true, t: (x, y, a, b) => `Dans le potager ${deP(x)}, ${a} du terrain est planté de tomates et ${b} de salades. Quelle fraction du potager est plantée ?` },
  { tout: true, t: (x, y, a, b) => `${x.p} a rempli ${a} de son album d’autocollants. Cette semaine, ${il(x)} en remplit encore ${b}. Quelle fraction de l’album est remplie ?` },
  { tout: true, t: (x, y, a, b) => `${x.p} tricote une écharpe : ${a} la première semaine, ${b} la deuxième. Quelle fraction de l’écharpe a-t-${il(x)} tricotée ?` },
  { tout: false, t: (x, y, a, b) => `${x.p} coupe ${a} m de ruban pour un cadeau et ${b} m pour un autre. Quelle longueur de ruban, en mètres, a-t-${il(x)} utilisée ?` },
  { tout: true, t: (x, y, a, b) => `Au jeu vidéo, ${x.p} a terminé ${a} du niveau. ${y.p} l’aide et ${ils(x, y)} en font encore ${b}. Quelle fraction du niveau est terminée ?` },
  { tout: true, t: (x, y, a, b) => `${x.p} range ${a} de sa collection de cartes dans un classeur et ${b} dans une boîte. Quelle fraction de la collection est rangée ?` },
  { tout: false, t: (x, y, a, b) => `${x.p} donne à son chien ${a} kg de croquettes le matin et ${b} kg le soir. Combien de kilogrammes de croquettes le chien mange-t-il par jour ?` },
  { tout: true, t: (x, y, a, b) => `Pour le spectacle de l’école, ${x.p} décore ${a} de la salle et ${y.p} ${b}. Quelle fraction de la salle est décorée ?` },
];
const DIFFERENCES: Histoire[] = [
  { tout: true, t: (x, y, a, b) => `Il reste ${a} du gâteau. ${x.p} en mange ${b}. Quelle fraction du gâteau reste-t-il ?` },
  { tout: false, t: (x, y, a, b) => `${x.p} doit parcourir ${a} km pour aller au stade. ${Il(x)} a déjà fait ${b} km. Combien de kilomètres lui reste-t-il ?` },
  { tout: true, t: (x, y, a, b) => `${x.p} a lu ${a} de son roman, ${y.p} en a lu ${b}. Quelle fraction du roman ${x.p} a-t-${il(x)} lue de plus ?` },
  { tout: false, t: (x, y, a, b) => `${x.p} a un ruban de ${a} m. ${Il(x)} en coupe ${b} m pour un bracelet. Quelle longueur de ruban, en mètres, lui reste-t-il ?` },
  { tout: true, t: (x, y, a, b) => `Le pot de peinture est plein aux ${a}. ${x.p} utilise ${b} du pot pour sa cabane. Quelle fraction du pot reste pleine ?` },
  { tout: true, t: (x, y, a, b) => `Il restait ${a} de la tarte. ${x.p} en donne ${b} à ${y.p}. Quelle fraction de la tarte reste-t-il ?` },
  { tout: false, t: (x, y, a, b) => `La gourde ${deP(x)} contient ${a} L d’eau. Pendant le match, ${il(x)} boit ${b} L. Combien de litres reste-t-il dans la gourde ?` },
  { tout: true, t: (x, y, a, b) => `${x.p} a peint ${a} de sa fresque, ${y.p} ${b} de la sienne. Quelle fraction de fresque ${x.p} a-t-${il(x)} peinte de plus ?` },
  { tout: false, t: (x, y, a, b) => `Le sac de terreau ${deP(x)} pèse ${a} kg. ${Il(x)} en met ${b} kg dans une jardinière. Combien de kilogrammes reste-t-il dans le sac ?` },
  { tout: true, t: (x, y, a, b) => `Le réservoir de la tondeuse est plein aux ${a}. Après le travail ${deP(x)}, il a perdu ${b} du réservoir. Quelle fraction du réservoir reste pleine ?` },
];
/** Deux fractions côte à côte : les parts se voient avant de se calculer. */
function deuxBarres(a: [number, number], b: [number, number]): FractionCanvasData {
  return {
    kind: "fraction",
    model: "compare",
    fractions: [
      { numerator: a[0], denominator: a[1], label: `${a[0]}/${a[1]}`, color: "#3b82f6" },
      { numerator: b[0], denominator: b[1], label: `${b[0]}/${b[1]}`, color: "#10b981" },
    ],
    display: { showLabel: true, showFraction: true, showParts: true },
    size: { width: 320, height: 200 },
  };
}
/** k fois la fraction f, dans la vie d'un enfant de 10 ans. */
const PRODUITS: ((x: Prenom, k: number, f: string) => string)[] = [
  (x, k, f) => `${x.p} boit ${f} L de jus chaque jour pendant ${k} jours. Combien de litres de jus boit-${il(x)} en tout ?`,
  (x, k, f) => `${x.p} mange ${f} de pizza à chaque repas, pendant ${k} repas. Quelle quantité de pizza mange-t-${il(x)} en tout ?`,
  (x, k, f) => `${x.p} court ${f} km chaque matin, ${k} matins de suite. Combien de kilomètres court-${il(x)} en tout ?`,
  (x, k, f) => `Une recette de gâteau demande ${f} kg de farine. ${x.p} fait la recette ${k} fois. Combien de kilogrammes de farine utilise-t-${il(x)} ?`,
  (x, k, f) => `${x.p} coupe ${k} morceaux de ruban de ${f} m chacun. Quelle longueur de ruban, en mètres, utilise-t-${il(x)} ?`,
  (x, k, f) => `${x.p} nage ${f} km à chaque séance. ${Il(x)} fait ${k} séances. Combien de kilomètres nage-t-${il(x)} ?`,
  (x, k, f) => `Le chat ${deP(x)} mange ${f} kg de croquettes par semaine. Combien de kilogrammes mange-t-il en ${k} semaines ?`,
  (x, k, f) => `${x.p} remplit ${k} verres de ${f} L de sirop chacun. Combien de litres de sirop faut-il ?`,
  (x, k, f) => `${x.p} met ${f} kg de pommes dans chaque sachet. ${Il(x)} prépare ${k} sachets. Combien de kilogrammes de pommes faut-il ?`,
  (x, k, f) => `Dans le jardin, ${x.p} plante ${k} rangées de fleurs de ${f} m de long. Quelle longueur, en mètres, cela fait-il en tout ?`,
  (x, k, f) => `Pour son aquarium, ${x.p} verse ${k} seaux de ${f} L d’eau. Combien de litres d’eau verse-t-${il(x)} ?`,
  (x, k, f) => `${x.p} fait ${k} tours de la cour de récréation. Un tour mesure ${f} km. Combien de kilomètres parcourt-${il(x)} ?`,
  (x, k, f) => `Un gobelet contient ${f} L. ${x.p} sert ${k} gobelets de limonade à ses amis. Combien de litres de limonade sert-${il(x)} ?`,
  (x, k, f) => `Chaque jour, ${x.p} arrose ses plantes avec ${f} L d’eau. Combien de litres utilise-t-${il(x)} en ${k} jours ?`,
  (x, k, f) => `${x.p} colle ${k} bandes de papier de ${f} m pour sa frise d’histoire. Quelle longueur, en mètres, mesure la frise ?`,
];
const LETTRES = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
const UNITAIRES: Record<number, string> = {
  2: "la moitié", 3: "le tiers", 4: "le quart", 5: "le cinquième", 6: "le sixième", 8: "le huitième", 10: "le dixième",
};
/** « le quart », « les trois quarts », « les 3/4 ». */
function nomFraction(n: number, d: number): string {
  if (n === 1) return UNITAIRES[d] ?? `le ${d}e`;
  return Math.random() < 0.6 ? `les ${LETTRES[n]} ${parts(d)}` : `les ${n}/${d}`;
}
/** Une quantité dont on prend une fraction : situation, question « pris », question « reste ». */
type Quantite = { u: string; d: (x: Prenom, y: Prenom, T: number, nom: string) => string; pris: (x: Prenom) => string; reste: (x: Prenom) => string };
const QUANTITES: Quantite[] = [
  { u: "billes", d: (x, y, T, n) => `${x.p} a ${T} billes. ${Il(x)} en donne ${n} à ${y.p}.`, pris: (x) => `Combien de billes donne-t-${il(x)} ?`, reste: (x) => `Combien de billes lui reste-t-il ?` },
  { u: "pages", d: (x, y, T, n) => `Le livre ${deP(x)} a ${T} pages. ${Il(x)} en a déjà lu ${n}.`, pris: (x) => `Combien de pages a-t-${il(x)} lues ?`, reste: (x) => `Combien de pages lui reste-t-il à lire ?` },
  { u: "€", d: (x, y, T, n) => `${x.p} a ${T} € d’économies. ${Il(x)} en dépense ${n} pour un jeu de société.`, pris: (x) => `Combien d’euros dépense-t-${il(x)} ?`, reste: (x) => `Combien d’euros lui reste-t-il ?` },
  { u: "bonbons", d: (x, y, T, n) => `${x.p} a un sachet de ${T} bonbons. ${Il(x)} en partage ${n} avec ${y.p}.`, pris: (x) => `Combien de bonbons partage-t-${il(x)} ?`, reste: () => `Combien de bonbons reste-t-il dans le sachet ?` },
  { u: "g", d: (x, y, T, n) => `La recette ${deP(x)} demande ${T} g de farine. ${Il(x)} en a déjà versé ${n}.`, pris: (x) => `Combien de grammes de farine a-t-${il(x)} versés ?`, reste: (x) => `Combien de grammes de farine doit-${il(x)} encore verser ?` },
  { u: "km", d: (x, y, T, n) => `La randonnée ${deP(x)} fait ${T} km. ${Il(x)} en a parcouru ${n}.`, pris: (x) => `Combien de kilomètres a-t-${il(x)} parcourus ?`, reste: (x) => `Combien de kilomètres lui reste-t-il ?` },
  { u: "minutes", d: (x, y, T, n) => `Le film dure ${T} minutes. ${x.p} en a regardé ${n}.`, pris: (x) => `Combien de minutes a-t-${il(x)} regardées ?`, reste: (x) => `Combien de minutes lui reste-t-il à regarder ?` },
  { u: "cartes", d: (x, y, T, n) => `${x.p} a ${T} cartes à collectionner. ${Il(x)} en échange ${n} avec ${y.p}.`, pris: (x) => `Combien de cartes échange-t-${il(x)} ?`, reste: (x) => `Combien de cartes garde-t-${il(x)} ?` },
  { u: "L", d: (x, y, T, n) => `La cuve d’eau de pluie du jardin ${deP(x)} contient ${T} L. ${Il(x)} en utilise ${n} pour arroser.`, pris: (x) => `Combien de litres utilise-t-${il(x)} ?`, reste: () => `Combien de litres reste-t-il dans la cuve ?` },
  { u: "photos", d: (x, y, T, n) => `${x.p} a pris ${T} photos pendant la sortie scolaire. ${Il(x)} en imprime ${n}.`, pris: (x) => `Combien de photos imprime-t-${il(x)} ?`, reste: () => `Combien de photos ne sont pas imprimées ?` },
  { u: "places", d: (x, y, T, n) => `Le car de la sortie ${deP(x)} a ${T} places. Les élèves en occupent ${n}.`, pris: () => `Combien de places sont occupées ?`, reste: () => `Combien de places restent libres ?` },
  { u: "graines", d: (x, y, T, n) => `${x.p} a ${T} graines de tournesol. ${Il(x)} en sème ${n}.`, pris: (x) => `Combien de graines sème-t-${il(x)} ?`, reste: (x) => `Combien de graines lui reste-t-il ?` },
  { u: "points", d: (x, y, T, n) => `Pour gagner au jeu, ${x.p} doit marquer ${T} points. ${Il(x)} en a déjà marqué ${n}.`, pris: (x) => `Combien de points a-t-${il(x)} marqués ?`, reste: (x) => `Combien de points doit-${il(x)} encore marquer ?` },
  { u: "kg", d: (x, y, T, n) => `${x.p} aide à ranger ${T} kg de pommes de terre. ${Il(x)} en porte ${n}.`, pris: (x) => `Combien de kilogrammes porte-t-${il(x)} ?`, reste: () => `Combien de kilogrammes reste-t-il à porter ?` },
  { u: "élèves", d: (x, y, T, n) => `L’école de musique ${deP(x)} compte ${T} élèves ; ${n} d’entre eux jouent du piano.`, pris: () => `Combien d’élèves jouent du piano ?`, reste: () => `Combien d’élèves ne jouent pas du piano ?` },
  { u: "biscuits", d: (x, y, T, n) => `${x.p} et ${y.p} préparent ${T} biscuits pour la fête. Les invités en mangent ${n}.`, pris: () => `Combien de biscuits sont mangés ?`, reste: () => `Combien de biscuits reste-t-il ?` },
];
/** La question « k × a/d » sous forme de QCM : leurres = ses erreurs. */
function produit(x: Prenom, y: Prenom, k: number, a: number, d: number, text: string) {
  const n = k * a;
  const bonne = `${n}/${d}`;
  return {
    text,
    format: "qcm" as const,
    // ⛔ Multiplier aussi le dénominateur (3 × 2/5 = 6/15), ajouter l'entier, oublier de multiplier.
    choices: choix(bonne, [`${n}/${k * d}`, `${k + a}/${d}`, `${a}/${k * d}`, `${n + 1}/${d}`, `${n}/${d + k}`]),
    expected: [bonne],
    comparator: "mcq_exact" as const,
    explanation: exp(
      "multiplier une fraction par un entier, c'est l'additionner plusieurs fois avec elle-même.",
      "on multiplie le numérateur par l'entier ; le dénominateur ne bouge pas.",
      `${k} × ${a}/${d}, c'est ${Array(Math.min(k, 4)).fill(`${a}/${d}`).join(" + ")}${k > 4 ? " + …" : ""} : ${k} × ${enParts(a, d)} = ${enParts(n, d)}. Écrire ${n}/${k * d} reviendrait à garder ${a}/${d} : on n'aurait rien multiplié.`,
      `${k} × ${a}/${d} = ${n}/${d}${simplifiee(n, d) !== bonne ? `, qui se simplifie en ${simplifiee(n, d)}` : ""}.`
    ),
  };
}
/** Un disque partagé (camembert) : une fraction inférieure ou égale à 1. */
function disque(n: number, d: number, label?: string): FractionCanvasData {
  return {
    kind: "fraction",
    model: "circle",
    fraction: { numerator: n, denominator: d, label: label ?? `${n}/${d}`, color: "#f59e0b" },
    display: { showLabel: true, showFraction: true, showParts: true },
    size: { width: 300, height: 210 },
  };
}
/** Une barre partagée : la fraction qu'on répète ou qu'on prend. */
function barreF(n: number, d: number, label?: string): FractionCanvasData {
  return {
    kind: "fraction",
    model: "bar",
    fraction: { numerator: n, denominator: d, label: label ?? `${n}/${d}`, color: "#6366f1" },
    display: { showLabel: true, showFraction: true, showParts: true },
    size: { width: 320, height: 130 },
  };
}
/** Un rectangle partagé en lignes × colonnes (8 = 2 × 4) : n cases coloriées sur d. */
function rectangle(n: number, d: number): FractionCanvasData {
  const lignes = d % 3 === 0 && d > 3 ? 3 : d % 2 === 0 && d > 2 ? 2 : 1;
  return {
    kind: "fraction",
    model: "grid",
    grid: { rows: lignes, cols: d / lignes, shaded: n },
    display: { showFraction: true },
    size: { width: 320, height: 200 },
  };
}
/** Couples (petit dénominateur, grand dénominateur multiple) bornés au CM2. */
const MULTIPLES: [number, number][] = [
  [2, 4], [2, 6], [2, 8], [2, 10], [3, 6], [3, 9], [3, 12], [4, 8], [4, 12], [5, 10], [6, 12], [2, 12],
];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

/** Le schéma en barres du BO : la quantité partagée, une part mise en avant. */
function barres(total: string, parts: { label: string; value?: string; unknown?: boolean }[], question: string): SchemaBarreCanvasData {
  return {
    kind: "schema_barre",
    total,
    parts,
    questionLabel: question,
    size: { width: 330, height: 180 },
  };
}

/** Une barre partagée en `parts` morceaux dont `prises` sont demandées. */
function barrePartage(totalLabel: string, parts: number, prises: number, question: string) {
  return barres(
    totalLabel,
    Array.from({ length: parts }, (_, i) => ({
      label: i < prises ? "?" : "",
      unknown: i < prises,
    })),
    question
  );
}

export const fractionsCalculCm2Bank: TutorBankItemV4[] = [
  // =========================
  // FRACTION_ADDITIONNER — additionner et soustraire
  // =========================
  {
    kind: "fixed",
    id: "cm2_fraction_additionner_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 3/8 + 2/8 = …/8. Quel numérateur manque ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Trois huitièmes plus deux huitièmes, cela fait combien de huitièmes ?",
    explanation: exp(
      "on additionne des fractions comme on additionne des objets de même nature : trois pommes plus deux pommes font cinq pommes.",
      "quand le dénominateur est le même, on additionne les numérateurs et on garde le dénominateur.",
      "3 huitièmes + 2 huitièmes = 5 huitièmes, donc 3/8 + 2/8 = 5/8. Le dénominateur ne s'additionne pas : il NOMME l'unité, il ne se compte pas. Écrire 5/16 reviendrait à dire que les parts ont changé de taille en cours de route.",
      "3/8 + 2/8 = 5/8."
    ),
    tags: ["fraction_calcul", "additionner", "short"],
  },
  {
    kind: "fixed",
    id: "cm2_fraction_additionner_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi 3/8 + 2/8 fait-il 5/8, et non 5/16 ?",
    format: "qcm",
    choices: [
      "parce que le dénominateur dit la taille des parts : elle ne change pas quand on en ajoute",
      "parce qu'on n'a pas le droit d'additionner deux dénominateurs identiques",
      "parce que 16 est trop grand pour un résultat",
      "parce qu'il faudrait simplifier 5/16 en 5/8",
    ],
    expected: [
      "parce que le dénominateur dit la taille des parts : elle ne change pas quand on en ajoute",
    ],
    comparator: "mcq_exact",
    hint: "Si tu ajoutes des huitièmes à des huitièmes, obtiens-tu des seizièmes ?",
    explanation: exp(
      "le dénominateur nomme l'unité dans laquelle on compte ; le numérateur compte.",
      "on vérifie qu'avant et après le calcul, on compte bien la même chose.",
      "On ajoute 2 huitièmes à 3 huitièmes : le résultat est en huitièmes, comme les deux nombres de départ. Seule la QUANTITÉ de parts change, pas leur taille. Répondre 5/16 reviendrait à dire que les parts sont devenues deux fois plus petites parce qu'on en a ajouté — ce qui n'a pas de sens.",
      "on additionne les numérateurs, jamais les dénominateurs."
    ),
    tags: ["fraction_calcul", "additionner", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cm2_fraction_additionner_fixed_3",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    text: "Pour calculer 3/2 + 7/8, on réécrit d'abord 3/2 en huitièmes. Combien vaut 3/2 en huitièmes ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Un demi vaut 4 huitièmes.",
    explanation: exp(
      "pour additionner deux fractions de dénominateurs différents, on les ramène d'abord à la même unité.",
      "quand un dénominateur est un multiple de l'autre, on réécrit la plus grosse part dans la plus petite.",
      "8 est le quadruple de 2, donc 1 demi vaut 4 huitièmes. On multiplie donc les deux termes par 4 : 3/2 = 12/8. Le calcul devient 12/8 + 7/8 = 19/8, tout en huitièmes.",
      "3/2 vaut 12/8."
    ),
    tags: ["fraction_calcul", "additionner", "short"],
  },
  {
    kind: "fixed",
    id: "cm2_fraction_additionner_fixed_4",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 5/6 − 1/12 = …/12. Quel numérateur manque ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Écris d'abord 5/6 en douzièmes : 12 est le double de 6.",
    explanation: exp(
      "on soustrait des fractions comme on les additionne : après les avoir ramenées à la même unité.",
      "on réécrit la fraction au plus gros dénominateur, puis on soustrait les numérateurs.",
      "12 est le double de 6, donc 5/6 = 10/12. Le calcul devient 10/12 − 1/12 = 9/12. On compte en douzièmes du début à la fin.",
      "5/6 − 1/12 = 9/12."
    ),
    tags: ["fraction_calcul", "additionner", "short"],
  },
  {
    kind: "template",
    id: "cm2_fraction_additionner_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    hint: "Même dénominateur : on additionne seulement les numérateurs.",
    tags: ["fraction_calcul", "additionner", "template"],
    generate: () => {
      const denominateur = randomChoice([4, 5, 6, 8, 9, 10, 12]);
      const a = randomInt(1, denominateur - 2);
      const b = randomInt(1, denominateur - a - 1);
      const plus = Math.random() < 0.6;
      const gauche = plus ? a : a + b;
      const resultat = plus ? a + b : a;
      const [x, y] = deuxPrenoms();
      const d = denominateur;
      const bonne = `${resultat}/${d}`;
      // Leurres : ses erreurs — dénominateurs additionnés, mauvaise opération, voisin.
      const leurres = plus
        ? [`${resultat}/${2 * d}`, `${Math.abs(gauche - b)}/${d}`, `${resultat + 1}/${d}`, `${gauche * b}/${d}`, `${resultat - 1}/${d}`]
        : [`${gauche + b}/${d}`, `${resultat}/${2 * d}`, `${resultat + 1}/${d}`, `${b}/${d}`, `${resultat - 1}/${d}`];
      return {
        text: tournureCalcul(x, y, `${gauche}/${d} ${plus ? "+" : "−"} ${b}/${d}`),
        format: "qcm",
        choices: choix(bonne, leurres),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: rectangle(gauche, d),
        explanation: exp(
          "on compte des parts de même taille : le dénominateur nomme l'unité, le numérateur compte.",
          "à dénominateur identique, on calcule sur les numérateurs et on garde le dénominateur.",
          plus
            ? `${enParts(gauche, d)} + ${enParts(b, d)} = ${enParts(resultat, d)} : ${gauche}/${d} + ${b}/${d} = ${resultat}/${d}. Le dénominateur ne s'additionne pas : ${resultat}/${2 * d} voudrait dire que les parts ont rapetissé.`
            : `${enParts(gauche, d)} − ${enParts(b, d)} = ${enParts(resultat, d)} : ${gauche}/${d} − ${b}/${d} = ${resultat}/${d}.`,
          `${gauche}/${d} ${plus ? "+" : "−"} ${b}/${d} = ${resultat}/${d}${simplifiee(resultat, d) !== bonne ? `, qui se simplifie en ${simplifiee(resultat, d)}` : ""}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cm2_fraction_additionner_tpl_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    hint: "Un dénominateur est un multiple de l'autre : ramène tout au plus grand.",
    tags: ["fraction_calcul", "additionner", "template"],
    generate: () => {
      // ⛔ UN DÉNOMINATEUR MULTIPLE DE L'AUTRE, jamais deux quelconques : le BO
      // s'arrête là au CM2, le cas général relève de la 6e.
      const [petit, grand] = randomChoice(MULTIPLES);
      const facteur = grand / petit;
      const numPetit = randomInt(1, Math.max(1, petit - 1));
      const converti = numPetit * facteur;
      const autre = randomInt(1, grand - 1);
      const [x, y] = deuxPrenoms();
      const calc = `${numPetit}/${petit} + ${autre}/${grand}`;
      const bonne = `${converti}/${grand}`;
      const textes = [
        `Pour calculer ${calc}, ${x.p} écrit d'abord ${numPetit}/${petit} en ${parts(grand)}. Quelle fraction doit-${il(x)} écrire ?`,
        `${x.p} veut calculer ${calc}. ${Il(x)} commence par écrire ${numPetit}/${petit} avec le dénominateur ${grand}. Que trouve-t-${il(x)} ?`,
        `Avant d'additionner ${calc}, ${y.p} conseille à ${x.p} de tout compter en ${parts(grand)}. Combien vaut ${numPetit}/${petit} en ${parts(grand)} ?`,
        `Dans ${calc}, quelle fraction de dénominateur ${grand} est égale à ${numPetit}/${petit} ?`,
        `${x.p} transforme ${numPetit}/${petit} pour pouvoir calculer ${calc}. Quelle fraction en ${parts(grand)} obtient-${il(x)} ?`,
      ];
      return {
        text: tirer(textes),
        format: "qcm",
        // Leurres : n'ajuster qu'un terme, ajouter au lieu de multiplier.
        choices: choix(bonne, [`${numPetit}/${grand}`, `${numPetit + facteur}/${grand}`, `${numPetit * facteur}/${petit}`, `${converti + 1}/${grand}`, `${numPetit + grand - petit}/${grand}`]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "pour additionner deux fractions, il faut d'abord compter dans la même unité.",
          "quand un dénominateur est un multiple de l'autre, on multiplie les DEUX termes de la plus grosse fraction par le même nombre.",
          `${grand} = ${facteur} × ${petit}, donc ${enParts(1, petit)} vaut ${facteur} ${parts(grand)}. On multiplie les deux termes par ${facteur} : ${numPetit}/${petit} = ${converti}/${grand}. Le calcul devient ${converti}/${grand} + ${autre}/${grand} = ${converti + autre}/${grand}.`,
          `${numPetit}/${petit} = ${converti}/${grand}.`
        ),
      };
    },
  },

  // ⭐ 25/10/2026 — situations × tournures × prénoms (voir fractions-cm2-outils.ts).
  gabarit("cm2_fraction_additionner_tpl_3", "fraction_additionner", 2, "Même dénominateur : on additionne les numérateurs, le dénominateur ne bouge pas.", () => {
    const d = tirer([3, 4, 5, 6, 8, 10, 12]);
    const a = entre(1, d - 2);
    const b = entre(1, d - a - 1);
    const S = a + b;
    const [x, y] = deuxPrenoms();
    const histoire = Math.random() < 0.65;
    const bonne = `${S}/${d}`;
    return {
      text: histoire ? tirer(SOMMES).t(x, y, `${a}/${d}`, `${b}/${d}`) : tournureCalcul(x, y, `${a}/${d} + ${b}/${d}`),
      format: "qcm",
      choices: choix(bonne, [`${S}/${2 * d}`, `${a * b}/${d}`, `${Math.abs(a - b)}/${d}`, `${S + 1}/${d}`, `${S - 1}/${d}`]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        "on additionne des fractions comme des objets de même nature : 3 pommes + 2 pommes = 5 pommes.",
        "même dénominateur : on additionne les numérateurs et on garde le dénominateur.",
        `${enParts(a, d)} + ${enParts(b, d)} = ${enParts(S, d)}, donc ${a}/${d} + ${b}/${d} = ${S}/${d}. Écrire ${S}/${2 * d} serait additionner aussi les dénominateurs : les parts deviendraient deux fois plus petites, ce qui n'a pas de sens.`,
        `${a}/${d} + ${b}/${d} = ${S}/${d}.`
      ),
      canvas: deuxBarres([a, d], [b, d]),
    };
  }),
  gabarit("cm2_fraction_additionner_tpl_4", "fraction_additionner", 2, "Même dénominateur : on soustrait les numérateurs.", () => {
    const d = tirer([3, 4, 5, 6, 8, 10, 12]);
    const a = entre(2, d - 1);
    const b = entre(1, a - 1);
    const R = a - b;
    const [x, y] = deuxPrenoms();
    const bonne = `${R}/${d}`;
    return {
      text: Math.random() < 0.65 ? tirer(DIFFERENCES).t(x, y, `${a}/${d}`, `${b}/${d}`) : tournureCalcul(x, y, `${a}/${d} − ${b}/${d}`),
      format: "qcm",
      choices: choix(bonne, [`${a + b}/${d}`, `${R}/${2 * d}`, `${R + 1}/${d}`, `${b}/${d}`, `${R - 1}/${d}`]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        "on soustrait des parts de même taille : le dénominateur nomme la taille, le numérateur compte.",
        "même dénominateur : on soustrait les numérateurs et on garde le dénominateur.",
        `${enParts(a, d)} − ${enParts(b, d)} = ${enParts(R, d)}, donc ${a}/${d} − ${b}/${d} = ${R}/${d}.`,
        `${a}/${d} − ${b}/${d} = ${R}/${d}.`
      ),
      canvas: disque(a, d, `au départ : ${a}/${d}`),
    };
  }),
  gabarit("cm2_fraction_additionner_tpl_5", "fraction_additionner", 3, "Calcule, puis divise le numérateur ET le dénominateur par le même nombre.", () => {
    // ⭐ SA demande : un résultat qui se SIMPLIFIE (2/4 = 1/2) — ses élèves ne simplifient pas.
    let d = 4, a = 1, b = 1;
    do {
      d = tirer([4, 6, 8, 10, 12]);
      a = entre(1, d - 2);
      b = entre(1, d - a - 1);
    } while (pgcd(a + b, d) === 1);
    const S = a + b;
    const g = pgcd(S, d);
    const [x, y] = deuxPrenoms();
    const bonne = simplifiee(S, d);
    const consigne = tirer([
      " Donne le résultat sous la forme la plus simple.",
      " Simplifie le résultat autant que possible.",
      " Écris la fraction la plus simple possible.",
    ]);
    return {
      text: (Math.random() < 0.6 ? tirer(SOMMES).t(x, y, `${a}/${d}`, `${b}/${d}`) : tournureCalcul(x, y, `${a}/${d} + ${b}/${d}`)) + consigne,
      format: "qcm",
      // Leurres : ne diviser qu'un terme, additionner les dénominateurs, se tromper d'une part.
      choices: choix(bonne, [`${S / g}/${d}`, `${S}/${d / g}`, `${S}/${2 * d}`, `${S + 1}/${d}`, `${S / g}/${2 * d / g}`]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        "simplifier une fraction, c'est diviser son numérateur ET son dénominateur par le même nombre : elle garde la même valeur.",
        "on additionne d'abord les numérateurs, puis on cherche un nombre qui divise les deux termes.",
        `${a}/${d} + ${b}/${d} = ${S}/${d}. ${S} et ${d} sont tous les deux dans la table de ${g} : ${S} ÷ ${g} = ${S / g} et ${d} ÷ ${g} = ${d / g}. Donc ${S}/${d} = ${bonne}. Diviser un seul des deux nombres change la valeur de la fraction.`,
        `${a}/${d} + ${b}/${d} = ${S}/${d} = ${bonne}.`
      ),
      canvas: deuxBarres([a, d], [b, d]),
    };
  }),
  gabarit("cm2_fraction_additionner_tpl_6", "fraction_additionner", 3, "Écris d'abord les deux fractions avec le plus grand dénominateur.", () => {
    const [p, g] = tirer(MULTIPLES);
    const k = g / p;
    const plus = Math.random() < 0.6;
    let a = 1, c = 1, R = 0;
    for (let essai = 0; essai < 50; essai++) {
      a = entre(1, p - 1);
      c = entre(1, g - 1);
      R = plus ? a * k + c : a * k - c;
      if (R > 0 && R < g && pgcd(c, g) === 1) break;
    }
    if (!(R > 0 && R < g)) { a = 1; c = 1; R = plus ? k + 1 : k - 1; }
    const [x, y] = deuxPrenoms();
    const f1 = `${a}/${p}`, f2 = `${c}/${g}`;
    const bonne = `${R}/${g}`;
    const leurres = plus
      ? [`${a + c}/${p + g}`, `${a + c}/${g}`, `${a + c}/${p}`, `${R + 1}/${g}`, `${a * k + c}/${g * p}`]
      : [`${Math.abs(a - c)}/${g - p}`, `${Math.abs(a - c)}/${g}`, `${a * k + c}/${g}`, `${R + 1}/${g}`, `${R}/${g + p}`];
    return {
      text: Math.random() < 0.65 ? tirer(plus ? SOMMES : DIFFERENCES).t(x, y, f1, f2) : tournureCalcul(x, y, `${f1} ${plus ? "+" : "−"} ${f2}`),
      format: "qcm",
      choices: choix(bonne, leurres),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        "on ne peut additionner ou soustraire que des parts de même taille.",
        `${g} est un multiple de ${p} : on écrit ${f1} en ${parts(g)}, puis on calcule sur les numérateurs.`,
        `${g} = ${k} × ${p}, donc ${f1} = ${a * k}/${g}. Puis ${a * k}/${g} ${plus ? "+" : "−"} ${c}/${g} = ${R}/${g}.`,
        `${f1} ${plus ? "+" : "−"} ${f2} = ${R}/${g}${simplifiee(R, g) !== bonne ? ` = ${simplifiee(R, g)}` : ""}.`
      ),
      // Deux barres de même longueur : on VOIT que les parts n'ont pas la même taille.
      canvas: deuxBarres([a, p], [c, g]),
    };
  }),

  gabarit("cm2_fraction_additionner_tpl_7", "fraction_additionner", 4, "Le tout vaut 1, c'est-à-dire autant de parts que le dénominateur. Additionne ce qui est pris, puis retire-le du tout.", () => {
    let p = 2, g = 4, a = 1, c = 1;
    for (let essai = 0; essai < 50; essai++) {
      [p, g] = tirer(MULTIPLES);
      a = entre(1, p - 1);
      c = entre(1, g - 1);
      if (a * (g / p) + c < g) break;
    }
    if (a * (g / p) + c >= g) { p = 2; g = 8; a = 1; c = 1; }
    const k = g / p;
    const pris = a * k + c;
    const R = g - pris;
    const [x, y] = deuxPrenoms();
    const f1 = `${a}/${p}`, f2 = `${c}/${g}`;
    const RESTES = [
      `${x.p} mange ${f1} de la tablette de chocolat, ${y.p} en mange ${f2}. Quelle fraction de la tablette reste-t-il ?`,
      `${x.p} a lu ${f1} de son livre la première semaine et ${f2} la deuxième. Quelle fraction du livre lui reste-t-il à lire ?`,
      `Dans le jardin ${deP(x)}, ${f1} du terrain est réservé aux légumes et ${f2} aux fleurs. Le reste est en pelouse. Quelle fraction du jardin est en pelouse ?`,
      `${x.p} dépense ${f1} de son argent de poche pour un livre et ${f2} pour des bonbons. Quelle fraction de son argent de poche lui reste-t-il ?`,
      `Pour aller à l'école, ${x.p} fait ${f1} du trajet à vélo et ${f2} à pied. ${Il(x)} fait le reste en bus. Quelle fraction du trajet fait-${il(x)} en bus ?`,
      `Dans la classe ${deP(x)}, ${f1} des élèves viennent à pied, ${f2} en voiture, les autres en bus. Quelle fraction des élèves vient en bus ?`,
      `${x.p} et ${y.p} remplissent une piscine gonflable : ${x.p} en remplit ${f1}, ${y.p} ${f2}. Quelle fraction de la piscine reste à remplir ?`,
      `Au club ${deP(x)}, ${f1} des enfants font du foot, ${f2} du basket, les autres du judo. Quelle fraction des enfants fait du judo ?`,
      `${x.p} colorie un mandala : ${f1} en vert, ${f2} en jaune. Quelle fraction du mandala reste blanche ?`,
      `Le pot de confiture est plein. ${x.p} en mange ${f1}, ${y.p} ${f2}. Quelle fraction du pot reste-t-il ?`,
      `${x.p} prépare la fête : ${f1} des ballons sont gonflés par ${il(x)}, ${f2} par ${y.p}. Quelle fraction des ballons reste à gonfler ?`,
      `Sur le parcours de la course de l'école, ${x.p} a couru ${f1} et marché ${f2}. Quelle fraction du parcours lui reste-t-il ?`,
    ];
    const bonne = `${R}/${g}`;
    return {
      text: tirer(RESTES),
      format: "qcm",
      // Leurres : la part prise (oublier de retirer), sans conversion, dénominateurs additionnés.
      choices: choix(bonne, [`${pris}/${g}`, `${g - a - c}/${g}`, `${p + g - a - c}/${p + g}`, `${R + 1}/${g}`, `${R}/${p}`]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        "le tout vaut 1, c'est-à-dire " + `${g}/${g}` + " : autant de parts que le dénominateur.",
        "on écrit tout avec le même dénominateur, on additionne ce qui est pris, puis on le retire du tout.",
        `${f1} = ${a * k}/${g}. Pris en tout : ${a * k}/${g} + ${c}/${g} = ${pris}/${g}. Il reste ${g}/${g} − ${pris}/${g} = ${R}/${g}.`,
        `il reste ${R}/${g}${simplifiee(R, g) !== bonne ? `, c'est-à-dire ${simplifiee(R, g)}` : ""}.`
      ),
      canvas: deuxBarres([a, p], [c, g]),
    };
  }),
  gabarit("cm2_fraction_additionner_tpl_8", "fraction_additionner", 4, "Calcule la fraction, puis pense à 1/10 = 0,1 ou à 1/4 = 25 %.", () => {
    // ⭐ SA demande : passer de la fraction au DÉCIMAL et au POURCENTAGE.
    const pourcent = Math.random() < 0.5;
    const d = pourcent ? tirer([4, 5, 10, 100]) : tirer([10, 10, 100]);
    const a = d === 100 ? entre(5, 45) : entre(1, d - 2);
    const b = d === 100 ? entre(5, 45) : entre(1, d - a - 1);
    const S = a + b;
    const [x, y] = deuxPrenoms();
    const histoires = SOMMES.filter((h) => !pourcent || h.tout);
    const debut = Math.random() < 0.7 ? tirer(histoires).t(x, y, `${a}/${d}`, `${b}/${d}`) : tournureCalcul(x, y, `${a}/${d} + ${b}/${d}`);
    const pct = (S * 100) / d;
    const bonne = pourcent ? `${dec(pct)} %` : dec(S / d);
    const leurres = pourcent
      ? [`${S}${d} %`, `${S} %`, `${dec(100 - pct)} %`, `${dec((S * 100) / (2 * d))} %`, `${dec(pct / 10)} %`]
      : [dec(S / (10 * d)), `${S},${d}`, dec(S / (2 * d)), dec(S / d + 0.1), `${S}${d}`];
    const consigne = pourcent
      ? tirer([" Donne la réponse en pourcentage.", " Écris le résultat en pourcentage.", " Cela fait combien pour cent ?"])
      : tirer([" Donne la réponse en nombre décimal.", " Écris le résultat avec une virgule.", " Réponds par un nombre décimal."]);
    const passage = pourcent
      ? d === 100 ? `${S}/100 = ${S} %` : `${S}/${d} = ${(S * 100) / d}/100 = ${dec(pct)} % (on multiplie les deux termes par ${100 / d})`
      : d === 10 ? `${S}/10 = ${dec(S / 10)} (${enParts(S, 10)})` : `${S}/100 = ${dec(S / 100)} (${enParts(S, 100)})`;
    return {
      text: debut + consigne,
      format: "qcm",
      choices: choix(bonne, leurres),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        "une fraction de dénominateur 10 ou 100 s'écrit directement en décimal ; « pour cent » veut dire « sur 100 ».",
        "on additionne d'abord les fractions, puis on change d'écriture.",
        `${a}/${d} + ${b}/${d} = ${S}/${d}. Puis ${passage}.`,
        `le résultat est ${bonne}.`
      ),
      canvas: d === 100
        ? { kind: "fraction", model: "grid", grid: { rows: 10, cols: 10, shaded: S }, display: { showFraction: false }, size: { width: 320, height: 240 } }
        : deuxBarres([a, d], [b, d]),
    };
  }),

  // =========================
  // FRACTION_PRODUIT_ENTIER — le produit d'un entier et d'une fraction
  // =========================
  {
    kind: "fixed",
    id: "cm2_fraction_produit_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_produit_entier",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 3 × 5/4 = …/4. Quel numérateur manque ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Trois fois cinq quarts, cela fait combien de quarts ?",
    explanation: exp(
      "multiplier une fraction par un entier, c'est l'additionner plusieurs fois avec elle-même.",
      "on multiplie le numérateur par l'entier ; le dénominateur ne bouge pas.",
      "3 × 5/4, c'est 5/4 + 5/4 + 5/4 : cinq quarts plus cinq quarts plus cinq quarts, cela fait quinze quarts. Donc 3 × 5/4 = 15/4. On a trois fois plus de PARTS, mais les parts ont toujours la même taille — d'où un dénominateur inchangé.",
      "3 × 5/4 = 15/4."
    ),
    tags: ["fraction_calcul", "produit", "short"],
  },
  {
    kind: "fixed",
    id: "cm2_fraction_produit_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_produit_entier",
    difficulty: 4,
    theme: "neutral",
    text: "Dans 4 × 2/5, que devient le dénominateur 5 ?",
    format: "qcm",
    choices: [
      "il ne change pas : les parts gardent la même taille, il y en a seulement quatre fois plus",
      "il est multiplié par 4, comme le numérateur",
      "il devient 20, car 4 × 5 = 20",
      "il disparaît, le résultat est un entier",
    ],
    expected: [
      "il ne change pas : les parts gardent la même taille, il y en a seulement quatre fois plus",
    ],
    comparator: "mcq_exact",
    hint: "Quatre fois deux cinquièmes, ce sont toujours des cinquièmes.",
    explanation: exp(
      "le dénominateur dit la taille des parts, le numérateur en dit le nombre.",
      "on écrit la multiplication comme une addition répétée et on regarde ce qui change.",
      "4 × 2/5 = 2/5 + 2/5 + 2/5 + 2/5 = 8/5. On compte des cinquièmes du début à la fin : seul leur NOMBRE est multiplié par 4. Multiplier aussi le dénominateur donnerait 8/20, c'est-à-dire 2/5 — le même nombre qu'au départ, alors qu'on vient de le quadrupler.",
      "le dénominateur reste 5."
    ),
    tags: ["fraction_calcul", "produit", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cm2_fraction_produit_fixed_3",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_produit_entier",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 6 × 1/3. Le résultat est un nombre entier. Lequel ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Six tiers, cela fait combien d'entiers ?",
    explanation: exp(
      "un produit d'entier par une fraction peut retomber sur un entier.",
      "on multiplie le numérateur, puis on regarde combien d'entiers contient le résultat.",
      "6 × 1/3 = 6/3. Or il faut 3 tiers pour faire 1 entier, et 6 = 2 × 3 : donc 6/3 = 2. Six tiers font exactement deux entiers.",
      "6 × 1/3 = 2."
    ),
    tags: ["fraction_calcul", "produit", "short"],
  },
  // ⭐ 25/10/2026 — mêmes identifiants, phrases variées (prénom × situation × tournure).
  gabarit("cm2_fraction_produit_tpl_1", "fraction_produit_entier", 3, "Multiplie le numérateur, laisse le dénominateur tranquille.", () => {
    const d = tirer([3, 4, 5, 6, 8, 10]);
    const a = entre(1, d - 1);
    const k = entre(2, 6);
    const [x, y] = deuxPrenoms();
    const c = Math.random() < 0.7 ? `${k} × ${a}/${d}` : `${a}/${d} × ${k}`;
    return { ...produit(x, y, k, a, d, tournureCalcul(x, y, c)), canvas: barreF(a, d, `${a}/${d}, pris ${k} fois`) };
  }),
  gabarit("cm2_fraction_produit_tpl_3", "fraction_produit_entier", 3, "Multiplie le numérateur par le nombre de fois ; le dénominateur ne change pas.", () => {
    const d = tirer([3, 4, 5, 8, 10]);
    const a = entre(1, d - 1);
    const k = entre(2, 7);
    const [x, y] = deuxPrenoms();
    return { ...produit(x, y, k, a, d, tirer(PRODUITS)(x, k, `${a}/${d}`)), canvas: rectangle(a, d) };
  }),
  gabarit("cm2_fraction_produit_tpl_4", "fraction_produit_entier", 2, "Additionne la fraction autant de fois qu'il le faut : seuls les numérateurs s'ajoutent.", () => {
    const d = tirer([3, 4, 5, 6, 7, 8, 10]);
    const a = entre(1, d - 1);
    const k = entre(2, 4);
    const [x, y] = deuxPrenoms();
    const f = `${a}/${d}`;
    const somme = Array(k).fill(f).join(" + ");
    const textes = [
      `${x.p} écrit ${k} × ${f} sous forme d'addition : ${somme}. Combien cela fait-il ?`,
      `${k} fois ${enParts(a, d)}, c'est ${somme}. Aide ${x.p} : quel est le résultat ?`,
      `${x.p} remplit ${k} fois un verre à ${f} L. ${Il(x)} calcule ${somme}. Quel résultat trouve-t-${il(x)} ?`,
      `${y.p} dit à ${x.p} : « ${k} × ${f}, c'est ${somme}. » Combien cela fait-il ?`,
      `${x.p} avance de ${f} km à chaque étape, pendant ${k} étapes : ${somme}. Combien de kilomètres en tout ?`,
      `Calcule ${somme}, comme ${x.p} : c'est ${k} fois ${f}.`,
    ];
    return { ...produit(x, y, k, a, d, tirer(textes)), canvas: barreF(a, d, `${a}/${d}, pris ${k} fois`) };
  }),
  gabarit("cm2_fraction_produit_tpl_2", "fraction_produit_entier", 4, "Le résultat tombe juste : compte combien d'entiers il contient.", () => {
    const d = tirer([2, 3, 4, 5, 6]);
    const q = entre(1, 3);
    const k = d * q;
    const a = d === 2 ? 1 : entre(1, d - 1);
    const n = k * a;
    const [x, y] = deuxPrenoms();
    const f = `${a}/${d}`;
    const bonne = String(a * q);
    const debut = Math.random() < 0.6 ? tirer(PRODUITS)(x, k, f) : tournureCalcul(x, y, `${k} × ${f}`);
    return {
      text: `${debut} Le résultat est un nombre entier.`,
      format: "qcm",
      // Leurres : oublier le dénominateur, multiplier aussi le dénominateur, se tromper de table.
      choices: choix(bonne, [String(n), `${n}/${k * d}`, String(a * q + 1), String(q), String(a + q), String(Math.max(1, a * q - 1))]),
      expected: [bonne],
      comparator: "mcq_exact",
      canvas: disque(a, d, `${a}/${d}, pris ${k} fois`),
      explanation: exp(
        "il faut " + `${d}/${d}` + " pour faire 1 entier.",
        "on multiplie le numérateur, puis on compte combien d'entiers contient le résultat.",
        `${k} × ${f} = ${n}/${d}. Or ${n} = ${a * q} × ${d}, donc ${n}/${d} = ${a * q}.`,
        `${k} × ${f} = ${bonne}.`
      ),
    };
  }),
  gabarit("cm2_fraction_produit_tpl_5", "fraction_produit_entier", 4, "Calcule, puis simplifie ou écris le nombre décimal.", () => {
    // ⭐ SA demande : simplifier, et passer au décimal.
    const decimal = Math.random() < 0.45;
    let d = 4, a = 1, k = 2;
    for (let essai = 0; essai < 80; essai++) {
      d = decimal ? tirer([2, 4, 10]) : tirer([4, 6, 8, 10, 12]);
      a = d === 2 ? 1 : entre(1, d - 1);
      k = entre(2, 9);
      const n = k * a;
      if (n % d !== 0 && (decimal || pgcd(n, d) > 1)) break;
    }
    const n = k * a;
    const g = pgcd(n, d);
    const [x, y] = deuxPrenoms();
    const f = `${a}/${d}`;
    const debut = Math.random() < 0.6 ? tirer(PRODUITS)(x, k, f) : tournureCalcul(x, y, `${k} × ${f}`);
    const bonne = decimal ? dec(n / d) : simplifiee(n, d);
    const leurres = decimal
      ? [dec(a / d), `${n},${d}`, dec(n / d + 1), dec(n / (10 * d)), dec((n + 1) / d)]
      : [`${n / g}/${d}`, `${n}/${d / g}`, `${n}/${k * d}`, `${(n + 1)}/${d}`, simplifiee(n + d, d)];
    const consigne = decimal
      ? tirer([" Écris le résultat en nombre décimal.", " Donne la réponse avec une virgule."])
      : tirer([" Donne le résultat sous la forme la plus simple.", " Simplifie le résultat autant que possible."]);
    return {
      text: debut + consigne,
      format: "qcm",
      choices: choix(bonne, leurres),
      expected: [bonne],
      comparator: "mcq_exact",
      canvas: rectangle(a, d),
      explanation: exp(
        "multiplier une fraction par un entier, c'est l'additionner plusieurs fois avec elle-même.",
        decimal ? "on multiplie le numérateur, puis on écrit la fraction en dixièmes pour passer au décimal." : "on multiplie le numérateur, puis on divise les deux termes par un même nombre.",
        decimal
          ? `${k} × ${f} = ${n}/${d}${d === 10 ? "" : d === 2 ? ` = ${n * 5}/10` : ` = ${n * 25}/100`} = ${bonne}.`
          : `${k} × ${f} = ${n}/${d}. ${n} et ${d} sont dans la table de ${g} : ${n}/${d} = ${bonne}.`,
        `${k} × ${f} = ${n}/${d} = ${bonne}.`
      ),
    };
  }),

  // =========================
  // FRACTION_QUANTITE — une fraction d'une quantité ou d'une grandeur
  // =========================
  {
    kind: "fixed",
    id: "cm2_fraction_quantite_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font deux tiers de douze œufs ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Partage d'abord les douze œufs en trois parts égales.",
    explanation: exp(
      "prendre une fraction d'une quantité, c'est partager puis prendre.",
      "on partage d'abord en autant de parts que l'indique le dénominateur, puis on en prend autant que l'indique le numérateur.",
      "Je partage 12 œufs en 3 parts égales : comme 12 = 3 × 4, chaque part vaut 4 œufs. Un tiers de douze œufs, c'est donc 4 œufs. Deux tiers, c'est deux fois cela : 2 × 4 = 8 œufs.",
      "deux tiers de douze œufs font 8 œufs."
    ),
    tags: ["fraction_calcul", "quantite", "canvas", "short"],
    canvas: barrePartage("12 œufs", 3, 2, "Deux tiers de 12 œufs ?"),
  },
  {
    kind: "fixed",
    id: "cm2_fraction_quantite_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font deux cinquièmes de 60 kg de sable ? (Réponds en kg.)",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Un cinquième de 60 kg, c'est combien ?",
    explanation: exp(
      "prendre une fraction d'une grandeur, c'est partager puis prendre.",
      "on divise par le dénominateur, puis on multiplie par le numérateur.",
      "60 = 5 × 12, donc un cinquième de 60 kg vaut 12 kg. Deux cinquièmes, c'est deux fois 12 kg, soit 24 kg.",
      "deux cinquièmes de 60 kg font 24 kg."
    ),
    tags: ["fraction_calcul", "quantite", "canvas", "short"],
    canvas: barrePartage("60 kg", 5, 2, "Deux cinquièmes de 60 kg ?"),
  },
  {
    kind: "fixed",
    id: "cm2_fraction_quantite_fixed_3",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 4,
    theme: "neutral",
    text: "Pour calculer trois dixièmes de 500 g de farine, dans quel ordre faut-il s'y prendre ?",
    format: "qcm",
    choices: [
      "on partage d'abord 500 en 10, puis on prend 3 fois le résultat",
      "on multiplie d'abord 500 par 10, puis on divise par 3",
      "on partage d'abord 500 en 3, puis on prend 10 fois le résultat",
      "on additionne 500 et 10, puis on divise par 3",
    ],
    expected: ["on partage d'abord 500 en 10, puis on prend 3 fois le résultat"],
    comparator: "mcq_exact",
    hint: "Le dénominateur dit en combien de parts on partage.",
    explanation: exp(
      "le dénominateur indique le nombre de parts, le numérateur le nombre de parts prises.",
      "on partage d'abord (dénominateur), on prend ensuite (numérateur).",
      "Un dixième de 500 g vaut 500 ÷ 10 = 50 g. Trois dixièmes, c'est 3 × 50 = 150 g. Partager d'abord garde des nombres petits ; l'ordre inverse — multiplier par 3 puis diviser par 10 — donne le même résultat, mais fait manipuler 1 500 avant de retomber sur 150.",
      "on partage en 10, puis on prend 3 parts : 150 g."
    ),
    tags: ["fraction_calcul", "quantite", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "cm2_fraction_quantite_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    hint: "Partage d'abord, prends ensuite.",
    tags: ["fraction_calcul", "quantite", "template"],
    generate: () => {
      const contextes = [
        { quoi: "billes", unite: "" },
        { quoi: "g de farine", unite: " g" },
        { quoi: "kg de sable", unite: " kg" },
        { quoi: "mètres de ruban", unite: " m" },
        { quoi: "élèves", unite: "" },
      ];
      const c = randomChoice(contextes);
      const denominateur = randomChoice([2, 3, 4, 5, 10]);
      const part = randomInt(3, 25);
      const total = denominateur * part;
      const numerateur = randomInt(1, denominateur - 1);
      const resultat = numerateur * part;
      // ⚠️ « 1 tiers de 12 billes » ne se dit pas. Au singulier on écrit la
      // fraction en toutes lettres — c'est aussi ce que le BO fait verbaliser.
      const pluriel: Record<number, string> = {
        2: "demis",
        3: "tiers",
        4: "quarts",
        5: "cinquièmes",
        10: "dixièmes",
      };
      const singulier: Record<number, string> = {
        2: "la moitié",
        3: "un tiers",
        4: "un quart",
        5: "un cinquième",
        10: "un dixième",
      };
      const nom =
        numerateur === 1
          ? singulier[denominateur]
          : `${numerateur} ${pluriel[denominateur]}`;

      return {
        text: `Combien font ${nom} de ${total} ${c.quoi} ?`,
        format: "short",
        expected: [String(resultat)],
        comparator: "number_equal",
        explanation: exp(
          "prendre une fraction d'une quantité, c'est partager puis prendre.",
          "on divise par le dénominateur, puis on multiplie par le numérateur.",
          `Je partage ${total} en ${denominateur} parts égales : ${total} ÷ ${denominateur} = ${part}. Une part vaut donc ${part}${c.unite}. J'en prends ${numerateur} : ${numerateur} × ${part} = ${resultat}${c.unite}.`,
          `${nom} de ${total} ${c.quoi}, cela fait ${resultat}${c.unite}.`
        ),
        canvas: barrePartage(`${total}${c.unite}`, denominateur, numerateur, `${nom} de ${total} ?`),
      };
    },
  },
  {
    kind: "template",
    id: "cm2_fraction_quantite_tpl_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 4,
    theme: "neutral",
    hint: "Le dénominateur dit en combien de parts partager.",
    tags: ["fraction_calcul", "quantite", "piege", "template"],
    generate: () => {
      const denominateur = randomChoice([3, 4, 5]);
      const part = randomInt(4, 20);
      const total = denominateur * part;
      const numerateur = randomInt(2, denominateur - 1);
      const bonne = `${total} ÷ ${denominateur}, puis × ${numerateur}`;
      const [x, y] = deuxPrenoms();
      const h = tirer(QUANTITES);
      const nom = nomFraction(numerateur, denominateur);
      const textes = [
        `Pour calculer ${numerateur}/${denominateur} de ${total}, quelle suite de calculs convient ?`,
        `${h.d(x, y, total, nom)} Quels calculs ${x.p} doit-${il(x)} faire pour trouver la réponse ?`,
        `${x.p} veut calculer ${nom} de ${total}. Dans quel ordre doit-${il(x)} calculer ?`,
        `${y.p} explique à ${x.p} comment trouver ${numerateur}/${denominateur} de ${total}. Quelle méthode est la bonne ?`,
        `${h.d(x, y, total, nom)} Quelle suite de calculs donne la réponse ?`,
      ];
      return {
        text: tirer(textes),
        format: "qcm",
        choices: makeChoices(bonne, [
          `${total} ÷ ${numerateur}, puis × ${denominateur}`,
          `${total} × ${denominateur}, puis ÷ ${numerateur}`,
          `${total} − ${denominateur}, puis × ${numerateur}`,
          `${total} × ${numerateur}, puis × ${denominateur}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: barrePartage(String(total), denominateur, numerateur, `${numerateur}/${denominateur} de ${total} ?`),
        explanation: exp(
          "le dénominateur indique en combien de parts on partage, le numérateur combien on en prend.",
          "on partage d'abord, on prend ensuite.",
          `On partage ${total} en ${denominateur} parts égales : ${total} ÷ ${denominateur} = ${part}. Puis on en prend ${numerateur} : ${numerateur} × ${part} = ${numerateur * part}. Échanger les rôles du numérateur et du dénominateur donnerait un tout autre nombre.`,
          `${numerateur}/${denominateur} de ${total} vaut ${numerateur * part}.`
        ),
      };
    },
  },
  // ⭐ 25/10/2026 — situations × prénoms ; leurres = ses erreurs.
  gabarit("cm2_fraction_quantite_tpl_3", "fraction_quantite", 2, "Partage la quantité en autant de parts égales que le dénominateur.", () => {
    const d = tirer([2, 3, 4, 5, 10]);
    const part = entre(2, d === 10 ? 9 : 15);
    const T = d * part;
    const [x, y] = deuxPrenoms();
    const h = tirer(QUANTITES);
    const nom = nomFraction(1, d);
    const bonne = String(part);
    return {
      text: `${h.d(x, y, T, nom)} ${h.pris(x)}`,
      format: "qcm",
      // Leurres : multiplier au lieu de diviser, soustraire, partager en deux.
      choices: choix(bonne, [String(T * d), String(T - d), String(T - part), String(part + 1), String(T / 2)]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        `${nom}, c'est une part quand on partage en ${d} parts égales.`,
        `on divise par ${d}.`,
        `${T} ÷ ${d} = ${part}, car ${d} × ${part} = ${T}.`,
        `${nom} de ${T}, c'est ${part}.`
      ),
      canvas: barrePartage(String(T), d, 1, `${nom} de ${T} ?`),
    };
  }),
  gabarit("cm2_fraction_quantite_tpl_4", "fraction_quantite", 3, "Partage d'abord (dénominateur), prends ensuite (numérateur).", () => {
    const d = tirer([3, 4, 5, 6, 8, 10]);
    const n = entre(2, d - 1);
    const part = entre(2, d >= 8 ? 9 : 14);
    const T = d * part;
    const res = n * part;
    const [x, y] = deuxPrenoms();
    const h = tirer(QUANTITES);
    const nom = nomFraction(n, d);
    const bonne = String(res);
    const leurres = [String(part), String(T - res), String(res + part), String(T * n), String(res - 1)];
    if (T % n === 0) leurres.push(String((T / n) * d));
    return {
      text: `${h.d(x, y, T, nom)} ${h.pris(x)}`,
      format: "qcm",
      choices: choix(bonne, leurres),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        "prendre une fraction d'une quantité, c'est partager puis prendre.",
        "on divise par le dénominateur, puis on multiplie par le numérateur.",
        `Je partage ${T} en ${d} parts égales : ${T} ÷ ${d} = ${part}. J'en prends ${n} : ${n} × ${part} = ${res}. S'arrêter à ${part} oublie le numérateur.`,
        `${nom} de ${T}, c'est ${res}.`
      ),
      canvas: d <= 8 ? barrePartage(String(T), d, n, `${n}/${d} de ${T} ?`) : undefined,
    };
  }),
  gabarit("cm2_fraction_quantite_tpl_5", "fraction_quantite", 4, "Calcule d'abord la part prise, puis retire-la du total.", () => {
    const d = tirer([3, 4, 5, 6, 8, 10]);
    const n = entre(1, d - 1);
    const part = entre(2, d >= 8 ? 9 : 14);
    const T = d * part;
    const res = n * part;
    const reste = T - res;
    const [x, y] = deuxPrenoms();
    const h = tirer(QUANTITES);
    const nom = nomFraction(n, d);
    const bonne = String(reste);
    return {
      text: `${h.d(x, y, T, nom)} ${h.reste(x)}`,
      format: "qcm",
      // Leurres : la part prise (répondre à une autre question), une seule part, T − n.
      choices: choix(bonne, [String(res), String(part), String(T - n), String(reste + part), String(T - d)]),
      expected: [bonne],
      comparator: "mcq_exact",
      canvas: d <= 8 ? barrePartage(String(T), d, n, "Il reste ?") : undefined,
      explanation: exp(
        "ce qui reste, c'est le total moins la part prise.",
        "on calcule la fraction du total (partager puis prendre), puis on la retire.",
        `${T} ÷ ${d} = ${part} ; ${n} × ${part} = ${res}. Il reste ${T} − ${res} = ${reste}. Autre chemin : il reste ${d - n}/${d} du total, et ${d - n} × ${part} = ${reste}.`,
        `il reste ${reste}.`
      ),
    };
  }),
  gabarit("cm2_fraction_quantite_tpl_6", "fraction_quantite", 4, "50 %, c'est la moitié ; 25 %, le quart ; 10 %, le dixième.", () => {
    // ⭐ SA demande : relier fraction et POURCENTAGE.
    const [p, n, d] = tirer([[50, 1, 2], [25, 1, 4], [75, 3, 4], [10, 1, 10], [20, 1, 5]] as const);
    const part = entre(2, d === 10 ? 9 : 15);
    const T = d * part;
    const res = n * part;
    const [x, y] = deuxPrenoms();
    const h = tirer(QUANTITES);
    const bonne = String(res);
    return {
      text: `${h.d(x, y, T, `${p} %`)} ${h.pris(x)}`,
      format: "qcm",
      // Leurres : prendre le pourcentage pour le résultat, soustraire, partager par p.
      choices: choix(bonne, [String(p), String(T - p), String(T - res), String(res * 2), String(part + 1)]),
      expected: [bonne],
      comparator: "mcq_exact",
      canvas: barrePartage(String(T), d, n, `${p} % de ${T} ?`),
      explanation: exp(
        "« pour cent » veut dire « sur 100 » : " + `${p} % = ${p}/100 = ${n === 1 ? nomFraction(1, d) : "les trois quarts"}.`,
        "on remplace le pourcentage par la fraction, puis on partage et on prend.",
        `${p} % de ${T}, c'est ${n}/${d} de ${T} : ${T} ÷ ${d} = ${part}${n > 1 ? `, puis ${n} × ${part} = ${res}` : ""}.`,
        `${p} % de ${T}, c'est ${res}.`
      ),
    };
  }),
];
