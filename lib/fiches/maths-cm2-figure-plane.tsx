// ─── Fiche de cours : les figures planes (CM2) ──────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/figures-planes.bank.ts (notionId figure_plane).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On MONTRE avec les canvas
// triangle / quadrilatere / cercle du coach — comme dans les exercices.
//
// Micro-compétences couvertes (les 5 de la banque) :
// - figure_reconnaitre   → definition, figure (le carré), exemple « triangle ? »
// - figure_triangle      → propriété « le triangle » (3 côtés)
// - figure_quadrilatere  → propriété « les quadrilatères » (carré / rectangle / losange)
// - figure_cercle        → propriété « le cercle » (centre, rayon, diamètre), exemple cercle
// - figure_defi          → défi dessiné 974 (carré ou rectangle ? le piège des côtés)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const displayFig = { showPoints: true, showLabels: true, showSides: true, showAngles: false };

function triangleF(marks?: { rightAngleAt?: "A" | "B" | "C" }) {
  return (
    <CanvasRenderer
      figure={{
        kind: "triangle",
        points: { A: { x: 55, y: 185 }, B: { x: 225, y: 185 }, C: { x: 135, y: 55 } },
        display: displayFig,
        marks: marks?.rightAngleAt ? { rightAngleAt: marks.rightAngleAt } : {},
      }}
    />
  );
}

function carreF() {
  return (
    <CanvasRenderer
      figure={{
        kind: "quadrilatere",
        points: { A: { x: 80, y: 60 }, B: { x: 200, y: 60 }, C: { x: 200, y: 180 }, D: { x: 80, y: 180 } },
        display: displayFig,
        marks: {
          rightAnglesAt: ["A", "B", "C", "D"],
          equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
          parallelSides: [["AB", "CD"], ["BC", "DA"]],
        },
      }}
    />
  );
}

function rectangleF() {
  return (
    <CanvasRenderer
      figure={{
        kind: "quadrilatere",
        points: { A: { x: 60, y: 75 }, B: { x: 240, y: 75 }, C: { x: 240, y: 170 }, D: { x: 60, y: 170 } },
        display: displayFig,
        marks: {
          rightAnglesAt: ["A", "B", "C", "D"],
          equalSides: [["AB", "CD"], ["BC", "DA"]],
          parallelSides: [["AB", "CD"], ["BC", "DA"]],
        },
      }}
    />
  );
}

function losangeF() {
  return (
    <CanvasRenderer
      figure={{
        kind: "quadrilatere",
        points: { A: { x: 150, y: 45 }, B: { x: 240, y: 120 }, C: { x: 150, y: 195 }, D: { x: 60, y: 120 } },
        display: displayFig,
        marks: {
          equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
          parallelSides: [["AB", "CD"], ["BC", "DA"]],
        },
      }}
    />
  );
}

function cercleF(opts?: { radius?: boolean; diameter?: boolean }) {
  const points = [
    { id: "O", x: 170, y: 130, label: "O", color: "#ef4444", highlight: true },
    { id: "A", x: 255, y: 130, label: "A", color: "#0f172a" },
    { id: "B", x: 85, y: 130, label: "B", color: "#0f172a" },
  ];
  const segments = [];
  if (opts?.radius) segments.push({ id: "OA", kind: "rayon", from: "O", to: "A", label: "rayon", highlight: true });
  if (opts?.diameter) segments.push({ id: "BA", kind: "diametre", from: "B", to: "A", label: "diamètre", highlight: true });
  return (
    <CanvasRenderer
      figure={{
        kind: "cercle",
        circle: { cx: 170, cy: 130, r: 85, label: "Cercle de centre O", showDisk: false, showCircle: true },
        points,
        segments,
        display: { showLabels: true, showPoints: true, showDisk: false },
      }}
    />
  );
}

const pieges = [
  "Confondre carré et rectangle : le carré a ses 4 côtés égaux, le rectangle a seulement ses côtés opposés égaux. Un carré est un rectangle très spécial.",
  "Confondre losange et carré : le losange a 4 côtés égaux mais pas d'angle droit ; le carré a les deux.",
  "Confondre rayon et diamètre : le diamètre passe par le centre et vaut deux fois le rayon.",
];

const aRetenir = [
  "Un triangle a 3 côtés ; un quadrilatère en a 4 (carré, rectangle, losange…).",
  "Carré = 4 côtés égaux ET 4 angles droits. Rectangle = 4 angles droits. Losange = 4 côtés égaux.",
  "Un cercle a un centre ; le rayon va du centre au bord, le diamètre traverse en passant par le centre (= 2 × rayon).",
];

export const ficheFigurePlaneCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "figure_plane",
  titre: "Les figures planes",
  accroche:
    "Les figures planes sont les formes de la géométrie : le triangle (3 côtés), les quadrilatères (4 côtés : carré, rectangle, losange), et le cercle. On les reconnaît en comptant les côtés et en regardant les angles.",
  identite: [
    { label: "Mots clés", valeur: "Côté, sommet, angle droit, triangle, quadrilatère, cercle, rayon, diamètre" },
    { label: "Le secret", valeur: "Compter les côtés, puis regarder les angles et les longueurs" },
    { label: "Outil", valeur: "La règle, l'équerre (angle droit) et le compas (cercle)" },
  ],
  definition: {
    texte:
      "Une figure plane est une forme dessinée à plat. On la décrit par ses côtés (leur nombre, leurs longueurs) et ses angles. Le triangle a 3 côtés. Le quadrilatère a 4 côtés : le carré, le rectangle et le losange en sont. Le cercle n'a pas de côté : c'est une ligne courbe fermée, avec un centre.",
  },
  figure: {
    schema: carreF(),
    legende: "Le carré : 4 côtés égaux (petits traits) et 4 angles droits (petits carrés aux coins).",
  },
  proprietes: [
    {
      titre: "Le triangle",
      texte: "3 côtés et 3 sommets. Il peut avoir un angle droit (triangle rectangle) ou des côtés égaux.",
    },
    {
      titre: "Le carré et le rectangle",
      texte: "4 angles droits tous les deux. Le carré a en plus ses 4 côtés égaux ; le rectangle, seulement les opposés.",
    },
    {
      titre: "Le losange",
      texte: "4 côtés égaux, mais pas d'angle droit. Ses côtés opposés sont parallèles.",
    },
    {
      titre: "Le cercle",
      texte: "Une ligne courbe fermée. Le rayon va du centre au bord ; le diamètre traverse (= 2 × rayon).",
    },
  ],
  reel: {
    texte:
      "À La Réunion, les figures planes sont partout : les panneaux triangulaires au bord de la route, les fenêtres rectangulaires des cases créoles, un cerf-volant en forme de losange sur la plage de l'Ermitage, et les ronds-points (des cercles !) partout dans l'île.",
  },
  historique: {
    texte:
      "Le compas, l'outil pour tracer un cercle parfait, existe depuis très longtemps. Les bâtisseurs de l'Antiquité l'utilisaient déjà, tout comme les Égyptiens qui traçaient des figures pour construire leurs monuments. Reconnaître les formes, c'est le tout début de la géométrie.",
  },
  methode: [
    { titre: "Je compte les côtés", texte: "3 côtés → triangle. 4 côtés → quadrilatère. Aucun (courbe) → cercle." },
    { titre: "Je regarde les angles", texte: "Y a-t-il des angles droits ? Je vérifie à l'équerre." },
    { titre: "Je compare les côtés", texte: "Les côtés sont-ils tous égaux, ou seulement les opposés ?" },
  ],
  usages: [
    { titre: "Reconnaître", detail: "Nommer une figure à partir de ses côtés et angles." },
    { titre: "Décrire", detail: "Dire combien de côtés, quels angles, quels côtés égaux." },
    { titre: "Tracer", detail: "Construire la figure avec règle, équerre et compas." },
  ],
  exemples: [
    {
      titre: "Reconnaître un triangle",
      donnees: "On observe cette figure.",
      question: "Combien a-t-elle de côtés ? Comment s'appelle-t-elle ?",
      schema: triangleF(),
      solution: "Elle a 3 côtés et 3 sommets : c'est un triangle.",
    },
    {
      titre: "Carré ou rectangle ?",
      donnees: "Cette figure a 4 angles droits, mais ses côtés ne sont pas tous égaux.",
      question: "Est-ce un carré ou un rectangle ?",
      schema: rectangleF(),
      solution:
        "4 angles droits mais côtés opposés seulement égaux (pas les 4) : c'est un rectangle. Un carré aurait ses 4 côtés égaux.",
    },
    {
      titre: "Le cercle",
      donnees: "On trace un cercle de centre O.",
      question: "Où sont le rayon et le diamètre ?",
      schema: cercleF({ radius: true, diameter: true }),
      solution:
        "Le rayon [OA] va du centre au bord. Le diamètre [BA] traverse le cercle en passant par le centre : il vaut 2 fois le rayon.",
    },
    {
      titre: "Le défi 974",
      donnees: "Un cerf-volant sur la plage de l'Ermitage a 4 côtés tous égaux, mais aucun angle droit.",
      question: "Quelle figure est-ce ?",
      schema: losangeF(),
      solution: "4 côtés égaux sans angle droit : c'est un losange (pas un carré, qui aurait des angles droits).",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Combien de côtés a un quadrilatère ?",
      correction: "4 côtés. Le carré, le rectangle et le losange sont des quadrilatères.",
    },
    {
      question: "Quelle est la différence entre un carré et un rectangle ?",
      correction: "Les deux ont 4 angles droits, mais le carré a ses 4 côtés égaux ; le rectangle, seulement les opposés.",
    },
    {
      question: "Dans un cercle, qu'est-ce que le diamètre ?",
      correction: "Le segment qui traverse le cercle en passant par le centre. Il vaut 2 fois le rayon.",
    },
    {
      question: "Une figure a 4 côtés égaux mais aucun angle droit. Qu'est-ce que c'est ?",
      correction: "Un losange (le carré, lui, aurait aussi des angles droits).",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesFigurePlaneCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Figures planes - CM2",
    section: {
      type: "objectif",
      phrase: "Reconnaître et décrire triangle, carré, rectangle, losange et cercle",
      sousPhrase:
        "On compte les côtés, on regarde les angles et on compare les longueurs.",
      encadre: {
        titre: "L'idée",
        texte: "3 côtés → triangle. 4 côtés → quadrilatère. Une courbe fermée → cercle.",
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
          "Les panneaux triangulaires, les fenêtres rectangulaires des cases créoles, un cerf-volant losange à l'Ermitage, les ronds-points (des cercles).",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le compas, pour tracer un cercle parfait, existe depuis l'Antiquité. Reconnaître les formes, c'est le début de la géométrie.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheFigurePlaneCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Carré ou rectangle",
    section: {
      type: "exemple",
      enonce: "Une figure a 4 angles droits, mais ses côtés ne sont pas tous égaux.",
      question: "Carré ou rectangle ?",
      correction: "C'est un rectangle. Le carré aurait ses 4 côtés égaux.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Le cercle",
    section: {
      type: "exemple",
      enonce: "On trace un cercle de centre O, avec un rayon et un diamètre.",
      question: "Quelle est la différence ?",
      correction: "Le rayon va du centre au bord ; le diamètre traverse en passant par le centre (= 2 × rayon).",
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
      enonce: "Un cerf-volant a 4 côtés tous égaux, mais aucun angle droit.",
      question: "Quelle figure est-ce ?",
      indice: "4 côtés égaux, mais pas d'angle droit…",
      correction: "C'est un losange (pas un carré, qui aurait des angles droits).",
    },
  },
];
