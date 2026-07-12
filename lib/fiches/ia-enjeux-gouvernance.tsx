// ─── Fiche de cours IA : la gouvernance de l'IA (Enjeux) ───────────────────────
// Fiche « en blocs » : le contenu vient de l'ancienne ficheGouvernance
// (lib/fiches-ia.ts, référentiel Pix IA, compétence 3.2), coulé dans le
// schéma FicheCoursData. Pas de formule : la notion n'en a pas.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

export const ficheGouvernance: FicheCoursData = {
  matiere: "ia",
  matiereLabel: "IA",
  classe: "enjeux",
  notion: "gouvernance",
  titre: "La gouvernance de l'IA",
  accroche:
    "Le développement de l'IA pose des questions politiques : qui décide des règles ? Qui contrôle ces technologies très puissantes ?",
  identite: [
    { label: "Prérequis", valeur: "Notion de règle / loi" },
    { label: "Idée clé", valeur: "L'IA se régule" },
    { label: "Repère", valeur: "L'IA Act européen" },
  ],
  definition: {
    texte:
      "« Gouverner » l'IA, c'est décider collectivement des règles, des limites et des obligations de transparence qui encadrent la conception et l'usage des systèmes d'intelligence artificielle.",
  },
  proprietes: [
    {
      titre: "Réguler",
      texte:
        "Des États, des entreprises et des organisations internationales fixent des règles pour l'IA.",
    },
    {
      titre: "L'IA Act",
      texte:
        "Une loi européenne qui classe les systèmes d'IA selon leur niveau de risque (de minime à interdit).",
    },
    {
      titre: "Des valeurs encodées",
      texte:
        "Quand une IA filtre ou note, elle s'appuie sur des choix humains : ce qui est acceptable, pertinent, juste.",
    },
    {
      titre: "La souveraineté numérique",
      texte:
        "La plupart des grandes plateformes d'IA sont contrôlées par un petit nombre d'entreprises situées dans quelques pays : c'est tout l'enjeu de la « souveraineté numérique ».",
    },
  ],
  reel: {
    texte:
      "Comprendre que l'IA n'est pas sans règles, et que des choix collectifs décident de son usage, aide à devenir un citoyen éclairé.",
  },
  historique: {
    texte:
      "En 2018, le RGPD a posé en Europe un premier grand cadre sur les données personnelles. En 2021, l'UNESCO a adopté une recommandation mondiale sur l'éthique de l'IA. Puis, en 2024, l'Union européenne a voté l'IA Act, première grande loi au monde consacrée spécifiquement à l'IA.",
  },
  methode: [],
  usages: [],
  exemples: [
    {
      titre: "Qui fait les règles ?",
      donnees: "On entend parfois que « l'IA n'a aucune règle ».",
      question: "Vrai ou faux ?",
      solution:
        "Faux : des États, des entreprises et des organisations internationales fixent des règles (ex. l'IA Act européen).",
    },
  ],
  pieges: [
    "Croire que l'IA n'est encadrée par personne.",
    "Penser qu'une IA est totalement neutre.",
    "Oublier que peu d'acteurs concentrent le pouvoir.",
  ],
  aRetenir: [
    "L'IA est régulée à plusieurs échelles.",
    "L'IA Act classe les IA par niveau de risque.",
    "Peu d'entreprises concentrent le pouvoir (souveraineté).",
    "Des valeurs humaines sont encodées dans l'IA.",
  ],
  entrainement: [
    {
      question: "Qui peut fixer des règles sur l'IA ?",
      correction:
        "Les entreprises, les États et des organisations internationales (ex. l'IA Act européen).",
    },
    {
      question: "Que signifie « gouverner » l'IA ?",
      correction:
        "Décider collectivement des règles, des limites et des obligations de transparence.",
    },
    {
      question: "Qu'est-ce que la souveraineté numérique ?",
      correction:
        "L'enjeu de garder le contrôle sur des technologies aussi influentes que l'IA.",
    },
  ],
  coachHref: "/coach-ia/ia",
};

export const slidesGouvernance: ClasseSlide[] = [];
