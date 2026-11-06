// ENCADRER UNE SOMME, UNE DIFFÉRENCE, UN PRODUIT, UN QUOTIENT À PARTIR D'ENCADREMENTS DONNÉS (06/11/2026).
// Hors programme français comme savoir-faire nommé (registre `hors_france`). Lignes visées : Maroc 3AC S1-4 et
// TC I-3c, Sénégal 2nde AN 2, Côte d'Ivoire 3e C1-L3. `reels_encadrement` encadre UN réel ; ici on opère.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, fr, nL, phrase, qcm, un } from "../../lycee-commun";

const tpl = fabrique("seconde", "encadrements_operations", "2de_");
const M = "encadrer_somme_produit";

/* ───────────────── tirages ───────────────── */

const PAIRES: [string, string][] = [["x", "y"], ["x", "y"], ["a", "b"], ["u", "v"], ["s", "t"], ["p", "q"]];
type Enc = { g: number; d: number };
/** Un encadrement au dixième ou entier ; `pos` : bornes positives. */
function enc(pos: boolean, entier = false): Enc {
  const pas = entier ? 1 : un([1, 0.1, 0.1]);
  const g = pos ? entre(entier ? 1 : 2, 30) * pas + (entier ? 0 : pas === 1 ? 0 : 1) : entre(-30, 30) * pas;
  const larg = pas === 1 ? entre(1, 4) : entre(1, 6) * 0.1;
  return { g: Math.round(g * 10) / 10, d: Math.round((g + larg) * 10) / 10 };
}
const rel = (strict: boolean) => (strict ? "<" : "\\leq");
const ecrit = (e: Enc, l: string, strict: boolean) => `${nL(e.g)} ${rel(strict)} ${l} ${rel(strict)} ${nL(e.d)}`;
const pm = (v: number) => (v < 0 ? `(${nL(v)})` : nL(v));
const encE = (g: number, E: string, d: number, strict: boolean) => `$\\footnotesize ${nL(g)} ${rel(strict)} ${E} ${rel(strict)} ${nL(d)}$`;

const INTRO = ["On sait que :", "On donne :", "Deux nombres vérifient :", "Des mesures donnent :", "On connaît ces encadrements :", "Voici deux encadrements :"];
const donnees = (a: Enc, l1: string, c: Enc, l2: string, strict: boolean) => `${un(INTRO)}\n\n$${ecrit(a, l1, strict)}$ et $${ecrit(c, l2, strict)}$`;

const BAS = ["Quelle est la borne inférieure de cet encadrement ?", "Que vaut sa borne inférieure ?", "Quel nombre obtiens-tu à gauche ?", "Quel est le nombre de gauche ?", "Quel nombre écris-tu à gauche ?"];
const HAUT = ["Quelle est la borne supérieure de cet encadrement ?", "Que vaut sa borne supérieure ?", "Quel nombre obtiens-tu à droite ?", "Quel est le nombre de droite ?", "Quel nombre écris-tu à droite ?"];
const qBorne = (E: string, bas: boolean) =>
  phrase([`Déduis-en un encadrement de $${E}$.`, `On encadre $${E}$.`, `Encadre $${E}$ à partir de ces données.`, `On cherche un encadrement de $${E}$.`, `Écris l'encadrement de $${E}$ qu'on en déduit.`], bas ? BAS : HAUT);
const qEnc = (E: string) =>
  un([
    `Quel encadrement de $${E}$ en déduit-on ?`,
    `Quel encadrement de $${E}$ obtient-on par les règles de l'ordre ?`,
    `Lequel de ces encadrements de $${E}$ est le bon ?`,
    `Comment s'encadre $${E}$ ?`,
    `Quel est l'encadrement de $${E}$ qui découle de ces données ?`,
    `Quel encadrement est correct pour $${E}$ ?`,
  ]);

const DEF_S = "si $a < x < b$ et $c < y < d$, alors $a + c < x + y < b + d$ : on ajoute membre à membre.";
const DEF_D = "pour encadrer $x - y$, on encadre d'abord $-y$ : si $c < y < d$, alors $-d < -y < -c$. Puis on ajoute : $a - d < x - y < b - c$.";
const DEF_P = "pour des nombres POSITIFS, si $a < x < b$ et $c < y < d$, alors $ac < xy < bd$ : on multiplie membre à membre.";
const DEF_Q = "pour des nombres POSITIFS, si $c < y < d$, alors $\\dfrac{1}{d} < \\dfrac{1}{y} < \\dfrac{1}{c}$. D'où $\\dfrac{a}{d} < \\dfrac{x}{y} < \\dfrac{b}{c}$ : on croise les bornes.";

/** Quatre encadrements, le juste et des pièges tous différents. */
function choix(E: string, juste: [number, number], faux: [number, number][], strict: boolean) {
  const t = (p: [number, number]) => encE(p[0], E, p[1], strict);
  const ecart = (f: [number, number]) => Math.abs(f[0] - juste[0]) > 1e-9 || Math.abs(f[1] - juste[1]) > 1e-9;
  const propres = faux.map((f): [number, number] => (f[0] <= f[1] ? f : [f[1], f[0]])).filter((f) => f[1] - f[0] > 1e-9 && ecart(f));
  const vus = [...new Set(propres.map(t))];
  // Pas assez de pièges tenables : on élargit le juste d'une unité, puis de deux.
  for (const p of [1, 2]) if (vus.length < 3) vus.push(t([juste[0] - p, juste[1] + p]));
  return { juste: t(juste), faux: vus };
}

/* ───────────────── situations ───────────────── */

type Rect = { n: string; u: string; L: [number, number]; l: [number, number] };
const RECTS: Rect[] = [
  { n: "Un terrain de volley", u: "m", L: [17, 19], l: [8, 9] },
  { n: "Une toile de peintre", u: "dm", L: [8, 14], l: [5, 7] },
  { n: "Un panneau solaire", u: "dm", L: [15, 19], l: [9, 12] },
  { n: "Un potager", u: "m", L: [6, 12], l: [3, 5] },
  { n: "Une vitre d'atelier", u: "dm", L: [10, 16], l: [6, 9] },
  { n: "Un tapis de judo", u: "m", L: [8, 11], l: [6, 7] },
  { n: "Un écran de cinéma", u: "m", L: [10, 15], l: [5, 7] },
  { n: "Une plaque de cuivre", u: "cm", L: [20, 40], l: [10, 15] },
  { n: "Une parcelle de vigne", u: "dam", L: [9, 14], l: [4, 7] },
  { n: "Un bassin de pisciculture", u: "m", L: [12, 20], l: [5, 9] },
  { n: "Le plateau d'une table de montage", u: "dm", L: [12, 18], l: [6, 8] },
];
type Vit = { d: (a: number, b: number, c: number, e: number) => string; q: string; s: string };
const VITS: Vit[] = [
  { d: (a, b, c, e) => `Une cycliste parcourt entre ${a} et ${b} km en une durée comprise entre ${c} et ${e} heures.`, q: "sa vitesse moyenne $v$, en km/h", s: "v" },
  { d: (a, b, c, e) => `Un train de marchandises roule sur une distance comprise entre ${a} et ${b} km, pendant une durée comprise entre ${c} et ${e} heures.`, q: "sa vitesse moyenne $v$, en km/h", s: "v" },
  { d: (a, b, c, e) => `Un drone vole sur une distance comprise entre ${a} et ${b} m, pendant une durée comprise entre ${c} et ${e} secondes.`, q: "sa vitesse moyenne $v$, en m/s", s: "v" },
  { d: (a, b, c, e) => `Une imprimante sort entre ${a} et ${b} pages en un temps compris entre ${c} et ${e} minutes.`, q: "son débit $D$, en pages par minute", s: "D" },
  { d: (a, b, c, e) => `Un robinet remplit une cuve de ${a} à ${b} L en un temps compris entre ${c} et ${e} minutes.`, q: "son débit $D$, en L/min", s: "D" },
  { d: (a, b, c, e) => `Un objet a une masse comprise entre ${a} et ${b} g et un volume compris entre ${c} et ${e} cm³.`, q: "sa masse volumique $\\rho$, en g/cm³", s: "\\rho" },
  { d: (a, b, c, e) => `Une récolte de ${a} à ${b} kg de café provient d'un champ d'une surface comprise entre ${c} et ${e} ares.`, q: "le rendement $R$, en kg par are", s: "R" },
  { d: (a, b, c, e) => `Une choriste chante entre ${a} et ${b} notes en un temps compris entre ${c} et ${e} secondes.`, q: "le rythme $R$, en notes par seconde", s: "R" },
  { d: (a, b, c, e) => `Une coureuse couvre entre ${a} et ${b} km en une durée comprise entre ${c} et ${e} heures.`, q: "sa vitesse moyenne $v$, en km/h", s: "v" },
  { d: (a, b, c, e) => `Une équipe pose entre ${a} et ${b} m de câble en un temps compris entre ${c} et ${e} heures.`, q: "son rythme $R$, en mètres par heure", s: "R" },
];
const RACINES = [2, 3, 5, 6, 7];
const encRacine = (n: number) => {
  const g = Math.floor(Math.sqrt(n) * 100) / 100;
  return { g, d: Math.round((g + 0.01) * 100) / 100 };
};

/* ───────────────── banque ───────────────── */

export const encadrementsOperationsBank: TutorBankItemV4[] = [
  /* ─────────── ★1 : somme, produit de positifs ─────────── */
  tpl(M, 1, 1, "Pour une somme, on ajoute les bornes de gauche entre elles, puis celles de droite.", () => {
    const [x, y] = un(PAIRES);
    const a = enc(false);
    const c = enc(false);
    const strict = un([true, false]);
    const bas = un([true, false]);
    const E = `${x} + ${y}`;
    const v = bas ? a.g + c.g : a.d + c.d;
    return court(`${donnees(a, x, c, y, strict)}\n\n${qBorne(E, bas)}`, Math.round(v * 10) / 10, expl(DEF_S, "on ajoute membre à membre.", `${encE(a.g + c.g, E, a.d + c.d, strict)}.`, `la borne cherchée vaut $${nL(v)}$.`));
  }),
  tpl(M, 2, 1, "On ajoute gauche avec gauche, droite avec droite.", () => {
    const [x, y] = un(PAIRES);
    const a = enc(false);
    const c = enc(false);
    const strict = un([true, false]);
    const E = `${x} + ${y}`;
    const r = (v: number) => Math.round(v * 10) / 10;
    const { juste, faux } = choix(E, [r(a.g + c.g), r(a.d + c.d)], [[r(a.g + c.d), r(a.d + c.g)], [r(a.g + c.g), r(a.d + c.g)], [r(a.g + c.d), r(a.d + c.d)], [r(a.g - c.g), r(a.d - c.d)]], strict);
    return qcm(`${donnees(a, x, c, y, strict)}\n\n${qEnc(E)}`, juste, faux, expl(DEF_S, "on ajoute les deux bornes de gauche, puis les deux bornes de droite.", `$${nL(a.g)} + ${pm(c.g)}$ à gauche et $${nL(a.d)} + ${pm(c.d)}$ à droite.`, `${juste}.`));
  }),
  tpl(M, 3, 1, "Tout est positif : on multiplie gauche par gauche, droite par droite.", () => {
    const [x, y] = un(PAIRES);
    const a = enc(true, true);
    const c = enc(true, true);
    a.g = Math.min(a.g, 12);
    a.d = a.g + entre(1, 4);
    c.g = Math.min(c.g, 12);
    c.d = c.g + entre(1, 4);
    const strict = un([true, false]);
    const bas = un([true, false]);
    const E = un([`${x}${y}`, `${x} \\times ${y}`]);
    const v = bas ? a.g * c.g : a.d * c.d;
    return court(`${donnees(a, x, c, y, strict)}\n\n${qBorne(E, bas)}`, v, expl(DEF_P, "les bornes sont positives : on multiplie membre à membre.", `${encE(a.g * c.g, E, a.d * c.d, strict)}.`, `la borne cherchée vaut $${v}$.`));
  }),

  /* ─────────── ★2 : différence, quotient ─────────── */
  tpl(M, 4, 2, "Encadre d'abord −y : ses bornes s'échangent et changent de signe.", () => {
    const [x, y] = un(PAIRES);
    const a = enc(false);
    const c = enc(false);
    const strict = un([true, false]);
    const E = `${x} - ${y}`;
    const r = (v: number) => Math.round(v * 10) / 10;
    const { juste, faux } = choix(E, [r(a.g - c.d), r(a.d - c.g)], [[r(a.g - c.g), r(a.d - c.d)], [r(a.g - c.d), r(a.d - c.d)], [r(a.g - c.g), r(a.d - c.g)], [r(a.g + c.g), r(a.d + c.d)]], strict);
    return qcm(`${donnees(a, x, c, y, strict)}\n\n${qEnc(E)}`, juste, faux, expl(DEF_D, "on change le sens de l'encadrement de $" + y + "$ en le multipliant par $-1$, puis on ajoute.", `$${nL(-c.d)} ${rel(strict)} -${y} ${rel(strict)} ${nL(-c.g)}$.`, `${juste}.`));
  }),
  tpl(M, 5, 2, "Pour x − y : gauche de x moins droite de y, droite de x moins gauche de y.", () => {
    const [x, y] = un(PAIRES);
    const a = enc(false);
    const c = enc(false);
    const strict = un([true, false]);
    const bas = un([true, false]);
    const E = `${x} - ${y}`;
    const v = Math.round((bas ? a.g - c.d : a.d - c.g) * 10) / 10;
    return court(`${donnees(a, x, c, y, strict)}\n\n${qBorne(E, bas)}`, v, expl(DEF_D, "on croise les bornes.", bas ? `$${nL(a.g)} - ${pm(c.d)} = ${nL(v)}$.` : `$${nL(a.d)} - ${pm(c.g)} = ${nL(v)}$.`, `la borne cherchée vaut $${nL(v)}$.`));
  }),
  tpl(M, 6, 2, "Pour x ÷ y (tout positif) : le plus petit quotient divise la petite borne de x par la grande de y.", () => {
    for (;;) {
      const [x, y] = un(PAIRES);
      const c = entre(2, 6);
      const d = c + entre(1, 4);
      const k = entre(1, 8);
      const l = k + entre(1, 8);
      const a = k * d;
      const b = l * c;
      if (a >= b) continue;
      const strict = un([true, false]);
      const E = `\\dfrac{${x}}{${y}}`;
      const pieges: [number, number][] = [[a - d, b - c], [a * c, b * d], [k + 1, l + 1], [k + 1, l + 2]];
      if (Number.isInteger(a / c) && Number.isInteger(b / d)) pieges.unshift([a / c, b / d]);
      const { juste, faux } = choix(E, [k, l], pieges, strict);
      return qcm(`${donnees({ g: a, d: b }, x, { g: c, d }, y, strict)}\n\n${qEnc(E)}`, juste, faux, expl(DEF_Q, "on divise la petite borne du numérateur par la grande borne du dénominateur, et l'inverse.", `$${a} \\div ${d} = ${k}$ et $${b} \\div ${c} = ${l}$.`, `${juste}.`));
    }
  }),

  /* ─────────── ★3 : en situation, expressions, racines ─────────── */
  tpl(M, 7, 3, "Encadre d'abord L + l ou L × l, puis conclus.", () => {
    const R = un(RECTS);
    const a = entre(R.L[0] * 10, R.L[1] * 10) / 10;
    const b = Math.round((a + entre(1, 3) * 0.1) * 10) / 10;
    const c = entre(R.l[0] * 10, R.l[1] * 10) / 10;
    const d = Math.round((c + entre(1, 3) * 0.1) * 10) / 10;
    const aire = un([true, false]);
    const bas = un([true, false]);
    const v = aire ? (bas ? a * c : b * d) : 2 * (bas ? a + c : b + d);
    const quoi = aire ? "son aire" : "son périmètre";
    const u = aire ? `${R.u}²` : R.u;
    return court(
      `${R.n} est rectangulaire. Les mesures donnent une longueur comprise entre ${fr(a)} et ${fr(b)} ${R.u}, et une largeur comprise entre ${fr(c)} et ${fr(d)} ${R.u}. ${phrase([`On encadre ${quoi}.`, `On veut encadrer ${quoi}.`, `Le responsable demande un encadrement de ${quoi}.`, `Encadre ${quoi}.`], bas ? ["Quelle est la borne inférieure, en " + u + " ?", "Que vaut la valeur minimale, en " + u + " ?"] : ["Quelle est la borne supérieure, en " + u + " ?", "Que vaut la valeur maximale, en " + u + " ?"])}`,
      Math.round(v * 100) / 100,
      expl(aire ? DEF_P : DEF_S, aire ? "tout est positif : on multiplie membre à membre." : "on encadre $L + l$, puis on multiplie par $2$.", aire ? `$${nL(a)} \\times ${nL(c)} = ${nL(a * c)}$ et $${nL(b)} \\times ${nL(d)} = ${nL(b * d)}$.` : `$2 \\times (${nL(a)} + ${nL(c)}) = ${nL(2 * (a + c))}$ et $2 \\times (${nL(b)} + ${nL(d)}) = ${nL(2 * (b + d))}$.`, `la valeur cherchée est $${nL(v)}$ ${u}.`),
    );
  }),
  tpl(M, 8, 3, "Le quotient est le plus petit quand on divise le petit nombre par le grand.", () => {
    for (;;) {
      const W = un(VITS);
      const c = entre(2, 6);
      const d = c + entre(1, 3);
      const k = entre(3, 15);
      const l = k + entre(1, 8);
      const a = k * d;
      const b = l * c;
      if (a >= b) continue;
      const { juste, faux } = choix(W.s, [k, l], [[a - d, b - c], [a * c, b * d], [k + 1, l + 1], [k + 1, l + 2]] as [number, number][], true);
      return qcm(
        `${W.d(a, b, c, d)} ${un([`Quel encadrement obtient-on pour ${W.q} ?`, `Comment s'encadre ${W.q} ?`, `Lequel de ces encadrements convient à ${W.q} ?`, `On veut encadrer ${W.q}. Quel encadrement est juste ?`])}`,
        juste,
        faux,
        expl(DEF_Q, "tout est positif : on divise la petite borne du haut par la grande du bas, et l'inverse.", `$${a} \\div ${d} = ${k}$ et $${b} \\div ${c} = ${l}$.`, `${juste}.`),
      );
    }
  }),
  tpl(M, 9, 3, "Encadre chaque terme : 2x d'un côté, −3y de l'autre (ses bornes s'échangent), puis ajoute.", () => {
    const [x, y] = un(PAIRES);
    const a = enc(false, true);
    const c = enc(false, true);
    const p = entre(2, 5);
    const q = entre(2, 5);
    const moins = un([true, false]);
    const strict = un([true, false]);
    const bas = un([true, false]);
    const E = `${p}${x} ${moins ? "-" : "+"} ${q}${y}`;
    const v = moins ? (bas ? p * a.g - q * c.d : p * a.d - q * c.g) : bas ? p * a.g + q * c.g : p * a.d + q * c.d;
    return court(`${donnees(a, x, c, y, strict)}\n\n${qBorne(E, bas)}`, v, expl(moins ? DEF_D : DEF_S, `on encadre $${p}${x}$ et $${moins ? "-" : ""}${q}${y}$, puis on ajoute.`, `$${p * a.g} ${rel(strict)} ${p}${x} ${rel(strict)} ${p * a.d}$.`, `la borne cherchée vaut $${v}$.`));
  }),
  tpl(M, 10, 3, "Applique les règles aux encadrements des racines donnés.", () => {
    const [n1, n2] = un(RACINES.flatMap((p) => RACINES.filter((q) => q !== p).map((q) => [p, q])));
    const A = encRacine(n1);
    const B = encRacine(n2);
    const X = `\\sqrt{${n1}}`;
    const Y = `\\sqrt{${n2}}`;
    const genre = un(["somme", "difference", "produit"]);
    const E = genre === "somme" ? `${X} + ${Y}` : genre === "difference" ? `${X} - ${Y}` : `${X} \\times ${Y}`;
    const r = (v: number) => Math.round(v * 1e4) / 1e4;
    const just: [number, number] = genre === "somme" ? [r(A.g + B.g), r(A.d + B.d)] : genre === "difference" ? [r(A.g - B.d), r(A.d - B.g)] : [r(A.g * B.g), r(A.d * B.d)];
    const pieges: [number, number][] = [[r(A.g + B.d), r(A.d + B.g)], [r(A.g - B.g), r(A.d - B.d)], [r(A.g * B.d), r(A.d * B.g)], [r(A.g + B.g), r(A.d + B.d)], [r(A.g * B.g), r(A.d * B.d)], [r(A.g - B.d), r(A.d - B.g)]];
    const { juste, faux } = choix(E, just, pieges, true);
    return qcm(
      `La calculatrice donne :\n\n$${ecrit2(A, X)}$ et $${ecrit2(B, Y)}$\n\n${qEnc(E)}`,
      juste,
      faux,
      expl(genre === "somme" ? DEF_S : genre === "difference" ? DEF_D : DEF_P, "on applique la règle de l'opération aux deux encadrements.", `On obtient ${juste}.`, `${juste}.`),
    );
  }),
  tpl(M, 11, 3, "L'amplitude est l'écart entre les deux bornes de l'encadrement obtenu.", () => {
    const [x, y] = un(PAIRES);
    const a = enc(false);
    const c = enc(false);
    const strict = un([true, false]);
    const moins = un([true, false]);
    const E = `${x} ${moins ? "-" : "+"} ${y}`;
    const v = Math.round((a.d - a.g + (c.d - c.g)) * 10) / 10;
    return court(
      `${donnees(a, x, c, y, strict)}\n\n${phrase([`On encadre $${E}$.`, `Un technicien encadre $${E}$ à partir de ces mesures.`, `À partir de ces données, on écrit un encadrement de $${E}$.`], ["Quelle est l'amplitude de l'encadrement obtenu ?", "Quel écart sépare ses deux bornes ?", "Quelle précision a-t-on alors : quelle est son amplitude ?"])}`,
      v,
      expl(moins ? DEF_D : DEF_S, "on écrit l'encadrement, puis on soustrait ses bornes. Les amplitudes s'ajoutent.", moins ? `${encE(a.g - c.d, E, a.d - c.g, strict)}.` : `${encE(a.g + c.g, E, a.d + c.d, strict)}.`, `l'amplitude vaut $${nL(v)}$.`),
    );
  }),
];

function ecrit2(e: Enc, X: string) {
  return `${nL(e.g)} < ${X} < ${nL(e.d)}`;
}
