// ─── Fiche de cours : les périmètres (6e) ──────────────────────────────────────
// Fiche « en blocs » créée pour coller EXACTEMENT à la banque du coach
// (lib/tutor-v4/questionBank/6e/maths/perimetres.bank.ts).
//
// Couverture des micro-compétences de la banque (pour la relecture du prof) :
// - aire_perimetre_comprendre → accroche, identite (Idée clé), definition,
//                               pieges (1 et 3), aRetenir (1), slide objectif
// - aire_perimetre_carre      → proprietes (Le carré), usages (carte 1),
//                               exemples (ex. 1), entrainement (Q1), formule
// - aire_perimetre_rectangle  → proprietes (Le rectangle), usages (carte 2),
//                               formule + schéma, pieges (2), entrainement (Q2)
// - aire_perimetre_figure     → proprietes (Une figure quelconque),
//                               usages (carte 3), exemples (ex. 2)
// - aire_perimetre_probleme   → reel, entrainement (Q3 : le grillage),
//                               slide « autre exemple »
// - aire_perimetre_defi       → entrainement (Q4 : retrouver le côté),
//                               slide « exercice flash »

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

const pieges = [
  "Confondre aire et périmètre : 5 × 4 = 20 donne l'aire du rectangle de 5 cm sur 4 cm, pas son périmètre. Le périmètre, c'est le tour : 2 × (5 + 4) = 18 cm.",
  "Oublier que chaque côté compte deux fois dans un rectangle : 6 + 2 = 8 cm n'est que la moitié du tour, le périmètre vaut 2 × (6 + 2) = 16 cm.",
  "Se tromper d'unité : un périmètre est une longueur, il s'écrit en cm ou en m, jamais en cm² (réservé aux aires).",
];

const aRetenir = [
  "Le périmètre d'une figure, c'est la longueur de son contour : tout son tour.",
  "Carré : P = 4 × c. Rectangle : P = 2 × (L + l).",
  "Pour une figure quelconque, on additionne les longueurs de tous les côtés du contour.",
];

const schemaRectangle = (
  <svg
    viewBox="0 0 320 190"
    className="h-auto w-full"
    role="img"
    aria-label="Rectangle avec sa longueur L, sa largeur l et son contour en couleur"
  >
    <rect
      x="55"
      y="45"
      width="210"
      height="105"
      fill="rgba(14,165,233,0.12)"
      stroke="#0ea5e9"
      strokeWidth="5"
      strokeLinejoin="round"
    />
    <path d="M55 68 L78 68 L78 45" fill="none" stroke="#f59e0b" strokeWidth="4" />
    <text x="160" y="175" fill="#334155" fontSize="16" fontWeight="800" textAnchor="middle">
      longueur L
    </text>
    <text x="48" y="102" fill="#334155" fontSize="16" fontWeight="800" textAnchor="end">
      l
    </text>
    <text x="160" y="32" fill="#0f172a" fontSize="14" fontWeight="700" textAnchor="middle">
      le périmètre = tout le tour
    </text>
  </svg>
);

export const fichePerimetres6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "aire-perimetre",
  titre: "Les périmètres",
  accroche:
    "Le périmètre d'une figure, c'est la longueur de son tour. On en a besoin dès qu'on veut entourer quelque chose : un jardin, un cadre, un terrain. En 6e, on apprend à le calculer pour le carré, le rectangle et n'importe quelle figure.",
  identite: [
    { label: "Prérequis", valeur: "Additionner, multiplier, unités de longueur (cm, m)" },
    { label: "Idée clé", valeur: "Le périmètre = la longueur du contour de la figure" },
    { label: "Outil", valeur: "La règle graduée (et le calcul mental)" },
  ],
  definition: {
    texte:
      "Le périmètre d'une figure est la longueur de son contour, c'est-à-dire de tout son tour. C'est une longueur : on l'exprime avec une unité de longueur, comme le centimètre (cm) ou le mètre (m), jamais en cm².",
  },
  proprietes: [
    {
      titre: "Le carré",
      texte:
        "Un carré a 4 côtés de la même longueur. Son périmètre vaut donc 4 fois la longueur d'un côté : P = 4 × c. Exemple : un carré de côté 5 cm a un périmètre de 4 × 5 = 20 cm.",
    },
    {
      titre: "Le rectangle",
      texte:
        "Un rectangle a 2 longueurs et 2 largeurs. Son périmètre vaut P = 2 × (L + l). Exemple : pour 8 cm sur 3 cm, on calcule 2 × (8 + 3) = 2 × 11 = 22 cm.",
    },
    {
      titre: "Une figure quelconque",
      texte:
        "Quand la figure n'a pas de formule, on additionne les longueurs de tous les côtés du contour. Attention : on ne compte que le contour extérieur, jamais les traits à l'intérieur de la figure.",
    },
  ],
  reel: {
    texte:
      "Calculer un périmètre, c'est répondre à une vraie question : quelle longueur de grillage pour clôturer le jardin ? Quelle longueur de baguette pour encadrer un dessin ? Quelle longueur de ruban pour faire le tour d'un paquet cadeau ? Quelle distance pour faire le tour du terrain de sport ?",
  },
  historique: {
    texte:
      "Le mot « périmètre » vient du grec : « peri » (autour) et « metron » (mesure). Vers 3000 avant J.-C., les arpenteurs d'Égypte mesuraient déjà le tour des champs avec des cordes à nœuds : après chaque crue du Nil, il fallait retrouver les limites de chaque parcelle.",
  },
  formule: {
    contexte: "Carré de côté c, rectangle de longueur L et de largeur l",
    expression: "P(carré) = 4 × c ; P(rectangle) = 2 × (L + l)",
    legende: "Pour une figure quelconque : on additionne tous les côtés du contour.",
    schema: schemaRectangle,
  },
  methode: [
    {
      titre: "Repérer",
      texte:
        "On suit le contour de la figure avec le doigt et on repère la longueur de chaque côté. On ne garde que le tour extérieur.",
    },
    {
      titre: "Écrire",
      texte:
        "On choisit le bon calcul : 4 × c pour un carré, 2 × (L + l) pour un rectangle, la somme de tous les côtés sinon.",
    },
    {
      titre: "Calculer",
      texte:
        "On effectue le calcul, puis on écrit la réponse avec son unité de longueur : cm, m... jamais cm².",
    },
  ],
  usages: [
    {
      titre: "Le carré",
      detail:
        "Les 4 côtés sont égaux : périmètre = 4 × côté. Un carré de côté 7 cm a un périmètre de 4 × 7 = 28 cm.",
    },
    {
      titre: "Le rectangle",
      detail:
        "2 longueurs et 2 largeurs : périmètre = 2 × (L + l). Un rectangle de 6 cm sur 4 cm a un périmètre de 2 × (6 + 4) = 20 cm.",
    },
    {
      titre: "La figure quelconque",
      detail:
        "Pas de formule : on additionne tous les côtés du contour. Une figure de côtés 3 cm, 4 cm, 5 cm et 6 cm a un périmètre de 3 + 4 + 5 + 6 = 18 cm.",
    },
  ],
  exemples: [
    {
      titre: "Le périmètre d'un carré",
      donnees: "Un carré a un côté de 9 cm.",
      question: "Calculer son périmètre.",
      solution:
        "Un carré a 4 côtés égaux. P = 4 × 9 = 36 cm. Attention : 9 × 9 = 81 donnerait l'aire, pas le périmètre.",
    },
    {
      titre: "Le périmètre d'une figure quelconque",
      donnees: "Une figure a des côtés de 2 cm, 2 cm, 3 cm, 3 cm et 4 cm.",
      question: "Calculer son périmètre.",
      solution:
        "Pas de formule : on additionne tous les côtés du contour. P = 2 + 2 + 3 + 3 + 4 = 14 cm.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un carré a un côté de 6 cm. Calcule son périmètre.",
      correction:
        "Étape 1 : un carré a 4 côtés égaux. Étape 2 : P = 4 × 6. Étape 3 : P = 24 cm. On vérifie l'unité : le cm, une unité de longueur.",
    },
    {
      question: "Un rectangle mesure 8 cm de long et 3 cm de large. Calcule son périmètre.",
      correction:
        "Étape 1 : un rectangle a 2 longueurs et 2 largeurs. Étape 2 : P = 2 × (8 + 3) = 2 × 11. Étape 3 : P = 22 cm. Attention : 8 × 3 = 24 donnerait l'aire, pas le périmètre.",
    },
    {
      question:
        "Problème : un jardin rectangulaire mesure 8 m de long et 3 m de large. Quelle longueur de grillage faut-il pour faire tout le tour ?",
      correction:
        "Étape 1 : le grillage suit tout le tour du jardin, on cherche donc le périmètre. Étape 2 : P = 2 × (8 + 3) = 2 × 11 = 22 m. Étape 3 : il faut 22 m de grillage.",
    },
    {
      question: "Défi : un carré a un périmètre de 28 cm. Combien mesure un côté ?",
      correction:
        "Étape 1 : le périmètre d'un carré vaut 4 × côté. Étape 2 : on fait le calcul à l'envers : côté = 28 ÷ 4. Étape 3 : un côté mesure 7 cm. Vérification : 4 × 7 = 28 cm.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesPerimetres6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Périmètres - 6e",
    section: {
      type: "objectif",
      phrase: "Calculer la longueur du tour d'une figure",
      sousPhrase:
        "Le périmètre, c'est le contour de la figure : tout son tour, mesuré en cm ou en m.",
      encadre: {
        titre: "L'idée",
        texte: "On suit le contour et on additionne les longueurs des côtés.",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "Grillage d'un jardin, cadre d'un dessin, ruban autour d'un paquet, tour du terrain de sport : à chaque fois, c'est un périmètre.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Vers 3000 avant J.-C., les arpenteurs d'Égypte mesuraient le tour des champs avec des cordes à nœuds après les crues du Nil. « Périmètre » vient du grec : mesurer autour.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: fichePerimetres6e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Les formules",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "P(carré) = 4 × c ; P(rectangle) = 2 × (L + l)",
      sousPhrase: "Pour une figure quelconque : on additionne tous les côtés du contour.",
      encadre: {
        titre: "Attention",
        texte: "Le périmètre est une longueur : cm ou m, jamais cm².",
      },
    },
  },
  {
    titre: "Selon la figure",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: fichePerimetres6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Le carré",
    section: {
      type: "exemple",
      enonce: "Un carré a un côté de 9 cm.",
      question: "Calculer son périmètre.",
      correction: "P = 4 × 9 = 36 cm. (9 × 9 = 81 donnerait l'aire, pas le périmètre.)",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Un vrai problème",
    section: {
      type: "exemple",
      enonce: "Un jardin rectangulaire mesure 8 m de long et 3 m de large.",
      question: "Quelle longueur de grillage pour faire tout le tour ?",
      correction: "On cherche le périmètre : P = 2 × (8 + 3) = 22 m de grillage.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    section: {
      type: "exercice",
      enonce: "Un carré a un périmètre de 28 cm.",
      question: "Combien mesure un côté ?",
      indice: "Le périmètre d'un carré vaut 4 × côté : fais le calcul à l'envers.",
      correction: "côté = 28 ÷ 4 = 7 cm. Vérification : 4 × 7 = 28 cm.",
    },
  },
];
