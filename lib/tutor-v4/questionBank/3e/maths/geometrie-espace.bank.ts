import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

export const geometrieEspaceBank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "3e_volume_geometrie_espace_reconnaitre_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_solide_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Parmi ces objets, lequel est un solide usuel de l’espace ?",
    format: "qcm",
    choices: ["un cube", "un triangle", "un cercle", "un segment"],
    expected: ["un cube"],
    comparator: "mcq_exact",
    hint: "Un solide occupe un volume dans l’espace.",
    explanation:
      "Définition : un solide est une figure de l’espace en trois dimensions. Méthode : on distingue les figures planes des objets ayant une profondeur. Observation : un cube possède longueur, largeur et hauteur. Conclusion : le cube est un solide usuel de l’espace.",
    tags: ["base", "geometrie_espace", "solides"],
  },
];
