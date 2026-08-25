// ─── Fiche de cours : les transformations (4e) ─────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach (4e/maths/transformations.bank.ts).
// Micro-compétences couvertes → blocs :
//   sym_axiale                    → Propriété « La symétrie axiale », méthode « Reconnaître », exemple 1
//   sym_centrale                  → Définition, figure, propriété « La symétrie centrale », exemple 1
//   sym_translation               → Propriété « La translation », méthode « Construire », exemple 2
//   sym_rotation                  → Propriété « La rotation », exemple 3
//   sym_transformation_propriete  → Propriété « Ce qui ne change jamais », usage 3, méthode « Vérifier »
//   sym_transformation_defi       → Exercice 4
//
// ⭐ ICI, POUR UNE FOIS, LE CANVAS ÉVIDENT NE SE RÉPÈTE PAS : `transformation`
// dessine quatre choses réellement différentes — un axe-miroir, un centre et son
// demi-tour, un vecteur qui glisse, un angle qui pivote. Les quatre propriétés
// portent donc le même `kind` et quatre images qu'on ne confond pas.
//
// ⭐ EN REVANCHE, LA CINQUIÈME PROPRIÉTÉ — « ce qui ne change jamais » — ne se
// dessine PAS avec ce canvas : il montre toujours UNE transformation, jamais ce
// qu'elles ont en commun. Les aires conservées se comptent : `figure_libre`, et
// six carreaux de chaque côté.
//
// ⛔ `transformation` FAIT PARTIE DES CANVAS QUI NE SE LAISSENT PAS RÉTRÉCIR
// (note du 24/08) : il dessine depuis une origine fixe, et sa largeur se déduit de
// `cols × cellSize + 2 × padding`. La seule commande est donc `cellSize`, jamais
// `width` — sinon la grille est rognée.
//
// Les figures et la grille 8 × 8 sont celles de la banque.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const BLEU = "#2563eb";

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// ⛔ `cellSize` ET NON `width` : 8 colonnes à 23 px plus 2 × 20 de marge font
// 224 px, soit la largeur d'une carte de propriété. Régler `width` rognerait la
// grille au lieu de la mettre à l'échelle.
// ⚠️ ET `padding` À 26, PAS 20 (le défaut) : l'étiquette de l'axe est écrite
// AU-DESSUS de la grille, et elle sortait du cadre de 1,8 px — mesuré en 1280
// seulement. La largeur totale vaut `cols × cellSize + 2 × padding` : on reprend
// les six pixels sur la cellule pour rester à 228.
const CELL_CARTE = 22;
const CELL_EXEMPLE = 20;
const PADDING = 26;

type Pt = { x: number; y: number };

const transfo = (opts: {
  transformation: "symetrie_axiale" | "symetrie_centrale" | "translation" | "rotation";
  source: Pt[];
  image: Pt[];
  axis?: { type: "vertical" | "horizontal"; x?: number; y?: number; label?: string };
  center?: { point: Pt; label?: string };
  vector?: { from: Pt; to: Pt; label?: string };
  angleDeg?: number;
  liens?: boolean;
  bloc?: "carte" | "exemple";
}) => (
  <CanvasRenderer
    figure={
      {
        kind: "transformation",
        transformation: opts.transformation,
        size: {
          cellSize: opts.bloc === "exemple" ? CELL_EXEMPLE : CELL_CARTE,
          padding: PADDING,
        },
        grid: { rows: 8, cols: 8 },
        source: { label: "F", points: opts.source },
        image: { label: "F'", points: opts.image },
        axis: opts.axis,
        center: opts.center,
        vector: opts.vector,
        angleDeg: opts.angleDeg,
        display: {
          showGrid: true,
          showLabels: true,
          showPoints: true,
          showDashedLinks: opts.liens ?? false,
          showTransformationInfo: false,
        },
      } as never
    }
  />
);

// ⭐ CE QUE LES QUATRE TRANSFORMATIONS ONT EN COMMUN NE SE DESSINE PAS AVEC
// `transformation` : il montre toujours UNE transformation en particulier. Les
// aires conservées, elles, se COMPTENT — six carreaux d'un côté, six de l'autre.
// C'est le seul dessin de la fiche où l'on ne voit ni axe, ni centre, ni flèche :
// juste deux figures qui occupent la même place.
const memesCarreaux = legende(
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { width: 224, height: 118, cellSize: 24 },
      grid: {
        rows: 3,
        cols: 9,
        filledCells: [
          [0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [1, 1],
          [0, 8], [1, 8], [2, 8], [2, 7], [2, 6], [1, 7],
        ],
      },
      display: { showGrid: true, showFilled: true },
      colors: { filled: "#bfdbfe", border: BLEU },
    }}
  />,
  "6 carreaux avant, 6 carreaux après"
);

// L'INDICE QUI DÉSIGNE LA TRANSFORMATION. Ce n'est pas une figure, c'est une
// grille de lecture — et c'est exactement ce qu'un tableau montre mieux qu'un
// dessin. Chaque ligne répond à la question « qu'est-ce qui est donné ? ».
const quelIndice = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Ce qui est donné", "La transformation"],
      rows: [
        { values: ["un axe", "symétrie axiale"] },
        { values: ["un centre seul", "symétrie centrale"] },
        { values: ["une flèche", "translation"] },
        { values: ["un centre + un angle", "rotation"] },
      ],
      display: { compact: true, striped: true },
    }}
  />
);

const pieges = [
  "Confondre symétrie centrale et rotation : la symétrie centrale EST une rotation, mais toujours d'un demi-tour, c'est-à-dire de 180°.",
  "Croire qu'une symétrie axiale et une symétrie centrale donnent la même image : le miroir retourne la figure, le demi-tour la fait pivoter. Ce n'est pas la même chose.",
  "Oublier que l'axe est la médiatrice : il ne suffit pas qu'il passe entre le point et son image, il doit être perpendiculaire et à égale distance des deux.",
];

const aRetenir = [
  "Quatre transformations : symétrie axiale (un axe), symétrie centrale (un centre), translation (une flèche), rotation (un centre et un angle).",
  "Toutes conservent les longueurs, les angles et les aires : la figure image a exactement la même forme et la même taille.",
  "Seule la symétrie axiale retourne la figure, comme un miroir. Les trois autres la déplacent sans la retourner.",
];

export const ficheTransformations4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "sym-transformation",
  titre: "Les transformations",
  accroche:
    "Retourner, faire pivoter, glisser : quatre façons de déplacer une figure sans jamais la déformer. Ce qui change, c'est la place ; ce qui ne change jamais, ce sont les longueurs, les angles et l'aire.",
  identite: [
    { label: "Les quatre", valeur: "Symétrie axiale, symétrie centrale, translation, rotation" },
    { label: "Ce qui se conserve", valeur: "Longueurs, angles et aires — toujours" },
    { label: "L'exception", valeur: "Seule la symétrie axiale retourne la figure" },
  ],
  definition: {
    texte:
      "Une transformation déplace tous les points d'une figure selon une même règle, et fabrique une figure image. La figure de départ et son image ont exactement la même forme et la même taille : on dit qu'elles sont superposables. Ce qui distingue les quatre transformations, c'est la règle de déplacement — et ce qu'il faut connaître pour l'appliquer.",
  },
  figure: {
    schema: transfo({
      transformation: "symetrie_centrale",
      source: [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 2, y: 3 }],
      image: [{ x: 7, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 5 }],
      center: { point: { x: 4, y: 4 }, label: "O" },
      liens: true,
    }),
    legende: "Chaque point et son image sont à égale distance du centre O, de part et d'autre.",
  },
  proprietes: [
    {
      titre: "La symétrie axiale : un miroir",
      micros: ["sym_axiale"],
      texte:
        "L'axe se comporte comme un miroir : il est la médiatrice du segment qui relie chaque point à son image. C'est la seule des quatre qui RETOURNE la figure.",
      schema: transfo({
        transformation: "symetrie_axiale",
        source: [{ x: 1, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 4 }],
        image: [{ x: 7, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 4 }],
        axis: { type: "vertical", x: 4, label: "axe" },
      }),
    },
    {
      titre: "La symétrie centrale : un demi-tour",
      micros: ["sym_centrale"],
      texte:
        "Le centre est le milieu du segment qui relie chaque point à son image. La figure fait un demi-tour complet : elle n'est pas retournée, elle est renversée.",
      schema: transfo({
        transformation: "symetrie_centrale",
        source: [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 2, y: 3 }],
        image: [{ x: 7, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 5 }],
        center: { point: { x: 4, y: 4 }, label: "O" },
      }),
    },
    {
      titre: "La translation : un glissement",
      micros: ["sym_translation"],
      texte:
        "Tous les points glissent de la même façon : même direction, même sens, même longueur. La flèche dit les trois à la fois.",
      schema: transfo({
        transformation: "translation",
        source: [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 2, y: 3 }],
        image: [{ x: 5, y: 4 }, { x: 7, y: 4 }, { x: 6, y: 6 }],
        // ⚠️ Étiquette courte : « 4 à droite, 3 en bas » fait vingt signes et vient
        // toucher le nom de la figure image (mesuré sur l'exemple 2). Le libellé
        // d'un vecteur se compte en caractères, comme la phrase du bas d'un
        // schéma — viser dix.
        vector: { from: { x: 1, y: 1 }, to: { x: 5, y: 4 }, label: "(+4 ; +3)" },
      }),
    },
    {
      titre: "La rotation : un pivot",
      micros: ["sym_rotation"],
      texte:
        "La figure pivote autour d'un centre, d'un angle donné et dans un sens donné. Il faut les trois : sans l'angle ou sans le sens, l'image n'est pas définie.",
      schema: transfo({
        transformation: "rotation",
        source: [{ x: 5, y: 3 }, { x: 7, y: 3 }, { x: 6, y: 5 }],
        image: [{ x: 5, y: 5 }, { x: 5, y: 7 }, { x: 3, y: 6 }],
        center: { point: { x: 4, y: 4 }, label: "O" },
        angleDeg: 90,
      }),
    },
    {
      titre: "Ce qui ne change jamais",
      micros: ["sym_transformation_propriete"],
      texte:
        "Les quatre transformations conservent les longueurs, les angles et les aires. La figure image occupe exactement le même nombre de carreaux que la figure de départ.",
      schema: memesCarreaux,
    },
  ],
  reel: {
    texte:
      "Les transformations sont partout dès qu'un motif se répète. À La Réunion, c'est le carrelage d'une varangue, les losanges d'une case créole, les frises d'un tissu, la vannerie en vacoa : un motif de base, puis des translations pour le répéter et des symétries pour le retourner. C'est aussi ce que fait un logiciel de dessin quand on copie-colle en miroir, et ce que font les usines quand elles découpent un patron symétrique pour économiser du tissu.",
  },
  historique: {
    texte:
      "Les artisans de l'Alhambra de Grenade, au XIVe siècle, ont couvert les murs de pavages géométriques qui utilisent les dix-sept façons possibles de répéter un motif dans le plan — bien avant que les mathématiciens ne démontrent, en 1891, qu'il n'en existe que dix-sept. L'artiste néerlandais Escher est allé les étudier sur place en 1936 : c'est de là que viennent ses lézards et ses oiseaux emboîtés.",
  },
  methode: [
    {
      titre: "Reconnaître",
      micros: ["sym_axiale", "sym_rotation"],
      texte:
        "On ne devine pas la transformation en regardant la figure : on regarde ce que l'énoncé DONNE. Un axe, un centre seul, une flèche, ou un centre avec un angle — chaque donnée désigne une seule transformation.",
      schema: quelIndice,
    },
    {
      titre: "Construire",
      micros: ["sym_translation"],
      texte:
        "On ne construit jamais la figure entière d'un coup : on construit l'image de chaque sommet, un par un, puis on relie. Les traits pointillés du dessin montrent ce report point par point.",
      schema: transfo({
        transformation: "translation",
        source: [{ x: 1, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 4 }],
        image: [{ x: 5, y: 2 }, { x: 7, y: 2 }, { x: 6, y: 4 }],
        // Même règle : dix signes touchaient encore le nom de la figure image
        // d'un dixième de pixel. La notation chiffrée règle la question, et elle
        // est de toute façon celle qu'on écrira en 3e avec les vecteurs.
        vector: { from: { x: 1, y: 2 }, to: { x: 5, y: 2 }, label: "(+4 ; 0)" },
        liens: true,
      }),
    },
    {
      titre: "Vérifier",
      micros: ["sym_transformation_propriete"],
      // Un bloc peut rester sans dessin quand le dessin redirait le texte
      // (arbitrage de Frédéric, 25/08). Les trois contrôles sont des comparaisons
      // de longueurs, déjà dessinées à la propriété « Ce qui ne change jamais ».
      texte:
        "Trois contrôles, dans cet ordre. Les longueurs sont-elles conservées ? La figure a-t-elle la même aire ? Et si c'est une symétrie axiale, est-elle bien retournée — sinon, c'est qu'on a fait un demi-tour.",
    },
  ],
  usages: [
    {
      titre: "Reconnaître une transformation",
      micros: ["sym_axiale", "sym_centrale"],
      detail:
        "On identifie ce qui est donné — axe, centre, flèche, angle — puis on vérifie sur un point : son image est-elle bien à la place attendue ?",
    },
    {
      titre: "Construire une image",
      micros: ["sym_translation", "sym_rotation"],
      detail:
        "On construit sommet par sommet, en appliquant la même règle à chacun, puis on relie les images dans le même ordre que les points de départ.",
    },
    {
      titre: "Démontrer avec les propriétés",
      micros: ["sym_transformation_propriete"],
      detail:
        "Comme les longueurs et les angles sont conservés, on peut affirmer qu'une longueur de l'image est égale à celle de départ — sans la mesurer.",
    },
  ],
  exemples: [
    {
      titre: "Miroir ou demi-tour ?",
      micros: ["sym_axiale", "sym_centrale"],
      donnees:
        "Une figure et son image se trouvent de part et d'autre d'un point O, et O est le milieu de chaque segment qui relie un point à son image.",
      question: "De quelle transformation s'agit-il ?",
      schema: transfo({
        bloc: "exemple",
        transformation: "symetrie_centrale",
        source: [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 2, y: 3 }],
        image: [{ x: 7, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 5 }],
        center: { point: { x: 4, y: 4 }, label: "O" },
        liens: true,
      }),
      solution:
        "C'est une symétrie centrale de centre O. La donnée décisive est « O est le milieu » : dans une symétrie axiale, c'est un AXE qui est médiatrice, pas un point qui est milieu. Contrôle visuel : la figure n'est pas retournée comme dans un miroir, elle est renversée.",
    },
    {
      titre: "Le point qui glisse",
      micros: ["sym_translation"],
      donnees:
        "Le point A a pour coordonnées (1 ; 2). On lui applique une translation de 4 carreaux vers la droite et 2 carreaux vers le bas.",
      question: "Quelles sont les coordonnées de son image A' ?",
      schema: transfo({
        bloc: "exemple",
        transformation: "translation",
        source: [{ x: 1, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 4 }],
        image: [{ x: 5, y: 4 }, { x: 7, y: 4 }, { x: 6, y: 6 }],
        vector: { from: { x: 1, y: 2 }, to: { x: 5, y: 4 }, label: "(+4 ; +2)" },
      }),
      solution:
        "On ajoute le déplacement à chaque coordonnée. L'abscisse passe de 1 à 1 + 4 = 5. L'ordonnée, sur un quadrillage compté vers le bas, passe de 2 à 2 + 2 = 4. Donc A' a pour coordonnées (5 ; 4). Contrôle : tous les autres points ont glissé exactement pareil.",
    },
    {
      titre: "Le quart de tour",
      micros: ["sym_rotation"],
      donnees:
        "Un triangle pivote autour du point O d'un quart de tour, soit 90°, dans le sens des aiguilles d'une montre.",
      question: "Que peut-on dire de ses côtés après la rotation ?",
      schema: transfo({
        bloc: "exemple",
        transformation: "rotation",
        source: [{ x: 5, y: 3 }, { x: 7, y: 3 }, { x: 6, y: 5 }],
        image: [{ x: 5, y: 5 }, { x: 5, y: 7 }, { x: 3, y: 6 }],
        center: { point: { x: 4, y: 4 }, label: "O" },
        angleDeg: 90,
      }),
      solution:
        "Les côtés ont exactement les mêmes longueurs qu'avant, et les angles du triangle sont inchangés : une rotation conserve tout. Seules les DIRECTIONS ont changé — chaque côté a pivoté de 90°. Un côté horizontal est devenu vertical.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Quelle est la seule des quatre transformations qui retourne la figure, comme un miroir ?",
      correction:
        "La symétrie axiale. Les trois autres — symétrie centrale, translation, rotation — déplacent la figure sans jamais la retourner. C'est le contrôle visuel le plus rapide quand on hésite entre deux transformations.",
      micros: ["sym_axiale"],
    },
    {
      question:
        "Le point B(3 ; 5) subit une translation de 2 carreaux vers la gauche et 1 vers le haut. Quelles sont les coordonnées de B' ?",
      correction:
        "Vers la gauche, on retire à l'abscisse : 3 − 2 = 1. Vers le haut, on retire à l'ordonnée comptée vers le bas : 5 − 1 = 4. Donc B' a pour coordonnées (1 ; 4).",
      micros: ["sym_translation"],
    },
    {
      question:
        "Une figure a une aire de 12 cm². Quelle est l'aire de son image par une rotation de 60° ?",
      correction:
        "12 cm² également. Toutes les transformations conservent les aires : la figure image est superposable à la figure de départ, donc elle occupe exactement la même surface. L'angle de rotation n'y change rien.",
      micros: ["sym_transformation_propriete"],
    },
    {
      question:
        "Pourquoi peut-on dire que la symétrie centrale est un cas particulier de rotation ?",
      correction:
        "Parce qu'une symétrie centrale de centre O fait faire à la figure un demi-tour autour de O, c'est-à-dire une rotation de 180°. C'est la seule rotation pour laquelle le sens n'a pas d'importance : 180° dans un sens ou dans l'autre donnent la même image.",
      micros: ["sym_transformation_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesTransformations4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les transformations - 4e",
    section: {
      type: "objectif",
      phrase: "Déplacer une figure sans la déformer",
      sousPhrase:
        "Quatre règles de déplacement : un axe, un centre, une flèche, ou un centre avec un angle.",
      encadre: {
        titre: "L'idée",
        texte: "La place change, la forme et la taille ne changent jamais.",
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
          "Le carrelage d'une varangue, les frises d'un tissu, la vannerie en vacoa, le copier-coller en miroir d'un logiciel de dessin.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Les artisans de l'Alhambra ont utilisé les dix-sept pavages possibles du plan cinq siècles avant qu'on démontre qu'il n'en existe que dix-sept.",
      },
    },
  },
  {
    titre: "Ce qui les distingue",
    badge: "4 repères",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Symétrie axiale", texte: "Un axe, qui agit comme un miroir. La seule qui retourne la figure." },
        { titre: "Symétrie centrale", texte: "Un centre, milieu de chaque segment point-image. Un demi-tour." },
        { titre: "Translation", texte: "Une flèche : même direction, même sens, même longueur pour tous." },
        { titre: "Rotation", texte: "Un centre, un angle et un sens. Il faut les trois." },
      ],
    },
  },
  {
    titre: "Ce qui ne change jamais",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "Longueurs, angles et aires sont conservés",
      sousPhrase:
        "La figure image est superposable à la figure de départ : elle occupe le même nombre de carreaux.",
      encadre: {
        titre: "Conséquence utile",
        texte: "On peut affirmer qu'une longueur est égale sans jamais la mesurer.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheTransformations4e.methode.map((m) => ({
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
      cartes: ficheTransformations4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Le point qui glisse",
    section: {
      type: "exemple",
      enonce: "A(1 ; 2), translation de 4 à droite et 2 vers le bas.",
      question: "Coordonnées de A' ?",
      correction: "1 + 4 = 5 et 2 + 2 = 4, donc A'(5 ; 4).",
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
      enonce: "Une figure a une aire de 12 cm².",
      question: "Quelle est l'aire de son image par une rotation de 60° ?",
      indice: "Que conserve une transformation ?",
      correction: "12 cm² : toutes les transformations conservent les aires.",
    },
  },
];
