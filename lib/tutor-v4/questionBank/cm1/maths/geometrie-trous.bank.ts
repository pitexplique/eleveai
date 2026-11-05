// GÉOMÉTRIE ET GRAPHIQUES : LES TROUS DU PROGRAMME DE CM1 (05/11/2026).
// Lire un codage, le cercle comme ensemble de points, le prisme, la notation des angles,
// comparer deux angles sans mesure, lire une courbe et un nuage de points. QCM seulement.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { LETTRES, atelier, entre, etapes, fr, melange, qcm, qcmN, tournure, un } from "./trous-outils";

const lettres = (n: number) => melange([...LETTRES]).slice(0, n);
const UNITES = ["cm", "m", "km"];

/* ═════════════════ figure_codage ═════════════════ */
const F = atelier("cm1", "figure_plane", "figure_codage", "cm1_");
const HINT_F = "Petit carré : angle droit. Même petit trait : même longueur.";
type Nature = "carré" | "rectangle" | "losange";
const FORMES: Record<Nature | "trapeze" | "quelconque", { A: [number, number]; B: [number, number]; C: [number, number]; D: [number, number] }> = {
  carré: { A: [80, 50], B: [240, 50], C: [240, 210], D: [80, 210] },
  rectangle: { A: [50, 70], B: [270, 70], C: [270, 190], D: [50, 190] },
  losange: { A: [160, 30], B: [260, 130], C: [160, 230], D: [60, 130] },
  trapeze: { A: [60, 60], B: [200, 60], C: [270, 190], D: [60, 190] },
  quelconque: { A: [60, 60], B: [240, 60], C: [280, 170], D: [60, 200] },
};
const QUATRE_COTES = [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]];
const quad = (forme: keyof typeof FORMES, ls: string[], marks: object, sideLabels?: object): CanvasFigure => {
  const f = FORMES[forme];
  const p = (c: [number, number]) => ({ x: c[0], y: c[1] });
  return { kind: "quadrilatere", size: { width: 320, height: 260 }, points: { A: p(f.A), B: p(f.B), C: p(f.C), D: p(f.D) }, labels: { A: ls[0], B: ls[1], C: ls[2], D: ls[3] }, marks, display: { showLabels: true, showPoints: true, showSides: true }, ...(sideLabels ? { sideLabels } : {}) } as CanvasFigure;
};
const codeNature = (n: Nature, ls: string[]) =>
  quad(n, ls, n === "carré" ? { rightAnglesAt: ["A", "B", "C", "D"], equalSides: QUATRE_COTES } : n === "rectangle" ? { rightAnglesAt: ["A", "B", "C", "D"] } : { equalSides: QUATRE_COTES });
const POINTS_TRI: Record<string, { A: { x: number; y: number }; B: { x: number; y: number }; C: { x: number; y: number } }> = {
  droit: { A: { x: 60, y: 200 }, B: { x: 260, y: 200 }, C: { x: 60, y: 60 } },
  isocele: { A: { x: 70, y: 210 }, B: { x: 250, y: 210 }, C: { x: 160, y: 40 } },
  equilateral: { A: { x: 60, y: 213 }, B: { x: 260, y: 213 }, C: { x: 160, y: 40 } },
};
const tri = (forme: string, ls: string[], marks: object, sideLabels?: object): CanvasFigure =>
  ({ kind: "triangle", size: { width: 320, height: 250 }, points: POINTS_TRI[forme], labels: forme === "droit" ? { A: ls[0], B: ls[1], C: ls[2] } : { A: ls[1], B: ls[2], C: ls[0] }, marks, display: { showLabels: true, showPoints: true, showSides: true }, ...(sideLabels ? { sideLabels } : {}) }) as CanvasFigure;
const METIERS_F: [string, string][] = [["Une menuisière dessine", "plateau de table"], ["Un maçon trace", "sol de terrasse"], ["Une couturière dessine", "morceau de tissu"], ["Un jardinier trace", "coin de potager"], ["Une architecte dessine", "plan de pièce"], ["Un carreleur trace", "dallage"], ["Une peintre dessine", "panneau"], ["Un charpentier trace", "cadre en bois"], ["Une graphiste dessine", "logo"], ["Un vitrier trace", "carreau de fenêtre"], ["Une paysagiste dessine", "massif de fleurs"], ["Un forgeron trace", "portail"]];

const figureCodage: TutorBankItemV4[] = [
  F(1, 1, HINT_F, () => {
    const ls = lettres(3);
    return {
      text: tournure(["Regarde le petit carré.", "Un petit carré est dessiné.", "Un sommet porte un petit carré.", "Vois-tu le petit carré ?"], ["Que signifie-t-il ?", "Que veut-il dire ?", "Qu’indique-t-il ?", "Que code-t-il ?", "Que montre-t-il ?"]),
      ...qcm("Un angle droit", ["Deux côtés égaux", "Un angle aigu", "Deux côtés parallèles", "Un angle obtus"]),
      canvas: tri("droit", ls, { rightAngleAt: "A" }),
      explanation: etapes(`le petit carré est un code.`, `il marque un sommet de la figure, en ${ls[0]}.`, `il signifie : un angle droit.`),
    };
  }),
  F(2, 1, HINT_F, () => {
    const ls = lettres(3);
    return {
      text: tournure(["Deux côtés portent le même petit trait.", "Regarde les deux petits traits verts.", "Deux côtés ont le même trait.", "Les petits traits sont pareils."], ["Que signifient-ils ?", "Que veulent-ils dire ?", "Qu’indiquent-ils ?", "Que codent-ils ?", "Que montrent-ils ?"]),
      ...qcm("Les deux côtés ont la même longueur", ["Les deux côtés sont parallèles", "Les deux côtés sont perpendiculaires", "Les deux côtés mesurent 1 cm"]),
      canvas: tri("isocele", ls, { equalSides: [["BC", "CA"]] }),
      explanation: etapes(`le même petit trait est un code.`, `il est sur [${ls[0]}${ls[1]}] et sur [${ls[0]}${ls[2]}].`, `ces deux côtés ont la même longueur.`),
    };
  }),
  F(3, 1, "Cherche le sommet où est dessiné le petit carré.", () => {
    const ls = lettres(3);
    return {
      text: tournure(["", "Regarde le codage."], ["Quel sommet porte l’angle droit ?", "Où est l’angle droit ?", "En quel point est l’angle droit ?", "Trouve l’angle droit.", "Quel point a un angle droit ?", "Quel sommet est codé droit ?"]),
      ...qcm(`Le point ${ls[0]}`, [`Le point ${ls[1]}`, `Le point ${ls[2]}`]),
      canvas: tri("droit", ls, { rightAngleAt: "A" }),
      explanation: etapes(`le petit carré marque l’angle droit.`, `il est dessiné en ${ls[0]}.`, `l’angle droit est en ${ls[0]}.`),
    };
  }),
  F(4, 2, HINT_F, () => {
    const n = un<Nature>(["carré", "rectangle", "losange"]);
    const ls = lettres(4);
    const mot = (x: Nature) => (x === "carré" ? "Un carré" : x === "rectangle" ? "Un rectangle" : "Un losange");
    return {
      text: tournure(["Lis le codage.", "Regarde les marques.", "Lis les marques.", "Regarde le codage."], ["Quelle est cette figure ?", "Quel quadrilatère vois-tu ?", "Quelle figure est codée ?", "Quel est ce quadrilatère ?", "Nomme cette figure."]),
      ...qcm(mot(n), [mot("carré"), mot("rectangle"), mot("losange"), "Un trapèze"]),
      canvas: codeNature(n, ls),
      explanation: etapes(`on lit les petits carrés et les petits traits.`, n === "carré" ? `4 angles droits et 4 côtés égaux.` : n === "rectangle" ? `4 angles droits.` : `4 côtés égaux.`, `c’est ${mot(n).toLowerCase()}.`),
    };
  }),
  F(5, 2, HINT_F, () => {
    const k = un(["droit", "isocele", "equilateral"]);
    const ls = lettres(3);
    const J = { droit: "Un triangle rectangle", isocele: "Un triangle isocèle", equilateral: "Un triangle équilatéral" } as Record<string, string>;
    const marks = k === "droit" ? { rightAngleAt: "A" } : k === "isocele" ? { equalSides: [["BC", "CA"]] } : { equalSides: [["AB", "BC"], ["BC", "CA"]] };
    return {
      text: tournure(["Lis le codage.", "Regarde les marques.", "Lis les marques.", "Regarde le codage."], ["Quel est ce triangle ?", "Quel triangle vois-tu ?", "Quel triangle est codé ?", "Nomme ce triangle.", "Quelle est sa nature ?"]),
      ...qcm(J[k], Object.values(J)),
      canvas: tri(k, ls, marks),
      explanation: etapes(`on lit les marques.`, k === "droit" ? `un petit carré : un angle droit.` : k === "isocele" ? `2 côtés égaux.` : `3 côtés égaux.`, `c’est ${J[k].toLowerCase()}.`),
    };
  }),
  F(6, 2, "Compte les petits carrés.", () => {
    const [forme, marks, n] = un<[keyof typeof FORMES, object, number]>([["rectangle", { rightAnglesAt: ["A", "B", "C", "D"] }, 4], ["trapeze", { rightAnglesAt: ["A", "D"] }, 2], ["quelconque", { rightAnglesAt: ["A"] }, 1]]);
    return {
      text: tournure(["Compte les petits carrés.", "Regarde le codage.", "Lis les marques.", "Regarde les marques."], ["Combien d’angles droits sont codés ?", "Combien d’angles droits vois-tu ?", "Combien d’angles droits porte la figure ?", "Le codage montre combien d’angles droits ?"]),
      ...qcmN(n, [1, 2, 3, 4, 5]),
      canvas: quad(forme, lettres(4), marks),
      explanation: etapes(`chaque petit carré marque un angle droit.`, `on compte ${n} petit${n > 1 ? "s" : ""} carré${n > 1 ? "s" : ""}.`, `${n} angle${n > 1 ? "s" : ""} droit${n > 1 ? "s" : ""}.`),
    };
  }),
  F(7, 3, "Les côtés qui portent le même trait ont la même longueur.", () => {
    const ls = lettres(4);
    const [qui, obj] = un(METIERS_F);
    const l = entre(3, 12), u = un(["cm", "m"]);
    const c = `${ls[0]}${ls[1]}`, d = `${ls[2]}${ls[3]}`;
    return {
      text: tournure([`${qui} ce ${obj}.`], [`${c} mesure ${l} ${u}.`, `Le côté [${c}] mesure ${l} ${u}.`], [`Combien mesure ${d} ?`, `Quelle est la longueur de ${d} ?`]),
      ...qcmN(l, [l * 2, l + 1, l + 2, Math.max(l - 1, 1), l * 4], u),
      canvas: quad("rectangle", ls, { rightAnglesAt: ["A", "B", "C", "D"], equalSides: [["AB", "CD"], ["BC", "DA"]] }),
      explanation: etapes(`[${c}] et [${d}] portent le même trait.`, `ils ont donc la même longueur.`, `${d} mesure ${l} ${u}.`),
    };
  }),
  F(8, 3, "Les 4 côtés portent le même trait : ils ont la même longueur.", () => {
    const ls = lettres(4);
    const [qui, obj] = un(METIERS_F);
    const l = entre(3, 12), u = un(["cm", "m"]);
    const c = `${ls[0]}${ls[1]}`;
    const n = un<Nature>(["carré", "losange"]);
    return {
      text: tournure([`${qui} ce ${obj}.`], [`${c} mesure ${l} ${u}.`, `Le côté [${c}] mesure ${l} ${u}.`], ["Quel est le périmètre ?", "Quelle longueur fait le tour ?", "Combien mesure le tour de la figure ?"]),
      ...qcmN(4 * l, [2 * l, 3 * l, l * l, l + 4, 4 * l + 4], u),
      canvas: codeNature(n, ls),
      explanation: etapes(`les 4 côtés portent le même trait.`, `4 × ${l} = ${4 * l}.`, `le périmètre est ${4 * l} ${u}.`),
    };
  }),
  F(9, 4, "Un carré a 4 angles droits ET 4 côtés égaux.", () => {
    const n = un<"rectangle" | "losange">(["rectangle", "losange"]);
    const ls = lettres(4);
    const manque = n === "rectangle" ? "4 côtés égaux" : "4 angles droits";
    return {
      text: tournure(["Une élève veut coder un carré.", "Un défi de codage.", "Tom veut prouver que c’est un carré.", "Cette figure doit devenir un carré.", "Sur ce plan, on veut un carré."], ["Que faut-il coder en plus ?", "Quel codage manque ?", "Quel codage faut-il ajouter ?", "Que manque-t-il au codage ?"]),
      ...qcm(`Coder ${manque}`, ["Coder 4 côtés égaux", "Coder 4 angles droits", "Coder 2 côtés parallèles", "Rien de plus"]),
      canvas: codeNature(n, ls),
      explanation: etapes(`un carré a 4 angles droits et 4 côtés égaux.`, `la figure code déjà ${n === "rectangle" ? "4 angles droits" : "4 côtés égaux"}.`, `il manque ${manque}.`),
    };
  }),
  F(10, 4, "Les côtés qui portent le même trait ont la même longueur.", () => {
    const ls = lettres(3);
    const a = entre(4, 12), b = entre(3, 9), u = un(UNITES);
    const ctx = un(["Une voile a cette forme.", "Un panneau a cette forme.", "Un drapeau a cette forme.", "Une tente a cette façade.", "Un toit a cette forme.", "Un fanion a cette forme."]);
    return {
      text: tournure([ctx], [`[${ls[0]}${ls[1]}] mesure ${a} ${u} et [${ls[1]}${ls[2]}] mesure ${b} ${u}.`], ["Quel est son périmètre ?", "Quelle longueur fait le tour ?"]),
      ...qcmN(2 * a + b, [a + b, a + 2 * b, 2 * a, 3 * a, 2 * a + 2 * b], u),
      canvas: tri("isocele", ls, { equalSides: [["BC", "CA"]] }),
      explanation: etapes(`[${ls[0]}${ls[2]}] porte le même trait que [${ls[0]}${ls[1]}] : il mesure ${a} ${u}.`, `${a} + ${a} + ${b} = ${2 * a + b}.`, `le périmètre est ${2 * a + b} ${u}.`),
    };
  }),
];

/* ═════════════════ cercle_ensemble_points ═════════════════ */
const K = atelier("cm1", "figure_plane", "cercle_ensemble_points", "cm1_");
const HINT_K = "Tous les points du cercle sont à la même distance du centre : le rayon.";
const SUR = "Sur le cercle", DEDANS = "À l’intérieur du cercle", DEHORS = "À l’extérieur du cercle";
const cerclePts = (ls: string[], d: number[], R = 90): CanvasFigure => {
  const cx = 170, cy = 140;
  const angles = [40, 160, 280, 100];
  return {
    kind: "cercle",
    size: { width: 340, height: 280 },
    circle: { cx, cy, r: R, showCircle: true },
    points: [{ id: "O", x: cx, y: cy, label: "O" }, ...ls.map((l, i) => ({ id: l, x: Math.round(cx + d[i] * Math.cos((angles[i] * Math.PI) / 180)), y: Math.round(cy - d[i] * Math.sin((angles[i] * Math.PI) / 180)), label: l }))],
    display: { showLabels: true, showPoints: true, showCenter: true },
  } as CanvasFigure;
};
const CHEVRES: [string, string, string][] = [["Une chèvre est attachée à un piquet par une corde de", "une touffe d’herbe", "Peut-elle la brouter ?"], ["Un chien est attaché à un arbre par une laisse de", "son os", "Peut-il l’attraper ?"], ["Un arroseur tourne et arrose à", "une plante", "Est-elle arrosée ?"], ["Une borne Wi-Fi porte à", "une tablette", "Reçoit-elle le signal ?"], ["Un phare éclaire à", "un bateau", "Est-il éclairé ?"], ["Une sirène s’entend à", "une maison", "Entend-on la sirène là-bas ?"], ["Un âne est attaché à un poteau par une corde de", "une carotte", "Peut-il la manger ?"], ["Un drone vole autour de sa base jusqu’à", "un arbre", "Peut-il l’atteindre ?"], ["Une lampe éclaire à", "un livre", "Est-il éclairé ?"], ["Un cheval est attaché à un anneau par une longe de", "un seau", "Peut-il l’atteindre ?"], ["Un robot tondeuse s’éloigne de sa base jusqu’à", "un massif", "Peut-il l’atteindre ?"], ["Une antenne capte à", "un téléphone", "Capte-t-il le réseau ?"]];
const ARROSEURS: [string, string, string][] = [["Un arroseur porte à", "plantes", "Combien de plantes sont arrosées ?"], ["Une lampe éclaire à", "chaises", "Combien de chaises sont éclairées ?"], ["Une chèvre peut aller à", "touffes", "Combien de touffes peut-elle brouter ?"], ["Une borne Wi-Fi porte à", "tablettes", "Combien de tablettes captent ?"], ["Un phare éclaire à", "bateaux", "Combien de bateaux sont éclairés ?"], ["Une sirène s’entend à", "maisons", "Combien de maisons l’entendent ?"], ["Un chien peut aller à", "os", "Combien d’os peut-il attraper ?"], ["Un drone vole jusqu’à", "arbres", "Combien d’arbres peut-il atteindre ?"], ["Un robot peut aller à", "massifs", "Combien de massifs atteint-il ?"], ["Un micro capte à", "chanteurs", "Combien de chanteurs sont captés ?"], ["Une antenne capte à", "téléphones", "Combien de téléphones captent ?"], ["Un jet d’eau mouille à", "bancs", "Combien de bancs sont mouillés ?"]];
const CIBLES = ["Une cible a deux cercles de centre O", "Dans l’eau, deux ronds ont le centre O", "Une piste a deux cercles de centre O", "Un parc a deux allées en cercle, de centre O", "Un bassin a deux cercles de centre O", "Une table ronde a deux cercles de centre O"];
const DISQUES = ["Une pelouse", "Une piste ronde", "Un bassin", "Une table", "Un rond-point", "Un tapis", "Une piscine ronde", "Une place", "Un manège", "Une fontaine", "Un trampoline", "Une arène"];

const cercleEnsemble: TutorBankItemV4[] = [
  K(1, 1, HINT_K, () => {
    const r = entre(2, 12), u = un(UNITES);
    const A = un(LETTRES.filter((l) => l !== "O"));
    return {
      text: tournure([`Le cercle a pour centre O et pour rayon ${r} ${u}.`, `Un cercle de centre O a un rayon de ${r} ${u}.`, `Le rayon du cercle de centre O est ${r} ${u}.`], [`${A} est sur le cercle.`, `Le point ${A} est sur le cercle.`], [`Combien mesure O${A} ?`, `Quelle est la distance O${A} ?`]),
      ...qcmN(r, [2 * r, r + 1, Math.max(r - 1, 1), r + 2], u),
      explanation: etapes(`tous les points du cercle sont à la même distance du centre.`, `cette distance est le rayon : ${r} ${u}.`, `O${A} = ${r} ${u}.`),
    };
  }),
  K(2, 1, HINT_K, () => {
    const r = entre(4, 12), u = un(UNITES);
    const cas = un([0, 1, 2]);
    const d = cas === 0 ? r : cas === 1 ? entre(1, r - 1) : r + entre(1, 6);
    const A = un(LETTRES.filter((l) => l !== "O"));
    const j = cas === 0 ? SUR : cas === 1 ? DEDANS : DEHORS;
    return {
      text: tournure([`Le rayon du cercle de centre O est ${r} ${u}.`, `Le cercle de centre O a un rayon de ${r} ${u}.`], [`O${A} = ${d} ${u}.`], [`Où est ${A} ?`, `Où est le point ${A} ?`]),
      ...qcm(j, [SUR, DEDANS, DEHORS]),
      explanation: etapes(`on compare O${A} et le rayon.`, `O${A} = ${d} ${u} et le rayon est ${r} ${u}.`, `${A} est ${j.toLowerCase()}.`),
    };
  }),
  K(3, 1, "Le point qui est sur le trait du cercle est à la distance du rayon.", () => {
    const ls = lettres(3);
    const place = melange([90, 45, 125]);
    const i = place.indexOf(90);
    const q = un<[string, number]>([[`sur le cercle`, 90], [`à l’intérieur du cercle`, 45], [`à l’extérieur du cercle`, 125]]);
    const j = place.indexOf(q[1]);
    return {
      text: tournure(["Regarde la figure.", "Observe les trois points.", "Voici un cercle et trois points."], [`Quel point est ${q[0]} ?`, `Lequel des points est ${q[0]} ?`, `Trouve le point ${q[0]}.`, `Quel est le point ${q[0]} ?`, `Nomme le point ${q[0]}.`]),
      ...qcm(`Le point ${ls[j]}`, ls.map((l) => `Le point ${l}`)),
      canvas: cerclePts(ls, place),
      explanation: etapes(`on regarde chaque point par rapport au trait du cercle.`, `${ls[i]} est sur le trait.`, `le point ${q[0]} est ${ls[j]}.`),
    };
  }),
  K(4, 2, HINT_K, () => {
    const r = entre(2, 12), u = un(UNITES);
    return {
      text: tournure([`Prends tous les points à ${r} ${u} de O.`, `On prend tous les points à ${r} ${u} du point O.`, `Marque tous les points à ${r} ${u} de O.`, `Imagine tous les points à ${r} ${u} de O.`], ["Quelle figure forment-ils ?", "Que forment-ils ?", "Quelle figure obtient-on ?", "Que dessinent-ils ?"]),
      ...qcm(`Un cercle de rayon ${r} ${u}`, [`Un cercle de rayon ${2 * r} ${u}`, `Un segment de ${r} ${u}`, `Un carré de côté ${r} ${u}`]),
      explanation: etapes(`tous ces points sont à la même distance de O.`, `cette distance, ${r} ${u}, est le rayon.`, `ils forment un cercle de rayon ${r} ${u}.`),
    };
  }),
  K(5, 2, "Le disque, c’est le cercle et tout ce qui est à l’intérieur.", () => {
    const r = entre(3, 12), u = un(UNITES);
    const cas = un([0, 1, 2]);
    const d = cas === 0 ? r : cas === 1 ? entre(1, r - 1) : r + entre(1, 6);
    const A = un(LETTRES.filter((l) => l !== "O"));
    const oui = d <= r;
    return {
      text: tournure([`Un disque a pour centre O et pour rayon ${r} ${u}.`, `Le disque de centre O a un rayon de ${r} ${u}.`], [`O${A} = ${d} ${u}.`], [`${A} est-il dans le disque ?`, `Le point ${A} appartient-il au disque ?`, `Le disque contient-il ${A} ?`]),
      ...qcm(oui ? "Oui" : "Non", [oui ? "Non" : "Oui"]),
      explanation: etapes(`un point est dans le disque si sa distance à O ne dépasse pas le rayon.`, `O${A} = ${d} ${u}, le rayon est ${r} ${u}.`, oui ? `oui, ${A} est dans le disque.` : `non, ${A} est hors du disque.`),
    };
  }),
  K(6, 2, "Le diamètre vaut deux rayons.", () => {
    const r = entre(2, 12), u = un(UNITES);
    const versD = Math.random() < 0.5;
    const [A, B] = lettres(2);
    return {
      text: versD
        ? tournure([`Le rayon du cercle de centre O est ${r} ${u}.`, `Un cercle a un rayon de ${r} ${u}.`], [`[${A}${B}] est un diamètre.`], [`Combien mesure ${A}${B} ?`, `Quelle est la longueur de ${A}${B} ?`, `Trouve ${A}${B}.`])
        : tournure([`Le diamètre [${A}${B}] d’un cercle mesure ${2 * r} ${u}.`, `Un cercle a un diamètre [${A}${B}] de ${2 * r} ${u}.`], ["Combien mesure le rayon ?", "Quel est le rayon ?", "Trouve le rayon."]),
      ...(versD ? qcmN(2 * r, [r, 4 * r, r + 2, 2 * r + 1], u) : qcmN(r, [2 * r, 4 * r, r + 1, r + 2], u)),
      explanation: etapes(`le diamètre vaut deux rayons.`, versD ? `2 × ${r} = ${2 * r}.` : `${2 * r} ÷ 2 = ${r}.`, versD ? `${A}${B} = ${2 * r} ${u}.` : `le rayon mesure ${r} ${u}.`),
    };
  }),
  K(7, 3, HINT_K, () => {
    const c = un(CHEVRES);
    const r = entre(4, 15);
    const d = un([r, entre(1, r - 1), r + entre(1, 6)]);
    const oui = d <= r;
    return {
      text: `${c[0]} ${r} m. ${c[1].charAt(0).toUpperCase()}${c[1].slice(1)} ${un(["est à", "se trouve à", "reste à"])} ${d} m de là. ${c[2]}`,
      ...qcm(oui ? "Oui" : "Non", [oui ? "Non" : "Oui"]),
      explanation: etapes(`on compare la distance et la portée : c’est le rayon d’un disque.`, `${d} m et ${r} m.`, oui ? `oui, ${d} m ne dépasse pas ${r} m.` : `non, ${d} m dépasse ${r} m.`),
    };
  }),
  K(8, 3, HINT_K, () => {
    const c = un(ARROSEURS);
    const r = entre(5, 12);
    const ds = melange([entre(1, r - 1), entre(1, r), r + entre(1, 5), entre(1, r + 5), entre(1, r + 5)]);
    const n = ds.filter((d) => d <= r).length;
    return {
      text: `${c[0]} ${r} m. ${un(["Il y a des", "On trouve des", "On note des"])} ${c[1]} à ${ds.join(" m, ")} m. ${c[2]}`,
      ...qcmN(n, [ds.length, ds.length - n, n + 1, Math.max(n - 1, 1)].filter((v) => v > 0), "", 1),
      explanation: etapes(`on garde les distances qui ne dépassent pas ${r} m.`, `${ds.filter((d) => d <= r).join(" m, ")} m.`, `il y en a ${n}.`),
    };
  }),
  K(9, 4, "Compare la distance au centre avec les deux rayons.", () => {
    const a = entre(2, 6), b = a + entre(2, 6);
    const cas = un([0, 1, 2]);
    const d = cas === 0 ? entre(1, a - 1) : cas === 1 ? entre(a + 1, b - 1) : b + entre(1, 5);
    const u = "m";
    const A = un(LETTRES.filter((l) => l !== "O"));
    const j = cas === 0 ? "Dans le petit cercle" : cas === 1 ? "Entre les deux cercles" : "Hors du grand cercle";
    return {
      text: tournure([`${un(CIBLES)}, de rayons ${a} ${u} et ${b} ${u}.`], [`O${A} = ${d} ${u}.`], [`Où est ${A} ?`, `Où se trouve le point ${A} ?`]),
      ...qcm(j, ["Dans le petit cercle", "Entre les deux cercles", "Hors du grand cercle"]),
      explanation: etapes(`on compare O${A} aux deux rayons.`, `${d} ${u}, avec ${a} ${u} et ${b} ${u}.`, `${A} est : ${j.toLowerCase()}.`),
    };
  }),
  K(10, 4, "La plus grande distance dans un disque est son diamètre.", () => {
    const r = entre(3, 15);
    return {
      text: tournure([`${un(DISQUES)} a la forme d’un disque de rayon ${r} m.`], ["Quelle est la plus grande distance entre deux de ses points ?", "Quelle est la plus longue ligne droite possible dessus ?", "Quelle plus grande ligne droite peut-on tracer dessus ?"]),
      ...qcmN(2 * r, [r, 3 * r, 4 * r, r * r], "m"),
      explanation: etapes(`la plus grande distance est le diamètre, qui passe par le centre.`, `2 × ${r} = ${2 * r}.`, `elle mesure ${2 * r} m.`),
    };
  }),
];

/* ═════════════════ solide_prisme ═════════════════ */
const S = atelier("cm1", "solide", "solide_prisme", "cm1_");
const BASES = [
  { nom: "triangle", pl: "triangles", n: 3, adj: "triangulaire" },
  { nom: "quadrilatère", pl: "quadrilatères", n: 4, adj: "à quatre côtés" },
  { nom: "pentagone", pl: "pentagones", n: 5, adj: "pentagonale" },
  { nom: "hexagone", pl: "hexagones", n: 6, adj: "hexagonale" },
  { nom: "octogone", pl: "octogones", n: 8, adj: "octogonale" },
];
const HINT_S = "Compte les côtés de la base : ce nombre donne tout le reste.";
const base = () => un(BASES);
const STEM_S = (b: (typeof BASES)[number]) => [`Un prisme a pour base un ${b.nom}.`, `La base d’un prisme est un ${b.nom}.`, `Voici un prisme dont la base est un ${b.nom}.`, `Un prisme droit a pour base un ${b.nom}.`];
const prisme = (): CanvasFigure => ({ kind: "solide_3d", solide: "prisme", size: { width: 320, height: 260 }, display: { showLabels: false, showDimensions: false, showFormulaHint: false } }) as CanvasFigure;
const cotes = (b: { nom: string; n: number }) => `un ${b.nom} a ${b.n} côtés`;
const CTX_S: [string, number][] = [["Un crayon a la forme d’un prisme à base hexagonale.", 6], ["Une tente a la forme d’un prisme à base triangulaire.", 3], ["Un boîtier a la forme d’un prisme à base octogonale.", 8], ["Une boîte de chocolats a la forme d’un prisme à base triangulaire.", 3], ["Un écrou a la forme d’un prisme à base hexagonale.", 6], ["Une tour a la forme d’un prisme à base pentagonale.", 5], ["Un kiosque a la forme d’un prisme à base octogonale.", 8], ["Un coffret a la forme d’un prisme à base pentagonale.", 5], ["Une cabane a la forme d’un prisme à base pentagonale.", 5], ["Une boîte à bijoux a la forme d’un prisme à base hexagonale.", 6], ["Un toit de garage a la forme d’un prisme à base triangulaire.", 3], ["Un phare a la forme d’un prisme à base octogonale.", 8]];
const ELEM = (n: number) => un<[string, number, string]>([["faces", n + 2, `${n} + 2 = ${n + 2}`], ["sommets", 2 * n, `2 × ${n} = ${2 * n}`], ["arêtes", 3 * n, `3 × ${n} = ${3 * n}`]]);

const solidePrisme: TutorBankItemV4[] = [
  S(1, 1, "2 bases + une face par côté de la base.", () => {
    const b = base();
    return {
      text: tournure(STEM_S(b), ["Combien a-t-il de faces ?", "Compte ses faces.", "Combien de faces en tout ?"]),
      ...qcmN(b.n + 2, [b.n, b.n + 1, 2 * b.n, 3 * b.n, b.n + 3]),
      ...(b.n === 3 ? { canvas: prisme() } : {}),
      explanation: etapes(`2 bases, plus une face pour chaque côté de la base.`, `${cotes(b)}. ${b.n} + 2 = ${b.n + 2}.`, `il a ${b.n + 2} faces.`),
    };
  }),
  S(2, 1, "Chaque base a autant de sommets que de côtés. Il y a 2 bases.", () => {
    const b = base();
    return {
      text: tournure(STEM_S(b), ["Combien a-t-il de sommets ?", "Compte ses sommets.", "Combien de sommets en tout ?"]),
      ...qcmN(2 * b.n, [b.n, b.n + 2, 3 * b.n, 2 * b.n + 2]),
      ...(b.n === 3 ? { canvas: prisme() } : {}),
      explanation: etapes(`chaque base a un sommet par côté. Il y a 2 bases.`, `${cotes(b)}. 2 × ${b.n} = ${2 * b.n}.`, `il a ${2 * b.n} sommets.`),
    };
  }),
  S(3, 1, "Autour des deux bases, les faces sont droites comme des murs.", () => {
    const b = base();
    return {
      text: tournure(STEM_S(b), ["Quelle est la forme des faces latérales ?", "Les faces des côtés sont quelles figures ?", "Quelles sont ses faces latérales ?"]),
      ...qcm("Des rectangles", ["Des cercles", "Des triangles", `Des ${b.n === 3 ? "pentagones" : b.pl}`]),
      explanation: etapes(`dans un prisme droit, les faces autour des bases sont des rectangles.`, `ses deux bases sont des ${b.pl}.`, `les faces latérales sont des rectangles.`),
    };
  }),
  S(4, 2, "Une arête par côté en bas, une en haut, une debout.", () => {
    const b = base();
    return {
      text: tournure(STEM_S(b), ["Combien a-t-il d’arêtes ?", "Compte ses arêtes.", "Combien d’arêtes en tout ?"]),
      ...qcmN(3 * b.n, [2 * b.n, b.n + 2, b.n, 4 * b.n]),
      ...(b.n === 3 ? { canvas: prisme() } : {}),
      explanation: etapes(`${b.n} arêtes en bas, ${b.n} en haut, ${b.n} debout.`, `3 × ${b.n} = ${3 * b.n}.`, `il a ${3 * b.n} arêtes.`),
    };
  }),
  S(5, 2, "Une face latérale par côté de la base.", () => {
    const b = base();
    return {
      text: tournure(STEM_S(b), ["Combien a-t-il de faces latérales ?", "Compte ses faces latérales.", "Combien de rectangles autour des bases ?"]),
      ...qcmN(b.n, [b.n + 2, 2 * b.n, 3 * b.n, b.n + 1]),
      explanation: etapes(`une face latérale pour chaque côté de la base.`, `${cotes(b)}.`, `il a ${b.n} faces latérales.`),
    };
  }),
  S(6, 2, "Faces = côtés de la base + 2.", () => {
    const b = base();
    const f = b.n + 2;
    return {
      text: tournure([`Un prisme a ${f} faces.`, `Ce prisme compte ${f} faces.`, `On compte ${f} faces sur un prisme.`, `Il y a ${f} faces sur ce prisme.`], ["Quelle est sa base ?", "Quelle figure est sa base ?", "Quelle est la forme de sa base ?", "Quelle figure forme sa base ?"]),
      ...qcm(`Un ${b.nom}`, BASES.map((x) => `Un ${x.nom}`)),
      explanation: etapes(`on retire les 2 bases.`, `${f} − 2 = ${b.n} : la base a ${b.n} côtés.`, `sa base est un ${b.nom}.`),
    };
  }),
  S(7, 3, HINT_S, () => {
    const [c, n] = un(CTX_S);
    const [mot, v, calc] = ELEM(n);
    return {
      text: tournure([c], [`Combien a-t-il de ${mot} ?`.replace("il", /^Une /.test(c) ? "elle" : "il"), `Compte ses ${mot}.`]),
      ...qcmN(v, [n, n + 2, 2 * n, 3 * n, 4 * n]),
      explanation: etapes(`la base a ${n} côtés.`, `${calc}.`, `${v} ${mot}.`),
    };
  }),
  S(8, 3, "Il faut 2 bases et un rectangle par côté de la base.", () => {
    const [c, n] = un(CTX_S);
    const b = BASES.find((x) => x.n === n)!;
    const m = un(["Un artisan veut la fabriquer en carton.", "On veut la construire en carton.", "Une maquettiste veut la reproduire.", "Un élève veut la construire."]);
    return {
      text: `${c} ${m.replace("la", "le").replace("le fabriquer", "en faire une maquette").replace("le construire", "en faire une maquette").replace("le reproduire", "en faire une maquette")} Combien de rectangles faut-il ?`,
      ...qcmN(n, [n + 2, 2 * n, 3 * n, n + 1]),
      explanation: etapes(`il y a un rectangle par côté de la base.`, `${cotes(b)}.`, `il faut ${n} rectangles.`),
    };
  }),
  S(9, 4, "Le patron : 2 bases et un rectangle par côté de la base.", () => {
    const b = base();
    return {
      text: tournure([`On dessine le patron d’un prisme à base ${b.adj}.`, `Une élève dessine le patron d’un prisme dont la base est un ${b.nom}.`, `Un défi : le patron d’un prisme dont la base est un ${b.nom}.`], ["Quelles figures faut-il ?", "De quelles figures a-t-on besoin ?", "Que contient le patron ?"]),
      ...qcm(`2 ${b.pl} et ${b.n} rectangles`, [`1 ${b.nom} et ${b.n} rectangles`, `2 ${b.pl} et ${b.n + 2} rectangles`, `${b.n} ${b.pl} et 2 rectangles`]),
      explanation: etapes(`le patron montre toutes les faces, une seule fois.`, `2 bases, et ${b.n} faces latérales.`, `2 ${b.pl} et ${b.n} rectangles.`),
    };
  }),
  S(10, 4, "Retrouve d’abord le nombre de côtés de la base.", () => {
    const b = base();
    const [m1, v1, m2, v2, calc] = un<[string, number, string, number, string]>([
      ["sommets", 2 * b.n, "arêtes", 3 * b.n, `${2 * b.n} ÷ 2 = ${b.n}, puis 3 × ${b.n} = ${3 * b.n}`],
      ["sommets", 2 * b.n, "faces", b.n + 2, `${2 * b.n} ÷ 2 = ${b.n}, puis ${b.n} + 2 = ${b.n + 2}`],
      ["arêtes", 3 * b.n, "sommets", 2 * b.n, `${3 * b.n} ÷ 3 = ${b.n}, puis 2 × ${b.n} = ${2 * b.n}`],
      ["arêtes", 3 * b.n, "faces", b.n + 2, `${3 * b.n} ÷ 3 = ${b.n}, puis ${b.n} + 2 = ${b.n + 2}`],
      ["faces", b.n + 2, "arêtes", 3 * b.n, `${b.n + 2} − 2 = ${b.n}, puis 3 × ${b.n} = ${3 * b.n}`],
      ["faces", b.n + 2, "sommets", 2 * b.n, `${b.n + 2} − 2 = ${b.n}, puis 2 × ${b.n} = ${2 * b.n}`],
    ]);
    return {
      text: tournure([`Un prisme a ${v1} ${m1}.`, `Une énigme : ce prisme a ${v1} ${m1}.`, `Sur ce prisme, on compte ${v1} ${m1}.`], [`Combien a-t-il de ${m2} ?`, `Compte ses ${m2}.`]),
      ...qcmN(v2, [v1, b.n, b.n + 2, 2 * b.n, 3 * b.n, 4 * b.n]),
      explanation: etapes(`on retrouve les côtés de la base.`, `${calc}.`, `il a ${v2} ${m2}.`),
    };
  }),
];

/* ═════════════════ graphique_courbe_lire ═════════════════ */
const G = atelier("cm1", "graphique", "graphique_courbe_lire", "cm1_");
const HINT_G = "Pars du moment, en bas. Monte jusqu’à la courbe. Lis la valeur à gauche.";
type Theme = { ctx: string; quoi: string; labels: string[]; unite: string; pas: number; max: number };
const HEURES = ["8 h", "10 h", "12 h", "14 h", "16 h", "18 h"];
const JOURS = ["Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."];
const MOIS = ["Janv.", "Fév.", "Mars", "Avril", "Mai", "Juin"];
const SEM = ["Sem. 1", "Sem. 2", "Sem. 3", "Sem. 4", "Sem. 5", "Sem. 6"];
const THEMES: Theme[] = [
  { ctx: "Une météorologue relève la température.", quoi: "température", labels: HEURES, unite: "°C", pas: 2, max: 30 },
  { ctx: "Un jardinier mesure la taille d’une plante.", quoi: "taille", labels: SEM, unite: "cm", pas: 5, max: 60 },
  { ctx: "Un musée compte ses visiteurs.", quoi: "nombre de visiteurs", labels: JOURS, unite: "visiteurs", pas: 10, max: 100 },
  { ctx: "Une agricultrice note le niveau de sa cuve.", quoi: "volume", labels: MOIS, unite: "L", pas: 20, max: 200 },
  { ctx: "Une infirmière suit la masse d’un bébé.", quoi: "masse", labels: MOIS, unite: "kg", pas: 1, max: 10 },
  { ctx: "Une biologiste compte des oiseaux.", quoi: "nombre d’oiseaux", labels: MOIS, unite: "oiseaux", pas: 5, max: 50 },
  { ctx: "Un cycliste note sa distance.", quoi: "distance", labels: JOURS, unite: "km", pas: 5, max: 50 },
  { ctx: "Un boulanger compte ses baguettes.", quoi: "nombre de baguettes", labels: JOURS, unite: "baguettes", pas: 20, max: 200 },
  { ctx: "Une libraire compte ses ventes.", quoi: "nombre de livres", labels: SEM, unite: "livres", pas: 10, max: 100 },
  { ctx: "Une nageuse note ses longueurs.", quoi: "nombre de longueurs", labels: SEM, unite: "longueurs", pas: 2, max: 20 },
  { ctx: "Une gardienne de phare note la hauteur de la mer.", quoi: "hauteur", labels: HEURES, unite: "m", pas: 1, max: 10 },
  { ctx: "Une pharmacienne compte ses clients.", quoi: "nombre de clients", labels: HEURES, unite: "clients", pas: 5, max: 60 },
];
/** Des valeurs multiples du pas, voisines toutes différentes, max et min uniques. */
function courbe(th: Theme) {
  const nb = Math.floor(th.max / th.pas);
  for (;;) {
    const vals = th.labels.map(() => entre(1, nb) * th.pas);
    const ok = vals.every((v, i) => i === 0 || v !== vals[i - 1]) && vals.filter((v) => v === Math.max(...vals)).length === 1 && vals.filter((v) => v === Math.min(...vals)).length === 1;
    if (!ok) continue;
    const fig = { kind: "stat_graph", graphType: "courbe", data: th.labels.map((label, i) => ({ label, value: vals[i] })), display: { showValues: false, showAxis: true, step: th.pas, axeY: th.unite } } as CanvasFigure;
    return { vals, fig };
  }
}
const lireFin = ["Lis la courbe.", "Regarde la courbe.", "Observe la courbe.", "Suis la courbe.", ""];
const uneUnite = (t: Theme, v: number) => `${fr(v)} ${t.unite}`;

const graphiqueCourbe: TutorBankItemV4[] = [
  G(1, 1, HINT_G, () => {
    const th = un(THEMES); const { vals, fig } = courbe(th);
    const i = entre(0, 5);
    return {
      text: tournure(lireFin, [`Quelle est la valeur pour ${th.labels[i]} ?`, `Que vaut la courbe pour ${th.labels[i]} ?`, `Quelle valeur lis-tu pour ${th.labels[i]} ?`]),
      ...qcmN(vals[i], [...vals, vals[i] + th.pas, vals[i] + 2 * th.pas], th.unite, th.pas),
      canvas: fig,
      explanation: etapes(`on part de ${th.labels[i]} et on monte jusqu’à la courbe.`, `on lit à gauche : ${uneUnite(th, vals[i])}.`, `la valeur est ${uneUnite(th, vals[i])}.`),
    };
  }),
  G(2, 1, "Le point le plus haut de la courbe donne le maximum.", () => {
    const th = un(THEMES); const { vals, fig } = courbe(th);
    const j = th.labels[vals.indexOf(Math.max(...vals))];
    return {
      text: tournure(lireFin, ["Quand la valeur est-elle la plus grande ?", "Quel est le moment le plus haut ?", "À quel moment la courbe est-elle la plus haute ?", "Où la courbe monte-t-elle le plus haut ?"]),
      ...qcm(j, th.labels),
      canvas: fig,
      explanation: etapes(`on cherche le point le plus haut.`, `il est au-dessus de ${j}.`, `la valeur la plus grande est pour ${j}.`),
    };
  }),
  G(3, 1, "Le point le plus bas de la courbe donne le minimum.", () => {
    const th = un(THEMES); const { vals, fig } = courbe(th);
    const j = th.labels[vals.indexOf(Math.min(...vals))];
    return {
      text: tournure(lireFin, ["Quand la valeur est-elle la plus petite ?", "Quel est le moment le plus bas ?", "À quel moment la courbe est-elle la plus basse ?", "Où la courbe descend-elle le plus bas ?"]),
      ...qcm(j, th.labels),
      canvas: fig,
      explanation: etapes(`on cherche le point le plus bas.`, `il est au-dessus de ${j}.`, `la valeur la plus petite est pour ${j}.`),
    };
  }),
  G(4, 2, "La courbe monte si le point suivant est plus haut.", () => {
    const th = un(THEMES); const { vals, fig } = courbe(th);
    const i = entre(0, 4);
    const monte = vals[i + 1] > vals[i];
    return {
      text: tournure(lireFin, [`Entre ${th.labels[i]} et ${th.labels[i + 1]}, que fait la courbe ?`, `De ${th.labels[i]} à ${th.labels[i + 1]}, comment est la courbe ?`, `Que fait la courbe de ${th.labels[i]} à ${th.labels[i + 1]} ?`]),
      ...qcm(monte ? "Elle monte" : "Elle descend", ["Elle monte", "Elle descend", "Elle reste au même niveau"]),
      canvas: fig,
      explanation: etapes(`on compare les deux points.`, `${uneUnite(th, vals[i])}, puis ${uneUnite(th, vals[i + 1])}.`, monte ? `elle monte.` : `elle descend.`),
    };
  }),
  G(5, 2, "Lis les deux valeurs, puis soustrais la plus petite à la plus grande.", () => {
    const th = un(THEMES); const { vals, fig } = courbe(th);
    const i = entre(0, 4);
    const e = Math.abs(vals[i + 1] - vals[i]);
    return {
      text: tournure(lireFin, [`Quel est l’écart entre ${th.labels[i]} et ${th.labels[i + 1]} ?`, `De combien la valeur change-t-elle de ${th.labels[i]} à ${th.labels[i + 1]} ?`, `Calcule l’écart de ${th.labels[i]} à ${th.labels[i + 1]}.`]),
      ...qcmN(e, [vals[i], vals[i + 1], vals[i] + vals[i + 1], e + th.pas], th.unite, th.pas),
      canvas: fig,
      explanation: etapes(`on lit les deux valeurs.`, `${uneUnite(th, vals[i])} et ${uneUnite(th, vals[i + 1])}. L’écart vaut ${fr(e)}.`, `l’écart est ${uneUnite(th, e)}.`),
    };
  }),
  G(6, 2, "Pars de la valeur à gauche, va jusqu’à la courbe, puis descends.", () => {
    const th = un(THEMES);
    let c = courbe(th), v = Math.max(...c.vals);
    v = un(c.vals.filter((x) => c.vals.filter((y) => y === x).length === 1));
    const j = th.labels[c.vals.indexOf(v)];
    return {
      text: tournure(lireFin, [`Pour quel moment la valeur est-elle ${uneUnite(th, v)} ?`, `Quand lit-on ${uneUnite(th, v)} ?`, `Où la courbe vaut-elle ${uneUnite(th, v)} ?`]),
      ...qcm(j, th.labels),
      canvas: c.fig,
      explanation: etapes(`on part de ${uneUnite(th, v)} à gauche.`, `on va jusqu’à la courbe, puis on descend.`, `c’est pour ${j}.`),
    };
  }),
  G(7, 3, HINT_G, () => {
    const th = un(THEMES); const { vals, fig } = courbe(th);
    const i = entre(0, 5);
    return {
      text: `${th.ctx} ${un([`Quelle valeur note-t-on pour ${th.labels[i]} ?`, `Que lit-on pour ${th.labels[i]} ?`, `Quelle est la valeur pour ${th.labels[i]} ?`])}`,
      ...qcmN(vals[i], [...vals, vals[i] + th.pas], th.unite, th.pas),
      canvas: fig,
      explanation: etapes(`on part de ${th.labels[i]} et on monte jusqu’à la courbe.`, `on lit à gauche : ${uneUnite(th, vals[i])}.`, `la valeur est ${uneUnite(th, vals[i])}.`),
    };
  }),
  G(8, 3, "Cherche le plus grand et le plus petit point, puis soustrais.", () => {
    const th = un(THEMES); const { vals, fig } = courbe(th);
    const M = Math.max(...vals), m = Math.min(...vals);
    return {
      text: `${th.ctx} ${un(["Quel est l’écart entre le plus haut et le plus bas ?", "De combien le plus haut dépasse-t-il le plus bas ?", "Calcule l’écart entre le maximum et le minimum."])}`,
      ...qcmN(M - m, [M, m, M + m, M - m + th.pas], th.unite, th.pas),
      canvas: fig,
      explanation: etapes(`on lit le point le plus haut et le plus bas.`, `${uneUnite(th, M)} et ${uneUnite(th, m)}. L’écart vaut ${fr(M - m)}.`, `l’écart est ${uneUnite(th, M - m)}.`),
    };
  }),
  G(9, 4, "Compare chaque écart entre deux moments voisins.", () => {
    const th = un(THEMES);
    for (;;) {
      const { vals, fig } = courbe(th);
      const hausses = vals.slice(1).map((v, i) => v - vals[i]);
      const M = Math.max(...hausses);
      if (M <= 0 || hausses.filter((h) => h === M).length !== 1) continue;
      const i = hausses.indexOf(M);
      const per = (k: number) => `De ${th.labels[k]} à ${th.labels[k + 1]}`;
      return {
        text: `${th.ctx} ${un(["Quand la courbe monte-t-elle le plus ?", "Quelle est la plus forte hausse ?", "Quand la hausse est-elle la plus grande ?"])}`,
        ...qcm(per(i), [0, 1, 2, 3, 4].filter((k) => k !== i).map(per)),
        canvas: fig,
        explanation: etapes(`on cherche la montée la plus raide.`, `${uneUnite(th, vals[i])}, puis ${uneUnite(th, vals[i + 1])} : + ${fr(M)}.`, `c’est de ${th.labels[i]} à ${th.labels[i + 1]}.`),
      };
    }
  }),
  G(10, 4, "Compte les points au-dessus de la valeur.", () => {
    const th = un(THEMES); const { vals, fig } = courbe(th);
    const seuil = un(vals.filter((v) => v !== Math.max(...vals)));
    const n = vals.filter((v) => v > seuil).length;
    return {
      text: `${th.ctx} ${un([`Combien de fois dépasse-t-on ${uneUnite(th, seuil)} ?`, `Combien de points sont au-dessus de ${uneUnite(th, seuil)} ?`, `Combien de relevés dépassent ${uneUnite(th, seuil)} ?`])}`,
      ...qcmN(n, [n + 1, Math.max(n - 1, 1), n + 2, 6]),
      canvas: fig,
      explanation: etapes(`on regarde les points plus hauts que ${uneUnite(th, seuil)}.`, `${vals.filter((v) => v > seuil).map((v) => fr(v)).join(", ")}.`, `il y en a ${n}.`),
    };
  }),
];

/* ═════════════════ angle_notation ═════════════════ */
const N = atelier("cm1", "angle", "angle_notation", "cm1_");
const HINT_N = "La lettre du milieu est toujours le sommet de l’angle.";
const hat = (a: string, b: string, c: string) => `$\\widehat{${a}${b}${c}}$`;
const figAngle = (deg: number, ls: string[]): CanvasFigure => ({ kind: "angle", angle: { angleDeg: deg, labels: { left: ls[0], vertex: ls[1], right: ls[2] }, display: { showLabels: true, showMeasure: false, showArc: true } } }) as CanvasFigure;
const figTri = (ls: string[]): CanvasFigure => ({ kind: "triangle", size: { width: 320, height: 250 }, points: { A: { x: 50, y: 205 }, B: { x: 280, y: 205 }, C: { x: 150, y: 45 } }, labels: { A: ls[0], B: ls[1], C: ls[2] }, display: { showLabels: true, showPoints: true, showSides: true } }) as CanvasFigure;
/** Plusieurs demi-droites de même origine, sans mesure écrite. */
const figRayons = (s: string, rayons: { nom: string; deg: number }[]): CanvasFigure => {
  const O = { x: 170, y: 130 }, L = 105;
  const bout = (d: number) => ({ x: Math.round(O.x + L * Math.cos((d * Math.PI) / 180)), y: Math.round(O.y - L * Math.sin((d * Math.PI) / 180)) });
  return { kind: "droites", size: { width: 340, height: 260 }, lines: rayons.map((r) => ({ id: `${s}${r.nom}`, type: "demi_droite", from: O, to: bout(r.deg) })), points: [{ x: O.x, y: O.y, label: s, highlight: true }, ...rayons.map((r) => ({ ...bout(r.deg), label: r.nom }))], display: { showLabels: true, showPoints: true } } as CanvasFigure;
};
const CTX_N: [string, string][] = [["Une carte montre trois villes", "ville"], ["Un plan montre trois maisons", "maison"], ["Un dessin montre trois arbres", "arbre"], ["Une randonneuse repère trois sommets", "point"], ["Un marin repère trois phares", "phare"], ["Une géomètre plante trois piquets", "piquet"], ["Un pilote repère trois balises", "balise"], ["Une charpentière marque trois clous", "clou"], ["Un astronome repère trois étoiles", "étoile"], ["Une couturière place trois épingles", "épingle"], ["Un chasseur de trésor marque trois rochers", "rocher"], ["Une architecte marque trois poteaux", "poteau"]];

const angleNotation: TutorBankItemV4[] = [
  N(1, 1, HINT_N, () => {
    const [a, b, c] = lettres(3);
    return {
      text: tournure(["", "Lis bien l’écriture."], [`Quel est le sommet de ${hat(a, b, c)} ?`, `Dans ${hat(a, b, c)}, quel point est le sommet ?`, `${hat(a, b, c)} a pour sommet quel point ?`, `Où est le sommet de ${hat(a, b, c)} ?`]),
      ...qcm(`Le point ${b}`, [`Le point ${a}`, `Le point ${c}`, `Le point ${un(LETTRES.filter((l) => ![a, b, c].includes(l)))}`]),
      explanation: etapes(`la lettre du milieu est le sommet.`, `dans ${a}${b}${c}, c’est ${b}.`, `le sommet est ${b}.`),
    };
  }),
  N(2, 1, "Les côtés partent du sommet, la lettre du milieu.", () => {
    const [a, b, c] = lettres(3);
    return {
      text: tournure(["", "Pars du sommet."], [`Quels sont les côtés de ${hat(a, b, c)} ?`, `${hat(a, b, c)} a quels côtés ?`, `Trouve les côtés de ${hat(a, b, c)}.`, `Dans ${hat(a, b, c)}, quels sont les côtés ?`]),
      ...qcm(`[${b}${a}) et [${b}${c})`, [`[${a}${b}) et [${a}${c})`, `[${c}${a}) et [${c}${b})`, `[${a}${b}) et [${c}${b})`]),
      explanation: etapes(`les deux côtés partent du sommet ${b}.`, `ils passent par ${a} et par ${c}.`, `les côtés sont [${b}${a}) et [${b}${c}).`),
    };
  }),
  N(3, 1, HINT_N, () => {
    const [a, b, c] = lettres(3);
    const d = 5 * entre(6, 28);
    return {
      text: tournure(["Regarde cet angle.", "Voici un angle.", "Observe cet angle."], ["Comment s’écrit-il ?", "Quelle écriture convient ?", "Quel est son nom ?", "Comment le nomme-t-on ?", "Quelle est son écriture ?"]),
      ...qcm(hat(a, b, c), [hat(b, a, c), hat(a, c, b), hat(c, a, b)]),
      canvas: figAngle(d, [a, b, c]),
      explanation: etapes(`le sommet s’écrit au milieu.`, `le sommet est ${b}, les autres points sont ${a} et ${c}.`, `on écrit ${hat(a, b, c)}.`),
    };
  }),
  N(4, 2, HINT_N, () => {
    const [a, b, c] = lettres(3);
    const som = un([a, b, c]);
    const [x, y] = [a, b, c].filter((l) => l !== som);
    return {
      text: tournure(["Regarde ce triangle.", "Voici un triangle.", "Observe le triangle."], [`Quel angle a pour sommet ${som} ?`, `Comment s’écrit l’angle en ${som} ?`, `Quelle écriture donne l’angle de sommet ${som} ?`, `Nomme l’angle au sommet ${som}.`, `Trouve l’angle en ${som}.`]),
      ...qcm(hat(x, som, y), [hat(som, x, y), hat(x, y, som), hat(y, x, som)]),
      canvas: figTri([a, b, c]),
      explanation: etapes(`${som} s’écrit au milieu.`, `les deux autres points sont ${x} et ${y}.`, `on écrit ${hat(x, som, y)}.`),
    };
  }),
  N(5, 2, "On peut lire un angle dans les deux sens : le sommet reste au milieu.", () => {
    const [a, b, c] = lettres(3);
    const meme = Math.random() < 0.5;
    const autre = meme ? hat(c, b, a) : un([hat(b, a, c), hat(a, c, b)]);
    return {
      text: tournure(["", "Regarde les lettres du milieu."], [`${hat(a, b, c)} et ${autre} : est-ce le même angle ?`, `Est-ce le même angle : ${hat(a, b, c)} et ${autre} ?`, `${hat(a, b, c)} et ${autre} sont-ils le même angle ?`, `${hat(a, b, c)} et ${autre} désignent-ils un seul angle ?`]),
      ...qcm(meme ? "Oui" : "Non", [meme ? "Non" : "Oui"]),
      explanation: etapes(`on regarde le sommet et les deux autres points.`, meme ? `même sommet ${b}, mêmes points ${a} et ${c}.` : `les sommets ne sont pas les mêmes.`, meme ? `oui, c’est le même angle.` : `non, ce sont deux angles différents.`),
    };
  }),
  N(6, 2, HINT_N, () => {
    const [s, x, y, z] = lettres(4);
    const [p, q] = melange([x, y, z]);
    const degs = [0, 50, 120];
    const fig = figRayons(s, [{ nom: x, deg: degs[0] }, { nom: y, deg: degs[1] }, { nom: z, deg: degs[2] }]);
    return {
      text: tournure(["Regarde la figure.", "Voici trois demi-droites.", "Observe la figure."], [`Quel angle a pour côtés [${s}${p}) et [${s}${q}) ?`, `Comment s’écrit l’angle entre [${s}${p}) et [${s}${q}) ?`, `Nomme l’angle formé par [${s}${p}) et [${s}${q}).`, `Quel angle est entre [${s}${p}) et [${s}${q}) ?`]),
      ...qcm(hat(p, s, q), [hat(s, p, q), hat(p, q, s), hat(q, p, s)]),
      canvas: fig,
      explanation: etapes(`le sommet commun est ${s}. Il s’écrit au milieu.`, `les côtés passent par ${p} et par ${q}.`, `on écrit ${hat(p, s, q)}.`),
    };
  }),
  N(7, 3, HINT_N, () => {
    const [ctx, mot] = un(CTX_N);
    const [a, b, c] = lettres(3);
    return {
      text: tournure([`${ctx} : ${a}, ${b} et ${c}.`], [`On parle de l’angle ${hat(a, b, c)}.`, `Le guide cite l’angle ${hat(a, b, c)}.`], [`Où est le sommet ?`, `Où est son sommet ?`, `Où se trouve le sommet ?`]),
      ...qcm(`En ${b}`, [`En ${a}`, `En ${c}`]),
      explanation: etapes(`la lettre du milieu est le sommet.`, `dans ${a}${b}${c}, c’est ${b}.`, `le sommet est en ${b} (${mot} ${b}).`),
    };
  }),
  N(8, 3, HINT_N, () => {
    const [ctx] = un(CTX_N);
    const [a, b, c] = lettres(3);
    return {
      text: tournure([`${ctx} : ${a}, ${b} et ${c}.`], [`Depuis ${b}, on regarde ${a} et ${c}.`, `On se place en ${b} et on vise ${a} puis ${c}.`], [`Comment s’écrit cet angle ?`, `Quel angle voit-on ?`]),
      ...qcm(hat(a, b, c), [hat(b, a, c), hat(a, c, b), hat(c, a, b)]),
      explanation: etapes(`le sommet est le point d’où l’on regarde : ${b}.`, `il s’écrit au milieu, entre ${a} et ${c}.`, `on écrit ${hat(a, b, c)}.`),
    };
  }),
  N(9, 4, "Les lettres voisines du sommet entourent la lettre du milieu.", () => {
    const [a, b, c, d] = lettres(4);
    const tour = [a, b, c, d];
    const i = entre(0, 3);
    const s = tour[i], av = tour[(i + 3) % 4], ap = tour[(i + 1) % 4], op = tour[(i + 2) % 4];
    return {
      text: tournure([`Le quadrilatère ${a}${b}${c}${d} se lit dans cet ordre.`, `Voici le quadrilatère ${a}${b}${c}${d}.`, `Une élève trace le quadrilatère ${a}${b}${c}${d}.`, `Un terrain a la forme du quadrilatère ${a}${b}${c}${d}.`], [`Quel est l’angle au sommet ${s} ?`, `Comment s’écrit l’angle en ${s} ?`, `Nomme l’angle de sommet ${s}.`]),
      ...qcm(hat(av, s, ap), [hat(av, s, op), hat(s, av, ap), hat(av, ap, s), hat(op, s, ap)]),
      canvas: { kind: "quadrilatere", size: { width: 320, height: 240 }, points: { A: { x: 60, y: 50 }, B: { x: 260, y: 40 }, C: { x: 280, y: 200 }, D: { x: 40, y: 190 } }, labels: { A: a, B: b, C: c, D: d }, display: { showLabels: true, showPoints: true, showSides: true } } as CanvasFigure,
      explanation: etapes(`le sommet ${s} s’écrit au milieu. Ses voisins sont ${av} et ${ap}.`, `${op} est en face : il ne compte pas.`, `on écrit ${hat(av, s, ap)}.`),
    };
  }),
  N(10, 4, HINT_N, () => {
    const [a, b, c] = lettres(3);
    const nom = un(["Tom", "Une élève", "Sami", "Un camarade", "Lina", "Un joueur", "Maya", "Une voisine", "Ilyes", "Un cousin", "Jade", "Une amie"]);
    return {
      text: tournure([`${nom} veut l’angle de sommet ${b}.`], [`Il est écrit ${hat(b, a, c)}.`, `L’écriture est ${hat(b, a, c)}.`], ["Quelle est la bonne écriture ?", "Que faut-il écrire ?", "Corrige cette écriture."]),
      ...qcm(hat(a, b, c), [hat(b, a, c), hat(a, c, b), hat(c, a, b)]),
      explanation: etapes(`le sommet doit être au milieu.`, `${b} est le sommet, il va entre ${a} et ${c}.`, `on écrit ${hat(a, b, c)}.`),
    };
  }),
];

/* ═════════════════ angle_comparer_sans_mesure ═════════════════ */
const C = atelier("cm1", "angle", "angle_comparer_sans_mesure", "cm1_");
const HINT_C = "Regarde l’écart entre les deux côtés, pas leur longueur.";
/** Des angles côte à côte, sans degrés, avec des côtés de longueurs différentes. */
function angles(liste: { s: string; deg: number; L: number; droit?: boolean }[]): CanvasFigure {
  return { kind: "deux_angles", mode: "cote_a_cote", angles: liste.map((a) => ({ deg: a.deg, nom: a.s, longueur: a.L, rotation: entre(-20, 40) })) } as CanvasFigure;
}
/** Le plus ouvert a souvent les côtés les plus courts : c'est le piège à travailler. */
function duo() {
  const [s1, s2] = lettres(2);
  const d1 = 5 * entre(4, 11), d2 = d1 + 5 * entre(4, 9);
  const piege = Math.random() < 0.7;
  const haut = { s: s2, deg: d2, L: piege ? 55 : 95 }, bas = { s: s1, deg: d1, L: piege ? 100 : 65 };
  return { liste: melange([haut, bas]), s1, s2 };
}
const OBJETS_C: [string, string][] = [["Deux compas sont ouverts", "compas"], ["Deux paires de ciseaux sont ouvertes", "paire de ciseaux"], ["Deux livres sont entrouverts", "livre"], ["Deux pinces sont ouvertes", "pince"], ["Deux éventails sont ouverts", "éventail"], ["Deux portes sont entrouvertes", "porte"], ["Deux tenailles sont ouvertes", "tenaille"], ["Deux équerres pliantes sont ouvertes", "équerre"], ["Deux parapluies sont ouverts", "parapluie"], ["Deux bras d’un robot sont pliés", "bras"], ["Deux capots de voiture sont levés", "capot"], ["Deux ordinateurs portables sont ouverts", "ordinateur"]];
const QUI_C = ["Léa", "Un élève", "Sami", "Une camarade", "Noé", "Une voisine", "Ilyes", "Un cousin", "Jade", "Une amie", "Maya", "Un joueur"];

const angleComparer: TutorBankItemV4[] = [
  C(1, 1, HINT_C, () => {
    const { liste, s2 } = duo();
    const [p, q] = liste.map((a) => a.s);
    return {
      text: tournure(["", "Regarde l’écart des côtés.", "Sans mesurer."], ["Quel angle est le plus grand ?", "Quel angle est le plus ouvert ?", "Lequel est le plus ouvert ?", "Lequel est le plus grand ?", "Trouve le plus grand angle."]),
      ...qcm(`L’angle ${s2}`, [`L’angle ${p}`, `L’angle ${q}`, "Ils sont égaux"]),
      canvas: angles(liste),
      explanation: etapes(`on regarde l’écart entre les côtés, pas leur longueur.`, `l’écart est plus grand pour ${s2}.`, `l’angle ${s2} est le plus grand.`),
    };
  }),
  C(2, 1, HINT_C, () => {
    const { liste, s1 } = duo();
    const [p, q] = liste.map((a) => a.s);
    return {
      text: tournure(["", "Regarde l’écart des côtés.", "Sans mesurer."], ["Quel angle est le plus petit ?", "Quel angle est le moins ouvert ?", "Lequel est le moins ouvert ?", "Lequel est le plus petit ?", "Trouve le plus petit angle."]),
      ...qcm(`L’angle ${s1}`, [`L’angle ${p}`, `L’angle ${q}`, "Ils sont égaux"]),
      canvas: angles(liste),
      explanation: etapes(`on regarde l’écart entre les côtés, pas leur longueur.`, `l’écart est plus petit pour ${s1}.`, `l’angle ${s1} est le plus petit.`),
    };
  }),
  C(3, 1, HINT_C, () => {
    const { liste, s1, s2 } = duo();
    const inf = Math.random() < 0.5;
    const juste = inf ? `${s1} < ${s2}` : `${s2} > ${s1}`;
    return {
      text: tournure(["", "Regarde l’écart des côtés.", "Sans mesurer."], ["Quelle comparaison est juste ?", "Quelle phrase est vraie ?", "Compare les deux angles.", "Que peut-on écrire ?", "Quelle écriture convient ?"]),
      ...qcm(juste, inf ? [`${s1} > ${s2}`, `${s1} = ${s2}`] : [`${s2} < ${s1}`, `${s2} = ${s1}`]),
      canvas: angles(liste),
      explanation: etapes(`on regarde l’écart entre les côtés.`, `l’écart de ${s2} est plus grand que celui de ${s1}.`, `donc ${juste}.`),
    };
  }),
  C(4, 2, HINT_C, () => {
    const [a, b, c] = lettres(3);
    const ds = melange([35, 70, 115]);
    const ls = melange([55, 75, 100]);
    const liste = [a, b, c].map((s, i) => ({ s, deg: ds[i], L: ls[i] }));
    const grand = Math.random() < 0.5;
    const j = liste[ds.indexOf(grand ? 115 : 35)].s;
    return {
      text: tournure(["Voici trois angles.", "Regarde les trois angles.", "Observe ces trois angles."], grand ? ["Quel est le plus grand ?", "Lequel est le plus ouvert ?", "Trouve le plus ouvert."] : ["Quel est le plus petit ?", "Lequel est le moins ouvert ?", "Trouve le moins ouvert."]),
      ...qcm(`L’angle ${j}`, [a, b, c].map((s) => `L’angle ${s}`)),
      canvas: angles(liste),
      explanation: etapes(`on compare l’écart de chaque angle.`, `${grand ? "le plus grand écart" : "le plus petit écart"} est celui de ${j}.`, `c’est l’angle ${j}.`),
    };
  }),
  C(5, 2, "La longueur des côtés ne change pas l’angle.", () => {
    const a = un(LETTRES), v = un(["plus longs", "très longs", "deux fois plus longs", "plus courts", "très courts"]);
    return {
      text: tournure([`On trace l’angle ${a} avec des côtés ${v}.`, `Les côtés de l’angle ${a} deviennent ${v}.`, `On redessine l’angle ${a}, avec des côtés ${v}.`], ["L’angle change-t-il ?", "Que devient l’angle ?", "Sa mesure change-t-elle ?"]),
      ...qcm("L’angle reste le même", ["L’angle devient plus grand", "L’angle devient plus petit", "L’angle devient droit"]),
      explanation: etapes(`un angle, c’est l’écart entre les côtés.`, `changer la longueur ne change pas l’écart.`, `l’angle reste le même.`),
    };
  }),
  C(6, 2, "Compare l’écart avec celui de l’angle droit.", () => {
    const [d, s] = lettres(2);
    const plus = Math.random() < 0.5;
    const deg = plus ? 5 * entre(22, 30) : 5 * entre(6, 13);
    const liste = melange([{ s: d, deg: 90, L: 70, droit: true }, { s, deg, L: un([55, 100]) }]);
    return {
      text: tournure([`L’angle ${d} est droit.`, `Le petit carré de ${d} marque un angle droit.`, `Regarde : l’angle ${d} est droit.`], [`Comment est l’angle ${s} ?`, `Compare l’angle ${s} à l’angle droit.`, `Que dire de l’angle ${s} ?`]),
      ...qcm(plus ? "Plus grand que l’angle droit" : "Plus petit que l’angle droit", ["Plus grand que l’angle droit", "Plus petit que l’angle droit", "Égal à l’angle droit"]),
      canvas: angles(liste),
      explanation: etapes(`on compare l’écart avec celui de l’angle droit.`, `l’écart de ${s} est ${plus ? "plus grand" : "plus petit"}.`, `l’angle ${s} est ${plus ? "plus grand" : "plus petit"} que l’angle droit.`),
    };
  }),
  C(7, 3, HINT_C, () => {
    const [ctx] = un(OBJETS_C);
    const { liste, s1, s2 } = duo();
    const grand = Math.random() < 0.5;
    const j = grand ? s2 : s1;
    return {
      text: tournure([`${ctx}. On dessine leurs angles ${liste[0].s} et ${liste[1].s}.`], [grand ? "Quel angle est le plus ouvert ?" : "Quel angle est le moins ouvert ?", grand ? "Lequel a le plus grand écart ?" : "Lequel a le plus petit écart ?"]),
      ...qcm(`L’angle ${j}`, [`L’angle ${s1}`, `L’angle ${s2}`, "Ils sont égaux"]),
      canvas: angles(liste),
      explanation: etapes(`on regarde l’écart, pas la longueur.`, `l’écart de ${s2} est plus grand que celui de ${s1}.`, `c’est l’angle ${j}.`),
    };
  }),
  C(8, 3, "Un calque garde l’angle : on le pose sur l’autre.", () => {
    const qui = un(QUI_C);
    const [a, b] = lettres(2);
    return {
      text: tournure([`${qui} veut comparer les angles ${a} et ${b}.`], ["Il ne veut rien mesurer.", "Il n’a que du papier calque.", "Il cherche sans mesurer."], ["Que faire ?", "Quelle méthode convient ?", "Comment les comparer ?"]),
      ...qcm("Décalquer un angle et le poser sur l’autre", ["Mesurer la longueur des côtés", "Compter les lettres", "Prolonger un seul côté"]),
      explanation: etapes(`le calque garde l’écart de l’angle.`, `on pose le sommet sur ${b}, et un côté sur un côté.`, `on voit lequel dépasse.`),
    };
  }),
  C(9, 4, HINT_C, () => {
    const [a, b, c] = lettres(3);
    const ds = melange([35, 70, 115]);
    const ls = melange([55, 75, 100]);
    const liste = [a, b, c].map((s, i) => ({ s, deg: ds[i], L: ls[i] }));
    const tri = [...liste].sort((x, y) => x.deg - y.deg).map((x) => x.s);
    const per = (l: string[]) => `${l[0]} < ${l[1]} < ${l[2]}`;
    return {
      text: tournure(["Une élève range ces angles.", "Un défi : range ces trois angles.", "Un ingénieur compare trois pièces.", "Une charpentière compare trois coupes.", "Sami trie ces trois angles."], ["Quel rangement est juste ?", "Quel ordre va du plus petit au plus grand ?", "Quel est le bon ordre ?"]),
      ...qcm(per(tri), [per([tri[2], tri[1], tri[0]]), per([tri[1], tri[0], tri[2]]), per([tri[0], tri[2], tri[1]]), per([tri[1], tri[2], tri[0]])]),
      canvas: angles(liste),
      explanation: etapes(`on compare les écarts, pas les longueurs.`, `du plus petit écart au plus grand : ${tri.join(", ")}.`, `${per(tri)}.`),
    };
  }),
  C(10, 4, "On pose les deux angles sur le même sommet et le même côté.", () => {
    const [a, b] = lettres(2);
    const dedans = Math.random() < 0.5;
    const j = dedans ? b : a;
    const qui = un(QUI_C);
    return {
      text: tournure([`${qui} pose l’angle ${a} sur l’angle ${b}.`], ["Les sommets et un côté se superposent.", "Le sommet et un côté coïncident."], [dedans ? `L’autre côté de ${a} reste à l’intérieur de l’angle ${b}.` : `L’autre côté de ${a} sort de l’angle ${b}.`], ["Quel angle est le plus grand ?", "Lequel est le plus ouvert ?"]),
      ...qcm(`L’angle ${j}`, [`L’angle ${a}`, `L’angle ${b}`, "Ils sont égaux"]),
      explanation: etapes(`on regarde où tombe l’autre côté.`, dedans ? `il reste à l’intérieur de l’angle ${b}.` : `il sort de l’angle ${b}.`, `l’angle ${j} est le plus grand.`),
    };
  }),
];

/* ═════════════════ graphique_nuage_points ═════════════════ */
const U = atelier("cm1", "graphique", "graphique_nuage_points", "cm1_");
const HINT_U = "Horizontal : tu lis en bas. Vertical : tu lis à gauche.";
type Pt = { x: number; y: number; label: string };
function nuage(n = 5): { pts: Pt[]; fig: CanvasFigure } {
  const ls = lettres(n);
  for (;;) {
    const pts = ls.map((label) => ({ x: entre(1, 10), y: entre(1, 10), label }));
    const uniq = (f: (p: Pt) => number) => new Set(pts.map(f)).size === n;
    if (uniq((p) => p.x) && uniq((p) => p.y)) return { pts, fig: figNuage(pts) };
  }
}
const figNuage = (pts: Pt[]): CanvasFigure => ({ kind: "fonctionGraphique", size: { width: 340, height: 300 }, xmin: 0, xmax: 11, ymin: 0, ymax: 11, grille: true, points: pts.map((p) => ({ x: p.x, y: p.y, label: p.label })) }) as CanvasFigure;
const NUAGES: [string, string, string][] = [["Chaque point est une élève.", "heures de sommeil", "score au jeu"], ["Chaque point est un arbre.", "âge en années", "hauteur en mètres"], ["Chaque point est une sportive.", "heures d’entraînement", "médailles"], ["Chaque point est un magasin.", "vendeurs", "clients en dizaines"], ["Chaque point est une ville.", "jours de pluie", "jours de soleil"], ["Chaque point est un chat.", "âge en années", "masse en kilos"], ["Chaque point est un cycliste.", "jours de course", "crevaisons"], ["Chaque point est une ferme.", "vaches", "poules"], ["Chaque point est une classe.", "filles", "garçons"], ["Chaque point est un chien.", "âge en années", "masse en kilos"], ["Chaque point est une plante.", "semaines", "feuilles"], ["Chaque point est un livre.", "chapitres", "dessins"]];
const VAL_LIRE = ["Lis le graphique.", "Regarde le nuage de points.", "Observe les points.", ""];

const graphiqueNuage: TutorBankItemV4[] = [
  U(1, 1, HINT_U, () => {
    const { pts, fig } = nuage(); const p = un(pts);
    return {
      text: tournure(VAL_LIRE, [`Quelle est la valeur horizontale de ${p.label} ?`, `Quelle valeur lis-tu en bas pour ${p.label} ?`, `Pour le point ${p.label}, que lis-tu en bas ?`, `Quel nombre est sous le point ${p.label} ?`]),
      ...qcmN(p.x, [p.y, ...pts.map((o) => o.x), p.x + 1]),
      canvas: fig,
      explanation: etapes(`on descend du point ${p.label} jusqu’en bas.`, `on lit ${p.x}.`, `la valeur horizontale est ${p.x}.`),
    };
  }),
  U(2, 1, HINT_U, () => {
    const { pts, fig } = nuage(); const p = un(pts);
    return {
      text: tournure(VAL_LIRE, [`Quelle est la valeur verticale de ${p.label} ?`, `Quelle valeur lis-tu à gauche pour ${p.label} ?`, `Pour le point ${p.label}, que lis-tu à gauche ?`, `Quel nombre est à gauche du point ${p.label} ?`]),
      ...qcmN(p.y, [p.x, ...pts.map((o) => o.y), p.y + 1]),
      canvas: fig,
      explanation: etapes(`on va du point ${p.label} jusqu’à gauche.`, `on lit ${p.y}.`, `la valeur verticale est ${p.y}.`),
    };
  }),
  U(3, 1, "Le point le plus haut a la plus grande valeur verticale.", () => {
    const { pts, fig } = nuage();
    const haut = Math.random() < 0.5;
    const ys = pts.map((p) => p.y);
    const j = pts.find((p) => p.y === (haut ? Math.max(...ys) : Math.min(...ys)))!.label;
    return {
      text: tournure(VAL_LIRE, haut ? ["Quel point est le plus haut ?", "Lequel a la plus grande valeur verticale ?", "Trouve le point le plus haut."] : ["Quel point est le plus bas ?", "Lequel a la plus petite valeur verticale ?", "Trouve le point le plus bas."]),
      ...qcm(`Le point ${j}`, pts.map((p) => `Le point ${p.label}`)),
      canvas: fig,
      explanation: etapes(`on compare les hauteurs.`, `${j} a pour valeur verticale ${pts.find((p) => p.label === j)!.y}.`, `c’est le point ${j}.`),
    };
  }),
  U(4, 2, "Le point le plus à droite a la plus grande valeur horizontale.", () => {
    const { pts, fig } = nuage();
    const dr = Math.random() < 0.5;
    const xs = pts.map((p) => p.x);
    const j = pts.find((p) => p.x === (dr ? Math.max(...xs) : Math.min(...xs)))!.label;
    return {
      text: tournure(VAL_LIRE, dr ? ["Quel point est le plus à droite ?", "Lequel a la plus grande valeur horizontale ?", "Trouve le point le plus à droite."] : ["Quel point est le plus à gauche ?", "Lequel a la plus petite valeur horizontale ?", "Trouve le point le plus à gauche."]),
      ...qcm(`Le point ${j}`, pts.map((p) => `Le point ${p.label}`)),
      canvas: fig,
      explanation: etapes(`on compare les valeurs en bas.`, `${j} a pour valeur horizontale ${pts.find((p) => p.label === j)!.x}.`, `c’est le point ${j}.`),
    };
  }),
  U(5, 2, HINT_U, () => {
    const { pts, fig } = nuage(); const p = un(pts);
    return {
      text: tournure(["Regarde le nuage de points.", "Lis le graphique.", "Observe les points.", ""], [`Quel point a ${p.x} en bas et ${p.y} à gauche ?`, `Quel point est à ${p.x} en bas et à ${p.y} à gauche ?`, `En bas ${p.x}, à gauche ${p.y} : quel point est-ce ?`, `Trouve le point avec ${p.x} en bas et ${p.y} à gauche.`]),
      ...qcm(`Le point ${p.label}`, pts.map((o) => `Le point ${o.label}`)),
      canvas: fig,
      explanation: etapes(`on part de ${p.x} en bas, puis on monte jusqu’à ${p.y}.`, `on tombe sur ${p.label}.`, `c’est le point ${p.label}.`),
    };
  }),
  U(6, 2, "Trace une ligne à la hauteur de ce nombre, et compte les points au-dessus.", () => {
    const { pts, fig } = nuage();
    const s = entre(3, 7);
    const n = pts.filter((p) => p.y > s).length;
    return {
      text: tournure(VAL_LIRE, [`Combien de points sont au-dessus de ${s} ?`, `Combien de points ont une valeur verticale plus grande que ${s} ?`, `Compte les points plus hauts que ${s}.`]),
      ...qcm(fr(n), [0, 1, 2, 3, 4, 5].filter((v) => v !== n).map(fr)),
      canvas: fig,
      explanation: etapes(`on garde les valeurs à gauche plus grandes que ${s}.`, pts.filter((p) => p.y > s).map((p) => `${p.label} (${p.y})`).join(", ") || "aucun point", `il y en a ${n}.`),
    };
  }),
  U(7, 3, HINT_U, () => {
    const c = un(NUAGES); const { pts, fig } = nuage(); const p = un(pts);
    const v = Math.random() < 0.5;
    return {
      text: `${c[0]} En bas : ${c[1]}. À gauche : ${c[2]}. ${v ? `Que vaut « ${c[2]} » pour ${p.label} ?` : `Que vaut « ${c[1]} » pour ${p.label} ?`}`,
      ...qcmN(v ? p.y : p.x, [v ? p.x : p.y, ...pts.map((o) => (v ? o.y : o.x))]),
      canvas: fig,
      explanation: etapes(`on lit ${v ? "à gauche" : "en bas"}, pour le point ${p.label}.`, `on trouve ${v ? p.y : p.x}.`, `la valeur est ${v ? p.y : p.x}.`),
    };
  }),
  U(8, 3, "Le point le plus haut a la plus grande valeur à gauche.", () => {
    const c = un(NUAGES); const { pts, fig } = nuage();
    const v = Math.random() < 0.5;
    const vs = pts.map((p) => (v ? p.y : p.x));
    const j = pts[vs.indexOf(Math.max(...vs))].label;
    return {
      text: `${c[0]} En bas : ${c[1]}. À gauche : ${c[2]}. Quel point a la plus grande valeur pour : ${v ? c[2] : c[1]} ?`,
      ...qcm(`Le point ${j}`, pts.map((p) => `Le point ${p.label}`)),
      canvas: fig,
      explanation: etapes(`on lit ${v ? "à gauche" : "en bas"} pour chaque point.`, `la plus grande valeur est ${Math.max(...vs)}.`, `c’est le point ${j}.`),
    };
  }),
  U(9, 4, "Regarde si les points montent, descendent ou sont dispersés quand on va vers la droite.", () => {
    const c = un(NUAGES);
    const sens = un<"monte" | "descend">(["monte", "descend"]);
    const ls = lettres(6);
    const pts = ls.map((label, i) => {
      const x = 2 * i + 1;
      const y = sens === "monte" ? i * 2 + un([1, 2]) : 10 - i * 2 - un([0, 1]);
      return { x, y: Math.max(y, 1), label };
    });
    const J = "Plus la valeur en bas grandit, plus la valeur à gauche grandit";
    const K2 = "Plus la valeur en bas grandit, plus la valeur à gauche diminue";
    return {
      text: tournure([`${c[0]} En bas : ${c[1]}. À gauche : ${c[2]}.`], ["Quelle phrase décrit le nuage ?", "Que montre le nuage ?", "Quelle phrase est vraie ?"]),
      ...qcm(sens === "monte" ? J : K2, [J, K2, "Les valeurs restent toutes égales"]),
      canvas: figNuage(pts),
      explanation: etapes(`on suit les points de gauche à droite.`, sens === "monte" ? `ils montent.` : `ils descendent.`, sens === "monte" ? `${J.toLowerCase()}.` : `${K2.toLowerCase()}.`),
    };
  }),
  U(10, 4, "Vérifie les deux conditions pour chaque point.", () => {
    const c = un(NUAGES); const { pts, fig } = nuage(6);
    const a = entre(3, 6), b = entre(3, 6);
    const ok = pts.filter((p) => p.x > a && p.y > b);
    const n = ok.length;
    return {
      text: `${c[0]} En bas : ${c[1]}. À gauche : ${c[2]}. Combien de points ont plus de ${a} en bas et plus de ${b} à gauche ?`,
      ...qcm(fr(n), [0, 1, 2, 3, 4, 5, 6].filter((v) => v !== n).map(fr)),
      canvas: fig,
      explanation: etapes(`on vérifie les deux conditions.`, n ? ok.map((p) => `${p.label} (${p.x} ; ${p.y})`).join(", ") : "aucun point ne convient", `il y en a ${n}.`),
    };
  }),
];

export const geometrieTrousBank: TutorBankItemV4[] = [...figureCodage, ...cercleEnsemble, ...solidePrisme, ...graphiqueCourbe, ...angleNotation, ...angleComparer, ...graphiqueNuage];
