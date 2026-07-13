// ─── Fiche de cours : les quadrilatères (6e) ───────────────────────────────────
// Fiche « en blocs » créée pour coller EXACTEMENT à la banque du coach
// (lib/tutor-v4/questionBank/6e/maths/quadrilateres.bank.ts).
//
// Couverture des micro-compétences de la banque (pour la relecture du prof) :
// - quadrilatere_nommer_vocabulaire   → identite (Vocabulaire), definition,
//                                        methode (Observer), usages (carte 1),
//                                        exemples (ex. 1), entrainement (Q1)
// - quadrilatere_identifier_nature     → proprietes (les 3 figures), usages (carte 2),
//                                        exemples (ex. 2), entrainement (Q2),
//                                        slides (exemple guidé)
// - quadrilatere_lire_propriete        → definition (diagonales), proprietes,
//                                        methode (Observer), pieges (1)
// - quadrilatere_lien_propriete        → proprietes, methode (Conclure),
//                                        exemples (ex. 2), entrainement (Q2)
// - quadrilatere_distinguer            → proprietes, pieges (2), aRetenir (2),
//                                        entrainement (Q3), slide « distinguer »
// - quadrilatere_conclusion            → methode (Conclure), pieges (3),
//                                        entrainement (Q3), slide « pièges »
// - quadrilatere_completer_construire  → usages (carte 3), methode (Conclure),
//                                        entrainement (Q4), slide « exercice flash »
// - quadrilatere_defi                  → pieges (3), aRetenir (3), exemples (ex. 2),
//                                        entrainement (Q4)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Un quadrilatère ABCD dessiné par le moteur du coach : sommets nommés,
// côtés et diagonales visibles — la figure de référence de la définition.
const schemaQuadrilatere = (
  <CanvasRenderer
    figure={{
      kind: "quadrilatere",
      size: { width: 260, height: 200 },
      points: {
        A: { x: 40, y: 45 },
        B: { x: 225, y: 40 },
        C: { x: 205, y: 165 },
        D: { x: 55, y: 155 },
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
        showDiagonals: true,
      },
      labels: { A: "A", B: "B", C: "C", D: "D" },
    }}
  />
);

// Exemple 1 : le quadrilatère ABCD, ses côtés (pour repérer les côtés opposés).
const schemaABCDcotes = (
  <CanvasRenderer
    figure={{
      kind: "quadrilatere",
      size: { width: 260, height: 200 },
      points: { A: { x: 40, y: 50 }, B: { x: 225, y: 45 }, C: { x: 205, y: 165 }, D: { x: 55, y: 155 } },
      display: { showPoints: true, showLabels: true, showSides: true, showDiagonals: false },
      labels: { A: "A", B: "B", C: "C", D: "D" },
    }}
  />
);

// Exemple 2 : un losange (4 côtés codés égaux, aucun angle droit).
const schemaLosange = (
  <CanvasRenderer
    figure={{
      kind: "quadrilatere",
      size: { width: 240, height: 210 },
      points: { A: { x: 120, y: 25 }, B: { x: 220, y: 115 }, C: { x: 120, y: 205 }, D: { x: 20, y: 115 } },
      display: { showPoints: true, showLabels: true, showSides: true, showDiagonals: false },
      labels: { A: "A", B: "B", C: "C", D: "D" },
      marks: { equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]] },
    }}
  />
);

const pieges = [
  "Confondre nature et dessin : un carré reste un carré même s'il est penché sur la feuille. Ce sont les codages (angles droits, côtés égaux) qui comptent, pas l'orientation.",
  "Croire qu'un carré et un rectangle sont deux figures qui n'ont rien à voir : un carré est aussi un rectangle, car il a 4 angles droits. C'est un rectangle particulier dont tous les côtés sont égaux.",
  "Conclure trop vite : 4 côtés égaux ne suffisent pas pour dire « carré ». Sans angle droit codé, c'est un losange. Il manque une information.",
];

const aRetenir = [
  "Un quadrilatère a 4 côtés, 4 sommets, 4 angles et 2 diagonales. On le nomme avec ses sommets dans l'ordre : ABCD.",
  "Rectangle = 4 angles droits. Losange = 4 côtés égaux. Carré = les deux à la fois.",
  "Un carré est à la fois un rectangle et un losange : il possède toutes leurs propriétés.",
];

export const ficheQuadrilateres6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "quadrilatere-figure",
  titre: "Les quadrilatères",
  accroche:
    "Un quadrilatère, c'est une figure à 4 côtés. En 6e, on apprend à le nommer, à lire ses propriétés (angles droits, côtés égaux) et à reconnaître sa nature : rectangle, losange ou carré.",
  identite: [
    { label: "Prérequis", valeur: "Reconnaître un angle droit et comparer des longueurs" },
    { label: "Idée clé", valeur: "La nature d'une figure se lit dans ses codages, pas dans son orientation" },
    { label: "Vocabulaire", valeur: "Sommet, côté, angle, diagonale, côtés opposés et consécutifs" },
  ],
  definition: {
    texte:
      "Un quadrilatère est un polygone qui possède 4 côtés. Il a donc aussi 4 sommets et 4 angles. On le nomme en donnant ses sommets dans l'ordre autour de la figure : le quadrilatère ABCD. Il possède 2 diagonales, qui relient chacune deux sommets opposés (par exemple AC et BD).",
  },
  figure: {
    schema: schemaQuadrilatere,
    legende: "Le quadrilatère ABCD : 4 côtés, 4 sommets, 2 diagonales.",
  },
  proprietes: [
    {
      titre: "Côtés opposés et consécutifs",
      texte:
        "Deux côtés qui se touchent en un sommet sont consécutifs : AB et BC se touchent en B. Deux côtés qui ne se touchent pas sont opposés : dans ABCD, AB et CD sont opposés, ainsi que BC et AD.",
    },
    {
      titre: "Le rectangle",
      texte:
        "Un rectangle est un quadrilatère qui a 4 angles droits. Ses côtés opposés sont parallèles deux à deux (2 paires) et de même longueur, mais les 4 côtés ne sont pas forcément tous égaux. Ses diagonales ont la même longueur.",
    },
    {
      titre: "Le losange",
      texte:
        "Un losange est un quadrilatère qui a 4 côtés égaux. Ses côtés opposés sont parallèles, mais il n'a pas forcément d'angle droit. Ses diagonales sont perpendiculaires (elles se coupent à angle droit).",
    },
    {
      titre: "Le carré",
      texte:
        "Un carré est un quadrilatère qui a 4 angles droits ET 4 côtés égaux. Il cumule les propriétés du rectangle et du losange : ses diagonales sont à la fois de même longueur et perpendiculaires.",
    },
  ],
  reel: {
    texte:
      "Les quadrilatères sont partout : un écran de téléphone et une porte sont des rectangles, un carreau de carrelage est un carré, un cerf-volant ou un panneau routier « attention » ressemblent à un losange. Reconnaître une figure, c'est repérer ses angles et ses côtés pour la nommer correctement.",
  },
  historique: {
    texte:
      "L'étude des figures à côtés droits est très ancienne. Vers 300 avant J.-C., le mathématicien grec Euclide rassemble dans ses « Éléments » les définitions du carré, du rectangle et du losange, encore utilisées aujourd'hui. Le mot « losange » vient d'ailleurs d'une vieille forme de pastille en forme de carreau penché.",
  },
  methode: [
    {
      titre: "Observer les côtés",
      texte:
        "On repère d'abord les côtés : sont-ils tous égaux (même codage) ? Un même petit trait sur des côtés signale qu'ils ont la même longueur. 4 côtés égaux orientent vers le losange ou le carré.",
    },
    {
      titre: "Observer les angles",
      texte:
        "On regarde ensuite les angles : y a-t-il des angles droits ? Un petit carré à un sommet indique un angle droit. 4 angles droits orientent vers le rectangle ou le carré.",
    },
    {
      titre: "Conclure",
      texte:
        "On croise les deux informations. 4 angles droits seuls : rectangle. 4 côtés égaux seuls : losange. Les deux ensemble : carré. Si une information manque, on ne peut pas conclure.",
    },
  ],
  usages: [
    {
      titre: "Nommer et décrire",
      detail:
        "Donner le nom de la figure avec ses sommets (ABCD), repérer les côtés opposés, les côtés consécutifs et les 2 diagonales.",
    },
    {
      titre: "Identifier la nature",
      detail:
        "Lire les codages pour reconnaître un rectangle (4 angles droits), un losange (4 côtés égaux), un carré (les deux) ou un quadrilatère quelconque (aucun codage particulier).",
    },
    {
      titre: "Compléter ou construire",
      detail:
        "Trouver l'information manquante pour passer d'une figure à une autre : un rectangle devient un carré si l'on ajoute « 4 côtés égaux » ; un losange devient un carré si l'on ajoute « 4 angles droits ».",
    },
  ],
  exemples: [
    {
      titre: "Nommer et repérer le vocabulaire",
      donnees: "On donne un quadrilatère dont les sommets sont A, B, C et D.",
      question: "Comment se nomme cette figure ? Quel côté est opposé au côté AB ?",
      schema: schemaABCDcotes,
      solution:
        "On nomme la figure en donnant ses sommets dans l'ordre : c'est le quadrilatère ABCD. Le côté opposé à AB est celui qui ne le touche pas : c'est CD. Les côtés AB et BC, eux, se touchent au sommet B : ils sont consécutifs.",
    },
    {
      titre: "Quelle est la nature de cette figure ?",
      donnees: "Une figure a ses 4 côtés codés égaux, mais aucun angle droit n'est marqué.",
      question: "Quelle est la nature de cette figure ? Est-ce un carré ?",
      schema: schemaLosange,
      solution:
        "Les 4 côtés sont égaux : la figure est donc un losange. Ce n'est pas forcément un carré, car aucun angle droit n'est codé. Pour affirmer « carré », il faudrait à la fois 4 côtés égaux ET 4 angles droits. Ici, il manque l'information sur les angles : on conclut « losange ».",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Dans le quadrilatère ABCD, combien y a-t-il de diagonales ? Nomme-les, puis donne le côté opposé à BC.",
      correction:
        "Un quadrilatère possède 2 diagonales : elles relient les sommets opposés, ce sont AC et BD. Le côté opposé à BC est celui qui ne le touche pas : c'est AD.",
    },
    {
      question:
        "Une figure a 4 angles droits codés, mais ses côtés ne sont pas tous marqués égaux. Quelle est sa nature ?",
      correction:
        "4 angles droits suffisent pour reconnaître un rectangle. Comme les 4 côtés ne sont pas tous codés égaux, ce n'est pas un carré : la figure est un rectangle.",
    },
    {
      question:
        "Quelle propriété distingue un carré d'un losange ? Peut-on être sûr qu'un quadrilatère à 4 côtés égaux est un carré ?",
      correction:
        "Le carré et le losange ont tous deux 4 côtés égaux ; ce qui les distingue, c'est que le carré possède 4 angles droits. Donc non, 4 côtés égaux seuls ne suffisent pas : sans angle droit, on obtient un losange, pas forcément un carré.",
    },
    {
      question:
        "Défi : peut-on dire qu'un carré est aussi un rectangle ? Et que faut-il ajouter à un rectangle pour être sûr que c'est un carré ?",
      correction:
        "Oui, un carré est aussi un rectangle, car il a 4 angles droits (c'est ce qui définit un rectangle). Pour qu'un rectangle soit un carré, il faut ajouter l'information « 4 côtés égaux » : il possède alors les deux propriétés du carré.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesQuadrilateres6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Quadrilatères - 6e",
    section: {
      type: "objectif",
      phrase: "Nommer un quadrilatère et reconnaître sa nature",
      sousPhrase:
        "Un quadrilatère est une figure à 4 côtés. Tout repose sur une idée : sa nature se lit dans ses codages (angles droits, côtés égaux).",
      encadre: {
        titre: "L'idée",
        texte:
          "Rectangle = 4 angles droits. Losange = 4 côtés égaux. Carré = les deux à la fois.",
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
          "Un écran et une porte sont des rectangles, un carreau de carrelage un carré, un panneau « attention » un losange. Nommer une figure, c'est lire ses angles et ses côtés.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Vers 300 avant J.-C., le Grec Euclide rassemble dans ses « Éléments » les définitions du carré, du rectangle et du losange, encore utilisées aujourd'hui.",
      },
    },
  },
  {
    titre: "Le vocabulaire",
    badge: "À connaître",
    section: {
      type: "objectif",
      phrase: "4 côtés, 4 sommets, 4 angles, 2 diagonales",
      sousPhrase:
        "On nomme le quadrilatère avec ses sommets dans l'ordre : ABCD. Chaque diagonale relie deux sommets opposés (AC et BD).",
      encadre: {
        titre: "À distinguer",
        texte:
          "Côtés consécutifs : ils se touchent (AB et BC en B). Côtés opposés : ils ne se touchent pas (AB et CD).",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheQuadrilateres6e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Selon ce que l'on cherche",
    badge: "3 gestes",
    section: {
      type: "cartes",
      cartes: ficheQuadrilateres6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Quelle nature ?",
    section: {
      type: "exemple",
      enonce: "Une figure a ses 4 côtés codés égaux, mais aucun angle droit n'est marqué.",
      question: "Quelle est sa nature ? Est-ce un carré ?",
      correction:
        "4 côtés égaux : c'est un losange. Sans angle droit codé, on ne peut pas dire que c'est un carré.",
    },
  },
  {
    titre: "Distinguer les figures",
    badge: "Ne pas confondre",
    section: {
      type: "exemple",
      enonce: "On compare un carré et un rectangle : tous deux ont 4 angles droits.",
      question: "Qu'est-ce qui distingue le carré du rectangle ?",
      correction:
        "Seul le carré a forcément ses 4 côtés égaux. Un carré est donc un rectangle particulier.",
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
        "On dispose d'un rectangle dont les 4 angles droits sont codés.",
      question: "Quelle information faut-il ajouter pour être sûr que c'est un carré ?",
      indice: "Compare les longueurs des côtés.",
      correction:
        "Il faut ajouter « 4 côtés égaux ». Le rectangle possède alors les deux propriétés du carré.",
    },
  },
];
