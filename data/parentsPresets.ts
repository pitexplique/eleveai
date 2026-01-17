// data/parentsPresets.ts

import type { PresetCarouselItem } from "@/components/PresetCarousel";
import type { ClasseValue, MatiereValue } from "@/lib/constants/scolaire";
import type { MethodePedagogique } from "@/lib/pedagogie/methodes";

/* ----------------------------------------
   TYPES (exportés)
---------------------------------------- */

export type Maitrise = "besoin" | "satisfaisant" | "expert";

export type ParentsPresetValues = {
  classe?: ClasseValue;
  matiere?: MatiereValue;
  objectif?: string;
  maitrise?: Maitrise;
  hasDys?: boolean;
  dysTypes?: string[];
  hyperactif?: boolean;
  methode?: MethodePedagogique;
};

export type ParentsPresetKey =
  | "primaire_bases_maths"
  | "primaire_lecture_francais"
  | "college_controle_fractions"
  | "college_devoirs_maison_encadrement"
  | "lycee_methodes_travail"
  | "lycee_preparation_bac_maths"
  | "lycee_stress_examens"
  | "dys_hyperactif_college";

/* ----------------------------------------
   PRESETS (valeurs alignées sur scolaire.ts)
---------------------------------------- */

export const PARENTS_PRESETS: Record<
  ParentsPresetKey,
  { label: string; description: string; valeurs: ParentsPresetValues }
> = {
  primaire_bases_maths: {
    label: "🟢 Primaire – Reprendre les bases en maths",
    description:
      "Pour un enfant qui manque de confiance sur les opérations et les problèmes simples.",
    valeurs: {
      classe: "CM2",
      matiere: "maths",
      objectif:
        "Lui redonner confiance sur les bases en calcul (additions, soustractions, multiplications, problèmes simples) sans le décourager.",
      maitrise: "besoin",
      hasDys: false,
      hyperactif: false,
      methode: "methode_active",
    },
  },

  primaire_lecture_francais: {
    label: "📖 Primaire – Lecture et français",
    description:
      "Pour un enfant qui lit lentement et a besoin d’un accompagnement rassurant en lecture / écriture.",
    valeurs: {
      classe: "CM2",
      matiere: "francais",
      objectif:
        "L’aider à lire plus régulièrement, comprendre les textes simples et écrire des phrases correctes sans le mettre en échec.",
      maitrise: "besoin",
      hasDys: false,
      hyperactif: false,
      methode: "methode_active",
    },
  },

  college_controle_fractions: {
    label: "🟣 Collège – Préparer un contrôle de fractions",
    description:
      "Pour un élève de 5e/4e qui stresse à l’idée d’un contrôle en maths.",
    valeurs: {
      classe: "5e",
      matiere: "maths",
      objectif:
        "L’aider à préparer un contrôle sur les fractions (simplifier, additionner, comparer) en le guidant pas à pas.",
      maitrise: "besoin",
      hasDys: false,
      hyperactif: false,
      methode: "enseignement_explicite",
    },
  },

  college_devoirs_maison_encadrement: {
    label: "📝 Collège – Mieux gérer les devoirs",
    description:
      "Pour un élève qui se laisse vite déborder par les devoirs maison et ne sait pas par où commencer.",
    valeurs: {
      classe: "college",
      matiere: "toutes",
      objectif:
        "L’aider à organiser ses devoirs, découper les tâches en petites étapes et garder une attitude positive face au travail personnel.",
      maitrise: "satisfaisant",
      hasDys: false,
      hyperactif: false,
      methode: "mix",
    },
  },

  lycee_methodes_travail: {
    label: "📘 Lycée – Méthode de travail",
    description:
      "Pour un élève qui a besoin d’une méthode pour s’organiser et réviser plus efficacement.",
    valeurs: {
      classe: "lycee",
      matiere: "toutes",
      objectif:
        "L’aider à trouver une méthode de travail simple pour s’organiser, réviser régulièrement et préparer ses évaluations sans être débordé.",
      maitrise: "satisfaisant",
      hasDys: false,
      hyperactif: false,
      methode: "mix",
    },
  },

  lycee_preparation_bac_maths: {
    label: "📊 Lycée – Préparation bac (maths)",
    description:
      "Pour un élève de Première / Terminale qui veut se préparer sereinement aux épreuves de maths.",
    valeurs: {
      classe: "Terminale",
      matiere: "maths",
      objectif:
        "L’aider à revoir les chapitres importants pour le bac, identifier ses points faibles et s’entraîner avec des exercices progressifs.",
      maitrise: "expert",
      hasDys: false,
      hyperactif: false,
      methode: "enseignement_explicite",
    },
  },

  lycee_stress_examens: {
    label: "💬 Lycée – Stress et examens",
    description:
      "Pour un élève qui se bloque à cause du stress avant les contrôles et examens.",
    valeurs: {
      classe: "lycee",
      matiere: "toutes",
      objectif:
        "L’aider à gérer son stress avant les contrôles et examens, avec des conseils concrets, des routines courtes et des encouragements.",
      maitrise: "satisfaisant",
      hasDys: false,
      hyperactif: false,
      methode: "methode_active",
    },
  },

  dys_hyperactif_college: {
    label: "🧩 Collège – Profil DYS + hyperactif",
    description:
      "Pour un élève avec profil DYS et/ou TDAH qui a besoin d’un accompagnement très guidé et rassurant.",
    valeurs: {
      classe: "college",
      matiere: "toutes",
      objectif:
        "L’aider à reprendre confiance, à comprendre les consignes et à travailler avec des activités courtes, guidées et adaptées à son profil DYS / hyperactif.",
      maitrise: "besoin",
      hasDys: true,
      dysTypes: ["Dyslexie", "Dysorthographie"],
      hyperactif: true,
      methode: "methode_active",
    },
  },
};

/* ----------------------------------------
   ITEMS CARROUSEL (exportés, typés)
---------------------------------------- */

export const PARENTS_PRESET_ITEMS: PresetCarouselItem[] = Object.entries(
  PARENTS_PRESETS,
).map(([key, preset]) => ({
  id: key, // ✅ string OK pour PresetCarouselItem
  label: preset.label,
  description: preset.description,
  badge: "Modèle parent",
}));

/* ----------------------------------------
   (optionnel) helper si tu veux garder le type côté page
---------------------------------------- */

export function isParentsPresetKey(id: string): id is ParentsPresetKey {
  return id in PARENTS_PRESETS;
}
