// ─── Fiche de cours : les nombres entiers (6e) ─────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/entiers.bank.ts (notionId entier_nombre).
// Refaite pour un élève de 6e (standard Frédéric du 13/07) : PEU de lecture,
// les nombres MONTRÉS dans le tableau de numération et sur la droite graduée
// (canvas du coach) plutôt que racontés. Propriétés = une ligne chacune.
//
// Micro-compétences couvertes :
// - entier_lire_ecrire  → definition, methode « Je repère le rang », usages 1,
//                         exemple « Écrire », entraînement 1
// - entier_rang         → figure (tableau de numération), propriété « La position »,
//                         exemple « Écrire » (chiffre des dizaines), entraînement 2
// - entier_comparer     → propriété « Comparer », usages 2, exemple « Comparer »
//                         (tableau), entraînement 3, piège 2
// - entier_decomposer   → propriété « Décomposer », usages 3, exemple « Décomposer »
//                         (tableau), entraînement 2
// - entier_encadrer     → propriété « Encadrer », exemple « Encadrer » (droite
//                         graduée), entraînement 3
// - entier_defi         → usages, entraînement 4, slide « exercice flash »

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Le tableau de numération du coach : l'élève VOIT la valeur de chaque chiffre
// selon sa colonne (le même dessin que dans ses exercices).
function tableauNumeration(
  title: string,
  chiffres: string[],
  valeurs: string[],
  caption: string
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "tableau_donnees",
        title,
        headers: ["Milliers", "Centaines", "Dizaines", "Unités"],
        rows: [
          { label: "Chiffre", values: chiffres },
          { label: "Vaut", values: valeurs },
        ],
        caption,
      }}
    />
  );
}

const tableauComparaison = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "345 ou 354 ?",
      headers: ["Centaines", "Dizaines", "Unités"],
      rows: [
        { label: "345", values: ["3", "4", "5"] },
        { label: "354", values: ["3", "5", "4"] },
      ],
      highlight: { col: 1 },
      caption: "Mêmes centaines : 5 dizaines dépassent 4, donc 354 > 345.",
    }}
  />
);

const droiteEncadrement = (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 40,
      max: 50,
      step: 1,
      points: [{ value: 47, label: "47", color: "#16a34a" }],
    }}
  />
);

const pieges = [
  "Confondre chiffre et nombre : dans 352, le chiffre des dizaines est 5, mais le nombre de dizaines est 35.",
  "Croire qu'un nombre qui commence par 9 est le plus grand : 908 est plus petit que 1 205 (moins de chiffres).",
  "Oublier le zéro d'un rang vide : « trois cent quatre » s'écrit 304, pas 34.",
];

const aRetenir = [
  "La valeur d'un chiffre dépend de sa position : unités, dizaines, centaines, milliers.",
  "Pour comparer : le plus de chiffres gagne ; à égalité, on compare de gauche à droite.",
  "Décomposer, c'est écrire la valeur de chaque chiffre : 4 273 = 4 000 + 200 + 70 + 3.",
];

export const ficheEntiers6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "entier-nombre",
  titre: "Les nombres entiers",
  accroche:
    "Un nombre entier sert à compter et à ranger. Tout repose sur une idée : la position d'un chiffre donne sa valeur.",
  identite: [
    { label: "Mots clés", valeur: "Chiffre, nombre, rang, valeur" },
    { label: "Le secret", valeur: "La position d'un chiffre donne sa valeur" },
    { label: "Outil", valeur: "Le tableau de numération" },
  ],
  definition: {
    texte:
      "Un nombre entier sert à compter des quantités entières, sans virgule (0, 1, 2, 3…). On l'écrit avec les dix chiffres de 0 à 9, et la valeur de chaque chiffre dépend de sa position.",
  },
  figure: {
    schema: tableauNumeration(
      "Le nombre 4 273",
      ["4", "2", "7", "3"],
      ["4 000", "200", "70", "3"],
      "La valeur d'un chiffre dépend de sa colonne."
    ),
    legende: "Chaque chiffre lu selon son rang : 4 273 = 4 000 + 200 + 70 + 3.",
  },
  proprietes: [
    {
      titre: "La position donne la valeur",
      texte: "Dans 4 273, le 2 vaut 200 : c'est le rang qui compte, pas le chiffre seul.",
    },
    {
      titre: "Comparer",
      texte: "Le plus de chiffres gagne ; à égalité, on compare de gauche à droite.",
    },
    {
      titre: "Encadrer",
      texte: "Placer entre deux nombres ronds qui se suivent : 40 < 47 < 50.",
    },
  ],
  reel: {
    texte:
      "Les entiers sont partout : un prix, le nombre de places d'un bus, le score d'un match. Comparer deux prix, c'est comparer deux entiers ; dire « environ 300 personnes », c'est encadrer.",
  },
  historique: {
    texte:
      "Nos dix chiffres viennent d'Inde (vers le 5e siècle). Le zéro comme vrai nombre a été décrit par Brahmagupta en 628. Cette écriture par position a remplacé les chiffres romains, peu pratiques pour calculer.",
  },
  methode: [
    { titre: "Je repère le rang", texte: "De droite à gauche : unités, dizaines, centaines, milliers." },
    { titre: "Je compare", texte: "Le plus long gagne ; sinon, chiffre par chiffre depuis la gauche." },
    { titre: "Je vérifie le zéro", texte: "Chaque rang vide garde un 0 : 1 042, pas 142." },
  ],
  usages: [
    { titre: "Lire → écrire", detail: "Des mots aux chiffres : « deux mille trente-cinq » → 2 035." },
    { titre: "Comparer → ranger", detail: "Trouver le plus grand ou ranger : 3 045 < 3 405 < 3 450." },
    { titre: "Décomposer / encadrer", detail: "4 206 = 4 000 + 200 + 6, ou 300 < 326 < 400." },
  ],
  exemples: [
    {
      titre: "Écrire et repérer un rang",
      donnees: "On donne « mille quarante-deux ».",
      question: "Écris-le en chiffres, puis donne le chiffre des dizaines.",
      schema: (
        <CanvasRenderer
          figure={{
            kind: "tableau_donnees",
            title: "1 042",
            headers: ["Milliers", "Centaines", "Dizaines", "Unités"],
            rows: [{ label: "Chiffre", values: ["1", "0", "4", "2"] }],
            highlight: { cell: { row: 0, col: 2 } },
            caption: "Un zéro tient le rang des centaines.",
          }}
        />
      ),
      solution:
        "Mille quarante-deux = 1 000 + 42. On écrit 1 042, avec un zéro aux centaines. Le chiffre des dizaines est 4.",
    },
    {
      titre: "Comparer deux nombres",
      donnees: "On compare 345 et 354.",
      question: "Quel est le plus grand ?",
      schema: tableauComparaison,
      solution:
        "Les deux ont 3 centaines. On compare les dizaines : 5 dizaines dépassent 4. Donc 354 est le plus grand.",
    },
    {
      titre: "Décomposer un nombre",
      donnees: "On donne le nombre 2 845.",
      question: "Décompose 2 845.",
      schema: tableauNumeration(
        "2 845",
        ["2", "8", "4", "5"],
        ["2 000", "800", "40", "5"],
        "2 845 = 2 000 + 800 + 40 + 5."
      ),
      solution:
        "Chaque chiffre selon sa colonne : 2 milliers, 8 centaines, 4 dizaines, 5 unités. Donc 2 845 = 2 000 + 800 + 40 + 5.",
    },
    {
      titre: "Encadrer un nombre",
      donnees: "On veut encadrer 47 entre deux dizaines.",
      question: "Entre quelles dizaines se trouve 47 ?",
      schema: droiteEncadrement,
      solution:
        "Sur la droite graduée, 47 est après 40 et avant 50. On écrit 40 < 47 < 50.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Écris en chiffres : deux mille trente-cinq.",
      correction:
        "Deux mille trente-cinq = 2 000 + 35. Pas de centaines : on place un zéro à ce rang. On écrit 2 035.",
    },
    {
      question: "Dans 2 845, quel est le chiffre des centaines et sa valeur ? Décompose ensuite.",
      correction:
        "De droite à gauche : 5 unités, 4 dizaines, 8 centaines, 2 milliers. Le chiffre des centaines est 8, il vaut 800. Décomposition : 2 845 = 2 000 + 800 + 40 + 5.",
    },
    {
      question: "Quel est le plus grand : 2 305 ou 2 350 ? Puis encadre 2 305 entre deux centaines.",
      correction:
        "Mêmes milliers et centaines. On compare les dizaines : 5 > 0, donc 2 350 est le plus grand. Et 2 300 < 2 305 < 2 400.",
    },
    {
      question: "Défi : le plus petit nombre de 4 chiffres avec 3, 0, 5 et 1 (une seule fois chacun) ?",
      correction:
        "Un nombre ne commence pas par 0. On place d'abord le plus petit chiffre non nul (1), puis 0, 3, 5. Réponse : 1 035.",
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
      phrase: "Lire, comparer, décomposer et encadrer les entiers",
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
          "Prix d'un jeu, places d'un bus, score d'un match : comparer deux prix, c'est comparer deux entiers.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Nos chiffres viennent d'Inde et le zéro a été décrit par Brahmagupta en 628. Ils ont remplacé les chiffres romains.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheEntiers6e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Quelle question ?",
    badge: "3 gestes",
    section: {
      type: "cartes",
      cartes: ficheEntiers6e.usages.map((u) => ({ titre: u.titre, texte: u.detail })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Comparer",
    section: {
      type: "exemple",
      enonce: "On compare 345 et 354.",
      question: "Quel est le plus grand ?",
      correction:
        "Mêmes centaines. On compare les dizaines : 5 > 4, donc 354 est le plus grand.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Décomposer",
    section: {
      type: "exemple",
      enonce: "On donne le nombre 2 845.",
      question: "Décompose-le.",
      correction: "2 milliers, 8 centaines, 4 dizaines, 5 unités : 2 845 = 2 000 + 800 + 40 + 5.",
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
      enonce: "Défi : on dispose des chiffres 3, 0, 5 et 1, une seule fois chacun.",
      question: "Quel est le plus petit nombre de quatre chiffres possible ?",
      indice: "Un nombre ne peut pas commencer par 0.",
      correction: "On commence par le plus petit chiffre non nul (1), puis 0, 3, 5 : la réponse est 1 035.",
    },
  },
];
