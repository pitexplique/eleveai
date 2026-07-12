// ─── Fiche de cours : les nombres décimaux (6e) ────────────────────────────────
// Fiche « en blocs » créée pour coller EXACTEMENT à la banque du coach
// (lib/tutor-v4/questionBank/6e/maths/decimaux.bank.ts).
//
// Couverture des micro-compétences de la banque :
// - decimal_lire_ecrire       → proprietes (Les fractions décimales), usages (Lire
//                               et écrire), exemples (Lire et écrire), entrainement 1
// - decimal_rang              → proprietes (Le rang des chiffres), methode (Lire le
//                               rang), pieges 2, entrainement 1
// - decimal_comparer          → proprietes (Comparer deux décimaux), usages
//                               (Comparer), exemples (Comparer deux prix), pieges 1,
//                               entrainement 2
// - decimal_additionner       → proprietes (Calculer avec les décimaux), methode
//                               (Aligner les virgules), pieges 3, entrainement 3
// - decimal_multiplier        → proprietes (Calculer avec les décimaux), usages
//                               (Calculer), entrainement 4
// - decimal_diviser_par_entier → proprietes (Calculer avec les décimaux), usages
//                               (Calculer), entrainement 4
// - decimal_defi              → reel (précision, pourcentages) + historique (le mot
//                               « décimal » vient de dix, la base 10)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

const pieges = [
  "Croire que 2,45 est plus grand que 2,5 parce qu'il a plus de chiffres. Faux : 2,5 = 2,50, et 50 centièmes, c'est plus que 45 centièmes.",
  "Confondre les rangs : dans 5,83, le 8 est le chiffre des dixièmes et le 3 celui des centièmes, pas l'inverse.",
  "Additionner sans aligner les virgules : pour 3,45 + 1,7, on écrit d'abord 1,7 = 1,70, puis on pose le calcul virgule sous virgule.",
];

const aRetenir = [
  "Un nombre décimal = une partie entière + une virgule + une partie décimale.",
  "Après la virgule, les rangs sont : dixièmes, puis centièmes, puis millièmes.",
  "Pour comparer ou additionner, on peut ajouter des zéros à droite : 0,5 = 0,50.",
];

export const ficheDecimaux6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "decimaux",
  titre: "Les nombres décimaux",
  accroche:
    "Un nombre décimal, c'est un nombre avec une virgule, comme 2,5 ou 0,75. On s'en sert tous les jours pour les prix, les tailles et toutes les mesures précises.",
  identite: [
    { label: "Prérequis", valeur: "Les nombres entiers, les fractions en dixièmes" },
    { label: "Mot clé", valeur: "La virgule sépare la partie entière de la partie décimale" },
    { label: "Outil", valeur: "Le tableau des rangs (unités, dixièmes, centièmes, millièmes)" },
  ],
  definition: {
    texte:
      "Un nombre décimal s'écrit avec une partie entière et une partie décimale, séparées par une virgule. Dans 3,45, la partie entière est 3 et la partie décimale est 45 centièmes.",
  },
  proprietes: [
    {
      titre: "Le rang des chiffres",
      texte:
        "Après la virgule, chaque chiffre a un rang : dixièmes, centièmes, millièmes. Dans 12,764 : 7 est le chiffre des dixièmes, 6 celui des centièmes et 4 celui des millièmes.",
    },
    {
      titre: "Les fractions décimales",
      texte:
        "Une fraction avec 10 en bas s'écrit facilement en décimal : 7/10 = 7 dixièmes = 0,7. Et 25/10 = 25 dixièmes = 2 unités et 5 dixièmes = 2,5.",
    },
    {
      titre: "Comparer deux décimaux",
      texte:
        "On compare d'abord les parties entières, puis les chiffres après la virgule, rang par rang. Astuce : on peut ajouter des zéros à droite (0,5 = 0,50) pour comparer plus facilement.",
    },
    {
      titre: "Calculer avec les décimaux",
      texte:
        "Pour additionner, on aligne les virgules. Pour multiplier ou diviser par un entier, on peut penser en dixièmes : 4,8 = 48 dixièmes, et 48 dixièmes divisés par 4 font 12 dixièmes, soit 1,2.",
    },
  ],
  reel: {
    texte:
      "Les décimaux sont partout : un fruit à 2,45 euros, une taille de 1,65 m, un chrono de 10,25 secondes. Ils servent à être précis : dire qu'un requin nage à 2,75 m/s est plus exact que dire 3 m/s. Ils servent aussi pour les pourcentages : 10 % de 60 euros, c'est 0,1 fois 60, soit 6 euros.",
  },
  historique: {
    texte:
      "Le mot « décimal » vient du latin et signifie « lié au nombre dix » : notre système d'écriture est en base 10, pratique pour compter et calculer. En 1585, le savant Simon Stevin publie La Disme et montre l'intérêt d'écrire les parties de nombres en dixièmes et centièmes. La virgule que nous utilisons se répand au début du XVIIe siècle, notamment grâce à John Napier.",
  },
  methode: [
    {
      titre: "Lire le rang",
      texte:
        "On repère la virgule, puis la position de chaque chiffre : le premier après la virgule est aux dixièmes, le deuxième aux centièmes, le troisième aux millièmes.",
    },
    {
      titre: "Ajouter des zéros",
      texte:
        "Pour comparer ou poser un calcul, on met le même nombre de chiffres après la virgule : 0,5 devient 0,50. La valeur du nombre ne change pas.",
    },
    {
      titre: "Aligner les virgules",
      texte:
        "Pour additionner, on pose le calcul virgule sous virgule. Pour multiplier ou diviser par un entier, on peut compter en dixièmes.",
    },
  ],
  usages: [
    {
      titre: "Lire et écrire",
      detail:
        "Passer d'une fraction décimale à l'écriture à virgule : 7/10 = 0,7 et 25/10 = 2,5. On lit « 2 unités et 5 dixièmes ».",
    },
    {
      titre: "Comparer",
      detail:
        "Mettre le même nombre de chiffres après la virgule, puis comparer : 0,5 = 0,50 et 0,50 est plus grand que 0,45.",
    },
    {
      titre: "Calculer",
      detail:
        "Additionner en alignant les virgules, multiplier ou diviser par un entier en pensant en dixièmes : 2,4 fois 3 = 7,2 et 3,6 divisé par 2 = 1,8.",
    },
  ],
  exemples: [
    {
      titre: "Lire et écrire",
      donnees: "On a la fraction 25/10.",
      question: "Écris-la en nombre décimal.",
      solution:
        "25/10, c'est 25 dixièmes. Or 20 dixièmes font 2 unités, et il reste 5 dixièmes. Donc 25/10 = 2,5.",
    },
    {
      titre: "Comparer deux prix",
      donnees: "Un jus coûte 2,5 euros et un autre coûte 2,45 euros.",
      question: "Lequel est le plus cher ?",
      solution:
        "On écrit 2,5 = 2,50 pour avoir deux chiffres après la virgule. On compare 2,50 et 2,45 : 50 centièmes, c'est plus que 45 centièmes. Le jus à 2,5 euros est donc le plus cher.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Écris 7/10 en nombre décimal, puis donne le chiffre des dixièmes de 12,764.",
      correction:
        "7/10, c'est 7 dixièmes, donc 7/10 = 0,7. Dans 12,764, le premier chiffre après la virgule est 7 : c'est le chiffre des dixièmes.",
    },
    {
      question: "Quel est le plus petit nombre : 0,305 ou 0,35 ?",
      correction:
        "On écrit 0,35 = 0,350 pour avoir trois chiffres après la virgule. On compare 305 millièmes et 350 millièmes : 305 est plus petit que 350. Le plus petit est donc 0,305.",
    },
    {
      question: "Calcule 3,45 + 1,7.",
      correction:
        "On écrit 1,7 = 1,70 pour avoir deux chiffres après la virgule. On aligne les virgules et on additionne : 3,45 + 1,70 = 5,15.",
    },
    {
      question:
        "Un objet coûte 2,5 euros. Combien coûtent 6 objets ? Puis calcule 9,6 divisé par 3.",
      correction:
        "Pour 6 objets : 2,5 fois 6 = 15, donc 15 euros. Pour la division : 9,6 = 96 dixièmes, et 96 divisé par 3 = 32, donc 32 dixièmes, soit 3,2.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesDecimaux6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Décimaux - 6e",
    section: {
      type: "objectif",
      phrase: "Lire, comparer et calculer avec les nombres à virgule",
      sousPhrase:
        "Un nombre décimal a une partie entière et une partie décimale, séparées par une virgule.",
      encadre: {
        titre: "L'idée",
        texte: "La virgule permet d'écrire des nombres plus précis que les entiers.",
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
          "Les prix (2,45 euros), les tailles (1,65 m), les chronos (10,25 s), les pourcentages : les décimaux servent à être précis.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Décimal » vient du nombre dix : on compte en base 10. Simon Stevin popularise cette écriture en 1585, et la virgule se répand au début du XVIIe siècle.",
      },
    },
  },
  {
    titre: "Le rang des chiffres",
    badge: "Après la virgule",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Dixièmes",
          texte: "Premier chiffre après la virgule. Dans 12,764, c'est le 7.",
        },
        {
          titre: "Centièmes",
          texte: "Deuxième chiffre après la virgule. Dans 12,764, c'est le 6.",
        },
        {
          titre: "Millièmes",
          texte: "Troisième chiffre après la virgule. Dans 12,764, c'est le 4.",
        },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheDecimaux6e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Selon la situation",
    badge: "3 usages",
    section: {
      type: "cartes",
      cartes: ficheDecimaux6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Lire et écrire",
    section: {
      type: "exemple",
      enonce: "On a la fraction 25/10.",
      question: "Écris-la en nombre décimal.",
      correction:
        "25 dixièmes = 2 unités et 5 dixièmes, donc 25/10 = 2,5.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Comparer",
    section: {
      type: "exemple",
      enonce: "Un jus coûte 2,5 euros, un autre 2,45 euros.",
      question: "Lequel est le plus cher ?",
      correction:
        "2,5 = 2,50, et 50 centièmes > 45 centièmes : le jus à 2,5 euros est le plus cher.",
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
      enonce: "Deux nombres décimaux : 3,45 et 1,7.",
      question: "Calcule 3,45 + 1,7.",
      indice: "Écris 1,7 = 1,70, puis aligne les virgules.",
      correction: "3,45 + 1,70 = 5,15.",
    },
  },
];
