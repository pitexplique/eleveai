// ─── Fiche de cours : le signe d'une expression (2de) ─────────────────────────
//
// ⭐ LA PREMIÈRE FICHE DE SECONDE. Écrite le 08/09/2026, alignée sur la banque
// lib/tutor-v4/questionBank/seconde/maths/signes-expression.bank.ts
// (notion signes_expression_2de), et sur la 5e comme étalon.
//
// ⭐ CE QUI COINCE, ET DONC CE QUE LA FICHE MONTRE : le POSITIONNEMENT.
// Frédéric, 08/09 : « les élèves ont beaucoup de mal à bien positionner ».
// Combien de colonnes, dans laquelle tombe le zéro, où va la double barre. Le
// tableau est donc DESSINÉ à chaque bloc, jamais raconté.
//
// ⭐ LES DEUX APPROCHES, parce que ce sont les deux que le professeur demande :
// partir de la forme FACTORISÉE (produit ou quotient), ou partir d'une COURBE.
//
// Micro-compétences couvertes :
// - signes_premier_degre       → définition, propriété « Le signe de ax + b », méthode 1-2, exos 1-2
// - signes_produit             → propriété « Le produit », méthode 3, exemple 1, exos 3-4-5
// - signes_quotient            → propriété « La valeur interdite », exemple 2, exos 6-7
// - signes_resoudre_equation   → usages, exemple 3, exos 8
// - signes_resoudre_inequation → usages, exemple 4, exos 9-10

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

/**
 * Le tableau de signes, dessiné par le moteur du coach : l'élève voit dans sa
 * fiche EXACTEMENT le tableau qu'il retrouvera dans ses exercices.
 */
function tableau(
  bornes: string[],
  lignes: { label: string; signes: ("+" | "-")[]; marques?: ("0" | "||" | "")[] }[],
  titre?: string,
) {
  return <CanvasRenderer figure={{ kind: "tableau_signes", titre, bornes, lignes }} />;
}

/**
 * Une courbe, pour l'approche graphique.
 *
 * ⛔ LE CADRE SE RETRECIT, IL NE S'AGRANDIT PAS — et j'ai raisonne a l'envers
 * une premiere fois. Le canvas est mis a l'echelle pour tenir dans le bloc de la
 * fiche : agrandir le viewBox le fait REDUIRE davantage, et la police avec.
 * Passer de 300 a 340 a fait tomber les nombres des axes de 9,1 px a 8.
 *
 * La mesure qui commande : le bloc fait ~225 px en poche, la police du canvas
 * vaut 12 en unites de viewBox. Pour rendre 11 px a l'ecran il faut donc un
 * viewBox d'au plus 225 x 12 / 11 = 245. D'ou 240.
 *
 * ⚠️ Et `getComputedStyle` MENT sur ce point : il rend 12 px, la taille avant
 * mise a l'echelle. Ce que l'eleve voit, c'est 12 x l'echelle.
 */
function courbe(
  type: "affine" | "quadratique",
  a: number,
  b: number,
  c?: number,
  racines: number[] = [],
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "fonctionGraphique",
        // ⛔ 215, ET NON 240 : les nombres des AXES de ce canvas sont ecrits en
        // 11, pas en 12 comme le reste. A 240 l'echelle vaut 0,94 et ils rendent
        // 10,3 px. Il faut donc un viewBox sous 225 pour que l'echelle depasse 1.
        size: { width: 215, height: 195 },
        // ⛔ HUIT UNITES PAR AXE AU PLUS. A dix, les graduations tombent a
        // 10,3 px — sous le plancher de 11. Meme mesure que sur la fiche des
        // fonctions le meme jour.
        // ⛔ ET LA COURBE DOIT TENIR ENTIERE. (x+1)(x-4) a son sommet a
        // y = -6,25 : avec ymin = -5, le bas de la parabole etait COUPE, et le
        // dessin ne montrait plus le creux dont parle le texte.
        //
        // ⭐⭐ LE MILIEU DES RACINES DOIT TOMBER SUR UN ENTIER (Frederic,
        // 08/09/2026) : « choisis des milieux de racines qui tombent sur un
        // nombre entier, plus facile pour l'exemple ». Le sommet d'une parabole
        // est au MILIEU de ses racines — leur somme doit donc etre paire.
        // 0,5(x+1)(x-4) donnait un sommet en 1,5 ; 0,5(x+1)(x-3) le pose en
        // (1 ; -2), tout en entiers, et le creux tient dans le cadre.
        xmin: -2,
        xmax: 4,
        ymin: -3,
        ymax: 3,
        grille: true,
        courbes: [{ id: "f", type, a, b, c, couleur: "#2563eb" }],
        // ⛔ LES RACINES NE PORTENT PAS D'ETIQUETTE. Elles sont posees SUR l'axe
        // des abscisses, a l'endroit exact ou la graduation ecrit deja leur
        // valeur : l'etiquette « -1 » se superposait au « -1 » de l'axe. Le point
        // rouge suffit, et l'axe le nomme.
        misesEnEvidence: racines.map((r) => ({
          point: { x: r, y: 0, couleur: "#dc2626" },
        })),
      }}
    />
  );
}

export const ficheSignesSeconde: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "signes-expression-2de",
  titre: "Le signe d'une expression",
  accroche:
    "Un même tableau répond à deux questions : « où l'expression s'annule-t-elle ? » — c'est l'équation $f(x) = 0$ — et « où est-elle positive ? » — c'est l'inéquation. Le premier se lit sous les zéros, le second se lit dans les colonnes.",
  identite: [
    { label: "Mots clés", valeur: "Racine, facteur, produit, quotient, valeur interdite" },
    { label: "Le secret", valeur: "Une racine coupe la droite en deux" },
    { label: "Outil", valeur: "Le tableau de signes" },
  ],

  definition: {
    texte:
      "Étudier le signe d'une expression, c'est dire pour quelles valeurs de $x$ elle est positive, négative ou nulle. Une expression du premier degré $ax + b$ ne change de signe qu'UNE fois : à sa racine, la valeur qui l'annule. Cette racine coupe la droite des réels en deux morceaux.",
  },

  figure: {
    schema: tableau(
      ["$-\\infty$", "$2$", "$+\\infty$"],
      [{ label: "$x - 2$", signes: ["-", "+"], marques: ["0"] }],
      "Signe de $x - 2$",
    ),
    legende:
      "Une racine, deux colonnes. Le zéro se pose SOUS la valeur qui annule, jamais ailleurs.",
  },

  proprietes: [
    {
      titre: "Le signe de $ax + b$",
      texte:
        "C'est le signe de $a$ qui décide de l'ordre. Si $a > 0$ : négatif puis positif. Si $a < 0$ : positif puis négatif.",
      schema: tableau(
        ["$-\\infty$", "$3$", "$+\\infty$"],
        [{ label: "$-2x + 6$", signes: ["+", "-"], marques: ["0"] }],
        "Ici $a = -2$ : l'ordre est inversé",
      ),
    },
    {
      titre: "Le produit",
      texte:
        "Chaque facteur a SA ligne et SON zéro. La dernière ligne est le produit des lignes du dessus, colonne par colonne.",
      schema: tableau(
        ["$-\\infty$", "$-1$", "$4$", "$+\\infty$"],
        [
          { label: "$x + 1$", signes: ["-", "+", "+"], marques: ["0", ""] },
          { label: "$x - 4$", signes: ["-", "-", "+"], marques: ["", "0"] },
          { label: "$(x+1)(x-4)$", signes: ["+", "-", "+"], marques: ["0", "0"] },
        ],
      ),
    },
    {
      titre: "La valeur interdite",
      texte:
        "Sur un quotient, ce qui annule le DÉNOMINATEUR est interdit : le quotient n'existe pas. On marque une double barre, jamais un zéro.",
      schema: tableau(
        ["$-\\infty$", "$-1$", "$4$", "$+\\infty$"],
        [
          { label: "$x + 1$", signes: ["-", "+", "+"], marques: ["0", ""] },
          { label: "$x - 4$", signes: ["-", "-", "+"], marques: ["", "0"] },
          { label: "$\\dfrac{x+1}{x-4}$", signes: ["+", "-", "+"], marques: ["0", "||"] },
        ],
      ),
    },
    {
      titre: "Le signe se lit aussi sur une courbe",
      texte:
        "Au-dessus de l'axe des abscisses : positif. En dessous : négatif. Attention, « la courbe monte » décrit les variations, pas le signe.",
      schema: courbe("quadratique", 0.5, -1, -1.5, [-1, 3]),
    },
  ],

  reel: {
    texte:
      "Une entreprise réunionnaise modélise son bénéfice par $B(x) = (x - 20)(60 - x)$, où $x$ est le nombre de milliers d'articles vendus. Chercher quand elle gagne de l'argent, c'est résoudre $B(x) > 0$ — un tableau de signes donne la réponse : entre 20 000 et 60 000 articles.",
  },

  historique: {
    texte:
      "La règle des signes a longtemps gêné : au XVIIᵉ siècle encore, on peinait à admettre que « moins par moins donne plus ». Il a fallu attendre que les négatifs cessent d'être vus comme des nombres « absurdes » pour que le tableau de signes devienne un outil banal.",
  },

  methode: [
    {
      titre: "1. Je cherche les racines",
      texte:
        "J'annule chaque facteur séparément. $x + 1 = 0$ donne $-1$, $x - 4 = 0$ donne $4$. Deux facteurs, deux racines.",
      schema: tableau(
        ["$-\\infty$", "$-1$", "$+\\infty$"],
        [{ label: "$x + 1$", signes: ["-", "+"], marques: ["0"] }],
        "Le premier facteur, seul",
      ),
    },
    {
      titre: "2. Je range et je compte les colonnes",
      texte:
        "Les racines se rangent dans l'ordre CROISSANT, pas dans l'ordre où les facteurs sont écrits. Deux racines donnent trois colonnes.",
      schema: tableau(
        ["$-\\infty$", "$-1$", "$4$", "$+\\infty$"],
        [{ label: "$x + 1$", signes: ["-", "+", "+"], marques: ["0", ""] }],
        "Trois colonnes pour deux racines",
      ),
    },
    {
      titre: "3. Je remplis, puis je multiplie",
      texte:
        "Une ligne par facteur, un seul zéro par ligne. Puis la ligne du bas : je multiplie les signes colonne par colonne.",
      schema: tableau(
        ["$-\\infty$", "$-1$", "$4$", "$+\\infty$"],
        [
          { label: "$x + 1$", signes: ["-", "+", "+"], marques: ["0", ""] },
          { label: "$x - 4$", signes: ["-", "-", "+"], marques: ["", "0"] },
          { label: "$f(x)$", signes: ["+", "-", "+"], marques: ["0", "0"] },
        ],
      ),
    },
  ],

  usages: [
    {
      titre: "Résoudre une équation",
      detail:
        "$f(x) = 0$ : je lis les ZÉROS de la dernière ligne. Une double barre n'est jamais solution.",
      schema: tableau(
        ["$-\\infty$", "$-1$", "$4$", "$+\\infty$"],
        [{ label: "$f(x)$", signes: ["+", "-", "+"], marques: ["0", "0"] }],
        "Solutions : $-1$ et $4$",
      ),
    },
    {
      titre: "Résoudre une inéquation",
      detail:
        "$f(x) > 0$ : je garde les colonnes marquées $+$. Elles peuvent former DEUX intervalles séparés.",
      schema: tableau(
        ["$-\\infty$", "$-1$", "$4$", "$+\\infty$"],
        [{ label: "$f(x)$", signes: ["+", "-", "+"], marques: ["0", "0"] }],
        "$]-\\infty\\,;\\,-1[ \\cup ]4\\,;\\,+\\infty[$",
      ),
    },
    {
      titre: "Partir d'une courbe",
      detail:
        "Pas de calcul : je repère où la courbe traverse l'axe, puis de quel côté elle se trouve.",
      schema: courbe("affine", 1, -2, undefined, [2]),
    },
  ],

  exemples: [
    {
      titre: "Un facteur seul",
      donnees: "$f(x) = -3x + 9$.",
      question: "Quel est le signe de $f$ ?",
      schema: tableau(
        ["$-\\infty$", "$3$", "$+\\infty$"],
        [{ label: "$-3x + 9$", signes: ["+", "-"], marques: ["0"] }],
      ),
      solution:
        "$-3x + 9 = 0$ donne $x = 3$. Le coefficient $-3$ est NÉGATIF, donc l'ordre est inversé : $f$ est positive avant $3$, négative après.",
    },
    {
      titre: "Un quotient",
      donnees: "$g(x) = \\dfrac{x - 2}{x + 3}$.",
      question: "Où $g$ n'existe-t-elle pas, et quel est son signe ?",
      schema: tableau(
        ["$-\\infty$", "$-3$", "$2$", "$+\\infty$"],
        [
          { label: "$x - 2$", signes: ["-", "-", "+"], marques: ["", "0"] },
          { label: "$x + 3$", signes: ["-", "+", "+"], marques: ["0", ""] },
          { label: "$g(x)$", signes: ["+", "-", "+"], marques: ["||", "0"] },
        ],
      ),
      solution:
        "$x + 3 = 0$ donne $x = -3$ : c'est la valeur INTERDITE, marquée par une double barre. $g$ est positive sur $]-\\infty\\,;\\,-3[$, négative sur $]-3\\,;\\,2[$, positive après $2$.",
    },
    {
      titre: "Résoudre une équation",
      donnees: "$h(x) = (2x - 6)(x + 1)$.",
      question: "Résoudre $h(x) = 0$.",
      schema: tableau(
        ["$-\\infty$", "$-1$", "$3$", "$+\\infty$"],
        [{ label: "$h(x)$", signes: ["+", "-", "+"], marques: ["0", "0"] }],
      ),
      solution:
        "Un produit est nul dès qu'un facteur l'est. $2x - 6 = 0$ donne $x = 3$, et $x + 1 = 0$ donne $x = -1$. Les solutions sont $-1$ et $3$ — les deux zéros de la dernière ligne.",
    },
    {
      titre: "Lire une inéquation sur une courbe",
      donnees: "La courbe de $u$ coupe l'axe en $-2$ et en $3$.",
      question: "Résoudre $u(x) \\leqslant 0$.",
      schema: courbe("quadratique", 1, -1, -6, [-2, 3]),
      solution:
        "La parabole est tournée vers le haut : elle plonge sous l'axe ENTRE ses deux racines. Comme l'inégalité est large, les bornes sont incluses : $[-2\\,;\\,3]$.",
    },
  ],

  pieges: [
    "⛔ La DOUBLE BARRE n'est pas un zéro. Sous elle, la fonction n'existe pas : ce n'est jamais une solution de $f(x) = 0$, et la borne reste exclue même avec $\\leqslant$ ou $\\geqslant$.",
    "⛔ Ne jamais multiplier une inéquation par $x - a$ : on ignore son signe, et multiplier par un négatif RETOURNE l'inégalité. C'est précisément pour éviter cela qu'on dresse un tableau.",
    "⛔ Les racines se rangent dans l'ordre CROISSANT, pas dans l'ordre où les facteurs sont écrits. $(x - 6)(x + 2)$ commence par $-2$ dans le tableau.",
    "⛔ « La courbe monte » décrit les VARIATIONS, pas le signe. Une droite peut monter en restant tout entière sous l'axe.",
    "⛔ Les solutions d'une inéquation forment souvent DEUX intervalles séparés. N'en garder qu'un est l'oubli le plus fréquent.",
  ],

  aRetenir: [
    "Une racine coupe la droite en deux : $n$ racines donnent $n + 1$ colonnes.",
    "Le signe de $ax + b$ suit le signe de $a$ : positif, c'est $-$ puis $+$ ; négatif, c'est l'inverse.",
    "Une ligne par facteur, UN SEUL zéro par ligne — sous sa propre racine.",
    "La dernière ligne est le produit des lignes du dessus, colonne par colonne.",
    "Numérateur qui s'annule → un $0$. Dénominateur qui s'annule → une double barre.",
    "Sur une courbe : au-dessus de l'axe des abscisses, positif ; en dessous, négatif.",
  ],

  entrainement: [
    {
      question: "En quelle valeur $5x - 15$ s'annule-t-elle ?",
      correction:
        "On résout $5x - 15 = 0$, donc $5x = 15$ et $x = 3$. Elle s'annule en $3$.",
    },
    {
      question: "Quel est le signe de $-4x + 8$ avant et après sa racine ?",
      correction:
        "La racine : $-4x + 8 = 0$ donne $x = 2$. Le coefficient $-4$ est négatif, donc l'ordre est inversé : POSITIF avant $2$, NÉGATIF après.",
    },
    {
      question:
        "Combien de colonnes de signes le tableau de $(x - 1)(x + 5)(x - 7)$ doit-il avoir ?",
      correction:
        "Trois facteurs donnent trois racines : $1$, $-5$ et $7$. Trois racines découpent QUATRE intervalles. Le tableau a donc 4 colonnes de signes — toujours une de plus que le nombre de racines.",
    },
    {
      question:
        "Dans le tableau de $(x - 6)(x + 2)$, quelle est la première ligne, de gauche à droite ?",
      correction:
        "Les racines sont $6$ et $-2$. On les range dans l'ordre CROISSANT, pas dans l'ordre d'écriture : $-\\infty$, $-2$, $6$, $+\\infty$.",
    },
    {
      question:
        "Dans un tableau, la ligne de $x - 3$ vaut $-$ puis $+$, et celle de $x + 1$ vaut $-$ puis $+$ puis $+$. Que vaut le produit dans la première colonne ?",
      correction:
        "Dans la première colonne, les deux facteurs sont négatifs. Deux signes identiques donnent $+$ : le produit est POSITIF.",
    },
    {
      question: "Quelle est la valeur interdite de $\\dfrac{x + 4}{2x - 10}$ ?",
      correction:
        "On annule le DÉNOMINATEUR : $2x - 10 = 0$ donne $x = 5$. La valeur interdite est $5$ — sous elle, on écrit une double barre, jamais un zéro.",
    },
    {
      question:
        "Sur le tableau d'un quotient, $-2$ porte un zéro et $7$ porte une double barre. Quelles sont les solutions de $f(x) = 0$ ?",
      correction:
        "Seul un ZÉRO donne une solution. En $7$, la fonction n'existe pas : ce n'est pas une solution. La seule solution est $-2$.",
    },
    {
      question: "Résoudre $(x + 3)(x - 5) = 0$.",
      correction:
        "Un produit est nul si et seulement si l'un de ses facteurs est nul. $x + 3 = 0$ donne $x = -3$ ; $x - 5 = 0$ donne $x = 5$. Les solutions sont $-3$ et $5$.",
    },
    {
      question:
        "La dernière ligne d'un tableau vaut $+$, $-$, $+$ avec les racines $-1$ et $4$. Résoudre $f(x) > 0$.",
      correction:
        "On garde les colonnes marquées $+$ : avant $-1$ et après $4$. L'inégalité est stricte, donc les bornes sont exclues : $]-\\infty\\,;\\,-1[ \\cup ]4\\,;\\,+\\infty[$. Deux intervalles, pas un — oublier le second est l'erreur classique.",
    },
    {
      question:
        "Même tableau, mais $4$ porte une DOUBLE BARRE au lieu d'un zéro. Résoudre $f(x) \\geqslant 0$.",
      correction:
        "L'inégalité est large, donc les zéros sont inclus : $-1$ entre dans les solutions. Mais $4$ est une valeur INTERDITE : la fonction n'y existe pas, elle reste exclue même avec $\\geqslant$. Solutions : $]-\\infty\\,;\\,-1] \\cup ]4\\,;\\,+\\infty[$.",
    },
  ],

  coachHref: "/coach-ia/maths?classe=seconde",
};

export const slidesSignesSeconde: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Signe d'une expression - 2de",
    section: {
      type: "objectif",
      phrase: "Dresser un tableau de signes, et s'en servir pour résoudre",
      sousPhrase:
        "Une racine coupe la droite en deux. Le tableau traite tous les cas d'un coup, là où multiplier par un facteur de signe inconnu ferait fausse route.",
    },
  },
];
