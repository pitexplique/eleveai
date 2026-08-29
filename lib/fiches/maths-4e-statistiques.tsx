// ─── Fiche de cours : les statistiques (4e) ────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach (4e/maths/statistiques.bank.ts).
//
// ⚠️ CETTE NOTION AVAIT DÉJÀ UNE FICHE, ÉTEINTE LE 21/08 (commit fc495175) :
// « pas une propriété illustrée, aucun dessin hors des exemples ». Celle-ci est
// écrite au standard du 19/08 — un dessin sur chaque définition et chaque
// propriété — et l'adresse sort du redirect de `next.config.ts` en même temps.
//
// Micro-compétences couvertes (les 10 de la banque) → blocs :
//   stat_lire_tableau   → Définition, figure, exemple 1
//   stat_lire_graphique → Propriété « Lire un graphique », usage 1
//   stat_effectif       → Propriété « Effectif et fréquence », exemple 1, exercice 1
//   stat_frequence      → Propriété « Effectif et fréquence », méthode « Calculer »
//   stat_moyenne        → Propriété « La moyenne égalise », méthode « Calculer », exemple 2
//   stat_mediane        → Propriété « Médiane et étendue », méthode « Ranger », exemple 3
//   stat_etendue        → Propriété « Médiane et étendue », exemple 3, exercice 3
//   stat_interpreter    → Propriété « Même moyenne, séries différentes », méthode « Interpréter »
//   stat_probleme       → Usage 3, exemple 3
//   stat_defi           → Exercice 4
//
// ⭐ SIX DESSINS DE NATURES DIFFÉRENTES, et ici le risque n'était pas le dessin
// qui se répète mais le dessin qui ne dit rien : une série statistique se laisse
// représenter de dix façons, et neuf ne montrent que « des barres ». Ce qu'on a
// cherché, c'est le dessin qui porte la DIFFÉRENCE entre les indicateurs :
//   · lire un graphique     → `stat_graph` en barres, une barre mise en avant ;
//   · une fréquence est une PART du total → `schema_barre` ;
//   · une moyenne est un PARTAGE          → `calcul_pose`, la division posée ;
//   · une médiane est une POSITION dans la série rangée → `number_line` ;
//   · un tableau est une LECTURE          → `tableau_donnees`.
//
// ⭐ ET LE DESSIN LE PLUS UTILE EST UNE COMPARAISON : deux séries de MÊME MOYENNE
// et d'étendues très différentes. C'est la seule façon de faire comprendre à quoi
// sert l'étendue — sans elle, la moyenne dit la même chose des deux.
//
// Les nombres sont ceux de la banque : la série 4 ; 7 ; 10 ; 15 (moyenne 9,
// médiane 8,5, étendue 11) et le graphique à quatre barres 20, 25, 40, 50.

// ⭐⭐ NOTION SCINDÉE LE 28/08/2026, et cette fiche n'en garde qu'une moitié.
// `stat_statistique` portait DIX micros et deux objets : ce qu'on LIT et compte
// (tableau, graphique, effectifs, fréquences) et ce qu'on CALCULE et interprète
// (moyenne, médiane, étendue). C'est la coupure du BO lui-même, qui énumère
// séparément « effectifs, fréquences », « indicateurs de position » et
// « indicateur de dispersion ».
//
// ⛔ CE QUI EST PARTI, ET OÙ : les blocs « Lire un graphique », « Effectif et
// fréquence », l'usage de lecture, l'exemple du tableau et l'exercice
// d'effectif sont dans `maths-4e-donnees.tsx` (notion `stat_donnee`, même
// identifiant qu'en 6e). Rien n'a été supprimé — un bloc ne peut citer que des
// micros de SA notion, et `verifier-micros` le refuse.
//
// ⭐ CE QUI RESTE ICI est cohérent : moyenne, médiane, étendue, interprétation,
// problèmes, défis. Le titre de la notion a d'ailleurs changé — « Statistiques »
// est devenu « Indicateurs statistiques », qui dit ce qu'elle fait.
// ⚠️ L'URL, elle, ne bouge PAS : `maths/4e/stat-statistique` est indexée, et
// `lib/matrice/coach.ts` associe cet identifiant à la 5e, à la 4e ET à la 3e.

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

// La droite graduée du coach, avec le pas ADAPTATIF de la fiche pilote de 5e
// (`maths-5e-operations-relatifs.tsx`) : une graduation tous les (étendue ÷ 6)
// en laisse sept au maximum. Les POINTS restent posés à leur valeur exacte.
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

// UNE MOYENNE EST UN PARTAGE ÉGAL : on met tout dans un même tas, puis on
// redistribue en parts identiques. La division posée le dit mieux qu'une phrase,
// et elle rappelle que l'effectif est le DIVISEUR — l'erreur la plus fréquente
// étant de diviser par le nombre de valeurs distinctes.
const moyennePosee = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "division",
      numbers: [],
      division: { dividende: "36", diviseur: "4", quotient: "9" },
      display: { showResult: true, compact: true },
      questionLabel: "la somme ÷ l'effectif",
    }}
  />
);

// ⭐ LE DESSIN LE PLUS UTILE DE LA FICHE, et il ne montre pas une série mais DEUX.
// Même moyenne de 9, étendues de 2 et de 14. Sans cette comparaison, l'étendue
// reste un calcul de plus ; avec elle, on voit à quoi elle sert.
// ⛔ EMPILÉES, JAMAIS CÔTE À CÔTE (REGLES.md § 2 ter) : une carte fait 222 px,
// donc 100 px par cellule en deux colonnes, et les valeurs y passeraient sous 8 px.
const memeMoyenneDeuxSeries = (
  <div className="grid grid-cols-1 gap-3">
    {legende(
      graphique([
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
      ], { type: "batons" }),
      "moyenne 9 · étendue 2"
    )}
    {legende(
      graphique([
        { label: "2", value: 2, color: ROUGE },
        { label: "5", value: 5, color: ROUGE },
        { label: "13", value: 13, color: ROUGE },
        { label: "16", value: 16, color: ROUGE },
      ], { type: "batons" }),
      "moyenne 9 · étendue 14"
    )}
  </div>
);

// LA MOYENNE PONDÉRÉE SE CALCULE EN COLONNES, pas de tête. Le tableau ajoute la
// colonne qu'on oublie — le produit valeur × effectif — et rappelle que le
// diviseur est le TOTAL des effectifs, pas le nombre de lignes.
const moyennePonderee = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["note", "effectif", "produit"],
      rows: [
        { values: ["8", "3", "24"] },
        { values: ["12", "5", "60"] },
        { values: ["16", "2", "32"] },
        { values: ["total", "10", "116"] },
      ],
      highlight: { row: 3 },
      caption: "116 ÷ 10 = 11,6",
      display: { compact: true, striped: true },
    }}
  />
);

const pieges = [
  "Diviser par le nombre de lignes du tableau au lieu du total des effectifs : dans une moyenne pondérée, le diviseur est l'effectif total.",
  "Oublier de ranger la série avant de chercher la médiane : la médiane se lit sur la série RANGÉE, jamais dans l'ordre où les valeurs sont données.",
  "Croire que deux séries de même moyenne se ressemblent : la moyenne ne dit rien de la dispersion, c'est l'étendue qui la mesure.",
];

const aRetenir = [
  "L'effectif compte combien de fois une valeur apparaît ; la fréquence compare cet effectif au total.",
  "La moyenne est la somme des valeurs divisée par l'effectif total ; la médiane partage la série rangée en deux moitiés.",
  "L'étendue est l'écart entre la plus grande et la plus petite valeur : c'est le seul des trois indicateurs qui parle de dispersion.",
];

export const ficheStatistiques4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "stat-statistique",
  titre: "Les statistiques",
  accroche:
    "Une série de nombres ne se lit pas d'un coup d'œil. Les statistiques la résument en quelques indicateurs : combien de fois, quelle part, quelle valeur moyenne, quelle valeur du milieu, et quel écart entre les extrêmes. Chacun répond à une question différente.",
  identite: [
    { label: "Les deux comptages", valeur: "L'effectif compte, la fréquence compare" },
    { label: "Les deux « milieux »", valeur: "La moyenne égalise, la médiane partage" },
    { label: "L'écart", valeur: "L'étendue, du minimum au maximum" },
  ],
  definition: {
    texte:
      "Une série statistique est une liste de valeurs relevées sur un groupe. On la range dans un tableau qui associe à chaque valeur son effectif, c'est-à-dire le nombre de fois où elle apparaît. Ce tableau est le point de départ de tous les calculs : on n'additionne jamais des données brutes en vrac.",
  },
  figure: {
    schema: (
      <CanvasRenderer
        figure={{
          kind: "tableau_donnees",
          headers: ["moyen de transport", "effectif"],
          rows: [
            { values: ["à pied", "20"] },
            { values: ["vélo", "25"] },
            { values: ["bus", "40"] },
            { values: ["voiture", "50"] },
          ],
          caption: "135 élèves interrogés en tout",
          display: { compact: true, striped: true },
        }}
      />
    ),
    legende: "Chaque ligne associe une valeur à son effectif. Le total, c'est l'effectif de la série.",
  },
  proprietes: [
    // ⭐ « Lire un graphique » et « Effectif et fréquence » sont parties le
    // 28/08 vers la fiche « Lire et interpréter des données » : leurs micros ont
    // changé de notion avec la scission. Rien n'est perdu — elles y sont, avec
    // leurs dessins déjà mesurés. Ce bloc-ci les remplace en restant du côté des
    // INDICATEURS, qui est ce que cette fiche garde.
    {
      titre: "Ce qu'un indicateur résume, et ce qu'il perd",
      micros: ["stat_interpreter"],
      texte:
        "Un indicateur remplace toute une série par UN seul nombre : c'est sa force et sa limite. La moyenne dit où se situe le centre, mais elle ne dit rien de la dispersion — deux séries très différentes peuvent avoir exactement la même.",
      schema: legende(
        graphique(
          [
            { label: "pied", value: 20 },
            { label: "vélo", value: 25 },
            { label: "bus", value: 40 },
            { label: "voiture", value: 50 },
          ],
          { enAvant: 3 }
        ),
        "la barre la plus haute : 50 élèves"
      ),
    },
    {
      titre: "La moyenne égalise",
      micros: ["stat_moyenne"],
      texte:
        "La moyenne, c'est ce que chacun aurait si l'on mettait tout en commun puis qu'on partageait à parts égales. On additionne, puis on divise par l'effectif.",
      schema: moyennePosee,
    },
    {
      titre: "Médiane et étendue",
      micros: ["stat_mediane", "stat_etendue"],
      texte:
        "Sur la série rangée 4 ; 7 ; 10 ; 15, la médiane 8,5 partage en deux moitiés, et l'étendue 11 mesure l'écart du minimum au maximum.",
      schema: legende(
        droite(
          [
            { value: 4, label: "min", color: BLEU },
            { value: 8.5, label: "méd.", color: ROUGE },
            { value: 15, label: "max", color: BLEU },
          ],
          0,
          16
        ),
        "étendue = 15 − 4 = 11"
      ),
    },
    {
      titre: "Même moyenne, séries différentes",
      micros: ["stat_interpreter"],
      texte:
        "Ces deux séries ont exactement la même moyenne, 9. Pourtant l'une est regroupée et l'autre très dispersée : seule l'étendue fait la différence.",
      schema: memeMoyenneDeuxSeries,
    },
  ],
  reel: {
    texte:
      "À La Réunion, les statistiques décident de choses très concrètes : la pluviométrie de Cilaos qui dit combien dimensionner une ravine, la fréquentation d'une ligne de car qui décide du nombre de départs, les températures de l'année qui servent à orienter une case. Et un chiffre seul ne suffit jamais : une moyenne de 30 mm de pluie par jour ne dit pas s'il est tombé un peu chaque jour ou tout en une nuit de cyclone. C'est exactement à cela que sert l'étendue.",
  },
  historique: {
    texte:
      "Le mot « statistique » vient de l'italien « statista », l'homme d'État : à l'origine, ce sont les chiffres que les États collectent sur eux-mêmes. Le premier grand relevé moderne est le Domesday Book, commandé par Guillaume le Conquérant en 1086 pour recenser toutes les terres d'Angleterre. La médiane, elle, est bien plus récente : c'est Francis Galton qui la popularise à la fin du XIXe siècle, justement parce que la moyenne se laisse trop facilement tirer par une valeur extrême.",
  },
  formule: {
    contexte: "Pour une série de n valeurs",
    expression: "moyenne = somme des valeurs ÷ effectif total",
    legende:
      "Quand les valeurs se répètent, on multiplie chaque valeur par son effectif avant d'additionner : c'est la moyenne pondérée.",
    schema: moyennePonderee,
  },
  methode: [
    {
      titre: "Ranger",
      micros: ["stat_mediane"],
      // Un bloc peut rester sans dessin quand le dessin redirait le texte
      // (arbitrage de Frédéric, 25/08) : la série rangée est déjà dessinée sur la
      // droite graduée de la propriété « Médiane et étendue ».
      texte:
        "Avant toute chose, on range la série de la plus petite valeur à la plus grande. C'est inutile pour la moyenne, mais indispensable pour la médiane et pour l'étendue — et c'est l'oubli le plus fréquent.",
    },
    {
      titre: "Calculer",
      micros: ["stat_moyenne"],
      texte:
        "On dresse le tableau valeur / effectif, on ajoute la colonne des produits, puis on divise par le TOTAL DES EFFECTIFS — et non par le nombre de valeurs distinctes, qui est l'erreur la plus fréquente de la moyenne pondérée.",
      schema: moyennePonderee,
    },
    {
      titre: "Interpréter",
      micros: ["stat_interpreter", "stat_probleme"],
      texte:
        "Un indicateur seul ne conclut rien. On donne toujours au moins deux chiffres : un qui situe le centre — moyenne ou médiane — et un qui dit la dispersion, l'étendue. Puis on répond à la question posée, avec l'unité.",
    },
  ],
  usages: [
    {
      titre: "La série contient une valeur extrême",
      micros: ["stat_mediane", "stat_interpreter"],
      detail:
        "On préfère la MÉDIANE à la moyenne : un seul salaire très élevé tire la moyenne vers le haut sans déplacer la médiane. C'est le cas où les deux indicateurs se séparent le plus.",
      // ⭐ LA TROISIÈME REPRÉSENTATION DU MÊME RELEVÉ. Le tableau donne les
      // nombres, les barres donnent les écarts, le camembert donne les PARTS —
      // c'est le seul des trois où le total est visible d'un coup d'œil, puisque
      // c'est le disque entier. Trois lectures d'une même série, et c'est
      // exactement ce que la micro « lire un graphique » demande de savoir faire.
      schema: legende(
        graphique(
          [
            { label: "pied", value: 20 },
            { label: "vélo", value: 25 },
            { label: "bus", value: 40 },
            { label: "voiture", value: 50 },
          ],
          { type: "camembert" }
        ),
        "le même relevé, en parts du total"
      ),
    },
    {
      titre: "Résumer la série",
      micros: ["stat_moyenne", "stat_mediane", "stat_etendue"],
      detail:
        "Trois indicateurs pour trois questions : quelle valeur si l'on partageait tout également, quelle valeur au milieu, et quel écart entre les extrêmes.",
    },
    {
      titre: "Comparer deux séries",
      micros: ["stat_interpreter", "stat_probleme"],
      detail:
        "On compare d'abord les centres, puis les dispersions. Deux séries de même moyenne peuvent être très différentes : c'est l'étendue qui tranche.",
    },
  ],
  exemples: [
    {
      // ⭐ La série est la même que sur la fiche « Lire et interpréter des
      // données » — l'élève garde ses repères — mais la question change de
      // nature : on ne lit plus, on RÉSUME.
      titre: "Un seul nombre pour toute la série",
      micros: ["stat_moyenne", "stat_interpreter"],
      donnees:
        "On a demandé à 135 élèves comment ils viennent au collège. 20 viennent à pied, 25 à vélo, 40 en bus et 50 en voiture.",
      question: "Une moyenne a-t-elle un sens ici ?",
      schema: graphique(
        [
          { label: "pied", value: 20 },
          { label: "vélo", value: 25 },
          { label: "bus", value: 40 },
          { label: "voiture", value: 50 },
        ],
        { bloc: "exemple", enAvant: 2 }
      ),
      solution:
        "Non, et c'est important. On peut calculer 135 ÷ 4 ≈ 34, mais ce nombre ne veut RIEN dire : « à pied », « à vélo », « en bus » et « en voiture » ne sont pas des valeurs numériques, ce sont des CATÉGORIES.\n\n⭐ Une moyenne suppose des nombres qu'on peut additionner. Sur des catégories, les seuls résumés qui aient un sens sont l'effectif le plus grand — ici la voiture — et les fréquences.\n\n⚠️ C'est le premier réflexe à avoir devant un indicateur : la série s'y prête-t-elle ?",
    },
    {
      titre: "La moyenne pondérée",
      micros: ["stat_moyenne"],
      donnees:
        "Dans une classe, 3 élèves ont eu 8, 5 élèves ont eu 12 et 2 élèves ont eu 16.",
      question: "Quelle est la moyenne de la classe ?",
      schema: moyennePonderee,
      solution:
        "On multiplie chaque note par son effectif : 8 × 3 = 24, 12 × 5 = 60, 16 × 2 = 32. La somme vaut 24 + 60 + 32 = 116, et l'effectif total 3 + 5 + 2 = 10. La moyenne est donc 116 ÷ 10 = 11,6. ⚠️ On divise par 10, l'effectif total, et non par 3, le nombre de notes différentes.",
    },
    {
      titre: "Médiane, étendue, et ce qu'elles disent",
      micros: ["stat_mediane", "stat_etendue", "stat_probleme"],
      donnees: "Une série de quatre relevés : 4 ; 7 ; 10 ; 15.",
      question: "Quelles sont sa médiane et son étendue ?",
      schema: droite(
        [
          { value: 4, label: "4", color: BLEU },
          { value: 7, label: "7", color: BLEU },
          { value: 10, label: "10", color: BLEU },
          { value: 15, label: "15", color: BLEU },
        ],
        0,
        16
      ),
      solution:
        "La série est déjà rangée. Elle compte quatre valeurs, un nombre pair : la médiane est la moyenne des deux valeurs du milieu, soit (7 + 10) ÷ 2 = 8,5. L'étendue est l'écart entre les extrêmes : 15 − 4 = 11. La moyenne, elle, vaut 36 ÷ 4 = 9 — proche de la médiane, ce qui indique une série sans valeur aberrante.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Une série contient 3 ; 8 ; 8 ; 9 ; 12. Calcule sa moyenne, sa médiane et son étendue.",
      correction:
        "Moyenne : (3 + 8 + 8 + 9 + 12) ÷ 5 = 40 ÷ 5 = 8. Médiane : la série est rangée et compte 5 valeurs, la troisième est donc au milieu — c'est 8. Étendue : 12 − 3 = 9. ⭐ Ici moyenne et médiane coïncident, ce qui n'arrive que sur des séries assez régulières.",
      micros: ["stat_moyenne", "stat_mediane", "stat_etendue"],
    },
    {
      question:
        "Une série contient 5 ; 10 ; 15. Un élève calcule la moyenne et répond 30. Où est son erreur ?",
      correction:
        "Il a additionné sans diviser. La somme vaut bien 5 + 10 + 15 = 30, mais la moyenne est cette somme divisée par l'effectif : 30 ÷ 3 = 10. Contrôle : une moyenne est toujours comprise entre la plus petite et la plus grande valeur, donc entre 5 et 15 — 30 était impossible.",
      micros: ["stat_moyenne"],
    },
    {
      question:
        "Quelle est la médiane de la série 4 ; 8 ; 10 ; 14, et quelle est son étendue ?",
      correction:
        "La série est rangée et compte quatre valeurs : la médiane est la moyenne des deux du milieu, soit (8 + 10) ÷ 2 = 9. L'étendue vaut 14 − 4 = 10.",
      micros: ["stat_mediane", "stat_etendue"],
    },
    {
      question:
        "Deux classes ont la même moyenne de 9 au dernier contrôle. Peut-on en conclure qu'elles ont eu des résultats semblables ?",
      correction:
        "Non. La moyenne ne dit rien de la dispersion. Une classe peut avoir des notes toutes proches de 9, et l'autre des notes allant de 2 à 16 : même moyenne, étendues de 2 et de 14. Pour comparer deux séries, il faut au moins deux indicateurs — un centre et une dispersion.",
      micros: ["stat_interpreter", "stat_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesStatistiques4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les statistiques - 4e",
    section: {
      type: "objectif",
      phrase: "Résumer une série en quelques nombres",
      sousPhrase:
        "Effectif, fréquence, moyenne, médiane, étendue : cinq indicateurs, cinq questions différentes.",
      encadre: {
        titre: "L'idée",
        texte: "Un chiffre seul ne conclut jamais : il en faut deux, un centre et une dispersion.",
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
          "La pluviométrie de Cilaos qui dimensionne une ravine, la fréquentation d'une ligne de car, les températures qui orientent une case.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Statistique » vient de « statista », l'homme d'État. La médiane, elle, date du XIXe siècle : la moyenne se laissait trop tirer par une valeur extrême.",
      },
    },
  },
  {
    titre: "Les deux « milieux »",
    badge: "À ne pas confondre",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "La moyenne",
        contenu:
          "On met tout en commun, puis on partage à parts égales. Somme des valeurs ÷ effectif total.",
      },
      droite: {
        variante: "ok",
        titre: "La médiane",
        contenu:
          "On range la série, puis on prend la valeur du milieu. Elle ne se laisse pas tirer par une valeur extrême.",
      },
    },
  },
  {
    titre: "Même moyenne, séries différentes",
    badge: "Le point clé",
    section: {
      type: "objectif",
      phrase: "La moyenne ne dit rien de la dispersion",
      sousPhrase:
        "8 ; 9 ; 9 ; 10 et 2 ; 5 ; 13 ; 16 ont toutes deux pour moyenne 9. Leurs étendues valent 2 et 14.",
      encadre: {
        titre: "Conséquence",
        texte: "Pour comparer deux séries, il faut un centre ET une dispersion.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheStatistiques4e.methode.map((m) => ({
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
      cartes: ficheStatistiques4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "La moyenne pondérée",
    section: {
      type: "exemple",
      enonce: "3 élèves ont 8, 5 élèves ont 12, 2 élèves ont 16.",
      question: "Quelle est la moyenne de la classe ?",
      correction:
        "24 + 60 + 32 = 116, et l'effectif total vaut 10. Donc 116 ÷ 10 = 11,6.",
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
      enonce: "Une série contient 5 ; 10 ; 15. Un élève répond que la moyenne vaut 30.",
      question: "Où est son erreur ?",
      indice: "Une moyenne est toujours entre le minimum et le maximum.",
      correction:
        "Il a additionné sans diviser : 30 ÷ 3 = 10. Et 30 était impossible, puisque hors de l'intervalle 5–15.",
    },
  },
];
