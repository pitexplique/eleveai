// CROISER DEUX VARIABLES QUALITATIVES (05/11/2026). Programme 2026 de seconde :
// « Tableau croisé d'effectifs. Fréquence conditionnelle, fréquence marginale ».
// Les effectifs sont choisis pour que toutes les fréquences tombent juste.

import type { TableauDonneesCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, de, entre, expl, fabrique, fr, mil, nL, phrase, qcm, un } from "../../lycee-commun";

const tpl = fabrique("seconde", "croisement_variables_2de", "2de_");

type Ctx = { s: string; pop: string; l: [string, string]; c: [string, string] };
const CTX: Ctx[] = [
  { s: "Un lycée interroge ses élèves sur leur déjeuner.", pop: "élèves", l: ["demi-pensionnaires", "externes"], c: ["inscrits au foyer", "non inscrits au foyer"] },
  { s: "Une enseigne de téléphonie étudie ses clients.", pop: "clients", l: ["abonnés", "non abonnés"], c: ["satisfaits", "non satisfaits"] },
  { s: "Un garagiste classe les voitures de son stock.", pop: "voitures", l: ["électriques", "thermiques"], c: ["neuves", "d'occasion"] },
  { s: "Un médecin étudie une épidémie de grippe parmi ses patients.", pop: "patients", l: ["vaccinés", "non vaccinés"], c: ["malades", "non malades"] },
  { s: "Une entreprise étudie l'organisation de ses salariés.", pop: "salariés", l: ["à temps plein", "à temps partiel"], c: ["en télétravail", "sur site"] },
  { s: "Un cinéma compte les spectateurs de la semaine.", pop: "spectateurs", l: ["adultes", "enfants"], c: ["venus en semaine", "venus le week-end"] },
  { s: "Un club omnisports fait le point sur ses adhérents.", pop: "adhérents", l: ["licenciés", "non licenciés"], c: ["en compétition", "en loisir"] },
  { s: "Une bibliothèque étudie ses lecteurs.", pop: "lecteurs", l: ["de moins de 25 ans", "de 25 ans ou plus"], c: ["adeptes de romans", "adeptes de documentaires"] },
  { s: "Une compagnie de bus interroge ses voyageurs.", pop: "voyageurs", l: ["réguliers", "occasionnels"], c: ["avec une carte", "sans carte"] },
  { s: "Un site de vente observe ses commandes.", pop: "commandes", l: ["payées par carte", "payées autrement"], c: ["livrées à domicile", "livrées en point relais"] },
  { s: "Un musée étudie ses visiteurs.", pop: "visiteurs", l: ["français", "étrangers"], c: ["venus en groupe", "venus seuls"] },
  { s: "Un agriculteur classe ses parcelles.", pop: "parcelles", l: ["irriguées", "non irriguées"], c: ["en légumes", "en céréales"] },
];

/** Un tableau 2 × 2 dont les marges sont des totaux « ronds » : les fréquences tombent juste. */
const TAILLES = [20, 25, 40, 50, 60, 75, 80, 100, 120, 125, 150, 160, 200, 240, 250, 300, 375, 400, 500];
type Tab = { x: Ctx; m: number[][]; ligne: number[]; col: number[]; N: number };
function tableau(): Tab {
  const x = un(CTX);
  for (;;) {
    const l1 = un(TAILLES);
    const l2 = un(TAILLES);
    const a = entre(1, l1 - 1);
    const b = entre(1, l2 - 1);
    const N = l1 + l2;
    const c1 = a + b;
    const c2 = N - c1;
    const juste = (n: number, d: number) => Math.abs(((n / d) * 1000) - Math.round((n / d) * 1000)) < 1e-9;
    if (![[a, l1], [b, l2], [l1, N], [c1, N], [a, c1], [a, N]].every(([p, q]) => juste(p, q))) continue;
    if (c1 === c2 || l1 === l2 || a * 2 === l1 || b * 2 === l2) continue;
    return { x, m: [[a, l1 - a], [b, l2 - b]], ligne: [l1, l2], col: [c1, c2], N };
  }
}
const TOTAL = "Total";
function fig(t: Tab, cache?: [number, number]): TableauDonneesCanvasData {
  const lignes: (string | number)[][] = [
    [cap(t.x.l[0]), t.m[0][0], t.m[0][1], t.ligne[0]],
    [cap(t.x.l[1]), t.m[1][0], t.m[1][1], t.ligne[1]],
    [TOTAL, t.col[0], t.col[1], t.N],
  ];
  if (cache) lignes[cache[0]][cache[1] + 1] = "?";
  return { kind: "tableau_donnees", headers: ["", cap(t.x.c[0]), cap(t.x.c[1]), TOTAL], rows: lignes.map((v) => ({ values: v })) };
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const INTRO = (t: Tab) => un([`${t.x.s} Voici le tableau croisé.`, `${t.x.s} Les résultats sont dans ce tableau croisé d'effectifs.`, `${t.x.s} Le tableau ci-dessous croise les deux critères.`]);
const DEF_MARG = "une fréquence marginale compare le total d'une ligne ou d'une colonne à l'effectif total.";
const DEF_COND = "la fréquence conditionnelle de $B$ parmi $A$ est l'effectif de « $A$ et $B$ » divisé par l'effectif de $A$.";
const pct = (v: number) => [`${fr(v * 100)} %`, `${fr(v * 100)}%`];

export const croisementVariablesBank: TutorBankItemV4[] = [
  /* ===== croise_completer_tableau ===== */
  tpl("croise_completer_tableau", 1, 1, "Dans une ligne, cellule + cellule = total.", () => {
    const t = tableau();
    const i = entre(0, 1);
    const j = entre(0, 1);
    return court(`${INTRO(t)} ${un(["Quelle est la valeur de la case marquée « ? » ?", "Par quel nombre remplacer le « ? » ?", "Complète la case manquante.", "Combien vaut la case « ? » ?"])}`, t.m[i][j], expl("dans un tableau croisé, la somme des cases d'une ligne ou d'une colonne donne son total.", "on utilise la ligne de la case manquante.", `$${t.ligne[i]} - ${t.m[i][1 - j]} = ${t.m[i][j]}$.`, `la case vaut $${t.m[i][j]}$.`), fig(t, [i, j]));
  }),
  tpl("croise_completer_tableau", 2, 1, "L'effectif total est la somme de la ligne (ou de la colonne) des totaux.", () => {
    const t = tableau();
    const quoi = un<[number, number]>([[0, 2], [1, 2], [2, 0], [2, 1], [2, 2]]);
    const v = quoi[0] === 2 ? (quoi[1] === 2 ? t.N : t.col[quoi[1]]) : t.ligne[quoi[0]];
    const calc = quoi[0] === 2 ? (quoi[1] === 2 ? `$${t.col[0]} + ${t.col[1]}$` : `$${t.m[0][quoi[1]]} + ${t.m[1][quoi[1]]}$`) : `$${t.m[quoi[0]][0]} + ${t.m[quoi[0]][1]}$`;
    return court(`${INTRO(t)} ${un(["Quel total manque ?", "Par quel nombre remplacer le « ? » ?", "Calcule le total marqué « ? »."])}`, v, expl("un total est la somme des cases de sa ligne ou de sa colonne.", "on additionne les deux cases concernées.", `${calc} $= ${v}$.`, `le total vaut $${v}$.`), fig(t, quoi));
  }),
  tpl("croise_completer_tableau", 3, 2, "Utilise les totaux de ligne et de colonne, dans le bon ordre.", () => {
    const t = tableau();
    const fig0: TableauDonneesCanvasData = {
      kind: "tableau_donnees",
      headers: ["", cap(t.x.c[0]), cap(t.x.c[1]), TOTAL],
      rows: [
        { values: [cap(t.x.l[0]), t.m[0][0], "", t.ligne[0]] },
        { values: [cap(t.x.l[1]), "?", "", ""] },
        { values: [TOTAL, t.col[0], "", t.N] },
      ],
    };
    return court(`${INTRO(t)} ${un(["Le tableau est incomplet. Quelle est la valeur de la case « ? » ?", "Il manque des cases. Que vaut la case « ? » ?", "Remplace le « ? » à l'aide de la colonne qui le contient."])}`, t.m[1][0], expl("la somme d'une colonne donne son total.", "on regarde la colonne de la case cherchée.", `$${t.col[0]} - ${t.m[0][0]} = ${t.m[1][0]}$.`, `la case vaut $${t.m[1][0]}$.`), fig0);
  }),
  tpl("croise_completer_tableau", 4, 2, "Traduis les phrases en cases du tableau.", () => {
    const t = tableau();
    return court(`${t.x.s} Sur ${t.N} ${t.x.pop}, ${t.ligne[0]} sont ${t.x.l[0]} ; dans ce groupe, ${t.m[0][0]} sont ${t.x.c[0]}. En tout, ${t.col[0]} ${t.x.pop} sont ${t.x.c[0]}. ${un([`Combien ${de(t.x.pop)} sont ${t.x.l[1]} et ${t.x.c[0]} ?`, `Quel est le nombre ${de(t.x.pop)} ${t.x.l[1]} et ${t.x.c[0]} ?`, `Parmi les ${t.x.pop} ${t.x.c[0]}, combien sont ${t.x.l[1]} ?`])}`, t.m[1][0], expl("on range les informations dans un tableau croisé.", "on complète la colonne concernée.", `$${t.col[0]} - ${t.m[0][0]} = ${t.m[1][0]}$.`, `il y en a $${t.m[1][0]}$.`));
  }),
  tpl("croise_completer_tableau", 5, 3, "Commence par les pourcentages : chacun donne une case.", () => {
    const x = un(CTX);
    const N = un([200, 400, 500, 800]);
    const pL = un([20, 25, 40, 50, 60, 75]);
    const l1 = (N * pL) / 100;
    const pC = un([10, 20, 30, 40, 50].filter((v) => Number.isInteger((l1 * v) / 100)));
    const a = (l1 * pC) / 100;
    return court(`${x.s} Sur ${N} ${x.pop}, ${pL} % sont ${x.l[0]} ; dans ce groupe, ${pC} % sont ${x.c[0]}. ${un([`Combien ${de(x.pop)} sont à la fois ${x.l[0]} et ${x.c[0]} ?`, `Dans le tableau croisé, quel nombre écrire à la case « ${x.l[0]} et ${x.c[0]} » ?`, `Quel est l'effectif de la case « ${x.l[0]} et ${x.c[0]} » ?`])}`, a, expl("un pourcentage d'un pourcentage se calcule en deux étapes.", "on calcule d'abord le total de la ligne, puis la case.", `$${pL}$ % de $${N}$ font $${l1}$ ; $${pC}$ % de $${l1}$ font $${a}$.`, `la case vaut $${a}$.`));
  }),
  tpl("croise_completer_tableau", 6, 3, "Commence par les pourcentages : chacun donne une case, puis retranche.", () => {
    const x = un(CTX);
    const N = un([200, 400, 500, 800]);
    const pL = un([20, 25, 40, 50, 60, 75]);
    const l1 = (N * pL) / 100;
    const pC = un([10, 20, 30, 40, 50].filter((v) => Number.isInteger((l1 * v) / 100)));
    const a = (l1 * pC) / 100;
    return court(`${x.s} Sur ${N} ${x.pop}, ${pL} % sont ${x.l[0]} ; dans ce groupe, ${pC} % sont ${x.c[0]}. ${un([`Combien ${de(x.pop)} ${x.l[0]} ne sont pas ${x.c[0]} ?`, `Parmi les ${x.pop} ${x.l[0]}, combien ne sont pas ${x.c[0]} ?`])}`, l1 - a, expl("on raisonne dans la ligne concernée.", "on calcule le total de la ligne, puis on retire la case connue.", `$${l1} - ${a} = ${l1 - a}$.`, `il y en a $${l1 - a}$.`));
  }),

  /* ===== croise_frequence_marginale ===== */
  tpl("croise_frequence_marginale", 1, 1, "Total de la ligne ÷ effectif total.", () => {
    const t = tableau();
    const i = entre(0, 1);
    return court(phrase([INTRO(t)], [`Quelle est la fréquence marginale des ${t.x.pop} ${t.x.l[i]} ?`, `Calcule la fréquence des ${t.x.pop} ${t.x.l[i]}, sur l'ensemble des ${t.x.pop}.`, `Sur l'ensemble des ${t.x.pop}, quelle part sont ${t.x.l[i]} ? (Réponds en décimal.)`]), t.ligne[i] / t.N, expl(DEF_MARG, "on divise le total de la ligne par l'effectif total.", `$${t.ligne[i]} \\div ${t.N} = ${nL(t.ligne[i] / t.N)}$.`, `la fréquence marginale vaut $${nL(t.ligne[i] / t.N)}$.`), fig(t), pct(t.ligne[i] / t.N));
  }),
  tpl("croise_frequence_marginale", 2, 1, "Total de la colonne ÷ effectif total.", () => {
    const t = tableau();
    return court(phrase([INTRO(t)], [`Quelle est la fréquence marginale des ${t.x.pop} ${t.x.c[0]} ?`, `Calcule la fréquence des ${t.x.pop} ${t.x.c[0]}, sur l'ensemble des ${t.x.pop}.`, `Sur l'ensemble des ${t.x.pop}, quelle part sont ${t.x.c[0]} ? (Réponds en décimal.)`]), t.col[0] / t.N, expl(DEF_MARG, "on divise le total de la colonne par l'effectif total.", `$${t.col[0]} \\div ${t.N} = ${nL(t.col[0] / t.N)}$.`, `la fréquence marginale vaut $${nL(t.col[0] / t.N)}$.`), fig(t), pct(t.col[0] / t.N));
  }),
  tpl("croise_frequence_marginale", 3, 2, "Une fréquence marginale utilise toujours l'effectif total au dénominateur.", () => {
    const t = tableau();
    const f = (a: number, b: number) => `$\\dfrac{${a}}{${b}}$`;
    return qcm(`${INTRO(t)} ${un([`Quel calcul donne la fréquence marginale des ${t.x.pop} ${t.x.c[0]} ?`, `Pour trouver la part ${de(t.x.pop)} ${t.x.c[0]} dans l'ensemble, quel calcul faire ?`, `Quelle fraction donne la fréquence marginale des ${t.x.pop} ${t.x.c[0]} ?`])}`, f(t.col[0], t.N), [f(t.m[0][0], t.ligne[0]), f(t.m[0][0], t.col[0]), f(t.m[0][0], t.N), f(t.col[0], t.ligne[0])], expl(DEF_MARG, "on prend le total de la colonne sur l'effectif total.", `$${t.col[0]}$ et $${t.N}$.`, `le calcul est ${f(t.col[0], t.N)}.`), fig(t));
  }),
  tpl("croise_frequence_marginale", 4, 2, "Un tableau croisé peut donner la part de la case dans le total : c'est la fréquence conjointe, pas marginale.", () => {
    const t = tableau();
    return court(phrase([INTRO(t)], [`Sur l'ensemble des ${t.x.pop}, quelle part sont à la fois ${t.x.l[0]} et ${t.x.c[0]} ? (Réponds en décimal.)`, `Calcule la fréquence des ${t.x.pop} à la fois ${t.x.l[0]} et ${t.x.c[0]}, sur l'ensemble des ${t.x.pop}.`]), t.m[0][0] / t.N, expl("cette part compare une case à l'effectif total.", "on divise la case par l'effectif total.", `$${t.m[0][0]} \\div ${t.N} = ${nL(t.m[0][0] / t.N)}$.`, `la fréquence vaut $${nL(t.m[0][0] / t.N)}$.`), fig(t), pct(t.m[0][0] / t.N));
  }),
  tpl("croise_frequence_marginale", 5, 3, "Calcule les deux fréquences marginales, puis compare.", () => {
    const t = tableau();
    const [f0, f1] = [t.col[0] / t.N, t.col[1] / t.N];
    const j = f0 > f1 ? t.x.c[0] : t.x.c[1];
    const n = f0 > f1 ? t.x.c[1] : t.x.c[0];
    return qcm(`${INTRO(t)} ${un(["Quelle affirmation est juste ?", "Que peut-on conclure sur l'ensemble ?", "Laquelle de ces phrases résume bien le tableau ?"])}`, `Une majorité des ${t.x.pop} sont ${j}.`, [`Une majorité des ${t.x.pop} sont ${n}.`, `Exactement la moitié des ${t.x.pop} sont ${j}.`, `Tous les ${t.x.pop} ${t.x.l[0]} sont ${j}.`], expl(DEF_MARG, "on compare les deux totaux de colonnes à l'effectif total.", `$${t.col[0]} \\div ${t.N} = ${nL(f0)}$ et $${t.col[1]} \\div ${t.N} = ${nL(f1)}$.`, `une majorité des ${t.x.pop} sont ${j}.`), fig(t));
  }),
  tpl("croise_frequence_marginale", 6, 3, "Passe en pourcentage, puis applique à un nouvel effectif.", () => {
    const t = tableau();
    const f = t.ligne[0] / t.N;
    const M = un([1000, 2000, 5000, 10000]);
    const n = f * M;
    return court(`${INTRO(t)} ${un([`On suppose que cette fréquence marginale reste la même sur un groupe de ${mil(M)} ${t.x.pop}. Combien seraient ${t.x.l[0]} ?`, `Si on garde la même part sur ${mil(M)} ${t.x.pop}, combien seraient ${t.x.l[0]} ?`])}`, n, expl(DEF_MARG, "on calcule la fréquence marginale, puis on multiplie par le nouvel effectif.", `$${t.ligne[0]} \\div ${t.N} = ${nL(f)}$ et $${nL(f)} \\times ${M} = ${n}$.`, `on en attend $${n}$.`), fig(t));
  }),

  /* ===== croise_frequence_conditionnelle ===== */
  tpl("croise_frequence_conditionnelle", 1, 1, "« Parmi les A » : le dénominateur est le total de la ligne A.", () => {
    const t = tableau();
    const i = entre(0, 1);
    return court(phrase([INTRO(t)], [`Parmi les ${t.x.pop} ${t.x.l[i]}, quelle est la fréquence des ${t.x.pop} ${t.x.c[0]} ? (Réponds en décimal.)`, `Quelle est la fréquence conditionnelle des ${t.x.pop} ${t.x.c[0]} parmi les ${t.x.pop} ${t.x.l[i]} ?`, `Chez les ${t.x.pop} ${t.x.l[i]}, quelle part sont ${t.x.c[0]} ? (Réponds en décimal.)`]), t.m[i][0] / t.ligne[i], expl(DEF_COND, "on divise la case par le total de la ligne.", `$${t.m[i][0]} \\div ${t.ligne[i]} = ${nL(t.m[i][0] / t.ligne[i])}$.`, `la fréquence vaut $${nL(t.m[i][0] / t.ligne[i])}$.`), fig(t), pct(t.m[i][0] / t.ligne[i]));
  }),
  tpl("croise_frequence_conditionnelle", 2, 1, "« Parmi les B » : le dénominateur est le total de la colonne B.", () => {
    const t = tableau();
    return court(phrase([INTRO(t)], [`Parmi les ${t.x.pop} ${t.x.c[0]}, quelle est la fréquence des ${t.x.pop} ${t.x.l[0]} ? (Réponds en décimal.)`, `Quelle est la fréquence conditionnelle des ${t.x.pop} ${t.x.l[0]} parmi les ${t.x.pop} ${t.x.c[0]} ?`, `Chez les ${t.x.pop} ${t.x.c[0]}, quelle part sont ${t.x.l[0]} ? (Réponds en décimal.)`]), t.m[0][0] / t.col[0], expl(DEF_COND, "on divise la case par le total de la colonne.", `$${t.m[0][0]} \\div ${t.col[0]} = ${nL(t.m[0][0] / t.col[0])}$.`, `la fréquence vaut $${nL(t.m[0][0] / t.col[0])}$.`), fig(t), pct(t.m[0][0] / t.col[0]));
  }),
  tpl("croise_frequence_conditionnelle", 3, 2, "Repère le « parmi » : il donne le dénominateur.", () => {
    const t = tableau();
    const f = (a: number, b: number) => `$\\dfrac{${a}}{${b}}$`;
    return qcm(`${INTRO(t)} ${un([`Quel calcul donne la fréquence des ${t.x.pop} ${t.x.c[0]} parmi les ${t.x.pop} ${t.x.l[0]} ?`, `Parmi les ${t.x.pop} ${t.x.l[0]}, on veut la part ${de(t.x.pop)} ${t.x.c[0]}. Quel calcul faire ?`, `Quelle fraction donne la fréquence conditionnelle des ${t.x.pop} ${t.x.c[0]} parmi les ${t.x.pop} ${t.x.l[0]} ?`])}`, f(t.m[0][0], t.ligne[0]), [f(t.m[0][0], t.col[0]), f(t.m[0][0], t.N), f(t.ligne[0], t.N), f(t.col[0], t.N), f(t.m[0][1], t.ligne[0]), f(t.m[1][0], t.ligne[1])], expl(DEF_COND, "on prend la case, et le total de la ligne au dénominateur.", `$${t.m[0][0]}$ et $${t.ligne[0]}$.`, `le calcul est ${f(t.m[0][0], t.ligne[0])}.`), fig(t));
  }),
  tpl("croise_frequence_conditionnelle", 4, 2, "Compare les deux fréquences conditionnelles, pas les effectifs.", () => {
    let t = tableau();
    while (t.m[0][0] / t.ligne[0] === t.m[1][0] / t.ligne[1]) t = tableau();
    const [a, b] = [t.m[0][0] / t.ligne[0], t.m[1][0] / t.ligne[1]];
    const g = a > b ? 0 : 1;
    return qcm(`${INTRO(t)} ${un([`Dans quel groupe la part ${de(t.x.pop)} ${t.x.c[0]} est-elle la plus forte ?`, `Quel groupe compte proportionnellement le plus ${de(t.x.pop)} ${t.x.c[0]} ?`, `Où la fréquence des ${t.x.pop} ${t.x.c[0]} est-elle la plus élevée ?`])}`, `Chez les ${t.x.pop} ${t.x.l[g]}`, [`Chez les ${t.x.pop} ${t.x.l[1 - g]}`, "La part est la même dans les deux groupes", "On ne peut pas comparer des groupes de tailles différentes"], expl(DEF_COND, "on calcule la fréquence dans chaque ligne.", `$${t.m[0][0]} \\div ${t.ligne[0]} = ${nL(a)}$ et $${t.m[1][0]} \\div ${t.ligne[1]} = ${nL(b)}$.`, `la part est plus forte chez les ${t.x.pop} ${t.x.l[g]}.`), fig(t));
  }),
  tpl("croise_frequence_conditionnelle", 5, 3, "Traduis la phrase : quel est l'ensemble de référence ?", () => {
    const t = tableau();
    const v = t.m[0][0] / t.ligne[0];
    const p = nL(v * 100);
    return qcm(`${INTRO(t)} ${un(["Laquelle de ces phrases est juste ?", "Quelle interprétation est correcte ?", "Quelle phrase traduit bien le tableau ?"])}`, `$${p}$ % des ${t.x.pop} ${t.x.l[0]} sont ${t.x.c[0]}.`, [`$${p}$ % des ${t.x.pop} sont ${t.x.l[0]} et ${t.x.c[0]}.`, `$${p}$ % des ${t.x.pop} ${t.x.c[0]} sont ${t.x.l[0]}.`, `$${p}$ % des ${t.x.pop} sont ${t.x.c[0]}.`, `$${p}$ % des ${t.x.pop} ${t.x.l[0]} ne sont pas ${t.x.c[0]}.`, `$${p}$ % des ${t.x.pop} ${t.x.c[0]} ne sont pas ${t.x.l[0]}.`].filter((_, i) => [t.m[0][0] / t.N, t.m[0][0] / t.col[0], t.col[0] / t.N, 1 - v, 1 - t.m[0][0] / t.col[0]][i] !== v), expl(DEF_COND, "on identifie l'ensemble de référence : le total de la ligne.", `$${t.m[0][0]} \\div ${t.ligne[0]} = ${nL(v)}$.`, `$${p}$ % des ${t.x.pop} ${t.x.l[0]} sont ${t.x.c[0]}.`), fig(t));
  }),
  tpl("croise_frequence_conditionnelle", 6, 3, "Le « contraire » dans la même ligne : 1 − la fréquence.", () => {
    const t = tableau();
    const i = entre(0, 1);
    const v = t.m[i][1] / t.ligne[i];
    return court(`${INTRO(t)} ${un([`La fréquence des ${t.x.pop} ${t.x.c[0]} parmi les ${t.x.pop} ${t.x.l[i]} vaut $${nL(t.m[i][0] / t.ligne[i])}$. Que vaut, dans ce même groupe, la fréquence des ${t.x.pop} ${t.x.c[1]} ? (Réponds en décimal.)`, `Parmi les ${t.x.pop} ${t.x.l[i]}, la fréquence des ${t.x.pop} ${t.x.c[0]} est $${nL(t.m[i][0] / t.ligne[i])}$. Déduis-en celle des ${t.x.pop} ${t.x.c[1]}, en décimal.`])}`, v, expl(DEF_COND, "dans un même groupe, les deux fréquences font $1$.", `$1 - ${nL(t.m[i][0] / t.ligne[i])} = ${nL(v)}$.`, `la fréquence vaut $${nL(v)}$.`), fig(t), pct(v));
  }),
];
