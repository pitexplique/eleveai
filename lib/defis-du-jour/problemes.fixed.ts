/* lib/defis-jour/problemes.fixed.ts */
import type { ProblemeDuJour } from "./types";
 
export const problemesFixed: ProblemeDuJour[] = [
  {
    id: "piton_fournaise_altitude_001",
    title: "Piton de la Fournaise : le toit de La Réunion volcanique",
    theme: "Mesures & altitude",
    image: "/images/defis-du-jour/piton-fournaise.webp",
    level: 1,
    statement:
      "Le Piton de la Fournaise culmine à 2 632 mètres d'altitude. Le cratère Dolomieu, situé au sommet, a une profondeur d'environ 120 mètres. Un randonneur part du Pas de Bellecombe à 2 311 mètres d'altitude pour rejoindre le sommet.",
    question:
      "Quelle différence d'altitude le randonneur doit-il gravir pour atteindre le sommet ? Donne ta réponse en mètres.",
    expectedAnswer: "321",
    explanation:
      "On calcule la différence d'altitude : 2 632 − 2 311 = 321 mètres. Le randonneur doit monter 321 mètres de dénivelé positif pour atteindre le sommet du Piton de la Fournaise.",
    directions: [
      {
        id: "soustraction",
        label: "Utiliser la soustraction",
        type: "guided",
        content:
          "La différence d'altitude se calcule en soustrayant l'altitude de départ de l'altitude d'arrivée.\nAltitude sommet : 2 632 m. Altitude départ : 2 311 m.",
      },
      {
        id: "calcul",
        label: "Faire le calcul",
        type: "guided",
        content:
          "Calcule : 2 632 − 2 311.\nLa réponse doit être donnée en mètres.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Commence par soustraire les unités : 2 − 1 = 1. Puis les dizaines : 3 − 1 = 2. Puis les centaines et milliers.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi on fait une soustraction pour trouver le dénivelé. Tu peux commencer par : « Pour savoir combien de mètres on monte, on doit... »",
      },
    ],
  },
 
  {
    id: "piton_fournaise_lave_debit_001",
    title: "Piton de la Fournaise : la coulée de lave",
    theme: "Débit & proportionnalité",
    image: "/images/defis-du-jour/piton-fournaise.webp",
    level: 2,
    statement:
      "Lors d'une éruption du Piton de la Fournaise, une coulée de lave peut avancer à environ 30 mètres par heure sur terrain plat. Une coulée part du cratère et se dirige vers la mer, distante de 6 kilomètres.",
    question:
      "En supposant que la coulée avance à vitesse constante, combien d'heures lui faudrait-il pour atteindre la mer ? Donne ta réponse en heures.",
    expectedAnswer: "200",
    explanation:
      "On commence par convertir la distance : 6 km = 6 000 m. Ensuite on divise par la vitesse : 6 000 ÷ 30 = 200. Il faudrait environ 200 heures à la coulée pour atteindre la mer à cette vitesse.",
    directions: [
      {
        id: "conversion",
        label: "Convertir les kilomètres",
        type: "guided",
        content:
          "Commence par convertir 6 km en mètres.\nRappel : 1 km = 1 000 m.",
      },
      {
        id: "division",
        label: "Calculer le temps",
        type: "guided",
        content:
          "Temps = Distance ÷ Vitesse.\nDistance = 6 000 m. Vitesse = 30 m/h.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "6 000 ÷ 30 = 6 000 ÷ 3 ÷ 10. Commence par 6 000 ÷ 3.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi on divise la distance par la vitesse pour trouver un temps.",
      },
    ],
  },
 
  {
    id: "piton_fournaise_volume_lave_001",
    title: "Piton de la Fournaise : volume de lave émis",
    theme: "Volume & estimation",
    image: "/images/defis-du-jour/piton-fournaise.webp",
    level: 3,
    statement:
      "Lors de l'éruption de 2007, l'une des plus importantes de l'histoire récente du Piton de la Fournaise, environ 210 millions de mètres cubes de lave ont été émis en 25 jours.",
    question:
      "Quel volume moyen de lave était émis chaque jour ? Donne ta réponse en millions de m³ par jour. Arrondi à l'unité près.",
    expectedAnswer: "8",
    explanation:
      "On divise le volume total par le nombre de jours : 210 ÷ 25 = 8,4. Arrondi à l'unité près, cela fait environ 8 millions de m³ par jour. C'est un débit colossal qui explique la rapidité avec laquelle la coulée a atteint la mer en quelques jours seulement.",
    directions: [
      {
        id: "division",
        label: "Diviser le volume total",
        type: "guided",
        content:
          "Pour trouver le volume moyen par jour, on divise le volume total par le nombre de jours.\n210 millions ÷ 25 = ?",
      },
      {
        id: "calcul_etape",
        label: "Calculer étape par étape",
        type: "guided",
        content:
          "Essaie : 210 ÷ 25.\nAstuce : 25 × 8 = 200 et 25 × 9 = 225. Lequel est le plus proche de 210 ?",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "210 ÷ 25 est entre 8 et 9. Calcule 25 × 8 = 200 et 25 × 8,4 = 210.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique comment on trouve une moyenne à partir d'un total et d'un nombre de jours.",
      },
    ],
  },
 
  {
    id: "piton_fournaise_epaisseur_001",
    title: "Piton de la Fournaise : la lave recouvre la côte",
    theme: "Calcul d'épaisseur & grandeurs",
    image: "/images/defis-du-jour/piton-fournaise.webp",
    level: 3,
    statement:
      "En 2007, la lave a recouvert une surface d'environ 3 km² de côte avant de se jeter dans l'océan Indien. Si le volume émis était de 210 millions de m³ et que la lave s'est répartie uniformément sur cette surface, on peut estimer son épaisseur moyenne.\n\nRappel : Volume = Surface × Épaisseur. On doit d'abord convertir 3 km² en m².",
    question:
      "Quelle serait l'épaisseur moyenne de la couche de lave sur cette zone ? Donne ta réponse en mètres. Arrondi à l'unité près.",
    expectedAnswer: "70",
    explanation:
      "On convertit d'abord : 3 km² = 3 × 1 000 000 = 3 000 000 m². Ensuite on utilise la formule : Épaisseur = Volume ÷ Surface = 210 000 000 ÷ 3 000 000 = 70. La couche de lave aurait une épaisseur moyenne d'environ 70 mètres, ce qui est considérable !",
    directions: [
      {
        id: "conversion_surface",
        label: "Convertir km² en m²",
        type: "guided",
        content:
          "Commence par convertir 3 km² en m².\nRappel : 1 km = 1 000 m, donc 1 km² = 1 000 × 1 000 = 1 000 000 m².",
      },
      {
        id: "formule",
        label: "Utiliser la formule",
        type: "guided",
        content:
          "Formule : Épaisseur = Volume ÷ Surface.\nVolume = 210 000 000 m³. Surface = 3 000 000 m².",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "210 000 000 ÷ 3 000 000 = 210 ÷ 3 = 70.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi on divise le volume par la surface pour trouver une épaisseur.",
      },
    ],
  },
 
  {
    id: "piton_fournaise_eruptions_001",
    title: "Piton de la Fournaise : un volcan très actif",
    theme: "Statistiques & fréquence",
    image: "/images/defis-du-jour/piton-fournaise.webp",
    level: 4,
    statement:
      "Le Piton de la Fournaise est l'un des volcans les plus actifs au monde. Entre 1998 et 2023, il a connu environ 75 éruptions en 25 ans.",
    question:
      "Calcule la fréquence moyenne d'éruptions par année entre 1998 et 2023. Donne ta réponse sous forme décimale arrondie au dixième.",
    expectedAnswer: "3",
    explanation:
      "On divise le nombre total d'éruptions par le nombre d'années : 75 ÷ 25 = 3. Le Piton de la Fournaise a eu en moyenne 3 éruptions par année sur cette période. C'est pour cela qu'il est surnommé « le volcan qui crache du feu ».",
    directions: [
      {
        id: "frequence",
        label: "Comprendre la fréquence",
        type: "guided",
        content:
          "La fréquence par année = nombre total d'éruptions ÷ nombre d'années.\n75 éruptions ÷ 25 ans = ?",
      },
      {
        id: "calcul",
        label: "Faire le calcul",
        type: "guided",
        content:
          "Calcule : 75 ÷ 25.\nTu peux simplifier en divisant numérateur et dénominateur par 25.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "25 × 3 = 75. Quelle est donc la valeur de 75 ÷ 25 ?",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique ce que représente une fréquence d'éruptions. Tu peux commencer par : « Cela signifie qu'en moyenne... »",
      },
    ],
  },
 
  {
    id: "piton_fournaise_co2_001",
    title: "Piton de la Fournaise : les gaz volcaniques",
    theme: "Proportionnalité & pourcentages",
    image: "/images/defis-du-jour/piton-fournaise.webp",
    level: 4,
    statement:
      "Lors d'une éruption, les gaz émis par le Piton de la Fournaise contiennent environ 70 % de vapeur d'eau, 15 % de dioxyde de carbone (CO₂) et 15 % d'autres gaz. En une journée d'éruption intense, la quantité totale de gaz émis est estimée à 200 000 tonnes.",
    question:
      "Quelle quantité de CO₂ est émise ce jour-là ? Donne ta réponse en tonnes.",
    expectedAnswer: "30000",
    explanation:
      "On cherche 15 % de 200 000 tonnes. On calcule : 200 000 × 15 ÷ 100 = 200 000 × 0,15 = 30 000 tonnes de CO₂ sont émises ce jour-là.",
    directions: [
      {
        id: "pourcentage",
        label: "Calculer un pourcentage",
        type: "guided",
        content:
          "Pour trouver 15 % de 200 000 : multiplie 200 000 par 15 puis divise par 100.",
      },
      {
        id: "calcul",
        label: "Faire le calcul",
        type: "guided",
        content:
          "200 000 × 15 = 3 000 000. Puis 3 000 000 ÷ 100 = 30 000 tonnes.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "10 % de 200 000 = 20 000. Et 5 % = 10 000. Donc 15 % = 20 000 + 10 000.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi calculer un pourcentage revient à multiplier par un nombre décimal. Tu peux donner un exemple simple.",
      },
    ],
  },
 
  {
    id: "piton_fournaise_synthese_001",
    title: "Piton de la Fournaise : raconter les chiffres du volcan",
    theme: "Synthèse & argumentation",
    image: "/images/defis-du-jour/piton-fournaise.webp",
    level: 5,
    statement:
      "Cette semaine, tu as travaillé avec des données réelles sur le Piton de la Fournaise : son altitude de 2 632 m, des coulées de lave à 30 m/h, 210 millions de m³ de lave en 2007, une épaisseur de 70 m de lave sur la côte, 3 éruptions par an en moyenne et 30 000 tonnes de CO₂ par jour lors d'une éruption.",
    question:
      "Écris une courte présentation du Piton de la Fournaise en utilisant au moins 3 de ces données chiffrées. Montre pourquoi c'est un volcan exceptionnel.",
    expectedAnswer: "explication",
    explanation:
      "Une bonne réponse utilise au moins 3 données de la semaine et explique leur signification. Par exemple : le Piton de la Fournaise culmine à 2 632 m et connaît en moyenne 3 éruptions par an. En 2007, il a émis 210 millions de m³ de lave en seulement 25 jours, formant une couche de 70 mètres sur la côte. Ces chiffres montrent à la fois la puissance du volcan et son activité exceptionnelle.",
    directions: [
      {
        id: "mots_cles",
        label: "Utiliser les mots clés",
        type: "guided",
        content:
          "Essaie d'utiliser les mots : altitude, éruption, lave, coulée, gaz, La Réunion, exceptionnel.",
      },
      {
        id: "nombres_cles",
        label: "Choisir les nombres importants",
        type: "guided",
        content:
          "Choisis au moins 3 nombres parmi : 2 632 m, 30 m/h, 210 millions de m³, 70 m, 3 éruptions/an, 30 000 tonnes.",
      },
      {
        id: "structure",
        label: "Structurer ma réponse",
        type: "guided",
        content:
          "Écris en 3 phrases :\n1. Présente le volcan (altitude, localisation).\n2. Décris une éruption avec des chiffres.\n3. Explique pourquoi c'est exceptionnel.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Compare les données du Piton de la Fournaise avec des éléments de la vie quotidienne pour que le lecteur comprenne l'ampleur du phénomène.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Rédige comme si tu expliquais à un élève de 6e qui n'a jamais entendu parler du Piton de la Fournaise.",
      },
    ],
  },
];