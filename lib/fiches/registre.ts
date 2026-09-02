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
  "maths/4e/stat-donnee": {
    titre: "Lire et interpréter des données",
    resume:
      "Un effectif compte, une fréquence compare : lire un tableau et un diagramme, rapporter une part au bon total, retrouver un effectif effacé par la somme — et choisir entre tableau, barres et camembert.",
  },
  "maths/4e/fonction-dependance": {
    titre: "Dépendance entre deux grandeurs",
    resume:
      "Connaître une grandeur suffit-il à trouver l'autre ? Programme de calcul, tableau et graphique lus dans les deux sens — et pourquoi le prix d'un taxi dépend de la distance sans lui être proportionnel.",
  },
  "maths/4e/triangle-figure": {
    titre: "Le triangle pour démontrer",
    resume:
      "Trois données bien choisies suffisent : les trois cas d'égalité, l'inégalité triangulaire et la somme des angles à 180° — et pourquoi trois angles ne donnent que des triangles semblables, jamais égaux.",
  },
  "maths/4e/ordre-grandeur": {
    titre: "Ordres de grandeur et préfixes",
    resume:
      "Nano, micro, milli, kilo, méga, giga : des puissances de dix écrites en un mot — associer un ordre de grandeur à un objet, estimer un calcul en arrondissant, et juger un résultat sans le refaire.",
  },
  "maths/4e/divisibilite": {
    titre: "Multiples, diviseurs et division euclidienne",
    resume:
      "Savoir si une division tombe juste sans la poser : les critères par 2, 3, 5, 9 et 10, le quotient et le reste — et pourquoi l'égalité seule ne suffit pas à écrire une division euclidienne.",
  },
  "maths/4e/nombre-premier": {
    titre: "Nombres premiers et décomposition",
    resume:
      "Exactement deux diviseurs : la liste jusqu'à 30, le crible jusqu'à 100 — et pourquoi 91 a l'air premier alors qu'il vaut 7 × 13.",
  },
  "maths/4e/reperage": {
    titre: "Se repérer sur une droite, dans le plan, sur la Terre",
    resume:
      "L'abscisse d'abord, toujours : lire des coordonnées, placer un rationnel sur une droite graduée, se repérer dans un pavé et sur la Terre — et pourquoi un repère n'est pas un écran d'ordinateur.",
  },
  "maths/4e/vision-espace": {
    titre: "Solides et représentations",
    resume:
      "Les sept solides et leur signature, les vues, le patron, la perspective et les sections — et pourquoi la boule n'a pas de patron, ce qui rend toute carte du monde fausse.",
  },
  "maths/3e/entier-arithmetique": {
    titre: "Multiples, diviseurs et facteurs premiers",
    resume:
      "Ce que la 4e ne faisait pas : démonter un entier en briques premières, et s'en servir — le PGCD, les parts sans reste, la fraction irréductible.",
  },
  "maths/3e/entier-racine-carree": {
    titre: "La racine carrée",
    resume:
      "Le chemin inverse du carré : ce qu'est √a, les carrés parfaits à connaître par cœur, encadrer une racine qui ne tombe pas juste — et pourquoi √(9 + 16) ne vaut pas √9 + √16.",
  },
  "maths/3e/trigo-trigonometrie": {
    titre: "Trigonométrie : sinus, cosinus, tangente",
    resume:
      "La 4e n'avait que le cosinus, donc rien à choisir. Avec le sinus et la tangente, le vrai exercice devient le choix du rapport — et il se lit sur les données, jamais au hasard.",
  },
  "maths/3e/equation-resolution": {
    titre: "Résoudre une équation",
    resume:
      "La 4e cherchait LA solution ; la 3e apporte l'équation produit nul, et avec elle une équation peut en avoir deux. Le signe est le piège : (x + 5) s'annule en −5, pas en 5.",
  },
  "maths/3e/thales-theoreme": {
    titre: "Le théorème de Thalès",
    resume:
      "Le théorème de la 4e, mais au brevet il arrive retourné : la configuration en papillon, que la banque de 3e interroge et que personne ne reconnaît. Et la rédaction, qui vaut autant que le résultat.",
  },
  "maths/3e/sections-solides": {
    titre: "Les sections planes de solides",
    resume:
      "Un cylindre donne un disque ou un rectangle selon la coupe : la question n'est jamais « quelle est la section de ce solide », mais « coupé comment ». Et dans la section, on calcule à plat.",
  },
  "maths/3e/volume-geometrie-espace": {
    titre: "La géométrie dans l'espace",
    resume:
      "Tout dessin de solide est un mensonge utile : la perspective cavalière dit ce qu'on déforme et ce qu'on garde. Trois arêtes du cube sont cachées, et une face dessinée en parallélogramme est un carré.",
  },
  "maths/3e/sym-transformation": {
    titre: "Transformations et homothétie",
    resume:
      "Quatre transformations conservent les longueurs, une cinquième ne les conserve pas : reconnaître une homothétie à ses droites concourantes, construire l'image d'une figure, calculer le rapport — et pourquoi l'aire suit k² et le volume k³.",
  },
  "maths/3e/affine-fonction": {
    titre: "Fonctions affines",
    resume:
      "Ce qu'on décrivait en 4e s'écrit enfin : f(x) = ax + b. Le a incline la droite, le b dit où elle coupe l'axe — et le point de bascule décide entre deux offres.",
  },
  "maths/3e/prop-proportionnalite": {
    titre: "Proportionnalité, pourcentages et grandeurs quotients",
    resume:
      "Une vitesse n'est ni une distance ni une durée : c'est le rapport des deux. Et deux évolutions successives se multiplient — +20 % puis −20 % ne ramène pas au prix de départ.",
  },
  "maths/3e/algo-programmation": {
    titre: "Algorithmique : variables, boucles et programmes de calcul",
    resume:
      "Un programme de calcul est une expression littérale écrite dans l'autre sens. Reste l'ordre des gestes, qui décide des parenthèses : ajouter 3 puis multiplier par 4 ne donne pas 4x + 3.",
  },
  "maths/3e/proba-experience": {
    titre: "Probabilités : issues, événements et deux épreuves",
    resume:
      "Une probabilité ne prédit pas un résultat, elle mesure une tendance. Et la 3e ajoute l'arbre : deux épreuves enchaînées, dont les chemins se comptent en multipliant.",
  },
  "maths/3e/fraction-rationnel": {
    titre: "Les nombres rationnels",
    resume:
      "Entiers, décimaux et fractions ne sont pas trois familles : ce sont trois écritures du même objet. Et entre deux d'entre eux, aussi proches soient-ils, il s'en cache toujours un autre.",
  },
  "maths/3e/entier-puissance": {
    titre: "Puissances et écriture scientifique",
    resume:
      "Le mot « carré » vient de la figure, et « cube » aussi : c'est ce qui empêche de croire que 2³ vaut 6. Puis les puissances de dix, qui rendent comparables la distance de la Lune et la taille d'un virus.",
  },
  "maths/3e/litteral-calcul": {
    titre: "Calcul littéral : développer, réduire, factoriser",
    resume:
      "Trois verbes et trois directions : développer va du produit vers la somme, factoriser fait l'inverse, réduire range. Et une seule égalité à savoir par cœur, celle qui factorise une différence de deux carrés.",
  },
  "maths/3e/fonction-generalite": {
    titre: "Fonctions : image et antécédent",
    resume:
      "Une machine à un seul bouton : un nombre entre, un nombre sort. Calculer une image, c'est remplacer ; chercher un antécédent, c'est résoudre — et un même résultat peut venir de deux départs.",
  },
  "maths/4e/grandeur-composee": {
    titre: "Grandeurs composées et unités",
    resume:
      "Une unité n'est pas une étiquette, c'est un calcul écrit : grandeur produit et grandeur quotient, lire un km/h, convertir en comprenant pourquoi 1 m² vaut 10 000 cm², et contrôler un résultat par son unité.",
  },
  "maths/4e/proba-frequence": {
    titre: "Fréquences observées et probabilité",
    resume:
      "La probabilité se calcule avant, la fréquence se mesure après : lire l'écart entre les deux, comprendre pourquoi il rétrécit quand on répète — et ce qu'un petit échantillon ne prouve pas.",
  },
  "maths/4e/prop-echelle": {
    titre: "Agrandissement, réduction et échelles",
    resume:
      "Lire une échelle et passer du plan à la réalité, utiliser un rapport d'agrandissement — et comprendre pourquoi doubler les longueurs quadruple l'aire et multiplie le volume par huit.",
  },
  "maths/4e/prop-ratio-pourcentage": {
    titre: "Ratios et pourcentages",
    resume:
      "Le ratio dit « tant contre tant », le pourcentage « tant sur cent » : exprimer et simplifier un ratio, le relier à l'égalité de quotients, partager une quantité selon deux ou trois parts, et manier le coefficient multiplicateur.",
  },
  "maths/4e/puissance-ecriture": {
    titre: "Puissances et notation scientifique",
    resume:
      "L'exposant compte les facteurs, il ne multiplie pas ; un exposant négatif donne un inverse et non un opposé ; et la notation scientifique donne à chaque nombre une forme unique, qui rend la comparaison immédiate.",
  },
  "maths/premiere-spe/derivation": {
    titre: "La dérivation",
    resume: "Taux de variation, nombre dérivé, dérivées usuelles et équation de la tangente.",
  },
  // ─── Français ───────────────────────────────────────────────────────────────
  // La matière s'ouvre au cycle 3 : c'est le programme du CM2, et c'est aussi
  // celui sur lequel porte l'écrit de français du CRPE.
  "francais/cm2/fluence-lecture": {
    titre: "Lire avec fluidité en CM2 (2026-2027)",
    resume:
      "La fluence se prépare : ce qu'on regarde en deux minutes, la pause à la virgule, la liaison que la page ne montre pas, et le palier de 120 mots par minute.",
  },
  "francais/cm2/lecture-voix-haute": {
    titre: "Lire à voix haute avec expressivité en CM2 (2026-2027)",
    resume:
      "On lit POUR quelqu'un, et c'est lui qui juge : articuler les fins de mots, régler son rythme sur l'auditoire, faire varier — et le plaisir que le programme demande.",
  },
  "francais/cm2/comprehension-textes": {
    titre: "Comprendre un texte seul en CM2 (2026-2027)",
    resume:
      "Ce qu'on fait quand ça bloque et qu'on est seul, le test des « peu de mots » pour restituer l'essentiel, l'implicite dont les indices sont écrits, et le genre qui dit comment lire.",
  },
  "francais/cm1/fluence-lecture": {
    titre: "Lire avec fluidité en CM1 (2026-2027)",
    resume:
      "110 mots par minute est un thermomètre, pas une consigne. Un mot irrégulier ne se déchiffre pas : il se reconnait d'un bloc.",
  },
  "francais/cm1/lecture-voix-haute": {
    titre: "Lire à voix haute en CM1 (2026-2027)",
    resume:
      "Le volume, le débit et le rythme sont trois boutons différents. Plus fort ne veut pas dire plus clair — et le dernier rang donne la mesure.",
  },
  "francais/cm1/comprehension-textes": {
    titre: "Comprendre un texte en CM1 (2026-2027)",
    resume:
      "Comprendre n'est pas un don : c'est une suite de gestes. Le premier surprend — on relit la question, pas le texte.",
  },
  "francais/cm1/comprehension-documents": {
    titre: "Lire un document en CM1 (2026-2027)",
    resume:
      "Personne ne lit un pot de yaourt en entier. Un document, on n'y lit pas tout : on y cherche une chose.",
  },
  "francais/cm1/lecture-oeuvres": {
    titre: "Lire une œuvre en CM1 (2026-2027)",
    resume:
      "Quand on abandonne un livre, on n'a pas perdu l'histoire : on a perdu qui est qui. Le narrateur, le héros, l'adversaire.",
  },
  "francais/cm1/culture-personnages": {
    titre: "Héros et merveilleux en CM1 (2026-2027)",
    resume:
      "Ce n'est pas la magie qui fait le conte : c'est que personne ne s'en étonne. Le merveilleux, l'étrange, et le héros dépassé.",
  },
  "francais/cm1/culture-soi-et-les-autres": {
    titre: "Morale, poésie et les autres en CM1 (2026-2027)",
    resume:
      "Une histoire ne dit pas ce qu'elle veut dire : elle le montre. Un drap pour la mer, un renard pour un flatteur.",
  },
  "francais/cm1/culture-lecteur": {
    titre: "Devenir lecteur en CM1 (2026-2027)",
    resume:
      "Un carnet de lecture ne sert pas à prouver qu'on a lu. Ce qui compte : ce que tu as aimé, et l'endroit exact.",
  },
  "francais/cm1/ecriture-preparer": {
    titre: "Écrire pour apprendre en CM1 (2026-2027)",
    resume:
      "Recopier une leçon ne la fait pas entrer dans la tête. Reformulée avec tes mots, elle devient la tienne.",
  },
  "francais/cm1/ecriture-produire": {
    titre: "Écrire un texte qui se tient en CM1 (2026-2027)",
    resume:
      "Des phrases justes mises bout à bout font une liste. Ce sont les connecteurs qui en font un texte.",
  },
  "francais/cm1/ecriture-reviser": {
    titre: "Revenir sur son texte en CM1 (2026-2027)",
    resume:
      "On ne voit pas ses propres fautes, et au CM1 on ne te demande pas de les trouver seul. On te montre l'endroit : corrige là.",
  },
  "francais/cm1/oral-ecouter": {
    titre: "Écouter une consigne en CM1 (2026-2027)",
    resume:
      "Beaucoup d'exercices ratés ont simplement été commencés trop tôt. Écouter, redire avec ses mots, puis faire.",
  },
  "francais/cm1/oral-echanger": {
    titre: "Prendre la parole avec les autres en CM1 (2026-2027)",
    resume:
      "Participer, ce n'est pas donner la bonne réponse. Trois façons de prendre la parole, une seule demande de savoir.",
  },
  "francais/cm1/vocabulaire-sens": {
    titre: "Comprendre un mot inconnu en CM1 (2026-2027)",
    resume:
      "Il n'y a presque rien à deviner : l'explication est déjà dans la phrase, souvent juste après une virgule.",
  },
  "francais/cm1/vocabulaire-relations": {
    titre: "Familles de mots et contraires en CM1 (2026-2027)",
    resume:
      "Le contraire de content n'est ni joyeux ni ravi. Et tout cela sert au moment où tu te relis.",
  },
  "francais/cm1/vocabulaire-emploi": {
    titre: "La lettre qu'on n'entend pas en CM1 (2026-2027)",
    resume:
      "Grand donne grande, chant donne chanter : la lettre muette se trouve. Cherche d'abord, apprends ce qui reste.",
  },
  "francais/cm1/grammaire-types-phrases": {
    titre: "Les types et les formes de phrases en CM1 (2026-2027)",
    resume:
      "L'exclamatif n'est pas un type : le type se lit à ce que la phrase attend de toi, pas au point final.",
  },
  "francais/cm1/grammaire-phrase": {
    titre: "Trouver le sujet et le verbe en CM1 (2026-2027)",
    resume:
      "Un sujet n'a ni allure fixe ni place fixe. On ne le devine pas : on le prouve par « c'est … qui ».",
  },
  "francais/cm1/grammaire-complements": {
    titre: "Les compléments du verbe en CM1 (2026-2027)",
    resume:
      "Cette année tu n'as pas à nommer le groupe : deux gestes suffisent, l'enlever et le déplacer.",
  },
  "francais/cm1/grammaire-classes-mots": {
    titre: "Les petits mots et leur nature en CM1 (2026-2027)",
    resume:
      "Mets la phrase au pluriel et regarde qui a bougé : le déterminant change, l'adverbe jamais.",
  },
  "francais/cm1/grammaire-groupe-nominal": {
    titre: "Le groupe nominal et son noyau en CM1 (2026-2027)",
    resume:
      "On ne cherche pas le mot le plus important : on réduit le groupe, et le dernier mot debout est le noyau.",
  },
  "francais/cm1/grammaire-accords": {
    titre: "Les accords et les homophones en CM1 (2026-2027)",
    resume:
      "a/à, est/et, sont/son, ont/on : l'un des deux est un verbe. Mets la phrase à l'imparfait et tu sais lequel.",
  },
  "francais/cm1/conjugaison-temps-simples": {
    titre: "Les temps simples en CM1 (2026-2027)",
    resume:
      "Dans « je jouerai », le mot « jouer » est encore là en entier : l'infinitif est la clé des trois temps.",
  },
  "francais/cm1/conjugaison-formes": {
    titre: "La forme d'un verbe conjugué en CM1 (2026-2027)",
    resume:
      "« Nous » finit toujours par -ons, aux trois temps : la marque de temps change, celle de personne tient bon.",
  },
  "francais/cm1/conjugaison-passe-compose": {
    titre: "Le passé composé et le choix du temps en CM1 (2026-2027)",
    resume:
      "Le temps ne se devine pas : « demain », « hier », « en ce moment » l'annoncent avant que tu écrives.",
  },
  "francais/cm2/comprehension-documents": {
    titre: "Lire des documents et croiser des informations en CM2 (2026-2027)",
    resume:
      "Nommer les éléments d'un document composite, croiser deux documents pour compléter — la réponse n'est souvent dans aucun des deux — et prélever en partant de la question.",
  },
  "francais/cm2/lecture-oeuvres": {
    titre: "Le thème d'une œuvre en CM2 (2026-2027)",
    resume:
      "Le thème tient en un mot et n'est pas l'histoire : c'est par lui qu'on relie deux œuvres, et par l'émotion qu'on se relie à un personnage. Plus les personnages et les enjeux.",
  },
  "francais/cm2/culture-personnages": {
    titre: "Héros, merveilleux et autres vies en CM2 (2026-2027)",
    resume:
      "Le héros se définit par l'épreuve et le choix, pas par la force ; le merveilleux par une magie que personne ne discute — et lire d'autres vies n'est pas fuir la sienne.",
  },
  "francais/cm2/culture-soi-et-les-autres": {
    titre: "Morale, poésie et rapport aux autres en CM2 (2026-2027)",
    resume:
      "Interroger une morale, c'est se demander si l'on est d'accord — et pourquoi. Le conflit révèle les valeurs, s'affirmer n'est pas s'imposer, et la poésie donne le gout des mots.",
  },
  "francais/cm2/culture-lecteur": {
    titre: "Choisir un livre et aller au bout en CM2 (2026-2027)",
    resume:
      "On ne persévère pas dans un livre qu'on n'a pas choisi : justifier son choix, tenir trois lignes par livre dans son carnet, et s'en servir pour mieux choisir le suivant.",
  },
  "francais/cm2/ecriture-preparer": {
    titre: "Préparer un écrit en CM2 (2026-2027)",
    resume:
      "Quatre écrits qui ne se rendent pas et sans lesquels rien ne se rend — copier par groupes, noter en abrégé, ranger dans l'ordre, comparer en deux colonnes.",
  },
  "francais/cm2/ecriture-produire": {
    titre: "Écrire un texte à plusieurs paragraphes en CM2 (2026-2027)",
    resume:
      "Où couper — une idée neuve, on va à la ligne — et comment tenir : les connecteurs. Quatre sortes de textes, et la marque d'écriture de chacune.",
  },
  "francais/cm2/ecriture-reviser": {
    titre: "Réviser son texte et son brouillon en CM2 (2026-2027)",
    resume:
      "Réviser ajoute quelque chose au texte ; recopier ne fait que le déplacer. Un brouillon sans une seule rature n'a rien retravaillé.",
  },
  "francais/cm2/oral-ecouter": {
    titre: "Écouter pour comprendre en CM2 (2026-2027)",
    resume:
      "Reformuler prouve qu'on a compris ; synthétiser prouve qu'on a trié. Faire court par oubli fait court aussi — et ce n'est pas une synthèse.",
  },
  "francais/cm2/oral-echanger": {
    titre: "Présenter un travail et participer à un débat en CM2 (2026-2027)",
    resume:
      "Argumenter est la charnière : le seul geste qui vaut en exposé comme en débat. Un avis sans « parce que » n'est pas un argument.",
  },
  "francais/cm2/vocabulaire-sens": {
    titre: "Le sens des mots en CM2 (2026-2027)",
    resume:
      "Un mot n'a pas son sens tout seul : c'est la phrase qui le lui donne. Contexte, polysémie, sens figuré, nuance — et le test du dessin.",
  },
  "francais/cm2/vocabulaire-formation": {
    titre: "La formation des mots en CM2 (2026-2027)",
    resume:
      "Un mot est fait de morceaux, et c'est le sens du morceau qui compte, pas sa forme. Préfixes, suffixes, racines, mots composés et homonymes.",
  },
  "francais/cm2/vocabulaire-emploi": {
    titre: "Employer les mots en CM2 : niveaux de langue et dictionnaire (2026-2027)",
    resume:
      "Un mot n'est à toi que quand tu peux l'écrire dans une phrase à toi. Niveaux de langue, réemploi, orthographe des mots fréquents, dictionnaire.",
  },
  // ─── Cycle 2 : le premier essai du format CP → CE2 (01/09/2026) ─────────────
  "francais/cp/grammaire-phrase": {
    titre: "La phrase au CP (2026-2027)",
    resume:
      "Une phrase se reconnait à ses deux bouts : une grande lettre au début, un point à la fin. Des dessins à colorier.",
  },
  "francais/cp/copie": {
    titre: "Copier sans se tromper au CP (2026-2027)",
    resume:
      "On ne copie pas lettre à lettre : on retient un morceau et on l'écrit d'un trait. Le sens du tracé, la hauteur des lettres, et se relire du doigt.",
  },
  "francais/cp/classes-mots": {
    titre: "Le nom, le verbe et l'adjectif au CP (2026-2027)",
    resume:
      "Un mot tout seul ne dit pas ce qu'il est : c'est la phrase qui décide. Le nom, le verbe, le déterminant, l'adjectif et le pronom, chacun avec son test.",
  },
  "francais/cm2/grammaire-nature-fonction": {
    titre: "Nature et fonction d'un mot en CM2 (2026-2027)",
    resume:
      "La nature est dans le dictionnaire, la fonction est dans la phrase. Le test du doigt : cache le reste — peux-tu encore répondre ?",
  },
  "francais/cm2/grammaire-pronoms": {
    titre: "Les pronoms personnels en CM2 (2026-2027)",
    resume:
      "Le seul mot de la langue qui change de forme selon son rôle. Sujet ou complément, et la place devant le verbe qui tranche tout.",
  },
  "francais/cm2/grammaire-orthographe": {
    titre: "Analyser une phrase : nature, fonction, accords",
    resume:
      "Sujet, verbe, compléments, attribut, groupe nominal et accords — chaque règle dessinée sur la phrase.",
  },

  "francais/cm2/grammaire-accords": {
    titre: "Les accords en CM2 (2026-2027)",
    resume:
      "Au CM2, celui qui commande n'est plus à côté de celui qui reçoit : trace la flèche du donneur au receveur.",
  },

  "francais/cm2/grammaire-groupe-nominal": {
    titre: "Le groupe nominal et ses expansions en CM2 (2026-2027)",
    resume:
      "Rien entre le nom et l'adjectif : épithète. Un verbe d'état : attribut. Une préposition : complément du nom.",
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
  "francais/6e/comprehension-textes": {
    titre: "Comprendre et interpréter un texte en 6e (2026-2027)",
    resume:
      "Dégager le sens global, rattacher un texte à son genre, comprendre l'implicite — la réponse peut manquer, jamais l'indice — et justifier en citant le passage.",
  },
  "francais/6e/comprehension-reprises": {
    titre: "Suivre les reprises et les liens logiques d'un texte (2026-2027)",
    resume:
      "Les deux fils d'un texte : les reprises disent de qui on parle — et une reprise n'est pas toujours un pronom —, les mots de liaison disent comment les idées se tiennent.",
  },
  "francais/6e/comprehension-documents": {
    titre: "Lire des documents et des images en 6e (2026-2027)",
    resume:
      "La nature et la source avant le contenu, le cadrage comme choix — ce qui est dehors a été écarté par quelqu'un —, décrire avant d'interpréter, et croiser deux documents.",
  },
  "francais/6e/lecture-oeuvres": {
    titre: "Lire une œuvre et se l'approprier en 6e (2026-2027)",
    resume:
      "Tenir le fil d'une œuvre longue, la relier à ce qu'on a vécu, fonder son interprétation sur un passage précis — et débattre d'une fin sans que l'un des deux ait tort.",
  },
  "francais/6e/lecture-voix-haute": {
    titre: "Lire à voix haute et mettre en voix en 6e (2026-2027)",
    resume:
      "Préparer sa lecture en silence, regarder l'auditoire, et trouver le ton là où il est écrit : le verbe de parole, la ponctuation, les mots du récit — et le tiret qui change de voix.",
  },
  "francais/6e/culture-reperes": {
    titre: "Genres, contexte et carnet de lecture en 6e (2026-2027)",
    resume:
      "Les mots pour parler d'un livre — narrateur, héros, adversaire, cadre —, pourquoi l'auteur n'est pas le narrateur, et un carnet qui garde un avis avec le passage qui le justifie.",
  },
  "francais/6e/ecriture-main": {
    titre: "Écrire à la main de manière fluide et efficace en 6e (2026-2027)",
    resume:
      "Le temps se perd dans les allers-retours, pas dans la main : copier par groupes, retenir son dernier mot écrit, se relire sur sa feuille — et régler la mise en forme.",
  },
  "francais/6e/ecriture-apprendre": {
    titre: "Résumer, hiérarchiser et justifier en 6e (2026-2027)",
    resume:
      "Écrire pour apprendre, c'est trier — et trier, c'est jeter : ce qu'un résumé garde, le test du détail, le présent, trois phrases pour une page, et classer avant de rédiger.",
  },
  "francais/6e/ecriture-produire": {
    titre: "Écrire un texte qui se tient en 6e (2026-2027)",
    resume:
      "La cohérence, c'est ce qui ne doit pas changer en route — personnages, temps, lieu, narrateur — et la casse est entre les phrases, pas dedans. Plus les codes de l'écrit.",
  },
  "francais/6e/ecriture-reviser": {
    titre: "Réviser son texte et son brouillon en 6e (2026-2027)",
    resume:
      "Sans critères, on relit ce qu'on croit avoir écrit : les trois façons de sortir de sa tête, le brouillon comme lieu de ratures, et l'accord du verbe en premier.",
  },
  "francais/6e/oral-ecouter": {
    titre: "Écouter pour comprendre en 6e (2026-2027)",
    resume:
      "Savoir ce qu'on cherche change ce qu'on entend : l'écoute orientée par un but, reformuler avec ses mots, reconnaitre un genre de discours, et noter des mots clés.",
  },
  "francais/6e/oral-dire": {
    titre: "Dire pour être compris en 6e (2026-2027)",
    resume:
      "Présenter en suivant un plan et en regardant la classe, jouer un texte en l'interprétant, expliquer sans notes en retenant l'ordre — et l'oral qui sert à réfléchir.",
  },
  "francais/6e/oral-echanger": {
    titre: "Participer à un échange en 6e (2026-2027)",
    resume:
      "Un échange n'est pas une suite de monologues : le tour de parole, l'argument qui est une raison, reprendre avant d'ajouter, et la remarque qui désigne un endroit.",
  },
  "francais/6e/culture-recits": {
    titre: "Récits des origines, aventure et monstres en 6e (2026-2027)",
    resume:
      "Trois entrées et une seule question : ce que le récit explique de nous. Le mythe qui explique et qui fait payer, les trois pièces de l'aventure, et le monstre qui n'est pas un méchant.",
  },
  "francais/6e/culture-poesie-theatre": {
    titre: "Poésie et théâtre en 6e (2026-2027) : mots, merveilles et ruses",
    resume:
      "Les deux genres où le texte attend une voix : la forme du poème, la rime qui est un son, l'image — et au théâtre la didascalie, l'aparté, et le rire qui vient d'un écart de savoir.",
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
  "francais/5e/conjugaison-valeurs": {
    titre: "L'emploi des temps et des modes (2026-2027)",
    resume:
      "L'imparfait installe, le passé simple fait avancer, le temps composé dit l'accompli — et le mode se choisit sur l'intention : ordonner, supposer, souhaiter.",
  },
  "francais/5e/lecture-comprehension": {
    titre: "Comprendre et interpréter un texte (2026-2027)",
    resume:
      "Les cinq moments du récit, l'endroit où retourner chercher selon la question, et ce que le texte fait comprendre sans l'écrire — avec l'endroit qui le prouve.",
  },
  "francais/5e/lecture-apprecier": {
    titre: "Apprécier un texte et fonder son jugement (2026-2027)",
    resume:
      "Nommer ce qui, dans le texte, a produit l'effet ressenti ; dire sur quoi le jugement s'appuie — émotion, écriture, idées, ou simple gout — et choisir l'outil d'analyse.",
  },
  "francais/5e/lecture-oeuvre-contextes": {
    titre: "Appréhender une œuvre dans son contexte (2026-2027)",
    resume:
      "Suivre le parcours d'un personnage en comparant la fin au premier chapitre, comparer ce que peuvent les mots, l'image, la musique et la scène, et lire le contexte.",
  },
  "francais/5e/culture-connaissances": {
    titre: "Acquérir des connaissances littéraires (2026-2027)",
    resume:
      "Reconnaitre un genre dès son ouverture, situer une œuvre parmi quatre périodes, savoir ce qu'il faut connaitre pour comprendre une scène, et tenir un carnet qui se relit.",
  },
  "francais/5e/ecriture-reflechir": {
    titre: "Écrire pour réfléchir, apprendre et mémoriser (2026-2027)",
    resume:
      "Planifier en partant de la fin qu'on veut atteindre, repérer l'idée qui commande plutôt que le détail qui frappe, et récrire une leçon avec ses mots pour la retenir.",
  },
  "francais/5e/ecriture-produire": {
    titre: "Écrire des textes d'invention et de réflexion (2026-2027)",
    resume:
      "Les quatre pièces d'un récit et les quatre d'une argumentation, la description qui montre au lieu de nommer, et les règles de la réponse rédigée.",
  },
  "francais/5e/ecriture-reviser": {
    titre: "Évaluer son écrit et savoir le faire évoluer (2026-2027)",
    resume:
      "L'ordre des relectures — la consigne, le plan, les phrases, l'orthographe en dernier —, les cinq relectures fondatrices, et le brouillon comme écrit à retravailler.",
  },
  "francais/5e/culture-entrees-5e": {
    titre: "Les quatre entrées de culture littéraire (2026-2027)",
    resume:
      "Le héros qui perd en superbe et gagne en banalité, le voyage que fait la langue d'un poème, les ressorts du théâtre renversé, et ce qu'incarne chaque figure de fable.",
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
  // ⭐ LES DEUX DERNIERS ALIAS DU CM2 SONT PARTIS LE 01/09/2026, comme leur
  //   commentaire l'annonçait : `grammaire-groupe-nominal` et
  //   `grammaire-accords` ont désormais LEUR fiche. Il ne reste plus rien à
  //   rediriger vers `grammaire-orthographe`.
  //   ⏳ RESTE À FAIRE : sortir `francais/cm2/grammaire-orthographe` du
  //   registre et poser une 301 vers `grammaire-nature-fonction`
  //   (décision de Frédéric du 01/09). Tant que ce n'est pas fait, l'ancienne
  //   page vit encore — ce qui ne casse rien, mais fait quatre pages qui se
  //   recoupent. Voir l'en-tête de `francais-cm2-grammaire-groupe-nominal`.

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
