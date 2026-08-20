// ─── Fiche de cours : les nombres relatifs (5e) ────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/5e/maths/nombres-relatifs.bank.ts (notionId relatif_nombre).
// Écrite pour un élève de 5e (texte brut, pas de LaTeX) : PEU de lecture, la
// droite graduée MONTRÉE (canvas number_line du coach) plutôt que racontée.
//
// Micro-compétences couvertes :
// - relatif_lire            → définition, exemple « Lire un relatif » (−3 °C), entraînement 1
// - relatif_signe           → propriété « Le signe », figure (négatif à gauche, positif à droite)
// - relatif_comparer        → propriété « Comparer », exemple « Comparer » (−1 vs +6), entraînement 2
// - relatif_placer          → exemple « Placer un point » (droite graduée, A = −3), méthode
// - relatif_oppose          → propriété « L'opposé », exemple « L'opposé » (−7 → +7), entraînement 3
// - relatif_valeur_absolue  → exemple « La distance à 0 » (|−5| = 5), piège
// - relatif_defi            → usages, défi dessiné + correction (−2 puis +5 puis −3 → 0)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Une droite graduée dessinée par le moteur du coach : l'élève VOIT la même
// droite que dans ses exercices (le 0 au centre, les négatifs à gauche).
function droite(
  points: { value: number; label: string; color?: string }[],
  min = -5,
  max = 5
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min,
        max,
        step: 1,
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

// La distance a 0 n'est pas une position, c'est une LONGUEUR : elle se met bout
// a bout, donc c'est le schema en barres (lib/canvas/CATALOGUE.md). C'est aussi
// ce que dit le calibrage du 19/08 — number_line dessine des points, pas des
// ecarts. Les parts sont a l'echelle de leur valeur depuis le 20/08.
const distances = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "La distance à 0",
      total: "de −5 à +5 : 10 unités",
      parts: [
        { label: "|−5| = 5", value: "5" },
        { label: "|+5| = 5", value: "5" },
      ],
      questionLabel: "Deux nombres opposés sont à la même distance de 0.",
      size: { width: 320, height: 175 },
    }}
  />
);

const VERT = "#16a34a";
const ROUGE = "#dc2626";
const BLEU = "#2563eb";

const pieges = [
  "Croire que −7 est plus grand que −4 : plus le nombre est loin de 0 côté négatif, plus il est PETIT.",
  "Oublier le signe − : « 3 en dessous de zéro » s'écrit −3, pas 3.",
  "Confondre l'opposé et la valeur absolue : l'opposé de −5 est +5, mais la valeur absolue de −5 est 5 (une distance, donc toujours positive).",
];

const aRetenir = [
  "Un nombre relatif a un signe (+ ou −) et une distance à 0 (sa valeur absolue).",
  "Sur la droite graduée : les positifs à droite de 0, les négatifs à gauche ; le plus à droite est le plus grand.",
  "Deux nombres opposés (−5 et +5) sont de part et d'autre de 0, à la même distance.",
];

export const ficheNombresRelatifs5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "relatif-nombre",
  titre: "Les nombres relatifs",
  accroche:
    "Un nombre relatif sert à repérer un chaud/froid, un dessus/dessous, un gagné/perdu. Tout tient sur une droite : un signe et une distance à zéro.",
  identite: [
    { label: "Mots clés", valeur: "Signe, positif, négatif, opposé, valeur absolue" },
    { label: "Le secret", valeur: "Un signe (+ / −) + une distance à 0" },
    { label: "Outil", valeur: "La droite graduée (0 au centre)" },
  ],
  definition: {
    texte:
      "Un nombre relatif est un nombre qui porte un signe : il peut être positif (à droite de 0), négatif (à gauche de 0) ou nul. On l'écrit avec + ou − devant. Le 0 n'est ni positif ni négatif : c'est la frontière entre les deux.",
  },
  figure: {
    schema: droite([
      { value: -3, label: "−3", color: ROUGE },
      { value: 2, label: "+2", color: VERT },
    ]),
    legende: "À gauche de 0 : les négatifs. À droite de 0 : les positifs.",
  },
  // Un dessin sous chaque propriete (REGLES.md § 2 bis). Trois d'entre elles
  // parlent de POSITION — c'est la droite graduee, avec des nombres differents a
  // chaque fois. La quatrieme parle de DISTANCE : une distance se met bout a
  // bout, elle se dessine en barres. Quatre fois la meme droite, ce serait
  // quatre regles identiques aux yeux d'un eleve de 5e.
  proprietes: [
    {
      titre: "Le signe",
      texte: "Au-dessus / à droite de 0 → positif (+). En dessous / à gauche de 0 → négatif (−).",
      schema: droite([
        { value: -4, label: "−4", color: ROUGE },
        { value: 3, label: "+3", color: BLEU },
      ]),
    },
    {
      titre: "Comparer",
      texte: "Le plus grand est le plus à droite. Un positif est toujours plus grand qu'un négatif.",
      schema: droite([
        { value: -1, label: "−1", color: ROUGE },
        { value: 6, label: "+6 gagne", color: VERT },
      ], -5, 8),
    },
    {
      titre: "L'opposé",
      texte: "On change seulement le signe : l'opposé de −5 est +5. Ils sont symétriques par rapport à 0.",
      schema: droite([
        { value: -5, label: "−5", color: ROUGE },
        { value: 5, label: "+5", color: VERT },
      ], -6, 6),
    },
    {
      titre: "La valeur absolue",
      texte: "C'est la distance à 0, donc toujours positive : la valeur absolue de −5 comme de +5 vaut 5.",
      schema: distances,
    },
  ],
  reel: {
    texte:
      "À La Réunion, on lit des relatifs partout : −3 °C au sommet du volcan un matin d'hiver, +28 °C sur la plage l'après-midi. Aussi : l'altitude au-dessus/au-dessous du niveau de la mer, l'argent gagné (+) ou dépensé (−).",
  },
  historique: {
    texte:
      "Les nombres négatifs ont mis des siècles à être acceptés : au XVIᵉ siècle en Europe, on les appelait encore « nombres absurdes ». Ce sont les marchands et les comptables (des dettes = du négatif) qui les ont imposés.",
  },
  // Les trois gestes, dans l'ordre : le signe (de quel cote de 0 ?), la distance
  // (combien d'unites ?), puis placer et comparer.
  methode: [
    {
      titre: "Je repère le signe",
      texte: "+ ou − : le nombre est-il à droite ou à gauche de 0 ?",
      schema: droite([{ value: -4, label: "à gauche de 0", color: ROUGE }]),
    },
    {
      titre: "Je mesure la distance à 0",
      texte: "C'est sa valeur absolue : de combien d'unités je m'éloigne de 0.",
      schema: (
        <CanvasRenderer
          figure={{
            kind: "schema_barre",
            total: "4 unités",
            parts: [{ label: "de −4 à 0", value: "4" }],
            questionLabel: "La distance ne porte pas de signe : elle vaut 4.",
            size: { width: 320, height: 165 },
          }}
        />
      ),
    },
    {
      titre: "Je place / je compare",
      texte: "Sur la droite graduée : le plus à droite est le plus grand.",
      schema: droite([
        { value: -3, label: "−3", color: ROUGE },
        { value: 2, label: "+2", color: VERT },
      ]),
    },
  ],
  usages: [
    {
      titre: "Température",
      detail: "Au-dessus de 0 : positif. En dessous : négatif (−3 °C).",
      schema: droite([
        { value: -3, label: "−3 °C", color: ROUGE },
        { value: 4, label: "+4 °C", color: BLEU },
      ]),
    },
    {
      titre: "Altitude / niveau",
      detail: "Au-dessus de la mer : positif. En dessous : négatif.",
      schema: droite([
        { value: -2, label: "−2 m", color: ROUGE },
        { value: 5, label: "+5 m", color: VERT },
      ], -6, 6),
    },
    {
      titre: "Argent",
      detail: "On reçoit : +. On dépense ou on doit : −.",
      schema: droite([
        { value: -3, label: "je dois 3 €", color: ROUGE },
        { value: 5, label: "j'ai 5 €", color: VERT },
      ], -6, 6),
    },
  ],
  exemples: [
    {
      titre: "Lire un relatif",
      donnees: "Au volcan, il fait 3 °C en dessous de zéro.",
      question: "Comment écrit-on cette température ?",
      schema: droite([{ value: -3, label: "−3", color: ROUGE }]),
      solution:
        "« En dessous de zéro » → le nombre est négatif. On met le signe − : la température est −3 °C.",
    },
    {
      titre: "Comparer deux relatifs",
      donnees: "Au Maïdo, il fait −1 °C le matin et +6 °C l'après-midi.",
      question: "Quelle température est la plus grande ?",
      schema: droite([
        { value: -1, label: "−1", color: ROUGE },
        { value: 6, label: "+6", color: VERT },
      ]),
      solution:
        "Sur la droite, +6 est plus à droite que −1. Un positif est toujours plus grand qu'un négatif : +6 °C > −1 °C.",
    },
    {
      titre: "Placer un point",
      donnees: "Une droite graduée de −5 à +5.",
      question: "Où se trouve le point A d'abscisse −3 ?",
      schema: droite([{ value: -3, label: "A", color: BLEU }]),
      solution:
        "On part de 0 et on va vers la gauche (car −3 est négatif) de 3 unités. Le point A est à l'abscisse −3.",
    },
    {
      titre: "L'opposé",
      donnees: "Le nombre −7.",
      question: "Quel est l'opposé de −7 ?",
      schema: droite([
        { value: -7, label: "−7", color: ROUGE },
        { value: 7, label: "+7", color: VERT },
      ], -8, 8),
      solution:
        "L'opposé garde la même distance à 0 mais change de côté : l'opposé de −7 est +7. Les deux sont à 7 unités de 0.",
    },
    {
      titre: "La distance à 0 (valeur absolue)",
      donnees: "Le nombre −5.",
      question: "Quelle est sa valeur absolue ?",
      schema: droite([{ value: -5, label: "−5", color: ROUGE }]),
      solution:
        "La valeur absolue, c'est la distance à 0. De −5 à 0, il y a 5 unités. La valeur absolue de −5 est donc 5.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Écris avec son signe : 7 en dessous de zéro.",
      correction:
        "En dessous de zéro → nombre négatif → on met le signe −. Réponse : −7.",
    },
    {
      question: "Complète avec > ou < :  −4 … −7.",
      correction:
        "Parmi deux négatifs, le plus proche de 0 est le plus grand. −4 est plus proche de 0 que −7, donc −4 > −7.",
    },
    {
      question: "Quel est l'opposé de +4 ? Et sa valeur absolue ?",
      correction:
        "L'opposé de +4 est −4 (même distance à 0, autre côté). La valeur absolue de +4 est 4 (la distance à 0).",
    },
    {
      question: "Au sommet, il fait −2 °C. La température monte de 5 degrés, puis redescend de 3 degrés. Quelle est la température finale ?",
      correction:
        "On part de −2. On ajoute 5 : −2 + 5 = +3. On enlève 3 : +3 − 3 = 0. La température finale est 0 °C.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

export const slidesNombresRelatifs5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Nombres relatifs - 5e",
    section: {
      type: "objectif",
      phrase: "Lire, placer et comparer les nombres relatifs",
      sousPhrase:
        "Un nombre relatif, c'est un signe (+ ou −) et une distance à zéro. Tout se lit sur la droite graduée.",
      encadre: {
        titre: "L'idée",
        texte: "Les positifs à droite de 0, les négatifs à gauche. Le plus à droite est le plus grand.",
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
          "Températures (−3 °C au volcan), altitude au-dessus/au-dessous de la mer, argent gagné (+) ou dépensé (−).",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Au XVIᵉ siècle, on appelait les nombres négatifs des « nombres absurdes ». Ce sont les dettes des comptables qui les ont imposés.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheNombresRelatifs5e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Comparer deux relatifs",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "Au Maïdo : −1 °C le matin, +6 °C l'après-midi.",
      question: "Quelle température est la plus grande ?",
      correction:
        "Sur la droite, +6 est plus à droite que −1. Un positif est toujours plus grand qu'un négatif : +6 > −1.",
    },
  },
  {
    titre: "Opposé & valeur absolue",
    badge: "Ne pas confondre",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "L'opposé de −5",
        contenu: "On change le signe : c'est +5. Même distance à 0, autre côté.",
      },
      droite: {
        variante: "ok",
        titre: "La valeur absolue de −5",
        contenu: "C'est la distance à 0 : elle vaut 5, toujours positive.",
      },
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
      enonce: "Au sommet, il fait −2 °C. La température monte de 5 degrés, puis redescend de 3 degrés.",
      question: "Quelle est la température finale ?",
      indice: "Pars de −2, ajoute 5, puis enlève 3. Avance et recule sur la droite graduée.",
      correction:
        "−2 + 5 = +3, puis +3 − 3 = 0. La température finale est 0 °C.",
    },
  },
];
