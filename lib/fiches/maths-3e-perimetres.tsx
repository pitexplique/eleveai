// ─── Fiche de cours : périmètres (3e) ─────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/perimetres.bank.ts, notionId `aire_perimetre`, 48 items).
//
// ⭐⭐ LE CHAPITRE TIENT DANS UNE CONFUSION, ET LA BANQUE LA POSE QUATRE FOIS :
// périmètre contre aire. Trois de ses items sont des erreurs d'élèves recopiées
// telles quelles — « le périmètre mesure la surface » (non), « le périmètre d'un
// rectangle de 8 sur 5 vaut 8 × 5 = 40 » (non, c'est son aire), et surtout
// « pour la longueur d'un cercle, j'utilise πr² » (non, c'est l'aire du disque).
// 👉 Les deux formules du cercle sont donc mises FACE À FACE dans une propriété
// entière : $2\pi r$ mesure un contour et s'exprime en cm, $\pi r^2$ mesure une
// surface et s'exprime en cm². L'unité seule permet déjà de trancher.
//
// ⭐ TROIS MICROS SUR CINQ SONT PROPRES À LA 3e — polygone, cercle et figure
// composée. `comprendre` et `defi` existent en 4e.
// ⚠️ ET CE CHIFFRE A ÉTÉ MESURÉ CONTRE TOUTE LA CLASSE DE 4e, pas contre la
// notion homonyme. La veille, un relevé qui ne comparait que les notions de même
// nom avait annoncé « 4 micros propres » pour la proportionnalité alors qu'il
// n'y en avait qu'une : la 4e éclate certaines notions en deux. La leçon vaut
// pour les cinq fiches de 3e qui restent après celle-ci.
//
// ⭐ LES 48 ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE — la règle du 31/08 :
//   aire_perimetre_comprendre      → contour, et l'unité en cm et non cm²
//   aire_perimetre_polygone        → additionner les côtés, et le piège 8 × 5
//   aire_perimetre_cercle          → 2πr ou πd, et le piège πr²
//   aire_perimetre_figure_composee → la figure en L, l'arc de demi-cercle
//   aire_perimetre_defi            → même aire, périmètres différents
//
// ⭐ ET LE DERNIER ITEM DE LA BANQUE OUVRE SUR TOUT LE RESTE DE L'ANNÉE : « si
// on double le rayon, la longueur est multipliée par… » — par 2. C'est le cas
// LINÉAIRE de l'agrandissement-réduction, dont les fiches `aire_surface` et
// `volume_solide` donneront les puissances 2 et 3. La fiche le dit, pour que la
// règle des trois exposants ne tombe pas du ciel plus tard.
//
// ⚠️ `figure_libre` EST LE CANVAS DES FIGURES COMPOSÉES, et son champ
// `showPerimeter` trace justement le contour — c'est-à-dire exactement ce que la
// fiche enseigne à compter.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut porter du LaTeX. Les libellés
 * DANS le dessin restent en écriture simple.
 */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// ⚠️ Aucun emplacement de fiche ne dépasse 225 px, y compris en 1280 — mesuré
// par `scripts/mesurer-largeurs-blocs.mjs`.
const tableau = (
  data: Record<string, unknown>,
  bloc: "carte" | "exemple" | "formule" = "carte"
) => (
  <CanvasRenderer
    figure={
      {
        kind: "tableau_donnees",
        display: { compact: true, striped: true },
        size: {
          width: bloc === "exemple" ? 200 : bloc === "formule" ? 216 : 222,
        },
        ...data,
      } as never
    }
  />
);

/**
 * Une figure sur quadrillage, avec son contour tracé.
 * ⭐ `showPerimeter` dessine précisément ce que la fiche fait compter : le tour
 * de la figure, et non les cases qu'elle couvre.
 */
const surQuadrillage = (
  rows: number,
  cols: number,
  cases: [number, number][],
  bloc: "carte" | "exemple" = "carte"
) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      grid: { rows, cols, filledCells: cases },
      display: { showGrid: true, showFilled: true, showPerimeter: true },
      size: { width: bloc === "exemple" ? 200 : 222, height: 170 },
    }}
  />
);

// ⚠️ Les mêmes constantes que la fiche du cercle de 6e, où elles sont mesurées.
const CADRE = { width: 222, height: 190 };
const CX = 111;
const CY = 94;
const R = 60;

export const fichePerimetres3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "aire-perimetre",
  titre: "Périmètres : polygones, cercle et figures composées",
  accroche:
    "Pour clôturer un terrain, on achète du grillage au mètre ; pour l'engazonner, on achète de la pelouse au mètre carré. Les deux questions portent sur le même terrain et n'ont rien à voir : la première mesure un CONTOUR, la seconde une SURFACE. Toute la difficulté du chapitre tient à ne pas confondre les deux — et le cercle est l'endroit où presque tout le monde s'y trompe, parce que ses deux formules se ressemblent.",
  identite: [
    { label: "Ce que c'est", valeur: "La longueur du TOUR de la figure" },
    { label: "Le cercle", valeur: "$2\\pi r$, ou $\\pi d$ — jamais $\\pi r^2$" },
    { label: "L'unité", valeur: "Une longueur : cm, m, km. Jamais de cm²" },
  ],
  definition: {
    texte:
      "Le périmètre d'une figure est la longueur de son contour, c'est-à-dire la distance qu'il faudrait parcourir pour en faire le tour complet. C'est une LONGUEUR : il s'exprime dans la même unité que les côtés — en centimètres si les côtés sont en centimètres. L'aire, elle, mesure la surface couverte et s'exprime en unités carrées. Deux figures peuvent parfaitement avoir la même aire et des périmètres très différents : ce sont deux grandeurs indépendantes.",
  },
  figure: {
    schema: surQuadrillage(5, 6, [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
    ]),
    legende:
      "Le trait qui fait le tour est le périmètre ; les cases coloriées sont l'aire. Ce sont deux mesures de la même figure, et elles ne se calculent pas de la même façon.",
  },
  proprietes: [
    {
      titre: "Un contour, pas une surface",
      texte:
        "Le périmètre se parcourt, l'aire se recouvre. La conséquence la plus utile est celle de l'UNITÉ : un périmètre s'exprime en centimètres, en mètres ou en kilomètres, jamais en cm². Un résultat annoncé en unités carrées pour un périmètre signale à coup sûr qu'on a calculé autre chose. ⛔ Et un rectangle de 8 cm sur 5 cm a pour périmètre 26 cm, pas 40 : $8 \\times 5$ donne son AIRE.",
      schema: legende(
        tableau({
          headers: ["on mesure", "avec quoi", "unité"],
          rows: [
            { values: ["le périmètre", "le tour", "cm"] },
            { values: ["l'aire", "la surface", "cm²"] },
            { values: ["8 sur 5", "26 ou 40", "selon"] },
          ],
          highlight: { row: 2 },
          caption: "l'unité tranche à elle seule",
        }),
        "Pour un rectangle de 8 sur 5 : périmètre 26 cm, aire 40 cm²."
      ),
      micros: ["aire_perimetre_comprendre"],
    },
    {
      titre: "Un polygone : on additionne ses côtés",
      texte:
        "Pour n'importe quel polygone, le périmètre est la somme de toutes les longueurs de ses côtés — il n'y a pas d'autre méthode, et aucune formule n'est nécessaire. Les figures usuelles offrent seulement des raccourcis : un carré de côté $c$ a pour périmètre $4c$, et un rectangle de longueur $L$ et de largeur $l$ a pour périmètre $2(L + l)$, puisque chaque dimension y figure deux fois.",
      schema: legende(
        tableau({
          headers: ["figure", "périmètre"],
          rows: [
            { values: ["carré de côté c", "4c"] },
            { values: ["rectangle L et l", "2(L + l)"] },
            { values: ["triangle a, b, c", "a + b + c"] },
            { values: ["polygone quelconque", "somme des côtés"] },
          ],
          caption: "toujours une somme de longueurs",
        }),
        "Les formules ne sont que des sommes écrites plus court."
      ),
      micros: ["aire_perimetre_polygone"],
    },
    {
      titre: "Le cercle : $2\\pi r$, et surtout pas $\\pi r^2$",
      texte:
        "La longueur d'un cercle — on dit aussi sa circonférence — vaut $2\\pi r$, où $r$ est le rayon. Comme le diamètre vaut $2r$, elle s'écrit aussi $\\pi d$, ce qui est souvent plus rapide quand c'est le diamètre qui est donné. ⛔ L'erreur constante consiste à employer $\\pi r^2$ : cette formule-là donne l'AIRE du disque, et son résultat s'exprimerait en cm². Le carré dans la formule trahit la surface.",
      schema: legende(
        <CanvasRenderer
          figure={{
            kind: "cercle",
            size: CADRE,
            circle: { cx: CX, cy: CY, r: R, showCircle: true },
            points: [
              { id: "O", x: CX, y: CY, label: "O", highlight: true },
              { id: "A", x: CX + R, y: CY, label: "A" },
            ],
            segments: [{ id: "r", kind: "rayon", from: "O", to: "A", label: "r" }],
            display: { showLabels: true, showPoints: true, showCenter: true },
          }}
        />,
        "Le trait fait le tour : sa longueur vaut $2\\pi r$, en centimètres."
      ),
      micros: ["aire_perimetre_cercle"],
    },
    {
      titre: "Deux formules à ne plus confondre",
      texte:
        "Elles se distinguent par trois signes. La longueur du cercle porte un facteur 2 et un rayon à la puissance 1 ; l'aire du disque n'a pas de 2 mais un rayon au CARRÉ. Et leurs unités diffèrent : des centimètres d'un côté, des centimètres carrés de l'autre. Un dernier repère verbal aide : on parle de la longueur d'un CERCLE — qui est une ligne — et de l'aire d'un DISQUE — qui est une surface pleine.",
      schema: legende(
        tableau({
          headers: ["objet", "formule", "unité"],
          rows: [
            { values: ["le cercle (ligne)", "2πr", "cm"] },
            { values: ["le disque (surface)", "πr²", "cm²"] },
          ],
          highlight: { row: 0 },
          caption: "le carré trahit la surface",
        }),
        "Si la formule contient $r^2$, elle ne peut pas donner un périmètre."
      ),
      micros: ["aire_perimetre_cercle", "aire_perimetre_comprendre"],
    },
    {
      titre: "Une figure composée : on suit le contour",
      texte:
        "Devant une figure en L ou en escalier, on ne cherche pas de formule : on parcourt le contour et on additionne les longueurs rencontrées, une à une, sans en sauter ni en compter deux fois. ⚠️ Le piège est de vouloir découper la figure en rectangles : cela marche pour l'AIRE, mais pas pour le périmètre, car les côtés intérieurs du découpage n'appartiennent pas au contour.",
      schema: legende(
        surQuadrillage(4, 6, [
          [0, 0],
          [0, 1],
          [1, 0],
          [1, 1],
          [2, 0],
          [2, 1],
          [2, 2],
          [2, 3],
          [2, 4],
        ]),
        "On suit le trait sans le quitter : les traits intérieurs ne comptent pas."
      ),
      micros: ["aire_perimetre_figure_composee"],
    },
    {
      titre: "Un demi-cercle a deux morceaux",
      texte:
        "Le contour d'un demi-disque se compose de l'ARC — la moitié du cercle, soit $\\dfrac{2\\pi r}{2} = \\pi r$ — et du DIAMÈTRE qui le referme, soit $2r$. Son périmètre complet vaut donc $\\pi r + 2r$. ⚠️ Si l'énoncé ne demande que la longueur de l'arc, c'est-à-dire la partie courbe, on s'arrête à $\\pi r$ : lire précisément ce qui est demandé fait ici toute la différence.",
      schema: legende(
        tableau({
          headers: ["ce qu'on demande", "on calcule"],
          rows: [
            { values: ["l'arc seul", "πr"] },
            { values: ["le tour complet", "πr + 2r"] },
          ],
          caption: "le diamètre referme la figure",
        }),
        "Un demi-cercle n'est pas une figure fermée : il lui faut son diamètre."
      ),
      micros: ["aire_perimetre_figure_composee", "aire_perimetre_cercle"],
    },
    {
      titre: "Même aire ne veut pas dire même périmètre",
      texte:
        "Deux figures de même aire peuvent avoir des périmètres très différents, et c'est facile à voir : un rectangle de 1 sur 36 et un carré de 6 sur 6 couvrent tous deux 36 unités carrées, mais le premier a un périmètre de 74 et le second de 24. Plus une figure est allongée, plus son contour s'étire à surface égale — c'est pourquoi le carré est, parmi tous les rectangles de même aire, celui qui a le plus petit périmètre.",
      schema: legende(
        tableau({
          headers: ["figure", "aire", "périmètre"],
          rows: [
            { values: ["1 × 36", "36", "74"] },
            { values: ["4 × 9", "36", "26"] },
            { values: ["6 × 6", "36", "24"] },
          ],
          highlight: { row: 2 },
          caption: "même aire, trois contours",
        }),
        "Les deux grandeurs sont indépendantes : l'une ne détermine pas l'autre."
      ),
      micros: ["aire_perimetre_defi"],
    },
    {
      titre: "Doubler le rayon double la longueur",
      texte:
        "Si l'on multiplie le rayon d'un cercle par 2, sa longueur $2\\pi r$ est multipliée par 2 elle aussi — car $r$ y figure à la puissance 1. C'est vrai de tout périmètre : agrandir une figure dans un rapport $k$ multiplie son contour par $k$. ⭐ Retenez ce cas simple : l'aire, elle, sera multipliée par $k^2$, et un volume par $k^3$. Une longueur suit le rapport tel quel — c'est le seul des trois qui le fasse.",
      schema: legende(
        tableau({
          headers: ["on agrandit de k", "ce qui est multiplié par"],
          rows: [
            { values: ["une longueur", "k"] },
            { values: ["une aire", "k²"] },
            { values: ["un volume", "k³"] },
          ],
          highlight: { row: 0 },
          caption: "l'exposant dit la dimension",
        }),
        "Un contour est une longueur : il suit donc le rapport sans exposant."
      ),
      micros: ["aire_perimetre_defi"],
    },
  ],
  reel: {
    texte:
      "Le périmètre est ce qu'on achète au mètre. Une clôture pour un terrain, une plinthe au pied d'un mur, un joint autour d'une fenêtre, un ourlet sur un tissu : tout cela se compte en longueur de contour, et une erreur de calcul se paie très concrètement en matériau manquant. À La Réunion, c'est aussi la mesure des parcours — le tour d'un stade, la longueur d'un sentier balisé. Et l'écart entre aire et périmètre a une conséquence économique nette : pour une même surface de terrain, une parcelle très allongée coûte beaucoup plus cher à clôturer qu'une parcelle carrée, alors qu'elle ne se vend pas plus cher.",
  },
  historique: {
    texte:
      "Le nombre $\\pi$ est le rapport entre la longueur d'un cercle et son diamètre, et l'étonnant est qu'il ne dépende PAS du cercle choisi : petit ou grand, ce rapport vaut toujours la même chose. Les Babyloniens l'approchaient déjà par 3, les Égyptiens par une valeur proche de 3,16. C'est Archimède, vers 250 avant notre ère, qui donne la première méthode rigoureuse : il enferme le cercle entre deux polygones réguliers, l'un inscrit et l'autre circonscrit, et calcule leurs périmètres. En poussant jusqu'à 96 côtés, il obtient un encadrement remarquablement serré — entre $3 + \\dfrac{10}{71}$ et $3 + \\dfrac{1}{7}$. Il ne cherchait pas $\\pi$ pour lui-même : il cherchait un périmètre.",
  },
  formule: {
    contexte: "La longueur d'un cercle, et les périmètres usuels",
    expression:
      "\\mathcal{P}_{\\text{cercle}} = 2\\pi r = \\pi d \\qquad \\mathcal{P}_{\\text{carré}} = 4c \\qquad \\mathcal{P}_{\\text{rect.}} = 2(L + l)",
    legende:
      "⚠️ La formule du cercle existe en deux versions parce que les énoncés donnent tantôt le rayon, tantôt le diamètre. Employer la mauvaise donnée est aussi fréquent qu'employer la mauvaise formule : avec un diamètre de 12 cm, écrire $2\\pi \\times 12$ double la réponse, car 12 est déjà le double du rayon.",
    schema: legende(
      tableau(
        {
          headers: ["donnée", "on écrit", "exemple"],
          rows: [
            { values: ["rayon 5", "2π × 5", "31,4 cm"] },
            { values: ["diamètre 12", "π × 12", "37,68 cm"] },
            { values: ["diamètre 12", "2π × 12", "faux"] },
          ],
          highlight: { row: 2 },
          caption: "avec π ≈ 3,14",
        },
        "formule"
      ),
      "On regarde d'abord CE QUI EST DONNÉ, et on choisit la version qui va avec."
    ),
  },
  methode: [
    {
      titre: "Se demander d'abord : contour ou surface ?",
      texte:
        "Un énoncé qui parle de clôture, de bordure, de tour ou de longueur demande un périmètre. S'il parle de recouvrir, de peindre, de carreler ou de semer, il demande une aire. L'unité attendue confirme : cm pour l'un, cm² pour l'autre.",
      micros: ["aire_perimetre_comprendre"],
    },
    {
      titre: "Pour un polygone : parcourir, ne pas deviner",
      texte:
        "On suit le contour dans un sens, on note chaque longueur, on additionne. Sur une figure composée, cette méthode est la seule sûre — les formules des figures usuelles ne s'y appliquent pas.",
      micros: ["aire_perimetre_polygone", "aire_perimetre_figure_composee"],
    },
    {
      titre: "Pour un cercle : regarder ce qui est donné",
      texte:
        "Rayon donné : $2\\pi r$. Diamètre donné : $\\pi d$. ⛔ Ne jamais mélanger les deux en écrivant $2\\pi d$, qui double le résultat. Et si l'énoncé demande une valeur « exacte », on garde $\\pi$ dans la réponse au lieu de le remplacer par 3,14.",
      micros: ["aire_perimetre_cercle"],
    },
    {
      titre: "Contrôler par l'unité",
      texte:
        "Le résultat doit être une longueur. Un périmètre exprimé en cm² est nécessairement faux, et cette vérification coûte une seconde. Elle attrape en particulier la confusion entre $2\\pi r$ et $\\pi r^2$.",
      micros: ["aire_perimetre_comprendre", "aire_perimetre_cercle"],
    },
    {
      titre: "Lire précisément ce qui est demandé",
      texte:
        "Sur un demi-cercle, « la longueur de l'arc » et « le périmètre de la figure » ne sont pas la même question : la seconde ajoute le diamètre. Souligner le mot exact de l'énoncé évite une erreur qui n'a rien de mathématique.",
      micros: ["aire_perimetre_figure_composee"],
    },
  ],
  usages: [
    {
      titre: "La figure est un polygone usuel",
      detail:
        "J'applique le raccourci : $4c$ pour un carré, $2(L+l)$ pour un rectangle. Ce ne sont que des sommes de côtés.",
      micros: ["aire_perimetre_polygone"],
    },
    {
      titre: "La figure est un polygone quelconque",
      detail: "J'additionne tous les côtés, en suivant le contour pour n'en oublier aucun.",
      micros: ["aire_perimetre_polygone"],
    },
    {
      titre: "La figure contient un cercle",
      detail:
        "J'utilise $2\\pi r$ si le rayon est donné, $\\pi d$ si c'est le diamètre. Jamais $\\pi r^2$, qui donne une aire.",
      micros: ["aire_perimetre_cercle"],
    },
    {
      titre: "La figure est composée",
      detail:
        "Je parcours le contour et j'additionne. Je ne découpe pas la figure : les traits de découpe ne sont pas sur le tour.",
      micros: ["aire_perimetre_figure_composee"],
    },
    {
      titre: "On me demande de comparer deux figures",
      detail:
        "Je calcule séparément les deux grandeurs demandées : une même aire n'entraîne pas un même périmètre.",
      micros: ["aire_perimetre_defi"],
    },
  ],
  exemples: [
    {
      titre: "Le terrain à clôturer",
      donnees: "Un terrain rectangulaire mesure 20 m sur 15 m.",
      question: "Quelle longueur de clôture faut-il pour l'entourer entièrement ?",
      solution:
        "La clôture suit le contour : c'est donc un périmètre. Pour un rectangle, chaque dimension figure deux fois : $\\mathcal{P} = 2 \\times (20 + 15) = 2 \\times 35 = 70$ m. ⛔ Répondre 300 serait calculer $20 \\times 15$, c'est-à-dire l'AIRE du terrain — la quantité de gazon, pas la longueur de grillage. L'unité le dit : on achète du grillage au mètre, et 300 m² n'est pas une longueur.",
      schema: legende(
        tableau(
          {
            headers: ["ce qu'on veut", "calcul", "résultat"],
            rows: [
              { values: ["la clôture", "2 × (20 + 15)", "70 m"] },
              { values: ["le gazon", "20 × 15", "300 m²"] },
            ],
            highlight: { row: 0 },
            caption: "même terrain, deux questions",
          },
          "exemple"
        ),
        "Le grillage se compte en mètres, le gazon en mètres carrés."
      ),
      micros: ["aire_perimetre_polygone", "aire_perimetre_comprendre"],
    },
    {
      titre: "La longueur d'un cercle",
      donnees: "Un cercle a un diamètre de 12 cm. On prendra $\\pi \\approx 3{,}14$.",
      question: "Quelle est sa longueur, au centième près ?",
      solution:
        "Le diamètre étant donné, on utilise directement $\\mathcal{P} = \\pi d = 3{,}14 \\times 12 = 37{,}68$ cm. ⛔ Écrire $2\\pi \\times 12$ serait une double erreur de lecture : le facteur 2 sert à passer du rayon au diamètre, et le diamètre est déjà là. On obtiendrait 75,36 cm, soit exactement le double du bon résultat. Contrôle de plausibilité : la longueur d'un cercle vaut environ trois fois son diamètre, et $37{,}68$ est bien un peu plus de trois fois 12.",
      micros: ["aire_perimetre_cercle"],
    },
    {
      titre: "La figure en L",
      donnees:
        "Une figure en L a pour côtés successifs 3 cm, 2 cm, 2 cm, 4 cm, 5 cm et 6 cm.",
      question: "Quel est son périmètre ?",
      solution:
        "Aucune formule ne s'applique : on additionne simplement toutes les longueurs du contour, dans l'ordre où on les rencontre. $3 + 2 + 2 + 4 + 5 + 6 = 22$ cm. ⚠️ La tentation est de découper la figure en deux rectangles et d'additionner leurs périmètres — ce serait faux, car on compterait alors deux fois le trait de découpe, qui n'appartient pas au contour. Le découpage est utile pour l'aire, jamais pour le périmètre.",
      schema: legende(
        surQuadrillage(
          4,
          6,
          [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
            [2, 0],
            [2, 1],
            [2, 2],
            [2, 3],
            [2, 4],
          ],
          "exemple"
        ),
        "Un seul trait fait le tour : c'est lui qu'on mesure."
      ),
      micros: ["aire_perimetre_figure_composee"],
    },
    {
      titre: "L'arc d'un demi-cercle",
      donnees: "Une piste a la forme d'un demi-cercle de rayon 20 m. On prendra $\\pi \\approx 3{,}14$.",
      question: "Quelle est la longueur de la partie courbe ?",
      solution:
        "L'arc est la moitié d'un cercle complet. La longueur du cercle entier vaut $2\\pi r = 2 \\times 3{,}14 \\times 20 = 125{,}6$ m ; sa moitié vaut donc $62{,}8$ m. On peut aussi l'écrire directement $\\pi r = 3{,}14 \\times 20 = 62{,}8$ m. ⚠️ L'énoncé ne demande QUE la partie courbe : on n'ajoute pas le diamètre. Si l'on avait demandé le périmètre complet de la figure, il aurait fallu ajouter $2r = 40$ m, soit $102{,}8$ m.",
      micros: ["aire_perimetre_figure_composee", "aire_perimetre_cercle"],
    },
  ],
  pieges: [
    "Calculer $8 \\times 5$ pour le périmètre d'un rectangle de 8 sur 5. C'est son aire ; le périmètre vaut $2 \\times (8+5) = 26$.",
    "Employer $\\pi r^2$ pour la longueur d'un cercle. Cette formule donne l'aire du DISQUE ; la longueur vaut $2\\pi r$.",
    "Écrire $2\\pi d$ quand le diamètre est donné. Le facteur 2 sert justement à passer du rayon au diamètre : c'est $\\pi d$.",
    "Exprimer un périmètre en cm². Un contour est une longueur, jamais une surface.",
    "Découper une figure composée et additionner les périmètres des morceaux : le trait de découpe serait compté, alors qu'il n'est pas sur le contour.",
    "Confondre l'arc d'un demi-cercle et le périmètre du demi-disque : le second ajoute le diamètre.",
    "Croire que deux figures de même aire ont le même périmètre. Un $1 \\times 36$ et un $6 \\times 6$ ont la même aire, et des périmètres de 74 et 24.",
  ],
  aRetenir: [
    "Le périmètre est la longueur du contour : il s'exprime en cm, jamais en cm².",
    "Pour un polygone quelconque, on additionne simplement tous les côtés.",
    "Carré : $4c$. Rectangle : $2(L + l)$.",
    "Cercle : $2\\pi r$ si l'on a le rayon, $\\pi d$ si l'on a le diamètre.",
    "$\\pi r^2$ est l'aire du disque — jamais un périmètre.",
    "Sur une figure composée, on suit le contour ; on ne la découpe pas.",
    "Agrandir dans un rapport $k$ multiplie les longueurs par $k$ — les aires par $k^2$.",
  ],
  entrainement: [
    {
      question: "Le périmètre d'une figure mesure quoi, exactement ?",
      correction:
        "La longueur de son contour, c'est-à-dire la distance à parcourir pour en faire le tour. Ce n'est pas sa surface, qui est mesurée par l'aire.",
      micros: ["aire_perimetre_comprendre"],
    },
    {
      question: "Quel est le périmètre d'un rectangle de 9 cm sur 4 cm ?",
      correction:
        "$2 \\times (9 + 4) = 2 \\times 13 = 26$ cm. Chaque dimension apparaît deux fois sur le contour.",
      micros: ["aire_perimetre_polygone"],
    },
    {
      question: "Un carré a un périmètre de 28 cm. Quelle est la longueur de son côté ?",
      correction:
        "Le périmètre vaut $4c$, donc $c = 28 \\div 4 = 7$ cm. Contrôle : $4 \\times 7 = 28$.",
      micros: ["aire_perimetre_polygone"],
    },
    {
      question: "Quelle est la formule de la longueur d'un cercle de rayon $r$ ?",
      correction:
        "$2\\pi r$. Avec le diamètre, cela s'écrit aussi $\\pi d$, puisque $d = 2r$.",
      micros: ["aire_perimetre_cercle"],
    },
    {
      question:
        "Un élève utilise $\\pi r^2$ pour calculer la longueur d'un cercle. A-t-il raison ?",
      correction:
        "Non : $\\pi r^2$ donne l'aire du disque. Le carré sur le rayon signale une surface, et le résultat s'exprimerait en cm². La longueur vaut $2\\pi r$.",
      micros: ["aire_perimetre_cercle"],
    },
    {
      question:
        "Un cercle a un rayon de 5 cm. Quelle est sa longueur au centième près, avec $\\pi \\approx 3{,}14$ ?",
      correction: "$2 \\times 3{,}14 \\times 5 = 31{,}40$ cm.",
      micros: ["aire_perimetre_cercle"],
    },
    {
      question:
        "Une figure en L a pour côtés successifs 4, 3, 2, 5, 6 et 8 cm. Quel est son périmètre ?",
      correction:
        "On additionne toutes les longueurs du contour : $4 + 3 + 2 + 5 + 6 + 8 = 28$ cm. Aucune formule n'intervient.",
      micros: ["aire_perimetre_figure_composee"],
    },
    {
      question: "Un demi-cercle a un rayon de 6 cm. Quelle est la longueur exacte de son arc ?",
      correction:
        "La moitié de $2\\pi \\times 6 = 12\\pi$, soit $6\\pi$ cm. « Exacte » signifie qu'on garde $\\pi$ au lieu de le remplacer par 3,14.",
      micros: ["aire_perimetre_figure_composee"],
    },
    {
      question: "Deux figures ont la même aire. Ont-elles forcément le même périmètre ?",
      correction:
        "Non. Un rectangle de $1 \\times 36$ et un carré de $6 \\times 6$ ont tous deux une aire de 36, mais des périmètres de 74 et 24. Les deux grandeurs sont indépendantes.",
      micros: ["aire_perimetre_defi"],
    },
    {
      question: "Si l'on double le rayon d'un cercle, par combien sa longueur est-elle multipliée ?",
      correction:
        "Par 2. Dans $2\\pi r$, le rayon figure à la puissance 1 : une longueur suit donc le rapport d'agrandissement tel quel. L'aire, elle, serait multipliée par 4.",
      micros: ["aire_perimetre_defi"],
    },
  ],
  coachHref: "/coach?matiere=maths&classe=3e&notion=aire_perimetre",
};

// ─── Mode classe ───────────────────────────────────────────────────────────────
// ⛔ AUCUN LaTeX DANS CES DIAPOSITIVES. `ModeClasse` ne rend pas KaTeX : une
// formule écrite entre dollars s'afficherait EN CLAIR sur le tableau de la
// classe, code compris. Tout s'écrit donc en toutes lettres.

export const slidesPerimetres3e: ClasseSlide[] = [
  {
    titre: "La clôture ou le gazon",
    badge: "Ce qu'on va distinguer",
    section: {
      type: "objectif",
      phrase: "Deux questions sur le même terrain",
      sousPhrase:
        "Pour le clôturer, on achète du grillage au mètre. Pour l'engazonner, de la pelouse au mètre carré. La première mesure un contour, la seconde une surface — et elles n'ont rien à voir.",
      encadre: {
        titre: "Le repère qui ne trompe jamais",
        texte:
          "L'unité. Un périmètre s'exprime en centimètres ou en mètres. Une aire en centimètres carrés. Un périmètre annoncé en cm carrés est forcément faux.",
      },
    },
  },
  {
    titre: "Le piège du rectangle",
    badge: "Attention",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on écrit trop vite",
        contenu:
          "Un rectangle de huit sur cinq : huit fois cinq, quarante. On a multiplié parce que les deux nombres étaient là.",
      },
      droite: {
        variante: "ok",
        titre: "Ce qui est vrai",
        contenu:
          "Quarante, c'est son AIRE. Son périmètre vaut deux fois, parenthèse, huit plus cinq, soit vingt-six. On additionne les côtés, on ne les multiplie pas.",
      },
    },
  },
  {
    titre: "Pour un polygone, on additionne",
    badge: "La règle générale",
    section: {
      type: "etapes",
      etapes: [
        "Je pars d'un sommet et je suis le contour dans un sens.",
        "Je note chaque longueur au fur et à mesure, sans en sauter.",
        "J'additionne le tout : c'est le périmètre.",
        "Les formules du carré et du rectangle ne sont que ce calcul écrit plus court.",
      ],
    },
  },
  {
    titre: "Les deux formules du cercle",
    badge: "À ne plus confondre",
    teinte: "essentiel",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Le CERCLE, une ligne",
        contenu:
          "Sa longueur vaut deux pi r. Ou pi d si c'est le diamètre qui est donné. Le résultat est en centimètres.",
      },
      droite: {
        variante: "info",
        titre: "Le DISQUE, une surface",
        contenu:
          "Son aire vaut pi r au carré. Le résultat est en centimètres carrés. Le carré dans la formule trahit la surface.",
      },
    },
  },
  {
    titre: "Regarder ce qui est donné",
    badge: "L'autre erreur du cercle",
    teinte: "piege",
    section: {
      type: "objectif",
      phrase: "Rayon ou diamètre : ce n'est pas la même formule",
      sousPhrase:
        "Avec un diamètre de douze centimètres, écrire deux pi fois douze double la réponse. Le facteur deux servait justement à passer du rayon au diamètre — et le diamètre est déjà là.",
      encadre: {
        titre: "Le contrôle de bon sens",
        texte:
          "La longueur d'un cercle vaut environ trois fois son diamètre. Si votre résultat en vaut six fois, vous avez compté deux fois.",
      },
    },
  },
  {
    titre: "Une figure composée",
    badge: "Ne pas découper",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "La fausse bonne idée",
        contenu:
          "Découper la figure en deux rectangles, calculer les deux périmètres, et les additionner. On compte alors le trait de découpe, qui n'est pas sur le contour.",
      },
      droite: {
        variante: "ok",
        titre: "La seule méthode sûre",
        contenu:
          "Suivre le contour sans le quitter, et additionner les longueurs rencontrées. Le découpage sert pour l'aire, jamais pour le périmètre.",
      },
    },
  },
  {
    titre: "Même aire, périmètres différents",
    badge: "Ce qui surprend",
    teinte: "essentiel",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Un rectangle très allongé",
          texte:
            "Un sur trente-six : son aire vaut trente-six, et son périmètre soixante-quatorze.",
        },
        {
          titre: "Le carré",
          texte:
            "Six sur six : la même aire de trente-six, mais un périmètre de vingt-quatre seulement.",
        },
        {
          titre: "Ce qu'il faut en retenir",
          texte:
            "Les deux grandeurs sont indépendantes. À aire égale, le carré est le rectangle qui a le plus petit contour.",
        },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    teinte: "exemple",
    section: {
      type: "exemple",
      enonce: "Un cercle a un diamètre de douze centimètres. On prendra pi environ égal à trois virgule quatorze.",
      question: "Quelle est sa longueur ?",
      correction:
        "On commence par regarder CE QUI EST DONNÉ : c'est le diamètre, pas le rayon. La formule qui va avec est donc pi fois d, ce qui donne trois virgule quatorze fois douze, soit trente-sept virgule soixante-huit centimètres. L'erreur classique serait d'écrire deux pi fois douze : on obtiendrait soixante-quinze virgule trente-six, exactement le double, parce qu'on aurait traité le diamètre comme un rayon. Le contrôle est immédiat et vaut pour tous les cercles : la longueur fait environ trois fois le diamètre. Trente-sept pour un diamètre de douze, c'est cohérent ; soixante-quinze ne l'était pas.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    teinte: "exercice",
    section: {
      type: "exercice",
      enonce: "Une piste a la forme d'un demi-cercle de rayon vingt mètres.",
      question: "Quelle est la longueur de sa partie courbe ?",
      indice: "Un demi-cercle, c'est la moitié d'un cercle entier. Et relisez bien ce qu'on vous demande.",
      correction:
        "La longueur du cercle entier vaudrait deux pi r, soit deux fois trois virgule quatorze fois vingt : cent vingt-cinq virgule six mètres. La partie courbe en est la moitié, donc soixante-deux virgule huit mètres. On peut aussi l'écrire directement pi fois r. Et attention à ce qui était demandé : SEULEMENT la partie courbe. Si l'on avait demandé le périmètre complet de la figure, il aurait fallu ajouter le diamètre qui la referme, soit quarante mètres de plus, ce qui aurait donné cent deux virgule huit mètres.",
    },
  },
];
