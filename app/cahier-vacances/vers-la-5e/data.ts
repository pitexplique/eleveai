/* -------------------------------------------------------------------------- */
/*  Données du cahier de vacances « En route vers la 5e » (6e → 5e).           */
/*  Fil conducteur : le tour de l'océan Indien de Ti Margo — une traversée en  */
/*  voilier, d'île en île (Réunion, Maurice, Rodrigues, Seychelles,           */
/*  Madagascar, Mayotte), qui ouvre sur le monde, comme la 5e.                 */
/*  Niveau 6e : révision + avant-goût de la 5e. 1 objet `jour` = 1 page.       */
/*  ⚠️ Défis ★★★★★ pensés pour les élèves HPI : raisonnement, énigmes,        */
/*     suites, dénombrement — pas seulement « plus de calculs ».               */
/*  Moteur d'affichage commun : components/cahier/CahierVacances.tsx.          */
/* -------------------------------------------------------------------------- */

import type { Etape, Jour } from "@/components/cahier/types";

/** Les 6 étapes du tour de l'océan Indien (une île par semaine). */
export const parcours: Etape[] = [
  { semaine: 1, etape: 1, emoji: "⛵", lieu: "La Réunion, le grand départ", intro: "Ti Margo prend la mer : direction les îles de l'océan Indien !" },
  { semaine: 2, etape: 2, emoji: "🏝️", lieu: "L'île Maurice", intro: "Cap sur l'île voisine, ses marchés et ses lagons." },
  { semaine: 3, etape: 3, emoji: "🐢", lieu: "Rodrigues", intro: "Une petite île paisible, royaume des tortues géantes." },
  { semaine: 4, etape: 4, emoji: "🥥", lieu: "Les Seychelles", intro: "Plages de granit, eau turquoise et jardins de coraux." },
  { semaine: 5, etape: 5, emoji: "🌳", lieu: "Madagascar", intro: "La grande île aux lémuriens, à la vanille et aux baobabs." },
  { semaine: 6, etape: 6, emoji: "🐋", lieu: "Mayotte, le grand lagon", intro: "Dernière escale, puis retour : la 5e t'attend !" },
];

export const jours: Jour[] = [
  /* ===================== SEMAINE 1 · La Réunion, le grand départ ===================== */
  {
    numero: 1,
    semaine: 1,
    badge: "Capitaine en herbe",
    maths: {
      calcul: [
        { q: "12,5 + 7,5 =", r: "20" },
        { q: "6 × 2,5 =", r: "15" },
        { q: "3 × 4 + 2 =", r: "14" },
        { q: "100 − 37,5 =", r: "62,5" },
        { q: "7 × 9 =", r: "63" },
      ],
      probleme: {
        enonce: "Pour le grand départ, Ti Margo achète 3 cordages à 12,50 € chacun. Combien paie-t-il ?",
        correction: "3 × 12,50 = 37,50. Il paie 37,50 €.",
      },
      illu: { emoji: "⛵", label: "voilier" },
    },
    francais: {
      regleTitre: "Les classes de mots",
      regle:
        "Chaque mot appartient à une classe : nom, verbe, adjectif, déterminant, pronom… Les reconnaître aide à bien écrire.",
      consigne: "Donne la classe de chaque mot entre parenthèses.",
      items: ["(le) bateau", "il (navigue)", "un (grand) voyage"],
      correction: "le → déterminant ; navigue → verbe ; grand → adjectif.",
    },
    mot: {
      mot: "Quotient",
      nature: "nom, maths",
      definition: "Le quotient, c'est le résultat d'une division.",
      exemple: "Le quotient de 20 par 4 est 5.",
    },
    geste: {
      titre: "Une recherche efficace",
      texte: "Pour trouver vite, on tape des mots-clés précis plutôt qu'une longue phrase.",
    },
    defi: {
      enonce: "Je suis un nombre pair entre 10 et 20, multiple de 3. Qui suis-je ?",
      correction: "12 ou 18.",
    },
  },
  {
    numero: 2,
    semaine: 1,
    badge: "Lecteur d'étoiles",
    maths: {
      calcul: [
        { q: "48 ÷ 6 =", r: "8" },
        { q: "9 × 8 =", r: "72" },
        { q: "2,5 × 4 =", r: "10" },
        { q: "moitié de 90 =", r: "45" },
        { q: "60 − 24 =", r: "36" },
      ],
      probleme: {
        enonce: "Ti Margo partage 72 biscuits en parts égales pour 6 jours de mer. Combien par jour ?",
        correction: "72 ÷ 6 = 12. Douze biscuits par jour.",
      },
      illu: { emoji: "⭐", label: "étoiles" },
    },
    francais: {
      regleTitre: "Sujet et verbe : l'accord",
      regle:
        "Le verbe s'accorde avec son sujet. On le trouve en posant « Qui est-ce qui… ? » devant le verbe.",
      consigne: "Accorde le verbe au présent.",
      items: ["Les marins (préparer) le bateau.", "Ti Margo (regarder) la mer.", "Nous (lever) l'ancre."],
      correction: "préparent — regarde — levons.",
    },
    mot: {
      mot: "Diviseur",
      nature: "nom, maths",
      definition: "Un diviseur d'un nombre le divise sans laisser de reste.",
      exemple: "6 est un diviseur de 18, car 18 ÷ 6 = 3.",
    },
    geste: {
      titre: "Évaluer une source",
      texte: "Avant de croire un site, on regarde qui l'a écrit, quand, et si d'autres sites disent la même chose.",
    },
    defi: {
      enonce: "Trouve tous les diviseurs de 12.",
      correction: "1, 2, 3, 4, 6 et 12.",
    },
  },
  {
    numero: 3,
    semaine: 1,
    badge: "Ami des dauphins",
    maths: {
      calcul: [
        { q: "1/2 de 50 =", r: "25" },
        { q: "1/4 de 100 =", r: "25" },
        { q: "3/4 de 20 =", r: "15" },
        { q: "7 × 6 =", r: "42" },
        { q: "0,5 × 8 =", r: "4" },
      ],
      probleme: {
        enonce: "Un banc compte 40 dauphins ; les 3/4 plongent ensemble. Combien plongent ?",
        correction: "3/4 de 40 = 30. Trente dauphins plongent.",
      },
      illu: { emoji: "🐬", label: "dauphins" },
    },
    francais: {
      regleTitre: "Le COD (complément d'objet direct)",
      regle:
        "Le COD complète le verbe sans préposition. On le trouve avec « qui ? » ou « quoi ? » après le verbe.",
      consigne: "Souligne le COD de chaque phrase.",
      items: ["Ti Margo observe les dauphins.", "Le marin hisse la voile.", "J'écris mon journal."],
      correction: "les dauphins — la voile — mon journal.",
    },
    mot: {
      mot: "Numérateur",
      nature: "nom, maths",
      definition: "Dans une fraction, le numérateur est le nombre du haut.",
      exemple: "Dans 3/4, le numérateur est 3.",
    },
    geste: {
      titre: "Le tableur : une cellule",
      texte: "Dans un tableur, chaque case s'appelle une cellule, repérée par sa colonne (A) et sa ligne (2) : A2.",
    },
    defi: {
      enonce: "Quelle fraction de l'heure représentent 15 minutes ?",
      correction: "1/4 d'heure (15 sur 60).",
    },
  },
  {
    numero: 4,
    semaine: 1,
    badge: "Géomètre des mers",
    maths: {
      calcul: [
        { q: "8 × 5 =", r: "40" },
        { q: "périmètre carré de 6 :", r: "24" },
        { q: "12 × 11 =", r: "132" },
        { q: "144 ÷ 12 =", r: "12" },
        { q: "9 × 9 =", r: "81" },
      ],
      probleme: {
        enonce: "Le pont du bateau est un rectangle de 8 m sur 5 m. Quelle est son aire ?",
        correction: "8 × 5 = 40. Son aire est 40 m².",
      },
      illu: { emoji: "📐", label: "équerre" },
    },
    francais: {
      regleTitre: "Les compléments circonstanciels",
      regle:
        "Le complément circonstanciel précise le temps, le lieu ou la manière. On peut souvent le déplacer ou le supprimer.",
      consigne: "Indique : temps, lieu ou manière ?",
      items: ["Au lever du jour, on part.", "Le bateau avance lentement.", "Sur le pont, Ti Margo lit."],
      correction: "temps — manière — lieu.",
    },
    mot: {
      mot: "Aire",
      nature: "nom, maths",
      definition: "L'aire mesure la surface d'une figure, en unités carrées (cm², m²).",
      exemple: "Aire d'un rectangle = longueur × largeur.",
    },
    geste: {
      titre: "Une formule dans le tableur",
      texte: "On écrit =A1+A2 pour additionner deux cellules : le tableur calcule tout seul.",
    },
    defi: {
      enonce: "Un rectangle a une aire de 24 et une longueur de 6. Quelle est sa largeur ?",
      correction: "4, car 6 × 4 = 24.",
    },
  },
  {
    numero: 5,
    semaine: 1,
    badge: "Cap sur Maurice",
    maths: {
      calcul: [
        { q: "10 % de 200 =", r: "20" },
        { q: "50 % de 80 =", r: "40" },
        { q: "25 % de 40 =", r: "10" },
        { q: "8 × 7 =", r: "56" },
        { q: "1000 − 250 =", r: "750" },
      ],
      probleme: {
        enonce: "Une carte marine coûte 40 €, soldée à −25 %. Quel est son nouveau prix ?",
        correction: "25 % de 40 = 10 ; 40 − 10 = 30. Elle coûte 30 €.",
      },
      illu: { emoji: "🗺️", label: "carte marine" },
    },
    francais: {
      regleTitre: "Le présent de l'indicatif",
      regle:
        "Au présent, on conjugue selon le groupe. 1er groupe (-er) : -e, -es, -e, -ons, -ez, -ent.",
      consigne: "Conjugue au présent.",
      items: ["finir : nous …", "aller : tu …", "prendre : ils …"],
      correction: "nous finissons — tu vas — ils prennent.",
    },
    mot: {
      mot: "Pourcentage",
      nature: "nom, maths",
      definition: "Un pourcentage est une fraction sur 100. 25 % = 25/100 = un quart.",
      exemple: "25 % de 40, c'est 10.",
    },
    geste: {
      titre: "Le traitement de texte (gras, italique)",
      texte: "On met un mot en gras pour le faire ressortir, en italique pour une citation ou un titre.",
    },
    defi: {
      enonce: "30 % des 50 élèves font de la voile. Combien d'élèves ?",
      correction: "15 élèves (30 % de 50).",
    },
  },

  /* ===================== SEMAINE 2 · L'île Maurice ===================== */
  {
    numero: 6,
    semaine: 2,
    badge: "Découvreur de Maurice",
    maths: {
      calcul: [
        { q: "2,5 × 4 =", r: "10" },
        { q: "1,2 × 3 =", r: "3,6" },
        { q: "0,25 × 8 =", r: "2" },
        { q: "7 × 8 =", r: "56" },
        { q: "63 ÷ 9 =", r: "7" },
      ],
      probleme: {
        enonce: "Au marché de Port-Louis, les mangues coûtent 1,20 € pièce. Combien pour 4 mangues ?",
        correction: "4 × 1,20 = 4,80. Il paie 4,80 €.",
      },
      illu: { emoji: "🥭", label: "mangues" },
    },
    francais: {
      regleTitre: "L'imparfait",
      regle:
        "L'imparfait décrit le passé qui dure. Terminaisons : -ais, -ais, -ait, -ions, -iez, -aient.",
      consigne: "Conjugue à l'imparfait.",
      items: ["regarder : je …", "finir : nous …", "être : il …"],
      correction: "je regardais — nous finissions — il était.",
    },
    mot: {
      mot: "Décimal",
      nature: "adjectif, maths",
      definition: "Un nombre décimal a une partie après la virgule.",
      exemple: "3,5 et 0,25 sont des nombres décimaux.",
    },
    geste: {
      titre: "Aligner et mettre en forme",
      texte: "On peut centrer un titre, justifier un paragraphe : la mise en forme rend un texte clair et agréable.",
    },
    defi: {
      enonce: "Combien de centimes dans 4,80 € ?",
      correction: "480 centimes.",
    },
  },
  {
    numero: 7,
    semaine: 2,
    badge: "Goûteur de saveurs",
    maths: {
      calcul: [
        { q: "7,5 ÷ 3 =", r: "2,5" },
        { q: "12,4 ÷ 4 =", r: "3,1" },
        { q: "9 × 11 =", r: "99" },
        { q: "1/2 + 1/2 =", r: "1" },
        { q: "100 − 49 =", r: "51" },
      ],
      probleme: {
        enonce: "Ti Margo partage 7,5 L de jus dans 3 gourdes égales. Combien par gourde ?",
        correction: "7,5 ÷ 3 = 2,5. Deux litres et demi par gourde.",
      },
      illu: { emoji: "🍹", label: "jus de fruits" },
    },
    francais: {
      regleTitre: "Le passé composé",
      regle:
        "Passé composé = auxiliaire (être ou avoir) au présent + participe passé.",
      consigne: "Conjugue au passé composé.",
      items: ["manger : j'…", "partir : elle …", "voir : nous …"],
      correction: "j'ai mangé — elle est partie — nous avons vu.",
    },
    mot: {
      mot: "Reste",
      nature: "nom, maths",
      definition: "Dans une division, le reste est ce qui ne se partage pas.",
      exemple: "17 ÷ 5 = 3 reste 2.",
    },
    geste: {
      titre: "Ctrl + F (rechercher)",
      texte: "Ctrl + F ouvre une barre pour trouver un mot dans une page : pratique dans un long texte.",
    },
    defi: {
      enonce: "17 bonbons partagés entre 5 amis : combien chacun, et combien restent ?",
      correction: "3 chacun, et il en reste 2.",
    },
  },
  {
    numero: 8,
    semaine: 2,
    badge: "Bâtisseur du lagon",
    maths: {
      calcul: [
        { q: "4 × 2,5 =", r: "10" },
        { q: "double de 7 =", r: "14" },
        { q: "8 × 9 =", r: "72" },
        { q: "1/4 + 1/4 =", r: "1/2" },
        { q: "200 ÷ 8 =", r: "25" },
      ],
      probleme: {
        enonce: "Pour 4 personnes, une recette demande 6 œufs. Combien d'œufs pour 8 personnes ?",
        correction: "8, c'est le double de 4, donc 2 × 6 = 12 œufs.",
      },
      illu: { emoji: "🥥", label: "noix de coco" },
    },
    francais: {
      regleTitre: "Le futur simple",
      regle: "Au futur, on ajoute au verbe : -ai, -as, -a, -ons, -ez, -ont.",
      consigne: "Conjugue au futur.",
      items: ["voyager : je …", "finir : tu …", "être : nous …"],
      correction: "je voyagerai — tu finiras — nous serons.",
    },
    mot: {
      mot: "Proportionnel",
      nature: "adjectif, maths",
      definition: "Deux grandeurs sont proportionnelles si on passe de l'une à l'autre en multipliant par un même nombre.",
      exemple: "Le prix est proportionnel au nombre de fruits.",
    },
    geste: {
      titre: "Ctrl + A (tout sélectionner)",
      texte: "Ctrl + A sélectionne tout d'un coup, pour copier ou mettre en forme rapidement.",
    },
    defi: {
      enonce: "Si 3 carnets coûtent 6 €, combien coûtent 9 carnets ?",
      correction: "18 € (3 fois plus).",
    },
  },
  {
    numero: 9,
    semaine: 2,
    badge: "Arpenteur d'angles",
    maths: {
      calcul: [
        { q: "90 − 35 =", r: "55" },
        { q: "180 − 110 =", r: "70" },
        { q: "45 + 45 =", r: "90" },
        { q: "6 × 7 =", r: "42" },
        { q: "12 × 12 =", r: "144" },
      ],
      probleme: {
        enonce: "Deux angles d'un triangle mesurent 60° et 80°. Combien mesure le troisième ?",
        correction: "180 − (60 + 80) = 40. Le troisième angle mesure 40°.",
      },
      illu: { emoji: "📐", label: "rapporteur" },
    },
    francais: {
      regleTitre: "Le passé simple (3e personne)",
      regle:
        "Le passé simple raconte les actions courtes du passé, surtout à l'écrit : il marcha, ils marchèrent.",
      consigne: "Conjugue à la 3e personne du passé simple.",
      items: ["arriver : il …", "finir : elle …", "prendre : ils …"],
      correction: "il arriva — elle finit — ils prirent.",
    },
    mot: {
      mot: "Angle",
      nature: "nom, maths",
      definition: "Un angle mesure l'ouverture entre deux demi-droites, en degrés (°).",
      exemple: "Un angle droit mesure 90°.",
    },
    geste: {
      titre: "Insérer une image",
      texte: "On peut ajouter une image dans un document (Insertion → Image), puis la redimensionner.",
    },
    defi: {
      enonce: "Un triangle a deux angles de 50°. Combien mesure le troisième ?",
      correction: "80° (180 − 100).",
    },
  },
  {
    numero: 10,
    semaine: 2,
    badge: "Cap sur Rodrigues",
    maths: {
      calcul: [
        { q: "8 × 8 =", r: "64" },
        { q: "0,1 × 50 =", r: "5" },
        { q: "150 ÷ 6 =", r: "25" },
        { q: "99 + 99 =", r: "198" },
        { q: "1/2 de 1/2 =", r: "1/4" },
      ],
      probleme: {
        enonce: "Un papillon est posé sur un axe de symétrie ; son aile gauche a 12 taches. Combien sur l'aile droite ?",
        correction: "12 taches : la symétrie conserve les longueurs et les nombres.",
      },
      illu: { emoji: "🦋", label: "papillon" },
    },
    francais: {
      regleTitre: "L'accord du participe passé avec être",
      regle: "Avec l'auxiliaire être, le participe passé s'accorde avec le sujet.",
      consigne: "Accorde le participe passé.",
      items: ["Elle est (parti).", "Ils sont (arrivé).", "Nous sommes (rentré)."],
      correction: "partie — arrivés — rentrés.",
    },
    mot: {
      mot: "Axe de symétrie",
      nature: "nom, maths",
      definition: "Un axe de symétrie partage une figure en deux moitiés qui se superposent par pliage.",
      exemple: "Le carré a 4 axes de symétrie.",
    },
    geste: {
      titre: "Les formats de fichier",
      texte: "Une image est en .jpg ou .png, un document en .pdf, une vidéo en .mp4 : l'extension dit le type.",
    },
    defi: {
      enonce: "Combien d'axes de symétrie a un rectangle (qui n'est pas un carré) ?",
      correction: "2 axes.",
    },
  },

  /* ===================== SEMAINE 3 · Rodrigues ===================== */
  {
    numero: 11,
    semaine: 3,
    badge: "Ami des tortues géantes",
    maths: {
      calcul: [
        { q: "1/4 + 1/4 =", r: "1/2" },
        { q: "2/5 + 1/5 =", r: "3/5" },
        { q: "3/8 + 2/8 =", r: "5/8" },
        { q: "7 × 12 =", r: "84" },
        { q: "0,5 + 0,25 =", r: "0,75" },
      ],
      probleme: {
        enonce: "Ti Margo marche 3/8 du sentier le matin et 2/8 l'après-midi. Quelle fraction a-t-il parcourue ?",
        correction: "3/8 + 2/8 = 5/8 du sentier.",
      },
      illu: { emoji: "🐢", label: "tortue géante" },
    },
    francais: {
      regleTitre: "a ou à / et ou est",
      regle:
        "« a » et « est » sont des verbes (avoir, être) ; « à » et « et » sont de petits mots invariables (lieu/but, liaison).",
      consigne: "Complète.",
      items: ["Ti Margo … arrivé (a/à).", "Il va … Rodrigues (a/à).", "La tortue … énorme (et/est)."],
      correction: "a — à — est.",
    },
    mot: {
      mot: "Fraction",
      nature: "nom, maths",
      definition: "Une fraction partage une unité en parts égales : 3/8 = 3 parts sur 8.",
      exemple: "Une pizza coupée en 8 ; j'en mange 3 : 3/8.",
    },
    geste: {
      titre: "Compresser un dossier (.zip)",
      texte: "On range plusieurs fichiers dans un dossier .zip pour les envoyer plus facilement.",
    },
    defi: {
      enonce: "Combien font 2/8 + 3/8 + 1/8 ?",
      correction: "6/8, c'est-à-dire 3/4.",
    },
  },
  {
    numero: 12,
    semaine: 3,
    badge: "Maître du calcul",
    maths: {
      calcul: [
        { q: "2 + 3 × 4 =", r: "14" },
        { q: "(2 + 3) × 4 =", r: "20" },
        { q: "20 − 4 × 3 =", r: "8" },
        { q: "10 + 10 ÷ 2 =", r: "15" },
        { q: "(8 − 3) × 2 =", r: "10" },
      ],
      probleme: {
        enonce: "Ti Margo achète 2 cartes à 3 € et 1 carnet à 4 €. Écris le calcul et donne le total.",
        correction: "2 × 3 + 4 = 6 + 4 = 10. Il paie 10 €.",
      },
      illu: { emoji: "🧮", label: "calcul" },
    },
    francais: {
      regleTitre: "on ou ont / son ou sont",
      regle:
        "« on » est un sujet (= il) ; « ont » est le verbe avoir. « son » montre à qui c'est ; « sont » est le verbe être.",
      consigne: "Complète.",
      items: ["… part en mer (on/ont).", "Ils … faim (on/ont).", "Les voiles … hautes (son/sont)."],
      correction: "On — ont — sont.",
    },
    mot: {
      mot: "Priorité",
      nature: "nom, maths",
      definition: "Dans un calcul, on fait d'abord les parenthèses, puis × et ÷, enfin + et −.",
      exemple: "2 + 3 × 4 = 2 + 12 = 14.",
    },
    geste: {
      titre: "Sauvegarder dans le cloud",
      texte: "Le cloud garde tes fichiers en ligne : tu les retrouves depuis n'importe quel appareil.",
    },
    defi: {
      enonce: "Calcule 5 + 2 × (3 + 1).",
      correction: "13 (3 + 1 = 4 ; 2 × 4 = 8 ; 5 + 8 = 13).",
    },
  },
  {
    numero: 13,
    semaine: 3,
    badge: "Sculpteur de triangles",
    maths: {
      calcul: [
        { q: "6 × 4 ÷ 2 =", r: "12" },
        { q: "10 × 8 ÷ 2 =", r: "40" },
        { q: "7 × 8 =", r: "56" },
        { q: "1/2 × 12 =", r: "6" },
        { q: "121 ÷ 11 =", r: "11" },
      ],
      probleme: {
        enonce: "Une voile triangulaire a une base de 6 m et une hauteur de 4 m. Quelle est son aire ?",
        correction: "6 × 4 ÷ 2 = 12. Son aire est 12 m².",
      },
      illu: { emoji: "⛵", label: "voile" },
    },
    francais: {
      regleTitre: "ce ou se / ces ou ses",
      regle:
        "« ce » montre (ce bateau) ; « se » se place devant un verbe (il se lave). « ces » = ces choses-là ; « ses » = les siens.",
      consigne: "Complète.",
      items: ["… matin, on part (ce/se).", "Il … repose (ce/se).", "… amis sont là (ces/ses)."],
      correction: "Ce — se — Ces (ou Ses selon le sens).",
    },
    mot: {
      mot: "Hauteur",
      nature: "nom, maths",
      definition: "La hauteur d'un triangle part d'un sommet et tombe perpendiculairement sur le côté opposé.",
      exemple: "Aire d'un triangle = base × hauteur ÷ 2.",
    },
    geste: {
      titre: "Ton identité numérique",
      texte: "Tout ce que tu publies (photos, messages) laisse une trace : c'est ton identité numérique.",
    },
    defi: {
      enonce: "Aire d'un triangle de base 10 et de hauteur 6 ?",
      correction: "30 (10 × 6 ÷ 2).",
    },
  },
  {
    numero: 14,
    semaine: 3,
    badge: "Maître des mesures",
    maths: {
      calcul: [
        { q: "2,5 m = ? cm", r: "250" },
        { q: "3 km = ? m", r: "3000" },
        { q: "2 kg = ? g", r: "2000" },
        { q: "1,5 L = ? mL", r: "1500" },
        { q: "250 cm = ? m", r: "2,5" },
      ],
      probleme: {
        enonce: "Ti Margo a une corde de 2,5 m. Combien lui manque-t-il pour atteindre 4 m ?",
        correction: "4 − 2,5 = 1,5. Il lui manque 1,5 m (150 cm).",
      },
      illu: { emoji: "📏", label: "règle" },
    },
    francais: {
      regleTitre: "ou ou où / la, là, l'a",
      regle:
        "« ou » = ou bien ; « où » indique le lieu. « la » = déterminant ; « là » = lieu/temps ; « l'a » = le/la + a.",
      consigne: "Complète.",
      items: ["Tu viens … tu restes ? (ou/où)", "L'île … il va (ou/où)", "Il … vue (la/là/l'a)"],
      correction: "ou — où — l'a.",
    },
    mot: {
      mot: "Conversion",
      nature: "nom, maths",
      definition: "Convertir, c'est changer d'unité sans changer la quantité.",
      exemple: "2,5 km = 2 500 m.",
    },
    geste: {
      titre: "Le droit à l'image",
      texte: "Avant de publier la photo de quelqu'un, on doit lui demander son accord.",
    },
    defi: {
      enonce: "Combien de mètres dans 3,2 km ?",
      correction: "3 200 m.",
    },
  },
  {
    numero: 15,
    semaine: 3,
    badge: "Cap sur les Seychelles",
    maths: {
      calcul: [
        { q: "60 min = ? h", r: "1" },
        { q: "90 min = ? h ? min", r: "1 h 30" },
        { q: "2 h = ? min", r: "120" },
        { q: "45 min + 30 min =", r: "1 h 15" },
        { q: "120 ÷ 4 =", r: "30" },
      ],
      probleme: {
        enonce: "La traversée part à 9 h 45 et dure 2 h 30. À quelle heure arrive-t-elle ?",
        correction: "9 h 45 + 2 h 30 = 12 h 15.",
      },
      illu: { emoji: "⏱️", label: "chronomètre" },
    },
    francais: {
      regleTitre: "c'est ou s'est",
      regle: "« c'est » = cela est ; « s'est » accompagne un verbe pronominal (il s'est lavé).",
      consigne: "Complète.",
      items: ["… une belle île (c'est/s'est).", "Il … perdu (c'est/s'est).", "… loin d'ici (c'est/s'est)."],
      correction: "C'est — s'est — C'est.",
    },
    mot: {
      mot: "Durée",
      nature: "nom, maths",
      definition: "La durée est le temps écoulé entre un début et une fin.",
      exemple: "De 9 h à 11 h, la durée est de 2 heures.",
    },
    geste: {
      titre: "Le cyberharcèlement",
      texte: "Si quelqu'un est harcelé en ligne, on n'en rit pas, on ne relaie pas : on en parle à un adulte.",
    },
    defi: {
      enonce: "Un film commence à 14 h 20 et dure 1 h 50. Quand finit-il ?",
      correction: "16 h 10.",
    },
  },

  /* ===================== SEMAINE 4 · Les Seychelles ===================== */
  {
    numero: 16,
    semaine: 4,
    badge: "Explorateur des coraux",
    maths: {
      calcul: [
        { q: "5 − 8 =", r: "−3" },
        { q: "−2 + 5 =", r: "3" },
        { q: "0 − 4 =", r: "−4" },
        { q: "−5 + 5 =", r: "0" },
        { q: "3 − 7 =", r: "−4" },
      ],
      probleme: {
        enonce: "Au petit matin, il fait 3 °C. La température baisse de 5 °C. Quelle température fait-il alors ?",
        correction: "3 − 5 = −2. Il fait −2 °C.",
      },
      illu: { emoji: "🪸", label: "corail" },
    },
    francais: {
      regleTitre: "Les types de phrases",
      regle: "Déclarative (.), interrogative ( ?), exclamative ( !), injonctive (un ordre).",
      consigne: "Donne le type de chaque phrase.",
      items: ["Quelle eau claire !", "Plonges-tu avec moi ?", "Mets ton masque."],
      correction: "exclamative — interrogative — injonctive.",
    },
    mot: {
      mot: "Nombre relatif",
      nature: "nom, maths",
      definition: "Un nombre relatif peut être positif (+) ou négatif (−), comme les températures.",
      exemple: "−3 °C est plus froid que 0 °C.",
    },
    geste: {
      titre: "Les données personnelles",
      texte: "Nom, adresse, photo, mot de passe : ce sont des données personnelles, à ne pas donner à n'importe qui.",
    },
    defi: {
      enonce: "Il fait 2 °C, puis la température baisse de 6 °C. Quelle température fait-il ?",
      correction: "−4 °C.",
    },
  },
  {
    numero: 17,
    semaine: 4,
    badge: "Trieur de coquillages",
    maths: {
      calcul: [
        { q: "0,7 ou 0,65 : le + grand ?", r: "0,7" },
        { q: "1/2 ou 0,5 ?", r: "égaux" },
        { q: "0,9 ou 0,89 : le + grand ?", r: "0,9" },
        { q: "7 × 9 =", r: "63" },
        { q: "3/4 ou 0,75 ?", r: "égaux" },
      ],
      probleme: {
        enonce: "Range du plus petit au plus grand : 0,8 ; 0,75 ; 1,2.",
        correction: "0,75 < 0,8 < 1,2.",
      },
      illu: { emoji: "🐚", label: "coquillages" },
    },
    francais: {
      regleTitre: "Les formes de phrases",
      regle: "Une phrase est affirmative ou négative (ne… pas, ne… jamais, ne… plus).",
      consigne: "Mets à la forme négative.",
      items: ["Ti Margo nage.", "Il voit un requin.", "Nous partons."],
      correction: "Ti Margo ne nage pas. — Il ne voit pas de requin. — Nous ne partons pas.",
    },
    mot: {
      mot: "Encadrer",
      nature: "verbe, maths",
      definition: "Encadrer un nombre, c'est trouver deux nombres, l'un plus petit, l'autre plus grand.",
      exemple: "3 < 3,5 < 4.",
    },
    geste: {
      titre: "Un mot de passe solide",
      texte: "Un bon mot de passe est long, mélange lettres, chiffres et signes, et n'est pas ton prénom.",
    },
    defi: {
      enonce: "Quel est le plus grand : 0,4 ou 0,38 ?",
      correction: "0,4.",
    },
  },
  {
    numero: 18,
    semaine: 4,
    badge: "Navigateur futé",
    maths: {
      calcul: [
        { q: "20 × 3 =", r: "60" },
        { q: "100 ÷ 2 =", r: "50" },
        { q: "5 × 12 =", r: "60" },
        { q: "240 ÷ 4 =", r: "60" },
        { q: "1/2 de 60 =", r: "30" },
      ],
      probleme: {
        enonce: "Le bateau avance à 20 km/h. Quelle distance parcourt-il en 3 h ?",
        correction: "20 × 3 = 60. Soixante kilomètres.",
      },
      illu: { emoji: "🧭", label: "boussole" },
    },
    francais: {
      regleTitre: "La ponctuation",
      regle:
        "La virgule sépare ; le point-virgule relie deux idées proches ; les deux-points annoncent ; les guillemets citent.",
      consigne: "Quel signe manque ?",
      items: ["Il prépare tout … la voile, la corde, l'eau.", "« Bonjour … dit-il."],
      correction: "les deux-points (:) — les guillemets fermants et la virgule : « Bonjour », dit-il.",
    },
    mot: {
      mot: "Vitesse",
      nature: "nom, maths",
      definition: "La vitesse relie une distance et une durée (km/h).",
      exemple: "À 60 km/h, on parcourt 60 km en 1 heure.",
    },
    geste: {
      titre: "La double authentification",
      texte: "En plus du mot de passe, un code reçu sur le téléphone protège bien mieux ton compte.",
    },
    defi: {
      enonce: "Une voiture roule à 50 km/h. Quelle distance en 2 h ?",
      correction: "100 km.",
    },
  },
  {
    numero: 19,
    semaine: 4,
    badge: "Compteur d'étoiles de mer",
    maths: {
      calcul: [
        { q: "(4 + 6) ÷ 2 =", r: "5" },
        { q: "(10 + 20) ÷ 2 =", r: "15" },
        { q: "(2 + 4 + 6) ÷ 3 =", r: "4" },
        { q: "8 × 8 =", r: "64" },
        { q: "1/4 de 80 =", r: "20" },
      ],
      probleme: {
        enonce: "Ti Margo compte 4, 6 et 8 étoiles de mer sur trois rochers. Quelle est la moyenne ?",
        correction: "(4 + 6 + 8) ÷ 3 = 18 ÷ 3 = 6.",
      },
      illu: { emoji: "⭐", label: "étoile de mer" },
    },
    francais: {
      regleTitre: "L'adjectif et son accord",
      regle: "L'adjectif s'accorde en genre et en nombre avec le nom qu'il qualifie.",
      consigne: "Accorde l'adjectif.",
      items: ["des eaux (clair)", "une plage (désert)", "des coraux (coloré)"],
      correction: "claires — déserte — colorés.",
    },
    mot: {
      mot: "Moyenne",
      nature: "nom, maths",
      definition: "La moyenne « équilibre » plusieurs nombres : on les additionne, puis on divise par leur nombre.",
      exemple: "Moyenne de 4, 6, 8 : 18 ÷ 3 = 6.",
    },
    geste: {
      titre: "Reconnaître un e-mail piège",
      texte: "Un e-mail qui réclame ton mot de passe ou promet un cadeau est souvent un piège (hameçonnage).",
    },
    defi: {
      enonce: "Moyenne de 12, 14 et 16 ?",
      correction: "14 (42 ÷ 3).",
    },
  },
  {
    numero: 20,
    semaine: 4,
    badge: "Cap sur Madagascar",
    maths: {
      calcul: [
        { q: "1 L = ? mL", r: "1000" },
        { q: "1,5 L = ? cL", r: "150" },
        { q: "2 × 2 × 2 =", r: "8" },
        { q: "3 × 3 × 3 =", r: "27" },
        { q: "750 mL + 250 mL = ? L", r: "1" },
      ],
      probleme: {
        enonce: "Une citerne contient 1,5 L ; on ajoute 750 mL. Combien y a-t-il en tout (en litres) ?",
        correction: "1,5 + 0,75 = 2,25. Deux litres et quart.",
      },
      illu: { emoji: "🛢️", label: "citerne" },
    },
    francais: {
      regleTitre: "Les déterminants",
      regle:
        "Le déterminant précède le nom : articles (le, un, des), possessifs (mon, ta), démonstratifs (ce, cette).",
      consigne: "Donne le type de déterminant.",
      items: ["mon sac", "cette île", "les voiles"],
      correction: "possessif — démonstratif — article (défini).",
    },
    mot: {
      mot: "Volume",
      nature: "nom, maths",
      definition: "Le volume mesure la place occupée dans l'espace (cm³, L).",
      exemple: "Un cube de 2 cm de côté a un volume de 8 cm³.",
    },
    geste: {
      titre: "Le Wi-Fi et la connexion",
      texte: "Le Wi-Fi connecte sans fil à Internet ; sur un réseau public, on évite de taper ses mots de passe.",
    },
    defi: {
      enonce: "Combien de mL dans 2,5 L ?",
      correction: "2 500 mL.",
    },
  },

  /* ===================== SEMAINE 5 · Madagascar ===================== */
  {
    numero: 21,
    semaine: 5,
    badge: "Ami des lémuriens",
    maths: {
      calcul: [
        { q: "3 × 50 =", r: "150" },
        { q: "2 × 150 =", r: "300" },
        { q: "8 × 7 =", r: "56" },
        { q: "1/5 de 100 =", r: "20" },
        { q: "450 ÷ 9 =", r: "50" },
      ],
      probleme: {
        enonce: "Sur une carte, 1 cm représente 50 km. Deux villes sont distantes de 4 cm. Quelle distance réelle ?",
        correction: "4 × 50 = 200. Deux cents kilomètres.",
      },
      illu: { emoji: "🐒", label: "lémurien" },
    },
    francais: {
      regleTitre: "Les pronoms personnels",
      regle:
        "Les pronoms (je, tu, il, nous, le, lui…) remplacent un nom pour éviter les répétitions.",
      consigne: "Remplace le groupe entre parenthèses par un pronom.",
      items: ["Ti Margo voit (les lémuriens).", "(Ti Margo) part.", "Il parle à (sa sœur)."],
      correction: "les — Il — lui.",
    },
    mot: {
      mot: "Échelle",
      nature: "nom, maths",
      definition: "L'échelle relie les distances sur une carte aux distances réelles.",
      exemple: "Échelle 1 cm pour 50 km : 3 cm = 150 km.",
    },
    geste: {
      titre: "La licence d'une image",
      texte: "Pour réutiliser une image, on en choisit une « libre de droit » et on cite son auteur.",
    },
    defi: {
      enonce: "Échelle 1 cm = 20 km. Que représentent 5 cm ?",
      correction: "100 km.",
    },
  },
  {
    numero: 22,
    semaine: 5,
    badge: "Cueilleur de vanille",
    maths: {
      calcul: [
        { q: "2/3 de 30 =", r: "20" },
        { q: "3/5 de 25 =", r: "15" },
        { q: "5/6 de 12 =", r: "10" },
        { q: "7 × 11 =", r: "77" },
        { q: "1/8 de 64 =", r: "8" },
      ],
      probleme: {
        enonce: "Sur 30 gousses de vanille, Ti Margo en sèche les 2/3. Combien de gousses sèche-t-il ?",
        correction: "2/3 de 30 = 20. Vingt gousses.",
      },
      illu: { emoji: "🌸", label: "fleur de vanille" },
    },
    francais: {
      regleTitre: "Le groupe nominal et ses expansions",
      regle:
        "On enrichit un nom avec un adjectif, un complément du nom (de…) ou une proposition relative (qui…).",
      consigne: "Quelle expansion du nom « fleur » ?",
      items: ["une fleur parfumée", "la fleur de vanille", "la fleur qui pousse ici"],
      correction: "parfumée (adjectif) — de vanille (complément du nom) — qui pousse ici (relative).",
    },
    mot: {
      mot: "Fraction d'une quantité",
      nature: "expression, maths",
      definition: "Prendre une fraction d'une quantité, c'est diviser, puis multiplier.",
      exemple: "2/3 de 30 : 30 ÷ 3 × 2 = 20.",
    },
    geste: {
      titre: "Citer ses sources",
      texte: "Quand on recopie une information, on indique d'où elle vient : c'est honnête et utile.",
    },
    defi: {
      enonce: "Combien font 3/4 de 40 ?",
      correction: "30.",
    },
  },
  {
    numero: 23,
    semaine: 5,
    badge: "Marchand malin",
    maths: {
      calcul: [
        { q: "10 % de 50 =", r: "5" },
        { q: "50 + 5 =", r: "55" },
        { q: "20 % de 100 =", r: "20" },
        { q: "8 × 9 =", r: "72" },
        { q: "1/2 de 80 =", r: "40" },
      ],
      probleme: {
        enonce: "Une étoffe coûte 50 €, augmentée de 10 %. Quel est son nouveau prix ?",
        correction: "10 % de 50 = 5 ; 50 + 5 = 55. Elle coûte 55 €.",
      },
      illu: { emoji: "🧵", label: "étoffe" },
    },
    francais: {
      regleTitre: "Synonymes et antonymes",
      regle: "Un synonyme a un sens proche ; un antonyme a un sens contraire.",
      consigne: "Synonymes (S) ou antonymes (A) ?",
      items: ["grand / immense", "ouvrir / fermer", "joyeux / heureux"],
      correction: "S — A — S.",
    },
    mot: {
      mot: "Augmentation",
      nature: "nom, maths",
      definition: "Augmenter de 10 %, c'est ajouter 10 % de la valeur de départ.",
      exemple: "50 € + 10 % = 55 €.",
    },
    geste: {
      titre: "Le temps d'écran",
      texte: "On fait des pauses régulières : les yeux et le cerveau ont besoin de repos.",
    },
    defi: {
      enonce: "Un prix de 80 € augmente de 25 %. Quel est le nouveau prix ?",
      correction: "100 € (80 + 20).",
    },
  },
  {
    numero: 24,
    semaine: 5,
    badge: "Explorateur du baobab",
    maths: {
      calcul: [
        { q: "diamètre si rayon = 5 :", r: "10" },
        { q: "rayon si diamètre = 8 :", r: "4" },
        { q: "3 × 10 =", r: "30" },
        { q: "7 × 8 =", r: "56" },
        { q: "1/4 de 360° =", r: "90°" },
      ],
      probleme: {
        enonce: "Le tronc d'un baobab a un diamètre de 4 m. Quel est son rayon ?",
        correction: "4 ÷ 2 = 2. Son rayon est de 2 m.",
      },
      illu: { emoji: "🌳", label: "baobab" },
    },
    francais: {
      regleTitre: "Les familles de mots",
      regle:
        "Les mots d'une même famille partagent un radical : terre, terrien, atterrir, souterrain.",
      consigne: "Trouve un mot de la même famille.",
      items: ["mer →", "terre →", "fleur →"],
      correction: "marin / maritime — terrien / terrasse — fleuriste / floral (exemples).",
    },
    mot: {
      mot: "Diamètre",
      nature: "nom, maths",
      definition: "Le diamètre traverse le cercle en passant par le centre ; il vaut deux rayons.",
      exemple: "Rayon 3 cm → diamètre 6 cm.",
    },
    geste: {
      titre: "Bien nommer ses fichiers",
      texte: "Un nom clair (cours-maths-fractions) vaut mieux que « doc1 » pour retrouver un fichier.",
    },
    defi: {
      enonce: "Un cercle a un rayon de 7 cm. Quel est son diamètre ?",
      correction: "14 cm.",
    },
  },
  {
    numero: 25,
    semaine: 5,
    badge: "Cap sur Mayotte",
    maths: {
      calcul: [
        { q: "9 × 6 =", r: "54" },
        { q: "demi-tour = ? °", r: "180" },
        { q: "quart de tour = ? °", r: "90" },
        { q: "180 + 180 =", r: "360" },
        { q: "1/2 de 360 =", r: "180" },
      ],
      probleme: {
        enonce: "Par symétrie centrale, un dessin tourne d'un demi-tour autour d'un point. De combien de degrés tourne-t-il ?",
        correction: "180°.",
      },
      illu: { emoji: "🔄", label: "rotation" },
    },
    francais: {
      regleTitre: "Sens propre et sens figuré",
      regle: "Le sens propre est le sens premier ; le sens figuré est imagé.",
      consigne: "Sens propre (P) ou figuré (F) ?",
      items: ["Il a le cœur qui bat.", "Il a un cœur d'or.", "La mer est calme."],
      correction: "P — F — P.",
    },
    mot: {
      mot: "Centre de symétrie",
      nature: "nom, maths",
      definition: "Une figure a un centre de symétrie si elle se superpose à elle-même après un demi-tour.",
      exemple: "Le rectangle a un centre de symétrie.",
    },
    geste: {
      titre: "Le copier-coller intelligent",
      texte: "On ne recopie pas mot pour mot : on comprend, puis on réécrit avec ses propres mots.",
    },
    defi: {
      enonce: "Combien de degrés dans un demi-tour ?",
      correction: "180°.",
    },
  },

  /* ===================== SEMAINE 6 · Mayotte, le grand lagon ===================== */
  {
    numero: 26,
    semaine: 6,
    badge: "Plongeur du lagon",
    maths: {
      calcul: [
        { q: "−4 + 9 =", r: "5" },
        { q: "−3 + (−2) =", r: "−5" },
        { q: "7 + (−7) =", r: "0" },
        { q: "−10 + 4 =", r: "−6" },
        { q: "−1 + 6 =", r: "5" },
      ],
      probleme: {
        enonce: "Un plongeur est à −6 m, remonte de 9 m, puis redescend de 5 m. À quelle profondeur est-il ?",
        correction: "−6 + 9 − 5 = −2. Il est à −2 m.",
      },
      illu: { emoji: "🐋", label: "baleine" },
    },
    francais: {
      regleTitre: "Les registres de langue",
      regle:
        "Familier (entre copains), courant (à l'école), soutenu (à l'écrit, en littérature) : on adapte à qui on parle.",
      consigne: "Familier, courant ou soutenu ?",
      items: ["bouquin", "livre", "ouvrage"],
      correction: "familier — courant — soutenu.",
    },
    mot: {
      mot: "Opposé",
      nature: "nom, maths",
      definition: "L'opposé d'un nombre relatif a le même chiffre, mais le signe contraire.",
      exemple: "L'opposé de +5 est −5.",
    },
    geste: {
      titre: "Vérifier ce que dit une IA",
      texte: "Une IA peut se tromper : on vérifie ses réponses avec une autre source fiable.",
    },
    defi: {
      enonce: "Quel est l'opposé de −8 ?",
      correction: "+8.",
    },
  },
  {
    numero: 27,
    semaine: 6,
    badge: "Maître des opérations",
    maths: {
      calcul: [
        { q: "2 × (3 + 5) − 4 =", r: "12" },
        { q: "20 ÷ (2 + 2) =", r: "5" },
        { q: "3 × 4 − 2 × 5 =", r: "2" },
        { q: "(10 − 4) × (2 + 1) =", r: "18" },
        { q: "100 − 5 × 5 =", r: "75" },
      ],
      probleme: {
        enonce: "Ti Margo achète 3 souvenirs à 5 € et 1 carte à 4 €, puis utilise un bon de −2 €. Écris le calcul et le total.",
        correction: "3 × 5 + 4 − 2 = 15 + 4 − 2 = 17. Il paie 17 €.",
      },
      illu: { emoji: "🎁", label: "souvenirs" },
    },
    francais: {
      regleTitre: "Comparaison et métaphore",
      regle:
        "La comparaison rapproche avec « comme » ; la métaphore le fait sans outil de comparaison.",
      consigne: "Comparaison (C) ou métaphore (M) ?",
      items: ["fort comme un lion", "cet enfant est un lion", "rapide comme l'éclair"],
      correction: "C — M — C.",
    },
    mot: {
      mot: "Parenthèse",
      nature: "nom, maths",
      definition: "Les parenthèses indiquent ce que l'on calcule en premier.",
      exemple: "(2 + 3) × 4 = 20.",
    },
    geste: {
      titre: "Sauvegarder plusieurs versions",
      texte: "Garder « v1 », « v2 »… permet de revenir en arrière si on se trompe.",
    },
    defi: {
      enonce: "Calcule (6 + 4) × 2 − 5.",
      correction: "15 (10 × 2 = 20 ; 20 − 5 = 15).",
    },
  },
  {
    numero: 28,
    semaine: 6,
    badge: "As de la proportion",
    maths: {
      calcul: [
        { q: "6 ÷ 4 =", r: "1,5" },
        { q: "10 × 1,5 =", r: "15" },
        { q: "5 × 3 =", r: "15" },
        { q: "8 × 7 =", r: "56" },
        { q: "1/4 de 200 =", r: "50" },
      ],
      probleme: {
        enonce: "4 noix de coco coûtent 6 €. Combien coûtent 10 noix de coco au même prix ?",
        correction: "Une noix : 6 ÷ 4 = 1,50 € ; 10 × 1,50 = 15. Les 10 coûtent 15 €.",
      },
      illu: { emoji: "🥥", label: "noix de coco" },
    },
    francais: {
      regleTitre: "La phrase complexe",
      regle:
        "Une phrase complexe a plusieurs verbes : par juxtaposition (,), coordination (et, mais) ou subordination (qui, que).",
      consigne: "Combien de verbes conjugués, et comment sont-ils reliés ?",
      items: ["Il rame et il chante.", "La voile claque, le vent souffle."],
      correction: "2 verbes, coordination (et) — 2 verbes, juxtaposition (virgule).",
    },
    mot: {
      mot: "Proportion",
      nature: "nom, maths",
      definition: "Une situation est proportionnelle quand on multiplie toujours par le même nombre.",
      exemple: "2 kg → 6 € ; 4 kg → 12 €.",
    },
    geste: {
      titre: "Partager un document",
      texte: "On peut partager un fichier par un lien et choisir : lecture seule ou modification.",
    },
    defi: {
      enonce: "5 stylos coûtent 10 €. Combien coûtent 8 stylos ?",
      correction: "16 € (2 € l'unité).",
    },
  },
  {
    numero: 29,
    semaine: 6,
    badge: "Presque en 5ᵉ",
    maths: {
      calcul: [
        { q: "4 × 4 + 3 × 2 =", r: "22" },
        { q: "10 × 5 − 2 × 5 =", r: "40" },
        { q: "8 × 8 =", r: "64" },
        { q: "1/2 + 1/4 =", r: "3/4" },
        { q: "360 ÷ 8 =", r: "45" },
      ],
      probleme: {
        enonce: "Une terrasse en forme de L : un carré de 4 m de côté collé à un rectangle de 3 m sur 2 m. Quelle aire totale ?",
        correction: "4 × 4 + 3 × 2 = 16 + 6 = 22. L'aire totale est 22 m².",
      },
      illu: { emoji: "🏝️", label: "terrasse" },
    },
    francais: {
      regleTitre: "Révision : les homophones",
      regle:
        "On choisit a/à, et/est, on/ont, son/sont, ce/se, c'est/s'est selon le sens de la phrase.",
      consigne: "Complète.",
      items: ["… beau et il … chaud (c'est/s'est ; a/à).", "Ils … rangé leurs sacs (on/ont)."],
      correction: "C'est … a — ont.",
    },
    mot: {
      mot: "Aire composée",
      nature: "expression, maths",
      definition: "On calcule l'aire d'une figure compliquée en la découpant en figures simples.",
      exemple: "Un L = un carré + un rectangle.",
    },
    geste: {
      titre: "La netiquette",
      texte: "En ligne, on reste poli : pas de majuscules qui crient, pas d'insultes, on se relit avant d'envoyer.",
    },
    defi: {
      enonce: "Aire d'un L : un carré 5 × 5 plus un rectangle 2 × 4 ?",
      correction: "33 (25 + 8).",
    },
  },
  {
    numero: 30,
    semaine: 6,
    badge: "Prêt pour la 5ᵉ ! 🎓",
    maths: {
      calcul: [
        { q: "2 × (5 + 5) =", r: "20" },
        { q: "3/4 de 100 =", r: "75" },
        { q: "−5 + 12 =", r: "7" },
        { q: "15 % de 200 =", r: "30" },
        { q: "144 ÷ 12 =", r: "12" },
      ],
      probleme: {
        enonce: "En 6 semaines, Ti Margo a visité 6 îles et parcouru 1 200 km. Quelle distance moyenne par île ?",
        correction: "1 200 ÷ 6 = 200. Deux cents kilomètres en moyenne par île.",
      },
      illu: { emoji: "🎓", label: "diplôme" },
    },
    francais: {
      regleTitre: "Le grand bilan",
      regle:
        "Tu sais analyser une phrase, conjuguer aux temps clés, accorder et enrichir tes phrases. Te voilà prêt pour la 5ᵉ !",
      consigne: "Écris 2 phrases sur ton voyage : une au passé composé, une au futur.",
      items: ["(à toi d'écrire !)"],
      correction: "Réponse libre — vérifie les accords, les temps et la ponctuation.",
    },
    mot: {
      mot: "Bilan",
      nature: "nom",
      definition: "Faire le bilan, c'est mesurer le chemin parcouru et tout ce qu'on a appris.",
      exemple: "Quel beau bilan : direction la 5ᵉ !",
    },
    geste: {
      titre: "Citoyen numérique",
      texte: "Recherche, sources, mots de passe, respect des autres : tu sais déjà agir en citoyen du numérique.",
    },
    defi: {
      enonce: "Combien d'îles Ti Margo a-t-il visitées pendant le voyage ?",
      correction: "6 îles (une par semaine).",
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  Défis ★★★★★ (niveau expert) — pensés pour les élèves HPI : raisonnement,  */
/*  suites, dénombrement, énigmes, problèmes ouverts. Durs mais à la portée   */
/*  d'un bon élève de 6e qui prend le temps de réfléchir.                     */
/* -------------------------------------------------------------------------- */
export const defisExpert: Record<number, { enonce: string; correction: string }> = {
  1: {
    enonce: "Ti Margo monte un escalier en grimpant 1 ou 2 marches à la fois. De combien de façons différentes peut-il monter un escalier de 5 marches ?",
    correction: "8 façons. (C'est la suite de Fibonacci : 1, 2, 3, 5, 8 — chaque nombre est la somme des deux précédents.)",
  },
  2: {
    enonce: "Un phare clignote sans arrêt : allumé 3 secondes, éteint 2 secondes. Au bout de 1 minute, combien de temps a-t-il été allumé ?",
    correction: "36 secondes. (Un cycle dure 5 s dont 3 s allumé ; en 60 s il y a 12 cycles ; 12 × 3 = 36 s.)",
  },
  3: {
    enonce: "Ti Margo a 3 fanions (rouge, bleu, vert) à accrocher en file sur le mât. Combien d'ordres différents peut-il former ?",
    correction: "6 ordres. (3 × 2 × 1 = 6 : 3 choix pour le 1er fanion, 2 pour le 2e, 1 pour le dernier.)",
  },
  4: {
    enonce: "Avec une corde de 24 m, Ti Margo forme un rectangle aux côtés entiers sur le sable. Quelles dimensions donnent la plus grande aire possible ?",
    correction: "6 m sur 6 m (un carré), d'aire 36 m². (À périmètre fixé, c'est toujours le carré qui donne l'aire maximale.)",
  },
  5: {
    enonce: "L'âge du capitaine, plus le double de l'âge de Ti Margo, font 50. Ti Margo a 7 ans. Quel âge a le capitaine ?",
    correction: "36 ans. (50 − 2 × 7 = 50 − 14 = 36.)",
  },
  6: {
    enonce: "Ti Margo achète des fruits à 1,20 € pièce et a exactement 10 €. Combien peut-il en acheter au maximum, et combien lui reste-t-il ?",
    correction: "8 fruits (8 × 1,20 = 9,60 €) ; il lui reste 0,40 €.",
  },
  7: {
    enonce: "Ti Margo remplit des bouteilles de 0,75 L avec 8 L d'eau. Combien remplit-il de bouteilles pleines, et combien d'eau reste-t-il ?",
    correction: "10 bouteilles pleines (10 × 0,75 = 7,5 L) ; il reste 0,5 L.",
  },
  8: {
    enonce: "Une recette pour 6 crêpes demande 250 g de farine. Ti Margo veut faire 15 crêpes. Combien de farine lui faut-il ?",
    correction: "625 g. (15 = 6 × 2,5, donc 250 × 2,5 = 625 g.)",
  },
  9: {
    enonce: "Dans un triangle, le 2e angle est le double du 1er, et le 3e est le triple du 1er. Combien mesure chaque angle ?",
    correction: "30°, 60° et 90°. (1 + 2 + 3 = 6 parts ; 180 ÷ 6 = 30 ; donc 30, 60, 90.)",
  },
  10: {
    enonce: "Combien d'axes de symétrie possède chacun : un carré, un triangle équilatéral, un cercle ?",
    correction: "Carré : 4 ; triangle équilatéral : 3 ; cercle : une infinité (tout diamètre est un axe).",
  },
  11: {
    enonce: "Ti Margo mange 1/2 d'une tarte, puis 1/4 de ce qui reste. Quelle fraction de la tarte entière a-t-il mangée en tout ?",
    correction: "5/8. (Il reste 1/2 ; le 1/4 de ce reste = 1/8 ; total 1/2 + 1/8 = 4/8 + 1/8 = 5/8.)",
  },
  12: {
    enonce: "En utilisant les chiffres 2, 3, 4 et 5 une seule fois chacun, avec + − × ÷ et des parenthèses, écris un calcul qui donne exactement 24.",
    correction: "Par exemple 2 × (3 + 4 + 5) = 2 × 12 = 24. (D'autres solutions existent !)",
  },
  13: {
    enonce: "Un rectangle de 8 cm sur 6 cm est coupé en deux par une diagonale. Quelle est l'aire de chaque triangle, et pourquoi sont-ils égaux ?",
    correction: "24 cm² chacun. (Aire du rectangle = 48 ; la diagonale le coupe en deux triangles superposables, donc 48 ÷ 2 = 24.)",
  },
  14: {
    enonce: "Ti Margo a un ruban de 1 m. Il en coupe 35 cm, puis la moitié de ce qui reste. Quelle longueur lui reste-t-il (en cm) ?",
    correction: "32,5 cm. (100 − 35 = 65 ; la moitié de 65 = 32,5.)",
  },
  15: {
    enonce: "Trois cloches sonnent ensemble à midi : l'une toutes les 4 min, une autre toutes les 6 min, la dernière toutes les 8 min. Dans combien de minutes sonneront-elles de nouveau toutes ensemble ?",
    correction: "24 minutes. (C'est le plus petit multiple commun de 4, 6 et 8 : PPCM = 24.)",
  },
  16: {
    enonce: "Un plongeur descend à −12 m, remonte de 5 m, puis redescend de 8 m. À quelle profondeur est-il ?",
    correction: "−15 m. (−12 + 5 − 8 = −15.)",
  },
  17: {
    enonce: "Trouve un nombre décimal compris entre 0,7 et 0,71. Y en a-t-il un seul ?",
    correction: "Par exemple 0,705. Il en existe une infinité (0,701 ; 0,7005 ; 0,709…).",
  },
  18: {
    enonce: "Ti Margo parcourt 90 km : la 1re heure à 30 km/h, puis il accélère à 40 km/h. Combien de temps met-il en tout ?",
    correction: "2 h 30. (1re heure : 30 km ; reste 60 km à 40 km/h, soit 1,5 h ; total 1 + 1,5 = 2,5 h.)",
  },
  19: {
    enonce: "La moyenne de trois nombres est 10. Deux d'entre eux valent 7 et 11. Quel est le troisième ?",
    correction: "12. (La somme vaut 3 × 10 = 30 ; 30 − 7 − 11 = 12.)",
  },
  20: {
    enonce: "Un aquarium en forme de pavé mesure 30 cm × 20 cm × 25 cm. Combien de litres peut-il contenir ? (1 L = 1 000 cm³)",
    correction: "15 L. (30 × 20 × 25 = 15 000 cm³ = 15 L.)",
  },
  21: {
    enonce: "Sur un plan à l'échelle 1 cm pour 2 m, une salle mesure 6 cm sur 4 cm. Quelle est son aire réelle ?",
    correction: "96 m². (Dimensions réelles : 12 m × 8 m = 96 m². Attention : on convertit d'abord les longueurs, pas l'aire du plan.)",
  },
  22: {
    enonce: "Ti Margo dépense 1/3 de son argent en vanille, puis la moitié de ce qui reste en épices. Il lui reste 8 €. Combien avait-il au départ ?",
    correction: "24 €. (Après la vanille, il garde 2/3 ; il en dépense la moitié, il lui reste donc 1/3 du total = 8 € → total 24 €.)",
  },
  23: {
    enonce: "Un objet à 100 € augmente de 20 %, puis baisse de 20 %. Retrouve-t-on 100 € ? Justifie.",
    correction: "Non : 96 €. (100 + 20 % = 120 ; 120 − 20 % = 120 − 24 = 96. La baisse porte sur une valeur plus grande que l'augmentation.)",
  },
  24: {
    enonce: "Quatre cercles identiques de rayon 3 cm sont posés en ligne et se touchent. Quelle est la longueur totale de la rangée ?",
    correction: "24 cm. (Chaque cercle occupe 1 diamètre = 6 cm de large ; 4 × 6 = 24 cm.)",
  },
  25: {
    enonce: "Quels chiffres restent lisibles après un demi-tour (symétrie centrale) ? Donne un nombre à 3 chiffres qui se lit pareil à l'envers.",
    correction: "Les chiffres 0, 1, 8 (et 6 ↔ 9). Exemple : 808, ou encore 619 (qui, retourné, redonne 619).",
  },
  26: {
    enonce: "Range dans l'ordre croissant : −3 ; 2 ; −7 ; 0 ; −1. Puis donne l'écart entre le plus petit et le plus grand.",
    correction: "−7 < −3 < −1 < 0 < 2. L'écart est de 9 (de −7 à 2, il y a 9 unités).",
  },
  27: {
    enonce: "Dans le calcul 2 + 3 × 4 − 1, place des parenthèses pour obtenir le plus grand résultat possible, puis le plus petit.",
    correction: "Le plus grand : (2 + 3) × 4 − 1 = 19. Le plus petit : 2 + 3 × (4 − 1) = 11.",
  },
  28: {
    enonce: "6 ouvriers construisent un mur en 4 jours. Combien de jours pour 8 ouvriers, au même rythme ?",
    correction: "3 jours. (Le travail vaut 6 × 4 = 24 « jours-ouvriers » ; 24 ÷ 8 = 3. Plus d'ouvriers = moins de jours : c'est inversement proportionnel.)",
  },
  29: {
    enonce: "Un grand carré de 6 cm de côté a, en son centre, un trou carré de 2 cm de côté. Quelle est l'aire de la partie restante ?",
    correction: "32 cm². (36 − 4 = 32.)",
  },
  30: {
    enonce: "Pendant 30 jours, Ti Margo écrit dans son carnet : 4 lignes les jours ordinaires, mais 8 lignes les 6 jours d'arrivée sur une île. Combien de lignes en tout ?",
    correction: "144 lignes. (24 jours × 4 = 96 ; 6 jours × 8 = 48 ; 96 + 48 = 144.)",
  },
};

/* Le carnet de Ti Margo — récit doux et sensoriel, jour après jour (le voyage se vit). */
export const carnet: Record<number, string> = {
  1: "Cette fois, c'est la grande aventure : je prends la mer ! Mon petit voilier est prêt, le vent gonfle la voile. Direction les îles de l'océan Indien… et, tout au bout, la 5ᵉ ! Tu embarques avec moi ?",
  2: "La nuit, sur l'eau, le ciel est rempli d'étoiles. Le capitaine m'apprend à les lire pour trouver le nord. Je n'avais jamais vu autant de petites lumières !",
  3: "Des dauphins jouent dans les vagues à côté du bateau. Ils sautent, ils filent, ils reviennent : on dirait qu'ils nous accompagnent pour rire.",
  4: "Je dessine le pont du bateau dans mon carnet. Tout a sa place : les cordages, la barre, la voile. Un navire, c'est presque une petite maison qui flotte.",
  5: "Première semaine en mer terminée ! La Réunion disparaît à l'horizon. Devant nous, une nouvelle île grandit doucement : l'île Maurice. En avant !",
  6: "J'accoste à l'île Maurice ! Le marché de Port-Louis déborde de couleurs et d'odeurs : épices, mangues, tissus. J'ai envie de tout goûter.",
  7: "Je bois un grand jus de fruits frais à l'ombre d'un filao. Ici, le temps semble plus doux, et tout le monde sourit.",
  8: "On me raconte comment on cultivait la canne à sucre autrefois. Toute l'île a grandi autour de ce travail. Que d'histoires dans un seul champ !",
  9: "Je me promène le long d'un lagon turquoise. L'eau est si transparente qu'on voit les poissons nager comme suspendus dans le ciel.",
  10: "Au revoir Maurice ! Je remonte sur le bateau, le cœur léger. Cap sur une toute petite île tranquille : Rodrigues.",
  11: "Rodrigues est minuscule et paisible. D'énormes tortues se promènent lentement, comme de vieux sages. Je marche à leur rythme, sans me presser.",
  12: "Je goûte un miel doré récolté sur l'île. Les habitants connaissent chaque sentier, chaque arbre. Ici, on prend le temps de bien faire les choses.",
  13: "Je hisse une petite voile et je file sur le lagon. Le vent, l'eau, le soleil : je me sens libre comme un oiseau.",
  14: "Je mesure une corde pour réparer un filet de pêche. Les pêcheurs m'expliquent leurs gestes, transmis depuis très longtemps.",
  15: "Dernière soirée à Rodrigues. Demain, cap au nord vers des îles de rêve : les Seychelles. J'ai hâte de voir leurs plages !",
  16: "Les Seychelles ! Des rochers de granit tout arrondis, du sable blanc, une eau tiède. Je mets le masque sur le nez : un jardin de coraux m'attend.",
  17: "Je ramasse de jolis coquillages, puis je les repose : ici, on regarde sans rien abîmer. La beauté, ça se respecte.",
  18: "Le capitaine me confie la boussole pour rejoindre la prochaine crique. Trouver son chemin tout seul, quelle fierté !",
  19: "Sur les rochers, je compte les étoiles de mer. Il y en a de toutes les tailles. La nature ne fait jamais deux fois la même.",
  20: "Je quitte les Seychelles à regret. Mais une grande terre nous attend, immense et mystérieuse : Madagascar.",
  21: "Madagascar est si grande qu'on dirait un continent ! Dans les arbres, des lémuriens bondissent en me regardant de leurs grands yeux ronds.",
  22: "Je cueille des gousses de vanille avec une famille de paysans. Leur parfum est incroyable. Chaque fleur demande beaucoup de patience.",
  23: "Au marché, j'apprends à compter la monnaie et à discuter les prix en souriant. Acheter, c'est aussi un petit jeu !",
  24: "Je m'assois à l'ombre d'un baobab géant. Son tronc est si large qu'il faudrait plusieurs amis pour en faire le tour. Quel arbre majestueux !",
  25: "Dernière étape avant le retour ! Je mets le cap sur Mayotte et son lagon, l'un des plus beaux du monde, paraît-il.",
  26: "Le lagon de Mayotte est immense et calme. Une baleine passe au loin et souffle un grand jet d'eau. Mon cœur fait un bond : quel cadeau !",
  27: "Je nage parmi les tortues et les poissons multicolores. Sous l'eau, tout est silencieux et doux, comme dans un rêve éveillé.",
  28: "Je repense à toutes ces îles, à tous ces gens rencontrés. Voyager, c'est apprendre le monde… et un peu se découvrir soi-même.",
  29: "Le bateau met le cap sur la maison. Dans ma tête, je prépare déjà ma rentrée : la 5ᵉ, c'est tout bientôt. Je me sens grandi par ce voyage.",
  30: "Me voilà rentré, le carnet plein de souvenirs et la tête pleine d'étoiles. Six îles, mille découvertes… et maintenant, la 5ᵉ qui m'ouvre ses portes ! Merci d'avoir navigué avec moi : on a réussi, ensemble ! 🎓",
};

/* « Le savais-tu ? » — ancrage local 🌺 / ouverture monde 🌍, au fil du voyage. */
export const leSaviasTu: Record<number, { portee: "local" | "monde"; texte: string }> = {
  1: { portee: "local", texte: "Au départ de La Réunion, on aperçoit parfois des baleines à bosse : elles passent près de l'île entre juin et octobre." },
  2: { portee: "monde", texte: "Les marins se repéraient autrefois grâce aux étoiles : l'étoile Polaire indique le nord dans l'hémisphère nord." },
  3: { portee: "monde", texte: "Les dauphins dorment d'un seul côté du cerveau à la fois, pour continuer à respirer et à nager." },
  4: { portee: "local", texte: "Beaucoup de mots marins viennent du temps où La Réunion vivait au rythme des grands navires de commerce." },
  5: { portee: "monde", texte: "L'océan Indien est le 3ᵉ plus grand océan du monde ; il baigne l'Afrique, l'Asie et l'Australie." },
  6: { portee: "local", texte: "L'île Maurice est la plus proche voisine de La Réunion : elles ne sont qu'à environ 200 km l'une de l'autre." },
  7: { portee: "monde", texte: "Le dodo, un gros oiseau qui ne volait pas, vivait à Maurice ; il a disparu il y a plus de 300 ans." },
  8: { portee: "monde", texte: "La canne à sucre, cultivée dans tout l'océan Indien, sert à fabriquer le sucre… et le rhum." },
  9: { portee: "local", texte: "Les lagons sont protégés par des récifs de corail, de véritables remparts vivants contre les vagues." },
  10: { portee: "monde", texte: "Le créole se parle, avec des différences, à La Réunion, à Maurice, aux Seychelles et ailleurs." },
  11: { portee: "monde", texte: "Rodrigues abrite des tortues géantes ; certaines tortues terrestres peuvent vivre plus de 100 ans !" },
  12: { portee: "local", texte: "À Rodrigues, on récolte un miel réputé : les abeilles butinent des fleurs qu'on ne trouve que là." },
  13: { portee: "monde", texte: "Un voilier peut avancer même quand il ne va pas exactement dans le sens du vent : c'est toute une science." },
  14: { portee: "local", texte: "La pêche est un métier très ancien dans l'océan Indien ; on répare encore les filets à la main." },
  15: { portee: "monde", texte: "Les Seychelles sont faites de granit, une roche très ancienne, alors que La Réunion est née d'un volcan." },
  16: { portee: "monde", texte: "Le coco de mer des Seychelles donne la plus grosse graine du monde : elle peut peser jusqu'à 20 kg !" },
  17: { portee: "local", texte: "Aux Seychelles comme à La Réunion, on protège les coraux : ils abritent presque un quart de la vie marine." },
  18: { portee: "monde", texte: "Une boussole indique toujours le nord grâce à l'aimant naturel qu'est la Terre." },
  19: { portee: "monde", texte: "Les étoiles de mer peuvent faire repousser un bras perdu : un vrai super-pouvoir !" },
  20: { portee: "local", texte: "Entre les îles, les bateaux suivent des routes connues depuis des siècles par les navigateurs arabes et malais." },
  21: { portee: "monde", texte: "Madagascar est la 5ᵉ plus grande île du monde ; on y trouve des animaux qui n'existent nulle part ailleurs." },
  22: { portee: "local", texte: "La vanille de l'océan Indien (Madagascar, La Réunion) compte parmi les plus recherchées au monde." },
  23: { portee: "monde", texte: "L'argent n'a pas toujours existé : on échangeait autrefois des marchandises, c'était le troc." },
  24: { portee: "monde", texte: "Le baobab peut stocker des milliers de litres d'eau dans son tronc pour résister à la sécheresse." },
  25: { portee: "local", texte: "Mayotte, comme La Réunion, est un territoire français de l'océan Indien." },
  26: { portee: "monde", texte: "Le lagon de Mayotte est l'un des plus grands et des plus beaux lagons du monde." },
  27: { portee: "monde", texte: "Les tortues marines reviennent pondre sur la plage où elles sont nées, après un long voyage en mer." },
  28: { portee: "local", texte: "Voyager d'île en île a façonné la population métissée de La Réunion : Afrique, Inde, Chine, Europe, Madagascar." },
  29: { portee: "monde", texte: "En 5ᵉ, en histoire et en géographie, tu exploreras justement le monde et les grands voyages : ce cahier t'y prépare !" },
  30: { portee: "monde", texte: "Apprendre, c'est comme voyager : à chaque étape, l'horizon s'élargit. Bon cap vers la 5ᵉ !" },
};
