import type { Metadata } from "next";
import FicheCoursIa, { type FicheIaData } from "@/components/fiches/FicheCoursIa";

export const metadata: Metadata = {
  title: "Fiche IA — IA, emploi et formation",
  description:
    "Métiers qui changent, nouveaux métiers, travailleurs du clic. Fiche de cours IA (référentiel Pix, Enjeux).",
};

const fiche: FicheIaData = {
  domaineId: "3",
  domaineLabel: "Enjeux",
  competence: "3.4",
  titre: "IA, emploi et formation",
  intro:
    "L'IA transforme le travail : certaines tâches disparaissent, d'autres apparaissent. Cela change les compétences attendues dans presque tous les métiers.",
  identite: [
    { label: "Prérequis", valeur: "Notion de métier" },
    { label: "Idée clé", valeur: "Le travail se transforme" },
    { label: "À noter", valeur: "Les travailleurs du clic" },
  ],
  aQuoiCaSert:
    "Comprendre l'impact de l'IA sur les métiers aide à se projeter : se former, s'adapter, et repérer les nouveaux emplois qui apparaissent.",
  leSavaisTu:
    "Derrière les IA, il y a beaucoup de travail humain peu visible : des personnes étiquettent les données et modèrent les contenus — les « travailleurs du clic », souvent mal payés.",
  notions: [
    {
      titre: "Des tâches automatisées",
      texte:
        "L'IA prend en charge des tâches répétitives : certains métiers se transforment ou disparaissent.",
    },
    {
      titre: "De nouveaux métiers",
      texte:
        "Des fonctions apparaissent autour de la conception, la supervision et l'analyse de l'IA.",
    },
    {
      titre: "Le travail caché",
      texte:
        "L'entraînement et la modération reposent sur des humains : les travailleurs du clic.",
    },
  ],
  pointsCles: {
    titre: "L'essentiel",
    lignes: [
      { cle: "Automatisation", detail: "Des tâches répétitives prises en charge." },
      { cle: "Transformation", detail: "Des métiers changent ou disparaissent." },
      { cle: "Nouveaux métiers", detail: "Conception, supervision, analyse de l'IA." },
      { cle: "Formation", detail: "Se former tout au long de la vie." },
    ],
    callout:
      "La question n'est pas seulement « combien d'emplois supprimés ? », mais « comment le travail et les compétences se déplacent ».",
  },
  exemples: [
    {
      titre: "Un métier qui change",
      donnees: "Une tâche répétitive d'un métier est automatisée par l'IA.",
      question: "Tout le métier disparaît-il ?",
      solution:
        "Pas forcément : souvent le métier se transforme, et de nouvelles tâches apparaissent.",
    },
  ],
  pieges: [
    "Croire que l'IA supprime tous les métiers.",
    "Croire qu'elle n'a aucun effet sur le travail.",
    "Oublier le travail humain caché derrière l'IA.",
  ],
  aRetenir: [
    "Des tâches disparaissent, d'autres apparaissent.",
    "Les compétences attendues évoluent.",
    "Besoin de se former tout au long de la vie.",
    "Du travail humain caché (les travailleurs du clic).",
  ],
  entrainement: [
    {
      question: "L'IA supprime-t-elle tous les métiers ?",
      correction:
        "Non : certaines tâches disparaissent ou se transforment, mais de nouveaux métiers apparaissent.",
    },
    {
      question: "Qui sont les « travailleurs du clic » ?",
      correction:
        "Des humains qui étiquettent et vérifient des données, souvent dans des conditions précaires.",
    },
    {
      question: "Pourquoi faut-il se former tout au long de la vie ?",
      correction:
        "Parce que l'IA fait évoluer les compétences attendues dans presque tous les métiers.",
    },
  ],
};

export default function EmploiEtFormationPage() {
  return <FicheCoursIa fiche={fiche} />;
}
