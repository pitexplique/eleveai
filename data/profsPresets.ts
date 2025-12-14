// data/profsPresets.ts

export type NiveauProf = "basique" | "standard" | "expert";

export type MethodeProf =
  | "methode_active"
  | "enseignement_explicite"
  | "inductive"
  | "deductive"
  | "par_projet"
  | "par_problemes"
  | "cooperative"
  | "ludique"
  | "magistrale";

export type OutputStyleProf = "simple" | "word" | "word_expert";

export type TonaliteProf =
  | "neutre"
  | "bienveillante"
  | "motivation"
  | "institutionnelle"
  | "ludique";

export type ModaliteEvaluationProf =
  | "evaluation_sommative"
  | "evaluation_formative"
  | "evaluation_diagnostique"
  | "evaluation_differenciee";

export type ProfsPresetKey =
  | "6e_maths_fractions_remediation"
  | "3e_maths_brevet_global"
  | "2nde_maths_fonctions"
  | "1re_spe_maths_second_degre"
  | "term_spe_maths_annale_bac"
  | "1re_francais_lecture_analytique"
  | "term_philo_dissertation"
  | "2nde_physique_mouvements"
  // ✅ Devoirs 6e/5e
  | "6e_maths_devoir_calcul_fractions"
  | "6e_maths_devoir_geometrie_angles"
  | "6e_maths_devoir_proportionnalite"
  | "5e_maths_devoir_fractions_decimaux"
  | "5e_maths_devoir_proportionnalite_pourcentages"
  | "5e_maths_devoir_geometrie_triangles"
  // ✅ Ultra demandés
  | "6e_maths_devoir_operations_problemes"
  | "4e_maths_devoir_calcul_litteral"
  | "4e_maths_devoir_equations";

export type ProfsPresetValues = {
  titre?: string;
  objectifPedagogique?: string;
  classe?: string;
  matiere?: string;
  niveau?: NiveauProf;
  type?: string;
  contenu?: string;
  tags?: string[];
  adaptationDYS?: boolean;
  neuro?: boolean;

  methode?: MethodeProf; // ✅ on le met surtout pour séances; pour devoirs, on l’omet
  outputStyle?: OutputStyleProf;

  dureeMin?: number;
  tonalite?: TonaliteProf;
  modaliteEvaluation?: ModaliteEvaluationProf;
};

// ✅ helper : pack devoir standardisé (barème / temps / critères / erreurs)
function packDevoirStandard(opts: {
  dureeMin: number;
  totalPoints?: number;
  materiel?: string;
  structure?: string;
}) {
  const total = opts.totalPoints ?? 20;
  return (
    `\n\nCONTRAINTES DEVOIR (standard EleveAI) :\n` +
    `- Durée : ${opts.dureeMin} min\n` +
    `- Total : /${total}\n` +
    (opts.materiel ? `- Matériel autorisé : ${opts.materiel}\n` : "") +
    `- Exiger : barème détaillé (points par question), consignes courtes, espaces de réponse, total points visible.\n` +
    `- Ajouter une répartition indicative du temps par exercice.\n` +
    `- Ajouter une partie différenciation : Base / Standard / Défi (ou bonus).\n` +
    `- Ajouter “Pour l’enseignant” : critères de réussite + erreurs fréquentes + mini-grille de correction.\n` +
    (opts.structure ? `- Structure attendue : ${opts.structure}\n` : "")
  );
}

export const PROFS_PRESETS: Record<
  ProfsPresetKey,
  { label: string; description: string; valeurs: ProfsPresetValues }
> = {
  /* ------------------------------------------------------------
     EXISTANTS (tags uniformisés)
  ------------------------------------------------------------ */

  "6e_maths_fractions_remediation": {
    label: "🟣 6e – Fractions (remédiation)",
    description: "Reprendre les bases des fractions avec manipulation + exemples concrets.",
    valeurs: {
      titre: "6e – Revoir les fractions en douceur",
      classe: "6e",
      matiere: "Mathématiques",
      niveau: "basique",
      type: "Génération d’exercices",
      objectifPedagogique:
        "Comprendre le sens des fractions simples et les comparer, via des situations concrètes (partages, recettes…).",
      contenu:
        "Je voudrais une fiche guidée sur les fractions en 6e (représentation, comparaison, simplification) avec beaucoup d’exemples concrets et une progression très douce.",
      tags: ["#6e", "#maths", "#exercices", "#fractions", "#remediation", "#DYS"],
      adaptationDYS: true,
      neuro: true,
      methode: "methode_active",
      outputStyle: "word",
      dureeMin: 45,
      tonalite: "bienveillante",
    },
  },

  "3e_maths_brevet_global": {
    label: "📘 3e – Brevet (sujet complet / 2h)",
    description: "Sujet type brevet : calcul, fonctions, stats, proba.",
    valeurs: {
      titre: "3e – Révision globale brevet maths",
      classe: "3e",
      matiere: "Mathématiques",
      niveau: "standard",
      type: "Préparation d’un sujet type brevet",
      objectifPedagogique:
        "Réviser les compétences clés du brevet à travers un sujet structuré + barème.",
      contenu:
        "Je souhaite un sujet type brevet en maths pour une 3e : calcul, fonctions, statistiques et probabilités, avec barème et corrigé détaillé.",
      tags: ["#3e", "#maths", "#brevet", "#evaluation", "#DNB"],
      adaptationDYS: true,
      neuro: true,
      outputStyle: "word_expert",
      dureeMin: 120,
      tonalite: "institutionnelle",
      modaliteEvaluation: "evaluation_sommative",
    },
  },

  "2nde_maths_fonctions": {
    label: "📈 Seconde – Fonctions (séance)",
    description: "Séance de découverte/réactivation + exercices progressifs.",
    valeurs: {
      titre: "Seconde – Introduction aux fonctions",
      classe: "Seconde",
      matiere: "Mathématiques",
      niveau: "standard",
      type: "Préparation d’une séance",
      objectifPedagogique:
        "Revoir la notion de fonction, lecture graphique, tableaux de valeurs, interprétation.",
      contenu:
        "Préparer une séance de découverte/réactivation sur les fonctions en Seconde, avec accroche, activités courtes, puis 4 à 6 exercices progressifs.",
      tags: ["#seconde", "#maths", "#seance", "#fonctions"],
      adaptationDYS: true,
      neuro: true,
      methode: "enseignement_explicite",
      outputStyle: "word",
      dureeMin: 55,
      tonalite: "neutre",
    },
  },

  "1re_spe_maths_second_degre": {
    label: "🧮 1re spé – Second degré (séance)",
    description: "Formes, sommet, racines, variations, méthode.",
    valeurs: {
      titre: "1re spé – Fonctions du second degré",
      classe: "Première",
      matiere: "Mathématiques",
      niveau: "standard",
      type: "Préparation d’une séance",
      objectifPedagogique:
        "Passer entre formes développée/canonique/factorisée et interpréter les paramètres.",
      contenu:
        "Je veux une séance complète sur les fonctions du second degré pour une 1re spé : cours + exercices différenciés + erreurs fréquentes.",
      tags: ["#premiere", "#maths", "#seance", "#second_degre"],
      adaptationDYS: true,
      neuro: true,
      methode: "enseignement_explicite",
      outputStyle: "word_expert",
      dureeMin: 55,
      tonalite: "neutre",
    },
  },

  "term_spe_maths_annale_bac": {
    label: "🎓 Terminale spé – Bac (sujet complet / 4h)",
    description: "Sujet bac complet + corrigé rédigé + méthode.",
    valeurs: {
      titre: "Terminale spé – Sujet type bac complet",
      classe: "Terminale",
      matiere: "Mathématiques",
      niveau: "expert",
      type: "Préparation d’un sujet type bac",
      objectifPedagogique:
        "Préparer à l’épreuve écrite avec un sujet complet + corrigé commenté.",
      contenu:
        "Génère un sujet type bac complet de spé maths Terminale (3 ou 4 exos variés), avec corrigé détaillé et commentaires méthodologiques.",
      tags: ["#terminale", "#maths", "#bac", "#evaluation", "#annale"],
      adaptationDYS: false,
      neuro: true,
      outputStyle: "word_expert",
      dureeMin: 240,
      tonalite: "institutionnelle",
      modaliteEvaluation: "evaluation_sommative",
    },
  },

  "1re_francais_lecture_analytique": {
    label: "📚 1re – Lecture analytique (français)",
    description: "Lecture analytique guidée pour l’oral.",
    valeurs: {
      titre: "Première – Lecture analytique pour l’oral",
      classe: "Première",
      matiere: "Français",
      niveau: "standard",
      type: "Préparation de lecture analytique",
      objectifPedagogique:
        "Structurer une lecture analytique (intro, axes, procédés, bilan, ouverture).",
      contenu:
        "Je souhaite une lecture analytique guidée d’un extrait (niveau 1re), avec questions, axes d’analyse et une préparation à l’oral.",
      tags: ["#premiere", "#francais", "#oral", "#lecture_analytique"],
      adaptationDYS: true,
      neuro: true,
      methode: "inductive",
      outputStyle: "word_expert",
      dureeMin: 55,
      tonalite: "bienveillante",
    },
  },

  "term_philo_dissertation": {
    label: "💭 Terminale – Dissertation (philo)",
    description: "Méthode + plan + exemple guidé.",
    valeurs: {
      titre: "Terminale – Dissertation de philosophie",
      classe: "Terminale",
      matiere: "Philosophie",
      niveau: "standard",
      type: "Préparation d’un sujet de dissertation",
      objectifPedagogique:
        "Problématiser, construire un plan, exemples, transitions, conclusion.",
      contenu:
        "Préparer une fiche méthode + un exemple guidé de dissertation de philosophie sur un sujet classique (liberté, justice, bonheur…).",
      tags: ["#terminale", "#philo", "#dissertation", "#methode"],
      adaptationDYS: true,
      neuro: true,
      methode: "deductive",
      outputStyle: "word",
      dureeMin: 60,
      tonalite: "neutre",
    },
  },

  "2nde_physique_mouvements": {
    label: "🔬 Seconde – Mouvements (physique)",
    description: "Activité + exercices sur mouvements rectilignes.",
    valeurs: {
      titre: "Seconde – Mouvements en physique",
      classe: "Seconde",
      matiere: "Physique-Chimie",
      niveau: "standard",
      type: "Conception d’activité expérimentale",
      objectifPedagogique:
        "Découvrir vitesse moyenne, graphique distance-temps, mouvement rectiligne.",
      contenu:
        "Je veux une activité expérimentale simple sur les mouvements en Seconde (graphique distance-temps, vitesse moyenne) suivie de quelques exercices d’application.",
      tags: ["#seconde", "#physique", "#activite", "#mouvements"],
      adaptationDYS: true,
      neuro: true,
      methode: "par_problemes",
      outputStyle: "word",
      dureeMin: 55,
      tonalite: "neutre",
    },
  },

  /* ------------------------------------------------------------
     ✅ DEVOIRS 6e / 5e (SANS methode, tags uniformisés, pack devoir)
  ------------------------------------------------------------ */

  "6e_maths_devoir_calcul_fractions": {
    label: "🧾 6e – Devoir 45 min (calcul + fractions)",
    description: "Calcul simple + fractions : représentation, comparaison, fraction d’une quantité.",
    valeurs: {
      titre: "6e – Devoir : calcul + fractions",
      classe: "6e",
      matiere: "Mathématiques",
      niveau: "standard",
      type: "Préparation d’un devoir",
      objectifPedagogique:
        "Évaluer calculs simples, sens d’une fraction, comparaison, et résolution de petits problèmes.",
      contenu:
        "Je veux un devoir de 45 min en 6e sur calcul (priorités simples), fractions (représentation, comparaison, fraction d’une quantité) et 1-2 problèmes courts." +
        packDevoirStandard({
          dureeMin: 45,
          materiel: "règle, crayon ; pas de calculatrice",
          structure: "3 exercices progressifs + 1 mini-problème + bonus défi",
        }),
      tags: ["#6e", "#maths", "#devoir", "#evaluation", "#fractions", "#calcul", "#DYS"],
      adaptationDYS: true,
      neuro: true,
      outputStyle: "word_expert",
      dureeMin: 45,
      tonalite: "institutionnelle",
      modaliteEvaluation: "evaluation_differenciee",
    },
  },

  "6e_maths_devoir_geometrie_angles": {
    label: "📐 6e – Devoir 45 min (angles + constructions)",
    description: "Mesurer/nommer/construire des angles + parallèles/perpendiculaires.",
    valeurs: {
      titre: "6e – Devoir : géométrie (angles et constructions)",
      classe: "6e",
      matiere: "Mathématiques",
      niveau: "standard",
      type: "Préparation d’un devoir",
      objectifPedagogique:
        "Évaluer la maîtrise des instruments, mesure et construction d’angles, vocabulaire géométrique.",
      contenu:
        "Devoir 45 min : angles (mesurer/nommer/construire), droites parallèles/perpendiculaires, 1 construction guidée." +
        packDevoirStandard({
          dureeMin: 45,
          materiel: "règle, équerre, rapporteur, compas",
          structure: "3 exercices progressifs + bonus",
        }),
      tags: ["#6e", "#maths", "#devoir", "#evaluation", "#geometrie", "#angles", "#DYS"],
      adaptationDYS: true,
      neuro: true,
      outputStyle: "word_expert",
      dureeMin: 45,
      tonalite: "institutionnelle",
      modaliteEvaluation: "evaluation_differenciee",
    },
  },

  "6e_maths_devoir_proportionnalite": {
    label: "🧾 6e – Devoir 40 min (proportionnalité)",
    description: "Tableaux, prix, recettes, repérer le non-proportionnel.",
    valeurs: {
      titre: "6e – Devoir : proportionnalité",
      classe: "6e",
      matiere: "Mathématiques",
      niveau: "standard",
      type: "Préparation d’un devoir",
      objectifPedagogique:
        "Évaluer reconnaissance d’une situation de proportionnalité et utilisation d’un tableau.",
      contenu:
        "Devoir 40 min : tableaux de proportionnalité (compléter/raisonner), problèmes de prix/quantités, recettes (double/triple), + 1 exercice piège (non proportionnel)." +
        packDevoirStandard({
          dureeMin: 40,
          materiel: "règle ; pas de calculatrice",
          structure: "2 exos proportionnels + 1 exo piège + 1 problème",
        }),
      tags: ["#6e", "#maths", "#devoir", "#evaluation", "#proportionnalite", "#tableaux", "#DYS"],
      adaptationDYS: true,
      neuro: true,
      outputStyle: "word_expert",
      dureeMin: 40,
      tonalite: "institutionnelle",
      modaliteEvaluation: "evaluation_sommative",
    },
  },

  "5e_maths_devoir_fractions_decimaux": {
    label: "🧾 5e – Devoir 55 min (fractions + décimaux)",
    description: "Comparer/ordonner, conversions, calculs, problème de partage.",
    valeurs: {
      titre: "5e – Devoir : fractions et décimaux",
      classe: "5e",
      matiere: "Mathématiques",
      niveau: "standard",
      type: "Préparation d’un devoir",
      objectifPedagogique:
        "Évaluer conversions, comparaison, calculs simples avec fractions/décimaux, et problèmes.",
      contenu:
        "Devoir 55 min : conversions, comparer/ordonner, calculs simples (avec simplifications raisonnables), 1 problème de partage." +
        packDevoirStandard({
          dureeMin: 55,
          materiel: "règle ; calculatrice selon ton choix (à préciser dans le sujet)",
          structure: "3 exos + 1 problème + bonus",
        }),
      tags: ["#5e", "#maths", "#devoir", "#evaluation", "#fractions", "#decimaux", "#DYS"],
      adaptationDYS: true,
      neuro: true,
      outputStyle: "word_expert",
      dureeMin: 55,
      tonalite: "institutionnelle",
      modaliteEvaluation: "evaluation_differenciee",
    },
  },

  "5e_maths_devoir_proportionnalite_pourcentages": {
    label: "🧾 5e – Devoir 55 min (proportionnalité + %)",
    description: "Tableaux, coefficient, pourcentages simples, problème contextualisé.",
    valeurs: {
      titre: "5e – Devoir : proportionnalité et pourcentages",
      classe: "5e",
      matiere: "Mathématiques",
      niveau: "standard",
      type: "Préparation d’un devoir",
      objectifPedagogique:
        "Évaluer proportionnalité (tableaux/coeff), calcul de pourcentages simples, situations concrètes.",
      contenu:
        "Devoir 55 min : proportionnalité (tableaux + coefficient), pourcentages simples (réduction/augmentation), 1 problème contextualisé (courses/remise/sport)." +
        packDevoirStandard({
          dureeMin: 55,
          materiel: "règle ; calculatrice autorisée (à préciser)",
          structure: "3 exos + 1 problème + défi",
        }),
      tags: ["#5e", "#maths", "#devoir", "#evaluation", "#proportionnalite", "#pourcentages", "#DYS"],
      adaptationDYS: true,
      neuro: true,
      outputStyle: "word_expert",
      dureeMin: 55,
      tonalite: "institutionnelle",
      modaliteEvaluation: "evaluation_sommative",
    },
  },

  "5e_maths_devoir_geometrie_triangles": {
    label: "📐 5e – Devoir 55 min (triangles + angles)",
    description: "Constructions, somme des angles, propriétés, justification courte.",
    valeurs: {
      titre: "5e – Devoir : triangles et angles",
      classe: "5e",
      matiere: "Mathématiques",
      niveau: "standard",
      type: "Préparation d’un devoir",
      objectifPedagogique:
        "Évaluer propriétés des triangles, somme des angles, constructions et premières justifications.",
      contenu:
        "Devoir 55 min : construction de triangles (données), calcul d’angles, propriété (isosceles/rectangle) avec justification courte." +
        packDevoirStandard({
          dureeMin: 55,
          materiel: "règle, équerre, rapporteur, compas",
          structure: "3 exos + bonus",
        }),
      tags: ["#5e", "#maths", "#devoir", "#evaluation", "#geometrie", "#triangles", "#angles", "#DYS"],
      adaptationDYS: true,
      neuro: true,
      outputStyle: "word_expert",
      dureeMin: 55,
      tonalite: "institutionnelle",
      modaliteEvaluation: "evaluation_differenciee",
    },
  },

  /* ------------------------------------------------------------
     ✅ Ultra demandés
  ------------------------------------------------------------ */

  "6e_maths_devoir_operations_problemes": {
    label: "🧾 6e – Devoir 45 min (opérations + problèmes)",
    description: "4 opérations, priorités simples, problèmes à étapes.",
    valeurs: {
      titre: "6e – Devoir : opérations et problèmes",
      classe: "6e",
      matiere: "Mathématiques",
      niveau: "standard",
      type: "Préparation d’un devoir",
      objectifPedagogique:
        "Évaluer la maîtrise des 4 opérations, priorités simples et la résolution de problèmes.",
      contenu:
        "Devoir 45 min : calculs posés/mentaux, priorités (sans pièges abusifs), 2 problèmes à 1-2 étapes, avec rédaction attendue." +
        packDevoirStandard({
          dureeMin: 45,
          materiel: "règle ; pas de calculatrice",
          structure: "2 exos calcul + 2 problèmes + bonus",
        }),
      tags: ["#6e", "#maths", "#devoir", "#evaluation", "#operations", "#problemes", "#DYS"],
      adaptationDYS: true,
      neuro: true,
      outputStyle: "word_expert",
      dureeMin: 45,
      tonalite: "institutionnelle",
      modaliteEvaluation: "evaluation_differenciee",
    },
  },

  "4e_maths_devoir_calcul_litteral": {
    label: "🧾 4e – Devoir 55 min (calcul littéral)",
    description: "Distributivité, réduction, factorisation simple, erreurs fréquentes.",
    valeurs: {
      titre: "4e – Devoir : calcul littéral",
      classe: "4e",
      matiere: "Mathématiques",
      niveau: "standard",
      type: "Préparation d’un devoir",
      objectifPedagogique:
        "Évaluer distributivité, réduction d’expressions, factorisation simple, substitutions numériques.",
      contenu:
        "Devoir 55 min : réduire/simplifier, développer avec distributivité, factoriser (mise en évidence), + 1 exercice de substitution (valeur de x)." +
        packDevoirStandard({
          dureeMin: 55,
          materiel: "règle ; pas de calculatrice nécessaire",
          structure: "3 exos techniques + 1 exercice contextualisé",
        }),
      tags: ["#4e", "#maths", "#devoir", "#evaluation", "#calcul_litteral", "#distributivite", "#DYS"],
      adaptationDYS: true,
      neuro: true,
      outputStyle: "word_expert",
      dureeMin: 55,
      tonalite: "institutionnelle",
      modaliteEvaluation: "evaluation_sommative",
    },
  },

  "4e_maths_devoir_equations": {
    label: "🧾 4e – Devoir 55 min (équations)",
    description: "Équations du 1er degré, mise en équation, problèmes.",
    valeurs: {
      titre: "4e – Devoir : équations (1er degré)",
      classe: "4e",
      matiere: "Mathématiques",
      niveau: "standard",
      type: "Préparation d’un devoir",
      objectifPedagogique:
        "Évaluer la résolution d’équations du 1er degré et la mise en équation de problèmes simples.",
      contenu:
        "Devoir 55 min : résoudre des équations du type ax+b=c et ax+b=cx+d, + 1 à 2 problèmes de mise en équation avec vérification." +
        packDevoirStandard({
          dureeMin: 55,
          materiel: "règle ; pas de calculatrice nécessaire",
          structure: "3 exos équations + 1-2 problèmes",
        }),
      tags: ["#4e", "#maths", "#devoir", "#evaluation", "#equations", "#problemes", "#DYS"],
      adaptationDYS: true,
      neuro: true,
      outputStyle: "word_expert",
      dureeMin: 55,
      tonalite: "institutionnelle",
      modaliteEvaluation: "evaluation_differenciee",
    },
  },
};
