// ─── Fiche de cours : les nombres entiers (CM2) ────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/nombres-entiers.bank.ts (notionId nombre_entier).
// Écrite pour un élève de CM2 (~10 ans) : TEXTE BRUT, PAS de LaTeX, phrases très
// courtes. On MONTRE (tableau de numération + droite graduée du coach) plutôt
// que raconter. Jumelle des décimaux, côté partie entière.
//
// Micro-compétences couvertes (les 6 de la banque) :
// - entier_lire       → definition, figure (tableau 4 273), exemple « Écrire », entraînement 1
// - entier_comparer   → propriété « Comparer », exemple « Le plus grand » (9 870), piège, entraînement 2
// - entier_decomposer → propriété « Décomposer », exemple « Décomposer » (4 582), méthode, entraînement 3
// - entier_arrondir   → propriété « Arrondir », méthode, exemple « Arrondir » (4 682 → 4 700, droite), entraînement 4
// - entier_multiple   → propriété « Les multiples », exemple « Un multiple » (42, droite table de 6)
// - entier_defi       → défi dessiné (96 letchis ÷ 8 = 12 sachets, marché de Saint-Pierre)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const VERT = "#16a34a";
const BLEU = "#2563eb";

// Une droite graduée dessinée par le moteur du coach : la même que dans les
// exercices. L'élève VOIT où se place le nombre entier.
function droite(
  points: { value: number; label: string; color?: string }[],
  min = 0,
  max = 48,
  step = 6
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

// Le tableau de numération : chaque chiffre a une COLONNE (une classe).
const tableau4273 = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Le nombre 4 273",
      headers: ["Milliers", "Centaines", "Dizaines", "Unités"],
      rows: [
        { label: "Chiffre", values: ["4", "2", "7", "3"] },
        { label: "Vaut", values: ["4 000", "200", "70", "3"] },
      ],
      caption: "4 273 = 4 000 + 200 + 70 + 3.",
    }}
  />
);

const tableauDecomposer = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Décomposer 4 582",
      headers: ["Milliers", "Centaines", "Dizaines", "Unités"],
      rows: [
        { label: "Chiffre", values: ["4", "5", "8", "2"] },
        { label: "Vaut", values: ["4 000", "500", "80", "2"] },
      ],
      caption: "4 582 = 4 000 + 500 + 80 + 2.",
    }}
  />
);

const tableauComparer = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "9 870 ou 9 708 ?",
      headers: ["Milliers", "Centaines", "Dizaines", "Unités"],
      rows: [
        { label: "9 870", values: ["9", "8", "7", "0"] },
        { label: "9 708", values: ["9", "7", "0", "8"] },
      ],
      highlight: { col: 1 },
      caption: "Même chiffre des milliers (9). On compare les centaines : 8 > 7, donc 9 870 est plus grand.",
    }}
  />
);

const pieges = [
  "Croire que le nombre avec le plus de chiffres est toujours le plus grand entre deux nombres de MÊME longueur : 9 708 a un 8, mais 9 870 est plus grand (on compare les centaines).",
  "Oublier un zéro dans la décomposition : 36 205, c'est 30 000 + 6 000 + 200 + 5 (le 5 vaut 5 unités, pas 50).",
  "Se tromper de rang pour arrondir : à la centaine, on regarde les DIZAINES ; au millier, on regarde les CENTAINES.",
];

const aRetenir = [
  "Chaque chiffre a une valeur selon sa colonne : unités, dizaines, centaines, milliers…",
  "Pour comparer, on regarde les chiffres de gauche à droite.",
  "Un multiple d'un nombre est un résultat de sa table (42 = 6 × 7).",
];

export const ficheNombresEntiersCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "nombre-entier",
  titre: "Les nombres entiers",
  accroche:
    "Un nombre entier, c'est un nombre sans virgule, comme 4 273. Chaque chiffre a une valeur selon sa place : les unités, les dizaines, les centaines, les milliers…",
  identite: [
    { label: "Mots clés", valeur: "Chiffre, rang, classe, milliers, multiple" },
    { label: "Le secret", valeur: "La valeur d'un chiffre dépend de sa colonne" },
    { label: "Outil", valeur: "Le tableau de numération et la droite graduée" },
  ],
  definition: {
    texte:
      "Un nombre entier s'écrit avec des chiffres, sans virgule. On le range dans un tableau : chaque colonne est une classe. Dans 4 273, il y a 4 milliers, 2 centaines, 7 dizaines et 3 unités.",
  },
  figure: {
    schema: tableau4273,
    legende: "Chaque chiffre vaut selon sa colonne : le 4 vaut 4 000, pas 4.",
  },
  proprietes: [
    {
      titre: "Chaque chiffre a un rang",
      texte: "De droite à gauche : unités, dizaines, centaines, milliers, dizaines de milliers…",
    },
    {
      titre: "Comparer",
      texte: "On compare les chiffres de gauche à droite : le premier qui diffère décide.",
    },
    {
      titre: "Décomposer",
      texte: "On écrit la valeur de chaque chiffre : 4 582 = 4 000 + 500 + 80 + 2.",
    },
    {
      titre: "Arrondir",
      texte: "On regarde le chiffre juste après le rang voulu : 5 ou plus on monte, moins de 5 on garde.",
    },
    {
      titre: "Les multiples",
      texte: "Un multiple de 6 est dans la table de 6 : 6, 12, 18, 24… 42 = 6 × 7.",
    },
  ],
  reel: {
    texte:
      "À La Réunion, les entiers sont partout : les 2 512 mètres du Piton des Neiges (le plus haut sommet !), le nombre d'habitants d'une commune, le prix d'un vélo, le nombre de letchis dans une caisse au marché de Saint-Pierre.",
  },
  historique: {
    texte:
      "On écrit les nombres avec dix chiffres (0 à 9) : ce sont les chiffres « arabes », venus d'Inde il y a plus de mille ans. Le zéro a été une grande invention : c'est lui qui garde les colonnes vides à la bonne place.",
  },
  methode: [
    { titre: "Je lis par classes", texte: "Je sépare milliers / centaines / dizaines / unités." },
    { titre: "Je compare de gauche à droite", texte: "Le premier chiffre qui change décide du plus grand." },
    { titre: "J'arrondis", texte: "Je regarde le chiffre d'après : 5 ou plus je monte, sinon je garde." },
  ],
  usages: [
    { titre: "Compter", detail: "Le nombre d'habitants, de spectateurs, de letchis dans une caisse." },
    { titre: "Ranger", detail: "Classer des scores ou des altitudes du plus petit au plus grand." },
    { titre: "Estimer", detail: "Arrondir 2 512 m à 2 500 m pour retenir plus vite." },
  ],
  exemples: [
    {
      titre: "Écrire un entier",
      donnees: "On lit : « cinq mille deux cent quarante ».",
      question: "Comment l'écrit-on en chiffres ?",
      schema: (
        <CanvasRenderer
          figure={{
            kind: "tableau_donnees",
            title: "cinq mille deux cent quarante",
            headers: ["Milliers", "Centaines", "Dizaines", "Unités"],
            rows: [{ label: "Chiffre", values: ["5", "2", "4", "0"] }],
            caption: "5 milliers, 2 centaines, 4 dizaines, 0 unité : 5 240.",
          }}
        />
      ),
      solution:
        "« cinq mille » = 5 000 et « deux cent quarante » = 240. On place chaque classe : 5 240.",
    },
    {
      titre: "Le plus grand",
      donnees: "On compare 9 870 et 9 708.",
      question: "Quel nombre est le plus grand ?",
      schema: tableauComparer,
      solution:
        "Même chiffre des milliers (9). On compare les centaines : 8 est plus grand que 7. Donc 9 870 > 9 708.",
    },
    {
      titre: "Décomposer",
      donnees: "On a le nombre 4 582.",
      question: "Écris sa décomposition.",
      schema: tableauDecomposer,
      solution:
        "Chaque chiffre selon sa colonne : 4 vaut 4 000, 5 vaut 500, 8 vaut 80, 2 vaut 2. Donc 4 582 = 4 000 + 500 + 80 + 2.",
    },
    {
      titre: "Arrondir à la centaine",
      donnees: "On a le nombre 4 682.",
      question: "Arrondis-le à la centaine la plus proche.",
      schema: droite(
        [
          { value: 4682, label: "4 682", color: BLEU },
          { value: 4700, label: "4 700", color: VERT },
        ],
        4600,
        4700,
        20
      ),
      solution:
        "Pour la centaine, on regarde les dizaines : ici 8 (5 ou plus), on monte. 4 682 s'arrondit à 4 700.",
    },
    {
      titre: "Un multiple de 6",
      donnees: "On cherche un multiple de 6 parmi 42, 44, 46, 50.",
      question: "Lequel est un multiple de 6 ?",
      schema: droite([{ value: 42, label: "42 = 6 × 7", color: VERT }], 0, 48, 6),
      solution:
        "Les multiples de 6 sont dans la table de 6 : 6, 12, 18, 24, 30, 36, 42. On tombe pile sur 42 (6 × 7). C'est 42.",
    },
    {
      titre: "Le défi 974",
      donnees: "Au marché de Saint-Pierre, un vendeur range 96 letchis dans des sachets de 8.",
      question: "Combien de sachets peut-il remplir ?",
      schema: droite([{ value: 96, label: "96 = 8 × 12", color: VERT }], 0, 96, 8),
      solution:
        "On cherche combien de fois 8 tient dans 96 : 96 ÷ 8 = 12. Le vendeur remplit 12 sachets.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Écris en chiffres : « trente-deux mille quinze ».",
      correction:
        "« trente-deux mille » = 32 000 et « quinze » = 15. Il n'y a pas de centaine : 32 015.",
    },
    {
      question: "Range dans l'ordre croissant : 8 450 ; 8 045 ; 8 405.",
      correction:
        "On compare de gauche à droite. L'ordre du plus petit au plus grand : 8 045 < 8 405 < 8 450.",
    },
    {
      question: "Décompose 70 809.",
      correction:
        "70 809 = 70 000 + 800 + 9. Attention : pas de millier isolé ni de dizaine, on garde les zéros.",
    },
    {
      question: "Arrondis 73 249 au millier près.",
      correction:
        "Pour le millier, on regarde les centaines : ici 2 (moins de 5), on garde. 73 249 ≈ 73 000.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesNombresEntiersCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Entiers - CM2",
    section: {
      type: "objectif",
      phrase: "Lire, comparer, décomposer et arrondir les nombres entiers",
      sousPhrase:
        "Dans le tableau de numération, chaque chiffre a une valeur selon sa colonne : unités, dizaines, centaines, milliers…",
      encadre: {
        titre: "L'idée",
        texte: "La place d'un chiffre décide de sa valeur : le 4 de 4 273 vaut 4 000.",
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
          "Les 2 512 m du Piton des Neiges, le nombre d'habitants d'une commune, les letchis d'une caisse au marché.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "On écrit avec dix chiffres (0 à 9), venus d'Inde. Le zéro garde les colonnes vides à la bonne place.",
      },
    },
  },
  {
    titre: "Le rang des chiffres",
    badge: "Le tableau",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Unités & dizaines", texte: "Les deux colonnes de droite. Dans 4 273 : 3 unités, 7 dizaines." },
        { titre: "Centaines", texte: "Dans 4 273, le 2 vaut 200." },
        { titre: "Milliers", texte: "Dans 4 273, le 4 vaut 4 000." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheNombresEntiersCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Le plus grand",
    section: {
      type: "exemple",
      enonce: "On compare 9 870 et 9 708.",
      question: "Quel nombre est le plus grand ?",
      correction: "Même chiffre des milliers (9). On compare les centaines : 8 > 7, donc 9 870 est plus grand.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Arrondir",
    section: {
      type: "exemple",
      enonce: "On a le nombre 4 682.",
      question: "Arrondis-le à la centaine la plus proche.",
      correction: "Pour la centaine, on regarde les dizaines : 8 (5 ou plus), on monte. 4 682 ≈ 4 700.",
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
      enonce: "Au marché de Saint-Pierre, un vendeur range 96 letchis dans des sachets de 8.",
      question: "Combien de sachets peut-il remplir ?",
      indice: "Cherche combien de fois 8 tient dans 96.",
      correction: "96 ÷ 8 = 12. Le vendeur remplit 12 sachets.",
    },
  },
];
