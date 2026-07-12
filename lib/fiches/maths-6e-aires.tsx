// ─── Fiche de cours : les aires (6e) ────────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/aires.bank.ts.
//
// Correspondance micro-compétences → blocs :
// - aire_comprendre  → accroche, définition, identité, piège « unité carrée »
// - aire_compter     → propriété 1, usage « Compter les carreaux », entraînement 1
// - aire_rectangle   → propriété 2, formule, exemple 1, entraînement 2
// - aire_carre       → propriété 3, formule, exemple 2, entraînement (problème)
// - aire_comparer    → méthode « Comparer dans la même unité », à retenir
// - aire_decomposer  → propriété 4, usage « Découper la figure », entraînement 3
// - aire_probleme    → bloc réel, exercice problème du jardin (entraînement 4)
// - aire_defi        → piège « aire ≠ périmètre », question défi (entraînement 3)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

const pieges = [
  "Confondre l'aire (la surface à l'intérieur) et le périmètre (le tour de la figure).",
  "Oublier l'unité carrée : une aire s'écrit en cm² ou en m², jamais en cm ou en m.",
  "Additionner longueur et largeur au lieu de les multiplier pour l'aire d'un rectangle.",
];

const aRetenir = [
  "L'aire mesure la surface occupée par une figure, en unités carrées (cm², m²).",
  "Aire du rectangle = longueur × largeur. Aire du carré = côté × côté.",
  "Une figure compliquée se découpe en rectangles et en carrés : on additionne les aires.",
];

const schemaRectangle = (
  <svg
    viewBox="0 0 320 190"
    className="h-auto w-full"
    role="img"
    aria-label="Rectangle avec sa longueur L, sa largeur l et sa surface coloriée"
  >
    <rect
      x="55"
      y="45"
      width="210"
      height="105"
      fill="rgba(14,165,233,0.12)"
      stroke="#0ea5e9"
      strokeWidth="5"
      strokeLinejoin="round"
    />
    <line x1="55" y1="80" x2="265" y2="80" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.35" />
    <line x1="55" y1="115" x2="265" y2="115" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.35" />
    <line x1="125" y1="45" x2="125" y2="150" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.35" />
    <line x1="195" y1="45" x2="195" y2="150" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.35" />
    <text x="160" y="32" fill="#334155" fontSize="16" fontWeight="800" textAnchor="middle">
      longueur L
    </text>
    <text x="290" y="103" fill="#334155" fontSize="16" fontWeight="800" textAnchor="middle">
      l
    </text>
    <text x="160" y="176" fill="#0f172a" fontSize="15" fontWeight="700" textAnchor="middle">
      Aire = L × l
    </text>
  </svg>
);

export const ficheAires6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "aire-surface",
  titre: "Les aires",
  accroche:
    "L'aire, c'est la place qu'une figure occupe à l'intérieur de son contour. On la mesure en unités carrées : compter des carreaux, multiplier pour un rectangle ou un carré, découper les figures compliquées.",
  identite: [
    { label: "Prérequis", valeur: "Multiplication, rectangle, carré, quadrillage" },
    { label: "Formules clés", valeur: "Rectangle : L × l ; carré : c × c" },
    { label: "Unités", valeur: "cm², m² (toujours des unités carrées)" },
  ],
  definition: {
    texte:
      "L'aire d'une figure est la mesure de la surface qu'elle occupe, c'est-à-dire tout l'intérieur de la figure. Elle se mesure en unités carrées : le cm² pour une petite surface, le m² pour un jardin ou une pièce.",
  },
  proprietes: [
    {
      titre: "Compter les unités",
      texte:
        "Sur un quadrillage, l'aire d'une figure est le nombre de carreaux unités qu'elle recouvre. 12 carreaux recouverts, c'est une aire de 12 unités d'aire.",
    },
    {
      titre: "L'aire du rectangle",
      texte:
        "Aire du rectangle = longueur × largeur. Un rectangle de 6 cm sur 4 cm a une aire de 6 × 4 = 24 cm².",
    },
    {
      titre: "L'aire du carré",
      texte:
        "Dans un carré, tous les côtés sont égaux. Aire du carré = côté × côté. Un carré de côté 5 cm a une aire de 5 × 5 = 25 cm².",
    },
    {
      titre: "Décomposer une figure",
      texte:
        "Une figure compliquée (en L, en escalier) se découpe en rectangles et en carrés. L'aire totale est la somme des aires des morceaux, s'ils ne se chevauchent pas.",
    },
  ],
  reel: {
    texte:
      "On calcule des aires tous les jours : le nombre de pots de peinture pour un mur, le carrelage d'une salle de bain, la pelouse à semer dans un jardin, la surface d'un appartement sur une annonce. À chaque fois, la question est la même : quelle surface faut-il couvrir ?",
  },
  historique: {
    texte:
      "Il y a plus de 4000 ans, en Égypte, le Nil débordait chaque année et effaçait les limites des champs. Des arpenteurs, surnommés les tendeurs de corde, remesuraient alors la surface de chaque parcelle pour répartir les terres et calculer l'impôt. Mesurer des aires est l'un des plus vieux métiers des mathématiques.",
  },
  formule: {
    contexte: "Rectangle de longueur L et de largeur l",
    expression: "A(rectangle) = L × l ; A(carré) = c × c",
    legende: "Le résultat s'exprime toujours en unités carrées (cm², m²).",
    schema: schemaRectangle,
  },
  methode: [
    {
      titre: "Regarder la figure",
      texte:
        "Est-ce un rectangle, un carré, une figure sur quadrillage ou une figure composée ? La forme décide de la méthode : formule, comptage ou découpage.",
    },
    {
      titre: "Calculer avec la bonne formule",
      texte:
        "Rectangle : longueur × largeur. Carré : côté × côté. Sur quadrillage : compter les carreaux unités recouverts.",
    },
    {
      titre: "Écrire l'unité carrée",
      texte:
        "On termine toujours par l'unité : 24 cm², 40 m². Pour comparer deux aires, on vérifie d'abord qu'elles sont dans la même unité, puis on compare les nombres.",
    },
  ],
  usages: [
    {
      titre: "Compter les carreaux",
      detail:
        "Sur un quadrillage, on compte les carreaux unités recouverts par la figure. 9 carreaux recouverts donnent une aire de 9 unités d'aire.",
    },
    {
      titre: "Calculer rectangle ou carré",
      detail:
        "On connaît les dimensions : rectangle = longueur × largeur, carré = côté × côté. On n'oublie pas l'unité carrée à la fin.",
    },
    {
      titre: "Découper la figure",
      detail:
        "La figure n'est ni un rectangle ni un carré ? On la découpe en morceaux simples, on calcule l'aire de chaque morceau, puis on additionne.",
    },
  ],
  exemples: [
    {
      titre: "L'aire d'un rectangle",
      donnees: "Un rectangle mesure 8 cm de longueur et 5 cm de largeur.",
      question: "Calculer son aire.",
      solution:
        "C'est un rectangle, donc aire = longueur × largeur = 8 × 5 = 40. Son aire est 40 cm². Attention : 8 + 5 + 8 + 5 = 26 cm, c'est son périmètre, pas son aire.",
    },
    {
      titre: "Une figure en L",
      donnees:
        "Une figure en L est formée d'un rectangle de 4 cm sur 3 cm et d'un carré de côté 2 cm, sans chevauchement.",
      question: "Calculer son aire totale.",
      solution:
        "Aire du rectangle : 4 × 3 = 12 cm². Aire du carré : 2 × 2 = 4 cm². Aire totale : 12 + 4 = 16 cm².",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Sur un quadrillage, une figure recouvre 3 rangées de 4 carreaux unités. Quelle est son aire ?",
      correction:
        "On compte les carreaux : 3 rangées de 4 carreaux, donc 3 × 4 = 12 carreaux unités. L'aire de la figure est 12 unités d'aire.",
    },
    {
      question: "Calcule l'aire d'un rectangle de 6 cm sur 4 cm, puis celle d'un carré de côté 7 cm.",
      correction:
        "Rectangle : aire = longueur × largeur = 6 × 4 = 24 cm². Carré : aire = côté × côté = 7 × 7 = 49 cm².",
    },
    {
      question:
        "Défi : deux rectangles peuvent-ils avoir la même aire mais des périmètres différents ?",
      correction:
        "Oui. Un rectangle de 3 cm sur 4 cm et un rectangle de 2 cm sur 6 cm ont tous les deux une aire de 12 cm². Mais leurs périmètres valent 14 cm et 16 cm : l'aire et le périmètre sont deux grandeurs différentes.",
    },
    {
      question:
        "Problème : un jardin rectangulaire mesure 7 m de long et 3 m de large. On veut le comparer à un potager carré de côté 5 m. Lequel a la plus grande aire ?",
      correction:
        "Aire du jardin : 7 × 3 = 21 m². Aire du potager : 5 × 5 = 25 m². Les deux aires sont en m², on compare les nombres : 25 est plus grand que 21. C'est le potager carré qui a la plus grande aire.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesAires6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les aires - 6e",
    section: {
      type: "objectif",
      phrase: "Mesurer la surface d'une figure",
      sousPhrase:
        "L'aire, c'est la place occupée à l'intérieur du contour. Elle se mesure en unités carrées.",
      encadre: {
        titre: "L'idée",
        texte: "Compter des carreaux, multiplier pour un rectangle ou un carré, découper le reste.",
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
          "Pots de peinture pour un mur, carrelage d'une pièce, pelouse d'un jardin, surface d'un appartement : à chaque fois, on calcule une aire.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "En Égypte, il y a plus de 4000 ans, les crues du Nil effaçaient les champs. Les tendeurs de corde remesuraient chaque parcelle pour répartir les terres.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheAires6e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Les formules",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "Rectangle : L × l — Carré : c × c",
      sousPhrase: "Sur quadrillage, l'aire est le nombre de carreaux unités recouverts.",
      encadre: {
        titre: "Attention",
        texte: "Une aire s'écrit toujours en unités carrées : cm², m². Jamais en cm ni en m.",
      },
    },
  },
  {
    titre: "Selon la figure",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: ficheAires6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Aire d'un rectangle",
    section: {
      type: "exemple",
      enonce: "Un rectangle mesure 8 cm de longueur et 5 cm de largeur.",
      question: "Calculer son aire.",
      correction: "Aire = 8 × 5 = 40 cm². Le périmètre, lui, vaudrait 26 cm : à ne pas confondre.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Figure en L",
    section: {
      type: "exemple",
      enonce: "Une figure en L : un rectangle de 4 cm sur 3 cm et un carré de côté 2 cm.",
      question: "Calculer son aire totale.",
      correction: "Rectangle : 4 × 3 = 12 cm². Carré : 2 × 2 = 4 cm². Total : 12 + 4 = 16 cm².",
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
      enonce: "Un jardin rectangulaire mesure 7 m de long et 3 m de large.",
      question: "Calcule son aire.",
      indice: "Aire du rectangle = longueur × largeur, puis l'unité carrée.",
      correction: "Aire = 7 × 3 = 21 m².",
    },
  },
];
