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

/** Emplacement d'une carte dans le rendez-vous du matin. */
export type SlotReco = "principale" | "alternative";

/** Une carte de recommandation, prête à afficher. CONTRAT FIGÉ : le bloc
 *  « ta journée » de l'accueil ne dépend que de cette forme ; l'échelle P0→P5
 *  (à venir) ne changera que la LOGIQUE qui remplit ces cartes, pas leur forme. */
export type CarteReco = {
  slot: SlotReco;
  emoji: string; // 🔥 principale · 🧭 alternative
  categorie: string; // « pourquoi » en 1 mot : Progresser, Renforcer, Reprendre, Explorer…
  titre: string;
  message: string;
  cta: string; // libellé du bouton, ex. « Continuer → »
  lien: string;
  ton: "fire" | "compass" | "warn"; // clé de couleur pour l'UI
  matiere?: string;
  notionId?: string;
};

/** Le rendez-vous du matin : 2 cartes. 🔥 principale (progresser / renforcer /
 *  reprendre) + 🧭 alternative (explorer une voie neuve). */
export type RecoDuJour = {
  principale: CarteReco;
  alternative: CarteReco | null;
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

  reco_du_jour: RecoDuJour;
};
