// LES ARTICLES DU JOURNAL D'ELEVEAI — « COMPRENDRE LE MONDE ET LE CHANGER » (10/11/2026).
//
// Frédéric, devant le bandeau « Le Journal d'EleveAI : comprendre le monde » :
// « excellent », « on doit refaire le journal pour qu'il corresponde à ça
// exactement », « le coach est donc inutile », « faut faire un vrai journal ! ».
//
// Un article = une question que se pose n'importe qui sur le monde (planète,
// espace, santé, argent, sport, technologie, histoire…), une réponse claire,
// l'encadré « Les maths derrière » qui montre le calcul, et « Et toi, tu
// peux… » : un geste pour le CHANGER (Frédéric : « comprendre le monde et le
// changer »). Les maths sont
// TRANSVERSALES : chaque article en est la preuve.
// ⛔ Des faits SOLIDES et durables (pas d'actualité qui vieillit en une
// semaine), chaque chiffre vérifiable ; la source est écrite sous l'article.
// ⛔ La Réunion ≈ 4 % des contextes : un article sur vingt-cinq, pas plus.
// ⭐ Ajouter un article = l'écrire ici ; la page en tire une Une et trois
// « autres nouvelles » par jour, qui tournent (voir articlesDuJour).

export type Article = {
  id: string;
  rubrique: "Planète" | "Espace" | "Santé" | "Argent" | "Sport" | "Technologie" | "Histoire" | "Société" | "Sécurité";
  titre: string;
  chapo: string;
  corps: string[];
  maths: { titre: string; lignes: string[] };
  /** Le défi de l'article (10/11/2026, Frédéric : « les jeunes ont envie
   *  d'apprendre différemment, et de défis ») : un QCM à trois choix.
   *  ⛔ La bonne réponse au hasard en A, B ou C ; jamais deux choix identiques. */
  defi: { question: string; choix: [string, string, string]; bonne: 0 | 1 | 2; explication: string };
  /** « … et le changer » (10/11/2026) : un geste concret, à sa portée. */
  agir: string;
  /** Optionnel : la date (AAAA-MM-JJ) où l'article passe à la Une. */
  uneLe?: string;
  /** Le niveau à partir duquel on suit le calcul. */
  niveau: string;
  source: string;
};

export const ARTICLES: Article[] = [
  {
    // ⭐ L'idée de Frédéric, 10/11/2026 : « si tu fais deux bonnes actions à
    // deux amis et que les deux font deux bonnes actions, au bout d'un mois
    // combien y aura-t-il de bonnes actions ? » À la Une le jour même.
    id: "bonnes-actions-puissances",
    uneLe: "2026-11-10",
    rubrique: "Société",
    titre: "Deux bonnes actions par jour, et la planète entière change en un mois",
    chapo: "Tu fais une bonne action à deux amis. Le lendemain, chacun en fait deux à son tour, et ainsi de suite. Au bout d'un mois, combien de bonnes actions ? Plus de deux milliards.",
    corps: [
      "Le premier jour, tu aides deux personnes : 2 bonnes actions. Le deuxième jour, chacune en aide deux autres : 4. Le troisième jour : 8. Chaque jour, le nombre double.",
      "Au début, cela paraît minuscule. Au bout d'une semaine, on n'en est qu'à 128 bonnes actions ce jour-là. Mais le 30e jour, il y en a plus d'un milliard en une seule journée, et plus de deux milliards en tout depuis le début.",
      "La Terre compte environ 8 milliards d'habitants. Si chacun transmettait vraiment, il suffirait de 32 jours pour que toute la planète ait reçu une bonne action. Dans la vraie vie, la chaîne se casse souvent : mais même si chacun ne transmettait qu'une fois par semaine, il faudrait moins d'un an.",
      "C'est la force des puissances : ce qui double chaque jour finit toujours par devenir gigantesque. La même mathématique explique la propagation d'un virus, d'une rumeur… ou d'une idée généreuse.",
    ],
    maths: {
      titre: "Les puissances de 2",
      lignes: [
        "Jour 1 : 2 · jour 2 : 2² = 4 · jour 3 : 2³ = 8",
        "Jour 30 : 2³⁰ = 1 073 741 824 en un jour",
        "Total : 2 + 4 + … + 2³⁰ = 2³¹ − 2 = 2 147 483 646",
      ],
    },
    defi: {
      question: "Le 5e jour, combien de bonnes actions sont faites ce jour-là ?",
      choix: ["10", "32", "25"],
      bonne: 1,
      explication: "On double chaque jour : 2, 4, 8, 16, 32. C'est 2⁵ = 2 × 2 × 2 × 2 × 2 = 32, et pas 2 × 5 = 10.",
    },
    agir: "Lance la chaîne aujourd'hui : fais une bonne action à deux personnes, et demande-leur d'en faire autant. Note demain combien ont continué : ta chaîne double-t-elle vraiment ?",
    niveau: "dès la 4e (dès le CM2 pour les premiers jours)",
    source: "Calcul EleveAI ; population mondiale : Nations unies, 8 milliards (novembre 2022).",
  },
  {
    id: "lumiere-soleil",
    rubrique: "Espace",
    titre: "Le Soleil que tu vois a 8 minutes de retard",
    chapo: "Quand tu regardes le Soleil se coucher, tu vois en réalité le Soleil d'il y a un peu plus de 8 minutes.",
    corps: [
      "La lumière est ce qui va le plus vite dans l'Univers : environ 300 000 kilomètres par seconde. Mais le Soleil est loin, à environ 150 millions de kilomètres de la Terre.",
      "Même à cette vitesse folle, le voyage prend du temps. Si le Soleil s'éteignait d'un coup, nous continuerions à le voir briller pendant plus de 8 minutes, sans rien savoir.",
      "Plus on regarde loin, plus on regarde dans le passé : la lumière de certaines étoiles est partie bien avant la naissance des dinosaures.",
    ],
    maths: {
      titre: "Temps = distance ÷ vitesse",
      lignes: [
        "150 000 000 km ÷ 300 000 km/s = 500 s",
        "500 s = 8 × 60 s + 20 s",
        "La lumière met donc environ 8 min 20 s.",
      ],
    },
    defi: {
      question: "La Lune est à environ 384 000 km. Combien de temps met sa lumière pour arriver jusqu'à nous ?",
      choix: ["Environ 1,3 seconde", "Environ 8 minutes", "Environ 13 secondes"],
      bonne: 0,
      explication: "384 000 ÷ 300 000 = 1,28 s : un peu plus d'une seconde.",
    },
    agir: "Ce soir, cherche l'étoile la plus brillante : calcule depuis combien de temps sa lumière voyage (une recherche suffit pour trouver sa distance en années-lumière).",
    niveau: "dès la 6e",
    source: "Distance Terre-Soleil moyenne : environ 149,6 millions de km (Union astronomique internationale).",
  },
  {
    id: "huit-milliards",
    rubrique: "Société",
    titre: "Huit milliards d'humains : combien de temps pour tous les compter ?",
    chapo: "L'ONU a annoncé le 15 novembre 2022 que la Terre comptait 8 milliards d'habitants. Un nombre si grand qu'on n'arrive pas à se le représenter.",
    corps: [
      "Huit milliards, c'est 8 suivi de neuf zéros : 8 000 000 000. Pour sentir ce que cela veut dire, imagine que tu comptes une personne par seconde, sans jamais dormir ni manger.",
      "Tu aurais fini au bout de plus de 250 ans. Il aurait fallu commencer avant la Révolution française !",
      "Un million, un milliard : ces mots se ressemblent, mais un milliard, c'est mille fois un million.",
    ],
    maths: {
      titre: "Les grands nombres",
      lignes: [
        "Une année ≈ 365 × 24 × 60 × 60 = 31 536 000 secondes",
        "8 000 000 000 ÷ 31 536 000 ≈ 254",
        "Environ 254 ans pour compter tout le monde.",
      ],
    },
    defi: {
      question: "Un milliard, c'est combien de millions ?",
      choix: ["Cent", "Un million", "Mille"],
      bonne: 2,
      explication: "1 000 000 000 ÷ 1 000 000 = 1 000 : un milliard, c'est mille millions.",
    },
    agir: "Calcule ton âge en secondes : âge × 31 536 000. Tu sauras en quelle année tu fêteras ton premier milliard de secondes (vers 31 ans et 8 mois).",
    niveau: "dès le CM2",
    source: "Nations unies, « Journée des 8 milliards », 15 novembre 2022.",
  },
  {
    id: "coeur-battements",
    rubrique: "Santé",
    titre: "Ton cœur bat environ 100 000 fois par jour",
    chapo: "Sans que tu y penses, ton cœur travaille jour et nuit. Un petit calcul suffit pour mesurer l'exploit.",
    corps: [
      "Au repos, le cœur d'un adulte bat en général entre 60 et 100 fois par minute. Pose deux doigts sur ton poignet et compte pendant 15 secondes : multiplie par 4, tu as ton nombre de battements par minute.",
      "Une journée compte 1 440 minutes. À 70 battements par minute, cela fait déjà plus de 100 000 battements. Et à chaque battement, le cœur envoie du sang jusqu'au bout de tes orteils.",
    ],
    maths: {
      titre: "Multiplier pour changer d'unité",
      lignes: [
        "1 jour = 24 × 60 = 1 440 minutes",
        "70 × 1 440 = 100 800 battements",
        "En 15 s, 18 battements → 18 × 4 = 72 par minute.",
      ],
    },
    defi: {
      question: "En 15 secondes, tu comptes 20 battements. Combien par minute ?",
      choix: ["35", "80", "60"],
      bonne: 1,
      explication: "Une minute = 4 × 15 secondes, donc 20 × 4 = 80 battements par minute.",
    },
    agir: "Mesure ton pouls au repos, puis après 30 sauts sur place. Compare : de combien de pour cent a-t-il augmenté ? Bouger chaque jour rend le cœur plus fort.",
    niveau: "dès le CM1",
    source: "Fréquence cardiaque normale au repos de l'adulte : 60 à 100 battements par minute.",
  },
  {
    id: "prix-qui-doublent",
    rubrique: "Argent",
    titre: "Pourquoi les prix doublent en 35 ans, même avec 2 % par an",
    chapo: "2 % par an, cela paraît minuscule. Pourtant, au bout d'une vie d'adulte, les prix ont doublé. Le coupable : les pourcentages qui s'empilent.",
    corps: [
      "Quand les prix augmentent, on parle d'inflation. Les banques centrales, en Europe comme aux États-Unis, visent environ 2 % par an.",
      "Mais chaque année, les 2 % s'appliquent au prix de l'année d'avant, déjà augmenté. On ne fait pas + 2 € tous les ans : on multiplie par 1,02 tous les ans.",
      "Le même calcul joue en ta faveur pour l'argent placé : c'est la force des « intérêts composés ».",
    ],
    maths: {
      titre: "Augmenter de 2 %, c'est multiplier par 1,02",
      lignes: [
        "100 € → 102 € → 104,04 € → 106,12 € …",
        "100 × 1,02³⁵ ≈ 200 €",
        "Astuce des banquiers : 72 ÷ 2 = 36 ans pour doubler.",
      ],
    },
    defi: {
      question: "Un prix de 50 € augmente de 10 %, puis encore de 10 %. Quel est le prix final ?",
      choix: ["60,50 €", "60 €", "70 €"],
      bonne: 0,
      explication: "50 × 1,1 = 55, puis 55 × 1,1 = 60,50 : la deuxième hausse s'applique sur 55 €, pas sur 50 €.",
    },
    agir: "Garde un ticket de caisse et compare-le dans un an : de quel pourcentage tes trois produits préférés ont-ils augmenté ?",
    niveau: "dès la 4e",
    source: "Banque centrale européenne : objectif d'inflation de 2 % à moyen terme.",
  },
  {
    id: "marathon-21-kmh",
    rubrique: "Sport",
    titre: "Un marathon en 2 heures, c'est rouler à vélo… en courant",
    chapo: "Le record du monde du marathon a été battu à Chicago en 2023 : 2 h 00 min 35 s pour 42,195 km. Quelle vitesse cela fait-il ?",
    corps: [
      "Le Kényan Kelvin Kiptum a couru les 42,195 km du marathon de Chicago, le 8 octobre 2023, en 2 h 00 min 35 s.",
      "Cela fait presque 21 km/h, pendant deux heures, sans s'arrêter. C'est la vitesse d'un cycliste tranquille. Essaie de courir à cette vitesse : la plupart des gens tiennent quelques secondes.",
      "Au marathon, on parle souvent d'« allure » : le temps pour faire un kilomètre. Ici, moins de 3 minutes par kilomètre.",
    ],
    maths: {
      titre: "Vitesse = distance ÷ temps",
      lignes: [
        "2 h 00 min 35 s ≈ 2,01 h",
        "42,195 km ÷ 2,01 h ≈ 21 km/h",
        "Allure : 120,6 min ÷ 42,195 ≈ 2 min 51 s par km.",
      ],
    },
    defi: {
      question: "Un coureur fait 10 km en 50 minutes. Quelle est sa vitesse ?",
      choix: ["10 km/h", "12 km/h", "20 km/h"],
      bonne: 1,
      explication: "En 60 minutes, il ferait 10 × 60 ÷ 50 = 12 km : 12 km/h.",
    },
    agir: "Chronomètre-toi sur 100 m et calcule ta vitesse en km/h (multiplie les m/s par 3,6). Combien de temps tiendrais-tu à l'allure de Kiptum ?",
    niveau: "dès la 6e",
    source: "World Athletics : record du monde du marathon homologué, Chicago, 8 octobre 2023.",
  },
  {
    id: "megapixels",
    rubrique: "Technologie",
    titre: "12 mégapixels : ce que cache le chiffre de ton téléphone",
    chapo: "Une photo de téléphone, c'est un immense tableau de petits carrés colorés, les pixels. Combien y en a-t-il vraiment ?",
    corps: [
      "« Méga » veut dire million. Un appareil de 12 mégapixels prend donc des photos de 12 millions de points.",
      "Ces points sont rangés en lignes et en colonnes, comme un quadrillage : par exemple 4 000 pixels de large sur 3 000 de haut.",
      "Doubler les mégapixels ne rend pas la photo deux fois plus nette : pour doubler la largeur ET la hauteur, il faut quatre fois plus de pixels.",
    ],
    maths: {
      titre: "L'aire d'un rectangle",
      lignes: [
        "4 000 × 3 000 = 12 000 000 pixels",
        "Deux fois plus large et deux fois plus haut :",
        "8 000 × 6 000 = 48 000 000, soit 4 fois plus.",
      ],
    },
    defi: {
      question: "Une photo fait 2 000 pixels de large sur 1 500 de haut. Combien de mégapixels ?",
      choix: ["3,5 mégapixels", "30 mégapixels", "3 mégapixels"],
      bonne: 2,
      explication: "2 000 × 1 500 = 3 000 000 pixels, soit 3 millions : 3 mégapixels.",
    },
    agir: "Avant d'acheter un téléphone, ne te laisse pas impressionner par les mégapixels : compare plutôt les photos prises dans le noir.",
    niveau: "dès le CM2",
    source: "Définition courante des capteurs photo des smartphones (format 4:3).",
  },
  {
    id: "pluie-70",
    rubrique: "Planète",
    titre: "« 70 % de risque de pluie » : ce que la météo veut vraiment dire",
    chapo: "Cela ne veut pas dire qu'il pleuvra 70 % de la journée, ni sur 70 % de la ville. Alors quoi ?",
    corps: [
      "Les prévisionnistes comparent la situation du jour à des milliers de situations semblables, calculées par des ordinateurs.",
      "« 70 % » veut dire : dans des conditions comme celles-ci, il pleut environ 7 jours sur 10. Il reste donc 3 chances sur 10 de rester au sec.",
      "Une prévision n'est jamais « fausse » parce qu'il n'a pas plu : il faut regarder si, sur beaucoup de jours, elle a eu raison 7 fois sur 10.",
    ],
    maths: {
      titre: "Une probabilité, c'est une fréquence",
      lignes: [
        "70 % = 70/100 = 7/10",
        "Sur 100 jours semblables : environ 70 jours de pluie",
        "Probabilité de rester au sec : 1 − 0,7 = 0,3.",
      ],
    },
    defi: {
      question: "La météo annonce 20 % de risque de pluie. Quelle est la probabilité qu'il ne pleuve pas ?",
      choix: ["80 %", "20 %", "0 %"],
      bonne: 0,
      explication: "100 % − 20 % = 80 % : 8 chances sur 10 de rester au sec.",
    },
    agir: "Pendant deux semaines, note la prévision de pluie de la veille et ce qui s'est passé. Calcule le pourcentage de bonnes prévisions.",
    niveau: "dès la 5e",
    source: "Météo-France : définition de la probabilité de précipitations.",
  },
  {
    id: "eratosthene",
    rubrique: "Histoire",
    titre: "Il y a 2 200 ans, il a mesuré la Terre avec un bâton",
    chapo: "Sans avion ni satellite, le savant grec Ératosthène a calculé le tour de la Terre. Avec une ombre et un peu de géométrie.",
    corps: [
      "Vers 240 avant notre ère, Ératosthène vit à Alexandrie, en Égypte. Il apprend qu'à Syène, plus au sud, le jour le plus long de l'année, le Soleil éclaire le fond des puits à midi : il est juste au-dessus.",
      "Le même jour, à Alexandrie, un bâton planté droit fait une petite ombre. Ératosthène mesure l'angle : un cinquantième de tour complet.",
      "Il en déduit que la distance entre les deux villes est un cinquantième du tour de la Terre. Son résultat est très proche de la vraie valeur, environ 40 000 km.",
    ],
    maths: {
      titre: "Angles et proportionnalité",
      lignes: [
        "Angle mesuré : 7,2° ; et 360° ÷ 7,2° = 50",
        "Alexandrie-Syène ≈ 5 000 stades",
        "Tour de la Terre ≈ 50 × 5 000 = 250 000 stades.",
      ],
    },
    defi: {
      question: "Si l'angle mesuré avait été de 9°, en combien de parts aurait-on découpé le tour de la Terre ?",
      choix: ["50", "40", "90"],
      bonne: 1,
      explication: "360° ÷ 9° = 40 : la distance entre les villes serait alors 1/40 du tour.",
    },
    agir: "Refais l'expérience : plante un bâton droit à midi et mesure son ombre. Des classes de plusieurs pays le font ensemble chaque année.",
    niveau: "dès la 5e",
    source: "Récit rapporté par Cléomède (Ier siècle) ; circonférence terrestre ≈ 40 075 km à l'équateur.",
  },
  {
    id: "sondage-1000",
    rubrique: "Société",
    titre: "Comment 1 000 personnes peuvent parler pour tout un pays",
    chapo: "Avant une élection, les sondages interrogent environ 1 000 personnes. Comment peuvent-ils dire quelque chose sur des millions d'électeurs ?",
    corps: [
      "Pense à une soupe : pour savoir si elle est assez salée, tu n'as pas besoin de la boire entière. Une cuillère suffit, à condition d'avoir bien mélangé.",
      "Pour un sondage, « bien mélanger », c'est choisir des personnes qui ressemblent à tout le pays : âges, régions, métiers.",
      "Mais un sondage n'est jamais exact : avec 1 000 personnes, il se trompe facilement de 3 points. 51 % contre 49 % ? Impossible de savoir qui gagnera.",
    ],
    maths: {
      titre: "La marge d'erreur",
      lignes: [
        "Marge ≈ 1 ÷ √n, avec n le nombre de personnes",
        "1 ÷ √1 000 ≈ 1 ÷ 31,6 ≈ 0,03, soit 3 points",
        "Pour 1 point de marge, il faudrait 10 000 personnes.",
      ],
    },
    defi: {
      question: "Pour diviser la marge d'erreur par 2, combien de personnes faut-il interroger en plus ?",
      choix: ["2 fois plus", "10 fois plus", "4 fois plus"],
      bonne: 2,
      explication: "La marge vaut environ 1 ÷ √n : pour la diviser par 2, il faut multiplier √n par 2, donc n par 4.",
    },
    agir: "Fais un sondage dans ta classe, puis dans une autre. Les résultats sont-ils les mêmes ? Tu viens de voir la marge d'erreur de tes yeux.",
    niveau: "dès la seconde",
    source: "Intervalle de fluctuation au seuil de 95 % (programme de seconde).",
  },
  {
    id: "oceans-71",
    rubrique: "Planète",
    titre: "Notre planète devrait s'appeler la planète Mer",
    chapo: "Vue de l'espace, la Terre est bleue. Les océans couvrent environ 71 % de sa surface.",
    corps: [
      "Sur 10 morceaux de surface de la Terre, 7 sont couverts d'eau salée. Les continents, là où nous vivons, ne font que les 3 autres.",
      "Les océans absorbent une grande partie de la chaleur du Soleil et produisent une bonne partie de l'oxygène que nous respirons, grâce au plancton.",
      "Et pourtant, nous connaissons mieux la surface de la Lune que le fond de nos océans.",
    ],
    maths: {
      titre: "Pourcentages et diagramme circulaire",
      lignes: [
        "71 % d'océans, 29 % de terres : 71 + 29 = 100",
        "Sur un camembert : 71 % de 360° ≈ 256°",
        "Surface de la Terre ≈ 510 millions de km² → océans ≈ 362 millions.",
      ],
    },
    defi: {
      question: "Sur un diagramme circulaire, quel angle représente environ les 29 % de terres ?",
      choix: ["104°", "29°", "290°"],
      bonne: 0,
      explication: "29 % de 360° = 0,29 × 360 ≈ 104°.",
    },
    agir: "Un geste qui compte : ramasser un déchet plastique avant qu'il n'arrive à la mer. Compte ceux que ta classe ramasse en une semaine.",
    niveau: "dès la 6e",
    source: "NOAA (agence américaine des océans) : environ 71 % de la surface terrestre est océanique.",
  },
  {
    id: "code-pin",
    rubrique: "Sécurité",
    titre: "Ton code à 4 chiffres résiste-t-il à un voleur ?",
    chapo: "Un téléphone volé, trois essais pour trouver le code. Quelles sont les chances du voleur ?",
    corps: [
      "Un code à 4 chiffres va de 0000 à 9999. Il y a donc 10 000 codes possibles.",
      "Avec trois essais, le voleur n'a que 3 chances sur 10 000 de tomber juste… si ton code est choisi au hasard. Car beaucoup de gens choisissent 1234, 0000 ou leur année de naissance : ce sont les premiers essayés.",
      "Passer à 6 chiffres multiplie le nombre de codes par 100.",
    ],
    maths: {
      titre: "Compter les possibilités",
      lignes: [
        "10 choix × 10 × 10 × 10 = 10⁴ = 10 000 codes",
        "3 essais : probabilité 3/10 000 = 0,03 %",
        "6 chiffres : 10⁶ = 1 000 000 codes.",
      ],
    },
    defi: {
      question: "Combien de codes différents avec 3 chiffres (de 000 à 999) ?",
      choix: ["30", "1 000", "999"],
      bonne: 1,
      explication: "10 × 10 × 10 = 1 000 codes : de 000 à 999, on n'oublie pas 000.",
    },
    agir: "Change ton code s'il fait partie de ceux qu'on essaie en premier (1234, 0000, 1111, ton année de naissance). Choisis-le vraiment au hasard : lance un dé.",
    niveau: "dès la 4e",
    source: "Dénombrement : 10 chiffres possibles pour chacune des 4 positions.",
  },
  {
    id: "freinage",
    rubrique: "Sécurité",
    titre: "Rouler deux fois plus vite, c'est freiner quatre fois plus loin",
    chapo: "À 50 km/h, une voiture parcourt déjà 14 mètres avant même que le conducteur appuie sur le frein. Explication.",
    corps: [
      "Quand un danger surgit, le conducteur met environ une seconde à réagir. Pendant cette seconde, la voiture continue à sa vitesse : c'est la distance de réaction.",
      "Ensuite vient le freinage lui-même. Et là, une surprise : quand la vitesse double, la distance de freinage ne double pas, elle est multipliée par quatre.",
      "C'est pour cela que quelques km/h de plus, en ville, peuvent tout changer pour un piéton.",
    ],
    maths: {
      titre: "Convertir et comparer",
      lignes: [
        "50 km/h = 50 000 m ÷ 3 600 s ≈ 14 m par seconde",
        "Freinage proportionnel au carré de la vitesse :",
        "vitesse × 2 → distance × 2² = × 4.",
      ],
    },
    defi: {
      question: "Une voiture qui roulait à 30 km/h freine sur 5 m. Sur quelle distance freinerait-elle à 90 km/h ?",
      choix: ["15 m", "25 m", "45 m"],
      bonne: 2,
      explication: "La vitesse est multipliée par 3, la distance de freinage par 3² = 9 : 5 × 9 = 45 m.",
    },
    agir: "Explique ce calcul à un adulte qui conduit : à 50 km/h, 14 m avant même de freiner. Ralentir près d'une école, c'est protéger des vies.",
    niveau: "dès la 4e",
    source: "Sécurité routière : temps de réaction moyen d'environ 1 seconde.",
  },
  {
    id: "rechauffement-1-5",
    rubrique: "Planète",
    titre: "Pourquoi tout le monde parle de « 1,5 °C »",
    chapo: "Un degré et demi, c'est à peine la différence entre deux matinées. Pour la planète entière, c'est énorme.",
    corps: [
      "En 2015, à Paris, presque tous les pays du monde se sont engagés à limiter le réchauffement « bien en dessous de 2 °C » et, si possible, à 1,5 °C, par rapport à l'époque d'avant les usines (vers 1850-1900).",
      "Selon le GIEC, les experts du climat de l'ONU, la planète s'était déjà réchauffée d'environ 1,1 °C en moyenne sur les années 2011-2020.",
      "Il s'agit d'une MOYENNE sur toute la Terre et toute l'année : derrière ce petit nombre, il y a des canicules plus fortes, des glaciers qui fondent et la mer qui monte.",
    ],
    maths: {
      titre: "La moyenne et l'écart",
      lignes: [
        "Écart = température moyenne actuelle − celle de 1850-1900",
        "1,5 − 1,1 = 0,4 °C de marge sur 2011-2020",
        "Une moyenne cache des valeurs bien plus hautes et plus basses.",
      ],
    },
    defi: {
      question: "Températures d'une semaine : 10, 12, 14, 16 et 18 °C. Quelle est la moyenne ?",
      choix: ["14 °C", "15 °C", "70 °C"],
      bonne: 0,
      explication: "(10 + 12 + 14 + 16 + 18) ÷ 5 = 70 ÷ 5 = 14 °C.",
    },
    agir: "Calcule l'empreinte d'un trajet : une voiture émet environ 120 g de CO₂ par km. Combien pour aller à l'école et revenir, pendant un an ? Et à vélo ?",
    niveau: "dès la 5e",
    source: "Accord de Paris (2015) ; GIEC, 6e rapport d'évaluation (2021).",
  },
  {
    id: "baleines-reunion",
    rubrique: "Planète",
    titre: "8 000 km sans GPS : le voyage des baleines à bosse",
    chapo: "Chaque hiver austral, des baleines à bosse quittent les eaux glacées de l'Antarctique pour mettre bas dans les mers chaudes, jusqu'à La Réunion ou Madagascar.",
    corps: [
      "Les baleines à bosse se nourrissent l'été dans les eaux froides et riches de l'Antarctique. L'hiver, elles remontent vers les eaux tropicales, plus chaudes, pour donner naissance à leurs petits.",
      "Le voyage peut dépasser 8 000 km. Elles mangent très peu pendant ce temps : elles vivent sur leurs réserves de graisse.",
    ],
    maths: {
      titre: "Vitesse moyenne",
      lignes: [
        "Une baleine nage environ 5 km/h en migration",
        "8 000 km ÷ 5 km/h = 1 600 h",
        "1 600 h ÷ 24 ≈ 67 jours, plus de deux mois.",
      ],
    },
    defi: {
      question: "Une baleine nage 4 000 km en 40 jours. Combien de km par jour en moyenne ?",
      choix: ["400 km", "100 km", "40 km"],
      bonne: 1,
      explication: "4 000 ÷ 40 = 100 km par jour.",
    },
    agir: "Les baleines ont besoin de calme : si tu les observes un jour, reste à au moins 100 m, et calcule combien de temps elles mettraient pour traverser ton pays.",
    niveau: "dès la 6e",
    source: "Observatoire marin de La Réunion ; vitesse de migration de l'ordre de 4 à 8 km/h.",
  },
];

/** Une Une et trois autres nouvelles par jour ; chaque article revient en Une
 *  tous les ARTICLES.length jours, jamais deux fois la même page. */
export function articlesDuJour(jour: number): { une: Article; autres: Article[] } {
  // Un article daté (uneLe) passe à la Une ce jour-là ; sinon, la rotation.
  // Les « autres nouvelles » avancent d'un pas premier avec la longueur (n = 15),
  // pour ne pas toujours montrer les voisines dans la liste.
  const n = ARTICLES.length;
  const date = new Date(jour * 86400000).toISOString().slice(0, 10);
  const datee = ARTICLES.findIndex((a) => a.uneLe === date);
  const i = datee >= 0 ? datee : ((jour % n) + n) % n;
  return {
    une: ARTICLES[i],
    autres: [1, 2, 3].map((k) => ARTICLES[(i + 4 * k) % n]),
  };
}

/* ═══ LE DÉFI DEHORS ET LA BONNE ACTION (10/11/2026) ═══════════════════════
   Frédéric : « les jeunes ont envie d'apprendre différemment, et de défis »,
   « tu peux aussi lancer des défis à faire à l'extérieur », « ou des bonnes
   actions ». Une mission par jour, qui alterne : un jour DEHORS (mesurer,
   compter, estimer), un jour une BONNE ACTION (et les maths mesurent ce
   qu'elle a changé). Faisable partout, avec un matériel de tous les jours.
   ⛔ Rien de dangereux : pas de route à traverser, toujours avec un adulte
   quand on sort de l'école, des gants pour ramasser des déchets. */
export type Mission = {
  id: string;
  genre: "dehors" | "bonne-action";
  titre: string;
  materiel: string;
  etapes: string[];
  calcul: string;
  niveau: string;
};

const DEHORS: Mission[] = [
  {
    id: "hauteur-arbre",
    genre: "dehors",
    titre: "Mesure la hauteur d'un arbre… sans y grimper",
    materiel: "Un mètre ou une règle, un bâton, un jour de soleil.",
    etapes: [
      "Plante un bâton bien droit, mesure sa hauteur et la longueur de son ombre.",
      "Au même moment, mesure l'ombre de l'arbre (en pas, puis en mètres).",
    ],
    calcul: "Hauteur de l'arbre = ombre de l'arbre × (hauteur du bâton ÷ ombre du bâton). C'est la proportionnalité, comme chez Thalès !",
    niveau: "dès la 6e",
  },
  {
    id: "longueur-pas",
    genre: "dehors",
    titre: "Combien mesure ton pas ?",
    materiel: "Un mètre ruban ou une craie, une ligne droite de 10 m.",
    etapes: [
      "Marque 10 m au sol, puis parcours-les en marchant normalement, en comptant tes pas.",
      "Recommence trois fois et fais la moyenne.",
    ],
    calcul: "Longueur d'un pas = 10 m ÷ nombre de pas. Ensuite, mesure la cour en pas et convertis en mètres.",
    niveau: "dès le CM1",
  },
  {
    id: "couleur-voitures",
    genre: "dehors",
    titre: "Quelle couleur de voiture gagne ?",
    materiel: "Un carnet, un crayon, 10 minutes près d'un parking (sans traverser).",
    etapes: [
      "Note la couleur de 50 voitures : blanc, noir, gris, rouge, bleu, autre.",
      "Range tes résultats dans un tableau d'effectifs.",
    ],
    calcul: "Fréquence d'une couleur = effectif ÷ 50. Multiplie par 100 pour avoir un pourcentage, puis dessine un diagramme en barres.",
    niveau: "dès le CM2",
  },
  {
    id: "vitesse-marche",
    genre: "dehors",
    titre: "À quelle vitesse marches-tu ?",
    materiel: "Un chronomètre (un téléphone suffit), une distance connue de 100 m.",
    etapes: [
      "Chronomètre-toi sur 100 m en marchant normalement.",
      "Recommence en marchant vite.",
    ],
    calcul: "Vitesse en m/s = 100 ÷ temps en secondes. Multiplie par 3,6 pour l'avoir en km/h : on marche en général autour de 5 km/h.",
    niveau: "dès la 6e",
  },
  {
    id: "symetries-dehors",
    genre: "dehors",
    titre: "La chasse aux symétries",
    materiel: "Un téléphone pour photographier, ou un carnet pour dessiner.",
    etapes: [
      "Trouve dehors 5 choses qui ont un axe de symétrie : une feuille, une fenêtre, un panneau, une fleur, un logo.",
      "Trace l'axe sur ta photo ou sur ton dessin.",
    ],
    calcul: "Qui a le plus d'axes ? Un panneau « stop », un octogone régulier, en a 8 : vérifie !",
    niveau: "dès le CE2",
  },
  {
    id: "estimer-foule",
    genre: "dehors",
    titre: "Combien de personnes dans la cour ?",
    materiel: "Ton œil, et un carnet.",
    etapes: [
      "Choisis un petit carré de la cour et compte les personnes dedans.",
      "Estime combien de carrés pareils couvrent toute la cour.",
    ],
    calcul: "Total ≈ personnes dans un carré × nombre de carrés. C'est ainsi qu'on estime une foule. Compare avec le vrai nombre !",
    niveau: "dès le CM1",
  },
  {
    id: "marches-escalier",
    genre: "dehors",
    titre: "Un escalier est-il bien construit ?",
    materiel: "Une règle.",
    etapes: [
      "Mesure la hauteur d'une marche et sa profondeur, en centimètres.",
      "Fais de même sur deux escaliers différents.",
    ],
    calcul: "Les architectes visent 2 × hauteur + profondeur ≈ 63 cm, la longueur d'un pas. Calcule pour tes escaliers : lequel est le plus confortable ?",
    niveau: "dès la 5e",
  },
];

const BONNES_ACTIONS: Mission[] = [
  {
    id: "ramasser-dechets",
    genre: "bonne-action",
    titre: "10 minutes pour nettoyer un coin de ton quartier",
    materiel: "Des gants, un sac, un adulte avec toi.",
    etapes: [
      "Ramasse pendant 10 minutes les déchets d'un coin de rue, d'un parc ou d'une plage.",
      "Trie-les : plastique, canettes, papier, mégots, autre. Compte chaque sorte.",
    ],
    calcul: "Quel pourcentage de plastique ? Si 25 élèves de ta classe faisaient pareil, combien de déchets en tout ? Et en une année, une fois par mois ?",
    niveau: "dès le CM1",
  },
  {
    id: "eau-douche",
    genre: "bonne-action",
    titre: "Économise l'eau de ta douche",
    materiel: "Un seau ou une bassine graduée, un chronomètre.",
    etapes: [
      "Mesure combien de litres sort la douche en 1 minute (remplis le seau, chronomètre).",
      "Chronomètre ta douche, puis essaie de la raccourcir de 2 minutes.",
    ],
    calcul: "Eau économisée = débit × 2 minutes. Par an : × 365. Une douche coule souvent autour de 10 litres par minute : combien de bouteilles de 1,5 L as-tu sauvées ?",
    niveau: "dès le CM2",
  },
  {
    id: "lumieres-eteintes",
    genre: "bonne-action",
    titre: "La chasse aux lumières allumées pour rien",
    materiel: "Un carnet.",
    etapes: [
      "Pendant une journée, éteins chaque lampe allumée dans une pièce vide, et note-le.",
      "Estime combien de temps elle serait restée allumée.",
    ],
    calcul: "Une ampoule LED de 10 W allumée 1 heure consomme 10 Wh. Total économisé = 10 × nombre d'heures. Combien de recharges de téléphone (environ 15 Wh) cela fait-il ?",
    niveau: "dès la 5e",
  },
  {
    id: "aider-calcul",
    genre: "bonne-action",
    titre: "Explique un calcul à quelqu'un",
    materiel: "Rien, juste toi.",
    etapes: [
      "Aide un plus jeune (frère, sœur, camarade) à faire un calcul ou un exercice qui le bloque.",
      "Ne donne pas la réponse : pose-lui des questions pour qu'il la trouve.",
    ],
    calcul: "Note combien de minutes il t'a fallu. Expliquer, c'est la meilleure façon de comprendre : les savants l'ont mesuré, on retient bien mieux ce qu'on a enseigné.",
    niveau: "pour tous",
  },
  {
    id: "gaspillage-cantine",
    genre: "bonne-action",
    titre: "Moins de pain à la poubelle",
    materiel: "Un carnet, l'accord de la cantine ou de ta famille.",
    etapes: [
      "Pendant une semaine, compte les morceaux de pain jetés à ta table (ou à la maison).",
      "La semaine suivante, chacun ne prend que ce qu'il mange. Compte encore.",
    ],
    calcul: "Calcule la baisse en pourcentage : (avant − après) ÷ avant × 100. Une baguette pèse environ 250 g : combien de baguettes sauvées en un an d'école (36 semaines) ?",
    niveau: "dès la 6e",
  },
];

/** Un jour dehors, un jour une bonne action. */
export function missionDuJour(jour: number): Mission {
  const j = ((jour % 1000000) + 1000000) % 1000000;
  const liste = j % 2 === 0 ? DEHORS : BONNES_ACTIONS;
  const k = Math.floor(j / 2);
  return liste[k % liste.length];
}
