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

export type ProductionTemplate = {
  objectif: string;
  contraintes: string;
};

const OBJECTIF_BASE =
  "Comprendre le problème, proposer des solutions réalistes, et justifier des choix.";

const CONTRAINTES_BASE =
  "Travail en groupe (3–4). Rendu final personnel + justification.\n" +
  "Traces : prompt utilisé + réponse IA brute + améliorations personnelles (ce qui a été corrigé et pourquoi).\n" +
  "Pas de copier-coller brut : reformuler, vérifier, citer ou expliquer les sources.\n" +
  "Ton clair, concret, et adapté au public.";

export const PRODUCTION_TEMPLATES: Record<TypeProduction, ProductionTemplate> = {
  diagnostic: {
    objectif:
      OBJECTIF_BASE +
      " Identifier causes, acteurs, enjeux, et conséquences (court terme / long terme).",
    contraintes:
      CONTRAINTES_BASE +
      "\n\nDiagnostic attendu :\n" +
      "- 5 faits observables (ou à vérifier)\n" +
      "- 3 causes probables (avec incertitudes)\n" +
      "- 3 impacts (sociaux / environnement / économie)\n" +
      "- 5 questions à vérifier sur le terrain ou via sources",
  },

  plan_action: {
    objectif:
      OBJECTIF_BASE +
      " Construire un plan d’action priorisé (3–5 mesures) avec faisabilité, impacts et calendrier.",
    contraintes:
      CONTRAINTES_BASE +
      "\n\nPlan d’action attendu :\n" +
      "- 3 à 5 mesures\n" +
      "- pour chacune : bénéfices / risques / coût (même ordre de grandeur) / qui fait quoi\n" +
      "- un mini calendrier (1 semaine / 1 mois / 3 mois)\n" +
      "- 1 indicateur de suivi par mesure",
  },

  debat: {
    objectif:
      OBJECTIF_BASE +
      " Construire 2 positions argumentées (pour/contre) et proposer un arbitrage final.",
    contraintes:
      CONTRAINTES_BASE +
      "\n\nDébat attendu :\n" +
      "- Position A + 3 arguments + 1 exemple\n" +
      "- Position B + 3 arguments + 1 exemple\n" +
      "- 3 critères d’arbitrage (efficacité, coût, justice, sécurité…)\n" +
      "- Conclusion : décision + pourquoi",
  },

  enquete: {
    objectif:
      OBJECTIF_BASE +
      " Mener une enquête : questions, collecte, synthèse, et limites (biais, échantillon).",
    contraintes:
      CONTRAINTES_BASE +
      "\n\nEnquête attendue :\n" +
      "- 8 à 12 questions (simples, non biaisées)\n" +
      "- protocole (qui ? combien ? où ? quand ?)\n" +
      "- tableau de résultats (même fictif au départ, mais indiqué comme exemple)\n" +
      "- analyse : tendances + limites + biais possibles",
  },

  affiche: {
    objectif:
      OBJECTIF_BASE +
      " Créer une affiche/campagne : message central, preuves, slogans, et appel à l’action.",
    contraintes:
      CONTRAINTES_BASE +
      "\n\nAffiche attendue :\n" +
      "- Message central (1 phrase)\n" +
      "- 2–3 preuves/arguments (avec sources ou “à vérifier”)\n" +
      "- 3 slogans courts\n" +
      "- Appel à l’action concret (ce qu’on demande de faire)\n" +
      "- Proposition visuelle (couleurs, icônes, placement)",
  },

  article: {
    objectif:
      OBJECTIF_BASE +
      " Rédiger un article structuré (angle, plan, sources, conclusion).",
    contraintes:
      CONTRAINTES_BASE +
      "\n\nArticle attendu :\n" +
      "- Titre + accroche\n" +
      "- Plan en 3 parties\n" +
      "- 2 sources minimum (ou types de sources)\n" +
      "- Une section “ce qui est sûr / ce qui est incertain”\n" +
      "- Conclusion + piste d’action",
  },

  pitch: {
    objectif:
      OBJECTIF_BASE +
      " Écrire un pitch d’1 minute : problème → solution → impact → appel.",
    contraintes:
      CONTRAINTES_BASE +
      "\n\nPitch attendu :\n" +
      "- 60 secondes max\n" +
      "- phrases courtes\n" +
      "- 1 chiffre clé (ou estimation signalée)\n" +
      "- 1 solution principale + 1 bénéfice\n" +
      "- Appel à l’action final (clair)",
  },

  lettre_officielle: {
    objectif:
      OBJECTIF_BASE +
      " Rédiger une lettre institutionnelle (demande claire + arguments + forme).",
    contraintes:
      CONTRAINTES_BASE +
      "\n\nLettre attendue :\n" +
      "- Objet\n" +
      "- Formule d’appel\n" +
      "- 2–3 arguments factuels\n" +
      "- Demande précise (ce que tu veux obtenir)\n" +
      "- Formule de politesse",
  },

  projet_classe: {
    objectif:
      OBJECTIF_BASE +
      " Concevoir un mini-projet : étapes, rôles, livrables, calendrier, évaluation.",
    contraintes:
      CONTRAINTES_BASE +
      "\n\nMini-projet attendu :\n" +
      "- étapes numérotées\n" +
      "- rôles (chef de projet, rédacteur, enquêteur…)\n" +
      "- livrables (affiche, doc, oral…)\n" +
      "- calendrier simple\n" +
      "- critères de réussite (3 à 5)",
  },

  atelier_terrain: {
    objectif:
      OBJECTIF_BASE +
      " Proposer un atelier terrain : observation/mesures, restitution, et sécurité.",
    contraintes:
      CONTRAINTES_BASE +
      "\n\nAtelier terrain attendu :\n" +
      "- quoi observer/mesurer\n" +
      "- matériel simple\n" +
      "- tableau de collecte\n" +
      "- consignes sécurité\n" +
      "- restitution (photo, mini-rapport, oral)",
  },
};
