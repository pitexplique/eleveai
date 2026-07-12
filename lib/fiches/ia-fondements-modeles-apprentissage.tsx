// ─── Fiche de cours IA : les modèles d'apprentissage (Fondements 1.3) ──────────
// Fiche IA coulée dans le moule « en blocs » : contenu repris verbatim de
// l'ancienne ficheModeles (lib/fiches-ia.ts), remappé sur le schéma canonique.
// Pas de formule (fiche IA) ni de mode classe pour l'instant.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

export const ficheModelesApprentissage: FicheCoursData = {
  matiere: "ia",
  matiereLabel: "IA",
  classe: "fondements",
  notion: "modeles-apprentissage",
  titre: "Les modèles d'apprentissage",
  accroche:
    "Un modèle d'IA est une structure mathématique qui apprend à partir de données. Il en existe plusieurs familles, plus ou moins simples à comprendre.",
  identite: [
    { label: "Prérequis", valeur: "Apprentissage automatique" },
    { label: "Idée clé", valeur: "Plusieurs familles de modèles" },
    { label: "Mot clé", valeur: "Réseau de neurones" },
  ],
  definition: {
    texte:
      "Un modèle d'apprentissage est une structure mathématique qui, entraînée sur des données, apprend à réaliser une tâche : classer, prédire une valeur ou prendre une décision.",
  },
  proprietes: [
    {
      titre: "Arbre de décision",
      texte:
        "Une suite de questions oui/non qui mène à une conclusion. Très intuitif et facile à lire.",
    },
    {
      titre: "Régression",
      texte:
        "Prédire une valeur à partir d'autres valeurs observées : par exemple estimer un prix à partir d'une caractéristique.",
    },
    {
      titre: "Réseau de neurones",
      texte:
        "De nombreuses unités organisées en couches. Très puissant pour images, sons et textes, mais peu lisible.",
    },
    {
      titre: "L'explicabilité",
      texte:
        "Un modèle « explicable » permet de comprendre pourquoi il a décidé — c'est essentiel dans des domaines sensibles comme la santé ou la justice.",
    },
  ],
  reel: {
    texte:
      "Selon le problème, on choisit un modèle différent. Comprendre leurs forces et leurs limites aide à juger ce qu'une IA peut faire — et à quel point on peut lui faire confiance.",
  },
  historique: {
    texte:
      "Le premier neurone artificiel est un modèle mathématique proposé en 1943 par McCulloch et Pitts, suivi du perceptron de Rosenblatt en 1958. Les réseaux de neurones sont inspirés (de loin !) du cerveau, mais leur fonctionnement interne est si complexe qu'on les appelle parfois des « boîtes noires ». Depuis 2012, ils dominent la reconnaissance d'images, de sons et de textes.",
  },
  methode: [],
  usages: [
    {
      titre: "Arbre de décision",
      detail: "Questions oui/non successives ; intuitif.",
    },
    {
      titre: "Régression",
      detail: "Prédire une valeur à partir de variables observées.",
    },
    {
      titre: "Réseau de neurones",
      detail: "Unités en couches ; puissant mais « boîte noire ».",
    },
    {
      titre: "Explicabilité",
      detail: "Plus un modèle est complexe, plus il est dur à expliquer.",
    },
  ],
  exemples: [
    {
      titre: "Prédire un prix",
      donnees: "Estimer le prix d'un vélo d'occasion selon son âge.",
      question: "Quel type de modèle ?",
      solution:
        "Une régression : on prédit une valeur (le prix) à partir d'une variable observée (l'âge).",
    },
  ],
  pieges: [
    "Croire qu'un réseau de neurones contient de vrais neurones.",
    "Penser qu'un modèle puissant est forcément le meilleur (il est souvent moins lisible).",
    "Oublier que la « boîte noire » rend une erreur difficile à expliquer.",
  ],
  aRetenir: [
    "Arbre de décision = questions oui/non, facile à lire.",
    "Régression = prédire une valeur.",
    "Réseau de neurones = puissant mais peu explicable.",
    "Le bon modèle dépend du problème et des données.",
  ],
  entrainement: [
    {
      question: "Pourquoi parle-t-on de « boîte noire » pour un réseau de neurones ?",
      correction:
        "Parce qu'il est difficile d'expliquer comment il arrive à son résultat.",
    },
    {
      question: "Quel modèle utiliser pour prédire une valeur numérique ?",
      correction: "Une régression.",
    },
    {
      question: "Comment un arbre de décision prend-il une décision ?",
      correction:
        "En répondant à une suite de questions (oui/non) jusqu'à une conclusion.",
    },
  ],
  coachHref: "/coach-ia/ia",
};

export const slidesModelesApprentissage: ClasseSlide[] = [];
