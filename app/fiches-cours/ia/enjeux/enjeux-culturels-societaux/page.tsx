import type { Metadata } from "next";
import FicheCoursIa, { type FicheIaData } from "@/components/fiches/FicheCoursIa";

export const metadata: Metadata = {
  title: "Fiche IA — Enjeux culturels et sociétaux de l'IA",
  description:
    "Biais, désinformation, diversité culturelle, droits des créateurs. Fiche de cours IA (référentiel Pix, Enjeux).",
};

export const fiche: FicheIaData = {
  domaineId: "3",
  domaineLabel: "Enjeux",
  competence: "3.5",
  titre: "Enjeux culturels et sociétaux de l'IA",
  intro:
    "Les IA ne sont pas neutres : elles peuvent reproduire des biais, amplifier de fausses informations, et favoriser certaines langues et cultures.",
  identite: [
    { label: "Prérequis", valeur: "Notion de biais" },
    { label: "Idée clé", valeur: "L'IA reflète ses données" },
    { label: "Enjeu", valeur: "Diversité & vérité" },
  ],
  aQuoiCaSert:
    "Comprendre que l'IA reflète la société aide à garder un regard critique sur ses résultats et à exiger plus de diversité et de justice.",
  leSavaisTu:
    "Comme les modèles sont surtout entraînés sur des contenus en anglais, ils gèrent moins bien d'autres langues et cultures, qui se retrouvent sous-représentées.",
  notions: [
    {
      titre: "Les biais",
      texte:
        "L'IA apprend sur des données qui contiennent déjà des stéréotypes : elle peut les reproduire.",
    },
    {
      titre: "La désinformation",
      texte:
        "Génération automatique de faux contenus, amplifiés par les algorithmes de recommandation.",
    },
    {
      titre: "La diversité culturelle",
      texte:
        "Langues et cultures sous-représentées ; des œuvres imitées sans reconnaître leurs créateurs.",
    },
  ],
  pointsCles: {
    titre: "L'essentiel",
    lignes: [
      { cle: "Biais", detail: "L'IA reproduit les stéréotypes de ses données." },
      { cle: "Désinformation", detail: "Faux contenus générés et amplifiés." },
      { cle: "Culture", detail: "Langues et cultures sous-représentées." },
      { cle: "Création", detail: "Œuvres imitées sans reconnaître les auteurs." },
    ],
    callout:
      "Les biais sont souvent involontaires, mais ils ont des conséquences réelles : recommandations, décisions ou évaluations automatiques.",
  },
  exemples: [
    {
      titre: "Un métier « genré »",
      donnees: "Une IA associe « infirmière » à une femme et « ingénieur » à un homme.",
      question: "Pourquoi ?",
      solution: "Parce qu'elle apprend sur des données qui contiennent déjà ces stéréotypes.",
    },
  ],
  pieges: [
    "Croire qu'une IA est toujours neutre.",
    "Penser que les biais sont voulus exprès.",
    "Oublier que les contenus viraux ne sont pas forcément vrais.",
  ],
  aRetenir: [
    "L'IA reproduit les biais de ses données.",
    "Elle peut amplifier la désinformation.",
    "Certaines langues et cultures sont sous-représentées.",
    "On garde un regard critique sur ses résultats.",
  ],
  entrainement: [
    {
      question: "Pourquoi une IA peut-elle reproduire des stéréotypes ?",
      correction: "Parce qu'elle apprend sur des données qui contiennent déjà ces biais.",
    },
    {
      question: "Pourquoi de fausses informations se répandent-elles vite ?",
      correction:
        "Parce que les algorithmes de recommandation favorisent les contenus qui font le plus réagir.",
    },
    {
      question: "Pourquoi certaines langues sont-elles moins bien gérées par les IA ?",
      correction: "Parce qu'il existe moins de données d'entraînement dans ces langues.",
    },
  ],
};

export default function EnjeuxCulturelsSocietauxPage() {
  return <FicheCoursIa fiche={fiche} />;
}
