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

import type { ChiffreDuJour } from "./journal";
import type { NiveauJournal } from "./niveaux";

export type Article = {
  id: string;
  /** Les éditions du journal où l'article paraît (12/11/2026, lib/accueil/niveaux.ts).
   *  ⛔ Un article de CP-CE2 ou de CM1-CM2 est ÉCRIT pour eux : phrases courtes,
   *  mots simples, nombres simples. Un même sujet peut avoir plusieurs versions. */
  niveaux: NiveauJournal[];
  /** ⭐ LE LIEN VERS LE COACH (13/11/2026) : c'est ce qui fait du journal un
   *  complément du suivi, et pas un site à côté. Les notions du lexique
   *  (clés de NOTION_COACH_MATHS, lib/matrice/coach.ts) où s'entraîner après
   *  l'article, par ordre de préférence ; « solides@5e » impose la classe.
   *  Le serveur en tire le lien de chaque profil (donnees.ts). */
  coach: string[];
  /** L'édition « Île de La Réunion » (12/11/2026) : l'article n'y paraît que là. */
  reunion?: boolean;
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
  /** Optionnel (13/11/2026) : les vidéos de l'article, par leur id de
   *  lib/videos/videos-r2.json ; le lecteur en fait des boutons vers /video/<id>
   *  (la vidéo s'y ouvre en pause). */
  videos?: { id: string; libelle: string }[];
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
    coach: ["puissances"],
    niveaux: ["4e-3e", "lycee", "adultes"],
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
    coach: ["proportionnalite"],
    niveaux: ["6e-5e", "4e-3e", "lycee", "adultes"],
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
    coach: ["ordres_grandeur", "calcul", "proportionnalite"],
    niveaux: ["6e-5e", "4e-3e", "adultes"],
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
    coach: ["proportionnalite"],
    niveaux: ["6e-5e", "4e-3e", "adultes"],
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
    coach: ["pourcentages"],
    niveaux: ["4e-3e", "lycee", "adultes"],
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
    coach: ["proportionnalite"],
    niveaux: ["6e-5e", "4e-3e", "lycee", "adultes"],
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
    coach: ["grandeurs@5e", "proportionnalite"],
    niveaux: ["6e-5e", "4e-3e", "adultes"],
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
    coach: ["probabilites"],
    niveaux: ["6e-5e", "4e-3e", "adultes"],
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
    coach: ["proportionnalite"],
    niveaux: ["6e-5e", "4e-3e", "lycee", "adultes"],
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
    coach: ["statistiques"],
    niveaux: ["lycee", "adultes"],
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
    coach: ["pourcentages"],
    niveaux: ["6e-5e", "4e-3e", "adultes"],
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
    coach: ["probabilites"],
    niveaux: ["4e-3e", "lycee", "adultes"],
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
    coach: ["fonctions", "proportionnalite"],
    niveaux: ["4e-3e", "lycee", "adultes"],
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
    coach: ["statistiques"],
    niveaux: ["6e-5e", "4e-3e", "lycee", "adultes"],
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
    coach: ["proportionnalite"],
    niveaux: ["6e-5e"],
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

  /* ═══ 12/11/2026 : LES ÉDITIONS PAR NIVEAU ════════════════════════════════
     Frédéric : « les articles doivent correspondre à leurs niveaux ». Les
     articles ci-dessous sont écrits pour une édition : CP-CE2 et CM1-CM2 en
     phrases courtes et nombres simples, une version collège du sondage, et
     deux articles de lycée. */

  // ── CP-CE2 ──────────────────────────────────────────────────────────────
  {
    id: "dents-de-lait",
    coach: ["calcul"],
    niveaux: ["cp-ce2"],
    rubrique: "Santé",
    titre: "Tes dents de lait tombent, et d'autres poussent",
    chapo: "Un enfant a 20 dents de lait. Un adulte a 32 dents. D'où viennent les dents en plus ?",
    corps: [
      "Vers 6 ans, une première dent bouge. Puis elle tombe.",
      "Sous chaque dent de lait, une dent d'adulte attend. Elle pousse et prend la place.",
      "Un adulte a plus de dents qu'un enfant. 12 dents de plus poussent tout au fond de la bouche.",
    ],
    maths: {
      titre: "Compter et enlever",
      lignes: ["Enfant : 20 dents", "Adulte : 32 dents", "32 − 20 = 12 dents en plus"],
    },
    defi: {
      question: "Lina a 20 dents de lait. Elle en perd 3. Combien lui en reste-t-il ?",
      choix: ["23", "17", "3"],
      bonne: 1,
      explication: "Elle perd des dents : on enlève. 20 − 3 = 17.",
    },
    agir: "Brosse tes dents matin et soir, pendant 2 minutes. Pour tenir 2 minutes, compte deux fois jusqu'à 60 dans ta tête.",
    niveau: "dès le CP",
    source: "Assurance maladie (ameli.fr) : 20 dents de lait, 32 dents définitives.",
  },
  {
    id: "abeilles-hexagones",
    coach: ["geometrie"],
    niveaux: ["cp-ce2", "cm"],
    rubrique: "Planète",
    titre: "Pourquoi les abeilles font des cases à 6 côtés",
    chapo: "Dans la ruche, les abeilles rangent le miel dans de petites cases. Toutes les cases ont 6 côtés. Ce n'est pas un hasard.",
    corps: [
      "Une forme à 6 côtés s'appelle un hexagone.",
      "Les cases à 6 côtés se collent les unes aux autres. Il ne reste aucun trou entre elles.",
      "Avec des ronds, il resterait des trous. Ce serait de la place perdue.",
      "Les abeilles fabriquent les cases avec de la cire. Avec des hexagones, il leur faut moins de cire.",
    ],
    maths: {
      titre: "Les formes et leurs côtés",
      lignes: ["Triangle : 3 côtés · carré : 4 côtés", "Hexagone : 6 côtés", "2 cases : 6 + 6 = 12 côtés"],
    },
    defi: {
      question: "Combien de côtés en tout pour 3 cases d'abeilles ?",
      choix: ["9", "18", "12"],
      bonne: 1,
      explication: "Chaque case a 6 côtés : 6 + 6 + 6 = 18.",
    },
    agir: "Dessine des hexagones collés, comme dans une ruche. Puis dessine des ronds collés. Vois-tu les trous entre les ronds ?",
    niveau: "dès le CP",
    source: "Thomas Hales a démontré en 1999 que l'hexagone partage une surface en cases égales avec le moins de bords possible.",
  },
  {
    id: "ballon-32-pieces",
    coach: ["calcul"],
    niveaux: ["cp-ce2", "cm"],
    rubrique: "Sport",
    titre: "Un ballon de foot, c'est 32 morceaux cousus ensemble",
    chapo: "Le ballon de foot classique, blanc et noir, n'est pas fait d'un seul morceau. Compte ses pièces !",
    corps: [
      "Regarde un ballon de foot classique. Il a des pièces noires et des pièces blanches.",
      "Les pièces noires ont 5 côtés. Il y en a 12.",
      "Les pièces blanches ont 6 côtés. Il y en a 20.",
      "Cousues ensemble, elles font une boule presque ronde. Ce ballon a été rendu célèbre par la Coupe du monde de 1970.",
    ],
    maths: {
      titre: "Additionner les pièces",
      lignes: ["12 pièces noires à 5 côtés", "20 pièces blanches à 6 côtés", "12 + 20 = 32 pièces"],
    },
    defi: {
      question: "Il y a 12 pièces noires et 20 pièces blanches. Combien de pièces blanches de plus ?",
      choix: ["8", "32", "10"],
      bonne: 0,
      explication: "On cherche l'écart : 20 − 12 = 8 pièces blanches de plus.",
    },
    agir: "Trouve un ballon et compte ses pièces. A-t-il aussi 32 pièces ? Les ballons d'aujourd'hui en ont souvent moins.",
    niveau: "dès le CP",
    source: "Ballon Telstar de la Coupe du monde 1970 : 12 pentagones et 20 hexagones.",
  },
  {
    id: "semaine-7-jours",
    coach: ["calcul"],
    niveaux: ["cp-ce2", "cm"],
    rubrique: "Histoire",
    titre: "Pourquoi une semaine a 7 jours",
    chapo: "Lundi, mardi, mercredi… Les noms des jours cachent les astres du ciel.",
    corps: [
      "Il y a très longtemps, les gens regardaient le ciel. Ils voyaient 7 astres qui bougent : le Soleil, la Lune et 5 planètes.",
      "On pense que la semaine a 7 jours pour cela : un jour pour chaque astre.",
      "Lundi, c'est le jour de la Lune. Mardi, celui de Mars. Mercredi, celui de Mercure. Jeudi, celui de Jupiter. Vendredi, celui de Vénus.",
    ],
    maths: {
      titre: "Compter par 7",
      lignes: ["1 semaine = 7 jours", "2 semaines = 7 + 7 = 14 jours", "Tous les 7 jours, le même jour revient."],
    },
    defi: {
      question: "Aujourd'hui, c'est lundi. Quel jour serons-nous dans 7 jours ?",
      choix: ["Dimanche", "Mardi", "Lundi"],
      bonne: 2,
      explication: "Une semaine a 7 jours : dans 7 jours, on retombe sur le même jour. Lundi !",
    },
    agir: "Fais un tableau de la semaine. Chaque jour, coche une chose gentille que tu as faite. Compte tes cases dimanche soir.",
    niveau: "dès le CP",
    source: "Noms latins des jours : Lunae dies (lundi), Martis dies (mardi), Mercurii dies (mercredi), Jovis dies (jeudi), Veneris dies (vendredi).",
  },
  {
    id: "tirelire-2-euros",
    coach: ["calcul"],
    niveaux: ["cp-ce2"],
    rubrique: "Argent",
    titre: "2 € par semaine dans ta tirelire : combien à la fin ?",
    chapo: "Mettre un peu d'argent de côté chaque semaine, c'est comme cela qu'on peut s'offrir un vrai cadeau.",
    corps: [
      "Chaque semaine, tu mets une pièce de 2 € dans ta tirelire.",
      "Après 1 semaine, tu as 2 €. Après 2 semaines, tu as 4 €. Après 3 semaines, tu as 6 €.",
      "Petit à petit, la tirelire se remplit. Après 10 semaines, tu as 20 € !",
    ],
    maths: {
      titre: "Compter de 2 en 2",
      lignes: ["2, 4, 6, 8, 10…", "10 semaines : 10 fois 2 €", "2 × 10 = 20 €"],
    },
    defi: {
      question: "Tu mets 2 € par semaine. Combien as-tu après 5 semaines ?",
      choix: ["7 €", "10 €", "25 €"],
      bonne: 1,
      explication: "On compte de 2 en 2 : 2, 4, 6, 8, 10. Après 5 semaines, tu as 10 €.",
    },
    agir: "Choisis une chose que tu aimerais t'offrir. Regarde son prix. Compte combien de semaines il te faudrait.",
    niveau: "dès le CP",
    source: "Calcul EleveAI.",
  },
  {
    id: "jour-et-nuit",
    coach: ["calcul"],
    niveaux: ["cp-ce2"],
    rubrique: "Espace",
    titre: "Pourquoi il fait nuit ? La Terre tourne comme une toupie",
    chapo: "Le soir, le Soleil ne s'en va pas. C'est nous qui tournons !",
    corps: [
      "La Terre tourne sur elle-même, comme une toupie. Elle fait un tour en 24 heures.",
      "Le côté tourné vers le Soleil est dans le jour. L'autre côté est dans la nuit.",
      "Quand tu vas te coucher, des enfants à l'autre bout du monde se lèvent pour aller à l'école.",
    ],
    maths: {
      titre: "Les heures d'une journée",
      lignes: ["1 tour de la Terre = 24 heures", "12 heures + 12 heures = 24 heures", "Le jour et la nuit se partagent les 24 heures."],
    },
    defi: {
      question: "Tu dors 10 heures. Combien d'heures es-tu réveillé dans la journée ?",
      choix: ["14 heures", "34 heures", "10 heures"],
      bonne: 0,
      explication: "Une journée dure 24 heures. 24 − 10 = 14 heures réveillé.",
    },
    agir: "Avec un adulte, prends une lampe et un ballon. Fais tourner le ballon devant la lampe : tu verras le jour et la nuit.",
    niveau: "dès le CE1",
    source: "Rotation de la Terre sur elle-même : environ 24 heures.",
  },

  // ── CM1-CM2 ─────────────────────────────────────────────────────────────
  {
    // La version CM de « bonnes-actions-puissances » : sans puissances, dix jours.
    id: "bonnes-actions-cm",
    coach: ["calcul"],
    niveaux: ["cm", "6e-5e"],
    rubrique: "Société",
    titre: "Une bonne action qui double chaque jour",
    chapo: "Tu aides deux personnes. Le lendemain, chacune en aide deux autres. Le 10e jour, plus de mille bonnes actions en une seule journée !",
    corps: [
      "Jour 1 : tu fais 2 bonnes actions. Jour 2 : les 2 personnes aidées en font 2 chacune. Cela fait 4.",
      "Jour 3 : 8. Jour 4 : 16. Chaque jour, le nombre double.",
      "Au début, c'est tout petit. Mais le 10e jour, il y a 1 024 bonnes actions dans la journée !",
      "Quand on double, on va très vite très loin. C'est vrai pour les bonnes actions… et aussi pour les rumeurs.",
    ],
    maths: {
      titre: "Doubler, doubler, doubler",
      lignes: ["2 → 4 → 8 → 16 → 32", "→ 64 → 128 → 256 → 512 → 1 024", "Doubler, c'est multiplier par 2."],
    },
    defi: {
      question: "Le 6e jour, combien de bonnes actions sont faites ce jour-là ?",
      choix: ["12", "64", "32"],
      bonne: 1,
      explication: "On double chaque jour : 2, 4, 8, 16, 32, 64. Ce n'est pas 2 × 6 = 12.",
    },
    agir: "Lance la chaîne : fais une bonne action à deux personnes, et demande-leur d'en faire autant. Demain, compte combien ont continué.",
    niveau: "dès le CM1",
    source: "Calcul EleveAI.",
  },
  {
    // La version école de « sondage-1000 ».
    id: "sondage-ecole",
    coach: ["proportionnalite"],
    niveaux: ["cm"],
    rubrique: "Société",
    titre: "Savoir ce que pense toute l'école sans demander à tout le monde",
    chapo: "Pour savoir si une soupe est salée, une cuillère suffit. Pour savoir ce que pensent les gens, on interroge un petit groupe.",
    corps: [
      "Pense à une soupe. Pas besoin de la boire entière pour savoir si elle est salée. Une cuillère suffit, si la soupe est bien mélangée.",
      "C'est pareil pour savoir ce que pensent les gens. On pose la question à un petit groupe : c'est un sondage.",
      "Attention : il faut choisir des personnes de toutes sortes. Si tu ne demandes qu'aux grands, tu ne sauras pas ce que pensent les petits.",
      "Un sondage ne donne jamais le résultat exact. Il donne une bonne idée.",
    ],
    maths: {
      titre: "Du petit groupe à tout le monde",
      lignes: ["10 élèves interrogés : 6 aiment le foot", "6 sur 10, c'est comme 60 sur 100", "Dans une école de 200 élèves : environ 120"],
    },
    defi: {
      question: "Sur 10 élèves interrogés, 5 préfèrent les pâtes. Dans une école de 100 élèves, combien environ ?",
      choix: ["5", "50", "15"],
      bonne: 1,
      explication: "5 sur 10, c'est la moitié. La moitié de 100, c'est 50.",
    },
    agir: "Demande à 10 camarades leur fruit préféré. Puis demande à 10 autres. Trouves-tu à peu près la même chose ?",
    niveau: "dès le CM1",
    source: "Principe de l'échantillon, utilisé par tous les instituts de sondage.",
  },
  {
    // La version CM de « coeur-battements ».
    id: "coeur-cm",
    coach: ["proportionnalite"],
    niveaux: ["cm"],
    rubrique: "Santé",
    titre: "Ton cœur bat plus de 100 000 fois par jour",
    chapo: "Pose deux doigts sur ton poignet. Tu sens ces petits coups ? C'est ton cœur qui travaille, jour et nuit.",
    corps: [
      "Ton cœur est un muscle. Il pousse le sang dans tout ton corps, jusqu'au bout de tes doigts.",
      "Chez un enfant au repos, il bat souvent entre 70 et 110 fois par minute. Quand tu cours, il bat encore plus vite.",
      "Une journée a 1 440 minutes. Même à 70 battements par minute, cela fait plus de 100 000 battements par jour !",
    ],
    maths: {
      titre: "Compter vite avec une multiplication",
      lignes: ["En 15 secondes : 20 battements", "1 minute = 4 fois 15 secondes", "20 × 4 = 80 battements par minute"],
    },
    defi: {
      question: "En 15 secondes, tu comptes 25 battements. Combien en 1 minute ?",
      choix: ["100", "40", "29"],
      bonne: 0,
      explication: "1 minute, c'est 4 fois 15 secondes : 25 × 4 = 100 battements.",
    },
    agir: "Compte les battements de ton cœur pendant 15 secondes. Fais 20 sauts, puis recompte. Ton cœur bat-il plus vite ? Bouger chaque jour le rend plus fort.",
    niveau: "dès le CM1",
    source: "Fréquence cardiaque de l'enfant au repos : environ 70 à 110 battements par minute.",
  },
  {
    id: "annee-bissextile",
    coach: ["calcul"],
    niveaux: ["cm", "6e-5e"],
    rubrique: "Espace",
    titre: "Pourquoi certaines années ont un 29 février",
    chapo: "Une année dure 365 jours… pas tout à fait. La Terre met 365 jours et presque 6 heures pour faire le tour du Soleil.",
    corps: [
      "Une année, c'est le temps que met la Terre pour faire le tour du Soleil. Ce tour dure 365 jours et presque 6 heures.",
      "Ces 6 heures en trop, on ne peut pas les oublier. En 4 ans, elles font 24 heures : un jour entier !",
      "Alors, tous les 4 ans, on ajoute un jour au calendrier : le 29 février. Cette année-là a 366 jours. C'est une année bissextile. La prochaine sera 2028.",
    ],
    maths: {
      titre: "Additionner les heures",
      lignes: ["6 h + 6 h + 6 h + 6 h = 24 h", "4 × 6 h = 24 h = 1 jour", "Année bissextile : 365 + 1 = 366 jours"],
    },
    defi: {
      question: "2028 est une année bissextile. Quelle sera la suivante ?",
      choix: ["2030", "2032", "2029"],
      bonne: 1,
      explication: "Une année bissextile revient tous les 4 ans : 2028 + 4 = 2032.",
    },
    agir: "Connais-tu quelqu'un né un 29 février ? Calcule combien de vrais anniversaires il a eus depuis sa naissance.",
    niveau: "dès le CM1",
    source: "Calendrier grégorien ; une année dure environ 365,24 jours (d'où une exception : 2100 ne sera pas bissextile).",
  },
  {
    id: "douche-ou-bain",
    coach: ["proportionnalite"],
    niveaux: ["cm", "6e-5e"],
    rubrique: "Planète",
    titre: "Douche ou bain : lequel boit le plus d'eau ?",
    chapo: "Un bain, c'est agréable. Mais il utilise autant d'eau que plusieurs douches. Faisons le calcul.",
    corps: [
      "Une douche coule souvent autour de 10 litres par minute. Une douche de 5 minutes utilise donc environ 50 litres d'eau.",
      "Une baignoire remplie, c'est environ 150 litres.",
      "Un bain utilise donc autant d'eau que 3 douches de 5 minutes. Et l'eau propre demande du travail : il faut la pomper, la nettoyer, la chauffer.",
    ],
    maths: {
      titre: "Multiplier et comparer",
      lignes: ["Douche : 10 L × 5 min = 50 L", "Bain : environ 150 L", "150 ÷ 50 = 3 : un bain = 3 douches"],
    },
    defi: {
      question: "Une douche coule 10 litres par minute. Combien de litres pour une douche de 8 minutes ?",
      choix: ["18 litres", "80 litres", "800 litres"],
      bonne: 1,
      explication: "10 litres chaque minute, pendant 8 minutes : 10 × 8 = 80 litres.",
    },
    agir: "Chronomètre ta prochaine douche et essaie de gagner 1 minute. Tu économises environ 10 litres, presque 7 bouteilles de 1,5 litre.",
    niveau: "dès le CM1",
    source: "Ordres de grandeur courants : douche classique 10 à 15 L par minute, baignoire 150 à 200 L.",
  },

  // ── COLLÈGE : la version collège du sondage ─────────────────────────────
  {
    id: "sondage-college",
    coach: ["pourcentages"],
    niveaux: ["6e-5e", "4e-3e"],
    rubrique: "Société",
    titre: "Un sondage de 1 000 personnes peut-il se tromper ?",
    chapo: "Avant une élection, on interroge environ 1 000 personnes pour deviner le choix de millions d'électeurs. Ça marche… à quelques points près.",
    corps: [
      "Pense à une soupe : pour savoir si elle est salée, une cuillère suffit, à condition d'avoir bien mélangé.",
      "Pour un sondage, « bien mélanger », c'est choisir des personnes qui ressemblent à tout le pays : des jeunes et des plus âgés, des villes et des campagnes, tous les métiers.",
      "Plus on interroge de monde, moins on se trompe. Avec 100 personnes, le résultat peut être faux de 10 points. Avec 1 000, d'environ 3 points.",
      "Alors, quand un sondage donne 51 % contre 49 %, personne ne peut dire qui va gagner : l'écart est plus petit que l'erreur possible.",
    ],
    maths: {
      titre: "Pourcentages et erreur possible",
      lignes: [
        "600 personnes sur 1 000 : 600 ÷ 1 000 = 0,6 = 60 %",
        "Erreur possible avec 1 000 personnes : environ 3 points",
        "« 60 % » veut donc dire : entre 57 % et 63 %.",
      ],
    },
    defi: {
      question: "Sur 500 personnes interrogées, 200 aiment le cinéma. Quel pourcentage ?",
      choix: ["20 %", "40 %", "200 %"],
      bonne: 1,
      explication: "200 ÷ 500 = 0,4, soit 40 %. Ou encore : 200 sur 500, c'est 40 sur 100.",
    },
    agir: "Fais un sondage dans ta classe, puis dans une autre. Les résultats sont-ils les mêmes ? Tu viens de voir l'erreur possible de tes yeux.",
    niveau: "dès la 6e",
    source: "Marge d'erreur d'un sondage au hasard, au seuil de 95 % : environ 1 ÷ √n pour n personnes (vu au lycée).",
  },

  // ── LYCÉE ───────────────────────────────────────────────────────────────
  {
    id: "carbone-14",
    coach: ["puissances"],
    niveaux: ["lycee", "adultes"],
    rubrique: "Histoire",
    titre: "Comment on sait qu'un os a 10 000 ans",
    chapo: "Tout être vivant contient un peu de carbone 14, qui disparaît lentement après sa mort. Sa moitié s'en va tous les 5 730 ans environ : c'est une horloge.",
    corps: [
      "Tant qu'une plante ou un animal vit, il échange du carbone avec l'air : la part de carbone 14 dans son corps reste à peu près constante.",
      "À sa mort, les échanges s'arrêtent. Le carbone 14 se désintègre peu à peu : au bout d'environ 5 730 ans, il n'en reste que la moitié. C'est sa demi-vie.",
      "En mesurant ce qui reste, on remonte le temps. La méthode fonctionne jusqu'à environ 50 000 ans : au-delà, il en reste trop peu pour le mesurer.",
    ],
    maths: {
      titre: "Une suite géométrique de raison 1/2",
      lignes: [
        "Après n demi-vies : quantité = Q₀ × (1/2)ⁿ",
        "Il reste 25 % = (1/2)² → 2 × 5 730 = 11 460 ans",
        "Il reste 1/8 = (1/2)³ → 3 × 5 730 = 17 190 ans",
      ],
    },
    defi: {
      question: "Un os ne contient plus que 12,5 % de son carbone 14 de départ. Quel âge a-t-il environ ?",
      choix: ["5 730 ans", "17 190 ans", "45 840 ans"],
      bonne: 1,
      explication: "12,5 % = 1/8 = (1/2)³ : trois demi-vies, soit 3 × 5 730 = 17 190 ans (et non 8 × 5 730).",
    },
    agir: "Au prochain musée, lis l'âge d'un objet ancien : combien de demi-vies du carbone 14 cela fait-il ? Quelle part en restait-il ?",
    niveau: "dès la seconde (suites géométriques en 1re)",
    source: "Demi-vie du carbone 14 : 5 730 ± 40 ans ; méthode de Willard Libby, prix Nobel de chimie 1960.",
  },
  {
    id: "faux-positifs",
    coach: ["probabilites_conditionnelles"],
    niveaux: ["lycee", "adultes"],
    rubrique: "Santé",
    titre: "Un test fiable à 99 % peut se tromper une fois sur deux",
    chapo: "Quand une maladie est rare, même un excellent test donne beaucoup de fausses alertes. Le paradoxe se résout avec un simple tableau.",
    corps: [
      "Imagine une maladie qui touche 1 personne sur 100. Le test la repère chez 99 % des malades, et ne se trompe que chez 1 % des personnes en bonne santé.",
      "Testons 10 000 personnes. Il y a 100 malades : le test en repère 99. Il y a 9 900 personnes en bonne santé : 1 % d'entre elles, soit 99, ont pourtant un test positif.",
      "Sur 198 tests positifs, seulement 99 sont de vrais malades : une chance sur deux ! C'est pour cela qu'on refait toujours un second test avant d'annoncer un diagnostic.",
    ],
    maths: {
      titre: "Les probabilités conditionnelles",
      lignes: [
        "Positifs : 99 vrais + 99 faux = 198",
        "P(malade sachant positif) = 99 ÷ 198 = 0,5",
        "Le résultat dépend de la rareté de la maladie.",
      ],
    },
    defi: {
      question: "Même test, mais la maladie touche 1 personne sur 10 (1 000 malades sur 10 000). Quelle part des positifs est vraiment malade ?",
      choix: ["Environ 50 %", "Environ 92 %", "Exactement 99 %"],
      bonne: 1,
      explication: "990 vrais positifs, et 1 % de 9 000 = 90 faux : 990 ÷ 1 080 ≈ 0,92. Plus la maladie est fréquente, plus un test positif est sûr.",
    },
    agir: "Avant de croire une alerte (un test, une rumeur, un détecteur), demande-toi : sur combien de cas ? Dessine le tableau à double entrée avec 10 000 personnes.",
    niveau: "dès la seconde avec le tableau (probabilités conditionnelles en 1re)",
    source: "Exemple de calcul EleveAI ; c'est la formule de Bayes (programme de 1re).",
  },

  /* ═══ 12/11/2026 : LE JOURNAL SCIENTIFIQUE DE L'ÎLE DE LA RÉUNION ══════════
     Frédéric : « journal scientifique de l'île de La Réunion », « tu me crées
     une version île de La Réunion ». Une ÉDITION à part (interrupteur « Le
     monde / Île de La Réunion » sur la page) : ces articles (`reunion: true`)
     n'y paraissent que là, et l'édition « Le monde » garde La Réunion à ≈ 4 %.
     ⛔ Des faits solides : chaque chiffre a sa source. */

  // ── La Réunion, CP-CE2 et CM1-CM2 ───────────────────────────────────────
  {
    id: "reunion-fournaise",
    coach: ["calcul"],
    reunion: true,
    niveaux: ["cp-ce2", "cm"],
    rubrique: "Planète",
    titre: "Le Piton de la Fournaise se réveille presque chaque année",
    chapo: "Au sud-est de l'île, un volcan crache de la lave rouge. C'est l'un des volcans les plus actifs du monde.",
    corps: [
      "Le Piton de la Fournaise mesure 2 632 mètres de haut.",
      "Quand il se réveille, on dit qu'il entre en éruption. De la lave très chaude sort de la terre et coule sur ses pentes.",
      "La lave est plus chaude qu'un four : plus de 1 000 degrés ! Il ne faut jamais s'en approcher.",
      "Les scientifiques de l'observatoire du volcan l'écoutent jour et nuit avec des appareils. Ils savent souvent qu'il va se réveiller avant tout le monde.",
    ],
    maths: {
      titre: "Comparer des hauteurs",
      lignes: ["Piton des Neiges : 3 070 m", "Piton de la Fournaise : 2 632 m", "3 070 > 2 632 : le Piton des Neiges est le plus haut"],
    },
    defi: {
      question: "Le volcan fait 1 éruption par an. Combien d'éruptions en 4 ans ?",
      choix: ["5", "1", "4"],
      bonne: 2,
      explication: "1 éruption chaque année, pendant 4 ans : 1 + 1 + 1 + 1 = 4 éruptions.",
    },
    agir: "Pendant une éruption, on regarde la lave de loin, seulement là où c'est permis. Dessine le volcan et écris sa hauteur : 2 632 m.",
    niveau: "dès le CE1",
    source: "Observatoire volcanologique du Piton de la Fournaise (IPGP) ; altitude 2 632 m.",
  },
  {
    id: "reunion-cyclones",
    coach: ["calcul"],
    reunion: true,
    niveaux: ["cp-ce2", "cm"],
    rubrique: "Planète",
    titre: "Pourquoi les cyclones arrivent pendant l'été",
    chapo: "À La Réunion, les cyclones viennent entre novembre et avril. C'est l'été austral : la mer est chaude.",
    corps: [
      "Un cyclone est une immense tempête qui tourne sur elle-même, comme une toupie géante.",
      "Il naît au-dessus d'une mer très chaude. Plus la mer est chaude, plus il peut devenir fort.",
      "On parle de cyclone quand le vent dépasse 118 kilomètres par heure. C'est plus vite qu'une voiture sur la route !",
      "Pendant l'alerte rouge, on reste à la maison. Les météorologues suivent le cyclone pour prévenir tout le monde.",
    ],
    maths: {
      titre: "Compter les mois",
      lignes: ["Novembre, décembre, janvier", "février, mars, avril", "La saison des cyclones dure 6 mois."],
    },
    defi: {
      question: "La saison des cyclones va de novembre à avril. Combien de mois cela fait-il ?",
      choix: ["4 mois", "6 mois", "12 mois"],
      bonne: 1,
      explication: "Novembre, décembre, janvier, février, mars, avril : on compte 6 mois.",
    },
    agir: "Avec ta famille, vérifie le sac du cyclone : une lampe, de l'eau, des piles. Compte combien de bouteilles d'eau il faut pour 3 jours.",
    niveau: "dès le CP",
    source: "Météo-France La Réunion : saison cyclonique du 1er novembre au 30 avril ; cyclone tropical à partir de 118 km/h.",
  },
  {
    id: "reunion-tortues",
    coach: ["calcul"],
    reunion: true,
    niveaux: ["cp-ce2", "cm"],
    rubrique: "Planète",
    titre: "100 œufs dans le sable, et si peu de tortues adultes",
    chapo: "La tortue verte vient pondre ses œufs sur les plages de l'océan Indien. Mais la vie d'une petite tortue est très difficile.",
    corps: [
      "La nuit, la maman tortue creuse un trou dans le sable. Elle y pond environ 100 œufs.",
      "Deux mois plus tard, les bébés sortent du sable et courent vers la mer.",
      "Les crabes, les oiseaux et les poissons en mangent beaucoup. Les scientifiques pensent qu'environ 1 bébé sur 1 000 devient adulte.",
      "À Saint-Leu, le centre Kélonia soigne les tortues blessées et les relâche dans la mer.",
    ],
    maths: {
      titre: "Des grands nombres",
      lignes: ["1 nid : environ 100 œufs", "10 nids : 10 × 100 = 1 000 œufs", "Sur 1 000 bébés, environ 1 adulte"],
    },
    defi: {
      question: "Une tortue pond 100 œufs dans un nid. Elle fait 3 nids. Combien d'œufs en tout ?",
      choix: ["103", "300", "30"],
      bonne: 1,
      explication: "100 + 100 + 100 = 300 œufs. C'est aussi 3 × 100 = 300.",
    },
    agir: "Une tortue peut mourir en avalant un sac en plastique : elle le prend pour une méduse. Ramasse les plastiques sur la plage, avec un adulte.",
    niveau: "dès le CP",
    source: "Kélonia, l'observatoire des tortues marines (Saint-Leu) ; environ 100 œufs par ponte chez la tortue verte.",
  },
  {
    id: "reunion-trois-cirques",
    coach: ["calcul"],
    reunion: true,
    niveaux: ["cp-ce2", "cm"],
    rubrique: "Histoire",
    titre: "Trois cirques au cœur de l'île",
    chapo: "Au milieu de La Réunion, il y a trois immenses creux entourés de montagnes : Cilaos, Mafate et Salazie.",
    corps: [
      "Il y a très, très longtemps, le Piton des Neiges était un volcan. Il ne crache plus de lave aujourd'hui.",
      "La pluie et les rivières ont creusé la montagne pendant des milliers et des milliers d'années. Elles ont fait trois grands creux : les cirques.",
      "À Cilaos et à Salazie, on arrive en voiture. À Mafate, il n'y a pas de route : on y va à pied ou en hélicoptère !",
    ],
    maths: {
      titre: "Compter et ranger",
      lignes: ["Cilaos, Mafate, Salazie : 3 cirques", "Avec une route : Cilaos et Salazie, 2 cirques", "Sans route : Mafate, 1 cirque · 2 + 1 = 3"],
    },
    defi: {
      question: "Il y a 3 cirques. Combien n'ont pas de route ?",
      choix: ["1", "2", "3"],
      bonne: 0,
      explication: "Cilaos et Salazie ont une route. Seul Mafate n'en a pas : 3 − 2 = 1.",
    },
    agir: "Sur une carte de l'île, trouve les 3 cirques et colorie-les. Lequel te semble le plus grand ?",
    niveau: "dès le CP",
    source: "Parc national de La Réunion ; « Pitons, cirques et remparts », patrimoine mondial de l'UNESCO depuis 2010.",
  },

  {
    // ⭐ L'idée de Frédéric, 12/11/2026 : le bassin de baignade de Grande Anse
    // (Petite-Île), fermé côté mer, où l'eau ne se renouvelle plus. « C'est
    // extrêmement important d'avoir un journal scientifique de La Réunion pour
    // expliquer les choses. » ⚠️ Les nombres sont un EXEMPLE CHIFFRÉ (dit dans
    // l'article), pas des mesures du bassin.
    id: "reunion-bassin-ecole",
    coach: ["calcul"],
    reunion: true,
    uneLe: "2026-11-12",
    niveaux: ["cp-ce2", "cm"],
    rubrique: "Santé",
    titre: "Un bassin sans sortie, c'est une baignoire qu'on ne vide jamais",
    chapo: "À Grande Anse, un bassin protège les baigneurs des vagues. Mais si l'eau de mer n'entre plus et ne sort plus, elle devient sale.",
    corps: [
      "Imagine ton bain. Tu ne vides jamais la baignoire. Chaque jour, toute la famille s'y lave. Au bout d'une semaine, l'eau est-elle propre ?",
      "Un bassin au bord de la mer, c'est pareil. Si l'eau de mer n'entre plus et ne sort plus, la saleté reste dedans.",
      "Et quand des baigneurs font pipi dans l'eau, ce pipi reste aussi dans le bassin. Avec le soleil, l'eau chauffe, et de petits microbes grandissent.",
      "Pour garder l'eau propre, il faut qu'elle change : la mer doit pouvoir entrer, et l'eau du bassin doit pouvoir sortir.",
    ],
    maths: {
      titre: "Ça s'ajoute chaque jour (exemple chiffré)",
      lignes: ["1 jour : 10 verres de pipi", "2 jours : 10 + 10 = 20 verres", "7 jours : 7 × 10 = 70 verres, si l'eau ne change pas"],
    },
    defi: {
      question: "Chaque jour, 10 verres de pipi arrivent dans le bassin fermé. Combien après 3 jours ?",
      choix: ["13 verres", "30 verres", "10 verres"],
      bonne: 1,
      explication: "L'eau ne sort pas, donc tout s'ajoute : 10 + 10 + 10 = 30 verres.",
    },
    agir: "Avant de te baigner, passe aux toilettes ! Et explique à tes amis pourquoi : dans un bassin fermé, tout ce qu'on y met reste dedans.",
    videos: [
      { id: "journal-bassin-grande-anse-short", libelle: "Le dessin animé de Ti Margo (2 min)" },
      { id: "journal-bassin-grande-anse-paysage", libelle: "Pour aller plus loin : le volume du bassin (5 min)" },
    ],
    niveau: "dès le CP",
    source: "Exemple chiffré EleveAI ; Agence régionale de santé : contrôle de la qualité des eaux de baignade.",
  },
  {
    id: "reunion-bassin",
    coach: ["solides@5e"],
    reunion: true,
    uneLe: "2026-11-12",
    niveaux: ["6e-5e", "4e-3e", "lycee", "adultes"],
    rubrique: "Santé",
    titre: "Grande Anse : pourquoi l'eau d'un bassin fermé finit par croupir",
    chapo: "Un bassin de baignade au bord de l'océan protège des vagues. Mais sans échange avec la mer, l'eau ne se renouvelle plus : tout ce qui y entre y reste.",
    corps: [
      "Un bassin de mer reste propre tant que l'océan le rince : à chaque vague, à chaque marée, de l'eau neuve entre et l'eau usée repart. Si on ferme le passage, le bassin devient une baignoire qu'on ne vide jamais.",
      "Les baigneurs apportent crème solaire, sueur… et urine. Dans une eau qui se renouvelle, tout cela est dilué puis emporté. Dans une eau qui stagne, cela s'accumule jour après jour.",
      "Le soleil chauffe cette eau immobile. Or, dans une eau chaude et nourrie, certaines bactéries se multiplient très vite : dans de bonnes conditions, leur nombre peut doubler en une vingtaine de minutes.",
      "La solution est une question de débit : laisser entrer assez d'eau de mer, et lui laisser une sortie. C'est exactement ce que calculent les ingénieurs en hydraulique.",
    ],
    maths: {
      titre: "Volume, accumulation et renouvellement (exemple chiffré)",
      lignes: [
        "Bassin de 50 m × 20 m × 1,5 m = 1 500 m³ = 1 500 000 L",
        "200 baigneurs × 0,1 L par jour = 20 L par jour → 30 jours : 600 L",
        "Si la mer renouvelle 1 500 m³ par jour, l'eau est neuve chaque jour.",
      ],
    },
    defi: {
      question: "Un bassin contient 1 500 m³. La mer y fait entrer 300 m³ par jour. En combien de jours toute l'eau est-elle remplacée ?",
      choix: ["5 jours", "1 200 jours", "300 jours"],
      bonne: 0,
      explication: "1 500 ÷ 300 = 5 : il faut environ 5 jours pour renouveler tout le volume. Fermé, ce temps devient infini.",
    },
    agir: "Calcule le volume d'un bassin que tu connais (longueur × largeur × profondeur moyenne). Puis demande-toi : par où l'eau entre-t-elle, et par où sort-elle ?",
    videos: [
      { id: "journal-bassin-grande-anse-paysage", libelle: "Le dessin animé : comprendre le volume en 5 min" },
      { id: "journal-bassin-grande-anse-short", libelle: "Le short de Ti Margo (2 min)" },
    ],
    niveau: "dès la 6e (volumes en 5e, doublements en 4e)",
    source: "Exemple chiffré EleveAI ; doublement des bactéries en environ 20 minutes en conditions favorables (Escherichia coli, laboratoire).",
  },

  // ── La Réunion : LE SPORT (Frédéric, 12/11 : « au collège, le foot, le vélo,
  //    la lutte, le sport, c'est hyper important », « il faut que le journal
  //    parle de ça, de La Réunion »). ─────────────────────────────────────────
  {
    id: "reunion-foot-payet",
    coach: ["statistiques"],
    reunion: true,
    niveaux: ["cm", "6e-5e", "4e-3e", "lycee", "adultes"],
    rubrique: "Sport",
    titre: "De Saint-Pierre à l'équipe de France : les maths d'un buteur",
    chapo: "Dimitri Payet est né à Saint-Pierre. Avec l'équipe de France, il a marqué 8 buts en 38 matchs. Est-ce beaucoup ? Les statistiques répondent.",
    corps: [
      "La Réunion a donné plusieurs joueurs à l'équipe de France : Dimitri Payet, Guillaume Hoarau, Florent Sinama-Pongolle… Tous ont commencé sur les terrains de l'île.",
      "Pour comparer des joueurs, les recruteurs ne regardent pas seulement le nombre de buts : ils calculent des moyennes, des buts par match.",
      "8 buts en 38 matchs, cela fait environ 0,21 but par match : un but tous les 5 matchs environ. Pour un milieu de terrain, qui fait surtout marquer les autres, c'est très bien.",
      "Aujourd'hui, les clubs mesurent tout : les kilomètres courus, les passes réussies, les tirs cadrés. Derrière chaque match, il y a des tableaux de nombres.",
    ],
    maths: {
      titre: "Une moyenne : buts ÷ matchs",
      lignes: ["8 ÷ 38 ≈ 0,21 but par match", "38 ÷ 8 ≈ 4,75 : un but tous les 5 matchs environ", "Passes : 45 réussies sur 50 → 45 ÷ 50 = 90 %"],
    },
    defi: {
      question: "Un joueur marque 12 buts en 30 matchs. Combien de buts par match en moyenne ?",
      choix: ["0,4", "2,5", "0,12"],
      bonne: 0,
      explication: "12 ÷ 30 = 0,4 but par match. (2,5 = 30 ÷ 12, c'est le nombre de matchs pour un but.)",
    },
    agir: "À ton prochain match, note tes passes réussies et ratées. Calcule ton pourcentage de passes réussies, puis essaie de le battre la fois suivante.",
    niveau: "dès le CM2 (pourcentages en 6e)",
    source: "Fédération française de football : Dimitri Payet, 38 sélections et 8 buts en équipe de France.",
  },
  {
    id: "reunion-velo-maido",
    coach: ["pourcentages"],
    reunion: true,
    niveaux: ["6e-5e", "4e-3e", "lycee", "adultes"],
    rubrique: "Sport",
    titre: "Monter au Maïdo à vélo : la pente en pourcentage",
    chapo: "Du bord de mer au Maïdo, on grimpe environ 2 200 mètres. Les cyclistes de l'île connaissent cette montée par cœur. Mais que veut dire « une pente à 10 % » ?",
    corps: [
      "Sur les panneaux de montagne, la pente s'écrit en pourcentage. « 10 % » veut dire : pour 100 mètres parcourus à l'horizontale, on monte de 10 mètres.",
      "Plus le pourcentage est grand, plus c'est dur : à 10 %, beaucoup de cyclistes passent sur leur plus petit braquet ; à 20 %, certains poussent leur vélo.",
      "Pour gravir 2 200 m de dénivelé avec une pente moyenne de 7 %, il faut parcourir plus de 30 km de montée. Chaque année, des courses cyclistes de l'île empruntent ses routes de montagne.",
    ],
    maths: {
      titre: "Pente = dénivelé ÷ distance horizontale",
      lignes: ["Monter de 10 m sur 100 m : 10 ÷ 100 = 10 %", "2 200 ÷ 0,07 ≈ 31 400 m, soit environ 31 km", "Vitesse : 31 km en 2 h → 15,5 km/h"],
    },
    defi: {
      question: "Une route monte de 24 m sur 300 m à l'horizontale. Quelle est sa pente ?",
      choix: ["8 %", "24 %", "12,5 %"],
      bonne: 0,
      explication: "24 ÷ 300 = 0,08, soit 8 %.",
    },
    agir: "Avec un adulte, chronomètre une montée à vélo près de chez toi, puis la même descente. Calcule tes deux vitesses : de combien de fois la descente est-elle plus rapide ?",
    niveau: "dès la 6e (pourcentages)",
    source: "Définition de la pente d'une route en pourcentage ; Maïdo ≈ 2 200 m d'altitude.",
  },
  {
    id: "reunion-moringue",
    coach: ["proportionnalite"],
    reunion: true,
    niveaux: ["cm", "6e-5e", "4e-3e"],
    rubrique: "Sport",
    titre: "Le moringue : lutter en rythme, dans un cercle",
    chapo: "Le moringue est un art de combat de La Réunion. On s'y affronte en musique, au milieu d'un rond de spectateurs.",
    corps: [
      "Le moringue est né chez les esclaves venus de Madagascar et d'Afrique. Il mélange la lutte, la danse et la musique.",
      "Les deux lutteurs s'affrontent au milieu d'un cercle de spectateurs, au son des tambours. Il faut esquiver, sauter, faire tomber, sans jamais perdre le rythme.",
      "Le rythme, ce sont des maths : les temps se comptent, se répètent, se groupent par 2, par 3 ou par 4.",
    ],
    maths: {
      titre: "Le cercle et le rythme",
      lignes: ["Rond de 6 m de diamètre : tour ≈ 3,14 × 6 ≈ 19 m", "4 temps par mesure, 8 mesures : 4 × 8 = 32 temps", "120 battements par minute → 2 par seconde"],
    },
    defi: {
      question: "Le tambour joue 120 battements par minute. Combien de battements en 30 secondes ?",
      choix: ["60", "90", "240"],
      bonne: 0,
      explication: "30 secondes, c'est la moitié d'une minute : 120 ÷ 2 = 60 battements.",
    },
    agir: "Frappe un rythme dans tes mains en comptant « 1, 2, 3, 4 ». Chronomètre-toi pendant 1 minute : combien de temps as-tu frappés ?",
    niveau: "dès le CM1",
    source: "Le moringue, art de combat traditionnel de La Réunion, pratiqué en clubs sur toute l'île.",
  },

  // ── La Réunion : LA VIE DE L'ÎLE (Frédéric, 12/11 : « tu parles de la canne
  //    à sucre, des poissons, du Grand Raid, des plages, de la montagne, du
  //    sport, du soleil… de la vie, quoi », « et le vivre ensemble »). ───────
  {
    id: "reunion-canne-a-sucre",
    coach: ["proportionnalite"],
    reunion: true,
    niveaux: ["cm", "6e-5e", "4e-3e", "lycee", "adultes"],
    rubrique: "Argent",
    titre: "Une tonne de canne, combien de sucre ?",
    chapo: "De juillet à décembre, les camions chargés de canne roulent vers les deux usines de l'île. Dans une tonne de canne, il y a bien moins de sucre qu'on ne croit.",
    corps: [
      "La canne à sucre est une grande herbe gorgée de jus sucré. À l'usine, on la broie pour en tirer le jus, puis on fait évaporer l'eau jusqu'à obtenir des cristaux de sucre.",
      "Une tonne de canne, c'est 1 000 kg. On en tire environ 110 kg de sucre : à peu près un dixième. Le reste, c'est surtout de l'eau et des fibres.",
      "Rien ne se perd : les fibres, la bagasse, sont brûlées pour produire de l'électricité. Pendant la campagne sucrière, la canne éclaire une partie de l'île.",
    ],
    maths: {
      titre: "Une proportion",
      lignes: ["1 000 kg de canne → environ 110 kg de sucre", "110 ÷ 1 000 = 11 %", "Un camion de 20 tonnes : 20 × 110 = 2 200 kg de sucre"],
    },
    defi: {
      question: "Avec 110 kg de sucre par tonne de canne, combien de sucre donnent 5 tonnes de canne ?",
      choix: ["550 kg", "115 kg", "5 500 kg"],
      bonne: 0,
      explication: "5 tonnes, c'est 5 fois plus : 5 × 110 = 550 kg de sucre.",
    },
    agir: "Regarde sur un paquet de gâteaux combien de grammes de sucre il contient pour 100 g. Combien de morceaux de sucre (5 g chacun) cela fait-il ?",
    niveau: "dès le CM2",
    source: "Filière canne-sucre de La Réunion : sucreries de Bois-Rouge et du Gol, environ 110 kg de sucre par tonne de canne ; bagasse brûlée en centrale.",
  },
  {
    id: "reunion-poissons-lagon",
    coach: ["calcul"],
    reunion: true,
    niveaux: ["cp-ce2", "cm", "6e-5e"],
    rubrique: "Planète",
    titre: "Le poisson-perroquet fabrique le sable de la plage",
    chapo: "Dans le lagon, un poisson de toutes les couleurs croque le corail. Ce qu'il rejette devient du sable blanc.",
    corps: [
      "Le lagon est une piscine naturelle. Une barrière de corail le protège des grosses vagues.",
      "Le corail n'est pas un caillou : il est fabriqué par de tout petits animaux.",
      "Le poisson-perroquet a un bec très dur. Il croque le corail pour manger les algues. Puis il rejette une poudre blanche : du sable !",
      "Un seul poisson peut fabriquer des dizaines de kilos de sable en une année. Sans lui, la plage serait bien plus petite.",
    ],
    maths: {
      titre: "Ajouter chaque année",
      lignes: ["1 poisson : environ 50 kg de sable par an", "2 poissons : 50 + 50 = 100 kg", "10 poissons : 10 × 50 = 500 kg par an"],
    },
    defi: {
      question: "Un poisson-perroquet fabrique 50 kg de sable par an. Combien en 2 ans ?",
      choix: ["52 kg", "100 kg", "25 kg"],
      bonne: 1,
      explication: "50 kg la première année, 50 kg la deuxième : 50 + 50 = 100 kg.",
    },
    agir: "Dans le lagon, on regarde sans toucher. Ne marche pas sur le corail : il met des années à repousser.",
    niveau: "dès le CE1",
    source: "Réserve naturelle marine de La Réunion (créée en 2007) ; les poissons-perroquets produisent du sable corallien (ordre de grandeur : dizaines de kg par an).",
  },
  {
    id: "reunion-soleil",
    coach: ["fractions", "proportionnalite"],
    reunion: true,
    niveaux: ["6e-5e", "4e-3e", "lycee", "adultes"],
    rubrique: "Santé",
    titre: "Indice UV 11 : le soleil de l'île, ami et ennemi",
    chapo: "En été, à midi, l'indice UV dépasse souvent 11 à La Réunion : le niveau « extrême ». Le même soleil peut pourtant alimenter toute une maison.",
    corps: [
      "L'indice UV mesure la force des rayons ultraviolets, ceux qui brûlent la peau. De 1 à 2, le risque est faible ; à partir de 8, il est très fort ; à 11 et plus, il est extrême.",
      "Sous les tropiques, le soleil passe très haut dans le ciel : ses rayons traversent moins d'air et arrivent plus forts. Entre 11 h et 15 h, mieux vaut l'ombre, un chapeau et de la crème.",
      "Ce soleil est aussi une énergie. En plein midi, chaque mètre carré de sol reçoit environ 1 000 watts. Un panneau solaire en transforme à peu près un cinquième en électricité.",
    ],
    maths: {
      titre: "Une fraction d'une puissance",
      lignes: ["1 m² au soleil : environ 1 000 W", "Panneau : 1/5 de 1 000 = 200 W par m²", "10 m² de panneaux : 10 × 200 = 2 000 W"],
    },
    defi: {
      question: "Un panneau produit 200 W par m². Quelle surface faut-il pour produire 3 000 W ?",
      choix: ["15 m²", "600 m²", "1,5 m²"],
      bonne: 0,
      explication: "3 000 ÷ 200 = 15 : il faut 15 m² de panneaux.",
    },
    agir: "Regarde l'indice UV du jour dans le bulletin météo, pendant une semaine. Trace le graphique, et mets ton chapeau dès que l'indice dépasse 3.",
    niveau: "dès la 6e (fractions)",
    source: "Organisation mondiale de la santé : échelle de l'indice UV ; éclairement solaire maximal au sol d'environ 1 000 W/m².",
  },
  {
    id: "reunion-vivre-ensemble",
    coach: ["calcul", "problemes"],
    reunion: true,
    niveaux: ["cm", "6e-5e", "4e-3e", "lycee", "adultes"],
    rubrique: "Société",
    titre: "Une île sans habitants il y a 400 ans, un monde entier aujourd'hui",
    chapo: "Avant 1663, personne ne vivait à La Réunion. Depuis, des femmes et des hommes sont venus d'Afrique, de Madagascar, d'Inde, de Chine, d'Europe, des Comores… et vivent ensemble.",
    corps: [
      "Les premiers habitants se sont installés pour de bon en 1663. Tous les Réunionnais d'aujourd'hui descendent donc de gens venus d'ailleurs, de leur plein gré ou de force.",
      "Beaucoup sont arrivés comme esclaves. L'esclavage a été aboli sur l'île le 20 décembre 1848 : c'est aujourd'hui un jour férié, la Fête de la liberté.",
      "Dans une même ville, on peut trouver une église, un temple, une mosquée et une pagode. On y fête Noël, le Dipavali, l'Aïd et le Nouvel An chinois, et tout le monde est invité.",
      "Des couleurs de peau, des cuisines, des musiques et des croyances différentes, sur une île de 2 512 km² : La Réunion montre que vivre ensemble, cela s'apprend et cela marche.",
    ],
    maths: {
      titre: "Calculer des durées",
      lignes: ["2026 − 1663 = 363 ans d'histoire habitée", "2026 − 1848 = 178 ans depuis l'abolition", "1848 − 1663 = 185 ans d'esclavage sur l'île"],
    },
    defi: {
      question: "L'esclavage a été aboli à La Réunion en 1848. En quelle année fêtera-t-on les 200 ans de l'abolition ?",
      choix: ["2048", "2026", "2148"],
      bonne: 0,
      explication: "1848 + 200 = 2048.",
    },
    agir: "Demande à trois personnes de ta classe d'où venaient leurs arrière-grands-parents. Place les réponses sur une carte du monde : combien de pays ?",
    niveau: "dès le CM1",
    source: "Histoire du peuplement de La Réunion (installation permanente en 1663) ; abolition de l'esclavage proclamée le 20 décembre 1848.",
  },

  // ── La Réunion, du CM au lycée ──────────────────────────────────────────
  {
    id: "reunion-record-pluie",
    coach: ["nombres-decimaux", "proportionnalite"],
    reunion: true,
    niveaux: ["cm", "6e-5e", "4e-3e", "lycee", "adultes"],
    rubrique: "Planète",
    titre: "1 825 mm en un jour : le record du monde est réunionnais",
    chapo: "En janvier 1966, pendant le cyclone Denise, il est tombé à Foc-Foc plus de pluie en 24 heures que nulle part ailleurs sur Terre.",
    corps: [
      "Le pluviomètre de Foc-Foc, sur les pentes du volcan, a mesuré 1 825 millimètres de pluie en 24 heures, les 7 et 8 janvier 1966.",
      "1 825 mm, c'est 1,825 mètre d'eau : plus haut qu'un adulte, si toute cette eau était restée sur place.",
      "À Paris, il tombe environ 640 mm de pluie… en une année entière. Foc-Foc a reçu presque trois années de pluie parisienne en une journée.",
      "Ce record tient toujours. Les montagnes de l'île forcent l'air humide des cyclones à monter, et toute son eau tombe d'un coup.",
    ],
    maths: {
      titre: "Convertir et comparer",
      lignes: ["1 825 mm = 182,5 cm = 1,825 m", "1 825 ÷ 24 ≈ 76 mm par heure", "1 825 ÷ 640 ≈ 2,9 années de pluie à Paris"],
    },
    defi: {
      question: "1 825 mm de pluie, cela fait combien en mètres ?",
      choix: ["18,25 m", "1,825 m", "182,5 m"],
      bonne: 1,
      explication: "1 m = 1 000 mm, donc 1 825 mm = 1 825 ÷ 1 000 = 1,825 m.",
    },
    agir: "Fabrique un pluviomètre : une bouteille coupée, une règle collée dessus. Mesure la pluie chaque jour pendant une semaine et fais le total.",
    niveau: "dès le CM2",
    source: "Organisation météorologique mondiale : record de pluie en 24 h, Foc-Foc (La Réunion), 7-8 janvier 1966.",
  },
  {
    id: "reunion-diagonale",
    coach: ["proportionnalite"],
    reunion: true,
    niveaux: ["cm", "6e-5e", "4e-3e", "lycee", "adultes"],
    rubrique: "Sport",
    titre: "La Diagonale des Fous : plus haut que l'Everest, à pied",
    chapo: "Chaque année en octobre, des milliers de coureurs traversent l'île du sud au nord : environ 165 km et 10 000 m de montée.",
    corps: [
      "Le Grand Raid existe depuis 1989. Les coureurs passent par les cirques, les remparts et les forêts des Hauts.",
      "En tout, ils grimpent environ 10 000 mètres. L'Everest, le plus haut sommet du monde, mesure 8 849 mètres.",
      "Les plus rapides arrivent en moins de 24 heures. D'autres mettent trois jours, et dorment quelques minutes au bord du chemin.",
    ],
    maths: {
      titre: "Vitesse moyenne",
      lignes: ["165 km en 24 h", "165 ÷ 24 ≈ 6,9 km/h", "10 000 − 8 849 = 1 151 m de plus que l'Everest"],
    },
    defi: {
      question: "Un coureur fait 165 km en 33 heures. Quelle est sa vitesse moyenne ?",
      choix: ["5 km/h", "33 km/h", "6 km/h"],
      bonne: 0,
      explication: "165 ÷ 33 = 5 : il fait en moyenne 5 km chaque heure, 5 km/h.",
    },
    agir: "Monte un escalier et compte les marches. Une marche fait environ 17 cm : combien de marches pour grimper 10 000 m ?",
    niveau: "dès le CM2",
    source: "Grand Raid de La Réunion (depuis 1989) ; Everest : 8 848,86 m (mesure Chine-Népal, 2020).",
  },
  {
    id: "reunion-altitude",
    coach: ["fonctions", "proportionnalite"],
    reunion: true,
    niveaux: ["6e-5e", "4e-3e", "lycee", "adultes"],
    rubrique: "Planète",
    titre: "Du lagon au Maïdo : il fait plus froid à chaque mètre",
    chapo: "28 °C à Saint-Gilles, et parfois du gel au Maïdo, à 2 200 m. En montant, la température baisse presque régulièrement.",
    corps: [
      "Quand on monte, l'air se détend et se refroidit. En moyenne, la température baisse d'environ 0,6 °C tous les 100 mètres.",
      "Du bord de mer au Maïdo, on monte de 2 200 mètres : la température baisse donc d'environ 13 °C.",
      "C'est pour cela qu'on trouve dans les Hauts des cultures qui ne poussent pas au bord de la mer, et qu'on y allume parfois un feu de cheminée.",
    ],
    maths: {
      titre: "Une fonction affine",
      lignes: ["Baisse : 0,6 °C tous les 100 m", "Au Maïdo : 28 − 22 × 0,6 ≈ 28 − 13 = 15 °C", "T(h) ≈ 28 − 0,006 × h, h en mètres"],
    },
    defi: {
      question: "Il fait 28 °C au bord de la mer. Environ combien fait-il à 1 000 m d'altitude ?",
      choix: ["22 °C", "27,4 °C", "6 °C"],
      bonne: 0,
      explication: "1 000 m = 10 fois 100 m : la température baisse de 10 × 0,6 = 6 °C. 28 − 6 = 22 °C.",
    },
    agir: "Lors d'une sortie dans les Hauts, emporte un thermomètre : note la température et l'altitude à chaque arrêt, puis trace le graphique.",
    niveau: "dès la 5e (fonction affine en 3e)",
    source: "Gradient thermique moyen de l'atmosphère : environ 0,6 à 0,65 °C par 100 m (Météo-France).",
  },
  {
    id: "reunion-lave-nouvelles-terres",
    coach: ["grandeurs@5e", "proportionnalite"],
    reunion: true,
    niveaux: ["6e-5e", "4e-3e", "lycee", "adultes"],
    rubrique: "Planète",
    titre: "En 2007, le volcan a agrandi l'île de 45 hectares",
    chapo: "En avril 2007, la lave du Piton de la Fournaise a coulé jusqu'à l'océan. En refroidissant, elle a créé une terre toute neuve.",
    corps: [
      "Pendant l'éruption d'avril 2007, l'une des plus fortes jamais observées sur ce volcan, des coulées de lave ont atteint la mer sur la côte sud-est.",
      "Au contact de l'eau, la lave se fige en roche. Environ 45 hectares de terre nouvelle sont nés : l'île a grandi.",
      "Le sommet du volcan, lui, s'est effondré : son cratère, le Dolomieu, s'est creusé d'environ 300 mètres en quelques jours.",
    ],
    maths: {
      titre: "Aires et conversions",
      lignes: ["1 ha = 10 000 m² · 45 ha = 450 000 m² = 0,45 km²", "Un terrain de foot ≈ 7 000 m² → 450 000 ÷ 7 000 ≈ 64 terrains", "Île : 2 512 km² → 0,45 ÷ 2 512 ≈ 0,02 %"],
    },
    defi: {
      question: "45 hectares, cela fait combien de mètres carrés ?",
      choix: ["4 500 m²", "450 000 m²", "45 000 m²"],
      bonne: 1,
      explication: "1 hectare = 10 000 m², donc 45 ha = 45 × 10 000 = 450 000 m².",
    },
    agir: "Mesure la cour de ton école en pas, puis en mètres : combien de cours faudrait-il pour couvrir les 45 hectares nés en 2007 ?",
    niveau: "dès la 6e",
    source: "Observatoire volcanologique du Piton de la Fournaise : éruption d'avril 2007, effondrement du Dolomieu ; superficie de l'île 2 512 km² (INSEE).",
  },
  {
    id: "reunion-parc-national",
    coach: ["pourcentages"],
    reunion: true,
    niveaux: ["cm", "6e-5e", "4e-3e", "lycee", "adultes"],
    rubrique: "Planète",
    titre: "Presque la moitié de l'île est un parc national",
    chapo: "Depuis 2007, le cœur de La Réunion est protégé : forêts, pitons, cirques et remparts. En 2010, l'UNESCO l'a inscrit au patrimoine mondial.",
    corps: [
      "Le cœur du Parc national couvre environ 1 050 km², soit à peu près 42 % de l'île.",
      "On y trouve des plantes et des animaux qui n'existent nulle part ailleurs sur Terre : on les dit endémiques, comme le tamarin des Hauts.",
      "Protéger ces forêts, c'est aussi protéger l'eau : les Hauts reçoivent la pluie qui remplit les rivières et les nappes de toute l'île.",
    ],
    maths: {
      titre: "Un pourcentage d'une surface",
      lignes: ["Île : 2 512 km²", "42 % de 2 512 = 0,42 × 2 512 ≈ 1 055 km²", "42 %, c'est un peu moins de la moitié (50 %)."],
    },
    defi: {
      question: "Un parc couvre 40 % d'une île de 2 500 km². Quelle surface ?",
      choix: ["1 000 km²", "40 km²", "2 460 km²"],
      bonne: 0,
      explication: "40 % = 40/100 = 0,4, et 0,4 × 2 500 = 1 000 km².",
    },
    agir: "Sur les sentiers, reste sur le chemin et ne cueille rien : une graine de plante envahissante sous ta chaussure peut gagner une forêt entière.",
    niveau: "dès le CM2",
    source: "Parc national de La Réunion (créé en 2007) ; UNESCO, « Pitons, cirques et remparts de l'île de La Réunion » (2010).",
  },
];

/** Le pas des « autres nouvelles » : premier avec n, pour que la Une et les
 *  trois autres soient quatre articles différents. */
function pasPremierAvec(n: number): number {
  const pgcd = (a: number, b: number): number => (b === 0 ? a : pgcd(b, a % b));
  return [4, 3, 5, 7, 2, 1].find((p) => p < n && pgcd(p, n) === 1) ?? 1;
}

/** Une Une et trois autres nouvelles par jour, DANS L'ÉDITION CHOISIE
 *  (12/11/2026) ; sans niveau, dans tout le catalogue (scripts, story). */
export function articlesDuJour(
  jour: number,
  niveau?: NiveauJournal,
  reunion = false,
): { une: Article; autres: Article[] } {
  // Un article daté (uneLe) passe à la Une ce jour-là ; sinon, la rotation.
  // L'édition « Île de La Réunion » : ses articles ; « Le monde » : les autres.
  const edition = ARTICLES.filter((a) => Boolean(a.reunion) === reunion);
  const liste = niveau ? edition.filter((a) => a.niveaux.includes(niveau)) : edition;
  const n = liste.length;
  const date = new Date(jour * 86400000).toISOString().slice(0, 10);
  const datee = liste.findIndex((a) => a.uneLe === date);
  const i = datee >= 0 ? datee : ((jour % n) + n) % n;
  const pas = pasPremierAvec(n);
  return {
    une: liste[i],
    autres: [1, 2, 3].filter((k) => k < n).map((k) => liste[(i + pas * k) % n]),
  };
}

/* ═══ LES CHIFFRES CLÉS DES PETITS (12/11/2026) ════════════════════════════
   La banque de lib/accueil/journal.ts (« 41 024 320 chiffres », « 2¹³⁶ ²⁷⁹ ⁸⁴¹ »)
   parle aux collégiens et aux adultes. Pour CP-CE2 et CM1-CM2 : des chiffres
   du quotidien, une phrase courte. ⛔ Chaque chiffre vérifiable. */
export const CHIFFRES_PETITS: Record<"cp-ce2" | "cm", ChiffreDuJour[]> = {
  "cp-ce2": [
    { chiffre: "7 jours", texte: "Une semaine. Après dimanche, c'est de nouveau lundi." },
    { chiffre: "20 dents", texte: "Les dents de lait d'un enfant. Un adulte en a 32." },
    { chiffre: "24 heures", texte: "Le temps d'un tour de la Terre sur elle-même : un jour et une nuit." },
    { chiffre: "6 pattes", texte: "Tous les insectes ont 6 pattes. Une araignée en a 8 : ce n'est pas un insecte !" },
    { chiffre: "12 mois", texte: "Une année. Le plus court est février : 28 jours, ou 29 certaines années." },
    { chiffre: "60 minutes", texte: "Une heure. Et une minute, c'est 60 secondes." },
    { chiffre: "10 doigts", texte: "Tes deux mains. C'est sans doute pour cela que l'on compte par paquets de 10." },
    { chiffre: "6 côtés", texte: "Les cases des abeilles. Collées, elles ne laissent aucun trou." },
  ],
  cm: [
    { chiffre: "1 440", texte: "Le nombre de minutes dans une journée : 24 × 60." },
    { chiffre: "366 jours", texte: "Une année bissextile, avec un 29 février. La prochaine : 2028." },
    { chiffre: "100 000", texte: "À peu près le nombre de battements de ton cœur en une journée." },
    { chiffre: "8 849 m", texte: "L'altitude de l'Everest, le plus haut sommet du monde (mesurée en 2020)." },
    { chiffre: "1 kg", texte: "Le poids d'un litre d'eau. Une bouteille de 1,5 litre pèse donc environ 1,5 kg." },
    { chiffre: "300 000 km", texte: "Ce que parcourt la lumière en une seule seconde : plus de 7 fois le tour de la Terre." },
    { chiffre: "5 050", texte: "1 + 2 + 3 + … + 100. Le petit Gauss l'a trouvé très vite : 50 paires qui font chacune 101." },
    { chiffre: "32 pièces", texte: "Un ballon de foot classique : 12 pièces noires et 20 pièces blanches." },
  ],
};

/** Trois chiffres clés par jour pour un petit niveau, jamais deux fois le même. */
export function chiffresDesPetits(jour: number, niveau: "cp-ce2" | "cm"): ChiffreDuJour[] {
  const l = CHIFFRES_PETITS[niveau];
  const j = ((jour % l.length) + l.length) % l.length;
  return [0, 3, 5].map((k) => l[(j + k) % l.length]);
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
  niveaux: NiveauJournal[];
  /** Un défi de l'édition « Île de La Réunion » (12/11/2026). */
  reunion?: boolean;
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
    niveaux: ["6e-5e", "4e-3e", "lycee", "adultes"],
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
    niveaux: ["cm", "6e-5e"],
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
    niveaux: ["cm", "6e-5e", "4e-3e"],
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
    niveaux: ["6e-5e", "4e-3e", "lycee", "adultes"],
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
    niveaux: ["cp-ce2", "cm"],
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
    niveaux: ["cm", "6e-5e", "4e-3e", "lycee", "adultes"],
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
    niveaux: ["6e-5e", "4e-3e", "lycee", "adultes"],
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
  // 12/11/2026 : les missions de CP-CE2 (compter, reconnaître des formes).
  {
    id: "chasse-aux-formes",
    niveaux: ["cp-ce2"],
    genre: "dehors",
    titre: "La chasse aux formes",
    materiel: "Tes yeux, et un crayon.",
    etapes: [
      "Dans la cour ou dans la rue, cherche des ronds, des carrés et des triangles.",
      "Dessine chaque forme trouvée.",
    ],
    calcul: "Compte tes ronds, tes carrés et tes triangles. Quelle forme as-tu trouvée le plus souvent ?",
    niveau: "dès le CP",
  },
  {
    id: "paquets-de-dix",
    niveaux: ["cp-ce2"],
    genre: "dehors",
    titre: "Fais des paquets de 10",
    materiel: "Des feuilles mortes, des cailloux ou des bâtons.",
    etapes: [
      "Ramasse beaucoup de cailloux (ou de feuilles).",
      "Range-les en paquets de 10.",
    ],
    calcul: "3 paquets de 10 et 4 tout seuls, cela fait 34. Combien en as-tu ramassé ?",
    niveau: "dès le CP",
  },
];

/* Les DÉFIS SPORTIFS de l'édition « Île de La Réunion » (12/11/2026) — Frédéric :
   « montrer des défis sur Manapany, sur faire du sport ». ⛔ Jamais seul dans
   l'eau, seulement en zone de baignade surveillée ou autorisée. */
const DEHORS_REUNION: Mission[] = [
  {
    id: "reunion-defi-manapany",
    reunion: true,
    niveaux: ["cm", "6e-5e", "4e-3e", "lycee", "adultes"],
    genre: "dehors",
    titre: "Le défi du bassin de Manapany : à quelle vitesse nages-tu ?",
    materiel: "Un adulte qui chronomètre, un bassin de baignade autorisé (Manapany, ou la piscine de ta commune).",
    etapes: [
      "Demande la longueur du bassin (ou mesure-la en pas le long du bord).",
      "Nage une longueur pendant que l'adulte chronomètre. Repose-toi, puis recommence.",
    ],
    calcul: "Vitesse = longueur ÷ temps. 25 m en 40 s : 25 ÷ 40 ≈ 0,6 m par seconde, soit environ 2,2 km/h. Un champion nage quatre fois plus vite !",
    niveau: "dès le CM2",
  },
  {
    id: "reunion-defi-tirs-au-but",
    reunion: true,
    niveaux: ["cp-ce2", "cm", "6e-5e", "4e-3e", "lycee", "adultes"],
    genre: "dehors",
    titre: "Le défi foot : 10 tirs au but",
    materiel: "Un ballon, un but (ou deux sacs), un ami pour compter.",
    etapes: [
      "Tire 10 fois au but, du même endroit.",
      "Ton ami compte les buts marqués. Puis échangez les rôles.",
    ],
    calcul: "7 buts sur 10, c'est 7 dixièmes : 70 % de réussite. Recule de 3 pas et recommence : ton score change-t-il ?",
    niveau: "dès le CP (pourcentage dès la 6e)",
  },
  {
    id: "reunion-defi-montee",
    reunion: true,
    niveaux: ["6e-5e", "4e-3e", "lycee", "adultes"],
    genre: "dehors",
    titre: "Le défi des Hauts : chronomètre ta montée",
    materiel: "Un chronomètre, un sentier ou un escalier que tu connais, un adulte avec toi.",
    etapes: [
      "Compte les marches (ou cherche le dénivelé du sentier sur son panneau).",
      "Chronomètre ta montée en marchant, sans courir.",
    ],
    calcul: "Une marche ≈ 17 cm. 200 marches : 200 × 0,17 = 34 m de montée. En 4 minutes, cela fait 34 ÷ 4 ≈ 8,5 m par minute. Les coureurs du Grand Raid montent deux fois plus vite, pendant des heures.",
    niveau: "dès la 6e",
  },
];

const BONNES_ACTIONS: Mission[] = [
  {
    id: "ramasser-dechets",
    niveaux: ["cm", "6e-5e", "4e-3e", "lycee", "adultes"],
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
    niveaux: ["cm", "6e-5e", "4e-3e", "lycee", "adultes"],
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
    niveaux: ["6e-5e", "4e-3e", "lycee", "adultes"],
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
    niveaux: ["cm", "6e-5e", "4e-3e", "lycee", "adultes"],
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
    niveaux: ["6e-5e", "4e-3e", "lycee", "adultes"],
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
  {
    id: "mettre-la-table",
    niveaux: ["cp-ce2"],
    genre: "bonne-action",
    titre: "Mets la table pour toute la famille",
    materiel: "Les assiettes, les verres et les couverts de la maison.",
    etapes: [
      "Compte combien vous êtes à table.",
      "Pose une assiette, un verre et une fourchette pour chaque personne.",
    ],
    calcul: "Vous êtes 4 ? Il faut 4 assiettes et 4 verres : 4 + 4 = 8 objets, sans compter les fourchettes. Et chez toi ?",
    niveau: "dès le CP",
  },
  {
    id: "partager-le-gouter",
    niveaux: ["cp-ce2"],
    genre: "bonne-action",
    titre: "Partage ton goûter en parts égales",
    materiel: "Un paquet de biscuits, et des amis.",
    etapes: [
      "Compte les biscuits et compte les amis (toi compris).",
      "Donne un biscuit à chacun, chacun son tour, jusqu'à ce qu'il n'en reste plus.",
    ],
    calcul: "12 biscuits pour 3 amis : chacun en a 4. C'est la division : 12 ÷ 3 = 4. Reste-t-il des biscuits ?",
    niveau: "dès le CP",
  },
];

/** Toutes les missions (la rangée « Agir » du journal en galerie, 12/11/2026). */
export const MISSIONS: Mission[] = [...DEHORS, ...DEHORS_REUNION, ...BONNES_ACTIONS];

/** Un jour dehors, un jour une bonne action, DANS L'ÉDITION choisie
 *  (12/11/2026) ; sans niveau, toutes les missions (scripts, story). */
export function missionDuJour(jour: number, niveau?: NiveauJournal, reunion = false): Mission {
  const j = ((jour % 1000000) + 1000000) % 1000000;
  const du = (l: Mission[]) => (niveau ? l.filter((m) => m.niveaux.includes(niveau)) : l);
  // L'édition Réunion : ses défis sportifs les jours « dehors ».
  const liste = j % 2 === 0 ? du(reunion ? DEHORS_REUNION : DEHORS) : du(BONNES_ACTIONS);
  const k = Math.floor(j / 2);
  return liste[k % liste.length];
}
