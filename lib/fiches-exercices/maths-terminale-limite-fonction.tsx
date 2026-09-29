// ─── Fiche d'exercices : les limites de fonctions (terminale spé) ─────────────
//                              20 exercices corrigés
//
// Écrite le 29/09/2026 sur le modèle de l'étalon de terminale
// (`maths-terminale-limite-suite.tsx`). Alignée sur `lib/tutor-v4/questionBank/
// terminale-spe/maths/limites-fonctions.bank.ts`, au niveau du bac.
//
// ⭐⭐ LE FIL : UNE LIMITE SE LIT SUR LA COURBE. Chaque limite finie en l'infini
// devient une droite horizontale dont la courbe s'approche ; chaque limite
// infinie en un point, une droite verticale qu'elle longe. Les corrigés
// tracent la courbe ET ses asymptotes (droites grises).
//
// ⛔ Les croissances comparées ne sont pas dans les micros de la notion (elles
// vivent avec l'exponentielle et le logarithme) : on ne s'en sert pas. L'expo
// n'apparaît que comme fonction de référence et dans des composées.
//
// Micro-compétences : limite_fonction_reference (2, 8, 12, 20),
// limite_fonction_operations (3, 7, 8, 10, 15, 17, 18, 20),
// limite_fonction_infini (4, 5, 9, 10, 11, 13, 15, 18, 19),
// limite_fonction_point (6, 7, 9, 13, 14, 17, 19), limite_fonction_asymptote
// (1, 5, 9, 12, 13, 16, 17, 18, 19, 20), limite_fonction_defi (17, 18, 19,
// 20). 6/6.
//
// Faits réels cités (physique de cours) : la puissance reçue par une
// résistance R branchée sur une pile (E, r) vaut E²R/(R + r)² ; l'énergie
// cinétique relativiste est proportionnelle à 1/√(1 − v²/c²) − 1, et vaut à
// peu près mv²/2 aux petites vitesses ; la formule de conjugaison d'une
// lentille mince convergente (image à fx/(x − f)), dont un objet lointain a son
// image au foyer, et un objet à 2f son image à 2f. Le reste (lampes, cuve,
// condensateur, appareil) : des MODÈLES aux chiffres choisis.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau, tableauSignes, tableauVariations } from "@/lib/fiches-exercices/figures";

const GRIS = "#94a3b8";

/** Dessin réservé à l'écran : le PDF garde 12 à 14 dessins (≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Une courbe qui n'est pas un polynôme, échantillonnée tous les 0,05, coupée en hauteur. */
const echantillon = (f: (x: number) => number, de: number, a: number, yMin = -Infinity, yMax = Infinity): [number, number][] =>
  Array.from({ length: Math.round((a - de) / 0.05) + 1 }, (_, k) => {
    const x = de + k * 0.05;
    return [Math.round(x * 100) / 100, Math.round(f(x) * 1000) / 1000] as [number, number];
  }).filter(([, y]) => y >= yMin && y <= yMax);

export const exercicesLimiteFonctionTerminale: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "terminale-spe",
  notion: "limite-fonction",
  titre: "Limites de fonctions",
  accroche:
    "Vingt exercices, de la lecture d'une courbe au problème de bac, avec un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, et elle trace la courbe avec ses asymptotes.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=terminale-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "Limites de référence en $+\\infty$ : $x^n$, $\\sqrt{x}$ et $\\mathrm{e}^x$ tendent vers $+\\infty$ ; $\\dfrac{1}{x^n}$ tend vers $0$. En $-\\infty$ : $\\mathrm{e}^x \\to 0$, et $x^n$ tend vers $+\\infty$ si $n$ est pair, vers $-\\infty$ si $n$ est impair.",
        "En $0$ : $\\dfrac{1}{x}$ tend vers $+\\infty$ à droite ($x \\to 0^+$) et vers $-\\infty$ à gauche ($x \\to 0^-$). $\\dfrac{1}{x^2}$ tend vers $+\\infty$ des deux côtés.",
        "Formes indéterminées : $\\infty - \\infty$, $0 \\times \\infty$, $\\dfrac{\\infty}{\\infty}$ et $\\dfrac{0}{0}$. On les lève en factorisant par le terme qui domine, ou en simplifiant.",
        "Composée : si $u(x) \\to b$ et si $g(X) \\to \\ell$ quand $X \\to b$, alors $g(u(x)) \\to \\ell$. Asymptotes : une limite $\\ell$ en $\\pm\\infty$ donne la droite $y = \\ell$ ; une limite infinie en $a$ donne la droite $x = a$.",
      ],
      exercices: [
        {
          enonce:
            "On a tracé la courbe d'une fonction $f$ définie sur $\\mathbb{R}$ privé de $1$, avec en gris les droites d'équations $x = 1$ et $y = 2$.\na) Lire $\\lim_{x \\to +\\infty} f(x)$ et $\\lim_{x \\to -\\infty} f(x)$.\nb) Lire la limite de $f$ en $1$ à droite, puis à gauche.\nc) Donner les asymptotes de la courbe.",
          figure: repere(
            [-4, 5, -3, 6],
            [
              { pts: echantillon((x) => 2 + 1 / (x - 1), -4, 0.95, -3, 6) },
              { pts: echantillon((x) => 2 + 1 / (x - 1), 1.05, 5, -3, 6) },
              { pts: [[1, -3], [1, 6]], couleur: GRIS },
            ],
            [],
            2,
          ),
          correction:
            "a) Aux deux bouts, la courbe se colle à la droite $y = 2$ : $\\lim_{x \\to +\\infty} f(x) = 2$ et $\\lim_{x \\to -\\infty} f(x) = 2$.\nb) Juste à droite de $1$, la courbe monte sans fin : $\\lim_{x \\to 1^+} f(x) = +\\infty$.\nJuste à gauche de $1$, elle plonge : $\\lim_{x \\to 1^-} f(x) = -\\infty$.\nc) La droite $y = 2$ est asymptote horizontale, en $+\\infty$ et en $-\\infty$. La droite $x = 1$ est asymptote verticale.\n⚠️ En $1$, deux côtés, deux réponses : on n'écrit pas « la limite en $1$ » sans dire de quel côté.\n⭐ C'est la courbe de $f(x) = 2 + \\dfrac{1}{x - 1}$ : quand $x \\to +\\infty$, $\\dfrac{1}{x - 1} \\to 0$, et il reste $2$.",
          micros: ["limite_fonction_asymptote"],
        },
        {
          enonce:
            "Donner chaque limite, sans calcul :\na) $\\lim_{x \\to -\\infty} x^3$\nb) $\\lim_{x \\to 0} \\dfrac{1}{x^2}$\nc) $\\lim_{x \\to +\\infty} \\sqrt{x}$\nd) $\\lim_{x \\to -\\infty} \\mathrm{e}^x$\ne) $\\lim_{x \\to 0^-} \\dfrac{1}{x}$",
          correction:
            "a) $-\\infty$. La puissance $3$ est impaire : elle garde le signe de $x$.\nb) $+\\infty$. $x^2$ est positif et tend vers $0$ : son inverse devient aussi grand qu'on veut, des deux côtés.\nc) $+\\infty$.\nd) $0$. La courbe de l'exponentielle se colle à l'axe des abscisses vers la gauche.\ne) $-\\infty$. Pour $x < 0$ tout près de $0$, $\\dfrac{1}{x}$ est négatif et très grand en valeur absolue.\n⚠️ En a), ne pas répondre $+\\infty$ par réflexe : $(-10)^3 = -1\\,000$.\n⚠️ En b) et e), même point $0$, réponses différentes : $\\dfrac{1}{x^2}$ ne change pas de signe, $\\dfrac{1}{x}$ si.\n⭐ Sur le dessin : en bleu $y = \\dfrac{1}{x}$, qui part en sens contraires de part et d'autre de $0$ ; en orange $y = \\dfrac{1}{x^2}$, qui monte des deux côtés.",
          schema: ecranSeulement(
            repere(
              [-4, 4, -4, 4],
              [
                { pts: echantillon((x) => 1 / x, -4, -0.2, -4, 4) },
                { pts: echantillon((x) => 1 / x, 0.2, 4, -4, 4) },
                { pts: echantillon((x) => 1 / (x * x), -4, -0.45, -4, 4), couleur: ORANGE },
                { pts: echantillon((x) => 1 / (x * x), 0.45, 4, -4, 4), couleur: ORANGE },
              ],
            ),
          ),
          micros: ["limite_fonction_reference"],
        },
        {
          enonce:
            "Déterminer chaque limite :\na) $\\lim_{x \\to +\\infty} \\left(x^2 + \\dfrac{1}{x}\\right)$\nb) $\\lim_{x \\to +\\infty} \\left(3 - \\dfrac{1}{x}\\right)(x + 2)$\nc) $\\lim_{x \\to -\\infty} \\dfrac{5}{x^2 + 1}$\nd) $\\lim_{x \\to +\\infty} \\left(7 - 2\\sqrt{x}\\right)$",
          correction:
            "a) $x^2 \\to +\\infty$ et $\\dfrac{1}{x} \\to 0$. La somme tend vers $+\\infty$.\nb) $3 - \\dfrac{1}{x} \\to 3$ et $x + 2 \\to +\\infty$. Le produit d'un facteur qui tend vers $3$, POSITIF, par un facteur qui tend vers $+\\infty$ tend vers $+\\infty$.\nc) $x^2 + 1 \\to +\\infty$, donc $\\dfrac{5}{x^2 + 1} \\to 0$.\nd) $\\sqrt{x} \\to +\\infty$, donc $-2\\sqrt{x} \\to -\\infty$, et $7 - 2\\sqrt{x} \\to -\\infty$.\n⚠️ En b), c'est le SIGNE de $3$ qui décide : un facteur qui tendrait vers $-3$ donnerait $-\\infty$, et un facteur qui tendrait vers $0$ donnerait une forme indéterminée.\n⭐ Le tableau (expression b) : $34{,}8$, puis $304{,}98$, puis environ $3\\,005$. Les valeurs grandissent sans fin, à peu près comme $3x$.",
          schema: ecranSeulement(tableau(["x", "10", "100", "1000"], ["f(x)", "34,8", "304,98", "3 005"])),
          micros: ["limite_fonction_operations"],
        },
        {
          enonce: "Soit $f(x) = x^3 - 4x^2 + 1$.\na) Pourquoi la limite de $f$ en $+\\infty$ est-elle une forme indéterminée ?\nb) La lever en factorisant par $x^3$.\nc) Déterminer la limite de $f$ en $-\\infty$.",
          correction:
            "a) $x^3 \\to +\\infty$ et $-4x^2 \\to -\\infty$ : c'est la forme « $\\infty - \\infty$ ».\nb) Pour $x \\neq 0$ : $f(x) = x^3\\left(1 - \\dfrac{4}{x} + \\dfrac{1}{x^3}\\right)$.\nLa parenthèse tend vers $1$, et $x^3 \\to +\\infty$ : $\\lim_{x \\to +\\infty} f(x) = +\\infty$.\nc) En $-\\infty$ : $x^3 \\to -\\infty$ et $-4x^2 \\to -\\infty$. Deux termes qui partent vers $-\\infty$ : la somme aussi. $\\lim_{x \\to -\\infty} f(x) = -\\infty$.\n⚠️ En $-\\infty$, il n'y a PAS de forme indéterminée : pas besoin de factoriser. Il faut regarder les signes avant de se lancer.\n⭐ Un polynôme se comporte à l'infini comme son terme de plus haut degré, ici $x^3$.\n⭐ Sur le dessin : la courbe descend d'abord (elle passe sous $-8$ vers $x \\approx 2{,}7$), puis repart vers le haut. À l'infini, c'est $x^3$ qui gagne.",
          schema: ecranSeulement(repere([-2, 5, -10, 3], [{ p: [1, -4, 0, 1] }], [], undefined, true)),
          micros: ["limite_fonction_infini"],
        },
        {
          enonce: "Soit $f(x) = \\dfrac{2x^2 - 3x}{x^2 + 1}$, définie sur $\\mathbb{R}$.\na) Déterminer les limites de $f$ en $+\\infty$ et en $-\\infty$.\nb) En déduire une asymptote à la courbe.",
          correction:
            "a) En haut et en bas, forme « $\\dfrac{\\infty}{\\infty}$ ». On divise en haut et en bas par $x^2$, pour $x \\neq 0$ :\n$f(x) = \\dfrac{2 - \\dfrac{3}{x}}{1 + \\dfrac{1}{x^2}}$.\n$\\dfrac{3}{x} \\to 0$ et $\\dfrac{1}{x^2} \\to 0$, en $+\\infty$ comme en $-\\infty$. Donc $f(x) \\to \\dfrac{2}{1} = 2$ des deux côtés.\nb) La droite $y = 2$ est asymptote horizontale à la courbe, en $+\\infty$ et en $-\\infty$.\n⚠️ Une courbe peut COUPER son asymptote : ici, $f(x) = 2$ pour $x = -\\dfrac{2}{3}$. L'asymptote décrit ce qui se passe loin, pas partout.\n⭐ Sur le dessin : la courbe monte au-dessus de la droite $y = 2$ à gauche, la traverse, puis revient vers elle par en dessous à droite.",
          schema: repere([-7, 7, -2, 4], [{ pts: echantillon((x) => (2 * x * x - 3 * x) / (x * x + 1), -7, 7) }], [], 2, true),
          micros: ["limite_fonction_infini", "limite_fonction_asymptote"],
        },
        {
          enonce: "Soit $f(x) = \\dfrac{x + 1}{x - 2}$, définie pour $x \\neq 2$.\nDéterminer la limite de $f$ en $2$ à droite, puis à gauche.",
          correction:
            "Quand $x \\to 2$, le numérateur tend vers $3$ et le dénominateur vers $0$ : la limite est infinie. Reste le signe.\nLe tableau de signes de $x - 2$ : négatif avant $2$, positif après.\nÀ droite de $2$ : $x - 2 \\to 0$ en restant positif. Un nombre proche de $3$ divisé par un tout petit nombre positif devient énorme : $\\lim_{x \\to 2^+} f(x) = +\\infty$.\nÀ gauche de $2$ : $x - 2 \\to 0$ en restant négatif. $\\lim_{x \\to 2^-} f(x) = -\\infty$.\nLa droite $x = 2$ est asymptote verticale.\n⚠️ « $\\dfrac{3}{0}$ » n'est pas un calcul : c'est le signe du dénominateur, près de $2$, qui donne $+\\infty$ ou $-\\infty$.\n⭐ Sur le tableau : le $0$ sous le $2$, et le changement de signe de $-$ à $+$, disent tout.",
          schema: tableauSignes(["$-\\infty$", "$2$", "$+\\infty$"], [["$x - 2$", ["-", "+"], ["0"]]]),
          micros: ["limite_fonction_point"],
        },
        {
          enonce:
            "a) Déterminer $\\lim_{x \\to 3} \\dfrac{x^2 - 9}{x - 3}$.\nb) Déterminer la limite de $\\dfrac{x^2 + 9}{x - 3}$ quand $x$ tend vers $3$ par la droite.",
          correction:
            "a) En haut $x^2 - 9 \\to 0$, en bas $x - 3 \\to 0$ : forme « $\\dfrac{0}{0}$ », indéterminée.\nOn factorise : $x^2 - 9 = (x - 3)(x + 3)$. Pour $x \\neq 3$, $\\dfrac{x^2 - 9}{x - 3} = x + 3$.\nDonc la limite en $3$ vaut $3 + 3 = 6$.\nb) Ici, le numérateur tend vers $18$, pas vers $0$. Le dénominateur tend vers $0$ en restant positif (à droite de $3$).\nLa limite vaut $+\\infty$.\n⚠️ « $\\dfrac{0}{0}$ » ne vaut ni $0$, ni $1$, ni l'infini : c'est une forme indéterminée, qu'on lève en simplifiant par le facteur qui s'annule.\n⭐ Le tableau (question a) : $5{,}9$, $5{,}99$, puis $6{,}01$, $6{,}1$. Des deux côtés de $3$, les valeurs se rapprochent de $6$.",
          schema: ecranSeulement(tableau(["x", "2,9", "2,99", "3,01", "3,1"], ["g(x)", "5,9", "5,99", "6,01", "6,1"])),
          micros: ["limite_fonction_point", "limite_fonction_operations"],
        },
        {
          enonce:
            "Déterminer chaque limite, en passant par une variable intermédiaire :\na) $\\lim_{x \\to +\\infty} \\sqrt{4 + \\dfrac{1}{x}}$\nb) $\\lim_{x \\to +\\infty} \\mathrm{e}^{-x^2}$\nc) $\\lim_{x \\to 0^+} \\mathrm{e}^{-\\frac{1}{x}}$ et $\\lim_{x \\to 0^-} \\mathrm{e}^{-\\frac{1}{x}}$",
          correction:
            "a) On pose $X = 4 + \\dfrac{1}{x}$. Quand $x \\to +\\infty$, $X \\to 4$. Et $\\sqrt{X} \\to \\sqrt{4} = 2$. La limite vaut $2$.\nb) On pose $X = -x^2$. Quand $x \\to +\\infty$, $X \\to -\\infty$. Et $\\mathrm{e}^X \\to 0$ quand $X \\to -\\infty$. La limite vaut $0$.\nc) On pose $X = -\\dfrac{1}{x}$.\nÀ droite de $0$ : $\\dfrac{1}{x} \\to +\\infty$, donc $X \\to -\\infty$, et $\\mathrm{e}^X \\to 0$.\nÀ gauche de $0$ : $\\dfrac{1}{x} \\to -\\infty$, donc $X \\to +\\infty$, et $\\mathrm{e}^X \\to +\\infty$.\n⚠️ On traite d'abord l'INTÉRIEUR, puis la fonction extérieure. Et en c), le côté change tout : $0$ d'un côté, $+\\infty$ de l'autre.\n⭐ Sur le dessin (courbe de c) : à droite de $0$, la courbe part de l'axe et monte vers la droite $y = 1$ ; à gauche, elle s'envole près de $0$.",
          schema: repere(
            [-4, 4, -1, 4],
            [
              { pts: echantillon((x) => Math.exp(-1 / x), -4, -0.05, -1, 4) },
              { pts: echantillon((x) => Math.exp(-1 / x), 0.05, 4, -1, 4) },
            ],
            [],
            1,
          ),
          micros: ["limite_fonction_operations", "limite_fonction_reference"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un devoir. On rédige.",
      rappel: [
        "Quotient de polynômes en l'infini : on factorise, en haut et en bas, par le terme de plus haut degré.",
        "Limite en $a$ d'un quotient dont le dénominateur s'annule en $a$ : si le numérateur ne s'annule pas, la limite est infinie, et son signe se lit dans le tableau de signes du dénominateur ; s'il s'annule aussi, on factorise par $x - a$.",
        "Comparaison : si $f(x) \\geqslant g(x)$ et $g(x) \\to +\\infty$, alors $f(x) \\to +\\infty$. Gendarmes : si $g(x) \\leqslant f(x) \\leqslant h(x)$ et si $g$ et $h$ ont la même limite $\\ell$, alors $f(x) \\to \\ell$.",
        "Avec une racine : on multiplie par la quantité conjuguée, car $(\\sqrt{A} - B)(\\sqrt{A} + B) = A - B^2$.",
      ],
      exercices: [
        {
          enonce:
            "Soit $f(x) = \\dfrac{3x - 1}{x + 2}$, définie sur $\\mathbb{R}$ privé de $-2$.\na) Déterminer les limites de $f$ en $+\\infty$ et en $-\\infty$.\nb) Déterminer les limites de $f$ en $-2$, à droite et à gauche.\nc) En déduire les asymptotes de la courbe.\nd) Montrer que $f(x) - 3 = \\dfrac{-7}{x + 2}$. En déduire la position de la courbe par rapport à l'asymptote horizontale.",
          correction:
            "a) Pour $x \\neq 0$ : $f(x) = \\dfrac{3 - \\dfrac{1}{x}}{1 + \\dfrac{2}{x}}$, qui tend vers $3$ en $+\\infty$ et en $-\\infty$.\nb) Quand $x \\to -2$, le numérateur tend vers $-7$, négatif, et le dénominateur vers $0$.\nÀ droite de $-2$, $x + 2 > 0$ : négatif divisé par petit positif, $\\lim_{x \\to -2^+} f(x) = -\\infty$.\nÀ gauche de $-2$, $x + 2 < 0$ : négatif divisé par petit négatif, $\\lim_{x \\to -2^-} f(x) = +\\infty$.\nc) Asymptote horizontale $y = 3$ (en $\\pm\\infty$), asymptote verticale $x = -2$.\nd) $f(x) - 3 = \\dfrac{3x - 1 - 3(x + 2)}{x + 2} = \\dfrac{-7}{x + 2}$.\nPour $x > -2$, c'est négatif : la courbe est SOUS la droite $y = 3$. Pour $x < -2$, c'est positif : elle est au-dessus.\n⚠️ En b), le numérateur est négatif : les signes se croisent. On écrit la règle des signes, on ne devine pas.\n⭐ Sur le dessin : à droite de $x = -2$, la branche monte du bas vers $y = 3$, en restant dessous ; à gauche, elle quitte $y = 3$ et monte vers le haut, en restant au-dessus.",
          schema: repere(
            [-9, 5, -5, 9],
            [
              { pts: echantillon((x) => (3 * x - 1) / (x + 2), -9, -2.05, -5, 9) },
              { pts: echantillon((x) => (3 * x - 1) / (x + 2), -1.95, 5, -5, 9) },
              { pts: [[-2, -5], [-2, 9]], couleur: GRIS },
            ],
            [],
            3,
            true,
          ),
          micros: ["limite_fonction_infini", "limite_fonction_point", "limite_fonction_asymptote"],
        },
        {
          enonce:
            "Soit $f(x) = \\sqrt{x^2 + 1} - x$, définie sur $\\mathbb{R}$.\na) Déterminer la limite de $f$ en $-\\infty$.\nb) En $+\\infty$, montrer que $f(x) = \\dfrac{1}{\\sqrt{x^2 + 1} + x}$, puis déterminer la limite.\nc) Que peut-on en déduire pour la courbe ?",
          correction:
            "a) En $-\\infty$ : $x^2 + 1 \\to +\\infty$, donc $\\sqrt{x^2 + 1} \\to +\\infty$. Et $-x \\to +\\infty$.\nLa somme de deux termes qui tendent vers $+\\infty$ : $\\lim_{x \\to -\\infty} f(x) = +\\infty$.\nb) En $+\\infty$ : forme « $\\infty - \\infty$ ». On multiplie en haut et en bas par la quantité conjuguée $\\sqrt{x^2 + 1} + x$ :\n$f(x) = \\dfrac{(x^2 + 1) - x^2}{\\sqrt{x^2 + 1} + x}$ $= \\dfrac{1}{\\sqrt{x^2 + 1} + x}$.\nLe dénominateur tend vers $+\\infty$ : $\\lim_{x \\to +\\infty} f(x) = 0$.\nc) La droite $y = 0$ (l'axe des abscisses) est asymptote à la courbe en $+\\infty$.\n⚠️ Même expression, deux bouts, deux histoires : en $-\\infty$, il n'y a PAS de forme indéterminée, car $-x$ est alors positif.\n⭐ Sur le dessin : à gauche, la courbe monte comme une droite ; à droite, elle s'écrase sur l'axe des abscisses.",
          schema: ecranSeulement(repere([-4, 5, -1, 9], [{ pts: echantillon((x) => Math.sqrt(x * x + 1) - x, -4, 5) }])),
          micros: ["limite_fonction_infini", "limite_fonction_operations"],
        },
        {
          enonce:
            "a) Montrer que, pour tout réel $x$, $x + \\sin x \\geqslant x - 1$. En déduire $\\lim_{x \\to +\\infty} (x + \\sin x)$.\nb) Soit $g(x) = \\dfrac{2x + \\cos x}{x}$ pour $x > 0$. Montrer que $2 - \\dfrac{1}{x} \\leqslant g(x) \\leqslant 2 + \\dfrac{1}{x}$, puis déterminer la limite de $g$ en $+\\infty$.",
          correction:
            "a) Pour tout réel, $\\sin x \\geqslant -1$. On ajoute $x$ : $x + \\sin x \\geqslant x - 1$.\nOr $\\lim_{x \\to +\\infty} (x - 1) = +\\infty$. Par comparaison, $\\lim_{x \\to +\\infty} (x + \\sin x) = +\\infty$.\nb) $g(x) = 2 + \\dfrac{\\cos x}{x}$. Comme $-1 \\leqslant \\cos x \\leqslant 1$ et $x > 0$, on divise par $x$ : $-\\dfrac{1}{x} \\leqslant \\dfrac{\\cos x}{x} \\leqslant \\dfrac{1}{x}$.\nOn ajoute $2$ : c'est l'encadrement demandé.\n$2 - \\dfrac{1}{x}$ et $2 + \\dfrac{1}{x}$ tendent vers $2$. Par le théorème des gendarmes, $\\lim_{x \\to +\\infty} g(x) = 2$.\n⚠️ $\\sin x$ et $\\cos x$ n'ont PAS de limite en $+\\infty$. On ne s'en sert que parce qu'ils restent entre $-1$ et $1$.\n⭐ Sur le dessin : la courbe de $x + \\sin x$ ondule, mais reste au-dessus de la droite orange $y = x - 1$, qui l'emmène vers le haut.",
          schema: ecranSeulement(
            repere(
              [-1, 9, -2, 9],
              [{ pts: echantillon((x) => x + Math.sin(x), -1, 9, -2, 9) }, { q: [0, 1, -1], couleur: ORANGE }],
              [],
              undefined,
              true,
            ),
          ),
          micros: ["limite_fonction_infini"],
        },
        {
          enonce:
            "Un condensateur se charge à travers une résistance. La tension à ses bornes, en volts, au temps $t$ en secondes, est $u(t) = 6\\left(1 - \\mathrm{e}^{-0{,}5t}\\right)$ pour $t \\geqslant 0$.\na) Déterminer $\\lim_{t \\to +\\infty} u(t)$. Interpréter graphiquement et physiquement.\nb) Montrer que $u$ est croissante sur $[0 ; +\\infty[$.\nc) À la calculatrice, entre quelles secondes entières la tension dépasse-t-elle $99$ % de sa valeur limite ?",
          correction:
            "a) On pose $X = -0{,}5t$. Quand $t \\to +\\infty$, $X \\to -\\infty$, donc $\\mathrm{e}^{X} \\to 0$.\nAlors $1 - \\mathrm{e}^{-0{,}5t} \\to 1$ et $\\lim_{t \\to +\\infty} u(t) = 6$.\nLa droite $y = 6$ est asymptote horizontale. Physiquement : la tension se rapproche de $6$ V, la tension de charge complète.\nb) $u'(t) = 6 \\times 0{,}5\\,\\mathrm{e}^{-0{,}5t} = 3\\mathrm{e}^{-0{,}5t} > 0$ : $u$ est croissante.\nc) $99$ % de $6$ V, c'est $5{,}94$ V. $u(9) \\approx 5{,}933$ (pas encore) et $u(10) \\approx 5{,}960$.\nLa tension dépasse $99$ % de sa valeur limite entre $9$ et $10$ secondes.\n⚠️ La tension n'atteint JAMAIS $6$ V : $\\mathrm{e}^{-0{,}5t}$ reste strictement positif. Une asymptote se rapproche, elle ne se touche pas forcément.\n⭐ Sur le dessin : la courbe monte vite, puis se couche sous la droite $y = 6$.",
          schema: repere([-1, 12, -1, 7], [{ pts: echantillon((t) => 6 * (1 - Math.exp(-0.5 * t)), 0, 12) }], [], 6, true),
          micros: ["limite_fonction_reference", "limite_fonction_asymptote", "limite_fonction_infini"],
        },
        {
          enonce:
            "Une entreprise fabrique des lampes. Produire $q$ lampes coûte $200 + 3q$ euros : $200$ € de frais fixes, puis $3$ € par lampe. Le coût moyen d'une lampe est $C(q) = \\dfrac{200 + 3q}{q}$ pour $q > 0$.\na) Déterminer $\\lim_{q \\to +\\infty} C(q)$. Interpréter.\nb) Déterminer $\\lim_{q \\to 0^+} C(q)$. Interpréter.\nc) En déduire les asymptotes de la courbe de $C$.\nd) À partir de combien de lampes le coût moyen passe-t-il sous $3{,}50$ € ?",
          correction:
            "a) $C(q) = \\dfrac{200}{q} + 3$. Quand $q \\to +\\infty$, $\\dfrac{200}{q} \\to 0$ : $\\lim C(q) = 3$.\nEn fabriquant beaucoup, les frais fixes se partagent sur tant de lampes que chacune coûte presque $3$ €.\nb) Quand $q \\to 0^+$, $\\dfrac{200}{q} \\to +\\infty$ : $\\lim C(q) = +\\infty$. Pour une toute petite production, les $200$ € de frais fixes pèsent sur très peu de lampes.\nc) Asymptote horizontale $y = 3$ en $+\\infty$ ; asymptote verticale $q = 0$, l'axe des ordonnées.\nd) $C(q) < 3{,}5$ équivaut à $\\dfrac{200}{q} < 0{,}5$, soit $q > 400$. À partir de $401$ lampes.\n⚠️ Le coût moyen ne descend jamais sous $3$ € : $\\dfrac{200}{q}$ reste positif.\n⭐ Sur le dessin (une graduation horizontale vaut $100$ lampes) : la courbe descend du haut, le long de l'axe vertical, puis se couche sur la droite $y = 3$. Le point marqué est $(400 ; 3{,}5)$.",
          schema: repere([-1, 9, -1, 9], [{ pts: echantillon((x) => 3 + 2 / x, 0.3, 9, -1, 9) }], [{ x: 4, y: 3.5, label: "" }], 3),
          micros: ["limite_fonction_infini", "limite_fonction_point", "limite_fonction_asymptote"],
        },
        {
          enonce: "Soit $f(x) = \\dfrac{\\sqrt{x + 4} - 2}{x}$, pour $x \\geqslant -4$ et $x \\neq 0$.\na) Pourquoi la limite de $f$ en $0$ est-elle une forme indéterminée ?\nb) Montrer que $f(x) = \\dfrac{1}{\\sqrt{x + 4} + 2}$, puis déterminer la limite de $f$ en $0$.",
          correction:
            "a) En $0$ : $\\sqrt{x + 4} - 2 \\to \\sqrt{4} - 2 = 0$, et $x \\to 0$. C'est la forme « $\\dfrac{0}{0}$ ».\nb) On multiplie en haut et en bas par la quantité conjuguée $\\sqrt{x + 4} + 2$.\nEn haut : $(\\sqrt{x + 4} - 2)(\\sqrt{x + 4} + 2) = x + 4 - 4 = x$.\nDonc $f(x) = \\dfrac{x}{x(\\sqrt{x + 4} + 2)} = \\dfrac{1}{\\sqrt{x + 4} + 2}$, pour $x \\neq 0$.\nQuand $x \\to 0$, le dénominateur tend vers $2 + 2 = 4$ : $\\lim_{x \\to 0} f(x) = \\dfrac{1}{4}$.\n⚠️ On simplifie par $x$ parce que $x \\neq 0$ : la fonction n'est pas définie en $0$, mais sa limite existe.\n⭐ Ce quotient est un taux d'accroissement de la racine en $4$ : sa limite $\\dfrac{1}{4}$ est le nombre dérivé $\\dfrac{1}{2\\sqrt{4}}$.\n⭐ Le tableau : $0{,}2516$, $0{,}2502$, puis $0{,}2498$, $0{,}2485$. Des deux côtés de $0$, on s'approche de $0{,}25$.",
          schema: ecranSeulement(tableau(["x", "−0,1", "−0,01", "0,01", "0,1"], ["f(x)", "0,2516", "0,2502", "0,2498", "0,2485"])),
          micros: ["limite_fonction_point"],
        },
        {
          enonce:
            "Une pile de $6$ V, de résistance interne $2$ Ω, alimente une résistance $R$, en ohms. La puissance reçue par cette résistance, en watts, est $P(R) = \\dfrac{36R}{(R + 2)^2}$ pour $R \\geqslant 0$.\na) Calculer $P(0)$ et $\\lim_{R \\to +\\infty} P(R)$. Interpréter.\nb) On admet que $P'(R) = \\dfrac{36(2 - R)}{(R + 2)^3}$. Dresser le tableau de variations de $P$.\nc) Quelle résistance reçoit la plus grande puissance ?",
          correction:
            "a) $P(0) = 0$ : sans résistance, rien ne la chauffe.\nEn $+\\infty$ : forme « $\\dfrac{\\infty}{\\infty}$ ». On factorise $(R + 2)^2 = R^2\\left(1 + \\dfrac{2}{R}\\right)^2$.\n$P(R) = \\dfrac{36}{R\\left(1 + \\dfrac{2}{R}\\right)^2}$. Le dénominateur tend vers $+\\infty$ : $\\lim_{R \\to +\\infty} P(R) = 0$.\nUne résistance énorme ne laisse presque plus passer de courant : elle ne reçoit presque rien.\nb) $(R + 2)^3 > 0$ : $P'(R)$ a le signe de $2 - R$. Positif avant $2$, négatif après.\n$P$ croît sur $[0 ; 2]$, puis décroît sur $[2 ; +\\infty[$. $P(2) = \\dfrac{72}{16} = 4{,}5$.\nc) La résistance de $2$ Ω, égale à la résistance interne de la pile, reçoit le maximum : $4{,}5$ W.\n⚠️ Le degré du dénominateur ($2$) dépasse celui du numérateur ($1$) : c'est pour cela que la limite vaut $0$, et non $36$.\n⭐ Sur le tableau : $0$, puis $4{,}5$ au sommet, puis retour vers $0$ en $+\\infty$ ; la limite trouvée en a) est écrite au bout de la flèche.",
          schema: (
            <div className="grid grid-cols-1 min-w-0 gap-2">
              {tableauVariations(["0", "2", "+∞"], ["0", "4,5", "0"], "P", "R")}
              {ecranSeulement(repere([-1, 14, -1, 5], [{ pts: echantillon((r) => (36 * r) / (r + 2) ** 2, 0, 14) }], [{ x: 2, y: 4.5, label: "" }], undefined, true))}
            </div>
          ),
          micros: ["limite_fonction_infini", "limite_fonction_operations"],
        },
        {
          enonce:
            "Soit $f(x) = \\dfrac{ax + 1}{x - b}$, où $a$ et $b$ sont deux réels, avec $ab \\neq -1$. On sait que sa courbe a pour asymptotes les droites $x = 2$ et $y = 3$.\na) Exprimer la limite de $f$ en $+\\infty$ en fonction de $a$. En déduire $a$.\nb) Où le dénominateur s'annule-t-il ? En déduire $b$.\nc) Vérifier en calculant la limite de $f$ en $2$ à droite.",
          correction:
            "a) Pour $x \\neq 0$ : $f(x) = \\dfrac{a + \\dfrac{1}{x}}{1 - \\dfrac{b}{x}}$, qui tend vers $a$. L'asymptote horizontale est $y = a$, donc $a = 3$.\nb) Le dénominateur s'annule en $x = b$. L'asymptote verticale est $x = 2$, donc $b = 2$.\nc) $f(x) = \\dfrac{3x + 1}{x - 2}$. En $2$ : le numérateur tend vers $7$, et $x - 2 \\to 0$ en restant positif à droite. La limite vaut $+\\infty$ : il y a bien une asymptote verticale.\n⚠️ Le rôle de $ab \\neq -1$ : si le numérateur s'annulait AUSSI en $b$, on aurait « $\\dfrac{0}{0}$ » et peut-être pas d'asymptote. Ici, $3 \\times 2 + 1 = 7 \\neq 0$.\n⭐ Sur le dessin : la courbe de $\\dfrac{3x + 1}{x - 2}$ avec ses deux asymptotes grises, $x = 2$ et $y = 3$.",
          schema: ecranSeulement(
            repere(
              [-4, 8, -4, 9],
              [
                { pts: echantillon((x) => (3 * x + 1) / (x - 2), -4, 1.95, -4, 9) },
                { pts: echantillon((x) => (3 * x + 1) / (x - 2), 2.05, 8, -4, 9) },
                { pts: [[2, -4], [2, 9]], couleur: GRIS },
              ],
              [],
              3,
              true,
            ),
          ),
          micros: ["limite_fonction_asymptote"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de bac, avec ses questions qui s'enchaînent. La limite y dit ce qui se passe au bout, ou tout près d'une valeur interdite.",
      rappel: [
        "Dans un problème, une limite en $+\\infty$ dit ce qui se passe « à long terme » ; une limite infinie en $a$ dit que la grandeur explose près de $a$.",
        "Asymptote horizontale $y = \\ell$ : la grandeur se stabilise vers $\\ell$, sans forcément l'atteindre. Asymptote verticale $x = a$ : la courbe longe la droite $x = a$ en partant à l'infini.",
        "Position de la courbe par rapport à l'asymptote $y = \\ell$ : on étudie le signe de $f(x) - \\ell$.",
      ],
      exercices: [
        {
          titre: "Plus vite que la lumière ?",
          enonce:
            "D'après la relativité restreinte, l'énergie à fournir à un vaisseau pour qu'il atteigne la vitesse $v$ est proportionnelle à $E(x) = \\dfrac{1}{\\sqrt{1 - x^2}} - 1$, où $x = \\dfrac{v}{c}$ est sa vitesse divisée par celle de la lumière, avec $0 \\leqslant x < 1$.\na) Calculer $E(0)$, puis $E(0{,}5)$, $E(0{,}9)$ et $E(0{,}99)$ à $0{,}01$ près.\nb) Déterminer la limite de $E$ en $1$ à gauche. Interpréter graphiquement, puis physiquement.\nc) Montrer que $E$ est croissante sur $[0 ; 1[$.\nd) Aux petites vitesses, on admet que $E(x)$ est proche de $\\dfrac{x^2}{2}$. Pour le confirmer, montrer que $\\dfrac{E(x)}{x^2} = \\dfrac{1}{\\sqrt{1 - x^2}\\left(1 + \\sqrt{1 - x^2}\\right)}$ pour $0 < x < 1$, et en déduire $\\lim_{x \\to 0} \\dfrac{E(x)}{x^2}$.",
          correction:
            "a) $E(0) = \\dfrac{1}{1} - 1 = 0$. Puis $E(0{,}5) \\approx 0{,}15$, $E(0{,}9) \\approx 1{,}29$ et $E(0{,}99) \\approx 6{,}09$.\nb) Quand $x \\to 1^-$ : $1 - x^2 \\to 0$ en restant positif, donc $\\sqrt{1 - x^2} \\to 0^+$.\nSon inverse tend vers $+\\infty$ : $\\lim_{x \\to 1^-} E(x) = +\\infty$.\nGraphiquement : la droite $x = 1$ est asymptote verticale. Physiquement : atteindre la vitesse de la lumière demanderait une énergie infinie. C'est impossible.\nc) Sur $[0 ; 1[$, $x \\mapsto 1 - x^2$ décroît et reste positif ; la racine garde l'ordre, donc $\\sqrt{1 - x^2}$ décroît. Son inverse croît : $E$ est croissante.\nd) $E(x) = \\dfrac{1 - \\sqrt{1 - x^2}}{\\sqrt{1 - x^2}}$. On multiplie en haut et en bas par $1 + \\sqrt{1 - x^2}$.\nEn haut : $\\left(1 - \\sqrt{1 - x^2}\\right)\\left(1 + \\sqrt{1 - x^2}\\right) = 1 - (1 - x^2) = x^2$.\nOn divise par $x^2 \\neq 0$ : c'est la formule annoncée. Quand $x \\to 0$, le dénominateur tend vers $1 \\times 2 = 2$ : la limite vaut $\\dfrac{1}{2}$.\nAux petites vitesses, $E(x)$ vaut donc environ $\\dfrac{x^2}{2}$ : on retrouve l'énergie cinétique « classique ».\n⚠️ En b), le « $0$ » du dénominateur est un $0^+$ : on le dit, c'est lui qui donne $+\\infty$ et pas $-\\infty$.\n⚠️ En d), forme « $\\dfrac{0}{0}$ » : on ne remplace pas $x$ par $0$, on transforme d'abord.\n⭐ Sur le dessin (une graduation horizontale vaut $0{,}1$) : la courbe bleue s'envole le long de la droite grise $x = 1$ ; la parabole orange $\\dfrac{x^2}{2}$ la colle au début, puis reste basse. Les points marqués sont les valeurs de a).",
          schema: repere(
            [-1, 11, -1, 9],
            [
              { pts: echantillon((X) => 1 / Math.sqrt(1 - (X / 10) ** 2) - 1, 0, 9.95, -1, 9) },
              { q: [0.005, 0, 0], couleur: ORANGE },
              { pts: [[10, -1], [10, 9]], couleur: GRIS },
            ],
            [
              { x: 5, y: 0.15, label: "" },
              { x: 9, y: 1.29, label: "" },
              { x: 9.9, y: 6.09, label: "" },
            ],
            undefined,
            true,
          ),
          micros: ["limite_fonction_point", "limite_fonction_asymptote", "limite_fonction_operations", "limite_fonction_defi"],
        },
        {
          titre: "La cuve d'eau salée",
          enonce:
            "Une cuve contient $100$ L d'eau pure. À partir de $t = 0$, on y verse de l'eau salée à $30$ g/L, au débit de $5$ L par minute, en mélangeant sans cesse. La concentration en sel, en g/L, au bout de $t$ minutes, est $c(t) = \\dfrac{150t}{100 + 5t}$.\na) Justifier cette formule.\nb) Déterminer $\\lim_{t \\to +\\infty} c(t)$. Interpréter.\nc) Montrer que $c$ est croissante sur $[0 ; +\\infty[$.\nd) Au bout de combien de temps la concentration atteint-elle $20$ g/L ? $29$ g/L ?\ne) La cuve contient au plus $1\\,000$ L. Quand est-elle pleine ? Quelle est alors la concentration ? Que penser de la réponse à d) ?",
          correction:
            "a) Au bout de $t$ minutes, on a versé $5t$ litres, qui apportent $30 \\times 5t = 150t$ grammes de sel. Le volume vaut $100 + 5t$ litres. La concentration est la masse divisée par le volume.\nb) Forme « $\\dfrac{\\infty}{\\infty}$ ». Pour $t > 0$, on divise par $t$ : $c(t) = \\dfrac{150}{\\dfrac{100}{t} + 5}$.\n$\\dfrac{100}{t} \\to 0$, donc $c(t) \\to \\dfrac{150}{5} = 30$.\nÀ long terme, la concentration se rapproche de $30$ g/L, celle de l'eau versée : l'eau pure du début ne compte presque plus.\nc) $c'(t) = \\dfrac{150(100 + 5t) - 150t \\times 5}{(100 + 5t)^2}$ $= \\dfrac{15\\,000}{(100 + 5t)^2} > 0$ : $c$ est croissante.\nd) $c(t) \\geqslant 20$ équivaut à $150t \\geqslant 2\\,000 + 100t$, soit $t \\geqslant 40$ : au bout de $40$ minutes.\n$c(t) \\geqslant 29$ équivaut à $150t \\geqslant 2\\,900 + 145t$, soit $t \\geqslant 580$ : au bout de $580$ minutes.\ne) $100 + 5t = 1\\,000$ donne $t = 180$ minutes. Alors $c(180) = \\dfrac{27\\,000}{1\\,000} = 27$ g/L.\nLa cuve déborde bien avant $580$ minutes : $29$ g/L ne sera jamais atteint dans cette cuve.\n⚠️ La limite $30$ décrit le modèle « à l'infini ». La vraie cuve s'arrête à $180$ minutes : on vérifie toujours que la réponse reste dans le domaine du modèle.\n⭐ Sur le dessin (une graduation horizontale vaut $20$ min, une verticale $5$ g/L) : la courbe monte vers la droite $y = 6$, soit $30$ g/L ; la droite grise $x = 9$ marque la cuve pleine. Le point marqué : $20$ g/L à $40$ minutes.",
          schema: repere(
            [-1, 12, -1, 7],
            [{ pts: echantillon((x) => (6 * x) / (1 + x), 0, 12) }, { pts: [[9, -1], [9, 7]], couleur: GRIS }],
            [{ x: 2, y: 4, label: "" }],
            6,
            true,
          ),
          micros: ["limite_fonction_infini", "limite_fonction_asymptote", "limite_fonction_operations", "limite_fonction_defi"],
        },
        {
          titre: "La lentille de l'appareil photo",
          enonce:
            "Une lentille convergente a une distance focale de $2$ dm. Un objet est placé à la distance $x$ de la lentille, en dm, avec $x > 2$. La lentille en donne une image nette, de l'autre côté, à la distance $d(x) = \\dfrac{2x}{x - 2}$ (formule de conjugaison).\na) Déterminer $\\lim_{x \\to +\\infty} d(x)$. Où se forme l'image d'un objet très lointain ?\nb) Déterminer la limite de $d$ en $2$ à droite. Interpréter.\nc) Donner les asymptotes de la courbe de $d$.\nd) Montrer que $d(x) - 2 = \\dfrac{4}{x - 2}$. L'image peut-elle être à moins de $2$ dm de la lentille ?\ne) Pour quelle position de l'objet l'image est-elle à la même distance que lui ?",
          correction:
            "a) Pour $x > 2$ : $d(x) = \\dfrac{2}{1 - \\dfrac{2}{x}}$. Comme $\\dfrac{2}{x} \\to 0$, $\\lim_{x \\to +\\infty} d(x) = 2$.\nL'image d'un objet très lointain se forme à $2$ dm : au foyer. C'est là qu'on place le capteur pour photographier un paysage.\nb) Quand $x \\to 2^+$ : $2x \\to 4$ et $x - 2 \\to 0$ en restant positif. $\\lim_{x \\to 2^+} d(x) = +\\infty$.\nUn objet presque au foyer donne une image rejetée infiniment loin.\nc) Asymptote verticale $x = 2$ et asymptote horizontale $y = 2$ (en $+\\infty$).\nd) $d(x) - 2 = \\dfrac{2x - 2(x - 2)}{x - 2} = \\dfrac{4}{x - 2}$. Pour $x > 2$, c'est positif : $d(x) > 2$.\nL'image est toujours à plus de $2$ dm : la courbe reste au-dessus de son asymptote horizontale.\ne) $d(x) = x$ équivaut à $2x = x(x - 2)$, soit (en divisant par $x > 0$) $2 = x - 2$, donc $x = 4$.\nUn objet à $4$ dm, le double de la focale, a son image à $4$ dm aussi.\n⚠️ En b), on travaille à droite de $2$ seulement : le modèle exige $x > 2$. Écrire « la limite en $2$ » sans le côté serait faux.\n⚠️ En e), on divise par $x$ parce que $x > 2$, donc $x \\neq 0$.\n⭐ Sur le dessin : la courbe descend le long de la droite grise $x = 2$, puis se couche sur la droite $y = 2$. Le point marqué $(4 ; 4)$ est sur la droite grise $y = x$.",
          schema: repere(
            [-1, 10, -1, 10],
            [
              { pts: echantillon((x) => (2 * x) / (x - 2), 2.2, 10, -1, 10) },
              { pts: [[2, -1], [2, 10]], couleur: GRIS },
              { q: [0, 1, 0], couleur: GRIS },
            ],
            [{ x: 4, y: 4, label: "" }],
            2,
            true,
          ),
          micros: ["limite_fonction_point", "limite_fonction_infini", "limite_fonction_asymptote", "limite_fonction_defi"],
        },
        {
          titre: "La courbe en S d'un nouvel appareil",
          enonce:
            "La part des foyers équipés d'un nouvel appareil, en %, $t$ années après sa sortie, est modélisée par $f(t) = \\dfrac{100}{1 + 9\\mathrm{e}^{-0{,}5t}}$. On étudie $f$ sur $\\mathbb{R}$ (les $t < 0$ prolongent le modèle vers le passé).\na) Calculer $f(0)$.\nb) Déterminer la limite de $f$ en $+\\infty$. Interpréter.\nc) Déterminer la limite de $f$ en $-\\infty$.\nd) En déduire les asymptotes de la courbe.\ne) Montrer que $f'(t) = \\dfrac{450\\mathrm{e}^{-0{,}5t}}{\\left(1 + 9\\mathrm{e}^{-0{,}5t}\\right)^2}$. En déduire le sens de variation de $f$.\nf) À la calculatrice, pendant quelle année la part dépasse-t-elle $90$ % ?",
          correction:
            "a) $f(0) = \\dfrac{100}{1 + 9} = 10$ : $10$ % des foyers à la sortie.\nb) On pose $X = -0{,}5t$. Quand $t \\to +\\infty$, $X \\to -\\infty$ et $\\mathrm{e}^X \\to 0$.\nLe dénominateur tend vers $1$ : $\\lim_{t \\to +\\infty} f(t) = 100$. À long terme, presque tous les foyers sont équipés.\nc) Quand $t \\to -\\infty$, $X = -0{,}5t \\to +\\infty$ et $\\mathrm{e}^X \\to +\\infty$.\nLe dénominateur tend vers $+\\infty$ : $\\lim_{t \\to -\\infty} f(t) = 0$.\nd) Deux asymptotes horizontales : $y = 100$ en $+\\infty$, et $y = 0$ (l'axe des abscisses) en $-\\infty$.\ne) $f = \\dfrac{100}{u}$ avec $u(t) = 1 + 9\\mathrm{e}^{-0{,}5t}$ et $u'(t) = -4{,}5\\mathrm{e}^{-0{,}5t}$.\n$f' = -\\dfrac{100u'}{u^2}$, ce qui donne la formule. Une exponentielle est positive : $f'(t) > 0$, $f$ est croissante.\nf) $f(8) \\approx 85{,}8$ et $f(9) \\approx 90{,}9$. La part dépasse $90$ % pendant la $9$e année, entre $t = 8$ et $t = 9$.\n⚠️ En b) et c), c'est la même exponentielle, mais son argument part dans des sens opposés : on refait le raisonnement à chaque bout.\n⚠️ $100$ % n'est jamais atteint dans le modèle : $9\\mathrm{e}^{-0{,}5t}$ reste strictement positif.\n⭐ Sur le dessin (une graduation verticale vaut $10$ %) : la courbe en S part de l'axe à gauche, passe par $(0 ; 1)$, soit $10$ %, et se couche sous la droite $y = 10$, soit $100$ %.",
          schema: repere([-4, 10, -1, 11], [{ pts: echantillon((t) => 10 / (1 + 9 * Math.exp(-0.5 * t)), -4, 10) }], [{ x: 0, y: 1, label: "" }], 10, true),
          micros: ["limite_fonction_reference", "limite_fonction_operations", "limite_fonction_asymptote", "limite_fonction_defi"],
        },
      ],
    },
  ],
};
