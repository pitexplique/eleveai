/* Cahier de vacances « Vers le CE1 » (CP → CE1).
   Niveau pré-lecteur / lecteur débutant : tout est visuel, les consignes sont
   lues par le parent. 15 jours / 3 semaines = le tour de l'île de Ti Margo :
   le jardin créole 🌺, la forêt et la montagne 🌴, le lagon 🐠. */

import type { Etape } from "@/components/cahier/types";
import type { CahierDataPetit, JourPetit, MondeDemainPetit } from "@/components/cahier/petits-types";

export const parcours: Etape[] = [
  {
    semaine: 1,
    etape: 1,
    emoji: "🌺",
    lieu: "Le jardin créole",
    intro: "On démarre tout près de la maison de Ti Margo, dans son jardin.",
  },
  {
    semaine: 2,
    etape: 2,
    emoji: "🌴",
    lieu: "La forêt & la montagne",
    intro: "On grimpe dans la forêt puis tout en haut de la montagne.",
  },
  {
    semaine: 3,
    etape: 3,
    emoji: "🐠",
    lieu: "Le lagon",
    intro: "On termine les pieds dans l'eau, au bord du lagon.",
  },
];

export const jours: JourPetit[] = [
  /* ===================== SEMAINE 1 — Le jardin créole ===================== */
  {
    numero: 1,
    semaine: 1,
    badge: "Le compteur",
    activites: [
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte les fleurs et écris le nombre dans la case.",
        emoji: "🌺",
        n: 7,
      },
      {
        bloc: "maths",
        kind: "calcul",
        consigne: "Calcule ces petites additions.",
        ops: [
          { q: "3 + 2", r: "5" },
          { q: "4 + 4", r: "8" },
          { q: "5 + 1", r: "6" },
          { q: "2 + 6", r: "8" },
        ],
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images où tu entends le son [ou].",
        son: "ou",
        images: [
          { emoji: "🐭", mot: "souris", bon: true },
          { emoji: "🌹", mot: "rose", bon: false },
          { emoji: "🦉", mot: "hibou", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🐺", mot: "loup", bon: true },
          { emoji: "🍎", mot: "pomme", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "lecture",
        consigne: "Lis la phrase à voix haute.",
        texte: "Ti Margo est un petit margouillat vert. Il vit dans le jardin.",
        question: "De quelle couleur est Ti Margo ?",
        reponse: "Il est vert.",
      },
    ],
    mot: {
      mot: "un margouillat",
      emoji: "🦎",
      phrase: "Le margouillat est un petit lézard de La Réunion.",
    },
    geste: {
      titre: "Allumer l'écran",
      texte: "Avec un parent, appuie sur le bouton pour allumer la tablette.",
    },
    defi: {
      consigne:
        "Dessine 5 fleurs, puis 2 de plus. Combien y a-t-il de fleurs en tout ?",
      correction: "5 + 2 = 7 fleurs.",
    },
  },
  {
    numero: 2,
    semaine: 1,
    badge: "L'as des sons",
    activites: [
      {
        bloc: "maths",
        kind: "entoure",
        consigne: "Entoure le plus grand nombre.",
        items: [
          { label: "12", bon: false },
          { label: "21", bon: true },
          { label: "9", bon: false },
        ],
      },
      {
        bloc: "maths",
        kind: "calcul",
        consigne: "Calcule.",
        ops: [
          { q: "10 + 5", r: "15" },
          { q: "6 + 3", r: "9" },
          { q: "7 + 2", r: "9" },
          { q: "8 + 10", r: "18" },
        ],
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images où tu entends le son [on].",
        son: "on",
        images: [
          { emoji: "🎈", mot: "ballon", bon: true },
          { emoji: "🐟", mot: "poisson", bon: true },
          { emoji: "🌉", mot: "pont", bon: true },
          { emoji: "🌳", mot: "arbre", bon: false },
          { emoji: "🐝", mot: "abeille", bon: false },
          { emoji: "🍎", mot: "pomme", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Repasse sur les lettres, puis écris ton prénom à côté.",
        modele: "a b c d e",
      },
    ],
    mot: {
      mot: "un jardin",
      emoji: "🌳",
      phrase: "Dans le jardin, il y a des fleurs et des arbres.",
    },
    geste: {
      titre: "La souris",
      texte: "Pose ta main sur la souris et déplace la petite flèche sur l'écran.",
    },
    defi: {
      consigne: "Compte de 2 en 2 jusqu'à 10 : 2, 4, 6...",
      correction: "2, 4, 6, 8, 10.",
    },
  },
  {
    numero: 3,
    semaine: 1,
    badge: "Le calculateur",
    activites: [
      {
        bloc: "maths",
        kind: "calcul",
        consigne: "Calcule ces additions.",
        ops: [
          { q: "9 + 9", r: "18" },
          { q: "7 + 6", r: "13" },
          { q: "8 + 5", r: "13" },
          { q: "6 + 6", r: "12" },
        ],
      },
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte les coccinelles et écris le nombre.",
        emoji: "🐞",
        n: 9,
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images où tu entends le son [ch].",
        son: "ch",
        images: [
          { emoji: "🐱", mot: "chat", bon: true },
          { emoji: "🐶", mot: "chien", bon: true },
          { emoji: "🎩", mot: "chapeau", bon: true },
          { emoji: "🚗", mot: "voiture", bon: false },
          { emoji: "🌹", mot: "rose", bon: false },
          { emoji: "🐭", mot: "souris", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "lecture",
        consigne: "Lis la phrase à voix haute.",
        texte: "Le chat de la voisine dort sous le manguier. Il fait chaud.",
        question: "Où dort le chat ?",
        reponse: "Sous le manguier.",
      },
    ],
    mot: {
      mot: "un manguier",
      emoji: "🥭",
      phrase: "Le manguier donne des mangues bien sucrées.",
    },
    geste: {
      titre: "Cliquer",
      texte: "Appuie une fois sur le bouton gauche de la souris pour cliquer.",
    },
    defi: {
      consigne: "Quel est le double de 4 ?",
      correction: "Le double de 4 est 8 (4 + 4).",
    },
  },
  {
    numero: 4,
    semaine: 1,
    badge: "Le géomètre",
    activites: [
      {
        bloc: "maths",
        kind: "relier",
        consigne: "Relie chaque forme à son nom.",
        paires: [
          { g: "⬛", d: "carré" },
          { g: "🔺", d: "triangle" },
          { g: "⚫", d: "rond" },
        ],
      },
      {
        bloc: "maths",
        kind: "calcul",
        consigne: "Calcule.",
        ops: [
          { q: "15 + 5", r: "20" },
          { q: "12 + 4", r: "16" },
          { q: "20 + 10", r: "30" },
          { q: "11 + 8", r: "19" },
        ],
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images où tu entends le son [an].",
        son: "an",
        images: [
          { emoji: "🐘", mot: "éléphant", bon: true },
          { emoji: "🌱", mot: "plante", bon: true },
          { emoji: "🧤", mot: "gant", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🏠", mot: "maison", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Écris en attaché : maman, papa.",
        modele: "maman   papa",
      },
    ],
    mot: {
      mot: "un volcan",
      emoji: "🌋",
      phrase: "Le Piton de la Fournaise est un grand volcan.",
    },
    geste: {
      titre: "La barre espace",
      texte: "Appuie sur la grande touche du bas : elle sépare les mots.",
    },
    defi: {
      consigne: "Cherche 3 objets ronds dans la maison.",
      correction: "Par exemple : une assiette, une horloge, une balle.",
    },
  },
  {
    numero: 5,
    semaine: 1,
    badge: "Le lecteur",
    activites: [
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte les papillons et écris le nombre.",
        emoji: "🦋",
        n: 6,
      },
      {
        bloc: "maths",
        kind: "calcul",
        consigne: "Calcule ces soustractions.",
        ops: [
          { q: "10 − 2", r: "8" },
          { q: "9 − 4", r: "5" },
          { q: "7 − 3", r: "4" },
        ],
      },
      {
        bloc: "francais",
        kind: "lecture",
        consigne: "Lis l'histoire à voix haute.",
        texte:
          "Léa cueille trois fleurs rouges dans le jardin. Elle les offre à sa maman.",
        question: "Combien de fleurs Léa cueille-t-elle ?",
        reponse: "Trois fleurs.",
      },
      {
        bloc: "francais",
        kind: "entoure",
        consigne: "Entoure le mot qui désigne une fille : il / elle.",
        items: [
          { label: "il", bon: false },
          { label: "elle", bon: true },
        ],
      },
    ],
    mot: {
      mot: "un papillon",
      emoji: "🦋",
      phrase: "Le papillon vole de fleur en fleur.",
    },
    geste: {
      titre: "Éteindre",
      texte: "À la fin, range : appuie pour éteindre l'écran tout doucement.",
    },
    defi: {
      consigne: "Raconte ce que tu as fait cette semaine dans le jardin.",
      correction: "L'enfant raconte avec ses mots — bravo pour la 1ʳᵉ semaine !",
    },
  },

  /* ================== SEMAINE 2 — La forêt & la montagne ================== */
  {
    numero: 6,
    semaine: 2,
    badge: "Le grimpeur",
    activites: [
      {
        bloc: "maths",
        kind: "calcul",
        consigne: "Calcule.",
        ops: [
          { q: "20 + 5", r: "25" },
          { q: "30 + 7", r: "37" },
          { q: "40 + 6", r: "46" },
          { q: "50 + 9", r: "59" },
        ],
      },
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte les palmiers et écris le nombre.",
        emoji: "🌴",
        n: 8,
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images où tu entends le son [oi].",
        son: "oi",
        images: [
          { emoji: "🌟", mot: "étoile", bon: true },
          { emoji: "🐦", mot: "oiseau", bon: true },
          { emoji: "👑", mot: "roi", bon: true },
          { emoji: "🌳", mot: "arbre", bon: false },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "lecture",
        consigne: "Lis la phrase à voix haute.",
        texte: "Dans la forêt, Ti Margo grimpe sur un grand arbre. Il voit la vallée.",
        question: "Où grimpe Ti Margo ?",
        reponse: "Sur un grand arbre.",
      },
    ],
    mot: {
      mot: "une forêt",
      emoji: "🌳",
      phrase: "La forêt est pleine d'arbres et d'oiseaux.",
    },
    geste: {
      titre: "La touche Entrée",
      texte: "La touche Entrée (⏎) sert à valider. Montre-la sur le clavier.",
    },
    defi: {
      consigne: "Compte de 10 en 10 jusqu'à 50.",
      correction: "10, 20, 30, 40, 50.",
    },
  },
  {
    numero: 7,
    semaine: 2,
    badge: "Le malin",
    activites: [
      {
        bloc: "maths",
        kind: "entoure",
        consigne: "Entoure les nombres pairs (2, 4, 6...).",
        items: [
          { label: "3", bon: false },
          { label: "6", bon: true },
          { label: "8", bon: true },
          { label: "5", bon: false },
          { label: "10", bon: true },
        ],
      },
      {
        bloc: "maths",
        kind: "calcul",
        consigne: "Calcule.",
        ops: [
          { q: "8 + 7", r: "15" },
          { q: "6 + 9", r: "15" },
          { q: "7 + 8", r: "15" },
          { q: "9 + 5", r: "14" },
        ],
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images où tu entends le son [in].",
        son: "in",
        images: [
          { emoji: "🐬", mot: "dauphin", bon: true },
          { emoji: "✋", mot: "main", bon: true },
          { emoji: "🍞", mot: "pain", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "🐰", mot: "lapin", bon: true },
        ],
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Écris : la forêt.",
        modele: "la forêt",
      },
    ],
    mot: {
      mot: "un oiseau",
      emoji: "🐦",
      phrase: "L'oiseau chante dans les arbres le matin.",
    },
    geste: {
      titre: "Effacer",
      texte: "La touche Effacer (⌫) gomme la dernière lettre, comme une gomme.",
    },
    defi: {
      consigne: "Complète : 7 + ? = 10.",
      correction: "7 + 3 = 10.",
    },
  },
  {
    numero: 8,
    semaine: 2,
    badge: "L'horloger",
    activites: [
      {
        bloc: "maths",
        kind: "relier",
        consigne: "Relie chaque horloge à son heure.",
        paires: [
          { g: "🕐", d: "1 heure" },
          { g: "🕒", d: "3 heures" },
          { g: "🕕", d: "6 heures" },
        ],
      },
      {
        bloc: "maths",
        kind: "calcul",
        consigne: "Calcule.",
        ops: [
          { q: "25 + 5", r: "30" },
          { q: "34 + 6", r: "40" },
          { q: "12 + 8", r: "20" },
        ],
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images où tu entends le son [eu].",
        son: "eu",
        images: [
          { emoji: "🔥", mot: "feu", bon: true },
          { emoji: "🌸", mot: "fleur", bon: true },
          { emoji: "🎲", mot: "jeu", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "🍚", mot: "riz", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "lecture",
        consigne: "Lis la phrase à voix haute.",
        texte: "Il est huit heures. Ti Margo se réveille et fait ses étirements.",
        question: "Quelle heure est-il ?",
        reponse: "Huit heures.",
      },
    ],
    mot: {
      mot: "une heure",
      emoji: "🕐",
      phrase: "Il y a vingt-quatre heures dans une journée.",
    },
    geste: {
      titre: "Monter le son",
      texte: "Trouve les boutons du volume : un pour monter, un pour baisser.",
    },
    defi: {
      consigne: "À quelle heure te lèves-tu le matin ? Montre-le sur une horloge.",
      correction: "L'enfant place les aiguilles — par exemple 7 heures.",
    },
  },
  {
    numero: 9,
    semaine: 2,
    badge: "Le marchand",
    activites: [
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte les pièces et écris le nombre.",
        emoji: "🪙",
        n: 10,
      },
      {
        bloc: "maths",
        kind: "calcul",
        consigne: "Calcule.",
        ops: [
          { q: "5 + 5 + 5", r: "15" },
          { q: "10 + 10", r: "20" },
          { q: "2 + 2 + 2", r: "6" },
        ],
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images où tu entends le son [gn].",
        son: "gn",
        images: [
          { emoji: "🏔️", mot: "montagne", bon: true },
          { emoji: "🍄", mot: "champignon", bon: true },
          { emoji: "🐑", mot: "agneau", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "🍞", mot: "pain", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Écris : la montagne.",
        modele: "la montagne",
      },
    ],
    mot: {
      mot: "la montagne",
      emoji: "⛰️",
      phrase: "La montagne est très haute, on la grimpe doucement.",
    },
    geste: {
      titre: "La photo",
      texte: "Sur une tablette, appuie sur l'appareil photo 📷 (avec un parent).",
    },
    defi: {
      consigne: "J'ai 2 pièces de 5 €. Combien d'argent ai-je ?",
      correction: "5 + 5 = 10 €.",
    },
  },
  {
    numero: 10,
    semaine: 2,
    badge: "Le champion",
    activites: [
      {
        bloc: "maths",
        kind: "entoure",
        consigne: "Entoure le plus grand nombre.",
        items: [
          { label: "48", bon: true },
          { label: "45", bon: false },
          { label: "39", bon: false },
        ],
      },
      {
        bloc: "maths",
        kind: "calcul",
        consigne: "Calcule les soustractions.",
        ops: [
          { q: "20 − 5", r: "15" },
          { q: "18 − 8", r: "10" },
          { q: "30 − 10", r: "20" },
        ],
      },
      {
        bloc: "francais",
        kind: "lecture",
        consigne: "Lis l'histoire à voix haute.",
        texte:
          "Ti Margo arrive au sommet de la montagne. Quelle belle vue ! Il est très fier.",
        question: "Comment se sent Ti Margo ?",
        reponse: "Il est très fier.",
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images où tu entends le son [è] (comme forêt).",
        son: "è",
        images: [
          { emoji: "🌲", mot: "forêt", bon: true },
          { emoji: "🌊", mot: "mer", bon: true },
          { emoji: "❄️", mot: "neige", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "🍚", mot: "riz", bon: false },
        ],
      },
    ],
    mot: {
      mot: "le sommet",
      emoji: "🏔️",
      phrase: "Le sommet, c'est tout en haut de la montagne.",
    },
    geste: {
      titre: "Fermer la fenêtre",
      texte: "Pour fermer un jeu, clique sur la petite croix ✖️ en haut à droite.",
    },
    defi: {
      consigne: "Raconte ton plus beau souvenir de la forêt cette semaine.",
      correction: "L'enfant raconte — deux semaines déjà, bravo champion !",
    },
  },

  /* ===================== SEMAINE 3 — Le lagon ===================== */
  {
    numero: 11,
    semaine: 3,
    badge: "Le plongeur",
    activites: [
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte les poissons et écris le nombre.",
        emoji: "🐠",
        n: 11,
      },
      {
        bloc: "maths",
        kind: "calcul",
        consigne: "Calcule.",
        ops: [
          { q: "40 + 20", r: "60" },
          { q: "50 + 30", r: "80" },
          { q: "60 + 10", r: "70" },
        ],
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images où tu entends le son [o] (comme bateau).",
        son: "o",
        images: [
          { emoji: "⛵", mot: "bateau", bon: true },
          { emoji: "💧", mot: "eau", bon: true },
          { emoji: "🎁", mot: "cadeau", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "🐭", mot: "souris", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "lecture",
        consigne: "Lis la phrase à voix haute.",
        texte: "Dans le lagon, l'eau est bleue et chaude. Ti Margo voit des poissons jaunes.",
        question: "De quelle couleur sont les poissons ?",
        reponse: "Ils sont jaunes.",
      },
    ],
    mot: {
      mot: "le lagon",
      emoji: "🏝️",
      phrase: "Le lagon est une eau calme près de la plage.",
    },
    geste: {
      titre: "Glisser le doigt",
      texte: "Sur une tablette, glisse ton doigt sur l'écran pour faire défiler.",
    },
    defi: {
      consigne: "Compte de 5 en 5 jusqu'à 30.",
      correction: "5, 10, 15, 20, 25, 30.",
    },
  },
  {
    numero: 12,
    semaine: 3,
    badge: "Le pêcheur",
    activites: [
      {
        bloc: "maths",
        kind: "relier",
        consigne: "Relie chaque nombre à la bonne quantité de coquillages.",
        paires: [
          { g: "3", d: "🐚🐚🐚" },
          { g: "5", d: "🐚🐚🐚🐚🐚" },
          { g: "2", d: "🐚🐚" },
        ],
      },
      {
        bloc: "maths",
        kind: "calcul",
        consigne: "Calcule ces doubles.",
        ops: [
          { q: "7 + 7", r: "14" },
          { q: "8 + 8", r: "16" },
          { q: "9 + 9", r: "18" },
          { q: "6 + 6", r: "12" },
        ],
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images où tu entends le son [ill] (coquillage).",
        son: "ill",
        images: [
          { emoji: "🐚", mot: "coquillage", bon: true },
          { emoji: "🦋", mot: "papillon", bon: true },
          { emoji: "👧", mot: "fille", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "⛵", mot: "bateau", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Écris : la mer.",
        modele: "la mer",
      },
    ],
    mot: {
      mot: "un coquillage",
      emoji: "🐚",
      phrase: "Sur la plage, je ramasse des coquillages.",
    },
    geste: {
      titre: "La loupe (zoom)",
      texte: "Écarte deux doigts sur l'écran pour agrandir une image : le zoom !",
    },
    defi: {
      consigne: "Quel est le double de 5 ?",
      correction: "Le double de 5 est 10 (5 + 5).",
    },
  },
  {
    numero: 13,
    semaine: 3,
    badge: "Le partageur",
    activites: [
      {
        bloc: "maths",
        kind: "compter",
        consigne: "Compte les étoiles de mer et écris le nombre.",
        emoji: "⭐",
        n: 12,
      },
      {
        bloc: "maths",
        kind: "calcul",
        consigne: "Calcule (ce sont des moitiés !).",
        ops: [
          { q: "10 − 5", r: "5" },
          { q: "14 − 7", r: "7" },
          { q: "12 − 6", r: "6" },
        ],
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images où tu entends le son [s] (comme poisson).",
        son: "s",
        images: [
          { emoji: "🐟", mot: "poisson", bon: true },
          { emoji: "☀️", mot: "soleil", bon: true },
          { emoji: "🐍", mot: "serpent", bon: true },
          { emoji: "🌹", mot: "rose", bon: false },
          { emoji: "🦓", mot: "zèbre", bon: false },
          { emoji: "🏺", mot: "vase", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "lecture",
        consigne: "Lis la phrase à voix haute.",
        texte: "Ti Margo partage son pique-nique avec le crabe. Chacun a deux samoussas.",
        question: "Combien de samoussas a chacun ?",
        reponse: "Deux samoussas.",
      },
    ],
    mot: {
      mot: "le soleil",
      emoji: "☀️",
      phrase: "Le soleil brille fort sur la plage.",
    },
    geste: {
      titre: "Mettre en pause",
      texte: "Le bouton ⏸️ met une vidéo en pause. Le bouton ▶️ la relance.",
    },
    defi: {
      consigne: "Partage 8 bonbons entre 2 enfants, autant pour chacun.",
      correction: "8 = 4 + 4, chacun a 4 bonbons.",
    },
  },
  {
    numero: 14,
    semaine: 3,
    badge: "Le savant",
    activites: [
      {
        bloc: "maths",
        kind: "entoure",
        consigne: "Entoure le résultat de 7 + 6.",
        items: [
          { label: "12", bon: false },
          { label: "13", bon: true },
          { label: "14", bon: false },
        ],
      },
      {
        bloc: "maths",
        kind: "calcul",
        consigne: "Calcule ces doubles.",
        ops: [
          { q: "30 + 30", r: "60" },
          { q: "25 + 25", r: "50" },
          { q: "40 + 40", r: "80" },
        ],
      },
      {
        bloc: "francais",
        kind: "son",
        consigne: "Entoure les images où tu entends le son [è] (comme baleine).",
        son: "è",
        images: [
          { emoji: "🐋", mot: "baleine", bon: true },
          { emoji: "🏠", mot: "maison", bon: true },
          { emoji: "🥛", mot: "lait", bon: true },
          { emoji: "🐱", mot: "chat", bon: false },
          { emoji: "🌙", mot: "lune", bon: false },
          { emoji: "🍚", mot: "riz", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "lecture",
        consigne: "Lis la phrase à voix haute.",
        texte: "Une grande baleine passe au loin dans la mer. Ti Margo lui fait coucou.",
        question: "Que fait Ti Margo à la baleine ?",
        reponse: "Il lui fait coucou.",
      },
    ],
    mot: {
      mot: "une baleine",
      emoji: "🐋",
      phrase: "La baleine est le plus grand animal de la mer.",
    },
    geste: {
      titre: "Le micro",
      texte: "Le petit micro 🎤 sert à parler à la tablette pour poser une question.",
    },
    defi: {
      consigne: "Compte à rebours de 10 à 0.",
      correction: "10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 !",
    },
  },
  {
    numero: 15,
    semaine: 3,
    badge: "Le héros du CE1",
    activites: [
      {
        bloc: "maths",
        kind: "calcul",
        consigne: "Calcule (jusqu'à 100 !).",
        ops: [
          { q: "10 + 10 + 10", r: "30" },
          { q: "50 + 50", r: "100" },
          { q: "20 + 20 + 20", r: "60" },
        ],
      },
      {
        bloc: "maths",
        kind: "entoure",
        consigne: "Entoure le nombre cent.",
        items: [
          { label: "10", bon: false },
          { label: "100", bon: true },
          { label: "1", bon: false },
        ],
      },
      {
        bloc: "francais",
        kind: "lecture",
        consigne: "Lis la dernière histoire à voix haute.",
        texte:
          "Ti Margo a fini son grand tour de l'île. Il a appris à compter, à lire et à écrire. Bravo à toi aussi !",
        question: "Qu'a appris Ti Margo ?",
        reponse: "À compter, à lire et à écrire.",
      },
      {
        bloc: "francais",
        kind: "tracer",
        consigne: "Écris : je suis prêt pour le CE1 !",
        modele: "prêt pour le CE1 !",
      },
    ],
    mot: {
      mot: "un héros",
      emoji: "🦸",
      phrase: "Tu es un vrai héros : tu as fini ton cahier !",
    },
    geste: {
      titre: "Bien ranger",
      texte: "À la fin, éteins l'écran et range la tablette à sa place.",
    },
    defi: {
      consigne: "Raconte ton voyage préféré : le jardin, la forêt ou le lagon ?",
      correction: "L'enfant raconte — félicitations, le cahier est terminé !",
    },
  },
];

export const defisExpert: CahierDataPetit["defisExpert"] = {
  1: { enonce: "Range ces nombres du plus petit au plus grand : 8, 3, 5, 1.", correction: "1, 3, 5, 8." },
  2: { enonce: "J'ai 10 billes. J'en donne 3. Combien m'en reste-t-il ?", correction: "10 − 3 = 7 billes." },
  3: { enonce: "Continue la suite : 2, 4, 6, 8, ...", correction: "10, 12 (on ajoute 2 à chaque fois)." },
  4: { enonce: "Un triangle a combien de côtés ? Et un carré ?", correction: "Le triangle a 3 côtés, le carré en a 4." },
  5: { enonce: "J'ai 6 papillons. 2 s'envolent, puis 3 reviennent. Combien y en a-t-il ?", correction: "6 − 2 = 4, puis 4 + 3 = 7 papillons." },
  6: { enonce: "Quel nombre vient juste après 49 ? Et juste avant ?", correction: "Après 49 → 50. Avant 49 → 48." },
  7: { enonce: "Trouve toutes les façons de faire 10 : 1+9, 2+8...", correction: "1+9, 2+8, 3+7, 4+6, 5+5." },
  8: { enonce: "Range ces heures dans l'ordre : 6h, 3h, 9h, 1h.", correction: "1h, 3h, 6h, 9h." },
  9: { enonce: "Pour un jouet à 8 €, je donne un billet de 10 €. Combien me rend-on ?", correction: "10 − 8 = 2 €." },
  10: { enonce: "Au sommet il fait 8°, en bas il fait 28°. Combien de degrés d'écart ?", correction: "28 − 8 = 20 degrés." },
  11: { enonce: "Il y a 11 poissons jaunes et 9 poissons bleus. Combien en tout ?", correction: "11 + 9 = 20 poissons." },
  12: { enonce: "J'ai 16 coquillages à partager en 2 tas égaux. Combien dans chaque tas ?", correction: "16 = 8 + 8, donc 8 par tas." },
  13: { enonce: "La moitié de 10, c'est combien ? Et la moitié de 20 ?", correction: "Moitié de 10 = 5. Moitié de 20 = 10." },
  14: { enonce: "Une baleine fait 20 m, un margouillat presque rien. Beaucoup ou peu de margouillats pour une baleine ?", correction: "Énormément ! Plus de 100 margouillats bout à bout : la baleine est géante." },
  15: { enonce: "Combien font 50 + 50 ? Et 99 + 1 ?", correction: "50 + 50 = 100. 99 + 1 = 100. Tu sais aller jusqu'à 100 !" },
};

export const carnet: CahierDataPetit["carnet"] = {
  1: "Bonjour, c'est moi, Ti Margo le margouillat ! Cet été, je t'emmène explorer mon île. On commence dans mon jardin créole. Tu viens ?",
  2: "Dans mon jardin, j'entends plein de bruits : les oiseaux, le vent... Tends bien l'oreille toi aussi pour trouver les sons !",
  3: "Miam, j'adore quand les mangues tombent du manguier ! À La Réunion, l'été, c'est la saison des fruits sucrés.",
  4: "Sais-tu qu'à La Réunion il y a un vrai volcan ? Il s'appelle le Piton de la Fournaise. Parfois, il crache du feu !",
  5: "Bravo ! Tu as fini la première semaine dans mon jardin. La semaine prochaine, on part dans la forêt et on monte la montagne !",
  6: "Nous voilà dans la forêt ! Ici, les arbres sont très grands. J'adore grimper tout en haut pour voir loin, loin, loin...",
  7: "Écoute ! Les oiseaux chantent dans la forêt. Chaque oiseau a sa petite musique. Tu peux les imiter ?",
  8: "Le matin dans la montagne, le soleil se lève très tôt. Je m'étire au soleil pour me réchauffer. Brrr, il fait frais en hauteur !",
  9: "En haut de la montagne, il y a un petit marché. J'ai compté mes pièces pour acheter une bonne mangue !",
  10: "On est tout en haut ! Je vois la forêt, le volcan et même la mer au loin. La semaine prochaine, on descend vers le lagon !",
  11: "Plouf ! On est arrivés au lagon. L'eau est tiède et pleine de poissons de toutes les couleurs. Tu sais nager, toi ?",
  12: "Sur la plage, je ramasse des coquillages roses, blancs, rayés... J'en fais un collier pour ma maman.",
  13: "Midi ! C'est l'heure du pique-nique sur la plage. J'ai apporté des samoussas. On partage tout, c'est plus rigolo !",
  14: "Regarde ! Une baleine ! Chaque année, les baleines viennent près de La Réunion avec leurs bébés. Elles sont immenses et douces.",
  15: "On a fini notre grand tour : le jardin, la forêt, la montagne et le lagon ! Tu as été super. Tu es prêt pour le CE1. À bientôt ! 🦎❤️",
};

export const mondeDemain: Record<number, MondeDemainPetit> = {
  /* === SEMAINE 1 — Le jardin créole 🌺 (histoire → ecologie → futur) === */
  1: {
    theme: "histoire",
    parent:
      "Avant, à La Réunion, les familles cultivaient leur jardin créole pour manger. Et chez nous, on a un jardin ?",
  },
  2: {
    theme: "ecologie",
    parent:
      "Dans le jardin, les abeilles butinent les fleurs : sans elles, pas de fruits. On les laisse travailler tranquilles, d’accord ?",
  },
  3: {
    theme: "futur",
    parent:
      "Demain, tu pourras planter une petite graine et la regarder grandir chaque jour. Quelle plante aimerais-tu faire pousser ?",
  },
  4: {
    theme: "histoire",
    parent:
      "Il y a très longtemps, le volcan a fabriqué toute l’île de La Réunion. Sais-tu comment s’appelle ce volcan ?",
  },
  5: {
    theme: "ecologie",
    parent:
      "Les papillons aident les fleurs à faire des graines. Pour les protéger, on garde le jardin sans produits qui piquent. C’est joli, un papillon, non ?",
  },

  /* === SEMAINE 2 — La forêt & la montagne 🌴 === */
  6: {
    theme: "futur",
    parent:
      "Demain, on plantera des arbres pour que la forêt reste verte et fraîche très longtemps. Tu veux en planter un avec moi ?",
  },
  7: {
    theme: "ecologie",
    parent:
      "Le Tuit-tuit est un petit oiseau qui ne vit qu’à La Réunion. On le protège pour qu’il ne disparaisse pas. Tu sais imiter son chant ?",
  },
  8: {
    theme: "histoire",
    parent:
      "Avant les voitures, on montait la montagne à pied ou à dos de mulet pendant des heures. Tu crois que c’était fatigant ?",
  },
  9: {
    theme: "ecologie",
    parent:
      "Sur les sentiers, on remporte tous ses papiers : la forêt reste propre pour les animaux. On ne laisse rien par terre, d’accord ?",
  },
  10: {
    theme: "futur",
    parent:
      "Demain, des promeneurs protégeront la montagne en marchant doucement, sans abîmer les plantes. Aimerais-tu être gardien de la forêt ?",
  },

  /* === SEMAINE 3 — Le lagon 🐠 === */
  11: {
    theme: "ecologie",
    parent:
      "Le corail du lagon est vivant : c’est la maison des petits poissons. On le regarde sans le toucher, tu veux bien ?",
  },
  12: {
    theme: "histoire",
    parent:
      "Avant, les pêcheurs ramassaient les coquillages sur la plage pour faire de jolis colliers. Tu en as déjà trouvé un ?",
  },
  13: {
    theme: "ecologie",
    parent:
      "Une bouteille jetée dans la mer fait du mal aux poissons. On met nos déchets à la poubelle. Tu m’aides à ramasser ?",
  },
  14: {
    theme: "futur",
    parent:
      "Demain, si on garde la mer propre, les baleines reviendront chaque année près de l’île. Tu aimerais en revoir une ?",
  },
  15: {
    theme: "futur",
    parent:
      "Demain, c’est toi qui prendras soin du jardin, de la forêt et du lagon de La Réunion. Lequel veux-tu protéger en premier ?",
  },
};

export const leSaviasTu: CahierDataPetit["leSaviasTu"] = {
  1: { portee: "local", texte: "À La Réunion, le margouillat est le petit lézard qui grimpe sur les murs des maisons. Il mange les moustiques !" },
  2: { portee: "monde", texte: "Les lézards comme moi peuvent perdre leur queue quand ils ont peur... et une nouvelle repousse !" },
  3: { portee: "local", texte: "La mangue est un fruit adoré des Réunionnais. On en mange même en salade, avec un peu de piment !" },
  4: { portee: "local", texte: "Le Piton de la Fournaise est l'un des volcans les plus actifs du monde. Il est tout au sud de l'île." },
  5: { portee: "monde", texte: "Un papillon goûte les fleurs avec... ses pattes ! C'est comme ça qu'il sait si elles sont sucrées." },
  6: { portee: "local", texte: "À La Réunion, il existe une forêt magique appelée Bélouve, avec des arbres couverts de mousse, comme dans un conte." },
  7: { portee: "local", texte: "Le Tuit-tuit est un oiseau très rare qui ne vit qu'à La Réunion. On le protège pour qu'il ne disparaisse pas." },
  8: { portee: "monde", texte: "Plus on monte haut dans la montagne, plus il fait froid. Au sommet de certaines montagnes, il y a même de la neige !" },
  9: { portee: "local", texte: "Sur les marchés de La Réunion, on trouve des fruits uniques, comme le letchi ou le combava." },
  10: { portee: "local", texte: "Du sommet du Piton des Neiges, le plus haut de l'île, on voit la mer tout autour : La Réunion est une île !" },
  11: { portee: "local", texte: "Le lagon de l'Ermitage est protégé par une barrière de corail où vivent des centaines de poissons colorés." },
  12: { portee: "monde", texte: "Si tu colles un grand coquillage contre ton oreille, tu entends comme la mer : c'est l'air qui tourne à l'intérieur !" },
  13: { portee: "local", texte: "Le samoussa est un petit triangle croustillant qu'on adore à La Réunion, en pique-nique ou au goûter !" },
  14: { portee: "monde", texte: "La baleine bleue est l'animal le plus grand qui ait jamais existé : son cœur est gros comme une petite voiture !" },
  15: { portee: "local", texte: "La Réunion est une île magnifique avec un volcan, des forêts, des montagnes et un lagon : tu connais tous ses trésors !" },
};
