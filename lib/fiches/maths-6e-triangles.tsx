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
  notion: "triangles",
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
  proprietes: [
    {
      titre: "Sommets, côtés et angles",
      texte:
        "Un triangle a exactement 3 sommets (des points), 3 côtés (des segments) et 3 angles. Le côté opposé à un sommet est celui qui ne le contient pas : dans le triangle ABC, le côté opposé au sommet A est BC.",
    },
    {
      titre: "Les familles selon les côtés",
      texte:
        "On reconnaît un triangle à ses côtés : équilatéral si ses trois côtés sont de même longueur, isocèle s'il a au moins deux côtés de même longueur, et quelconque si ses trois côtés ont des longueurs toutes différentes. Un triangle équilatéral est un cas particulier de triangle isocèle.",
    },
    {
      titre: "Les familles selon les angles",
      texte:
        "On reconnaît aussi un triangle à son plus grand angle : rectangle s'il a un angle droit (90°), obtusangle s'il a un angle supérieur à 90°, et aigu si ses trois angles sont inférieurs à 90°.",
    },
    {
      titre: "La somme des angles et l'inégalité triangulaire",
      texte:
        "Dans tout triangle, la somme des trois angles est toujours égale à 180°. Et pour qu'un triangle existe, la longueur de chaque côté doit être plus petite que la somme des deux autres : c'est l'inégalité triangulaire.",
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
      texte:
        "On nomme un triangle avec ses trois sommets, peu importe l'ordre : triangle ABC ou triangle CBA désignent la même figure. On repère bien les sommets (les points), les côtés (les segments) et les angles avant de répondre.",
    },
    {
      titre: "Reconnaître la nature",
      texte:
        "On observe d'abord les côtés (les codages en traits égaux) pour savoir s'il est équilatéral, isocèle ou quelconque, puis les angles (le petit carré signale l'angle droit) pour savoir s'il est rectangle, aigu ou obtusangle.",
    },
    {
      titre: "Calculer un angle",
      texte:
        "Pour trouver un angle manquant, on part de 180° et on enlève les deux angles connus : troisième angle = 180 − angle 1 − angle 2. On vérifie toujours que les trois angles additionnés font bien 180°.",
    },
  ],
  usages: [
    {
      titre: "Nommer et décrire",
      detail:
        "Passer des sommets au nom du triangle et repérer ses éléments : le triangle de sommets D, E et F se note triangle DEF ; le côté opposé au sommet F est DE.",
    },
    {
      titre: "Reconnaître la nature",
      detail:
        "Classer le triangle selon ses côtés (équilatéral, isocèle, quelconque) et selon ses angles (rectangle, aigu, obtusangle). Un même triangle peut cumuler deux natures : rectangle isocèle.",
    },
    {
      titre: "Calculer et vérifier",
      detail:
        "Retrouver un angle manquant avec 180° (troisième = 180 − les deux autres) ou vérifier si un triangle est constructible en comparant la somme de deux côtés au troisième.",
    },
  ],
  exemples: [
    {
      titre: "Nommer un triangle et reconnaître sa nature",
      donnees:
        "Un triangle a pour sommets K, L et M. Ses côtés KL et LM sont marqués du même codage : ils ont la même longueur.",
      question: "Comment se nomme ce triangle, et quelle est sa nature selon ses côtés ?",
      solution:
        "On nomme le triangle avec ses trois sommets : c'est le triangle KLM. Deux de ses côtés (KL et LM) ont la même longueur : il possède donc deux côtés égaux. Un triangle qui a deux côtés de même longueur est un triangle isocèle. Le triangle KLM est isocèle.",
    },
    {
      titre: "Calculer un angle manquant",
      donnees: "Dans un triangle, deux angles mesurent 60° et 70°.",
      question: "Combien mesure le troisième angle ?",
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
