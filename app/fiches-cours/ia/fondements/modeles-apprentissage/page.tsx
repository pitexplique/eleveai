import type { Metadata } from "next";
import FicheCoursIa, { type FicheIaData } from "@/components/fiches/FicheCoursIa";

export const metadata: Metadata = {
  title: "Fiche IA — Les modèles d'apprentissage",
  description:
    "Arbre de décision, régression, réseau de neurones : les familles de modèles d'IA. Fiche de cours IA (référentiel Pix, Fondements).",
};

export const fiche: FicheIaData = {
  domaineId: "1",
  domaineLabel: "Fondements",
  competence: "1.3",
  titre: "Les modèles d'apprentissage",
  intro:
    "Un modèle d'IA est une structure mathématique qui apprend à partir de données. Il en existe plusieurs familles, plus ou moins simples à comprendre.",
  identite: [
    { label: "Prérequis", valeur: "Apprentissage automatique" },
    { label: "Idée clé", valeur: "Plusieurs familles de modèles" },
    { label: "Mot clé", valeur: "Réseau de neurones" },
  ],
  aQuoiCaSert:
    "Selon le problème, on choisit un modèle différent. Comprendre leurs forces et leurs limites aide à juger ce qu'une IA peut faire — et à quel point on peut lui faire confiance.",
  leSavaisTu:
    "Les réseaux de neurones sont inspirés (de loin !) du cerveau. Mais leur fonctionnement interne est si complexe qu'on les appelle parfois des « boîtes noires ».",
  notions: [
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
  ],
  pointsCles: {
    titre: "Trois familles de modèles",
    lignes: [
      { cle: "Arbre de décision", detail: "Questions oui/non successives ; intuitif." },
      { cle: "Régression", detail: "Prédire une valeur à partir de variables observées." },
      { cle: "Réseau de neurones", detail: "Unités en couches ; puissant mais « boîte noire »." },
      { cle: "Explicabilité", detail: "Plus un modèle est complexe, plus il est dur à expliquer." },
    ],
    callout:
      "Un modèle « explicable » permet de comprendre POURQUOI il a décidé — c'est essentiel dans des domaines sensibles comme la santé ou la justice.",
  },
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
      correction: "Parce qu'il est difficile d'expliquer comment il arrive à son résultat.",
    },
    {
      question: "Quel modèle utiliser pour prédire une valeur numérique ?",
      correction: "Une régression.",
    },
    {
      question: "Comment un arbre de décision prend-il une décision ?",
      correction: "En répondant à une suite de questions (oui/non) jusqu'à une conclusion.",
    },
  ],
};

export default function ModelesApprentissagePage() {
  return <FicheCoursIa fiche={fiche} />;
}
