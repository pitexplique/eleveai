// ─── Fiche de cours IA : IA, emploi et formation (Enjeux) ─────────────────────
// Fiche « en blocs » : le contenu vient de l'ancienne ficheEmploi
// (lib/fiches-ia.ts, référentiel Pix IA, compétence 3.4), coulé dans le
// schéma FicheCoursData. Pas de formule : la notion n'en a pas.
// Mapping : notions + callout → proprietes ; pointsCles (l'essentiel) →
// usages ; aQuoiCaSert → reel ; le « savais-tu » (travailleurs du clic) est
// intégré à l'historique, daté ; la définition canonique est écrite (absente
// de l'ancienne fiche).

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

export const ficheEmploiEtFormation: FicheCoursData = {
  matiere: "ia",
  matiereLabel: "IA",
  classe: "enjeux",
  notion: "emploi-et-formation",
  titre: "IA, emploi et formation",
  accroche:
    "L'IA transforme le travail : certaines tâches disparaissent, d'autres apparaissent. Cela change les compétences attendues dans presque tous les métiers.",
  identite: [
    { label: "Prérequis", valeur: "Notion de métier" },
    { label: "Idée clé", valeur: "Le travail se transforme" },
    { label: "À noter", valeur: "Les travailleurs du clic" },
  ],
  definition: {
    texte:
      "L'impact de l'IA sur l'emploi désigne la transformation du travail par l'automatisation : des tâches répétitives sont prises en charge par des machines, des métiers changent ou disparaissent, de nouveaux métiers apparaissent autour de la conception, la supervision et l'analyse de l'IA, et les compétences attendues évoluent — d'où la nécessité de se former tout au long de la vie.",
  },
  proprietes: [
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
    {
      titre: "La bonne question",
      texte:
        "La question n'est pas seulement « combien d'emplois supprimés ? », mais « comment le travail et les compétences se déplacent ».",
    },
  ],
  reel: {
    texte:
      "Comprendre l'impact de l'IA sur les métiers aide à se projeter : se former, s'adapter, et repérer les nouveaux emplois qui apparaissent.",
  },
  historique: {
    texte:
      "Derrière les IA, il y a beaucoup de travail humain peu visible : des personnes étiquettent les données et modèrent les contenus — les « travailleurs du clic », souvent mal payés. Ce micro-travail se développe dès 2005 avec des plateformes comme Amazon Mechanical Turk, et le sociologue Antonio Casilli le documente en 2019 dans « En attendant les robots ». Les débats sur l'automatisation, eux, ne datent pas d'hier : à chaque révolution technique, des métiers disparaissent et d'autres naissent.",
  },
  methode: [],
  usages: [
    {
      titre: "Automatisation",
      detail: "Des tâches répétitives prises en charge.",
    },
    {
      titre: "Transformation",
      detail: "Des métiers changent ou disparaissent.",
    },
    {
      titre: "Nouveaux métiers",
      detail: "Conception, supervision, analyse de l'IA.",
    },
    {
      titre: "Formation",
      detail: "Se former tout au long de la vie.",
    },
  ],
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
  coachHref: "/coach-ia/ia",
};

export const slidesEmploiEtFormation: ClasseSlide[] = [];
