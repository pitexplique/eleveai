// ─── Fiche de cours : les identités remarquables (4e) ─────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/identites-remarquables.bank.ts, notionId litteral_identite_remarquable).
//
// ⭐ TROISIÈME DES CINQ FICHES DU BLOC ALGÈBRE : expressions → distributivité →
// identités remarquables → factorisation → équations. Elle emprunte tout son
// vocabulaire aux deux précédentes (la lettre, le coefficient, les termes
// semblables, développer, réduire, les quatre produits) et n'en redéfinit aucun.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE (règle de Frédéric,
// 26/08) — et cette lecture a changé l'angle de la fiche. Ce que la banque
// travaille vraiment :
//   litteral_identite_lier_distributivite → « Pourquoi peut-on écrire
//        (x + 3)² = (x + 3)(x + 3) ? », « Développer par double distributivité :
//        (x + 2)(x + 2) »
//   litteral_identite_reconnaitre → « Quelle expression est de la forme
//        (a + b)² ? », « x² − 49 correspond à quelle identité ? »
//   litteral_identite_developper  → (x + 3)², (x − 4)², (x − 5)(x + 5)
//   litteral_identite_choisir     → ⚠️ LA BONNE RÉPONSE DU QCM EST « écrire
//        (x + 7)(x + 7), PUIS appliquer la double distributivité ». La banque
//        ne demande donc PAS de réciter trois formules : elle demande de
//        reconnaître la forme et de savoir la ramener au produit. La fiche dit
//        la même chose — les formules sont dans le bloc « La formule », mais la
//        méthode passe par le produit, comme le veut l'énoncé.
//   litteral_identite_defi        → ⚠️ le nom ne dit pas le contenu : ce sont
//        LES ERREURS. « (x + 5)² = x² + 25 : a-t-il raison ? » (le double
//        produit oublié) et « (x − 4)² = x² − 16 » (le carré d'une différence
//        confondu avec la différence de deux carrés).
// Tous les nombres de la fiche sortent de cette liste, sans exception.
//
// ⭐ ET LE DÉFI FAIT ENCORE LE CONTRE-EXEMPLE, une huitième fois sur treize
// fiches : le double produit qu'on oublie. Le dessin de référence est construit
// pour lui — il montre les DEUX rectangles identiques que l'erreur efface, et
// le même dessin revient dans le dernier exemple, amputé de ces deux-là.
//
// Le choix des dessins :
//   · un carré coupé en quatre, où le double produit est une SURFACE que
//     l'erreur fait disparaître        → `figure_libre` ;
//   · les quatre produits rangés en croix, deux fois : une fois le terme du
//     milieu double, une fois il s'annule  → `tableau_donnees` ;
//   · le double produit comme une addition de deux termes égaux → `calcul_pose`.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

const BLEU = "#dbeafe";

/** Un dessin et sa phrase, sous lui. La phrase passe par `TexteMath` — les
 *  libellés à l'intérieur du dessin, tracés en `<text>` SVG, restent en clair. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// ⭐ LE CARRÉ COUPÉ EN QUATRE — le dessin qui rend l'erreur VISIBLE.
// Un carré de côté x + 3. Le trait rouge le partage en quatre morceaux : le
// grand carré x² en haut à gauche, le petit carré 9 en bas à droite (neuf cases
// qu'on compte), et entre les deux DEUX rectangles de même aire, 3x chacun.
// C'est là toute la notion : l'élève qui écrit (x + 3)² = x² + 9 n'a gardé que
// les deux coins. Les deux bandes sont la moitié du dessin, et il les jette.
//
// ⭐ `avecBandes` EST LE CŒUR DE LA FICHE, ET NON UN RÉGLAGE. Le même carré,
// bandes nommées, dit la propriété ; bandes anonymes, il dit l'erreur. C'est la
// deuxième parade de REGLES.md : garder l'objet et changer l'INFORMATION, pour
// que l'élève reconnaisse la figure et voie ce qui a bougé.
//
// ⚠️ `showGrid: false` : seul le petit carré est carrelé, parce que 3 × 3 = 9
// est la seule aire qu'on sache compter. Le reste dépend de x, qu'on ignore.
// ⚠️ Le contour se trace d'UN SEUL TRAIT — `buildPathFromGridPoints` ne connaît
// qu'un `M` suivi de `L`. Le chemin repasse donc sur trois bords déjà tracés
// pour atteindre les deux traits intérieurs ; en rouge sur rouge, ça ne se voit
// pas, et c'est le seul moyen d'avoir les quatre cases avec ce canvas.
// ⚠️ RÉUTILISÉ DANS DES BLOCS DE LARGEURS DIFFÉRENTES → une FONCTION qui prend
// le cadre. 8 colonnes × 24 + 2 × 18 = 228 pour une carte, × 22 + 2 × 16 = 208
// pour un exemple. Poser `width` rognerait la figure au lieu de la réduire.
const carreDecoupe = (cellSize: number, padding: number, avecBandes: boolean) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize, padding },
      grid: {
        rows: 8,
        cols: 8,
        // Le petit carré du coin : 3 lignes × 3 colonnes = 3² = 9.
        filledCells: [
          [5, 5], [5, 6], [5, 7],
          [6, 5], [6, 6], [6, 7],
          [7, 5], [7, 6], [7, 7],
        ],
      },
      perimeterPath: [
        [0, 0], [0, 8], [8, 8], [8, 0], [0, 0], // le grand carré
        [0, 5], [8, 5],                          // le trait vertical intérieur
        [8, 8], [5, 8], [5, 0],                  // puis le trait horizontal
      ],
      // ⚠️ DEUX BANDES, DEUX LIBELLÉS IDENTIQUES — et une clé d'objet ne peut
      // pas servir deux fois. La seconde porte donc une espace finale : elle
      // distingue les clés sans rien changer à ce qui s'affiche.
      vertices: avecBandes
        ? { "x²": [2.3, 1.9], "3x": [2.3, 5.6], "3x ": [6.6, 1.9], "9": [6.6, 6.2] }
        : { "x²": [2.3, 1.9], "9": [6.6, 6.2] },
      display: {
        showGrid: false,
        showFilled: true,
        showPerimeter: true,
        showVertices: false,
        showVertexLabels: true,
      },
      colors: { filled: BLEU },
    }}
  />
);

// LES QUATRE PRODUITS D'UN CARRÉ. Le tableau en croix est celui de la fiche de
// distributivité, et c'est voulu : la banque demande explicitement de passer par
// (x + 3)(x + 3) et de développer comme n'importe quel produit de deux
// parenthèses. Ici, les deux cases du milieu portent la MÊME chose — c'est de là
// que vient le double produit.
const croixCarre = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["×", "x", "+ 3"],
      rows: [
        { values: ["x", "x²", "3x"] },
        { values: ["+ 3", "3x", "9"] },
      ],
      caption: "(x + 3)(x + 3) : les deux cases du milieu sont égales",
      display: { compact: true, striped: false },
    }}
  />
);

// LE MÊME TABLEAU, ET LE MILIEU S'ÉVANOUIT. Un signe change dans une parenthèse,
// et les deux cases du milieu deviennent opposées : 5x et −5x s'annulent. C'est
// la seule différence entre les deux identités, et elle tient dans ce tableau.
const croixDifference = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["×", "x", "+ 5"],
      rows: [
        { values: ["x", "x²", "5x"] },
        { values: ["− 5", "−5x", "−25"] },
      ],
      caption: "(x − 5)(x + 5) : 5x et −5x s'annulent, il reste x² − 25",
      display: { compact: true, striped: false },
    }}
  />
);

// LES TROIS FORMES, ET CE QU'ELLES DONNENT. Reconnaître se joue au coup d'œil :
// deux parenthèses identiques, ou deux parenthèses qui ne diffèrent que par un
// signe. Le tableau se lit aussi de droite à gauche — ce sera la factorisation.
const troisFormes = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["la forme", "son nom", "son développement"],
      rows: [
        { values: ["(x + 3)²", "carré d'une somme", "x² + 6x + 9"] },
        { values: ["(x − 4)²", "carré d'une différence", "x² − 8x + 16"] },
        { values: ["(x − 5)(x + 5)", "différence de deux carrés", "x² − 25"] },
      ],
      highlight: { row: 2 },
      caption: "seule la 3e ligne perd son terme du milieu",
      display: { compact: true, striped: true },
    }}
  />
);

// LE DOUBLE PRODUIT EST UNE ADDITION DE DEUX TERMES ÉGAUX. Posée, l'opération
// dit pourquoi le coefficient double : ce n'est pas une formule à croire, c'est
// 3x + 3x.
const doubleProduit = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "addition",
      numbers: ["3x", "3x"],
      result: "6x",
      display: { showResult: true, compact: true },
      questionLabel: "les deux termes du milieu sont égaux",
    }}
  />
);

// ⭐ 101², DE TÊTE, EN TROIS MORCEAUX. C'est l'usage le plus ancien de
// l'identité, et le seul où elle sert vraiment à aller plus vite :
// 101² = (100 + 1)² = 10 000 + 2 × 100 + 1.
const carreDeTete = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "addition",
      numbers: ["10000", "200", "1"],
      result: "10201",
      display: { showResult: true, compact: true },
      questionLabel: "101² = (100 + 1)²",
    }}
  />
);

// LE TEST QUI TRANCHE, repris de la fiche de distributivité — parce que c'est le
// même geste et qu'un élève doit finir par le faire seul. On remplace la lettre
// par un nombre, et l'égalité douteuse tombe d'elle-même.
const testNumerique = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["pour x = 1", "(x + 3)²", "x² + 9"],
      rows: [
        { values: ["on remplace", "(1 + 3)²", "1 + 9"] },
        { values: ["on trouve", "16", "10"] },
      ],
      highlight: { row: 1 },
      caption: "16 ≠ 10 : il manque 6x, c'est-à-dire les deux bandes",
      display: { compact: true, striped: true },
    }}
  />
);

const pieges = [
  "Oublier le double produit : (x + 5)² ne fait pas x² + 25, mais x² + 10x + 25. Le carré d'une somme n'est jamais la somme des carrés — les deux rectangles du dessin valent 5x chacun, et ils comptent.",
  "Confondre le carré d'une différence et la différence de deux carrés : (x − 4)² fait x² − 8x + 16, alors que (x − 4)(x + 4) fait x² − 16. Deux parenthèses identiques, ou deux parenthèses de signes contraires : ce n'est pas la même chose.",
  "Perdre le signe du double produit : dans (x − 4)², le terme du milieu est NÉGATIF (−8x), mais le dernier terme reste positif, puisque (−4) × (−4) = +16.",
];

const aRetenir = [
  "Le carré d'une expression est cette expression multipliée par elle-même : (x + 3)² = (x + 3)(x + 3). Tout le reste s'en déduit par la double distributivité.",
  "Un carré développé a TROIS termes : le carré du premier, le double produit, le carré du second. C'est le double produit qui s'oublie.",
  "Seule la forme (a − b)(a + b) perd son terme du milieu, parce que +ab et −ab s'annulent : elle donne a² − b².",
];

export const ficheIdentitesRemarquables4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "litteral-identite-remarquable",
  titre: "Les identités remarquables",
  accroche:
    "Trois produits reviennent si souvent qu'on finit par connaître leur développement par cœur : le carré d'une somme, le carré d'une différence, et le produit d'une somme par la différence. Rien de neuf pourtant — ce sont des doubles distributivités qu'on a appris à reconnaître. Et une seule erreur les guette toutes : oublier le double produit.",
  identite: [
    { label: "Le mot clé", valeur: "Un carré est un produit par soi-même" },
    { label: "Le geste", valeur: "Reconnaître la forme, puis développer" },
    { label: "La règle d'or", valeur: "Un carré développé a TROIS termes" },
  ],
  definition: {
    texte:
      "Une identité remarquable est une égalité toujours vraie, quelle que soit la valeur des lettres, entre une forme factorisée fréquente et son développement. Il y en a trois en 4ᵉ. Elles ne demandent aucune règle nouvelle : $(x + 3)^2$ signifie $(x + 3)(x + 3)$, et la double distributivité fait le reste. Ce qui est « remarquable », c'est seulement qu'on remarque la forme au premier coup d'œil et qu'on écrive le résultat sans passer par les quatre produits.",
  },
  figure: {
    schema: legende(
      carreDecoupe(24, 18, true),
      "un carré de côté $x + 3$, coupé en quatre morceaux"
    ),
    legende:
      "L'aire vaut $(x + 3)^2$ d'un seul tenant. Découpée, elle vaut $x^2$, plus DEUX rectangles de $3x$, plus les neuf carrés du coin : $x^2 + 6x + 9$. La longueur $x$ est dessinée au hasard — on ne la connaît pas.",
  },
  proprietes: [
    {
      titre: "Un carré est un produit",
      micros: ["litteral_identite_lier_distributivite"],
      texte:
        "$(x + 3)^2$ ne veut pas dire « $x^2$ et $3^2$ » : le carré d'une expression, c'est cette expression multipliée par elle-même. On écrit $(x + 3)(x + 3)$, et on développe comme n'importe quel produit de deux parenthèses.",
      schema: croixCarre,
    },
    {
      titre: "Le double produit",
      micros: ["litteral_identite_developper"],
      texte:
        "Les quatre produits donnent $x^2 + 3x + 3x + 9$. Les deux termes du milieu sont IDENTIQUES : leur somme est le double produit, ici $6x$. Un carré développé a donc trois termes, jamais deux.",
      schema: doubleProduit,
    },
    {
      titre: "Quand le milieu s'annule",
      micros: ["litteral_identite_reconnaitre"],
      texte:
        "Changez un seul signe et tout bascule : dans $(x - 5)(x + 5)$, les deux termes du milieu deviennent $5x$ et $-5x$. Ils s'annulent, et il ne reste que $x^2 - 25$ — une différence de deux carrés.",
      schema: croixDifference,
    },
    {
      titre: "Trois formes à reconnaître",
      micros: ["litteral_identite_reconnaitre", "litteral_identite_choisir"],
      texte:
        "Deux parenthèses identiques : c'est un carré, et il y aura un double produit. Deux parenthèses qui ne diffèrent que par un signe : c'est une différence de carrés, et le milieu disparaîtra.",
      schema: troisFormes,
    },
  ],
  reel: {
    texte:
      "Ces trois égalités sont d'abord des raccourcis de calcul mental, et de très bons. $101^2$ ne se pose pas : c'est $(100 + 1)^2$, donc $10\\,000 + 200 + 1 = 10\\,201$. Et $99 \\times 101$ ne se pose pas non plus, puisque c'est $(100 - 1)(100 + 1)$, c'est-à-dire $10\\,000 - 1 = 9\\,999$. Le même découpage sert dès qu'on borde une surface carrée : un bassin carré de $x$ mètres de côté auquel on ajoute une margelle de 3 mètres gagne exactement deux bandes de $3x$ et un coin de 9 mètres carrés — c'est le dessin de cette fiche, en vrai. Plus tard, en 3ᵉ puis au lycée, ces formes lues à l'envers servent à factoriser, donc à résoudre.",
  },
  historique: {
    texte:
      "Le carré découpé de cette fiche est, mot pour mot, la proposition 4 du livre II des Éléments d'Euclide, vers 300 avant notre ère : couper une droite en deux, et le carré construit sur le tout vaut les deux carrés des morceaux plus deux fois le rectangle qu'ils forment. Il n'y avait ni lettres, ni signe égal, ni exposant : une identité remarquable était une figure, et la démonstration consistait à la découper. L'écriture $x^2$, elle, est de René Descartes, en 1637.",
  },
  formule: {
    contexte: "Les trois identités",
    expression:
      "$(a + b)^2 = a^2 + 2ab + b^2$   ·   $(a - b)^2 = a^2 - 2ab + b^2$   ·   $(a + b)(a - b) = a^2 - b^2$",
    legende:
      "Les deux premières gardent un double produit ; seule la troisième le perd, parce que $+ab$ et $-ab$ s'annulent. Dans $(a - b)^2$, le terme du milieu est négatif mais le dernier reste positif.",
    // ⛔ Pas de schéma ici, et c'est réfléchi : ces trois formules sont déjà
    // dessinées plus haut — le carré découpé pour les deux premières, le tableau
    // en croix pour la troisième. Un dessin qui redit le texte n'apprend rien
    // (Frédéric, 25/08).
  },
  methode: [
    {
      titre: "Reconnaître",
      micros: ["litteral_identite_choisir"],
      // Sans dessin volontairement : le tableau des trois formes, juste
      // au-dessus, fait déjà ce travail. Le redessiner serait la même image deux
      // fois dans la même page.
      texte:
        "On regarde les deux parenthèses. Identiques ? C'est un carré. Mêmes nombres mais signes contraires ? C'est une différence de carrés. Ni l'un ni l'autre ? C'est une double distributivité ordinaire, et il n'y a pas d'identité à chercher.",
    },
    {
      titre: "Réécrire en produit",
      micros: ["litteral_identite_lier_distributivite"],
      texte:
        "On remplace le carré par le produit : $(x + 3)^2$ devient $(x + 3)(x + 3)$. Cette ligne coûte trois secondes et rend l'oubli du double produit impossible, puisqu'on voit les deux parenthèses.",
      schema: croixCarre,
    },
    {
      titre: "Développer et réduire",
      micros: ["litteral_identite_developper"],
      texte:
        "On effectue les quatre produits, puis on regroupe les deux termes semblables du milieu. On vérifie enfin qu'il reste bien trois termes — ou deux seulement dans le cas de la différence de carrés.",
      schema: carreDecoupe(24, 18, true),
    },
  ],
  usages: [
    {
      titre: "Développer plus vite",
      micros: ["litteral_identite_choisir"],
      detail:
        "Une fois la forme reconnue, on écrit le développement en une ligne au lieu de quatre. C'est le seul vrai bénéfice de ces formules : du temps gagné sur un calcul qu'on sait déjà faire.",
      schema: troisFormes,
    },
    {
      titre: "Calculer de tête",
      micros: ["litteral_identite_developper"],
      detail:
        "$101^2 = (100 + 1)^2 = 10\\,000 + 200 + 1$. Et $99 \\times 101 = (100 - 1)(100 + 1) = 10\\,000 - 1$. Les identités marchent avec des nombres, pas seulement avec des lettres.",
      schema: carreDeTete,
    },
    {
      titre: "Préparer la factorisation",
      micros: ["litteral_identite_reconnaitre"],
      detail:
        "Le tableau des formes se lit aussi de droite à gauche : voir $x^2 - 49$ et reconnaître $(x - 7)(x + 7)$, c'est déjà factoriser. C'est l'objet de la fiche suivante.",
      schema: croixDifference,
    },
  ],
  exemples: [
    {
      titre: "Développer un carré",
      micros: ["litteral_identite_lier_distributivite", "litteral_identite_developper"],
      donnees: "On veut développer $(x + 3)^2$.",
      question: "Quelle expression obtient-on ?",
      schema: croixCarre,
      solution:
        "On écrit d'abord le carré comme un produit : $(x + 3)^2 = (x + 3)(x + 3)$. Les quatre produits donnent $x^2 + 3x + 3x + 9$. Les deux termes du milieu sont semblables : $3x + 3x = 6x$. Le résultat est $x^2 + 6x + 9$.",
    },
    {
      titre: "Quand il ne reste que deux termes",
      micros: ["litteral_identite_reconnaitre", "litteral_identite_developper"],
      donnees: "On veut développer $(x - 5)(x + 5)$.",
      question: "Pourquoi le résultat n'a-t-il que deux termes ?",
      schema: croixDifference,
      solution:
        "Les quatre produits donnent $x^2 + 5x - 5x - 25$. Les deux termes du milieu sont opposés : $5x - 5x = 0$, ils disparaissent. Il reste $x^2 - 25$. ⚠️ Attention à ne pas confondre avec $(x - 5)^2$, qui vaut $x^2 - 10x + 25$ : là, les deux parenthèses sont identiques, donc les termes du milieu s'ajoutent au lieu de s'annuler.",
    },
    {
      titre: "L'erreur du carré",
      micros: ["litteral_identite_defi"],
      donnees: "Un élève écrit $(x + 3)^2 = x^2 + 9$.",
      question: "Que manque-t-il, et comment le voir sans calculer ?",
      schema: legende(
        carreDecoupe(22, 16, false),
        "voilà ce qu'il a gardé : les deux coins seulement"
      ),
      solution:
        "Il manque le double produit, $6x$. Le dessin le montre d'un coup d'œil : l'élève n'a gardé que le carré $x^2$ et les neuf carrés du coin, alors que les deux rectangles valent $3x$ chacun — soit la moitié de la figure. Le calcul le confirme : $(x + 3)^2 = (x + 3)(x + 3) = x^2 + 6x + 9$. ⭐ Et le test numérique tranche sans discussion : pour $x = 1$, à gauche $(1 + 3)^2 = 16$, à droite $1 + 9 = 10$.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Pourquoi peut-on écrire $(x + 3)^2 = (x + 3)(x + 3)$ ?",
      correction:
        "Parce que le carré d'un nombre signifie ce nombre multiplié par lui-même. Ici, le « nombre » est l'expression entière $x + 3$ : la mettre au carré, c'est la multiplier par elle-même. C'est de là que part tout le développement.",
      micros: ["litteral_identite_lier_distributivite"],
    },
    {
      question: "Développer : $(x + 3)^2$.",
      correction:
        "$(x + 3)(x + 3) = x^2 + 3x + 3x + 9 = x^2 + 6x + 9$. ⚠️ La réponse $x^2 + 9$ oublie le double produit $6x$.",
      micros: ["litteral_identite_developper"],
    },
    {
      question: "Développer : $(x - 5)(x + 5)$.",
      correction:
        "$x^2 + 5x - 5x - 25 = x^2 - 25$. Les deux termes du milieu sont opposés, donc ils s'annulent : c'est une différence de deux carrés.",
      micros: ["litteral_identite_developper", "litteral_identite_reconnaitre"],
    },
    {
      question: "L'expression développée $x^2 - 49$ provient de quelle identité ?",
      correction:
        "De $(x - 7)(x + 7)$, car $49 = 7^2$ et il n'y a pas de terme en $x$ : c'est la signature d'une différence de deux carrés. ⚠️ Ce n'est ni $(x - 7)^2$ ni $(x + 7)^2$, qui donneraient tous deux un terme en $x$ et un $+49$.",
      micros: ["litteral_identite_reconnaitre"],
    },
    {
      question: "Un élève écrit $(x + 5)^2 = x^2 + 25$. A-t-il raison ?",
      correction:
        "Non : il manque le double produit. $(x + 5)^2 = (x + 5)(x + 5) = x^2 + 5x + 5x + 25 = x^2 + 10x + 25$. Contrôle avec $x = 1$ : à gauche $6^2 = 36$, à droite $1 + 25 = 26$.",
      micros: ["litteral_identite_defi"],
    },
    {
      question: "Un élève écrit $(x - 4)^2 = x^2 - 16$. A-t-il raison ?",
      correction:
        "Non : il confond deux identités. $(x - 4)^2 = x^2 - 8x + 16$ — deux parenthèses identiques, donc un double produit, et un dernier terme POSITIF puisque $(-4) \\times (-4) = +16$. C'est $(x - 4)(x + 4)$ qui vaut $x^2 - 16$.",
      micros: ["litteral_identite_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

// ⛔ AUCUN LATEX DANS LES DIAPOS : `ModeClasse.tsx` n'a pas de rendu KaTeX, et le
// code serait projeté en clair au tableau devant la classe.
export const slidesIdentitesRemarquables4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Identités remarquables - 4e",
    section: {
      type: "objectif",
      phrase: "Trois produits qu'on reconnaît au premier coup d'œil",
      sousPhrase:
        "Le carré d'une somme, le carré d'une différence, et la somme par la différence. Aucune règle nouvelle : ce sont des doubles distributivités.",
      encadre: {
        titre: "L'idée",
        texte: "(x + 3)² = (x + 3)(x + 3). Tout le reste s'en déduit.",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "101² de tête : (100 + 1)² = 10 000 + 200 + 1 = 10 201. Et 99 × 101 = (100 − 1)(100 + 1) = 9 999. C'est aussi la margelle qu'on ajoute autour d'un bassin carré.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le carré découpé de ce cours est la proposition 4 du livre II d'Euclide, vers 300 avant notre ère : à l'époque, une identité remarquable était une FIGURE, et on la démontrait en la découpant. L'écriture x² date de Descartes, 1637.",
      },
    },
  },
  {
    titre: "La règle d'or",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "Un carré développé a TROIS termes",
      sousPhrase:
        "(x + 3)² = x² + 6x + 9. Celui du milieu — le double produit — est celui qu'on oublie.",
      encadre: {
        titre: "Le test",
        texte: "Remplace x par 1 : (1 + 3)² = 16, alors que x² + 9 donnerait 10. Il manque 6x.",
      },
    },
  },
  {
    titre: "Les trois identités",
    badge: "3 formules",
    section: {
      type: "cartes",
      cartes: [
        { titre: "(a + b)² = a² + 2ab + b²", texte: "Le carré d'une somme : trois termes, tous positifs." },
        { titre: "(a − b)² = a² − 2ab + b²", texte: "Le milieu devient négatif, mais le dernier terme reste positif." },
        { titre: "(a + b)(a − b) = a² − b²", texte: "Le seul cas où le milieu s'annule : +ab et −ab se détruisent." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheIdentitesRemarquables4e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Selon ce que l'on cherche",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: ficheIdentitesRemarquables4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Le milieu qui s'annule",
    section: {
      type: "exemple",
      enonce: "On veut développer (x − 5)(x + 5).",
      question: "Pourquoi n'y a-t-il que deux termes dans le résultat ?",
      correction:
        "x² + 5x − 5x − 25. Les deux termes du milieu sont opposés : ils s'annulent. Il reste x² − 25.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    section: {
      type: "exercice",
      enonce: "Un élève écrit (x + 5)² = x² + 25.",
      question: "A-t-il raison ?",
      indice: "Écris d'abord le carré comme un produit de deux parenthèses.",
      correction: "Non : (x + 5)(x + 5) = x² + 10x + 25. Il manque le double produit, 10x.",
    },
  },
];
