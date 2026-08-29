// ─── Fiche de cours : lire et interpréter des données (4e) ─────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/statistiques.bank.ts, notionId stat_donnee).
//
// ⭐ NOTION SCINDÉE LE 28/08/2026. `stat_statistique` portait DIX micros et deux
// objets : ce qu'on LIT et compte (tableau, graphique, effectifs, fréquences) et
// ce qu'on CALCULE et interprète (moyenne, médiane, étendue). C'est la coupure
// du BO lui-même, qui énumère séparément « effectifs, fréquences »,
// « indicateurs de position » et « indicateur de dispersion ».
//
// ⭐ MÊME IDENTIFIANT QU'EN 6e — `stat_donnee`, au singulier, comme sa notion
// « Lire et interpréter des données ». L'élève retrouve la même coupure d'une
// année sur l'autre. La fiche sœur est `maths-4e-statistiques.tsx`, qui garde
// les indicateurs et son URL indexée.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE. Tous les nombres de
// la fiche sortent de la banque :
//   stat_lire_tableau   → 135 élèves : 20 à pied, 25 à vélo, 40 en bus, 50 en voiture
//   stat_lire_graphique → la barre la plus haute, 50 élèves
//   stat_effectif       → la valeur 12 apparaît 7 fois sur 40
//   stat_frequence      → 10 sur 25, soit 0,4 — c'est-à-dire 40 %
//   stat_donnee_defi    → la fréquence rapportée au bon total, l'effectif effacé
//
// ⭐⭐ CE QUE LA FICHE ENSEIGNE EST UNE DISTINCTION, PAS UNE TECHNIQUE : un
// EFFECTIF compte, une FRÉQUENCE compare. Douze tout seul ne dit rien tant qu'on
// ignore sur combien. C'est la même idée que la fiche des fréquences en
// probabilités, prise du côté des statistiques — et c'est ce qui permet plus
// tard de lire un sondage.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

const BLEU = "#2563eb";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut donc porter une vraie fraction.
 * Les libellés À L'INTÉRIEUR du dessin, eux, restent en écriture simple.
 */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// ⚠️ 228 px pour une carte de propriété, 208 pour un exemple — les largeurs
// mesurées sur téléphone de 375 px. La police finale vaut
// police × largeurAffichée ÷ largeurViewBox, plancher à 11 px.
const graphique = (
  data: { label: string; value: number; color?: string }[],
  opts: {
    type?: "barres" | "batons" | "camembert";
    enAvant?: number;
    bloc?: "carte" | "exemple";
  } = {}
) => (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: opts.type ?? "barres",
      size: { width: opts.bloc === "exemple" ? 208 : 228, height: 165 },
      data,
      display: {
        showLabels: true,
        showValues: true,
        highlightIndex: opts.enAvant,
      },
    }}
  />
);

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

// ⭐⭐ LE DESSIN QUI PORTE LA DISTINCTION. Une fréquence est une PART DU TOUT,
// pas un nombre de plus — et `schema_barre` est le canvas du « tout découpé ».
// ⚠️ Hauteur 200 : les étiquettes de parts sont posées à 144 px du haut et la
// phrase du bas à 18 px du bas. Sous 180, elles se frôlent, et ça ne se voit
// qu'en 1280.
const effectifEtFrequence = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      // ⚠️ 206 ET NON 228, MESURÉ LE 28/08 : à 228 de viewBox dans un bloc de
      // 222 px, le rapport tombe à 0,97 et les étiquettes « vélo » et « les
      // autres » rendaient 10,5 px — sous le plancher de 11. Un viewBox PLUS
      // ÉTROIT que son bloc agrandit le texte, il ne le réduit pas.
      size: { width: 206, height: 200 },
      total: "25 élèves",
      parts: [
        { label: "vélo", value: "10", color: BLEU },
        { label: "les autres", value: "15", color: "#e2e8f0" },
      ],
      questionLabel: "10 sur 25, soit 0,4",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
    }}
  />
);

const RELEVE = [
  { label: "pied", value: 20 },
  { label: "vélo", value: 25 },
  { label: "bus", value: 40 },
  { label: "voiture", value: 50 },
];

export const ficheDonnees4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "stat-donnee",
  titre: "Lire et interpréter des données",
  accroche:
    "Un tableau, un graphique en barres, un camembert : trois façons de montrer le même relevé, et chacune répond à une question différente. Avant de calculer quoi que ce soit, il faut savoir ce qu'on lit — et distinguer ce qui COMPTE de ce qui COMPARE.",
  identite: [
    { label: "Le mot de 4e", valeur: "Effectif : combien de fois. Fréquence : sur combien" },
    { label: "La règle", valeur: "Une fréquence se rapporte au TOTAL, jamais à l'autre part" },
    { label: "Le piège", valeur: "Un effectif seul ne dit rien tant qu'on ignore sur combien" },
  ],
  definition: {
    texte:
      "Une série statistique est un relevé de valeurs. L'EFFECTIF d'une valeur est le nombre de fois où elle apparaît ; l'effectif total est le nombre de relevés. La FRÉQUENCE d'une valeur est son effectif divisé par l'effectif total : c'est un nombre compris entre 0 et 1, qu'on exprime souvent en pourcentage. Un tableau, un diagramme en barres et un diagramme circulaire présentent la même série de trois façons.",
  },
  figure: {
    schema: legende(
      graphique(RELEVE, { enAvant: 3 }),
      "135 élèves interrogés : la barre la plus haute en compte 50"
    ),
    legende:
      "Le graphique dit la même chose que le tableau, mais il montre les écarts d'un coup d'œil. On lit la hauteur d'une barre sur l'axe vertical.",
  },
  proprietes: [
    {
      titre: "Un tableau associe une valeur à son effectif",
      micros: ["stat_lire_tableau"],
      texte:
        "Chaque ligne dit combien de fois une valeur apparaît. ⚠️ Le TOTAL se lit à part : il n'est pas une valeur de plus, c'est la somme des autres. C'est aussi le contrôle le plus simple — si la somme ne tombe pas, une ligne est fausse.",
      schema: tableau({
        headers: ["transport", "effectif"],
        rows: [
          { values: ["à pied", "20"] },
          { values: ["à vélo", "25"] },
          { values: ["en bus", "40"] },
          { values: ["en voiture", "50"] },
          { values: ["TOTAL", "135"] },
        ],
        highlight: { row: 4 },
        caption: "le total est la somme, pas une ligne de plus",
      }),
    },
    {
      titre: "Lire un graphique",
      micros: ["stat_lire_graphique"],
      texte:
        "Le graphique montre les écarts, pas les nombres exacts : on lit la hauteur d'une barre sur l'axe vertical. Il répond vite à « lequel est le plus grand ? » et mal à « combien exactement ? » — pour ça, le tableau reste meilleur.",
      schema: legende(
        graphique(RELEVE, { enAvant: 3 }),
        "la barre la plus haute : 50 élèves"
      ),
    },
    {
      titre: "Effectif et fréquence : compter, ou comparer",
      micros: ["stat_effectif", "stat_frequence"],
      texte:
        "L'effectif COMPTE : 10 élèves viennent à vélo. La fréquence COMPARE cet effectif au total : 10 sur 25, soit 0,4 — c'est-à-dire 40 %. ⚠️ « Dix » tout seul ne dit rien tant qu'on ignore sur combien : c'est toute la différence.",
      schema: effectifEtFrequence,
    },
    {
      titre: "On rapporte au TOTAL, jamais à l'autre part",
      micros: ["stat_frequence"],
      texte:
        "Sur 25 élèves dont 10 à vélo, la fréquence du vélo vaut $\\frac{10}{25} = 40\\ \\%$, et non $\\frac{10}{15}$. Rapporter une part à l'autre donne un RATIO — c'est une autre notion, et une autre réponse.",
      schema: tableau({
        headers: ["calcul", "ce qu'il donne"],
        rows: [
          { values: ["10 ÷ 25", "la fréquence : 40 %"] },
          { values: ["10 ÷ 15", "un ratio, pas une fréquence"] },
        ],
        highlight: { row: 0 },
        caption: "au tout, pas à l'autre part",
      }),
    },
    {
      titre: "La somme des fréquences fait toujours 1",
      micros: ["stat_frequence", "stat_donnee_defi"],
      texte:
        "C'est le contrôle qui rattrape la plupart des erreurs. Si l'on additionne les fréquences de toutes les valeurs, on doit trouver 1 — ou 100 %. Quand la somme tombe à 0,92, une fréquence a été calculée sur le mauvais total.",
      schema: tableau({
        headers: ["transport", "fréquence"],
        rows: [
          { values: ["à pied", "14,8 %"] },
          { values: ["à vélo", "18,5 %"] },
          { values: ["en bus", "29,6 %"] },
          { values: ["en voiture", "37,0 %"] },
          { values: ["TOTAL", "100 %"] },
        ],
        highlight: { row: 4 },
        caption: "le contrôle qui ne trompe pas",
      }),
    },
    {
      titre: "Trois représentations, trois usages",
      micros: ["stat_lire_tableau", "stat_lire_graphique"],
      texte:
        "Le tableau donne les nombres, les barres donnent les écarts, le camembert donne les PARTS — c'est le seul des trois où le total est visible d'un coup d'œil, puisque c'est le disque entier. On choisit selon la question qu'on se pose.",
      schema: legende(
        graphique(RELEVE, { type: "camembert" }),
        "le disque entier, c'est le total"
      ),
    },
  ],
  reel: {
    texte:
      "Lire des données est devenu un geste quotidien, et c'est là que se jouent la plupart des malentendus. Un article annonce « 40 % des collégiens » : sur combien d'élèves interrogés ? Un graphique de résultats sportifs montre des barres écrasées parce que l'axe ne part pas de zéro. À La Réunion, les relevés de pluviométrie se lisent en tableau pour les chiffres exacts et en graphique pour comparer les mois. Et la première question d'un statisticien devant n'importe quel pourcentage est toujours la même : l'effectif.",
  },
  historique: {
    texte:
      "Le mot « statistique » vient de l'italien « statista », l'homme d'État : c'était d'abord la science des données de l'État — recensements, naissances, récoltes. William Playfair, un ingénieur écossais, invente en 1786 le diagramme en barres puis, en 1801, le diagramme circulaire, dans des ouvrages destinés à rendre le commerce lisible aux non-spécialistes. Il justifiait son invention par une phrase qui vaut encore : un tableau demande de la mémoire, une figure demande un coup d'œil.",
  },
  formule: {
    contexte: "Pour une valeur d'une série statistique",
    expression: "fréquence = effectif de la valeur ÷ effectif total",
    legende:
      "Un nombre entre 0 et 1, qu'on exprime souvent en pourcentage. Et le contrôle vient avec la formule : la somme de toutes les fréquences doit faire 1.",
    schema: tableau(
      {
        headers: ["", "ce que c'est"],
        rows: [
          { values: ["effectif", "un comptage"] },
          { values: ["effectif total", "le nombre de relevés"] },
          { values: ["fréquence", "une comparaison"] },
        ],
        caption: "compter, ou comparer",
      },
      "formule"
    ),
  },
  methode: [
    {
      titre: "Lire un tableau ou un graphique",
      micros: ["stat_lire_tableau", "stat_lire_graphique"],
      // ⛔ Le seul bloc sans dessin : la figure de référence et les deux
      // premières propriétés montrent déjà les deux lectures.
      texte:
        "On repère la valeur cherchée dans la première colonne, ou la barre correspondante, puis on lit son effectif. ⚠️ Le total se lit à part — il n'est pas une valeur de plus.",
    },
    {
      titre: "Calculer une fréquence",
      micros: ["stat_frequence"],
      texte:
        "On divise l'effectif de la valeur par l'effectif TOTAL, puis on multiplie par 100 pour l'exprimer en pourcentage. Le total est celui de tous les relevés, pas celui des autres catégories.",
      schema: tableau({
        headers: ["étape", "calcul"],
        rows: [
          { values: ["1", "on additionne tous les effectifs"] },
          { values: ["2", "on divise l'effectif cherché"] },
          { values: ["3", "on multiplie par 100"] },
        ],
        caption: "le total d'abord, toujours",
      }),
    },
    {
      titre: "Retrouver un effectif manquant",
      micros: ["stat_effectif", "stat_donnee_defi"],
      texte:
        "Quand le total est connu et qu'une ligne manque, on soustrait : la somme des effectifs redonne toujours le total. ⭐ Ce même contrôle sert à repérer une erreur de saisie — si la somme ne tombe pas, une ligne est fausse.",
      schema: tableau({
        headers: ["", "effectif"],
        rows: [
          { values: ["4e A", "28"] },
          { values: ["4e B", "26"] },
          { values: ["4e C", "?"] },
          { values: ["TOTAL", "76"] },
        ],
        highlight: { row: 2 },
        caption: "76 − 28 − 26 = 22",
      }),
    },
    {
      titre: "Choisir la bonne représentation",
      micros: ["stat_lire_graphique"],
      texte:
        "Pour donner des nombres exacts : le tableau. Pour comparer des catégories : les barres. Pour montrer des parts d'un tout : le camembert. ⚠️ Un camembert ne convient que si les catégories se partagent un total — sinon il ment.",
    },
  ],
  usages: [
    {
      titre: "On cherche un effectif",
      micros: ["stat_lire_tableau"],
      detail:
        "On lit la ligne ou la barre correspondante. C'est un comptage : il se lit, il ne se calcule pas.",
    },
    {
      titre: "On veut comparer deux groupes de tailles différentes",
      micros: ["stat_frequence"],
      detail:
        "Les effectifs ne suffisent pas : il faut passer aux fréquences. 20 sur 40 et 30 sur 100 ne se comparent pas autrement.",
    },
    {
      titre: "Une valeur manque au tableau",
      micros: ["stat_effectif", "stat_donnee_defi"],
      detail:
        "On utilise le total : la somme des effectifs le redonne toujours. C'est aussi le contrôle d'une saisie.",
    },
    {
      titre: "On lit un pourcentage dans la presse",
      micros: ["stat_frequence"],
      detail:
        "On cherche l'effectif avant de croire le chiffre. « 40 % » sur 15 personnes et sur 15 000 ne sont pas la même information.",
    },
  ],
  exemples: [
    {
      titre: "Lire le tableau",
      micros: ["stat_lire_tableau", "stat_effectif"],
      donnees:
        "On a demandé à 135 élèves comment ils viennent au collège. 20 viennent à pied, 25 à vélo, 40 en bus et 50 en voiture.",
      question: "Quel est l'effectif de « bus », et quelle est sa fréquence ?",
      schema: graphique(RELEVE, { enAvant: 2, bloc: "exemple" }),
      solution:
        "L'effectif de « bus » est 40 : c'est le nombre d'élèves de cette catégorie, et il se lit directement.\n\nLa fréquence compare cet effectif au total : $40 \\div 135 \\approx 0,296$, soit environ 29,6 %.\n\n⚠️ Contrôle : $20 + 25 + 40 + 50 = 135$. La somme tombe juste, donc aucune ligne n'a été mal lue.",
    },
    {
      titre: "Effectif contre fréquence",
      micros: ["stat_effectif", "stat_frequence"],
      donnees: "Dans une série, la valeur 12 apparaît 7 fois sur 40 relevés.",
      question: "Quel est son effectif, et quelle est sa fréquence ?",
      schema: effectifEtFrequence,
      solution:
        "L'effectif est 7 : c'est le nombre de fois où la valeur apparaît. C'est un comptage.\n\nLa fréquence compare cet effectif au total : $7 \\div 40 = 0,175$, soit 17,5 %.\n\n⭐ Les deux nombres décrivent la même chose et ne disent pas la même chose. « Sept » ne devient une information qu'accompagné de « sur quarante ».",
    },
    {
      titre: "La ligne effacée",
      micros: ["stat_donnee_defi", "stat_effectif"],
      donnees: "Un tableau annonce 76 élèves en tout : 28 en 4e A, 26 en 4e B, et une classe dont l'effectif a été effacé.",
      question: "Combien d'élèves compte la 4e C ?",
      schema: graphique(
        [
          { label: "4e A", value: 28 },
          { label: "4e B", value: 26 },
          { label: "4e C", value: 22, color: "#dc2626" },
        ],
        { enAvant: 2, bloc: "exemple" }
      ),
      solution:
        "La somme des effectifs redonne toujours le total. On additionne donc ce qu'on connaît : $28 + 26 = 54$.\n\nPuis on soustrait : $76 - 54 = 22$ élèves en 4e C.\n\n⭐ Ce contrôle par la somme sert aussi dans l'autre sens : si les trois effectifs étaient donnés et que leur somme ne faisait pas 76, c'est qu'une ligne serait fausse.",
    },
  ],
  pieges: [
    "Confondre l'effectif et la fréquence. « Le bus, c'est 40 » est un comptage ; la fréquence rapporte ce 40 au total.",
    "Rapporter une part à l'autre au lieu du total. Sur 25 élèves dont 10 à vélo, la fréquence vaut $\\frac{10}{25}$, pas $\\frac{10}{15}$.",
    "Compter le total comme une valeur de plus. Il est la somme des autres, pas une ligne supplémentaire.",
    "Croire un pourcentage sans regarder l'effectif. 40 % sur 15 personnes et sur 15 000 ne disent pas la même chose.",
    "Lire un graphique dont l'axe ne part pas de zéro. Les écarts y paraissent bien plus grands qu'ils ne sont.",
    "Utiliser un camembert pour des catégories qui ne se partagent pas un total. Le disque entier n'aurait alors aucun sens.",
  ],
  aRetenir: [
    "L'EFFECTIF d'une valeur est le nombre de fois où elle apparaît. C'est un comptage.",
    "La FRÉQUENCE est cet effectif divisé par l'effectif TOTAL. C'est une comparaison.",
    "Une fréquence est comprise entre 0 et 1, et s'exprime souvent en pourcentage.",
    "La somme de tous les effectifs redonne le total ; la somme de toutes les fréquences fait 1.",
    "Le tableau donne les nombres, les barres donnent les écarts, le camembert donne les parts.",
    "Devant un pourcentage, la première question est toujours : SUR COMBIEN ?",
  ],
  entrainement: [
    {
      micros: ["stat_lire_tableau"],
      question: "Un tableau donne : à pied 20, à vélo 25, en bus 40, en voiture 50. Quel est l'effectif total ?",
      correction: "$20 + 25 + 40 + 50 = 135$ élèves. Le total est la somme des effectifs, pas une ligne de plus.",
    },
    {
      micros: ["stat_effectif", "stat_frequence"],
      question: "Dans une série de 40 relevés, la valeur 12 apparaît 7 fois. Effectif ? Fréquence ?",
      correction:
        "L'effectif est 7. La fréquence vaut $7 \\div 40 = 0,175$, soit 17,5 %.",
    },
    {
      micros: ["stat_frequence"],
      question: "Sur 25 élèves, 10 viennent à vélo. Quelle est la fréquence du vélo ?",
      correction:
        "$10 \\div 25 = 0,4$, soit 40 %. ⚠️ $10 \\div 15$ comparerait le vélo aux AUTRES : c'est un ratio, pas une fréquence.",
    },
    {
      micros: ["stat_frequence", "stat_donnee_defi"],
      question: "Les fréquences d'une série valent 20 %, 35 % et 40 %. Quelque chose cloche : quoi ?",
      correction:
        "Leur somme fait 95 %, alors qu'elle devrait faire 100 %. Il manque donc une catégorie de 5 %, ou l'une des trois fréquences a été calculée sur le mauvais total.",
    },
    {
      micros: ["stat_donnee_defi", "stat_effectif"],
      question: "Un tableau annonce 90 élèves : 31 en 4e A, 29 en 4e B, et la 4e C effacée. Combien en 4e C ?",
      correction: "$31 + 29 = 60$, puis $90 - 60 = 30$ élèves.",
    },
    {
      micros: ["stat_lire_graphique"],
      question: "Sur un diagramme en barres, comment lit-on l'effectif d'une catégorie ?",
      correction:
        "On repère sa barre, puis on lit sa hauteur sur l'axe vertical. ⚠️ Si l'axe ne part pas de zéro, les écarts paraissent plus grands qu'ils ne sont.",
    },
    {
      micros: ["stat_lire_graphique", "stat_lire_tableau"],
      question: "On veut donner des chiffres exacts dans un rapport. Tableau ou graphique ?",
      correction:
        "Le tableau : il donne les nombres. Le graphique sert à comparer d'un coup d'œil, pas à lire une valeur précise.",
    },
    {
      micros: ["stat_donnee_defi"],
      question:
        "Un sondage donne 12 réponses « jamais », 20 « parfois » et 8 « souvent ». Quelle est la fréquence des « parfois » ?",
      correction:
        "Le total vaut $12 + 20 + 8 = 40$ réponses. Donc $20 \\div 40 = 0,5$, soit 50 %.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesDonnees4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Lire et interpréter des données - 4e",
    section: {
      type: "objectif",
      phrase: "Compter, ou comparer",
      sousPhrase:
        "Un effectif compte : dix élèves viennent à vélo. Une fréquence compare : dix sur vingt-cinq, soit quarante pour cent. Les deux décrivent la même chose et ne disent pas la même chose.",
      encadre: {
        titre: "L'idée",
        texte:
          "« Dix » tout seul ne dit rien tant qu'on ignore sur combien. C'est toute la différence entre un comptage et une comparaison.",
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
          "Un article annonce « quarante pour cent des collégiens » : sur combien d'élèves interrogés ? La première question d'un statisticien devant n'importe quel pourcentage est toujours la même — l'effectif.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "William Playfair invente le diagramme en barres en 1786, puis le camembert en 1801, pour rendre le commerce lisible aux non-spécialistes. Il le justifiait ainsi : un tableau demande de la mémoire, une figure demande un coup d'œil.",
      },
    },
  },
  {
    titre: "Les deux mots",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "La fréquence se rapporte au TOTAL",
      sousPhrase:
        "Sur vingt-cinq élèves dont dix à vélo, la fréquence du vélo vaut dix sur vingt-cinq, soit quarante pour cent. Et non dix sur quinze.",
      encadre: {
        titre: "Attention",
        texte:
          "Rapporter une part à l'autre donne un ratio, ce qui est une autre notion et une autre réponse.",
      },
    },
  },
  {
    titre: "Le contrôle qui ne trompe pas",
    badge: "À faire systématiquement",
    section: {
      type: "etapes",
      etapes: [
        "La somme de tous les effectifs redonne le TOTAL.",
        "La somme de toutes les fréquences fait 1, c'est-à-dire cent pour cent.",
        "Si la somme ne tombe pas, une ligne est fausse — ou une fréquence a été calculée sur le mauvais total.",
        "⭐ Ce même contrôle permet de retrouver un effectif effacé : on soustrait.",
      ],
    },
  },
  {
    titre: "Trois représentations",
    badge: "Chacune sa question",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Le tableau",
          texte:
            "Il donne les nombres exacts. C'est lui qu'on utilise pour un rapport ou un calcul.",
        },
        {
          titre: "Les barres",
          texte:
            "Elles donnent les écarts d'un coup d'œil. Attention si l'axe ne part pas de zéro.",
        },
        {
          titre: "Le camembert",
          texte:
            "Il donne les parts d'un tout — le seul où le total est visible, puisque c'est le disque entier.",
        },
        {
          titre: "Le bon choix",
          texte:
            "On choisit selon la question qu'on se pose, pas selon ce qui est joli.",
        },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    section: {
      type: "exemple",
      enonce: "On a demandé à 135 élèves comment ils viennent au collège : 20 à pied, 25 à vélo, 40 en bus, 50 en voiture.",
      question: "Quel est l'effectif de « bus », et quelle est sa fréquence ?",
      correction:
        "L'effectif est 40, il se lit directement. La fréquence vaut 40 divisé par 135, soit environ 29,6 pour cent. Contrôle : 20 plus 25 plus 40 plus 50 font bien 135 — aucune ligne n'a été mal lue.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    section: {
      type: "exercice",
      enonce: "Les fréquences d'une série valent 20 pour cent, 35 pour cent et 40 pour cent.",
      question: "Quelque chose cloche : quoi ?",
      indice: "Additionne-les.",
      correction:
        "Leur somme fait 95 pour cent, alors qu'elle devrait faire cent. Il manque donc une catégorie de cinq pour cent, ou l'une des trois a été calculée sur le mauvais total.",
    },
  },
];
