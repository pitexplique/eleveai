// ─── Fiche de cours : la proportionnalité (6e) ─────────────────────────────────
// Fiche « en blocs » : toute la matière de la page vit ici, la page et les
// flashcards ne font que la rendre. Contenu repris de l'ancienne page écrite
// à la main, enrichi des blocs Définition et Propriétés (format canonique
// réclamé par les profs).

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

const pieges = [
  "Croire qu'ajouter le même nombre suffit : c'est multiplier, pas additionner.",
  "Oublier de revenir à l'unité avant de multiplier.",
  "Mélanger les deux lignes du tableau (quantité et prix).",
];

const aRetenir = [
  "Proportionnel signifie : on multiplie toujours par le même nombre.",
  "Le passage à l'unité est la méthode la plus simple en 6e.",
  "Une addition identique ne prouve pas une proportionnalité.",
];

export const ficheProportionnalite6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "prop-proportionnalite",
  titre: "La proportionnalité",
  accroche:
    "Une situation est proportionnelle quand on passe d'une grandeur à l'autre en multipliant toujours par le même nombre.",
  identite: [
    { label: "Prérequis", valeur: "Multiplication, division" },
    { label: "Méthode clé", valeur: "Passage par l'unité" },
    { label: "Astuce", valeur: "Toujours x le même nombre" },
  ],
  definition: {
    texte:
      "Deux grandeurs sont proportionnelles quand on passe des valeurs de l'une aux valeurs de l'autre en multipliant toujours par le même nombre. Ce nombre s'appelle le coefficient de proportionnalité.",
  },
  proprietes: [
    {
      titre: "Le coefficient de proportionnalité",
      texte:
        "Dans un tableau de proportionnalité, on passe de la première ligne à la deuxième en multipliant toujours par le même nombre : le coefficient. Exemple : 1 cahier coûte 2 euros, le coefficient est 2.",
    },
    {
      titre: "L'additivité (linéarité)",
      texte:
        "On peut ajouter deux colonnes d'un tableau de proportionnalité : si 2 stylos coûtent 4 euros et 3 stylos coûtent 6 euros, alors 5 stylos coûtent 4 + 6 = 10 euros.",
    },
    {
      titre: "Le passage par l'unité",
      texte:
        "En cherchant d'abord la valeur pour 1 unité, on peut calculer la valeur pour n'importe quelle quantité : il suffit de multiplier.",
    },
  ],
  reel: {
    texte:
      "La proportionnalité est partout : recettes de cuisine, échelles des cartes et des plans, conversions, prix au kilo, vitesse, ou encore les mélanges (sirop, peinture).",
  },
  historique: {
    texte:
      "On utilise les proportions depuis l'Antiquité. Les Égyptiens et les Grecs s'en servaient pour leurs plans de construction et pour le commerce. La fameuse « règle de trois » est enseignée depuis des siècles.",
  },
  formule: {
    contexte: "Tableau de proportionnalité",
    expression: "valeur d'arrivée = coefficient x valeur de départ",
    legende:
      "Exemple : 1 cahier coûte 2 euros, le coefficient est 2 — donc 3 cahiers coûtent 6 euros et 5 cahiers coûtent 10 euros.",
  },
  methode: [
    {
      titre: "Étape 1",
      texte:
        "Lire les deux grandeurs : nombre d'objets, prix, masse, distance, durée...",
    },
    {
      titre: "Étape 2",
      texte: "Trouver le prix, la masse ou la distance pour 1 unité.",
    },
    {
      titre: "Étape 3",
      texte: "Multiplier cette valeur par la quantité demandée.",
    },
  ],
  usages: [
    {
      titre: "Reconnaître",
      detail:
        "Si on double une quantité, l'autre double aussi. Si on triple, l'autre triple aussi.",
    },
    {
      titre: "Revenir à l'unité",
      detail:
        "On cherche la valeur pour 1, puis on multiplie par la quantité demandée.",
    },
    {
      titre: "Vérifier",
      detail:
        "On vérifie que le même multiplicateur fonctionne dans tout le tableau.",
    },
  ],
  exemples: [
    {
      titre: "Prix de cahiers",
      donnees: "3 cahiers coûtent 6 euros.",
      question: "Combien coûtent 5 cahiers ?",
      solution:
        "1 cahier coûte 2 euros, donc 5 cahiers coûtent 5 x 2 = 10 euros.",
    },
    {
      titre: "Recette",
      donnees: "Pour 4 personnes, il faut 200 g de riz.",
      question: "Combien faut-il de riz pour 6 personnes ?",
      solution:
        "1 personne correspond à 50 g, donc 6 personnes correspondent à 6 x 50 = 300 g.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "2 stylos coûtent 4 euros. Combien coûtent 7 stylos ?",
      correction:
        "1 stylo coûte 4 / 2 = 2 euros, donc 7 stylos coûtent 7 x 2 = 14 euros.",
    },
    {
      question: "5 tickets coûtent 15 euros. Combien coûtent 3 tickets ?",
      correction:
        "1 ticket coûte 15 / 5 = 3 euros, donc 3 tickets coûtent 3 x 3 = 9 euros.",
    },
    {
      question:
        "Pour 10 crêpes, il faut 250 g de farine. Combien faut-il pour 20 crêpes ?",
      correction:
        "20 crêpes, c'est 2 x 10 crêpes, donc il faut 2 x 250 = 500 g de farine.",
    },
    {
      question:
        "Un cycliste parcourt 12 km en 30 min à vitesse régulière. Quelle distance parcourt-il en 1 h ?",
      correction: "1 h = 2 x 30 min, donc il parcourt 2 x 12 = 24 km.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesProportionnalite6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Proportionnalité - 6e",
    section: {
      type: "objectif",
      phrase: "Reconnaître une situation proportionnelle",
      sousPhrase:
        "On vérifie si les deux grandeurs changent toujours avec le même multiplicateur.",
      encadre: {
        titre: "Question à poser",
        texte: "Si je multiplie une ligne, est-ce que l'autre est multipliée pareil ?",
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
          "Recettes de cuisine, échelles des cartes et des plans, conversions, prix au kilo, vitesse, mélanges (sirop, peinture).",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "On utilise les proportions depuis l'Antiquité. La fameuse « règle de trois » est enseignée depuis des siècles.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheProportionnalite6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "La méthode au tableau",
    badge: "Passage par l'unité",
    section: {
      type: "etapes",
      etapes: ficheProportionnalite6e.methode.map((m) => m.texte),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Prix de cahiers",
    section: {
      type: "exemple",
      enonce: "3 cahiers coûtent 6 euros.",
      question: "Combien coûtent 5 cahiers ?",
      correction: "1 cahier = 2 euros, donc 5 cahiers = 10 euros.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Recette",
    section: {
      type: "exemple",
      enonce: "Pour 4 personnes, il faut 200 g de riz.",
      question: "Combien faut-il de riz pour 6 personnes ?",
      correction: "1 personne = 50 g, donc 6 personnes = 6 x 50 = 300 g.",
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
      enonce: "2 stylos coûtent 4 euros.",
      question: "Combien coûtent 7 stylos ?",
      indice: "Cherche d'abord le prix d'un stylo.",
      correction: "1 stylo = 2 euros, donc 7 stylos = 14 euros.",
    },
  },
];
