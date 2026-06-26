/* -------------------------------------------------------------------------- */
/*  Données du cahier de vacances « Vers la 6e ».                              */
/*  Fil conducteur : Le grand voyage de Ti Margo vers la 6e — une expédition   */
/*  à La Réunion en 6 étapes (une par semaine), du lagon jusqu'au sommet.      */
/*  Difficulté progressive ; 1 objet `jour` = 1 page imprimée.                 */
/*  Le moteur d'affichage est commun : components/cahier/CahierVacances.tsx.   */
/* -------------------------------------------------------------------------- */

import type { Etape, Jour } from "@/components/cahier/types";

/** Les 6 étapes du parcours (fil conducteur de l'été). */
export const parcours: Etape[] = [
  {
    semaine: 1,
    etape: 1,
    emoji: "🏖️",
    lieu: "Le lagon de l'Hermitage",
    intro: "Le grand voyage vers la 6e commence au bord du lagon !",
  },
  {
    semaine: 2,
    etape: 2,
    emoji: "🌳",
    lieu: "La forêt de Bélouve",
    intro: "Ti Margo s'enfonce dans la forêt de tamarins.",
  },
  {
    semaine: 3,
    etape: 3,
    emoji: "🌋",
    lieu: "Le Piton de la Fournaise",
    intro: "Cap sur le volcan : ça chauffe, mais on grimpe !",
  },
  {
    semaine: 4,
    etape: 4,
    emoji: "🥾",
    lieu: "Le cirque de Mafate",
    intro: "Dans Mafate, aucune route : que des sentiers.",
  },
  {
    semaine: 5,
    etape: 5,
    emoji: "💧",
    lieu: "Les cascades du Trou de Fer",
    intro: "Ti Margo longe les cascades vertigineuses.",
  },
  {
    semaine: 6,
    etape: 6,
    emoji: "⛰️",
    lieu: "Le Piton des Neiges",
    intro: "Dernière étape : le sommet ! Au bout, la 6e t'attend.",
  },
];

export const jours: Jour[] = [
  /* ===================== SEMAINE 1 · Le lagon ===================== */
  {
    numero: 1,
    semaine: 1,
    badge: "Margouillat malin",
    maths: {
      calcul: [
        { q: "7 × 8 =", r: "56" },
        { q: "48 ÷ 6 =", r: "8" },
        { q: "125 + 78 =", r: "203" },
        { q: "1000 − 365 =", r: "635" },
        { q: "9 × 6 =", r: "54" },
      ],
      probleme: {
        enonce:
          "Une boîte contient 6 paquets de 24 gâteaux. Combien y a-t-il de gâteaux en tout ?",
        correction: "6 × 24 = 144. Il y a 144 gâteaux.",
      },
      illu: { emoji: "🎁", label: "boîte de gâteaux" },
    },
    francais: {
      regleTitre: "Le sujet du verbe",
      regle:
        "Le sujet répond à la question « Qui est-ce qui… ? » ou « Qu'est-ce qui… ? » posée devant le verbe.",
      consigne: "Souligne le sujet de chaque phrase.",
      items: [
        "Le chat dort sur le canapé.",
        "Mes amis arrivent demain.",
        "La grande tour brille au soleil.",
      ],
      correction:
        "1. Le chat — 2. Mes amis — 3. La grande tour. (On pose « Qui est-ce qui… ? »)",
    },
    mot: {
      mot: "Périmètre",
      nature: "nom, maths",
      definition: "Le périmètre, c'est la longueur du tour d'une figure.",
      exemple: "Le périmètre d'un carré de 5 cm de côté est 5 + 5 + 5 + 5 = 20 cm.",
    },
    geste: {
      titre: "Le clic gauche",
      texte:
        "On appuie une fois sur le bouton gauche de la souris pour sélectionner ou valider un élément.",
    },
    defi: {
      enonce: "Je suis un nombre. Si tu m'ajoutes 10, tu obtiens 25. Qui suis-je ?",
      correction: "15, car 15 + 10 = 25.",
    },
  },
  {
    numero: 2,
    semaine: 1,
    badge: "Calculateur éclair",
    maths: {
      calcul: [
        { q: "6 × 7 =", r: "42" },
        { q: "56 ÷ 8 =", r: "7" },
        { q: "240 + 160 =", r: "400" },
        { q: "double de 45 =", r: "90" },
        { q: "8 × 8 =", r: "64" },
      ],
      probleme: {
        enonce:
          "Léa a 3,50 €. Elle achète un cahier à 2,20 €. Combien lui reste-t-il ?",
        correction: "3,50 − 2,20 = 1,30. Il lui reste 1,30 €.",
      },
      illu: { emoji: "💶", label: "pièces et billets" },
    },
    francais: {
      regleTitre: "Le verbe",
      regle:
        "Le verbe est le mot qui change quand on change le temps (hier, aujourd'hui, demain). Il indique l'action.",
      consigne: "Entoure le verbe de chaque phrase.",
      items: [
        "Nous mangeons à midi.",
        "Le train partira bientôt.",
        "Tu as fini ton travail.",
      ],
      correction:
        "1. mangeons — 2. partira — 3. as fini. (Le verbe change si on change le temps.)",
    },
    mot: {
      mot: "Quotient",
      nature: "nom, maths",
      definition: "Le quotient est le résultat d'une division.",
      exemple: "Dans 20 ÷ 4 = 5, le quotient est 5.",
    },
    geste: {
      titre: "Le double-clic",
      texte:
        "On appuie deux fois rapidement sur le bouton gauche pour ouvrir un dossier ou un fichier.",
    },
    defi: {
      enonce:
        "Dans une ferme, il y a des poules et des lapins, soit 8 têtes et 22 pattes. Combien de lapins ?",
      correction: "3 lapins (12 pattes) et 5 poules (10 pattes) : 8 têtes, 22 pattes.",
    },
  },
  {
    numero: 3,
    semaine: 1,
    badge: "Explorateur des mots",
    maths: {
      calcul: [
        { q: "9 × 7 =", r: "63" },
        { q: "63 ÷ 9 =", r: "7" },
        { q: "1/2 de 50 =", r: "25" },
        { q: "350 + 450 =", r: "800" },
        { q: "12 × 5 =", r: "60" },
      ],
      probleme: {
        enonce:
          "Un film dure 1 h 45 min. Il commence à 14 h 30. À quelle heure se termine-t-il ?",
        correction: "14 h 30 + 1 h 45 = 16 h 15. Le film finit à 16 h 15.",
      },
      illu: { emoji: "🎬", label: "horloge et cinéma" },
    },
    francais: {
      regleTitre: "Singulier et pluriel",
      regle:
        "Au pluriel, la plupart des noms prennent un -s. Certains prennent -x (un château → des châteaux).",
      consigne: "Écris ces groupes au pluriel.",
      items: ["un cheval →", "le beau gâteau →", "une souris →"],
      correction: "des chevaux — les beaux gâteaux — des souris (déjà en -s).",
    },
    mot: {
      mot: "Sommet",
      nature: "nom, géométrie",
      definition: "Un sommet est un point où se rejoignent deux côtés d'une figure.",
      exemple: "Un triangle a 3 sommets.",
    },
    geste: {
      titre: "Copier (Ctrl + C)",
      texte:
        "On sélectionne un texte, puis on appuie en même temps sur les touches Ctrl et C pour le copier.",
    },
    defi: {
      enonce:
        "Complète la suite logique : 2, 4, 8, 16, … Quel est le nombre suivant ?",
      correction: "32 : à chaque fois, on multiplie par 2.",
    },
  },
  {
    numero: 4,
    semaine: 1,
    badge: "As de la logique",
    maths: {
      calcul: [
        { q: "8 × 6 =", r: "48" },
        { q: "72 ÷ 8 =", r: "9" },
        { q: "0,5 + 0,5 =", r: "1" },
        { q: "1000 − 250 =", r: "750" },
        { q: "7 × 7 =", r: "49" },
      ],
      probleme: {
        enonce: "Un parking compte 5 rangées de 18 places. Combien de places en tout ?",
        correction: "5 × 18 = 90. Il y a 90 places.",
      },
      illu: { emoji: "🅿️", label: "places de parking" },
    },
    francais: {
      regleTitre: "a ou à ?",
      regle:
        "« a » (sans accent) est le verbe avoir (on peut dire « avait »). « à » (avec accent) est un mot invariable.",
      consigne: "Complète avec « a » ou « à ».",
      items: [
        "Il ___ un vélo rouge.",
        "Nous partons ___ la mer.",
        "Elle pense ___ ses vacances.",
      ],
      correction: "1. a (avait un vélo) — 2. à — 3. à.",
    },
    mot: {
      mot: "Différence",
      nature: "nom, maths",
      definition: "La différence est le résultat d'une soustraction.",
      exemple: "La différence entre 10 et 4 est 6, car 10 − 4 = 6.",
    },
    geste: {
      titre: "Coller (Ctrl + V)",
      texte:
        "Après avoir copié, on appuie en même temps sur Ctrl et V pour coller le texte au bon endroit.",
    },
    defi: {
      enonce:
        "J'ai 12 ans. Mon frère a la moitié de mon âge. Quel âge aura-t-il quand j'aurai 20 ans ?",
      correction: "Il a 6 ans (12 − 6 = 6 d'écart). À mes 20 ans, il aura 14 ans.",
    },
  },
  {
    numero: 5,
    semaine: 1,
    badge: "Champion de la semaine",
    maths: {
      calcul: [
        { q: "6 × 9 =", r: "54" },
        { q: "81 ÷ 9 =", r: "9" },
        { q: "1/4 de 100 =", r: "25" },
        { q: "275 + 325 =", r: "600" },
        { q: "11 × 4 =", r: "44" },
      ],
      probleme: {
        enonce: "Un litre de jus coûte 1,80 €. Combien coûtent 3 litres ?",
        correction: "3 × 1,80 = 5,40. Cela coûte 5,40 €.",
      },
      illu: { emoji: "🧃", label: "bouteilles de jus" },
    },
    francais: {
      regleTitre: "Les homophones et / est",
      regle:
        "« et » relie deux mots (on peut dire « et puis »). « est » est le verbe être (on peut dire « était »).",
      consigne: "Complète avec « et » ou « est ».",
      items: ["Le ciel ___ bleu.", "Paul ___ Marie jouent.", "Elle ___ contente ___ fière."],
      correction: "1. est (était bleu) — 2. et — 3. est … et.",
    },
    mot: {
      mot: "Symétrie",
      nature: "nom, géométrie",
      definition:
        "Une figure est symétrique quand on peut la plier en deux parties identiques le long d'un axe.",
      exemple: "Un papillon est symétrique : ses deux ailes se superposent.",
    },
    geste: {
      titre: "Le menu déroulant",
      texte:
        "Un menu déroulant s'ouvre quand on clique sur une petite flèche : on choisit ensuite une option dans la liste.",
    },
    defi: {
      enonce:
        "Combien de carrés vois-tu dans une grille de 2 cases sur 2 (en comptant le grand) ?",
      correction: "5 : les 4 petits carrés + le grand carré qui les contient.",
    },
  },

  /* ===================== SEMAINE 2 · La forêt ===================== */
  {
    numero: 6,
    semaine: 2,
    badge: "Pisteur de la forêt",
    maths: {
      calcul: [
        { q: "7 × 9 =", r: "63" },
        { q: "64 ÷ 8 =", r: "8" },
        { q: "25 × 4 =", r: "100" },
        { q: "420 + 380 =", r: "800" },
        { q: "100 − 43 =", r: "57" },
      ],
      probleme: {
        enonce:
          "Sur le sentier de Bélouve, Ti Margo marche 6 km le matin et 7 km l'après-midi. Combien de km en tout ?",
        correction: "6 + 7 = 13. Ti Margo a marché 13 km.",
      },
      illu: { emoji: "🌳", label: "forêt de tamarins" },
    },
    francais: {
      regleTitre: "Le présent des verbes en -er",
      regle:
        "Au présent, les verbes en -er prennent : -e, -es, -e, -ons, -ez, -ent.",
      consigne: "Conjugue le verbe « chanter » au présent.",
      items: ["je ___", "nous ___", "ils ___"],
      correction: "je chante — nous chantons — ils chantent.",
    },
    mot: {
      mot: "Multiple",
      nature: "nom, maths",
      definition: "Un multiple d'un nombre s'obtient en le multipliant par un autre nombre.",
      exemple: "12 est un multiple de 3, car 3 × 4 = 12.",
    },
    geste: {
      titre: "Le clic droit",
      texte:
        "On appuie sur le bouton droit de la souris pour ouvrir un menu d'options (copier, coller…).",
    },
    defi: {
      enonce: "Quel nombre manque dans la suite : 5, 10, 15, …, 25 ?",
      correction: "20 : on ajoute 5 à chaque fois.",
    },
  },
  {
    numero: 7,
    semaine: 2,
    badge: "Ami des goyaviers",
    maths: {
      calcul: [
        { q: "8 × 7 =", r: "56" },
        { q: "81 ÷ 9 =", r: "9" },
        { q: "30 × 3 =", r: "90" },
        { q: "250 + 250 =", r: "500" },
        { q: "60 ÷ 4 =", r: "15" },
      ],
      probleme: {
        enonce:
          "Ti Margo cueille 48 goyaviers et les range par paquets de 6. Combien de paquets fait-il ?",
        correction: "48 ÷ 6 = 8. Il fait 8 paquets.",
      },
      illu: { emoji: "🍒", label: "goyaviers" },
    },
    francais: {
      regleTitre: "Le nom : commun ou propre",
      regle:
        "Le nom propre désigne quelqu'un ou un lieu précis (majuscule). Le nom commun désigne une chose en général.",
      consigne: "Classe ces noms : propre ou commun ?",
      items: ["La Réunion →", "forêt →", "Ti Margo →"],
      correction: "La Réunion → propre · forêt → commun · Ti Margo → propre.",
    },
    mot: {
      mot: "Diviseur",
      nature: "nom, maths",
      definition: "Le diviseur est le nombre par lequel on divise.",
      exemple: "Dans 20 ÷ 4 = 5, le diviseur est 4.",
    },
    geste: {
      titre: "La molette",
      texte:
        "La molette, au milieu de la souris, sert à faire défiler la page vers le haut ou vers le bas.",
    },
    defi: {
      enonce: "Combien font 3 dizaines et 5 unités ?",
      correction: "35 : 3 dizaines = 30, plus 5 unités = 35.",
    },
  },
  {
    numero: 8,
    semaine: 2,
    badge: "Marcheur infatigable",
    maths: {
      calcul: [
        { q: "9 × 8 =", r: "72" },
        { q: "49 ÷ 7 =", r: "7" },
        { q: "12 × 4 =", r: "48" },
        { q: "530 + 170 =", r: "700" },
        { q: "100 − 68 =", r: "32" },
      ],
      probleme: {
        enonce:
          "La randonnée dure 2 h 30. Ti Margo part à 9 h 15. À quelle heure arrive-t-il ?",
        correction: "9 h 15 + 2 h 30 = 11 h 45. Il arrive à 11 h 45.",
      },
      illu: { emoji: "⏱️", label: "chronomètre" },
    },
    francais: {
      regleTitre: "L'accord de l'adjectif",
      regle:
        "L'adjectif s'accorde en genre (masculin/féminin) et en nombre (singulier/pluriel) avec le nom.",
      consigne: "Accorde l'adjectif entre parenthèses.",
      items: ["des fleurs (rouge) →", "des oiseaux (petit) →", "une eau (clair) →"],
      correction: "des fleurs rouges — des oiseaux petits — une eau claire.",
    },
    mot: {
      mot: "Produit",
      nature: "nom, maths",
      definition: "Le produit est le résultat d'une multiplication.",
      exemple: "Le produit de 6 et 7 est 42, car 6 × 7 = 42.",
    },
    geste: {
      titre: "Sélectionner un texte",
      texte:
        "On clique au début du texte et, sans relâcher, on glisse jusqu'à la fin pour le surligner.",
    },
    defi: {
      enonce: "Quel est le double de 35 ?",
      correction: "70, car 35 + 35 = 70.",
    },
  },
  {
    numero: 9,
    semaine: 2,
    badge: "Œil de lynx",
    maths: {
      calcul: [
        { q: "6 × 8 =", r: "48" },
        { q: "72 ÷ 9 =", r: "8" },
        { q: "15 × 3 =", r: "45" },
        { q: "640 + 260 =", r: "900" },
        { q: "90 ÷ 3 =", r: "30" },
      ],
      probleme: {
        enonce:
          "Dans la forêt, Ti Margo compte 9 rangées de 8 fougères. Combien de fougères en tout ?",
        correction: "9 × 8 = 72. Il y a 72 fougères.",
      },
      illu: { emoji: "🌿", label: "fougères" },
    },
    francais: {
      regleTitre: "son ou sont ?",
      regle:
        "« sont » est le verbe être (on peut dire « étaient »). « son » montre la possession (mon, ton, son).",
      consigne: "Complète avec « son » ou « sont ».",
      items: ["Ils ___ contents.", "Ti Margo prend ___ sac.", "Les sentiers ___ longs."],
      correction: "1. sont (étaient) — 2. son (sac à lui) — 3. sont.",
    },
    mot: {
      mot: "Somme",
      nature: "nom, maths",
      definition: "La somme est le résultat d'une addition.",
      exemple: "La somme de 7 et 5 est 12, car 7 + 5 = 12.",
    },
    geste: {
      titre: "Enregistrer (Ctrl + S)",
      texte:
        "On appuie en même temps sur Ctrl et S pour sauvegarder son travail et ne pas le perdre.",
    },
    defi: {
      enonce: "Quel nombre est juste avant 1 000 ?",
      correction: "999.",
    },
  },
  {
    numero: 10,
    semaine: 2,
    badge: "Roi de la forêt",
    maths: {
      calcul: [
        { q: "7 × 7 =", r: "49" },
        { q: "56 ÷ 7 =", r: "8" },
        { q: "20 × 5 =", r: "100" },
        { q: "480 + 220 =", r: "700" },
        { q: "100 − 55 =", r: "45" },
      ],
      probleme: {
        enonce:
          "Ti Margo a marché 13 km hier et 9 km aujourd'hui. Combien de km de plus a-t-il marché hier ?",
        correction: "13 − 9 = 4. Il a marché 4 km de plus hier.",
      },
      illu: { emoji: "🐦", label: "oiseau de la forêt" },
    },
    francais: {
      regleTitre: "Le présent : être et avoir",
      regle:
        "être : je suis, tu es, il est, nous sommes, vous êtes, ils sont. avoir : j'ai, tu as, il a, nous avons, vous avez, ils ont.",
      consigne: "Complète au présent.",
      items: ["je ___ (être)", "nous ___ (avoir)", "ils ___ (être)"],
      correction: "je suis — nous avons — ils sont.",
    },
    mot: {
      mot: "Aire",
      nature: "nom, géométrie",
      definition: "L'aire est la mesure de la surface d'une figure (à l'intérieur du contour).",
      exemple: "L'aire d'un carré de 5 cm de côté est 5 × 5 = 25 cm².",
    },
    geste: {
      titre: "La barre d'espace",
      texte:
        "La grande touche du bas du clavier sert à mettre un espace entre deux mots.",
    },
    defi: {
      enonce: "5 margouillats ont combien de pattes en tout ?",
      correction: "20 pattes : 5 × 4 = 20 (chaque margouillat a 4 pattes).",
    },
  },

  /* ===================== SEMAINE 3 · Le volcan ===================== */
  {
    numero: 11,
    semaine: 3,
    badge: "Grimpeur du volcan",
    maths: {
      calcul: [
        { q: "8 × 9 =", r: "72" },
        { q: "100 ÷ 10 =", r: "10" },
        { q: "3,5 + 1,5 =", r: "5" },
        { q: "7 × 100 =", r: "700" },
        { q: "1000 − 450 =", r: "550" },
      ],
      probleme: {
        enonce:
          "Le sentier du volcan monte de 1 200 m. Ti Margo a grimpé la moitié. Combien de mètres a-t-il grimpés ?",
        correction: "1 200 ÷ 2 = 600. Il a grimpé 600 m.",
      },
      illu: { emoji: "🌋", label: "volcan" },
    },
    francais: {
      regleTitre: "Le futur simple (verbes en -er)",
      regle:
        "Au futur, les verbes en -er gardent le -er et ajoutent : -ai, -as, -a, -ons, -ez, -ont.",
      consigne: "Conjugue au futur simple.",
      items: ["je (marcher) ___", "nous (monter) ___", "ils (arriver) ___"],
      correction: "je marcherai — nous monterons — ils arriveront.",
    },
    mot: {
      mot: "Fraction",
      nature: "nom, maths",
      definition: "Une fraction représente une ou plusieurs parts égales d'un tout.",
      exemple: "1/2 (un demi) représente une part sur deux parts égales.",
    },
    geste: {
      titre: "La touche Maj (majuscule)",
      texte:
        "On la maintient enfoncée en tapant une lettre pour écrire une MAJUSCULE.",
    },
    defi: {
      enonce: "Quelle est la moitié de 1 000 ?",
      correction: "500.",
    },
  },
  {
    numero: 12,
    semaine: 3,
    badge: "Explorateur des laves",
    maths: {
      calcul: [
        { q: "9 × 9 =", r: "81" },
        { q: "90 ÷ 10 =", r: "9" },
        { q: "2,5 + 2,5 =", r: "5" },
        { q: "6 × 100 =", r: "600" },
        { q: "4 × 25 =", r: "100" },
      ],
      probleme: {
        enonce:
          "Au sommet du volcan il fait 12 °C ; en bas il fait 28 °C. Quelle est la différence de température ?",
        correction: "28 − 12 = 16. La différence est de 16 °C.",
      },
      illu: { emoji: "🌡️", label: "thermomètre" },
    },
    francais: {
      regleTitre: "L'imparfait (le reconnaître)",
      regle:
        "L'imparfait raconte le passé qui dure (hier, autrefois). Terminaisons : -ais, -ais, -ait, -ions, -iez, -aient.",
      consigne: "Souligne le verbe à l'imparfait.",
      items: ["Hier, il pleuvait.", "Nous marchions longtemps.", "Demain, il fera beau."],
      correction: "pleuvait et marchions (imparfait). « fera » est au futur.",
    },
    mot: {
      mot: "Numérateur",
      nature: "nom, maths",
      definition: "Dans une fraction, le numérateur est le nombre du haut.",
      exemple: "Dans 3/4, le numérateur est 3.",
    },
    geste: {
      titre: "La touche Entrée",
      texte:
        "On appuie sur Entrée pour valider ou pour aller à la ligne suivante.",
    },
    defi: {
      enonce: "Combien de quarts y a-t-il dans une unité entière ?",
      correction: "4 quarts : 1/4 + 1/4 + 1/4 + 1/4 = 1.",
    },
  },
  {
    numero: 13,
    semaine: 3,
    badge: "Cœur de braise",
    maths: {
      calcul: [
        { q: "7 × 8 =", r: "56" },
        { q: "120 ÷ 10 =", r: "12" },
        { q: "1,2 + 0,8 =", r: "2" },
        { q: "9 × 100 =", r: "900" },
        { q: "50 × 2 =", r: "100" },
      ],
      probleme: {
        enonce: "Ti Margo remplit 4 gourdes de 0,5 L chacune. Combien de litres d'eau au total ?",
        correction: "4 × 0,5 = 2. Cela fait 2 litres.",
      },
      illu: { emoji: "🔥", label: "braises" },
    },
    francais: {
      regleTitre: "Le pluriel en -al → -aux",
      regle:
        "Beaucoup de noms en -al font leur pluriel en -aux (un cheval → des chevaux).",
      consigne: "Écris au pluriel.",
      items: ["un journal →", "un cheval →", "un animal →"],
      correction: "des journaux — des chevaux — des animaux.",
    },
    mot: {
      mot: "Dénominateur",
      nature: "nom, maths",
      definition: "Dans une fraction, le dénominateur est le nombre du bas (le nombre de parts).",
      exemple: "Dans 3/4, le dénominateur est 4.",
    },
    geste: {
      titre: "Les flèches du clavier",
      texte:
        "Les 4 flèches déplacent le curseur : haut, bas, gauche, droite.",
    },
    defi: {
      enonce: "Combien font 3/4 + 1/4 ?",
      correction: "1 (un entier), car 3/4 + 1/4 = 4/4 = 1.",
    },
  },
  {
    numero: 14,
    semaine: 3,
    badge: "Marcheur de feu",
    maths: {
      calcul: [
        { q: "6 × 7 =", r: "42" },
        { q: "800 ÷ 100 =", r: "8" },
        { q: "3,5 + 0,5 =", r: "4" },
        { q: "8 × 10 =", r: "80" },
        { q: "1000 − 750 =", r: "250" },
      ],
      probleme: {
        enonce: "La montée a pris 90 minutes. Combien cela fait-il d'heures et de minutes ?",
        correction: "90 min = 1 h 30 (60 min + 30 min).",
      },
      illu: { emoji: "🥾", label: "chaussures de marche" },
    },
    francais: {
      regleTitre: "ce ou se ?",
      regle:
        "« ce » est devant un nom (ce sac). « se » est devant un verbe (il se lave).",
      consigne: "Complète avec « ce » ou « se ».",
      items: ["___ matin, Ti Margo ___ lève tôt.", "___ sentier est dur.", "Il ___ repose."],
      correction: "Ce matin, se lève — Ce sentier — se repose.",
    },
    mot: {
      mot: "Décimal",
      nature: "adjectif, maths",
      definition: "Un nombre décimal a une partie après la virgule.",
      exemple: "3,5 est un nombre décimal (3 unités et 5 dixièmes).",
    },
    geste: {
      titre: "La touche Suppr (supprimer)",
      texte:
        "Elle efface le caractère situé juste après le curseur.",
    },
    defi: {
      enonce: "Écris en chiffres : trois unités et cinq dixièmes.",
      correction: "3,5.",
    },
  },
  {
    numero: 15,
    semaine: 3,
    badge: "Conquérant du cratère",
    maths: {
      calcul: [
        { q: "8 × 8 =", r: "64" },
        { q: "600 ÷ 100 =", r: "6" },
        { q: "2,5 + 1,5 =", r: "4" },
        { q: "12 × 10 =", r: "120" },
        { q: "100 − 72 =", r: "28" },
      ],
      probleme: {
        enonce:
          "Ti Margo a parcouru 3,5 km le matin et 4,5 km le soir. Combien de km en tout ?",
        correction: "3,5 + 4,5 = 8. Il a parcouru 8 km.",
      },
      illu: { emoji: "⛰️", label: "cratère" },
    },
    francais: {
      regleTitre: "Le futur : être et avoir",
      regle:
        "être au futur : je serai, tu seras, il sera… avoir au futur : j'aurai, tu auras, il aura…",
      consigne: "Complète au futur.",
      items: ["je ___ (être)", "tu ___ (avoir)", "ils ___ (être)"],
      correction: "je serai — tu auras — ils seront.",
    },
    mot: {
      mot: "Proportion",
      nature: "nom, maths",
      definition: "Une proportion compare une partie à un tout.",
      exemple: "Si 1 élève sur 2 aime les maths, la proportion est la moitié.",
    },
    geste: {
      titre: "La touche Retour arrière",
      texte:
        "Au-dessus de la touche Entrée, elle efface le caractère situé juste avant le curseur.",
    },
    defi: {
      enonce: "Quel nombre décimal est juste au milieu entre 2 et 3 ?",
      correction: "2,5.",
    },
  },

  /* ===================== SEMAINE 4 · Mafate ===================== */
  {
    numero: 16,
    semaine: 4,
    badge: "Randonneur de Mafate",
    maths: {
      calcul: [
        { q: "9 × 6 =", r: "54" },
        { q: "250 ÷ 5 =", r: "50" },
        { q: "1,5 × 2 =", r: "3" },
        { q: "7 × 1000 =", r: "7000" },
        { q: "100 − 39 =", r: "61" },
      ],
      probleme: {
        enonce:
          "Pour rejoindre l'îlet, Ti Margo marche 4 km, se repose, puis 3 km. Combien de mètres a-t-il parcourus ?",
        correction: "4 + 3 = 7 km = 7 000 m.",
      },
      illu: { emoji: "🥾", label: "randonnée" },
    },
    francais: {
      regleTitre: "Le passé composé (le reconnaître)",
      regle:
        "Le passé composé = avoir ou être au présent + le participe passé (a marché, est allé).",
      consigne: "Souligne le verbe au passé composé.",
      items: ["Ti Margo a marché.", "Il marche vite.", "Nous avons mangé."],
      correction: "a marché et avons mangé (passé composé). « marche » est au présent.",
    },
    mot: {
      mot: "Longueur",
      nature: "nom, mesure",
      definition: "La longueur se mesure en mm, cm, m ou km.",
      exemple: "1 m = 100 cm. 1 km = 1 000 m.",
    },
    geste: {
      titre: "Glisser-déposer",
      texte:
        "On clique sur un objet, on le déplace sans relâcher, puis on le lâche au bon endroit.",
    },
    defi: {
      enonce: "Combien de centimètres y a-t-il dans 1 mètre ?",
      correction: "100 cm.",
    },
  },
  {
    numero: 17,
    semaine: 4,
    badge: "Ami des îlets",
    maths: {
      calcul: [
        { q: "7 × 6 =", r: "42" },
        { q: "360 ÷ 6 =", r: "60" },
        { q: "4 × 250 =", r: "1000" },
        { q: "2 × 1000 =", r: "2000" },
        { q: "100 − 84 =", r: "16" },
      ],
      probleme: {
        enonce: "Un champ rectangulaire mesure 20 m sur 15 m. Quel est son périmètre ?",
        correction: "2 × (20 + 15) = 70. Le périmètre est de 70 m.",
      },
      illu: { emoji: "🏞️", label: "îlet de montagne" },
    },
    francais: {
      regleTitre: "Masculin → féminin",
      regle:
        "Souvent on ajoute un -e au féminin ; parfois la fin change (-eur → -euse, -ien → -ienne).",
      consigne: "Mets au féminin.",
      items: ["un ami →", "le marcheur →", "un chien →"],
      correction: "une amie — la marcheuse — une chienne.",
    },
    mot: {
      mot: "Contenance",
      nature: "nom, mesure",
      definition: "La contenance est la quantité de liquide que peut contenir un récipient.",
      exemple: "Une bouteille a une contenance de 1 litre (1 L = 100 cL).",
    },
    geste: {
      titre: "Un dossier",
      texte:
        "Un dossier range des fichiers ensemble, comme une pochette range des feuilles.",
    },
    defi: {
      enonce: "Combien de mètres y a-t-il dans 1 km ?",
      correction: "1 000 m.",
    },
  },
  {
    numero: 18,
    semaine: 4,
    badge: "Maître des sentiers",
    maths: {
      calcul: [
        { q: "8 × 6 =", r: "48" },
        { q: "480 ÷ 8 =", r: "60" },
        { q: "3 × 1000 =", r: "3000" },
        { q: "1,5 + 2,5 =", r: "4" },
        { q: "100 − 27 =", r: "73" },
      ],
      probleme: {
        enonce:
          "Ti Margo achète 3 cartes à 2 € et une boussole à 5 €. Combien dépense-t-il en tout ?",
        correction: "3 × 2 + 5 = 11. Il dépense 11 €.",
      },
      illu: { emoji: "🧭", label: "boussole" },
    },
    francais: {
      regleTitre: "ses ou ces ?",
      regle:
        "« ses » montre la possession (ses affaires = les siennes). « ces » montre (ces montagnes = celles-là).",
      consigne: "Complète avec « ses » ou « ces ».",
      items: ["Ti Margo range ___ affaires.", "Regarde ___ montagnes !", "___ chaussures sont sales."],
      correction: "ses affaires — ces montagnes — Ces chaussures.",
    },
    mot: {
      mot: "Masse",
      nature: "nom, mesure",
      definition: "La masse se mesure en g ou en kg.",
      exemple: "1 kg = 1 000 g.",
    },
    geste: {
      titre: "Un fichier",
      texte:
        "Un fichier est un document enregistré : une photo, un texte, une vidéo…",
    },
    defi: {
      enonce: "Quel est le périmètre d'un carré de 8 cm de côté ?",
      correction: "32 cm, car 8 × 4 = 32.",
    },
  },
  {
    numero: 19,
    semaine: 4,
    badge: "Boussole vivante",
    maths: {
      calcul: [
        { q: "9 × 7 =", r: "63" },
        { q: "420 ÷ 7 =", r: "60" },
        { q: "2 × 500 =", r: "1000" },
        { q: "6 × 1000 =", r: "6000" },
        { q: "100 − 66 =", r: "34" },
      ],
      probleme: {
        enonce:
          "La gourde contient 1 L. Ti Margo en boit 250 mL trois fois. Combien de mL reste-t-il ?",
        correction: "1 L = 1 000 mL ; 3 × 250 = 750. Il reste 1 000 − 750 = 250 mL.",
      },
      illu: { emoji: "💧", label: "gourde d'eau" },
    },
    francais: {
      regleTitre: "L'infinitif du verbe",
      regle:
        "L'infinitif est la forme « non conjuguée » du verbe (manger, finir, prendre).",
      consigne: "Donne l'infinitif de chaque verbe.",
      items: ["il mange →", "nous finissons →", "tu prends →"],
      correction: "manger — finir — prendre.",
    },
    mot: {
      mot: "Angle",
      nature: "nom, géométrie",
      definition: "Un angle est l'ouverture formée par deux côtés qui se rejoignent.",
      exemple: "Un angle droit ressemble au coin d'une feuille.",
    },
    geste: {
      titre: "La capture d'écran",
      texte:
        "On photographie ce qui s'affiche à l'écran pour le garder ou le partager.",
    },
    defi: {
      enonce: "Combien de grammes y a-t-il dans 1 kilogramme ?",
      correction: "1 000 g.",
    },
  },
  {
    numero: 20,
    semaine: 4,
    badge: "Maître de Mafate",
    maths: {
      calcul: [
        { q: "8 × 7 =", r: "56" },
        { q: "540 ÷ 9 =", r: "60" },
        { q: "5 × 200 =", r: "1000" },
        { q: "3,5 + 3,5 =", r: "7" },
        { q: "100 − 48 =", r: "52" },
      ],
      probleme: {
        enonce: "Ti Margo marche 5 km par jour pendant 4 jours. Combien de km au total ?",
        correction: "5 × 4 = 20. Il marche 20 km.",
      },
      illu: { emoji: "🗺️", label: "carte des sentiers" },
    },
    francais: {
      regleTitre: "Les types de phrases",
      regle:
        "Déclarative (.), interrogative (?), exclamative (!), impérative (un ordre).",
      consigne: "Indique le type de chaque phrase.",
      items: ["Quelle belle vue ! →", "Tu viens ? →", "Range ton sac. →"],
      correction: "exclamative — interrogative — impérative.",
    },
    mot: {
      mot: "Diagonale",
      nature: "nom, géométrie",
      definition: "Une diagonale relie deux sommets opposés d'une figure.",
      exemple: "Un carré a 2 diagonales.",
    },
    geste: {
      titre: "Annuler (Ctrl + Z)",
      texte:
        "On appuie sur Ctrl et Z pour annuler la dernière action et revenir en arrière.",
    },
    defi: {
      enonce: "Combien font 2 h 15 + 1 h 50 ?",
      correction: "4 h 05 (2 h 15 + 1 h 50 = 3 h 65 = 4 h 05).",
    },
  },

  /* ===================== SEMAINE 5 · Les cascades ===================== */
  {
    numero: 21,
    semaine: 5,
    badge: "Explorateur des cascades",
    maths: {
      calcul: [
        { q: "9 × 8 =", r: "72" },
        { q: "100 ÷ 4 =", r: "25" },
        { q: "10 × 10 =", r: "100" },
        { q: "2,5 + 7,5 =", r: "10" },
        { q: "1000 − 325 =", r: "675" },
      ],
      probleme: {
        enonce:
          "La cascade du Trou de Fer fait environ 300 m de haut. Ti Margo en a descendu 120 m. Combien reste-t-il ?",
        correction: "300 − 120 = 180. Il reste 180 m.",
      },
      illu: { emoji: "💧", label: "cascade" },
    },
    francais: {
      regleTitre: "Les groupes de verbes",
      regle:
        "1er groupe : -er. 2e groupe : -ir (nous -issons). 3e groupe : tous les autres.",
      consigne: "Indique le groupe de chaque verbe.",
      items: ["chanter →", "finir →", "prendre →"],
      correction: "chanter → 1er · finir → 2e · prendre → 3e.",
    },
    mot: {
      mot: "Pourcentage",
      nature: "nom, maths",
      definition: "Un pourcentage exprime une proportion sur 100.",
      exemple: "10 % veut dire 10 sur 100.",
    },
    geste: {
      titre: "Le navigateur",
      texte:
        "Le navigateur est le logiciel qui ouvre les sites internet (Chrome, Safari, Firefox…).",
    },
    defi: {
      enonce: "Combien font 10 % de 200 ?",
      correction: "20, car 200 ÷ 10 = 20.",
    },
  },
  {
    numero: 22,
    semaine: 5,
    badge: "Plongeur intrépide",
    maths: {
      calcul: [
        { q: "7 × 9 =", r: "63" },
        { q: "200 ÷ 4 =", r: "50" },
        { q: "25 × 4 =", r: "100" },
        { q: "4,5 + 5,5 =", r: "10" },
        { q: "100 − 19 =", r: "81" },
      ],
      probleme: {
        enonce:
          "Dans la classe de 25 élèves, 20 % aiment les cascades. Combien d'élèves est-ce ?",
        correction: "25 × 20 / 100 = 5. Cela fait 5 élèves.",
      },
      illu: { emoji: "🌊", label: "bassin" },
    },
    francais: {
      regleTitre: "L'adjectif qualificatif",
      regle:
        "L'adjectif qualificatif décrit le nom : il dit comment est la chose.",
      consigne: "Souligne l'adjectif qualificatif.",
      items: ["une eau claire", "un rocher glissant", "de hautes chutes"],
      correction: "claire — glissant — hautes.",
    },
    mot: {
      mot: "Moyenne",
      nature: "nom, maths",
      definition: "La moyenne s'obtient en additionnant les valeurs puis en divisant par leur nombre.",
      exemple: "Moyenne de 4, 6 et 8 : (4 + 6 + 8) ÷ 3 = 6.",
    },
    geste: {
      titre: "La barre d'adresse (URL)",
      texte:
        "En haut du navigateur, on y tape l'adresse d'un site (ex. eleveai.fr).",
    },
    defi: {
      enonce: "La moitié de 50 % d'un nombre, c'est quel pourcentage ?",
      correction: "25 %.",
    },
  },
  {
    numero: 23,
    semaine: 5,
    badge: "Ami de l'eau",
    maths: {
      calcul: [
        { q: "8 × 9 =", r: "72" },
        { q: "300 ÷ 6 =", r: "50" },
        { q: "50 × 2 =", r: "100" },
        { q: "6,5 + 3,5 =", r: "10" },
        { q: "100 − 37 =", r: "63" },
      ],
      probleme: {
        enonce:
          "Un bassin contient 12 L. Ti Margo en retire 3 L, puis ajoute 5 L. Combien de litres y a-t-il ?",
        correction: "12 − 3 + 5 = 14. Il y a 14 litres.",
      },
      illu: { emoji: "🪣", label: "bassin d'eau" },
    },
    francais: {
      regleTitre: "Les déterminants",
      regle:
        "Le déterminant est le petit mot placé devant le nom (le, la, un, mon, trois…).",
      consigne: "Souligne le déterminant.",
      items: ["la rivière", "mon sac", "trois cascades"],
      correction: "la — mon — trois.",
    },
    mot: {
      mot: "Volume",
      nature: "nom, mesure",
      definition: "Le volume est la place qu'occupe un objet ; une contenance se mesure en litres.",
      exemple: "Une brique de jus a un volume de 1 litre.",
    },
    geste: {
      titre: "Un lien hypertexte",
      texte:
        "Un lien est un mot ou une image sur lequel on clique pour aller vers une autre page.",
    },
    defi: {
      enonce: "Combien de centilitres y a-t-il dans 1 litre ?",
      correction: "100 cL.",
    },
  },
  {
    numero: 24,
    semaine: 5,
    badge: "Funambule des chutes",
    maths: {
      calcul: [
        { q: "9 × 9 =", r: "81" },
        { q: "250 ÷ 5 =", r: "50" },
        { q: "20 × 5 =", r: "100" },
        { q: "7,5 + 2,5 =", r: "10" },
        { q: "100 − 58 =", r: "42" },
      ],
      probleme: {
        enonce:
          "Ti Margo mesure 3 cascades : 4 m, 6 m et 8 m. Quelle est la hauteur moyenne ?",
        correction: "(4 + 6 + 8) ÷ 3 = 18 ÷ 3 = 6. La moyenne est 6 m.",
      },
      illu: { emoji: "💦", label: "chutes d'eau" },
    },
    francais: {
      regleTitre: "la, là ou l'a ?",
      regle:
        "« la » devant un nom. « là » montre un lieu. « l'a » = le/la + a (verbe avoir).",
      consigne: "Complète avec « la », « là » ou « l'a ».",
      items: ["___ cascade est immense.", "Ti Margo ___ vue.", "Reste ___ !"],
      correction: "La cascade — l'a vue — là.",
    },
    mot: {
      mot: "Parallèle",
      nature: "adjectif, géométrie",
      definition: "Deux droites parallèles ne se croisent jamais, comme deux rails de train.",
      exemple: "Les deux grands côtés d'un rectangle sont parallèles.",
    },
    geste: {
      titre: "Un onglet",
      texte:
        "Un onglet est une page ouverte dans le navigateur ; on peut en ouvrir plusieurs côte à côte.",
    },
    defi: {
      enonce: "Quelle est l'aire d'un carré de 5 cm de côté ?",
      correction: "25 cm², car 5 × 5 = 25.",
    },
  },
  {
    numero: 25,
    semaine: 5,
    badge: "Gardien des cascades",
    maths: {
      calcul: [
        { q: "7 × 8 =", r: "56" },
        { q: "400 ÷ 8 =", r: "50" },
        { q: "25 × 2 =", r: "50" },
        { q: "5,5 + 4,5 =", r: "10" },
        { q: "100 − 73 =", r: "27" },
      ],
      probleme: {
        enonce: "Un rectangle mesure 6 cm sur 4 cm. Quelle est son aire ?",
        correction: "6 × 4 = 24. L'aire est de 24 cm².",
      },
      illu: { emoji: "🐟", label: "rivière et poissons" },
    },
    francais: {
      regleTitre: "Les mots invariables",
      regle:
        "Les mots invariables ne changent jamais d'orthographe (toujours, lentement, bientôt, beaucoup…).",
      consigne: "Souligne le mot invariable.",
      items: ["Ti Margo marche toujours.", "Il avance lentement.", "Bientôt, il arrive."],
      correction: "toujours — lentement — bientôt.",
    },
    mot: {
      mot: "Perpendiculaire",
      nature: "adjectif, géométrie",
      definition: "Deux droites perpendiculaires se croisent en formant un angle droit.",
      exemple: "Les deux côtés d'un coin de feuille sont perpendiculaires.",
    },
    geste: {
      titre: "Faire une recherche",
      texte:
        "On tape des mots-clés dans un moteur de recherche pour trouver des informations.",
    },
    defi: {
      enonce: "Quelle fraction représente la moitié ?",
      correction: "1/2.",
    },
  },

  /* ===================== SEMAINE 6 · Le sommet ===================== */
  {
    numero: 26,
    semaine: 6,
    badge: "Souffle du sommet",
    maths: {
      calcul: [
        { q: "8 × 8 =", r: "64" },
        { q: "360 ÷ 6 =", r: "60" },
        { q: "12 × 5 =", r: "60" },
        { q: "3,5 + 6,5 =", r: "10" },
        { q: "1000 − 999 =", r: "1" },
      ],
      probleme: {
        enonce:
          "Pour atteindre le Piton des Neiges (3 070 m), Ti Margo part de 2 500 m. Combien de mètres lui reste-t-il à grimper ?",
        correction: "3 070 − 2 500 = 570. Il reste 570 m.",
      },
      illu: { emoji: "⛰️", label: "sommet enneigé" },
    },
    francais: {
      regleTitre: "Bilan : la nature des mots",
      regle:
        "Chaque mot a une nature : nom, verbe, adjectif, déterminant…",
      consigne: "Donne la nature de chaque mot.",
      items: ["rapide →", "courir →", "montagne →"],
      correction: "rapide → adjectif · courir → verbe · montagne → nom.",
    },
    mot: {
      mot: "Énoncé",
      nature: "nom, méthode",
      definition: "L'énoncé est le texte d'un exercice ou d'un problème : ce qu'on te demande.",
      exemple: "On lit bien l'énoncé avant de répondre.",
    },
    geste: {
      titre: "Un mot de passe solide",
      texte:
        "Un bon mot de passe est long, mélange lettres et chiffres, et ne se devine pas. On ne le partage jamais.",
    },
    defi: {
      enonce: "Quel est le quart de 100 ?",
      correction: "25.",
    },
  },
  {
    numero: 27,
    semaine: 6,
    badge: "Étoile du matin",
    maths: {
      calcul: [
        { q: "9 × 8 =", r: "72" },
        { q: "490 ÷ 7 =", r: "70" },
        { q: "11 × 6 =", r: "66" },
        { q: "2,5 + 2,5 + 5 =", r: "10" },
        { q: "100 − 45 =", r: "55" },
      ],
      probleme: {
        enonce:
          "Au sommet, le lever du soleil est à 6 h 05. Ti Margo se lève 40 min avant. À quelle heure se lève-t-il ?",
        correction: "6 h 05 − 40 min = 5 h 25.",
      },
      illu: { emoji: "🌅", label: "lever de soleil" },
    },
    francais: {
      regleTitre: "Bilan : les accords",
      regle:
        "L'adjectif s'accorde avec le nom en genre et en nombre.",
      consigne: "Accorde l'adjectif.",
      items: ["des margouillats (vert) →", "une étoile (brillant) →"],
      correction: "des margouillats verts — une étoile brillante.",
    },
    mot: {
      mot: "Consigne",
      nature: "nom, méthode",
      definition: "La consigne dit ce qu'il faut faire (souligne, calcule, complète…).",
      exemple: "On repère le verbe de la consigne : « entoure », « écris »…",
    },
    geste: {
      titre: "Un courriel (e-mail)",
      texte:
        "Un courriel est un message envoyé par internet à une adresse (ex. nom@exemple.fr).",
    },
    defi: {
      enonce: "Quel est le périmètre d'un rectangle de 10 cm sur 5 cm ?",
      correction: "30 cm, car 2 × (10 + 5) = 30.",
    },
  },
  {
    numero: 28,
    semaine: 6,
    badge: "Vainqueur des nuages",
    maths: {
      calcul: [
        { q: "7 × 7 =", r: "49" },
        { q: "640 ÷ 8 =", r: "80" },
        { q: "13 × 3 =", r: "39" },
        { q: "4 + 3,5 + 2,5 =", r: "10" },
        { q: "100 − 88 =", r: "12" },
      ],
      probleme: {
        enonce:
          "Ti Margo a mis 3 jours pour monter, en marchant 6 h par jour. Combien d'heures de marche en tout ?",
        correction: "3 × 6 = 18. Il a marché 18 heures.",
      },
      illu: { emoji: "☁️", label: "nuages au sommet" },
    },
    francais: {
      regleTitre: "Bilan : la conjugaison",
      regle:
        "On reconnaît le temps grâce aux indices (hier, aujourd'hui, demain) et aux terminaisons.",
      consigne: "Conjugue le verbe « être ».",
      items: ["je ___ (présent)", "tu ___ (futur)", "il ___ (imparfait)"],
      correction: "je suis — tu seras — il était.",
    },
    mot: {
      mot: "Vérifier",
      nature: "verbe, méthode",
      definition: "Vérifier, c'est relire et contrôler que sa réponse est juste.",
      exemple: "On vérifie un résultat en refaisant le calcul autrement.",
    },
    geste: {
      titre: "Une pièce jointe",
      texte:
        "Une pièce jointe est un fichier (photo, document) ajouté à un courriel.",
    },
    defi: {
      enonce: "Combien font 30 % de 100 ?",
      correction: "30.",
    },
  },
  {
    numero: 29,
    semaine: 6,
    badge: "Presque en 6ᵉ",
    maths: {
      calcul: [
        { q: "8 × 9 =", r: "72" },
        { q: "720 ÷ 9 =", r: "80" },
        { q: "14 × 2 =", r: "28" },
        { q: "6 + 2 + 2 =", r: "10" },
        { q: "100 − 63 =", r: "37" },
      ],
      probleme: {
        enonce:
          "Ti Margo prépare son cartable : 4 cahiers à 2 € et 3 stylos à 1 €. Combien dépense-t-il ?",
        correction: "4 × 2 + 3 × 1 = 8 + 3 = 11. Il dépense 11 €.",
      },
      illu: { emoji: "🎒", label: "cartable" },
    },
    francais: {
      regleTitre: "Bilan : les homophones",
      regle:
        "On choisit le bon homophone en remplaçant : a/avait, à reste, et/et puis, est/était.",
      consigne: "Complète.",
      items: ["Il ___ content (a / à).", "Il va ___ La Réunion (a / à).", "Paul ___ Léa (et / est)."],
      correction: "a (avait) — à — et.",
    },
    mot: {
      mot: "Estimer",
      nature: "verbe, méthode",
      definition: "Estimer, c'est donner un ordre de grandeur sans tout calculer précisément.",
      exemple: "On estime que 98 + 103 ≈ 200.",
    },
    geste: {
      titre: "Se déconnecter",
      texte:
        "On se déconnecte d'un compte quand on a fini, surtout sur un ordinateur partagé.",
    },
    defi: {
      enonce: "Combien de minutes y a-t-il dans 2 heures et demie ?",
      correction: "150 minutes (2 × 60 + 30).",
    },
  },
  {
    numero: 30,
    semaine: 6,
    badge: "Prêt pour la 6ᵉ !",
    maths: {
      calcul: [
        { q: "9 × 9 =", r: "81" },
        { q: "810 ÷ 9 =", r: "90" },
        { q: "15 × 4 =", r: "60" },
        { q: "5 + 3 + 2 =", r: "10" },
        { q: "1000 − 1 =", r: "999" },
      ],
      probleme: {
        enonce:
          "Bravo ! Ti Margo a fait 30 jours de cahier. S'il gagne 10 points par jour, combien de points a-t-il en tout ?",
        correction: "10 × 30 = 300. Il a gagné 300 points !",
      },
      illu: { emoji: "🎓", label: "diplôme de la 6e" },
    },
    francais: {
      regleTitre: "Bilan : sujet et verbe",
      regle:
        "On repère le verbe (l'action), puis le sujet en posant « Qui est-ce qui… ? ».",
      consigne: "Souligne le sujet, entoure le verbe.",
      items: ["Les élèves entrent en 6e.", "Ti Margo a réussi son voyage."],
      correction: "Sujet « Les élèves », verbe « entrent ». Sujet « Ti Margo », verbe « a réussi ».",
    },
    mot: {
      mot: "Réviser",
      nature: "verbe, méthode",
      definition: "Réviser, c'est revoir ce qu'on a appris pour bien s'en souvenir.",
      exemple: "Ce cahier t'a aidé à réviser tout l'été : bravo !",
    },
    geste: {
      titre: "La corbeille",
      texte:
        "On met dans la corbeille les fichiers dont on ne veut plus ; on peut la vider ensuite.",
    },
    defi: {
      enonce: "Dernier défi : quel nombre vient juste après 999 ?",
      correction: "1 000. Tu es prêt(e) pour la 6e !",
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  Défis ★★★★★ (niveau expert) — différenciation pour les élèves rapides /   */
/*  HPI. Un défi plus exigeant par jour, en plus du défi normal.              */
/* -------------------------------------------------------------------------- */

export const defisExpert: Record<number, { enonce: string; correction: string }> = {
  1: {
    enonce:
      "Avec les chiffres 1, 2, 3 et 4 (une seule fois chacun), écris le plus grand nombre possible, puis le plus petit.",
    correction: "Le plus grand : 4 321. Le plus petit : 1 234.",
  },
  2: {
    enonce:
      "Ti Margo a 24 coquillages. Il en donne la moitié à un ami, puis encore 3. Combien lui en reste-t-il ?",
    correction: "24 ÷ 2 = 12, puis 12 − 3 = 9. Il lui reste 9 coquillages.",
  },
  3: {
    enonce: "Quel nombre vient ensuite : 1, 1, 2, 3, 5, 8, … ?",
    correction: "13 : chaque nombre est la somme des deux précédents (5 + 8 = 13).",
  },
  4: {
    enonce:
      "Avec seulement des pièces de 20 centimes et de 10 centimes, comment faire 70 centimes avec exactement 4 pièces ?",
    correction: "Trois pièces de 20 c et une de 10 c : 20 + 20 + 20 + 10 = 70 c.",
  },
  5: {
    enonce:
      "Combien de rectangles (de toutes les tailles) peux-tu voir dans une grille de 2 cases sur 2 ?",
    correction: "9 rectangles en tout (en comptant les carrés et les rectangles plus grands).",
  },
  6: {
    enonce:
      "Ti Margo plante un arbre tous les 5 m, le long d'un sentier de 50 m (un arbre au départ et un à l'arrivée). Combien d'arbres ?",
    correction: "11 arbres : 50 ÷ 5 = 10 intervalles, donc 10 + 1 = 11 arbres.",
  },
  7: {
    enonce:
      "Un escargot grimpe un mur de 10 m. Le jour il monte de 3 m, la nuit il glisse de 2 m. En combien de jours atteint-il le sommet ?",
    correction:
      "8 jours : il gagne 1 m par jour, mais le 8e jour il part de 7 m et monte à 10 m avant de glisser.",
  },
  8: {
    enonce:
      "Je suis un nombre pair, entre 30 et 40, et la somme de mes deux chiffres fait 7. Qui suis-je ?",
    correction: "34 (3 + 4 = 7, et 34 est pair).",
  },
  9: {
    enonce: "Combien de fois écrit-on le chiffre 1 quand on compte de 1 à 20 ?",
    correction:
      "12 fois : 1, 10, 11 (deux fois), 12, 13, 14, 15, 16, 17, 18, 19.",
  },
  10: {
    enonce:
      "3 margouillats attrapent 3 mouches en 3 minutes. Combien de mouches attrapent 9 margouillats en 9 minutes ?",
    correction:
      "27 mouches : un margouillat attrape 1 mouche en 3 min, donc 9 margouillats en 9 min en attrapent 9 × 3 = 27.",
  },
  11: {
    enonce:
      "En montant le volcan, la température baisse de 2 °C tous les 300 m. Au sol il fait 30 °C. Quelle température à 1 500 m ?",
    correction: "20 °C : 1 500 ÷ 300 = 5, donc on perd 5 × 2 = 10 °C ; 30 − 10 = 20 °C.",
  },
  12: {
    enonce:
      "On plie une feuille en deux, puis encore en deux, 4 fois de suite. Combien d'épaisseurs obtient-on ?",
    correction: "16 épaisseurs : 2 × 2 × 2 × 2 = 16.",
  },
  13: {
    enonce: "Trouve deux nombres dont la somme est 10 et le produit 21.",
    correction: "3 et 7 (3 + 7 = 10 et 3 × 7 = 21).",
  },
  14: {
    enonce: "Le double d'un nombre décimal est égal à 7. Quel est ce nombre ?",
    correction: "3,5, car 3,5 × 2 = 7.",
  },
  15: {
    enonce:
      "Combien y a-t-il de nombres avec un seul chiffre après la virgule entre 2 et 3 (de 2,1 à 2,9) ?",
    correction: "9 nombres : 2,1 · 2,2 · 2,3 · 2,4 · 2,5 · 2,6 · 2,7 · 2,8 · 2,9.",
  },
  16: {
    enonce:
      "Pour aller de l'îlet A à l'îlet B, il y a 3 chemins. De B à C, il y a 2 chemins. Combien de trajets différents de A à C ?",
    correction: "6 trajets : 3 × 2 = 6.",
  },
  17: {
    enonce:
      "Un rectangle a un périmètre de 20 cm et une longueur de 6 cm. Quelle est sa largeur ?",
    correction: "4 cm : la moitié du périmètre est 10 ; 10 − 6 = 4 cm.",
  },
  18: {
    enonce:
      "Le sentier fait 8 km. Ti Margo fait une pause tous les 2 km, mais pas à l'arrivée. Combien de pauses ?",
    correction: "3 pauses : aux kilomètres 2, 4 et 6.",
  },
  19: {
    enonce: "Le périmètre d'un carré est 36 cm. Quelle est son aire ?",
    correction: "81 cm² : le côté est 36 ÷ 4 = 9 cm, et 9 × 9 = 81 cm².",
  },
  20: {
    enonce: "Combien y a-t-il de demi-heures dans 3 jours ?",
    correction: "144 : 3 × 24 = 72 heures, et 72 × 2 = 144 demi-heures.",
  },
  21: {
    enonce: "Une cascade laisse tomber 6 litres d'eau par seconde. Combien en 1 minute ?",
    correction: "360 litres : 6 × 60 = 360.",
  },
  22: {
    enonce: "Dans une classe de 25 élèves, 60 % sont des filles. Combien y a-t-il de garçons ?",
    correction: "10 garçons : 40 % de 25 = 25 × 40 / 100 = 10.",
  },
  23: {
    enonce:
      "Un bassin reçoit 5 L d'eau par minute et en perd 2 L par minute en même temps. Combien de litres après 10 minutes ?",
    correction: "30 litres : il gagne 5 − 2 = 3 L par minute, donc 3 × 10 = 30 L.",
  },
  24: {
    enonce:
      "La moyenne de 3 nombres est 10. Deux de ces nombres sont 8 et 9. Quel est le troisième ?",
    correction: "13 : la somme doit faire 3 × 10 = 30, et 30 − 8 − 9 = 13.",
  },
  25: {
    enonce:
      "Un rectangle a une aire de 24 cm² et une longueur de 8 cm. Quel est son périmètre ?",
    correction: "22 cm : la largeur est 24 ÷ 8 = 3 cm, et 2 × (8 + 3) = 22 cm.",
  },
  26: {
    enonce: "Il reste 600 m à grimper, à la vitesse de 200 m par heure. Combien de temps faut-il ?",
    correction: "3 heures : 600 ÷ 200 = 3.",
  },
  27: {
    enonce:
      "Ti Margo monte un escalier en répétant : 2 marches en haut, 1 marche en bas. Après 30 mouvements, sur quelle marche est-il ?",
    correction:
      "Marche 15 : chaque cycle « +2 −1 » fait avancer de 1 marche en 2 mouvements ; 30 mouvements = 15 cycles.",
  },
  28: {
    enonce: "30 % d'un nombre valent 30. Quel est ce nombre ?",
    correction: "100, car 30 % de 100 = 30.",
  },
  29: {
    enonce:
      "Combien de nombres à 2 chiffres peux-tu écrire en utilisant seulement les chiffres 1, 2 et 3 (on peut répéter) ?",
    correction: "9 nombres : 3 choix pour le 1er chiffre × 3 pour le 2e = 9.",
  },
  30: {
    enonce:
      "Ti Margo a fait 30 jours. Les jours pairs il a eu 10/10, les jours impairs 8/10. Combien de points en tout ? (Attention au piège !)",
    correction:
      "270 points : 15 jours pairs × 10 = 150, et 15 jours impairs × 8 = 120 ; 150 + 120 = 270 (et non 300 !).",
  },
};

/* -------------------------------------------------------------------------- */
/*  Le carnet de Ti Margo — fil narratif quotidien (arc Jour 1 → Jour 30).    */
/*  C'est ce qui fait « vivre » le voyage : Ti Margo raconte son étape, et    */
/*  l'élève lui répond dans son propre encadré « Mon carnet de voyage ».      */
/* -------------------------------------------------------------------------- */

export const carnet: Record<number, string> = {
  1: "Mon sac est prêt, mes crayons aussi ! Aujourd'hui, je quitte le lagon de l'Hermitage : le grand voyage vers la 6ᵉ commence. En route !",
  2: "Sur la plage, je compte mes provisions avant de partir. Bien calculer, c'est déjà voyager malin !",
  3: "Le soleil se lève sur le lagon. Je note tout dans mon carnet : un bon explorateur n'oublie rien.",
  4: "Dernier jour au bord de l'eau. Je vérifie ma carte : demain, je quitte la côte pour les hauteurs.",
  5: "Première étape réussie ! Je dis au revoir au lagon. Là-haut, une grande forêt m'attend… Tu me suis ?",
  6: "J'entre dans la forêt de Bélouve. Les tamarins sont immenses et le sentier serpente. Avançons pas à pas !",
  7: "Je cueille quelques goyaviers pour la route. Dans la forêt, il faut compter ses pas pour ne pas se perdre.",
  8: "La brume descend entre les arbres. Je marche depuis des heures : les maths m'aident à mesurer le temps.",
  9: "J'entends des oiseaux que je ne connais pas. J'ouvre l'œil… et mon carnet : chaque détail compte.",
  10: "Je sors enfin de la forêt. Au loin, une montagne fume… un volcan ! Demain, l'ascension commence.",
  11: "Me voici au pied du Piton de la Fournaise. La pente est raide, mais je grimpe : un calcul après l'autre !",
  12: "L'air se rafraîchit en montant. Je note les températures : c'est fou comme ça change avec l'altitude.",
  13: "Le sol est noir, couvert de lave refroidie. Je partage mon eau et j'avance prudemment vers le cratère.",
  14: "Mes chaussures sont pleines de cendre ! Encore un effort : le sommet du volcan approche.",
  15: "J'ai atteint le cratère ! Quelle vue ! Mais le voyage continue : un grand cirque sauvage m'attend, Mafate.",
  16: "J'arrive à Mafate. Ici, aucune route : on se déplace seulement à pied, d'îlet en îlet. L'aventure, la vraie !",
  17: "Je traverse un champ avant le prochain îlet. Mesurer les distances, c'est vital quand on marche tout le temps.",
  18: "Ma boussole m'indique le chemin. Je fais mes comptes : il me reste des provisions à acheter au village.",
  19: "Ma gourde se vide vite sous le soleil. Je gère mon eau goutte à goutte : un randonneur prévoyant va loin.",
  20: "Dernier îlet de Mafate ! Je suis fier du chemin parcouru. Bientôt, j'entendrai gronder les cascades…",
  21: "J'arrive près du Trou de Fer : des cascades vertigineuses tombent dans le vide. Prudence et calcul !",
  22: "L'eau coule de partout. Je calcule les hauteurs : certaines chutes font plus de 200 mètres !",
  23: "Je remplis ma gourde dans un bassin clair. L'eau, c'est la vie du voyageur : j'en mesure chaque litre.",
  24: "Je traverse un pont au-dessus des chutes. Pas le droit à l'erreur : je vérifie tout, comme un bon mathématicien.",
  25: "Je quitte les cascades, le cœur léger. Devant moi se dresse le plus haut sommet de l'île : le Piton des Neiges.",
  26: "Dernière étape ! Je commence l'ascension du Piton des Neiges. Le souffle est court, mais le but est proche.",
  27: "Je me lève avant le jour pour voir le lever du soleil du sommet. Il faut bien calculer son heure de réveil !",
  28: "Je marche dans les nuages. Plus que quelques mètres… Je compte mes pas pour me donner du courage.",
  29: "J'aperçois le sommet ! Je prépare déjà mon cartable : la 6ᵉ, c'est pour très bientôt. Encore un effort !",
  30: "Ça y est : j'ai atteint le sommet du Piton des Neiges, tout en haut de l'île, et je suis prêt pour la 6ᵉ ! Bravo à toi qui m'as suivi : on a réussi le voyage ensemble !",
};

/* -------------------------------------------------------------------------- */
/*  « Le savais-tu ? » — une ligne culturelle par jour, qui alterne ancrage   */
/*  local (🌺 La Réunion) et ouverture sur le monde (🌍). Enracine le cahier  */
/*  ET ouvre une fenêtre sur le monde, au fil du voyage de Ti Margo.          */
/* -------------------------------------------------------------------------- */

export const leSaviasTu: Record<number, { portee: "local" | "monde"; texte: string }> = {
  1: { portee: "local", texte: "Le margouillat, comme Ti Margo, est un petit lézard très commun à La Réunion : on le voit souvent sur les murs des maisons !" },
  2: { portee: "monde", texte: "La Réunion est une île de l'océan Indien, à plus de 9 000 km de la France métropole." },
  3: { portee: "local", texte: "Au bord du lagon de l'Hermitage vivent des poissons multicolores, protégés dans une réserve marine." },
  4: { portee: "monde", texte: "Les chiffres que tu utilises (1, 2, 3…) sont nés en Inde il y a très longtemps, puis ont voyagé dans le monde entier." },
  5: { portee: "local", texte: "En créole réunionnais, les enfants se disent « la marmaille »." },
  6: { portee: "monde", texte: "À Madagascar, l'île voisine, vivent les lémuriens, des animaux qu'on ne trouve nulle part ailleurs." },
  7: { portee: "local", texte: "Le tec-tec est un petit oiseau de La Réunion, curieux et pas farouche : il s'approche des promeneurs." },
  8: { portee: "monde", texte: "Partout dans le monde, une heure dure 60 minutes : c'est une mesure que tous les pays partagent." },
  9: { portee: "local", texte: "Le paille-en-queue est un oiseau blanc à longue plume, emblème des falaises réunionnaises." },
  10: { portee: "monde", texte: "Sur l'île vivent ensemble des familles venues d'Afrique, d'Inde, de Chine, d'Europe et de Madagascar." },
  11: { portee: "local", texte: "Le Piton de la Fournaise est l'un des volcans les plus actifs du monde : il entre en éruption presque chaque année." },
  12: { portee: "monde", texte: "Il existe des volcans sur tous les continents, et même sur d'autres planètes : le plus grand est sur Mars !" },
  13: { portee: "local", texte: "La lave refroidie forme une roche noire ; on en retrouve même sur certaines plages de sable noir." },
  14: { portee: "monde", texte: "Le mot « volcan » vient de Vulcain, le dieu romain du feu et des forges." },
  15: { portee: "local", texte: "Depuis les hauteurs du volcan, on aperçoit parfois la mer des deux côtés de l'île." },
  16: { portee: "monde", texte: "Mafate ne se visite qu'à pied ou en hélicoptère : aucune route, comme dans certaines vallées de l'Himalaya." },
  17: { portee: "local", texte: "Les habitants de Mafate, les Mafatais, reçoivent souvent leur ravitaillement par les airs." },
  18: { portee: "monde", texte: "Une boussole indique le Nord partout sur la Terre, grâce au champ magnétique de la planète." },
  19: { portee: "local", texte: "Le nom « Mafate » viendrait d'un chef « marron », un esclave en fuite qui s'y était réfugié." },
  20: { portee: "monde", texte: "Marcher reste, partout dans le monde, le plus ancien moyen de voyager des êtres humains." },
  21: { portee: "local", texte: "Au Trou de Fer, plusieurs cascades plongent de plus de 200 mètres : un site presque unique au monde." },
  22: { portee: "monde", texte: "La plus haute cascade du monde, le Salto Ángel, est au Venezuela : près de 1 000 mètres de chute !" },
  23: { portee: "local", texte: "L'eau des cascades alimente les rivières, puis les champs de canne à sucre de l'île." },
  24: { portee: "monde", texte: "L'eau voyage : celle d'une cascade réunionnaise pourrait un jour s'évaporer et retomber en pluie ailleurs." },
  25: { portee: "local", texte: "Beaucoup de cascades portent des noms créoles ; on les appelle « bassins » quand on peut s'y baigner." },
  26: { portee: "monde", texte: "Le Piton des Neiges culmine à 3 070 m : c'est le plus haut sommet de tout l'océan Indien." },
  27: { portee: "local", texte: "Son nom vient du gel qui blanchit parfois son sommet au petit matin, chose rare sous les tropiques !" },
  28: { portee: "monde", texte: "Du sommet, par temps clair, on devine l'île Maurice à l'horizon, à environ 200 km." },
  29: { portee: "local", texte: "La Réunion est française et européenne, tout en étant près de l'Afrique : un pont entre les mondes." },
  30: { portee: "monde", texte: "Entrer en 6ᵉ, c'est comme atteindre un sommet : une nouvelle vue s'ouvre… sur le monde entier. Bon voyage !" },
};
