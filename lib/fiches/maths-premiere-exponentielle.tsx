// ─── Fiche de cours : la fonction exponentielle, partie 1 (1re spé) ───────────
//
// Troisième fiche de première spécialité, après la dérivation et le second
// degré. Alignée sur la banque
// lib/tutor-v4/questionBank/premiere-spe/maths/exponentielle.bank.ts
// (notion exponentielle), renforcée les 14 et 15/09/2026 : 12 micros sur 12
// robustes. Programme : BO n° 14 de 2026.
//
// ⭐ DEUX FICHES, décision de Frédéric le 14/09 : « on peut faire partie 1 et 2
// intelligemment ». Le partage suit ce que fait l'élève :
//   — partie 1, CALCULER ET RÉSOUDRE (cette fiche) : la définition, les règles,
//     le signe, la croissance, et ce qu'on en tire pour résoudre ;
//   — partie 2, DÉRIVER ET ÉTUDIER : maths-premiere-exponentielle-etude.tsx.
// ⚠️ Cette partie porte le slug `exponentielle`, le notionId du coach : c'est
// elle que `ficheHrefPourCoach` retrouve depuis la liste du coach.
//
// ⭐⭐ LE FIL DE LA FICHE : TOUT SE JOUE DANS L'EXPOSANT. Calculer, c'est ajouter,
// soustraire ou multiplier des exposants. Résoudre, c'est COMPARER des exposants.
//
// ⛔ LA CONSIGNE DE FRÉDÉRIC SUR LA RÉSOLUTION (15/09) : « ne doit pas être trop
// difficile, le but est que l'élève sache que e(a) = e(b) alors a = b, idem pour
// inéquation » · « ça doit rester simple ». Les exemples et exercices restent
// donc à solutions entières, comme les gabarits du coach.
//
// Micro-compétences couvertes :
// - exp_definition   → définition, figure
// - exp_relation     → propriété « Une somme devient un produit », réel, exemple 2
// - exp_nombre_e     → définition, méthode 1, exemple 3, exo 4
// - exp_proprietes   → propriété « Les règles de calcul », méthode 2, exos 1-3
// - exp_simplifier   → propriété « Les règles de calcul », méthode 2, exemples 1-2
// - exp_signe        → propriété « Toujours strictement positive », usage 3, exo 9
// - exp_derivee      → propriété « Strictement croissante », exo 5
// - exp_equations    → propriété « Strictement croissante », méthode 3, usages,
//                      exemples 3-4, exos 6-10

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { egalite, egalites, cas, enBleu, enRouge, enVert, BLEU, ROUGE, VERT } from "@/lib/fiches/schemas";

/** Les points d'une courbe, gardés dans la fenêtre du dessin. */
function points(f: (x: number) => number, xmin: number, xmax: number, ymax: number) {
  const sortie: { x: number; y: number }[] = [];
  for (let x = xmin; x <= xmax + 1e-9; x += 0.05) {
    const y = f(x);
    if (y <= ymax) sortie.push({ x: Math.round(x * 100) / 100, y: Math.round(y * 1000) / 1000 });
  }
  return sortie;
}

/**
 * La courbe de l'exponentielle — le même canvas que dans les exercices du coach.
 *
 * ⛔ 215 DE LARGE, et huit unités par axe au plus : au-delà, le dessin se met à
 * l'échelle d'une carte de 225 px en poche et ses graduations tombent sous
 * 11 px (mesuré sur la fiche des variations de seconde).
 */
function courbeExp(options: { tangente?: boolean; horizontales?: { y: number; couleur: string }[]; ymin: number; ymax: number }) {
  return (
    <CanvasRenderer
      figure={{
        kind: "fonctionGraphique",
        size: { width: 215, height: 215 },
        // ⛔ xmax = 3, et non 2 : l'étiquette « (1 ; e) » s'écrit à droite de son
        // point et sortait du dessin (mesuré le 15/09/2026).
        xmin: -3,
        xmax: 3,
        ymin: options.ymin,
        ymax: options.ymax,
        grille: true,
        courbes: [
          { id: "exp", type: "points", couleur: BLEU, points: points(Math.exp, -3, 3, options.ymax) },
          ...(options.tangente
            ? [{ id: "tangente", type: "points" as const, couleur: ROUGE, points: [{ x: -2, y: -1 }, { x: 2, y: 3 }] }]
            : []),
        ],
        misesEnEvidence: [
          ...(options.horizontales ?? []).map((h) => ({ horizontale: h })),
          { point: { x: 0, y: 1, label: "(0 ; 1)", couleur: VERT } },
          ...(options.tangente ? [{ point: { x: 1, y: Math.E, label: "(1 ; e)", couleur: VERT } }] : []),
        ],
      }}
    />
  );
}

export const ficheExponentiellePremiere: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere-spe",
  notion: "exponentielle",
  titre: "L'exponentielle, partie 1",
  accroche:
    "Partie 1 : calculer et résoudre. Elle est égale à sa propre dérivée et vaut $1$ en $0$ — tout le reste en découle. L'exponentielle se calcule comme une puissance, ne s'annule jamais et ne fait que monter. Pour calculer comme pour résoudre, tout se joue dans l'exposant.",
  identite: [
    {
      label: "Prérequis",
      valeur: "Règles des puissances, dérivée, équations et inéquations du premier degré",
    },
    {
      label: "L'idée clé",
      valeur: "Tout se joue dans l'exposant : $e^{a} = e^{b} \\Longleftrightarrow a = b$",
    },
    {
      label: "La suite",
      valeur: "Partie 2 : dériver $e^{at}$ et étudier une fonction",
    },
  ],

  definition: {
    texte:
      "La FONCTION EXPONENTIELLE est l'unique fonction $f$ dérivable sur $\\mathbb{R}$ telle que $f' = f$ et $f(0) = 1$. On la note $\\exp$. Le nombre $e = \\exp(1) \\approx 2{,}718$ lui donne sa notation : $\\exp(x) = e^{x}$. Elle se calcule comme une puissance — mais avec un exposant qui peut être n'importe quel réel.",
  },

  figure: {
    schema: courbeExp({ tangente: true, ymin: -1, ymax: 7 }),
    legende:
      "La courbe passe par $(0 ; 1)$ et par $(1 ; e)$. En $(0 ; 1)$, la tangente rouge a pour pente $1$ : c'est $f'(0) = f(0) = 1$. Elle reste au-dessus de l'axe des abscisses et ne cesse de monter.",
  },

  proprietes: [
    {
      titre: "⭐ Une somme devient un produit",
      texte:
        "Pour tous réels $a$ et $b$ : $e^{a+b} = e^{a} \\times e^{b}$. C'est la RELATION FONCTIONNELLE. Avec $b = -a$, elle donne $e^{a} \\times e^{-a} = e^{0} = 1$.",
      schema: egalites(
        [`e^{${enBleu("a + b")}} = e^{a} \\times e^{b}`, `e^{a} \\times e^{-a} = e^{0} = ${enVert("1")}`],
        "Les règles des puissances, avec des exposants réels.",
      ),
      micros: ["exp_relation"],
    },
    {
      titre: "Les règles de calcul",
      texte:
        "Elles se déduisent de la relation fonctionnelle. ⛔ Elles portent sur des PRODUITS et des QUOTIENTS, jamais sur des sommes : $e^{a} + e^{b}$ ne se simplifie pas.",
      schema: egalites([
        `e^{-a} = \\dfrac{1}{e^{a}}`,
        `\\dfrac{e^{a}}{e^{b}} = e^{${enBleu("a - b")}}`,
        `\\left(e^{a}\\right)^{n} = e^{${enBleu("na")}}`,
      ]),
      micros: ["exp_proprietes", "exp_simplifier"],
    },
    {
      titre: "Toujours strictement positive",
      texte:
        "Pour tout réel $x$ : $e^{x} > 0$. La courbe ne touche jamais l'axe des abscisses. Elle coupe la droite $y = 2$, mais ne rencontre jamais $y = -1$ : l'équation $e^{x} = -1$, comme $e^{x} = 0$, n'a AUCUNE solution.",
      schema: courbeExp({
        ymin: -2,
        ymax: 6,
        horizontales: [
          { y: 2, couleur: VERT },
          { y: -1, couleur: ROUGE },
        ],
      }),
      micros: ["exp_signe"],
    },
    {
      titre: "⭐ Strictement croissante : on compare les exposants",
      texte:
        "Sa dérivée est elle-même, donc strictement positive : l'exponentielle est strictement croissante. D'où la propriété qui sert à RÉSOUDRE : deux exponentielles sont rangées exactement comme leurs exposants.",
      schema: egalites(
        [
          `e^{a} = e^{b} \\;\\Longleftrightarrow\\; ${enBleu("a = b")}`,
          `e^{a} < e^{b} \\;\\Longleftrightarrow\\; ${enBleu("a < b")}`,
        ],
        "Même sens : enlever les exponentielles ne renverse jamais une inégalité.",
      ),
      micros: ["exp_derivee", "exp_equations"],
    },
  ],

  reel: {
    texte:
      "Une vidéo tournée à Saint-Pierre voit son nombre de vues multiplié par $e^{0{,}3}$ chaque jour. En deux jours : $e^{0{,}3} \\times e^{0{,}3} = e^{0{,}6}$. En dix jours : $e^{3}$, soit environ vingt fois plus. ⭐ Des facteurs qui se MULTIPLIENT, des exposants qui s'AJOUTENT : c'est la relation fonctionnelle, et c'est pourquoi l'exponentielle décrit tout ce qui grandit d'un même pourcentage — une population, un capital, une rumeur.",
  },

  historique: {
    texte:
      "Vers 1683, Jacques Bernoulli calcule des intérêts composés de plus en plus souvent — chaque mois, chaque jour, chaque instant — et voit apparaître un nombre proche de $2{,}718$. Au XVIIIᵉ siècle, Leonhard Euler lui donne la lettre $e$ et en fait la base de la fonction exponentielle. Le chemin est celui du programme : une croissance à taux constant mène à la seule fonction égale à sa propre dérivée.",
  },

  methode: [
    {
      titre: "J'écris tout en puissances de $e$",
      texte:
        "Avant de calculer, on remplace ce qui n'a pas l'air d'une exponentielle : $1 = e^{0}$, $e = e^{1}$, $\\dfrac{1}{e} = e^{-1}$.",
      schema: egalite(
        `e \\times e^{4} = e^{${enBleu("1")}} \\times e^{4} = e^{5}`,
        "Le e tout seul n'est pas « rien » : c'est un facteur e¹.",
      ),
      micros: ["exp_nombre_e"],
    },
    {
      titre: "Je simplifie en travaillant sur les exposants",
      texte:
        "Produit : on AJOUTE les exposants. Quotient : on les SOUSTRAIT. Puissance : on les MULTIPLIE.",
      schema: egalites([`\\dfrac{e^{3x} \\times e^{-x}}{e^{x}} = e^{3x - x - x}`, `= ${enVert("e^{x}")}`]),
      micros: ["exp_simplifier", "exp_proprietes"],
    },
    {
      titre: "Je résous en comparant les exposants",
      texte:
        "Une exponentielle de chaque côté : elles disparaissent, et il reste une équation sur les exposants, qu'on résout comme d'habitude.",
      schema: egalites([
        `e^{2x - 1} = e^{x + 3}`,
        `\\Longleftrightarrow\\; 2x - 1 = x + 3`,
        `\\Longleftrightarrow\\; x = ${enVert("4")}`,
      ]),
      micros: ["exp_equations"],
    },
  ],

  usages: [
    {
      titre: "⭐ Résoudre une inéquation",
      detail:
        "Même méthode, et le sens ne change pas quand on enlève les exponentielles. Il ne peut changer qu'ENSUITE, si l'on divise par un nombre négatif.",
      schema: egalites(
        [
          `e^{3x} \\leqslant e^{x + 6}`,
          `\\Longleftrightarrow\\; 3x \\leqslant x + 6`,
          `\\Longleftrightarrow\\; x \\leqslant 3`,
          `S = ${enBleu("\\left] -\\infty \\,;\\, 3 \\right]")}`,
        ],
        "Crochet fermé en 3 : l'égalité est permise.",
      ),
      micros: ["exp_equations"],
    },
    {
      titre: "Quand le second membre vaut $1$ ou $e$",
      detail:
        "On le réécrit d'abord en exponentielle. ⛔ Le piège classique : conclure que l'exposant vaut $1$ parce que le second membre vaut $1$.",
      schema: egalites([
        `e^{2x - 4} = 1 = e^{${enRouge("0")}}`,
        `\\Longleftrightarrow\\; 2x - 4 = ${enRouge("0")}`,
        `\\Longleftrightarrow\\; x = ${enVert("2")}`,
      ]),
      micros: ["exp_equations", "exp_nombre_e"],
    },
    {
      titre: "Regarder le second membre AVANT de calculer",
      detail:
        "Négatif ou nul : il n'y a rien à résoudre, une exponentielle est toujours strictement positive. Et dans un produit nul, le facteur exponentiel ne s'annule jamais.",
      schema: cas(
        [
          { formule: "e^{x + 1} = -2", verdict: "aucune solution", couleur: ROUGE },
          { formule: "e^{x + 1} > -2", verdict: "$S = \\mathbb{R}$", couleur: VERT },
          { formule: "(2x - 4)e^{x} = 0", verdict: "$x = 2$ seulement", couleur: BLEU },
        ],
        "On ne compare des exposants que s'il y a deux exponentielles.",
      ),
      micros: ["exp_equations", "exp_signe"],
    },
  ],

  exemples: [
    {
      titre: "Simplifier un quotient",
      donnees: "$A = \\dfrac{e^{2x} \\times e^{3}}{e^{x + 1}}$.",
      question: "Écrire $A$ sous la forme $e^{\\dots}$.",
      schema: egalites([`A = e^{2x + 3 - (x + 1)}`, `= ${enVert("e^{x + 2}")}`]),
      solution:
        "Au numérateur, un produit : on ajoute les exposants, $2x + 3$. Puis le quotient : on soustrait l'exposant du dénominateur TOUT ENTIER, d'où les parenthèses. $2x + 3 - x - 1 = x + 2$. ⛔ Sans parenthèses, on écrirait $2x + 3 - x + 1$ et l'on trouverait $e^{x + 4}$.",
      micros: ["exp_simplifier"],
    },
    {
      titre: "Une somme ne se simplifie pas",
      donnees: "$B = \\dfrac{e^{2x} + e^{3x}}{e^{x}}$.",
      question: "Simplifier $B$.",
      schema: egalites([`B = \\dfrac{e^{2x}}{e^{x}} + \\dfrac{e^{3x}}{e^{x}}`, `= ${enVert("e^{x} + e^{2x}")}`]),
      solution:
        "Le numérateur est une SOMME : les règles des exposants ne s'y appliquent pas. On partage la fraction, puis chaque quotient se simplifie. ⛔ Écrire $e^{2x + 3x - x} = e^{4x}$, c'est traiter une somme comme un produit.",
      micros: ["exp_simplifier", "exp_relation"],
    },
    {
      titre: "Résoudre avec $e$ au second membre",
      donnees: "$e^{-2x + 3} = e$.",
      question: "Résoudre dans $\\mathbb{R}$.",
      schema: egalites([`e^{-2x + 3} = e^{${enBleu("1")}}`, `-2x + 3 = 1`, `x = ${enVert("1")}`]),
      solution:
        "On écrit $e = e^{1}$, puis on compare les exposants : $-2x + 3 = 1$, soit $-2x = -2$ et $x = 1$. $S = \\{1\\}$.",
      micros: ["exp_equations", "exp_nombre_e"],
    },
    {
      titre: "Une équation qui retombe sur le second degré",
      donnees: "$e^{x^2} = e^{2x + 3}$.",
      question: "Résoudre dans $\\mathbb{R}$.",
      schema: egalites([`x^2 = 2x + 3`, `x^2 - 2x - 3 = 0`, `x = ${enVert("-1")} \\text{ ou } x = ${enVert("3")}`]),
      solution:
        "Les exposants sont égaux : $x^2 = 2x + 3$. On ramène tout d'un côté : $x^2 - 2x - 3 = 0$, $\\Delta = 4 + 12 = 16$ et $\\sqrt{\\Delta} = 4$, donc $x = \\dfrac{2 - 4}{2} = -1$ ou $x = \\dfrac{2 + 4}{2} = 3$. $S = \\{-1 \\,;\\, 3\\}$. L'exponentielle ne sert qu'à la première ligne.",
      micros: ["exp_equations"],
    },
  ],

  pieges: [
    "⛔ $e^{a} + e^{b} \\neq e^{a+b}$ : c'est le PRODUIT qui donne $e^{a+b}$. Une somme d'exponentielles ne se simplifie pas.",
    "⛔ $e^{-x}$ n'est pas négatif : c'est l'INVERSE $\\dfrac{1}{e^{x}}$, toujours strictement positif.",
    "⛔ $e^{2x} \\neq 2e^{x}$ : $e^{2x} = \\left(e^{x}\\right)^{2}$, c'est un carré, pas un double.",
    "⛔ $\\dfrac{e^{5}}{e^{3}} = e^{2}$, et non $e^{5/3}$ : on soustrait les exposants.",
    "⛔ $e^{u} = 1$ ne donne pas $u = 1$ : $1 = e^{0}$, donc $u = 0$.",
    "⛔ $(2x - 4)e^{x} = 0$ n'a qu'une solution, $x = 2$ : pas de « ou $x = 0$ », car $e^{0} = 1$.",
    "⚠️ $e \\approx 2{,}718$ — et non $3{,}14$, qui est $\\pi$.",
  ],

  aRetenir: [
    "$\\exp$ est l'unique fonction dérivable sur $\\mathbb{R}$ telle que $f' = f$ et $f(0) = 1$ ; on note $e^{x}$, avec $e = e^{1} \\approx 2{,}718$.",
    "$e^{a+b} = e^{a}e^{b}$, $\\;e^{a-b} = \\dfrac{e^{a}}{e^{b}}$, $\\;e^{-a} = \\dfrac{1}{e^{a}}$, $\\;\\left(e^{a}\\right)^{n} = e^{na}$.",
    "Pour tout réel $x$ : $e^{x} > 0$. L'exponentielle ne s'annule jamais.",
    "Elle est strictement croissante : $e^{a} = e^{b} \\Leftrightarrow a = b$ et $e^{a} < e^{b} \\Leftrightarrow a < b$.",
    "⭐ Pour résoudre : deux exponentielles, puis on compare les exposants.",
    "$1 = e^{0}$, $\\;e = e^{1}$, $\\;\\dfrac{1}{e} = e^{-1}$.",
  ],

  coachHref: "/coach-ia/maths?classe=premiere-spe",

  entrainement: [
    {
      question: "Simplifier $e^{3} \\times e^{-5}$.",
      correction: "Produit : on ajoute les exposants. $e^{3 + (-5)} = e^{-2}$.",
    },
    {
      question: "Simplifier $\\dfrac{e^{7}}{e^{2}}$.",
      correction: "Quotient : on soustrait. $e^{7 - 2} = e^{5}$.",
    },
    {
      question: "Simplifier $\\left(e^{2x}\\right)^{3} \\times e^{-x}$.",
      correction: "$\\left(e^{2x}\\right)^{3} = e^{6x}$, puis $e^{6x} \\times e^{-x} = e^{5x}$.",
    },
    {
      question: "Écrire $e \\times e^{4}$ sous la forme d'une seule puissance de $e$.",
      correction: "$e = e^{1}$, donc $e^{1} \\times e^{4} = e^{5}$.",
    },
    {
      question: "Sans calculatrice, comparer $e^{-3}$ et $e^{-2}$.",
      correction: "L'exponentielle est strictement croissante et $-3 < -2$, donc $e^{-3} < e^{-2}$.",
    },
    {
      question: "Résoudre $e^{3x - 2} = e^{x + 4}$.",
      correction: "On compare les exposants : $3x - 2 = x + 4$, donc $2x = 6$ et $x = 3$.",
    },
    {
      question: "Résoudre $e^{2x + 6} = 1$.",
      correction: "$1 = e^{0}$, donc $2x + 6 = 0$ et $x = -3$. ⛔ Et non $2x + 6 = 1$.",
    },
    {
      question: "Résoudre $e^{x + 2} < e^{4x - 7}$.",
      correction:
        "$x + 2 < 4x - 7$, soit $-3x < -9$. On divise par $-3$, négatif : le sens change, $x > 3$. $S = \\left] 3 \\,;\\, +\\infty \\right[$.",
    },
    {
      question: "Résoudre $(3x + 6)e^{x} = 0$.",
      correction: "$e^{x} \\neq 0$, donc $3x + 6 = 0$ et $x = -2$.",
    },
    {
      question: "Résoudre $e^{x^2} = e^{4x - 3}$.",
      correction: "$x^2 = 4x - 3$, soit $x^2 - 4x + 3 = 0$. $\\Delta = 16 - 12 = 4$, donc $x = 1$ ou $x = 3$.",
    },
  ],
};

export const slidesExponentiellePremiere: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "L'exponentielle, partie 1 - 1re spé",
    section: {
      type: "objectif",
      phrase: "Tout se joue dans l'exposant",
      sousPhrase:
        "Calculer, c'est ajouter ou soustraire des exposants ; résoudre, c'est les comparer. L'exponentielle, elle, reste positive et ne fait que monter.",
    },
  },
];
