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

// ─── Les six dessins des blocs ────────────────────────────────────────────────
// ⭐ LE TABLEAU DE NUMÉRATION SERT DÉJÀ TROIS FOIS (figure, exemples 1 et 2).
// Six de plus et la fiche serait une colonne de tableaux (REGLES.md § 2 bis). Il
// ne revient donc que sur les deux blocs dont le geste EST de lire une colonne —
// et encore, avec une case allumée à chaque fois différente. Les quatre autres
// blocs sortent : une barre pour la décomposition (4 273, c'est une LONGUEUR
// faite de quatre morceaux), et la droite graduée pour comparer et encadrer,
// parce que « plus grand » veut dire « plus à droite ».

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// ⭐ LA DÉCOMPOSITION SE POSE EN COLONNES, ET LES RANGS S'ALIGNENT TOUT SEULS.
// C'est même le seul dessin de la fiche où la position d'un chiffre se voit
// physiquement : les zéros de 4000 poussent le 4 quatre crans à gauche.
//
// ⛔ CE BLOC A D'ABORD PORTÉ UNE BARRE (4000 + 200 + 70 + 3), et c'était une
// erreur d'échelle mesurée au rendu : `schema_barre` donne à chaque part une
// largeur PROPORTIONNELLE à sa valeur. Les 4000 mangeaient 93 % de la barre, et
// « 200 », « 70 », « centaines », « dizaines », « unités » se chevauchaient tous
// dans les 7 % restants. Une décomposition décimale est par nature déséquilibrée
// d'un facteur dix par rang : elle ne se dessine pas en longueurs.
const additionDesRangs = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "addition",
      title: "4 273 en morceaux",
      numbers: ["4000", "200", "70", "3"],
      result: "4273",
    }}
  />
);

// L'AUTRE MOITIÉ DE LA RÈGLE. L'exemple 1 compare 345 et 354, deux nombres de
// MÊME longueur — il montre donc « chiffre par chiffre ». Celui-ci montre la
// première moitié, celle qu'on applique avant même de regarder les chiffres :
// le plus long gagne, toujours.
const lePlusLongGagne = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "98 ou 1 042 ?",
      headers: ["Milliers", "Centaines", "Dizaines", "Unités"],
      rows: [
        { label: "98", values: ["", "", "9", "8"] },
        { label: "1 042", values: ["1", "0", "4", "2"] },
      ],
      highlight: { row: 1 },
      caption: "4 chiffres contre 2 : inutile de comparer, 1 042 gagne.",
    }}
  />
);

// ENCADRER, C'EST VOIR LES DEUX BORNES EN MÊME TEMPS. L'exemple 3 place 47 sur
// une droite qui va déjà de 40 à 50 : les bornes y sont les bouts du dessin, donc
// invisibles en tant que choix. Ici la droite va de 0 à 100, et ce sont les deux
// dizaines encadrantes qui sont marquées — on VOIT qu'on les a choisies.
const encadrerEntreDeuxDizaines = legende(
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 100,
      step: 20,
      points: [
        { value: 40, label: "40", color: "#2563eb" },
        { value: 47, label: "47", color: "#16a34a" },
        { value: 50, label: "50", color: "#2563eb" },
      ],
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
      size: { width: 260, height: 95 },
    }}
  />,
  "47 est coincé entre 40 et 50"
);

// LE RANG QU'ON CHERCHE, ALLUMÉ. Même tableau que la figure, mais une colonne
// est mise en avant : lire un rang, c'est poser le doigt sur une colonne.
const rangDesDizaines = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Le rang des dizaines",
      headers: ["Milliers", "Centaines", "Dizaines", "Unités"],
      rows: [
        { label: "Chiffre", values: ["1", "0", "4", "2"] },
        { label: "Vaut", values: ["1000", "0", "40", "2"] },
      ],
      highlight: { col: 2 },
      caption: "Le 4 est au rang des dizaines : il vaut 40.",
    }}
  />
);

// COMPARER, C'EST REGARDER QUI EST À DROITE. Le tableau explique POURQUOI 354
// dépasse 345 ; la droite le montre sans un mot — et c'est le seul dessin de la
// fiche où le résultat se lit sans lire un seul chiffre.
const leDroitierGagne = legende(
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 340,
      max: 360,
      step: 5,
      points: [
        { value: 345, label: "345", color: "#dc2626" },
        { value: 354, label: "354", color: "#16a34a" },
      ],
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
      size: { width: 260, height: 95 },
    }}
  />,
  "354 est à droite de 345 : il est plus grand"
);

// ⭐ LE ZÉRO NE VAUT RIEN, MAIS IL TIENT LA PLACE. La colonne des centaines est
// vide, et pourtant il faut écrire un 0 : sans lui, le 1 glisserait d'un rang et
// 1 042 deviendrait 142. Le tableau est le seul objet qui montre une colonne
// VIDE — une barre ou une droite ne peut pas dessiner une absence.
const leZeroQuiTientLaPlace = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Pourquoi ce 0 ?",
      headers: ["Milliers", "Centaines", "Dizaines", "Unités"],
      rows: [
        { label: "1 042", values: ["1", "0", "4", "2"] },
        { label: "sans le 0", values: ["", "1", "4", "2"] },
      ],
      highlight: { cell: { row: 0, col: 1 } },
      caption: "Sans le 0, tout glisse d'un rang : on écrirait 142.",
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
      micros: ["entier_rang"],
      texte: "Dans 4 273, le 2 vaut 200 : c'est le rang qui compte, pas le chiffre seul.",
      schema: additionDesRangs,
    },
    {
      titre: "Comparer",
      micros: ["entier_comparer"],
      texte: "Le plus de chiffres gagne ; à égalité, on compare de gauche à droite.",
      schema: lePlusLongGagne,
    },
    {
      titre: "Encadrer",
      micros: ["entier_encadrer"],
      texte: "Placer entre deux nombres ronds qui se suivent : 40 < 47 < 50.",
      schema: encadrerEntreDeuxDizaines,
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
    { titre: "Je repère le rang", texte: "De droite à gauche : unités, dizaines, centaines, milliers." , schema: rangDesDizaines , micros: ["entier_rang"] },
    { titre: "Je compare", texte: "Le plus long gagne ; sinon, chiffre par chiffre depuis la gauche." , schema: leDroitierGagne , micros: ["entier_comparer"] },
    { titre: "Je vérifie le zéro", texte: "Chaque rang vide garde un 0 : 1 042, pas 142." , schema: leZeroQuiTientLaPlace , micros: ["entier_lire_ecrire"] },
  ],
  usages: [
    { titre: "Lire → écrire", detail: "Des mots aux chiffres : « deux mille trente-cinq » → 2 035." , micros: ["entier_lire_ecrire"] },
    { titre: "Comparer → ranger", detail: "Trouver le plus grand ou ranger : 3 045 < 3 405 < 3 450." , micros: ["entier_comparer"] },
    { titre: "Décomposer / encadrer", detail: "4 206 = 4 000 + 200 + 6, ou 300 < 326 < 400." , micros: ["entier_decomposer", "entier_encadrer"] },
  ],
  exemples: [
    {
      titre: "Écrire et repérer un rang",
      micros: ["entier_lire_ecrire", "entier_rang"],
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
      micros: ["entier_comparer"],
      donnees: "On compare 345 et 354.",
      question: "Quel est le plus grand ?",
      schema: tableauComparaison,
      solution:
        "Les deux ont 3 centaines. On compare les dizaines : 5 dizaines dépassent 4. Donc 354 est le plus grand.",
    },
    {
      titre: "Décomposer un nombre",
      micros: ["entier_decomposer"],
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
      micros: ["entier_encadrer"],
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
      micros: ["entier_decomposer", "entier_defi"],
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
