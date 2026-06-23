// Référentiel Pix « Les compétences numériques en intelligence artificielle »
// Version 2.0 — Mai 2026 (document de travail, source : cloud.pix.fr).
// Structure officielle : 3 domaines, 16 compétences, 4 paliers de progression.
// ⚠️ Ce fichier est le SEUL endroit qui encode l'ossature Pix : si le
// référentiel évolue, on le met à jour ici (le reste de l'éval blanche en
// dépend). Les libellés de compétences sont raccourcis pour l'affichage élève ;
// l'intitulé complet figure en commentaire.

export type PixPalier = "novice" | "independant" | "avance" | "expert";

export const PIX_PALIERS: { id: PixPalier; label: string }[] = [
  { id: "novice", label: "Novice" },
  { id: "independant", label: "Indépendant" },
  { id: "avance", label: "Avancé" },
  { id: "expert", label: "Expert" },
];

export type PixDomaineId = "1" | "2" | "3";

export type PixDomaine = { id: PixDomaineId; label: string; short: string };

export const PIX_DOMAINES: PixDomaine[] = [
  { id: "1", label: "Fondements de l'intelligence artificielle", short: "Fondements" },
  { id: "2", label: "Usages et applications de l'IA", short: "Usages" },
  { id: "3", label: "Enjeux du développement de l'IA", short: "Enjeux" },
];

export type PixCompetence = { id: string; domaineId: PixDomaineId; label: string };

export const PIX_COMPETENCES: PixCompetence[] = [
  // Domaine 1 — Fondements
  { id: "1.1", domaineId: "1", label: "Définir l'IA, son histoire et sa construction" },
  { id: "1.2", domaineId: "1", label: "Expliquer l'apprentissage automatique" },
  { id: "1.3", domaineId: "1", label: "Citer les modèles d'apprentissage automatique" },
  { id: "1.4", domaineId: "1", label: "Entraînement des grands modèles de langage" },
  { id: "1.5", domaineId: "1", label: "Algorithmes de recommandation" },
  { id: "1.6", domaineId: "1", label: "IA incarnée et robotique" },
  // Domaine 2 — Usages et applications
  { id: "2.1", domaineId: "2", label: "Familles de tâches réalisées par l'IA" },
  { id: "2.2", domaineId: "2", label: "Utiliser un logiciel d'IA générative" },
  { id: "2.3", domaineId: "2", label: "Évaluer l'information à l'heure des IA" },
  { id: "2.4", domaineId: "2", label: "Utiliser les services de recommandation" },
  { id: "2.5", domaineId: "2", label: "Utiliser l'IA dans son organisation" },
  // Domaine 3 — Enjeux
  { id: "3.1", domaineId: "3", label: "Empreinte environnementale de l'IA" },
  { id: "3.2", domaineId: "3", label: "Gouvernance des systèmes d'IA" },
  { id: "3.3", domaineId: "3", label: "Enjeux éthiques et de transparence" },
  { id: "3.4", domaineId: "3", label: "Conséquences sur l'emploi et la formation" },
  { id: "3.5", domaineId: "3", label: "Enjeux culturels et sociétaux" },
];

export function pixDomaine(id: PixDomaineId): PixDomaine {
  return PIX_DOMAINES.find((d) => d.id === id) ?? PIX_DOMAINES[0];
}

export function pixCompetence(id: string): PixCompetence | undefined {
  return PIX_COMPETENCES.find((c) => c.id === id);
}
