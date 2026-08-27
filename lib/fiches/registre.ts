// Registre des fiches « en blocs » : LA source de vérité de la liste des
// fiches. Sert au dashboard-prof (titre d'une composition), au hub
// /fiches-cours/maths (liste générée d'ici) et au coach (icône « fiche
// dispo »). Chaque fiche s'ajoute ici, une ligne — rien d'autre à maintenir.

type FicheEntry = { titre: string; resume?: string };

export const FICHES_REGISTRE: Record<string, FicheEntry> = {
  "maths/6e/entier-nombre": {
    titre: "Les nombres entiers",
    resume: "Lire, écrire, comparer, décomposer et encadrer les nombres entiers.",
  },
  "maths/6e/decimal-nombre": {
    titre: "Les nombres décimaux",
    resume: "Lire, comparer et calculer avec les nombres à virgule.",
  },
  "maths/6e/fraction-nombre": {
    titre: "Les fractions",
    resume: "Lire, écrire et représenter une fraction comme un partage.",
  },
  "maths/6e/pourcentage-nombre": {
    titre: "Les pourcentages",
    resume: "Comprendre un pourcentage et le relier à une fraction et un décimal.",
  },
  "maths/6e/prop-proportionnalite": {
    titre: "La proportionnalité",
    resume: "Reconnaître une situation proportionnelle, compléter un tableau, revenir à l'unité.",
  },
  "maths/6e/entier-calcul-mental": {
    titre: "Le calcul mental",
    resume: "Des stratégies pour calculer de tête, vite et juste.",
  },
  "maths/6e/entier-calcul-pose": {
    titre: "Le calcul posé",
    resume: "Poser une addition, une soustraction, une multiplication et une division.",
  },
  "maths/6e/aire-longueur": {
    titre: "Les longueurs",
    resume: "Mesurer, convertir et comparer des longueurs du mm au km.",
  },
  "maths/6e/aire-perimetre": {
    titre: "Les périmètres",
    resume: "Calculer le tour d'un carré, d'un rectangle et d'une figure.",
  },
  "maths/6e/aire-surface": {
    titre: "Les aires",
    resume: "Mesurer une surface : comptage, rectangle et carré.",
  },
  "maths/6e/volume-solide": {
    titre: "Les volumes",
    resume: "Compter, comparer et assembler des volumes en unités cubes.",
  },
  "maths/6e/angle-mesure": {
    titre: "Les angles",
    resume: "Reconnaître, comparer, mesurer au rapporteur et tracer un angle.",
  },
  "maths/6e/triangle-figure": {
    titre: "Les triangles",
    resume: "Nommer, reconnaître la nature et calculer un angle (somme = 180°).",
  },
  "maths/6e/quadrilatere-figure": {
    titre: "Les quadrilatères",
    resume: "Reconnaître carré, rectangle et losange par leurs propriétés.",
  },
  "maths/6e/sym-axiale": {
    titre: "La symétrie axiale",
    resume: "Reconnaître, construire l'image et trouver les axes de symétrie.",
  },
  "maths/6e/stat-donnee": {
    titre: "Lire et interpréter des données",
    resume: "Lire un tableau, un graphique et un diagramme circulaire.",
  },
  "maths/6e/proba-experience": {
    titre: "Premiers pas en probabilités",
    resume: "Le vocabulaire du hasard : certain, possible, impossible, plus ou moins probable.",
  },
  "maths/6e/algo-programmation": {
    titre: "Algorithmique et programmation",
    resume: "Lire et écrire une suite d'instructions, utiliser une répétition.",
  },
  "maths/6e/cercle-disque": {
    titre: "Le cercle et le disque",
    resume: "Centre, rayon, diamètre et corde ; le tour ou le plein ; et le périmètre avec π.",
  },
  "maths/cm2/nombre-entier": {
    titre: "Les nombres entiers",
    resume: "Tableau de numération : lire, comparer, décomposer, arrondir et reconnaître les multiples.",
  },
  "maths/cm2/calcul": {
    titre: "Le calcul",
    resume: "Calcul mental, additions et soustractions posées, décimaux et priorités opératoires.",
  },
  "maths/cm2/duree": {
    titre: "Les durées",
    resume: "Lire l'heure, convertir heures/minutes/secondes, calculer une durée et une heure de fin.",
  },
  "maths/cm2/pourcentage": {
    titre: "Les pourcentages",
    resume: "« Sur 100 » : fractions simples, 50/25/10 %, calculer un pourcentage et une réduction.",
  },
  "maths/cm2/masse": {
    titre: "Les masses",
    resume: "Gramme, kilogramme, tonne : estimer, comparer et convertir (1 kg = 1000 g).",
  },
  "maths/cm2/contenance": {
    titre: "Les contenances",
    resume: "Litre, centilitre, millilitre : estimer, comparer et convertir (1 L = 1000 mL).",
  },
  "maths/cm2/longueur": {
    titre: "Les longueurs",
    resume: "Millimètre, centimètre, mètre, kilomètre : estimer, comparer et convertir.",
  },
  "maths/cm2/tableau": {
    titre: "Lire un tableau",
    resume: "Lignes et colonnes : lire une case au croisement, calculer un total, interpréter des données.",
  },
  "maths/cm2/graphique": {
    titre: "Lire un graphique",
    resume: "Barres, bâtons, camembert : lire une hauteur, comparer et interpréter des données.",
  },
  "maths/cm2/reperage": {
    titre: "Le repérage",
    resume: "Se repérer sur un quadrillage : coordonnées (x ; y), lire, placer un point, se déplacer.",
  },
  "maths/cm2/suite": {
    titre: "Les suites de nombres",
    resume: "Trouver la règle d'une suite, la continuer, compléter un terme manquant, croissante ou décroissante.",
  },
  "maths/cm2/probleme": {
    titre: "Résoudre un problème",
    resume: "Comprendre l'énoncé, choisir la bonne opération, résoudre en une ou plusieurs étapes, rédiger.",
  },
  "maths/cm2/algorithmique": {
    titre: "L'algorithmique",
    resume: "Suivre et écrire un programme : instructions, boucles (répéter), déplacements dans Scratch.",
  },
  "maths/cm2/algebre": {
    titre: "Les débuts de l'algèbre",
    resume: "Comprendre une égalité, donner un nom (x) à un nombre inconnu, modéliser, faire l'opération inverse.",
  },
  "maths/cm2/droite": {
    titre: "Droites, segments et demi-droites",
    resume: "Reconnaître droite, segment et demi-droite ; droites parallèles et perpendiculaires (angle droit).",
  },
  "maths/cm2/figure-plane": {
    titre: "Les figures planes",
    resume: "Reconnaître et décrire triangle, carré, rectangle, losange et cercle par leurs côtés et angles.",
  },
  "maths/cm2/echelle": {
    titre: "Les échelles",
    resume: "Lire une échelle sur un plan ou une carte, passer de la distance du plan à la distance réelle.",
  },
  "maths/cm2/probabilite": {
    titre: "Les probabilités",
    resume: "Le vocabulaire du hasard : certain, possible, impossible ; comparer les chances (dé, roue, sac).",
  },
  "maths/cm2/nombre-decimal": {
    titre: "Les nombres décimaux",
    resume: "Lire, comparer, ranger et arrondir les nombres à virgule ; dixièmes et centièmes.",
  },
  "maths/cm2/fraction": {
    titre: "Les fractions",
    resume: "Lire, dessiner (barre, disque, grille) et placer une fraction sur la droite graduée.",
  },
  "maths/cm2/multiplication": {
    titre: "La multiplication",
    resume: "Tables, calcul mental, multiplication posée, × 10/100/1000 et problèmes.",
  },
  "maths/cm2/division": {
    titre: "La division",
    resume: "Partager en parts égales, poser une division, lire le quotient et le reste.",
  },
  "maths/cm2/proportionnalite": {
    titre: "La proportionnalité",
    resume: "Reconnaître, remplir un tableau, trouver le coefficient et revenir à l'unité.",
  },
  "maths/cm2/perimetre": {
    titre: "Les périmètres",
    resume: "Le tour d'une figure : triangle, rectangle, carré et figure quelconque.",
  },
  "maths/cm2/aire": {
    titre: "Les aires",
    resume: "La surface d'une figure : compter les carreaux, rectangle, carré, triangle.",
  },
  "maths/cm2/symetrie": {
    titre: "La symétrie axiale",
    resume: "L'axe miroir : reconnaître, compléter et construire l'image d'une figure.",
  },
  "maths/cm2/angle": {
    titre: "Les angles",
    resume: "Sommet, côtés, angle droit ; aigu, droit, obtus et mesure au rapporteur.",
  },
  "maths/cm2/solide": {
    titre: "Les solides",
    resume: "Cube, pavé, cylindre, cône, boule ; faces, arêtes, sommets, polyèdre et patron.",
  },
  "maths/5e/relatif-nombre": {
    titre: "Les nombres relatifs",
    resume: "Lire, placer et comparer les relatifs ; signe, opposé et valeur absolue.",
  },
  "maths/5e/relatif-operation": {
    titre: "Les opérations sur les nombres relatifs",
    resume: "Additionner et soustraire des relatifs ; règles de signes et distances à 0.",
  },
  "maths/5e/litteral-calcul": {
    titre: "Le calcul littéral",
    resume: "Comprendre, traduire, substituer et réduire une expression avec des lettres.",
  },
  "maths/5e/prop-proportionnalite": {
    titre: "La proportionnalité",
    resume: "Coefficient, tableau, retour à l'unité, ratio, pourcentage, hausse et baisse.",
  },
  "maths/5e/stat-statistique": {
    titre: "Les statistiques",
    resume: "Effectif, total, fréquence et moyenne ; lire un tableau et un diagramme.",
  },
  "maths/5e/proba-experience": {
    titre: "Les probabilités",
    resume: "Issue, événement, équiprobabilité et calcul (favorables ÷ possibles).",
  },
  "maths/5e/angle-mesure": {
    titre: "Les angles",
    resume: "Sommet, degré, rapporteur ; angle aigu, droit, obtus et plat.",
  },
  "maths/5e/triangle-figure": {
    titre: "Les triangles",
    resume: "Nature, inégalité triangulaire, construction et somme des angles (180°).",
  },
  "maths/5e/sym-centrale": {
    titre: "La symétrie centrale",
    resume: "Le demi-tour autour d'un centre : image d'un point, d'une figure, propriétés.",
  },
  "maths/5e/aire-surface": {
    titre: "Les aires",
    resume: "Aire du triangle (base × hauteur ÷ 2), du parallélogramme et des figures composées.",
  },
  "maths/5e/volume-solide": {
    titre: "Les volumes",
    resume: "Pavé droit (L × l × h), prisme et cylindre (aire de base × hauteur), unités.",
  },
  "maths/5e/algo-programmation": {
    titre: "Algorithmique et programmation",
    resume: "Scratch : suite d'instructions, variables, tests (si…) et boucles (répéter…).",
  },
  "maths/5e/pourcentages": {
    titre: "Les pourcentages",
    resume: "Calculer un pourcentage d'un nombre, une réduction ou une augmentation.",
  },
  "maths/5e/fraction-nombre": {
    titre: "Les fractions",
    resume: "Reconnaître des fractions égales, simplifier, comparer, et l'opposé.",
  },
  "maths/5e/grandeur-conversion": {
    titre: "Convertir les grandeurs",
    resume: "Longueurs, masses, contenances et durées : changer d'unité, et le sens du changement.",
  },
  "maths/5e/prop-ratio-pourcentage": {
    titre: "Ratios, pourcentages et coefficient",
    resume: "Lire un ratio, prendre un pourcentage, passer d'une évolution au coefficient multiplicateur.",
  },
  "maths/5e/algo-construire": {
    titre: "Construire un programme",
    resume: "Traduire une formule en blocs, écrire une condition, régler les paramètres, poser une boucle.",
  },
  "maths/5e/divisibilite": {
    titre: "Multiples, diviseurs et divisibilité",
    resume: "Multiples et diviseurs, critères par 2, 5, 10, 3 et 9, et la liste des diviseurs par paires.",
  },
  "maths/5e/parallelogramme": {
    titre: "Le parallélogramme",
    resume: "Reconnaître, côtés et angles opposés, diagonales, losange/rectangle/carré et aire.",
  },
  "maths/5e/fraction-calcul": {
    titre: "Calculer avec les fractions",
    resume: "Additionner, soustraire, multiplier, et prendre une fraction d'une quantité.",
  },
  "maths/4e/litteral-expression": {
    titre: "Les expressions littérales",
    resume: "La lettre, le coefficient, traduire une phrase, substituer une valeur et réduire.",
  },
  "maths/4e/litteral-distributivite": {
    titre: "La distributivité",
    resume: "Développer un produit en somme, la double distributivité, réduire, et reconnaître la forme.",
  },
  "maths/4e/litteral-identite-remarquable": {
    titre: "Les identités remarquables",
    resume: "Le carré d'une somme, le carré d'une différence, la différence de deux carrés, et le double produit.",
  },
  "maths/4e/litteral-factorisation": {
    titre: "La factorisation",
    resume: "Le facteur commun, diviser chaque terme, les identités lues à l'envers, et vérifier en développant.",
  },
  "maths/4e/equation-resolution": {
    titre: "Les équations",
    resume: "Reconnaître, traduire, isoler l'inconnue des deux côtés, réduire, la parenthèse, et vérifier.",
  },
  "maths/4e/aire-perimetre": {
    titre: "Les périmètres",
    resume: "Le contour d'une figure : rectangle, carré, triangle, figures composées, et pourquoi ce n'est pas l'aire.",
  },
  "maths/4e/aire-surface": {
    titre: "Les aires",
    resume: "La surface occupée : rectangle, carré, triangle, parallélogramme, figures composées et unités.",
  },
  "maths/4e/volume-solide": {
    titre: "Les volumes",
    resume: "Aire de base × hauteur : pavé droit, prisme, cylindre, cubes unités et unités de volume.",
  },
  "maths/4e/algo-programmation": {
    titre: "Algorithmique et programmation",
    resume: "Conditions vraies ou fausses, si… alors… sinon, variables, et traduire un objectif en condition.",
  },
  "maths/4e/prop-proportionnalite": {
    titre: "La proportionnalité",
    resume: "Reconnaître, le coefficient, le produit en croix, les pourcentages et les évolutions.",
  },
  "maths/4e/fraction-calcul": {
    titre: "Calculer avec les fractions",
    resume: "Additionner, multiplier, une fraction d'une quantité, l'inverse, l'opposé et la division.",
  },
  "maths/4e/fraction-nombre": {
    titre: "Fractions et nombres rationnels",
    resume: "Fractions égales, simplifier, comparer, écriture décimale et nombres rationnels.",
  },
  "maths/4e/relatif-operation": {
    titre: "Les opérations sur les nombres relatifs",
    resume: "Additionner, soustraire, et surtout multiplier et diviser : la règle des signes.",
  },
  "maths/4e/proba-experience": {
    titre: "Les probabilités",
    resume: "Issues, événement contraire, équiprobabilité, calcul en fraction et en pourcentage.",
  },
  "maths/4e/stat-statistique": {
    titre: "Les statistiques",
    resume: "Effectif et fréquence, moyenne pondérée, médiane, étendue, et comparer deux séries.",
  },
  "maths/4e/sym-transformation": {
    titre: "Les transformations",
    resume: "Symétrie axiale, symétrie centrale, translation, rotation, et ce que toutes conservent.",
  },
  "maths/4e/quadrilatere-parallelogramme": {
    titre: "Le parallélogramme",
    resume: "Reconnaître, côtés et angles opposés, diagonales, les trois chemins pour démontrer, et l'aire.",
  },
  "maths/4e/trigo-cosinus": {
    titre: "Le cosinus d'un angle aigu",
    resume: "Côté adjacent et hypoténuse, la définition du cosinus, calculer une longueur puis un angle.",
  },
  "maths/4e/thales-theoreme": {
    titre: "Le théorème de Thalès",
    resume: "Les deux configurations, l'égalité des rapports, le produit en croix et la réciproque.",
  },
  "maths/4e/pythagore-theoreme": {
    titre: "Le théorème de Pythagore",
    resume: "Reconnaître l'hypoténuse, calculer une longueur, et utiliser la réciproque pour prouver un angle droit.",
  },
  "maths/premiere-spe/derivation": {
    titre: "La dérivation",
    resume: "Taux de variation, nombre dérivé, dérivées usuelles et équation de la tangente.",
  },
  // ─── Français ───────────────────────────────────────────────────────────────
  // La matière s'ouvre au cycle 3 : c'est le programme du CM2, et c'est aussi
  // celui sur lequel porte l'écrit de français du CRPE.
  "francais/cm2/grammaire-orthographe": {
    titre: "Analyser une phrase : nature, fonction, accords",
    resume:
      "Sujet, verbe, compléments, attribut, groupe nominal et accords — chaque règle dessinée sur la phrase.",
  },

  "francais/cm2/grammaire-phrase": {
    titre: "La phrase : sujet, verbe, nature et fonction",
    resume:
      "Trouver le verbe conjugué, poser « qui est-ce qui ? », reconnaître un sujet inversé et distinguer nature et fonction.",
  },
  "francais/cm2/phrase-complexe": {
    titre: "La phrase complexe",
    resume:
      "Compter les propositions, distinguer juxtaposition, coordination et subordination, choisir qui, que, où.",
  },
  "francais/cm2/grammaire-complements": {
    titre: "Les compléments du verbe",
    resume:
      "Poser « quoi ? » puis « à qui ? », déplacer le complément pour voir s'il est circonstanciel, et ne pas confondre l'attribut avec un COD.",
  },

  /* ⭐ LA CONJUGAISON DU CM2 (23/08/2026). La classe avait trois fiches, toutes
     de grammaire : ses DIX-SEPT micro-compétences de conjugaison n'en avaient
     aucune. Un élève qui cliquait « présent », « passé simple » ou « participe
     passé » dans le coach ne trouvait rien à lire.
     ⚠️ `conjugaison-formes` existe aussi en 6e, sous le même slug : les clés du
     registre portent la classe, il n'y a donc pas de collision — et il ne faut
     PAS aliaser l'une vers l'autre. Le CM2 y voit le troisième groupe (son BO
     le demande), la 6e non. */
  "francais/cm2/conjugaison-temps-simples": {
    titre: "Conjuguer au présent, à l'imparfait et au futur",
    resume:
      "Trouver l'infinitif et le groupe, repérer le radical, et conjuguer aux trois temps simples, irréguliers compris.",
  },
  "francais/cm2/conjugaison-formes": {
    titre: "La forme d'un verbe : radical, temps, personne",
    resume:
      "Isoler la marque de temps et la marque de personne dans la terminaison, et reconnaître les variations du radical au 1er comme au 3e groupe.",
  },
  "francais/cm2/conjugaison-recit": {
    titre: "Les temps du récit : passé composé, passé simple, plus-que-parfait",
    resume:
      "Séparer le passé qu'on parle du passé qu'on lit, reculer d'un cran avec le plus-que-parfait, et distinguer le décor de l'action.",
  },
  "francais/cm2/conjugaison-participe": {
    titre: "Le participe passé : accorder, et où mettre la négation",
    resume:
      "Former un temps composé en deux parties, accorder avec être puis avec le COD placé avant, et poser la négation autour de l'auxiliaire.",
  },

  /* ⭐ LA 6e OUVRE ICI (22/08/2026). Elle n'avait aucune fiche de français,
     parce que ses notions faisaient jusqu'à NEUF micro-compétences : rien de
     tel ne tient dans une fiche. Elle a été relue sur le BO n° 16 du 17 avril
     2025 le matin même — 29 notions de 3 à 5 micros —, et la première fiche
     porte l'objectif que le programme de 6e formule comme une OPPOSITION,
     c'est-à-dire le geste neuf de l'année. */
  "francais/6e/grammaire-complements": {
    titre: "Attribut du sujet et compléments du verbe",
    resume:
      "Opposer l'attribut et le COD, distinguer direct et indirect, reconnaître un circonstanciel de temps, de lieu ou de cause.",
  },
  "francais/6e/grammaire-groupe-nominal": {
    titre: "Le groupe nominal : épithète et complément du nom",
    resume:
      "Trouver le nom noyau, distinguer l'épithète du complément du nom, reconnaître un groupe nominal quelle que soit sa fonction.",
  },
  "francais/6e/grammaire-pronoms": {
    titre: "Les pronoms personnels et leur antécédent",
    resume:
      "Sujet ou complément, préciser la fonction d'un pronom et remonter jusqu'au groupe qu'il reprend.",
  },
  /* ⚠️ LA 6e A SA PROPRE FICHE DE PHRASE COMPLEXE, ET CE N'EST PAS UN DOUBLON
     DE CELLE DU CM2. Le BO du CM2 distingue simple et complexe « à partir du
     repérage DES VERBES CONJUGUÉS » ; celui de la 6e « à partir de la notion DE
     PROPOSITION », et lui ajoute un objectif que le CM2 n'a pas : « Distinguer
     LE RÔLE de la conjonction de coordination et celui de la conjonction de
     subordination ». Deux années, deux marches. */
  "francais/6e/phrase-complexe": {
    titre: "Se repérer dans la phrase complexe",
    resume:
      "Compter les propositions, distinguer juxtaposition, coordination et subordination, et dire ce que fait chaque conjonction.",
  },
  "francais/6e/grammaire-accords": {
    titre: "Les accords et les homophones",
    resume:
      "Tenir la chaîne du groupe nominal, accorder avec un sujet éloigné, le participe passé avec être et avec le COD antéposé.",
  },

  /* ⭐ LA CONJUGAISON DE LA 6e (23/08/2026). Ses quatre notions n'avaient AUCUNE
     fiche possible tant que `phrase` était le seul canvas de la matière : son
     propre commentaire s'interdit « un tableau de conjugaison ». Le canvas
     `conjugaison` a été créé pour elles le matin même — la forme verbale
     démontée en wagons, les temps composés en deux caisses, le tableau des six
     personnes, la frise des valeurs. */
  "francais/6e/conjugaison-formes": {
    titre: "Lire une forme verbale : radical, temps, personne",
    resume:
      "Couper le verbe en radical et terminaison, y retrouver la marque de temps et celle de personne, et maîtriser les variations du radical du premier groupe.",
  },
  "francais/6e/conjugaison-temps-composes": {
    titre: "Les temps composés : passé composé et plus-que-parfait",
    resume:
      "Former un verbe en deux parties, choisir entre être et avoir, accorder le participe, et reculer d'un cran avec le plus-que-parfait.",
  },
  "francais/6e/conjugaison-modes": {
    titre: "L'impératif et le conditionnel présent",
    resume:
      "Donner un ordre sans sujet écrit, fabriquer le conditionnel avec le radical du futur et les terminaisons de l'imparfait, et ne plus confondre « je viendrai » et « je viendrais ».",
  },
  "francais/6e/conjugaison-valeurs": {
    titre: "La valeur des temps : raconter ou parler",
    resume:
      "Opposer les temps du récit et ceux du discours, séparer le décor de l'action, et choisir le temps qui convient au sens de la phrase.",
  },

  /* ⭐ LA 6e SORT DE L'ÉTUDE DE LA LANGUE (26/08/2026). Ses neuf premières
     fiches étaient toutes de grammaire ou de conjugaison ; les vingt notions
     sans fiche sont la lecture, la culture, l'écriture, l'oral et le lexique.
     ⛔ Programme du CYCLE 3 (BO n° 16 du 17 avril 2025) : ne jamais transposer
     depuis la 5e, même quand la notion porte le même nom. */
  "francais/6e/vocabulaire-enrichir": {
    titre: "Comprendre un mot inconnu",
    resume:
      "Déduire le sens par la phrase ou par les morceaux du mot, vérifier avant de continuer, chercher en dernier — et reconnaitre un emploi au sens figuré.",
  },
  "francais/6e/vocabulaire-relations": {
    titre: "Les mots entre eux, et comment ils sont faits",
    resume:
      "Le contraire garde la classe du mot, le champ lexical mélange les classes — et un mot est simple, dérivé ou composé selon que ses morceaux existent seuls.",
  },
  "francais/6e/vocabulaire-emploi": {
    titre: "Employer le mot juste",
    resume:
      "La place de chaque classe de mot, le registre choisi d'après le destinataire, le sens que la phrase désigne, et les pièges des mots fréquents.",
  },
  "francais/6e/grammaire-phrase": {
    titre: "La phrase et ses groupes",
    resume:
      "Trouver le verbe, poser les questions, et prouver une fonction en déplaçant, supprimant ou remplaçant le groupe — au lieu de réciter une définition.",
  },
  "francais/6e/fluence-lecture": {
    titre: "Lire avec fluidité",
    resume:
      "Lire par groupes de sens au lieu de lire mot à mot, tenir la ponctuation, ne rien prononcer — et viser les 130 mots par minute attendus en 6e.",
  },

  /* ⭐ LA 5e OUVRE EN FRANÇAIS (24/08/2026). Elle avait vingt fiches de maths et
     aucune de français — alors qu'elle est la SEULE classe du collège déjà
     passée au programme neuf (BO n° 10 du 5 mars 2026, applicable à la rentrée
     2026). Les trois fiches couvrent en entier les deux objectifs de grammaire
     que le BO nomme : « Comprendre ce qu'est une phrase » et « Connaitre les
     différents constituants d'une phrase ».

     ⭐ LEUR TITRE PORTE L'ANNÉE SCOLAIRE, et c'est une décision de Frédéric du
     24/08 : la requête tapée à la rentrée est « français 5e 2026-2027 », les
     sites qui nous devancent l'écrivent, et le `titre` d'une fiche alimente le
     H1 ET tous les H2 de sa page (« Définition : … », « Propriétés : … »,
     « Méthode : … », « Exercices corrigés : … »). L'écrire une fois le pose
     partout.
     ⚠️ Ce titre nomme aussi le PDF : le changer rend l'ancien orphelin, et
     `npm run verifier:pdf` le signale.

     ⚠️ LES TROIS `notion` TOMBENT PILE SUR TROIS NOTIONS DU COACH, et ce n'est
     pas un hasard : c'est le découpage du même jour qui l'a permis. Avant lui,
     `grammaire_phrase` portait DIX-NEUF micros à elle seule — une notion pareille
     ne tient dans aucune fiche, et deux des trois n'auraient eu aucun badge. */
  "francais/5e/grammaire-phrase": {
    titre: "La phrase, ses types et sa ponctuation (2026-2027)",
    resume:
      "Les trois types et les formes, la phrase simple, complexe ou non verbale, le rôle de chaque signe de ponctuation, et ce qu'exprime une juxtaposition.",
  },
  "francais/5e/grammaire-fonctions": {
    titre: "Les fonctions dans la phrase (2026-2027)",
    resume:
      "Prouver une fonction au lieu de la deviner : COD et COI même placés avant le verbe, attribut du sujet, verbes attributifs par occasion, circonstanciels.",
  },
  /* ⭐ LA FICHE QUI VISE LE POINT LE PLUS BAS QU'ON MESURE (25/08/2026).
     L'évaluation nationale de 5e teste « maîtriser la chaine anaphorique et
     l'emploi des pronoms représentants » sur six items : 19 %, 24 % et 43 % de
     réussite dans un collège de l'île, français et maths confondus. Aucune
     autre notion de la classe n'est aussi mal tenue.
     ⚠️ Ce n'est PAS la fiche des pronoms : reconnaître un pronom démonstratif
     est une question de classe de mot, retrouver ce qu'il reprend deux phrases
     plus haut est une question de texte. */
  /* « Savoir accorder les mots dans la phrase ET EXPLIQUER SES CHOIX » est un
     objectif à part entière du BO, avec cinq attendus pour la seule 5e. Il tient
     en deux fiches parce que le découpage du 24/08 l'a coupé en deux notions :
     les chaînes d'accord ici, le participe passé à part — c'est là que se joue
     l'essentiel des erreurs, et une règle noyée dans quatre autres ne se
     travaille pas. */
  "francais/5e/orthographe-participe": {
    titre: "L'accord du participe passé (2026-2027)",
    resume:
      "Avec être on regarde le sujet, avec avoir on cherche le COD et sa place — et « tu m'as parlé » ne s'accorde pas quand « tu m'as appelée » s'accorde.",
  },

  "francais/5e/orthographe-accords": {
    titre: "Les chaînes d'accord dans la phrase (2026-2027)",
    resume:
      "Le noyau qui commande le groupe nominal, l'attribut par-dessus le verbe, et le sujet qu'un complément vient cacher : on barre, et on relit.",
  },

  "francais/5e/grammaire-reprises": {
    titre: "Les reprises et la chaîne anaphorique (2026-2027)",
    resume:
      "Retrouver ce qu'un pronom reprend, reconnaître une reprise nominale quand le mot change, et suivre deux chaînes qui courent en même temps.",
  },

  "francais/5e/grammaire-groupe-nominal": {
    titre: "Le groupe nominal et les classes de mots (2026-2027)",
    resume:
      "Le nom noyau et ses trois expansions, déterminant ou pronom, préposition ou adverbe : la classe d'un mot se lit sur ce qui le suit.",
  },

  /* ⭐ LA CONJUGAISON DE LA 5e TIENT EN UNE NOTION, ET C'EST UNE DÉCISION DU
     25/08/2026. Le découpage de la veille avait produit « temps simples » et
     « temps composés », deux micros chacune ; la règle pose un maximum de cinq,
     pas un minimum de deux, et une notion de deux micros ne porte pas une fiche.
     Refondues en `conjugaison_temps` — le nom que la 4e et la 3e portaient déjà,
     ce qui est la condition pour qu'une fiche se compare d'un niveau à l'autre. */
  "francais/5e/conjugaison-temps": {
    titre: "Le passé simple, le conditionnel et les temps composés (2026-2027)",
    resume:
      "Aucun de ces temps ne s'apprend en entier : le passé simple se pose sur le radical, le conditionnel emprunte au futur et à l'imparfait, et les quatre temps composés n'ont qu'un auxiliaire qui bouge.",
  },

  "francais/5e/discours-paroles-rapportees": {
    titre: "Le discours direct et le discours indirect (2026-2027)",
    resume:
      "Citer entre guillemets ou rapporter dans une subordonnée, déplacer le pronom, le temps et l'indication de temps, et ponctuer un dialogue avec ses incises et ses tirets.",
  },

  /* ⭐ LE VOCABULAIRE DE LA 5e (26/08/2026). Le domaine manquait EN ENTIER — cinq
     notions, aucune fiche — alors que le BO de 2026 lui donne cinq objectifs
     nommés. Celle-ci ouvre le chantier par le premier d'entre eux. */
  "francais/5e/vocabulaire-enrichir": {
    titre: "Enrichir son vocabulaire (2026-2027)",
    resume:
      "Trouver le sens d'un mot inconnu en le remplaçant par un blanc, lire un article de dictionnaire jusqu'à ses sens numérotés, et sortir de « dire » en se demandant à quel volume et pour quoi faire.",
  },
  "francais/5e/vocabulaire-relations": {
    titre: "Les relations entre les mots (2026-2027)",
    resume:
      "Vérifier un synonyme en récrivant la phrase entière, trouver l'antonyme, séparer la famille du champ lexical, et démonter un mot en préfixe, radical et suffixe.",
  },
  "francais/5e/vocabulaire-jouer": {
    titre: "Sens propre, sens figuré et mots nouveaux (2026-2027)",
    resume:
      "Le test de la photographie pour séparer le propre du figuré, et les quatre portes par lesquelles un mot neuf entre dans la langue : fabriqué, sens neuf, emprunté, sigle.",
  },
  "francais/5e/vocabulaire-formation": {
    titre: "La formation des mots (2026-2027)",
    resume:
      "Fabriquer le mot qu'une définition demande, comprendre que le suffixe donne au mot son métier, et reconnaitre les éléments latins et grecs qui ouvrent les mots savants.",
  },
  "francais/5e/vocabulaire-orthographe": {
    titre: "Écrire les mots avec justesse (2026-2027)",
    resume:
      "Réveiller une lettre muette avec un mot de la même famille, et trancher les homophones en remplaçant le mot par sa définition : sont ou son, où ou ou, plutôt ou plus tôt.",
  },
  "francais/5e/discours-registres": {
    titre: "L'oral, l'écrit et les registres (2026-2027)",
    resume:
      "Deux grammaires et aucune n'est fautive : rétablir à l'écrit ce que l'oral avale, redire une phrase à trois étages de registre, et séparer un fait d'un avis.",
  },
  "francais/5e/lecture-voix-haute": {
    titre: "Lire à voix haute (2026-2027)",
    resume:
      "Annoter un texte comme une partition : groupes de souffle, mots à détacher, changements de voix — et lire la ponctuation comme une consigne.",
  },
  "francais/5e/oral-dire-jouer": {
    titre: "Dire, lire et jouer un texte (2026-2027)",
    resume:
      "L'écart entre ce que la voix affirme et ce que le corps fait, les cinq gestes de la comédie, et les ressources du silence, du regard et du débit.",
  },
  "francais/5e/oral-ecouter": {
    titre: "Écouter, comprendre et interpréter (2026-2027)",
    resume:
      "Cinq lignes à noter en écoutant — le sujet, son avis, ses exemples, mes trous, mon désaccord — et les quatre visées : informer, convaincre, émouvoir, faire agir.",
  },
  "francais/5e/oral-prendre-parole": {
    titre: "Prendre la parole et interagir (2026-2027)",
    resume:
      "Présenter une lecture sans raconter la fin, justifier avec les trois pièces — l'avis, la raison, le passage —, enchainer dans un dialogue et tenir les règles du débat.",
  },
  "francais/5e/conjugaison-formes": {
    titre: "La composition d'une forme verbale (2026-2027)",
    resume:
      "Trois places — radical, marque de temps, marque de personne —, l'infinitif qui se cache au passé simple, et les radicaux qui changent selon la personne.",
  },

  /* ⭐ LA 4e (25/08/2026). Ses trois fiches étaient en ligne et routées, mais
     ni le registre ni le sitemap ne les déclaraient : le coach n'affichait
     donc aucun badge « Fiche » sur les micros de 4e, et Google ne savait pas
     qu'elles existaient. Elles portent l'année comme celles de la 5e — même
     programme du 5 mars 2026, même requête tapée à la rentrée. */
  "francais/4e/grammaire-phrase": {
    titre: "Les groupes de la phrase : nature et fonction (2026-2027)",
    resume:
      "La nature d'un groupe ne change jamais, sa fonction change à chaque phrase — et les trois manipulations le prouvent, même quand le sujet est loin ou inversé.",
  },

  "francais/4e/phrase-complexe": {
    titre: "La phrase complexe et ses subordonnées (2026-2027)",
    resume:
      "Compter les verbes conjugués, séparer juxtaposition, coordination et subordination, puis nommer les cinq sortes de subordonnées et dire leur fonction.",
  },

  "francais/4e/orthographe-participe": {
    titre: "L'accord du participe passé : être, avoir, pronominaux (2026-2027)",
    resume:
      "Avec avoir, tout se joue sur la place du COD et sur les trois façons dont il passe devant — et « se » complément d'objet indirect ne fait jamais accorder.",
  },

  /* ⭐ LA 4e EST LA PREMIÈRE CLASSE DE FRANÇAIS ENTIÈREMENT FICHÉE (26/08/2026) :
     dix-neuf notions, seize fiches. Le CM2 est à 7 sur 27, la 6e à 9 sur 29, la
     5e à 8 sur 28 — et toutes les trois n'ont QUE de l'étude de la langue.
     ⛔ La 4e est aussi la première à ficher la lecture, l'écriture, l'oral et la
     culture, longtemps laissés de côté au motif qu'« il n'y a rien à dessiner ».
     Il y avait : l'arc de question pour la justification, la grille de
     `figure_libre` pour le cadrage d'une image puis pour la silhouette d'un
     genre sur la page, les deux groupes opposés pour une tension. Voir les
     en-têtes de `francais-4e-lecture-comprehension.tsx` et de
     `francais-4e-lecture-documents.tsx`.
     ⚠️ `culture-questionnements` sera à refaire ENTIÈREMENT à la bascule de
     septembre 2027 : les cinq entrées de l'année changent. Les quinze autres
     tiennent sur des notions qui ne changent pas de nom. */

  "francais/4e/orthographe-accords": {
    titre: "Les chaines d'accord et le passif (2026-2027)",
    resume:
      "Le noyau du sujet commande, jamais le mot le plus proche : « le bruit des vagues berçait » — et deux noms coordonnés commandent ensemble.",
  },

  "francais/4e/conjugaison-formes": {
    titre: "Lire et former un verbe conjugué (2026-2027)",
    resume:
      "Radical, marque de temps, marque de personne : chaque temps va chercher sa base ailleurs, et le « r » du futur sépare l'imparfait du conditionnel.",
  },

  "francais/4e/conjugaison-temps": {
    titre: "Les temps, les modes et ce qu'ils expriment (2026-2027)",
    resume:
      "Le mot qui précède commande le mode, l'imparfait étend quand le passé simple pique — et « le suspect aurait fui » rapporte sans garantir.",
  },

  "francais/4e/analyse-discours": {
    titre: "Registres, paroles rapportées et argumentation (2026-2027)",
    resume:
      "Direct, indirect, indirect libre : la troisième forme n'a aucune marque, et c'est pourtant le personnage qui pense. Trois transpositions, jamais deux.",
  },

  "francais/4e/vocabulaire-sens": {
    titre: "Le sens des mots et leurs relations (2026-2027)",
    resume:
      "Deux axes qu'on confond : l'intensité est une échelle, la généralité un emboitement. Et « logement, taudis, demeure » désignent le même endroit.",
  },

  "francais/4e/vocabulaire-formation": {
    titre: "La formation des mots et l'orthographe lexicale (2026-2027)",
    resume:
      "Préfixe, radical, suffixe : un mot se démonte comme un verbe. Et le « d » de « grand », qu'on n'entend pas, s'entend dans « grandeur ».",
  },

  "francais/4e/lecture-comprehension": {
    titre: "Comprendre, interpréter et apprécier un texte (2026-2027)",
    resume:
      "Une interprétation se prouve : qu'est-ce qui, dans le texte, me le fait dire ? Six familles d'indices, et l'implicite qui se trouve en récrivant franchement.",
  },

  "francais/4e/lecture-documents": {
    titre: "Lire des images, la presse et des documents (2026-2027)",
    resume:
      "Le cadre décide surtout de ce qu'on ne verra pas. Un graphique peut être exact et trompeur, et répéter n'est jamais confirmer.",
  },

  "francais/4e/lecture-voix-haute": {
    titre: "Lire à voix haute et mettre en voix (2026-2027)",
    resume:
      "Un texte pour la voix s'annote comme une partition : groupes de souffle, mots à détacher. Et l'accident se prépare — un trou, on repart au vers suivant.",
  },

  "francais/4e/culture-litteraire": {
    titre: "Situer une œuvre et garder trace de ses lectures (2026-2027)",
    resume:
      "Le genre se voit à la forme du texte sur la page. Les objets datent, les sentiments jamais — et une trace utile porte trois pièces : où, quoi, pourquoi.",
  },

  "francais/4e/culture-questionnements": {
    titre: "Les questionnements de l'année de 4e (2026-2027)",
    resume:
      "Une entrée n'est pas un thème, c'est une tension : le sentiment contre les mots, ce que je veux contre ce qu'on attend, inventer contre dire vrai.",
  },

  "francais/4e/ecriture": {
    titre: "Écrire pour apprendre, inventer et réfléchir (2026-2027)",
    resume:
      "Un paragraphe se compte : l'idée, l'exemple, ce qu'il prouve. Il manque presque toujours le troisième — celui qui écrit l'a dans la tête.",
  },

  "francais/4e/oral": {
    titre: "Prendre la parole, écouter et interagir (2026-2027)",
    resume:
      "Écouter, c'est ranger. Et pour un argument : je retire le ton, et je regarde ce qui reste — un nombre de gens d'accord n'est pas une raison.",
  },

  "ia/fondements/definir-l-ia": {
    titre: "Qu'est-ce que l'intelligence artificielle ?",
    resume: "Définir l'IA, ses deux approches et pourquoi elle a explosé récemment.",
  },
  "ia/fondements/apprentissage-automatique": {
    titre: "L'apprentissage automatique",
    resume: "Apprendre à partir de données : supervisé, non supervisé, renforcement.",
  },
  "ia/fondements/modeles-apprentissage": {
    titre: "Les modèles d'apprentissage",
    resume: "Arbre de décision, régression, réseau de neurones et « boîte noire ».",
  },
  "ia/fondements/grands-modeles-de-langage": {
    titre: "Les grands modèles de langage",
    resume: "Prédire le mot suivant, l'entraînement, et les hallucinations.",
  },
  "ia/fondements/algorithmes-de-recommandation": {
    titre: "Les algorithmes de recommandation",
    resume: "Comment on te recommande des contenus, et la bulle de filtre.",
  },
  "ia/fondements/ia-incarnee-robotique": {
    titre: "L'IA incarnée et la robotique",
    resume: "Percevoir, décider, agir : l'IA dans les robots du monde réel.",
  },
  "ia/usages/familles-de-taches": {
    titre: "Ce que l'IA sait faire",
    resume: "Reconnaissance, prédiction, recommandation, génération de contenu.",
  },
  "ia/usages/utiliser-ia-generative": {
    titre: "Utiliser une IA générative",
    resume: "Écrire un bon prompt, itérer, vérifier les réponses et rester responsable.",
  },
  "ia/usages/evaluer-l-information": {
    titre: "Évaluer l'information à l'ère de l'IA",
    resume: "Hypertrucages, bots, et comment vérifier une information.",
  },
  "ia/usages/services-de-recommandation": {
    titre: "Utiliser les services de recommandation",
    resume: "Avantages, limites et contrôle de la personnalisation.",
  },
  "ia/usages/ia-dans-une-organisation": {
    titre: "Utiliser l'IA dans une organisation",
    resume: "Identifier le besoin, protéger les données, charte d'usage et RAG.",
  },
  "ia/enjeux/empreinte-environnementale": {
    titre: "L'empreinte environnementale de l'IA",
    resume: "Énergie des calculs, ressources rares et IA frugale.",
  },
  "ia/enjeux/gouvernance": {
    titre: "La gouvernance de l'IA",
    resume: "Qui régule l'IA, l'IA Act, souveraineté et valeurs encodées.",
  },
  "ia/enjeux/ethique-et-transparence": {
    titre: "Éthique et transparence de l'IA",
    resume: "Transparence, non-discrimination, responsabilité, RGPD et IA Act.",
  },
  "ia/enjeux/emploi-et-formation": {
    titre: "IA, emploi et formation",
    resume: "Métiers qui changent, nouveaux métiers, travailleurs du clic.",
  },
  "ia/enjeux/enjeux-culturels-societaux": {
    titre: "Enjeux culturels et sociétaux de l'IA",
    resume: "Biais, désinformation, diversité culturelle et droits des créateurs.",
  },
};

// =========================
// LES NOTIONS QUI REVIENNENT D'UN NIVEAU À L'AUTRE
// =========================
// Une même notion est enseignée sur deux ans : Pythagore se découvre en 4e et
// se réutilise en 3e, Thalès se découvre en 4e mais sa fiche a été écrite en
// 3e. Le lookup du registre est strict — (matière, classe, notion) — donc
// l'élève de 3e qui cliquait « Pythagore » dans le coach ne trouvait RIEN,
// alors que la fiche existait, écrite et payée, rangée sous « 4e ». Dix-sept
// notions du collège étaient dans ce cas au 19/08/2026.
//
// ⛔ CHAQUE LIGNE EST ÉCRITE À LA MAIN, JAMAIS DÉDUITE. Un alias automatique
// « si absent, prends le niveau d'en dessous » servirait la fiche 6e des aires
// à un élève de 3e — or la 3e y ajoute le disque et l'effet d'un agrandissement.
// Ce serait le repli silencieux du catalogue, en pire : muet ET faux.
//
// N'entre ici qu'une notion dont la fiche existante couvre les micro-compétences
// du niveau demandé. Les dix autres cas (algorithmique 4e/3e, fractions 4e,
// proportionnalité 4e/3e, calcul littéral 3e, aires 4e/3e, périmètres 3e,
// volumes 3e) ne sont PAS des alias : le niveau y ajoute du contenu neuf, ils
// attendent une vraie fiche.
//
// Clé = ce que demande le coach ; valeur = la fiche réellement servie.
// ⛔ LES ALIAS DE MATHS 4e ET 3e SONT PARTIS LE 21/08/2026, avec leurs fiches.
// Ils faisaient qu'un élève de 3e trouvait Pythagore et un élève de 4e trouvait
// Thalès, en pointant vers la fiche rangée sous l'autre niveau. Frédéric a
// décidé d'éteindre les deux classes : « on repart au propre plus tard ». Sept
// alias sont donc tombés — quatre parce que leur cible n'existe plus, trois
// (volumes, triangles, périmètres, qui visaient la 5e et la 6e) parce qu'une
// classe éteinte ne doit garder aucun badge « Fiche ».
// Le mécanisme reste : quand la 4e et la 3e reviendront, on redéclarera ici.
export const FICHES_ALIAS: Record<string, string> = {

  /* ⏳ PROVISOIRE — LE TEMPS D'ÉCRIRE LES TROIS FICHES (20/08/2026).
     La grammaire du CM2 a été coupée en trois notions le 20/08. La fiche
     existante porte encore le nom de l'ancienne, `grammaire-orthographe` :
     le coach ne la reconnaissait donc plus sur aucune des trois, et le badge
     « Fiche » avait disparu d'un cours qui existe pourtant.
     Ces trois lignes ne sont pas des alias au sens habituel — ce n'est pas
     une fiche d'une autre année, c'est UNE fiche pour trois notions, et
     l'élève qui vient des accords y trouve aussi la phrase et les
     compléments. Elles s'effacent dès que les trois fiches sont écrites. */
  // (« grammaire-phrase » a désormais SA fiche : plus d'alias pour elle.)
  // (« grammaire-complements » aussi, depuis le 23/08/2026 — sa ligne est
  //  partie d'ici le jour où sa fiche est entrée dans le dépôt. Il reste les
  //  deux du dessous : le groupe nominal et les accords n'ont toujours pas la
  //  leur au CM2, et le coach continue donc de les envoyer sur l'orthographe.)
  "francais/cm2/grammaire-groupe-nominal": "francais/cm2/grammaire-orthographe",
  "francais/cm2/grammaire-accords": "francais/cm2/grammaire-orthographe",

  /* ⭐ TROIS ALIAS DE 4e QUI NE SONT PAS PROVISOIRES (26/08/2026), et c'est ce
     qui les distingue de ceux du CM2 : ils ne s'effaceront jamais, parce que la
     fiche manquante n'est pas à écrire — elle serait un doublon.

     Le découpage des notions du 24/08 a coupé en deux des objectifs que le
     programme traite d'un bloc, pour tenir la règle « 3-4 micros par notion,
     5 au maximum ». « Fonctionnement de la phrase complexe » porte six micros :
     repérer les propositions d'un côté, analyser les subordonnées de l'autre.
     Mais c'est UNE section du programme, et elle s'enseigne d'une traite : la
     couper en deux fiches obligerait l'élève à ouvrir deux pages pour une seule
     leçon, et à lire deux fois la même définition.
     ⛔ Donc : une fiche, deux notions, et un alias pour que le coach affiche le
     badge « Fiche » sur les deux lignes. Sans lui, la seconde notion s'affiche
     sans fiche alors que son cours existe — le défaut exact que ces alias ont
     été créés pour réparer au CM2. */
  "francais/4e/phrase-subordonnees": "francais/4e/phrase-complexe",
  "francais/4e/vocabulaire-orthographe": "francais/4e/vocabulaire-formation",
  "francais/4e/conjugaison-valeurs": "francais/4e/conjugaison-temps",
};

/** La classe où la fiche est réellement rangée, quand elle diffère de celle
 *  demandée — pour l'afficher à l'élève (« Fiche · 4e ») plutôt que de lui
 *  ouvrir en silence le cours d'une autre année. `null` si pas d'alias. */
export function ficheClasseSource(
  matiere: string,
  classe: string,
  notion: string
): string | null {
  const cle = `${matiere}/${classe.toLowerCase()}/${notion.toLowerCase().replace(/_/g, "-")}`;
  const cible = FICHES_ALIAS[cle];
  if (!cible) return null;
  // ⛔ UN ALIAS DANS LA MÊME CLASSE N'EST PAS « UNE AUTRE ANNÉE ». Depuis que
  // trois notions du CM2 pointent vers une même fiche de CM2, cette fonction
  // renvoyait « cm2 » à un élève de CM2 : le coach lui annonçait un cours
  // d'un autre niveau qui était le sien. On ne prévient que d'un vrai écart.
  const classeCible = cible.split("/")[1];
  return classeCible === classe.toLowerCase() ? null : classeCible;
}

/** Le niveau tel qu'on l'ÉCRIT, à partir du slug tel qu'on le range.
 *  « cm2 » est un slug d'URL ; sur une fiche imprimée et distribuée en classe,
 *  il s'écrit « CM2 ». Les niveaux du collège (« 5e ») s'écrivent déjà comme
 *  leur slug — c'est ce qui avait laissé passer le « cm2 » en bas de page. */
export function libelleClasse(classe: string) {
  const c = classe.toLowerCase();
  const table: Record<string, string> = {
    cp: "CP", ce1: "CE1", ce2: "CE2", cm1: "CM1", cm2: "CM2",
    seconde: "2nde", "premiere-spe": "1re spé", "terminale-spe": "Tale spé",
  };
  return table[c] ?? classe;
}

export function hrefFiche(matiere: string, classe: string, notion: string) {
  return `/fiches-cours/${matiere}/${classe}/${notion}`;
}

export function titreFiche(matiere: string, classe: string, notion: string) {
  return (
    FICHES_REGISTRE[`${matiere}/${classe}/${notion}`]?.titre ??
    // Repli lisible pour une fiche pas encore au registre.
    notion.replace(/-/g, " ")
  );
}

export type FicheListItem = {
  matiere: string;
  classe: string;
  notion: string;
  titre: string;
  resume?: string;
  href: string;
};

// Ordre d'affichage des niveaux (du plus jeune au plus âgé).
const ORDRE_CLASSES = [
  "cp", "ce1", "ce2", "cm1", "cm2",
  "6e", "5e", "4e", "3e",
  "seconde", "premiere-spe", "terminale-spe",
  // IA : par thème
  "fondements", "usages", "enjeux",
];

/** Toutes les fiches d'une matière, triées par niveau puis titre. */
export function listerFiches(matiere: string): FicheListItem[] {
  return Object.entries(FICHES_REGISTRE)
    .map(([cle, v]) => {
      const [m, classe, notion] = cle.split("/");
      return { matiere: m, classe, notion, titre: v.titre, resume: v.resume, href: `/fiches-cours/${cle}` };
    })
    .filter((f) => f.matiere === matiere)
    .sort((a, b) => {
      const oa = ORDRE_CLASSES.indexOf(a.classe);
      const ob = ORDRE_CLASSES.indexOf(b.classe);
      if (oa !== ob) return oa - ob;
      return a.titre.localeCompare(b.titre, "fr");
    });
}

/** Le lien de la fiche si elle existe pour cette notion, sinon null.
 *  Tolère les variantes de slug (underscores ↔ tirets). */
export function ficheHrefSiExiste(
  matiere: string,
  classe: string,
  notion: string
): string | null {
  if (!matiere || !classe || !notion) return null;
  const n = notion.toLowerCase().replace(/_/g, "-");
  const c = classe.toLowerCase();
  const cle = `${matiere}/${c}/${n}`;
  return FICHES_REGISTRE[cle] ? `/fiches-cours/${cle}` : null;
}

/** Le lien de la fiche correspondant à une notion DU COACH, ou null.
 *  PLUS DE TABLE DE CORRESPONDANCE : le slug de la fiche EST le `notionId` du
 *  coach (ex. notionId "aire_surface" → fiche /maths/6e/aire-surface). Le coach
 *  est la source de vérité ; on se contente de normaliser les underscores. */
export function ficheHrefPourCoach(
  matiere: string,
  classe: string,
  coachNotionId: string
): string | null {
  const direct = ficheHrefSiExiste(matiere, classe, coachNotionId);
  if (direct) return direct;
  // Sinon, la notion revient peut-être d'une autre année : voir FICHES_ALIAS
  // (table écrite à la main, une ligne par cas justifié).
  const cle = `${matiere}/${classe.toLowerCase()}/${coachNotionId.toLowerCase().replace(/_/g, "-")}`;
  const cible = FICHES_ALIAS[cle];
  return cible && FICHES_REGISTRE[cible] ? `/fiches-cours/${cible}` : null;
}
