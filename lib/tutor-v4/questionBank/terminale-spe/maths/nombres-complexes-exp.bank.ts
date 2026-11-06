// NOMBRES COMPLEXES (06/11/2026), partie EXPONENTIELLE ET ÉQUATIONS : forme exponentielle,
// Moivre, Euler, linéarisation ; équations du second degré ; racines n-ièmes.
// Lignes visées : Maroc 2e bac C-2, C-3 ; Sénégal Tle AG 1, AG 2 ; Côte d'Ivoire Tle C1-L1.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, pgcd, phrase, qcm, un } from "../../lycee-commun";
import { suite,
  aAdd, aEq, aMul, ANGLES_AXES, ANGLES_REM, angT, aSub, courtZ, eiT, F_ARG, F_EXACT, F_PAIRE, fauxAngles, nz, polygoneUnite, polyT, pose, princ, rE, rem, remTire, signe, tpl, trigT, unitT,
  zAdd, zConj, zK, zMul, zN2, zP, zSub, zT, zTire, type A, type Z,
} from "./nombres-complexes-commun";

const M4 = "cx_forme_exponentielle";
const M5 = "cx_equation_second_degre";
const M6 = "cx_racines_nieme";

const ex4 = (calcul: string, conclusion: string) =>
  expl(
    "$\\mathrm{e}^{i\\theta} = \\cos\\theta + i\\sin\\theta$ ; un complexe non nul s'écrit $r\\mathrm{e}^{i\\theta}$, avec $r$ son module et $\\theta$ un argument.",
    "au produit, on multiplie les modules et on ajoute les arguments ; au quotient, on divise et on soustrait ; à la puissance $n$, on élève le module et on multiplie l'argument par $n$.",
    calcul,
    conclusion,
  );
const ex5 = (calcul: string, conclusion: string) =>
  expl(
    "pour $az^{2} + bz + c = 0$ à coefficients réels, $\\Delta = b^{2} - 4ac$. Si $\\Delta < 0$, les deux solutions sont conjuguées : $z = \\dfrac{-b \\pm i\\sqrt{-\\Delta}}{2a}$.",
    "on calcule le discriminant, puis on applique la formule ; on vérifie en remplaçant.",
    calcul,
    conclusion,
  );
const ex6 = (calcul: string, conclusion: string) =>
  expl(
    "$z^{n} = 1$ a exactement $n$ solutions dans $\\mathbb{C}$ : $\\mathrm{e}^{\\frac{2ik\\pi}{n}}$, pour $k$ de $0$ à $n - 1$. Leurs images forment un polygone régulier.",
    "on écrit le second membre sous forme exponentielle, on divise l'argument par $n$ et on prend la racine $n$-ième du module.",
    calcul,
    conclusion,
  );

/* ───────────────── tournures ───────────────── */

const RACINES: Record<number, string> = { 2: "carrée", 3: "cubique", 4: "quatrième", 5: "cinquième", 6: "sixième", 7: "septième", 8: "huitième", 9: "neuvième", 10: "dixième", 12: "douzième" };
const rac = (n: number) => RACINES[n] ?? `${n}-ième`;

const F_EXPO = [
  "Quelle est la forme exponentielle de ce nombre ?",
  "Écris ce nombre sous forme exponentielle.",
  "Parmi ces écritures, laquelle est la forme exponentielle de ce nombre ?",
  "Quelle écriture $r\\mathrm{e}^{i\\theta}$ est égale à ce nombre ?",
  "Choisis la bonne forme exponentielle.",
  "Trouve la forme $r\\mathrm{e}^{i\\theta}$ de ce nombre.",
  "Une seule écriture exponentielle convient. Laquelle ?",
  "Sans calculatrice, repère sa forme exponentielle.",
  "Quelle forme exponentielle convient ici ?",
  "Quelle est l'écriture exponentielle juste ?",
  "Mets ce nombre sous la forme $r\\mathrm{e}^{i\\theta}$.",
  "Comment ce nombre s'écrit-il avec une exponentielle ?",
];
const F_CALC_EXP = [
  "Calcule, et donne le résultat sous forme exponentielle.",
  "Que vaut ce nombre, sous forme exponentielle ?",
  "Écris ce calcul sous la forme $r\\mathrm{e}^{i\\theta}$, avec $\\theta$ dans $]-\\pi\\,;\\pi]$.",
  "Quel résultat est juste ?",
  "Applique les règles de calcul sur les exponentielles.",
  "Parmi ces écritures, laquelle est égale à ce calcul ?",
  "Simplifie ce calcul en une seule exponentielle.",
  "Sans passer par la forme algébrique, calcule ce nombre.",
  "Quelle est la forme exponentielle de ce résultat ?",
  "Réduis ce calcul à une seule exponentielle.",
  "Effectue ce calcul sur les modules et les arguments.",
  "Trouve l'écriture juste de ce résultat.",
];
const F_EG = [
  "Quelle égalité est vraie pour tout réel ?",
  "Parmi ces égalités, laquelle est juste pour tout réel ?",
  "Une seule de ces formules est exacte. Laquelle ?",
  "Trois de ces formules sont fausses. Quelle est la bonne ?",
  "Quelle est la seule formule correcte ?",
  "Repère la formule exacte.",
  "Laquelle de ces formules est juste ?",
  "Une élève a écrit ces formules. Laquelle n'a pas d'erreur ?",
  "Quelle formule peut-on utiliser sans se tromper ?",
  "Coche la formule qui est vraie pour tout réel.",
];
const F_LINEAR = [
  "Quelle est la linéarisation de cette expression ?",
  "Linéarise cette expression.",
  "Écris cette expression sans puissance ni produit de sinus et de cosinus.",
  "Quelle somme de cosinus ou de sinus est égale à cette expression ?",
  "Grâce aux formules d'Euler, à quoi cette expression est-elle égale ?",
  "Choisis l'écriture linéarisée de cette expression.",
  "Quelle forme sans puissance convient ?",
  "Passe par les formules d'Euler : quelle écriture est juste ?",
  "Pour préparer le calcul d'une primitive, linéarise cette expression.",
  "Une seule écriture linéarisée est juste. Laquelle ?",
  "Transforme cette expression en combinaison de $\\cos(kx)$ ou de $\\sin(kx)$.",
];
const F_CHOIX_SOL = [
  "Lequel de ces nombres est solution de cette équation ?",
  "Parmi ces nombres, lequel vérifie cette équation ?",
  "Quel complexe est une solution de cette équation ?",
  "Remplace $z$ : quelle proposition est solution ?",
  "Une seule proposition vérifie cette équation. Laquelle ?",
  "Quel nombre est racine de cette équation ?",
  "Choisis la solution de cette équation.",
  "Sans résoudre, teste les nombres : lequel convient ?",
  "Repère la solution parmi ces complexes.",
  "Quel complexe convient dans cette équation ?",
  "Quelle proposition rend cette égalité vraie ?",
  "Trouve la solution de cette équation.",
];

/* ───────────────── tirages ───────────────── */

const paire = (u: string, v: string) => `$z = ${u}$ ou $z = ${v}$`;
const paireZ = (u: Z, v: Z) => paire(zT(u), zT(v));

/* Linéarisations : [expression, juste, pièges]. `x` est remplacé par la lettre tirée. */
const LINEAR: [string, string, string[]][] = [
  ["\\cos^{2}(x)", "\\dfrac{1 + \\cos(2x)}{2}", ["\\dfrac{1 - \\cos(2x)}{2}", "\\cos(2x)", "\\dfrac{\\cos(2x)}{2}", "1 + \\cos(2x)"]],
  ["\\sin^{2}(x)", "\\dfrac{1 - \\cos(2x)}{2}", ["\\dfrac{1 + \\cos(2x)}{2}", "\\sin(2x)", "\\dfrac{\\sin(2x)}{2}", "1 - \\cos(2x)"]],
  ["\\sin(x)\\cos(x)", "\\dfrac{\\sin(2x)}{2}", ["\\sin(2x)", "\\dfrac{\\cos(2x)}{2}", "2\\sin(2x)", "\\dfrac{1 + \\sin(2x)}{2}"]],
  ["\\cos^{3}(x)", "\\dfrac{\\cos(3x) + 3\\cos(x)}{4}", ["\\dfrac{\\cos(3x) - 3\\cos(x)}{4}", "\\cos(3x)", "\\dfrac{3\\cos(3x) + \\cos(x)}{4}", "\\dfrac{\\cos(3x) + 3\\cos(x)}{2}"]],
  ["\\sin^{3}(x)", "\\dfrac{3\\sin(x) - \\sin(3x)}{4}", ["\\dfrac{\\sin(3x) - 3\\sin(x)}{4}", "\\sin(3x)", "\\dfrac{3\\sin(x) + \\sin(3x)}{4}", "\\dfrac{3\\sin(3x) - \\sin(x)}{4}"]],
  ["\\cos^{2}(x)\\sin^{2}(x)", "\\dfrac{1 - \\cos(4x)}{8}", ["\\dfrac{1 + \\cos(4x)}{8}", "\\dfrac{\\sin(4x)}{4}", "\\dfrac{1 - \\cos(2x)}{4}", "\\dfrac{1 - \\cos(4x)}{4}"]],
  ["\\cos(x)\\cos(2x)", "\\dfrac{\\cos(3x) + \\cos(x)}{2}", ["\\dfrac{\\cos(3x) - \\cos(x)}{2}", "\\cos(2x^{2})", "\\cos(3x)", "\\dfrac{\\sin(3x) + \\sin(x)}{2}"]],
  ["\\sin(x)\\sin(2x)", "\\dfrac{\\cos(x) - \\cos(3x)}{2}", ["\\dfrac{\\cos(3x) - \\cos(x)}{2}", "\\sin(3x)", "\\dfrac{\\cos(x) + \\cos(3x)}{2}", "\\dfrac{\\sin(3x) - \\sin(x)}{2}"]],
];
// Vu à 375 px : « sin(3x) = 3 sin(x) − 4 sin³(x) » ne tenait pas dans un choix de QCM. Le membre droit passe dessous.
const pile = (f: string) => `$\\footnotesize ${f.replace(" = ", "$ $\\footnotesize = ")}$`;
const MOIVRE: [string, string[]][] = [
  ["\\cos(2x) = 2\\cos^{2}(x) - 1", ["\\cos(2x) = 2\\cos(x)", "\\cos(2x) = \\cos^{2}(x) + \\sin^{2}(x)", "\\cos(2x) = 1 - 2\\cos^{2}(x)", "\\cos(2x) = 2\\sin(x)\\cos(x)"]],
  ["\\cos(2x) = \\cos^{2}(x) - \\sin^{2}(x)", ["\\cos(2x) = \\sin^{2}(x) - \\cos^{2}(x)", "\\cos(2x) = 2\\cos(x)", "\\cos(2x) = \\cos^{2}(x) + \\sin^{2}(x)", "\\cos(2x) = 2\\sin^{2}(x) - 1"]],
  ["\\sin(2x) = 2\\sin(x)\\cos(x)", ["\\sin(2x) = 2\\sin(x)", "\\sin(2x) = \\sin^{2}(x) - \\cos^{2}(x)", "\\sin(2x) = \\sin(x)\\cos(x)", "\\sin(2x) = \\sin^{2}(x)"]],
  ["\\cos(3x) = 4\\cos^{3}(x) - 3\\cos(x)", ["\\cos(3x) = 3\\cos^{3}(x) - 4\\cos(x)", "\\cos(3x) = 3\\cos(x)", "\\cos(3x) = 4\\cos^{3}(x) + 3\\cos(x)", "\\cos(3x) = \\cos^{3}(x)"]],
  ["\\sin(3x) = 3\\sin(x) - 4\\sin^{3}(x)", ["\\sin(3x) = 4\\sin^{3}(x) - 3\\sin(x)", "\\sin(3x) = 3\\sin(x)", "\\sin(3x) = 3\\sin(x) + 4\\sin^{3}(x)", "\\sin(3x) = \\sin^{3}(x)"]],
];
const EULER: [string, string[]][] = [
  ["\\cos(x) = \\dfrac{\\mathrm{e}^{ix} + \\mathrm{e}^{-ix}}{2}", ["\\cos(x) = \\dfrac{\\mathrm{e}^{ix} - \\mathrm{e}^{-ix}}{2}", "\\cos(x) = \\mathrm{e}^{ix} + \\mathrm{e}^{-ix}", "\\cos(x) = \\dfrac{\\mathrm{e}^{ix} + \\mathrm{e}^{-ix}}{2i}"]],
  ["\\sin(x) = \\dfrac{\\mathrm{e}^{ix} - \\mathrm{e}^{-ix}}{2i}", ["\\sin(x) = \\dfrac{\\mathrm{e}^{ix} - \\mathrm{e}^{-ix}}{2}", "\\sin(x) = \\dfrac{\\mathrm{e}^{ix} + \\mathrm{e}^{-ix}}{2i}", "\\sin(x) = \\mathrm{e}^{ix} - \\mathrm{e}^{-ix}"]],
  ["\\mathrm{e}^{ix} = \\cos(x) + i\\sin(x)", ["\\mathrm{e}^{ix} = \\sin(x) + i\\cos(x)", "\\mathrm{e}^{ix} = \\cos(x) - i\\sin(x)", "\\mathrm{e}^{ix} = \\cos(x)\\sin(x)"]],
  ["\\overline{\\mathrm{e}^{ix}} = \\mathrm{e}^{-ix}", ["\\overline{\\mathrm{e}^{ix}} = \\mathrm{e}^{ix}", "\\overline{\\mathrm{e}^{ix}} = -\\mathrm{e}^{ix}", "\\overline{\\mathrm{e}^{ix}} = \\dfrac{1}{\\mathrm{e}^{-ix}}"]],
  ["\\left|\\mathrm{e}^{ix}\\right| = 1", ["\\left|\\mathrm{e}^{ix}\\right| = x", "\\left|\\mathrm{e}^{ix}\\right| = \\cos(x)", "\\left|\\mathrm{e}^{ix}\\right| = \\mathrm{e}^{x}"]],
  ["\\mathrm{e}^{ix} \\times \\mathrm{e}^{-ix} = 1", ["\\mathrm{e}^{ix} \\times \\mathrm{e}^{-ix} = 0", "\\mathrm{e}^{ix} \\times \\mathrm{e}^{-ix} = -1", "\\mathrm{e}^{ix} \\times \\mathrm{e}^{-ix} = \\mathrm{e}^{2ix}"]],
];
const avecLettre = (s: string, v: string) => s.replace(/x/g, v);

/* Puissances dont le résultat tombe sur des entiers. */
const PUISS: [number, 3 | 4 | 6, number[]][] = [
  [1, 4, [2, 4, 6, 8, 10]],
  [2, 4, [2, 4]],
  [1, 3, [3, 6, 9]],
  [1, 6, [3, 6, 9, 12]],
  [2, 3, [3]],
  [2, 6, [3, 6]],
];

type Tour = { t: string };
const TOURS: ((r: string, n: number, a: string) => Tour)[] = [
  (r, n, a) => ({ t: `Une nacelle de grande roue est repérée par l'affixe $z = ${r}$. Chaque arrêt la fait tourner d'un angle $\\theta = ${a}$ autour du centre, placé à l'origine. Après ${n} arrêts, sa position vaut :` }),
  (r, n, a) => ({ t: `Le bout d'une pale d'éolienne a pour affixe $z = ${r}$. Le rotor tourne de $\\theta = ${a}$ à chaque image d'une vidéo. Après ${n} images, ce point est en :` }),
  (r, n, a) => ({ t: `Une développeuse de jeux vidéo fait tourner un vaisseau placé en $z = ${r}$ : à chaque étape, l'angle augmente de $\\theta = ${a}$. Après ${n} étapes, il est en :` }),
  (r, n, a) => ({ t: `L'aiguille d'une horloge d'artiste a sa pointe en $z = ${r}$. Chaque mouvement la fait tourner de $\\theta = ${a}$. Après ${n} mouvements, la pointe est en :` }),
  (r, n, a) => ({ t: `Un bras de robot a son extrémité en $z = ${r}$. Le moteur le tourne de $\\theta = ${a}$ à chaque impulsion. Après ${n} impulsions, l'extrémité est en :` }),
  (r, n, a) => ({ t: `Une danseuse tient un ruban dont le bout est en $z = ${r}$. Elle pivote de $\\theta = ${a}$ à chaque temps de la musique. Après ${n} temps, le bout du ruban est en :` }),
];

/* Équations caractéristiques : la partie imaginaire donne la pulsation. */
const OSCILL = [
  "Le mouvement de l'amortisseur d'un VTT suit l'équation caractéristique ci-dessous.",
  "Dans un circuit de radio, la charge du condensateur est régie par cette équation caractéristique.",
  "Un sismographe enregistre une oscillation dont l'équation caractéristique est donnée ci-dessous.",
  "Une ingénieure étudie la vibration d'un pont avec cette équation caractéristique.",
  "La suspension d'une voiture est modélisée par cette équation caractéristique.",
  "Une corde de guitare, freinée par l'air, vibre selon cette équation caractéristique.",
  "Un ressort de trampoline suit l'équation caractéristique ci-dessous.",
];
const FIN_OSC = [
  "Quelle est la partie imaginaire positive de ses racines ?",
  "Ses racines sont complexes : que vaut leur partie imaginaire positive ?",
  "La pulsation est la partie imaginaire positive des racines. Que vaut-elle ?",
  "Résous dans $\\mathbb{C}$ et donne la partie imaginaire positive des racines.",
];

/* Objets à symétrie : la branche k est au sommet d'un polygone régulier. */
const BRANCHES: [string, string, string, number[]][] = [
  ["Un flocon de neige", "branches", "la branche", [6]],
  ["Une étoile de mer", "branches", "la branche", [5]],
  ["Une éolienne", "pales", "la pale", [3]],
  ["Un ventilateur", "pales", "la pale", [3, 4, 5]],
  ["Une roue de jeu", "rayons", "le rayon", [8, 12]],
  ["Une horloge", "graduations", "la graduation", [12]],
  ["Une rosace de cathédrale", "pétales", "le pétale", [6, 8, 12]],
  ["Un logo de graphiste", "pointes", "la pointe", [4, 5, 6, 8]],
  ["Une fleur de frangipanier", "pétales", "le pétale", [5]],
  ["Un manège de fête foraine", "bras", "le bras", [6, 8]],
];

export const nombresComplexesExpBank: TutorBankItemV4[] = [
  /* ===== cx_forme_exponentielle ===== */
  tpl(M4, 1, 1, "e^(iθ) = cos θ + i sin θ : remplace par les valeurs exactes.", () => {
    const a = un([...ANGLES_REM, ...ANGLES_AXES, [1, 2] as A, [1, 1] as A]);
    const faux = [princ([-a[0], a[1]]), aAdd(a, [1, 1]), aSub([1, 1], a), aAdd(a, [1, 2]), [1, 6] as A, [1, 3] as A, [1, 4] as A].filter((b) => !aEq(b, a));
    return qcm(pose(F_EXACT, eiT(a)), `$${unitT(a)}$`, faux.map((b) => `$${unitT(b)}$`).filter((s) => s !== `$${unitT(a)}$`), ex4(`$\\cos${a[0] < 0 ? `\\left(${angT(a)}\\right)` : ` ${angT(a)}`} + i\\sin${a[0] < 0 ? `\\left(${angT(a)}\\right)` : ` ${angT(a)}`}$.`, `Ce nombre vaut $${unitT(a)}$.`));
  }),
  tpl(M4, 2, 1, "r(cos θ + i sin θ) s'écrit r e^(iθ), avec le même r et le même θ.", () => {
    const a = un(ANGLES_REM);
    const r = entre(2, 9);
    const opp = princ([-a[0], a[1]]);
    const faux = [`${r}${eiT(opp)}`, `-${r}${eiT(a)}`, `${r}\\mathrm{e}^{${angT(a)}}`, `${r}${eiT(aAdd(a, [1, 2]))}`, `${r + 1}${eiT(a)}`];
    return qcm(pose(F_EXPO, `z = ${trigT(String(r), a)}`), `$${r}${eiT(a)}$`, faux.map((s) => `$${s}$`), ex4("On lit directement le module et l'argument dans la forme trigonométrique.", `$z = ${r}${eiT(a)}$.`));
  }),
  tpl(M4, 3, 1, "Dans r e^(iθ), le module est le nombre positif devant l'exponentielle.", () => {
    const a = un(ANGLES_REM);
    const r = entre(2, 12);
    return court(pose(["Quel est le module de ce nombre ?", "Que vaut le module de ce complexe ?", "Lis le module de ce nombre.", "Donne $\\left|z\\right|$.", "Calcule $\\left|z\\right|$ sans passer par la forme algébrique.", "Quelle est la distance de son image à l'origine ?", "Que vaut $\\left|z\\right|$ ?", "Le module se lit dans cette écriture. Quel est-il ?", "Quel réel positif est le module de $z$ ?", "Sans calcul, donne le module de $z$.", "Repère le module de $z$."], `z = ${r}${eiT(a)}`), r, ex4(`Dans $r\\mathrm{e}^{i\\theta}$ avec $r > 0$, le module est $r$ : $\\left|\\mathrm{e}^{i\\theta}\\right| = 1$.`, `$\\left|z\\right| = ${r}$.`));
  }),
  tpl(M4, 4, 1, "Dans r e^(iθ), l'argument est l'exposant, sans le i.", () => {
    const a = un(ANGLES_REM);
    const r = entre(2, 9);
    return qcm(pose(F_ARG, `z = ${r}${eiT(a)}`), `$${angT(a)}$`, fauxAngles(a).map((s) => `$${s}$`), ex4("L'argument se lit dans l'exposant.", `Un argument de $z$ est $${angT(a)}$.`));
  }),
  tpl(M4, 5, 1, "Un réel ou un imaginaire pur : place-le sur un axe.", () => {
    const k = entre(2, 9);
    const [z, a] = un<[Z, A]>([[[k, 0], [0, 1]], [[-k, 0], [1, 1]], [[0, k], [1, 2]], [[0, -k], [-1, 2]]]);
    const faux = ANGLES_AXES.filter((b) => !aEq(a, b)).map((b) => `${k}${eiT(b)}`);
    return qcm(pose(F_EXPO, `z = ${zT(z)}`), `$${k}${eiT(a)}$`, [...faux, `${k + 1}${eiT(a)}`].map((s) => `$${s}$`), ex4(`Le module vaut ${k} et le point image est sur un axe.`, `$z = ${k}${eiT(a)}$.`));
  }),

  tpl(M4, 6, 2, "Produit : on multiplie les modules, on ajoute les arguments.", () => {
    const [a, b] = [un(ANGLES_REM), un(ANGLES_REM)];
    const [r, s] = [entre(2, 6), entre(2, 6)];
    const j = aAdd(a, b);
    const faux = [`${r + s}${eiT(j)}`, `${r * s}${eiT(aSub(a, b))}`, `${r * s + 1}${eiT(j)}`, `${r * s}${eiT(aAdd(j, [1, 2]))}`, `${r * s}${eiT(aAdd(j, [1, 1]))}`];
    return qcm(pose(F_CALC_EXP, `${r}${eiT(a)} \\times ${s}${eiT(b)}`), `$${r * s}${eiT(j)}$`, faux.map((x) => `$${x}$`), ex4(`Modules : $${r} \\times ${s} = ${r * s}$. Arguments : on ajoute, puis on ramène dans $]-\\pi\\,;\\pi]$.`, `Le résultat est $${r * s}${eiT(j)}$.`));
  }),
  tpl(M4, 7, 2, "Quotient : on divise les modules, on soustrait les arguments.", () => {
    const [a, b] = [un(ANGLES_REM), un(ANGLES_REM)];
    const [q, s] = [entre(2, 5), entre(2, 6)];
    const r = q * s;
    const j = aSub(a, b);
    const faux = [`${r - s}${eiT(j)}`, `${q}${eiT(aAdd(a, b))}`, `${q + 1}${eiT(j)}`, `${q}${eiT(aSub(b, a))}`, `${r * s}${eiT(j)}`];
    return qcm(pose(F_CALC_EXP, `\\dfrac{${r}${eiT(a)}}{${s}${eiT(b)}}`), `$${q}${eiT(j)}$`, faux.map((x) => `$${x}$`), ex4(`Modules : $${r} \\div ${s} = ${q}$. Arguments : on soustrait, puis on ramène dans $]-\\pi\\,;\\pi]$.`, `Le résultat est $${q}${eiT(j)}$.`));
  }),
  tpl(M4, 8, 2, "Formule de Moivre : le module à la puissance n, l'argument multiplié par n.", () => {
    const a = un(ANGLES_REM);
    const n = entre(2, 5);
    const j = aMul(n, a);
    if (Math.random() < 0.5) {
      const r = entre(2, 3);
      const faux = [`${r * n}${eiT(j)}`, `${r ** n}${eiT(a)}`, `${r ** n + 1}${eiT(j)}`, `${r ** n}${eiT(aAdd(j, [1, 2]))}`, `${r ** n}${eiT(aAdd(j, [1, 1]))}`];
      return qcm(pose(F_CALC_EXP, `\\left(${r}${eiT(a)}\\right)^{${n}}`), `$${r ** n}${eiT(j)}$`, faux.map((x) => `$${x}$`), ex4(`Module : $${r}^{${n}} = ${r ** n}$. Argument : ${n} fois $${angT(a)}$, ramené dans $]-\\pi\\,;\\pi]$.`, `Le résultat est $${r ** n}${eiT(j)}$.`));
    }
    const faux = [eiT(a), eiT(aAdd(j, [1, 1])), eiT(aAdd(j, [1, 2])), eiT(princ([-j[0], j[1]])), eiT(aAdd(a, [1, 1])), eiT(aAdd(j, [1, 3])), eiT(aAdd(j, [-1, 6]))].filter((s) => s !== eiT(j));
    return qcm(pose(F_CALC_EXP, `\\left(${trigT("1", a)}\\right)^{${n}}`), `$${eiT(j)}$`, faux.map((x) => `$${x}$`), ex4(`Moivre : $(\\cos\\theta + i\\sin\\theta)^{n} = \\cos(n\\theta) + i\\sin(n\\theta)$, avec $n = ${n}$.`, `Le résultat est $${eiT(j)}$.`));
  }),
  tpl(M4, 9, 2, "Module d'abord, argument ensuite, puis écris r e^(iθ).", () => {
    const r = remTire(4);
    const faux = [rE(r.rT, princ([-r.a[0], r.a[1]])), rE(r.rT, aSub([1, 1], r.a)), rE(r.rT, aAdd(r.a, [1, 2])), rE(String(Math.ceil(r.r) + 1), r.a), rE(r.rT, aAdd(r.a, [1, 1]))];
    return qcm(pose(F_EXPO, `z = ${r.t}`), `$${rE(r.rT, r.a)}$`, faux.map((s) => `$${s}$`), ex4(`$\\left|z\\right| = ${r.rT}$, et l'argument se reconnaît avec le cosinus et le sinus.`, `$z = ${rE(r.rT, r.a)}$.`));
  }),
  tpl(M4, 10, 2, "Formules d'Euler : l'une ajoute e^(iθ) et e^(−iθ), l'autre les soustrait et divise par 2i.", () => {
    const [j, faux] = un(EULER);
    const v = un(["x", "t"]);
    return qcm(un(F_EG), pile(avecLettre(j, v)), faux.map((s) => pile(avecLettre(s, v))), ex4("$\\mathrm{e}^{ix} = \\cos(x) + i\\sin(x)$ et $\\mathrm{e}^{-ix} = \\cos(x) - i\\sin(x)$ : on ajoute ou on soustrait.", `La formule juste est $${avecLettre(j, v)}$.`));
  }),

  tpl(M4, 11, 3, "Passe par la forme exponentielle : la puissance devient facile.", () => {
    const [k, type, ns] = un(PUISS);
    const r = rem(k, type, signe(), signe());
    const n = un(ns);
    const a = aMul(n, r.a);
    const c = Math.cos((a[0] * Math.PI) / a[1]);
    const s = Math.sin((a[0] * Math.PI) / a[1]);
    const v = r.r ** n;
    const j: Z = [Math.round(v * c), Math.round(v * s)];
    return courtZ(pose(["Calcule cette puissance à l'aide de la forme exponentielle.", "Écris ce nombre sous la forme $a + bi$, en passant par la forme exponentielle.", "Sans développer, calcule ce nombre.", "Utilise la formule de Moivre pour calculer ce nombre.", "Que vaut cette puissance ?", "Calcule cette puissance : module et argument d'abord.", "Donne la forme algébrique de cette puissance.", "Trouve la valeur exacte de cette puissance.", "Module, argument, puis puissance : quel résultat obtient-on ?", "Grâce à Moivre, réduis ce nombre."], `(${r.t})^{${n}}`), j, ex4(`$${r.t} = ${rE(r.rT, r.a)}$, donc le module devient $${r.rT}$ à la puissance ${n} et l'argument $${angT(a)}$.`, `Le résultat est $${zT(j)}$.`));
  }),
  tpl(M4, 12, 3, "Remplace cos et sin par les formules d'Euler, développe, puis regroupe.", () => {
    const [f, j, faux] = un(LINEAR);
    const v = un(["x", "t"]);
    return qcm(pose(F_LINEAR, avecLettre(f, v)), pile(avecLettre(j, v)), faux.map((s) => pile(avecLettre(s, v))), ex4("On remplace par les formules d'Euler, on développe, puis on regroupe les exponentielles deux à deux.", `On obtient $${avecLettre(j, v)}$.`));
  }),
  tpl(M4, 13, 3, "Développe (cos x + i sin x)^n et identifie avec cos(nx) + i sin(nx).", () => {
    const [j, faux] = un(MOIVRE);
    const v = un(["x", "t"]);
    return qcm(`${un(F_EG)} Tu peux partir de la formule de Moivre.`, pile(avecLettre(j, v)), faux.map((s) => pile(avecLettre(s, v))), ex4("On développe $(\\cos x + i\\sin x)^{n}$ et on identifie avec $\\cos(nx) + i\\sin(nx)$.", `La formule juste est $${avecLettre(j, v)}$.`));
  }),
  tpl(M4, 14, 3, "Chaque rotation multiplie par e^(iθ) : après n étapes, l'argument gagne nθ.", () => {
    const r = entre(2, 9);
    const a0 = un(ANGLES_REM);
    const th = un<A>([[1, 6], [1, 4], [1, 3], [-1, 6], [-1, 4], [-1, 3], [1, 2], [-1, 2]]);
    const n = entre(2, 9);
    const j = aAdd(a0, aMul(n, th));
    const faux = [eiT(aAdd(a0, th)), eiT(aMul(n, aAdd(a0, th))), eiT(aAdd(j, [1, 1])), eiT(aSub(a0, aMul(n, th))), eiT(aAdd(j, [1, 2])), eiT(aAdd(j, [1, 3])), eiT(aAdd(j, [-1, 6]))].filter((s) => s !== eiT(j));
    const { t } = un(TOURS)(`${r}${eiT(a0)}`, n, angT(th));
    return qcm(t, `$${r}${eiT(j)}$`, faux.map((s) => `$${r}${s}$`), ex4(`Le module reste ${r}. L'argument devient $${angT(a0)} + ${n} \\times ${th[0] < 0 ? `\\left(${angT(th)}\\right)` : angT(th)}$, ramené dans $]-\\pi\\,;\\pi]$.`, `La position est $${r}${eiT(j)}$.`));
  }),
  tpl(M4, 15, 3, "Écris chaque nombre sous forme exponentielle, puis applique les règles.", () => {
    const u = rem(1, 4, signe(), signe());
    const w = rem(1, un([3, 6] as const), signe(), signe());
    const prod = Math.random() < 0.5;
    const j = prod ? aAdd(u.a, w.a) : aSub(u.a, w.a);
    const mod = prod ? "2\\sqrt{2}" : "\\dfrac{\\sqrt{2}}{2}";
    const f = prod ? `(${u.t})(${w.t})` : `\\dfrac{${u.t}}{${w.t}}`;
    const faux = [rE(mod, aAdd(j, [1, 1])), rE(prod ? "\\dfrac{\\sqrt{2}}{2}" : "2\\sqrt{2}", j), rE(mod, prod ? aSub(u.a, w.a) : aAdd(u.a, w.a)), rE("\\sqrt{2}", j), rE(mod, aAdd(j, [1, 2]))];
    return qcm(pose(F_CALC_EXP, f), `$${rE(mod, j)}$`, faux.map((s) => `$${s}$`), ex4(`$${u.t} = ${rE(u.rT, u.a)}$ et $${w.t} = ${rE(w.rT, w.a)}$.`, `Le résultat est $${rE(mod, j)}$.`));
  }),

  /* ===== cx_equation_second_degre ===== */
  tpl(M5, 1, 1, "z² = −k² a pour solutions ik et −ik.", () => {
    const type = Math.random() < 0.6;
    if (type) {
      const k = entre(2, 12);
      const faux = [paire(String(k), String(-k)), paire(`${k * k}i`, `-${k * k}i`), paire(`${k}i`, String(k)), paire(`${k + 1}i`, `-${k + 1}i`)];
      return qcm(pose(F_PAIRE, `z^{2} = -${k * k}`), paire(`${k}i`, `-${k}i`), faux, ex5(`$-${k * k} = (${k}i)^{2}$.`, `$z = ${k}i$ ou $z = -${k}i$.`));
    }
    const n = un([2, 3, 5, 6, 7, 10, 11, 13]);
    const faux = [paire(`\\sqrt{${n}}`, `-\\sqrt{${n}}`), paire(`${n}i`, `-${n}i`), paire(`i\\sqrt{${n + 1}}`, `-i\\sqrt{${n + 1}}`), paire(`i\\sqrt{${n}}`, `\\sqrt{${n}}`)];
    return qcm(pose(F_PAIRE, `z^{2} + ${n} = 0`), paire(`i\\sqrt{${n}}`, `-i\\sqrt{${n}}`), faux, ex5(`$z^{2} = -${n} = \\left(i\\sqrt{${n}}\\right)^{2}$.`, `$z = i\\sqrt{${n}}$ ou $z = -i\\sqrt{${n}}$.`));
  }),
  tpl(M5, 2, 1, "Δ = b² − 4ac, avec les signes de a, b et c.", () => {
    const [a, b, c] = [un([1, 1, 2, 3, -1]), nz(7), nz(9)];
    const eq = Math.random() < 0.5;
    return court(pose(["Calcule le discriminant de ce trinôme.", "Que vaut le discriminant ?", "Quelle est la valeur de $\\Delta$ ?", "Donne le discriminant de cette expression.", "Trouve $\\Delta$.", "Calcule $\\Delta = b^{2} - 4ac$ ici.", "Détermine le discriminant.", "Quel nombre obtient-on pour $\\Delta$ ?", "Sans résoudre, calcule son discriminant.", "Commence par le discriminant : combien vaut-il ?"], `${polyT(a, b, c)}${eq ? " = 0" : ""}`), b * b - 4 * a * c, ex5(`$\\Delta = ${b < 0 ? `(${b})` : b}^{2} - 4 \\times ${a < 0 ? `(${a})` : a} \\times ${c < 0 ? `(${c})` : c}$.`, `$\\Delta = ${b * b - 4 * a * c}$.`));
  }),
  tpl(M5, 3, 1, "Un réel négatif −k² a pour racines carrées ik et −ik.", () => {
    const k = entre(2, 12);
    const N = k * k;
    const faux = [`${N}i`, String(k), `${k + 1}i`, `${2 * k}i`, `-${N}`, String(N)];
    return qcm(pose(["Quel nombre a pour carré ce réel négatif ?", "Lequel de ces complexes, élevé au carré, donne ce nombre ?", "Parmi ces propositions, laquelle est une racine carrée de ce réel ?", "Quelle est une racine carrée complexe de ce nombre ?", "Trouve un complexe dont le carré vaut ce nombre.", "Quel complexe $w$ vérifie $w^{2} =$ ce nombre ?", "Choisis une racine carrée complexe de ce nombre.", "Ce discriminant est négatif. Quelle proposition en est une racine carrée ?", "Sans calculatrice, repère une racine carrée de ce nombre.", "Laquelle de ces valeurs a ce nombre pour carré ?"], `-${N}`), `$${Math.random() < 0.5 ? `${k}i` : `-${k}i`}$`, faux.map((s) => `$${s}$`), ex5(`$(${k}i)^{2} = ${N}i^{2} = -${N}$.`, `Les racines carrées de $-${N}$ sont $${k}i$ et $-${k}i$.`));
  }),
  tpl(M5, 4, 1, "Remplace z par chaque proposition et calcule, ou résous l'équation.", () => {
    const [p, q] = [nz(6), entre(1, 6)];
    const s: Z = [p, q * signe()];
    const faux: Z[] = [[-p, s[1]], [s[1], p], [p, s[1] + 1], [p, s[1] - 1], [p + 1, s[1]], [-p, -s[1]]].filter((w) => !(w[0] === p && Math.abs(w[1]) === q) && !(w[1] === 0)) as Z[];
    return qcm(pose(F_CHOIX_SOL, `${polyT(1, -2 * p, p * p + q * q)} = 0`), `$${zT(s)}$`, faux.map((w) => `$${zT(w)}$`), ex5(`$\\Delta = ${4 * p * p - 4 * (p * p + q * q)}$, et les solutions sont $${zT([p, q])}$ et $${zT([p, -q])}$.`, `Parmi les propositions, $${zT(s)}$ convient.`));
  }),

  tpl(M5, 5, 2, "Δ est négatif : z = (−b ± i√(−Δ)) ÷ 2.", () => {
    const [p, q] = [nz(7), entre(1, 7)];
    const faux = [paireZ([-p, q], [-p, -q]), paireZ([p, q + 1], [p, -q - 1]), paireZ([q, p], [q, -p]), paire(String(p + q), String(p - q)), paireZ([2 * p, q], [2 * p, -q])];
    return qcm(pose(F_PAIRE, `${polyT(1, -2 * p, p * p + q * q)} = 0`), paireZ([p, q], [p, -q]), faux, ex5(`$\\Delta = ${-4 * q * q} = (${2 * q}i)^{2}$.`, `$z = ${zT([p, q])}$ ou $z = ${zT([p, -q])}$.`));
  }),
  tpl(M5, 6, 2, "Écris Δ = (i√|Δ|)², puis applique la formule.", () => {
    for (;;) {
      const [a, b, c] = [un([1, 1, 2, 3]), nz(5), entre(1, 9)];
      const D = 4 * a * c - b * b;
      if (D <= 0) continue;
      const s = Math.sqrt(D);
      const ent = Number.isInteger(s);
      if (ent ? pgcd(pgcd(b, 2 * a), s) !== 1 : pgcd(b, 2 * a) !== 1) continue;
      const rad = (x: number) => (Number.isInteger(Math.sqrt(x)) ? `${Math.sqrt(x) === 1 ? "" : Math.sqrt(x)}i` : `i\\sqrt{${x}}`);
      const racT = (hb: number, D2: number, d: number) => [`\\dfrac{${hb} + ${rad(D2)}}{${d}}`, `\\dfrac{${hb} - ${rad(D2)}}{${d}}`];
      const [u, v] = racT(-b, D, 2 * a);
      const faux = [paire(...(racT(b, D, 2 * a) as [string, string])), paire(...(racT(-b, D + 1 + (Number.isInteger(Math.sqrt(D + 1)) ? 1 : 0), 2 * a) as [string, string])), paire(...(racT(-b, D, a === 1 ? 4 : a) as [string, string])), paire(...(racT(-b, D + 4 * a, 2 * a) as [string, string]))];
      return qcm(pose(F_PAIRE, `${polyT(a, b, c)} = 0`), paire(u, v), faux, ex5(`$\\Delta = ${-D}$, et $${-D} = (${rad(D)})^{2}$.`, `$z = ${u}$ ou $z = ${v}$.`));
    }
  }),
  tpl(M5, 7, 2, "Avec des coefficients réels, les solutions non réelles sont conjuguées.", () => {
    const z: Z = [nz(7), nz(7)];
    return courtZ(`${phrase(["Cette équation à coefficients réels a pour solution le nombre donné.", "Le nombre $z_{1}$ est solution de cette équation à coefficients réels.", "Une solution de cette équation est connue.", "On connaît une racine de cette équation à coefficients réels.", "Cette équation a deux solutions, et $z_{1}$ en est une."], ["Quelle est l'autre solution ?", "Écris la seconde solution.", "Sans calcul, donne l'autre solution.", "Trouve l'autre racine.", "Déduis-en l'autre solution, sous la forme $a + bi$."])}\n\n$z_{1} = ${zT(z)}$\n\n$${polyT(1, -2 * z[0], zN2(z))} = 0$`, zConj(z), ex5("Les coefficients sont réels : le conjugué d'une solution est aussi solution.", `L'autre solution est $${zT(zConj(z))}$.`));
  }),
  tpl(M5, 8, 2, "Somme des solutions : 2p. Produit : p² + q².", () => {
    const z: Z = [nz(6), nz(6)];
    const [S, P] = [2 * z[0], zN2(z)];
    const faux = [polyT(1, S, P), polyT(1, -S, -P), polyT(1, -z[0], P), polyT(1, -S, z[0] * z[0] - z[1] * z[1]), polyT(1, S, -P)];
    return qcm(pose(["Quel trinôme à coefficients réels a ce nombre pour racine ?", "Lequel de ces trinômes s'annule en ce nombre ?", "Ce nombre est racine d'un de ces trinômes. Lequel ?", "Trouve le trinôme dont ce complexe est une racine.", "Pour lequel de ces trinômes $z_{1}$ est-il une racine ?", "Quel trinôme réel admet $z_{1}$ et son conjugué pour racines ?", "Avec la somme et le produit des racines, trouve le bon trinôme.", "Choisis le trinôme qui admet cette racine.", "Une ingénieure veut un trinôme réel de racine $z_{1}$. Lequel choisir ?", "Lequel de ces trinômes a pour racines $z_{1}$ et son conjugué ?"], `z_{1} = ${zT(z)}`), `$${polyT(1, -S, P)}$`, faux.map((s) => `$${s}$`), ex5(`Somme des racines : $${S}$. Produit : $${P}$. Le trinôme est $z^{2} - Sz + P$.`, `C'est $${polyT(1, -S, P)}$.`));
  }),
  tpl(M5, 9, 2, "Le signe de Δ décide de la nature des solutions.", () => {
    const C = ["Deux solutions réelles distinctes", "Une solution réelle double", "Deux solutions complexes conjuguées, non réelles", "Aucune solution dans $\\mathbb{C}$"];
    const type = entre(0, 3);
    let a = 1, b = 0, c = 0;
    if (type <= 1) {
      const [r, s] = [nz(6), nz(6)];
      a = un([1, 2]);
      b = -a * (r + s);
      c = a * r * s;
      if (r === s) { b = -a * (r + r + 1); c = a * r * (r + 1); }
    } else if (type === 2) {
      const r = nz(6);
      a = un([1, 2]);
      b = -2 * a * r;
      c = a * r * r;
    } else {
      a = un([1, 2, 3]);
      b = nz(4);
      c = Math.ceil((b * b) / (4 * a)) + entre(1, 6);
    }
    const D = b * b - 4 * a * c;
    const j = D > 0 ? C[0] : D === 0 ? C[1] : C[2];
    return qcm(pose(["Combien de solutions cette équation a-t-elle, et de quelle nature ?", "Quelle est la nature des solutions dans $\\mathbb{C}$ ?", "Sans résoudre, que peut-on dire de ses solutions ?", "Que dit le discriminant sur ses solutions ?", "Calcule $\\Delta$ et décris les solutions.", "Quelles solutions cette équation a-t-elle dans $\\mathbb{C}$ ?", "Choisis la phrase juste sur ses solutions.", "Quelle phrase décrit ses solutions ?", "Quel type de solutions a-t-elle ?", "Une seule phrase est juste sur ses solutions. Laquelle ?"], `${polyT(a, b, c)} = 0`), j, C, ex5(`$\\Delta = ${D}$.`, `${j}.`));
  }),

  tpl(M5, 10, 3, "Pose (a + bi)² = w, identifie les parties réelles et imaginaires.", () => {
    const z: Z = [entre(1, 6) * signe(), entre(1, 6) * signe()];
    const w = zMul(z, z);
    const zp: Z = z[0] > 0 ? z : zK(-1, z);
    return courtZ(pose(["Trouve une racine carrée de ce complexe, sous la forme $a + bi$ avec $a > 0$.", "Quel complexe de partie réelle positive a ce nombre pour carré ?", "Cherche $a + bi$, avec $a > 0$, dont le carré est ce nombre.", "Trouve $w$ de partie réelle positive, avec $w^{2}$ égal à ce nombre.", "Donne la racine carrée de ce nombre dont la partie réelle est positive.", "Écris la racine carrée de ce nombre qui a une partie réelle positive.", "Quelle racine carrée de ce nombre a une partie réelle positive ?", "Pose $(a + bi)^{2}$ égal à ce nombre, avec $a > 0$. Que vaut $a + bi$ ?", "Ce complexe a deux racines carrées. Donne celle dont la partie réelle est positive.", "Trouve le complexe de partie réelle positive dont le carré vaut ce nombre."], zT(w)), zp, ex5(`On pose $(a + bi)^{2} = ${zT(w)}$ : $a^{2} - b^{2} = ${w[0]}$ et $2ab = ${w[1]}$, et aussi $a^{2} + b^{2} = ${zN2(z)}$.`, `La racine cherchée est $${zT(zp)}$ ; l'autre est son opposé.`));
  }),
  tpl(M5, 11, 3, "Somme et produit des racines se lisent sur les coefficients : teste chaque paire.", () => {
    for (;;) {
      const [u, v] = [zTire(4), zTire(4)];
      const [s, p] = [zAdd(u, v), zMul(u, v)];
      if (s[0] === 0 || s[1] === 0 || p[0] === 0 || p[1] === 0) continue;
      if (u[0] === v[0] && u[1] === v[1]) continue;
      const faux = [paireZ(zK(-1, u), zK(-1, v)), paireZ(u, zConj(u)), paireZ(zConj(u), zConj(v)), paireZ(s, p), paireZ(v, zConj(v))];
      return qcm(pose(F_PAIRE, `z^{2} + ${zP(zK(-1, s))}z${suite(p)} = 0`), paireZ(u, v), faux, ex5(`La somme des solutions vaut $${zT(s)}$ et leur produit $${zT(p)}$. Ici le coefficient de $z$ est complexe : les solutions ne sont pas conjuguées.`, `$z = ${zT(u)}$ ou $z = ${zT(v)}$.`));
    }
  }),
  tpl(M5, 12, 3, "Factorise par (z − r), puis résous l'équation du second degré restante.", () => {
    const r = nz(4);
    const [p, q] = [nz(4), entre(1, 4)];
    const N = p * p + q * q;
    const [b, c, d] = [-2 * p - r, N + 2 * p * r, -r * N];
    const cube = `z^{3}${b === 0 ? "" : ` ${b < 0 ? "-" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}z^{2}`}${c === 0 ? "" : ` ${c < 0 ? "-" : "+"} ${Math.abs(c) === 1 ? "" : Math.abs(c)}z`} ${d < 0 ? "-" : "+"} ${Math.abs(d)}`;
    const faux = [paireZ([-p, q], [-p, -q]), paireZ([p, q + 1], [p, -q - 1]), paireZ([q, p], [q, -p]), paireZ([p + 1, q], [p + 1, -q])];
    const debut = phrase(
      [`Cette équation a pour solution le réel $${r}$.`, `Le réel $${r}$ est une solution évidente de cette équation.`, `On vérifie que $z = ${r}$ est solution de cette équation.`, `Cette équation admet la racine réelle $${r}$.`, `La valeur $${r}$ annule ce polynôme de degré 3.`],
      ["Quelles sont les deux autres solutions ?", "Trouve les deux solutions non réelles.", "Donne les deux autres racines.", "Factorise, puis donne les deux solutions restantes."],
    );
    return qcm(`${debut}\n\n$${cube} = 0$`, paireZ([p, q], [p, -q]), faux, ex5(`On factorise : $(z ${r < 0 ? "+" : "-"} ${Math.abs(r)})(${polyT(1, -2 * p, N)})$, puis on résout le second facteur.`, `$z = ${zT([p, q])}$ ou $z = ${zT([p, -q])}$.`));
  }),
  tpl(M5, 13, 3, "Calcule Δ : la partie imaginaire positive est √(−Δ) ÷ 2a.", () => {
    const [p, q] = [entre(1, 6), entre(1, 9)];
    return court(`${un(OSCILL)} ${un(FIN_OSC)}\n\n$${polyT(1, 2 * p, p * p + q * q, "r")} = 0$`, q, ex5(`$\\Delta = ${-4 * q * q}$, donc les racines sont $${-p} \\pm ${q === 1 ? "" : q}i$.`, `La partie imaginaire positive vaut $${q}$.`));
  }),
  tpl(M5, 14, 3, "Remplace z par la solution donnée, puis identifie.", () => {
    const z: Z = [nz(6), nz(6)];
    const [S, P] = [2 * z[0], zN2(z)];
    const inconnueB = Math.random() < 0.5;
    const eq = inconnueB ? `z^{2} + mz + ${P} = 0` : `${polyT(1, -S, 0)} + m = 0`;
    const debut = phrase(
      ["Le nombre $z_{1}$ est solution de cette équation, où $m$ est un réel.", "Cette équation à coefficients réels admet $z_{1}$ pour solution.", "On sait que $z_{1}$ vérifie cette équation, avec $m$ réel.", "Une ingénieure cherche le réel $m$ pour que $z_{1}$ soit solution.", "Pour une valeur réelle de $m$, le nombre $z_{1}$ est racine de cette équation."],
      ["Que vaut $m$ ?", "Calcule $m$.", "Trouve la valeur de $m$.", "Détermine $m$."],
    );
    return court(`${debut}\n\n$z_{1} = ${zT(z)}$\n\n$${eq}$`, inconnueB ? -S : P, ex5(`Les solutions sont $z_{1}$ et son conjugué : leur somme vaut $${S}$ et leur produit $${P}$.`, `$m = ${inconnueB ? -S : P}$.`));
  }),

  /* ===== cx_racines_nieme ===== */
  tpl(M6, 1, 1, "Dans ℂ, zⁿ = w a exactement n solutions dès que w n'est pas nul.", () => {
    const n = entre(2, 9);
    const w = un(["1", "-1", "i", "8", "1 + i", "-2i"]);
    return court(pose(["Combien de solutions complexes cette équation a-t-elle ?", "Quel est le nombre de solutions dans $\\mathbb{C}$ ?", "Combien de nombres complexes vérifient cette égalité ?", "Combien de racines cette équation a-t-elle dans $\\mathbb{C}$ ?", "Donne le nombre de solutions complexes.", "Dans $\\mathbb{C}$, combien cette équation a-t-elle de solutions ?", "Compte les solutions de cette équation dans $\\mathbb{C}$.", "Combien de points images ses solutions donnent-elles ?", "Sans résoudre, combien de solutions complexes y a-t-il ?", "Quel nombre de solutions faut-il attendre dans $\\mathbb{C}$ ?"], `z^{${n}} = ${w}`), n, ex6("Le second membre n'est pas nul.", `Il y a ${n} solutions.`));
  }),
  tpl(M6, 2, 1, "Élève chaque proposition à la puissance n : l'argument doit devenir un multiple de 2π.", () => {
    const n = un([3, 4, 5, 6, 8, 10, 12]);
    const k = entre(1, n - 1);
    const j: A = princ([2 * k, n]);
    const faux = [rE("1", princ([1, n])), rE("2", j), rE("1", princ([1, n + 1])), rE("1", princ([3, 2 * n])), rE("3", princ([2, n]))];
    return qcm(pose(F_CHOIX_SOL, `z^{${n}} = 1`), `$${eiT(j)}$`, faux.filter((s) => s !== eiT(j)).map((s) => `$${s}$`), ex6(`$\\left(${eiT(j)}\\right)^{${n}} = \\mathrm{e}^{i \\times ${2 * k}\\pi} = 1$.`, `$${eiT(j)}$ est une racine ${rac(n)} de 1.`));
  }),
  tpl(M6, 3, 1, "Le nombre j vérifie j³ = 1 et 1 + j + j² = 0.", () => {
    const n = entre(4, 40);
    const r = n % 3;
    const forme = un<[string, string, string[]]>([
      ["1 + j + j^{2}", "0", ["1", "j", "-1"]],
      ["j + j^{2}", "-1", ["1", "0", "j"]],
      ["1 + j", "-j^{2}", ["j^{2}", "-1", "0"]],
      ["1 + j^{2}", "-j", ["j", "j^{2}", "1"]],
      ["j^{3}", "1", ["0", "-1", "j"]],
      [`j^{${n}}`, r === 0 ? "1" : r === 1 ? "j" : "j^{2}", ["1", "j", "j^{2}", "-1"]],
    ]);
    const debut = un(["On note $j = \\mathrm{e}^{i\\frac{2\\pi}{3}}$.", "Le nombre $j = \\mathrm{e}^{i\\frac{2\\pi}{3}}$ est une racine cubique de 1.", "Soit $j = \\mathrm{e}^{i\\frac{2\\pi}{3}}$.", "Avec $j = \\mathrm{e}^{i\\frac{2\\pi}{3}}$, on calcule vite."]);
    const fin = un(["Que vaut ce nombre ?", "Simplifie cette expression.", "À quoi cette expression est-elle égale ?", "Calcule ce nombre.", "Quelle est sa valeur ?", "Réduis cette écriture."]);
    return qcm(`${debut} ${fin}\n\n$${forme[0]}$`, `$${forme[1]}$`, forme[2].map((s) => `$${s}$`), ex6("$j^{3} = 1$ et $1 + j + j^{2} = 0$ : on réduit l'exposant modulo 3.", `Le résultat est $${forme[1]}$.`));
  }),
  tpl(M6, 4, 1, "Les images des racines n-ièmes de 1 sont les sommets d'un polygone régulier à n côtés.", () => {
    const N = ["un triangle équilatéral", "un carré", "un pentagone régulier", "un hexagone régulier", "un octogone régulier"];
    const [n, nom] = un<[number, string]>([[3, N[0]], [4, N[1]], [5, N[2]], [6, N[3]], [8, N[4]]]);
    return qcm(pose(["Quelle figure forment les images de ces solutions ?", "Dans le plan complexe, ses solutions dessinent quelle figure ?", "Quels sommets ses solutions donnent-elles ?", "Sur le cercle de rayon 1, quelle figure ces solutions forment-elles ?", "Place les solutions : quelle figure obtient-on ?", "Quelle est la figure formée par les images de ces racines ?", "Quel polygone relie les images de ces solutions ?", "Les points images de ces solutions forment quoi ?", "Une graphiste dessine les solutions de cette équation. Quelle forme voit-elle ?", "Quel polygone régulier ces racines dessinent-elles ?"], `z^{${n}} = 1`), `C'est ${nom}`, N.filter((x) => x !== nom).map((x) => `C'est ${x}`), ex6(`Il y a ${n} solutions, régulièrement réparties sur le cercle de rayon 1.`, `C'est ${nom}.`));
  }),

  tpl(M6, 5, 2, "ωᵏ a pour argument 2kπ ÷ n, ramené dans ]−π ; π].", () => {
    const n = un([3, 4, 5, 6, 8, 10, 12]);
    const k = entre(2, 2 * n);
    const a = princ([2, n]);
    const j = aMul(k, a);
    const debut = un([`On pose $\\omega = ${eiT(a)}$.`, `Soit $\\omega = ${eiT(a)}$.`, `Le nombre $\\omega = ${eiT(a)}$ est une racine ${rac(n)} de 1.`, `Prenons $\\omega = ${eiT(a)}$.`]);
    const fin = un(["Quelle est la mesure principale de l'argument de ce nombre ?", "Quel est l'argument principal de ce nombre ?", "Donne l'argument de ce nombre, dans $]-\\pi\\,;\\pi]$.", "Choisis l'argument principal de ce nombre.", "Trouve sa mesure principale.", "Quelle mesure principale a-t-il ?"]);
    return qcm(`${debut} ${fin}\n\n$\\omega^{${k}}$`, `$${angT(j)}$`, fauxAngles(j).map((s) => `$${s}$`), ex6(`L'argument vaut $${k} \\times ${angT(a)}$, ramené dans $]-\\pi\\,;\\pi]$.`, `La mesure principale est $${angT(j)}$.`));
  }),
  tpl(M6, 6, 2, "Si zⁿ = w, alors |z|ⁿ = |w| : le module vaut la racine n-ième de |w|.", () => {
    const n = un([2, 3, 3, 4, 4, 5]);
    const r = entre(2, n >= 4 ? 3 : 5);
    const w = un<string>([String(r ** n), `-${r ** n}`, `${r ** n}i`, `-${r ** n}i`]);
    return court(pose(["Quel est le module de chacune des solutions ?", "Toutes les solutions ont le même module. Lequel ?", "Sur quel cercle centré à l'origine sont les solutions ? Donne son rayon.", "Que vaut le module des solutions ?", "Quel est le rayon du cercle qui porte leurs images ?", "Calcule $\\left|z\\right|$ pour une solution $z$.", "Donne le module commun de ces solutions.", "Quelle distance sépare chaque image de l'origine ?", "Que vaut $\\left|z\\right|$ pour ces solutions ?", "Trouve le module de ces racines."], `z^{${n}} = ${w}`), r, ex6(`$\\left|z\\right|^{${n}} = ${r ** n}$.`, `$\\left|z\\right| = ${r}$.`));
  }),
  tpl(M6, 7, 2, "Écris z = r e^(iθ) : rⁿ doit valoir le module, nθ l'argument à 2π près.", () => {
    const n = un([2, 3, 4, 5, 6]);
    const r = entre(2, n >= 5 ? 2 : 3);
    const k = entre(1, n - 1);
    const j = princ([2 * k, n]);
    const faux = [rE(String(r), princ([2 * k + 1, n])), rE(String(r + 1), j), rE(String(r ** n), j), rE(String(r), princ([1, 2 * n + 1])), rE(String(r), princ([2 * k + 1, 2 * n]))];
    return qcm(pose(F_CHOIX_SOL, `z^{${n}} = ${r ** n}`), `$${rE(String(r), j)}$`, faux.map((s) => `$${s}$`), ex6(`Module : $${r}^{${n}} = ${r ** n}$. Argument : ${n} fois $${angT(j)}$ est un multiple de $2\\pi$.`, `$${rE(String(r), j)}$ est solution.`));
  }),
  tpl(M6, 8, 2, "ωⁿ = 1 : réduis l'exposant en enlevant des multiples de n.", () => {
    const n = un([4, 5, 6, 7, 8, 9]);
    const m = entre(n + 1, 60);
    const r = m % n;
    const dire = (x: number) => (x === 0 ? "1" : x === 1 ? "\\omega" : `\\omega^{${x}}`);
    const faux = [1, 2, 3, 4, 5, 6].map((d) => dire((r + d) % n)).filter((s) => s !== dire(r));
    const debut = un([`On pose $\\omega = ${eiT(princ([2, n]))}$, qui vérifie $\\omega^{${n}} = 1$.`, `Soit $\\omega$ une racine ${rac(n)} de 1, avec $\\omega = ${eiT(princ([2, n]))}$.`, `Pour $\\omega = ${eiT(princ([2, n]))}$, on a $\\omega^{${n}} = 1$.`]);
    const fin = un(["Écris ce nombre plus simplement.", "À quoi ce nombre est-il égal ?", "Réduis cette puissance.", "Simplifie cette puissance.", "Que vaut ce nombre ?", "Quelle écriture plus simple convient ?"]);
    return qcm(`${debut} ${fin}\n\n$\\omega^{${m}}$`, `$${dire(r)}$`, faux.map((s) => `$${s}$`), ex6(`$${m} = ${n} \\times ${Math.floor(m / n)} + ${r}$ et $\\omega^{${n}} = 1$.`, `$\\omega^{${m}} = ${dire(r)}$.`));
  }),

  tpl(M6, 9, 3, "Écris le second membre sous forme exponentielle, puis divise l'argument par n.", () => {
    const [w, n, r, a] = un<[string, number, number, A]>([
      ["8i", 3, 2, [1, 6]], ["-8", 3, 2, [1, 3]], ["-8i", 3, 2, [-1, 6]], ["27i", 3, 3, [1, 6]], ["-27", 3, 3, [1, 3]], ["-27i", 3, 3, [-1, 6]], ["16i", 4, 2, [1, 8]], ["-16", 4, 2, [1, 4]], ["-81", 4, 3, [1, 4]], ["-32", 5, 2, [1, 5]], ["4i", 2, 2, [1, 4]], ["-4i", 2, 2, [-1, 4]], ["9i", 2, 3, [1, 4]], ["-64", 6, 2, [1, 6]],
    ]);
    const faux = [rE(String(r), aAdd(a, princ([1, n]))), rE(String(r + 1), a), rE(String(r), aMul(2, a)), rE(String(r), aAdd(a, [1, 2 * n])), rE(String(r), aAdd(a, [1, 3 * n]))];
    return qcm(pose(F_CHOIX_SOL, `z^{${n}} = ${w}`), `$${rE(String(r), a)}$`, faux.map((s) => `$${s}$`), ex6(`Le second membre a pour module $${r ** n}$. On prend la racine ${rac(n)} du module, et ${n} fois $${angT(a)}$ redonne son argument.`, `$${rE(String(r), a)}$ est solution.`));
  }),
  tpl(M6, 10, 3, "Le côté du polygone est la distance entre deux racines voisines : |ω − 1|.", () => {
    const [n, j] = un<[number, string]>([[3, "\\sqrt{3}"], [4, "\\sqrt{2}"], [6, "1"]]);
    const faux = ["\\sqrt{3}", "\\sqrt{2}", "1", "2", "\\dfrac{1}{2}", "\\dfrac{\\sqrt{3}}{2}"];
    const debut = un([`On pose $\\omega = ${eiT(princ([2, n]))}$. Les points $A$ et $B$ ont pour affixes $1$ et $\\omega$, deux sommets voisins de ce polygone.`, `Ce polygone régulier a pour sommets les racines ${rac(n)}s de 1. On note $\\omega = ${eiT(princ([2, n]))}$ l'affixe de $B$ et $1$ celle de $A$.`, `Avec $\\omega = ${eiT(princ([2, n]))}$, les sommets voisins $A$ et $B$ du polygone ont pour affixes $1$ et $\\omega$.`]);
    const fin = un(["Quelle est la longueur du côté $AB$ ?", "Calcule cette distance.", "Que vaut la longueur $AB$ ?", "Trouve la mesure du côté de ce polygone.", "Quelle est la valeur exacte de $AB$ ?", "Calcule ce module."]);
    return qcm(`${debut} ${fin}\n\n$\\left|\\omega - 1\\right|$`, `$${j}$`, faux.map((s) => `$${s}$`), ex6(`$\\left|\\omega - 1\\right|^{2} = 2 - 2\\cos\\left(\\dfrac{2\\pi}{${n}}\\right)$.`, `Le côté mesure $${j}$.`), polygoneUnite(n));
  }),
  tpl(M6, 11, 3, "Le sommet numéro k a pour affixe r × e^(2ikπ ÷ n).", () => {
    const [objet, pieces, piece, ns] = un(BRANCHES);
    const n = un(ns);
    const k = entre(1, n - 1);
    const r = entre(2, 9);
    const a = princ([2 * k, n]);
    const faux = [rE(String(r), princ([k, n])), rE(String(r), princ([2 * (k + 1), n])), rE(String(k), a), rE(String(r), princ([-2 * k, n])), rE(String(r), princ([2 * k + 1, n]))];
    const Piece = piece.charAt(0).toUpperCase() + piece.slice(1);
    const texte = `${objet} a $n = ${n}$ ${pieces} identiques, à intervalles réguliers autour de l'origine. ${Piece} numéro $k = 0$ vise le point d'affixe $r = ${r}$. ${un(["Dans le sens direct, quelle affixe vise", "En tournant dans le sens direct, quel point vise", "Quelle est l'affixe du point visé par", "Dans le sens direct, quel point vise"])} ${piece} numéro $k = ${k}$ ?`;
    return qcm(texte, `$${rE(String(r), a)}$`, faux.filter((s) => s !== rE(String(r), a)).map((s) => `$${s}$`), ex6(`L'angle entre deux voisins est $${angT(princ([2, n]))}$, et on en compte ${k}.`, `L'affixe est $${rE(String(r), a)}$.`));
  }),
  tpl(M6, 12, 3, "Pose Z = z − c : Z vérifie une équation connue.", () => {
    const c = zTire(5);
    const n = un([2, 4, 4]);
    const R: Z = n === 2 ? un<Z>([[1, 0], [-1, 0]]) : un<Z>([[1, 0], [-1, 0], [0, 1], [0, -1]]);
    const j = zAdd(c, R);
    const k = entre(2, 3);
    const faux = [zAdd(c, zK(k, R)), zSub(zK(-1, c), R), zAdd(c, n === 2 ? [0, 1] : [1, 1]), zAdd(zConj(c), n === 2 ? [0, 1] : [1, 1]), zAdd(c, [2, 1])];
    return qcm(pose(F_CHOIX_SOL, `(z - ${zP(c)})^{${n}} = 1`), `$${zT(j)}$`, faux.map((w) => `$${zT(w)}$`), ex6(`On pose $Z = z - ${zP(c)}$ : $Z^{${n}} = 1$, donc $Z$ vaut ${n === 2 ? "$1$ ou $-1$" : "$1$, $i$, $-1$ ou $-i$"}.`, `$${zT(j)}$ convient.`));
  }),
];
