import type { Metadata } from "next";
import FicheCoursIa, { type FicheIaData } from "@/components/fiches/FicheCoursIa";

export const metadata: Metadata = {
  title: "Fiche IA — Évaluer l'information à l'ère de l'IA",
  description:
    "Hypertrucages, bots, vérification des sources. Fiche de cours IA (référentiel Pix, Usages).",
};

const fiche: FicheIaData = {
  domaineId: "2",
  domaineLabel: "Usages",
  competence: "2.3",
  titre: "Évaluer l'information à l'ère de l'IA",
  intro:
    "Les IA génératives produisent facilement de fausses images et vidéos (les hypertrucages). Savoir vérifier l'information est devenu essentiel.",
  identite: [
    { label: "Prérequis", valeur: "Esprit critique" },
    { label: "Idée clé", valeur: "Vérifier avant de croire" },
    { label: "Mot clé", valeur: "Hypertrucage (deepfake)" },
  ],
  aQuoiCaSert:
    "Pour ne pas se faire piéger ni propager de fausses infos : reconnaître un contenu truqué, retrouver sa source et recouper avec d'autres sources fiables.",
  leSavaisTu:
    "Aujourd'hui, une photo et quelques phrases suffisent pour fabriquer une fausse vidéo d'une personne disant ce qu'elle n'a jamais dit. C'est souvent indétectable à l'œil nu.",
  notions: [
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
  ],
  pointsCles: {
    titre: "Vérifier l'information",
    lignes: [
      { cle: "Auteur", detail: "Qui publie, et pourquoi ?" },
      { cle: "Source", detail: "Retrouver l'origine de l'information." },
      { cle: "Recouper", detail: "Est-elle présente dans plusieurs sources fiables ?" },
      { cle: "Signaler", detail: "Signaler un contenu truqué sur la plateforme." },
    ],
    callout:
      "Une mention « créé avec l'IA » t'invite à regarder le contenu avec esprit critique — pas à le croire ni à paniquer.",
  },
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
      correction: "Un contenu (photo ou vidéo) truqué avec l'IA, qui imite une personne réelle.",
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
};

export default function EvaluerInformationPage() {
  return <FicheCoursIa fiche={fiche} />;
}
