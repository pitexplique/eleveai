// STATISTIQUES EN CLASSES, PROGRAMME 2026 DE SECONDE (05/11/2026) : histogramme,
// polygone des fréquences cumulées, médiane estimée « dans le cas de répartition
// uniforme dans la classe médiane ». Rien de tout cela n'avait de question.
// Les nombres se LISENT sur le dessin, qui n'écrit aucune valeur.

import type { StatGraphCanvasData, TableauDonneesCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, nL, qcm, un } from "../../lycee-commun";
import { CTX_STATS, classeL, gabaritsHistogramme, inf, unCar, type CtxStat } from "../../lycee-stats-commun";

const tpl = fabrique("seconde", "statistiques_descriptives", "2de_");

/* ───── polygone des fréquences cumulées ───── */
type Poly = { c: CtxStat; b: number[]; F: number[] };
/** `exige` : les valeurs à placer exactement sur un sommet du polygone. */
function polygone(exige: number[], interdit: number[] = []): Poly {
  const c = un(CTX_STATS);
  for (;;) {
    const m = entre(4, 6);
    const F = [0];
    while (F.length < m) F.push(F[F.length - 1] + 5 * entre(1, 6));
    F.push(100);
    if (F.some((v, i) => i && v <= F[i - 1]) || F[m - 1] >= 100) continue;
    if (!exige.every((v) => F.includes(v)) || interdit.some((v) => F.includes(v))) continue;
    return { c, b: Array.from({ length: m + 1 }, (_, i) => c.d + i * c.h), F };
  }
}
const figPoly = (p: Poly): StatGraphCanvasData => ({
  kind: "stat_graph",
  graphType: "courbe",
  size: { width: 360, height: 250 },
  data: p.F.map((v, i) => ({ label: String(p.b[i]), value: v })),
  display: { showValues: false, showLabels: true, showAxis: true, step: 10, axeY: "fréquences cumulées (%)" },
});
const INTRO_P = (p: Poly) => un([`${p.c.s} Voici le polygone des fréquences cumulées croissantes (${p.c.car}, en ${p.c.u}).`, `${p.c.s} Le graphique donne le polygone des fréquences cumulées (${p.c.car}, en ${p.c.u}).`, `${p.c.s} On a tracé le polygone des fréquences cumulées croissantes de la série (${p.c.car}, en ${p.c.u}).`]);
const DEF_P = "un point du polygone d'abscisse $x$ indique le pourcentage de valeurs strictement inférieures à $x$.";
const LISTE = (p: Poly) => p.b.map((x, i) => `$${x}$ : $${p.F[i]}$ %`).join(" ; ");

/* ───── série en classes pour la médiane estimée ───── */
type Med = { c: CtxStat; b: number[]; e: number[]; N: number; k: number; avant: number; med: number };
function serieMediane(): Med {
  const c = un(CTX_STATS);
  for (;;) {
    const m = entre(4, 6);
    const N = un([40, 50, 60, 80, 100, 120, 200]);
    const e: number[] = [];
    let reste = N;
    for (let i = 0; i < m - 1; i++) {
      const v = entre(1, Math.floor((2 * reste) / (m - i)) || 1);
      e.push(v);
      reste -= v;
    }
    if (reste < 1) continue;
    e.push(reste);
    let cumul = 0;
    let k = 0;
    while (cumul + e[k] <= N / 2) cumul += e[k++];
    if (cumul === N / 2 || cumul === 0) continue;
    const med = c.d + k * c.h + ((N / 2 - cumul) / e[k]) * c.h;
    if (Math.abs(med * 100 - Math.round(med * 100)) > 1e-9) continue;
    return { c, b: Array.from({ length: m + 1 }, (_, i) => c.d + i * c.h), e, N, k, avant: cumul, med };
  }
}
const tableM = (s: Med): TableauDonneesCanvasData => ({
  kind: "tableau_donnees",
  headers: [`${s.c.car} (${s.c.u})`, "effectif"],
  rows: s.e.map((v, i) => ({ values: [`[${s.b[i]} ; ${s.b[i + 1]}[`, v] })),
});
const INTRO_M = (s: Med) => un([`${s.c.s} Le tableau donne la répartition par classes de ${s.N} ${s.c.pop}.`, `${s.c.s} Le tableau regroupe ces ${s.N} données par classes.`, `${s.c.s} On dispose du tableau ci-contre, pour un effectif total de ${s.N}.`]);
const DEF_M = "la classe médiane est celle qui contient la valeur de rang $N \\div 2$ ; si les valeurs y sont réparties uniformément, on place la médiane proportionnellement dans la classe.";
const explM = (s: Med) =>
  expl(
    DEF_M,
    "on cumule les effectifs jusqu'à la classe médiane, puis on avance dans cette classe de la part qui manque pour atteindre la moitié.",
    `moitié : $${s.N / 2}$. Avant la classe ${classeL(s.b[s.k], s.b[s.k + 1])} : $${s.avant}$ valeurs ; il en manque $${s.N / 2 - s.avant}$ sur $${s.e[s.k]}$. Médiane : $${s.b[s.k]} + \\dfrac{${s.N / 2 - s.avant}}{${s.e[s.k]}} \\times ${s.c.h} = ${nL(s.med)}$.`,
    `la médiane estimée est $${nL(s.med)}$ ${s.c.u}.`,
  );

export const statistiquesClassesBank: TutorBankItemV4[] = [
  ...gabaritsHistogramme(tpl, "stat_histogramme"),

  /* ===== stat_polygone_cumule ===== */
  tpl("stat_polygone_cumule", 1, 1, "Lis l'ordonnée du point du polygone.", () => {
    const p = polygone([]);
    const i = entre(1, p.F.length - 2);
    return court(`${INTRO_P(p)} ${un(["Quel pourcentage des", "Quelle part, en %, des"])} ${p.c.pop} a ${unCar(p.c)} strictement ${inf(p.c)} à $${p.b[i]}$ ${p.c.u} ?`, p.F[i], expl(DEF_P, "on lit l'ordonnée du point d'abscisse donnée.", `au point d'abscisse $${p.b[i]}$, on lit $${p.F[i]}$ %.`, `cela représente $${p.F[i]}$ %.`), figPoly(p), [`${p.F[i]} %`, `${p.F[i]}%`]);
  }),
  tpl("stat_polygone_cumule", 2, 1, "« Au moins x » est le contraire de « moins de x » : 100 − la lecture.", () => {
    const p = polygone([]);
    const i = entre(1, p.F.length - 2);
    return court(`${INTRO_P(p)} ${un(["Quel pourcentage des", "Quelle part, en %, des"])} ${p.c.pop} a ${unCar(p.c)} d'au moins $${p.b[i]}$ ${p.c.u} ?`, 100 - p.F[i], expl(DEF_P, "on lit le pourcentage de valeurs inférieures, puis on prend le complément à 100.", `$100 - ${p.F[i]} = ${100 - p.F[i]}$.`, `cela représente $${100 - p.F[i]}$ %.`), figPoly(p), [`${100 - p.F[i]} %`, `${100 - p.F[i]}%`]);
  }),
  tpl("stat_polygone_cumule", 3, 2, "La médiane est l'abscisse du point d'ordonnée 50 %.", () => {
    const p = polygone([50]);
    const x = p.b[p.F.indexOf(50)];
    return court(`${INTRO_P(p)} ${un(["Lis graphiquement la médiane de cette série.", "Quelle est la médiane de la série ?", "Quelle valeur la moitié des " + p.c.pop + " n'atteint-elle pas ?"])}`, x, expl("la médiane partage la série en deux parts égales.", "on cherche le point d'ordonnée $50$ %, puis on lit son abscisse.", `ce point a pour abscisse $${x}$.`, `la médiane est $${x}$ ${p.c.u}.`), figPoly(p));
  }),
  tpl("stat_polygone_cumule", 4, 2, "Q1 se lit à 25 %, Q3 à 75 %.", () => {
    const quel = un([25, 75]);
    const p = polygone([quel]);
    const x = p.b[p.F.indexOf(quel)];
    const nom = quel === 25 ? "premier quartile $Q_1$" : "troisième quartile $Q_3$";
    return court(`${INTRO_P(p)} ${un([`Lis graphiquement le ${nom}.`, `Quelle est la valeur du ${nom} ?`, `Détermine le ${nom} de la série.`])}`, x, expl(`$Q_1$ se lit à $25$ %, $Q_3$ à $75$ %.`, `on cherche le point d'ordonnée $${quel}$ %.`, `son abscisse est $${x}$.`, `le ${nom} vaut $${x}$ ${p.c.u}.`), figPoly(p));
  }),
  tpl("stat_polygone_cumule", 5, 3, "La médiane est entre deux sommets : le polygone est droit entre eux, on calcule proportionnellement.", () => {
    let p = polygone([], [50]);
    const val = (t: Poly) => {
      const i = t.F.findIndex((v) => v > 50) - 1;
      return { i, x: t.b[i] + ((50 - t.F[i]) / (t.F[i + 1] - t.F[i])) * t.c.h };
    };
    while (Math.abs(val(p).x * 100 - Math.round(val(p).x * 100)) > 1e-9) p = polygone([], [50]);
    const { i, x } = val(p);
    return court(`${INTRO_P(p)} ${un(["Les valeurs lues aux sommets sont :", "Aux sommets, on lit :"])} ${LISTE(p)}. ${un(["Calcule la médiane sur le segment où le polygone franchit $50$ %.", "En suivant le segment qui franchit $50$ %, quelle est la médiane ?", "Par proportionnalité sur le segment qui franchit $50$ %, quelle médiane obtient-on ?"])}`, x, expl("sur un segment du polygone, la fréquence cumulée varie proportionnellement à la valeur.", `le polygone franchit $50$ % entre $${p.b[i]}$ et $${p.b[i + 1]}$.`, `$${p.b[i]} + \\dfrac{50 - ${p.F[i]}}{${p.F[i + 1]} - ${p.F[i]}} \\times ${p.c.h} = ${nL(x)}$.`, `la médiane vaut $${nL(x)}$ ${p.c.u}.`), figPoly(p));
  }),
  tpl("stat_polygone_cumule", 6, 3, "Dans une classe, la part de valeurs est la différence entre deux lectures.", () => {
    const p = polygone([]);
    const i = entre(0, p.F.length - 2);
    const v = p.F[i + 1] - p.F[i];
    const N = un([200, 400, 500, 800]);
    const n = (v * N) / 100;
    return court(`${INTRO_P(p)} ${un([`Il y a ${N} ${p.c.pop} en tout. Combien sont dans la classe`, `L'étude porte sur ${N} ${p.c.pop}. Combien appartiennent à la classe`])} ${classeL(p.b[i], p.b[i + 1])} ?`, n, expl(DEF_P, "la fréquence d'une classe est la différence des fréquences cumulées à ses deux bornes.", `$${p.F[i + 1]} - ${p.F[i]} = ${v}$ % ; $${v}$ % de $${N}$ font $${n}$.`, `il y en a $${n}$.`), figPoly(p));
  }),

  /* ===== stat_mediane_estimee ===== */
  tpl("stat_mediane_estimee", 1, 1, "Cumule les effectifs jusqu'à dépasser la moitié de l'effectif total.", () => {
    const s = serieMediane();
    const ch = s.b.slice(0, -1).map((x, i) => classeL(x, s.b[i + 1]));
    return qcm(`${INTRO_M(s)} ${un(["Quelle est la classe médiane ?", "Dans quelle classe se trouve la médiane ?", "Quelle classe contient la valeur du milieu ?"])}`, ch[s.k], ch.filter((_, i) => i !== s.k), expl(DEF_M, "on cumule les effectifs jusqu'à dépasser $N \\div 2$.", `moitié : $${s.N / 2}$ ; avant cette classe, on a $${s.avant}$ valeurs ; avec elle, $${s.avant + s.e[s.k]}$.`, `la classe médiane est ${ch[s.k]}.`), tableM(s));
  }),
  tpl("stat_mediane_estimee", 2, 1, "Additionne les effectifs des classes situées avant la classe médiane.", () => {
    const s = serieMediane();
    return court(`${INTRO_M(s)} ${un(["Combien de valeurs sont situées avant la classe médiane ?", "Quel est l'effectif cumulé juste avant la classe médiane ?", "Combien de valeurs précèdent la classe médiane ?"])}`, s.avant, expl(DEF_M, "on repère la classe médiane, puis on additionne les effectifs des classes précédentes.", `moitié : $${s.N / 2}$ ; la classe médiane est ${classeL(s.b[s.k], s.b[s.k + 1])}.`, `il y a $${s.avant}$ valeurs avant elle.`), tableM(s));
  }),
  tpl("stat_mediane_estimee", 3, 2, "Médiane = début de la classe + (ce qui manque ÷ effectif de la classe) × amplitude.", () => {
    const s = serieMediane();
    return court(`${INTRO_M(s)} ${un(["On suppose les valeurs réparties uniformément dans la classe médiane. Estime la médiane.", "Avec une répartition uniforme dans la classe médiane, quelle médiane obtient-on ?", "En supposant une répartition uniforme dans chaque classe, quelle est la médiane estimée ?"])}`, s.med, explM(s), tableM(s));
  }),
  tpl("stat_mediane_estimee", 4, 2, "Quelle fraction de la classe médiane faut-il parcourir pour atteindre la moitié ?", () => {
    const s = serieMediane();
    const manque = s.N / 2 - s.avant;
    return court(`${INTRO_M(s)} ${un(["Pour atteindre la moitié de l'effectif, combien de valeurs de la classe médiane faut-il encore compter ?", "Une fois arrivé à la classe médiane, combien de valeurs manque-t-il pour atteindre la moitié de l'effectif ?", "Combien de valeurs de la classe médiane faut-il prendre pour arriver au milieu de la série ?"])}`, manque, explM(s), tableM(s));
  }),
  tpl("stat_mediane_estimee", 5, 3, "Répartition uniforme : tu places la médiane au prorata dans la classe.", () => {
    const s = serieMediane();
    const c = un(["Le rapport doit citer une médiane.", "Une affiche doit donner une valeur centrale.", "Un article demande une valeur typique.", "Le service veut comparer avec l'année dernière."]);
    return court(`${INTRO_M(s)} ${c} ${un(["Estime la médiane, avec une répartition uniforme dans la classe médiane.", "Quelle médiane annoncer, en supposant une répartition uniforme dans la classe médiane ?"])}`, s.med, explM(s), tableM(s));
  }),
  tpl("stat_mediane_estimee", 6, 3, "Compare l'effectif de la classe à ce qui reste : si les valeurs sont uniformes, la part est proportionnelle à la longueur.", () => {
    const s = serieMediane();
    const frac = un([0.25, 0.5, 0.75]);
    // Une classe où cette part tombe sur un nombre entier de valeurs.
    const ks = s.e.map((_, i) => i).filter((i) => Number.isInteger(s.e[i] * frac) && s.e[i] * frac > 0);
    if (!ks.length) return court(`${INTRO_M(s)} ${un(["On suppose les valeurs réparties uniformément dans la classe médiane. Estime la médiane.", "Avec une répartition uniforme dans la classe médiane, quelle médiane obtient-on ?"])}`, s.med, explM(s), tableM(s));
    const k = un(ks);
    const x = s.b[k] + frac * s.c.h;
    const n = s.e[k] * frac;
    return court(`${INTRO_M(s)} ${un(["Les valeurs sont réparties uniformément dans chaque classe.", "On suppose une répartition uniforme dans chaque classe."])} ${un(["Combien de valeurs estime-t-on entre", "Quel effectif estime-t-on entre"])} $${s.b[k]}$ et $${nL(x)}$ ${s.c.u} ?`, n, expl("répartition uniforme : le nombre de valeurs est proportionnel à la longueur de l'intervalle.", `$${nL(x)}$ est aux $${nL(frac * 100)}$ % de la classe ${classeL(s.b[k], s.b[k + 1])}.`, `$${s.e[k]} \\times ${nL(frac)} = ${nL(n)}$.`, `on estime $${nL(n)}$ valeurs.`), tableM(s));
  }),
];
