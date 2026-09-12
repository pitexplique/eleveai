// ─── Fiche de cours : le second degré (1re spé) ───────────────────────────────
//
// Deuxième fiche de première spécialité, après la dérivation. Alignée sur la
// banque lib/tutor-v4/questionBank/premiere-spe/maths/second-degre.bank.ts
// (notion second_degre), vérifiée et renforcée le 12/09/2026 : 11 micros sur
// 11 robustes, et les neuf gestes de devoir servis.
//
// ⭐⭐ LE FIL DE LA FICHE : Δ NE CALCULE RIEN, IL DÉCIDE. Le discriminant n'est
// pas une étape de plus dans un calcul de racines — c'est le nombre qui dit ce
// qui EXISTE. Un seul signe commande tout le chapitre :
//
//     Δ > 0  →  deux racines  →  la forme factorisée existe  →  le signe change
//     Δ = 0  →  une racine double  →  le trinôme est un carré  →  le signe ne change pas
//     Δ < 0  →  aucune racine  →  PAS de forme factorisée  →  le signe ne change jamais
//
// La troisième colonne est celle qu'on oublie d'enseigner, et c'est elle qui
// fait comprendre « du signe de a sauf entre les racines » : s'il n'y a pas de
// racines, il n'y a pas d'« entre », donc le trinôme garde le signe de a partout.
//
// ⛔ LE PIÈGE CENTRAL, mesuré dans le coach avant renfort : sur 1 769 énoncés
// donnant un trinôme complet à résoudre, 43 seulement avaient Δ < 0, tous issus
// d'un unique item figé. La règle était énoncée partout, le GESTE n'était jamais
// demandé — et un élève qui n'a jamais calculé un discriminant négatif cherche
// la racine carrée d'un nombre négatif au lieu de s'arrêter.
//
// Micro-compétences couvertes :
// - sd_discriminant      → propriété « Δ décide », figure, méthode 1, exo 1
// - sd_racines           → propriété « Les deux racines », exemple 1, exos 2-3
// - sd_deux_racines      → figure, exemple 1
// - sd_factorisation     → propriété « La forme factorisée », exemple 2, exo 5
// - sd_forme_factorisee  → propriété « La forme factorisée », usages
// - sd_signe             → propriété « Le signe du trinôme », exemple 3, exo 7
// - sd_inequation        → usages « Résoudre une inéquation », exemple 3, exo 8
// - sd_canonique         → propriété « Les trois écritures », usages, exo 6
// - sd_completion_carre  → historique, méthode 3
// - sd_somme_produit     → propriété « Les deux racines », exo 9
// - sd_forme_adaptee     → les trois écritures, usages, exo 10

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import TexteMath from "@/components/fiches/TexteMath";
import {
  egalite,
  egalites,
  cas,
  enBleu,
  enRouge,
  enVert,
  BLEU,
  ROUGE,
  VERT,
} from "@/lib/fiches/schemas";

/**
 * ⭐ LE SCHÉMA QUI PORTE LA FICHE : les trois cas du discriminant, dessinés.
 *
 * Une parabole qui coupe l'axe deux fois, une qui le touche, une qui ne le
 * rencontre jamais. C'est la seule image dont un élève a besoin pour retenir ce
 * que Δ décide — et elle dit du même coup pourquoi le signe du trinôme change
 * ou ne change pas.
 *
 * ⚠️ Un seul SVG de 320 de large, trois panneaux dedans : trois canvas côte à
 * côte tomberaient à 100 px chacun en poche, et une parabole de 100 px ne se
 * lit plus. Ici les panneaux s'alignent dans un cadre unique qui se met à la
 * largeur de la carte, donc ils rétrécissent ensemble sans se couper.
 */
function troisCasDelta() {
  const panneaux = [
    { titre: "Δ > 0", sous: "deux racines", couleur: BLEU, decalage: 0 },
    { titre: "Δ = 0", sous: "une racine double", couleur: VERT, decalage: 1 },
    { titre: "Δ < 0", sous: "aucune racine", couleur: ROUGE, decalage: 2 },
  ];
  const L = 104; // largeur d'un panneau
  const axeY = 74;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
      <svg viewBox="0 0 320 118" className="block h-auto w-full" aria-label="Les trois cas du discriminant">
        {panneaux.map((p, i) => {
          const x0 = i * L + L / 2;
          // La parabole : sommet à (x0, sommetY), branches vers le haut.
          // Δ > 0 : sommet sous l'axe. Δ = 0 : sommet SUR l'axe. Δ < 0 : au-dessus.
          const sommetY = [axeY + 20, axeY, axeY - 20][i];
          const demi = 34;
          const d = `M ${x0 - demi} ${sommetY - 30} Q ${x0} ${sommetY + 26} ${x0 + demi} ${sommetY - 30}`;
          // Les points d'intersection avec l'axe, quand ils existent.
          const racines =
            i === 0 ? [x0 - 22, x0 + 22] : i === 1 ? [x0] : [];
          return (
            <g key={p.titre}>
              <text x={x0} y={14} textAnchor="middle" fontSize="14" fontWeight="900" fill={p.couleur}>
                {p.titre}
              </text>
              <line
                x1={i * L + 8}
                y1={axeY}
                x2={i * L + L - 8}
                y2={axeY}
                stroke="#94a3b8"
                strokeWidth={1.4}
              />
              <path d={d} fill="none" stroke={p.couleur} strokeWidth={2.6} strokeLinecap="round" />
              {racines.map((r) => (
                <circle key={r} cx={r} cy={axeY} r={4} fill={p.couleur} />
              ))}
              <text x={x0} y={104} textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569">
                {p.sous}
              </text>
              {i < 2 ? (
                <line x1={(i + 1) * L} y1={22} x2={(i + 1) * L} y2={110} stroke="#e2e8f0" strokeWidth={1} />
              ) : null}
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-center text-xs leading-5 text-slate-500">
        Les racines sont les points où la parabole RENCONTRE l&apos;axe. Quand elle
        ne le rencontre pas, il n&apos;y a rien à factoriser.
      </p>
    </div>
  );
}

/**
 * Les trois écritures d'un même trinôme, et ce que chacune montre sans calcul.
 *
 * ⚠️ `flex-col sm:flex-row` : en poche, trois blocs côte à côte tomberaient
 * sous 100 px et les formules déborderaient. C'est la leçon des cartes de
 * `cas`, mesurée le 10/09 sur la fiche des vecteurs.
 */
function troisEcritures() {
  const formes = [
    { nom: "Développée", tex: "x^2 - 2x - 3", montre: "l'ordonnée à l'origine", couleur: BLEU },
    { nom: "Factorisée", tex: "(x + 1)(x - 3)", montre: "les racines", couleur: VERT },
    { nom: "Canonique", tex: "(x - 1)^2 - 4", montre: "le sommet", couleur: ROUGE },
  ];
  return (
    <div className="mt-3 flex flex-col gap-2 sm:flex-row">
      {formes.map((f) => (
        <div
          key={f.nom}
          className="min-w-0 flex-1 rounded-xl border-2 bg-white p-3 text-center"
          style={{ borderColor: f.couleur }}
        >
          <p className="text-xs font-black uppercase tracking-wide" style={{ color: f.couleur }}>
            {f.nom}
          </p>
          <div className="mt-1 overflow-x-auto whitespace-nowrap text-base text-slate-900">
            <TexteMath>{`$${f.tex}$`}</TexteMath>
          </div>
          <p className="mt-1 text-xs text-slate-600">montre {f.montre}</p>
        </div>
      ))}
    </div>
  );
}

export const ficheSecondDegrePremiere: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere-spe",
  notion: "second-degre",
  titre: "Le second degré",
  accroche:
    "Un trinôme s'écrit de trois façons, et un seul nombre décide de ce qui est possible : le discriminant. Δ ne calcule rien — il dit si les racines existent, donc si la forme factorisée existe, donc si le signe du trinôme change quelque part.",
  identite: [
    {
      label: "Prérequis",
      valeur: "Développer, factoriser, équation produit nul, identités remarquables",
    },
    {
      label: "L'idée clé",
      valeur: "Le SIGNE de Δ décide : deux racines, une seule, ou aucune",
    },
    {
      label: "Outil",
      valeur: "Trois écritures du trinôme — on prend celle que la question réclame",
    },
  ],

  definition: {
    texte:
      "Un TRINÔME DU SECOND DEGRÉ est une expression $ax^2 + bx + c$ avec $a \\neq 0$. Sa courbe est une PARABOLE, tournée vers le haut si $a > 0$, vers le bas si $a < 0$. Son DISCRIMINANT est le nombre $\\Delta = b^2 - 4ac$. Ce nombre ne sert pas à calculer : il DÉCIDE. Son signe dit combien de fois la parabole rencontre l'axe des abscisses — deux fois, une fois, ou jamais — et donc si l'équation $ax^2 + bx + c = 0$ a deux solutions, une seule, ou aucune.",
  },

  figure: {
    schema: troisCasDelta(),
    legende:
      "⭐ Ces trois dessins contiennent tout le chapitre. Deux racines : la forme factorisée existe et le trinôme CHANGE de signe deux fois. Une racine double : le trinôme touche l'axe sans le traverser, il ne change jamais de signe. Aucune racine : il n'y a rien à factoriser, et le trinôme garde le signe de a sur tout ℝ.",
  },

  proprietes: [
    {
      titre: "⭐ Le discriminant décide",
      texte:
        "$\\Delta = b^2 - 4ac$. Son signe donne le nombre de solutions de $ax^2 + bx + c = 0$, et il le donne AVANT tout calcul de racine. ⛔ Si $\\Delta < 0$, on s'arrête : écrire $\\sqrt{\\Delta}$ n'a aucun sens, la racine carrée d'un nombre négatif n'existe pas.",
      schema: egalites(
        [
          `${enBleu("\\Delta > 0")} \\;\\longrightarrow\\; \\text{deux solutions}`,
          `${enVert("\\Delta = 0")} \\;\\longrightarrow\\; \\text{une solution double}`,
          `${enRouge("\\Delta < 0")} \\;\\longrightarrow\\; \\text{aucune solution}`,
        ],
        "On calcule Δ d'abord, on décide ensuite. Jamais l'inverse.",
      ),
    },
    {
      titre: "Les deux racines, et ce qu'elles cachent",
      texte:
        "Quand $\\Delta > 0$, les solutions sont $x_1$ et $x_2$ données par la formule. Leur SOMME vaut $-\\dfrac{b}{a}$ et leur PRODUIT $\\dfrac{c}{a}$ : deux relations qui permettent souvent de deviner les racines de tête, sans discriminant.",
      schema: egalites(
        [
          `x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}`,
          `x_1 + x_2 = ${enBleu("-\\dfrac{b}{a}")} \\qquad x_1 \\times x_2 = ${enVert("\\dfrac{c}{a}")}`,
        ],
        "Pour x² − 5x + 6 : somme 5, produit 6 → 2 et 3, sans calculer Δ.",
      ),
    },
    {
      titre: "La forme factorisée n'existe pas toujours",
      texte:
        "Si $\\Delta \\geqslant 0$, le trinôme s'écrit $a(x - x_1)(x - x_2)$ — avec $x_1 = x_2$ quand $\\Delta = 0$. ⛔ Si $\\Delta < 0$, AUCUNE factorisation n'est possible dans $\\mathbb{R}$ : ce n'est pas qu'on ne la trouve pas, c'est qu'elle n'existe pas.",
      schema: egalites(
        [
          `x^2 - 2x - 3 = ${enVert("(x + 1)(x - 3)")}`,
          `x^2 + 2x + 5 \\;\\longrightarrow\\; \\Delta = ${enRouge("-16")} \\;\\longrightarrow\\; \\text{rien}`,
        ],
        "La factorisation se vérifie en développant : on doit retrouver le départ.",
      ),
    },
    {
      titre: "Le signe : celui de a, sauf entre les racines",
      texte:
        "Un trinôme est du signe de $a$ partout, SAUF entre ses racines où il prend le signe contraire. ⭐ Et quand $\\Delta < 0$ il n'y a pas de racines, donc pas d'« entre » : il garde le signe de $a$ sur tout $\\mathbb{R}$. La règle est la même, c'est le dessin qui change.",
      schema: cas(
        [
          { formule: "\\Delta > 0", verdict: "signe de a, sauf entre", couleur: BLEU },
          { formule: "\\Delta \\leqslant 0", verdict: "signe de a partout", couleur: ROUGE },
        ],
        "Une seule phrase couvre les trois cas, si l'on comprend qu'« entre les racines » peut être vide.",
      ),
    },
  ],

  reel: {
    texte:
      "Un ballon lancé vers le haut suit une trajectoire parabolique : sa hauteur, en mètres, vaut environ $h(t) = -5t^2 + v_0 t + h_0$, où $v_0$ est la vitesse initiale et $h_0$ la hauteur de départ. « Quand retombe-t-il au sol ? » demande de résoudre $h(t) = 0$ : une équation du second degré, dont on ne garde que la solution positive. « Quelle hauteur maximale atteint-il ? » demande la forme canonique, qui donne le sommet. ⭐ Deux questions sur le même ballon, deux écritures différentes du même trinôme — c'est exactement ce que le chapitre apprend à choisir.",
  },

  historique: {
    texte:
      "Les Babyloniens résolvaient déjà des problèmes du second degré vers −1700, mais par des recettes géométriques, aire par aire. C'est le mathématicien perse al-Khwârizmî qui, au IXᵉ siècle, en donne la première méthode générale — la COMPLÉTION DU CARRÉ, exactement le geste qui mène à la forme canonique. Le mot « algèbre » vient du titre de son ouvrage, al-jabr, « la remise en place ». Le mot « discriminant », lui, n'apparaît qu'au XIXᵉ siècle sous la plume de Sylvester : il vient du latin discriminare, séparer — parce que ce nombre SÉPARE les cas.",
  },

  methode: [
    {
      titre: "1. J'identifie a, b, c et je calcule Δ",
      texte:
        "⚠️ Avec les signes. Dans $2x^2 - 3x - 5$, on a $a = 2$, $b = -3$ et $c = -5$ : les moins font partie des coefficients. Puis $\\Delta = b^2 - 4ac$.",
      schema: egalite(
        `\\Delta = (-3)^2 - 4 \\times 2 \\times (-5) = 9 ${enBleu("+ 40")} = 49`,
        "⛔ −4 × 2 × (−5) est POSITIF : deux signes moins se compensent.",
      ),
    },
    {
      titre: "2. Le signe de Δ décide de la suite",
      texte:
        "$\\Delta > 0$ : j'applique la formule des racines. $\\Delta = 0$ : une seule racine, $-\\dfrac{b}{2a}$. $\\Delta < 0$ : je conclus « pas de solution » et je m'arrête — il n'y a rien d'autre à écrire.",
      schema: egalites(
        [
          `\\Delta = 49 > 0 \\;\\longrightarrow\\; x = \\dfrac{3 \\pm 7}{4}`,
          `x_1 = ${enVert("-1")} \\qquad x_2 = ${enVert("2{,}5")}`,
        ],
        "√49 = 7 : on cherche toujours si Δ est un carré parfait, ça évite la calculatrice.",
      ),
    },
    {
      titre: "3. Je choisis l'écriture que la question réclame",
      texte:
        "Les racines ? Forme factorisée. Le sommet ou l'extremum ? Forme canonique. L'ordonnée à l'origine ? Forme développée. Les trois désignent le même nombre pour chaque $x$ — mais l'une répond en une ligne là où les autres demandent tout le travail.",
      schema: troisEcritures(),
    },
  ],

  usages: [
    {
      titre: "⭐ Résoudre une inéquation",
      detail:
        "On ramène tout d'un côté pour avoir $> 0$ ou $< 0$, on cherche les racines, puis on dresse le tableau de signes. La solution est une réunion d'intervalles, pas une valeur.",
      schema: egalites(
        [
          `x^2 - 2x - 3 < 0 \\;\\Longleftrightarrow\\; (x + 1)(x - 3) < 0`,
          `S = \\;${enBleu("\\left] -1 \\,;\\, 3 \\right[")}`,
        ],
        "a = 1 > 0, donc le trinôme est négatif ENTRE les racines.",
      ),
    },
    {
      titre: "Trouver un maximum ou un minimum",
      detail:
        "La forme canonique $a(x - \\alpha)^2 + \\beta$ donne l'extremum sans dérivée : un carré est toujours positif, donc $\\beta$ est atteint exactement en $x = \\alpha$. C'est un minimum si $a > 0$, un maximum si $a < 0$.",
      schema: egalites(
        [
          `A(x) = -x^2 + 20x = -(x - ${enRouge("10")})^2 + ${enVert("100")}`,
          `\\text{aire maximale } ${enVert("100")} \\text{ pour } x = ${enRouge("10")}`,
        ],
        "L'enclos rectangulaire de 40 m de clôture : le carré gagne toujours.",
      ),
    },
    {
      titre: "Couper une courbe et une droite",
      detail:
        "Deux courbes se coupent là où elles ont la même ordonnée. On écrit $f(x) = g(x)$, on ramène tout d'un côté, et l'on obtient une équation du second degré. ⭐ C'est le motif le plus fréquent où une telle équation SURGIT d'un problème au lieu d'être donnée.",
      schema: egalites(
        [
          `x^2 - 3x + 1 = x - 2`,
          `x^2 - 4x + 3 = 0 \\;\\longrightarrow\\; x = ${enBleu("1")} \\text{ ou } x = ${enBleu("3")}`,
        ],
        "Le nombre de points d'intersection est donné par le signe de Δ.",
      ),
    },
  ],

  exemples: [
    {
      titre: "Résoudre, avec Δ > 0",
      donnees: "$2x^2 - 3x - 5 = 0$.",
      question: "Résoudre dans $\\mathbb{R}$.",
      schema: egalites([
        `\\Delta = (-3)^2 - 4 \\times 2 \\times (-5) = ${enBleu("49")}`,
        `x = \\dfrac{3 \\pm 7}{4} \\;\\longrightarrow\\; x_1 = ${enVert("-1")},\\; x_2 = ${enVert("2{,}5")}`,
      ]),
      solution:
        "$a = 2$, $b = -3$, $c = -5$. On calcule $\\Delta = 9 + 40 = 49 > 0$, donc deux solutions. $\\sqrt{49} = 7$, et $x = \\dfrac{3 \\pm 7}{4}$ : on obtient $x_1 = \\dfrac{-4}{4} = -1$ et $x_2 = \\dfrac{10}{4} = 2{,}5$. ⚠️ Le $-b$ de la formule vaut $+3$ ici : oublier ce changement de signe est l'erreur la plus fréquente.",
    },
    {
      titre: "Quand Δ est négatif",
      donnees: "$x^2 + 2x + 5 = 0$.",
      question: "Combien de solutions ?",
      schema: egalites([
        `\\Delta = 2^2 - 4 \\times 1 \\times 5 = 4 - 20 = ${enRouge("-16")}`,
        `${enRouge("\\Delta < 0")} \\;\\longrightarrow\\; S = \\varnothing`,
      ]),
      solution:
        "$\\Delta = -16 < 0$ : l'équation n'a AUCUNE solution réelle. ⛔ On s'arrête là. Il ne faut surtout pas écrire $\\sqrt{-16}$ : la racine carrée d'un nombre négatif n'existe pas dans $\\mathbb{R}$. Géométriquement, la parabole ne rencontre jamais l'axe des abscisses — et comme $a = 1 > 0$, le trinôme est strictement positif partout.",
    },
    {
      titre: "Le signe d'un trinôme",
      donnees: "$f(x) = -x^2 + 4x - 3$.",
      question: "Étudier le signe de $f$ sur $\\mathbb{R}$.",
      schema: egalites([
        `\\Delta = 16 - 12 = 4 \\;\\longrightarrow\\; x_1 = ${enBleu("1")},\\; x_2 = ${enBleu("3")}`,
        `f(x) = ${enVert("-")}(x - 1)(x - 3)`,
      ]),
      solution:
        "Les racines sont $1$ et $3$. Ici $a = -1 < 0$ : le trinôme est NÉGATIF à l'extérieur des racines et POSITIF entre elles. Donc $f(x) < 0$ sur $\\left] -\\infty \\,;\\, 1 \\right[$ et sur $\\left] 3 \\,;\\, +\\infty \\right[$, et $f(x) > 0$ sur $\\left] 1 \\,;\\, 3 \\right[$. ⚠️ Ne pas réciter « positif sauf entre les racines » : c'est le signe de $a$ qui commande, et ici $a$ est négatif.",
    },
    {
      titre: "Pour quelles valeurs de m ?",
      donnees: "$x^2 + mx + 9 = 0$, où $m$ est un réel.",
      question: "Pour quelles valeurs de $m$ l'équation a-t-elle deux solutions distinctes ?",
      schema: egalites([
        `\\Delta = m^2 - 36`,
        `\\Delta > 0 \\;\\Longleftrightarrow\\; m < ${enRouge("-6")} \\;\\text{ ou }\\; m > ${enRouge("6")}`,
      ]),
      solution:
        "Ici $\\Delta$ n'est pas un nombre, c'est une EXPRESSION en $m$ : $\\Delta = m^2 - 4 \\times 1 \\times 9 = m^2 - 36$. Deux solutions distinctes signifie $\\Delta > 0$, donc $m^2 > 36$, c'est-à-dire $m < -6$ ou $m > 6$. ⛔ Le piège : se mettre à résoudre l'équation en $x$. L'inconnue de la QUESTION est $m$, pas $x$.",
    },
  ],

  pieges: [
    "⛔ Si $\\Delta < 0$, on s'arrête : $\\sqrt{\\Delta}$ n'existe pas. Il n'y a ni racine, ni factorisation.",
    "⛔ Oublier les signes dans $a$, $b$, $c$ : dans $2x^2 - 3x - 5$, $b = -3$ et $c = -5$.",
    "⛔ Dans la formule, le numérateur commence par $-b$ : pour $b = -3$, c'est $+3$.",
    "⛔ « Du signe de $a$ sauf entre les racines » — ce n'est PAS « toujours positif sauf entre ». Quand $a < 0$, tout s'inverse.",
    "⛔ Une inéquation a pour solution un INTERVALLE, pas un nombre : on répond par $S = \\left] \\dots \\,;\\, \\dots \\right[$.",
    "⚠️ $\\Delta$ n'est pas le nombre de solutions : c'est son SIGNE qui le donne. $\\Delta = 49$ ne veut pas dire 49 solutions.",
  ],

  aRetenir: [
    "$\\Delta = b^2 - 4ac$, et c'est son SIGNE qui décide de tout.",
    "$\\Delta > 0$ : deux racines. $\\Delta = 0$ : une racine double. $\\Delta < 0$ : aucune.",
    "$x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$, et $x_1 + x_2 = -\\dfrac{b}{a}$, $x_1 x_2 = \\dfrac{c}{a}$.",
    "La forme factorisée $a(x - x_1)(x - x_2)$ n'existe QUE si $\\Delta \\geqslant 0$.",
    "Un trinôme est du signe de $a$, sauf entre ses racines — s'il en a.",
    "⭐ Trois écritures : développée pour $f(0)$, factorisée pour les racines, canonique pour le sommet.",
  ],

  coachHref: "/coach-ia/maths?classe=premiere-spe",

  entrainement: [
    {
      question: "Calculer le discriminant de $x^2 - 7x + 12$.",
      correction: "$\\Delta = (-7)^2 - 4 \\times 1 \\times 12 = 49 - 48 = 1$. Il est positif : deux racines.",
    },
    {
      question: "Résoudre $x^2 - 7x + 12 = 0$.",
      correction:
        "$\\Delta = 1$, $\\sqrt{\\Delta} = 1$, donc $x = \\dfrac{7 \\pm 1}{2}$ : $x_1 = 3$ et $x_2 = 4$. (Somme $7$, produit $12$ : on pouvait les deviner.)",
    },
    {
      question: "Résoudre $x^2 + x + 1 = 0$.",
      correction:
        "$\\Delta = 1 - 4 = -3 < 0$ : aucune solution réelle. ⛔ On ne calcule pas $\\sqrt{-3}$.",
    },
    {
      question: "Résoudre $4x^2 - 12x + 9 = 0$.",
      correction:
        "$\\Delta = 144 - 144 = 0$ : une solution double, $x = \\dfrac{12}{8} = 1{,}5$. Le trinôme vaut $(2x - 3)^2$.",
    },
    {
      question: "Factoriser $2x^2 - 2x - 12$.",
      correction:
        "$\\Delta = 4 + 96 = 100$, $x_1 = -2$, $x_2 = 3$. Donc $2x^2 - 2x - 12 = 2(x + 2)(x - 3)$. ⚠️ Ne pas oublier le facteur $a = 2$ devant.",
    },
    {
      question: "Donner la forme canonique de $x^2 - 6x + 11$, et en déduire son minimum.",
      correction:
        "$x^2 - 6x + 11 = (x - 3)^2 - 9 + 11 = (x - 3)^2 + 2$. Le minimum vaut $2$, atteint en $x = 3$.",
    },
    {
      question: "Étudier le signe de $x^2 - 5x + 6$.",
      correction:
        "Racines $2$ et $3$, et $a = 1 > 0$ : positif sur $\\left] -\\infty \\,;\\, 2 \\right[$ et $\\left] 3 \\,;\\, +\\infty \\right[$, négatif sur $\\left] 2 \\,;\\, 3 \\right[$.",
    },
    {
      question: "Résoudre l'inéquation $-x^2 + x + 6 \\geqslant 0$.",
      correction:
        "Racines $-2$ et $3$, et $a = -1 < 0$ : le trinôme est positif ENTRE les racines. $S = \\left[ -2 \\,;\\, 3 \\right]$, crochets fermés à cause du $\\geqslant$.",
    },
    {
      question: "Deux nombres ont pour somme $9$ et pour produit $20$. Lesquels ?",
      correction:
        "Ce sont les racines de $x^2 - 9x + 20 = 0$ : $\\Delta = 81 - 80 = 1$, donc $4$ et $5$.",
    },
    {
      question:
        "Pour quelles valeurs de $m$ l'équation $x^2 + mx + 4 = 0$ n'a-t-elle aucune solution ?",
      correction:
        "$\\Delta = m^2 - 16 < 0$, soit $-4 < m < 4$. L'inconnue de la question est $m$, pas $x$.",
    },
  ],
};

export const slidesSecondDegrePremiere: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Le second degré - 1re spé",
    section: {
      type: "objectif",
      phrase: "Δ ne calcule rien : il décide",
      sousPhrase:
        "Le signe du discriminant dit si les racines existent, donc si la forme factorisée existe, donc si le signe du trinôme change quelque part.",
    },
  },
];
