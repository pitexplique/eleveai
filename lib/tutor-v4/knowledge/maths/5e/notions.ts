import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [

    // =========================
  // ALGORITHME
  // =========================
{
  id: "algo_programmation",
  label: "Lire et exécuter un programme",
  boId: "BO5I1",
  prerequis: ["litteral_calcul", "prop_proportionnalite"],
  levels: [1, 2, 3],
},
{
  id: "algo_construire",
  label: "Écrire et modifier un programme",
  boId: "BO5I1",
  prerequis: ["algo_programmation"],
  levels: [1, 2, 3],
},

  // =========================
  // NOMBRES
  // =========================
  {
    id: "relatif_nombre",
    label: "Nombres relatifs",
    boId: "BO5N1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "relatif_operation",
    label: "Opérations sur les nombres relatifs",
    boId: "BO5N1",
    prerequis: ["relatif_nombre"],
    levels: [1, 2, 3],
  },
  // Les critères de divisibilité sont au programme de 5e et manquaient : ils
  // servent à simplifier les fractions, ce qui vient juste après.
  // Ajoutés le 04/08/2026.
  {
    id: "divisibilite",
    label: "Multiples, diviseurs et divisibilité",
    boId: "BO5N3",
    prerequis: [],
    levels: [1, 2, 3],
  },

  // Une notion est une séance de coach : au-delà de huit micro-compétences,
  // l'élève ne voit plus où il en est. Les fractions en portaient onze, et deux
  // gestes s'y mélangeaient — reconnaître une fraction, puis calculer avec.
  // Coupées le 04/08/2026.
  {
    id: "fraction_nombre",
    label: "Fractions : reconnaître et comparer",
    boId: "BO5N2",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "fraction_calcul",
    label: "Calculer avec les fractions",
    boId: "BO5N2",
    prerequis: ["fraction_nombre"],
    levels: [1, 2, 3],
  },

  // =========================
  // PROPORTIONNALITÉ
  // =========================
  {
    id: "prop_proportionnalite",
    label: "Proportionnalité",
    boId: "BO5P1",
    prerequis: ["fraction_nombre"],
    levels: [1, 2, 3],
  },
  {
    id: "prop_ratio_pourcentage",
    label: "Ratios et pourcentages",
    boId: "BO5P1",
    prerequis: ["prop_proportionnalite"],
    levels: [1, 2, 3],
  },

  // =========================
  // ALGÈBRE
  // =========================
  {
    id: "litteral_calcul",
    label: "Calcul littéral",
    boId: "BO5A1",
    prerequis: ["relatif_operation"],
    levels: [1, 2, 3],
  },

  // =========================
  // GÉOMÉTRIE PLANE
  // =========================
  {
    id: "angle_mesure",
    label: "Angles",
    boId: "BO5G1",
    prerequis: [],
    levels: [1, 2],
  },
  {
    id: "triangle_figure",
    label: "Triangles",
    boId: "BO5G1",
    prerequis: ["angle_mesure"],
    levels: [1, 2, 3],
  },
  {
    id: "sym_centrale",
    label: "Symétrie centrale",
    boId: "BO5G1",
    prerequis: ["angle_mesure"],
    levels: [1, 2],
  },
  // Le parallélogramme existait côté grandeurs (son aire) mais pas côté
  // géométrie. C'est pourtant en 5e qu'on démontre ses propriétés, et son
  // centre de symétrie prolonge directement la symétrie centrale.
  // Ajouté le 04/08/2026.
  {
    id: "parallelogramme",
    label: "Parallélogrammes",
    boId: "BO5G1",
    prerequis: ["sym_centrale", "angle_mesure"],
    levels: [1, 2, 3],
  },

  // =========================
  // GRANDEURS ET MESURES
  // =========================
  {
    id: "aire_surface",
    label: "Aires",
    boId: "BO5M1",
    prerequis: ["triangle_figure"],
    levels: [1, 2],
  },
  // AJOUTÉE LE 15/08/2026, sur constat de l'évaluation nationale de 4ᵉ.
  // `BO5M1 « Grandeurs et mesures »` était déclaré mais ne portait qu'une seule
  // notion, les aires — alors que l'évaluation officielle teste dans ce même
  // domaine les CONVERSIONS et les DURÉES (135 min = 2 h 15, 75 L = 7 500 cL,
  // 20 L de lait pour 1 kg de beurre). Le thème « grandeurs » de l'épreuve
  // blanche de 4ᵉ ne pouvait donc proposer que des aires et des volumes :
  // cinq questions sur vingt ne ressemblaient pas à celles du jour J.
  // ⚠️ Ce n'est pas une notion inventée pour boucher un trou — c'est la
  // compétence du BO qui n'était pas servie.
  {
    id: "grandeur_conversion",
    label: "Conversions et durées",
    boId: "BO5M1",
    prerequis: [],
    levels: [1, 2],
  },

  // =========================
  // GÉOMÉTRIE DANS L’ESPACE
  // =========================
  {
    id: "volume_solide",
    label: "Volumes",
    boId: "BO5G2",
    prerequis: ["aire_surface"],
    levels: [1, 2],
  },

  // =========================
  // DONNÉES
  // =========================
  {
    id: "stat_statistique",
    label: "Statistiques",
    boId: "BO5D1",
    prerequis: [],
    levels: [1, 2],
  },
  {
    id: "proba_experience",
    label: "Probabilités",
    boId: "BO5D2",
    prerequis: ["stat_statistique"],
    levels: [1, 2],
  },

];