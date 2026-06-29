/* -------------------------------------------------------------------------- */
/*  Données du cahier de vacances « Vers le CM2 » (CM1 → CM2).                 */
/*  Fil conducteur : Ti Margo découvre son île — un tour nature et côtier de   */
/*  La Réunion en 6 étapes (douces, adaptées aux plus jeunes).                 */
/*  Niveau CM1. Cahier complet : 6 semaines × 5 jours = 30 jours.              */
/*  Moteur d'affichage commun : components/cahier/CahierVacances.tsx.          */
/* -------------------------------------------------------------------------- */

import type { Etape, Jour, MondeDemain } from "@/components/cahier/types";

/** Les 6 étapes du parcours « Ti Margo découvre son île ». */
export const parcours: Etape[] = [
  { semaine: 1, etape: 1, emoji: "🏖️", lieu: "La plage et le lagon", intro: "Ti Margo part découvrir son île par la plage !" },
  { semaine: 2, etape: 2, emoji: "🐢", lieu: "Le récif et les tortues", intro: "Cap sur le récif, à la rencontre des tortues." },
  { semaine: 3, etape: 3, emoji: "🌴", lieu: "La forêt et les fleurs", intro: "On s'enfonce dans la forêt pleine de couleurs." },
  { semaine: 4, etape: 4, emoji: "💧", lieu: "La rivière et les cascades", intro: "On remonte la rivière jusqu'aux cascades." },
  { semaine: 5, etape: 5, emoji: "🛖", lieu: "Le marché et le village", intro: "Jour de marché : couleurs, odeurs et bonnes affaires !" },
  { semaine: 6, etape: 6, emoji: "🌅", lieu: "Le grand pique-nique", intro: "Dernière étape : pique-nique au point de vue, prêt pour le CM2 !" },
];

export const jours: Jour[] = [
  /* ===================== SEMAINE 1 · La plage et le lagon ===================== */
  {
    numero: 1,
    semaine: 1,
    badge: "Petit explorateur",
    maths: {
      calcul: [
        { q: "5 × 3 =", r: "15" },
        { q: "4 × 2 =", r: "8" },
        { q: "12 + 7 =", r: "19" },
        { q: "20 − 6 =", r: "14" },
        { q: "2 × 5 =", r: "10" },
      ],
      probleme: {
        enonce:
          "Sur la plage, Ti Margo ramasse 8 coquillages le matin et 6 l'après-midi. Combien en a-t-il en tout ?",
        correction: "8 + 6 = 14. Il a 14 coquillages.",
      },
      illu: { emoji: "🐚", label: "coquillages" },
    },
    francais: {
      regleTitre: "Le point et la majuscule",
      regle:
        "Une phrase commence par une majuscule et se termine par un point.",
      consigne: "Recopie en ajoutant la majuscule et le point.",
      items: ["ti margo aime la plage", "le lagon est calme", "les poissons nagent"],
      correction:
        "Ti Margo aime la plage. — Le lagon est calme. — Les poissons nagent.",
    },
    mot: {
      mot: "Addition",
      nature: "nom, maths",
      definition: "Une addition, c'est quand on ajoute des nombres ensemble.",
      exemple: "3 + 2 = 5 est une addition.",
    },
    geste: {
      titre: "Allumer l'ordinateur",
      texte: "On appuie sur le bouton « marche » pour démarrer l'ordinateur.",
    },
    defi: {
      enonce: "Quel nombre vient juste après 19 ?",
      correction: "20.",
    },
  },
  {
    numero: 2,
    semaine: 1,
    badge: "Ami du lagon",
    maths: {
      calcul: [
        { q: "3 × 4 =", r: "12" },
        { q: "5 × 5 =", r: "25" },
        { q: "15 + 10 =", r: "25" },
        { q: "18 − 9 =", r: "9" },
        { q: "10 × 2 =", r: "20" },
      ],
      probleme: {
        enonce:
          "Ti Margo a 12 billes. Il en donne la moitié à un ami. Combien lui en reste-t-il ?",
        correction: "La moitié de 12, c'est 6. Il lui reste 6 billes.",
      },
      illu: { emoji: "🪸", label: "corail" },
    },
    francais: {
      regleTitre: "Le verbe",
      regle:
        "Le verbe dit l'action ou ce que l'on est. Il change quand on change le temps.",
      consigne: "Entoure le verbe de chaque phrase.",
      items: ["Ti Margo nage.", "Les vagues roulent.", "Le soleil brille."],
      correction: "nage — roulent — brille.",
    },
    mot: {
      mot: "Moitié",
      nature: "nom, maths",
      definition: "La moitié, c'est quand on partage en deux parts égales.",
      exemple: "La moitié de 10, c'est 5.",
    },
    geste: {
      titre: "La souris",
      texte: "On déplace la souris pour bouger la flèche à l'écran.",
    },
    defi: {
      enonce: "Range ces nombres du plus petit au plus grand : 5, 2, 8.",
      correction: "2, 5, 8.",
    },
  },
  {
    numero: 3,
    semaine: 1,
    badge: "Œil de poisson",
    maths: {
      calcul: [
        { q: "6 × 2 =", r: "12" },
        { q: "4 × 5 =", r: "20" },
        { q: "23 + 14 =", r: "37" },
        { q: "30 − 12 =", r: "18" },
        { q: "3 × 3 =", r: "9" },
      ],
      probleme: {
        enonce:
          "Dans le lagon, Ti Margo voit 5 groupes de 4 poissons. Combien de poissons voit-il ?",
        correction: "5 × 4 = 20. Il voit 20 poissons.",
      },
      illu: { emoji: "🐠", label: "poissons du lagon" },
    },
    francais: {
      regleTitre: "Le sujet",
      regle:
        "Le sujet répond à la question « Qui est-ce qui ? » posée devant le verbe.",
      consigne: "Souligne le sujet de chaque phrase.",
      items: ["Ti Margo plonge.", "Les enfants jouent.", "Le crabe court."],
      correction: "Ti Margo — Les enfants — Le crabe.",
    },
    mot: {
      mot: "Dizaine",
      nature: "nom, maths",
      definition: "Une dizaine, c'est un paquet de dix unités.",
      exemple: "Dans 30, il y a 3 dizaines.",
    },
    geste: {
      titre: "Le clic gauche",
      texte:
        "On appuie une fois sur le bouton gauche de la souris pour choisir quelque chose.",
    },
    defi: {
      enonce: "Combien de pattes ont 3 chiens ?",
      correction: "12 pattes (3 × 4 = 12).",
    },
  },
  {
    numero: 4,
    semaine: 1,
    badge: "Champion du sable",
    maths: {
      calcul: [
        { q: "7 × 2 =", r: "14" },
        { q: "5 × 4 =", r: "20" },
        { q: "16 + 16 =", r: "32" },
        { q: "25 − 10 =", r: "15" },
        { q: "4 × 4 =", r: "16" },
      ],
      probleme: {
        enonce:
          "Ti Margo remplit 9 seaux de sable, puis encore 7. Combien de seaux a-t-il remplis ?",
        correction: "9 + 7 = 16. Il a rempli 16 seaux.",
      },
      illu: { emoji: "🏖️", label: "château de sable" },
    },
    francais: {
      regleTitre: "Le pluriel des noms",
      regle: "Au pluriel, la plupart des noms prennent un -s.",
      consigne: "Écris ces groupes au pluriel.",
      items: ["un coquillage →", "une vague →", "un poisson →"],
      correction: "des coquillages — des vagues — des poissons.",
    },
    mot: {
      mot: "Double",
      nature: "nom, maths",
      definition: "Le double, c'est deux fois plus.",
      exemple: "Le double de 4, c'est 8.",
    },
    geste: {
      titre: "Le clavier",
      texte: "Le clavier sert à écrire des lettres et des chiffres.",
    },
    defi: {
      enonce: "Complète la suite : 2, 4, 6, … ?",
      correction: "8 : on ajoute 2 à chaque fois.",
    },
  },
  {
    numero: 5,
    semaine: 1,
    badge: "Cap sur le CM2",
    maths: {
      calcul: [
        { q: "8 × 2 =", r: "16" },
        { q: "3 × 5 =", r: "15" },
        { q: "40 + 20 =", r: "60" },
        { q: "50 − 20 =", r: "30" },
        { q: "10 × 3 =", r: "30" },
      ],
      probleme: {
        enonce: "Une glace coûte 2 €. Combien coûtent 3 glaces ?",
        correction: "3 × 2 = 6. Les 3 glaces coûtent 6 €.",
      },
      illu: { emoji: "🍦", label: "glace" },
    },
    francais: {
      regleTitre: "Masculin et féminin",
      regle: "Pour mettre un mot au féminin, on ajoute souvent un -e.",
      consigne: "Mets au féminin.",
      items: ["un ami →", "un marchand →", "un petit →"],
      correction: "une amie — une marchande — une petite.",
    },
    mot: {
      mot: "Différence",
      nature: "nom, maths",
      definition: "La différence, c'est le résultat d'une soustraction.",
      exemple: "La différence entre 9 et 4 est 5, car 9 − 4 = 5.",
    },
    geste: {
      titre: "L'écran",
      texte: "L'écran montre ce que fait l'ordinateur (textes, images, jeux).",
    },
    defi: {
      enonce: "Ti Margo a 4 coquillages, il en trouve 3 de plus. Combien en a-t-il ?",
      correction: "7 coquillages (4 + 3 = 7).",
    },
  },

  /* ===================== SEMAINE 2 · Le récif et les tortues ===================== */
  {
    numero: 6,
    semaine: 2,
    badge: "Ami des tortues",
    maths: {
      calcul: [
        { q: "6 × 3 =", r: "18" },
        { q: "7 × 2 =", r: "14" },
        { q: "25 + 25 =", r: "50" },
        { q: "40 − 15 =", r: "25" },
        { q: "9 × 2 =", r: "18" },
      ],
      probleme: {
        enonce:
          "Une tortue pond 4 paquets de 10 œufs. Combien d'œufs pond-elle en tout ?",
        correction: "4 × 10 = 40. Elle pond 40 œufs.",
      },
      illu: { emoji: "🐢", label: "tortue" },
    },
    francais: {
      regleTitre: "Le présent des verbes en -er",
      regle:
        "Au présent, les verbes en -er finissent par -e, -es, -e, -ons, -ez, -ent.",
      consigne: "Conjugue le verbe « nager » au présent.",
      items: ["je …", "tu …", "nous …"],
      correction: "je nage — tu nages — nous nageons.",
    },
    mot: {
      mot: "Triple",
      nature: "nom, maths",
      definition: "Le triple, c'est trois fois plus.",
      exemple: "Le triple de 4, c'est 12.",
    },
    geste: {
      titre: "Le double-clic",
      texte:
        "On clique deux fois très vite avec le bouton gauche pour ouvrir quelque chose.",
    },
    defi: {
      enonce: "Combien de pattes ont 5 tortues ?",
      correction: "20 pattes (5 × 4 = 20).",
    },
  },
  {
    numero: 7,
    semaine: 2,
    badge: "Plongeur du récif",
    maths: {
      calcul: [
        { q: "8 × 3 =", r: "24" },
        { q: "6 × 4 =", r: "24" },
        { q: "35 + 15 =", r: "50" },
        { q: "60 − 25 =", r: "35" },
        { q: "5 × 6 =", r: "30" },
      ],
      probleme: {
        enonce:
          "Sur le récif, Ti Margo compte 6 tortues le matin et 9 l'après-midi. Combien en tout ?",
        correction: "6 + 9 = 15. Il a vu 15 tortues.",
      },
      illu: { emoji: "🪸", label: "récif de corail" },
    },
    francais: {
      regleTitre: "Nom commun et nom propre",
      regle:
        "Le nom propre désigne une personne ou un lieu précis et prend une majuscule (Ti Margo, La Réunion). Le nom commun désigne tout le reste.",
      consigne: "Range chaque mot : nom propre ou nom commun ?",
      items: ["tortue", "Réunion", "récif"],
      correction: "tortue → commun ; Réunion → propre ; récif → commun.",
    },
    mot: {
      mot: "Quart",
      nature: "nom, maths",
      definition: "Le quart, c'est quand on partage en quatre parts égales.",
      exemple: "Le quart de 8, c'est 2.",
    },
    geste: {
      titre: "Le clic droit",
      texte:
        "On appuie sur le bouton droit de la souris pour faire apparaître un petit menu.",
    },
    defi: {
      enonce: "Range du plus grand au plus petit : 14, 41, 24.",
      correction: "41, 24, 14.",
    },
  },
  {
    numero: 8,
    semaine: 2,
    badge: "Gardien du corail",
    maths: {
      calcul: [
        { q: "7 × 3 =", r: "21" },
        { q: "9 × 3 =", r: "27" },
        { q: "28 + 12 =", r: "40" },
        { q: "100 − 40 =", r: "60" },
        { q: "4 × 6 =", r: "24" },
      ],
      probleme: {
        enonce:
          "Ti Margo partage 12 algues entre 3 tortues, à parts égales. Combien chacune en reçoit-elle ?",
        correction: "12 ÷ 3 = 4. Chaque tortue reçoit 4 algues.",
      },
      illu: { emoji: "🐠", label: "poissons du récif" },
    },
    francais: {
      regleTitre: "L'accord du verbe avec le sujet",
      regle:
        "Le verbe s'accorde avec son sujet : si le sujet est au pluriel, le verbe prend souvent -nt.",
      consigne: "Choisis la bonne forme.",
      items: [
        "Les tortues (nage / nagent).",
        "Le poisson (saute / sautent).",
        "Les enfants (rit / rient).",
      ],
      correction: "nagent — saute — rient.",
    },
    mot: {
      mot: "Partage",
      nature: "nom, maths",
      definition: "Partager, c'est séparer en parts égales (c'est une division).",
      exemple: "Partager 6 bonbons entre 2, c'est 3 chacun.",
    },
    geste: {
      titre: "La barre espace",
      texte: "La grande touche en bas du clavier sert à mettre un espace entre les mots.",
    },
    defi: {
      enonce: "Combien font 3 dizaines + 5 unités ?",
      correction: "35.",
    },
  },
  {
    numero: 9,
    semaine: 2,
    badge: "Compteur d'écailles",
    maths: {
      calcul: [
        { q: "8 × 4 =", r: "32" },
        { q: "6 × 5 =", r: "30" },
        { q: "45 + 45 =", r: "90" },
        { q: "90 − 30 =", r: "60" },
        { q: "7 × 4 =", r: "28" },
      ],
      probleme: {
        enonce:
          "Une tortue mesure 80 cm, une autre 60 cm. Quelle est la différence de longueur ?",
        correction: "80 − 60 = 20. La différence est de 20 cm.",
      },
      illu: { emoji: "🐢", label: "tortue verte" },
    },
    francais: {
      regleTitre: "Le pluriel des noms en -eau / -au",
      regle: "Les noms en -eau et -au prennent un -x au pluriel.",
      consigne: "Écris au pluriel.",
      items: ["un bateau →", "un oiseau →", "un château →"],
      correction: "des bateaux — des oiseaux — des châteaux.",
    },
    mot: {
      mot: "Mesurer",
      nature: "verbe, maths",
      definition: "Mesurer, c'est trouver la longueur, la masse ou la durée d'une chose.",
      exemple: "On mesure une longueur avec une règle.",
    },
    geste: {
      titre: "La touche Entrée",
      texte: "La touche Entrée sert à aller à la ligne ou à valider.",
    },
    defi: {
      enonce: "Quel est le double de 25 ?",
      correction: "50.",
    },
  },
  {
    numero: 10,
    semaine: 2,
    badge: "Cap sur la forêt",
    maths: {
      calcul: [
        { q: "9 × 4 =", r: "36" },
        { q: "5 × 7 =", r: "35" },
        { q: "50 + 50 =", r: "100" },
        { q: "75 − 25 =", r: "50" },
        { q: "6 × 6 =", r: "36" },
      ],
      probleme: {
        enonce: "Ti Margo achète 3 cartes postales de tortues à 2 € chacune. Combien paie-t-il ?",
        correction: "3 × 2 = 6. Il paie 6 €.",
      },
      illu: { emoji: "🐢", label: "tortue" },
    },
    francais: {
      regleTitre: "a ou à",
      regle:
        "« a » (sans accent) est le verbe avoir ; « à » (avec accent) est un petit mot qui montre le lieu ou le but.",
      consigne: "Complète avec a ou à.",
      items: ["Ti Margo … une tortue.", "Il va … la plage.", "Elle … froid."],
      correction: "a — à — a.",
    },
    mot: {
      mot: "Centaine",
      nature: "nom, maths",
      definition: "Une centaine, c'est un paquet de cent unités.",
      exemple: "Dans 300, il y a 3 centaines.",
    },
    geste: {
      titre: "Les majuscules (touche Maj)",
      texte: "On garde la touche Maj appuyée pour écrire une lettre en majuscule.",
    },
    defi: {
      enonce: "Combien de pattes ont 10 tortues et 1 crabe ?",
      correction: "44 pattes (10 × 4 = 40, plus 4 pour le crabe).",
    },
  },

  /* ===================== SEMAINE 3 · La forêt et les fleurs ===================== */
  {
    numero: 11,
    semaine: 3,
    badge: "Explorateur de la forêt",
    maths: {
      calcul: [
        { q: "7 × 5 =", r: "35" },
        { q: "8 × 5 =", r: "40" },
        { q: "36 + 24 =", r: "60" },
        { q: "80 − 35 =", r: "45" },
        { q: "9 × 5 =", r: "45" },
      ],
      probleme: {
        enonce: "Dans la forêt, Ti Margo voit 7 arbres avec 5 fleurs chacun. Combien de fleurs ?",
        correction: "7 × 5 = 35. Il voit 35 fleurs.",
      },
      illu: { emoji: "🌺", label: "fleur" },
    },
    francais: {
      regleTitre: "L'adjectif",
      regle:
        "L'adjectif donne un détail sur le nom (sa couleur, sa taille…). Il s'accorde avec le nom.",
      consigne: "Souligne l'adjectif.",
      items: ["une grande forêt", "des fleurs rouges", "un arbre vert"],
      correction: "grande — rouges — vert.",
    },
    mot: {
      mot: "Somme",
      nature: "nom, maths",
      definition: "La somme, c'est le résultat d'une addition.",
      exemple: "La somme de 4 et 3 est 7.",
    },
    geste: {
      titre: "Effacer (Retour arrière)",
      texte: "La touche Retour arrière (←) efface la lettre juste avant le curseur.",
    },
    defi: {
      enonce: "Continue la suite : 5, 10, 15, … ?",
      correction: "20 (on ajoute 5 à chaque fois).",
    },
  },
  {
    numero: 12,
    semaine: 3,
    badge: "Ami des fleurs",
    maths: {
      calcul: [
        { q: "6 × 7 =", r: "42" },
        { q: "8 × 6 =", r: "48" },
        { q: "47 + 33 =", r: "80" },
        { q: "100 − 55 =", r: "45" },
        { q: "7 × 6 =", r: "42" },
      ],
      probleme: {
        enonce: "Ti Margo cueille 24 fleurs et fait 4 bouquets égaux. Combien de fleurs par bouquet ?",
        correction: "24 ÷ 4 = 6. Il met 6 fleurs par bouquet.",
      },
      illu: { emoji: "💐", label: "bouquet" },
    },
    francais: {
      regleTitre: "L'accord de l'adjectif",
      regle:
        "L'adjectif s'accorde en genre et en nombre avec le nom : grand → grande → grands → grandes.",
      consigne: "Accorde l'adjectif « petit ».",
      items: ["une … fleur", "des … arbres", "une … cascade"],
      correction: "petite — petits — petite.",
    },
    mot: {
      mot: "Produit",
      nature: "nom, maths",
      definition: "Le produit, c'est le résultat d'une multiplication.",
      exemple: "Le produit de 3 par 4 est 12.",
    },
    geste: {
      titre: "Enregistrer son travail",
      texte: "On enregistre pour garder son travail (souvent avec Ctrl + S).",
    },
    defi: {
      enonce: "Quelle est la moitié de 40 ?",
      correction: "20.",
    },
  },
  {
    numero: 13,
    semaine: 3,
    badge: "Botaniste en herbe",
    maths: {
      calcul: [
        { q: "9 × 6 =", r: "54" },
        { q: "7 × 7 =", r: "49" },
        { q: "64 + 16 =", r: "80" },
        { q: "95 − 45 =", r: "50" },
        { q: "8 × 7 =", r: "56" },
      ],
      probleme: {
        enonce: "Un arbre fait 9 m de haut, un autre 6 m. Combien mesurent-ils ensemble ?",
        correction: "9 + 6 = 15. Ensemble, ils mesurent 15 m.",
      },
      illu: { emoji: "🌳", label: "arbre" },
    },
    francais: {
      regleTitre: "Le féminin des adjectifs",
      regle:
        "Souvent le féminin de l'adjectif prend un -e : vert → verte. Parfois la fin double : gros → grosse.",
      consigne: "Mets au féminin.",
      items: ["grand →", "petit →", "vert →"],
      correction: "grande — petite — verte.",
    },
    mot: {
      mot: "Hauteur",
      nature: "nom, maths",
      definition: "La hauteur, c'est la mesure du bas vers le haut.",
      exemple: "La hauteur d'un arbre se mesure en mètres.",
    },
    geste: {
      titre: "Le curseur",
      texte: "Le curseur est le petit trait qui clignote à l'endroit où l'on va écrire.",
    },
    defi: {
      enonce: "J'ai 5 paquets de 10 fleurs. Combien de fleurs ?",
      correction: "50.",
    },
  },
  {
    numero: 14,
    semaine: 3,
    badge: "Gardien des couleurs",
    maths: {
      calcul: [
        { q: "9 × 7 =", r: "63" },
        { q: "8 × 8 =", r: "64" },
        { q: "70 + 30 =", r: "100" },
        { q: "100 − 65 =", r: "35" },
        { q: "6 × 8 =", r: "48" },
      ],
      probleme: {
        enonce: "Ti Margo plante 5 rangées de 6 graines. Combien de graines en tout ?",
        correction: "5 × 6 = 30. Il plante 30 graines.",
      },
      illu: { emoji: "🌱", label: "graine" },
    },
    francais: {
      regleTitre: "et ou est",
      regle:
        "« et » relie deux mots ; « est » est le verbe être (on peut le remplacer par « était »).",
      consigne: "Complète avec et ou est.",
      items: ["La fleur … rouge.", "Ti Margo … son ami.", "Il … content."],
      correction: "est — et — est.",
    },
    mot: {
      mot: "Largeur",
      nature: "nom, maths",
      definition: "La largeur, c'est la mesure d'un côté à l'autre.",
      exemple: "On mesure la largeur d'un chemin.",
    },
    geste: {
      titre: "Faire défiler (la molette)",
      texte: "La molette de la souris sert à faire défiler la page vers le haut ou le bas.",
    },
    defi: {
      enonce: "Combien de côtés a un triangle ? Et un carré ?",
      correction: "Le triangle a 3 côtés, le carré en a 4.",
    },
  },
  {
    numero: 15,
    semaine: 3,
    badge: "Cap sur la rivière",
    maths: {
      calcul: [
        { q: "9 × 8 =", r: "72" },
        { q: "7 × 8 =", r: "56" },
        { q: "55 + 45 =", r: "100" },
        { q: "100 − 80 =", r: "20" },
        { q: "9 × 9 =", r: "81" },
      ],
      probleme: {
        enonce:
          "Sur le chemin, Ti Margo marche 15 min, se repose, puis remarche 25 min. Combien de minutes de marche ?",
        correction: "15 + 25 = 40. Il a marché 40 minutes.",
      },
      illu: { emoji: "🌴", label: "palmier" },
    },
    francais: {
      regleTitre: "son ou sont",
      regle:
        "« son » montre à qui c'est (son sac) ; « sont » est le verbe être au pluriel (on peut dire « étaient »).",
      consigne: "Complète avec son ou sont.",
      items: ["… chapeau est vert.", "Les fleurs … belles.", "Il prend … sac."],
      correction: "Son — sont — son.",
    },
    mot: {
      mot: "Périmètre",
      nature: "nom, maths",
      definition: "Le périmètre, c'est la longueur du tour d'une figure.",
      exemple: "Le périmètre d'un carré de 2 cm de côté est 8 cm.",
    },
    geste: {
      titre: "Copier-coller",
      texte: "Copier garde un texte, coller le remet ailleurs (Ctrl + C puis Ctrl + V).",
    },
    defi: {
      enonce: "Quel nombre est le double de 45 ?",
      correction: "90.",
    },
  },

  /* ===================== SEMAINE 4 · La rivière et les cascades ===================== */
  {
    numero: 16,
    semaine: 4,
    badge: "Aventurier de la rivière",
    maths: {
      calcul: [
        { q: "12 ÷ 2 =", r: "6" },
        { q: "20 ÷ 4 =", r: "5" },
        { q: "8 × 9 =", r: "72" },
        { q: "63 + 37 =", r: "100" },
        { q: "110 − 10 =", r: "100" },
      ],
      probleme: {
        enonce: "La rivière fait 100 m. Ti Margo en a remonté 60 m. Combien lui reste-t-il à remonter ?",
        correction: "100 − 60 = 40. Il lui reste 40 m.",
      },
      illu: { emoji: "💧", label: "rivière" },
    },
    francais: {
      regleTitre: "ou ou où",
      regle: "« ou » propose un choix (= ou bien) ; « où » indique le lieu.",
      consigne: "Complète avec ou ou où.",
      items: ["Tu veux l'eau … le jus ?", "Le lieu … il nage.", "Rouge … bleu ?"],
      correction: "ou — où — ou.",
    },
    mot: {
      mot: "Litre",
      nature: "nom, maths",
      definition: "Le litre sert à mesurer un liquide (l'eau, le jus).",
      exemple: "Une grande bouteille contient 1 litre.",
    },
    geste: {
      titre: "Fermer une fenêtre",
      texte: "On clique sur la croix (✕) en haut à droite pour fermer une fenêtre.",
    },
    defi: {
      enonce: "Dans 12, combien y a-t-il de fois 3 ?",
      correction: "4 fois (3 × 4 = 12).",
    },
  },
  {
    numero: 17,
    semaine: 4,
    badge: "Ami de l'eau claire",
    maths: {
      calcul: [
        { q: "15 ÷ 3 =", r: "5" },
        { q: "24 ÷ 4 =", r: "6" },
        { q: "7 × 9 =", r: "63" },
        { q: "56 + 44 =", r: "100" },
        { q: "130 − 30 =", r: "100" },
      ],
      probleme: {
        enonce: "Ti Margo remplit 4 bouteilles de 2 litres. Combien de litres en tout ?",
        correction: "4 × 2 = 8. Il a 8 litres d'eau.",
      },
      illu: { emoji: "🪣", label: "seau d'eau" },
    },
    francais: {
      regleTitre: "Le présent de être et avoir",
      regle:
        "Être : je suis, tu es, il est, nous sommes… Avoir : j'ai, tu as, il a, nous avons…",
      consigne: "Complète avec être ou avoir au présent.",
      items: ["Je … content. (être)", "Tu … un sac. (avoir)", "Nous … prêts. (être)"],
      correction: "suis — as — sommes.",
    },
    mot: {
      mot: "Contenance",
      nature: "nom, maths",
      definition: "La contenance, c'est ce qu'un récipient peut contenir (en litres).",
      exemple: "La contenance d'un seau peut être de 5 litres.",
    },
    geste: {
      titre: "Le bureau",
      texte: "Le bureau, c'est l'écran d'accueil de l'ordinateur, avec les icônes.",
    },
    defi: {
      enonce: "Combien de demi-litres dans 3 litres ?",
      correction: "6 (chaque litre fait 2 demi-litres).",
    },
  },
  {
    numero: 18,
    semaine: 4,
    badge: "Explorateur des cascades",
    maths: {
      calcul: [
        { q: "18 ÷ 2 =", r: "9" },
        { q: "30 ÷ 5 =", r: "6" },
        { q: "9 × 9 =", r: "81" },
        { q: "65 + 35 =", r: "100" },
        { q: "150 − 50 =", r: "100" },
      ],
      probleme: {
        enonce: "Une cascade tombe de 30 m, une autre de 45 m. De combien la 2ᵉ est-elle plus haute ?",
        correction: "45 − 30 = 15. La 2ᵉ cascade est plus haute de 15 m.",
      },
      illu: { emoji: "💦", label: "cascade" },
    },
    francais: {
      regleTitre: "La phrase interrogative",
      regle: "Une phrase qui pose une question se termine par un point d'interrogation ( ? ).",
      consigne: "Ajoute le bon point ( . ou ? ).",
      items: ["Tu viens nager", "L'eau est froide", "Où est la cascade"],
      correction: "Tu viens nager ? — L'eau est froide. — Où est la cascade ?",
    },
    mot: {
      mot: "Égal",
      nature: "adjectif, maths",
      definition: "« Égal » veut dire « qui a la même valeur ». Le signe = montre l'égalité.",
      exemple: "2 + 3 = 5 : les deux côtés sont égaux.",
    },
    geste: {
      titre: "Un dossier",
      texte: "Un dossier sert à ranger des fichiers ensemble, comme une pochette.",
    },
    defi: {
      enonce: "Quel est le tiers de 9 ?",
      correction: "3 (on partage 9 en trois parts égales).",
    },
  },
  {
    numero: 19,
    semaine: 4,
    badge: "Compteur de gouttes",
    maths: {
      calcul: [
        { q: "21 ÷ 3 =", r: "7" },
        { q: "40 ÷ 5 =", r: "8" },
        { q: "8 × 8 =", r: "64" },
        { q: "72 + 28 =", r: "100" },
        { q: "200 − 100 =", r: "100" },
      ],
      probleme: {
        enonce: "Ti Margo voit 5 grenouilles. Chacune fait 3 sauts. Combien de sauts en tout ?",
        correction: "5 × 3 = 15. Il compte 15 sauts.",
      },
      illu: { emoji: "🐸", label: "grenouille" },
    },
    francais: {
      regleTitre: "Les accents (é, è, ê)",
      regle:
        "L'accent change le son : é (été), è (mère), ê (forêt). Il ne faut pas l'oublier !",
      consigne: "Recopie en ajoutant les accents.",
      items: ["la riviere", "une foret", "l'ete"],
      correction: "la rivière — une forêt — l'été.",
    },
    mot: {
      mot: "Heure",
      nature: "nom, maths",
      definition: "L'heure mesure le temps. Une heure a 60 minutes.",
      exemple: "Il y a 60 minutes dans une heure.",
    },
    geste: {
      titre: "Le casque et le son",
      texte: "On branche un casque pour écouter sans déranger ; on règle le son plus ou moins fort.",
    },
    defi: {
      enonce: "Combien de minutes dans une demi-heure ?",
      correction: "30 minutes.",
    },
  },
  {
    numero: 20,
    semaine: 4,
    badge: "Cap sur le marché",
    maths: {
      calcul: [
        { q: "25 ÷ 5 =", r: "5" },
        { q: "16 ÷ 4 =", r: "4" },
        { q: "9 × 7 =", r: "63" },
        { q: "84 + 16 =", r: "100" },
        { q: "250 − 50 =", r: "200" },
      ],
      probleme: {
        enonce: "Ti Margo remplit sa gourde 3 fois par jour. Combien de fois en 4 jours ?",
        correction: "3 × 4 = 12. Il la remplit 12 fois.",
      },
      illu: { emoji: "💧", label: "gourde d'eau" },
    },
    francais: {
      regleTitre: "ce ou se",
      regle: "« ce » montre (ce chemin) ; « se » se place devant un verbe (il se lave).",
      consigne: "Complète avec ce ou se.",
      items: ["… matin, il part.", "Il … lave les mains.", "… sac est lourd."],
      correction: "Ce — se — Ce.",
    },
    mot: {
      mot: "Demi",
      nature: "nom, maths",
      definition: "Un demi, c'est la moitié.",
      exemple: "Un demi-litre, c'est la moitié d'un litre.",
    },
    geste: {
      titre: "Internet (le navigateur)",
      texte: "Le navigateur est le programme qui sert à aller sur Internet.",
    },
    defi: {
      enonce: "Quel est le quart de 20 ?",
      correction: "5.",
    },
  },

  /* ===================== SEMAINE 5 · Le marché et le village ===================== */
  {
    numero: 21,
    semaine: 5,
    badge: "Petit marchand",
    maths: {
      calcul: [
        { q: "10 × 10 =", r: "100" },
        { q: "7 × 8 =", r: "56" },
        { q: "90 + 45 =", r: "135" },
        { q: "100 − 35 =", r: "65" },
        { q: "6 × 9 =", r: "54" },
      ],
      probleme: {
        enonce: "Au marché, un ananas coûte 3 €. Ti Margo en achète 4. Combien paie-t-il ?",
        correction: "4 × 3 = 12. Il paie 12 €.",
      },
      illu: { emoji: "🍍", label: "ananas" },
    },
    francais: {
      regleTitre: "on ou ont",
      regle: "« on » fait l'action (= il) ; « ont » est le verbe avoir au pluriel (= avaient).",
      consigne: "Complète avec on ou ont.",
      items: ["… part au marché.", "Ils … faim.", "… achète des fruits."],
      correction: "On — ont — On.",
    },
    mot: {
      mot: "Monnaie",
      nature: "nom, maths",
      definition: "La monnaie, c'est l'argent qu'on rend quand on a payé trop.",
      exemple: "Je paie 5 € un objet à 3 €, on me rend 2 € de monnaie.",
    },
    geste: {
      titre: "Un onglet",
      texte: "Un onglet est une page ouverte dans le navigateur ; on peut en ouvrir plusieurs.",
    },
    defi: {
      enonce: "Je paie un fruit de 4 € avec un billet de 10 €. Combien me rend-on ?",
      correction: "6 € (10 − 4 = 6).",
    },
  },
  {
    numero: 22,
    semaine: 5,
    badge: "Roi du marché",
    maths: {
      calcul: [
        { q: "8 × 9 =", r: "72" },
        { q: "9 × 9 =", r: "81" },
        { q: "120 + 30 =", r: "150" },
        { q: "100 − 45 =", r: "55" },
        { q: "7 × 7 =", r: "49" },
      ],
      probleme: {
        enonce: "Ti Margo achète 6 mangues pour 12 €. Combien coûte une mangue ?",
        correction: "12 ÷ 6 = 2. Une mangue coûte 2 €.",
      },
      illu: { emoji: "🥭", label: "mangue" },
    },
    francais: {
      regleTitre: "Passé, présent, futur",
      regle: "Hier = passé, aujourd'hui = présent, demain = futur.",
      consigne: "Classe : passé, présent ou futur ?",
      items: ["Hier, il a plu.", "Demain, je partirai.", "Maintenant, il mange."],
      correction: "passé — futur — présent.",
    },
    mot: {
      mot: "Prix",
      nature: "nom, maths",
      definition: "Le prix, c'est combien coûte une chose.",
      exemple: "Le prix d'une glace est 2 €.",
    },
    geste: {
      titre: "Le mot de passe",
      texte: "Le mot de passe est secret : il protège ton compte, on ne le donne à personne.",
    },
    defi: {
      enonce: "3 fruits coûtent 9 €, tous au même prix. Quel est le prix d'un fruit ?",
      correction: "3 € (9 ÷ 3 = 3).",
    },
  },
  {
    numero: 23,
    semaine: 5,
    badge: "Cuisinier créole",
    maths: {
      calcul: [
        { q: "6 × 6 =", r: "36" },
        { q: "8 × 7 =", r: "56" },
        { q: "75 + 75 =", r: "150" },
        { q: "100 − 25 =", r: "75" },
        { q: "9 × 8 =", r: "72" },
      ],
      probleme: {
        enonce: "Une recette demande 2 œufs. Ti Margo fait 3 fois la recette. Combien d'œufs ?",
        correction: "3 × 2 = 6. Il faut 6 œufs.",
      },
      illu: { emoji: "🥘", label: "cari créole" },
    },
    francais: {
      regleTitre: "Les synonymes",
      regle: "Des synonymes sont des mots qui veulent dire presque la même chose (joli = beau).",
      consigne: "Trouve un synonyme.",
      items: ["content →", "grand →", "rapide →"],
      correction: "joyeux — immense — vite (par exemple).",
    },
    mot: {
      mot: "Recette",
      nature: "nom",
      definition: "Une recette explique, étape par étape, comment cuisiner un plat.",
      exemple: "La recette du gâteau demande de la farine et des œufs.",
    },
    geste: {
      titre: "L'imprimante",
      texte: "L'imprimante met sur papier ce qui est à l'écran (comme ce cahier !).",
    },
    defi: {
      enonce: "Pour 4 personnes il faut 8 bananes. Et pour 2 personnes ?",
      correction: "4 bananes (c'est la moitié).",
    },
  },
  {
    numero: 24,
    semaine: 5,
    badge: "Marchand de couleurs",
    maths: {
      calcul: [
        { q: "7 × 9 =", r: "63" },
        { q: "9 × 6 =", r: "54" },
        { q: "60 + 95 =", r: "155" },
        { q: "100 − 15 =", r: "85" },
        { q: "8 × 8 =", r: "64" },
      ],
      probleme: {
        enonce: "Ti Margo vend 7 colliers à 5 € chacun. Combien gagne-t-il ?",
        correction: "7 × 5 = 35. Il gagne 35 €.",
      },
      illu: { emoji: "📿", label: "collier de coquillages" },
    },
    francais: {
      regleTitre: "Les contraires",
      regle: "Un contraire dit l'inverse (grand ≠ petit, chaud ≠ froid).",
      consigne: "Trouve le contraire.",
      items: ["grand →", "ouvrir →", "jour →"],
      correction: "petit — fermer — nuit.",
    },
    mot: {
      mot: "Total",
      nature: "nom, maths",
      definition: "Le total, c'est la somme de tout.",
      exemple: "Le total de mes achats est 15 €.",
    },
    geste: {
      titre: "Se déconnecter",
      texte: "On se déconnecte pour quitter son compte en sécurité quand on a fini.",
    },
    defi: {
      enonce: "Range du moins cher au plus cher : 8 €, 3 €, 12 €.",
      correction: "3 €, 8 €, 12 €.",
    },
  },
  {
    numero: 25,
    semaine: 5,
    badge: "Cap sur le pique-nique",
    maths: {
      calcul: [
        { q: "9 × 9 =", r: "81" },
        { q: "6 × 8 =", r: "48" },
        { q: "110 + 40 =", r: "150" },
        { q: "100 − 70 =", r: "30" },
        { q: "7 × 6 =", r: "42" },
      ],
      probleme: {
        enonce: "Ti Margo achète 3 paquets de 6 gâteaux pour le pique-nique. Combien de gâteaux ?",
        correction: "3 × 6 = 18. Il a 18 gâteaux.",
      },
      illu: { emoji: "🧺", label: "panier de pique-nique" },
    },
    francais: {
      regleTitre: "La virgule dans une liste",
      regle: "Dans une liste, on sépare les mots par des virgules, et « et » avant le dernier.",
      consigne: "Mets les virgules au bon endroit.",
      items: ["J'achète des mangues des ananas et des bananes."],
      correction: "J'achète des mangues, des ananas et des bananes.",
    },
    mot: {
      mot: "Liste",
      nature: "nom",
      definition: "Une liste range des choses les unes sous les autres.",
      exemple: "Ti Margo écrit la liste des courses.",
    },
    geste: {
      titre: "Ouvrir un fichier",
      texte: "On double-clique sur un fichier pour l'ouvrir et voir ce qu'il contient.",
    },
    defi: {
      enonce: "J'ai 18 gâteaux pour 3 amis, à parts égales. Combien chacun ?",
      correction: "6 gâteaux (18 ÷ 3 = 6).",
    },
  },

  /* ===================== SEMAINE 6 · Le grand pique-nique ===================== */
  {
    numero: 26,
    semaine: 6,
    badge: "Ami du grand jour",
    maths: {
      calcul: [
        { q: "10 × 9 =", r: "90" },
        { q: "8 × 6 =", r: "48" },
        { q: "125 + 25 =", r: "150" },
        { q: "100 − 60 =", r: "40" },
        { q: "9 × 7 =", r: "63" },
      ],
      probleme: {
        enonce: "Au point de vue, Ti Margo partage 20 parts de gâteau entre 5 amis. Combien chacun ?",
        correction: "20 ÷ 5 = 4. Chaque ami reçoit 4 parts.",
      },
      illu: { emoji: "🍰", label: "gâteau" },
    },
    francais: {
      regleTitre: "Révision : la phrase",
      regle: "Une phrase a un sens, commence par une majuscule et finit par . ! ou ?",
      consigne: "Remets les mots dans l'ordre.",
      items: ["margo pique-nique fait un Ti", "ses avec amis"],
      correction: "Ti Margo fait un pique-nique avec ses amis.",
    },
    mot: {
      mot: "Carte",
      nature: "nom",
      definition: "Une carte, c'est un dessin qui montre les lieux pour se repérer.",
      exemple: "Sur la carte, on voit la plage et la forêt.",
    },
    geste: {
      titre: "Le plein écran",
      texte: "On met une vidéo ou un jeu en plein écran pour qu'il prenne tout l'espace.",
    },
    defi: {
      enonce: "Quel est le double de 35 ?",
      correction: "70.",
    },
  },
  {
    numero: 27,
    semaine: 6,
    badge: "Champion du calcul",
    maths: {
      calcul: [
        { q: "9 × 8 =", r: "72" },
        { q: "7 × 9 =", r: "63" },
        { q: "140 + 10 =", r: "150" },
        { q: "100 − 95 =", r: "5" },
        { q: "8 × 9 =", r: "72" },
      ],
      probleme: {
        enonce: "Le pique-nique dure de 10 h à 14 h. Combien de temps dure-t-il ?",
        correction: "De 10 h à 14 h, il y a 4 heures.",
      },
      illu: { emoji: "⏰", label: "horloge" },
    },
    francais: {
      regleTitre: "Révision : les accords",
      regle: "Le verbe s'accorde avec le sujet, l'adjectif avec le nom.",
      consigne: "Choisis la bonne forme.",
      items: ["Les oiseaux (chante / chantent).", "des fleurs (joli / jolies)"],
      correction: "chantent — jolies.",
    },
    mot: {
      mot: "Durée",
      nature: "nom, maths",
      definition: "La durée, c'est le temps que prend quelque chose.",
      exemple: "La durée du film est de 2 heures.",
    },
    geste: {
      titre: "La date et l'heure",
      texte: "L'ordinateur affiche la date et l'heure, souvent en bas de l'écran.",
    },
    defi: {
      enonce: "Combien de minutes dans 2 heures ?",
      correction: "120 minutes (2 × 60).",
    },
  },
  {
    numero: 28,
    semaine: 6,
    badge: "Gardien des souvenirs",
    maths: {
      calcul: [
        { q: "6 × 7 =", r: "42" },
        { q: "9 × 9 =", r: "81" },
        { q: "100 + 100 =", r: "200" },
        { q: "200 − 50 =", r: "150" },
        { q: "7 × 8 =", r: "56" },
      ],
      probleme: {
        enonce: "Ti Margo prend 4 photos par étape. Il y a 6 étapes. Combien de photos ?",
        correction: "4 × 6 = 24. Il a 24 photos.",
      },
      illu: { emoji: "📷", label: "appareil photo" },
    },
    francais: {
      regleTitre: "Révision : les homophones",
      regle: "a/à, et/est, on/ont, son/sont : on choisit selon le sens.",
      consigne: "Complète.",
      items: ["Il … chaud (a/à).", "Papa … là (et/est).", "Ils … faim (on/ont)."],
      correction: "a — est — ont.",
    },
    mot: {
      mot: "Souvenir",
      nature: "nom",
      definition: "Un souvenir, c'est une chose qu'on garde en mémoire.",
      exemple: "Cette photo est un beau souvenir.",
    },
    geste: {
      titre: "Ranger ses fichiers",
      texte: "On range ses fichiers dans des dossiers pour les retrouver vite.",
    },
    defi: {
      enonce: "Range du plus grand au plus petit : 24, 42, 4, 40.",
      correction: "42, 40, 24, 4.",
    },
  },
  {
    numero: 29,
    semaine: 6,
    badge: "Presque en CM2",
    maths: {
      calcul: [
        { q: "9 × 9 =", r: "81" },
        { q: "8 × 8 =", r: "64" },
        { q: "150 + 50 =", r: "200" },
        { q: "200 − 75 =", r: "125" },
        { q: "6 × 9 =", r: "54" },
      ],
      probleme: {
        enonce: "Pour le retour, Ti Margo marche 35 min puis 45 min. Combien de temps en tout ?",
        correction: "35 + 45 = 80. Il a marché 80 minutes (1 h 20).",
      },
      illu: { emoji: "🥾", label: "chaussure de marche" },
    },
    francais: {
      regleTitre: "Révision : conjuguer au présent",
      regle: "Au présent, les verbes en -er : -e, -es, -e, -ons, -ez, -ent.",
      consigne: "Conjugue le verbe « manger ».",
      items: ["je …", "nous …", "ils …"],
      correction: "je mange — nous mangeons — ils mangent.",
    },
    mot: {
      mot: "Bilan",
      nature: "nom",
      definition: "Faire le bilan, c'est regarder tout ce qu'on a appris ou fait.",
      exemple: "À la fin de l'année, on fait le bilan.",
    },
    geste: {
      titre: "Éteindre l'ordinateur",
      texte: "On éteint proprement l'ordinateur par le menu, pas en débranchant la prise.",
    },
    defi: {
      enonce: "J'ai 81 €, je dépense 1 €. Combien me reste-t-il ?",
      correction: "80 €.",
    },
  },
  {
    numero: 30,
    semaine: 6,
    badge: "Prêt pour le CM2 ! 🎓",
    maths: {
      calcul: [
        { q: "10 × 10 =", r: "100" },
        { q: "9 × 9 =", r: "81" },
        { q: "175 + 25 =", r: "200" },
        { q: "200 − 100 =", r: "100" },
        { q: "8 × 7 =", r: "56" },
      ],
      probleme: {
        enonce: "Ti Margo a gagné 30 points par jour pendant 5 jours. Combien de points cette semaine ?",
        correction: "30 × 5 = 150. Il a gagné 150 points.",
      },
      illu: { emoji: "🎓", label: "diplôme" },
    },
    francais: {
      regleTitre: "Le grand bilan",
      regle:
        "Tu sais maintenant former des phrases, accorder, conjuguer au présent et écrire sans oublier les accents. Bravo !",
      consigne: "Écris une jolie phrase sur ton été (majuscule, point, accords).",
      items: ["(à toi d'écrire !)"],
      correction: "Réponse libre — vérifie la majuscule, le point et les accords.",
    },
    mot: {
      mot: "Réussite",
      nature: "nom",
      definition: "La réussite, c'est quand on arrive à faire ce qu'on a essayé.",
      exemple: "Bravo pour ta réussite : tu es prêt pour le CM2 !",
    },
    geste: {
      titre: "Tout ce que tu sais faire",
      texte: "Souris, clavier, dossiers, Internet : tu sais déjà beaucoup de choses sur l'ordinateur !",
    },
    defi: {
      enonce: "Combien de jours as-tu travaillé dans ce cahier ?",
      correction: "30 jours. Bravo, champion !",
    },
  },
];

/* Défis ★★★★★ (niveau expert) — un peu plus durs, mais à la portée d'un CM1. */
export const defisExpert: Record<number, { enonce: string; correction: string }> = {
  1: {
    enonce:
      "Avec les chiffres 2 et 5, écris le plus grand nombre à 2 chiffres, puis le plus petit.",
    correction: "Le plus grand : 52. Le plus petit : 25.",
  },
  2: {
    enonce:
      "Ti Margo a 10 coquillages. Il en perd 3, puis en trouve 5. Combien en a-t-il maintenant ?",
    correction: "10 − 3 + 5 = 12. Il a 12 coquillages.",
  },
  3: {
    enonce: "Combien de fois le nombre 2 va-t-il dans 10 ?",
    correction: "5 fois, car 2 + 2 + 2 + 2 + 2 = 10.",
  },
  4: {
    enonce: "Quel nombre est juste au milieu entre 10 et 20 ?",
    correction: "15.",
  },
  5: {
    enonce: "J'ai 3 pièces qui font 6 € en tout. Quelles pièces ai-je ?",
    correction: "Trois pièces de 2 € (2 + 2 + 2 = 6).",
  },
  6: {
    enonce: "Une tortue pond 40 œufs. Seulement la moitié éclot. Combien de bébés tortues ?",
    correction: "20 bébés (la moitié de 40).",
  },
  7: {
    enonce: "Avec les chiffres 3, 1 et 4, écris le plus grand nombre à 3 chiffres.",
    correction: "431.",
  },
  8: {
    enonce: "12 algues partagées entre 4 tortues, puis entre 2 tortues : combien chacune à chaque fois ?",
    correction: "Entre 4 tortues : 3 chacune. Entre 2 tortues : 6 chacune.",
  },
  9: {
    enonce: "Une tortue avance de 5 m par minute. Combien de mètres en 4 minutes ?",
    correction: "20 m (5 × 4 = 20).",
  },
  10: {
    enonce: "J'ai 3 pièces de 2 € et 2 pièces de 1 €. Combien d'argent en tout ?",
    correction: "8 € (6 + 2 = 8).",
  },
  11: {
    enonce: "Continue la suite : 2, 4, 8, 16, … ?",
    correction: "32 (on double à chaque fois).",
  },
  12: {
    enonce: "24 fleurs en bouquets de 6, puis en bouquets de 4 : combien de bouquets à chaque fois ?",
    correction: "4 bouquets de 6 ; 6 bouquets de 4.",
  },
  13: {
    enonce: "Un arbre de 9 m grandit de 1 m par an. Quelle taille dans 3 ans ?",
    correction: "12 m (9 + 3 = 12).",
  },
  14: {
    enonce: "5 rangées de 6 graines, mais 3 ne poussent pas. Combien de plants poussent ?",
    correction: "27 plants (30 − 3 = 27).",
  },
  15: {
    enonce: "Quel nombre est juste au milieu entre 40 et 60 ?",
    correction: "50.",
  },
  16: {
    enonce: "Dans 100, combien y a-t-il de paquets de 10 ?",
    correction: "10 paquets.",
  },
  17: {
    enonce: "J'ai 4 bouteilles de 2 litres. J'en bois 3 litres. Combien de litres reste-t-il ?",
    correction: "5 litres (8 − 3 = 5).",
  },
  18: {
    enonce: "Trois cascades font 45 m, 30 m et 15 m. Quelle est la hauteur totale ?",
    correction: "90 m (45 + 30 + 15 = 90).",
  },
  19: {
    enonce: "5 grenouilles font 3 sauts chacune, mais une ne saute pas. Combien de sauts ?",
    correction: "12 sauts (4 × 3 = 12).",
  },
  20: {
    enonce: "La gourde se remplit 3 fois par jour. Combien de fois en une semaine (7 jours) ?",
    correction: "21 fois (3 × 7 = 21).",
  },
  21: {
    enonce: "4 ananas à 3 €. Je paie avec un billet de 20 €. Combien de monnaie me rend-on ?",
    correction: "8 € (20 − 12 = 8).",
  },
  22: {
    enonce: "6 mangues coûtent 12 €. Combien coûtent 9 mangues au même prix ?",
    correction: "18 € (une mangue = 2 €, donc 9 × 2 = 18).",
  },
  23: {
    enonce: "La recette pour 4 personnes demande 8 bananes. Et pour 6 personnes ?",
    correction: "12 bananes (2 bananes par personne).",
  },
  24: {
    enonce: "Je vends 7 colliers à 5 €, puis j'achète un fruit à 5 €. Combien me reste-t-il ?",
    correction: "30 € (35 − 5 = 30).",
  },
  25: {
    enonce: "3 paquets de 6 gâteaux, partagés entre 9 amis. Combien chacun ?",
    correction: "2 gâteaux (18 ÷ 9 = 2).",
  },
  26: {
    enonce: "20 parts pour 5 amis, mais 1 ami n'a pas faim. Combien pour chacun des 4 autres ?",
    correction: "5 parts (20 ÷ 4 = 5).",
  },
  27: {
    enonce: "Le pique-nique dure de 10 h à 14 h. Combien de minutes en tout ?",
    correction: "240 minutes (4 × 60 = 240).",
  },
  28: {
    enonce: "4 photos par étape sur 6 étapes ; j'en efface 4. Combien de photos reste-t-il ?",
    correction: "20 photos (24 − 4 = 20).",
  },
  29: {
    enonce: "35 min puis 45 min de marche : combien d'heures et de minutes en tout ?",
    correction: "1 h 20 min (80 minutes).",
  },
  30: {
    enonce: "En 30 jours, Ti Margo gagne 10 points par jour. Combien de points en tout ?",
    correction: "300 points. Bravo, champion !",
  },
};

/* Le carnet de Ti Margo — récit doux, jour après jour (Semaine 1 : la plage). */
export const carnet: Record<number, string> = {
  1: "Bonjour ! Je m'appelle Ti Margo. Aujourd'hui, je pars découvrir mon île. On commence par la plage : suis-moi !",
  2: "Le lagon est si calme ce matin. Je compte les coquillages dans le sable… il y en a partout !",
  3: "Je mets la tête sous l'eau : des poissons multicolores nagent autour de moi. Quelle merveille !",
  4: "On construit un grand château de sable avec des amis. Bien compter les seaux, c'est important !",
  5: "Quelle belle première étape ! Demain, on part voir les tortues près du récif. À tout à l'heure !",
  6: "Aujourd'hui, cap sur le récif ! Une grande tortue verte passe tout près de moi. Comme elle est calme et majestueuse.",
  7: "Je plonge le long du corail. Tout est coloré ! Les tortues broutent les algues, tranquilles.",
  8: "J'aide une petite tortue à partager les algues. Chacune sa part, c'est plus juste !",
  9: "Je mesure une tortue avec mes pas : elle est presque aussi longue que moi. Incroyable !",
  10: "Au revoir le récif ! Demain, on s'enfonce dans la forêt pleine de fleurs. J'ai hâte !",
  11: "La forêt est immense et verte. Partout, des fleurs s'ouvrent au soleil. Ça sent si bon !",
  12: "Je cueille des fleurs pour faire des bouquets. Un, deux, trois… j'en fais plein, tous pareils.",
  13: "Cet arbre est plus grand que trois Ti Margo l'un sur l'autre ! Je lève la tête tout en haut.",
  14: "Je plante des graines en rangées bien droites. Bientôt, de nouvelles fleurs pousseront ici.",
  15: "La forêt était magnifique. Demain, on suit la rivière jusqu'aux cascades. En route !",
  16: "La rivière chante entre les rochers. Je remonte le courant en sautant de pierre en pierre.",
  17: "Je remplis mes bouteilles d'eau bien fraîche. Une, deux, trois, quatre : de quoi tenir la journée !",
  18: "Quel bruit ! Voici la cascade. L'eau tombe de très haut et fait des arcs-en-ciel dans les gouttes.",
  19: "Une grenouille saute devant moi, puis une autre. On dirait qu'elles jouent à qui saute le plus loin !",
  20: "Mes pieds sont tout mouillés mais je suis heureux. Demain, jour de marché au village !",
  21: "Le marché est plein de couleurs et d'odeurs ! J'achète des ananas. Il faut bien compter sa monnaie.",
  22: "Tant de fruits ! Des mangues, des letchis, des bananes. Je calcule les prix avant d'acheter.",
  23: "Au village, on me montre une recette créole. Je compte les œufs et les bananes : miam, un bon gâteau !",
  24: "Je vends de jolis colliers de coquillages. Chaque collier rapporte quelques euros. Quel bon marchand !",
  25: "J'ai rempli mon panier pour le grand pique-nique de demain. Dernière étape : le point de vue !",
  26: "On grimpe jusqu'au point de vue. Quelle vue sur toute l'île ! On partage le gâteau entre amis.",
  27: "Le pique-nique dure tout l'après-midi. On rit, on compte les heures qui passent trop vite.",
  28: "Je regarde toutes mes photos du voyage : la plage, les tortues, la forêt, les cascades… que de souvenirs !",
  29: "Le retour approche. Je fais le bilan : j'ai tant appris cet été ! Je me sens grand.",
  30: "C'est la fin du voyage… et le début du CM2 ! Merci d'avoir voyagé avec moi. Bravo, champion ! 🎓",
};

/* « Le savais-tu ? » — ancrage local 🌺 / ouverture monde 🌍. */
export const leSaviasTu: Record<number, { portee: "local" | "monde"; texte: string }> = {
  1: { portee: "local", texte: "À La Réunion, il y a des plages de sable blanc et, près du volcan, des plages de sable noir !" },
  2: { portee: "monde", texte: "Un lagon est une eau calme protégée par un récif de corail ; on en trouve dans beaucoup d'îles du monde." },
  3: { portee: "local", texte: "Dans le lagon de l'Hermitage, les poissons sont protégés : on les regarde, mais on ne les attrape pas." },
  4: { portee: "monde", texte: "Le sable est fait de tout petits morceaux de roche et de coquillages, usés par la mer pendant très longtemps." },
  5: { portee: "local", texte: "À La Réunion, l'eau de la mer est chaude presque toute l'année : on peut se baigner même en hiver !" },
  6: { portee: "local", texte: "Le plus grand récif de corail de La Réunion se trouve sur la côte ouest, à l'Hermitage et à Saint-Leu." },
  7: { portee: "monde", texte: "Les tortues de mer peuvent vivre très vieilles, parfois plus de 80 ans !" },
  8: { portee: "local", texte: "À La Réunion, les tortues vertes sont protégées : il est interdit de les déranger." },
  9: { portee: "monde", texte: "Une tortue de mer revient pondre ses œufs sur la plage où elle est née, même des années plus tard." },
  10: { portee: "local", texte: "Kelonia, à Saint-Leu, est un centre qui soigne et protège les tortues marines blessées." },
  11: { portee: "local", texte: "La forêt de Bébour-Bélouve est souvent dans les nuages : c'est une forêt très humide et très ancienne." },
  12: { portee: "monde", texte: "Les fleurs ont des couleurs vives pour attirer les abeilles et les papillons qui les aident à se reproduire." },
  13: { portee: "local", texte: "Le tamarin des Hauts est un grand arbre qui ne pousse qu'à La Réunion et dans quelques îles voisines." },
  14: { portee: "monde", texte: "Une graine peut attendre longtemps dans la terre avant de pousser, parfois plusieurs années." },
  15: { portee: "local", texte: "À La Réunion, la vanille est une fleur étonnante : c'est en fait une orchidée !" },
  16: { portee: "local", texte: "À La Réunion, certaines rivières sont à sec une partie de l'année : on les appelle des « ravines »." },
  17: { portee: "monde", texte: "L'eau de pluie qui tombe sur la montagne peut mettre des jours à descendre jusqu'à la mer." },
  18: { portee: "local", texte: "Le Trou de Fer, à La Réunion, est une cascade géante qui tombe de plus de 200 mètres !" },
  19: { portee: "monde", texte: "Les grenouilles respirent en partie par leur peau : c'est pour ça qu'elles restent près de l'eau." },
  20: { portee: "local", texte: "Dans les rivières de La Réunion vivent les « bichiques », de tout petits poissons très recherchés." },
  21: { portee: "local", texte: "Sur les marchés réunionnais, on trouve des fruits du monde entier : mangue, letchi, ananas Victoria…" },
  22: { portee: "monde", texte: "Avant l'argent en pièces, les gens échangeaient des objets : c'était le troc." },
  23: { portee: "local", texte: "Le cari est un plat typique de La Réunion, mélange de cuisines indienne, africaine, chinoise et européenne." },
  24: { portee: "monde", texte: "Les premières pièces de monnaie ont été inventées il y a plus de 2 600 ans !" },
  25: { portee: "local", texte: "À La Réunion, le cari se mange souvent avec du riz, des grains (lentilles ou haricots) et du rougail." },
  26: { portee: "local", texte: "Le Maïdo est un point de vue célèbre : de là-haut, on voit le cirque de Mafate, sans route pour y aller." },
  27: { portee: "monde", texte: "Une heure a 60 minutes et une journée a 24 heures : c'est pareil partout sur la Terre." },
  28: { portee: "monde", texte: "Les premières photos en couleur datent d'il y a plus de 100 ans ; avant, tout était en noir et blanc." },
  29: { portee: "local", texte: "La Réunion est une petite île, mais on y trouve la mer, la forêt, des cascades et un volcan : tout un monde !" },
  30: { portee: "monde", texte: "En CM2, tu apprendras encore plein de choses : chaque année, tu deviens un peu plus grand et plus savant." },
};

/* « Comprendre le monde » — un thème par jour (Histoire / Écologie / Futur),
   calé sur le voyage (plage → récif → forêt → cascades → marché → pique-nique). */
export const mondeDemain: Record<number, MondeDemain> = {
  // Semaine 1 — la plage et le lagon
  1: { theme: "histoire", titre: "Le sable raconte le temps", texte: "Le sable est fait de petits bouts de coquillages et de roche, usés par la mer pendant très, très longtemps.", question: "À ton avis, le sable met-il longtemps à se former ?" },
  2: { theme: "ecologie", titre: "Le lagon est fragile", texte: "Le lagon est protégé par le corail. Le corail est vivant : il faut le regarder sans le toucher ni marcher dessus.", question: "Pourquoi ne faut-il pas marcher sur le corail ?" },
  3: { theme: "futur", titre: "L'énergie du soleil", texte: "À La Réunion, le soleil brille fort. Des panneaux peuvent capter sa lumière pour fabriquer de l'électricité propre.", question: "Connais-tu un objet qui marche grâce au soleil ?" },
  4: { theme: "histoire", titre: "Une île longtemps déserte", texte: "Avant, personne ne vivait à La Réunion. Les premiers habitants sont venus par bateau, sans moteur ni électricité.", question: "Comment s'éclairait-on le soir à cette époque ?" },
  5: { theme: "ecologie", titre: "La mer, pas une poubelle", texte: "Sur la plage, on rapporte tous ses déchets. Un sac en plastique dans la mer peut blesser les animaux.", question: "Que fais-tu de tes déchets après un pique-nique à la plage ?" },

  // Semaine 2 — le récif et les tortues
  6: { theme: "histoire", titre: "Des tortues très vieilles", texte: "Les tortues de mer vivent très longtemps, parfois plus de 80 ans : plus vieilles que tes arrière-grands-parents !", question: "À ton avis, quel autre animal vit très longtemps ?" },
  7: { theme: "ecologie", titre: "Protéger les tortues", texte: "À La Réunion, les tortues vertes sont protégées. La nuit, elles viennent pondre leurs œufs sur le sable.", question: "Que peut faire un promeneur pour ne pas les déranger ?" },
  8: { theme: "futur", titre: "Soigner les animaux blessés", texte: "À Saint-Leu, un centre soigne les tortues blessées puis les relâche dans la mer une fois guéries.", question: "Aimerais-tu un métier qui aide les animaux ?" },
  9: { theme: "histoire", titre: "Le corail, un grand mur", texte: "Le récif de corail s'est construit petit à petit, sur des centaines d'années, par des milliers de petits animaux.", question: "Pourquoi le corail met-il si longtemps à grandir ?" },
  10: { theme: "ecologie", titre: "L'eau trop chaude", texte: "Quand la mer devient trop chaude, le corail devient tout blanc et peut mourir : il faut protéger l'océan.", question: "Cite une chose qui réchauffe notre planète." },

  // Semaine 3 — la forêt et les fleurs
  11: { theme: "histoire", titre: "Une forêt très ancienne", texte: "La forêt de Bélouve est là depuis très longtemps. Souvent cachée dans les nuages, elle est très humide.", question: "Pourquoi une forêt ancienne est-elle précieuse ?" },
  12: { theme: "ecologie", titre: "Des fleurs uniques", texte: "Certaines fleurs de La Réunion ne poussent nulle part ailleurs sur la Terre : on dit qu'elles sont endémiques.", question: "Pourquoi serait-ce triste qu'elles disparaissent ?" },
  13: { theme: "futur", titre: "Replanter les arbres", texte: "Pour remettre des arbres sur les pentes, on essaie même des drones qui survolent la forêt et sèment des graines.", question: "Quel autre travail un robot pourrait-il faire pour la nature ?" },
  14: { theme: "histoire", titre: "Les abeilles et les fleurs", texte: "Depuis toujours, les abeilles butinent les fleurs. En allant de l'une à l'autre, elles aident les fleurs à pousser.", question: "Que fabriquent les abeilles avec le nectar des fleurs ?" },
  15: { theme: "ecologie", titre: "Protéger les abeilles", texte: "Les abeilles sont très utiles : sans elles, beaucoup de fruits et de fleurs ne pousseraient plus.", question: "Comment peut-on aider les abeilles près de chez soi ?" },

  // Semaine 4 — la rivière et les cascades
  16: { theme: "histoire", titre: "L'eau faisait tourner les moulins", texte: "Avant l'électricité, la force de l'eau des rivières faisait déjà tourner les moulins pour écraser le grain.", question: "Quelle autre force de la nature peut faire tourner une machine ?" },
  17: { theme: "ecologie", titre: "Le voyage de l'eau", texte: "La pluie tombe sur la montagne, coule dans la rivière, puis va à la mer : c'est le voyage sans fin de l'eau.", question: "Peux-tu raconter le voyage d'une goutte d'eau ?" },
  18: { theme: "futur", titre: "L'électricité de la cascade", texte: "L'eau qui tombe d'une cascade peut faire tourner une machine et fabriquer de l'électricité propre, sans pétrole.", question: "Pourquoi cette énergie est-elle bonne pour la planète ?" },
  19: { theme: "ecologie", titre: "Une eau bien propre", texte: "Dans l'eau claire vivent poissons et grenouilles. Une rivière sale perd vite tous ses petits habitants.", question: "Qu'est-ce qui pourrait salir une rivière ?" },
  20: { theme: "ecologie", titre: "Ne pas gaspiller l'eau", texte: "L'eau qu'on boit est précieuse : il ne faut pas la gaspiller. On ferme le robinet quand on se brosse les dents.", question: "Cite un geste simple pour économiser l'eau." },

  // Semaine 5 — le marché et le village
  21: { theme: "histoire", titre: "Avant l'argent, le troc", texte: "Avant les pièces et les billets, les gens échangeaient des objets : du poisson contre des fruits, par exemple.", question: "Qu'est-ce que tu échangerais contre une mangue ?" },
  22: { theme: "ecologie", titre: "Manger les fruits d'ici", texte: "Au marché, les mangues et les ananas poussent sur l'île : ils n'ont pas voyagé en avion, c'est mieux pour la planète.", question: "Pourquoi est-ce mieux de manger des fruits du coin ?" },
  23: { theme: "histoire", titre: "Le cari, un plat mélangé", texte: "Le cari réunionnais mélange des recettes venues d'Inde, d'Afrique, de Chine et d'Europe : un plat plein d'histoires.", question: "Connais-tu un plat qui vient d'un autre pays ?" },
  24: { theme: "futur", titre: "Moins de plastique au marché", texte: "Demain, on utilisera de plus en plus de paniers et de sacs en tissu pour faire ses courses, au lieu du plastique.", question: "Que pourrais-tu emporter pour ne pas prendre de sac plastique ?" },
  25: { theme: "ecologie", titre: "Ne rien jeter par terre", texte: "Au village comme partout, on met ses déchets à la poubelle : un papier par terre met longtemps à disparaître.", question: "Que fais-tu d'un emballage quand il n'y a pas de poubelle ?" },

  // Semaine 6 — le grand pique-nique, ouverture sur le monde
  26: { theme: "histoire", titre: "Le toit de l'océan Indien", texte: "Du point de vue, on voit très loin. Le plus haut sommet de l'île, le Piton des Neiges, monte à plus de 3 000 mètres !", question: "Qu'est-ce qui change quand on monte très haut ?" },
  27: { theme: "ecologie", titre: "Prendre soin de la Terre", texte: "Depuis le sommet, on voit toute l'île. La protéger, c'est faire de petits gestes chaque jour pour la nature.", question: "Quel petit geste fais-tu déjà pour la planète ?" },
  28: { theme: "futur", titre: "Les métiers de demain", texte: "Plus tard, beaucoup de métiers serviront à protéger la planète : garde forestier, scientifique de la mer, jardinier.", question: "Quel métier « utile à la Terre » aimerais-tu faire ?" },
  29: { theme: "histoire", titre: "Une île, plein de cultures", texte: "À La Réunion vivent des familles venues d'Inde, d'Afrique, de Chine et d'Europe : on apprend à vivre ensemble.", question: "Qu'est-ce qu'on gagne à connaître d'autres cultures ?" },
  30: { theme: "futur", titre: "Le monde de demain, c'est toi", texte: "En CM2, tu apprendras encore plein de choses pour comprendre la Terre et, plus tard, aider à la protéger.", question: "Quel problème du monde aimerais-tu résoudre plus tard ?" },
};
