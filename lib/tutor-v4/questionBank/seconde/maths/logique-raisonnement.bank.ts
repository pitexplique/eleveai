// LOGIQUE, PROGRAMME 2026 DE SECONDE (05/11/2026) : contraposée, disjonction des cas,
// raisonnement par l'absurde, quantificateurs. Vérité calculée par le correcteur : il
// balaie des entiers et des réels (table `PROP`, qui porte la propriété en code).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { entre, expl, fabrique, phrase, qcm, un } from "../../lycee-commun";
import { gabaritsContraposee } from "../../lycee-logique-commun";

const tpl = fabrique("seconde", "logique_ensembles", "2de_");

/* ───── types de raisonnement ───── */
type Rais = { t: string; type: "disjonction" | "absurde" | "contraposee" | "contre_exemple" | "recurrence_non" };
const RAIS: Rais[] = [
  { t: "Pour montrer que $n(n+1)$ est pair, on étudie d'abord le cas où $n$ est pair, puis le cas où $n$ est impair.", type: "disjonction" },
  { t: "Pour montrer que $n^{2} + n + 2$ est pair, on regarde séparément $n$ pair et $n$ impair.", type: "disjonction" },
  { t: "Pour résoudre $|x - 2| = 5$, on traite $x \\geq 2$, puis $x < 2$.", type: "disjonction" },
  { t: "Pour simplifier $|x|$, on sépare $x \\geq 0$ et $x < 0$.", type: "disjonction" },
  { t: "Pour comparer deux tarifs selon le nombre de trajets, on étudie moins de 10 trajets, puis 10 trajets ou plus.", type: "disjonction" },
  { t: "Pour montrer que $\\sqrt{2}$ n'est pas rationnel, on suppose qu'il s'écrit $\\dfrac{p}{q}$ irréductible, et on aboutit à une impossibilité.", type: "absurde" },
  { t: "Pour montrer que $\\dfrac{1}{3}$ n'est pas décimal, on suppose qu'il l'est, et on arrive à une contradiction sur les multiples de $3$.", type: "absurde" },
  { t: "Pour montrer qu'il n'existe pas de plus grand entier, on suppose qu'il en existe un, $N$, et on remarque que $N + 1$ est plus grand.", type: "absurde" },
  { t: "Pour montrer qu'il y a une infinité de nombres premiers, on suppose qu'il y en a un nombre fini, et on construit un nombre qui contredit cela.", type: "absurde" },
  { t: "Pour montrer que deux droites sécantes ne sont pas parallèles, on suppose qu'elles le sont, et on obtient une contradiction avec leur point commun.", type: "absurde" },
  { t: "Pour montrer « si $n^{2}$ est pair, alors $n$ est pair », on démontre « si $n$ est impair, alors $n^{2}$ est impair ».", type: "contraposee" },
  { t: "Pour montrer « si $x^{2} \\neq 4$, alors $x \\neq 2$ », on démontre « si $x = 2$, alors $x^{2} = 4$ ».", type: "contraposee" },
  { t: "Pour montrer « si $3n$ est impair, alors $n$ est impair », on démontre « si $n$ est pair, alors $3n$ est pair ».", type: "contraposee" },
  { t: "Pour montrer « si $ab \\neq 0$, alors $a \\neq 0$ », on démontre « si $a = 0$, alors $ab = 0$ ».", type: "contraposee" },
  { t: "Pour montrer que « tout nombre premier est impair » est faux, on donne le nombre $2$.", type: "contre_exemple" },
  { t: "Pour montrer que « pour tout réel $x$, $x^{2} > x$ » est faux, on donne $x = \\dfrac{1}{2}$.", type: "contre_exemple" },
  { t: "Pour montrer que « tout multiple de $3$ est impair » est faux, on donne le nombre $6$.", type: "contre_exemple" },
  { t: "Pour montrer que « tout rectangle est un carré » est faux, on donne un rectangle de côtés $2$ et $3$.", type: "contre_exemple" },
];
const NOM: Record<Rais["type"], string> = { disjonction: "une disjonction des cas", absurde: "un raisonnement par l'absurde", contraposee: "un raisonnement par contraposée", contre_exemple: "un contre-exemple", recurrence_non: "" };
const TOUS = ["une disjonction des cas", "un raisonnement par l'absurde", "un raisonnement par contraposée", "un contre-exemple"];
const DEF_R = "disjonction des cas : on étudie tous les cas possibles. Absurde : on suppose le contraire et on trouve une impossibilité. Contraposée : on démontre « non $Q$ donne non $P$ ». Contre-exemple : un seul cas suffit à prouver qu'un « pour tout » est faux.";

/* ───── quantificateurs : la propriété est en code, le correcteur balaie ───── */
export type Prop = { t: string; quant: "tout" | "existe"; dom: "R" | "N" | "R+"; pred: (x: number) => boolean; contre?: string; neg: string; negFaux: string[] };
const a = () => entre(2, 9);
export const PROPS: Array<() => Prop> = [
  () => ({ t: "pour tout réel $x$, $x^{2} \\geq 0$", quant: "tout", dom: "R", pred: (x) => x * x >= 0, neg: "il existe un réel $x$ tel que $x^{2} < 0$", negFaux: ["pour tout réel $x$, $x^{2} < 0$", "il existe un réel $x$ tel que $x^{2} \\geq 0$", "pour tout réel $x$, $x^{2} \\leq 0$"] }),
  () => ({ t: "pour tout réel $x$, $x^{2} > 0$", quant: "tout", dom: "R", pred: (x) => x * x > 0, contre: "$x = 0$", neg: "il existe un réel $x$ tel que $x^{2} \\leq 0$", negFaux: ["pour tout réel $x$, $x^{2} \\leq 0$", "il existe un réel $x$ tel que $x^{2} > 0$", "pour tout réel $x$, $x^{2} < 0$"] }),
  () => { const k = a(); return { t: `il existe un réel $x$ tel que $x^{2} = ${k * k}$`, quant: "existe", dom: "R", pred: (x) => x * x === k * k, neg: `pour tout réel $x$, $x^{2} \\neq ${k * k}$`, negFaux: [`il existe un réel $x$ tel que $x^{2} \\neq ${k * k}$`, `pour tout réel $x$, $x^{2} = ${k * k}$`, `il n'existe qu'un réel $x$ tel que $x^{2} = ${k * k}$`] }; },
  () => { const k = a(); return { t: `il existe un réel $x$ tel que $x^{2} = -${k}$`, quant: "existe", dom: "R", pred: (x) => x * x === -k, neg: `pour tout réel $x$, $x^{2} \\neq -${k}$`, negFaux: [`il existe un réel $x$ tel que $x^{2} \\neq -${k}$`, `pour tout réel $x$, $x^{2} = -${k}$`, `il n'existe qu'un réel $x$ tel que $x^{2} = -${k}$`] }; },
  () => ({ t: "pour tout entier naturel $n$, $2n$ est pair", quant: "tout", dom: "N", pred: (n) => (2 * n) % 2 === 0, neg: "il existe un entier naturel $n$ tel que $2n$ est impair", negFaux: ["pour tout entier naturel $n$, $2n$ est impair", "il existe un entier naturel $n$ tel que $2n$ est pair", "aucun entier naturel $n$ ne rend $2n$ pair"] }),
  () => ({ t: "pour tout entier naturel $n$, $2n + 1$ est premier", quant: "tout", dom: "N", pred: (n) => { const m = 2 * n + 1; if (m < 2) return false; for (let d = 2; d * d <= m; d++) if (m % d === 0) return false; return true; }, contre: "$n = 4$", neg: "il existe un entier naturel $n$ tel que $2n + 1$ n'est pas premier", negFaux: ["pour tout entier naturel $n$, $2n + 1$ n'est pas premier", "il existe un entier naturel $n$ tel que $2n + 1$ est premier", "aucun entier naturel $n$ ne rend $2n + 1$ premier"] }),
  () => { const k = a(); return { t: `il existe un entier naturel $n$ tel que $n + ${k} = ${k}$`, quant: "existe", dom: "N", pred: (n) => n + k === k, neg: `pour tout entier naturel $n$, $n + ${k} \\neq ${k}$`, negFaux: [`il existe un entier naturel $n$ tel que $n + ${k} \\neq ${k}$`, `pour tout entier naturel $n$, $n + ${k} = ${k}$`, `il n'existe qu'un entier $n$ tel que $n + ${k} = ${k}$`] }; },
  () => { const k = a(); return { t: `pour tout réel $x$, $x + ${k} > x$`, quant: "tout", dom: "R", pred: (x) => x + k > x, neg: `il existe un réel $x$ tel que $x + ${k} \\leq x$`, negFaux: [`pour tout réel $x$, $x + ${k} \\leq x$`, `il existe un réel $x$ tel que $x + ${k} > x$`, `pour tout réel $x$, $x + ${k} < x$`] }; },
  () => { const k = a(); return { t: `pour tout réel $x$, $${k}x > x$`, quant: "tout", dom: "R", pred: (x) => k * x > x, contre: "$x = 0$", neg: `il existe un réel $x$ tel que $${k}x \\leq x$`, negFaux: [`pour tout réel $x$, $${k}x \\leq x$`, `il existe un réel $x$ tel que $${k}x > x$`, `pour tout réel $x$, $${k}x < x$`] }; },
  () => ({ t: "il existe un réel $x$ tel que $x^{2} = x$", quant: "existe", dom: "R", pred: (x) => x * x === x, neg: "pour tout réel $x$, $x^{2} \\neq x$", negFaux: ["il existe un réel $x$ tel que $x^{2} \\neq x$", "pour tout réel $x$, $x^{2} = x$", "il n'existe qu'un réel $x$ tel que $x^{2} = x$"] }),
  () => ({ t: "pour tout réel $x$ positif, $\\sqrt{x} \\leq x$", quant: "tout", dom: "R+", pred: (x) => Math.sqrt(x) <= x, contre: "$x = \\dfrac{1}{4}$", neg: "il existe un réel $x$ positif tel que $\\sqrt{x} > x$", negFaux: ["pour tout réel $x$ positif, $\\sqrt{x} > x$", "il existe un réel $x$ positif tel que $\\sqrt{x} \\leq x$", "aucun réel $x$ positif ne vérifie $\\sqrt{x} \\leq x$"] }),
  () => ({ t: "pour tout réel $x$, $(x+1)^{2} = x^{2} + 1$", quant: "tout", dom: "R", pred: (x) => (x + 1) ** 2 === x * x + 1, contre: "$x = 1$", neg: "il existe un réel $x$ tel que $(x+1)^{2} \\neq x^{2} + 1$", negFaux: ["pour tout réel $x$, $(x+1)^{2} \\neq x^{2} + 1$", "il existe un réel $x$ tel que $(x+1)^{2} = x^{2} + 1$", "aucun réel $x$ ne vérifie $(x+1)^{2} = x^{2} + 1$"] }),
];
const GRILLE_R = Array.from({ length: 401 }, (_, i) => (i - 200) / 4);
/** Vrai / faux par balayage : la vérité n'est pas écrite à la main. */
export function verite(p: Prop) {
  const G = p.dom === "N" ? Array.from({ length: 200 }, (_, i) => i) : p.dom === "R+" ? GRILLE_R.filter((x) => x >= 0) : GRILLE_R;
  return p.quant === "tout" ? G.every(p.pred) : G.some(p.pred);
}
const DEF_Q = "« pour tout » : la propriété doit être vraie pour TOUS les nombres ; un seul contre-exemple la rend fausse. « Il existe » : un seul exemple suffit à la rendre vraie.";
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* ───── du français au symbole ───── */
const TRAD: Array<() => { fr: string; juste: string; faux: string[] }> = [
  () => ({ fr: "tous les carrés de réels sont positifs ou nuls", juste: "pour tout réel $x$, $x^{2} \\geq 0$", faux: ["il existe un réel $x$ tel que $x^{2} \\geq 0$", "pour tout réel $x$, $x^{2} > 0$", "il existe un réel $x$ tel que $x^{2} < 0$"] }),
  () => ({ fr: "au moins un réel est égal à son carré", juste: "il existe un réel $x$ tel que $x = x^{2}$", faux: ["pour tout réel $x$, $x = x^{2}$", "il existe un réel $x$ tel que $x \\neq x^{2}$", "pour tout réel $x$, $x \\neq x^{2}$"] }),
  () => ({ fr: "aucun réel n'a un carré négatif", juste: "pour tout réel $x$, $x^{2} \\geq 0$", faux: ["il existe un réel $x$ tel que $x^{2} < 0$", "pour tout réel $x$, $x^{2} < 0$", "il existe un réel $x$ tel que $x^{2} \\geq 0$"] }),
  () => { const k = a(); return { fr: `au moins un entier naturel est multiple de ${k}`, juste: `il existe un entier naturel $n$ multiple de $${k}$`, faux: [`pour tout entier naturel $n$, $n$ est multiple de $${k}$`, `aucun entier naturel n'est multiple de $${k}$`, `pour tout entier naturel $n$, $n$ n'est pas multiple de $${k}$`] }; },
  () => { const k = a(); return { fr: `chaque entier naturel augmenté de ${k} reste supérieur à ${k - 1}`, juste: `pour tout entier naturel $n$, $n + ${k} > ${k - 1}$`, faux: [`il existe un entier naturel $n$ tel que $n + ${k} > ${k - 1}$`, `il existe un entier naturel $n$ tel que $n + ${k} \\leq ${k - 1}$`, `pour tout entier naturel $n$, $n + ${k} \\leq ${k - 1}$`] }; },
  () => { const k = a(); return { fr: `un élève au moins a eu la note ${k}`, juste: `il existe un élève dont la note vaut $${k}$`, faux: [`tous les élèves ont eu $${k}$`, `aucun élève n'a eu $${k}$`, `tous les élèves ont eu une note différente de $${k}$`] }; },
  () => ({ fr: "tous les clients ont payé", juste: "pour tout client, ce client a payé", faux: ["il existe un client qui a payé", "il existe un client qui n'a pas payé", "aucun client n'a payé"] }),
  () => ({ fr: "au moins un train est en retard", juste: "il existe un train en retard", faux: ["tous les trains sont en retard", "aucun train n'est en retard", "il existe un train qui n'est pas en retard"] }),
];

export const logiqueRaisonnementBank: TutorBankItemV4[] = [
  ...gabaritsContraposee(tpl),

  /* ===== logique_raisonnement_type ===== */
  tpl("logique_raisonnement_type", 1, 1, "Tous les cas ? Disjonction. On suppose le contraire ? Absurde. Un seul exemple qui contredit ? Contre-exemple.", () => {
    const r = un(RAIS.filter((x) => x.type === "disjonction" || x.type === "contre_exemple"));
    return qcm(phrase([r.t], ["De quel raisonnement s'agit-il ?", "Quel type de raisonnement est utilisé ?", "Comment s'appelle ce raisonnement ?", "Quelle méthode reconnais-tu ?"]), NOM[r.type], TOUS, expl(DEF_R, "on regarde ce que fait le raisonnement.", `ici : ${r.t}`, `c'est ${NOM[r.type]}.`));
  }),
  tpl("logique_raisonnement_type", 2, 1, "On suppose le contraire ? Absurde. On démontre « non Q donne non P » ? Contraposée.", () => {
    const r = un(RAIS.filter((x) => x.type === "absurde" || x.type === "contraposee"));
    return qcm(phrase([r.t], ["De quel raisonnement s'agit-il ?", "Quel type de raisonnement est utilisé ?", "Comment s'appelle ce raisonnement ?", "Quelle méthode reconnais-tu ?"]), NOM[r.type], TOUS, expl(DEF_R, "on regarde ce que fait le raisonnement.", `ici : ${r.t}`, `c'est ${NOM[r.type]}.`));
  }),
  tpl("logique_raisonnement_type", 3, 2, "Pour un entier : pair ou impair, ce sont tous les cas.", () => {
    const n = entre(2, 9);
    const c = un([
      { e: "$n(n+1)$", j: true, pourquoi: "l'un des deux facteurs consécutifs est pair" },
      { e: `$n^{2} + n + ${2 * n}$`, j: true, pourquoi: "$n^{2} + n = n(n+1)$ est pair, et on ajoute un nombre pair" },
      { e: `$n^{2} + n + ${2 * n + 1}$`, j: false, pourquoi: "$n^{2} + n$ est pair, et on ajoute un nombre impair" },
      { e: `$2n + ${2 * n}$`, j: true, pourquoi: "c'est une somme de deux nombres pairs" },
      { e: `$n(n+1) + ${2 * n + 1}$`, j: false, pourquoi: "$n(n+1)$ est pair, et on ajoute un nombre impair" },
    ]);
    const juste = c.j ? "Il est pair, quel que soit $n$." : "Il est impair, quel que soit $n$.";
    return qcm(`$n$ est un entier naturel. ${un(["En distinguant $n$ pair et $n$ impair, que peut-on dire du nombre", "Par disjonction des cas, que peut-on dire du nombre", "On traite les deux cas : $n$ pair, puis $n$ impair. Que peut-on dire du nombre"])} ${c.e} ?`, juste, [c.j ? "Il est impair, quel que soit $n$." : "Il est pair, quel que soit $n$.", "Il est pair seulement si $n$ est pair.", "Il est pair seulement si $n$ est impair."], expl("disjonction des cas : on étudie $n$ pair, puis $n$ impair.", "on regarde la parité dans chacun des deux cas.", `${c.pourquoi}.`, juste));
  }),
  tpl("logique_raisonnement_type", 4, 2, "Dans une preuve par l'absurde, on commence par supposer le contraire de ce qu'on veut montrer.", () => {
    const c = un([
      ["$\\sqrt{2}$ est irrationnel", "$\\sqrt{2}$ est rationnel"],
      ["$\\dfrac{1}{3}$ n'est pas un nombre décimal", "$\\dfrac{1}{3}$ est un nombre décimal"],
      ["il n'existe pas de plus grand entier", "il existe un plus grand entier"],
      ["il existe une infinité de nombres premiers", "il existe un nombre fini de nombres premiers"],
      ["$\\sqrt{3}$ est irrationnel", "$\\sqrt{3}$ est rationnel"],
      ["il n'existe pas de plus petit réel strictement positif", "il existe un plus petit réel strictement positif"],
      ["les droites $d$ et $d'$ ne sont pas parallèles", "les droites $d$ et $d'$ sont parallèles"],
      ["il n'y a pas de plus grand nombre pair", "il existe un plus grand nombre pair"],
    ]);
    return qcm(`On veut démontrer par l'absurde que ${c[0]}. ${un(["Quelle est la première étape ?", "Que suppose-t-on au départ ?", "Par quelle hypothèse commence-t-on ?"])}`, `On suppose que ${c[1]}.`, [`On suppose que ${c[0]}.`, "On cherche un exemple numérique.", "On étudie tous les cas possibles."], expl(DEF_R, "on suppose le contraire de ce qu'on veut démontrer.", `le contraire de « ${c[0]} » est « ${c[1]} ».`, `on suppose que ${c[1]}.`));
  }),
  tpl("logique_raisonnement_type", 5, 3, "Suis la preuve étape par étape : que manque-t-il ?", () => {
    const k = un([2, 3, 5]);
    const fin = k === 2 ? "paire" : `multiple de $${k}$`;
    return qcm(`On suppose $\\sqrt{${k}} = \\dfrac{p}{q}$, fraction irréductible. ${un(["On élève au carré :", "Au carré, on obtient :"])} $p^{2} = ${k}q^{2}$. ${un(["Quelle conséquence tirer sur $p$ ?", "Que peut-on en déduire pour $p$ ?", "Quelle est l'étape suivante ?"])}`, `$p$ est ${k === 2 ? "pair" : `multiple de $${k}$`}, donc $p = ${k}a$.`, [`$q$ est égal à $${k}$.`, `$p$ est égal à $q$.`, `$p^{2}$ est ${k === 2 ? "impair" : `non multiple de $${k}$`}.`], expl("raisonnement par l'absurde : on poursuit jusqu'à une contradiction.", `$p^{2}$ est ${fin} ; pour ${k === 2 ? "$2$" : `$${k}$`}, cela impose que $p$ le soit aussi.`, `en remplaçant $p = ${k}a$, on trouvera que $q$ l'est aussi : la fraction n'était pas irréductible.`, `$p$ est ${k === 2 ? "pair" : `multiple de $${k}$`}.`));
  }),
  tpl("logique_raisonnement_type", 6, 3, "Lis le but : montrer que c'est faux, ou montrer que c'est vrai dans tous les cas ?", () => {
    const c = un([
      { b: "que « pour tout réel $x$, $x^{2} > x$ » est fausse", j: "un contre-exemple" },
      { b: "que « tout multiple de $4$ est multiple de $8$ » est fausse", j: "un contre-exemple" },
      { b: "que « tout nombre impair est premier » est fausse", j: "un contre-exemple" },
      { b: "que $n^{2} + n$ est toujours pair", j: "une disjonction des cas" },
      { b: "une formule pour $|x - 3|$", j: "une disjonction des cas" },
      { b: "que le produit de deux entiers consécutifs est pair", j: "une disjonction des cas" },
      { b: "que $\\sqrt{5}$ n'est pas rationnel", j: "un raisonnement par l'absurde" },
      { b: "qu'il n'y a pas de plus grand multiple de $7$", j: "un raisonnement par l'absurde" },
      { b: "que « si $n^{2}$ est impair, alors $n$ est impair »", j: "un raisonnement par contraposée" },
      { b: "que « si $5n$ est pair, alors $n$ est pair »", j: "un raisonnement par contraposée" },
    ]);
    return qcm(`${un(["Une élève veut démontrer", "Pour un devoir, on doit établir", "On cherche à prouver", "Un élève veut justifier"])} ${c.b}. ${un(["Quelle méthode est la plus adaptée ?", "Quel raisonnement choisir ?", "Quelle méthode convient le mieux ?"])}`, c.j, TOUS, expl(DEF_R, "on choisit la méthode selon le but.", `but : ${c.b}.`, `on choisit ${c.j}.`));
  }),

  /* ===== logique_quantificateurs ===== */
  tpl("logique_quantificateurs", 1, 1, "« Pour tout » demande tous les cas. « Il existe » demande un seul cas.", () => {
    const t = un(TRAD)();
    return qcm(phrase([`On veut écrire la phrase « ${t.fr} ».`, `Traduis : « ${t.fr} ».`, `Comment écrire avec un quantificateur : « ${t.fr} » ?`], ["Quelle écriture convient ?", "Quelle proposition lui correspond ?", "Choisis la bonne écriture."]), cap(t.juste) + ".", t.faux.map((x) => cap(x) + "."), expl(DEF_Q, "on repère si la phrase parle de tous les éléments, ou d'au moins un.", `« ${t.fr} ».`, `on écrit : ${t.juste}.`));
  }),
  tpl("logique_quantificateurs", 2, 1, "Teste quelques valeurs : un contre-exemple suffit à faire tomber un « pour tout ».", () => {
    const p = un(PROPS)();
    const v = verite(p);
    return qcm(phrase([`On lit la proposition : « ${p.t} ».`, `Proposition : « ${p.t} ».`, `Une élève affirme : « ${p.t} ».`], ["Est-elle vraie ou fausse ?", "Vrai ou faux ?", "Que peut-on dire ?"]), v ? "Elle est vraie." : "Elle est fausse.", [v ? "Elle est fausse." : "Elle est vraie.", "Elle est vraie seulement pour les nombres positifs.", "On ne peut pas savoir."], expl(DEF_Q, p.quant === "tout" ? "on cherche un contre-exemple." : "on cherche un exemple.", p.contre ? `contre-exemple : ${p.contre}.` : v ? "la propriété se vérifie." : "aucun nombre ne convient.", v ? "elle est vraie." : "elle est fausse."));
  }),
  tpl("logique_quantificateurs", 3, 2, "Nier « pour tout » donne « il existe », et inversement.", () => {
    const p = un(PROPS)();
    return qcm(un([`Quelle est la négation de « ${p.t} » ?`, `On veut nier : « ${p.t} ». Que faut-il écrire ?`, `Quel est le contraire logique de « ${p.t} » ?`]), cap(p.neg) + ".", p.negFaux.map((x) => cap(x) + "."), expl("la négation de « pour tout $x$, $P$ » est « il existe $x$ tel que non $P$ » ; et inversement.", "on change le quantificateur, puis on nie la propriété.", `« ${p.t} » devient « ${p.neg} ».`, `la négation est : ${p.neg}.`));
  }),
  tpl("logique_quantificateurs", 4, 2, "Le contre-exemple doit rendre la propriété fausse : teste chaque valeur.", () => {
    const k = entre(2, 7);
    const c = un([
      { t: "pour tout réel $x$, $x^{2} \\geq x$", juste: "$x = \\dfrac{1}{2}$", faux: ["$x = 2$", "$x = 0$", "$x = 1$"] },
      { t: "pour tout réel $x$, $x^{2} > 0$", juste: "$x = 0$", faux: ["$x = 1$", "$x = -1$", "$x = 2$"] },
      { t: `pour tout réel $x$, $${k}x > x$`, juste: "$x = -1$", faux: ["$x = 1$", "$x = 2$", "$x = 5$"] },
      { t: "pour tout réel $x$, $(x+1)^{2} = x^{2} + 1$", juste: "$x = 1$", faux: ["$x = 0$"] },
      { t: "pour tout entier naturel $n$, $n^{2} + n + 11$ est premier", juste: "$n = 10$", faux: ["$n = 0$", "$n = 1$", "$n = 2$"] },
      { t: `pour tout réel $x$, $x + ${k} > ${k}$`, juste: "$x = -1$", faux: ["$x = 1$", "$x = 2$", "$x = 3$"] },
      { t: "pour tout réel $x$ positif, $\\sqrt{x} \\leq x$", juste: "$x = \\dfrac{1}{4}$", faux: ["$x = 1$", "$x = 4$", "$x = 9$"] },
    ]);
    const faux = c.faux.length >= 3 ? c.faux : [...c.faux, "Aucun : la propriété est toujours vraie.", "Il n'y a pas de contre-exemple possible."];
    return qcm(`${un(["Quel nombre est un contre-exemple à", "Quelle valeur prouve que c'est faux :", "Laquelle de ces valeurs fait tomber :"])} « ${c.t} » ?`, c.juste, faux, expl(DEF_Q, "on remplace par chaque valeur.", `avec ${c.juste}, la propriété n'est pas vérifiée.`, `le contre-exemple est ${c.juste}.`));
  }),
  tpl("logique_quantificateurs", 5, 3, "L'ordre compte : « il existe » donne un seul nombre valable pour tous, « pour tout » laisse un nombre différent à chaque fois.", () => {
    const c = un([
      { t: "pour tout réel $x$, il existe un réel $y$ tel que $y > x$", v: true, r: "il suffit de prendre $y = x + 1$" },
      { t: "il existe un réel $y$ tel que, pour tout réel $x$, $y > x$", v: false, r: "aucun réel n'est plus grand que tous les autres" },
      { t: "pour tout réel $x$, il existe un réel $y$ tel que $x + y = 0$", v: true, r: "il suffit de prendre $y = -x$" },
      { t: "il existe un réel $y$ tel que, pour tout réel $x$, $x + y = 0$", v: false, r: "$y$ devrait valoir $-x$ pour tous les $x$ à la fois" },
      { t: "il existe un réel $y$ tel que, pour tout réel $x$, $xy = 0$", v: true, r: "$y = 0$ convient pour tous les $x$" },
      { t: "pour tout réel $x$, il existe un réel $y$ tel que $y^{2} = x$", v: false, r: "pour $x = -1$, aucun $y$ ne convient" },
      { t: "pour tout réel $x$, il existe un réel $y$ tel que $y = x^{2}$", v: true, r: "il suffit de prendre $y = x^{2}$" },
      { t: "il existe un réel $y$ tel que, pour tout réel $x$, $x + y = x$", v: true, r: "$y = 0$ convient pour tous les $x$" },
    ]);
    return qcm(phrase([`On considère : « ${c.t} ».`, `Proposition : « ${c.t} ».`], ["Est-elle vraie ?", "Que peut-on en dire ?", "Vrai ou faux ?"]), c.v ? "Elle est vraie." : "Elle est fausse.", [c.v ? "Elle est fausse." : "Elle est vraie.", "Elle n'a pas de sens.", "On ne peut pas savoir."], expl(DEF_Q, "on lit les quantificateurs dans l'ordre.", `${c.r}.`, c.v ? "elle est vraie." : "elle est fausse."));
  }),
  tpl("logique_quantificateurs", 6, 3, "Traduis les quantificateurs de la phrase courante, puis nie-la.", () => {
    const c = un<[string, string, string[]]>([
      ["tous les élèves ont rendu leur devoir", "au moins un élève n'a pas rendu son devoir", ["aucun élève n'a rendu son devoir", "au moins un élève a rendu son devoir", "tous les élèves ont rendu leur devoir en retard"]],
      ["tous les clients sont satisfaits", "au moins un client n'est pas satisfait", ["aucun client n'est satisfait", "au moins un client est satisfait", "tous les clients sont très satisfaits"]],
      ["toutes les lampes sont allumées", "au moins une lampe est éteinte", ["toutes les lampes sont éteintes", "au moins une lampe est allumée", "une seule lampe est allumée"]],
      ["chaque salarié a pris ses congés", "au moins un salarié n'a pas pris ses congés", ["aucun salarié n'a pris ses congés", "au moins un salarié a pris ses congés", "un seul salarié a pris ses congés"]],
      ["au moins un joueur a marqué", "aucun joueur n'a marqué", ["au moins un joueur n'a pas marqué", "tous les joueurs ont marqué", "un seul joueur a marqué"]],
      ["un candidat au moins a réussi", "aucun candidat n'a réussi", ["au moins un candidat a échoué", "tous les candidats ont réussi", "un seul candidat a réussi"]],
      ["il y a un médecin dans l'avion", "il n'y a aucun médecin dans l'avion", ["il y a une personne qui n'est pas médecin dans l'avion", "il n'y a que des médecins dans l'avion", "il y a un seul médecin dans l'avion"]],
      ["aucun train n'est en retard", "au moins un train est en retard", ["tous les trains sont en retard", "au moins un train n'est pas en retard", "un seul train est à l'heure"]],
    ]);
    return qcm(`${un(["Quelle est la négation de la phrase", "Quel est le contraire logique de", "Pour contredire cette phrase, que faut-il établir :"])} « ${c[0]} » ?`, `${cap(c[1])}.`, c[2].map((x) => `${cap(x)}.`), expl("la négation de « tous » est « au moins un… ne… pas » ; la négation de « au moins un » est « aucun ».", "on change le quantificateur et on nie la propriété.", `« ${c[0]} » devient « ${c[1]} ».`, `la négation est : ${c[1]}.`));
  }),
];
