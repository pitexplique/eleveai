// ─── Fiche de cours : le calcul posé (6e) ──────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/calcul-pose.bank.ts (notionId entier_calcul_pose).
// Refaite pour un élève de 6e (retour Frédéric) : PEU de lecture, les 4
// opérations MONTRÉES en colonnes (canvas du coach) plutôt que racontées.
//
// Micro-compétences couvertes :
// - entier_addition_posee        → exemple « addition » (dessiné), entraînement 1, figure
// - entier_soustraction_posee    → exemple « soustraction » (dessiné), entraînement 2
// - entier_multiplication_posee  → exemple « multiplication » (dessiné), entraînement 3
// - entier_division_posee        → exemple « division » (dessiné), entraînement 4
// - entier_calcul_verifier       → propriété « Je vérifie », méthode, pièges
// - entier_calcul_pose_defi      → usages (choisir l'opération), entraînement 4

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Une opération posée dessinée par le moteur du coach : l'élève VOIT les
// colonnes alignées (le même dessin que dans ses exercices).
function pose(
  operation: "addition" | "soustraction" | "multiplication",
  numbers: string[],
  result: string
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "calcul_pose",
        operation,
        numbers,
        result,
        display: { showResult: true },
      }}
    />
  );
}

const poseDivision = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "division",
      numbers: ["58", "7"],
      division: { dividende: "58", diviseur: "7", quotient: "8", reste: "2" },
      display: { showResult: true },
    }}
  />
);

// ─── Les six dessins des blocs ────────────────────────────────────────────────
// ⭐ ICI LE CANVAS EST IMPOSÉ : une fiche sur le calcul POSÉ montre des calculs
// posés. Le risque n'est donc pas de changer d'objet, c'est de poser six fois la
// même opération (REGLES.md § 2 bis). Chaque dessin change ce qu'il MET EN
// AVANT : une colonne, une retenue, l'opération inverse, un alignement faux, et
// un ordre de grandeur qui n'est plus un calcul du tout.

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// LA COLONNE, ALLUMÉE. Poser, c'est d'abord ranger : la mise en avant d'une
// seule colonne dit que les chiffres se répondent verticalement.
const colonneDesUnites = legende(
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "addition",
      title: "347 + 25",
      numbers: ["347", "25"],
      result: "372",
      highlight: { col: 0 },
      display: { showResult: true },
    }}
  />,
  "les unités sous les unités : 7 et 5, pas 7 et 2"
);

// ⭐ LA RETENUE ÉCRITE, PAS RACONTÉE. Le seul dessin de la fiche qui porte la
// petite ligne du haut — c'est elle, la propriété.
const laRetenueEcrite = legende(
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "addition",
      title: "168 + 47",
      numbers: ["168", "47"],
      result: "215",
      retenues: ["1", "1", ""],
      display: { showResult: true },
    }}
  />,
  "8 + 7 = 15 : j'écris 5, je reporte 1"
);

// VÉRIFIER UNE DIVISION, C'EST FAIRE UNE MULTIPLICATION. L'exemple de la fiche
// pose 58 ÷ 7 ; ce dessin-ci fait le chemin inverse, 7 × 8, et l'on retrouve 56
// auquel il manque le reste 2. Deux opérations différentes pour un seul calcul.
const verifierParLInverse = legende(
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "multiplication",
      title: "La vérification",
      numbers: ["7", "8"],
      result: "56",
      display: { showResult: true },
    }}
  />,
  "7 × 8 = 56, plus le reste 2 : on retrouve 58"
);

// ⭐ L'ALIGNEMENT FAUX, ET C'EST LE SEUL CONTRE-EXEMPLE DE LA FICHE. Un calcul
// posé correct ne montre jamais pourquoi l'alignement compte : il faut voir le
// désastre. Un tableau, parce qu'aucun canvas de calcul ne sait poser DE TRAVERS.
const alignementFaux = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "347 + 25, mal posé",
      headers: ["Centaines", "Dizaines", "Unités", "?"],
      rows: [
        { label: "347", values: ["3", "4", "7", ""] },
        { label: "25 décalé", values: ["", "", "2", "5"] },
      ],
      highlight: { cell: { row: 1, col: 3 } },
      caption: "Le 5 tombe hors des unités : le résultat sera faux.",
    }}
  />
);

// CALCULER, C'EST DESCENDRE COLONNE PAR COLONNE — et la soustraction est celle
// qui fait peur. Une retenue, mais dans l'autre sens.
const soustractionAvecRetenue = legende(
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "soustraction",
      title: "425 − 78",
      numbers: ["425", "78"],
      result: "347",
      retenues: ["", "1", "1"],
      display: { showResult: true },
    }}
  />,
  "5 − 8 est impossible : on emprunte une dizaine"
);

// ⭐ VÉRIFIER SANS CALCULER. Le seul dessin de la fiche qui ne pose rien : 425
// moins 78, c'est « un peu moins de 350 ». Un résultat à 500 se refuse d'un coup
// d'œil, avant même de refaire l'opération.
const ordreDeGrandeur = legende(
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 500,
      step: 100,
      points: [
        { value: 347, label: "347", color: "#16a34a" },
        { value: 480, label: "480 ?", color: "#dc2626" },
      ],
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
      size: { width: 280, height: 95 },
    }}
  />,
  "425 − 78 : autour de 350, pas 480"
);

const pieges = [
  "Oublier une retenue : tout le reste du calcul devient faux.",
  "Mal aligner les chiffres : on additionne alors une unité avec une dizaine.",
  "Garder un reste plus grand que le diviseur dans une division.",
];

const aRetenir = [
  "On aligne les chiffres de même rang : unités sous unités.",
  "On calcule colonne par colonne, de droite à gauche, en reportant les retenues.",
  "On vérifie avec l'opération inverse.",
];

export const ficheCalculPose6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "entier-calcul-pose",
  titre: "Le calcul posé",
  accroche:
    "Poser un calcul, c'est l'écrire en colonnes pour calculer de grands nombres sans se tromper — même sans calculatrice.",
  identite: [
    { label: "Mots clés", valeur: "Colonne, rang, retenue, quotient, reste" },
    { label: "Le secret", valeur: "Aligner les chiffres de même rang" },
    { label: "Outil", valeur: "Papier à carreaux (un chiffre par carreau)" },
  ],
  definition: {
    texte:
      "Poser une opération, c'est écrire les nombres l'un sous l'autre en alignant les chiffres de même rang (unités sous unités, dizaines sous dizaines). On calcule ensuite colonne par colonne, en commençant par les unités.",
  },
  figure: {
    schema: pose("addition", ["475", "286"], "761"),
    legende: "Chaque chiffre sous celui de même rang, puis on calcule colonne par colonne.",
  },
  proprietes: [
    {
      titre: "J'aligne les rangs",
      micros: ["entier_addition_posee", "entier_soustraction_posee"],
      texte: "Unités sous unités, dizaines sous dizaines. Sinon le calcul est faux.",
      schema: colonneDesUnites,
    },
    {
      titre: "Je gère la retenue",
      micros: ["entier_addition_posee"],
      texte: "Si une colonne dépasse 9, j'écris le chiffre des unités et je reporte 1 à gauche.",
      schema: laRetenueEcrite,
    },
    {
      titre: "Je vérifie",
      micros: ["entier_calcul_verifier"],
      texte: "Avec l'opération inverse : dividende = diviseur × quotient + reste.",
      schema: verifierParLInverse,
    },
  ],
  reel: {
    texte:
      "On pose un calcul dès qu'il n'y a pas de calculatrice : additionner des prix, rendre la monnaie, partager des cartes entre amis.",
  },
  historique: {
    texte:
      "Vers 820, à Bagdad, le savant Al-Khwarizmi explique comment calculer pas à pas. Son nom a donné le mot « algorithme » : une suite d'étapes dans l'ordre.",
  },
  methode: [
    { titre: "J'aligne", texte: "Les chiffres de même rang, l'un sous l'autre." , schema: alignementFaux , micros: ["entier_addition_posee"] },
    { titre: "Je calcule", texte: "Colonne par colonne, de droite à gauche, avec les retenues." , schema: soustractionAvecRetenue , micros: ["entier_soustraction_posee"] },
    { titre: "Je vérifie", texte: "Avec l'opération inverse, ou un ordre de grandeur." , schema: ordreDeGrandeur },
  ],
  usages: [
    { titre: "Regrouper → addition", detail: "On met ensemble : on pose une addition." , micros: ["entier_addition_posee"] },
    { titre: "Enlever → soustraction", detail: "On retire une quantité : on pose une soustraction." , micros: ["entier_soustraction_posee"] },
    { titre: "Répéter / partager", detail: "On répète : multiplication. On partage en parts égales : division." , micros: ["entier_multiplication_posee", "entier_division_posee"] },
  ],
  exemples: [
    {
      titre: "Addition (avec retenue)",
      micros: ["entier_addition_posee"],
      donnees: "475 + 286.",
      question: "Combien font 475 + 286 ?",
      schema: pose("addition", ["475", "286"], "761"),
      solution:
        "5 + 6 = 11 → j'écris 1, je retiens 1. 7 + 8 + 1 = 16 → j'écris 6, je retiens 1. 4 + 2 + 1 = 7. Résultat : 761.",
    },
    {
      titre: "Soustraction (avec emprunt)",
      micros: ["entier_soustraction_posee"],
      donnees: "632 − 458 (le plus grand en haut).",
      question: "Combien font 632 − 458 ?",
      schema: pose("soustraction", ["632", "458"], "174"),
      solution:
        "2 − 8 impossible : 12 − 8 = 4. 3 devient 2, 2 − 5 impossible : 12 − 5 = 7. 6 devient 5, 5 − 4 = 1. Résultat : 174.",
    },
    {
      titre: "Multiplication",
      micros: ["entier_multiplication_posee"],
      donnees: "267 × 4.",
      question: "Combien font 267 × 4 ?",
      schema: pose("multiplication", ["267", "4"], "1068"),
      solution:
        "7 × 4 = 28 → j'écris 8, je retiens 2. 6 × 4 = 24, + 2 = 26 → j'écris 6, je retiens 2. 2 × 4 = 8, + 2 = 10. Résultat : 1 068.",
    },
    {
      titre: "Division",
      micros: ["entier_division_posee"],
      donnees: "On partage 58 en parts de 7.",
      question: "Quel est le quotient et le reste de 58 ÷ 7 ?",
      schema: poseDivision,
      solution:
        "7 × 8 = 56, c'est le plus proche de 58 sans dépasser. Quotient 8, reste 58 − 56 = 2. Le reste 2 est plus petit que 7. Vérif : 7 × 8 + 2 = 58.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Pose et calcule : 348 + 275.",
      correction:
        "8 + 5 = 13 (j'écris 3, retenue 1). 4 + 7 + 1 = 12 (j'écris 2, retenue 1). 3 + 2 + 1 = 6. Résultat : 623.",
    },
    {
      question: "Pose et calcule : 632 − 458.",
      correction:
        "2 − 8 → 12 − 8 = 4. 3 → 2, 2 − 5 → 12 − 5 = 7. 6 → 5, 5 − 4 = 1. Résultat : 174. Vérif : 174 + 458 = 632.",
    },
    {
      question: "Pose et calcule : 267 × 4.",
      correction:
        "7 × 4 = 28 (8, retenue 2). 6 × 4 = 24 + 2 = 26 (6, retenue 2). 2 × 4 = 8 + 2 = 10. Résultat : 1 068.",
      micros: ["entier_multiplication_posee"],
    },
    {
      question: "On partage 58 billes entre 7 enfants. Combien chacun, et combien reste-t-il ?",
      correction:
        "Partager, c'est diviser : 58 ÷ 7. 7 × 8 = 56, donc 8 billes chacun et il reste 2. Vérif : 7 × 8 + 2 = 58.",
      micros: ["entier_division_posee", "entier_calcul_pose_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesCalculPose6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Calcul posé - 6e",
    section: {
      type: "objectif",
      phrase: "Calculer de grands nombres sans calculatrice",
      sousPhrase:
        "Poser un calcul, c'est l'écrire en colonnes pour calculer rang par rang, sans rien oublier.",
      encadre: {
        titre: "L'idée",
        texte: "Un bon alignement + les retenues = un résultat juste.",
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
          "Additionner des prix, rendre la monnaie, partager des cartes : dès qu'il n'y a pas de calculatrice.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Vers 820, à Bagdad, Al-Khwarizmi explique le calcul pas à pas. Son nom a donné le mot « algorithme ».",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheCalculPose6e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Quelle opération ?",
    badge: "Choisir",
    section: {
      type: "cartes",
      cartes: ficheCalculPose6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Addition avec retenue",
    section: {
      type: "exemple",
      enonce: "On pose 475 + 286 en colonnes.",
      question: "Calculer 475 + 286.",
      correction:
        "5 + 6 = 11 : j'écris 1, retenue 1. 7 + 8 + 1 = 16 : j'écris 6, retenue 1. 4 + 2 + 1 = 7. Résultat : 761.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Division euclidienne",
    section: {
      type: "exemple",
      enonce: "On partage 58 en parts de 7.",
      question: "Quotient et reste de 58 ÷ 7 ?",
      correction:
        "7 × 8 = 56, donc quotient 8 et reste 2. Vérification : 7 × 8 + 2 = 58, et 2 est plus petit que 7.",
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
      enonce: "On partage 58 billes entre 7 enfants.",
      question: "Combien de billes chacun, et combien en reste-t-il ?",
      indice: "Partager, c'est diviser : cherche le multiple de 7 le plus proche de 58.",
      correction:
        "58 ÷ 7 : 7 × 8 = 56, donc 8 billes chacun et il reste 2. Vérification : 7 × 8 + 2 = 58.",
    },
  },
];
