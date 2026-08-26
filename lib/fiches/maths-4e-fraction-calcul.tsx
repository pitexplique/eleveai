// ─── Fiche de cours : calculer avec les fractions (4e) ─────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/fractions.bank.ts, notionId fraction_calcul).
//
// ⭐ FICHE SŒUR DE `maths-4e-fraction-nombre.tsx`. La notion a été scindée le
// 26/08 : celle-là dit ce qu'EST le nombre — ses écritures, son rang — celle-ci
// dit ce qu'on en FAIT. Même découpage qu'en 5e, à l'identique.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE (règle de Frédéric,
// 26/08). Ce que la banque travaille vraiment, énoncé par énoncé :
//   fraction_additionner → « Calculer 1/4 + 2/4 »
//   fraction_multiplier  → « Calculer 2/3 × 3/5 »
//   fraction_quantite    → « Calculer 3/4 de 20 » ; « 1/2 de 30 »
//   fraction_inverse     → « Quel est l'inverse de 3/5 ? »
//   fraction_diviser     → « Diviser par 2/3 revient à multiplier par… »
//   fraction_oppose      → « Quel est l'opposé de 3/7 ? »
//   fraction_defi        → « Un élève affirme que 1/2 + 1/3 = 2/5. A-t-il raison ? »
// Tous les nombres de la fiche sortent de cette liste, sans exception.
//
// ⭐ LE DESSIN LE PLUS UTILE EST UN CONTRE-EXEMPLE, ET IL VIENT DU DÉFI DE LA
// BANQUE. « 1/2 + 1/3 = 2/5 » est l'erreur reine de la notion. Posées sur la
// droite graduée, les trois valeurs la tuent en une seconde : 2/5 vaut 0,4, donc
// la prétendue somme serait plus PETITE que 1/2, l'un des deux termes. Impossible.
// Aucune règle récitée ne fait ce travail-là.
//
// ⭐ ET DIVISER SE MONTRE, au lieu de se réciter. « 1/2 ÷ 1/4 = 2 » devient
// évident dès qu'on demande « combien de quarts tiennent dans un demi ? » : le
// modèle `compare` de `fraction` pose les deux barres l'une sous l'autre.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

const BLEU = "#2563eb";
const ROUGE = "#dc2626";
const VERT = "#16a34a";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : c'est ce qui lui permet de porter une
 * vraie fraction. Les LIBELLÉS À L'INTÉRIEUR du dessin, eux, restent en écriture
 * simple — ils sont tracés en <text> SVG, où le LaTeX apparaîtrait en clair.
 */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

const fraction = (
  data: Record<string, unknown>,
  bloc: "carte" | "exemple" = "carte"
) => (
  <CanvasRenderer
    figure={
      {
        kind: "fraction",
        // ⚠️ 200 de haut au minimum : en modèle `compare`, l'étiquette de la
        // seconde fraction est posée sous sa barre, à une hauteur qui ne dépend
        // pas de la `size` demandée (mesuré le 26/08 sur la fiche des probas).
        size: { width: bloc === "exemple" ? 208 : 224, height: 200 },
        ...data,
      } as never
    }
  />
);

const droite = (
  points: { value: number; label: string; color?: string }[],
  min: number,
  max: number,
  pas?: number
) => (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min,
      max,
      step: pas ?? Math.max(1, Math.ceil((max - min) / 6)),
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

// ADDITIONNER DES PARTS DE MÊME TAILLE, C'EST LES METTRE BOUT À BOUT. Un quart
// puis deux quarts font trois quarts, et le dénominateur ne bouge pas — il dit la
// TAILLE des parts, pas leur nombre.
// ⚠️ Hauteur 200 : les étiquettes de parts sont posées à 144 px du haut et la
// phrase du bas à 18 px du bas — sous 180, elles se frôlent (mesuré en 1280).
// ⚠️ ET LA LARGEUR DÉPEND DU BLOC, parce que ce dessin sert DEUX FOIS : dans une
// carte de propriété (222 px) et dans un exemple (199 px). À 224 de cadre partout,
// ses étiquettes « 1/4 » tombaient à 10,7 px dans l'exemple — sous le plancher de
// 11. Un dessin réutilisé doit se redimensionner à chaque emploi.
const additionBoutABout = (bloc: "carte" | "exemple" = "carte") => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width: bloc === "exemple" ? 206 : 224, height: 200 },
      total: "3/4",
      parts: [
        { label: "1/4", value: "1", color: BLEU },
        { label: "2/4", value: "2", color: VERT },
      ],
      questionLabel: "1/4 + 2/4 = 3/4",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
    }}
  />
);

// ⭐ LE CONTRE-EXEMPLE, ET C'EST LE DESSIN LE PLUS UTILE DE LA FICHE. La prétendue
// somme 2/5 vaut 0,4 : elle serait plus PETITE que 1/2, l'un des deux termes
// additionnés. Une somme de deux nombres positifs ne peut pas être plus petite
// que chacun d'eux — l'erreur se voit sans connaître la bonne réponse.
const piegeDeLAddition = legende(
  droite(
    [
      { value: 0.4, label: "2/5 ✗", color: ROUGE },
      { value: 0.5, label: "1/2", color: BLEU },
      { value: 0.833, label: "5/6 ✓", color: VERT },
    ],
    0,
    1,
    0.2
  ),
  "la « somme » serait plus petite qu'un des deux termes"
);

// MULTIPLIER, C'EST PRENDRE UNE PART D'UNE PART. Sur une grille de 3 lignes et
// 5 colonnes, prendre 2 lignes sur 3 puis 3 colonnes sur 5 laisse 6 cases sur 15.
// Les dénominateurs se multiplient parce que les partages se superposent.
const grilleDuProduit = legende(
  fraction({
    model: "grid",
    grid: { rows: 3, cols: 5, shaded: 6 },
  }),
  "$\\frac{2}{3}$ × $\\frac{3}{5}$ = $\\frac{6}{15}$, soit $\\frac{2}{5}$"
);

// UNE FRACTION D'UNE QUANTITÉ, C'EST UN CALCUL EN DEUX TEMPS, et l'ordre importe
// peu : on peut diviser d'abord ou multiplier d'abord. La division posée montre
// le chemin le plus simple à faire de tête.
const fractionDUneQuantite = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "division",
      numbers: [],
      division: { dividende: "20", diviseur: "4", quotient: "5" },
      display: { showResult: true, compact: true },
      questionLabel: "puis 5 × 3 = 15",
    }}
  />
);

// ⭐ OPPOSÉ ET INVERSE, DANS LE MÊME TABLEAU, parce que c'est ensemble qu'on les
// confond. L'un annule par l'ADDITION, l'autre par la MULTIPLICATION : la
// dernière colonne dit lequel fait quoi, et c'est elle qui règle la confusion.
const opposeEtInverse = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["la fraction", "son opposé", "son inverse"],
      rows: [
        { values: ["3/7", "−3/7", "7/3"] },
        { values: ["3/5", "−3/5", "5/3"] },
        { values: ["ce qu'on annule", "par + → 0", "par × → 1"] },
      ],
      highlight: { row: 2 },
      caption: "on retourne pour l'inverse, on change le signe pour l'opposé",
      display: { compact: true, striped: true },
    }}
  />
);

const pieges = [
  "Additionner les dénominateurs : $\\frac{1}{2}$ + $\\frac{1}{3}$ ne fait pas $\\frac{2}{5}$. Le dénominateur dit la TAILLE des parts — on ne peut additionner que des parts de même taille.",
  "Confondre opposé et inverse : l'opposé de $\\frac{3}{7}$ est −$\\frac{3}{7}$, son inverse est $\\frac{7}{3}$. L'un s'annule par l'addition, l'autre par la multiplication.",
  "Oublier de simplifier à la fin : $\\frac{2}{3}$ × $\\frac{3}{5}$ donne $\\frac{6}{15}$, qui n'est pas la forme la plus courte. La bonne réponse est $\\frac{2}{5}$.",
];

const aRetenir = [
  "On n'additionne que des fractions de même dénominateur : sinon, on les met d'abord au même dénominateur.",
  "Pour multiplier, on multiplie les numérateurs entre eux et les dénominateurs entre eux, puis on simplifie.",
  "Diviser par une fraction, c'est multiplier par son inverse : on retourne la seconde fraction et on multiplie.",
];

export const ficheFractionCalcul4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "fraction-calcul",
  titre: "Calculer avec les fractions",
  accroche:
    "Additionner des fractions ne se fait pas comme les multiplier, et c'est là que tout se joue : pour l'addition, il faut des parts de même taille ; pour la multiplication, non. La 4e ajoute les deux dernières opérations — l'inverse, et la division.",
  identite: [
    { label: "La condition de l'addition", valeur: "Des parts de même taille : même dénominateur" },
    { label: "La nouveauté de 4e", valeur: "L'inverse d'une fraction, et la division" },
    { label: "Le réflexe final", valeur: "Simplifier le résultat" },
  ],
  definition: {
    texte:
      "Calculer avec des fractions, c'est faire les quatre opérations sur des nombres écrits en quotient. Chaque opération a sa règle propre : l'addition exige des dénominateurs égaux, la multiplication n'exige rien, et la division se ramène toujours à une multiplication. Le résultat se simplifie à la fin.",
  },
  figure: {
    schema: fraction({
      model: "bar",
      fraction: { numerator: 3, denominator: 4, label: "3/4" },
    }),
    legende: "Le dénominateur dit la taille des parts, le numérateur combien on en prend.",
  },
  proprietes: [
    {
      titre: "Additionner des parts de même taille",
      micros: ["fraction_additionner"],
      texte:
        "Quand les dénominateurs sont égaux, les parts ont la même taille : on les met bout à bout et on additionne les numérateurs. Le dénominateur, lui, ne bouge pas.",
      schema: additionBoutABout(),
    },
    {
      titre: "Le piège : $\\frac{1}{2}$ + $\\frac{1}{3}$ n'est pas $\\frac{2}{5}$",
      micros: ["fraction_defi"],
      texte:
        "Additionner les dénominateurs donne $\\frac{2}{5}$, soit 0,4 — une somme plus PETITE que $\\frac{1}{2}$. C'est impossible. La bonne réponse est $\\frac{5}{6}$, obtenue en mettant au même dénominateur.",
      schema: piegeDeLAddition,
    },
    {
      titre: "Multiplier, c'est une part d'une part",
      micros: ["fraction_multiplier"],
      texte:
        "On multiplie les numérateurs entre eux et les dénominateurs entre eux. Les dénominateurs se multiplient parce que les deux partages se superposent.",
      schema: grilleDuProduit,
    },
    {
      titre: "Une fraction d'une quantité",
      micros: ["fraction_quantite"],
      texte:
        "« $\\frac{3}{4}$ de 20 » est une multiplication : $\\frac{3}{4}$ × 20. En pratique, on divise par le dénominateur, puis on multiplie par le numérateur.",
      schema: fractionDUneQuantite,
    },
    {
      titre: "Opposé et inverse, à ne pas confondre",
      micros: ["fraction_oppose", "fraction_inverse"],
      texte:
        "L'opposé change le signe et s'annule par l'addition. L'inverse retourne la fraction et s'annule par la multiplication : $\\frac{3}{5}$ × $\\frac{5}{3}$ = 1.",
      schema: opposeEtInverse,
    },
    {
      titre: "Diviser, c'est compter combien ça rentre",
      micros: ["fraction_diviser"],
      texte:
        "Diviser $\\frac{1}{2}$ par $\\frac{1}{4}$, c'est demander combien de quarts tiennent dans un demi. La réponse est 2 — et c'est bien $\\frac{1}{2}$ × $\\frac{4}{1}$.",
      schema: legende(
        fraction({
          model: "compare",
          fractions: [
            { numerator: 1, denominator: 2, label: "1/2" },
            { numerator: 1, denominator: 4, label: "1/4" },
          ],
        }),
        "deux quarts tiennent dans un demi"
      ),
    },
  ],
  reel: {
    texte:
      "À La Réunion, on calcule avec des fractions dès qu'on adapte une recette : un rougail prévu pour six quand on est quatre, c'est chaque quantité multipliée par $\\frac{4}{6}$, donc par $\\frac{2}{3}$. La division de fractions, elle, sert dès qu'on partage une matière : combien de portions d'un tiers de litre dans une bouteille d'un litre et demi, combien de planches de trois quarts de mètre dans une planche de six mètres. C'est toujours la même question — combien de fois ça rentre.",
  },
  historique: {
    texte:
      "La règle « diviser, c'est multiplier par l'inverse » a longtemps été enseignée sans être expliquée : au XIXe siècle, les manuels français la présentaient comme un tour de main à retenir. Le mathématicien indien Brahmagupta l'énonçait pourtant déjà au VIIe siècle, avec sa justification — et c'est aussi lui qui a le premier écrit des règles complètes pour calculer avec des nombres négatifs, en les appelant « dettes ».",
  },
  formule: {
    contexte: "Pour diviser par une fraction non nulle",
    // ⚠️ DEUX ANTISLASHS DANS LE SOURCE, sinon KaTeX reçoit du texte cassé : avec
    // un seul, « \t » est la tabulation et « \d » perd son antislash. Le rendu
    // affichait « imes » et « div » — repéré par `.katex-error` dans la page,
    // jamais par le typecheck.
    expression: "$\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$",
    legende:
      "On retourne la SECONDE fraction, jamais la première, et la division devient une multiplication.",
    // ⛔ Pas de schéma ici, et c'est un arbitrage. Les deux dessins qui diraient
    // cette formule sont déjà posés juste au-dessus : le tableau de l'inverse et
    // les deux barres de « combien de quarts dans un demi ». Un dessin qui répète
    // n'apprend rien (Frédéric, 25/08).
  },
  methode: [
    {
      titre: "Mettre au même dénominateur",
      micros: ["fraction_additionner"],
      texte:
        "Pour additionner ou soustraire, on cherche un dénominateur commun — souvent le produit des deux — puis on réécrit chaque fraction avant de calculer. On ne touche aux numérateurs qu'après.",
      schema: (
        <CanvasRenderer
          figure={{
            kind: "tableau_donnees",
            headers: ["au départ", "au même dénominateur"],
            rows: [
              { values: ["1/2", "3/6"] },
              { values: ["1/3", "2/6"] },
              { values: ["la somme", "5/6"] },
            ],
            highlight: { row: 2 },
            caption: "6 est le dénominateur commun",
            display: { compact: true, striped: true },
          }}
        />
      ),
    },
    {
      titre: "Multiplier puis simplifier",
      micros: ["fraction_multiplier", "fraction_quantite"],
      texte:
        "On multiplie en ligne — numérateurs entre eux, dénominateurs entre eux — sans chercher de dénominateur commun. Puis on simplifie le résultat, toujours à la fin.",
      schema: (
        <CanvasRenderer
          figure={{
            kind: "calcul_pose",
            operation: "multiplication",
            numbers: ["2", "3"],
            result: "6",
            display: { showResult: true, compact: true },
            questionLabel: "et 3 × 5 = 15, donc 6/15 = 2/5",
          }}
        />
      ),
    },
    {
      titre: "Retourner pour diviser",
      micros: ["fraction_diviser", "fraction_inverse"],
      // Un bloc peut rester sans dessin quand le dessin redirait le texte
      // (arbitrage de Frédéric, 25/08) : la propriété « Diviser, c'est compter
      // combien ça rentre » porte déjà les deux barres qui le montrent.
      texte:
        "On écrit la division, on retourne la SECONDE fraction, on remplace le signe ÷ par un ×, puis on applique la règle de la multiplication. Retourner la première est l'erreur la plus fréquente.",
    },
  ],
  usages: [
    {
      titre: "Additionner ou soustraire",
      micros: ["fraction_additionner"],
      detail:
        "On vérifie les dénominateurs. S'ils sont égaux, on additionne les numérateurs ; sinon, on met d'abord au même dénominateur.",
    },
    {
      titre: "Multiplier, ou prendre une part",
      micros: ["fraction_multiplier", "fraction_quantite"],
      detail:
        "On multiplie en ligne. Pour une fraction d'une quantité, on divise par le dénominateur puis on multiplie par le numérateur — c'est plus simple de tête.",
    },
    {
      titre: "Diviser",
      micros: ["fraction_diviser", "fraction_inverse"],
      detail:
        "On remplace la division par la multiplication par l'inverse de la seconde fraction, puis on calcule et on simplifie.",
    },
  ],
  exemples: [
    {
      titre: "Deux quarts et un quart",
      micros: ["fraction_additionner"],
      donnees: "On veut calculer $\\frac{1}{4}$ + $\\frac{2}{4}$.",
      question: "Quel est le résultat ?",
      schema: additionBoutABout("exemple"),
      solution:
        "Les deux fractions ont le même dénominateur, 4 : leurs parts ont donc la même taille et on peut les mettre bout à bout. On additionne les numérateurs, 1 + 2 = 3, et on garde le dénominateur : le résultat est $\\frac{3}{4}$. ⚠️ Le dénominateur ne s'additionne pas — il dit la taille des parts, qui ne change pas.",
    },
    {
      titre: "Un produit à simplifier",
      micros: ["fraction_multiplier"],
      donnees: "On veut calculer $\\frac{2}{3}$ × $\\frac{3}{5}$.",
      question: "Quel est le résultat, sous sa forme la plus simple ?",
      schema: grilleDuProduit,
      solution:
        "On multiplie en ligne : les numérateurs entre eux, 2 × 3 = 6, et les dénominateurs entre eux, 3 × 5 = 15. Le résultat est $\\frac{6}{15}$. On simplifie ensuite en divisant en haut et en bas par 3 : $\\frac{6}{15}$ = $\\frac{2}{5}$. ⚠️ On ne cherche PAS de dénominateur commun pour une multiplication — c'est la règle de l'addition, pas celle-ci.",
    },
    {
      titre: "Trois quarts de vingt",
      micros: ["fraction_quantite", "fraction_diviser"],
      donnees: "Une caisse contient 20 letchis. On en prend les $\\frac{3}{4}$.",
      question: "Combien de letchis prend-on ?",
      schema: fractionDUneQuantite,
      solution:
        "« Les $\\frac{3}{4}$ de 20 » signifie $\\frac{3}{4}$ × 20. En pratique on divise d'abord par le dénominateur : 20 ÷ 4 = 5, ce qui donne la taille d'un quart. Puis on multiplie par le numérateur : 5 × 3 = 15. On prend donc 15 letchis. Contrôle : 15 est bien inférieur à 20, et supérieur à la moitié — ce qui est cohérent, puisque $\\frac{3}{4}$ est plus grand que $\\frac{1}{2}$.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Un élève affirme que $\\frac{1}{2}$ + $\\frac{1}{3}$ = $\\frac{2}{5}$. A-t-il raison ? Justifie sans faire le calcul exact.",
      correction:
        "Non. On peut le voir sans calculer : $\\frac{2}{5}$ vaut 0,4, ce qui est plus PETIT que $\\frac{1}{2}$. Or une somme de deux nombres positifs est forcément plus grande que chacun d'eux. Il a additionné les dénominateurs, ce qui est interdit. La bonne méthode est de mettre au même dénominateur : $\\frac{1}{2}$ = $\\frac{3}{6}$ et $\\frac{1}{3}$ = $\\frac{2}{6}$, donc la somme vaut $\\frac{5}{6}$.",
      micros: ["fraction_additionner", "fraction_defi"],
    },
    {
      question: "Quel est l'inverse de $\\frac{3}{5}$, et quel est son opposé ?",
      correction:
        "L'inverse s'obtient en échangeant numérateur et dénominateur : c'est $\\frac{5}{3}$. On le vérifie en multipliant, $\\frac{3}{5}$ × $\\frac{5}{3}$ = $\\frac{15}{15}$ = 1. L'opposé, lui, s'obtient en changeant le signe : c'est −$\\frac{3}{5}$, et on le vérifie en additionnant, $\\frac{3}{5}$ + (−$\\frac{3}{5}$) = 0.",
      micros: ["fraction_inverse", "fraction_oppose"],
    },
    {
      question: "Diviser par $\\frac{2}{3}$ revient à multiplier par quoi ?",
      correction:
        "Par $\\frac{3}{2}$, c'est-à-dire par l'inverse de $\\frac{2}{3}$. Diviser par une fraction, c'est multiplier par son inverse : on retourne la SECONDE fraction et on remplace le signe ÷ par un ×.",
      micros: ["fraction_diviser"],
    },
    {
      question: "Calculer $\\frac{1}{2}$ de 30.",
      correction:
        "« La moitié de 30 » s'écrit $\\frac{1}{2}$ × 30. On divise par le dénominateur : 30 ÷ 2 = 15, puis on multiplie par le numérateur : 15 × 1 = 15. Le résultat est 15.",
      micros: ["fraction_quantite"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesFractionCalcul4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Calculer avec les fractions - 4e",
    section: {
      type: "objectif",
      phrase: "Les quatre opérations sur les quotients",
      sousPhrase:
        "L'addition exige des parts de même taille. La multiplication n'exige rien. La division se ramène toujours à une multiplication.",
      encadre: {
        titre: "L'idée",
        texte: "Chaque opération a sa règle propre — et elles ne se ressemblent pas.",
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
          "Un rougail prévu pour six quand on est quatre, ou combien de planches de trois quarts de mètre dans une planche de six mètres.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Brahmagupta énonçait « diviser, c'est multiplier par l'inverse » au VIIe siècle, avec sa justification — que les manuels du XIXe omettaient encore.",
      },
    },
  },
  {
    titre: "L'erreur reine",
    badge: "À ne jamais faire",
    section: {
      type: "objectif",
      phrase: "1/2 + 1/3 ne fait pas 2/5",
      sousPhrase:
        "2/5 vaut 0,4 : la « somme » serait plus petite que 1/2, l'un des deux termes. Impossible.",
      encadre: {
        titre: "Pourquoi",
        texte: "Le dénominateur dit la TAILLE des parts. On n'additionne que des parts de même taille.",
      },
    },
  },
  {
    titre: "Opposé ou inverse ?",
    badge: "À ne pas confondre",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "L'opposé",
        contenu:
          "On change le signe : l'opposé de 3/7 est −3/7. Il s'annule par l'ADDITION, et donne 0.",
      },
      droite: {
        variante: "ok",
        titre: "L'inverse",
        contenu:
          "On retourne la fraction : l'inverse de 3/5 est 5/3. Il s'annule par la MULTIPLICATION, et donne 1.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheFractionCalcul4e.methode.map((m) => ({
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
      cartes: ficheFractionCalcul4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Un produit à simplifier",
    section: {
      type: "exemple",
      enonce: "On veut calculer 2/3 × 3/5.",
      question: "Quel est le résultat, sous sa forme la plus simple ?",
      correction:
        "2 × 3 = 6 et 3 × 5 = 15, donc 6/15. On simplifie par 3 : le résultat est 2/5.",
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
      enonce: "Diviser par 2/3 revient à multiplier par quoi ?",
      question: "Donne la fraction, et explique pourquoi.",
      indice: "On retourne la SECONDE fraction.",
      correction:
        "Par 3/2, l'inverse de 2/3 : diviser par une fraction, c'est multiplier par son inverse.",
    },
  },
];
