// ─── Fiche de cours : image, antécédent, courbe (2de) ─────────────────────────
//
// Deuxième fiche de seconde. Alignée sur la banque
// lib/tutor-v4/questionBank/seconde/maths/fonction-vocabulaire.bank.ts
// (notion fonction_vocabulaire_2de), et sur la 5e comme étalon.
//
// ⭐ PRIORITÉ DONNÉE PAR LE CONTRÔLE COMMUN de mars 2025 : son exercice 5, le
// plus long, ne fait que ça — lire une image, un antécédent, résoudre
// $f(x) = k$, et comparer DEUX courbes. C'est la notion la plus servie par
// l'épreuve.
//
// ⛔ LE PIÈGE CENTRAL, ET IL STRUCTURE LA FICHE : une image est UNIQUE, un
// antécédent ne l'est pas. Monter depuis l'axe des abscisses donne toujours un
// seul point ; partir de l'axe des ordonnées peut en rencontrer plusieurs.
//
// Micro-compétences couvertes :
// - fonction_vocabulaire         → définition, figure, exemple 1
// - fonction_image_formule       → méthode 1, exemple 1, exos 1-2
// - fonction_antecedent          → propriété « Un antécédent n'est pas unique », méthode 2, exos 3-4
// - fonction_domaine             → propriété « Le domaine », exos 5
// - fonction_tableau_graphique   → usages « Le tableau de valeurs », exos 6
// - fonction_resolution_graphique → usages « Résoudre f(x) = k », exemple 3, exos 7-8
// - fonction_comparer_courbes    → propriété « Comparer deux courbes », exemple 4, exos 9-10

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

/**
 * Une courbe dans un repère.
 *
 * ⛔ LE viewBox NE DÉPASSE PAS 245, et c'est mesuré (08/09/2026, fiche des
 * signes) : le bloc d'une fiche fait ~225 px en poche, la police du canvas vaut
 * 12 en unités de viewBox. Au-delà de 245, l'élève lit sous 11 px.
 *
 * ⛔ ET L'ÉTIQUETTE D'UN POINT TIENT EN TROIS CARACTÈRES. Le canvas ne borne pas
 * sa largeur : « un seul point » et « f(3) = 7 » sortaient du cadre, mesurés en
 * débordement à 375 comme à 1280. Ce que l'étiquette voulait dire appartient à
 * la légende ou au texte du bloc, où il y a toute la place.
 */
function courbe(
  courbes: { type: "affine" | "quadratique"; a: number; b: number; c?: number; couleur?: string }[],
  points: { x: number; y: number; label?: string }[] = [],
  // ⛔ HUIT UNITES PAR AXE AU PLUS. Mesure : a neuf unites sur 240 px, les
  // graduations « -4 » et « -3 » se touchaient, et la police tombait a 10 px.
  bornes: { xmin: number; xmax: number; ymin: number; ymax: number } = {
    xmin: -3,
    xmax: 4,
    ymin: -3,
    ymax: 5,
  },
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "fonctionGraphique",
        size: { width: 240, height: 215 },
        ...bornes,
        grille: true,
        courbes: courbes.map((c, i) => ({
          id: `c${i}`,
          type: c.type,
          a: c.a,
          b: c.b,
          c: c.c,
          couleur: c.couleur ?? "#2563eb",
        })),
        misesEnEvidence: points.map((p) => ({
          point: { x: p.x, y: p.y, label: p.label, couleur: "#dc2626" },
        })),
      }}
    />
  );
}

/**
 * Deux fonctions cote a cote, pour les comparer sans dessin.
 * ⭐ En HTML : lisible meme dans un bloc de 80 px, la ou un repere ne l'est pas.
 */
function comparaison(xs: number[], fs: number[], gs: number[]) {
  return (
    <CanvasRenderer
      figure={{
        kind: "tableau_donnees",
        // ⛔ PAS DE « x » EN TETE. Le composant ecrit lui-meme un `<th>`
        // « Donnees » des qu'une ligne porte un `label` — et les deux lignes en
        // portent, « f(x) » et « g(x) ». Un en-tete de plus que de valeurs
        // decalait donc toute la ligne d'un cran : la premiere image tombait
        // sous « x », la derniere colonne restait blanche.
        headers: xs.map((x) => String(x)),
        rows: [
          { label: "f(x)", values: fs },
          { label: "g(x)", values: gs },
        ],
        display: { striped: true, compact: true },
      }}
    />
  );
}

/** Un tableau de valeurs, celui du coach. */
function tableau(xs: number[], ys: number[], highlight?: number) {
  return (
    <CanvasRenderer
      figure={{
        kind: "fonction_tableau",
        titre: "Tableau de valeurs",
        xValues: xs,
        yValues: ys,
        highlightIndex: highlight,
        size: { width: 240, height: 110 },
      }}
    />
  );
}

export const ficheFonctionsSeconde: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "fonction-vocabulaire-2de",
  titre: "Fonctions : image, antécédent, courbe",
  accroche:
    "Une fonction est une machine à un seul sens : à chaque nombre de départ elle associe UNE image, et une seule. Mais rien ne l'empêche de donner la même image à plusieurs nombres — c'est toute la différence entre une image et un antécédent.",
  identite: [
    { label: "Mots clés", valeur: "Image, antécédent, courbe, domaine de définition" },
    { label: "Le secret", valeur: "Une image est unique, un antécédent non" },
    { label: "Outil", valeur: "La courbe représentative" },
  ],

  definition: {
    texte:
      "Une fonction $f$ associe à chaque nombre $x$ de son domaine un seul nombre, noté $f(x)$ et appelé IMAGE de $x$. Inversement, si $f(x) = y$, on dit que $x$ est un ANTÉCÉDENT de $y$. La courbe représentative de $f$ rassemble tous les points de coordonnées $(x\\,;\\,f(x))$.",
  },

  figure: {
    // ⛔ LE POINT NE SE POSE PAS SUR LE BORD. Mesure : a $(2\\,;\\,5)$ avec
    // ymax = 5, l'etiquette « A » — UN caractere — debordait par le haut, faute
    // de place au-dessus du point. On garde deux unites de marge.
    schema: courbe(
      [{ type: "affine", a: 2, b: 1 }],
      [{ x: 1, y: 3, label: "A" }],
    ),
    legende:
      "Le point $A$ a pour coordonnées $(1\\,;\\,3)$ : l'image de $1$ est $3$, et $1$ est un antécédent de $3$. L'abscisse d'abord, toujours.",
  },

  proprietes: [
    {
      titre: "Une image est UNIQUE",
      texte:
        "Pour un $x$ donné, il n'y a qu'une image : la verticale d'abscisse $2$ ne rencontre la courbe qu'en UN point. Une verticale ne la coupe jamais deux fois.",
      schema: courbe(
        [{ type: "quadratique", a: 1, b: 0, c: -2 }],
        [{ x: 2, y: 2 }],
      ),
    },
    {
      titre: "Un antécédent ne l'est pas",
      texte:
        "Une même image peut venir de plusieurs nombres. Une horizontale, elle, peut couper la courbe plusieurs fois.",
      schema: courbe(
        [{ type: "quadratique", a: 1, b: 0, c: -2 }],
        [
          { x: -2, y: 2, label: "−2" },
          { x: 2, y: 2, label: "2" },
        ],
      ),
    },
    {
      titre: "Le domaine de définition",
      texte:
        "C'est l'ensemble des $x$ qui ONT une image. Deux interdits en seconde : diviser par zéro, et prendre la racine d'un négatif.",
      schema: tableau([-2, -1, 0, 1, 2], [4, 1, 0, 1, 4]),
    },
    {
      titre: "Comparer DEUX courbes",
      texte:
        "$f(x) = g(x)$ se lit aux points d'intersection. $f(x) > g(x)$ se lit là où $C_f$ passe au-dessus de $C_g$ — l'axe n'intervient plus.",
      schema: courbe(
        [
          { type: "affine", a: 1, b: 1 },
          { type: "affine", a: -1, b: 3, couleur: "#b45309" },
        ],
        [{ x: 1, y: 2, label: "1" }],
      ),
    },
  ],

  reel: {
    texte:
      "Le prix d'un billet d'avion Réunion-Métropole dépend de la date : à chaque jour de l'année correspond UN prix, c'est une fonction. Mais un même prix peut se retrouver à plusieurs dates — plusieurs antécédents pour une seule image. Chercher « quand le billet coûte-t-il 700 € ? », c'est chercher des antécédents.",
  },

  historique: {
    texte:
      "Le mot « fonction » vient de Leibniz, à la fin du XVIIᵉ siècle, pour désigner une quantité qui dépend d'une courbe. La notation $f(x)$, elle, est d'Euler, vers 1734 : elle a mis un siècle à s'imposer, et c'est elle qui a rendu l'idée manipulable.",
  },

  methode: [
    {
      titre: "Calculer une image",
      texte:
        "Je remplace $x$ par le nombre, partout, et je calcule. $f(x) = 2x + 1$ donne $f(3) = 2 \\times 3 + 1 = 7$ : le point marqué a pour ordonnée $7$.",
      // ⛔ Un tableau, PAS un repere : ce bloc ne fait que 86 px de large.
      schema: tableau([0, 1, 2, 3], [1, 3, 5, 7], 3),
    },
    {
      titre: "Chercher un antécédent",
      texte:
        "Je pose l'ÉQUATION $f(x) = y$ et je la résous. Il peut y avoir zéro, une, ou plusieurs solutions — ici, $2$ apparait DEUX fois dans la ligne du bas.",
      schema: tableau([-2, -1, 0, 1, 2], [2, -1, -2, -1, 2]),
    },
    {
      titre: "Vérifier le domaine",
      texte:
        "Avant tout calcul, je regarde si le nombre A une image : pas de division par zéro, pas de racine de négatif. La lecture graphique, elle, est détaillée plus bas.",
      schema: tableau([-2, -1, 1, 2], [-0.5, -1, 1, 0.5]),
    },
  ],

  usages: [
    {
      titre: "Le tableau de valeurs",
      detail:
        "Chaque colonne est UN point : l'abscisse en haut, l'image en bas. Il ne dit rien de ce qui se passe entre deux colonnes.",
      schema: tableau([-1, 0, 1, 2, 3], [-1, 1, 3, 5, 7], 2),
    },
    {
      titre: "Résoudre $f(x) = k$",
      detail:
        "Je trace l'horizontale d'ordonnée $k$ et je lis les abscisses des points d'intersection.",
      schema: courbe(
        [{ type: "quadratique", a: 1, b: 0, c: -2 }],
        [
          { x: -2, y: 2 },
          { x: 2, y: 2 },
        ],
      ),
    },
    {
      titre: "Comparer deux courbes",
      detail:
        "$f(x) > g(x)$ : je cherche où $C_f$ domine $C_g$. Les deux peuvent être négatives, cela ne change rien.",
      schema: courbe(
        [
          { type: "affine", a: 1, b: 1 },
          { type: "affine", a: -1, b: 3, couleur: "#b45309" },
        ],
        [{ x: 1, y: 2 }],
      ),
    },
  ],

  exemples: [
    {
      titre: "Calculer une image",
      donnees: "$f(x) = x^2 - 3x$.",
      question: "Calculer $f(4)$.",
      schema: tableau([1, 2, 3, 4], [-2, -2, 0, 4], 3),
      solution:
        "On remplace $x$ par $4$ PARTOUT : $f(4) = 4^2 - 3 \\times 4 = 16 - 12 = 4$. L'image de $4$ est $4$ — une coïncidence de nombres, pas une règle.",
    },
    {
      titre: "Chercher les antécédents",
      donnees: "$g(x) = x^2 - 2$.",
      question: "Quels sont les antécédents de $2$ ?",
      schema: tableau([-2, -1, 0, 1, 2], [2, -1, -2, -1, 2]),
      solution:
        "On résout $x^2 - 2 = 2$, donc $x^2 = 4$ : $x = 2$ ou $x = -2$. DEUX antécédents pour une seule image — et le tableau le montre : la valeur $2$ apparait aux deux extrémités de la ligne du bas.",
    },
    {
      titre: "Résoudre graphiquement",
      donnees: "La courbe de $h$ est une droite passant par $(0\\,;1)$ et $(2\\,;5)$.",
      question: "Résoudre $h(x) = 3$.",
      schema: tableau([0, 1, 2, 3], [1, 3, 5, 7], 1),
      solution:
        "On cherche où la valeur $3$ apparait dans la ligne du bas : sous $x = 1$. Graphiquement, on tracerait l'horizontale d'ordonnée $3$, qui coupe la droite en un seul point d'abscisse $1$. La solution est $x = 1$ — on lit une ABSCISSE, jamais une ordonnée.",
    },
    {
      titre: "Comparer deux fonctions",
      donnees: "$f(x) = x + 1$ et $g(x) = -x + 3$.",
      question: "Résoudre graphiquement $f(x) > g(x)$.",
      schema: comparaison([-1, 0, 1, 2, 3], [0, 1, 2, 3, 4], [4, 3, 2, 1, 0]),
      solution:
        "Le tableau montre le basculement : avant $x = 1$, la ligne de $g$ domine ; après, c'est celle de $f$. En $x = 1$ les deux valent $2$ — les courbes s'y croisent. Les solutions sont $]1\\,;\\,+\\infty[$, borne exclue puisqu'en $1$ les deux fonctions sont ÉGALES.",
    },
  ],

  pieges: [
    "⛔ Une IMAGE est unique, un ANTÉCÉDENT non. Chercher « l'antécédent » au singulier fait rater la moitié des réponses.",
    "⛔ Un point se note $(x\\,;\\,f(x))$ : l'ABSCISSE d'abord. $(3\\,;\\,5)$ et $(5\\,;\\,3)$ ne sont pas le même point.",
    "⛔ Résoudre $f(x) = k$ graphiquement, c'est lire des ABSCISSES. Répondre $k$ revient à recopier la question.",
    "⛔ Comparer deux courbes, ce n'est PAS les comparer à l'axe. Les deux peuvent être négatives et $f(x) > g(x)$ vraie quand même.",
    "⛔ Un tableau de valeurs ne donne que ses colonnes. Entre deux d'entre elles, c'est la formule qui décide, pas la règle qu'on pose sur le dessin.",
  ],

  aRetenir: [
    "$f(x)$ est l'image de $x$ ; $x$ est un antécédent de $f(x)$.",
    "Une verticale coupe la courbe AU PLUS une fois — c'est ce qui fait d'elle une fonction.",
    "Une horizontale peut la couper plusieurs fois : autant d'antécédents.",
    "Le domaine, c'est l'ensemble des $x$ qui ont une image : ni division par zéro, ni racine de négatif.",
    "$f(x) = k$ : intersection avec l'horizontale d'ordonnée $k$, et on lit les abscisses.",
    "$f(x) > g(x)$ : là où $C_f$ est au-dessus de $C_g$.",
  ],

  entrainement: [
    {
      question: "Soit $f(x) = 3x - 5$. Calculer $f(4)$.",
      correction: "On remplace $x$ par $4$ : $f(4) = 3 \\times 4 - 5 = 12 - 5 = 7$.",
    },
    {
      question: "Soit $g(x) = x^2 + 2x$. Calculer $g(-3)$.",
      correction:
        "$g(-3) = (-3)^2 + 2 \\times (-3) = 9 - 6 = 3$. ⚠️ $(-3)^2$ vaut $9$ et non $-9$ : le carré rend le résultat positif.",
    },
    {
      question: "Soit $f(x) = 2x + 7$. Quel est l'antécédent de $1$ ?",
      correction:
        "On pose l'ÉQUATION $2x + 7 = 1$, donc $2x = -6$ et $x = -3$. L'antécédent de $1$ est $-3$.",
    },
    {
      question: "Soit $g(x) = x^2$. Quels sont les antécédents de $9$ ?",
      correction:
        "On résout $x^2 = 9$ : $x = 3$ ou $x = -3$. Il y en a DEUX — chercher « l'antécédent » au singulier en aurait fait manquer un.",
    },
    {
      question: "Quel est le domaine de définition de $f(x) = \\dfrac{5}{x - 2}$ ?",
      correction:
        "On écarte ce qui annule le dénominateur : $x - 2 = 0$ donne $x = 2$. Le domaine est $\\mathbb{R} \\setminus \\{2\\}$.",
    },
    {
      question:
        "Un tableau de valeurs donne $f(0) = 1$ et $f(1) = 4$. Peut-on en déduire $f(0{,}5)$ ?",
      correction:
        "Non. Le tableau ne décrit que les colonnes qu'il contient. Entre $0$ et $1$, c'est la formule de $f$ qui décide, et elle n'est pas donnée.",
    },
    {
      question:
        "La courbe de $f$ coupe l'horizontale d'ordonnée $2$ aux points d'abscisses $-1$ et $3$. Résoudre $f(x) = 2$.",
      correction:
        "Les solutions sont les ABSCISSES de ces points : $x = -1$ et $x = 3$. On ne répond pas $2$, qui est l'ordonnée donnée dans l'énoncé.",
    },
    {
      question:
        "La courbe de $f$ est au-dessus de l'axe des abscisses sur $]-\\infty\\,;\\,1[$. Résoudre $f(x) > 0$.",
      correction:
        "$f(x) > 0$ se lit « la courbe est au-dessus de l'axe ». Les solutions sont $]-\\infty\\,;\\,1[$.",
    },
    {
      question:
        "Deux courbes $C_f$ et $C_g$ se coupent en $x = -2$ et $x = 4$. Que peut-on dire de $f(-2)$ et $g(-2)$ ?",
      correction:
        "En un point d'intersection, les deux fonctions ont la même valeur : $f(-2) = g(-2)$. C'est ce que signifie « se couper ».",
    },
    {
      question:
        "Sur $]0\\,;\\,3[$, $C_f$ est en dessous de $C_g$, et les deux sont sous l'axe des abscisses. $f(x) > g(x)$ est-elle vraie sur cet intervalle ?",
      correction:
        "Non : $C_f$ est EN DESSOUS de $C_g$, donc $f(x) < g(x)$. Le fait que les deux soient négatives ne change rien — on compare les courbes entre elles, pas à l'axe.",
    },
  ],

  coachHref: "/coach-ia/maths?classe=seconde",
};

export const slidesFonctionsSeconde: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Fonctions - 2de",
    section: {
      type: "objectif",
      phrase: "Lire une image, un antécédent, et résoudre sur un graphique",
      sousPhrase:
        "Une image est unique, un antécédent ne l'est pas. Monter depuis l'axe des abscisses donne toujours un seul point ; partir des ordonnées peut en rencontrer plusieurs.",
    },
  },
];
