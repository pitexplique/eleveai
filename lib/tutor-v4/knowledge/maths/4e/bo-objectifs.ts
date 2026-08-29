// ─── Le programme de 4e, écrit comme une DONNÉE ────────────────────────────────
//
// ⛔ POURQUOI CE FICHIER EXISTE (27/08/2026). Les six vérificateurs de banque
// comptent les items d'une micro EXISTANTE — générateurs, variété, canvas,
// LaTeX, doublons, démarrage. Aucun ne demande **si une micro manque** : un trou
// n'a rien à compter, donc il ne déclenche rien. C'est ce point aveugle qui a
// laissé la 4e annoncer « 75 % du BO » avec neuf chapitres du programme absents,
// sans qu'un seul voyant passe au rouge. Ce fichier est le seul organe qui
// regarde le programme AVANT de regarder le coach.
//
// SOURCE, et une seule : « Programme du cycle des approfondissements (cycle 4) »,
// mathématiques, pages 126-137, pied de page officiel « BOEN n° 31 du 30 juillet
// 2020 ». C'est le programme APPLICABLE à la 4e en 2026-2027.
//
// ⛔ LE TEXTE VIENT DE `docs/bo-maths-cycle4-recopie.md`, RECOPIÉ DEPUIS DES
// CAPTURES D'ÉCRAN, jamais depuis une extraction automatique. Testé, et c'est un
// piège : les extracteurs perdent les fragments à apostrophe SANS RIEN SIGNALER
// (« Nombres décimaux (positifs et négatifs), notion d'opposé » devenait
// « Nombres . »), et une puce entière du thème D — « cas d'égalité des
// triangles » — disparaissait des deux PDF testés. Pour tout complément :
// capture d'écran, jamais extraction.
//
// ⚠️ CE FICHIER LISTE DES OBJECTIFS DE **CYCLE**, pas d'année. Le programme 2020
// est organisé par cycle : il ne dit pas si une connaissance se travaille en 5e,
// en 4e ou en 3e. Un `micros: []` signale donc **que le coach de 4e ne le couvre
// pas**, pas nécessairement qu'il devrait. Là où l'arbitrage se joue sur les
// repères annuels, la `note` le dit et s'arrête là : on n'invente pas une année
// qu'on n'a pas lue.
//
// ⚠️ `micros: []` n'est pas un oubli, c'est un CONSTAT. Ne jamais y mettre une
// micro « qui s'en rapproche » pour faire passer le vérificateur au vert — ce
// serait remettre le mensonge dans le fichier censé l'empêcher.
//
// ⭐ GRANULARITÉ : une entrée par PUCE du BO, connaissances ET compétences
// associées. C'est ce grain-là qui fait apparaître les trous : « cas d'égalité
// des triangles » est une puce, et c'est en tant que puce qu'elle manque.

/** Un objectif d'apprentissage du programme, et ce qui le couvre dans le coach. */
export type ObjectifBO = {
  /** Identifiant stable : <classe>-<thème>-<chapitre>-<n>. */
  id: string;
  /** Le thème du programme (A à E). */
  domaine: string;
  /** L'attendu de fin de cycle, et le sous-chapitre quand il y en a un. */
  chapitre: string;
  /** L'intitulé EXACT de la puce du BO. Recopié, pas résumé. */
  objectif: string;
  /** Page imprimée du document officiel où elle se lit. */
  page: number;
  /** Les microId du coach qui la couvrent. Vide = trou assumé et signalé. */
  micros: string[];
  /** Précision utile à la relecture. */
  note?: string;
};

export const objectifsBO4eMaths: ObjectifBO[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // THÈME A — NOMBRES ET CALCULS
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── Utiliser les nombres … — Nombres ──────────────────────────────────────
  {
    id: "4e-A-nombres-1",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Utiliser les nombres pour comparer, calculer et résoudre des problèmes — Nombres",
    objectif: "Nombres décimaux (positifs et négatifs), notion d'opposé.",
    page: 130,
    micros: ["fraction_oppose"],
    note: "⚠️ Couverture partielle. `fraction_oppose` porte l'opposé d'une FRACTION. Les décimaux relatifs traversent toute la notion `relatif_operation`, mais aucune de ses sept micros n'énonce la notion d'opposé.",
  },
  {
    id: "4e-A-nombres-2",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Utiliser les nombres pour comparer, calculer et résoudre des problèmes — Nombres",
    objectif: "Fractions, nombres rationnels (positifs et négatifs), notion d'inverse.",
    page: 130,
    micros: ["fraction_rationnel", "fraction_inverse"],
  },
  {
    id: "4e-A-nombres-3",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Utiliser les nombres pour comparer, calculer et résoudre des problèmes — Nombres",
    objectif: "Les carrés parfaits de 1 à 144.",
    page: 130,
    micros: ["pythagore_carre_racine"],
    note: "⭐ COUVERT par `pythagore.bank.ts` (table `knownSquares`). ⛔ MAIS ELLE COMMENÇAIT À 2² : « de 1 à 144 » inclut le 1, et il manquait — corrigé le 27/08/2026. Au-delà de 144 la table garde 13², 14² et 15², qui servent le THÉORÈME (le triplet 5-12-13) et non la connaissance du programme. ⚠️ Et la micro reste logée dans la notion `pythagore_theoreme` : les carrés parfaits ne s'y travaillent qu'au service du théorème, jamais comme objet de la notion « nombres ».",
  },
  {
    id: "4e-A-nombres-4",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Utiliser les nombres pour comparer, calculer et résoudre des problèmes — Nombres",
    objectif: "Définition de la racine carrée.",
    page: 130,
    micros: ["pythagore_carre_racine"],
    note: "⚠️ Couverture partielle. La définition est ÉNONCÉE dans les explications (« Comme 7² = 49, alors √49 = 7 ») et un gabarit fait alterner carré et racine, mais aucun item ne la demande comme définition, et elle n'existe que dans la notion Pythagore.",
  },
  {
    id: "4e-A-nombres-5",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Utiliser les nombres pour comparer, calculer et résoudre des problèmes — Nombres",
    objectif: "Les préfixes de nano à giga.",
    page: 130,
    micros: [],
    note: "⛔ TROU. Zéro occurrence de « nano », « micro », « giga », « méga » dans les vingt banques de 4e.",
  },
  {
    id: "4e-A-nombres-6",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Utiliser les nombres pour comparer, calculer et résoudre des problèmes — Nombres",
    objectif:
      "Utiliser diverses représentations d'un même nombre (écriture décimale ou fractionnaire, notation scientifique, repérage sur une droite graduée).",
    page: 130,
    micros: ["fraction_decimal", "fraction_rationnel", "puissance_notation_scientifique"],
    note: "⚠️ Trois des quatre représentations depuis le 28/08/2026 : la NOTATION SCIENTIFIQUE est entrée avec `puissance_ecriture`. Reste le REPÉRAGE SUR UNE DROITE GRADUÉE, qui n'a toujours aucun item en 4e (voir 4e-A-comparaisons-4).",
  },
  {
    id: "4e-A-nombres-7",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Utiliser les nombres pour comparer, calculer et résoudre des problèmes — Nombres",
    objectif: "Passer d'une représentation d'un nombre à une autre.",
    page: 131,
    micros: ["fraction_decimal", "fraction_rationnel", "prop_pourcentage"],
  },

  // ─── Utiliser les nombres … — Comparaisons de nombres ──────────────────────
  {
    id: "4e-A-comparaisons-1",
    domaine: "Thème A — Nombres et calculs",
    chapitre:
      "Utiliser les nombres pour comparer, calculer et résoudre des problèmes — Comparaisons de nombres",
    objectif:
      "Égalité de fractions (démonstration possible à partir de la définition du quotient).",
    page: 131,
    micros: ["fraction_egale", "fraction_simplifier"],
  },
  {
    id: "4e-A-comparaisons-2",
    domaine: "Thème A — Nombres et calculs",
    chapitre:
      "Utiliser les nombres pour comparer, calculer et résoudre des problèmes — Comparaisons de nombres",
    objectif: "Ordre sur les nombres rationnels en écriture décimale ou fractionnaire.",
    page: 131,
    micros: ["fraction_comparer"],
  },
  {
    id: "4e-A-comparaisons-3",
    domaine: "Thème A — Nombres et calculs",
    chapitre:
      "Utiliser les nombres pour comparer, calculer et résoudre des problèmes — Comparaisons de nombres",
    objectif:
      "Comparer, ranger, encadrer des nombres rationnels en écriture décimale, fractionnaire ou scientifique",
    page: 131,
    micros: ["fraction_comparer", "puissance_comparer"],
    note: "⚠️ Comparer et ranger, en écriture décimale, fractionnaire ET scientifique depuis le 28/08/2026 (`puissance_comparer` : l'exposant décide d'abord, la mantisse ensuite). Reste ENCADRER, qui n'a aucun item en 4e.",
  },
  {
    id: "4e-A-comparaisons-4",
    domaine: "Thème A — Nombres et calculs",
    chapitre:
      "Utiliser les nombres pour comparer, calculer et résoudre des problèmes — Comparaisons de nombres",
    objectif: "Repérer et placer un nombre rationnel sur une droite graduée.",
    page: 131,
    micros: [],
    note: "⛔ TROU. La 6e a `abscisse_lire`, `abscisse_placer`, `abscisse_fraction` ; la 4e n'a rien. Voir aussi 4e-D-espace-3 : le repérage est un trou de bout en bout.",
  },
  {
    id: "4e-A-comparaisons-5",
    domaine: "Thème A — Nombres et calculs",
    chapitre:
      "Utiliser les nombres pour comparer, calculer et résoudre des problèmes — Comparaisons de nombres",
    objectif:
      "Associer à des objets des ordres de grandeur (par exemple taille d'un atome, d'une bactérie, d'une alvéole pulmonaire, longueur de l'intestin, capacité de stockage d'un disque dur, vitesses du son et de la lumière, populations française et mondiale, distance Terre-Lune, distance du Soleil à l'étoile la plus proche, etc.).",
    page: 131,
    micros: [],
    note: "⛔ TROU. C'est le compagnon naturel des puissances et de la notation scientifique : il se traitera avec elles, pas avant.",
  },

  // ─── Utiliser les nombres … — Pratiquer le calcul ──────────────────────────
  {
    id: "4e-A-calcul-1",
    domaine: "Thème A — Nombres et calculs",
    chapitre:
      "Utiliser les nombres pour comparer, calculer et résoudre des problèmes — Pratiquer le calcul exact ou approché, mental, à la main ou instrumenté",
    objectif:
      "Somme, différence, produit, quotient de nombres décimaux, de deux nombres rationnels.",
    page: 131,
    micros: [
      "relatif_addition",
      "relatif_soustraction",
      "relatif_multiplication",
      "relatif_division",
      "fraction_additionner",
      "fraction_multiplier",
      "fraction_diviser",
    ],
  },
  {
    id: "4e-A-calcul-2",
    domaine: "Thème A — Nombres et calculs",
    chapitre:
      "Utiliser les nombres pour comparer, calculer et résoudre des problèmes — Pratiquer le calcul exact ou approché, mental, à la main ou instrumenté",
    objectif: "Puissance d'un nombre (exposants entiers, positifs ou négatifs).",
    page: 131,
    micros: [
      "puissance_comprendre",
      "puissance_calculer",
      "puissance_exposant_negatif",
      "puissance_dix",
    ],
    note: "✅ COMBLÉ LE 28/08/2026 par la notion `puissance_ecriture`. ⭐ Le « ou négatifs » du BO a sa micro dédiée (`puissance_exposant_negatif`), là où la 3e le noie dans le calcul : c'est ce qui fait sept micros en 4e contre six en 3e.",
  },
  {
    id: "4e-A-calcul-3",
    domaine: "Thème A — Nombres et calculs",
    chapitre:
      "Utiliser les nombres pour comparer, calculer et résoudre des problèmes — Pratiquer le calcul exact ou approché, mental, à la main ou instrumenté",
    objectif: "Notation scientifique.",
    page: 131,
    micros: ["puissance_notation_scientifique"],
    note: "✅ COMBLÉ LE 28/08/2026. ⚠️ Restent les PRÉFIXES nano→giga (4e-A-nombres-5) : ils ne sont pas de cette notion — une puissance est une écriture, un ordre de grandeur est une mesure.",
  },
  {
    id: "4e-A-calcul-4",
    domaine: "Thème A — Nombres et calculs",
    chapitre:
      "Utiliser les nombres pour comparer, calculer et résoudre des problèmes — Pratiquer le calcul exact ou approché, mental, à la main ou instrumenté",
    objectif: "Calculer avec des nombres relatifs, des fractions, des nombres décimaux.",
    page: 131,
    micros: ["relatif_calcul", "fraction_quantite", "fraction_additionner", "fraction_multiplier", "fraction_diviser"],
  },
  {
    id: "4e-A-calcul-5",
    domaine: "Thème A — Nombres et calculs",
    chapitre:
      "Utiliser les nombres pour comparer, calculer et résoudre des problèmes — Pratiquer le calcul exact ou approché, mental, à la main ou instrumenté",
    objectif:
      "Vérifier la vraisemblance d'un résultat, notamment en estimant son ordre de grandeur.",
    page: 131,
    micros: [],
    note: "⛔ TROU. La 6e le couvre (`entier_calcul_verifier`) ; la 4e n'a aucune micro d'estimation.",
  },
  {
    id: "4e-A-calcul-6",
    domaine: "Thème A — Nombres et calculs",
    chapitre:
      "Utiliser les nombres pour comparer, calculer et résoudre des problèmes — Pratiquer le calcul exact ou approché, mental, à la main ou instrumenté",
    objectif:
      "Effectuer des calculs numériques simples impliquant des puissances, notamment en utilisant la notation scientifique.",
    page: 131,
    micros: ["puissance_calcul", "puissance_defi"],
    note: "✅ COMBLÉ LE 28/08/2026. ⛔ CALIBRAGE RESPECTÉ : le BO précise que « la mise en acte de produits et de quotients de puissances de même base résulte de l'application de la DÉFINITION plutôt que de celle d'une formule ». Aucun item n'énonce a^m × a^n = a^(m+n) — quand un produit de même base apparaît, l'explication réécrit le produit en entier. Les formules restent en 3e.",
  },
  {
    id: "4e-A-calcul-7",
    domaine: "Thème A — Nombres et calculs",
    chapitre:
      "Utiliser les nombres pour comparer, calculer et résoudre des problèmes — Pratiquer le calcul exact ou approché, mental, à la main ou instrumenté",
    objectif: "Utiliser la racine carrée pour résoudre des problèmes, notamment géométriques.",
    page: 131,
    micros: [
      "pythagore_carre_racine",
      "pythagore_calculer_hypotenuse",
      "pythagore_calculer_cote",
      "pythagore_defi",
    ],
    note: "⭐ COUVERT, et « notamment géométriques » désigne exactement ce que fait le coach. ⚠️ En revanche la racine carrée HORS géométrie (résoudre x² = a, voir 4e-A-litteral-8) n'a aucun item.",
  },
  {
    id: "4e-A-calcul-8",
    domaine: "Thème A — Nombres et calculs",
    chapitre:
      "Utiliser les nombres pour comparer, calculer et résoudre des problèmes — Pratiquer le calcul exact ou approché, mental, à la main ou instrumenté",
    objectif: "Effectuer des calculs et des comparaisons pour traiter des problèmes.",
    page: 131,
    micros: ["relatif_probleme", "relatif_operation_defi", "fraction_defi"],
  },

  // ─── Comprendre et utiliser les notions de divisibilité et de nombres premiers
  {
    id: "4e-A-divisibilite-1",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Comprendre et utiliser les notions de divisibilité et de nombres premiers",
    objectif: "Multiples et diviseurs.",
    page: 132,
    micros: [],
    note: "⛔ TROU. Attendu de fin de cycle ENTIÈREMENT absent. ⚠️ Le nouveau programme le fait passer en 3e à partir de septembre 2027 : il ne servira la 4e qu'une année. À traiter en dernier.",
  },
  {
    id: "4e-A-divisibilite-2",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Comprendre et utiliser les notions de divisibilité et de nombres premiers",
    objectif: "Critères de divisibilité par 2, 3, 5, 9.",
    page: 132,
    micros: [],
    note: "⛔ TROU.",
  },
  {
    id: "4e-A-divisibilite-3",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Comprendre et utiliser les notions de divisibilité et de nombres premiers",
    objectif: "Division euclidienne (quotient, reste).",
    page: 132,
    micros: [],
    note: "⛔ TROU en 4e. Acquis de 6e (`entier_division_posee`), jamais réactivé ici.",
  },
  {
    id: "4e-A-divisibilite-4",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Comprendre et utiliser les notions de divisibilité et de nombres premiers",
    objectif:
      "Définition d'un nombre premier ; liste des nombres premiers inférieurs ou égaux à 30.",
    page: 132,
    micros: [],
    note: "⛔ TROU. ⭐ La nuance à ne pas rater : la LISTE s'arrête à 30 pour les connaissances, mais la COMPÉTENCE (4e-A-divisibilite-7) demande de déterminer les premiers ≤ 100.",
  },
  {
    id: "4e-A-divisibilite-5",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Comprendre et utiliser les notions de divisibilité et de nombres premiers",
    objectif: "Fractions irréductibles.",
    page: 132,
    micros: ["fraction_simplifier"],
    note: "⭐ COUVERT — et c'est une correction. `fractions.bank.ts` définit l'irréductibilité (« son numérateur et son dénominateur n'ont pas de diviseur commun autre que 1 ») et demande de reconnaître une fraction déjà irréductible. C'est le seul point de tout l'attendu « divisibilité » qui existe dans le coach.",
  },
  {
    id: "4e-A-divisibilite-6",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Comprendre et utiliser les notions de divisibilité et de nombres premiers",
    objectif:
      "Déterminer si un entier est ou n'est pas multiple ou diviseur d'un autre entier.",
    page: 132,
    micros: [],
    note: "⛔ TROU.",
  },
  {
    id: "4e-A-divisibilite-7",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Comprendre et utiliser les notions de divisibilité et de nombres premiers",
    objectif: "Déterminer les nombres premiers inférieurs ou égaux à 100.",
    page: 132,
    micros: [],
    note: "⛔ TROU.",
  },
  {
    id: "4e-A-divisibilite-8",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Comprendre et utiliser les notions de divisibilité et de nombres premiers",
    objectif: "Utiliser les critères de divisibilité par 2, 3, 5, 9, 10.",
    page: 132,
    micros: [],
    note: "⛔ TROU. ⚠️ Noter le 10, qui figure dans la compétence mais pas dans la connaissance (4e-A-divisibilite-2).",
  },
  {
    id: "4e-A-divisibilite-9",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Comprendre et utiliser les notions de divisibilité et de nombres premiers",
    objectif:
      "Déterminer les diviseurs d'un nombre à la main, à l'aide d'un tableur, d'une calculatrice.",
    page: 132,
    micros: [],
    note: "⛔ TROU.",
  },
  {
    id: "4e-A-divisibilite-10",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Comprendre et utiliser les notions de divisibilité et de nombres premiers",
    objectif:
      "Décomposer un nombre entier en produit de facteurs premiers (à la main ou à l'aide d'un logiciel).",
    page: 132,
    micros: [],
    note: "⛔ TROU.",
  },
  {
    id: "4e-A-divisibilite-11",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Comprendre et utiliser les notions de divisibilité et de nombres premiers",
    objectif: "Simplifier une fraction pour la rendre irréductible.",
    page: 132,
    micros: ["fraction_simplifier", "fraction_egale"],
  },
  {
    id: "4e-A-divisibilite-12",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Comprendre et utiliser les notions de divisibilité et de nombres premiers",
    objectif:
      "Modéliser et résoudre des problèmes mettant en jeu la divisibilité (engrenages, conjonction de phénomènes, etc.).",
    page: 132,
    micros: [],
    note: "⛔ TROU.",
  },

  // ─── Utiliser le calcul littéral ───────────────────────────────────────────
  {
    id: "4e-A-litteral-1",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Utiliser le calcul littéral",
    objectif: "Notions d'inconnue, d'équation, d'indéterminée, d'identité.",
    page: 132,
    micros: [
      "litteral_expression_comprendre",
      "equation_reconnaitre",
      "litteral_identite_reconnaitre",
    ],
  },
  {
    id: "4e-A-litteral-2",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Utiliser le calcul littéral",
    objectif: "Propriétés de distributivité (simple et double).",
    page: 132,
    micros: [
      "litteral_distributivite_simple",
      "litteral_distributivite_double",
      "litteral_distributivite_reconnaitre",
      "litteral_distributivite_reduire",
      "litteral_distributivite_defi",
    ],
  },
  {
    id: "4e-A-litteral-3",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Utiliser le calcul littéral",
    objectif: "Annulation d'un produit (démonstration possible par disjonction de cas).",
    page: 132,
    micros: [],
    note: "⛔ TROU. La seule occurrence d'« équation produit » du dépôt est un HINT posé sur un problème du premier degré (ax = b) dans `equations.bank.ts` : le produit nul n'y est jamais en jeu.",
  },
  {
    id: "4e-A-litteral-4",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Utiliser le calcul littéral",
    objectif: "Factorisation de a² − b².",
    page: 132,
    micros: ["litteral_factoriser_identite", "litteral_identite_reconnaitre", "litteral_identite_defi"],
  },
  {
    id: "4e-A-litteral-5",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Utiliser le calcul littéral",
    objectif:
      "Développer, factoriser, réduire des expressions algébriques dans des cas très simples.",
    page: 132,
    micros: [
      "litteral_expression_reduire",
      "litteral_identite_lier_distributivite",
      "litteral_identite_developper",
      "litteral_identite_choisir",
      "litteral_facteur_commun",
      "litteral_factoriser_simple",
      "litteral_factoriser_verifier",
      "litteral_factorisation_defi",
    ],
  },
  {
    id: "4e-A-litteral-6",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Utiliser le calcul littéral",
    objectif:
      "Utiliser le calcul littéral pour traduire une propriété générale (par exemple la distributivité simple), pour démontrer un résultat général (par exemple que la somme de trois entiers consécutifs est un multiple de trois), pour valider ou réfuter une conjecture, pour modéliser une situation.",
    page: 132,
    micros: [
      "litteral_expression_traduire",
      "litteral_expression_substituer",
      "litteral_expression_defi",
    ],
  },
  {
    id: "4e-A-litteral-7",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Utiliser le calcul littéral",
    objectif: "Mettre un problème en équation en vue de sa résolution.",
    page: 132,
    micros: ["equation_traduire", "equation_probleme"],
  },
  {
    id: "4e-A-litteral-8",
    domaine: "Thème A — Nombres et calculs",
    chapitre: "Utiliser le calcul littéral",
    objectif:
      "Résoudre algébriquement des équations du premier degré ou s'y ramenant (équations produits), en particulier des équations du type x² = a.",
    page: 132,
    micros: [
      "equation_resoudre_simple",
      "equation_resoudre_reduction",
      "equation_resoudre_distributivite",
      "equation_verifier",
      "equation_defi",
    ],
    note: "⚠️ Le premier degré est solide ; les ÉQUATIONS PRODUITS et le type x² = a n'ont aucun item. C'est le prolongement naturel de 4e-A-litteral-3 et de la racine carrée (4e-A-calcul-7).",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // THÈME B — ORGANISATION ET GESTION DE DONNÉES, FONCTIONS
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── Interpréter, représenter et traiter des données ───────────────────────
  {
    id: "4e-B-donnees-1",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Interpréter, représenter et traiter des données",
    objectif: "Effectifs, fréquences.",
    page: 133,
    micros: ["stat_effectif", "stat_frequence"],
  },
  {
    id: "4e-B-donnees-2",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Interpréter, représenter et traiter des données",
    objectif: "Indicateurs de position : moyenne, médiane.",
    page: 133,
    micros: ["stat_moyenne", "stat_mediane"],
  },
  {
    id: "4e-B-donnees-3",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Interpréter, représenter et traiter des données",
    objectif: "Indicateur de dispersion : étendue.",
    page: 133,
    micros: ["stat_etendue"],
  },
  {
    id: "4e-B-donnees-4",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Interpréter, représenter et traiter des données",
    objectif: "Recueillir des données, les organiser.",
    page: 133,
    micros: [],
    note: "⛔ TROU. La 6e a `stat_enquete_planifier` et `stat_enquete_mesurer` (avec le biais d'échantillon) ; la 4e ne fait que LIRE des données déjà organisées.",
  },
  {
    id: "4e-B-donnees-5",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Interpréter, représenter et traiter des données",
    objectif:
      "Lire et interpréter des données sous forme de données brutes, de tableau, de diagramme (diagramme en bâtons, diagramme circulaire, histogramme).",
    page: 133,
    micros: ["stat_lire_tableau", "stat_lire_graphique"],
    note: "⚠️ Diagramme en barres et diagramme circulaire seulement. L'HISTOGRAMME n'a aucun item — et ce n'est pas un synonyme du diagramme en bâtons.",
  },
  {
    id: "4e-B-donnees-6",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Interpréter, représenter et traiter des données",
    objectif:
      "Utiliser un tableur-grapheur pour présenter des données sous la forme d'un tableau ou d'un diagramme.",
    page: 133,
    micros: [],
    note: "⛔ TROU ASSUMÉ. Un geste de tableur ne s'évalue pas en QCM : c'est un travail de classe, pas de coach. À laisser vide plutôt qu'à faire semblant.",
  },
  {
    id: "4e-B-donnees-7",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Interpréter, représenter et traiter des données",
    objectif: "Calculer des effectifs, des fréquences.",
    page: 133,
    micros: ["stat_effectif", "stat_frequence"],
  },
  {
    id: "4e-B-donnees-8",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Interpréter, représenter et traiter des données",
    objectif:
      "Calculer et interpréter des indicateurs de position ou de dispersion d'une série statistique.",
    page: 133,
    micros: ["stat_moyenne", "stat_mediane", "stat_etendue", "stat_interpreter", "stat_probleme", "stat_defi"],
  },

  // ─── Comprendre et utiliser des notions élémentaires de probabilités ───────
  {
    id: "4e-B-probabilites-1",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Comprendre et utiliser des notions élémentaires de probabilités",
    objectif: "Vocabulaire des probabilités.",
    page: 133,
    micros: ["proba_vocabulaire", "proba_issue"],
  },
  {
    id: "4e-B-probabilites-2",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Comprendre et utiliser des notions élémentaires de probabilités",
    objectif:
      "Notion de probabilité ; la probabilité d'un événement est comprise entre 0 et 1.",
    page: 133,
    micros: ["proba_calculer_fraction", "proba_comparer"],
  },
  {
    id: "4e-B-probabilites-3",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Comprendre et utiliser des notions élémentaires de probabilités",
    objectif: "Probabilité d'événements certains, impossibles, contraires.",
    page: 133,
    micros: ["proba_evenement"],
  },
  {
    id: "4e-B-probabilites-4",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Comprendre et utiliser des notions élémentaires de probabilités",
    objectif: "Aborder les questions relatives au hasard à partir de problèmes simples.",
    page: 133,
    micros: ["proba_equiprobabilite", "proba_defi"],
  },
  {
    id: "4e-B-probabilites-5",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Comprendre et utiliser des notions élémentaires de probabilités",
    objectif:
      "Calculer des probabilités dans des cas simples (par exemple évaluation des chances de gain dans un jeu).",
    page: 133,
    micros: ["proba_calculer_fraction", "proba_equiprobabilite"],
  },
  {
    id: "4e-B-probabilites-6",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Comprendre et utiliser des notions élémentaires de probabilités",
    objectif:
      "Exprimer des probabilités sous diverses formes (décimale, fractionnaire, pourcentage).",
    page: 133,
    micros: ["proba_convertir"],
  },
  {
    id: "4e-B-probabilites-7",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Comprendre et utiliser des notions élémentaires de probabilités",
    objectif: "Faire le lien entre fréquence et probabilité.",
    page: 133,
    micros: [
      "proba_frequence_calculer",
      "proba_frequence_comparer",
      "proba_frequence_repeter",
      "proba_frequence_echantillon",
      "proba_frequence_defi",
    ],
    note: "✅ COMBLÉ LE 28/08/2026 par la notion `proba_frequence`, qui reprend les trois micros de la 6e et en ajoute une : ce qu'un PETIT ÉCHANTILLON ne prouve pas. ⭐ C'est le premier raisonnement statistique de la scolarité — un même pourcentage ne dit pas la même chose sur 10 essais et sur 1 000 —, et il ne se redit nulle part ailleurs au programme. ⛔ Les items traitent les DEUX erreurs symétriques : exiger que l'expérience donne le résultat calculé, et en déduire que le calcul est faux quand elle ne le donne pas.",
  },

  // ─── Résoudre des problèmes de proportionnalité ────────────────────────────
  {
    id: "4e-B-proportionnalite-1",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Résoudre des problèmes de proportionnalité",
    objectif: "Coefficient de proportionnalité.",
    page: 134,
    micros: ["prop_coeff", "prop_table"],
  },
  {
    id: "4e-B-proportionnalite-2",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Résoudre des problèmes de proportionnalité",
    objectif: "Taux d'évolution, coefficient multiplicateur.",
    page: 134,
    micros: ["prop_coeff_multiplicateur", "prop_evolution"],
  },
  {
    id: "4e-B-proportionnalite-3",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Résoudre des problèmes de proportionnalité",
    objectif: "Notion de ratio.",
    page: 134,
    micros: ["prop_rapport", "prop_ratio_quotients", "prop_ratio_trois"],
    note: "✅ COMBLÉ LE 28/08/2026 par la notion `prop_ratio_pourcentage`, scindée de `prop_proportionnalite` comme l'avait déjà fait la 5e. ⭐ Les DEUX notations du BO sont couvertes, y compris celle à trois termes (a/2 = b/3 = c/7) dont la 5e n'a aucun item — vérifié, zéro occurrence.",
  },
  {
    id: "4e-B-proportionnalite-4",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Résoudre des problèmes de proportionnalité",
    objectif: "Reconnaître une situation de proportionnalité ou de non-proportionnalité.",
    page: 134,
    micros: ["prop_reconnaitre"],
  },
  {
    id: "4e-B-proportionnalite-5",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Résoudre des problèmes de proportionnalité",
    objectif: "Calculer une quatrième proportionnelle.",
    page: 134,
    micros: ["prop_quatrieme"],
  },
  {
    id: "4e-B-proportionnalite-6",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Résoudre des problèmes de proportionnalité",
    objectif:
      "Partager une quantité (par exemple une somme d'argent) en deux ou trois parts selon un ratio donné.",
    page: 134,
    micros: ["prop_ratio_partager", "prop_ratio_defi"],
    note: "✅ COMBLÉ LE 28/08/2026. ⭐ « En deux OU TROIS parts » : les deux cas ont leur gabarit, et le canvas `schema_barre` montre pourquoi on divise d'abord par la SOMME des parts — l'erreur classique étant de diviser par 3 quand le ratio 2 : 3 : 7 en compte douze.",
  },
  {
    id: "4e-B-proportionnalite-7",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Résoudre des problèmes de proportionnalité",
    objectif:
      "Utiliser une formule liant deux grandeurs dans une situation de proportionnalité (par exemple la longueur d'un cercle en fonction de son rayon, la loi d'Ohm exprimant la tension en fonction de l'intensité, la distance parcourue en fonction du temps à vitesse constante, etc.).",
    page: 134,
    micros: ["prop_probleme"],
    note: "⚠️ Couverture partielle : seule la distance à vitesse constante est traitée (`prop_probleme_tpl_3_vitesse`). ⭐ C'est aussi la porte d'entrée des FONCTIONS en 4e — la dépendance de deux grandeurs par une formule.",
  },
  {
    id: "4e-B-proportionnalite-8",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Résoudre des problèmes de proportionnalité",
    objectif:
      "Résoudre des problèmes utilisant la proportionnalité (pourcentages, échelles, agrandissement réduction).",
    page: 134,
    micros: [
      "prop_pourcentage",
      "prop_probleme",
      "prop_defi",
      "echelle_distance_reelle",
      "echelle_distance_plan",
      "agrandissement_rapport",
    ],
    note: "✅ COMPLÉTÉ LE 28/08/2026, et la puce en nommait TROIS. Les pourcentages étaient solides ; les ÉCHELLES et l'AGRANDISSEMENT-RÉDUCTION sont arrivés avec `prop_echelle`. ⭐ Le BO les cite ensemble parce que c'est le même objet : une échelle EST une réduction de rapport 1/k.",
  },

  // ─── Comprendre et utiliser la notion de fonction ──────────────────────────
  {
    id: "4e-B-fonction-1",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Comprendre et utiliser la notion de fonction",
    objectif: "Vocabulaire : variable, fonction, antécédent, image.",
    page: 134,
    micros: [],
    note: "⛔ TROU VOLONTAIRE, ET IL DOIT LE RESTER EN 4e. ⚠️ J'ai failli y accrocher `fonction_reconnaitre` et `fonction_tableau_lire` le 28/08 : elles s'en approchent, et le vérificateur serait passé au vert. C'est exactement ce que ce fichier interdit. Les repères annuels tranchent — « La notation et LE VOCABULAIRE fonctionnels ne sont pas formalisés en 4e ». ⭐ La notion `fonction_dependance` enseigne donc le GESTE (lire dans les deux sens, suivre un programme, passer d'une représentation à l'autre) sans jamais poser les mots « fonction », « image » et « antécédent » comme des définitions à retenir. Le vocabulaire se formalisera en 3e, et cette ligne restera rouge d'ici là — c'est un constat juste, pas un manque.",
  },
  {
    id: "4e-B-fonction-2",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Comprendre et utiliser la notion de fonction",
    objectif:
      "Différents modes de représentation d'une fonction (expression symbolique, tableau de valeurs, représentation graphique, programme de calcul).",
    page: 134,
    micros: ["fonction_programme", "fonction_tableau_lire", "fonction_graphique_lire"],
    note: "⛔ TROU. ⭐ Le PROGRAMME DE CALCUL est le mode le plus accessible en 4e, et c'est celui que le nouveau programme retient : il se branche sur `algo_programmation` et sur `litteral_expression_substituer`.",
  },
  {
    id: "4e-B-fonction-3",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Comprendre et utiliser la notion de fonction",
    objectif: "Notations f(x) et x ↦ f(x).",
    page: 134,
    micros: [],
    note: "⛔ TROU VOLONTAIRE, ET IL DOIT LE RESTER EN 4e. C'est la seule phrase des repères annuels à nommer une année : « La notation et le vocabulaire fonctionnels ne sont pas formalisés en 4e. » Objectif de CYCLE, à couvrir en 3e.",
  },
  {
    id: "4e-B-fonction-4",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Comprendre et utiliser la notion de fonction",
    objectif: "Fonction linéaire, fonction affine.",
    page: 134,
    micros: [],
    note: "⛔ TROU VOLONTAIRE : objectif de CYCLE couvert en 3e (`fonction_generalite`, `fonctions.bank.ts`, 61 items). Ne pas le faire descendre.",
  },
  {
    id: "4e-B-fonction-5",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Comprendre et utiliser la notion de fonction",
    objectif: "Passer d'un mode de représentation d'une fonction à un autre.",
    page: 134,
    micros: ["fonction_changer_mode"],
    note: "⛔ TROU. Faisable en 4e sans f(x) : d'un tableau de valeurs à un graphique, d'un programme de calcul à un tableau.",
  },
  {
    id: "4e-B-fonction-6",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Comprendre et utiliser la notion de fonction",
    objectif:
      "Déterminer, à partir d'un mode de représentation, l'image ou un antécédent d'un nombre par une fonction.",
    page: 134,
    micros: ["fonction_tableau_lire", "fonction_graphique_lire"],
    note: "⛔ TROU. Faisable en 4e par LECTURE de tableau ou de graphique, sans notation fonctionnelle.",
  },
  {
    id: "4e-B-fonction-7",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Comprendre et utiliser la notion de fonction",
    objectif: "Représenter graphiquement une fonction linéaire, une fonction affine.",
    page: 134,
    micros: [],
    note: "⛔ TROU VOLONTAIRE : objectif de CYCLE couvert en 3e. Ne pas le faire descendre.",
  },
  {
    id: "4e-B-fonction-8",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Comprendre et utiliser la notion de fonction",
    objectif: "Modéliser un phénomène continu par une fonction.",
    page: 134,
    micros: ["fonction_probleme"],
    note: "⛔ TROU.",
  },
  {
    id: "4e-B-fonction-9",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Comprendre et utiliser la notion de fonction",
    objectif: "Modéliser une situation de proportionnalité à l'aide d'une fonction linéaire.",
    page: 134,
    micros: [],
    note: "⛔ TROU VOLONTAIRE : la fonction linéaire est de 3e. En 4e, la même situation se traite avec `prop_coeff` (4e-B-proportionnalite-1).",
  },
  {
    id: "4e-B-fonction-10",
    domaine: "Thème B — Organisation et gestion de données, fonctions",
    chapitre: "Comprendre et utiliser la notion de fonction",
    objectif: "Résoudre des problèmes modélisés par des fonctions.",
    page: 134,
    micros: ["fonction_probleme", "fonction_defi"],
    note: "⛔ TROU.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // THÈME C — GRANDEURS ET MESURES
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── Calculer avec des grandeurs mesurables ────────────────────────────────
  {
    id: "4e-C-grandeurs-1",
    domaine: "Thème C — Grandeurs et mesures",
    chapitre:
      "Calculer avec des grandeurs mesurables ; exprimer les résultats dans les unités adaptées",
    objectif: "Notion de grandeur produit et de grandeur quotient.",
    page: 135,
    micros: ["grandeur_produit", "grandeur_quotient", "grandeur_unite_composee"],
    note: "✅ COMBLÉ LE 28/08/2026 par la notion `grandeur_composee`. ⭐ Le nom des DEUX familles est enseigné, et l'unité sert de preuve : un exposant trahit un produit, une barre de fraction trahit un quotient. Une vitesse était auparavant calculée dans `prop_probleme` sans jamais être nommée.",
  },
  {
    id: "4e-C-grandeurs-2",
    domaine: "Thème C — Grandeurs et mesures",
    chapitre:
      "Calculer avec des grandeurs mesurables ; exprimer les résultats dans les unités adaptées",
    objectif:
      "Aire du parallélogramme (obtenue à partir de celle du rectangle par découpage et recollement).",
    page: 135,
    micros: ["aire_parallelogramme", "quadrilatere_parallelogramme_aire"],
    note: "⭐ « Par découpage et recollement » est exactement le dessin de la fiche `maths/4e/aire-surface`, écrite le 27/08/2026 avant que cette ligne du BO ne soit lue.",
  },
  {
    id: "4e-C-grandeurs-3",
    domaine: "Thème C — Grandeurs et mesures",
    chapitre:
      "Calculer avec des grandeurs mesurables ; exprimer les résultats dans les unités adaptées",
    objectif: "Volume d'un prisme, d'une pyramide, d'un cylindre, d'un cône, d'une boule.",
    page: 135,
    micros: ["volume_prisme", "volume_cylindre", "volume_pave", "volume_lien_aire"],
    note: "⚠️ Deux solides sur cinq. PYRAMIDE, CÔNE et BOULE ont zéro occurrence en 4e. ⛔ Objectif de CYCLE : vérifier les repères annuels avant d'en faire un chantier de 4e — le nouveau programme, lui, fait arriver le volume de la pyramide et du cône EN 4e à partir de 2027.",
  },
  {
    id: "4e-C-grandeurs-4",
    domaine: "Thème C — Grandeurs et mesures",
    chapitre:
      "Calculer avec des grandeurs mesurables ; exprimer les résultats dans les unités adaptées",
    objectif:
      "Correspondance entre unités de volume et de contenance (1 L = 1 dm³, 1 000 L = 1 m³).",
    page: 135,
    micros: ["volume_unite"],
  },
  {
    id: "4e-C-grandeurs-5",
    domaine: "Thème C — Grandeurs et mesures",
    chapitre:
      "Calculer avec des grandeurs mesurables ; exprimer les résultats dans les unités adaptées",
    objectif:
      "Mener des calculs impliquant des grandeurs mesurables, notamment des grandeurs composées, exprimer les résultats dans les unités adaptées.",
    page: 135,
    micros: [
      "aire_comprendre",
      "aire_rectangle",
      "aire_carre",
      "aire_triangle",
      "aire_figure",
      "aire_probleme",
      "aire_defi",
      "aire_perimetre_comprendre",
      "aire_perimetre_rectangle",
      "aire_perimetre_carre",
      "aire_perimetre_triangle",
      "aire_perimetre_figure",
      "aire_perimetre_probleme",
      "aire_perimetre_defi",
      "volume_comprendre",
      "volume_defi",
      "grandeur_produit",
      "grandeur_quotient",
      "grandeur_defi",
    ],
    note: "✅ COMPLÉTÉ LE 28/08/2026. Longueurs, aires et volumes étaient couverts ; le mot qui manquait était « COMPOSÉES », et il l'est depuis l'ouverture de `grandeur_composee` — vitesse, débit, prix au kilo, énergie en kWh.",
  },
  {
    id: "4e-C-grandeurs-6",
    domaine: "Thème C — Grandeurs et mesures",
    chapitre:
      "Calculer avec des grandeurs mesurables ; exprimer les résultats dans les unités adaptées",
    objectif: "Vérifier la cohérence des résultats du point de vue des unités.",
    page: 135,
    micros: ["grandeur_coherence"],
    note: "✅ COMBLÉ LE 28/08/2026. ⭐ C'est un CONTRÔLE, pas un calcul : « 12 cm³ » ne peut pas être une aire, et l'unité seule suffit à rejeter le résultat sans rien recalculer. La micro traite aussi le second contrôle, distinct — l'ORDRE DE GRANDEUR (« un cycliste à 250 km/h »), où l'unité est juste mais la valeur absurde.",
  },
  {
    id: "4e-C-grandeurs-7",
    domaine: "Thème C — Grandeurs et mesures",
    chapitre:
      "Calculer avec des grandeurs mesurables ; exprimer les résultats dans les unités adaptées",
    objectif: "Effectuer des conversions d'unités.",
    page: 135,
    micros: ["volume_unite", "grandeur_convertir"],
    note: "✅ COMPLÉTÉ LE 28/08/2026. Les volumes étaient seuls ; les LONGUEURS et les AIRES sont arrivées avec `grandeur_composee`. ⭐ Et elles y sont rangées exprès : dans « aires », « 1 m² = 10 000 cm² » serait une recette ; ici c'est une CONSÉQUENCE — si 1 m = 100 cm, alors 1 m² = 100 × 100 cm². L'élève refait le raisonnement au lieu de mémoriser un tableau, et il cesse de se tromper d'un facteur 100.",
  },

  // ─── Comprendre l'effet de quelques transformations ────────────────────────
  {
    id: "4e-C-transformations-1",
    domaine: "Thème C — Grandeurs et mesures",
    chapitre: "Comprendre l'effet de quelques transformations sur les figures géométriques",
    objectif:
      "Effet d'un déplacement, d'un agrandissement ou d'une réduction sur les longueurs, les angles, les aires et les volumes.",
    page: 135,
    micros: [
      "sym_transformation_propriete",
      "agrandissement_rapport",
      "agrandissement_aire",
      "agrandissement_volume",
    ],
    note: "✅ COMPLÉTÉ LE 28/08/2026. Le DÉPLACEMENT était couvert (les transformations conservent longueurs et angles) ; l'agrandissement-réduction ne tenait qu'à deux items isolés dans des blocs de défis. Les quatre grandeurs de la puce sont désormais là — longueurs × k, angles inchangés, aires × k², volumes × k³.",
  },
  {
    id: "4e-C-transformations-2",
    domaine: "Thème C — Grandeurs et mesures",
    chapitre: "Comprendre l'effet de quelques transformations sur les figures géométriques",
    objectif:
      "Utiliser un rapport de réduction ou d'agrandissement (architecture, maquettes) pour calculer des longueurs, des aires, des volumes.",
    page: 135,
    micros: ["agrandissement_rapport", "agrandissement_aire", "agrandissement_volume"],
    note: "✅ COMBLÉ LE 28/08/2026 par la notion `prop_echelle`, et les TROIS grandeurs de la puce ont chacune leur micro — c'est ce que « longueurs, aires, volumes » exige. ⭐ Le k² est le point cher : un item figé le fait COMPTER sur un dessin (un carré de côté 2 tient quatre fois dans un carré de côté 4) plutôt que l'énoncer.",
  },
  {
    id: "4e-C-transformations-3",
    domaine: "Thème C — Grandeurs et mesures",
    chapitre: "Comprendre l'effet de quelques transformations sur les figures géométriques",
    objectif: "Utiliser l'échelle d'une carte.",
    page: 135,
    micros: ["echelle_comprendre", "echelle_distance_reelle", "echelle_distance_plan", "echelle_defi"],
    note: "✅ COMBLÉ LE 28/08/2026. La 4e reprend les identifiants de la 6e — l'élève retrouve le même geste d'une année sur l'autre — mais les énoncés sont de 4e : cartes IGN, maquettes d'architecte, plans de terrain.",
  },
  {
    id: "4e-C-transformations-4",
    domaine: "Thème C — Grandeurs et mesures",
    chapitre: "Comprendre l'effet de quelques transformations sur les figures géométriques",
    objectif: "Utiliser des transformations pour calculer des grandeurs géométriques.",
    page: 135,
    micros: ["sym_transformation_propriete", "sym_transformation_defi"],
  },
  {
    id: "4e-C-transformations-5",
    domaine: "Thème C — Grandeurs et mesures",
    chapitre: "Comprendre l'effet de quelques transformations sur les figures géométriques",
    objectif:
      "Faire le lien entre la proportionnalité et certaines configurations ou transformations géométriques (agrandissement réduction, triangles semblables, homothéties).",
    page: 135,
    micros: ["thales_configuration", "thales_rapport", "thales_calculer_longueur", "thales_defi"],
    note: "⚠️ Thalès porte tout le lien à lui seul. Ni agrandissement-réduction, ni triangles semblables (le mot « semblables » du dépôt désigne les TERMES semblables du calcul littéral), ni homothéties.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // THÈME D — ESPACE ET GÉOMÉTRIE
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── Représenter l'espace ──────────────────────────────────────────────────
  {
    id: "4e-D-espace-1",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Représenter l'espace",
    objectif: "Abscisse, ordonnée, altitude.",
    page: 136,
    micros: [],
    note: "⛔ TROU. Les mots n'existent en 4e que par accident : « altitude » dans des énoncés de nombres relatifs, « abscisse » et « ordonnée » dans deux gabarits de translation. ⚠️⚠️ ET CES DEUX GABARITS SONT FAUX POUR UN REPÈRE : `4e_sym_translation_tpl_2_coordonnees` et `4e_sym_translation_tpl_4` comptent l'ordonnée VERS LE BAS (« ordonnée écran »), si bien que la réponse mathématiquement juste y est proposée comme LEURRE. À corriger avant d'ouvrir le repérage, sinon le trou se comblera par-dessus une erreur.",
  },
  {
    id: "4e-D-espace-2",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Représenter l'espace",
    objectif: "Latitude, longitude.",
    page: 136,
    micros: [],
    note: "⛔ TROU. Zéro occurrence de « latitude » en 4e.",
  },
  {
    id: "4e-D-espace-3",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Représenter l'espace",
    objectif:
      "(Se) repérer sur une droite graduée, dans le plan muni d'un repère orthogonal, dans un parallélépipède rectangle, sur une sphère.",
    page: 136,
    micros: [],
    note: "⛔ TROU sur les quatre supports. Voir 4e-A-comparaisons-4 pour la droite graduée et 4e-D-espace-1 pour l'erreur d'orientation du plan.",
  },
  {
    id: "4e-D-espace-4",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Représenter l'espace",
    objectif:
      "Reconnaître des solides (pavé droit, cube, prisme, cylindre, pyramide, cône, boule).",
    page: 136,
    micros: [],
    note: "⛔ TROU. Le pavé, le prisme et le cylindre traversent `volume_solide`, mais toujours comme SUPPORT d'un calcul de volume : aucun item ne demande de reconnaître ou de nommer un solide.",
  },
  {
    id: "4e-D-espace-5",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Représenter l'espace",
    objectif:
      "Construire et mettre en relation des représentations de ces solides (vues en perspective cavalière, de face, de dessus, sections planes, patrons, etc.).",
    page: 136,
    micros: [],
    note: "⛔ TROU. La 6e a la notion `vision_espace` (vues, perspective, patron, dénombrement) ; la 4e n'a rien.",
  },
  {
    id: "4e-D-espace-6",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Représenter l'espace",
    objectif: "Utiliser un logiciel de géométrie dynamique pour représenter des solides.",
    page: 136,
    micros: [],
    note: "⛔ TROU ASSUMÉ : un geste de logiciel ne s'évalue pas en QCM. Travail de classe, pas de coach.",
  },

  // ─── Utiliser les notions de géométrie plane pour démontrer ────────────────
  {
    id: "4e-D-geometrie-1",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Utiliser les notions de géométrie plane pour démontrer",
    objectif:
      "Caractérisation angulaire du parallélisme : angles alternes internes, angles correspondants.",
    page: 136,
    micros: [],
    note: "⛔ TROU. Zéro occurrence d'« alternes internes » en 4e. ⚠️ C'est pourtant l'outil que le BO propose pour démontrer la somme des angles d'un triangle.",
  },
  {
    id: "4e-D-geometrie-2",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Utiliser les notions de géométrie plane pour démontrer — Triangle",
    objectif:
      "Somme des angles d'un triangle (démonstration possible en utilisant les angles correspondants).",
    page: 136,
    micros: [],
    note: "⛔ TROU EN 4e. Couvert en 6e (`triangle_somme_angle`, `triangle_angle_manquant`) ; aucune micro de 4e ne le réactive, et la 4e ne dispose d'aucune notion « triangle ».",
  },
  {
    id: "4e-D-geometrie-3",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Utiliser les notions de géométrie plane pour démontrer — Triangle",
    objectif: "Hauteurs et médiatrices.",
    page: 136,
    micros: [],
    note: "⛔ TROU. Le mot « hauteur » est partout en 4e, mais toujours comme LONGUEUR d'une formule d'aire ou de volume, jamais comme droite du triangle. « Médiatrice » n'apparaît que dans la définition de la symétrie axiale.",
  },
  {
    id: "4e-D-geometrie-4",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Utiliser les notions de géométrie plane pour démontrer — Triangle",
    objectif: "Inégalité triangulaire.",
    page: 136,
    micros: [],
    note: "⛔ TROU EN 4e. Couvert en 6e (`distance_inegalite`, `triangle_possible_ou_non`).",
  },
  {
    id: "4e-D-geometrie-5",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Utiliser les notions de géométrie plane pour démontrer — Triangle",
    objectif: "Cas d'égalité des triangles.",
    page: 136,
    micros: [],
    note: "⛔⭐ TROU, ET C'EST LA PUCE QUE L'EXTRACTION AUTOMATIQUE PERDAIT dans les deux PDF testés. Seule une capture d'écran l'a rendue lisible. Elle est bien au programme du cycle 4, et la compétence 4e-D-geometrie-12 la confirme. Zéro occurrence en 4e.",
  },
  {
    id: "4e-D-geometrie-6",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Utiliser les notions de géométrie plane pour démontrer — Triangle",
    objectif: "Triangles semblables (une définition et une propriété caractéristique).",
    page: 136,
    micros: [],
    note: "⛔ TROU. ⚠️ Piège de recherche : les 56 occurrences de « semblables » en 4e sont toutes des TERMES semblables du calcul littéral.",
  },
  {
    id: "4e-D-geometrie-7",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Utiliser les notions de géométrie plane pour démontrer",
    objectif: "Parallélogramme (une définition et une propriété caractéristique).",
    page: 136,
    micros: [
      "quadrilatere_parallelogramme_reconnaitre",
      "quadrilatere_parallelogramme_propriete",
      "quadrilatere_parallelogramme_diagonale",
    ],
  },
  {
    id: "4e-D-geometrie-8",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Utiliser les notions de géométrie plane pour démontrer",
    objectif:
      "Le théorème de Thalès et sa réciproque (configurations des triangles emboîtés et du papillon).",
    page: 136,
    micros: [
      "thales_configuration",
      "thales_rapport",
      "thales_calculer_longueur",
      "thales_reciproque_verifier",
      "thales_reciproque_conclure",
    ],
    note: "⚠️ Horizon 2027 : le nouveau programme fait passer Thalès en 3e. Ne pas investir davantage ici.",
  },
  {
    id: "4e-D-geometrie-9",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Utiliser les notions de géométrie plane pour démontrer",
    objectif: "Le théorème de Pythagore et sa réciproque.",
    page: 136,
    micros: [
      "pythagore_reconnaitre",
      "pythagore_calculer_hypotenuse",
      "pythagore_calculer_cote",
      "pythagore_reciproque_verifier",
      "pythagore_reciproque_conclure",
    ],
  },
  {
    id: "4e-D-geometrie-10",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Utiliser les notions de géométrie plane pour démontrer",
    objectif:
      "Lignes trigonométriques dans le triangle rectangle : cosinus, sinus, tangente.",
    page: 136,
    micros: ["cos_cotes", "cos_definition", "cos_calculer_longueur", "cos_calculer_angle"],
    note: "⚠️ Le COSINUS seulement — ce qui correspond aux repères annuels de 4e. Sinus et tangente relèvent de la 3e. Horizon 2027 : la trigonométrie passe entièrement en 3e.",
  },
  {
    id: "4e-D-geometrie-11",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Utiliser les notions de géométrie plane pour démontrer",
    objectif:
      "Mettre en œuvre ou écrire un protocole de construction d'une figure géométrique.",
    page: 136,
    micros: [],
    note: "⛔ TROU. Une construction ne se rend pas en QCM, mais un PROTOCOLE s'écrit et se relit : la 6e le fait (`bissectrice_construire`, `mediatrice_construire`).",
  },
  {
    id: "4e-D-geometrie-12",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Utiliser les notions de géométrie plane pour démontrer",
    objectif:
      "Faire le lien entre les cas d'égalité des triangles et la construction d'un triangle à partir de la donnée de longueurs des côtés et/ou de mesures d'angles.",
    page: 136,
    micros: [],
    note: "⛔ TROU. C'est la compétence qui confirme que les cas d'égalité (4e-D-geometrie-5) sont bien au programme.",
  },
  {
    id: "4e-D-geometrie-13",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Utiliser les notions de géométrie plane pour démontrer",
    objectif:
      "Comprendre l'effet d'une translation, d'une symétrie (axiale et centrale), d'une rotation, d'une homothétie sur une figure.",
    page: 136,
    micros: ["sym_axiale", "sym_centrale", "sym_translation", "sym_rotation", "sym_transformation_propriete"],
    note: "⚠️ Quatre transformations sur cinq : l'HOMOTHÉTIE n'a aucun item. ⭐ Le BO précise que « les définitions ponctuelles d'une rotation, d'une translation, d'une homothétie ne figurent pas au programme » — c'est donc l'EFFET qui se travaille, pas la définition.",
  },
  {
    id: "4e-D-geometrie-14",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Utiliser les notions de géométrie plane pour démontrer",
    objectif:
      "Mobiliser les connaissances des figures, des configurations et des transformations au programme pour déterminer des grandeurs géométriques.",
    page: 136,
    micros: [
      "pythagore_defi",
      "cos_probleme",
      "cos_defi",
      "quadrilatere_parallelogramme_probleme",
      "quadrilatere_parallelogramme_defi",
    ],
  },
  {
    id: "4e-D-geometrie-15",
    domaine: "Thème D — Espace et géométrie",
    chapitre: "Utiliser les notions de géométrie plane pour démontrer",
    objectif:
      "Mener des raisonnements et s'initier à la démonstration en utilisant les propriétés des figures, des configurations et des transformations.",
    page: 136,
    micros: [
      "pythagore_rediger",
      "thales_rediger",
      "quadrilatere_parallelogramme_montrer",
    ],
    note: "⭐ C'est le cœur de l'attendu « géométrie plane pour DÉMONTRER », et le coach le porte bien : trois micros de rédaction et de preuve.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // THÈME E — ALGORITHMIQUE ET PROGRAMMATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "4e-E-algo-1",
    domaine: "Thème E — Algorithmique et programmation",
    chapitre: "Écrire, mettre au point, exécuter un programme",
    objectif: "Notions d'algorithme et de programme.",
    page: 137,
    micros: ["algo_programme_objectif"],
  },
  {
    id: "4e-E-algo-2",
    domaine: "Thème E — Algorithmique et programmation",
    chapitre: "Écrire, mettre au point, exécuter un programme",
    objectif: "Notion de variable informatique.",
    page: 137,
    micros: ["algo_variable"],
  },
  {
    id: "4e-E-algo-3",
    domaine: "Thème E — Algorithmique et programmation",
    chapitre: "Écrire, mettre au point, exécuter un programme",
    objectif: "Déclenchement d'une action par un événement.",
    page: 137,
    micros: [],
    note: "⚠️ TROU ÉTROIT. Le drapeau vert n'est cité qu'une fois, dans un item de `algo_modifier`. Le déclenchement par événement n'a aucune micro. ⭐ C'est le seul point du thème E que « La pensée informatique — Quatrième » du programme 2027 n'aligne pas déjà.",
  },
  {
    id: "4e-E-algo-4",
    domaine: "Thème E — Algorithmique et programmation",
    chapitre: "Écrire, mettre au point, exécuter un programme",
    objectif: "Séquences d'instructions, boucles, instructions conditionnelles.",
    page: 137,
    micros: ["algo_condition", "algo_instruction_conditionnelle"],
    note: "⚠️ Les CONDITIONNELLES ont deux micros dédiées ; les BOUCLES traversent les items (une dizaine d'occurrences) sans micro propre.",
  },
  {
    id: "4e-E-algo-5",
    domaine: "Thème E — Algorithmique et programmation",
    chapitre: "Écrire, mettre au point, exécuter un programme",
    objectif:
      "Écrire, mettre au point (tester, corriger) et exécuter un programme en réponse à un problème donné.",
    page: 137,
    micros: ["algo_programme_objectif", "algo_modifier", "algo_defi"],
    note: "⭐ « La pensée informatique — Quatrième » du programme 2027 énonce mot pour mot les cinq micros de `algo_programmation` : la fiche du 27/08/2026 est déjà alignée sur 2027.",
  },
];

/**
 * Les micros que le coach de 4e garde SANS objectif d'apprentissage correspondant.
 *
 * ⛔ Chaque ligne est une dette : soit on l'accroche à un objectif dans
 * `objectifsBO4eMaths`, soit on écrit ici pourquoi on la garde. Le vérificateur
 * refuse toute micro non couverte qui ne figure pas dans cette liste — c'est ce
 * qui empêche le hors-programme de s'installer en silence.
 */
export const microsHorsProgramme4eMaths: { micro: string; raison: string }[] = [];
