// ─── Fiche de cours : les nombres entiers (6e) ─────────────────────────────────
// Fiche « en blocs » créée pour coller EXACTEMENT à la banque du coach
// (lib/tutor-v4/questionBank/6e/maths/entiers.bank.ts).
//
// Couverture des micro-compétences de la banque (pour la relecture du prof) :
// - entier_lire_ecrire  → identite (Idée clé), methode (Lire), usages (carte 1),
//                         exemples (ex. 1), entrainement (Q1)
// - entier_rang         → proprietes (Le rang des chiffres), methode (Lire),
//                         exemples (ex. 1), entrainement (Q2), pieges (1)
// - entier_comparer     → proprietes (Comparer deux entiers), usages (carte 2),
//                         entrainement (Q3), pieges (2)
// - entier_decomposer   → proprietes (Décomposer), usages (carte 3),
//                         exemples (ex. 2), entrainement (Q2)
// - entier_encadrer     → proprietes (Encadrer), usages (carte 3),
//                         entrainement (Q3), slides (exemple guidé bis)
// - entier_defi         → entrainement (Q4), slide « exercice flash »

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

const pieges = [
  "Confondre chiffre et nombre : dans 352, le chiffre des dizaines est 5, mais le nombre de dizaines est 35.",
  "Croire qu'un nombre qui commence par 9 est toujours le plus grand : 908 est plus petit que 1 205, car il a moins de chiffres.",
  "Oublier le zéro dans l'écriture : « trois cent quatre » s'écrit 304, pas 34.",
];

const aRetenir = [
  "La valeur d'un chiffre dépend de sa position : unités, dizaines, centaines, milliers.",
  "Pour comparer deux entiers : d'abord le nombre de chiffres, puis chiffre par chiffre de gauche à droite.",
  "Décomposer un nombre, c'est écrire la valeur de chaque chiffre : 352 = 300 + 50 + 2.",
];

export const ficheEntiers6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "entiers",
  titre: "Les nombres entiers",
  accroche:
    "Les nombres entiers servent à compter et à ranger : des élèves, des points, des visiteurs. En 6e, on apprend à bien les lire, les écrire, les comparer, les décomposer et les encadrer.",
  identite: [
    { label: "Prérequis", valeur: "Compter, lire et écrire les nombres jusqu'à 1 000" },
    { label: "Idée clé", valeur: "La position d'un chiffre donne sa valeur" },
    { label: "Outil", valeur: "Le tableau de numération (milliers, centaines, dizaines, unités)" },
  ],
  definition: {
    texte:
      "Un nombre entier est un nombre qui sert à compter des quantités entières, sans virgule : 0, 1, 2, 3... On l'écrit avec les dix chiffres de 0 à 9, et la valeur de chaque chiffre dépend de sa position dans le nombre.",
  },
  proprietes: [
    {
      titre: "Le rang des chiffres",
      texte:
        "Chaque chiffre a un rang : unités, dizaines, centaines, milliers, en partant de la droite. Dans 4 273, le 3 est le chiffre des unités, le 7 celui des dizaines, le 2 celui des centaines et le 4 celui des milliers.",
    },
    {
      titre: "Comparer deux entiers",
      texte:
        "Celui qui a le plus de chiffres est le plus grand. À nombre de chiffres égal, on compare chiffre par chiffre de gauche à droite : 354 est plus grand que 345 car 5 dizaines dépassent 4 dizaines.",
    },
    {
      titre: "Décomposer un entier",
      texte:
        "On peut écrire un entier comme la somme des valeurs de ses chiffres : 352 = 300 + 50 + 2. Attention au zéro : 507 = 500 + 7, sans dizaines.",
    },
    {
      titre: "Encadrer un entier",
      texte:
        "Encadrer un nombre, c'est le placer entre deux nombres ronds qui se suivent : 47 est entre les dizaines 40 et 50, et 326 est entre les centaines 300 et 400.",
    },
  ],
  reel: {
    texte:
      "Les entiers sont partout : le prix d'un jeu, le nombre de places dans un bus, le score d'un match. Comparer deux prix en magasin, c'est comparer deux entiers. Estimer « environ 300 personnes » dans une salle, c'est encadrer un nombre.",
  },
  historique: {
    texte:
      "Nos dix chiffres, de 0 à 9, ont été inventés en Inde vers le 5e siècle, puis transmis en Europe par les savants arabes au Moyen Âge. Le zéro comme vrai nombre a été décrit par le mathématicien indien Brahmagupta en 628. Cette écriture par position a remplacé les chiffres romains, bien moins pratiques pour calculer.",
  },
  methode: [
    {
      titre: "Lire",
      texte:
        "On repère le rang de chaque chiffre en partant de la droite : unités, dizaines, centaines, milliers. Un tableau de numération aide à ne pas se tromper.",
    },
    {
      titre: "Comparer",
      texte:
        "On compte d'abord les chiffres : le plus long gagne. Sinon, on compare chiffre par chiffre en partant de la gauche, jusqu'à la première différence.",
    },
    {
      titre: "Vérifier le zéro",
      texte:
        "À l'écriture comme à la lecture, on vérifie les rangs vides : « mille quarante-deux » s'écrit 1 042, avec un zéro aux centaines.",
    },
  ],
  usages: [
    {
      titre: "Lire et écrire",
      detail:
        "Passer des mots aux chiffres et inversement : « deux mille trente-cinq » s'écrit 2 035. On place un zéro à chaque rang vide.",
    },
    {
      titre: "Comparer et ranger",
      detail:
        "Trouver le plus grand ou le plus petit, ou ranger dans l'ordre croissant : 3 045 < 3 405 < 3 450.",
    },
    {
      titre: "Décomposer et encadrer",
      detail:
        "Écrire la valeur de chaque chiffre (4 206 = 4 000 + 200 + 6) ou placer le nombre entre deux nombres ronds (300 < 326 < 400).",
    },
  ],
  exemples: [
    {
      titre: "Lire un nombre et trouver un chiffre",
      donnees: "On donne le nombre « mille quarante-deux » à écrire en chiffres.",
      question: "Écris ce nombre en chiffres, puis donne son chiffre des dizaines.",
      solution:
        "Mille quarante-deux, c'est 1 000 + 42. On écrit 1 042 : un zéro occupe le rang des centaines. En partant de la droite, on lit 2 unités puis 4 dizaines. Le chiffre des dizaines est donc 4.",
    },
    {
      titre: "Décomposer un nombre",
      donnees: "On donne le nombre 4 206.",
      question: "Décompose 4 206 en milliers, centaines, dizaines et unités.",
      solution:
        "Le 4 est au rang des milliers : il vaut 4 000. Le 2 est au rang des centaines : il vaut 200. Le 0 indique qu'il n'y a pas de dizaines. Le 6 vaut 6 unités. On écrit donc 4 206 = 4 000 + 200 + 6.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Écris en chiffres : deux mille trente-cinq.",
      correction:
        "Deux mille trente-cinq, c'est 2 000 + 35. Il n'y a pas de centaines : on place un zéro à ce rang. On écrit donc 2 035.",
    },
    {
      question:
        "Dans le nombre 2 845, quel est le chiffre des centaines, et quelle est sa valeur ? Décompose ensuite le nombre.",
      correction:
        "En partant de la droite : 5 unités, 4 dizaines, 8 centaines, 2 milliers. Le chiffre des centaines est 8, et il vaut 8 × 100 = 800. La décomposition est 2 845 = 2 000 + 800 + 40 + 5.",
    },
    {
      question:
        "Quel nombre est le plus grand : 2 305 ou 2 350 ? Puis encadre 2 305 entre deux centaines consécutives.",
      correction:
        "Les deux nombres commencent par 2 milliers et 3 centaines. On compare les dizaines : 5 dizaines (2 350) dépassent 0 dizaine (2 305), donc 2 350 est le plus grand. Ensuite, 2 305 est plus grand que 2 300 et plus petit que 2 400 : on écrit 2 300 < 2 305 < 2 400.",
    },
    {
      question:
        "Défi : quel est le plus petit nombre de quatre chiffres que l'on peut écrire avec 3, 0, 5 et 1, une seule fois chacun ?",
      correction:
        "Un nombre ne peut pas commencer par 0. On place donc d'abord le plus petit chiffre non nul : 1. Puis on range les autres du plus petit au plus grand : 0, 3, 5. Le plus petit nombre possible est 1 035.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesEntiers6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Entiers - 6e",
    section: {
      type: "objectif",
      phrase: "Lire, comparer et décomposer les nombres entiers",
      sousPhrase:
        "Les entiers servent à compter et à ranger. Tout repose sur une idée : la position d'un chiffre donne sa valeur.",
      encadre: {
        titre: "L'idée",
        texte: "Dans 352, le 5 ne vaut pas 5 : il vaut 50, car il est au rang des dizaines.",
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
          "Prix d'un jeu, places dans un bus, score d'un match : comparer deux prix, c'est comparer deux entiers.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Nos chiffres viennent d'Inde (vers le 5e siècle) et le zéro a été décrit par Brahmagupta en 628. Ils ont remplacé les chiffres romains, peu pratiques pour calculer.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheEntiers6e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "La définition",
    badge: "À connaître",
    section: {
      type: "objectif",
      phrase: "Un entier compte des quantités entières, sans virgule",
      sousPhrase:
        "On l'écrit avec les dix chiffres de 0 à 9, et la valeur de chaque chiffre dépend de sa position.",
      encadre: {
        titre: "Attention",
        texte: "Chiffre et nombre, ce n'est pas pareil : dans 352, le chiffre des dizaines est 5, le nombre de dizaines est 35.",
      },
    },
  },
  {
    titre: "Selon ce que l'on cherche",
    badge: "3 gestes",
    section: {
      type: "cartes",
      cartes: ficheEntiers6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Lire et repérer un rang",
    section: {
      type: "exemple",
      enonce: "On donne « mille quarante-deux » à écrire en chiffres.",
      question: "Écris le nombre, puis donne son chiffre des dizaines.",
      correction:
        "1 000 + 42 = 1 042, avec un zéro aux centaines. Le chiffre des dizaines est 4.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Décomposer",
    section: {
      type: "exemple",
      enonce: "On donne le nombre 4 206.",
      question: "Décompose-le.",
      correction:
        "4 milliers, 2 centaines, 0 dizaine, 6 unités : 4 206 = 4 000 + 200 + 6.",
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
      enonce:
        "Défi : on dispose des chiffres 3, 0, 5 et 1, à utiliser une seule fois chacun.",
      question: "Quel est le plus petit nombre de quatre chiffres possible ?",
      indice: "Un nombre ne peut pas commencer par 0.",
      correction:
        "On commence par le plus petit chiffre non nul (1), puis 0, 3 et 5 : la réponse est 1 035.",
    },
  },
];
