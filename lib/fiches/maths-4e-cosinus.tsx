// ─── Fiche de cours : le cosinus (4e) ──────────────────────────────────────────
// Fiche « en blocs » : toute la matière de la page vit ici, la page et les
// flashcards ne font que la rendre. Contenu repris de l'ancienne page écrite
// à la main, enrichi des blocs Définition et Propriétés (format canonique
// réclamé par les profs).

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

const pieges = [
  "Confondre le côté adjacent et le côté opposé à l'angle.",
  "Laisser la calculatrice en radians au lieu des degrés.",
  "Diviser quand il faut multiplier, ou l'inverse, selon l'inconnue.",
];

const aRetenir = [
  "cos(angle) = adjacent / hypoténuse : on retient CAH.",
  "L'hypoténuse est toujours le côté opposé à l'angle droit.",
  "Le cosinus d'un angle aigu est toujours compris entre 0 et 1.",
];

const schemaTriangle = (
  <svg
    viewBox="0 0 320 190"
    className="h-auto w-full"
    role="img"
    aria-label="Triangle rectangle avec angle, côté adjacent et hypoténuse"
  >
    <path
      d="M45 145 L270 145 L45 35 Z"
      fill="rgba(14,165,233,0.12)"
      stroke="#0ea5e9"
      strokeWidth="5"
      strokeLinejoin="round"
    />
    <path
      d="M45 122 L68 122 L68 145"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="4"
    />
    <path
      d="M225 145 A45 45 0 0 0 237 114"
      fill="none"
      stroke="#ec4899"
      strokeWidth="5"
    />
    <text x="151" y="166" fill="#334155" fontSize="17" fontWeight="800" textAnchor="middle">
      adjacent
    </text>
    <text x="168" y="84" fill="#334155" fontSize="17" fontWeight="800" textAnchor="middle">
      hypoténuse
    </text>
    <text x="244" y="118" fill="#db2777" fontSize="18" fontWeight="900">
      angle
    </text>
  </svg>
);

export const ficheCosinus4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "cosinus",
  titre: "Le cosinus",
  accroche:
    "Dans un triangle rectangle, le cosinus d'un angle aigu relie le côté adjacent à cet angle et l'hypoténuse. Il sert à calculer une longueur ou un angle.",
  identite: [
    { label: "Prérequis", valeur: "Triangle rectangle, hypoténuse" },
    { label: "Formule clé", valeur: "cos = adjacent / hypoténuse" },
    { label: "Outil", valeur: "Calculatrice en mode degré" },
  ],
  definition: {
    texte:
      "Dans un triangle rectangle, le cosinus d'un angle aigu est le quotient de la longueur du côté adjacent à cet angle par la longueur de l'hypoténuse.",
  },
  proprietes: [
    {
      titre: "Compris entre 0 et 1",
      texte:
        "Le côté adjacent est toujours plus court que l'hypoténuse, donc le cosinus d'un angle aigu est toujours compris entre 0 et 1.",
    },
    {
      titre: "Il ne dépend que de l'angle",
      texte:
        "Deux triangles rectangles qui ont le même angle aigu donnent le même cosinus, quelle que soit leur taille : cos(60°) vaut 0,5 dans tous les triangles.",
    },
    {
      titre: "Un outil dans les deux sens",
      texte:
        "La touche cos de la calculatrice donne le cosinus d'un angle connu ; la touche cos⁻¹ retrouve l'angle quand on connaît le rapport adjacent / hypoténuse.",
    },
  ],
  reel: {
    texte:
      "La trigonométrie sert à calculer des distances ou des hauteurs sans les mesurer directement : hauteur d'un bâtiment, pente d'une route, navigation des bateaux et des avions, ou encore les angles de vue dans les jeux vidéo.",
  },
  historique: {
    texte:
      "La trigonométrie a été développée par les astronomes grecs et indiens, puis par les savants arabes au Moyen Âge, pour étudier le ciel et calculer la position des étoiles. Le mot « sinus » vient d'une traduction latine de l'arabe.",
  },
  formule: {
    contexte: "Dans un triangle rectangle",
    expression: "cos(angle) = adjacent / hypoténuse",
    legende: "Moyen mnémotechnique : CAH (Cosinus = Adjacent / Hypoténuse).",
    schema: schemaTriangle,
  },
  methode: [
    {
      titre: "Repérer",
      texte:
        "On trouve l'angle droit, puis l'hypoténuse : le plus grand côté, opposé à l'angle droit.",
    },
    {
      titre: "Choisir",
      texte:
        "Par rapport à l'angle choisi, on identifie le côté adjacent, puis on écrit cos = adjacent / hypoténuse.",
    },
    {
      titre: "Calculer",
      texte:
        "On isole l'inconnue, puis on calcule à la calculatrice en vérifiant le mode degré.",
    },
  ],
  usages: [
    {
      titre: "Trouver le côté adjacent",
      detail:
        "On connaît l'angle et l'hypoténuse : adjacent = hypoténuse x cos(angle).",
    },
    {
      titre: "Trouver l'hypoténuse",
      detail:
        "On connaît l'angle et le côté adjacent : hypoténuse = adjacent / cos(angle).",
    },
    {
      titre: "Trouver l'angle",
      detail:
        "On connaît les deux côtés : angle = cos⁻¹ de (adjacent / hypoténuse).",
    },
  ],
  exemples: [
    {
      titre: "Calculer un côté adjacent",
      donnees:
        "Dans le triangle ABC rectangle en A, BC = 10 cm et l'angle B vaut 60 degrés.",
      question: "Calculer AB.",
      solution:
        "AB est le côté adjacent à l'angle B et BC est l'hypoténuse. cos(60) = AB / BC, donc AB = 10 x cos(60) = 10 x 0,5 = 5 cm.",
    },
    {
      titre: "Calculer l'hypoténuse",
      donnees:
        "Dans un triangle rectangle, le côté adjacent à un angle de 40 degrés mesure 7 cm.",
      question: "Calculer l'hypoténuse au dixième près.",
      solution:
        "cos(40) = adjacent / hypoténuse, donc hypoténuse = 7 / cos(40), soit environ 7 / 0,766 = 9,1 cm.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Dans un triangle rectangle, l'hypoténuse mesure 12 cm et un angle mesure 30 degrés. Calcule le côté adjacent.",
      correction: "adjacent = 12 x cos(30) = 12 x 0,866 = environ 10,4 cm.",
    },
    {
      question:
        "Dans un triangle rectangle, le côté adjacent mesure 8 cm et l'angle mesure 50 degrés. Calcule l'hypoténuse.",
      correction: "hypoténuse = 8 / cos(50) = 8 / 0,643 = environ 12,4 cm.",
    },
    {
      question:
        "Dans le triangle RST rectangle en S, RT = 15 cm et l'angle R vaut 42 degrés. Calcule RS.",
      correction:
        "RS est l'adjacent à l'angle R et RT l'hypoténuse, donc RS = 15 x cos(42) = environ 11,1 cm.",
    },
    {
      question:
        "Explique pourquoi il faut d'abord repérer l'hypoténuse avant d'utiliser le cosinus.",
      correction:
        "Le cosinus est le rapport adjacent / hypoténuse. Sans repérer l'hypoténuse (le côté opposé à l'angle droit), on ne peut pas écrire le bon rapport.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesCosinus4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Cosinus - 4e",
    section: {
      type: "objectif",
      phrase: "Utiliser le cosinus dans un triangle rectangle",
      sousPhrase:
        "Le cosinus relie un angle aigu au côté adjacent et à l'hypoténuse.",
      encadre: {
        titre: "L'idée",
        texte: "Connaître un angle et un côté permet de retrouver les autres.",
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
          "Hauteur d'un bâtiment, pente d'une route, navigation des bateaux et des avions, angles de vue dans les jeux vidéo.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "La trigonométrie a été développée par les astronomes grecs, indiens puis arabes pour étudier le ciel.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheCosinus4e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "La formule",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "cos(angle) = adjacent / hypoténuse",
      sousPhrase: "Moyen mnémotechnique : CAH (Cosinus = Adjacent / Hypoténuse).",
      encadre: {
        titre: "Attention",
        texte: "L'hypoténuse est toujours le côté opposé à l'angle droit.",
      },
    },
  },
  {
    titre: "Selon l'inconnue",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: ficheCosinus4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Calculer un côté",
    section: {
      type: "exemple",
      enonce: "ABC rectangle en A, BC = 10 cm, angle B = 60°.",
      question: "Calculer AB.",
      correction: "AB = BC x cos(60) = 10 x 0,5 = 5 cm.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Calculer l'hypoténuse",
    section: {
      type: "exemple",
      enonce: "Côté adjacent à un angle de 40° : 7 cm.",
      question: "Calculer l'hypoténuse au dixième.",
      correction: "hypoténuse = 7 / cos(40) ≈ 7 / 0,766 ≈ 9,1 cm.",
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
      enonce: "Hypoténuse = 12 cm, angle = 30°.",
      question: "Calcule le côté adjacent.",
      indice: "adjacent = hypoténuse x cos(angle).",
      correction: "adjacent = 12 x cos(30) ≈ 12 x 0,866 ≈ 10,4 cm.",
    },
  },
];
