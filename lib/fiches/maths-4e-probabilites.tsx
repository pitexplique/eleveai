// ─── Fiche de cours : les probabilités (4e) ────────────────────────────────────
// Fiche « en blocs » : toute la matière de la page vit ici, la page et les
// flashcards ne font que la rendre. Contenu repris de l'ancienne page écrite
// à la main, enrichi des blocs Définition et Propriétés (format canonique
// réclamé par les profs).

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

const pieges = [
  "Oublier de compter toutes les issues possibles.",
  "Donner une probabilité plus grande que 1 : c'est impossible.",
  "Confondre le nombre de cas favorables et la probabilité.",
];

const aRetenir = [
  "p = nombre de cas favorables ÷ nombre de cas possibles.",
  "Une probabilité est toujours comprise entre 0 et 1.",
  "Équiprobable : toutes les issues ont la même chance.",
];

const schemaEchelle = (
  <svg
    viewBox="0 0 320 120"
    className="h-auto w-full"
    role="img"
    aria-label="Échelle de probabilité de 0 (impossible) à 1 (certain)"
  >
    <line x1="30" y1="50" x2="300" y2="50" stroke="#d946ef" strokeWidth="6" strokeLinecap="round" />
    <line x1="30" y1="40" x2="30" y2="60" stroke="#0f172a" strokeWidth="2.5" />
    <line x1="165" y1="40" x2="165" y2="60" stroke="#0f172a" strokeWidth="2.5" />
    <line x1="300" y1="40" x2="300" y2="60" stroke="#0f172a" strokeWidth="2.5" />
    <circle cx="75" cy="50" r="6" fill="#a21caf" />
    <text x="75" y="34" fill="#a21caf" fontSize="13" fontWeight="800" textAnchor="middle">1/6</text>
    <text x="30" y="80" fill="#0f172a" fontSize="14" fontWeight="800" textAnchor="middle">0</text>
    <text x="165" y="80" fill="#0f172a" fontSize="14" fontWeight="800" textAnchor="middle">1/2</text>
    <text x="300" y="80" fill="#0f172a" fontSize="14" fontWeight="800" textAnchor="middle">1</text>
    <text x="14" y="100" fill="#64748b" fontSize="12" fontWeight="700" textAnchor="start">impossible</text>
    <text x="308" y="100" fill="#64748b" fontSize="12" fontWeight="700" textAnchor="end">certain</text>
  </svg>
);

export const ficheProbabilites4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "proba-experience",
  titre: "Les probabilités",
  accroche:
    "Une probabilité mesure la chance qu'un événement se produise. Elle est comprise entre 0 (impossible) et 1 (certain).",
  identite: [
    { label: "Prérequis", valeur: "Fractions, dénombrer des cas" },
    { label: "Formule clé", valeur: "p = favorables / possibles" },
    { label: "Échelle", valeur: "Toujours entre 0 et 1" },
  ],
  definition: {
    texte:
      "Dans une situation d'équiprobabilité, c'est-à-dire quand toutes les issues d'une expérience aléatoire ont la même chance de se produire, la probabilité d'un événement est le quotient du nombre d'issues favorables à cet événement par le nombre total d'issues possibles.",
  },
  proprietes: [
    {
      titre: "Entre 0 et 1",
      texte:
        "Une probabilité est toujours comprise entre 0 et 1 : 0 pour un événement impossible, 1 pour un événement certain.",
    },
    {
      titre: "La somme fait 1",
      texte:
        "La somme des probabilités de toutes les issues d'une expérience aléatoire est égale à 1.",
    },
    {
      titre: "Événement contraire",
      texte:
        "La probabilité de l'événement contraire (« l'événement ne se produit pas ») vaut 1 − p. Exemple : si p(obtenir un 4) = 1/6, alors p(ne pas obtenir un 4) = 5/6.",
    },
  ],
  reel: {
    texte:
      "Les probabilités sont partout : jeux de hasard (dés, cartes, loto), prévisions météo (« 70 % de pluie »), assurances, sport (chances de gagner), et même en médecine pour évaluer des risques.",
  },
  historique: {
    texte:
      "La théorie des probabilités est née au XVIIᵉ siècle d'une correspondance entre deux mathématiciens français, Blaise Pascal et Pierre de Fermat, qui cherchaient à résoudre des problèmes de jeux de dés.",
  },
  formule: {
    contexte: "Pour un événement (situation d'équiprobabilité)",
    expression: "P(événement) = nombre d'issues favorables ÷ nombre d'issues possibles",
    legende: "Exemple : un 4 au dé → 1 favorable sur 6 = 1/6.",
    schema: schemaEchelle,
  },
  methode: [
    {
      titre: "Cas possibles",
      texte: "On compte toutes les issues possibles de l'expérience.",
    },
    {
      titre: "Cas favorables",
      texte: "On compte les issues qui réalisent l'événement cherché.",
    },
    {
      titre: "Calculer",
      texte: "On divise : p = favorables ÷ possibles, puis on simplifie.",
    },
  ],
  usages: [
    {
      titre: "Équiprobabilité",
      detail:
        "Quand toutes les issues ont la même chance (dé équilibré, pièce), il suffit de compter les cas.",
    },
    {
      titre: "Événement contraire",
      detail: "La probabilité de l'événement contraire vaut 1 − p.",
    },
    {
      titre: "Comparer",
      detail:
        "Entre deux événements, le plus probable est celui dont la probabilité est la plus grande.",
    },
  ],
  exemples: [
    {
      titre: "Obtenir un nombre précis",
      donnees: "On lance un dé équilibré à 6 faces.",
      question: "Quelle est la probabilité d'obtenir un 4 ?",
      solution:
        "Il y a 6 issues possibles et 1 seule favorable (le 4). p = 1/6.",
    },
    {
      titre: "Obtenir un nombre pair",
      donnees: "On lance le même dé à 6 faces.",
      question: "Quelle est la probabilité d'obtenir un nombre pair ?",
      solution: "Les favorables sont 2, 4 et 6 : 3 cas sur 6. p = 3/6 = 1/2.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "On lance un dé équilibré. Quelle est la probabilité d'obtenir 5 ?",
      correction: "1 cas favorable sur 6 possibles : p = 1/6.",
    },
    {
      question:
        "Un sac contient 3 billes rouges et 2 bleues. Quelle est la probabilité de tirer une rouge ?",
      correction: "3 cas favorables sur 5 possibles : p = 3/5.",
    },
    {
      question:
        "Avec un dé, quelle est la probabilité d'obtenir un nombre strictement supérieur à 4 ?",
      correction: "Favorables : 5 et 6, soit 2 cas sur 6. p = 2/6 = 1/3.",
    },
    {
      question: "Une probabilité peut-elle valoir 1,5 ? Pourquoi ?",
      correction:
        "Non. Une probabilité est toujours comprise entre 0 (impossible) et 1 (certain).",
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesProbabilites4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Probabilités - 4e",
    section: {
      type: "objectif",
      phrase: "Mesurer la chance qu'un événement se produise",
      sousPhrase:
        "Une probabilité est comprise entre 0 (impossible) et 1 (certain).",
      encadre: {
        titre: "L'idée",
        texte: "On compte les cas favorables parmi tous les cas possibles.",
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
          "Jeux de hasard (dés, cartes, loto), météo (« 70 % de pluie »), assurances, sport, médecine pour évaluer des risques.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "La théorie des probabilités est née au XVIIe siècle d'une correspondance entre Blaise Pascal et Pierre de Fermat sur les jeux de dés.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheProbabilites4e.methode.map((m) => ({
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
      phrase: "p = favorables / possibles",
      sousPhrase: "Une probabilité est toujours comprise entre 0 et 1.",
      encadre: {
        titre: "Équiprobable",
        texte: "Quand chaque issue a la même chance, il suffit de compter.",
      },
    },
  },
  {
    titre: "3 réflexes utiles",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: ficheProbabilites4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Obtenir un nombre précis",
    section: {
      type: "exemple",
      enonce: "On lance un dé équilibré à 6 faces.",
      question: "Probabilité d'obtenir un 4 ?",
      correction: "6 issues possibles, 1 seule favorable (le 4). p = 1/6.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Obtenir un nombre pair",
    section: {
      type: "exemple",
      enonce: "On lance le même dé à 6 faces.",
      question: "Probabilité d'un nombre pair ?",
      correction: "Favorables : 2, 4 et 6, soit 3 cas sur 6. p = 3/6 = 1/2.",
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
      enonce: "Un sac contient 3 billes rouges et 2 bleues.",
      question: "Probabilité de tirer une rouge ?",
      indice: "p = cas favorables / cas possibles.",
      correction: "3 cas favorables sur 5 possibles : p = 3/5.",
    },
  },
];
