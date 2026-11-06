// NOMBRES COMPLEXES (06/11/2026), partie CALCUL : forme algébrique, conjugué et quotient,
// module et argument. Maths expertes en France, hors tronc commun (registre `hors_france`).
// Lignes visées : Maroc 2e bac C-1, C-2 ; Sénégal Tle AG 1 ; Côte d'Ivoire Tle C1-L1.
// Le comparateur `expression_reduite` lit i comme une lettre : 3 + 2i, 2i + 3 et 3+2i
// passent, 3 + 2i + 0 et un calcul recopié non.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, lin, nL, phrase, qcm, un } from "../../lycee-commun";
import {
  aAdd, aMul, angT, aSub, coefZ, courtZ, F_ALG, F_ARG, F_EXACT, F_MOD, F_RESOUS, fauxAngles, fauxRacines, nz, plan, pose, princ, rem, remTire, signe, suite, tpl, trigT,
  zAdd, zConj, zFr, zInverse, zK, zMul, zN2, zP, zPow, zSub, zT, zTire, type A, type Z,
} from "./nombres-complexes-commun";

const M1 = "cx_forme_algebrique";
const M2 = "cx_conjugue_quotient";
const M3 = "cx_module_argument";

/* ───────────────── explications ───────────────── */

const ex1 = (calcul: string, conclusion: string) =>
  expl(
    "un nombre complexe s'écrit $a + bi$, avec $a$ et $b$ réels et $i^{2} = -1$ : $a$ est la partie réelle, $b$ la partie imaginaire.",
    "on calcule comme avec une lettre, puis on remplace $i^{2}$ par $-1$ et on regroupe.",
    calcul,
    conclusion,
  );
const ex2 = (calcul: string, conclusion: string) =>
  expl(
    "le conjugué de $z = a + bi$ est $\\overline{z} = a - bi$, et $z\\overline{z} = a^{2} + b^{2}$ est un réel positif.",
    "pour un quotient, on multiplie en haut et en bas par le conjugué du dénominateur.",
    calcul,
    conclusion,
  );
const ex3 = (calcul: string, conclusion: string) =>
  expl(
    "$\\left|a + bi\\right| = \\sqrt{a^{2} + b^{2}}$ est la distance du point image à l'origine ; un argument est l'angle orienté entre l'axe des réels et ce point.",
    "on calcule le module, puis on cherche l'angle dont le cosinus vaut $\\dfrac{a}{r}$ et le sinus $\\dfrac{b}{r}$.",
    calcul,
    conclusion,
  );

/* ───────────────── tirages ───────────────── */

const TRIPLETS: [number, number, number][] = [[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13], [8, 15, 17], [15, 8, 17], [9, 12, 15], [12, 9, 15]];
function triplet() {
  const [a, b, r] = un(TRIPLETS);
  return { z: [a * signe(), b * signe()] as Z, r };
}
/* Puissances de i : i, -1, -i, 1. */
const puissI = (n: number) => zPow([0, 1], ((n % 4) + 4) % 4);
const CHOIX_I = ["$1$", "$-1$", "$i$", "$-i$"];
const choixI = (z: Z) => `$${zT(z)}$`;

const POUR_I = [
  "Calcule cette puissance de $i$.",
  "Que vaut cette puissance de $i$ ?",
  "À quoi cette puissance de $i$ est-elle égale ?",
  "Simplifie cette puissance de $i$.",
  "Sans calculatrice, donne la valeur de cette puissance.",
  "Quelle est la valeur de ce nombre ?",
  "Divise l'exposant par 4 et donne le résultat.",
  "Lequel de ces quatre nombres est égal à cette puissance ?",
  "Écris cette puissance plus simplement.",
  "Quelle valeur prend cette puissance de $i$ ?",
  "Réduis cette écriture.",
  "Trouve la valeur de cette puissance.",
];
const parties = (w: string) => [
  `Quelle est la partie ${w} de ce nombre complexe ?`,
  `Donne la partie ${w} de ce nombre.`,
  `Lis la partie ${w} de ce nombre.`,
  `Que vaut la partie ${w} de ce complexe ?`,
  `Écris la partie ${w} de ce nombre complexe.`,
  `Repère la partie ${w} de ce nombre.`,
  `Sans calcul, donne la partie ${w} de ce nombre.`,
  `Quel réel est la partie ${w} de ce nombre ?`,
  `Indique la partie ${w} de ce complexe.`,
  `Ce nombre a une partie ${w}. Laquelle ?`,
];

/* Situations où les complexes servent : l'écriture du calcul reste dans l'énoncé. */
type Sit = { t: string; f: string; val: Z };
const SITUATIONS: (() => Sit)[] = [
  () => {
    const c = zTire(2);
    const u0 = zTire(2);
    return { t: `Pour dessiner une fractale, un programme part de $z_{0} = ${zT(u0)}$ et de $c = ${zT(c)}$, puis calcule le terme suivant.`, f: "z_{1} = z_{0}^{2} + c", val: zAdd(zMul(u0, u0), c) };
  },
  () => {
    const c = zTire(2);
    return { t: `Une image de Mandelbrot se calcule point par point. Avec $c = ${zT(c)}$ et $z_{1} = c$, le programme calcule le terme suivant.`, f: "z_{2} = z_{1}^{2} + c", val: zAdd(zMul(c, c), c) };
  },
  () => {
    const [u, v] = [[entre(10, 40), entre(5, 30)] as Z, [entre(10, 40), -entre(5, 20)] as Z];
    return { t: `Une électricienne branche en série deux dipôles d'impédances $Z_{1} = ${zT(u)}$ et $Z_{2} = ${zT(v)}$, en ohms.`, f: "Z = Z_{1} + Z_{2}", val: zAdd(u, v) };
  },
  () => {
    const [u, v] = [zTire(9), zTire(9)];
    return { t: `Une ingénieure du son mixe deux signaux notés $s_{1} = ${zT(u)}$ et $s_{2} = ${zT(v)}$. Le second est doublé.`, f: "s = s_{1} + 2s_{2}", val: zAdd(u, zK(2, v)) };
  },
  () => {
    const [u, v, w] = [zTire(5), zTire(5), zTire(5)];
    return { t: `Un robot tondeuse part du point d'affixe $z_{0} = ${zT(u)}$. Il se déplace de $d_{1} = ${zT(v)}$, puis de $d_{2} = ${zT(w)}$.`, f: "z = z_{0} + d_{1} + d_{2}", val: zAdd(zAdd(u, v), w) };
  },
  () => {
    const u = zTire(9);
    return { t: `Dans un jeu vidéo, un personnage est en $p = ${zT(u)}$. Le faire tourner d'un quart de tour autour de l'origine revient à multiplier sa position par $i$.`, f: "p' = ip", val: zMul([0, 1], u) };
  },
  () => {
    const u = zTire(6);
    return { t: `Une développeuse de jeux vidéo retourne un décor autour de l'origine : un point d'affixe $p = ${zT(u)}$ est multiplié par $-i$.`, f: "p' = -ip", val: zMul([0, -1], u) };
  },
  () => {
    const [u, g] = [zTire(9), entre(2, 5)];
    return { t: `Un amplificateur multiplie par ${g} le signal $s = ${zT(u)}$, ce qui donne le signal de sortie.`, f: `S = ${g}s`, val: zK(g, u) };
  },
  () => {
    const [u, v] = [[entre(20, 90), entre(10, 60)] as Z, [-entre(5, 30), entre(5, 30)] as Z];
    return { t: `Une skippeuse repère son voilier en $z = ${zT(u)}$ sur sa carte, en milles. Le courant le déplace de $d = ${zT(v)}$.`, f: "z' = z + d", val: zAdd(u, v) };
  },
];
const FIN_SIT = [
  "Écris le résultat sous la forme $a + bi$.",
  "Quel nombre obtient-on ?",
  "Donne la forme algébrique du résultat.",
  "Calcule ce nombre.",
  "Quel est le résultat sous forme algébrique ?",
  "Effectue ce calcul.",
];

/* Une équation réelle : l'expression en x garde une seule solution entière. */
function reelOuPur() {
  for (;;) {
    const x0 = nz(6);
    const c = un([1, 1, 2, 3]);
    const c2 = un([1, 2, 3]);
    const d = nz(7);
    if (c2 * x0 + d !== 0) return { x0, reel: lin(c, -c * x0), autre: lin(c2, d) };
  }
}

/* ───────────────── loi d'Ohm complexe ───────────────── */

const OHM = [
  "Une électricienne mesure une tension $U = @U$ aux bornes d'un moteur d'impédance $Z = @Z$.",
  "Un technicien du son branche un haut-parleur d'impédance $Z = @Z$ sous la tension $U = @U$.",
  "Dans un circuit de radio, un dipôle d'impédance $Z = @Z$ reçoit la tension $U = @U$.",
  "Une ingénieure teste une éolienne : la tension est $U = @U$ et l'impédance du circuit $Z = @Z$.",
  "Un panneau solaire alimente un dipôle d'impédance $Z = @Z$ sous la tension $U = @U$.",
  "Une batterie de vélo électrique délivre $U = @U$ dans un circuit d'impédance $Z = @Z$.",
  "Sur un banc de mesure, une bobine et une résistance forment l'impédance $Z = @Z$, sous la tension $U = @U$.",
];
const FIN_OHM = [
  "Le courant vaut alors :",
  "Calcule le courant, sous forme algébrique :",
  "Écris ce courant sous la forme $a + bi$ :",
  "Que vaut ce courant ?",
  "Détermine le courant :",
];

/* ───────────────── conditions sur le conjugué ───────────────── */

const CHOIX_FAMILLE = ["Un réel", "Un imaginaire pur", "Un complexe de module 1", "Un complexe de partie réelle 1"];
const CONDITIONS: [string, string][] = [
  ["\\overline{z} = z", CHOIX_FAMILLE[0]],
  ["z - \\overline{z} = 0", CHOIX_FAMILLE[0]],
  ["\\overline{z} = -z", CHOIX_FAMILLE[1]],
  ["z + \\overline{z} = 0", CHOIX_FAMILLE[1]],
  ["z\\overline{z} = 1", CHOIX_FAMILLE[2]],
  ["\\overline{z} = \\dfrac{1}{z}", CHOIX_FAMILLE[2]],
  ["z + \\overline{z} = 2", CHOIX_FAMILLE[3]],
];
const F_COND = [
  "Quel genre de nombre est $z$, sachant que cette égalité est vraie ?",
  "Un complexe non nul $z$ vérifie cette égalité. Que peut-on dire de $z$ ?",
  "Cette égalité caractérise une famille de complexes non nuls. Laquelle ?",
  "Que traduit cette égalité pour un complexe non nul $z$ ?",
  "Si un complexe non nul $z$ vérifie cette égalité, qu'est-il forcément ?",
  "Écris $z = a + bi$ pour décider : quel nombre vérifie cette égalité ?",
  "Quelle famille de nombres non nuls vérifie cette égalité ?",
  "Parmi ces familles, laquelle correspond à cette égalité, pour $z$ non nul ?",
  "Pour $z$ non nul, que signifie cette égalité ?",
  "Quelle propriété de $z$ non nul cette égalité exprime-t-elle ?",
];

/* ───────────────── module, situations ───────────────── */

type SitMod = { t: string; L: string; z: Z };
const SIT_MODULE: (() => SitMod)[] = [
  () => {
    const [a, b] = un<[number, number]>([[30, 40], [60, 80], [50, 120], [80, 60], [120, 50]]);
    return { L: "Z", z: [a, b], t: "Une ingénieure calcule l'impédance d'un moteur, en ohms." };
  },
  () => {
    const [a, b] = un<[number, number]>([[3, 4], [6, 8], [12, 5]]);
    return { L: "Z", z: [a, -b], t: "Une électricienne relève l'impédance d'un condensateur en série avec une résistance, en ohms." };
  },
  () => {
    const [a, b] = un<[number, number]>([[300, 400], [600, 800], [500, 1200]]);
    return { L: "d", z: [a, b], t: "Un drone s'éloigne de sa base et le déplacement total, en mètres, est noté par un complexe." };
  },
  () => {
    const [a, b] = un<[number, number]>([[9, 12], [15, 8], [5, 12]]);
    return { L: "d", z: [-a, b], t: "Une navigatrice note le déplacement de son voilier par un complexe, en milles." };
  },
  () => {
    const [a, b] = un<[number, number]>([[3, 4], [8, 6], [5, 12]]);
    return { L: "s", z: [a, b], t: "Un ingénieur du son représente un signal par un complexe : le module est son amplitude." };
  },
  () => {
    const [a, b] = un<[number, number]>([[30, 40], [20, 15], [50, 120]]);
    return { L: "d", z: [a, -b], t: "Un joueur de football transmet le ballon : le déplacement, en mètres, est noté par un complexe." };
  },
  () => {
    const [a, b] = un<[number, number]>([[6, 8], [15, 20], [20, 21]]);
    return { L: "d", z: [-a, -b], t: "Un guide au Piton de la Fournaise note son déplacement sur une carte, en centaines de mètres, par un complexe." };
  },
  () => {
    const [a, b] = un<[number, number]>([[3, 4], [4, 3], [12, 5]]);
    return { L: "E", z: [a, b], t: "Un physicien décrit une onde lumineuse par un complexe : le module est son amplitude." };
  },
];
const FIN_MOD = [
  "Quel en est le module ?",
  "Calcule son module.",
  "Que vaut le module de ce nombre ?",
  "Quelle valeur ce module donne-t-il ?",
  "Détermine ce module.",
];

/* ───────────────── banque ───────────────── */

export const nombresComplexesBank: TutorBankItemV4[] = [
  /* ===== cx_forme_algebrique ===== */
  tpl(M1, 1, 1, "La partie imaginaire est le réel placé devant i, sans le i.", () => {
    const z = zTire(9);
    const reelle = Math.random() < 0.5;
    const ecrit = Math.random() < 0.7 ? zT(z) : zInverse(z);
    const v = reelle ? z[0] : z[1];
    return court(pose(parties(reelle ? "réelle" : "imaginaire"), `z = ${ecrit}`), v, ex1(`Ce nombre vaut $${zT(z)}$ : sa partie réelle est $${z[0]}$, sa partie imaginaire est $${z[1]}$.`, `La réponse est $${v}$, sans le $i$.`));
  }),
  tpl(M1, 2, 1, "Ajoute les parties réelles entre elles, puis les parties imaginaires.", () => {
    const [u, v] = [zTire(9), zTire(9)];
    const plus = Math.random() < 0.5;
    const j = plus ? zAdd(u, v) : zSub(u, v);
    const f = `${zP(u)} ${plus ? "+" : "-"} ${zP(v)}`;
    return courtZ(pose(F_ALG, f), j, ex1(`Parties réelles : $${u[0]} ${plus ? "+" : "-"} ${zP([v[0], 0])} = ${j[0]}$. Parties imaginaires : $${u[1]} ${plus ? "+" : "-"} ${zP([v[1], 0])} = ${j[1]}$.`, `Le résultat est $${zT(j)}$.`));
  }),
  tpl(M1, 3, 1, "Distribue le facteur sur chaque terme ; i × i = −1.", () => {
    const u = zTire(7);
    const k: Z = un<Z>([[un([2, 3, 4, 5, 6, -2, -3, -4]), 0], [un([2, 3, 4, 5, 6, -2, -3, -4]), 0], [0, 1], [0, -1], [0, un([2, 3, 4, -2, -3])]]);
    const j = zMul(k, u);
    const f = `${k[1] === 0 ? String(k[0]) : zT(k)}${zP(u)}`;
    return courtZ(pose(F_ALG, f), j, ex1(`On distribue${k[1] !== 0 ? `, et $i \\times i = -1$` : ""}.`, `Le résultat est $${zT(j)}$.`));
  }),
  tpl(M1, 4, 1, "Les puissances de i se répètent de 4 en 4 : i, −1, −i, 1.", () => {
    const n = entre(2, 15);
    const j = choixI(puissI(n));
    return qcm(pose(POUR_I, `i^{${n}}`), j, CHOIX_I, ex1(`$i^{2} = -1$, $i^{3} = -i$, $i^{4} = 1$, puis cela recommence. Le reste de ${n} divisé par 4 est ${n % 4}.`, `$i^{${n}} = ${zT(puissI(n))}$.`));
  }),

  tpl(M1, 5, 2, "Développe les quatre produits, puis remplace i² par −1.", () => {
    const [u, v] = [zTire(6), zTire(6)];
    const j = zMul(u, v);
    return courtZ(pose(F_ALG, `${zP(u)}${zP(v)}`), j, ex1(`Partie réelle : $${u[0]} \\times ${zP([v[0], 0])} - ${zP([u[1], 0])} \\times ${zP([v[1], 0])} = ${j[0]}$. Partie imaginaire : $${u[0]} \\times ${zP([v[1], 0])} + ${zP([u[1], 0])} \\times ${zP([v[0], 0])} = ${j[1]}$.`, `Le résultat est $${zT(j)}$.`));
  }),
  tpl(M1, 6, 2, "Utilise (a + bi)² = a² + 2abi + (bi)², et (bi)² = −b².", () => {
    const u = zTire(6);
    const type = entre(0, 1);
    const j = type === 0 ? zMul(u, u) : zMul(u, zConj(u));
    const f = type === 0 ? `${zP(u)}^{2}` : `${zP(u)}${zP(zConj(u))}`;
    return courtZ(pose(F_ALG, f), j, ex1(type === 0 ? `$a^{2} - b^{2} = ${u[0] * u[0] - u[1] * u[1]}$ et $2ab = ${2 * u[0] * u[1]}$.` : `C'est $a^{2} + b^{2} = ${u[0] * u[0] + u[1] * u[1]}$ : les termes en $i$ s'annulent.`, `Le résultat est $${zT(j)}$.`));
  }),
  tpl(M1, 7, 2, "Prends le reste de l'exposant dans la division par 4.", () => {
    const type = entre(0, 1);
    if (type === 0) {
      const n = entre(16, 2100);
      return qcm(pose(POUR_I, `i^{${n}}`), choixI(puissI(n)), CHOIX_I, ex1(`$${n} = 4 \\times ${Math.floor(n / 4)} + ${n % 4}$, donc on garde $i^{${n % 4}}$.`, `$i^{${n}} = ${zT(puissI(n))}$.`));
    }
    const [m, n] = [entre(5, 40), entre(5, 40)];
    const j = zAdd(puissI(m), puissI(n));
    return courtZ(pose(F_ALG, `i^{${m}} + i^{${n}}`), j, ex1(`$i^{${m}} = ${zT(puissI(m))}$ et $i^{${n}} = ${zT(puissI(n))}$.`, `Le résultat est $${zT(j)}$.`));
  }),
  tpl(M1, 8, 2, "Deux complexes sont égaux quand leurs parties réelles et leurs parties imaginaires sont égales.", () => {
    const [x, y] = [nz(7), nz(7)];
    const [c, p, d, q] = [un([1, 1, 2, 3]), nz(6), un([1, 1, 2, 3]), nz(6)];
    const droite = zT([c * x + p, d * y + q]);
    const L = Math.random() < 0.5 ? "x" : "y";
    const texte = phrase(
      ["Ces deux réels vérifient l'égalité ci-dessous.", "Deux réels sont liés par cette égalité.", "Cette égalité relie deux réels.", "On identifie les deux membres de cette égalité entre complexes.", "Cette égalité entre deux complexes est vraie.", "Ici, les deux inconnues sont réelles."],
      [`Que vaut $${L}$ ?`, `Trouve $${L}$.`, `Calcule $${L}$.`, `Quelle est la valeur de $${L}$ ?`, `Détermine $${L}$.`],
    );
    return court(`${texte}\n\n$(${lin(c, p)}) + (${lin(d, q, "y")})i = ${droite}$`, L === "x" ? x : y, ex1(`On identifie : $${lin(c, p)} = ${c * x + p}$ et $${lin(d, q, "y")} = ${d * y + q}$.`, `$x = ${x}$ et $y = ${y}$.`));
  }),
  tpl(M1, 9, 2, "Réel : la partie imaginaire est nulle. Imaginaire pur : la partie réelle est nulle.", () => {
    const { x0, reel, autre } = reelOuPur();
    const pur = Math.random() < 0.5;
    const nom = pur ? "imaginaire pur" : "réel";
    const f = pur ? `z = ${reel} + (${autre})i` : `z = ${autre} + (${reel})i`;
    const debut = un([
      `Pour quel réel $x$ ce nombre est-il ${nom} ?`,
      `Trouve le réel $x$ qui rend ce nombre ${nom}.`,
      `Ce nombre est ${nom} pour une seule valeur de $x$. Laquelle ?`,
      `Quelle valeur de $x$ rend ce complexe ${nom} ?`,
      `Détermine le réel $x$ pour que ce complexe soit ${nom}.`,
      `Le réel $x$ est choisi pour que ce nombre soit ${nom}. Que vaut-il ?`,
      `À quelle condition sur le réel $x$ ce nombre est-il ${nom} ? Donne $x$.`,
      `On veut un nombre ${nom}. Quel réel $x$ faut-il prendre ?`,
    ]);
    return court(`${debut}\n\n$${f}$`, x0, ex1(`${pur ? "La partie réelle" : "La partie imaginaire"} doit s'annuler : $${reel} = 0$.`, `$x = ${x0}$.`));
  }),

  tpl(M1, 10, 3, "Remplace z et w par leurs écritures, puis calcule dans l'ordre habituel.", () => {
    const [z, w] = [zTire(4), zTire(4)];
    const [p, q] = [nz(4), nz(3)];
    const forme = un<[string, Z]>([
      [`${p}z${q < 0 ? " - " : " + "}${Math.abs(q) === 1 ? "" : Math.abs(q)}w`, zAdd(zK(p, z), zK(q, w))],
      ["zw", zMul(z, w)],
      [`z^{2}${q < 0 ? " - " : " + "}${Math.abs(q) === 1 ? "" : Math.abs(q)}w`, zAdd(zMul(z, z), zK(q, w))],
      [`zw${p < 0 ? " - " : " + "}${Math.abs(p) === 1 ? "" : Math.abs(p)}z`, zAdd(zMul(z, w), zK(p, z))],
      ["w^{2} - z", zSub(zMul(w, w), z)],
      [`z(w ${q < 0 ? "-" : "+"} ${Math.abs(q)})`, zMul(z, zAdd(w, [q, 0]))],
      ["(z + w)^{2}", zPow(zAdd(z, w), 2)],
      ["(z - w)(z + w)", zMul(zSub(z, w), zAdd(z, w))],
    ]);
    const f = forme[0].replace(/^1z/, "z").replace(/^-1z/, "-z");
    const debut = un([`Soit $z = ${zT(z)}$ et $w = ${zT(w)}$.`, `On pose $z = ${zT(z)}$ et $w = ${zT(w)}$.`, `On donne $z = ${zT(z)}$ et $w = ${zT(w)}$.`, `Prenons $z = ${zT(z)}$ et $w = ${zT(w)}$.`]);
    const fin = un(["Calcule :", "Que vaut cette expression ?", "Écris sous la forme $a + bi$ :", "Donne la forme algébrique de :", "Calcule ce nombre :", "Trouve la valeur de :"]);
    return courtZ(`${debut} ${fin}\n\n$${f}$`, forme[1], ex1("On remplace, on développe, puis on utilise $i^{2} = -1$.", `Le résultat est $${zT(forme[1])}$.`));
  }),
  tpl(M1, 11, 3, "Calcule le carré d'abord, puis multiplie encore si l'exposant le demande.", () => {
    const u = un<Z>([[1, 1], [1, -1], [-1, 1], [-1, -1], [2, 1], [1, 2], [2, -1], [1, -2], [3, 1], [1, 3]]);
    const n = Math.abs(u[0]) === 1 && Math.abs(u[1]) === 1 ? un([2, 3, 4, 5, 6, 8]) : un([2, 3, 3, 4]);
    const j = zPow(u, n);
    return courtZ(pose(F_ALG, `${zP(u)}^{${n}}`), j, ex1(`$${zP(u)}^{2} = ${zT(zMul(u, u))}$, puis on continue jusqu'à la puissance ${n}.`, `Le résultat est $${zT(j)}$.`));
  }),
  tpl(M1, 12, 3, "Remplace les lettres par leurs valeurs, puis calcule.", () => {
    const s = un(SITUATIONS)();
    return courtZ(`${s.t} ${un(FIN_SIT)}\n\n$${s.f}$`, s.val, ex1(`On remplace dans $${s.f}$, puis on regroupe.`, `Le résultat est $${zT(s.val)}$.`));
  }),
  tpl(M1, 13, 3, "Isole z comme dans une équation ordinaire ; pour diviser par i, multiplie par −i.", () => {
    const z = zTire(6);
    const type = entre(0, 2);
    const d = zTire(6);
    if (type === 0) {
      const k = un([2, 3, 4, 5, -2, -3]);
      return courtZ(pose(F_RESOUS, `${k}z${suite(d)} = ${zT(zAdd(zK(k, z), d))}`), z, ex1(`On enlève $${zT(d)}$, puis on divise par ${k}.`, `$z = ${zT(z)}$.`));
    }
    if (type === 1) {
      const a = un<Z>([[0, 1], [0, -1], [0, 2], [0, 3]]);
      return courtZ(pose(F_RESOUS, `${coefZ(a)}${suite(d)} = ${zT(zAdd(zMul(a, z), d))}`), z, ex1(`On enlève $${zT(d)}$, puis on divise par $${zT(a)}$ en multipliant par $-i$.`, `$z = ${zT(z)}$.`));
    }
    const u = zTire(4);
    return courtZ(pose(F_RESOUS, `z - ${zP(u)} = ${zP(d)}`), zAdd(u, d), ex1(`On ajoute $${zT(u)}$ aux deux membres.`, `$z = ${zT(zAdd(u, d))}$.`));
  }),

  /* ===== cx_conjugue_quotient ===== */
  tpl(M2, 1, 1, "Le conjugué garde la partie réelle et change le signe de la partie imaginaire.", () => {
    const z = zTire(9);
    return courtZ(pose(["Calcule ce conjugué.", "Écris ce conjugué sous la forme $a + bi$.", "Quel est ce conjugué ?", "Donne la valeur de ce conjugué.", "Que vaut ce conjugué ?", "Sans calcul, écris ce conjugué.", "Quel complexe la barre donne-t-elle ici ?", "Trouve ce nombre conjugué.", "Écris ce nombre sans la barre.", "Change ce qu'il faut pour obtenir ce conjugué.", "Retire la barre de conjugaison."], `\\overline{${zT(z)}}`), zConj(z), ex2("On change le signe de la partie imaginaire, et seulement elle.", `Le conjugué est $${zT(zConj(z))}$.`));
  }),
  tpl(M2, 2, 1, "z × z̄ = a² + b² : le résultat est un réel positif.", () => {
    const z = zTire(7);
    const debut = un([`Soit $z = ${zT(z)}$.`, `On pose $z = ${zT(z)}$.`, `On donne $z = ${zT(z)}$.`, `Pour $z = ${zT(z)}$,`]);
    const fin = un(["calcule ce produit :", "que vaut ce produit ?", "trouve la valeur de ce produit :", "donne ce réel :", "calcule :", "écris ce nombre sans $i$ :"]);
    const texte = debut.endsWith(",") ? `${debut} ${fin}` : `${debut} ${fin.charAt(0).toUpperCase()}${fin.slice(1)}`;
    return court(`${texte}\n\n$z\\overline{z}$`, zN2(z), ex2(`$a^{2} + b^{2} = ${z[0] * z[0]} + ${z[1] * z[1]}$.`, `$z\\overline{z} = ${zN2(z)}$.`));
  }),
  tpl(M2, 3, 1, "z + z̄ = 2a et z − z̄ = 2bi.", () => {
    const z = zTire(8);
    const plus = Math.random() < 0.5;
    const j: Z = plus ? [2 * z[0], 0] : [0, 2 * z[1]];
    const debut = un([`Soit $z = ${zT(z)}$.`, `On pose $z = ${zT(z)}$.`, `On donne $z = ${zT(z)}$.`, `Prenons $z = ${zT(z)}$.`]);
    const fin = un(["Calcule :", "Que vaut ce nombre ?", "Écris ce nombre sous forme réduite :", "Donne ce nombre :", "Trouve la valeur de :", "Réduis :"]);
    return courtZ(`${debut} ${fin}\n\n$z ${plus ? "+" : "-"} \\overline{z}$`, j, ex2(plus ? "Les parties imaginaires s'annulent : il reste $2a$." : "Les parties réelles s'annulent : il reste $2bi$.", `Le résultat est $${zT(j)}$.`));
  }),
  tpl(M2, 4, 1, "Le conjugué du conjugué redonne z : change encore le signe de la partie imaginaire.", () => {
    const z = zTire(9);
    return courtZ(pose(["Trouve le complexe $z$ dont le conjugué est donné ici.", "Que vaut $z$ ?", "Le conjugué de $z$ est connu. Écris $z$.", "Donne $z$ sous forme algébrique.", "Quel est le complexe $z$ ?", "Déduis-en $z$.", "Retrouve $z$ à partir de son conjugué.", "Quel nombre $z$ a ce conjugué ?", "Écris le nombre $z$ sous la forme $a + bi$.", "Détermine $z$ sachant cette égalité."], `\\overline{z} = ${zT(zConj(z))}`), z, ex2("Le conjugué du conjugué est le nombre de départ.", `$z = ${zT(z)}$.`));
  }),

  tpl(M2, 5, 2, "Pour diviser par i, multiplie en haut et en bas par −i : 1 ÷ i = −i.", () => {
    const type = entre(0, 1);
    const i = un<Z>([[0, 1], [0, 1], [0, -1]]);
    const u: Z = type === 0 ? [nz(9), 0] : zTire(7);
    const j = i[1] === 1 ? zMul(u, [0, -1]) : zMul(u, [0, 1]);
    return courtZ(pose(F_ALG, `\\dfrac{${zT(u)}}{${zT(i)}}`), j, ex2("On multiplie en haut et en bas par le conjugué du dénominateur : $i \\times (-i) = 1$.", `Le résultat est $${zT(j)}$.`));
  }),
  tpl(M2, 6, 2, "Multiplie en haut et en bas par le conjugué du dénominateur.", () => {
    const [q, d] = [zTire(4), zTire(3)];
    const w = zMul(q, d);
    return courtZ(pose(F_ALG, `\\dfrac{${zT(w)}}{${zT(d)}}`), q, ex2(`Le dénominateur devient $${zT(d)} \\times ${zP(zConj(d))} = ${zN2(d)}$, le numérateur $${zT(zMul(w, zConj(d)))}$. On divise par ${zN2(d)}.`, `Le quotient vaut $${zT(q)}$.`));
  }),
  tpl(M2, 7, 2, "Multiplie par le conjugué, puis sépare la partie réelle de la partie imaginaire.", () => {
    for (;;) {
      const d = zTire(3);
      const k = nz(6);
      const N = zN2(d);
      if (k % N === 0) continue;
      const j = zFr([k * d[0], N], [-k * d[1], N]);
      const faux = [
        zFr([k * d[0], N], [k * d[1], N]),
        zFr([-k * d[0], N], [-k * d[1], N]),
        zFr([k, d[0]], [-k, d[1]]),
        zFr([k * d[1], N], [-k * d[0], N]),
        zFr([k * d[0], Math.abs(d[0] * d[0] - d[1] * d[1]) || N + 1], [-k * d[1], Math.abs(d[0] * d[0] - d[1] * d[1]) || N + 1]),
      ];
      return qcm(pose(F_EXACT, `\\dfrac{${k}}{${zT(d)}}`), `$${j}$`, faux.map((s) => `$${s}$`), ex2(`On multiplie par $${zT(zConj(d))}$ en haut et en bas : le dénominateur vaut ${N}.`, `Le résultat est $${j}$.`));
    }
  }),
  tpl(M2, 8, 2, "Calcule d'abord ce qui est sous la barre, ou conjugue chaque facteur.", () => {
    const [u, v] = [zTire(5), zTire(5)];
    const type = entre(0, 2);
    const f = type === 0 ? `\\overline{${zP(u)}${zP(v)}}` : type === 1 ? `\\overline{${zP(u)} + ${zP(v)}}` : `\\overline{${zP(u)}^{2}}`;
    const j = zConj(type === 0 ? zMul(u, v) : type === 1 ? zAdd(u, v) : zMul(u, u));
    return courtZ(pose(F_ALG, f), j, ex2("Le conjugué d'une somme ou d'un produit est la somme ou le produit des conjugués.", `Le résultat est $${zT(j)}$.`));
  }),

  tpl(M2, 9, 3, "Multiplie par le conjugué du dénominateur, développe le haut, puis sépare les deux parties.", () => {
    for (;;) {
      const [w, d] = [zTire(6), zTire(3)];
      const N = zN2(d);
      const h = zMul(w, zConj(d));
      if (h[0] % N === 0 && h[1] % N === 0) continue;
      const h2 = zMul(w, d);
      const j = zFr([h[0], N], [h[1], N]);
      const faux = [zFr([h[0], N], [-h[1], N]), zFr([h2[0], N], [h2[1], N]), zFr([-h[0], N], [h[1], N]), zFr([h[1], N], [h[0], N]), zFr([w[0], d[0]], [w[1], d[1]])];
      return qcm(pose(F_EXACT, `\\dfrac{${zT(w)}}{${zT(d)}}`), `$${j}$`, faux.map((s) => `$${s}$`), ex2(`Le numérateur devient $${zT(h)}$ et le dénominateur ${N}.`, `Le quotient vaut $${j}$.`));
    }
  }),
  tpl(M2, 10, 3, "Pose z = a + bi, puis identifie parties réelles et parties imaginaires.", () => {
    const z = zTire(5);
    const [u, v] = un<[number, number]>([[1, 2], [2, 1], [1, 3], [3, 1], [2, -1], [3, -1], [1, -2], [1, -3], [3, 2], [2, 3]]);
    const droite: Z = [(u + v) * z[0], (u - v) * z[1]];
    const g = `${u === 1 ? "" : u}z ${v < 0 ? "-" : "+"} ${Math.abs(v) === 1 ? "" : Math.abs(v)}\\overline{z}`;
    return courtZ(pose(F_RESOUS, `${g} = ${zT(droite)}`), z, ex2(`Avec $z = a + bi$ : $${u + v}a = ${droite[0]}$ et $${u - v}b = ${droite[1]}$.`, `$z = ${zT(z)}$.`));
  }),
  tpl(M2, 11, 3, "Écris z = a + bi et traduis l'égalité sur a et b.", () => {
    const [c, j] = un(CONDITIONS);
    return qcm(pose(F_COND, c), j, CHOIX_FAMILLE, ex2("Avec $z = a + bi$, on a $\\overline{z} = a - bi$ et $z\\overline{z} = a^{2} + b^{2}$.", `Ici : ${j.toLowerCase()}.`));
  }),
  tpl(M2, 12, 3, "La loi d'Ohm donne I = U ÷ Z : multiplie par le conjugué de Z.", () => {
    const I = zTire(4);
    const Z0 = zTire(6);
    const U = zMul(I, Z0);
    const t = un(OHM).replace("@U", () => zT(U)).replace("@Z", () => zT(Z0));
    return courtZ(`${t} ${un(FIN_OHM)}\n\n$I = \\dfrac{U}{Z}$`, I, ex2(`$\\dfrac{${zT(U)}}{${zT(Z0)}}$ : on multiplie par $${zT(zConj(Z0))}$, le dénominateur vaut ${zN2(Z0)}.`, `$I = ${zT(I)}$.`));
  }),

  /* ===== cx_module_argument ===== */
  tpl(M3, 1, 1, "Module : racine de a² + b².", () => {
    const { z, r } = triplet();
    return court(pose(F_MOD, `\\left|${zT(z)}\\right|`), r, ex3(`$\\sqrt{${z[0] * z[0]} + ${z[1] * z[1]}} = \\sqrt{${r * r}}$.`, `Le module vaut $${r}$.`));
  }),
  tpl(M3, 2, 1, "Le module se calcule avec les carrés : a² + b², puis la racine.", () => {
    for (;;) {
      const z = zTire(7);
      const N = zN2(z);
      if (Number.isInteger(Math.sqrt(N))) continue;
      return qcm(pose(F_MOD, `\\left|${zT(z)}\\right|`), `$\\sqrt{${N}}$`, fauxRacines(z[0], z[1]).map((s) => `$${s}$`), ex3(`$${z[0] * z[0]} + ${z[1] * z[1]} = ${N}$.`, `Le module vaut $\\sqrt{${N}}$.`));
    }
  }),
  tpl(M3, 3, 1, "Place le point sur un axe : l'argument se lit directement.", () => {
    const k = entre(1, 9);
    const [z, a] = un<[Z, A]>([[[k, 0], [0, 1]], [[-k, 0], [1, 1]], [[0, k], [1, 2]], [[0, -k], [-1, 2]]]);
    return qcm(pose(F_ARG, `z = ${zT(z)}`), `$${angT(a)}$`, ["$0$", "$\\pi$", "$\\dfrac{\\pi}{2}$", "$-\\dfrac{\\pi}{2}$"], ex3("Le point image est sur un axe : l'angle se lit sans calcul.", `Un argument est $${angT(a)}$.`));
  }),
  tpl(M3, 4, 1, "Lis les coordonnées du point : abscisse a, ordonnée b.", () => {
    const [a, b] = un<[number, number]>([[3, 4], [4, 3], [6, 8], [8, 6]]);
    const [x, y] = [a * signe(), b * signe()];
    const texte = un([
      "Le point $M$ est placé dans le plan complexe. Calcule le module de son affixe.",
      "Le point $M$ a pour affixe $z$. Que vaut $\\left|z\\right|$ d'après la figure ?",
      "Lis les coordonnées de $M$ sur la figure. Quel est le module de son affixe ?",
      "Sur cette figure, $M$ a pour affixe $z$. Calcule $\\left|z\\right|$.",
      "Quelle est la distance $OM$ sur cette figure ?",
      "Trouve le module de l'affixe du point $M$ placé ci-dessous.",
      "Le plan complexe est dessiné ci-dessous. Donne la longueur $OM$.",
      "D'après la figure, quel est le module de l'affixe de $M$ ?",
      "Lis l'affixe de $M$ sur la figure, puis calcule son module.",
      "Quel module l'affixe de ce point $M$ a-t-elle ?",
    ]);
    return court(texte, Math.hypot(x, y), ex3(`$M$ a pour affixe $${zT([x, y])}$, donc $OM = \\sqrt{${x * x} + ${y * y}}$.`, `Le module vaut $${Math.hypot(x, y)}$.`), plan([{ x, y, label: "M" }]));
  }),

  tpl(M3, 5, 2, "Calcule le module, puis reconnais cos θ et sin θ parmi les valeurs remarquables.", () => {
    const r = remTire(4);
    return qcm(pose(F_ARG, `z = ${r.t}`), `$${angT(r.a)}$`, fauxAngles(r.a).map((s) => `$${s}$`), ex3(`$\\left|z\\right| = ${r.rT}$, puis on reconnaît le cosinus et le sinus.`, `Un argument de $z$ est $${angT(r.a)}$.`));
  }),
  tpl(M3, 6, 2, "Écris z = r(cos θ + i sin θ), avec r le module et θ un argument.", () => {
    const r = remTire(4);
    const faux = [trigT(r.rT, princ([-r.a[0], r.a[1]])), trigT(r.rT, aSub([1, 1], r.a)), trigT(r.rT, aAdd(r.a, [1, 2])), trigT(String(r.r > 0 && Number.isInteger(r.r) ? r.r + 1 : 3), r.a), trigT(r.rT, aAdd(r.a, [1, 1]))];
    return qcm(pose(["Quelle est la forme trigonométrique de ce nombre ?", "Écris ce nombre sous forme trigonométrique.", "Parmi ces écritures, laquelle est la forme trigonométrique de ce nombre ?", "Quelle écriture trigonométrique est égale à ce nombre ?", "Choisis la bonne forme trigonométrique.", "Trouve la forme $r(\\cos\\theta + i\\sin\\theta)$ de ce nombre.", "Module et argument d'abord : quelle est sa forme trigonométrique ?", "Une seule écriture trigonométrique convient. Laquelle ?", "Sans calculatrice, repère la forme trigonométrique.", "Quelle forme $r(\\cos\\theta + i\\sin\\theta)$ convient ici ?"], `z = ${r.t}`), `$${trigT(r.rT, r.a)}$`, faux.map((s) => `$${s}$`), ex3(`$r = ${r.rT}$ et $\\theta = ${angT(r.a)}$.`, `$z = ${trigT(r.rT, r.a)}$.`));
  }),
  tpl(M3, 7, 2, "Remplace cos θ et sin θ par leurs valeurs exactes, puis développe.", () => {
    const k = entre(1, 4);
    const type = un<3 | 6>([3, 6]);
    const [sx, sy] = [signe(), signe()];
    const r = rem(k, type, sx, sy);
    const faux = [rem(k, type, sx, sy === 1 ? -1 : 1).t, rem(k, type, sx === 1 ? -1 : 1, sy).t, rem(k, type === 3 ? 6 : 3, sx, sy).t, rem(k + 1, type, sx, sy).t, rem(k, type === 3 ? 6 : 3, sx === 1 ? -1 : 1, sy).t];
    return qcm(pose(F_EXACT, `z = ${trigT(r.rT, r.a)}`), `$${r.t}$`, faux.map((s) => `$${s}$`), ex3(`On remplace les valeurs exactes de $\\cos$ et de $\\sin$ pour $${angT(r.a)}$, puis on multiplie par ${r.rT}.`, `$z = ${r.t}$.`));
  }),
  tpl(M3, 8, 2, "Le module d'un produit est le produit des modules ; celui d'un quotient, le quotient des modules.", () => {
    const [p, q] = [un([2, 3, 4, 5, 6, 8, 10, 12]), un([2, 3, 4, 5])];
    const n = un([2, 3]);
    /* Un quotient n'est posé que s'il tombe sur un décimal ; sa fraction est admise aussi. */
    const decimal = (v: number) => Number.isInteger(v * 100);
    const forme = un<[string, number, string[]]>([
      ["zw", p * q, []], [`z^{${n}}`, p ** n, []], [`w^{${n}}`, q ** n, []],
      ["\\overline{z}w", p * q, []], [`z^{2}w`, p * p * q, []], ["\\overline{z}", p, []], ["-z", p, []], ["iz", p, []], ["2z", 2 * p, []],
      ...(decimal(p / q) ? [["\\dfrac{z}{w}", p / q, Number.isInteger(p / q) ? [] : [`${p}/${q}`]] as [string, number, string[]]] : []),
      ...(decimal(1 / q) ? [["\\dfrac{1}{w}", 1 / q, [`1/${q}`]] as [string, number, string[]]] : []),
      ...(decimal((p * p) / q) ? [["\\dfrac{z^{2}}{w}", (p * p) / q, Number.isInteger((p * p) / q) ? [] : [`${p * p}/${q}`]] as [string, number, string[]]] : []),
    ]);
    const debut = un([`On sait que $\\left|z\\right| = ${p}$ et $\\left|w\\right| = ${q}$.`, `Deux complexes vérifient $\\left|z\\right| = ${p}$ et $\\left|w\\right| = ${q}$.`, `Ici, $\\left|z\\right| = ${p}$ et $\\left|w\\right| = ${q}$.`, `Les modules valent $\\left|z\\right| = ${p}$ et $\\left|w\\right| = ${q}$.`]);
    const fin = un(["Calcule ce module.", "Que vaut ce module ?", "Sans connaître $z$ ni $w$, donne ce module.", "Trouve la valeur de ce module."]);
    return court(`${debut} ${fin}\n\n$\\left|${forme[0]}\\right|$`, forme[1], ex3("$\\left|zw\\right| = \\left|z\\right|\\left|w\\right|$, $\\left|\\dfrac{z}{w}\\right| = \\dfrac{\\left|z\\right|}{\\left|w\\right|}$, $\\left|\\overline{z}\\right| = \\left|z\\right|$ et $\\left|i\\right| = 1$.", `Ce module vaut $${nL(forme[1])}$.`), undefined, forme[2]);
  }),
  tpl(M3, 9, 2, "L'argument d'un produit est la somme des arguments ; celui d'un quotient, la différence.", () => {
    const [a, b] = [un<A>([[1, 6], [1, 4], [1, 3], [1, 2], [2, 3], [3, 4], [5, 6]]), un<A>([[1, 6], [1, 4], [1, 3], [1, 2], [-1, 6], [-1, 4], [-1, 3]])];
    const n = un([2, 3]);
    const forme = un<[string, A]>([["zw", aAdd(a, b)], ["\\dfrac{z}{w}", aSub(a, b)], [`z^{${n}}`, aMul(n, a)], ["\\overline{z}", princ([-a[0], a[1]])], ["\\dfrac{1}{w}", princ([-b[0], b[1]])], ["-z", aAdd(a, [1, 1])], ["iw", aAdd(b, [1, 2])], ["z\\overline{w}", aSub(a, b)]]);
    const debut = un([`On sait que $\\arg(z) = ${angT(a)}$ et $\\arg(w) = ${angT(b)}$.`, `Deux complexes non nuls vérifient $\\arg(z) = ${angT(a)}$ et $\\arg(w) = ${angT(b)}$.`, `Ici, $\\arg(z) = ${angT(a)}$ et $\\arg(w) = ${angT(b)}$.`, `Les arguments valent $\\arg(z) = ${angT(a)}$ et $\\arg(w) = ${angT(b)}$.`]);
    const fin = un(["Quelle est la mesure principale de cet argument ?", "Donne cet argument dans $]-\\pi\\,;\\pi]$.", "Que vaut cet argument, à $2\\pi$ près ?", "Choisis la bonne mesure principale."]);
    return qcm(`${debut} ${fin}\n\n$\\arg\\left(${forme[0]}\\right)$`, `$${angT(forme[1])}$`, fauxAngles(forme[1]).map((s) => `$${s}$`), ex3("$\\arg(zw) = \\arg z + \\arg w$, $\\arg\\left(\\dfrac{z}{w}\\right) = \\arg z - \\arg w$, $\\arg(\\overline{z}) = -\\arg z$, à $2\\pi$ près.", `La mesure principale est $${angT(forme[1])}$.`));
  }),

  tpl(M3, 10, 3, "Une forme trigonométrique demande un module positif et cos θ + i sin θ : transforme d'abord l'écriture.", () => {
    const a = un<A>([[1, 6], [1, 4], [1, 3], [2, 3], [3, 4], [5, 6]]);
    const k = entre(2, 7);
    const type = entre(0, 1);
    const j = type === 0 ? aAdd(a, [1, 1]) : princ([-a[0], a[1]]);
    const f = type === 0 ? `z = -${k}\\left(\\cos${angT(a)} + i\\sin${angT(a)}\\right)` : `z = ${trigT(String(k), a, true)}`;
    return qcm(pose(F_ARG, f), `$${angT(j)}$`, [angT(a), ...fauxAngles(j)].map((s) => `$${s}$`), ex3(type === 0 ? "$-1 = \\mathrm{e}^{i\\pi}$ : le signe moins ajoute $\\pi$ à l'argument." : "$\\cos\\theta - i\\sin\\theta = \\cos(-\\theta) + i\\sin(-\\theta)$ : l'argument change de signe.", `Un argument de $z$ est $${angT(j)}$.`));
  }),
  tpl(M3, 11, 3, "Ne développe pas : calcule chaque module, puis applique les règles.", () => {
    const [u1, r1] = un<[Z, number]>([[[3, 4], 5], [[4, -3], 5], [[-6, 8], 10], [[5, 12], 13], [[-8, -6], 10], [[8, 15], 17]]);
    const [u2, r2] = un<[Z, number]>([[[3, -4], 5], [[-4, 3], 5], [[6, 8], 10], [[5, -12], 13], [[0, 2], 2], [[0, -3], 3]]);
    const k = entre(2, 4);
    const n = un([2, 4, 6, 8]);
    const forme = un<[string, number]>([
      [`${zP(u1)}${zP(u2)}`, r1 * r2],
      [`\\dfrac{${zT(zK(k, u1))}}{${zT(u1)}}`, k],
      [`${zP(u1)}^{2}`, r1 * r1],
      [`(1 + i)^{${n}}`, 2 ** (n / 2)],
      [`(1 - i)^{${n}}`, 2 ** (n / 2)],
      [`\\dfrac{${zT(zMul(u1, u2))}}{${zT(u2)}}`, r1],
      [`${zP(u1)}(1 + i)^{${n}}`, r1 * 2 ** (n / 2)],
    ]);
    return court(pose(["Sans développer, calcule ce module.", "Que vaut ce module ? Utilise les règles sur les modules.", "Calcule ce module sans chercher la forme algébrique.", "Trouve ce module en passant par les modules de chaque morceau.", "Applique les propriétés du module pour obtenir ce réel.", "Quelle est la valeur de ce module ?", "Sans calculatrice, donne ce module.", "Détermine ce module avec un minimum de calcul.", "Quel réel positif ce module vaut-il ?", "Ne développe rien : que vaut ce module ?"], `\\left|${forme[0]}\\right|`), forme[1], ex3("$\\left|zw\\right| = \\left|z\\right|\\left|w\\right|$, $\\left|z^{n}\\right| = \\left|z\\right|^{n}$ et $\\left|1 + i\\right| = \\sqrt{2}$.", `Ce module vaut $${forme[1]}$.`));
  }),
  tpl(M3, 12, 3, "Le module donne une grandeur réelle : amplitude, distance, impédance.", () => {
    const s = un(SIT_MODULE)();
    const r = Math.hypot(s.z[0], s.z[1]);
    return court(`${s.t} ${un(FIN_MOD)}\n\n$${s.L} = ${zT(s.z)}$`, r, ex3(`$\\sqrt{${s.z[0] * s.z[0]} + ${s.z[1] * s.z[1]}} = ${r}$.`, `Le module vaut $${r}$.`));
  }),
  tpl(M3, 13, 3, "L'argument d'une puissance : n fois l'argument, ramené dans ]−π ; π].", () => {
    const r = rem(1, un([3, 4, 6] as const), signe(), signe());
    const n = entre(2, 7);
    const j = aMul(n, r.a);
    return qcm(pose(F_ARG, `z = (${r.t})^{${n}}`), `$${angT(j)}$`, fauxAngles(j).map((s) => `$${s}$`), ex3(`Un argument de $${r.t}$ est $${angT(r.a)}$. On le multiplie par ${n}, puis on enlève des multiples de $2\\pi$.`, `La mesure principale est $${angT(j)}$.`));
  }),
];
