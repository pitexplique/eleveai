// ─── Fiche de cours : les nombres décimaux (CM2) ───────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/nombres-decimaux.bank.ts (notionId nombre_decimal).
// Écrite pour un élève de CM2 (~10 ans) : TEXTE BRUT, PAS de LaTeX, phrases très
// courtes. On MONTRE (tableau de numération + droite graduée du coach) plutôt
// que raconter. Jumelle simplifiée de la fiche décimaux 6e.
//
// Micro-compétences couvertes (les 8 de la banque) :
// - decimal_lire            → definition, figure (tableau 3,4), exemple « Écrire », entraînement 1
// - decimal_fraction        → propriété « Une fraction décimale », exemple « De la fraction au décimal » (7/10), entraînement 2
// - decimal_valeur_chiffre  → propriété « Chaque chiffre a un rang », exemple « Le rang » (8,36, tableau), méthode
// - decimal_comparer        → propriété « Comparer », exemple « Le plus grand » (0,7 vs 0,65, tableau), piège
// - decimal_ordonner        → exemple « Ranger » (0,35 ; 0,4 ; 0,5), entraînement 3
// - decimal_droite          → figure droite, exemple « Sur la droite » (0,5), usages
// - decimal_arrondir        → propriété « Arrondir », méthode, exemple « Arrondir » (3,6 → 4), entraînement 4
// - decimal_defi            → défi dessiné + correction (sentier 2,5 km → 500 m, droite)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const VERT = "#16a34a";
const BLEU = "#2563eb";

// Une droite graduée dessinée par le moteur du coach : la même que dans les
// exercices. L'élève VOIT où se place le nombre à virgule.
function droite(
  points: { value: number; label: string; color?: string }[],
  min = 0,
  max = 1,
  step = 0.1
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min,
        max,
        step,
        points,
        display: {
          showTicks: true,
          showValues: true,
          showPoints: true,
          showPointLabels: true,
          showZero: true,
        },
      }}
    />
  );
}

// Le tableau de numération PROLONGÉ après la virgule : on voit que les rangs
// continuent en dixièmes, centièmes.
const tableau34 = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Le nombre 3,4",
      headers: ["Unités", ",", "Dixièmes"],
      rows: [
        { label: "Chiffre", values: ["3", ",", "4"] },
        { label: "Vaut", values: ["3", "", "4 dixièmes"] },
      ],
      caption: "3,4 = 3 unités et 4 dixièmes.",
    }}
  />
);

const tableauRang = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Les rangs de 8,36",
      headers: ["Unités", ",", "Dixièmes", "Centièmes"],
      rows: [{ label: "Chiffre", values: ["8", ",", "3", "6"] }],
      highlight: { cell: { row: 0, col: 3 } },
      caption: "Juste après la virgule : dixièmes (3), puis centièmes (6).",
    }}
  />
);

const tableauComparer = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "0,7 ou 0,65 ?",
      headers: ["Unités", ",", "Dixièmes", "Centièmes"],
      rows: [
        { label: "0,70", values: ["0", ",", "7", "0"] },
        { label: "0,65", values: ["0", ",", "6", "5"] },
      ],
      highlight: { col: 2 },
      caption: "On écrit 0,7 = 0,70. 7 dixièmes, c'est plus que 6 : 0,7 est plus grand.",
    }}
  />
);

const pieges = [
  "Croire que 0,65 dépasse 0,7 : plus de chiffres ne veut pas dire plus grand. 0,7 = 0,70, et 70 centièmes valent plus que 65.",
  "Confondre les rangs : dans 8,36, le 3 est aux dixièmes, le 6 aux centièmes (pas l'inverse).",
  "Oublier le 0 : « 5 unités et 8 centièmes » s'écrit 5,08 (un 0 aux dixièmes), pas 5,8.",
];

const aRetenir = [
  "Un nombre décimal, c'est un nombre à virgule : une partie entière, une virgule, une partie décimale.",
  "Après la virgule : d'abord les dixièmes, puis les centièmes.",
  "On peut ajouter des zéros à droite sans changer le nombre : 2,5 = 2,50.",
];

export const ficheNombresDecimauxCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "nombre-decimal",
  titre: "Les nombres décimaux",
  accroche:
    "Un nombre décimal, c'est un nombre à virgule, comme 3,4 ou 0,5. La virgule sépare les unités des petits morceaux : les dixièmes et les centièmes.",
  identite: [
    { label: "Mots clés", valeur: "Virgule, dixième, centième, partie entière" },
    { label: "Le secret", valeur: "Après la virgule, les rangs continuent : dixièmes, centièmes" },
    { label: "Outil", valeur: "Le tableau de numération et la droite graduée" },
  ],
  definition: {
    texte:
      "Un nombre décimal a deux parties, séparées par une virgule. À gauche, la partie entière (les unités). À droite, la partie décimale (les dixièmes, les centièmes). Dans 3,4, il y a 3 unités et 4 dixièmes.",
  },
  figure: {
    schema: tableau34,
    legende: "Après la virgule, on continue le tableau : le 4 est au rang des dixièmes.",
  },
  proprietes: [
    {
      titre: "La virgule sépare",
      texte: "À gauche de la virgule : les unités. À droite : les dixièmes, puis les centièmes.",
    },
    {
      titre: "Une fraction décimale",
      texte: "7 dixièmes s'écrit 7/10 ou 0,7. 34 centièmes s'écrit 34/100 ou 0,34.",
    },
    {
      titre: "Chaque chiffre a un rang",
      texte: "1er après la virgule = dixièmes, 2e = centièmes. Dans 8,36 : 3 dixièmes, 6 centièmes.",
    },
    {
      titre: "Comparer",
      texte: "On met le même nombre de chiffres après la virgule (0,7 = 0,70), puis on compare.",
    },
    {
      titre: "Arrondir à l'unité",
      texte: "On regarde le chiffre des dixièmes : 5 ou plus, on monte ; moins de 5, on garde.",
    },
  ],
  reel: {
    texte:
      "À La Réunion, les décimaux sont partout : un fruit à 2,5 € au marché de Saint-Pierre, un sentier de 2,5 km au volcan, une bouteille de 1,5 litre. Le décimal sert à être précis, entre deux nombres entiers.",
  },
  historique: {
    texte:
      "« Décimal » vient de dix : on compte en base 10 (dix doigts !). En 1585, un savant, Simon Stevin, explique comment écrire les dixièmes et les centièmes. La virgule est arrivée un peu après pour les séparer.",
  },
  methode: [
    { titre: "Je lis le rang", texte: "1er chiffre après la virgule = dixièmes, 2e = centièmes." },
    { titre: "J'ajoute des zéros", texte: "Pour comparer : 0,7 = 0,70, la valeur ne change pas." },
    { titre: "J'arrondis", texte: "Je regarde les dixièmes : 5 ou plus je monte, sinon je garde." },
  ],
  usages: [
    { titre: "Les prix", detail: "Un fruit à 2,5 € : 2 euros et 5 dixièmes d'euro (50 centimes)." },
    { titre: "Les mesures", detail: "Une taille de 1,45 m, un sentier de 2,5 km, 1,5 litre d'eau." },
    { titre: "Se repérer", detail: "Sur la droite graduée : 0,5 se place pile au milieu entre 0 et 1." },
  ],
  exemples: [
    {
      titre: "Écrire un décimal",
      donnees: "On lit : trois unités et quatre dixièmes.",
      question: "Comment l'écrit-on en chiffres ?",
      schema: tableau34,
      solution:
        "Les unités avant la virgule, les dixièmes juste après : 3 unités et 4 dixièmes s'écrivent 3,4.",
    },
    {
      titre: "De la fraction au décimal",
      donnees: "On a la fraction 7/10.",
      question: "Écris-la en nombre décimal.",
      schema: droite([{ value: 0.7, label: "0,7", color: VERT }]),
      solution:
        "7/10, c'est 7 dixièmes. Les dixièmes se placent juste après la virgule : 7/10 = 0,7.",
    },
    {
      titre: "Le rang d'un chiffre",
      donnees: "On donne le nombre 8,36.",
      question: "Quel chiffre est au rang des centièmes ?",
      schema: tableauRang,
      solution:
        "Après la virgule : 3 est aux dixièmes, 6 est aux centièmes. Le chiffre des centièmes est 6.",
    },
    {
      titre: "Le plus grand",
      donnees: "On compare 0,7 et 0,65.",
      question: "Quel nombre est le plus grand ?",
      schema: tableauComparer,
      solution:
        "On écrit 0,7 = 0,70. On compare les dixièmes : 7 dixièmes, c'est plus que 6. Donc 0,7 est plus grand que 0,65.",
    },
    {
      titre: "Ranger dans l'ordre",
      donnees: "Les nombres 0,4 ; 0,35 ; 0,5.",
      question: "Range-les du plus petit au plus grand.",
      schema: droite(
        [
          { value: 0.35, label: "0,35", color: BLEU },
          { value: 0.4, label: "0,4", color: BLEU },
          { value: 0.5, label: "0,5", color: VERT },
        ],
        0,
        1,
        0.1
      ),
      solution:
        "Sur la droite, le plus à gauche est le plus petit : 0,35 puis 0,4 puis 0,5. L'ordre croissant est 0,35 ; 0,4 ; 0,5.",
    },
    {
      titre: "Arrondir à l'unité",
      donnees: "On a le nombre 3,6.",
      question: "Arrondis-le à l'unité la plus proche.",
      schema: droite(
        [
          { value: 3.6, label: "3,6", color: BLEU },
          { value: 4, label: "4", color: VERT },
        ],
        3,
        4,
        0.1
      ),
      solution:
        "Le chiffre des dixièmes est 6 (5 ou plus), donc on monte à l'entier au-dessus. 3,6 arrondi à l'unité donne 4.",
    },
    {
      titre: "Le défi 974",
      donnees: "À La Réunion, un sentier fait 2,5 km.",
      question: "Que représente le 0,5 km en mètres ?",
      schema: droite(
        [{ value: 0.5, label: "0,5 km = 500 m", color: VERT }],
        0,
        1,
        0.1
      ),
      solution:
        "1 km = 1000 m. Le 0,5 km, c'est la moitié d'un kilomètre, donc 500 m. Le sentier fait 2 km et 500 m.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Écris en chiffres : cinq unités et huit centièmes.",
      correction:
        "Les centièmes sont au 2e rang après la virgule. S'il n'y a pas de dixième, on met un 0 : 5,08.",
    },
    {
      question: "Écris 34/100 en nombre décimal.",
      correction:
        "34/100, c'est 34 centièmes. Les centièmes prennent deux chiffres après la virgule : 34/100 = 0,34.",
    },
    {
      question: "Range du plus petit au plus grand : 0,4 ; 0,35 ; 0,5.",
      correction:
        "On compare : 0,35 < 0,4 < 0,5. L'ordre croissant est 0,35 ; 0,4 ; 0,5.",
    },
    {
      question: "Arrondis 7,2 à l'unité la plus proche.",
      correction:
        "Le chiffre des dixièmes est 2 (moins de 5), donc on garde l'entier. 7,2 arrondi donne 7.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesNombresDecimauxCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Décimaux - CM2",
    section: {
      type: "objectif",
      phrase: "Lire, comparer et ranger les nombres à virgule",
      sousPhrase:
        "La virgule prolonge le tableau de numération : après les unités viennent les dixièmes, puis les centièmes.",
      encadre: {
        titre: "L'idée",
        texte: "Le décimal sert à être précis, entre deux nombres entiers.",
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
          "Un fruit à 2,5 € au marché, un sentier de 2,5 km au volcan, une bouteille de 1,5 litre.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Décimal » vient de dix. En 1585, Simon Stevin explique comment écrire les dixièmes et les centièmes.",
      },
    },
  },
  {
    titre: "Le rang des chiffres",
    badge: "Après la virgule",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Dixièmes", texte: "1er chiffre après la virgule. Dans 8,36, c'est le 3." },
        { titre: "Centièmes", texte: "2e chiffre après la virgule. Dans 8,36, c'est le 6." },
        { titre: "Le zéro utile", texte: "5 unités et 8 centièmes = 5,08 (un 0 aux dixièmes)." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheNombresDecimauxCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Le plus grand",
    section: {
      type: "exemple",
      enonce: "On compare 0,7 et 0,65.",
      question: "Quel nombre est le plus grand ?",
      correction: "On écrit 0,7 = 0,70. On compare les dixièmes : 7 > 6, donc 0,7 est plus grand.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Arrondir",
    section: {
      type: "exemple",
      enonce: "On a le nombre 3,6.",
      question: "Arrondis-le à l'unité la plus proche.",
      correction: "Le chiffre des dixièmes est 6 (5 ou plus) : on monte. 3,6 arrondi donne 4.",
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
      enonce: "À La Réunion, un sentier fait 2,5 km.",
      question: "Que représente le 0,5 km en mètres ?",
      indice: "1 km = 1000 m. 0,5 km, c'est la moitié d'un kilomètre.",
      correction: "0,5 km, c'est la moitié de 1000 m, donc 500 m. Le sentier fait 2 km et 500 m.",
    },
  },
];
