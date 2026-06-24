import type { Metadata } from "next";
import FicheCoursIa, { type FicheIaData } from "@/components/fiches/FicheCoursIa";

export const metadata: Metadata = {
  title: "Fiche IA — L'IA incarnée et la robotique",
  description:
    "Percevoir, décider, agir : l'IA incarnée dans les robots. Fiche de cours IA (référentiel Pix, Fondements).",
};

const fiche: FicheIaData = {
  domaineId: "1",
  domaineLabel: "Fondements",
  competence: "1.6",
  titre: "L'IA incarnée et la robotique",
  intro:
    "L'IA n'est pas toujours un logiciel : elle peut être « incarnée » dans un objet physique — un robot — capable de percevoir, décider et agir dans le monde réel.",
  identite: [
    { label: "Prérequis", valeur: "Notion d'IA" },
    { label: "Idée clé", valeur: "Percevoir, décider, agir" },
    { label: "Mot clé", valeur: "IA incarnée" },
  ],
  aQuoiCaSert:
    "Les robots intelligents sont de plus en plus présents : aspirateurs autonomes, voitures, robots d'usine, assistance. Comprendre leurs 3 fonctions aide à saisir ce qu'ils peuvent — et ne peuvent pas — faire.",
  leSavaisTu:
    "Le monde réel est imprévisible : un robot doit réagir vite aux imprévus. C'est bien plus difficile que de calculer dans un logiciel, où tout est « propre » et contrôlé.",
  notions: [
    {
      titre: "Qu'est-ce qu'un robot",
      texte:
        "Un système qui combine trois fonctions : percevoir son environnement, décider, puis agir.",
    },
    {
      titre: "Un robot intelligent",
      texte:
        "Il utilise des modèles d'IA pour comprendre son environnement, s'adapter et améliorer ses gestes.",
    },
    {
      titre: "Le défi du monde réel",
      texte:
        "Le monde réel est incertain et changeant : le robot doit réagir vite et s'adapter aux imprévus.",
    },
  ],
  pointsCles: {
    titre: "Les 3 fonctions d'un robot",
    lignes: [
      { cle: "Percevoir", detail: "Capteurs, caméras, micros…" },
      { cle: "Décider", detail: "Souvent grâce à l'IA." },
      { cle: "Agir", detail: "Moteurs, bras articulés, déplacements." },
      { cle: "Le défi", detail: "S'adapter à un monde réel imprévisible." },
    ],
    callout:
      "On parle d'« IA incarnée » quand l'IA est dans un objet physique qui perçoit et agit dans le monde réel — pas seulement à l'écran.",
  },
  exemples: [
    {
      titre: "Un aspirateur autonome",
      donnees: "Il cartographie la pièce et évite les obstacles.",
      question: "Quelles fonctions utilise-t-il ?",
      solution:
        "Percevoir (ses capteurs), décider (l'IA pour éviter les obstacles) et agir (se déplacer dans la pièce).",
    },
  ],
  pieges: [
    "Croire que tout robot est « intelligent » (certains suivent juste un programme fixe).",
    "Oublier que le monde réel est imprévisible.",
    "Penser qu'un robot ne se trompe jamais.",
  ],
  aRetenir: [
    "Un robot perçoit, décide et agit.",
    "Un robot intelligent utilise l'IA.",
    "L'IA incarnée agit dans le monde réel.",
    "Le monde réel est un défi : il faut s'adapter.",
  ],
  entrainement: [
    {
      question: "Quelles sont les trois grandes fonctions d'un robot ?",
      correction: "Percevoir, décider et agir.",
    },
    {
      question: "Qu'est-ce que l'IA incarnée ?",
      correction: "C'est quand l'IA est dans un objet physique qui perçoit et agit dans le monde réel.",
    },
    {
      question: "Pourquoi est-ce difficile pour un robot d'agir dans le monde réel ?",
      correction: "Parce que le monde réel est changeant, incertain et imprévisible.",
    },
  ],
};

export default function IaIncarneeRobotiquePage() {
  return <FicheCoursIa fiche={fiche} />;
}
