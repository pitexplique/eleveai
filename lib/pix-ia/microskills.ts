import type { PixPalier } from "./referentiel";

// Microskills Pix IA = les « exemples de savoirs et savoir-faire » listés sous
// chaque compétence du référentiel Pix v2.0 (mai 2026), chacun tagué par palier.
// C'est l'unité de grain des questions (comme les microSkills du tutor).
// id : `${competenceId}.${n}`. Tous les paliers sont encodés ; les questions de
// l'éval blanche ne couvrent pour l'instant que N (novice) et I (indépendant).

export type PixMicroskill = {
  id: string;
  competenceId: string;
  palier: PixPalier;
  label: string;
};

export const PIX_MICROSKILLS: PixMicroskill[] = [
  // ── Domaine 1 — Fondements ────────────────────────────────────────────────
  // 1.1 Définir l'IA, son histoire
  { id: "1.1.1", competenceId: "1.1", palier: "novice", label: "Définir l'IA comme discipline scientifique" },
  { id: "1.1.2", competenceId: "1.1", palier: "novice", label: "Données massives et puissance de calcul comme moteurs de progrès" },
  { id: "1.1.3", competenceId: "1.1", palier: "independant", label: "Glissement du mot « IA » vers les technologies et services" },
  { id: "1.1.4", competenceId: "1.1", palier: "avance", label: "Contributions interdisciplinaires à l'IA" },
  { id: "1.1.5", competenceId: "1.1", palier: "avance", label: "Distinguer IA symbolique et apprentissage automatique" },
  { id: "1.1.6", competenceId: "1.1", palier: "expert", label: "Jalons historiques et « hivers de l'IA »" },
  { id: "1.1.7", competenceId: "1.1", palier: "expert", label: "Hybridation des approches symbolique et statistique" },
  // 1.2 Apprentissage automatique
  { id: "1.2.1", competenceId: "1.2", palier: "novice", label: "La phase d'entraînement d'un modèle" },
  { id: "1.2.2", competenceId: "1.2", palier: "independant", label: "Le procédé de l'apprentissage supervisé" },
  { id: "1.2.3", competenceId: "1.2", palier: "independant", label: "Choisir les étiquettes en apprentissage supervisé" },
  { id: "1.2.4", competenceId: "1.2", palier: "avance", label: "Le procédé de l'apprentissage par renforcement" },
  { id: "1.2.5", competenceId: "1.2", palier: "avance", label: "Critères de récompense en renforcement" },
  { id: "1.2.6", competenceId: "1.2", palier: "expert", label: "Comparer les méthodes d'apprentissage" },
  { id: "1.2.7", competenceId: "1.2", palier: "expert", label: "Choisir la technique selon la nature des données" },
  { id: "1.2.8", competenceId: "1.2", palier: "expert", label: "Intérêt d'introduire des biais volontaires" },
  // 1.3 Modèles d'apprentissage
  { id: "1.3.1", competenceId: "1.3", palier: "novice", label: "Prédire avec une régression linéaire" },
  { id: "1.3.2", competenceId: "1.3", palier: "novice", label: "Appliquer un arbre de décision" },
  { id: "1.3.3", competenceId: "1.3", palier: "independant", label: "Fonctionnement général des réseaux de neurones" },
  { id: "1.3.4", competenceId: "1.3", palier: "independant", label: "Objectif d'un calcul de régression" },
  { id: "1.3.5", competenceId: "1.3", palier: "avance", label: "Usage de la régression à l'entraînement" },
  { id: "1.3.6", competenceId: "1.3", palier: "avance", label: "Applications des réseaux de neurones" },
  { id: "1.3.7", competenceId: "1.3", palier: "expert", label: "Limites d'interprétabilité (« boîte noire »)" },
  { id: "1.3.8", competenceId: "1.3", palier: "expert", label: "Comparer les types de modèles" },
  // 1.4 Grands modèles de langage
  { id: "1.4.1", competenceId: "1.4", palier: "novice", label: "Le « mot suivant le plus probable »" },
  { id: "1.4.2", competenceId: "1.4", palier: "novice", label: "Repérer une hallucination simple" },
  { id: "1.4.3", competenceId: "1.4", palier: "independant", label: "Les étapes d'entraînement d'un LLM" },
  { id: "1.4.4", competenceId: "1.4", palier: "independant", label: "Rôle des humains dans l'entraînement" },
  { id: "1.4.5", competenceId: "1.4", palier: "independant", label: "Sources d'erreur des IA génératives" },
  { id: "1.4.6", competenceId: "1.4", palier: "avance", label: "Appel à des logiciels spécialisés" },
  { id: "1.4.7", competenceId: "1.4", palier: "expert", label: "Fonctionnement d'un transformateur" },
  // 1.5 Algorithmes de recommandation
  { id: "1.5.1", competenceId: "1.5", palier: "novice", label: "Recommandation personnalisée vs non personnalisée" },
  { id: "1.5.2", competenceId: "1.5", palier: "novice", label: "Cas d'usage courants de la recommandation" },
  { id: "1.5.3", competenceId: "1.5", palier: "independant", label: "Types de données utilisés par la recommandation" },
  { id: "1.5.4", competenceId: "1.5", palier: "independant", label: "Le risque d'enfermement (bulle de filtre)" },
  { id: "1.5.5", competenceId: "1.5", palier: "avance", label: "Filtrage collaboratif et par contenu" },
  { id: "1.5.6", competenceId: "1.5", palier: "expert", label: "Démarrage à froid et conséquences" },
  { id: "1.5.7", competenceId: "1.5", palier: "expert", label: "Recours à l'apprentissage automatique dans la reco" },
  { id: "1.5.8", competenceId: "1.5", palier: "expert", label: "Effets de la reco sur les comportements" },
  // 1.6 IA incarnée / robotique
  { id: "1.6.1", competenceId: "1.6", palier: "novice", label: "Définir un robot et ses grandes fonctions" },
  { id: "1.6.2", competenceId: "1.6", palier: "novice", label: "Exemples de robots utilisant l'IA" },
  { id: "1.6.3", competenceId: "1.6", palier: "independant", label: "Qu'est-ce qu'une IA incarnée" },
  { id: "1.6.4", competenceId: "1.6", palier: "independant", label: "Incertitude du monde réel pour l'IA incarnée" },
  { id: "1.6.5", competenceId: "1.6", palier: "avance", label: "Percevoir, décider, agir" },

  // ── Domaine 2 — Usages et applications ────────────────────────────────────
  // 2.1 Familles de tâches
  { id: "2.1.1", competenceId: "2.1", palier: "novice", label: "Repérer l'IA dans les outils du quotidien" },
  { id: "2.1.2", competenceId: "2.1", palier: "novice", label: "Finalité d'une reconnaissance image/son" },
  { id: "2.1.3", competenceId: "2.1", palier: "independant", label: "Identifier les familles d'applications de l'IA" },
  { id: "2.1.4", competenceId: "2.1", palier: "independant", label: "Repérer les applications dans les outils courants" },
  { id: "2.1.5", competenceId: "2.1", palier: "avance", label: "L'IA pour la prédiction (exemples concrets)" },
  { id: "2.1.6", competenceId: "2.1", palier: "avance", label: "Polyvalence des assistants génératifs" },
  // 2.2 Utiliser une IA générative
  { id: "2.2.1", competenceId: "2.2", palier: "novice", label: "Écrire une requête claire et précise" },
  { id: "2.2.2", competenceId: "2.2", palier: "independant", label: "Affiner la requête selon les résultats" },
  { id: "2.2.3", competenceId: "2.2", palier: "independant", label: "Types de tâches demandables à une IA générative" },
  { id: "2.2.4", competenceId: "2.2", palier: "novice", label: "Détecter erreurs et hallucinations dans une réponse" },
  { id: "2.2.5", competenceId: "2.2", palier: "avance", label: "Interroger en différentes modalités" },
  { id: "2.2.6", competenceId: "2.2", palier: "avance", label: "Vérifier en croisant les sources" },
  // 2.3 Évaluer l'information
  { id: "2.3.1", competenceId: "2.3", palier: "novice", label: "Intention de l'auteur d'un contenu truqué" },
  { id: "2.3.2", competenceId: "2.3", palier: "novice", label: "Interpréter une mention « fait avec l'IA »" },
  { id: "2.3.3", competenceId: "2.3", palier: "independant", label: "Retrouver l'auteur d'un contenu en ligne" },
  { id: "2.3.4", competenceId: "2.3", palier: "independant", label: "IA générative vs moteur de recherche" },
  { id: "2.3.5", competenceId: "2.3", palier: "avance", label: "Bots + reco amplifient les contenus truqués" },
  { id: "2.3.6", competenceId: "2.3", palier: "avance", label: "Appliquer les principes du fact-checking" },
  // 2.4 Services de recommandation
  { id: "2.4.1", competenceId: "2.4", palier: "novice", label: "Repérer les services à recommandation" },
  { id: "2.4.2", competenceId: "2.4", palier: "independant", label: "Avantages et limites de la personnalisation" },
  { id: "2.4.3", competenceId: "2.4", palier: "independant", label: "Gérer historique et personnalisation" },
  { id: "2.4.4", competenceId: "2.4", palier: "independant", label: "La personnalisation limite la diversité" },
  { id: "2.4.5", competenceId: "2.4", palier: "avance", label: "Régler les paramètres de recommandation" },
  { id: "2.4.6", competenceId: "2.4", palier: "avance", label: "Diversifier ses contenus" },
  // 2.5 IA dans une organisation
  { id: "2.5.1", competenceId: "2.5", palier: "novice", label: "Identifier des outils intégrant de l'IA" },
  { id: "2.5.2", competenceId: "2.5", palier: "novice", label: "Respecter une charte d'usage de l'IA" },
  { id: "2.5.3", competenceId: "2.5", palier: "independant", label: "Confidentialité et conditions d'utilisation" },
  { id: "2.5.4", competenceId: "2.5", palier: "independant", label: "Vérifier les mentions légales avant adoption" },
  { id: "2.5.5", competenceId: "2.5", palier: "avance", label: "Principe de la génération augmentée (RAG)" },
  { id: "2.5.6", competenceId: "2.5", palier: "avance", label: "Apport d'une charte interne d'usage" },

  // ── Domaine 3 — Enjeux ────────────────────────────────────────────────────
  // 3.1 Empreinte environnementale
  { id: "3.1.1", competenceId: "3.1", palier: "novice", label: "Les supercalculateurs consomment beaucoup d'énergie" },
  { id: "3.1.2", competenceId: "3.1", palier: "independant", label: "L'entraînement consomme beaucoup d'énergie" },
  { id: "3.1.3", competenceId: "3.1", palier: "independant", label: "Pistes pour réduire l'impact environnemental" },
  { id: "3.1.4", competenceId: "3.1", palier: "independant", label: "Ressources naturelles rares pour le matériel" },
  { id: "3.1.5", competenceId: "3.1", palier: "avance", label: "Émissions de GES directes et indirectes" },
  { id: "3.1.6", competenceId: "3.1", palier: "avance", label: "Le concept d'IA frugale" },
  // 3.2 Gouvernance
  { id: "3.2.1", competenceId: "3.2", palier: "novice", label: "L'IA est régulée à plusieurs échelles" },
  { id: "3.2.2", competenceId: "3.2", palier: "independant", label: "Acteurs internationaux influents de l'IA" },
  { id: "3.2.3", competenceId: "3.2", palier: "independant", label: "Valeurs encodées dans une IA" },
  { id: "3.2.4", competenceId: "3.2", palier: "independant", label: "Ce que signifie « gouverner » l'IA" },
  { id: "3.2.5", competenceId: "3.2", palier: "avance", label: "Cadres de gouvernance / IA Act européen" },
  // 3.3 Éthique et transparence
  { id: "3.3.1", competenceId: "3.3", palier: "novice", label: "Responsabilité juridique en cas d'erreur d'une IA" },
  { id: "3.3.2", competenceId: "3.3", palier: "independant", label: "Juger une situation au regard du RGPD / IA Act" },
  { id: "3.3.3", competenceId: "3.3", palier: "avance", label: "Open source, open data, open weight" },
  { id: "3.3.4", competenceId: "3.3", palier: "avance", label: "Degré d'explicabilité des modèles" },
  // 3.4 Emploi et formation
  { id: "3.4.1", competenceId: "3.4", palier: "novice", label: "Métiers qui disparaissent du fait de l'IA" },
  { id: "3.4.2", competenceId: "3.4", palier: "independant", label: "Métiers qui apparaissent du fait de l'IA" },
  { id: "3.4.3", competenceId: "3.4", palier: "independant", label: "Les « travailleurs du clic » derrière l'IA" },
  // 3.5 Enjeux culturels et sociétaux
  { id: "3.5.1", competenceId: "3.5", palier: "novice", label: "Cas connus de discriminations par une IA" },
  { id: "3.5.2", competenceId: "3.5", palier: "independant", label: "Reproduction de biais par une IA" },
  { id: "3.5.3", competenceId: "3.5", palier: "independant", label: "La reco peut propulser de fausses infos" },
  { id: "3.5.4", competenceId: "3.5", palier: "avance", label: "Biais culturels et linguistiques des IA" },
];

export function microskillsForCompetence(competenceId: string): PixMicroskill[] {
  return PIX_MICROSKILLS.filter((m) => m.competenceId === competenceId);
}

export function pixMicroskill(id: string): PixMicroskill | undefined {
  return PIX_MICROSKILLS.find((m) => m.id === id);
}
