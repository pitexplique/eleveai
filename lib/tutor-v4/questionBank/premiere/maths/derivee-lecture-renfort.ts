// Renfort de la LECTURE de la dérivée, 1re technologique (02/11/2026).
//
// Mesure du 02/11 (scripts/mesurer-squelettes-coach.ts premiere der_graphique
// der_nombre_derive) : 1 à 7 squelettes par micro, 13 à 19 répétitions sur 20.
// On branche des générateurs : courbes (paraboles, cubiques, courbes de
// croissance) avec leurs tangentes, tournures variées, situations de métiers.
// Aucune question « open » : QCM ou réponse courte (nombre seulement).

import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import {
  arr, BLEU, cap, construire, court, courbePoints, de, der, droite, ev, expl, figTangente, figure, fr, fx, itv, melange, n, par, parabole,
  poly, pref, proche, dnum, qcm, qcmNombres, randomInt, rc, ROUGE, SITUATIONS, tex, verif, VERT, VIOLET, PRODUITS,
  type Ligne, type P, type Situation,
} from "./derivee-renfort-outils";
import { factorisee, signeMot, genExtNature } from "./derivee-calcul-renfort";

/* ---------- Courbes types ---------- */

/** Parabole avec un point A d'abscisse entière, d'ordonnée entière, de pente entière. */
function quadTangente(sommet = false) {
  const a = rc([-1, -0.5, 0.5, 1]);
  const x0 = randomInt(-2, 2);
  const b = sommet ? -2 * a * x0 : randomInt(-2, 2);
  const c0 = randomInt(-2, 2);
  const brut = a * x0 * x0 + b * x0 + c0;
  const y0 = Math.round(brut);
  const c = arr(c0 - (brut - y0));
  const pente = arr(2 * a * x0 + b);
  verif(proche(a * x0 * x0 + b * x0 + c, y0) && proche(dnum((x) => a * x * x + b * x + c, x0), pente), "parabole tangente");
  return { a, b, c, x0, y0, pente, f: (x: number) => a * x * x + b * x + c };
}

/** Cubique passant par A(x0 ; y0) avec f'(x0) = m. */
function cubTangente(m?: number) {
  const k = rc([-0.5, -0.25, 0.25, 0.5]);
  const q = rc([0, -0.5, 0.5]);
  const pente = m ?? rc([-3, -2, -1, 1, 2, 3]);
  const x0 = randomInt(-2, 2);
  const y0 = randomInt(-2, 2);
  const f = (x: number) => k * (x - x0) ** 3 + q * (x - x0) ** 2 + pente * (x - x0) + y0;
  verif(proche(dnum(f, x0), pente), "cubique tangente");
  return { f, x0, y0, pente };
}

/** Cubique « à bosse et creux » : extremums en r1 < r2, mise à l'échelle pour l'affichage. */
function cubiqueAffichee() {
  const r1 = randomInt(-3, 1);
  const r2 = r1 + randomInt(2, 3);
  const s = rc([1, -1]);
  const echelle = (s * 5) / (r2 - r1) ** 3;
  const d = randomInt(-1, 1);
  const base = (x: number) => 2 * x ** 3 - 3 * (r1 + r2) * x ** 2 + 6 * r1 * r2 * x;
  const decal = -(base(r1) + base(r2)) / 2;
  const f = (x: number) => echelle * (base(x) + decal) + d;
  const fp = (x: number) => 6 * echelle * (x - r1) * (x - r2);
  verif(proche(dnum(f, 0.37), fp(0.37)), "cubique affichée");
  const xmin = r1 - 2;
  const xmax = r2 + 2;
  const ys = Array.from({ length: 41 }, (_, i) => f(xmin + ((xmax - xmin) * i) / 40));
  const ymin = Math.floor(Math.min(...ys, f(r1), f(r2)) - 1);
  const ymax = Math.ceil(Math.max(...ys) + 1);
  return { r1, r2, s, f, fp, xmin, xmax, ymin: Math.max(ymin, -8), ymax: Math.min(ymax, 8) };
}

const TRACEURS = ["Une ingénieure", "Un technicien de laboratoire", "Une économiste", "Un professeur de physique", "Une data scientist", "Un météorologue", "Une architecte", "Un préparateur physique"];

/** Une phrase d'entrée variée devant un énoncé de lecture (sauf s'il cite déjà un métier). */
const INTROS = [
  ...TRACEURS.map((t) => `${t} étudie une fonction $f$.`),
  "En TP de physique, on modélise une mesure par une fonction $f$.",
  "Dans un logiciel de géométrie, on a tracé une fonction $f$.",
  "Une calculatrice graphique affiche une fonction $f$.",
  "En atelier de STI2D, on étudie le profil d’une pièce, donné par une fonction $f$.",
];
function avecIntro(gen: () => TutorGeneratedQuestionV4) {
  return () => {
    const q = gen();
    return TRACEURS.some((t) => q.text.startsWith(t)) ? q : { ...q, text: `${rc(INTROS)} ${q.text}` };
  };
}

/* =========================================================
   der_tangente_lire (★3)
========================================================= */

function genLireTangenteQuad() {
  const q = quadTangente();
  const text = rc([
    `La courbe rouge représente $f$ ; la droite bleue est sa tangente au point A d’abscisse $${q.x0}$. Que vaut $f'(${q.x0})$ ?`,
    `${rc(TRACEURS)} a tracé la courbe de $f$ et sa tangente en A (en bleu). Lis le nombre dérivé $f'(${q.x0})$.`,
    `Sur le graphique, lis le coefficient directeur de la tangente en A. Que vaut $f'(${q.x0})$ ?`,
    `Le point A a pour abscisse $${q.x0}$. Avec la tangente tracée, donne $f'(${q.x0})$.`,
  ]);
  return court(
    text,
    q.pente,
    expl("$f'(a)$ est le coefficient directeur de la tangente au point d’abscisse $a$.", "depuis A, on avance de 1 vers la droite sur la tangente et on lit de combien elle monte (ou descend).", `la tangente ${q.pente > 0 ? "monte" : q.pente < 0 ? "descend" : "reste horizontale"} de ${fr(Math.abs(q.pente))} quand on avance de 1.`, `$f'(${q.x0}) = ${n(q.pente)}$.`),
    figTangente("La courbe de f et sa tangente en A", { id: "f", type: "quadratique", a: q.a, b: q.b, c: q.c, couleur: ROUGE }, q.x0, q.y0, q.pente)
  );
}

function genLireTangenteCubique() {
  const q = cubTangente();
  const dx = rc([1, 2]);
  const B = { x: q.x0 + dx, y: q.y0 + q.pente * dx, label: "B" };
  const demi = Math.max(3, Math.ceil(Math.abs(q.pente)) + 2, Math.abs(q.pente * dx) + 1, dx + 1);
  const canvas = figure("La courbe de f et sa tangente en A", q.x0 - demi, q.x0 + demi, q.y0 - demi, q.y0 + demi, [courbePoints(q.f, q.x0 - demi, q.x0 + demi), droite(q.pente, q.y0 - q.pente * q.x0)], [{ x: q.x0, y: q.y0, label: "A" }, B]);
  const text = rc([
    `La droite bleue est la tangente à la courbe de $f$ en A ; B est un autre point de cette tangente. Que vaut $f'(${q.x0})$ ?`,
    `Grâce aux points A et B de la tangente, lis le nombre dérivé $f'(${q.x0})$.`,
    `${rc(TRACEURS)} a tracé une courbe et sa tangente en A. Quel est le coefficient directeur de cette tangente ?`,
    `Lis sur le graphique la pente de la tangente en A, puis donne $f'(${q.x0})$.`,
  ]);
  return court(
    text,
    q.pente,
    expl("$f'(a)$ est le coefficient directeur de la tangente au point d’abscisse $a$.", "on lit sur la tangente le déplacement de A à B : $\\dfrac{\\text{montée}}{\\text{avancée}}$.", `de A à B : on avance de ${dx}, on ${q.pente > 0 ? "monte" : "descend"} de ${fr(Math.abs(q.pente * dx))}. Pente $= \\dfrac{${n(q.pente * dx)}}{${dx}} = ${n(q.pente)}$.`, `$f'(${q.x0}) = ${n(q.pente)}$.`),
    canvas
  );
}

function genLireFouFp() {
  const q = quadTangente();
  const demande = rc(["f", "fp"] as const);
  const val = demande === "f" ? q.y0 : q.pente;
  const qui = demande === "f" ? `f(${q.x0})` : `f'(${q.x0})`;
  return court(
    rc([`Sur ce graphique, A est le point de la courbe d’abscisse $${q.x0}$, avec sa tangente en bleu. Que vaut $${qui}$ ?`, `Attention à ne pas confondre $f(${q.x0})$ et $f'(${q.x0})$. Lis $${qui}$ sur le graphique.`, `${rc(TRACEURS)} a tracé $f$ et sa tangente en A. Donne $${qui}$.`]),
    val,
    expl("$f(a)$ est l’ORDONNÉE du point de la courbe ; $f'(a)$ est la PENTE de la tangente en ce point.", demande === "f" ? "on lit la hauteur du point A." : "on lit le coefficient directeur de la tangente.", `A a pour ordonnée $${q.y0}$ et la tangente a pour pente $${n(q.pente)}$.`, `$${qui} = ${n(val)}$.`),
    figTangente("La courbe de f et sa tangente en A", { id: "f", type: "quadratique", a: q.a, b: q.b, c: q.c, couleur: ROUGE }, q.x0, q.y0, q.pente)
  );
}

function eqDroite(m: number, p: number) {
  return `$y = ${poly([[m, 1], [p, 0]])}$`;
}

function genLireEquation() {
  for (;;) {
    const q = randomInt(1, 2) === 1 ? quadTangente() : (() => { const c = cubTangente(); return { ...c, a: 0, b: 0, c: 0 }; })();
    if (q.pente === 0) continue;
    const p = q.y0 - q.pente * q.x0;
    const bon = eqDroite(q.pente, p);
    const pieges = [eqDroite(p, q.pente), eqDroite(-q.pente, p), eqDroite(q.pente, -p), eqDroite(q.pente, q.y0)].filter((x) => x !== bon);
    const isQuad = "a" in q && q.a !== 0;
    const courbe = isQuad ? { id: "f", type: "quadratique" as const, a: q.a, b: q.b, c: q.c, couleur: ROUGE } : courbePoints(q.f, q.x0 - 6, q.x0 + 6);
    return qcm(
      rc([`Quelle est l’équation réduite de la tangente tracée en A ?`, `${rc(TRACEURS)} a tracé la tangente en A à la courbe de $f$. Quelle est son équation ?`, `Lis la pente et l’ordonnée à l’origine de la tangente bleue. Son équation est :`]),
      bon,
      pieges,
      expl("la tangente est une droite $y = mx + p$, où $m = f'(a)$.", "on lit la pente $m$ (on avance de 1), puis on calcule $p$ avec le point A.", `$m = ${n(q.pente)}$ ; A$(${q.x0}\\,;${q.y0})$ donne $p = ${par(q.y0)} - ${par(q.pente)} \\times ${par(q.x0)} = ${n(p)}$.`, `la tangente a pour équation ${bon}.`),
      figTangente("La courbe de f et sa tangente en A", courbe, q.x0, q.y0, q.pente)
    );
  }
}

/* =========================================================
   der_tangente_signe (★2 et ★4)
========================================================= */

const SIGNES = ["positif", "négatif", "nul"];

function genSigneTangente() {
  const sommet = randomInt(1, 5) === 1;
  const quad = rc([true, false]);
  let canvas;
  let pente: number;
  let x0: number;
  if (quad || sommet) {
    const q = quadTangente(sommet);
    pente = q.pente;
    x0 = q.x0;
    canvas = figTangente("La courbe de f et sa tangente en A", { id: "f", type: "quadratique", a: q.a, b: q.b, c: q.c, couleur: ROUGE }, q.x0, q.y0, q.pente);
  } else {
    const c = cubTangente();
    pente = c.pente;
    x0 = c.x0;
    canvas = figTangente("La courbe de f et sa tangente en A", courbePoints(c.f, c.x0 - 6, c.x0 + 6), c.x0, c.y0, c.pente);
  }
  const bon = signeMot(pente);
  return qcm(
    rc([`La droite bleue est la tangente à la courbe de $f$ au point A d’abscisse $${x0}$. Quel est le signe de $f'(${x0})$ ?`, `${rc(TRACEURS)} a tracé une courbe et sa tangente en A. Le nombre dérivé en A est :`, `Regarde la tangente en A : monte-t-elle, descend-elle ? $f'(${x0})$ est donc :`, `Sans calcul, quel est le signe de $f'(${x0})$ ?`]),
    bon,
    [...SIGNES.filter((x) => x !== bon), "on ne peut pas savoir sans la formule de $f$"],
    expl("le signe de $f'(a)$ est celui du coefficient directeur de la tangente.", "tangente qui monte : positif ; qui descend : négatif ; horizontale : nul.", `la tangente en A ${pente > 0 ? "monte" : pente < 0 ? "descend" : "est horizontale"}.`, `$f'(${x0})$ est ${bon}.`),
    canvas
  );
}

function genSigneSansTangente() {
  const c = cubiqueAffichee();
  const choix = [c.xmin + 1, c.r1, c.r2, c.xmax - 1, c.r1 + 1].map(arr);
  const xP = rc(choix);
  const yP = arr(c.f(xP));
  const bon = signeMot(Math.abs(c.fp(xP)) < 1e-9 ? 0 : c.fp(xP));
  const canvas = figure("La courbe de f", c.xmin, c.xmax, c.ymin, c.ymax, [courbePoints(c.f, c.xmin, c.xmax)], [{ x: xP, y: yP, label: "P" }]);
  return qcm(
    rc([`Voici la courbe de $f$. Quel est le signe du nombre dérivé de $f$ au point P ?`, `Au point P de la courbe, la fonction monte-t-elle, descend-elle, ou est-elle au sommet ? Le nombre dérivé en P est :`, `${rc(TRACEURS)} a marqué un point P sur la courbe. Le nombre dérivé $f'(${n(xP)})$ est :`]),
    bon,
    [...SIGNES.filter((x) => x !== bon), "on ne peut pas savoir sans tangente"],
    expl("si la courbe monte en un point, $f'$ y est positif ; si elle descend, négatif ; au sommet d’une bosse ou au fond d’un creux, nul.", "on regarde le sens de la courbe juste autour de P.", `en P, la courbe ${bon === "positif" ? "monte" : bon === "négatif" ? "descend" : "est au sommet (ou au fond) : la tangente est horizontale"}.`, `$f'(${n(xP)})$ est ${bon}.`),
    canvas
  );
}

function genSigneMots() {
  const s = rc(SITUATIONS);
  const a = randomInt(0, 6);
  const b = a + randomInt(3, 6);
  const c = randomInt(a + 1, b - 1);
  const cas = randomInt(1, 4);
  const constant = s.fem ? "constante" : "constant";
  const phrase =
    cas === 1 ? `entre $${s.v} = ${a}$ et $${s.v} = ${b}$, ${s.quoi} augmente` : cas === 2 ? `entre $${s.v} = ${a}$ et $${s.v} = ${b}$, ${s.quoi} diminue` : cas === 3 ? `${s.quoi} atteint sa valeur la plus haute à $${s.v} = ${c}$` : `entre $${s.v} = ${a}$ et $${s.v} = ${b}$, ${s.quoi} reste ${constant}`;
  const bon = cas === 1 ? "positif" : cas === 2 ? "négatif" : "nul";
  return qcm(
    `${s.qui} observe ${/^[aeiouéèh]/i.test(phrase) ? "qu’" : "que "}${phrase} ($${s.v}$ en ${s.uv}). On note $${s.g}$ la fonction qui modélise cette grandeur. Quel est le signe de $${s.g}'(${c})$ ?`,
    bon,
    [...SIGNES.filter((x) => x !== bon), "on ne peut pas savoir"],
    expl("si une grandeur augmente, sa dérivée est positive ; si elle diminue, négative ; à un sommet ou si elle est constante, nulle.", "on traduit la phrase en sens de variation.", `${phrase}.`, `$${s.g}'(${c})$ est ${bon}.`)
  );
}

function genSigneDepuisFp() {
  const parab = randomInt(1, 2) === 1;
  let fp: (x: number) => number;
  let courbe: object;
  let racines: number[];
  if (parab) {
    const r1 = randomInt(-3, 0);
    const r2 = r1 + randomInt(2, 4);
    const k = rc([0.5, 1, -0.5, -1]);
    fp = (x) => k * (x - r1) * (x - r2);
    courbe = { id: "fp", type: "quadratique", a: k, b: -k * (r1 + r2), c: k * r1 * r2, couleur: VIOLET };
    racines = [r1, r2];
  } else {
    const r = randomInt(-3, 3);
    const m = rc([-2, -1, -0.5, 0.5, 1, 2]);
    fp = (x) => m * (x - r);
    courbe = { id: "fp", type: "affine", a: m, b: -m * r, couleur: VIOLET };
    racines = [r];
  }
  const x1 = rc([-4, -3, -2, -1, 0, 1, 2, 3, 4].filter((x) => !racines.includes(x) && Math.abs(fp(x)) <= 4.5));
  const v = fp(x1);
  const monteFp = dnum(fp, x1) > 0;
  const bon = v > 0 ? `$f$ est croissante autour de $${x1}$, car $f'(${x1}) > 0$` : `$f$ est décroissante autour de $${x1}$, car $f'(${x1}) < 0$`;
  const pieges = [
    v > 0 ? `$f$ est décroissante autour de $${x1}$, car $f'(${x1}) < 0$` : `$f$ est croissante autour de $${x1}$, car $f'(${x1}) > 0$`,
    monteFp ? `$f$ est croissante autour de $${x1}$, car la courbe tracée monte` : `$f$ est décroissante autour de $${x1}$, car la courbe tracée descend`,
    "on ne peut rien dire sans la formule de $f$",
  ].filter((x) => x !== bon);
  const canvas = { kind: "fonctionGraphique", titre: "La courbe de f ′ (et non celle de f)", xmin: -5, xmax: 5, ymin: -5, ymax: 5, grille: true, courbes: [courbe], points: [{ x: x1, y: v, label: "" }] } as TutorGeneratedQuestionV4["canvas"];
  return qcm(
    rc([`La courbe tracée est celle de la DÉRIVÉE $f'$. Que peut-on dire de $f$ autour de $x = ${x1}$ ?`, `Attention : on a tracé $f'$, pas $f$. Autour de $x = ${x1}$, que fait $f$ ?`, `${rc(TRACEURS)} a tracé la dérivée $f'$ d’une fonction. Que peut-on dire de $f$ près de $x = ${x1}$ ?`]),
    bon,
    pieges,
    expl("le SIGNE de $f'$ donne le sens de variation de $f$.", "on regarde si la courbe de $f'$ est au-dessus ou au-dessous de l’axe en ce point.", `en $x = ${x1}$, la courbe de $f'$ est ${v > 0 ? "au-dessus" : "au-dessous"} de l’axe : $f'(${x1}) = ${n(v)}$.`, `${bon}. Que la courbe de $f'$ monte ou descende ne compte pas ici.`),
    canvas
  );
}

function genSigneIntervalleGraphe() {
  const c = cubiqueAffichee();
  const sens = rc(["\\ge", "\\le"] as const);
  const milieuPos = c.s < 0;
  const MIL = itv(c.r1, c.r2);
  const EXT = `${itv(c.xmin, c.r1)} et ${itv(c.r2, c.xmax)}`;
  const bon = milieuPos === (sens === "\\ge") ? MIL : EXT;
  verif((c.fp((c.r1 + c.r2) / 2) > 0) === milieuPos, "intervalle graphe");
  return qcm(
    rc([`Voici la courbe de $f$ sur $[${c.xmin}\\,;${c.xmax}]$. Sur quel(s) intervalle(s) a-t-on $f'(x) ${sens} 0$ ?`, `D’après la courbe de $f$, où le nombre dérivé vérifie-t-il $f'(x) ${sens} 0$ ?`, `${rc(TRACEURS)} a tracé $f$ sur $[${c.xmin}\\,;${c.xmax}]$. Où a-t-on $f'(x) ${sens} 0$ ?`]),
    bon,
    [bon === MIL ? EXT : MIL, itv(c.xmin, c.r1), itv(c.r2, c.xmax), itv(c.xmin, c.xmax)].filter((x) => x !== bon),
    expl("$f'(x) \\ge 0$ là où $f$ croît ; $f'(x) \\le 0$ là où $f$ décroît.", "on lit où la courbe monte et où elle descend.", `la courbe ${c.s > 0 ? "monte" : "descend"} jusqu’à $${c.r1}$, ${c.s > 0 ? "descend" : "monte"} jusqu’à $${c.r2}$, puis ${c.s > 0 ? "monte" : "descend"}.`, `$f'(x) ${sens} 0$ sur ${bon}.`),
    figure("La courbe de f", c.xmin, c.xmax, c.ymin, c.ymax, [courbePoints(c.f, c.xmin, c.xmax)])
  );
}

function genSignePoints() {
  const c = cubiqueAffichee();
  const xs = [c.xmin + 1, c.r1, (c.r1 + c.r2) / 2, c.xmax - 1].map(arr);
  const labels = melange(["A", "B", "C", "D"]);
  const pts = xs.map((x, i) => ({ x, y: arr(c.f(x)), label: labels[i] }));
  const milieu = c.s > 0 ? "négatif" : "positif";
  const demande = rc([milieu, "nul"]);
  const idx = demande === "nul" ? 1 : 2;
  const bon = `le point ${labels[idx]}`;
  verif(signeMot(Math.abs(c.fp(xs[idx])) < 1e-9 ? 0 : c.fp(xs[idx])) === demande, "points : signe");
  return qcm(
    rc([`Sur la courbe de $f$, en lequel de ces points le nombre dérivé est-il ${demande} ?`, `${rc(TRACEURS)} a marqué quatre points sur la courbe. En quel point $f'$ est-il ${demande} ?`]),
    bon,
    labels.filter((_, i) => i !== idx).map((l) => `le point ${l}`),
    expl("$f'$ est positif là où la courbe monte, négatif là où elle descend, nul au sommet d’une bosse ou au fond d’un creux.", "on regarde le sens de la courbe en chaque point.", `au point ${labels[idx]}, la courbe ${demande === "nul" ? "a une tangente horizontale" : demande === "positif" ? "monte" : "descend"}.`, `c’est ${bon}.`),
    figure("La courbe de f", c.xmin, c.xmax, c.ymin, c.ymax, [courbePoints(c.f, c.xmin, c.xmax)], pts)
  );
}

/* =========================================================
   der_tangente_horizontale (★3 et ★4)
========================================================= */

const TITRES_BOSSE = ["Hauteur d’un ballon", "Bénéfice d’une entreprise", "Température dans une serre", "Altitude d’un drone", "Audience d’une émission"];
const TITRES_CREUX = ["Coût de production", "Consommation d’un camion", "Niveau d’un lac", "Temps de trajet", "Concentration d’un polluant"];

function genHorizLireQuad() {
  const a = rc([-1, -0.5, 0.5, 1]);
  const sx = randomInt(-3, 3);
  const w = randomInt(-2, 2);
  const titre = rc(a < 0 ? TITRES_BOSSE : TITRES_CREUX);
  const canvas = figure(titre, sx - 4, sx + 4, w - 4, w + 4, [parabole(a, -2 * a * sx, a * sx * sx + w), droite(0, w)], [{ x: sx, y: w, label: "S" }]);
  return court(
    rc([`La droite bleue est une tangente horizontale à la courbe. En quelle abscisse la tangente est-elle horizontale ?`, `${rc(TRACEURS)} a tracé cette courbe. Pour quelle valeur de $x$ a-t-on $f'(x) = 0$ ?`, `Lis l’abscisse du point S où le nombre dérivé est nul.`, `Où la courbe atteint-elle son ${a < 0 ? "maximum" : "minimum"} ? Donne l’abscisse du point où la tangente est horizontale.`]),
    sx,
    expl("une tangente horizontale a un coefficient directeur nul : $f'(x) = 0$.", "on repère le sommet de la courbe.", `le sommet S a pour abscisse $${sx}$.`, `la tangente est horizontale en $x = ${sx}$ ; là, $f$ atteint son ${a < 0 ? "maximum" : "minimum"}.`),
    canvas
  );
}

function genHorizLireCubique() {
  const c = cubiqueAffichee();
  const veutBosse = rc([true, false]);
  // s > 0 : bosse en r1, creux en r2.
  const x = veutBosse === c.s > 0 ? c.r1 : c.r2;
  const canvas = figure("La courbe de f et deux tangentes horizontales", c.xmin, c.xmax, c.ymin, c.ymax, [courbePoints(c.f, c.xmin, c.xmax), droite(0, arr(c.f(c.r1)), BLEU, "t1"), droite(0, arr(c.f(c.r2)), VERT, "t2")]);
  return court(
    rc([
      `La courbe de $f$ a deux tangentes horizontales. Quelle est l’abscisse de celle placée ${veutBosse ? "au sommet de la « bosse »" : "au fond du « creux »"} ?`,
      `${rc(TRACEURS)} a tracé cette courbe. En quelle abscisse la fonction passe-t-elle ${veutBosse ? "de croissante à décroissante" : "de décroissante à croissante"} ?`,
      `Lis l’abscisse du point où $f'(x) = 0$ et où $f$ atteint ${veutBosse ? "un maximum" : "un minimum"} sur le graphique.`,
    ]),
    x,
    expl("au sommet d’une bosse ou au fond d’un creux, la tangente est horizontale : $f'(x) = 0$.", "on lit l’abscisse de ce point sur l’axe horizontal.", `les tangentes horizontales sont en $x = ${c.r1}$ et $x = ${c.r2}$.`, `la réponse est $x = ${x}$.`),
    canvas
  );
}

function genHorizNombre() {
  const t = randomInt(1, 4);
  let f: (x: number) => number;
  let nb: number;
  let pourquoi: string;
  let xmin = -4;
  let xmax = 4;
  let ymin = -5;
  let ymax = 5;
  if (t === 1) {
    const c = cubiqueAffichee();
    f = c.f;
    ({ xmin, xmax, ymin, ymax } = c);
    nb = 2;
    pourquoi = "une bosse et un creux";
  } else if (t === 2) {
    const a = rc([-0.5, 0.5, 1, -1]);
    const sx = randomInt(-2, 2);
    f = (x) => a * (x - sx) ** 2 + (a > 0 ? -2 : 2);
    nb = 1;
    pourquoi = "un seul sommet";
  } else if (t === 3) {
    const k = rc([-0.3, 0.3]);
    const h = randomInt(-1, 1);
    f = (x) => k * (x - h) ** 3;
    nb = 1;
    pourquoi = `la courbe s’aplatit en $x = ${h}$ sans faire de bosse : la tangente y est horizontale`;
  } else {
    const k = rc([-0.2, 0.2]);
    const h = randomInt(-1, 1);
    f = (x) => k * (x - h) ** 3 + Math.sign(k) * (x - h);
    nb = 0;
    pourquoi = "la courbe monte (ou descend) toujours, sans jamais s’aplatir";
  }
  return qcm(
    rc([`Combien de points de cette courbe ont une tangente horizontale ?`, `Sur la courbe tracée, combien de fois a-t-on $f'(x) = 0$ ?`, `${rc(TRACEURS)} cherche les points où la tangente est horizontale. Combien y en a-t-il sur ce graphique ?`]),
    String(nb),
    ["0", "1", "2", "3"].filter((x) => x !== String(nb)),
    expl("une tangente horizontale correspond à $f'(x) = 0$ : sommet, creux, ou palier.", "on parcourt la courbe et on repère où elle s’aplatit.", `${pourquoi}.`, `il y a ${nb} point${nb > 1 ? "s" : ""} à tangente horizontale.`),
    figure("La courbe de f", xmin, xmax, ymin, ymax, [courbePoints(f, xmin, xmax)])
  );
}

function genHorizCalculDeg2() {
  const a = rc([-3, -2, -1, -0.5, 0.5, 1, 2, 4]);
  const sx = rc([-3, -2, -1, 1, 2, 3, 4, 5, 1.5, 2.5, -0.5]);
  const c = randomInt(-6, 9);
  const p: P = [c, arr(-2 * a * sx), a];
  verif(Math.abs(ev(der(p), sx)) < 1e-9, "tangente horizontale degré 2");
  const s = rc(SITUATIONS);
  const t = randomInt(1, 3);
  const [g, v] = t === 1 ? ["f", "x"] : t === 2 ? ["g", "x"] : [s.g, s.v];
  const text =
    t === 1
      ? `Soit $f(x) = ${tex(p)}$. En quelle abscisse la courbe de $f$ a-t-elle une tangente horizontale ?`
      : t === 2
        ? `On considère $g(x) = ${tex(p)}$. Pour quelle valeur de $x$ la tangente est-elle horizontale ?`
        : `${s.qui} modélise une grandeur par $${s.g}(${s.v}) = ${tex(p, s.v)}$. Pour quelle valeur de $${s.v}$ a-t-on $${s.g}'(${s.v}) = 0$ ?`;
  return court(text, sx, expl("tangente horizontale ⟺ nombre dérivé nul.", `on dérive, puis on résout $${g}'(${v}) = 0$.`, `$${g}'(${v}) = ${tex(der(p), v)}$ ; $${tex(der(p), v)} = 0$ donne $${v} = ${n(sx)}$.`, `la tangente est horizontale en $${v} = ${n(sx)}$.`));
}

function genHorizCalculFact() {
  const F = factorisee();
  const ens = (a: number, b: number) => `en $x = ${n(Math.min(a, b))}$ et en $x = ${n(Math.max(a, b))}$`;
  const bon = ens(F.r1, F.r2);
  return qcm(
    rc([`On a $f'(x) = ${F.txt}$. En quelles abscisses la courbe de $f$ a-t-elle une tangente horizontale ?`, `La dérivée de $f$ est $f'(x) = ${F.txt}$. Où les tangentes à la courbe sont-elles horizontales ?`]),
    bon,
    [ens(-F.r1, -F.r2), `en $x = ${n(F.lo)}$ seulement`, "nulle part", `en $x = 0$ seulement`].filter((x) => x !== bon),
    expl("tangente horizontale ⟺ $f'(x) = 0$.", "un produit est nul si l’un de ses facteurs est nul.", `les facteurs s’annulent en $${n(F.r1)}$ et en $${n(F.r2)}$.`, `les tangentes sont horizontales ${bon}.`)
  );
}

function genHorizDepuisFp() {
  const r = randomInt(-3, 3);
  const m = rc([-2, -1, -0.5, 0.5, 1, 2]);
  const canvas = { kind: "fonctionGraphique", titre: "La courbe de f ′ (et non celle de f)", xmin: -5, xmax: 5, ymin: -5, ymax: 5, grille: true, courbes: [{ id: "fp", type: "affine", a: m, b: -m * r, couleur: VIOLET }] } as TutorGeneratedQuestionV4["canvas"];
  return court(
    rc([`On a tracé la DÉRIVÉE $f'$. En quelle abscisse la courbe de $f$ a-t-elle une tangente horizontale ?`, `Voici la courbe de $f'$. Pour quelle valeur de $x$ la tangente à la courbe de $f$ est-elle horizontale ?`, `${rc(TRACEURS)} a tracé $f'$. Où la courbe de $f$ a-t-elle une tangente horizontale ?`]),
    r,
    expl("la tangente à la courbe de $f$ est horizontale là où $f'(x) = 0$.", "sur la courbe de $f'$, on cherche où elle coupe l’axe des abscisses.", `la droite coupe l’axe en $x = ${r}$.`, `la tangente à la courbe de $f$ est horizontale en $x = ${r}$.`),
    canvas
  );
}

/* =========================================================
   der_comparer_vitesses (★4)
========================================================= */

function genComparerTangentes() {
  for (;;) {
    const a = rc([0.5, 1, -0.5, -1]);
    const b = randomInt(-2, 2);
    const u = randomInt(-3, 1);
    const v = u + randomInt(1, 3);
    const pu = 2 * a * u + b;
    const pv = 2 * a * v + b;
    if (Math.abs(pu - pv) < 1) continue;
    const f = (x: number) => a * x * x + b * x;
    const ys = [f(u), f(v)];
    const ymin = Math.floor(Math.min(...ys) - 4);
    const ymax = Math.ceil(Math.max(...ys) + 4);
    const canvas = figure(`Deux tangentes : en A et en B`, u - 3, v + 3, ymin, ymax, [parabole(a, b, 0), droite(pu, f(u) - pu * u, BLEU, "t1"), droite(pv, f(v) - pv * v, VERT, "t2")], [{ x: u, y: f(u), label: "A" }, { x: v, y: f(v), label: "B" }]);
    const grand = pu > pv ? u : v;
    const autre = grand === u ? v : u;
    return qcm(
      rc([`A a pour abscisse $${u}$ et B pour abscisse $${v}$. Lequel est le plus grand : $f'(${u})$ ou $f'(${v})$ ?`, `${rc(TRACEURS)} compare les nombres dérivés en A ($x = ${u}$) et en B ($x = ${v}$). Lequel est le plus grand ?`, `Avec les deux tangentes tracées, compare $f'(${u})$ et $f'(${v})$. Le plus grand est :`]),
      `$f'(${grand})$`,
      [`$f'(${autre})$`, "ils sont égaux", "on ne peut pas comparer"],
      expl("le nombre dérivé est la pente de la tangente.", "on compare les deux pentes, SIGNE COMPRIS : une tangente qui descend a une pente négative.", `$f'(${u}) = ${n(pu)}$ et $f'(${v}) = ${n(pv)}$.`, `le plus grand est $f'(${grand})$.`),
      canvas
    );
  }
}

type Croiss = { f: (t: number) => number; nom: string };
function courbeCroissance(): Croiss {
  const t = randomInt(1, 3);
  if (t === 1) {
    const L = rc([8, 10]);
    const k = rc([1, 1.5]);
    const m = rc([3, 4, 5]);
    return { f: (x) => L / (1 + Math.exp(-k * (x - m))), nom: "en S" };
  }
  if (t === 2) {
    const c = rc([0.5, 0.8]);
    return { f: (x) => c * Math.exp(0.3 * x), nom: "qui accélère" };
  }
  const L = rc([8, 9]);
  return { f: (x) => L * (1 - Math.exp(-0.4 * x)), nom: "qui ralentit" };
}

const CROISSANTS = SITUATIONS.filter((s) => /masse|hauteur|abonnés|malades|capital|spectateurs|population|distance|produit/.test(s.quoi));

function genComparerCroissance() {
  for (;;) {
    const c = courbeCroissance();
    const s = rc(CROISSANTS);
    const t1 = randomInt(1, 8);
    const t2 = randomInt(1, 9);
    if (t1 >= t2) continue;
    const d1 = dnum(c.f, t1);
    const d2 = dnum(c.f, t2);
    if (Math.max(d1, d2) < 1.5 * Math.min(d1, d2)) continue;
    const ymax = Math.ceil(Math.max(c.f(10), 1) + 1);
    if (ymax > 25) continue;
    const plus = d1 > d2 ? t1 : t2;
    const autre = plus === t1 ? t2 : t1;
    const canvas = figure(cap(s.quoi), 0, 10, 0, ymax, [courbePoints(c.f, 0, 10)], [{ x: t1, y: arr(c.f(t1)), label: "A" }, { x: t2, y: arr(c.f(t2)), label: "B" }]);
    return qcm(
      rc([`La courbe montre ${s.quoi} en fonction du temps $${s.v}$ (en ${s.uv}). À quel instant augmente-t-elle le plus vite ?`, `${s.qui} suit ${s.quoi} (courbe ci-contre, $${s.v}$ en ${s.uv}). À quel instant la vitesse de variation est-elle la plus grande ?`, `D’après la courbe, à quel instant le nombre dérivé est-il le plus grand ?`]),
      `à $${s.v} = ${plus}$`,
      [`à $${s.v} = ${autre}$`, "à la même vitesse aux deux instants", "on ne peut pas savoir sans formule"],
      expl("la vitesse de variation à un instant est le nombre dérivé : la pente de la tangente.", "on compare la raideur de la courbe en A et en B.", `la courbe est plus raide à $${s.v} = ${plus}$ qu’à $${s.v} = ${autre}$.`, `la grandeur augmente le plus vite à $${s.v} = ${plus}$ (même si sa valeur n’y est pas forcément la plus grande).`),
      canvas
    );
  }
}

function genComparerCalcul() {
  for (;;) {
    const s = rc(SITUATIONS);
    const p: P = [rc([5, 10, 20]), rc([-4, -2, 1, 3, 6]), rc([-1, -0.5, 0.5, 1, 2]), rc([0, 0, 0.1, -0.1])];
    const t1 = randomInt(1, 4);
    const t2 = t1 + randomInt(1, 4);
    const d = der(p);
    const v1 = ev(d, t1);
    const v2 = ev(d, t2);
    if (Math.abs(v1 - v2) < 0.5) continue;
    const plus = v1 > v2 ? t1 : t2;
    const autre = plus === t1 ? t2 : t1;
    return qcm(
      `${s.qui} modélise ${s.quoi} par $${s.g}(${s.v}) = ${tex(p, s.v)}$ ($${s.v}$ en ${s.uv}). À quel instant le nombre dérivé est-il le plus grand : $${s.v} = ${t1}$ ou $${s.v} = ${t2}$ ?`,
      `à $${s.v} = ${plus}$`,
      [`à $${s.v} = ${autre}$`, "ils sont égaux", "on ne peut pas savoir"],
      expl("on compare deux nombres dérivés en les calculant.", "on dérive, puis on remplace par chaque valeur.", `$${s.g}'(${s.v}) = ${tex(d, s.v)}$ ; $${s.g}'(${t1}) = ${n(v1)}$ et $${s.g}'(${t2}) = ${n(v2)}$.`, `le nombre dérivé est le plus grand à $${s.v} = ${plus}$.`)
    );
  }
}

function genComparerTableau() {
  const s = rc(CROISSANTS);
  const m = randomInt(1, 4);
  const a = rc([0.5, 1, 2]);
  const M = rc([6, 8, 10, 12]);
  const ts = [0, 1, 2, 3, 4, 5];
  const vals = ts.map((t) => arr(M - a * (t - m) ** 2));
  const g = s.g;
  const liste = ts.map((t, i) => `$${g}'(${t}) = ${n(vals[i])}$`).join(" ; ");
  return court(
    rc([`${s.qui} étudie ${s.quoi}, ${s.fem ? "notée" : "noté"} $${g}(${s.v})$ ($${s.v}$ en ${s.uv}). On a calculé : ${liste}. À quel instant la grandeur augmente-t-elle le plus vite ?`, `Voici les nombres dérivés d’une fonction $${g}$ : ${liste}. Pour quelle valeur de $${s.v}$ la vitesse de variation est-elle la plus grande ?`]),
    m,
    expl("la vitesse de variation est le nombre dérivé.", "on cherche le plus grand nombre dérivé (et non la plus grande valeur de la grandeur).", `le plus grand est $${g}'(${m}) = ${n(M)}$.`, `la grandeur augmente le plus vite à $${s.v} = ${m}$.`)
  );
}

/* =========================================================
   der_nombre_derive_sens, notion der_graphique (★5)
========================================================= */

function genSensFouFp() {
  const cub = rc([true, false]);
  let fCourbe: object;
  let fpCourbe: object;
  let pourquoi: string;
  const couleurF = rc([ROUGE, BLEU]);
  const couleurFp = couleurF === ROUGE ? BLEU : ROUGE;
  const nomF = couleurF === ROUGE ? "rouge" : "bleue";
  const nomFp = couleurFp === ROUGE ? "rouge" : "bleue";
  if (cub) {
    const r1 = randomInt(-3, 0);
    const r2 = r1 + rc([2, 3]);
    const e = rc([0.15, -0.15]);
    const base = (x: number) => 2 * x ** 3 - 3 * (r1 + r2) * x ** 2 + 6 * r1 * r2 * x;
    const dec = -(base(r1) + base(r2)) / 2;
    fCourbe = { ...courbePoints((x) => e * (base(x) + dec), -5, 5, couleurF, "f") };
    fpCourbe = { id: "fp", type: "quadratique", a: 6 * e, b: -6 * e * (r1 + r2), c: 6 * e * r1 * r2, couleur: couleurFp };
    pourquoi = `la courbe ${nomFp} coupe l’axe en $${r1}$ et $${r2}$, exactement là où la courbe ${nomF} a une tangente horizontale`;
  } else {
    const a = rc([-1, -0.5, 0.5, 1]);
    const sx = randomInt(-2, 2);
    const w = randomInt(-2, 2);
    fCourbe = { id: "f", type: "quadratique", a, b: -2 * a * sx, c: a * sx * sx + w, couleur: couleurF };
    fpCourbe = { id: "fp", type: "affine", a: 2 * a, b: -2 * a * sx, couleur: couleurFp };
    pourquoi = `la droite ${nomFp} coupe l’axe en $${sx}$, là où la parabole ${nomF} a son sommet ; et elle est positive là où la parabole monte`;
  }
  const demande = rc(["f'", "f"] as const);
  const bon = demande === "f'" ? `la courbe ${nomFp}` : `la courbe ${nomF}`;
  return qcm(
    rc([`Sur ce graphique, une courbe représente $f$ et l’autre sa dérivée $f'$. Laquelle représente $${demande}$ ?`, `${rc(TRACEURS)} a tracé une fonction et sa dérivée, sans les nommer. Quelle courbe est celle de $${demande}$ ?`]),
    bon,
    [bon === `la courbe ${nomFp}` ? `la courbe ${nomF}` : `la courbe ${nomFp}`, "on ne peut pas savoir"],
    expl("là où $f$ a une tangente horizontale, $f'$ vaut 0 ; là où $f$ monte, $f'$ est positive.", "on cherche la courbe qui coupe l’axe pile sous les sommets de l’autre.", `${pourquoi}.`, `$${demande}$ est représentée par ${bon}.`),
    figure("Une fonction et sa dérivée", -5, 5, -6, 6, [fCourbe as never, fpCourbe as never])
  );
}

function genSensAnnule() {
  const cub = rc([true, false]);
  if (cub) {
    const c = cubiqueAffichee();
    const bon = `en $x = ${c.r1}$ et en $x = ${c.r2}$`;
    return qcm(
      rc([`Voici la courbe de $f$. En quelles abscisses la dérivée $f'$ s’annule-t-elle ?`, `D’après la courbe de $f$, où a-t-on $f'(x) = 0$ ?`]),
      bon,
      ["là où la courbe coupe l’axe des abscisses", `en $x = ${-c.r1}$ et en $x = ${-c.r2}$`, "$f'$ ne s’annule jamais", "en $x = 0$ seulement"].filter((x) => x !== bon),
      expl("$f'(a) = 0$ quand la tangente au point d’abscisse $a$ est horizontale.", "on repère le sommet de la bosse et le fond du creux.", `ils sont en $x = ${c.r1}$ et $x = ${c.r2}$.`, `$f'$ s’annule ${bon}. Ce n’est pas là où la courbe coupe l’axe : ça, c’est $f(x) = 0$.`),
      figure("La courbe de f", c.xmin, c.xmax, c.ymin, c.ymax, [courbePoints(c.f, c.xmin, c.xmax)])
    );
  }
  const a = rc([-1, -0.5, 0.5, 1]);
  const sx = rc([-2, -1, 1, 2]);
  const w = a > 0 ? randomInt(-3, -1) : randomInt(1, 3);
  const bon = `en $x = ${sx}$ seulement`;
  return qcm(
    rc([`Voici la courbe de $f$. Où la dérivée $f'$ s’annule-t-elle ?`, `D’après la courbe de $f$, pour quelle(s) valeur(s) de $x$ a-t-on $f'(x) = 0$ ?`]),
    bon,
    ["là où la courbe coupe l’axe des abscisses", "en $x = 0$, là où la courbe coupe l’axe des ordonnées", "$f'$ ne s’annule jamais", `en $x = ${-sx}$ seulement`],
    expl("$f'(a) = 0$ quand la tangente au point d’abscisse $a$ est horizontale.", "on repère le sommet de la parabole.", `le sommet est en $x = ${sx}$.`, `$f'$ s’annule ${bon}. Couper l’axe des abscisses, c’est $f(x) = 0$, pas $f'(x) = 0$.`),
    figure("La courbe de f", -5, 5, -6, 6, [parabole(a, -2 * a * sx, a * sx * sx + w)])
  );
}

function genSensFpExtremum() {
  const parab = rc([true, false]);
  if (!parab) {
    const r = randomInt(-3, 3);
    const m = rc([-2, -1, -0.5, 0.5, 1, 2]);
    const mot = m > 0 ? "minimum" : "maximum";
    return court(
      rc([`La droite tracée est la courbe de la DÉRIVÉE $f'$. En quelle abscisse $f$ atteint-elle son ${mot} ?`, `On a tracé $f'$. Pour quelle valeur de $x$ la fonction $f$ est-elle ${mot === "minimum" ? "minimale" : "maximale"} ?`]),
      r,
      expl("$f$ a un extremum là où $f'$ s’annule en changeant de signe.", "on lit où la courbe de $f'$ coupe l’axe, et son signe avant / après.", `$f'$ s’annule en $${r}$ et passe ${m > 0 ? "du $-$ au $+$" : "du $+$ au $-$"}.`, `$f$ atteint son ${mot} en $x = ${r}$.`),
      { kind: "fonctionGraphique", titre: "La courbe de f ′ (et non celle de f)", xmin: -5, xmax: 5, ymin: -5, ymax: 5, grille: true, courbes: [{ id: "fp", type: "affine", a: m, b: -m * r, couleur: VIOLET }] } as TutorGeneratedQuestionV4["canvas"]
    );
  }
  const r1 = randomInt(-3, 0);
  const r2 = r1 + randomInt(2, 4);
  const k = rc([0.5, 1, -0.5, -1]);
  const veut = rc(["dc", "cd"] as const); // dc : décroissante → croissante
  // k > 0 : + − + → passe de croissante à décroissante en r1.
  const x = (veut === "cd") === k > 0 ? r1 : r2;
  return court(
    rc([`La courbe tracée est celle de la DÉRIVÉE $f'$. En quelle abscisse $f$ passe-t-elle ${veut === "cd" ? "de croissante à décroissante" : "de décroissante à croissante"} ?`, `On a tracé $f'$ (et non $f$). Où la fonction $f$ ${veut === "cd" ? "cesse-t-elle de monter pour descendre" : "cesse-t-elle de descendre pour monter"} ?`]),
    x,
    expl("$f$ change de sens là où $f'$ change de signe.", "on lit où la courbe de $f'$ traverse l’axe, et dans quel sens.", `$f'$ change de signe en $${r1}$ et en $${r2}$ ; en $${x}$, elle passe ${veut === "cd" ? "du $+$ au $-$" : "du $-$ au $+$"}.`, `la réponse est $x = ${x}$.`),
    { kind: "fonctionGraphique", titre: "La courbe de f ′ (et non celle de f)", xmin: -5, xmax: 5, ymin: -5, ymax: 5, grille: true, courbes: [{ id: "fp", type: "quadratique", a: k, b: -k * (r1 + r2), c: k * r1 * r2, couleur: VIOLET }] } as TutorGeneratedQuestionV4["canvas"]
  );
}

function genSensVitesseGraphe() {
  const s = rc(SITUATIONS);
  const q = cubTangente();
  return court(
    `La courbe modélise ${s.quoi} (unité : ${s.ug}) ; la droite bleue est sa tangente au point A d’abscisse $${q.x0}$. Quelle est la vitesse de variation de la grandeur en A (en ${s.vit}) ?`,
    q.pente,
    expl("la vitesse de variation instantanée est le nombre dérivé, c’est-à-dire la pente de la tangente.", "on avance de 1 sur la tangente et on lit la montée (ou la descente).", `la tangente a pour coefficient directeur $${n(q.pente)}$.`, `la vitesse de variation en A vaut $${n(q.pente)}$ (en ${s.vit}).`),
    figTangente(cap(s.quoi), courbePoints(q.f, q.x0 - 6, q.x0 + 6), q.x0, q.y0, q.pente)
  );
}

/* =========================================================
   der_nombre_derive_sens, notion der_nombre_derive (★2 et ★3)
========================================================= */

function genSensInterpret() {
  const s = rc(SITUATIONS);
  const a = randomInt(2, 12);
  const bon = `La vitesse de variation ${de(s.quoi)} à $${s.v} = ${a}$, en ${s.vit}`;
  return qcm(
    rc([`${s.qui} modélise ${s.quoi} par une fonction $${s.g}$ ($${s.v}$ en ${s.uv}). Que représente $${s.g}'(${a})$ ?`, `On note $${s.g}(${s.v})$ ${s.quoi}, $${s.v}$ en ${s.uv}. Que signifie le nombre $${s.g}'(${a})$ ?`]),
    bon,
    [`${cap(s.quoi)} à $${s.v} = ${a}$, en ${s.ug}`, `La variation moyenne ${de(s.quoi)} entre $${s.v} = 0$ et $${s.v} = ${a}$`, `L’instant où ${s.quoi} vaut ${a} ${s.ug}`],
    expl("$f(a)$ est la valeur de la grandeur ; $f'(a)$ est sa vitesse de variation à cet instant.", "on distingue la grandeur et la façon dont elle change.", `$${s.g}(${a})$ serait ${s.quoi} à $${s.v} = ${a}$ ; $${s.g}'(${a})$ dit à quelle vitesse elle change.`, `$${s.g}'(${a})$ est la vitesse de variation, en ${s.vit}.`)
  );
}

function genSensUnite() {
  const s = rc(SITUATIONS);
  const a = randomInt(1, 10);
  const uvs = s.uv === "mois" ? "mois" : s.uv.replace(/s$/, "");
  return qcm(
    `${s.qui} étudie ${s.quoi} : $${s.g}(${s.v})$ est en ${s.ug} et $${s.v}$ en ${s.uv}. Dans quelle unité s’exprime $${s.g}'(${a})$ ?`,
    `en ${s.vit}`,
    [`en ${s.ug}`, `en ${s.uv}`, `en ${uvs} par ${s.ug}`],
    expl("un nombre dérivé est une vitesse de variation : unité de la grandeur PAR unité de la variable.", "on divise l’unité de $" + s.g + "$ par celle de $" + s.v + "$.", `${s.ug} par ${uvs}.`, `$${s.g}'(${a})$ s’exprime en ${s.vit}.`)
  );
}

function genSensPhrase() {
  const s = rc(SITUATIONS);
  const a = randomInt(1, 10);
  const A = rc([12, 25, 40, 64, 80, 150, 7.5]);
  const V = rc([2, 3, 4, 6, 2.5, 3.5]);
  const sens = rc([1, -1]);
  const demande = randomInt(1, 3) === 1 ? "f" : "fp";
  const val = demande === "f" ? A : sens * V;
  return court(
    `${s.qui} note qu’à $${s.v} = ${a}$ (en ${s.uv}), ${s.quoi} vaut ${fr(A)} ${s.ug} et ${sens > 0 ? "augmente" : "diminue"} de ${fr(V)} ${s.vit}. On appelle $${s.g}$ la fonction qui modélise cette grandeur. Que vaut $${demande === "f" ? `${s.g}(${a})` : `${s.g}'(${a})`}$ ?`,
    val,
    expl("$f(a)$ est la valeur de la grandeur ; $f'(a)$ est sa vitesse de variation (négative si elle diminue).", "on repère dans la phrase la valeur et la vitesse.", `$${s.g}(${a}) = ${n(A)}$ et $${s.g}'(${a}) = ${n(sens * V)}$.`, `$${demande === "f" ? `${s.g}(${a})` : `${s.g}'(${a})`} = ${n(val)}$.`)
  );
}

function genSensTraduire() {
  const s = rc(SITUATIONS);
  const a = randomInt(1, 10);
  const val = rc([1, -1]) * rc([2, 3, 5, 8, 2.5, 4]);
  const verbe = (pos: boolean) => (pos ? "augmente" : "diminue");
  const bon = `À $${s.v} = ${a}$, ${s.quoi} ${verbe(val > 0)} d’environ ${fr(Math.abs(val))} ${s.vit}`;
  return qcm(
    `On note $${s.g}(${s.v})$ ${s.quoi} ($${s.v}$ en ${s.uv}). On sait que $${s.g}'(${a}) = ${n(val)}$. Quelle phrase est juste ?`,
    bon,
    [`À $${s.v} = ${a}$, ${s.quoi} ${verbe(val < 0)} d’environ ${fr(Math.abs(val))} ${s.vit}`, `À $${s.v} = ${a}$, ${s.quoi} vaut ${fr(Math.abs(val))} ${s.ug}`, `Depuis le début, ${s.quoi} a ${val > 0 ? "augmenté" : "diminué"} de ${fr(Math.abs(val))} ${s.ug}`],
    expl("$f'(a)$ est la vitesse de variation à l’instant $a$ ; son signe dit si la grandeur monte ou descend.", "on lit le signe, puis la valeur, avec l’unité « par ».", `$${s.g}'(${a}) = ${n(val)}$ est ${val > 0 ? "positif" : "négatif"}.`, `${bon.charAt(0).toLowerCase() + bon.slice(1)}.`)
  );
}

function genSensTaux() {
  const s = rc(SITUATIONS);
  const k = rc([0.5, 1, 2, 3, -1]);
  const m = rc([-2, 0, 1, 3, 4]);
  const p: P = [rc([0, 5, 10]), m, k];
  const a = randomInt(1, 5);
  const h = rc([1, 0.5, 0.1]);
  const demande = rc(["moy", "lim"] as const);
  const moy = arr((ev(p, a + h) - ev(p, a)) / h);
  verif(proche(moy, k * (2 * a + h) + m), "taux moyen");
  const lim = 2 * k * a + m;
  const debut = `${s.qui} modélise ${s.quoi} par $${s.g}(${s.v}) = ${tex(p, s.v)}$ ($${s.v}$ en ${s.uv}).`;
  return court(
    demande === "moy"
      ? `${debut} Calcule le taux de variation moyen entre $${s.v} = ${a}$ et $${s.v} = ${n(a + h)}$, c’est-à-dire $\\dfrac{${s.g}(${n(a + h)}) - ${s.g}(${a})}{${n(h)}}$.`
      : `${debut} On calcule le taux de variation moyen entre $${s.v} = ${a}$ et $${s.v} = ${a} + h$ pour des $h$ de plus en plus petits. Vers quel nombre ce taux se rapproche-t-il ?`,
    demande === "moy" ? moy : lim,
    expl("le nombre dérivé $f'(a)$ est la limite du taux de variation moyen entre $a$ et $a + h$, quand $h$ devient très petit.", demande === "moy" ? "on calcule les deux images, puis on divise l’écart par la durée." : "cette limite est $f'(a)$ : on dérive puis on remplace.", demande === "moy" ? `$${s.g}(${n(a + h)}) = ${n(ev(p, a + h))}$ et $${s.g}(${a}) = ${n(ev(p, a))}$ ; $\\dfrac{${n(ev(p, a + h) - ev(p, a))}}{${n(h)}} = ${n(moy)}$.` : `$${s.g}'(${s.v}) = ${tex(der(p), s.v)}$, donc $${s.g}'(${a}) = ${n(lim)}$.`, demande === "moy" ? `le taux moyen vaut $${n(moy)}$ ${s.vit} (proche de $${s.g}'(${a}) = ${n(lim)}$).` : `le taux se rapproche de $${n(lim)}$ : c’est le nombre dérivé $${s.g}'(${a})$.`)
  );
}

/* =========================================================
   der_tangente_coefficient (★3 et ★4)
========================================================= */

function genCoefDeuxPoints() {
  const m = rc([-3, -2, -1, -0.5, 0.5, 1, 2, 3, 1.5, 4]);
  const dx = Number.isInteger(m) ? rc([1, 2, 3]) : 2;
  const x0 = randomInt(-3, 4);
  const y0 = randomInt(-4, 6);
  const x1 = x0 + rc([1, -1]) * dx;
  const y1 = y0 + m * (x1 - x0);
  const pt = (L: string, x: number, y: number) => `$${L}(${n(x)}\\,;${n(y)})$`;
  return court(
    rc([
      `La tangente à la courbe de $f$ au point ${pt("A", x0, y0)} passe aussi par le point ${pt("B", x1, y1)}. Que vaut $f'(${x0})$ ?`,
      `${rc(TRACEURS)} trace la tangente en ${pt("A", x0, y0)} à une courbe ; elle passe par ${pt("B", x1, y1)}. Quel est le nombre dérivé en $${x0}$ ?`,
      `La tangente en $x = ${x0}$ passe par ${pt("A", x0, y0)} et ${pt("B", x1, y1)}. Calcule son coefficient directeur.`,
    ]),
    m,
    expl("$f'(a)$ est le coefficient directeur de la tangente en $a$.", "coefficient directeur $= \\dfrac{y_B - y_A}{x_B - x_A}$.", `$\\dfrac{${n(y1)} - ${par(y0)}}{${n(x1)} - ${par(x0)}} = \\dfrac{${n(y1 - y0)}}{${n(x1 - x0)}} = ${n(m)}$.`, `$f'(${x0}) = ${n(m)}$.`)
  );
}

function genCoefEquation() {
  const a = randomInt(-3, 5);
  const m = rc([-4, -3, -2, -1, 1, 2, 3, 5, 0.5, -1.5]);
  const p = rc([-6, -3, -1, 2, 4, 7]);
  const demande = rc(["fp", "f"] as const);
  const val = demande === "fp" ? m : m * a + p;
  const qui = demande === "fp" ? `f'(${a})` : `f(${a})`;
  return court(
    rc([`La tangente à la courbe de $f$ au point d’abscisse $${a}$ a pour équation $y = ${poly([[m, 1], [p, 0]])}$. Que vaut $${qui}$ ?`, `${rc(TRACEURS)} trouve que la tangente en $x = ${a}$ est la droite $y = ${poly([[m, 1], [p, 0]])}$. Donne $${qui}$.`]),
    val,
    expl("la tangente en $a$ a pour coefficient directeur $f'(a)$ et passe par le point $(a\\,;f(a))$.", demande === "fp" ? "on lit le coefficient de $x$ (pas le nombre seul)." : "on remplace $x$ par $a$ dans l’équation de la tangente.", demande === "fp" ? `le coefficient de $x$ est $${n(m)}$.` : `$${n(m)} \\times ${par(a)} ${p < 0 ? "-" : "+"} ${n(Math.abs(p))} = ${n(val)}$.`, `$${qui} = ${n(val)}$.`)
  );
}

function polyHasard(): P {
  return rc([true, false]) ? [randomInt(-5, 5), rc([-6, -3, -1, 2, 4, 7]), rc([-3, -2, -1, 1, 2, 3, 0.5])] : [randomInt(-4, 4), rc([-5, -2, 1, 3]), rc([-3, -1, 2, 4]), rc([-2, -1, 1, 2])];
}

function genCoefCalcul() {
  const p = polyHasard();
  const a = rc([-2, -1, 1, 2, 3]);
  const val = ev(der(p), a);
  verif(proche(dnum((x) => ev(p, x), a), val), "coefficient calculé");
  return court(
    rc([`Soit $f(x) = ${tex(p)}$. Quel est le coefficient directeur de la tangente à sa courbe au point d’abscisse $${a}$ ?`, `${rc(TRACEURS)} étudie $f(x) = ${tex(p)}$. Quelle est la pente de la tangente en $x = ${a}$ ?`]),
    val,
    expl("la pente de la tangente en $a$ est $f'(a)$.", "on dérive, puis on remplace $x$ par $a$.", `$f'(x) = ${tex(der(p))}$, donc $f'(${a}) = ${n(val)}$.`, `la pente vaut $${n(val)}$.`)
  );
}

function genCoefPointPente() {
  const a = rc([-2, -1, -0.5, 0.5, 1, 2, 3]);
  const b = randomInt(-5, 5);
  const c = randomInt(-4, 6);
  const xs = rc([-3, -2, -1, 0, 1, 2, 3, 4, 1.5]);
  const m = arr(2 * a * xs + b);
  const p: P = [c, b, a];
  verif(proche(ev(der(p), xs), m), "point de pente donnée");
  const q = rc([-4, 1, 3, 6]);
  return court(
    rc([
      `Soit $f(x) = ${tex(p)}$. En quelle abscisse la tangente a-t-elle pour coefficient directeur $${n(m)}$ ?`,
      `Soit $f(x) = ${tex(p)}$. En quelle abscisse la tangente est-elle parallèle à la droite $y = ${poly([[m, 1], [q, 0]])}$ ?`,
      `${rc(TRACEURS)} cherche sur la courbe de $f(x) = ${tex(p)}$ le point où la pente vaut $${n(m)}$. Quelle est son abscisse ?`,
    ]),
    xs,
    expl("la pente de la tangente en $x$ est $f'(x)$ ; deux droites parallèles ont la même pente.", "on dérive, puis on résout $f'(x) = m$.", `$f'(x) = ${tex(der(p))}$ ; $${tex(der(p))} = ${n(m)}$ donne $x = ${n(xs)}$.`, `l’abscisse cherchée est $${n(xs)}$.`)
  );
}

function genCoefEquationTangente() {
  for (;;) {
    const p = polyHasard();
    const a = rc([-2, -1, 1, 2]);
    const m = ev(der(p), a);
    const fa = ev(p, a);
    const ord = arr(fa - m * a);
    if (m === 0) continue;
    const bon = eqDroite(m, ord);
    const pieges = [eqDroite(fa, m), eqDroite(m, fa), eqDroite(m, -ord), eqDroite(-m, ord)].filter((x) => x !== bon);
    if (new Set(pieges).size < 2) continue;
    return qcm(
      rc([`Soit $f(x) = ${tex(p)}$. Quelle est l’équation de la tangente à sa courbe au point d’abscisse $${a}$ ?`, `${rc(TRACEURS)} veut l’équation de la tangente en $x = ${a}$ à la courbe de $f(x) = ${tex(p)}$. Laquelle est juste ?`]),
      bon,
      pieges,
      expl("la tangente en $a$ a pour équation $y = f'(a)(x - a) + f(a)$.", "on calcule $f(a)$ et $f'(a)$, puis on développe.", `$f(${a}) = ${n(fa)}$, $f'(${a}) = ${n(m)}$ ; $y = ${n(m)}(x - ${par(a)})${fa === 0 ? "" : ` + ${par(fa)}`}$.`, `la tangente a pour équation ${bon}.`)
    );
  }
}

/* =========================================================
   der_modele_interpreter (★4)
========================================================= */

function genModeleMarginal() {
  const pr = rc(PRODUITS);
  const p: P = rc([true, false]) ? [rc([20, 50, 100]), rc([2, 5, 10]), rc([0.5, 1, 2])] : [rc([20, 50, 100]), rc([10, 15, 20]), rc([-3, -2, -1]), rc([0.1, 0.2])];
  const q0 = randomInt(2, 10);
  const val = ev(der(p), q0);
  return court(
    `Le coût total ${de(pr.ent)} est $C(q) = ${tex(p, "q")}$ (en ${pr.ue}, $q$ en ${pr.uq}). Le coût marginal est $C'(q)$. Calcule $C'(${q0})$.`,
    val,
    expl("le coût marginal $C'(q)$ est le coût approximatif d’une unité de plus.", "on dérive, puis on remplace $q$.", `$C'(q) = ${tex(der(p), "q")}$, donc $C'(${q0}) = ${n(val)}$.`, `quand on passe de ${q0} à ${q0 + 1} ${pr.uq}, le coût augmente d’environ $${n(val)}$ ${pr.ue}.`)
  );
}

function genModeleInterpret() {
  if (rc([true, false])) {
    const pr = rc(PRODUITS);
    const q0 = randomInt(5, 40);
    const v = rc([2, 3.5, 4, 6, 8, 2.5]);
    const bon = `Passer de ${q0} à ${q0 + 1} ${pr.uq} augmente le coût d’environ ${fr(v)} ${pr.ue}`;
    return qcm(
      `Pour ${pr.ent}, le coût total est $C(q)$ (en ${pr.ue}, $q$ en ${pr.uq}). On a $C'(${q0}) = ${n(v)}$. Que signifie ce nombre ?`,
      bon,
      [`Produire ${q0} ${pr.uq} coûte ${fr(v)} ${pr.ue}`, `Passer de ${q0} à ${q0 + 1} ${pr.uq} fait baisser le coût d’environ ${fr(v)} ${pr.ue}`, `Le coût moyen est de ${fr(v)} ${pr.ue} pour chaque unité produite`],
      expl("le coût marginal $C'(q)$ est le coût approximatif d’une unité de plus.", "on interprète $C'(q_0)$ comme une vitesse de variation du coût.", `$C'(${q0}) = ${n(v)} > 0$.`, `${bon.charAt(0).toLowerCase() + bon.slice(1)}.`)
    );
  }
  const s = rc(SITUATIONS);
  const a = randomInt(1, 10);
  const val = rc([1, -1]) * rc([2, 4, 6, 3, 2.5]);
  const bon = `Entre $${s.v} = ${a}$ et $${s.v} = ${a + 1}$, ${s.quoi} ${val > 0 ? "augmente" : "diminue"} d’environ ${fr(Math.abs(val))} ${s.ug}`;
  return qcm(
    `${s.qui} modélise ${s.quoi} par une fonction $${s.g}$ ($${s.v}$ en ${s.uv}). On a $${s.g}'(${a}) = ${n(val)}$. Comment l’interpréter ?`,
    bon,
    [`Entre $${s.v} = ${a}$ et $${s.v} = ${a + 1}$, ${s.quoi} ${val > 0 ? "diminue" : "augmente"} d’environ ${fr(Math.abs(val))} ${s.ug}`, `À $${s.v} = ${a}$, ${s.quoi} vaut ${fr(Math.abs(val))} ${s.ug}`, `${cap(s.quoi)} est ${val > 0 ? (s.fem ? "positive" : "positif") : s.fem ? "négative" : "négatif"}`],
    expl("$f'(a)$ est la vitesse de variation : sur une unité de temps, la grandeur varie d’environ $f'(a)$.", "le signe dit le sens, la valeur dit de combien.", `$${s.g}'(${a}) = ${n(val)}$.`, `${bon.charAt(0).toLowerCase() + bon.slice(1)}.`)
  );
}

const MOBILES: Array<[string, string]> = [
  ["Une ingénieure en robotique", "un robot d’entrepôt"],
  ["Un entraîneur", "une cycliste au départ d’une course"],
  ["Une technicienne SNCF", "un TGV qui quitte la gare"],
  ["Un ingénieur automobile", "une voiture électrique qui accélère"],
  ["Une technicienne d’ascenseurs", "un ascenseur rapide"],
  ["Un pilote d’essai", "un drone de livraison"],
  ["Une monitrice de ski", "une skieuse dans une descente"],
  ["Un chauffeur de bus", "un bus qui démarre"],
];

function genModeleVitesse() {
  const [qui, mob] = rc(MOBILES);
  const p: P = rc([true, false]) ? [0, rc([0, 1, 2, 3, 5]), rc([0.5, 1, 1.5, 2])] : [0, rc([1, 2, 4]), rc([0.5, 1, 2]), rc([0.1, 0.2])];
  const t0 = randomInt(1, 8);
  const val = ev(der(p), t0);
  return court(
    rc([`${qui} étudie ${mob} : la distance parcourue est $d(t) = ${tex(p, "t")}$ (en m, $t$ en s). Calcule sa vitesse à $t = ${t0}$ s, c’est-à-dire $d'(${t0})$.`, `La distance parcourue par ${mob} est $d(t) = ${tex(p, "t")}$ (m, s). Quelle est sa vitesse instantanée à $t = ${t0}$ s (en m/s) ?`]),
    val,
    expl("la vitesse instantanée est la dérivée de la distance parcourue.", "on dérive, puis on remplace $t$.", `$d'(t) = ${tex(der(p), "t")}$, donc $d'(${t0}) = ${n(val)}$.`, `la vitesse à $t = ${t0}$ s est $${n(val)}$ m/s.`)
  );
}

function genModeleCroissance() {
  const s = rc(SITUATIONS);
  const p: P = [rc([10, 20, 50]), rc([-4, 2, 3, 5]), rc([-1, -0.5, 0.5, 1, 2])];
  const a = randomInt(1, 6);
  const val = ev(der(p), a);
  return qcmNombres(
    `${s.qui} modélise ${s.quoi} par $${s.g}(${s.v}) = ${tex(p, s.v)}$ ($${s.v}$ en ${s.uv}). Quelle est la vitesse de variation à $${s.v} = ${a}$ (en ${s.vit}) ?`,
    val,
    [ev(p, a), arr((ev(p, a) - ev(p, 0)) / a), p[2] * a + p[1], ev(der(p), a + 1)],
    expl("la vitesse de variation instantanée est le nombre dérivé.", "on dérive, puis on remplace (attention : ce n’est ni la valeur, ni la variation moyenne).", `$${s.g}'(${s.v}) = ${tex(der(p), s.v)}$, donc $${s.g}'(${a}) = ${n(val)}$.`, `la vitesse de variation est $${n(val)}$ ${s.vit}.`)
  );
}

/* ---------- Gabarits ---------- */

const H_LIRE = "Le nombre dérivé se lit sur la TANGENTE : avance de 1, regarde de combien elle monte.";
const H_SIGNE = "Tangente qui monte : f' > 0 ; qui descend : f' < 0 ; horizontale : f' = 0.";
const H_SIGNE4 = "Sur la courbe de f', on lit le SIGNE (au-dessus ou au-dessous de l’axe), pas le sens.";
const H_HORIZ = "Tangente horizontale ⟺ f'(x) = 0.";
const H_COMP = "Plus la tangente est raide en MONTANT, plus le nombre dérivé est grand.";
const H_SENS = "f donne la grandeur ; f' donne la vitesse à laquelle elle change.";
const H_SENS5 = "Là où f a une tangente horizontale, f' vaut 0 : sa courbe coupe l’axe.";
const H_COEF = "f'(a) est le coefficient directeur de la tangente au point d’abscisse a.";
const H_MOD = "Un nombre dérivé a une unité : unité de la grandeur PAR unité de la variable.";

const G = "der_graphique";
const ND = "der_nombre_derive";

const LIGNES: Ligne[] = [
  [G, "der_tangente_lire", 3, avecIntro(genLireTangenteQuad), H_LIRE],
  [G, "der_tangente_lire", 3, avecIntro(genLireTangenteCubique), H_LIRE],
  [G, "der_tangente_lire", 3, avecIntro(genLireFouFp), H_LIRE],
  [G, "der_tangente_lire", 3, avecIntro(genLireEquation), H_LIRE],

  [G, "der_tangente_signe", 2, genSigneTangente, H_SIGNE],
  [G, "der_tangente_signe", 2, genSigneSansTangente, H_SIGNE],
  [G, "der_tangente_signe", 2, genSigneMots, H_SIGNE],
  [G, "der_tangente_signe", 4, genSigneDepuisFp, H_SIGNE4],
  [G, "der_tangente_signe", 4, avecIntro(genSigneIntervalleGraphe), H_SIGNE],
  [G, "der_tangente_signe", 4, avecIntro(genSignePoints), H_SIGNE],

  [G, "der_tangente_horizontale", 3, genHorizLireQuad, H_HORIZ],
  [G, "der_tangente_horizontale", 3, genHorizLireCubique, H_HORIZ],
  [G, "der_tangente_horizontale", 3, genHorizNombre, H_HORIZ],
  [G, "der_tangente_horizontale", 4, genHorizCalculDeg2, H_HORIZ],
  [G, "der_tangente_horizontale", 4, genHorizCalculFact, H_HORIZ],
  [G, "der_tangente_horizontale", 4, genHorizDepuisFp, H_HORIZ],
  [G, "der_tangente_horizontale", 4, genExtNature, H_HORIZ],

  [G, "der_comparer_vitesses", 4, avecIntro(genComparerTangentes), H_COMP],
  [G, "der_comparer_vitesses", 4, genComparerCroissance, H_COMP],
  [G, "der_comparer_vitesses", 4, genComparerCalcul, H_COMP],
  [G, "der_comparer_vitesses", 4, genComparerTableau, H_COMP],

  [G, "der_nombre_derive_sens", 5, genSensFouFp, H_SENS5],
  [G, "der_nombre_derive_sens", 5, genSensAnnule, H_SENS5],
  [G, "der_nombre_derive_sens", 5, genSensFpExtremum, H_SENS5],
  [G, "der_nombre_derive_sens", 5, genSensVitesseGraphe, H_SENS],

  [ND, "der_nombre_derive_sens", 2, genSensInterpret, H_SENS],
  [ND, "der_nombre_derive_sens", 2, genSensUnite, H_MOD],
  [ND, "der_nombre_derive_sens", 2, genSensPhrase, H_SENS],
  [ND, "der_nombre_derive_sens", 3, genSensTraduire, H_SENS],
  [ND, "der_nombre_derive_sens", 3, genSensTaux, H_SENS],
  [ND, "der_nombre_derive_sens", 3, genSensPhrase, H_SENS],

  [ND, "der_tangente_coefficient", 3, avecIntro(genCoefDeuxPoints), H_COEF],
  [ND, "der_tangente_coefficient", 3, avecIntro(genCoefEquation), H_COEF],
  [ND, "der_tangente_coefficient", 3, avecIntro(genLireTangenteCubique), H_COEF],
  [ND, "der_tangente_coefficient", 4, genCoefCalcul, H_COEF],
  [ND, "der_tangente_coefficient", 4, genCoefPointPente, H_COEF],
  [ND, "der_tangente_coefficient", 4, genCoefEquationTangente, H_COEF],

  [ND, "der_modele_interpreter", 4, genModeleMarginal, H_MOD],
  [ND, "der_modele_interpreter", 4, genModeleInterpret, H_MOD],
  [ND, "der_modele_interpreter", 4, genModeleVitesse, H_MOD],
  [ND, "der_modele_interpreter", 4, genModeleCroissance, H_MOD],
];

export const renfortDeriveeLecture = construire("premiere_der_renfort", LIGNES, ["lecture"]);
