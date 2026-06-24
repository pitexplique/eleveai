import type { Metadata } from "next";
import FicheCoursIa, { type FicheIaData } from "@/components/fiches/FicheCoursIa";

export const metadata: Metadata = {
  title: "Fiche IA — Utiliser les services de recommandation",
  description:
    "Avantages, limites et contrôle de la personnalisation. Fiche de cours IA (référentiel Pix, Usages).",
};

const fiche: FicheIaData = {
  domaineId: "2",
  domaineLabel: "Usages",
  competence: "2.4",
  titre: "Utiliser les services de recommandation",
  intro:
    "Vidéos, réseaux sociaux, achats en ligne : ces services s'adaptent à toi. C'est pratique, mais il faut savoir garder le contrôle.",
  identite: [
    { label: "Prérequis", valeur: "Algorithmes de recommandation" },
    { label: "Idée clé", valeur: "Pratique mais à surveiller" },
    { label: "Réflexe", valeur: "Diversifier ses sources" },
  ],
  aQuoiCaSert:
    "Profiter des avantages (gagner du temps, découvrir des contenus) tout en évitant les pièges (enfermement, perte de diversité des points de vue).",
  leSavaisTu:
    "Beaucoup de plateformes permettent de consulter et de modifier ton historique et tes préférences — mais ces options sont souvent bien cachées dans les paramètres.",
  notions: [
    {
      titre: "Les avantages",
      texte:
        "Un filtrage personnalisé dans une offre énorme : tu gagnes du temps et tu découvres de nouveaux contenus.",
    },
    {
      titre: "Les limites",
      texte:
        "L'enfermement algorithmique et la « chambre d'écho » : tu vois surtout ce qui te ressemble déjà.",
    },
    {
      titre: "Garder le contrôle",
      texte:
        "Régler ses paramètres, gérer son historique, et explorer volontairement d'autres sources.",
    },
  ],
  pointsCles: {
    titre: "Avantages & vigilance",
    lignes: [
      { cle: "Avantage", detail: "Trouver plus vite ce qui t'intéresse." },
      { cle: "Limite", detail: "Ne plus voir d'idées différentes des tiennes." },
      { cle: "Paramètres", detail: "Gérer historique et préférences." },
      { cle: "Curiosité", detail: "Explorer d'autres sources volontairement." },
    ],
    callout:
      "Adopter une posture de curiosité : aller chercher par soi-même, au lieu de seulement suivre ce qui est proposé automatiquement.",
  },
  exemples: [
    {
      titre: "Sortir de la bulle",
      donnees: "Tu vois toujours les mêmes opinions sur ton fil.",
      question: "Que faire ?",
      solution:
        "Diversifier tes sources, suivre des comptes variés, et nettoyer ton historique dans les paramètres.",
    },
  ],
  pieges: [
    "Ne suivre qu'une seule source d'information.",
    "Croire que tout ce qui est proposé est neutre.",
    "Oublier qu'on peut régler les paramètres.",
  ],
  aRetenir: [
    "La personnalisation a des avantages et des limites.",
    "Risque : enfermement et chambre d'écho.",
    "On peut régler historique et préférences.",
    "Diversifier ses sources est essentiel.",
  ],
  entrainement: [
    {
      question: "Cite un avantage de la personnalisation des contenus.",
      correction: "Gagner du temps en trouvant plus vite ce qui t'intéresse.",
    },
    {
      question: "Cite un inconvénient de la personnalisation.",
      correction: "Ne plus être exposé à des idées ou contenus différents des siens.",
    },
    {
      question: "Comment garder un peu de contrôle sur tes recommandations ?",
      correction: "Consulter et modifier son historique et ses préférences dans les paramètres.",
    },
  ],
};

export default function ServicesDeRecommandationPage() {
  return <FicheCoursIa fiche={fiche} />;
}
