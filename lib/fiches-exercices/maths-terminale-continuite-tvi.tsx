// ─── Fiche d'exercices : continuité et théorème des valeurs intermédiaires ────
//                     (terminale spé) — 20 exercices corrigés
//
// Écrite le 29/09/2026 sur l'étalon `maths-terminale-limite-suite.tsx`.
// Alignée sur `lib/tutor-v4/questionBank/terminale-spe/maths/continuite-tvi.bank.ts`.
//
// ⭐⭐ LE FIL : UNE SOLUTION SE VOIT. Chaque corrigé montre la courbe qui
// traverse une droite horizontale, ou le tableau de variations découpé en
// morceaux où la fonction est strictement monotone. Les encadrements se lisent
// dans un tableau de valeurs, une trace de dichotomie ou un programme Python.
//
// ⛔ Aucune dérivée seconde, aucune convexité (autre notion du coach).
//
// Micro-compétences : continuite_reconnaitre (1, 2, 8, 10, 20),
// tvi_appliquer (1, 3, 6, 7, 11, 13, 14, 16, 17), tvi_unicite (4, 5, 9, 12,
// 13, 15, 17, 18, 19), tvi_rediger (5, 9, 12, 14, 15, 16, 18, 19, 20),
// tvi_defi (17, 18, 19, 20). 5/5.
//
// Faits cités : aucun fait réel. Le médicament, le placement, les bactéries,
// le marché, la cuve, le randonneur et le parachutiste sont des MODÈLES. Le
// volume d'une calotte sphérique (exercice 18) est une formule de géométrie.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, programme, repere, tableau, tableauVariations, trace } from "@/lib/fiches-exercices/figures";

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

/** Coupe d'une cuve sphérique de rayon 2 m, remplie jusqu'à la hauteur h (en m).
 *  40 px par mètre : le fond est en y = 180, le haut en y = 20. */
const cuve = (h: number) => {
  const r = 80;
  const [cx, cy] = [110, 100];
  const bas = cy + r;
  const niveau = bas - h * 40;
  const demiCorde = Math.sqrt(r * r - (niveau - cy) ** 2);
  return (
    <div className="mx-auto w-full max-w-[17rem] print:max-w-[12rem]">
      <svg viewBox="0 0 260 200" className="block h-auto w-full" role="img" aria-label="Coupe de la cuve sphérique">
        <defs>
          <clipPath id="cuve-eau">
            <circle cx={cx} cy={cy} r={r} />
          </clipPath>
        </defs>
        <rect x={cx - r} y={niveau} width={2 * r} height={bas - niveau} fill="#93c5fd" clipPath="url(#cuve-eau)" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#0f172a" strokeWidth="2.5" />
        <line x1={cx - demiCorde} y1={niveau} x2={cx + demiCorde} y2={niveau} stroke="#2563eb" strokeWidth="2.5" />
        <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="#475569" strokeWidth="1.5" strokeDasharray="5 4" />
        <circle cx={cx} cy={cy} r="3" fill="#475569" />
        <text x={cx + r / 2} y={cy - 7} textAnchor="middle" fontSize="13" fontWeight="700" fill="#475569">2 m</text>
        <line x1="218" y1={bas} x2="218" y2={niveau} stroke="#ea580c" strokeWidth="2" />
        <line x1="211" y1={bas} x2="225" y2={bas} stroke="#ea580c" strokeWidth="2" />
        <line x1="211" y1={niveau} x2="225" y2={niveau} stroke="#ea580c" strokeWidth="2" />
        <line x1={cx} y1={bas} x2="211" y2={bas} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
        <line x1={cx + demiCorde} y1={niveau} x2="211" y2={niveau} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
        <text x="232" y={(bas + niveau) / 2 + 5} fontSize="14" fontWeight="800" fontStyle="italic" fill="#ea580c">h</text>
      </svg>
    </div>
  );
};

export const exercicesContinuiteTviTerminale: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "terminale-spe",
  notion: "continuite-tvi",
  titre: "Continuité et valeurs intermédiaires",
  accroche:
    "Vingt exercices, de la courbe qu'on trace sans lever le crayon au problème de bac, avec un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, et elle montre la courbe qui traverse la droite, le tableau découpé en morceaux, l'encadrement qui se resserre.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=terminale-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "$f$ est continue en $a$ si $\\lim_{x \\to a} f(x) = f(a)$ : sa courbe se trace sans lever le crayon. Les polynômes, l'exponentielle, la racine carrée, l'inverse, le sinus et le cosinus sont continus là où ils sont définis ; leurs sommes, produits, quotients et composées aussi. Une fonction dérivable est continue.",
        "Théorème des valeurs intermédiaires (TVI) : si $f$ est continue sur $[a ; b]$, tout réel $k$ compris entre $f(a)$ et $f(b)$ est atteint. L'équation $f(x) = k$ a AU MOINS une solution dans $[a ; b]$.",
        "Corollaire (théorème de la bijection) : si, de plus, $f$ est strictement monotone sur $[a ; b]$, cette solution est UNIQUE.",
        "Dichotomie : on coupe l'intervalle en deux, et on garde la moitié où $f$ change de signe. Balayage : on avance d'un pas fixe jusqu'au changement de signe.",
      ],
      exercices: [
        {
          enonce:
            "La fonction partie entière $E$ associe à tout réel $x$ le plus grand entier inférieur ou égal à $x$ : $E(2{,}7) = 2$ et $E(-0{,}5) = -1$. Sa courbe est tracée sur $[-1 ; 4[$.\na) Quand $x$ tend vers $2$, quelle est la limite de $E(x)$ par valeurs inférieures ? Par valeurs supérieures ?\nb) $E$ est-elle continue en $2$ ? Sur $[0 ; 1[$ ? Sur $[0 ; 3]$ ?\nc) On a $E(0) = 0$ et $E(3) = 3$. L'équation $E(x) = 1{,}5$ a-t-elle une solution dans $[0 ; 3]$ ?",
          figure: repere(
            [-2, 5, -2, 5],
            [{ pts: [[-1, -1], [0, -1]] }, { pts: [[0, 0], [1, 0]] }, { pts: [[1, 1], [2, 1]] }, { pts: [[2, 2], [3, 2]] }, { pts: [[3, 3], [4, 3]] }],
            [{ x: -1, y: -1, label: "" }, { x: 0, y: 0, label: "" }, { x: 1, y: 1, label: "" }, { x: 2, y: 2, label: "" }, { x: 3, y: 3, label: "" }],
            1.5,
          ),
          correction:
            "a) Juste avant $2$, pour $x \\in [1 ; 2[$, on a $E(x) = 1$ : la limite à gauche vaut $1$.\nJuste après $2$, pour $x \\in [2 ; 3[$, on a $E(x) = 2$ : la limite à droite vaut $2$.\nb) Les deux limites sont différentes : la courbe fait un saut en $2$. $E$ n'est pas continue en $2$.\nSur $[0 ; 1[$, $E(x) = 0$ : $E$ est constante, donc continue.\nSur $[0 ; 3]$, il y a des sauts en $1$, $2$ et $3$ : $E$ n'est pas continue sur cet intervalle.\nc) $E$ ne prend que des valeurs entières : $1{,}5$ n'est jamais atteint. L'équation n'a pas de solution.\n⚠️ Ce n'est pas une contradiction avec le TVI : sa première hypothèse, la continuité, manque. Sans elle, le théorème ne dit rien.\n⭐ Sur le dessin : la droite $y = 1{,}5$ passe entre deux marches sans toucher la courbe. Chaque point rouge est la valeur de $E$ en un entier, au bord gauche de sa marche.",
          micros: ["continuite_reconnaitre", "tvi_appliquer"],
        },
        {
          enonce:
            "Chaque fonction est-elle continue sur l'intervalle indiqué ? Justifier.\na) $f(x) = x^3 - 2x + 1$ sur $\\mathbb{R}$\nb) $g(x) = x\\mathrm{e}^{x}$ sur $\\mathbb{R}$\nc) $h(x) = \\sqrt{x - 1}$ sur $[1 ; +\\infty[$\nd) $k(x) = \\dfrac{1}{x - 3}$ sur $[0 ; 5]$",
          correction:
            "a) $f$ est un polynôme : elle est continue sur $\\mathbb{R}$.\nb) $g$ est le produit de $x \\mapsto x$ et de l'exponentielle, toutes deux continues sur $\\mathbb{R}$ : $g$ est continue sur $\\mathbb{R}$.\nc) Pour $x \\geqslant 1$, $x - 1 \\geqslant 0$. $h$ est la composée de $x \\mapsto x - 1$, continue, et de la racine carrée, continue sur $[0 ; +\\infty[$ : $h$ est continue sur $[1 ; +\\infty[$.\nd) $k$ n'est pas définie en $3$, qui est dans $[0 ; 5]$ : elle n'est pas continue sur $[0 ; 5]$. Elle l'est sur $[0 ; 3[$ et sur $]3 ; 5]$.\n⚠️ « Dérivable » entraîne « continue », mais pas l'inverse : la racine carrée est continue en $0$ sans y être dérivable.\n⭐ Sur le dessin : la courbe de $k$ est coupée en deux morceaux de part et d'autre de $x = 3$. On ne peut pas la tracer sans lever le crayon.",
          schema: ecranSeulement(
            repere([-1, 6, -4, 4], [{ pts: echantillon((x) => 1 / (x - 3), 0, 2.75, -4, 4) }, { pts: echantillon((x) => 1 / (x - 3), 3.25, 5, -4, 4) }]),
          ),
          micros: ["continuite_reconnaitre"],
        },
        {
          enonce:
            "Soit $f$ une fonction continue sur $[1 ; 3]$, avec $f(1) = -2$ et $f(3) = 4$.\na) L'équation $f(x) = 0$ a-t-elle au moins une solution dans $[1 ; 3]$ ?\nb) Et l'équation $f(x) = 3$ ?\nc) Et l'équation $f(x) = 5$ ?",
          correction:
            "a) $f$ est continue sur $[1 ; 3]$, et $0$ est compris entre $f(1) = -2$ et $f(3) = 4$.\nD'après le TVI, l'équation $f(x) = 0$ a au moins une solution dans $[1 ; 3]$.\nb) $3$ est aussi compris entre $-2$ et $4$ : au moins une solution.\nc) $5$ n'est pas compris entre $-2$ et $4$ : le TVI ne permet pas de conclure.\n⚠️ « On ne peut pas conclure » ne veut pas dire « pas de solution ». Entre $1$ et $3$, $f$ peut très bien monter au-dessus de $5$, puis redescendre.\n⭐ Sur le dessin : deux fonctions possibles, avec $f(1) = -2$ et $f(3) = 4$. Les deux coupent la droite $y = 3$. La bleue ne coupe jamais $y = 5$, l'orange la coupe deux fois.",
          schema: ecranSeulement(
            repere(
              [-1, 4, -3, 7],
              [{ pts: echantillon((x) => x * x - x - 2, 1, 3) }, { pts: echantillon((x) => -5 * x * x + 23 * x - 20, 1, 3), couleur: ORANGE }],
              [{ x: 1, y: -2, label: "" }, { x: 3, y: 4, label: "" }],
              [3, 5],
            ),
          ),
          micros: ["tvi_appliquer"],
        },
        {
          enonce:
            "Voici le tableau de variations d'une fonction $f$ continue sur $[-2 ; 4]$. Combien de solutions chaque équation a-t-elle dans $[-2 ; 4]$ ?\na) $f(x) = 0$\nb) $f(x) = 3$\nc) $f(x) = -4$",
          figure: tableauVariations(["−2", "1", "4"], ["5", "−3", "2"]),
          correction:
            "On découpe $[-2 ; 4]$ en deux morceaux où $f$ est strictement monotone.\na) Sur $[-2 ; 1]$, $f$ est continue, strictement décroissante, de $5$ à $-3$. Comme $0$ est entre $-3$ et $5$, le corollaire donne UNE solution.\nSur $[1 ; 4]$, $f$ est continue, strictement croissante, de $-3$ à $2$. $0$ est entre $-3$ et $2$ : encore UNE solution.\nAu total : deux solutions.\nb) Sur $[-2 ; 1]$ : $3$ est entre $-3$ et $5$, une solution. Sur $[1 ; 4]$ : $f(x) \\leqslant 2 < 3$, aucune.\nAu total : une solution.\nc) Le minimum de $f$ est $-3$, et $-4 < -3$ : aucune solution.\n⚠️ On applique le corollaire sur CHAQUE morceau, jamais sur $[-2 ; 4]$ en entier : $f$ n'y est pas monotone.\n⭐ Dans le tableau : $0$ se trouve sous les deux flèches, $3$ sous la première seulement, et $-4$ sous aucune.",
          micros: ["tvi_unicite"],
        },
        {
          enonce: "Montrer que l'équation $x^3 + x - 1 = 0$ admet une unique solution $\\alpha$ dans $[0 ; 1]$. Rédiger comme au bac.",
          correction:
            "On pose $f(x) = x^3 + x - 1$.\nContinuité : $f$ est un polynôme, donc elle est continue sur $[0 ; 1]$.\nMonotonie : $f'(x) = 3x^2 + 1 > 0$, donc $f$ est strictement croissante sur $[0 ; 1]$.\nValeurs aux bornes : $f(0) = -1 < 0$ et $f(1) = 1 > 0$. Donc $0$ est compris entre $f(0)$ et $f(1)$.\nConclusion : d'après le corollaire du théorème des valeurs intermédiaires, l'équation $f(x) = 0$ admet une unique solution $\\alpha$ dans $[0 ; 1]$.\n⚠️ Au bac, les trois hypothèses doivent être ÉCRITES : continue, strictement monotone, $0$ entre les valeurs aux bornes. Un « d'après le TVI » seul ne rapporte pas tous les points.\n⭐ Sur le dessin : la courbe monte sans cesse, et traverse l'axe des abscisses une seule fois, en $\\alpha \\approx 0{,}68$.",
          schema: repere([-1, 2, -2, 2], [{ p: [1, 0, 1, -1] }], [{ x: 0.68, y: 0, label: "" }]),
          micros: ["tvi_rediger", "tvi_unicite"],
        },
        {
          enonce:
            "On admet que l'équation $x^3 - 3x + 1 = 0$ a une unique solution $\\alpha$ dans $[0 ; 1]$. On note $f(x) = x^3 - 3x + 1$ ; le tableau donne quelques valeurs de $f$, arrondies au millième.\na) Encadrer $\\alpha$ entre deux nombres qui diffèrent de $0{,}1$.\nb) Puis entre deux nombres qui diffèrent de $0{,}01$.",
          figure: tableau(["x", "0,3", "0,34", "0,35", "0,4"], ["f(x)", "0,127", "0,019", "−0,007", "−0,136"]),
          correction:
            "a) $f(0{,}3) > 0$ et $f(0{,}4) < 0$ : $f$ change de signe entre $0{,}3$ et $0{,}4$.\nComme $f$ est continue, elle s'annule entre les deux. La solution étant unique, c'est $\\alpha$ : $0{,}3 < \\alpha < 0{,}4$.\nb) $f(0{,}34) > 0$ et $f(0{,}35) < 0$ : $0{,}34 < \\alpha < 0{,}35$.\n⚠️ Ici $f$ est décroissante sur $[0 ; 1]$ : elle passe du positif au négatif. On cherche le CHANGEMENT de signe, dans un sens ou dans l'autre.\n⭐ Dans le tableau : le signe bascule entre la colonne $0{,}34$ et la colonne $0{,}35$. C'est là que se cache $\\alpha$.",
          micros: ["tvi_appliquer"],
        },
        {
          enonce:
            "On cherche une valeur approchée de $\\sqrt{2}$, la solution positive de $x^2 - 2 = 0$, par dichotomie sur $[1 ; 2]$. On note $f(x) = x^2 - 2$. Faire trois étapes, et donner l'encadrement obtenu.",
          correction:
            "Au départ : $f(1) = -1 < 0$ et $f(2) = 2 > 0$.\nÉtape 1 : le milieu est $m = 1{,}5$, et $f(1{,}5) = 0{,}25 > 0$. Le changement de signe est entre $1$ et $1{,}5$ : on garde $[1 ; 1{,}5]$.\nÉtape 2 : $m = 1{,}25$, et $f(1{,}25) = -0{,}4375 < 0$. On garde $[1{,}25 ; 1{,}5]$.\nÉtape 3 : $m = 1{,}375$, et $f(1{,}375) = -0{,}109375 < 0$. On garde $[1{,}375 ; 1{,}5]$.\nDonc $1{,}375 < \\sqrt{2} < 1{,}5$ : un encadrement d'amplitude $0{,}125$, soit $\\dfrac{1}{2^3}$.\n⚠️ On garde la moitié où $f$ CHANGE de signe, pas la moitié où $f$ est positive.\n⭐ Dans la trace : à chaque ligne, l'intervalle est deux fois plus court. $\\sqrt{2} \\approx 1{,}414$ y reste toujours.",
          schema: ecranSeulement(
            trace(
              ["étape", "a", "b", "m", "f(m)"],
              [
                ["1", "1", "2", "1,5", "0,25"],
                ["2", "1", "1,5", "1,25", "−0,4375"],
                ["3", "1,25", "1,5", "1,375", "−0,109"],
                ["fin", "1,375", "1,5", "", ""],
              ],
            ),
          ),
          micros: ["tvi_appliquer"],
        },
        {
          enonce:
            "Soit $f$ définie sur $\\mathbb{R}$ par $f(x) = \\dfrac{x^2 - 1}{x - 1}$ si $x \\neq 1$, et $f(1) = a$, où $a$ est un réel.\na) Simplifier $f(x)$ pour $x \\neq 1$.\nb) Quelle valeur faut-il donner à $a$ pour que $f$ soit continue en $1$ ?",
          correction:
            "a) $x^2 - 1 = (x - 1)(x + 1)$. Pour $x \\neq 1$, on simplifie par $x - 1$ : $f(x) = x + 1$.\nb) Quand $x$ tend vers $1$, $f(x) = x + 1$ tend vers $2$.\n$f$ est continue en $1$ si $f(1) = \\lim_{x \\to 1} f(x)$, c'est-à-dire si $a = 2$.\n⚠️ La simplification par $x - 1$ n'est permise que pour $x \\neq 1$ : c'est pour cela que $f(1)$ doit être défini à part.\n⭐ Sur le dessin : la droite $y = x + 1$ a un « trou » en $x = 1$. Le point rouge $(1 ; 2)$ le bouche : c'est le seul choix qui rend la courbe d'un seul tenant.",
          schema: ecranSeulement(repere([-2, 3, -1, 4], [{ q: [0, 1, 1] }], [{ x: 1, y: 2, label: "" }])),
          micros: ["continuite_reconnaitre"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un devoir. On rédige.",
      rappel: [
        "Corollaire sur un intervalle ouvert ou infini : on remplace $f(a)$ et $f(b)$ par les LIMITES aux bornes. Si $f$ est continue et strictement croissante sur $\\mathbb{R}$, de $-\\infty$ à $+\\infty$, alors $f(x) = k$ a une unique solution pour tout réel $k$.",
        "Un tableau de variations se découpe en morceaux où $f$ est strictement monotone : on applique le corollaire sur CHAQUE morceau, puis on additionne.",
        "Pour résoudre $f(x) = g(x)$, on étudie la différence $h = f - g$, et on cherche où elle s'annule.",
        "Une boucle de dichotomie divise la longueur de l'intervalle par $2$ à chaque passage : après $n$ passages, il reste $\\dfrac{b - a}{2^n}$.",
      ],
      exercices: [
        {
          enonce:
            "Soit $f(x) = \\mathrm{e}^{x} + x$, définie sur $\\mathbb{R}$.\na) Étudier les variations de $f$, puis ses limites en $-\\infty$ et en $+\\infty$.\nb) Montrer que l'équation $\\mathrm{e}^{x} = -x$ admet une unique solution $\\alpha$ dans $\\mathbb{R}$.\nc) Encadrer $\\alpha$ entre deux nombres qui diffèrent de $0{,}01$.",
          correction:
            "a) $f'(x) = \\mathrm{e}^{x} + 1 > 0$ : $f$ est strictement croissante sur $\\mathbb{R}$.\nEn $-\\infty$ : $\\mathrm{e}^{x} \\to 0$ et $x \\to -\\infty$, donc $\\lim f = -\\infty$.\nEn $+\\infty$ : les deux termes tendent vers $+\\infty$, donc $\\lim f = +\\infty$.\nb) $\\mathrm{e}^{x} = -x$ équivaut à $f(x) = 0$.\n$f$ est dérivable donc continue sur $\\mathbb{R}$, strictement croissante, et $0$ est compris entre $-\\infty$ et $+\\infty$.\nD'après le corollaire du TVI, l'équation $f(x) = 0$ admet une unique solution $\\alpha$ dans $\\mathbb{R}$.\nc) À la calculatrice : $f(-0{,}57) \\approx -0{,}0045 < 0$ et $f(-0{,}56) \\approx 0{,}0112 > 0$.\nDonc $-0{,}57 < \\alpha < -0{,}56$.\n⚠️ Sur $\\mathbb{R}$, il n'y a pas de bornes $a$ et $b$ où calculer $f$ : ce sont les LIMITES qui encadrent $0$.\n⚠️ On ne sait pas résoudre $\\mathrm{e}^{x} = -x$ par le calcul : le théorème donne l'existence, la calculatrice donne un encadrement.\n⭐ Dans le tableau : une seule flèche, de $-\\infty$ à $+\\infty$. Elle passe forcément une fois, et une seule, par $0$.",
          schema: ecranSeulement(tabVar(["−∞", "+∞"], ["+"], ["−∞", "+∞"])),
          micros: ["tvi_unicite", "tvi_rediger"],
        },
        {
          enonce:
            "Le profil d'un toboggan est modélisé, en mètres, par $h(x) = 3 - 0{,}5x^2$ pour $0 \\leqslant x \\leqslant 2$, et par $h(x) = a(x - 4)^2$ pour $2 < x \\leqslant 4$, où $a$ est un réel.\na) Déterminer $a$ pour que $h$ soit continue en $2$ : le toboggan ne doit pas avoir de marche.\nb) Avec cette valeur, comparer la pente juste avant $2$ et juste après $2$. Le raccord se fait-il sans coude ?",
          correction:
            "a) À gauche : $h(2) = 3 - 0{,}5 \\times 4 = 1$.\nÀ droite : quand $x$ tend vers $2$, $a(x - 4)^2$ tend vers $a \\times (-2)^2 = 4a$.\n$h$ est continue en $2$ si $4a = 1$, soit $a = 0{,}25$.\nb) Avant $2$ : la dérivée de $3 - 0{,}5x^2$ est $-x$, qui vaut $-2$ en $2$.\nAprès $2$ : la dérivée de $0{,}25(x - 4)^2$ est $0{,}5(x - 4)$, qui vaut $-1$ en $2$.\nLes deux pentes sont différentes : le toboggan n'a pas de marche, mais il a un coude en $2$. $h$ est continue en $2$ sans y être dérivable.\n⚠️ Continue ne veut pas dire dérivable : pas de saut ne veut pas dire pas d'angle.\n⭐ Sur le dessin : les deux morceaux se rejoignent au point rouge $(2 ; 1)$, mais la pente passe brusquement de $-2$ à $-1$.",
          schema: repere(
            [-1, 5, -1, 4],
            [{ pts: echantillon((x) => 3 - 0.5 * x * x, 0, 2) }, { pts: echantillon((x) => 0.25 * (x - 4) ** 2, 2, 4), couleur: ORANGE }],
            [{ x: 2, y: 1, label: "" }],
          ),
          micros: ["continuite_reconnaitre"],
        },
        {
          enonce:
            "On reprend $f(x) = x^3 + x - 1$, qui s'annule une seule fois sur $[0 ; 1]$, en $\\alpha$ (exercice 5). On utilise la fonction Python ci-dessous.\na) Que teste la ligne du if ? Pourquoi garde-t-on alors l'intervalle $[a ; m]$ ?\nb) Faire tourner dicho(0, 1, 0.1) à la main. Que renvoie-t-elle ?\nc) Combien de passages dans la boucle faut-il pour obtenir un intervalle de longueur inférieure à $0{,}001$ ?",
          figure: programme([
            "def f(x):",
            "    return x**3 + x - 1",
            "",
            "def dicho(a, b, e):",
            "    while b - a > e:",
            "        m = (a + b) / 2",
            "        if f(a) * f(m) <= 0:",
            "            b = m",
            "        else:",
            "            a = m",
            "    return a, b",
          ]),
          correction:
            "a) $f(a) \\times f(m) \\leqslant 0$ veut dire que $f(a)$ et $f(m)$ sont de signes contraires (ou que l'un est nul).\nD'après le TVI, $f$ s'annule alors entre $a$ et $m$ : on garde $[a ; m]$ en posant b = m. Sinon, le changement de signe est dans $[m ; b]$, et on pose a = m.\nb) Passage 1 : $m = 0{,}5$, $f(0{,}5) = -0{,}375$, même signe que $f(0) = -1$ : a = 0.5.\nPassage 2 : $m = 0{,}75$, $f(0{,}75) \\approx 0{,}172 > 0$ : b = 0.75.\nPassage 3 : $m = 0{,}625$, $f(0{,}625) \\approx -0{,}131 < 0$ : a = 0.625.\nPassage 4 : $m = 0{,}6875$, $f(0{,}6875) \\approx 0{,}012 > 0$ : b = 0.6875.\nLa longueur vaut $0{,}0625 \\leqslant 0{,}1$ : la boucle s'arrête. La fonction renvoie (0.625, 0.6875), donc $0{,}625 < \\alpha < 0{,}6875$.\nc) Après $n$ passages, la longueur vaut $\\dfrac{1}{2^n}$. Or $2^9 = 512$ et $2^{10} = 1024$ : il faut $10$ passages.\n⚠️ Python écrit les décimaux avec un point : 0.625, et non 0,625.\n⭐ Dans la trace : $\\alpha \\approx 0{,}6823$ reste dans l'intervalle à chaque ligne, qui rétrécit de moitié.",
          schema: ecranSeulement(
            trace(
              ["passage", "a", "b", "m", "f(m)"],
              [
                ["1", "0", "1", "0,5", "−0,375"],
                ["2", "0,5", "1", "0,75", "0,172"],
                ["3", "0,5", "0,75", "0,625", "−0,131"],
                ["4", "0,625", "0,75", "0,6875", "0,012"],
                ["fin", "0,625", "0,6875", "", ""],
              ],
            ),
          ),
          micros: ["tvi_appliquer"],
        },
        {
          enonce:
            "Après une injection, la concentration d'un médicament dans le sang est modélisée par $C(t) = 20t\\mathrm{e}^{-t}$, en mg/L, où $t$ est le temps en heures, $0 \\leqslant t \\leqslant 5$. Le médicament est efficace quand sa concentration dépasse $5$ mg/L.\na) Montrer que $C'(t) = 20(1 - t)\\mathrm{e}^{-t}$, puis dresser le tableau de variations de $C$.\nb) Montrer que l'équation $C(t) = 5$ a exactement deux solutions $t_1 < t_2$ dans $[0 ; 5]$.\nc) Encadrer $t_1$ et $t_2$ au centième. Pendant combien de temps, environ, le médicament est-il efficace ?",
          correction:
            "a) C'est un produit : $C'(t) = 20\\mathrm{e}^{-t} + 20t \\times (-\\mathrm{e}^{-t})$, soit $C'(t) = 20(1 - t)\\mathrm{e}^{-t}$.\nComme $\\mathrm{e}^{-t} > 0$, $C'(t)$ a le signe de $1 - t$ : $C$ croît sur $[0 ; 1]$ et décroît sur $[1 ; 5]$.\n$C(0) = 0$, $C(1) = 20\\mathrm{e}^{-1} \\approx 7{,}36$ et $C(5) = 100\\mathrm{e}^{-5} \\approx 0{,}67$.\nb) Sur $[0 ; 1]$, $C$ est continue et strictement croissante, et $5$ est entre $0$ et $7{,}36$ : une unique solution $t_1$.\nSur $[1 ; 5]$, $C$ est continue et strictement décroissante, et $5$ est entre $0{,}67$ et $7{,}36$ : une unique solution $t_2$.\nL'équation a donc exactement deux solutions.\nc) À la calculatrice : $C(0{,}35) \\approx 4{,}93$ et $C(0{,}36) \\approx 5{,}02$, donc $0{,}35 < t_1 < 0{,}36$.\n$C(2{,}15) \\approx 5{,}01$ et $C(2{,}16) \\approx 4{,}98$, donc $2{,}15 < t_2 < 2{,}16$.\nLe médicament est efficace pendant $t_2 - t_1$, entre $1{,}79$ h et $1{,}81$ h : environ $1$ h $48$ min.\n⚠️ Sur $[0 ; 5]$ entier, $C$ n'est pas monotone : le corollaire s'applique morceau par morceau, de part et d'autre du maximum.\n⭐ Sur le dessin : la droite $y = 5$ coupe la courbe deux fois, une fois à la montée, une fois à la descente. Entre les deux, le médicament agit.",
          schema: (
            <div className="grid grid-cols-1 min-w-0 gap-2">
              {repere([-1, 6, -1, 8], [{ pts: echantillon((t) => 20 * t * Math.exp(-t), 0, 5) }], [{ x: 1, y: 7.36, label: "" }], 5)}
              {ecranSeulement(tabVar(["0", "1", "5"], ["+", "-"], ["0", "7,36", "0,67"], "C", "t"))}
            </div>
          ),
          micros: ["tvi_unicite", "tvi_rediger"],
        },
        {
          enonce:
            "Soit $f(x) = x^3 - 3x$, étudiée sur $[-2 ; 2{,}5]$. On donne son tableau de variations.\na) Vérifier les variations et les valeurs du tableau à l'aide de $f'$.\nb) Selon les valeurs du réel $k$, combien l'équation $f(x) = k$ a-t-elle de solutions dans $[-2 ; 2{,}5]$ ?",
          figure: tableauVariations(["−2", "−1", "1", "2,5"], ["−2", "2", "−2", "8,125"]),
          correction:
            "a) $f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$ : positive sur $[-2 ; -1]$, négative sur $[-1 ; 1]$, positive sur $[1 ; 2{,}5]$.\n$f(-2) = -8 + 6 = -2$, $f(-1) = 2$, $f(1) = -2$ et $f(2{,}5) = 15{,}625 - 7{,}5 = 8{,}125$.\nb) On applique le corollaire sur chacun des trois morceaux, puis on compte.\nSi $k < -2$ : aucune solution.\nSi $k = -2$ : deux solutions, $x = -2$ et $x = 1$.\nSi $-2 < k < 2$ : trois solutions, une par morceau.\nSi $k = 2$ : deux solutions, $x = -1$ et $x = 2$, car $f(2) = 8 - 6 = 2$.\nSi $2 < k \\leqslant 8{,}125$ : une solution, sur $[1 ; 2{,}5]$.\nSi $k > 8{,}125$ : aucune solution.\n⚠️ Les valeurs frontières $k = -2$ et $k = 2$ se traitent à part : une solution peut être une borne commune à deux morceaux, et ne compte qu'une fois.\n⭐ Sur le dessin : on fait monter une droite horizontale $y = k$. À $y = 1$, elle coupe la courbe trois fois ; à $y = 5$, une seule.",
          schema: ecranSeulement(repere([-3, 3, -3, 9], [{ pts: echantillon((x) => x ** 3 - 3 * x, -2, 2.5) }], [], [1, 5], true)),
          micros: ["tvi_unicite", "tvi_appliquer"],
        },
        {
          enonce:
            "Léa verse $100$ € au début de chaque année, pendant trois ans, sur un placement à taux annuel fixe $t$. À la fin de la troisième année, elle récupère $330$ €. On pose $x = 1 + t$.\na) Expliquer pourquoi $100x^3 + 100x^2 + 100x = 330$.\nb) On pose $f(x) = x^3 + x^2 + x - 3{,}3$. Montrer que l'équation $f(x) = 0$ a une unique solution dans $[1 ; 1{,}1]$.\nc) À l'aide du tableau de valeurs arrondies, encadrer le taux $t$.",
          figure: tableau(["x", "1", "1,04", "1,05", "1,1"], ["f(x)", "−0,3", "−0,054", "0,010", "0,341"]),
          correction:
            "a) Placés à un taux $t$, $100$ € deviennent $100x$ au bout d'un an. Le premier versement est placé trois ans : il devient $100x^3$.\nLe deuxième est placé deux ans : $100x^2$. Le troisième, un an : $100x$. La somme vaut $330$.\nb) $f$ est un polynôme, donc continue sur $[1 ; 1{,}1]$.\n$f'(x) = 3x^2 + 2x + 1$, positive pour $x \\geqslant 1$ : $f$ est strictement croissante sur $[1 ; 1{,}1]$.\n$f(1) = -0{,}3 < 0$ et $f(1{,}1) = 0{,}341 > 0$.\nD'après le corollaire du TVI, l'équation $f(x) = 0$ a une unique solution dans $[1 ; 1{,}1]$.\nc) $f(1{,}04) < 0 < f(1{,}05)$, donc $1{,}04 < x < 1{,}05$.\nComme $t = x - 1$, le taux est compris entre $4$ % et $5$ %.\n⚠️ Le taux est $t = x - 1$, pas $x$ : un taux de $1{,}04$ voudrait dire $104$ %.\n⭐ Dans le tableau : le signe bascule entre $1{,}04$ et $1{,}05$. En affinant à la calculatrice, $x \\approx 1{,}0484$ : un taux d'environ $4{,}8$ %.",
          micros: ["tvi_appliquer", "tvi_rediger"],
        },
        {
          enonce:
            "Dans un modèle, une population de bactéries compte $P(t) = 2\\mathrm{e}^{0{,}3t}$ milliers d'individus au bout de $t$ heures. Le milieu de culture, enrichi en continu, peut en nourrir $R(t) = 10 + 2t$ milliers. On pose $h(t) = P(t) - R(t)$ pour $t \\in [0 ; 15]$.\na) Montrer que $h(t) < 0$ pour tout $t \\in [0 ; 5]$.\nb) Montrer que $h$ est strictement croissante sur $[5 ; 15]$.\nc) En déduire qu'il existe un unique instant $T$ de $[0 ; 15]$ où la population rattrape les ressources, et l'encadrer au dixième.",
          correction:
            "a) Pour $t \\in [0 ; 5]$, l'exponentielle est croissante : $\\mathrm{e}^{0{,}3t} \\leqslant \\mathrm{e}^{1{,}5}$.\nDonc $P(t) \\leqslant 2\\mathrm{e}^{1{,}5} \\approx 8{,}96$, alors que $R(t) \\geqslant 10$. Ainsi $h(t) < 0$.\nb) $h'(t) = 0{,}6\\mathrm{e}^{0{,}3t} - 2$.\nPour $t \\geqslant 5$ : $\\mathrm{e}^{0{,}3t} \\geqslant \\mathrm{e}^{1{,}5} \\approx 4{,}48$, donc $h'(t) \\geqslant 0{,}6 \\times 4{,}48 - 2 \\approx 0{,}69 > 0$.\n$h$ est strictement croissante sur $[5 ; 15]$.\nc) Sur $[5 ; 15]$, $h$ est continue et strictement croissante, avec $h(5) \\approx -11{,}04 < 0$ et $h(15) \\approx 140{,}03 > 0$.\nLe corollaire donne un unique $T$ dans $[5 ; 15]$ tel que $h(T) = 0$. Et d'après a), il n'y en a aucun dans $[0 ; 5]$.\nÀ la calculatrice : $h(8{,}7) \\approx -0{,}20$ et $h(8{,}8) \\approx 0{,}43$, donc $8{,}7 < T < 8{,}8$.\nAu bout d'environ $8$ h $45$ min, la population dépasse ce que le milieu peut nourrir.\n⚠️ On ne peut pas appliquer le corollaire directement sur $[0 ; 15]$ : $h$ commence par décroître, car $h'(0) = -1{,}4$. D'où le découpage en deux morceaux.\n⭐ Dans le tableau : sur $[5 ; 15]$, une seule flèche montante, de $-11{,}04$ à $140{,}03$. Elle croise $0$ une seule fois.",
          schema: ecranSeulement(tabVar(["5", "15"], ["+"], ["−11,04", "140,03"], "h", "t")),
          micros: ["tvi_unicite", "tvi_rediger"],
        },
        {
          enonce:
            "a) Soit $f$ une fonction continue sur $[0 ; 1]$, dont toutes les valeurs sont dans $[0 ; 1]$. En étudiant $g(x) = f(x) - x$, montrer qu'il existe un réel $c$ de $[0 ; 1]$ tel que $f(c) = c$.\nb) Application : montrer que l'équation $\\cos x = x$ a une unique solution dans $[0 ; 1]$, et l'encadrer au centième.",
          correction:
            "a) $g$ est continue sur $[0 ; 1]$, comme différence de deux fonctions continues.\n$g(0) = f(0) \\geqslant 0$, car $f(0)$ est dans $[0 ; 1]$. Et $g(1) = f(1) - 1 \\leqslant 0$, car $f(1) \\leqslant 1$.\nDonc $0$ est compris entre $g(1)$ et $g(0)$. D'après le TVI, il existe $c \\in [0 ; 1]$ tel que $g(c) = 0$, c'est-à-dire $f(c) = c$.\nb) Le cosinus est continu et décroissant sur $[0 ; 1]$ : ses valeurs vont de $\\cos 1 \\approx 0{,}54$ à $1$. Elles sont dans $[0 ; 1]$.\nD'après a), l'équation $\\cos x = x$ a au moins une solution $c$ dans $[0 ; 1]$.\nUnicité : $g(x) = \\cos x - x$ a pour dérivée $-\\sin x - 1 < 0$ sur $[0 ; 1]$. $g$ est strictement décroissante : la solution est unique.\n$\\cos 0{,}73 \\approx 0{,}745 > 0{,}73$ et $\\cos 0{,}74 \\approx 0{,}738 < 0{,}74$ : $0{,}73 < c < 0{,}74$.\n⚠️ En a), $g(0)$ peut être nul : alors $c = 0$ convient. Le TVI accepte que $k$ soit égal à l'une des deux valeurs aux bornes.\n⭐ Sur le dessin : la courbe du cosinus coupe la droite orange $y = x$ en un seul point, rouge, vers $(0{,}74 ; 0{,}74)$.",
          schema: repere([-1, 2, -1, 2], [{ pts: echantillon(Math.cos, -1, 2) }, { q: [0, 1, 0], couleur: ORANGE }], [{ x: 0.74, y: 0.74, label: "" }]),
          micros: ["tvi_rediger", "tvi_appliquer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de bac, avec ses questions qui s'enchaînent. Une grandeur qui varie sans sauter finit par passer par toutes les valeurs.",
      rappel: [
        "Plan type : continuité, stricte monotonie (par le signe de la dérivée), valeurs ou limites aux bornes, puis le corollaire. On conclut par une phrase : « l'équation admet une unique solution $\\alpha$ dans … ».",
        "On encadre ensuite $\\alpha$ à la calculatrice, par balayage ou par dichotomie, et on interprète dans le contexte, avec l'unité.",
        "Une grandeur physique (une altitude, une distance, une température) varie de façon continue : c'est ce qui autorise le TVI.",
      ],
      exercices: [
        {
          titre: "Le prix d'équilibre",
          enonce:
            "Sur un marché, quand un produit coûte $p$ euros, avec $0 \\leqslant p \\leqslant 10$, les producteurs en proposent $O(p) = \\mathrm{e}^{0{,}2p} - 1$ milliers (l'offre), et les clients en demandent $D(p) = \\dfrac{10}{p + 1}$ milliers (la demande). Le prix d'équilibre est celui où l'offre égale la demande.\na) Étudier le sens de variation de $O$ et de $D$ sur $[0 ; 10]$.\nb) On pose $g(p) = O(p) - D(p)$. Montrer qu'il existe un unique prix d'équilibre $p_0$ dans $[0 ; 10]$.\nc) La fonction Python ci-dessous cherche $p_0$ par balayage. Qu'affiche-t-elle pour balayage(0.1) ? Pour balayage(0.01) ? Qu'en déduit-on ?\nd) Environ combien d'unités s'échangent au prix d'équilibre ?",
          figure: programme([
            "from math import exp",
            "",
            "def g(p):",
            "    O = exp(0.2 * p) - 1",
            "    D = 10 / (p + 1)",
            "    return O - D",
            "",
            "def balayage(pas):",
            "    p = 0",
            "    while g(p) < 0:",
            "        p = p + pas",
            "    return round(p, 2)",
          ]),
          correction:
            "a) $O'(p) = 0{,}2\\mathrm{e}^{0{,}2p} > 0$ : l'offre est croissante. $D'(p) = -\\dfrac{10}{(p + 1)^2} < 0$ : la demande est décroissante.\nb) $g'(p) = O'(p) - D'(p) > 0$ : $g$ est strictement croissante sur $[0 ; 10]$. Elle est continue, car $O$ et $D$ le sont.\n$g(0) = 0 - 10 = -10 < 0$ et $g(10) = \\mathrm{e}^{2} - 1 - \\dfrac{10}{11} \\approx 5{,}48 > 0$.\nD'après le corollaire du TVI, $g(p) = 0$ a une unique solution $p_0$ dans $[0 ; 10]$ : c'est l'unique prix d'équilibre.\nc) La boucle avance de pas en pas tant que $g(p) < 0$. Elle s'arrête au premier prix de la grille où $g(p) \\geqslant 0$, juste après $p_0$.\nbalayage(0.1) affiche 5.0 : donc $4{,}9 < p_0 \\leqslant 5$.\nbalayage(0.01) affiche 4.94 : donc $4{,}93 < p_0 \\leqslant 4{,}94$. Le prix d'équilibre est d'environ $4{,}94$ €.\nd) $O(4{,}93) \\approx 1{,}68$ et $O(4{,}94) \\approx 1{,}69$ : environ $1\\,680$ à $1\\,690$ unités s'échangent.\n⚠️ Le balayage renvoie la borne de DROITE de l'encadrement : le prix cherché est un peu en dessous de la valeur affichée.\n⚠️ Sans l'unicité de b), la boucle pourrait s'arrêter au premier de plusieurs croisements, sans qu'on le sache.\n⭐ Sur le dessin : la courbe bleue de l'offre monte, la courbe orange de la demande descend. Elles se croisent une seule fois, au point rouge.",
          schema: ecranSeulement(
            repere(
              [-1, 11, -1, 11],
              [{ pts: echantillon((p) => Math.exp(0.2 * p) - 1, 0, 10) }, { pts: echantillon((p) => 10 / (p + 1), 0, 10), couleur: ORANGE }],
              [{ x: 4.94, y: 1.68, label: "" }],
              undefined,
              true,
            ),
          ),
          micros: ["tvi_defi", "tvi_unicite", "tvi_appliquer"],
        },
        {
          titre: "La jauge de la cuve",
          enonce:
            "Une cuve a la forme d'une boule de rayon $2$ m. Quand l'eau y monte à la hauteur $h$ (en m, avec $0 \\leqslant h \\leqslant 4$), on admet que le volume d'eau vaut $V(h) = \\dfrac{\\pi h^2(6 - h)}{3}$, en m³.\na) Calculer $V(2)$ et $V(4)$. Interpréter.\nb) Montrer que $V$ est strictement croissante sur $[0 ; 4]$.\nc) On veut graduer une jauge verticale. Montrer que, pour tout volume $v$ compris entre $0$ et $V(4)$, il existe une unique hauteur $h$ telle que $V(h) = v$.\nd) Encadrer au centimètre la hauteur du trait « $10$ m³ », puis celle du trait « $20$ m³ ».\ne) Les traits de la jauge sont-ils régulièrement espacés ?",
          figure: cuve(1.45),
          correction:
            "a) $V(2) = \\dfrac{\\pi \\times 4 \\times 4}{3} = \\dfrac{16\\pi}{3} \\approx 16{,}76$ m³ : c'est la moitié de la boule.\n$V(4) = \\dfrac{\\pi \\times 16 \\times 2}{3} = \\dfrac{32\\pi}{3} \\approx 33{,}51$ m³ : la cuve est pleine. C'est bien le volume d'une boule de rayon $2$, $\\dfrac{4}{3}\\pi \\times 2^3$.\nb) $V(h) = \\dfrac{\\pi}{3}(6h^2 - h^3)$, donc $V'(h) = \\dfrac{\\pi}{3}(12h - 3h^2) = \\pi h(4 - h)$.\nSur $[0 ; 4]$, $V'(h) \\geqslant 0$, et ne s'annule qu'en $0$ et en $4$ : $V$ est strictement croissante.\nc) $V$ est un polynôme, donc continue. Elle est strictement croissante sur $[0 ; 4]$, avec $V(0) = 0$ et $V(4) = \\dfrac{32\\pi}{3}$.\nD'après le corollaire du TVI, pour tout $v$ entre $0$ et $\\dfrac{32\\pi}{3}$, l'équation $V(h) = v$ a une unique solution dans $[0 ; 4]$.\nd) $V(1{,}44) \\approx 9{,}90$ et $V(1{,}45) \\approx 10{,}02$ : le trait « $10$ m³ » est entre $1{,}44$ m et $1{,}45$ m.\n$V(2{,}25) \\approx 19{,}88$ et $V(2{,}26) \\approx 20{,}00$ (un peu plus) : le trait « $20$ m³ » est entre $2{,}25$ m et $2{,}26$ m.\ne) Non. Les $10$ premiers m³ occupent environ $1{,}45$ m de hauteur, les $10$ suivants seulement $0{,}81$ m : la cuve est plus large au milieu qu'au fond.\n⚠️ $V'$ s'annule en $0$ et en $4$ : cela n'empêche pas $V$ d'être strictement croissante, car ce sont des points isolés.\n⚠️ Un trait « $40$ m³ » n'existe pas : $40$ n'est pas entre $0$ et $33{,}51$.\n⭐ Sur le dessin : la cuve remplie jusqu'au trait des $10$ m³. L'eau n'y monte qu'à $h \\approx 1{,}45$ m, moins que le rayon.",
          micros: ["tvi_defi", "tvi_unicite", "tvi_rediger"],
        },
        {
          titre: "Le randonneur et son bivouac",
          enonce:
            "Un randonneur part à $8$ h du refuge, à $500$ m d'altitude, et arrive au sommet, à $2000$ m, à $18$ h. Il bivouaque, et redescend le lendemain par le même sentier, de $8$ h à $18$ h. Le sentier monte sans cesse : un point du sentier est repéré par son altitude.\na) On note $a(t)$ et $d(t)$ ses altitudes $t$ heures après $8$ h, à la montée et à la descente. Démontrer qu'il existe une heure où il se trouve au même endroit les deux jours.\nb) On modélise, pour $0 \\leqslant t \\leqslant 10$ : $a(t) = 500 + 1500\\sin\\left(\\dfrac{\\pi t}{20}\\right)$ et $d(t) = 2000 - 15t^2$. Vérifier les altitudes de départ et d'arrivée.\nc) Dans ce modèle, montrer que cette heure est unique, et la donner à la minute près.",
          correction:
            "a) Une altitude varie sans sauter : $a$ et $d$ sont continues sur $[0 ; 10]$. Donc $g = a - d$ l'est aussi.\n$g(0) = 500 - 2000 = -1500 < 0$ et $g(10) = 2000 - 500 = 1500 > 0$.\nD'après le TVI, il existe $t_0$ dans $[0 ; 10]$ tel que $g(t_0) = 0$ : à l'heure $8 + t_0$, il est à la même altitude, donc au même endroit, les deux jours.\nb) $a(0) = 500$ et $a(10) = 500 + 1500\\sin\\left(\\dfrac{\\pi}{2}\\right) = 2000$.\n$d(0) = 2000$ et $d(10) = 2000 - 1500 = 500$.\nc) $g(t) = 1500\\sin\\left(\\dfrac{\\pi t}{20}\\right) + 15t^2 - 1500$.\nPar la dérivée d'une composée : $g'(t) = 75\\pi\\cos\\left(\\dfrac{\\pi t}{20}\\right) + 30t$.\nPour $t \\in [0 ; 10]$, $\\dfrac{\\pi t}{20}$ est dans $\\left[0 ; \\dfrac{\\pi}{2}\\right]$ : le cosinus y est positif, et ne s'annule qu'en $t = 10$, où $30t = 300 > 0$. Donc $g'(t) > 0$.\n$g$ est strictement croissante : $t_0$ est unique.\nÀ la calculatrice : $g(5{,}20) \\approx -0{,}95 < 0$ et $g(5{,}21) \\approx 2{,}2 > 0$, donc $5{,}20 < t_0 < 5{,}21$.\nOr $0{,}20$ h $= 12$ min et $0{,}21$ h $\\approx 12{,}6$ min : il est à $13$ h $12$, vers $1\\,594$ m d'altitude.\n⚠️ La question a) ne demande AUCUN modèle : quels que soient ses pauses et son rythme, la continuité suffit. C'est la force du TVI.\n⚠️ La dérivée de $\\sin\\left(\\dfrac{\\pi t}{20}\\right)$ est $\\dfrac{\\pi}{20}\\cos\\left(\\dfrac{\\pi t}{20}\\right)$ : ne pas oublier le facteur $\\dfrac{\\pi}{20}$.\n⭐ Sur le dessin, en kilomètres : la montée (bleue) et la descente (orange) se croisent une seule fois, au point rouge.",
          schema: repere(
            [-1, 11, -1, 3],
            [
              { pts: echantillon((t) => (500 + 1500 * Math.sin((Math.PI * t) / 20)) / 1000, 0, 10) },
              { pts: echantillon((t) => (2000 - 15 * t * t) / 1000, 0, 10), couleur: ORANGE },
            ],
            [{ x: 5.2, y: 1.59, label: "" }],
            undefined,
            true,
          ),
          micros: ["tvi_rediger", "tvi_defi", "tvi_unicite"],
        },
        {
          titre: "Le parachutiste",
          enonce:
            "Un parachutiste saute d'un avion. Pendant la chute libre, on modélise sa vitesse par $v(t) = 50(1 - \\mathrm{e}^{-0{,}2t})$, en m/s, et la distance parcourue par $d(t) = 50t - 250(1 - \\mathrm{e}^{-0{,}2t})$, en m, où $t \\geqslant 0$ est le temps en secondes.\na) Vérifier que $d'(t) = v(t)$. En déduire que $d$ est strictement croissante sur $[0 ; +\\infty[$.\nb) Montrer que $d(t) \\geqslant 50t - 250$, puis donner la limite de $d$ en $+\\infty$.\nc) Il ouvre sa voile après $1000$ m de chute. Montrer qu'il existe un unique instant $T$ tel que $d(T) = 1000$.\nd) À l'aide du tableau de valeurs arrondies, encadrer $T$ au dixième de seconde.",
          figure: tableau(["t", "24", "24,9", "25", "26"], ["d(t)", "952,1", "996,7", "1001,7", "1051,4"]),
          correction:
            "a) La dérivée de $\\mathrm{e}^{-0{,}2t}$ est $-0{,}2\\mathrm{e}^{-0{,}2t}$.\nDonc $d'(t) = 50 - 250 \\times 0{,}2\\mathrm{e}^{-0{,}2t}$, soit $d'(t) = 50 - 50\\mathrm{e}^{-0{,}2t} = v(t)$.\nPour $t > 0$, $\\mathrm{e}^{-0{,}2t} < 1$, donc $v(t) > 0$ : $d$ est strictement croissante sur $[0 ; +\\infty[$.\nb) $\\mathrm{e}^{-0{,}2t} > 0$, donc $1 - \\mathrm{e}^{-0{,}2t} < 1$, et $250(1 - \\mathrm{e}^{-0{,}2t}) < 250$.\nAinsi $d(t) \\geqslant 50t - 250$. Comme $\\lim (50t - 250) = +\\infty$, par comparaison, $\\lim_{t \\to +\\infty} d(t) = +\\infty$.\nc) $d$ est dérivable, donc continue, et strictement croissante sur $[0 ; +\\infty[$, avec $d(0) = 0$ et une limite $+\\infty$.\n$1000$ est compris entre $0$ et $+\\infty$ : d'après le corollaire du TVI, il existe un unique $T \\geqslant 0$ tel que $d(T) = 1000$.\nd) $d(24{,}9) \\approx 996{,}7 < 1000$ et $d(25) \\approx 1001{,}7 > 1000$, donc $24{,}9 < T < 25$.\nIl ouvre sa voile au bout d'environ $25$ secondes. Il tombe alors à $v(25) = 50(1 - \\mathrm{e}^{-5}) \\approx 49{,}7$ m/s, près de $180$ km/h.\n⚠️ On ne sait pas résoudre $d(t) = 1000$ par le calcul : $t$ est à la fois dans un terme simple et dans une exponentielle.\n⚠️ Sur $[0 ; +\\infty[$, la borne de droite n'a pas de valeur : c'est la LIMITE $+\\infty$ qui garantit que $1000$ est atteint.\n⭐ Dans le tableau : la distance passe les $1000$ m entre $24{,}9$ s et $25$ s. Le tableau de variations de $d$ n'a qu'une flèche, de $0$ à $+\\infty$.",
          schema: ecranSeulement(tabVar(["0", "+∞"], ["+"], ["0", "+∞"], "d", "t")),
          micros: ["tvi_defi", "tvi_rediger", "continuite_reconnaitre"],
        },
      ],
    },
  ],
};
