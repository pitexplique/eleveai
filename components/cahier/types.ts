/* Types partagés des cahiers de vacances (un fichier de données par niveau). */

export type Jour = {
  numero: number;
  semaine: number;
  badge: string;
  maths: {
    /** Chaque calcul porte sa réponse → corrigés fiables et faciles à étendre. */
    calcul: { q: string; r: string }[];
    probleme: { enonce: string; correction: string };
    illu: { emoji: string; label: string };
  };
  francais: {
    regleTitre: string;
    regle: string;
    consigne: string;
    items: string[];
    correction: string;
  };
  mot: { mot: string; nature: string; definition: string; exemple: string };
  geste: { titre: string; texte: string };
  defi: { enonce: string; correction: string };
};

export type Etape = {
  semaine: number;
  etape: number;
  emoji: string;
  lieu: string;
  intro: string;
};

/** Rubrique « Comprendre le monde » : un thème par jour (Histoire / Écologie /
 *  Futur) pour ouvrir le cahier sur le monde réel. Optionnel : un cahier qui ne
 *  la fournit pas n'affiche tout simplement pas le bloc. */
export type MondeDemain = {
  theme: "histoire" | "ecologie" | "futur";
  titre: string;
  texte: string;
  question: string;
};

/** Données complètes d'un cahier (un niveau). */
export type CahierData = {
  jours: Jour[];
  parcours: Etape[];
  defisExpert: Record<number, { enonce: string; correction: string }>;
  carnet: Record<number, string>;
  leSaviasTu: Record<number, { portee: "local" | "monde"; texte: string }>;
  /** Rubrique Histoire / Écologie / Futur (optionnelle, gatée par sa présence). */
  mondeDemain?: Record<number, MondeDemain>;
};

/** Libellés propres à chaque niveau (le reste du moteur est commun). */
export type CahierConfig = {
  /** Slug de la route, ex. "vers-la-6e" / "vers-le-cm2". */
  slug: string;
  /** Titre affiché, ex. "Vers la 6ᵉ" / "Vers le CM2". */
  titre: string;
  /** Sous-titre, ex. "Pour réviser tout l'été après le CM2". */
  sousTitre: string;
  /** Badge mission, ex. "En route vers la 6ᵉ". */
  mission: string;
  /** Titre du parcours (page de garde). */
  parcoursTitre: string;
  /** Pastille de fin du parcours, ex. "🎓 La 6ᵉ !". */
  chipFin: string;
  /** Classe pour le lien Coach IA, ex. "6e" / "cm2". */
  coachClasse: string;
};
