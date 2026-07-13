// ─── Fiche de cours : la symétrie axiale (6e) ──────────────────────────────────
// Fiche « en blocs » créée pour coller EXACTEMENT à la banque du coach
// (lib/tutor-v4/questionBank/6e/maths/symetrie.bank.ts).
//
// Couverture des micro-compétences de la banque (pour la relecture du prof) :
// - sym_reconnaitre → definition (miroir/axe), methode (Plier en pensée),
//                     usages (carte 1), exemples (ex. 1), entrainement (Q1),
//                     pieges (3, symétrie ≠ translation)
// - sym_point       → proprietes (La médiatrice), methode (Tracer la
//                     perpendiculaire + Reporter la distance), usages (carte 2),
//                     exemples (ex. 2), entrainement (Q2), pieges (1 et 2)
// - sym_figure      → usages (carte 2), entrainement (Q3), slide « autre exemple »
// - sym_propriete   → proprietes (Conserve les mesures), reel, entrainement (Q4),
//                     aRetenir (1)
// - sym_axe         → proprietes (Les axes des figures usuelles),
//                     usages (carte 3), exemples (implicite), entrainement (Q3),
//                     slide « selon ce que l'on cherche »
// - sym_defi        → entrainement (Q4), pieges (« ça a l'air symétrique »),
//                     slide « exercice flash »

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Une figure et son image par rapport à un axe vertical, dessinées par le
// moteur du coach : l'élève voit le « miroir » et peut compter les carreaux.
const schemaSymetrie = (
  <CanvasRenderer
    figure={{
      kind: "transformation",
      transformation: "symetrie_axiale",
      grid: { rows: 6, cols: 8 },
      size: { cellSize: 30, padding: 18 },
      axis: { type: "vertical", x: 4, label: "axe" },
      source: { points: [{ x: 1, y: 1 }, { x: 1, y: 4 }, { x: 3, y: 1 }], label: "figure" },
      image: { points: [{ x: 7, y: 1 }, { x: 7, y: 4 }, { x: 5, y: 1 }], label: "image" },
      display: {
        showGrid: true,
        showLabels: true,
        showPoints: true,
        showDashedLinks: true,
      },
    }}
  />
);

// Exemple 1 : une figure bleue et son reflet de l'autre côté de l'axe vertical.
const symReflet = (
  <CanvasRenderer
    figure={{
      kind: "transformation",
      transformation: "symetrie_axiale",
      grid: { rows: 6, cols: 8 },
      size: { cellSize: 30, padding: 18 },
      axis: { type: "vertical", x: 4, label: "axe" },
      source: { points: [{ x: 1, y: 1 }, { x: 3, y: 2 }, { x: 1, y: 4 }], label: "figure" },
      image: { points: [{ x: 7, y: 1 }, { x: 5, y: 2 }, { x: 7, y: 4 }], label: "image" },
      display: { showGrid: true, showLabels: true, showPoints: true, showDashedLinks: true },
    }}
  />
);

// Exemple 2 : l'image A' d'un point A situé à 3 carreaux de l'axe.
const symPoint = (
  <CanvasRenderer
    figure={{
      kind: "transformation",
      transformation: "symetrie_axiale",
      grid: { rows: 6, cols: 8 },
      size: { cellSize: 30, padding: 18 },
      axis: { type: "vertical", x: 4, label: "axe" },
      source: { points: [{ x: 1, y: 3 }], label: "A" },
      image: { points: [{ x: 7, y: 3 }], label: "A'" },
      display: { showGrid: true, showLabels: true, showPoints: true, showDashedLinks: true },
    }}
  />
);

const pieges = [
  "Placer l'image du bon côté de l'axe mais pas à la bonne distance : le point et son image doivent être exactement à la même distance de l'axe.",
  "Oublier que le segment qui relie un point à son image est perpendiculaire à l'axe : l'axe doit couper ce segment en son milieu.",
  "Confondre symétrie et translation : une symétrie retourne la figure comme un miroir, une translation la fait juste glisser sans la retourner.",
  "Se fier à l'impression « ça a l'air symétrique » : il faut vérifier plusieurs sommets, pas seulement la forme générale.",
];

const aRetenir = [
  "La symétrie axiale, c'est le pliage le long d'un axe : la figure et son image se superposent exactement.",
  "L'image d'un point est de l'autre côté de l'axe, à la même distance ; l'axe est la médiatrice du segment qui les relie.",
  "Une symétrie axiale conserve tout : les longueurs, les angles, les aires et l'alignement. Elle ne déforme rien.",
];

export const ficheSymetrie6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "sym-axiale",
  titre: "La symétrie axiale",
  accroche:
    "La symétrie axiale, c'est le miroir des mathématiques : une droite, l'axe, sépare une figure de son reflet. En 6e, on apprend à la reconnaître, à construire l'image d'un point ou d'une figure, à utiliser ses propriétés et à trouver les axes des figures usuelles.",
  identite: [
    { label: "Prérequis", valeur: "Se repérer sur un quadrillage, tracer une droite perpendiculaire" },
    { label: "Idée clé", valeur: "L'axe joue le rôle d'un miroir : l'image est le reflet de la figure" },
    { label: "Outil", valeur: "Le pliage : la figure et son image se superposent le long de l'axe" },
  ],
  definition: {
    texte:
      "La symétrie axiale transforme une figure comme dans un miroir, par rapport à une droite appelée l'axe de symétrie. Si l'on plie la feuille le long de cet axe, la figure et son image se superposent exactement. Le mot « axiale » vient d'« axe » : c'est cette droite qui sert de miroir.",
  },
  figure: {
    schema: schemaSymetrie,
    legende: "La figure et son image se replient l'une sur l'autre le long de l'axe.",
  },
  proprietes: [
    {
      titre: "L'image d'un point",
      texte:
        "L'image d'un point A est le point A', placé de l'autre côté de l'axe, à la même distance de l'axe. Si A est déjà sur l'axe, il ne bouge pas : son image est lui-même.",
    },
    {
      titre: "L'axe est la médiatrice",
      texte:
        "Le segment [AA'] qui relie un point à son image est toujours perpendiculaire à l'axe, et l'axe le coupe en son milieu. Autrement dit, l'axe est la médiatrice de [AA'].",
    },
    {
      titre: "La symétrie conserve les mesures",
      texte:
        "Une symétrie axiale ne déforme pas la figure : elle conserve les longueurs, les mesures d'angles, les aires, les périmètres et l'alignement des points. Un segment de 7 cm a une image de 7 cm ; un angle de 40° a une image de 40°.",
    },
    {
      titre: "Les axes des figures usuelles",
      texte:
        "Un rectangle non carré possède 2 axes de symétrie, un carré en possède 4 (les deux médianes et les deux diagonales), un triangle équilatéral en possède 3, un triangle isocèle non équilatéral en possède 1 et un cercle en possède une infinité.",
    },
  ],
  reel: {
    texte:
      "La symétrie axiale est partout autour de nous : les ailes d'un papillon sont l'image l'une de l'autre par rapport au corps, une façade d'immeuble se reflète de part et d'autre de la porte centrale, et beaucoup de logos de marques sont construits autour d'un axe. Comme la symétrie conserve la forme et la taille, le reflet est identique à l'original, seulement retourné.",
  },
  historique: {
    texte:
      "L'idée de symétrie est très ancienne : les artisans de l'Égypte et de la Grèce antique l'utilisaient déjà pour décorer temples et poteries. Le mot « symétrie » vient du grec « summetria », qui signifiait « juste proportion ». En 1872, le mathématicien allemand Felix Klein a réuni toutes les transformations, dont la symétrie, dans une même théorie : la géométrie devient l'étude de ce qui ne change pas quand on transforme une figure.",
  },
  methode: [
    {
      titre: "Plier en pensée",
      texte:
        "Pour reconnaître une symétrie, on imagine que l'on plie la feuille le long de l'axe. Si la figure et son image se superposent exactement, c'est bien une symétrie axiale.",
    },
    {
      titre: "Tracer la perpendiculaire",
      texte:
        "Pour construire l'image d'un point A, on trace la droite perpendiculaire à l'axe qui passe par A. C'est sur cette droite que se trouvera l'image A'.",
    },
    {
      titre: "Reporter la distance",
      texte:
        "On mesure la distance de A à l'axe, puis on reporte cette même distance de l'autre côté, sur la perpendiculaire. On obtient A'. Pour une figure, on répète ce geste pour chaque sommet.",
    },
  ],
  usages: [
    {
      titre: "Reconnaître une symétrie",
      detail:
        "Vérifier qu'une figure est bien l'image d'une autre par symétrie axiale : on contrôle que chaque point et son image sont à la même distance de l'axe, de part et d'autre.",
    },
    {
      titre: "Construire l'image",
      detail:
        "Construire l'image d'un point ou d'une figure : perpendiculaire à l'axe, même distance de l'autre côté. Pour un triangle ABC, on construit A', B', C' puis on relie les points.",
    },
    {
      titre: "Trouver les axes",
      detail:
        "Chercher les axes de symétrie d'une figure : on teste mentalement les pliages possibles. Rectangle : 2 axes, carré : 4, triangle équilatéral : 3, cercle : une infinité.",
    },
  ],
  exemples: [
    {
      titre: "Reconnaître une symétrie axiale",
      donnees:
        "Sur un quadrillage, une figure bleue est reflétée de l'autre côté d'une droite verticale, comme dans un miroir.",
      question: "Quelle transformation relie la figure bleue à son reflet ?",
      schema: symReflet,
      solution:
        "On repère l'axe vertical qui sépare les deux figures. Chaque point du reflet est de l'autre côté de l'axe, à la même distance que le point d'origine : l'axe joue le rôle d'un miroir. La transformation utilisée est donc une symétrie axiale (et non une translation, qui ferait glisser la figure sans la retourner).",
    },
    {
      titre: "Construire l'image d'un point",
      donnees: "Le point A est à 3 carreaux à gauche d'un axe vertical.",
      question: "Où placer son image A' par symétrie axiale ?",
      schema: symPoint,
      solution:
        "On trace la perpendiculaire à l'axe passant par A : c'est une ligne horizontale. On reporte la même distance de l'autre côté de l'axe : A étant à 3 carreaux à gauche, A' se place à 3 carreaux à droite de l'axe, sur cette même ligne. L'axe est alors le milieu du segment [AA'].",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Sur un motif de carrelage, une figure est reflétée de l'autre côté d'un axe vertical, comme dans un miroir. S'agit-il d'une symétrie axiale ou d'une translation ? Explique.",
      correction:
        "Il y a un axe vertical qui joue le rôle de miroir : la figure est retournée de l'autre côté, à la même distance. C'est donc une symétrie axiale. Ce n'est pas une translation, car une translation ferait seulement glisser la figure dans une direction, sans la retourner.",
    },
    {
      question:
        "Le point A est à 4 carreaux au-dessus d'un axe horizontal. Où se trouve son image A' ? À quelle distance de l'axe se trouve-t-elle ?",
      correction:
        "L'image se place de l'autre côté de l'axe, à la même distance : A' est donc à 4 carreaux au-dessous de l'axe horizontal. La symétrie conserve la distance à l'axe, donc A' est bien à 4 carreaux de l'axe, comme A.",
    },
    {
      question:
        "Pour construire l'image d'un triangle ABC par symétrie axiale, que faut-il faire ? Puis : combien d'axes de symétrie possède un carré ?",
      correction:
        "On construit l'image de chacun des trois sommets : A', B' et C', chacun de l'autre côté de l'axe et à la même distance que le sommet de départ. On relie ensuite A', B' et C' pour obtenir le triangle image. Un carré possède 4 axes de symétrie : les deux médianes (qui passent par les milieux des côtés opposés) et les deux diagonales.",
    },
    {
      question:
        "Défi : un segment [AB] mesure 6 cm et un carré a une aire de 16 cm². Que valent la longueur de l'image [A'B'] et l'aire de l'image du carré par symétrie axiale ?",
      correction:
        "La symétrie axiale conserve les longueurs et les aires : elle ne déforme rien. L'image du segment mesure donc 6 cm, et l'image du carré a une aire de 16 cm². Retenir : ce qui est conservé, ce sont les longueurs, les angles, les aires et l'alignement.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesSymetrie6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Symétrie axiale - 6e",
    section: {
      type: "objectif",
      phrase: "Reconnaître, construire et comprendre la symétrie axiale",
      sousPhrase:
        "La symétrie axiale, c'est le miroir des mathématiques : une droite, l'axe, sépare une figure de son reflet.",
      encadre: {
        titre: "L'idée",
        texte: "Si l'on plie la feuille le long de l'axe, la figure et son image se superposent exactement.",
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
          "Les ailes d'un papillon, une façade d'immeuble, beaucoup de logos : autant de figures construites autour d'un axe. Le reflet est identique à l'original, seulement retourné.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le mot « symétrie » vient du grec « summetria » (juste proportion). En 1872, Felix Klein a fait de la géométrie l'étude de ce qui ne change pas quand on transforme une figure.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheSymetrie6e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "La définition",
    badge: "À connaître",
    section: {
      type: "objectif",
      phrase: "L'axe est un miroir, l'image est le reflet",
      sousPhrase:
        "L'image d'un point est de l'autre côté de l'axe, à la même distance. L'axe est la médiatrice du segment qui relie un point à son image.",
      encadre: {
        titre: "Attention",
        texte: "Un point placé sur l'axe ne bouge pas : son image est lui-même.",
      },
    },
  },
  {
    titre: "Selon ce que l'on cherche",
    badge: "3 gestes",
    section: {
      type: "cartes",
      cartes: ficheSymetrie6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Construire l'image d'un point",
    section: {
      type: "exemple",
      enonce: "Le point A est à 3 carreaux à gauche d'un axe vertical.",
      question: "Où placer son image A' ?",
      correction:
        "Perpendiculaire à l'axe passant par A, puis même distance de l'autre côté : A' est à 3 carreaux à droite de l'axe. L'axe est le milieu de [AA'].",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Image d'un triangle",
    section: {
      type: "exemple",
      enonce: "On veut l'image d'un triangle ABC par symétrie axiale.",
      question: "Que faut-il construire ?",
      correction:
        "L'image de chaque sommet : A', B', C', chacun de l'autre côté de l'axe à la même distance. On relie A'B'C' pour obtenir le triangle image.",
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
      enonce:
        "Un segment [AB] mesure 6 cm et un carré a une aire de 16 cm².",
      question:
        "Que valent la longueur de l'image [A'B'] et l'aire de l'image du carré par symétrie axiale ?",
      indice: "La symétrie axiale ne déforme rien : elle conserve les mesures.",
      correction:
        "L'image du segment mesure 6 cm et l'image du carré a une aire de 16 cm² : longueurs et aires sont conservées.",
    },
  },
];
