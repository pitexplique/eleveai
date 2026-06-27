/* -------------------------------------------------------------------------- */
/*  Données du cahier de vacances « En route vers la 4e » (5e → 4e).           */
/*  Fil conducteur : le tour du monde de Ti Margo, sur les traces du « Tour    */
/*  du monde en 80 jours » de Jules Verne (Londres → Égypte → Inde → Chine →   */
/*  Japon → Amérique → retour). Clin d'œil au XIXe siècle, au programme de 4e  */
/*  en français (Verne) et en histoire-géo (révolution industrielle,           */
/*  mondialisation). Niveau 5e : révision + avant-goût de la 4e.               */
/*  ⚠️ Défis ★★★★★ pensés pour les élèves HPI : raisonnement, énigmes,        */
/*     suites, dénombrement, pièges classiques — pas seulement « plus dur ».   */
/*  Moteur d'affichage commun : components/cahier/CahierVacances.tsx.          */
/* -------------------------------------------------------------------------- */

import type { Etape, Jour } from "@/components/cahier/types";

/** Les 6 grandes escales du tour du monde (une par semaine). */
export const parcours: Etape[] = [
  { semaine: 1, etape: 1, emoji: "🎩", lieu: "Londres, le grand départ", intro: "Ti Margo parie qu'il fera le tour du monde en 80 jours !" },
  { semaine: 2, etape: 2, emoji: "🐪", lieu: "L'Égypte et le canal de Suez", intro: "Cap sur l'Afrique : pyramides, désert et le fameux canal." },
  { semaine: 3, etape: 3, emoji: "🐘", lieu: "L'Inde", intro: "De Bombay à Calcutta, mille couleurs et mille épices." },
  { semaine: 4, etape: 4, emoji: "🏮", lieu: "La Chine, Hong Kong", intro: "Le port aux mille lanternes, puis l'immense Pacifique." },
  { semaine: 5, etape: 5, emoji: "⛩️", lieu: "Le Japon", intro: "Temples, cerisiers et longue traversée du Pacifique." },
  { semaine: 6, etape: 6, emoji: "🗽", lieu: "L'Amérique, retour à Londres", intro: "San Francisco, New York… et le pari tenu ! Cap sur la 4e." },
];

export const jours: Jour[] = [
  /* ===================== SEMAINE 1 · Londres, le grand départ ===================== */
  {
    numero: 1,
    semaine: 1,
    badge: "Globe-trotteur débutant",
    maths: {
      calcul: [
        { q: "−5 + 8 =", r: "3" },
        { q: "2 + 3 × 4 =", r: "14" },
        { q: "7 − 10 =", r: "−3" },
        { q: "−6 − 4 =", r: "−10" },
        { q: "20 − 3 × 5 =", r: "5" },
      ],
      probleme: {
        enonce: "Au Reform Club de Londres, Ti Margo doit réunir 20 000 £ pour son pari. Il en a déjà 16 000. Combien lui manque-t-il ?",
        correction: "20 000 − 16 000 = 4 000. Il lui manque 4 000 £.",
      },
      illu: { emoji: "🎩", label: "chapeau haut-de-forme" },
    },
    francais: {
      regleTitre: "Nature et fonction d'un mot",
      regle:
        "La nature, c'est la classe du mot (nom, verbe…) ; la fonction, c'est son rôle dans la phrase (sujet, COD…).",
      consigne: "Donne la fonction du groupe entre parenthèses.",
      items: ["(Ti Margo) part.", "Il prend (le train).", "(Demain), il arrive."],
      correction: "sujet — COD — complément circonstanciel de temps.",
    },
    mot: {
      mot: "Priorité",
      nature: "nom, maths",
      definition: "Dans un calcul, on fait d'abord les parenthèses, puis × et ÷, enfin + et −.",
      exemple: "2 + 3 × 4 = 2 + 12 = 14.",
    },
    geste: {
      titre: "Les réseaux sociaux",
      texte: "Chaque réseau a un âge minimum et des réglages de confidentialité : on choisit qui peut voir ce qu'on publie.",
    },
    defi: {
      enonce: "Quel est le résultat de 3 − 8 + 2 ?",
      correction: "−3.",
    },
  },
  {
    numero: 2,
    semaine: 1,
    badge: "Cheminot de la vapeur",
    maths: {
      calcul: [
        { q: "1/2 + 1/4 =", r: "3/4" },
        { q: "3/5 + 1/5 =", r: "4/5" },
        { q: "1 − 1/3 =", r: "2/3" },
        { q: "2/3 − 1/6 =", r: "1/2" },
        { q: "7 × 8 =", r: "56" },
      ],
      probleme: {
        enonce: "Le voyage de Ti Margo : 1/4 en train, 1/2 en bateau, le reste à dos d'éléphant. Quelle fraction à dos d'éléphant ?",
        correction: "1 − (1/4 + 1/2) = 1 − 3/4 = 1/4.",
      },
      illu: { emoji: "🚂", label: "train à vapeur" },
    },
    francais: {
      regleTitre: "Les compléments du verbe (COD, COI)",
      regle:
        "Le COD répond à « qui ? / quoi ? » ; le COI est introduit par une préposition (à, de).",
      consigne: "COD ou COI ?",
      items: ["Il regarde la carte.", "Il pense à son pari.", "Il parle aux marins."],
      correction: "COD — COI — COI.",
    },
    mot: {
      mot: "Dénominateur",
      nature: "nom, maths",
      definition: "Le dénominateur (en bas d'une fraction) indique en combien de parts l'unité est partagée.",
      exemple: "Dans 3/4, le dénominateur est 4.",
    },
    geste: {
      titre: "La désinformation (fake news)",
      texte: "Avant de partager une info choc, on vérifie : qui l'a publiée, quand, et d'autres sources sérieuses le disent-elles ?",
    },
    defi: {
      enonce: "Combien font 5/8 + 1/8 ?",
      correction: "6/8, c'est-à-dire 3/4.",
    },
  },
  {
    numero: 3,
    semaine: 1,
    badge: "Lecteur de cartes",
    maths: {
      calcul: [
        { q: "60 km/h pendant 3 h =", r: "180 km" },
        { q: "si 4 → 10, alors 8 →", r: "20" },
        { q: "120 ÷ 4 =", r: "30" },
        { q: "5 × 1,5 =", r: "7,5" },
        { q: "240 ÷ 8 =", r: "30" },
      ],
      probleme: {
        enonce: "Le train roule à 90 km/h. Quelle distance parcourt-il en 4 h ?",
        correction: "90 × 4 = 360. Trois cent soixante kilomètres.",
      },
      illu: { emoji: "🗺️", label: "carte du monde" },
    },
    francais: {
      regleTitre: "Les compléments circonstanciels",
      regle:
        "Ils précisent les circonstances : temps, lieu, manière, cause, but. On peut souvent les déplacer.",
      consigne: "Temps, lieu ou manière ?",
      items: ["À Londres, il prépare ses bagages.", "Le soir, il lit.", "Il avance prudemment."],
      correction: "lieu — temps — manière.",
    },
    mot: {
      mot: "Proportionnalité",
      nature: "nom, maths",
      definition: "Une situation est proportionnelle quand on multiplie toujours par le même nombre.",
      exemple: "À vitesse constante, la distance est proportionnelle à la durée.",
    },
    geste: {
      titre: "Reconnaître une image truquée",
      texte: "Une photo peut être retouchée ou sortie de son contexte : on cherche l'image d'origine avant de la croire.",
    },
    defi: {
      enonce: "Si 3 billets coûtent 45 £, combien coûtent 5 billets ?",
      correction: "75 £ (15 £ l'unité).",
    },
  },
  {
    numero: 4,
    semaine: 1,
    badge: "Voyageur économe",
    maths: {
      calcul: [
        { q: "10 % de 80 =", r: "8" },
        { q: "25 % de 200 =", r: "50" },
        { q: "50 % de 90 =", r: "45" },
        { q: "15 % de 100 =", r: "15" },
        { q: "8 × 9 =", r: "72" },
      ],
      probleme: {
        enonce: "Un billet de bateau coûte 120 £, avec 25 % de remise. Quel est le prix payé ?",
        correction: "25 % de 120 = 30 ; 120 − 30 = 90. Il paie 90 £.",
      },
      illu: { emoji: "🎫", label: "billet" },
    },
    francais: {
      regleTitre: "Le présent de l'indicatif",
      regle:
        "Le présent sert pour le moment présent, mais aussi pour une vérité générale ou un récit vivant.",
      consigne: "Conjugue au présent.",
      items: ["partir : nous …", "voir : il …", "faire : ils …"],
      correction: "nous partons — il voit — ils font.",
    },
    mot: {
      mot: "Remise",
      nature: "nom, maths",
      definition: "Une remise est une réduction de prix, souvent exprimée en pourcentage.",
      exemple: "120 € avec 25 % de remise : on paie 90 €.",
    },
    geste: {
      titre: "Le droit d'auteur",
      texte: "Musiques, films, images appartiennent à leurs auteurs : on ne les copie pas et on ne les partage pas sans autorisation.",
    },
    defi: {
      enonce: "20 % des 150 voyageurs descendent à la première escale. Combien restent à bord ?",
      correction: "120 (30 descendent).",
    },
  },
  {
    numero: 5,
    semaine: 1,
    badge: "Cap sur l'Égypte",
    maths: {
      calcul: [
        { q: "3 × (10 + 2) =", r: "36" },
        { q: "5 × (4 + 6) =", r: "50" },
        { q: "2 × (7 + 3) =", r: "20" },
        { q: "4 × 99 =", r: "396" },
        { q: "7 × 7 =", r: "49" },
      ],
      probleme: {
        enonce: "Ti Margo achète 6 paniers contenant chacun 4 pommes et 3 oranges. Combien de fruits en tout ? (utilise la distributivité)",
        correction: "6 × (4 + 3) = 6 × 4 + 6 × 3 = 24 + 18 = 42 fruits.",
      },
      illu: { emoji: "⛴️", label: "paquebot" },
    },
    francais: {
      regleTitre: "Imparfait et passé simple",
      regle:
        "Dans un récit, l'imparfait décrit le décor ; le passé simple raconte les actions soudaines.",
      consigne: "Imparfait (I) ou passé simple (PS) ?",
      items: ["Le soleil brillait.", "Soudain, il partit.", "Les vagues roulaient."],
      correction: "I — PS — I.",
    },
    mot: {
      mot: "Distributivité",
      nature: "nom, maths",
      definition: "Distribuer une multiplication sur une somme : k × (a + b) = k × a + k × b.",
      exemple: "3 × (4 + 5) = 12 + 15 = 27.",
    },
    geste: {
      titre: "Les licences libres (Creative Commons)",
      texte: "Certaines œuvres sont partagées librement par leurs auteurs : on peut les réutiliser, souvent en citant la source.",
    },
    defi: {
      enonce: "Calcule astucieusement 8 × 102 (pense à 8 × (100 + 2)).",
      correction: "816 (800 + 16).",
    },
  },

  /* ===================== SEMAINE 2 · L'Égypte et le canal de Suez ===================== */
  {
    numero: 6,
    semaine: 2,
    badge: "Explorateur du désert",
    maths: {
      calcul: [
        { q: "(−3) × 4 =", r: "−12" },
        { q: "(−5) × (−2) =", r: "10" },
        { q: "6 × (−3) =", r: "−18" },
        { q: "(−1) × (−1) =", r: "1" },
        { q: "(−2) × (−2) × (−2) =", r: "−8" },
      ],
      probleme: {
        enonce: "Dans le désert, la température chute de 3 °C par heure pendant 4 heures. Quelle est la variation totale ?",
        correction: "(−3) × 4 = −12. La température baisse de 12 °C.",
      },
      illu: { emoji: "🐪", label: "chameau" },
    },
    francais: {
      regleTitre: "Passé composé et plus-que-parfait",
      regle:
        "Le plus-que-parfait (avait + participe) raconte une action antérieure à une autre action passée.",
      consigne: "Conjugue au plus-que-parfait.",
      items: ["partir : il …", "finir : nous …", "voir : j'…"],
      correction: "il était parti — nous avions fini — j'avais vu.",
    },
    mot: {
      mot: "Règle des signes",
      nature: "expression, maths",
      definition: "Deux nombres de même signe donnent un produit positif ; de signes contraires, un produit négatif.",
      exemple: "(−5) × (−2) = 10 ; (−5) × 2 = −10.",
    },
    geste: {
      titre: "Citer une source en ligne",
      texte: "Pour une info trouvée sur Internet, on note l'auteur, le titre, la date et l'adresse (URL).",
    },
    defi: {
      enonce: "Quel est le signe de (−2) × (−3) × (−4), et combien vaut le produit ?",
      correction: "Négatif (trois facteurs négatifs, c'est impair) ; le produit vaut −24.",
    },
  },
  {
    numero: 7,
    semaine: 2,
    badge: "Ami du Nil",
    maths: {
      calcul: [
        { q: "(−12) ÷ 3 =", r: "−4" },
        { q: "(−20) ÷ (−4) =", r: "5" },
        { q: "15 ÷ (−3) =", r: "−5" },
        { q: "(−18) ÷ (−6) =", r: "3" },
        { q: "0 ÷ (−7) =", r: "0" },
      ],
      probleme: {
        enonce: "Une dette de 36 € est partagée également entre 4 amis. Quelle est la part de chacun (en relatif) ?",
        correction: "(−36) ÷ 4 = −9. Chacun doit 9 € (soit −9 €).",
      },
      illu: { emoji: "🛶", label: "felouque sur le Nil" },
    },
    francais: {
      regleTitre: "Futur et conditionnel présent",
      regle:
        "Le futur dit ce qui arrivera (il partira) ; le conditionnel dit ce qui pourrait arriver (il partirait).",
      consigne: "Futur (F) ou conditionnel (C) ?",
      items: ["Il arrivera demain.", "Il aimerait voyager.", "Nous partirons."],
      correction: "F — C — F.",
    },
    mot: {
      mot: "Opposé",
      nature: "nom, maths",
      definition: "L'opposé d'un nombre relatif a le même chiffre, mais le signe contraire.",
      exemple: "L'opposé de +7 est −7.",
    },
    geste: {
      titre: "Un moteur de recherche : comment il classe",
      texte: "Les premiers résultats ne sont pas toujours les meilleurs : certains sont des publicités, d'autres sont juste populaires.",
    },
    defi: {
      enonce: "Trouve le nombre relatif qui, multiplié par −3, donne 21.",
      correction: "−7, car (−3) × (−7) = 21.",
    },
  },
  {
    numero: 8,
    semaine: 2,
    badge: "Arpenteur des pyramides",
    maths: {
      calcul: [
        { q: "8 × 6 =", r: "48" },
        { q: "6 × 4 ÷ 2 =", r: "12" },
        { q: "10 × 10 =", r: "100" },
        { q: "aire carré de côté 7 =", r: "49" },
        { q: "12 × 5 =", r: "60" },
      ],
      probleme: {
        enonce: "Une voile triangulaire mesure 8 m de base et 5 m de hauteur. Quelle est son aire ?",
        correction: "8 × 5 ÷ 2 = 20. Son aire est 20 m².",
      },
      illu: { emoji: "🔺", label: "pyramide" },
    },
    francais: {
      regleTitre: "L'accord du participe passé",
      regle:
        "Avec être, le participe s'accorde avec le sujet. Avec avoir, il s'accorde avec le COD seulement s'il est placé avant le verbe.",
      consigne: "Accorde le participe passé.",
      items: ["Elle est (parti).", "Les lettres qu'il a (écrit).", "Ils ont (mangé)."],
      correction: "partie — écrites — mangé.",
    },
    mot: {
      mot: "Aire",
      nature: "nom, maths",
      definition: "L'aire mesure la surface d'une figure (cm², m²).",
      exemple: "Aire d'un triangle = base × hauteur ÷ 2.",
    },
    geste: {
      titre: "Les cookies et le pistage",
      texte: "Les cookies suivent ta navigation pour te montrer des publicités : on peut les refuser ou les effacer.",
    },
    defi: {
      enonce: "Un rectangle a une aire de 48 m² et une largeur de 6 m. Quelle est sa longueur ?",
      correction: "8 m (car 6 × 8 = 48).",
    },
  },
  {
    numero: 9,
    semaine: 2,
    badge: "Marin du canal de Suez",
    maths: {
      calcul: [
        { q: "diamètre si rayon 9 =", r: "18" },
        { q: "3,14 × 10 =", r: "31,4" },
        { q: "2 × 3,14 × 5 ≈", r: "31,4" },
        { q: "rayon si diamètre 14 =", r: "7" },
        { q: "100 − 64 =", r: "36" },
      ],
      probleme: {
        enonce: "Une roue de gouvernail a un rayon de 1 m. Quelle est sa circonférence ? (π ≈ 3,14)",
        correction: "2 × 3,14 × 1 = 6,28. Sa circonférence est d'environ 6,28 m.",
      },
      illu: { emoji: "🚢", label: "navire dans le canal" },
    },
    francais: {
      regleTitre: "ses / ces / c'est / s'est",
      regle:
        "« ses » = les siens ; « ces » = ceux-là ; « c'est » = cela est ; « s'est » accompagne un verbe pronominal.",
      consigne: "Complète.",
      items: ["… valises sont prêtes (ses/ces).", "… un long voyage (c'est/s'est).", "Il … perdu (c'est/s'est)."],
      correction: "Ses (ou Ces) — C'est — s'est.",
    },
    mot: {
      mot: "Circonférence",
      nature: "nom, maths",
      definition: "La circonférence est le périmètre d'un cercle : environ 3,14 × diamètre.",
      exemple: "Un cercle de diamètre 10 a une circonférence d'environ 31,4.",
    },
    geste: {
      titre: "Ton empreinte numérique",
      texte: "Tout ce que tu publies laisse une trace durable : avant d'envoyer, demande-toi si tu l'assumeras dans 10 ans.",
    },
    defi: {
      enonce: "Le diamètre d'un cercle est 20 cm. Donne une valeur approchée de sa circonférence (π ≈ 3,14).",
      correction: "Environ 62,8 cm (3,14 × 20).",
    },
  },
  {
    numero: 10,
    semaine: 2,
    badge: "Cap sur l'Inde",
    maths: {
      calcul: [
        { q: "1 cm → 100 km ; 8 cm =", r: "800 km" },
        { q: "160 ÷ 2 =", r: "80" },
        { q: "échelle 1/100 : 3 cm réel ?", r: "300 cm" },
        { q: "7 × 6 =", r: "42" },
        { q: "450 ÷ 9 =", r: "50" },
      ],
      probleme: {
        enonce: "Sur une carte au 1/10 000 000, quelle longueur fait le canal de Suez (160 km) ? (160 km = 16 000 000 cm)",
        correction: "16 000 000 ÷ 10 000 000 = 1,6. Il mesure 1,6 cm sur la carte.",
      },
      illu: { emoji: "🧭", label: "boussole" },
    },
    francais: {
      regleTitre: "leur / leurs · quel / qu'elle",
      regle:
        "« leur » devant un verbe est invariable ; « leur(s) » devant un nom s'accorde. « quel(le)(s) » est un déterminant ; « qu'elle » = que + elle.",
      consigne: "Complète.",
      items: ["Il … parle (leur/leurs).", "… bagages (leur/leurs)", "… belle ville ! (quelle/qu'elle)"],
      correction: "leur — leurs — Quelle.",
    },
    mot: {
      mot: "Échelle",
      nature: "nom, maths",
      definition: "L'échelle relie les distances sur une carte aux distances réelles.",
      exemple: "Échelle 1 cm pour 50 km : 3 cm = 150 km.",
    },
    geste: {
      titre: "Le harcèlement en ligne (réagir)",
      texte: "Face au harcèlement, on ne reste pas seul : on garde les preuves, on bloque, on signale et on en parle à un adulte.",
    },
    defi: {
      enonce: "Échelle 1 cm pour 50 km. Deux ports sont distants de 7 cm sur la carte. Distance réelle ?",
      correction: "350 km.",
    },
  },

  /* ===================== SEMAINE 3 · L'Inde ===================== */
  {
    numero: 11,
    semaine: 3,
    badge: "Ami des éléphants",
    maths: {
      calcul: [
        { q: "1/2 × 1/2 =", r: "1/4" },
        { q: "2/3 × 3/4 =", r: "1/2" },
        { q: "3 × 1/4 =", r: "3/4" },
        { q: "1/5 × 10 =", r: "2" },
        { q: "2/3 × 6 =", r: "4" },
      ],
      probleme: {
        enonce: "Un éléphant transporte les 3/4 d'une charge de 200 kg. Combien de kilos transporte-t-il ?",
        correction: "3/4 × 200 = 150. Il transporte 150 kg.",
      },
      illu: { emoji: "🐘", label: "éléphant" },
    },
    francais: {
      regleTitre: "Phrase simple et phrase complexe",
      regle: "Une phrase simple a un seul verbe conjugué ; une phrase complexe en a plusieurs.",
      consigne: "Simple ou complexe ?",
      items: ["Le train part.", "Il monte et il s'assoit.", "Il lit pendant qu'il voyage."],
      correction: "simple — complexe — complexe.",
    },
    mot: {
      mot: "Produit",
      nature: "nom, maths",
      definition: "Le produit est le résultat d'une multiplication.",
      exemple: "Le produit de 2/3 par 6 est 4.",
    },
    geste: {
      titre: "Mot de passe et gestionnaire",
      texte: "Un mot de passe différent par site, c'est plus sûr ; un gestionnaire de mots de passe les retient pour toi.",
    },
    defi: {
      enonce: "Combien font 2/5 × 1/2 ?",
      correction: "2/10, c'est-à-dire 1/5.",
    },
  },
  {
    numero: 12,
    semaine: 3,
    badge: "Marchand d'épices",
    maths: {
      calcul: [
        { q: "2/3 de 90 =", r: "60" },
        { q: "3/4 de 80 =", r: "60" },
        { q: "5/6 de 18 =", r: "15" },
        { q: "1/8 de 64 =", r: "8" },
        { q: "7 × 9 =", r: "63" },
      ],
      probleme: {
        enonce: "Ti Margo a 60 roupies. Il dépense les 2/3 en épices. Combien dépense-t-il, et combien lui reste-t-il ?",
        correction: "2/3 de 60 = 40 dépensés ; il lui reste 20 roupies.",
      },
      illu: { emoji: "🌶️", label: "épices" },
    },
    francais: {
      regleTitre: "La proposition subordonnée relative",
      regle: "Elle complète un nom et commence par qui, que, dont, où.",
      consigne: "Souligne la proposition relative.",
      items: ["Le bateau qui part est immense.", "La ville où il arrive est animée.", "L'ami dont il parle est marin."],
      correction: "qui part — où il arrive — dont il parle.",
    },
    mot: {
      mot: "Inverse",
      nature: "nom, maths",
      definition: "L'inverse d'une fraction s'obtient en échangeant le haut et le bas.",
      exemple: "L'inverse de 3/4 est 4/3.",
    },
    geste: {
      titre: "La double authentification",
      texte: "En plus du mot de passe, un code envoyé sur le téléphone protège bien mieux ton compte.",
    },
    defi: {
      enonce: "Quelle fraction de 120 vaut 90 ?",
      correction: "3/4.",
    },
  },
  {
    numero: 13,
    semaine: 3,
    badge: "Statisticien en herbe",
    maths: {
      calcul: [
        { q: "(10 + 14) ÷ 2 =", r: "12" },
        { q: "(6 + 8 + 10) ÷ 3 =", r: "8" },
        { q: "(12 + 12 + 12) ÷ 3 =", r: "12" },
        { q: "8 × 8 =", r: "64" },
        { q: "1/2 de 50 =", r: "25" },
      ],
      probleme: {
        enonce: "Aux trois premières escales, Ti Margo note 8, 11 et 11 jours d'avance. Quelle est son avance moyenne ?",
        correction: "(8 + 11 + 11) ÷ 3 = 30 ÷ 3 = 10. Dix jours d'avance en moyenne.",
      },
      illu: { emoji: "📊", label: "graphique" },
    },
    francais: {
      regleTitre: "La proposition subordonnée conjonctive",
      regle: "Introduite par « que », elle complète souvent un verbe comme penser, dire, croire.",
      consigne: "Souligne la conjonctive.",
      items: ["Il pense qu'il gagnera.", "Je crois que tu as raison.", "Il dit qu'il part."],
      correction: "qu'il gagnera — que tu as raison — qu'il part.",
    },
    mot: {
      mot: "Moyenne",
      nature: "nom, maths",
      definition: "La moyenne « équilibre » plusieurs nombres : on les additionne, puis on divise par leur nombre.",
      exemple: "Moyenne de 6, 8, 10 : 24 ÷ 3 = 8.",
    },
    geste: {
      titre: "Les arnaques en ligne",
      texte: "Une offre « trop belle pour être vraie » (gain, cadeau) cache souvent une arnaque : on ne clique pas, on ne donne rien.",
    },
    defi: {
      enonce: "Moyenne de 15, 18 et 21 ?",
      correction: "18 (54 ÷ 3).",
    },
  },
  {
    numero: 14,
    semaine: 3,
    badge: "Lecteur de chiffres",
    maths: {
      calcul: [
        { q: "25 − 12 =", r: "13" },
        { q: "40 − 28 =", r: "12" },
        { q: "9 × 7 =", r: "63" },
        { q: "100 − 37 =", r: "63" },
        { q: "1/4 de 80 =", r: "20" },
      ],
      probleme: {
        enonce: "Les températures de la semaine vont de 18 °C à 31 °C. Quelle est l'étendue ?",
        correction: "31 − 18 = 13. L'étendue est de 13 °C.",
      },
      illu: { emoji: "🔢", label: "chiffres" },
    },
    francais: {
      regleTitre: "Le discours direct",
      regle:
        "On rapporte les paroles exactes entre guillemets, avec un verbe de parole.",
      consigne: "Ponctue correctement.",
      items: ["Je pars dit-il", "Où allons-nous demanda-t-elle"],
      correction: "« Je pars », dit-il. — « Où allons-nous ? » demanda-t-elle.",
    },
    mot: {
      mot: "Étendue",
      nature: "nom, maths",
      definition: "L'étendue d'une série est l'écart entre la plus grande et la plus petite valeur.",
      exemple: "Pour 6, 9, 15 : étendue = 15 − 6 = 9.",
    },
    geste: {
      titre: "Le tableur : un graphique",
      texte: "À partir d'un tableau de données, le tableur dessine un graphique (barres, courbe) en quelques clics.",
    },
    defi: {
      enonce: "Une série : 7, 12, 9, 15, 6. Quelle est son étendue ?",
      correction: "9 (15 − 6).",
    },
  },
  {
    numero: 15,
    semaine: 3,
    badge: "Cap sur la Chine",
    maths: {
      calcul: [
        { q: "2 puissance 3 =", r: "8" },
        { q: "3 puissance 2 =", r: "9" },
        { q: "10 puissance 2 =", r: "100" },
        { q: "10 puissance 3 =", r: "1000" },
        { q: "5 puissance 2 =", r: "25" },
      ],
      probleme: {
        enonce: "Sur un échiquier, on pose 1 grain sur la 1re case, puis on double à chaque case. Combien de grains sur la 4e case ?",
        correction: "2 puissance 3 = 8 grains (1, 2, 4, 8).",
      },
      illu: { emoji: "🔟", label: "puissances" },
    },
    francais: {
      regleTitre: "Le discours indirect",
      regle:
        "On rapporte les paroles sans guillemets, en les intégrant à la phrase (souvent avec « que » ou « si »).",
      consigne: "Mets au discours indirect.",
      items: ["Il dit : « Je pars. »", "Elle demande : « Tu viens ? »"],
      correction: "Il dit qu'il part. — Elle demande si tu viens.",
    },
    mot: {
      mot: "Puissance",
      nature: "nom, maths",
      definition: "Une puissance est une multiplication répétée : 2 puissance 3 = 2 × 2 × 2 = 8.",
      exemple: "On lit « 2 puissance 3 » ou « 2 exposant 3 ».",
    },
    geste: {
      titre: "Le tableur : trier et filtrer",
      texte: "Le tableur range les données par ordre (croissant, alphabétique) et n'affiche que celles qu'on choisit.",
    },
    defi: {
      enonce: "Combien vaut 2 puissance 5 ?",
      correction: "32 (2 × 2 × 2 × 2 × 2).",
    },
  },

  /* ===================== SEMAINE 4 · La Chine, Hong Kong ===================== */
  {
    numero: 16,
    semaine: 4,
    badge: "Maître des puissances",
    maths: {
      calcul: [
        { q: "3 × 10 puissance 2 =", r: "300" },
        { q: "5 × 10 puissance 3 =", r: "5000" },
        { q: "7 × 10 puissance 4 =", r: "70000" },
        { q: "10 puissance 5 =", r: "100000" },
        { q: "2 × 10 puissance 1 =", r: "20" },
      ],
      probleme: {
        enonce: "La distance Hong Kong–Yokohama est d'environ 2 800 km. Écris-la en écriture scientifique.",
        correction: "2 800 = 2,8 × 10 puissance 3 km.",
      },
      illu: { emoji: "🏮", label: "lanternes" },
    },
    francais: {
      regleTitre: "Voix active et voix passive",
      regle:
        "À la voix passive, le sujet subit l'action : « Le canal relie deux mers » → « Deux mers sont reliées par le canal ».",
      consigne: "Mets à la voix passive.",
      items: ["Le marin hisse la voile.", "Ti Margo gagne le pari."],
      correction: "La voile est hissée par le marin. — Le pari est gagné par Ti Margo.",
    },
    mot: {
      mot: "Écriture scientifique",
      nature: "expression, maths",
      definition: "On écrit un grand nombre sous la forme a × 10 puissance n (avec a entre 1 et 10).",
      exemple: "3 000 000 = 3 × 10 puissance 6.",
    },
    geste: {
      titre: "Un algorithme",
      texte: "Un algorithme est une suite d'instructions, dans l'ordre, pour obtenir un résultat — comme une recette de cuisine.",
    },
    defi: {
      enonce: "Écris 45 000 en écriture scientifique.",
      correction: "4,5 × 10 puissance 4.",
    },
  },
  {
    numero: 17,
    semaine: 4,
    badge: "Calligraphe des formules",
    maths: {
      calcul: [
        { q: "3x + 2x =", r: "5x" },
        { q: "7x − 4x =", r: "3x" },
        { q: "x + x + x =", r: "3x" },
        { q: "2a + 5a =", r: "7a" },
        { q: "6y − y =", r: "5y" },
      ],
      probleme: {
        enonce: "Un triangle a ses trois côtés de longueur x. Exprime son périmètre, sous forme réduite.",
        correction: "x + x + x = 3x.",
      },
      illu: { emoji: "✍️", label: "calligraphie" },
    },
    francais: {
      regleTitre: "Types et formes de phrases",
      regle:
        "Type : déclarative, interrogative, exclamative, injonctive. Forme : affirmative ou négative.",
      consigne: "Donne le type de chaque phrase.",
      items: ["Quel voyage !", "Pars-tu demain ?", "Range tes affaires."],
      correction: "exclamative — interrogative — injonctive.",
    },
    mot: {
      mot: "Réduire",
      nature: "verbe, maths",
      definition: "Réduire une expression, c'est regrouper les termes semblables.",
      exemple: "3x + 2x = 5x.",
    },
    geste: {
      titre: "Une boucle",
      texte: "En programmation, une boucle répète plusieurs fois les mêmes instructions, sans tout réécrire.",
    },
    defi: {
      enonce: "Réduis l'expression 5x + 3 − 2x + 4.",
      correction: "3x + 7.",
    },
  },
  {
    numero: 18,
    semaine: 4,
    badge: "Bâtisseur d'expressions",
    maths: {
      calcul: [
        { q: "2(x + 3) =", r: "2x + 6" },
        { q: "3(a + 1) =", r: "3a + 3" },
        { q: "5(2 + y) =", r: "10 + 5y" },
        { q: "4(x − 2) =", r: "4x − 8" },
        { q: "9 × 8 =", r: "72" },
      ],
      probleme: {
        enonce: "Un rectangle a pour longueur (x + 5) et pour largeur 3. Exprime son aire développée.",
        correction: "3 × (x + 5) = 3x + 15.",
      },
      illu: { emoji: "🧮", label: "calcul littéral" },
    },
    francais: {
      regleTitre: "Comparaison et métaphore",
      regle:
        "La comparaison utilise un outil (comme, tel) ; la métaphore rapproche sans outil.",
      consigne: "Comparaison (C) ou métaphore (M) ?",
      items: ["la mer, douce comme un drap", "la ville est une fourmilière", "fort comme un bœuf"],
      correction: "C — M — C.",
    },
    mot: {
      mot: "Développer",
      nature: "verbe, maths",
      definition: "Développer, c'est transformer un produit en somme.",
      exemple: "2 × (x + 3) = 2x + 6.",
    },
    geste: {
      titre: "Une condition (si… alors…)",
      texte: "En programmation, une condition fait un choix : « si la réponse est juste, alors gagne un point ».",
    },
    defi: {
      enonce: "Développe 4(x + 6).",
      correction: "4x + 24.",
    },
  },
  {
    numero: 19,
    semaine: 4,
    badge: "Chercheur d'inconnues",
    maths: {
      calcul: [
        { q: "x + 4 = 9 → x =", r: "5" },
        { q: "x − 3 = 7 → x =", r: "10" },
        { q: "2x = 12 → x =", r: "6" },
        { q: "x ÷ 2 = 5 → x =", r: "10" },
        { q: "3x = 21 → x =", r: "7" },
      ],
      probleme: {
        enonce: "Je pense à un nombre, je le multiplie par 4, puis j'enlève 6 : j'obtiens 30. Quel est ce nombre ?",
        correction: "4x − 6 = 30 → 4x = 36 → x = 9.",
      },
      illu: { emoji: "🔍", label: "loupe" },
    },
    francais: {
      regleTitre: "Personnification et hyperbole",
      regle:
        "La personnification prête une attitude humaine à une chose ; l'hyperbole exagère.",
      consigne: "Personnification (P) ou hyperbole (H) ?",
      items: ["Le vent murmure.", "Une valise lourde comme un éléphant.", "La mer en colère."],
      correction: "P — H — P.",
    },
    mot: {
      mot: "Équation",
      nature: "nom, maths",
      definition: "Une équation est une égalité avec une inconnue (souvent x) à trouver.",
      exemple: "x + 4 = 9 a pour solution x = 5.",
    },
    geste: {
      titre: "Le code et le débogage",
      texte: "Quand un programme ne marche pas, on cherche l'erreur (le « bug ») et on la corrige : c'est le débogage.",
    },
    defi: {
      enonce: "Résous l'équation 2x + 5 = 17.",
      correction: "x = 6 (2x = 12).",
    },
  },
  {
    numero: 20,
    semaine: 4,
    badge: "Cap sur le Japon",
    maths: {
      calcul: [
        { q: "180 km en 2 h = ? km/h", r: "90" },
        { q: "100 km à 50 km/h = ? h", r: "2" },
        { q: "60 × 3 =", r: "180" },
        { q: "300 ÷ 5 =", r: "60" },
        { q: "1/2 de 90 =", r: "45" },
      ],
      probleme: {
        enonce: "Le paquebot traverse 600 km du Pacifique en 12 h. Quelle est sa vitesse moyenne ?",
        correction: "600 ÷ 12 = 50. Cinquante kilomètres par heure.",
      },
      illu: { emoji: "🌊", label: "océan Pacifique" },
    },
    francais: {
      regleTitre: "Les registres de langue",
      regle: "Familier, courant, soutenu : on adapte selon la situation et la personne.",
      consigne: "Familier, courant ou soutenu ?",
      items: ["la baraque", "la maison", "la demeure"],
      correction: "familier — courant — soutenu.",
    },
    mot: {
      mot: "Vitesse moyenne",
      nature: "expression, maths",
      definition: "La vitesse moyenne = distance totale ÷ durée totale.",
      exemple: "600 km en 12 h : 600 ÷ 12 = 50 km/h.",
    },
    geste: {
      titre: "Les données personnelles et le RGPD",
      texte: "La loi (RGPD) protège tes données : tu peux demander à voir, corriger ou supprimer ce qu'un site sait sur toi.",
    },
    defi: {
      enonce: "Un train parcourt 240 km en 3 h. Quelle distance en 5 h à la même vitesse ?",
      correction: "400 km (80 km/h).",
    },
  },

  /* ===================== SEMAINE 5 · Le Japon ===================== */
  {
    numero: 21,
    semaine: 5,
    badge: "Maître des volumes",
    maths: {
      calcul: [
        { q: "4 × 3 × 2 =", r: "24" },
        { q: "5 × 5 × 5 =", r: "125" },
        { q: "2 × 2 × 2 =", r: "8" },
        { q: "10 × 10 × 1 =", r: "100" },
        { q: "1000 ÷ 8 =", r: "125" },
      ],
      probleme: {
        enonce: "Une malle de voyage est un pavé de 80 cm × 50 cm × 40 cm. Quel est son volume (en cm³) ?",
        correction: "80 × 50 × 40 = 160 000. Son volume est 160 000 cm³.",
      },
      illu: { emoji: "🧳", label: "malle" },
    },
    francais: {
      regleTitre: "Sens propre, sens figuré, polysémie",
      regle:
        "Un mot a un sens propre (premier) et parfois des sens figurés (imagés). Beaucoup de mots ont plusieurs sens.",
      consigne: "Sens propre (P) ou figuré (F) ?",
      items: ["Il dévore son repas.", "Il dévore un roman.", "Une route droite."],
      correction: "P — F — P.",
    },
    mot: {
      mot: "Prisme",
      nature: "nom, maths",
      definition: "Un prisme droit a deux faces identiques (les bases) reliées par des rectangles.",
      exemple: "Un pavé est un prisme à base rectangle.",
    },
    geste: {
      titre: "La géolocalisation",
      texte: "Ton téléphone peut indiquer où tu es : on n'active la localisation que quand c'est utile, et pas pour tout le monde.",
    },
    defi: {
      enonce: "Un cube a une arête de 6 cm. Quel est son volume ?",
      correction: "216 cm³ (6 × 6 × 6).",
    },
  },
  {
    numero: 22,
    semaine: 5,
    badge: "Géomètre des angles",
    maths: {
      calcul: [
        { q: "180 − (70 + 60) =", r: "50" },
        { q: "180 − 90 − 45 =", r: "45" },
        { q: "60 + 60 + 60 =", r: "180" },
        { q: "180 − 100 =", r: "80" },
        { q: "7 × 8 =", r: "56" },
      ],
      probleme: {
        enonce: "Un triangle isocèle a un angle au sommet de 40°. Combien valent les deux angles de la base ?",
        correction: "(180 − 40) ÷ 2 = 70. Chaque angle de la base mesure 70°.",
      },
      illu: { emoji: "📐", label: "équerre" },
    },
    francais: {
      regleTitre: "Le champ lexical",
      regle: "Le champ lexical, ce sont tous les mots qui se rapportent à un même thème.",
      consigne: "Quel thème relie ces mots ?",
      items: ["voile, ancre, pont, cap, marin"],
      correction: "le thème de la mer et de la navigation.",
    },
    mot: {
      mot: "Isocèle",
      nature: "adjectif, maths",
      definition: "Un triangle isocèle a deux côtés (et deux angles) égaux.",
      exemple: "Si l'angle au sommet est 40°, les deux autres valent 70°.",
    },
    geste: {
      titre: "Les formats et la compression",
      texte: "Une photo en haute qualité est lourde ; on peut la compresser (réduire son poids) pour l'envoyer plus vite.",
    },
    defi: {
      enonce: "Deux angles d'un triangle valent 55° et 65°. Combien mesure le troisième ?",
      correction: "60° (180 − 120).",
    },
  },
  {
    numero: 23,
    semaine: 5,
    badge: "Lecteur de parallèles",
    maths: {
      calcul: [
        { q: "angle correspondant de 65° =", r: "65°" },
        { q: "180 − 65 =", r: "115" },
        { q: "90 + 90 =", r: "180" },
        { q: "8 × 9 =", r: "72" },
        { q: "120 ÷ 4 =", r: "30" },
      ],
      probleme: {
        enonce: "Deux droites parallèles sont coupées par une sécante. Un angle mesure 70°. Combien mesure son angle correspondant ?",
        correction: "70°. Les angles correspondants sont égaux.",
      },
      illu: { emoji: "🛤️", label: "rails parallèles" },
    },
    francais: {
      regleTitre: "Les mots d'origine latine et grecque",
      regle:
        "Beaucoup de mots savants viennent du latin et du grec : « géo » = la Terre, « graphie » = écrire → géographie.",
      consigne: "Que veulent dire ces racines ?",
      items: ["aqua-", "thermo-", "chrono-"],
      correction: "eau — chaleur — temps.",
    },
    mot: {
      mot: "Sécante",
      nature: "nom, maths",
      definition: "Une sécante est une droite qui en coupe deux autres (souvent deux parallèles).",
      exemple: "Une sécante coupe deux parallèles en formant des angles égaux.",
    },
    geste: {
      titre: "Le travail collaboratif",
      texte: "Plusieurs personnes peuvent écrire dans le même document en ligne, chacune voyant les changements des autres.",
    },
    defi: {
      enonce: "Un angle et son alterne-interne : si l'un vaut 50°, combien vaut l'autre ?",
      correction: "50° (ils sont égaux).",
    },
  },
  {
    numero: 24,
    semaine: 5,
    badge: "Funambule des figures",
    maths: {
      calcul: [
        { q: "3 + 3 + 3 + 3 =", r: "12" },
        { q: "avance de 5, répétée 4 fois =", r: "20" },
        { q: "(−2) + (−2) + (−2) =", r: "−6" },
        { q: "6 × 4 =", r: "24" },
        { q: "1/2 de 360 =", r: "180" },
      ],
      probleme: {
        enonce: "Par une translation, un bateau avance de 4 cases vers l'est, répétée 3 fois. De combien de cases avance-t-il ?",
        correction: "4 × 3 = 12. Il avance de 12 cases vers l'est.",
      },
      illu: { emoji: "🔁", label: "translation" },
    },
    francais: {
      regleTitre: "Synonymes, antonymes, homonymes",
      regle:
        "Synonyme = sens proche ; antonyme = sens contraire ; homonyme = même son, sens différent.",
      consigne: "Donne le lien entre les deux mots.",
      items: ["grand / immense", "vrai / faux", "ver / verre"],
      correction: "synonymes — antonymes — homonymes.",
    },
    mot: {
      mot: "Translation",
      nature: "nom, maths",
      definition: "Une translation fait glisser une figure d'une même distance et dans un même sens.",
      exemple: "Glisser un point de 3 vers la droite et 2 vers le haut.",
    },
    geste: {
      titre: "La nétiquette",
      texte: "En ligne, on reste poli : pas de majuscules qui crient, on relit avant d'envoyer, on respecte les autres.",
    },
    defi: {
      enonce: "Un point glisse de 3 vers la droite et 2 vers le haut, 5 fois de suite. Quel déplacement total ?",
      correction: "15 vers la droite et 10 vers le haut.",
    },
  },
  {
    numero: 25,
    semaine: 5,
    badge: "Cap sur l'Amérique",
    maths: {
      calcul: [
        { q: "3² + 4² =", r: "25" },
        { q: "racine de 25 =", r: "5" },
        { q: "5² =", r: "25" },
        { q: "6² + 8² =", r: "100" },
        { q: "racine de 100 =", r: "10" },
      ],
      probleme: {
        enonce: "Un triangle rectangle a deux petits côtés de 3 m et 4 m. Quelle est la longueur du grand côté (l'hypoténuse) ?",
        correction: "3² + 4² = 9 + 16 = 25 ; racine de 25 = 5. L'hypoténuse mesure 5 m.",
      },
      illu: { emoji: "📏", label: "triangle rectangle" },
    },
    francais: {
      regleTitre: "Préfixes et suffixes",
      regle:
        "Le préfixe se place avant le radical (re-faire), le suffixe après (voyage-ur).",
      consigne: "Forme un mot avec le préfixe ou le suffixe.",
      items: ["re- + faire", "in- + connu", "voyage + -ur"],
      correction: "refaire — inconnu — voyageur.",
    },
    mot: {
      mot: "Hypoténuse",
      nature: "nom, maths",
      definition: "Dans un triangle rectangle, l'hypoténuse est le plus grand côté, face à l'angle droit.",
      exemple: "Côtés 3 et 4 → hypoténuse 5.",
    },
    geste: {
      titre: "L'esprit critique face à une IA",
      texte: "Une IA peut inventer des réponses fausses avec aplomb : on vérifie toujours ce qu'elle affirme.",
    },
    defi: {
      enonce: "Un triangle rectangle a des côtés de 6 et 8. Quelle est la longueur de l'hypoténuse ?",
      correction: "10, car 6² + 8² = 100 = 10².",
    },
  },

  /* ===================== SEMAINE 6 · L'Amérique, retour à Londres ===================== */
  {
    numero: 26,
    semaine: 6,
    badge: "Conquérant de Pythagore",
    maths: {
      calcul: [
        { q: "5² − 3² =", r: "16" },
        { q: "racine de 16 =", r: "4" },
        { q: "8² =", r: "64" },
        { q: "9² + 12² =", r: "225" },
        { q: "racine de 225 =", r: "15" },
      ],
      probleme: {
        enonce: "Une échelle de 5 m a son pied posé à 3 m du mur. À quelle hauteur touche-t-elle le mur ?",
        correction: "5² − 3² = 25 − 9 = 16 ; racine de 16 = 4. Elle atteint 4 m de haut.",
      },
      illu: { emoji: "🪜", label: "échelle" },
    },
    francais: {
      regleTitre: "Les degrés de l'adjectif",
      regle:
        "Le comparatif (plus grand que) et le superlatif (le plus grand) expriment l'intensité.",
      consigne: "Comparatif (C) ou superlatif (S) ?",
      items: ["plus rapide que le train", "le plus long fleuve", "moins cher que l'avion"],
      correction: "C — S — C.",
    },
    mot: {
      mot: "Coefficient multiplicateur",
      nature: "expression, maths",
      definition: "Augmenter de 10 %, c'est multiplier par 1,1 ; baisser de 20 %, c'est multiplier par 0,8.",
      exemple: "100 € + 10 % = 100 × 1,1 = 110 €.",
    },
    geste: {
      titre: "Vérifier avec plusieurs sources",
      texte: "Une seule source ne suffit pas : une information se confirme en la retrouvant sur plusieurs sites sérieux.",
    },
    defi: {
      enonce: "Un triangle rectangle a une hypoténuse de 13 et un côté de 5. Quelle est la longueur du 3e côté ?",
      correction: "12, car 13² − 5² = 169 − 25 = 144 = 12².",
    },
  },
  {
    numero: 27,
    semaine: 6,
    badge: "As des pourcentages",
    maths: {
      calcul: [
        { q: "100 + 10 % =", r: "110" },
        { q: "110 + 10 % =", r: "121" },
        { q: "200 − 50 % =", r: "100" },
        { q: "80 + 25 % =", r: "100" },
        { q: "60 − 10 % =", r: "54" },
      ],
      probleme: {
        enonce: "Un billet à 100 $ augmente de 10 %, puis encore de 10 %. Quel est le prix final ?",
        correction: "100 × 1,1 = 110 ; 110 × 1,1 = 121. Il coûte 121 $.",
      },
      illu: { emoji: "📈", label: "courbe de prix" },
    },
    francais: {
      regleTitre: "Les connecteurs logiques",
      regle:
        "Ils relient les idées : d'abord, ensuite, enfin (ordre) ; car, donc, mais (logique).",
      consigne: "Quel connecteur convient ?",
      items: ["Il pleut, … il prend un parapluie. (donc/mais)", "Il est fatigué … il continue. (donc/mais)"],
      correction: "donc — mais.",
    },
    mot: {
      mot: "Probabilité",
      nature: "nom, maths",
      definition: "La probabilité mesure la chance qu'un événement se produise, entre 0 (impossible) et 1 (certain).",
      exemple: "Tirer pile : probabilité 1/2.",
    },
    geste: {
      titre: "Identité numérique et e-réputation",
      texte: "Ce que tu publies façonne ton image en ligne ; un jour, un employeur ou une école pourra la voir.",
    },
    defi: {
      enonce: "Un prix de 50 € baisse de 20 %, puis augmente de 20 %. Quel est le prix final ?",
      correction: "48 € (50 → 40 → 48). On ne retrouve pas 50 € !",
    },
  },
  {
    numero: 28,
    semaine: 6,
    badge: "Joueur de hasard",
    maths: {
      calcul: [
        { q: "P(6) sur un dé =", r: "1/6" },
        { q: "P(pile) =", r: "1/2" },
        { q: "P(nombre pair sur un dé) =", r: "1/2" },
        { q: "P(rouge ; 2 rouges sur 10) =", r: "1/5" },
        { q: "6 × 6 =", r: "36" },
      ],
      probleme: {
        enonce: "Dans un sac : 3 billes rouges et 7 bleues. Quelle est la probabilité de tirer une rouge ?",
        correction: "3 chances sur 10, soit une probabilité de 3/10.",
      },
      illu: { emoji: "🎲", label: "dé" },
    },
    francais: {
      regleTitre: "Écrire une lettre",
      regle:
        "Une lettre a un lieu et une date, une formule d'appel (Cher…), un corps, une formule de politesse et une signature.",
      consigne: "Remets ces éléments dans l'ordre.",
      items: ["Signature", "Cher ami", "Formule de politesse", "Corps de la lettre"],
      correction: "Cher ami → corps de la lettre → formule de politesse → signature.",
    },
    mot: {
      mot: "Issue",
      nature: "nom, maths",
      definition: "Une issue est un résultat possible d'une expérience (pile, ou 6, ou rouge…).",
      exemple: "Un dé a 6 issues possibles.",
    },
    geste: {
      titre: "Le temps d'écran et l'attention",
      texte: "Trop d'écran fatigue et disperse : on fait des pauses, et on coupe les notifications pour mieux se concentrer.",
    },
    defi: {
      enonce: "On lance un dé. Quelle est la probabilité d'obtenir un nombre supérieur à 4 ?",
      correction: "2/6 = 1/3 (les issues 5 et 6).",
    },
  },
  {
    numero: 29,
    semaine: 6,
    badge: "Presque en 4ᵉ",
    maths: {
      calcul: [
        { q: "5 × 5 + 2 × 3 =", r: "31" },
        { q: "10 × 4 − 2 × 2 =", r: "36" },
        { q: "8 × 8 =", r: "64" },
        { q: "1/2 + 1/4 =", r: "3/4" },
        { q: "360 ÷ 8 =", r: "45" },
      ],
      probleme: {
        enonce: "Une cabine en forme de L : un carré de 4 m de côté collé à un rectangle de 3 m sur 2 m. Quelle aire totale ?",
        correction: "4 × 4 + 3 × 2 = 16 + 6 = 22. L'aire totale est 22 m².",
      },
      illu: { emoji: "🧩", label: "figure composée" },
    },
    francais: {
      regleTitre: "Révision : les temps",
      regle:
        "Présent, imparfait, passé simple, futur, passé composé : chacun a son emploi.",
      consigne: "Conjugue « partir » (3e personne du singulier) au temps demandé.",
      items: ["présent →", "imparfait →", "futur →"],
      correction: "il part — il partait — il partira.",
    },
    mot: {
      mot: "Aire composée",
      nature: "expression, maths",
      definition: "On calcule l'aire d'une figure compliquée en la découpant en figures simples.",
      exemple: "Un L = un carré + un rectangle.",
    },
    geste: {
      titre: "La sauvegarde et les versions",
      texte: "On sauvegarde souvent, et on garde plusieurs versions : si un fichier s'abîme, on peut revenir en arrière.",
    },
    defi: {
      enonce: "Aire d'un L : un carré 6 × 6 plus un rectangle 2 × 5 ?",
      correction: "46 (36 + 10).",
    },
  },
  {
    numero: 30,
    semaine: 6,
    badge: "Prêt pour la 4ᵉ ! 🎓",
    maths: {
      calcul: [
        { q: "40 000 ÷ 80 =", r: "500" },
        { q: "−10 + 25 =", r: "15" },
        { q: "3/4 de 200 =", r: "150" },
        { q: "2 puissance 4 =", r: "16" },
        { q: "15 % de 300 =", r: "45" },
      ],
      probleme: {
        enonce: "Ti Margo a fait le tour du monde (environ 40 000 km) en 80 jours. Quelle distance a-t-il parcourue en moyenne par jour ?",
        correction: "40 000 ÷ 80 = 500. Cinq cents kilomètres par jour en moyenne.",
      },
      illu: { emoji: "🎓", label: "diplôme" },
    },
    francais: {
      regleTitre: "Le grand bilan",
      regle:
        "Tu sais analyser une phrase complexe, conjuguer à tous les temps, reconnaître les figures de style et relier tes idées. Te voilà prêt pour la 4ᵉ !",
      consigne: "Écris 3 phrases sur ton tour du monde : une au passé, une au présent, une au futur.",
      items: ["(à toi d'écrire !)"],
      correction: "Réponse libre — vérifie les temps, les accords et la ponctuation.",
    },
    mot: {
      mot: "Bilan",
      nature: "nom",
      definition: "Faire le bilan, c'est mesurer le chemin parcouru et tout ce qu'on a appris.",
      exemple: "Quel beau bilan : direction la 4ᵉ !",
    },
    geste: {
      titre: "Citoyen numérique éclairé",
      texte: "Vérifier, protéger ses données, respecter les autres et garder l'esprit critique : tu sais agir en citoyen du numérique.",
    },
    defi: {
      enonce: "Combien d'escales principales Ti Margo a-t-il faites pendant son tour du monde ?",
      correction: "6 grandes escales (une par semaine).",
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  Défis ★★★★★ (niveau expert) — pour les élèves HPI : raisonnement, suites, */
/*  dénombrement, énigmes et pièges classiques (moyenne harmonique, hausses   */
/*  successives, fuseaux horaires…). Durs mais à la portée d'un bon 5e/6e qui */
/*  prend le temps de réfléchir. Plusieurs clins d'œil à Jules Verne.         */
/* -------------------------------------------------------------------------- */
export const defisExpert: Record<number, { enonce: string; correction: string }> = {
  1: {
    enonce: "Au départ, les 5 voyageurs se serrent tous la main une fois chacun. Combien de poignées de main en tout ?",
    correction: "10. (Chacun des 5 serre la main des 4 autres : 5 × 4 = 20, mais chaque poignée est comptée deux fois, donc 20 ÷ 2 = 10.)",
  },
  2: {
    enonce: "En 24 heures, combien de fois les deux aiguilles d'une horloge se superposent-elles exactement ?",
    correction: "22 fois. (Elles se superposent 11 fois toutes les 12 heures — pas 12 — donc 22 par jour.)",
  },
  3: {
    enonce: "En faisant le tour du monde vers l'est, Ti Margo croit avoir mis 81 jours, mais n'en a mis que 80. Pourquoi a-t-il « gagné » un jour ?",
    correction: "En allant vers l'est, on traverse les 24 fuseaux horaires et on avance sa montre d'1 h à chaque fois : sur un tour complet, cela fait 24 h gagnées, soit un jour entier. (C'est la fin du roman de Jules Verne !)",
  },
  4: {
    enonce: "Deux trains se font face, distants de 400 km : l'un roule à 90 km/h, l'autre à 110 km/h. Dans combien de temps se croisent-ils ?",
    correction: "2 heures. (Ils se rapprochent à 90 + 110 = 200 km/h ; 400 ÷ 200 = 2 h.)",
  },
  5: {
    enonce: "Avec les chiffres 1, 2, 3, 4 et 5 (chacun une seule fois) et les signes + − × ÷ et des parenthèses, écris un calcul qui donne 100.",
    correction: "Par exemple 5 × 4 × (3 + 2) × 1 = 20 × 5 = 100. (D'autres solutions existent !)",
  },
  6: {
    enonce: "Le produit de plusieurs nombres relatifs est négatif. Que peut-on dire du nombre de facteurs négatifs ?",
    correction: "Il y en a un nombre impair. (Pair de signes « − » → résultat positif ; impair → négatif.)",
  },
  7: {
    enonce: "Combien vaut (−2) × (−3) × (−1) × (−1), et quel est le signe de (−1) puissance 7 ?",
    correction: "Le produit vaut 6 (quatre facteurs négatifs = pair → positif). (−1) puissance 7 = −1 (exposant impair → négatif).",
  },
  8: {
    enonce: "Un carré et un rectangle ont le même périmètre, 24 m. Le rectangle mesure 8 m sur 4 m. Lequel a la plus grande aire, et de combien ?",
    correction: "Le carré (6 × 6 = 36 m²) dépasse le rectangle (8 × 4 = 32 m²), de 4 m². (À périmètre égal, le carré gagne toujours.)",
  },
  9: {
    enonce: "Combien de diagonales possède un octogone (polygone à 8 côtés) ?",
    correction: "20. (Formule n × (n − 3) ÷ 2 = 8 × 5 ÷ 2 = 20.)",
  },
  10: {
    enonce: "Sur une carte à l'échelle 1/1 000 000, le canal de Suez mesure environ 160 km. Quelle longueur cela fait-il sur la carte ?",
    correction: "16 cm. (160 km = 16 000 000 cm ; ÷ 1 000 000 = 16 cm.)",
  },
  11: {
    enonce: "Trouve trois fractions différentes, toutes de numérateur 1, dont la somme fait exactement 1.",
    correction: "1/2 + 1/3 + 1/6 = 1. (En effet 3/6 + 2/6 + 1/6 = 6/6 = 1.)",
  },
  12: {
    enonce: "Ti Margo dépense 1/3 de ses roupies, puis 1/4 du reste, puis la moitié du nouveau reste. Quelle fraction de son argent lui reste-t-il ?",
    correction: "1/4. (Reste 2/3 ; × 3/4 = 1/2 ; × 1/2 = 1/4.)",
  },
  13: {
    enonce: "La moyenne de 5 nombres est 12. On ajoute un 6e nombre et la moyenne devient 13. Quel est ce 6e nombre ?",
    correction: "18. (Somme de 5 nombres : 60 ; somme de 6 nombres : 78 ; 78 − 60 = 18.)",
  },
  14: {
    enonce: "Dans une classe, la moyenne des 10 filles est 14 et celle des 15 garçons est 12. Quelle est la moyenne de la classe entière ?",
    correction: "12,8. ((10 × 14 + 15 × 12) ÷ 25 = (140 + 180) ÷ 25 = 320 ÷ 25 = 12,8. Ce n'est pas 13 !)",
  },
  15: {
    enonce: "Combien de zéros à la fin de 10 puissance 3 × 10 puissance 4 ? Et combien vaut 2 puissance 10 ?",
    correction: "7 zéros (10 puissance 7). Et 2 puissance 10 = 1 024.",
  },
  16: {
    enonce: "Une feuille de 0,1 mm d'épaisseur est pliée en deux 10 fois de suite. Quelle est son épaisseur finale ?",
    correction: "Environ 10 cm. (0,1 mm × 2 puissance 10 = 0,1 × 1 024 ≈ 102 mm ≈ 10 cm. Surprenant, non ?)",
  },
  17: {
    enonce: "La somme de trois nombres entiers consécutifs vaut 72. Quels sont ces trois nombres ?",
    correction: "23, 24 et 25. (Le nombre du milieu est 72 ÷ 3 = 24.)",
  },
  18: {
    enonce: "Le périmètre d'un rectangle est 30 cm. Sa longueur dépasse sa largeur de 5 cm. Quelles sont ses dimensions ?",
    correction: "Longueur 10 cm, largeur 5 cm. (L + l = 15 et L − l = 5 → L = 10, l = 5.)",
  },
  19: {
    enonce: "Le double d'un nombre, augmenté de 3, est égal à ce nombre augmenté de 10. Quel est ce nombre ?",
    correction: "7. (2x + 3 = x + 10 → x = 7.)",
  },
  20: {
    enonce: "Un bateau va de A à B à 30 km/h, et revient de B à A à 20 km/h. Quelle est sa vitesse moyenne sur l'aller-retour ?",
    correction: "24 km/h (et non 25 !). (Pour 120 km : aller 4 h, retour 6 h, soit 240 km en 10 h → 24 km/h. C'est la moyenne harmonique.)",
  },
  21: {
    enonce: "Si on double toutes les arêtes d'un cube, par combien son volume est-il multiplié ?",
    correction: "Par 8. (Le volume est multiplié par 2 × 2 × 2 = 8.)",
  },
  22: {
    enonce: "Un cube de 10 cm d'arête (volume 1 000 cm³) et un cylindre de hauteur 10 cm et de rayon 5 cm : lequel contient le plus ? (π ≈ 3,14)",
    correction: "Le cube. (Volume du cylindre = 3,14 × 5² × 10 ≈ 785 cm³, inférieur à 1 000 cm³.)",
  },
  23: {
    enonce: "Les trois angles d'un triangle sont proportionnels à 2, 3 et 4. Combien mesurent-ils ?",
    correction: "40°, 60° et 80°. (2 + 3 + 4 = 9 parts ; 180 ÷ 9 = 20 ; donc 40, 60, 80.)",
  },
  24: {
    enonce: "Deux droites parallèles sont coupées par une sécante. Un angle vaut 65°. Donne la mesure de son angle alterne-interne et de son angle correspondant.",
    correction: "65° dans les deux cas : les angles alternes-internes et les angles correspondants sont égaux.",
  },
  25: {
    enonce: "Par une translation, un point avance de 3 vers la droite et 2 vers le haut. On répète 4 fois, puis on revient en arrière de 1 fois. Position finale par rapport au départ ?",
    correction: "9 vers la droite et 6 vers le haut. (3 × 3 = 9 et 2 × 3 = 6, car 4 − 1 = 3 fois au total.)",
  },
  26: {
    enonce: "Un triangle a des côtés de 5, 12 et 13. Est-il rectangle ? Justifie.",
    correction: "Oui. (5² + 12² = 25 + 144 = 169 = 13² : d'après Pythagore, le triangle est rectangle, l'angle droit étant face au côté 13.)",
  },
  27: {
    enonce: "Un prix augmente de 10 %, puis encore de 10 %. De quel pourcentage a-t-il augmenté en tout ?",
    correction: "De 21 % (et non 20 %). (× 1,1 × 1,1 = × 1,21, soit + 21 %.)",
  },
  28: {
    enonce: "On lance deux dés et on additionne les résultats. Quelle est la probabilité d'obtenir une somme de 7 ?",
    correction: "1/6. (6 façons d'obtenir 7 : 1-6, 2-5, 3-4, 4-3, 5-2, 6-1, sur 36 résultats possibles → 6/36 = 1/6.)",
  },
  29: {
    enonce: "Trois interrupteurs en bas commandent trois ampoules à l'étage, qu'on ne voit pas d'en bas. Comment trouver, en montant une seule fois, quel interrupteur commande quelle ampoule ?",
    correction: "On allume le 1er 5 minutes, on l'éteint ; on allume le 2e et on monte aussitôt. L'ampoule allumée = interrupteur 2 ; l'éteinte mais chaude = interrupteur 1 ; l'éteinte et froide = interrupteur 3.",
  },
  30: {
    enonce: "Ti Margo a parié 20 000 £ et dépensé environ 19 000 £ pour son voyage. En remportant le pari, combien a-t-il gagné ou perdu en tout ?",
    correction: "Il gagne le pari (20 000 £) mais a dépensé 19 000 £ : il lui reste donc environ 1 000 £ de bénéfice. (Comme dans le roman, la vraie victoire est ailleurs : l'aventure et les amis !)",
  },
};

/* Le carnet de Ti Margo — récit doux et sensoriel, escale après escale. */
export const carnet: Record<number, string> = {
  1: "Aujourd'hui commence la plus folle des aventures : faire le tour du monde ! Je quitte Londres sous un ciel gris, ma valise à la main et un grand sourire. Quatre-vingts jours pour boucler la Terre… Tu m'accompagnes ?",
  2: "Le train file dans la campagne anglaise en crachant sa fumée blanche. Ces machines à vapeur, c'est tout nouveau, et ça change le monde ! Je regarde défiler les villages par la fenêtre.",
  3: "Je déplie ma grande carte du monde sur la table. Tant de pays, de mers, de montagnes ! Je trace mon itinéraire au crayon : le voyage est déjà beau, rien que sur le papier.",
  4: "Je compte mes pièces avant d'acheter mon billet de bateau. En voyage, il faut bien gérer son argent pour aller jusqu'au bout. Chaque sou compte !",
  5: "Premier grand départ en mer ! Le paquebot quitte le port, direction l'Égypte. Les mouettes nous suivent un moment, puis l'horizon s'ouvre, immense.",
  6: "Me voici en Égypte ! La chaleur est écrasante, le sable doré s'étend à perte de vue. Je grimpe sur un chameau qui se balance comme un bateau : quelle drôle de monture !",
  7: "Je longe le Nil, ce fleuve géant qui traverse le désert. Sans lui, rien ne pousserait ici. L'eau, c'est vraiment la vie.",
  8: "Devant moi se dressent les pyramides, immenses et silencieuses. Elles sont là depuis des milliers d'années. Comment a-t-on pu bâtir des géants pareils ?",
  9: "Le paquebot s'engage dans le canal de Suez. Quelle idée géniale : couper à travers les terres pour relier deux mers et gagner des jours de voyage !",
  10: "Au revoir l'Égypte ! Le bateau met le cap sur l'Inde. Le soleil se couche sur la mer Rouge, tout est orange et calme. Demain, un nouveau monde.",
  11: "L'Inde ! Mille couleurs, mille parfums, une foule joyeuse. Un éléphant majestueux me salue de sa trompe. Je n'avais jamais rien vu d'aussi vivant.",
  12: "Au bazar, des montagnes d'épices : safran, curcuma, cardamome. Le marchand me fait goûter, le sourire aux lèvres. Le monde a vraiment le goût du voyage !",
  13: "Je traverse l'Inde en train, de Bombay vers Calcutta. Les paysages changent à chaque heure : forêts, rivières, rizières. Mon carnet se remplit vite !",
  14: "Je note dans un tableau tout ce que je vois : les villes, les distances, les jours. Mettre de l'ordre dans ses découvertes, ça aide à mieux les comprendre.",
  15: "Dernier soir en Inde, sous un ciel plein d'étoiles. Demain, cap sur la Chine et ses lanternes. J'ai hâte !",
  16: "Hong Kong ! Le port grouille de jonques et de bateaux à vapeur. Le soir, des milliers de lanternes rouges s'allument : la ville brille comme un trésor.",
  17: "Un calligraphe m'apprend à tracer des signes au pinceau. Chaque geste est lent et précis. La patience est un art, ici.",
  18: "Je goûte des plats inconnus, avec des baguettes ! Au début je fais tout tomber, puis j'y arrive. Voyager, c'est apprendre sans cesse.",
  19: "Le brouillard se lève sur la baie. Le bateau pour le Japon m'attend. Je vérifie l'heure : surtout, ne pas le manquer !",
  20: "Le paquebot s'élance sur l'immense océan Pacifique. Plus aucune terre en vue, juste le bleu à l'infini. On se sent tout petit, et c'est merveilleux.",
  21: "Le Japon ! Des temples paisibles, des jardins parfaits, le mont Fuji au loin coiffé de neige. Tout est délicat et plein d'harmonie.",
  22: "Je bois un thé vert dans une petite tasse ronde. On m'explique chaque geste de la cérémonie. Ici, même boire un thé devient une fête.",
  23: "Je me promène sous les cerisiers. Quelques pétales tombent et tournoient dans l'air. Je voudrais que cet instant dure toujours.",
  24: "Sur le port de Yokohama, je regarde les bateaux partir et arriver, bien rangés. Le grand voyage continue : prochaine escale, l'Amérique !",
  25: "Le Pacifique défile, jour après jour. Je repense à tous ces pays traversés. La Terre est immense… et pourtant, on en fait le tour !",
  26: "San Francisco ! Je débarque dans le Far West. Je monte dans un train qui traverse tout le continent, des montagnes aux grandes plaines. En avant vers l'est !",
  27: "Le train file vers New York. Des troupeaux, des fleuves, des villes qui grandissent à toute vitesse : l'Amérique déborde d'énergie. Quel spectacle !",
  28: "À New York, les gratte-ciel montent vers le ciel. Je saute sur le dernier bateau pour Londres : le pari touche à sa fin, mon cœur bat fort !",
  29: "Plus que quelques heures de mer. Je relis mon carnet : l'Égypte, l'Inde, la Chine, le Japon, l'Amérique… Quel voyage ! Je me sens grandi, prêt pour la 4ᵉ.",
  30: "Ça y est : de retour à Londres, j'ai bouclé le tour du monde ! La tête pleine de pays et d'amis, je suis fin prêt pour la 4ᵉ. Merci d'avoir fait le tour de la Terre avec moi : on a réussi, ensemble ! 🎓",
};

/* « Le savais-tu ? » — ancrage local 🌺 / ouverture monde 🌍, au fil du tour du monde. */
export const leSaviasTu: Record<number, { portee: "local" | "monde"; texte: string }> = {
  1: { portee: "monde", texte: "« Le Tour du monde en 80 jours » a été écrit par Jules Verne en 1872 : son héros, Phileas Fogg, parie qu'il fera le tour de la Terre dans ce temps." },
  2: { portee: "monde", texte: "Au XIXe siècle, le train à vapeur a tout changé : on pouvait traverser un pays en quelques heures au lieu de plusieurs jours." },
  3: { portee: "local", texte: "La Réunion aussi a eu son chemin de fer au XIXe siècle : un petit train longeait la côte d'une ville à l'autre." },
  4: { portee: "monde", texte: "La livre sterling (£) est la monnaie du Royaume-Uni ; c'est l'une des plus anciennes monnaies encore utilisées." },
  5: { portee: "monde", texte: "Un paquebot est un grand navire à passagers ; au XIXe siècle, c'était la seule façon de traverser les océans." },
  6: { portee: "monde", texte: "L'Égypte est traversée par le Nil, le plus long fleuve d'Afrique, sur près de 6 700 km." },
  7: { portee: "monde", texte: "Sans le Nil, l'Égypte serait un désert : presque tous les habitants vivent le long de ses rives." },
  8: { portee: "monde", texte: "La grande pyramide de Gizeh, vieille de plus de 4 500 ans, est restée le plus haut monument du monde pendant près de 4 000 ans." },
  9: { portee: "monde", texte: "Le canal de Suez, ouvert en 1869, relie la Méditerranée à la mer Rouge : il évite de contourner toute l'Afrique." },
  10: { portee: "local", texte: "La Réunion se trouve justement sur l'ancienne route des Indes, que le canal de Suez a beaucoup raccourcie." },
  11: { portee: "monde", texte: "L'Inde est aujourd'hui le pays le plus peuplé du monde, avec plus d'un milliard et demi d'habitants." },
  12: { portee: "local", texte: "Beaucoup de Réunionnais ont des ancêtres venus d'Inde : on le retrouve dans la cuisine, les fêtes et les temples de l'île." },
  13: { portee: "monde", texte: "Le zéro et notre façon d'écrire les nombres (1, 2, 3…) sont nés en Inde, il y a très longtemps." },
  14: { portee: "monde", texte: "Le thé, cultivé en Inde et en Chine, est la boisson la plus bue au monde après l'eau." },
  15: { portee: "monde", texte: "La Grande Muraille de Chine s'étire sur plus de 20 000 km : c'est la plus longue construction humaine." },
  16: { portee: "monde", texte: "Hong Kong est l'un des ports les plus actifs du monde : des milliers de conteneurs y transitent chaque jour." },
  17: { portee: "monde", texte: "L'écriture chinoise n'utilise pas de lettres mais des milliers de caractères, chacun représentant un mot ou une idée." },
  18: { portee: "monde", texte: "La boussole, le papier et l'imprimerie ont d'abord été inventés en Chine, il y a très longtemps." },
  19: { portee: "monde", texte: "L'océan Pacifique est le plus grand océan du monde : il couvre à lui seul près d'un tiers de la planète." },
  20: { portee: "local", texte: "Comme La Réunion, beaucoup d'îles du Pacifique sont nées de volcans surgis du fond de l'océan." },
  21: { portee: "monde", texte: "Le mont Fuji, au Japon, est un volcan endormi de 3 776 m, devenu un symbole du pays." },
  22: { portee: "monde", texte: "Au Japon, la cérémonie du thé est un art ancien, où chaque geste a un sens précis." },
  23: { portee: "monde", texte: "Au milieu du Pacifique passe la ligne de changement de date : en la franchissant, on change de jour !" },
  24: { portee: "monde", texte: "Yokohama est devenue un grand port quand le Japon s'est ouvert au commerce avec le monde, au XIXe siècle." },
  25: { portee: "local", texte: "La Réunion est, elle aussi, un carrefour entre les continents : l'Afrique, l'Asie et l'Europe s'y rencontrent." },
  26: { portee: "monde", texte: "Au XIXe siècle, un chemin de fer a traversé tous les États-Unis : on pouvait enfin aller d'un océan à l'autre en train." },
  27: { portee: "monde", texte: "New York a grandi si vite qu'on la surnomme « la ville qui ne dort jamais » ; ses gratte-ciel sont parmi les plus hauts du monde." },
  28: { portee: "monde", texte: "En faisant le tour de la Terre vers l'est, on gagne une journée entière : c'est tout le secret de la fin du roman de Jules Verne !" },
  29: { portee: "local", texte: "Depuis La Réunion, imaginer le tour du monde est facile : l'île est déjà au croisement de l'Afrique, de l'Asie et de l'Europe." },
  30: { portee: "monde", texte: "En 4ᵉ, en histoire et en géographie, tu étudieras justement le XIXe siècle, les révolutions et la mondialisation : ce cahier t'y prépare !" },
};
