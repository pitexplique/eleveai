// ─── Fiche de cours : le calcul (CM2) ───────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/calcul.bank.ts (notionId calcul).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On MONTRE (calcul posé du
// coach + tableau des rangs pour aligner la virgule) plutôt que raconter.
//
// Micro-compétences couvertes (les 7 de la banque) :
// - calcul_mental               → propriété « De tête », exemple « De tête » (25+25, complément 37→100), méthode, entraînement 1
// - calcul_addition_posee       → figure (245+132), exemple « En colonnes » (487+268 retenue), entraînement 2
// - calcul_soustraction_posee   → exemple « La différence » (704-268 retenue), piège ordre
// - calcul_decimal_addition     → propriété « Aligner les virgules », exemple « Décimaux » (3,4+2,5, tableau)
// - calcul_decimal_soustraction → exemple « Un entier moins un décimal » (8 → 8,00 - 2,35, tableau), piège virgule
// - calcul_priorite             → propriété « Les priorités », exemple « Priorités » (4+3×5), piège, entraînement 3
// - calcul_defi                 → défi dessiné 974 (marché : 5 sachets × 5 € puis monnaie sur 30 €), entraînement 4

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Le calcul posé DESSINÉ par le moteur du coach (chiffres alignés sur leur rang).
const poseeAdd = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "addition",
      numbers: ["245", "132"],
      result: "377",
      display: { showResult: true },
    }}
  />
);
const poseeAddRetenue = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "addition",
      numbers: ["487", "268"],
      result: "755",
      retenues: ["", "1", "1", ""],
      display: { showResult: true, showRetenues: true },
    }}
  />
);
const poseeSousRetenue = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "soustraction",
      numbers: ["704", "268"],
      result: "436",
      retenues: ["", "1", "1", ""],
      display: { showResult: true, showRetenues: true },
    }}
  />
);
const poseeMonnaie = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "soustraction",
      numbers: ["30", "25"],
      result: "5",
      display: { showResult: true },
    }}
  />
);

// Un tableau des rangs pour SHOW que les virgules sont alignées.
const tableauDecAdd = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "3,4 + 2,5",
      headers: ["Unités", ",", "Dixièmes"],
      rows: [
        { label: "3,4", values: ["3", ",", "4"] },
        { label: "2,5", values: ["2", ",", "5"] },
        { label: "Total", values: ["5", ",", "9"] },
      ],
      highlight: { col: 2 },
      caption: "On aligne les virgules : dixièmes sous dixièmes. 4 + 5 = 9, 3 + 2 = 5 → 5,9.",
    }}
  />
);
const tableauDecSous = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "8 − 2,35",
      headers: ["Unités", ",", "Dixièmes", "Centièmes"],
      rows: [
        { label: "8,00", values: ["8", ",", "0", "0"] },
        { label: "2,35", values: ["2", ",", "3", "5"] },
        { label: "Reste", values: ["5", ",", "6", "5"] },
      ],
      caption: "On écrit 8 = 8,00 pour aligner. 8,00 − 2,35 = 5,65.",
    }}
  />
);

const pieges = [
  "Oublier une retenue : si on ne la reporte pas dans la colonne suivante, tout le résultat est faux.",
  "Aligner les décimaux à droite au lieu d'aligner les virgules : 4,5 + 2,35, c'est 4,50 + 2,35, pas autre chose.",
  "Faire l'addition avant la multiplication : dans 4 + 3 × 5, la multiplication passe d'abord (= 19, pas 35).",
];

const aRetenir = [
  "En colonnes, on aligne les chiffres par rang (et les virgules pour les décimaux).",
  "Une retenue se reporte toujours dans la colonne de gauche.",
  "Sans parenthèses, la multiplication se calcule avant l'addition et la soustraction.",
];

export const ficheCalculCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "calcul",
  titre: "Le calcul",
  accroche:
    "Calculer, c'est trouver un résultat : de tête pour aller vite, ou en colonnes pour les grands nombres. Le secret : bien aligner les chiffres et respecter l'ordre des opérations.",
  identite: [
    { label: "Mots clés", valeur: "Poser, colonne, retenue, virgule, priorité" },
    { label: "Le secret", valeur: "On aligne par rang, on reporte les retenues à gauche" },
    { label: "Outil", valeur: "Le calcul posé et le tableau des rangs" },
  ],
  definition: {
    texte:
      "Pour additionner ou soustraire de grands nombres, on les pose en colonnes : les unités sous les unités, les dizaines sous les dizaines. On calcule colonne par colonne, de droite à gauche, en reportant les retenues.",
  },
  figure: {
    schema: poseeAdd,
    legende: "245 + 132 : on aligne les rangs et on additionne chaque colonne. Résultat : 377.",
  },
  proprietes: [
    {
      titre: "Calculer de tête",
      texte: "On utilise des astuces : les doubles (25 + 25 = 50), les compléments à 100, × 10 ou × 100.",
    },
    {
      titre: "Poser en colonnes",
      texte: "On aligne les chiffres par rang. Une colonne qui dépasse 9 donne une retenue à gauche.",
    },
    {
      titre: "Aligner les virgules",
      texte: "Pour les décimaux, on met la virgule sous la virgule. Au besoin, on ajoute des zéros (8 = 8,00).",
    },
    {
      titre: "Les priorités",
      texte: "On calcule d'abord les parenthèses, puis les multiplications, puis les additions et soustractions.",
    },
    {
      titre: "Vérifier",
      texte: "On contrôle avec l'opération inverse : 586 − 243 = 343, car 343 + 243 = 586.",
    },
  ],
  reel: {
    texte:
      "À La Réunion, on calcule tout le temps : le total des courses au marché de Saint-Pierre, la monnaie que rend le marchand, le temps de trajet jusqu'au volcan, l'addition d'un pique-nique à Mafate.",
  },
  historique: {
    texte:
      "Poser les opérations en colonnes est une invention assez récente. Avant, on calculait sur un boulier ou avec des jetons sur une table. Les colonnes rangent les chiffres pour ne pas se tromper de rang.",
  },
  methode: [
    { titre: "J'aligne les rangs", texte: "Unités sous unités ; pour les décimaux, virgule sous virgule." },
    { titre: "Je reporte les retenues", texte: "Une colonne au-dessus de 9 laisse une retenue à gauche." },
    { titre: "Je respecte l'ordre", texte: "Parenthèses, puis ×, puis + et −." },
  ],
  usages: [
    { titre: "Faire les comptes", detail: "Le total d'un panier, l'addition d'un repas." },
    { titre: "Rendre la monnaie", detail: "Prix payé moins prix à payer : une soustraction." },
    { titre: "Aller vite", detail: "Le calcul mental pour estimer sans poser (25 + 25 = 50)." },
  ],
  exemples: [
    {
      titre: "De tête",
      donnees: "On veut 25 + 25, puis le complément de 37 à 100.",
      question: "Combien font-ils ?",
      solution:
        "25 + 25, c'est le double de 25 : 50. Pour aller de 37 à 100, on calcule 100 − 37 = 63.",
    },
    {
      titre: "Additionner en colonnes",
      donnees: "On pose 487 + 268.",
      question: "Quel est le résultat ?",
      schema: poseeAddRetenue,
      solution:
        "7 + 8 = 15 : on écrit 5, on retient 1. 8 + 6 + 1 = 15 : on écrit 5, on retient 1. 4 + 2 + 1 = 7. Résultat : 755.",
    },
    {
      titre: "La différence",
      donnees: "On pose 704 − 268.",
      question: "Quel est le résultat ?",
      schema: poseeSousRetenue,
      solution:
        "On ne peut pas faire 4 − 8 : on emprunte. 14 − 8 = 6. Puis on continue colonne par colonne : 704 − 268 = 436.",
    },
    {
      titre: "Additionner des décimaux",
      donnees: "On additionne 3,4 + 2,5.",
      question: "Quel est le résultat ?",
      schema: tableauDecAdd,
      solution:
        "On aligne les virgules. 4 dixièmes + 5 dixièmes = 9 dixièmes ; 3 + 2 = 5. Donc 3,4 + 2,5 = 5,9.",
    },
    {
      titre: "Un entier moins un décimal",
      donnees: "On calcule 8 − 2,35.",
      question: "Quel est le résultat ?",
      schema: tableauDecSous,
      solution:
        "On écrit 8 = 8,00 pour aligner les rangs. Puis on soustrait : 8,00 − 2,35 = 5,65.",
    },
    {
      titre: "Les priorités",
      donnees: "On a le calcul 4 + 3 × 5.",
      question: "Que vaut-il ?",
      solution:
        "La multiplication passe avant l'addition : 3 × 5 = 15, puis 4 + 15 = 19. (Pas 35 !)",
    },
    {
      titre: "Le défi 974",
      donnees: "Au marché de Saint-Pierre, un sachet de fruits coûte 5 €. Malo achète 5 sachets et paie avec un billet de 30 €.",
      question: "Combien de monnaie reçoit-il ?",
      schema: poseeMonnaie,
      solution:
        "D'abord le total : 5 × 5 = 25 €. Puis la monnaie : 30 − 25 = 5 €. Malo reçoit 5 €.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Calcule de tête : le double de 40, puis 100 − 46.",
      correction: "Le double de 40 est 80. Le complément : 100 − 46 = 54.",
    },
    {
      question: "Pose et calcule 596 + 347.",
      correction: "6 + 7 = 13 (retiens 1), 9 + 4 + 1 = 14 (retiens 1), 5 + 3 + 1 = 9. Résultat : 943.",
    },
    {
      question: "Calcule : (6 + 4) × 3.",
      correction: "Les parenthèses d'abord : 6 + 4 = 10, puis 10 × 3 = 30.",
    },
    {
      question: "Calcule : 100 − (4 × 8 + 12).",
      correction: "Dans la parenthèse : 4 × 8 = 32, puis 32 + 12 = 44. Enfin 100 − 44 = 56.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesCalculCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Calcul - CM2",
    section: {
      type: "objectif",
      phrase: "Additionner, soustraire, calculer de tête et respecter les priorités",
      sousPhrase:
        "On pose en colonnes pour les grands nombres, on aligne les virgules pour les décimaux, on suit l'ordre des opérations.",
      encadre: {
        titre: "L'idée",
        texte: "Bien aligner les rangs, c'est déjà réussir la moitié du calcul.",
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
          "Le total des courses, la monnaie rendue au marché, le temps de trajet jusqu'au volcan.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Avant les colonnes, on calculait sur un boulier ou avec des jetons. Les colonnes rangent les rangs.",
      },
    },
  },
  {
    titre: "Poser en colonnes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: [
        { titre: "J'aligne", texte: "Unités sous unités ; virgule sous virgule pour les décimaux." },
        { titre: "Je retiens", texte: "Une colonne au-dessus de 9 laisse une retenue à gauche." },
        { titre: "L'ordre", texte: "Parenthèses, puis ×, puis + et −." },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Addition à retenue",
    section: {
      type: "exemple",
      enonce: "On pose 487 + 268.",
      question: "Quel est le résultat ?",
      correction: "7 + 8 = 15 (retiens 1), 8 + 6 + 1 = 15 (retiens 1), 4 + 2 + 1 = 7. Résultat : 755.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Priorités",
    section: {
      type: "exemple",
      enonce: "On a le calcul 4 + 3 × 5.",
      question: "Que vaut-il ?",
      correction: "La multiplication d'abord : 3 × 5 = 15, puis 4 + 15 = 19.",
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
      enonce: "Au marché de Saint-Pierre, un sachet coûte 5 €. Malo achète 5 sachets et paie 30 €.",
      question: "Combien de monnaie reçoit-il ?",
      indice: "D'abord le total, ensuite la soustraction.",
      correction: "Total : 5 × 5 = 25 €. Monnaie : 30 − 25 = 5 €.",
    },
  },
];
