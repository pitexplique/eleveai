// SÉRIES STATISTIQUES EN CLASSES (05/11/2026), notion `stat_classes` de 3e.
//
// Demandé par quatre programmes : Sénégal AN 5 (classes, centre, classe modale, moyenne,
// effectifs cumulés), Côte d'Ivoire C2-L1 (classe modale, cumulés, polygone, moyenne en
// classes), Belgique 4.1 Sv1 / SF1 / SF2 (classes, centres, cumulés), Québec STA A6c.
//   · `stat_classes_regrouper` reste visible en France : organiser des données et lire un
//     histogramme sont au cycle 4 (BO 2020, p. 133).
//   · `stat_classe_modale_centre`, `stat_moyenne_classes`, `stat_effectifs_cumules` ne
//     sont pas au programme français : masquées `hors_france` dans micros-masquees.ts.
//
// ⛔ Règles du collège : ★1-★2 sans contexte ni prénom ; contexte à partir de ★3. On écrit ÷.
// ⚠️ Pour le correcteur : une classe s'écrit toujours « de 20 à moins de 30 » ; bornes et
// effectifs se relisent DANS LA FIGURE (tableau, histogramme ou polygone).

import type { TutorBankItemV4, StatGraphCanvasData, TableauDonneesCanvasData, DifficultyLevel } from "@/lib/tutor-v4/types";

const entre = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const un = <T,>(l: readonly T[]): T => l[Math.floor(Math.random() * l.length)];
const melange = <T,>(l: T[]): T[] => l.map((x) => [Math.random(), x] as const).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
const somme = (l: number[]) => l.reduce((s, x) => s + x, 0);
const croise = (d: string[], f: string[]) => d.flatMap((a) => f.map((b) => `${a} ${b}`));
const fr = (x: number) => String(Math.round(x * 1e4) / 1e4).replace(".", ",");

const expl = (def: string, meth: string, calc: string, concl: string) =>
  `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${concl}`;
function qcm(juste: string, faux: string[]) {
  const d = melange([...new Set(faux)].filter((x) => x !== juste)).slice(0, 3);
  return melange([juste, ...d]);
}
const court = (x: number) => ({ format: "short" as const, expected: [fr(x)], comparator: "number_equal" as const });
const choix = (juste: string, faux: string[]) => ({ format: "qcm" as const, choices: qcm(juste, faux), expected: [juste], comparator: "mcq_exact" as const });
const ouiNon = (oui: boolean) => ({ format: "qcm" as const, choices: ["Oui", "Non"], expected: [oui ? "Oui" : "Non"], comparator: "mcq_exact" as const });

/* ───────────────────────── les données ───────────────────────── */

const CL = (B: number[], i: number) => `de ${fr(B[i])} à moins de ${fr(B[i + 1])}`;
const centre = (B: number[], i: number) => (B[i] + B[i + 1]) / 2;
const cumuls = (E: number[]) => E.map((_, i) => somme(E.slice(0, i + 1)));

/** Des bornes rondes. `pair` : un pas pair, le centre tombe sur un entier. */
function bornes(nb: number, pair = true): number[] {
  const pas = un(pair ? [2, 4, 10, 10, 20, 50] : [2, 5, 5, 10, 20, 25]);
  const debut = pas * un([0, 1, 2, 3, 5, 10]);
  return Array.from({ length: nb + 1 }, (_, i) => debut + i * pas);
}
/** Des effectifs avec une seule classe en tête et une seule en queue. */
function effectifs(nb: number, step = 1): number[] {
  for (;;) {
    const E = Array.from({ length: nb }, () => step * entre(1, 9));
    const max = Math.max(...E);
    const min = Math.min(...E);
    if (E.filter((x) => x === max).length === 1 && E.filter((x) => x === min).length === 1) return E;
  }
}
/** Des effectifs de total T, avec une seule classe en tête. */
function effectifsTotal(nb: number, T: number, step = 1): number[] {
  for (;;) {
    const E = Array.from({ length: nb }, () => step);
    let r = T - nb * step;
    if (r < 0) continue;
    while (r > 0) {
      E[entre(0, nb - 1)] += step;
      r -= step;
    }
    const max = Math.max(...E);
    // Plafond relatif à la moyenne : 50 valeurs sur 3 classes dépassent forcément 12 (boucle sans fin sinon).
    if (E.filter((x) => x === max).length === 1 && max / step <= Math.max(12, Math.ceil(T / step / nb) + 6)) return E;
  }
}
const stepPour = (T: number) => (T % 2 ? 1 : T >= 50 ? un([2, 5]) : un([1, 1, 2]));
/** Un total qui donne une moyenne à deux décimales au plus, quels que soient les centres entiers. */
const TOTAUX = [10, 20, 20, 25, 50] as const;

function tableau(B: number[], E: (number | string)[], o: { col?: string; eff?: string; cum?: (number | string)[]; seulCum?: boolean; titre?: string } = {}): TableauDonneesCanvasData {
  const col = o.col ?? "Classe";
  const eff = o.eff ?? "Effectif";
  if (o.seulCum)
    return { kind: "tableau_donnees", headers: [col, "Effectif cumulé"], rows: E.map((_, i) => ({ values: [CL(B, i), o.cum![i]] })) };
  return {
    kind: "tableau_donnees",
    ...(o.titre ? { title: o.titre } : {}),
    headers: o.cum ? [col, eff, "Effectif cumulé"] : [col, eff],
    rows: E.map((e, i) => ({ values: o.cum ? [CL(B, i), e, o.cum[i]] : [CL(B, i), e] })),
  };
}
function histogramme(B: number[], E: number[], step: number, o: { titre?: string; axeY?: string } = {}): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    graphType: "histogramme",
    ...(o.titre ? { title: o.titre } : {}),
    data: E.map((value, i) => ({ label: `de ${B[i]} à ${B[i + 1]}`, value })),
    bornes: B,
    display: { showLabels: true, showValues: false, showAxis: true, step, axeY: o.axeY ?? "Effectif" },
    size: { width: 360, height: 230 },
  };
}
/** Le polygone des effectifs cumulés : un point à chaque borne de droite, à partir de 0. */
function polygone(B: number[], E: number[], step: number, o: { titre?: string } = {}): StatGraphCanvasData {
  const C = cumuls(E);
  return {
    kind: "stat_graph",
    graphType: "courbe",
    ...(o.titre ? { title: o.titre } : {}),
    data: B.map((b, i) => ({ label: String(b), value: i === 0 ? 0 : C[i - 1] })),
    display: { showLabels: true, showValues: false, showAxis: true, step, axeY: "Effectif cumulé" },
    size: { width: 360, height: 240 },
  };
}
/** Une liste de valeurs tirées dans les classes. */
function brut(B: number[], E: number[]): number[] {
  const l: number[] = [];
  E.forEach((e, i) => {
    for (let k = 0; k < e; k++) l.push(entre(B[i], B[i + 1] - 1));
  });
  return melange(l);
}
const liste = (l: number[]) => l.join(" ; ");

/* ───────────────────────── contextes (★3 et plus) ───────────────────────── */

type Ctx = { sujet: string; ind: string; col: string; debut: number; pas: number; u: string; verbe: string };
const CONTEXTES: Ctx[] = [
  { sujet: "Un collège relève le temps de trajet de ses élèves.", ind: "élèves", col: "Trajet (min)", debut: 0, pas: 10, u: "min", verbe: "ont un trajet" },
  { sujet: "Un club de basket mesure ses joueurs.", ind: "joueurs", col: "Taille (cm)", debut: 150, pas: 10, u: "cm", verbe: "mesurent" },
  { sujet: "Un verger pèse sa récolte de mangues.", ind: "mangues", col: "Masse (g)", debut: 200, pas: 50, u: "g", verbe: "pèsent" },
  { sujet: "Une infirmière scolaire relève la masse des élèves.", ind: "élèves", col: "Masse (kg)", debut: 30, pas: 10, u: "kg", verbe: "pèsent" },
  { sujet: "Une course à pied classe ses coureurs par âge.", ind: "coureurs", col: "Âge (ans)", debut: 20, pas: 10, u: "ans", verbe: "ont" },
  { sujet: "Une librairie classe ses romans par prix.", ind: "romans", col: "Prix (€)", debut: 4, pas: 4, u: "€", verbe: "coûtent" },
  { sujet: "Une pêcheuse mesure ses poissons.", ind: "poissons", col: "Longueur (cm)", debut: 10, pas: 10, u: "cm", verbe: "mesurent" },
  { sujet: "Une station météo relève le vent chaque jour.", ind: "jours", col: "Vent (km/h)", debut: 0, pas: 20, u: "km/h", verbe: "ont un vent" },
  { sujet: "Un forestier mesure les arbres d’une parcelle.", ind: "arbres", col: "Hauteur (m)", debut: 4, pas: 4, u: "m", verbe: "mesurent" },
  { sujet: "Une médecin du sport relève le pouls de ses patients.", ind: "patients", col: "Pouls (battements par minute)", debut: 60, pas: 10, u: "battements", verbe: "ont un pouls" },
  { sujet: "Un éleveur pèse ses agneaux.", ind: "agneaux", col: "Masse (kg)", debut: 20, pas: 4, u: "kg", verbe: "pèsent" },
  { sujet: "Une coopérative pèse des sacs de cacao.", ind: "sacs", col: "Masse (kg)", debut: 40, pas: 10, u: "kg", verbe: "pèsent" },
  { sujet: "Un institut relève les salaires d’une entreprise, en centaines d’euros.", ind: "salariés", col: "Salaire (centaines d’euros)", debut: 10, pas: 10, u: "centaines d’euros", verbe: "gagnent" },
  { sujet: "Une compagnie de bus relève la durée de ses trajets.", ind: "trajets", col: "Durée (min)", debut: 10, pas: 20, u: "min", verbe: "durent" },
];
const bornesCtx = (C: Ctx, nb: number) => Array.from({ length: nb + 1 }, (_, i) => C.debut + i * C.pas);

function ctx(nb = entre(4, 5), T?: number) {
  const C = un(CONTEXTES);
  const B = bornesCtx(C, nb);
  const step = T ? stepPour(T) : 1;
  const E = T ? effectifsTotal(nb, T, step) : effectifs(nb);
  return { C, B, E, step, opt: { col: C.col, eff: `Nombre ${dI(C)}` } };
}
const avecU = (c: string, C: Ctx) => `${c} ${C.u}`;
/** « de joueurs », « d’élèves ». */
const dI = (C: Ctx) => (/^[aeiouéèh]/i.test(C.ind) ? `d’${C.ind}` : `de ${C.ind}`);
/** « mesurent au moins 150 cm », « ont un trajet d’au moins 20 min », « ont un trajet de moins de 20 min ». */
const vb = (C: Ctx, s: string) => {
  if (!/ un /.test(C.verbe) || s.startsWith("de ") && / à moins de /.test(s)) return `${C.verbe} ${s}`;
  return s.startsWith("au") ? `${C.verbe} d’${s}` : `${C.verbe} de ${s}`;
};

/* ───────────────────────── gabarits ───────────────────────── */

type Micro = "stat_classes_regrouper" | "stat_classe_modale_centre" | "stat_moyenne_classes" | "stat_effectifs_cumules";
const tpl = (micro: Micro, n: number, difficulty: DifficultyLevel, hint: string, generate: () => any): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `${micro}_tpl_${n}`,
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_classes",
    microId: micro,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["statistiques", "classes", micro, "template"],
    generate,
  }) as TutorBankItemV4;

const DEF_C = "une classe regroupe les valeurs d’un intervalle : « de 20 à moins de 30 » contient 20, mais pas 30. Son amplitude est l’écart entre ses bornes.";
const DEF_M = "la classe modale est la classe de plus grand effectif ; le centre d’une classe est la moyenne de ses deux bornes.";
const DEF_Y = "pour la moyenne d’une série en classes, on remplace chaque classe par son centre : (somme des centre × effectif) ÷ effectif total.";
const DEF_K = "l’effectif cumulé d’une classe est le nombre de valeurs inférieures à sa borne de droite : on ajoute les effectifs jusqu’à cette classe.";

const DEB_T = ["Lis le tableau.", "Regarde le tableau.", "Observe le tableau.", "Voici un tableau."];
const DEB_H = ["Lis l’histogramme.", "Regarde l’histogramme.", "Observe l’histogramme.", "Voici un histogramme."];

/* ===== REGROUPER EN CLASSES ===== */

const regrouper: TutorBankItemV4[] = [
  tpl("stat_classes_regrouper", 1, 1, "Amplitude = borne de droite − borne de gauche.", () => {
    const B = bornes(2, false);
    const c = CL(B, 0);
    const a = B[1] - B[0];
    const text = un([`Quelle est l’amplitude de la classe ${c} ?`, `Calcule l’amplitude de la classe ${c}.`, `Classe ${c} : quelle est son amplitude ?`, `Donne l’amplitude de la classe ${c}.`, `Trouve l’amplitude de la classe ${c}.`, `Écris l’amplitude de la classe ${c}.`, `Une classe va ${c}. Quelle est son amplitude ?`, `Cherche l’amplitude de la classe ${c}.`, `Combien vaut l’amplitude de la classe ${c} ?`, `Voici la classe ${c}. Quelle est son amplitude ?`]);
    return { text, ...court(a), explanation: expl(DEF_C, "on soustrait la borne de gauche à la borne de droite.", `${B[1]} − ${B[0]} = ${a}.`, `l’amplitude est ${a}.`) };
  }),
  tpl("stat_classes_regrouper", 2, 1, "La valeur doit être entre les deux bornes de sa classe.", () => {
    const nb = entre(4, 5);
    const B = bornes(nb);
    const E = effectifs(nb);
    const i = entre(0, nb - 1);
    const v = entre(B[i] + 1, B[i + 1] - 1);
    const text = un(croise(DEB_T, [`Dans quelle classe va la valeur ${v} ?`, `Où range-t-on la valeur ${v} ?`, `Quelle classe contient la valeur ${v} ?`, `Choisis la classe de la valeur ${v}.`]));
    return { text, ...choix(CL(B, i), E.map((_, j) => CL(B, j))), canvas: tableau(B, E), explanation: expl(DEF_C, "on cherche les bornes autour de la valeur.", `${B[i]} ≤ ${v} < ${B[i + 1]}.`, `la valeur ${v} va dans la classe ${CL(B, i)}.`) };
  }),
  tpl("stat_classes_regrouper", 3, 1, "L’effectif est écrit sur la ligne de la classe.", () => {
    const nb = entre(4, 5);
    const B = bornes(nb);
    const E = effectifs(nb);
    const i = entre(0, nb - 1);
    const c = CL(B, i);
    const text = un(croise(DEB_T, [`Quel est l’effectif de la classe ${c} ?`, `Donne l’effectif de la classe ${c}.`, `Combien de valeurs dans la classe ${c} ?`, `Écris l’effectif de la classe ${c}.`]));
    return { text, ...court(E[i]), canvas: tableau(B, E), explanation: expl(DEF_C, "on lit la ligne de la classe.", `classe ${c} : ${E[i]}.`, `l’effectif est ${E[i]}.`) };
  }),
  tpl("stat_classes_regrouper", 4, 1, "Compte les lignes du tableau, sans la ligne des titres.", () => {
    const nb = entre(3, 6);
    const B = bornes(nb);
    const E = effectifs(nb);
    const text = un(croise(DEB_T, ["Combien de classes y a-t-il ?", "Combien de classes vois-tu ?", "Quel est le nombre de classes ?", "Compte les classes."]));
    return { text, ...court(nb), canvas: tableau(B, E), explanation: expl(DEF_C, "on compte les lignes du tableau.", `il y a ${nb} lignes de classes.`, `il y a ${nb} classes.`) };
  }),
  tpl("stat_classes_regrouper", 5, 1, "Le « moins de » exclut la borne de droite.", () => {
    const B = bornes(2);
    const c = CL(B, 0);
    const [v, oui] = un([[B[0], true], [B[1], false], [entre(B[0] + 1, B[1] - 1), true], [B[1] + 1, false]] as const);
    const text = un(croise([`Regarde la classe ${c}.`, `Voici la classe ${c}.`, `Prends la classe ${c}.`], [`Contient-elle ${v} ?`, `La valeur ${v} y entre-t-elle ?`, `Peut-on y ranger ${v} ?`, `${v} en fait-il partie ?`]));
    return { text, ...ouiNon(oui), explanation: expl(DEF_C, "on vérifie que la valeur atteint la borne de gauche et reste sous celle de droite.", `${B[0]} ≤ ${v} < ${B[1]} : ${oui ? "vrai" : "faux"}.`, oui ? `oui, ${v} est dans cette classe.` : `non, ${v} n’est pas dans cette classe.`) };
  }),
  tpl("stat_classes_regrouper", 6, 1, "La borne inférieure est à gauche, la borne supérieure à droite.", () => {
    const B = bornes(2);
    const c = CL(B, 0);
    const inf = Math.random() < 0.5;
    const nom = inf ? "inférieure" : "supérieure";
    const text = un([`Quelle est la borne ${nom} de la classe ${c} ?`, `Classe ${c} : donne sa borne ${nom}.`, `Écris la borne ${nom} de la classe ${c}.`, `Trouve la borne ${nom} de la classe ${c}.`, `Donne la borne ${nom} de la classe ${c}.`, `Cherche la borne ${nom} de la classe ${c}.`]);
    return { text, ...court(inf ? B[0] : B[1]), explanation: expl(DEF_C, "la borne inférieure est le plus petit nombre, la borne supérieure le plus grand.", `classe ${c}.`, `la borne ${nom} est ${inf ? B[0] : B[1]}.`) };
  }),

  tpl("stat_classes_regrouper", 7, 2, "Compte une par une les valeurs entre les deux bornes.", () => {
    const B = bornes(4);
    const E = Array.from({ length: 4 }, () => entre(1, 4));
    const l = brut(B, E);
    const i = entre(0, 3);
    const text = `Série : ${liste(l)}. ${un([`Combien de valeurs dans la classe ${CL(B, i)} ?`, `Compte les valeurs de la classe ${CL(B, i)}.`, `Quel est l’effectif de la classe ${CL(B, i)} ?`, `Donne l’effectif de la classe ${CL(B, i)}.`, `Écris l’effectif de la classe ${CL(B, i)}.`, `Trouve l’effectif de la classe ${CL(B, i)}.`])}`;
    return { text, ...court(E[i]), explanation: expl(DEF_C, "on garde les valeurs qui atteignent la borne de gauche et restent sous celle de droite.", `il y en a ${E[i]}.`, `l’effectif de la classe est ${E[i]}.`) };
  }),
  tpl("stat_classes_regrouper", 8, 2, "Une borne de droite appartient à la classe suivante.", () => {
    const nb = entre(4, 5);
    const B = bornes(nb);
    const E = effectifs(nb);
    const i = entre(1, nb - 1);
    const v = B[i];
    const text = un(croise(DEB_T, [`Où va la valeur ${v} ?`, `Dans quelle classe va la valeur ${v} ?`, `Quelle classe contient exactement ${v} ?`, `Choisis la classe de la valeur ${v}.`, `Range la valeur ${v}.`]));
    return { text, ...choix(CL(B, i), E.map((_, j) => CL(B, j))), canvas: tableau(B, E), explanation: expl(DEF_C, "une classe contient sa borne de gauche, pas sa borne de droite.", `${v} ≤ ${v} < ${B[i + 1]}.`, `${v} va dans la classe ${CL(B, i)}.`) };
  }),
  tpl("stat_classes_regrouper", 9, 2, "Écart total ÷ amplitude.", () => {
    const a = un([2, 5, 10, 20, 50]);
    const nb = entre(3, 9);
    const d = a * entre(0, 6);
    const f = d + nb * a;
    const text = un([`On découpe de ${d} à ${f} en classes d’amplitude ${a}. Combien de classes ?`, `Valeurs de ${d} à ${f}, amplitude ${a}. Combien de classes obtient-on ?`, `Combien de classes d’amplitude ${a} faut-il entre ${d} et ${f} ?`, `Découpe de ${d} à ${f} avec une amplitude ${a}. Compte les classes.`, `De ${d} à ${f}, par pas de ${a} : combien de classes ?`, `Classes d’amplitude ${a}, de ${d} à ${f}. Quel est leur nombre ?`, `Entre ${d} et ${f}, avec une amplitude ${a}, combien de classes ?`, `Calcule le nombre de classes d’amplitude ${a} de ${d} à ${f}.`]);
    return { text, ...court(nb), explanation: expl(DEF_C, "on divise l’écart total par l’amplitude.", `(${f} − ${d}) ÷ ${a} = ${nb}.`, `il y a ${nb} classes.`) };
  }),
  tpl("stat_classes_regrouper", 10, 2, "Ajoute tous les effectifs.", () => {
    const nb = entre(4, 5);
    const B = bornes(nb);
    const E = effectifs(nb);
    const text = un(croise(DEB_T, ["Quel est l’effectif total ?", "Calcule l’effectif total.", "Combien de valeurs en tout ?", "Donne l’effectif total de la série.", "Trouve l’effectif total."]));
    return { text, ...court(somme(E)), canvas: tableau(B, E), explanation: expl(DEF_C, "on ajoute les effectifs de toutes les classes.", `${E.join(" + ")} = ${somme(E)}.`, `l’effectif total est ${somme(E)}.`) };
  }),
  tpl("stat_classes_regrouper", 11, 2, "Compte classe après classe.", () => {
    const B = bornes(3);
    let E: number[];
    do E = Array.from({ length: 3 }, () => entre(1, 5));
    while (new Set(E).size < 3);
    const l = brut(B, E);
    const text = `Série : ${liste(l)}. ${un(["Quels effectifs donnent ces classes ?", "Choisis les effectifs de ces classes.", "Répartis la série dans ces classes.", "Quels sont les effectifs dans l’ordre ?", "Trouve les effectifs de chaque classe."])} ${E.map((_, i) => CL(B, i)).join(", ")}.`;
    const f = (x: number[]) => x.join(" ; ");
    return { text, ...choix(f(E), [f([E[1], E[0], E[2]]), f([E[0], E[2], E[1]]), f([E[2], E[1], E[0]]), f([E[0] + 1, E[1] - 1, E[2]])]), explanation: expl(DEF_C, "on range chaque valeur dans sa classe, puis on compte.", `effectifs : ${f(E)}.`, `la bonne répartition est ${f(E)}.`) };
  }),

  tpl("stat_classes_regrouper", 12, 3, "Garde les valeurs comprises entre les deux bornes.", () => {
    const C = un(CONTEXTES);
    const B = bornesCtx(C, 4);
    const E = Array.from({ length: 4 }, () => entre(1, 4));
    const l = brut(B, E);
    const i = entre(0, 3);
    const c = avecU(CL(B, i), C);
    const text = `${C.sujet} Valeurs : ${liste(l)}. ${un([`Combien ${dI(C)} ${vb(C, c)} ?`, `Quel est l’effectif de la classe ${c} ?`, `Compte les valeurs de la classe ${c}.`])}`;
    return { text, ...court(E[i]), explanation: expl(DEF_C, "on compte les valeurs de la classe.", `il y en a ${E[i]}.`, `l’effectif est ${E[i]}.`) };
  }),
  tpl("stat_classes_regrouper", 13, 3, "Effectif ÷ effectif total × 100.", () => {
    const T = un([20, 25, 50]);
    const { C, B, E, opt } = ctx(entre(4, 5), T);
    const i = entre(0, B.length - 2);
    const c = avecU(CL(B, i), C);
    const f = (E[i] * 100) / T;
    const text = `${C.sujet} ${un([`Quel pourcentage ${dI(C)} ${vb(C, c)} ?`, `Quelle est la fréquence, en %, de la classe ${c} ?`, `Calcule le pourcentage de la classe ${c}.`])}`;
    return { text, ...court(f), canvas: tableau(B, E, opt), explanation: expl(DEF_C, "on divise l’effectif de la classe par l’effectif total, puis on multiplie par 100.", `${E[i]} ÷ ${T} × 100 = ${fr(f)}.`, `cela fait ${fr(f)} %.`) };
  }),
  tpl("stat_classes_regrouper", 14, 3, "Ajoute les effectifs des classes concernées.", () => {
    const { C, B, E, opt } = ctx();
    const k = entre(1, B.length - 2);
    const auMoins = Math.random() < 0.5;
    const r = auMoins ? somme(E.slice(k)) : somme(E.slice(0, k));
    const s = `${auMoins ? "au moins" : "moins de"} ${B[k]} ${C.u}`;
    const text = `${C.sujet} ${un([`Combien ${dI(C)} ${vb(C, s)} ?`, `Trouve le nombre ${dI(C)} : ${s}.`, `Compte les ${C.ind} : ${s}.`])}`;
    return { text, ...court(r), canvas: tableau(B, E, opt), explanation: expl(DEF_C, "on ajoute les effectifs des classes concernées.", `total : ${r}.`, `il y a ${r} ${C.ind}.`) };
  }),

  tpl("stat_classes_regrouper", 15, 4, "Une valeur égale à une borne ouvre la classe suivante.", () => {
    const C = un(CONTEXTES);
    const min = C.debut + entre(0, C.pas - 1);
    const nb = entre(3, 6);
    const max = C.debut + nb * C.pas + (Math.random() < 0.4 ? 0 : entre(1, C.pas - 1));
    const r = Math.floor((max - C.debut) / C.pas) + 1;
    const text = `${C.sujet} La plus petite valeur est ${min} ${C.u}, la plus grande ${max} ${C.u}. On fait des classes de ${C.pas} ${C.u}, en partant de ${C.debut}. ${un(["Combien de classes faut-il ?", "Quel est le nombre de classes nécessaires ?", "Combien de classes pour tout ranger ?"])}`;
    return { text, ...court(r), explanation: expl(DEF_C, "on compte les classes jusqu’à celle qui contient la plus grande valeur ; une classe exclut sa borne de droite.", `${max} tombe dans la classe numéro ${r}.`, `il faut ${r} classes.`) };
  }),
  tpl("stat_classes_regrouper", 16, 4, "Effectif manquant = total − somme des autres.", () => {
    const { C, B, E, opt } = ctx();
    const i = entre(0, E.length - 1);
    const T = somme(E);
    const aff: (number | string)[] = E.map((e, j) => (j === i ? "?" : e));
    const c = avecU(CL(B, i), C);
    const text = `${C.sujet} ${un([`Il y a ${T} ${C.ind} en tout. Quel est l’effectif de la classe ${c} ?`, `Effectif total : ${T}. Trouve l’effectif de la classe ${c}.`, `Le total vaut ${T}. Que cache le « ? » de la classe ${c} ?`])}`;
    return { text, ...court(E[i]), canvas: tableau(B, aff, opt), explanation: expl(DEF_C, "on retire du total la somme des effectifs connus.", `${T} − ${T - E[i]} = ${E[i]}.`, `l’effectif manquant est ${E[i]}.`) };
  }),
  tpl("stat_classes_regrouper", 17, 4, "L’effectif de la grande classe est la somme ; son amplitude aussi s’additionne.", () => {
    const { C, B, E, opt } = ctx(5);
    const i = entre(0, 3);
    const amp = Math.random() < 0.5;
    const [c1, c2] = [CL(B, i), CL(B, i + 1)];
    const r = amp ? 2 * C.pas : E[i] + E[i + 1];
    const quoi = amp ? "Quelle est l’amplitude de la nouvelle classe ?" : "Quel est l’effectif de la nouvelle classe ?";
    const text = `${C.sujet} ${un(["On réunit", "On fusionne", "On regroupe"])} les classes ${c1} et ${c2}. ${quoi}`;
    return { text, ...court(r), canvas: tableau(B, E, opt), explanation: expl(DEF_C, amp ? "la nouvelle classe va de la première borne à la dernière." : "on ajoute les deux effectifs.", amp ? `${B[i + 2]} − ${B[i]} = ${r}.` : `${E[i]} + ${E[i + 1]} = ${r}.`, `le résultat est ${r}.`) };
  }),
];

/* ===== CLASSE MODALE ET CENTRE ===== */

const modaleCentre: TutorBankItemV4[] = [
  tpl("stat_classe_modale_centre", 1, 1, "Centre = (borne de gauche + borne de droite) ÷ 2.", () => {
    const B = bornes(2);
    const c = CL(B, 0);
    const m = centre(B, 0);
    const text = un([`Quel est le centre de la classe ${c} ?`, `Calcule le centre de la classe ${c}.`, `Classe ${c} : quel est son centre ?`, `Donne le centre de la classe ${c}.`, `Trouve le centre de la classe ${c}.`, `Écris le centre de la classe ${c}.`, `Cherche le centre de la classe ${c}.`, `Voici la classe ${c}. Quel est son centre ?`, `Combien vaut le centre de la classe ${c} ?`, `Une classe va ${c}. Quel est son centre ?`]);
    return { text, ...court(m), explanation: expl(DEF_M, "on calcule la moyenne des deux bornes.", `(${B[0]} + ${B[1]}) ÷ 2 = ${fr(m)}.`, `le centre est ${fr(m)}.`) };
  }),
  tpl("stat_classe_modale_centre", 2, 1, "Cherche le plus grand effectif du tableau.", () => {
    const nb = entre(4, 5);
    const B = bornes(nb);
    const E = effectifs(nb);
    const i = E.indexOf(Math.max(...E));
    const text = un(croise(DEB_T, ["Quelle est la classe modale ?", "Trouve la classe modale.", "Donne la classe modale.", "Choisis la classe modale."]));
    return { text, ...choix(CL(B, i), E.map((_, j) => CL(B, j))), canvas: tableau(B, E), explanation: expl(DEF_M, "on cherche le plus grand effectif.", `le plus grand effectif est ${E[i]}.`, `la classe modale est ${CL(B, i)}.`) };
  }),
  tpl("stat_classe_modale_centre", 3, 1, "Cherche la barre la plus haute.", () => {
    const nb = entre(4, 5);
    const B = bornes(nb);
    const E = effectifs(nb);
    const i = E.indexOf(Math.max(...E));
    const text = un(croise(DEB_H, ["Quelle est la classe modale ?", "Trouve la classe modale.", "Donne la classe modale.", "Choisis la classe modale."]));
    return { text, ...choix(CL(B, i), E.map((_, j) => CL(B, j))), canvas: histogramme(B, E, 1), explanation: expl(DEF_M, "on cherche la barre la plus haute.", `elle monte à ${E[i]}.`, `la classe modale est ${CL(B, i)}.`) };
  }),
  tpl("stat_classe_modale_centre", 4, 1, "Modale vient de « mode » : ce qui revient le plus.", () => {
    const text = un(["Que désigne la classe modale ?", "Qu’appelle-t-on la classe modale ?", "Quelle est la classe modale d’une série ?", "La classe modale, c’est quoi ?", "Choisis la définition de la classe modale.", "Quelle phrase définit la classe modale ?", "Comment reconnaît-on la classe modale ?", "Dans une série, où est la classe modale ?", "Quelle classe appelle-t-on modale ?", "Quelle classe dit-on modale ?"]);
    const juste = "La classe de plus grand effectif";
    return { text, ...choix(juste, ["La classe du milieu", "La classe de plus grande amplitude", "La classe de plus petit effectif", "La dernière classe"]), explanation: expl(DEF_M, "on regarde les effectifs, pas la place de la classe.", "effectif le plus grand = classe modale.", "c’est la classe de plus grand effectif.") };
  }),
  tpl("stat_classe_modale_centre", 5, 1, "On ajoute les deux bornes, puis on divise par 2.", () => {
    const B = bornes(2, false);
    const c = CL(B, 0);
    const juste = `(${B[0]} + ${B[1]}) ÷ 2`;
    const text = un([`Quel calcul donne le centre de la classe ${c} ?`, `Choisis le calcul du centre de la classe ${c}.`, `Classe ${c} : quel calcul donne son centre ?`, `Pour le centre de la classe ${c}, quel calcul faire ?`, `Lequel calcule le centre de la classe ${c} ?`, `Trouve le calcul du centre de la classe ${c}.`, `Le centre de la classe ${c} se calcule comment ?`, `Quel est le calcul du centre de la classe ${c} ?`]);
    return { text, ...choix(juste, [`${B[1]} − ${B[0]}`, `${B[0]} + ${B[1]}`, `(${B[1]} − ${B[0]}) ÷ 2`, `${B[0]} × ${B[1]} ÷ 2`]), explanation: expl(DEF_M, "le centre est la moyenne des deux bornes.", `${juste} = ${fr(centre(B, 0))}.`, `le bon calcul est ${juste}.`) };
  }),

  tpl("stat_classe_modale_centre", 6, 2, "Le centre peut être un nombre à virgule.", () => {
    const pas = un([5, 15, 25, 3, 7]);
    const d = pas * entre(1, 12);
    const B = [d, d + pas];
    const m = centre(B, 0);
    const c = CL(B, 0);
    const text = un([`Quel est le centre de la classe ${c} ?`, `Calcule le centre de la classe ${c}.`, `Classe ${c} : donne son centre.`, `Trouve le centre de la classe ${c}.`, `Écris le centre de la classe ${c}.`, `Cherche le centre de la classe ${c}.`, `Voici la classe ${c}. Calcule son centre.`, `Combien vaut le centre de la classe ${c} ?`]);
    return { text, ...court(m), explanation: expl(DEF_M, "on calcule la moyenne des deux bornes.", `(${B[0]} + ${B[1]}) ÷ 2 = ${fr(m)}.`, `le centre est ${fr(m)}.`) };
  }),
  tpl("stat_classe_modale_centre", 7, 2, "Trouve d’abord la classe modale, puis son centre.", () => {
    const nb = entre(4, 5);
    const B = bornes(nb);
    const E = effectifs(nb);
    const i = E.indexOf(Math.max(...E));
    const text = un(croise(DEB_T, ["Quel est le centre de la classe modale ?", "Calcule le centre de la classe modale.", "Donne le centre de la classe modale.", "Trouve le centre de la classe modale."]));
    return { text, ...court(centre(B, i)), canvas: tableau(B, E), explanation: expl(DEF_M, "on cherche la classe modale, puis la moyenne de ses bornes.", `classe ${CL(B, i)} ; (${B[i]} + ${B[i + 1]}) ÷ 2 = ${fr(centre(B, i))}.`, `le centre est ${fr(centre(B, i))}.`) };
  }),
  tpl("stat_classe_modale_centre", 8, 2, "Part du centre : retire puis ajoute la moitié de l’amplitude.", () => {
    const a = un([2, 4, 10, 20, 50]);
    const m = a / 2 + a * entre(1, 15);
    const g = m - a / 2;
    const f = (x: number) => `de ${x} à moins de ${x + a}`;
    const text = un([`Une classe a pour centre ${m} et pour amplitude ${a}. Quelle est-elle ?`, `Centre ${m}, amplitude ${a} : quelle est cette classe ?`, `Quelle classe a pour centre ${m} et pour amplitude ${a} ?`, `Trouve la classe de centre ${m} et d’amplitude ${a}.`, `Amplitude ${a}, centre ${m}. Choisis la classe.`, `Choisis la classe de centre ${m} et d’amplitude ${a}.`, `La classe de centre ${m} a pour amplitude ${a}. Laquelle est-ce ?`, `Quelle est la classe d’amplitude ${a} et de centre ${m} ?`]);
    return { text, ...choix(f(g), [f(m), f(g - a), f(g + a), `de ${g} à moins de ${m}`]), explanation: expl(DEF_M, "on retire et on ajoute la moitié de l’amplitude au centre.", `${m} − ${a / 2} = ${g} et ${m} + ${a / 2} = ${g + a}.`, `c’est la classe ${f(g)}.`) };
  }),
  tpl("stat_classe_modale_centre", 9, 2, "La hauteur de la barre la plus haute est l’effectif.", () => {
    const nb = entre(4, 5);
    const B = bornes(nb);
    const E = effectifs(nb);
    const i = E.indexOf(Math.max(...E));
    const text = un(croise(DEB_H, ["Quel est l’effectif de la classe modale ?", "Donne l’effectif de la classe modale.", "Lis l’effectif de la classe modale.", "Combien de valeurs dans la classe modale ?"]));
    return { text, ...court(E[i]), canvas: histogramme(B, E, 1), explanation: expl(DEF_M, "on lit la hauteur de la barre la plus haute.", `la barre monte à ${E[i]}.`, `l’effectif est ${E[i]}.`) };
  }),
  tpl("stat_classe_modale_centre", 10, 2, "Calcule le centre de chaque classe, dans l’ordre.", () => {
    const nb = entre(3, 4);
    const B = bornes(nb);
    const E = effectifs(nb);
    const C = E.map((_, i) => centre(B, i));
    const a = B[1] - B[0];
    const f = (l: number[]) => l.map(fr).join(" ; ");
    const text = un(croise(DEB_T, ["Quels sont les centres des classes ?", "Choisis la liste des centres.", "Trouve les centres de ces classes.", "Quelle liste donne les centres ?"]));
    return { text, ...choix(f(C), [f(C.map((x) => x - a / 2)), f(C.map((x) => x + a / 2)), f(C.map((x) => x + a)), f(E)]), canvas: tableau(B, E), explanation: expl(DEF_M, "on calcule la moyenne des bornes pour chaque classe.", `centres : ${f(C)}.`, `la liste est ${f(C)}.`) };
  }),

  tpl("stat_classe_modale_centre", 11, 3, "Plus grand effectif = classe modale.", () => {
    const { C, B, E, opt } = ctx();
    const i = E.indexOf(Math.max(...E));
    const text = `${C.sujet} ${un(["Quelle est la classe modale ?", "Trouve la classe modale de cette série.", "Dans quelle classe y a-t-il le plus de valeurs ?"])}`;
    return { text, ...choix(CL(B, i), E.map((_, j) => CL(B, j))), canvas: Math.random() < 0.5 ? tableau(B, E, opt) : histogramme(B, E, 1, { titre: C.col, axeY: opt.eff }), explanation: expl(DEF_M, "on cherche le plus grand effectif.", `le plus grand effectif est ${E[i]}.`, `la classe modale est ${CL(B, i)}.`) };
  }),
  tpl("stat_classe_modale_centre", 12, 3, "Trouve la classe modale, puis la moyenne de ses bornes.", () => {
    const { C, B, E, opt } = ctx();
    const i = E.indexOf(Math.max(...E));
    const text = `${C.sujet} ${un(["Quel est le centre de la classe modale ?", "Calcule le centre de la classe modale.", "Quelle valeur représente le mieux la classe la plus fournie ? Donne son centre."])}`;
    return { text, ...court(centre(B, i)), canvas: tableau(B, E, opt), explanation: expl(DEF_M, "on cherche la classe modale, puis la moyenne de ses bornes.", `(${B[i]} + ${B[i + 1]}) ÷ 2 = ${fr(centre(B, i))}.`, `le centre est ${fr(centre(B, i))} ${C.u}.`) };
  }),
  tpl("stat_classe_modale_centre", 13, 3, "Effectif de la classe modale ÷ effectif total × 100.", () => {
    const T = un([20, 25, 50]);
    const { C, B, E, opt } = ctx(entre(4, 5), T);
    const i = E.indexOf(Math.max(...E));
    const f = (E[i] * 100) / T;
    const text = `${C.sujet} ${un(["Quel pourcentage représente la classe modale ?", "Quelle est la fréquence, en %, de la classe modale ?", "Calcule le pourcentage de la classe modale."])}`;
    return { text, ...court(f), canvas: tableau(B, E, opt), explanation: expl(DEF_M, "on divise l’effectif de la classe modale par l’effectif total, puis on multiplie par 100.", `${E[i]} ÷ ${T} × 100 = ${fr(f)}.`, `cela fait ${fr(f)} %.`) };
  }),

  tpl("stat_classe_modale_centre", 14, 4, "L’amplitude est l’écart entre deux centres qui se suivent.", () => {
    const a = un([2, 4, 10, 20, 50]);
    const m1 = a / 2 + a * entre(1, 12);
    const m2 = m1 + a;
    const g = m2 - a / 2;
    const f = (x: number) => `de ${x} à moins de ${x + a}`;
    const qui = un(["Un tableau", "Un relevé", "Une enquête", "Un histogramme", "Une étude", "Un rapport", "Un sondage", "Un bilan"]);
    const text = `${qui} donne deux classes de même amplitude qui se suivent, de centres ${m1} et ${m2}. ${un(["Quelle est la classe de centre " + m2 + " ?", "Trouve la classe de centre " + m2 + ".", "Choisis la classe de centre " + m2 + "."])}`;
    return { text, ...choix(f(g), [f(m2), f(g - a), f(g + a), `de ${m1} à moins de ${m2}`]), explanation: expl(DEF_M, "l’amplitude est l’écart entre les centres, puis on place la classe autour de son centre.", `${m2} − ${m1} = ${a} ; ${m2} − ${a / 2} = ${g}.`, `c’est la classe ${f(g)}.`) };
  }),
  tpl("stat_classe_modale_centre", 15, 4, "Ajoute les nouvelles valeurs, puis cherche le plus grand effectif.", () => {
    for (;;) {
    const { C, B, E, opt } = ctx();
    const iMax = E.indexOf(Math.max(...E));
    let j = entre(0, E.length - 1);
    while (j === iMax) j = entre(0, E.length - 1);
    const k = E[iMax] - E[j] + (Math.random() < 0.5 ? 1 : -1);
    if (k < 1 || E[j] + k === E[iMax]) continue;
    const N = E.map((e, x) => (x === j ? e + k : e));
    const m = Math.max(...N);
    if (N.filter((x) => x === m).length !== 1) continue;
    const i = N.indexOf(m);
    const c = avecU(CL(B, j), C);
    const text = `${C.sujet} ${un(["On ajoute", "On rajoute", "On compte encore"])} ${k} valeur${k > 1 ? "s" : ""} dans la classe ${c}. ${un(["Quelle est la classe modale maintenant ?", "Quelle est la nouvelle classe modale ?"])}`;
    return { text, ...choix(CL(B, i), E.map((_, x) => CL(B, x))), canvas: tableau(B, E, opt), explanation: expl(DEF_M, "on ajoute les valeurs, puis on compare les effectifs.", `effectifs : ${N.join(" ; ")}.`, `la classe modale est ${CL(B, i)}.`) };
    }
  }),
  tpl("stat_classe_modale_centre", 16, 4, "Répartis la série, puis cherche la classe la plus remplie.", () => {
    const C = un(CONTEXTES);
    const B = bornesCtx(C, 3);
    let E: number[];
    do E = Array.from({ length: 3 }, () => entre(1, 6));
    while (E.filter((x) => x === Math.max(...E)).length !== 1);
    const l = brut(B, E);
    const i = E.indexOf(Math.max(...E));
    const text = `${C.sujet} Valeurs : ${liste(l)}. Classes : ${E.map((_, j) => CL(B, j)).join(", ")}. ${un(["Quelle est la classe modale ?", "Trouve la classe modale.", "Choisis la classe modale."])}`;
    return { text, ...choix(CL(B, i), E.map((_, j) => CL(B, j))), explanation: expl(DEF_M, "on range chaque valeur dans sa classe, puis on compare.", `effectifs : ${E.join(" ; ")}.`, `la classe modale est ${CL(B, i)}.`) };
  }),
];

/* ===== MOYENNE D'UNE SÉRIE EN CLASSES ===== */

const fmtCalc = (C: number[], E: number[]) => `(${C.map((c, i) => `${fr(c)} × ${E[i]}`).join(" + ")}) ÷ ${somme(E)}`;
const moy = (C: number[], E: number[]) => somme(C.map((c, i) => c * E[i])) / somme(E);
const explY = (B: number[], E: number[]) => {
  const C = E.map((_, i) => centre(B, i));
  const S = somme(C.map((c, i) => c * E[i]));
  return expl(DEF_Y, "on multiplie chaque centre par son effectif, on ajoute, puis on divise par l’effectif total.", `${fmtCalc(C, E)} = ${fr(S)} ÷ ${somme(E)} = ${fr(S / somme(E))}.`, `la moyenne vaut ${fr(S / somme(E))}.`);
};

const moyenneClasses: TutorBankItemV4[] = [
  tpl("stat_moyenne_classes", 1, 1, "Centre de la classe × effectif.", () => {
    const B = bornes(2);
    const e = entre(2, 15);
    const c = CL(B, 0);
    const p = centre(B, 0) * e;
    const text = un([`Classe ${c}, effectif ${e}. Calcule centre × effectif.`, `Effectif ${e}, classe ${c}. Que vaut centre × effectif ?`, `Pour la classe ${c}, d’effectif ${e}, calcule centre × effectif.`, `La classe ${c} a pour effectif ${e}. Calcule centre × effectif.`, `Calcule centre × effectif : classe ${c}, effectif ${e}.`, `Donne centre × effectif : classe ${c}, effectif ${e}.`, `Trouve centre × effectif : classe ${c}, effectif ${e}.`, `Classe ${c} : ${e} valeurs. Que vaut centre × effectif ?`, `Écris centre × effectif : classe ${c}, effectif ${e}.`, `Que donne centre × effectif, classe ${c}, effectif ${e} ?`]);
    return { text, ...court(p), explanation: expl(DEF_Y, "on calcule le centre, puis on multiplie par l’effectif.", `(${B[0]} + ${B[1]}) ÷ 2 = ${fr(centre(B, 0))} ; ${fr(centre(B, 0))} × ${e} = ${fr(p)}.`, `le produit vaut ${fr(p)}.`) };
  }),
  tpl("stat_moyenne_classes", 2, 1, "Somme des produits ÷ effectif total.", () => {
    const T = un(TOTAUX);
    const m = entre(5, 80) + un([0, 0, 0.5]);
    const S = m * T;
    const text = un([`La somme des produits vaut ${fr(S)}. L’effectif total est ${T}. Quelle est la moyenne ?`, `Somme des produits : ${fr(S)}. Effectif total : ${T}. Calcule la moyenne.`, `Effectif total ${T}, somme des produits ${fr(S)}. Donne la moyenne.`, `Calcule la moyenne : somme des produits ${fr(S)}, effectif total ${T}.`, `Trouve la moyenne : somme des produits ${fr(S)}, effectif total ${T}.`, `Avec ${fr(S)} pour somme des produits et ${T} valeurs, quelle est la moyenne ?`, `Moyenne ? Somme des produits ${fr(S)}, effectif total ${T}.`, `Pour ${T} valeurs, la somme des produits vaut ${fr(S)}. Donne la moyenne.`]);
    return { text, ...court(m), explanation: expl(DEF_Y, "on divise la somme des produits par l’effectif total.", `${fr(S)} ÷ ${T} = ${fr(m)}.`, `la moyenne vaut ${fr(m)}.`) };
  }),
  tpl("stat_moyenne_classes", 3, 1, "Chaque centre est multiplié par son effectif.", () => {
    const B = bornes(2);
    let E = [entre(2, 9), entre(2, 9)];
    while (E[0] === E[1]) E = [entre(2, 9), entre(2, 9)];
    const C = [centre(B, 0), centre(B, 1)];
    const juste = fmtCalc(C, E);
    const text = un(croise(DEB_T, ["Quel calcul donne la moyenne ?", "Choisis le calcul de la moyenne.", "Trouve le calcul de la moyenne.", "Lequel calcule la moyenne ?"]));
    return { text, ...choix(juste, [`(${C[0]} × ${E[1]} + ${C[1]} × ${E[0]}) ÷ ${E[0] + E[1]}`, `(${B[0]} × ${E[0]} + ${B[1]} × ${E[1]}) ÷ ${E[0] + E[1]}`, `(${C[0]} + ${C[1]}) ÷ 2`, `(${C[0]} × ${E[0]} + ${C[1]} × ${E[1]}) ÷ 2`]), canvas: tableau(B, E), explanation: explY(B, E) };
  }),
  tpl("stat_moyenne_classes", 4, 1, "On ne connaît pas les valeurs exactes : on prend le milieu de la classe.", () => {
    const text = un(["Pour la moyenne d’une série en classes, quelle valeur prend-on pour chaque classe ?", "Moyenne d’une série en classes : quelle valeur remplace chaque classe ?", "Quelle valeur représente une classe dans le calcul de la moyenne ?", "Dans la moyenne d’une série en classes, que multiplie-t-on par l’effectif ?", "Choisis ce qui remplace une classe dans le calcul de la moyenne.", "Pour la moyenne, chaque classe est remplacée par quoi ?", "Quelle valeur garde-t-on d’une classe pour la moyenne ?", "Par quoi multiplie-t-on l’effectif d’une classe pour la moyenne ?", "Que retient-on d’une classe pour calculer la moyenne ?", "Dans une moyenne en classes, quel nombre représente la classe ?"]);
    return { text, ...choix("Son centre", ["Sa borne de gauche", "Sa borne de droite", "Son amplitude"]), explanation: expl(DEF_Y, "on ne connaît pas les valeurs exactes de la classe, on prend son milieu.", "chaque classe est remplacée par son centre.", "on prend le centre de la classe.") };
  }),

  tpl("stat_moyenne_classes", 5, 2, "Centre × effectif pour chaque classe, on ajoute, puis on divise par le total.", () => {
    const T = un(TOTAUX);
    const B = bornes(3);
    const E = effectifsTotal(3, T);
    const text = un(croise(DEB_T, ["Calcule la moyenne de cette série.", "Quelle est la moyenne de cette série ?", "Donne la moyenne de la série.", "Trouve la moyenne avec les centres.", "Calcule la moyenne avec les centres."]));
    return { text, ...court(moy(E.map((_, i) => centre(B, i)), E)), canvas: tableau(B, E), explanation: explY(B, E) };
  }),
  tpl("stat_moyenne_classes", 6, 2, "Centre × effectif pour chaque classe, puis on ajoute.", () => {
    const nb = 3;
    const B = bornes(nb);
    const E = effectifs(nb);
    const C = E.map((_, i) => centre(B, i));
    const S = somme(C.map((c, i) => c * E[i]));
    const text = un(croise(DEB_T, ["Calcule la somme des produits centre × effectif.", "Que vaut la somme des centre × effectif ?", "Donne la somme des produits centre × effectif.", "Trouve la somme des centre × effectif.", "Ajoute les produits centre × effectif."]));
    return { text, ...court(S), canvas: tableau(B, E), explanation: expl(DEF_Y, "on multiplie chaque centre par son effectif, puis on ajoute.", `${C.map((c, i) => `${fr(c)} × ${E[i]}`).join(" + ")} = ${fr(S)}.`, `la somme vaut ${fr(S)}.`) };
  }),
  tpl("stat_moyenne_classes", 7, 2, "Lis les effectifs sur l’axe, puis calcule avec les centres.", () => {
    const T = un([10, 20, 20]);
    const B = bornes(3);
    const step = T === 10 ? 1 : un([1, 2]);
    const E = effectifsTotal(3, T, step);
    const text = un(croise(DEB_H, ["Calcule la moyenne de cette série.", "Quelle est la moyenne de cette série ?", "Donne la moyenne de la série.", "Trouve la moyenne avec les centres."]));
    return { text, ...court(moy(E.map((_, i) => centre(B, i)), E)), canvas: histogramme(B, E, step), explanation: explY(B, E) };
  }),
  tpl("stat_moyenne_classes", 8, 2, "Dans une classe, on ne connaît pas les vraies valeurs.", () => {
    const text = un(["La moyenne calculée avec les centres est-elle exacte ?", "Moyenne avec les centres : que peut-on dire d’elle ?", "Que donne le calcul de la moyenne par les centres ?", "Le calcul par les centres donne quelle sorte de moyenne ?", "Choisis la phrase juste sur la moyenne par les centres.", "Une moyenne en classes est-elle exacte ?", "Pourquoi parle-t-on de moyenne approchée pour une série en classes ?", "Que vaut la moyenne par les centres par rapport à la vraie moyenne ?", "Quelle phrase décrit la moyenne d’une série en classes ?", "Moyenne par les centres et vraie moyenne : que dire ?"]);
    return { text, ...choix("C’est une valeur approchée de la vraie moyenne", ["C’est toujours la vraie moyenne", "C’est toujours plus grand que la vraie moyenne", "C’est toujours plus petit que la vraie moyenne"]), explanation: expl(DEF_Y, "on remplace les valeurs d’une classe par son centre : on perd les valeurs exactes.", "le centre n’est pas la vraie valeur de chaque donnée.", "c’est une valeur approchée de la vraie moyenne.") };
  }),

  tpl("stat_moyenne_classes", 9, 3, "Centre × effectif pour chaque classe, on ajoute, puis on divise par le total.", () => {
    const T = un(TOTAUX);
    const { C, B, E, opt } = ctx(4, T);
    const m = moy(E.map((_, i) => centre(B, i)), E);
    const text = `${C.sujet} ${un(["Calcule la moyenne de cette série.", `Quelle est la valeur moyenne, en ${C.u} ?`, "Donne la moyenne en utilisant les centres."])}`;
    return { text, ...court(m), canvas: tableau(B, E, opt), explanation: explY(B, E) };
  }),
  tpl("stat_moyenne_classes", 10, 3, "Calcule la moyenne, puis arrondis au dixième.", () => {
    const { C, B, E, opt } = ctx(3);
    const T = somme(E);
    const m = moy(E.map((_, i) => centre(B, i)), E);
    const a = Math.floor(m * 10 + 0.5 + 1e-9) / 10;
    const text = `${C.sujet} ${un(["Calcule la moyenne, arrondie au dixième.", "Donne la moyenne arrondie au dixième.", "Quelle est la moyenne, au dixième près par arrondi ?"])}`;
    return { text, ...court(a), canvas: tableau(B, E, opt), explanation: expl(DEF_Y, "on calcule la moyenne avec les centres, puis on arrondit.", `${fmtCalc(E.map((_, i) => centre(B, i)), E)} ≈ ${fr(a)} ; effectif total ${T}.`, `la moyenne vaut environ ${fr(a)} ${C.u}.`) };
  }),
  tpl("stat_moyenne_classes", 11, 3, "Lis les effectifs sur l’axe, puis calcule avec les centres.", () => {
    const T = un([10, 20, 20, 50]);
    const { C, B, E, step, opt } = ctx(4, T);
    const m = moy(E.map((_, i) => centre(B, i)), E);
    const text = `${C.sujet} ${un(["Calcule la moyenne de cette série avec les centres.", `Quelle est la moyenne, en ${C.u} ?`, "Lis les effectifs, puis donne la moyenne."])}`;
    return { text, ...court(m), canvas: histogramme(B, E, step, { titre: C.col, axeY: opt.eff }), explanation: explY(B, E) };
  }),

  tpl("stat_moyenne_classes", 12, 4, "Écris l’égalité de la moyenne et cherche l’effectif manquant.", () => {
    for (;;) {
      const { C, B, opt } = ctx(3);
      const E = [entre(2, 9), entre(2, 9), entre(2, 9)];
      const T = somme(E);
      const K = E.map((_, i) => centre(B, i));
      const m = moy(K, E);
      if (Math.abs(m * 100 - Math.round(m * 100)) > 1e-9) continue;
      const i = entre(0, 2);
      if (Math.abs(K[i] - m) < 1e-9) continue;
      const aff: (number | string)[] = E.map((e, j) => (j === i ? "?" : e));
      const text = `${C.sujet} ${un([`La moyenne vaut ${fr(m)} ${C.u}. Que cache le « ? » ?`, `La moyenne est ${fr(m)} ${C.u}. Trouve l’effectif manquant.`])}`;
      return { text, ...court(E[i]), canvas: tableau(B, aff, opt), explanation: expl(DEF_Y, "on écrit que somme des produits = moyenne × effectif total, puis on cherche l’inconnue.", `avec ${E[i]}, on trouve ${fmtCalc(K, E)} = ${fr(m)}.`, `l’effectif manquant est ${E[i]}.`) };
    }
  }),
  tpl("stat_moyenne_classes", 13, 4, "Calcule les deux moyennes, puis compare-les.", () => {
    for (;;) {
      const { C, B } = ctx(3);
      const T = un([10, 20, 20]);
      const A = effectifsTotal(3, T);
      const D = effectifsTotal(3, T);
      const K = A.map((_, i) => centre(B, i));
      const [ma, md] = [moy(K, A), moy(K, D)];
      if (Math.abs(ma - md) < 1e-9) continue;
      const juste = ma > md ? "Groupe A" : "Groupe B";
      const figure: TableauDonneesCanvasData = { kind: "tableau_donnees", headers: [C.col, "Groupe A", "Groupe B"], rows: A.map((a, i) => ({ values: [CL(B, i), a, D[i]] })) };
      const text = `${C.sujet} ${un(["Quel groupe a la plus grande moyenne ?", "Quelle moyenne est la plus grande ?", "Compare les moyennes : quel groupe est devant ?"])}`;
      return { text, format: "qcm" as const, choices: ["Groupe A", "Groupe B"], expected: [juste], comparator: "mcq_exact" as const, canvas: figure, explanation: expl(DEF_Y, "on calcule la moyenne de chaque groupe avec les centres.", `A : ${fr(ma)} ; B : ${fr(md)}.`, `c’est le ${juste.toLowerCase()}.`) };
    }
  }),
  tpl("stat_moyenne_classes", 14, 4, "Effectif × moyenne pour chaque groupe, on ajoute, on divise par le total.", () => {
    for (;;) {
      const n1 = un([10, 20, 30, 40]);
      const n2 = un([10, 20, 30, 50]);
      const m1 = entre(8, 18);
      const m2 = entre(8, 18);
      if (m1 === m2) continue;
      const m = (n1 * m1 + n2 * m2) / (n1 + n2);
      if (Math.abs(m * 100 - Math.round(m * 100)) > 1e-9) continue;
      const [a, b] = un([["Un groupe", "un autre groupe"], ["Une classe", "une autre classe"], ["Un atelier", "un autre atelier"], ["Une équipe", "une autre équipe"], ["Un village", "un autre village"], ["Une école", "une autre école"], ["Un club", "un autre club"], ["Un service", "un autre service"]] as const);
      const text = `${a} de ${n1} personnes a pour moyenne ${m1} ; ${b} de ${n2} personnes a pour moyenne ${m2}. ${un(["Quelle est la moyenne de l’ensemble ?", "Calcule la moyenne de tout le monde.", "Donne la moyenne des deux réunis."])}`;
      return { text, ...court(m), explanation: expl(DEF_Y, "on ne fait pas la moyenne des moyennes : on pèse par les effectifs.", `(${n1} × ${m1} + ${n2} × ${m2}) ÷ ${n1 + n2} = ${fr(m)}.`, `la moyenne vaut ${fr(m)}.`) };
    }
  }),
];

/* ===== EFFECTIFS CUMULÉS ===== */

const explK = (B: number[], E: number[], i: number) => expl(DEF_K, "on ajoute les effectifs depuis la première classe.", `${E.slice(0, i + 1).join(" + ")} = ${somme(E.slice(0, i + 1))}.`, `l’effectif cumulé de la classe ${CL(B, i)} est ${somme(E.slice(0, i + 1))}.`);

const effectifsCumules: TutorBankItemV4[] = [
  tpl("stat_effectifs_cumules", 1, 1, "Ajoute les effectifs jusqu’à cette classe.", () => {
    const nb = entre(4, 5);
    const B = bornes(nb);
    const E = effectifs(nb);
    const i = entre(1, nb - 1);
    const c = CL(B, i);
    const text = un(croise(DEB_T, [`Quel est l’effectif cumulé de la classe ${c} ?`, `Calcule l’effectif cumulé de la classe ${c}.`, `Donne l’effectif cumulé de la classe ${c}.`, `Trouve l’effectif cumulé de la classe ${c}.`]));
    return { text, ...court(somme(E.slice(0, i + 1))), canvas: tableau(B, E), explanation: explK(B, E, i) };
  }),
  tpl("stat_effectifs_cumules", 2, 1, "Cumulé d’avant + effectif de la ligne.", () => {
    const nb = entre(4, 5);
    const B = bornes(nb);
    const E = effectifs(nb);
    const K = cumuls(E);
    const i = entre(1, nb - 1);
    const aff: (number | string)[] = K.map((k, j) => (j === i ? "?" : k));
    const text = un(croise(DEB_T, ["Que cache le « ? » ?", "Quel nombre remplace le « ? » ?", "Complète le « ? ».", "Trouve le nombre caché par le « ? ».", "Calcule le « ? »."]));
    return { text, ...court(K[i]), canvas: tableau(B, E, { cum: aff }), explanation: expl(DEF_K, "on ajoute l’effectif de la ligne au cumul de la ligne d’avant.", `${K[i - 1]} + ${E[i]} = ${K[i]}.`, `le nombre caché est ${K[i]}.`) };
  }),
  tpl("stat_effectifs_cumules", 3, 1, "Le dernier cumul contient toutes les valeurs.", () => {
    const nb = entre(4, 5);
    const B = bornes(nb);
    const E = effectifs(nb);
    const text = un(croise(DEB_T, ["Quel est le dernier effectif cumulé ?", "Calcule le dernier effectif cumulé.", "Donne le dernier effectif cumulé.", "Que vaut le dernier effectif cumulé ?", "Trouve le dernier effectif cumulé."]));
    return { text, ...court(somme(E)), canvas: tableau(B, E), explanation: expl(DEF_K, "le dernier cumul est le total de tous les effectifs.", `${E.join(" + ")} = ${somme(E)}.`, `le dernier effectif cumulé est ${somme(E)}.`) };
  }),
  tpl("stat_effectifs_cumules", 4, 1, "Un cumul compte tout ce qui est avant la borne de droite.", () => {
    const B = bornes(2);
    const c = CL(B, 0);
    const v = B[1];
    const text = un([`Que compte l’effectif cumulé de la classe ${c} ?`, `Classe ${c} : que donne son effectif cumulé ?`, `Que dit l’effectif cumulé de la classe ${c} ?`, `Choisis le sens de l’effectif cumulé de la classe ${c}.`, `Effectif cumulé de la classe ${c} : que compte-t-il ?`, `Quel sens a l’effectif cumulé de la classe ${c} ?`, `Comment lire l’effectif cumulé de la classe ${c} ?`, `Trouve le sens de l’effectif cumulé de la classe ${c}.`]);
    return { text, ...choix(`Les valeurs inférieures à ${v}`, [`Les valeurs supérieures à ${v}`, `Les valeurs égales à ${v}`, `Seulement les valeurs de cette classe`, `Toutes les valeurs de la série`]), explanation: expl(DEF_K, "on regarde la borne de droite de la classe.", `borne de droite : ${v}.`, `il compte les valeurs inférieures à ${v}.`) };
  }),

  tpl("stat_effectifs_cumules", 5, 2, "Lis le cumul de la classe qui finit à ce seuil.", () => {
    const nb = entre(4, 5);
    const B = bornes(nb);
    const E = effectifs(nb);
    const K = cumuls(E);
    const i = entre(0, nb - 2);
    const text = un(croise(DEB_T, [`Combien de valeurs sont inférieures à ${B[i + 1]} ?`, `Combien de valeurs font moins de ${B[i + 1]} ?`, `Donne le nombre de valeurs sous ${B[i + 1]}.`, `Compte les valeurs inférieures à ${B[i + 1]}.`]));
    return { text, ...court(K[i]), canvas: tableau(B, E, { cum: K }), explanation: expl(DEF_K, "on lit le cumul de la classe qui se termine à ce seuil.", `classe ${CL(B, i)} : ${K[i]}.`, `il y a ${K[i]} valeurs.`) };
  }),
  tpl("stat_effectifs_cumules", 6, 2, "Effectif = cumul de la ligne − cumul d’avant.", () => {
    const nb = entre(4, 5);
    const B = bornes(nb);
    const E = effectifs(nb);
    const K = cumuls(E);
    const i = entre(1, nb - 1);
    const c = CL(B, i);
    const text = un(croise(["Lis les effectifs cumulés.", "Regarde les effectifs cumulés.", "Voici les effectifs cumulés."], [`Quel est l’effectif de la classe ${c} ?`, `Retrouve l’effectif de la classe ${c}.`, `Donne l’effectif de la classe ${c}.`, `Déduis l’effectif de la classe ${c}.`, `Calcule l’effectif de la classe ${c}.`]));
    return { text, ...court(E[i]), canvas: tableau(B, E, { seulCum: true, cum: K }), explanation: expl(DEF_K, "on soustrait le cumul de la ligne d’avant.", `${K[i]} − ${K[i - 1]} = ${E[i]}.`, `l’effectif est ${E[i]}.`) };
  }),
  tpl("stat_effectifs_cumules", 7, 2, "Effectif cumulé ÷ effectif total × 100.", () => {
    const T = un([20, 25, 50]);
    const nb = 4;
    const B = bornes(nb);
    const E = effectifsTotal(nb, T);
    const K = cumuls(E);
    const i = entre(0, 2);
    const f = (K[i] * 100) / T;
    const text = un(croise(DEB_T, [`Quelle fréquence cumulée, en %, sous ${B[i + 1]} ?`, `Calcule la fréquence cumulée, en %, sous ${B[i + 1]}.`, `Quel pourcentage de valeurs est sous ${B[i + 1]} ?`, `Donne le pourcentage de valeurs sous ${B[i + 1]}.`]));
    return { text, ...court(f), canvas: tableau(B, E, { cum: K }), explanation: expl(DEF_K, "on divise le cumul par l’effectif total, puis on multiplie par 100.", `${K[i]} ÷ ${T} × 100 = ${fr(f)}.`, `cela fait ${fr(f)} %.`) };
  }),
  tpl("stat_effectifs_cumules", 8, 2, "Lis la hauteur du point au-dessus de la valeur.", () => {
    const nb = entre(4, 5);
    const B = bornes(nb);
    const E = Array.from({ length: nb }, () => 2 * entre(1, 5));
    const K = cumuls(E);
    const i = entre(0, nb - 2);
    const text = un(croise(["Lis le polygone des effectifs cumulés.", "Regarde ce polygone.", "Observe le polygone des effectifs cumulés."], [`Combien de valeurs sont inférieures à ${B[i + 1]} ?`, `Combien de valeurs font moins de ${B[i + 1]} ?`, `Donne le nombre de valeurs sous ${B[i + 1]}.`, `Lis le nombre de valeurs sous ${B[i + 1]}.`, `Compte les valeurs inférieures à ${B[i + 1]}.`]));
    return { text, ...court(K[i]), canvas: polygone(B, E, 2), explanation: expl(DEF_K, "on lit la hauteur du point au-dessus de la valeur.", `au-dessus de ${B[i + 1]}, le point est à ${K[i]}.`, `il y a ${K[i]} valeurs.`) };
  }),
  tpl("stat_effectifs_cumules", 9, 2, "Chaque cumul ajoute l’effectif suivant.", () => {
    const nb = 4;
    const B = bornes(nb);
    const E = effectifs(nb);
    const K = cumuls(E);
    const f = (l: number[]) => l.join(" ; ");
    const text = un(croise(DEB_T, ["Quelle liste donne les effectifs cumulés ?", "Choisis les effectifs cumulés.", "Trouve la liste des effectifs cumulés.", "Quels sont les effectifs cumulés ?", "Repère la liste des cumulés."]));
    return { text, ...choix(f(K), [f(E), f([...K].map((k) => k + 1)), f([K[0], K[1], K[2] + 1, K[3] + 1]), f(E.map((_, i) => somme(E.slice(i))))]), canvas: tableau(B, E), explanation: expl(DEF_K, "on ajoute les effectifs de proche en proche.", `${f(K)}.`, `la liste est ${f(K)}.`) };
  }),

  tpl("stat_effectifs_cumules", 10, 3, "Au moins = total − cumul de moins.", () => {
    const { C, B, E, opt } = ctx();
    const K = cumuls(E);
    const i = entre(0, E.length - 2);
    const T = somme(E);
    const text = `${C.sujet} ${un([`Combien ${dI(C)} ${vb(C, `au moins ${B[i + 1]} ${C.u}`)} ?`, `Compte les ${C.ind} : au moins ${B[i + 1]} ${C.u}.`, `Trouve le nombre ${dI(C)} : au moins ${B[i + 1]} ${C.u}.`])}`;
    return { text, ...court(T - K[i]), canvas: tableau(B, E, { ...opt, cum: K }), explanation: expl(DEF_K, "on retire du total les valeurs inférieures au seuil.", `${T} − ${K[i]} = ${T - K[i]}.`, `il y en a ${T - K[i]}.`) };
  }),
  tpl("stat_effectifs_cumules", 11, 3, "Cumul ÷ total × 100.", () => {
    const T = un([20, 25, 50]);
    const { C, B, E, opt } = ctx(4, T);
    const K = cumuls(E);
    const i = entre(0, 2);
    const f = (K[i] * 100) / T;
    const text = `${C.sujet} ${un([`Quel pourcentage ${dI(C)} ${vb(C, `moins de ${B[i + 1]} ${C.u}`)} ?`, `Calcule le pourcentage ${dI(C)} : moins de ${B[i + 1]} ${C.u}.`, `Donne la fréquence cumulée, en %, sous ${B[i + 1]} ${C.u}.`])}`;
    return { text, ...court(f), canvas: tableau(B, E, { ...opt, cum: K }), explanation: expl(DEF_K, "on divise le cumul par le total, puis on multiplie par 100.", `${K[i]} ÷ ${T} × 100 = ${fr(f)}.`, `cela fait ${fr(f)} %.`) };
  }),
  tpl("stat_effectifs_cumules", 12, 3, "Lis la hauteur du point au-dessus de la valeur.", () => {
    const C = un(CONTEXTES);
    const nb = 4;
    const B = bornesCtx(C, nb);
    const E = Array.from({ length: nb }, () => 2 * entre(1, 5));
    const K = cumuls(E);
    const i = entre(0, nb - 2);
    const text = `${C.sujet} Voici le polygone des effectifs cumulés. ${un([`Combien ${dI(C)} ${vb(C, `moins de ${B[i + 1]} ${C.u}`)} ?`, `Lis le nombre ${dI(C)} : moins de ${B[i + 1]} ${C.u}.`, `Compte les ${C.ind} : moins de ${B[i + 1]} ${C.u}.`])}`;
    return { text, ...court(K[i]), canvas: polygone(B, E, 2, { titre: C.col }), explanation: expl(DEF_K, "on lit la hauteur du point au-dessus de la valeur.", `au-dessus de ${B[i + 1]}, le point est à ${K[i]}.`, `il y en a ${K[i]}.`) };
  }),

  tpl("stat_effectifs_cumules", 13, 4, "La médiane est dans la première classe dont le cumul dépasse la moitié du total.", () => {
    for (;;) {
      const { C, B, E, opt } = ctx();
      const K = cumuls(E);
      const T = somme(E);
      if (K.some((k) => k === T / 2)) continue;
      const i = K.findIndex((k) => k > T / 2);
      const text = `${C.sujet} ${un(["Dans quelle classe se trouve la médiane ?", "Quelle classe contient la médiane ?", "Choisis la classe de la médiane."])}`;
      return { text, ...choix(CL(B, i), E.map((_, j) => CL(B, j))), canvas: tableau(B, E, { ...opt, cum: K }), explanation: expl(DEF_K, "on cherche la première classe dont le cumul dépasse la moitié de l’effectif total.", `${T} ÷ 2 = ${fr(T / 2)} ; le cumul ${K[i]} dépasse ${fr(T / 2)}.`, `la médiane est dans la classe ${CL(B, i)}.`) };
    }
  }),
  tpl("stat_effectifs_cumules", 14, 4, "Cherche la valeur où le polygone atteint la moitié du total.", () => {
    for (;;) {
      const C = un(CONTEXTES);
      const nb = 4;
      const B = bornesCtx(C, nb);
      const E = Array.from({ length: nb }, () => 2 * entre(1, 5));
      const K = cumuls(E);
      const T = somme(E);
      const i = K.indexOf(T / 2);
      if (i < 0) continue;
      const text = `${C.sujet} Voici le polygone des effectifs cumulés. ${un(["Lis la médiane sur ce polygone.", "Quelle est la médiane de cette série ?", "Trouve la médiane sur ce polygone."])}`;
      return { text, ...court(B[i + 1]), canvas: polygone(B, E, 2, { titre: C.col }), explanation: expl(DEF_K, "on cherche la valeur dont le cumul est la moitié de l’effectif total.", `${T} ÷ 2 = ${T / 2} : le point de hauteur ${T / 2} est au-dessus de ${B[i + 1]}.`, `la médiane vaut ${B[i + 1]} ${C.u}.`) };
    }
  }),
  tpl("stat_effectifs_cumules", 15, 4, "Effectif cumulé décroissant : on ajoute en partant de la dernière classe.", () => {
    const { C, B, E, opt } = ctx();
    const i = entre(1, E.length - 1);
    const r = somme(E.slice(i));
    const text = `${C.sujet} ${un([`Quel est l’effectif cumulé décroissant à partir de ${B[i]} ${C.u} ?`, `Calcule l’effectif cumulé décroissant, à partir de ${B[i]} ${C.u}.`, `Donne l’effectif cumulé décroissant à partir de ${B[i]} ${C.u}.`])}`;
    return { text, ...court(r), canvas: tableau(B, E, opt), explanation: expl("l’effectif cumulé décroissant à partir d’une borne compte les valeurs égales ou supérieures à cette borne.", "on ajoute les effectifs des classes à partir de cette borne.", `${E.slice(i).join(" + ")} = ${r}.`, `il vaut ${r}.`) };
  }),
  tpl("stat_effectifs_cumules", 16, 4, "Effectif d’une classe = écart entre deux cumuls voisins.", () => {
    const { C, B, E, opt } = ctx(5);
    const K = cumuls(E);
    const i = entre(1, 3);
    const j = entre(i + 1, 4);
    const r = K[j] - K[i - 1];
    const text = `${C.sujet} ${un([`Combien ${dI(C)} sont entre ${B[i]} et ${B[j + 1]} ${C.u} ?`, `Compte les ${C.ind} entre ${B[i]} et ${B[j + 1]} ${C.u}.`, `Trouve le nombre ${dI(C)} entre ${B[i]} et ${B[j + 1]} ${C.u}.`])}`;
    return { text, ...court(r), canvas: tableau(B, E, { ...opt, seulCum: true, cum: K }), explanation: expl(DEF_K, "on soustrait deux cumuls.", `${K[j]} − ${K[i - 1]} = ${r}.`, `il y en a ${r}.`) };
  }),
];

export const statClassesBank: TutorBankItemV4[] = [...regrouper, ...modaleCentre, ...moyenneClasses, ...effectifsCumules];
