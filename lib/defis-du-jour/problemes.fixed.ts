/* lib/defis-jour/problemes.fixed.ts */
import type { ProblemeDuJour } from "./types";

export const problemesFixed: ProblemeDuJour[] = [
  {
    id: "mission_lagon_poissons_001",
    title: "Mission lagon : compter pour protÃ©ger",
    theme: "Fractions & pourcentages",
    image: "/images/lagon.webp",
    level: 3,
    statement:
      "Une association observe une zone du lagon de La RÃ©union. Sur un parcours, elle compte 240 poissons. Parmi eux, 3/8 sont des poissons-perroquets, 25 % sont des demoiselles, et les autres poissons appartiennent Ã  d'autres espÃ¨ces.",
    question:
      "Combien y a-t-il de poissons-perroquets ? Combien y a-t-il de demoiselles ? Combien reste-t-il d'autres poissons ?",
    expectedAnswer: "90 60 90",
    explanation:
      "3/8 de 240 : 240 Ã· 8 = 30, puis 30 Ã— 3 = 90 poissons-perroquets. 25 % de 240, c'est un quart : 240 Ã· 4 = 60 demoiselles. Total identifiÃ© : 90 + 60 = 150. Il reste 240 âˆ’ 150 = 90 autres poissons.",
    directions: [
      {
        id: "fraction",
        label: "Calculer les poissons-perroquets",
        type: "guided",
        content:
          "Commence par 3/8 de 240.\n240 Ã· 8 = 30, puis 30 Ã— 3 = ?",
      },
      {
        id: "pourcentage",
        label: "Calculer les demoiselles",
        type: "guided",
        content:
          "25 %, c'est un quart.\nUn quart de 240 se calcule avec 240 Ã· 4.",
      },
      {
        id: "reste",
        label: "Trouver les autres poissons",
        type: "guided",
        content:
          "Additionne les poissons dÃ©jÃ  identifiÃ©s, puis soustrais ce total Ã  240.",
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
          "Explique pourquoi compter les espÃ¨ces peut aider Ã  protÃ©ger un lagon. Utilise les nombres du dÃ©fi dans ton explication.",
      },
    ],
  },

  {
    id: "mission_lagon_surface_002",
    title: "Mission lagon : quadriller la zone",
    theme: "Aires & multiplication",
    image: "/images/lagon.webp",
    level: 2,
    statement:
      "Pour observer le lagon sans dÃ©ranger les espÃ¨ces, une association dÃ©coupe une zone en rectangles. La zone Ã©tudiÃ©e mesure 80 m de long et 35 m de large.",
    question:
      "Quelle est l'aire de la zone observÃ©e en mÃ¨tres carrÃ©s ? Si un groupe d'Ã©lÃ¨ves Ã©tudie 700 mÂ², quelle fraction de la zone totale observe-t-il ?",
    expectedAnswer: "2800 1/4",
    explanation:
      "Aire du rectangle : 80 Ã— 35 = 2 800 mÂ². Le groupe observe 700 mÂ². Comme 700 Ã— 4 = 2 800, cela reprÃ©sente 1/4 de la zone totale.",
    directions: [
      {
        id: "aire",
        label: "Calculer l'aire",
        type: "guided",
        content:
          "Pour un rectangle, aire = longueur Ã— largeur.\nCalcule 80 Ã— 35.",
      },
      {
        id: "fraction",
        label: "Trouver la fraction",
        type: "guided",
        content:
          "Compare 700 mÂ² Ã  2 800 mÂ².\nCherche par combien il faut multiplier 700 pour obtenir 2 800.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "80 Ã— 35 = 80 Ã— 30 + 80 Ã— 5. Ensuite, 700 est le quart de 2 800.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi quadriller une zone aide Ã  mieux observer un milieu naturel.",
      },
    ],
  },

  {
    id: "mission_lagon_tortues_003",
    title: "Mission lagon : le passage des tortues",
    theme: "Tableau & moyenne",
    image: "/images/lagon.webp",
    level: 3,
    statement:
      "Pendant quatre matinÃ©es, des Ã©lÃ¨ves notent le nombre de tortues observÃ©es dans le lagon : lundi 3, mardi 5, mercredi 4, jeudi 8.",
    question:
      "Combien de tortues ont Ã©tÃ© observÃ©es au total ? Quelle est la moyenne par matinÃ©e ?",
    expectedAnswer: "20 5",
    explanation:
      "Total : 3 + 5 + 4 + 8 = 20 tortues. Il y a 4 matinÃ©es, donc la moyenne est 20 Ã· 4 = 5 tortues par matinÃ©e.",
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
          "Il y a 4 matinÃ©es. AprÃ¨s avoir trouvÃ© le total, divise-le par 4.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi une moyenne peut aider Ã  comparer deux pÃ©riodes d'observation.",
      },
    ],
  },

  {
    id: "mission_lagon_coraux_004",
    title: "Mission lagon : les coraux fragiles",
    theme: "Pourcentages & comparaison",
    image: "/images/lagon.webp",
    level: 4,
    statement:
      "Dans une petite zone du rÃ©cif, 360 coraux sont observÃ©s. Les Ã©lÃ¨ves estiment que 15 % sont blanchis et que 70 % semblent en bonne santÃ©.",
    question:
      "Combien de coraux sont blanchis ? Combien semblent en bonne santÃ© ? Combien restent dans un Ã©tat intermÃ©diaire ?",
    expectedAnswer: "54 252 54",
    explanation:
      "15 % de 360 = 54 coraux blanchis. 70 % de 360 = 252 coraux en bonne santÃ©. Il reste 360 âˆ’ 54 âˆ’ 252 = 54 coraux dans un Ã©tat intermÃ©diaire.",
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
          "70 %, c'est 7 fois 10 %.\nCalcule 7 Ã— 36.",
      },
      {
        id: "reste",
        label: "Calculer le reste",
        type: "guided",
        content:
          "Soustrais les deux groupes connus au total : 360 âˆ’ 54 âˆ’ 252.",
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
    theme: "ProportionnalitÃ© & unitÃ©s",
    image: "/images/lagon.webp",
    level: 3,
    statement:
      "Lors d'une opÃ©ration de nettoyage, 6 Ã©lÃ¨ves ramassent 18 kg de dÃ©chets en une heure. On suppose que chaque Ã©lÃ¨ve ramasse la mÃªme masse.",
    question:
      "Combien de kilogrammes un Ã©lÃ¨ve ramasse-t-il en moyenne ? Combien 10 Ã©lÃ¨ves pourraient-ils ramasser au mÃªme rythme ?",
    expectedAnswer: "3 30",
    explanation:
      "Un Ã©lÃ¨ve ramasse en moyenne 18 Ã· 6 = 3 kg. Au mÃªme rythme, 10 Ã©lÃ¨ves ramasseraient 10 Ã— 3 = 30 kg.",
    directions: [
      {
        id: "un_eleve",
        label: "Trouver pour 1 Ã©lÃ¨ve",
        type: "guided",
        content:
          "Si 6 Ã©lÃ¨ves ramassent 18 kg, alors 1 Ã©lÃ¨ve ramasse 18 Ã· 6 kg.",
      },
      {
        id: "dix_eleves",
        label: "Passer Ã  10 Ã©lÃ¨ves",
        type: "guided",
        content:
          "Quand tu connais la masse pour 1 Ã©lÃ¨ve, multiplie par 10.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "18 Ã· 6 = 3. Il reste Ã  calculer 10 Ã— 3.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi les dÃ©chets prÃ¨s du lagon peuvent poser problÃ¨me aux animaux marins.",
      },
    ],
  },

  {
    id: "mission_lagon_temperature_006",
    title: "Mission lagon : l'eau se rÃ©chauffe",
    theme: "Ã‰carts & dÃ©cimaux",
    image: "/images/lagon.webp",
    level: 4,
    statement:
      "Des Ã©lÃ¨ves mesurent la tempÃ©rature de l'eau du lagon. Le matin, elle est de 26,4 Â°C. L'aprÃ¨s-midi, elle atteint 29,1 Â°C.",
    question:
      "De combien de degrÃ©s la tempÃ©rature a-t-elle augmentÃ© ? Si le seuil d'alerte est 30 Â°C, combien manque-t-il pour l'atteindre ?",
    expectedAnswer: "2.7 0.9",
    explanation:
      "Augmentation : 29,1 âˆ’ 26,4 = 2,7 Â°C. Ã‰cart au seuil d'alerte : 30 âˆ’ 29,1 = 0,9 Â°C.",
    directions: [
      {
        id: "augmentation",
        label: "Calculer l'augmentation",
        type: "guided",
        content:
          "Soustrais la tempÃ©rature du matin Ã  celle de l'aprÃ¨s-midi : 29,1 âˆ’ 26,4.",
      },
      {
        id: "seuil",
        label: "Comparer au seuil",
        type: "guided",
        content:
          "Pour savoir combien il manque avant 30 Â°C, calcule 30 âˆ’ 29,1.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Tu peux Ã©crire 30 comme 30,0 pour mieux soustraire les dÃ©cimaux.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi la tempÃ©rature de l'eau est importante pour les coraux et les poissons.",
      },
    ],
  },

  {
    id: "mission_lagon_synthese_007",
    title: "Mission lagon : bilan des observateurs",
    theme: "SynthÃ¨se & argumentation",
    image: "/images/lagon.webp",
    level: 5,
    statement:
      "Cette semaine, tu as Ã©tudiÃ© le lagon avec des nombres : 240 poissons, 90 poissons-perroquets, 60 demoiselles, 2 800 mÂ² observÃ©s, 20 tortues comptÃ©es, 360 coraux suivis et 30 kg de dÃ©chets possibles avec 10 Ã©lÃ¨ves.",
    question:
      "RÃ©dige une courte prÃ©sentation de la mission lagon en utilisant au moins 4 donnÃ©es chiffrÃ©es. Explique pourquoi les maths peuvent aider Ã  protÃ©ger le lagon.",
    expectedAnswer: "explication",
    explanation:
      "Une bonne rÃ©ponse utilise plusieurs donnÃ©es et les relie au sens de la mission. Exemple : Les Ã©lÃ¨ves ont observÃ© 240 poissons, dont 90 poissons-perroquets et 60 demoiselles. Ils ont aussi Ã©tudiÃ© 2 800 mÂ² de lagon et suivi 360 coraux. Les maths permettent de compter, comparer et repÃ©rer les changements pour mieux protÃ©ger le milieu.",
    directions: [
      {
        id: "choisir_chiffres",
        label: "Choisir les chiffres clÃ©s",
        type: "guided",
        content:
          "Choisis au moins 4 chiffres parmi : 240 poissons, 90 poissons-perroquets, 60 demoiselles, 2 800 mÂ², 20 tortues, 360 coraux, 30 kg.",
      },
      {
        id: "organiser",
        label: "Organiser ma rÃ©ponse",
        type: "guided",
        content:
          "Ã‰cris en 3 phrases :\n1. PrÃ©sente la mission.\n2. Donne des observations chiffrÃ©es.\n3. Explique Ã  quoi servent ces nombres.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Tu peux commencer par : Les maths aident Ã  protÃ©ger le lagon parce qu'elles permettent de mesurer...",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "RÃ©dige comme si tu prÃ©sentais la mission Ã  une autre classe.",
      },
    ],
  },

  // Anciens dÃ©fis Grand Raid conservÃ©s hors programmation.
  // On les garde comme rÃ©serve pour une future semaine sportive.
  {
    id: "grand_raid_distance_001",
    title: "Grand Raid : les kilomÃ¨tres de l'Ã®le",
    theme: "Distance & addition",
    image: "/images/defis-du-jour/grand_raid_2026.webp",
    level: 1,
    statement:
      "Le Grand Raid de La RÃ©union, surnommÃ© Â« la Diagonale des Fous Â», traverse l'Ã®le du sud au nord sur 165 km. La course se dÃ©coupe en grandes sections : 42 km jusqu'Ã  Cilaos, puis 58 km jusqu'Ã  Salazie, puis 65 km jusqu'Ã  Saint-Denis.",
    question:
      "VÃ©rifie que 42 + 58 + 65 = 165. Puis calcule : si un coureur a dÃ©jÃ  parcouru 42 km et 58 km, combien de kilomÃ¨tres lui reste-t-il avant l'arrivÃ©e ?",
    expectedAnswer: "65",
    explanation:
      "42 + 58 = 100 km parcourus. Il reste 165 âˆ’ 100 = 65 km jusqu'Ã  Saint-Denis. C'est la derniÃ¨re grande section du Grand Raid, et souvent la plus difficile pour les jambes fatiguÃ©es !",
    directions: [
      {
        id: "addition",
        label: "Additionner les sections",
        type: "guided",
        content:
          "Commence par additionner les deux premiÃ¨res sections : 42 + 58 = ?\nEnsuite soustrait ce total Ã  165.",
      },
      {
        id: "soustraction",
        label: "Calculer ce qu'il reste",
        type: "guided",
        content:
          "Distance totale : 165 km. Distance dÃ©jÃ  parcourue : 42 + 58 km.\nIl reste : 165 âˆ’ (42 + 58).",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "42 + 58 = 100 (astuce : 40 + 60 = 100, puis +2 et âˆ’2). Donc il reste 165 âˆ’ 100 = ?",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique comment tu calcules une distance restante Ã  parcourir. Tu peux prendre l'exemple d'un trajet que tu connais.",
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
      "En 2017, le FranÃ§ais FranÃ§ois D'Haene a remportÃ© le Grand Raid en Ã©tablissant un record : il a parcouru les 165 km en 23 heures et 27 minutes. Pour simplifier, on arrondira son temps Ã  23 heures.",
    question:
      "Calcule la vitesse moyenne de FranÃ§ois D'Haene en km/h. Arrondi au dixiÃ¨me prÃ¨s.",
    expectedAnswer: "7.2",
    explanation:
      "Vitesse = Distance Ã· Temps = 165 Ã· 23 â‰ˆ 7,17 km/h, soit environ 7,2 km/h. C'est la vitesse d'un bon joggeurâ€¦ mais maintenue pendant 23 heures, en montagne, avec prÃ¨s de 10 000 m de dÃ©nivelÃ© !",
    directions: [
      {
        id: "formule",
        label: "Utiliser la formule Vitesse",
        type: "guided",
        content:
          "Vitesse = Distance Ã· Temps.\nDistance = 165 km. Temps = 23 h.\n165 Ã· 23 = ?",
      },
      {
        id: "calcul",
        label: "Faire la division",
        type: "guided",
        content:
          "23 Ã— 7 = 161. 23 Ã— 7,2 = 165,6. Donc 165 Ã· 23 est trÃ¨s proche de 7,2.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Cherche combien de fois 23 entre dans 165. Essaie 23 Ã— 7 = 161, puis 23 Ã— 7,2 = 165,6.",
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
    theme: "DÃ©nivelÃ© & proportionnalitÃ©",
    image: "/images/defis-du-jour/grand_raid_2026.webp",
    level: 3,
    statement:
      "Le Grand Raid cumule 9 600 mÃ¨tres de dÃ©nivelÃ© positif (montÃ©e totale) sur 165 km. Les coureurs traversent les trois cirques de La RÃ©union : Cilaos, Mafate et Salazie. Un coureur a dÃ©jÃ  parcouru 55 km.",
    question:
      "En supposant que le dÃ©nivelÃ© est rÃ©guliÃ¨rement rÃ©parti sur tout le parcours, quel dÃ©nivelÃ© positif ce coureur a-t-il dÃ©jÃ  gravi ? Arrondi Ã  la centaine prÃ¨s.",
    expectedAnswer: "3200",
    explanation:
      "DÃ©nivelÃ© moyen par km = 9 600 Ã· 165 â‰ˆ 58,2 m/km. Sur 55 km : 58,2 Ã— 55 = 3 200 m (arrondi Ã  la centaine). C'est l'Ã©quivalent de gravir la Tour Eiffel plus de 9 fois !",
    directions: [
      {
        id: "proportion",
        label: "Raisonner par proportion",
        type: "guided",
        content:
          "Si 165 km correspondent Ã  9 600 m de dÃ©nivelÃ©, alors 55 km correspondent Ã  :\n55 Ã— 9 600 Ã· 165 = ?",
      },
      {
        id: "denivele_km",
        label: "Calculer le dÃ©nivelÃ© par km",
        type: "guided",
        content:
          "DÃ©nivelÃ© par km = 9 600 Ã· 165 â‰ˆ 58 m/km.\nPour 55 km : 58 Ã— 55 = ?",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "55 Ã· 165 = 1/3 environ. Donc le dÃ©nivelÃ© est environ 9 600 Ã· 3 = 3 200 m.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique ce qu'est le dÃ©nivelÃ© positif. Pourquoi est-ce plus difficile de courir avec beaucoup de dÃ©nivelÃ© qu'en terrain plat ?",
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
      "Le Grand Raid compte 16 postes de ravitaillement rÃ©partis sur les 165 km. Ã€ chaque poste, les bÃ©nÃ©voles prÃ©parent 2,5 litres d'eau pour chaque coureur prÃ©vu. Cette annÃ©e, 2 400 coureurs sont inscrits.",
    question:
      "Combien de litres d'eau au total les bÃ©nÃ©voles doivent-ils prÃ©parer pour l'ensemble des 16 postes ? Donne ta rÃ©ponse en litres.",
    expectedAnswer: "96000",
    explanation:
      "Pour un poste : 2,5 Ã— 2 400 = 6 000 litres. Pour 16 postes : 6 000 Ã— 16 = 96 000 litres. C'est l'Ã©quivalent de 96 000 bouteilles d'un litre â€” la logistique du Grand Raid mobilise des centaines de bÃ©nÃ©voles !",
    directions: [
      {
        id: "par_poste",
        label: "Calculer par poste",
        type: "guided",
        content:
          "Commence par calculer le total d'eau pour UN poste : 2,5 L Ã— 2 400 coureurs = ?\nEnsuite multiplie par 16 postes.",
      },
      {
        id: "multiplication",
        label: "Faire les multiplications",
        type: "guided",
        content:
          "Ã‰tape 1 : 2,5 Ã— 2 400 = 6 000 L par poste.\nÃ‰tape 2 : 6 000 Ã— 16 = ?",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "6 000 Ã— 16 = 6 000 Ã— 10 + 6 000 Ã— 6 = 60 000 + 36 000 = 96 000.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi il faut multiplier deux fois dans ce problÃ¨me. Qu'est-ce qu'on calcule Ã  chaque Ã©tape ?",
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
      "Le Grand Raid est une course extrÃªme. En moyenne, environ 40 % des coureurs n'atteignent pas la ligne d'arrivÃ©e (abandon, blessure, dÃ©passement du temps limite). Cette annÃ©e, 2 400 coureurs s'Ã©lancent au dÃ©part.",
    question:
      "Combien de coureurs terminent la course cette annÃ©e ? Combien abandonnent ?",
    expectedAnswer: "1440",
    explanation:
      "40 % abandonnent : 2 400 Ã— 40 Ã· 100 = 960 coureurs abandonnent. Il reste 2 400 âˆ’ 960 = 1 440 finishers. On peut aussi calculer directement : 60 % terminent â†’ 2 400 Ã— 0,6 = 1 440.",
    directions: [
      {
        id: "pourcentage_abandon",
        label: "Calculer les abandons",
        type: "guided",
        content:
          "40 % de 2 400 = 2 400 Ã— 40 Ã· 100.\nEnsuite : finishers = 2 400 âˆ’ abandons.",
      },
      {
        id: "pourcentage_finishers",
        label: "Calculer les finishers directement",
        type: "guided",
        content:
          "Si 40 % abandonnent, alors 60 % terminent.\n60 % de 2 400 = 2 400 Ã— 0,6 = ?",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "10 % de 2 400 = 240. Donc 40 % = 4 Ã— 240 = 960 abandons. Finishers = 2 400 âˆ’ 960.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique la diffÃ©rence entre calculer 40 % et calculer 60 % d'un total. Lequel est plus rapide ici, et pourquoi ?",
      },
    ],
  },

  {
    id: "grand_raid_classement_001",
    title: "Grand Raid : les temps au classement",
    theme: "DurÃ©es & comparaison",
    image: "/images/defis-du-jour/grand_raid_2026.webp",
    level: 4,
    statement:
      "Les trois premiers coureurs Ã  l'arrivÃ©e ont rÃ©alisÃ© les temps suivants :\nâ€¢ 1er : 23 h 27 min\nâ€¢ 2e : 24 h 05 min\nâ€¢ 3e : 24 h 38 min\nLe temps limite pour valider la course est de 67 heures.",
    question:
      "Quel Ã©cart en minutes sÃ©pare le 1er du 3e ? Combien d'heures restaient-il au vainqueur par rapport au temps limite ?",
    expectedAnswer: "71",
    explanation:
      "Ã‰cart entre 1er et 3e : (24 h 38 min) âˆ’ (23 h 27 min) = 1 h 11 min = 71 minutes.\nTemps restant pour le vainqueur : 67 h âˆ’ 23 h 27 min = 43 h 33 min. Le vainqueur a terminÃ© avec encore 43 heures et 33 minutes d'avance sur la limite !",
    directions: [
      {
        id: "soustraction_durees",
        label: "Soustraire des durÃ©es",
        type: "guided",
        content:
          "Convertis les temps en minutes :\nâ€¢ 23 h 27 min = 23 Ã— 60 + 27 = 1 407 min\nâ€¢ 24 h 38 min = 24 Ã— 60 + 38 = 1 478 min\nÃ‰cart = 1 478 âˆ’ 1 407 = ?",
      },
      {
        id: "calcul_ecart",
        label: "Calculer l'Ã©cart directement",
        type: "guided",
        content:
          "De 23 h 27 min Ã  24 h 38 min : il y a 1 heure (de 23h27 Ã  24h27) puis 11 minutes (de 24h27 Ã  24h38).\nTotal : 1 h 11 min = 71 min.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "De 23 h 27 Ã  24 h 27 = 60 min. De 24 h 27 Ã  24 h 38 = 11 min. Total = 60 + 11 = 71 min.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique comment calculer un Ã©cart de temps quand on a des heures et des minutes. Quelle difficultÃ© peut apparaÃ®tre avec les minutes ?",
      },
    ],
  },

  {
    id: "grand_raid_synthese_001",
    title: "Grand Raid : raconter la Diagonale des Fous",
    theme: "SynthÃ¨se & argumentation",
    image: "/images/defis-du-jour/grand_raid_2026.webp",
    level: 5,
    statement:
      "Cette semaine, tu as travaillÃ© avec de vraies donnÃ©es du Grand Raid de La RÃ©union : 165 km de course, 9 600 m de dÃ©nivelÃ©, une vitesse record de 7,2 km/h sur 23 heures, 96 000 litres d'eau prÃ©parÃ©s, 1 440 finishers sur 2 400 partants, et un Ã©cart de 71 minutes entre le 1er et le 3e.",
    question:
      "RÃ©dige une courte prÃ©sentation du Grand Raid en utilisant au moins 4 de ces donnÃ©es chiffrÃ©es. Explique pourquoi cette course mÃ©rite le surnom Â« Diagonale des Fous Â».",
    expectedAnswer: "explication",
    explanation:
      "Une bonne rÃ©ponse mobilise au moins 4 donnÃ©es et les explique. Exemple : Le Grand Raid traverse La RÃ©union sur 165 km avec 9 600 m de dÃ©nivelÃ©. Le record est de 23 heures Ã  7,2 km/h en moyenne â€” un rythme de joggeur maintenu une journÃ©e entiÃ¨re en montagne. Seulement 60 % des 2 400 partants terminent. VoilÃ  pourquoi on l'appelle la Â« Diagonale des Fous Â» !",
    directions: [
      {
        id: "mots_cles",
        label: "Utiliser les mots clÃ©s",
        type: "guided",
        content:
          "Essaie d'utiliser les mots : distance, dÃ©nivelÃ©, vitesse, cirque, abandon, finisher, bÃ©nÃ©voles, La RÃ©union.",
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
        label: "Structurer ma rÃ©ponse",
        type: "guided",
        content:
          "Ã‰cris en 3 phrases :\n1. PrÃ©sente la course (distance, dÃ©nivelÃ©, Ã®le).\n2. DÃ©cris le record ou les conditions avec des chiffres.\n3. Explique pourquoi c'est Â« fou Â» avec les chiffres d'abandon ou de logistique.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Compare une donnÃ©e du Grand Raid avec quelque chose de concret : 9 600 m de dÃ©nivelÃ©, c'est presque l'Everest (8 849 m). Ã‡a aide le lecteur Ã  comprendre l'ampleur.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "RÃ©dige comme si tu expliquais Ã  un camarade qui n'a jamais entendu parler du Grand Raid. Quels chiffres le surprendraient le plus ?",
      },
    ],
  },
];


