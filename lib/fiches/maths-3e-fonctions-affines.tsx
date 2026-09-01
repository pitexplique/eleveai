// ─── Fiche de cours : fonctions affines (3e) ───────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/affine.bank.ts, notionId affine_fonction).
//
// ⭐⭐ LA PREMIÈRE FICHE DE 3e DU SITE. La classe avait 22 notions, 140 micros,
// 1312 items — et ZÉRO fiche. Un élève de 3e qui cliquait sur une notion
// n'avait aucun cours à lire, en classe d'examen.
//
// ⭐ LA CONTINUITÉ VERTICALE EST LE FIL DE CETTE FICHE, et elle est mesurable :
//   4e  `fonction_dependance` — la dépendance entre deux grandeurs, SANS le
//       mot « fonction » formalisé, sans f(x), sans linéaire ni affine. Les
//       repères annuels l'interdisent explicitement en 4e.
//   3e  `affine_fonction` — tout arrive d'un coup : la notation, le
//       vocabulaire, le coefficient directeur, la droite.
// 👉 La fiche le dit dès l'accroche : ce que l'élève appelait « le prix du
// taxi » en 4e s'appelle maintenant $f(x) = 2x + 4$, et c'est le même objet.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE. Tous les nombres
// de la fiche sortent de la banque :
//   affine_reconnaitre      → affine, linéaire, ou ni l'un ni l'autre
//   affine_coeff_directeur  → le a de ax + b, et ce qu'il fait à la droite
//   affine_ordonnee_origine → le b, et pourquoi c'est l'image de 0
//   affine_calcul_image     → f(4) pour f(x) = 2x + 3
//   affine_expression       → retrouver a et b à partir de deux points
//   affine_graphique        → lire l'ordonnée à l'origine, lire une image
//   affine_probleme         → le taxi de Saint-Pierre, le loueur de paddle
//   affine_defi             → deux tarifs, et le point de bascule
//
// ⭐⭐ `fonctionGraphique` EST EMPLOYÉ ICI, ET IL A FALLU CORRIGER LE CANVAS
// POUR CELA. Ses graduations d'axes étaient écrites en `fontSize="10"`, sous
// le plancher de 11 px mesuré à 375 px — et comme son `viewBox` vaut son champ
// `size`, réduire la largeur ne les agrandissait pas. Le défaut était DANS le
// canvas.
// ⛔ La tentation était de l'éviter, comme la fiche de 4e l'avait fait. Mais
// une fiche de fonctions affines sans droite n'a aucun sens : toute la notion
// dit que le graphique EST une droite. Frédéric a tranché — « les graduations
// sont en 10 px, il faut les utiliser ». On monte donc la police, exactement
// comme pour `solide_3d` le 24/08.
// ⚠️ Et il a fallu un PAS ADAPTATIF avec : ce canvas étiquette chaque entier,
// donc monter la police seule aurait fait chevaucher les grandes plages. Voir
// le commentaire dans `FonctionGraphiqueCanvas.tsx`.
//
// ⭐ `fonction_tableau` reste employé pour les deux SENS DE LECTURE : son champ
// `missing` dit si l'on cherche l'image ou l'antécédent, ce qu'aucun graphique
// ne montre aussi nettement.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut donc porter du LaTeX. Les
 * libellés À L'INTÉRIEUR du dessin restent en écriture simple — ils sont
 * tracés en <text> SVG, où le LaTeX s'afficherait en clair.
 */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// ⚠️ LES LARGEURS SONT CELLES MESURÉES SUR TÉLÉPHONE DE 375 px : 222 px pour
// une carte de propriété, 216 px pour « La formule », 200 px pour un exemple.
const tableau = (
  data: Record<string, unknown>,
  bloc: "carte" | "exemple" | "formule" = "carte"
) => (
  <CanvasRenderer
    figure={
      {
        kind: "tableau_donnees",
        display: { compact: true, striped: true },
        size: {
          width: bloc === "exemple" ? 200 : bloc === "formule" ? 216 : 222,
        },
        ...data,
      } as never
    }
  />
);

/**
 * La droite d'une fonction affine.
 * ⚠️ Les plages restent COURTES — de −4 à 6 environ. Le canvas étiquette un
 * entier sur `pas`, et une plage large forcerait le pas à 2 ou 3, ce qui rend
 * la lecture d'une image moins immédiate dans une carte de 222 px.
 */
const graphe = (
  data: Record<string, unknown>,
  bloc: "carte" | "exemple" = "carte"
) => (
  <CanvasRenderer
    figure={
      {
        kind: "fonctionGraphique",
        grille: true,
        size: {
          width: bloc === "exemple" ? 200 : 222,
          height: bloc === "exemple" ? 180 : 200,
        },
        ...data,
      } as never
    }
  />
);

/**
 * Le tableau de valeurs d'une fonction, avec son trou.
 * ⭐ Son champ `missing` dit lequel des deux gestes on demande : trouver
 * l'image, ou remonter à l'antécédent.
 */
const tableauValeurs = (
  xValues: number[],
  yValues: number[],
  missing: { type: "image" | "antecedent"; index: number } | undefined,
  consigne: string,
  bloc: "carte" | "exemple" = "carte"
) => (
  <CanvasRenderer
    figure={{
      kind: "fonction_tableau",
      xValues,
      yValues,
      missing,
      consigne,
      size: { width: bloc === "exemple" ? 200 : 222, height: 150 },
    }}
  />
);

export const ficheFonctionsAffines3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "affine-fonction",
  titre: "Fonctions affines",
  accroche:
    "En quatrième, on disait « le prix dépend de la distance ». En troisième, on l'écrit : $f(x) = 2x + 4$. C'est le même taxi, la même prise en charge, le même prix au kilomètre — mais l'écriture permet enfin de calculer n'importe quel trajet sans refaire le raisonnement, et de tracer une droite qui répond d'un coup d'œil.",
  identite: [
    { label: "La forme", valeur: "$f(x) = ax + b$ — le $a$ multiplie, le $b$ s'ajoute" },
    { label: "Ce que fait chaque nombre", valeur: "$a$ incline la droite · $b$ dit où elle coupe l'axe vertical" },
    { label: "Le piège", valeur: "Toute fonction linéaire est affine ; l'inverse est faux" },
  ],
  definition: {
    texte:
      "Une fonction AFFINE s'écrit $f(x) = ax + b$, où $a$ et $b$ sont deux nombres fixés. Sa représentation graphique est une DROITE — toujours. Quand $b = 0$, on écrit $f(x) = ax$ et la fonction est dite LINÉAIRE : sa droite passe par l'origine. ⚠️ Une fonction linéaire est donc un cas PARTICULIER de fonction affine, exactement comme un carré est un rectangle particulier. L'inclusion ne marche que dans un sens.",
  },
  figure: {
    schema: legende(
      tableauValeurs(
        [0, 1, 2, 3, 4],
        [4, 6, 8, 10, 12],
        { type: "image", index: 3 },
        "que vaut f(3) pour f(x) = 2x + 4 ?"
      ),
      "de colonne en colonne, on ajoute toujours $2$ : c'est le coefficient directeur",
    ),
    legende:
      "Le tableau montre ce que la formule cache : d'une colonne à la suivante, la valeur augmente TOUJOURS de la même quantité. Cette augmentation constante est le coefficient directeur $a$ — et c'est elle qui fait que le graphique est une droite, et non une courbe.",
  },
  proprietes: [
    {
      titre: "Affine, linéaire, ou ni l'un ni l'autre",
      micros: ["affine_reconnaitre"],
      texte:
        "Une fonction est AFFINE si son écriture est de la forme $ax + b$ — un $x$ à la puissance un, rien d'autre. Elle est LINÉAIRE si en plus $b = 0$. ⚠️ $f(x) = x^2$ n'est ni l'une ni l'autre : le carré casse tout, et son graphique n'est plus une droite.",
      schema: tableau({
        headers: ["expression", "elle est"],
        rows: [
          { values: ["3x + 5", "affine"] },
          { values: ["4x", "linéaire (donc affine)"] },
          { values: ["7", "affine (a = 0)"] },
          { values: ["x²  + 1", "ni l'une ni l'autre"] },
        ],
        highlight: { row: 3 },
        caption: "le carré casse tout",
      }),
    },
    {
      titre: "Le coefficient directeur incline la droite",
      micros: ["affine_coeff_directeur"],
      texte:
        "Dans $f(x) = ax + b$, le nombre $a$ est le COEFFICIENT DIRECTEUR. Il dit de combien on monte quand on avance de 1. Positif, la droite monte ; négatif, elle descend ; nul, elle est horizontale. ⭐ Plus $a$ est grand en valeur absolue, plus la droite est raide.",
      schema: legende(
        graphe({
          xmin: -2,
          xmax: 4,
          ymin: -3,
          ymax: 6,
          courbes: [
            { id: "raide", type: "affine", a: 2, b: 1, couleur: "#2563eb" },
            { id: "douce", type: "affine", a: -1, b: 2, couleur: "#ef4444" },
          ],
        }),
        "en bleu $a = 2$ : elle monte · en rouge $a = -1$ : elle descend",
      ),
    },
    {
      titre: "L'ordonnée à l'origine est l'image de 0",
      micros: ["affine_ordonnee_origine"],
      texte:
        "Dans $f(x) = ax + b$, le nombre $b$ est l'ORDONNÉE À L'ORIGINE : c'est là que la droite coupe l'axe vertical. ⭐ Et ce n'est pas une définition à part — c'est simplement $f(0)$, puisque $a \\times 0 + b = b$. Le mot compliqué désigne le calcul le plus simple de la fiche.",
      schema: tableau({
        headers: ["fonction", "f(0)", "coupe l'axe en"],
        rows: [
          { values: ["3x + 5", "5", "5"] },
          { values: ["−2x − 4", "−4", "−4"] },
          { values: ["4x", "0", "l'origine"] },
        ],
        highlight: { row: 2 },
        caption: "linéaire : elle passe par l'origine",
      }),
    },
    {
      titre: "Calculer une image : on remplace, on calcule",
      micros: ["affine_calcul_image"],
      texte:
        "Pour trouver $f(4)$ quand $f(x) = 2x + 3$, on remplace $x$ par 4 partout, puis on calcule : $2 \\times 4 + 3 = 11$. ⚠️ L'ordre des opérations compte — on multiplie AVANT d'ajouter. Écrire $(2 + 3) \\times 4$ donnerait 20, et ce serait une autre fonction.",
      schema: tableau({
        headers: ["étape", "calcul"],
        rows: [
          { values: ["on remplace", "2 × 4 + 3"] },
          { values: ["on multiplie", "8 + 3"] },
          { values: ["on ajoute", "11"] },
        ],
        highlight: { row: 2 },
        caption: "multiplier d'abord, ajouter ensuite",
      }),
    },
    {
      titre: "Deux points suffisent à tout retrouver",
      micros: ["affine_expression"],
      texte:
        "Si l'on connaît deux valeurs, on retrouve $a$ et $b$. Le coefficient directeur est l'écart des images divisé par l'écart des antécédents. Puis $b$ se déduit en remplaçant dans l'une des deux. ⭐ C'est ce qui rend une fonction affine si commode : deux mesures, et toute la droite est connue.",
      schema: tableau({
        headers: ["on sait", "on trouve"],
        rows: [
          { values: ["f(0) = 4", "b = 4"] },
          { values: ["f(3) = 10", "a = (10−4)÷3 = 2"] },
          { values: ["donc", "f(x) = 2x + 4"] },
        ],
        highlight: { row: 2 },
        caption: "deux points, une droite",
      }),
    },
    {
      titre: "Sur un graphique, tout se lit",
      micros: ["affine_graphique"],
      texte:
        "L'ordonnée à l'origine se lit là où la droite coupe l'axe vertical. Le coefficient directeur se lit en avançant de 1 vers la droite et en regardant de combien on monte. ⚠️ Pour trouver une image, on part de l'axe horizontal, on MONTE jusqu'à la droite, puis on lit à gauche. Le trajet inverse donne l'antécédent.",
      schema: legende(
        graphe({
          xmin: -1,
          xmax: 5,
          ymin: -1,
          ymax: 8,
          courbes: [{ id: "d", type: "affine", a: 1, b: 2, couleur: "#2563eb" }],
          misesEnEvidence: [
            { verticale: { x: 3, couleur: "#7c3aed" }, horizontale: { y: 5, couleur: "#7c3aed" } },
          ],
        }),
        "on part de $3$, on MONTE jusqu'à la droite, on lit $5$ à gauche",
      ),
    },
    {
      titre: "Une part fixe et une part variable",
      micros: ["affine_probleme"],
      texte:
        "Dès qu'une situation a un montant de départ ET un montant par unité, elle est affine. Un taxi à Saint-Pierre : 4 € de prise en charge, puis 2 € par kilomètre. La prise en charge est le $b$, le prix au kilomètre est le $a$. ⭐ Reconnaître ces deux parts dans un énoncé, c'est déjà avoir écrit la fonction.",
      schema: tableau({
        headers: ["dans l'énoncé", "dans la fonction"],
        rows: [
          { values: ["prise en charge : 4 €", "b = 4"] },
          { values: ["2 € par kilomètre", "a = 2"] },
          { values: ["donc", "f(x) = 2x + 4"] },
        ],
        highlight: { row: 2 },
        caption: "le fixe et le variable",
      }),
    },
  ],
  reel: {
    texte:
      "Toute offre à part fixe et part variable est une fonction affine, et il y en a partout : un abonnement téléphonique, une salle d'escalade qui demande une inscription puis un prix par séance, un taxi, une facture d'électricité avec son abonnement et ses kilowattheures. La question utile n'est jamais « quelle offre est la moins chère » — elle n'a pas de réponse en soi — mais « à partir de combien cette offre devient-elle la meilleure ». C'est exactement ce que donne le point où deux droites se croisent, et c'est un raisonnement qu'un adulte refait toute sa vie devant deux contrats. À La Réunion, le même calcul décide entre une location de paddle à l'heure et un forfait à la journée, ou entre deux formules de transport pour se rendre au travail. Les fonctions affines servent aussi à prévoir : quand une grandeur augmente d'une quantité constante — une plante qui pousse de 2 cm par semaine, un réservoir qui se remplit de 5 litres par minute —, la droite permet de lire la valeur à n'importe quel moment sans tout recalculer.",
  },
  historique: {
    texte:
      "L'idée qu'une relation entre deux grandeurs puisse s'écrire comme une équation est de Descartes, en 1637 : c'est lui qui relie une COURBE et une FORMULE, et fait de la géométrie et du calcul deux langues pour dire la même chose. Mais la notation $f(x)$, elle, est d'Euler, en 1734 — près d'un siècle plus tard. Avant lui, on décrivait les fonctions par des phrases ou par des tableaux, ce qui rendait tout calcul général presque impossible à écrire. Le mot « affine » vient du latin *affinis*, « voisin, apparenté » : une transformation affine préserve l'alignement et les rapports de longueurs, elle « garde la parenté » entre les points. C'est aussi pour cela que le graphique reste une droite — une fonction affine ne courbe rien, elle se contente d'incliner et de décaler. Ce vocabulaire, formalisé au dix-neuvième siècle, décrit donc exactement ce que l'œil voit sur le dessin.",
  },
  formule: {
    contexte: "Une fonction affine",
    expression: "$f(x) = ax + b$",
    legende:
      "Deux nombres suffisent à tout dire. Le $a$ incline la droite — il donne de combien on monte quand on avance de 1. Le $b$ la décale verticalement — c'est l'image de 0, donc le point où elle coupe l'axe vertical. Changer l'un ou l'autre change la droite, et rien d'autre ne la change.",
    schema: tableau(
      {
        headers: ["le nombre", "ce qu'il fait"],
        rows: [
          { values: ["a", "l'inclinaison"] },
          { values: ["b", "la hauteur au départ"] },
          { values: ["b = 0", "linéaire : passe par l'origine"] },
        ],
        highlight: { row: 2 },
        caption: "deux nombres, une droite",
      },
      "formule"
    ),
  },
  methode: [
    {
      titre: "Reconnaître une fonction affine",
      micros: ["affine_reconnaitre"],
      texte:
        "On regarde l'écriture : un $x$ tout seul, multiplié par un nombre, plus un nombre. Pas de $x^2$, pas de $x$ au dénominateur, pas de racine. ⭐ Si $b = 0$, elle est linéaire — donc affine aussi.",
      schema: tableau({
        headers: ["on voit", "verdict"],
        rows: [
          { values: ["ax + b", "affine"] },
          { values: ["ax", "linéaire, donc affine"] },
          { values: ["x² ou 1/x", "ni l'une ni l'autre"] },
        ],
        caption: "le x doit être seul",
      }),
    },
    {
      titre: "Calculer une image",
      micros: ["affine_calcul_image"],
      texte:
        "On remplace $x$ par la valeur donnée, PARTOUT où il apparaît, puis on calcule en respectant les priorités : la multiplication avant l'addition.",
      schema: tableauValeurs(
        [0, 1, 2, 3, 4],
        [3, 5, 7, 9, 11],
        { type: "image", index: 4 },
        "que vaut f(4) pour f(x) = 2x + 3 ?"
      ),
    },
    {
      titre: "Retrouver l'expression",
      micros: ["affine_expression"],
      texte:
        "Le coefficient directeur est l'écart des images divisé par l'écart des antécédents. Une fois $a$ connu, on remplace dans l'une des deux égalités pour trouver $b$. ⭐ Contrôle final : la formule trouvée doit redonner LES DEUX points, pas seulement celui qui a servi.",
      schema: tableau({
        headers: ["étape", "ce qu'on fait"],
        rows: [
          { values: ["1", "a = écart des images ÷ écart des x"] },
          { values: ["2", "on remplace pour trouver b"] },
          { values: ["3", "on vérifie sur les DEUX points"] },
        ],
        highlight: { row: 2 },
        caption: "vérifier sur les deux, pas un",
      }),
    },
    {
      titre: "Remonter à l'antécédent",
      micros: ["affine_calcul_image", "affine_graphique"],
      texte:
        "On connaît $f(x)$ et on cherche $x$ : on défait les opérations dans l'ordre INVERSE. On retire d'abord $b$, puis on divise par $a$. ⚠️ Diviser directement par $a$ sans retirer $b$ est l'erreur la plus fréquente.",
      schema: tableauValeurs(
        [0, 1, 2, 3, 4],
        [3, 5, 7, 9, 11],
        { type: "antecedent", index: 3 },
        "de quel nombre vient 9 ?"
      ),
    },
    {
      titre: "Comparer deux offres",
      micros: ["affine_probleme", "affine_defi"],
      texte:
        "On écrit les deux fonctions, on calcule pour la valeur demandée, on compare. Pour trouver le point de BASCULE, on cherche quand les deux donnent le même résultat. ⭐ Il n'y a pas de meilleure offre en soi : la réponse dépend du nombre, et c'est tout l'intérêt du chapitre.",
      schema: tableau({
        headers: ["heures", "A : 3x+8", "B : 5x"],
        rows: [
          { values: ["2", "14 €", "10 €"] },
          { values: ["4", "20 €", "20 €"] },
          { values: ["6", "26 €", "30 €"] },
        ],
        highlight: { row: 1 },
        caption: "à 4 h, les deux se valent",
      }),
    },
  ],
  usages: [
    {
      titre: "On me donne l'expression et une valeur",
      micros: ["affine_calcul_image"],
      detail:
        "Je remplace et je calcule, en multipliant avant d'ajouter. C'est le sens direct.",
    },
    {
      titre: "On me donne le résultat et je cherche le départ",
      micros: ["affine_calcul_image"],
      detail:
        "Je défais à l'envers : je retire d'abord $b$, puis je divise par $a$.",
    },
    {
      titre: "On me donne deux points ou un graphique",
      micros: ["affine_expression", "affine_graphique"],
      detail:
        "Le coefficient directeur vient de l'écart des images sur l'écart des $x$ ; l'ordonnée à l'origine se lit sur l'axe vertical.",
    },
    {
      titre: "On me décrit une situation",
      micros: ["affine_probleme", "affine_defi"],
      detail:
        "Je cherche la part FIXE, qui donne $b$, et la part PAR UNITÉ, qui donne $a$. La fonction est écrite.",
    },
  ],
  exemples: [
    {
      titre: "Le taxi de Saint-Pierre",
      micros: ["affine_probleme", "affine_calcul_image"],
      donnees: "Un taxi facture 4 € de prise en charge, puis 2 € par kilomètre.",
      question: "Écrire la fonction, puis calculer le prix d'un trajet de 7 km.",
      schema: tableau(
        {
          headers: ["distance", "prix"],
          rows: [
            { values: ["0 km", "4 €"] },
            { values: ["7 km", "18 €"] },
          ],
          highlight: { row: 0 },
        },
        "exemple"
      ),
      solution:
        "La prise en charge est le montant FIXE : c'est $b = 4$. Le prix au kilomètre est le montant PAR UNITÉ : c'est $a = 2$.\n\nDonc $f(x) = 2x + 4$, où $x$ est la distance en kilomètres.\n\nPour 7 km : $f(7) = 2 \\times 7 + 4 = 14 + 4 = 18$ €.\n\n⭐ Le contrôle tient en une ligne : pour 0 km, $f(0) = 4$ € — c'est bien la prise en charge, payée avant même de rouler. Si la formule ne redonne pas le montant fixe pour $x = 0$, c'est qu'on a mélangé $a$ et $b$.",
    },
    {
      titre: "Retrouver la fonction à partir de deux points",
      micros: ["affine_expression"],
      donnees: "Une fonction affine vérifie $f(0) = 4$ et $f(3) = 10$.",
      question: "Quelle est son expression ?",
      schema: tableau(
        {
          headers: ["on sait", "on en tire"],
          rows: [
            { values: ["f(0) = 4", "b = 4"] },
            { values: ["f(3) = 10", "a = 2"] },
          ],
          highlight: { row: 1 },
        },
        "exemple"
      ),
      solution:
        "L'ordonnée à l'origine est immédiate : $f(0) = b$, donc $b = 4$.\n\nPour le coefficient directeur, on divise l'écart des images par l'écart des antécédents : $a = \\dfrac{10 - 4}{3 - 0} = \\dfrac{6}{3} = 2$.\n\nDonc $f(x) = 2x + 4$.\n\n⭐ Contrôle sur LES DEUX points, pas un seul : $f(0) = 2 \\times 0 + 4 = 4$ ✓ et $f(3) = 2 \\times 3 + 4 = 10$ ✓. Vérifier sur le point qui a servi au calcul ne prouve rien — c'est l'autre qui valide.",
    },
    {
      titre: "Deux loueurs, un point de bascule",
      micros: ["affine_defi", "affine_probleme"],
      donnees: "Tarif A : $f(x) = 3x + 8$. Tarif B : $g(x) = 5x$.",
      question: "À partir de combien d'heures le tarif A devient-il plus intéressant ?",
      schema: tableau(
        {
          headers: ["heures", "A", "B"],
          rows: [
            { values: ["2", "14 €", "10 €"] },
            { values: ["4", "20 €", "20 €"] },
            { values: ["6", "26 €", "30 €"] },
          ],
          highlight: { row: 1 },
        },
        "exemple"
      ),
      solution:
        "On cherche quand les deux coûtent pareil : $3x + 8 = 5x$, donc $8 = 2x$, donc $x = 4$.\n\nÀ 4 heures, les deux tarifs donnent 20 € : c'est le point de bascule.\n\nAvant 4 heures, B est moins cher — il n'a pas de frais de départ. Après 4 heures, A devient plus intéressant, parce qu'il augmente moins vite : 3 € par heure contre 5 €.\n\n⭐ C'est le coefficient directeur qui décide à long terme, et l'ordonnée à l'origine qui décide au début. Une offre avec un abonnement finit toujours par gagner si son prix unitaire est plus bas — la seule question est : à partir de quand.",
    },
  ],
  pieges: [
    "Croire qu'une fonction linéaire n'est pas affine. Elle l'est : c'est le cas où $b = 0$.",
    "Prendre $x^2 + 1$ pour une fonction affine. Le carré casse tout, et le graphique n'est plus une droite.",
    "Ajouter avant de multiplier dans $f(x) = 2x + 3$. On calcule $2 \\times x$ d'abord.",
    "Diviser par $a$ sans retirer $b$ pour remonter à l'antécédent. On défait dans l'ordre inverse.",
    "Confondre le coefficient directeur et l'ordonnée à l'origine. Le premier incline, le second décale.",
    "Vérifier une expression trouvée sur le point qui a servi au calcul. C'est l'AUTRE point qui la valide.",
    "Chercher « la meilleure offre » sans dire pour combien. La réponse change avec le nombre.",
  ],
  aRetenir: [
    "Une fonction affine s'écrit $f(x) = ax + b$, et son graphique est TOUJOURS une droite.",
    "Une fonction linéaire est le cas $b = 0$ : elle est affine, et sa droite passe par l'origine.",
    "Le coefficient directeur $a$ dit de combien on monte quand on avance de 1.",
    "L'ordonnée à l'origine $b$ est simplement $f(0)$ — le point où la droite coupe l'axe vertical.",
    "Pour une image : on remplace, puis on multiplie AVANT d'ajouter.",
    "Pour un antécédent : on retire $b$, PUIS on divise par $a$.",
    "Deux points suffisent à retrouver toute la droite — et on vérifie sur les deux.",
    "Une situation à part fixe et part variable est toujours affine : le fixe donne $b$, l'unitaire donne $a$.",
  ],
  entrainement: [
    {
      micros: ["affine_reconnaitre"],
      question: "Parmi $f(x) = 3x + 5$, $g(x) = x^2 - 1$ et $h(x) = 4x$, lesquelles sont affines ?",
      correction:
        "$f$ et $h$. $h$ est même linéaire, donc affine aussi. $g$ ne l'est pas : le carré empêche le graphique d'être une droite.",
    },
    {
      micros: ["affine_coeff_directeur"],
      question: "Quel est le coefficient directeur de $f(x) = -2x + 5$ ?",
      correction:
        "$-2$. Il est négatif, donc la droite DESCEND : quand $x$ augmente de 1, $f(x)$ diminue de 2.",
    },
    {
      micros: ["affine_ordonnee_origine"],
      question: "Quelle est l'ordonnée à l'origine de $f(x) = 3x - 4$ ?",
      correction: "$-4$, car $f(0) = 3 \\times 0 - 4 = -4$. La droite coupe l'axe vertical en $-4$.",
    },
    {
      micros: ["affine_calcul_image"],
      question: "Soit $f(x) = 2x + 3$. Calculer $f(4)$.",
      correction: "$2 \\times 4 = 8$, puis $8 + 3 = 11$. Donc $f(4) = 11$.",
    },
    {
      micros: ["affine_calcul_image"],
      question: "Soit $f(x) = 2x + 3$. Pour quelle valeur de $x$ a-t-on $f(x) = 17$ ?",
      correction:
        "On défait à l'envers : $17 - 3 = 14$, puis $14 \\div 2 = 7$. Donc $x = 7$.",
    },
    {
      micros: ["affine_expression"],
      question: "Une fonction affine a pour coefficient directeur 3 et pour ordonnée à l'origine $-5$. Quelle est son expression ?",
      correction: "$f(x) = 3x - 5$.",
    },
    {
      micros: ["affine_expression"],
      question: "Une fonction affine vérifie $f(1) = 5$ et $f(4) = 14$. Quelle est son expression ?",
      correction:
        "$a = \\dfrac{14 - 5}{4 - 1} = \\dfrac{9}{3} = 3$. Puis $f(1) = 3 \\times 1 + b = 5$, donc $b = 2$. Donc $f(x) = 3x + 2$. Contrôle : $f(4) = 12 + 2 = 14$ ✓.",
    },
    {
      micros: ["affine_graphique"],
      question: "Sur un graphique, comment lit-on l'ordonnée à l'origine d'une fonction affine ?",
      correction:
        "On regarde où la droite coupe l'axe vertical. C'est aussi l'image de 0.",
    },
    {
      micros: ["affine_probleme"],
      question: "Un loueur de paddle facture 10 € de départ puis 2 € par heure. Combien coûtent 4 heures ?",
      correction:
        "$f(x) = 2x + 10$, donc $f(4) = 8 + 10 = 18$ €.",
    },
    {
      micros: ["affine_defi"],
      question: "On donne $f(x) = 3x + 4$ et $g(x) = 5x - 4$. Pour quelle valeur de $x$ a-t-on $f(x) = g(x)$ ?",
      correction:
        "$3x + 4 = 5x - 4$ donne $8 = 2x$, donc $x = 4$. Les deux valent alors 16.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=3e",
};

export const slidesFonctionsAffines3e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Fonctions affines - 3e",
    section: {
      type: "objectif",
      phrase: "Écrire ce qu'on savait déjà décrire",
      sousPhrase:
        "En quatrième, on disait « le prix dépend de la distance ». En troisième, on l'écrit : f de x égale deux x plus quatre. C'est le même taxi.",
      encadre: {
        titre: "La forme",
        texte:
          "Une fonction affine s'écrit a fois x, plus b. Son graphique est toujours une droite.",
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
          "Toute offre à part fixe et part variable est affine : un abonnement, une salle d'escalade, un taxi, une facture d'électricité. Et la vraie question n'est jamais « quelle offre est la moins chère » — elle n'a pas de réponse en soi — mais « à partir de combien celle-ci devient la meilleure ».",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Descartes relie une courbe et une formule en 1637. Mais la notation f de x est d'Euler, près d'un siècle plus tard, en 1734. Avant lui, on décrivait les fonctions par des phrases. Et « affine » vient du latin affinis, « apparenté » : la transformation garde la parenté entre les points — c'est pour cela que le graphique reste une droite.",
      },
    },
  },
  {
    titre: "Ce que font les deux nombres",
    badge: "a et b",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Le a : l'inclinaison",
        contenu:
          "Il dit de combien on monte quand on avance de un. Positif, la droite monte ; négatif, elle descend ; nul, elle est horizontale. Plus il est grand, plus la droite est raide.",
      },
      droite: {
        variante: "info",
        titre: "Le b : la hauteur de départ",
        contenu:
          "C'est là que la droite coupe l'axe vertical. Et ce n'est pas une définition à part : c'est simplement f de zéro, puisque a fois zéro plus b vaut b.",
      },
    },
  },
  {
    titre: "Le piège de l'année",
    badge: "Ce qui coûte des points",
    section: {
      type: "objectif",
      phrase: "Une fonction linéaire EST affine",
      sousPhrase:
        "C'est le cas où b vaut zéro. Sa droite passe alors par l'origine. Exactement comme un carré est un rectangle particulier.",
      encadre: {
        titre: "Et l'inverse est faux",
        texte:
          "Trois x plus cinq est affine sans être linéaire. L'inclusion ne marche que dans un sens.",
      },
    },
  },
  {
    titre: "Les deux sens de lecture",
    badge: "Image et antécédent",
    section: {
      type: "etapes",
      etapes: [
        "On connaît x, on cherche f de x : on REMPLACE, puis on calcule.",
        "⚠️ On multiplie AVANT d'ajouter. Deux fois quatre plus trois font onze, pas vingt.",
        "On connaît f de x, on cherche x : on DÉFAIT dans l'ordre inverse.",
        "On retire d'abord b, PUIS on divise par a.",
        "⚠️ Diviser sans avoir retiré b est l'erreur la plus fréquente du chapitre.",
      ],
    },
  },
  {
    titre: "Deux points suffisent",
    badge: "Retrouver la fonction",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Le coefficient directeur",
          texte:
            "L'écart des images divisé par l'écart des antécédents. De quatre à dix pour x de zéro à trois : six divisé par trois, donc deux.",
        },
        {
          titre: "L'ordonnée à l'origine",
          texte:
            "Si l'on connaît f de zéro, c'est lui directement. Sinon, on remplace dans l'une des deux égalités.",
        },
        {
          titre: "Le contrôle",
          texte:
            "La formule trouvée doit redonner LES DEUX points. Vérifier sur celui qui a servi au calcul ne prouve rien.",
        },
        {
          titre: "Pourquoi ça marche",
          texte:
            "Parce que deux points déterminent une droite, et qu'une fonction affine EST une droite. Deux mesures suffisent donc à tout connaître.",
        },
      ],
    },
  },
  {
    titre: "Le point de bascule",
    badge: "Comparer deux offres",
    section: {
      type: "objectif",
      phrase: "Il n'y a pas de meilleure offre en soi",
      sousPhrase:
        "Tarif A : trois x plus huit. Tarif B : cinq x. À deux heures, B est moins cher. À six heures, A l'est. Entre les deux, il existe un instant où ils se valent.",
      encadre: {
        titre: "Où il se trouve",
        texte:
          "On cherche quand les deux donnent le même résultat. Trois x plus huit égale cinq x donne x égale quatre — et les deux valent alors vingt euros.",
      },
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    section: {
      type: "exemple",
      enonce: "Un taxi à Saint-Pierre facture quatre euros de prise en charge, puis deux euros par kilomètre.",
      question: "Écrire la fonction, puis calculer le prix d'un trajet de sept kilomètres.",
      correction:
        "La prise en charge est le montant fixe : c'est le b, donc quatre. Le prix au kilomètre est le montant par unité : c'est le a, donc deux. La fonction s'écrit f de x égale deux x plus quatre. Pour sept kilomètres : deux fois sept font quatorze, plus quatre, soit dix-huit euros. Le contrôle tient en une ligne : pour zéro kilomètre, la formule donne quatre euros — c'est bien la prise en charge, payée avant même de rouler. Si elle ne redonne pas le montant fixe pour x égale zéro, c'est qu'on a mélangé a et b.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    section: {
      type: "exercice",
      enonce: "Une fonction affine vérifie f de un égale cinq, et f de quatre égale quatorze.",
      question: "Quelle est son expression ?",
      indice: "Commence par le coefficient directeur : l'écart des images divisé par l'écart des antécédents.",
      correction:
        "Le coefficient directeur vaut quatorze moins cinq, divisé par quatre moins un : neuf divisé par trois, donc trois. Ensuite on remplace dans la première égalité : trois fois un plus b égale cinq, donc b vaut deux. La fonction est f de x égale trois x plus deux. Et on vérifie sur le SECOND point, celui qui n'a pas servi : trois fois quatre plus deux font quatorze. C'est juste.",
    },
  },
];
