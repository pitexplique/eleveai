// ─── Fiche de cours : les triangles (6e) ───────────────────────────────────────
// Fiche « en blocs » créée pour coller EXACTEMENT à la banque du coach
// (lib/tutor-v4/questionBank/6e/maths/triangles.bank.ts).
//
// Couverture des micro-compétences de la banque (pour la relecture du prof) :
// - triangle_nommer          → identite (Idée clé), definition, methode (Nommer),
//                              usages (carte 1), exemples (ex. 1), entrainement (Q1)
// - triangle_sommet_cote     → identite, definition, proprietes (Sommets, côtés...),
//                              methode (Nommer), usages (carte 1), pieges (1)
// - triangle_type_cote       → proprietes (Familles selon les côtés),
//                              usages (carte 2), exemples (ex. 1), entrainement (Q2),
//                              aRetenir (2), slides
// - triangle_type_angle      → proprietes (Selon le plus grand angle),
//                              usages (carte 2), entrainement (Q2), pieges (2)
// - triangle_somme_angle     → proprietes (Somme des angles = 180°), formule,
//                              aRetenir (1), slides
// - triangle_angle_manquant  → methode (Calculer un angle), usages (carte 3),
//                              exemples (ex. 2), entrainement (Q3), slides
// - triangle_possible_ou_non → proprietes (Inégalité triangulaire),
//                              usages (carte 3), pieges (3), entrainement (Q4),
//                              slide « exercice flash »
// - triangle_defi            → entrainement (Q3, Q4), exemples (ex. 2), slides

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// La figure du cours : un triangle quelconque ABC, ses trois sommets et ses
// trois angles marqués — le même moteur de dessin que le coach (lib/canvas),
// pour que l'élève retrouve exactement la figure de ses exercices.
const schemaTriangle = (
  <CanvasRenderer
    figure={{
      kind: "triangle",
      size: { width: 280, height: 220 },
      points: { A: { x: 40, y: 175 }, B: { x: 245, y: 175 }, C: { x: 150, y: 35 } },
      display: { showPoints: true, showLabels: true, showSides: true, showAngles: true },
      labels: { A: "A", B: "B", C: "C" },
    }}
  />
);

// La figure de la définition : le triangle ABC, ses 3 sommets et ses 3 côtés.
const schemaTriangleABC = (
  <CanvasRenderer
    figure={{
      kind: "triangle",
      size: { width: 280, height: 220 },
      points: { A: { x: 40, y: 180 }, B: { x: 245, y: 180 }, C: { x: 150, y: 40 } },
      display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
      labels: { A: "A", B: "B", C: "C" },
    }}
  />
);

// Exemple 1 : le triangle isocèle KLM (deux côtés KL et LM marqués égaux).
const triangleIsocele = (
  <CanvasRenderer
    figure={{
      kind: "triangle",
      size: { width: 280, height: 220 },
      points: { A: { x: 40, y: 180 }, B: { x: 150, y: 40 }, C: { x: 260, y: 180 } },
      display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
      labels: { A: "K", B: "L", C: "M" },
      marks: { equalSides: [["AB", "BC"]] },
    }}
  />
);

// Exemple 2 : deux angles connus (60° et 70°), le troisième cherché.
const triangleAngles = (
  <CanvasRenderer
    figure={{
      kind: "triangle",
      size: { width: 280, height: 220 },
      points: { A: { x: 40, y: 180 }, B: { x: 245, y: 180 }, C: { x: 150, y: 45 } },
      display: { showPoints: true, showLabels: false, showSides: true, showAngles: true },
      angleLabels: { A: "60°", B: "70°", C: "?" },
    }}
  />
);

// ─── Les sept dessins des blocs ───────────────────────────────────────────────
// ⭐ SEPT TRIANGLES NE FONT PAS SEPT DESSINS (REGLES.md § 2 bis). Sur cette
// fiche-là, tout est un triangle : le piège est qu'ils se ressemblent tous. Ce
// qui change d'une carte à l'autre est donc CE QUI EST ÉCRIT DESSUS — les noms
// des côtés, les codages d'égalité, les marques d'angle — et deux blocs ne
// portent pas de triangle du tout : l'inégalité triangulaire est une longueur
// (schéma en barre), et calculer un angle est une soustraction (calcul posé).

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// ⛔ ON EMPILE, ON NE JUXTAPOSE PAS (§ 2 ter) : une carte de propriété fait
// 225 px, trois triangles en ligne y recevraient 70 px chacun.
const pile = (items: { dessin: React.ReactNode; nom: string }[]) => (
  <div className="grid grid-cols-1 gap-2">
    {items.map((it) => (
      <div key={it.nom}>
        {it.dessin}
        <p className="mt-1 text-center text-xs font-black text-slate-700">{it.nom}</p>
      </div>
    ))}
  </div>
);

type Pt = { x: number; y: number };

const triangle = (
  points: { A: Pt; B: Pt; C: Pt },
  opts: {
    labels?: Partial<Record<"A" | "B" | "C", string>>;
    sideLabels?: Partial<Record<"AB" | "BC" | "CA", string>>;
    angleLabels?: Partial<Record<"A" | "B" | "C", string>>;
    marks?: {
      rightAngleAt?: "A" | "B" | "C";
      equalSides?: Array<["AB" | "BC" | "CA", "AB" | "BC" | "CA"]>;
    };
    showAngles?: boolean;
    size?: { width?: number; height?: number };
  } = {}
) => (
  <CanvasRenderer
    figure={{
      kind: "triangle",
      size: opts.size ?? { width: 220, height: 180 },
      points,
      display: {
        showPoints: !!opts.labels,
        showLabels: !!opts.labels,
        showSides: true,
        showAngles: opts.showAngles ?? false,
      },
      labels: opts.labels,
      sideLabels: opts.sideLabels,
      angleLabels: opts.angleLabels,
      marks: opts.marks,
    }}
  />
);

// LES TROIS FOIS TROIS. La figure du cours nomme les sommets ; celle-ci nomme
// AUSSI les côtés et marque les angles — c'est le seul dessin de la fiche où
// les neuf éléments sont écrits en même temps, ce que dit la propriété.
const anatomie = legende(
  triangle(
    { A: { x: 35, y: 145 }, B: { x: 195, y: 145 }, C: { x: 115, y: 35 } },
    {
      labels: { A: "A", B: "B", C: "C" },
      sideLabels: { AB: "AB", BC: "BC", CA: "CA" },
      showAngles: true,
    }
  ),
  "le côté opposé au sommet A, c'est BC"
);

// LES CÔTÉS DÉCIDENT — et ce qu'on regarde, ce sont les CODAGES, pas la forme.
const famillesCotes = pile([
  {
    dessin: triangle(
      { A: { x: 40, y: 145 }, B: { x: 180, y: 145 }, C: { x: 110, y: 24 } },
      { marks: { equalSides: [["AB", "BC"], ["BC", "CA"]] } }
    ),
    nom: "équilatéral : 3 côtés égaux",
  },
  {
    dessin: triangle(
      { A: { x: 40, y: 145 }, B: { x: 110, y: 35 }, C: { x: 180, y: 145 } },
      { marks: { equalSides: [["AB", "BC"]] } }
    ),
    nom: "isocèle : 2 côtés égaux",
  },
  {
    dessin: triangle({ A: { x: 25, y: 145 }, B: { x: 200, y: 145 }, C: { x: 70, y: 40 } }),
    nom: "quelconque : aucun codage",
  },
]);

// LES ANGLES DÉCIDENT — et cette fois c'est la FORME qui change, pas un codage :
// le coin carré, l'angle trop ouvert, les trois angles pointus.
const famillesAngles = pile([
  {
    dessin: triangle(
      { A: { x: 40, y: 145 }, B: { x: 40, y: 35 }, C: { x: 190, y: 145 } },
      { marks: { rightAngleAt: "A" }, showAngles: true }
    ),
    nom: "rectangle : un angle droit",
  },
  {
    dessin: triangle(
      { A: { x: 95, y: 140 }, B: { x: 205, y: 140 }, C: { x: 25, y: 75 } },
      { showAngles: true }
    ),
    nom: "obtusangle : un angle > 90°",
  },
  {
    // ⚠️ 54-54-71 aurait été un aigu ISOCÈLE, sosie du deuxième dessin de la
    // carte d'au-dessus. Décalé à 45-63-72 : trois angles différents, trois
    // côtés différents, et plus aucune confusion avec la famille des côtés.
    dessin: triangle(
      { A: { x: 35, y: 145 }, B: { x: 185, y: 145 }, C: { x: 135, y: 45 } },
      { showAngles: true }
    ),
    nom: "aigu : les trois < 90°",
  },
]);

// L'INÉGALITÉ TRIANGULAIRE EST UNE LONGUEUR, PAS UNE FIGURE. On ne peut pas
// dessiner le triangle impossible — c'est justement le problème. Mis bout à
// bout, les deux petits côtés font 7 : trop court pour rejoindre les deux bouts
// du troisième, qui en mesure 8. Les nombres sont ceux du piège n° 3.
const inegaliteTriangulaire = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      // ⚠️ Au-delà de ~28 caractères, le titre déborde du cadre, en silence.
      title: "Deux côtés bout à bout",
      total: "7 cm",
      parts: [
        { label: "1er côté", value: "3" },
        { label: "2e côté", value: "4" },
      ],
      questionLabel: "7 < 8 : le triangle est impossible",
      // ⚠️ DEUX RÉGLAGES, DEUX MESURES. La HAUTEUR : 175 px collent les
      // étiquettes à la phrase du bas. La LARGEUR : à 300, « 1er côté » et
      // « 2e côté » tombent à 9,1 px dans une carte de 228 — `SchemaBarreCanvas`
      // écrit en 12 px, il faut donc rester sous 245.
      size: { width: 240, height: 190 },
    }}
  />
);

// LE NOM VIENT DES SOMMETS, ET DE RIEN D'AUTRE. Ici, aucun côté n'est nommé,
// aucun angle n'est marqué : il ne reste que les trois lettres qui donnent le
// nom. Ce sont celles de l'usage « Nommer et décrire ».
const trianglePourNommer = legende(
  triangle(
    { A: { x: 35, y: 145 }, B: { x: 195, y: 145 }, C: { x: 145, y: 35 } },
    { labels: { A: "D", B: "E", C: "F" } }
  ),
  "triangle DEF — ou DFE, ou FED : c'est le même"
);

// LES DEUX LECTURES DANS UN SEUL DESSIN. La méthode dit « d'abord les côtés,
// PUIS les angles » : ce triangle-là porte les deux à la fois, deux codages
// d'égalité et le petit carré. Aucune des deux cartes de propriété ne montre ça.
const rectangleEtIsocele = legende(
  triangle(
    { A: { x: 45, y: 150 }, B: { x: 45, y: 40 }, C: { x: 155, y: 150 } },
    { marks: { rightAngleAt: "A", equalSides: [["AB", "CA"]] }, showAngles: true }
  ),
  "les deux à la fois : rectangle ET isocèle"
);

// CALCULER UN ANGLE EST UNE SOUSTRACTION. Le triangle de l'exemple 2 montrait la
// question (60°, 70°, « ? ») ; ici c'est l'opération qu'on effectue, posée. Même
// partage que sur la fiche des périmètres : la figure d'un côté, le calcul de
// l'autre. Les nombres sont ceux de l'exemple 2, pour qu'il les reconnaisse.
const angleManquantPose = legende(
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "soustraction",
      title: "180 − (60 + 70)",
      numbers: ["180", "130"],
      result: "50",
    }}
  />,
  "le troisième angle mesure 50°"
);

const pieges = [
  "Confondre un sommet et un côté : dans le triangle ABC, A, B et C sont les sommets (des points), tandis que AB, BC et CA sont les côtés (des segments).",
  "Croire qu'un triangle avec deux angles droits existe : deux angles droits font déjà 90° + 90° = 180°, il ne resterait plus rien pour le troisième angle.",
  "Oublier de vérifier avant de construire : un triangle n'est possible que si la somme de deux côtés dépasse le troisième. Avec 3 cm, 4 cm et 8 cm, on a 3 + 4 = 7 < 8, donc c'est impossible.",
];

const aRetenir = [
  "Dans tout triangle, la somme des trois angles est toujours égale à 180°.",
  "On classe un triangle selon ses côtés (équilatéral, isocèle, quelconque) et selon ses angles (rectangle, aigu, obtusangle).",
  "Un triangle n'existe que si la longueur d'un côté est plus petite que la somme des deux autres.",
];

export const ficheTriangles6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "triangle-figure",
  titre: "Les triangles",
  accroche:
    "Le triangle est la figure la plus simple : trois points, trois côtés, trois angles. En 6e, on apprend à le nommer, à reconnaître sa nature selon ses côtés et selon ses angles, et à retrouver un angle manquant grâce à une règle qui ne change jamais : la somme des angles vaut 180°.",
  identite: [
    { label: "Prérequis", valeur: "Reconnaître un segment, un point, un angle droit" },
    { label: "Idée clé", valeur: "Un triangle a toujours 3 sommets, 3 côtés et 3 angles" },
    { label: "Outil", valeur: "La règle graduée, l'équerre et le rapporteur" },
  ],
  definition: {
    texte:
      "Un triangle est un polygone qui possède trois côtés. Il est défini par ses trois sommets, que l'on note avec des lettres majuscules : un triangle de sommets A, B et C se nomme « triangle ABC ». Ses trois côtés sont les segments AB, BC et CA, et il possède trois angles, un à chaque sommet.",
  },
  figure: {
    schema: schemaTriangleABC,
    legende: "Le triangle ABC : trois sommets (A, B, C), trois côtés (AB, BC, CA) et trois angles.",
  },
  proprietes: [
    {
      titre: "Sommets, côtés et angles",
      micros: ["triangle_sommet_cote"],
      texte:
        "Un triangle a exactement 3 sommets (des points), 3 côtés (des segments) et 3 angles. Le côté opposé à un sommet est celui qui ne le contient pas : dans le triangle ABC, le côté opposé au sommet A est BC.",
      schema: anatomie,
    },
    {
      titre: "Les familles selon les côtés",
      micros: ["triangle_type_cote"],
      texte:
        "On reconnaît un triangle à ses côtés : équilatéral si ses trois côtés sont de même longueur, isocèle s'il a au moins deux côtés de même longueur, et quelconque si ses trois côtés ont des longueurs toutes différentes. Un triangle équilatéral est un cas particulier de triangle isocèle.",
      schema: famillesCotes,
    },
    {
      titre: "Les familles selon les angles",
      micros: ["triangle_type_angle"],
      texte:
        "On reconnaît aussi un triangle à son plus grand angle : rectangle s'il a un angle droit (90°), obtusangle s'il a un angle supérieur à 90°, et aigu si ses trois angles sont inférieurs à 90°.",
      schema: famillesAngles,
    },
    {
      titre: "La somme des angles et l'inégalité triangulaire",
      micros: ["triangle_defi"],
      texte:
        "Dans tout triangle, la somme des trois angles est toujours égale à 180°. Et pour qu'un triangle existe, la longueur de chaque côté doit être plus petite que la somme des deux autres : c'est l'inégalité triangulaire.",
      schema: inegaliteTriangulaire,
    },
  ],
  reel: {
    texte:
      "Le triangle est la seule forme qui ne se déforme pas quand on pousse dessus : c'est la figure indéformable. C'est pour cela qu'on le retrouve partout dans les constructions solides : la charpente d'un toit, le tablier d'un pont, la structure d'une grue ou d'un pylône électrique. Là où un carré s'affaisse, un triangle tient bon.",
  },
  historique: {
    texte:
      "Vers 300 avant Jésus-Christ, le mathématicien grec Euclide rassemble dans ses « Éléments » les grandes propriétés des triangles, dont la somme des angles. Bien avant lui, les Égyptiens utilisaient déjà un triangle de côtés 3, 4 et 5 pour tracer des angles droits parfaits sur leurs chantiers, grâce à une corde à treize nœuds. Le mot « triangle » vient du latin « tri » (trois) et « angulus » (angle).",
  },
  methode: [
    {
      titre: "Nommer et repérer",
      micros: ["triangle_nommer", "triangle_sommet_cote"],
      texte:
        "On nomme un triangle avec ses trois sommets, peu importe l'ordre : triangle ABC ou triangle CBA désignent la même figure. On repère bien les sommets (les points), les côtés (les segments) et les angles avant de répondre.",
      schema: trianglePourNommer,
    },
    {
      titre: "Reconnaître la nature",
      micros: ["triangle_type_cote", "triangle_type_angle"],
      texte:
        "On observe d'abord les côtés (les codages en traits égaux) pour savoir s'il est équilatéral, isocèle ou quelconque, puis les angles (le petit carré signale l'angle droit) pour savoir s'il est rectangle, aigu ou obtusangle.",
      schema: rectangleEtIsocele,
    },
    {
      titre: "Calculer un angle",
      micros: ["triangle_defi"],
      texte:
        "Pour trouver un angle manquant, on part de 180° et on enlève les deux angles connus : troisième angle = 180 − angle 1 − angle 2. On vérifie toujours que les trois angles additionnés font bien 180°.",
      schema: angleManquantPose,
    },
  ],
  usages: [
    {
      titre: "Nommer et décrire",
      micros: ["triangle_nommer"],
      detail:
        "Passer des sommets au nom du triangle et repérer ses éléments : le triangle de sommets D, E et F se note triangle DEF ; le côté opposé au sommet F est DE.",
    },
    {
      titre: "Reconnaître la nature",
      micros: ["triangle_type_cote"],
      detail:
        "Classer le triangle selon ses côtés (équilatéral, isocèle, quelconque) et selon ses angles (rectangle, aigu, obtusangle). Un même triangle peut cumuler deux natures : rectangle isocèle.",
    },
    {
      titre: "Calculer et vérifier",
      micros: ["triangle_defi"],
      detail:
        "Retrouver un angle manquant avec 180° (troisième = 180 − les deux autres) ou vérifier si un triangle est constructible en comparant la somme de deux côtés au troisième.",
    },
  ],
  exemples: [
    {
      titre: "Nommer un triangle et reconnaître sa nature",
      micros: ["triangle_nommer", "triangle_type_cote"],
      donnees:
        "Un triangle a pour sommets K, L et M. Ses côtés KL et LM sont marqués du même codage : ils ont la même longueur.",
      question: "Comment se nomme ce triangle, et quelle est sa nature selon ses côtés ?",
      schema: triangleIsocele,
      solution:
        "On nomme le triangle avec ses trois sommets : c'est le triangle KLM. Deux de ses côtés (KL et LM) ont la même longueur : il possède donc deux côtés égaux. Un triangle qui a deux côtés de même longueur est un triangle isocèle. Le triangle KLM est isocèle.",
    },
    {
      titre: "Calculer un angle manquant",
      micros: ["triangle_type_angle"],
      donnees: "Dans un triangle, deux angles mesurent 60° et 70°.",
      question: "Combien mesure le troisième angle ?",
      schema: triangleAngles,
      solution:
        "La somme des trois angles d'un triangle vaut toujours 180°. On enlève donc les deux angles connus : 180 − 60 − 70. On calcule d'abord 60 + 70 = 130, puis 180 − 130 = 50. Le troisième angle mesure 50°. On vérifie : 60 + 70 + 50 = 180°.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Un triangle a pour sommets R, S et T. Comment le nomme-t-on, et combien a-t-il de côtés et d'angles ?",
      correction:
        "On nomme un triangle avec ses trois sommets : c'est le triangle RST (on pourrait aussi écrire TSR, l'ordre n'a pas d'importance). Comme tous les triangles, il possède 3 côtés (RS, ST et TR) et 3 angles, un à chaque sommet.",
    },
    {
      question:
        "Un triangle a ses trois côtés de même longueur. Quelle est sa nature selon ses côtés ? Combien mesure alors chacun de ses angles ?",
      correction:
        "Trois côtés de même longueur : c'est un triangle équilatéral. Dans un triangle équilatéral, les trois angles sont égaux. Comme leur somme vaut 180°, chaque angle mesure 180 ÷ 3 = 60°.",
    },
    {
      question:
        "Dans un triangle, un angle mesure 90° et un autre mesure 40°. Combien mesure le troisième angle ? Quelle est la nature de ce triangle selon ses angles ?",
      correction:
        "La somme des angles vaut 180°. Le troisième angle mesure donc 180 − 90 − 40 : on calcule 90 + 40 = 130, puis 180 − 130 = 50. Le troisième angle mesure 50°. Comme le triangle possède un angle droit (90°), c'est un triangle rectangle.",
    },
    {
      question:
        "Ce triangle est-il possible ? On veut un triangle de côtés 2 cm, 3 cm et 6 cm.",
      correction:
        "Pour qu'un triangle existe, la somme de deux côtés doit être plus grande que le troisième. On additionne les deux plus petits côtés : 2 + 3 = 5. Or 5 est plus petit que 6. La somme ne dépasse pas le troisième côté : ce triangle est impossible.",
    },
  ],
  formule: {
    contexte: "Dans tout triangle, pour retrouver un angle quand on connaît les deux autres.",
    expression: "angle A + angle B + angle C = 180°",
    legende:
      "La somme des trois angles d'un triangle vaut toujours 180°. Pour un angle manquant : angle = 180 − les deux autres angles.",
    schema: schemaTriangle,
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesTriangles6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Triangles - 6e",
    section: {
      type: "objectif",
      phrase: "Nommer, reconnaître et calculer dans un triangle",
      sousPhrase:
        "Un triangle, c'est trois sommets, trois côtés et trois angles. Tout repose sur une règle qui ne change jamais.",
      encadre: {
        titre: "La règle en or",
        texte: "Dans tout triangle, la somme des trois angles est toujours égale à 180°.",
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
          "Le triangle est la seule figure indéformable : charpentes, ponts, grues et pylônes en sont pleins. Là où un carré s'affaisse, un triangle tient bon.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Vers 300 av. J.-C., Euclide rassemble les propriétés des triangles. Bien avant, les Égyptiens traçaient des angles droits avec un triangle de côtés 3, 4 et 5.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheTriangles6e.methode.map((m) => ({
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
      phrase: "Un triangle est un polygone qui possède 3 côtés",
      sousPhrase:
        "On le nomme avec ses trois sommets : un triangle de sommets A, B et C se note triangle ABC.",
      encadre: {
        titre: "Attention",
        texte:
          "Un sommet est un point (A, B, C), un côté est un segment (AB, BC, CA) : il ne faut pas les confondre.",
      },
    },
  },
  {
    titre: "Reconnaître la nature",
    badge: "Côtés & angles",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Selon les côtés",
        contenu:
          "Équilatéral : 3 côtés égaux. Isocèle : au moins 2 côtés égaux. Quelconque : 3 côtés de longueurs différentes.",
      },
      droite: {
        variante: "info",
        titre: "Selon les angles",
        contenu:
          "Rectangle : un angle droit (90°). Obtusangle : un angle supérieur à 90°. Aigu : les trois angles inférieurs à 90°.",
      },
    },
  },
  {
    titre: "Selon ce que l'on cherche",
    badge: "3 gestes",
    section: {
      type: "cartes",
      cartes: ficheTriangles6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Calculer un angle",
    section: {
      type: "exemple",
      enonce: "Dans un triangle, deux angles mesurent 60° et 70°.",
      question: "Combien mesure le troisième angle ?",
      correction:
        "La somme vaut 180°. Troisième angle = 180 − 60 − 70 = 50°. Vérification : 60 + 70 + 50 = 180°.",
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
      enonce: "On veut construire un triangle de côtés 2 cm, 3 cm et 6 cm.",
      question: "Ce triangle est-il possible ?",
      indice: "Compare la somme des deux plus petits côtés au plus grand.",
      correction:
        "2 + 3 = 5, et 5 est plus petit que 6. La somme de deux côtés ne dépasse pas le troisième : le triangle est impossible.",
    },
  },
];
