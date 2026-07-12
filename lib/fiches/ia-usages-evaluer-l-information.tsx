// ─── Fiche de cours IA : évaluer l'information à l'ère de l'IA (Usages) ────────
// Fiche « en blocs » : le contenu vient de l'ancienne ficheEvaluer
// (lib/fiches-ia.ts, référentiel Pix IA, compétence 2.3), coulé dans le
// schéma FicheCoursData. La « formule » ici est la règle d'or du recoupement.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

export const ficheEvaluerLInformation: FicheCoursData = {
  matiere: "ia",
  matiereLabel: "IA",
  classe: "usages",
  notion: "evaluer-l-information",
  titre: "Évaluer l'information à l'ère de l'IA",
  accroche:
    "Les IA génératives produisent facilement de fausses images et vidéos (les hypertrucages). Savoir vérifier l'information est devenu essentiel.",
  identite: [
    { label: "Prérequis", valeur: "Esprit critique" },
    { label: "Idée clé", valeur: "Vérifier avant de croire" },
    { label: "Mot clé", valeur: "Hypertrucage (deepfake)" },
  ],
  definition: {
    texte:
      "Évaluer l'information, c'est vérifier avant d'y croire ou de la partager : identifier l'auteur d'un contenu et ses intentions, retrouver son origine, et recouper l'information avec plusieurs sources fiables. Ce réflexe est devenu essentiel depuis que l'IA générative fabrique des contenus truqués très réalistes.",
  },
  proprietes: [
    {
      titre: "Les hypertrucages",
      texte:
        "Des contenus (photos, vidéos) truqués avec l'IA, très réalistes, qui imitent des personnes réelles.",
    },
    {
      titre: "Bots & amplification",
      texte:
        "De faux contenus diffusés en masse par des robots, puis mis en avant par les algorithmes de recommandation.",
    },
    {
      titre: "Vérifier",
      texte:
        "Chercher qui est l'auteur, quelles sont ses intentions, et recouper l'information avec plusieurs sources.",
    },
    {
      titre: "La mention « créé avec l'IA »",
      texte:
        "Une mention « créé avec l'IA » t'invite à regarder le contenu avec esprit critique — pas à le croire ni à paniquer.",
    },
  ],
  reel: {
    texte:
      "Pour ne pas se faire piéger ni propager de fausses infos : reconnaître un contenu truqué, retrouver sa source et recouper avec d'autres sources fiables. Aujourd'hui, une photo et quelques phrases suffisent pour fabriquer une fausse vidéo d'une personne disant ce qu'elle n'a jamais dit — souvent indétectable à l'œil nu.",
  },
  historique: {
    texte:
      "Le mot « deepfake » apparaît fin 2017 sur un forum en ligne, pour désigner des vidéos truquées par apprentissage profond. En 2018, une fausse vidéo de Barack Obama, réalisée pour alerter le public, fait le tour du monde. Depuis 2022, les générateurs d'images grand public ont mis ces trucages à la portée de tous.",
  },
  formule: {
    contexte: "Face à une info virale",
    expression: "Croiser au moins deux sources fiables",
    legende:
      "Avant de croire ou de partager : qui publie, d'où vient l'info, qui d'autre la confirme.",
  },
  methode: [
    {
      titre: "Auteur",
      texte: "Qui publie, et pourquoi ?",
    },
    {
      titre: "Source",
      texte: "Retrouver l'origine de l'information.",
    },
    {
      titre: "Recouper",
      texte: "Est-elle présente dans plusieurs sources fiables ?",
    },
    {
      titre: "Signaler",
      texte: "Signaler un contenu truqué sur la plateforme.",
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Une vidéo choc",
      donnees: "Une vidéo très partagée d'une personnalité connue.",
      question: "Quel est le bon réflexe ?",
      solution:
        "Vérifier l'information auprès de plusieurs sources fiables avant d'y croire ou de la partager.",
    },
  ],
  pieges: [
    "Croire un contenu juste parce qu'il a l'air réaliste.",
    "Partager avant d'avoir vérifié.",
    "Penser que beaucoup de partages = information vraie.",
  ],
  aRetenir: [
    "Les hypertrucages sont faciles à produire et très réalistes.",
    "On vérifie l'auteur et on recoupe les sources.",
    "Le nombre de partages ne prouve rien.",
    "On peut signaler un contenu truqué.",
  ],
  entrainement: [
    {
      question: "Qu'est-ce qu'un hypertrucage (deepfake) ?",
      correction:
        "Un contenu (photo ou vidéo) truqué avec l'IA, qui imite une personne réelle.",
    },
    {
      question: "Comment vérifier une information trouvée en ligne ?",
      correction:
        "Retrouver l'auteur et ses intentions, puis recouper avec plusieurs sources fiables.",
    },
    {
      question: "Pourquoi de faux contenus se diffusent-ils parfois très vite ?",
      correction:
        "Parce que les algorithmes de recommandation favorisent les contenus qui font le plus réagir.",
    },
  ],
  coachHref: "/coach-ia/ia",
};

export const slidesEvaluerLInformation: ClasseSlide[] = [];
