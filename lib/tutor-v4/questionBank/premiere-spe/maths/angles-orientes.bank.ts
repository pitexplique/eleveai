// ANGLES ORIENTÉS (06/11/2026) : mesure principale, congruences, relation de Chasles, angles de vecteurs
// sur une figure. Hors programme français (registre `hors_france`) : ils en sont sortis en 2019.
// Lignes visées : Maroc TC V-2, Sénégal 2nde AG 4 et 1re GE 3, Côte d'Ivoire 2nde C3-L4 et 1re C3-L2.
// ⛔ Ne double pas `trig_grand_reel` (cosinus et sinus d'un grand réel) : ici, c'est l'ANGLE qu'on mesure.
// Figures : `construction`, sens direct réel (y vers le haut), angles calculés depuis les points.

import { figureConstruction, polygoneRegulier, type P } from "@/lib/canvas/construction";
import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, melange, phrase, qcm, un } from "../../lycee-commun";
import { F, ajoute, enonce, fois, oppose, piL, principal, retire, type Fr } from "./trigo-pi-commun";

const tpl = fabrique("premiere-spe", "angles_orientes", "1s_");
const M1 = "angle_oriente_mesure_principale";
const M2 = "angle_oriente_chasles";

const IP = "\\left]-\\pi\\,;\\pi\\right]";
const CERCLE: CanvasFigure = { kind: "cercle_trigo", reperes: "tous" } as CanvasFigure;
const R: Fr[] = [[1, 6], [1, 4], [1, 3], [1, 2], [2, 3], [3, 4], [5, 6], [1, 5], [2, 5], [3, 5], [4, 5], [1, 8], [3, 8], [5, 8], [7, 8]].flatMap(([n, d]) => [F(n, d), F(-n, d)]);
const RS = [F(1), ...R];
const ang = (u: string, v: string) => `\\left(${u}, ${v}\\right)`;
const V = (a: string, b: string) => `\\overrightarrow{${a}${b}}`;
const W = (l: string) => `\\vec{${l}}`;
const dM = (x: Fr) => `$${piL(x)}$`;
const distincts = (v: Fr, l: Fr[]) => [...new Set(l.filter((x) => piL(x) !== piL(v)).map(dM))];
/** Des pièges dans ]−π ; π], tous différents de la bonne mesure ; `raw` : une mesure juste mais hors de l'intervalle. */
const pieges = (v: Fr, raw?: Fr) =>
  distincts(v, [
    oppose(v),
    principal(ajoute(v, F(1))),
    principal(retire(F(1), v)),
    // Même dénominateur que la bonne réponse : un piège en π/15 se repère sans calcul.
    ...(v.d === 1 ? [F(1, 2), F(-1, 2), F(1, 3)] : [principal(ajoute(v, F(1, v.d))), principal(retire(v, F(1, v.d))), principal(ajoute(v, F(2, v.d))), principal(retire(v, F(2, v.d)))]),
    ...(raw ? [raw] : []),
  ]);
const DEF_P = "la mesure principale d'un angle orienté est sa seule mesure dans $]-\\pi\\,;\\pi]$.";
const MET_P = "on ajoute ou on retire des tours complets, c'est-à-dire des multiples de $2\\pi$, jusqu'à entrer dans l'intervalle.";

/* ───────────── mesure principale : énoncés ───────────── */

const D_MES = ["Un angle orienté a pour mesure :", "Une mesure d'un angle de deux vecteurs est :", "On connaît une mesure d'un angle orienté :", "L'angle orienté de deux demi-droites a pour mesure :", "Voici une mesure de l'angle $\\left(\\vec{u}, \\vec{v}\\right)$ :", "Un angle orienté est donné par cette mesure :"];
const F_MES = ["Quelle est sa mesure principale ?", "Donne sa mesure principale.", "Parmi ces valeurs, laquelle est sa mesure principale ?", `Quelle mesure de cet angle appartient à $${IP}$ ?`, "Trouve sa mesure principale.", "Que vaut sa mesure principale ?"];

const SENS = ["direct", "indirect"] as const;
const FRACS: [string, number, number][] = [["un quart", 1, 4], ["un tiers", 1, 3], ["un sixième", 1, 6], ["un huitième", 1, 8], ["trois quarts", 3, 4], ["deux tiers", 2, 3], ["cinq sixièmes", 5, 6]];
const SUJETS = [
  "Une patineuse tourne sur elle-même de",
  "Le plateau d'un tour de potier tourne de",
  "Une pale d'éolienne effectue",
  "Une platine de disque effectue",
  "Une toupie effectue",
  "Une danseuse enchaîne, sur une jambe,",
  "Une foreuse de chantier effectue",
  "Le bras d'un robot de soudure pivote de",
  "Un plongeur effectue en vol",
  "Une gymnaste à la barre fixe effectue",
  "Une roue de vélo tourne de",
  "L'hélice d'un drone effectue",
  "La nacelle d'une grande roue parcourt",
  "Un satellite parcourt sur son orbite",
  "Le tambour d'une machine à laver effectue",
];

/* ───────────── figures ───────────── */

type Fig = { nomFig: string; canvas: CanvasFigure; pts: Record<string, P> };
const NOMS3 = ["ABC", "EFG", "MNP", "RST", "IJK", "UVW", "DEF", "KLM"];
const NOMS4 = ["ABCD", "EFGH", "MNPQ", "RSTU", "IJKL"];
const NOMS6 = ["ABCDEF", "MNPQRS", "GHIJKL"];

function regulier(): Fig {
  const type = un(["tri", "tri", "car", "car", "hex"]);
  const rot = un([0, 15, 30, 45, 60, 90, 105, 120]);
  const noms = (type === "tri" ? un(NOMS3) : type === "car" ? un(NOMS4) : un(NOMS6)).split("");
  const sommets = polygoneRegulier(noms.length, 4, rot);
  const pts = Object.fromEntries(noms.map((n, i) => [n, sommets[i]]));
  const c = noms.join("");
  const nomFig =
    type === "tri"
      ? un([`Le triangle $${c}$ est équilatéral et de sens direct.`, `$${c}$ est un triangle équilatéral de sens direct.`, `On considère un triangle équilatéral direct $${c}$.`])
      : type === "car"
        ? un([`$${c}$ est un carré de sens direct.`, `Le carré $${c}$ est tracé dans le sens direct.`, `On considère un carré direct $${c}$.`])
        : un([`$${c}$ est un hexagone régulier de sens direct.`, `L'hexagone régulier $${c}$ est tracé dans le sens direct.`, `On considère un hexagone régulier direct $${c}$.`]);
  const canvas = figureConstruction(pts, {
    polygones: [{ sommets: noms, fond: "#eff6ff", contour: "#2563eb" }],
    segments: noms.map((n, i) => ({ a: n, b: noms[(i + 1) % noms.length], code: 1 })),
    largeur: 280,
    hauteurMax: 240,
    description: nomFig.replace(/\$/g, ""),
  }) as CanvasFigure;
  return { nomFig, canvas, pts };
}
/** Carré + triangle équilatéral intérieur ; carré + son centre ; hexagone + son centre. */
function composee(): Fig & { vecteurs: [string, string][] } {
  const t = un(["carTri", "carTri", "hexO", "carO"]);
  const rot = un([0, 15, 30, 45, 60, 90]);
  const cos = (d: number) => Math.cos((d * Math.PI) / 180);
  const sin = (d: number) => Math.sin((d * Math.PI) / 180);
  if (t === "carTri") {
    const [A, B, C, D, E] = un(["ABCDE", "MNPQR", "EFGHK", "RSTUV"]).split("");
    const u = { x: 4 * cos(rot), y: 4 * sin(rot) };
    const v = { x: -u.y, y: u.x };
    const pts: Record<string, P> = { [A]: { x: 0, y: 0 }, [B]: u, [C]: { x: u.x + v.x, y: u.y + v.y }, [D]: v, [E]: { x: 4 * cos(rot + 60), y: 4 * sin(rot + 60) } };
    const canvas = figureConstruction(pts, {
      polygones: [{ sommets: [A, B, C, D], fond: "#eff6ff", contour: "#2563eb" }, { sommets: [A, B, E], fond: "#fef3c7", contour: "#d97706" }],
      segments: [{ a: A, b: B, code: 1 }, { a: A, b: E, code: 1 }, { a: B, b: E, code: 1 }],
      largeur: 280,
      hauteurMax: 260,
      description: "Un carré et un triangle équilatéral construit sur un côté, à l'intérieur du carré.",
    }) as CanvasFigure;
    return {
      nomFig: `$${A}${B}${C}${D}$ est un carré de sens direct, et $${A}${B}${E}$ un triangle équilatéral de sens direct, tracé à l'intérieur du carré.`,
      canvas,
      pts,
      vecteurs: [[A, B], [A, E], [A, C], [A, D], [B, E], [B, C], [B, D], [E, A], [E, B], [D, B], [C, A]],
    };
  }
  const n = t === "hexO" ? 6 : 4;
  const noms = (n === 6 ? un(NOMS6) : un(NOMS4)).split("");
  const O = "O";
  const reg = polygoneRegulier(n, 4, rot);
  const pts: Record<string, P> = { ...Object.fromEntries(noms.map((x, i) => [x, reg[i]])), [O]: { x: 0, y: 0 } };
  const canvas = figureConstruction(pts, {
    polygones: [{ sommets: noms, fond: "#eff6ff", contour: "#2563eb" }],
    segments: noms.map((x) => ({ a: O, b: x, pointille: true })),
    largeur: 280,
    hauteurMax: 240,
    description: "Un polygone régulier et son centre O.",
  }) as CanvasFigure;
  const vecteurs: [string, string][] = [];
  for (const x of noms) vecteurs.push([O, x], [x, O]);
  for (let i = 0; i < n; i++) vecteurs.push([noms[i], noms[(i + 1) % n]]);
  return { nomFig: n === 6 ? `$${noms.join("")}$ est un hexagone régulier de sens direct, de centre $O$.` : `$${noms.join("")}$ est un carré de sens direct, de centre $O$.`, canvas, pts, vecteurs };
}
/** L'angle du vecteur ab vers le vecteur cd, lu sur la figure, en multiples de π/12. */
function mesureFig(pts: Record<string, P>, a: string, b: string, c: string, d: string): Fr {
  const t1 = Math.atan2(pts[b].y - pts[a].y, pts[b].x - pts[a].x);
  const t2 = Math.atan2(pts[d].y - pts[c].y, pts[d].x - pts[c].x);
  return principal(F(Math.round(((t2 - t1) / Math.PI) * 12), 12));
}
const F_FIG = ["Quelle est la mesure principale de cet angle orienté ?", "Donne la mesure principale de cet angle orienté.", "Lis la figure : que vaut la mesure principale de cet angle ?", "Combien mesure cet angle orienté, en mesure principale ?", "Trouve sa mesure principale, en tenant compte du sens."];
const D_FIG = ["On s'intéresse à l'angle orienté :", "On regarde l'angle de vecteurs :", "Considère l'angle orienté :", "Voici un angle de deux vecteurs :"];

/* ───────────── suite de vecteurs ───────────── */

const LETTRES = ["uvw", "abc", "mnp", "rst"];
function triple(): [string, string, string] {
  if (Math.random() < 0.5) {
    const [x, y, z] = un(LETTRES).split("");
    return [W(x), W(y), W(z)];
  }
  const o = un(["A", "O", "M", "E", "K"]);
  const [x, y, z] = un(["BCD", "PQR", "STU", "FGH", "IJL"]).split("");
  return [V(o, x), V(o, y), V(o, z)];
}
const D_CH = ["On sait que :", "On donne deux angles orientés :", "Deux mesures sont connues :", "Voici deux angles de vecteurs :", "On a mesuré :"];
const F_CH = ["Quelle est la mesure principale de :", "Déduis-en la mesure principale de :", "Par la relation de Chasles, quelle est la mesure principale de :", "Donne alors la mesure principale de :"];
const CHASLES = "pour trois vecteurs non nuls, $\\left(\\vec{u}, \\vec{v}\\right) + \\left(\\vec{v}, \\vec{w}\\right) = \\left(\\vec{u}, \\vec{w}\\right)$ à $2\\pi$ près.";
const QUI_TOURNE = [
  "Un rover d'exploration avance tout droit, puis",
  "Un robot aspirateur suit un mur, puis",
  "Un drone de livraison vole en ligne droite, puis",
  "Un kayak file droit devant, puis",
  "Une tortue de programmation avance, puis",
  "Une skieuse descend en ligne droite, puis",
  "Un voilier navigue cap fixe, puis",
  "Un chariot d'entrepôt roule tout droit, puis",
  "Une randonneuse suit un sentier rectiligne, puis",
  "Un avion de ligne suit sa route, puis",
  "Un chien de berger court tout droit, puis",
  "Une coureuse d'orientation court en ligne droite, puis",
];

function chasles3(x: string, y: string, z: string, a: Fr, b: Fr) {
  const brut = ajoute(a, b);
  const r = principal(brut);
  return qcm(
    `${un(D_CH)}\n\n$${ang(x, y)} = ${piL(a)}$\n\n$${ang(y, z)} = ${piL(b)}$\n\n${un(F_CH)}\n\n$${ang(x, z)}$`,
    dM(r),
    [...pieges(r, piL(brut) === piL(r) ? undefined : brut), dM(principal(retire(a, b)))].filter((c) => c !== dM(r)),
    expl(CHASLES, "on ajoute les deux mesures, puis on ramène la somme dans $]-\\pi\\,;\\pi]$.", `$${piL(a)} ${b.n < 0 ? "-" : "+"} ${piL(F(Math.abs(b.n), b.d))} = ${piL(brut)}$.`, `la mesure principale est $${piL(r)}$.`),
  );
}

export const anglesOrientesBank: TutorBankItemV4[] = [
  /* ═══════════ mesure principale ═══════════ */
  tpl(M1, 1, 1, "Retire ou ajoute un tour complet, soit 2π, pour entrer dans ]−π ; π].", () => {
    const r = un(RS);
    const m = ajoute(r, F(un([2, -2])));
    return qcm(enonce(un(D_MES), piL(m), un(F_MES)), dM(r), pieges(r, m), expl(DEF_P, MET_P, `$${piL(m)}$ et $${piL(r)}$ diffèrent d'un multiple de $2\\pi$.`, `la mesure principale est $${piL(r)}$.`), CERCLE);
  }),
  tpl(M1, 2, 1, "Deux mesures d'un même angle diffèrent d'un multiple de 2π.", () => {
    const r = un(R);
    const k = un([2, -2, 4, -4]);
    const juste = dM(ajoute(r, F(k)));
    return qcm(
      enonce(un(["Un angle orienté a pour mesure principale :", "La mesure principale d'un angle de vecteurs est :", "Un angle orienté mesure, en mesure principale :", "On connaît la mesure principale d'un angle orienté :"]), piL(r), un(["Laquelle de ces valeurs est aussi une mesure de cet angle ?", "Quelle autre mesure peut-on donner à cet angle ?", "Quelle valeur désigne encore le même angle orienté ?", "Parmi ces réels, lequel mesure encore cet angle ?", "Laquelle de ces mesures convient aussi ?"])),
      juste,
      [ajoute(r, F(1)), oppose(r), retire(F(1), r), ajoute(r, F(3)), ajoute(oppose(r), F(2)), ajoute(r, F(1, 2))].filter((x) => !Number.isInteger((x.n / x.d - r.n / r.d) / 2 + 0)).map(dM),
      expl("un angle orienté a une infinité de mesures, qui diffèrent toutes d'un multiple de $2\\pi$.", "on cherche la valeur égale à la mesure donnée plus un nombre entier de tours.", `$${piL(ajoute(r, F(k)))} = ${piL(r)} ${k < 0 ? "-" : "+"} ${Math.abs(k)}\\pi$.`, `la bonne valeur est ${juste}.`),
    );
  }),
  tpl(M1, 3, 1, "La mesure principale est dans ]−π ; π] : π en fait partie, −π non.", () => {
    const j = un(RS);
    const faux = [ajoute(j, F(2)), retire(j, F(2)), F(-1), F(3, 2), F(-3, 2), F(5, 4), F(-7, 6), F(5, 3), F(-4, 3), F(9, 8)].filter((x) => x.n / x.d > 1 || x.n / x.d <= -1);
    return qcm(
      phrase(["Une mesure principale appartient à l'intervalle $\\left]-\\pi\\,;\\pi\\right]$.", "On rappelle qu'une mesure principale est dans $\\left]-\\pi\\,;\\pi\\right]$.", "Une mesure principale vaut au plus $\\pi$ et strictement plus que $-\\pi$.", "L'intervalle des mesures principales est $\\left]-\\pi\\,;\\pi\\right]$."], ["Laquelle de ces valeurs peut être une mesure principale ?", "Quelle valeur peut être une mesure principale ?", "Parmi ces valeurs, laquelle convient ?", "Laquelle de ces mesures est une mesure principale ?"]),
      dM(j),
      faux.map(dM),
      expl(DEF_P, "on compare chaque valeur à $-\\pi$ et à $\\pi$ ; la borne $-\\pi$ est exclue, la borne $\\pi$ est incluse.", `Seule $${piL(j)}$ est dans l'intervalle.`, `c'est $${piL(j)}$.`),
    );
  }),
  tpl(M1, 4, 2, "Écris la mesure sous la forme r + 2kπ : le numérateur se partage.", () => {
    const r = un(RS);
    const k = un([2, 3, 4, 5, 6, -2, -3, -4, -5, -6]);
    const m = ajoute(r, F(2 * k));
    return qcm(enonce(un(D_MES), piL(m), un([...F_MES, "Retire les tours complets : quelle est sa mesure principale ?"])), dM(r), pieges(r, m), expl(DEF_P, MET_P, `$${piL(m)} = ${piL(r)} ${k < 0 ? "-" : "+"} ${2 * Math.abs(k)}\\pi$, et $${2 * Math.abs(k)}\\pi$ fait ${Math.abs(k)} tours complets.`, `la mesure principale est $${piL(r)}$.`));
  }),
  tpl(M1, 5, 2, "a ≡ b [2π] : a − b est un multiple de 2π.", () => {
    const r = un(R);
    const k = un([1, 2, 3, 4, -1, -2, -3, -4]);
    const m = ajoute(r, F(2 * k));
    const c = (b: Fr) => `$${piL(m)} \\equiv ${piL(b)} \\ [2\\pi]$`;
    return qcm(
      phrase(["La congruence modulo $2\\pi$ repère deux mesures d'un même angle.", "Deux réels sont congrus modulo $2\\pi$ s'ils diffèrent d'un nombre entier de tours.", "On compare des mesures d'angles modulo $2\\pi$.", "Modulo $2\\pi$, on ne tient pas compte des tours complets."], ["Quelle congruence est vraie ?", "Laquelle de ces congruences est juste ?", "Laquelle de ces écritures est correcte ?", "Quelle écriture est exacte ?"]),
      c(r),
      [c(oppose(r)), c(principal(ajoute(r, F(1)))), c(principal(ajoute(r, F(1, 2)))), c(principal(retire(r, F(1, 3)))), c(principal(retire(F(1), r)))],
      expl("$a \\equiv b \\ [2\\pi]$ signifie que $a - b$ est un multiple de $2\\pi$.", "on calcule la différence pour chaque proposition.", `$${piL(m)} - ${r.n < 0 ? `\\left(${piL(r)}\\right)` : piL(r)} = ${2 * k}\\pi$, multiple de $2\\pi$.`, `la congruence vraie est ${c(r)}.`),
    );
  }),
  tpl(M1, 6, 2, "Retire des tours de 360° jusqu'à entrer dans ]−180° ; 180°].", () => {
    const r = entre(-35, 36) * 5 || 45;
    const k = un([1, 2, 3, 4, -1, -2, -3]);
    const d = r + 360 * k;
    return court(
      enonce(un(["Un angle orienté a pour mesure, en degrés :", "Une plaque tournante pivote d'un angle orienté de :", "Le bras d'un radar pivote d'un angle orienté de :", "Une caméra de surveillance tourne d'un angle orienté de :", "Un phare tourne d'un angle orienté de :"]), `${d}°`, un(["Quelle est sa mesure principale en degrés, dans $\\left]-180°\\,;180°\\right]$ ?", "Donne la mesure principale, en degrés, dans $\\left]-180°\\,;180°\\right]$.", "Ramène cet angle dans $\\left]-180°\\,;180°\\right]$ : combien de degrés obtiens-tu ?", "En degrés, quelle mesure de cet angle est comprise dans $\\left]-180°\\,;180°\\right]$ ?"])),
      r,
      expl("un tour complet fait $360°$, et la mesure principale en degrés est dans $]-180°\\,;180°]$.", "on ajoute ou on retire des multiples de $360°$.", `$${d}° ${k < 0 ? "+" : "-"} ${360 * Math.abs(k)}° = ${r}°$.`, `la mesure principale est $${r}°$.`),
    );
  }),
  tpl(M1, 7, 3, "Les tours complets ne comptent pas : seule la fraction de tour reste, avec le signe du sens.", () => {
    const n = entre(2, 7);
    const [nom, p, q] = un(FRACS);
    const s = un(SENS);
    const reste = F((s === "direct" ? 2 : -2) * p, q);
    const r = principal(reste);
    const brut = fois(F(2 * n * q + 2 * p, q), s === "direct" ? 1 : -1);
    return qcm(
      `${un(SUJETS)} ${n} tours et ${nom} dans le sens ${s}. ${un(["Quelle est la mesure principale de l'angle orienté entre sa position de départ et sa position d'arrivée ?", "Quelle mesure principale donne-t-on à l'angle orienté entre le départ et l'arrivée ?", "Entre la position initiale et la position finale, quelle est la mesure principale de l'angle orienté ?"])}`,
      dM(r),
      pieges(r, brut),
      expl(DEF_P, "un tour complet vaut $2\\pi$ et ne change pas la position ; il reste la fraction de tour, positive dans le sens direct, négative sinon.", `La fraction de tour restante vaut $${piL(reste)}$.`, `la mesure principale est $${piL(r)}$.`),
    );
  }),
  tpl(M1, 8, 3, "Écris x sous la forme r − 2kπ avec r dans ]−π ; π] : k se lit alors tout de suite.", () => {
    const r = un(RS);
    const k = un([1, 2, 3, 4, 5, -1, -2, -3, -4, -5]);
    const m = ajoute(r, F(-2 * k));
    return court(
      enonce(un(["Un angle orienté a pour mesure :", "On connaît une mesure d'un angle orienté :", "Un angle de deux vecteurs a pour mesure :", "On a relevé la mesure d'un angle orienté :", "Dans un calcul, on obtient pour un angle orienté :"]), `x = ${piL(m)}`, un(["Quel entier $k$ donne à $x + 2k\\pi$ la valeur de la mesure principale ?", "Pour quel entier $k$ le réel $x + 2k\\pi$ est-il dans $\\left]-\\pi\\,;\\pi\\right]$ ?", "Trouve l'entier $k$ tel que $x + 2k\\pi$ soit la mesure principale.", "Quelle valeur de l'entier $k$ place $x + 2k\\pi$ dans $\\left]-\\pi\\,;\\pi\\right]$ ?"])),
      k,
      expl(DEF_P, "on encadre : on veut $-\\pi < x + 2k\\pi \\leqslant \\pi$, avec $k$ entier.", `$${piL(m)} ${k < 0 ? "-" : "+"} ${2 * Math.abs(k)}\\pi = ${piL(r)}$.`, `$k = ${k}$.`),
    );
  }),
  tpl(M1, 9, 3, "Multiplie la mesure principale, puis ramène le résultat dans ]−π ; π].", () => {
    const a = un(R.filter((x) => Math.abs(x.n / x.d) !== 0.5));
    const m = un([2, 3, 4, -2, -3]);
    const brut = fois(a, m);
    const r = principal(brut);
    return qcm(
      enonce(un(["Un angle orienté a pour mesure principale :", "On note $\\alpha$ la mesure principale d'un angle orienté :", "On travaille avec un angle orienté de mesure principale :", "La mesure principale d'un angle de vecteurs vaut :"]), `\\alpha = ${piL(a)}`, `${un(["Quelle est la mesure principale de l'angle de mesure", "Donne la mesure principale de l'angle de mesure", "Que vaut la mesure principale de l'angle mesurant", "Quelle est la mesure principale correspondant à"])} $${m}\\alpha$ ?`),
      dM(r),
      pieges(r, piL(brut) === piL(r) ? undefined : brut),
      expl(DEF_P, "on calcule le produit, puis on retire les tours complets.", `$${m}\\alpha = ${piL(brut)}$.`, `la mesure principale est $${piL(r)}$.`),
    );
  }),

  /* ═══════════ relation de Chasles ═══════════ */
  tpl(M2, 1, 1, "Le vecteur du milieu s'efface : (u, v) + (v, w) = (u, w).", () => {
    const [x, y, z] = triple();
    const genre = un(["somme", "somme", "ordre", "diff"]);
    const src = genre === "somme" ? `${ang(x, y)} + ${ang(y, z)}` : genre === "ordre" ? `${ang(y, z)} + ${ang(x, y)}` : `${ang(x, z)} - ${ang(y, z)}`;
    const juste = genre === "diff" ? ang(x, y) : ang(x, z);
    return qcm(
      enonce(un(["Pour des vecteurs non nuls, à $2\\pi$ près :", "On simplifie, à $2\\pi$ près, cette écriture :", "Modulo $2\\pi$, on considère :", "On regarde cette écriture, modulo $2\\pi$ :"]), src, un(["À quel angle orienté est-ce égal ?", "Quel angle obtient-on ?", "Que donne la relation de Chasles ?", "Par quel angle peut-on la remplacer ?"])),
      `$${juste}$`,
      [ang(z, x), ang(x, y), ang(y, z), ang(y, x), ang(z, y), ang(x, z)].map((s) => `$${s}$`),
      expl(CHASLES, "on repère le vecteur commun, puis on applique la relation de Chasles.", `Ici, on obtient $${juste}$.`, `l'angle cherché est $${juste}$.`),
    );
  }),
  tpl(M2, 2, 1, "Échanger les vecteurs change le signe ; remplacer un seul vecteur par son opposé ajoute π.", () => {
    const [x, y] = un(LETTRES).split("");
    const [u, v] = Math.random() < 0.6 ? [W(x), W(y)] : [V("A", "B"), V("A", "C")];
    const a = un(R);
    const cas = un(["echange", "moinsU", "moinsV", "moinsDeux"]);
    const cible = cas === "echange" ? ang(v, u) : cas === "moinsU" ? ang(`-${u}`, v) : cas === "moinsV" ? ang(u, `-${v}`) : ang(`-${u}`, `-${v}`);
    const r = principal(cas === "echange" ? oppose(a) : cas === "moinsDeux" ? a : ajoute(a, F(1)));
    return qcm(
      `${un(["On sait que :", "Un angle orienté vérifie :", "On connaît cet angle orienté :", "On donne :"])}\n\n$${ang(u, v)} = ${piL(a)}$\n\n${un(["Quelle est la mesure principale de :", "Que vaut, en mesure principale :", "Donne la mesure principale de :", "Déduis-en la mesure principale de :"])}\n\n$${cible}$`,
      dM(r),
      [...pieges(r), dM(a), dM(oppose(a))].filter((c) => c !== dM(r)),
      expl("échanger les deux vecteurs change la mesure en son opposé ; remplacer un seul vecteur par son opposé ajoute $\\pi$ ; les remplacer tous les deux ne change rien.", "on reconnaît la transformation, puis on ramène dans $]-\\pi\\,;\\pi]$.", `Ici, on part de $${piL(a)}$.`, `la mesure principale est $${piL(r)}$.`),
    );
  }),
  tpl(M2, 3, 1, "Additionne les deux mesures, puis ramène la somme dans ]−π ; π].", () => {
    const [x, y, z] = triple();
    const a = un(R);
    let b = un(R);
    if (principal(ajoute(a, b)).n === 0) b = ajoute(b, F(1, 12));
    return chasles3(x, y, z, a, b);
  }),
  tpl(M2, 4, 2, "Depuis un même sommet : lis l'ouverture de l'angle et le sens du premier vecteur vers le second.", () => {
    const f = regulier();
    const [p, q, s] = melange(Object.keys(f.pts));
    const r = mesureFig(f.pts, p, q, p, s);
    return qcm(enonce(`${f.nomFig} ${un(D_FIG)}`, ang(V(p, q), V(p, s)), un(F_FIG)), dM(r), pieges(r), expl("la mesure d'un angle de vecteurs est positive quand on tourne du premier vers le second dans le sens direct.", "on lit l'ouverture sur la figure, puis on fixe le signe par le sens de rotation.", `Du premier vecteur vers le second, on trouve $${piL(r)}$.`, `la mesure principale est $${piL(r)}$.`), f.canvas);
  }),
  tpl(M2, 5, 2, "Deux vecteurs d'origines différentes : remplace l'un d'eux par un vecteur égal ou parallèle sur la figure.", () => {
    for (;;) {
      const f = regulier();
      const noms = Object.keys(f.pts);
      const [p, q] = melange(noms);
      const [s, t] = melange(noms);
      const r = mesureFig(f.pts, p, q, s, t);
      if (r.n === 0 || p === s) continue;
      return qcm(enonce(`${f.nomFig} ${un(D_FIG)}`, ang(V(p, q), V(s, t)), un(F_FIG)), dM(r), pieges(r), expl("deux vecteurs égaux font le même angle avec un troisième ; deux vecteurs opposés, le même à $\\pi$ près.", "on ramène les deux vecteurs à une même origine sur la figure.", `On trouve, en tenant compte du sens, $${piL(r)}$.`, `la mesure principale est $${piL(r)}$.`), f.canvas);
    }
  }),
  tpl(M2, 6, 2, "Fais apparaître la relation de Chasles : au besoin, échange les vecteurs d'un angle et change son signe.", () => {
    const [x, y, z] = triple();
    const a = un(R);
    const b = un(R.filter((f) => piL(f) !== piL(a)));
    const genre = un(["fin", "debut"]);
    const eq1 = genre === "fin" ? `${ang(x, y)} = ${piL(a)}` : `${ang(y, x)} = ${piL(a)}`;
    const eq2 = genre === "fin" ? `${ang(z, y)} = ${piL(b)}` : `${ang(y, z)} = ${piL(b)}`;
    const brut = genre === "fin" ? retire(a, b) : retire(b, a);
    const r = principal(brut);
    return qcm(
      `${un(D_CH)}\n\n$${eq1}$\n\n$${eq2}$\n\n${un(F_CH)}\n\n$${ang(x, z)}$`,
      dM(r),
      [...pieges(r), dM(principal(ajoute(a, b)))].filter((c) => c !== dM(r)),
      expl(CHASLES, "on passe par le vecteur commun, en changeant le signe de l'angle écrit à l'envers.", `On trouve $${piL(brut)}$.`, `la mesure principale est $${piL(r)}$.`),
    );
  }),
  tpl(M2, 7, 3, "Calcule l'angle total : 0 ou π donne un alignement, ±π/2 un angle droit.", () => {
    const [O, P, Q, S] = un(["ABCD", "OMNP", "IJKL", "EFGH", "RSTU"]).split("");
    const t = un([F(1), F(1), F(0), F(1, 2), F(-1, 2), F(1, 3), F(-3, 4)]);
    const a = un(R);
    const bP = principal(retire(t, a));
    const al1 = `Les points $${P}$, $${O}$ et $${S}$ sont alignés, et $${O}$ est entre $${P}$ et $${S}$.`;
    const al2 = `Les points $${O}$, $${P}$ et $${S}$ sont alignés, et $${P}$ et $${S}$ sont du même côté de $${O}$.`;
    const pe = `Les droites $(${O}${P})$ et $(${O}${S})$ sont perpendiculaires.`;
    const ni = `Les droites $(${O}${P})$ et $(${O}${S})$ ne sont ni confondues ni perpendiculaires.`;
    const juste = t.n === 0 ? al2 : t.d === 1 ? al1 : t.d === 2 ? pe : ni;
    return qcm(
      `${un(["Sur un plan de chantier, on a relevé :", "Une géomètre relève ces angles orientés :", "Sur un croquis de navigation, on lit :", "Un logiciel de dessin affiche :", "On a mesuré sur une carte :", "On donne ces angles orientés :"])}\n\n$${ang(V(O, P), V(O, Q))} = ${piL(a)}$\n\n$${ang(V(O, Q), V(O, S))} = ${piL(bP)}$\n\n${un(["Que peut-on en déduire ?", "Quelle conclusion est juste ?", "Que dire de la figure ?", "Quelle affirmation est vraie ?"])}`,
      juste,
      [al1, al2, pe, ni],
      expl(CHASLES, "on ajoute les deux mesures pour obtenir l'angle total, puis on interprète : $0$ ou $\\pi$ donne un alignement, $\\pm\\dfrac{\\pi}{2}$ un angle droit.", `L'angle total vaut $${piL(principal(t))}$ à $2\\pi$ près.`, juste.charAt(0).toLowerCase() + juste.slice(1, -1) + "."),
    );
  }),
  tpl(M2, 8, 3, "Vers la gauche compte positivement, vers la droite négativement : ajoute les virages.", () => {
    const n = un([2, 2, 3]);
    const vir = Array.from({ length: n }, () => ({ a: un([F(1, 6), F(1, 4), F(1, 3), F(1, 2), F(2, 3), F(3, 4), F(5, 6)]), g: Math.random() < 0.5 }));
    const somme = () => vir.reduce((s, x) => (x.g ? ajoute(s, x.a) : retire(s, x.a)), F(0));
    if (principal(somme()).n === 0) vir[0].a = ajoute(vir[0].a, F(1, 12));
    const tot = somme();
    const r = principal(tot);
    const morceaux = vir.map((x) => `$${piL(x.a)}$ vers la ${x.g ? "gauche" : "droite"}`);
    return qcm(
      `${un(QUI_TOURNE)} tourne de ${morceaux.join(", puis de ")}. ${un(["Le sens direct correspond à un virage vers la gauche.", "Vers la gauche, c'est le sens direct.", "On compte positivement les virages vers la gauche."])} ${un(["Quelle est la mesure principale de l'angle orienté entre la direction de départ et la direction d'arrivée ?", "Entre la première et la dernière direction, quelle est la mesure principale de l'angle orienté ?", "Quelle mesure principale donne l'angle orienté de la direction initiale vers la direction finale ?"])}`,
      dM(r),
      pieges(r, piL(tot) === piL(r) ? undefined : tot),
      expl(CHASLES, "chaque virage est un angle orienté ; on les ajoute avec leur signe, puis on ramène dans $]-\\pi\\,;\\pi]$.", `La somme des virages vaut $${piL(tot)}$.`, `la mesure principale est $${piL(r)}$.`),
    );
  }),
  tpl(M2, 9, 3, "Passe par un vecteur intermédiaire de la figure, puis ajoute les angles connus.", () => {
    for (;;) {
      const f = composee();
      const a = un(f.vecteurs);
      const b = un(f.vecteurs);
      const r = mesureFig(f.pts, a[0], a[1], b[0], b[1]);
      if (r.n === 0) continue;
      return qcm(enonce(`${f.nomFig} ${un(D_FIG)}`, ang(V(a[0], a[1]), V(b[0], b[1])), un(F_FIG)), dM(r), pieges(r), expl(CHASLES, "on passe par un vecteur bien connu de la figure (un côté, une diagonale, un rayon), en ajoutant les angles.", `On obtient $${piL(r)}$.`, `la mesure principale est $${piL(r)}$.`), f.canvas);
    }
  }),
];
