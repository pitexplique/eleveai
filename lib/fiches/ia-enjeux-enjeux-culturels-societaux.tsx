// ─── Fiche de cours IA : enjeux culturels et sociétaux (Enjeux) ────────────────
// Fiche « en blocs » : le contenu vient de l'ancienne ficheCulturels
// (lib/fiches-ia.ts, référentiel Pix IA, compétence 3.5), coulé dans le
// schéma FicheCoursData. Pas de formule : la notion n'en a pas.
// Mapping : notions + callout → proprietes ; pointsCles (l'essentiel) →
// usages ; aQuoiCaSert → reel ; le « savais-tu » (données surtout en anglais)
// est intégré à l'historique, daté ; la définition canonique est écrite
// (absente de l'ancienne fiche).

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

export const ficheEnjeuxCulturelsSocietaux: FicheCoursData = {
  matiere: "ia",
  matiereLabel: "IA",
  classe: "enjeux",
  notion: "enjeux-culturels-societaux",
  titre: "Enjeux culturels et sociétaux de l'IA",
  accroche:
    "Les IA ne sont pas neutres : elles peuvent reproduire des biais, amplifier de fausses informations, et favoriser certaines langues et cultures.",
  identite: [
    { label: "Prérequis", valeur: "Notion de biais" },
    { label: "Idée clé", valeur: "L'IA reflète ses données" },
    { label: "Enjeu", valeur: "Diversité & vérité" },
  ],
  definition: {
    texte:
      "Les enjeux culturels et sociétaux de l'IA désignent les effets de l'IA sur la société et les cultures : reproduction des biais et stéréotypes présents dans ses données, amplification de la désinformation, sous-représentation de certaines langues et cultures, et imitation d'œuvres sans reconnaître leurs créateurs.",
  },
  proprietes: [
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
    {
      titre: "Des conséquences réelles",
      texte:
        "Les biais sont souvent involontaires, mais ils ont des conséquences réelles : recommandations, décisions ou évaluations automatiques.",
    },
  ],
  reel: {
    texte:
      "Comprendre que l'IA reflète la société aide à garder un regard critique sur ses résultats et à exiger plus de diversité et de justice.",
  },
  historique: {
    texte:
      "En 2016, le chatbot Tay de Microsoft, entraîné en direct par les internautes, s'est mis à tenir des propos haineux en moins de 24 heures : il a été retiré aussitôt. Depuis l'arrivée des IA génératives grand public en 2022, des artistes et l'agence Getty Images ont porté plainte (2023) contre des générateurs d'images entraînés sur leurs œuvres sans autorisation. Et comme les modèles sont surtout entraînés sur des contenus en anglais, les autres langues et cultures se retrouvent sous-représentées.",
  },
  methode: [],
  usages: [
    {
      titre: "Biais",
      detail: "L'IA reproduit les stéréotypes de ses données.",
    },
    {
      titre: "Désinformation",
      detail: "Faux contenus générés et amplifiés.",
    },
    {
      titre: "Culture",
      detail: "Langues et cultures sous-représentées.",
    },
    {
      titre: "Création",
      detail: "Œuvres imitées sans reconnaître les auteurs.",
    },
  ],
  exemples: [
    {
      titre: "Un métier « genré »",
      donnees: "Une IA associe « infirmière » à une femme et « ingénieur » à un homme.",
      question: "Pourquoi ?",
      solution:
        "Parce qu'elle apprend sur des données qui contiennent déjà ces stéréotypes.",
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
      correction:
        "Parce qu'elle apprend sur des données qui contiennent déjà ces biais.",
    },
    {
      question: "Pourquoi de fausses informations se répandent-elles vite ?",
      correction:
        "Parce que les algorithmes de recommandation favorisent les contenus qui font le plus réagir.",
    },
    {
      question: "Pourquoi certaines langues sont-elles moins bien gérées par les IA ?",
      correction:
        "Parce qu'il existe moins de données d'entraînement dans ces langues.",
    },
  ],
  coachHref: "/coach-ia/ia",
};

export const slidesEnjeuxCulturelsSocietaux: ClasseSlide[] = [];
