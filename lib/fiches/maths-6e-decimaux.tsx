// ─── Fiche de cours : les nombres décimaux (6e) ────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/decimaux.bank.ts (notionId decimal_nombre).
// Refaite au standard « montrer, pas raconter » (retour Frédéric 13/07) : les
// nombres MONTRÉS dans le tableau de numération (prolongé après la virgule) et
// l'addition posée virgule sous virgule (canvas du coach). Épisode 2 de la
// mini-série « sens du nombre » 6e, à la suite des entiers.
//
// Micro-compétences couvertes :
// - decimal_lire_ecrire         → definition, figure (3,45), exemple « Lire/écrire »
//                                 (25/10 → 2,5, droite graduée), usages 1, entraînement 1
// - decimal_rang                → propriété « Les rangs », exemple « Le rang » (12,764,
//                                 tableau), methode « Lire le rang », entraînement 1
// - decimal_comparer            → propriété « Comparer », exemple « Comparer » (2,5 vs
//                                 2,45, tableau), usages 2, piège 1, entraînement 2
// - decimal_additionner         → propriété « Calculer », exemple « Additionner »
//                                 (3,45 + 1,70 posé), methode « Aligner », piège 3, entraînement 3
// - decimal_multiplier          → usages 3, entraînement 4 (2,5 × 6)
// - decimal_diviser_par_entier  → usages 3, entraînement 4 (9,6 ÷ 3, en dixièmes)
// - decimal_defi                → entraînement 4 / slide « exercice flash » (intercaler)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Le tableau de numération PROLONGÉ après la virgule : l'élève VOIT que les
// rangs continuent en dixièmes, centièmes, millièmes.
const tableauDecimal345 = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Le nombre 3,45",
      headers: ["Unités", ",", "Dixièmes", "Centièmes"],
      rows: [
        { label: "Chiffre", values: ["3", ",", "4", "5"] },
        { label: "Vaut", values: ["3", "", "0,4", "0,05"] },
      ],
      caption: "3,45 = 3 + 0,4 + 0,05.",
    }}
  />
);

const tableauRang = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Les rangs de 12,764",
      headers: ["Dizaines", "Unités", ",", "Dixièmes", "Centièmes", "Millièmes"],
      rows: [{ label: "Chiffre", values: ["1", "2", ",", "7", "6", "4"] }],
      highlight: { cell: { row: 0, col: 3 } },
      caption: "Après la virgule : dixièmes (7), centièmes (6), millièmes (4).",
    }}
  />
);

const tableauComparer = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "2,5 ou 2,45 ?",
      headers: ["Unités", ",", "Dixièmes", "Centièmes"],
      rows: [
        { label: "2,50", values: ["2", ",", "5", "0"] },
        { label: "2,45", values: ["2", ",", "4", "5"] },
      ],
      highlight: { col: 2 },
      caption: "Mêmes unités. 5 dixièmes dépassent 4 : 2,5 est plus grand.",
    }}
  />
);

const additionPosee = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "addition",
      numbers: ["3,45", "1,70"],
      result: "5,15",
      display: { showResult: true },
    }}
  />
);

const droite25 = (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 3,
      step: 0.5,
      points: [{ value: 2.5, label: "2,5", color: "#16a34a" }],
    }}
  />
);

const pieges = [
  "Croire que 2,45 dépasse 2,5 : 2,5 = 2,50, et 50 centièmes valent plus que 45.",
  "Confondre les rangs : dans 5,83, le 8 est aux dixièmes, le 3 aux centièmes.",
  "Additionner sans aligner les virgules : on écrit 1,7 = 1,70, puis virgule sous virgule.",
];

const aRetenir = [
  "Un décimal = une partie entière + une virgule + une partie décimale.",
  "Après la virgule : dixièmes, centièmes, millièmes.",
  "On peut ajouter des zéros à droite sans changer le nombre : 0,5 = 0,50.",
];

export const ficheDecimaux6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "decimal-nombre",
  titre: "Les nombres décimaux",
  accroche:
    "Un nombre décimal, c'est un nombre à virgule (2,5 ; 0,75). La virgule prolonge le tableau de numération : après les unités viennent les dixièmes, les centièmes…",
  identite: [
    { label: "Mots clés", valeur: "Virgule, partie entière, dixième, centième" },
    { label: "Le secret", valeur: "Après la virgule, les rangs continuent vers la droite" },
    { label: "Outil", valeur: "Le tableau de numération, prolongé après la virgule" },
  ],
  definition: {
    texte:
      "Un nombre décimal a une partie entière et une partie décimale, séparées par une virgule. Dans 3,45, la partie entière est 3 et la partie décimale vaut 45 centièmes.",
  },
  figure: {
    schema: tableauDecimal345,
    legende: "Chaque chiffre selon son rang, même après la virgule : 3,45 = 3 + 0,4 + 0,05.",
  },
  proprietes: [
    {
      titre: "La virgule sépare",
      texte: "Partie entière à gauche, partie décimale à droite : 3,45 → 3 et 45 centièmes.",
    },
    {
      titre: "Les rangs continuent",
      texte: "Après la virgule : dixièmes, puis centièmes, puis millièmes.",
    },
    {
      titre: "Comparer",
      texte: "Même nombre de décimales (0,5 = 0,50), puis on compare rang par rang.",
    },
  ],
  reel: {
    texte:
      "Les décimaux servent à être précis : un fruit à 2,45 €, une taille de 1,65 m, un chrono de 10,25 s. Dire qu'un requin nage à 2,75 m/s est plus exact que 3 m/s.",
  },
  historique: {
    texte:
      "« Décimal » vient de dix : on compte en base 10. En 1585, Simon Stevin montre l'intérêt d'écrire les dixièmes et centièmes ; la virgule se répand au début du XVIIe siècle.",
  },
  methode: [
    { titre: "Je lis le rang", texte: "1er après la virgule = dixièmes, 2e = centièmes, 3e = millièmes." },
    { titre: "J'ajoute des zéros", texte: "Pour comparer ou poser : 0,5 = 0,50, la valeur ne change pas." },
    { titre: "J'aligne les virgules", texte: "Pour additionner : virgule sous virgule, puis on calcule." },
  ],
  usages: [
    { titre: "Lire → écrire", detail: "D'une fraction décimale au nombre : 25/10 = 2,5." },
    { titre: "Comparer", detail: "Même nombre de décimales, puis rang par rang : 2,50 > 2,45." },
    { titre: "Calculer", detail: "Additionner (virgules alignées) ; ×/÷ par un entier en pensant en dixièmes." },
  ],
  exemples: [
    {
      titre: "Lire et écrire",
      donnees: "On a la fraction 25/10.",
      question: "Écris-la en nombre décimal.",
      schema: droite25,
      solution:
        "25/10, c'est 25 dixièmes. 20 dixièmes font 2 unités, il reste 5 dixièmes. Donc 25/10 = 2,5.",
    },
    {
      titre: "Le rang d'un chiffre",
      donnees: "On donne le nombre 12,764.",
      question: "Quel est le chiffre des dixièmes ?",
      schema: tableauRang,
      solution:
        "Juste après la virgule, c'est le rang des dixièmes : 7. Puis 6 aux centièmes et 4 aux millièmes.",
    },
    {
      titre: "Comparer deux prix",
      donnees: "Un jus à 2,5 € et un autre à 2,45 €.",
      question: "Lequel est le plus cher ?",
      schema: tableauComparer,
      solution:
        "On écrit 2,5 = 2,50. Mêmes unités : on compare les dixièmes, 5 > 4. Le jus à 2,5 € est le plus cher.",
    },
    {
      titre: "Additionner",
      donnees: "On calcule 3,45 + 1,7.",
      question: "Combien font 3,45 + 1,7 ?",
      schema: additionPosee,
      solution:
        "On écrit 1,7 = 1,70, puis virgule sous virgule. On additionne colonne par colonne : 3,45 + 1,70 = 5,15.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Écris 7/10 en nombre décimal, puis donne le chiffre des dixièmes de 12,764.",
      correction:
        "7/10 = 7 dixièmes = 0,7. Dans 12,764, le premier chiffre après la virgule est 7 : c'est le chiffre des dixièmes.",
    },
    {
      question: "Quel est le plus petit : 0,305 ou 0,35 ?",
      correction:
        "On écrit 0,35 = 0,350. On compare 305 millièmes et 350 millièmes : 305 est plus petit. Donc 0,305.",
    },
    {
      question: "Calcule 3,45 + 1,7.",
      correction:
        "On écrit 1,7 = 1,70, on aligne les virgules : 3,45 + 1,70 = 5,15.",
    },
    {
      question: "Un objet coûte 2,5 €. Combien coûtent 6 objets ? Puis calcule 9,6 ÷ 3.",
      correction:
        "2,5 × 6 = 15, donc 15 €. Pour la division : 9,6 = 96 dixièmes, 96 ÷ 3 = 32, soit 32 dixièmes = 3,2.",
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
        "La virgule prolonge le tableau de numération : après les unités viennent les dixièmes, les centièmes…",
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
          "Les prix (2,45 €), les tailles (1,65 m), les chronos (10,25 s) : les décimaux servent à être précis.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Décimal » vient de dix : on compte en base 10. Simon Stevin popularise cette écriture en 1585.",
      },
    },
  },
  {
    titre: "Le rang des chiffres",
    badge: "Après la virgule",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Dixièmes", texte: "1er chiffre après la virgule. Dans 12,764, c'est le 7." },
        { titre: "Centièmes", texte: "2e chiffre après la virgule. Dans 12,764, c'est le 6." },
        { titre: "Millièmes", texte: "3e chiffre après la virgule. Dans 12,764, c'est le 4." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheDecimaux6e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Selon la situation",
    badge: "3 usages",
    section: {
      type: "cartes",
      cartes: ficheDecimaux6e.usages.map((u) => ({ titre: u.titre, texte: u.detail })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Comparer",
    section: {
      type: "exemple",
      enonce: "Un jus à 2,5 €, un autre à 2,45 €.",
      question: "Lequel est le plus cher ?",
      correction: "2,5 = 2,50. Mêmes unités, on compare les dixièmes : 5 > 4, donc 2,5 € est le plus cher.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Additionner",
    section: {
      type: "exemple",
      enonce: "On calcule 3,45 + 1,7.",
      question: "Combien font 3,45 + 1,7 ?",
      correction: "On écrit 1,7 = 1,70, virgule sous virgule : 3,45 + 1,70 = 5,15.",
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
      enonce: "On cherche un nombre décimal entre 3,4 et 3,5.",
      question: "Propose un nombre décimal compris entre 3,4 et 3,5.",
      indice: "Écris 3,4 = 3,40 et 3,5 = 3,50, puis cherche entre les deux.",
      correction: "Par exemple 3,45 : on a bien 3,40 < 3,45 < 3,50.",
    },
  },
];
