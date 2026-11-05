// STATISTIQUES EN CLASSES AU LYCÉE (05/11/2026) : lire un histogramme. Programme 2026
// de seconde (histogramme, polygone, médiane estimée) et automatismes de première.
// Le dessin n'écrit jamais les effectifs : on LIT sur l'axe gradué (`showValues: false`).

import type { StatGraphCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, de, entre, expl, fr, nL, qcm, un } from "./lycee-commun";

export type CtxStat = { s: string; pop: string; car: string; u: string; d: number; h: number };
export const CTX_STATS: CtxStat[] = [
  { s: "Une entraîneuse de basket mesure la taille de ses joueuses.", pop: "joueuses", car: "taille", u: "cm", d: 160, h: 5 },
  { s: "Un météorologue relève le cumul de pluie de plusieurs journées.", pop: "journées", car: "cumul de pluie", u: "mm", d: 0, h: 10 },
  { s: "Une sage-femme note la taille des nouveau-nés de sa maternité.", pop: "nouveau-nés", car: "taille", u: "cm", d: 44, h: 2 },
  { s: "Un gérant de cinéma note la durée des films de la saison.", pop: "films", car: "durée", u: "min", d: 80, h: 20 },
  { s: "Une professeure de sport chronomètre ses élèves sur 1 000 m.", pop: "élèves", car: "temps", u: "s", d: 200, h: 20 },
  { s: "Un biologiste marin mesure des poissons pêchés dans un filet.", pop: "poissons", car: "longueur", u: "cm", d: 10, h: 5 },
  { s: "Une libraire relève le prix des livres vendus dans la journée.", pop: "livres", car: "prix", u: "€", d: 5, h: 5 },
  { s: "Un technicien teste l'autonomie de batteries de téléphone.", pop: "batteries", car: "autonomie", u: "h", d: 4, h: 2 },
  { s: "Une urbaniste relève la surface de logements d'un quartier.", pop: "logements", car: "surface", u: "m²", d: 20, h: 20 },
  { s: "Une agricultrice pèse les mangues de sa récolte.", pop: "mangues", car: "masse", u: "g", d: 200, h: 50 },
  { s: "Un proviseur étudie la distance entre le domicile et le lycée.", pop: "élèves", car: "distance", u: "km", d: 0, h: 2 },
  { s: "Une développeuse mesure le temps de chargement de pages web.", pop: "pages", car: "temps de chargement", u: "ms", d: 100, h: 50 },
];

const masc = (c: CtxStat) => /^(cumul|temps|prix)/.test(c.car);
/** « une surface strictement inférieure à », « un temps d'au moins ». */
export const unCar = (c: CtxStat) => `${masc(c) ? "un" : "une"} ${c.car}`;
export const inf = (c: CtxStat) => (masc(c) ? "inférieur" : "inférieure");
export const supE = (c: CtxStat) => (masc(c) ? "supérieur ou égal" : "supérieure ou égale");

export const classeL = (a: number, b: number) => `$[${a}\\,;${b}[$`;

export type Serie = { c: CtxStat; bornes: number[]; eff: number[]; N: number; pas: number };
/** Effectifs multiples de `pas` (le pas de graduation) : on les lit exactement sur l'axe. */
export function serieClasses(nb = entre(4, 6), totaux: number[] = [20, 40, 50, 60, 80, 100]): Serie {
  const c = un(CTX_STATS);
  const pas = un([2, 5, 5, 10]);
  for (;;) {
    const N = un(totaux);
    if (N % pas) continue;
    const eff: number[] = [];
    let reste = N / pas;
    for (let i = 0; i < nb - 1; i++) {
      const v = entre(1, Math.max(1, Math.min(reste - (nb - 1 - i), 8)));
      eff.push(v * pas);
      reste -= v;
    }
    if (reste < 1 || reste > 9) continue;
    eff.push(reste * pas);
    const m = Math.max(...eff);
    if (eff.filter((x) => x === m).length !== 1) continue;
    return { c, bornes: Array.from({ length: nb + 1 }, (_, i) => c.d + i * c.h), eff: melangeBosse(eff), N, pas };
  }
}
/** Une forme en cloche plus réaliste : le plus grand effectif plutôt au milieu. */
function melangeBosse(e: number[]) {
  const t = [...e].sort((a, b) => a - b);
  const g: number[] = [];
  const d: number[] = [];
  t.forEach((x, i) => (i % 2 ? d : g).push(x));
  return [...g, ...d.reverse()];
}
export const histo = (s: Serie): StatGraphCanvasData => ({
  kind: "stat_graph",
  graphType: "histogramme",
  size: { width: 360, height: 240 },
  bornes: s.bornes,
  data: s.eff.map((v, i) => ({ label: `${s.bornes[i]}-${s.bornes[i + 1]}`, value: v })),
  display: { showValues: false, showLabels: true, showAxis: true, step: s.pas, axeY: "effectif" },
});

const INTRO = (s: Serie) => un([`${s.c.s} Voici l'histogramme de la série (${s.c.car}, en ${s.c.u}).`, `${s.c.s} L'histogramme ci-dessous résume les données (${s.c.car}, en ${s.c.u}).`, `${s.c.s} Les résultats sont regroupés par classes de même amplitude (${s.c.car}, en ${s.c.u}).`]);
const DEF = "dans un histogramme à classes de même amplitude, la hauteur de chaque barre indique l'effectif de la classe.";

/** Les six gabarits de lecture. `pref` distingue les classes, `avecMoyenne` garde le gabarit des centres. */
export function gabaritsHistogramme(tpl: (m: string, n: number, d: number, h: string, g: () => any) => TutorBankItemV4, micro: string): TutorBankItemV4[] {
  return [
    tpl(micro, 1, 1, "Lis la hauteur de la barre sur l'axe gradué.", () => {
      const s = serieClasses();
      const i = entre(0, s.eff.length - 1);
      return court(`${INTRO(s)} ${un(["Quel est l'effectif de la classe", "Combien de valeurs compte la classe", "Quel effectif compte la classe"])} ${classeL(s.bornes[i], s.bornes[i + 1])} ?`, s.eff[i], expl(DEF, "on repère la barre de cette classe, puis on lit sa hauteur sur l'axe.", `la barre monte jusqu'à $${s.eff[i]}$.`, `l'effectif est $${s.eff[i]}$.`), histo(s));
    }),
    tpl(micro, 2, 1, "La classe la plus représentée a la barre la plus haute.", () => {
      const s = serieClasses();
      const i = s.eff.indexOf(Math.max(...s.eff));
      const ch = s.bornes.slice(0, -1).map((b, k) => classeL(b, s.bornes[k + 1]));
      return qcm(`${INTRO(s)} ${un(["Quelle est la classe la plus représentée ?", "Quelle classe a le plus grand effectif ?", `Dans quelle classe y a-t-il le plus ${de(s.c.pop)} ?`])}`, ch[i], ch.filter((_, k) => k !== i), expl(DEF, "on cherche la barre la plus haute.", `c'est celle de la classe ${ch[i]}.`, `la classe la plus représentée est ${ch[i]}.`), histo(s));
    }),
    tpl(micro, 3, 2, "Additionne les hauteurs des barres concernées.", () => {
      const s = serieClasses();
      const t = entre(1, 3);
      const k = entre(1, s.eff.length - 1);
      const x = s.bornes[k];
      const total = s.eff.reduce((a, b) => a + b, 0);
      const avant = s.eff.slice(0, k).reduce((a, b) => a + b, 0);
      const [q, v] = t === 1 ? [un(["Quel est l'effectif total ?", `Combien y a-t-il ${de(s.c.pop)} en tout ?`]), total] : t === 2 ? [`Combien ${de(s.c.pop)} ont ${unCar(s.c)} strictement ${inf(s.c)} à $${x}$ ${s.c.u} ?`, avant] : [`Combien ${de(s.c.pop)} ont ${unCar(s.c)} ${supE(s.c)} à $${x}$ ${s.c.u} ?`, total - avant];
      return court(`${INTRO(s)} ${q}`, v, expl(DEF, "on additionne les effectifs des classes concernées.", `les effectifs lus sont ${s.eff.join(" ; ")}.`, `on trouve $${v}$.`), histo(s));
    }),
    tpl(micro, 4, 2, "Fréquence = effectif de la classe ÷ effectif total.", () => {
      const s = serieClasses(entre(4, 5), [20, 40, 50, 100]);
      const i = entre(0, s.eff.length - 1);
      const p = (s.eff[i] * 100) / s.N;
      return court(`${INTRO(s)} ${un(["Quelle est la fréquence, en %, de la classe", "Quel pourcentage des " + s.c.pop + " se trouve dans la classe", "Quelle part, en %, représente la classe"])} ${classeL(s.bornes[i], s.bornes[i + 1])} ?`, p, expl("fréquence d'une classe = effectif de la classe ÷ effectif total.", "on lit l'effectif de la classe et on calcule l'effectif total.", `$${s.eff[i]} \\div ${s.N} = ${nL(s.eff[i] / s.N)}$, soit $${nL(p)}$ %.`, `la fréquence est $${nL(p)}$ %.`), histo(s), [`${fr(p)} %`, `${fr(p)}%`]);
    }),
    tpl(micro, 5, 3, "Additionne les classes voulues, puis divise par l'effectif total.", () => {
      const s = serieClasses(entre(4, 5), [20, 40, 50, 100]);
      const k = entre(1, s.eff.length - 1);
      const x = s.bornes[k];
      const moins = un([true, false]);
      const n = moins ? s.eff.slice(0, k).reduce((a, b) => a + b, 0) : s.eff.slice(k).reduce((a, b) => a + b, 0);
      const p = (n * 100) / s.N;
      return court(`${INTRO(s)} ${moins ? `Quel pourcentage des ${s.c.pop} a ${unCar(s.c)} strictement ${inf(s.c)} à $${x}$ ${s.c.u} ?` : `Quel pourcentage des ${s.c.pop} a ${unCar(s.c)} d'au moins $${x}$ ${s.c.u} ?`}`, p, expl("un pourcentage se calcule à partir de l'effectif total.", "on additionne les effectifs concernés, on divise par le total.", `$${n} \\div ${s.N} = ${nL(n / s.N)}$.`, `cela représente $${nL(p)}$ %.`), histo(s), [`${fr(p)} %`, `${fr(p)}%`]);
    }),
    tpl(micro, 6, 3, "Prends le centre de chaque classe, multiplie par l'effectif, additionne, divise par le total.", () => {
      let s = serieClasses(entre(3, 5), [20, 40, 50, 100]);
      const moy = (t: Serie) => t.eff.reduce((a, e, i) => a + (e * (t.bornes[i] + t.bornes[i + 1])) / 2, 0) / t.N;
      while (Math.abs(moy(s) * 100 - Math.round(moy(s) * 100)) > 1e-9) s = serieClasses(entre(3, 5), [20, 40, 50, 100]);
      const m = moy(s);
      const ctr = s.bornes.slice(0, -1).map((b, i) => (b + s.bornes[i + 1]) / 2);
      return court(`${INTRO(s)} ${un(["En remplaçant chaque classe par son centre, quelle moyenne obtient-on ?", "Estime la moyenne de la série avec les centres des classes.", "Quelle est la moyenne estimée à partir des centres des classes ?"])}`, m, expl("moyenne estimée = (somme de centre × effectif) ÷ effectif total.", "on remplace chaque classe par son centre.", `centres : ${ctr.map((c) => nL(c)).join(" ; ")} ; effectifs : ${s.eff.join(" ; ")} ; total : ${s.N}.`, `la moyenne estimée est $${nL(m)}$ ${s.c.u}.`), histo(s));
    }),
  ];
}
