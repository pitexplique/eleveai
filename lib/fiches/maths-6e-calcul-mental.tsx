// ─── Fiche de cours : le calcul mental (6e) ────────────────────────────────────
// Fiche « en blocs » : toute la matière vit ici, la page et les flashcards ne
// font que la rendre. Contenu neuf, calé sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/calcul-mental.bank.ts.
//
// Micro-compétences de la banque → blocs de la fiche :
// - entier_addition_mentale       → usages (carte 1), méthode, exemple 1, entraînement 1
// - entier_soustraction_mentale   → usages (carte 1), propriétés (compléments), entraînement 2
// - entier_multiplication_mentale → usages (carte 2), propriétés (tables), exemple 2
// - entier_division_mentale       → usages (carte 2), propriétés (tables), entraînement 3
// - entier_strategie_mentale      → usages (carte 3), propriétés (décomposer), pièges (×10)
// - entier_calcul_mental_defi     → bloc réel (monnaie, prix), entraînement 4

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

const pieges = [
  "Multiplier par 10 un nombre à virgule en ajoutant un zéro : 4,23 × 10 = 42,3 et pas 4,230. C'est la virgule qui se déplace.",
  "Poser l'opération dans sa tête chiffre par chiffre : c'est lent et on se trompe. On décompose plutôt en nombres simples.",
  "Oublier de corriger quand on arrondit : si on calcule 121 - 40 au lieu de 121 - 38, il faut rajouter 2 à la fin.",
];

const aRetenir = [
  "Calculer de tête, c'est décomposer : on passe par les dizaines et les nombres ronds.",
  "Les tables de multiplication servent aussi pour diviser : 8 × 7 = 56 donc 56 ÷ 8 = 7.",
  "Double = fois 2, moitié = divisé par 2, et × 10 ou ÷ 10 déplace la virgule d'un rang.",
];

export const ficheCalculMental6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "entier-calcul-mental",
  titre: "Le calcul mental",
  accroche:
    "Le calcul mental, c'est trouver un résultat de tête, sans poser l'opération ni sortir la calculatrice. Le secret n'est pas d'avoir une mémoire d'éléphant : c'est de connaître quelques astuces pour rendre les calculs plus simples.",
  identite: [
    { label: "Prérequis", valeur: "Les quatre opérations, les tables de multiplication" },
    { label: "Idée clé", valeur: "Décomposer les nombres pour calculer plus vite" },
    { label: "Outil", valeur: "Aucun : juste ta tête (et un peu d'entraînement)" },
  ],
  definition: {
    texte:
      "Calculer mentalement, c'est calculer de tête, sans poser l'opération sur le papier. On transforme le calcul en une suite d'étapes simples : on décompose les nombres, on passe par des nombres ronds, on s'appuie sur les tables que l'on connaît par cœur.",
  },
  proprietes: [
    {
      titre: "Décomposer les nombres",
      texte:
        "On peut couper un nombre en morceaux plus simples sans changer le résultat. Pour 134 + 28, on ajoute d'abord 20 (154), puis 8 (162). Chaque étape est facile.",
    },
    {
      titre: "S'appuyer sur les compléments à 10 et à 100",
      texte:
        "Les nombres ronds sont nos amis. 47 + 8 : on complète à 50 (47 + 3), puis on ajoute le reste (+ 5). Et pour 100 - 36, on cherche ce qui manque à 36 pour faire 100 : c'est 64.",
    },
    {
      titre: "Connaître ses tables dans les deux sens",
      texte:
        "Une table sert à multiplier et à diviser. Si on sait que 9 × 7 = 63, alors on sait aussi que 63 ÷ 9 = 7. Une seule table apprise, deux calculs gagnés.",
    },
    {
      titre: "Arrondir puis corriger",
      texte:
        "On peut remplacer un nombre par un nombre rond proche, puis corriger. Pour 99 + 47, on calcule 100 + 47 = 147, puis on enlève le 1 de trop : 146.",
    },
  ],
  reel: {
    texte:
      "Le calcul mental sert tous les jours : vérifier la monnaie qu'on te rend à la boulangerie, estimer le prix total de tes courses avant de passer en caisse, partager équitablement des fruits ou des cartes entre amis, ou savoir à quelle heure finit un film qui dure 1 h 25. Pas de calculatrice dans la file d'attente !",
  },
  historique: {
    texte:
      "Bien avant la calculatrice, on calculait déjà de tête et avec les doigts. Il y a plus de 2000 ans, les marchands utilisaient le boulier, un cadre à boules inventé en Asie, pour compter très vite. Les premières calculatrices de poche ne sont arrivées que vers 1970 : pendant des siècles, le calcul mental était le seul moyen de calculer partout.",
  },
  methode: [
    {
      titre: "Observer",
      texte:
        "Avant de calculer, on regarde les nombres : y a-t-il un nombre rond tout proche ? Une table que je connais ? Un double ou une moitié ?",
    },
    {
      titre: "Décomposer",
      texte:
        "On coupe le calcul en étapes simples : les dizaines d'abord, puis les unités. Ou on passe par la dizaine suivante (68 + 7 : d'abord + 2, puis + 5).",
    },
    {
      titre: "Vérifier",
      texte:
        "On se demande si le résultat est raisonnable : 96 - 27 doit donner un peu moins de 70. Si on trouve 129, c'est qu'on s'est trompé quelque part.",
    },
  ],
  usages: [
    {
      titre: "Addition et soustraction mentales",
      detail:
        "On passe par les dizaines : 56 + 8, c'est 56 + 4 = 60 puis + 4 = 64. Pour soustraire, pareil : 83 - 7, c'est 83 - 3 = 80 puis - 4 = 76.",
    },
    {
      titre: "Multiplication et division mentales",
      detail:
        "Les tables d'abord : 6 × 8 = 48, donc 48 ÷ 6 = 8. Pour × 5, on fait × 10 puis on prend la moitié : 18 × 5 = 180 ÷ 2 = 90.",
    },
    {
      titre: "Les stratégies malines",
      detail:
        "Double (× 2), moitié (÷ 2), quart (÷ 4). Et × 10 ou ÷ 10 : la virgule se déplace d'un rang (4,23 × 10 = 42,3 ; 645 ÷ 10 = 64,5).",
    },
  ],
  exemples: [
    {
      titre: "Une addition en passant par la dizaine",
      donnees: "On veut calculer 47 + 8 de tête.",
      question: "Combien font 47 + 8 ?",
      solution:
        "Stratégie : on complète d'abord jusqu'à la dizaine. 47 + 3 = 50. Il restait 8 à ajouter et on en a déjà mis 3, il reste donc 5. 50 + 5 = 55. Donc 47 + 8 = 55.",
    },
    {
      titre: "Une multiplication par 5 sans souffrir",
      donnees: "On veut calculer 18 × 5 de tête.",
      question: "Combien font 18 × 5 ?",
      solution:
        "Stratégie : multiplier par 5, c'est multiplier par 10 puis prendre la moitié. 18 × 10 = 180. La moitié de 180 est 90. Donc 18 × 5 = 90.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Calcule de tête : 99 + 15.",
      correction:
        "Stratégie : 99 est tout proche de 100. On calcule 100 + 15 = 115, puis on enlève le 1 ajouté en trop : 115 - 1 = 114. Donc 99 + 15 = 114.",
    },
    {
      question: "Calcule de tête : 121 - 38.",
      correction:
        "Stratégie : on arrondit 38 à 40. 121 - 40 = 81. On a enlevé 2 de trop, donc on les rajoute : 81 + 2 = 83. Donc 121 - 38 = 83.",
    },
    {
      question: "Calcule de tête : 96 ÷ 8.",
      correction:
        "Stratégie : on cherche dans la table de 8 le nombre qui donne 96. On sait que 8 × 10 = 80, et il manque 16, soit 8 × 2. Donc 8 × 12 = 96, et 96 ÷ 8 = 12.",
    },
    {
      question:
        "À la boulangerie, tu achètes un pain à 2 €, un croissant à 1 € et un gâteau à 6 €. Tu paies avec un billet de 10 €. Combien te rend-on ?",
      correction:
        "Stratégie : on additionne d'abord les prix : 2 + 1 + 6 = 9 €. Puis on cherche le complément à 10 : il manque 1 pour aller de 9 à 10. On te rend donc 1 €.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesCalculMental6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Calcul mental - 6e",
    section: {
      type: "objectif",
      phrase: "Calculer de tête, sans poser l'opération",
      sousPhrase:
        "Le calcul mental n'est pas un don : c'est une boîte à astuces que tout le monde peut apprendre.",
      encadre: {
        titre: "L'idée",
        texte: "On décompose les nombres pour transformer un calcul difficile en étapes faciles.",
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
          "Vérifier la monnaie rendue, estimer un prix total avant la caisse, partager en parts égales, calculer une heure de fin.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Il y a plus de 2000 ans, les marchands comptaient déjà très vite avec le boulier. La calculatrice de poche, elle, n'existe que depuis 1970 environ.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheCalculMental6e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Selon l'opération",
    badge: "3 familles",
    section: {
      type: "cartes",
      cartes: ficheCalculMental6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Passer par la dizaine",
    section: {
      type: "exemple",
      enonce: "On veut calculer 47 + 8 de tête.",
      question: "Combien font 47 + 8 ?",
      correction: "47 + 3 = 50, puis 50 + 5 = 55. Donc 47 + 8 = 55.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Multiplier par 5",
    section: {
      type: "exemple",
      enonce: "On veut calculer 18 × 5 de tête.",
      question: "Combien font 18 × 5 ?",
      correction: "18 × 10 = 180, et la moitié de 180 est 90. Donc 18 × 5 = 90.",
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
      enonce: "Tu achètes un pain à 2 €, un croissant à 1 € et un gâteau à 6 €. Tu paies avec 10 €.",
      question: "Combien te rend-on ?",
      indice: "Additionne les prix, puis cherche le complément à 10.",
      correction: "2 + 1 + 6 = 9 €, et de 9 à 10 il manque 1. On te rend 1 €.",
    },
  },
];
