import type { Metadata } from "next";
import FicheCoursIa, { type FicheIaData } from "@/components/fiches/FicheCoursIa";

export const metadata: Metadata = {
  title: "Fiche IA — La gouvernance de l'IA",
  description:
    "Qui régule l'IA, l'IA Act, souveraineté numérique, valeurs encodées. Fiche de cours IA (référentiel Pix, Enjeux).",
};

const fiche: FicheIaData = {
  domaineId: "3",
  domaineLabel: "Enjeux",
  competence: "3.2",
  titre: "La gouvernance de l'IA",
  intro:
    "Le développement de l'IA pose des questions politiques : qui décide des règles ? Qui contrôle ces technologies très puissantes ?",
  identite: [
    { label: "Prérequis", valeur: "Notion de règle / loi" },
    { label: "Idée clé", valeur: "L'IA se régule" },
    { label: "Repère", valeur: "L'IA Act européen" },
  ],
  aQuoiCaSert:
    "Comprendre que l'IA n'est pas sans règles, et que des choix collectifs décident de son usage, aide à devenir un citoyen éclairé.",
  leSavaisTu:
    "La plupart des grandes plateformes d'IA sont contrôlées par un petit nombre d'entreprises situées dans quelques pays : c'est tout l'enjeu de la « souveraineté numérique ».",
  notions: [
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
  ],
  pointsCles: {
    titre: "L'essentiel",
    lignes: [
      { cle: "Qui régule", detail: "États, entreprises, organisations internationales." },
      { cle: "IA Act", detail: "Classe les IA par niveau de risque." },
      { cle: "Souveraineté", detail: "Garder le contrôle sur ces technologies." },
      { cle: "Valeurs", detail: "Des choix humains sont encodés dans l'IA." },
    ],
    callout:
      "« Gouverner » l'IA, c'est décider collectivement des règles, des limites et des obligations de transparence.",
  },
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
      correction: "Décider collectivement des règles, des limites et des obligations de transparence.",
    },
    {
      question: "Qu'est-ce que la souveraineté numérique ?",
      correction: "L'enjeu de garder le contrôle sur des technologies aussi influentes que l'IA.",
    },
  ],
};

export default function GouvernancePage() {
  return <FicheCoursIa fiche={fiche} />;
}
