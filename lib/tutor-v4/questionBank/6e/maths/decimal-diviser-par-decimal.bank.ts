// DIVISER PAR UN NOMBRE DÉCIMAL (05/11/2026) : 12,6 ÷ 0,3. Maroc, Suisse, Sénégal, Côte d'Ivoire.
// Masquée en 6e en France : le BO s'arrête au diviseur « entier non nul inférieur à 10 »
// (lib/tutor-v4/knowledge/maths/6e/bo-objectifs.ts, 6e-N-entiers-16).
// La méthode : multiplier dividende et diviseur par 10 ou 100 rend le diviseur entier, le
// quotient ne change pas. ★1-★2 : phrase courte, sans histoire. ★3 : en contexte.
// Pas de calcul_pose : le savoir-faire est de transformer la division, pas de la poser.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { CALC, atelier, entre, etapes, fr, qcm, qcmN, tournure, un } from "../../cm1/maths/trous-outils";

const M = atelier("6e", "decimal_calcul", "decimal_diviser_par_decimal");
const arr = (v: number) => Math.round(v * 100000) / 100000;
const decs = (v: number) => (String(arr(v)).split(".")[1] ?? "").length;
const HINT = "Multiplie les deux nombres par 10 ou 100. Le diviseur devient entier, le résultat ne change pas.";

type Div = { a: number; b: number; q: number; k: number; A: number; B: number };
function div(b: number, q: number): Div {
  const a = arr(b * q);
  const k = 10 ** decs(b);
  return { a, b, q, k, A: arr(a * k), B: arr(b * k) };
}
/** Diviseur à un chiffre après la virgule, dividende décimal, quotient entier : 12,6 ÷ 0,3. */
function dixieme(): Div {
  for (;;) {
    const d = div(entre(2, 9) / 10, entre(11, 89));
    if (decs(d.a) === 1) return d;
  }
}
/** Diviseur à deux chiffres après la virgule : 1,26 ÷ 0,03 ou 4,5 ÷ 0,15. */
function centieme(): Div {
  for (;;) {
    const d = div(un([2, 3, 4, 5, 6, 8, 12, 15, 25, 35, 45, 75]) / 100, entre(4, 60));
    if (decs(d.b) === 2 && d.q % 10 !== 0) return d;
  }
}
/** Dividende entier : 6 ÷ 0,5. */
function dividendeEntier(): Div {
  for (;;) {
    const d = div(un([2, 4, 5, 25, 75, 15]) / (Math.random() < 0.6 ? 10 : 100), entre(3, 60));
    if (decs(d.b) >= 1 && Number.isInteger(d.a) && d.a <= 90) return d;
  }
}
/** Quotient décimal qui tombe juste : 1,8 ÷ 0,4 = 4,5. */
function quotientDecimal(): Div {
  for (;;) {
    const d = div(entre(2, 8) / 10, un([1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 1.2, 2.4, 3.6, 4.2]));
    if (decs(d.a) <= 2 && decs(d.q) === 1) return d;
  }
}
/** Diviseur plus grand que 1 : 7,2 ÷ 2,4. */
function diviseurGrand(): Div {
  for (;;) {
    const d = div(entre(11, 95) / 10, entre(2, 12));
    if (decs(d.b) === 1 && decs(d.a) === 1) return d;
  }
}
const ecr = (d: Div) => `${fr(d.a)} ÷ ${fr(d.b)}`;
const leurres = (d: Div) => [arr(d.q / 10), arr(d.q * 10), arr(d.q / 100), arr(d.q + d.k), arr(d.a * d.b), arr(d.A / d.b)];
const expl = (d: Div) =>
  etapes(`on multiplie les deux nombres par ${fr(d.k)}, pour rendre le diviseur entier. Le résultat ne change pas.`, `${ecr(d)} = ${fr(d.A)} ÷ ${fr(d.B)} = ${fr(d.q)}.`, `${ecr(d)} = ${fr(d.q)}. On vérifie : ${fr(d.q)} × ${fr(d.b)} = ${fr(d.a)}.`);

/* Les consignes se composent : une aide de méthode, puis une demande. */
const AIDES = ["", "Rends d'abord le diviseur entier.", "Le diviseur doit devenir entier.", "Multiplie d'abord les deux nombres.", "Multiplie les deux nombres par 10 ou 100.", "Commence par changer le diviseur."];
/** ★1 (12 mots au plus) : des aides de 5 mots ; le diviseur a un seul chiffre après la virgule, donc « par 10 ». */
const AIDES_COURTES = ["", "Rends d'abord le diviseur entier.", "Le diviseur doit devenir entier.", "Multiplie d'abord les deux nombres.", "Multiplie les deux par 10.", "Commence par changer le diviseur."];

function facteur() {
  const d = un<() => Div>([dixieme, centieme, dividendeEntier])();
  return {
    // 07/11/2026 : ★1 = 12 mots au plus. « Le plus petit » est dans chaque
    // phrase (100 rend aussi 0,3 entier : sans lui, deux réponses justes).
    text: un([
      `Pour calculer ${ecr(d)}, par quel nombre multiplier ? Le plus petit possible.`,
      `${ecr(d)} : par combien multiplier, au minimum, pour un diviseur entier ?`,
      `Quel est le plus petit nombre qui rend ${fr(d.b)} entier ?`,
      `Dans ${ecr(d)}, comment rendre le diviseur entier ? Choisis le plus petit.`,
      `Pour un diviseur entier dans ${ecr(d)}, par combien multiplier au moins ?`,
      `Quel nombre rend ${fr(d.b)} entier ? Prends le plus petit.`,
      `${ecr(d)} : quel multiplicateur choisir pour le diviseur ? Le plus petit.`,
      `Tu veux calculer ${ecr(d)}. Tu multiplies par combien, au minimum ?`,
      `${ecr(d)} : le diviseur doit devenir entier. Par combien, au moins ?`,
      `Pour enlever la virgule de ${fr(d.b)}, on multiplie par combien, au minimum ?`,
    ]),
    ...qcm(fr(d.k), ["10", "100", "1 000"]),
    explanation: etapes(`on compte les chiffres après la virgule du diviseur.`, `${fr(d.b)} a ${decs(d.b)} chiffre${decs(d.b) > 1 ? "s" : ""} après la virgule : ${fr(d.b)} × ${fr(d.k)} = ${fr(d.B)}.`, `On multiplie les deux nombres par ${fr(d.k)}.`),
  };
}

function divisionEgale() {
  const d = un<() => Div>([dixieme, centieme])();
  const juste = `${fr(d.A)} ÷ ${fr(d.B)}`;
  return {
    text: un([
      `Quelle division donne le même résultat que ${ecr(d)} ?`,
      `${ecr(d)} est égal à quelle division ?`,
      `Quelle division a le même quotient que ${ecr(d)} ?`,
      `Quel calcul remplace ${ecr(d)} ?`,
      `Quelle division sans virgule au diviseur est égale à ${ecr(d)} ?`,
      `Trouve la division égale à ${ecr(d)}.`,
      `Choisis la division qui vaut ${ecr(d)}.`,
      `${ecr(d)} : quelle division plus simple donne le même résultat ?`,
      `Par quelle division remplacer ${ecr(d)} ?`,
      `Rends le diviseur entier. Que devient ${ecr(d)} ?`,
    ]),
    ...qcm(juste, [`${fr(d.a)} ÷ ${fr(d.B)}`, `${fr(d.A)} ÷ ${fr(d.b)}`, `${fr(arr(d.a / d.k))} ÷ ${fr(d.B)}`, `${fr(arr(d.A * 10))} ÷ ${fr(d.B)}`]),
    explanation: etapes(`on multiplie les DEUX nombres par ${fr(d.k)}.`, `${fr(d.a)} × ${fr(d.k)} = ${fr(d.A)} et ${fr(d.b)} × ${fr(d.k)} = ${fr(d.B)}.`, `${ecr(d)} = ${juste}.`),
  };
}

function trou() {
  const d = un<() => Div>([dixieme, centieme])();
  const [text, juste, faux] = un<[string, number, number[]]>([
    [`Complète : ${ecr(d)} = … ÷ ${fr(d.B)}`, d.A, [d.a, arr(d.A * 10), arr(d.a / 10)]],
    [`${ecr(d)} = … ÷ ${fr(d.B)}. Que mettre à la place des points ?`, d.A, [d.a, arr(d.A * 10), arr(d.a / 10)]],
    [`Trouve le nombre manquant : ${ecr(d)} = … ÷ ${fr(d.B)}`, d.A, [d.a, arr(d.A * 10), arr(d.a / 10)]],
    [`Quel dividende manque ?\n\n${ecr(d)} = … ÷ ${fr(d.B)}`, d.A, [d.a, arr(d.A * 10), arr(d.a / 10)]],
    [`Complète : ${ecr(d)} = ${fr(d.A)} ÷ …`, d.B, [d.b, arr(d.B * 10), arr(d.b / 10)]],
    [`${ecr(d)} = ${fr(d.A)} ÷ …. Que mettre à la place des points ?`, d.B, [d.b, arr(d.B * 10), arr(d.b / 10)]],
    [`Trouve le nombre manquant : ${ecr(d)} = ${fr(d.A)} ÷ …`, d.B, [d.b, arr(d.B * 10), arr(d.b / 10)]],
    [`Quel diviseur manque ?\n\n${ecr(d)} = ${fr(d.A)} ÷ …`, d.B, [d.b, arr(d.B * 10), arr(d.b / 10)]],
  ]);
  return { text, ...qcmN(juste, faux), explanation: expl(d) };
}

const calcul = (tirer: () => Div, aides = AIDES) => () => {
  const d = tirer();
  return { text: tournure(aides, CALC(ecr(d))), ...qcmN(d.q, leurres(d)), explanation: expl(d) };
};

function verifier() {
  const d = un<() => Div>([dixieme, centieme, dividendeEntier, diviseurGrand])();
  const juste = `${fr(d.q)} × ${fr(d.b)}`;
  return {
    text: un([
      `${ecr(d)} = ${fr(d.q)}. Quel calcul le vérifie ?`,
      `Quel produit vérifie ${ecr(d)} = ${fr(d.q)} ?`,
      `On trouve ${ecr(d)} = ${fr(d.q)}. Comment vérifier ?`,
      `Pour vérifier ${ecr(d)} = ${fr(d.q)}, quel calcul faire ?`,
      `Vérifie ${ecr(d)} = ${fr(d.q)}. Quelle multiplication choisir ?`,
      `Quelle multiplication confirme ${ecr(d)} = ${fr(d.q)} ?`,
      `${ecr(d)} = ${fr(d.q)} : quel produit doit redonner ${fr(d.a)} ?`,
      `Quel produit doit valoir ${fr(d.a)} si ${ecr(d)} = ${fr(d.q)} ?`,
    ]),
    ...qcm(juste, [`${fr(d.q)} × ${fr(d.B)}`, `${fr(d.q)} × ${fr(d.a)}`, `${fr(d.a)} × ${fr(d.b)}`, `${fr(d.q)} × ${fr(arr(d.b * 10))}`]),
    explanation: etapes(`le quotient multiplié par le diviseur redonne le dividende.`, `${fr(d.q)} × ${fr(d.b)} = ${fr(d.a)}.`, `Le calcul est : ${juste}.`),
  };
}

function plusGrand() {
  const d = un<() => Div>([dixieme, centieme, dividendeEntier, diviseurGrand])();
  const juste = d.b < 1 ? "plus grand" : "plus petit";
  return {
    text: un([
      `Sans calculer : ${ecr(d)} est-il plus grand ou plus petit que ${fr(d.a)} ?`,
      `Sans poser : ${ecr(d)} est-il plus grand ou plus petit que ${fr(d.a)} ?`,
      `Sans calculer, compare à ${fr(d.a)} le résultat de ${ecr(d)}.`,
      `Le résultat de ${ecr(d)} est-il plus grand ou plus petit que ${fr(d.a)} ?`,
      `On divise ${fr(d.a)} par ${fr(d.b)}. Le résultat est-il plus grand ou plus petit que ${fr(d.a)} ?`,
      `Regarde le diviseur. ${ecr(d)} est-il plus grand ou plus petit que ${fr(d.a)} ?`,
    ]),
    ...qcm(juste, ["plus grand", "plus petit", "égal"]),
    explanation: etapes(`on regarde le diviseur.`, d.b < 1 ? `${fr(d.b)} est plus petit que 1 : il y a plus d'une fois ${fr(d.b)} dans 1, donc le résultat est plus grand.` : `${fr(d.b)} est plus grand que 1 : le résultat est plus petit.`, `${ecr(d)} = ${fr(d.q)}.`),
  };
}

/* ★3 : les situations. Le premier nombre est le total, le second la part. */
type Sit = { t: (a: string, b: string) => string; u: string; quoi: string[]; b: number[] };
const PART: Sit[] = [
  { t: (a, b) => `Une couturière a ${a} m de tissu. Elle coupe des morceaux de ${b} m.`, u: "morceaux", quoi: ["Combien de morceaux ?", "Combien de morceaux obtient-elle ?"], b: [0.3, 0.4, 0.6, 0.2] },
  { t: (a, b) => `Un apiculteur récolte ${a} kg de miel. Il remplit des pots de ${b} kg.`, u: "pots", quoi: ["Combien de pots ?", "Combien de pots remplit-il ?"], b: [0.25, 0.5, 0.75] },
  { t: (a, b) => `Une cuisinière a ${a} kg de riz. Elle fait des sachets de ${b} kg.`, u: "sachets", quoi: ["Combien de sachets ?", "Combien de sachets prépare-t-elle ?"], b: [0.4, 0.5, 0.8] },
  { t: (a, b) => `Une coureuse parcourt ${a} km. Un tour de piste fait ${b} km.`, u: "tours", quoi: ["Combien de tours ?", "Combien de tours fait-elle ?"], b: [0.4, 0.5, 0.6] },
  { t: (a, b) => `Un menuisier a une planche de ${a} m. Il coupe des lattes de ${b} m.`, u: "lattes", quoi: ["Combien de lattes ?", "Combien de lattes coupe-t-il ?"], b: [0.3, 0.4, 0.6] },
  { t: (a, b) => `Une jardinière a ${a} kg de graines. Elle en met ${b} kg par sillon.`, u: "sillons", quoi: ["Combien de sillons ?", "Combien de sillons sème-t-elle ?"], b: [0.2, 0.3, 0.4] },
  { t: (a, b) => `Un peintre a ${a} L de peinture. Chaque mur en prend ${b} L.`, u: "murs", quoi: ["Combien de murs ?", "Combien de murs peint-il ?"], b: [0.8, 1.5, 1.2] },
  { t: (a, b) => `Une infirmière a ${a} L de sirop. Une dose fait ${b} L.`, u: "doses", quoi: ["Combien de doses ?", "Combien de doses prépare-t-elle ?"], b: [0.02, 0.05, 0.04] },
  { t: (a, b) => `Une électricienne a ${a} m de câble. Chaque prise en demande ${b} m.`, u: "prises", quoi: ["Combien de prises ?", "Combien de prises branche-t-elle ?"], b: [0.6, 0.9, 1.2] },
  { t: (a, b) => `Un fermier a ${a} L de lait. Il remplit des bouteilles de ${b} L.`, u: "bouteilles", quoi: ["Combien de bouteilles ?", "Combien de bouteilles remplit-il ?"], b: [0.5, 0.75, 1.5] },
  { t: (a, b) => `Une nageuse parcourt ${a} km. Une longueur fait ${b} km.`, u: "longueurs", quoi: ["Combien de longueurs ?", "Combien de longueurs nage-t-elle ?"], b: [0.05] },
  { t: (a, b) => `Une alpiniste a ${a} m de corde. Elle coupe des bouts de ${b} m.`, u: "bouts", quoi: ["Combien de bouts ?", "Combien de bouts obtient-elle ?"], b: [1.5, 2.5, 0.5] },
  { t: (a, b) => `Une boulangère a ${a} kg de farine. Une fournée en prend ${b} kg.`, u: "fournées", quoi: ["Combien de fournées ?", "Combien de fournées fait-elle ?"], b: [1.5, 2.5, 0.5] },
  { t: (a, b) => `Une chimiste a ${a} L de liquide. Elle remplit des tubes de ${b} L.`, u: "tubes", quoi: ["Combien de tubes ?", "Combien de tubes remplit-elle ?"], b: [0.02, 0.05] },
];
const VITESSE: Sit[] = [
  { t: (a, b) => `Un escargot avance de ${b} m par minute. Il doit faire ${a} m.`, u: "minutes", quoi: ["Combien de minutes ?", "Il lui faut combien de minutes ?"], b: [0.3, 0.2, 0.4] },
  { t: (a, b) => `Une tortue fait ${b} km par heure. Elle parcourt ${a} km.`, u: "heures", quoi: ["Combien d'heures ?", "Il lui faut combien d'heures ?"], b: [0.2, 0.3, 0.5] },
  { t: (a, b) => `Un robinet perd ${b} L par heure. Il a perdu ${a} L.`, u: "heures", quoi: ["Depuis combien d'heures ?", "Il coule depuis combien d'heures ?"], b: [0.2, 0.4, 0.5] },
  { t: (a, b) => `Un robot trace ${b} m de ligne par seconde. La ligne fait ${a} m.`, u: "secondes", quoi: ["Combien de secondes ?", "Il lui faut combien de secondes ?"], b: [0.3, 0.6, 0.8] },
  { t: (a, b) => `Une pompe donne ${b} L d'eau par seconde. On veut ${a} L.`, u: "secondes", quoi: ["Combien de secondes ?", "Il faut combien de secondes ?"], b: [0.4, 0.5, 0.6] },
  { t: (a, b) => `Une plante grandit de ${b} cm par jour. Elle a pris ${a} cm.`, u: "jours", quoi: ["Combien de jours ?", "Cela a pris combien de jours ?"], b: [0.2, 0.3, 0.5] },
  { t: (a, b) => `Un glacier recule de ${b} km par an. Il a reculé de ${a} km.`, u: "ans", quoi: ["En combien d'ans ?", "Cela a pris combien d'ans ?"], b: [0.02, 0.05, 0.04] },
  { t: (a, b) => `Une imprimante pose ${b} mm de plastique par seconde. La pièce fait ${a} mm.`, u: "secondes", quoi: ["Combien de secondes ?", "Il lui faut combien de secondes ?"], b: [0.2, 0.4, 0.5] },
  { t: (a, b) => `Une fusée de jeu monte de ${b} m par seconde. Elle atteint ${a} m.`, u: "secondes", quoi: ["Combien de secondes ?", "Il lui faut combien de secondes ?"], b: [1.5, 2.5, 0.5] },
  { t: (a, b) => `Une ouvrière pose ${b} m de carrelage par minute. Il y a ${a} m à poser.`, u: "minutes", quoi: ["Combien de minutes ?", "Il lui faut combien de minutes ?"], b: [0.4, 0.5, 0.6] },
];
function tirerSit(s: Sit): Div {
  for (;;) {
    const d = div(un(s.b), entre(6, 48));
    if (!Number.isInteger(d.a) || Math.random() < 0.3) return d;
  }
}
function situation(liste: Sit[]) {
  const s = un(liste);
  const d = tirerSit(s);
  return {
    text: `${s.t(fr(d.a), fr(d.b))} ${un(s.quoi)}`,
    // Un nombre de pots est entier : les leurres aussi, sinon on les élimine sans calculer.
    ...qcmN(d.q, [d.q * 10, d.q + 10, d.q + 1, d.q - 1, ...(Number.isInteger(d.A) ? [d.A] : [])], s.u),
    explanation: etapes(`on cherche combien de fois ${fr(d.b)} il y a dans ${fr(d.a)} : c'est une division. On multiplie les deux nombres par ${fr(d.k)}.`, `${ecr(d)} = ${fr(d.A)} ÷ ${fr(d.B)} = ${fr(d.q)}.`, `${fr(d.q)} ${s.u}.`),
  };
}
function quelCalcul() {
  const s = un([...PART, ...VITESSE]);
  const d = tirerSit(s);
  const juste = ecr(d);
  return {
    text: `${s.t(fr(d.a), fr(d.b))} ${un(["Quel calcul donne la réponse ?", "Quel calcul faut-il faire ?", "Quelle opération choisir ?", `Quel calcul donne le nombre de ${s.u} ?`])}`,
    ...qcm(juste, [`${fr(d.a)} × ${fr(d.b)}`, `${fr(d.b)} ÷ ${fr(d.a)}`, `${fr(d.a)} − ${fr(d.b)}`, `${fr(d.a)} + ${fr(d.b)}`]),
    explanation: etapes(`on cherche combien de fois ${fr(d.b)} il y a dans ${fr(d.a)}.`, `${juste} = ${fr(d.q)}.`, `Le calcul est : ${juste}.`),
  };
}
/* « Combien de fois plus » : là, le quotient peut être décimal. */
const COMPARE: ((a: string, b: string) => string)[] = [
  (a, b) => `Une barre fait ${a} m. Une baguette fait ${b} m. La barre est combien de fois plus longue que la baguette ?`,
  (a, b) => `Un sac pèse ${a} kg. Une boîte pèse ${b} kg. Le sac est combien de fois plus lourd que la boîte ?`,
  (a, b) => `Une bouteille contient ${a} L. Un verre contient ${b} L. La bouteille contient combien de fois plus que le verre ?`,
  (a, b) => `Une pastèque pèse ${a} kg. Une mangue pèse ${b} kg. La pastèque est combien de fois plus lourde que la mangue ?`,
  (a, b) => `Un seau contient ${a} L. Une tasse contient ${b} L. Le seau contient combien de fois plus que la tasse ?`,
  (a, b) => `Un arbre a grandi de ${a} m. Une tige a grandi de ${b} m. L’arbre a grandi combien de fois plus que la tige ?`,
  (a, b) => `La ville A reçoit ${a} m de pluie. La ville B en reçoit ${b} m. Combien de fois plus de pluie pour la ville A ?`,
  (a, b) => `Un cheval parcourt ${a} km. Un chien parcourt ${b} km. Le cheval va combien de fois plus loin que le chien ?`,
];
function combienDeFois() {
  const d = quotientDecimal();
  return {
    text: un(COMPARE)(fr(d.a), fr(d.b)),
    ...qcmN(d.q, leurres(d), "", 0.5),
    explanation: expl(d),
  };
}

export const decimalDiviserParDecimalBank: TutorBankItemV4[] = [
  M(1, 1, HINT, facteur),
  M(2, 1, HINT, divisionEgale),
  M(3, 1, HINT, trou),
  M(4, 1, HINT, calcul(dixieme, AIDES_COURTES)),
  M(5, 2, HINT, calcul(() => un<() => Div>([centieme, diviseurGrand])())),
  M(6, 2, HINT, calcul(() => un<() => Div>([dividendeEntier, quotientDecimal])())),
  M(7, 2, "Le quotient multiplié par le diviseur redonne le dividende.", verifier),
  M(8, 2, "Regarde si le diviseur est plus petit ou plus grand que 1.", plusGrand),
  M(9, 3, "Combien de fois la part dans le total ? Rends le diviseur entier.", () => situation(PART)),
  M(10, 3, "Combien de fois la part dans le total ? Rends le diviseur entier.", () => situation(VITESSE)),
  M(11, 3, "On cherche combien de fois la part entre dans le total.", quelCalcul),
  M(12, 3, HINT, combienDeFois),
];
