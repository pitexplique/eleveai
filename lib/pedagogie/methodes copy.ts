// lib/pedagogie/methodes.ts

export type MethodePedagogique =
  | "methode_active"
  | "enseignement_explicite"
  | "inductive"
  | "deductive"
  | "par_projet"
  | "par_problemes"
  | "cooperative"
  | "ludique"
  | "magistrale"
  | "mix"
  | "aucune";

export type MethodeOption = Readonly<{
  id: MethodePedagogique;
  label: string;
  description: string;
  // bloc “instructions” injecté dans le prompt (pour guider l’IA)
  promptBlock: string;
}>;

/**
 * ✅ Méthode par défaut (choisie explicitement, au lieu de dépendre de METHODES[0])
 */
export const DEFAULT_METHODE: MethodePedagogique = "methode_active";

/**
 * ✅ Catalogue unique des méthodes pédagogiques EleveAI
 * (réutilisable profs / élèves / parents).
 *
 * - "mix" : séance réaliste (active → explicite → entraînement → bilan)
 * - "aucune" : n’impose pas de méthode (utile quand le prof veut juste une ressource)
 */
export const METHODES: ReadonlyArray<MethodeOption> = [
  {
    id: "methode_active",
    label: "Méthode active",
    description:
      "L’élève agit à chaque étape : questions courtes, essais, feedback, bilan et métacognition.",
    promptBlock:
      "MÉTHODE PÉDAGOGIQUE : MÉTHODE ACTIVE (obligatoire)\n" +
      "- Tu fais agir l’élève à chaque étape : micro-questions → réponse élève → feedback → mini-synthèse.\n" +
      "- Tu alternes : (1) question, (2) indice si besoin, (3) correction expliquée, (4) mini-exercice immédiat.\n" +
      "- Tu ajoutes des pauses cognitives : « Stop 20 secondes : cherche ».\n" +
      "- Tu termines par : récapitulatif + 1 question métacognitive (« Qu’est-ce qui t’a aidé ? »).\n\n",
  },
  {
    id: "mix",
    label: "Mix (séance complète réaliste)",
    description:
      "Une séance “comme en vrai” : actif → explicite → entraînement → bilan (avec timing).",
    promptBlock:
      "MÉTHODE PÉDAGOGIQUE : MIX (séance complète)\n" +
      "- Structure en 4 temps :\n" +
      "  1) ACTIF (accroche + recherche guidée) : questions courtes + essais + feedback.\n" +
      "  2) EXPLICITE (institutionnalisation) : règle/trace écrite claire + 1 exemple modèle.\n" +
      "  3) ENTRAÎNEMENT : exercices base/standard/défi + correction.\n" +
      "  4) BILAN : mini-récap + 2 questions flash + 1 question métacognitive.\n" +
      "- Indique le temps conseillé pour chaque phase.\n\n",
  },
  {
    id: "aucune",
    label: "Aucune (ne pas imposer)",
    description:
      "Tu n’imposes pas de pédagogie : tu respectes surtout le type, les contraintes et la clarté.",
    promptBlock:
      "MÉTHODE PÉDAGOGIQUE : AUCUNE\n" +
      "- Ne pas imposer de démarche pédagogique.\n" +
      "- Respecter en priorité : type de ressource, contraintes, barème/critères si évaluation, lisibilité Word.\n\n",
  },
  {
    id: "enseignement_explicite",
    label: "Enseignement explicite (I do / We do / You do)",
    description:
      "Le prof modélise, on fait ensemble, puis l’élève s’entraîne (progressif).",
    promptBlock:
      "MÉTHODE PÉDAGOGIQUE : ENSEIGNEMENT EXPLICITE (I do / We do / You do)\n" +
      "- I DO : tu modélises 1 exemple complet (méthode + verbalisation).\n" +
      "- WE DO : 1 à 2 questions guidées avec réponses partielles attendues.\n" +
      "- YOU DO : 3 exercices autonomes (base/standard/défi) + correction.\n" +
      "- Tu vérifies la compréhension avec 2 questions flash.\n\n",
  },
  {
    id: "inductive",
    label: "Méthode inductive",
    description:
      "On part d’exemples concrets pour faire émerger la règle, puis on généralise.",
    promptBlock:
      "MÉTHODE PÉDAGOGOGIQUE : INDUCTIVE\n" +
      "- Tu proposes 2 à 4 exemples concrets.\n" +
      "- Tu demandes à l’élève d’observer et formuler une règle.\n" +
      "- Tu confirmes, tu corriges, puis tu formalises la règle.\n" +
      "- Tu donnes ensuite des exercices gradués.\n\n",
  },
  {
    id: "deductive",
    label: "Méthode déductive",
    description:
      "On part de la règle, puis exemples d’application, puis entraînement progressif.",
    promptBlock:
      "MÉTHODE PÉDAGOGIQUE : DÉDUCTIVE\n" +
      "- Tu donnes la règle clairement (définition + conditions d’application).\n" +
      "- Tu fais 1 exemple guidé.\n" +
      "- Puis 3 exercices gradués (base/standard/défi).\n" +
      "- Tu termines par une mini-fiche méthode.\n\n",
  },
  {
    id: "par_projet",
    label: "Pédagogie par projet",
    description:
      "Une production finale, des étapes, des critères, et un bilan réflexif.",
    promptBlock:
      "MÉTHODE PÉDAGOGIQUE : PAR PROJET\n" +
      "- Tu définis une production finale concrète (livrable).\n" +
      "- Tu découpes en étapes avec jalons et critères.\n" +
      "- Tu précises : matériel, rôles, timing.\n" +
      "- Tu termines par un bilan + auto-évaluation.\n\n",
  },
  {
    id: "par_problemes",
    label: "Apprentissage par problèmes",
    description:
      "Problème authentique → stratégies → outils au bon moment → méthode.",
    promptBlock:
      "MÉTHODE PÉDAGOGIQUE : PAR PROBLÈMES (PBL)\n" +
      "- Tu démarres par un problème authentique (contexte réel).\n" +
      "- Tu fais expliciter les hypothèses et stratégies.\n" +
      "- Tu apportes les outils uniquement au moment du besoin.\n" +
      "- Tu conclus par une méthode réutilisable + variantes.\n\n",
  },
  {
    id: "cooperative",
    label: "Pédagogie coopérative",
    description:
      "Groupes, rôles, production commune, explication entre pairs.",
    promptBlock:
      "MÉTHODE PÉDAGOGIQUE : COOPÉRATIVE\n" +
      "- Tu proposes un travail en groupes avec rôles (scribe, rapporteur, gardien du temps, etc.).\n" +
      "- Tu fournis une consigne claire + critères de réussite.\n" +
      "- Tu prévois une mise en commun + correction collective.\n" +
      "- Tu ajoutes une trace écrite finale.\n\n",
  },
  {
    id: "ludique",
    label: "Approche ludique / gamification",
    description:
      "Défis, missions courtes, progression visible, sans perdre la rigueur.",
    promptBlock:
      "MÉTHODE PÉDAGOGIQUE : LUDIQUE / GAMIFICATION\n" +
      "- Tu structures en missions courtes (1 à 3 min chacune).\n" +
      "- Tu mets des niveaux : novice → confirmé → boss final.\n" +
      "- Tu gardes la rigueur et expliques les erreurs fréquentes.\n" +
      "- Tu termines par un mini-score / auto-évaluation.\n\n",
  },
  {
    id: "magistrale",
    label: "Cours magistral guidé",
    description:
      "Cours structuré + questions de vérification + entraînement final.",
    promptBlock:
      "MÉTHODE PÉDAGOGIQUE : MAGISTRALE GUIDÉE\n" +
      "- Tu fais un cours structuré en parties courtes.\n" +
      "- Tu intercales des questions de vérification.\n" +
      "- Tu finis par des exercices d’application + correction.\n\n",
  },
] as const;

/**
 * ✅ Map pour lookup O(1) + helpers robustes
 */
const METHODES_BY_ID: Readonly<Record<MethodePedagogique, MethodeOption>> =
  METHODES.reduce((acc, m) => {
    acc[m.id] = m;
    return acc;
  }, {} as Record<MethodePedagogique, MethodeOption>);

/** Type guard utile quand tu lis depuis la DB ou un querystring */
export function isMethodePedagogique(x: unknown): x is MethodePedagogique {
  return typeof x === "string" && (x as MethodePedagogique) in METHODES_BY_ID;
}

export function getMethodeOption(id: MethodePedagogique): MethodeOption {
  return METHODES_BY_ID[id] ?? METHODES_BY_ID[DEFAULT_METHODE];
}

export function getMethodeLabel(id: MethodePedagogique): string {
  return getMethodeOption(id).label;
}

export function getMethodeDesc(id: MethodePedagogique): string {
  return getMethodeOption(id).description;
}

export function getMethodePromptBlock(id: MethodePedagogique): string {
  return getMethodeOption(id).promptBlock;
}
