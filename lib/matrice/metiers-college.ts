// lib/matrice/metiers-college.ts
//
// ⭐ 6e ET 4e, NOTION PAR NOTION (08/11/2026) : ce sont les classes de Frédéric.
// Chaque phrase dit ce que le métier FAIT de la notion. Les liens marqués `V`
// reprennent les métiers déjà montrés dans les vidéos de la notion
// (manim/manifeste-youtube.json, relevé du 08/11) : on part de ce qui existe.
// Les autres classes passent par les familles (metiers-familles.ts).
//
// ⛔ Une phrase = un geste réel du métier, avec les maths de la notion. Pas de
// « utilise les maths tous les jours ».

import { F, M, R, V, type LienMetier } from "./metiers-catalogue";

export const METIERS_6E: Record<string, LienMetier[]> = {
  algo_programmation: [
    F("game-designer", "écrit les boucles qui font avancer un personnage de 10 pas, puis tourner de 90°."),
    M("roboticien", "programme un robot aspirateur : « répéter 4 fois : avancer, tourner »."),
    F("developpeur", "teste son programme pas à pas pour trouver l'instruction qui bloque."),
  ],
  entier_nombre: [
    M("astronome", "range les planètes de la plus proche à la plus lointaine, à des millions de kilomètres."),
    F("journaliste", "compare deux villes : 2 145 906 ou 2 154 906 habitants, laquelle est la plus grande ?"),
    M("comptable", "écrit les montants d'une facture en chiffres et en lettres, sans oublier un zéro."),
  ],
  decimal_nombre: [
    F("veterinaire", "pèse un chaton à 0,85 kg et compare avec la pesée de la semaine dernière.", V),
    M("meteorologue", "relève 12,4 mm de pluie et range les relevés de la semaine.", V),
    F("biologiste", "mesure des tortues au dixième de centimètre près.", V),
  ],
  decimal_calcul: [
    M("boulanger", "additionne une commande : 1,20 € + 3,45 € + 0,95 €.", V),
    F("carreleur", "multiplie 3,5 m par 2,4 m pour commander ses carreaux.", V),
    F("vendeur", "rend la monnaie sur 20 € et vérifie sa caisse le soir.", V),
  ],
  demi_droite_graduee: [
    F("infirmier", "lit la graduation d'une seringue : 2,5 mL, c'est entre 2 et 3."),
    M("ingenieur-son", "règle un curseur de volume gradué de 0 à 10."),
    F("historien", "place des dates sur une frise graduée de 100 en 100 ans."),
    M("conservateur", "accroche les tableaux du musée dans l'ordre, du XVe au XXIe siècle."),
  ],
  fraction_nombre: [
    F("patissier", "coupe une tarte en 8 parts égales et en sert 3 : les 3/8 de la tarte.", V),
    M("menuisier", "partage une planche de 2 m en 5 morceaux égaux.", V),
    F("musicien", "lit des croches : une croche dure 1/2 temps, une double croche 1/4."),
    M("luthier", "place la 12e frette d'une guitare à la moitié de la corde : la note monte d'une octave."),
  ],
  fraction_calcul: [
    F("soigneur", "donne les 3/4 d'une ration de 2 kg de poisson à une otarie.", V),
    M("cuisinier", "prend la moitié de la recette : 1/2 de 600 g de farine, c'est 300 g."),
    F("agriculteur", "plante des tomates sur les 2/5 de son champ de 1 000 m²."),
  ],
  algebre_probleme: [
    F("styliste", "répète un motif de 3 perles bleues et 2 blanches : combien de bleues pour 40 perles ?"),
    M("carreleur", "pose une frise noir-blanc-blanc : pour 15 carreaux noirs, combien de blancs ?"),
    F("commercant", "retrouve le prix d'un cahier quand 3 cahiers et un stylo à 2 € coûtent 11 €."),
  ],
  pourcentage_nombre: [
    M("vendeur", "applique une remise de 25 % : un quart du prix en moins.", V),
    F("entraineur", "annonce 50 % de réussite aux tirs : la moitié des ballons sont rentrés.", V),
    M("oceanographe", "explique que les océans couvrent environ 70 % de la surface de la Terre.", V),
    F("developpeur", "affiche la barre de téléchargement : 40 %, puis 80 %, puis 100 %.", V),
  ],
  prop_proportionnalite: [
    M("patissier", "passe une recette de 4 à 12 personnes : chaque quantité est multipliée par 3.", V),
    F("game-designer", "donne 15 pièces par niveau : 4 niveaux, 60 pièces.", V),
    F("dieteticien", "calcule le sucre d'un bol de 30 g quand l'étiquette donne la valeur pour 100 g."),
  ],
  prop_echelle: [
    F("architecte", "dessine une maison au 1/100 : 1 cm sur le plan, 1 m en vrai.", V),
    M("cartographe", "trace une carte de randonnée où 1 cm représente 250 m.", V),
    F("paysagiste", "dessine le jardin sur un plan à l'échelle avant de planter.", V),
  ],
  entier_calcul_pose: [
    F("comptable", "pose l'addition des dépenses du mois pour vérifier le total.", V),
    M("guide-montagne", "calcule ce qui reste à monter : 632 m à gravir, 458 m déjà faits, encore 174 m.", V),
    M("agriculteur", "calcule 24 rangées de 36 plants : 864 plants à commander.", V),
    F("logisticien", "répartit 157 colis dans des camionnettes de 6 : 26 pleines, et une 27e pour le dernier colis.", V),
    F("realisateur", "compte les images d'un dessin animé de 3 minutes : 180 × 24 = 4 320 images, puis vérifie.", V),
  ],
  entier_calcul_mental: [
    M("arbitre", "compte de tête les points d'un match de basket : 2 + 3 + 2, en direct.", V),
    F("cuisinier", "double une recette de tête : 250 g de farine, ça fait 500 g.", V),
    M("dj", "enchaîne des morceaux à 120 battements par minute : en 2 minutes, 240 battements.", V),
    F("commercant", "rend la monnaie de tête : pour 36 € payés avec 100 €, elle rend 64 €.", V),
    F("soigneur", "partage de tête 56 poissons entre 8 manchots : 7 chacun.", V),
    M("developpeur", "vérifie de tête les pièces que gagne le héros de son jeu vidéo.", V),
  ],
  aire_longueur: [
    F("couturier", "prend un tour de taille au centimètre et convertit 1,2 m en 120 cm."),
    M("charpentier", "mesure les poutres en mètres et coupe au millimètre près."),
    F("entraineur", "mesure un saut en longueur : 4,35 m, soit 435 cm."),
  ],
  aire_perimetre: [
    M("paysagiste", "calcule la longueur de clôture autour d'un jardin rectangulaire."),
    F("eleveur", "pose le grillage tout autour de l'enclos de ses chèvres."),
    F("fleuriste", "mesure le tour d'un vase pour couper juste assez de ruban."),
  ],
  aire_unite: [
    F("carreleur", "compte les carreaux d'1 m² qu'il faut pour couvrir une pièce."),
    M("agriculteur", "parle en hectares : 1 ha, c'est un carré de 100 m de côté."),
    F("agent-immobilier", "compare deux appartements : 65 m² ou 58 m² ?"),
  ],
  aire_surface: [
    M("macon", "calcule l'aire d'un mur pour acheter le bon nombre de pots d'enduit."),
    F("jardinier", "calcule l'aire d'une pelouse pour acheter le bon sac de graines."),
    M("technicien-energie", "calcule l'aire du toit disponible pour poser des panneaux solaires."),
  ],
  distance_segment: [
    F("geometre", "mesure la distance entre deux bornes d'un terrain."),
    M("telepilote", "place son drone au milieu du terrain à filmer."),
    F("urbaniste", "place un arrêt de bus au milieu de la rue, entre deux quartiers."),
  ],
  mediatrice_segment: [
    M("urbaniste", "cherche l'endroit à même distance de deux villages pour bâtir l'école."),
    F("ingenieur-telecom", "trace la frontière entre les zones de deux antennes : à égale distance des deux."),
    M("pompier", "choisit l'emplacement de la caserne à même distance de deux villes."),
  ],
  bissectrice_angle: [
    F("menuisier", "coupe deux baguettes à 45° pour faire un cadre : la bissectrice de l'angle droit."),
    M("carreleur", "trace la bissectrice d'un coin pour poser une frise en diagonale."),
    F("eclairagiste", "oriente un projecteur pile au milieu de l'angle formé par deux murs."),
  ],
  cercle_circonscrit: [
    M("ingenieur-telecom", "place une antenne à égale distance de trois villages."),
    F("archeologue", "retrouve le centre d'une ancienne tour ronde à partir de trois pierres."),
    F("logisticien", "place un entrepôt à la même distance de trois magasins."),
  ],
  cercle_disque: [
    M("mecanicien", "sait qu'une roue de 70 cm de diamètre avance d'environ 2,2 m à chaque tour."),
    F("patissier", "calcule le tour d'un moule de 24 cm pour la bande de chocolat."),
    F("astronome", "suit l'orbite presque circulaire d'un satellite autour de la Terre."),
  ],
  duree_temps: [
    F("monteur", "monte une vidéo de 3 min 45 s et place chaque plan à la seconde près."),
    M("pilote", "calcule l'heure d'arrivée d'un vol de 11 h 20 min."),
    M("infirmier", "donne un médicament toutes les 6 heures et note chaque horaire."),
    F("horloger", "règle une montre qui retarde de 2 secondes par jour : 1 minute par mois."),
  ],
  vision_espace: [
    F("animateur-3d", "fait tourner un objet 3D pour le voir de face, de dessus et de côté."),
    M("architecte", "dessine les vues d'une maison avant de la construire."),
    M("dessinateur-projeteur", "lit un plan vu de dessus et imagine la pièce en volume."),
  ],
  volume_solide: [
    M("logisticien", "compte combien de cartons cubiques tiennent dans un camion."),
    F("ingenieur-hydraulique", "calcule le volume d'eau d'une citerne."),
    M("maitre-nageur", "connaît le volume de la piscine en m³ pour doser le traitement de l'eau."),
  ],
  angle_mesure: [
    F("kine", "mesure la flexion d'un genou après une blessure : 90°, puis 120°.", V),
    M("carreleur", "vérifie qu'un coin fait bien 90° avant de poser le carrelage.", V),
    F("game-designer", "fait pivoter un personnage de 45° à chaque appui.", V),
    M("urbaniste", "dessine un carrefour où les rues se croisent à angle droit.", V),
  ],
  triangle_figure: [
    M("graphiste", "construit un logo avec des triangles équilatéraux.", V),
    F("charpentier", "assemble les poutres en triangle, la forme qui ne se déforme pas."),
    M("astronome", "repère une constellation en reliant trois étoiles brillantes.", V),
    F("styliste", "découpe des triangles de tissu pour une jupe à pans.", V),
  ],
  triangle_propriete: [
    F("charpentier", "vérifie que trois poutres peuvent former un triangle avant de les couper.", V),
    M("guide-montagne", "lit les angles d'un triangle sur la carte : leur somme fait toujours 180°.", V),
    F("ingenieur-btp", "dessine des ponts en treillis, faits de triangles."),
  ],
  quadrilatere_figure: [
    F("styliste", "dessine des motifs en losanges et en carrés sur un tissu."),
    M("menuisier", "fabrique une porte rectangulaire et vérifie ses quatre angles droits."),
    F("paysagiste", "dessine des parterres carrés et des allées en losange."),
  ],
  quadrilatere_propriete: [
    M("macon", "vérifie que les diagonales sont égales pour poser des fondations bien rectangulaires."),
    F("couturier", "trace un patron rectangulaire en reportant des côtés égaux."),
    M("dessinateur-projeteur", "construit un carré parfait au compas pour le plan d'une pièce."),
  ],
  sym_axiale: [
    F("styliste", "plie le tissu en deux pour couper les deux côtés d'une robe identiques."),
    M("architecte", "dessine une façade symétrique de part et d'autre de la porte."),
    F("photographe", "cadre un lac calme où la montagne se reflète comme dans un miroir."),
  ],
  stat_enquete: [
    F("sondeur", "interroge 1 000 personnes et range leurs réponses dans un tableau."),
    M("biologiste", "compte les oiseaux d'un étang et note chaque espèce."),
    F("community-manager", "lance un sondage auprès des abonnés et compte les votes."),
  ],
  stat_donnee: [
    M("ranger", "lit le graphique des visiteurs du parc, mois par mois.", V),
    F("agriculteur", "lit le tableau des récoltes pour choisir quoi planter.", V),
    M("journaliste", "lit un diagramme avant d'écrire son article.", V),
    M("volcanologue", "lit le graphique des petits séismes sous le Piton de la Fournaise avant une éruption.", R),
  ],
  proba_experience: [
    M("game-designer", "règle les chances de trouver un objet rare dans un coffre."),
    F("meteorologue", "annonce « 7 chances sur 10 de pluie demain »."),
    F("arbitre", "tire à pile ou face qui engage : une chance sur deux."),
  ],
  proba_frequence: [
    F("controleur-qualite", "teste 100 pièces et en trouve 3 défectueuses."),
    M("entraineur", "compte les tirs réussis sur 20 pour estimer les chances d'un joueur."),
    M("apiculteur", "compte les ruches en bonne santé parmi toutes celles qu'il visite."),
  ],
};

export const METIERS_4E: Record<string, LienMetier[]> = {
  algo_programmation: [
    F("developpeur", "écrit une boucle « répéter jusqu'à » qui s'arrête quand le score atteint 100."),
    M("roboticien", "programme un bras de robot avec des variables pour sa position."),
    F("game-designer", "crée des clones d'un personnage qui réagissent quand on leur envoie un message."),
  ],
  relatif_operation: [
    M("meteorologue", "calcule l'écart entre −5 °C la nuit et 12 °C l'après-midi : 17 degrés.", V),
    F("historien", "compte les années entre l'an −52 et l'an 2026.", V),
    F("biologiste", "suit une tortue qui plonge à −30 m puis remonte de 12 m : elle est à −18 m.", V),
    M("conseiller-bancaire", "suit un compte qui passe de −40 € à +25 € après un virement de 65 €."),
  ],
  fraction_nombre: [
    M("monteur", "sait qu'en vidéo une image dure 1/25 de seconde.", V),
    F("telepilote", "compare 3/4 et 5/8 de batterie avant de faire rentrer son drone.", V),
    F("musicien", "joue une valse en 3/4 : trois noires par mesure."),
    M("compositeur", "remplit une mesure à 4/4 : une blanche, une noire et deux croches."),
  ],
  fraction_calcul: [
    F("infirmier", "calcule les 3/4 d'une dose prescrite, puis en retire 1/8.", V),
    F("cuisinier", "additionne 1/3 et 1/4 de litre de crème : 7/12 de litre.", V),
    M("photographe", "règle une vitesse de 1/250 s : deux fois moins de lumière qu'à 1/125 s.", V),
    M("capitaine", "calcule la part du réservoir consommée en deux étapes du trajet.", V),
  ],
  puissance_ecriture: [
    M("astronome", "écrit la distance Terre-Soleil : 1,5 × 10⁸ km.", V),
    F("microelec", "dessine des circuits fins de quelques nanomètres : 10⁻⁹ m.", V),
    F("medecin", "compte des bactéries qui doublent : 2¹⁰ = 1 024 au bout de 10 divisions.", V),
    M("geologue", "date des roches vieilles de 4 × 10⁹ ans.", V),
  ],
  reperage: [
    M("pilote", "repère un aéroport par sa latitude et sa longitude."),
    F("cartographe", "place des points sur une carte grâce à leurs coordonnées."),
    M("game-designer", "place les objets d'un niveau avec leurs coordonnées (x ; y)."),
    F("navigateur", "fait le point en pleine mer avec sa latitude et sa longitude."),
  ],
  vision_espace: [
    F("animateur-3d", "modélise un personnage à partir de pavés, de cônes et de cylindres."),
    M("logisticien", "dessine le patron d'un carton pour le fabriquer à plat."),
    F("architecte", "construit une maquette à partir des vues de face et de dessus."),
  ],
  divisibilite: [
    F("choregraphe", "range 24 danseurs en rangées égales : 2, 3, 4, 6, 8 ou 12 par rangée.", V),
    M("patissier", "range 36 macarons dans des boîtes de 6 sans qu'il en reste.", V),
    F("paysagiste", "plante un arbre tous les 4 m sur une allée de 60 m.", V),
  ],
  nombre_premier: [
    F("cyber", "protège les messages avec des codes bâtis sur de très grands nombres premiers.", V),
    M("biologiste", "étudie des cigales qui sortent de terre tous les 13 ou 17 ans, deux nombres premiers."),
    F("musicien", "superpose un rythme à 3 temps et un rythme à 4 temps : ils retombent ensemble tous les 12."),
  ],
  ordre_grandeur: [
    M("journaliste", "vérifie qu'un chiffre tient debout : un million ou un milliard d'habitants ?"),
    F("data-analyst", "compte en gigaoctets et téraoctets : 1 To = 1 000 Go."),
    M("pharmacien", "dose en milligrammes et en microgrammes sans se tromper de préfixe."),
  ],
  prop_proportionnalite: [
    F("peintre", "garde le mélange de sa couleur : 2 parts de bleu pour 3 parts de jaune.", V),
    M("styliste", "agrandit un patron en gardant toutes ses proportions.", V),
    F("marin-pecheur", "calcule la distance parcourue à vitesse constante.", V),
    M("game-designer", "fait monter l'expérience au même rythme pour chaque monstre vaincu.", V),
  ],
  prop_ratio: [
    F("boulanger", "garde le ratio farine : eau = 5 : 3 pour que sa pâte lève bien.", V),
    M("ingenieur-son", "mixe la voix et la musique dans un ratio 3 : 2."),
    F("photographe", "choisit le format 16 : 9 ou 4 : 3 pour cadrer sa photo."),
  ],
  prop_pourcentages: [
    F("journaliste", "calcule qu'une hausse de 20 % fait passer un loyer de 500 € à 600 €.", V),
    M("vendeur", "applique −30 % sur une paire à 80 € : elle passe à 56 €.", V),
    F("epidemiologiste", "calcule le pourcentage d'habitants vaccinés dans une ville."),
    M("createur", "calcule son taux d'abonnement : 300 abonnés gagnés pour 6 000 vues, soit 5 %."),
  ],
  prop_echelle: [
    M("architecte", "réduit le plan d'un immeuble à l'échelle 1/200.", V),
    F("cartographe", "calcule une distance réelle sur une carte au 1/25 000.", V),
    M("patissier", "agrandit un gâteau : longueurs × 2, aire × 4.", V),
    F("soigneur", "lit le plan du zoo à l'échelle pour agrandir l'enclos des girafes.", V),
  ],
  litteral_expression: [
    M("developpeur", "écrit la formule du prix total, 3 × n + 5, dans son programme."),
    F("comptable", "tape une formule dans le tableur pour calculer chaque mois d'un coup."),
    M("preparateur-physique", "calcule la fréquence cardiaque maximale avec la formule 220 − âge."),
  ],
  litteral_distributivite: [
    F("vendeur", "calcule 4 × 2,99 € de tête : 4 × 3 − 4 × 0,01 = 11,96 €.", V),
    M("menuisier", "compte le bois de 3 étagères identiques : 3(x + 4) = 3x + 12.", V),
    F("carreleur", "calcule une pièce en L en la découpant en deux rectangles."),
    F("photographe", "calcule l'aire d'un cadre de x + 4 sur x + 2 : 4 morceaux, x² + 6x + 8.", V),
    F("maitre-nageur", "prépare 3 séries de x + 4 longueurs, plus 5 : 3(x + 4) + 5 = 3x + 17.", V),
    M("cuisinier", "prévoit x crêpes et 2 compotes par table pour 4 tables : 4(x + 2) = 4x + 8.", V),
  ],
  litteral_identite_remarquable: [
    F("architecte", "agrandit une terrasse carrée de 2 m sur chaque côté : son aire devient (a + 2)²."),
    M("comptable", "calcule 49 × 51 de tête : 50² − 1 = 2 499."),
    M("paysagiste", "calcule l'aire de l'allée qui entoure un bassin carré."),
  ],
  litteral_factorisation: [
    F("logisticien", "regroupe les frais communs à chaque livraison pour simplifier son calcul de coût."),
    M("game-designer", "simplifie la formule des points pour que le jeu calcule plus vite."),
    F("developpeur", "met un facteur commun en évidence pour faire moins d'opérations dans son programme."),
  ],
  equation_resolution: [
    F("monteur", "trouve combien de plans de 8 s tiennent dans une bande-annonce de 2 minutes.", V),
    M("veterinaire", "retrouve la masse d'un chien quand il a donné 30 mg d'un produit dosé à 2 mg par kilo.", V),
    F("dj", "cherche le tempo qui fait tenir son morceau dans le temps voulu.", V),
    M("garde-forestier", "calcule combien d'arbres planter par an pour reboiser une parcelle à temps.", V),
  ],
  pythagore_theoreme: [
    M("charpentier", "vérifie un angle droit avec la règle 3-4-5 : 3² + 4² = 5²."),
    F("telepilote", "calcule la distance en ligne droite entre elle et son drone."),
    F("ingenieur-btp", "calcule la longueur d'une rampe d'accès."),
  ],
  thales_theoreme: [
    M("geometre", "mesure la hauteur d'un arbre grâce à son ombre."),
    F("photographe", "calcule la taille d'un objet sur la photo selon sa distance à l'appareil."),
    M("architecte", "vérifie que deux poutres sont bien parallèles à partir de leurs mesures."),
  ],
  trigo_cosinus: [
    F("ingenieur-btp", "calcule l'angle d'une rampe pour qu'un fauteuil roulant puisse monter."),
    M("pilote", "calcule l'angle de descente vers la piste."),
    F("guide-montagne", "estime l'angle d'une pente avant de s'y engager."),
  ],
  triangle_figure: [
    M("ingenieur-btp", "démontre qu'une structure en triangles ne se déformera pas."),
    F("archeologue", "prouve qu'un ancien mur était droit à partir de mesures sur le terrain."),
    M("cyber", "enchaîne des preuves, comme en géométrie, pour démontrer qu'un système est sûr."),
  ],
  quadrilatere_parallelogramme: [
    M("mecanicien", "règle un parallélogramme articulé : un essuie-glace ou une lampe de bureau."),
    F("dessinateur-projeteur", "dessine les marches d'un escalier vues de côté."),
    F("graphiste", "crée un motif penché fait de parallélogrammes."),
  ],
  sym_transformation: [
    M("animateur-3d", "applique des translations et des rotations aux membres d'un personnage."),
    F("styliste", "fabrique un tissu en répétant un motif par translation."),
    F("danseur", "pivote d'un quart de tour : une rotation de 90°."),
  ],
  aire_perimetre: [
    M("eleveur", "calcule la longueur de grillage d'un enclos rond."),
    F("couturier", "calcule le galon qui borde une nappe ronde."),
    F("entraineur", "sait qu'un tour de piste fait 400 m et en déduit la distance de l'entraînement."),
  ],
  aire_surface: [
    F("technicien-energie", "calcule l'aire de panneaux solaires qu'il faut pour alimenter une école."),
    M("agriculteur", "calcule l'aire d'un champ en forme de trapèze."),
    F("macon", "calcule les mètres carrés d'enduit à commander."),
  ],
  volume_solide: [
    M("ingenieur-hydraulique", "calcule le volume d'un réservoir cylindrique."),
    F("patissier", "calcule le volume d'un moule pour préparer juste assez de pâte."),
    M("logisticien", "calcule le volume des colis que peut contenir un conteneur."),
  ],
  grandeur_composee: [
    M("dj", "compte en battements par minute pour caler deux morceaux.", V),
    F("agriculteur", "calcule son rendement en tonnes par hectare.", V),
    F("carreleur", "calcule le prix d'une pièce à partir du prix au m².", V),
    M("conducteur-bus", "calcule une vitesse moyenne en km/h pour tenir l'horaire."),
  ],
  stat_donnee: [
    F("veterinaire", "suit la courbe de poids d'un chiot semaine après semaine.", V),
    M("infirmier", "lit le relevé de température d'un patient sur la journée.", V),
    F("game-designer", "lit les statistiques des joueurs pour équilibrer un niveau.", V),
  ],
  stat_statistique: [
    F("technicien-energie", "calcule la production moyenne d'une éolienne sur un mois.", V),
    M("astronome", "calcule la médiane des luminosités d'un groupe d'étoiles.", V),
    F("analyste-sportif", "calcule la moyenne et l'étendue des temps d'une coureuse."),
  ],
  proba_experience: [
    M("game-designer", "calcule les chances d'obtenir un objet rare : 1 sur 20."),
    F("actuaire", "calcule le risque d'accident pour fixer le prix d'une assurance."),
    F("biologiste", "calcule les chances qu'un poussin ait des plumes blanches, selon la couleur de ses parents."),
  ],
  proba_frequence: [
    M("controleur-qualite", "estime la part de pièces défectueuses à partir d'un échantillon."),
    F("epidemiologiste", "compare la fréquence observée d'une maladie à celle qu'on attendait."),
    M("sondeur", "estime le résultat d'un vote à partir de 1 000 réponses."),
  ],
  fonction_dependance: [
    F("medecin", "suit la température d'un patient en fonction de l'heure."),
    M("technicien-energie", "trace la production des panneaux solaires selon l'heure de la journée."),
    F("ingenieur-son", "mesure le niveau sonore selon la distance à l'enceinte."),
  ],
};
