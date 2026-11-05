// LIRE UN HISTOGRAMME EN 4e (05/11/2026).
//
// Trou du programme (BO 2020, p. 133 : « diagramme en bâtons, diagramme circulaire,
// histogramme »). L'histogramme n'avait aucun item en 4e, et ce n'est pas un synonyme
// du diagramme en bâtons : chaque barre est une CLASSE de valeurs.
//
// ⛔ Règles du collège : ★1-★2 phrase courte, sans prénom ni contexte. Pas de barre de
// fraction : on écrit ÷.
// ⚠️ Pour le correcteur : une classe s'écrit toujours « de 20 à 30 » ; les classes et
// les effectifs se relisent DANS LA FIGURE.

import type { TutorBankItemV4, StatGraphCanvasData, DifficultyLevel } from "@/lib/tutor-v4/types";

const entre = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const un = <T,>(l: readonly T[]): T => l[Math.floor(Math.random() * l.length)];
const melange = <T,>(l: T[]): T[] => l.map((x) => [Math.random(), x] as const).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
const somme = (l: number[]) => l.reduce((s, x) => s + x, 0);

const expl = (def: string, meth: string, calc: string, concl: string) =>
  `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${concl}`;
function qcm(juste: string, faux: string[]) {
  const d = melange([...new Set(faux)].filter((x) => x !== juste)).slice(0, 3);
  return melange([juste, ...d]);
}
const court = (n: number) => ({ format: "short" as const, expected: [String(n)], comparator: "number_equal" as const });
const choix = (juste: string, faux: string[]) => ({ format: "qcm" as const, choices: qcm(juste, faux), expected: [juste], comparator: "mcq_exact" as const });

const DEF = "dans un histogramme, chaque barre est une classe de valeurs ; sa hauteur est l’effectif de cette classe.";
const CL = (b: number[], i: number, u = "") => `de ${b[i]} à ${b[i + 1]}${u}`;

/* ───────────────────────── la figure ───────────────────────── */

function figure(bornes: number[], effs: number[], step: number, o: { titre?: string; axeY?: string } = {}): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    graphType: "histogramme",
    ...(o.titre ? { title: o.titre } : {}),
    data: effs.map((value, i) => ({ label: `de ${bornes[i]} à ${bornes[i + 1]}`, value })),
    bornes,
    display: { showLabels: true, showValues: false, showAxis: true, step, axeY: o.axeY ?? "Effectif" },
    size: { width: 360, height: 230 },
  };
}

/** Des effectifs lisibles (multiples du pas), avec une seule barre la plus haute et une seule la plus basse. */
function effectifs(nb: number): { effs: number[]; step: number } {
  for (;;) {
    const step = un([1, 1, 2, 5]);
    const effs = Array.from({ length: nb }, () => step * entre(1, 9));
    const max = Math.max(...effs);
    const min = Math.min(...effs);
    if (effs.filter((x) => x === max).length === 1 && effs.filter((x) => x === min).length === 1) return { effs, step };
  }
}
function bornesNeutres(nb: number) {
  const pas = un([2, 5, 10, 20]);
  const debut = pas * un([0, 1, 2, 3, 5, 10]);
  return Array.from({ length: nb + 1 }, (_, i) => debut + i * pas);
}
function neutre() {
  const nb = entre(4, 6);
  const bornes = bornesNeutres(nb);
  const { effs, step } = effectifs(nb);
  return { nb, bornes, effs, step, fig: figure(bornes, effs, step) };
}

/** Des effectifs de total 20, 25, 50 ou 100, pour que chaque pourcentage tombe juste. */
function effectifsTotal(nb: number): { effs: number[]; step: number; total: number } {
  for (;;) {
    const [total, step] = un([[20, 1], [20, 2], [25, 1], [50, 2], [50, 5], [100, 5], [100, 10]] as const);
    const effs = Array.from({ length: nb }, () => step);
    let reste = total - nb * step;
    if (reste < 0) continue;
    while (reste > 0) {
      effs[entre(0, nb - 1)] += step;
      reste -= step;
    }
    const max = Math.max(...effs);
    if (max / step > 12) continue;
    if (effs.filter((x) => x === max).length !== 1) continue;
    return { effs, step, total };
  }
}

/* ───────────────────────── contextes (★3 et plus) ───────────────────────── */

/** « un trajet de 40 à 50 min », « de moins de 40 min », « d’au moins 40 min », « d’exactement 40 min ». */
const deT = (t: string) => (t.startsWith("de ") ? t : /^[ae]/.test(t) ? `d’${t}` : `de ${t}`);

type Ctx = { sujet: string; de: string; verbe: (t: string) => string; u: string; titre: string; debut: number; pas: number; nb: number; ind: string };
const CONTEXTES: Ctx[] = [
  { sujet: "Un collège a relevé le temps de trajet de ses élèves.", de: "d’élèves", ind: "élèves", verbe: (t) => `ont un trajet ${deT(t)}`, u: "min", titre: "Temps de trajet (min)", debut: 0, pas: 10, nb: 5 },
  { sujet: "Un club de basket a mesuré ses joueurs.", de: "de joueurs", ind: "joueurs", verbe: (t) => `mesurent ${t}`, u: "cm", titre: "Taille (cm)", debut: 150, pas: 10, nb: 5 },
  { sujet: "Un verger a pesé sa récolte de pommes.", de: "de pommes", ind: "pommes", verbe: (t) => `pèsent ${t}`, u: "g", titre: "Masse (g)", debut: 100, pas: 20, nb: 5 },
  { sujet: "Une enquête porte sur le sommeil des adolescents.", de: "d’adolescents", ind: "adolescents", verbe: (t) => `dorment ${t}`, u: "h", titre: "Durée de sommeil (h)", debut: 6, pas: 1, nb: 5 },
  { sujet: "Une course a classé ses coureurs par âge.", de: "de coureurs", ind: "coureurs", verbe: (t) => `ont ${t}`, u: "ans", titre: "Âge (ans)", debut: 20, pas: 10, nb: 5 },
  { sujet: "Une librairie a classé ses romans par prix.", de: "de romans", ind: "romans", verbe: (t) => `coûtent ${t}`, u: "€", titre: "Prix (€)", debut: 5, pas: 5, nb: 5 },
  { sujet: "Un pêcheur a mesuré ses poissons.", de: "de poissons", ind: "poissons", verbe: (t) => `mesurent ${t}`, u: "cm", titre: "Longueur (cm)", debut: 10, pas: 10, nb: 5 },
  { sujet: "Une station météo a relevé le vent chaque jour.", de: "de jours", ind: "jours", verbe: (t) => `ont un vent ${deT(t)}`, u: "km/h", titre: "Vent (km/h)", debut: 0, pas: 20, nb: 5 },
  { sujet: "Un forestier a mesuré ses arbres.", de: "d’arbres", ind: "arbres", verbe: (t) => `mesurent ${t}`, u: "m", titre: "Hauteur (m)", debut: 5, pas: 5, nb: 5 },
  { sujet: "Une médecin du sport a relevé le pouls de ses patients, en battements par minute.", de: "de patients", ind: "patients", verbe: (t) => `ont un pouls ${deT(t)}`, u: "battements", titre: "Pouls (battements par minute)", debut: 60, pas: 10, nb: 5 },
  { sujet: "Une application a classé des chansons par durée.", de: "de chansons", ind: "chansons", verbe: (t) => `durent ${t}`, u: "min", titre: "Durée (min)", debut: 2, pas: 1, nb: 5 },
  { sujet: "Un éleveur a pesé ses agneaux.", de: "d’agneaux", ind: "agneaux", verbe: (t) => `pèsent ${t}`, u: "kg", titre: "Masse (kg)", debut: 20, pas: 5, nb: 5 },
];

function contexte() {
  const C = un(CONTEXTES);
  const bornes = Array.from({ length: C.nb + 1 }, (_, i) => C.debut + i * C.pas);
  const { effs, step } = effectifs(C.nb);
  const fig = figure(bornes, effs, step, { titre: C.titre, axeY: `Nombre ${C.de}` });
  return { C, nb: C.nb, bornes, effs, step, fig };
}
function contexteTotal() {
  const C = un(CONTEXTES);
  const bornes = Array.from({ length: C.nb + 1 }, (_, i) => C.debut + i * C.pas);
  const { effs, step, total } = effectifsTotal(C.nb);
  const fig = figure(bornes, effs, step, { titre: C.titre, axeY: `Nombre ${C.de}` });
  return { C, nb: C.nb, bornes, effs, step, total, fig };
}

/* ───────────────────────── tournures ───────────────────────── */

const AVANT = ["", "Regarde l’histogramme. ", "Lis la figure. ", "Observe les barres. ", "Voici un histogramme. "];
const dit = (questions: string[]) => `${un(AVANT)}${un(questions)}`;

const tpl = (n: number, difficulty: DifficultyLevel, hint: string, generate: () => any): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `stat_histogramme_lire_tpl_${n}`,
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_histogramme_lire",
    difficulty,
    theme: "neutral",
    hint,
    tags: ["histogramme", "classes", "canvas", "template"],
    generate,
  }) as TutorBankItemV4;

/* ───────────────────────── les gabarits ───────────────────────── */

export const statHistogrammeBank: TutorBankItemV4[] = [
  // ★1 : l'effectif d'une classe.
  tpl(1, 1, "Repère la barre, puis lis sa hauteur sur l’axe.", () => {
    const { nb, bornes, effs, fig } = neutre();
    const i = entre(0, nb - 1);
    const c = CL(bornes, i);
    return {
      text: dit([`Quel est l’effectif de la classe ${c} ?`, `Combien de valeurs dans la classe ${c} ?`, `Lis l’effectif de la classe ${c}.`, `Quelle est la hauteur de la barre ${c} ?`, `Combien de valeurs sont dans la barre ${c} ?`]),
      ...court(effs[i]),
      canvas: fig,
      explanation: expl(DEF, `on repère la barre ${c}, puis on lit sa hauteur sur l’axe.`, `sa hauteur est ${effs[i]}.`, `l’effectif de la classe est ${effs[i]}.`),
    };
  }),

  // ★1 : la classe la plus (ou la moins) remplie.
  tpl(2, 1, "La barre la plus haute a le plus grand effectif.", () => {
    const { nb, bornes, effs, fig } = neutre();
    const grand = Math.random() < 0.5;
    const i = effs.indexOf(grand ? Math.max(...effs) : Math.min(...effs));
    const juste = CL(bornes, i);
    const noms = Array.from({ length: nb }, (_, k) => CL(bornes, k));
    return {
      text: dit(grand
        ? ["Quelle classe a le plus grand effectif ?", "Quelle barre est la plus haute ?", "Quelle classe contient le plus de valeurs ?", "Où y a-t-il le plus de valeurs ?"]
        : ["Quelle classe a le plus petit effectif ?", "Quelle barre est la plus basse ?", "Quelle classe contient le moins de valeurs ?", "Où y a-t-il le moins de valeurs ?"]),
      ...choix(juste, noms),
      canvas: fig,
      explanation: expl(DEF, `on cherche la barre la plus ${grand ? "haute" : "basse"}.`, `sa hauteur est ${effs[i]}.`, `c’est la classe ${juste}.`),
    };
  }),

  // ★1 : le nombre de classes.
  tpl(3, 1, "Compte les barres.", () => {
    const { nb, bornes, effs, fig } = neutre();
    return {
      text: dit(["Combien de classes compte cet histogramme ?", "Combien y a-t-il de classes ?", "Compte les classes de cet histogramme.", "Cet histogramme a combien de barres ?", "Combien de barres vois-tu ?"]),
      ...court(nb),
      canvas: fig,
      explanation: expl(DEF, "on compte les barres.", `il y a ${effs.length} barres, de ${bornes[0]} à ${bornes[nb]}.`, `l’histogramme a ${nb} classes.`),
    };
  }),

  // ★1 : l'amplitude.
  tpl(4, 1, "Fais la différence entre les deux nombres qui bordent une barre.", () => {
    const { bornes, fig } = neutre();
    const w = bornes[1] - bornes[0];
    return {
      text: dit(["Quelle est l’amplitude de chaque classe ?", "Quelle est la largeur de chaque classe ?", "Quelle est l’amplitude d’une classe ?", "Quel écart sépare les deux bornes d’une classe ?", "Quelle est la largeur d’une barre, en valeurs ?"]),
      ...court(w),
      canvas: fig,
      explanation: expl("l’amplitude d’une classe est l’écart entre ses deux bornes.", "on soustrait les deux nombres qui bordent une barre.", `${bornes[1]} − ${bornes[0]} = ${w}.`, `l’amplitude est ${w}.`),
    };
  }),

  // ★2 : l'effectif total.
  tpl(5, 2, "Additionne les hauteurs de toutes les barres.", () => {
    const { effs, fig } = neutre();
    const T = somme(effs);
    return {
      text: dit(["Quel est l’effectif total ?", "Combien y a-t-il de valeurs en tout ?", "Combien de valeurs compte cette série ?", "Combien de valeurs au total ?", "Calcule l’effectif total de cette série."]),
      ...court(T),
      canvas: fig,
      explanation: expl("l’effectif total est la somme des effectifs de toutes les classes.", "on additionne les hauteurs des barres.", `${effs.join(" + ")} = ${T}.`, `l’effectif total est ${T}.`),
    };
  }),

  // ★2 : les valeurs inférieures à une borne.
  tpl(6, 2, "Additionne les barres situées à gauche de ce nombre.", () => {
    const { nb, bornes, effs, fig } = neutre();
    const k = entre(2, nb - 1);
    const X = bornes[k];
    const r = somme(effs.slice(0, k));
    return {
      text: dit([`Combien de valeurs sont inférieures à ${X} ?`, `Combien de valeurs sont strictement inférieures à ${X} ?`, `Combien de valeurs valent moins de ${X} ?`, `Compte les valeurs inférieures à ${X}.`]),
      ...court(r),
      canvas: fig,
      explanation: expl(DEF, `on garde les barres situées avant ${X}.`, `${effs.slice(0, k).join(" + ")} = ${r}.`, `${r} valeurs sont inférieures à ${X}.`),
    };
  }),

  // ★2 : l'écart entre deux classes.
  tpl(7, 2, "Lis les deux hauteurs, puis soustrais.", () => {
    for (;;) {
      const { nb, bornes, effs, fig } = neutre();
      const i = entre(0, nb - 1);
      const j = entre(0, nb - 1);
      if (effs[i] <= effs[j]) continue;
      const d = effs[i] - effs[j];
      return {
        text: dit([`La classe ${CL(bornes, i)} dépasse la classe ${CL(bornes, j)} de combien ?`, `De combien la classe ${CL(bornes, i)} dépasse-t-elle la classe ${CL(bornes, j)} ?`, `Quel écart sépare la classe ${CL(bornes, i)} de la classe ${CL(bornes, j)} ?`]),
        ...court(d),
        canvas: fig,
        explanation: expl(DEF, "on lit les deux hauteurs, puis on les soustrait.", `${effs[i]} − ${effs[j]} = ${d}.`, `l’écart est ${d}.`),
      };
    }
  }),

  // ★2 : la classe d'une valeur.
  tpl(8, 2, "Une valeur égale à une borne va dans la classe qui commence par cette borne.", () => {
    const { nb, bornes, fig } = neutre();
    const w = bornes[1] - bornes[0];
    const v = bornes[0] + entre(0, nb * w - 1);
    const i = Math.floor((v - bornes[0]) / w);
    const juste = CL(bornes, i);
    const noms = Array.from({ length: nb }, (_, k) => CL(bornes, k));
    return {
      text: `${un([`Dans quelle classe ranger la valeur ${v} ?`, `La valeur ${v} va dans quelle classe ?`, `Où placer la valeur ${v} ?`, `Quelle barre contient la valeur ${v} ?`])} ${un(["La borne de droite est exclue.", "Chaque classe exclut sa borne de droite."])}`,
      ...choix(juste, noms),
      canvas: fig,
      explanation: expl("une classe contient sa borne de gauche, mais pas sa borne de droite.", `on cherche la classe qui encadre ${v}.`, `${bornes[i]} ≤ ${v} < ${bornes[i + 1]}.`, `${v} va dans la classe ${juste}.`),
    };
  }),

  // ★3 : une situation, une classe.
  tpl(9, 3, "Repère la barre de cette classe, puis lis sa hauteur.", () => {
    const { C, nb, bornes, effs, fig } = contexte();
    const i = entre(0, nb - 1);
    const c = CL(bornes, i, ` ${C.u}`);
    return {
      text: `${C.sujet} ${un([`Combien ${C.de} ${C.verbe(c)} ?`, `D’après l’histogramme, combien ${C.de} ${C.verbe(c)} ?`, `Lis la figure : combien ${C.de} ${C.verbe(c)} ?`])}`,
      ...court(effs[i]),
      canvas: fig,
      explanation: expl(DEF, `on repère la barre ${c}, puis on lit sa hauteur.`, `sa hauteur est ${effs[i]}.`, `il y a ${effs[i]} ${C.ind} dans cette classe.`),
    };
  }),

  // ★3 : moins de, au moins.
  tpl(10, 3, "« Moins de » : les barres de gauche. « Au moins » : la barre qui commence là, et celles de droite.", () => {
    const { C, nb, bornes, effs, fig } = contexte();
    const k = entre(1, nb - 1);
    const X = bornes[k];
    const moins = Math.random() < 0.5;
    const pris = moins ? effs.slice(0, k) : effs.slice(k);
    const r = somme(pris);
    const t = moins ? `moins de ${X} ${C.u}` : `au moins ${X} ${C.u}`;
    return {
      text: `${C.sujet} ${un([`Combien ${C.de} ${C.verbe(t)} ?`, `D’après l’histogramme, combien ${C.de} ${C.verbe(t)} ?`, `Lis la figure : combien ${C.de} ${C.verbe(t)} ?`])}`,
      ...court(r),
      canvas: fig,
      explanation: expl(DEF, moins ? `on additionne les barres situées avant ${X}.` : `on additionne les barres à partir de ${X}.`, `${pris.join(" + ")} = ${r}.`, `il y en a ${r}.`),
    };
  }),

  // ★3 : la classe la plus remplie, en situation.
  tpl(11, 3, "Cherche la barre la plus haute, ou la plus basse, puis lis ses bornes.", () => {
    const { C, nb, bornes, effs, fig } = contexte();
    const grand = Math.random() < 0.5;
    const i = effs.indexOf(grand ? Math.max(...effs) : Math.min(...effs));
    const juste = CL(bornes, i, ` ${C.u}`);
    const noms = Array.from({ length: nb }, (_, k) => CL(bornes, k, ` ${C.u}`));
    return {
      text: `${C.sujet} ${un(grand
        ? [`Quelle classe regroupe le plus ${C.de} ?`, `Dans quelle classe trouve-t-on le plus ${C.de} ?`, `Quelle classe est la mieux remplie ?`]
        : [`Quelle classe regroupe le moins ${C.de} ?`, `Dans quelle classe trouve-t-on le moins ${C.de} ?`, `Quelle classe est la moins remplie ?`])}`,
      ...choix(juste, noms),
      canvas: fig,
      explanation: expl(DEF, `on cherche la barre la plus ${grand ? "haute" : "basse"}.`, `sa hauteur est ${effs[i]}.`, `c’est la classe ${juste}.`),
    };
  }),

  // ★3 : le total, en situation.
  tpl(12, 3, "Additionne les hauteurs de toutes les barres.", () => {
    const { C, effs, fig } = contexte();
    const T = somme(effs);
    return {
      text: `${C.sujet} ${un([`Combien ${C.de} en tout ?`, `Combien ${C.de} sont représentés sur cet histogramme ?`, `D’après la figure, quel est le nombre total ${C.de} ?`])}`,
      ...court(T),
      canvas: fig,
      explanation: expl("l’effectif total est la somme des effectifs de toutes les classes.", "on additionne les hauteurs des barres.", `${effs.join(" + ")} = ${T}.`, `il y a ${T} ${C.ind} en tout.`),
    };
  }),

  // ★4 : une fréquence en %.
  tpl(13, 4, "Fréquence = effectif de la classe ÷ effectif total × 100.", () => {
    const { C, nb, bornes, effs, total, fig } = contexteTotal();
    const i = entre(0, nb - 1);
    const p = (effs[i] * 100) / total;
    const c = CL(bornes, i, ` ${C.u}`);
    return {
      text: `${C.sujet} ${un([`Quel pourcentage ${C.de} ${C.verbe(c)} ?`, `Quelle part ${C.de}, en %, ${C.verbe(c)} ?`, `Calcule le pourcentage ${C.de} qui ${C.verbe(c)}.`])}`,
      ...court(p),
      canvas: fig,
      explanation: expl("la fréquence d’une classe est son effectif divisé par l’effectif total.", "on calcule l’effectif total, puis on fait la division.", `total : ${effs.join(" + ")} = ${total} ; ${effs[i]} ÷ ${total} × 100 = ${p}.`, `cela fait ${p} %.`),
    };
  }),

  // ★4 : un pourcentage sur plusieurs classes.
  tpl(14, 4, "Additionne d’abord les barres concernées, puis divise par le total.", () => {
    const { C, nb, bornes, effs, total, fig } = contexteTotal();
    const k = entre(1, nb - 1);
    const X = bornes[k];
    const moins = Math.random() < 0.5;
    const pris = moins ? effs.slice(0, k) : effs.slice(k);
    const r = somme(pris);
    const p = (r * 100) / total;
    const t = moins ? `moins de ${X} ${C.u}` : `au moins ${X} ${C.u}`;
    return {
      text: `${C.sujet} ${un([`Quel pourcentage ${C.de} ${C.verbe(t)} ?`, `Quelle part ${C.de}, en %, ${C.verbe(t)} ?`, `Calcule le pourcentage ${C.de} qui ${C.verbe(t)}.`])}`,
      ...court(p),
      canvas: fig,
      explanation: expl("un pourcentage se calcule par rapport à l’effectif total.", "on additionne les barres concernées, puis on divise par le total.", `${pris.join(" + ")} = ${r} ; total : ${total} ; ${r} ÷ ${total} × 100 = ${p}.`, `cela fait ${p} %.`),
    };
  }),

  // ★4 : ce que l'histogramme ne dit pas.
  tpl(15, 4, "Une barre dit combien de valeurs sont dans la classe, pas où elles sont dedans.", () => {
    const { C, nb, bornes, effs, fig } = contexte();
    const i = entre(0, nb - 1);
    const w = bornes[1] - bornes[0];
    const dedans = bornes[i] + entre(1, w - 1 || 1);
    const milieu = w > 1 ? dedans : bornes[i];
    const NSP = "On ne peut pas le savoir.";
    const exact = w === 1 || Math.random() < 0.5;
    const t = exact ? `exactement ${milieu} ${C.u}` : `moins de ${milieu} ${C.u}`;
    return {
      text: `${C.sujet} ${un([`Combien ${C.de} ${C.verbe(t)} ?`, `D’après l’histogramme, combien ${C.de} ${C.verbe(t)} ?`, `Avec cette seule figure, combien ${C.de} ${C.verbe(t)} ?`])}`,
      ...choix(NSP, [String(effs[i]), "0", String(somme(effs)), String(somme(effs.slice(0, i + 1))), String(effs[i] + 1)]),
      canvas: fig,
      explanation: expl(DEF, "un histogramme regroupe les valeurs : il ne dit pas où elles se trouvent à l’intérieur d’une classe.", `la classe ${CL(bornes, i, ` ${C.u}`)} contient ${milieu}, mais sa barre ne donne que l’effectif de la classe entière.`, NSP),
    };
  }),

  // ★4 : une barre effacée.
  tpl(16, 4, "Effectif de la barre effacée = effectif total − somme des autres barres.", () => {
    const { C, nb, bornes, effs, fig } = contexte();
    const i = entre(0, nb - 1);
    const T = somme(effs);
    const reste = effs.filter((_, k) => k !== i);
    const figure2 = { ...fig, data: fig.data.map((d, k) => (k === i ? { ...d, value: 0 } : d)) };
    const c = CL(bornes, i, ` ${C.u}`);
    return {
      text: `${C.sujet} ${un([`Il y a ${T} ${C.ind} en tout.`, `On compte ${T} ${C.ind}.`, `L’effectif total est de ${T}.`])} ${un([`La barre ${c} a été effacée : quelle était sa hauteur ?`, `La barre ${c} manque : quel est son effectif ?`, `On a perdu la barre ${c}. Quel est son effectif ?`])}`,
      ...court(effs[i]),
      canvas: figure2,
      explanation: expl("l’effectif total est la somme des effectifs de toutes les classes.", "on retire du total les barres qu’on peut lire.", `${T} − (${reste.join(" + ")}) = ${effs[i]}.`, `la barre effacée a pour hauteur ${effs[i]}.`),
    };
  }),
];
