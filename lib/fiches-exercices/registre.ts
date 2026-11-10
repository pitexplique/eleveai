// Registre des fiches d'exercices : LA source de vérité de la liste. Même
// principe que `lib/fiches/registre.ts` pour les fiches de cours — une ligne ici,
// et la fiche est au sitemap (app/sitemap.ts) et sur la ligne de sa notion dans
// le coach (app/coach-ia/[matiere]/page.tsx). Rien d'autre à maintenir.
//
// ⚠️ La clé est `<matière>/<classe>/<slug de la notion du coach>`, en tirets :
// c'est ce qui permet au coach de retrouver la fiche depuis un `notionId`.

type FicheExercicesEntry = {
  titre: string;
  resume: string;
  /** Les AUTRES fiches de cours (slugs de la même classe) que cette feuille
   *  couvre — quand une notion a deux fiches de cours et une seule feuille
   *  d'exercices. Le slug de la clé est couvert d'office. */
  aussiPour?: string[];
  /** Les notions DU COACH (ids) qui mènent aussi à cette feuille — quand un
   *  chapitre est coupé en plusieurs notions au coach et tient en UNE feuille
   *  (la dérivation, 28/09/2026). Le slug de la clé est couvert d'office. */
  notionsCoach?: string[];
};

export const FICHES_EXERCICES_REGISTRE: Record<string, FicheExercicesEntry> = {
  // ⭐ LE FRANÇAIS DE 6e (06/10/2026) — Frédéric : « pour coach français il
  // faut générer les fiches exercices », « faire rêver, apprendre », QCM,
  // dictées, mots à entourer, défis. La clé = la notion du coach en tirets.
  "francais/6e/grammaire-accords": {
    titre: "Les accords et les homophones : 20 exercices corrigés",
    resume:
      "Accorder dans le groupe nominal, accorder le verbe avec son sujet, le participe passé avec être et avec avoir, choisir entre a et à, et et est, son et sont, on et ont. À bord du Nautilus, autour du monde avec Phileas Fogg, puis quatre défis : le centre de la Terre, la Lune, la bouteille à la mer, le ballon. QCM, mots à entourer, lettres à corriger et quatre dictées.",
  },
  // ⭐ LA 6e (30/09/2026) — Frédéric : « toutes les fiches d'exercices faites
  // pour eux ». Dans l'ordre du coach ; phrases courtes, ils lisent parfois mal.
  "maths/6e/entier-nombre": {
    titre: "Les nombres entiers : 20 exercices corrigés",
    resume:
      "Écrire un nombre en chiffres et en lettres, trouver le chiffre et le nombre de centaines, comparer et ranger, décomposer, encadrer, lire une droite graduée. Des planètes, des stades de rugby, des vélos, des bouchons à recycler, un chèque, un comptage d'oiseaux et un compteur de voiture.",
  },
  "maths/6e/decimal-nombre": {
    titre: "Les nombres décimaux : 20 exercices corrigés",
    resume:
      "Lire et écrire un décimal, le rang d'un chiffre, comparer et ranger, arrondir à l'unité, au dixième, au centième, encadrer et intercaler. Un lancer de poids, le prix du gazole, un compteur de vélo, une course de 100 m, des fruits sur la balance, la pluie de la semaine.",
  },
  "maths/6e/decimal-calcul": {
    titre: "Calculer avec les nombres décimaux : 20 exercices corrigés",
    resume:
      "Additionner et soustraire virgule sous virgule, multiplier, multiplier par 0,1, 0,01, 0,001, diviser par un entier en continuant après la virgule, contrôler avec un ordre de grandeur. Des courses au marché, une recette de crêpes, un relais, une sortie au parc, des tomates du potager, l'eau de la douche.",
  },
  "maths/6e/demi-droite-graduee": {
    titre: "La demi-droite graduée : 20 exercices corrigés",
    resume:
      "Lire l'abscisse d'un point, placer un nombre décimal, placer une fraction (plus grande que 1 comprise), graduer un segment de longueur donnée. Un sentier, une frise du XXe siècle, une balance de cuisine, une clôture, un thermomètre, un ruban, un saut en longueur.",
  },
  "maths/6e/fraction-nombre": {
    titre: "Les fractions : 20 exercices corrigés",
    resume:
      "Lire, écrire et dessiner une fraction, passer d'une fraction décimale à un nombre à virgule, comparer et ranger, encadrer une fraction entre deux entiers. Des gourdes, une élection de délégué, un sentier de randonnée, un vitrail et une fraction mystère.",
  },
  "maths/6e/fraction-calcul": {
    titre: "Calculer avec les fractions : 20 exercices corrigés",
    resume:
      "Prendre une fraction d'une quantité, additionner et soustraire des fractions de même dénominateur ou de dénominateurs multiples, multiplier une fraction par un entier. Des tartes, une classe à vélo, un jardin, des crêpes, une randonnée, de l'argent de poche et une plante à arroser.",
  },
  "maths/6e/algebre-probleme": {
    titre: "Problèmes à nombres inconnus et motifs : 20 exercices corrigés",
    resume:
      "Sans lettre : dessiner un schéma en barres, retirer ce qui dépasse, partager en parts égales, trouver deux nombres par échange, prolonger un motif qui grandit. Billes, allumettes, balance, banquet, tirelire, places de cinéma.",
  },
  "maths/6e/pourcentage-nombre": {
    titre: "Les pourcentages : 20 exercices corrigés",
    resume:
      "Comprendre « sur 100 », passer d'un pourcentage à une fraction et à un décimal, calculer 50 %, 25 %, 10 % d'un nombre, écrire une part en pourcentage. Une grille de 100 carreaux, des soldes, une bibliothèque, un sondage, le budget d'une fête et deux magasins.",
  },
  "maths/6e/prop-proportionnalite": {
    titre: "La proportionnalité : 20 exercices corrigés",
    resume:
      "Reconnaître une situation proportionnelle et celle qui ne l'est pas, compléter un tableau, trouver le coefficient, passer par l'unité. Des glaces, une soupe, un ressort, un escargot, un pique-nique, une roue de vélo, une salle d'escalade.",
  },
  "maths/6e/prop-echelle": {
    titre: "Les échelles : 20 exercices corrigés",
    resume:
      "Lire une échelle, passer du plan à la réalité et de la réalité au plan, retrouver l'échelle, sans produit en croix. Cartes de randonnée, chambre, terrain de handball, maquette d'avion, chasse au trésor, potager.",
  },
  "maths/6e/entier-calcul-pose": {
    titre: "Le calcul posé : 20 exercices corrigés",
    resume:
      "Poser une addition et une soustraction avec retenues, une multiplication par un ou deux chiffres, une division en potence, puis vérifier par l'opération inverse et l'ordre de grandeur. Une bibliothèque, un club de foot, une forêt après la tempête, des cagettes de pommes, une classe de neige, un apiculteur et les perles de Mia.",
  },
  "maths/6e/entier-calcul-mental": {
    titre: "Le calcul mental : 20 exercices corrigés",
    resume:
      "Passer par la dizaine, arrondir puis corriger, couper un nombre en morceaux, regrouper, double et moitié, fois et divisé par 10, 100, 1 000, ordre de grandeur. Une recette de crêpes, une équipe de volley, une sortie au parc animalier, des tours de piste, une pyramide de nombres et une tirelire.",
  },
  "maths/6e/aire-longueur": {
    titre: "Les longueurs : 20 exercices corrigés",
    resume:
      "Mesurer à la règle, connaître les unités du mm au km, convertir avec le tableau, comparer, calculer un reste ou un total. Une chenille, un saut en longueur, une pelote de laine, un trajet à vélo, une course d'orientation, un bambou, une guirlande.",
  },
  "maths/6e/aire-perimetre": {
    titre: "Les périmètres : 20 exercices corrigés",
    resume:
      "Suivre le tour d'une figure, calculer le périmètre d'un carré, d'un rectangle, d'un triangle ou d'une figure en L, retrouver un côté, coller des morceaux. Une cabane à oiseaux, un poulailler, un terrain de handball, un jardin partagé, une guirlande lumineuse, les tables de la fête.",
  },
  "maths/6e/aire-unite": {
    titre: "L'aire et ses unités : 20 exercices corrigés",
    resume:
      "Dire ce qu'est une aire, compter des carreaux et des demi-carreaux, choisir entre mm², cm², dm², m² et km², passer des m² aux dm² et des dm² aux cm² avec le carré découpé en cent. Un studio, une nappe, un carreau de faïence, un bac potager, une mosaïque, une salle de jeux.",
  },
  "maths/6e/aire-surface": {
    titre: "Les aires : 20 exercices corrigés",
    resume:
      "Calculer l'aire d'un rectangle et d'un carré, retrouver un côté, comparer des aires, découper une figure en L, en U ou en croix, enlever un trou. Un tapis, une terrasse, un mur à peindre, un panneau d'affichage, une chambre à parqueter, un jardin, une salle de bain, un enclos.",
  },
  "maths/6e/volume-solide": {
    titre: "Les volumes : 20 exercices corrigés",
    resume:
      "Compter des cubes même cachés, lire une mesure en cm³ ou en m³, comparer deux solides, additionner les morceaux d'un assemblage et calculer le volume d'une boîte. Une boîte de sucres, un château, un bac du jardin, un camion de déménagement.",
  },
  "maths/6e/angle-mesure": {
    titre: "Les angles : 20 exercices corrigés",
    resume:
      "Nommer un angle, le classer (aigu, droit, obtus, plat), le comparer, le mesurer et le tracer au rapporteur, puis calculer un angle dans un angle plat ou un tour complet. Une horloge, des ciseaux, une tarte, un éventail, une rose des vents, une grande roue, un miroir et un ordinateur portable.",
  },
  "maths/6e/triangle-figure": {
    titre: "Les triangles : 20 exercices corrigés",
    resume:
      "Nommer un triangle, repérer sommets, côtés et côté opposé, reconnaître un triangle isocèle, équilatéral, quelconque, rectangle, obtusangle ou aigu, calculer le périmètre d'un triangle particulier. Un panneau de danger, un cerf-volant, un potager et un pavage.",
  },
  "maths/6e/triangle-propriete": {
    titre: "Les angles du triangle et le triangle possible : 20 exercices corrigés",
    resume:
      "Utiliser la somme des angles (180°), trouver un angle manquant dans un triangle rectangle ou isocèle, savoir si trois longueurs forment un triangle. Une échelle contre un mur, une charpente, trois villages, dix bâtonnets et trois coins de papier.",
  },
  "maths/6e/quadrilatere-figure": {
    titre: "Les quadrilatères : 20 exercices corrigés",
    resume:
      "Nommer un quadrilatère (côtés opposés, consécutifs, diagonales), reconnaître un rectangle, un losange ou un carré par ses codages et les distinguer, même penchés. Une tablette de chocolat, une feuille A4 pliée, un terrain de handball, un potager, des carrés à compter.",
  },
  "maths/6e/quadrilatere-propriete": {
    titre: "Propriétés des quadrilatères : 20 exercices corrigés",
    resume:
      "Lire les propriétés du rectangle, du losange et du carré (côtés opposés, diagonales), conclure ou non sur la nature, compléter une figure sur quadrillage, construire à l'équerre et au compas. Un terrain de sport, un foulard, des pailles articulées, un jardin partagé.",
  },
  "maths/6e/duree-temps": {
    titre: "Horaires et durées : 20 exercices corrigés",
    resume:
      "Calculer une heure de fin ou une durée sur une ligne du temps, convertir heures, minutes, secondes, jours et semaines, comprendre 1,5 h ou 2,75 h, passer minuit. Match, bus, bateau de nuit, marathon, nuit de sommeil, randonnée.",
  },
  "maths/6e/distance-segment": {
    titre: "Distances et milieu d'un segment : 20 exercices corrigés",
    resume:
      "Écrire (AB), [AB] ou AB, lire une longueur sur la règle, trouver et construire le milieu, comprendre que la ligne droite est le plus court chemin et reconnaître trois points alignés. Un refuge de randonnée, un raccourci dans un parc, une ligne de tram, un ruban plié, une carte au trésor.",
  },
  "maths/6e/bissectrice-angle": {
    titre: "La bissectrice d'un angle : 20 exercices corrigés",
    resume:
      "Reconnaître la bissectrice (deux angles égaux), la tracer par pliage puis au rapporteur, calculer la moitié ou le double d'un angle, enchaîner les bissectrices. Une tarte en parts égales, deux bissectrices perpendiculaires, un programme de construction et un projecteur de théâtre.",
  },
  "maths/6e/vision-espace": {
    titre: "La vision dans l'espace : 20 exercices corrigés",
    resume:
      "Compter les cubes d'un empilement étage par étage, dessiner les vues de dessus, de face, de gauche et de droite, lire un plan à nombres, reconnaître un patron de cube et lire une perspective cavalière. Un entrepôt de caisses, un dé à jouer, un cube peint.",
  },
  "maths/6e/cercle-circonscrit": {
    titre: "Médiatrices et cercle circonscrit : 20 exercices corrigés",
    resume:
      "Les trois médiatrices d'un triangle se coupent en un même point : le voir, écrire la preuve, construire le cercle circonscrit, et comprendre le triangle obtus et les points alignés. Trois fermes et un puits, une assiette cassée, une table ronde.",
  },
  "maths/6e/mediatrice-segment": {
    titre: "La médiatrice d'un segment : 20 exercices corrigés",
    resume:
      "Reconnaître la médiatrice, utiliser sa propriété dans les deux sens, la construire à l'équerre, au compas ou par pliage, trouver le milieu d'une corde et le centre perdu d'un cercle. Un arrêt de bus, un gymnase entre trois écoles, une assiette cassée, un cerf-volant, deux puits.",
  },
  "maths/6e/cercle-disque": {
    titre: "Le cercle et le disque : 20 exercices corrigés",
    resume:
      "Rayon, diamètre et corde, point sur le cercle, dans le disque ou dehors, points à une distance donnée, tour proportionnel au diamètre et périmètre avec π ≈ 3,14. Un chien et sa laisse, une horloge, une fenêtre, une piste, une ronde dans la cour.",
  },
  "maths/6e/sym-axiale": {
    titre: "La symétrie axiale : 20 exercices corrigés",
    resume:
      "Reconnaître un pliage, construire sur quadrillage l'image d'un point, d'un segment, d'un triangle, trouver l'axe, compter les axes d'une figure et utiliser ce que la symétrie conserve. Un chalet qui se reflète dans un lac, des lettres, un logo, un rebond au billard, trois drapeaux, une feuille pliée en quatre.",
  },
  "maths/6e/algo-programmation": {
    titre: "Algorithmique et programmation : 20 exercices corrigés",
    resume:
      "Lire un programme Scratch dans l'ordre, faire avancer et tourner le lutin, utiliser une boucle « répéter », tracer un carré, un rectangle ou un triangle équilatéral. Un robot qui sème, une course d'orientation, une ruche, une chasse au trésor.",
  },
  "maths/cm1/tableau": {
    titre: "Lire et compléter un tableau : 20 exercices corrigés",
    resume:
      "Lire une case, croiser une ligne et une colonne, calculer un total, une case vide ou un écart, vérifier qu'un total est juste, résoudre un petit défi. De la musique, une piscine, des abeilles, un cinéma, des tortues, un tournoi, un bus et un festival.",
  },
  "maths/cm1/graphique": {
    titre: "Lire un graphique : 20 exercices corrigés",
    resume:
      "Lire une barre sur un axe gradué, lire un diagramme circulaire, compléter une barre effacée, comparer, calculer un écart ou un total. Une mangeoire, une bibliothèque, des étoiles filantes, une kermesse, un vivarium, la météo et la cantine.",
  },
  // ── CM1 : fractions (25/10/2026) ──
  "maths/cm1/fraction": {
    titre: "Les fractions : 20 exercices corrigés",
    resume:
      "Lire et dessiner une fraction, comprendre l'unité, reconnaître une fraction plus grande que 1, la placer sur la droite, comparer, trouver des fractions égales en regroupant les parts, passer aux dixièmes, aux centièmes et au « pour cent ». Des crêpes, des billes, un saut sans élan, un calendrier, un match de football, les planètes et une mosaïque.",
  },
  // ── fin CM1 : fractions ──
  "maths/cm2/tableau": {
    titre: "Lire, compléter et interpréter un tableau : 20 exercices corrigés",
    resume:
      "Lire une case au croisement d'une ligne et d'une colonne, retrouver une case effacée grâce au total, comparer, calculer un écart, vérifier un total de deux façons. Un cinéma, un car scolaire, un château fort, une kermesse, le Piton de la Fournaise, un refuge, une bibliothèque et les médailles des Jeux de Paris 2024.",
  },
  "maths/cm2/graphique": {
    titre: "Lire un graphique : 20 exercices corrigés",
    resume:
      "Lire une barre sur un axe gradué, même au milieu de deux graduations, lire une courbe qui monte et qui descend, lire un diagramme circulaire avec la moitié et le quart, compléter une barre, trouver une erreur, vérifier un total. Des animaux soignés, la marée, du miel, de la neige, les Jeux olympiques, une rivière en crue et la durée du jour.",
  },
  // ─── CM2 : fractions (25/10/2026) ───
  // Une feuille par notion du coach CM2 : fraction, fraction_mixte, fraction_calcul.
  "maths/cm2/fraction": {
    titre: "Les fractions : 20 exercices corrigés",
    resume:
      "Lire une fraction, la dessiner sur une barre, un disque ou un rectangle, la placer sur la droite graduée, comparer, trouver des fractions égales et simplifier, passer d'une fraction à un nombre à virgule puis à un pourcentage (1/4 = 0,25 = 25 %). Une pizza, un potager, les océans, un match de basket, une fresque, des notes de musique et un sac de billes.",
  },
  "maths/cm2/fraction-mixte": {
    titre: "Les fractions plus grandes que 1 : 20 exercices corrigés",
    resume:
      "Écrire une fraction plus grande que 1 comme un entier et une fraction (7/4 = 1 + 3/4), regrouper un entier et une fraction en une seule fraction, encadrer une fraction entre deux entiers, la placer sur la droite et l'écrire avec une virgule. Des pizzas, une piste cyclable, une recette, des tartes, un train et des rubans.",
  },
  "maths/cm2/fraction-calcul": {
    titre: "Calculer avec les fractions : 20 exercices corrigés",
    resume:
      "Additionner et soustraire des fractions de même dénominateur, ou dont un dénominateur est multiple de l'autre, multiplier une fraction par un entier, prendre une fraction d'une quantité. Une pizza, des billes, une grenouille, un match de football, une kermesse, un refuge pour tortues et une haie à planter.",
  },
  // ─── CM2 : toutes les autres notions du coach (10/11/2026) ───
  // Feuilles interactives : champ réponse + clavier maths, vérifiées sans IA.
  "maths/cm2/nombre-entier": {
    titre: "Les nombres entiers : 20 exercices corrigés",
    resume:
      "Lire et écrire les grands nombres, les comparer, les ranger, les décomposer, les arrondir, les placer sur une droite graduée, trouver des multiples et des diviseurs. Un stade, des macarons, des bouquets, des bus, des concerts, un carrelage et un camion.",
  },
  "maths/cm2/suite": {
    titre: "Les suites de nombres : 20 exercices corrigés",
    resume:
      "Continuer une suite, trouver sa règle, dire si elle monte ou si elle descend, puis des défis. Des allumettes, une bougie, une plante d'eau, un taxi, une coureuse, un banquet, une citerne et un code secret.",
  },
  "maths/cm2/multiplication": {
    titre: "La multiplication : 20 exercices corrigés",
    resume:
      "Les tables, le calcul de tête, multiplier par 10, 100 ou 1 000 par la valeur des chiffres, poser une multiplication avec ou sans virgule. Une boulangerie, un cinéma, des crêpes, un voyage en train et des panneaux solaires.",
  },
  "maths/cm2/division": {
    titre: "La division : 20 exercices corrigés",
    resume:
      "Partager en parts égales, vérifier une division par une multiplication, poser une division, comprendre le reste, continuer après la virgule. Des voitures, un album photo, du tissu, des cars, de la confiture, une course de relais et un jardin.",
  },
  "maths/cm2/nombre-decimal": {
    titre: "Les nombres décimaux : 20 exercices corrigés",
    resume:
      "Lire et écrire un nombre à virgule, passer d'une fraction décimale au nombre décimal, trouver la valeur d'un chiffre, comparer, ranger, placer sur la droite, arrondir, diviser par 10, 100 ou 1 000. La poste, le marché, une course, un laboratoire, un cadenas et un sentier de randonnée.",
  },
  "maths/cm2/calcul": {
    titre: "Le calcul : 20 exercices corrigés",
    resume:
      "Calculer de tête, poser une addition ou une soustraction, avec ou sans virgule, respecter les priorités, prendre la moitié ou le double, multiplier par 5, 50, 11 ou 25, estimer un résultat. Une course à pied, une corde d'escalade, une recette, un musée, un tournoi de foot et un potager.",
  },
  "maths/cm2/calculs-commerciaux": {
    titre: "Les calculs commerciaux : 20 exercices corrigés",
    resume:
      "Calculer un prix de revient, un bénéfice ou une perte, l'intérêt d'une somme placée, lire et compléter une facture avec la TVA. Un réparateur de vélos, une fleuriste, une banque, un club de sport, un garage, un atelier de poterie et une brocante.",
  },
  "maths/cm2/probleme": {
    titre: "Les problèmes : 20 exercices corrigés",
    resume:
      "Choisir la bonne opération, résoudre en une étape puis en plusieurs, choisir la bonne phrase-réponse, compter toutes les possibilités, chercher le plus petit ou le plus grand. Un infirmier, un zoo, une boulangerie, une fleuriste, un parc animalier, un glacier et une ferme.",
  },
  "maths/cm2/algebre": {
    titre: "Les débuts de l'algèbre : 20 exercices corrigés",
    resume:
      "Lire et compléter une égalité, trouver le nombre caché, lire un schéma en barres, continuer un motif qui grandit et trouver une étape lointaine sans tout dessiner. Une course de relais, un ukulélé, un restaurant, un tour de magie, un bassin et un robot.",
  },
  "maths/cm2/proportionnalite": {
    titre: "La proportionnalité : 20 exercices corrigés",
    resume:
      "Reconnaître une situation de proportionnalité, compléter un tableau, trouver le nombre par lequel on multiplie, chercher « 2 fois plus » ou le prix d'un seul. Des crêpes, des tulipes, un zoo, de la peinture, un ressort, des cordes de guitare et un voyage en voiture.",
  },
  "maths/cm2/pourcentage": {
    titre: "Les pourcentages : 20 exercices corrigés",
    resume:
      "Lire un pourcentage sur une grille de 100 cases, l'écrire en fraction et avec une virgule, calculer 10 %, 25 % ou 50 % d'une quantité, une remise et le prix à payer. Un ballon de foot, des soldes, un sondage, un verger, l'eau du corps humain et une piscine.",
  },
  "maths/cm2/echelle": {
    titre: "Les échelles : 20 exercices corrigés",
    resume:
      "Lire une échelle, passer du plan à la vraie distance et retour, convertir avant de calculer, retrouver l'échelle d'un plan. Des cartes, une maquette de bus, une chambre, une architecte, un avion, un terrain de football et une mare.",
  },
  "maths/cm2/longueur": {
    titre: "Les longueurs : 20 exercices corrigés",
    resume:
      "Convertir des km, m, cm et mm avec le tableau, comparer des longueurs, lire une règle et estimer la bonne unité. Des étagères de menuisière, des tournesols, une girafe, une piste cyclable et une pile de jetons.",
  },
  "maths/cm2/masse": {
    titre: "Les masses : 20 exercices corrigés",
    resume:
      "Convertir des tonnes, kg, g et mg, comparer, lire une balance en équilibre et estimer une masse. Un melon, la recette du pâtissier, un camion, un ascenseur, le sac de farine de la boulangère et des letchis.",
  },
  "maths/cm2/contenance": {
    titre: "Les contenances : 20 exercices corrigés",
    resume:
      "Convertir des L, dL, cL et mL, comparer, lire un verre doseur et estimer une contenance. Une pâte à crêpes, une fontaine, un aquarium, une douche ou un bain, un anniversaire et la citerne de la maraîchère.",
  },
  "maths/cm2/duree": {
    titre: "Les durées : 20 exercices corrigés",
    resume:
      "Lire l'heure sur une horloge à aiguilles et sur un réveil, placer les aiguilles, convertir, puis calculer une durée ou une heure de fin en passant par l'heure pile. Un car scolaire, un film, un vol de nuit, le gâteau du pâtissier et un entraînement de natation.",
  },
  "maths/cm2/perimetre": {
    titre: "Les périmètres : 20 exercices corrigés",
    resume:
      "Faire le tour d'une figure sur quadrillage puis avec des mesures (triangle, carré, rectangle, losange, polygones), trouver un côté qui manque. Un terrain de basket, une pièce en L, des cadres photo, une clôture et l'enclos de la fermière.",
  },
  "maths/cm2/aire": {
    titre: "Les aires : 20 exercices corrigés",
    resume:
      "Compter des carreaux, choisir entre cm², dm² et m², calculer l'aire d'un carré, d'un rectangle, d'un triangle rectangle, découper une figure en rectangles. Un potager, une voile de bateau, une cuisine à carreler, une fresque, des panneaux solaires et un enclos de chèvres.",
  },
  "maths/cm2/angle": {
    titre: "Les angles : 20 exercices corrigés",
    resume:
      "Trouver le sommet et les côtés d'un angle, repérer un angle droit, nommer un angle avec trois lettres, dire s'il est aigu, droit, obtus ou plat, comparer sans mesurer, lire un rapporteur. Une horloge, une pizza, une rampe de skate, un éventail et une rose des vents.",
  },
  "maths/cm2/reperage": {
    titre: "Se repérer sur un quadrillage : 20 exercices corrigés",
    resume:
      "Nommer une case comme C4, lire les coordonnées d'un point comme (3 ; 2), retrouver un point, compter un déplacement. Un zoo, un robot, une carte au trésor, des étoiles, un drone, une fourmi et une randonnée.",
  },
  "maths/cm2/droite": {
    titre: "Droites, parallèles et perpendiculaires : 20 exercices corrigés",
    resume:
      "Reconnaître et écrire un segment, une demi-droite, une droite, repérer des parallèles et des perpendiculaires, choisir le bon point pour en tracer une. Des rails, une guitare, le plan d'un quartier, un cerf-volant et l'échelle des pompiers.",
  },
  "maths/cm2/symetrie": {
    titre: "La symétrie axiale : 20 exercices corrigés",
    resume:
      "Reconnaître un axe de symétrie, compter les carreaux jusqu'à l'axe, choisir le bon symétrique d'un point ou d'une figure, se servir de ce que la symétrie garde. Des lettres, une broderie, le reflet d'une montagne dans un lac, un logo et un massif de rosiers.",
  },
  "maths/cm2/figure-plane": {
    titre: "Les figures planes : 20 exercices corrigés",
    resume:
      "Reconnaître un triangle, un carré, un losange, un cercle, lire le codage, le rayon et le diamètre, suivre un programme de construction et trouver la mesure qui manque. Un carrelage, un cerf-volant, une cible, un vitrail et des balles de tennis.",
  },
  "maths/cm2/solide": {
    titre: "Les solides : 20 exercices corrigés",
    resume:
      "Reconnaître un cube, un pavé, un cylindre, un cône, une pyramide, compter faces, arêtes et sommets, trouver le bon patron et la face d'en face. Une épicerie, une tente, un dé, une chocolaterie, un cube peint et les cartons de la pâtissière.",
  },
  "maths/cm2/probabilite": {
    titre: "Les probabilités : 20 exercices corrigés",
    resume:
      "Dire si c'est certain, possible ou impossible, compter les chances avec un sac de billes, une roue, un dé, comparer deux jeux, lister les issues de deux épreuves. Une kermesse, une roue de fête foraine, un dé fait main et pierre-feuille-ciseaux.",
  },
  "maths/cm2/algorithmique": {
    titre: "L'algorithmique : 20 exercices corrigés",
    resume:
      "Suivre des instructions dans l'ordre, coder un déplacement avec des flèches, lire un programme Scratch, compter les pas, utiliser « répéter ». Un robot aspirateur, une chasse au trésor, un tour de magie, un drone, un robot jardinier et une livreuse à vélo.",
  },
  // ─── fin CM2 ───
  "maths/6e/stat-enquete": {
    titre: "Mener une enquête : 20 exercices corrigés",
    resume:
      "Choisir la bonne question et les bonnes personnes, mesurer et noter avec une seule unité, ranger une liste de réponses dans un tableau d'effectifs contrôlé par le total, lire un tableau. Des tomates, un glacier, une mare, la piscine, le sommeil et deux sondages qui ne disent pas la même chose.",
  },
  "maths/6e/stat-donnee": {
    titre: "Lire et interpréter des données : 20 exercices corrigés",
    resume:
      "Lire un diagramme en barres, un graphique et un diagramme circulaire, prélever une valeur dans un tableau à double entrée, calculer un total ou un écart, dire si une phrase est vraie, fausse ou exagérée. Des hérissons, un parc, une poubelle, des vélos, des médailles, des faucons, la cantine et la météo.",
  },
  "maths/6e/proba-experience": {
    titre: "Premiers pas en probabilités : 20 exercices corrigés",
    resume:
      "Dire si un événement est certain, possible ou impossible, lister les issues, compter et comparer des chances, placer une chance sur l'échelle de 0 à 1. Des roues, des sacs de billes, des cartes, un dé fabriqué, une tombola et une fête foraine.",
  },
  "maths/6e/proba-frequence": {
    titre: "Fréquences observées : 20 exercices corrigés",
    resume:
      "Calculer une fréquence observée en fraction, en décimal et en pourcentage, la comparer à la probabilité et au nombre de fois attendu, voir l'écart se réduire quand on répète. Des pièces, des dés, une punaise, des graines, un dé suspect et toute une classe qui réunit ses lancers.",
  },
  // ⭐ LA PREMIÈRE DU COLLÈGE (20/09/2026) — elle ferme le trio de la Une de
  // l'accueil : le short « 1/2 + 1/3 ne fait pas 2/5 », la leçon vidéo, la feuille.
  "maths/5e/fraction-calcul": {
    titre: "Calculer avec les fractions : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : additionner et soustraire (même dénominateur, multiples, différents), multiplier, prendre une fraction d'un nombre, démonter l'erreur 1/2 + 1/3 = 2/5. Un rappel de cours avant chaque niveau, et cinq corrigés dessinés.",
  },
  // ⭐ LA 5e (29/09/2026) — Frédéric : « je préfère compléter les fiches
  // d'exercices pour tous les niveaux ». Dans l'ordre du coach.
  "maths/5e/algo-programmation": {
    titre: "Algorithmique et programmation : 20 exercices corrigés",
    resume:
      "Lire un programme Scratch : suivre les blocs dans l'ordre, repérer les entrées et les sorties, calculer une expression, prévoir ce que dira le lutin. Des fléchettes, un trajet à vélo, une pâte à crêpes, un robot aspirateur, un pluviomètre, un cadenas à code, une tondeuse robot. Les blocs dessinés, le trajet du lutin tracé.",
  },
  "maths/5e/algo-construire": {
    titre: "Construire un programme : 20 exercices corrigés",
    resume:
      "Écrire un programme Scratch : traduire une formule en blocs, choisir une condition, régler les paramètres, poser une boucle « répéter » et faire tracer au lutin carrés, triangles, pentagone et escalier. Un taxi, une plante à arroser, une fusée, un thermomètre, une serre automatique, la clôture d'un potager, un feu tricolore.",
  },
  "maths/5e/relatif-nombre": {
    titre: "Les nombres relatifs : 20 exercices corrigés",
    resume:
      "Écrire un relatif, reconnaître son signe, lire et placer une abscisse sur une droite graduée, comparer et ranger, l'opposé et la distance à zéro. Des températures, une différence de buts, une frise de l'Antiquité, un tournoi de golf, un ascenseur, la coupe d'une île. La droite graduée dessinée dans les corrigés.",
  },
  "maths/5e/relatif-operation": {
    titre: "Les opérations sur les nombres relatifs : 20 exercices corrigés",
    resume:
      "Additionner deux relatifs, soustraire en ajoutant l'opposé, enlever les parenthèses, calculer une suite d'additions et de soustractions. Un congélateur, un lac de barrage, la frise de Rome à Alésia, les fuseaux horaires, une grotte, un carré magique. Les sauts dessinés sur la droite graduée.",
  },
  "maths/5e/divisibilite": {
    titre: "Multiples, diviseurs et divisibilité : 20 exercices corrigés",
    resume:
      "Reconnaître un multiple et un diviseur, les critères par 2, 5, 10, 3 et 9, lister tous les diviseurs par paires, trouver un chiffre caché. Des jetons en rectangle, une plantation de salades, deux robots sur une règle, le code d'un cadenas, un mur à carreler, et pourquoi la règle du 9 marche.",
  },
  "maths/5e/fraction-nombre": {
    titre: "Les fractions : 20 exercices corrigés",
    resume:
      "Fractions égales, simplifier, écrire un quotient en fraction et en décimal, comparer et ranger, l'opposé d'une fraction. Le vote de trois classes, des tablettes de chocolat, des tirs au but, un jardin partagé, les fractions de l'heure, une fraction mystère. Barres et disques de fractions dessinés.",
  },
  "maths/5e/prop-proportionnalite": {
    titre: "La proportionnalité : 20 exercices corrigés",
    resume:
      "Reconnaître une situation de proportionnalité — et celle qui n'en est pas une —, compléter un tableau, trouver le coefficient, revenir à l'unité, calculer une quatrième proportionnelle. Des croissants, une piste d'athlétisme, des ruches, l'eau de mer, un pressoir, un robinet qui goutte, un podomètre. Le tableau dessiné dans les corrigés.",
  },
  "maths/5e/prop-ratio-pourcentage": {
    titre: "Ratios, pourcentages et coefficient : 20 exercices corrigés",
    resume:
      "Écrire et simplifier un ratio, partager selon un ratio, prendre un pourcentage, écrire une part en pourcentage, passer d'une hausse ou d'une baisse au coefficient multiplicateur. Une forêt, des tirs au but, des soldes, une pâte sablée, les oiseaux d'un étang, le budget d'une sortie. La barre des parts dessinée.",
  },
  "maths/5e/litteral-calcul": {
    titre: "Le calcul littéral : 20 exercices corrigés",
    resume:
      "Lire une expression, traduire une phrase, remplacer la lettre par un nombre, réduire, tester une égalité, développer k(a + b). Des tuiles, une balance, des programmes de calcul, des allumettes, une location de vélo, les tarifs d'une piscine, la bordure d'un bassin. Un dessin dans chaque corrigé.",
  },
  "maths/5e/angle-mesure": {
    titre: "Les angles : 20 exercices corrigés",
    resume:
      "Nommer, mesurer, tracer et estimer un angle, angles complémentaires, supplémentaires et opposés par le sommet, puis deux parallèles coupées par une sécante. Des rues qui se croisent, une horloge, l'ombre de deux poteaux au soleil. Chaque figure dessinée à l'échelle.",
  },
  "maths/5e/triangle-figure": {
    titre: "Les triangles : 20 exercices corrigés",
    resume:
      "Reconnaître un triangle isocèle, équilatéral ou rectangle, savoir si trois longueurs ferment un triangle, le construire, calculer un angle avec la somme de 180°. Une tente, trois refuges de montagne, un bateau vu depuis deux phares. Chaque triangle dessiné à l'échelle.",
  },
  "maths/5e/sym-centrale": {
    titre: "La symétrie centrale : 20 exercices corrigés",
    resume:
      "Reconnaître un demi-tour, construire l'image d'un point, d'un segment, d'un triangle, retrouver le centre, et se servir de ce que la symétrie conserve : longueurs, angles, aires, parallélisme. Un terrain de football, des dominos, un logo. Chaque figure dessinée sur quadrillage avec son image.",
  },
  "maths/5e/parallelogramme": {
    titre: "Le parallélogramme : 20 exercices corrigés",
    resume:
      "Reconnaître un parallélogramme, côtés et angles opposés, angles consécutifs, diagonales et centre de symétrie, losange, rectangle et carré, constructions. Un portail extensible, un pavage de losanges, un cadre qu'on pousse. Chaque figure dessinée à l'échelle et codée.",
  },
  "maths/5e/aire-surface": {
    titre: "Les aires : 20 exercices corrigés",
    resume:
      "Compter des carreaux, distinguer aire et périmètre, aire du triangle (même quand la hauteur tombe dehors) et du parallélogramme, découper une figure pour ajouter ou retrancher, remonter à une hauteur. Une cabane, une voile, un champ de blé, un potager, un terrain à bâtir. Chaque figure dessinée et cotée.",
  },
  "maths/5e/grandeur-conversion": {
    titre: "Convertir les grandeurs : 20 exercices corrigés",
    resume:
      "Convertir longueurs, masses et contenances, écrire une durée en heures et minutes, convertir avant de comparer ou de calculer, vérifier qu'un résultat a du sens. Un sac de randonnée, un train, un relais de natation, un trail, une citronnade, des bouteilles en plastique. Le tableau de conversion dessiné.",
  },
  "maths/5e/volume-solide": {
    titre: "Les volumes : 20 exercices corrigés",
    resume:
      "Compter des cubes, même cachés, volume du pavé droit, du prisme droit et du cylindre, assemblages, passer des cm³ aux litres et aux m³, remonter à une longueur. Un aquarium, une tente, un nichoir, une piscine, une cuve d'eau de pluie, un galet plongé dans l'eau. Chaque solide dessiné en perspective.",
  },
  "maths/5e/stat-statistique": {
    titre: "Les statistiques : 20 exercices corrigés",
    resume:
      "Ranger des réponses dans un tableau d'effectifs, lire un tableau et un diagramme, calculer une fréquence en fraction, en décimal et en pourcentage, construire un diagramme, choisir la bonne représentation, calculer une moyenne. Des trajets d'élèves, des oiseaux, un budget de club, le temps d'écran, la pluie.",
  },
  "maths/5e/proba-experience": {
    titre: "Les probabilités : 20 exercices corrigés",
    resume:
      "Reconnaître une expérience aléatoire, lister les issues, événement certain ou impossible, équiprobabilité, calculer une probabilité en fraction, en décimal et en pourcentage. Des roues de kermesse, un tiroir de chaussettes, les mois de l'année, le sac du Scrabble, des oiseaux bagués, un dé fait main. Roues, dés et billes dessinés.",
  },
  // ⭐ LA PREMIÈRE DE 3e (21/09/2026) — le trio de la Une du collège : le short
  // « +20 % puis −20 % » (la tablette de 100 carrés), la fiche de cours, la
  // feuille. Le verre doseur et les abonnés perdus sont dans les exercices.
  "maths/3e/prop-proportionnalite": {
    titre: "Proportionnalité et pourcentages : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : reconnaître la proportionnalité, tableau et produit en croix, pourcentages, coefficient multiplicateur, vitesse et débit. Et le piège du chapitre, compté carré par carré : +20 % puis −20 % ne ramène pas au départ. La tablette de 100 carrés, les abonnés perdus, la deuxième démarque, l'aller-retour.",
  },
  // Le lot de 3e (24/09/2026), dans l'ordre d'affichage du coach.
  "maths/3e/algo-programmation": {
    titre: "Algorithmique et programmation : 20 exercices corrigés",
    resume:
      "Suivre un programme Scratch bloc par bloc, variables, boucles « répéter » et « répéter jusqu'à », conditions avec « et » et « ou », programme de calcul écrit en x, corriger un programme. Trace des variables dans chaque corrigé.",
  },
  "maths/3e/fraction-rationnel": {
    titre: "Nombres rationnels : 20 exercices corrigés",
    resume:
      "Écrire un nombre sous la forme a/b, passer de la fraction au décimal, comparer des fractions négatives, calculer avec les priorités, et trouver toujours un rationnel entre deux autres. Corrigés étape par étape, avec la droite graduée.",
  },
  "maths/3e/entier-puissance": {
    titre: "Puissances et écriture scientifique : 20 exercices corrigés",
    resume:
      "Écrire et calculer une puissance, (−2)⁴ contre −2⁴, puissances de 10 et exposants négatifs, écriture scientifique, produit, quotient et puissance de puissance, et pourquoi 2³ + 2⁴ n'est pas 2⁷. Problèmes : la lumière jusqu'à Neptune, le disque plein de photos, les fourmis de la Terre, la feuille pliée jusqu'à la Lune.",
  },
  "maths/3e/entier-arithmetique": {
    titre: "Multiples, diviseurs et facteurs premiers : 20 exercices corrigés",
    resume:
      "Diviseurs, critères, nombres premiers, décomposition en facteurs premiers, PGCD et fraction irréductible — puis les sacs du ravitaillement, les dalles d'une terrasse, Jupiter et Saturne, les équipes d'un club. Échelles de divisions dessinées dans les corrigés.",
  },
  "maths/3e/litteral-calcul": {
    titre: "Le calcul littéral : 20 exercices corrigés",
    resume:
      "Traduire, calculer, réduire, développer, factoriser, les identités remarquables et la différence de deux carrés, puis prouver avec une lettre : programmes de calcul du brevet, un potager, le cadre d'un tableau. Corrigés étape par étape, avec le dessin des aires.",
  },
  "maths/3e/equation-resolution": {
    titre: "Résoudre une équation : 20 exercices corrigés",
    resume:
      "Du geste seul au problème de brevet : la balance dessinée à chaque étape, l'équation produit nul qui donne deux solutions, x² = a, et quatre mises en équation — deux loueurs de vélos, le triathlon olympique, une chandelle, une échappée du Tour.",
  },
  "maths/3e/fonction-generalite": {
    titre: "Fonctions : image et antécédent : 20 exercices corrigés",
    resume:
      "Une image se lit en partant de l'axe horizontal, un antécédent en partant de l'axe vertical, et il y en a parfois deux, trois ou aucun. Courbes, tableur, formules et programmes de calcul, comme au brevet : un matin de gel, la marée, le dégagement d'un gardien, une randonnée, une crue.",
  },
  "maths/3e/affine-fonction": {
    titre: "Fonctions affines : 20 exercices corrigés",
    resume:
      "Lire a et b dans une formule, sur une droite, dans un tableau ; trouver la fonction avec deux points ; linéaire et proportionnalité ; comparer deux tarifs comme au brevet. Chaque corrigé dessine la droite et sa marche d'escalier.",
  },
  "maths/3e/triangle-figure": {
    titre: "Les triangles : 20 exercices corrigés",
    resume:
      "Trouver un angle avec la somme de 180°, reconnaître isocèle, équilatéral, rectangle, tester si trois longueurs ou trois angles font un triangle — puis le pont en treillis, la pyramide du Louvre et Paris-Lyon-Marseille, chaque triangle dessiné à l'échelle.",
  },
  "maths/3e/pythagore-theoreme": {
    titre: "Le théorème de Pythagore et sa réciproque : 20 exercices corrigés",
    resume:
      "Repérer l'hypoténuse, calculer une longueur, puis démontrer qu'un angle est droit — ou qu'il ne l'est pas — avec la rédaction du brevet. Une échelle, une tyrolienne, un voilier, une rampe, le coin d'un terrain de football : chaque corrigé a son triangle dessiné à l'échelle.",
  },
  "maths/3e/thales-theoreme": {
    titre: "Le théorème de Thalès : 20 exercices corrigés",
    resume:
      "Reconnaître la configuration même en papillon, écrire les quotients dans le bon ordre, calculer une longueur, prouver un parallélisme par la réciproque ou la contraposée, et rédiger comme au brevet. Puis un arbre mesuré par son ombre, une passerelle sans traverser la rivière, la pente de la Streif, la tour Eiffel dans une photo. Chaque corrigé a sa figure à l'échelle.",
  },
  "maths/3e/trigo-trigonometrie": {
    titre: "La trigonométrie : cosinus, sinus, tangente : 20 exercices corrigés",
    resume:
      "Choisir entre cosinus, sinus et tangente, puis calculer une longueur ou un angle : la tour Eiffel, une échelle, un cerf-volant, la rue la plus pentue du monde, la descente d'un avion. Chaque corrigé a son triangle dessiné à l'échelle.",
  },
  "maths/3e/sym-transformation": {
    titre: "Transformations et homothétie : 20 exercices corrigés",
    resume:
      "Symétries, translation, quart de tour, puis l'homothétie sur quadrillage : la construire (rapport négatif compris), retrouver son centre et son rapport, et voir pourquoi l'aire suit k² — chambre noire, vidéoprojecteur, frise, carte au 1/25 000.",
  },
  "maths/3e/sections-solides": {
    titre: "Les sections planes de solides : 20 exercices corrigés",
    resume:
      "Nommer la section d'un pavé, d'un cylindre, d'un cône, d'une pyramide ou d'une boule, puis calculer à plat dedans : de la meule de comté à la pyramide du Louvre et au parallèle de Paris, chaque corrigé dessine le solide coupé et la section en vraie grandeur.",
  },
  "maths/3e/volume-geometrie-espace": {
    titre: "La géométrie dans l'espace : 20 exercices corrigés",
    resume:
      "Reconnaître les solides et compter faces, arêtes, sommets, lire une perspective cavalière, trouver une section, repérer un point dans un pavé et une ville par sa latitude et sa longitude — un drone, un cargo de conteneurs, Stockholm et Le Cap, les antipodes, le ballon de foot.",
  },
  "maths/3e/aire-perimetre": {
    titre: "Périmètres : 20 exercices corrigés",
    resume:
      "Faire le tour d'un polygone, mesurer un cercle (2πr ou πd, jamais πr²), suivre le contour d'une figure composée sans compter les traits intérieurs — et la piste de 400 m, la roue d'un vélo, la boucle d'un parc, une corde autour de la Terre.",
  },
  "maths/3e/aire-surface": {
    titre: "Les aires : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : convertir m², cm² et hectares, trouver la vraie hauteur d'un triangle, l'aire d'un disque avec πr², découper une figure composée, et voir pourquoi doubler les longueurs quadruple l'aire. Un terrain de football en hectares, des pizzas, un mur à repeindre, des panneaux solaires. Vingt corrigés dessinés, la surface ombrée.",
  },
  "maths/3e/volume-solide": {
    titre: "Calculer un volume : 20 exercices corrigés",
    resume:
      "Du carton de déménagement à la Lune : pavé, prisme, cylindre, cône, pyramide et boule, litres et mètres cubes, et le volume multiplié par k³ quand on agrandit. Chaque corrigé dessine son solide, dimensions dessus.",
  },
  "maths/3e/stat-statistique": {
    titre: "Les statistiques : 20 exercices corrigés",
    resume:
      "Effectifs et fréquences, moyenne avec effectifs, médiane en rangeant d'abord, étendue, tableur et diagrammes, et choisir entre moyenne et médiane : la pluie de Paris, Kipchoge à Berlin, un orage, des salaires tirés par deux dirigeants.",
  },
  "maths/3e/proba-experience": {
    titre: "Probabilités : 20 exercices corrigés",
    resume:
      "Issues, événements, équiprobabilité, contraire, puis deux épreuves : le tableau des deux dés, l'arbre avec ou sans remise, la roue tournée deux fois. Tirs au but, météo du week-end, donneurs de sang, jeu équitable — un schéma par corrigé.",
  },
  "maths/3e/entier-racine-carree": {
    titre: "La racine carrée : 20 exercices corrigés",
    resume:
      "Retrouver une racine, reconnaître un carré parfait, encadrer une racine entre deux entiers puis au dixième, résoudre x² = a — et mesurer un champ de deux hectares, un terrain de handball, un écran en pouces.",
  },
  // ⭐ LA PREMIÈRE DE SECONDE (20/09/2026) — le trio de la Une « fiche de paie » :
  // le short, la fiche de cours, la feuille. De vrais chiffres, sourcés en tête
  // du fichier de données (OCDE, URSSAF, INSEE).
  "maths/seconde/information-chiffree-evolutions": {
    titre: "Pourcentages et évolutions : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème, sur de vrais chiffres : une fiche de paie (47 % du coût ou 89 % du net ?), vingt ans de salaires, cinq pays. Proportion et total de référence, points de pourcentage, coefficient multiplicateur, évolutions successives et réciproques. Un rappel de cours avant chaque niveau.",
  },
  // ⭐ LE BLOC « NOMBRES ET CALCULS » DE SECONDE (21/09/2026) — Frédéric :
  // « toutes les fiches exercices de nombres et calculs en seconde », une par
  // une, chronométrées.
  "maths/seconde/puissances-2de": {
    titre: "Les puissances : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : produit, quotient, puissance d'une puissance, exposant négatif, expressions à réduire sous la forme a^n comme au contrôle, notation scientifique. La lumière du Soleil, les globules rouges, une bactérie qui se divise.",
  },
  // La feuille de la micro `puiss_meme_exposant` (07/11/2026). Le bouton « Exercices »
  // de la notion reste sur la feuille au-dessus, qui renvoie à celle-ci.
  "maths/seconde/puissance-produit-fraction": {
    titre: "Puissance d'un produit ou d'une fraction : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : répartir un exposant, regrouper pour calculer sans calculatrice, calculer (2/3)^3, exposant négatif, base négative, bases décimales. Une maquette d'architecte, des lancers francs, la caféine d'une canette, les Lunes dans la Terre.",
  },
  "maths/seconde/racine-carree-2de": {
    titre: "La racine carrée : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : calculer, racine d'un carré, produit de racines, simplifier, additionner des racines de même radical comme au contrôle, développer. Une diagonale, un triangle rectangle, le secret de la feuille A4.",
  },
  "maths/seconde/developpement-factorisation-2de": {
    titre: "Développer et factoriser : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : distributivité, signe moins devant une parenthèse, double distributivité, facteur commun, identités remarquables, et l'équation produit nul — la raison d'être de la factorisation. Une terrasse, un cadre photo, un programme de calcul.",
  },
  "maths/seconde/identites-remarquables-2de": {
    titre: "Les identités remarquables : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : développer et factoriser avec les trois identités, calculer de tête, faire apparaître puis disparaître une racine, résoudre. Deux preuves : deux impairs consécutifs, et la racine chassée du dénominateur.",
  },
  "maths/seconde/expressions-litterales-2de": {
    titre: "Les expressions littérales : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : traduire, réduire, remplacer une lettre par un nombre négatif, isoler une lettre dans une formule, programmes de calcul. Prouver avec une lettre, réfuter par un contre-exemple. Un tour de magie, le carré du calendrier, la TVA à La Réunion.",
  },
  "maths/seconde/equations-inequations-1er-degre": {
    titre: "Équations et inéquations : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : résoudre, diviser par un négatif, écrire les solutions en intervalle et les voir sur une droite graduée, aucune solution ou tous les nombres, comparer par la différence ou le quotient. Le marché de Saint-Paul, le froid au Piton des Neiges, une course à rattraper.",
  },
  "maths/seconde/arithmetique-entiers": {
    titre: "Multiples, diviseurs, pair et impair : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : diviseurs, pair et impair, critères de divisibilité, fractions irréductibles, et deux démonstrations avec une lettre. Des bouquets, des bus, un carrelage, un vélo, et les cigales de 13 et de 17 ans.",
  },
  "maths/seconde/reels-intervalles": {
    titre: "Nombres réels, intervalles et valeur absolue : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : ensembles de nombres, droite graduée, intervalles écrits et dessinés, encadrements, valeur absolue et distance, |x − a| ≤ r. Les deux preuves du programme (1/3 n'est pas décimal, √2 est irrationnel), une pièce à 0,2 mm près, la marge d'erreur d'un sondage.",
  },
  // ⭐ LE BLOC « FONCTIONS » DE SECONDE (21/09/2026, le soir) — Frédéric : « on
  // fait toutes les fiches de fonctions secondes », « fiches exercices », puis
  // les vidéos. Des exemples concrets pris dans le monde.
  "maths/seconde/fonction-vocabulaire-2de": {
    titre: "Image, antécédent et courbe : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : image, antécédents (deux, un ou aucun), domaine de définition, lire une courbe, résoudre graphiquement, comparer deux courbes. Un plongeon de 10 mètres, des panneaux solaires, la distance de freinage, le CO₂ de l'atmosphère.",
  },
  // ⭐ 12/10/2026 : la notion « Analyse graphique » (coach + paysage
  // https://youtu.be/YpVjGHxNKZI), puis sa feuille — Frédéric : « faut générer
  // la fiche d'exercices ». Tout se lit sur une courbe.
  "maths/seconde/analyse-graphique-2de": {
    titre: "Analyse graphique d'une fonction : 20 exercices corrigés",
    resume:
      "Tout se lit sur une courbe : image, antécédents, équations et inéquations résolues graphiquement, tableau de signes, tableau de variations. Les deux pièges nommés (le mauvais axe, zéros ou sommets). Un food-truck, la marée à Saint-Malo, une maison solaire, une crue, le compte d'un étudiant. Chaque corrigé dresse son tableau.",
  },
  "maths/seconde/fonction-variations-extremums": {
    titre: "Variations et extremums : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : dresser un tableau de variations depuis une courbe, comparer sans calculer, démontrer un sens de variation, trouver un maximum, compter les solutions. Une crue, le 100 m de Usain Bolt, un potager, une éolienne, la distance de la Terre au Soleil.",
  },
  "maths/seconde/signes-expression-2de": {
    titre: "Le signe d'une expression : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : signe de ax + b, tableau de signes d'un produit et d'un quotient, valeur interdite et double barre, équations produit nul, inéquations. Un maraîcher, une transformation au rugby, un médicament, une salle de sport, un parapentiste. Chaque corrigé dresse son tableau.",
  },
  "maths/seconde/fonctions-affines-2de": {
    titre: "Les fonctions affines : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : reconnaître a et b, calculer une image, lire une droite, trouver l'expression par deux points, droites parallèles, signe de ax + b. Les degrés Fahrenheit, l'eau qui bout à 84 °C au mont Blanc, l'orage, une facture d'électricité, des vélos en libre-service.",
  },
  "maths/seconde/fonctions-reference-2de": {
    titre: "Les fonctions de référence : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : carré, inverse, racine carrée, cube et valeur absolue. Calculer, lire une courbe, résoudre, comparer et encadrer sans calculatrice. Un gouffre mesuré au chronomètre, le marathon sous les 2 heures, la masse d'une baleine, un refuge de montagne.",
  },
  // ⭐ LE BLOC « GÉOMÉTRIE » DE SECONDE (23/09/2026) — Frédéric : « je préfère
  // finir les fiches d'exercices de seconde ». Les vecteurs d'abord : le
  // contrôle commun de mars 2025 les demande sans repère.
  "maths/seconde/vecteurs-plan": {
    titre: "Les vecteurs du plan : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : vecteurs égaux et opposés, coordonnées et norme, Chasles sans repère et le piège de la soustraction, placer un point, parallélogramme, colinéarité et alignement. Un bac dérivé par le courant, une randonnée et son drone, deux chevaux qui tirent un tronc, une rangée de vigne.",
  },
  "maths/seconde/repere-coordonnees": {
    titre: "Repère et coordonnées : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : lire et placer un point, milieu, distance, puis prouver avec — parallélogramme, rectangle, losange, carré, triangle rectangle, points sur un cercle. Un plan de ville, un terrain de football, trois antennes qui retrouvent un téléphone, un pré relevé au GPS.",
  },
  // ⛔ Clé = le notionId du coach (`statistiques_descriptives`) ; la fiche de
  // cours est rangée sous `statistiques-descriptives-2de`, d'où `aussiPour`.
  "maths/seconde/statistiques-descriptives": {
    titre: "Les statistiques descriptives : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : fréquences, moyenne simple et pondérée, médiane et quartiles, diagramme en boîte, écart interquartile, écart type. Deux archers, un bulletin à coefficients, un PDG dans la moyenne des salaires, deux climats de même moyenne que tout oppose, une machine à paquets de pâtes.",
    aussiPour: ["statistiques-descriptives-2de"],
  },
  // ⭐ LA PREMIÈRE SANS FICHE DE COURS (23/09/2026) — Frédéric : « on fait
  // toutes les fiches d'exercices d'abord » ; le rappel de chaque niveau porte
  // le cours utile.
  "maths/seconde/droites-plan": {
    titre: "Les droites du plan : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : équation réduite, droite verticale, équation cartésienne, vecteur directeur, parallèles, intersection, systèmes. Deux randonneurs qui se croisent, la billetterie d'un concert, le point d'équilibre d'un triangle, un bateau qui évite un rocher. Chaque corrigé dessine ses droites.",
  },
  "maths/seconde/geometrie-problemes-plan": {
    titre: "Problèmes de géométrie plane : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : sinus, cosinus et tangente, cos² + sin² = 1, projeté orthogonal et distance à une droite, aires, un maximum à trouver. La hauteur d'un arbre, la pente d'un col du Tour de France, un enclos le long d'une rivière, le chemin le plus court jusqu'à un phare.",
  },
  "maths/seconde/probabilites-ensemble-fini": {
    titre: "Les probabilités : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : univers et événements, loi de probabilité, contraire, réunion et intersection, P(A ∪ B), arbres et tableaux. Un digicode, les mois de naissance d'un groupe d'amis, la roulette du casino, les groupes sanguins. Chaque corrigé a son schéma : dé, roue, urne, tableau ou arbre.",
  },
  "maths/seconde/echantillonnage-simulation": {
    titre: "Échantillonnage et simulation : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : fluctuation, intervalle p ± 1/√n, loi des grands nombres, simulation en Python, estimer une probabilité. Un sondage à 48 contre 52, les naissances de garçons, π trouvé au hasard, les truites d'un lac comptées par capture-recapture.",
  },
  "maths/seconde/probabilites-conditionnelles-2de": {
    titre: "Les probabilités conditionnelles : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : tableau croisé, probabilité sachant, arbre pondéré, somme des chemins, et ne pas confondre « B sachant A » et « A sachant B ». Un test de dépistage positif, trois machines et leur contrôle qualité, une application météo, un filtre anti-spam.",
  },
  "maths/seconde/logique-ensembles": {
    titre: "Ensembles et logique : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : appartenance, inclusion, réunion, intersection, complémentaire, « et » et « ou », négation, contre-exemple, implication, réciproque, équivalence. Le feu rouge, les conditions d'une aide, la formule d'Euler qui se trompe à 40, un aquarium pour deux espèces. Diagrammes de Venn et intervalles dessinés.",
  },
  "maths/seconde/algorithmique-python-2de": {
    titre: "Algorithmique et Python : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : affectation, types, conditions, boucles for et while, fonctions, simulation. Chaque corrigé montre la trace du programme, tour après tour. Un placement à 4 %, le CO₂ de l'atmosphère, un dé lancé dix mille fois, la conjecture de Syracuse, la racine de 2 pas à pas.",
  },
  // ⭐ LA 4e (25/09/2026) — Frédéric : « on va faire toutes les fiches
  // exercices de 4eme, normalement le coach est robuste ». Dans l'ordre du coach.
  "maths/4e/algo-programmation": {
    titre: "Algorithmique et programmation : 20 exercices corrigés",
    resume:
      "Suivre un programme Scratch, variables, conditions vraies ou fausses, si… alors… sinon, boucles et le lutin qui trace. Problèmes : le comptage des hirondelles, la monnaie rendue, le pass ou le ticket, l'escalier du lutin. Trace des variables dans chaque corrigé.",
  },
  "maths/4e/relatif-operation": {
    titre: "Nombres relatifs : 20 exercices corrigés",
    resume:
      "Multiplier et diviser des relatifs avec la règle des signes, compter les facteurs négatifs, respecter les priorités et le trait de fraction, les additions de 5e en rappel. Un sous-marin, un quiz, un programme de calcul, l'air qui se refroidit en altitude, le compte d'un club de VTT, un jeu de cartes, un glacier qui fond. Un dessin dans chaque corrigé.",
  },
  "maths/4e/fraction-nombre": {
    titre: "Fractions et nombres rationnels : 20 exercices corrigés",
    resume:
      "Fractions égales, simplifier jusqu'à l'irréductible, passer de la fraction au décimal et retour, reconnaître un nombre rationnel, comparer et ranger des fractions, négatifs compris. Problèmes : les lancers francs, l'échappée du Tour, les braquets du vélo, qui vient le plus à vélo ? Un dessin dans chaque corrigé.",
  },
  "maths/4e/fraction-calcul": {
    titre: "Calculer avec les fractions : 20 exercices corrigés",
    resume:
      "Additionner et soustraire avec des nombres négatifs, multiplier, prendre une fraction d'une quantité, l'opposé et l'inverse sans les confondre, diviser par une fraction, et les priorités. Problèmes : la batterie du vélo, l'eau douce de la Terre, un programme de calcul, la citerne à deux pompes. Un schéma dans chaque corrigé.",
  },
  "maths/4e/puissance-ecriture": {
    titre: "Puissances et notation scientifique : 20 exercices corrigés",
    resume:
      "Écrire et calculer une puissance, (−3)⁴ contre −3⁴, l'exposant négatif qui donne un inverse, les puissances de 10, la notation scientifique, comparer et ranger, calculer en écrivant les puissances en clair — et pourquoi (2 + 3)² n'est pas 2² + 3². Problèmes : un parc éolien, une piscine olympique en gouttes d'eau, le poids des animaux, le tableau de Roland-Garros.",
  },
  "maths/4e/reperage": {
    titre: "Se repérer sur une droite, dans le plan, sur la Terre : 20 exercices corrigés",
    resume:
      "Lire et placer une abscisse, même fractionnaire, lire et placer un point dans un repère (l'axe des ordonnées monte), symétriques et milieu, trois coordonnées dans un pavé, latitude et longitude — une course d'orientation, les records de température de la planète, le Rubik's Cube, les toits des continents.",
  },
  "maths/4e/divisibilite": {
    titre: "Multiples, diviseurs et division euclidienne : 20 exercices corrigés",
    resume:
      "Multiples et diviseurs, critères par 2, 3, 5, 9 et 10, division euclidienne posée, diviseurs par paires — puis le calendrier, les cars d'une sortie, deux coureurs sur une piste, les cigales de 13 ans, la chaîne d'un vélo, des panneaux solaires et le panier d'œufs d'Ibn al-Haytham.",
  },
  "maths/4e/nombre-premier": {
    titre: "Nombres premiers et décomposition : 20 exercices corrigés",
    resume:
      "La liste jusqu'à 30, décider jusqu'à 100 sans tout essayer, décomposer avec une échelle ou un arbre, simplifier une fraction, compter les diviseurs. Problèmes : les cigales à cycle premier, la photo du Tour de France, les vitesses du vélo, le cadenas des sites Internet.",
  },
  "maths/4e/ordre-grandeur": {
    titre: "Ordres de grandeur et préfixes : 20 exercices corrigés",
    resume:
      "Nano, micro, milli, kilo, méga, giga : convertir avec un préfixe, donner l'ordre de grandeur d'un objet ou d'un nombre, estimer un produit ou un quotient, juger un résultat annoncé et retrouver le facteur perdu. Problèmes : le système solaire dans la cour, un fil d'une nanoseconde, les arbres de la Terre, les gouttes d'un bassin olympique. Chaque grandeur placée sur une échelle des puissances de dix.",
  },
  "maths/4e/prop-proportionnalite": {
    titre: "Proportionnalité : 20 exercices corrigés",
    resume:
      "Reconnaître la proportionnalité dans un tableau ou sur un graphique, le coefficient et le retour à l'unité, la quatrième proportionnelle par le produit en croix. Une imprimante 3D, un ressort, une trailleuse, la pâte à pain, les ombres au soleil, des panneaux solaires, des pompes qui vident un bassin. Un dessin dans chaque corrigé.",
  },
  // ⭐ 02/10/2026 : « Ratios, partages et pourcentages » devient deux feuilles,
  // comme le coach (l'ancienne adresse redirige vers les pourcentages).
  "maths/4e/prop-ratio": {
    titre: "Ratios : 20 exercices corrigés",
    resume:
      "Écrire et simplifier un ratio, le traduire par une égalité de quotients, utiliser un ratio à trois termes, partager une quantité en deux ou trois parts. Puis les défis : retrouver les parts à partir d'un écart, enchaîner deux ratios, ajouter une quantité pour atteindre un nouveau ratio. Un triathlon, des flamants et des hérons, un compost, une prairie fleurie, le braquet d'un vélo, l'eau et ses atomes.",
  },
  "maths/4e/prop-pourcentages": {
    titre: "Pourcentages : 20 exercices corrigés",
    resume:
      "Calculer de tête 10 %, 20 %, 30 %, 5 %, 100 % et 200 % en partant de 10 %, prendre un pourcentage, écrire une part en pourcentage et retrouver le tout ; passer par le coefficient multiplicateur, calculer un taux d'évolution, remonter à la valeur de départ, enchaîner deux évolutions. Le CO₂ de l'air, le déclin des animaux sauvages, une course solidaire, une voiture qui perd de sa valeur, des promotions sur le chocolat.",
  },
  "maths/4e/prop-echelle": {
    titre: "Échelles, agrandissements et réductions : 20 exercices corrigés",
    resume:
      "Lire une échelle, passer de la carte au terrain et du terrain au plan en convertissant, retrouver une échelle ou un rapport, puis pourquoi doubler les longueurs quadruple l'aire et multiplie le volume par huit. Problèmes : le marathon au bout d'une ficelle, le bassin olympique, les grêlons, la forêt amazonienne sur la carte. Un dessin à l'échelle dans chaque corrigé.",
  },
  "maths/4e/litteral-expression": {
    titre: "Expressions littérales : 20 exercices corrigés",
    resume:
      "Lire les termes et les coefficients, écrire sans le signe ×, traduire une phrase, remplacer la lettre par un nombre, réduire (les x², les x, les nombres). Problèmes : le cœur du sportif, des carrés en allumettes, trois entiers qui se suivent, l'eau de la douche. Un dessin dans chaque corrigé : rectangle à l'échelle, tuiles d'algèbre, tableau.",
  },
  "maths/4e/pythagore-theoreme": {
    titre: "Le théorème de Pythagore et sa réciproque : 20 exercices corrigés",
    resume:
      "Carrés et racines carrées, repérer l'hypoténuse, calculer une longueur avec un arrondi, prouver qu'un triangle est rectangle — ou qu'il ne l'est pas — et rédiger. La feuille A4, la voile d'un dériveur, la terrasse d'un maçon, un court de tennis, une tente de bivouac, une valise cabine. Chaque triangle dessiné à l'échelle.",
  },
  "maths/4e/trigo-cosinus": {
    titre: "Le cosinus dans le triangle rectangle : 20 exercices corrigés",
    resume:
      "Repérer l'hypoténuse et le côté adjacent, écrire le cosinus, calculer une longueur puis un angle avec cos⁻¹ — un télésiège, des panneaux solaires, le funiculaire de Montmartre, un voilier, la rotation de la Terre. Chaque triangle dessiné à l'échelle.",
  },
  "maths/4e/vision-espace": {
    titre: "Solides et représentations : 20 exercices corrigés",
    resume:
      "Nommer un solide posé de travers, compter faces, arêtes et sommets, lire les vues d'un empilement de cubes, plier un patron de cube, lire une perspective cavalière, trouver la forme d'une section. Le cristal de quartz, le silo à grain, la piscine, le podium. Un solide dessiné dans chaque corrigé.",
  },
  "maths/4e/equation-resolution": {
    titre: "Résoudre une équation : 20 exercices corrigés",
    resume:
      "Reconnaître, traduire, résoudre en un ou deux gestes, réduire, développer, x des deux côtés, vérifier, et mettre en équation : un terrain de foot, électrique ou essence, le CO₂ de l'air, un marathon en relais. La balance dessinée à chaque étape.",
  },
  "maths/4e/thales-theoreme": {
    titre: "Le théorème de Thalès : 20 exercices corrigés",
    resume:
      "Écrire les trois rapports, calculer une longueur, remplir le tableau de proportionnalité, prouver un parallélisme par la réciproque, et des problèmes réels : une tente, le service au tennis, la montée des eaux, l'éclipse. Chaque figure dessinée à l'échelle.",
  },
  "maths/4e/quadrilatere-parallelogramme": {
    titre: "Le parallélogramme : 20 exercices corrigés",
    resume:
      "Côtés, angles et diagonales, démontrer qu'un quadrilatère est un parallélogramme, rectangle, losange, carré, aire base × hauteur. Une lampe d'architecte, un parking en épi, le « losange » du baseball, le drapeau du Brésil. Chaque figure dessinée à l'échelle.",
  },
  "maths/4e/grandeur-composee": {
    titre: "Grandeurs composées et unités : 20 exercices corrigés",
    resume:
      "Grandeur produit (kWh, volume d'une douche) et grandeur quotient (vitesse, prix au kilo, masse volumique), lire et écrire une unité composée, convertir longueurs, aires et m/s en km/h, contrôler un résultat par son unité. La barge rousse qui vole onze jours sans se poser, le Rhône et nos robinets, le corps humain à 100 W, le record de l'heure. Un schéma dans chaque corrigé.",
  },
  "maths/4e/proba-experience": {
    titre: "Les probabilités : 20 exercices corrigés",
    resume:
      "Issues et événements, équiprobabilité, probabilité en fraction, décimal et pourcentage, événement contraire, comparer deux chances — les océans de la Terre, les espèces menacées, la Coupe du monde 2026. Urnes, roues et échelle des probabilités dessinées.",
  },
  "maths/4e/sym-transformation": {
    titre: "Les transformations : 20 exercices corrigés",
    resume:
      "Symétrie axiale (axe oblique compris), symétrie centrale, translation, rotation, puis ce qu'elles conservent pour justifier et calculer : Tetris, le cavalier des échecs, un cerf-volant, un terrain de handball, la grande roue, un flocon. Chaque image construite sur quadrillage.",
  },
  "maths/4e/stat-donnee": {
    titre: "Lire et interpréter des données : 20 exercices corrigés",
    resume:
      "Lire un tableau, même à double entrée, lire un diagramme en barres ou en bâtons sur un axe gradué (et se méfier d'un axe tronqué), compter des effectifs, calculer une fréquence en fraction, en décimal et en pourcentage, passer d'un pourcentage à un effectif. Le palmarès du tennis, les départements de France, l'électricité du pays, les 206 os du squelette, les groupes sanguins et les 88 touches du piano.",
  },
  "maths/4e/stat-statistique": {
    titre: "Moyenne, médiane, étendue : 20 exercices corrigés",
    resume:
      "Moyenne simple et pondérée (avec des effectifs, avec des nombres négatifs), médiane en rangeant d'abord (effectif pair ou impair, effectifs cumulés), étendue, valeur manquante, moyenne de deux classes, choisir entre moyenne et médiane. Des ruches, des maisons, le covoiturage, des panneaux solaires, des cigognes, les huit planètes. La série rangée et les diagrammes dessinés dans chaque corrigé.",
  },
  "maths/4e/aire-perimetre": {
    titre: "Périmètres : 20 exercices corrigés",
    resume:
      "Rectangle, carré, triangle, remonter à un côté, unités, figures composées sans les côtés cachés, Pythagore pour le côté manquant — le terrain de football, le court de tennis, le flocon de von Koch, la clôture d'un pré. Chaque figure dessinée et cotée.",
  },
  "maths/4e/aire-surface": {
    titre: "Les aires : 20 exercices corrigés",
    resume:
      "Compter des carreaux sans compter le tour, la vraie hauteur d'un triangle et d'un parallélogramme, remonter de l'aire à un côté, découper une figure composée. Un terrain de basket, un toit sous la pluie, un parking en épi, un champ à partager. Chaque figure dessinée et découpée.",
  },
  "maths/4e/triangle-figure": {
    titre: "Le triangle pour démontrer : 20 exercices corrigés",
    resume:
      "Somme des angles, inégalité triangulaire, hauteur, médiatrice et médiane, les trois cas d'égalité, triangles semblables, protocole de construction. Problèmes : la largeur d'une rivière, l'ombre de l'obélisque, une ferme de charpente, une course d'orientation. Chaque triangle dessiné à l'échelle.",
  },
  // ⛔ En 4e, AUCUNE formule d'identité (Frédéric, 25/09 : « (x+2)² =
  // (x+2)(x+2) puis on distribue ») : les trois identités sont un objectif de 3e.
  "maths/4e/litteral-identite-remarquable": {
    titre: "Développer un carré : 20 exercices corrigés",
    resume:
      "Écrire un carré comme un produit, faire les quatre produits, réduire : voir pourquoi les termes du milieu s'ajoutent ou s'annulent, sans formule à apprendre. Le tapis de judo, le jeu de go, la réserve qui s'agrandit de 10 %. Le carré découpé en quatre morceaux dessiné dans les corrigés.",
  },
  "maths/4e/litteral-factorisation": {
    titre: "La factorisation : 20 exercices corrigés",
    resume:
      "Repérer le plus grand facteur commun (un nombre, une lettre ou les deux), factoriser le plus possible, avec trois termes ou après avoir réduit, et toujours vérifier en redéveloppant. Du calcul mental (17 × 23 + 17 × 77), les maillots d'un club de basket, l'aire d'un rectangle, des périmètres de polygones réguliers, une fresque, trois nombres qui se suivent, un jardin agrandi et un relais solidaire.",
  },
  "maths/4e/litteral-distributivite": {
    titre: "La distributivité : 20 exercices corrigés",
    resume:
      "Développer avec un facteur puis avec deux parenthèses, réduire, reconnaître un produit, démasquer les erreurs — un terrain de foot agrandi, les degrés Fahrenheit, une semaine d'entraînement, le carré du calendrier. Le modèle des aires dessiné dans les corrigés.",
  },
  // ⭐ LA PREMIÈRE (15/09/2026) — écrite pour la fille de Frédéric, en 1re, qui
  // teste ce soir. Le verdict est pour demain.
  "maths/premiere-spe/exponentielle": {
    titre: "L'exponentielle : 20 exercices corrigés",
    resume:
      "Du geste seul au problème de contrôle : calculer, résoudre, dériver, étudier. Un rappel de cours avant chaque niveau, et chaque corrigé étape par étape.",
    // Le cours est en deux parties, la feuille couvre les deux.
    aussiPour: ["exponentielle-etude"],
  },
  "maths/premiere-spe/suites": {
    titre: "Les suites numériques : 20 exercices corrigés",
    resume:
      "Du calcul d'un terme au problème de contrôle : montrer qu'une suite est arithmétique ou géométrique, sens de variation, sommes, taux d'évolution, seuil, et la suite auxiliaire qui ramène tout à une géométrique.",
  },
  // ⭐ 12/10/2026 : la notion « Analyse graphique » de première spé (même
  // moteur que la seconde), puis sa feuille — Frédéric : « fais les deux ».
  "maths/premiere-spe/analyse-graphique-1s": {
    titre: "Analyse graphique d'une fonction : 20 exercices corrigés",
    resume:
      "Tout se lit sur une courbe, un cran au-dessus de la seconde : trois sommets, un zéro qui ne change pas le signe, des solutions isolées, le nombre de solutions selon k, un tableau de signes déduit du tableau de variations, et le signe d'une vitesse qui annonce la dérivée. Un artisan, une montgolfière, le solde commercial d'un pays, un barrage.",
  },
  "maths/premiere-spe/variations-fonctions": {
    titre: "Les variations d'une fonction : 20 exercices corrigés",
    resume:
      "Du signe de la dérivée au problème d'optimisation : dresser un tableau, justifier un extremum, lire la courbe de f′, comparer deux courbes, démontrer une inégalité, mettre en équation une boîte ou un enclos. Un rappel de cours avant chaque niveau.",
  },
  "maths/premiere-spe/second-degre": {
    titre: "Le second degré : 20 exercices corrigés",
    resume:
      "Du discriminant seul au problème de contrôle : résoudre, factoriser, forme canonique, signe et inéquations, ballon, enclos, paramètre m. Un rappel de cours avant chaque niveau.",
  },
  // 26/09/2026 — la seule feuille de 1re spé sans fiche de cours (pas encore).
  "maths/premiere-spe/trigonometrie": {
    titre: "La trigonométrie : 20 exercices corrigés",
    resume:
      "Du radian au problème de contrôle : placer un point, lire cosinus et sinus, angles associés, grands réels, cos x = a, les deux démonstrations du programme, la grande roue, la marée, et π approché comme Archimède. Le cercle dessiné dans les corrigés.",
  },
  // ⭐ LA DÉRIVATION, UNE FEUILLE PAR CLASSE (28/09/2026) — Frédéric : « scinder
  // en plusieurs parties la notion dérivation de première spé comme la première,
  // et après faire les fiches d'exercices pour les 2 classes ». Le coach a quatre
  // notions en spé, six en première ; chaque classe a UNE feuille, que le bouton
  // « Exercices » ouvre depuis chacune de ses notions (`notionsCoach`).
  "maths/premiere-spe/derivation": {
    titre: "La dérivation : 20 exercices corrigés",
    resume:
      "Du taux de variation au problème de contrôle : nombre dérivé par la définition, lecture d'une tangente, équation de la tangente, dérivées usuelles, somme, produit, quotient, g(ax + b), valeur absolue. Une pierre qui tombe d'une falaise, le coût d'une planche de skate de plus, un médicament dans le sang. Courbes et tangentes dessinées dans les corrigés.",
    notionsCoach: ["derivation_nombre_derive", "derivation_tangente", "derivation_formules", "derivation_operations"],
  },
  // ⭐ LES SIX DERNIÈRES FEUILLES DE 1re SPÉ (29/09/2026) — une par notion,
  // chaque exercice avec son dessin (« n'oublie pas les canvas »).
  "maths/premiere-spe/produit-scalaire": {
    titre: "Calcul vectoriel et produit scalaire : 20 exercices corrigés",
    resume:
      "Du geste seul au problème de contrôle : projection, normes et angle, coordonnées, orthogonalité, Al-Kashi et sa démonstration, l'ensemble des points M tels que MA·MB = 0. Travail d'une force sur une luge, voile, panneau solaire, radar, téléski. Vecteurs et projetés dessinés.",
  },
  "maths/premiere-spe/geometrie-reperee": {
    titre: "Géométrie repérée : 20 exercices corrigés",
    resume:
      "Du geste seul au problème de contrôle : vecteur normal, équations de droites, projeté orthogonal, cercles et tangente, parabole. Médiatrice, nageur, arroseur, radar, laser et miroir. Droites, cercles et projetés dessinés dans les corrigés.",
  },
  "maths/premiere-spe/probabilites-conditionnelles": {
    titre: "Probabilités conditionnelles et indépendance : 20 exercices corrigés",
    resume:
      "Du geste seul au problème de contrôle : tableau croisé, arbre pondéré, partition, formule des probabilités totales, faux positifs, indépendance démontrée, deux épreuves indépendantes, le jeu des trois portes. Les chemins utiles en orange sur les arbres.",
  },
  "maths/premiere-spe/variables-aleatoires": {
    titre: "Variables aléatoires réelles : 20 exercices corrigés",
    resume:
      "Du geste seul au problème de contrôle : loi, espérance, variance, écart type, jeu équitable, E(aX + b), simulation en Python et moyenne d'un échantillon, capture-recapture. L'espérance marquée en rouge sur la droite graduée.",
  },
  "maths/premiere-spe/algorithmique": {
    titre: "Algorithmique et programmation : 20 exercices corrigés",
    resume:
      "Du geste seul au problème de contrôle : affectation, listes (ajouts, compréhension, parcours), fonctions qui renvoient une valeur, boucle de seuil sur une suite, simulation d'un jeu, méthodes d'Euler et de Newton. Chaque corrigé montre la trace du programme ou la liste dessinée case par case.",
  },
  "maths/premiere-spe/logique-ensembles": {
    titre: "Vocabulaire ensembliste et logique : 20 exercices corrigés",
    resume:
      "Du geste seul au problème de contrôle : ensembles et couples, « et » et « ou », quantificateurs et leur négation, implication, réciproque, contraposée, conditions nécessaires et suffisantes, raisonnement par l'absurde. Diagrammes de Venn, intervalles, tableaux de vérité et courbes contre-exemples.",
  },
  // ⭐ LES FEUILLES DE TERMINALE SPÉ (29-30/09/2026) — une par notion du coach,
  // dans son ordre, au niveau du bac ; un dessin par exercice. Sans fiche de
  // cours pour l'instant (Frédéric : les feuilles d'exercices d'abord, partout).
  "maths/terminale-spe/suite-numerique": {
    titre: "Suites et récurrence : 20 exercices corrigés",
    resume:
      "Raisonnement par récurrence (sommes, divisibilité, l'hérédité sans initialisation), variations d'une suite, suites majorées, minorées, bornées, u(n) = f(n) contre u(n+1) = f(u(n)). Les tours de Hanoï, deux villes qui grandissent, les poissons d'une réserve, deux offres d'emploi.",
  },
  "maths/terminale-spe/limite-suite": {
    titre: "Limites de suites : 20 exercices corrigés",
    resume:
      "Limites de référence, suites géométriques, formes indéterminées, comparaison et gendarmes, convergence monotone, l'inégalité de Bernoulli démontrée, boucle de seuil en Python. Les truites d'un bassin, la balle qui rebondit, le flocon de Koch. Les termes et leur limite dessinés dans chaque corrigé.",
  },
  "maths/terminale-spe/limite-fonction": {
    titre: "Limites de fonctions : 20 exercices corrigés",
    resume:
      "Limites en l'infini et en un point, à droite et à gauche, formes indéterminées, quantité conjuguée, comparaison, composées, asymptotes et position de la courbe. Plus vite que la lumière, une cuve d'eau salée, la lentille d'un appareil photo, une courbe en S.",
  },
  "maths/terminale-spe/continuite-tvi": {
    titre: "Continuité et valeurs intermédiaires : 20 exercices corrigés",
    resume:
      "Continuité, théorème des valeurs intermédiaires, corollaire de la bijection lu sur le tableau de variations, encadrement par balayage et par dichotomie en Python. Un prix d'équilibre, la jauge d'une cuve, un randonneur et son bivouac, un parachutiste.",
  },
  "maths/terminale-spe/derivation-fonction": {
    titre: "Dérivation et variations : 20 exercices corrigés",
    resume:
      "Dérivée d'une composée, variations, extremums, tangentes, études de fonctions complètes au niveau du bac. Un pic de pollution, le coût moyen le plus bas, la lampe au-dessus de la table, le pic d'audience d'une vidéo. Tableaux de variations et courbes dessinés.",
  },
  "maths/terminale-spe/convexite-fonction": {
    titre: "Convexité : 20 exercices corrigés",
    resume:
      "Dérivée seconde, fonctions convexes et concaves, point d'inflexion, position de la courbe par rapport à ses tangentes, inégalités de convexité. L'alcoolémie, la banque à 100 %, le câble entre deux pylônes, approcher ln 3 par les tangentes.",
  },
  "maths/terminale-spe/fonction-exponentielle": {
    titre: "Fonction exponentielle : 20 exercices corrigés",
    resume:
      "Équations et inéquations, limites et croissances comparées, dérivée de e puissance u, études de fonctions type bac. L'offre et la demande, la caféine dans le sang, des doses répétées, la croissance d'un arbre.",
  },
  "maths/terminale-spe/fonction-logarithme": {
    titre: "Fonction logarithme népérien : 20 exercices corrigés",
    resume:
      "Propriétés algébriques, équations et inéquations, limites, dérivée de ln u, seuils d'une suite géométrique. Le bénéfice d'un atelier, les oiseaux d'une réserve, e puissance π contre π puissance e, le bruit d'un atelier en décibels.",
  },
  "maths/terminale-spe/primitive-integrale": {
    titre: "Primitives et intégrales : 20 exercices corrigés",
    resume:
      "Primitives, intégrale et aire sous la courbe, linéarité, relation de Chasles, valeur moyenne, intégration par parties, suites d'intégrales. Calculer ln 2 avec un ordinateur, le volume d'une crue, mesurer les inégalités de revenus, la tension du secteur. Les aires hachurées sur les courbes.",
  },
  "maths/terminale-spe/denombrement-combinatoire": {
    titre: "Dénombrement et combinatoire : 20 exercices corrigés",
    resume:
      "Principe multiplicatif, k-uplets, arrangements, permutations, combinaisons, triangle de Pascal, parties d'un ensemble. Un tournoi, un jeu de tirage, la planche de Galton, le paradoxe des anniversaires. Arbres de choix et tableaux dans les corrigés.",
  },
  "maths/terminale-spe/geometrie-espace": {
    titre: "Vecteurs, droites et plans de l'espace : 20 exercices corrigés",
    resume:
      "Colinéarité, coplanarité, représentations paramétriques de droites, positions relatives, intersections. Les câbles d'un entrepôt, l'ombre d'un mât, un trépied, les deux équipes d'un tunnel. Cubes et repères dessinés en perspective.",
  },
  "maths/terminale-spe/produit-scalaire-espace": {
    titre: "Produit scalaire dans l'espace : 20 exercices corrigés",
    resume:
      "Produit scalaire et orthogonalité dans l'espace, vecteur normal et équation cartésienne d'un plan, projeté orthogonal sur une droite et sur un plan, distance à un plan, volume d'un tétraèdre. Les panneaux solaires d'un toit, un bloc de pierre, la conduite la plus courte, les haubans d'une antenne.",
  },
  "maths/terminale-spe/probabilite-conditionnelle": {
    titre: "Probabilités conditionnelles : 20 exercices corrigés",
    resume:
      "Arbres pondérés, probabilités totales, inversion du conditionnement, indépendance, succession d'épreuves, suites de probabilités. Un vaccin et les malades, un dé et deux urnes, répondre au hasard, un bit qui traverse des relais.",
  },
  "maths/terminale-spe/variable-aleatoire": {
    titre: "Sommes de variables aléatoires : 20 exercices corrigés",
    resume:
      "Linéarité de l'espérance, E(aX + b) et V(aX + b), variance d'une somme de variables indépendantes, échantillon et moyenne d'un échantillon. La file d'une caisse, une pièce puis un dé, la charge d'un ascenseur, mesurer plusieurs fois.",
  },
  "maths/terminale-spe/loi-binomiale": {
    titre: "Loi binomiale : 20 exercices corrigés",
    resume:
      "Schéma de Bernoulli, coefficients binomiaux, P(X = k), P(X ≤ k), espérance et variance, seuils « au moins une fois ». Répondre au hasard à un QCM, un parc d'éoliennes, deux ateliers, un avion en surréservation. Lois dessinées en barres.",
  },
  "maths/terminale-spe/algorithmique-python": {
    titre: "Algorithmique et Python : 20 exercices corrigés",
    resume:
      "Listes, fonctions, boucles de seuil, dichotomie, méthode d'Euler, aire par les rectangles, simulation. Un café qui refroidit, un contrôle qualité, une aire sans primitive, une rumeur au lycée. Chaque programme a sa trace ou sa sortie.",
  },
  "maths/terminale-spe/equation-differentielle": {
    titre: "Équations différentielles : 20 exercices corrigés",
    resume:
      "y' = ay, y' = ay + b, y' = ay + f avec une solution particulière, condition initiale, solutions vérifiées en dérivant. Une espèce réintroduite, une perfusion, l'heure d'un décès par le refroidissement, une maison sans chauffage.",
  },
  "maths/terminale-spe/concentration-echantillonnage": {
    titre: "Concentration et loi des grands nombres : 20 exercices corrigés",
    resume:
      "Inégalité de Bienaymé-Tchebychev, inégalité de concentration, loi des grands nombres, taille d'un échantillon, simulation en Python. La taille d'un sondage, une machine à café, pourquoi l'assurance tient, calculer π au hasard.",
  },
  // (La dérivation de première SANS spé a eu une feuille unique pour ses six
  //  notions le matin du 28/09 ; le soir, Frédéric : une feuille par notion.
  //  Les six sont plus bas, avec les autres chapitres de première. La feuille
  //  unique, jamais poussée, a été retirée.)
  // ⭐ LES AUTOMATISMES DE PREMIÈRE (28/09/2026) — Frédéric : « 1 feuille
  // d'exercice par notion comme d'habitude, même si cela prend du temps ».
  // Dix-huit feuilles, sans calculatrice, dans l'ordre du coach.
  "maths/premiere/auto-comparer": {
    titre: "Comparer deux nombres : 20 exercices corrigés",
    resume:
      "Sans calculatrice, comme à l'épreuve anticipée : comparer par la différence ou par le quotient, ranger des fractions, 3²⁰ contre 9⁹. Puis le prix au kilo, la densité de la France et de l'Allemagne, deux placements, deux remises, le budget d'une commune.",
  },
  "maths/premiere/auto-fractions-puissances": {
    titre: "Fractions et puissances : 20 exercices corrigés",
    resume:
      "Additionner, multiplier et diviser des fractions, appliquer les règles des puissances, passer d'une fraction à un décimal ou à un pourcentage, sans calculatrice. Budget d'un ménage, chômage, dépenses d'un État, loyer, TVA et soldes, pouvoir d'achat, croissance d'une ville.",
  },
  "maths/premiere/auto-ordres-unites": {
    titre: "Calcul mental, ordres de grandeur et unités : 20 exercices corrigés",
    resume:
      "Calculer de tête, estimer un ordre de grandeur, repérer un résultat impossible, convertir aires, volumes, durées et vitesses sur un tableau d'unités. Cartes et échelles, déchets d'une région, pluie sur un toit, montée des océans, salaire horaire, jours depuis la prise de la Bastille.",
  },
  "maths/premiere/auto-developper-factoriser": {
    titre: "Développer et factoriser : 20 exercices corrigés",
    resume:
      "Développer un produit, utiliser les identités remarquables, factoriser par un facteur commun ou par une identité, avec les développements dessinés comme des aires. Champ agrandi, recette d'un cinéma, pavage d'une place, « +10 % puis −10 % », allée d'un jardin, bénéfice d'un artisan.",
  },
  "maths/premiere/auto-equations": {
    titre: "Équations et inéquations : 20 exercices corrigés",
    resume:
      "Résoudre ax + b = cx + d, x² = a, a/x = b et une inéquation du premier degré, sans calculatrice ni discriminant, avec balances, droites graduées et graphiques. Location de voiture, prix d'équilibre, abonnement, altitude et gel, villes qui se rapprochent, taxi ou VTC.",
  },
  "maths/premiere/auto-signe-expression": {
    titre: "Le signe d'une expression : 20 exercices corrigés",
    resume:
      "Résoudre une équation produit nul, trouver le signe de ax + b, dresser le tableau de signes d'une expression factorisée, sans discriminant. Seuil de rentabilité d'une artisane, altitude du gel, solde commercial d'un pays, deux offres d'électricité, prix d'équilibre du marché des fraises.",
  },
  "maths/premiere/auto-formules": {
    titre: "Utiliser une formule : 20 exercices corrigés",
    resume:
      "Calculer la valeur d'une expression littérale, isoler une lettre dans une formule, faire une application numérique, sans calculatrice. TVA et prix hors taxes, salaire brut et net, intérêts simples, coût moyen, échelle d'une carte, densité de population, degrés Fahrenheit.",
  },
  "maths/premiere/auto-proportion": {
    titre: "Proportions et pourcentages : 20 exercices corrigés",
    resume:
      "Calculer une proportion, l'écrire en fraction, en décimal ou en pourcentage, prendre un pourcentage d'une quantité, sans calculatrice. Participation à une élection, budget d'un ménage, soldes, TVA, parité chez les cadres, empreinte carbone, vieillissement d'un pays.",
  },
  "maths/premiere/auto-partie-tout": {
    titre: "La partie et le tout : 20 exercices corrigés",
    resume:
      "Calculer une partie connaissant le tout, retrouver le tout connaissant une partie, prendre un pourcentage d'un pourcentage, sans calculatrice. Loyer et salaire, suffrages d'une élection, prix hors taxes, budget d'une commune, forêts protégées, chômage.",
  },
  "maths/premiere/auto-coefficient-multiplicateur": {
    titre: "Coefficient multiplicateur : 20 exercices corrigés",
    resume:
      "Traduire une hausse ou une baisse par un coefficient (+5 % → × 1,05 ; −80 % → × 0,2), calculer une valeur d'arrivée, retrouver une valeur de départ en divisant. Soldes, salaire et panier de courses, carburant, TVA, immobilier, exode rural, glacier, population mondiale.",
  },
  "maths/premiere/auto-taux-evolution": {
    titre: "Taux d'évolution : 20 exercices corrigés",
    resume:
      "Calculer un taux d'évolution, enchaîner des évolutions successives en multipliant les coefficients, trouver le taux réciproque, et voir pourquoi −10 % puis +10 % ne ramène pas au départ. Chômage en points ou en pour cent, pouvoir d'achat, soldes, bourse, trafic aérien, loyer, forêt.",
  },
  "maths/premiere/auto-lecture-graphique": {
    titre: "Lecture graphique : 20 exercices corrigés",
    resume:
      "Lire une image et des antécédents sur une courbe (deux, un ou aucun), estimer un seuil, repérer les unités et l'échelle de chaque axe, vérifier par le calcul qu'un point est sur une courbe. Bénéfice d'un artisan, loyer, location de vélos, profil de randonnée, climat d'une ville, barrage en sécheresse, débit d'un fleuve.",
  },
  "maths/premiere/auto-resolution-graphique": {
    titre: "Résolution graphique : 20 exercices corrigés",
    resume:
      "Résoudre graphiquement f(x) = k et f(x) < k, lire le signe d'une fonction, dresser son tableau de variations, dire si une croissance accélère ou ralentit. Bénéfice, placements, chômage, balance commerciale, ventes d'un jeu vidéo, station de ski, qualité de l'air, marée.",
  },
  "maths/premiere/auto-droites": {
    titre: "Droites et coefficient directeur : 20 exercices corrigés",
    resume:
      "Reconnaître une fonction affine ou linéaire, tracer une droite avec l'escalier du coefficient directeur, lire une équation réduite, calculer un coefficient directeur à partir de deux points. Taxis, kayaks, facture d'électricité, food-truck, glacier, montée des eaux, étape du Tour de France.",
  },
  "maths/premiere/auto-lire-statistiques": {
    titre: "Lire des graphiques statistiques : 20 exercices corrigés",
    resume:
      "Lire un diagramme en barres, en bâtons, circulaire ou un nuage de points, puis passer du graphique aux données et retour, sans calculatrice. Population par âge, élections municipales, sondage, salaires, loyers, mix électrique, budget d'un ménage, l'axe qui ne part pas de zéro.",
  },
  "maths/premiere/auto-indicateurs": {
    titre: "Moyenne, médiane, quartiles : 20 exercices corrigés",
    resume:
      "Calculer une moyenne (avec effectifs, avec classes), ranger la série pour trouver la médiane et les quartiles, lire et comparer des boîtes à moustaches, et dire ce que racontent les indicateurs, sans calculatrice. Salaires, loyers, patrimoine des ménages, temps de trajet, climat, dons à une association.",
  },
  "maths/premiere/auto-proba-base": {
    titre: "Probabilités : les bases : 20 exercices corrigés",
    resume:
      "Une probabilité entre 0 et 1, la somme des probabilités des issues, l'évènement contraire, les cas favorables quand tout est équiprobable, sans calculatrice. Dés, urnes et roue, puis population par âge, roulette, départements, jurés d'assises, retards de train et tombola.",
  },
  "maths/premiere/auto-proba-lecture": {
    titre: "Lire une probabilité dans un tableau ou un arbre : 20 exercices corrigés",
    resume:
      "Lire P(A ∩ B) dans un tableau croisé, lire une probabilité conditionnelle sur une ligne ou sur une branche d'arbre, et ne pas confondre P_A(B) et P_B(A), sans calculatrice. Vote par âge, emploi des diplômés, chômage des jeunes, fraude bancaire, retours d'achats en ligne, sondage et vote réel.",
  },
  // ⭐ LES AUTRES CHAPITRES DE PREMIÈRE, UNE FEUILLE PAR NOTION (28/09/2026) —
  // Frédéric : « beaucoup de canvas et de visuel, et d'application économie,
  // écologie, sport, nature », « et même de la physique et de l'histoire-géo ».
  // Dans l'ordre du coach : information chiffrée, aléatoire, linéaire,
  // quadratique, exponentielle, dérivation.
  "maths/premiere/info-tableau-croise": {
    titre: "Le tableau croisé : 20 exercices corrigés",
    resume:
      "Lire une case ou une marge, compléter un tableau croisé en commençant là où il ne manque qu'un nombre, le dresser à partir d'un énoncé, le vérifier dans les deux sens. Tri du verre, forêt, véhicules électriques, semi-marathon, exode rural d'un village, station de ski.",
  },
  "maths/premiere/info-frequences": {
    titre: "Fréquences marginales et conditionnelles : 20 exercices corrigés",
    resume:
      "Calculer une fréquence marginale ou conditionnelle en choisissant le bon dénominateur (« parmi les… »), comparer des groupes de tailles différentes, découvrir le paradoxe des deux engrais. Tribunes d'un stade, composteurs, capteurs de température, migrations, éoliennes.",
  },
  "maths/premiere/info-representations-croisees": {
    titre: "Représenter deux caractères : 20 exercices corrigés",
    resume:
      "Lire des barres groupées et empilées à 100 %, calculer les angles d'un diagramme circulaire ou semi-circulaire, choisir entre effectifs et pourcentages. Licences sportives, chauffage, mix électrique, hémicycle d'une assemblée, budget de deux familles.",
  },
  "maths/premiere/info-nuage": {
    titre: "Le nuage de points : 20 exercices corrigés",
    resume:
      "Lire les coordonnées d'un point, construire le nuage d'un tableau, décrire la tendance et repérer un point isolé, sans confondre lien et cause. Chênes, glaces et soleil, éolienne et vent, vitesse et consommation, recul d'un glacier, abeilles.",
  },
  "maths/premiere/info-point-moyen": {
    titre: "Le point moyen : 20 exercices corrigés",
    resume:
      "Calculer les coordonnées du point moyen, le placer, retrouver une donnée manquante, vérifier qu'une droite d'ajustement passe par lui. Tirs et buts, ressort, population d'une ville, niveau de la mer, éoliennes, forfaits mobiles.",
  },
  "maths/premiere/info-ajustement-affine": {
    titre: "Ajustement affine : 20 exercices corrigés",
    resume:
      "Juger si un nuage de points est assez rectiligne, trouver l'équation d'une droite d'ajustement par deux points, puis s'en servir pour calculer ou résoudre. Forêt, vélos partagés, panneaux solaires, pouls d'un coureur, ressort, exode rural, voiture électrique.",
  },
  "maths/premiere/info-interpoler-extrapoler": {
    titre: "Interpoler et extrapoler : 20 exercices corrigés",
    resume:
      "Situer une valeur dans la plage des données ou en dehors, l'estimer avec une droite d'ajustement, et reconnaître la prévision qui devient absurde. Température en montagne, glacier, population d'une ville, lynx, eau qui bout, niveau de la mer, date des vendanges.",
  },
  "maths/premiere/info-tableur": {
    titre: "Le tableur : 20 exercices corrigés",
    resume:
      "Lire une cellule, comprendre et écrire une formule (=B2*1,05, SOMME, MOYENNE), la recopier vers le bas, trouver un seuil dans une colonne, choisir le bon diagramme. Épargne, forêt, entraînement, énergie électrique, ville industrielle, tournoi, compteur d'eau.",
  },
  "maths/premiere/info-filtre-donnees": {
    titre: "Filtrer des données (ET, OU, NON) : 20 exercices corrigés",
    resume:
      "Filtrer un fichier sur un critère, combiner deux critères avec ET, OU, NON, et retrouver l'effectif dans un tableau croisé ou un diagramme de Venn. Randonnées, refuge animalier, club d'escalade, niveau sonore, élections, station de ski.",
  },
  "maths/premiere/alea-conditionnelle": {
    titre: "Probabilité conditionnelle : reconnaître : 20 exercices corrigés",
    resume:
      "Repérer « parmi » et « sachant que », écrire P_A(B) et la calculer dans un tableau croisé, sans confondre P_A(B) et P_B(A). Forêts, abeilles, festival, tirs au but, capteurs de laboratoire, exode rural, tortues marines.",
  },
  "maths/premiere/alea-conditionnelle-calcul": {
    titre: "Probabilité conditionnelle : calculer : 20 exercices corrigés",
    resume:
      "La formule P_A(B) = P(A ∩ B) / P(A) dans les trois sens, la phrase qui interprète, et le paradoxe des faux positifs. Dépistage, résistances électriques, choléra de Londres, incendies de forêt, iode 131, espérance de vie.",
  },
  "maths/premiere/alea-arbre": {
    titre: "Arbre pondéré : lire et construire : 20 exercices corrigés",
    resume:
      "Lire ce que porte chaque branche, compléter un arbre (somme 1 à chaque nœud), construire l'arbre d'un énoncé. Tri des déchets, signal binaire, migrations, rugby, glands de chêne, émigration du XIXᵉ siècle.",
  },
  "maths/premiere/alea-arbre-calcul": {
    titre: "Arbre pondéré : calculer : 20 exercices corrigés",
    resume:
      "Multiplier le long d'un chemin, additionner les chemins, passer de l'arbre au tableau croisé et retour. Détecteur de particules, élection à deux tours, biathlon, cigognes, radar routier, choléra de 1832, frelon asiatique.",
  },
  "maths/premiere/alea-independance": {
    titre: "Indépendance de deux évènements : 20 exercices corrigés",
    resume:
      "Reconnaître l'indépendance (P_B(A) = P(A)), utiliser le produit, la justifier par un calcul, la distinguer de l'incompatibilité. Lancers francs, circuit en série, vote par région, noyaux de radon, registres de mariage, pièges photographiques.",
  },
  "maths/premiere/alea-bernoulli": {
    titre: "Épreuves de Bernoulli : reconnaître : 20 exercices corrigés",
    resume:
      "Reconnaître une épreuve de Bernoulli et une répétition d'épreuves identiques et indépendantes, distinguer tirage avec et sans remise. Urnes, dés, carbone 14, sondage, météo, tortues marines, conscrits du XIXᵉ siècle.",
  },
  "maths/premiere/alea-bernoulli-calcul": {
    titre: "Répétition d'épreuves : calculer : 20 exercices corrigés",
    resume:
      "Arbre de 2 à 4 épreuves, probabilité d'un chemin, « exactement k succès » en comptant les chemins, « au moins un » par le contraire. Lancers francs, signal répété, élection, disettes médiévales, relais radio, éoliennes, tennis.",
  },
  "maths/premiere/lin-suite-arithmetique": {
    titre: "Suite arithmétique : reconnaître : 20 exercices corrigés",
    resume:
      "Reconnaître une suite arithmétique par ses écarts, trouver sa raison, écrire la relation de récurrence et calculer un terme de rang donné. Tirelire, forêt replantée, ruches, ligne de tramway, température et altitude, haies, salaires.",
  },
  "maths/premiere/lin-suite-terme-general": {
    titre: "Suite arithmétique : terme général : 20 exercices corrigés",
    resume:
      "Écrire uₙ = u₀ + nr, donner le sens de variation par le signe de la raison, dessiner les termes et interpréter un résultat. Petites lignes de train, hérissons, panneaux solaires, ressort, zone humide, 400 m, CO₂ d'une entreprise.",
  },
  "maths/premiere/lin-affine": {
    titre: "Fonction affine et taux d'accroissement : 20 exercices corrigés",
    resume:
      "Calculer un taux d'accroissement, retrouver f(x) = ax + b à partir de deux images, donner le sens de variation. Celsius et Fahrenheit, freinage, batterie, route de montagne, ville nouvelle, fréquence cardiaque, névé.",
  },
  "maths/premiere/lin-affine-lecture": {
    titre: "Fonction affine : lire et exploiter : 20 exercices corrigés",
    resume:
      "Tracer et lire une fonction affine, exploiter une fonction affine par morceaux (barème d'impôt, tarifs progressifs), trouver un point d'équilibre offre-demande. Plongée, carte au 1/25 000, périurbanisation, eau, déchets, vélos d'occasion.",
  },
  "maths/premiere/lin-modeliser": {
    titre: "Modéliser une croissance linéaire : 20 exercices corrigés",
    resume:
      "Reconnaître une croissance linéaire (quantité fixe, pas un pourcentage), choisir entre suite arithmétique et fonction affine, conclure avec l'unité. Covoiturage, piste cyclable, épargne, recul du trait de côte, mouvement uniforme, charge d'une batterie.",
  },
  "maths/premiere/lin-seuil": {
    titre: "Problème de seuil : croissance linéaire : 20 exercices corrigés",
    resume:
      "Trouver le premier rang qui franchit un seuil par le calcul, avec un tableau de valeurs ou sur un graphique où le seuil est une horizontale. Cagnotte, CO₂ d'un territoire, rivière en crue, rail qui se dilate, station de ski, ferme solaire.",
  },
  "maths/premiere/quad-parabole": {
    titre: "Parabole et expression de degré 2 : 20 exercices corrigés",
    resume:
      "Calculer une image, lire le rôle de a (sens et ouverture) et de c, lire les racines sur la courbe et les relier à la forme factorisée. Jet d'eau, arche de pont, dauphin, distance de freinage, trébuchet, chute sur Terre et sur la Lune, papillons d'un pré.",
  },
  "maths/premiere/quad-sommet-axe": {
    titre: "Parabole : sommet et axe de symétrie : 20 exercices corrigés",
    resume:
      "Trouver l'axe de symétrie et le sommet sans formule : au milieu des racines, par deux points de même hauteur ou sur une forme donnée, puis utiliser la symétrie. Plongeon, passe de volley, saut à ski, vallée glaciaire, voûte d'un tunnel, pont ferroviaire, prix d'un billet.",
  },
  "maths/premiere/quad-variations": {
    titre: "Parabole : variations et extremum : 20 exercices corrigés",
    resume:
      "Trouver le maximum ou le minimum d'une fonction de degré 2, dresser son tableau de variations, comparer deux images sans les calculer. Fusée à eau, chandelle au rugby, consommation d'une voiture, vol parabolique, zone de baignade, pêche durable.",
  },
  "maths/premiere/quad-racines-signe": {
    titre: "Racines et signe par la forme factorisée : 20 exercices corrigés",
    resume:
      "Lire les racines sur une forme factorisée, l'écrire connaissant les racines, la vérifier en développant, dresser le tableau de signes et résoudre une inéquation du second degré, sans discriminant. Gel au verger, crue d'une rivière, pont en arc, lob au football, trésorerie d'une jeune entreprise.",
  },
  "maths/premiere/expo-suite-geometrique": {
    titre: "Reconnaître une suite géométrique : 20 exercices corrigés",
    resume:
      "Reconnaître une suite géométrique par les quotients, écrire sa relation de récurrence, relier la raison à un taux d'évolution. Livret d'épargne, lumière sous l'eau, légende de l'échiquier, déchets, médicament, balle qui rebondit, oiseaux protégés.",
  },
  "maths/premiere/expo-suite-terme-general": {
    titre: "Suite géométrique, terme général : 20 exercices corrigés",
    resume:
      "Écrire uₙ = u₀ × qⁿ, trouver le sens de variation selon la raison, placer les points et interpréter un terme. Capital, condensateur, population mondiale, ville de l'ère industrielle, CO₂, nénuphars, café qui refroidit.",
  },
  "maths/premiere/expo-fonction": {
    titre: "La fonction exponentielle x ↦ aˣ : 20 exercices corrigés",
    resume:
      "Reconnaître une fonction x ↦ aˣ, calculer une image pour x non entier, utiliser aˣ⁺ʸ = aˣ × aʸ et l'exposant 1/n. Levures, médicament, population, polluant, taux mensuel, écran de plomb, exode rural.",
  },
  "maths/premiere/expo-fonction-lecture": {
    titre: "Fonction exponentielle, variations et courbe : 20 exercices corrigés",
    resume:
      "Trouver le sens de variation d'après la base, lire la courbe de x ↦ aˣ et résoudre aˣ = k graphiquement. Voiture, fréquence cardiaque, recensements, climat, pression en montagne, deux villes et l'exode rural, truites.",
  },
  "maths/premiere/expo-taux-moyen": {
    titre: "Le taux d'évolution moyen : 20 exercices corrigés",
    resume:
      "Trouver le taux moyen à partir d'une évolution globale, repasser au taux global, ne le confondre ni avec la moyenne des taux ni avec le taux global divisé par n. Chiffre d'affaires, population mondiale, 10 km, émissions, castors, inflation.",
  },
  "maths/premiere/expo-modeliser": {
    titre: "Modéliser une évolution exponentielle : 20 exercices corrigés",
    resume:
      "Reconnaître une croissance exponentielle, choisir entre modèle linéaire et exponentiel, les comparer, estimer des ordres de grandeur. Intérêts composés, Malthus, lapins d'Australie, loi de Moore, légende de l'échiquier, frelons, rumeur.",
  },
  "maths/premiere/expo-seuil": {
    titre: "Problème de seuil, croissance exponentielle : 20 exercices corrigés",
    resume:
      "Trouver quand une quantité franchit un seuil : en testant les rangs, dans un tableau, sur une courbe ; demi-vie et temps de doublement. Livret, iode 131, population mondiale, carbone 14, exode rural, règle de 72, glacier.",
  },
  // ⛔ Dérivation SANS spé : pas de discriminant, polynômes de degré 3 au plus,
  // ni produit ni quotient ; le signe de f′ se lit sur une forme factorisée
  // DONNÉE, qu'on vérifie en développant.
  "maths/premiere/der-graphique": {
    titre: "Lire un nombre dérivé sur un graphique : 20 exercices corrigés",
    resume:
      "Lire la pente d'une tangente, le signe du nombre dérivé, repérer une tangente horizontale, comparer deux vitesses, sans aucun calcul de dérivée. Une crue, la route d'un col, un village pendant l'exode rural, une voiture qui démarre, un thé qui refroidit, un marathon.",
  },
  "maths/premiere/der-nombre-derive": {
    titre: "Nombre dérivé et tangente : 20 exercices corrigés",
    resume:
      "Coefficient directeur d'une tangente par deux points, équation réduite, vitesse instantanée, valeur approchée, coût et recette marginaux. Une pierre qui tombe, un TGV, un glacier, le CO₂, un radiateur, une cuve d'eau de pluie.",
  },
  "maths/premiere/der-formules": {
    titre: "Les formules de base de la dérivée : 20 exercices corrigés",
    resume:
      "Dériver une constante, une fonction affine, le carré et le cube, puis calculer un nombre dérivé et le voir sur la tangente. Un train, deux abonnements, un glaçon qui fond, les billes de Galilée, les sécantes de Fermat, un enclos de moutons.",
  },
  "maths/premiere/der-polynome": {
    titre: "Dériver un polynôme : 20 exercices corrigés",
    resume:
      "Produit par un réel, somme, polynômes de degré 2 et 3, calcul de f′(a) et son sens. La chute libre, un four, un sentier de montagne, des cigognes, une épidémie, une ville nouvelle, une coopérative de confitures.",
  },
  "maths/premiere/der-signe": {
    titre: "Le signe de la dérivée : 20 exercices corrigés",
    resume:
      "Signe d'une forme affine, lecture sur la courbe de f′, vérifier une forme factorisée donnée en développant, puis dresser le tableau de signes. Un drone, une étape du Tour de France, un lac de barrage, des saumons, le climat d'une ville.",
  },
  "maths/premiere/der-variations": {
    titre: "Le tableau de variations : 20 exercices corrigés",
    resume:
      "Déduire les variations du signe de f′, dresser le tableau, trouver un maximum ou un minimum (bornes comprises), optimiser, prévoir. Un four, une plongeuse, un freinage, une étape du Tour, une épidémie, un festival, le gel des abricotiers.",
  },
  // ─── STMG : données, croisement de deux variables, échantillonnage (1re, 22/10/2026) ───
  "maths/stmg/donnees-tableau-croise": {
    titre: "Le tableau croisé d'effectifs : 20 exercices corrigés",
    resume:
      "Lire une case et une marge, calculer les marges, compléter un tableau, le dresser à partir de données brutes, trouver l'erreur. Clients d'une enseigne, salariés d'une PME, colis en retard, crédits d'une banque, festival ; le jeu de 52 cartes, les planètes, les régions de France, le calendrier 2026, les médailles de Paris 2024.",
  },
  "maths/stmg/donnees-frequences": {
    titre: "Fréquences marginales et conditionnelles : 20 exercices corrigés",
    resume:
      "Calculer une fréquence marginale et une fréquence conditionnelle (« parmi les … »), compléter un tableau à partir de pourcentages, comparer deux groupes, corriger une phrase de la presse. Publicité, assurance, recrutement, mutuelle, concession automobile ; l'ONU, les médailles de Paris 2024, le jeu de 52 cartes, le calendrier 2026.",
  },
  "maths/stmg/donnees-filtres": {
    titre: "Filtrer des données, ET, OU, NON : 20 exercices corrigés",
    resume:
      "Garder les lignes d'un fichier qui répondent à un critère, combiner deux critères avec ET et avec OU sans compter deux fois, prendre le contraire avec NON, sur un extrait de tableur ou un tableau croisé. Fichier du personnel, épicerie, logements, paiements par carte, fichier clients ; les planètes, les régions de France, le calendrier 2026.",
  },
  "maths/stmg/auto-donnees-graphiques": {
    titre: "Lire des données chiffrées et des graphiques : 20 exercices corrigés",
    resume:
      "Automatismes : origine et pas d'un axe, axe tronqué, diagramme en barres, en bâtons, circulaire, diagramme en boîte (médiane, quartiles), passer du graphique au tableau et inversement. Boulangerie, budget d'association, salaires, chiffre d'affaires, publicité trompeuse ; les régions de France, la Coupe du monde 2026, les plus hautes tours.",
  },
  "maths/stmg/va-echantillonnage": {
    titre: "La fluctuation d'échantillonnage : 20 exercices corrigés",
    resume:
      "Observer la fluctuation sur des simulations, calculer 1 ÷ √n et l'intervalle où tombent environ 95 % des fréquences, décider si une observation est fréquente ou rare, choisir la taille d'un échantillon. Contrôle qualité, sondages, banque, e-commerce ; le don du sang, les naissances, la présidentielle de 2022, la roulette du casino.",
  },
  // ─── STMG : séries statistiques à deux variables (Tle, 22/10/2026) ───
  "maths/stmg/stat-nuage": {
    titre: "Nuage de points et point moyen : 20 exercices corrigés",
    resume:
      "Lire un point d'un nuage, construire le nuage d'un tableau (même sur un axe qui ne part pas de 0), calculer et placer le point moyen G, décrire la tendance et repérer un point isolé. Le SMIC, les abonnés de Netflix, les entrées au cinéma, la population mondiale, la taille des enfants et les records du marathon.",
  },
  "maths/stmg/stat-ajustement": {
    titre: "Ajustement affine : 20 exercices corrigés",
    resume:
      "Juger si un ajustement affine est pertinent, tracer une droite au jugé par le point moyen, trouver son équation par deux points ou par G, calculer une valeur de y ou de x, et critiquer le modèle (nuage qui se courbe, point isolé, valeur absurde). Le CO₂ de Mauna Loa, un food truck, la masse salariale d'une PME, un festival, une voiture électrique.",
  },
  "maths/stmg/stat-moindres-carres": {
    titre: "La méthode des moindres carrés : 20 exercices corrigés",
    resume:
      "Les écarts verticaux, la somme des carrés des écarts calculée à la main dans un tableau, comparer deux droites, utiliser la droite de la calculatrice (qui passe par G), mesurer l'effet d'un point isolé. Les abonnés de Spotify, l'eau d'un hôtel, le coût de production d'une usine, l'attente aux caisses d'un supermarché.",
  },
  "maths/stmg/stat-interpoler": {
    titre: "Interpoler et extrapoler : 20 exercices corrigés",
    resume:
      "Estimer une valeur avec une droite d'ajustement, par le calcul ou sur le graphique, dire si c'est une interpolation ou une extrapolation, trouver à partir de quand un seuil est franchi, et juger les limites d'une extrapolation. La taille des enfants, la population mondiale, le record du 100 m, une droite d'étalonnage de laboratoire, la fonte d'un glacier.",
  },
  "maths/stmg/stat-changement-variable": {
    titre: "Changement de variable : 20 exercices corrigés",
    resume:
      "Linéariser un nuage qui se courbe par u = x², z = 1/x ou Y = log y, vérifier que le nuage transformé est presque aligné, utiliser la droite de la calculatrice, puis revenir aux variables de départ pour estimer. Le prix des pizzas, l'électricité solaire en France, le freinage, les bactéries, la loi de Moore, une navette partagée.",
  },
  // ─── STMG : les 76 autres notions du coach, avec réponse et clavier maths (05/11/2026) ───
  "maths/stmg/auto-proportion": {
    titre: "Proportions et pourcentages : 20 exercices corrigés",
    resume:
      "Automatismes : calculer une proportion (« parmi »), passer d'une fraction à un décimal et à un pourcentage, appliquer un taux, prendre la proportion d'une proportion. Un hôpital, une cantine, une facture avec TVA, un marathon, un festival, le budget d'une commune, l'eau douce de la planète.",
  },
  "maths/stmg/auto-developper-factoriser": {
    titre: "Développer, factoriser, réduire : 20 exercices corrigés",
    resume:
      "Automatismes : développer un produit, ne plus oublier le double produit, sortir le plus grand facteur commun, factoriser une différence de deux carrés. Un terrain de sport, une affiche, un cinéma, un food truck, un cadre photo, un chantier de carrelage.",
  },
  "maths/stmg/auto-equations": {
    titre: "Équations et inéquations : 20 exercices corrigés",
    resume:
      "Automatismes : résoudre une équation du premier degré, une inéquation dont le sens se retourne, x² = a et ses deux solutions, une équation produit nul. Une salle d'escalade, une cuve d'irrigation, un contrat d'électricité, un monte-charge, la température en montagne.",
  },
  "maths/stmg/auto-formules": {
    titre: "Formules et calcul littéral : 20 exercices corrigés",
    resume:
      "Automatismes : réduire sans se tromper de signe, isoler une lettre, remplacer les lettres par des valeurs, remonter à une donnée manquante. Un vélo, un enclos, une perfusion, un livre et sa TVA, le devis d'un plombier, un stade, les degrés Fahrenheit.",
  },
  "maths/stmg/auto-fractions-puissances": {
    titre: "Fractions, puissances et écritures : 20 exercices corrigés",
    resume:
      "Automatismes : additionner et comparer des fractions, en prendre une partie, calculer avec des puissances, passer à l'écriture scientifique et en revenir. Un parc de vélos, une colonie de bactéries, la lumière du Soleil, le budget d'une médiathèque, un centre de données.",
  },
  "maths/stmg/auto-ordres-unites": {
    titre: "Ordre de grandeur et conversions : 20 exercices corrigés",
    resume:
      "Automatismes : les pourcentages usuels de tête, l'ordre de grandeur d'un produit ou d'un quotient, les heures et les minutes, les tonnes et les kilos. Un train, un glacier, un chargement de pommes, le cœur qui bat, la facture d'un hôtel, une salle de concert.",
  },
  "maths/stmg/auto-droites": {
    titre: "Droites et coefficient directeur : 20 exercices corrigés",
    resume:
      "Automatismes : placer un point, lire une équation réduite sur le dessin, calculer un coefficient directeur, trouver l'équation à partir de deux points. Une montgolfière, un four de boulanger, une cuve de piscine, un taxi, un glacier, une perfusion.",
  },
  "maths/stmg/auto-lecture-graphique": {
    titre: "Lire une courbe : 20 exercices corrigés",
    resume:
      "Automatismes : image et antécédent lus sur une courbe, graduation et échelle d'un axe, point qui appartient ou non à une courbe, seuil dépassé. Une rivière en crue, des panneaux solaires, un musée, un drone, des abeilles.",
  },
  "maths/stmg/auto-resolution-graphique": {
    titre: "Résoudre graphiquement : 20 exercices corrigés",
    resume:
      "Automatismes : tout se lit sur le dessin. Résoudre f(x) = k et f(x) < k, trouver le signe d'une fonction, décrire ses variations. Une chambre froide, un camping, un barrage, un stand de crêpes, une randonnée en montagne. Chaque corrigé dresse son tableau.",
  },
  "maths/stmg/auto-signes": {
    titre: "Signe d'une expression : 20 exercices corrigés",
    resume:
      "Automatismes : le signe de ax + b, le seuil de rentabilité, le signe d'un produit de deux facteurs, le tableau de signes et l'inéquation qu'il résout. Un atelier de vélos, un réfrigérateur à vaccins, un plongeoir, une serre, une fromagerie.",
  },
  "maths/stmg/auto-terminale-derivee": {
    titre: "Dérivée et tangente, les automatismes de terminale : 20 exercices corrigés",
    resume:
      "Réflexes de terminale : dériver un polynôme terme à terme, calculer le coefficient directeur d'une tangente, trouver où elle est horizontale, lire sa pente sur le dessin. Une imprimerie, un souffleur de verre, un lancer de javelot, un toboggan, une station d'épuration.",
  },
  "maths/stmg/auto-terminale-reconnaitre": {
    titre: "Reconnaître, les automatismes de terminale : 20 exercices corrigés",
    resume:
      "Réflexes de terminale : un pourcentage qui se répète, c'est une suite géométrique ; la raison se lit dans le taux, et le taux dans la raison ; le signe d'une expression factorisée se trouve sans rien tracer. Un loyer, une machine, un stock qui fond, des papillons.",
  },
  "maths/stmg/auto-evo-coefficient": {
    titre: "Coefficient multiplicateur : 20 exercices corrigés",
    resume:
      "Automatismes : traduire une hausse ou une baisse par un coefficient (+ 5 % → × 1,05 ; − 5 % → × 0,95), lire un coefficient, calculer une valeur finale, retrouver une valeur initiale en divisant, passer du prix TTC au prix HT. Une boulangerie, un garage, une forêt après la tempête, une librairie, un bâtiment isolé.",
  },
  "maths/stmg/auto-evo-enchainees": {
    titre: "Évolutions successives et réciproque : 20 exercices corrigés",
    resume:
      "Automatismes : multiplier les coefficients de deux évolutions, lire le taux global, retrouver un coefficient manquant, revenir au départ par l'inverse, et voir qu'une baisse puis une hausse de même taux ne se compensent pas. Des soldes qui annoncent « − 50 % », un capital placé deux ans, une TVA suivie d'une remise, une colonie d'oiseaux.",
  },
  "maths/stmg/auto-evo-taux": {
    titre: "Calculer un taux d'évolution : 20 exercices corrigés",
    resume:
      "Automatismes : variation absolue et variation relative, taux d'évolution d'une hausse ou d'une baisse (on divise par la valeur de départ), taux lu sur un coefficient, comparer deux progressions, proportion ou évolution. Un parc éolien, les urgences, deux glaciers, un festival, une part de marché.",
  },
  "maths/stmg/auto-indice": {
    titre: "Indice base 100 : 20 exercices corrigés",
    resume:
      "Automatismes : lire un indice (l'écart à 100 est le taux depuis la référence), calculer un indice, retrouver une valeur, calculer le taux entre deux indices, comparer deux séries d'unités différentes. Un aéroport, un vignoble, les prix et les salaires, l'électricité et le solaire, un parc national.",
  },
  "maths/stmg/der-secante-tangente": {
    titre: "Sécantes et tangente : 20 exercices corrigés",
    resume:
      "Le coefficient directeur d'une sécante et son équation, les sécantes qui se rapprochent de la tangente, reconnaître une tangente sur un dessin et par le calcul. Un plongeon, un médicament, un panneau solaire, une arche, un sentier de randonnée.",
  },
  "maths/stmg/der-nombre-derive": {
    titre: "Le nombre dérivé : 20 exercices corrigés",
    resume:
      "Le taux de variation et le nombre dont il se rapproche, le coefficient directeur de la tangente, ce qu'on lit sur une courbe, la vitesse à un instant et le coût marginal. Un voilier, un tram, un stock de médicaments, des bougies, un livre à éditer.",
  },
  "maths/stmg/der-tangente-equation": {
    titre: "L'équation de la tangente : 20 exercices corrigés",
    resume:
      "La formule, l'équation réduite, le second point pour tracer à la règle, le point à vérifier, l'estimation par la tangente. Une météo, des urgences, une fusée à eau, un pont, un menu de restaurant.",
  },
  "maths/stmg/der-formules": {
    titre: "Les formules de dérivation : 20 exercices corrigés",
    resume:
      "Dériver x², x³, le nombre devant, la somme, et la constante qui disparaît ; calculer f'(a), s'en servir pour une vitesse ou une petite variation. Une skateuse, un carrelage, un aquarium, deux podcasts, le four d'une potière.",
  },
  "maths/stmg/der-polynome": {
    titre: "Dériver un polynôme : 20 exercices corrigés",
    resume:
      "Dériver un polynôme de degré 2 ou 3 terme à terme, calculer f'(a), trouver la tangente horizontale, vérifier une forme factorisée. Des coffrets de chocolats, un ballon-sonde, des huîtres, un glacier, les T-shirts d'un festival.",
  },
  "maths/stmg/der-variations": {
    titre: "Signe de la dérivée et variations : 20 exercices corrigés",
    resume:
      "Où la dérivée s'annule, son signe, le sens de variation qui s'en déduit, le tableau dessiné, le maximum et le minimum. Un parapente, une cuve de lait, une serre, un étang à truites, une start-up.",
  },
  "maths/stmg/der-optimisation": {
    titre: "Problèmes d'optimisation : 20 exercices corrigés",
    resume:
      "Combien produire, à quel prix vendre : la quantité qui rend un bénéfice maximal, celle qui rend un coût minimal, le prix qui maximise une recette, et la phrase de conclusion. Des savons, une salle d'escalade, un concert, des skis, la consommation d'une voiture.",
  },
  "maths/stmg/fct-representation": {
    titre: "Fonction : représenter et noter : 20 exercices corrigés",
    resume:
      "Une fonction sous ses trois visages : image et antécédent, lecture d'une courbe et d'un tableau, écrire et relire un coût C(x) = ax + b, grandeurs inversement proportionnelles et grandeurs liées à un carré. Un food truck, un taxi, une fleuriste, une pizza de 40 cm, un lancer de poids.",
  },
  "maths/stmg/fct-taux-variation": {
    titre: "Taux de variation et sécante : 20 exercices corrigés",
    resume:
      "Calculer un taux entre deux valeurs, le lire comme la pente d'une sécante, remonter à une image, dire ce qu'il signifie : une variation moyenne, pas un pourcentage. Une chambre froide en panne, une rivière en décrue, le rythme d'une coureuse, deux magasins au même taux.",
  },
  "maths/stmg/fct-monotonie": {
    titre: "Fonction monotone sur un intervalle : 20 exercices corrigés",
    resume:
      "Le signe du taux donne le sens de variation : lire et dresser un tableau de variations, comparer deux images sans calculer, et savoir quand on ne peut pas conclure. Une randonnée, un camping, une ruche, le pic d'une grippe, la neige d'une station.",
  },
  "maths/stmg/fct-equations-puissance": {
    titre: "Résoudre x² = c et x³ = c : 20 exercices corrigés",
    resume:
      "Deux solutions opposées pour le carré, une seule pour le cube : retrouver un côté, une arête, écrire une racine cubique et l'arrondir, se ramener à une puissance seule. Une cuve de vigneronne, un plongeon, des caisses de logisticien, les abonnés d'une plateforme.",
  },
  "maths/stmg/fct-inverse": {
    titre: "Fonction inverse : 20 exercices corrigés",
    resume:
      "Terminale : lire l'hyperbole, retrouver k par le produit des coordonnées, voir ce que devient k/x aux bornes, et le coût moyen a + b/x, où la charge fixe se dilue. Un cours de yoga, une troupe de théâtre, un abonnement de piscine, deux fournisseurs.",
  },
  "maths/stmg/fct-inverse-derivee": {
    titre: "Fonction inverse : dérivée et variations : 20 exercices corrigés",
    resume:
      "Terminale : la dérivée de k/x et son signe moins, le sens de variation sur chaque intervalle, les fonctions ax + b/x jusqu'au coût minimal, avec le tableau de variations. Une pharmacie, un entrepôt, une cave à vin, la vitesse d'un cargo.",
  },
  "maths/stmg/fct-degre2-courbe": {
    titre: "Degré 2, la parabole : 20 exercices corrigés",
    resume:
      "Lire une parabole sans la tracer : le sens et l'ouverture avec le coefficient a, la translation verticale avec b, les racines dans la forme factorisée, et associer une courbe à son expression. Une fontaine, un skatepark, une arche de pont, une fromagerie, une antenne.",
  },
  "maths/stmg/fct-degre2-symetrie": {
    titre: "Degré 2, axe de symétrie et extremum : 20 exercices corrigés",
    resume:
      "L'axe au milieu des racines ou de deux nombres de même image, le maximum ou le minimum calculé sur l'axe, une image ou un antécédent retrouvés par symétrie. Une brasserie, un coup de pied au rugby, des panneaux solaires, un billet de théâtre, un camion sous une arche.",
  },
  "maths/stmg/fct-degre2-factorisee": {
    titre: "Degré 2, racines et signe (forme factorisée) : 20 exercices corrigés",
    resume:
      "Annuler chaque facteur pour trouver les racines, dresser le tableau de signes, résoudre une inéquation et traduire « bénéficiaire » en B(x) > 0, sans discriminant. Un atelier de vélos, un ballon de volley, une piscine, deux drones, une copie à corriger.",
  },
  "maths/stmg/fct-degre2-factoriser": {
    titre: "Degré 2, factoriser connaissant une racine : 20 exercices corrigés",
    resume:
      "Sans discriminant : vérifier qu'un nombre annule le polynôme, trouver l'autre racine avec le produit c/a, écrire la forme factorisée sans oublier a, développer pour contrôler. Des trottinettes, une boulangerie, un bassin de jardin, un cinéma, deux copies à départager.",
  },
  "maths/stmg/fct-degre3": {
    titre: "Degré 3, courbe, racines et signe : 20 exercices corrigés",
    resume:
      "Reconnaître la courbe de ax³ + b, lire ou écrire les trois racines d'une forme factorisée, suivre le signe qui change à chaque racine, vérifier une racine par le calcul. Une éolienne, un sismographe, un grand huit, un magasin de ski, un rapport à contrôler.",
  },
  "maths/stmg/suite-notation": {
    titre: "Suites, notation et modes de génération : 20 exercices corrigés",
    resume:
      "Le rang et le terme, u(n) et l'indice, une définition fonctionnelle ou par récurrence, traduire une situation en relation et lire ce que dit une relation. Une piscine, un club d'escalade, un stock de pharmacie, un théâtre, un glacier fictif.",
  },
  "maths/stmg/suite-termes": {
    titre: "Suites, calculer des termes : 20 exercices corrigés",
    resume:
      "Dérouler une suite de proche en proche, atteindre un rang donné, remonter en arrière, compter les pas et repérer une suite ni arithmétique ni géométrique. Des ruches, des bornes de recharge, un podcast, une boulangerie, un lac.",
  },
  "maths/stmg/suite-arithmetique": {
    titre: "Suite arithmétique : 20 exercices corrigés",
    resume:
      "Trouver la raison, y compris entre deux relevés éloignés, écrire la relation de récurrence, lire le sens de variation au signe de la raison et démontrer par la différence. Un cinéma, une cuve, un taxi, un drone, une ligne de bus.",
  },
  "maths/stmg/suite-geometrique": {
    titre: "Suite géométrique : 20 exercices corrigés",
    resume:
      "Trouver la raison par un quotient dans le bon sens, dérouler la relation de récurrence, remonter en divisant et démontrer par le quotient constant. Une rumeur, une voiture de société, un placement, des lynx, un festival.",
  },
  "maths/stmg/suite-geo-evolution": {
    titre: "Suite géométrique et taux d'évolution : 20 exercices corrigés",
    resume:
      "De + 20 % à q = 1,2 et retour, retrouver un taux avec deux relevés, calculer l'évolution sur deux ans sans additionner les pourcentages, lire le sens de variation en comparant q à 1. Des vélos, une PME, un club de rugby, une banquise fictive, une librairie.",
  },
  "maths/stmg/suite-representation": {
    titre: "Représenter les termes d'une suite : 20 exercices corrigés",
    resume:
      "Le nuage de points sans relier, lire un terme ou un rang, conjecturer la nature de la suite à l'allure des points, écrire une formule de tableur qu'on recopie. Un studio de yoga, une médiathèque, un entrepôt, une serre, un jeu vidéo.",
  },
  "maths/stmg/suite-modeliser": {
    titre: "Modéliser par une suite : 20 exercices corrigés",
    resume:
      "Passer d'une situation à une suite : on ajoute ou on multiplie, premier terme et relation, rang d'une année, capital à intérêts composés et simples, phrase de conclusion. Un glacier, un tramway, une salle de sport, une voiture d'auto-école, des cigognes.",
  },
  "maths/stmg/suite-seuil": {
    titre: "Problème de seuil : 20 exercices corrigés",
    resume:
      "À partir de quand ? Lire le premier rang qui franchit un seuil dans un tableau ou sur un graphique, le trouver de proche en proche, écrire la condition d'une boucle « tant que », repérer quand une suite passe devant l'autre. Une recyclerie, un médicament, un food-truck, une réserve d'eau.",
  },
  "maths/stmg/suite-terme-general": {
    titre: "Terme général d'une suite : 20 exercices corrigés",
    resume:
      "Terminale. Écrire u(n) en fonction de n pour une suite arithmétique ou géométrique, sauter à un rang lointain, lire une raison, remonter au premier terme, tester trois nombres consécutifs. Des bornes de recharge, un podcast, une digue face à la mer, un plan vélo.",
  },
  "maths/stmg/suite-moyennes": {
    titre: "Moyennes arithmétique et géométrique : 20 exercices corrigés",
    resume:
      "Terminale. La demi-somme quand on ajoute la même chose, la racine du produit quand on applique le même pourcentage. Retrouver un nombre manquant, intercaler un terme, comprendre pourquoi +100 % puis −50 % ne font pas +25 %. Un loyer, des cigognes, une prime de vente, l'audience d'une radio.",
  },
  "maths/stmg/suite-somme": {
    titre: "Somme des premiers termes d'une suite : 20 exercices corrigés",
    resume:
      "Terminale. Lire et écrire une somme avec le signe Σ, compter les termes sans en oublier un, appliquer la bonne formule, arithmétique ou géométrique. L'entraînement d'un marathonien, les sièges d'un théâtre, une collecte de dons, des arbres plantés, une pyramide de cubes.",
  },
  "maths/stmg/suite-somme-situations": {
    titre: "Sommes, emprunts et placements : 20 exercices corrigés",
    resume:
      "Terminale. Un terme ou une somme ? Le total versé, la valeur acquise de versements réguliers, le gain des intérêts, le coût d'un crédit, la mensualité. Un four de boulangerie, un voyage de classe, le cabinet d'une dentiste, une voiture à crédit ou à l'épargne.",
  },
  "maths/stmg/suite-comparer": {
    titre: "Comparer deux suites : 20 exercices corrigés",
    resume:
      "Terminale. Le rang où une suite passe devant l'autre, qui l'emporte à long terme, intérêts simples ou composés, taux proportionnel ou taux équivalent. Deux cinémas, deux parcs éoliens, deux contrats de travail, la somme d'une grand-mère.",
  },
  "maths/stmg/expo-definition": {
    titre: "La fonction x ↦ aˣ : 20 exercices corrigés",
    resume:
      "Reconnaître une exponentielle, calculer une image, l'exposant négatif, prolonger une suite géométrique aux durées non entières. Des bactéries, un musée, le carbone 14, un podcast, une forêt, un entraînement de cyclisme.",
  },
  "maths/stmg/expo-variations": {
    titre: "La fonction x ↦ kaˣ, variations et allure : 20 exercices corrigés",
    resume:
      "Comparer la base à 1, reconnaître l'allure de la courbe, voir ce que change le coefficient k, relier la fonction à la suite géométrique. Un glacier, une librairie, le déficit d'un club de rugby, une voiture d'occasion, le vélo en ville.",
  },
  "maths/stmg/expo-proprietes": {
    titre: "Propriétés algébriques de aˣ : 20 exercices corrigés",
    resume:
      "Un produit additionne les exposants, un quotient les soustrait, une puissance de puissance les multiplie, l'exposant manquant, une copie à corriger. Un placement, des levures en fromagerie, le prix de l'électricité, une vidéo qui circule, des adresses informatiques.",
  },
  "maths/stmg/expo-taux-moyen": {
    titre: "Le taux d'évolution moyen : 20 exercices corrigés",
    resume:
      "L'exposant 1/n, le coefficient global, sa racine, et le piège : le taux moyen n'est pas la moyenne des taux. Une commune qui grandit, une cantine qui gaspille moins, le prix du blé, une station de ski, un lac qui recule.",
  },
  "maths/stmg/expo-taux-equivalent": {
    titre: "Taux équivalent sur une autre période : 20 exercices corrigés",
    resume:
      "Du taux moyen au taux global, du taux annuel au taux mensuel et l'inverse, lire ce que dit vraiment un taux moyen. Un crédit à la consommation, une facture d'énergie, le prix d'une baguette, deux offres à comparer, un office de tourisme.",
  },
  "maths/stmg/log-definition": {
    titre: "Logarithme décimal, définition : 20 exercices corrigés",
    resume:
      "Terminale. Log(b), solution de 10^x = b : lire un exposant, retrouver x quand on connaît log(x), encadrer un logarithme sans calculatrice, se servir de la croissance. Les décibels, le pH d'une solution, un séisme, une dilution au laboratoire, un festival.",
  },
  "maths/stmg/log-proprietes": {
    titre: "Propriétés du logarithme décimal : 20 exercices corrigés",
    resume:
      "Terminale. Les quatre règles : le produit devient une somme, le quotient une différence, l'exposant descend devant, l'inverse change le signe. Des calculs avec un tableau de valeurs, le gain d'un amplificateur, la magnitude des étoiles, un code secret, des bouquetins.",
  },
  "maths/stmg/log-equations": {
    titre: "Résoudre aˣ = b avec le logarithme : 20 exercices corrigés",
    resume:
      "Terminale. Reconnaître où est l'inconnue, écrire la solution exacte, la calculer avec un tableau, trouver le premier entier qui convient, et l'inégalité qui se retourne quand la grandeur diminue. Un parc éolien, un glacier, un médicament, un tournoi d'e-sport, le levain d'un boulanger.",
  },
  "maths/stmg/log-applications": {
    titre: "Logarithme, durées et ordres de grandeur : 20 exercices corrigés",
    resume:
      "Terminale. Combien d'années pour atteindre un objectif, un temps de doublement, une demi-vie, le nombre de chiffres d'un très grand nombre. Un livret d'épargne, une salle d'escalade, une forêt, une dette, les grains de riz de l'échiquier.",
  },
  "maths/stmg/proba-conditionnelle-tableau": {
    titre: "Probabilité conditionnelle sur un tableau : 20 exercices corrigés",
    resume:
      "Lire un tableau croisé sans se tromper de population : repérer « parmi » et « sachant que », écrire la notation, choisir le dénominateur, calculer. Une école de musique, les urgences, un verger, une agence immobilière, la météo.",
  },
  "maths/stmg/proba-conditionnelle-distinguer": {
    titre: "Ne pas confondre les probabilités conditionnelles : 20 exercices corrigés",
    resume:
      "Trois nombres qui se ressemblent : l'intersection et les deux conditionnelles, leur traduction par une phrase, et le vocabulaire des tests : faux positifs, faux négatifs, sensibilité, spécificité. Une alarme incendie, un filtre anti-spam, un scanner d'aéroport, un détecteur de faux billets.",
  },
  "maths/stmg/proba-epreuves-independantes": {
    titre: "Deux épreuves indépendantes : 20 exercices corrigés",
    resume:
      "Les expériences qui se répètent : dessiner l'arbre, multiplier le long d'un chemin, calculer « au moins une fois » par le contraire, voir ce que change un tirage sans remise. Un tir à l'arc, des feux tricolores, une sauvegarde informatique, une tombola, trois jours de randonnée.",
  },
  "maths/stmg/proba-arbre": {
    titre: "Arbre de probabilités, construire : 20 exercices corrigés",
    resume:
      "Terminale. Ce que porte le premier niveau, ce que porte le second, placer un nombre de l'énoncé, compléter, repérer un arbre impossible, traduire une branche par une phrase. Une épicerie, une opticienne, les urgences, un port de pêche, des vacances.",
  },
  "maths/stmg/proba-arbre-calcul": {
    titre: "Arbre, chemins et probabilités totales : 20 exercices corrigés",
    resume:
      "Terminale. Multiplier le long d'un chemin, additionner les chemins qui mènent au même résultat, écrire la formule des probabilités totales, passer de l'arbre au tableau et retour. Une cave à vin, des moteurs, une radio, un réseau de bus.",
  },
  "maths/stmg/proba-independance": {
    titre: "Indépendance de deux évènements : 20 exercices corrigés",
    resume:
      "Terminale. Comparer deux probabilités, utiliser le produit, justifier sur un tableau ou un arbre, ne plus confondre indépendants et incompatibles. Un recrutement, une collecte de sang, des abeilles, un jeu vidéo.",
  },
  "maths/stmg/va-loi-probabilite": {
    titre: "Variable aléatoire : loi de probabilité : 20 exercices corrigés",
    resume:
      "Traduire « au moins » et « au plus » en écritures, additionner les bonnes colonnes, passer par le contraire, dresser une loi depuis des effectifs ou une composition, trouver la case manquante, repérer un tableau impossible. Une tombola de rugby, des ruches, des trains en retard, un cinéma, un mur d'escalade.",
  },
  "maths/stmg/va-esperance": {
    titre: "Espérance d'une variable aléatoire : 20 exercices corrigés",
    resume:
      "Calculer une espérance, prévoir un total sur un grand nombre de répétitions, juger si un jeu est équitable, fixer une mise ou une prime d'assurance, choisir entre deux options. Une pêche aux canards, une assurance de smartphone, un festival en plein air, des panneaux solaires.",
  },
  "maths/stmg/va-bernoulli": {
    titre: "Loi de Bernoulli : 20 exercices corrigés",
    resume:
      "Reconnaître une épreuve à deux issues, écrire son espérance, la simuler avec un nombre aléatoire, compter les tirages d'une simulation, lire le diagramme des fréquences observées. Un service au tennis, des oiseaux bagués, un sondage, des ampoules à tester, une appli de musique.",
  },
  "maths/stmg/va-binomiale-reconnaitre": {
    titre: "Loi binomiale : reconnaître : 20 exercices corrigés",
    resume:
      "Terminale. Vérifier les conditions, lire n et p dans un énoncé, repérer {X = k} sur un arbre, calculer la probabilité d'un chemin, démasquer le tirage sans remise et les situations qui n'en relèvent pas. Une salle d'attente, des flacons de parfum, des arbres malades, des vols en retard.",
  },
  "maths/stmg/va-binomiale-coefficients": {
    titre: "Coefficients binomiaux et triangle de Pascal : 20 exercices corrigés",
    resume:
      "Terminale. Compter les chemins d'un arbre, lire le triangle de Pascal, construire une ligne à partir de la précédente, utiliser la symétrie, dénombrer « au moins » et « au plus ». Des drones de livraison, un biathlon, un tournoi d'échecs, un vieux cahier d'archives.",
  },
  "maths/stmg/va-binomiale-calcul": {
    titre: "Loi binomiale : calculer : 20 exercices corrigés",
    resume:
      "Terminale. Aucun succès, tous les succès, un seul échec, exactement k succès avec le coefficient du triangle de Pascal, « au moins un » et « au moins deux » par le contraire, et l'espérance. Des tirs au but, des tubes de laboratoire, des bornes de recharge, des serveurs informatiques.",
  },
  "maths/stmg/algo-variables": {
    titre: "Variables, compteur et accumulateur : 20 exercices corrigés",
    resume:
      "Automatismes : dérouler une affectation, échanger deux variables, compter avec un compteur, cumuler avec un accumulateur, simuler un tirage avec random. Une boulangerie, un hôpital, une forêt, un cinéma, un festival, de l'énergie solaire.",
  },
  "maths/stmg/algo-boucles": {
    titre: "Boucles et instruction conditionnelle : 20 exercices corrigés",
    resume:
      "Automatismes : compter les tours d'un for, suivre une condition if, elif, else, trouver un seuil avec while, dérouler un programme pas à pas. Une épargne, une serre, le littoral, des ruches, une rivière, des chaînes vidéo.",
  },
  "maths/stmg/algo-listes": {
    titre: "Listes : 20 exercices corrigés",
    resume:
      "Automatismes : lire un élément par son indice (qui commence à 0), générer une liste, ajouter avec append, parcourir pour une somme, un maximum ou un filtre. Un marché aux poissons, la montagne, un laboratoire, un théâtre, des colis, une librairie.",
  },
  "maths/stmg/algo-fonctions": {
    titre: "Fonctions en Python : 20 exercices corrigés",
    resume:
      "Automatismes : repérer les entrées et la sortie d'une fonction, compléter sa définition, calculer un appel, découper un programme pour ne pas répéter un calcul. Un commerce, une diététicienne, un marathon, une pâtisserie, un zoo, une facture d'électricité.",
  },
  "maths/stmg/tableur-formules": {
    titre: "Tableur : écrire une formule : 20 exercices corrigés",
    resume:
      "Automatismes : lire une cellule, comprendre ce que calcule une formule, écrire une formule qui commence par =, avec une hausse ou une baisse. Une piscine, une boulangerie, un hôtel, une pharmacie, des ruches, un gîte.",
  },
  "maths/stmg/tableur-recopie": {
    titre: "Tableur : recopier et exploiter : 20 exercices corrigés",
    resume:
      "Automatismes : prédire une formule recopiée, figer une cellule avec le dollar, lire une colonne, choisir entre courbe, barres et diagramme circulaire. Une agence immobilière, une paie, une station météo, une crèche, un tournoi de rugby, un logement.",
  },
  "maths/stmg/logique-connecteurs": {
    titre: "Logique : et, ou, non : 20 exercices corrigés",
    resume:
      "Automatismes : décider si une proposition avec et, ou est vraie, nier une inégalité sans oublier l'égalité, nier « tous » et « au moins un », distinguer le « ou » courant du « ou » mathématique. Un magasin, un cinéma, un hôpital, des bourses d'études, une régate, un musée.",
  },
  "maths/stmg/logique-raisonnement": {
    titre: "Contre-exemple, réciproque, contraposée : 20 exercices corrigés",
    resume:
      "Automatismes : réfuter par un contre-exemple, écrire et tester une réciproque, utiliser une contraposée, reconnaître une condition nécessaire ou suffisante. Une vente en ligne, un match de football, un lycée, une usine, un jury d'examen, une banque.",
  },
};

export function hrefFicheExercices(matiere: string, classe: string, notion: string) {
  return `/fiches-exercices/${matiere}/${classe}/${notion}`;
}

/** La feuille d'exercices qui va avec une FICHE DE COURS (par son slug), ou
 *  null. Sert au lien posé sur la fiche de cours : la clé directe d'abord, puis
 *  les fiches que la feuille déclare couvrir en plus (`aussiPour`). */
export function ficheExercicesPourCours(
  matiere: string,
  classe: string,
  notionCours: string,
): { href: string; titre: string } | null {
  const c = classe.toLowerCase();
  const n = notionCours.toLowerCase().replace(/_/g, "-");
  const directe = `${matiere}/${c}/${n}`;
  if (FICHES_EXERCICES_REGISTRE[directe]) {
    return { href: `/fiches-exercices/${directe}`, titre: FICHES_EXERCICES_REGISTRE[directe].titre };
  }
  for (const [cle, entree] of Object.entries(FICHES_EXERCICES_REGISTRE)) {
    if (cle.startsWith(`${matiere}/${c}/`) && entree.aussiPour?.includes(n)) {
      return { href: `/fiches-exercices/${cle}`, titre: entree.titre };
    }
  }
  return null;
}

export type FicheExercicesListItem = {
  matiere: string;
  classe: string;
  notion: string;
  titre: string;
  resume: string;
  href: string;
};

// Même ordre que les fiches de cours : du plus jeune au plus âgé.
const ORDRE_CLASSES = [
  "cp", "ce1", "ce2", "cm1", "cm2",
  "6e", "5e", "4e", "3e",
  "seconde", "premiere", "premiere-spe", "terminale-spe",
  // 22/10/2026 : la STMG (1re et terminale, une seule classe au coach), après
  // la voie générale.
  "stmg",
];

/** Toutes les fiches d'exercices, triées par matière, niveau puis titre —
 *  c'est ce que le hub /fiches-exercices affiche. */
export function listerFichesExercices(): FicheExercicesListItem[] {
  return Object.entries(FICHES_EXERCICES_REGISTRE)
    .map(([cle, v]) => {
      const [matiere, classe, notion] = cle.split("/");
      return { matiere, classe, notion, titre: v.titre, resume: v.resume, href: `/fiches-exercices/${cle}` };
    })
    .sort((a, b) => {
      if (a.matiere !== b.matiere) return a.matiere.localeCompare(b.matiere, "fr");
      const oa = ORDRE_CLASSES.indexOf(a.classe);
      const ob = ORDRE_CLASSES.indexOf(b.classe);
      if (oa !== ob) return oa - ob;
      return a.titre.localeCompare(b.titre, "fr");
    });
}

/** Le lien de la fiche d'exercices d'une notion DU COACH, ou null. Le slug de
 *  la fiche EST le `notionId` du coach, en tirets. */
export function ficheExercicesHrefPourCoach(
  matiere: string,
  classe: string,
  coachNotionId: string,
): string | null {
  if (!matiere || !classe || !coachNotionId) return null;
  const c = classe.toLowerCase();
  const cle = `${matiere}/${c}/${coachNotionId.toLowerCase().replace(/_/g, "-")}`;
  if (FICHES_EXERCICES_REGISTRE[cle]) return `/fiches-exercices/${cle}`;
  for (const [k, entree] of Object.entries(FICHES_EXERCICES_REGISTRE)) {
    if (k.startsWith(`${matiere}/${c}/`) && entree.notionsCoach?.includes(coachNotionId)) {
      return `/fiches-exercices/${k}`;
    }
  }
  return PAGES_A_IMPRIMER_HORS_REGISTRE[`${matiere}/${c}/${coachNotionId}`] ?? null;
}

/** ⭐ 07/10/2026 — des pages à imprimer SANS classe, hors du registre : les
 *  tables de multiplication (six feuilles, la division par la table). Le bouton
 *  « Exercices » des notions qui les travaillent y mène, faute de feuille propre. */
const PAGES_A_IMPRIMER_HORS_REGISTRE: Record<string, string> = {
  "maths/ce1/multiplication": "/tables-de-multiplication",
  "maths/ce2/multiplication": "/tables-de-multiplication",
  "maths/ce2/division": "/tables-de-multiplication",
  "maths/cm1/tables_multiplication": "/tables-de-multiplication",
  "maths/cm1/division": "/tables-de-multiplication",
};
