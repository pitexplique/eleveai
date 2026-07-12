// ─── Fiche de cours IA : l'IA incarnée et la robotique (Fondements) ────────────
// Fiche « en blocs » : le contenu vient de l'ancienne ficheRobot
// (lib/fiches-ia.ts, référentiel Pix IA, compétence 1.6), coulé dans le
// schéma FicheCoursData. La « formule » est le cycle percevoir → décider → agir.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

export const ficheIaIncarneeRobotique: FicheCoursData = {
  matiere: "ia",
  matiereLabel: "IA",
  classe: "fondements",
  notion: "ia-incarnee-robotique",
  titre: "L'IA incarnée et la robotique",
  accroche:
    "L'IA n'est pas toujours un logiciel : elle peut être « incarnée » dans un objet physique — un robot — capable de percevoir, décider et agir dans le monde réel.",
  identite: [
    { label: "Prérequis", valeur: "Notion d'IA" },
    { label: "Idée clé", valeur: "Percevoir, décider, agir" },
    { label: "Mot clé", valeur: "IA incarnée" },
  ],
  definition: {
    texte:
      "Un robot est un système qui combine trois fonctions : percevoir son environnement, décider, puis agir. On parle d'« IA incarnée » quand l'IA est dans un objet physique qui perçoit et agit dans le monde réel — pas seulement à l'écran.",
  },
  proprietes: [
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
  reel: {
    texte:
      "Les robots intelligents sont de plus en plus présents : aspirateurs autonomes, voitures, robots d'usine, assistance. Comprendre leurs 3 fonctions aide à saisir ce qu'ils peuvent — et ne peuvent pas — faire. Le monde réel est imprévisible : un robot doit réagir vite aux imprévus. C'est bien plus difficile que de calculer dans un logiciel, où tout est « propre » et contrôlé.",
  },
  historique: {
    texte:
      "Le mot « robot » apparaît en 1920 dans une pièce de théâtre de l'écrivain tchèque Karel Capek. Le premier robot industriel, Unimate, entre dans une usine automobile en 1961. Depuis les années 2000, l'IA embarquée permet aux robots de s'adapter au monde réel : aspirateurs autonomes, voitures, robots d'assistance.",
  },
  formule: {
    contexte: "Le cycle d'un robot",
    expression: "percevoir → décider → agir",
    legende:
      "Percevoir avec des capteurs, décider (souvent grâce à l'IA), agir avec des moteurs.",
  },
  methode: [
    {
      titre: "Percevoir",
      texte: "Capteurs, caméras, micros… le robot capte son environnement.",
    },
    {
      titre: "Décider",
      texte: "Souvent grâce à l'IA : le robot choisit quoi faire à partir de ce qu'il perçoit.",
    },
    {
      titre: "Agir",
      texte: "Moteurs, bras articulés, déplacements : le robot agit dans le monde réel.",
    },
  ],
  usages: [
    {
      titre: "À la maison",
      detail: "Aspirateurs autonomes qui cartographient la pièce et évitent les obstacles.",
    },
    {
      titre: "Sur la route",
      detail: "Voitures qui perçoivent la circulation et adaptent leur conduite.",
    },
    {
      titre: "À l'usine et en assistance",
      detail: "Robots d'usine qui répètent des gestes précis, robots d'assistance aux personnes.",
    },
  ],
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
      correction:
        "C'est quand l'IA est dans un objet physique qui perçoit et agit dans le monde réel.",
    },
    {
      question: "Pourquoi est-ce difficile pour un robot d'agir dans le monde réel ?",
      correction: "Parce que le monde réel est changeant, incertain et imprévisible.",
    },
  ],
  coachHref: "/coach-ia/ia",
};

export const slidesIaIncarneeRobotique: ClasseSlide[] = [];
