/* lib/defis-jour/problemes.fixed.ts */
import type { ProblemeDuJour } from "./types";

export const problemesFixed: ProblemeDuJour[] = [
  {
    id: "mission_lagon_poissons_001",
    title: "Mission lagon : compter pour protéger",
    theme: "Fractions & pourcentages",
    image: "/images/defis-du-jour/mission-lagon.webp",
    level: 3,
    statement:
      "Une association observe une zone du lagon de La Réunion. Sur un parcours, elle compte 240 poissons. Parmi eux, 3/8 sont des poissons-perroquets, 25 % sont des demoiselles, et les autres poissons appartiennent à d'autres espèces.",
    question:
      "Combien y a-t-il de poissons-perroquets ? Combien y a-t-il de demoiselles ? Combien reste-t-il d'autres poissons ?",
    expectedAnswer: "90 60 90",
    explanation:
      "3/8 de 240 : 240 ÷ 8 = 30, puis 30 × 3 = 90 poissons-perroquets. 25 % de 240, c'est un quart : 240 ÷ 4 = 60 demoiselles. Total identifié : 90 + 60 = 150. Il reste 240 − 150 = 90 autres poissons.",
    directions: [
      {
        id: "fraction",
        label: "Calculer les poissons-perroquets",
        type: "guided",
        content:
          "Commence par 3/8 de 240.\n240 ÷ 8 = 30, puis 30 × 3 = ?",
      },
      {
        id: "pourcentage",
        label: "Calculer les demoiselles",
        type: "guided",
        content:
          "25 %, c'est un quart.\nUn quart de 240 se calcule avec 240 ÷ 4.",
      },
      {
        id: "reste",
        label: "Trouver les autres poissons",
        type: "guided",
        content:
          "Additionne les poissons déjà identifiés, puis soustrais ce total à 240.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Tu dois trouver trois nombres : poissons-perroquets, demoiselles, autres poissons. Le total des trois doit faire 240.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi compter les espèces peut aider à protéger un lagon. Utilise les nombres du défi dans ton explication.",
      },
    ],
  },

  {
    id: "mission_lagon_surface_002",
    title: "Mission lagon : quadriller la zone",
    theme: "Aires & multiplication",
    image: "/images/defis-du-jour/mission-lagon.webp",
    level: 2,
    statement:
      "Pour observer le lagon sans déranger les espèces, une association découpe une zone en rectangles. La zone étudiée mesure 80 m de long et 35 m de large.",
    question:
      "Quelle est l'aire de la zone observée en mètres carrés ? Si un groupe d'élèves étudie 700 m², quelle fraction de la zone totale observe-t-il ?",
    expectedAnswer: "2800 1/4",
    explanation:
      "Aire du rectangle : 80 × 35 = 2 800 m². Le groupe observe 700 m². Comme 700 × 4 = 2 800, cela représente 1/4 de la zone totale.",
    directions: [
      {
        id: "aire",
        label: "Calculer l'aire",
        type: "guided",
        content:
          "Pour un rectangle, aire = longueur × largeur.\nCalcule 80 × 35.",
      },
      {
        id: "fraction",
        label: "Trouver la fraction",
        type: "guided",
        content:
          "Compare 700 m² à 2 800 m².\nCherche par combien il faut multiplier 700 pour obtenir 2 800.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "80 × 35 = 80 × 30 + 80 × 5. Ensuite, 700 est le quart de 2 800.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi quadriller une zone aide à mieux observer un milieu naturel.",
      },
    ],
  },

  {
    id: "mission_lagon_tortues_003",
    title: "Mission lagon : le passage des tortues",
    theme: "Tableau & moyenne",
    image: "/images/defis-du-jour/mission-lagon.webp",
    level: 3,
    statement:
      "Pendant quatre matinées, des élèves notent le nombre de tortues observées dans le lagon : lundi 3, mardi 5, mercredi 4, jeudi 8.",
    question:
      "Combien de tortues ont été observées au total ? Quelle est la moyenne par matinée ?",
    expectedAnswer: "20 5",
    explanation:
      "Total : 3 + 5 + 4 + 8 = 20 tortues. Il y a 4 matinées, donc la moyenne est 20 ÷ 4 = 5 tortues par matinée.",
    directions: [
      {
        id: "total",
        label: "Additionner les observations",
        type: "guided",
        content:
          "Additionne les quatre nombres : 3 + 5 + 4 + 8.",
      },
      {
        id: "moyenne",
        label: "Calculer la moyenne",
        type: "guided",
        content:
          "Une moyenne se calcule en divisant le total par le nombre d'observations.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Il y a 4 matinées. Après avoir trouvé le total, divise-le par 4.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi une moyenne peut aider à comparer deux périodes d'observation.",
      },
    ],
  },

  {
    id: "mission_lagon_coraux_004",
    title: "Mission lagon : les coraux fragiles",
    theme: "Pourcentages & comparaison",
    image: "/images/defis-du-jour/mission-lagon.webp",
    level: 4,
    statement:
      "Dans une petite zone du récif, 360 coraux sont observés. Les élèves estiment que 15 % sont blanchis et que 70 % semblent en bonne santé.",
    question:
      "Combien de coraux sont blanchis ? Combien semblent en bonne santé ? Combien restent dans un état intermédiaire ?",
    expectedAnswer: "54 252 54",
    explanation:
      "15 % de 360 = 54 coraux blanchis. 70 % de 360 = 252 coraux en bonne santé. Il reste 360 − 54 − 252 = 54 coraux dans un état intermédiaire.",
    directions: [
      {
        id: "blanchis",
        label: "Calculer 15 %",
        type: "guided",
        content:
          "10 % de 360 = 36 et 5 % de 360 = 18.\nDonc 15 % = 36 + 18.",
      },
      {
        id: "bonne_sante",
        label: "Calculer 70 %",
        type: "guided",
        content:
          "70 %, c'est 7 fois 10 %.\nCalcule 7 × 36.",
      },
      {
        id: "reste",
        label: "Calculer le reste",
        type: "guided",
        content:
          "Soustrais les deux groupes connus au total : 360 − 54 − 252.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Les trois groupes doivent ensemble faire 360 coraux.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique ce que peut indiquer le blanchissement des coraux pour un lagon.",
      },
    ],
  },

  {
    id: "mission_lagon_dechets_005",
    title: "Mission lagon : nettoyer sans compter",
    theme: "Proportionnalité & unités",
    image: "/images/defis-du-jour/mission-lagon.webp",
    level: 3,
    statement:
      "Lors d'une opération de nettoyage, 6 élèves ramassent 18 kg de déchets en une heure. On suppose que chaque élève ramasse la même masse.",
    question:
      "Combien de kilogrammes un élève ramasse-t-il en moyenne ? Combien 10 élèves pourraient-ils ramasser au même rythme ?",
    expectedAnswer: "3 30",
    explanation:
      "Un élève ramasse en moyenne 18 ÷ 6 = 3 kg. Au même rythme, 10 élèves ramasseraient 10 × 3 = 30 kg.",
    directions: [
      {
        id: "un_eleve",
        label: "Trouver pour 1 élève",
        type: "guided",
        content:
          "Si 6 élèves ramassent 18 kg, alors 1 élève ramasse 18 ÷ 6 kg.",
      },
      {
        id: "dix_eleves",
        label: "Passer à 10 élèves",
        type: "guided",
        content:
          "Quand tu connais la masse pour 1 élève, multiplie par 10.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "18 ÷ 6 = 3. Il reste à calculer 10 × 3.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi les déchets près du lagon peuvent poser problème aux animaux marins.",
      },
    ],
  },

  {
    id: "mission_lagon_temperature_006",
    title: "Mission lagon : l'eau se réchauffe",
    theme: "Écarts & décimaux",
    image: "/images/defis-du-jour/mission-lagon.webp",
    level: 4,
    statement:
      "Des élèves mesurent la température de l'eau du lagon. Le matin, elle est de 26,4 °C. L'après-midi, elle atteint 29,1 °C.",
    question:
      "De combien de degrés la température a-t-elle augmenté ? Si le seuil d'alerte est 30 °C, combien manque-t-il pour l'atteindre ?",
    expectedAnswer: "2.7 0.9",
    explanation:
      "Augmentation : 29,1 − 26,4 = 2,7 °C. Écart au seuil d'alerte : 30 − 29,1 = 0,9 °C.",
    directions: [
      {
        id: "augmentation",
        label: "Calculer l'augmentation",
        type: "guided",
        content:
          "Soustrais la température du matin à celle de l'après-midi : 29,1 − 26,4.",
      },
      {
        id: "seuil",
        label: "Comparer au seuil",
        type: "guided",
        content:
          "Pour savoir combien il manque avant 30 °C, calcule 30 − 29,1.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Tu peux écrire 30 comme 30,0 pour mieux soustraire les décimaux.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi la température de l'eau est importante pour les coraux et les poissons.",
      },
    ],
  },

  {
    id: "mission_lagon_synthese_007",
    title: "Mission lagon : bilan des observateurs",
    theme: "Synthèse & argumentation",
    image: "/images/defis-du-jour/mission-lagon.webp",
    level: 5,
    statement:
      "Cette semaine, tu as étudié le lagon avec des nombres : 240 poissons, 90 poissons-perroquets, 60 demoiselles, 2 800 m² observés, 20 tortues comptées, 360 coraux suivis et 30 kg de déchets possibles avec 10 élèves.",
    question:
      "Rédige une courte présentation de la mission lagon en utilisant au moins 4 données chiffrées. Explique pourquoi les maths peuvent aider à protéger le lagon.",
    expectedAnswer: "explication",
    explanation:
      "Une bonne réponse utilise plusieurs données et les relie au sens de la mission. Exemple : Les élèves ont observé 240 poissons, dont 90 poissons-perroquets et 60 demoiselles. Ils ont aussi étudié 2 800 m² de lagon et suivi 360 coraux. Les maths permettent de compter, comparer et repérer les changements pour mieux protéger le milieu.",
    directions: [
      {
        id: "choisir_chiffres",
        label: "Choisir les chiffres clés",
        type: "guided",
        content:
          "Choisis au moins 4 chiffres parmi : 240 poissons, 90 poissons-perroquets, 60 demoiselles, 2 800 m², 20 tortues, 360 coraux, 30 kg.",
      },
      {
        id: "organiser",
        label: "Organiser ma réponse",
        type: "guided",
        content:
          "Écris en 3 phrases :\n1. Présente la mission.\n2. Donne des observations chiffrées.\n3. Explique à quoi servent ces nombres.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Tu peux commencer par : Les maths aident à protéger le lagon parce qu'elles permettent de mesurer...",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Rédige comme si tu présentais la mission à une autre classe.",
      },
    ],
  },

  // Anciens défis Grand Raid conservés hors programmation.
  // On les garde comme réserve pour une future semaine sportive.
  {
    id: "grand_raid_distance_001",
    title: "Grand Raid : les kilomètres de l'île",
    theme: "Distance & addition",
    image: "/images/defis-du-jour/grand_raid_2026.webp",
    level: 1,
    statement:
      "Le Grand Raid de La Réunion, surnommé « la Diagonale des Fous », traverse l'île du sud au nord sur 165 km. La course se découpe en grandes sections : 42 km jusqu'à Cilaos, puis 58 km jusqu'à Salazie, puis 65 km jusqu'à Saint-Denis.",
    question:
      "Vérifie que 42 + 58 + 65 = 165. Puis calcule : si un coureur a déjà parcouru 42 km et 58 km, combien de kilomètres lui reste-t-il avant l'arrivée ?",
    expectedAnswer: "65",
    explanation:
      "42 + 58 = 100 km parcourus. Il reste 165 − 100 = 65 km jusqu'à Saint-Denis. C'est la dernière grande section du Grand Raid, et souvent la plus difficile pour les jambes fatiguées !",
    directions: [
      {
        id: "addition",
        label: "Additionner les sections",
        type: "guided",
        content:
          "Commence par additionner les deux premières sections : 42 + 58 = ?\nEnsuite soustrait ce total à 165.",
      },
      {
        id: "soustraction",
        label: "Calculer ce qu'il reste",
        type: "guided",
        content:
          "Distance totale : 165 km. Distance déjà parcourue : 42 + 58 km.\nIl reste : 165 − (42 + 58).",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "42 + 58 = 100 (astuce : 40 + 60 = 100, puis +2 et −2). Donc il reste 165 − 100 = ?",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique comment tu calcules une distance restante à parcourir. Tu peux prendre l'exemple d'un trajet que tu connais.",
      },
    ],
  },

  {
    id: "grand_raid_vitesse_001",
    title: "Grand Raid : la vitesse du champion",
    theme: "Vitesse & division",
    image: "/images/defis-du-jour/grand_raid_2026.webp",
    level: 2,
    statement:
      "En 2017, le Français François D'Haene a remporté le Grand Raid en établissant un record : il a parcouru les 165 km en 23 heures et 27 minutes. Pour simplifier, on arrondira son temps à 23 heures.",
    question:
      "Calcule la vitesse moyenne de François D'Haene en km/h. Arrondi au dixième près.",
    expectedAnswer: "7.2",
    explanation:
      "Vitesse = Distance ÷ Temps = 165 ÷ 23 ≈ 7,17 km/h, soit environ 7,2 km/h. C'est la vitesse d'un bon joggeur… mais maintenue pendant 23 heures, en montagne, avec près de 10 000 m de dénivelé !",
    directions: [
      {
        id: "formule",
        label: "Utiliser la formule Vitesse",
        type: "guided",
        content:
          "Vitesse = Distance ÷ Temps.\nDistance = 165 km. Temps = 23 h.\n165 ÷ 23 = ?",
      },
      {
        id: "calcul",
        label: "Faire la division",
        type: "guided",
        content:
          "23 × 7 = 161. 23 × 7,2 = 165,6. Donc 165 ÷ 23 est très proche de 7,2.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Cherche combien de fois 23 entre dans 165. Essaie 23 × 7 = 161, puis 23 × 7,2 = 165,6.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi on divise la distance par le temps pour obtenir une vitesse. Donne un exemple de la vie quotidienne.",
      },
    ],
  },

  {
    id: "grand_raid_denivele_001",
    title: "Grand Raid : grimper les cirques",
    theme: "Dénivelé & proportionnalité",
    image: "/images/defis-du-jour/grand_raid_2026.webp",
    level: 3,
    statement:
      "Le Grand Raid cumule 9 600 mètres de dénivelé positif (montée totale) sur 165 km. Les coureurs traversent les trois cirques de La Réunion : Cilaos, Mafate et Salazie. Un coureur a déjà parcouru 55 km.",
    question:
      "En supposant que le dénivelé est régulièrement réparti sur tout le parcours, quel dénivelé positif ce coureur a-t-il déjà gravi ? Arrondi à la centaine près.",
    expectedAnswer: "3200",
    explanation:
      "Dénivelé moyen par km = 9 600 ÷ 165 ≈ 58,2 m/km. Sur 55 km : 58,2 × 55 = 3 200 m (arrondi à la centaine). C'est l'équivalent de gravir la Tour Eiffel plus de 9 fois !",
    directions: [
      {
        id: "proportion",
        label: "Raisonner par proportion",
        type: "guided",
        content:
          "Si 165 km correspondent à 9 600 m de dénivelé, alors 55 km correspondent à :\n55 × 9 600 ÷ 165 = ?",
      },
      {
        id: "denivele_km",
        label: "Calculer le dénivelé par km",
        type: "guided",
        content:
          "Dénivelé par km = 9 600 ÷ 165 ≈ 58 m/km.\nPour 55 km : 58 × 55 = ?",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "55 ÷ 165 = 1/3 environ. Donc le dénivelé est environ 9 600 ÷ 3 = 3 200 m.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique ce qu'est le dénivelé positif. Pourquoi est-ce plus difficile de courir avec beaucoup de dénivelé qu'en terrain plat ?",
      },
    ],
  },

  {
    id: "grand_raid_ravitaillement_001",
    title: "Grand Raid : les postes de ravitaillement",
    theme: "Fractions & partage",
    image: "/images/defis-du-jour/grand_raid_2026.webp",
    level: 3,
    statement:
      "Le Grand Raid compte 16 postes de ravitaillement répartis sur les 165 km. À chaque poste, les bénévoles préparent 2,5 litres d'eau pour chaque coureur prévu. Cette année, 2 400 coureurs sont inscrits.",
    question:
      "Combien de litres d'eau au total les bénévoles doivent-ils préparer pour l'ensemble des 16 postes ? Donne ta réponse en litres.",
    expectedAnswer: "96000",
    explanation:
      "Pour un poste : 2,5 × 2 400 = 6 000 litres. Pour 16 postes : 6 000 × 16 = 96 000 litres. C'est l'équivalent de 96 000 bouteilles d'un litre — la logistique du Grand Raid mobilise des centaines de bénévoles !",
    directions: [
      {
        id: "par_poste",
        label: "Calculer par poste",
        type: "guided",
        content:
          "Commence par calculer le total d'eau pour UN poste : 2,5 L × 2 400 coureurs = ?\nEnsuite multiplie par 16 postes.",
      },
      {
        id: "multiplication",
        label: "Faire les multiplications",
        type: "guided",
        content:
          "Étape 1 : 2,5 × 2 400 = 6 000 L par poste.\nÉtape 2 : 6 000 × 16 = ?",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "6 000 × 16 = 6 000 × 10 + 6 000 × 6 = 60 000 + 36 000 = 96 000.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi il faut multiplier deux fois dans ce problème. Qu'est-ce qu'on calcule à chaque étape ?",
      },
    ],
  },

  {
    id: "grand_raid_abandon_001",
    title: "Grand Raid : ceux qui abandonnent",
    theme: "Pourcentages & statistiques",
    image: "/images/defis-du-jour/grand_raid_2026.webp",
    level: 4,
    statement:
      "Le Grand Raid est une course extrême. En moyenne, environ 40 % des coureurs n'atteignent pas la ligne d'arrivée (abandon, blessure, dépassement du temps limite). Cette année, 2 400 coureurs s'élancent au départ.",
    question:
      "Combien de coureurs terminent la course cette année ? Combien abandonnent ?",
    expectedAnswer: "1440",
    explanation:
      "40 % abandonnent : 2 400 × 40 ÷ 100 = 960 coureurs abandonnent. Il reste 2 400 − 960 = 1 440 finishers. On peut aussi calculer directement : 60 % terminent → 2 400 × 0,6 = 1 440.",
    directions: [
      {
        id: "pourcentage_abandon",
        label: "Calculer les abandons",
        type: "guided",
        content:
          "40 % de 2 400 = 2 400 × 40 ÷ 100.\nEnsuite : finishers = 2 400 − abandons.",
      },
      {
        id: "pourcentage_finishers",
        label: "Calculer les finishers directement",
        type: "guided",
        content:
          "Si 40 % abandonnent, alors 60 % terminent.\n60 % de 2 400 = 2 400 × 0,6 = ?",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "10 % de 2 400 = 240. Donc 40 % = 4 × 240 = 960 abandons. Finishers = 2 400 − 960.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique la différence entre calculer 40 % et calculer 60 % d'un total. Lequel est plus rapide ici, et pourquoi ?",
      },
    ],
  },

  {
    id: "grand_raid_classement_001",
    title: "Grand Raid : les temps au classement",
    theme: "Durées & comparaison",
    image: "/images/defis-du-jour/grand_raid_2026.webp",
    level: 4,
    statement:
      "Les trois premiers coureurs à l'arrivée ont réalisé les temps suivants :\n• 1er : 23 h 27 min\n• 2e : 24 h 05 min\n• 3e : 24 h 38 min\nLe temps limite pour valider la course est de 67 heures.",
    question:
      "Quel écart en minutes sépare le 1er du 3e ? Combien d'heures restaient-il au vainqueur par rapport au temps limite ?",
    expectedAnswer: "71",
    explanation:
      "Écart entre 1er et 3e : (24 h 38 min) − (23 h 27 min) = 1 h 11 min = 71 minutes.\nTemps restant pour le vainqueur : 67 h − 23 h 27 min = 43 h 33 min. Le vainqueur a terminé avec encore 43 heures et 33 minutes d'avance sur la limite !",
    directions: [
      {
        id: "soustraction_durees",
        label: "Soustraire des durées",
        type: "guided",
        content:
          "Convertis les temps en minutes :\n• 23 h 27 min = 23 × 60 + 27 = 1 407 min\n• 24 h 38 min = 24 × 60 + 38 = 1 478 min\nÉcart = 1 478 − 1 407 = ?",
      },
      {
        id: "calcul_ecart",
        label: "Calculer l'écart directement",
        type: "guided",
        content:
          "De 23 h 27 min à 24 h 38 min : il y a 1 heure (de 23h27 à 24h27) puis 11 minutes (de 24h27 à 24h38).\nTotal : 1 h 11 min = 71 min.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "De 23 h 27 à 24 h 27 = 60 min. De 24 h 27 à 24 h 38 = 11 min. Total = 60 + 11 = 71 min.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique comment calculer un écart de temps quand on a des heures et des minutes. Quelle difficulté peut apparaître avec les minutes ?",
      },
    ],
  },

  {
    id: "grand_raid_synthese_001",
    title: "Grand Raid : raconter la Diagonale des Fous",
    theme: "Synthèse & argumentation",
    image: "/images/defis-du-jour/grand_raid_2026.webp",
    level: 5,
    statement:
      "Cette semaine, tu as travaillé avec de vraies données du Grand Raid de La Réunion : 165 km de course, 9 600 m de dénivelé, une vitesse record de 7,2 km/h sur 23 heures, 96 000 litres d'eau préparés, 1 440 finishers sur 2 400 partants, et un écart de 71 minutes entre le 1er et le 3e.",
    question:
      "Rédige une courte présentation du Grand Raid en utilisant au moins 4 de ces données chiffrées. Explique pourquoi cette course mérite le surnom « Diagonale des Fous ».",
    expectedAnswer: "explication",
    explanation:
      "Une bonne réponse mobilise au moins 4 données et les explique. Exemple : Le Grand Raid traverse La Réunion sur 165 km avec 9 600 m de dénivelé. Le record est de 23 heures à 7,2 km/h en moyenne — un rythme de joggeur maintenu une journée entière en montagne. Seulement 60 % des 2 400 partants terminent. Voilà pourquoi on l'appelle la « Diagonale des Fous » !",
    directions: [
      {
        id: "mots_cles",
        label: "Utiliser les mots clés",
        type: "guided",
        content:
          "Essaie d'utiliser les mots : distance, dénivelé, vitesse, cirque, abandon, finisher, bénévoles, La Réunion.",
      },
      {
        id: "chiffres_cles",
        label: "Choisir les chiffres importants",
        type: "guided",
        content:
          "Choisis au moins 4 chiffres parmi : 165 km, 9 600 m, 7,2 km/h, 23 h, 96 000 L, 1 440 finishers, 71 min.",
      },
      {
        id: "structure",
        label: "Structurer ma réponse",
        type: "guided",
        content:
          "Écris en 3 phrases :\n1. Présente la course (distance, dénivelé, île).\n2. Décris le record ou les conditions avec des chiffres.\n3. Explique pourquoi c'est « fou » avec les chiffres d'abandon ou de logistique.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Compare une donnée du Grand Raid avec quelque chose de concret : 9 600 m de dénivelé, c'est presque l'Everest (8 849 m). Ça aide le lecteur à comprendre l'ampleur.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Rédige comme si tu expliquais à un camarade qui n'a jamais entendu parler du Grand Raid. Quels chiffres le surprendraient le plus ?",
      },
    ],
  },
];
