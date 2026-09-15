// ─── Fiche de cours : la fonction exponentielle, partie 2 (1re spé) ───────────
//
// Suite de maths-premiere-exponentielle.tsx (partie 1 : calculer et résoudre).
// Alignée sur la même banque, lib/tutor-v4/questionBank/premiere-spe/maths/
// exponentielle.bank.ts, et sur le BO n° 14 de 2026 : « Pour a réel, dérivée de
// la fonction t ↦ e^{at} », « Étudier les variations d'une fonction. Déterminer
// les extremums ». ⚠️ La dérivée de g(ax + b) n'est plus au programme : la fiche
// ne dérive que des e^{at}, comme le coach.
//
// ⭐⭐ LE FIL DE LA FICHE : L'EXPONENTIELLE NE DÉCIDE JAMAIS DU SIGNE. Dans une
// dérivée, elle est toujours là et toujours strictement positive : c'est l'AUTRE
// facteur qui commande les variations. C'est aussi le piège que la banque pose
// le plus souvent : « f est croissante sur ℝ, car eˣ > 0 ».
//
// ⛔ PAS DE LIMITES : elles sont en terminale. Le tableau de variations laisse
// ses bouts vides, et l'extremum s'écrit avec sa valeur EXACTE (−e), jamais une
// valeur approchée.
//
// Micro-compétences couvertes :
// - exp_derivee_affine → définition, propriété « Dériver e^{at} », exemple 1, exos 1-2
// - exp_derivee        → propriété « Ne décide jamais du signe », méthode, usage 1,
//                        exemples 2-4, exos 3-8
// - exp_courbe         → figure, propriété « Deux croissances qui échangent leurs places »
// - exp_suite_geo      → propriété « La suite (e^{na}) », usage 3, exo 9
// - exp_modelisation   → réel, usages 2-3, exemple 1, exo 10

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { egalite, egalites, cas, enBleu, enRouge, enVert, BLEU, ROUGE, VERT } from "@/lib/fiches/schemas";

const ORANGE = "#ea580c";

/** Les points de t ↦ e^{at}, gardés dans la fenêtre du dessin. */
function points(a: number, tmin: number, tmax: number, ymax: number) {
  const sortie: { x: number; y: number }[] = [];
  for (let t = tmin; t <= tmax + 1e-9; t += 0.05) {
    const y = Math.exp(a * t);
    if (y <= ymax) sortie.push({ x: Math.round(t * 100) / 100, y: Math.round(y * 1000) / 1000 });
  }
  return sortie;
}

/** Des courbes t ↦ e^{at} dans un même repère. ⛔ 215 de large : voir la partie 1. */
function courbes(liste: { a: number; couleur: string }[], ymax: number) {
  return (
    <CanvasRenderer
      figure={{
        kind: "fonctionGraphique",
        size: { width: 215, height: 215 },
        // ⛔ ymin = −1, et non 0 : l'axe des abscisses posé sur le bord faisait
        // sortir ses graduations du dessin (mesuré le 15/09/2026).
        xmin: -2,
        xmax: 2,
        ymin: -1,
        ymax,
        grille: true,
        courbes: liste.map((c, i) => ({
          id: `c${i}`,
          type: "points" as const,
          couleur: c.couleur,
          points: points(c.a, -2, 2, ymax),
        })),
        misesEnEvidence: [{ point: { x: 0, y: 1, label: "(0 ; 1)", couleur: "#0f172a" } }],
      }}
    />
  );
}

/**
 * Le tableau de variations de f(x) = (x − 2)eˣ, dessiné ici et non par le canvas
 * `tableau_variations`.
 *
 * ⛔ POURQUOI : ce canvas DÉDUIT le sens des flèches en comparant des nombres.
 * « −e » n'en est pas un pour lui (NaN) — les deux flèches seraient parties vers
 * le bas. Il aurait fallu écrire « −2,72 », une valeur approchée, là où un
 * professeur écrit −e. Les couleurs et le trait sont repris du canvas.
 *
 * Aucun `$` : c'est du SVG, KaTeX n'y rend rien. Le moins est typographique (−).
 */
function tableauVariations() {
  const TRAIT = "#0f172a";
  const PLUS = "#15803d";
  const MOINS = "#b91c1c";
  const L = 220;
  const G = 52; // colonne des libellés
  const M = G + (L - G) / 2; // la borne du milieu, x = 1
  return (
    <div className="mx-auto w-full max-w-[440px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <svg viewBox={`0 0 ${L} 150`} className="block h-auto w-full" aria-label="Tableau de variations de (x − 2)eˣ">
        <defs>
          <marker id="fleche-exp-etude" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={ORANGE} />
          </marker>
        </defs>
        <rect x={0} y={0} width={L} height={150} fill="none" stroke={TRAIT} strokeWidth={1.6} />
        <line x1={0} y1={30} x2={L} y2={30} stroke={TRAIT} strokeWidth={1.6} />
        <line x1={0} y1={64} x2={L} y2={64} stroke={TRAIT} strokeWidth={1.6} />
        <line x1={G} y1={0} x2={G} y2={150} stroke={TRAIT} strokeWidth={1.6} />
        <line x1={M} y1={30} x2={M} y2={64} stroke="#94a3b8" strokeWidth={1} strokeDasharray="3 3" />

        <text x={G / 2} y={20} textAnchor="middle" fontSize={13} fontWeight={700} fill={TRAIT}>x</text>
        <text x={G / 2} y={52} textAnchor="middle" fontSize={13} fontWeight={700} fill={TRAIT}>f ′(x)</text>
        <text x={G / 2} y={112} textAnchor="middle" fontSize={13} fontWeight={700} fill={TRAIT}>f</text>

        <text x={G + 6} y={20} textAnchor="start" fontSize={13} fill={TRAIT}>−∞</text>
        <text x={M} y={20} textAnchor="middle" fontSize={13} fill={TRAIT}>1</text>
        <text x={L - 6} y={20} textAnchor="end" fontSize={13} fill={TRAIT}>+∞</text>

        <text x={(G + M) / 2} y={53} textAnchor="middle" fontSize={16} fontWeight={900} fill={MOINS}>−</text>
        <text x={M} y={52} textAnchor="middle" fontSize={13} fontWeight={700} fill={TRAIT}>0</text>
        <text x={(M + L) / 2} y={53} textAnchor="middle" fontSize={16} fontWeight={900} fill={PLUS}>+</text>

        <line x1={G + 14} y1={80} x2={M - 14} y2={124} stroke={ORANGE} strokeWidth={2} markerEnd="url(#fleche-exp-etude)" />
        <text x={M} y={142} textAnchor="middle" fontSize={13} fontWeight={700} fill={TRAIT}>−e</text>
        <line x1={M + 14} y1={124} x2={L - 14} y2={80} stroke={ORANGE} strokeWidth={2} markerEnd="url(#fleche-exp-etude)" />
      </svg>
    </div>
  );
}

export const ficheExponentielleEtudePremiere: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere-spe",
  notion: "exponentielle-etude",
  titre: "L'exponentielle, partie 2",
  accroche:
    "Partie 2 : dériver et étudier. Dans une dérivée, l'exponentielle est toujours là — et toujours strictement positive. Elle ne décide donc jamais du signe : c'est l'autre facteur qui commande les variations. Dériver $e^{at}$, étudier $(ax + b)e^{x}$, modéliser une croissance : tout repose sur cette phrase.",
  identite: [
    {
      label: "Prérequis",
      valeur: "Partie 1 ($e^{x} > 0$, règles de calcul), dérivée d'un produit, tableau de signes",
    },
    {
      label: "L'idée clé",
      valeur: "L'exponentielle ne décide jamais du signe : c'est l'autre facteur",
    },
    {
      label: "Outil",
      valeur: "$\\left(e^{at}\\right)' = a\\,e^{at}$ et $(uv)' = u'v + uv'$",
    },
  ],

  definition: {
    texte:
      "Pour tout réel $a$, la fonction $t \\mapsto e^{at}$ est dérivable sur $\\mathbb{R}$ et $\\left(e^{at}\\right)' = a\\,e^{at}$. Comme $e^{at} > 0$, cette dérivée a le signe de $a$ : CROISSANCE exponentielle si $a > 0$, DÉCROISSANCE exponentielle si $a < 0$. Toutes ces courbes passent par $(0 ; 1)$, et plus $a$ est loin de $0$, plus l'évolution est rapide.",
  },

  figure: {
    schema: courbes(
      [
        { a: 2, couleur: BLEU },
        { a: 0.5, couleur: VERT },
        { a: -0.5, couleur: ORANGE },
        { a: -2, couleur: ROUGE },
      ],
      6,
    ),
    legende:
      "Quatre courbes $t \\mapsto e^{at}$, qui partent toutes de $(0 ; 1)$. En bleu $a = 2$ et en vert $a = 0{,}5$ : elles montent. En orange $a = -0{,}5$ et en rouge $a = -2$ : elles descendent, en s'approchant de l'axe sans jamais le toucher.",
  },

  proprietes: [
    {
      titre: "⭐ Dériver $e^{at}$",
      texte:
        "Le coefficient de $t$ SORT de l'exponentielle, et un facteur devant reste en facteur. ⛔ C'est le nombre $a$ qui sort — pas l'exposant entier $at$.",
      schema: egalites(
        [`\\left(e^{at}\\right)' = ${enBleu("a")}\\,e^{at}`, `\\left(100\\,e^{-0{,}2t}\\right)' = ${enBleu("-20")}\\,e^{-0{,}2t}`],
        "100 × (−0,2) = −20.",
      ),
      micros: ["exp_derivee_affine"],
    },
    {
      titre: "⭐ L'exponentielle ne décide jamais du signe",
      texte:
        "Dans $f'(x) = (px + q)\\,e^{\\dots}$, le facteur exponentiel est strictement positif — même quand son exposant est négatif. Le signe de $f'(x)$ est celui de $px + q$, et de lui seul.",
      schema: cas(
        [
          { formule: "f'(x) = (x - 1)\\,e^{x}", verdict: "signe de $x - 1$", couleur: BLEU },
          { formule: "f'(x) = -3\\,e^{-x}", verdict: "toujours négatif", couleur: ROUGE },
        ],
        "« f′ > 0 car eˣ > 0 » est faux : eˣ ne dit rien du signe.",
      ),
      micros: ["exp_derivee"],
    },
    {
      titre: "Deux croissances qui échangent leurs places",
      texte:
        "Pour $t > 0$, la courbe de $e^{2t}$ (bleu) passe au-dessus de celle de $e^{0{,}5t}$ (vert), car $2t > 0{,}5t$. Pour $t < 0$, c'est l'inverse : $2t < 0{,}5t$. Elles se croisent en $(0 ; 1)$.",
      schema: courbes(
        [
          { a: 2, couleur: BLEU },
          { a: 0.5, couleur: VERT },
        ],
        6,
      ),
      micros: ["exp_courbe"],
    },
    {
      titre: "La suite $(e^{na})$ est géométrique",
      texte:
        "Chaque terme s'obtient en multipliant le précédent par $e^{a}$ : la suite est géométrique, de raison $e^{a}$ et de premier terme $1$. ⛔ La raison de $(e^{2n})$ est $e^{2} \\approx 7{,}39$, pas $2$.",
      schema: egalites([`u_n = e^{na}`, `\\dfrac{u_{n+1}}{u_n} = \\dfrac{e^{(n+1)a}}{e^{na}} = ${enBleu("e^{a}")}`]),
      micros: ["exp_suite_geo"],
    },
  ],

  reel: {
    texte:
      "Un cari sorti du feu refroidit dans une cuisine de Saint-Joseph : sa température, en degrés, suit $T(t) = 25 + 60\\,e^{-0{,}05t}$, avec $t$ en minutes. Sa dérivée, $T'(t) = -3\\,e^{-0{,}05t}$, est toujours négative : le cari ne fait que refroidir. Et comme $e^{-0{,}05t}$ reste strictement positif, $T(t)$ reste au-dessus de $25$ : il s'approche de la température de la pièce sans jamais la franchir.",
  },

  historique: {
    texte:
      "En 1701, Isaac Newton publie — sans signer — une loi du refroidissement : un corps chaud perd sa chaleur d'autant plus vite que l'écart avec l'air ambiant est grand. Une vitesse proportionnelle à la quantité, c'est $f' = kf$ : une exponentielle. En 1902, Rutherford et Soddy découvrent que la radioactivité suit la même loi. Une seule équation pour le cari qui refroidit et l'atome qui se désintègre.",
  },

  methode: [
    {
      titre: "Je dérive le produit",
      texte:
        "Pour $f(x) = (x - 2)\\,e^{x}$ : $u(x) = x - 2$, $u'(x) = 1$ ; $v(x) = e^{x}$, $v'(x) = e^{x}$. On applique $(uv)' = u'v + uv'$.",
      schema: egalite(`f'(x) = 1 \\times e^{x} + (x - 2)\\,e^{x}`),
      micros: ["exp_derivee"],
    },
    {
      titre: "Je factorise par l'exponentielle",
      texte:
        "La forme factorisée donne le signe d'un coup d'œil. Comme $e^{x} > 0$, $f'(x)$ a le signe de $x - 1$.",
      schema: egalite(`f'(x) = ${enBleu("(x - 1)")}\\,e^{x}`, "eˣ > 0 : seul le facteur bleu décide."),
      micros: ["exp_derivee"],
    },
    {
      titre: "Je conclus : variations et extremum",
      texte:
        "$x - 1$ est négatif avant $1$, positif après : $f$ décroît puis croît. Elle admet un MINIMUM en $x = 1$.",
      schema: egalite(`f(1) = (1 - 2)\\,e^{1} = ${enVert("-e")}`),
      micros: ["exp_derivee"],
    },
  ],

  usages: [
    {
      titre: "⭐ Dresser le tableau de variations",
      detail:
        "Il résume la méthode : le signe de $f'(x)$ sur la première ligne, les flèches de $f$ en dessous, et la valeur exacte de l'extremum au bout de la flèche. Ici $f(x) = (x - 2)\\,e^{x}$.",
      schema: tableauVariations(),
      micros: ["exp_derivee"],
    },
    {
      titre: "Modéliser une croissance ou une décroissance",
      detail:
        "Dans $N(t) = N_0\\,e^{kt}$, $N_0 = N(0)$ est la quantité de départ, et le signe de $k$ décide : croissance si $k > 0$, décroissance si $k < 0$. La quantité ne devient jamais négative.",
      schema: cas(
        [
          { formule: "2000\\,e^{0{,}03t}", verdict: "un capital qui croît", couleur: VERT },
          { formule: "100\\,e^{-0{,}2t}", verdict: "une masse qui décroît", couleur: ROUGE },
        ],
        "Le nombre devant : le départ. Le signe de k : le sens.",
      ),
      micros: ["exp_modelisation"],
    },
    {
      titre: "Du discret au continu",
      detail:
        "Observée mois par mois, une croissance exponentielle est une suite géométrique. $P_n = 500\\,e^{0{,}2n}$ est multiplié chaque mois par $e^{0{,}2} \\approx 1{,}22$, soit environ $+22\\,\\%$.",
      schema: egalites([`\\dfrac{P_{n+1}}{P_n} = e^{0{,}2} \\approx ${enBleu("1{,}22")}`]),
      micros: ["exp_suite_geo", "exp_modelisation"],
    },
  ],

  exemples: [
    {
      titre: "Dériver $k\\,e^{at}$",
      donnees: "$m(t) = 100\\,e^{-0{,}2t}$, la masse en grammes d'un échantillon radioactif.",
      question: "Calculer $m'(t)$ et en déduire le sens de variation de $m$.",
      schema: egalites([`m'(t) = 100 \\times (-0{,}2)\\,e^{-0{,}2t}`, `= ${enRouge("-20")}\\,e^{-0{,}2t}`]),
      solution:
        "Le facteur $100$ reste, le coefficient $-0{,}2$ sort : $m'(t) = -20\\,e^{-0{,}2t}$. Comme $e^{-0{,}2t} > 0$, $m'(t) < 0$ : la masse diminue sans cesse. ⛔ Écrire $m'(t) = 100\\,e^{-0{,}2t}$, c'est oublier le coefficient — et prétendre que la masse augmente.",
      micros: ["exp_derivee_affine", "exp_modelisation"],
    },
    {
      titre: "Dériver un produit avec $e^{-x}$",
      donnees: "$f(x) = (2x + 1)\\,e^{-x}$.",
      question: "Calculer $f'(x)$ sous forme factorisée.",
      schema: egalites([`f'(x) = 2\\,e^{-x} - (2x + 1)\\,e^{-x}`, `= ${enVert("(-2x + 1)\\,e^{-x}")}`]),
      solution:
        "$u = 2x + 1$, $u' = 2$ ; $v = e^{-x}$, $v' = -e^{-x}$ (le coefficient $-1$ sort). On factorise par $e^{-x}$ : $(2 - 2x - 1)\\,e^{-x} = (-2x + 1)\\,e^{-x}$. ⚠️ Le moins s'applique à tout le facteur $2x + 1$.",
      micros: ["exp_derivee"],
    },
    {
      titre: "L'extremum n'est pas là où $f$ s'annule",
      donnees: "$f(x) = (x + 2)\\,e^{x}$.",
      question: "Déterminer l'extremum de $f$.",
      schema: egalites([`f'(x) = (x + 3)\\,e^{x}`, `f(-3) = ${enVert("-e^{-3}")}`]),
      solution:
        "$f'(x) = e^{x} + (x + 2)\\,e^{x} = (x + 3)\\,e^{x}$, du signe de $x + 3$ : négatif avant $-3$, positif après. $f$ décroît puis croît : MINIMUM en $x = -3$, égal à $f(-3) = (-3 + 2)\\,e^{-3} = -e^{-3}$. ⛔ Le piège : répondre $x = -2$, là où $f$ s'annule. L'extremum se lit sur $f'$, pas sur $f$.",
      micros: ["exp_derivee"],
    },
    {
      titre: "Une exponentielle négative ? Jamais",
      donnees: "$f$ est dérivable sur $\\mathbb{R}$ et $f'(x) = (-x + 4)\\,e^{-2x}$.",
      question: "Donner les variations de $f$.",
      schema: egalites([`e^{-2x} > 0`, `\\text{signe de } ${enBleu("-x + 4")}`]),
      solution:
        "$e^{-2x}$ est strictement positif, malgré son exposant négatif. Le signe de $f'(x)$ est donc celui de $-x + 4$ : positif avant $4$, négatif après. $f$ est croissante sur $\\left] -\\infty \\,;\\, 4 \\right]$ puis décroissante sur $\\left[ 4 \\,;\\, +\\infty \\right[$ : MAXIMUM en $x = 4$.",
      micros: ["exp_derivee"],
    },
  ],

  pieges: [
    "⛔ $\\left(e^{3x}\\right)' \\neq e^{3x}$ : le $3$ sort, $\\left(e^{3x}\\right)' = 3\\,e^{3x}$.",
    "⛔ $\\left(e^{5x}\\right)' \\neq 5x\\,e^{5x}$ : c'est le coefficient $5$ qui sort, pas l'exposant entier.",
    "⛔ $(uv)' \\neq u'v'$ : $\\left(x\\,e^{x}\\right)' = (x + 1)\\,e^{x}$, et non $e^{x}$.",
    "⛔ « $f'(x) > 0$ car $e^{x} > 0$ » : faux. L'exponentielle est positive, c'est l'AUTRE facteur qui donne le signe.",
    "⛔ $e^{-x}$ n'est jamais négatif : un exposant négatif ne change pas le signe.",
    "⛔ L'extremum est là où $f'$ s'annule EN CHANGEANT DE SIGNE — pas là où $f$ s'annule.",
    "⚠️ La raison de la suite $(e^{2n})$ est $e^{2} \\approx 7{,}39$, et non $2$.",
  ],

  aRetenir: [
    "Pour tout réel $a$ : $\\left(e^{at}\\right)' = a\\,e^{at}$, et $\\left(k\\,e^{at}\\right)' = ka\\,e^{at}$.",
    "$t \\mapsto e^{at}$ croît si $a > 0$, décroît si $a < 0$ ; toutes ces courbes passent par $(0 ; 1)$.",
    "⭐ Dans $f'(x) = (px + q)\\,e^{\\dots}$, le signe de $f'$ est celui de $px + q$.",
    "Étudier $f$ : dériver, factoriser par l'exponentielle, étudier le signe, dresser le tableau, lire l'extremum.",
    "$(e^{na})$ est géométrique de raison $e^{a}$ et de premier terme $1$.",
    "$N(t) = N_0\\,e^{kt}$ : $N_0$ est la quantité initiale, le signe de $k$ donne croissance ou décroissance.",
  ],

  coachHref: "/coach-ia/maths?classe=premiere-spe",

  entrainement: [
    {
      question: "Dériver $f(t) = e^{-3t}$.",
      correction: "Le coefficient $-3$ sort : $f'(t) = -3\\,e^{-3t}$.",
    },
    {
      question: "Dériver $f(t) = 50\\,e^{0{,}1t}$.",
      correction: "$f'(t) = 50 \\times 0{,}1\\,e^{0{,}1t} = 5\\,e^{0{,}1t}$.",
    },
    {
      question: "Dériver $f(x) = x\\,e^{x}$.",
      correction: "$f'(x) = 1 \\times e^{x} + x\\,e^{x} = (x + 1)\\,e^{x}$.",
    },
    {
      question: "Dériver $f(x) = (3x - 1)\\,e^{x}$.",
      correction: "$f'(x) = 3\\,e^{x} + (3x - 1)\\,e^{x} = (3x + 2)\\,e^{x}$.",
    },
    {
      question: "Dériver $f(x) = (x + 4)\\,e^{-x}$.",
      correction: "$f'(x) = e^{-x} - (x + 4)\\,e^{-x} = (-x - 3)\\,e^{-x}$.",
    },
    {
      question: "On sait que $f'(x) = (2x - 6)\\,e^{x}$. Donner les variations de $f$.",
      correction:
        "$e^{x} > 0$ : le signe de $f'$ est celui de $2x - 6$. $f$ décroît sur $\\left] -\\infty \\,;\\, 3 \\right]$ et croît sur $\\left[ 3 \\,;\\, +\\infty \\right[$.",
    },
    {
      question: "Déterminer l'extremum de $f(x) = (x - 3)\\,e^{x}$.",
      correction: "$f'(x) = (x - 2)\\,e^{x}$ : minimum en $x = 2$, égal à $f(2) = -e^{2}$.",
    },
    {
      question: "Déterminer l'extremum de $f(x) = (2x + 2)\\,e^{-x}$.",
      correction:
        "$f'(x) = 2\\,e^{-x} - (2x + 2)\\,e^{-x} = -2x\\,e^{-x}$ : positif avant $0$, négatif après. Maximum en $x = 0$, égal à $f(0) = 2$.",
    },
    {
      question: "La suite $u_n = e^{-0{,}5n}$ est-elle croissante ou décroissante ?",
      correction: "Elle est géométrique de raison $e^{-0{,}5} \\approx 0{,}61$, comprise entre $0$ et $1$ : décroissante.",
    },
    {
      question: "$m(t) = 80\\,e^{-0{,}05t}$. Que vaut $m(0)$ ? Quel est le sens de variation de $m$ ?",
      correction: "$m(0) = 80\\,e^{0} = 80$. $m'(t) = -4\\,e^{-0{,}05t} < 0$ : $m$ est décroissante.",
    },
  ],
};

export const slidesExponentielleEtudePremiere: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "L'exponentielle, partie 2 - 1re spé",
    section: {
      type: "objectif",
      phrase: "L'exponentielle ne décide jamais du signe",
      sousPhrase:
        "Elle est toujours strictement positive : dans une dérivée, c'est l'autre facteur qui commande les variations.",
    },
  },
];
