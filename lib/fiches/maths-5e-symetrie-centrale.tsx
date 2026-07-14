// ─── Fiche de cours : la symétrie centrale (5e) ────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/5e/maths/symetrie_centrale.bank.ts (notionId sym_centrale).
// Dessinée par le canvas « transformation » du coach (figure + image + centre O).
//
// Micro-compétences couvertes :
// - sym_centrale_reconnaitre → définition + figure (F → F' de centre O), propriété « Le centre »
// - sym_centrale_point       → exemple 1 (image d'un point : O milieu de [AA']), méthode
// - sym_centrale_figure      → exemple 2 (image d'une figure)
// - sym_centrale_propriete   → propriétés (conserve longueurs/angles/aires) + exemple 3
// - sym_centrale_defi        → pièges (≠ symétrie axiale) + défi

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

type P = { x: number; y: number };

const transfo = (
  source: { label: string; points: P[] },
  image: { label: string; points: P[] },
  center: { point: P; label: string },
  grid: { rows: number; cols: number } = { rows: 8, cols: 8 }
) => (
  <CanvasRenderer
    figure={{
      kind: "transformation",
      transformation: "symetrie_centrale",
      grid,
      source,
      image,
      center,
    }}
  />
);

const figTriangle = transfo(
  { label: "F", points: [{ x: 2, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 4 }] },
  { label: "F'", points: [{ x: 6, y: 6 }, { x: 5, y: 6 }, { x: 6, y: 4 }] },
  { point: { x: 4, y: 4 }, label: "O" }
);

const figPoint = transfo(
  { label: "A", points: [{ x: 2, y: 3 }] },
  { label: "A'", points: [{ x: 6, y: 5 }] },
  { point: { x: 4, y: 4 }, label: "O" }
);

const pieges = [
  "Confondre avec la symétrie axiale : ici il n'y a pas d'axe (miroir), mais un CENTRE (demi-tour).",
  "Placer l'image du même côté que le point : l'image est de l'AUTRE côté du centre.",
  "Oublier que O est le MILIEU de [AA'] : les distances OA et OA' sont égales.",
];

const aRetenir = [
  "Symétrie centrale = demi-tour (180°) autour d'un point, le centre O.",
  "O est le milieu de [AA'] : A, O, A' sont alignés et OA = OA'.",
  "Elle conserve les longueurs, les angles et les aires (l'image est identique, retournée).",
];

export const ficheSymetrieCentrale5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "sym-centrale",
  titre: "La symétrie centrale",
  accroche:
    "Un demi-tour autour d'un point : la symétrie centrale retourne une figure comme si on la faisait pivoter de 180° autour d'un centre.",
  identite: [
    { label: "Mots clés", valeur: "Centre, demi-tour, image, milieu, 180°" },
    { label: "Le secret", valeur: "Le centre O est le milieu de [AA']" },
    { label: "Outil", valeur: "La règle et le compas (report des distances)" },
  ],
  definition: {
    texte:
      "La symétrie centrale de centre O est un demi-tour (une rotation de 180°) autour du point O. L'image A' d'un point A est telle que O est le milieu du segment [AA'] : les points A, O et A' sont alignés, et OA = OA'.",
  },
  figure: {
    schema: figTriangle,
    legende: "La figure F et son image F' par la symétrie centrale de centre O (demi-tour autour de O).",
  },
  proprietes: [
    {
      titre: "Le centre",
      texte: "O est le milieu de [AA'] : A, O et A' sont alignés et OA = OA'.",
    },
    {
      titre: "Conserve tout",
      texte: "Les longueurs, les angles et les aires sont conservés (figure identique, retournée).",
    },
    {
      titre: "Droites parallèles",
      texte: "L'image d'une droite est une droite parallèle à la première.",
    },
    {
      titre: "≠ symétrie axiale",
      texte: "Pas de miroir ni d'axe : un centre et un demi-tour (la figure est retournée, pas réfléchie).",
    },
  ],
  reel: {
    texte:
      "La symétrie centrale se voit partout : les cartes à jouer (le roi est identique tête-bêche), les rosaces et les logos, les motifs de carrelage, la lettre S ou le chiffre 8, les pales d'une éolienne.",
  },
  historique: {
    texte:
      "La symétrie centrale est un cas particulier de rotation (180°). L'étude des transformations qui « conservent » les figures a donné naissance, au XIXᵉ siècle, à une branche entière des maths : la théorie des groupes.",
  },
  methode: [
    { titre: "Je relie au centre", texte: "Je trace la demi-droite qui part du point A et passe par le centre O." },
    { titre: "Je reporte la distance", texte: "De l'autre côté de O, je place A' tel que OA' = OA (au compas)." },
    { titre: "Je recommence", texte: "Pour chaque sommet de la figure, puis je relie les images." },
  ],
  usages: [
    { titre: "Image d'un point", detail: "A' est le symétrique de A : O est le milieu de [AA']." },
    { titre: "Image d'une figure", detail: "On construit l'image de chaque sommet, puis on relie." },
    { titre: "Reconnaître", detail: "On vérifie que O est le milieu entre chaque point et son image." },
  ],
  exemples: [
    {
      titre: "Image d'un point",
      donnees: "Un point A et un centre O.",
      question: "Où se trouve l'image A' de A ?",
      schema: figPoint,
      solution:
        "On aligne A, O, A' et on reporte la distance : OA' = OA, de l'autre côté de O. O est le milieu de [AA'].",
    },
    {
      titre: "Image d'une figure",
      donnees: "Le triangle F et le centre O.",
      question: "Comment obtient-on F' ?",
      schema: figTriangle,
      solution:
        "On construit l'image de chaque sommet (demi-tour autour de O), puis on relie : on obtient F', identique à F mais retourné.",
    },
    {
      titre: "Une propriété",
      donnees: "Un segment de 5 cm et son image.",
      question: "Combien mesure l'image ?",
      solution:
        "La symétrie centrale conserve les longueurs : l'image mesure aussi 5 cm.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Une symétrie centrale, c'est un demi-tour autour de quoi ?",
      correction: "Autour d'un point appelé le centre (une rotation de 180°).",
    },
    {
      question: "A' est l'image de A par la symétrie de centre O. Que peut-on dire de O ?",
      correction: "O est le milieu de [AA'] : A, O, A' sont alignés et OA = OA'.",
    },
    {
      question: "L'image d'un angle de 40° par une symétrie centrale mesure combien ?",
      correction: "40° : la symétrie centrale conserve les angles.",
    },
    {
      question: "Quelle est la différence avec la symétrie axiale ?",
      correction: "L'axiale utilise un axe (miroir) ; la centrale utilise un centre (demi-tour). La figure est retournée, pas réfléchie.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

export const slidesSymetrieCentrale5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Symétrie centrale - 5e",
    section: {
      type: "objectif",
      phrase: "Faire un demi-tour autour d'un point",
      sousPhrase:
        "La symétrie centrale de centre O est une rotation de 180° : O est le milieu de [AA'].",
      encadre: {
        titre: "L'idée",
        texte: "Pas de miroir : un centre et un demi-tour (la figure est retournée).",
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
          "Cartes à jouer (tête-bêche), rosaces, logos, carrelages, la lettre S, le 8, les pales d'une éolienne.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "C'est une rotation de 180°. L'étude de ces transformations a donné, au XIXᵉ siècle, la théorie des groupes.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheSymetrieCentrale5e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Ce qu'elle conserve",
    badge: "Propriétés",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Les longueurs", texte: "L'image d'un segment de 5 cm mesure 5 cm." },
        { titre: "Les angles", texte: "L'image d'un angle de 40° mesure 40°." },
        { titre: "Les aires", texte: "La figure image a la même aire." },
      ],
    },
  },
  {
    titre: "Le centre O",
    badge: "Point clé",
    section: {
      type: "objectif",
      phrase: "O est le milieu de [AA']",
      sousPhrase: "A, O et A' sont alignés, et OA = OA' (de part et d'autre du centre).",
      encadre: {
        titre: "Le réflexe",
        texte: "On relie le point au centre, on prolonge, on reporte la même distance.",
      },
    },
  },
  {
    titre: "Centrale vs axiale",
    badge: "Ne pas confondre",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Axiale",
        contenu: "Un axe (miroir) : la figure est réfléchie.",
      },
      droite: {
        variante: "ok",
        titre: "Centrale",
        contenu: "Un centre (demi-tour) : la figure est retournée de 180°.",
      },
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
      enonce: "A' est l'image de A par la symétrie centrale de centre O.",
      question: "Que peut-on dire du point O ?",
      indice: "Pense au milieu du segment [AA'].",
      correction: "O est le milieu de [AA'] : A, O, A' sont alignés et OA = OA'.",
    },
  },
];
