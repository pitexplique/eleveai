// ─── Fiche de cours : le repérage (CM2) ─────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/reperage.bank.ts (notionId reperage).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On MONTRE avec le canvas
// reperage du coach (quadrillage, points, cible, chemin) — comme dans les exercices.
//
// Micro-compétences couvertes (les 5 de la banque) :
// - reperage_quadrillage  → definition, figure (quadrillage + A), propriété « lignes et colonnes »
// - reperage_coordonnees  → propriété « on lit x puis y », exemple « Les coordonnées de A » (2 ; 3), piège, entraînement 1
// - reperage_placer_point → propriété « Placer », exemple « Placer B » (4 ; 1, cible), entraînement 2
// - reperage_deplacement  → propriété « Se déplacer », exemple « Le chemin » (départ + flèches), entraînement 3
// - reperage_defi         → défi dessiné 974 (le trésor : chemin jusqu'à la case cible), entraînement 4

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

type Pt = { x: number; y: number; label?: string; color?: string };
type Step = { direction: "haut" | "bas" | "gauche" | "droite"; count: number; color?: string };

function repere(opts: {
  points?: Pt[];
  target?: { x: number; y: number; label?: string; hidden?: boolean; color?: string };
  path?: { start: Pt; steps: Step[]; showArrows?: boolean; color?: string };
  rows?: number;
  cols?: number;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "reperage",
        grid: { rows: opts.rows ?? 5, cols: opts.cols ?? 5 },
        points: opts.points ?? [],
        target: opts.target,
        path: opts.path,
        display: {
          showGrid: true,
          showAxes: true,
          showCoordinates: true,
          showPointLabels: true,
          showTarget: true,
        },
      }}
    />
  );
}

const ROUGE = "#ef4444";
const ORANGE = "#f97316";
const VIOLET = "#8b5cf6";

const pieges = [
  "Inverser x et y : on lit toujours l'horizontale (x) d'abord, puis la verticale (y). A(2 ; 3), c'est 2 à droite, 3 en haut.",
  "Partir du mauvais coin : on compte les cases depuis l'origine (0 ; 0), en bas à gauche.",
  "Confondre nombre de cases et coordonnée : on compte les traits, pas les cases, en partant de 0.",
];

const aRetenir = [
  "Une case (ou un point) se repère par deux nombres : (x ; y).",
  "On lit x d'abord (horizontale), puis y (verticale).",
  "L'origine (0 ; 0) est en bas à gauche.",
];

export const ficheReperageCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "reperage",
  titre: "Le repérage",
  accroche:
    "Se repérer sur un quadrillage, c'est trouver une case ou un point avec deux nombres : (x ; y). Comme la bataille navale ou un plan de ville : on croise une colonne et une ligne.",
  identite: [
    { label: "Mots clés", valeur: "Quadrillage, coordonnées, abscisse, ordonnée, origine" },
    { label: "Le secret", valeur: "On lit x d'abord (→), puis y (↑)" },
    { label: "Outil", valeur: "Le quadrillage et ses deux axes" },
  ],
  definition: {
    texte:
      "Un quadrillage sert à se repérer. Chaque point se repère par deux nombres, ses coordonnées (x ; y). Le premier, x, se lit sur l'axe horizontal ; le second, y, sur l'axe vertical. On part de l'origine (0 ; 0), en bas à gauche.",
  },
  figure: {
    schema: repere({ points: [{ x: 2, y: 3, label: "A", color: ROUGE }] }),
    legende: "Le point A se trouve à 2 cases vers la droite et 3 cases vers le haut : A(2 ; 3).",
  },
  proprietes: [
    {
      titre: "Lignes et colonnes",
      texte: "Le quadrillage a des colonnes (verticales) et des lignes (horizontales) numérotées.",
    },
    {
      titre: "On lit x puis y",
      texte: "Le premier nombre = l'horizontale (→). Le second = la verticale (↑).",
    },
    {
      titre: "Placer un point",
      texte: "Pour B(4 ; 1) : on avance de 4 vers la droite, puis de 1 vers le haut.",
    },
    {
      titre: "Se déplacer",
      texte: "Un chemin se décrit par des flèches : 3 à droite, 2 en haut… on suit et on arrive.",
    },
  ],
  reel: {
    texte:
      "À La Réunion, on se repère tout le temps : une case sur un plan de Saint-Pierre, sa position dans une salle de classe, un point sur une carte de randonnée, ou les coordonnées d'un lieu sur une appli GPS.",
  },
  historique: {
    texte:
      "L'idée de repérer un point par deux nombres vient de René Descartes, un savant du 17e siècle. On raconte qu'il aurait eu l'idée en regardant une mouche se promener au plafond : comment décrire sa position ? Avec deux nombres !",
  },
  methode: [
    { titre: "Je pars de l'origine", texte: "Le coin en bas à gauche, c'est (0 ; 0)." },
    { titre: "Je lis x puis y", texte: "D'abord l'horizontale (→), ensuite la verticale (↑)." },
    { titre: "Je compte depuis 0", texte: "Je compte les traits, pas les cases, en partant de 0." },
  ],
  usages: [
    { titre: "Jouer", detail: "La bataille navale : « B3 touché ! »" },
    { titre: "S'orienter", detail: "Trouver une case sur un plan de ville ou une carte." },
    { titre: "Programmer", detail: "Déplacer un personnage sur une grille (en jeu ou en code)." },
  ],
  exemples: [
    {
      titre: "Les coordonnées de A",
      donnees: "Le point A est placé sur le quadrillage.",
      question: "Quelles sont ses coordonnées ?",
      schema: repere({ points: [{ x: 2, y: 3, label: "A", color: ROUGE }] }),
      solution:
        "On lit l'horizontale : 2. Puis la verticale : 3. Donc A(2 ; 3).",
    },
    {
      titre: "Placer B(4 ; 1)",
      donnees: "On veut placer le point B de coordonnées (4 ; 1).",
      question: "Où se trouve B ?",
      schema: repere({ target: { x: 4, y: 1, label: "B", color: ORANGE } }),
      solution:
        "On avance de 4 vers la droite, puis de 1 vers le haut. B est sur la case cible.",
    },
    {
      titre: "Le chemin",
      donnees: "On part de D(1 ; 1). On avance de 3 à droite, puis de 2 en haut.",
      question: "Où arrive-t-on ?",
      schema: repere({
        path: {
          start: { x: 1, y: 1, label: "D", color: VIOLET },
          steps: [
            { direction: "droite", count: 3 },
            { direction: "haut", count: 2 },
          ],
          showArrows: true,
        },
      }),
      solution:
        "De (1 ; 1), 3 à droite → (4 ; 1), puis 2 en haut → (4 ; 3). On arrive en (4 ; 3).",
    },
    {
      titre: "Le défi 974",
      donnees: "Sur le plan, le trésor part de (0 ; 0) : 4 cases à droite, puis 3 cases en haut.",
      question: "Quelles sont les coordonnées du trésor ?",
      schema: repere({
        rows: 6,
        cols: 6,
        path: {
          start: { x: 0, y: 0, label: "Départ", color: VIOLET },
          steps: [
            { direction: "droite", count: 4 },
            { direction: "haut", count: 3 },
          ],
          showArrows: true,
        },
        target: { x: 4, y: 3, label: "Trésor", color: ORANGE },
      }),
      solution:
        "De (0 ; 0), 4 à droite → (4 ; 0), puis 3 en haut → (4 ; 3). Le trésor est en (4 ; 3).",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un point est à 3 cases à droite et 0 case en haut. Quelles coordonnées ?",
      correction: "x = 3, y = 0 : le point est en (3 ; 0), sur l'axe horizontal.",
    },
    {
      question: "Où place-t-on le point C(0 ; 4) ?",
      correction: "x = 0 (on ne bouge pas horizontalement), y = 4 : sur l'axe vertical, à 4 vers le haut.",
    },
    {
      question: "On part de (2 ; 1), on va 2 à droite et 3 en haut. Où arrive-t-on ?",
      correction: "2 à droite → (4 ; 1), puis 3 en haut → (4 ; 4). On arrive en (4 ; 4).",
    },
    {
      question: "Quelle est la différence entre A(2 ; 3) et A(3 ; 2) ?",
      correction: "Ce ne sont pas les mêmes points ! L'ordre compte : x d'abord, puis y.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesReperageCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Repérage - CM2",
    section: {
      type: "objectif",
      phrase: "Se repérer sur un quadrillage avec des coordonnées",
      sousPhrase:
        "Chaque point se repère par deux nombres (x ; y) : d'abord l'horizontale, puis la verticale.",
      encadre: {
        titre: "L'idée",
        texte: "On lit toujours x d'abord (→), puis y (↑). L'ordre compte !",
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
          "La bataille navale, une case sur un plan de Saint-Pierre, un point sur une carte de randonnée, le GPS.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Repérer un point par deux nombres vient de Descartes : il aurait eu l'idée en regardant une mouche au plafond.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheReperageCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Les coordonnées de A",
    section: {
      type: "exemple",
      enonce: "Le point A est placé sur le quadrillage.",
      question: "Quelles sont ses coordonnées ?",
      correction: "Horizontale : 2. Verticale : 3. Donc A(2 ; 3).",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Le chemin",
    section: {
      type: "exemple",
      enonce: "On part de D(1 ; 1) : 3 à droite, puis 2 en haut.",
      question: "Où arrive-t-on ?",
      correction: "3 à droite → (4 ; 1), puis 2 en haut → (4 ; 3).",
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
      enonce: "Sur le plan, le trésor part de (0 ; 0) : 4 cases à droite, puis 3 cases en haut.",
      question: "Quelles sont les coordonnées du trésor ?",
      indice: "Avance d'abord sur l'horizontale, puis sur la verticale.",
      correction: "4 à droite → (4 ; 0), puis 3 en haut → (4 ; 3).",
    },
  },
];
