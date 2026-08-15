// LES ITEMS LIBÉRÉS DE L'ÉVALUATION NATIONALE DE 4ᵉ — MATHÉMATIQUES.
//
// Source : les six ressources d'accompagnement Éduscol « Exploitation des
// évaluations nationales de 4ᵉ — Accompagnement personnalisé en mathématiques,
// fiche professeur », juillet 2023, transmises par Frédéric le 15/08/2026.
//
// ⭐ CE QUI FAIT LEUR VALEUR, CE N'EST PAS L'ÉNONCÉ, C'EST LE DISTRACTEUR.
// Chaque fiche donne, pour chaque mauvaise réponse, la méprise qui y conduit —
// analyse faite « en collaboration avec la DEPP ». C'est exactement ce que
// porte `choiceDiagnostics`, et c'est ce qui distingue un piège écrit au
// jugé d'un piège MESURÉ sur une cohorte nationale. Les causes ci-dessous
// sont reformulées pour être lues par un élève, jamais inventées.
//
// ⚠️ POURQUOI CES ITEMS SONT EN 5ᵉ. L'épreuve blanche de 4ᵉ pioche dans la
// banque de 5ᵉ (voir lib/eval-nationale/4e-maths.ts) : l'évaluation de rentrée
// mesure ce que l'élève emporte de l'année d'avant. Ces items sont donc
// rattachés aux notions et micro-compétences de 5ᵉ, et ils servent aussi au
// coach de 5ᵉ — c'est la même banque.
//
// ⚠️ L'ÉTIQUETTE D'ORIGINE EST PORTÉE PAR UN TAG. L'évaluation officielle
// range chacune de ses questions dans l'une de deux familles, et deux
// seulement (Frédéric, 15/08 : « sur les 50 questions c'est soit résolution
// pb soit automatisme ») : `eval4e_automatismes` ou `eval4e_resolution`.
// C'est cette étiquette qui décidera du droit à la calculatrice le jour où on
// l'ouvrira — sur les automatismes, elle n'est pas autorisée.
//
// ⛔ SIX ITEMS OFFICIELS NE SONT PAS ICI, et c'est délibéré :
//   • « 43 milliers = … dizaines » — numération décimale : aucune notion de
//     5ᵉ ne la porte (les 18 notions vont des relatifs aux probabilités).
//   • « Dans quelle figure a-t-on colorié 3/4 ? » — l'item montre QUATRE
//     figures à comparer ; `CanvasRenderer` en rend une par question.
//   • « Exprimer l'aire de la surface hachurée en fonction de a et b » — la
//     figure demande des cotes nommées (a, b, 3) sur les côtés ;
//     `figure_libre` remplit des cases, il ne cote pas.
//   • Les trois conversions (135 min = 2 h 15, 75 L = 7 500 cL, lait/beurre) —
//     même raison que la numération : ni durées ni conversions dans les
//     notions de 5ᵉ, alors que l'évaluation officielle les teste en
//     « grandeurs et mesures ». Trou signalé à Frédéric, pas comblé en douce.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

/** Les deux familles de l'évaluation officielle, et rien d'autre. */
const AUTOMATISMES = ["evaluation_nationale_4e", "eval4e_automatismes"];
const RESOLUTION = ["evaluation_nationale_4e", "eval4e_resolution"];

export const evaluationNationale4eBank: TutorBankItemV4[] = [
  /* ══════════════════════════════════════════════════════════════════════
     NOMBRES ET CALCULS — Compréhension du nombre
     ══════════════════════════════════════════════════════════════════════ */
  {
    kind: "fixed",
    id: "evalnat4e_nombre_ecriture_decimale",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    text: "$14 + \\dfrac{6}{10} + \\dfrac{2}{1000} = \\ldots$",
    format: "qcm",
    choices: ["14,602", "14,62", "140,62", "1462"],
    expected: ["14,602"],
    comparator: "mcq_exact",
    hint: "Chaque fraction décimale occupe un rang précis : les dixièmes, puis les centièmes, puis les millièmes.",
    explanation:
      "Définition : une écriture décimale range les chiffres par rangs — dixièmes, centièmes, millièmes.\n\n" +
      "Méthode : on place chaque fraction à son rang, et on met un 0 aux rangs vides.\n\n" +
      "Calcul : 6/10 donne un 6 au rang des dixièmes ; il n'y a pas de centième, donc un 0 ; 2/1000 donne un 2 au rang des millièmes.\n\n" +
      "Conclusion : 14 + 6/10 + 2/1000 = 14,602.",
    tags: [...AUTOMATISMES, "fraction_nombre"],
    choiceDiagnostics: [
      {
        choice: "14,62",
        cause:
          "Tu as vu que la partie décimale contient un 6 et un 2, et tu en as conclu qu'il n'y avait rien entre les deux. Il manque le rang des centièmes, qui est vide : c'est un 0.",
        errorKind: "conceptual",
        prereqMicroId: "fraction_rationnel",
      },
      {
        choice: "140,62",
        cause:
          "Tu as bien vu qu'un 0 manquait, mais tu l'as placé du mauvais côté de la virgule : 14 est lu comme un nombre de dizaines.",
        errorKind: "conceptual",
        prereqMicroId: "fraction_rationnel",
      },
      {
        choice: "1462",
        cause:
          "Tu n'as gardé que la suite des chiffres, sans la virgule : la partie décimale a disparu.",
        errorKind: "conceptual",
        prereqMicroId: "fraction_rationnel",
      },
    ],
  },
  {
    kind: "fixed",
    id: "evalnat4e_nombre_decimal_en_fraction",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    text: "$0,3$ s'écrit aussi …",
    format: "qcm",
    choices: [
      "$\\dfrac{3}{10}$",
      "$\\dfrac{1}{3}$",
      "$\\dfrac{3}{100}$",
      "$\\dfrac{0}{3}$",
    ],
    expected: ["$\\dfrac{3}{10}$"],
    comparator: "mcq_exact",
    hint: "Le 3 de 0,3 est au rang des dixièmes. Combien de dixièmes cela fait-il ?",
    explanation:
      "Définition : un nombre décimal est une autre écriture d'une fraction décimale.\n\n" +
      "Méthode : on lit le rang du dernier chiffre — ici les dixièmes — et c'est lui qui donne le dénominateur.\n\n" +
      "Calcul : 0,3 se lit « trois dixièmes », donc 0,3 = 3/10.\n\n" +
      "Conclusion : la bonne écriture fractionnaire est 3/10.",
    tags: [...AUTOMATISMES, "fraction_nombre"],
    choiceDiagnostics: [
      {
        choice: "$\\dfrac{1}{3}$",
        cause:
          "Tu as vu que 0,3 est plus petit que 1 et choisi la seule fraction de numérateur 1, qui te garantissait un nombre plus petit que 1. Mais 1/3 vaut 0,333… et non 0,3.",
        errorKind: "conceptual",
        prereqMicroId: "fraction_rationnel",
      },
      {
        choice: "$\\dfrac{3}{100}$",
        cause:
          "Tu as relié « centième » aux deux chiffres de 0,3. Ce ne sont pas les chiffres qu'on compte, c'est le rang du dernier : ici les dixièmes.",
        errorKind: "conceptual",
        prereqMicroId: "fraction_rationnel",
      },
      {
        choice: "$\\dfrac{0}{3}$",
        cause:
          "Tu as remplacé la virgule par un trait de fraction. Ce sont deux signes différents : 0/3 vaut 0.",
        errorKind: "conceptual",
        prereqMicroId: "fraction_rationnel",
      },
    ],
  },
  {
    kind: "fixed",
    id: "evalnat4e_nombre_encadrement",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel encadrement de $\\dfrac{56}{10}$ par deux nombres entiers est correct ?",
    format: "qcm",
    choices: [
      "$5 < \\dfrac{56}{10} < 6$",
      "$4 < \\dfrac{56}{10} < 5$",
      "$55 < \\dfrac{56}{10} < 56$",
      "$0 < \\dfrac{56}{10} < 1$",
    ],
    expected: ["$5 < \\dfrac{56}{10} < 6$"],
    comparator: "mcq_exact",
    hint: "Commence par écrire 56/10 en écriture décimale.",
    explanation:
      "Définition : encadrer un nombre par deux entiers, c'est trouver l'entier juste en dessous et l'entier juste au-dessus.\n\n" +
      "Méthode : on convertit la fraction en écriture décimale, puis on lit les deux entiers voisins.\n\n" +
      "Calcul : 56/10 = 5,6. L'entier juste en dessous est 5, celui juste au-dessus est 6.\n\n" +
      "Conclusion : 5 < 56/10 < 6.",
    tags: [...AUTOMATISMES, "fraction_nombre"],
    choiceDiagnostics: [
      {
        choice: "$4 < \\dfrac{56}{10} < 5$",
        cause:
          "La première inégalité est vraie, mais tu n'as pas vérifié la seconde : 56/10 vaut 5,6, ce n'est pas plus petit que 5.",
        errorKind: "incomplete",
        prereqMicroId: "fraction_comparer",
      },
      {
        choice: "$55 < \\dfrac{56}{10} < 56$",
        cause:
          "Tu n'as regardé que le numérateur, 56, en laissant le dénominateur de côté. Une fraction ne se lit pas comme un entier.",
        errorKind: "conceptual",
        prereqMicroId: "fraction_rationnel",
      },
      {
        choice: "$0 < \\dfrac{56}{10} < 1$",
        cause:
          "Tu as pensé qu'une fraction est toujours plus petite que 1. C'est faux dès que le numérateur dépasse le dénominateur.",
        errorKind: "conceptual",
        prereqMicroId: "fraction_rationnel",
      },
    ],
  },
  {
    kind: "fixed",
    id: "evalnat4e_nombre_part_coloriee",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle fraction de la surface est coloriée ?",
    format: "qcm",
    choices: [
      "$\\dfrac{5}{8}$",
      "$\\dfrac{3}{8}$",
      "$\\dfrac{3}{5}$",
      "$\\dfrac{5}{3}$",
    ],
    expected: ["$\\dfrac{5}{8}$"],
    comparator: "mcq_exact",
    // ⚠️ `showFraction` VAUT `true` PAR DÉFAUT dans FractionCanvas : sans ce
    // `false`, la figure écrit « 5/8 » sous le disque et donne la réponse.
    canvas: {
      kind: "fraction",
      model: "circle",
      fraction: { numerator: 5, denominator: 8 },
      display: { showFraction: false, showLabel: false },
    },
    hint: "Le dénominateur, c'est le nombre total de parts. Le numérateur, c'est le nombre de parts coloriées.",
    explanation:
      "Définition : une fraction rapporte une partie à un tout.\n\n" +
      "Méthode : on compte d'abord en combien de parts égales le tout est partagé, puis combien de ces parts sont coloriées.\n\n" +
      "Calcul : le disque est partagé en 8 parts égales, 5 sont coloriées.\n\n" +
      "Conclusion : la part coloriée est 5/8.",
    tags: [...AUTOMATISMES, "fraction_nombre"],
    choiceDiagnostics: [
      {
        choice: "$\\dfrac{3}{8}$",
        cause:
          "Tu as compté les parts qui restent blanches. La question porte sur les parts coloriées.",
        errorKind: "careless",
        prereqMicroId: "fraction_rationnel",
      },
      {
        choice: "$\\dfrac{3}{5}$",
        cause:
          "Tu as pris comme tout le nombre de parts coloriées, au lieu du nombre total de parts.",
        errorKind: "conceptual",
        prereqMicroId: "fraction_rationnel",
      },
      {
        choice: "$\\dfrac{5}{3}$",
        cause:
          "Tu as pris comme tout le nombre de parts non coloriées. Le dénominateur, c'est toujours le total.",
        errorKind: "conceptual",
        prereqMicroId: "fraction_rationnel",
      },
    ],
  },
  {
    kind: "fixed",
    id: "evalnat4e_nombre_abscisse_point",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est l'abscisse du point A ?",
    format: "qcm",
    choices: [
      "$\\dfrac{3}{4}$",
      "$0,3$",
      "$\\dfrac{4}{3}$",
      "$3$",
    ],
    expected: ["$\\dfrac{3}{4}$"],
    comparator: "mcq_exact",
    // ⚠️ `showValues: false` N'EST PAS COSMÉTIQUE. Le composant écrit la valeur
    // sous CHAQUE graduation : avec un pas de 0,25 il afficherait « 0,75 »
    // juste sous le point A. Les repères 0, 1, 2 et 3 sont donc posés en
    // POINTS étiquetés — c'est le seul moyen, dans ce composant, de graduer
    // finement sans écrire la réponse.
    canvas: {
      kind: "number_line",
      min: 0,
      max: 3,
      step: 0.25,
      points: [
        { value: 0, label: "0", color: "#64748b" },
        { value: 1, label: "1", color: "#64748b" },
        { value: 2, label: "2", color: "#64748b" },
        { value: 3, label: "3", color: "#64748b" },
        { value: 0.75, label: "A", color: "#dc2626" },
      ],
      display: {
        showTicks: true,
        showValues: false,
        showPoints: true,
        showPointLabels: true,
      },
    },
    hint: "Compte en combien de parts égales l'unité — de 0 à 1 — est partagée.",
    explanation:
      "Définition : l'abscisse d'un point, c'est le nombre qui lui correspond sur la droite graduée.\n\n" +
      "Méthode : on regarde d'abord entre quels entiers se trouve le point, puis en combien de parts l'unité est partagée.\n\n" +
      "Calcul : A est entre 0 et 1. L'unité est partagée en 4 parts égales, et A est à la troisième graduation.\n\n" +
      "Conclusion : l'abscisse de A est 3/4.",
    tags: [...AUTOMATISMES, "fraction_nombre"],
    choiceDiagnostics: [
      {
        choice: "$0,3$",
        cause:
          "Tu as compté 3 graduations et écrit 0,3, comme sur une règle graduée en dixièmes. Ici l'unité est partagée en 4, pas en 10.",
        errorKind: "conceptual",
        prereqMicroId: "fraction_rationnel",
      },
      {
        choice: "$\\dfrac{4}{3}$",
        cause:
          "Les deux nombres sont les bons, mais inversés. Le dénominateur est le nombre de parts de l'unité : 4.",
        errorKind: "careless",
        prereqMicroId: "fraction_rationnel",
      },
      {
        choice: "$3$",
        cause:
          "Tu as répondu par le rang de la graduation. Or A est situé AVANT 1 : son abscisse ne peut pas valoir 3.",
        errorKind: "conceptual",
        prereqMicroId: "fraction_rationnel",
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════════════
     NOMBRES ET CALCULS — Calculs avec les nombres relatifs
     ══════════════════════════════════════════════════════════════════════ */
  {
    kind: "fixed",
    id: "evalnat4e_relatif_addition",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    text: "$-5 + 7 = \\ldots$",
    format: "qcm",
    choices: ["2", "-12", "12", "-2"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Pars de −5 sur la droite graduée et avance de 7 vers la droite.",
    explanation:
      "Définition : additionner deux relatifs, c'est faire le bilan de deux déplacements sur la droite graduée.\n\n" +
      "Méthode : les deux nombres sont de signes contraires, donc on soustrait les distances à zéro et on garde le signe de la plus grande.\n\n" +
      "Calcul : 7 − 5 = 2, et 7 est plus loin de zéro que 5, donc le résultat est positif.\n\n" +
      "Conclusion : −5 + 7 = 2.",
    tags: [...AUTOMATISMES, "relatif_operation"],
    choiceDiagnostics: [
      {
        choice: "-12",
        cause:
          "Tu as ajouté les distances à zéro (5 + 7), puis mis un signe − parce qu'il y a un − dans le calcul. Deux nombres de signes contraires se soustraient.",
        errorKind: "conceptual",
        prereqMicroId: "relatif_addition",
      },
      {
        choice: "12",
        cause:
          "Tu as trouvé le bon signe, mais tu as ajouté les distances à zéro au lieu de les soustraire.",
        errorKind: "conceptual",
        prereqMicroId: "relatif_addition",
      },
      {
        choice: "-2",
        cause:
          "La distance est bonne : 7 − 5 = 2. C'est le signe qui manque : tu as mis un − parce que le calcul en contient un, alors que 7 l'emporte sur 5.",
        errorKind: "conceptual",
        prereqMicroId: "relatif_addition",
      },
    ],
  },
  {
    kind: "fixed",
    id: "evalnat4e_relatif_soustraction",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 3,
    theme: "neutral",
    text: "$7 - (-5) = \\ldots$",
    format: "qcm",
    choices: ["12", "-12", "2", "-2"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "Soustraire un nombre, c'est ajouter son opposé. L'opposé de −5, c'est +5.",
    explanation:
      "Définition : soustraire un relatif, c'est ajouter son opposé.\n\n" +
      "Méthode : on remplace − (−5) par + 5, puis on additionne.\n\n" +
      "Calcul : 7 − (−5) = 7 + 5 = 12.\n\n" +
      "Conclusion : le résultat est 12.",
    tags: [...AUTOMATISMES, "relatif_operation"],
    choiceDiagnostics: [
      {
        choice: "-12",
        cause:
          "La distance est bonne, mais tu as conclu qu'un calcul contenant deux signes « moins » donne forcément un résultat négatif. Le second « moins » marque l'opposé, il ne rend pas le résultat négatif.",
        errorKind: "conceptual",
        prereqMicroId: "relatif_soustraction",
      },
      {
        choice: "2",
        cause:
          "Tu as calculé 7 − 5 : le second nombre a été lu comme 5 et non comme −5. Ou bien tu as transformé la soustraction en addition sans prendre l'opposé.",
        errorKind: "conceptual",
        prereqMicroId: "relatif_soustraction",
      },
      {
        choice: "-2",
        cause:
          "Tu as fait 7 − 5, puis mis un signe − parce que le calcul contient deux « moins ». Les deux erreurs se cumulent.",
        errorKind: "conceptual",
        prereqMicroId: "relatif_soustraction",
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════════════
     NOMBRES ET CALCULS — Calcul littéral
     ══════════════════════════════════════════════════════════════════════ */
  {
    kind: "fixed",
    id: "evalnat4e_litteral_reduire",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 2,
    theme: "neutral",
    text: "Si l'on réduit l'expression $2n + 3n$, alors on obtient :",
    format: "qcm",
    choices: ["$5n$", "$5n^2$", "$6n^2$", "$6n$"],
    expected: ["$5n$"],
    comparator: "mcq_exact",
    hint: "Deux boules rouges plus trois boules rouges font cinq boules rouges.",
    explanation:
      "Définition : réduire, c'est regrouper les termes qui portent la même lettre.\n\n" +
      "Méthode : on ajoute les nombres devant la lettre, la lettre ne change pas.\n\n" +
      "Calcul : 2n + 3n = (2 + 3)n = 5n.\n\n" +
      "Conclusion : l'expression réduite est 5n.",
    tags: [...AUTOMATISMES, "litteral_calcul"],
    choiceDiagnostics: [
      {
        choice: "$5n^2$",
        cause:
          "Tu as bien ajouté 2 et 3, mais tu as aussi multiplié les lettres. Une addition ne fabrique pas de carré : n + n vaut 2n, pas n².",
        errorKind: "conceptual",
        prereqMicroId: "litteral_expression_comprendre",
      },
      {
        choice: "$6n^2$",
        cause:
          "Tu as multiplié les deux termes au lieu de les ajouter : c'est 2n × 3n que tu as calculé.",
        errorKind: "conceptual",
        prereqMicroId: "litteral_expression_comprendre",
      },
      {
        choice: "$6n$",
        cause:
          "Tu as multiplié 2 par 3 en gardant la lettre : c'est la procédure du produit, appliquée à une somme.",
        errorKind: "conceptual",
        prereqMicroId: "litteral_expression_comprendre",
      },
    ],
  },
  {
    kind: "fixed",
    id: "evalnat4e_litteral_substituer",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 2,
    theme: "neutral",
    text: "On donne l'expression $A = 1 + 3x$.\nQuelle est la valeur de $A$ pour $x = 8$ ?",
    format: "qcm",
    choices: ["25", "32", "39", "48"],
    expected: ["25"],
    comparator: "mcq_exact",
    hint: "$3x$ veut dire $3 \\times x$. La multiplication passe avant l'addition.",
    explanation:
      "Définition : 3x est une écriture réduite du produit de 3 par x.\n\n" +
      "Méthode : on remplace x par sa valeur, puis on respecte les priorités — la multiplication d'abord.\n\n" +
      "Calcul : A = 1 + 3 × 8 = 1 + 24 = 25.\n\n" +
      "Conclusion : A vaut 25.",
    tags: [...AUTOMATISMES, "litteral_calcul"],
    choiceDiagnostics: [
      {
        choice: "32",
        cause:
          "Tu as calculé de gauche à droite : 1 + 3 = 4, puis 4 × 8 = 32. La multiplication passe avant l'addition.",
        errorKind: "conceptual",
        prereqMicroId: "litteral_substituer",
      },
      {
        choice: "39",
        cause:
          "Tu as collé le 8 derrière le 3 pour faire 38, puis ajouté 1. Or 3x signifie 3 multiplié par x.",
        errorKind: "format",
        prereqMicroId: "litteral_expression_comprendre",
      },
      {
        choice: "48",
        cause:
          "Tu as fait 1 + 3 = 4, puis collé le 8 derrière : 48. Deux choses manquent, la priorité et le sens de l'écriture 3x.",
        errorKind: "format",
        prereqMicroId: "litteral_expression_comprendre",
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════════════
     ORGANISATION ET GESTION DE DONNÉES — Proportionnalité et problèmes
     ══════════════════════════════════════════════════════════════════════ */
  {
    kind: "fixed",
    id: "evalnat4e_prop_vitesse_cycliste",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "sport",
    text: "Un cycliste roule pendant 30 min à la vitesse moyenne de 18 km/h.\nQuelle distance parcourt-il ?",
    format: "qcm",
    choices: ["9 km", "18 km", "5,4 km", "36 km"],
    expected: ["9 km"],
    comparator: "mcq_exact",
    hint: "18 km/h, c'est 18 km en une heure. Et 30 min, c'est une demi-heure.",
    explanation:
      "Définition : rouler à 18 km/h, c'est parcourir 18 km en une heure.\n\n" +
      "Méthode : on convertit la durée en heures, puis on applique la proportionnalité.\n\n" +
      "Calcul : 30 min = 0,5 h, donc la distance est 18 × 0,5 = 9 km.\n\n" +
      "Conclusion : il parcourt 9 km.",
    tags: [...AUTOMATISMES, "prop_proportionnalite"],
    choiceDiagnostics: [
      {
        choice: "18 km",
        cause:
          "Tu as retenu le « km » de km/h et laissé le « /h » de côté : 18 est une vitesse, pas la distance parcourue.",
        errorKind: "conceptual",
        prereqMicroId: "prop_reconnaitre",
      },
      {
        choice: "5,4 km",
        cause:
          "Le raisonnement est bon, la conversion non : tu as écrit 30 min = 0,30 h. Une heure fait 60 minutes, donc 30 min = 0,5 h.",
        errorKind: "conceptual",
        prereqMicroId: "prop_coeff",
      },
      {
        choice: "36 km",
        cause:
          "Tu as bien vu que 30 min = 0,5 h, mais tu as divisé au lieu de multiplier : 18 ÷ 0,5. En une demi-heure on parcourt moins qu'en une heure.",
        errorKind: "conceptual",
        prereqMicroId: "prop_coeff",
      },
    ],
  },
  {
    kind: "fixed",
    id: "evalnat4e_prop_tableau_case_vide",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    text: "Le tableau ci-dessous est un tableau de proportionnalité.\nQuel nombre doit-on placer dans la case vide ?",
    format: "qcm",
    choices: ["27", "17", "30", "3"],
    expected: ["27"],
    comparator: "mcq_exact",
    canvas: {
      kind: "tableau_proportionnalite",
      rows: 2,
      cols: 2,
      values: [
        ["12", "4"],
        ["", "9"],
      ],
      missing: [{ row: 1, col: 0 }],
      display: { showGrid: true, showMissing: true },
    },
    hint: "Cherche par combien on multiplie pour passer de 4 à 12, puis applique-le à 9.",
    explanation:
      "Définition : dans un tableau de proportionnalité, on passe d'une ligne à l'autre en multipliant toujours par le même nombre.\n\n" +
      "Méthode : on cherche ce coefficient sur la colonne complète, puis on l'applique à l'autre colonne.\n\n" +
      "Calcul : 12 ÷ 4 = 3, donc le coefficient est 3. La case vide vaut 9 × 3 = 27.\n\n" +
      "Conclusion : il faut écrire 27.",
    tags: [...AUTOMATISMES, "prop_proportionnalite"],
    choiceDiagnostics: [
      {
        choice: "3",
        cause:
          "Tu as bien trouvé le coefficient — 3 — mais tu l'as recopié dans la case au lieu de l'appliquer à 9.",
        errorKind: "incomplete",
        prereqMicroId: "prop_coeff",
      },
      {
        choice: "17",
        cause:
          "Tu as raisonné avec un écart au lieu d'un coefficient : 12 + 5. Dans un tableau de proportionnalité, on multiplie, on n'ajoute pas.",
        errorKind: "conceptual",
        prereqMicroId: "prop_reconnaitre",
      },
      {
        choice: "30",
        cause:
          "Tu as vu que la case devait dépasser 9, et tu as proposé un nombre plus grand sans faire le calcul : 9 × 3 = 27.",
        errorKind: "conceptual",
        prereqMicroId: "prop_coeff",
      },
    ],
  },
  {
    kind: "fixed",
    id: "evalnat4e_prop_fraises_au_kilo",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 1,
    theme: "cuisine",
    text: "Dans un supermarché, les fraises sont à 2 € le kilogramme.\nCombien vais-je payer pour acheter 5 kg de fraises dans ce supermarché ?",
    format: "qcm",
    choices: ["10 €", "5 €", "6 €", "7 €"],
    expected: ["10 €"],
    comparator: "mcq_exact",
    hint: "« 2 € le kilogramme » donne le prix d'UN kilogramme. Il en faut cinq.",
    explanation:
      "Définition : un prix « au kilogramme » est le prix d'une unité de masse.\n\n" +
      "Méthode : on multiplie le prix d'un kilogramme par le nombre de kilogrammes.\n\n" +
      "Calcul : 2 € × 5 = 10 €.\n\n" +
      "Conclusion : je paierai 10 €.",
    tags: [...RESOLUTION, "prop_proportionnalite"],
    choiceDiagnostics: [
      {
        choice: "5 €",
        cause:
          "Tu as repris le 5 de « 5 kg » comme s'il s'agissait d'un prix. 5 compte des kilogrammes, pas des euros.",
        errorKind: "conceptual",
        prereqMicroId: "prop_reconnaitre",
      },
      {
        choice: "6 €",
        cause:
          "Tu as cherché combien de kilogrammes il manquait pour aller de 1 à 5, soit 4, et tu l'as ajouté au prix : 2 + 4. Un nombre de kilogrammes ne s'ajoute pas à des euros.",
        errorKind: "conceptual",
        prereqMicroId: "prop_coeff",
      },
      {
        choice: "7 €",
        cause:
          "Tu as ajouté les deux nombres de l'énoncé, 5 + 2, pour obtenir un prix plus grand que 2 €. Il fallait multiplier.",
        errorKind: "conceptual",
        prereqMicroId: "prop_coeff",
      },
    ],
  },
  {
    kind: "fixed",
    id: "evalnat4e_prop_trajet_college",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "neutral",
    text:
      "César et Romain habitent à la même distance du collège.\n" +
      "Romain vient au collège à pied. Sa vitesse est de 5 km/h.\n" +
      "César vient à vélo. Il est trois fois plus rapide.\n" +
      "Le trajet de Romain dure 12 minutes.\n" +
      "Combien dure le trajet de César ?",
    format: "qcm",
    choices: ["4 minutes", "36 minutes", "15 minutes", "3 minutes"],
    expected: ["4 minutes"],
    comparator: "mcq_exact",
    hint: "Pour la même distance, aller trois fois plus vite, c'est mettre trois fois moins de temps.",
    explanation:
      "Définition : à distance égale, la durée et la vitesse varient en sens contraire.\n\n" +
      "Méthode : trois fois plus rapide sur le même trajet, c'est trois fois moins long.\n\n" +
      "Calcul : 12 ÷ 3 = 4.\n\n" +
      "Conclusion : le trajet de César dure 4 minutes.",
    tags: [...RESOLUTION, "prop_proportionnalite"],
    choiceDiagnostics: [
      {
        choice: "36 minutes",
        cause:
          "Tu as bien cherché une durée, mais tu as multiplié par 3 au lieu de diviser. Aller plus vite ne peut pas rendre le trajet plus long.",
        errorKind: "conceptual",
        prereqMicroId: "prop_probleme",
      },
      {
        choice: "15 minutes",
        cause:
          "Tu as utilisé « trois fois plus rapide » avec la vitesse (5 km/h) : tu as calculé la vitesse de César, pas sa durée. Ou bien tu as lu « trois minutes de plus ».",
        errorKind: "conceptual",
        prereqMicroId: "prop_probleme",
      },
      {
        choice: "3 minutes",
        cause:
          "Tu as recopié le 3 de « trois fois plus rapide » comme si c'était une durée. C'est un rapport, pas des minutes.",
        errorKind: "conceptual",
        prereqMicroId: "prop_reconnaitre",
      },
    ],
  },
  {
    kind: "fixed",
    id: "evalnat4e_prop_pains_au_chocolat",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "cuisine",
    text:
      "Dans une même boulangerie, Lucas achète 7 pains au chocolat et paie 6,30 €.\n" +
      "Enzo achète 9 pains au chocolat et paie 8,10 €.\n" +
      "Combien paierait Camillia pour 8 pains au chocolat ?",
    format: "qcm",
    choices: ["7,20 €", "0,90 €", "7,10 €", "7,30 €"],
    expected: ["7,20 €"],
    comparator: "mcq_exact",
    hint: "Cherche d'abord le prix d'un seul pain au chocolat.",
    explanation:
      "Définition : le prix est proportionnel au nombre de pains au chocolat.\n\n" +
      "Méthode : on passe par le prix d'un seul, puis on multiplie par 8.\n\n" +
      "Calcul : 6,30 ÷ 7 = 0,90 €, donc 0,90 × 8 = 7,20 €.\n\n" +
      "Conclusion : Camillia paierait 7,20 €.",
    tags: [...RESOLUTION, "prop_proportionnalite"],
    choiceDiagnostics: [
      {
        choice: "0,90 €",
        cause:
          "Ta démarche est juste et tu l'as menée jusqu'au bout : 8,10 − 6,30 = 1,80 pour 2 pains, donc 0,90 le pain. Il restait à répondre à la question posée — le prix de 8 pains.",
        errorKind: "incomplete",
        prereqMicroId: "prop_quatrieme",
      },
      {
        choice: "7,10 €",
        cause:
          "Tu as estimé qu'un pain au chocolat coûte 1 €, et calculé 8,10 − 1. Le prix d'un pain se lit dans l'énoncé, il ne s'estime pas.",
        errorKind: "conceptual",
        prereqMicroId: "prop_coeff",
      },
      {
        choice: "7,30 €",
        cause:
          "Même estimation à 1 € le pain, dans l'autre sens : 6,30 + 1. L'énoncé donne de quoi calculer le prix exact.",
        errorKind: "conceptual",
        prereqMicroId: "prop_coeff",
      },
    ],
  },
  {
    kind: "fixed",
    id: "evalnat4e_prop_quinze_objets",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 2,
    theme: "neutral",
    text: "Louise a acheté 10 objets identiques pour 22 €.\nCombien coûtent 15 de ces objets ?",
    format: "qcm",
    choices: ["33 €", "27 €", "15 €", "47 €"],
    expected: ["33 €"],
    comparator: "mcq_exact",
    hint: "Commence par le prix d'un objet : 22 € pour 10 objets.",
    explanation:
      "Définition : le prix est proportionnel au nombre d'objets.\n\n" +
      "Méthode : on passe par le prix d'un seul objet, puis on multiplie par 15.\n\n" +
      "Calcul : 22 ÷ 10 = 2,20 €, donc 2,20 × 15 = 33 €.\n\n" +
      "Conclusion : 15 objets coûtent 33 €.",
    tags: [...RESOLUTION, "prop_proportionnalite"],
    choiceDiagnostics: [
      {
        choice: "27 €",
        cause:
          "Tu as vu qu'il y avait 5 objets de plus et tu as ajouté 5 € au prix. Cinq objets ne coûtent pas cinq euros : il faut passer par le prix d'un objet.",
        errorKind: "conceptual",
        prereqMicroId: "prop_coeff",
      },
      {
        choice: "15 €",
        cause:
          "Tu as repris le nombre d'objets comme réponse en euros. 15 compte des objets, pas des euros.",
        errorKind: "conceptual",
        prereqMicroId: "prop_reconnaitre",
      },
      {
        choice: "47 €",
        cause:
          "Tu as additionné tous les nombres de l'énoncé, 10 + 15 + 22, pour obtenir un prix plus grand. Les trois nombres ne comptent pas la même chose.",
        errorKind: "conceptual",
        prereqMicroId: "prop_reconnaitre",
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════════════
     ESPACE ET GÉOMÉTRIE — Géométrie plane, figures et configurations
     ══════════════════════════════════════════════════════════════════════ */
  {
    kind: "fixed",
    id: "evalnat4e_triangle_somme_angles",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 3,
    theme: "neutral",
    text: "La mesure de l'angle $\\widehat{IJK}$ est égale à …",
    format: "qcm",
    choices: ["110°", "20°", "50°", "70°"],
    expected: ["110°"],
    comparator: "mcq_exact",
    // Les sommets sont posés pour que les angles MESURÉS soient bien 50°, 20°
    // et 110° : la fiche Éduscol note que beaucoup d'élèves répondent « à la
    // perception ». Une figure fausse récompenserait justement ce réflexe.
    // A → I, B → J, C → K : le composant ne connaît que A, B, C.
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 25, y: 180 },
        B: { x: 77, y: 119 },
        C: { x: 245, y: 180 },
      },
      labels: { A: "I", B: "J", C: "K" },
      // ⛔ Pas d'étiquette sur B : c'est la question.
      angleLabels: { A: "50°", C: "20°" },
      display: { showLabels: true, showAngles: true },
    },
    hint: "Dans un triangle, les trois angles ont une somme fixe.",
    explanation:
      "Définition : dans un triangle, la somme des mesures des trois angles vaut 180°.\n\n" +
      "Méthode : on ajoute les deux angles connus, puis on retire le total de 180°.\n\n" +
      "Calcul : 50° + 20° = 70°, puis 180° − 70° = 110°.\n\n" +
      "Conclusion : l'angle IJK mesure 110°.",
    tags: [...AUTOMATISMES, "triangle_figure"],
    choiceDiagnostics: [
      {
        choice: "20°",
        cause:
          "Tu as donné la mesure d'un angle déjà écrit sur la figure. L'angle IJK a pour sommet J — la lettre du milieu.",
        errorKind: "conceptual",
        prereqMicroId: "triangle_reconnaitre",
      },
      {
        choice: "50°",
        cause:
          "Même chose : c'est l'angle de sommet I que tu as lu. Dans la notation IJK, le sommet est la lettre du milieu, J.",
        errorKind: "conceptual",
        prereqMicroId: "triangle_reconnaitre",
      },
      {
        choice: "70°",
        cause:
          "Tu as ajouté les deux angles connus et tu t'es arrêté là. 70°, c'est leur somme ; il reste à la retirer de 180°.",
        errorKind: "incomplete",
        prereqMicroId: "triangle_somme_angle",
      },
    ],
  },
];
