import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export const anglesBank: TutorBankItemV4[] = [
  // =========================
  // ANGLE_RECONNAITRE
  // =========================
  {
    kind: "fixed",
    id: "angle_reconnaitre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Un angle est formé par combien de demi-droites ?",
    format: "short",
    expected: ["2", "deux"],
    comparator: "contains_keyword",
    hint: "Elles ont la même origine.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle est formé par deux demi-droites qui partent du même point. Ce point commun s’appelle le sommet de l’angle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "reconnaitre"],
  },
  {
    kind: "fixed",
    id: "angle_reconnaitre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Comment s’appelle le point commun aux deux côtés d’un angle ?",
    format: "short",
    expected: ["sommet", "le sommet"],
    comparator: "contains_keyword",
    hint: "C’est le point de départ des deux demi-droites.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Les deux côtés d’un angle partent du même point. Ce point commun s’appelle le sommet.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "reconnaitre", "vocabulaire"],
  },
  {
    kind: "fixed",
    id: "angle_reconnaitre_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Un angle est formé par :",
    format: "qcm",
    choices: [
      "deux segments sans lien",
      "deux demi-droites de même origine",
      "trois droites",
      "un cercle et un segment",
    ],
    expected: ["deux demi-droites de même origine"],
    comparator: "mcq_exact",
    hint: "Les deux côtés partent du même point.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle est formé par deux demi-droites de même origine. Leur point commun est le sommet.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_reconnaitre_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un angle, le point commun aux deux côtés est :",
    format: "qcm",
    choices: ["le milieu", "le centre", "le sommet", "la base"],
    expected: ["le sommet"],
    comparator: "mcq_exact",
    hint: "C’est le point où les deux côtés se rencontrent.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Le point commun aux deux côtés d’un angle s’appelle le sommet.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "reconnaitre", "qcm"],
  },

  // =========================
  // ANGLE_DROIT
  // =========================
  {
    kind: "fixed",
    id: "angle_droit_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 1,
    theme: "neutral",
    text: "Un angle droit mesure combien de degrés ?",
    format: "short",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "Le coin d’un carré mesure 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle droit a toujours la même mesure : 90 degrés. On le retrouve par exemple dans les coins d’un carré ou d’un rectangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_droit_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 1,
    theme: "neutral",
    text: "Complète : un angle droit mesure ___ degrés.",
    format: "short",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "Un angle droit vaut toujours 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Par définition, un angle droit mesure 90 degrés.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_droit_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la mesure d’un angle droit ?",
    format: "short",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "Toujours 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle droit se reconnaît à sa mesure : 90°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_droit_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 2,
    theme: "neutral",
    text: "Parmi ces mesures, laquelle correspond à un angle droit ?",
    format: "qcm",
    choices: ["45°", "90°", "100°", "180°"],
    expected: ["90°"],
    comparator: "mcq_exact",
    hint: "Un angle droit mesure 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Parmi les mesures proposées, seule 90° correspond à un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "angle_droit", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_droit_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 2,
    theme: "neutral",
    text: "Choisis la mesure d’un angle droit.",
    format: "qcm",
    choices: ["60°", "90°", "120°", "150°"],
    expected: ["90°"],
    comparator: "mcq_exact",
    hint: "Le bon choix est 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle droit ne mesure ni 60°, ni 120°, ni 150°. Il mesure exactement 90°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "angle_droit", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_droit_qcm_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 2,
    theme: "neutral",
    text: "Quel angle a la même mesure qu’un coin de rectangle ?",
    format: "qcm",
    choices: ["45°", "90°", "135°", "180°"],
    expected: ["90°"],
    comparator: "mcq_exact",
    hint: "Tous les angles d’un rectangle sont droits.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Les coins d’un rectangle sont des angles droits. Ils mesurent donc 90°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "angle_droit", "qcm"],
  },

  // =========================
  // ANGLE_COMPARE
  // =========================
  {
    kind: "fixed",
    id: "angle_comparer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel angle est le plus grand : 30° ou 80° ?",
    format: "short",
    expected: ["80", "80°"],
    comparator: "number_equal",
    hint: "Compare les nombres.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Pour comparer deux angles donnés en degrés, on compare leurs mesures. Comme 80 est plus grand que 30, l’angle de 80° est le plus grand.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel angle est le plus petit : 120° ou 70° ?",
    format: "short",
    expected: ["70", "70°"],
    comparator: "number_equal",
    hint: "Le plus petit angle a la plus petite mesure.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Comme 70 est plus petit que 120, l’angle de 70° est le plus petit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel angle est le plus grand : 45° ou 95° ?",
    format: "short",
    expected: ["95", "95°"],
    comparator: "number_equal",
    hint: "Cherche la plus grande mesure.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("95° est plus grand que 45°. Donc l’angle de 95° est le plus grand.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel angle est le plus petit : 85° ou 55° ?",
    format: "short",
    expected: ["55", "55°"],
    comparator: "number_equal",
    hint: "Compare les deux nombres.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Comme 55 est plus petit que 85, l’angle de 55° est le plus petit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Un angle de 45° est-il plus petit ou plus grand qu’un angle droit ?",
    format: "short",
    expected: ["plus petit", "petit"],
    comparator: "contains_keyword",
    hint: "Un angle droit mesure 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle droit mesure 90°. Comme 45° est inférieur à 90°, un angle de 45° est plus petit qu’un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Un angle de 120° est-il plus petit ou plus grand qu’un angle droit ?",
    format: "short",
    expected: ["plus grand", "grand"],
    comparator: "contains_keyword",
    hint: "Compare 120° à 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle droit mesure 90°. Comme 120° est supérieur à 90°, un angle de 120° est plus grand qu’un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel angle est le plus grand ?",
    format: "qcm",
    choices: ["25°", "65°", "85°", "45°"],
    expected: ["85°"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand nombre.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Parmi 25°, 65°, 85° et 45°, la plus grande mesure est 85°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel angle est le plus petit ?",
    format: "qcm",
    choices: ["110°", "95°", "70°", "100°"],
    expected: ["70°"],
    comparator: "mcq_exact",
    hint: "Cherche le plus petit nombre.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Parmi les mesures proposées, 70° est la plus petite.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_qcm_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Choisis l’angle le plus grand.",
    format: "qcm",
    choices: ["40°", "75°", "55°", "65°"],
    expected: ["75°"],
    comparator: "mcq_exact",
    hint: "Compare les quatre mesures.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("75° est plus grand que 40°, 55° et 65°. C’est donc le plus grand angle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_qcm_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Choisis l’angle le plus petit.",
    format: "qcm",
    choices: ["35°", "25°", "45°", "30°"],
    expected: ["25°"],
    comparator: "mcq_exact",
    hint: "L’angle le plus petit a la mesure la plus petite.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("25° est la plus petite des quatre mesures proposées.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_qcm_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Un angle de 60° est :",
    format: "qcm",
    choices: [
      "plus petit qu’un angle droit",
      "égal à un angle droit",
      "plus grand qu’un angle droit",
      "impossible à savoir",
    ],
    expected: ["plus petit qu’un angle droit"],
    comparator: "mcq_exact",
    hint: "Un angle droit mesure 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Comme 60° est inférieur à 90°, cet angle est plus petit qu’un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "qcm", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_qcm_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Un angle de 100° est :",
    format: "qcm",
    choices: [
      "plus petit qu’un angle droit",
      "égal à un angle droit",
      "plus grand qu’un angle droit",
      "nul",
    ],
    expected: ["plus grand qu’un angle droit"],
    comparator: "mcq_exact",
    hint: "Compare 100° à 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Comme 100° est supérieur à 90°, cet angle est plus grand qu’un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "qcm", "angle_droit"],
  },

  // =========================
  // ANGLE_MESURER
  // =========================
  {
    kind: "fixed",
    id: "angle_mesurer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 1,
    theme: "neutral",
    text: "Avec quel instrument mesure-t-on un angle ?",
    format: "short",
    expected: ["rapporteur", "un rapporteur"],
    comparator: "contains_keyword",
    hint: "C’est l’instrument gradué utilisé en géométrie.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Pour mesurer un angle, on utilise un rapporteur. Il est gradué en degrés.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "mesure", "instrument"],
  },
  {
    kind: "fixed",
    id: "angle_mesurer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "En quelle unité mesure-t-on un angle ?",
    format: "short",
    expected: ["degrés", "degré", "°"],
    comparator: "contains_keyword",
    hint: "On note souvent cette unité avec le symbole °.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("On mesure les angles en degrés. Le symbole utilisé est °.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "mesure", "unite"],
  },
  {
    kind: "fixed",
    id: "angle_mesurer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour mesurer un angle, on utilise :",
    format: "qcm",
    choices: ["une règle", "un compas", "un rapporteur", "une équerre"],
    expected: ["un rapporteur"],
    comparator: "mcq_exact",
    hint: "C’est l’instrument gradué en degrés.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("L’instrument adapté pour mesurer un angle est le rapporteur.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "mesure", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_mesurer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "L’unité de mesure d’un angle est :",
    format: "qcm",
    choices: ["le centimètre", "le degré", "le mètre", "le litre"],
    expected: ["le degré"],
    comparator: "mcq_exact",
    hint: "On écrit souvent 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Les angles se mesurent en degrés. Les autres unités proposées servent à mesurer autre chose.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "mesure", "qcm"],
  },

  // =========================
  // ANGLE_TRACER
  // =========================
  {
    kind: "fixed",
    id: "angle_tracer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel instrument est le plus utile pour tracer un angle de 40° ?",
    format: "short",
    expected: ["rapporteur", "un rapporteur"],
    comparator: "contains_keyword",
    hint: "C’est le même instrument que pour mesurer un angle.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Pour tracer précisément un angle de 40°, on utilise un rapporteur, car il permet de placer la bonne mesure en degrés.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "tracer", "instrument"],
  },
  {
    kind: "fixed",
    id: "angle_tracer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour tracer un angle, il faut d’abord placer : le sommet ou les graduations ?",
    format: "short",
    expected: ["sommet", "le sommet"],
    comparator: "contains_keyword",
    hint: "Les deux côtés partent de ce point.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Pour tracer un angle, on commence par placer le sommet, car les deux côtés de l’angle partent de ce point.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "tracer", "vocabulaire"],
  },
  {
    kind: "fixed",
    id: "angle_tracer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour tracer un angle de 70°, l’instrument le plus adapté est :",
    format: "qcm",
    choices: ["la règle seule", "le compas seul", "le rapporteur", "la gomme"],
    expected: ["le rapporteur"],
    comparator: "mcq_exact",
    hint: "Il permet de lire les degrés.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Le rapporteur est l’instrument adapté pour tracer un angle d’une mesure donnée.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "tracer", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_tracer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour tracer un angle, on part d’abord :",
    format: "qcm",
    choices: [
      "du sommet",
      "de la dernière graduation",
      "du milieu du segment",
      "du nom de la figure",
    ],
    expected: ["du sommet"],
    comparator: "mcq_exact",
    hint: "C’est le point commun des deux côtés.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("On commence par le sommet, car c’est depuis ce point que l’on trace les deux côtés de l’angle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "tracer", "qcm"],
  },

  // =========================
  // ANGLE_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "angle_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Un angle de 90° est-il plus petit, égal ou plus grand qu’un angle droit ?",
    format: "short",
    expected: ["égal", "egal"],
    comparator: "contains_keyword",
    hint: "Un angle droit mesure 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Comme un angle droit mesure exactement 90°, un angle de 90° est égal à un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "defi", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi 35°, 90°, 120° et 75°, quel est l’angle le plus proche d’un angle droit ?",
    format: "short",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "Un angle droit mesure 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle droit mesure 90°. Parmi les valeurs proposées, 90° est exactement un angle droit, donc c’est le plus proche.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "defi", "comparaison"],
  },
  {
    kind: "fixed",
    id: "angle_defi_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel angle est plus petit qu’un angle droit ?",
    format: "qcm",
    choices: ["110°", "90°", "60°", "120°"],
    expected: ["60°"],
    comparator: "mcq_exact",
    hint: "Un angle droit vaut 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle plus petit qu’un angle droit doit mesurer moins de 90°. Parmi les choix, seul 60° convient.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_defi_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel angle est plus grand qu’un angle droit ?",
    format: "qcm",
    choices: ["45°", "75°", "100°", "90°"],
    expected: ["100°"],
    comparator: "mcq_exact",
    hint: "Cherche une mesure supérieure à 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle plus grand qu’un angle droit mesure plus de 90°. Ici, 100° est le bon choix.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_defi_qcm_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Sur une rosace observée à La Réunion, un angle mesure 90°. C’est :",
    format: "qcm",
    choices: [
      "un angle plus petit qu’un angle droit",
      "un angle droit",
      "un angle plus grand qu’un angle droit",
      "un angle plat",
    ],
    expected: ["un angle droit"],
    comparator: "mcq_exact",
    hint: "90° correspond à un angle droit.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle de 90° est exactement un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "defi", "reunion", "qcm"],
  },

  // =========================
  // TEMPLATES - ANGLE_RECONNAITRE
  // =========================
  {
    kind: "template",
    id: "angle_reconnaitre_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Un angle a deux côtés et un sommet.",
    tags: ["angle_mesure", "reconnaitre", "template"],
    generate: () => {
      return {
        text: "Combien de demi-droites forment un angle ?",
        format: "short",
        expected: ["2", "deux"],
        comparator: "contains_keyword",
        explanation:
          "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
          "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
          "Calcul : " +
          ("Un angle est formé par deux demi-droites de même origine.") +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "angle_reconnaitre_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la définition correcte.",
    tags: ["angle_mesure", "reconnaitre", "qcm", "template"],
    generate: () => {
      const choices = shuffle([
        "deux demi-droites de même origine",
        "trois segments",
        "un cercle et une droite",
        "deux droites parallèles",
      ]);

      return {
        text: "Un angle est formé par :",
        format: "qcm",
        choices,
        expected: ["deux demi-droites de même origine"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
          "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
          "Calcul : " +
          ("Un angle est formé par deux demi-droites de même origine.") +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - ANGLE_DROIT
  // =========================
  {
    kind: "template",
    id: "angle_droit_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 1,
    theme: "neutral",
    hint: "Toujours 90°.",
    tags: ["angle_mesure", "angle_droit", "template"],
    generate: () => {
      return {
        text: "Combien mesure un angle droit ?",
        format: "short",
        expected: ["90", "90°"],
        comparator: "number_equal",
        explanation:
          "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
          "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
          "Calcul : " +
          ("Un angle droit mesure toujours 90 degrés.") +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "angle_droit_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 1,
    theme: "neutral",
    hint: "Un angle droit ne change jamais de mesure.",
    tags: ["angle_mesure", "angle_droit", "template"],
    generate: () => {
      return {
        text: "Quelle est la mesure d’un angle droit ?",
        format: "short",
        expected: ["90", "90°"],
        comparator: "number_equal",
        explanation:
          "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
          "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
          "Calcul : " +
          ("Par définition, un angle droit mesure 90°.") +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "angle_droit_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 2,
    theme: "neutral",
    hint: "Un angle droit mesure 90°.",
    tags: ["angle_mesure", "angle_droit", "qcm", "template"],
    generate: () => {
      const choices = shuffle(["90°", "60°", "120°", "180°"]);
      return {
        text: "Choisis la mesure d’un angle droit.",
        format: "qcm",
        choices,
        expected: ["90°"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
          "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
          "Calcul : " +
          ("Un angle droit mesure exactement 90°.") +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "angle_droit_qcm_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche 90°.",
    tags: ["angle_mesure", "angle_droit", "qcm", "template"],
    generate: () => {
      const choices = shuffle(["45°", "90°", "135°", "150°"]);
      return {
        text: "Parmi ces angles, lequel est un angle droit ?",
        format: "qcm",
        choices,
        expected: ["90°"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
          "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
          "Calcul : " +
          ("Parmi les mesures proposées, seule 90° correspond à un angle droit.") +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - ANGLE_COMPARE
  // =========================
  {
    kind: "template",
    id: "angle_comparer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 1,
    theme: "neutral",
    hint: "L’angle le plus grand a la plus grande mesure.",
    tags: ["angle_mesure", "comparaison", "template"],
    generate: () => {
      const values = [20, 30, 40, 50, 60, 70, 80, 90, 100, 110];
      const a = values[Math.floor(Math.random() * values.length)];
      let b = values[Math.floor(Math.random() * values.length)];

      while (b === a) {
        b = values[Math.floor(Math.random() * values.length)];
      }

      const max = Math.max(a, b);
      const min = Math.min(a, b);

      return {
        text: `Quel angle est le plus grand : ${a}° ou ${b}° ?`,
        format: "short",
        expected: [String(max), `${max}°`],
        comparator: "number_equal",
        explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
          "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
          "Calcul : " +
          (`On compare ${a}° et ${b}°. Comme ${max} est plus grand que ${min}, l’angle le plus grand est ${max}°.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "angle_comparer_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 1,
    theme: "neutral",
    hint: "L’angle le plus petit a la plus petite mesure.",
    tags: ["angle_mesure", "comparaison", "template"],
    generate: () => {
      const values = [20, 30, 40, 50, 60, 70, 80, 90, 100, 110];
      const a = values[Math.floor(Math.random() * values.length)];
      let b = values[Math.floor(Math.random() * values.length)];

      while (b === a) {
        b = values[Math.floor(Math.random() * values.length)];
      }

      const min = Math.min(a, b);
      const max = Math.max(a, b);

      return {
        text: `Quel angle est le plus petit : ${a}° ou ${b}° ?`,
        format: "short",
        expected: [String(min), `${min}°`],
        comparator: "number_equal",
        explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
          "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
          "Calcul : " +
          (`On compare ${a}° et ${b}°. Comme ${min} est plus petit que ${max}, l’angle le plus petit est ${min}°.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "angle_comparer_tpl_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare à 90°.",
    tags: ["angle_mesure", "comparaison", "template", "angle_droit"],
    generate: () => {
      const value = [30, 40, 50, 60, 70, 80][Math.floor(Math.random() * 6)];

      return {
        text: `Un angle de ${value}° est-il plus petit ou plus grand qu’un angle droit ?`,
        format: "short",
        expected: ["plus petit", "petit"],
        comparator: "contains_keyword",
        explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
          "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
          "Calcul : " +
          (`Un angle droit mesure 90°. Comme ${value}° est inférieur à 90°, cet angle est plus petit qu’un angle droit.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "angle_comparer_tpl_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare à 90°.",
    tags: ["angle_mesure", "comparaison", "template", "angle_droit"],
    generate: () => {
      const value = [100, 110, 120, 130, 140][Math.floor(Math.random() * 5)];

      return {
        text: `Un angle de ${value}° est-il plus petit ou plus grand qu’un angle droit ?`,
        format: "short",
        expected: ["plus grand", "grand"],
        comparator: "contains_keyword",
        explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
          "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
          "Calcul : " +
          (`Un angle droit mesure 90°. Comme ${value}° est supérieur à 90°, cet angle est plus grand qu’un angle droit.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "angle_comparer_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare toutes les mesures proposées.",
    tags: ["angle_mesure", "comparaison", "qcm", "template"],
    generate: () => {
      const values = [25, 35, 45, 55, 65, 75, 85, 95];
      const all = shuffle(values).slice(0, 4);
      const good = Math.max(...all);
      const choices = shuffle(all.map((n) => `${n}°`));

      return {
        text: "Choisis l’angle le plus grand.",
        format: "qcm",
        choices,
        expected: [`${good}°`],
        comparator: "mcq_exact",
        explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
          "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
          "Calcul : " +
          (`Parmi les mesures proposées, ${good}° est la plus grande.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "angle_comparer_qcm_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la plus petite mesure.",
    tags: ["angle_mesure", "comparaison", "qcm", "template"],
    generate: () => {
      const values = [20, 30, 40, 50, 60, 70, 80, 90];
      const all = shuffle(values).slice(0, 4);
      const good = Math.min(...all);
      const choices = shuffle(all.map((n) => `${n}°`));

      return {
        text: "Choisis l’angle le plus petit.",
        format: "qcm",
        choices,
        expected: [`${good}°`],
        comparator: "mcq_exact",
        explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
          "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
          "Calcul : " +
          (`Parmi les mesures proposées, ${good}° est la plus petite.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "angle_comparer_qcm_tpl_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Tous les angles inférieurs à 90° sont plus petits qu’un angle droit.",
    tags: ["angle_mesure", "comparaison", "qcm", "template", "angle_droit"],
    generate: () => {
      const value = [35, 45, 55, 65, 75, 85][Math.floor(Math.random() * 6)];

      return {
        text: `Un angle de ${value}° est :`,
        format: "qcm",
        choices: shuffle([
          "plus petit qu’un angle droit",
          "égal à un angle droit",
          "plus grand qu’un angle droit",
          "plat",
        ]),
        expected: ["plus petit qu’un angle droit"],
        comparator: "mcq_exact",
        explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
          "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
          "Calcul : " +
          (`Comme ${value}° est inférieur à 90°, cet angle est plus petit qu’un angle droit.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "angle_comparer_qcm_tpl_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Tous les angles supérieurs à 90° sont plus grands qu’un angle droit.",
    tags: ["angle_mesure", "comparaison", "qcm", "template", "angle_droit"],
    generate: () => {
      const value = [95, 105, 115, 125, 135][Math.floor(Math.random() * 5)];

      return {
        text: `Un angle de ${value}° est :`,
        format: "qcm",
        choices: shuffle([
          "plus petit qu’un angle droit",
          "égal à un angle droit",
          "plus grand qu’un angle droit",
          "nul",
        ]),
        expected: ["plus grand qu’un angle droit"],
        comparator: "mcq_exact",
        explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
          "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
          "Calcul : " +
          (`Comme ${value}° est supérieur à 90°, cet angle est plus grand qu’un angle droit.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - ANGLE_MESURER
  // =========================
  {
    kind: "template",
    id: "angle_mesurer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 1,
    theme: "neutral",
    hint: "C’est l’instrument utilisé pour lire les degrés.",
    tags: ["angle_mesure", "mesure", "template"],
    generate: () => {
      return {
        text: "Avec quel instrument mesure-t-on un angle ?",
        format: "short",
        expected: ["rapporteur", "un rapporteur"],
        comparator: "contains_keyword",
        explanation:
          "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
          "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
          "Calcul : " +
          ("On mesure un angle avec un rapporteur.") +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "angle_mesurer_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche l’instrument gradué en degrés.",
    tags: ["angle_mesure", "mesure", "qcm", "template"],
    generate: () => {
      const choices = shuffle([
        "une règle",
        "un compas",
        "un rapporteur",
        "une gomme",
      ]);

      return {
        text: "Quel instrument permet de mesurer un angle ?",
        format: "qcm",
        choices,
        expected: ["un rapporteur"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
          "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
          "Calcul : " +
          ("Le rapporteur est l’instrument gradué qui sert à mesurer les angles.") +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - ANGLE_TRACER
  // =========================
  {
    kind: "template",
    id: "angle_tracer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 2,
    theme: "neutral",
    hint: "On utilise l’instrument gradué en degrés.",
    tags: ["angle_mesure", "tracer", "template"],
    generate: () => {
      const value = [30, 40, 50, 60, 70, 80, 100, 120][
        Math.floor(Math.random() * 8)
      ];

      return {
        text: `Quel instrument est utile pour tracer un angle de ${value}° ?`,
        format: "short",
        expected: ["rapporteur", "un rapporteur"],
        comparator: "contains_keyword",
        explanation: "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
          "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
          "Calcul : " +
          (`Pour tracer un angle de ${value}°, on utilise un rapporteur afin de placer correctement la mesure.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "angle_tracer_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 2,
    theme: "neutral",
    hint: "L’angle part d’un point commun aux deux côtés.",
    tags: ["angle_mesure", "tracer", "qcm", "template"],
    generate: () => {
      return {
        text: "Pour tracer un angle, on commence par :",
        format: "qcm",
        choices: shuffle([
          "du sommet",
          "de la dernière graduation",
          "du milieu",
          "du bord de la feuille",
        ]),
        expected: ["du sommet"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
          "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
          "Calcul : " +
          ("On commence par placer le sommet, car les deux côtés de l’angle partent de ce point.") +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - ANGLE_DEFIS
  // =========================
  {
    kind: "template",
    id: "angle_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare à 90°.",
    tags: ["angle_mesure", "defi", "template"],
    generate: () => {
      const value = [40, 60, 75, 90, 100, 120][
        Math.floor(Math.random() * 6)
      ];

      let expected: string[] = [];
      let explanation = "";

      if (value < 90) {
        expected = ["plus petit", "petit"];
        explanation = `Comme ${value}° est inférieur à 90°, cet angle est plus petit qu’un angle droit.`;
      } else if (value === 90) {
        expected = ["égal", "egal"];
        explanation = `Comme ${value}° = 90°, cet angle est égal à un angle droit.`;
      } else {
        expected = ["plus grand", "grand"];
        explanation = `Comme ${value}° est supérieur à 90°, cet angle est plus grand qu’un angle droit.`;
      }

      return {
        text: `Un angle de ${value}° est-il plus petit, égal ou plus grand qu’un angle droit ?`,
        format: "short",
        expected,
        comparator: "contains_keyword",
        explanation,
      };
    },
  },
  {
    kind: "template",
    id: "angle_defi_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche la mesure inférieure à 90°.",
    tags: ["angle_mesure", "defi", "qcm", "template"],
    generate: () => {
      const choices = shuffle(["40°", "90°", "110°", "120°"]);

      return {
        text: "Quel angle est plus petit qu’un angle droit ?",
        format: "qcm",
        choices,
        expected: ["40°"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
          "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
          "Calcul : " +
          ("Un angle plus petit qu’un angle droit doit mesurer moins de 90°. Ici, 40° est le bon choix.") +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
];