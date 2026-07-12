// ─── Fiche de cours : le théorème de Pythagore (4e) ────────────────────────────
// Première fiche « en blocs » : toute la matière de la page vit ici, la page
// et les flashcards ne font que la rendre. Contenu repris de l'ancienne page
// écrite à la main, enrichi des blocs Définition et Propriétés (format
// canonique réclamé par les profs).

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

const pieges = [
  "Confondre l'hypoténuse (face à l'angle droit) avec un autre côté.",
  "Oublier de prendre la racine carrée quand on cherche une longueur.",
  "Additionner les longueurs au lieu d'additionner leurs carrés.",
];

const aRetenir = [
  "Pythagore s'utilise uniquement dans un triangle rectangle.",
  "hypoténuse² = somme des carrés des deux côtés de l'angle droit.",
  "La réciproque sert à prouver qu'un triangle est rectangle.",
];

const schemaTriangle = (
  <svg
    viewBox="0 0 320 190"
    className="h-auto w-full"
    role="img"
    aria-label="Triangle rectangle en A avec les deux côtés et l'hypoténuse"
  >
    <path
      d="M45 150 L270 150 L45 40 Z"
      fill="rgba(14,165,233,0.12)"
      stroke="#0ea5e9"
      strokeWidth="5"
      strokeLinejoin="round"
    />
    <path d="M45 127 L68 127 L68 150" fill="none" stroke="#f59e0b" strokeWidth="4" />
    <text x="150" y="172" fill="#334155" fontSize="16" fontWeight="800" textAnchor="middle">
      côté
    </text>
    <text x="40" y="98" fill="#334155" fontSize="16" fontWeight="800" textAnchor="end">
      côté
    </text>
    <text x="172" y="88" fill="#334155" fontSize="16" fontWeight="800" textAnchor="middle">
      hypoténuse
    </text>
    <text x="38" y="36" fill="#0f172a" fontSize="14" fontWeight="700" textAnchor="end">
      C
    </text>
    <text x="38" y="167" fill="#0f172a" fontSize="14" fontWeight="700" textAnchor="end">
      A
    </text>
    <text x="278" y="167" fill="#0f172a" fontSize="14" fontWeight="700">
      B
    </text>
  </svg>
);

export const fichePythagore4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "pythagore-theoreme",
  titre: "Le théorème de Pythagore",
  accroche:
    "Dans un triangle rectangle, le théorème de Pythagore relie les longueurs des trois côtés. Il sert à calculer une longueur manquante ou à vérifier qu'un triangle est rectangle.",
  identite: [
    { label: "Prérequis", valeur: "Triangle rectangle, carrés, racine carrée" },
    { label: "Formule clé", valeur: "hypoténuse² = côté² + côté²" },
    { label: "Outil", valeur: "Calculatrice (touche racine carrée)" },
  ],
  definition: {
    texte:
      "Si un triangle est rectangle, alors le carré de la longueur de l'hypoténuse est égal à la somme des carrés des longueurs des deux autres côtés.",
  },
  proprietes: [
    {
      titre: "Le théorème (sens direct)",
      texte:
        "Dans un triangle rectangle : hypoténuse² = côté² + côté². Il sert à calculer une longueur quand on connaît les deux autres.",
    },
    {
      titre: "La réciproque",
      texte:
        "Si le carré du plus grand côté est égal à la somme des carrés des deux autres, alors le triangle est rectangle. Elle sert à prouver un angle droit.",
    },
    {
      titre: "La contraposée",
      texte:
        "Si l'égalité n'est pas vérifiée, alors le triangle n'est pas rectangle. Elle sert à prouver qu'il n'y a pas d'angle droit.",
    },
  ],
  reel: {
    texte:
      "Pythagore sert à calculer des distances et à vérifier des angles droits : maçons et charpentiers s'en servent pour des murs bien droits, on calcule la longueur d'une diagonale, d'une rampe ou d'un toit, et il est utilisé en navigation et en informatique.",
  },
  historique: {
    texte:
      "Le théorème porte le nom de Pythagore, savant grec du VIᵉ siècle avant J.-C. Mais les Babyloniens et les Égyptiens connaissaient déjà des triangles comme 3-4-5, plus de mille ans avant lui, pour tracer des angles droits.",
  },
  formule: {
    contexte: "Triangle rectangle en A",
    expression: "BC² = AB² + AC²",
    legende: "BC est l'hypoténuse (face à l'angle droit).",
    schema: schemaTriangle,
  },
  methode: [
    {
      titre: "Repérer",
      texte:
        "On trouve l'angle droit, puis l'hypoténuse : le côté opposé à l'angle droit, le plus grand.",
    },
    {
      titre: "Écrire",
      texte:
        "On applique l'égalité : hypoténuse² = côté² + côté² (les deux côtés de l'angle droit).",
    },
    {
      titre: "Calculer",
      texte:
        "On remplace, on calcule les carrés, puis on prend la racine carrée pour la longueur cherchée.",
    },
  ],
  usages: [
    {
      titre: "Calculer l'hypoténuse",
      detail:
        "On connaît les deux côtés de l'angle droit : hypoténuse = racine carrée de (côté² + côté²).",
    },
    {
      titre: "Calculer un côté",
      detail:
        "On connaît l'hypoténuse et un côté : côté = racine carrée de (hypoténuse² − autre côté²).",
    },
    {
      titre: "Vérifier l'angle droit",
      detail:
        "Réciproque : si le carré du plus grand côté égale la somme des carrés des deux autres, le triangle est rectangle.",
    },
  ],
  exemples: [
    {
      titre: "Calculer l'hypoténuse",
      donnees: "Le triangle ABC est rectangle en A, avec AB = 3 cm et AC = 4 cm.",
      question: "Calculer BC.",
      solution:
        "BC est l'hypoténuse. BC² = AB² + AC² = 3² + 4² = 9 + 16 = 25, donc BC = racine carrée de 25 = 5 cm.",
    },
    {
      titre: "Calculer un côté",
      donnees: "Le triangle ABC est rectangle en A, avec BC = 13 cm et AB = 5 cm.",
      question: "Calculer AC.",
      solution:
        "AC² = BC² − AB² = 13² − 5² = 169 − 25 = 144, donc AC = racine carrée de 144 = 12 cm.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Le triangle ABC est rectangle en A, avec AB = 6 cm et AC = 8 cm. Calcule BC.",
      correction:
        "BC² = 6² + 8² = 36 + 64 = 100, donc BC = racine carrée de 100 = 10 cm.",
    },
    {
      question:
        "Le triangle ABC est rectangle en A, avec BC = 17 cm et AB = 8 cm. Calcule AC.",
      correction:
        "AC² = 17² − 8² = 289 − 64 = 225, donc AC = racine carrée de 225 = 15 cm.",
    },
    {
      question: "Un triangle a pour côtés 5 cm, 12 cm et 13 cm. Est-il rectangle ?",
      correction:
        "13² = 169 et 5² + 12² = 25 + 144 = 169. Les deux sont égaux, donc le triangle est rectangle (réciproque de Pythagore).",
    },
    {
      question:
        "Explique pourquoi il faut un angle droit pour utiliser le théorème de Pythagore.",
      correction:
        "L'égalité hypoténuse² = côté² + côté² n'est vraie que dans un triangle rectangle. Sans angle droit, elle ne s'applique pas.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesPythagore4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Pythagore - 4e",
    section: {
      type: "objectif",
      phrase: "Calculer une longueur dans un triangle rectangle",
      sousPhrase:
        "Le théorème de Pythagore relie les longueurs des trois côtés d'un triangle rectangle.",
      encadre: {
        titre: "L'idée",
        texte: "En connaissant deux côtés, on trouve toujours le troisième.",
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
          "Murs bien droits des maçons, diagonale d'un terrain, longueur d'une rampe ou d'un toit, navigation, informatique.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Babyloniens et Égyptiens connaissaient le triangle 3-4-5 plus de 1000 ans avant Pythagore pour tracer des angles droits.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: fichePythagore4e.methode.map((m) => ({
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
      phrase: "BC² = AB² + AC²",
      sousPhrase: "BC est l'hypoténuse, le côté opposé à l'angle droit.",
      encadre: {
        titre: "Attention",
        texte: "Pythagore ne s'applique que dans un triangle rectangle.",
      },
    },
  },
  {
    titre: "Selon l'inconnue",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: fichePythagore4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Calculer l'hypoténuse",
    section: {
      type: "exemple",
      enonce: "ABC rectangle en A, AB = 3 cm, AC = 4 cm.",
      question: "Calculer BC.",
      correction: "BC² = 3² + 4² = 9 + 16 = 25, donc BC = 5 cm.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Calculer un côté",
    section: {
      type: "exemple",
      enonce: "ABC rectangle en A, BC = 13 cm, AB = 5 cm.",
      question: "Calculer AC.",
      correction: "AC² = 13² − 5² = 169 − 25 = 144, donc AC = 12 cm.",
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
      enonce: "ABC rectangle en A, AB = 6 cm, AC = 8 cm.",
      question: "Calcule BC.",
      indice: "BC² = AB² + AC², puis racine carrée.",
      correction: "BC² = 6² + 8² = 36 + 64 = 100, donc BC = 10 cm.",
    },
  },
];
