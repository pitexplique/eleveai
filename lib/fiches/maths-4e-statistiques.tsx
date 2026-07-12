// ─── Fiche de cours : les statistiques (4e) ────────────────────────────────────
// Fiche « en blocs » : toute la matière de la page vit ici, la page et les
// flashcards ne font que la rendre. Contenu repris de l'ancienne page écrite
// à la main, enrichi des blocs Définition et Propriétés (format canonique
// réclamé par les profs).

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

const pieges = [
  "Oublier de ranger les valeurs dans l'ordre avant de chercher la médiane.",
  "Diviser par autre chose que le nombre de valeurs pour la moyenne.",
  "Confondre la moyenne (équilibre) et la médiane (valeur du milieu).",
];

const aRetenir = [
  "Moyenne = somme des valeurs ÷ nombre de valeurs.",
  "Médiane = valeur du milieu, après avoir rangé la série.",
  "Étendue = plus grande valeur − plus petite valeur.",
];

const serie = [8, 12, 10, 14, 16];
const moyenne = 12;

const schemaSerie = (
  <svg
    viewBox="0 0 330 170"
    className="h-auto w-full"
    role="img"
    aria-label="Diagramme en barres de la série avec la moyenne"
  >
    <line x1="20" y1="150" x2="320" y2="150" stroke="#cbd5e1" strokeWidth="2" />
    {serie.map((v, i) => (
      <g key={i}>
        <rect
          x={34 + i * 58}
          y={150 - v * 7}
          width={40}
          height={v * 7}
          rx={4}
          fill="#14b8a6"
        />
        <text
          x={54 + i * 58}
          y={150 - v * 7 - 6}
          fill="#0f172a"
          fontSize="13"
          fontWeight="800"
          textAnchor="middle"
        >
          {v}
        </text>
      </g>
    ))}
    <line
      x1="20"
      y1={150 - moyenne * 7}
      x2="320"
      y2={150 - moyenne * 7}
      stroke="#0f766e"
      strokeWidth="2.5"
      strokeDasharray="6 5"
    />
    <text x="320" y={150 - moyenne * 7 - 6} fill="#0f766e" fontSize="12" fontWeight="800" textAnchor="end">
      moyenne 12
    </text>
  </svg>
);

export const ficheStatistiques4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "stat-statistique",
  titre: "Les statistiques",
  accroche:
    "Les statistiques servent à résumer une série de données avec des indicateurs : la moyenne, la médiane et l'étendue.",
  identite: [
    { label: "Prérequis", valeur: "Addition, division, ranger des nombres" },
    { label: "Indicateurs", valeur: "Moyenne, médiane, étendue" },
    { label: "Outil", valeur: "Calculatrice" },
  ],
  definition: {
    texte:
      "Une série statistique est la liste des valeurs obtenues en observant un même caractère (des notes, des tailles, des températures...). En 4e, on apprend aussi la moyenne pondérée : quand chaque valeur apparaît plusieurs fois, on multiplie chaque valeur par son effectif, on additionne le tout, puis on divise par l'effectif total.",
  },
  proprietes: [
    {
      titre: "Moyenne simple et moyenne pondérée",
      texte:
        "La moyenne simple s'obtient en divisant la somme des valeurs par le nombre de valeurs. Quand les valeurs se répètent, on utilise la moyenne pondérée : somme des (valeur × effectif) ÷ effectif total. Les deux donnent le même résultat.",
    },
    {
      titre: "La médiane partage la série en deux",
      texte:
        "Une fois la série rangée dans l'ordre croissant, la médiane la coupe en deux moitiés : au moins la moitié des valeurs lui sont inférieures ou égales, au moins la moitié lui sont supérieures ou égales. Elle résiste aux valeurs extrêmes.",
    },
    {
      titre: "Effectifs et fréquences",
      texte:
        "L'effectif d'une valeur est le nombre de fois où elle apparaît dans la série. Sa fréquence est l'effectif divisé par l'effectif total : c'est une proportion, souvent exprimée en pourcentage.",
    },
  ],
  reel: {
    texte:
      "Les statistiques permettent de comprendre des résultats et de comparer : la moyenne des notes de la classe, les températures moyennes, les sondages, les scores au sport, ou encore les données utilisées par les entreprises pour décider.",
  },
  historique: {
    texte:
      "Le mot « statistique » est lié au mot « État » : au départ, on comptait la population et les richesses d'un pays. Les premiers recensements existaient déjà dans l'Égypte ancienne et à Rome, il y a plus de 2000 ans.",
  },
  formule: {
    contexte: "La moyenne d'une série",
    expression: "Moyenne = somme des valeurs ÷ nombre de valeurs",
    legende: "Série 8, 12, 10, 14, 16 : moyenne = (8 + 12 + 10 + 14 + 16) ÷ 5 = 12.",
    schema: schemaSerie,
  },
  methode: [
    {
      titre: "La moyenne",
      texte:
        "On additionne toutes les valeurs, puis on divise par le nombre de valeurs.",
    },
    {
      titre: "La médiane",
      texte: "On range les valeurs dans l'ordre : la médiane est la valeur du milieu.",
    },
    {
      titre: "L'étendue",
      texte:
        "On calcule la différence entre la plus grande et la plus petite valeur.",
    },
  ],
  usages: [
    {
      titre: "La moyenne",
      detail: "Elle donne un « niveau général » : elle équilibre toutes les valeurs de la série.",
    },
    {
      titre: "La médiane",
      detail: "C'est la valeur centrale : elle partage la série en deux et résiste aux valeurs extrêmes.",
    },
    {
      titre: "L'étendue",
      detail: "Elle mesure la dispersion : l'écart entre la plus grande et la plus petite valeur.",
    },
  ],
  exemples: [
    {
      titre: "Calculer une moyenne",
      donnees: "Les notes d'un élève sont : 8, 12, 10, 14 et 16.",
      question: "Calculer la moyenne.",
      solution:
        "Moyenne = (8 + 12 + 10 + 14 + 16) ÷ 5 = 60 ÷ 5 = 12.",
    },
    {
      titre: "Médiane et étendue",
      donnees: "On range la série : 8, 10, 12, 14, 16.",
      question: "Donner la médiane et l'étendue.",
      solution:
        "Il y a 5 valeurs : la médiane est celle du milieu, soit 12. Étendue = 16 − 8 = 8.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Calcule la moyenne de 6, 9, 12 et 13.",
      correction: "(6 + 9 + 12 + 13) ÷ 4 = 40 ÷ 4 = 10.",
    },
    {
      question: "Donne la médiane de la série 3, 7, 8, 10, 15.",
      correction: "Il y a 5 valeurs rangées : la médiane est celle du milieu, soit 8.",
    },
    {
      question: "Quelle est l'étendue de la série 4, 9, 15, 7 ?",
      correction: "Plus grande valeur 15, plus petite 4 : étendue = 15 − 4 = 11.",
    },
    {
      question: "Pourquoi range-t-on les valeurs avant de chercher la médiane ?",
      correction:
        "La médiane est la valeur du milieu. Sans ranger la série, on ne peut pas savoir quelle valeur se trouve au centre.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesStatistiques4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Statistiques - 4e",
    section: {
      type: "objectif",
      phrase: "Résumer une série de données",
      sousPhrase: "On utilise trois indicateurs : moyenne, médiane, étendue.",
      encadre: {
        titre: "L'idée",
        texte: "Un seul nombre peut décrire toute une série.",
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
          "Moyenne des notes, températures moyennes, sondages, scores au sport, données des entreprises pour décider.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Statistique » est lié au mot « État » : on comptait la population et les richesses. Les recensements existaient en Égypte et à Rome.",
      },
    },
  },
  {
    titre: "Les 3 indicateurs",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheStatistiques4e.methode.map((m) => ({
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
      phrase: "Moyenne = somme des valeurs ÷ nombre de valeurs",
      sousPhrase: "Médiane = valeur du milieu (série rangée). Étendue = max − min.",
      encadre: {
        titre: "Astuce",
        texte: "On range toujours la série avant de chercher la médiane.",
      },
    },
  },
  {
    titre: "À quoi sert chaque indicateur",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: ficheStatistiques4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Calculer une moyenne",
    section: {
      type: "exemple",
      enonce: "Les notes d'un élève : 8, 12, 10, 14 et 16.",
      question: "Calculer la moyenne.",
      correction: "Moyenne = (8 + 12 + 10 + 14 + 16) ÷ 5 = 60 ÷ 5 = 12.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Médiane et étendue",
    section: {
      type: "exemple",
      enonce: "Série rangée : 8, 10, 12, 14, 16.",
      question: "Donner la médiane et l'étendue.",
      correction: "5 valeurs : médiane = 12 (milieu). Étendue = 16 − 8 = 8.",
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
      enonce: "Série : 3, 7, 8, 10, 15.",
      question: "Donne la médiane.",
      indice: "La médiane est la valeur du milieu (série rangée).",
      correction: "5 valeurs rangées : la médiane est celle du milieu, soit 8.",
    },
  },
];
