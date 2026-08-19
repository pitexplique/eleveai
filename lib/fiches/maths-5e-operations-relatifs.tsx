// ─── Fiche de cours : les opérations sur les relatifs (5e) ─────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/5e/maths/operations-relatifs.bank.ts
// (notionId relatif_operation).
//
// ⚠️ ELLE SUIT LA FICHE SŒUR, maths-5e-nombres-relatifs.tsx (relatif_nombre) :
// même droite graduée, mêmes couleurs, même vocabulaire. Les deux notions se
// suivent dans l'année et l'élève doit reconnaître le MÊME dessin — le signe et
// la distance à 0 sont appris là-bas, on ne les réapprend pas ici, on s'en sert.
//
// Micro-compétences couvertes (les 5 de la banque) :
// - relatif_addition        → définition, figure, propriétés « mêmes signes » /
//                             « signes différents », exemples 1 et 2 (dessinés),
//                             entraînements 1 et 2
// - relatif_soustraction    → propriété « Soustraire, c'est ajouter l'opposé »,
//                             formule, exemple 3 (dessiné), entraînement 3
// - relatif_calcul          → méthode (les 3 réflexes), exemple 4 (dessiné),
//                             entraînement 4
// - relatif_probleme        → reel, usages, exemple 5 « le plongeur » (dessiné),
//                             entraînement 5
// - relatif_operation_defi  → pièges, défi dessiné + entraînement 6
//
// Les nombres sont CEUX DE LA BANQUE, sans exception : −4 + (−3), 7 + (−10),
// 4 − (−3), −2 + 5 − 3, le plongeur à −6 m, « quel calcul donne 4 ? ». L'élève
// qui a lu la fiche doit retrouver ses propres exemples dans le coach.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// La même droite graduée que dans la fiche des nombres relatifs et que dans les
// exercices du coach. Ici elle sert à MONTRER LE DÉPLACEMENT : on marque le
// départ, les étapes et l'arrivée — ajouter, c'est aller à droite ; enlever,
// c'est aller à gauche.
//
// ⭐ `size: 360 × 90`, ET C'EST L'ÉTALON DU COACH DE SECONDE (Frédéric, 19/08 :
// « coach seconde utilise bien les canvas »). Sa banque reels-intervalles.bank.ts
// définit un helper `droiteGraduee()` en tête de fichier qui impose cette
// taille : PLUS LARGE et DEUX FOIS PLUS PLATE que le défaut du composant
// (320 × 120). Une droite graduée n'a rien à montrer en hauteur — les 120 px du
// défaut sont du vide au-dessus et en dessous du trait, et dans une carte de
// propriété sur trois colonnes, ce vide mange la place des graduations.
function droite(
  points: { value: number; label: string; color?: string }[],
  min: number,
  max: number,
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
        size: { width: 360, height: 90 },
      }}
    />
  );
}

// Mêmes couleurs que la fiche sœur : bleu = le départ, rouge = une étape ou une
// baisse, vert = le résultat.
const BLEU = "#2563eb";
const ROUGE = "#dc2626";
const VERT = "#16a34a";

// ⭐ LA BARRE, POUR CE QUE LA DROITE NE MONTRE PAS (19/08, Frédéric : « mets-toi
// à la place de l'élève »).
//
// Première version : les quatre propriétés portaient la MÊME droite graduée avec
// deux pastilles. Vu par un élève de 5e, ce sont quatre règles identiques où
// rien ne bouge — le canvas `number_line` dessine des points, pas des sauts,
// donc le déplacement dont parle le texte n'apparaît nulle part.
//
// Les distances à 0, elles, sont des LONGUEURS : deux longueurs qu'on met bout
// à bout (mêmes signes) ou l'une dans l'autre (signes différents). C'est
// exactement ce que dessine `schema_barre`, et c'est la seule façon de voir
// « j'additionne les distances » ou « je soustrais les distances » au lieu de
// le lire.
//
// D'où la répartition : la BARRE pour les deux règles de calcul, la DROITE pour
// les deux règles de position (le déplacement, la symétrie autour de 0). Chaque
// propriété a le dessin qui montre SA règle, et deux propriétés voisines n'ont
// plus la même image.
function barre(
  total: string,
  parts: { label: string; value?: string; unknown?: boolean; color?: string }[],
  questionLabel: string,
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "schema_barre",
        total,
        parts,
        questionLabel,
        display: {
          showTotal: true,
          showPartLabels: true,
          showValues: true,
          showQuestion: true,
        },
      }}
    />
  );
}

const pieges = [
  "Additionner les distances à 0 quand les signes sont différents : −5 + 2 ne fait pas −7, mais −3.",
  "Oublier que deux signes − qui se suivent font + : 4 − (−3) = 4 + 3 = 7, et non 1.",
  "Changer le signe du résultat au hasard : le résultat garde le signe du nombre le plus loin de 0.",
];

const aRetenir = [
  "Mêmes signes : j'additionne les distances à 0 et je garde le signe.",
  "Signes différents : je soustrais les distances à 0 et je garde le signe du plus loin de 0.",
  "Soustraire un nombre, c'est ajouter son opposé : a − (−b) = a + b.",
];

export const ficheOperationsRelatifs5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "relatif-operation",
  titre: "Les opérations sur les nombres relatifs",
  accroche:
    "Additionner ou soustraire des relatifs, c'est se déplacer sur la droite graduée : ajouter fait avancer vers la droite, enlever fait reculer vers la gauche.",
  identite: [
    { label: "Mots clés", valeur: "Signe, distance à 0, opposé, somme, différence" },
    { label: "Le secret", valeur: "Regarder les signes AVANT de calculer" },
    { label: "Outil", valeur: "La droite graduée (0 au centre)" },
  ],
  definition: {
    texte:
      "Additionner un nombre relatif, c'est se déplacer sur la droite graduée : vers la droite si on ajoute un positif, vers la gauche si on ajoute un négatif. Soustraire un nombre, c'est ajouter son opposé — donc se déplacer dans l'autre sens.",
  },
  figure: {
    schema: droite(
      [
        { value: -5, label: "départ −5", color: BLEU },
        { value: -3, label: "arrivée −3", color: VERT },
      ],
      -7,
      3,
    ),
    legende: "−5 + 2 : je pars de −5 et j'avance de 2 vers la droite. J'arrive à −3.",
  },
  // ⭐ CHAQUE PROPRIÉTÉ A SON DESSIN (Frédéric, 19/08 : « inclure sur chaque
  // définition et propriété un graphique ou schéma »). Les propriétés étaient
  // le seul bloc du cours sans visuel — trois pavés de texte côte à côte, donc
  // le bloc qu'on survole.
  // ⚠️ Les nombres sont ceux des exemples, exprès : la propriété annonce,
  // l'exemple développe, et l'élève voit deux fois la même droite. Une règle
  // illustrée par un nombre qu'on ne recroise jamais ne s'accroche à rien.
  // L'ancrage est celui de leur âge (score, vies, manches) — un élève de 5e
  // compte des points bien avant de compter des euros.
  proprietes: [
    {
      titre: "Mêmes signes",
      texte:
        "Deux pertes s'ajoutent : tu perds 4 points, puis encore 3, tu es à −7. J'additionne les distances à 0 et je garde le signe.",
      schema: barre(
        "7",
        [
          { label: "1re perte", value: "4", color: ROUGE },
          { label: "2e perte", value: "3", color: ROUGE },
        ],
        "Les deux distances à 0 se mettent bout à bout : 4 + 3 = 7. Signe − devant : −7.",
      ),
    },
    {
      titre: "Signes différents",
      texte:
        "Tu marques 7 points puis tu en perds 10 : tu tombes à −3. Je soustrais les distances à 0 et je garde le signe du plus loin de 0.",
      schema: barre(
        "10",
        [
          { label: "annulé par les 7 points", value: "7", color: BLEU },
          { label: "ce qui reste en moins", value: "3", color: ROUGE },
        ],
        "La perte de 10 est la plus longue : 7 s'annulent, il reste 3 en moins. Résultat : −3.",
      ),
    },
    {
      titre: "Soustraire, c'est ajouter l'opposé",
      texte:
        "On t'enlève un malus de 3 points : ton score monte. 4 − (−3) = 4 + 3 = 7. Deux signes − qui se suivent font +.",
      schema: droite(
        [
          { value: 4, label: "score 4", color: BLEU },
          { value: 7, label: "score 7", color: VERT },
        ],
        -1,
        9,
      ),
    },
    {
      titre: "Un nombre et son opposé",
      texte:
        "Tu perds 6 vies puis tu en regagnes 6 : te voilà revenu au départ. −6 + 6 = 0, et a + 0 = a.",
      schema: droite(
        [
          { value: -6, label: "−6", color: ROUGE },
          { value: 0, label: "retour à 0", color: VERT },
          { value: 6, label: "+6", color: BLEU },
        ],
        -8,
        8,
      ),
    },
  ],
  reel: {
    texte:
      "On calcule avec des relatifs dès qu'il y a un dessus et un dessous : la température qui baisse la nuit au Piton des Neiges, un plongeur qui remonte puis redescend le long du tombant, un solde bancaire à découvert, des points perdus puis gagnés dans un jeu.",
  },
  historique: {
    texte:
      "En Chine, il y a plus de 2 000 ans, on calculait déjà avec des bâtonnets rouges pour les dettes et noirs pour les avoirs. En Inde, vers 628, Brahmagupta écrit le premier les règles de signes : « une dette retranchée d'une dette devient un avoir ». En Europe, on s'en méfiera encore mille ans — on les appelait des « nombres absurdes ».",
  },
  formule: {
    contexte: "Enlever un nombre relatif",
    expression: "a − (−b) = a + b",
    legende:
      "Soustraire un nombre, c'est ajouter son opposé. Les deux signes − qui se suivent deviennent un +.",
    schema: droite(
      [
        { value: 4, label: "départ 4", color: BLEU },
        { value: 7, label: "arrivée 7", color: VERT },
      ],
      -1,
      9,
    ),
  },
  methode: [
    {
      titre: "Je transforme",
      texte: "J'enlève les parenthèses : − (−3) devient + 3, + (−3) devient − 3.",
    },
    {
      titre: "Je regarde les signes",
      texte: "Mêmes signes : j'additionne les distances. Signes différents : je les soustrais.",
    },
    {
      titre: "Je vérifie sur la droite",
      texte: "Je pars du premier nombre et je me déplace : le résultat doit tomber du bon côté de 0.",
    },
  ],
  usages: [
    {
      titre: "Une baisse → j'ajoute un négatif",
      detail: "« Il fait −2 °C et la température perd 3 °C » : −2 + (−3) = −5 °C.",
    },
    {
      titre: "Une hausse → j'ajoute un positif",
      detail: "« Le compte est à −8 € et on verse 5 € » : −8 + 5 = −3 €.",
    },
    {
      titre: "Un écart → je soustrais",
      detail: "« De combien remonte-t-on de −6 m à −1 m ? » : −1 − (−6) = −1 + 6 = 5 m.",
    },
  ],
  exemples: [
    {
      titre: "Deux nombres de même signe",
      donnees: "−4 + (−3).",
      question: "Combien font −4 + (−3) ?",
      schema: droite(
        [
          { value: -4, label: "départ −4", color: BLEU },
          { value: -7, label: "arrivée −7", color: VERT },
        ],
        -9,
        1,
      ),
      solution:
        "Les deux sont négatifs : j'additionne les distances à 0 (4 + 3 = 7) et je garde le signe −. Résultat : −7. Sur la droite, je pars de −4 et je recule encore de 3.",
    },
    {
      titre: "Deux nombres de signes différents",
      donnees: "7 + (−10).",
      question: "Combien font 7 + (−10) ?",
      schema: droite(
        [
          { value: 7, label: "départ 7", color: BLEU },
          { value: -3, label: "arrivée −3", color: VERT },
        ],
        -5,
        9,
      ),
      solution:
        "Les signes sont différents : je soustrais les distances à 0 (10 − 7 = 3). Le plus loin de 0 est −10, donc le résultat est négatif. Résultat : −3.",
    },
    {
      titre: "Enlever un nombre négatif",
      donnees: "4 − (−3).",
      question: "Combien font 4 − (−3) ?",
      schema: droite(
        [
          { value: 4, label: "départ 4", color: BLEU },
          { value: 7, label: "arrivée 7", color: VERT },
        ],
        -1,
        9,
      ),
      solution:
        "Soustraire −3, c'est ajouter son opposé : 4 − (−3) = 4 + 3 = 7. Enlever une dette, c'est gagner de l'argent.",
    },
    {
      titre: "Un calcul à plusieurs étapes",
      donnees: "−2 + 5 − 3.",
      question: "Combien font −2 + 5 − 3 ?",
      schema: droite(
        [
          { value: -2, label: "départ −2", color: BLEU },
          { value: 3, label: "étape +3", color: ROUGE },
          { value: 0, label: "arrivée 0", color: VERT },
        ],
        -4,
        6,
      ),
      solution:
        "Je calcule de gauche à droite. −2 + 5 = 3, puis 3 − 3 = 0. Résultat : 0. Sur la droite : j'avance de 5, puis je recule de 3, et je retombe sur 0.",
    },
    {
      titre: "Un problème (le plongeur)",
      donnees: "À La Réunion, un plongeur est à −6 m. Il remonte de 2 m, puis redescend de 5 m.",
      question: "À quelle profondeur se trouve-t-il ?",
      schema: droite(
        [
          { value: -6, label: "départ −6", color: BLEU },
          { value: -4, label: "remonte −4", color: ROUGE },
          { value: -9, label: "arrivée −9", color: VERT },
        ],
        -11,
        1,
      ),
      solution:
        "Remonter, c'est ajouter ; redescendre, c'est soustraire : −6 + 2 − 5. D'abord −6 + 2 = −4, puis −4 − 5 = −9. Il est à −9 m, donc à 9 mètres sous la surface.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Calcule : −4 + (−3).",
      correction:
        "Mêmes signes : 4 + 3 = 7, et je garde le signe −. Résultat : −7.",
    },
    {
      question: "Calcule : −5 + 2.",
      correction:
        "Signes différents : 5 − 2 = 3. Le plus loin de 0 est −5, donc le résultat est négatif. Résultat : −3.",
    },
    {
      question: "Calcule : −5 − (−2).",
      correction:
        "Soustraire −2, c'est ajouter 2 : −5 + 2 = −3. Résultat : −3.",
    },
    {
      question: "Calcule : −4 − 3 + 10.",
      correction:
        "De gauche à droite : −4 − 3 = −7, puis −7 + 10 = 3. Résultat : 3.",
    },
    {
      question:
        "Le matin, la température est de −2 °C. Elle baisse encore de 3 °C pendant la nuit. Quelle est la nouvelle température ?",
      correction:
        "Baisser, c'est ajouter un négatif : −2 + (−3) = −5. La température est de −5 °C.",
    },
    {
      question: "Le défi : trouve un calcul avec deux relatifs dont le résultat est 4.",
      correction:
        "Par exemple −2 − (−6) : soustraire −6, c'est ajouter 6, donc −2 + 6 = 4. Sur la droite, je pars de −2 et j'avance de 6.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

export const slidesOperationsRelatifs5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Opérations sur les relatifs - 5e",
    section: {
      type: "objectif",
      phrase: "Calculer sans se tromper de signe",
      sousPhrase:
        "Ajouter, c'est avancer vers la droite. Enlever, c'est reculer vers la gauche. Tout se lit sur la droite graduée.",
      encadre: {
        titre: "L'idée",
        texte: "On regarde les SIGNES d'abord, on calcule les distances ensuite.",
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
          "La température qui baisse la nuit au Piton des Neiges, un plongeur qui remonte puis redescend, un compte à découvert, des points perdus puis gagnés.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Vers 628, en Inde, Brahmagupta écrit le premier les règles de signes : « une dette retranchée d'une dette devient un avoir ».",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheOperationsRelatifs5e.methode.map((m) => ({
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
      cartes: ficheOperationsRelatifs5e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Signes différents",
    section: {
      type: "exemple",
      enonce: "On part de 7 et on ajoute −10.",
      question: "Calculer 7 + (−10).",
      correction:
        "Signes différents : 10 − 7 = 3. Le plus loin de 0 est −10, donc le résultat est négatif. Résultat : −3.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Enlever un négatif",
    section: {
      type: "exemple",
      enonce: "On enlève −3 au nombre 4.",
      question: "Calculer 4 − (−3).",
      correction:
        "Soustraire −3, c'est ajouter son opposé : 4 + 3 = 7. Enlever une dette, c'est gagner de l'argent.",
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
      enonce: "Un plongeur est à −6 m. Il remonte de 2 m, puis redescend de 5 m.",
      question: "À quelle profondeur se trouve-t-il ?",
      indice: "Remonter, c'est ajouter ; redescendre, c'est soustraire.",
      correction:
        "−6 + 2 = −4, puis −4 − 5 = −9. Il est à −9 m, soit 9 mètres sous la surface.",
    },
  },
];
