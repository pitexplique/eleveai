// lib/concours-general/weeks/semaine-01.ts

import type { ConcoursGeneralWeek } from "../types";

export const concoursGeneralSemaine01: ConcoursGeneralWeek = {
  id: "cg_s01",
  title: "Semaine 1 — Des maths pas comme les autres",
  description:
    "20 défis pour apprendre à chercher, raisonner et expliquer. Niveau cible : 3e, accessible progressivement aux élèves curieux dès la 6e.",

  niveauCible: "3e",
  durationMinutes: 120,

  blocks: [
    {
      id: "nombres_logique",
      title: "Nombres et logique",
      description:
        "Restes, suites, dénombrement et calcul malin.",
      itemIds: [
        "cg_num_001_poignees_main",
        "cg_num_002_bordure_carree",
        "cg_num_003_nombre_reste",
        "cg_num_004_qcm_reste",
        "cg_num_005_suite_logique",
      ],
    },
    {
      id: "proportionnalite_grandeurs",
      title: "Proportionnalité et grandeurs",
      description:
        "Pourcentages, vitesses, tarifs, échelles et situations concrètes.",
      itemIds: [
        "cg_prop_001_pourcentage_inverse",
        "cg_prop_002_sentier_volcan",
        "cg_prop_003_tarifs_velo",
        "cg_prop_004_recette",
        "cg_prop_005_echelle_carte",
      ],
    },
    {
      id: "geometrie",
      title: "Géométrie",
      description:
        "Aires, périmètres, volumes, Pythagore, Thalès et raisonnement.",
      itemIds: [
        "cg_geo_001_aire_perimetre",
        "cg_geo_002_triangle_sentier",
        "cg_geo_003_carre_aire_x4",
        "cg_geo_004_volume_bassin",
        "cg_geo_005_thales_simple",
      ],
    },
    {
      id: "maths_sciences_donnees",
      title: "Maths, sciences et données",
      description:
        "Statistiques, environnement, énergie, croissance et interprétation.",
      itemIds: [
        "cg_sci_001_moyenne_inverse",
        "cg_sci_002_croissance_plante",
        "cg_sci_003_dechets_cantine",
        "cg_sci_004_energie_solaire",
        "cg_sci_005_graphique_temperature",
      ],
    },
  ],
};