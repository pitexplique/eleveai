// lib/profil-eleve/types.ts
//
// Profil élève persisté : deux axes stratégiques
//   - Niveau       : maîtrise par notion (dérivée de l'historique resultats_tutor)
//   - Comportement : engagement (assiduité, régularité, dernière activité)
// + des recommandations RULE-BASED (pas d'appel IA externe : souveraineté RGPD,
// coût nul, explicable devant un prof / une inspection).
//
// Sérialisé en JSON dans profil_eleve.data (même pattern que bulletins.data).

/** Statut d'engagement, calculé sur le délai depuis la dernière activité. */
export type StatutEngagement = "actif" | "ralenti" | "inactif" | "nouveau";

/** Maîtrise d'une notion précise (0–100), avec le volume et la fraîcheur. */
export type NotionMastery = {
  matiere: string;
  notionId: string;
  libelle: string;
  mastery: number; // 0–100
  nb: number; // nombre de passages pris en compte
  dernier: string | null; // ISO du dernier passage
};

/** Maîtrise agrégée par matière. */
export type MatiereMastery = {
  matiere: string;
  mastery: number | null; // 0–100
  nb: number;
};

/** Une recommandation rule-based, prête à afficher / lier. */
export type Recommandation = {
  type: "renforcer" | "assiduite" | "explorer";
  titre: string;
  message: string;
  matiere?: string;
  notionId?: string;
  lien?: string;
};

/** Le profil complet d'un élève (snapshot). */
export type ProfilEleve = {
  prenom: string;
  classe: string | null;
  niveau_public: string | null;
  computed_at: string;

  niveau: {
    global: number | null; // maîtrise moyenne 0–100
    points_forts: NotionMastery[];
    points_faibles: NotionMastery[];
    par_matiere: MatiereMastery[];
  };

  comportement: {
    statut: StatutEngagement;
    jours_depuis_activite: number | null;
    jours_actifs_30: number;
    total_activites: number;
    derniere_activite: string | null;
  };

  recommandations: Recommandation[];
};
