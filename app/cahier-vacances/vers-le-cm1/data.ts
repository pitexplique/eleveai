/* -------------------------------------------------------------------------- */
/*  Données du cahier de vacances « En route pour le CM1 » (CE2 → CM1).        */
/*  Fil conducteur : Ti Margo explore son jardin créole — 6 petits coins à    */
/*  découvrir près de la maison (la cour et le manguier, le potager, les       */
/*  fleurs, les petites bêtes, la mare, la fête). C'est l'échelle la plus      */
/*  proche, la plus douce : avant l'île (CM2), le jardin (CM1).               */
/*  Niveau CE2 : révision + avant-goût du CM1. Texte simple, SANS LaTeX.      */
/*  Phrases courtes (jeunes lecteurs). Défis ★★★★★ doux mais malins (HPI).    */
/*  Moteur d'affichage commun : components/cahier/CahierVacances.tsx.          */
/* -------------------------------------------------------------------------- */

import type { Etape, Jour } from "@/components/cahier/types";

/** Les 6 coins du jardin (un par semaine). */
export const parcours: Etape[] = [
  { semaine: 1, etape: 1, emoji: "🥭", lieu: "La cour et le grand manguier", intro: "Ti Margo part explorer son jardin : on commence par la cour !" },
  { semaine: 2, etape: 2, emoji: "🥬", lieu: "Le potager", intro: "Cap sur le potager, plein de bons légumes." },
  { semaine: 3, etape: 3, emoji: "🌺", lieu: "Le jardin de fleurs", intro: "Mille couleurs et mille parfums chez les fleurs." },
  { semaine: 4, etape: 4, emoji: "🐞", lieu: "Les petites bêtes", intro: "À la rencontre des coccinelles, fourmis et papillons." },
  { semaine: 5, etape: 5, emoji: "💧", lieu: "La petite mare", intro: "Près de la mare fraîche, les libellules dansent." },
  { semaine: 6, etape: 6, emoji: "🎉", lieu: "La fête au jardin", intro: "Dernière étape : la fête, et cap sur le CM1 !" },
];

export const jours: Jour[] = [
  /* ===================== SEMAINE 1 · La cour et le manguier ===================== */
  {
    numero: 1,
    semaine: 1,
    badge: "Petit jardinier",
    maths: {
      calcul: [
        { q: "2 × 3 =", r: "6" },
        { q: "4 × 5 =", r: "20" },
        { q: "10 + 7 =", r: "17" },
        { q: "8 + 6 =", r: "14" },
        { q: "5 × 2 =", r: "10" },
      ],
      probleme: {
        enonce: "Ti Margo ramasse 8 mangues le matin et 5 le soir. Combien de mangues en tout ?",
        correction: "8 + 5 = 13. Treize mangues.",
      },
      illu: { emoji: "🥭", label: "mangues" },
    },
    francais: {
      regleTitre: "La phrase",
      regle: "Une phrase commence par une majuscule et se termine par un point.",
      consigne: "Recopie avec la majuscule et le point.",
      items: ["ti margo aime son jardin", "le manguier est grand", "les fruits sont mûrs"],
      correction: "Ti Margo aime son jardin. — Le manguier est grand. — Les fruits sont mûrs.",
    },
    mot: {
      mot: "Addition",
      nature: "nom, maths",
      definition: "Une addition, c'est quand on ajoute des nombres ensemble.",
      exemple: "8 + 5 = 13 est une addition.",
    },
    geste: {
      titre: "Allumer la tablette",
      texte: "On appuie sur le bouton pour allumer la tablette ou l'ordinateur.",
    },
    defi: {
      enonce: "Quel nombre vient juste après 19 ?",
      correction: "20.",
    },
  },
  {
    numero: 2,
    semaine: 1,
    badge: "Ami du manguier",
    maths: {
      calcul: [
        { q: "3 × 3 =", r: "9" },
        { q: "2 × 5 =", r: "10" },
        { q: "23 + 14 =", r: "37" },
        { q: "45 + 30 =", r: "75" },
        { q: "6 + 6 =", r: "12" },
      ],
      probleme: {
        enonce: "Sous le manguier, il y a 24 mangues par terre et 13 sur l'arbre. Combien en tout ?",
        correction: "24 + 13 = 37. Trente-sept mangues.",
      },
      illu: { emoji: "🌳", label: "manguier" },
    },
    francais: {
      regleTitre: "Les types de phrases",
      regle:
        "Une phrase finit par un point (.), un point d'interrogation ( ?) ou un point d'exclamation ( !).",
      consigne: "Quel point mettre ?",
      items: ["Tu viens jouer", "Quel beau jardin", "Le chat dort"],
      correction: "Tu viens jouer ? — Quel beau jardin ! — Le chat dort.",
    },
    mot: {
      mot: "Somme",
      nature: "nom, maths",
      definition: "La somme, c'est le résultat d'une addition.",
      exemple: "La somme de 4 et 3 est 7.",
    },
    geste: {
      titre: "L'écran",
      texte: "L'écran montre les images, les lettres et les jeux.",
    },
    defi: {
      enonce: "Continue : 2, 4, 6, 8, … ?",
      correction: "10.",
    },
  },
  {
    numero: 3,
    semaine: 1,
    badge: "As de l'addition",
    maths: {
      calcul: [
        { q: "4 × 4 =", r: "16" },
        { q: "5 × 5 =", r: "25" },
        { q: "50 − 20 =", r: "30" },
        { q: "30 − 12 =", r: "18" },
        { q: "7 + 8 =", r: "15" },
      ],
      probleme: {
        enonce: "Ti Margo a 30 billes. Il en perd 12 dans l'herbe. Combien lui en reste-t-il ?",
        correction: "30 − 12 = 18. Dix-huit billes.",
      },
      illu: { emoji: "➕", label: "calcul" },
    },
    francais: {
      regleTitre: "Le nom",
      regle:
        "Le nom désigne une personne, un animal, une chose ou un lieu. Le nom propre prend une majuscule.",
      consigne: "Nom commun ou nom propre ?",
      items: ["jardin", "Ti Margo", "fleur"],
      correction: "commun — propre — commun.",
    },
    mot: {
      mot: "Différence",
      nature: "nom, maths",
      definition: "La différence, c'est le résultat d'une soustraction.",
      exemple: "La différence entre 9 et 4 est 5.",
    },
    geste: {
      titre: "La souris (ou le doigt)",
      texte: "On bouge la souris, ou on glisse le doigt sur l'écran, pour déplacer la flèche.",
    },
    defi: {
      enonce: "Combien font 10 − 3 ?",
      correction: "7.",
    },
  },
  {
    numero: 4,
    semaine: 1,
    badge: "Champion du double",
    maths: {
      calcul: [
        { q: "double de 4 =", r: "8" },
        { q: "double de 7 =", r: "14" },
        { q: "moitié de 10 =", r: "5" },
        { q: "moitié de 8 =", r: "4" },
        { q: "2 × 6 =", r: "12" },
      ],
      probleme: {
        enonce: "Ti Margo a 6 bonbons. Son ami en a le double. Combien de bonbons a son ami ?",
        correction: "Le double de 6, c'est 12. Douze bonbons.",
      },
      illu: { emoji: "🍬", label: "bonbons" },
    },
    francais: {
      regleTitre: "Le verbe",
      regle: "Le verbe dit l'action : jouer, courir, manger. Il change avec le temps.",
      consigne: "Entoure le verbe.",
      items: ["Ti Margo grimpe à l'arbre.", "Les oiseaux chantent.", "Le soleil brille."],
      correction: "grimpe — chantent — brille.",
    },
    mot: {
      mot: "Double",
      nature: "nom, maths",
      definition: "Le double, c'est deux fois plus.",
      exemple: "Le double de 4, c'est 8.",
    },
    geste: {
      titre: "La flèche (le curseur)",
      texte: "La petite flèche sur l'écran montre où on va cliquer.",
    },
    defi: {
      enonce: "Quel est le double de 5 ?",
      correction: "10.",
    },
  },
  {
    numero: 5,
    semaine: 1,
    badge: "Compteur malin",
    maths: {
      calcul: [
        { q: "5 × 3 =", r: "15" },
        { q: "2 × 8 =", r: "16" },
        { q: "100 − 50 =", r: "50" },
        { q: "40 + 40 =", r: "80" },
        { q: "9 + 9 =", r: "18" },
      ],
      probleme: {
        enonce: "Range du plus petit au plus grand : 45, 4, 54, 40.",
        correction: "4, 40, 45, 54.",
      },
      illu: { emoji: "🔢", label: "nombres" },
    },
    francais: {
      regleTitre: "Le sujet",
      regle:
        "Le sujet fait l'action. On le trouve en disant « Qui est-ce qui ? » devant le verbe.",
      consigne: "Souligne le sujet.",
      items: ["Ti Margo court.", "Les enfants jouent.", "Le chien aboie."],
      correction: "Ti Margo — Les enfants — Le chien.",
    },
    mot: {
      mot: "Ranger",
      nature: "verbe, maths",
      definition: "Ranger des nombres, c'est les mettre dans l'ordre, du plus petit au plus grand.",
      exemple: "4, 40, 45, 54.",
    },
    geste: {
      titre: "Cliquer (ou toucher)",
      texte: "On appuie une fois pour choisir quelque chose à l'écran.",
    },
    defi: {
      enonce: "Quel est le plus grand : 54 ou 45 ?",
      correction: "54.",
    },
  },

  /* ===================== SEMAINE 2 · Le potager ===================== */
  {
    numero: 6,
    semaine: 2,
    badge: "Jardinier du potager",
    maths: {
      calcul: [
        { q: "5 × 4 =", r: "20" },
        { q: "3 × 6 =", r: "18" },
        { q: "6 × 2 =", r: "12" },
        { q: "12 + 12 =", r: "24" },
        { q: "7 × 2 =", r: "14" },
      ],
      probleme: {
        enonce: "Dans le potager, il y a 4 rangées de 5 salades. Combien de salades ?",
        correction: "4 × 5 = 20. Vingt salades.",
      },
      illu: { emoji: "🥬", label: "salades" },
    },
    francais: {
      regleTitre: "Le pluriel des noms",
      regle: "Au pluriel, la plupart des noms prennent un -s.",
      consigne: "Écris au pluriel.",
      items: ["une salade →", "un légume →", "une carotte →"],
      correction: "des salades — des légumes — des carottes.",
    },
    mot: {
      mot: "Multiplication",
      nature: "nom, maths",
      definition: "Multiplier, c'est ajouter plusieurs fois le même nombre.",
      exemple: "4 × 5 = 5 + 5 + 5 + 5 = 20.",
    },
    geste: {
      titre: "Le double-clic",
      texte: "On appuie deux fois vite pour ouvrir un jeu ou une appli.",
    },
    defi: {
      enonce: "Combien font 3 × 4 ?",
      correction: "12.",
    },
  },
  {
    numero: 7,
    semaine: 2,
    badge: "Roi des tomates",
    maths: {
      calcul: [
        { q: "6 × 3 =", r: "18" },
        { q: "4 × 6 =", r: "24" },
        { q: "8 × 2 =", r: "16" },
        { q: "25 + 25 =", r: "50" },
        { q: "5 × 5 =", r: "25" },
      ],
      probleme: {
        enonce: "Ti Margo cueille 6 tomates sur chaque plant. Il y a 3 plants. Combien de tomates ?",
        correction: "6 × 3 = 18. Dix-huit tomates.",
      },
      illu: { emoji: "🍅", label: "tomates" },
    },
    francais: {
      regleTitre: "Le féminin des noms",
      regle: "Pour mettre un nom au féminin, on ajoute souvent un -e.",
      consigne: "Mets au féminin.",
      items: ["un marchand →", "un ami →", "un voisin →"],
      correction: "une marchande — une amie — une voisine.",
    },
    mot: {
      mot: "Rangée",
      nature: "nom, maths",
      definition: "Une rangée, c'est une ligne d'objets l'un à côté de l'autre.",
      exemple: "4 rangées de 5 salades font 20 salades.",
    },
    geste: {
      titre: "Le clavier",
      texte: "Le clavier sert à écrire des lettres et des chiffres.",
    },
    defi: {
      enonce: "5 plants avec 2 tomates chacun : combien de tomates ?",
      correction: "10.",
    },
  },
  {
    numero: 8,
    semaine: 2,
    badge: "Bon partageur",
    maths: {
      calcul: [
        { q: "12 ÷ 2 =", r: "6" },
        { q: "10 ÷ 5 =", r: "2" },
        { q: "15 ÷ 3 =", r: "5" },
        { q: "8 ÷ 2 =", r: "4" },
        { q: "6 × 4 =", r: "24" },
      ],
      probleme: {
        enonce: "Ti Margo partage 12 carottes entre 3 lapins, à parts égales. Combien chacun ?",
        correction: "12 ÷ 3 = 4. Quatre carottes chacun.",
      },
      illu: { emoji: "🥕", label: "carottes" },
    },
    francais: {
      regleTitre: "Les déterminants",
      regle: "Le petit mot devant le nom : le, la, les, un, une, des.",
      consigne: "Complète avec un déterminant.",
      items: ["… jardin", "… fleurs", "… tomate"],
      correction: "le jardin — les fleurs — une tomate (par exemple).",
    },
    mot: {
      mot: "Partage",
      nature: "nom, maths",
      definition: "Partager, c'est faire des parts égales.",
      exemple: "12 partagé en 3, c'est 4 chacun.",
    },
    geste: {
      titre: "Trouver une lettre",
      texte: "On cherche la lettre sur le clavier pour écrire son prénom.",
    },
    defi: {
      enonce: "On partage 10 fraises entre 2 amis. Combien chacun ?",
      correction: "5.",
    },
  },
  {
    numero: 9,
    semaine: 2,
    badge: "Ami des nombres",
    maths: {
      calcul: [
        { q: "8 est-il pair ?", r: "oui" },
        { q: "7 est-il pair ?", r: "non" },
        { q: "4 + 4 =", r: "8" },
        { q: "9 − 4 =", r: "5" },
        { q: "3 × 3 =", r: "9" },
      ],
      probleme: {
        enonce: "Ti Margo a 8 graines. Peut-il faire 2 paquets égaux ? Combien dans chaque ?",
        correction: "Oui, 8 est pair : 4 graines par paquet.",
      },
      illu: { emoji: "🫘", label: "graines" },
    },
    francais: {
      regleTitre: "L'adjectif",
      regle: "L'adjectif dit comment est le nom : grand, rouge, joli.",
      consigne: "Souligne l'adjectif.",
      items: ["une grande fleur", "un fruit mûr", "des feuilles vertes"],
      correction: "grande — mûr — vertes.",
    },
    mot: {
      mot: "Pair",
      nature: "adjectif, maths",
      definition: "Un nombre pair se partage en deux parts égales (2, 4, 6, 8…).",
      exemple: "8 est pair ; 7 est impair.",
    },
    geste: {
      titre: "Trouver un chiffre",
      texte: "On trouve les chiffres en haut du clavier pour écrire un nombre.",
    },
    defi: {
      enonce: "Le nombre 6 est-il pair ?",
      correction: "Oui.",
    },
  },
  {
    numero: 10,
    semaine: 2,
    badge: "Champion du calcul",
    maths: {
      calcul: [
        { q: "60 + 40 =", r: "100" },
        { q: "70 + 30 =", r: "100" },
        { q: "100 − 25 =", r: "75" },
        { q: "5 × 6 =", r: "30" },
        { q: "8 + 7 =", r: "15" },
      ],
      probleme: {
        enonce: "Ti Margo a 60 graines. Combien lui en manque-t-il pour en avoir 100 ?",
        correction: "100 − 60 = 40. Il lui manque 40 graines.",
      },
      illu: { emoji: "💯", label: "cent" },
    },
    francais: {
      regleTitre: "L'accord du nom et de l'adjectif",
      regle: "L'adjectif s'accorde avec le nom : une fleur rouge, des fleurs rouges.",
      consigne: "Accorde l'adjectif « vert ».",
      items: ["une feuille …", "des arbres …", "une plante …"],
      correction: "verte — verts — verte.",
    },
    mot: {
      mot: "Complément à 100",
      nature: "expression, maths",
      definition: "Le complément à 100, c'est ce qu'il faut ajouter pour faire 100.",
      exemple: "60 + 40 = 100.",
    },
    geste: {
      titre: "La barre espace",
      texte: "La grande touche met un espace entre les mots.",
    },
    defi: {
      enonce: "Combien faut-il ajouter à 30 pour faire 100 ?",
      correction: "70.",
    },
  },

  /* ===================== SEMAINE 3 · Le jardin de fleurs ===================== */
  {
    numero: 11,
    semaine: 3,
    badge: "Ami des fleurs",
    maths: {
      calcul: [
        { q: "10 + 10 + 10 =", r: "30" },
        { q: "100 + 100 =", r: "200" },
        { q: "3 dizaines =", r: "30" },
        { q: "5 dizaines =", r: "50" },
        { q: "4 × 5 =", r: "20" },
      ],
      probleme: {
        enonce: "Ti Margo compte 3 paquets de 10 fleurs. Combien de fleurs en tout ?",
        correction: "3 × 10 = 30. Trente fleurs.",
      },
      illu: { emoji: "🌺", label: "fleur" },
    },
    francais: {
      regleTitre: "Le présent du verbe être",
      regle: "Je suis, tu es, il est, nous sommes, vous êtes, ils sont.",
      consigne: "Complète avec le verbe être.",
      items: ["Je … content.", "Tu … gentil.", "Ils … là."],
      correction: "suis — es — sont.",
    },
    mot: {
      mot: "Dizaine",
      nature: "nom, maths",
      definition: "Une dizaine, c'est un paquet de dix.",
      exemple: "3 dizaines, c'est 30.",
    },
    geste: {
      titre: "Effacer",
      texte: "La touche pour effacer (←) enlève la dernière lettre écrite.",
    },
    defi: {
      enonce: "Combien font 4 dizaines ?",
      correction: "40.",
    },
  },
  {
    numero: 12,
    semaine: 3,
    badge: "Compteur de pétales",
    maths: {
      calcul: [
        { q: "5, 10, 15, … →", r: "20" },
        { q: "5 × 4 =", r: "20" },
        { q: "5 × 6 =", r: "30" },
        { q: "20 + 5 =", r: "25" },
        { q: "6 × 5 =", r: "30" },
      ],
      probleme: {
        enonce: "Chaque fleur a 5 pétales. Combien de pétales sur 4 fleurs ?",
        correction: "5 × 4 = 20. Vingt pétales.",
      },
      illu: { emoji: "🌻", label: "tournesol" },
    },
    francais: {
      regleTitre: "Le présent du verbe avoir",
      regle: "J'ai, tu as, il a, nous avons, vous avez, ils ont.",
      consigne: "Complète avec le verbe avoir.",
      items: ["J'… un jardin.", "Tu … des fleurs.", "Ils … faim."],
      correction: "ai — as — ont.",
    },
    mot: {
      mot: "Suite",
      nature: "nom, maths",
      definition: "Une suite de nombres suit une règle : 5, 10, 15, 20…",
      exemple: "Ici, on ajoute 5 à chaque fois.",
    },
    geste: {
      titre: "La touche Entrée",
      texte: "La touche Entrée va à la ligne ou valide.",
    },
    defi: {
      enonce: "Continue : 5, 10, 15, 20, … ?",
      correction: "25.",
    },
  },
  {
    numero: 13,
    semaine: 3,
    badge: "Œil de lynx",
    maths: {
      calcul: [
        { q: "45 > 40 ?", r: "oui" },
        { q: "30 < 25 ?", r: "non" },
        { q: "12 et 21 : le + grand →", r: "21" },
        { q: "8 × 3 =", r: "24" },
        { q: "50 − 10 =", r: "40" },
      ],
      probleme: {
        enonce: "Range du plus grand au plus petit : 12, 21, 9, 19.",
        correction: "21, 19, 12, 9.",
      },
      illu: { emoji: "🌸", label: "fleur de cerisier" },
    },
    francais: {
      regleTitre: "Le présent des verbes en -er",
      regle: "Au présent : je joue, tu joues, il joue, nous jouons, vous jouez, ils jouent.",
      consigne: "Conjugue « chanter » au présent.",
      items: ["je …", "tu …", "nous …"],
      correction: "je chante — tu chantes — nous chantons.",
    },
    mot: {
      mot: "Comparer",
      nature: "verbe, maths",
      definition: "Comparer, c'est dire quel nombre est le plus grand (>) ou le plus petit (<).",
      exemple: "21 > 12.",
    },
    geste: {
      titre: "Les majuscules",
      texte: "On garde la touche Maj appuyée pour écrire une grande lettre.",
    },
    defi: {
      enonce: "Quel est le plus grand : 19 ou 21 ?",
      correction: "21.",
    },
  },
  {
    numero: 14,
    semaine: 3,
    badge: "Petit botaniste",
    maths: {
      calcul: [
        { q: "30 + 10 =", r: "40" },
        { q: "50 + 100 =", r: "150" },
        { q: "45 + 10 =", r: "55" },
        { q: "60 + 100 =", r: "160" },
        { q: "7 × 3 =", r: "21" },
      ],
      probleme: {
        enonce: "Il y a 45 fleurs dans le jardin. Ti Margo en plante 10 de plus. Combien en tout ?",
        correction: "45 + 10 = 55. Cinquante-cinq fleurs.",
      },
      illu: { emoji: "🌼", label: "marguerite" },
    },
    francais: {
      regleTitre: "Passé, présent, futur",
      regle: "Hier = passé, aujourd'hui = présent, demain = futur.",
      consigne: "Passé, présent ou futur ?",
      items: ["Hier, il a plu.", "Demain, je jouerai.", "Maintenant, je mange."],
      correction: "passé — futur — présent.",
    },
    mot: {
      mot: "Centaine",
      nature: "nom, maths",
      definition: "Une centaine, c'est un paquet de cent.",
      exemple: "Dans 300, il y a 3 centaines.",
    },
    geste: {
      titre: "Le son et le casque",
      texte: "On met un casque pour écouter sans déranger les autres.",
    },
    defi: {
      enonce: "Ajoute 100 à 60.",
      correction: "160.",
    },
  },
  {
    numero: 15,
    semaine: 3,
    badge: "Géomètre en herbe",
    maths: {
      calcul: [
        { q: "côtés d'un carré =", r: "4" },
        { q: "côtés d'un triangle =", r: "3" },
        { q: "4 + 3 =", r: "7" },
        { q: "4 × 4 =", r: "16" },
        { q: "2 × 9 =", r: "18" },
      ],
      probleme: {
        enonce: "Ti Margo dessine un carré et un triangle. Combien de côtés en tout ?",
        correction: "4 + 3 = 7. Sept côtés.",
      },
      illu: { emoji: "🔷", label: "figure" },
    },
    francais: {
      regleTitre: "L'accord du verbe avec le sujet",
      regle: "Si le sujet est au pluriel, le verbe prend souvent -nt.",
      consigne: "Choisis la bonne forme.",
      items: ["Les fleurs (pousse / poussent).", "Le chat (dort / dorment).", "Les amis (joue / jouent)."],
      correction: "poussent — dort — jouent.",
    },
    mot: {
      mot: "Figure",
      nature: "nom, maths",
      definition: "Une figure géométrique : carré, rectangle, triangle, cercle.",
      exemple: "Le carré a 4 côtés.",
    },
    geste: {
      titre: "Une image ou une photo",
      texte: "On peut regarder une image, ou prendre une photo avec la tablette.",
    },
    defi: {
      enonce: "Combien de côtés a un rectangle ?",
      correction: "4.",
    },
  },

  /* ===================== SEMAINE 4 · Les petites bêtes ===================== */
  {
    numero: 16,
    semaine: 4,
    badge: "Ami des coccinelles",
    maths: {
      calcul: [
        { q: "6 × 5 =", r: "30" },
        { q: "6 × 2 =", r: "12" },
        { q: "6 × 3 =", r: "18" },
        { q: "6 × 4 =", r: "24" },
        { q: "6 × 1 =", r: "6" },
      ],
      probleme: {
        enonce: "Une coccinelle a 6 pattes. Combien de pattes ont 5 coccinelles ?",
        correction: "6 × 5 = 30. Trente pattes.",
      },
      illu: { emoji: "🐞", label: "coccinelle" },
    },
    francais: {
      regleTitre: "Le son [s]",
      regle: "Le son [s] s'écrit s, ss (entre deux voyelles), c (devant e, i) ou ç.",
      consigne: "Complète : s, ss ou c.",
      items: ["la cla__e (classe)", "un gar__on (garçon)", "la __alade"],
      correction: "classe — garçon — salade.",
    },
    mot: {
      mot: "Produit",
      nature: "nom, maths",
      definition: "Le produit, c'est le résultat d'une multiplication.",
      exemple: "Le produit de 6 par 5 est 30.",
    },
    geste: {
      titre: "Regarder une vidéo",
      texte: "On peut regarder une vidéo pour apprendre, puis on l'arrête quand on a fini.",
    },
    defi: {
      enonce: "Combien de pattes ont 2 coccinelles ?",
      correction: "12.",
    },
  },
  {
    numero: 17,
    semaine: 4,
    badge: "Compteur de pattes",
    maths: {
      calcul: [
        { q: "7 × 2 =", r: "14" },
        { q: "7 × 3 =", r: "21" },
        { q: "7 × 1 =", r: "7" },
        { q: "7 + 7 =", r: "14" },
        { q: "3 × 6 =", r: "18" },
      ],
      probleme: {
        enonce: "Une fourmi a 6 pattes. Combien de pattes ont 3 fourmis ?",
        correction: "6 × 3 = 18. Dix-huit pattes.",
      },
      illu: { emoji: "🐜", label: "fourmi" },
    },
    francais: {
      regleTitre: "Le son [k]",
      regle: "Le son [k] s'écrit c (devant a, o, u), qu ou k.",
      consigne: "Complète : c, qu ou k.",
      items: ["un __angourou (kangourou)", "une __arotte", "un mas__e (masque)"],
      correction: "kangourou — carotte — masque.",
    },
    mot: {
      mot: "Paquet",
      nature: "nom, maths",
      definition: "Un paquet, c'est un groupe d'objets rassemblés.",
      exemple: "3 paquets de 6 graines font 18 graines.",
    },
    geste: {
      titre: "Mettre en pause",
      texte: "On appuie sur pause pour arrêter un instant la vidéo.",
    },
    defi: {
      enonce: "3 paquets de 7 : combien en tout ?",
      correction: "21.",
    },
  },
  {
    numero: 18,
    semaine: 4,
    badge: "Bon observateur",
    maths: {
      calcul: [
        { q: "18 ÷ 2 =", r: "9" },
        { q: "20 ÷ 4 =", r: "5" },
        { q: "12 ÷ 3 =", r: "4" },
        { q: "15 ÷ 5 =", r: "3" },
        { q: "4 × 5 =", r: "20" },
      ],
      probleme: {
        enonce: "Ti Margo range 18 graines en paquets de 2. Combien de paquets fait-il ?",
        correction: "18 ÷ 2 = 9. Neuf paquets.",
      },
      illu: { emoji: "🦗", label: "sauterelle" },
    },
    francais: {
      regleTitre: "Les accents",
      regle: "L'accent change le son : é (été), è (mère), ê (forêt).",
      consigne: "Recopie avec les accents.",
      items: ["un ete", "une riviere", "une bete"],
      correction: "un été — une rivière — une bête.",
    },
    mot: {
      mot: "Division",
      nature: "nom, maths",
      definition: "Diviser, c'est partager en parts égales.",
      exemple: "18 ÷ 2 = 9.",
    },
    geste: {
      titre: "Monter ou baisser le son",
      texte: "On règle le son plus fort ou moins fort, selon le besoin.",
    },
    defi: {
      enonce: "20 graines en paquets de 5 : combien de paquets ?",
      correction: "4.",
    },
  },
  {
    numero: 19,
    semaine: 4,
    badge: "Ami des papillons",
    maths: {
      calcul: [
        { q: "4 + 4 =", r: "8" },
        { q: "double de 6 =", r: "12" },
        { q: "moitié de 12 =", r: "6" },
        { q: "8 × 2 =", r: "16" },
        { q: "5 × 4 =", r: "20" },
      ],
      probleme: {
        enonce: "Un papillon a deux ailes pareilles. L'aile gauche a 4 taches. Combien de taches sur les deux ailes ?",
        correction: "4 + 4 = 8. Huit taches.",
      },
      illu: { emoji: "🦋", label: "papillon" },
    },
    francais: {
      regleTitre: "m devant m, b, p",
      regle: "Devant m, b, p, on écrit m au lieu de n : chambre, ombre, emmener.",
      consigne: "Complète : n ou m.",
      items: ["une cha__bre (chambre)", "le te__ps (temps)", "u__ ami (un)"],
      correction: "chambre — temps — un.",
    },
    mot: {
      mot: "Symétrie",
      nature: "nom, maths",
      definition: "Deux moitiés se ressemblent par pliage, comme les ailes d'un papillon.",
      exemple: "Le papillon est symétrique.",
    },
    geste: {
      titre: "Ranger la tablette",
      texte: "Après usage, on range la tablette à sa place, tout doucement.",
    },
    defi: {
      enonce: "L'aile gauche a 5 points. Combien de points sur les deux ailes ?",
      correction: "10.",
    },
  },
  {
    numero: 20,
    semaine: 4,
    badge: "Petit arpenteur",
    maths: {
      calcul: [
        { q: "1 m = ? cm", r: "100" },
        { q: "10 + 10 + 10 =", r: "30" },
        { q: "50 cm + 50 cm =", r: "100 cm" },
        { q: "8 − 5 =", r: "3" },
        { q: "2 × 7 =", r: "14" },
      ],
      probleme: {
        enonce: "Ti Margo mesure une feuille : 8 cm, puis une autre : 5 cm. Quelle est la différence ?",
        correction: "8 − 5 = 3. La différence est de 3 cm.",
      },
      illu: { emoji: "📏", label: "règle" },
    },
    francais: {
      regleTitre: "a ou à",
      regle: "« a » est le verbe avoir ; « à » montre le lieu ou le moment.",
      consigne: "Complète : a ou à.",
      items: ["Ti Margo … un jardin.", "Il va … l'école.", "Elle joue … midi."],
      correction: "a — à — à.",
    },
    mot: {
      mot: "Centimètre",
      nature: "nom, maths",
      definition: "Le centimètre (cm) sert à mesurer les petites longueurs.",
      exemple: "Une règle fait 30 cm.",
    },
    geste: {
      titre: "Dessiner sur l'écran",
      texte: "Avec le doigt ou un stylet, on peut dessiner sur la tablette.",
    },
    defi: {
      enonce: "Combien de cm y a-t-il dans 1 mètre ?",
      correction: "100 cm.",
    },
  },

  /* ===================== SEMAINE 5 · La petite mare ===================== */
  {
    numero: 21,
    semaine: 5,
    badge: "Ami de la mare",
    maths: {
      calcul: [
        { q: "1 L + 1 L =", r: "2 L" },
        { q: "5 × 2 =", r: "10" },
        { q: "10 ÷ 2 =", r: "5" },
        { q: "2 × 5 =", r: "10" },
        { q: "6 + 4 =", r: "10" },
      ],
      probleme: {
        enonce: "Une bouteille contient 2 L. Combien de bouteilles pour avoir 10 L ?",
        correction: "10 ÷ 2 = 5. Cinq bouteilles.",
      },
      illu: { emoji: "💧", label: "goutte d'eau" },
    },
    francais: {
      regleTitre: "et ou est",
      regle: "« et » relie deux mots ; « est » est le verbe être.",
      consigne: "Complète : et ou est.",
      items: ["Le chat … le chien.", "Ti Margo … content.", "Il joue … il rit."],
      correction: "et — est — et.",
    },
    mot: {
      mot: "Litre",
      nature: "nom, maths",
      definition: "Le litre (L) mesure les liquides, comme l'eau.",
      exemple: "Une grande bouteille fait 1 L.",
    },
    geste: {
      titre: "Choisir une couleur",
      texte: "Dans un dessin, on choisit une couleur avant de colorier.",
    },
    defi: {
      enonce: "Combien de bouteilles de 2 L pour avoir 6 L ?",
      correction: "3.",
    },
  },
  {
    numero: 22,
    semaine: 5,
    badge: "Porteur d'eau",
    maths: {
      calcul: [
        { q: "5 kg + 5 kg =", r: "10 kg" },
        { q: "3 × 5 =", r: "15" },
        { q: "2 × 8 =", r: "16" },
        { q: "20 − 5 =", r: "15" },
        { q: "4 × 4 =", r: "16" },
      ],
      probleme: {
        enonce: "Un sac de terre pèse 5 kg. Combien pèsent 3 sacs ?",
        correction: "5 × 3 = 15. Quinze kilos.",
      },
      illu: { emoji: "⚖️", label: "balance" },
    },
    francais: {
      regleTitre: "on ou ont",
      regle: "« on » fait l'action (= il) ; « ont » est le verbe avoir (ils ont).",
      consigne: "Complète : on ou ont.",
      items: ["… arrose les fleurs.", "Ils … soif.", "… joue dans le jardin."],
      correction: "On — ont — On.",
    },
    mot: {
      mot: "Kilogramme",
      nature: "nom, maths",
      definition: "Le kilogramme (kg) mesure la masse, le poids des choses.",
      exemple: "Un sac de riz pèse 5 kg.",
    },
    geste: {
      titre: "Une application (une appli)",
      texte: "Une appli est un petit programme pour jouer, lire ou dessiner.",
    },
    defi: {
      enonce: "Quelle est la masse de 2 sacs de 5 kg ?",
      correction: "10 kg.",
    },
  },
  {
    numero: 23,
    semaine: 5,
    badge: "Maître du temps",
    maths: {
      calcul: [
        { q: "il est 3 h, + 2 h →", r: "5 h" },
        { q: "60 min = ? h", r: "1 h" },
        { q: "2 h = ? min", r: "120" },
        { q: "12 + 3 =", r: "15" },
        { q: "5 × 3 =", r: "15" },
      ],
      probleme: {
        enonce: "Il est 2 h. Le goûter est dans 3 heures. À quelle heure sera le goûter ?",
        correction: "2 h + 3 h = 5 h.",
      },
      illu: { emoji: "🕐", label: "horloge" },
    },
    francais: {
      regleTitre: "L'ordre alphabétique",
      regle: "Les lettres ont un ordre : a, b, c, d… On range les mots avec cet ordre.",
      consigne: "Range dans l'ordre alphabétique.",
      items: ["chat, arbre, banane"],
      correction: "arbre, banane, chat.",
    },
    mot: {
      mot: "Heure",
      nature: "nom, maths",
      definition: "L'heure mesure le temps. Une heure a 60 minutes.",
      exemple: "De 2 h à 5 h, il y a 3 heures.",
    },
    geste: {
      titre: "Ouvrir une appli",
      texte: "On touche l'icône (la petite image) pour ouvrir une appli.",
    },
    defi: {
      enonce: "Il est 4 h. Quelle heure dans 2 heures ?",
      correction: "6 h.",
    },
  },
  {
    numero: 24,
    semaine: 5,
    badge: "Lecteur d'horloge",
    maths: {
      calcul: [
        { q: "30 min + 30 min =", r: "1 h" },
        { q: "1 h = ? min", r: "60" },
        { q: "10 + 5 =", r: "15" },
        { q: "3 × 4 =", r: "12" },
        { q: "10 + 2 =", r: "12" },
      ],
      probleme: {
        enonce: "Un dessin animé commence à 10 h et dure 1 heure. À quelle heure finit-il ?",
        correction: "10 h + 1 h = 11 h.",
      },
      illu: { emoji: "⏰", label: "réveil" },
    },
    francais: {
      regleTitre: "Chercher dans le dictionnaire",
      regle:
        "Dans le dictionnaire, les mots sont rangés dans l'ordre alphabétique : on regarde la 1re lettre, puis la 2e.",
      consigne: "Quel mot vient en premier ?",
      items: ["fleur ou feuille ?", "chat ou chien ?"],
      correction: "feuille (fe avant fl) — chat (cha avant chi).",
    },
    mot: {
      mot: "Durée",
      nature: "nom, maths",
      definition: "La durée, c'est le temps que prend quelque chose.",
      exemple: "Le film dure 1 heure.",
    },
    geste: {
      titre: "Fermer une appli",
      texte: "Quand on a fini, on ferme l'appli proprement.",
    },
    defi: {
      enonce: "Un jeu commence à 1 h et dure 2 heures. À quelle heure finit-il ?",
      correction: "3 h.",
    },
  },
  {
    numero: 25,
    semaine: 5,
    badge: "Petit marchand",
    maths: {
      calcul: [
        { q: "10 − 7 =", r: "3" },
        { q: "5 + 5 =", r: "10" },
        { q: "2 × 3 =", r: "6" },
        { q: "20 − 8 =", r: "12" },
        { q: "4 × 2 =", r: "8" },
      ],
      probleme: {
        enonce: "Ti Margo achète un jouet à 7 € avec un billet de 10 €. Combien lui rend-on ?",
        correction: "10 − 7 = 3. On lui rend 3 €.",
      },
      illu: { emoji: "💰", label: "argent" },
    },
    francais: {
      regleTitre: "Les synonymes",
      regle: "Des synonymes sont des mots qui veulent dire presque pareil : joli = beau.",
      consigne: "Trouve un synonyme.",
      items: ["content →", "grand →", "vite →"],
      correction: "joyeux — immense — rapidement (par exemple).",
    },
    mot: {
      mot: "Monnaie",
      nature: "nom, maths",
      definition: "La monnaie, c'est l'argent qu'on rend quand on a payé trop.",
      exemple: "Je paie 7 € avec 10 €, on me rend 3 €.",
    },
    geste: {
      titre: "Demander de l'aide",
      texte: "Si on est bloqué, on demande à l'adulte ou au maître : c'est normal !",
    },
    defi: {
      enonce: "Je paie 4 € avec un billet de 5 €. On me rend combien ?",
      correction: "1 €.",
    },
  },

  /* ===================== SEMAINE 6 · La fête au jardin ===================== */
  {
    numero: 26,
    semaine: 6,
    badge: "Roi de la fête",
    maths: {
      calcul: [
        { q: "12 − 3 − 2 =", r: "7" },
        { q: "10 + 5 =", r: "15" },
        { q: "3 × 5 =", r: "15" },
        { q: "20 − 6 =", r: "14" },
        { q: "8 + 4 =", r: "12" },
      ],
      probleme: {
        enonce: "Ti Margo cueille 12 fruits, en mange 3 et en donne 2. Combien lui en reste-t-il ?",
        correction: "12 − 3 − 2 = 7. Sept fruits.",
      },
      illu: { emoji: "🍓", label: "fraises" },
    },
    francais: {
      regleTitre: "Les contraires",
      regle: "Un contraire dit l'inverse : grand ≠ petit, jour ≠ nuit.",
      consigne: "Trouve le contraire.",
      items: ["grand →", "ouvrir →", "chaud →"],
      correction: "petit — fermer — froid.",
    },
    mot: {
      mot: "Reste",
      nature: "nom, maths",
      definition: "Le reste, c'est ce qui reste après avoir enlevé.",
      exemple: "12 − 5 = 7 : il reste 7.",
    },
    geste: {
      titre: "Ne pas tout croire sur un écran",
      texte: "Sur un écran, tout n'est pas vrai : si on a un doute, on demande à un adulte.",
    },
    defi: {
      enonce: "J'ai 10 bonbons, j'en mange 4. Combien en restent ?",
      correction: "6.",
    },
  },
  {
    numero: 27,
    semaine: 6,
    badge: "Champion des dizaines",
    maths: {
      calcul: [
        { q: "6 × 10 =", r: "60" },
        { q: "4 × 10 =", r: "40" },
        { q: "10 × 10 =", r: "100" },
        { q: "30 + 30 =", r: "60" },
        { q: "5 × 10 =", r: "50" },
      ],
      probleme: {
        enonce: "Ti Margo prépare 6 paquets de 10 ballons. Combien de ballons en tout ?",
        correction: "6 × 10 = 60. Soixante ballons.",
      },
      illu: { emoji: "🎈", label: "ballons" },
    },
    francais: {
      regleTitre: "Les familles de mots",
      regle: "Des mots de la même famille se ressemblent : fleur, fleuriste, fleurir.",
      consigne: "Trouve un mot de la même famille.",
      items: ["jardin →", "terre →", "fleur →"],
      correction: "jardinier — terrain — fleurir (par exemple).",
    },
    mot: {
      mot: "Calcul",
      nature: "nom, maths",
      definition: "Un calcul, c'est une opération : addition, soustraction, multiplication.",
      exemple: "6 × 10 = 60.",
    },
    geste: {
      titre: "Le temps d'écran",
      texte: "On ne reste pas trop longtemps sur l'écran : on fait des pauses pour reposer ses yeux.",
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
        { q: "20 ÷ 4 =", r: "5" },
        { q: "12 ÷ 4 =", r: "3" },
        { q: "16 ÷ 4 =", r: "4" },
        { q: "8 ÷ 4 =", r: "2" },
        { q: "5 × 4 =", r: "20" },
      ],
      probleme: {
        enonce: "On partage 20 bonbons entre 4 amis, à parts égales. Combien chacun ?",
        correction: "20 ÷ 4 = 5. Cinq bonbons chacun.",
      },
      illu: { emoji: "🍬", label: "bonbons" },
    },
    francais: {
      regleTitre: "La virgule",
      regle: "La virgule sépare les mots d'une liste : des pommes, des poires et des cerises.",
      consigne: "Mets les virgules.",
      items: ["J'aime les fleurs les arbres et les fruits."],
      correction: "J'aime les fleurs, les arbres et les fruits.",
    },
    mot: {
      mot: "Parts égales",
      nature: "expression, maths",
      definition: "Partager en parts égales, c'est donner la même chose à chacun.",
      exemple: "20 ÷ 4 = 5 chacun.",
    },
    geste: {
      titre: "Prendre soin du matériel",
      texte: "On range la tablette, on ne la fait pas tomber : c'est fragile et ça coûte cher.",
    },
    defi: {
      enonce: "12 gâteaux pour 3 amis, à parts égales. Combien chacun ?",
      correction: "4.",
    },
  },
  {
    numero: 29,
    semaine: 6,
    badge: "Arpenteur du jardin",
    maths: {
      calcul: [
        { q: "3 + 3 + 3 + 3 =", r: "12" },
        { q: "4 × 3 =", r: "12" },
        { q: "5 + 5 + 5 + 5 =", r: "20" },
        { q: "2 × 6 =", r: "12" },
        { q: "10 − 4 =", r: "6" },
      ],
      probleme: {
        enonce: "Le tour d'un carré de 3 m de côté. Quelle longueur fait le tour ?",
        correction: "3 + 3 + 3 + 3 = 12. Le tour fait 12 m.",
      },
      illu: { emoji: "🟫", label: "carré de jardin" },
    },
    francais: {
      regleTitre: "Révision : le présent",
      regle: "Au présent, les verbes en -er : -e, -es, -e, -ons, -ez, -ent.",
      consigne: "Conjugue « jouer ».",
      items: ["je …", "nous …", "ils …"],
      correction: "je joue — nous jouons — ils jouent.",
    },
    mot: {
      mot: "Périmètre",
      nature: "nom, maths",
      definition: "Le périmètre, c'est la longueur du tour d'une figure.",
      exemple: "Le tour d'un carré de 3 m fait 12 m.",
    },
    geste: {
      titre: "Éteindre la tablette",
      texte: "Quand on a fini, on éteint la tablette par le bouton, sans la débrancher d'un coup.",
    },
    defi: {
      enonce: "Le tour d'un carré de 5 m de côté ?",
      correction: "20 m.",
    },
  },
  {
    numero: 30,
    semaine: 6,
    badge: "Prêt pour le CM1 ! 🎓",
    maths: {
      calcul: [
        { q: "5 × 6 =", r: "30" },
        { q: "double de 15 =", r: "30" },
        { q: "100 − 70 =", r: "30" },
        { q: "3 × 10 =", r: "30" },
        { q: "24 + 6 =", r: "30" },
      ],
      probleme: {
        enonce: "Ti Margo a exploré son jardin pendant 6 semaines, 5 jours par semaine. Combien de jours en tout ?",
        correction: "6 × 5 = 30. Trente jours.",
      },
      illu: { emoji: "🎓", label: "diplôme" },
    },
    francais: {
      regleTitre: "Le grand bilan",
      regle:
        "Tu sais faire des phrases, accorder et conjuguer au présent. Bravo, tu es prêt pour le CM1 !",
      consigne: "Écris une jolie phrase sur ton jardin (majuscule, point).",
      items: ["(à toi d'écrire !)"],
      correction: "Réponse libre — vérifie la majuscule et le point.",
    },
    mot: {
      mot: "Bilan",
      nature: "nom",
      definition: "Faire le bilan, c'est regarder tout ce qu'on a appris.",
      exemple: "Bravo : direction le CM1 !",
    },
    geste: {
      titre: "Je sais utiliser la tablette",
      texte: "Allumer, toucher, écrire, ranger : tu sais déjà faire plein de choses !",
    },
    defi: {
      enonce: "Combien de coins du jardin Ti Margo a-t-il explorés ?",
      correction: "6 coins.",
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  Défis ★★★★★ (niveau expert) — doux mais malins, à la portée d'un CE2/CM1  */
/*  qui aime réfléchir (énigmes, suites, petits raisonnements).               */
/* -------------------------------------------------------------------------- */
export const defisExpert: Record<number, { enonce: string; correction: string }> = {
  1: {
    enonce: "Dans la cour, il y a des margouillats (4 pattes) et des oiseaux (2 pattes) : en tout 5 têtes et 16 pattes. Combien de chacun ?",
    correction: "3 margouillats et 2 oiseaux. (3 × 4 + 2 × 2 = 12 + 4 = 16 ; et 3 + 2 = 5 têtes.)",
  },
  2: {
    enonce: "Continue la suite : 2, 4, 6, 8… Quel est le 10e nombre ?",
    correction: "20. (On compte de 2 en 2 : le 10e est 2 × 10 = 20.)",
  },
  3: {
    enonce: "On partage 12 mangues. Combien par panier avec 3 paniers ? Et avec 4 paniers ?",
    correction: "4 par panier avec 3 paniers ; 3 par panier avec 4 paniers.",
  },
  4: {
    enonce: "Ti Margo a 7 ans. Sa grande sœur a le double de son âge, moins 3 ans. Quel âge a-t-elle ?",
    correction: "11 ans. (Le double de 7 = 14 ; 14 − 3 = 11.)",
  },
  5: {
    enonce: "Ti Margo aligne 3 fleurs : une rouge, une jaune, une bleue. De combien de façons différentes peut-il les ranger ?",
    correction: "6 façons. (3 choix pour la 1re fleur, 2 pour la 2e, 1 pour la dernière : 3 × 2 × 1 = 6.)",
  },
  6: {
    enonce: "Il y a 4 rangées de 5 salades, mais 2 salades sont mangées par les escargots. Combien de salades restent ?",
    correction: "18. (4 × 5 = 20 ; 20 − 2 = 18.)",
  },
  7: {
    enonce: "Un escargot veut monter un mur de 5 m. Le jour il monte de 3 m, la nuit il glisse de 1 m. Au bout de combien de jours est-il en haut ?",
    correction: "2 jours. (Jour 1 : il monte à 3 m, la nuit il glisse à 2 m ; jour 2 : il monte à 5 m, il est arrivé !)",
  },
  8: {
    enonce: "Combien font 2 + 4 + 6 + 8 + 10 ?",
    correction: "30. (Astuce : 2 + 8 = 10, 4 + 6 = 10, plus 10 : 10 + 10 + 10 = 30.)",
  },
  9: {
    enonce: "Ti Margo n'a que des pièces de 2 €. Combien lui en faut-il pour payer 10 € ?",
    correction: "5 pièces (2 + 2 + 2 + 2 + 2 = 10).",
  },
  10: {
    enonce: "Quel nombre vient juste avant 100 ? Et 3 nombres avant 100 ?",
    correction: "99 ; et 97.",
  },
  11: {
    enonce: "Une fleur a 5 pétales. Combien de pétales sur 6 fleurs ? Et si une fleur perd 1 pétale ?",
    correction: "30 pétales ; puis 29.",
  },
  12: {
    enonce: "Continue : 5, 10, 15, 20… Quel est le 7e nombre ?",
    correction: "35. (C'est 5 × 7 = 35.)",
  },
  13: {
    enonce: "Range du plus petit au plus grand : 45, 54, 4, 40, 5.",
    correction: "4, 5, 40, 45, 54.",
  },
  14: {
    enonce: "Aujourd'hui, c'est mardi. Quel jour sera-t-on dans 3 jours ?",
    correction: "Vendredi.",
  },
  15: {
    enonce: "Combien de côtés ont, ensemble, un carré, un triangle et un rectangle ?",
    correction: "11 côtés. (4 + 3 + 4 = 11.)",
  },
  16: {
    enonce: "Une coccinelle a 6 pattes. Combien de pattes ont 5 coccinelles ?",
    correction: "30 pattes (6 × 5).",
  },
  17: {
    enonce: "Ti Margo voit 3 paquets de 6 graines, plus 2 graines toutes seules. Combien en tout ?",
    correction: "20 graines. (3 × 6 = 18 ; 18 + 2 = 20.)",
  },
  18: {
    enonce: "Dans 12, combien de fois y a-t-il 2 ? Et combien de fois 3 ?",
    correction: "6 fois 2, et 4 fois 3.",
  },
  19: {
    enonce: "Un papillon a deux ailes pareilles. Sur une aile : 4 grands points et 3 petits. Combien de points sur les deux ailes ?",
    correction: "14 points. ((4 + 3) × 2 = 14.)",
  },
  20: {
    enonce: "Une règle fait 30 cm. Combien de petits bâtons de 10 cm peut-on poser bout à bout sur sa longueur ?",
    correction: "3 bâtons.",
  },
  21: {
    enonce: "Une bouteille fait 2 L. Combien de bouteilles pour remplir un seau de 10 L ?",
    correction: "5 bouteilles.",
  },
  22: {
    enonce: "Un sac de terre pèse 5 kg. Combien pèsent 4 sacs ? Et 10 sacs ?",
    correction: "20 kg ; et 50 kg.",
  },
  23: {
    enonce: "Il est 3 h de l'après-midi. Quelle heure dans 2 heures ? Et dans 5 heures ?",
    correction: "5 h ; et 8 h du soir.",
  },
  24: {
    enonce: "Un dessin animé commence à 10 h et dure 2 heures. À quelle heure finit-il ?",
    correction: "12 h (midi).",
  },
  25: {
    enonce: "Ti Margo achète un jouet à 6 € avec un billet de 10 €. Combien lui rend-on ? Et pourrait-il prendre deux jouets à 6 € ?",
    correction: "On lui rend 4 €. Non : deux jouets coûtent 12 €, il n'a que 10 €.",
  },
  26: {
    enonce: "Ti Margo cueille 12 fruits, en mange 3, en donne 2, puis en cueille 4 de plus. Combien en a-t-il ?",
    correction: "11 fruits. (12 − 3 − 2 + 4 = 11.)",
  },
  27: {
    enonce: "Combien font 6 × 10 ? Et 6 × 100 ?",
    correction: "60 ; et 600.",
  },
  28: {
    enonce: "On partage 20 bonbons à égalité entre 4 amis. Combien chacun ? Et s'il y a 5 amis ?",
    correction: "5 chacun avec 4 amis ; 4 chacun avec 5 amis.",
  },
  29: {
    enonce: "Le tour d'un carré de 4 m de côté : quelle longueur ?",
    correction: "16 m (4 + 4 + 4 + 4).",
  },
  30: {
    enonce: "Ti Margo a exploré 6 coins du jardin, 5 jours chacun. Combien de jours en tout ?",
    correction: "30 jours (6 × 5).",
  },
};

/* Le carnet de Ti Margo — récit tout doux, jour après jour (jeunes lecteurs). */
export const carnet: Record<number, string> = {
  1: "Bonjour ! Je suis Ti Margo, le petit margouillat. Aujourd'hui, je pars explorer mon jardin. On commence par la cour et le grand manguier. Tu viens ?",
  2: "Le manguier est immense ! Plein de mangues bien mûres tombent dans l'herbe. Miam, ça sent bon le sucre.",
  3: "Je compte mes mangues dans un panier. Une, deux, trois… j'en ai plein ! Bien compter, c'est rigolo.",
  4: "Mon ami le cardinal rouge vient me voir. On partage les fruits. C'est encore plus chouette à deux !",
  5: "Quelle belle première semaine ! Demain, on va voir le potager. À tout à l'heure !",
  6: "Le potager est plein de légumes en rangées bien droites : des salades, des tomates, des carottes !",
  7: "Les tomates sont rouges et toutes rondes. J'en cueille une sur chaque plant. Quel beau panier !",
  8: "Je donne des carottes aux petits lapins. Chacun sa part, c'est plus juste !",
  9: "Je range mes graines en petits paquets. Compter et partager, j'adore ça.",
  10: "Le potager était délicieux ! Demain, place aux fleurs. J'ai hâte de voir toutes les couleurs.",
  11: "Le jardin de fleurs est magnifique ! Du rouge, du jaune, du violet… ça sent merveilleusement bon.",
  12: "Je compte les pétales des fleurs : cinq par fleur, encore et encore. Un, deux, trois… !",
  13: "Une abeille butine tout près de moi. Je l'observe sans bouger. La nature est pleine de vie.",
  14: "Je plante de nouvelles fleurs. Bientôt, le jardin sera encore plus coloré !",
  15: "Les fleurs étaient si belles. Demain, on part à la rencontre des petites bêtes. Chut, on observe !",
  16: "Une coccinelle se promène sur une feuille. Elle a six pattes et de jolis points noirs. Comme elle est belle !",
  17: "Je suis une file de fourmis. Elles travaillent toutes ensemble. Quelle organisation !",
  18: "Une sauterelle saute très loin, hop ! Je compte ses bonds : un, deux, trois !",
  19: "Un papillon ouvre ses ailes : les deux côtés sont pareils. C'est magique, la symétrie !",
  20: "Je mesure les feuilles avec ma petite règle. Chaque feuille est différente. Que d'aventures !",
  21: "Voici la petite mare, fraîche et calme. Des libellules dansent au-dessus de l'eau.",
  22: "Je remplis mon arrosoir pour les plantes. Porter de l'eau, ça donne soif, mais ça fait du bien !",
  23: "Je regarde l'horloge du jardin : c'est bientôt l'heure du goûter. Le temps passe vite quand on s'amuse.",
  24: "Je compte les heures de la journée. Le soleil se couche déjà. Quelle belle journée !",
  25: "Au petit marché du jardin, je vends mes fruits. Je rends la monnaie comme un grand !",
  26: "C'est la fête au jardin ! On rit, on joue, on partage les fruits avec tous les amis.",
  27: "On gonfle des ballons par paquets de dix. Des couleurs partout : quelle joie !",
  28: "On partage le gâteau en parts égales. Chacun la sienne, et tout le monde est content !",
  29: "Je fais une dernière fois le tour du jardin. Que de coins découverts cet été !",
  30: "Quel bel été dans mon jardin ! J'ai tant appris. Et maintenant, me voilà prêt pour le CM1 ! Merci d'avoir exploré avec moi : on a réussi, ensemble ! 🎓",
};

/* « Le savais-tu ? » — ancrage local 🌺 / ouverture monde 🌍, au fil du jardin. */
export const leSaviasTu: Record<number, { portee: "local" | "monde"; texte: string }> = {
  1: { portee: "local", texte: "Le margouillat, comme Ti Margo, est un petit lézard de La Réunion : on le voit souvent sur les murs des maisons !" },
  2: { portee: "local", texte: "Le manguier donne ses mangues l'été à La Réunion ; il en existe beaucoup de variétés différentes." },
  3: { portee: "monde", texte: "Une fourmi peut porter un objet bien plus lourd qu'elle : elle est très forte pour sa taille !" },
  4: { portee: "local", texte: "Le cardinal (foudi rouge) est un petit oiseau rouge vif qu'on voit dans les jardins de La Réunion." },
  5: { portee: "monde", texte: "Un jardin abrite des centaines de petites bêtes qu'on ne voit pas toujours : tout un petit monde !" },
  6: { portee: "local", texte: "À La Réunion, on cultive le chouchou (la christophine), un légume vert qu'on met dans le gratin." },
  7: { portee: "monde", texte: "La tomate est en fait un fruit, mais on la cuisine comme un légume !" },
  8: { portee: "monde", texte: "Les abeilles fabriquent le miel à partir du nectar des fleurs. Merci, les abeilles !" },
  9: { portee: "local", texte: "Beaucoup de familles à La Réunion ont un petit potager dans leur cour, « la kour »." },
  10: { portee: "monde", texte: "Les plantes ont besoin de soleil, d'eau et de terre pour pousser." },
  11: { portee: "local", texte: "L'hibiscus et le frangipanier sont des fleurs très parfumées des jardins réunionnais." },
  12: { portee: "monde", texte: "Les fleurs ont des couleurs vives pour attirer les abeilles et les papillons." },
  13: { portee: "monde", texte: "Une abeille visite des centaines de fleurs chaque jour pour récolter le nectar." },
  14: { portee: "local", texte: "La vanille de La Réunion vient d'une jolie fleur : c'est en fait une orchidée !" },
  15: { portee: "monde", texte: "Certaines fleurs se ferment la nuit et s'ouvrent le matin, avec le soleil." },
  16: { portee: "monde", texte: "La coccinelle mange les pucerons : c'est la grande amie des jardiniers !" },
  17: { portee: "monde", texte: "Les fourmis vivent en grandes familles, les colonies, avec une reine." },
  18: { portee: "monde", texte: "La sauterelle saute très loin grâce à ses grandes pattes arrière." },
  19: { portee: "monde", texte: "Les ailes d'un papillon sont couvertes de minuscules écailles colorées." },
  20: { portee: "local", texte: "À La Réunion vivent des papillons et des insectes qu'on ne trouve nulle part ailleurs." },
  21: { portee: "monde", texte: "La libellule est une excellente chasseuse : elle attrape les moustiques en plein vol !" },
  22: { portee: "monde", texte: "L'eau de pluie sert à arroser le jardin ; on peut la garder dans une citerne." },
  23: { portee: "monde", texte: "Une journée dure 24 heures, partout sur la Terre." },
  24: { portee: "local", texte: "À La Réunion, près de l'équateur, le soleil se couche assez tôt et assez vite." },
  25: { portee: "monde", texte: "L'argent sert à acheter et à vendre ; quand on paie trop, on nous rend la monnaie." },
  26: { portee: "local", texte: "Au jardin, on partage souvent les fruits avec les voisins : c'est la belle tradition créole du partage." },
  27: { portee: "monde", texte: "Un ballon de baudruche est rempli d'air, ou d'un gaz plus léger que l'air." },
  28: { portee: "monde", texte: "Partager en parts égales, c'est exactement ce qu'on appelle… une division !" },
  29: { portee: "local", texte: "Faire le tour de son jardin, c'est déjà un petit voyage plein de découvertes." },
  30: { portee: "monde", texte: "En CM1, tu apprendras encore plein de choses : chaque année, on grandit un peu plus !" },
};
