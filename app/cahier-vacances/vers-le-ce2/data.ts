/* -------------------------------------------------------------------------- */
/*  Données du cahier de vacances « En route pour le CE2 » (CE1 → CE2).        */
/*  Angle fort (demande fondateur) : on APPREND EN JOUANT. Chaque semaine =    */
/*  un type de jeu (cour, société, construction, énigmes, plein air, fête),    */
/*  et les maths / le français se glissent dans le jeu (scores, dés, points).  */
/*  Niveau CE1 : révision + avant-goût du CE2. Texte simple, SANS LaTeX,       */
/*  phrases courtes (jeunes lecteurs). Défis ★★★★★ = énigmes malines (HPI).    */
/*  Moteur d'affichage commun : components/cahier/CahierVacances.tsx.          */
/* -------------------------------------------------------------------------- */

import type { Etape, Jour } from "@/components/cahier/types";

/** Les 6 jeux de l'été (un par semaine). */
export const parcours: Etape[] = [
  { semaine: 1, etape: 1, emoji: "🪀", lieu: "Les jeux de la cour", intro: "L'été des jeux commence dans la cour : billes, marelle, corde !" },
  { semaine: 2, etape: 2, emoji: "🎲", lieu: "Les jeux de société", intro: "On s'installe pour jouer aux dés, aux cartes et au plateau." },
  { semaine: 3, etape: 3, emoji: "🧱", lieu: "Les jeux de construction", intro: "On bâtit des tours et des châteaux avec des cubes." },
  { semaine: 4, etape: 4, emoji: "🧩", lieu: "Les jeux d'énigmes", intro: "Place aux devinettes, aux suites et aux casse-têtes." },
  { semaine: 5, etape: 5, emoji: "⚽", lieu: "Les jeux de plein air", intro: "On court, on saute et on marque des buts dehors !" },
  { semaine: 6, etape: 6, emoji: "🎉", lieu: "La grande fête des jeux", intro: "Dernière étape : la fête, et cap sur le CE2 !" },
];

export const jours: Jour[] = [
  /* ===================== SEMAINE 1 · Les jeux de la cour ===================== */
  {
    numero: 1,
    semaine: 1,
    badge: "Champion des billes",
    maths: {
      calcul: [
        { q: "5 + 5 =", r: "10" },
        { q: "7 + 3 =", r: "10" },
        { q: "8 + 6 =", r: "14" },
        { q: "10 + 4 =", r: "14" },
        { q: "2 + 9 =", r: "11" },
      ],
      probleme: {
        enonce: "Ti Margo gagne 8 billes le matin et 6 billes l'après-midi. Combien de billes a-t-il gagnées en tout ?",
        correction: "8 + 6 = 14. Quatorze billes.",
      },
      illu: { emoji: "🔵", label: "billes" },
    },
    francais: {
      regleTitre: "La phrase",
      regle: "Une phrase commence par une majuscule et finit par un point.",
      consigne: "Recopie avec la majuscule et le point.",
      items: ["ti margo joue aux billes", "léa saute à la corde", "les enfants rient"],
      correction: "Ti Margo joue aux billes. — Léa saute à la corde. — Les enfants rient.",
    },
    mot: {
      mot: "Addition",
      nature: "nom, maths",
      definition: "Une addition, c'est quand on ajoute des nombres ensemble.",
      exemple: "8 + 6 = 14.",
    },
    geste: {
      titre: "Un jeu sur tablette",
      texte: "Sur la tablette, on peut jouer à des jeux ; on choisit des jeux pour son âge.",
    },
    defi: {
      enonce: "Quel nombre vient juste après 10 ?",
      correction: "11.",
    },
  },
  {
    numero: 2,
    semaine: 1,
    badge: "As de la marelle",
    maths: {
      calcul: [
        { q: "10 − 4 =", r: "6" },
        { q: "12 − 5 =", r: "7" },
        { q: "9 − 3 =", r: "6" },
        { q: "15 − 5 =", r: "10" },
        { q: "8 − 2 =", r: "6" },
      ],
      probleme: {
        enonce: "Ti Margo a 12 billes. Il en perd 5 à la partie. Combien lui en reste-t-il ?",
        correction: "12 − 5 = 7. Sept billes.",
      },
      illu: { emoji: "🦶", label: "marelle" },
    },
    francais: {
      regleTitre: "Les types de phrases",
      regle: "Une phrase finit par un point (.), un point d'interrogation ( ?) ou d'exclamation ( !).",
      consigne: "Quel point mettre ?",
      items: ["Tu veux jouer", "Quelle belle partie", "Léa a gagné"],
      correction: "Tu veux jouer ? — Quelle belle partie ! — Léa a gagné.",
    },
    mot: {
      mot: "Soustraction",
      nature: "nom, maths",
      definition: "Une soustraction, c'est quand on enlève un nombre.",
      exemple: "12 − 5 = 7.",
    },
    geste: {
      titre: "Lire les règles du jeu",
      texte: "Avant de jouer, on lit (ou on écoute) les règles pour bien comprendre.",
    },
    defi: {
      enonce: "Combien font 10 − 3 ?",
      correction: "7.",
    },
  },
  {
    numero: 3,
    semaine: 1,
    badge: "Roi de la corde",
    maths: {
      calcul: [
        { q: "double de 3 =", r: "6" },
        { q: "double de 5 =", r: "10" },
        { q: "moitié de 8 =", r: "4" },
        { q: "moitié de 6 =", r: "3" },
        { q: "double de 4 =", r: "8" },
      ],
      probleme: {
        enonce: "Léa saute 5 fois à la corde. Ti Margo saute le double. Combien de sauts fait Ti Margo ?",
        correction: "Le double de 5, c'est 10. Dix sauts.",
      },
      illu: { emoji: "🪢", label: "corde à sauter" },
    },
    francais: {
      regleTitre: "Le nom",
      regle: "Le nom désigne une personne, un animal ou une chose. Le nom propre prend une majuscule.",
      consigne: "Nom commun ou nom propre ?",
      items: ["bille", "Ti Margo", "corde"],
      correction: "commun — propre — commun.",
    },
    mot: {
      mot: "Double",
      nature: "nom, maths",
      definition: "Le double, c'est deux fois plus.",
      exemple: "Le double de 5, c'est 10.",
    },
    geste: {
      titre: "Gagner et perdre (fair-play)",
      texte: "Dans un jeu, on peut gagner ou perdre : on reste poli et on félicite les autres.",
    },
    defi: {
      enonce: "Quel est le double de 6 ?",
      correction: "12.",
    },
  },
  {
    numero: 4,
    semaine: 1,
    badge: "Compteur de la cour",
    maths: {
      calcul: [
        { q: "20 + 10 =", r: "30" },
        { q: "30 + 30 =", r: "60" },
        { q: "40 + 5 =", r: "45" },
        { q: "50 + 50 =", r: "100" },
        { q: "25 + 25 =", r: "50" },
      ],
      probleme: {
        enonce: "Range du plus petit au plus grand : 23, 32, 3, 30.",
        correction: "3, 23, 30, 32.",
      },
      illu: { emoji: "🔢", label: "nombres" },
    },
    francais: {
      regleTitre: "Le verbe",
      regle: "Le verbe dit l'action : jouer, courir, sauter. Il change avec le temps.",
      consigne: "Entoure le verbe.",
      items: ["Ti Margo saute.", "Les amis courent.", "Léa lance la bille."],
      correction: "saute — courent — lance.",
    },
    mot: {
      mot: "Ranger",
      nature: "verbe, maths",
      definition: "Ranger des nombres, c'est les mettre du plus petit au plus grand.",
      exemple: "3, 23, 30, 32.",
    },
    geste: {
      titre: "Le temps de jeu",
      texte: "On ne joue pas trop longtemps sur la tablette : on fait des pauses.",
    },
    defi: {
      enonce: "Quel est le plus grand : 32 ou 23 ?",
      correction: "32.",
    },
  },
  {
    numero: 5,
    semaine: 1,
    badge: "Cap sur les jeux de société",
    maths: {
      calcul: [
        { q: "complément de 6 à 10 =", r: "4" },
        { q: "complément de 3 à 10 =", r: "7" },
        { q: "complément de 8 à 10 =", r: "2" },
        { q: "complément de 15 à 20 =", r: "5" },
        { q: "5 + 5 =", r: "10" },
      ],
      probleme: {
        enonce: "Ti Margo a 6 billes. Combien lui en manque-t-il pour en avoir 10 ?",
        correction: "10 − 6 = 4. Il lui manque 4 billes.",
      },
      illu: { emoji: "🎲", label: "dé" },
    },
    francais: {
      regleTitre: "Le présent : être et avoir",
      regle: "Être : je suis, tu es, il est. Avoir : j'ai, tu as, il a.",
      consigne: "Complète avec être ou avoir.",
      items: ["Je … content. (être)", "Tu … des cartes. (avoir)", "Il … prêt. (être)"],
      correction: "suis — as — est.",
    },
    mot: {
      mot: "Complément à 10",
      nature: "expression, maths",
      definition: "Le complément à 10, c'est ce qu'il faut ajouter pour faire 10.",
      exemple: "6 + 4 = 10.",
    },
    geste: {
      titre: "Mettre un jeu en pause",
      texte: "On peut mettre le jeu en pause pour s'arrêter un instant.",
    },
    defi: {
      enonce: "Combien faut-il ajouter à 7 pour faire 10 ?",
      correction: "3.",
    },
  },

  /* ===================== SEMAINE 2 · Les jeux de société ===================== */
  {
    numero: 6,
    semaine: 2,
    badge: "Maître des dés",
    maths: {
      calcul: [
        { q: "4 + 5 =", r: "9" },
        { q: "6 + 6 =", r: "12" },
        { q: "3 + 4 + 5 =", r: "12" },
        { q: "2 + 6 =", r: "8" },
        { q: "5 + 6 =", r: "11" },
      ],
      probleme: {
        enonce: "Au jeu, Ti Margo lance 2 dés : un 4 et un 5. Quelle est la somme des deux dés ?",
        correction: "4 + 5 = 9. La somme est 9.",
      },
      illu: { emoji: "🎲", label: "deux dés" },
    },
    francais: {
      regleTitre: "Le singulier et le pluriel",
      regle: "Au pluriel, la plupart des noms prennent un -s.",
      consigne: "Écris au pluriel.",
      items: ["un dé →", "une carte →", "un jeton →"],
      correction: "des dés — des cartes — des jetons.",
    },
    mot: {
      mot: "Somme",
      nature: "nom, maths",
      definition: "La somme, c'est le résultat d'une addition.",
      exemple: "La somme de 4 et 5 est 9.",
    },
    geste: {
      titre: "Le score à l'écran",
      texte: "Dans un jeu, le score montre combien de points on a gagnés.",
    },
    defi: {
      enonce: "Quel est le plus grand score possible avec 2 dés ?",
      correction: "12 (6 + 6).",
    },
  },
  {
    numero: 7,
    semaine: 2,
    badge: "As des cartes",
    maths: {
      calcul: [
        { q: "2 × 3 =", r: "6" },
        { q: "2 × 5 =", r: "10" },
        { q: "2 × 4 =", r: "8" },
        { q: "2 × 6 =", r: "12" },
        { q: "2 × 2 =", r: "4" },
      ],
      probleme: {
        enonce: "On distribue 5 cartes à chacun des 2 joueurs. Combien de cartes distribuées en tout ?",
        correction: "2 × 5 = 10. Dix cartes.",
      },
      illu: { emoji: "🃏", label: "cartes" },
    },
    francais: {
      regleTitre: "Le masculin et le féminin",
      regle: "Pour mettre un nom au féminin, on ajoute souvent un -e.",
      consigne: "Mets au féminin.",
      items: ["un joueur →", "un gagnant →", "un ami →"],
      correction: "une joueuse — une gagnante — une amie.",
    },
    mot: {
      mot: "Table de 2",
      nature: "expression, maths",
      definition: "La table de 2, c'est compter de 2 en 2 : 2, 4, 6, 8, 10…",
      exemple: "2 × 5 = 10.",
    },
    geste: {
      titre: "Recommencer une partie",
      texte: "Si on perd, on peut recommencer une nouvelle partie. On réessaie !",
    },
    defi: {
      enonce: "Combien font 2 × 4 ?",
      correction: "8.",
    },
  },
  {
    numero: 8,
    semaine: 2,
    badge: "Champion du plateau",
    maths: {
      calcul: [
        { q: "5 × 2 =", r: "10" },
        { q: "5 × 3 =", r: "15" },
        { q: "5 × 4 =", r: "20" },
        { q: "5 × 5 =", r: "25" },
        { q: "5 × 1 =", r: "5" },
      ],
      probleme: {
        enonce: "Sur le plateau, Ti Margo avance de 5 cases à chaque tour. Combien de cases en 3 tours ?",
        correction: "5 × 3 = 15. Quinze cases.",
      },
      illu: { emoji: "🎯", label: "plateau de jeu" },
    },
    francais: {
      regleTitre: "Le présent des verbes en -er",
      regle: "Au présent : je joue, tu joues, il joue, nous jouons, vous jouez, ils jouent.",
      consigne: "Conjugue « gagner » au présent.",
      items: ["je …", "tu …", "nous …"],
      correction: "je gagne — tu gagnes — nous gagnons.",
    },
    mot: {
      mot: "Table de 5",
      nature: "expression, maths",
      definition: "La table de 5, c'est compter de 5 en 5 : 5, 10, 15, 20…",
      exemple: "5 × 3 = 15.",
    },
    geste: {
      titre: "Jouer à tour de rôle",
      texte: "À plusieurs, on joue chacun son tour : on attend patiemment.",
    },
    defi: {
      enonce: "Combien font 5 × 4 ?",
      correction: "20.",
    },
  },
  {
    numero: 9,
    semaine: 2,
    badge: "Stratège malin",
    maths: {
      calcul: [
        { q: "10 × 2 =", r: "20" },
        { q: "10 × 3 =", r: "30" },
        { q: "10 × 5 =", r: "50" },
        { q: "10 + 10 + 10 =", r: "30" },
        { q: "10 × 1 =", r: "10" },
      ],
      probleme: {
        enonce: "Chaque carte « bonus » vaut 10 points. Ti Margo en a 3. Combien de points ?",
        correction: "10 × 3 = 30. Trente points.",
      },
      illu: { emoji: "♟️", label: "stratégie" },
    },
    francais: {
      regleTitre: "Le son [o]",
      regle: "Le son [o] s'écrit o, au ou eau : un mot, une auto, un bateau.",
      consigne: "Complète : o, au ou eau.",
      items: ["un châte__ (château)", "une __to (auto)", "un dé (dos ?)"],
      correction: "château — auto — (le son [o] : o, au, eau).",
    },
    mot: {
      mot: "Table de 10",
      nature: "expression, maths",
      definition: "La table de 10, c'est compter de 10 en 10 : 10, 20, 30, 40…",
      exemple: "10 × 3 = 30.",
    },
    geste: {
      titre: "Le son du jeu (casque)",
      texte: "On met un casque pour écouter le jeu sans déranger les autres.",
    },
    defi: {
      enonce: "Combien font 10 × 4 ?",
      correction: "40.",
    },
  },
  {
    numero: 10,
    semaine: 2,
    badge: "Cap sur les constructions",
    maths: {
      calcul: [
        { q: "12 > 8 ?", r: "oui" },
        { q: "5 < 9 ?", r: "oui" },
        { q: "20 et 12 : le + grand →", r: "20" },
        { q: "15 − 5 =", r: "10" },
        { q: "8 + 8 =", r: "16" },
      ],
      probleme: {
        enonce: "Léa marque 12 points, Tom en marque 8. Qui gagne, et de combien de points ?",
        correction: "Léa gagne (12 > 8), avec 12 − 8 = 4 points d'avance.",
      },
      illu: { emoji: "🎲", label: "score" },
    },
    francais: {
      regleTitre: "Le sujet",
      regle: "Le sujet fait l'action. On le trouve avec « Qui est-ce qui ? ».",
      consigne: "Souligne le sujet.",
      items: ["Ti Margo lance le dé.", "Les amis jouent.", "Léa gagne."],
      correction: "Ti Margo — Les amis — Léa.",
    },
    mot: {
      mot: "Comparer",
      nature: "verbe, maths",
      definition: "Comparer, c'est dire quel nombre est le plus grand (>) ou le plus petit (<).",
      exemple: "12 > 8.",
    },
    geste: {
      titre: "Fermer le jeu quand on a fini",
      texte: "Quand on a fini de jouer, on ferme le jeu proprement.",
    },
    defi: {
      enonce: "Quel est le plus grand : 18 ou 15 ?",
      correction: "18.",
    },
  },

  /* ===================== SEMAINE 3 · Les jeux de construction ===================== */
  {
    numero: 11,
    semaine: 3,
    badge: "Architecte en herbe",
    maths: {
      calcul: [
        { q: "côtés d'un carré =", r: "4" },
        { q: "côtés d'un triangle =", r: "3" },
        { q: "4 + 4 =", r: "8" },
        { q: "3 + 3 =", r: "6" },
        { q: "4 + 3 =", r: "7" },
      ],
      probleme: {
        enonce: "Ti Margo construit un carré et un triangle avec des bâtonnets. Combien de bâtonnets (un par côté) ?",
        correction: "4 + 3 = 7. Sept bâtonnets.",
      },
      illu: { emoji: "🏗️", label: "construction" },
    },
    francais: {
      regleTitre: "L'accord du verbe avec le sujet",
      regle: "Si le sujet est au pluriel, le verbe prend souvent -nt.",
      consigne: "Choisis la bonne forme.",
      items: ["Les enfants (joue / jouent).", "Le cube (tombe / tombent).", "Les tours (monte / montent)."],
      correction: "jouent — tombe — montent.",
    },
    mot: {
      mot: "Côté",
      nature: "nom, maths",
      definition: "Un côté, c'est un bord droit d'une figure. Le carré a 4 côtés.",
      exemple: "Le triangle a 3 côtés.",
    },
    geste: {
      titre: "Choisir un personnage (avatar)",
      texte: "Dans un jeu, on choisit un personnage : c'est notre avatar.",
    },
    defi: {
      enonce: "Combien de côtés a un rectangle ?",
      correction: "4.",
    },
  },
  {
    numero: 12,
    semaine: 3,
    badge: "Bâtisseur de cubes",
    maths: {
      calcul: [
        { q: "6 ÷ 2 =", r: "3" },
        { q: "8 ÷ 2 =", r: "4" },
        { q: "10 ÷ 2 =", r: "5" },
        { q: "4 ÷ 2 =", r: "2" },
        { q: "2 × 6 =", r: "12" },
      ],
      probleme: {
        enonce: "Ti Margo a 6 cubes. Il fait des tours de 2 cubes. Combien de tours peut-il faire ?",
        correction: "6 ÷ 2 = 3. Trois tours.",
      },
      illu: { emoji: "🧊", label: "cubes" },
    },
    francais: {
      regleTitre: "L'adjectif",
      regle: "L'adjectif dit comment est le nom : grand, rouge, haut.",
      consigne: "Souligne l'adjectif.",
      items: ["une grande tour", "un cube rouge", "un haut château"],
      correction: "grande — rouge — haut.",
    },
    mot: {
      mot: "Partage",
      nature: "nom, maths",
      definition: "Partager, c'est faire des paquets égaux.",
      exemple: "6 cubes en tours de 2, ça fait 3 tours.",
    },
    geste: {
      titre: "Ranger après avoir joué",
      texte: "Après le jeu (sur écran ou avec des cubes), on range tout à sa place.",
    },
    defi: {
      enonce: "Avec 10 cubes, combien de tours de 2 ?",
      correction: "5.",
    },
  },
  {
    numero: 13,
    semaine: 3,
    badge: "Maître des formes",
    maths: {
      calcul: [
        { q: "4 + 4 =", r: "8" },
        { q: "double de 6 =", r: "12" },
        { q: "moitié de 10 =", r: "5" },
        { q: "5 + 5 =", r: "10" },
        { q: "3 × 2 =", r: "6" },
      ],
      probleme: {
        enonce: "Le château de Ti Margo est symétrique. À gauche il y a 4 fenêtres. Combien de fenêtres à droite ?",
        correction: "4 fenêtres : la symétrie fait les deux côtés pareils.",
      },
      illu: { emoji: "🔷", label: "formes" },
    },
    francais: {
      regleTitre: "Les accents",
      regle: "L'accent change le son : é (été), è (mère), ê (fête).",
      consigne: "Recopie avec les accents.",
      items: ["une fete", "un chateau", "l'ete"],
      correction: "une fête — un château — l'été.",
    },
    mot: {
      mot: "Symétrie",
      nature: "nom, maths",
      definition: "Deux côtés se ressemblent par pliage, comme un château bien régulier.",
      exemple: "À gauche 4 fenêtres, à droite 4 fenêtres.",
    },
    geste: {
      titre: "Ne pas jouer trop longtemps",
      texte: "Jouer, c'est bien, mais pas des heures : on s'arrête et on fait autre chose.",
    },
    defi: {
      enonce: "Un dessin symétrique a 5 points à gauche. Combien à droite ?",
      correction: "5.",
    },
  },
  {
    numero: 14,
    semaine: 3,
    badge: "Ingénieur malin",
    maths: {
      calcul: [
        { q: "1 centaine =", r: "100" },
        { q: "3 centaines =", r: "300" },
        { q: "2 centaines =", r: "200" },
        { q: "100 + 100 =", r: "200" },
        { q: "5 centaines =", r: "500" },
      ],
      probleme: {
        enonce: "Ti Margo a 3 boîtes de 100 cubes. Combien de cubes en tout ?",
        correction: "3 × 100 = 300. Trois cents cubes.",
      },
      illu: { emoji: "📦", label: "boîtes de cubes" },
    },
    francais: {
      regleTitre: "Passé, présent, futur",
      regle: "Hier = passé, aujourd'hui = présent, demain = futur.",
      consigne: "Passé, présent ou futur ?",
      items: ["Hier, j'ai joué.", "Demain, je jouerai.", "Maintenant, je joue."],
      correction: "passé — futur — présent.",
    },
    mot: {
      mot: "Centaine",
      nature: "nom, maths",
      definition: "Une centaine, c'est un paquet de cent.",
      exemple: "Dans 300, il y a 3 centaines.",
    },
    geste: {
      titre: "Demander avant d'installer",
      texte: "Avant d'installer un nouveau jeu, on demande toujours à un adulte.",
    },
    defi: {
      enonce: "Combien font 4 centaines ?",
      correction: "400.",
    },
  },
  {
    numero: 15,
    semaine: 3,
    badge: "Cap sur les énigmes",
    maths: {
      calcul: [
        { q: "100 + 50 =", r: "150" },
        { q: "200 + 30 =", r: "230" },
        { q: "300 + 300 =", r: "600" },
        { q: "100 + 100 + 100 =", r: "300" },
        { q: "250 + 250 =", r: "500" },
      ],
      probleme: {
        enonce: "Ti Margo a 100 cubes rouges et 100 cubes bleus. Combien de cubes en tout ?",
        correction: "100 + 100 = 200. Deux cents cubes.",
      },
      illu: { emoji: "🧱", label: "briques" },
    },
    francais: {
      regleTitre: "a ou à",
      regle: "« a » est le verbe avoir ; « à » montre le lieu ou le moment.",
      consigne: "Complète : a ou à.",
      items: ["Ti Margo … des cubes.", "Il joue … midi.", "Il va … la cour."],
      correction: "a — à — à.",
    },
    mot: {
      mot: "Centaines",
      nature: "nom, maths",
      definition: "On compte les grands nombres par centaines (100), dizaines (10) et unités.",
      exemple: "200 = 2 centaines.",
    },
    geste: {
      titre: "Un jeu en ligne : prudence",
      texte: "Dans un jeu en ligne, on peut croiser des inconnus : on reste prudent et on en parle aux parents.",
    },
    defi: {
      enonce: "Combien font 200 + 100 ?",
      correction: "300.",
    },
  },

  /* ===================== SEMAINE 4 · Les jeux d'énigmes ===================== */
  {
    numero: 16,
    semaine: 4,
    badge: "Détective des nombres",
    maths: {
      calcul: [
        { q: "2, 4, 6, … →", r: "8" },
        { q: "5, 10, 15, … →", r: "20" },
        { q: "10, 20, 30, … →", r: "40" },
        { q: "1, 3, 5, … →", r: "7" },
        { q: "3 + 3 =", r: "6" },
      ],
      probleme: {
        enonce: "Continue la suite : 2, 4, 6, 8, … Quel est le nombre suivant ?",
        correction: "10. On ajoute 2 à chaque fois.",
      },
      illu: { emoji: "🔍", label: "loupe" },
    },
    francais: {
      regleTitre: "Le son [s]",
      regle: "Le son [s] s'écrit s, ss, c (devant e, i) ou ç.",
      consigne: "Complète : s, ss ou c.",
      items: ["une cla__e (classe)", "un gla__on (glaçon)", "la cour__e (course)"],
      correction: "classe — glaçon — course.",
    },
    mot: {
      mot: "Suite",
      nature: "nom, maths",
      definition: "Une suite de nombres suit une règle : 2, 4, 6, 8…",
      exemple: "Ici, on ajoute 2 à chaque fois.",
    },
    geste: {
      titre: "Ne pas donner son nom dans un jeu",
      texte: "Dans un jeu, on ne donne ni son vrai nom, ni son adresse, ni sa photo.",
    },
    defi: {
      enonce: "Continue : 5, 10, 15, 20, … ?",
      correction: "25.",
    },
  },
  {
    numero: 17,
    semaine: 4,
    badge: "Roi des suites",
    maths: {
      calcul: [
        { q: "8 est pair ?", r: "oui" },
        { q: "7 est pair ?", r: "non" },
        { q: "10 est pair ?", r: "oui" },
        { q: "4 + 4 =", r: "8" },
        { q: "6 + 6 =", r: "12" },
      ],
      probleme: {
        enonce: "Ti Margo a 8 jetons. Peut-il faire 2 paquets égaux ? Combien dans chaque ?",
        correction: "Oui, 8 est pair : 4 jetons par paquet.",
      },
      illu: { emoji: "🔢", label: "jetons" },
    },
    francais: {
      regleTitre: "Les déterminants",
      regle: "Le petit mot devant le nom : le, la, les, un, une, des.",
      consigne: "Complète avec un déterminant.",
      items: ["… jeu", "… cartes", "… dé"],
      correction: "le jeu — les cartes — un dé (par exemple).",
    },
    mot: {
      mot: "Pair",
      nature: "adjectif, maths",
      definition: "Un nombre pair se partage en deux parts égales (2, 4, 6, 8…).",
      exemple: "8 est pair ; 7 est impair.",
    },
    geste: {
      titre: "La publicité dans les jeux",
      texte: "Beaucoup de jeux montrent des publicités : on ne clique pas dessus sans un adulte.",
    },
    defi: {
      enonce: "Le nombre 12 est-il pair ?",
      correction: "Oui.",
    },
  },
  {
    numero: 18,
    semaine: 4,
    badge: "As des énigmes",
    maths: {
      calcul: [
        { q: "2 dizaines + 5 unités =", r: "25" },
        { q: "3 dizaines =", r: "30" },
        { q: "4 dizaines + 2 =", r: "42" },
        { q: "20 + 7 =", r: "27" },
        { q: "5 dizaines =", r: "50" },
      ],
      probleme: {
        enonce: "Devinette : je suis fait de 2 dizaines et 5 unités. Quel nombre suis-je ?",
        correction: "25.",
      },
      illu: { emoji: "🧩", label: "énigme" },
    },
    francais: {
      regleTitre: "m devant m, b, p",
      regle: "Devant m, b, p, on écrit m au lieu de n : nombre, jambe, temps.",
      consigne: "Complète : n ou m.",
      items: ["un no__bre (nombre)", "le te__ps (temps)", "u__ jeu (un)"],
      correction: "nombre — temps — un.",
    },
    mot: {
      mot: "Dizaine",
      nature: "nom, maths",
      definition: "Une dizaine, c'est un paquet de dix.",
      exemple: "25 = 2 dizaines et 5 unités.",
    },
    geste: {
      titre: "Un jeu éducatif",
      texte: "Certains jeux font apprendre en s'amusant : calcul, lecture, logique.",
    },
    defi: {
      enonce: "Quel nombre a 3 dizaines et 4 unités ?",
      correction: "34.",
    },
  },
  {
    numero: 19,
    semaine: 4,
    badge: "Champion du partage",
    maths: {
      calcul: [
        { q: "12 ÷ 4 =", r: "3" },
        { q: "10 ÷ 5 =", r: "2" },
        { q: "8 ÷ 4 =", r: "2" },
        { q: "15 ÷ 3 =", r: "5" },
        { q: "6 ÷ 3 =", r: "2" },
      ],
      probleme: {
        enonce: "On partage 12 bonbons entre 4 amis, à parts égales. Combien chacun ?",
        correction: "12 ÷ 4 = 3. Trois bonbons chacun.",
      },
      illu: { emoji: "🍬", label: "bonbons" },
    },
    francais: {
      regleTitre: "et ou est",
      regle: "« et » relie deux mots ; « est » est le verbe être.",
      consigne: "Complète : et ou est.",
      items: ["Léa … Tom jouent.", "Le jeu … fini.", "Il rit … il saute."],
      correction: "et — est — et.",
    },
    mot: {
      mot: "Division",
      nature: "nom, maths",
      definition: "Diviser, c'est partager en parts égales.",
      exemple: "12 ÷ 4 = 3.",
    },
    geste: {
      titre: "Le respect dans un jeu",
      texte: "En jouant avec d'autres, on reste poli : pas d'insultes, pas de moqueries.",
    },
    defi: {
      enonce: "On partage 10 cartes entre 2 joueurs. Combien chacun ?",
      correction: "5.",
    },
  },
  {
    numero: 20,
    semaine: 4,
    badge: "Cap sur le plein air",
    maths: {
      calcul: [
        { q: "3 × 2 =", r: "6" },
        { q: "3 × 3 =", r: "9" },
        { q: "3 × 4 =", r: "12" },
        { q: "3 × 5 =", r: "15" },
        { q: "3 × 1 =", r: "3" },
      ],
      probleme: {
        enonce: "Ti Margo a 3 paquets de 3 cartes énigmes. Combien de cartes en tout ?",
        correction: "3 × 3 = 9. Neuf cartes.",
      },
      illu: { emoji: "🧩", label: "cartes énigmes" },
    },
    francais: {
      regleTitre: "Les synonymes",
      regle: "Des synonymes veulent dire presque pareil : content = joyeux.",
      consigne: "Trouve un synonyme.",
      items: ["content →", "vite →", "joli →"],
      correction: "joyeux — rapidement — beau (par exemple).",
    },
    mot: {
      mot: "Table de 3",
      nature: "expression, maths",
      definition: "La table de 3, c'est compter de 3 en 3 : 3, 6, 9, 12…",
      exemple: "3 × 4 = 12.",
    },
    geste: {
      titre: "Jouer dehors aussi !",
      texte: "Les écrans, c'est bien, mais jouer dehors et bouger, c'est très important.",
    },
    defi: {
      enonce: "Combien font 3 × 5 ?",
      correction: "15.",
    },
  },

  /* ===================== SEMAINE 5 · Les jeux de plein air ===================== */
  {
    numero: 21,
    semaine: 5,
    badge: "Coureur rapide",
    maths: {
      calcul: [
        { q: "50 + 50 =", r: "100" },
        { q: "1 m = ? cm", r: "100" },
        { q: "30 + 70 =", r: "100" },
        { q: "20 + 20 =", r: "40" },
        { q: "5 × 2 =", r: "10" },
      ],
      probleme: {
        enonce: "Ti Margo saute 50 cm, puis encore 50 cm. Quelle distance a-t-il sautée en tout ?",
        correction: "50 + 50 = 100. Cent centimètres, soit 1 mètre.",
      },
      illu: { emoji: "🏃", label: "course" },
    },
    francais: {
      regleTitre: "Les contraires",
      regle: "Un contraire dit l'inverse : grand ≠ petit, gagner ≠ perdre.",
      consigne: "Trouve le contraire.",
      items: ["grand →", "vite →", "gagner →"],
      correction: "petit — lentement — perdre.",
    },
    mot: {
      mot: "Mètre",
      nature: "nom, maths",
      definition: "Le mètre (m) mesure les longueurs. 1 mètre = 100 centimètres.",
      exemple: "50 cm + 50 cm = 1 m.",
    },
    geste: {
      titre: "Prendre soin de la tablette",
      texte: "On range la tablette et on ne la fait pas tomber : elle est fragile.",
    },
    defi: {
      enonce: "Combien de cm dans 1 mètre ?",
      correction: "100 cm.",
    },
  },
  {
    numero: 22,
    semaine: 5,
    badge: "Maître du chrono",
    maths: {
      calcul: [
        { q: "il est 3 h, + 1 h →", r: "4 h" },
        { q: "60 min = ? h", r: "1 h" },
        { q: "30 min + 30 min =", r: "1 h" },
        { q: "2 h = ? min", r: "120" },
        { q: "10 + 5 =", r: "15" },
      ],
      probleme: {
        enonce: "La course commence à 2 h et dure 1 heure. À quelle heure finit-elle ?",
        correction: "2 h + 1 h = 3 h.",
      },
      illu: { emoji: "⏱️", label: "chronomètre" },
    },
    francais: {
      regleTitre: "L'ordre alphabétique",
      regle: "Les lettres ont un ordre : a, b, c, d… On range les mots avec cet ordre.",
      consigne: "Range dans l'ordre alphabétique.",
      items: ["dé, balle, carte"],
      correction: "balle, carte, dé.",
    },
    mot: {
      mot: "Heure",
      nature: "nom, maths",
      definition: "L'heure mesure le temps. Une heure a 60 minutes.",
      exemple: "De 2 h à 3 h, il y a 1 heure.",
    },
    geste: {
      titre: "Écrire son score au clavier",
      texte: "On peut taper son prénom ou son score au clavier, lettre par lettre.",
    },
    defi: {
      enonce: "Il est 4 h. Quelle heure dans 1 heure ?",
      correction: "5 h.",
    },
  },
  {
    numero: 23,
    semaine: 5,
    badge: "As du ballon",
    maths: {
      calcul: [
        { q: "10 + 5 =", r: "15" },
        { q: "20 + 30 =", r: "50" },
        { q: "15 min + 15 min =", r: "30 min" },
        { q: "4 + 6 =", r: "10" },
        { q: "7 + 8 =", r: "15" },
      ],
      probleme: {
        enonce: "Un match dure 2 fois 15 minutes. Combien de minutes en tout ?",
        correction: "15 + 15 = 30. Trente minutes.",
      },
      illu: { emoji: "⚽", label: "ballon" },
    },
    francais: {
      regleTitre: "La ponctuation",
      regle: "On met une virgule dans une liste, et un point d'interrogation pour une question.",
      consigne: "Quel signe manque ?",
      items: ["Veux-tu jouer", "Il prend une balle un dé et une carte."],
      correction: "Veux-tu jouer ? — une balle, un dé et une carte.",
    },
    mot: {
      mot: "Durée",
      nature: "nom, maths",
      definition: "La durée, c'est le temps que prend quelque chose.",
      exemple: "Le match dure 30 minutes.",
    },
    geste: {
      titre: "Faire une capture de son score",
      texte: "On peut prendre une photo de l'écran (capture) pour garder son meilleur score.",
    },
    defi: {
      enonce: "Un jeu de 20 min plus un de 10 min : combien de temps ?",
      correction: "30 min.",
    },
  },
  {
    numero: 24,
    semaine: 5,
    badge: "Champion des scores",
    maths: {
      calcul: [
        { q: "3 + 2 + 4 =", r: "9" },
        { q: "5 + 5 + 5 =", r: "15" },
        { q: "10 + 10 + 5 =", r: "25" },
        { q: "6 + 4 + 2 =", r: "12" },
        { q: "2 + 3 + 5 =", r: "10" },
      ],
      probleme: {
        enonce: "Ti Margo marque 3 buts, puis 2 buts, puis 4 buts. Combien de buts en tout ?",
        correction: "3 + 2 + 4 = 9. Neuf buts.",
      },
      illu: { emoji: "🏆", label: "trophée" },
    },
    francais: {
      regleTitre: "Les familles de mots",
      regle: "Des mots de la même famille se ressemblent : jouer, joueur, jouet.",
      consigne: "Trouve un mot de la même famille.",
      items: ["jouer →", "course →", "saut →"],
      correction: "joueur / jouet — courir / coureur — sauter (par exemple).",
    },
    mot: {
      mot: "Score",
      nature: "nom",
      definition: "Le score, c'est le nombre de points gagnés dans un jeu.",
      exemple: "Un score de 9 buts.",
    },
    geste: {
      titre: "Partager avec un adulte",
      texte: "Si quelque chose nous gêne dans un jeu, on en parle tout de suite à un adulte.",
    },
    defi: {
      enonce: "Tu marques 4, 4 et 2 points. Quel est ton score ?",
      correction: "10.",
    },
  },
  {
    numero: 25,
    semaine: 5,
    badge: "Cap sur la fête",
    maths: {
      calcul: [
        { q: "10 − 8 =", r: "2" },
        { q: "10 − 6 =", r: "4" },
        { q: "20 − 8 =", r: "12" },
        { q: "5 + 3 =", r: "8" },
        { q: "2 × 4 =", r: "8" },
      ],
      probleme: {
        enonce: "Un ballon coûte 8 €. Ti Margo paie avec un billet de 10 €. Combien lui rend-on ?",
        correction: "10 − 8 = 2. On lui rend 2 €.",
      },
      illu: { emoji: "💰", label: "argent" },
    },
    francais: {
      regleTitre: "Le présent : faire et aller",
      regle: "Faire : je fais, tu fais, il fait. Aller : je vais, tu vas, il va.",
      consigne: "Complète avec faire ou aller.",
      items: ["Je … un jeu. (faire)", "Tu … à la fête. (aller)", "Il … dehors. (aller)"],
      correction: "fais — vas — va.",
    },
    mot: {
      mot: "Monnaie",
      nature: "nom, maths",
      definition: "La monnaie, c'est l'argent qu'on rend quand on a payé trop.",
      exemple: "Je paie 8 € avec 10 €, on me rend 2 €.",
    },
    geste: {
      titre: "Le fair-play en ligne",
      texte: "Même en ligne, on joue honnêtement : pas de triche, on respecte les autres joueurs.",
    },
    defi: {
      enonce: "Je paie 6 € avec 10 €. On me rend ?",
      correction: "4 €.",
    },
  },

  /* ===================== SEMAINE 6 · La grande fête des jeux ===================== */
  {
    numero: 26,
    semaine: 6,
    badge: "Roi de la fête",
    maths: {
      calcul: [
        { q: "12 − 3 − 2 =", r: "7" },
        { q: "10 + 5 =", r: "15" },
        { q: "8 + 4 =", r: "12" },
        { q: "20 − 5 =", r: "15" },
        { q: "6 + 6 =", r: "12" },
      ],
      probleme: {
        enonce: "Ti Margo a 12 ballons. Il en éclate 3 et en donne 2. Combien lui en reste-t-il ?",
        correction: "12 − 3 − 2 = 7. Sept ballons.",
      },
      illu: { emoji: "🎈", label: "ballons" },
    },
    francais: {
      regleTitre: "Révision : le présent",
      regle: "Au présent, les verbes en -er : -e, -es, -e, -ons, -ez, -ent.",
      consigne: "Conjugue « jouer ».",
      items: ["je …", "nous …", "ils …"],
      correction: "je joue — nous jouons — ils jouent.",
    },
    mot: {
      mot: "Reste",
      nature: "nom, maths",
      definition: "Le reste, c'est ce qui reste après avoir enlevé.",
      exemple: "12 − 5 = 7 : il reste 7.",
    },
    geste: {
      titre: "Éteindre après avoir joué",
      texte: "Quand on a fini de jouer, on éteint la tablette.",
    },
    defi: {
      enonce: "J'ai 10 ballons, j'en éclate 4. Combien restent ?",
      correction: "6.",
    },
  },
  {
    numero: 27,
    semaine: 6,
    badge: "Champion des lots",
    maths: {
      calcul: [
        { q: "5 × 10 =", r: "50" },
        { q: "3 × 10 =", r: "30" },
        { q: "10 × 10 =", r: "100" },
        { q: "2 × 10 =", r: "20" },
        { q: "4 × 10 =", r: "40" },
      ],
      probleme: {
        enonce: "Pour la fête, on prépare 5 sacs de 10 bonbons. Combien de bonbons en tout ?",
        correction: "5 × 10 = 50. Cinquante bonbons.",
      },
      illu: { emoji: "🎁", label: "lots" },
    },
    francais: {
      regleTitre: "Le pluriel en -x",
      regle: "Les noms en -eau prennent -x au pluriel : un cadeau → des cadeaux.",
      consigne: "Écris au pluriel.",
      items: ["un cadeau →", "un jeu →", "un château →"],
      correction: "des cadeaux — des jeux — des châteaux.",
    },
    mot: {
      mot: "Lot",
      nature: "nom",
      definition: "Un lot, c'est un paquet de plusieurs choses ensemble.",
      exemple: "5 sacs de 10 bonbons = 50 bonbons.",
    },
    geste: {
      titre: "Un jeu de société (sans écran)",
      texte: "On peut aussi jouer sans écran : cartes, dés, plateau, avec ses amis.",
    },
    defi: {
      enonce: "Combien font 3 × 10 ?",
      correction: "30.",
    },
  },
  {
    numero: 28,
    semaine: 6,
    badge: "Grand partageur",
    maths: {
      calcul: [
        { q: "20 ÷ 5 =", r: "4" },
        { q: "12 ÷ 3 =", r: "4" },
        { q: "16 ÷ 4 =", r: "4" },
        { q: "10 ÷ 2 =", r: "5" },
        { q: "15 ÷ 5 =", r: "3" },
      ],
      probleme: {
        enonce: "On partage 20 parts de gâteau entre 5 amis, à parts égales. Combien chacun ?",
        correction: "20 ÷ 5 = 4. Quatre parts chacun.",
      },
      illu: { emoji: "🍰", label: "gâteau" },
    },
    francais: {
      regleTitre: "Le féminin des adjectifs",
      regle: "Souvent, le féminin de l'adjectif prend un -e : grand → grande.",
      consigne: "Mets au féminin.",
      items: ["grand →", "petit →", "content →"],
      correction: "grande — petite — contente.",
    },
    mot: {
      mot: "Parts égales",
      nature: "expression, maths",
      definition: "Partager en parts égales, c'est donner pareil à chacun.",
      exemple: "20 ÷ 5 = 4 chacun.",
    },
    geste: {
      titre: "Équilibrer écran et vrais jeux",
      texte: "On partage son temps : un peu d'écran, beaucoup de jeux réels et d'amis.",
    },
    defi: {
      enonce: "12 gâteaux pour 4 amis. Combien chacun ?",
      correction: "3.",
    },
  },
  {
    numero: 29,
    semaine: 6,
    badge: "Arpenteur du terrain",
    maths: {
      calcul: [
        { q: "10 + 10 + 10 + 10 =", r: "40" },
        { q: "4 × 10 =", r: "40" },
        { q: "5 + 5 + 5 + 5 =", r: "20" },
        { q: "3 + 3 + 3 + 3 =", r: "12" },
        { q: "20 − 5 =", r: "15" },
      ],
      probleme: {
        enonce: "Le terrain de jeu est un carré de 10 m de côté. Quelle longueur fait le tour ?",
        correction: "10 + 10 + 10 + 10 = 40. Le tour fait 40 m.",
      },
      illu: { emoji: "🟫", label: "terrain" },
    },
    francais: {
      regleTitre: "Révision : le verbe au présent",
      regle: "Au présent, le verbe s'accorde avec le sujet (je, tu, il, nous, vous, ils).",
      consigne: "Conjugue « finir » (je, tu, ils).",
      items: ["je …", "tu …", "ils …"],
      correction: "je finis — tu finis — ils finissent.",
    },
    mot: {
      mot: "Périmètre",
      nature: "nom, maths",
      definition: "Le périmètre, c'est la longueur du tour d'une figure.",
      exemple: "Le tour d'un carré de 10 m fait 40 m.",
    },
    geste: {
      titre: "Bien jouer, c'est s'arrêter à temps",
      texte: "Un bon joueur sait s'arrêter, ranger et passer à autre chose.",
    },
    defi: {
      enonce: "Le tour d'un carré de 5 m de côté ?",
      correction: "20 m.",
    },
  },
  {
    numero: 30,
    semaine: 6,
    badge: "Prêt pour le CE2 ! 🎓",
    maths: {
      calcul: [
        { q: "5 × 6 =", r: "30" },
        { q: "double de 15 =", r: "30" },
        { q: "10 × 3 =", r: "30" },
        { q: "20 + 10 =", r: "30" },
        { q: "15 + 15 =", r: "30" },
      ],
      probleme: {
        enonce: "Ti Margo a joué pendant 6 semaines, 5 jours par semaine. Combien de jours de jeux en tout ?",
        correction: "6 × 5 = 30. Trente jours.",
      },
      illu: { emoji: "🎓", label: "diplôme" },
    },
    francais: {
      regleTitre: "Le grand bilan",
      regle: "Tu sais faire des phrases, accorder et conjuguer au présent. Bravo, tu es prêt pour le CE2 !",
      consigne: "Écris une jolie phrase sur ton jeu préféré (majuscule, point).",
      items: ["(à toi d'écrire !)"],
      correction: "Réponse libre — vérifie la majuscule et le point.",
    },
    mot: {
      mot: "Bilan",
      nature: "nom",
      definition: "Faire le bilan, c'est regarder tout ce qu'on a appris.",
      exemple: "Bravo : direction le CE2 !",
    },
    geste: {
      titre: "Je sais bien jouer",
      texte: "Choisir un jeu, lire les règles, rester poli, s'arrêter à temps : tu sais déjà bien jouer !",
    },
    defi: {
      enonce: "Combien de jeux Ti Margo a-t-il découverts cet été ?",
      correction: "6 jeux.",
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  Défis ★★★★★ (niveau expert) — énigmes malines de jeu, à la portée d'un    */
/*  CE1/CE2 qui aime réfléchir.                                               */
/* -------------------------------------------------------------------------- */
export const defisExpert: Record<number, { enonce: string; correction: string }> = {
  1: {
    enonce: "Léa a 5 billes, Tom en a le double. Combien Tom a-t-il de billes ? Et combien à eux deux ?",
    correction: "Tom a 10 billes ; à eux deux, 15 billes.",
  },
  2: {
    enonce: "À la marelle, combien de cases y a-t-il entre la case 2 et la case 8 (sans compter 2 ni 8) ?",
    correction: "5 cases (les cases 3, 4, 5, 6 et 7).",
  },
  3: {
    enonce: "À la corde, Ti Margo saute 3 fois par tour. Combien de sauts en 4 tours ?",
    correction: "12 sauts (3 × 4).",
  },
  4: {
    enonce: "Range du plus petit au plus grand : 23, 32, 3, 30, 13.",
    correction: "3, 13, 23, 30, 32.",
  },
  5: {
    enonce: "Ti Margo a 6 billes. Combien lui en manque-t-il pour en avoir 10 ? Et pour en avoir 15 ?",
    correction: "4 billes pour 10 ; 9 billes pour 15.",
  },
  6: {
    enonce: "On lance 2 dés. On obtient 9 en tout, et l'un des dés montre 4. Que montre l'autre dé ?",
    correction: "5 (car 4 + 5 = 9).",
  },
  7: {
    enonce: "On distribue 5 cartes à chacun de 4 joueurs. Combien de cartes distribuées en tout ?",
    correction: "20 cartes (5 × 4).",
  },
  8: {
    enonce: "Ti Margo avance de 5 cases par tour. À quelle case sera-t-il après 4 tours, en partant de la case 0 ?",
    correction: "À la case 20 (5 × 4).",
  },
  9: {
    enonce: "Chaque carte bonus vaut 10 points. Ti Margo en a 3, Léa en a 2. Qui gagne, et de combien de points ?",
    correction: "Ti Margo (30 points) gagne contre Léa (20 points), de 10 points.",
  },
  10: {
    enonce: "Léa a 12 points, Tom en a 8, Ti Margo en a 10. Range les joueurs du gagnant au dernier.",
    correction: "Léa (12), Ti Margo (10), Tom (8).",
  },
  11: {
    enonce: "Combien de côtés ont ensemble un carré et deux triangles ?",
    correction: "10 côtés (4 + 3 + 3).",
  },
  12: {
    enonce: "Avec 12 cubes, combien de tours de 2 cubes peut-on faire ? Et de 3 cubes ?",
    correction: "6 tours de 2 cubes ; 4 tours de 3 cubes.",
  },
  13: {
    enonce: "Un château symétrique a 4 fenêtres à gauche et une grande porte au milieu. Combien de fenêtres en tout (gauche + droite) ?",
    correction: "8 fenêtres (4 à gauche, 4 à droite ; la porte est au milieu).",
  },
  14: {
    enonce: "Ti Margo a 3 boîtes de 100 cubes et 5 cubes en plus. Combien de cubes en tout ?",
    correction: "305 cubes (300 + 5).",
  },
  15: {
    enonce: "Avec 100 cubes rouges, 100 bleus et 50 verts, combien de cubes en tout ?",
    correction: "250 cubes.",
  },
  16: {
    enonce: "Continue : 2, 4, 6, 8… Quel est le 6e nombre de la suite ?",
    correction: "12 (c'est 2 × 6).",
  },
  17: {
    enonce: "Avec 8 jetons, peut-on faire 2 paquets égaux ? Et 4 paquets égaux ?",
    correction: "Oui : 4 par paquet (2 paquets) ; et 2 par paquet (4 paquets).",
  },
  18: {
    enonce: "Devinette : j'ai 3 dizaines et 6 unités. Quel nombre suis-je ?",
    correction: "36.",
  },
  19: {
    enonce: "On partage 12 bonbons entre 4 amis, puis entre 3 amis. Combien chacun à chaque fois ?",
    correction: "3 bonbons (4 amis) ; 4 bonbons (3 amis).",
  },
  20: {
    enonce: "3 paquets de 3 cartes, plus 2 cartes seules. Combien de cartes en tout ?",
    correction: "11 cartes (9 + 2).",
  },
  21: {
    enonce: "Ti Margo saute 50 cm, puis 50 cm, puis encore 50 cm. Quelle distance en tout (en cm et en m) ?",
    correction: "150 cm, soit 1 mètre et demi.",
  },
  22: {
    enonce: "Une course commence à 2 h et dure 2 heures. À quelle heure finit-elle ?",
    correction: "4 h.",
  },
  23: {
    enonce: "Un match a 2 parties de 15 minutes, plus 10 minutes de pause. Combien de temps en tout ?",
    correction: "40 minutes (15 + 15 + 10).",
  },
  24: {
    enonce: "Ti Margo marque 3, 2, 4 puis 1 but. Quel est son score total ?",
    correction: "10 buts.",
  },
  25: {
    enonce: "Un ballon coûte 8 €. Ti Margo a deux billets de 5 €. Peut-il l'acheter, et combien lui rend-on ?",
    correction: "Oui (il a 10 €), on lui rend 2 €.",
  },
  26: {
    enonce: "À la fête, 10 enfants reçoivent chacun 2 ballons. Combien de ballons en tout ?",
    correction: "20 ballons (10 × 2).",
  },
  27: {
    enonce: "5 sacs de 10 bonbons, partagés entre 10 enfants. Combien de bonbons chacun ?",
    correction: "5 bonbons (50 ÷ 10).",
  },
  28: {
    enonce: "On partage 20 parts de gâteau entre 5 amis, mais 1 ami n'a pas faim. Combien pour chacun des 4 autres ?",
    correction: "5 parts (20 ÷ 4).",
  },
  29: {
    enonce: "Le tour d'un terrain carré de 10 m de côté : quelle longueur ?",
    correction: "40 m (10 + 10 + 10 + 10).",
  },
  30: {
    enonce: "Ti Margo a découvert 6 jeux, 5 jours chacun. Combien de jours de jeux en tout ?",
    correction: "30 jours (6 × 5).",
  },
};

/* Le carnet de Ti Margo — récit tout doux et joyeux (jeunes lecteurs). */
export const carnet: Record<number, string> = {
  1: "Bonjour ! Je suis Ti Margo. Cet été, on apprend en jouant ! On commence dans la cour, avec les billes. Une, deux, trois… c'est parti ! Tu joues avec moi ?",
  2: "Quelle partie de billes ! J'en gagne, j'en perds, je compte mon tas. Compter, c'est déjà jouer.",
  3: "À la corde maintenant ! Je saute, je saute, je compte mes sauts. Hop, hop, hop !",
  4: "On range les billes par taille de tas. Du plus petit au plus grand. J'adore mettre de l'ordre !",
  5: "Belle semaine dans la cour ! Demain, on sort les jeux de société. À tout à l'heure !",
  6: "On lance les dés : un 4 et un 5, ça fait 9 ! Les dés, c'est plein de calculs cachés.",
  7: "On distribue les cartes, chacun la sienne. Compter de 2 en 2, c'est facile !",
  8: "Au jeu de plateau, j'avance de 5 cases par tour. Plus loin, encore plus loin !",
  9: "Je collectionne les cartes bonus à 10 points. Mon score grimpe vite !",
  10: "Quelle belle partie ! Léa gagne de peu. On se félicite : bravo à elle !",
  11: "Place aux cubes ! Je construis un carré, un triangle. Combien de bâtonnets ? Je compte les côtés.",
  12: "Je fais des petites tours de 2 cubes. Avec 6 cubes, ça fait 3 tours pile.",
  13: "Mon château est tout symétrique : pareil à gauche et à droite. Comme c'est joli !",
  14: "J'ouvre mes boîtes de 100 cubes. Une centaine, deux centaines… ça monte haut !",
  15: "Mon château est fini, immense ! Demain, place aux énigmes. Prépare ta tête !",
  16: "Première énigme : continue la suite 2, 4, 6, 8… Trop facile, c'est 10 !",
  17: "Je range mes jetons en paquets égaux. 8 jetons, ça fait 2 paquets de 4.",
  18: "Une devinette de nombres : 2 dizaines et 5 unités… c'est 25 ! J'ai trouvé !",
  19: "On partage les bonbons à égalité. Chacun pareil, c'est plus juste et plus rigolo.",
  20: "Que d'énigmes résolues ! Demain, on sort dehors pour bouger. En piste !",
  21: "On fait la course et le saut en longueur. Je saute 50 cm, puis encore 50. Un grand mètre !",
  22: "On se chronomètre. La course dure une heure pile. Prêts, partez !",
  23: "Un grand match de ballon, en deux parties. On compte les minutes et les buts.",
  24: "Je marque plein de buts : 3, puis 2, puis 4 ! Mon équipe gagne. Quelle joie !",
  25: "J'achète un ballon tout neuf. Je paie, on me rend la monnaie. Comme un grand !",
  26: "C'est la grande fête des jeux ! Des ballons partout, des rires, des amis.",
  27: "On prépare les lots : des sacs de 10 bonbons. Cinq sacs, ça fait cinquante !",
  28: "On partage le gros gâteau en parts égales. Chacun la sienne, et tout le monde se régale !",
  29: "Je fais le tour du terrain de jeu. Quatre côtés de 10 m : quarante mètres !",
  30: "Quel bel été de jeux ! J'ai appris plein de choses en m'amusant. Et maintenant, me voilà prêt pour le CE2 ! Merci d'avoir joué avec moi : on a réussi, ensemble ! 🎓",
};

/* « Le savais-tu ? » — ancrage local 🌺 / ouverture monde 🌍, autour des jeux. */
export const leSaviasTu: Record<number, { portee: "local" | "monde"; texte: string }> = {
  1: { portee: "monde", texte: "Le jeu de billes existe depuis l'Antiquité : les enfants romains y jouaient déjà avec des noix !" },
  2: { portee: "monde", texte: "La marelle se joue dans le monde entier, avec des dessins un peu différents selon les pays." },
  3: { portee: "monde", texte: "Sauter à la corde est un excellent sport : ça fait travailler le cœur et l'équilibre." },
  4: { portee: "local", texte: "Dans les cours d'école de La Réunion, on joue aussi à des jeux créoles comme « la patte »." },
  5: { portee: "monde", texte: "Jouer, ce n'est pas perdre son temps : c'est en jouant qu'on apprend le mieux quand on est petit." },
  6: { portee: "monde", texte: "Le dé à six faces existe depuis des milliers d'années : on en a retrouvé dans des tombeaux très anciens." },
  7: { portee: "monde", texte: "Un jeu de cartes classique compte 52 cartes, réparties en 4 familles (cœur, carreau, trèfle, pique)." },
  8: { portee: "monde", texte: "Le jeu de l'oie, un jeu de plateau, est joué en Europe depuis plus de 400 ans." },
  9: { portee: "monde", texte: "Les échecs sont un jeu de stratégie né en Inde il y a plus de 1 500 ans." },
  10: { portee: "monde", texte: "Bien jouer, c'est aussi savoir perdre : on félicite le gagnant, c'est le « fair-play »." },
  11: { portee: "monde", texte: "Avec quelques formes simples (carré, triangle), on peut construire des milliers de figures différentes." },
  12: { portee: "monde", texte: "Les célèbres briques de construction emboîtables ont été inventées il y a plus de 60 ans." },
  13: { portee: "local", texte: "Beaucoup de maisons créoles de La Réunion ont une façade bien symétrique, avec des « lambrequins » dentelés." },
  14: { portee: "monde", texte: "Pour compter de grands nombres, on regroupe par paquets de 100, de 10, puis les unités." },
  15: { portee: "monde", texte: "Les plus hautes tours du monde dépassent 800 mètres : il en faut, des « cubes » !" },
  16: { portee: "monde", texte: "Reconnaître une suite de nombres, c'est le début des mathématiques et même de l'informatique." },
  17: { portee: "monde", texte: "Un nombre pair se partage en deux parts égales ; un nombre impair, non (il en reste toujours un)." },
  18: { portee: "monde", texte: "Les devinettes de nombres existent dans toutes les cultures : on adore se creuser la tête !" },
  19: { portee: "local", texte: "À La Réunion, partager les bonbons et les fruits avec les copains, c'est une habitude de tous les jours." },
  20: { portee: "monde", texte: "Résoudre une énigme, c'est comme muscler son cerveau : plus on s'entraîne, plus on devient malin." },
  21: { portee: "monde", texte: "Au saut en longueur, les champions dépassent 8 mètres d'un seul bond !" },
  22: { portee: "monde", texte: "Un chronomètre mesure le temps très précisément, même les fractions de seconde." },
  23: { portee: "local", texte: "Le football est très populaire à La Réunion ; on y joue sur la plage comme dans la cour." },
  24: { portee: "monde", texte: "Marquer un but, c'est gagner un point ; on additionne les points pour connaître le score." },
  25: { portee: "monde", texte: "Compter sa monnaie en jouant au marchand, c'est déjà apprendre à gérer son argent." },
  26: { portee: "local", texte: "À La Réunion, les fêtes de quartier (« kabars ») réunissent petits et grands autour des jeux et de la musique." },
  27: { portee: "monde", texte: "Pour partager équitablement, on utilise la division : c'est le partage en parts égales." },
  28: { portee: "monde", texte: "Couper un gâteau en parts égales, c'est de la géométrie… et de la gourmandise !" },
  29: { portee: "monde", texte: "Mesurer le tour d'un terrain, c'est calculer son périmètre : utile au sport comme en maths." },
  30: { portee: "monde", texte: "En CE2, tu apprendras encore plein de choses ; et le jeu restera une super façon d'apprendre !" },
};
