// ─── Fiche d'exercices : la dérivation (terminale spé) — 20 exercices corrigés ─
//
// Écrite le 29/09/2026 sur l'étalon `maths-terminale-limite-suite.tsx`.
// Alignée sur `lib/tutor-v4/questionBank/terminale-spe/maths/derivation.bank.ts`.
//
// ⭐⭐ LE FIL : UNE DÉRIVÉE SE VOIT. Chaque corrigé montre la tangente qui
// touche la courbe, le sommet où elle devient horizontale, le tableau où le
// signe de f′ commande les flèches. Les composées sont décomposées en chaîne.
//
// ⛔ Pas de répétition de la feuille de 1re spé (`maths-premiere-derivation.tsx`) :
// ni nombre dérivé par la définition, ni polynômes seuls, ni (3x − 2)⁴, √(2x + 6),
// x√x, 1/(x² + 1), falaise, skate, tangentes issues d'un point de la parabole.
// Ici : composées (exponentielle, cosinus, racine, puissances négatives),
// fonctions auxiliaires, inégalités par étude de fonction, familles de fonctions.
// ⛔ Aucune dérivée seconde, aucune convexité (autre notion du coach).
//
// Micro-compétences : derivation_formules (1, 9, 15, 16),
// derivation_somme_produit_quotient (5, 10, 18), derivation_composee (2, 3, 4,
// 9, 10, 12, 13, 16, 19, 20), derivation_variation (7, 11, 14, 15, 17, 18),
// derivation_tangente (6, 10, 11, 12, 13, 14, 15, 20), derivation_optimisation
// (8, 12, 17, 18, 19, 20), derivation_defi (17, 18, 19, 20). 7/7.
//
// Faits cités : l'éclairement en cos θ / d² (exercice 19, loi de la physique,
// donnée comme admise) ; le nom « constante de temps » d'un circuit RC
// (exercice 13). Le ressort, l'information, la rivière, le condensateur, le
// polluant, l'entreprise et la vidéo sont des MODÈLES.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, programme, repere, trace } from "@/lib/fiches-exercices/figures";

const GRIS = "#94a3b8";
const VERT = "#16a34a";

/** Dessin réservé à l'écran : le PDF garde 12 à 14 dessins (≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Une courbe qui n'est pas un polynôme, échantillonnée tous les 0,05, coupée en hauteur. */
const echantillon = (f: (x: number) => number, de: number, a: number, yMin = -Infinity, yMax = Infinity): [number, number][] =>
  Array.from({ length: Math.round((a - de) / 0.05) + 1 }, (_, k) => {
    const x = de + k * 0.05;
    return [Math.round(x * 100) / 100, Math.round(f(x) * 1000) / 1000] as [number, number];
  }).filter(([, y]) => y >= yMin && y <= yMax);

/** Le tableau de variations de terminale, AVEC la ligne du signe de la dérivée.
 *  Texte NU (SVG). Un « 0 » sur chaque borne intérieure : ce sont des zéros de f′. */
const tabVar = (bornes: string[], signes: ("+" | "-")[], valeurs: string[], nom = "f", variable = "x") => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    <CanvasRenderer
      figure={{
        kind: "tableau_variations",
        variable,
        bornes,
        derivee: { label: `${nom}′(${variable})`, signes, marques: bornes.slice(2).map(() => "0" as const) },
        variations: { label: nom, valeurs },
      }}
    />
  </div>
);

/** La CHAÎNE d'une composée : x → u(x) → g(u), avec u′ et g′(u) sous leurs cases. Texte NU. */
const chaine = (cases: [string, string, string], derivees: [string, string]) => {
  const boites: [number, number][] = [[6, 44], [92, 104], [238, 96]];
  const fleche = (x1: number, x2: number, nom: string) => (
    <g>
      <line x1={x1 + 4} y1="32" x2={x2 - 8} y2="32" stroke="#475569" strokeWidth="2" />
      <path d={`M${x2 - 4},32 L${x2 - 11},27 L${x2 - 11},37 Z`} fill="#475569" />
      <text x={(x1 + x2) / 2} y="22" textAnchor="middle" fontSize="13" fontWeight="800" fontStyle="italic" fill="#475569">{nom}</text>
    </g>
  );
  return (
    <div className="mx-auto w-full max-w-[21rem] print:max-w-[15rem]">
      <svg viewBox="0 0 340 96" className="block h-auto w-full" role="img" aria-label="Décomposition d'une fonction composée">
        {boites.map(([x, w], i) => (
          <g key={i}>
            <rect x={x} y="14" width={w} height="36" rx="10" fill={i === 0 ? "#f1f5f9" : "#eff6ff"} stroke="#2563eb" strokeWidth="2" />
            <text x={x + w / 2} y="37" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">{cases[i]}</text>
          </g>
        ))}
        {fleche(50, 92, "u")}
        {fleche(196, 238, "g")}
        <text x="144" y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ea580c">{derivees[0]}</text>
        <text x="286" y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ea580c">{derivees[1]}</text>
      </svg>
    </div>
  );
};

/** Une lampe L à la hauteur h (en m) au-dessus du centre O d'une table de rayon 1 m ; M au bord. 100 px par mètre. */
const lampe = (h: number) => {
  const [ox, oy, u] = [110, 170, 100];
  const ly = oy - h * u;
  const mx = ox + u;
  const n = Math.hypot(u, h * u);
  const [dx, dy] = [u / n, (h * u) / n];
  const milieu = Math.atan2(dy, dx) / 2 + Math.PI / 4;
  return (
    <div className="mx-auto w-full max-w-[17rem] print:max-w-[12rem]">
      <svg viewBox="0 0 260 200" className="block h-auto w-full" role="img" aria-label="Une lampe au-dessus d'une table ronde">
        <line x1={ox} y1="6" x2={ox} y2={ly - 8} stroke="#475569" strokeWidth="1.5" />
        <line x1={ox - u - 8} y1={oy} x2={mx + 8} y2={oy} stroke="#0f172a" strokeWidth="4" />
        <line x1={ox} y1={ly} x2={ox} y2={oy} stroke="#475569" strokeWidth="1.5" strokeDasharray="5 4" />
        <line x1={ox} y1={ly} x2={mx} y2={oy} stroke="#ea580c" strokeWidth="2.5" />
        <path d={`M${ox},${ly + 24} A24,24 0 0 0 ${ox + 24 * dx},${ly + 24 * dy}`} fill="none" stroke="#2563eb" strokeWidth="1.8" />
        <circle cx={ox} cy={ly} r="7" fill="#facc15" stroke="#0f172a" strokeWidth="1.5" />
        <circle cx={ox} cy={oy} r="3" fill="#0f172a" />
        <circle cx={mx} cy={oy} r="3" fill="#0f172a" />
        <text x={ox - 22} y={ly + 5} fontSize="14" fontWeight="800" fill="#0f172a">L</text>
        <text x={ox - 5} y={oy + 20} fontSize="14" fontWeight="800" fill="#0f172a">O</text>
        <text x={mx + 6} y={oy - 6} fontSize="14" fontWeight="800" fill="#0f172a">M</text>
        <text x={ox - 18} y={(ly + oy) / 2 + 5} fontSize="14" fontWeight="800" fontStyle="italic" fill="#475569">h</text>
        <text x={(ox + mx) / 2 + 10} y={(ly + oy) / 2 - 4} fontSize="14" fontWeight="800" fontStyle="italic" fill="#ea580c">d</text>
        <text x={ox + u / 2} y={oy + 20} textAnchor="middle" fontSize="13" fontWeight="700" fill="#475569">1 m</text>
        <text x={ox + 38 * Math.cos(milieu)} y={ly + 38 * Math.sin(milieu) + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill="#2563eb">θ</text>
      </svg>
    </div>
  );
};

export const exercicesDerivationFonctionTerminale: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "terminale-spe",
  notion: "derivation-fonction",
  titre: "Dérivation et variations",
  accroche:
    "Vingt exercices, de la formule qu'on applique au problème de bac, avec un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, et elle montre la tangente qui touche la courbe, le sommet où elle s'aplatit, le tableau où le signe de la dérivée commande les flèches.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=terminale-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "Formules : $(x^n)' = nx^{n-1}$ pour tout entier $n$ ; $(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$ ; $(\\mathrm{e}^{x})' = \\mathrm{e}^{x}$ ; $(\\sin x)' = \\cos x$ et $(\\cos x)' = -\\sin x$.",
        "Opérations : $(uv)' = u'v + uv'$ et $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.",
        "Composée : $(g \\circ u)' = u' \\times (g' \\circ u)$. Les cas utiles : $(\\mathrm{e}^{u})' = u'\\mathrm{e}^{u}$, $(u^n)' = nu'u^{n-1}$ et $(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$.",
        "Tangente en $a$ : $y = f'(a)(x - a) + f(a)$. Si $f' > 0$ sur un intervalle, $f$ y est strictement croissante ; un extremum se trouve là où $f'$ s'annule en changeant de signe.",
      ],
      exercices: [
        {
          enonce:
            "Dériver chaque fonction.\na) $f(x) = \\dfrac{1}{x^4}$, sur $]0 ; +\\infty[$\nb) $g(x) = 2\\sqrt{x} - \\dfrac{5}{x}$, sur $]0 ; +\\infty[$\nc) $h(x) = 3\\sin x + \\cos x$, sur $\\mathbb{R}$\nd) Le dessin montre la courbe du sinus et sa tangente en $0$. Quelle est la pente de cette tangente ? La retrouver par le calcul.",
          figure: repere([-4, 4, -2, 2], [{ pts: echantillon(Math.sin, -4, 4) }, { q: [0, 1, 0], couleur: ORANGE }], [{ x: 0, y: 0, label: "" }]),
          correction:
            "a) On écrit $f(x) = x^{-4}$. Avec $n = -4$ : $f'(x) = -4x^{-5} = -\\dfrac{4}{x^5}$.\nb) $(2\\sqrt{x})' = 2 \\times \\dfrac{1}{2\\sqrt{x}} = \\dfrac{1}{\\sqrt{x}}$, et $\\left(-\\dfrac{5}{x}\\right)' = -5 \\times \\left(-\\dfrac{1}{x^2}\\right) = \\dfrac{5}{x^2}$.\nDonc $g'(x) = \\dfrac{1}{\\sqrt{x}} + \\dfrac{5}{x^2}$.\nc) $h'(x) = 3\\cos x - \\sin x$.\nd) La tangente orange passe par $(0 ; 0)$ et $(1 ; 1)$ : sa pente vaut $1$. Par le calcul : $\\sin'(0) = \\cos 0 = 1$.\n⚠️ $\\left(\\dfrac{1}{x^4}\\right)'$ n'est pas $\\dfrac{1}{4x^3}$ : on passe par $x^{-4}$, et l'exposant descend à $-5$.\n⚠️ La dérivée de $\\cos$ est $-\\sin$, avec un signe moins ; celle de $\\sin$ est $\\cos$, sans signe.\n⭐ Sur le dessin : près de $0$, la courbe du sinus se confond presque avec la droite $y = x$.",
          micros: ["derivation_formules"],
        },
        {
          enonce:
            "Dériver chaque fonction.\na) $f(x) = \\mathrm{e}^{3x - 1}$\nb) $g(x) = \\mathrm{e}^{-x^2}$\nc) $h(x) = \\mathrm{e}^{\\frac{1}{x}}$, pour $x \\neq 0$\nd) Pourquoi la courbe de $g$ a-t-elle une tangente horizontale au point d'abscisse $0$ ?",
          correction:
            "On applique $(\\mathrm{e}^{u})' = u'\\mathrm{e}^{u}$.\na) $u = 3x - 1$, $u' = 3$ : $f'(x) = 3\\mathrm{e}^{3x - 1}$.\nb) $u = -x^2$, $u' = -2x$ : $g'(x) = -2x\\mathrm{e}^{-x^2}$.\nc) $u = \\dfrac{1}{x}$, $u' = -\\dfrac{1}{x^2}$ : $h'(x) = -\\dfrac{1}{x^2}\\mathrm{e}^{\\frac{1}{x}}$.\nd) $g'(0) = -2 \\times 0 \\times \\mathrm{e}^{0} = 0$ : la tangente en $0$ a une pente nulle, elle est horizontale.\n⚠️ La dérivée de $\\mathrm{e}^{-x^2}$ n'est pas $\\mathrm{e}^{-x^2}$ : il faut multiplier par $u' = -2x$.\n⭐ Sur le dessin : la courbe de $g$ est une cloche ; la tangente orange $y = 1$ la touche en son sommet $(0 ; 1)$.",
          schema: ecranSeulement(repere([-3, 3, -1, 2], [{ pts: echantillon((x) => Math.exp(-x * x), -3, 3) }, { q: [0, 0, 1], couleur: ORANGE }], [{ x: 0, y: 1, label: "" }])),
          micros: ["derivation_composee"],
        },
        {
          enonce:
            "Dériver chaque fonction.\na) $f(x) = (x^3 + 2x)^4$\nb) $g(x) = \\dfrac{1}{(2x + 1)^3}$, pour $x > -\\dfrac{1}{2}$\nc) $h(x) = (\\mathrm{e}^{x} + 1)^2$",
          correction:
            "On applique $(u^n)' = nu'u^{n-1}$.\na) $u = x^3 + 2x$, $u' = 3x^2 + 2$, $n = 4$ : $f'(x) = 4(3x^2 + 2)(x^3 + 2x)^3$.\nb) On écrit $g(x) = (2x + 1)^{-3}$ : $u = 2x + 1$, $u' = 2$, $n = -3$.\n$g'(x) = -3 \\times 2 \\times (2x + 1)^{-4} = -\\dfrac{6}{(2x + 1)^4}$.\nc) $u = \\mathrm{e}^{x} + 1$, $u' = \\mathrm{e}^{x}$, $n = 2$ : $h'(x) = 2\\mathrm{e}^{x}(\\mathrm{e}^{x} + 1)$.\n⚠️ L'oubli classique : écrire $4(x^3 + 2x)^3$ sans le facteur $u' = 3x^2 + 2$.\n⭐ Sur le schéma (fonction b) : $x$ passe d'abord par $u$, puis par $g$. La dérivée multiplie les deux dérivées : $u' = 2$, fois $g'(u) = -\\dfrac{3}{u^4}$.",
          schema: chaine(["x", "u = 2x + 1", "g(u) = 1/u³"], ["u′ = 2", "g′(u) = −3/u⁴"]),
          micros: ["derivation_composee"],
        },
        {
          enonce:
            "Soit $f(x) = \\sqrt{4 - x^2}$ sur $]-2 ; 2[$.\na) Calculer $f'(x)$.\nb) Calculer $f'(0)$ et $f'(1)$.\nc) La courbe de $f$ est un demi-cercle de centre $O$ et de rayon $2$. Vérifier que la tangente au point $A(1 ; \\sqrt{3})$ est perpendiculaire au rayon $[OA]$.",
          correction:
            "a) $f = \\sqrt{u}$, avec $u = 4 - x^2$ et $u' = -2x$.\n$f'(x) = \\dfrac{-2x}{2\\sqrt{4 - x^2}} = -\\dfrac{x}{\\sqrt{4 - x^2}}$.\nb) $f'(0) = 0$ et $f'(1) = -\\dfrac{1}{\\sqrt{3}} = -\\dfrac{\\sqrt{3}}{3} \\approx -0{,}58$.\nc) Un vecteur directeur de la tangente en $A$ est $\\vec{t}\\left(1 ; -\\dfrac{1}{\\sqrt{3}}\\right)$, et $\\overrightarrow{OA}(1 ; \\sqrt{3})$.\nLeur produit scalaire vaut $1 \\times 1 + \\left(-\\dfrac{1}{\\sqrt{3}}\\right) \\times \\sqrt{3} = 1 - 1 = 0$ : ils sont orthogonaux.\n⚠️ $f$ n'est pas dérivable en $-2$ et en $2$ : $u$ s'y annule, et on diviserait par $0$. Le cercle y a des tangentes verticales.\n⭐ Sur le dessin : la tangente orange en $A$ fait un angle droit avec le rayon gris. C'est la propriété de la tangente à un cercle, retrouvée par la dérivée.",
          schema: repere(
            [-3, 3, -1, 3],
            [
              { pts: echantillon((x) => Math.sqrt(Math.max(0, 4 - x * x)), -2, 2) },
              { q: [0, -0.577, 2.309], couleur: ORANGE },
              { pts: [[0, 0], [1, 1.732]], couleur: GRIS },
            ],
            [{ x: 1, y: 1.73, label: "" }],
          ),
          micros: ["derivation_composee"],
        },
        {
          enonce:
            "a) Soit $f(x) = (2x - 1)\\mathrm{e}^{x}$. Calculer $f'(x)$ et étudier son signe.\nb) Soit $g(x) = \\dfrac{\\mathrm{e}^{x}}{x^2 + 1}$. Montrer que $g'(x) = \\dfrac{\\mathrm{e}^{x}(x - 1)^2}{(x^2 + 1)^2}$. En déduire le sens de variation de $g$.",
          correction:
            "a) Produit : $f'(x) = 2\\mathrm{e}^{x} + (2x - 1)\\mathrm{e}^{x} = (2x + 1)\\mathrm{e}^{x}$.\nComme $\\mathrm{e}^{x} > 0$, $f'(x)$ a le signe de $2x + 1$ : négatif pour $x < -\\dfrac{1}{2}$, positif pour $x > -\\dfrac{1}{2}$.\nb) Quotient, avec $u = \\mathrm{e}^{x}$ et $v = x^2 + 1$ : $g'(x) = \\dfrac{u'v - uv'}{v^2}$, où $u'v - uv' = \\mathrm{e}^{x}(x^2 + 1) - 2x\\mathrm{e}^{x}$.\nOn factorise $\\mathrm{e}^{x}$ : en haut, il reste $x^2 - 2x + 1 = (x - 1)^2$.\n$g'(x) \\geqslant 0$, et ne s'annule qu'en $1$ : $g$ est strictement croissante sur $\\mathbb{R}$.\n⚠️ $g'(1) = 0$, mais $g'$ ne change pas de signe en $1$ : il n'y a PAS d'extremum en $1$, seulement une tangente horizontale.\n⭐ Sur le dessin : la courbe de $g$ monte, marque un palier au point $\\left(1 ; \\dfrac{\\mathrm{e}}{2}\\right)$, puis remonte. La tangente orange y est horizontale.",
          schema: ecranSeulement(
            repere([-3, 3, -1, 4], [{ pts: echantillon((x) => Math.exp(x) / (x * x + 1), -3, 3) }, { q: [0, 0, 1.359], couleur: ORANGE }], [{ x: 1, y: 1.36, label: "" }]),
          ),
          micros: ["derivation_somme_produit_quotient"],
        },
        {
          enonce: "Soit $f(x) = \\mathrm{e}^{2x} - 3x$. Déterminer l'équation de la tangente à la courbe de $f$ au point d'abscisse $0$.",
          correction:
            "$f(0) = \\mathrm{e}^{0} - 0 = 1$.\n$f'(x) = 2\\mathrm{e}^{2x} - 3$, donc $f'(0) = 2 - 3 = -1$.\nLa tangente a pour équation $y = f'(0)(x - 0) + f(0)$, soit $y = -x + 1$.\n⚠️ $(\\mathrm{e}^{2x})' = 2\\mathrm{e}^{2x}$ : le facteur $2$ vient de la dérivée de $2x$.\n⭐ Sur le dessin : la tangente orange touche la courbe au point rouge $(0 ; 1)$ et descend d'une unité quand on avance d'une unité : pente $-1$.",
          schema: repere([-2, 2, -1, 5], [{ pts: echantillon((x) => Math.exp(2 * x) - 3 * x, -2, 1, -1, 5) }, { q: [0, -1, 1], couleur: ORANGE }], [{ x: 0, y: 1, label: "" }]),
          micros: ["derivation_tangente"],
        },
        {
          enonce:
            "Soit $f(x) = (x^2 - 3)\\mathrm{e}^{x}$ sur $[-4 ; 2]$.\na) Montrer que $f'(x) = (x + 3)(x - 1)\\mathrm{e}^{x}$.\nb) Dresser le tableau de variations de $f$, avec des valeurs arrondies au centième.",
          correction:
            "a) Produit : $f'(x) = 2x\\mathrm{e}^{x} + (x^2 - 3)\\mathrm{e}^{x}$, soit $f'(x) = (x^2 + 2x - 3)\\mathrm{e}^{x}$.\nEt $x^2 + 2x - 3 = (x + 3)(x - 1)$ : on vérifie en développant.\nb) $\\mathrm{e}^{x} > 0$ : $f'(x)$ a le signe de $(x + 3)(x - 1)$. Positif sur $[-4 ; -3[$, négatif sur $]-3 ; 1[$, positif sur $]1 ; 2]$.\n$f(-4) = 13\\mathrm{e}^{-4} \\approx 0{,}24$ ; $f(-3) = 6\\mathrm{e}^{-3} \\approx 0{,}30$ ; $f(1) = -2\\mathrm{e} \\approx -5{,}44$ ; $f(2) = \\mathrm{e}^{2} \\approx 7{,}39$.\n⚠️ Entre $-4$ et $-3$, $f$ monte à peine, de $0{,}24$ à $0{,}30$ : sur une courbe, on ne le verrait pas. Le signe de $f'$, lui, ne se trompe pas.\n⭐ Dans le tableau : chaque signe de $f'$ commande une flèche. Un maximum local en $-3$, un minimum en $1$.",
          schema: tabVar(["−4", "−3", "1", "2"], ["+", "-", "+"], ["0,24", "0,30", "−5,44", "7,39"]),
          micros: ["derivation_variation"],
        },
        {
          enonce:
            "Soit $f(x) = 4x\\mathrm{e}^{-x}$ sur $[0 ; +\\infty[$. Pour quelle valeur de $x$ la fonction $f$ atteint-elle son maximum ? Donner la valeur exacte de ce maximum.",
          correction:
            "Produit : $f'(x) = 4\\mathrm{e}^{-x} + 4x \\times (-\\mathrm{e}^{-x})$, soit $f'(x) = 4(1 - x)\\mathrm{e}^{-x}$.\n$\\mathrm{e}^{-x} > 0$ : $f'(x)$ a le signe de $1 - x$. $f$ croît sur $[0 ; 1]$, puis décroît sur $[1 ; +\\infty[$.\nLe maximum est atteint en $x = 1$ ; il vaut $f(1) = 4\\mathrm{e}^{-1} = \\dfrac{4}{\\mathrm{e}} \\approx 1{,}47$.\n⚠️ La valeur exacte est $\\dfrac{4}{\\mathrm{e}}$ ; $1{,}47$ n'en est qu'une valeur approchée.\n⭐ Sur le dessin : le sommet de la courbe, au point rouge $(1 ; 1{,}47)$.",
          schema: ecranSeulement(repere([-1, 6, -1, 2], [{ pts: echantillon((x) => 4 * x * Math.exp(-x), 0, 6) }], [{ x: 1, y: 1.47, label: "" }])),
          micros: ["derivation_optimisation"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un devoir. On rédige.",
      rappel: [
        "Pour le signe de $f'$, on factorise : une exponentielle est toujours strictement positive, elle ne change pas le signe.",
        "Quand le signe de $f'$ ne se lit pas, on étudie une fonction auxiliaire : le numérateur de $f'$, ou la différence entre $f$ et sa tangente.",
        "Pour minimiser une distance $\\sqrt{u(x)}$, on minimise $u(x)$ : la racine carrée est croissante.",
        "Une vitesse est la dérivée d'une position. Le signe de la dérivée dit si la grandeur monte ou descend ; sa valeur dit à quelle vitesse.",
      ],
      exercices: [
        {
          enonce:
            "Une masse accrochée à un ressort oscille. Sa position, en cm, est $x(t) = 3\\cos\\left(2t + \\dfrac{\\pi}{4}\\right)$, où $t$ est en secondes. Sa vitesse est la dérivée $v(t) = x'(t)$.\na) Calculer $v(t)$.\nb) Calculer $v(0)$. Dans quel sens la masse part-elle ?\nc) Quelle est la plus grande vitesse, en valeur absolue ? Où est la masse à ce moment-là ?\nd) À quel instant $t > 0$ la masse s'arrête-t-elle pour la première fois ? Où est-elle alors ?",
          correction:
            "a) $(\\cos u)' = -u'\\sin u$, avec $u = 2t + \\dfrac{\\pi}{4}$ et $u' = 2$.\nDonc $v(t) = -6\\sin\\left(2t + \\dfrac{\\pi}{4}\\right)$.\nb) $v(0) = -6\\sin\\left(\\dfrac{\\pi}{4}\\right) = -6 \\times \\dfrac{\\sqrt{2}}{2} = -3\\sqrt{2} \\approx -4{,}24$ cm/s.\nLa vitesse est négative : $x$ diminue, la masse part vers les positions négatives.\nc) Un sinus reste entre $-1$ et $1$ : $|v(t)| \\leqslant 6$. Le maximum $6$ cm/s est atteint quand le sinus vaut $\\pm 1$, donc quand le cosinus vaut $0$ : la masse passe alors par $x = 0$, sa position d'équilibre.\nd) $v(t) = 0$ quand $\\sin\\left(2t + \\dfrac{\\pi}{4}\\right) = 0$. Le premier instant $t > 0$ donne $2t + \\dfrac{\\pi}{4} = \\pi$, soit $t = \\dfrac{3\\pi}{8} \\approx 1{,}18$ s.\nAlors $x = 3\\cos(\\pi) = -3$ : la masse est au bout de sa course.\n⚠️ Le facteur $2$ de $u'$ s'oublie facilement : la vitesse maximale est $6$ cm/s, pas $3$.\n⭐ Sur le dessin : la courbe de la position. Au point rouge $(1{,}18 ; -3)$, la tangente est horizontale : la vitesse est nulle, la masse fait demi-tour.",
          schema: ecranSeulement(repere([-1, 7, -4, 4], [{ pts: echantillon((t) => 3 * Math.cos(2 * t + Math.PI / 4), 0, 7) }], [{ x: 1.18, y: -3, label: "" }])),
          micros: ["derivation_composee", "derivation_formules"],
        },
        {
          enonce:
            "Une information circule dans une ville. Le nombre de personnes qui la connaissent, en milliers, est modélisé par $P(t) = \\dfrac{10}{1 + 9\\mathrm{e}^{-0{,}5t}}$, où $t$ est le temps en jours.\na) Calculer $P(0)$ et la limite de $P$ en $+\\infty$. Interpréter.\nb) Montrer que $P'(t) = \\dfrac{45\\mathrm{e}^{-0{,}5t}}{(1 + 9\\mathrm{e}^{-0{,}5t})^2}$. En déduire le sens de variation de $P$.\nc) Déterminer l'équation de la tangente à la courbe au point d'abscisse $0$. Que dit son coefficient directeur ?",
          correction:
            "a) $P(0) = \\dfrac{10}{1 + 9} = 1$ : au départ, $1\\,000$ personnes sont au courant.\n$\\mathrm{e}^{-0{,}5t} \\to 0$, donc $\\lim P = 10$ : à long terme, $10\\,000$ personnes la connaîtront.\nb) $P = \\dfrac{10}{u}$, avec $u = 1 + 9\\mathrm{e}^{-0{,}5t}$ et $u' = 9 \\times (-0{,}5)\\mathrm{e}^{-0{,}5t} = -4{,}5\\mathrm{e}^{-0{,}5t}$.\n$P' = -\\dfrac{10u'}{u^2} = \\dfrac{45\\mathrm{e}^{-0{,}5t}}{u^2}$ : c'est bien la formule annoncée.\nUne exponentielle et un carré sont positifs : $P'(t) > 0$, et $P$ est strictement croissante.\nc) $P'(0) = \\dfrac{45}{10^2} = 0{,}45$ et $P(0) = 1$ : la tangente a pour équation $y = 0{,}45t + 1$.\nAu départ, l'information gagne environ $450$ personnes par jour.\n⚠️ $\\left(\\dfrac{1}{u}\\right)' = -\\dfrac{u'}{u^2}$ : ici $u'$ est négatif, les deux signes moins s'annulent.\n⭐ Sur le dessin : la courbe en S monte vers la droite $y = 10$ ; la tangente orange montre la vitesse de départ, bien plus lente qu'au milieu.",
          schema: repere(
            [-1, 14, -1, 11],
            [{ pts: echantillon((t) => 10 / (1 + 9 * Math.exp(-0.5 * t)), 0, 14) }, { q: [0, 0.45, 1], couleur: ORANGE }],
            [{ x: 0, y: 1, label: "" }],
            10,
            true,
          ),
          micros: ["derivation_somme_produit_quotient", "derivation_composee", "derivation_tangente"],
        },
        {
          enonce:
            "Soit $f(x) = \\mathrm{e}^{x} - x - 1$ sur $\\mathbb{R}$.\na) Étudier les variations de $f$, et en déduire que $\\mathrm{e}^{x} \\geqslant x + 1$ pour tout réel $x$.\nb) Quelle est la tangente à la courbe de l'exponentielle au point d'abscisse $0$ ? Que dit a) sur le dessin ?\nc) En appliquant a) à $x = \\dfrac{1}{n}$, montrer que $\\left(1 + \\dfrac{1}{n}\\right)^n \\leqslant \\mathrm{e}$ pour tout entier $n \\geqslant 1$.",
          correction:
            "a) $f'(x) = \\mathrm{e}^{x} - 1$. L'exponentielle est strictement croissante et $\\mathrm{e}^{0} = 1$ : $f'(x) < 0$ pour $x < 0$, et $f'(x) > 0$ pour $x > 0$.\n$f$ décroît puis croît : son minimum est $f(0) = 1 - 0 - 1 = 0$.\nDonc $f(x) \\geqslant 0$ pour tout $x$, c'est-à-dire $\\mathrm{e}^{x} \\geqslant x + 1$.\nb) En $0$ : $\\mathrm{e}^{0} = 1$ et $\\exp'(0) = 1$. La tangente est $y = x + 1$.\na) dit que la courbe de l'exponentielle est toujours AU-DESSUS de cette tangente.\nc) Avec $x = \\dfrac{1}{n}$ : $\\mathrm{e}^{\\frac{1}{n}} \\geqslant 1 + \\dfrac{1}{n}$.\nLes deux membres sont positifs ; on les élève à la puissance $n$, ce qui garde l'ordre : $\\mathrm{e} \\geqslant \\left(1 + \\dfrac{1}{n}\\right)^n$.\n⭐ Pour $n = 10$ : $1{,}1^{10} \\approx 2{,}594$, bien sous $\\mathrm{e} \\approx 2{,}718$.\n⚠️ Élever à la puissance $n$ ne garde l'ordre que pour des nombres POSITIFS : $-3 < 2$, mais $(-3)^2 > 2^2$.\n⭐ Sur le dessin : la courbe bleue reste au-dessus de la tangente orange, et la touche en un seul point, $(0 ; 1)$.",
          schema: ecranSeulement(repere([-3, 3, -1, 5], [{ pts: echantillon(Math.exp, -3, 1.6, -1, 5) }, { q: [0, 1, 1], couleur: ORANGE }], [{ x: 0, y: 1, label: "" }])),
          micros: ["derivation_variation", "derivation_tangente"],
        },
        {
          enonce:
            "Dans un repère en kilomètres, la rive d'une rivière suit la parabole $y = x^2$. Une randonneuse campe au point $A(3 ; 0)$ et veut rejoindre le point de la rive le plus proche. On note $M(x ; x^2)$ un point de la rive.\na) Montrer que $AM = d(x)$, avec $d(x) = \\sqrt{(x - 3)^2 + x^4}$.\nb) Montrer que $d'(x)$ a le signe de $2x^3 + x - 3$, puis que $2x^3 + x - 3 = (x - 1)(2x^2 + 2x + 3)$.\nc) En déduire le point $P$ de la rive le plus proche de $A$, et la distance à parcourir.\nd) Montrer que la droite $(AP)$ est perpendiculaire à la tangente à la parabole en $P$.",
          correction:
            "a) $AM^2 = (x - 3)^2 + (x^2 - 0)^2 = (x - 3)^2 + x^4$, d'où $AM = d(x)$.\nb) $d = \\sqrt{u}$, avec $u = (x - 3)^2 + x^4$ et $u' = 2(x - 3) + 4x^3 = 2(2x^3 + x - 3)$.\n$d'(x) = \\dfrac{u'}{2\\sqrt{u}} = \\dfrac{2x^3 + x - 3}{\\sqrt{u}}$ : même signe que $2x^3 + x - 3$.\nEn développant : $(x - 1)(2x^2 + 2x + 3)$ $= 2x^3 + 2x^2 + 3x - 2x^2 - 2x - 3$ $= 2x^3 + x - 3$.\nc) Le discriminant de $2x^2 + 2x + 3$ vaut $4 - 24 = -20 < 0$ : ce facteur est toujours positif.\n$d'(x)$ a donc le signe de $x - 1$ : $d$ décroît, puis croît. Son minimum est en $x = 1$.\n$P(1 ; 1)$, et $d(1) = \\sqrt{4 + 1} = \\sqrt{5} \\approx 2{,}24$ km.\nd) La tangente en $P$ a pour pente $2 \\times 1 = 2$ : vecteur directeur $\\vec{t}(1 ; 2)$. Et $\\overrightarrow{AP}(-2 ; 1)$.\nProduit scalaire : $1 \\times (-2) + 2 \\times 1 = 0$. Les deux droites sont perpendiculaires.\n⚠️ On minimise $u$ au lieu de $d$ parce que la racine est croissante. Mais la distance minimale est $\\sqrt{5}$, pas $5$.\n⭐ Sur le dessin : le point rouge sur l'axe est $A$. Le chemin gris le plus court arrive en $P$ à angle droit sur la tangente orange.",
          schema: repere(
            [-2, 4, -1, 4],
            [{ q: [1, 0, 0] }, { q: [0, 2, -1], couleur: ORANGE }, { pts: [[3, 0], [1, 1]], couleur: GRIS }],
            [{ x: 3, y: 0, label: "" }, { x: 1, y: 1, label: "P" }],
          ),
          micros: ["derivation_composee", "derivation_optimisation", "derivation_tangente"],
        },
        {
          enonce:
            "On charge un condensateur. La tension à ses bornes, en volts, est $u(t) = 12(1 - \\mathrm{e}^{-\\frac{t}{2}})$, où $t \\geqslant 0$ est en millisecondes.\na) Calculer $u'(t)$, et en déduire le sens de variation de $u$. Donner la limite de $u$ en $+\\infty$.\nb) Déterminer l'équation de la tangente à la courbe à l'origine.\nc) À quel instant cette tangente coupe-t-elle la droite $y = 12$ ?\nd) Calculer $u(2)$. Quel pourcentage de $12$ V est atteint ?",
          correction:
            "a) La dérivée de $\\mathrm{e}^{-\\frac{t}{2}}$ est $-\\dfrac{1}{2}\\mathrm{e}^{-\\frac{t}{2}}$. Donc $u'(t) = 12 \\times \\dfrac{1}{2}\\mathrm{e}^{-\\frac{t}{2}} = 6\\mathrm{e}^{-\\frac{t}{2}}$.\n$u'(t) > 0$ : la tension croît. Comme $\\mathrm{e}^{-\\frac{t}{2}} \\to 0$, $\\lim u = 12$ : elle tend vers $12$ V.\nb) $u(0) = 0$ et $u'(0) = 6$ : la tangente est $y = 6t$.\nc) $6t = 12$ donne $t = 2$ ms.\nd) $u(2) = 12(1 - \\mathrm{e}^{-1}) \\approx 7{,}59$ V. Or $1 - \\mathrm{e}^{-1} \\approx 0{,}632$ : la tension atteint environ $63$ % de $12$ V.\n⭐ Ce nombre $2$ s'appelle la constante de temps du circuit : la tangente au départ la montre sur le dessin, et au bout de ce temps, la tension a fait $63$ % du chemin.\n⚠️ Deux signes moins se rencontrent dans $u'$ : celui de $-\\dfrac{t}{2}$ et celui devant l'exponentielle. Ils donnent un $u'$ positif.\n⭐ Sur le dessin : la tangente orange part de l'origine et coupe la droite $y = 12$ au point rouge $(2 ; 12)$.",
          schema: repere(
            [-1, 10, -1, 14],
            [{ pts: echantillon((t) => 12 * (1 - Math.exp(-t / 2)), 0, 10) }, { q: [0, 6, 0], couleur: ORANGE }],
            [{ x: 2, y: 12, label: "" }],
            12,
            true,
          ),
          micros: ["derivation_tangente", "derivation_composee"],
        },
        {
          enonce:
            "La courbe tracée n'est PAS celle de $f$ : c'est celle de sa dérivée $f'$, sur $[-2 ; 3]$.\na) Donner le signe de $f'(x)$ selon les valeurs de $x$.\nb) En déduire les variations de $f$, et où $f$ a ses extremums locaux.\nc) Quel est le coefficient directeur de la tangente à la courbe de $f$ au point d'abscisse $0$ ?\nd) On sait que $f(0) = 1$. Donner l'équation de cette tangente.",
          figure: repere([-3, 4, -3, 5], [{ pts: echantillon((x) => x * x - x - 2, -2, 3) }], [{ x: -1, y: 0, label: "" }, { x: 2, y: 0, label: "" }]),
          correction:
            "a) $f'(x)$ est positif là où la courbe est au-dessus de l'axe : sur $[-2 ; -1[$ et sur $]2 ; 3]$. Négatif sur $]-1 ; 2[$. Nul en $-1$ et en $2$.\nb) $f$ est croissante sur $[-2 ; -1]$, décroissante sur $[-1 ; 2]$, croissante sur $[2 ; 3]$.\n$f$ a un maximum local en $-1$ et un minimum local en $2$.\nc) Le coefficient directeur est $f'(0)$ : la courbe passe par $(0 ; -2)$, donc $f'(0) = -2$.\nd) $y = -2(x - 0) + 1$, soit $y = -2x + 1$.\n⚠️ Ne pas lire les variations de $f'$ ! $f'$ descend jusqu'à $0{,}5$, mais $f$, elle, change de sens en $-1$ et en $2$, là où $f'$ CHANGE DE SIGNE.\n⭐ Dans le tableau, les valeurs sont calculées avec $f(x) = \\dfrac{x^3}{3} - \\dfrac{x^2}{2} - 2x + 1$, qui a bien $f'$ pour dérivée et vérifie $f(0) = 1$.",
          schema: ecranSeulement(tabVar(["−2", "−1", "2", "3"], ["+", "-", "+"], ["0,33", "2,17", "−2,33", "−0,5"])),
          micros: ["derivation_variation", "derivation_tangente"],
        },
        {
          enonce:
            "a) Écrire l'équation de la tangente $T_a$ à la courbe de l'exponentielle au point d'abscisse $a$.\nb) Pour quelle valeur de $a$ la tangente $T_a$ passe-t-elle par l'origine du repère ? Donner son équation.\nc) Montrer que $\\mathrm{e}^{x} \\geqslant \\mathrm{e}x$ pour tout réel $x$, en étudiant $h(x) = \\mathrm{e}^{x} - \\mathrm{e}x$.",
          correction:
            "a) $\\exp'(a) = \\mathrm{e}^{a}$ : $T_a$ a pour équation $y = \\mathrm{e}^{a}(x - a) + \\mathrm{e}^{a}$.\nb) $T_a$ passe par $O(0 ; 0)$ si $0 = \\mathrm{e}^{a}(0 - a) + \\mathrm{e}^{a}$, soit $\\mathrm{e}^{a}(1 - a) = 0$.\nUne exponentielle n'est jamais nulle : $1 - a = 0$, donc $a = 1$.\n$T_1$ : $y = \\mathrm{e}(x - 1) + \\mathrm{e}$, soit $y = \\mathrm{e}x$.\nc) $h'(x) = \\mathrm{e}^{x} - \\mathrm{e}$ : négatif pour $x < 1$, positif pour $x > 1$.\n$h$ a pour minimum $h(1) = \\mathrm{e} - \\mathrm{e} = 0$ : $h(x) \\geqslant 0$, donc $\\mathrm{e}^{x} \\geqslant \\mathrm{e}x$.\n⚠️ Dans $y = \\mathrm{e}x$, $\\mathrm{e}$ est un NOMBRE, environ $2{,}718$ : c'est une droite, pas une exponentielle.\n⭐ Sur le dessin : la seule tangente qui passe par l'origine touche la courbe au point rouge $(1 ; \\mathrm{e})$, et la courbe reste au-dessus.",
          schema: ecranSeulement(repere([-2, 3, -1, 5], [{ pts: echantillon(Math.exp, -2, 1.6, -1, 5) }, { q: [0, 2.718, 0], couleur: ORANGE }], [{ x: 1, y: 2.72, label: "" }])),
          micros: ["derivation_tangente", "derivation_formules", "derivation_variation"],
        },
        {
          enonce:
            "On considère $f(x) = \\mathrm{e}^{-x^2}$ et le programme Python ci-dessous.\na) Calculer $f'(x)$, puis la valeur exacte de $f'(1)$.\nb) Que calcule taux(1, h) ? Pourquoi ce nombre s'approche-t-il de $f'(1)$ quand $h$ devient petit ?\nc) Quels nombres le programme affiche-t-il, à peu près ? Les comparer à $f'(1)$.",
          figure: programme([
            "from math import exp",
            "",
            "def f(x):",
            "    return exp(-x * x)",
            "",
            "def taux(a, h):",
            "    return (f(a+h) - f(a)) / h",
            "",
            "for h in [0.1, 0.01, 0.001]:",
            "    t = taux(1, h)",
            "    print(round(t, 4))",
          ]),
          correction:
            "a) $u = -x^2$, $u' = -2x$ : $f'(x) = -2x\\mathrm{e}^{-x^2}$. Donc $f'(1) = -2\\mathrm{e}^{-1} = -\\dfrac{2}{\\mathrm{e}} \\approx -0{,}7358$.\nb) taux(1, h) calcule $\\dfrac{f(1 + h) - f(1)}{h}$ : le taux de variation de $f$ entre $1$ et $1 + h$, la pente d'une sécante.\nQuand $h$ tend vers $0$, ce taux tend vers le nombre dérivé $f'(1)$ : c'est sa définition.\nc) Le programme affiche environ $-0{,}6968$, puis $-0{,}7321$, puis $-0{,}7354$ : les nombres s'approchent de $-0{,}7358$.\n⚠️ Même avec $h = 0{,}001$, il reste un écart d'environ $0{,}0004$ : le taux n'est qu'une approximation de la dérivée.\n⚠️ Python écrit -0.7354, avec un point : c'est notre $-0{,}7354$.\n⭐ Dans le tableau : chaque fois que $h$ est divisé par $10$, le taux se rapproche de $f'(1)$.",
          schema: ecranSeulement(trace(["h", "taux(1, h)"], [["0,1", "−0,6968"], ["0,01", "−0,7321"], ["0,001", "−0,7354"]])),
          micros: ["derivation_composee", "derivation_formules"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de bac, avec ses questions qui s'enchaînent. La dérivée dit quand la grandeur monte, quand elle descend, et où elle culmine.",
      rappel: [
        "Plan type : dériver, factoriser, étudier le signe (parfois avec une fonction auxiliaire), dresser le tableau de variations, puis répondre à la question du contexte.",
        "Un maximum ou un minimum se donne avec sa valeur ET l'endroit où il est atteint, avec les unités.",
        "Si l'équation $f'(x) = 0$ ne se résout pas par le calcul, on prouve l'existence d'une solution $\\alpha$ avec le théorème des valeurs intermédiaires, puis on l'encadre.",
      ],
      exercices: [
        {
          titre: "Le pic de pollution",
          enonce:
            "Après un rejet accidentel, la concentration d'un polluant dans une rivière, en mg/L, est modélisée par $C(t) = 5t^2\\mathrm{e}^{-t}$, où $t \\in [0 ; 8]$ est le temps en heures.\na) Montrer que $C'(t) = 5t(2 - t)\\mathrm{e}^{-t}$.\nb) Dresser le tableau de variations de $C$. Quand le pic de pollution a-t-il lieu, et quelle est sa valeur ?\nc) Calculer $C'(4)$ et interpréter ce nombre.\nd) Le seuil d'alerte est de $2$ mg/L. Montrer qu'il est dépassé pendant une seule période $]t_1 ; t_2[$. Encadrer $t_1$ et $t_2$ au centième, et donner la durée de l'alerte.",
          correction:
            "a) Produit : $C'(t) = 10t\\mathrm{e}^{-t} + 5t^2 \\times (-\\mathrm{e}^{-t})$, soit $C'(t) = 5t(2 - t)\\mathrm{e}^{-t}$.\nb) Sur $[0 ; 8]$, $5t \\geqslant 0$ et $\\mathrm{e}^{-t} > 0$ : $C'(t)$ a le signe de $2 - t$. $C$ croît sur $[0 ; 2]$, décroît sur $[2 ; 8]$.\n$C(0) = 0$, $C(2) = 20\\mathrm{e}^{-2} \\approx 2{,}71$ et $C(8) = 320\\mathrm{e}^{-8} \\approx 0{,}11$.\nLe pic a lieu $2$ heures après le rejet : environ $2{,}71$ mg/L.\nc) $C'(4) = 5 \\times 4 \\times (-2)\\mathrm{e}^{-4} = -40\\mathrm{e}^{-4} \\approx -0{,}73$.\nQuatre heures après le rejet, la concentration baisse d'environ $0{,}73$ mg/L par heure.\nd) Sur $[0 ; 2]$, $C$ est continue et strictement croissante de $0$ à $2{,}71$ : elle passe une seule fois par $2$, en $t_1$.\nSur $[2 ; 8]$, elle est strictement décroissante de $2{,}71$ à $0{,}11$ : une seule fois, en $t_2$. Entre les deux, $C(t) > 2$.\n$C(1{,}09) \\approx 1{,}997$ et $C(1{,}10) \\approx 2{,}014$ : $1{,}09 < t_1 < 1{,}10$.\n$C(3{,}31) \\approx 2{,}0004$ et $C(3{,}32) \\approx 1{,}992$ : $3{,}31 < t_2 < 3{,}32$.\nL'alerte dure entre $2{,}21$ h et $2{,}23$ h : environ $2$ h $13$ min.\n⚠️ Un nombre dérivé négatif ne veut pas dire que la concentration est négative : il dit qu'elle DIMINUE.\n⭐ Sur le dessin : la droite $y = 2$ coupe la courbe deux fois ; entre les deux, la pollution dépasse le seuil. Le sommet est le point rouge $(2 ; 2{,}71)$.",
          schema: (
            <div className="grid grid-cols-1 min-w-0 gap-2">
              {repere([-1, 9, -1, 4], [{ pts: echantillon((t) => 5 * t * t * Math.exp(-t), 0, 8) }], [{ x: 2, y: 2.71, label: "" }], 2)}
              {ecranSeulement(tabVar(["0", "2", "8"], ["+", "-"], ["0", "2,71", "0,11"], "C", "t"))}
            </div>
          ),
          micros: ["derivation_variation", "derivation_optimisation", "derivation_defi"],
        },
        {
          titre: "Le coût moyen le plus bas",
          enonce:
            "Une entreprise fabrique $x$ centaines d'objets par jour, avec $x \\in ]0 ; 6]$. Le coût de fabrication, en milliers d'euros, est $C(x) = \\mathrm{e}^{0{,}5x} + 2$. Le coût moyen d'une centaine d'objets est $M(x) = \\dfrac{C(x)}{x}$.\na) Montrer que $M'(x) = \\dfrac{g(x)}{x^2}$, avec $g(x) = (0{,}5x - 1)\\mathrm{e}^{0{,}5x} - 2$.\nb) Étudier les variations de $g$ sur $[0 ; 6]$. Montrer que l'équation $g(x) = 0$ a une unique solution $\\alpha$, et l'encadrer au centième.\nc) En déduire les variations de $M$. Quelle production rend le coût moyen le plus bas ?\nd) Montrer qu'en $\\alpha$, le coût marginal $C'(\\alpha)$ est égal au coût moyen $M(\\alpha)$.",
          correction:
            "a) Quotient : $M'(x) = \\dfrac{C'(x) \\times x - C(x)}{x^2}$, avec $C'(x) = 0{,}5\\mathrm{e}^{0{,}5x}$.\nEn haut : $0{,}5x\\mathrm{e}^{0{,}5x} - \\mathrm{e}^{0{,}5x} - 2$, c'est-à-dire $(0{,}5x - 1)\\mathrm{e}^{0{,}5x} - 2 = g(x)$.\nb) $g'(x) = 0{,}5\\mathrm{e}^{0{,}5x}$ $+ (0{,}5x - 1) \\times 0{,}5\\mathrm{e}^{0{,}5x}$, soit $g'(x) = 0{,}25x\\mathrm{e}^{0{,}5x}$.\n$g'(x) \\geqslant 0$ sur $[0 ; 6]$, nul seulement en $0$ : $g$ est strictement croissante.\n$g(0) = -1 - 2 = -3 < 0$ et $g(6) = 2\\mathrm{e}^{3} - 2 \\approx 38{,}17 > 0$. $g$ est continue.\nD'après le corollaire du théorème des valeurs intermédiaires, $g(x) = 0$ a une unique solution $\\alpha$ dans $[0 ; 6]$.\n$g(2{,}92) \\approx -0{,}019 < 0$ et $g(2{,}93) \\approx 0{,}012 > 0$ : $2{,}92 < \\alpha < 2{,}93$.\nc) $x^2 > 0$ : $M'(x)$ a le signe de $g(x)$, négatif avant $\\alpha$, positif après.\n$M$ décroît sur $]0 ; \\alpha]$, puis croît sur $[\\alpha ; 6]$. Le coût moyen est le plus bas pour environ $293$ objets par jour.\nIl vaut alors $M(\\alpha) \\approx 2{,}16$ milliers d'euros par centaine, soit environ $21{,}60$ € par objet.\nd) $g(\\alpha) = 0$ s'écrit $0{,}5\\alpha\\mathrm{e}^{0{,}5\\alpha} = \\mathrm{e}^{0{,}5\\alpha} + 2$, c'est-à-dire $\\alpha C'(\\alpha) = C(\\alpha)$.\nOn divise par $\\alpha > 0$ : $C'(\\alpha) = \\dfrac{C(\\alpha)}{\\alpha} = M(\\alpha)$.\n⚠️ $\\alpha$ ne se calcule pas exactement : on garde la lettre $\\alpha$ dans les calculs, et on n'arrondit qu'à la fin.\n⚠️ Le signe de $M'$ est celui de $g$ parce que $x^2 > 0$ : on n'étudie jamais le signe d'un quotient « en bloc ».\n⭐ Sur le dessin : le coût moyen descend, puis remonte ; son point le plus bas est le point rouge, vers $(2{,}93 ; 2{,}16)$.",
          schema: (
            <div className="grid grid-cols-1 min-w-0 gap-2">
              {repere([-1, 7, -1, 6], [{ pts: echantillon((x) => (Math.exp(0.5 * x) + 2) / x, 0.4, 6, -1, 6) }], [{ x: 2.93, y: 2.16, label: "" }])}
              {ecranSeulement(tabVar(["0", "α", "6"], ["-", "+"], ["+∞", "2,16", "3,68"], "M"))}
            </div>
          ),
          micros: ["derivation_somme_produit_quotient", "derivation_optimisation", "derivation_variation", "derivation_defi"],
        },
        {
          titre: "La lampe au-dessus de la table",
          enonce:
            "Une lampe $L$ est suspendue à la hauteur $h$ (en m) au-dessus du centre $O$ d'une table ronde de rayon $1$ m. On admet que l'éclairement au bord $M$ de la table vaut $E = \\dfrac{10\\cos\\theta}{d^2}$, où $d = LM$ et $\\theta$ est l'angle entre la verticale $(LO)$ et $(LM)$.\na) Exprimer $d$ et $\\cos\\theta$ en fonction de $h$. En déduire que $E(h) = \\dfrac{10h}{(h^2 + 1)\\sqrt{h^2 + 1}}$.\nb) On note $w(h) = (h^2 + 1)\\sqrt{h^2 + 1}$. Montrer que $w'(h) = 3h\\sqrt{h^2 + 1}$.\nc) En déduire que $E'(h) = \\dfrac{10(1 - 2h^2)}{(h^2 + 1)^2\\sqrt{h^2 + 1}}$.\nd) À quelle hauteur faut-il suspendre la lampe pour éclairer le mieux le bord de la table ? Donner la valeur exacte de l'éclairement maximal.\ne) Un électricien la suspend à $1$ m. Quel pourcentage d'éclairement perd-on au bord ?",
          figure: lampe(1.2),
          correction:
            "a) Le triangle $LOM$ est rectangle en $O$ : $d = \\sqrt{h^2 + 1}$ (Pythagore), et $\\cos\\theta = \\dfrac{LO}{LM} = \\dfrac{h}{\\sqrt{h^2 + 1}}$.\nDonc $E = 10 \\times \\dfrac{h}{\\sqrt{h^2 + 1}} \\times \\dfrac{1}{h^2 + 1}$ : c'est la formule annoncée.\nb) $w$ est un produit. La dérivée de $\\sqrt{h^2 + 1}$ est $\\dfrac{2h}{2\\sqrt{h^2 + 1}} = \\dfrac{h}{\\sqrt{h^2 + 1}}$.\n$w'(h) = 2h\\sqrt{h^2 + 1}$ $+ (h^2 + 1) \\times \\dfrac{h}{\\sqrt{h^2 + 1}}$, soit $w'(h) = 2h\\sqrt{h^2 + 1} + h\\sqrt{h^2 + 1}$, donc $w'(h) = 3h\\sqrt{h^2 + 1}$.\nc) $E = \\dfrac{10h}{w}$, donc $E' = \\dfrac{10(w - hw')}{w^2}$.\n$w - hw' = (h^2 + 1)\\sqrt{h^2 + 1} - 3h^2\\sqrt{h^2 + 1}$, soit $w - hw' = (1 - 2h^2)\\sqrt{h^2 + 1}$.\nEt $w^2 = (h^2 + 1)^3$. On simplifie par $\\sqrt{h^2 + 1}$ : c'est la formule annoncée.\nd) $E'(h)$ a le signe de $1 - 2h^2$ : positif pour $h < \\dfrac{\\sqrt{2}}{2}$, négatif après. $E$ est maximal en $h = \\dfrac{\\sqrt{2}}{2} \\approx 0{,}71$ m.\nAlors $h^2 + 1 = \\dfrac{3}{2}$ et $\\sqrt{\\dfrac{3}{2}} = \\dfrac{\\sqrt{6}}{2}$ : $E = \\dfrac{5\\sqrt{2}}{\\frac{3\\sqrt{6}}{4}} = \\dfrac{20\\sqrt{2}}{3\\sqrt{6}}$.\nD'où $E_{\\max} = \\dfrac{20}{3\\sqrt{3}} = \\dfrac{20\\sqrt{3}}{9} \\approx 3{,}85$.\ne) $E(1) = \\dfrac{10}{2\\sqrt{2}} \\approx 3{,}54$. On perd $\\dfrac{3{,}85 - 3{,}54}{3{,}85}$, environ $8$ % de l'éclairement.\n⚠️ Trop basse, la lampe éclaire le bord en rasant ($\\cos\\theta$ petit) ; trop haute, elle est trop loin ($d$ grand). L'optimum est un compromis.\n⚠️ $(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$ : avec $u = h^2 + 1$, le $2$ de $u' = 2h$ se simplifie.\n⭐ Sur le dessin de la correction : la courbe de $E$ monte vite, culmine au point rouge $(0{,}71 ; 3{,}85)$, puis redescend lentement.",
          schema: ecranSeulement(
            repere([-1, 5, -1, 5], [{ pts: echantillon((h) => (10 * h) / ((h * h + 1) * Math.sqrt(h * h + 1)), 0, 5) }], [{ x: 0.71, y: 3.85, label: "" }]),
          ),
          micros: ["derivation_composee", "derivation_optimisation", "derivation_defi"],
        },
        {
          titre: "Le pic d'audience d'une vidéo",
          enonce:
            "Après sa mise en ligne, une vidéo reçoit $f_k(t) = 10t\\mathrm{e}^{-kt}$ milliers de vues par jour, où $t \\geqslant 0$ est le temps en jours, et $k > 0$ un réel qui dit à quelle vitesse l'intérêt retombe.\na) Montrer que $f_k'(t) = 10(1 - kt)\\mathrm{e}^{-kt}$. En déduire que $f_k$ atteint un maximum, dont on donnera la date et la valeur.\nb) Montrer que, quel que soit $k$, le sommet de la courbe est sur la droite $\\Delta$ d'équation $y = \\dfrac{10}{\\mathrm{e}}x$.\nc) Montrer que toutes les courbes ont la même tangente à l'origine.\nd) Donner la date et la hauteur du pic pour $k = 0{,}5$, pour $k = 1$ et pour $k = 2$. Que constate-t-on ?",
          correction:
            "a) Produit, avec $(\\mathrm{e}^{-kt})' = -k\\mathrm{e}^{-kt}$ : $f_k'(t) = 10\\mathrm{e}^{-kt} - 10kt\\mathrm{e}^{-kt}$, soit $f_k'(t) = 10(1 - kt)\\mathrm{e}^{-kt}$.\nComme $k > 0$ : $1 - kt > 0$ pour $t < \\dfrac{1}{k}$, et $1 - kt < 0$ ensuite. $f_k$ croît, puis décroît.\nLe maximum est atteint au jour $\\dfrac{1}{k}$ ; il vaut $f_k\\left(\\dfrac{1}{k}\\right) = \\dfrac{10}{k}\\mathrm{e}^{-1} = \\dfrac{10}{k\\mathrm{e}}$.\nb) Le sommet est $S_k\\left(\\dfrac{1}{k} ; \\dfrac{10}{k\\mathrm{e}}\\right)$. Avec $x = \\dfrac{1}{k}$ : $y = \\dfrac{10}{\\mathrm{e}} \\times \\dfrac{1}{k} = \\dfrac{10}{\\mathrm{e}}x$. Donc $S_k$ est sur $\\Delta$.\nc) $f_k(0) = 0$ et $f_k'(0) = 10$ pour tout $k$ : la tangente à l'origine est toujours $y = 10t$.\nd) $k = 0{,}5$ : pic au jour $2$, $\\dfrac{20}{\\mathrm{e}} \\approx 7{,}36$ milliers de vues.\n$k = 1$ : pic au jour $1$, $\\dfrac{10}{\\mathrm{e}} \\approx 3{,}68$ milliers. $k = 2$ : pic au bout d'une demi-journée, $\\dfrac{5}{\\mathrm{e}} \\approx 1{,}84$ millier.\nToutes les vidéos démarrent au même rythme. Plus l'intérêt retombe lentement, plus le pic est tardif ET haut : deux fois plus tard, deux fois plus haut.\n⚠️ Ici, la variable est $t$ et $k$ est un paramètre fixé : on dérive par rapport à $t$, et $k$ se comporte comme un nombre.\n⭐ Sur le dessin : les trois courbes ($k = 0{,}5$ en bleu, $k = 1$ en orange, $k = 2$ en vert) ont leurs sommets rouges alignés sur la droite grise $\\Delta$.",
          schema: repere(
            [-1, 9, -1, 9],
            [
              { pts: echantillon((t) => 10 * t * Math.exp(-0.5 * t), 0, 9) },
              { pts: echantillon((t) => 10 * t * Math.exp(-t), 0, 9), couleur: ORANGE },
              { pts: echantillon((t) => 10 * t * Math.exp(-2 * t), 0, 9), couleur: VERT },
              { q: [0, 3.679, 0], couleur: GRIS },
            ],
            [{ x: 2, y: 7.36, label: "" }, { x: 1, y: 3.68, label: "" }, { x: 0.5, y: 1.84, label: "" }],
          ),
          micros: ["derivation_defi", "derivation_optimisation", "derivation_composee", "derivation_tangente"],
        },
      ],
    },
  ],
};
