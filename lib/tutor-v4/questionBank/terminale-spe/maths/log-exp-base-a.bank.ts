// LOGARITHME ET EXPONENTIELLE DE BASE a (05/11/2026). Hors programme français (registre `hors_france`) :
// la France n'a que ln et exp en spé, log décimal en STMG. Lignes visées : Québec SNR 11h / OPR 14c,
// Maroc 2e bac A2-7 et A2-9, Belgique S6 3.1.1c, Côte d'Ivoire Tle C1-L5 et C1-L6.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, fr, lin, nL, pgcd, phrase, qcm, un } from "../../lycee-commun";

const tpl = fabrique("terminale-spe", "log_exp_base_a", "tle_");
const M1 = "log_base_calcul";
const M2 = "log_base_proprietes";
const M3 = "exp_base_a";

const LOG = "Pour $a > 0$, $a \\neq 1$ : $\\log_{a}(x) = \\dfrac{\\ln x}{\\ln a}$, et $\\log_{a}(x) = n$ équivaut à $a^{n} = x$.";
const REGLES = "$\\log_{a}(xy) = \\log_{a}(x) + \\log_{a}(y)$, $\\log_{a}\\left(\\dfrac{x}{y}\\right) = \\log_{a}(x) - \\log_{a}(y)$, $\\log_{a}(x^{n}) = n\\log_{a}(x)$.";
const EXPO = "Pour $a > 0$ : $a^{x} = \\mathrm{e}^{x \\ln a}$, et la dérivée de $x \\mapsto a^{x}$ est $x \\mapsto a^{x} \\ln a$.";

const lg = (a: number | string, x: number | string) => `\\log_{${a}}(${x})`;
const BASES = [2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
const MAXN: Record<number, number> = { 2: 8, 3: 5, 4: 4, 5: 4, 6: 3, 7: 3, 8: 3, 9: 3, 10: 4 };
/** Une puissance de taille humaine : a^n. */
function puissance() {
  const a = un(BASES);
  const n = entre(2, MAXN[a]);
  return { a, n, x: a ** n };
}
const ARR = (mot: string) => un([`Arrondis ${mot}.`, `Donne l'arrondi ${mot}.`, `Réponds avec un arrondi ${mot}.`]);
const AUTOUR = (n: string) => [`Calcule $${n}$.`, `Que vaut $${n}$ ?`, `Donne la valeur exacte de $${n}$.`, `Sans calculatrice, trouve $${n}$.`, `Quelle est la valeur de $${n}$ ?`, `Détermine $${n}$.`, `De tête, combien vaut $${n}$ ?`, `Écris $${n}$ sous la forme d'un seul nombre.`];
const dit = (formes: string[]) => un(formes);
const lettre = () => un(["x", "t", "u", "y"]);

/* Fractions : base a = c^p, x = c^q, log_a(x) = q/p. */
function fractionLog() {
  for (;;) {
    const c = un([2, 3, 5]);
    const p = entre(2, 4);
    const q = entre(1, 5);
    if (pgcd(p, q) !== 1 || c ** p > 125 || c ** q > 243) continue;
    return { a: c ** p, x: c ** q, p, q, c };
  }
}
const fracT = (q: number, p: number) => (p === 1 ? String(q) : `\\dfrac{${q}}{${p}}`);

/* ───────────────── contextes : la formule et la grandeur sont écrites, le correcteur les relit ───────────────── */

type Modele = { texte: (x: string) => string; formule: string; x: () => number; question: string[]; pas: number };
const MODELES: Modele[] = [
  { texte: (x) => `En chimie, le pH d'une solution est $Q = -\\log_{10}(x)$, où $x$ est la concentration en ions oxonium. Ici, $x = ${x}$.`, formule: "-\\log_{10}(x)", x: () => un([0.1, 0.01, 0.001, 0.0001]), question: ["Quel est le pH ?", "Que vaut $Q$ ?", "Calcule ce pH."], pas: 1 },
  { texte: (x) => `En acoustique, le niveau sonore est $Q = 10\\log_{10}(x)$ décibels, où $x$ compare l'intensité à celle du seuil d'audition. Lors d'un concert, $x = ${x}$.`, formule: "10\\log_{10}(x)", x: () => un([1000, 10000, 100000, 1000000, 10000000]), question: ["Quel est le niveau sonore ?", "Que vaut $Q$ ?", "Calcule ce niveau, en décibels."], pas: 1 },
  { texte: (x) => `En informatique, pour distinguer $x$ messages, il faut $Q = \\log_{2}(x)$ bits. Ici, $x = ${x}$.`, formule: "\\log_{2}(x)", x: () => un([8, 16, 32, 64, 128, 256, 512, 1024]), question: ["Combien de bits faut-il ?", "Que vaut $Q$ ?", "Calcule ce nombre de bits."], pas: 1 },
  { texte: (x) => `Une recherche par dichotomie dans une liste de $x$ prénoms triés demande au plus $Q = \\log_{2}(x)$ étapes. Ici, $x = ${x}$.`, formule: "\\log_{2}(x)", x: () => un([16, 32, 64, 128, 256, 1024, 2048, 4096]), question: ["Combien d'étapes faut-il au plus ?", "Que vaut $Q$ ?", "Calcule ce nombre d'étapes."], pas: 1 },
  { texte: (x) => `En sismologie, on compare deux séismes par $Q = \\log_{10}(x)$, où $x$ est le rapport de leurs amplitudes. Ici, $x = ${x}$.`, formule: "\\log_{10}(x)", x: () => un([10, 100, 1000, 10000]), question: ["Quel est l'écart de magnitude ?", "Que vaut $Q$ ?", "Calcule cet écart."], pas: 1 },
  { texte: (x) => `En musique, l'écart en octaves entre deux notes vaut $Q = \\log_{2}(x)$, où $x$ est le rapport de leurs fréquences. Ici, $x = ${x}$.`, formule: "\\log_{2}(x)", x: () => un([2, 4, 8, 16]), question: ["Combien d'octaves séparent ces notes ?", "Que vaut $Q$ ?", "Calcule cet écart en octaves."], pas: 1 },
  { texte: (x) => `Une culture de bactéries double à chaque génération : pour multiplier leur nombre par $x$, il faut $Q = \\log_{2}(x)$ générations. Ici, $x = ${x}$.`, formule: "\\log_{2}(x)", x: () => un([50, 100, 500, 1000, 5000]), question: ["Combien de générations faut-il ? Arrondis au dixième.", "Que vaut $Q$ ? Arrondis au dixième.", "Calcule ce nombre. Arrondis au dixième."], pas: 0.1 },
  { texte: (x) => `Un tournoi de judo à élimination directe avec $x$ combattantes compte $Q = \\log_{2}(x)$ tours. Ici, $x = ${x}$.`, formule: "\\log_{2}(x)", x: () => un([8, 16, 32, 64, 128]), question: ["Combien de tours compte-t-il ?", "Que vaut $Q$ ?", "Calcule ce nombre de tours."], pas: 1 },
  { texte: (x) => `En astronomie, un écart de magnitude vaut $Q = 2{,}5\\log_{10}(x)$, où $x$ est le rapport de luminosité de deux étoiles. Ici, $x = ${x}$.`, formule: "2{,}5\\log_{10}(x)", x: () => un([10, 100, 1000, 10000]), question: ["Quel est l'écart de magnitude ?", "Que vaut $Q$ ?", "Calcule cet écart."], pas: 0.1 },
];

const CROISSANCES: ((nom: string, f: string, u: string) => string)[] = [
  (nom, f, u) => `Une colonie de bactéries compte $${nom}(t) = ${f}$ individus au bout de $t$ ${u}.`,
  (nom, f, u) => `Une vidéo est vue $${nom}(t) = ${f}$ fois au bout de $t$ ${u}.`,
  (nom, f, u) => `Une population de tortues protégées vaut $${nom}(t) = ${f}$ au bout de $t$ ${u}.`,
  (nom, f, u) => `Un compte de musicienne a $${nom}(t) = ${f}$ abonnés au bout de $t$ ${u}.`,
  (nom, f, u) => `Une forêt replantée contient $${nom}(t) = ${f}$ arbres au bout de $t$ ${u}.`,
  (nom, f, u) => `Un parc éolien produit $${nom}(t) = ${f}$ unités d'énergie au bout de $t$ ${u}.`,
  (nom, f, u) => `Une rumeur a touché $${nom}(t) = ${f}$ personnes au bout de $t$ ${u}.`,
];
const DECROISSANCES: ((nom: string, f: string, u: string) => string)[] = [
  (nom, f, u) => `Un échantillon radioactif contient $${nom}(t) = ${f}$ atomes au bout de $t$ ${u}.`,
  (nom, f, u) => `Dans le sang d'un patient, un médicament a pour quantité $${nom}(t) = ${f}$ au bout de $t$ ${u}.`,
  (nom, f, u) => `La lumière d'un phare a pour intensité $${nom}(t) = ${f}$ après $t$ couches de brouillard, chaque couche durant ${u}.`,
  (nom, f, u) => `Un glacier a pour volume $${nom}(t) = ${f}$ au bout de $t$ ${u}.`,
  (nom, f, u) => `Une batterie de vélo garde une charge $${nom}(t) = ${f}$ au bout de $t$ ${u}.`,
];

export const logExpBaseABank: TutorBankItemV4[] = [
  /* ═══════════ log_base_calcul ═══════════ */
  tpl(M1, 1, 1, "Cherche l'exposant : a à quelle puissance donne x ?", () => {
    const { a, n, x } = puissance();
    return court(dit(AUTOUR(lg(a, x))), n, expl(LOG, `On cherche l'exposant $n$ tel que $${a}^{n} = ${x}$.`, `$${a}^{${n}} = ${x}$.`, `$${lg(a, x)} = ${n}$.`));
  }),
  tpl(M1, 2, 1, "log_a(1) = 0, log_a(a) = 1, et log_a(1/x) = −log_a(x).", () => {
    const { a, n, x } = puissance();
    const cas = un([
      { m: lg(a, 1), v: 0, c: `$${a}^{0} = 1$.` },
      { m: lg(a, a), v: 1, c: `$${a}^{1} = ${a}$.` },
      { m: lg(a, `\\dfrac{1}{${x}}`), v: -n, c: `$${a}^{-${n}} = \\dfrac{1}{${x}}$.` },
      { m: lg(a, `\\dfrac{1}{${a}}`), v: -1, c: `$${a}^{-1} = \\dfrac{1}{${a}}$.` },
    ]);
    return court(dit(AUTOUR(cas.m)), cas.v, expl(LOG, "On écrit le nombre comme une puissance de la base.", cas.c, `$${cas.m} = ${cas.v}$.`));
  }),
  tpl(M1, 3, 1, "Le logarithme népérien du nombre est au numérateur, celui de la base au dénominateur.", () => {
    const { a } = puissance();
    const l = lettre();
    const juste = `$\\dfrac{\\ln ${l}}{\\ln ${a}}$`;
    return qcm(
      phrase([`Pour $${l} > 0$,`, `Pour tout réel $${l} > 0$,`, `Si $${l}$ est strictement positif,`, `Avec $${l} > 0$,`], [`à quoi est égal $${lg(a, l)}$ ?`, `comment s'écrit $${lg(a, l)}$ avec $\\ln$ ?`, `quelle écriture vaut $${lg(a, l)}$ ?`, `quelle expression est égale à $${lg(a, l)}$ ?`, `que vaut $${lg(a, l)}$ en fonction de $\\ln ${l}$ ?`]),
      juste,
      [`$\\dfrac{\\ln ${a}}{\\ln ${l}}$`, `$\\ln ${l} - \\ln ${a}$`, `$\\ln ${l} \\times \\ln ${a}$`, `$\\dfrac{${l}}{${a}}$`, `$${a}\\ln ${l}$`],
      expl(LOG, "On divise par $\\ln a$ pour que $\\log_{a}(a)$ vaille 1.", `$${lg(a, a)} = \\dfrac{\\ln ${a}}{\\ln ${a}} = 1$.`, `$${lg(a, l)} = \\dfrac{\\ln ${l}}{\\ln ${a}}$.`),
    );
  }),
  tpl(M1, 4, 1, "log_a(x) = n se lit : a puissance n égale x.", () => {
    const { a, n, x } = puissance();
    const juste = `$${a}^{${n}} = ${x}$`;
    return qcm(
      phrase([`Quelle égalité équivaut à $${lg(a, x)} = ${n}$ ?`, `On sait que $${lg(a, x)} = ${n}$.`, `L'égalité $${lg(a, x)} = ${n}$ est vraie.`, `Traduis $${lg(a, x)} = ${n}$ avec une puissance.`], ["", "Choisis la bonne écriture.", "Quelle puissance la traduit ?", "Laquelle de ces égalités dit la même chose ?"]),
      juste,
      [`$${n}^{${a}} = ${x}$`, `$${x}^{${n}} = ${a}$`, `$${a} \\times ${n} = ${x}$`, `$${x}^{${a}} = ${n}$`, `$${a}^{${x}} = ${n}$`, `$${a} + ${n} = ${x}$`],
      expl(LOG, "La base du logarithme devient la base de la puissance, le résultat devient l'exposant.", `$${a}^{${n}} = ${x}$.`, `L'égalité équivalente est ${juste}.`),
    );
  }),
  tpl(M1, 5, 2, "Écris la base et le nombre comme puissances du même entier.", () => {
    const { a, x, p, q, c } = fractionLog();
    const r = fracT(q, p);
    const dec = q % p === 0 || p === 2 || p === 4 ? fr(q / p) : null;
    return court(
      dit(AUTOUR(lg(a, x))) + un(["", " Tu peux répondre par une fraction.", " Une fraction irréductible convient."]),
      `${q}/${p}`,
      expl(LOG, `$${a} = ${c}^{${p}}$ et $${x} = ${c}^{${q}}$.`, `$(${c}^{${p}})^{n} = ${c}^{${q}}$, donc $${p}n = ${q}$.`, `$${lg(a, x)} = ${r}$.`),
      undefined,
      dec ? [dec] : [],
    );
  }),
  tpl(M1, 6, 2, "Applique log_a(x) = ln x ÷ ln a à la calculatrice.", () => {
    const a = un([2, 3, 4, 5, 6, 7, 8, 9, 12, 15]);
    let x = entre(3, 500);
    if (Math.abs(Math.log(x) / Math.log(a) - Math.round(Math.log(x) / Math.log(a))) < 1e-9) x += 1;
    const v = Math.log(x) / Math.log(a);
    return court(
      `${un([`Calcule $${lg(a, x)}$.`, `Que vaut $${lg(a, x)}$ ?`, `À la calculatrice, trouve $${lg(a, x)}$.`, `Donne une valeur approchée de $${lg(a, x)}$.`, `Avec la touche $\\ln$, calcule $${lg(a, x)}$.`, `Détermine $${lg(a, x)}$ à l'aide de $\\ln$.`])} ${ARR("au centième")}`,
      Math.round(v * 100) / 100,
      expl(LOG, `On divise $\\ln ${x}$ par $\\ln ${a}$.`, `$\\dfrac{\\ln ${x}}{\\ln ${a}} \\approx ${nL(Math.round(v * 100) / 100)}$.`, `$${lg(a, x)} \\approx ${nL(Math.round(v * 100) / 100)}$.`),
    );
  }),
  tpl(M1, 7, 2, "Écris le nombre comme une puissance de 10, exposant négatif compris.", () => {
    const n = entre(-5, 6);
    const x = n >= 0 ? String(10 ** n).replace(/\B(?=(\d{3})+$)/g, "\\,") : nL(10 ** n);
    return court(dit(AUTOUR(lg(10, x))), n, expl(LOG, "Le logarithme décimal compte l'exposant de 10.", `$${x} = 10^{${n}}$.`, `$${lg(10, x)} = ${n}$.`));
  }),
  tpl(M1, 8, 2, "Encadre le nombre entre deux puissances consécutives de la base.", () => {
    const a = un([2, 3, 5, 10]);
    const n = entre(1, a === 2 ? 8 : a === 10 ? 4 : 3);
    const bas = a ** n;
    const x = entre(bas + 1, bas * a - 1);
    const int = (k: number) => `$${k}$ et $${k + 1}$`;
    return qcm(
      `${un([`Entre quels entiers consécutifs se trouve $${lg(a, x)}$ ?`, `$${lg(a, x)}$ est compris entre deux entiers consécutifs. Lesquels ?`, `Sans calculatrice, encadre $${lg(a, x)}$ par deux entiers consécutifs.`, `Quels entiers consécutifs encadrent $${lg(a, x)}$ ?`, `Dans quel intervalle d'entiers tombe $${lg(a, x)}$ ?`, `Compare $${x}$ aux puissances de $${a}$ : entre quels entiers est $${lg(a, x)}$ ?`])}`,
      int(n),
      [int(n - 1), int(n + 1), int(n + 2), int(n - 2 < 0 ? n + 3 : n - 2)],
      expl(LOG, "On encadre le nombre par deux puissances consécutives de la base.", `$${a}^{${n}} = ${bas}$ et $${a}^{${n + 1}} = ${bas * a}$.`, `$${lg(a, x)}$ est entre $${n}$ et $${n + 1}$.`),
    );
  }),
  tpl(M1, 9, 3, "Remplace x par sa valeur dans la formule, puis cherche l'exposant.", () => {
    const c = un(MODELES);
    const x = c.x();
    const v = c.pas === 1 ? Math.round(evalModele(c.formule, x)) : Math.round(evalModele(c.formule, x) * 10) / 10;
    const xe = x >= 1 ? String(x).replace(/\B(?=(\d{3})+$)/g, "\\,") : nL(x);
    return court(`${c.texte(xe)} ${un(c.question)}`, v, expl(LOG, "On remplace $x$ par sa valeur.", `$${c.formule.replace("(x)", `(${xe})`)} = ${nL(v)}$.`, `$Q = ${nL(v)}$.`));
  }),
  tpl(M1, 10, 3, "Repasse par ln : deux logarithmes de bases différentes se comparent ainsi.", () => {
    for (;;) {
      const bases = [2, 3, 4, 5, 7, 8, 10];
      const a = un(bases);
      const b = un(bases.filter((k) => k !== a));
      const c = un(bases);
      const d = un(bases.filter((k) => k !== c));
      const x = [entre(5, 90), entre(5, 90), entre(5, 90), entre(5, 90)];
      const l = [[a, x[0]], [b, x[1]], [c, x[2]], [d, x[3]]] as const;
      const v = l.map(([ba, y]) => Math.log(y) / Math.log(ba));
      const tri = [...v].sort((p, q) => p - q);
      if (new Set(l.map(([ba, y]) => `${ba}-${y}`)).size < 4 || tri.some((t, i) => i > 0 && t - tri[i - 1] < 0.08)) continue;
      const grand = Math.random() < 0.5;
      const i = v.indexOf(grand ? tri[3] : tri[0]);
      const ch = l.map(([ba, y]) => `$${lg(ba, y)}$`);
      return qcm(
        `${un(["Une ingénieure compare quatre mesures de son logiciel.", "Un biologiste relève quatre indices, tous donnés en logarithme.", "Une musicienne compare quatre réglages d'un amplificateur.", "Un astronome compare quatre écarts de luminosité.", "Une météorologue compare quatre indices de vent."])} ${un([grand ? "Quel est le plus grand de ces nombres ?" : "Quel est le plus petit de ces nombres ?", grand ? "Lequel de ces nombres est le plus élevé ?" : "Lequel de ces nombres est le moins élevé ?"])}`,
        ch[i],
        ch,
        expl(LOG, "On ramène tout à $\\ln$ à l'aide de la formule.", l.map(([ba, y], k) => `$${lg(ba, y)} \\approx ${nL(Math.round(v[k] * 100) / 100)}$`).join(" ; ") + ".", `Réponse : ${ch[i]}.`),
      );
    }
  }),

  tpl(M1, 11, 1, "Le logarithme de base a rend l'exposant de a.", () => {
    const a = un(BASES);
    const n = entre(2, 12);
    const m = lg(a, `${a}^{${n}}`);
    return court(
      phrase([`Par définition, $${m}$ se lit directement.`, `Le nombre $${a}^{${n}}$ est déjà écrit comme une puissance de $${a}$.`, `On lit l'exposant sans rien calculer.`, `Inutile de développer $${a}^{${n}}$.`, `Regarde la base du logarithme et celle de la puissance.`], [`Que vaut $${m}$ ?`, `Donne $${m}$.`, `Trouve $${m}$.`, `Combien vaut $${m}$ ?`]),
      n,
      expl(LOG, `On cherche l'exposant de $${a}$ qui donne $${a}^{${n}}$.`, `C'est $${n}$.`, `$${m} = ${n}$.`),
    );
  }),
  /* ═══════════ log_base_proprietes ═══════════ */
  tpl(M2, 1, 1, "Le logarithme change un produit en somme, un quotient en différence.", () => {
    const a = un(BASES);
    const [x, y] = un([["x", "y"], ["u", "v"], ["p", "q"], ["s", "t"]] as const);
    const c = un([
      { m: lg(a, `${x}${y}`), j: `$${lg(a, x)} + ${lg(a, y)}$`, f: [`$${lg(a, x)} \\times ${lg(a, y)}$`, `$${lg(a, x)} - ${lg(a, y)}$`, `$\\dfrac{${lg(a, x)}}{${lg(a, y)}}$`, `$${lg(a * 2, x)} + ${lg(a * 2, y)}$`] },
      { m: lg(a, `\\dfrac{${x}}{${y}}`), j: `$${lg(a, x)} - ${lg(a, y)}$`, f: [`$\\dfrac{${lg(a, x)}}{${lg(a, y)}}$`, `$${lg(a, x)} + ${lg(a, y)}$`, `$${lg(a, y)} - ${lg(a, x)}$`, `$${lg(a, x)} \\times ${lg(a, y)}$`] },
    ]);
    return qcm(
      phrase([`Pour $${x} > 0$ et $${y} > 0$,`, `Si $${x}$ et $${y}$ sont strictement positifs,`, `Avec $${x} > 0$ et $${y} > 0$,`], [`à quoi est égal $${c.m}$ ?`, `quelle écriture vaut $${c.m}$ ?`, `comment développer $${c.m}$ ?`, `quelle expression est égale à $${c.m}$ ?`, `que devient $${c.m}$ ?`]),
      c.j,
      c.f,
      expl(REGLES, "On applique la règle qui correspond à l'opération sous le logarithme.", `$${c.m}$ se transforme.`, `Il vaut ${c.j}.`),
    );
  }),
  tpl(M2, 2, 1, "L'exposant sort devant le logarithme.", () => {
    const a = un(BASES);
    const l = lettre();
    const n = entre(2, 9);
    return qcm(
      phrase([`Pour $${l} > 0$,`, `Si $${l}$ est strictement positif,`, `Avec $${l} > 0$,`, `Pour tout réel $${l} > 0$,`], [`à quoi est égal $${lg(a, `${l}^{${n}}`)}$ ?`, `quelle écriture vaut $${lg(a, `${l}^{${n}}`)}$ ?`, `comment transformer $${lg(a, `${l}^{${n}}`)}$ ?`, `que devient $${lg(a, `${l}^{${n}}`)}$ ?`, `quelle expression est égale à $${lg(a, `${l}^{${n}}`)}$ ?`]),
      `$${n}${lg(a, l)}$`,
      [`$\\left(${lg(a, l)}\\right)^{${n}}$`, `$${lg(a, l)} + ${n}$`, `$${lg(a, n)} + ${lg(a, l)}$`, `$\\dfrac{${lg(a, l)}}{${n}}$`],
      expl(REGLES, "L'exposant passe devant.", `$${lg(a, `${l}^{${n}}`)} = ${n}${lg(a, l)}$.`, `Il vaut $${n}${lg(a, l)}$.`),
    );
  }),
  tpl(M2, 3, 1, "Regroupe : le produit des deux nombres est une puissance de la base.", () => {
    const { a, n, x } = puissance();
    const diviseurs: number[] = [];
    for (let d = 2; d < x; d++) if (x % d === 0) diviseurs.push(d);
    const u = diviseurs.length ? un(diviseurs) : a;
    const v = x / u;
    const m = `${lg(a, u)} + ${lg(a, v)}`;
    return court(dit(AUTOUR(m)), n, expl(REGLES, "La somme des logarithmes est le logarithme du produit.", `$${m} = ${lg(a, `${u} \\times ${v}`)} = ${lg(a, x)}$.`, `Le résultat vaut $${n}$.`));
  }),
  tpl(M2, 4, 2, "Une différence de logarithmes est le logarithme du quotient.", () => {
    const { a, n, x } = puissance();
    const w = entre(2, 12);
    const m = `${lg(a, x * w)} - ${lg(a, w)}`;
    return court(dit(AUTOUR(m)), n, expl(REGLES, "La différence des logarithmes est le logarithme du quotient.", `$${m} = ${lg(a, `\\dfrac{${x * w}}{${w}}`)} = ${lg(a, x)}$.`, `Le résultat vaut $${n}$.`));
  }),
  tpl(M2, 5, 2, "Sors l'exposant, puis cherche la puissance de la base.", () => {
    const a = un([2, 3, 4, 5, 10]);
    const n = entre(2, 3);
    const k = entre(2, 7);
    const x = a ** n;
    const m = un([lg(a, `${x}^{${k}}`), `${k}${lg(a, x)}`]);
    return court(dit(AUTOUR(m)), n * k, expl(REGLES, "L'exposant passe devant le logarithme.", `$${lg(a, x)} = ${n}$, puis on multiplie par $${k}$.`, `Le résultat vaut $${n * k}$.`));
  }),
  tpl(M2, 6, 2, "Changement de base : log_a(x) = log_b(x) ÷ log_b(a).", () => {
    const a = un([3, 5, 7, 12]);
    const b = un([2, 10, 6].filter((k) => k !== a));
    const l = lettre();
    const j = `$\\dfrac{${lg(b, l)}}{${lg(b, a)}}$`;
    return qcm(
      phrase([`Pour $${l} > 0$,`, `Avec $${l} > 0$,`, `Pour tout réel $${l} > 0$,`, `On veut passer en base $${b}$. Pour $${l} > 0$,`], [`à quoi est égal $${lg(a, l)}$ ?`, `quelle écriture en base $${b}$ vaut $${lg(a, l)}$ ?`, `comment changer de base dans $${lg(a, l)}$ ?`, `quelle expression en base $${b}$ est égale à $${lg(a, l)}$ ?`]),
      j,
      [`$\\dfrac{${lg(b, a)}}{${lg(b, l)}}$`, `$${lg(b, l)} - ${lg(b, a)}$`, `$${lg(b, l)} \\times ${lg(b, a)}$`, `$${lg(b, l)} + ${lg(b, a)}$`],
      expl(LOG, "On écrit chaque logarithme avec $\\ln$.", `$\\dfrac{${lg(b, l)}}{${lg(b, a)}} = \\dfrac{\\ln ${l}}{\\ln ${b}} \\times \\dfrac{\\ln ${b}}{\\ln ${a}} = \\dfrac{\\ln ${l}}{\\ln ${a}}$.`, `Il vaut ${j}.`),
    );
  }),
  tpl(M2, 7, 2, "Écris la base comme une puissance de 2 ou de 3, puis change de base.", () => {
    const b = un([2, 3, 5]);
    const e = entre(2, 3);
    const a = b ** e;
    const y = un([3, 7, 11, 13, 6].filter((k) => k !== b));
    const p = un(["p", "q", "r"]);
    const j = `$\\dfrac{${p}}{${e}}$`;
    return qcm(
      phrase([`On pose $${p} = ${lg(b, y)}$.`, `On note $${p} = ${lg(b, y)}$.`, `Soit $${p} = ${lg(b, y)}$.`, `On sait que $${lg(b, y)}$ vaut $${p}$, soit $${p} = ${lg(b, y)}$.`], [`Exprime $${lg(a, y)}$ en fonction de $${p}$.`, `Que vaut $${lg(a, y)}$ en fonction de $${p}$ ?`, `Comment s'écrit $${lg(a, y)}$ avec $${p}$ ?`, `Quelle écriture vaut $${lg(a, y)}$ ?`]),
      j,
      [`$${e}${p}$`, `$${p} + ${e}$`, `$${p} - ${e}$`, `$${p}^{${e}}$`],
      expl(LOG, "On change de base.", `$${lg(a, y)} = \\dfrac{${lg(b, y)}}{${lg(b, a)}}$ et $${lg(b, a)} = ${e}$.`, `Il vaut ${j}.`),
    );
  }),
  tpl(M2, 8, 2, "log_a(x) = n équivaut à x = a puissance n.", () => {
    const { a, n, x } = puissance();
    const l = lettre();
    return court(
      phrase([`Résous $${lg(a, l)} = ${n}$.`, `Quelle est la solution de $${lg(a, l)} = ${n}$ ?`, `Trouve le réel $${l} > 0$ tel que $${lg(a, l)} = ${n}$.`, `Sachant que $${lg(a, l)} = ${n}$, que vaut $${l}$ ?`, `Détermine $${l}$ si $${lg(a, l)} = ${n}$.`, `Pour quel réel $${l}$ a-t-on $${lg(a, l)} = ${n}$ ?`], [""]),
      x,
      expl(LOG, "On repasse à la puissance.", `$${l} = ${a}^{${n}} = ${x}$.`, `$${l} = ${x}$.`),
    );
  }),
  tpl(M2, 9, 3, "Regroupe en un seul logarithme, résous, puis vérifie que la solution existe.", () => {
    for (;;) {
      const a = un([2, 3, 4, 5, 6, 10]);
      const n = entre(1, a === 2 ? 5 : 3);
      const c = a ** n;
      const d: number[] = [];
      for (let k = 1; k * k < c; k++) if (c % k === 0) d.push(k);
      if (!d.length) continue;
      const u = un(d);
      const x = c / u;
      const k = x - u;
      if (k <= 0) continue;
      const l = un(["x", "t", "u"]);
      const eq = `${lg(a, l)} + ${lg(a, `${l} - ${k}`)} = ${n}`;
      return court(
        `${un([`Résous dans $]${k}\\,;+\\infty[$ l'équation $${eq}$.`, `Sur $]${k}\\,;+\\infty[$, quelle est la solution de $${eq}$ ?`, `Trouve le réel $${l} > ${k}$ tel que $${eq}$.`, `Pour un réglage de machine, on cherche $${l} > ${k}$ avec $${eq}$. Que vaut $${l}$ ?`, `Une équipe de chercheuses doit résoudre $${eq}$ pour $${l} > ${k}$. Quelle est la solution ?`])}`,
        x,
        expl(REGLES, "On regroupe en un seul logarithme.", `$${l}(${l} - ${k}) = ${c}$ ; l'autre racine, $${-u}$, n'est pas dans l'intervalle.`, `$${l} = ${x}$.`),
      );
    }
  }),
  tpl(M2, 10, 3, "Prends ln des deux membres : x = ln b ÷ ln a.", () => {
    const a = un([2, 3, 5, 7, 1.5, 1.2, 1.05]);
    const b = entre(3, 900);
    const v = Math.log(b) / Math.log(a);
    const ctx = un([
      `Une colonie est multipliée par $${nL(a)}$ à chaque période. Pour la multiplier par $${b}$, il faut résoudre $${nL(a)}^{x} = ${b}$.`,
      `Un algorithme voit son temps multiplié par $${nL(a)}$ à chaque étape. On cherche quand il est multiplié par $${b}$, soit $${nL(a)}^{x} = ${b}$.`,
      `Résous $${nL(a)}^{x} = ${b}$.`,
      `Quelle est la solution de $${nL(a)}^{x} = ${b}$ ?`,
      `Un virus informatique se propage : chaque jour, son nombre de copies est multiplié par $${nL(a)}$. Résous $${nL(a)}^{x} = ${b}$.`,
      `Une plante grimpante voit sa longueur multipliée par $${nL(a)}$ chaque mois. Résous $${nL(a)}^{x} = ${b}$ pour savoir quand elle est multipliée par $${b}$.`,
    ]);
    return court(`${ctx} ${ARR("au centième")}`, Math.round(v * 100) / 100, expl(LOG, "On passe au logarithme.", `$x = \\dfrac{\\ln ${b}}{\\ln ${nL(a)}}$.`, `$x \\approx ${nL(Math.round(v * 100) / 100)}$.`));
  }),
  tpl(M2, 11, 3, "Si la base est entre 0 et 1, le sens de l'inégalité change.", () => {
    const a = un([2, 3, 4, 5, 10, 0.5, 0.25, 0.2, 0.1]);
    const n = entre(1, 3);
    const x = a ** n;
    const l = lettre();
    const b = nL(a);
    const s = fr(x).replace(",", "{,}");
    const sup = Math.random() < 0.5;
    const G = `$]${s}\\,;+\\infty[$`;
    const D = `$]0\\,;${s}[$`;
    const signe = sup ? ">" : "<";
    const juste = (a > 1) === sup ? G : D;
    return qcm(
      `${un([`Résous $${lg(b, l)} ${signe} ${n}$.`, `Quel est l'ensemble des solutions de $${lg(b, l)} ${signe} ${n}$ ?`, `Pour quels réels $${l} > 0$ a-t-on $${lg(b, l)} ${signe} ${n}$ ?`, `Une capteur de lumière renvoie $${lg(b, l)}$, et on veut $${lg(b, l)} ${signe} ${n}$. Quelles valeurs de $${l}$ conviennent ?`, `Dans un programme, la condition est $${lg(b, l)} ${signe} ${n}$. Pour quels $${l}$ est-elle vraie ?`])}`,
      juste,
      [G, D, `$]-\\infty\\,;${s}[$`, `$[${s}\\,;+\\infty[$`],
      expl(LOG, a > 1 ? "La base dépasse 1 : la fonction est croissante." : "La base est entre 0 et 1 : la fonction est décroissante, le sens change.", `$${b}^{${n}} = ${s}$.`, `Solutions : ${juste}.`),
    );
  }),

  /* ═══════════ exp_base_a ═══════════ */
  tpl(M3, 1, 1, "a puissance x s'écrit e puissance (x ln a).", () => {
    const a = un([2, 3, 5, 7, 10]);
    const l = lettre();
    return qcm(
      phrase([`Pour tout réel $${l}$,`, `Quel que soit le réel $${l}$,`, `Soit $${l}$ un réel.`, `Pour un réel $${l}$ quelconque,`], [`à quoi est égal $${a}^{${l}}$ ?`, `quelle écriture avec $\\mathrm{e}$ vaut $${a}^{${l}}$ ?`, `comment s'écrit $${a}^{${l}}$ avec l'exponentielle ?`, `quelle expression est égale à $${a}^{${l}}$ ?`]),
      `$\\mathrm{e}^{${l}\\ln ${a}}$`,
      [`$\\mathrm{e}^{${a}\\ln ${l}}$`, `$${l}\\mathrm{e}^{\\ln ${a}}$`, `$\\mathrm{e}^{${l} + \\ln ${a}}$`, `$${a}\\mathrm{e}^{${l}}$`],
      expl(EXPO, `$${a} = \\mathrm{e}^{\\ln ${a}}$.`, `On élève à la puissance $${l}$.`, `$${a}^{${l}} = \\mathrm{e}^{${l}\\ln ${a}}$.`),
    );
  }),
  tpl(M3, 2, 1, "La dérivée de a^x garde a^x et se multiplie par ln a.", () => {
    const a = un([2, 3, 5, 7, 10, 1.5, 0.5]);
    const b = a < 1 || !Number.isInteger(a) ? `${nL(a)}` : String(a);
    const n = un(["f", "g", "h"]);
    const par = b.includes(",") ? `\\left(${b}\\right)` : b;
    return qcm(
      phrase([`Soit $${n}(x) = ${par}^{x}$ sur $\\mathbb{R}$.`, `On considère $${n}(x) = ${par}^{x}$.`, `La fonction $${n}$ est définie par $${n}(x) = ${par}^{x}$.`, `Sur $\\mathbb{R}$, $${n}(x) = ${par}^{x}$.`], [`Que vaut $${n}'(x)$ ?`, `Quelle est sa dérivée ?`, `Donne $${n}'(x)$.`, `Quelle est l'expression de $${n}'(x)$ ?`, `Laquelle de ces expressions est $${n}'(x)$ ?`]),
      `$${par}^{x}\\ln ${b}$`,
      [`$${par}^{x}$`, `$x \\times ${par}^{x - 1}$`, `$${par}^{x} \\times ${b}$`, `$\\dfrac{${par}^{x}}{\\ln ${b}}$`],
      expl(EXPO, `$${n}(x) = \\mathrm{e}^{x\\ln ${b}}$.`, "On dérive une exponentielle de $kx$, avec $k = \\ln a$.", `$${n}'(x) = ${par}^{x}\\ln ${b}$.`),
    );
  }),
  tpl(M3, 3, 1, "Base plus grande que 1 : croissante. Base entre 0 et 1 : décroissante.", () => {
    const a = un([2, 3, 1.5, 1.2, 10, 0.5, 0.3, 0.9, 0.25, 0.75]);
    const b = nL(a);
    const par = b.includes(",") ? `\\left(${b}\\right)` : b;
    const n = un(["f", "g", "h"]);
    const C = "Strictement croissante";
    const D = "Strictement décroissante";
    return qcm(
      phrase([`Soit $${n}(x) = ${par}^{x}$ sur $\\mathbb{R}$.`, `On considère $${n}(x) = ${par}^{x}$ sur $\\mathbb{R}$.`, `La fonction $${n}$ vaut $${par}^{x}$ pour tout réel $x$.`], [`Quel est son sens de variation ?`, `Comment varie-t-elle ?`, `Sans dériver, comment est-elle ?`, `Quelle est sa monotonie ?`, `Comment varie-t-elle quand $x$ augmente ?`]),
      a > 1 ? C : D,
      [C, D, "Constante", "Croissante puis décroissante"],
      expl(EXPO, `Le signe de la dérivée est celui de $\\ln ${b}$.`, a > 1 ? "La base dépasse 1 : $\\ln a > 0$." : "La base est entre 0 et 1 : $\\ln a < 0$.", `Elle est ${a > 1 ? "strictement croissante" : "strictement décroissante"}.`),
    );
  }),
  tpl(M3, 4, 1, "Remplace x par la valeur : un exposant négatif donne un inverse.", () => {
    const a = un([2, 3, 4, 5, 10]);
    const n = un([-2, -1, 0, 1, 2, 3]);
    const f = un(["f", "g", "h"]);
    const v = a ** n;
    const r = n < 0 ? `1/${a ** -n}` : String(v);
    const autres = n < 0 && Number.isFinite(v) && (a === 2 || a === 4 || a === 5 || a === 10) ? [fr(v)] : [];
    return court(
      phrase([`Soit $${f}(x) = ${a}^{x}$.`, `On considère $${f}(x) = ${a}^{x}$.`, `La fonction $${f}$ est définie par $${f}(x) = ${a}^{x}$.`], [`Que vaut $${f}(${n})$ ?`, `Calcule $${f}(${n})$.`, `Quelle est l'image de $${n}$ ?`, `Donne $${f}(${n})$${n < 0 ? ", en fraction" : ""}.`, `Sans calculatrice, trouve $${f}(${n})$.`]),
      r,
      expl(EXPO, `On remplace $x$ par $${n}$.`, `$${a}^{${n}} = ${n < 0 ? `\\dfrac{1}{${a ** -n}}` : v}$.`, `$${f}(${n}) = ${n < 0 ? `\\dfrac{1}{${a ** -n}}` : v}$.`),
      undefined,
      autres,
    );
  }),
  tpl(M3, 5, 2, "Calcule d'abord f'(x) = a^x ln a, puis remplace x.", () => {
    const a = un([2, 3, 5, 7, 10, 0.5, 1.5]);
    const b = nL(a);
    const par = b.includes(",") ? `\\left(${b}\\right)` : b;
    const x0 = un([-2, -1, 0, 1, 2, 3]);
    const f = un(["f", "g", "h"]);
    const v = a ** x0 * Math.log(a);
    return court(
      `${un([`Soit $${f}(x) = ${par}^{x}$.`, `On considère $${f}(x) = ${par}^{x}$.`, `La fonction $${f}$ est définie par $${f}(x) = ${par}^{x}$.`, `Pour $${f}(x) = ${par}^{x}$ :`])} ${un([`Calcule $${f}'(${x0})$.`, `Que vaut $${f}'(${x0})$ ?`, `Donne le nombre dérivé en $${x0}$.`, `Trouve le coefficient directeur de la tangente en $${x0}$.`])} ${ARR("au centième")}`,
      Math.round(v * 100) / 100,
      expl(EXPO, `$${f}'(x) = ${par}^{x}\\ln ${b}$.`, `$${f}'(${x0}) = ${par}^{${x0}}\\ln ${b}$.`, `$${f}'(${x0}) \\approx ${nL(Math.round(v * 100) / 100)}$.`),
    );
  }),
  tpl(M3, 6, 2, "Écris e puissance (u ln a) : la dérivée fait sortir u' × ln a.", () => {
    const a = un([2, 3, 5, 10]);
    const k = entre(2, 9);
    const m = entre(2, 5);
    const p = un([-3, -2, -1, 1, 2, 3]);
    const f = un(["f", "g", "h"]);
    const c = un([
      { e: `${k} \\times ${a}^{x}`, j: `$${k} \\times ${a}^{x}\\ln ${a}$`, f: [`$${k} \\times ${a}^{x}$`, `$${a}^{x}\\ln ${a}$`, `$${k}x \\times ${a}^{x - 1}$`, `$${k + 1} \\times ${a}^{x}\\ln ${a}$`] },
      { e: `${a}^{${lin(m, p)}}`, j: `$${m} \\times ${a}^{${lin(m, p)}}\\ln ${a}$`, f: [`$${a}^{${lin(m, p)}}\\ln ${a}$`, `$${m} \\times ${a}^{${lin(m, p)}}$`, `$(${lin(m, p)}) \\times ${a}^{${lin(m, p - 1)}}$`, `$${m + 1} \\times ${a}^{${lin(m, p)}}\\ln ${a}$`] },
    ]);
    return qcm(
      phrase([`Soit $${f}(x) = ${c.e}$.`, `On considère $${f}(x) = ${c.e}$ sur $\\mathbb{R}$.`, `La fonction $${f}$ est définie sur $\\mathbb{R}$ par $${f}(x) = ${c.e}$.`], [`Que vaut $${f}'(x)$ ?`, `Quelle est sa dérivée ?`, `Calcule $${f}'(x)$.`, `Quelle est l'expression de $${f}'(x)$ ?`, `Dérive cette fonction.`]),
      c.j,
      c.f,
      expl(EXPO, "On écrit la puissance avec $\\mathrm{e}$, puis on dérive.", `La dérivée de $u \\mapsto ${a}^{u}$ est $${a}^{u}\\ln ${a}$, et on multiplie par la dérivée de ce qui est en exposant.`, `$${f}'(x)$ vaut ${c.j}.`),
    );
  }),
  tpl(M3, 7, 2, "Base plus grande que 1 : a^x explose en +∞, tend vers 0 en −∞. L'inverse sinon.", () => {
    const a = un([2, 3, 5, 1.5, 10, 0.5, 0.2, 0.75, 0.9]);
    const b = nL(a);
    const par = b.includes(",") ? `\\left(${b}\\right)` : b;
    const plus = Math.random() < 0.5;
    const borne = plus ? "+\\infty" : "-\\infty";
    const lim = `\\lim\\limits_{x \\to ${borne}} ${par}^{x}`;
    const INF = "$+\\infty$";
    const Z = "$0$";
    const juste = (a > 1) === plus ? INF : Z;
    return qcm(
      `${un([`Que vaut $${lim}$ ?`, `Quelle est la limite de $${par}^{x}$ quand $x$ tend vers $${borne}$ ?`, `Détermine $${lim}$.`, `Vers quoi tend $${par}^{x}$ quand $x$ tend vers $${borne}$ ?`, `Sans calculatrice, donne $${lim}$.`, `Que devient $${par}^{x}$ quand $x$ tend vers $${borne}$ ?`, `Trouve $${lim}$ en regardant la base.`, `Calcule $${lim}$.`])}`,
      juste,
      [INF, Z, "$1$", "$-\\infty$", `$${b}$`],
      expl(EXPO, `$${par}^{x} = \\mathrm{e}^{x\\ln ${b}}$.`, `$\\ln ${b}$ est ${a > 1 ? "positif" : "négatif"}, et on regarde le signe de $x\\ln ${b}$ à la limite.`, `La limite vaut ${juste}.`),
    );
  }),
  tpl(M3, 8, 2, "e puissance (x ln a) se regroupe en a puissance x ; un facteur devant x passe sur la base.", () => {
    const a = un([2, 3, 5]);
    const k = entre(2, 3);
    const l = lettre();
    const j = `$${a ** k}^{${l}}$`;
    return qcm(
      phrase([`Quelle écriture est égale à $\\mathrm{e}^{${k}${l}\\ln ${a}}$ ?`, `Simplifie $\\mathrm{e}^{${k}${l}\\ln ${a}}$.`, `Sous forme de puissance, que vaut $\\mathrm{e}^{${k}${l}\\ln ${a}}$ ?`, `Écris $\\mathrm{e}^{${k}${l}\\ln ${a}}$ avec une seule base entière.`, `À quoi est égal $\\mathrm{e}^{${k}${l}\\ln ${a}}$ ?`], ["", "Choisis la bonne écriture.", `Pour tout réel $${l}$, laquelle convient ?`]),
      j,
      [`$${a}^{${l}}$`, `$${a * k}^{${l}}$`, `$${a + 1}^{${k}${l}}$`, `$${k} \\times ${a}^{${l}}$`, `$${a}^{${l} + ${k}}$`],
      expl(EXPO, `$${k}\\ln ${a} = \\ln ${a ** k}$.`, `$\\mathrm{e}^{${l}\\ln ${a ** k}} = ${a ** k}^{${l}}$.`, `Il vaut ${j}.`),
    );
  }),
  tpl(M3, 9, 3, "La vitesse d'évolution est la dérivée : k × a^t × ln a.", () => {
    const croit = Math.random() < 0.6;
    const k = entre(2, 90) * 10;
    const a = croit ? un([1.05, 1.1, 1.2, 1.5, 2]) : un([0.5, 0.8, 0.9, 0.95]);
    const nom = un(["N", "P", "Q"]);
    const u = un(["jours", "mois", "ans", "semaines"]);
    const t0 = entre(1, 6);
    const b = nL(a);
    const f = `${k} \\times ${b}^{t}`;
    const v = k * a ** t0 * Math.log(a);
    return court(
      `${un(croit ? CROISSANCES : DECROISSANCES)(nom, f, u)} ${un([`Calcule $${nom}'(${t0})$.`, `Quelle est la vitesse d'évolution à l'instant $t = ${t0}$, soit $${nom}'(${t0})$ ?`, `Détermine $${nom}'(${t0})$.`, `Que vaut le nombre dérivé $${nom}'(${t0})$ ?`])} ${ARR("au dixième")}`,
      Math.round(v * 10) / 10,
      expl(EXPO, `$${nom}'(t) = ${k} \\times ${b}^{t}\\ln ${b}$.`, `On remplace $t$ par $${t0}$.`, `$${nom}'(${t0}) \\approx ${nL(Math.round(v * 10) / 10)}$.`),
    );
  }),
  tpl(M3, 10, 3, "La tangente en 0 passe par (0 ; 1) et a pour pente ln a.", () => {
    const a = un([2, 3, 5, 7, 10]);
    const f = un(["f", "g", "h"]);
    const j = `$y = x\\ln ${a} + 1$`;
    return qcm(
      `${un([`Une graphiste trace la courbe de $${f}(x) = ${a}^{x}$ et veut la tangente en 0.`, `Quelle est l'équation de la tangente à la courbe de $${f}(x) = ${a}^{x}$ au point d'abscisse 0 ?`, `Un logiciel doit dessiner la tangente en 0 à la courbe de $${f}(x) = ${a}^{x}$.`, `On étudie $${f}(x) = ${a}^{x}$ près de 0, en la remplaçant par sa tangente.`, `Une ingénieure approche $${f}(x) = ${a}^{x}$ près de 0 par une droite tangente.`])} ${un(["Quelle équation convient ?", "Quelle droite est la bonne ?", "Choisis son équation.", "Laquelle de ces droites est-ce ?"])}`,
      j,
      [`$y = x\\ln ${a}$`, `$y = ${a}x + 1$`, `$y = x + 1$`, `$y = x\\ln ${a} + ${a}$`],
      expl(EXPO, `$${f}(0) = 1$ et $${f}'(0) = \\ln ${a}$.`, `$y = ${f}'(0)(x - 0) + ${f}(0)$.`, `La tangente est ${j}.`),
    );
  }),
  tpl(M3, 11, 3, "Résous k × a^t ≥ S par ln, puis prends le premier entier qui convient.", () => {
    const croit = Math.random() < 0.6;
    const nom = un(["N", "P", "Q"]);
    const u = un(["jours", "mois", "ans", "semaines"]);
    for (;;) {
      const k = entre(2, 60) * 10;
      const a = croit ? un([1.05, 1.1, 1.2, 1.5, 2]) : un([0.5, 0.8, 0.9, 0.95]);
      const S = croit ? k * entre(2, 12) : Math.round(k / entre(2, 8));
      const t = Math.log(S / k) / Math.log(a);
      if (Math.abs(t - Math.round(t)) < 1e-6 || t <= 0 || t > 200) continue;
      const b = nL(a);
      const f = `${k} \\times ${b}^{t}`;
      const signe = croit ? "\\geqslant" : "\\leqslant";
      return court(
        `${un(croit ? CROISSANCES : DECROISSANCES)(nom, f, u)} ${un([`Quel est le plus petit entier $t$ tel que $${nom}(t) ${signe} ${S}$ ?`, `À partir de quel entier $t$ a-t-on $${nom}(t) ${signe} ${S}$ ?`, `Détermine le plus petit entier $t$ vérifiant $${nom}(t) ${signe} ${S}$.`, `Trouve le premier entier $t$ pour lequel $${nom}(t) ${signe} ${S}$.`])}`,
        Math.ceil(t),
        expl(EXPO, `On divise par $${k}$, puis on prend $\\ln$ ; ${a < 1 ? "$\\ln a$ est négatif, le sens change." : "$\\ln a$ est positif."}`, `$t ${signe} \\dfrac{\\ln(${nL(S / k)})}{\\ln ${b}} \\approx ${nL(Math.round(t * 100) / 100)}$`.replace("\\leqslant \\dfrac", "\\geqslant \\dfrac"), `Le plus petit entier est $${Math.ceil(t)}$.`),
      );
    }
  }),
];

/** Le modèle de contexte : la grandeur Q, calculée avec le log de la formule. */
function evalModele(formule: string, x: number) {
  const m = formule.match(/^(-?)([\d{},]*)\\log_\{(\d+)\}\(x\)$/);
  if (!m) throw new Error(`formule illisible : ${formule}`);
  const coef = (m[1] ? -1 : 1) * (m[2] ? Number(m[2].replace("{,}", ".")) : 1);
  return (coef * Math.log(x)) / Math.log(Number(m[3]));
}
