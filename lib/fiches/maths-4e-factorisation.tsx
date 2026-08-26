// ─── Fiche de cours : la factorisation (4e) ───────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/factorisation.bank.ts, notionId litteral_factorisation).
//
// ⭐ QUATRIÈME DES CINQ FICHES DU BLOC ALGÈBRE : expressions → distributivité →
// identités remarquables → factorisation → équations. Elle emprunte tout aux
// trois précédentes et n'en redéfinit rien : la lettre, le coefficient, les
// termes semblables, développer, réduire, les trois identités.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE (règle de Frédéric,
// 26/08). Ce que la banque travaille vraiment :
//   litteral_facteur_commun       → « Dans 3x + 12, quel est le facteur
//        commun ? », « Dans x² + 5x ? » (c'est x), et ⚠️ « Dans 6x + 9, quel est
//        le PLUS GRAND facteur commun ? » — la réponse est 3, pas 6.
//   litteral_factoriser_simple    → 3x + 12 = 3(x + 4), 5x − 20 = 5(x − 4),
//        x² + 5x = x(x + 5), 7x + 21 = 7(x + 3)
//   litteral_factoriser_identite  → x² + 6x + 9 = (x + 3)², x² − 8x + 16 =
//        (x − 4)², x² − 25 = (x − 5)(x + 5), x² − 49, x² − 1
//   litteral_factoriser_verifier  → « La factorisation 4x + 12 = 4(x + 3)
//        est-elle correcte ? » (oui) et « 3x + 15 = 3(x + 15) ? » (non) — le
//        contrôle se fait TOUJOURS en développant.
//   litteral_factorisation_defi   → ⚠️ le nom ne dit pas le contenu : ce sont
//        les erreurs et les cas composés. « 5x + 20 = 5(x + 20) : a-t-il
//        raison ? », 2x² + 6x = 2x(x + 3), et un énoncé situé à La Réunion.
// Tous les nombres de la fiche sortent de cette liste, sans exception.
//
// ⭐ ET LE DÉFI FAIT ENCORE LE CONTRE-EXEMPLE, une neuvième fois sur quatorze
// fiches — mais celui-ci est remarquable : « 5x + 20 = 5(x + 20) » est le MIROIR
// EXACT de l'erreur de la fiche de distributivité, « 3(x + 4) = 3x + 4 ». Là on
// oubliait de multiplier le second terme, ici on oublie de le diviser. C'est la
// même faute vue des deux côtés, et la fiche le dit à l'élève : s'il a compris
// l'une, il tient l'autre.
//
// Le choix des dessins :
//   · l'aire dont on cherche les côtés            → `figure_libre` (rectangle) ;
//   · le carré qu'on reconstitue à partir de ses
//     quatre morceaux                             → `figure_libre` (carré) ;
//   · une somme partagée en parts ÉGALES          → `schema_barre` ;
//   · quatre tableaux qui portent chacun une
//     information que les autres n'ont pas        → `tableau_donnees` ;
//   · la factorisation qui accélère un calcul     → `calcul_pose`.

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

// ⭐ LE MÊME RECTANGLE QUE DANS LA FICHE DE DISTRIBUTIVITÉ, ET C'EST TOUT
// L'INTÉRÊT. Là-bas, on connaissait les côtés (3 et x + 4) et on cherchait
// l'aire. Ici on connaît l'aire — 3x et 12, les deux morceaux — et on cherche
// les côtés. Le dessin ne change pas ; la question, si. Un élève qui retrouve la
// figure comprend en un regard que la factorisation n'est pas une notion de
// plus, mais le chemin inverse.
//
// ⚠️ `showGrid: false` : seuls les douze carrés de droite sont carrelés, parce
// que c'est la seule partie qu'on sache compter. La gauche dépend de x.
// ⚠️ RÉUTILISÉ DANS DES BLOCS DE LARGEURS DIFFÉRENTES → une FONCTION qui prend
// le cadre : 9 colonnes × 22 + 2 × 15 = 228 pour une carte.
const rectangleAire = (cellSize: number, padding: number) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize, padding },
      grid: {
        rows: 3,
        cols: 9,
        filledCells: [
          [0, 5], [0, 6], [0, 7], [0, 8],
          [1, 5], [1, 6], [1, 7], [1, 8],
          [2, 5], [2, 6], [2, 7], [2, 8],
        ],
      },
      perimeterPath: [[0, 0], [0, 9], [3, 9], [3, 0], [0, 0]],
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

// ⭐ LE CARRÉ DE LA FICHE DES IDENTITÉS, LUI AUSSI RETOURNÉ. On a quatre
// morceaux en vrac — x², deux bandes de 3x, neuf carrés — et la question est :
// peut-on en faire un carré ? Oui, et son côté est x + 3. Reconnaître une
// identité, c'est reconnaître un puzzle qui se referme.
// ⚠️ Le contour se trace d'un seul trait : `buildPathFromGridPoints` ne connaît
// qu'un `M` suivi de `L`, donc le chemin repasse sur trois bords déjà tracés
// pour atteindre les deux traits intérieurs. Rouge sur rouge, invisible.
// ⚠️ Les deux bandes portent le même libellé et une clé d'objet ne peut pas
// servir deux fois : la seconde porte une espace finale, invisible à l'écran.
const carreIdentite = (cellSize: number, padding: number) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize, padding },
      grid: {
        rows: 8,
        cols: 8,
        filledCells: [
          [5, 5], [5, 6], [5, 7],
          [6, 5], [6, 6], [6, 7],
          [7, 5], [7, 6], [7, 7],
        ],
      },
      perimeterPath: [
        [0, 0], [0, 8], [8, 8], [8, 0], [0, 0],
        [0, 5], [8, 5],
        [8, 8], [5, 8], [5, 0],
      ],
      vertices: { "x²": [2.3, 1.9], "3x": [2.3, 5.6], "3x ": [6.6, 1.9], "9": [6.6, 6.2] },
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

// PARTAGER EN PARTS ÉGALES : LE GESTE MÊME DE LA FACTORISATION. La barre porte
// la somme entière, et elle se coupe en trois morceaux RIGOUREUSEMENT identiques
// qui valent chacun x + 4. Trouver le facteur commun, c'est trouver en combien
// de parts égales la somme se partage.
// ⚠️ Hauteur 200 : les étiquettes de parts sont posées à 144 px du haut et la
// phrase du bas à 18 px du bas — sous 180, elles se frôlent (mesuré en 1280).
// ⚠️ Trois parts de MÊME couleur : elles sont le même objet répété.
const barreTroisParts = (width: number) => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width, height: 200 },
      total: "3x + 12",
      parts: [
        { label: "part 1", value: "x + 4", color: BLEU },
        { label: "part 2", value: "x + 4", color: BLEU },
        { label: "part 3", value: "x + 4", color: BLEU },
      ],
      questionLabel: "3 parts égales : le facteur est 3",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
    }}
  />
);

// LE MÊME COUPLE, LU DANS LES DEUX SENS. Développer et factoriser ne sont pas
// deux chapitres : ce sont deux flèches sur la même égalité. Le tableau met les
// deux lignes l'une sous l'autre pour que ça se voie d'un coup.
const allerRetour = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["on part de", "on fait", "on arrive à"],
      rows: [
        { values: ["3(x + 4)", "développer", "3x + 12"] },
        { values: ["3x + 12", "factoriser", "3(x + 4)"] },
      ],
      highlight: { row: 1 },
      caption: "un produit d'un côté, une somme de l'autre",
      display: { compact: true, striped: false },
    }}
  />
);

// ⭐ LE FACTEUR COMMUN, ET LE PIÈGE DE LA BANQUE. Dans 6x + 9, beaucoup
// répondent 6 : c'est le nombre qu'on voit le premier. Mais 6 ne divise pas 9.
// Le facteur commun doit diviser LES DEUX termes — la colonne du milieu le dit.
const tableauFacteurs = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["l'expression", "ce qui divise les DEUX", "le facteur"],
      rows: [
        { values: ["3x + 12", "1 et 3", "3"] },
        { values: ["6x + 9", "1 et 3", "3"] },
        { values: ["x² + 5x", "1 et x", "x"] },
      ],
      highlight: { row: 1 },
      caption: "dans 6x + 9 ce n'est pas 6 : 6 ne divise pas 9",
      display: { compact: true, striped: true },
    }}
  />
);

// ⭐ LE TABLEAU QUI TUE L'ERREUR. Une ligne par terme, et chacune est divisée.
// L'élève qui écrit 5x + 20 = 5(x + 20) a rempli la première ligne et sauté la
// seconde ; en posant les deux, l'oubli devient impossible.
const tableauDivision = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["le terme", "divisé par 3", "il reste"],
      rows: [
        { values: ["3x", "3x ÷ 3", "x"] },
        { values: ["12", "12 ÷ 3", "4"] },
      ],
      caption: "3x + 12 = 3(x + 4) : les DEUX termes sont divisés",
      display: { compact: true, striped: false },
    }}
  />
);

// LE CONTRÔLE, ET LES DEUX CAS DE LA BANQUE CÔTE À CÔTE. Une factorisation ne se
// croit pas : on développe le produit obtenu, et on regarde si l'on retombe sur
// le départ. La seconde ligne est l'erreur mot pour mot.
const tableauVerification = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["la proposition", "on développe", "verdict"],
      rows: [
        { values: ["4x + 12 = 4(x + 3)", "4x + 12", "correcte"] },
        { values: ["5x + 20 = 5(x + 20)", "5x + 100", "fausse"] },
      ],
      highlight: { row: 1 },
      caption: "on développe le produit, et on compare au départ",
      display: { compact: true, striped: true },
    }}
  />
);

// ⭐ FACTORISER POUR ALLER PLUS VITE. 17 × 25 + 3 × 25, personne ne fait les deux
// multiplications : on voit que 25 est en facteur, on ajoute 17 et 3, et il
// reste 20 × 25. C'est la factorisation dans sa forme la plus utile.
const calculMental = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "multiplication",
      numbers: ["20", "25"],
      result: "500",
      display: { showResult: true, compact: true },
      questionLabel: "17 × 25 + 3 × 25 = (17 + 3) × 25",
    }}
  />
);

const pieges = [
  "Oublier de diviser le second terme : 5x + 20 ne fait pas 5(x + 20), mais 5(x + 4). C'est l'erreur miroir de celle du développement — là on oubliait de multiplier le 4, ici on oublie de diviser le 20.",
  "Se contenter du premier facteur venu : dans 6x + 9, le facteur commun n'est pas 6, parce que 6 ne divise pas 9. C'est 3, et la factorisation est 3(2x + 3).",
  "Oublier que la lettre aussi peut être en facteur : dans x² + 5x, le facteur commun est x, et le résultat est x(x + 5). Dans 2x² + 6x, c'est 2x, donc 2x(x + 3).",
];

const aRetenir = [
  "Factoriser, c'est l'opération inverse de développer : on part d'une somme et on arrive à un produit.",
  "Le facteur commun doit diviser TOUS les termes, et on cherche le plus grand. Chaque terme est ensuite divisé par lui — aucun n'est laissé de côté.",
  "Une factorisation se vérifie toujours en développant le produit obtenu : si l'on retombe sur l'expression de départ, elle est juste.",
];

export const ficheFactorisation4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "litteral-factorisation",
  titre: "La factorisation",
  accroche:
    "Développer transforme un produit en somme ; factoriser fait le chemin inverse. On part de $3x + 12$ et on retrouve $3(x + 4)$ — c'est-à-dire qu'on remonte d'une aire vers les côtés du rectangle qui la produit. Deux gestes suffisent : trouver ce qui est commun à tous les termes, et diviser chacun par lui. Aucun terme n'est laissé de côté, et c'est là que tout se joue.",
  identite: [
    { label: "Le mot clé", valeur: "D'une somme vers un produit" },
    { label: "Le geste", valeur: "Trouver le facteur commun, diviser CHAQUE terme" },
    { label: "La règle d'or", valeur: "On vérifie toujours en développant" },
  ],
  definition: {
    texte:
      "Factoriser une expression, c'est l'écrire sous la forme d'un PRODUIT alors qu'elle se présente comme une SOMME. C'est exactement l'opération inverse du développement : $3(x + 4) = 3x + 12$ se lit dans un sens, $3x + 12 = 3(x + 4)$ dans l'autre. Le nombre — ou la lettre — qu'on met devant la parenthèse s'appelle le facteur commun : c'est ce qui divise tous les termes à la fois.",
  },
  figure: {
    schema: legende(
      rectangleAire(22, 15),
      "on connaît l'aire, $3x$ et 12 : on cherche les côtés"
    ),
    legende:
      "C'est le rectangle de la fiche de distributivité, retourné. Là-bas on connaissait les côtés, 3 et $x + 4$, et on cherchait l'aire. Ici l'aire est donnée en deux morceaux, et il faut remonter aux côtés : $3x + 12 = 3(x + 4)$.",
  },
  proprietes: [
    {
      titre: "L'inverse du développement",
      micros: ["litteral_factorisation_defi"],
      texte:
        "Développer et factoriser ne sont pas deux chapitres, mais deux flèches sur la même égalité. Un produit d'un côté, une somme de l'autre — et la même égalité reste vraie pour toutes les valeurs de $x$.",
      schema: allerRetour,
    },
    {
      titre: "Le facteur doit diviser TOUS les termes",
      micros: ["litteral_facteur_commun"],
      texte:
        "Dans $6x + 9$, le facteur commun n'est pas 6 : 6 ne divise pas 9. C'est 3, qui divise les deux. Et le facteur peut être une lettre : dans $x^2 + 5x$, c'est $x$.",
      schema: tableauFacteurs,
    },
    {
      titre: "Un partage en parts égales",
      micros: ["litteral_factoriser_simple"],
      texte:
        "Factoriser par 3, c'est couper la somme en trois morceaux rigoureusement identiques. Chacun vaut $x + 4$, donc le tout vaut $3 \\times (x + 4)$. Le facteur, c'est le NOMBRE de parts.",
      schema: barreTroisParts(228),
    },
    {
      titre: "Quand le puzzle se referme",
      micros: ["litteral_factoriser_identite"],
      texte:
        "$x^2 + 6x + 9$ n'a aucun facteur commun — et pourtant il se factorise. Ses quatre morceaux forment exactement un carré de côté $x + 3$ : c'est une identité remarquable, lue à l'envers.",
      schema: carreIdentite(24, 18),
    },
  ],
  reel: {
    texte:
      "Factoriser, c'est d'abord regrouper ce qui se répète — et c'est un réflexe de calcul mental. $17 \\times 25 + 3 \\times 25$ ne se calcule pas en deux multiplications : le 25 est commun, donc c'est $(17 + 3) \\times 25 = 20 \\times 25 = 500$. Le même geste sert dès qu'on compte des lots identiques : pour une sortie scolaire à La Réunion, quatre groupes qui prennent chacun $x$ bouteilles d'eau et 3 fruits emportent $4(x + 3)$ objets, et cette écriture-là dit quelque chose que $4x + 12$ ne dit pas — qu'il y a quatre groupes. Enfin, la factorisation est la clé de la résolution : en 3ᵉ puis au lycée, un produit qui vaut zéro oblige l'un de ses facteurs à valoir zéro, et c'est ainsi qu'on résout les équations du second degré.",
  },
  historique: {
    texte:
      "Le mot « facteur » vient du latin factor, « celui qui fait » — le même que dans manufacture. Retrouver un produit derrière une somme est un geste très ancien : c'est ainsi qu'al-Khwarizmi, à Bagdad au IXᵉ siècle, résolvait les équations du second degré, en « complétant le carré », c'est-à-dire en ajoutant juste ce qu'il fallait pour qu'une somme redevienne l'aire d'un carré. Il n'y avait alors ni lettres ni signes : tout s'énonçait en phrases, et se démontrait en découpant une figure — celle de cette fiche.",
  },
  formule: {
    contexte: "Les trois factorisations",
    expression:
      "$ka + kb = k(a + b)$   ·   $x^2 + 2ax + a^2 = (x + a)^2$   ·   $x^2 - a^2 = (x - a)(x + a)$",
    legende:
      "Ce sont les égalités du développement, lues de droite à gauche. La première marche toujours, dès qu'il y a un facteur commun ; les deux autres ne s'utilisent que si l'on reconnaît la forme.",
    // ⛔ Pas de schéma ici, et c'est réfléchi : le rectangle dessine la première
    // et le carré dessine les deux autres, tous deux plus haut dans la page. Un
    // troisième dessin ne dirait rien de neuf (Frédéric, 25/08).
  },
  methode: [
    {
      titre: "Chercher ce qui est commun",
      micros: ["litteral_facteur_commun"],
      texte:
        "On regarde chaque terme et on cherche ce qui les divise TOUS : un nombre, une lettre, ou les deux. On prend le plus grand — sinon la factorisation est incomplète et devra être refaite.",
      schema: tableauFacteurs,
    },
    {
      titre: "Diviser chaque terme",
      micros: ["litteral_factoriser_simple"],
      texte:
        "On écrit le facteur devant la parenthèse, puis on divise chaque terme par lui et on note le résultat dans la parenthèse. Une ligne par terme : c'est ce qui rend l'oubli impossible.",
      schema: tableauDivision,
    },
    {
      titre: "Vérifier en développant",
      micros: ["litteral_factoriser_verifier"],
      texte:
        "On développe le produit obtenu. Si l'on retombe exactement sur l'expression de départ, la factorisation est juste ; sinon, un terme a été mal divisé. Ce contrôle prend cinq secondes et ne se saute jamais.",
      schema: tableauVerification,
    },
  ],
  usages: [
    {
      titre: "Simplifier une écriture",
      micros: ["litteral_factoriser_simple"],
      detail:
        "Une forme factorisée est plus courte, et surtout plus parlante : $4(x + 3)$ dit qu'il y a quatre groupes identiques, ce que $4x + 12$ ne dit plus.",
      schema: barreTroisParts(228),
    },
    {
      titre: "Calculer de tête",
      micros: ["litteral_facteur_commun"],
      detail:
        "$17 \\times 25 + 3 \\times 25$ : le 25 est commun, donc c'est $(17 + 3) \\times 25 = 500$. Deux multiplications remplacées par une addition et une multiplication.",
      schema: calculMental,
    },
    {
      titre: "Reconnaître une identité",
      micros: ["litteral_factoriser_identite"],
      detail:
        "Trois termes dont le premier et le dernier sont des carrés ? Deux termes séparés par un moins, tous deux carrés ? Ce sont les signatures des identités remarquables lues à l'envers.",
      schema: carreIdentite(24, 18),
    },
  ],
  exemples: [
    {
      titre: "Factoriser une somme simple",
      micros: ["litteral_facteur_commun", "litteral_factoriser_simple"],
      donnees: "On veut factoriser $3x + 12$.",
      question: "Quel est le facteur commun, et que reste-t-il ?",
      schema: tableauDivision,
      solution:
        "Le facteur commun est 3 : il divise $3x$ et il divise 12. On divise ensuite chaque terme par 3 : $3x \\div 3 = x$, et $12 \\div 3 = 4$. Donc $3x + 12 = 3(x + 4)$. Contrôle en développant : $3 \\times x + 3 \\times 4 = 3x + 12$. ✅",
    },
    {
      titre: "Factoriser avec une identité",
      micros: ["litteral_factoriser_identite"],
      donnees: "On veut factoriser $x^2 + 6x + 9$.",
      question: "Quel produit reconnaît-on ?",
      schema: carreIdentite(20, 14),
      solution:
        "Il n'y a aucun facteur commun aux trois termes. Mais le premier est un carré ($x^2$), le dernier aussi ($9 = 3^2$), et celui du milieu vaut exactement le double produit ($2 \\times x \\times 3 = 6x$). C'est donc le carré d'une somme : $x^2 + 6x + 9 = (x + 3)^2$. Le dessin le confirme — les quatre morceaux forment un carré de côté $x + 3$. Contrôle en développant : $(x + 3)(x + 3) = x^2 + 3x + 3x + 9$. ✅",
    },
    {
      titre: "L'erreur miroir",
      micros: ["litteral_factorisation_defi", "litteral_factoriser_verifier"],
      donnees: "Un élève écrit $5x + 20 = 5(x + 20)$.",
      question: "Où est l'erreur, et comment l'aurait-il vue tout seul ?",
      schema: tableauVerification,
      solution:
        "Il a divisé le premier terme et recopié le second : $20$ doit être divisé par 5 aussi, ce qui donne 4. La bonne factorisation est $5(x + 4)$. ⭐ Et c'est exactement l'erreur de la fiche de distributivité, retournée : là on oubliait de MULTIPLIER le second terme, ici on oublie de le DIVISER. Le contrôle l'aurait montré tout de suite : $5(x + 20) = 5x + 100$, et non $5x + 20$.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Dans l'expression $3x + 12$, quel est le facteur commun ?",
      correction:
        "3, car 3 divise $3x$ et 3 divise 12. ⚠️ Ce n'est pas 12 : 12 ne divise pas $3x$. Le facteur commun doit diviser les DEUX termes.",
      micros: ["litteral_facteur_commun"],
    },
    {
      question: "Factoriser : $5x - 20$.",
      correction:
        "$5(x - 4)$. Le facteur commun est 5 ; on divise chaque terme : $5x \\div 5 = x$ et $20 \\div 5 = 4$. Le signe moins reste dans la parenthèse. Contrôle : $5(x - 4) = 5x - 20$. ✅",
      micros: ["litteral_factoriser_simple"],
    },
    {
      question: "Factoriser : $x^2 + 5x$.",
      correction:
        "$x(x + 5)$. Ici le facteur commun n'est pas un nombre mais une LETTRE : $x$ divise $x^2$ (il reste $x$) et divise $5x$ (il reste 5). Contrôle : $x \\times x + x \\times 5 = x^2 + 5x$. ✅",
      micros: ["litteral_facteur_commun", "litteral_factoriser_simple"],
    },
    {
      question: "Factoriser : $x^2 - 25$.",
      correction:
        "$(x - 5)(x + 5)$. Deux termes séparés par un moins, tous deux des carrés ($25 = 5^2$) et aucun terme en $x$ : c'est une différence de deux carrés. Contrôle : $x^2 + 5x - 5x - 25 = x^2 - 25$. ✅",
      micros: ["litteral_factoriser_identite"],
    },
    {
      question: "La factorisation $3x + 15 = 3(x + 15)$ est-elle correcte ?",
      correction:
        "Non. En développant, $3(x + 15) = 3x + 45$, et non $3x + 15$. Le 15 n'a pas été divisé par 3 : la bonne réponse est $3(x + 5)$.",
      micros: ["litteral_factoriser_verifier", "litteral_factorisation_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

// ⛔ AUCUN LATEX DANS LES DIAPOS : `ModeClasse.tsx` n'a pas de rendu KaTeX, et le
// code serait projeté en clair au tableau devant la classe.
export const slidesFactorisation4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Factorisation - 4e",
    section: {
      type: "objectif",
      phrase: "D'une somme vers un produit",
      sousPhrase:
        "Factoriser, c'est développer à l'envers : on part de 3x + 12 et on retrouve 3(x + 4).",
      encadre: {
        titre: "L'idée",
        texte: "Le facteur commun divise TOUS les termes — et chacun est divisé par lui.",
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
          "17 × 25 + 3 × 25 = (17 + 3) × 25 = 500 : deux multiplications remplacées par une. Et 4(x + 3) dit qu'il y a quatre groupes identiques, ce que 4x + 12 ne dit plus.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Facteur » vient du latin factor, celui qui fait. Al-Khwarizmi, à Bagdad au IXe siècle, résolvait déjà les équations en « complétant le carré » — sans lettres et sans signes : tout se démontrait en découpant une figure.",
      },
    },
  },
  {
    titre: "La règle d'or",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "On vérifie toujours en développant",
      sousPhrase:
        "5x + 20 = 5(x + 20) ? Développons : 5(x + 20) = 5x + 100. C'est faux — la bonne réponse est 5(x + 4).",
      encadre: {
        titre: "L'erreur miroir",
        texte: "C'est celle du développement, retournée : là on oubliait de multiplier le second terme, ici on oublie de le diviser.",
      },
    },
  },
  {
    titre: "Les trois factorisations",
    badge: "3 formules",
    section: {
      type: "cartes",
      cartes: [
        { titre: "ka + kb = k(a + b)", texte: "Le facteur commun : marche dès qu'il y en a un." },
        { titre: "x² + 2ax + a² = (x + a)²", texte: "Trois termes, le premier et le dernier carrés, le milieu double." },
        { titre: "x² − a² = (x − a)(x + a)", texte: "Deux carrés séparés par un moins, et pas de terme en x." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheFactorisation4e.methode.map((m) => ({
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
      cartes: ficheFactorisation4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Le piège du facteur",
    section: {
      type: "exemple",
      enonce: "On veut factoriser 6x + 9.",
      question: "Le facteur commun est-il 6 ?",
      correction:
        "Non : 6 ne divise pas 9. Le facteur commun est 3, et 6x + 9 = 3(2x + 3).",
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
      enonce: "Factoriser : x² + 5x.",
      question: "Quel est le facteur commun ?",
      indice: "Le facteur commun n'est pas toujours un nombre.",
      correction: "C'est la lettre x : x² + 5x = x(x + 5).",
    },
  },
];
