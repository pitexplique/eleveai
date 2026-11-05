// FIGURES : CODAGE, CERCLE, PROGRAMME DE CONSTRUCTION (05/11/2026). Trous du programme
// de CM2 : cm2-G-plane-3 (lire un codage), -6 (cercle = points à même distance),
// -11 (écrire et suivre un programme de construction).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";
import { entre, exp, fr, gabarits, melange, net, qcm, qcmN, un, v } from "./trous-outils";

const LETTRES = "ABCDEFGHJKLMNPRSTUVW".split("");

/* ───────────────────────── figure_codage ───────────────────────── */
const co = gabarits("figure_codage", "figure_plane", ["codage"]);
const triNoms = () => melange(LETTRES).slice(0, 3);
const expCodage = (t: string, c: string) => exp("sur une figure, un petit carré dit « angle droit » ; le même petit trait dit « même longueur ».", "on lit le codage, on ne fait pas confiance à l'œil.", t, c);
/** Triangle ABC : les coordonnées sont calculées pour que le codage soit vrai. */
const triangleIsocele = (noms: string[], base = 160, haut = 120, ext: Partial<CanvasFigure> = {}): CanvasFigure => ({
  kind: "triangle",
  points: { C: { x: 150, y: 30 }, A: { x: 150 - base / 2, y: 30 + haut }, B: { x: 150 + base / 2, y: 30 + haut } },
  labels: { C: noms[0], A: noms[1], B: noms[2] },
  marks: { equalSides: [["CA", "BC"]] },
  display: { showLabels: true, showPoints: true, showSides: true, showAngles: false },
  ...ext,
} as CanvasFigure);
const triangleRectangle = (noms: string[], l = 180, h = 110): CanvasFigure => ({
  kind: "triangle",
  points: { A: { x: 50, y: 30 + h }, B: { x: 50 + l, y: 30 + h }, C: { x: 50, y: 30 } },
  labels: { A: noms[0], B: noms[1], C: noms[2] },
  marks: { rightAngleAt: "A" },
  display: { showLabels: true, showPoints: true, showSides: true, showAngles: false },
} as CanvasFigure);
const triangleEquilateral = (noms: string[]): CanvasFigure => ({
  kind: "triangle",
  points: { C: { x: 150, y: 30 }, A: { x: 70, y: 30 + 139 }, B: { x: 230, y: 30 + 139 } },
  labels: { C: noms[0], A: noms[1], B: noms[2] },
  marks: { equalSides: [["AB", "BC"], ["BC", "CA"]] },
  display: { showLabels: true, showPoints: true, showSides: true, showAngles: false },
} as CanvasFigure);
const triangleRectIso = (noms: string[]): CanvasFigure => ({
  kind: "triangle",
  points: { A: { x: 60, y: 160 }, B: { x: 200, y: 160 }, C: { x: 60, y: 20 } },
  labels: { A: noms[0], B: noms[1], C: noms[2] },
  marks: { rightAngleAt: "A", equalSides: [["AB", "CA"]] },
  display: { showLabels: true, showPoints: true, showSides: true, showAngles: false },
} as CanvasFigure);
const quad = (genre: "carré" | "rectangle" | "losange", noms: string[], ext: Partial<CanvasFigure> = {}): CanvasFigure => {
  const points =
    genre === "carré" ? { A: { x: 70, y: 170 }, B: { x: 210, y: 170 }, C: { x: 210, y: 30 }, D: { x: 70, y: 30 } }
    : genre === "rectangle" ? { A: { x: 40, y: 150 }, B: { x: 260, y: 150 }, C: { x: 260, y: 40 }, D: { x: 40, y: 40 } }
    : { A: { x: 150, y: 30 }, B: { x: 250, y: 100 }, C: { x: 150, y: 170 }, D: { x: 50, y: 100 } };
  const marks =
    genre === "carré" ? { rightAnglesAt: ["A", "B", "C", "D"], equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]] }
    : genre === "rectangle" ? { rightAnglesAt: ["A", "B", "C", "D"] }
    : { equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]] };
  return { kind: "quadrilatere", points, labels: { A: noms[0], B: noms[1], C: noms[2], D: noms[3] }, marks, display: { showLabels: true, showPoints: true, showSides: true, showAngles: false }, ...ext } as CanvasFigure;
};
const LIS = ["Lis le codage.", "Regarde le codage.", "Observe les petits signes.", "Regarde les signes."];
const figureCodage: TutorBankItemV4[] = [
  co(1, "Le petit carré marque un coin bien droit.", () => {
    const C = un([
      { q: "Sur une figure, que veut dire un petit carré dans un coin ?", j: "Un angle droit" }, { q: "Un petit carré dans un coin, c'est quoi ?", j: "Un angle droit" }, { q: "Que signale un petit carré dans un angle ?", j: "Un angle droit" }, { q: "Quel signe montre un angle droit ?", j: "Un petit carré" }, { q: "Comment coder un angle droit sur une figure ?", j: "Un petit carré" },
      { q: "Deux côtés ont le même petit trait. Qu'est-ce que cela veut dire ?", j: "Ils ont la même longueur" }, { q: "Que veut dire le même petit trait sur deux côtés ?", j: "Ils ont la même longueur" }, { q: "Deux segments portent le même trait. Que sait-on ?", j: "Ils ont la même longueur" }, { q: "Comment coder deux côtés de même longueur ?", j: "Le même petit trait" }, { q: "Quel signe montre deux côtés égaux ?", j: "Le même petit trait" },
    ]);
    const fa = C.j === "Un petit carré" || C.j === "Le même petit trait" ? ["Un petit carré", "Le même petit trait", "Une flèche", "Un point"].filter((x) => x !== C.j) : ["Un angle droit", "Ils ont la même longueur", "Ils sont parallèles", "Un point au milieu"].filter((x) => x !== C.j);
    return qcm(C.j, fa, expCodage("petit carré = angle droit ; même petit trait = même longueur.", `la réponse est : ${C.j.toLowerCase()}.`), `${v(["", "Pense au codage.", "Souviens-toi du codage."])} ${C.q}`.trim());
  }),
  co(1, "Les côtés égaux portent le même petit trait.", () => {
    const n = triNoms();
    const [a, b, c] = n;
    return qcm(`[${a}${b}] et [${a}${c}]`, [`[${a}${b}] et [${b}${c}]`, `[${a}${c}] et [${b}${c}]`, `Tous les côtés`, `Aucun côté`], expCodage(`les côtés [${a}${b}] et [${a}${c}] portent le même trait.`, `[${a}${b}] et [${a}${c}] ont la même longueur.`), v(LIS, ["Quels côtés ont la même longueur ?", "Quels côtés sont égaux ?", "Quels sont les deux côtés égaux ?", "Quels côtés le codage dit-il égaux ?"]), triangleIsocele(n));
  }),
  co(1, "L'angle droit est là où se trouve le petit carré.", () => {
    const n = triNoms();
    const [a, b, c] = n;
    return qcm(`En ${a}`, [`En ${b}`, `En ${c}`, "Il n'y en a pas"], expCodage(`le petit carré est au point ${a}.`, `l'angle droit est en ${a}.`), v(["Lis le codage.", "Regarde le codage.", "Observe les petits signes.", "Cherche le petit carré."], ["Où est l'angle droit ?", "En quel point est l'angle droit ?", "Quel sommet a un angle droit ?", "Où se trouve le coin droit ?"]), triangleRectangle(n));
  }),
  co(2, "Regarde les angles droits, puis les côtés égaux.", () => {
    const g = un(["carré", "rectangle", "losange"] as const);
    const noms = melange(LETTRES).slice(0, 4);
    const j = { carré: "Un carré", rectangle: "Un rectangle", losange: "Un losange" }[g];
    const raison = { carré: "4 angles droits et 4 côtés égaux", rectangle: "4 angles droits", losange: "4 côtés égaux, sans angle droit" }[g];
    return qcm(j, ["Un carré", "Un rectangle", "Un losange", "Un triangle"].filter((x) => x !== j), expCodage(`le codage montre ${raison}.`, `c'est ${j.toLowerCase()}.`), v(LIS, ["Quelle est cette figure ?", "Quelle figure est-ce ?", "De quelle figure s'agit-il ?", "Quel est le nom de cette figure ?"]), quad(g, noms));
  }),
  co(2, "Compte les côtés égaux, et cherche un petit carré.", () => {
    const n = triNoms();
    const g = un(["iso", "rect", "equi", "rectIso"] as const);
    const fig = { iso: triangleIsocele(n), rect: triangleRectangle(n), equi: triangleEquilateral(n), rectIso: triangleRectIso(n) }[g];
    const j = { iso: "Isocèle", rect: "Rectangle", equi: "Équilatéral", rectIso: "Rectangle et isocèle" }[g];
    const raison = { iso: "2 côtés égaux", rect: "un angle droit", equi: "3 côtés égaux", rectIso: "un angle droit et 2 côtés égaux" }[g];
    return qcm(j, ["Isocèle", "Rectangle", "Équilatéral", "Rectangle et isocèle"].filter((x) => x !== j), expCodage(`le codage montre ${raison}.`, `ce triangle est ${j.toLowerCase()}.`), v(LIS, ["Comment est ce triangle ?", "Quelle sorte de triangle est-ce ?", "Quel est son type ?", "Quel mot décrit ce triangle ?"]), fig);
  }),
  co(2, "Le codage dit quel côté a la même longueur que celui qui est écrit.", () => {
    const n = triNoms();
    const [a, b, c] = n;
    const L = entre(3, 15);
    const fig = triangleIsocele(n);
    return qcmN(L, [L + 1, L - 1, L * 2, L + 2], expCodage(`[${a}${b}] et [${a}${c}] portent le même trait.`, `${a}${c} = ${L} cm.`), `${v(LIS)} [${a}${b}] mesure ${L} cm. ${v([`Quelle est la longueur de [${a}${c}] ?`, `Combien mesure [${a}${c}] ?`, `Que vaut ${a}${c} ?`, `Quelle longueur a le côté [${a}${c}] ?`])}`, fig, "cm");
  }),
  co(3, "Le codage donne les côtés égaux : ajoute les trois longueurs.", () => {
    const n = triNoms();
    const [a, b, c] = n;
    const L = entre(4, 15);
    const B = entre(3, 2 * L - 1 > 12 ? 12 : 2 * L - 1);
    const fig = triangleIsocele(n, 160, 120, { sideLabels: { AB: `${B} m` } } as any);
    const O = un(["La voile d'un bateau", "Un panneau de danger", "Le fronton d'une maison", "Une tente vue de face", "Une pointe de flèche sur un plan", "Le toit d'un chalet", "Une part de tarte géante", "Un fanion de plage"]);
    const P = 2 * L + B;
    return qcmN(P, [L + B, 2 * L, 3 * L, P + 1, 2 * B + L].filter((f) => f !== P), expCodage(`[${a}${b}] et [${a}${c}] ont la même longueur : ${L} m.`, `le tour mesure ${L} + ${L} + ${B} = ${P} m.`), `${O} a la forme de ce triangle. Le côté [${a}${b}] mesure ${L} m. ${v(["Quel est son périmètre ?", "Combien mesure son tour ?", "Quelle est la longueur de son tour ?"])}`, fig, "m");
  }),
  co(3, "Un carré a 4 côtés égaux ; un rectangle a ses côtés opposés égaux.", () => {
    const noms = melange(LETTRES).slice(0, 4);
    const g = un(["carré", "losange"] as const);
    const c = entre(3, 25);
    const O = un(["Un enclos", "Un jardin", "Une dalle", "Un bassin", "Un tapis", "Une cour", "Un mur de photos", "Un champ"]);
    const fig = quad(g, noms);
    return qcmN(4 * c, [2 * c, c * c, c + 4, 3 * c, 4 * c + 1].filter((f) => f !== 4 * c), expCodage("les 4 côtés portent le même trait.", `le tour mesure 4 × ${c} = ${4 * c} m.`), `${O} a cette forme. Le côté [${noms[0]}${noms[1]}] mesure ${c} m. ${v(["Quel est son périmètre ?", "Quelle longueur fait son tour ?", "Combien mesure son tour ?"])}`, fig, "m");
  }),
  co(3, "Seul le codage compte : un dessin peut tromper l'œil.", () => {
    const g = un(["carré", "rectangle", "losange"] as const);
    const noms = melange(LETTRES).slice(0, 4);
    const j = { carré: "Oui", rectangle: "Non", losange: "Non" }[g];
    const O = un(["Une élève", "Un architecte", "Une menuisière", "Un carreleur", "Une dessinatrice", "Un maçon", "Une géomètre", "Un paysagiste"]);
    return qcm(j, [j === "Oui" ? "Non" : "Oui"], expCodage(g === "carré" ? "le codage montre 4 angles droits et 4 côtés égaux." : g === "rectangle" ? "le codage montre les angles droits, mais pas 4 côtés égaux." : "le codage montre 4 côtés égaux, mais pas d'angle droit.", g === "carré" ? "c'est bien un carré." : "ce n'est pas un carré, d'après le codage."), `${O} ${v(["regarde ce plan", "lit ce plan", "observe cette figure"])}. ${v(["Le codage dit-il que c'est un carré ?", "Peut-on dire que c'est un carré, d'après le codage ?", "D'après le codage, est-ce un carré ?"])}`, quad(g, noms));
  }),
];

/* ───────────────────────── cercle_ensemble_points ───────────────────────── */
const ce = gabarits("cercle_ensemble_points", "figure_plane", ["cercle"]);
const expPos = (x: number, r: number, u: string) => exp("un cercle, c'est tous les points à la même distance du centre : le rayon.", "on compare la distance du point au rayon.", `${fr(x)} ${u} ${x === r ? "=" : x < r ? "<" : ">"} ${fr(r)} ${u}.`, x === r ? "le point est sur le cercle." : x < r ? "le point est à l'intérieur." : "le point est à l'extérieur.");
const POS = ["Sur le cercle", "À l'intérieur du cercle", "À l'extérieur du cercle"];
const juste = (x: number, r: number) => (x === r ? POS[0] : x < r ? POS[1] : POS[2]);
const tireX = (r: number) => un([r, r, entre(1, Math.max(1, r - 1)), r + entre(1, 4)]);
/** Une figure où seuls les points sont placés : leurs coordonnées sont calculées. */
function figureCercle(noms: string[], facteurs: number[]): CanvasFigure {
  const R = 80;
  const cx = 150;
  const cy = 110;
  // Le canvas écrit le nom en haut à droite du point : on écarte les places où il tomberait sur le trait ou hors du cadre.
  const lisible = (a: number, f: number) => {
    const x = f * R * Math.cos((a * Math.PI) / 180) + 16;
    const y = -f * R * Math.sin((a * Math.PI) / 180) - 15;
    // Ni collé au centre ni à son nom, écrit lui aussi en haut à droite.
    const loinDuCentre = Math.hypot(x, y) >= 26 && Math.hypot(x - 16, y + 15) >= 34;
    return Math.abs(Math.hypot(x, y) - R) >= 12 && cy + y >= 10 && cx + x <= 290 && loinDuCentre;
  };
  let angles = melange([20, 80, 140, 200, 260, 320]).slice(0, noms.length);
  for (let essai = 0; essai < 200 && !angles.every((a, i) => lisible(a, facteurs[i])); essai++) angles = melange([20, 80, 140, 200, 260, 320]).slice(0, noms.length);
  return {
    kind: "cercle",
    size: { width: 300, height: 220 },
    circle: { cx, cy, r: R, showCircle: true },
    points: [{ id: "O", x: cx, y: cy, label: "O" }, ...noms.map((n, i) => ({ id: n, x: cx + facteurs[i] * R * Math.cos((angles[i] * Math.PI) / 180), y: cy - facteurs[i] * R * Math.sin((angles[i] * Math.PI) / 180), label: n }))],
    display: { showLabels: true, showPoints: true, showCenter: true },
  } as CanvasFigure;
}
const CENTRE = ["", "Pense au rayon.", "Le centre s'appelle O.", "Compare au rayon."];
const cercleEnsemble: TutorBankItemV4[] = [
  ce(1, "Tous les points du cercle sont à la même distance du centre.", () => {
    const r = entre(2, 15);
    const [M] = melange(LETTRES.filter((l) => l !== "O"));
    return qcmN(r, [r * 2, r + 1, r - 1, net(r / 2), r + 2].filter((f) => f > 0), exp("tous les points du cercle sont à la même distance du centre.", "cette distance, c'est le rayon.", `O${M} = rayon = ${r} cm.`, `O${M} = ${r} cm.`), `${v(CENTRE)} ${v([`Un cercle a pour centre O et pour rayon ${r} cm.`, `Le cercle de centre O a un rayon de ${r} cm.`, `On trace un cercle de centre O et de rayon ${r} cm.`])} ${v([`Le point ${M} est sur le cercle.`, `${M} est un point du cercle.`])} ${v([`Combien mesure O${M} ?`, `Quelle est la longueur O${M} ?`, `Que vaut O${M} ?`])}`.trim(), undefined, "cm");
  }),
  ce(1, "Compare la distance au rayon.", () => {
    const r = entre(2, 12);
    const x = tireX(r);
    return qcm(juste(x, r), POS.filter((p) => p !== juste(x, r)), expPos(x, r, "cm"), `${v(CENTRE)} ${v([`Un cercle a un rayon de ${r} cm.`, `Le rayon du cercle est ${r} cm.`, `Le cercle a pour rayon ${r} cm.`])} ${v([`Un point est à ${x} cm du centre.`, `Un point se trouve à ${x} cm du centre.`, `La distance d'un point au centre est ${x} cm.`])} ${v(["Où est ce point ?", "Où se trouve-t-il ?", "Quelle est sa place ?"])}`.trim());
  }),
  ce(1, "Un seul point est exactement sur le trait du cercle.", () => {
    const noms = melange(LETTRES.filter((l) => l !== "O")).slice(0, 3);
    const fac = melange([1, 0.55, 1.3]);
    const j = noms[fac.indexOf(1)];
    return qcm(`Le point ${j}`, noms.filter((n) => n !== j).map((n) => `Le point ${n}`), exp("un point du cercle est à une distance du centre égale au rayon.", "on regarde quel point est sur le trait.", `${j} est sur le trait.`, `${j} est sur le cercle.`), v(["Regarde la figure.", "Voici un cercle de centre O.", "Observe ce cercle."], ["Quel point est sur le cercle ?", "Quel point est à la même distance de O que le rayon ?", "Lequel est sur le cercle ?", "Quel point appartient au cercle ?"]), figureCercle(noms, fac));
  }),
  ce(2, "Le diamètre, c'est deux rayons.", () => {
    const r = entre(2, 15);
    const inv = Math.random() < 0.5;
    const [A, B] = melange(LETTRES.filter((l) => l !== "O")).slice(0, 2);
    const q = inv ? r : r * 2;
    const f = inv ? [r * 2, r + 1, r * 4, r - 1] : [r, r + 2, r * 4, r * 2 + 1];
    return qcmN(q, f.filter((x) => x > 0), exp("le centre est le milieu de tout diamètre.", "un diamètre, c'est deux rayons.", inv ? `${r * 2} ÷ 2 = ${r}.` : `${r} × 2 = ${r * 2}.`, `la réponse est ${q} cm.`), inv ? `${v(CENTRE)} ${v([`[${A}${B}] est un diamètre de ${r * 2} cm.`, `Le diamètre [${A}${B}] mesure ${r * 2} cm.`])} ${v(["Quel est le rayon ?", `Combien mesure O${A} ?`, "Que vaut le rayon ?"])}`.trim() : `${v(CENTRE)} ${v([`Le rayon du cercle est ${r} cm.`, `Un cercle a un rayon de ${r} cm.`])} ${v(["Quel est son diamètre ?", `Combien mesure le diamètre [${A}${B}] ?`, "Que vaut le diamètre ?"])}`.trim(), undefined, "cm");
  }),
  ce(2, "« Exactement à » : le trait. « À moins de » : tout l'intérieur.", () => {
    const r = entre(2, 15);
    const dq = Math.random() < 0.5;
    return qcm(dq ? "Un disque" : "Un cercle", [dq ? "Un cercle" : "Un disque", "Un carré", "Un segment"], exp("le cercle, c'est le trait ; le disque, c'est le trait et tout l'intérieur.", dq ? "« à moins de » : tous les points de l'intérieur comptent." : "« exactement à » : seuls les points du trait comptent.", `distance ${dq ? "≤" : "="} ${r} cm.`, dq ? "cela forme un disque." : "cela forme un cercle."), `${v(CENTRE)} ${v(["On prend tous les points", "On colorie tous les points", "On cherche tous les points"])} ${dq ? "à moins de" : "exactement à"} ${r} cm de O. ${v(["Que forment-ils ?", "Quelle figure obtient-on ?", "Quelle est cette figure ?"])}`.trim());
  }),
  ce(2, "Dans le disque : à l'intérieur, sans être sur le trait.", () => {
    const noms = melange(LETTRES.filter((l) => l !== "O")).slice(0, 3);
    const fac = melange([0.55, 1, 1.3]);
    const j = noms[fac.indexOf(0.55)];
    return qcm(`Le point ${j}`, noms.filter((n) => n !== j).map((n) => `Le point ${n}`), exp("un point à l'intérieur est plus près du centre que le rayon.", "on regarde les points par rapport au trait.", `${j} est à l'intérieur.`, `${j} est le bon point.`), v(["Regarde la figure.", "Voici un cercle de centre O.", "Observe ce cercle."], ["Quel point est à l'intérieur du cercle ?", "Quel point est plus près de O que le rayon ?", "Lequel est à l'intérieur ?", "Quel point est dans le disque, sans être sur le trait ?"]), figureCercle(noms, fac));
  }),
  ce(3, "Compare la distance à la longueur de la corde (le rayon).", () => {
    const r = entre(2, 15);
    const x = un([entre(1, r), r + entre(1, 5)]);
    const peut = x <= r;
    const C = un([
      `Une chèvre est attachée à un piquet par une corde de ${r} m. De l'herbe pousse à ${x} m du piquet. La chèvre peut-elle la manger ?`, `Un arroseur touche tout à ${r} m autour de lui. Une fleur est à ${x} m de l'arroseur. Reçoit-elle de l'eau ?`, `Une lampe éclaire tout à ${r} m autour d'elle. Un livre est à ${x} m de la lampe. Est-il éclairé ?`, `Un émetteur radio porte à ${r} km. Un bateau est à ${x} km de l'émetteur. Reçoit-il le signal ?`,
      `Un phare se voit à ${r} km. Un voilier est à ${x} km du phare. Le voit-il ?`, `Un chien attaché à une laisse de ${r} m veut un os à ${x} m du poteau. Peut-il l'attraper ?`, `Une sirène s'entend à ${r} km. Une maison est à ${x} km de la sirène. L'entend-on dans la maison ?`, `Un drone télécommandé s'éloigne au plus de ${r} km. Un sommet est à ${x} km de la télécommande. Le drone peut-il l'atteindre ?`, `Une borne Wi-Fi porte à ${r} m. Un élève est à ${x} m de la borne. Reçoit-il le Wi-Fi ?`, `Une tortue pond dans un rayon de ${r} km autour de sa plage. Une crique est à ${x} km de la plage. Peut-elle y pondre ?`,
    ]);
    return qcm(peut ? "Oui" : "Non", [peut ? "Non" : "Oui"], exp("tout ce qui est atteint forme un disque, dont le rayon est la plus grande distance.", "on compare la distance au rayon.", `${x} ${x <= r ? "≤" : ">"} ${r}.`, x <= r ? "c'est à l'intérieur du disque (ou sur le bord)." : "c'est en dehors du disque."), C);
  }),
  ce(3, "Tous les points à la même distance d'un même point : un cercle.", () => {
    const r = entre(2, 15);
    const dq = Math.random() < 0.5;
    const C = dq
      ? un([`Une chèvre attachée par une corde de ${r} m broute tout ce qu'elle atteint.`, `Une lampe éclaire tout à moins de ${r} m.`, `Un arroseur mouille tout à moins de ${r} m.`, `Une alarme s'entend à moins de ${r} km.`, `Une flaque s'étale à moins de ${r} m du centre.`])
      : un([`Une chèvre, sa corde de ${r} m bien tendue, tourne autour du piquet et marque l'herbe.`, `Un compas ouvert de ${r} cm trace un trait autour de sa pointe.`, `Un cheval, tenu par une longe de ${r} m bien tendue, marche en tournant.`, `Une barrière est posée exactement à ${r} m d'un arbre, tout autour.`, `Un tracteur tourne en restant à ${r} m du poteau.`]);
    return qcm(dq ? "Un disque" : "Un cercle", [dq ? "Un cercle" : "Un disque", "Un carré", "Un rectangle"], exp("le cercle, c'est le trait ; le disque, c'est le trait et tout l'intérieur.", dq ? "tous les points à l'intérieur comptent." : "seuls les points à la distance exacte comptent.", `rayon ${r}.`, dq ? "la zone est un disque." : "la trace est un cercle."), `${C} ${v(["Quelle figure obtient-on ?", "Quelle est cette forme ?", "Quelle forme apparaît ?"])}`);
  }),
  ce(3, "Le plus loin, c'est à l'opposé : le diamètre.", () => {
    const r = entre(2, 20);
    const C = un([`Deux chèvres sont attachées au même piquet par une corde de ${r} m`, `Deux chiens sont attachés au même poteau par une laisse de ${r} m`, `Deux chevaux tournent autour d'un même arbre, tenus par une longe de ${r} m`, `Deux satellites tournent autour d'un même point à ${r} km`, `Deux robots s'éloignent au plus de ${r} m d'une même borne`, `Deux enfants s'éloignent au plus de ${r} m de la même balançoire`, `Deux parachutistes atterrissent à ${r} km au plus de la même cible`, `Deux bateaux restent à ${r} km au plus du même phare`]);
    return qcmN(2 * r, [r, r + 2, r * 4, 2 * r + 1, 2 * r - 1].filter((f) => f > 0 && f !== 2 * r), exp("deux points d'un disque sont le plus loin possible aux deux bouts d'un diamètre.", "un diamètre, c'est deux rayons.", `${r} × 2 = ${2 * r}.`, `au plus ${2 * r}.`), `${C}. ${v(["Quelle distance au maximum entre eux ?", "À quelle distance peuvent-ils être, au plus ?", "Quelle est la plus grande distance entre eux ?"])}`, undefined, /km/.test(C) ? "km" : "m");
  }),
];

/* ───────────────────────── figure_programme_construction ───────────────────────── */
const pr = gabarits("figure_programme_construction", "figure_plane", ["construction"]);
/** Un programme : chaque étape a besoin de la précédente. */
const programmes = (L: () => string[]) => {
  const [a, b, c, d] = L();
  const x = entre(3, 9);
  const y = entre(2, 9);
  return un([
    { nom: "rectangle", etapes: [`Trace un segment [${a}${b}] de ${x + 2} cm.`, `Trace la perpendiculaire à [${a}${b}] passant par ${b}.`, `Place ${c} sur cette droite, à ${y} cm de ${b}.`, `Trace la perpendiculaire à [${b}${c}] passant par ${c}.`] },
    { nom: "triangle", etapes: [`Trace un segment [${a}${b}] de ${x + 2} cm.`, `Trace deux cercles, de centres ${a} et ${b}, de rayons ${x} cm et ${y + 1} cm.`, `Place ${c} à un point commun aux deux cercles.`, `Trace [${a}${c}] et [${b}${c}].`] },
    { nom: "cercle", etapes: [`Place un point ${a}.`, `Trace un cercle de centre ${a} et de rayon ${x} cm.`, `Place ${b} sur le cercle.`, `Trace le rayon [${a}${b}].`] },
    { nom: "milieu", etapes: [`Trace un segment [${a}${b}] de ${2 * x} cm.`, `Place ${c} au milieu de [${a}${b}].`, `Trace un cercle de centre ${c} qui passe par ${a}.`, `Place ${d} sur le cercle.`] },
    { nom: "carré", etapes: [`Trace un segment [${a}${b}] de ${x} cm.`, `Trace la perpendiculaire à [${a}${b}] passant par ${a}.`, `Place ${d} sur cette droite, à ${x} cm de ${a}.`, `Trace la parallèle à [${a}${b}] passant par ${d}.`] },
    { nom: "parallèle", etapes: [`Trace une droite passant par ${a} et ${b}.`, `Place ${c} en dehors de la droite (${a}${b}).`, `Trace la parallèle à (${a}${b}) passant par ${c}.`, `Place ${d} sur cette parallèle.`] },
  ]);
};
const lettres = () => melange(LETTRES).slice(0, 4);
const expPr = (l: string[]) => exp("un programme de construction se suit dans l'ordre.", "une étape n'utilise que des points déjà tracés.", l.join(" "), "on suit les étapes l'une après l'autre.");
const figureProgramme: TutorBankItemV4[] = [
  pr(1, "Quelle étape n'a besoin d'aucun autre point ?", () => {
    const p = programmes(lettres);
    const l = p.etapes.slice(0, 3);
    return qcm(l[0], l.slice(1), expPr(l), v(["", "Regarde les points utilisés.", "On ne peut pas utiliser un point pas encore tracé."], ["Par quelle étape commencer ?", "Quelle est la première étape ?", "Quelle étape vient en premier ?", "Que fait-on d'abord ?"]) + `\n\n` + melange(l).map((e) => `• ${e}`).join("\n"));
  }),
  pr(1, "Une étape ne peut utiliser que ce qui est déjà tracé.", () => {
    const p = programmes(lettres);
    const l = p.etapes.slice(0, 3);
    return qcm(l[2], l.slice(0, 2), expPr(l), v(["", "Regarde les points utilisés.", "Cherche ce qui est tracé en dernier."], ["Quelle étape vient en dernier ?", "Quelle est la dernière étape ?", "Que fait-on à la fin ?", "Par quelle étape finir ?"]) + `\n\n` + melange(l).map((e) => `• ${e}`).join("\n"));
  }),
  pr(1, "Regarde ce qui a déjà été tracé : quelle étape peut venir ?", () => {
    const p = programmes(lettres);
    const l = p.etapes.slice(0, 3);
    return qcm(l[1], [l[2], "Rien : le programme est fini"], expPr(l), `${l[0]} ${v(["Que peut-on faire ensuite ?", "Quelle est l'étape suivante ?", "Et maintenant, que faire ?", "Quelle étape vient après ?"])}`);
  }),
  pr(2, "Le premier numéro est l'étape sans dépendance.", () => {
    const p = programmes(lettres);
    const l = p.etapes.slice(0, 3);
    const ord = un([[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]);
    // Les étapes écrites dans le désordre : ord[i] est la place de l'étape i dans la liste.
    const ecrit: string[] = [];
    ord.forEach((pos, i) => { ecrit[pos] = l[i]; });
    const bon = ord.map((pos) => pos + 1).join(", ");
    const tous = ["1, 2, 3", "1, 3, 2", "2, 1, 3", "2, 3, 1", "3, 1, 2", "3, 2, 1"].filter((x) => x !== bon);
    return qcm(bon, melange(tous).slice(0, 3), expPr(l), `${v(["Remets ces étapes dans l'ordre.", "Dans quel ordre faire ces étapes ?", "Quel est le bon ordre ?", "Dans quel ordre tracer ?"])}\n\n${ecrit.map((e, i) => `${i + 1}. ${e}`).join("\n")}`);
  }),
  pr(2, "L'étape qui manque doit créer ce que la suite utilise.", () => {
    const p = programmes(lettres);
    const l = p.etapes;
    const juste_ = l[1];
    const [x, y] = melange(LETTRES.filter((t) => !l.join(" ").includes(t))).slice(0, 2);
    return qcm(juste_, [`Trace un segment [${x}${y}] de 5 cm.`, `Place ${x} au milieu de [${x}${y}].`, `Trace un cercle de centre ${y} et de rayon 3 cm.`], expPr(l), `${v(["Une étape a été effacée.", "Il manque une étape.", "Le programme a un trou."])}\n\n• ${l[0]}\n• …\n• ${l[2]}\n\n${v(["Quelle étape manque ?", "Que faut-il écrire à la place des points ?", "Quelle phrase faut-il ajouter ?"])}`);
  }),
  pr(2, "Suis le programme : les longueurs et les angles te disent la figure.", () => {
    const [a, b, c] = lettres();
    const x = entre(3, 9);
    const y = un([x, x + entre(1, 3)]);
    const j = x === y ? "Un carré" : "Un rectangle";
    return qcm(j, ["Un carré", "Un rectangle", "Un triangle", "Un cercle"].filter((t) => t !== j), exp("on regarde les angles et les longueurs du programme.", "quatre angles droits : c'est un rectangle ; si en plus les côtés sont égaux, c'est un carré.", `côtés de ${x} cm et ${y} cm.`, `on obtient ${j.toLowerCase()}.`), `${v(["On suit ce programme.", "Voici un programme.", "Lis ce programme."])}\n\n• Trace un segment [${a}${b}] de ${x} cm.\n• Trace la perpendiculaire à [${a}${b}] passant par ${b}.\n• Place ${c} à ${y} cm de ${b}, sur cette droite.\n• Termine la figure avec quatre angles droits.\n\n${v(["Quelle figure obtient-on ?", "Que trace-t-on ?", "Quelle figure apparaît ?"])}`);
  }),
  pr(3, "Une construction se fait étape par étape, même pour un vrai plan.", () => {
    const p = programmes(lettres);
    const l = p.etapes.slice(0, 3);
    const P = un(["Une architecte", "Un géomètre", "Une dessinatrice", "Un menuisier", "Une ingénieure", "Un paysagiste", "Une carreleuse", "Un charpentier", "Une élève", "Un graphiste"]);
    return qcm(l[0], l.slice(1), expPr(l), `${P} ${v(["prépare un plan", "commence un dessin", "se lance dans un tracé"])}. ${v(["Quelle étape doit venir d'abord ?", "Par quelle étape commencer ?", "Que doit-on tracer en premier ?"])}\n\n${melange(l).map((e) => `• ${e}`).join("\n")}`);
  }),
  pr(3, "Trace le segment, le cercle, puis le point commun.", () => {
    const [a, b, c] = lettres();
    const x = entre(4, 9);
    const O = un(["Un charpentier trace un toit", "Une couturière dessine un fanion", "Un graphiste dessine un logo", "Une élève dessine une voile", "Un ingénieur dessine un pont", "Une maçonne prépare un fronton", "Un artiste trace une pyramide", "Une architecte trace un pignon"]);
    return qcm(`Le point ${c}`, [`Le point ${a}`, `Le point ${b}`], exp("le troisième sommet est à la bonne distance de chacun des deux autres.", "le cercle de centre " + a + " donne tous les points à la bonne distance de " + a + ".", `on cherche le point commun aux deux cercles.`, `le troisième sommet est ${c}.`), `${O}. ${v(["Le côté", "La base"])} [${a}${b}] ${v(["mesure", "fait"])} ${x} cm. ${v(["On trace deux cercles, de centres", "Deux cercles sont tracés, de centres"])} ${a} et ${b}. ${c} est un point commun aux deux cercles. ${v(["Quel point est le troisième sommet ?", "Quel point complète le triangle ?", "Quel est le troisième sommet ?"])}`);
  }),
  pr(3, "Une perpendiculaire, c'est un angle droit : suis le programme pour trouver la figure.", () => {
    const [a, b, c] = lettres();
    const x = entre(4, 9);
    const y = un([x, x + entre(1, 3)]);
    const j = x === y ? "Un carré" : "Un rectangle";
    const O = un(["Un maçon trace une dalle", "Une jardinière trace un potager", "Un menuisier trace une table", "Une artiste trace un cadre", "Un peintre trace un mur", "Une élève trace une cour", "Un carreleur trace une terrasse", "Une architecte trace une pièce"]);
    return qcm(j, ["Un carré", "Un rectangle", "Un losange", "Un cercle"].filter((t) => t !== j), exp("on regarde les angles et les longueurs du programme.", "quatre angles droits : c'est un rectangle ; si en plus les côtés sont égaux, c'est un carré.", `côtés de ${x} m et ${y} m.`, `on obtient ${j.toLowerCase()}.`), `${O}. ${v(["Le côté", "Un bord"])} [${a}${b}] ${v(["mesure", "fait"])} ${x} m. ${v(["Le côté", "Un autre bord"])} [${b}${c}], ${v(["perpendiculaire", "à angle droit"])}, ${v(["mesure", "fait"])} ${y} m. Les quatre angles sont droits. ${v(["Quelle figure obtient-on ?", "Quelle est cette forme ?", "Quelle figure trace-t-on ?"])}`);
  }),
];

export const figuresCodageBank: TutorBankItemV4[] = [
  ...figureCodage,
  ...cercleEnsemble,
  ...figureProgramme,
];
