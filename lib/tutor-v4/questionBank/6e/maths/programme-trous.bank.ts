// LES TROIS TROUS DU PROGRAMME DE 6e (05/11/2026) : le produit de deux décimaux, les
// angles adjacents, supplémentaires et opposés par le sommet, la fraction comme quotient.
// ★1-★2 : phrase courte, sans prénom ni histoire. Le contexte arrive à ★3.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { CALC, LETTRES, atelier, entre, etapes, fr, melange, qcm, qcmN, tournure, un } from "../../cm1/maths/trous-outils";

const arr = (v: number) => Math.round(v * 100000) / 100000;
const euro = (v: number) => `${v.toFixed(2).replace(".", ",")} €`;
const lettres = (n: number) => melange([...LETTRES]).slice(0, n);
const hat = (a: string, b: string, c: string) => `$\\widehat{${a}${b}${c}}$`;
/** QCM en degrés : « 65° », sans espace. */
const qcmD = (j: number, faux: number[]) => {
  const q = qcmN(j, faux, "°", 5);
  const net = (x: string) => x.replace(" °", "°");
  return { ...q, choices: (q.choices ?? []).map(net), expected: q.expected.map(net) };
};

/* ═════════════════ decimal_multiplier_decimaux ═════════════════ */
const D = atelier("6e", "decimal_calcul", "decimal_multiplier_decimaux");
const HINT_D = "Multiplie sans les virgules. Puis compte les chiffres après la virgule des deux nombres.";
/** Deux décimaux dont le produit ne finit pas par 0 : la règle de la virgule se voit. */
function tirer(d1: 1 | 2, d2: 1 | 2, grands = true) {
  for (;;) {
    const s1 = d1 === 1 ? entre(grands ? 11 : 1, grands ? 99 : 9) : entre(101, 999);
    const s2 = d2 === 1 ? entre(grands ? 11 : 1, grands ? 99 : 9) : entre(11, 99);
    if (s1 % 10 === 0 || s2 % 10 === 0 || (s1 * s2) % 10 === 0) continue;
    return { a: s1 / 10 ** d1, b: s2 / 10 ** d2, s1, s2, dec: d1 + d2, p: arr((s1 * s2) / 10 ** (d1 + d2)) };
  }
}
const explD = (a: number, b: number, s1: number, s2: number, dec: number, p: number) =>
  etapes(`on multiplie sans les virgules, puis on remet ${dec} chiffres après la virgule.`, `${fr(s1)} × ${fr(s2)} = ${fr(s1 * s2)}. ${fr(a)} et ${fr(b)} ont ${dec} chiffres après la virgule en tout.`, `${fr(a)} × ${fr(b)} = ${fr(p)}.`);
const leurresD = (p: number, a: number, b: number, s: number) => [arr(p * 10), arr(p / 10), s, arr(p * 100), arr(a + b)];
const pose = (a: number, b: number) => ({ kind: "calcul_pose", operation: "multiplication", numbers: [fr(a), fr(b)], display: { showResult: false, showRetenues: false } }) as CanvasFigure;
const FRUITS = ["Les pommes", "Les mangues", "Les fraises", "Le fromage", "Le riz", "Les noix", "Les bananes", "Le poisson", "Les cerises", "Le café", "Les olives", "Le chocolat"];
const RECTS = ["Un tapis", "Un jardin", "Une planche", "Un drapeau", "Une affiche", "Une terrasse", "Une nappe", "Un tableau", "Une vitre", "Une dalle", "Une bâche", "Un potager"];

const decimalProduit: TutorBankItemV4[] = [
  D(1, 1, HINT_D, () => {
    const { a, b, s1, s2, dec, p } = tirer(1, 1, false);
    return { text: tournure(["", "Compte les chiffres après la virgule.", "Pense aux décimales."], CALC(`${fr(a)} × ${fr(b)}`)), ...qcmN(p, [arr(p * 10), s1 * s2, arr(p * 100), arr(a + b), arr(p / 10)], "", 0.01), explanation: explD(a, b, s1, s2, dec, p) };
  }),
  D(2, 1, "Additionne les chiffres après la virgule des deux nombres.", () => {
    const [d1, d2] = un<[1 | 2, 1 | 2]>([[1, 1], [1, 2], [2, 1], [2, 2]]);
    const { a, b, dec, p } = tirer(d1, d2);
    return {
      text: un([`Dans ${fr(a)} × ${fr(b)}, combien de chiffres après la virgule ?`, `${fr(a)} × ${fr(b)} : combien de chiffres après la virgule ?`, `Combien de chiffres après la virgule pour ${fr(a)} × ${fr(b)} ?`, `Compte les chiffres après la virgule de ${fr(a)} × ${fr(b)}.`, `Le produit ${fr(a)} × ${fr(b)} a combien de décimales ?`, `Trouve le nombre de décimales de ${fr(a)} × ${fr(b)}.`]),
      ...qcm(`${dec} chiffres`, ["1 chiffre", "2 chiffres", "3 chiffres", "4 chiffres", "5 chiffres"]),
      explanation: etapes(`on additionne les chiffres après la virgule.`, `${d1} + ${d2} = ${dec}.`, `${fr(a)} × ${fr(b)} = ${fr(p)} : ${dec} chiffres après la virgule.`),
    };
  }),
  D(3, 1, "Le calcul sans virgule est donné. Il reste à placer la virgule.", () => {
    const { a, b, s1, s2, dec, p } = tirer(1, 1);
    return {
      text: tournure([`${s1} × ${s2} = ${fr(s1 * s2)}.`, `Sachant que ${s1} × ${s2} = ${fr(s1 * s2)}.`, `On sait que ${s1} × ${s2} = ${fr(s1 * s2)}.`, `Regarde : ${s1} × ${s2} = ${fr(s1 * s2)}.`, `Voici : ${s1} × ${s2} = ${fr(s1 * s2)}.`, `Un calcul : ${s1} × ${s2} = ${fr(s1 * s2)}.`], [`Calcule ${fr(a)} × ${fr(b)}.`, `Trouve ${fr(a)} × ${fr(b)}.`, `Donne ${fr(a)} × ${fr(b)}.`, `Déduis ${fr(a)} × ${fr(b)}.`, `Écris ${fr(a)} × ${fr(b)}.`]),
      ...qcmN(p, [s1 * s2, arr(p * 10), arr(p / 10), arr(p * 100)]),
      explanation: explD(a, b, s1, s2, dec, p),
    };
  }),
  D(4, 2, HINT_D, () => {
    const { a, b, s1, s2, dec, p } = tirer(1, 1);
    return { text: tournure(["", "Pose l’opération."], CALC(`${fr(a)} × ${fr(b)}`)), ...qcmN(p, leurresD(p, a, b, s1 * s2)), canvas: pose(a, b), explanation: explD(a, b, s1, s2, dec, p) };
  }),
  D(5, 2, HINT_D, () => {
    const [d1, d2] = un<[1 | 2, 1 | 2]>([[1, 2], [2, 1]]);
    const { a, b, s1, s2, dec, p } = tirer(d1, d2);
    return { text: tournure(["", `${s1} × ${s2} = ${fr(s1 * s2)}.`], CALC(`${fr(a)} × ${fr(b)}`)), ...qcmN(p, leurresD(p, a, b, s1 * s2)), explanation: explD(a, b, s1, s2, dec, p) };
  }),
  D(6, 2, "Multiplier par un nombre plus petit que 1 donne un résultat plus petit.", () => {
    const x = entre(11, 99) / 10;
    const k = un([0.2, 0.3, 0.5, 0.6, 0.8, 0.9, 1.2, 1.5, 1.6, 2.5]);
    const plusPetit = k < 1;
    return {
      text: tournure(["Sans calculer.", "Réfléchis sans poser.", "Sans poser l’opération.", ""], [`${fr(k)} × ${fr(x)} est-il plus petit que ${fr(x)} ?`, `Le résultat de ${fr(k)} × ${fr(x)} est-il sous ${fr(x)} ?`, `${fr(x)} × ${fr(k)} donne-t-il moins que ${fr(x)} ?`, `${fr(x)} diminue-t-il si on le multiplie par ${fr(k)} ?`]),
      ...qcm(plusPetit ? "Oui" : "Non", [plusPetit ? "Non" : "Oui"]),
      explanation: etapes(`on compare ${fr(k)} et 1.`, `${fr(k)} est ${plusPetit ? "plus petit" : "plus grand"} que 1. ${fr(k)} × ${fr(x)} = ${fr(arr(k * x))}.`, plusPetit ? `oui, le résultat est plus petit.` : `non, le résultat est plus grand.`),
    };
  }),
  D(7, 3, "Un carreau mesure 0,1 m sur 0,1 m : son aire est 0,01 m².", () => {
    const l = entre(2, 9), c = entre(2, 9);
    const cells: [number, number][] = [];
    for (let r = 0; r < l; r++) for (let k = 0; k < c; k++) cells.push([r, k]);
    const obj = un(["Une dalle", "Un carré de mur", "Un carré de jardin", "Un panneau", "Un carré de tissu", "Une table carrée", "Un carré de toit", "Un carré de pelouse", "Un plateau", "Un carré de sol", "Une vitre carrée", "Une plaque"]);
    const a = arr((l * c) / 100);
    return {
      text: tournure([`${obj} mesure 1 m de côté.`], [/^Une/.test(obj) ? "Elle est découpée en carreaux de 0,1 m." : "Il est découpé en carreaux de 0,1 m."], ["Quelle est l’aire de la zone colorée ?", "Quelle aire est colorée ?"]),
      ...qcmN(a, [arr(a * 10), arr(a * 100), arr((l + c) / 10), arr((2 * (l + c)) / 10)], "m²", 0.01),
      canvas: { kind: "figure_libre", size: { width: 330, height: 330, cellSize: 30 }, grid: { rows: 10, cols: 10, filledCells: cells }, display: { showGrid: true, showFilled: true, showCellLabels: false, showPerimeter: false } } as CanvasFigure,
      explanation: etapes(`la zone colorée est un rectangle.`, `${fr(l / 10)} × ${fr(c / 10)} = ${fr(a)}.`, `l’aire est ${fr(a)} m².`),
    };
  }),
  D(8, 3, HINT_D, () => {
    const [m, px] = [un([0.5, 1.2, 1.4, 1.5, 2.3, 2.5, 0.7, 1.6]), un([2.4, 3.2, 4.6, 5.2, 6.4, 7.8, 8.2, 9.6, 12.4])];
    const t = arr(m * px);
    const f = un(FRUITS);
    return {
      text: tournure([`${f} coûtent ${euro(px)} le kilo.`.replace("Le fromage coûtent", "Le fromage coûte").replace("Le riz coûtent", "Le riz coûte").replace("Le poisson coûtent", "Le poisson coûte").replace("Le café coûtent", "Le café coûte").replace("Le chocolat coûtent", "Le chocolat coûte")], [`On en achète ${fr(m)} kg.`], ["Combien paie-t-on ?", "Quel est le prix ?", "Quelle somme faut-il ?"]),
      ...qcm(euro(t), [...new Set([arr(t * 10), arr(t / 10), arr(px + m), arr(t + 1), arr(t + 0.1)].filter((v) => v !== t).map(euro))]),
      explanation: etapes(`le prix est masse × prix au kilo.`, `${fr(m)} × ${fr(px)} = ${fr(t)}.`, `on paie ${euro(t)}.`),
    };
  }),
  D(9, 4, "L’aire d’un rectangle : longueur × largeur.", () => {
    const { a, b, s1, s2, dec, p } = tirer(1, 1);
    const o = un(RECTS);
    return {
      text: tournure([`${o} a la forme d’un rectangle de ${fr(a)} m sur ${fr(b)} m.`], ["Quelle est son aire ?", "Calcule son aire.", "Quelle surface occupe-t-il ?".replace("il", /^Une/.test(o) ? "elle" : "il")]),
      ...qcmN(p, [arr(2 * (a + b)), arr(p * 10), arr(p / 10), arr(a + b)], "m²"),
      explanation: explD(a, b, s1, s2, dec, p),
    };
  }),
  D(10, 4, "Estime : arrondis les deux nombres à l’unité, puis compare.", () => {
    const { a, b, s1, s2, dec, p } = tirer(1, 1);
    const faux = un([arr(p * 10), arr(p / 10)]);
    const qui = un(["Un élève", "Une élève", "Sami", "Lina", "Une camarade", "Un camarade", "Noé", "Jade", "Une amie", "Un ami", "Maya", "Ilyes"]);
    return {
      text: tournure([`${qui} trouve ${fr(a)} × ${fr(b)} = ${fr(faux)}.`], ["La virgule est mal placée.", "Ce résultat est faux."], ["Quel est le bon résultat ?", "Corrige ce résultat."]),
      ...qcmN(p, [faux, arr(faux * 100), arr(faux / 100), arr(a + b)]),
      explanation: explD(a, b, s1, s2, dec, p),
    };
  }),
];

/* ═════════════════ angle_relations ═════════════════ */
const R = atelier("6e", "angle_mesure", "angle_relations");
/** Plusieurs demi-droites de même origine, sans mesure écrite. */
const rayons = (s: string, r: { nom: string; deg: number }[]): CanvasFigure => {
  const O = { x: 170, y: 130 }, L = 105;
  const bout = (d: number) => ({ x: Math.round(O.x + L * Math.cos((d * Math.PI) / 180)), y: Math.round(O.y - L * Math.sin((d * Math.PI) / 180)) });
  return { kind: "droites", size: { width: 340, height: 260 }, lines: r.map((x) => ({ id: `${s}${x.nom}`, type: "demi_droite", from: O, to: bout(x.deg) })), points: [{ x: O.x, y: O.y, label: s, highlight: true }, ...r.map((x) => ({ ...bout(x.deg), label: x.nom }))], display: { showGrid: false, showLabels: true, showPoints: true } } as CanvasFigure;
};
const m5 = (a: number, b: number) => 5 * entre(a / 5, b / 5);
const QUATRE_LETTRES = () => {
  const [s, a, b, c, d] = lettres(5);
  return { s, a, b, c, d };
};
/** Deux droites sécantes en s : a et c sont alignés, b et d aussi ; aSb mesure t. */
const croix = (l: { s: string; a: string; b: string; c: string; d: string }, t: number) => {
  const dep = entre(0, 30);
  return rayons(l.s, [{ nom: l.a, deg: dep }, { nom: l.b, deg: dep + t }, { nom: l.c, deg: dep + 180 }, { nom: l.d, deg: dep + 180 + t }]);
};
const DEF_ADJ = "Même sommet, un côté commun, et ils sont de part et d’autre de ce côté.";
const NOMS_REL = ["Adjacents", "Opposés par le sommet", "Égaux et droits", "Plats"];
const SECANTS: [string, string][] = [["Des ciseaux s’ouvrent.", "les lames forment"], ["Une pince s’ouvre.", "les mâchoires forment"], ["Des tenailles s’ouvrent.", "les mâchoires forment"], ["Deux routes droites se croisent.", "elles forment"], ["Deux rails droits se croisent.", "ils forment"], ["Deux fils tendus se croisent.", "ils forment"], ["Deux pistes d’aéroport se croisent.", "elles forment"], ["Deux bâtons se croisent sur un cerf-volant.", "ils forment"], ["Deux poutres droites se croisent.", "elles forment"], ["Deux canaux droits se croisent.", "ils forment"], ["Deux faisceaux de lampe se croisent.", "ils forment"], ["Deux câbles droits se croisent.", "ils forment"]];
const PLATS = ["Une échelle est posée au sol.", "Une planche est posée sur un trottoir.", "Un toit touche une poutre droite.", "Une rampe part d’une route droite.", "Un mât est penché sur un quai droit.", "Une barrière penchée touche le sol.", "Une piste part d’un chemin droit.", "Un tuyau part d’un mur droit.", "Un fil part d’une tige droite.", "Une route part d’une autre route droite.", "Un bras de grue part du sol plat.", "Une rame touche un bord droit."];

const angleRelations: TutorBankItemV4[] = [
  R(1, 1, DEF_ADJ, () => {
    const [s, a, b, c] = lettres(4);
    const t1 = m5(30, 70), t2 = m5(30, 70);
    return {
      text: tournure(["Regarde la figure.", "Observe la figure.", "Voici la figure.", ""], [`${hat(a, s, b)} et ${hat(b, s, c)} sont comment ?`, `Comment sont ${hat(a, s, b)} et ${hat(b, s, c)} ?`, `Quel mot décrit ${hat(a, s, b)} et ${hat(b, s, c)} ?`, `Nomme la relation entre ${hat(a, s, b)} et ${hat(b, s, c)}.`]),
      ...qcm("Adjacents", NOMS_REL),
      canvas: rayons(s, [{ nom: a, deg: 10 }, { nom: b, deg: 10 + t1 }, { nom: c, deg: 10 + t1 + t2 }]),
      explanation: etapes(`on regarde le sommet et les côtés.`, `même sommet ${s}, côté commun [${s}${b}), de part et d’autre.`, `ils sont adjacents.`),
    };
  }),
  R(2, 1, "Deux droites se coupent : les angles face à face sont opposés par le sommet.", () => {
    const l = QUATRE_LETTRES();
    const t = m5(40, 130);
    return {
      text: tournure(["Deux droites se coupent.", "Regarde les deux droites.", "Regarde la figure.", ""], [`${hat(l.a, l.s, l.b)} et ${hat(l.c, l.s, l.d)} sont comment ?`, `Comment sont ${hat(l.a, l.s, l.b)} et ${hat(l.c, l.s, l.d)} ?`, `Quel mot décrit ${hat(l.a, l.s, l.b)} et ${hat(l.c, l.s, l.d)} ?`, `Nomme la relation entre ${hat(l.a, l.s, l.b)} et ${hat(l.c, l.s, l.d)}.`]),
      ...qcm("Opposés par le sommet", NOMS_REL),
      canvas: croix(l, t),
      explanation: etapes(`les deux droites se coupent en ${l.s}.`, `ces deux angles sont face à face, de sommet ${l.s}.`, `ils sont opposés par le sommet.`),
    };
  }),
  R(3, 1, "Deux angles supplémentaires font 180° ensemble.", () => {
    const t = m5(20, 160);
    return {
      text: tournure([`Un angle mesure ${t}°.`, `Cet angle mesure ${t}°.`, `Prends un angle de ${t}°.`], ["Quel est son supplémentaire ?", "Combien mesure son supplémentaire ?", "Trouve son supplémentaire.", "Donne son supplémentaire.", "Calcule son supplémentaire."]),
      ...qcmD(180 - t, [90 - t, 360 - t, t, 180 + t, 190 - t]),
      explanation: etapes(`deux angles supplémentaires font 180°.`, `180 − ${t} = ${180 - t}.`, `son supplémentaire mesure ${180 - t}°.`),
    };
  }),
  R(4, 2, "Deux angles opposés par le sommet ont la même mesure.", () => {
    const l = QUATRE_LETTRES();
    const t = m5(40, 130);
    return {
      text: tournure(["Deux droites se coupent.", "Regarde les deux droites.", ""], [`${hat(l.a, l.s, l.b)} mesure ${t}°.`, `${hat(l.a, l.s, l.b)} = ${t}°.`], [`Combien mesure ${hat(l.c, l.s, l.d)} ?`, `Trouve ${hat(l.c, l.s, l.d)}.`, `Quelle est la mesure de ${hat(l.c, l.s, l.d)} ?`]),
      ...qcmD(t, [180 - t, 360 - t, 90 + t, t + 10]),
      canvas: croix(l, t),
      explanation: etapes(`ces deux angles sont opposés par le sommet : ils sont égaux.`, `${hat(l.c, l.s, l.d)} = ${hat(l.a, l.s, l.b)}.`, `${hat(l.c, l.s, l.d)} mesure ${t}°.`),
    };
  }),
  R(5, 2, "Des angles adjacents s’ajoutent.", () => {
    const [s, a, b, c] = lettres(4);
    const t1 = m5(25, 75), t2 = m5(25, 75);
    return {
      text: tournure([`${hat(a, s, b)} = ${t1}° et ${hat(b, s, c)} = ${t2}°.`, `${hat(a, s, b)} mesure ${t1}°, ${hat(b, s, c)} mesure ${t2}°.`], [`Combien mesure ${hat(a, s, c)} ?`, `Trouve ${hat(a, s, c)}.`, `Calcule ${hat(a, s, c)}.`, `Quelle est la mesure de ${hat(a, s, c)} ?`]),
      ...qcmD(t1 + t2, [Math.abs(t1 - t2), 180 - t1 - t2, t1, t2, t1 + t2 + 10]),
      canvas: rayons(s, [{ nom: a, deg: 10 }, { nom: b, deg: 10 + t1 }, { nom: c, deg: 10 + t1 + t2 }]),
      explanation: etapes(`les deux angles sont adjacents : on ajoute.`, `${t1} + ${t2} = ${t1 + t2}.`, `${hat(a, s, c)} mesure ${t1 + t2}°.`),
    };
  }),
  R(6, 2, "Deux angles voisins sur une droite font 180°.", () => {
    const l = QUATRE_LETTRES();
    const t = m5(40, 130);
    return {
      text: tournure(["Deux droites se coupent.", "Regarde les deux droites.", ""], [`${hat(l.a, l.s, l.b)} mesure ${t}°.`, `${hat(l.a, l.s, l.b)} = ${t}°.`], [`Combien mesure ${hat(l.b, l.s, l.c)} ?`, `Trouve ${hat(l.b, l.s, l.c)}.`, `Quelle est la mesure de ${hat(l.b, l.s, l.c)} ?`]),
      ...qcmD(180 - t, [t, 360 - t, Math.abs(90 - t) || 95, 170 - t]),
      canvas: croix(l, t),
      explanation: etapes(`${l.a}, ${l.s} et ${l.c} sont alignés : les deux angles font 180°.`, `180 − ${t} = ${180 - t}.`, `${hat(l.b, l.s, l.c)} mesure ${180 - t}°.`),
    };
  }),
  R(7, 3, "Deux angles opposés par le sommet ont la même mesure.", () => {
    const [c, f] = un(SECANTS);
    const t = m5(15, 120);
    return {
      text: tournure([`${c} D’un côté, ${f} un angle de ${t}°.`], ["Quel angle y a-t-il juste en face ?", "Combien mesure l’angle opposé ?", "Quel est l’angle de l’autre côté du croisement ?"]),
      ...qcmD(t, [180 - t, 360 - t, t + 90, t + 10]),
      explanation: etapes(`les deux angles sont opposés par le sommet.`, `ils ont la même mesure.`, `l’angle mesure ${t}°.`),
    };
  }),
  R(8, 3, "Deux angles voisins sur une droite font 180°.", () => {
    const c = un(PLATS);
    const t = m5(20, 160);
    return {
      text: tournure([`${c} D’un côté, l’angle mesure ${t}°.`], ["Combien mesure l’angle de l’autre côté ?", "Quel est l’angle voisin ?", "Quel angle y a-t-il de l’autre côté ?"]),
      ...qcmD(180 - t, [t, 360 - t, 190 - t, 170 - t]),
      explanation: etapes(`les deux angles forment un angle plat : 180°.`, `180 − ${t} = ${180 - t}.`, `l’angle voisin mesure ${180 - t}°.`),
    };
  }),
  R(9, 4, "Opposés : égaux. Voisins : 180° à deux.", () => {
    const t = m5(25, 85);
    const l4 = (x: number) => `${x}°, ${180 - x}°, ${x}°, ${180 - x}°`;
    const qui = un(["Deux droites se coupent.", "Deux routes se croisent.", "Deux fils se croisent.", "Deux lames se croisent.", "Deux rails se croisent.", "Deux poutres se croisent."]);
    return {
      text: tournure([`${qui} Un des angles mesure ${t}°.`], ["Quels sont les quatre angles, en tournant ?", "Donne les quatre angles, dans l’ordre.", "Quelle liste donne les quatre angles ?"]),
      ...qcm(l4(t), [`${t}°, ${t}°, ${t}°, ${t}°`, `${t}°, ${t}°, ${180 - t}°, ${180 - t}°`, `${t}°, ${90 - t}°, ${t}°, ${90 - t}°`, `${t}°, ${360 - t}°, ${t}°, ${360 - t}°`]),
      explanation: etapes(`les angles opposés sont égaux, les voisins font 180°.`, `180 − ${t} = ${180 - t}.`, `les quatre angles : ${l4(t)}.`),
    };
  }),
  R(10, 4, "Sur une droite, les angles font 180° en tout.", () => {
    const [s, a, b, c, d] = lettres(5);
    const t1 = m5(30, 70), t2 = m5(30, 70);
    const r = 180 - t1 - t2;
    return {
      text: tournure([`${a}, ${s} et ${c} sont alignés.`, `Les points ${a}, ${s} et ${c} sont sur une droite.`, `${a}, ${s} et ${c} forment une ligne droite.`], [`${hat(a, s, b)} = ${t1}° et ${hat(b, s, d)} = ${t2}°.`], [`Combien mesure ${hat(d, s, c)} ?`, `Trouve ${hat(d, s, c)}.`, `Calcule ${hat(d, s, c)}.`]),
      ...qcmD(r, [t1 + t2, 360 - t1 - t2, t1, t2, r + 10]),
      canvas: rayons(s, [{ nom: a, deg: 180 }, { nom: b, deg: 180 - t1 }, { nom: d, deg: 180 - t1 - t2 }, { nom: c, deg: 0 }]),
      explanation: etapes(`les trois angles forment un angle plat : 180°.`, `${t1} + ${t2} = ${t1 + t2}, puis 180 − ${t1 + t2} = ${r}.`, `${hat(d, s, c)} mesure ${r}°.`),
    };
  }),
];

/* ═════════════════ fraction_quotient ═════════════════ */
const Q = atelier("6e", "fraction_nombre", "fraction_quotient");
const HINT_Q = "a ÷ b s’écrit a/b. Le numérateur est le nombre qu’on partage.";
const f = (a: number, b: number) => `${a}/${b}`;
const pgcd = (a: number, b: number): number => (b ? pgcd(b, a % b) : a);
/** Une fraction irréductible différente de 1. */
function tirerF(max = 12) {
  for (;;) {
    const a = entre(2, max), b = entre(2, max);
    if (a !== b && pgcd(a, b) === 1) return { a, b };
  }
}
const decimalite = (a: number, b: number) => {
  let d = b / pgcd(a, b);
  if (d === 1) return "Un nombre entier";
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  return d === 1 ? "Un nombre décimal non entier" : "Un nombre non décimal";
};
const TROIS_NATURES = ["Un nombre entier", "Un nombre décimal non entier", "Un nombre non décimal"];
const CAS_DEC = [[3, 4], [1, 4], [7, 4], [9, 4], [1, 2], [3, 2], [5, 2], [7, 2], [1, 5], [2, 5], [3, 5], [4, 5], [6, 5], [7, 5], [1, 10], [3, 10], [7, 10], [9, 10], [3, 20], [7, 20]];
const CAS_ENT = [[12, 4], [15, 3], [20, 5], [18, 6], [14, 7], [24, 8], [27, 9], [30, 6], [16, 2], [21, 3], [35, 7], [40, 8]];
const CAS_NON = [[1, 3], [2, 3], [4, 3], [5, 3], [1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [1, 9], [2, 9], [5, 9], [7, 6], [8, 3], [10, 3], [10, 7]];
const PARTS: [string, string, string][] = [["pizzas", "personnes", "de pizza"], ["tablettes de chocolat", "enfants", "de tablette"], ["gâteaux", "invités", "de gâteau"], ["baguettes", "randonneurs", "de baguette"], ["tartes", "voisins", "de tarte"], ["pastèques", "joueuses", "de pastèque"], ["ananas", "cuisiniers", "d’ananas"], ["crêpes", "cousins", "de crêpe"], ["melons", "amies", "de melon"], ["galettes", "copains", "de galette"], ["cakes", "bénévoles", "de cake"], ["quiches", "collègues", "de quiche"]];
const PARTAGE_DEC: [string, string, string, string][] = [["Un ruban de", "m", "est coupé en", "morceaux égaux"], ["Une corde de", "m", "est coupée en", "morceaux égaux"], ["Une bouteille de", "L", "est versée dans", "verres égaux"], ["Un sac de", "kg", "est réparti dans", "boîtes égales"], ["Un câble de", "m", "est coupé en", "parts égales"], ["Une planche de", "m", "est sciée en", "morceaux égaux"], ["Une cuve de", "L", "remplit", "bidons égaux"], ["Un fil de", "m", "est coupé en", "bouts égaux"], ["Un seau de", "L", "remplit", "arrosoirs égaux"], ["Un filet de", "kg", "est partagé entre", "familles"], ["Un tuyau de", "m", "est coupé en", "tronçons égaux"], ["Un pain de", "kg", "est coupé en", "parts égales"]];

const fractionQuotient: TutorBankItemV4[] = [
  Q(1, 1, HINT_Q, () => {
    const { a, b } = tirerF();
    return {
      text: tournure(["", "Pense au quotient.", "Attention à l’ordre.", "Lis bien."], [`Écris ${a} ÷ ${b} en fraction.`, `Quelle fraction est égale à ${a} ÷ ${b} ?`, `${a} ÷ ${b} s’écrit quelle fraction ?`, `Donne ${a} ÷ ${b} en fraction.`, `Traduis ${a} ÷ ${b} en fraction.`, `Trouve la fraction égale à ${a} ÷ ${b}.`]),
      ...qcm(f(a, b), [f(b, a), f(a + b, b), f(a, a + b), f(a + 1, b + 2)]),
      explanation: etapes(`le quotient de a par b s’écrit a/b.`, `${a} ÷ ${b} : le numérateur est ${a}, le dénominateur est ${b}.`, `${a} ÷ ${b} = ${f(a, b)}.`),
    };
  }),
  Q(2, 1, HINT_Q, () => {
    const { a, b } = tirerF();
    return {
      text: tournure(["", "Lis la fraction.", "Attention à l’ordre.", "Pense au quotient."], [`${f(a, b)} est égal à quelle division ?`, `Quelle division donne ${f(a, b)} ?`, `Écris ${f(a, b)} avec le signe ÷.`, `${f(a, b)} : quelle division est-ce ?`, `Trouve la division égale à ${f(a, b)}.`, `Quel quotient donne ${f(a, b)} ?`]),
      ...qcm(`${a} ÷ ${b}`, [`${b} ÷ ${a}`, `${a} × ${b}`, `${a} − ${b}`, `${a} + ${b}`]),
      explanation: etapes(`la fraction a/b est le quotient de a par b.`, `numérateur ${a}, dénominateur ${b}.`, `${f(a, b)} = ${a} ÷ ${b}.`),
    };
  }),
  Q(3, 1, "b × (a/b) = a : le quotient est le nombre qui complète l’égalité.", () => {
    const { a, b } = tirerF();
    return {
      text: tournure(["", "Égalité à trou.", "Pense au quotient.", "Lis bien."], [`Complète : ${b} × … = ${a}.`, `Quel nombre complète ${b} × … = ${a} ?`, `Trouve le nombre : ${b} × … = ${a}.`, `${b} × … = ${a}. Quel nombre manque ?`, `Remplis le trou : ${b} × … = ${a}.`, `Que mettre : ${b} × … = ${a} ?`]),
      ...qcm(f(a, b), [f(b, a), f(a, a + b), `${a}`, f(a + 1, b)]),
      explanation: etapes(`le nombre qui, multiplié par ${b}, donne ${a}, est le quotient de ${a} par ${b}.`, `${b} × ${f(a, b)} = ${a}.`, `il manque ${f(a, b)}.`),
    };
  }),
  Q(4, 2, HINT_Q, () => {
    const entier = Math.random() < 0.5;
    const [a, b] = un(entier ? CAS_ENT : CAS_DEC);
    const v = arr(a / b);
    return {
      text: tournure(["", "Divise le numérateur par le dénominateur."], [`Quel nombre est égal à ${f(a, b)} ?`, `Écris ${f(a, b)} sans fraction.`, `Calcule ${f(a, b)} en divisant.`, `${f(a, b)} vaut quel nombre ?`, `Donne la valeur de ${f(a, b)}.`, `Trouve le nombre égal à ${f(a, b)}.`]),
      ...qcmN(v, [arr(v / 10), a, b, arr(a + b), arr(v + 1), arr(v * 10)], "", entier ? 1 : 0.25),
      explanation: etapes(`on divise le numérateur par le dénominateur.`, `${a} ÷ ${b} = ${fr(v)}.`, `${f(a, b)} = ${fr(v)}.`),
    };
  }),
  Q(5, 2, "Divise. Le résultat s’arrête-t-il ? Tombe-t-il juste ?", () => {
    const [a, b] = un(un([CAS_ENT, CAS_DEC, CAS_NON]));
    return {
      text: tournure(["", "Fais la division."], [`${f(a, b)} est quel type de nombre ?`, `Quel type de nombre est ${f(a, b)} ?`, `${f(a, b)} : quelle est sa nature ?`, `Quelle est la nature de ${f(a, b)} ?`, `${a} ÷ ${b} donne quel type de nombre ?`]),
      ...qcm(decimalite(a, b), TROIS_NATURES),
      explanation: etapes(`on fait la division.`, decimalite(a, b) === "Un nombre entier" ? `${a} ÷ ${b} = ${fr(a / b)}, elle tombe juste.` : decimalite(a, b) === "Un nombre décimal non entier" ? `${a} ÷ ${b} = ${fr(a / b)}, elle s’arrête.` : `${a} ÷ ${b} ne s’arrête jamais.`, `${decimalite(a, b).toLowerCase()}.`),
    };
  }),
  Q(6, 2, "b × (a/b) = a.", () => {
    const { a, b } = tirerF();
    return {
      text: tournure(["", "Une fraction est un quotient."], CalcFrac(`${b} × ${f(a, b)}`)),
      ...qcmN(a, [b, a + b, a * b, a + 1]),
      explanation: etapes(`multiplier ${f(a, b)} par ${b} redonne le numérateur.`, `${f(a, b)} est le nombre qui, multiplié par ${b}, donne ${a}.`, `${b} × ${f(a, b)} = ${a}.`),
    };
  }),
  Q(7, 3, "On partage a objets entre b personnes : chacune a a/b d’objet.", () => {
    const { a, b } = tirerF(9);
    const c = un(PARTS);
    return {
      text: tournure([`On partage ${a} ${c[0]} entre ${b} ${c[1]}.`, `${b} ${c[1]} se partagent ${a} ${c[0]}.`], [`Quelle part chacun reçoit-il ?`, "Quelle fraction reçoit chacun ?"]),
      ...qcm(`${f(a, b)} ${c[2]}`, [`${f(b, a)} ${c[2]}`, `${f(a, a + b)} ${c[2]}`, `${f(a + 1, b)} ${c[2]}`]),
      canvas: { kind: "schema_barre", total: String(a), parts: Array.from({ length: b }, () => ({ unknown: true })) } as CanvasFigure,
      explanation: etapes(`on partage ${a} en ${b} parts égales.`, `${a} ÷ ${b} = ${f(a, b)}.`, `chacun reçoit ${f(a, b)} ${c[2]}.`),
    };
  }),
  Q(8, 3, "La fraction a/b se calcule : a ÷ b.", () => {
    const [a, b] = un(CAS_DEC.filter(([x, y]) => x > 1 && y <= 10));
    const c = un(PARTAGE_DEC);
    const v = arr(a / b);
    return {
      text: tournure([`${c[0]} ${a} ${c[1]} ${c[2]} ${b} ${c[3]}.`], ["Quelle est la valeur d’une part ?", "Que vaut une part, en écriture décimale ?"]),
      ...qcmN(v, [arr(v / 2), arr(v + 1), arr(v * 10), a, b], c[1], 0.25),
      explanation: etapes(`on divise ${a} par ${b}.`, `${a} ÷ ${b} = ${f(a, b)} = ${fr(v)}.`, `une part vaut ${fr(v)} ${c[1]}.`),
    };
  }),
  Q(9, 4, "Divise chaque fraction. Une seule division ne s’arrête jamais.", () => {
    const non = un(CAS_NON);
    const dec = melange([...CAS_DEC]).slice(0, 2);
    const ent = un(CAS_ENT);
    return {
      text: tournure(["Un défi.", "Fais les divisions.", "Une division ne s’arrête pas.", "Cherche la division sans fin.", "Une fraction est spéciale.", "Sans calculatrice.", "Pose chaque division."], ["Quelle fraction n’est pas un nombre décimal ?", "Quelle fraction est un nombre non décimal ?", "Laquelle n’a pas d’écriture décimale ?", "Laquelle ne s’écrit pas en décimal ?", "Quelle fraction reste non décimale ?"]),
      ...qcm(f(non[0], non[1]), [...dec, ent].map(([x, y]) => f(x, y))),
      explanation: etapes(`on fait les divisions.`, `${non[0]} ÷ ${non[1]} ne s’arrête jamais.`, `${f(non[0], non[1])} n’est pas un nombre décimal.`),
    };
  }),
  Q(10, 4, "Cherche les deux entiers qui encadrent le quotient.", () => {
    for (;;) {
      const { a, b } = tirerF(30);
      if (a < b + 1) continue;
      const e = Math.floor(a / b);
      if (e * b === a) continue;
      return {
        text: tournure(["Un défi.", "Sans calculatrice.", "Réfléchis bien.", "Une fraction plus grande que 1.", "Encadre cette fraction.", "Pense aux multiples.", "Fais une division."], [`Entre quels entiers se trouve ${f(a, b)} ?`, `${f(a, b)} se place entre quels entiers ?`, `Quels entiers encadrent ${f(a, b)} ?`, `${f(a, b)} est entre quels entiers ?`, `Où placer ${f(a, b)} parmi les entiers ?`]),
        ...qcm(`Entre ${e} et ${e + 1}`, [`Entre ${e + 1} et ${e + 2}`, `Entre ${Math.max(e - 1, 0)} et ${Math.max(e - 1, 0) + 1}`, `Entre ${e + 2} et ${e + 3}`].filter((x) => x !== `Entre ${e} et ${e + 1}`)),
        explanation: etapes(`on cherche les multiples de ${b} autour de ${a}.`, `${b} × ${e} = ${b * e} et ${b} × ${e + 1} = ${b * (e + 1)}.`, `${f(a, b)} est entre ${e} et ${e + 1}.`),
      };
    }
  }),
];
function CalcFrac(x: string) {
  return [`Calcule ${x}.`, `Que vaut ${x} ?`, `Trouve ${x}.`, `Donne ${x}.`, `Combien fait ${x} ?`, `${x} = ?`];
}

export const programmeTrous6eBank: TutorBankItemV4[] = [...decimalProduit, ...angleRelations, ...fractionQuotient];
