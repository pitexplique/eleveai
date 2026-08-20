// ─── Fiche de cours : les aires (5e) ───────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/5e/maths/aires.bank.ts (notionId aire_surface).
// Dessinée par les canvas du coach : triangle (aire), quadrilatere (parallélogramme),
// figure_libre (aire composée sur quadrillage).
//
// Micro-compétences couvertes :
// - aire_comprendre     → définition + figure (unités carrées), propriété « L'unité »
// - aire_triangle       → formule + exemple 1 (base × hauteur ÷ 2 = 20), méthode
// - aire_parallelogramme→ propriété + exemple 2 (base × hauteur = 24)
// - aire_composer       → exemple 3 (figure en L : on décompose), usages
// - aire_defi           → pièges (oublier ÷ 2) + défi (retrouver la hauteur)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

type P = { x: number; y: number };

// ⚠️ LA HAUTEUR SE DESSINE (20/08). Le helper acceptait deja un `hauteurLabel`
// — et ne s'en servait pas : la fiche montrait des triangles SANS hauteur sous
// une propriete qui dit « la hauteur est perpendiculaire a la base ». C'est
// pourtant l'erreur n°1 de l'eleve : prendre le cote oblique. Le canvas sait
// desormais tracer la hauteur (`height`), pointilles + marque d'angle droit.
const triAire = (
  baseLabel: string,
  hauteurLabel?: string,
  opts: { points?: { A: P; B: P; C: P }; sommet?: "A" | "B" | "C" } = {}
) => (
  <CanvasRenderer
    figure={{
      kind: "triangle",
      size: { width: 280, height: 240 },
      points: opts.points ?? { A: { x: 40, y: 190 }, B: { x: 230, y: 190 }, C: { x: 135, y: 55 } },
      labels: { A: "A", B: "B", C: "C" },
      sideLabels: baseLabel ? { AB: baseLabel } : undefined,
      display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
      ...(hauteurLabel
        ? { height: { fromVertex: opts.sommet ?? "C", label: hauteurLabel } }
        : {}),
    }}
  />
);

const parallelo = (baseLabel: string, hauteurLabel: string) => (
  <CanvasRenderer
    figure={{
      kind: "quadrilatere",
      size: { width: 300, height: 240 },
      points: { A: { x: 45, y: 185 }, B: { x: 220, y: 185 }, C: { x: 255, y: 65 }, D: { x: 80, y: 65 } },
      labels: { A: "A", B: "B", C: "C", D: "D" },
      sideLabels: { AB: baseLabel },
      height: { fromVertex: "D", onSide: "AB", label: hauteurLabel },
      display: { showPoints: true, showLabels: true, showSides: true, showAngles: false, showDiagonals: false },
      marks: { parallelSides: [["AB", "CD"], ["AD", "BC"]] },
    }}
  />
);

const figLibre = (rows: number, cols: number, filledCells: [number, number][]) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      grid: { rows, cols, filledCells },
      display: { showGrid: true, showFilled: true, showCellLabels: true, showPerimeter: true },
    }}
  />
);

// Figure en L : un rectangle 3×4 amputé d'un coin 1×2.
const figureL: [number, number][] = [];
for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) if (!(r < 1 && c >= 2)) figureL.push([r, c]);

const pieges = [
  "Oublier de diviser par 2 pour un triangle : base × hauteur, c'est l'aire du parallélogramme, pas du triangle.",
  "Prendre un côté oblique comme hauteur : la hauteur est perpendiculaire à la base.",
  "Confondre aire (en cm²) et périmètre (en cm) : l'aire mesure la surface, le périmètre le tour.",
];

const aRetenir = [
  "Aire du triangle = base × hauteur ÷ 2.",
  "Aire du parallélogramme = base × hauteur (pas de ÷ 2).",
  "La hauteur est toujours perpendiculaire à la base choisie.",
];

export const ficheAires5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "aire-surface",
  titre: "Les aires",
  accroche:
    "Mesurer une surface, c'est compter combien de carrés-unité elle contient. En 5e, on apprend les formules du triangle et du parallélogramme.",
  identite: [
    { label: "Mots clés", valeur: "Aire, surface, base, hauteur, cm²" },
    { label: "Le secret", valeur: "La hauteur ⊥ à la base" },
    { label: "Outil", valeur: "Les formules base × hauteur (÷ 2 pour le triangle)" },
  ],
  definition: {
    texte:
      "L'aire d'une figure est la mesure de sa surface : le nombre de carrés-unité qu'elle contient. Elle s'exprime en unités carrées (cm², m²...). Pour les figures usuelles, on utilise des formules qui reposent sur une base et la hauteur associée (perpendiculaire à cette base).",
  },
  figure: {
    schema: triAire("base", "hauteur"),
    legende: "Le triangle : aire = base × hauteur ÷ 2 (la hauteur tombe perpendiculairement sur la base).",
  },
  // Un dessin sous chaque propriete (REGLES.md § 2 bis). La quatrieme porte le
  // cas que personne ne dessine : un triangle OBTUSANGLE, dont la hauteur tombe
  // en dehors du cote. C'est la que l'eleve prend le cote oblique — et un
  // triangle bien sage ne le lui apprendrait jamais.
  proprietes: [
    {
      titre: "L'unité",
      texte: "Une aire se mesure en carrés-unité : cm², m², km². (Le périmètre, lui, est en cm.)",
      schema: figLibre(3, 4, ([] as [number, number][]).concat(
        ...Array.from({ length: 3 }, (_, r) => Array.from({ length: 4 }, (_, c) => [r, c] as [number, number]))
      )),
    },
    {
      titre: "Le triangle",
      texte: "Aire = base × hauteur ÷ 2 (un triangle est la moitié d'un parallélogramme).",
      schema: triAire("base", "hauteur"),
    },
    {
      titre: "Le parallélogramme",
      texte: "Aire = base × hauteur (on ne divise PAS par 2).",
      schema: parallelo("base", "hauteur"),
    },
    {
      titre: "La hauteur",
      texte: "Toujours perpendiculaire à la base choisie (pas un côté oblique).",
      schema: triAire("base", "hauteur", {
        points: { A: { x: 45, y: 190 }, B: { x: 145, y: 190 }, C: { x: 245, y: 60 } },
      }),
    },
  ],
  reel: {
    texte:
      "Calculer une aire sert tous les jours : la surface d'une pièce à carreler, d'un terrain, d'un champ de canne à La Réunion, la quantité de peinture pour un mur, le tissu pour une voile.",
  },
  historique: {
    texte:
      "Les Égyptiens calculaient déjà des aires de champs il y a 4000 ans pour répartir l'impôt après les crues du Nil. Le mot « géométrie » veut d'ailleurs dire « mesure de la terre ».",
  },
  formule: {
    contexte: "L'aire d'un triangle",
    expression: "aire = base × hauteur ÷ 2",
    legende: "Exemple : base 8 cm, hauteur 5 cm → 8 × 5 ÷ 2 = 20 cm².",
    schema: triAire("8 cm", "5 cm"),
  },
  methode: [
    {
      titre: "Je repère base et hauteur",
      texte: "La hauteur est perpendiculaire à la base choisie.",
      // La MEME figure, mais la base prise sur un autre cote : c'est le choix
      // de la base qui commande la hauteur, pas l'inverse.
      schema: triAire("", "hauteur depuis A", { sommet: "A" }),
    },
    {
      titre: "J'applique la formule",
      texte: "Triangle : base × hauteur ÷ 2 ; parallélogramme : base × hauteur.",
      schema: parallelo("7 cm", "3 cm"),
    },
    {
      titre: "Je décompose si besoin",
      texte: "Une figure compliquée se découpe en rectangles et triangles.",
      schema: figLibre(3, 4, figureL),
    },
  ],
  usages: [
    {
      titre: "Triangle",
      detail: "base × hauteur ÷ 2.",
      schema: triAire("10 cm", "6 cm"),
    },
    {
      titre: "Parallélogramme",
      detail: "base × hauteur.",
      schema: parallelo("9 cm", "5 cm"),
    },
    {
      titre: "Figure composée",
      detail: "On découpe, on calcule chaque morceau, on additionne.",
      schema: figLibre(4, 5, ([] as [number, number][]).concat(
        ...Array.from({ length: 4 }, (_, r) =>
          Array.from({ length: 5 }, (_, c) => [r, c] as [number, number]).filter(
            ([rr, cc]) => !(rr < 2 && cc >= 3)
          )
        )
      )),
    },
  ],
  exemples: [
    {
      titre: "Aire d'un triangle",
      donnees: "Un triangle de base 8 cm et de hauteur 5 cm.",
      question: "Quelle est son aire ?",
      schema: triAire("8 cm", "5 cm"),
      solution:
        "aire = base × hauteur ÷ 2 = 8 × 5 ÷ 2 = 40 ÷ 2 = 20 cm².",
    },
    {
      titre: "Aire d'un parallélogramme",
      donnees: "Un parallélogramme de base 6 cm et de hauteur 4 cm.",
      question: "Quelle est son aire ?",
      schema: parallelo("6 cm", "4 cm"),
      solution:
        "aire = base × hauteur = 6 × 4 = 24 cm² (ici on ne divise pas par 2).",
    },
    {
      titre: "Une figure composée",
      donnees: "Une figure en L sur un quadrillage (carreaux de 1 cm²).",
      question: "Quelle est son aire ?",
      schema: figLibre(3, 4, figureL),
      solution:
        "On compte les carreaux (ou on décompose) : la figure contient 10 carreaux de 1 cm². Son aire est 10 cm².",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un triangle a une base de 10 cm et une hauteur de 6 cm. Quelle est son aire ?",
      correction: "10 × 6 ÷ 2 = 60 ÷ 2 = 30 cm².",
    },
    {
      question: "Un parallélogramme a une base de 8 cm et une hauteur de 5 cm. Quelle est son aire ?",
      correction: "8 × 5 = 40 cm² (pas de division par 2 pour un parallélogramme).",
    },
    {
      question: "Un triangle a une aire de 20 cm² et une base de 8 cm. Quelle est sa hauteur ?",
      correction: "hauteur = aire × 2 ÷ base = 20 × 2 ÷ 8 = 40 ÷ 8 = 5 cm.",
    },
    {
      question: "Un élève calcule l'aire d'un triangle (base 8, hauteur 5) et répond 40 cm². A-t-il raison ?",
      correction: "Non : il a oublié de diviser par 2. 8 × 5 = 40, puis 40 ÷ 2 = 20 cm².",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

export const slidesAires5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Aires - 5e",
    section: {
      type: "objectif",
      phrase: "Calculer l'aire d'un triangle et d'un parallélogramme",
      sousPhrase:
        "L'aire mesure une surface, en cm². On utilise base et hauteur (perpendiculaire à la base).",
      encadre: {
        titre: "L'idée",
        texte: "Triangle : base × hauteur ÷ 2. Parallélogramme : base × hauteur.",
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
          "Carreler une pièce, peindre un mur, mesurer un champ de canne, tailler une voile : partout où il y a une surface.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Les Égyptiens mesuraient les champs il y a 4000 ans. « Géométrie » veut dire « mesure de la terre ».",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheAires5e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Les deux formules",
    badge: "À connaître",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Triangle",
        contenu: "base × hauteur ÷ 2. Ex : 8 × 5 ÷ 2 = 20 cm².",
      },
      droite: {
        variante: "ok",
        titre: "Parallélogramme",
        contenu: "base × hauteur. Ex : 6 × 4 = 24 cm².",
      },
    },
  },
  {
    titre: "Aire d'un triangle",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "Base 8 cm, hauteur 5 cm.",
      question: "Quelle est l'aire ?",
      correction: "8 × 5 ÷ 2 = 40 ÷ 2 = 20 cm².",
    },
  },
  {
    titre: "Figure composée",
    badge: "On décompose",
    section: {
      type: "exemple",
      enonce: "Une figure en L sur un quadrillage (carreaux de 1 cm²).",
      question: "Comment trouver son aire ?",
      correction: "On la découpe en rectangles (ou on compte les carreaux), puis on additionne les aires.",
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
      enonce: "Un triangle a une aire de 20 cm² et une base de 8 cm.",
      question: "Quelle est sa hauteur ?",
      indice: "Inverse la formule : hauteur = aire × 2 ÷ base.",
      correction: "20 × 2 ÷ 8 = 40 ÷ 8 = 5 cm.",
    },
  },
];
