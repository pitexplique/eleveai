// ─── Le programme de 6e, écrit comme une DONNÉE ────────────────────────────────
//
// ⛔ POURQUOI CE FICHIER EXISTE (22/08/2026). Frédéric : « on refait le BO, ce
// doit être parfait — une fois que ce sera fait, personne ne pourra dire que ce
// n'est pas calé sur le BO ». Or ce qui garantissait la conformité, jusqu'ici,
// c'était **une lecture humaine**. Rien dans le dépôt ne la retenait, et rien ne
// la rejouait.
//
// ⭐ LE POINT AVEUGLE QUE CE FICHIER FERME. Les six vérificateurs de banque
// comptent les items d'une micro EXISTANTE : générateurs, variété, canvas,
// LaTeX, doublons, démarrage. Aucun ne demande **si une micro manque** — un trou
// n'a rien à compter, donc il ne déclenche rien. C'est ainsi que neuf chapitres
// entiers du programme de 6e sont restés absents sans qu'un seul voyant passe au
// rouge : les durées, la médiatrice, la bissectrice, le cercle circonscrit, la
// vision dans l'espace, les échelles, l'algèbre, les distances, et les
// opérations sur les fractions.
//
// ⭐ CE FICHIER SE LIT DANS LES DEUX SENS, et c'est tout son intérêt :
//   · un objectif sans micro          → un TROU : un élève n'a rien pour travailler ça ;
//   · une micro sans objectif         → du HORS-PROGRAMME (les 99 losanges de la 6e).
// `scripts/verifier-bo.ts` fait les deux lectures et refuse la seconde si elle
// n'est pas déclarée et justifiée dans `microsHorsProgramme`.
//
// SOURCE, et une seule : « Exemples pour la mise en œuvre des programmes — 6e,
// Mathématiques, Exemples de réussite », MENESR, 2025 (21 pages). Les intitulés
// sont RECOPIÉS, jamais reformulés : le jour où le programme bouge, on compare
// deux textes, pas deux souvenirs. Le numéro de page est indiqué pour que la
// vérification prenne trente secondes.
//
// ⚠️ `micros: []` n'est pas un oubli, c'est un CONSTAT : personne ne couvre cet
// objectif. Ne jamais y mettre une micro « qui s'en rapproche » pour faire
// passer le vérificateur au vert — ce serait remettre le mensonge dans le
// fichier censé l'empêcher.

/** Un objectif d'apprentissage du programme, et ce qui le couvre dans le coach. */
export type ObjectifBO = {
  /** Identifiant stable : <classe>-<domaine>-<chapitre>-<n>. */
  id: string;
  /** Le domaine du programme (le grand titre bleu du document). */
  domaine: string;
  /** Le chapitre (le sous-titre orange). */
  chapitre: string;
  /** L'intitulé EXACT de l'objectif d'apprentissage. Recopié, pas résumé. */
  objectif: string;
  /** Page du document officiel où il se lit. */
  page: number;
  /** Les microId du coach qui le couvrent. Vide = trou assumé et signalé. */
  micros: string[];
  /** Précision utile à la relecture (un exemple de réussite marquant). */
  note?: string;
};

export const objectifsBO6eMaths: ObjectifBO[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // NOMBRES, CALCUL ET RÉSOLUTION DE PROBLÈMES
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── Les nombres entiers et décimaux ───────────────────────────────────────
  {
    id: "6e-N-entiers-1",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers et décimaux",
    objectif:
      "Connaître et utiliser la valeur des chiffres selon leur rang dans l'écriture d'un nombre.",
    page: 1,
    micros: ["entier_rang", "decimal_rang"],
  },
  {
    id: "6e-N-entiers-2",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers et décimaux",
    objectif:
      "Connaître les liens entre les unités de numération unité, dizaine, centaine, millier, dixième, centième, millième.",
    page: 1,
    micros: ["entier_decomposer", "decimal_rang"],
  },
  {
    id: "6e-N-entiers-3",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers et décimaux",
    objectif: "Connaître des grands nombres entiers.",
    page: 1,
    micros: ["entier_lire_ecrire"],
    note: "Les principes de la numération sont étendus à la classe des milliards.",
  },
  {
    id: "6e-N-entiers-4",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers et décimaux",
    objectif: "Reconnaître un nombre décimal.",
    page: 2,
    micros: ["decimal_lire_ecrire"],
  },
  {
    id: "6e-N-entiers-5",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers et décimaux",
    objectif: "Connaître la définition d'un pourcentage.",
    page: 2,
    micros: ["pourcentage_comprendre", "pourcentage_fraction"],
  },
  {
    id: "6e-N-entiers-6",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers et décimaux",
    objectif:
      "Associer et utiliser différentes écritures d'un nombre décimal : écriture à virgule, fraction, nombre mixte, pourcentage.",
    page: 2,
    micros: ["fraction_decimal", "pourcentage_decimal"],
    note: "⚠️ Le NOMBRE MIXTE (6/5 = 1 + 1/5 = 1,2) n'est couvert par aucune micro.",
  },
  {
    id: "6e-N-entiers-7",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers et décimaux",
    objectif:
      "Placer sur une demi-droite graduée un point dont l'abscisse est un nombre décimal. Repérer un nombre décimal sur une demi-droite graduée.",
    page: 2,
    micros: [],
  },
  {
    id: "6e-N-entiers-8",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers et décimaux",
    objectif: "Comparer deux nombres décimaux. Ordonner une liste de nombres décimaux.",
    page: 2,
    micros: ["decimal_comparer"],
  },
  {
    id: "6e-N-entiers-9",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers et décimaux",
    objectif:
      "Donner la valeur arrondie à l'unité, au dixième, ou au centième d'un nombre décimal. Déterminer ou connaître la valeur arrondie de certains nombres non décimaux.",
    page: 2,
    micros: [],
    note: "Le BO cite π : « il sait que π n'est pas un nombre décimal, et que 3,14 en est la valeur arrondie au centième ».",
  },
  {
    id: "6e-N-entiers-10",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers et décimaux",
    objectif:
      "Encadrer un nombre décimal par deux nombres décimaux, intercaler un nombre décimal entre deux nombres décimaux.",
    page: 2,
    micros: [],
    note: "`entier_encadrer` ne traite que les entiers.",
  },
  {
    id: "6e-N-entiers-11",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers et décimaux",
    objectif: "Additionner et soustraire des nombres décimaux.",
    page: 2,
    micros: ["decimal_additionner", "entier_addition_posee", "entier_soustraction_posee"],
  },
  {
    id: "6e-N-entiers-12",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers et décimaux",
    objectif:
      "Multiplier un nombre entier ou un nombre décimal par 0,1, par 0,01, et par 0,001. Connaître le lien avec la division par 10, 100 et par 1 000.",
    page: 2,
    micros: [],
    note: "Le BO demande de MÉMORISER 10 × 0,1 = 1 ; 0,1 × 0,1 = 0,01 ; etc.",
  },
  {
    id: "6e-N-entiers-13",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers et décimaux",
    objectif:
      "Comprendre le sens de la multiplication de deux nombres décimaux. Calculer le produit de deux nombres décimaux.",
    page: 3,
    micros: ["decimal_multiplier", "entier_multiplication_posee"],
    note: "Le sens s'appuie sur l'aire d'un rectangle de 3,7 dm sur 2,9 dm.",
  },
  {
    id: "6e-N-entiers-14",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers et décimaux",
    objectif: "Contrôler les résultats à l'aide d'ordres de grandeur.",
    page: 3,
    micros: ["entier_calcul_verifier", "entier_strategie_mentale"],
  },
  {
    id: "6e-N-entiers-15",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers et décimaux",
    objectif:
      "Résoudre des problèmes mettant en jeu des multiplications entre des nombres décimaux.",
    page: 3,
    micros: ["decimal_calcul_defi"],
  },
  {
    id: "6e-N-entiers-16",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers et décimaux",
    objectif:
      "Diviser un nombre décimal par un nombre entier non nul inférieur à 10. Résoudre des problèmes mettant en jeu des divisions décimales.",
    page: 3,
    micros: ["decimal_diviser_par_entier", "entier_division_posee"],
  },
  {
    id: "6e-N-entiers-17",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers et décimaux",
    objectif:
      "Effectuer la division euclidienne d'un nombre entier par un nombre entier inférieur à 100. Résoudre des problèmes mettant en jeu des divisions euclidiennes.",
    page: 4,
    micros: ["entier_division_posee", "entier_division_mentale", "entier_calcul_pose_defi"],
    note: "En 6e le diviseur monte à 100 (au CM il était inférieur à 10).",
  },

  // ─── Les fractions ─────────────────────────────────────────────────────────
  {
    id: "6e-N-fractions-1",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les fractions",
    objectif:
      "Relier une fraction au résultat exact de la division de son numérateur par son dénominateur.",
    page: 5,
    micros: ["fraction_decimal"],
  },
  {
    id: "6e-N-fractions-2",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les fractions",
    objectif:
      "Comprendre et connaître la définition du quotient d'un entier a par un entier b non nul. Compléter des égalités à trou multiplicatives.",
    page: 5,
    micros: ["fraction_lire_ecrire"],
    note: "⚠️ Les ÉGALITÉS À TROU (b × … = a) ne sont couvertes par aucune micro.",
  },
  {
    id: "6e-N-fractions-3",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les fractions",
    objectif:
      "Placer une fraction sur une demi-droite graduée dans des cas simples. Graduer un segment de longueur donnée.",
    page: 5,
    micros: [],
  },
  {
    id: "6e-N-fractions-4",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les fractions",
    objectif:
      "Savoir que la fraction a/b peut représenter un nombre entier, un nombre décimal non entier ou un nombre non décimal.",
    page: 6,
    micros: ["fraction_decimal"],
    note: "Le BO relie ça à π : « il admet que le nombre π ne peut pas s'écrire sous la forme d'une fraction ».",
  },
  {
    id: "6e-N-fractions-5",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les fractions",
    objectif: "Utiliser une multiplication pour appliquer une fraction à un nombre entier.",
    page: 6,
    micros: ["fraction_quantite"],
    note: "2/5 de 60 = 2 × 60/5 = 24. L'élève est encouragé à simplifier AVANT de multiplier.",
  },
  {
    id: "6e-N-fractions-6",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les fractions",
    objectif: "Établir des égalités de fractions.",
    page: 6,
    micros: ["fraction_representer"],
    note: "⚠️ Couverture faible : 7/3 = 14/6 se joue sur la règle « on multiplie numérateur et dénominateur par le même nombre », que `fraction_representer` n'énonce pas.",
  },
  {
    id: "6e-N-fractions-7",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les fractions",
    objectif: "Comparer et encadrer des fractions.",
    page: 6,
    micros: ["fraction_comparer"],
  },
  {
    id: "6e-N-fractions-8",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les fractions",
    objectif:
      "Ordonner une liste de nombres écrits sous forme de fractions ou de nombres mixtes.",
    page: 7,
    micros: [],
    note: "Comparer à 1 et à 1/2, encadrer par deux entiers consécutifs, écriture mixte.",
  },
  {
    id: "6e-N-fractions-9",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les fractions",
    objectif: "Additionner et soustraire des fractions. Multiplier une fraction par un nombre entier.",
    page: 7,
    micros: ["fraction_additionner", "fraction_multiplier_entier"],
  },
  {
    id: "6e-N-fractions-10",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les fractions",
    objectif: "Résoudre des problèmes mettant en jeu des fractions. Inventer des problèmes mettant en jeu des fractions.",
    page: 7,
    micros: ["fraction_calcul_defi", "fraction_defi"],
    note: "⚠️ « Inventer » n'est pas évaluable en QCM : c'est un travail de classe, pas de coach.",
  },

  // ─── Pourcentages ──────────────────────────────────────────────────────────
  {
    id: "6e-N-pourcentages-1",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Pourcentages",
    objectif: "Comprendre le sens d'un pourcentage.",
    page: 7,
    micros: ["pourcentage_comprendre", "pourcentage_lire"],
  },
  {
    id: "6e-N-pourcentages-2",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Pourcentages",
    objectif:
      "Calculer une proportion (rapport entre une partie et le tout) et l'exprimer sous forme de pourcentage dans des cas simples.",
    page: 7,
    micros: ["pourcentage_fraction", "pourcentage_calcul_simple"],
  },
  {
    id: "6e-N-pourcentages-3",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Pourcentages",
    objectif: "Appliquer un pourcentage à une grandeur ou à un nombre.",
    page: 7,
    micros: ["pourcentage_calcul_simple", "pourcentage_defi"],
  },

  // ─── Algèbre ───────────────────────────────────────────────────────────────
  {
    id: "6e-N-algebre-1",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Algèbre",
    objectif: "Utiliser des modèles pré-algébriques pour résoudre des problèmes algébriques.",
    page: 8,
    micros: [],
    note: "Schéma en barres : la prime d'or/argent/bronze, le prix de la pastèque et de l'ananas.",
  },
  {
    id: "6e-N-algebre-2",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Algèbre",
    objectif:
      "Identifier la structure d'un motif évolutif en repérant une régularité et en identifiant une structure.",
    page: 8,
    micros: [],
    note: "Les maisons en allumettes : 6 + (n − 1) × 5.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GRANDEURS ET MESURES
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── Les longueurs ─────────────────────────────────────────────────────────
  {
    id: "6e-GM-longueurs-1",
    domaine: "Grandeurs et mesures",
    chapitre: "Les longueurs",
    objectif: "Savoir que le périmètre du disque est proportionnel à son diamètre.",
    page: 9,
    micros: ["cercle_proportionnel"],
  },
  {
    id: "6e-GM-longueurs-2",
    domaine: "Grandeurs et mesures",
    chapitre: "Les longueurs",
    objectif: "Connaître la formule du périmètre d'un disque. Calculer le périmètre d'un disque.",
    page: 9,
    micros: ["cercle_perimetre"],
    note: "P = π × D ; P = 2 × π × R. π n'est pas décimal et ne s'écrit pas en fraction ; 3,14 en est l'arrondi au centième.",
  },
  {
    id: "6e-GM-longueurs-3",
    domaine: "Grandeurs et mesures",
    chapitre: "Les longueurs",
    objectif: "Calculer des périmètres de figures composées.",
    page: 9,
    micros: ["aire_perimetre_figure", "cercle_defi"],
    note: "Le BO vise des contours contenant des cercles ou des PORTIONS de cercles (le cerf-volant, la piste d'athlétisme de 400 m).",
  },
  {
    id: "6e-GM-longueurs-4",
    domaine: "Grandeurs et mesures",
    chapitre: "Les longueurs",
    objectif: "Résoudre des problèmes impliquant des longueurs.",
    page: 9,
    micros: ["aire_longueur_probleme", "aire_perimetre_probleme", "aire_longueur_defi"],
  },
  {
    id: "6e-GM-longueurs-5",
    domaine: "Grandeurs et mesures",
    chapitre: "Les longueurs",
    objectif:
      "Automatismes : du préfixe kilo au milli ; passer du mètre à un multiple ou sous-multiple et réciproquement.",
    page: 9,
    micros: ["aire_longueur_unite", "aire_longueur_convertir", "aire_longueur_mesurer", "aire_longueur_comparer"],
  },

  // ─── Les aires ─────────────────────────────────────────────────────────────
  {
    id: "6e-GM-aires-1",
    domaine: "Grandeurs et mesures",
    chapitre: "Les aires",
    objectif: "Effectuer des conversions d'aire.",
    page: 10,
    micros: [],
    note: "⛔ UNIQUEMENT m² ↔ dm² et dm² ↔ cm². « Les autres conversions d'aire ne figurent pas au programme », et « le recours à un tableau de conversion est déconseillé ».",
  },
  {
    id: "6e-GM-aires-2",
    domaine: "Grandeurs et mesures",
    chapitre: "Les aires",
    objectif:
      "Connaître la formule de l'aire d'un carré ou d'un rectangle. Calculer l'aire d'un carré ou d'un rectangle.",
    page: 10,
    micros: ["aire_rectangle", "aire_carre", "aire_probleme"],
    note: "« Aire = côté × côté » AVANT la forme littérale A = c × c ; « le passage à la formule ne doit pas se faire prématurément ».",
  },
  {
    id: "6e-GM-aires-3",
    domaine: "Grandeurs et mesures",
    chapitre: "Les aires",
    objectif:
      "Automatismes : comparer des aires sans avoir recours à la mesure, par superposition ou par découpage et recollement de surfaces.",
    page: 10,
    micros: ["aire_comparer"],
  },
  {
    id: "6e-GM-aires-4",
    domaine: "Grandeurs et mesures",
    chapitre: "Les aires",
    objectif:
      "Automatismes : savoir que 1 cm² est l'aire d'un carré de 1 cm de côté, 1 m² celle d'un carré de 1 m de côté, 1 dm² celle d'un carré de 1 dm de côté (de même 1 mm² et 1 km²).",
    page: 10,
    micros: ["aire_comprendre"],
  },
  {
    id: "6e-GM-aires-5",
    domaine: "Grandeurs et mesures",
    chapitre: "Les aires",
    objectif:
      "Automatismes : dans des cas simples, déterminer l'aire d'une surface en s'appuyant sur un quadrillage composé de carreaux dont les côtés mesurent 1 cm.",
    page: 10,
    micros: ["aire_compter", "aire_decomposer", "aire_defi"],
  },

  // ─── Les volumes ───────────────────────────────────────────────────────────
  {
    id: "6e-GM-volumes-1",
    domaine: "Grandeurs et mesures",
    chapitre: "Les volumes",
    objectif: "Connaître l'unité centimètre cube.",
    page: 10,
    micros: ["volume_unite"],
    note: "1 cm³ est le volume d'un cube d'arête 1 cm.",
  },
  {
    id: "6e-GM-volumes-2",
    domaine: "Grandeurs et mesures",
    chapitre: "Les volumes",
    objectif: "Comparer des volumes. Déterminer un volume.",
    page: 10,
    micros: ["volume_comparer", "volume_compter", "volume_assemblage", "volume_lire", "volume_defi"],
    note: "Uniquement des assemblages de cubes identiques — pas de formule de pavé en 6e.",
  },

  // ─── Le repérage dans le temps et les durées ───────────────────────────────
  {
    id: "6e-GM-durees-1",
    domaine: "Grandeurs et mesures",
    chapitre: "Le repérage dans le temps et les durées",
    objectif: "Effectuer des calculs sur des horaires et des durées.",
    page: 10,
    micros: ["duree_calculer"],
    note: "Instant initial, instant final, durée. La séance de cinéma de 17 h 40 qui dure 110 minutes.",
  },
  {
    id: "6e-GM-durees-2",
    domaine: "Grandeurs et mesures",
    chapitre: "Le repérage dans le temps et les durées",
    objectif: "Résoudre des problèmes impliquant des horaires, des durées.",
    page: 10,
    micros: ["duree_probleme", "duree_defi"],
    note: "Le tableau des bus : quel est le prochain, dans combien de temps.",
  },
  {
    id: "6e-GM-durees-3",
    domaine: "Grandeurs et mesures",
    chapitre: "Le repérage dans le temps et les durées",
    objectif: "Convertir des durées.",
    page: 11,
    micros: ["duree_convertir", "duree_decimale"],
    note: "0,5 h = 1/2 h = 30 min ; 0,25 h = 15 min ; 0,75 h = 45 min ; 0,1 h = 6 min. Écritures sexagésimale ET décimale.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ESPACE ET GÉOMÉTRIE
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── Distances ─────────────────────────────────────────────────────────────
  {
    id: "6e-G-distances-1",
    domaine: "Espace et géométrie",
    chapitre: "Étude de configurations planes — Distances",
    objectif: "Connaître et utiliser la définition de la distance entre deux points.",
    page: 11,
    micros: ["distance_definition", "distance_inegalite", "distance_defi"],
    note: "AC + CB ≥ AB, l'égalité uniquement si C appartient à [AB].",
  },
  {
    id: "6e-G-distances-2",
    domaine: "Espace et géométrie",
    chapitre: "Étude de configurations planes — Distances",
    objectif: "Connaître et utiliser la définition du milieu d'un segment.",
    page: 11,
    micros: ["distance_milieu"],
    note: "Le construire « par pliage, en utilisant un guide-âne, une règle graduée ou un compas et une règle non graduée ».",
  },

  // ─── Cercles et disques ────────────────────────────────────────────────────
  {
    id: "6e-G-cercles-1",
    domaine: "Espace et géométrie",
    chapitre: "Étude de configurations planes — Cercles et disques",
    objectif:
      "Connaître les définitions d'un cercle, d'un disque, d'un rayon, d'un diamètre, d'une corde.",
    page: 11,
    micros: ["cercle_vocabulaire"],
    note: "⚠️ La CORDE n'a aucun item : `cercle_vocabulaire` s'arrête au centre, au rayon et au diamètre.",
  },
  {
    id: "6e-G-cercles-2",
    domaine: "Espace et géométrie",
    chapitre: "Étude de configurations planes — Cercles et disques",
    objectif:
      "Comprendre la définition d'un cercle et celle d'un disque sous la forme d'ensembles de points.",
    page: 12,
    micros: [],
    note: "« Le cercle de centre O et de rayon 2 cm est l'ensemble des points situés à 2 cm de O. »",
  },
  {
    id: "6e-G-cercles-3",
    domaine: "Espace et géométrie",
    chapitre: "Étude de configurations planes — Cercles et disques",
    objectif: "Résoudre des problèmes mettant en jeu des distances à un point.",
    page: 12,
    micros: [],
    note: "La chèvre attachée à une corde de 8 m : hachurer la zone où elle peut brouter.",
  },

  // ─── Médiatrice d'un segment ───────────────────────────────────────────────
  {
    id: "6e-G-mediatrice-1",
    domaine: "Espace et géométrie",
    chapitre: "Étude de configurations planes — Médiatrice d'un segment",
    objectif: "Connaître la définition de la médiatrice d'un segment.",
    page: 12,
    micros: ["mediatrice_definition", "mediatrice_construire"],
    note: "La droite perpendiculaire au segment PASSANT PAR son milieu.",
  },
  {
    id: "6e-G-mediatrice-2",
    domaine: "Espace et géométrie",
    chapitre: "Étude de configurations planes — Médiatrice d'un segment",
    objectif: "Comprendre et utiliser la propriété caractéristique de la médiatrice d'un segment.",
    page: 12,
    micros: ["mediatrice_propriete"],
    note: "« La médiatrice d'un segment est l'ensemble des points équidistants des extrémités de ce segment. »",
  },
  {
    id: "6e-G-mediatrice-3",
    domaine: "Espace et géométrie",
    chapitre: "Étude de configurations planes — Médiatrice d'un segment",
    objectif:
      "Résoudre des problèmes en s'appuyant sur la propriété caractéristique de la médiatrice.",
    page: 13,
    micros: ["mediatrice_probleme", "mediatrice_defi"],
    note: "Placer le milieu d'une corde ; retrouver le centre inconnu d'un cercle.",
  },

  // ─── Angles ────────────────────────────────────────────────────────────────
  {
    id: "6e-G-angles-1",
    domaine: "Espace et géométrie",
    chapitre: "Étude de configurations planes — Angles",
    objectif:
      "Connaître et utiliser les angles ainsi que le lexique et les notations qui s'y rapportent : angle droit, angle plat, angle plein, angle nul, angle aigu, angle obtus, angles opposés par le sommet, angles adjacents, angles supplémentaires.",
    page: 13,
    micros: ["angle_reconnaitre", "angle_droit"],
    note: "⚠️ Couverture partielle : opposés par le sommet, adjacents et supplémentaires n'ont aucune micro.",
  },
  {
    id: "6e-G-angles-2",
    domaine: "Espace et géométrie",
    chapitre: "Étude de configurations planes — Angles",
    objectif: "Mesurer un angle. Construire un angle de mesure donnée.",
    page: 13,
    micros: ["angle_mesurer", "angle_tracer", "angle_comparer", "angle_defi"],
  },

  // ─── Bissectrice ───────────────────────────────────────────────────────────
  {
    id: "6e-G-bissectrice-1",
    domaine: "Espace et géométrie",
    chapitre: "Étude de configurations planes — Bissectrice d'un angle saillant",
    objectif: "Connaître la définition de la bissectrice d'un angle saillant.",
    page: 14,
    micros: ["bissectrice_definition"],
    note: "La droite qui partage l'angle en deux angles adjacents égaux ; c'est l'axe de symétrie de l'angle.",
  },
  {
    id: "6e-G-bissectrice-2",
    domaine: "Espace et géométrie",
    chapitre: "Étude de configurations planes — Bissectrice d'un angle saillant",
    objectif:
      "Utiliser la définition de la bissectrice d'un angle pour effectuer des constructions et résoudre des problèmes.",
    page: 14,
    micros: ["bissectrice_construire", "bissectrice_probleme", "bissectrice_defi"],
  },

  // ─── Triangles ─────────────────────────────────────────────────────────────
  {
    id: "6e-G-triangles-1",
    domaine: "Espace et géométrie",
    chapitre: "Étude de configurations planes — Triangles",
    objectif: "Construire des triangles.",
    page: 14,
    micros: ["triangle_possible_ou_non", "triangle_nommer", "triangle_sommet_cote"],
    note: "Trois cas : trois côtés ; deux côtés et l'angle compris ; un côté et les deux angles adjacents.",
  },
  {
    id: "6e-G-triangles-2",
    domaine: "Espace et géométrie",
    chapitre: "Étude de configurations planes — Triangles",
    objectif:
      "Connaître et utiliser les propriétés angulaires des triangles particuliers : triangle rectangle, triangle isocèle, triangle équilatéral.",
    page: 14,
    micros: ["triangle_type_cote", "triangle_type_angle", "triangle_defi"],
  },
  {
    id: "6e-G-triangles-3",
    domaine: "Espace et géométrie",
    chapitre: "Étude de configurations planes — Triangles",
    objectif:
      "Connaître la valeur de la somme des mesures des angles d'un triangle. L'utiliser pour calculer des angles, effectuer des constructions et résoudre des problèmes.",
    page: 14,
    micros: ["triangle_somme_angle", "triangle_angle_manquant", "triangle_propriete_defi"],
  },
  {
    id: "6e-G-triangles-4",
    domaine: "Espace et géométrie",
    chapitre: "Étude de configurations planes — Triangles",
    objectif:
      "Savoir que les médiatrices d'un triangle sont concourantes. Connaître et construire le cercle circonscrit à un triangle.",
    page: 15,
    micros: ["circonscrit_concourantes", "circonscrit_construire", "circonscrit_defi"],
    note: "⭐ Le BO demande que l'élève « restitue les arguments de la preuve » — pas seulement le résultat.",
  },

  // ─── Symétrie axiale ───────────────────────────────────────────────────────
  {
    id: "6e-G-symetrie-1",
    domaine: "Espace et géométrie",
    chapitre: "Étude de configurations planes — Symétrie axiale",
    objectif: "Connaître la définition du symétrique d'un point par rapport à une droite.",
    page: 15,
    micros: ["sym_reconnaitre", "sym_point"],
    note: "(d) est la médiatrice de [MM'] — la définition s'appuie donc sur la médiatrice.",
  },
  {
    id: "6e-G-symetrie-2",
    domaine: "Espace et géométrie",
    chapitre: "Étude de configurations planes — Symétrie axiale",
    objectif:
      "Connaître et utiliser les propriétés de la symétrie axiale pour effectuer des constructions.",
    page: 15,
    micros: ["sym_figure", "sym_propriete", "sym_axe", "sym_defi"],
  },

  // ─── La vision dans l'espace ───────────────────────────────────────────────
  {
    id: "6e-G-espace-1",
    domaine: "Espace et géométrie",
    chapitre: "La vision dans l'espace",
    objectif: "Voir dans l'espace des assemblages de cubes.",
    page: 16,
    micros: ["vision_vues", "vision_denombrer", "vision_representation", "vision_defi"],
    note: "Vues de dessus, de face, de gauche, de droite ; perspective cavalière ; patron ; dénombrer les cubes d'un empilement.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ORGANISATION ET GESTION DE DONNÉES ET PROBABILITÉS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "6e-D-donnees-1",
    domaine: "Organisation et gestion de données et probabilités",
    chapitre: "Organisation et gestion de données",
    objectif: "Planifier une enquête et recueillir des données.",
    page: 16,
    micros: [],
  },
  {
    id: "6e-D-donnees-2",
    domaine: "Organisation et gestion de données et probabilités",
    chapitre: "Organisation et gestion de données",
    objectif: "Réaliser des mesures et les consigner dans un tableau.",
    page: 16,
    micros: [],
  },
  {
    id: "6e-D-donnees-3",
    domaine: "Organisation et gestion de données et probabilités",
    chapitre: "Organisation et gestion de données",
    objectif: "Construire un tableau simple pour présenter des données (observations, caractères).",
    page: 17,
    micros: [],
  },
  {
    id: "6e-D-donnees-4",
    domaine: "Organisation et gestion de données et probabilités",
    chapitre: "Organisation et gestion de données",
    objectif: "Faire un choix en filtrant les données d'un tableau selon un critère.",
    page: 17,
    micros: [
      "stat_donnee_lire_tableau",
      "stat_donnee_prelever",
      "stat_donnee_comparer",
      "stat_donnee_interpreter",
      "stat_donnee_defi",
    ],
    note: "Le tableau de covoiturage : choisir le meilleur trajet selon un critère.",
  },
  {
    id: "6e-D-donnees-5",
    domaine: "Organisation et gestion de données et probabilités",
    chapitre: "Organisation et gestion de données",
    objectif: "Lire et interpréter un graphique ou un diagramme représentant des données.",
    page: 16,
    micros: ["stat_donnee_lire_graphique", "stat_donnee_lire_circulaire"],
    note: "Consigner les résultats dans un tableau « puis les représenter dans un repère par un ensemble de points ».",
  },
  {
    id: "6e-D-probabilites-1",
    domaine: "Organisation et gestion de données et probabilités",
    chapitre: "Les probabilités",
    objectif: "Savoir que la probabilité d'un évènement est un nombre compris entre 0 et 1.",
    page: 17,
    micros: ["proba_vocabulaire", "proba_comparer", "proba_lire"],
    note: "Positionner un évènement sur une échelle de probabilité graduée de 0 à 1.",
  },
  {
    id: "6e-D-probabilites-2",
    domaine: "Organisation et gestion de données et probabilités",
    chapitre: "Les probabilités",
    objectif: "Calculer des probabilités dans des situations simples d'équiprobabilité.",
    page: 17,
    micros: ["proba_issue", "proba_estimer", "proba_defi"],
    note: "Une probabilité s'exprime en fraction, en décimal OU en pourcentage.",
  },
  {
    id: "6e-D-probabilites-3",
    domaine: "Organisation et gestion de données et probabilités",
    chapitre: "Les probabilités",
    objectif:
      "Comparer des résultats d'une expérience aléatoire répétée à une probabilité calculée.",
    page: 18,
    micros: [],
    note: "Lancer 20 fois deux pièces, mettre les résultats en commun, comparer la proportion à la probabilité.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LA PROPORTIONNALITÉ
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "6e-P-proportionnalite-1",
    domaine: "La proportionnalité",
    chapitre: "La proportionnalité",
    objectif:
      "Connaître la définition de la proportionnalité entre deux grandeurs et la mettre en lien avec des expressions de la vie courante.",
    page: 18,
    micros: ["prop_reconnaitre"],
    note: "« prix au kilo », « nombre de feuilles imprimées par minute ».",
  },
  {
    id: "6e-P-proportionnalite-2",
    domaine: "La proportionnalité",
    chapitre: "La proportionnalité",
    objectif: "Identifier si une situation relève du « modèle » de la proportionnalité.",
    page: 18,
    micros: ["prop_reconnaitre", "prop_defi"],
    note: "Les contre-exemples à débattre : le lot de 4 paquets, le péage, la hauteur des marches.",
  },
  {
    id: "6e-P-proportionnalite-3",
    domaine: "La proportionnalité",
    chapitre: "La proportionnalité",
    objectif:
      "Résoudre un problème de proportionnalité en choisissant une procédure adaptée : propriété de linéarité pour la multiplication ou l'addition, retour à l'unité.",
    page: 18,
    micros: ["prop_unite", "prop_coeff", "prop_direct"],
  },
  {
    id: "6e-P-proportionnalite-4",
    domaine: "La proportionnalité",
    chapitre: "La proportionnalité",
    objectif:
      "Représenter une situation de proportionnalité à l'aide d'un tableau ou de notations symboliques.",
    page: 19,
    micros: ["prop_table"],
  },
  {
    id: "6e-P-proportionnalite-5",
    domaine: "La proportionnalité",
    chapitre: "La proportionnalité",
    objectif: "S'initier à la résolution de problèmes d'échelles.",
    page: 19,
    micros: [],
    note: "Échelle graphique : « 1 cm sur le plan correspond à 10 m dans la réalité ».",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INITIATION À LA PENSÉE INFORMATIQUE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "6e-I-informatique-1",
    domaine: "Initiation à la pensée informatique",
    chapitre: "Initiation à la pensée informatique",
    objectif: "Identifier une instruction ou une séquence d'instructions.",
    page: 19,
    micros: ["algo_sequence", "algo_lire_programme"],
  },
  {
    id: "6e-I-informatique-2",
    domaine: "Initiation à la pensée informatique",
    chapitre: "Initiation à la pensée informatique",
    objectif: "Produire et exécuter une séquence d'instructions.",
    page: 19,
    micros: ["algo_deplacement", "algo_figure"],
  },
  {
    id: "6e-I-informatique-3",
    domaine: "Initiation à la pensée informatique",
    chapitre: "Initiation à la pensée informatique",
    objectif: "Répéter à la main une séquence d'instructions pour accomplir une tâche imposée.",
    page: 20,
    micros: ["algo_repetition", "algo_defi"],
  },
  {
    id: "6e-I-informatique-4",
    domaine: "Initiation à la pensée informatique",
    chapitre: "Initiation à la pensée informatique",
    objectif: "Programmer la construction d'un chemin simple.",
    page: 20,
    micros: ["algo_figure", "algo_deplacement"],
  },
];

/**
 * Les micros que le coach garde SANS objectif d'apprentissage correspondant.
 *
 * ⛔ Chaque ligne est une dette : soit on l'assume et on écrit pourquoi, soit on
 * la supprime. Le vérificateur refuse toute micro non couverte qui ne figure pas
 * ici — c'est ce qui empêche le hors-programme de s'installer en silence.
 */
export const microsHorsProgramme6eMaths: { micro: string; raison: string }[] = [
  {
    micro: "entier_comparer",
    raison: "Réinvestissement du CM : la comparaison au programme de 6e porte sur les DÉCIMAUX.",
  },
  {
    micro: "entier_encadrer",
    raison:
      "Réinvestissement. ⚠️ L'encadrement au programme de 6e porte sur les décimaux (6e-N-entiers-10), et lui n'est couvert par personne.",
  },
  {
    micro: "entier_defi",
    raison: "Bloc de défis d'une notion de réinvestissement, sans objectif propre.",
  },
  {
    micro: "entier_addition_mentale",
    raison:
      "Le calcul mental est un automatisme transversal du programme, pas un objectif d'apprentissage listé. Il sert les objectifs de calcul décimal.",
  },
  {
    micro: "entier_soustraction_mentale",
    raison: "Idem : automatisme transversal.",
  },
  {
    micro: "entier_multiplication_mentale",
    raison: "Idem : automatisme transversal (tables, mobilisées pour les égalités de fractions).",
  },
  {
    micro: "entier_calcul_mental_defi",
    raison: "Défis de calcul mental — automatisme, pas objectif.",
  },
  {
    micro: "decimal_defi",
    raison: "Bloc de défis de la notion « nombres décimaux » ; il sert plusieurs objectifs à la fois.",
  },
  // ─── Le périmètre du carré et du rectangle ────────────────────────────────
  // Acquis du CM2, réinvestis en 6e. Le chapitre « Les longueurs » du programme
  // de 6e ne traite plus que le DISQUE, les figures composées et les problèmes :
  // il suppose le carré et le rectangle sus. On les garde parce qu'ils portent
  // les figures composées (6e-GM-longueurs-3) et qu'un élève de 6e qui ne les a
  // pas ne peut rien faire du reste.
  {
    micro: "aire_perimetre_comprendre",
    raison: "Acquis du CM2, réinvesti : prérequis des périmètres de figures composées.",
  },
  {
    micro: "aire_perimetre_carre",
    raison: "Acquis du CM2, réinvesti : le programme de 6e ne traite que le disque et les figures composées.",
  },
  {
    micro: "aire_perimetre_rectangle",
    raison: "Acquis du CM2, réinvesti : idem.",
  },
  {
    micro: "aire_perimetre_defi",
    raison: "Bloc de défis d'une notion de réinvestissement, sans objectif propre.",
  },
  {
    micro: "quadrilatere_nommer_vocabulaire",
    raison:
      "⚠️ DETTE ASSUMÉE, à trancher. Le programme de 6e ne traite les quadrilatères que dans les AUTOMATISMES (« il reconnaît un carré, un rectangle »). Le carré et le rectangle servent les aires et les périmètres, donc la micro se garde.",
  },
  {
    micro: "quadrilatere_identifier_nature",
    raison: "⚠️ DETTE ASSUMÉE : voir ci-dessus. Va au-delà du carré et du rectangle.",
  },
  {
    micro: "quadrilatere_distinguer",
    raison: "⚠️ DETTE ASSUMÉE : losange, parallélogramme et trapèze sont du programme de 5e.",
  },
  {
    micro: "quadrilatere_defi",
    raison: "⚠️ DETTE ASSUMÉE : voir ci-dessus.",
  },
  {
    micro: "quadrilatere_lire_propriete",
    raison: "⚠️ DETTE ASSUMÉE : voir ci-dessus.",
  },
  {
    micro: "quadrilatere_lien_propriete",
    raison: "⚠️ DETTE ASSUMÉE : voir ci-dessus.",
  },
  {
    micro: "quadrilatere_conclusion",
    raison: "⚠️ DETTE ASSUMÉE : voir ci-dessus.",
  },
  {
    micro: "quadrilatere_completer_construire",
    raison:
      "⚠️ DETTE ASSUMÉE : la construction de quadrilatères n'est pas un objectif de 6e, mais elle prépare la 5e.",
  },
  {
    micro: "quadrilatere_propriete_defi",
    raison: "⚠️ DETTE ASSUMÉE : voir ci-dessus.",
  },
];
