/* Cahier de vacances « Vers le CP » (Grande Section → CP).
   Niveau PRÉ-LECTEUR : aucune lecture autonome. Tout passe par le visuel et le
   parent (🗣️). On compte jusqu'à 10, on trace lettres/chiffres, on entend le
   premier son des mots, on continue des suites logiques. 15 jours / 3 semaines :
   la maison 🏠, le jardin 🌺, la plage 🏖️. */

import type { Etape } from "@/components/cahier/types";
import type { CahierDataPetit, JourPetit, MondeDemainPetit } from "@/components/cahier/petits-types";

export const parcours: Etape[] = [
  {
    semaine: 1,
    etape: 1,
    emoji: "🏠",
    lieu: "La maison de Ti Margo",
    intro: "On commence tout près : dans la maison, avec les objets et les formes.",
  },
  {
    semaine: 2,
    etape: 2,
    emoji: "🌺",
    lieu: "Le jardin",
    intro: "On sort dans le jardin voir les fleurs et les petits animaux.",
  },
  {
    semaine: 3,
    etape: 3,
    emoji: "🏖️",
    lieu: "La plage",
    intro: "On termine les pieds dans le sable, au bord de la mer.",
  },
];

export const jours: JourPetit[] = [
  /* ===================== SEMAINE 1 — La maison ===================== */
  {
    numero: 1,
    semaine: 1,
    badge: "Le petit compteur",
    activites: [
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte les nounours et écris combien il y en a.",
        emoji: "🧸",
        n: 4,
      },
      {
        bloc: "maths",
        kind: "entoure",
        consigne: "Entoure le groupe qui a LE PLUS de pommes.",
        items: [
          { label: "🍎 🍎", bon: false },
          { label: "🍎 🍎 🍎 🍎", bon: true },
        ],
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images qui commencent par le son [a].",
        son: "a",
        images: [
          { emoji: "✈️", mot: "avion", bon: true },
          { emoji: "🍍", mot: "ananas", bon: true },
          { emoji: "🌳", mot: "arbre", bon: true },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🍎", mot: "pomme", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Repasse sur les ronds, comme la lettre O.",
        modele: "O O O O O",
      },
    ],
    mot: {
      mot: "une maison",
      emoji: "🏠",
      phrase: "Ti Margo habite dans une jolie maison.",
    },
    geste: {
      titre: "Toucher l'écran",
      texte: "Avec un parent, touche doucement l'écran avec un seul doigt.",
    },
    defi: {
      consigne: "Montre 3 objets rouges dans ta maison.",
      correction: "Par exemple : un coussin, un livre, une tomate.",
    },
  },
  {
    numero: 2,
    semaine: 1,
    badge: "L'artiste des sons",
    activites: [
      {
        bloc: "maths",
        kind: "suite",
        consigne: "Continue la suite : dessine ce qui vient après.",
        debut: ["🔴", "🔵", "🔴", "🔵"],
        reponse: ["🔴", "🔵"],
      },
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte les étoiles et écris le nombre.",
        emoji: "⭐",
        n: 5,
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images qui commencent par le son [i].",
        son: "i",
        images: [
          { emoji: "🏝️", mot: "île", bon: true },
          { emoji: "🦎", mot: "iguane", bon: true },
          { emoji: "🖼️", mot: "image", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "🍎", mot: "pomme", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Repasse sur les traits debout, comme la lettre I.",
        modele: "I I I I I",
      },
    ],
    mot: {
      mot: "une étoile",
      emoji: "⭐",
      phrase: "Le soir, on voit des étoiles dans le ciel.",
    },
    geste: {
      titre: "Le grand bouton",
      texte: "Trouve le gros bouton qui allume la tablette. Appuie avec un parent.",
    },
    defi: {
      consigne: "Tape dans tes mains pour chaque syllabe de ton prénom.",
      correction: "Par exemple LÉ-A = 2 fois ; MA-RI-E = 3 fois.",
    },
  },
  {
    numero: 3,
    semaine: 1,
    badge: "Le roi des formes",
    activites: [
      {
        bloc: "maths",
        kind: "relier",
        consigne: "Relie chaque objet à sa forme.",
        paires: [
          { g: "🪟", d: "carré" },
          { g: "⚽", d: "rond" },
          { g: "🍕", d: "triangle" },
        ],
      },
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte les ronds bleus et écris le nombre.",
        emoji: "🔵",
        n: 6,
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images qui commencent par le son [o].",
        son: "o",
        images: [
          { emoji: "🍊", mot: "orange", bon: true },
          { emoji: "🐻", mot: "ours", bon: true },
          { emoji: "👂", mot: "oreille", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "🍎", mot: "pomme", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Repasse sur les ponts (de gauche à droite).",
        modele: "n n n n n",
      },
    ],
    mot: {
      mot: "un rond",
      emoji: "⚽",
      phrase: "Le ballon a la forme d'un rond.",
    },
    geste: {
      titre: "Glisser le doigt",
      texte: "Glisse ton doigt sur l'écran pour faire bouger une image.",
    },
    defi: {
      consigne: "Trouve un objet rond, un carré et un triangle dans la maison.",
      correction: "Rond = assiette ; carré = fenêtre ; triangle = part de pizza.",
    },
  },
  {
    numero: 4,
    semaine: 1,
    badge: "Le malin",
    activites: [
      {
        bloc: "maths",
        kind: "entoure",
        consigne: "Entoure le chiffre 3.",
        items: [
          { label: "1", bon: false },
          { label: "3", bon: true },
          { label: "5", bon: false },
        ],
      },
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte les bananes et écris le nombre.",
        emoji: "🍌",
        n: 3,
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images qui commencent par le son [ch].",
        son: "ch",
        images: [
          { emoji: "🐱", mot: "chat", bon: true },
          { emoji: "🎩", mot: "chapeau", bon: true },
          { emoji: "🐶", mot: "chien", bon: true },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "🍎", mot: "pomme", bon: false },
          { emoji: "🚗", mot: "voiture", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Repasse sur la lettre A en majuscule.",
        modele: "A A A A",
      },
    ],
    mot: {
      mot: "une banane",
      emoji: "🍌",
      phrase: "La banane est jaune et toute douce.",
    },
    geste: {
      titre: "Écouter une histoire",
      texte: "Avec un parent, écoute une petite histoire sur la tablette.",
    },
    defi: {
      consigne: "Compte les doigts d'une main. Combien y en a-t-il ?",
      correction: "Cinq doigts !",
    },
  },
  {
    numero: 5,
    semaine: 1,
    badge: "Le champion de la maison",
    activites: [
      {
        bloc: "maths",
        kind: "suite",
        consigne: "Continue la suite.",
        debut: ["🌟", "🌙", "🌟", "🌙"],
        reponse: ["🌟", "🌙"],
      },
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte les chaises et écris le nombre.",
        emoji: "🪑",
        n: 4,
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images qui commencent par le son [m].",
        son: "m",
        images: [
          { emoji: "🏠", mot: "maison", bon: true },
          { emoji: "⛰️", mot: "montagne", bon: true },
          { emoji: "✋", mot: "main", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "🍎", mot: "pomme", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Repasse sur la lettre M.",
        modele: "M M M M",
      },
    ],
    mot: {
      mot: "une chaise",
      emoji: "🪑",
      phrase: "On s'assoit sur une chaise pour manger.",
    },
    geste: {
      titre: "Mettre le casque",
      texte: "Pour écouter sans déranger, mets le casque sur tes oreilles.",
    },
    defi: {
      consigne: "Raconte ce que tu aimes dans ta maison.",
      correction: "L'enfant raconte — bravo, première semaine finie !",
    },
  },

  /* ===================== SEMAINE 2 — Le jardin ===================== */
  {
    numero: 6,
    semaine: 2,
    badge: "L'ami des animaux",
    activites: [
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte les coccinelles et écris le nombre.",
        emoji: "🐞",
        n: 7,
      },
      {
        bloc: "maths",
        kind: "entoure",
        consigne: "Entoure le groupe qui a LE MOINS de fleurs.",
        items: [
          { label: "🌸 🌸 🌸", bon: false },
          { label: "🌸", bon: true },
        ],
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images qui commencent par le son [r].",
        son: "r",
        images: [
          { emoji: "🌹", mot: "rose", bon: true },
          { emoji: "🤖", mot: "robot", bon: true },
          { emoji: "🦊", mot: "renard", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "🍎", mot: "pomme", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Repasse sur les boucles (comme la lettre e).",
        modele: "e e e e e",
      },
    ],
    mot: {
      mot: "une coccinelle",
      emoji: "🐞",
      phrase: "La coccinelle est rouge avec des points noirs.",
    },
    geste: {
      titre: "Le bouton play",
      texte: "Le bouton ▶️ sert à lancer une vidéo. Montre-le du doigt.",
    },
    defi: {
      consigne: "Compte les pattes d'un chat (en vrai ou en image).",
      correction: "Quatre pattes !",
    },
  },
  {
    numero: 7,
    semaine: 2,
    badge: "Le jardinier",
    activites: [
      {
        bloc: "maths",
        kind: "suite",
        consigne: "Continue la suite des fleurs.",
        debut: ["🌸", "🌼", "🌸", "🌼"],
        reponse: ["🌸", "🌼"],
      },
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte les abeilles et écris le nombre.",
        emoji: "🐝",
        n: 8,
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images qui commencent par le son [b].",
        son: "b",
        images: [
          { emoji: "🍌", mot: "banane", bon: true },
          { emoji: "🎈", mot: "ballon", bon: true },
          { emoji: "⛵", mot: "bateau", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "🐭", mot: "souris", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Repasse sur la lettre B.",
        modele: "B B B B",
      },
    ],
    mot: {
      mot: "une abeille",
      emoji: "🐝",
      phrase: "L'abeille fait du miel avec les fleurs.",
    },
    geste: {
      titre: "Mettre en pause",
      texte: "Le bouton ⏸️ arrête la vidéo un moment. Essaie avec un parent.",
    },
    defi: {
      consigne: "Sens une fleur dans le jardin. Quelle odeur ?",
      correction: "L'enfant décrit l'odeur — bravo le petit jardinier !",
    },
  },
  {
    numero: 8,
    semaine: 2,
    badge: "Le petit savant",
    activites: [
      {
        bloc: "maths",
        kind: "relier",
        consigne: "Relie chaque chiffre à la bonne quantité d'oiseaux.",
        paires: [
          { g: "2", d: "🐦🐦" },
          { g: "4", d: "🐦🐦🐦🐦" },
          { g: "3", d: "🐦🐦🐦" },
        ],
      },
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte les papillons et écris le nombre.",
        emoji: "🦋",
        n: 6,
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images qui commencent par le son [p].",
        son: "p",
        images: [
          { emoji: "🍎", mot: "pomme", bon: true },
          { emoji: "🦋", mot: "papillon", bon: true },
          { emoji: "🐟", mot: "poisson", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "🍌", mot: "banane", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Repasse sur la lettre P.",
        modele: "P P P P",
      },
    ],
    mot: {
      mot: "un papillon",
      emoji: "🦋",
      phrase: "Le papillon a de jolies ailes colorées.",
    },
    geste: {
      titre: "Monter le son",
      texte: "Trouve le bouton pour monter le son, tout doucement.",
    },
    defi: {
      consigne: "Imite le vol d'un papillon avec tes bras.",
      correction: "L'enfant bouge les bras comme des ailes !",
    },
  },
  {
    numero: 9,
    semaine: 2,
    badge: "Le compteur de fleurs",
    activites: [
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte les tournesols et écris le nombre.",
        emoji: "🌻",
        n: 9,
      },
      {
        bloc: "maths",
        kind: "entoure",
        consigne: "Entoure le plus GRAND animal.",
        items: [
          { label: "🐘", bon: true },
          { label: "🐭", bon: false },
          { label: "🐞", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images qui commencent par le son [l].",
        son: "l",
        images: [
          { emoji: "🌙", mot: "lune", bon: true },
          { emoji: "🐰", mot: "lapin", bon: true },
          { emoji: "🦁", mot: "lion", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🍎", mot: "pomme", bon: false },
          { emoji: "🍌", mot: "banane", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Repasse sur la lettre L.",
        modele: "L L L L",
      },
    ],
    mot: {
      mot: "une fleur",
      emoji: "🌻",
      phrase: "Le tournesol est une grande fleur jaune.",
    },
    geste: {
      titre: "La photo",
      texte: "Avec un parent, prends une photo d'une fleur 📷.",
    },
    defi: {
      consigne: "Compte les fleurs du jardin (ou sur une image).",
      correction: "L'enfant compte les fleurs à voix haute.",
    },
  },
  {
    numero: 10,
    semaine: 2,
    badge: "Le champion du jardin",
    activites: [
      {
        bloc: "maths",
        kind: "suite",
        consigne: "Continue la suite des petites bêtes.",
        debut: ["🐞", "🐝", "🐞", "🐝"],
        reponse: ["🐞", "🐝"],
      },
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte les escargots et écris le nombre.",
        emoji: "🐌",
        n: 5,
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images qui commencent par le son [f].",
        son: "f",
        images: [
          { emoji: "🌸", mot: "fleur", bon: true },
          { emoji: "🔥", mot: "feu", bon: true },
          { emoji: "🍓", mot: "fraise", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "🍎", mot: "pomme", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Repasse sur la lettre F.",
        modele: "F F F F",
      },
    ],
    mot: {
      mot: "un escargot",
      emoji: "🐌",
      phrase: "L'escargot avance tout doucement, sa maison sur le dos.",
    },
    geste: {
      titre: "Fermer",
      texte: "Pour arrêter, appuie sur la petite croix ✖️ avec un parent.",
    },
    defi: {
      consigne: "Avance comme un escargot, puis cours comme un lapin !",
      correction: "L'enfant joue le lent puis le rapide — deux semaines, bravo !",
    },
  },

  /* ===================== SEMAINE 3 — La plage ===================== */
  {
    numero: 11,
    semaine: 3,
    badge: "Le petit pêcheur",
    activites: [
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte les coquillages et écris le nombre.",
        emoji: "🐚",
        n: 8,
      },
      {
        bloc: "maths",
        kind: "entoure",
        consigne: "Entoure le chiffre 10.",
        items: [
          { label: "1", bon: false },
          { label: "10", bon: true },
          { label: "6", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images qui commencent par le son [s].",
        son: "s",
        images: [
          { emoji: "☀️", mot: "soleil", bon: true },
          { emoji: "🐍", mot: "serpent", bon: true },
          { emoji: "🎒", mot: "sac", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "🍎", mot: "pomme", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Repasse sur la lettre S.",
        modele: "S S S S",
      },
    ],
    mot: {
      mot: "un coquillage",
      emoji: "🐚",
      phrase: "Sur la plage, je ramasse de jolis coquillages.",
    },
    geste: {
      titre: "Tourner la page",
      texte: "Glisse ton doigt pour tourner la page d'un livre sur la tablette.",
    },
    defi: {
      consigne: "Compte de 1 à 10 tout seul.",
      correction: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10 !",
    },
  },
  {
    numero: 12,
    semaine: 3,
    badge: "Le roi du sable",
    activites: [
      {
        bloc: "maths",
        kind: "suite",
        consigne: "Continue la suite des coquillages.",
        debut: ["🐚", "⭐", "🐚", "⭐"],
        reponse: ["🐚", "⭐"],
      },
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte les crabes et écris le nombre.",
        emoji: "🦀",
        n: 6,
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images qui commencent par le son [t].",
        son: "t",
        images: [
          { emoji: "🐢", mot: "tortue", bon: true },
          { emoji: "🍅", mot: "tomate", bon: true },
          { emoji: "🐯", mot: "tigre", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "🍎", mot: "pomme", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Repasse sur la lettre T.",
        modele: "T T T T",
      },
    ],
    mot: {
      mot: "un crabe",
      emoji: "🦀",
      phrase: "Le crabe marche de côté sur le sable.",
    },
    geste: {
      titre: "Le zoom",
      texte: "Écarte deux doigts sur l'écran pour agrandir l'image.",
    },
    defi: {
      consigne: "Marche de côté comme un crabe !",
      correction: "L'enfant marche en crabe, c'est rigolo !",
    },
  },
  {
    numero: 13,
    semaine: 3,
    badge: "Le plongeur",
    activites: [
      {
        bloc: "maths",
        kind: "relier",
        consigne: "Relie chaque chiffre à la bonne quantité de poissons.",
        paires: [
          { g: "3", d: "🐠🐠🐠" },
          { g: "1", d: "🐠" },
          { g: "2", d: "🐠🐠" },
        ],
      },
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte les poissons et écris le nombre.",
        emoji: "🐠",
        n: 10,
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images qui commencent par le son [v].",
        son: "v",
        images: [
          { emoji: "🐄", mot: "vache", bon: true },
          { emoji: "🚗", mot: "voiture", bon: true },
          { emoji: "🚲", mot: "vélo", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "🍎", mot: "pomme", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Repasse sur la lettre V, comme une vague.",
        modele: "V V V V",
      },
    ],
    mot: {
      mot: "un poisson",
      emoji: "🐠",
      phrase: "Le poisson nage dans la mer bleue.",
    },
    geste: {
      titre: "Parler au micro",
      texte: "Le micro 🎤 écoute ta voix. Tu peux lui dire bonjour !",
    },
    defi: {
      consigne: "Nage comme un poisson avec tes bras !",
      correction: "L'enfant fait des mouvements de nage.",
    },
  },
  {
    numero: 14,
    semaine: 3,
    badge: "Le grand savant",
    activites: [
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Combien y a-t-il de soleils ? Compte et écris.",
        emoji: "☀️",
        n: 1,
      },
      {
        bloc: "maths",
        kind: "entoure",
        consigne: "Entoure le groupe qui a AUTANT de ronds que de carrés.",
        items: [
          { label: "⚫⚫ ⬛", bon: false },
          { label: "⚫⚫ ⬛⬛", bon: true },
        ],
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images qui commencent par le son [d].",
        son: "d",
        images: [
          { emoji: "🐬", mot: "dauphin", bon: true },
          { emoji: "🎲", mot: "dé", bon: true },
          { emoji: "🐉", mot: "dragon", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "🍎", mot: "pomme", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Repasse sur la lettre D.",
        modele: "D D D D",
      },
    ],
    mot: {
      mot: "le soleil",
      emoji: "☀️",
      phrase: "Le soleil brille fort sur la plage.",
    },
    geste: {
      titre: "Baisser le son",
      texte: "Si c'est trop fort, baisse le son avec le bouton.",
    },
    defi: {
      consigne: "Combien de soleils y a-t-il dans le ciel ? Et combien de mains as-tu ?",
      correction: "1 soleil, 2 mains !",
    },
  },
  {
    numero: 15,
    semaine: 3,
    badge: "Le héros du CP",
    activites: [
      {
        bloc: "maths",
        kind: "suite",
        consigne: "Continue la dernière suite !",
        debut: ["☀️", "🌴", "☀️", "🌴"],
        reponse: ["☀️", "🌴"],
      },
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte tes étoiles : tu en as gagné plein !",
        emoji: "⭐",
        n: 10,
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images qui commencent par le son [b] (comme bravo).",
        son: "b",
        images: [
          { emoji: "🎈", mot: "ballon", bon: true },
          { emoji: "⛵", mot: "bateau", bon: true },
          { emoji: "🍌", mot: "banane", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "🍎", mot: "pomme", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Repasse sur le grand mot : BRAVO !",
        modele: "BRAVO !",
      },
    ],
    mot: {
      mot: "un héros",
      emoji: "🦸",
      phrase: "Tu es un héros : tu as fini ton cahier !",
    },
    geste: {
      titre: "Bien ranger",
      texte: "À la fin, éteins l'écran et range la tablette. Bravo !",
    },
    defi: {
      consigne: "Raconte ce que tu as préféré : la maison, le jardin ou la plage ?",
      correction: "L'enfant raconte — félicitations, le cahier est fini !",
    },
  },
];

export const defisExpert: CahierDataPetit["defisExpert"] = {
  1: { enonce: "Combien font 2 et encore 2 ? Compte sur tes doigts.", correction: "2 et 2 font 4." },
  2: { enonce: "Quelle couleur vient après dans : rouge, bleu, rouge, bleu, ... ?", correction: "Rouge ! (puis bleu, et on recommence)." },
  3: { enonce: "Combien y a-t-il de côtés dans un triangle ?", correction: "Trois côtés !" },
  4: { enonce: "J'ai 3 bananes, j'en mange 1. Combien m'en reste-t-il ?", correction: "Il en reste 2." },
  5: { enonce: "Range ces nombres du plus petit au plus grand : 3, 1, 2.", correction: "1, 2, 3." },
  6: { enonce: "Une coccinelle a 6 pattes. Montre 6 avec tes doigts.", correction: "5 d'une main + 1 de l'autre = 6 !" },
  7: { enonce: "Le nombre 5, c'est 4 et combien ?", correction: "4 et 1 (ou 3 et 2, ou 2 et 3...)." },
  8: { enonce: "Il y a 3 papillons jaunes et 3 papillons bleus. Combien en tout ?", correction: "3 et 3 font 6 papillons." },
  9: { enonce: "Quel nombre vient juste après 9 ?", correction: "Le nombre 10 !" },
  10: { enonce: "L'escargot porte sa maison sur le dos. Quel autre animal fait pareil ?", correction: "La tortue ! Elle aussi porte sa maison." },
  11: { enonce: "J'ai 5 coquillages, j'en trouve 2 de plus. Combien en tout ?", correction: "5 et 2 font 7 coquillages." },
  12: { enonce: "Un crabe a 8 pattes et 2 pinces. Plus de pattes ou de pinces ?", correction: "Plus de pattes : 8 c'est plus que 2." },
  13: { enonce: "Il y a 10 poissons. 1 s'en va. Combien en reste-t-il ?", correction: "Il en reste 9." },
  14: { enonce: "As-tu autant d'yeux que de mains ?", correction: "Oui ! 2 yeux et 2 mains : c'est autant, c'est pareil." },
  15: { enonce: "Compte le plus loin possible, à voix haute !", correction: "Jusqu'à 10 et même plus. Tu es prêt pour le CP, bravo !" },
};

export const carnet: CahierDataPetit["carnet"] = {
  1: "Bonjour ! C'est moi, Ti Margo le margouillat. Cet été, je t'invite chez moi ! On commence dans ma maison. Tu es prêt ?",
  2: "Chez moi, il y a plein de couleurs : du rouge, du bleu, du jaune... Tu connais les couleurs, toi ?",
  3: "Regarde autour de toi : la fenêtre est un carré, le ballon un rond, la part de gâteau un triangle. Les formes sont partout !",
  4: "Miam, j'adore les bananes ! À La Réunion, il y a des petites bananes très sucrées qu'on appelle « bananes ti-jacques ».",
  5: "Bravo ! Tu as visité toute ma maison. La semaine prochaine, on sort dans le jardin voir les fleurs et les animaux !",
  6: "Nous voilà dans le jardin ! Écoute : les oiseaux chantent, les abeilles bourdonnent. J'adore me cacher sous les feuilles.",
  7: "Dans le jardin, les abeilles vont de fleur en fleur. Elles ramassent un sucre doré pour faire du miel. Bzzz !",
  8: "Oh, un papillon ! Avant, c'était une chenille toute petite. Puis il a fait une cabane et... pouf, il est devenu papillon !",
  9: "Le tournesol est rigolo : il tourne sa tête pour suivre le soleil toute la journée. Tu vois pourquoi on l'appelle tourne-sol ?",
  10: "L'escargot est mon ami le plus lent. Il porte sa maison partout ! La semaine prochaine, on va à la plage. J'ai hâte !",
  11: "Plouf ! On est à la plage. Le sable est tout chaud sous mes pattes et la mer fait « chhh, chhh ». Tu entends ?",
  12: "Attention, un crabe ! Il marche tout de travers, sur le côté. Et si on l'embête, il pince avec ses grosses pinces !",
  13: "Sous l'eau, c'est magnifique ! Des poissons jaunes, bleus, rayés nagent entre les coraux. On dirait un jardin dans la mer !",
  14: "Le soleil tape fort à la plage ! Moi, j'aime me réchauffer dessus. Mais toi, n'oublie pas ton chapeau et ta crème !",
  15: "On a tout visité : ma maison, le jardin et la plage ! Tu as été génial. Tu es prêt pour le CP. À bientôt, mon ami ! 🦎❤️",
};

export const leSaviasTu: CahierDataPetit["leSaviasTu"] = {
  1: { portee: "local", texte: "À La Réunion, le margouillat habite souvent dans les maisons. La nuit, on l'entend faire « tchak tchak » !" },
  2: { portee: "monde", texte: "Les étoiles brillent même le jour, mais on ne les voit pas : le soleil est trop fort !" },
  3: { portee: "monde", texte: "Les roues des voitures sont rondes : c'est pour rouler tout doux, sans secousses !" },
  4: { portee: "local", texte: "À La Réunion, on cultive plein de bananes. Certaines se mangent même cuites, en gâteau !" },
  5: { portee: "monde", texte: "Dans le monde, les maisons sont toutes différentes : en bois, en pierre, et même en glace au pôle Nord !" },
  6: { portee: "monde", texte: "On dit que les coccinelles portent bonheur ! Quand l'une se pose sur toi, fais un vœu." },
  7: { portee: "local", texte: "À La Réunion, les abeilles font un miel spécial avec les fleurs de letchi et de tamarin. Un délice !" },
  8: { portee: "monde", texte: "La chenille se transforme en papillon : c'est un peu magique, on appelle ça la métamorphose !" },
  9: { portee: "monde", texte: "Le tournesol suit le soleil du matin au soir, puis se retourne vers l'est pour le lendemain !" },
  10: { portee: "local", texte: "Sur l'île de Rodrigues, près de La Réunion, certaines tortues géantes vivent plus de 100 ans !" },
  11: { portee: "local", texte: "Sur les plages de La Réunion, le sable est parfois blanc, parfois noir : le sable noir vient du volcan !" },
  12: { portee: "monde", texte: "Le crabe marche de côté parce que ses pattes plient comme ça. Essaie de marcher de côté, toi aussi !" },
  13: { portee: "local", texte: "Dans le lagon de La Réunion vivent des poissons-perroquets, tout colorés, avec un bec comme un oiseau !" },
  14: { portee: "local", texte: "À La Réunion, le soleil est très fort. On met un chapeau et de la crème pour protéger sa peau !" },
  15: { portee: "local", texte: "La Réunion est une île pleine de trésors : des maisons colorées, des jardins fleuris et de belles plages !" },
};

/* « Le monde de Ti Margo » — une phrase par jour, lue à voix haute par le parent.
   Cycle histoire → écologie → futur. Pré-lecteur : jamais de texte affiché, juste
   l'adulte qui raconte un petit fait et pose parfois une mini-question orale. */
export const mondeDemain: Record<number, MondeDemainPetit> = {
  /* ----- Semaine 1 : la maison ----- */
  1: { theme: "histoire", parent: "Avant, il n'y avait pas de télé : le soir, on se racontait des histoires. Tu aimes les histoires, toi ?" },
  2: { theme: "ecologie", parent: "Le margouillat sur le mur mange les moustiques : c'est notre petit ami, on le laisse tranquille." },
  3: { theme: "futur", parent: "Demain, des petits robots aideront peut-être à ranger la maison. Et toi, qu'est-ce que tu rangerais ?" },
  4: { theme: "histoire", parent: "Avant, il n'y avait pas de frigo : on gardait les fruits dans un endroit bien frais." },
  5: { theme: "ecologie", parent: "On ferme l'eau quand on se lave les mains : l'eau, c'est précieux. Tu y penseras ?" },
  /* ----- Semaine 2 : le jardin ----- */
  6: { theme: "futur", parent: "Demain, on plantera encore plus d'arbres pour que la Terre reste toute verte." },
  7: { theme: "histoire", parent: "Avant, on n'achetait pas les légumes : on les faisait pousser soi-même dans le jardin." },
  8: { theme: "ecologie", parent: "L'abeille butine les fleurs pour faire le miel : sans elle, pas de fruits. On la protège !" },
  9: { theme: "futur", parent: "Demain, des jardins pousseront peut-être sur les toits des maisons. Tu aimerais ça ?" },
  10: { theme: "histoire", parent: "Avant, pas de voiture : on marchait beaucoup, ou on prenait la charrette à bœufs." },
  /* ----- Semaine 3 : la plage ----- */
  11: { theme: "ecologie", parent: "On ne jette rien sur la plage : un papier par terre peut rendre un poisson malade." },
  12: { theme: "futur", parent: "Demain, des bateaux nettoieront la mer tout seuls. Et toi, comment garder le lagon propre ?" },
  13: { theme: "histoire", parent: "Avant, les pêcheurs partaient en mer à la rame, sans moteur, dès le lever du soleil." },
  14: { theme: "ecologie", parent: "La tortue de mer vit longtemps : pour la protéger, on garde le sable bien propre." },
  15: { theme: "futur", parent: "Demain, c'est toi qui prendras soin de la Terre. Qu'est-ce que tu veux protéger en grand ?" },
};
