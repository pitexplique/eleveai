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
};

export const FICHES_EXERCICES_REGISTRE: Record<string, FicheExercicesEntry> = {
  // ⭐ LA PREMIÈRE DU COLLÈGE (20/09/2026) — elle ferme le trio de la Une de
  // l'accueil : le short « 1/2 + 1/3 ne fait pas 2/5 », la leçon vidéo, la feuille.
  "maths/5e/fraction-calcul": {
    titre: "Calculer avec les fractions : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : additionner et soustraire (même dénominateur, multiples, différents), multiplier, prendre une fraction d'un nombre, démonter l'erreur 1/2 + 1/3 = 2/5. Un rappel de cours avant chaque niveau, et cinq corrigés dessinés.",
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
    titre: "Multiples, diviseurs et nombres premiers : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : diviseurs, pair et impair, critères de divisibilité, nombres premiers, décomposition, fractions irréductibles, et deux démonstrations avec une lettre. Des bouquets, des bus, un carrelage, un vélo, et les cigales qui comptent en nombres premiers.",
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
      "Additionner et soustraire des relatifs, multiplier et diviser avec la règle des signes, compter les facteurs négatifs, calculer avec parenthèses, priorités et trait de fraction. Problèmes : de la mer Morte à l'Everest, l'air à 11 km d'altitude, les records de froid et de chaud, la carte de golf. Corrigés étape par étape, avec la droite graduée.",
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
      "Reconnaître une situation de proportionnalité dans un tableau ou sur un graphique, compléter un tableau, le coefficient et le retour à l'unité, la quatrième proportionnelle. La pluie sur un toit, l'orage, les degrés Fahrenheit, le tour de la Terre. Le tableau dessiné avec son coefficient dans chaque corrigé.",
  },
  "maths/4e/prop-ratio-pourcentage": {
    titre: "Ratios, partages et pourcentages : 20 exercices corrigés",
    resume:
      "Écrire et simplifier un ratio a : b, le traduire par une égalité de quotients, partager selon deux ou trois parts avec la barre dessinée, calculer un pourcentage, passer par le coefficient multiplicateur, enchaîner deux évolutions. Le braquet d'un vélo, le déclin des animaux sauvages, le CO₂ de l'air.",
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
      "Le plus grand facteur commun, factoriser par un nombre, une lettre ou un nombre négatif, le « 1 » caché, et vérifier en développant — le terrain de handball, le potager, la forêt, l'étang. Le rectangle découpé dessiné dans les corrigés.",
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
  "seconde", "premiere-spe", "terminale-spe",
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
  const cle = `${matiere}/${classe.toLowerCase()}/${coachNotionId.toLowerCase().replace(/_/g, "-")}`;
  return FICHES_EXERCICES_REGISTRE[cle] ? `/fiches-exercices/${cle}` : null;
}
