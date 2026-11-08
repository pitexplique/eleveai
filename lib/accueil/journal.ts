// LE CONTENU DU JOURNAL DE L'ACCUEIL (maquette du 18/10/2026, /accueil-journal).
//
// Frédéric : « je veux refonder la page d'accueil comme un journal, avec vidéos,
// coach etc », « comme un journal pour la jeunesse », « et les adultes », « avec
// une mise en page à choisir », puis la phrase qui commande tout :
//   « je veux qu'un jeune, un prof se dise : je vais sur ce site, je vais
//     apprendre une chose utile, ou m'entraîner » — et « avoir une perspective
//     d'avenir ».
//
// D'où trois promesses, dans cet ordre, et chaque rubrique en sert une :
//   APPRENDRE    la Une (une vidéo + « ce que tu vas apprendre »), le chiffre
//   S'ENTRAÎNER  le défi du jour (sur la page), le coach par classe, les rituels
//   ET DEMAIN ?  le métier du jour, et les maths qui y servent
//
// ⛔ LES VIDÉOS SONT DÉSIGNÉES PAR LEUR ID DU MANIFESTE (lib/videos/videos-r2.json),
// toutes vérifiées publiées le 18/10. Une vidéo absente de la table ne s'affiche
// pas : la page lit `trouverVideo`, elle n'invente rien.
// ⛔ La rotation se fait au JOUR, calculée côté serveur (la page est régénérée
// toutes les heures) : pas de `new Date()` dans le rendu client.
//
// ⭐⭐ LA VIDÉO, LE DÉFI ET LE CHIFFRE DU JOUR SONT LIÉS (Frédéric, 19/10 :
// « les deux doivent toujours être liées », « la vidéo, le défi et le chiffre
// du jour liés »). Une Une de l'édition peut porter son `defi` et son `chiffre`
// écrits ; sinon ils suivent le thème de la vidéo.
//
// ⭐⭐ LE RITUEL DE LA SEMAINE (Frédéric, 19/10 : « on la mettra à jour tous les
// lundis matins ou dimanche soir »). Chaque semaine, on ajoute EN TÊTE de
// `EDITION` les 7 Unes datées de la semaine qui vient, avec leur phrase « Ce que
// tu vas apprendre » ; on peut aussi ajouter des chiffres et des métiers.
// Un jour sans Une datée n'est PAS vide : app/accueil-journal/donnees.ts tire
// alors une paysage de tout le catalogue. Le journal change donc chaque jour même
// si une semaine est oubliée.

import type { DefiEcrit, Theme } from "./defis";

export type UneJournal = {
  /** « AAAA-MM-JJ » : le jour où cette Une passe en tête. Sans date, l'entrée
   *  ne sert qu'à donner sa phrase « utile » quand le tirage tombe dessus. */
  date?: string;
  /** La paysage : id du manifeste. */
  paysage: string;
  /** Son short jumeau, s'il existe. */
  short?: string;
  classe: string;
  /** « Ce que tu vas apprendre » : UNE phrase, vraie, sans formule. */
  utile: string;
  /** Le défi du jour ÉCRIT pour cette Une. Sans lui, le défi est généré sur
   *  le thème de la vidéo (themeDe, lib/accueil/defis.ts). */
  defi?: DefiEcrit;
  /** Le chiffre du jour lié à cette Une. Sans lui, on prend un chiffre de la
   *  banque sur le même thème, sinon celui de la rotation. */
  chiffre?: ChiffreDuJour;
};

export type ChiffreDuJour = {
  chiffre: string;
  texte: string;
  theme?: Theme;
  /** Un dessin maison au-dessus du chiffre (components/accueil/dessins/). */
  dessin?: "arrivee-diagonale";
};

/** L'ÉDITION DE LA SEMAINE : les Unes datées, la plus récente semaine en tête. */
export const EDITION: UneJournal[] = [
  // ── Semaine du lundi 9 au dimanche 15 novembre 2026 ──
  // Écrite le 08/11 (Frédéric : « mets à jour le journal même s'il n'apparaît
  // pas ») : le Journal n'est plus monté sur /accueil (AccueilSuivi), il vit sur
  // /accueil-journal. Les semaines du 26/10 au 08/11 sont restées au tirage.
  // ⛔ donnees.ts ne prend que les vidéos qui ont un ID YouTube (`youtube` dans
  // videos-r2.json) : les séries Angles 6e, Puissances, Convexité, Dénombrement,
  // encore sans ID ce jour-là, ne pouvaient pas faire la Une. Paysages et shorts
  // ci-dessous : tous publiés, tous avec miniature.
  {
    date: "2026-11-09",
    paysage: "6e-prop-reconnaitre",
    short: "6e-prop-reconnaitre-short",
    classe: "6e",
    utile: "Deux grandeurs sont proportionnelles quand on passe de l'une à l'autre en multipliant toujours par le même nombre : 2 fois plus d'articles, 2 fois plus cher.",
    defi: {
      classe: "6e",
      coach: "6e",
      question: "3 croissants coûtent 3,60 €. Au même prix l'unité, combien coûtent 6 croissants ?",
      juste: "7,20 €",
      faux: ["6,60 €", "3,60 €"],
      explication:
        "6 croissants, c'est 2 fois plus que 3 croissants : on paie 2 fois plus, 3,60 × 2 = 7,20 €. Ajouter 3 € (6,60 €) ne marche pas : on multiplie, on n'ajoute pas.",
    },
    chiffre: {
      chiffre: "× 2",
      texte: "Un vélo qui roule 2 fois plus longtemps à la même vitesse parcourt 2 fois plus de distance. Mais un enfant 2 fois plus âgé n'est pas 2 fois plus grand : tout n'est pas proportionnel.",
    },
  },
  {
    date: "2026-11-10",
    paysage: "4e-expression-traduire",
    short: "4e-expression-traduire-short",
    classe: "4e",
    utile: "On écrit dans l'ordre de la phrase : « le double de x, augmenté de 3 » donne 2x + 3, mais « le double de la somme de x et de 3 » donne 2(x + 3).",
    defi: {
      classe: "4e",
      coach: "4e",
      question: "Quelle expression traduit « le double d'un nombre x, diminué de 7 » ?",
      juste: "2x − 7",
      faux: ["2(x − 7)", "7 − 2x"],
      explication:
        "On prend d'abord le double du nombre, 2x, puis on lui enlève 7 : 2x − 7. 2(x − 7), ce serait le double de « x diminué de 7 ». Pour x = 10 : 2x − 7 = 13, mais 2(x − 7) = 6.",
    },
    chiffre: {
      chiffre: "820",
      texte: "Vers l'an 820, à Bagdad, le savant al-Khwârizmî écrit un livre pour résoudre les équations. Son titre contient le mot « al-jabr » : c'est de là que vient le mot « algèbre ».",
    },
  },
  {
    date: "2026-11-11",
    paysage: "terminale-proba-arbre",
    short: "terminale-proba-arbre-short",
    classe: "Terminale",
    utile: "Sur un arbre pondéré, on multiplie les probabilités le long d'un chemin, puis on additionne les chemins qui mènent au même résultat.",
    defi: {
      classe: "Terminale",
      coach: "terminale-spe",
      question: "Sur un arbre, P(A) = 0,3 et la probabilité de B sachant A vaut 0,2. Combien vaut P(A ∩ B) ?",
      juste: "0,06",
      faux: ["0,5", "0,1"],
      explication:
        "On suit le chemin A puis B : on multiplie les probabilités des branches, 0,3 × 0,2 = 0,06. Additionner (0,3 + 0,2 = 0,5) est l'erreur classique.",
    },
    chiffre: {
      chiffre: "1/4",
      theme: "probabilites",
      texte: "On lance deux pièces : la probabilité d'obtenir deux fois pile est 1/2 × 1/2 = 1/4. On multiplie le long des branches de l'arbre : ce n'est ni 1/2, ni 1/3.",
    },
  },
  {
    date: "2026-11-12",
    paysage: "bases-nombres-premiers",
    short: "bases-nombres-premiers-short",
    classe: "Les bases",
    utile: "Un nombre premier n'a que deux diviseurs, 1 et lui-même : 12 billes se rangent en rectangle, 13 billes seulement en une ligne.",
    defi: {
      classe: "4e",
      coach: "4e",
      question: "Lequel de ces nombres est premier ?",
      juste: "29",
      faux: ["21", "27"],
      explication:
        "21 = 3 × 7 et 27 = 3 × 9 : ils ont d'autres diviseurs que 1 et eux-mêmes. 29 n'est divisible ni par 2, ni par 3, ni par 5, et 6 × 6 = 36 dépasse déjà 29 : il est premier.",
    },
    chiffre: {
      chiffre: "41 024 320",
      texte: "Le nombre de chiffres du plus grand nombre premier connu, 2¹³⁶ ²⁷⁹ ⁸⁴¹ − 1, trouvé en octobre 2024 par un passionné et des milliers d'ordinateurs. Imprimé, il remplirait des dizaines de livres.",
    },
  },
  {
    date: "2026-11-13",
    paysage: "seconde-isoler-une-lettre",
    classe: "Seconde",
    utile: "De v = d ÷ t, on tire aussi d = v × t et t = d ÷ v : une seule formule en donne trois.",
    defi: {
      classe: "Seconde",
      coach: "seconde",
      question: "On sait que v = d ÷ t. Comment s'écrit le temps t ?",
      juste: "t = d ÷ v",
      faux: ["t = v × d", "t = v ÷ d"],
      explication:
        "On multiplie les deux côtés par t : v × t = d. Puis on divise par v : t = d ÷ v. Vérification : 100 km à 50 km/h, cela fait 100 ÷ 50 = 2 h.",
    },
    chiffre: {
      chiffre: "300 000 km/s",
      texte: "La vitesse de la lumière, à peu près. Avec t = d ÷ v, on trouve le temps qu'elle met pour venir du Soleil, à 150 millions de km : 500 secondes, un peu plus de 8 minutes.",
    },
  },
  {
    // Samedi : une vidéo de la playlist CRPE (pour les futurs professeurs des écoles).
    date: "2026-11-14",
    paysage: "4e-proba-frequence-repeter",
    short: "4e-proba-frequence-repeter-short",
    classe: "4e · CRPE",
    utile: "Un dé n'a pas de mémoire : après trois 6 de suite, la probabilité d'obtenir 6 au lancer suivant reste 1 chance sur 6.",
    defi: {
      classe: "4e",
      coach: "4e",
      question: "Une pièce bien équilibrée est tombée 5 fois de suite sur pile. Quelle est la probabilité d'obtenir pile au 6e lancer ?",
      juste: "1 chance sur 2",
      faux: ["Moins de 1 chance sur 2", "1 chance sur 64"],
      explication:
        "La pièce ne se souvient pas des lancers d'avant : chaque lancer est une nouvelle expérience, avec 1 chance sur 2 pour pile. 1 chance sur 64, c'est la probabilité d'avoir 6 piles de suite AVANT de commencer.",
    },
    chiffre: {
      chiffre: "26 fois",
      theme: "probabilites",
      texte: "Le 18 août 1913, au casino de Monte-Carlo, la bille tombe 26 fois de suite sur le noir. Des joueurs perdent des fortunes sur le rouge, persuadés qu'il « doit » sortir : la roulette n'a pas de mémoire.",
    },
  },
  {
    date: "2026-11-15",
    paysage: "youtube-OT7gGCthbAs",
    classe: "Première",
    utile: "Le discriminant Δ = b² − 4ac dit combien de solutions a l'équation ax² + bx + c = 0 : deux s'il est positif, une s'il est nul, aucune s'il est négatif.",
    defi: {
      classe: "Première",
      coach: "premiere-spe",
      question: "Pour l'équation x² + 2x + 5 = 0, on trouve Δ = 2² − 4 × 1 × 5 = −16. Combien a-t-elle de solutions réelles ?",
      juste: "Aucune",
      faux: ["Deux", "Une seule"],
      explication:
        "Δ = −16 est négatif : l'équation n'a aucune solution réelle. La parabole y = x² + 2x + 5 reste tout entière au-dessus de l'axe des abscisses.",
    },
    chiffre: {
      chiffre: "4,9 × t²",
      texte: "La distance, en mètres, parcourue en t secondes par un objet en chute libre (sans l'air qui freine) : une fonction du second degré. Lâché d'une falaise de 44 m, il touche le sol en 3 s environ.",
    },
  },
  // ── Semaine du lundi 19 au dimanche 25 octobre 2026 ──
  // ⭐ Lundi et mardi : la Diagonale des Fous, qui vient de finir (15-18/10).
  // Frédéric, 19/10 : « on pourrait pas faire la une sur la Diagonale des fous
  // pendant 2 jours ».
  {
    date: "2026-10-19",
    paysage: "6e-aire-longueur-convertir-diagonale",
    // Le short Hugo Deck, publié le soir même (Frédéric : « mets-le ce soir »).
    short: "6e-duree-temps-short-hugo-deck-diagonale",
    classe: "Diagonale des Fous · 6e",
    utile: "Pour passer des mètres aux centimètres, on multiplie par 100 : 1 000 m de montée, c'est 100 000 cm.",
    defi: {
      classe: "6e",
      coach: "6e",
      question:
        "Hugo Deck a remporté la Diagonale des Fous 2026 : il a grimpé 10 200 m de montée. Ça fait combien de kilomètres ?",
      juste: "10,2 km",
      faux: ["102 km", "1,02 km"],
      explication: "1 km = 1 000 m. Donc 10 200 m = 10 200 ÷ 1 000 = 10,2 km : chaque chiffre prend une valeur mille fois plus petite.",
    },
    chiffre: {
      chiffre: "10 200 m",
      dessin: "arrivee-diagonale",
      texte: "La montée totale de la Diagonale des Fous 2026 : plus que la hauteur de l'Everest (8 849 m) au-dessus de la mer. Hugo Deck, le vainqueur, l'a avalée en 22 h 54 min 24 s.",
    },
  },
  {
    // ⛔ La Une est TOUJOURS une PAYSAGE (Frédéric, 20/10 : « sur la page
    // d'accueil, avec ton format, il faut un format paysage »). Le dessin animé
    // Ti Margo (« j'adore », 15/10) passe donc à côté, en short.
    date: "2026-10-20",
    paysage: "5e-relatif-nombre",
    short: "5e-relatif-nombre-short-ti-margo-diagonale",
    classe: "Diagonale des Fous · 5e",
    utile: "On compte les montées en + et les descentes en − : après 10 200 m de montée, l'arrivée n'est que 47 m plus haut que le départ.",
    chiffre: {
      chiffre: "+ 47 m",
      texte: "Ce qui reste de la Diagonale des Fous une fois les montées (+) et les descentes (−) additionnées : l'arrivée n'est que 47 m plus haut que le départ.",
    },
  },
  {
    date: "2026-10-21",
    paysage: "bases-pourcentages-calcul-mental",
    short: "bases-pourcentages-calcul-mental-short",
    classe: "Les bases",
    utile: "Pour calculer 30 % de tête, on calcule d'abord 10 % (on divise par 10), puis on multiplie par 3.",
    chiffre: {
      chiffre: "10 %",
      texte: "La clé de tous les pourcentages de tête : 10 % d'un nombre, c'est ce nombre divisé par 10. 10 % de 250, c'est 25.",
    },
  },
  {
    date: "2026-10-22",
    paysage: "6e-decimal-nombre",
    short: "6e-decimal-nombre-short-zero",
    classe: "6e",
    utile: "0,7 est plus grand que 0,65 : on compare d'abord les dixièmes, pas le nombre de chiffres.",
    chiffre: {
      chiffre: "0,999… = 1",
      texte: "Un zéro virgule suivi d'une infinité de 9 vaut exactement 1. Un tiers fait 0,333…, trois tiers font 0,999… et aussi 1.",
    },
  },
  {
    date: "2026-10-23",
    paysage: "4e-pythagore-hypotenuse",
    short: "4e-pythagore-hypotenuse-short",
    classe: "4e",
    utile: "Dans un triangle rectangle, le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés.",
    chiffre: {
      chiffre: "3, 4, 5",
      texte: "Le plus célèbre triangle rectangle : 3² + 4² = 9 + 16 = 25 = 5². Les maçons s'en servent encore pour tracer un angle droit.",
    },
  },
  {
    // Samedi : une vidéo de la playlist CRPE (pour les futurs professeurs des écoles).
    date: "2026-10-24",
    paysage: "3e-proba-vocabulaire",
    short: "3e-proba-vocabulaire-short",
    classe: "3e · CRPE",
    utile: "Peu probable ne veut pas dire impossible : seul un événement impossible a une probabilité de 0.",
    chiffre: {
      chiffre: "23",
      texte: "Dans un groupe de 23 personnes, il y a plus d'une chance sur deux que deux d'entre elles aient le même anniversaire. Peu probable ? Non : probable.",
    },
  },
  {
    date: "2026-10-25",
    paysage: "terminale-continuite-tvi",
    classe: "Terminale",
    utile: "Une courbe sans saut qui passe sous une valeur puis au-dessus la franchit forcément.",
    defi: {
      classe: "Terminale",
      coach: "terminale-spe",
      question:
        "f est continue sur [0 ; 2], avec f(0) = −3 et f(2) = 5. L'équation f(x) = 0 a-t-elle une solution entre 0 et 2 ?",
      juste: "Oui, au moins une",
      faux: ["Non, aucune", "On ne peut pas savoir"],
      explication:
        "f est continue et 0 est compris entre f(0) = −3 et f(2) = 5 : d'après le théorème des valeurs intermédiaires, f prend la valeur 0 au moins une fois entre 0 et 2.",
    },
    chiffre: {
      chiffre: "1 500 m",
      texte: "Du lagon au sommet du Piton des Neiges (3 070 m), on passe forcément par 1 500 m d'altitude, quel que soit le sentier : c'est le théorème des valeurs intermédiaires.",
    },
  },
  // Sortis de la semaine pour faire place à la Diagonale (le tirage les reprendra) :
  // 974-eau, bases-fonctions — leurs phrases restent dans UNES ci-dessous.
];

/** Les phrases « utiles » des Unes sans date (le tirage automatique les reprend). */
export const UNES: UneJournal[] = [
  {
    paysage: "bases-fonctions",
    classe: "Les bases",
    utile: "Une fonction associe à chaque nombre une seule image : c'est ce qui permet de prévoir.",
  },
  {
    paysage: "974-eau",
    short: "974-eau-short-millimetre",
    classe: "5e",
    utile: "30 mm de pluie, c'est 30 litres d'eau tombés sur chaque mètre carré.",
  },
  {
    paysage: "3e-pythagore-solide",
    short: "3e-pythagore-solide-short",
    classe: "3e",
    utile: "Un triangle rectangle se cache dans un gobelet : Pythagore suffit pour trouver la longueur cherchée.",
  },
  {
    paysage: "974-rond-point",
    short: "974-rond-point-short-hasard",
    classe: "Terminale",
    utile: "Un bouchon peut naître sans accident ni feu rouge, du seul hasard des arrivées.",
  },
  {
    paysage: "seconde-analyse-graphique",
    short: "seconde-analyse-graphique-short-nuit",
    classe: "2de",
    utile: "Sur une courbe, l'image se lit sur l'axe vertical, l'antécédent sur l'axe horizontal.",
  },
  {
    paysage: "5e-relatif-nombre",
    short: "5e-relatif-nombre-short-ti-margo-diagonale",
    classe: "5e",
    utile: "Les nombres relatifs comptent ce qu'on monte (+) et ce qu'on descend (−).",
  },
  {
    paysage: "terminale-continuite-tvi",
    classe: "Terminale",
    utile: "Une courbe sans saut qui passe sous une valeur puis au-dessus la franchit forcément.",
  },
];

/** Les shorts de la rubrique « Une minute pour être surpris ». */
export const SHORTS = [
  "seconde-signes-expression-short-dauphin",
  "5e-relatif-nombre-short-ti-margo-diagonale",
  "6e-duree-temps-short-diagonale",
  "5e-relatif-nombre-short-comparer",
  "3e-pythagore-solide-short",
  "6e-aire-longueur-short-diagonale",
  "974-eau-short-millimetre",
  "5e-relatif-nombre-short-signe",
  "4e-grandeur-composee-short-diagonale",
  "seconde-analyse-graphique-short-nuit",
];

/** « Maths Réel » : les maths qui se passent dehors. */
export const MATHS_REEL = [
  "6e-aire-longueur-convertir-diagonale",
  "974-eau",
  "974-rond-point",
  "3e-pythagore-solide",
  // L'accroche du TVI est le Piton des Neiges (« j'adore la paysage sur le TVI »).
  "terminale-continuite-tvi",
];

/* ── LE DÉFI DU JOUR : voir lib/accueil/defis.ts (des générateurs, 19/10). ── */

/* ── LE CHIFFRE DU JOUR ─────────────────────────────────────────────────────
   Repris de lib/chiffre-du-jour.ts (supprimé le 14/08, `git show 03aec7ac`).
   Règle d'authenticité de Frédéric : QUE des chiffres vérifiés ; dans le doute,
   « environ ». ⛔ Retiré au passage : « 0 pub » (on ne parle pas d'argent). */
export const CHIFFRES: ChiffreDuJour[] = [
  { chiffre: "1 825 mm", theme: "longueurs", texte: "La pluie tombée en 24 heures à Foc-Foc, sur les pentes du volcan, en janvier 1966. Record du monde, toujours invaincu." },
  { chiffre: "3 070 m", texte: "Le Piton des Neiges, plus haut sommet de tout l'océan Indien. L'île entière est son œuvre." },
  { chiffre: "8 000 km", texte: "Le voyage des baleines à bosse depuis l'Antarctique jusqu'aux eaux chaudes de La Réunion, chaque hiver austral. Sans GPS." },
  { chiffre: "118 km/h", texte: "Le seuil de vent qui fait d'une tempête un cyclone tropical." },
  { chiffre: "300 000 km/s", texte: "La vitesse de la lumière. Le rayon de soleil qui te réchauffe a quitté le Soleil il y a un peu plus de 8 minutes." },
  { chiffre: "384 400 km", texte: "La distance moyenne entre la Terre et la Lune : environ 9,6 fois le tour de la Terre." },
  { chiffre: "11 jours et demi", theme: "durees", texte: "Ce que dure UN MILLION de secondes. Et un milliard de secondes ? Presque 32 ans. Voilà la différence entre million et milliard." },
  { chiffre: "142 857", theme: "multiplication", texte: "Multiplie-le par 2, 3, 4, 5 ou 6 : les mêmes chiffres reviennent, dans le même ordre, juste décalés. Multiplie-le par 7 : 999 999. Essaie." },
  { chiffre: "1 024", theme: "puissances", texte: "2 multiplié par lui-même 10 fois. C'est pour ça qu'un « kilo-octet » n'est pas exactement mille octets : l'informatique compte en puissances de 2." },
  { chiffre: "≈ 165 km", theme: "longueurs", texte: "La Diagonale des Fous : traverser La Réunion à pied avec près de 10 000 m de dénivelé. Les plus rapides le font en moins de 24 heures." },
  { chiffre: "2 200 m", texte: "L'altitude du Maïdo. En bas, on se baigne à 28 °C ; là-haut, certains matins d'hiver, il gèle." },
  { chiffre: "200 litres", texte: "Le lait que boit un baleineau chaque jour. Il grossit d'environ 45 kg par jour." },
  // 19/10 : la banque passe de 12 à 26 chiffres, pour ne pas revenir avant un mois.
  { chiffre: "86 400", theme: "durees", texte: "Le nombre de secondes dans une journée : 24 × 60 × 60. Celle-ci vient de commencer." },
  { chiffre: "5 050", texte: "La somme 1 + 2 + 3 + … + 100. Le petit Gauss l'aurait trouvée en quelques secondes : 50 paires qui font chacune 101." },
  { chiffre: "23", theme: "probabilites", texte: "Dans un groupe de 23 personnes, il y a plus d'une chance sur deux que deux d'entre elles aient le même anniversaire. Surprenant, mais vrai." },
  { chiffre: "25", texte: "Le nombre de nombres premiers entre 1 et 100 : 2, 3, 5, 7, 11… jusqu'à 97." },
  { chiffre: "3,14159…", texte: "Le nombre π : le tour d'un cercle divisé par son diamètre. Ses chiffres après la virgule ne s'arrêtent jamais." },
  { chiffre: "1 litre", texte: "Le volume d'un cube de 10 cm de côté. Un litre, c'est exactement un décimètre cube." },
  { chiffre: "≈ 30 km/s", texte: "La vitesse de la Terre autour du Soleil. Tu ne sens rien, et pourtant tu as parcouru plus de 1 000 km depuis une minute." },
  { chiffre: "64", theme: "puissances", texte: "Les cases d'un échiquier. Un grain de riz sur la première, 2 sur la deuxième, 4 sur la troisième… sur la dernière, il en faudrait plus de 9 milliards de milliards." },
  { chiffre: "1,414…", texte: "Le rapport entre la longueur et la largeur d'une feuille A4. Plie-la en deux : la moitié garde exactement la même forme." },
  { chiffre: "0,999… = 1", theme: "decimaux", texte: "Un zéro virgule suivi d'une infinité de 9 vaut exactement 1. Un tiers fait 0,333…, trois tiers font 0,999… et aussi 1." },
  { chiffre: "6 côtés", texte: "Les alvéoles des abeilles sont des hexagones : la forme qui pave le plan avec le moins de cire pour le plus de place." },
  { chiffre: "31 536 000", theme: "durees", texte: "Le nombre de secondes dans une année de 365 jours. Ton prochain anniversaire est quelque part dedans." },
  { chiffre: "100 000", texte: "À peu près le nombre de battements de ton cœur en une journée, à environ 70 battements par minute." },
  { chiffre: "12", texte: "Le nombre de faces d'un dodécaèdre, l'un des cinq solides de Platon. Il n'en existe que cinq, et on sait le démontrer." },
];

/* ── ET PLUS TARD ? LE MÉTIER DU JOUR ───────────────────────────────────────
   « Avoir une perspective d'avenir » : chaque jour, un métier et LA notion qui
   y sert vraiment, avec un lien vers elle. ⛔ Des usages réels et connus, pas
   des promesses de salaire ni de débouchés chiffrés. */
export type Metier = {
  nom: string;
  /** Ce que la personne fait, en une phrase. */
  fait: string;
  /** Les maths qu'elle utilise, en une phrase concrète. */
  maths: string;
  notion: string;
  href: string;
};

export const METIERS: Metier[] = [
  {
    nom: "Charpentier ou charpentière",
    fait: "Monte les toits et les maisons en bois.",
    maths: "Pour vérifier un angle droit sur un chantier, on mesure 3 m, 4 m… et la diagonale doit faire 5 m. C'est Pythagore.",
    notion: "Pythagore · 4e",
    href: "/coach-ia/maths?classe=4e",
  },
  {
    nom: "Prévisionniste météo",
    fait: "Annonce la pluie, le vent et les cyclones.",
    maths: "Il compte la pluie en millimètres : 1 mm, c'est 1 litre d'eau sur chaque mètre carré.",
    notion: "Grandeurs et mesures · 5e",
    href: "/video/974-eau",
  },
  {
    nom: "Infirmier ou infirmière",
    fait: "Soigne les patients et prépare leurs traitements.",
    maths: "Une dose se calcule selon le poids du patient : c'est de la proportionnalité, et une erreur ne pardonne pas.",
    notion: "Proportionnalité · 6e à 4e",
    href: "/coach-ia/maths?classe=4e",
  },
  {
    nom: "Ingénieur ou ingénieure du trafic",
    fait: "Règle les feux et les ronds-points pour que ça roule.",
    maths: "Les voitures arrivent au hasard : les probabilités disent quand un bouchon va se former.",
    notion: "Probabilités · lycée",
    href: "/video/974-rond-point",
  },
  {
    nom: "Créateur ou créatrice de jeux vidéo",
    fait: "Invente des mondes où l'on joue.",
    maths: "Chaque personnage a des coordonnées (x ; y) dans un repère, et le faire bouger, c'est les faire varier.",
    notion: "Repère · 2de",
    href: "/coach-ia/maths?classe=seconde",
  },
  {
    nom: "Statisticien ou statisticienne",
    fait: "Fait parler les chiffres : santé, sport, élections, climat.",
    maths: "Moyennes, pourcentages, graphiques : savoir lire une courbe, c'est ne pas se laisser tromper.",
    notion: "Lire une courbe · 2de",
    href: "/video/seconde-analyse-graphique",
  },
  {
    nom: "Entraîneur ou entraîneuse de trail",
    fait: "Prépare les coureurs de la Diagonale des Fous.",
    maths: "Vitesse, durée, dénivelé : 7,7 km/h de moyenne sur 165 km, ça se calcule avant le départ.",
    notion: "Vitesses et durées · 4e",
    href: "/video/4e-grandeur-composee-short-diagonale",
  },
  {
    nom: "Architecte",
    fait: "Dessine les maisons, les écoles, les ponts.",
    maths: "Un plan est à l'échelle : 1 cm sur le papier peut valoir 1 m en vrai. Aires et longueurs à chaque trait.",
    notion: "Aires et longueurs · 6e",
    href: "/coach-ia/maths?classe=6e",
  },
  // 19/10 : de 8 à 16 métiers.
  {
    nom: "Boulanger ou boulangère",
    fait: "Fait le pain de tout le quartier, avant le lever du soleil.",
    maths: "Une recette pour 10 baguettes, il en faut 60 : tout se multiplie par 6. C'est de la proportionnalité, tous les matins.",
    notion: "Proportionnalité · 6e",
    href: "/coach-ia/maths?classe=6e",
  },
  {
    nom: "Pilote de ligne",
    fait: "Emmène des centaines de passagers d'un continent à l'autre.",
    maths: "Distance, vitesse, durée, carburant : avant chaque vol, tout se calcule et se vérifie deux fois.",
    notion: "Vitesses et durées · 4e",
    href: "/coach-ia/maths?classe=4e",
  },
  {
    nom: "Agriculteur ou agricultrice",
    fait: "Cultive la canne, les légumes, les fruits.",
    maths: "Le rendement se compte en tonnes par hectare, et un champ se mesure en aires : le calcul fait partie du métier.",
    notion: "Aires · 6e",
    href: "/coach-ia/maths?classe=6e",
  },
  {
    nom: "Pharmacien ou pharmacienne",
    fait: "Délivre les médicaments et conseille les patients.",
    maths: "Une concentration en mg par mL, une dose par kilo : la proportionnalité, encore, et sans droit à l'erreur.",
    notion: "Proportionnalité · 4e",
    href: "/coach-ia/maths?classe=4e",
  },
  {
    nom: "Géomètre",
    fait: "Mesure les terrains et trace les limites des parcelles.",
    maths: "La hauteur d'un bâtiment ou la largeur d'une ravine, sans la traverser : avec un angle et la trigonométrie.",
    notion: "Trigonométrie · 3e",
    href: "/video/3e-trigo-trigonometrie",
  },
  {
    nom: "Comptable",
    fait: "Tient les comptes des entreprises et des associations.",
    maths: "Pourcentages, taxes, évolutions : savoir qu'une hausse de 10 % puis une baisse de 10 % ne ramène pas au départ.",
    notion: "Pourcentages · 4e",
    href: "/video/4e-prop-pourcentages",
  },
  {
    nom: "Cuisinier ou cuisinière",
    fait: "Prépare des repas pour 4 personnes… ou pour 200.",
    maths: "Passer une recette de 4 à 10 personnes, c'est multiplier chaque quantité par 2,5.",
    notion: "Proportionnalité · 6e",
    href: "/coach-ia/maths?classe=6e",
  },
  {
    nom: "Chercheur ou chercheuse en IA",
    fait: "Apprend aux machines à reconnaître, traduire, prévoir.",
    maths: "Une IA ne « sait » rien : elle calcule des probabilités. Les comprendre, c'est savoir quand lui faire confiance.",
    notion: "Probabilités · 3e",
    href: "/video/3e-proba-vocabulaire",
  },
];

/** Le numéro du jour, à l'heure de Paris : nombre de jours depuis le
 *  1er janvier 1970. Sert à faire tourner TOUTES les rubriques — sans remise à
 *  zéro au 1er janvier. Appelé côté SERVEUR seulement. */
export function jourParis(d = new Date()): number {
  const p = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d); // « 2026-10-18 »
  const [a, m, j] = p.split("-").map(Number);
  return Math.round(Date.UTC(a, m - 1, j) / 86400000);
}

/** Le N° 1 du journal : le 18/10/2026, jour où l'accueil est devenu un journal. */
export const JOUR_DU_NUMERO_1 = Math.round(Date.UTC(2026, 9, 18) / 86400000);
