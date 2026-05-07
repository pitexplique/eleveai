// Notions de mathématiques pour la classe de CM2.

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  { id: "nombres_entiers", label: "Nombres entiers", boId: "BOCM2N", prerequis: [], levels: [1, 2, 3] },
  { id: "fractions", label: "Fractions", boId: "BOCM2N", prerequis: ["nombres_entiers"], levels: [1, 2, 3] },
  { id: "nombres_decimaux", label: "Nombres décimaux", boId: "BOCM2N", prerequis: ["fractions"], levels: [1, 2, 3] },
  { id: "calcul_mental", label: "Calcul mental", boId: "BOCM2N", prerequis: ["nombres_entiers"], levels: [1, 2, 3] },
  { id: "calcul_pose", label: "Calcul posé", boId: "BOCM2N", prerequis: ["calcul_mental"], levels: [1, 2, 3] },
  { id: "problemes_arithmetiques", label: "Problèmes arithmétiques", boId: "BOCM2N", prerequis: ["calcul_pose", "nombres_decimaux"], levels: [1, 2, 3] },

  { id: "egalites", label: "Égalités", boId: "BOCM2A", prerequis: ["calcul_mental"], levels: [1, 2] },
  { id: "schemas_barres", label: "Schémas en barres", boId: "BOCM2A", prerequis: ["egalites"], levels: [1, 2, 3] },
  { id: "motifs_evolutifs", label: "Motifs évolutifs", boId: "BOCM2A", prerequis: ["egalites"], levels: [1, 2, 3] },
  { id: "nombres_inconnus", label: "Nombres inconnus", boId: "BOCM2A", prerequis: ["schemas_barres"], levels: [1, 2, 3] },

  { id: "tableaux", label: "Tableaux", boId: "BOCM2D", prerequis: [], levels: [1, 2] },
  { id: "graphiques", label: "Graphiques", boId: "BOCM2D", prerequis: ["tableaux"], levels: [1, 2] },
  { id: "diagrammes", label: "Diagrammes", boId: "BOCM2D", prerequis: ["tableaux"], levels: [1, 2] },

  { id: "hasard", label: "Hasard", boId: "BOCM2P", prerequis: ["tableaux"], levels: [1, 2] },
  { id: "probabilites_simples", label: "Probabilités simples", boId: "BOCM2P", prerequis: ["hasard"], levels: [1, 2] },

  { id: "alignement", label: "Alignement", boId: "BOCM2G", prerequis: [], levels: [1, 2] },
  { id: "angles", label: "Angles", boId: "BOCM2G", prerequis: ["alignement"], levels: [1, 2] },
  { id: "triangles", label: "Triangles", boId: "BOCM2G", prerequis: ["angles"], levels: [1, 2] },
  { id: "quadrilateres", label: "Quadrilatères", boId: "BOCM2G", prerequis: ["angles"], levels: [1, 2] },
  { id: "cercle", label: "Cercle", boId: "BOCM2G", prerequis: ["alignement"], levels: [1, 2] },
  { id: "symetrie", label: "Symétrie", boId: "BOCM2G", prerequis: ["alignement"], levels: [1, 2] },
  { id: "solides", label: "Solides", boId: "BOCM2G", prerequis: ["quadrilateres"], levels: [1, 2] },
  { id: "reperage_espace", label: "Repérage dans l’espace", boId: "BOCM2G", prerequis: ["alignement"], levels: [1, 2] },

  { id: "longueurs", label: "Longueurs", boId: "BOCM2M", prerequis: [], levels: [1, 2] },
  { id: "masses", label: "Masses", boId: "BOCM2M", prerequis: [], levels: [1, 2] },
  { id: "contenances", label: "Contenances", boId: "BOCM2M", prerequis: [], levels: [1, 2] },
  { id: "durees", label: "Durées", boId: "BOCM2M", prerequis: [], levels: [1, 2] },
  { id: "perimetres", label: "Périmètres", boId: "BOCM2M", prerequis: ["longueurs"], levels: [1, 2, 3] },
  { id: "aires", label: "Aires", boId: "BOCM2M", prerequis: ["longueurs"], levels: [1, 2, 3] },
  { id: "volumes", label: "Volumes", boId: "BOCM2M", prerequis: ["contenances"], levels: [1, 2] },

  { id: "proportionnalite_reconnaitre", label: "Reconnaître la proportionnalité", boId: "BOCM2R", prerequis: ["nombres_entiers"], levels: [1, 2] },
  { id: "tableaux_proportionnalite", label: "Tableaux de proportionnalité", boId: "BOCM2R", prerequis: ["proportionnalite_reconnaitre"], levels: [1, 2, 3] },
  { id: "quatrieme_proportionnelle", label: "Quatrième proportionnelle", boId: "BOCM2R", prerequis: ["tableaux_proportionnalite"], levels: [2, 3] },
  { id: "pourcentages_simples", label: "Pourcentages simples", boId: "BOCM2R", prerequis: ["fractions", "tableaux_proportionnalite"], levels: [1, 2] },
  { id: "echelles_simples", label: "Échelles simples", boId: "BOCM2R", prerequis: ["tableaux_proportionnalite", "longueurs"], levels: [2, 3] },
  { id: "defis_proportionnalite", label: "Défis de proportionnalité", boId: "BOCM2R", prerequis: ["quatrieme_proportionnelle", "pourcentages_simples", "echelles_simples"], levels: [3, 4, 5] },

  { id: "suites_instructions", label: "Suites d’instructions", boId: "BOCM2I", prerequis: [], levels: [1, 2] },
  { id: "logique", label: "Logique", boId: "BOCM2I", prerequis: ["suites_instructions"], levels: [1, 2] },
  { id: "deplacements_quadrillage", label: "Déplacements sur quadrillage", boId: "BOCM2I", prerequis: ["suites_instructions", "reperage_espace"], levels: [1, 2] },
  { id: "programmation_simple", label: "Programmation simple", boId: "BOCM2I", prerequis: ["logique", "deplacements_quadrillage"], levels: [1, 2, 3] },
];