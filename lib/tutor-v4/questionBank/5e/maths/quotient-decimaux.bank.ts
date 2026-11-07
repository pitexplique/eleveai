// LE QUOTIENT DE DEUX DÉCIMAUX, EN 5e (06/11/2026). Visible en France.
//
// Pourquoi ici : le cycle 4 cite le « quotient de nombres décimaux »
// (docs/bo-maths-cycle4-recopie.md, p. 131), le BO de 6e s'arrête au diviseur entier inférieur
// à 10. Mesuré sur 270 000 tirages de 5e à 3e : aucun énoncé ne demandait cette division, elle
// n'apparaissait qu'au détour de corrigés (Thalès, vitesses, coefficient), sans sa méthode.
//
// La méthode : multiplier les deux nombres par 10 ou 100 rend le diviseur entier, le quotient
// ne change pas. ★1-★2 : le geste nu, phrases courtes. ★3 : en contexte, grandeurs quotients
// comprises (prix au kilo, vitesse, débit). Le BO demande aussi de vérifier la vraisemblance
// d'un résultat par son ordre de grandeur : d'où le gabarit 9.
// Les calculs se tapent au clavier : un QCM donnerait la réponse sans le geste.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { atelier, entre, etapes, fr, qcm, qcmN, tournure, un } from "../../cm1/maths/trous-outils";

const M = atelier("5e", "decimal_quotient", "quotient_decimaux");
const arr = (v: number) => Math.round(v * 100000) / 100000;
const decs = (v: number) => (String(arr(v)).split(".")[1] ?? "").length;
const HINT = "Multiplie les deux nombres par 10 ou 100. Le diviseur devient entier, le résultat ne change pas.";
const NBSP = " ";

type Div = { a: number; b: number; q: number; k: number; A: number; B: number };
function div(b: number, q: number): Div {
  const a = arr(b * q);
  const k = 10 ** decs(b);
  return { a, b, q, k, A: arr(a * k), B: arr(b * k) };
}
/** Diviseur à un chiffre après la virgule, plus petit que 1 : 12,6 ÷ 0,3. */
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
/* Insécables : une division ne se coupe pas en fin de ligne, à 375 px. */
const ecr = (d: Div) => `${fr(d.a)}${NBSP}÷${NBSP}${fr(d.b)}`;
const paire = (a: number, b: number) => `${fr(a)}${NBSP}÷${NBSP}${fr(b)}`;
const expl = (d: Div) =>
  etapes(`on multiplie les deux nombres par ${fr(d.k)}, pour rendre le diviseur entier. Le résultat ne change pas.`, `${ecr(d)} = ${paire(d.A, d.B)} = ${fr(d.q)}.`, `${ecr(d)} = ${fr(d.q)}. On vérifie : ${fr(d.q)} × ${fr(d.b)} = ${fr(d.a)}.`);
const court = (x: number) => ({ format: "short" as const, expected: [fr(x)], comparator: "number_equal" as const });

/* ───── ★1 : le geste ───── */
function facteur() {
  const d = un<() => Div>([dixieme, centieme, dividendeEntier])();
  return {
    // « Le plus petit » : 100 rend aussi 0,3 entier, la question doit n'avoir qu'une réponse.
    text: tournure([
      `Par combien multiplier ${fr(d.b)} pour qu'il devienne entier ?`,
      `Quel nombre rend ${fr(d.b)} entier ?`,
      `Enlever la virgule de ${fr(d.b)} : multiplier par combien ?`,
      `Quel multiplicateur rend ${fr(d.b)} entier ?`,
      `${fr(d.b)} doit devenir entier. Par combien le multiplier ?`,
      `Rendre ${fr(d.b)} entier : multiplier par quel nombre ?`,
      `Quel multiplicateur enlève la virgule de ${fr(d.b)} ?`,
      `${ecr(d)} : par combien multiplier les deux nombres ?`,
      `Dans ${ecr(d)}, comment rendre le diviseur entier ?`,
      `${ecr(d)} : quel multiplicateur choisir ?`,
      `Tu calcules ${ecr(d)}. Tu multiplies par combien ?`,
      `Par quel nombre multiplier le diviseur de ${ecr(d)} ?`,
      `On transforme ${ecr(d)}. Multiplier par quel nombre ?`,
    ], ["Prends le plus petit.", "Le plus petit possible.", "Choisis le plus petit."]),
    ...qcm(fr(d.k), ["10", "100", "1 000"]),
    explanation: etapes(`on compte les chiffres après la virgule du diviseur.`, `${fr(d.b)} a ${decs(d.b)} chiffre${decs(d.b) > 1 ? "s" : ""} après la virgule : ${fr(d.b)} × ${fr(d.k)} = ${fr(d.B)}.`, `On multiplie les deux nombres par ${fr(d.k)}.`),
  };
}

function divisionEgale() {
  const d = un<() => Div>([dixieme, centieme])();
  const juste = paire(d.A, d.B);
  return {
    text: un([
      `Quelle division donne le même résultat que ${ecr(d)} ?`,
      `${ecr(d)} est égal à quelle division ?`,
      `Quelle division a le même quotient que ${ecr(d)} ?`,
      `Quel calcul remplace ${ecr(d)} ?`,
      `Quelle division à diviseur entier vaut ${ecr(d)} ?`,
      `Trouve la division égale à ${ecr(d)}.`,
      `Choisis la division qui vaut ${ecr(d)}.`,
      `${ecr(d)} : quelle division plus simple donne le même résultat ?`,
      `Par quelle division remplacer ${ecr(d)} ?`,
      `Rends le diviseur entier. Que devient ${ecr(d)} ?`,
      `Quelle division sans virgule au diviseur vaut ${ecr(d)} ?`,
      `Écris ${ecr(d)} avec un diviseur entier.`,
      `Laquelle de ces divisions est égale à ${ecr(d)} ?`,
      `Quelle écriture de ${ecr(d)} a un diviseur entier ?`,
      `Transforme ${ecr(d)} : quelle division obtiens-tu ?`,
      `${ecr(d)} devient quelle division ?`,
    ]),
    ...qcm(juste, [paire(d.a, d.B), paire(d.A, d.b), paire(arr(d.a / d.k), d.B), paire(arr(d.A * 10), d.B)]),
    explanation: etapes(`on multiplie les DEUX nombres par ${fr(d.k)}.`, `${fr(d.a)} × ${fr(d.k)} = ${fr(d.A)} et ${fr(d.b)} × ${fr(d.k)} = ${fr(d.B)}.`, `${ecr(d)} = ${juste}.`),
  };
}

function trou() {
  const d = un<() => Div>([dixieme, centieme])();
  const egalite = (x: string, y: string) => `${ecr(d)} = ${x}${NBSP}÷${NBSP}${y}`;
  const surA = egalite("…", fr(d.B));
  const surB = egalite(fr(d.A), "…");
  const formes = (e: string, nom: string) => [`Complète : ${e}`, `${e}. Que mettre à la place des points ?`, `Trouve le nombre manquant : ${e}`, `Quel ${nom} manque ?\n\n${e}`, `Écris le nombre caché : ${e}`, `${e}. Quel nombre manque ?`, `Remplace les points : ${e}`, `Le ${nom} manque : ${e}`];
  const [text, juste] = Math.random() < 0.5 ? [un(formes(surA, "dividende")), d.A] : [un(formes(surB, "diviseur")), d.B];
  return { text, ...court(juste), explanation: expl(d) };
}

const FORMES_CALCUL = (x: string) => [
  `Calcule ${x}.`, `Effectue ${x}.`, `Trouve ${x}.`, `Quel est le résultat de ${x} ?`, `Combien fait ${x} ?`, `Que vaut ${x} ?`, `Donne le résultat de ${x}.`, `${x} = ?`, `Cherche ${x}.`, `Complète : ${x} = …`, `Que donne ${x} ?`, `Le résultat de ${x} est ?`, `Écris le résultat de ${x}.`, `Quel nombre vaut ${x} ?`,
];
const AIDES = ["", "", "Rends d'abord le diviseur entier.", "Le diviseur doit devenir entier.", "Multiplie d'abord les deux nombres.", "Commence par changer le diviseur."];
const calcul = (tirer: () => Div) => () => {
  const d = tirer();
  return { text: tournure(AIDES, FORMES_CALCUL(ecr(d))), ...court(d.q), explanation: expl(d) };
};

/* ───── ★2 : contrôler ───── */
function verifier() {
  const d = un<() => Div>([dixieme, centieme, dividendeEntier, diviseurGrand])();
  const juste = `${fr(d.q)} × ${fr(d.b)}`;
  const e = `${ecr(d)} = ${fr(d.q)}`;
  return {
    text: un([
      `${e}. Quel calcul le vérifie ?`,
      `Quel produit vérifie ${e} ?`,
      `On trouve ${e}. Comment vérifier ?`,
      `Pour vérifier ${e}, quel calcul faire ?`,
      `Vérifie ${e}. Quelle multiplication choisir ?`,
      `Quelle multiplication confirme ${e} ?`,
      `${e} : quel produit doit redonner ${fr(d.a)} ?`,
      `Quel produit doit valoir ${fr(d.a)} si ${e} ?`,
      `On écrit ${e}. Quel calcul le contrôle ?`,
      `${e}. Quelle multiplication contrôle ce résultat ?`,
      `Quel calcul prouve que ${e} ?`,
      `Contrôle ${e} : quel produit faire ?`,
      `Quelle multiplication redonne ${fr(d.a)} si ${e} ?`,
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
      `Regarde le diviseur de ${ecr(d)}. Résultat plus grand ou plus petit que ${fr(d.a)} ?`,
      `${ecr(d)} : plus grand ou plus petit que ${fr(d.a)} ?`,
      `Par rapport à ${fr(d.a)}, comment est ${ecr(d)} ?`,
      `Sans poser, situe ${ecr(d)} par rapport à ${fr(d.a)}.`,
      `Sans calculer : le résultat de ${ecr(d)} est plus grand ou plus petit que ${fr(d.a)} ?`,
    ]),
    ...qcm(juste, ["plus grand", "plus petit", "égal"]),
    explanation: etapes(`on regarde le diviseur.`, d.b < 1 ? `${fr(d.b)} est plus petit que 1 : il y a plus d'une fois ${fr(d.b)} dans 1, donc le résultat est plus grand.` : `${fr(d.b)} est plus grand que 1 : le résultat est plus petit.`, `${ecr(d)} = ${fr(d.q)}.`),
  };
}

/* Vraisemblance : l'erreur classique est la virgule mal placée, donc un facteur 10 ou 100. */
function vraisemblance() {
  const d = un<() => Div>([dixieme, centieme, diviseurGrand])();
  return {
    text: un([
      `Sans poser : quel résultat est plausible pour ${ecr(d)} ?`,
      `Quel résultat a le bon ordre de grandeur pour ${ecr(d)} ?`,
      `Estime ${ecr(d)}. Quel résultat est possible ?`,
      `Un seul résultat est vraisemblable pour ${ecr(d)}. Lequel ?`,
      `Sans calcul exact, que vaut ${ecr(d)} ?`,
      `Quelle valeur convient à ${ecr(d)} ? Estime sans poser.`,
      `${ecr(d)} : quelle réponse est raisonnable ?`,
      `Par estimation, quelle est la valeur de ${ecr(d)} ?`,
      `Élimine les résultats impossibles : que vaut ${ecr(d)} ?`,
      `Attention à la virgule. Quel résultat pour ${ecr(d)} ?`,
    ]),
    ...qcmN(d.q, [arr(d.q / 10), arr(d.q * 10), arr(d.q * 100), arr(d.q / 100)]),
    explanation: etapes(`on arrondit les deux nombres pour estimer, ou on vérifie avec le produit.`, `${fr(d.q)} × ${fr(d.b)} = ${fr(d.a)} : c'est bien le dividende.`, `${ecr(d)} = ${fr(d.q)}. Les autres résultats ont une virgule mal placée.`),
  };
}

/* ───── ★3 : les situations ─────
   Le texte donne toujours deux nombres. PARTS : le total, puis la part.
   RYTHMES : la part (« par heure »), puis le total. */
type Sit = { t: (a: string, b: string) => string; u: string; quoi: string[]; b: number[] };
const PARTS: Sit[] = [
  { t: (a, b) => `Une couturière a ${a} m de lin. Elle coupe des bandes de ${b} m.`, u: "bandes", quoi: ["Combien de bandes ?", "Combien de bandes obtient-elle ?"], b: [0.3, 0.4, 0.6] },
  { t: (a, b) => `Un apiculteur récolte ${a} kg de miel. Il remplit des pots de ${b} kg.`, u: "pots", quoi: ["Combien de pots ?", "Combien de pots remplit-il ?"], b: [0.25, 0.5, 0.75] },
  { t: (a, b) => `Une pharmacienne a ${a} L de sirop. Un flacon contient ${b} L.`, u: "flacons", quoi: ["Combien de flacons ?", "Combien de flacons prépare-t-elle ?"], b: [0.04, 0.05, 0.15] },
  { t: (a, b) => `Une cycliste parcourt ${a} km sur une piste. Un tour fait ${b} km.`, u: "tours", quoi: ["Combien de tours ?", "Combien de tours fait-elle ?"], b: [0.4, 0.5, 0.6] },
  { t: (a, b) => `Un menuisier a ${a} m de chêne. Il coupe des lattes de ${b} m.`, u: "lattes", quoi: ["Combien de lattes ?", "Combien de lattes coupe-t-il ?"], b: [0.3, 0.4, 0.6] },
  { t: (a, b) => `Une maraîchère a ${a} kg de graines. Elle en sème ${b} kg sur chaque rang.`, u: "rangs", quoi: ["Combien de rangs ?", "Combien de rangs sème-t-elle ?"], b: [0.2, 0.3, 0.4] },
  { t: (a, b) => `Un peintre a ${a} L de peinture. Chaque mur en prend ${b} L.`, u: "murs", quoi: ["Combien de murs ?", "Combien de murs peint-il ?"], b: [0.8, 1.5, 1.2] },
  { t: (a, b) => `Une électricienne a ${a} m de câble. Chaque prise en demande ${b} m.`, u: "prises", quoi: ["Combien de prises ?", "Combien de prises branche-t-elle ?"], b: [0.6, 0.9, 1.2] },
  { t: (a, b) => `Une fromagère a ${a} kg de tomme. Elle fait des parts de ${b} kg.`, u: "parts", quoi: ["Combien de parts ?", "Combien de parts fait-elle ?"], b: [0.2, 0.25, 0.4] },
  { t: (a, b) => `Une alpiniste a ${a} m de corde. Elle coupe des bouts de ${b} m.`, u: "bouts", quoi: ["Combien de bouts ?", "Combien de bouts obtient-elle ?"], b: [1.5, 2.5, 0.5] },
  { t: (a, b) => `Une boulangère a ${a} kg de farine. Une fournée en prend ${b} kg.`, u: "fournées", quoi: ["Combien de fournées ?", "Combien de fournées fait-elle ?"], b: [1.5, 2.5, 0.5] },
  { t: (a, b) => `Une chimiste a ${a} L de solution. Elle remplit des tubes de ${b} L.`, u: "tubes", quoi: ["Combien de tubes ?", "Combien de tubes remplit-elle ?"], b: [0.02, 0.05] },
  { t: (a, b) => `Un vigneron a ${a} L de jus de raisin. Il remplit des bouteilles de ${b} L.`, u: "bouteilles", quoi: ["Combien de bouteilles ?", "Combien de bouteilles remplit-il ?"], b: [0.25, 0.75, 1.5] },
  { t: (a, b) => `Une technicienne a ${a} m de fibre optique. Chaque logement en demande ${b} m.`, u: "logements", quoi: ["Combien de logements ?", "Combien de logements relie-t-elle ?"], b: [1.5, 2.5, 3.5] },
  { t: (a, b) => `Un pâtissier a ${a} kg de chocolat. Un gâteau en demande ${b} kg.`, u: "gâteaux", quoi: ["Combien de gâteaux ?", "Combien de gâteaux prépare-t-il ?"], b: [0.15, 0.25, 0.35] },
  { t: (a, b) => `Une pêcheuse de Saint-Gilles a ${a} kg de thon. Elle fait des lots de ${b} kg.`, u: "lots", quoi: ["Combien de lots ?", "Combien de lots fait-elle ?"], b: [0.5, 1.5, 2.5] },
];
const RYTHMES: Sit[] = [
  { t: (a, b) => `Un escargot avance de ${b} m par minute. Il doit parcourir ${a} m.`, u: "minutes", quoi: ["Combien de minutes ?", "Il lui faut combien de minutes ?"], b: [0.02, 0.03, 0.05] },
  { t: (a, b) => `Une tortue marine nage à ${b} km par heure. Elle parcourt ${a} km.`, u: "heures", quoi: ["Combien d'heures ?", "Il lui faut combien d'heures ?"], b: [1.5, 2.5, 3.5] },
  { t: (a, b) => `Un robinet perd ${b} L par heure. Il a perdu ${a} L.`, u: "heures", quoi: ["Depuis combien d'heures ?", "Il coule depuis combien d'heures ?"], b: [0.2, 0.4, 0.5] },
  { t: (a, b) => `Un robot trace ${b} m de ligne par seconde. La ligne fait ${a} m.`, u: "secondes", quoi: ["Combien de secondes ?", "Il lui faut combien de secondes ?"], b: [0.3, 0.6, 0.8] },
  { t: (a, b) => `Une pompe donne ${b} L d'eau par seconde. On veut ${a} L.`, u: "secondes", quoi: ["Combien de secondes ?", "Il faut combien de secondes ?"], b: [0.4, 0.5, 0.6] },
  { t: (a, b) => `Une plante grandit de ${b} cm par jour. Elle a pris ${a} cm.`, u: "jours", quoi: ["Combien de jours ?", "Cela a pris combien de jours ?"], b: [0.2, 0.3, 0.5] },
  { t: (a, b) => `Un glacier recule de ${b} km par an. Il a reculé de ${a} km.`, u: "ans", quoi: ["Combien d'années ?", "Cela a pris combien d'années ?"], b: [0.02, 0.05, 0.04] },
  { t: (a, b) => `Une imprimante pose ${b} mm de plastique par seconde. La pièce fait ${a} mm.`, u: "secondes", quoi: ["Combien de secondes ?", "Il lui faut combien de secondes ?"], b: [0.2, 0.4, 0.5] },
  { t: (a, b) => `Une fusée de jeu monte de ${b} m par seconde. Elle atteint ${a} m.`, u: "secondes", quoi: ["Combien de secondes ?", "Il lui faut combien de secondes ?"], b: [1.5, 2.5, 0.5] },
  { t: (a, b) => `Une carreleuse pose ${b} m de frise par minute. Il y a ${a} m à poser.`, u: "minutes", quoi: ["Combien de minutes ?", "Il lui faut combien de minutes ?"], b: [0.4, 0.5, 0.6] },
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
    ...court(d.q),
    explanation: etapes(`on cherche combien de fois ${fr(d.b)} il y a dans ${fr(d.a)} : c'est une division. On multiplie les deux nombres par ${fr(d.k)}.`, `${ecr(d)} = ${paire(d.A, d.B)} = ${fr(d.q)}.`, `${fr(d.q)} ${s.u}.`),
  };
}
function quelCalcul() {
  const s = un([...PARTS, ...RYTHMES]);
  const d = tirerSit(s);
  const juste = ecr(d);
  return {
    text: `${s.t(fr(d.a), fr(d.b))} ${un(["Quel calcul donne la réponse ?", "Quel calcul faut-il faire ?", "Quelle opération choisir ?", `Quel calcul donne le nombre de ${s.u} ?`])}`,
    ...qcm(juste, [`${fr(d.a)} × ${fr(d.b)}`, paire(d.b, d.a), `${fr(d.a)} − ${fr(d.b)}`, `${fr(d.a)} + ${fr(d.b)}`]),
    explanation: etapes(`on cherche combien de fois ${fr(d.b)} il y a dans ${fr(d.a)}.`, `${juste} = ${fr(d.q)}.`, `Le calcul est : ${juste}.`),
  };
}

/* « Combien de fois plus » : là, le quotient peut être décimal. */
const COMPARE: ((a: string, b: string) => string)[] = [
  (a, b) => `Une barre fait ${a} m. Une baguette fait ${b} m. La barre est combien de fois plus longue ?`,
  (a, b) => `Un sac pèse ${a} kg. Une boîte pèse ${b} kg. Le sac est combien de fois plus lourd ?`,
  (a, b) => `Une bouteille contient ${a} L. Un verre contient ${b} L. La bouteille contient combien de fois plus ?`,
  (a, b) => `Une pastèque pèse ${a} kg. Une mangue pèse ${b} kg. La pastèque est combien de fois plus lourde ?`,
  (a, b) => `Un seau contient ${a} L. Une tasse contient ${b} L. Le seau contient combien de fois plus ?`,
  (a, b) => `Un arbre a grandi de ${a} m. Une tige a grandi de ${b} m. L'arbre a grandi combien de fois plus ?`,
  (a, b) => `La ville A reçoit ${a} m de pluie. La ville B en reçoit ${b} m. La ville A en reçoit combien de fois plus ?`,
  (a, b) => `Un cheval parcourt ${a} km. Un chien parcourt ${b} km. Le cheval va combien de fois plus loin ?`,
  (a, b) => `Un fichier pèse ${a} Go. Une photo pèse ${b} Go. Le fichier pèse combien de fois plus ?`,
  (a, b) => `Une baleine plonge à ${a} km. Un dauphin plonge à ${b} km. La baleine va combien de fois plus profond ?`,
];
function combienDeFois() {
  const d = quotientDecimal();
  return { text: un(COMPARE)(fr(d.a), fr(d.b)), ...court(d.q), explanation: expl(d) };
}

/* Grandeurs quotients : a pour b, combien pour 1 ? Le BO les cite au cycle 4. */
type Taux = { t: (a: string, b: string) => string; b: number[]; p: number[]; u: string; euros?: boolean };
const TAUX: Taux[] = [
  { t: (a, b) => `Une fromagère vend ${b} kg de comté pour ${a} €. Quel est le prix d'un kilo, en € ?`, b: [0.2, 0.4, 0.5, 0.25], p: [14, 16, 18, 22, 24, 26], u: "€ le kilo", euros: true },
  { t: (a, b) => `Un primeur vend ${b} kg de cerises pour ${a} €. Quel est le prix d'un kilo, en € ?`, b: [0.5, 1.5, 2.5, 0.4], p: [6, 8, 9, 12, 14], u: "€ le kilo", euros: true },
  { t: (a, b) => `Une mercière vend ${b} m de ruban pour ${a} €. Quel est le prix d'un mètre, en € ?`, b: [0.5, 1.5, 2.5, 0.2], p: [2, 3, 4, 6, 8], u: "€ le mètre", euros: true },
  { t: (a, b) => `Un automobiliste paie ${a} € pour ${b} L de carburant. Quel est le prix d'un litre, en € ?`, b: [2.5, 7.5, 12.5], p: [1.6, 1.8, 2], u: "€ le litre", euros: true },
  { t: (a, b) => `Un planteur de Sainte-Rose vend ${b} kg de vanille pour ${a} €. Quel est le prix d'un kilo, en € ?`, b: [0.25, 0.5, 0.2], p: [200, 240, 300, 360], u: "€ le kilo", euros: true },
  { t: (a, b) => `Une cycliste parcourt ${a} km en ${b} h. Quelle est sa vitesse moyenne, en km/h ?`, b: [1.5, 2.5, 0.5], p: [18, 20, 22, 24, 26], u: "km/h" },
  { t: (a, b) => `Un train parcourt ${a} km en ${b} h. Quelle est sa vitesse moyenne, en km/h ?`, b: [0.5, 1.5, 2.5], p: [120, 140, 160, 180], u: "km/h" },
  { t: (a, b) => `Une pompe débite ${a} L en ${b} min. Combien de litres par minute ?`, b: [0.5, 1.5, 2.5], p: [12, 18, 24, 30], u: "L par minute" },
  { t: (a, b) => `Une carreleuse pose ${a} m² en ${b} h. Combien de m² par heure ?`, b: [1.5, 2.5, 0.5], p: [2, 3, 4, 6], u: "m² par heure" },
  { t: (a, b) => `Une imprimerie sort ${a} kg de papier en ${b} h. Combien de kilos par heure ?`, b: [0.5, 1.5, 2.5], p: [8, 12, 16, 20], u: "kg par heure" },
];
const prix = (x: number) => (Number.isInteger(x) ? fr(x) : x.toFixed(2).replace(".", ","));
function grandeurQuotient() {
  const s = un(TAUX);
  const d = div(un(s.b), un(s.p));
  return {
    text: s.t(s.euros ? prix(d.a) : fr(d.a), fr(d.b)),
    ...court(d.q),
    explanation: etapes(`pour avoir la valeur pour 1, on divise par ${fr(d.b)}. On multiplie les deux nombres par ${fr(d.k)}.`, `${ecr(d)} = ${paire(d.A, d.B)} = ${fr(d.q)}.`, `${fr(d.q)} ${s.u}.`),
  };
}

export const quotientDecimauxBank: TutorBankItemV4[] = [
  M(1, 1, HINT, facteur),
  M(2, 1, HINT, divisionEgale),
  M(3, 1, HINT, trou),
  M(4, 1, HINT, calcul(dixieme)),
  M(5, 2, HINT, calcul(() => un<() => Div>([centieme, diviseurGrand])())),
  M(6, 2, HINT, calcul(() => un<() => Div>([dividendeEntier, quotientDecimal])())),
  M(7, 2, "Le quotient multiplié par le diviseur redonne le dividende.", verifier),
  M(8, 2, "Regarde si le diviseur est plus petit ou plus grand que 1.", plusGrand),
  M(9, 2, "Arrondis les nombres pour estimer le résultat, ou multiplie pour vérifier.", vraisemblance),
  M(10, 3, "Combien de fois la part dans le total ? Rends le diviseur entier.", () => situation(PARTS)),
  M(11, 3, "Combien de fois la part dans le total ? Rends le diviseur entier.", () => situation(RYTHMES)),
  M(12, 3, "On cherche combien de fois la part entre dans le total.", quelCalcul),
  M(13, 3, HINT, combienDeFois),
  M(14, 3, "Pour avoir la valeur pour 1, on divise. Rends le diviseur entier.", grandeurQuotient),
];
