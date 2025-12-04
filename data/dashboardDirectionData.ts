// data/dashboardDirectionData.ts

export type Profil = "eleves" | "profs" | "admin";

export type StatsGlobales = {
  nbElevesActifs: number;
  nbProfsActifs: number;
  nbAdminsActifs: number;
  requetesMois: number;
  evolutionPourcent: number;
  plafondMensuel: number;
  coutEstimeMois: number;
};

export type RepartitionUsage = {
  eleves: number;
  profs: number;
  admin: number;
};

export type ThemeEleve = {
  theme: string;
  part: number;
};

export type UsageProf = {
  usage: string;
  part: number;
};

export type TypeAlerte = "triche" | "usage_intensif";

export type Alerte = {
  type: TypeAlerte;
  niveau: string;
  message: string;
  date: string;
};

export type DashboardData = {
  statsGlobales: StatsGlobales;
  repartitionUsage: RepartitionUsage;
  topThemesEleves: ThemeEleve[];
  topUsagesProfs: UsageProf[];
  alertes: Alerte[];
};

// ----------------------------------------------------------
// 🔹 Données mock – version statique (à remplacer par Supabase)
// ----------------------------------------------------------

export const dashboardDataMock: DashboardData = {
  statsGlobales: {
    nbElevesActifs: 420,
    nbProfsActifs: 38,
    nbAdminsActifs: 6,
    requetesMois: 32840,
    evolutionPourcent: +18,
    plafondMensuel: 150,
    coutEstimeMois: 112,
  },

  repartitionUsage: {
    eleves: 0.55,
    profs: 0.35,
    admin: 0.1,
  },

  topThemesEleves: [
    { theme: "Mathématiques – révisions brevet", part: 32 },
    { theme: "Français – rédaction guidée", part: 24 },
    { theme: "Anglais – entraînement oral", part: 18 },
    { theme: "Histoire-Géo – fiches de révision", part: 14 },
  ],

  topUsagesProfs: [
    { usage: "Génération d’exercices", part: 34 },
    { usage: "Préparation de séquences", part: 28 },
    { usage: "Adaptations DYS", part: 21 },
    { usage: "QCM auto-corrigés", part: 17 },
  ],

  alertes: [
    {
      type: "triche",
      niveau: "4e",
      message:
        "Plusieurs requêtes proches d’un sujet de contrôle ont été détectées la veille de l’évaluation.",
      date: "02/12",
    },
    {
      type: "usage_intensif",
      niveau: "3e",
      message:
        "Usage très concentré sur un petit groupe d’élèves en difficulté (suivi à proposer).",
      date: "28/11",
    },
  ],
};

// ----------------------------------------------------------
// 🔹 Fonction exportée (comme getAllBlogPosts du blog)
// ----------------------------------------------------------

export function getDashboardDirectionData(): DashboardData {
  return dashboardDataMock;
}
