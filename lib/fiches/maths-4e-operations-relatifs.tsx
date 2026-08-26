// ─── Fiche de cours : les opérations sur les relatifs (4e) ─────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/operations-relatifs.bank.ts, notionId relatif_operation).
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE (règle de Frédéric,
// 26/08). Ce que la banque travaille vraiment, énoncé par énoncé :
//   relatif_addition       → (-3) + 7 ; (-5) + (-4)
//   relatif_soustraction   → 6 - 9 ; 5 - (-3)   « soustraire, c'est ajouter l'opposé »
//   relatif_multiplication → (-4) × 3 ; (-5) × (-2)   « le signe D'ABORD, puis les
//                            distances à zéro »
//   relatif_division       → (-12) ÷ 3 ; (-20) ÷ (-5)
//   relatif_calcul         → (-3) × 4 + 5, priorités et parenthèses
//   relatif_probleme       → « il fait -2 °C, la température monte de 7 °C »,
//                            montées et descentes
//   relatif_operation_defi → « un élève dit que (-4) × (-3) = -12, a-t-il raison ? »
//                            et « quel est le signe de (-2) × (-3) × (-1) ? »
// Tous les nombres de la fiche sortent de cette liste, sans exception.
//
// ⚠️ CE QUE LA 5e A DÉJÀ FAIT, ET QU'ON NE REFAIT PAS. `maths-5e-operations-
// relatifs.tsx` est la fiche PILOTE du standard du 19/08 : elle couvre l'addition
// et la soustraction. La 4e apporte la MULTIPLICATION et la DIVISION — donc la
// règle des signes, qui est le vrai sujet de cette fiche. On reprend son helper
// `droite()` au pas adaptatif pour que l'élève retrouve exactement le même dessin
// d'une classe à l'autre.
//
// ⭐ QUATRE CANVAS, CHOISIS POUR CE QU'ILS MONTRENT — et pas davantage, parce
// qu'un cinquième forcé dirait moins que rien :
//   · l'opposé est un SYMÉTRIQUE par rapport à zéro → `number_line` ;
//   · additionner deux négatifs, c'est mettre deux longueurs BOUT À BOUT →
//     `schema_barre` (la droite graduée dessine des points, pas des sauts) ;
//   · soustraire, c'est RÉÉCRIRE avant de calculer → `calcul_pose` ;
//   · la règle des signes est une TABLE À DOUBLE ENTRÉE → `tableau_donnees`.
//
// ⛔ La balance de `masse` a été essayée pour « dettes contre avoirs » : elle pèse
// des masses, qui sont toujours positives. Un dessin qui contredit son texte est
// pire que pas de dessin.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const BLEU = "#2563eb";
const ROUGE = "#dc2626";

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// La droite graduée de la fiche pilote de 5e, avec son pas ADAPTATIF : une
// graduation tous les (étendue ÷ 6) en laisse sept au maximum. Les POINTS restent
// posés à leur valeur exacte, quelle que soit la graduation.
// ⚠️ 260 de large et non 360 : une carte de propriété fait 222 px, et à 360 de
// viewBox les graduations rendaient 8,8 px (mesuré le 24/08).
const droite = (
  points: { value: number; label: string; color?: string }[],
  min: number,
  max: number
) => (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min,
      max,
      step: Math.max(1, Math.ceil((max - min) / 6)),
      points,
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
      size: { width: 260, height: 95 },
    }}
  />
);

// ADDITIONNER DEUX NÉGATIFS, C'EST METTRE DEUX LONGUEURS BOUT À BOUT. La droite
// graduée ne sait pas montrer ça — elle dessine des points, pas des sauts
// (CATALOGUE.md). `schema_barre` est le canvas du « tout découpé en parts ».
// ⚠️ Hauteur 200 : les étiquettes de parts sont posées à 144 px du haut et la
// phrase du bas à 18 px du bas — sous 180, elles se frôlent (mesuré en 1280).
const deuxDettes = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width: 228, height: 200 },
      total: "9 vers la gauche",
      parts: [
        { label: "−5", value: "5", color: ROUGE },
        { label: "−4", value: "4", color: "#fca5a5" },
      ],
      questionLabel: "(−5) + (−4) = −9",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
    }}
  />
);

// SOUSTRAIRE, C'EST RÉÉCRIRE AVANT DE CALCULER. La soustraction disparaît : on
// pose une addition. Le calcul posé le dit mieux qu'une phrase, et il rappelle
// que le nombre qui change de signe est le SECOND, jamais le premier.
const soustractionReecrite = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "addition",
      numbers: ["5", "3"],
      result: "8",
      display: { showResult: true, compact: true },
      questionLabel: "5 − (−3) devient 5 + 3",
    }}
  />
);

// ⭐ LA RÈGLE DES SIGNES EST UNE TABLE À DOUBLE ENTRÉE, et rien d'autre ne la
// montre aussi bien. Elle vaut pour la multiplication ET pour la division : c'est
// la même table, et c'est ce qui économise la moitié du travail de mémoire.
const regleDesSignes = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["×  ou  ÷", "+", "−"],
      rows: [
        { values: ["+", "+", "−"] },
        { values: ["−", "−", "+"] },
      ],
      highlight: { cell: { row: 1, col: 2 } },
      caption: "deux signes identiques donnent +",
      display: { compact: true, striped: true },
    }}
  />
);

// L'ORDRE DES OPÉRATIONS, ÉTAPE PAR ÉTAPE. Ce n'est pas une figure, c'est une
// séquence : le tableau la déroule dans le bon ordre, et l'on voit que le « + 5 »
// attend son tour.
const ordreDesOperations = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["étape", "ce qu'on écrit"],
      rows: [
        { values: ["l'énoncé", "(−3) × 4 + 5"] },
        { values: ["la multiplication", "(−12) + 5"] },
        { values: ["l'addition", "−7"] },
      ],
      highlight: { row: 1 },
      caption: "la multiplication passe avant l'addition",
      display: { compact: true, striped: true },
    }}
  />
);

const pieges = [
  "Changer le signe du premier nombre au lieu du second : dans 5 − (−3), c'est le −3 qui devient +3, jamais le 5.",
  "Appliquer la règle des signes à une addition : elle ne vaut que pour la multiplication et la division. (−5) + (−4) ne fait pas +9.",
  "Calculer de gauche à droite sans regarder les opérations : dans (−3) × 4 + 5, la multiplication passe d'abord, et le résultat est −7, pas −27.",
];

const aRetenir = [
  "Soustraire un nombre, c'est ajouter son opposé : 5 − (−3) = 5 + 3 = 8. Seul le second nombre change de signe.",
  "Pour multiplier ou diviser, on décide le signe d'abord, puis on calcule avec les distances à zéro. Deux signes identiques donnent +, deux signes différents donnent −.",
  "Dans un calcul mélangé, les parenthèses passent en premier, puis la multiplication et la division, et enfin l'addition et la soustraction.",
];

export const ficheOperationsRelatifs4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "relatif-operation",
  titre: "Les opérations sur les nombres relatifs",
  accroche:
    "En 5e, on a appris à additionner et à soustraire des nombres relatifs. La 4e ajoute les deux dernières opérations — multiplier et diviser — et avec elles une règle qui ne ressemble à rien de ce qu'on connaissait : deux nombres négatifs multipliés donnent un résultat positif.",
  identite: [
    { label: "Le socle", valeur: "Un signe, et une distance à zéro" },
    { label: "La nouveauté de 4e", valeur: "Multiplier et diviser des relatifs" },
    { label: "Le réflexe", valeur: "Décider le signe AVANT de calculer" },
  ],
  definition: {
    texte:
      "Un nombre relatif est fait de deux informations : un signe, qui dit de quel côté de zéro il se trouve, et une distance à zéro, qui dit de combien il s'en éloigne. Deux nombres relatifs de même distance à zéro mais de signes contraires sont dits opposés : ils sont symétriques par rapport à zéro sur la droite graduée.",
  },
  figure: {
    schema: legende(
      droite(
        [
          { value: -3, label: "−3", color: ROUGE },
          { value: 3, label: "+3", color: BLEU },
        ],
        -6,
        6
      ),
      "−3 et +3 : même distance à zéro, signes contraires"
    ),
    legende: "Deux nombres opposés sont symétriques par rapport à zéro.",
  },
  proprietes: [
    {
      titre: "Additionner deux nombres de même signe",
      micros: ["relatif_addition"],
      texte:
        "On additionne les distances à zéro et on garde le signe commun. Deux déplacements vers la gauche s'ajoutent : (−5) + (−4) = −9.",
      schema: deuxDettes,
    },
    {
      titre: "Soustraire, c'est ajouter l'opposé",
      micros: ["relatif_soustraction"],
      texte:
        "Toute soustraction se réécrit en addition : on remplace le second nombre par son opposé. 5 − (−3) devient 5 + 3, donc 8.",
      schema: soustractionReecrite,
    },
    {
      titre: "La règle des signes",
      micros: ["relatif_multiplication", "relatif_division"],
      texte:
        "Pour multiplier ou diviser, on décide d'abord le signe : identiques donnent +, différents donnent −. C'est la même table pour les deux opérations.",
      schema: regleDesSignes,
    },
    {
      titre: "Le signe se compte",
      micros: ["relatif_operation_defi"],
      texte:
        "Dans un produit de plusieurs facteurs, on compte les signes moins : un nombre pair de moins donne un résultat positif, un nombre impair un résultat négatif. (−2) × (−3) × (−1) a trois moins, donc son résultat est négatif.",
      // ⛔ Pas de dessin ici, et c'est un arbitrage. La règle est un COMPTAGE de
      // signes, pas une figure ; le seul dessin possible serait la table à double
      // entrée de la propriété juste au-dessus, qui ne traite que deux facteurs —
      // elle dirait donc moins que le texte. Un dessin qui répète n'apprend rien
      // (Frédéric, 25/08).
    },
  ],
  reel: {
    texte:
      "Les relatifs servent partout où il existe un « avant » et un « après » zéro. À La Réunion, c'est l'altitude comptée depuis la mer — le fond du Trou de Fer contre le sommet du Piton des Neiges — et surtout la température : au sommet, il gèle plusieurs nuits par an, alors qu'il fait 28 °C sur le littoral au même moment. C'est aussi un solde bancaire, un score au jeu qu'on peut perdre, ou les étages d'un parking souterrain. La multiplication arrive dès qu'un même écart se répète : une descente de 3 °C par heure pendant 4 heures, c'est (−3) × 4.",
  },
  historique: {
    texte:
      "Les nombres négatifs ont mis très longtemps à être acceptés. Les mathématiciens chinois les utilisaient déjà il y a deux mille ans, avec des baguettes rouges pour les positifs et noires pour les négatifs. En Europe, on les appelait encore « nombres absurdes » au XVIIe siècle, et Blaise Pascal jugeait impossible de retirer 4 de 0. C'est le commerce, avec ses dettes et ses avoirs, qui a fini par les imposer.",
  },
  formule: {
    contexte: "Pour multiplier ou diviser deux nombres relatifs",
    expression: "signe d'abord, puis les distances à zéro",
    legende:
      "(−4) × 3 : signes différents, donc résultat négatif ; 4 × 3 = 12 ; donc (−4) × 3 = −12.",
    schema: regleDesSignes,
  },
  methode: [
    {
      titre: "Réécrire",
      micros: ["relatif_soustraction"],
      texte:
        "S'il y a une soustraction, on la transforme d'abord en addition de l'opposé. On ne calcule jamais sur une expression qui mélange des « − » de signe et des « − » d'opération.",
      schema: soustractionReecrite,
    },
    {
      titre: "Décider le signe",
      micros: ["relatif_multiplication", "relatif_division"],
      texte:
        "Pour un produit ou un quotient, on écrit le signe du résultat AVANT de calculer quoi que ce soit. Ensuite seulement, on multiplie ou on divise les distances à zéro, comme avec des nombres positifs.",
      schema: regleDesSignes,
    },
    {
      titre: "Ordonner",
      micros: ["relatif_calcul"],
      texte:
        "Dans un calcul mélangé, on suit toujours le même ordre : les parenthèses, puis les multiplications et les divisions, puis les additions et les soustractions. On réécrit le calcul entier à chaque étape.",
      schema: ordreDesOperations,
    },
  ],
  usages: [
    {
      titre: "Additionner et soustraire",
      micros: ["relatif_addition", "relatif_soustraction"],
      detail:
        "On transforme les soustractions en additions, puis on regroupe : les nombres de même signe s'additionnent, les autres se compensent.",
      schema: legende(
        droite(
          [
            { value: -2, label: "matin", color: ROUGE },
            { value: 5, label: "midi", color: BLEU },
          ],
          -6,
          8
        ),
        "de −2 °C à +5 °C : une hausse de 7"
      ),
    },
    {
      titre: "Multiplier et diviser",
      micros: ["relatif_multiplication", "relatif_division"],
      detail:
        "On décide le signe avec la règle des signes, puis on calcule sur les distances à zéro. La division suit exactement la même table que la multiplication.",
    },
    {
      titre: "Résoudre un problème",
      micros: ["relatif_probleme", "relatif_calcul"],
      detail:
        "On traduit l'énoncé en calcul : une hausse et une montée sont positives, une baisse et une descente sont négatives. Puis on calcule, et on répond avec l'unité.",
    },
  ],
  exemples: [
    {
      titre: "Deux signes différents",
      micros: ["relatif_multiplication"],
      donnees: "On veut calculer (−4) × 3.",
      question: "Quel est le résultat ?",
      schema: regleDesSignes,
      solution:
        "On décide le signe d'abord : les deux facteurs ont des signes différents, donc le résultat est négatif. On calcule ensuite avec les distances à zéro : 4 × 3 = 12. Le résultat est donc −12. ⚠️ On n'écrit jamais le calcul avant d'avoir décidé le signe : c'est là que les erreurs se produisent.",
    },
    {
      titre: "Deux signes identiques",
      micros: ["relatif_multiplication", "relatif_division", "relatif_operation_defi"],
      donnees:
        "Un élève affirme que (−4) × (−3) = −12. On veut aussi calculer (−20) ÷ (−5).",
      question: "A-t-il raison, et que vaut le quotient ?",
      schema: droite(
        [
          { value: -12, label: "sa réponse", color: ROUGE },
          { value: 12, label: "la vraie", color: BLEU },
        ],
        -15,
        15
      ),
      solution:
        "Il a tort. Les deux facteurs ont le MÊME signe, donc le résultat est positif : (−4) × (−3) = +12. Il a confondu avec le cas des signes différents. Pour le quotient, c'est la même table : (−20) et (−5) ont le même signe, donc le résultat est positif, et 20 ÷ 5 = 4. Donc (−20) ÷ (−5) = 4.",
    },
    {
      titre: "La température du matin",
      micros: ["relatif_probleme", "relatif_calcul"],
      donnees:
        "Il fait −2 °C au petit matin au sommet du Piton des Neiges. Dans la journée, la température augmente de 7 °C.",
      question: "Quelle est la température finale ?",
      schema: legende(
        droite(
          [
            { value: -2, label: "départ", color: ROUGE },
            { value: 5, label: "arrivée", color: BLEU },
          ],
          -6,
          8
        ),
        "+7 depuis −2 : on arrive à +5"
      ),
      solution:
        "Une augmentation se traduit par une addition d'un nombre positif : on calcule (−2) + 7. Les deux nombres ont des signes différents, donc on soustrait les distances à zéro et on garde le signe du plus éloigné de zéro : 7 − 2 = 5, et 7 est positif. La température finale est donc de 5 °C. Contrôle : on est bien passé au-dessus de zéro, ce qui est cohérent avec une hausse de 7 °C depuis −2 °C.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Calculer (−5) + (−4), puis 6 − 9.",
      correction:
        "Pour (−5) + (−4), les deux nombres ont le même signe : on additionne les distances à zéro, 5 + 4 = 9, et on garde le signe moins. Le résultat est −9. Pour 6 − 9, on réécrit en 6 + (−9) : les signes sont différents, donc 9 − 6 = 3 et on garde le signe du plus éloigné de zéro, qui est −9. Le résultat est −3.",
      micros: ["relatif_addition", "relatif_soustraction"],
    },
    {
      question: "Calculer (−5) × (−2), puis (−12) ÷ 3.",
      correction:
        "Pour (−5) × (−2), les deux signes sont identiques, donc le résultat est positif : 5 × 2 = 10, donc le résultat est 10. Pour (−12) ÷ 3, les signes sont différents, donc le résultat est négatif : 12 ÷ 3 = 4, donc le résultat est −4.",
      micros: ["relatif_multiplication", "relatif_division"],
    },
    {
      question: "Calculer (−3) × 4 + 5.",
      correction:
        "La multiplication passe avant l'addition. On calcule d'abord (−3) × 4 : signes différents, donc négatif, et 3 × 4 = 12, ce qui donne −12. Il reste (−12) + 5 : signes différents, donc 12 − 5 = 7 avec le signe du plus éloigné de zéro, soit −7. Le résultat est −7.",
      micros: ["relatif_calcul"],
    },
    {
      question: "Quel est le signe de (−2) × (−3) × (−1) ? Réponds sans calculer le produit.",
      correction:
        "On compte les facteurs négatifs : il y en a trois, c'est un nombre impair, donc le résultat est négatif. On peut le vérifier en calculant par étapes : (−2) × (−3) = +6, puis 6 × (−1) = −6. Le résultat est bien négatif.",
      micros: ["relatif_operation_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesOperationsRelatifs4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les relatifs - 4e",
    section: {
      type: "objectif",
      phrase: "Multiplier et diviser des nombres relatifs",
      sousPhrase:
        "La 5e a fait l'addition et la soustraction. La 4e ajoute les deux dernières opérations, et la règle des signes.",
      encadre: {
        titre: "L'idée",
        texte: "On décide le signe d'abord, on calcule ensuite.",
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
          "L'altitude depuis la mer, la température au Piton des Neiges, un solde bancaire, les étages d'un parking souterrain.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "On les appelait « nombres absurdes » au XVIIe siècle. Pascal jugeait impossible de retirer 4 de 0 — c'est le commerce qui les a imposés.",
      },
    },
  },
  {
    titre: "La règle des signes",
    badge: "À connaître par cœur",
    section: {
      type: "duo",
      gauche: {
        variante: "ok",
        titre: "Signes identiques",
        contenu:
          "Le résultat est POSITIF. (−5) × (−2) = 10, et (−20) ÷ (−5) = 4.",
      },
      droite: {
        variante: "info",
        titre: "Signes différents",
        contenu:
          "Le résultat est NÉGATIF. (−4) × 3 = −12, et (−12) ÷ 3 = −4.",
      },
    },
  },
  {
    titre: "Le piège des deux « − »",
    badge: "Vigilance",
    section: {
      type: "objectif",
      phrase: "Un « − » de signe n'est pas un « − » d'opération",
      sousPhrase:
        "Dans 5 − (−3), le premier est une soustraction, le second est le signe du nombre. On réécrit : 5 + 3 = 8.",
      encadre: {
        titre: "Attention",
        texte: "C'est le SECOND nombre qui change de signe, jamais le premier.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheOperationsRelatifs4e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Selon ce que l'on cherche",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: ficheOperationsRelatifs4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "La température du matin",
    section: {
      type: "exemple",
      enonce: "Il fait −2 °C au sommet, la température monte de 7 °C.",
      question: "Quelle est la température finale ?",
      correction:
        "(−2) + 7 : signes différents, donc 7 − 2 = 5 avec le signe du plus éloigné de zéro. Il fait 5 °C.",
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
      enonce: "Un élève affirme que (−4) × (−3) = −12.",
      question: "A-t-il raison ?",
      indice: "Regarde les deux signes avant de calculer.",
      correction:
        "Non : les deux signes sont identiques, donc le résultat est positif. (−4) × (−3) = +12.",
    },
  },
];
