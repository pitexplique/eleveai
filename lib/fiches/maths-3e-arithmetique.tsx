// ─── Fiche de cours : multiples, diviseurs et facteurs premiers (3e) ───────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/arithmetique.bank.ts, notionId entier_arithmetique).
//
// ⭐⭐ CE QUI EST NEUF EN 3e, ET CE QUI NE L'EST PAS — la question a été
// tranchée en lisant les micros, pas en supposant. Le site a DÉJÀ deux fiches
// de 4e sur ce terrain : `maths-4e-divisibilite` et `maths-4e-nombres-premiers`.
// Recopier leur contenu aurait donné une troisième fiche sur les critères de
// divisibilité, et rien sur ce que la 3e ajoute vraiment.
//   4e — reconnaître un multiple, un diviseur, appliquer les critères,
//        reconnaître les nombres premiers jusqu'à 30.
//   3e — DÉCOMPOSER un entier en produit de facteurs premiers, et s'en servir :
//        PGCD, sachets identiques, fraction irréductible.
// 👉 Les deux premières propriétés de cette fiche sont donc des rappels COURTS,
// et tout le poids porte sur la décomposition et son usage. Le renvoi vers les
// fiches de 4e est explicite dans le bloc « Carte d'identité ».
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE, et les nombres
// viennent de la banque :
//   entier_multiple_diviseur   → 12 multiple de 3, 5 diviseur de 35, 6 divise 42
//   entier_critere_divisibilite→ 135 par 3, 250 par 5, 738 par 3, 123 pas par 9
//   entier_nombre_premier      → 17 premier, 21 non, 1 n'est PAS premier
//   entier_decomposer_facteur  → 12 = 2² × 3, 45 = 3² × 5, 2 × 15 refusé
//   entier_pgcd_ppcm           → PGCD(12 ; 18) = 6, les 24 bonbons et 36 biscuits
//   entier_arithmetique_defi   → un pair au-delà de 2 n'est jamais premier
//
// ⛔ LA BANQUE N'EMPLOIE AUCUN CANVAS — vérifié : zéro `canvas:` sur ses 60
// items. La fiche invente donc ses figures, et le choix compte double.
//
// ⭐⭐ LE FIL VISUEL : UN DIVISEUR EST UN CÔTÉ DE RECTANGLE. C'est le même geste
// que la fiche de racine carrée de 3e, où √a était le côté du carré d'aire a —
// et ce n'est pas une coquetterie : les deux notions parlent de la même chose,
// remonter d'une aire à un côté. Ici, `figure_libre` montre que 42 cases se
// rangent en 6 × 7, donc que 6 et 7 divisent 42 ; et que 7 cases ne se rangent
// QUE en 1 × 7, ce qui EST la définition d'un nombre premier. Aucun tableau ne
// fait comprendre ça, et c'est pourtant la seule image qui rend la primalité
// évidente à l'œil.
//
// ⭐ `tableau_donnees` porte le reste, et pour une raison précise : la
// décomposition s'ENSEIGNE sous forme de potence à deux colonnes (le nombre, le
// diviseur premier), et le PGCD se lit en confrontant deux décompositions ligne
// à ligne. C'est un tableau dans les deux cas, pas un dessin.
//
// ⚠️ LARGEURS MESURÉES À 375 px : 222 px pour une carte de propriété, 216 pour
// « La formule », 200 pour un exemple. Plancher de lisibilité : 11 px.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/** Un dessin et sa phrase, sous lui. La phrase peut porter du LaTeX. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

/**
 * UN RECTANGLE DE `lignes × colonnes` CASES.
 *
 * ⭐ `showCellLabels` écrit « 1 » dans chaque case — le composant le fait en
 * dur, et c'est exactement ce qu'on veut : les cases se COMPTENT, et leur
 * nombre est le produit des deux côtés. Ranger 42 cases en 6 × 7, c'est voir
 * que 6 et 7 divisent 42.
 *
 * ⛔⛔ LA TAILLE DE CASE EST CALCULÉE, ET ELLE DOIT L'ÊTRE. Avec le défaut
 * (`cellSize` 32, `padding` 16), le canvas déduit sa largeur du NOMBRE DE
 * COLONNES : 7 colonnes donnent 256 px de cadre, plus large que la carte de
 * 222. Le SVG est alors réduit, et sa police de 13 — qui ne suit pas l'échelle
 * — descend avec lui, sous le plancher de 11 px. On impose donc la largeur du
 * bloc et on en déduit la case : l'échelle vaut 1, la police reste à 13.
 * ⚠️ La HAUTEUR suit le nombre de LIGNES, elle : un rectangle n'est pas carré.
 */
const rectangleDeCases = (
  lignes: number,
  colonnes: number,
  couleur = "#dbeafe",
  bloc: "carte" | "exemple" | "formule" = "carte"
) => {
  const cases: [number, number][] = [];
  for (let l = 0; l < lignes; l++) {
    for (let c = 0; c < colonnes; c++) cases.push([l, c]);
  }
  const largeur = bloc === "exemple" ? 200 : bloc === "formule" ? 216 : 222;
  const padding = 16;
  const cellSize = Math.floor((largeur - 2 * padding) / colonnes);
  return (
    <CanvasRenderer
      figure={
        {
          kind: "figure_libre",
          size: {
            cellSize,
            padding,
            width: colonnes * cellSize + 2 * padding,
            height: lignes * cellSize + 2 * padding,
          },
          grid: { rows: lignes, cols: colonnes, filledCells: cases },
          display: { showGrid: true, showFilled: true, showCellLabels: true },
          colors: { filled: couleur },
        } as never
      }
    />
  );
};

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

export const ficheArithmetique3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  // ⛔ IDENTIFIANT DE NOTION, PAS SLUG LIBRE : `registre.ts` construit la clé
  // par `notionId.replace(/_/g, "-")`. Le notionId du coach est
  // `entier_arithmetique`.
  notion: "entier-arithmetique",
  titre: "Multiples, diviseurs et facteurs premiers",
  accroche:
    "En quatrième, on savait dire si $6$ divise $42$. En troisième, on va plus loin : on DÉMONTE le nombre. $42 = 2 \\times 3 \\times 7$, et cette écriture-là contient tous ses diviseurs à la fois. C'est elle qui permet de trouver un PGCD, de rendre une fraction irréductible, ou de répartir des bonbons en sachets identiques sans en laisser un seul.",
  identite: [
    { label: "Ce qui est neuf en 3e", valeur: "La décomposition en facteurs premiers, et le PGCD" },
    { label: "Déjà vu en 4e", valeur: "Multiples, diviseurs, critères, nombres premiers jusqu'à $30$" },
    { label: "L'idée clé", valeur: "Un entier se démonte en briques premières, d'une seule façon" },
  ],
  definition: {
    texte:
      "Un entier $a$ est un MULTIPLE de $b$ si $a = b \\times k$ pour un entier $k$ ; on dit alors que $b$ est un DIVISEUR de $a$. Un NOMBRE PREMIER est un entier qui possède exactement DEUX diviseurs : $1$ et lui-même. ⭐ Tout entier supérieur à $1$ s'écrit d'une SEULE façon comme un produit de nombres premiers : c'est sa DÉCOMPOSITION EN FACTEURS PREMIERS. ⚠️ $1$ n'est pas premier — il n'a qu'un seul diviseur, pas deux.",
  },
  figure: {
    schema: legende(
      rectangleDeCases(6, 7),
      "$42$ cases rangées en $6 \\times 7$ : $6$ et $7$ divisent $42$",
    ),
    legende:
      "Un diviseur, c'est un côté possible. Les 42 cases se rangent en 6 lignes de 7 : 6 et 7 divisent donc 42, et 42 est leur multiple. On pourrait aussi les ranger en 2 × 21, en 3 × 14, ou en 1 × 42 — chaque rangement possible désigne un diviseur, et il n'y en a pas d'autres.",
  },
  proprietes: [
    {
      titre: "Rappel de 4e : les critères de divisibilité",
      micros: ["entier_critere_divisibilite"],
      texte:
        "Ils évitent de poser la division. Par $2$ : le chiffre des unités est pair. Par $5$ : il finit par $0$ ou $5$. Par $10$ : par $0$. Par $3$ : la SOMME des chiffres est divisible par $3$. Par $9$ : la somme des chiffres est divisible par $9$. ⭐ Pour $738$ : $7 + 3 + 8 = 18$, divisible par $3$ — et par $9$ aussi.",
      schema: tableau({
        headers: ["nombre", "divisible par"],
        rows: [
          { values: ["135", "3 et 5"] },
          { values: ["250", "2, 5 et 10"] },
          { values: ["738", "2, 3 et 9"] },
          { values: ["123", "3, mais pas 9"] },
        ],
        highlight: { row: 3 },
        caption: "1 + 2 + 3 = 6 : divisible par 3, pas par 9",
      }),
    },
    {
      titre: "Un nombre premier ne fait qu'un seul rectangle",
      micros: ["entier_nombre_premier"],
      texte:
        "$7$ a exactement deux diviseurs, $1$ et $7$ : il est PREMIER. $21$, lui, vaut $3 \\times 7$ : il en a quatre, donc il ne l'est pas. ⭐ Les premiers jusqu'à $30$ : $2$, $3$, $5$, $7$, $11$, $13$, $17$, $19$, $23$, $29$. ⚠️ $2$ est le SEUL premier pair — tout autre nombre pair est divisible par $2$ en plus de $1$ et lui-même.",
      schema: legende(
        rectangleDeCases(1, 7, "#fee2e2"),
        "$7$ cases : aucun autre rangement que $1 \\times 7$",
      ),
    },
    {
      titre: "Décomposer, c'est démonter jusqu'aux briques",
      micros: ["entier_decomposer_facteur"],
      texte:
        "On divise par le plus petit premier possible, encore et encore, jusqu'à obtenir $1$. Pour $60$ : par $2$ il reste $30$, par $2$ il reste $15$, par $3$ il reste $5$, par $5$ il reste $1$. Donc $60 = 2^2 \\times 3 \\times 5$. ⚠️ $2 \\times 15$ n'est PAS une décomposition en facteurs premiers : $15$ n'est pas premier, il faut continuer.",
      schema: legende(
        tableau({
          headers: ["on divise", "par"],
          rows: [
            { values: ["60", "2"] },
            { values: ["30", "2"] },
            { values: ["15", "3"] },
            { values: ["5", "5"] },
            { values: ["1", "fini"] },
          ],
          highlight: { row: 4 },
          caption: "60 = 2 × 2 × 3 × 5 = 2² × 3 × 5",
        }),
        "on s'arrête quand il reste $1$",
      ),
    },
    {
      titre: "La décomposition est UNIQUE",
      micros: ["entier_decomposer_facteur"],
      texte:
        "Peu importe par où l'on commence, on aboutit toujours au même produit. $12$ donne $2^2 \\times 3$, que l'on parte de $2 \\times 6$ ou de $3 \\times 4$. ⭐ C'est ce qui rend la décomposition utile : elle est la carte d'identité du nombre, et deux entiers différents n'ont jamais la même.",
      schema: tableau({
        headers: ["on part de", "on arrive à"],
        rows: [
          { values: ["2 × 6", "2 × 2 × 3"] },
          { values: ["3 × 4", "3 × 2 × 2"] },
          { values: ["12 × 1", "2² × 3"] },
        ],
        caption: "trois chemins, un seul résultat",
      }),
    },
    {
      titre: "Le PGCD se lit dans les facteurs communs",
      micros: ["entier_pgcd_ppcm"],
      texte:
        "Le PGCD de deux entiers est leur plus grand diviseur commun. On décompose les deux, puis on garde les facteurs PRÉSENTS DANS LES DEUX, chacun à sa plus petite puissance. $12 = 2^2 \\times 3$ et $18 = 2 \\times 3^2$ : en commun, un $2$ et un $3$, donc $\\text{PGCD} = 6$. ⭐ Et $6$ est bien le plus grand nombre qui divise à la fois $12$ et $18$.",
      schema: tableau({
        headers: ["nombre", "décomposition"],
        rows: [
          { values: ["12", "2 × 2 × 3"] },
          { values: ["18", "2 × 3 × 3"] },
          { values: ["commun", "2 × 3 = 6"] },
        ],
        highlight: { row: 2 },
        caption: "un 2 et un 3 dans les deux : PGCD = 6",
      }),
    },
  ],
  reel: {
    texte:
      "Répartir sans reste, c'est un problème de PGCD, et il se pose partout : constituer des équipes identiques avec 24 filles et 36 garçons, découper un terrain rectangulaire en parcelles carrées les plus grandes possibles, ranger une récolte de letchis en cagettes égales. En informatique, la décomposition en facteurs premiers est la base du chiffrement RSA qui protège les paiements en ligne : multiplier deux grands nombres premiers est instantané, retrouver les deux facteurs à partir du produit demande des siècles de calcul. Toute la sécurité tient dans cet écart.",
  },
  historique: {
    texte:
      "Euclide démontre vers −300, dans les Éléments, qu'il existe une INFINITÉ de nombres premiers — une des plus belles preuves des mathématiques, et elle tient en trois lignes. Il y donne aussi l'algorithme qui porte son nom pour calculer un PGCD par divisions successives. Ératosthène, un siècle plus tard, invente le crible qui trouve tous les premiers jusqu'à un nombre donné en rayant les multiples. Vingt-trois siècles plus tard, on cherche encore de nouveaux nombres premiers : le plus grand connu compte plus de 41 millions de chiffres.",
  },
  formule: {
    contexte: "Le PGCD à partir des décompositions",
    expression: "$\\text{PGCD} = \\text{produit des facteurs communs}$",
    legende:
      "Chaque facteur commun est pris à sa plus petite puissance. 12 = 2² × 3 et 18 = 2 × 3² donnent 2 × 3 = 6.",
    schema: legende(
      tableau(
        {
          headers: ["facteur", "dans 12", "dans 18", "on garde"],
          rows: [
            { values: ["2", "2 fois", "1 fois", "1 fois"] },
            { values: ["3", "1 fois", "2 fois", "1 fois"] },
          ],
          caption: "la plus petite des deux, à chaque fois",
        },
        "formule"
      ),
      "$2 \\times 3 = 6$",
    ),
  },
  methode: [
    {
      titre: "Décomposer : toujours par le plus petit premier",
      micros: ["entier_decomposer_facteur"],
      texte:
        "On essaie $2$, puis $3$, puis $5$, puis $7$… On ne passe au suivant que lorsque le précédent ne divise plus. Cette discipline évite d'oublier un facteur, et donne toujours le même résultat.",
    },
    {
      titre: "Savoir quand s'arrêter de chercher un diviseur",
      micros: ["entier_nombre_premier"],
      texte:
        "Pour tester si $n$ est premier, il suffit d'essayer les premiers dont le carré ne dépasse pas $n$. Pour $97$ : $2$, $3$, $5$, $7$ suffisent, car $11^2 = 121 > 97$. Aucun ne divise, donc $97$ est premier.",
    },
    {
      titre: "PGCD : décomposer les deux, puis intersecter",
      micros: ["entier_pgcd_ppcm"],
      texte:
        "On écrit les deux décompositions l'une sous l'autre, on entoure ce qui est dans LES DEUX, et on multiplie. ⚠️ On garde la plus PETITE puissance : un facteur présent deux fois d'un côté et une fois de l'autre n'est commun qu'une fois.",
    },
    {
      titre: "Rendre une fraction irréductible",
      micros: ["entier_pgcd_ppcm"],
      texte:
        "On divise le numérateur et le dénominateur par leur PGCD, et c'est fini en une étape. $\\frac{24}{36}$ : le PGCD vaut $12$, donc la fraction irréductible est $\\frac{2}{3}$. Simplifier par un diviseur plus petit marche aussi, mais il faut alors recommencer.",
    },
  ],
  usages: [
    {
      titre: "Faire des parts identiques sans reste",
      micros: ["entier_pgcd_ppcm"],
      detail:
        "Le plus grand nombre de parts identiques que l'on peut former avec deux quantités est leur PGCD. C'est le problème des sachets, des équipes, des bouquets.",
    },
    {
      titre: "Simplifier une fraction d'un seul coup",
      micros: ["entier_pgcd_ppcm"],
      detail:
        "Diviser haut et bas par le PGCD donne directement la forme irréductible, sans tâtonner.",
    },
    {
      titre: "Reconnaître un nombre premier",
      micros: ["entier_nombre_premier"],
      detail:
        "Un entier qui résiste à tous les premiers dont le carré ne le dépasse pas est premier. C'est le test complet, et il est court.",
    },
  ],
  exemples: [
    {
      titre: "Décomposer 45",
      donnees: "On veut écrire $45$ comme un produit de nombres premiers.",
      question: "Quelle est sa décomposition ?",
      solution:
        "$45$ n'est pas pair, donc $2$ ne marche pas. Sa somme de chiffres vaut $4 + 5 = 9$, divisible par $3$ : $45 \\div 3 = 15$. Puis $15 \\div 3 = 5$, et $5$ est premier. On obtient $45 = 3 \\times 3 \\times 5 = 3^2 \\times 5$. Contrôle : $9 \\times 5 = 45$. ⚠️ $5 \\times 9$ n'est pas une réponse valable — $9$ n'est pas premier.",
      schema: legende(
        tableau(
          {
            headers: ["on divise", "par"],
            rows: [
              { values: ["45", "3"] },
              { values: ["15", "3"] },
              { values: ["5", "5"] },
              { values: ["1", "fini"] },
            ],
            highlight: { row: 3 },
          },
          "exemple"
        ),
        "$45 = 3^2 \\times 5$",
      ),
    },
    {
      titre: "Les sachets de bonbons",
      donnees:
        "On veut faire des sachets identiques avec $24$ bonbons et $36$ biscuits, sans qu'il reste rien.",
      question: "Quel est le plus grand nombre de sachets possible ?",
      solution:
        "Chaque sachet doit recevoir le même nombre de bonbons et le même nombre de biscuits : le nombre de sachets doit donc diviser $24$ ET $36$. On cherche le plus grand : c'est le PGCD. $24 = 2^3 \\times 3$ et $36 = 2^2 \\times 3^2$. En commun : $2^2$ et $3$, soit $4 \\times 3 = 12$. On peut faire $12$ sachets, avec $2$ bonbons et $3$ biscuits dans chacun. Contrôle : $12 \\times 2 = 24$ et $12 \\times 3 = 36$.",
      schema: legende(
        tableau(
          {
            headers: ["nombre", "décomposition"],
            rows: [
              { values: ["24", "2 × 2 × 2 × 3"] },
              { values: ["36", "2 × 2 × 3 × 3"] },
              { values: ["commun", "2 × 2 × 3 = 12"] },
            ],
            highlight: { row: 2 },
          },
          "exemple"
        ),
        "$\\text{PGCD}(24 ; 36) = 12$",
      ),
    },
    {
      titre: "97 est-il premier ?",
      donnees: "On veut savoir si $97$ est un nombre premier.",
      question: "Comment le prouver sans tout essayer ?",
      solution:
        "Il suffit de tester les nombres premiers dont le carré ne dépasse pas $97$ : $2$ ($4$), $3$ ($9$), $5$ ($25$), $7$ ($49$). Le suivant serait $11$, mais $11^2 = 121 > 97$ : inutile d'aller plus loin. $97$ est impair, sa somme de chiffres vaut $16$ (non divisible par $3$), il ne finit ni par $0$ ni par $5$, et $97 \\div 7 \\approx 13{,}9$ ne tombe pas juste. Aucun diviseur : $97$ est premier. ⭐ Quatre essais ont suffi, au lieu de quatre-vingt-quinze.",
      schema: legende(
        tableau(
          {
            headers: ["on essaie", "son carré", "verdict"],
            rows: [
              { values: ["2", "4", "ne divise pas"] },
              { values: ["3", "9", "ne divise pas"] },
              { values: ["5", "25", "ne divise pas"] },
              { values: ["7", "49", "ne divise pas"] },
              { values: ["11", "121 > 97", "on s'arrête"] },
            ],
            highlight: { row: 4 },
          },
          "exemple"
        ),
        "dès que le carré dépasse, c'est fini",
      ),
    },
  ],
  pieges: [
    "Croire que 1 est premier. Il n'a qu'UN diviseur, et la définition en exige exactement deux. Le laisser entrer casserait l'unicité de la décomposition.",
    "Écrire 30 = 2 × 15 et s'arrêter là. 15 n'est pas premier : la décomposition n'est finie que lorsque TOUS les facteurs le sont — ici 2 × 3 × 5.",
    "Prendre la plus GRANDE puissance pour le PGCD. Avec 12 = 2² × 3 et 18 = 2 × 3², le 2 n'est commun qu'une fois : le PGCD vaut 6, pas 36 (qui est le PPCM).",
    "Confondre multiple et diviseur. 42 est un multiple de 6 ; 6 est un diviseur de 42. Le multiple est le grand, le diviseur est le petit.",
    "Tester tous les nombres jusqu'à n pour savoir si n est premier. On s'arrête dès que le carré du candidat dépasse n — au-delà, le complément aurait déjà été trouvé.",
  ],
  aRetenir: [
    "b divise a si a = b × k : b est le diviseur, a est le multiple.",
    "Un nombre premier a exactement DEUX diviseurs. 1 n'est pas premier, 2 est le seul premier pair.",
    "Tout entier supérieur à 1 se décompose d'une SEULE façon en produit de facteurs premiers.",
    "PGCD : on garde les facteurs communs, chacun à sa plus PETITE puissance.",
    "Diviser numérateur et dénominateur par leur PGCD rend une fraction irréductible en une étape.",
  ],
  entrainement: [
    {
      question: "5 est-il un diviseur de 35 ?",
      micros: ["entier_multiple_diviseur"],
      correction:
        "Oui : 35 = 5 × 7. Le quotient 7 est entier, donc 5 divise 35, et 35 est un multiple de 5.",
    },
    {
      question: "Parmi 5, 6, 8 et 10, lequel est un diviseur de 42 ?",
      micros: ["entier_multiple_diviseur"],
      correction:
        "6, car 42 = 6 × 7. Les autres laissent un reste : 42 ÷ 5 = 8,4 ; 42 ÷ 8 = 5,25 ; 42 ÷ 10 = 4,2.",
    },
    {
      question: "Le nombre 135 est-il divisible par 3 ?",
      micros: ["entier_critere_divisibilite"],
      correction:
        "Oui. 1 + 3 + 5 = 9, et 9 est divisible par 3. Donc 135 l'est aussi : 135 = 3 × 45.",
    },
    {
      question: "123 est-il divisible par 9 ?",
      micros: ["entier_critere_divisibilite"],
      correction:
        "Non. 1 + 2 + 3 = 6, qui est divisible par 3 mais pas par 9. Donc 123 est divisible par 3, pas par 9.",
    },
    {
      question: "Parmi 9, 15, 17 et 21, lequel est premier ?",
      micros: ["entier_nombre_premier"],
      correction:
        "17. Les autres se décomposent : 9 = 3 × 3, 15 = 3 × 5, 21 = 3 × 7. Chacun a donc plus de deux diviseurs.",
    },
    {
      question: "Pourquoi 21 n'est-il pas premier ?",
      micros: ["entier_nombre_premier"],
      correction:
        "Parce que 21 = 3 × 7. Il a quatre diviseurs — 1, 3, 7 et 21 — alors qu'un nombre premier n'en a que deux.",
    },
    {
      question: "Décomposer 12 en produit de facteurs premiers.",
      micros: ["entier_decomposer_facteur"],
      correction:
        "12 ÷ 2 = 6, 6 ÷ 2 = 3, et 3 est premier. Donc 12 = 2 × 2 × 3 = 2² × 3. ⚠️ Ni 2 × 6 ni 3 × 4 ne conviennent : 6 et 4 ne sont pas premiers.",
    },
    {
      question: "Un élève écrit : « 2 × 15 est la décomposition de 30 ». A-t-il raison ?",
      micros: ["entier_decomposer_facteur"],
      correction:
        "Non. 15 n'est pas premier : il vaut 3 × 5. La décomposition complète est 30 = 2 × 3 × 5.",
    },
    {
      question: "Quel est le PGCD de 12 et 18 ?",
      micros: ["entier_pgcd_ppcm"],
      correction:
        "12 = 2² × 3 et 18 = 2 × 3². Les facteurs communs, à leur plus petite puissance, sont 2 et 3 : le PGCD vaut 6. On vérifie : 6 divise bien 12 (= 6 × 2) et 18 (= 6 × 3), et aucun nombre plus grand ne le fait.",
    },
    {
      question: "Pourquoi un nombre pair supérieur à 2 n'est-il jamais premier ?",
      micros: ["entier_arithmetique_defi"],
      correction:
        "Parce qu'il est divisible par 2, en plus de 1 et de lui-même : il a donc au moins trois diviseurs. Seul 2 échappe à la règle, puisque pour lui le diviseur 2 EST le nombre lui-même.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=3e",
};

// ─── MODE CLASSE ───────────────────────────────────────────────────────────────
// ⚠️ AUCUN LaTeX ICI : les diapos ne passent pas par `TexteMath`. On écrit donc
// « deux au carré fois trois », ce que le professeur prononce de toute façon.
export const slidesArithmetique3e: ClasseSlide[] = [
  {
    titre: "Démonter un nombre",
    badge: "Ce qu'on cherche",
    section: {
      type: "objectif",
      phrase: "Quarante-deux, c'est deux fois trois fois sept. Et rien d'autre.",
      sousPhrase:
        "En quatrième, on savait dire si six divise quarante-deux. En troisième, on démonte le nombre entièrement — et cette écriture contient tous ses diviseurs à la fois.",
      encadre: {
        titre: "L'idée",
        texte:
          "Tout entier plus grand que un s'écrit d'une SEULE façon comme un produit de nombres premiers.",
      },
    },
  },
  {
    titre: "Un diviseur, c'est un côté",
    badge: "On le voit",
    teinte: "definition",
    schema: rectangleDeCases(6, 7),
    section: {
      type: "objectif",
      phrase: "Quarante-deux cases se rangent en six lignes de sept",
      sousPhrase:
        "Chaque rangement possible désigne un diviseur. Six et sept divisent quarante-deux. On pourrait aussi ranger en deux fois vingt et un, ou trois fois quatorze.",
      encadre: {
        titre: "Le vocabulaire",
        texte:
          "Six est un DIVISEUR de quarante-deux. Quarante-deux est un MULTIPLE de six. Le multiple est le grand, le diviseur est le petit.",
      },
    },
  },
  {
    titre: "Le nombre premier ne se range que d'une façon",
    badge: "La définition, en image",
    teinte: "propriete",
    schema: rectangleDeCases(1, 7, "#fee2e2"),
    section: {
      type: "objectif",
      phrase: "Sept cases : une seule ligne, ou sept lignes d'une case",
      sousPhrase:
        "Aucun autre rectangle n'est possible. C'est exactement ce que dit la définition : un nombre premier a deux diviseurs, un et lui-même.",
      encadre: {
        titre: "Attention",
        texte:
          "Un n'est PAS premier : il n'a qu'un seul diviseur, et la définition en exige deux.",
      },
    },
  },
  {
    titre: "Décomposer soixante",
    badge: "La méthode",
    teinte: "methode",
    section: {
      type: "etapes",
      etapes: [
        "On divise par le plus petit premier possible : soixante divisé par deux fait trente.",
        "Encore deux : trente divisé par deux fait quinze.",
        "Deux ne marche plus. On passe à trois : quinze divisé par trois fait cinq.",
        "Cinq est premier : cinq divisé par cinq fait un. On s'arrête.",
        "Soixante égale deux fois deux fois trois fois cinq, c'est-à-dire deux au carré fois trois fois cinq.",
      ],
    },
  },
  {
    titre: "Le piège de la décomposition",
    badge: "S'arrêter trop tôt",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "ok",
        titre: "Décomposé jusqu'au bout",
        contenu:
          "Trente égale deux fois trois fois cinq. Les trois facteurs sont premiers : on ne peut plus rien démonter.",
      },
      droite: {
        variante: "piege",
        titre: "Arrêté en chemin",
        contenu:
          "Trente égale deux fois quinze. Quinze n'est pas premier : il vaut trois fois cinq. Ce n'est donc pas une décomposition en facteurs premiers.",
      },
    },
  },
  {
    titre: "Le PGCD se lit dans les facteurs communs",
    badge: "Ce qui est dans les deux",
    teinte: "propriete",
    schema: (
      <div className="scale-150">
        {/* La diapo est projetée : le tableau peut occuper toute la place. */}
        <CanvasRenderer
          figure={
            {
              kind: "tableau_donnees",
              display: { compact: false, striped: true },
              headers: ["nombre", "décomposition"],
              rows: [
                { values: ["12", "2 × 2 × 3"] },
                { values: ["18", "2 × 3 × 3"] },
                { values: ["commun", "2 × 3 = 6"] },
              ],
              highlight: { row: 2 },
            } as never
          }
        />
      </div>
    ),
    section: {
      type: "objectif",
      phrase: "Un deux et un trois dans les deux : le PGCD vaut six",
      sousPhrase:
        "On décompose les deux nombres, on garde ce qui est présent dans les deux, chacun à sa plus PETITE puissance, et on multiplie.",
      encadre: {
        titre: "Le piège",
        texte:
          "On garde la plus petite puissance, pas la plus grande. Le deux est deux fois dans douze mais une seule fois dans dix-huit : il ne compte qu'une fois.",
      },
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    teinte: "exemple",
    section: {
      type: "exemple",
      enonce:
        "On veut faire des sachets identiques avec vingt-quatre bonbons et trente-six biscuits, sans qu'il reste rien.",
      question: "Quel est le plus grand nombre de sachets possible ?",
      correction:
        "Le nombre de sachets doit diviser vingt-quatre ET trente-six : on cherche donc leur plus grand diviseur commun. Vingt-quatre égale deux fois deux fois deux fois trois. Trente-six égale deux fois deux fois trois fois trois. En commun, deux fois deux fois trois, c'est-à-dire douze. On peut faire douze sachets, avec deux bonbons et trois biscuits dans chacun. On vérifie : douze fois deux font vingt-quatre, douze fois trois font trente-six.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    teinte: "exercice",
    section: {
      type: "exercice",
      enonce: "On veut savoir si quatre-vingt-dix-sept est un nombre premier.",
      question: "Comment le prouver sans tout essayer ?",
      indice:
        "Il suffit de tester les nombres premiers dont le carré ne dépasse pas quatre-vingt-dix-sept.",
      correction:
        "On essaie deux : quatre-vingt-dix-sept est impair, ça ne marche pas. Trois : la somme des chiffres fait seize, qui n'est pas divisible par trois. Cinq : le nombre ne finit ni par zéro ni par cinq. Sept : quatre-vingt-dix-sept divisé par sept ne tombe pas juste. Le suivant serait onze, mais onze au carré fait cent vingt et un, plus grand que quatre-vingt-dix-sept : inutile d'aller plus loin. Aucun diviseur, donc quatre-vingt-dix-sept est premier. Quatre essais ont suffi au lieu de quatre-vingt-quinze.",
    },
  },
];
