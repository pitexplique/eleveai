// data/atelierProductionTemplates.ts

export type TypeProduction =
  | "diagnostic"
  | "plan_action"
  | "debat"
  | "enquete"
  | "affiche"
  | "article"
  | "pitch"
  | "lettre_officielle"
  | "projet_classe"
  | "atelier_terrain";

export const PRODUCTION_TEMPLATES: Record<
  TypeProduction,
  { objectif: string; contraintes: string }
> = {
  diagnostic: {
    objectif:
      "Établir un constat clair, identifier les causes et les enjeux, puis proposer des pistes réalistes.",
    contraintes:
      "Travail en groupe (3–4). Ton clair et concret. Séparer : faits / hypothèses / opinions. Conclure par 3 priorités.",
  },

  plan_action: {
    objectif:
      "Proposer un plan d’action concret, réaliste, priorisé et justifié (qui fait quoi, quand, avec quel impact).",
    contraintes:
      "Travail en groupe (3–4). 6 mesures maximum. Pour chaque mesure : effort/coût, impact attendu, faisabilité, responsable, délai. Terminer par une checklist.",
  },

  debat: {
    objectif:
      "Construire un débat argumenté : points pour/contre, puis un arbitrage final justifié.",
    contraintes:
      "2 équipes. Chaque équipe : 3 arguments + 1 exemple local. Un arbitre synthétise et propose un compromis ou une décision motivée.",
  },

  enquete: {
    objectif:
      "Préparer une enquête : questions, collecte de données, puis synthèse claire des résultats.",
    contraintes:
      "10 questions maximum. Préciser : public visé, méthode de collecte, biais possibles. Restitution : tableau de résultats + 1 graphique + conclusion en 5–8 lignes.",
  },

  affiche: {
    objectif:
      "Créer une affiche / campagne de sensibilisation : message fort, preuves, et appel à l’action.",
    contraintes:
      "Slogan + 3 preuves + 1 chiffre (si possible) + 1 geste concret. Proposer 2 versions A/B. Format A4 lisible, phrases courtes.",
  },

  article: {
    objectif:
      "Rédiger un article structuré : angle clair, faits vérifiés, sources, conclusion.",
    contraintes:
      "Titre + chapeau + 3 parties + conclusion. Distinguer faits / opinions. 350 à 500 mots. Ajouter 2–3 sources (liens ou types de sources).",
  },

  pitch: {
    objectif:
      "Préparer un pitch de 1 minute : problème → solution → bénéfices → appel à l’action.",
    contraintes:
      "Structure en 4 temps (4 phrases ou 4 blocs). Ajouter 1 chiffre et 1 exemple local. Terminer par une demande claire (ce qu’on veut).",
  },

  lettre_officielle: {
    objectif:
      "Écrire une lettre institutionnelle (mairie / établissement) claire, polie et persuasive.",
    contraintes:
      "Objet + contexte + demande + justification + proposition concrète + formule de politesse. Ton respectueux, précis, sans émotion excessive.",
  },

  projet_classe: {
    objectif:
      "Proposer un mini-projet de classe : étapes, rôles, livrables et calendrier réaliste.",
    contraintes:
      "4 étapes maximum. Rôles conseillés : coordination, terrain, données, rédaction. Livrables : affiche + oral + synthèse écrite. Ajouter critères de réussite.",
  },

  atelier_terrain: {
    objectif:
      "Préparer un atelier terrain : observation/mesures, puis restitution exploitable en classe.",
    contraintes:
      "Indiquer : quoi observer, comment mesurer, matériel, sécurité, durée, puis restitution (photos/notes + tableau + conclusion + proposition d’action).",
  },
};

