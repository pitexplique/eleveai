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
  return null;
}
