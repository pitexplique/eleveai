// ─── Fiche de cours : lire un tableau (CM2) ─────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/tableaux.bank.ts (notionId tableau).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On MONTRE avec le canvas
// tableau_donnees du coach (le même tableau « fruits du marché » que les exercices).
//
// Micro-compétences couvertes (les 4 de la banque) :
// - tableau_lire       → figure (tableau fruits), exemple « Lire une case » (bananes mercredi = 35), entraînement 1
// - tableau_completer  → propriété « Le total », exemple « Compléter » (total ananas = 62), entraînement 2
// - tableau_interpreter→ propriété « Interpréter », exemple « Le plus vendu » (bananes), entraînement 3
// - tableau_defi       → défi dessiné 974 (total du mercredi = 73 fruits), entraînement 4

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

function fruitsMarche(
  highlight?:
    | { cell: { row: number; col: number } }
    | { row: number }
    | { col: number },
  caption = "Nombre de fruits vendus au marché."
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "tableau_donnees",
        title: "Fruits vendus au marché",
        headers: ["Lundi", "Mardi", "Mercredi"],
        rows: [
          { label: "Ananas", values: ["18", "24", "20"] },
          { label: "Bananes", values: ["30", "28", "35"] },
          { label: "Mangues", values: ["12", "15", "18"] },
        ],
        highlight,
        caption,
        display: { striped: true },
      }}
    />
  );
}

const tableauTotal = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "On ajoute la colonne Total",
      headers: ["Lundi", "Mardi", "Mercredi", "Total"],
      rows: [
        { label: "Ananas", values: ["18", "24", "20", "62"] },
        { label: "Bananes", values: ["30", "28", "35", "93"] },
        { label: "Mangues", values: ["12", "15", "18", "45"] },
      ],
      highlight: { col: 3 },
      caption: "Total d'une ligne = on additionne ses cases : 18 + 24 + 20 = 62.",
    }}
  />
);

const pieges = [
  "Croiser la mauvaise ligne et la mauvaise colonne : on part de la ligne (le fruit), on descend la colonne (le jour), on lit la case au croisement.",
  "Confondre lire et interpréter : lire, c'est trouver une case ; interpréter, c'est comparer ou tirer une conclusion.",
  "Oublier une case dans un total : le total d'une ligne, c'est toutes ses cases additionnées.",
];

const aRetenir = [
  "Une case se lit au croisement d'une ligne et d'une colonne.",
  "Le total d'une ligne (ou d'une colonne) = la somme de ses cases.",
  "Interpréter, c'est comparer les nombres pour répondre à une question.",
];

export const ficheTableauxCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "tableau",
  titre: "Lire un tableau",
  accroche:
    "Un tableau range des données en lignes et en colonnes. Pour lire une case, on croise une ligne et une colonne. C'est le moyen le plus clair d'organiser des informations.",
  identite: [
    { label: "Mots clés", valeur: "Ligne, colonne, case, croisement, total" },
    { label: "Le secret", valeur: "Une case se lit au croisement ligne × colonne" },
    { label: "Outil", valeur: "Le doigt qui suit la ligne, puis la colonne" },
  ],
  definition: {
    texte:
      "Un tableau organise des données. Chaque ligne et chaque colonne a un titre. Une case se trouve au croisement d'une ligne et d'une colonne : elle donne une information précise.",
  },
  figure: {
    schema: fruitsMarche({ cell: { row: 1, col: 2 } }),
    legende: "La case surlignée croise la ligne « Bananes » et la colonne « Mercredi » : 35.",
  },
  proprietes: [
    {
      titre: "Lire une case",
      texte: "On repère la ligne, on descend la colonne, on lit la case au croisement.",
    },
    {
      titre: "Le total",
      texte: "Le total d'une ligne = on additionne toutes ses cases. Pareil pour une colonne.",
    },
    {
      titre: "Interpréter",
      texte: "Comparer les cases pour répondre : le plus grand, le plus petit, la différence.",
    },
    {
      titre: "Compléter",
      texte: "Une case manquante se retrouve avec les autres (souvent grâce au total).",
    },
  ],
  reel: {
    texte:
      "À La Réunion, les tableaux sont partout : les fruits vendus au marché de Saint-Pierre jour par jour, les horaires du car jaune, les résultats sportifs d'une classe, la météo de la semaine.",
  },
  historique: {
    texte:
      "Ranger des chiffres en lignes et colonnes est une très vieille idée : les marchands et les astronomes le faisaient déjà sur des tablettes d'argile il y a des milliers d'années. Le tableau, c'est l'ancêtre du tableur sur l'ordinateur.",
  },
  methode: [
    { titre: "Je lis les titres", texte: "Le titre de la ligne et celui de la colonne." },
    { titre: "Je croise", texte: "Je suis la ligne, je descends la colonne, je lis la case." },
    { titre: "Je calcule si besoin", texte: "Total d'une ligne = somme de ses cases." },
  ],
  usages: [
    { titre: "Comparer", detail: "Quel fruit se vend le mieux ? Quel jour ?" },
    { titre: "Suivre", detail: "Les horaires d'un car, un emploi du temps." },
    { titre: "Compter", detail: "Le total des ventes de la semaine." },
  ],
  exemples: [
    {
      titre: "Lire une case",
      donnees: "On regarde le tableau des fruits.",
      question: "Combien de bananes ont été vendues mercredi ?",
      schema: fruitsMarche({ cell: { row: 1, col: 2 } }),
      solution:
        "On croise la ligne « Bananes » et la colonne « Mercredi » : la case indique 35.",
    },
    {
      titre: "Compléter le total",
      donnees: "On veut le total des ananas sur les trois jours.",
      question: "Quel est ce total ?",
      schema: tableauTotal,
      solution:
        "On additionne la ligne « Ananas » : 18 + 24 + 20 = 62 ananas.",
    },
    {
      titre: "Le plus vendu",
      donnees: "On compare les fruits vendus mercredi.",
      question: "Quel fruit s'est le mieux vendu mercredi ?",
      schema: fruitsMarche({ col: 2 }, "On compare la colonne « Mercredi »."),
      solution:
        "Mercredi : 20 ananas, 35 bananes, 18 mangues. Le plus grand est 35 : les bananes.",
    },
    {
      titre: "Le défi 974",
      donnees: "On veut le total de tous les fruits vendus mercredi au marché de Saint-Pierre.",
      question: "Combien de fruits en tout ce jour-là ?",
      schema: fruitsMarche({ col: 2 }, "On additionne toute la colonne « Mercredi »."),
      solution:
        "On additionne la colonne « Mercredi » : 20 + 35 + 18 = 73 fruits.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Combien d'ananas ont été vendus mardi ?",
      correction: "On croise « Ananas » et « Mardi » : 24 ananas.",
    },
    {
      question: "Quel est le total des mangues sur les trois jours ?",
      correction: "12 + 15 + 18 = 45 mangues.",
    },
    {
      question: "Quel fruit s'est le moins vendu lundi ?",
      correction: "Lundi : 18 ananas, 30 bananes, 12 mangues. Le plus petit est 12 : les mangues.",
    },
    {
      question: "Combien de bananes ont été vendues en tout sur les trois jours ?",
      correction: "30 + 28 + 35 = 93 bananes.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesTableauxCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Tableaux - CM2",
    section: {
      type: "objectif",
      phrase: "Lire, compléter et interpréter un tableau",
      sousPhrase:
        "Un tableau range des données en lignes et colonnes. Une case se lit au croisement des deux.",
      encadre: {
        titre: "L'idée",
        texte: "Le bon réflexe : je suis la ligne, je descends la colonne, je lis la case.",
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
          "Les fruits vendus au marché de Saint-Pierre, les horaires du car jaune, un emploi du temps.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Ranger des chiffres en lignes et colonnes existe depuis les tablettes d'argile, il y a des milliers d'années.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheTableauxCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Lire une case",
    section: {
      type: "exemple",
      enonce: "On regarde le tableau des fruits.",
      question: "Combien de bananes vendues mercredi ?",
      correction: "On croise « Bananes » et « Mercredi » : 35.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Interpréter",
    section: {
      type: "exemple",
      enonce: "On compare la colonne « Mercredi ».",
      question: "Quel fruit s'est le mieux vendu ?",
      correction: "20 ananas, 35 bananes, 18 mangues : le plus grand est 35, les bananes.",
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
      enonce: "Au marché de Saint-Pierre, on veut le total de tous les fruits vendus mercredi.",
      question: "Combien de fruits ce jour-là ?",
      indice: "Additionne toute la colonne « Mercredi ».",
      correction: "20 + 35 + 18 = 73 fruits.",
    },
  },
];
