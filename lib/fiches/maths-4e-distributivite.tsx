// ─── Fiche de cours : la distributivité (4e) ──────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/distributivite.bank.ts, notionId litteral_distributivite).
//
// ⭐ DEUXIÈME DES CINQ FICHES DU BLOC ALGÈBRE, qui s'enchaînent :
// expressions → distributivité → identités remarquables → factorisation →
// équations. Celle-ci EMPRUNTE le vocabulaire posé par `maths-4e-expressions-
// litterales` (la lettre, le coefficient, le terme constant, les termes
// semblables) et ne le redéfinit pas : un élève qui arrive ici l'a déjà lu, et
// deux définitions concurrentes du même mot sont pires qu'une.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE (règle de Frédéric,
// 26/08). Ce que la banque travaille vraiment, énoncé par énoncé :
//   litteral_distributivite_simple      → « 3(x + 4) = 3x + 12 », « 5(2x + 3) »
//   litteral_distributivite_double      → « (x + 2)(x + 5) : combien de produits ? »,
//                                          « (x + 1)(x + 4) = x² + 5x + 4 »
//   litteral_distributivite_reduire     → « forme réduite de 2x + 5 + 3x »
//   litteral_distributivite_reconnaitre → « 2(x + 7) » contre « 5x + 3 »,
//                                          factorisée / développée
//   litteral_distributivite_defi        → ⚠️ le nom ne dit pas le contenu :
//        ce sont LES ERREURS. « Un élève affirme que a(x + b) = ax + b :
//        a-t-il raison ? », « −a(x + b) = −ax + ab : a-t-il raison ? », plus
//        l'aire et le périmètre d'un rectangle.
// Tous les nombres de la fiche sortent de cette liste, sans exception.
//
// ⭐ ET LE DÉFI DE LA BANQUE FAIT LE CONTRE-EXEMPLE, une septième fois : le
// terme constant qu'on oublie de multiplier. Toute la fiche est construite
// autour de lui — la figure de référence le rend visible avant même la
// définition, et la première propriété le rend impossible.
//
// Le choix des dessins : ce que chacun MONTRE et qu'aucun autre ne sait montrer.
//   · l'aire d'un rectangle coupé en deux        → `figure_libre` ;
//   · trois lignes RIGOUREUSEMENT identiques     → `schema_barre` ;
//   · quatre produits rangés en croix            → `tableau_donnees` ;
//   · réduire, c'est ADDITIONNER des coefficients → `calcul_pose` ;
//   · le facteur qui atteint les objets cachés
//     ET les objets visibles                     → `algebre`, le canvas du bloc.
//
// ⚠️ `algebre` n'a pas de champ `size` et rend en HTML : rien ne se règle. Ses
// étiquettes de thème sont en 10 px FIXES — d'où `showLabels: false` ici, les
// icônes et le badge « x » suffisant à dire ce qu'est un groupe caché.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

const BLEU = "#dbeafe";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut donc porter une vraie écriture
 * mathématique. Les libellés À L'INTÉRIEUR du dessin, eux, restent en écriture
 * simple — ils sont tracés en `<text>` SVG, où le LaTeX apparaîtrait en clair.
 */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// ⭐ L'AIRE COUPÉE EN DEUX — le dessin qui prouve la distributivité au lieu de
// l'énoncer. Un rectangle de 3 de haut sur x + 4 de large : son aire, c'est
// 3(x + 4) d'un bloc. Mais on peut aussi le couper : à gauche 3 fois x, à droite
// 3 fois 4, soit douze carrés qu'on COMPTE. Les deux lectures donnent la même
// surface, donc 3(x + 4) = 3x + 12.
//
// ⭐ `showGrid: false` EST LE CŒUR DU DESSIN, et c'est un choix, pas un oubli :
// avec le quadrillage, la partie gauche serait devenue cinq cases comptables,
// c'est-à-dire x = 5. Sans lui, elle reste une surface blanche dont on ne sait
// rien — exactement ce qu'est une inconnue. Seule la partie de droite est
// carrelée, parce que c'est la seule qu'on sache compter.
//
// ⚠️ RÉUTILISÉ DANS TROIS BLOCS DE LARGEURS DIFFÉRENTES → donc une FONCTION qui
// prend le cadre. `figure_libre` déduit sa largeur de `cellSize` et `padding` :
// 9 colonnes × 22 + 2 × 15 = 228 pour une carte, × 20 + 2 × 14 = 208 pour un
// exemple. Poser `width` à la place rognerait la figure au lieu de la réduire.
const aireDecoupee = (cellSize: number, padding: number) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize, padding },
      grid: {
        rows: 3,
        cols: 9,
        // Les douze carrés de droite : 3 lignes × 4 colonnes = 3 × 4 = 12.
        filledCells: [
          [0, 5], [0, 6], [0, 7], [0, 8],
          [1, 5], [1, 6], [1, 7], [1, 8],
          [2, 5], [2, 6], [2, 7], [2, 8],
        ],
      },
      // Le contour rouge fait le tour du rectangle ENTIER : c'est lui, 3(x + 4).
      perimeterPath: [[0, 0], [0, 9], [3, 9], [3, 0], [0, 0]],
      // Deux étiquettes seulement, posées au centre de chaque partie. Les points
      // sont fractionnaires : le libellé est écrit à +8 / −8 du point, donc le
      // viser au milieu d'une région le garde loin des bords du cadre.
      vertices: { "3x": [1.7, 1.4], "12": [1.7, 6.1] },
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

// TROIS LIGNES IDENTIQUES, ET C'EST TOUT LE PROPOS. Le défi de la banque est
// « un élève affirme que a(x + b) = ax + b » : ici l'élève voit trois fois le
// même « x + 4 » posés bout à bout. Le 4 y est trois fois, pas une.
// ⚠️ Hauteur 200 : les étiquettes de parts sont posées à 144 px du haut et la
// phrase du bas à 18 px du bas — sous 180, elles se frôlent (mesuré en 1280).
// ⚠️ Trois parts de MÊME couleur : elles sont le même objet répété. Alterner les
// couleurs aurait dit « trois choses différentes », c'est-à-dire le contraire.
const troisLignes = (width: number) => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width, height: 200 },
      total: "3(x + 4)",
      parts: [
        { label: "ligne 1", value: "x + 4", color: BLEU },
        { label: "ligne 2", value: "x + 4", color: BLEU },
        { label: "ligne 3", value: "x + 4", color: BLEU },
      ],
      questionLabel: "3 fois x, et 3 fois 4",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
    }}
  />
);

// LES QUATRE PRODUITS RANGÉS EN CROIX. Le tableau est le seul dessin qui montre
// qu'aucun produit ne manque : deux lignes fois deux colonnes, quatre cases, et
// une case vide se verrait. C'est la réponse dessinée au QCM de la banque
// (« dans (x + 2)(x + 5), combien de produits ? — 4 »).
const quatreProduits = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["×", "x", "+ 3"],
      rows: [
        { values: ["x", "x²", "3x"] },
        { values: ["+ 2", "2x", "6"] },
      ],
      caption: "(x + 2)(x + 3) = x² + 3x + 2x + 6",
      display: { compact: true, striped: false },
    }}
  />
);

// RÉDUIRE, C'EST ADDITIONNER DES COEFFICIENTS. L'opération posée met les deux
// termes l'un sous l'autre, et la lettre reste alignée dans sa colonne : on voit
// que seul le chiffre bouge. Les nombres sont ceux du QCM de la banque
// (« forme réduite de 2x + 5 + 3x » → 5x + 5).
const reduireTermes = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "addition",
      numbers: ["2x", "3x"],
      result: "5x",
      display: { showResult: true, compact: true },
      questionLabel: "2x + 5 + 3x = 5x + 5",
    }}
  />
);

// LA FORME DIT LE GESTE. Un produit se développe, une somme non — et le tableau
// range les trois cas de la banque côte à côte, avec ce qu'on fait de chacun.
const tableauFormes = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["l'expression", "sa forme", "ce qu'on fait"],
      rows: [
        { values: ["2(x + 7)", "un produit", "développer"] },
        { values: ["(x + 2)(x + 5)", "un produit", "4 produits"] },
        { values: ["5x + 3", "une somme", "rien à faire"] },
      ],
      highlight: { row: 2 },
      caption: "la forme factorisée est un produit ; la développée, une somme",
      display: { compact: true, striped: true },
    }}
  />
);

// ⭐ LE CANVAS DU BLOC ALGÈBRE, REPRIS DE LA FICHE DES EXPRESSIONS. Là-bas il
// disait ce qu'est 3x + 2 ; ici il dit ce que le facteur ATTEINT. Trois groupes
// cachés valent 3x, et le 4 de la parenthèse, répété trois fois, donne douze
// objets qu'on voit. L'élève retrouve son image, chargée d'une information de
// plus — c'est la deuxième parade de REGLES.md contre le dessin qui se répète.
// ⚠️ `showLabels: false` : les étiquettes de thème du composant sont en 10 px
// FIXES, donc 10 px sur un téléphone comme sur un vidéoprojecteur.
const sacsEtObjets = (
  <CanvasRenderer
    figure={{
      kind: "algebre",
      theme: "jeu_video",
      groupesCaches: 3,
      objetsVisibles: 12,
      symbole: "x",
      expression: "3(x + 4) = 3x + 12",
      display: { showConcret: true, showExpression: true, showLabels: false },
    }}
  />
);

// LE CALCUL MENTAL EST DE LA DISTRIBUTIVITÉ. 7 × 102, personne ne le pose : on
// fait 7 × 100 puis 7 × 2, et on additionne. C'est exactement k(a + b) = ka + kb,
// avec des nombres au lieu d'une lettre.
const calculMental = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "addition",
      numbers: ["700", "14"],
      result: "714",
      display: { showResult: true, compact: true },
      questionLabel: "7 × 102 = 7 × 100 + 7 × 2",
    }}
  />
);

// LE TEST QUI TRANCHE. Deux écritures qui prétendent être égales : on remplace la
// lettre par un nombre et on regarde. 15 d'un côté, 7 de l'autre — l'égalité est
// fausse, et il n'y a rien à discuter.
const testNumerique = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["pour x = 1", "3(x + 4)", "3x + 4"],
      rows: [
        { values: ["on remplace", "3 × 5", "3 × 1 + 4"] },
        { values: ["on trouve", "15", "7"] },
      ],
      highlight: { row: 1 },
      caption: "15 ≠ 7 : l'égalité 3(x + 4) = 3x + 4 est fausse",
      display: { compact: true, striped: true },
    }}
  />
);

const pieges = [
  "Oublier de multiplier le terme constant : 3(x + 4) ne fait pas 3x + 4, mais 3x + 12. Le facteur devant la parenthèse multiplie CHAQUE terme, pas seulement la lettre.",
  "Perdre le signe moins : −2(x + 5) fait −2x − 10, et non −2x + 10. Le signe voyage avec le facteur, et il se distribue lui aussi.",
  "S'arrêter au développement : (x + 2)(x + 3) donne d'abord x² + 3x + 2x + 6, qui n'est pas une réponse finie. Il reste à réduire : x² + 5x + 6.",
];

const aRetenir = [
  "Développer, c'est passer d'un produit (forme factorisée) à une somme (forme développée). La distributivité dit comment : k(a + b) = ka + kb.",
  "Un produit de deux parenthèses demande QUATRE produits : chaque terme de la première rencontre chaque terme de la seconde.",
  "Développer et réduire sont deux gestes, dans cet ordre : on développe d'abord, on regroupe les termes semblables ensuite.",
];

export const ficheDistributivite4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "litteral-distributivite",
  titre: "La distributivité",
  accroche:
    "Développer, c'est ouvrir une parenthèse sans changer la valeur du calcul : un produit devient une somme. Tout tient dans un mot — CHAQUE. Le facteur posé devant la parenthèse multiplie chaque terme qui s'y trouve, la lettre comme le nombre. C'est l'outil qui ouvre les identités remarquables, la factorisation et les équations.",
  identite: [
    { label: "Le mot clé", valeur: "Développer : d'un produit vers une somme" },
    { label: "Le geste", valeur: "Le facteur multiplie CHAQUE terme" },
    { label: "La règle d'or", valeur: "Deux parenthèses, quatre produits" },
  ],
  definition: {
    texte:
      "La distributivité est la règle qui permet de transformer un produit en somme : $k(a + b) = ka + kb$. Le facteur $k$ multiplie chaque terme de la parenthèse, sans en oublier aucun. L'expression de départ, $k(a + b)$, est une forme factorisée — c'est un produit. L'expression d'arrivée, $ka + kb$, est une forme développée — c'est une somme. Les deux valent exactement la même chose : on a changé l'écriture, pas le nombre.",
  },
  figure: {
    schema: legende(
      aireDecoupee(22, 15),
      "un rectangle de 3 sur $x + 4$, coupé en deux : $3x$ et 12"
    ),
    legende:
      "L'aire se lit de deux façons : $3 \\times (x + 4)$ d'un seul bloc, ou $3x$ à gauche plus 12 carrés à droite. Même surface, donc $3(x + 4) = 3x + 12$.",
  },
  proprietes: [
    {
      titre: "Le facteur atteint chaque terme",
      micros: ["litteral_distributivite_simple", "litteral_distributivite_defi"],
      texte:
        "$3(x + 4)$, ce sont trois lignes de $x + 4$ mises bout à bout. Le 3 multiplie $x$, mais il multiplie aussi le 4 : $3(x + 4) = 3x + 12$. Écrire $3x + 4$ reviendrait à n'avoir compté qu'une seule ligne sur trois.",
      schema: troisLignes(228),
    },
    {
      titre: "Deux parenthèses, quatre produits",
      micros: ["litteral_distributivite_double"],
      texte:
        "Dans $(x + 2)(x + 3)$, chaque terme de la première parenthèse multiplie chaque terme de la seconde : $2 \\times 2 = 4$ produits. On obtient $x^2 + 3x + 2x + 6$, qu'il reste à réduire.",
      schema: quatreProduits,
    },
    {
      titre: "Développer, puis réduire",
      micros: ["litteral_distributivite_reduire"],
      texte:
        "Après le développement, il reste presque toujours des termes semblables à regrouper. $2x + 5 + 3x$ se réduit en $5x + 5$ : on additionne les coefficients, et la lettre ne bouge pas.",
      schema: reduireTermes,
    },
    {
      titre: "La forme dit le geste",
      micros: ["litteral_distributivite_reconnaitre"],
      texte:
        "Une forme factorisée est un produit : il reste une parenthèse à distribuer. Une forme développée est une somme : il n'y a plus rien à ouvrir. $2(x + 7)$ se développe, $5x + 3$ non.",
      schema: tableauFormes,
    },
  ],
  reel: {
    texte:
      "La distributivité, c'est d'abord la façon dont on calcule de tête. Douze barquettes de letchis à 2,50 € au marché de Saint-Paul : on fait 12 × 2 puis 12 × 0,50, soit 24 + 6 = 30 €. Personne ne pose l'opération. C'est aussi le devis d'un artisan — tant d'heures à tel tarif, plus les fournitures, le tout répété pour chaque pièce d'une maison —, le prix d'un lot en promotion, ou le calcul d'une surface qu'on agrandit : un terrain de 3 mètres de large sur lequel on ajoute 4 mètres de long gagne exactement trois fois quatre mètres carrés.",
  },
  historique: {
    texte:
      "Le dessin de cette fiche a plus de deux mille ans : dans les Éléments d'Euclide, au IIIe siècle avant notre ère, la distributivité est une propriété des AIRES, démontrée en découpant un rectangle — il n'y avait alors ni lettres ni signe égal, et un calcul était une figure. Le nom, lui, est tout récent : c'est le mathématicien français François-Joseph Servois qui a proposé en 1814 les mots « distributif » et « commutatif », pour ranger enfin les règles de calcul par familles.",
  },
  formule: {
    contexte: "Les deux distributivités",
    expression: "$k(a + b) = ka + kb$   ·   $(a + b)(c + d) = ac + ad + bc + bd$",
    legende:
      "La première demande deux produits, la seconde quatre. Dans les deux cas, le signe qui précède un facteur part avec lui : $-2(x + 5) = -2x - 10$.",
    // ⛔ Pas de schéma ici, et c'est réfléchi : les deux dessins qui montrent ces
    // formules sont déjà au-dessus — l'aire coupée en deux pour la première, le
    // tableau en croix pour la seconde. Un troisième dessin ne dirait rien de
    // neuf, et REGLES.md tranche : on ne se prive d'un dessin que là où il
    // redirait le texte (Frédéric, 25/08).
  },
  methode: [
    {
      titre: "Reconnaître",
      micros: ["litteral_distributivite_reconnaitre"],
      // Sans dessin volontairement : le tableau des formes, quatre blocs plus
      // haut, fait déjà exactement ce travail. Le redessiner ici serait la même
      // image deux fois dans la même page.
      texte:
        "On regarde d'abord la forme. Un facteur devant une parenthèse ? Distributivité simple. Deux parenthèses multipliées ? Quatre produits. Une somme sans parenthèse ? Il n'y a rien à développer.",
    },
    {
      titre: "Développer",
      micros: ["litteral_distributivite_simple"],
      texte:
        "On écrit tous les produits, un par un, sans en sauter : $3(x + 4) = 3 \\times x + 3 \\times 4$. Écrire cette ligne intermédiaire coûte cinq secondes et évite l'erreur la plus fréquente de la 4ᵉ.",
      schema: sacsEtObjets,
    },
    {
      titre: "Réduire",
      micros: ["litteral_distributivite_reduire"],
      texte:
        "On regroupe les termes semblables : les $x^2$ ensemble, les $x$ ensemble, les nombres ensemble. On additionne les coefficients et la lettre reste telle quelle.",
      schema: reduireTermes,
    },
  ],
  usages: [
    {
      titre: "Calculer une aire",
      micros: ["litteral_distributivite_defi"],
      detail:
        "Un rectangle dont un côté s'écrit avec une lettre a une aire qui se développe. C'est la situation la plus fréquente des problèmes : une longueur qu'on augmente, une bande qu'on ajoute.",
      schema: aireDecoupee(22, 15),
    },
    {
      titre: "Calculer de tête",
      micros: ["litteral_distributivite_simple"],
      detail:
        "Un nombre proche d'une dizaine ou d'une centaine se coupe en deux : $7 \\times 102 = 7 \\times 100 + 7 \\times 2$. La distributivité n'est pas réservée aux lettres.",
      schema: calculMental,
    },
    {
      titre: "Vérifier une factorisation",
      micros: ["litteral_distributivite_reconnaitre"],
      detail:
        "Développer est le contrôle de la factorisation : si l'on affirme que $4x + 12 = 4(x + 3)$, il suffit de développer $4(x + 3)$ et de voir si l'on retombe sur $4x + 12$.",
      schema: tableauFormes,
    },
  ],
  exemples: [
    {
      titre: "Développer un produit simple",
      micros: ["litteral_distributivite_simple"],
      donnees: "On veut développer $3(x + 4)$.",
      question: "Quelle expression obtient-on ?",
      schema: troisLignes(208),
      solution:
        "On multiplie le 3 par chaque terme de la parenthèse : $3 \\times x = 3x$, puis $3 \\times 4 = 12$. Donc $3(x + 4) = 3x + 12$. Le dessin le dit autrement : trois lignes de $x + 4$ contiennent trois $x$ et trois fois 4, c'est-à-dire 12.",
    },
    {
      titre: "Développer deux parenthèses",
      micros: ["litteral_distributivite_double", "litteral_distributivite_reduire"],
      donnees: "On veut développer et réduire $(x + 2)(x + 3)$.",
      question: "Quel est le résultat réduit ?",
      schema: quatreProduits,
      solution:
        "On effectue les quatre produits : $x \\times x = x^2$, $x \\times 3 = 3x$, $2 \\times x = 2x$ et $2 \\times 3 = 6$. On obtient $x^2 + 3x + 2x + 6$. Il reste à réduire : $3x$ et $2x$ sont semblables, donc $3x + 2x = 5x$. Le résultat est $x^2 + 5x + 6$.",
    },
    {
      titre: "L'erreur la plus fréquente",
      micros: ["litteral_distributivite_defi"],
      donnees: "Un élève écrit $3(x + 4) = 3x + 4$.",
      question: "A-t-il raison, et comment le prouver sans discuter ?",
      schema: testNumerique,
      solution:
        "Non. Le 4 n'a pas été multiplié par 3 : la bonne écriture est $3x + 12$. Pour le prouver, on remplace la lettre par un nombre au choix, par exemple $x = 1$ : à gauche $3(1 + 4) = 3 \\times 5 = 15$, à droite $3 \\times 1 + 4 = 7$. Deux résultats différents pour la même valeur de $x$ : l'égalité est fausse. ⭐ Ce test tranche n'importe quelle égalité douteuse, et il ne demande aucune règle.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Développer : $3(x + 4)$.",
      correction:
        "Le 3 multiplie chaque terme : $3 \\times x + 3 \\times 4 = 3x + 12$. ⚠️ La réponse $3x + 4$ oublie de multiplier le terme constant.",
      micros: ["litteral_distributivite_simple"],
    },
    {
      question: "Dans $(x + 2)(x + 5)$, combien de produits doit-on effectuer avant de réduire ?",
      correction:
        "Quatre : $x \\times x$, $x \\times 5$, $2 \\times x$ et $2 \\times 5$. Chaque terme de la première parenthèse rencontre chaque terme de la seconde, soit $2 \\times 2 = 4$ produits.",
      micros: ["litteral_distributivite_double"],
    },
    {
      question: "Quelle est la forme réduite de $2x + 5 + 3x$ ?",
      correction:
        "$5x + 5$. On regroupe les termes semblables : $2x + 3x = 5x$, et le 5 reste seul puisque ce n'est pas un terme en $x$. ⚠️ La réponse $5x$ oublie la constante, et $6x + 5$ multiplie au lieu d'additionner les coefficients.",
      micros: ["litteral_distributivite_reduire"],
    },
    {
      question: "Parmi $5x + 3$, $2(x + 7)$, $x + 4$ et $3x - 1$, laquelle contient une distributivité à effectuer ?",
      correction:
        "$2(x + 7)$ : c'est la seule où un facteur multiplie une parenthèse. Les trois autres sont déjà des sommes, donc des formes développées. En développant : $2(x + 7) = 2x + 14$.",
      micros: ["litteral_distributivite_reconnaitre"],
    },
    {
      question: "Un élève écrit $-2(x + 5) = -2x + 10$. A-t-il raison ?",
      correction:
        "Non. Le signe moins fait partie du facteur et se distribue lui aussi : $-2 \\times x = -2x$ et $-2 \\times 5 = -10$. La bonne écriture est $-2x - 10$. Contrôle avec $x = 0$ : à gauche $-2 \\times 5 = -10$, à droite $+10$.",
      micros: ["litteral_distributivite_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

// ⛔ AUCUN LATEX DANS LES DIAPOS. `ModeClasse.tsx` n'a pas de rendu KaTeX : un
// « $\frac{}{} » y serait projeté en clair au tableau, devant la classe. Ici, on
// écrit les expressions en clair — elles sont de toute façon simples.
export const slidesDistributivite4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Distributivité - 4e",
    section: {
      type: "objectif",
      phrase: "Ouvrir une parenthèse sans changer la valeur",
      sousPhrase:
        "Développer, c'est transformer un produit en somme. Le facteur devant la parenthèse multiplie CHAQUE terme.",
      encadre: {
        titre: "L'idée",
        texte: "3(x + 4) = 3x + 12, et jamais 3x + 4.",
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
          "Le calcul mental au marché : 12 barquettes à 2,50 €, c'est 12 × 2 puis 12 × 0,50, soit 24 + 6 = 30 €. C'est aussi un devis, une promotion sur un lot, une surface qu'on agrandit.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Chez Euclide, il y a plus de deux mille ans, cette règle était une propriété des AIRES : on la démontrait en découpant un rectangle. Le mot « distributif », lui, date de 1814 — il est de Servois.",
      },
    },
  },
  {
    titre: "La règle d'or",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "Le facteur multiplie CHAQUE terme",
      sousPhrase:
        "3(x + 4), ce sont trois lignes de x + 4 : il y a trois x, et trois fois le 4.",
      encadre: {
        titre: "Le test",
        texte: "Remplace x par 1 : 3(1 + 4) = 15, alors que 3x + 4 donnerait 7. L'égalité est fausse.",
      },
    },
  },
  {
    titre: "Les deux distributivités",
    badge: "2 formules",
    section: {
      type: "cartes",
      cartes: [
        { titre: "k(a + b) = ka + kb", texte: "Un facteur, une parenthèse : deux produits." },
        { titre: "(a + b)(c + d)", texte: "Deux parenthèses : quatre produits, ac + ad + bc + bd." },
        { titre: "Le signe voyage", texte: "−2(x + 5) = −2x − 10 : le moins se distribue aussi." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheDistributivite4e.methode.map((m) => ({
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
      cartes: ficheDistributivite4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Deux parenthèses",
    section: {
      type: "exemple",
      enonce: "On veut développer et réduire (x + 2)(x + 3).",
      question: "Quel est le résultat ?",
      correction:
        "Quatre produits : x² + 3x + 2x + 6. On réduit : 3x + 2x = 5x. Résultat : x² + 5x + 6.",
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
      enonce: "Développer puis réduire : 2x + 5 + 3x.",
      question: "Quelle est la forme réduite ?",
      indice: "On ne regroupe que les termes semblables.",
      correction: "2x + 3x = 5x, et le 5 reste seul : 5x + 5.",
    },
  },
];
