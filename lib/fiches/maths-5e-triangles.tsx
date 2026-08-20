// ─── Fiche de cours : les triangles (5e) ───────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/5e/maths/triangles.bank.ts (notionId triangle_figure).
// Dessinée par le canvas « triangle » du coach (côtés, marques d'égalité, angles).
//
// Micro-compétences couvertes :
// - triangle_reconnaitre → définition + figure (ABC : sommets, côtés)
// - triangle_nature      → propriété « Les natures » + exemples (isocèle, rectangle, équilatéral)
// - triangle_construire  → propriété « L'inégalité triangulaire » + exemple (2,3,8 non ; 4,5,7 oui), méthode
// - triangle_somme_angle → formule (180°) + exemple (50° et 60° → 70°)
// - triangle_defi        → pièges + défi (deux angles droits ? angle manquant)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

type Pt = "A" | "B" | "C";
type Side = "AB" | "BC" | "CA";
type Pts = Record<Pt, { x: number; y: number }>;

const tri = (
  points: Pts,
  opts: {
    labels?: Partial<Record<Pt, string>>;
    angleLabels?: Partial<Record<Pt, string>>;
    equalSides?: [Side, Side][];
    rightAngleAt?: Pt;
    showAngles?: boolean;
    sideLabels?: Partial<Record<Side, string>>;
  } = {}
) => (
  <CanvasRenderer
    figure={{
      kind: "triangle",
      size: { width: 280, height: 220 },
      points,
      display: {
        showPoints: true,
        showLabels: !!opts.labels,
        showSides: true,
        showAngles: opts.showAngles ?? false,
      },
      labels: opts.labels,
      angleLabels: opts.angleLabels,
      sideLabels: opts.sideLabels,
      marks: {
        rightAngleAt: opts.rightAngleAt,
        equalSides: opts.equalSides,
      },
    }}
  />
);

const P_ABC: Pts = { A: { x: 40, y: 180 }, B: { x: 245, y: 180 }, C: { x: 150, y: 40 } };
const P_ISO: Pts = { A: { x: 40, y: 180 }, B: { x: 150, y: 40 }, C: { x: 260, y: 180 } };
const P_RECT: Pts = { A: { x: 45, y: 180 }, B: { x: 45, y: 55 }, C: { x: 245, y: 180 } };
// Un vrai equilateral : base de 200, hauteur 200 x racine(3)/2 ≈ 173.
const P_EQUI: Pts = { A: { x: 45, y: 190 }, B: { x: 245, y: 190 }, C: { x: 145, y: 17 } };

// L'inegalite triangulaire parle de LONGUEURS qui se comparent : c'est le
// schema en barres, pas un triangle de plus (lib/canvas/CATALOGUE.md). Les
// parts sont a la mesure de leur valeur depuis le 20/08.
const barre = (
  total: string,
  parts: { label: string; value: string }[],
  questionLabel: string
) => (
  <CanvasRenderer
    figure={{ kind: "schema_barre", total, parts, questionLabel, size: { width: 320, height: 175 } }}
  />
);

const pieges = [
  "Croire qu'un triangle avec deux angles droits existe : 90° + 90° = 180°, il ne resterait rien pour le 3ᵉ angle.",
  "Construire sans vérifier : avec 3 cm, 4 cm et 8 cm, on a 3 + 4 = 7 < 8 → triangle impossible.",
  "Confondre sommet et côté : A, B, C sont les sommets (points) ; AB, BC, CA sont les côtés (segments).",
];

const aRetenir = [
  "Dans tout triangle, la somme des trois angles vaut 180°.",
  "On le classe par ses côtés (équilatéral, isocèle) ou ses angles (rectangle).",
  "Inégalité triangulaire : un côté est plus court que la somme des deux autres.",
];

export const ficheTriangles5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "triangle-figure",
  titre: "Les triangles",
  accroche:
    "Trois côtés, trois sommets, trois angles : le triangle. En 5e, on apprend à le classer, à le construire au compas et à retrouver un angle manquant.",
  identite: [
    { label: "Mots clés", valeur: "Sommet, côté, isocèle, rectangle, équilatéral" },
    { label: "Le secret", valeur: "La somme des angles = 180°" },
    { label: "Outil", valeur: "La règle, le compas, le rapporteur" },
  ],
  definition: {
    texte:
      "Un triangle est une figure à trois côtés et trois sommets. Dans le triangle ABC, les points A, B et C sont les sommets ; les segments AB, BC et CA sont les côtés. La somme de ses trois angles est toujours égale à 180°.",
  },
  figure: {
    schema: tri(P_ABC, { labels: { A: "A", B: "B", C: "C" } }),
    legende: "Le triangle ABC : 3 sommets (A, B, C), 3 côtés (AB, BC, CA).",
  },
  // Un dessin sous CHAQUE propriete (REGLES.md § 2 bis), et quatre dessins qui
  // montrent quatre choses : le codage de deux cotes egaux, les trois cotes et
  // les 60°, le petit carre de l'angle droit, et — pour l'inegalite — des
  // LONGUEURS qui se comparent, donc une barre, pas un triangle de plus.
  proprietes: [
    {
      titre: "Isocèle",
      texte: "Deux côtés de même longueur (codés par la même marque).",
      schema: tri(P_ISO, { labels: { A: "A", B: "B", C: "C" }, equalSides: [["AB", "BC"]] }),
    },
    {
      titre: "Équilatéral",
      texte: "Trois côtés de même longueur (et trois angles de 60°).",
      schema: tri(P_EQUI, {
        showAngles: true,
        angleLabels: { A: "60°", B: "60°", C: "60°" },
      }),
    },
    {
      titre: "Rectangle",
      texte: "Un angle droit (90°), repéré par un petit carré au sommet.",
      schema: tri(P_RECT, { labels: { A: "A", B: "B", C: "C" }, rightAngleAt: "A" }),
    },
    {
      titre: "L'inégalité triangulaire",
      texte: "Le plus grand côté doit être plus petit que la somme des deux autres.",
      schema: barre(
        "le plus grand côté : 8 cm",
        [
          { label: "2 + 3", value: "5" },
          { label: "il manque 3", value: "3" },
        ],
        "2 + 3 = 5, plus court que 8 : le triangle ne se ferme pas."
      ),
    },
  ],
  reel: {
    texte:
      "Le triangle est la forme la plus solide : on le retrouve dans les charpentes, les ponts, les pylônes électriques et les grues. Sa rigidité vient de ce qu'on ne peut pas le déformer sans changer un côté.",
  },
  historique: {
    texte:
      "Que la somme des angles fasse 180° est démontré depuis Euclide, il y a plus de 2300 ans, dans ses « Éléments ». C'est l'un des tout premiers théorèmes de géométrie enseignés dans l'histoire.",
  },
  formule: {
    contexte: "La somme des angles d'un triangle",
    expression: "Â + B̂ + Ĉ = 180°",
    legende: "Exemple : si deux angles valent 50° et 60°, le troisième vaut 180 − 50 − 60 = 70°.",
    schema: tri(P_ABC, { showAngles: true, angleLabels: { A: "50°", B: "60°", C: "?" } }),
  },
  methode: [
    {
      titre: "Je vérifie l'inégalité",
      texte: "Le plus grand côté doit être < somme des deux autres.",
      schema: barre(
        "le plus grand côté : 7 cm",
        [
          { label: "4", value: "4" },
          { label: "5", value: "5" },
        ],
        "4 + 5 = 9, plus long que 7 : le triangle se ferme."
      ),
    },
    {
      titre: "Je construis au compas",
      texte: "Je trace un côté, puis je reporte les deux autres longueurs au compas.",
      schema: tri(P_ABC, { sideLabels: { AB: "7 cm", BC: "5 cm", CA: "4 cm" } }),
    },
    {
      titre: "Je calcule un angle",
      texte: "180° − (les deux angles connus) = l'angle manquant.",
      schema: tri(P_ABC, { showAngles: true, angleLabels: { A: "35°", B: "85°", C: "?" } }),
    },
  ],
  usages: [
    {
      titre: "Classer",
      detail: "Selon les côtés (isocèle, équilatéral) ou un angle droit (rectangle).",
      // Classer, c'est COMPARER : les trois familles côte à côte, pas un
      // triangle isolé.
      schema: (
        <div className="grid grid-cols-2 items-end gap-2">
          {[
            { pts: P_ISO, nom: "isocèle", opts: { equalSides: [["AB", "BC"]] as [Side, Side][] } },
            { pts: P_EQUI, nom: "équilatéral", opts: { showAngles: true, angleLabels: { A: "60°", B: "60°", C: "60°" } } },
            { pts: P_RECT, nom: "rectangle", opts: { rightAngleAt: "A" as Pt } },
          ].map((t) => (
            <div key={t.nom}>
              {tri(t.pts, t.opts)}
              <p className="mt-1 text-center text-xs font-black text-slate-700">{t.nom}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      titre: "Construire",
      detail: "Avec 3 longueurs : règle + compas, après avoir vérifié l'inégalité.",
      schema: tri(P_ISO, { sideLabels: { AB: "6 cm", BC: "6 cm", CA: "4 cm" } }),
    },
    {
      titre: "Calculer",
      detail: "Un angle manquant grâce à la somme = 180°.",
      schema: tri(P_ABC, { showAngles: true, angleLabels: { A: "40°", B: "70°", C: "?" } }),
    },
  ],
  exemples: [
    {
      titre: "Triangle isocèle",
      donnees: "Le triangle KLM a deux côtés marqués égaux.",
      question: "Quelle est sa nature ?",
      schema: tri(P_ISO, { labels: { A: "K", B: "L", C: "M" }, equalSides: [["AB", "BC"]] }),
      solution:
        "Deux côtés sont codés égaux (KL et LM). Le triangle est isocèle en L.",
    },
    {
      titre: "Triangle rectangle",
      donnees: "Un triangle avec un petit carré à un sommet.",
      question: "Quelle est sa nature ?",
      schema: tri(P_RECT, { labels: { A: "A", B: "B", C: "C" }, rightAngleAt: "A" }),
      solution:
        "Le petit carré indique un angle droit (90°) en A. Le triangle est rectangle en A.",
    },
    {
      titre: "Peut-on le construire ?",
      donnees: "Trois longueurs : 2 cm, 3 cm et 8 cm.",
      question: "Ce triangle est-il constructible ?",
      schema: barre(
        "le plus grand côté : 8 cm",
        [
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "il manque", value: "3" },
        ],
        "2 + 3 = 5 : les deux petits côtés n'atteignent pas 8."
      ),
      solution:
        "On compare le plus grand côté (8) à la somme des deux autres : 2 + 3 = 5. Comme 5 < 8, non : ce triangle est impossible. (Avec 4, 5 et 7 : 4 + 5 = 9 > 7 → oui.)",
    },
    {
      titre: "Trouver un angle",
      donnees: "Deux angles d'un triangle valent 50° et 60°.",
      question: "Combien mesure le troisième ?",
      schema: tri(P_ABC, { showAngles: true, angleLabels: { A: "50°", B: "60°", C: "?" } }),
      solution:
        "La somme fait 180° : le troisième vaut 180 − 50 − 60 = 70°.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un triangle a trois côtés de même longueur. Quelle est sa nature ?",
      correction: "Trois côtés égaux : c'est un triangle équilatéral (ses angles font tous 60°).",
    },
    {
      question: "Peut-on construire un triangle de côtés 4 cm, 5 cm et 7 cm ?",
      correction: "Le plus grand côté est 7. Or 4 + 5 = 9 > 7 : oui, il est constructible.",
    },
    {
      question: "Deux angles d'un triangle valent 45° et 45°. Combien mesure le troisième ?",
      correction: "45 + 45 = 90, donc le troisième vaut 180 − 90 = 90° (c'est un triangle rectangle).",
    },
    {
      question: "Un triangle peut-il avoir deux angles droits ?",
      correction: "Non : 90° + 90° = 180°, il ne resterait rien pour le troisième angle.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

export const slidesTriangles5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Triangles - 5e",
    section: {
      type: "objectif",
      phrase: "Classer, construire et calculer un angle",
      sousPhrase:
        "Trois côtés, trois sommets, trois angles dont la somme vaut toujours 180°.",
      encadre: {
        titre: "L'idée",
        texte: "On classe par les côtés ou les angles, et on vérifie l'inégalité triangulaire.",
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
          "La forme la plus solide : charpentes, ponts, pylônes, grues. On ne peut pas déformer un triangle.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "La somme des angles = 180° est démontrée depuis Euclide, il y a plus de 2300 ans.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheTriangles5e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "La formule des angles",
    badge: "À connaître",
    section: {
      type: "objectif",
      phrase: "Â + B̂ + Ĉ = 180°",
      sousPhrase: "Deux angles connus (50° et 60°) → le 3ᵉ vaut 180 − 50 − 60 = 70°.",
      encadre: {
        titre: "Le réflexe",
        texte: "L'angle manquant = 180° − (somme des deux autres).",
      },
    },
  },
  {
    titre: "L'inégalité triangulaire",
    badge: "Avant de construire",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Impossible",
        contenu: "2, 3 et 8 : 2 + 3 = 5 < 8 → on ne peut pas fermer le triangle.",
      },
      droite: {
        variante: "ok",
        titre: "Possible",
        contenu: "4, 5 et 7 : 4 + 5 = 9 > 7 → constructible au compas.",
      },
    },
  },
  {
    titre: "Les natures",
    badge: "Classer",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Isocèle", texte: "Deux côtés égaux (même marque)." },
        { titre: "Équilatéral", texte: "Trois côtés égaux (angles de 60°)." },
        { titre: "Rectangle", texte: "Un angle droit (petit carré)." },
      ],
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
      enonce: "Deux angles d'un triangle valent 45° et 45°.",
      question: "Combien mesure le troisième angle ? Quelle est la nature du triangle ?",
      indice: "Utilise la somme = 180°.",
      correction: "180 − 45 − 45 = 90°. Le troisième angle est droit : le triangle est rectangle.",
    },
  },
];
