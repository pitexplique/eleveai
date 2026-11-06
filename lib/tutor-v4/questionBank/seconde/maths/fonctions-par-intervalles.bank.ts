// FONCTIONS AFFINES PAR INTERVALLES, EN ESCALIER, |ax + b| TRACÉE (06/11/2026). Hors programme français
// (registre `hors_france`). Lignes visées : Québec DEP B-g et B-i, Sénégal 3e AN 6, Côte d'Ivoire 2nde C1-L6.
// `premiere/lin_affine_par_morceaux` lit des barèmes ; ici on calcule, on lit le dessin, on écrit l'expression.
// Canvas `fonctionGraphique` : un palier = une courbe à part, sans trait vertical, et des points pleins ou creux.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, nL, qcm, un } from "../../lycee-commun";
import { aff, BLEU, droiteL, fracL, interL, nz, repere, va, type Pt } from "./themes-3-pays-ecritures";

const tpl = fabrique("seconde", "fonctions_par_intervalles", "2de_");
const MP = "fct_par_intervalles";
const MA = "abs_affine_morceaux";

const pm = (n: number) => (n < 0 ? `(${n})` : String(n));
const NOMS = ["f", "f", "g", "h"];

/* ───────────────── par morceaux, écrit ───────────────── */

/** Deux morceaux qui se raccordent en x = k : a x + b à gauche, c x + d à droite. */
function deuxMorceaux() {
  for (;;) {
    const k = nz(-3, 4);
    const y = entre(-4, 5);
    const a = nz(-3, 3);
    const c = un([0, 0, nz(-3, 3)]);
    if (a === c) continue;
    return { k, a, b: y - a * k, c, d: y - c * k, y };
  }
}
const cas = (l: [string, string][]) => `\\begin{cases} ${l.map(([e, c]) => `${e} & \\text{si } ${c}`).join(" \\\\ ")} \\end{cases}`;
const INTRO_P = ["Soit la fonction définie par morceaux :", "On considère la fonction :", "Une fonction est définie par intervalles :", "On donne la fonction :", "Voici une fonction définie par intervalles :", "On étudie la fonction :"];
/** Dans un choix de QCM et dans le cadre de la bonne réponse, l'accolade poussait la page à 523 px. */
const casQ = (l: [string, string][]) => `{\\scriptsize ${cas(l)}}`;
const poseM = (n: string, l: [string, string][]) => `${un(INTRO_P)}\n\n$${n}(x) = ${cas(l)}$`;
const DEF_P = "une fonction par intervalles change de formule selon la valeur de $x$ : on repère d'abord l'intervalle où se trouve $x$, puis on applique la formule de cet intervalle.";
const DEF_L = "sur chaque segment, la fonction est affine : le coefficient vaut la variation de $y$ divisée par la variation de $x$.";

/* ───────────────── par morceaux, dessiné ───────────────── */

/** Une ligne brisée continue à sommets entiers, de x = −5 à x = 5, qui reste dans le cadre. */
function brisee(): Pt[] {
  for (;;) {
    const xs = [-5, ...[-3, -2, -1, 0, 1, 2, 3].sort(() => Math.random() - 0.5).slice(0, 2).sort((p, q) => p - q), 5];
    const pts = xs.map((x) => ({ x, y: entre(-5, 5) }));
    const pentes = pts.slice(1).map((p, i) => (p.y - pts[i].y) / (p.x - pts[i].x));
    if (new Set(pentes).size < 3) continue;
    if (pentes.some((p) => !Number.isInteger(p * 2) || Math.abs(p) > 4)) continue;
    return pts;
  }
}
const figureB = (pts: Pt[]) => repere([pts], { xmin: -6, xmax: 6, ymin: -6, ymax: 6 });
const INTRO_B = ["La courbe de $f$ est formée de segments.", "Voici la courbe d'une fonction $f$ affine par intervalles.", "Le dessin montre une fonction $f$ affine par morceaux.", "Sur ce repère, $f$ est représentée par une ligne brisée."];

/* ───────────────── escaliers ───────────────── */

type Esc = { bornes: number[]; vals: number[] };
/** Des paliers (b[i] exclu ; b[i+1] inclus) : le prix de la tranche commencée. */
function escalier(max = 7): Esc {
  const n = entre(3, 4);
  const pas = un([1, 2]);
  const bornes = Array.from({ length: n + 1 }, (_, i) => i * pas);
  const vals: number[] = [];
  let v = entre(1, 2);
  for (let i = 0; i < n; i++) {
    vals.push(v);
    v += entre(1, 2);
  }
  return vals[n - 1] > max ? escalier(max) : { bornes, vals };
}
/** Fermé à droite : la tranche va de la borne exclue à la borne incluse (durée commencée). */
function figureEsc(e: Esc): CanvasFigure {
  const traits: Pt[][] = [];
  const points: { x: number; y: number; ouvert?: boolean; couleur?: string }[] = [];
  e.vals.forEach((y, i) => {
    traits.push([{ x: e.bornes[i], y }, { x: e.bornes[i + 1], y }]);
    points.push({ x: e.bornes[i], y, ouvert: true, couleur: BLEU }, { x: e.bornes[i + 1], y, couleur: BLEU });
  });
  return repere(traits, { xmin: -1, xmax: Math.max(...e.bornes) + 1, ymin: -1, ymax: 9, points });
}
type Sit = { d: string; x: string; y: string };
const ESC: Sit[] = [
  { d: "Un parking compte en jetons selon la durée de stationnement.", x: "la durée, en heures", y: "le nombre de jetons" },
  { d: "Un service postal classe ses colis selon leur masse.", x: "la masse, en kg", y: "le nombre de timbres" },
  { d: "Une salle d'escalade décompte des crédits selon la durée de la séance.", x: "la durée, en heures", y: "le nombre de crédits" },
  { d: "Une station météo donne un niveau d'alerte selon la hauteur des vagues.", x: "la hauteur, en m", y: "le niveau d'alerte" },
  { d: "Un service de stockage attribue des blocs selon la taille d'un fichier.", x: "la taille, en Go", y: "le nombre de blocs" },
  { d: "Une bibliothèque compte des points selon la durée de retard d'un livre.", x: "la durée, en semaines", y: "le nombre de points" },
  { d: "Une équipe de secours classe une intervention selon la distance à parcourir.", x: "la distance, en dizaines de km", y: "le niveau d'intervention" },
  { d: "Un studio de musique décompte des tickets selon la durée d'enregistrement.", x: "la durée, en heures", y: "le nombre de tickets" },
  { d: "Un atelier de poterie compte des fournées selon la masse d'argile cuite.", x: "la masse, en dizaines de kg", y: "le nombre de fournées" },
  { d: "Une ferme compte des camions selon la masse de la récolte.", x: "la masse, en tonnes", y: "le nombre de camions" },
];
/** Une règle « k par tranche commencée » : situations qui ne parlent pas d'argent. */
const TRANCHES: { d: (k: number, t: number) => string; g: string; u: string }[] = [
  { d: (k, t) => `Un parking décompte ${k} jetons par tranche de ${t} h commencée.`, g: "une durée", u: "h" },
  { d: (k, t) => `Un studio retient ${k} tickets par tranche de ${t} h d'enregistrement commencée.`, g: "une durée", u: "h" },
  { d: (k, t) => `Une ferme prévoit ${k} caisses par tranche de ${t} kg de fruits commencée.`, g: "une masse", u: "kg" },
  { d: (k, t) => `Un hôpital prépare ${k} draps par tranche de ${t} lits commencée.`, g: "un nombre", u: "lits" },
  { d: (k, t) => `Une colonie prépare ${k} sandwichs par tranche de ${t} enfants commencée.`, g: "un nombre", u: "enfants" },
  { d: (k, t) => `Un club de plongée prévoit ${k} bouteilles par tranche de ${t} plongeurs commencée.`, g: "un nombre", u: "plongeurs" },
  { d: (k, t) => `Un service de stockage réserve ${k} blocs par tranche de ${t} Go commencée.`, g: "une taille", u: "Go" },
  { d: (k, t) => `Une troupe prévoit ${k} costumes de rechange par tranche de ${t} danseurs commencée.`, g: "un nombre", u: "danseurs" },
];

/* ───────────────── |ax + b| ───────────────── */

const DEF_A = "$|A| = A$ si $A \\geq 0$, et $|A| = -A$ si $A \\leq 0$. La courbe de $x \\mapsto |ax + b|$ est donc faite de deux demi-droites qui se rejoignent là où $ax + b = 0$.";
/** a x + b avec un sommet entier ; a > 0 le plus souvent. */
function tirerA(neg = false) {
  const a = neg ? un([2, 3, 4, -2, -3, 1, -1]) : un([2, 3, 4, 5]);
  const k = nz(-5, 5);
  return { a, k, b: -a * k };
}
const INTRO_A = ["On considère la fonction", "Soit la fonction", "On étudie la fonction", "On donne la fonction", "Voici la fonction"];
const SYMB = (s: string, v = "x") => `$${v} \\mapsto \\nobreak ${s}$`;
/** Une expression simplifiée de |ax + b| de chaque côté du sommet (a > 0). */
const VVV = (a: number, k: number, c: number): Pt[] => {
  const dx = (6 - c) / Math.abs(a);
  // Découpé au cadre (de −7 à 7) : rien ne dépasse du repère.
  const g = Math.max(-7, k - dx);
  const d = Math.min(7, k + dx);
  const y = (x: number) => c + Math.abs(a) * Math.abs(x - k);
  return [{ x: g, y: y(g) }, { x: k, y: c }, { x: d, y: y(d) }];
};
type Mob = { d: (a: number, b: number) => string; u: string };
const MOBS: Mob[] = [
  { d: (a, b) => `Un drone longe une route droite. Sa distance à une balise, en m, après $t$ secondes, est $d(t) = ${va(`${a}t - ${b}`)}$.`, u: "secondes" },
  { d: (a, b) => `Un train passe devant une gare. Sa distance à la gare, en km, après $t$ minutes, est $d(t) = ${va(`${a}t - ${b}`)}$.`, u: "minutes" },
  { d: (a, b) => `Une nageuse traverse un bassin en passant près d'une bouée. Sa distance à la bouée, en m, après $t$ secondes, est $d(t) = ${va(`${a}t - ${b}`)}$.`, u: "secondes" },
  { d: (a, b) => `Un satellite passe au-dessus d'une antenne. Sa distance horizontale à l'antenne, en dizaines de km, après $t$ secondes, est $d(t) = ${va(`${a}t - ${b}`)}$.`, u: "secondes" },
  { d: (a, b) => `Un cycliste dépasse un ravitaillement. Sa distance au ravitaillement, en km, après $t$ minutes, est $d(t) = ${va(`${a}t - ${b}`)}$.`, u: "minutes" },
  { d: (a, b) => `Un robot de chantier passe devant une borne. Sa distance à la borne, en m, après $t$ secondes, est $d(t) = ${va(`${a}t - ${b}`)}$.`, u: "secondes" },
  { d: (a, b) => `Une baleine longe une côte et passe devant un phare. Sa distance au phare, en km, après $t$ heures, est $d(t) = ${va(`${a}t - ${b}`)}$.`, u: "heures" },
  { d: (a, b) => `Un ascenseur passe devant le palier d'un étage. Sa distance à ce palier, en m, après $t$ secondes, est $d(t) = ${va(`${a}t - ${b}`)}$.`, u: "secondes" },
];

export const fonctionsParIntervallesBank: TutorBankItemV4[] = [
  /* ═════════════════ fct_par_intervalles ═════════════════ */
  tpl(MP, 1, 1, "Regarde d'abord dans quel intervalle se trouve x.", () => {
    const n = un(NOMS);
    const m = deuxMorceaux();
    const x = nz(-6, 7);
    const v = x < m.k ? m.a * x + m.b : m.c * x + m.d;
    return court(
      `${poseM(n, [[aff(m.a, m.b), `x < ${m.k}`], [aff(m.c, m.d), `x \\geq ${m.k}`]])}\n\n${un([`Calcule $${n}(${x})$.`, `Que vaut $${n}(${x})$ ?`, `Quelle est l'image de $${x}$ ?`, `Donne la valeur de $${n}(${x})$.`, `Combien vaut $${n}(${x})$ ?`, `Quelle valeur prend $${n}$ pour $x$ égal à $${x}$ ?`])}`,
      v,
      expl(DEF_P, "on compare $x$ à la borne, puis on applique la bonne formule.", `$${x} ${x < m.k ? "<" : "\\geq"} ${m.k}$ : on utilise $${x < m.k ? aff(m.a, m.b) : aff(m.c, m.d)}$.`, `l'image vaut $${v}$.`),
    );
  }),
  tpl(MP, 2, 1, "Monte ou descends depuis l'abscisse jusqu'à la ligne, puis lis l'ordonnée.", () => {
    const P = brisee();
    const x = un(P.map((p) => p.x).filter((u) => Math.abs(u) < 5));
    const v = P.find((p) => p.x === x)!.y;
    return court(
      `${un(INTRO_B)} ${un([`Lis $f(${x})$.`, `Que vaut $f(${x})$ ?`, `Quelle est l'image de $${x}$ ?`, `Quelle valeur prend $f$ en $${x}$ ?`, `Quelle est l'ordonnée du point de la courbe d'abscisse $${x}$ ?`])}`,
      v,
      expl(DEF_P, "on lit le sommet de la ligne à cette abscisse.", `Au-dessus de $${x}$, la ligne est à la hauteur $${v}$.`, `$f(${x}) = ${v}$.`),
      figureB(P),
    );
  }),
  tpl(MP, 3, 1, "Le point plein appartient au palier, le point creux non.", () => {
    const e = escalier();
    const S = un(ESC);
    const i = entre(0, e.vals.length - 1);
    const x = un([e.bornes[i + 1], e.bornes[i] + 0.5]);
    const v = e.vals[i];
    return court(
      `${S.d} Le dessin donne ${S.y} en fonction de ${S.x}. ${un([`Que vaut ${S.y} pour la valeur $${nL(x)}$ ?`, `Lis ${S.y} quand l'abscisse vaut $${nL(x)}$.`, `Quelle hauteur a le palier à l'abscisse $${nL(x)}$ ?`])}`,
      v,
      expl("une fonction en escalier est constante sur chaque intervalle ; le point plein dit à quel palier appartient la borne.", "on cherche le palier au-dessus de l'abscisse, en regardant le point plein.", `À l'abscisse $${nL(x)}$, le palier est à la hauteur $${v}$.`, `la valeur est $${v}$.`),
      figureEsc(e),
    );
  }),
  tpl(MP, 4, 2, "Prends deux points du segment : le coefficient, puis l'ordonnée à l'origine.", () => {
    const P = brisee();
    const i = entre(0, P.length - 2);
    const [A, B] = [P[i], P[i + 1]];
    const dy = B.y - A.y;
    const dx = B.x - A.x;
    const g = dy / dx;
    const num = g * 2;
    const b2 = 2 * A.y - num * A.x;
    const j = exprDemi(num, b2);
    return qcm(
      `${un(INTRO_B)} ${un([`Quelle est son expression sur $${interL(A.x, B.x)}$ ?`, `Sur $${interL(A.x, B.x)}$, que vaut $f(x)$ ?`, `Quelle formule donne $f(x)$ pour $x$ dans $${interL(A.x, B.x)}$ ?`, `Sur l'intervalle $${interL(A.x, B.x)}$, quelle expression convient ?`])}`,
      `$${j}$`,
      [exprDemi(-num, b2), exprDemi(num, -b2), exprDemi(num, b2 + 2), exprDemi(num + 2, b2), exprDemi(num - 2, b2)].filter((x) => x !== j).map((x) => `$${x}$`),
      expl(DEF_L, "on lit deux points du segment.", `$(${A.x}\\,;${A.y})$ et $(${B.x}\\,;${B.y})$ : coefficient $${fracL(dy, dx)}$.`, `$f(x) = ${j}$.`),
      figureB(P),
    );
  }),
  tpl(MP, 5, 2, "Cherche la solution dans chaque morceau, et garde celle qui respecte sa condition.", () => {
    for (;;) {
      const n = un(NOMS);
      const m = deuxMorceaux();
      if (!m.c || m.a * m.c < 0) continue;
      const x0 = nz(-7, 8);
      if (x0 === m.k) continue;
      const v = x0 < m.k ? m.a * x0 + m.b : m.c * x0 + m.d;
      return court(
        `${poseM(n, [[aff(m.a, m.b), `x < ${m.k}`], [aff(m.c, m.d), `x \\geq ${m.k}`]])}\n\n${un([`Résous $${n}(x) = ${v}$ : quelle est la solution ?`, `Quel nombre a pour image $${v}$ ?`, `Quel est l'antécédent de $${v}$ ?`, `Pour quelle valeur de $x$ a-t-on $${n}(x) = ${v}$ ?`, `Quelle valeur de $x$ donne $${v}$ ?`])}`,
        x0,
        expl(DEF_P, "on résout dans chaque morceau et on vérifie la condition.", `Le morceau qui convient donne $x = ${x0}$.`, `la solution est $${x0}$.`),
      );
    }
  }),
  tpl(MP, 6, 2, "Sur chaque palier, f est constante : lis sa hauteur et ses bornes.", () => {
    const e = escalier();
    const n = e.vals.length;
    const l = (ouvert: boolean): [string, string][] => e.vals.map((v, i) => [String(v), ouvert ? `${e.bornes[i]} \\leq x < ${e.bornes[i + 1]}` : `${e.bornes[i]} < x \\leq ${e.bornes[i + 1]}`]);
    const ech = e.vals.map((_, i) => e.vals[(i + 1) % n]);
    const dec: [string, string][] = e.vals.map((v, i) => [String(v + 1), `${e.bornes[i]} < x \\leq ${e.bornes[i + 1]}`]);
    const per: [string, string][] = ech.map((v, i) => [String(v), `${e.bornes[i]} < x \\leq ${e.bornes[i + 1]}`]);
    const debut = [`Voici une fonction en escalier $f$.`, `Le dessin montre les paliers d'une fonction $f$.`, `Cette courbe en paliers représente une fonction $f$.`, `Ce dessin donne une fonction $f$ constante par intervalles.`];
    return qcm(
      `${un(debut)} ${un(["Quelle expression lui correspond ?", "Quelle écriture par morceaux convient ?", "Laquelle de ces écritures la décrit ?", "Comment écrire $f(x)$ par intervalles ?"])}`,
      `$f(x) = ${casQ(l(false))}$`,
      [`$f(x) = ${casQ(l(true))}$`, `$f(x) = ${casQ(dec)}$`, `$f(x) = ${casQ(per)}$`],
      expl("une fonction en escalier est constante sur chaque intervalle.", "on lit chaque palier ; le point plein est la borne incluse.", `Ici, la borne de droite est incluse.`, `chaque palier s'écrit $b_i < x \\leq b_{i+1}$.`),
      figureEsc(e),
    );
  }),
  tpl(MP, 7, 3, "Compte les tranches commencées : une tranche à peine entamée compte en entier.", () => {
    const S = un(TRANCHES);
    const k = entre(2, 6);
    const t = un([2, 3, 4, 5, 10]);
    const n = entre(2, 12);
    const x = t * (n - 1) + entre(1, t);
    const v = n * k;
    return court(
      `${S.d(k, t)} ${un([`Combien en faut-il pour $${x}$ ${S.u} ?`, `Que donne cette règle pour $${x}$ ${S.u} ?`, `Quelle quantité prévoit-on pour $${x}$ ${S.u} ?`, `Calcule la valeur de cette fonction en escalier pour $${x}$ ${S.u}.`])}`,
      v,
      expl("une fonction en escalier est constante sur chaque tranche.", "on compte les tranches commencées, puis on multiplie.", `$${x} \\div ${t}$ donne $${n}$ tranches commencées, et $${n} \\times ${k} = ${v}$.`, `on obtient $${v}$.`),
    );
  }),
  tpl(MP, 8, 3, "Écris que les deux formules donnent la même valeur à la borne.", () => {
    const n = un(NOMS);
    const m = deuxMorceaux();
    const c = m.c || nz(-3, 3);
    const d = m.y - c * m.k;
    return court(
      `Soit la fonction :\n\n$${n}(x) = ${cas([[aff(m.a, m.b), `x < ${m.k}`], [`${c === 1 ? "" : c === -1 ? "-" : c}x + m`, `x \\geq ${m.k}`]])}$\n\n${un(["Pour quelle valeur de $m$ les deux segments se raccordent-ils ?", "Quelle valeur de $m$ évite un saut à la borne ?", "Pour quel $m$ la courbe se trace-t-elle sans lever le crayon ?", "Que vaut $m$ pour que la courbe soit d'un seul tenant ?", "Quelle valeur de $m$ rend les deux morceaux égaux à la borne ?"])}`,
      d,
      expl(DEF_P, `à la borne $${m.k}$, les deux formules doivent donner la même valeur.`, `$${m.a} \\times ${pm(m.k)} + ${pm(m.b)} = ${c} \\times ${pm(m.k)} + m$.`, `$m = ${d}$.`),
    );
  }),
  tpl(MP, 9, 3, "Écris une formule par intervalle : quelle quantité jusqu'au seuil, et combien par unité ensuite.", () => {
    const G = un(GARDES);
    const s = un([2, 3, 4, 5, 6, 8, 10]);
    const q0 = entre(1, 9);
    const p1 = entre(2, 6);
    let p2 = entre(1, 6);
    if (p2 === p1) p2 = p1 + 1;
    const J = [
      [aff(p1, q0), `0 \\leq x \\leq ${s}`],
      [aff(p2, q0 + (p1 - p2) * s), `x > ${s}`],
    ] as [string, string][];
    const faux1: [string, string][] = [[aff(p1, q0), `0 \\leq x \\leq ${s}`], [aff(p2, q0), `x > ${s}`]];
    const faux2: [string, string][] = [[aff(p2, q0), `0 \\leq x \\leq ${s}`], [aff(p1, q0 + (p2 - p1) * s), `x > ${s}`]];
    const faux3: [string, string][] = [[aff(p1, 0), `0 \\leq x \\leq ${s}`], [aff(p2, 0), `x > ${s}`]];
    return qcm(
      `${G(q0, p1, s, p2)} ${un(["Quelle expression donne la valeur atteinte $T(x)$ ?", "Quelle écriture par intervalles convient pour la valeur atteinte $T(x)$ ?", "Comment écrire la valeur atteinte $T(x)$ ?", "Quelle fonction par morceaux donne la valeur $T(x)$ atteinte ?"])}`,
      `$T(x) = ${casQ(J)}$`,
      [`$T(x) = ${casQ(faux1)}$`, `$T(x) = ${casQ(faux2)}$`, `$T(x) = ${casQ(faux3)}$`],
      expl(DEF_P, "au-delà du seuil, on garde tout ce qui est déjà acquis au seuil et on ajoute le nouveau rythme.", `Au seuil : $${p1} \\times ${s} + ${q0} = ${p1 * s + q0}$. Au-delà : $${p1 * s + q0} + ${p2}(x - ${s})$.`, `$T(x) = ${cas(J)}$.`),
    );
  }),

  /* ═════════════════ abs_affine_morceaux ═════════════════ */
  tpl(MA, 1, 1, "Le sommet est là où le contenu s'annule.", () => {
    const { a, k, b } = tirerA();
    const E = aff(a, b);
    return court(
      `${un(INTRO_A)} ${SYMB(va(E))}.\n\n${un(["Pour quelle valeur de $x$ le contenu des barres s'annule-t-il ?", "Quelle est l'abscisse du sommet de sa courbe ?", "En quelle abscisse sa courbe change-t-elle de direction ?", "Quelle valeur de $x$ sépare les deux morceaux ?", "Pour quel $x$ atteint-elle son minimum ?"])}`,
      k,
      expl(DEF_A, "on résout : contenu égal à $0$.", `$${E} = 0$ donne $x = ${k}$.`, `l'abscisse cherchée est $${k}$.`),
    );
  }),
  tpl(MA, 2, 1, "Calcule le contenu, puis enlève son signe.", () => {
    const { a, b } = tirerA(true);
    const x = entre(-6, 6);
    const n = un(NOMS);
    const v = Math.abs(a * x + b);
    return court(
      `Soit $${n}(x) = ${va(aff(a, b))}$. ${un([`Calcule $${n}(${x})$.`, `Que vaut $${n}(${x})$ ?`, `Quelle est l'image de $${x}$ ?`, `Donne la valeur de $${n}(${x})$.`, `Combien vaut $${n}(${x})$ ?`])}`,
      v,
      expl(DEF_A, "on remplace, puis on prend la valeur absolue.", `$${a} \\times ${pm(x)} + ${pm(b)} = ${a * x + b}$.`, `l'image vaut $${v}$.`),
    );
  }),
  tpl(MA, 3, 1, "À droite du sommet, le contenu est positif (si a > 0) : les barres s'enlèvent sans rien changer.", () => {
    const { a, k, b } = tirerA();
    const droite = un([true, false]);
    const j = droite ? aff(a, b) : aff(-a, -b);
    return qcm(
      `Pour $x ${droite ? "\\geq" : "\\leq"} ${k}$, ${un(["comment s'écrit", "à quoi est égal", "que vaut", "que devient", "quelle est l'écriture sans barres de"])} :\n\n$${va(aff(a, b))}$\n\n${un(["Choisis la bonne expression.", "Quelle expression convient ?", "Quelle écriture est juste ?", "Laquelle de ces expressions convient ?"])}`,
      `$${j}$`,
      [aff(a, b), aff(-a, -b), aff(a, -b), aff(-a, b)].filter((x) => x !== j).map((x) => `$${x}$`),
      expl(DEF_A, "on regarde le signe du contenu sur cet intervalle.", `Le contenu est ${droite ? "positif" : "négatif"} ${droite ? "à droite" : "à gauche"} de $${k}$.`, `on obtient $${j}$.`),
    );
  }),
  tpl(MA, 4, 2, "Une formule de chaque côté du sommet : A à droite et −A à gauche.", () => {
    const { a, k, b } = tirerA();
    const n = un(NOMS);
    const j: [string, string][] = [[aff(-a, -b), `x < ${k}`], [aff(a, b), `x \\geq ${k}`]];
    return qcm(
      `On pose $${n}(x) = ${va(aff(a, b))}$. ${un(["Quelle écriture par morceaux lui est égale ?", "Comment l'écrire sans barres ?", "Quelle est son expression par intervalles ?", "Laquelle de ces écritures par morceaux est juste ?", "Écris-la sur deux intervalles : quelle écriture obtient-on ?"])}`,
      `$${n}(x) = ${casQ(j)}$`,
      [
        `$${n}(x) = ${casQ([[aff(a, b), `x < ${k}`], [aff(-a, -b), `x \\geq ${k}`]])}$`,
        `$${n}(x) = ${casQ([[aff(-a, b), `x < ${k}`], [aff(a, b), `x \\geq ${k}`]])}$`,
        `$${n}(x) = ${casQ([[aff(-a, -b), `x < ${-k}`], [aff(a, b), `x \\geq ${-k}`]])}$`,
      ],
      expl(DEF_A, "le contenu s'annule au sommet : il est négatif à gauche, positif à droite.", `Il s'annule en $x = ${k}$.`, `à gauche $${aff(-a, -b)}$, à droite $${aff(a, b)}$.`),
    );
  }),
  tpl(MA, 5, 2, "Le sommet a pour abscisse la valeur qui annule le contenu, et pour ordonnée ce qu'on ajoute.", () => {
    const { a, k, b } = tirerA(true);
    const c = nz(-5, 5);
    const n = un(NOMS);
    const P = (x: number, y: number) => `$(${x}\\,;${y})$`;
    return qcm(
      `On pose $${n}(x) = ${va(aff(a, b))} ${c < 0 ? "-" : "+"} ${Math.abs(c)}$. ${un(["Quel est le sommet de sa courbe ?", "Quelles sont les coordonnées du sommet de sa courbe ?", "En quel point sa courbe change-t-elle de direction ?", "Où se trouve la pointe de sa courbe ?", "En quel point atteint-elle son minimum ?"])}`,
      P(k, c),
      [P(-k, c), P(k, -c), P(-k, -c), P(c, k), P(k, 0)].filter((x) => x !== P(k, c)),
      expl(DEF_A, "le contenu s'annule au sommet ; la valeur absolue y vaut $0$.", `$${aff(a, b)} = 0$ donne $x = ${k}$, et $${n}(${k}) = ${c}$.`, `le sommet est ${P(k, c)}.`),
    );
  }),
  tpl(MA, 6, 2, "Repère le sommet, puis la pente d'une demi-droite.", () => {
    const a = un([1, 2, 3]);
    const k = nz(-3, 3);
    const b = -a * k;
    const fig = repere([VVV(a, k, 0)], { xmin: -7, xmax: 7, ymin: -2, ymax: 7 });
    const f = (A: number, B: number) => `$x \\mapsto \\nobreak ${va(aff(A, B))}$`;
    const J = f(a, b);
    return qcm(
      `${un(["Voici une courbe en forme de V.", "Le dessin montre deux demi-droites qui se rejoignent sur l'axe des abscisses.", "Cette courbe représente une fonction avec une valeur absolue.", "Ce repère montre la courbe d'une fonction $x \\mapsto |ax + b|$."])} ${un(["Quelle fonction est représentée ?", "Quelle formule lui correspond ?", "De quelle fonction est-ce la courbe ?", "Laquelle de ces fonctions a cette courbe ?"])}`,
      J,
      [f(a, -b), f(a === 1 ? 2 : 1, a === 1 ? -2 * k : -k), f(a === 3 ? 2 : 3, a === 3 ? -2 * k : -3 * k), f(a, b + 1), f(a === 1 ? 2 : 1, b)].filter((x) => x !== J),
      expl(DEF_A, "le sommet donne la valeur qui annule le contenu ; la pente à droite donne le coefficient.", `Sommet en $x = ${k}$, pente $${a}$.`, `c'est ${J}.`),
      fig,
    );
  }),
  tpl(MA, 7, 3, "La pointe donne le nombre ajouté ; une demi-droite donne le coefficient.", () => {
    const a = un([1, 2, 3]);
    const k = nz(-3, 3);
    const c = nz(-3, 3);
    const b = -a * k;
    const fig = repere([VVV(a, k, c)], { xmin: -7, xmax: 7, ymin: -5, ymax: 7 });
    const g = (A: number, B: number, C: number) => `$g(x) = {${va(aff(A, B))} ${C < 0 ? "-" : "+"} ${Math.abs(C)}}$`;
    const J = g(a, b, c);
    return qcm(
      `${un(["La courbe de $g$ est faite de deux demi-droites.", "Voici la courbe en V d'une fonction $g$.", "Le dessin montre une fonction $g$ construite avec une valeur absolue."])} ${un(["Quelle est son expression ?", "Quelle formule convient ?", "Laquelle de ces expressions lui correspond ?", "Quelle écriture de $g(x)$ est juste ?"])}`,
      J,
      [g(a, b, -c), g(a, -b, c), g(a === 1 ? 2 : 1, a === 1 ? -2 * k : -k, c), g(a, -b, -c)].filter((x) => x !== J),
      expl(DEF_A, "on lit le sommet, puis la pente.", `Sommet $(${k}\\,;${c})$, pente $${a}$ à droite.`, `${J}.`),
      fig,
    );
  }),
  tpl(MA, 8, 3, "Entre les deux valeurs, chaque barre se simplifie : les x s'annulent.", () => {
    const p = entre(-6, 2);
    const q = p + entre(2, 7);
    const zone = un(["milieu", "milieu", "droite", "gauche"]);
    const P = (s: number) => (s < 0 ? `x + ${-s}` : s === 0 ? "x" : `x - ${s}`);
    const E = `${va(P(p))} + ${va(P(q))}`;
    const cond = zone === "milieu" ? `${p} \\leq x \\leq ${q}` : zone === "droite" ? `x \\geq ${q}` : `x \\leq ${p}`;
    const j = zone === "milieu" ? String(q - p) : zone === "droite" ? aff(2, -p - q) : aff(-2, p + q);
    return qcm(
      `Pour $${cond}$, ${un(["que vaut", "à quoi est égal", "comment s'écrit sans barres", "comment se simplifie"])} :\n\n$${E}$\n\n${un(["Choisis la bonne expression.", "Quelle expression convient ?", "Quelle écriture est juste ?", "Laquelle de ces expressions convient ?"])}`,
      `$${j}$`,
      [String(q - p), String(p + q), aff(2, -p - q), aff(-2, p + q), aff(2, p + q), String(p - q)].filter((x) => x !== j).map((x) => `$${x}$`),
      expl("sur chaque intervalle, $|A|$ vaut $A$ ou $-A$ selon le signe de $A$. Une somme de deux valeurs absolues est donc affine par intervalles.", "on étudie le signe de chaque contenu.", `Avec $${cond}$, on enlève les barres en tenant compte des signes.`, `on obtient $${j}$.`),
    );
  }),
  tpl(MA, 9, 3, "La distance s'annule au passage ; après, le contenu est positif.", () => {
    const M = un(MOBS);
    const a = entre(2, 9);
    const t0 = entre(2, 12);
    const b = a * t0;
    const q = un(["passage", "avant", "apres"]);
    const texte = M.d(a, b);
    if (q === "passage") return court(`${texte} ${un(["À quel instant cette distance est-elle la plus petite ?", "Pour quelle valeur de $t$ cette distance s'annule-t-elle ?", "Quel est l'instant du passage ?"])}`, t0, expl(DEF_A, "la distance est nulle quand le contenu est nul.", `$${a}t - ${b} = 0$ donne $t = ${t0}$.`, `$t = ${t0}$ ${M.u}.`));
    const dt = entre(1, Math.min(t0, 5));
    const t = q === "avant" ? t0 - dt : t0 + dt;
    const j = q === "avant" ? `${b} - ${a}t` : `${a}t - ${b}`;
    return qcm(
      `${texte} ${q === "avant" ? un([`Pour $t \\leq ${t0}$, comment s'écrit $d(t)$ sans barres ?`, `Avant le passage, soit pour $t \\leq ${t0}$, quelle expression donne $d(t)$ ?`]) : un([`Pour $t \\geq ${t0}$, comment s'écrit $d(t)$ sans barres ?`, `Après le passage, soit pour $t \\geq ${t0}$, quelle expression donne $d(t)$ ?`])}`,
      `$d(t) = ${j}$`,
      [`${a}t - ${b}`, `${b} - ${a}t`, `${a}t + ${b}`, `${b}t - ${a}`].filter((x) => x !== j).map((x) => `$d(t) = ${x}$`),
      expl(DEF_A, "on regarde le signe du contenu sur cet intervalle.", `En $t = ${t}$, le contenu vaut $${a * t - b}$.`, `$d(t) = ${j}$.`),
    );
  }),
];

/** (n/2) x + b/2, écrit proprement. */
function exprDemi(n: number, b2: number) {
  if (!n) return b2 % 2 ? fracL(b2, 2) : String(b2 / 2);
  const d = droiteL(n, 2, 0);
  if (!b2) return d;
  const v = Math.abs(b2);
  return `${d} ${b2 < 0 ? "-" : "+"} ${v % 2 ? fracL(v, 2) : v / 2}`;
}

/* Une règle à seuil, sans argent : une quantité de départ, un rythme jusqu'au seuil, un autre ensuite. */
const GARDES: ((q0: number, p1: number, s: number, p2: number) => string)[] = [
  (q, p, s, r) => `Une piscine contient ${q} m³ d'eau. On la remplit à ${p} m³ par heure pendant les ${s} premières heures, puis à ${r} m³ par heure. On note $x$ le temps écoulé, en heures.`,
  (q, p, s, r) => `Un alpiniste part à ${q} centaine${q > 1 ? "s" : ""} de mètres. Il monte de ${p} centaine${p > 1 ? "s" : ""} de mètres par heure pendant ${s} heures, puis de ${r} par heure. On note $x$ le temps, en heures.`,
  (q, p, s, r) => `Une imprimante a déjà sorti ${q} page${q > 1 ? "s" : ""}. Elle en sort ${p} par minute pendant ${s} minutes, puis ${r} par minute. On note $x$ le temps, en minutes.`,
  (q, p, s, r) => `Une plante mesure ${q} cm. Elle pousse de ${p} cm par semaine pendant ${s} semaines, puis de ${r} cm par semaine. On note $x$ le nombre de semaines.`,
  (q, p, s, r) => `Une coureuse a déjà fait ${q} km. Elle court ${p} km par heure pendant ${s} heures, puis ${r} km par heure. On note $x$ le temps, en heures.`,
  (q, p, s, r) => `Un barrage retient ${q} million${q > 1 ? "s" : ""} de m³. Il reçoit ${p} million${p > 1 ? "s" : ""} de m³ par jour pendant ${s} jours, puis ${r} million${r > 1 ? "s" : ""} par jour. On note $x$ le nombre de jours.`,
  (q, p, s, r) => `Un réservoir contient ${q} L de carburant. On le remplit à ${p} L par minute pendant ${s} minutes, puis à ${r} L par minute. On note $x$ le temps, en minutes.`,
  (q, p, s, r) => `Une chorale a appris ${q} chant${q > 1 ? "s" : ""}. Elle en apprend ${p} par mois pendant ${s} mois, puis ${r} par mois. On note $x$ le nombre de mois.`,
  (q, p, s, r) => `Un musicien a déjà ${q} morceau${q > 1 ? "x" : ""}. Il en compose ${p} par mois pendant ${s} mois, puis ${r} par mois. On note $x$ le nombre de mois.`,
  (q, p, s, r) => `Un apiculteur a récolté ${q} kg de miel. Il en récolte ${p} kg par semaine pendant ${s} semaines, puis ${r} kg par semaine. On note $x$ le nombre de semaines.`,
];
