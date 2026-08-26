// ─── Fiche de cours : fractions et nombres rationnels (4e) ─────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/fractions.bank.ts, notionId fraction_nombre).
//
// ⭐ CETTE NOTION VIENT D'ÊTRE SCINDÉE (26/08/2026). Elle portait douze
// micro-compétences, contre une médiane de sept sur les notions de 4e. Le
// découpage suit la ligne de fracture déjà présente dans les prérequis, et il
// reprend celui de la 5e à l'identique :
//   · `fraction_nombre` — CE QU'EST LE NOMBRE : ses écritures, son rang (ici) ;
//   · `fraction_calcul` — LES OPÉRATIONS : sa fiche sœur.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE (règle de Frédéric,
// 26/08). Ce que la banque travaille vraiment, énoncé par énoncé :
//   fraction_egale     → « Quelle fraction est égale à 1/2 ? » → 2/4
//   fraction_simplifier→ « Simplifier 6/8 » → 3/4
//   fraction_decimal   → « À quel nombre décimal correspond 1/2 ? » → 0,5 ; 1/4 → 0,25
//   fraction_rationnel → « Un nombre rationnel peut s'écrire sous la forme… »
//                        → a/b avec b non nul ; « explique pourquoi 0,5 est rationnel »
//   fraction_comparer  → « Quelle fraction est la plus grande ? » 1/2, 1/3, 1/4, 1/5 ;
//                        et 2/5 contre 3/5
// Tous les nombres de la fiche sortent de cette liste, sans exception.
//
// ⭐ SIX DESSINS, DONT TROIS MODÈLES DIFFÉRENTS DU MÊME CANVAS. `fraction` est le
// canvas de la notion, et ses modèles ne montrent pas la même chose :
//   · `circle`  → ce qu'EST une fraction : des parts d'un tout ;
//   · `compare` → deux écritures qui recouvrent la même surface ;
//   · `grid`    → le lien avec le décimal, sur cent carreaux.
// S'y ajoutent le rang sur la droite graduée, la division posée qui fabrique
// l'écriture décimale, et le tableau qui montre qu'on divise EN HAUT ET EN BAS.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

const BLEU = "#2563eb";
const ROUGE = "#dc2626";

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
        // seconde fraction est posée sous sa barre, à une hauteur qui NE DÉPEND
        // PAS de la `size` demandée (mesuré le 26/08 sur la fiche des probas).
        size: { width: bloc === "exemple" ? 208 : 224, height: 200 },
        ...data,
      } as never
    }
  />
);

// La droite graduée du coach, au pas adaptatif de la fiche pilote de 5e : une
// graduation tous les (étendue ÷ 6) en laisse sept au maximum.
// ⚠️ 260 de large et non 360 : à 360 de viewBox, les graduations rendaient
// 8,8 px dans une carte de propriété (mesuré le 24/08).
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

// SIMPLIFIER, C'EST DIVISER EN HAUT ET EN BAS PAR LE MÊME NOMBRE. Le tableau met
// les deux divisions l'une sous l'autre : c'est ce parallélisme qui fait la
// règle, et c'est lui qu'on oublie en ne divisant qu'un seul des deux.
const simplifierTableau = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["", "numérateur", "dénominateur"],
      rows: [
        { values: ["au départ", "6", "8"] },
        { values: ["on divise par", "2", "2"] },
        { values: ["il reste", "3", "4"] },
      ],
      highlight: { row: 1 },
      caption: "6/8 = 3/4 : la valeur ne change pas",
      display: { compact: true, striped: true },
    }}
  />
);

// L'ÉCRITURE DÉCIMALE SE FABRIQUE, elle ne se devine pas : une fraction est un
// quotient, et la division posée le rend visible. C'est aussi ce qui explique
// pourquoi certaines fractions ne tombent jamais juste.
const divisionDecimale = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "division",
      numbers: [],
      division: { dividende: "1", diviseur: "2", quotient: "0,5" },
      display: { showResult: true, compact: true },
      questionLabel: "une fraction est un quotient",
    }}
  />
);

const pieges = [
  "Ne simplifier qu'un seul des deux nombres : on divise le numérateur ET le dénominateur par le même nombre, sinon la valeur change.",
  "Croire qu'une fraction est plus grande parce que son dénominateur l'est : $\\frac{1}{5}$ est plus PETIT que $\\frac{1}{2}$, parce qu'on partage en plus de parts.",
  "Comparer deux fractions de dénominateurs différents sans rien faire : il faut d'abord les mettre au même dénominateur, ou passer par leur écriture décimale.",
];

const aRetenir = [
  "Deux fractions sont égales quand on passe de l'une à l'autre en multipliant — ou en divisant — le numérateur et le dénominateur par le même nombre non nul.",
  "Un nombre rationnel est un nombre qui peut s'écrire $\\frac{a}{b}$, avec a et b entiers et b non nul. Tous les décimaux en sont, puisque 0,5 = $\\frac{1}{2}$.",
  "À numérateurs égaux, la plus grande fraction est celle qui a le plus PETIT dénominateur : plus on partage, plus les parts sont petites.",
];

export const ficheFractionNombre4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "fraction-nombre",
  titre: "Fractions et nombres rationnels",
  accroche:
    "Une même quantité s'écrit d'une infinité de façons : $\\frac{1}{2}$, $\\frac{2}{4}$, $\\frac{50}{100}$, 0,5. Savoir reconnaître que ce sont le même nombre, choisir l'écriture la plus commode et ranger des fractions, c'est tout l'objet de cette fiche — avant de savoir calculer avec.",
  identite: [
    { label: "Le mot de 4e", valeur: "Rationnel : tout nombre qui s'écrit $\\frac{a}{b}$, b non nul" },
    { label: "La propriété clé", valeur: "On multiplie ou divise en HAUT et en BAS" },
    { label: "Le piège", valeur: "Un grand dénominateur fait une petite fraction" },
  ],
  definition: {
    texte:
      "Une fraction $\\frac{a}{b}$, c'est le partage d'un tout en b parts égales dont on prend a. C'est aussi un quotient : le nombre qui, multiplié par b, donne a. Un nombre est dit rationnel lorsqu'il peut s'écrire sous la forme d'une fraction de deux entiers, avec un dénominateur non nul.",
  },
  figure: {
    schema: fraction({
      model: "circle",
      fraction: { numerator: 3, denominator: 4, label: "3/4" },
    }),
    legende: "$\\frac{3}{4}$ : le tout est partagé en 4 parts égales, et on en prend 3.",
  },
  proprietes: [
    {
      titre: "Deux écritures, un seul nombre",
      micros: ["fraction_egale"],
      texte:
        "$\\frac{1}{2}$ et $\\frac{2}{4}$ recouvrent exactement la même surface : ce sont deux écritures du même nombre. On passe de l'une à l'autre en multipliant en haut et en bas par 2.",
      schema: legende(
        fraction({
          model: "compare",
          fractions: [
            { numerator: 1, denominator: 2, label: "1/2" },
            { numerator: 2, denominator: 4, label: "2/4" },
          ],
        }),
        "même longueur coloriée"
      ),
    },
    {
      titre: "Simplifier, c'est diviser des deux côtés",
      micros: ["fraction_simplifier"],
      texte:
        "Simplifier une fraction, c'est diviser le numérateur ET le dénominateur par un même nombre. La valeur ne change pas, seule l'écriture devient plus courte.",
      schema: simplifierTableau,
    },
    {
      titre: "Le rang sur la droite",
      micros: ["fraction_comparer"],
      texte:
        "Posées sur la droite graduée, les fractions se rangent toutes seules. Attention : à numérateur égal, plus le dénominateur est grand, plus la fraction est petite.",
      schema: legende(
        droite(
          [
            { value: 0.2, label: "1/5", color: ROUGE },
            { value: 0.5, label: "1/2", color: BLEU },
          ],
          0,
          1,
          0.2
        ),
        "$\\frac{1}{5}$ est plus PETIT que $\\frac{1}{2}$"
      ),
    },
    {
      titre: "L'écriture décimale",
      micros: ["fraction_decimal"],
      texte:
        "Une fraction est un quotient : en posant la division, on obtient son écriture décimale. $\\frac{1}{2}$ donne 0,5, et $\\frac{1}{4}$ donne 0,25.",
      schema: divisionDecimale,
    },
    {
      titre: "Les nombres rationnels",
      micros: ["fraction_rationnel"],
      texte:
        "Un décimal est toujours un rationnel : 0,5 vaut 50 carreaux sur 100, donc $\\frac{50}{100}$, c'est-à-dire $\\frac{1}{2}$. L'inverse est faux — $\\frac{1}{3}$ n'a pas d'écriture décimale exacte.",
      schema: legende(
        fraction({
          model: "grid",
          grid: { rows: 10, cols: 10, shaded: 50 },
        }),
        "0,5 = $\\frac{50}{100}$ = $\\frac{1}{2}$"
      ),
    },
  ],
  reel: {
    texte:
      "Les fractions sont l'écriture de ce qui se partage. À La Réunion, c'est la recette de rougail qu'on fait pour six quand on est quatre, le partage d'un terrain entre héritiers, la demi-heure de battement entre deux cars. Et le passage à l'écriture décimale est constant : un prix affiché 12,50 €, c'est douze euros et une demi-unité — la caisse, elle, ne connaît que les décimaux, alors que la recette ne parle qu'en fractions.",
  },
  historique: {
    texte:
      "Les Égyptiens, il y a quatre mille ans, n'écrivaient que des fractions de numérateur 1 : pour dire $\\frac{3}{4}$, ils écrivaient $\\frac{1}{2}$ + $\\frac{1}{4}$. Le papyrus Rhind contient une table entière pour décomposer les autres fractions de cette façon. Notre barre de fraction, elle, vient des mathématiciens arabes du XIIe siècle, et le mot « rationnel » ne vient pas de « raison » mais de « ratio », le rapport.",
  },
  formule: {
    contexte: "Pour tout entier k non nul",
    expression: "a / b = (a × k) / (b × k)",
    legende:
      "C'est la propriété qui fonde tout : simplifier, mettre au même dénominateur, comparer. On agit toujours en haut ET en bas.",
    schema: legende(
      fraction({
        model: "bar",
        fraction: { numerator: 3, denominator: 4, label: "3/4 = 6/8" },
      }),
      "quatre parts ou huit, la surface est la même"
    ),
  },
  methode: [
    {
      titre: "Simplifier",
      micros: ["fraction_simplifier"],
      texte:
        "On cherche un nombre qui divise à la fois le numérateur et le dénominateur, on divise les deux, et on recommence tant que c'est possible. On s'arrête quand plus aucun nombre ne divise les deux.",
      schema: (
        <CanvasRenderer
          figure={{
            kind: "tableau_donnees",
            headers: ["", "numérateur", "dénominateur"],
            rows: [
              { values: ["au départ", "12", "18"] },
              { values: ["÷ 2", "6", "9"] },
              { values: ["÷ 3", "2", "3"] },
            ],
            caption: "12/18 = 2/3, en deux étapes",
            display: { compact: true, striped: true },
          }}
        />
      ),
    },
    {
      titre: "Comparer",
      micros: ["fraction_comparer"],
      texte:
        "Si les dénominateurs sont les mêmes, on compare les numérateurs : $\\frac{2}{5}$ est plus petit que $\\frac{3}{5}$. Sinon, on met au même dénominateur, ou on passe par l'écriture décimale.",
      schema: legende(
        fraction({
          model: "compare",
          fractions: [
            { numerator: 2, denominator: 5, label: "2/5" },
            { numerator: 3, denominator: 5, label: "3/5" },
          ],
        }),
        "mêmes parts : on compte, c'est tout"
      ),
    },
    {
      titre: "Reconnaître un rationnel",
      micros: ["fraction_rationnel"],
      // Un bloc peut rester sans dessin quand le dessin redirait le texte
      // (arbitrage de Frédéric, 25/08) : la grille de cent carreaux de la
      // propriété « Les nombres rationnels » montre déjà exactement cela.
      texte:
        "On se demande si le nombre peut s'écrire comme un quotient de deux entiers. Tout entier en est un — 7 vaut $\\frac{7}{1}$ — et tout décimal aussi, en le mettant sur 10, 100 ou 1000.",
    },
  ],
  usages: [
    {
      titre: "Reconnaître deux écritures du même nombre",
      micros: ["fraction_egale", "fraction_simplifier"],
      detail:
        "On simplifie les deux fractions au maximum : si elles aboutissent à la même écriture, ce sont deux écritures du même nombre.",
    },
    {
      titre: "Ranger des fractions",
      micros: ["fraction_comparer"],
      detail:
        "On les met au même dénominateur, ou on calcule leurs écritures décimales, puis on compare les nombres obtenus.",
    },
    {
      titre: "Changer d'écriture",
      micros: ["fraction_decimal", "fraction_rationnel"],
      detail:
        "On pose la division pour aller de la fraction au décimal. Dans l'autre sens, on écrit le décimal sur 10, 100 ou 1000, puis on simplifie.",
    },
  ],
  exemples: [
    {
      titre: "Laquelle est égale à $\\frac{1}{2}$ ?",
      micros: ["fraction_egale", "fraction_simplifier"],
      donnees: "On propose quatre fractions : $\\frac{2}{4}$, $\\frac{1}{3}$, $\\frac{3}{5}$ et $\\frac{2}{3}$.",
      question: "Laquelle est égale à $\\frac{1}{2}$ ?",
      schema: fraction(
        {
          model: "compare",
          fractions: [
            { numerator: 1, denominator: 2, label: "1/2" },
            { numerator: 2, denominator: 4, label: "2/4" },
          ],
        },
        "exemple"
      ),
      solution:
        "C'est $\\frac{2}{4}$. On passe de $\\frac{1}{2}$ à $\\frac{2}{4}$ en multipliant le numérateur et le dénominateur par 2 : 1 × 2 = 2 et 2 × 2 = 4. Les trois autres ne se simplifient pas en $\\frac{1}{2}$ — pour $\\frac{1}{3}$, il faudrait que le dénominateur soit le double du numérateur, ce qui n'est pas le cas.",
    },
    {
      titre: "La plus grande",
      micros: ["fraction_comparer"],
      donnees: "On compare $\\frac{1}{2}$, $\\frac{1}{3}$, $\\frac{1}{4}$ et $\\frac{1}{5}$.",
      question: "Laquelle est la plus grande ?",
      schema: droite(
        [
          { value: 0.2, label: "1/5", color: ROUGE },
          { value: 0.5, label: "1/2", color: BLEU },
        ],
        0,
        1,
        0.2
      ),
      solution:
        "C'est $\\frac{1}{2}$. Les quatre fractions ont le même numérateur, 1 : on partage donc le même tout en 2, 3, 4 ou 5 parts. Plus on partage, plus chaque part est petite. La plus grande est celle qui a le plus PETIT dénominateur, donc $\\frac{1}{2}$. ⚠️ C'est l'inverse de ce que l'intuition dit.",
    },
    {
      titre: "Pourquoi 0,5 est rationnel",
      micros: ["fraction_decimal", "fraction_rationnel"],
      donnees: "On considère le nombre 0,5.",
      question: "Est-ce un nombre rationnel ? Justifie.",
      schema: divisionDecimale,
      solution:
        "Oui. Un nombre est rationnel s'il peut s'écrire comme quotient de deux entiers avec un dénominateur non nul. Or 0,5 se lit « cinq dixièmes », donc 0,5 = $\\frac{5}{10}$, qui se simplifie en $\\frac{1}{2}$ en divisant en haut et en bas par 5. C'est bien un quotient de deux entiers, donc 0,5 est rationnel. La division posée fait le chemin inverse : 1 ÷ 2 = 0,5.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Simplifier $\\frac{6}{8}$ au maximum.",
      correction:
        "6 et 8 sont tous les deux divisibles par 2 : on divise en haut et en bas, ce qui donne $\\frac{3}{4}$. Ensuite, plus aucun nombre ne divise à la fois 3 et 4 : la fraction est irréductible. Donc $\\frac{6}{8}$ = $\\frac{3}{4}$.",
      micros: ["fraction_simplifier"],
    },
    {
      question: "Quelle fraction est la plus grande : $\\frac{2}{5}$ ou $\\frac{3}{5}$ ?",
      correction:
        "Les deux fractions ont le même dénominateur : les parts sont donc de la même taille, et il suffit de comparer les numérateurs. Comme 3 est plus grand que 2, c'est $\\frac{3}{5}$ la plus grande.",
      micros: ["fraction_comparer"],
    },
    {
      question: "À quel nombre décimal correspond $\\frac{1}{4}$ ?",
      correction:
        "Une fraction est un quotient : on pose 1 ÷ 4, ce qui donne 0,25. On peut aussi le retrouver par les fractions égales : $\\frac{1}{4}$ = $\\frac{25}{100}$, et $\\frac{25}{100}$ se lit 0,25.",
      micros: ["fraction_decimal"],
    },
    {
      question:
        "Un nombre rationnel peut s'écrire sous quelle forme ? Le nombre 7 en est-il un ?",
      correction:
        "Un nombre rationnel s'écrit $\\frac{a}{b}$, avec a et b entiers et b NON NUL — la condition sur le dénominateur est essentielle, puisqu'on ne divise jamais par zéro. Et oui, 7 est rationnel : il s'écrit $\\frac{7}{1}$. Tous les entiers et tous les décimaux sont des rationnels.",
      micros: ["fraction_rationnel"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesFractionNombre4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Fractions et rationnels - 4e",
    section: {
      type: "objectif",
      phrase: "Reconnaître, ranger, changer d'écriture",
      sousPhrase:
        "1/2, 2/4, 50/100 et 0,5 sont le même nombre. Savoir le voir, c'est savoir choisir l'écriture la plus commode.",
      encadre: {
        titre: "L'idée",
        texte: "On multiplie ou on divise en haut ET en bas : la valeur ne bouge pas.",
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
          "Une recette de rougail pour six quand on est quatre, un terrain partagé entre héritiers, un prix affiché 12,50 €.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Les Égyptiens n'écrivaient que des fractions de numérateur 1 : pour dire 3/4, ils écrivaient 1/2 + 1/4.",
      },
    },
  },
  {
    titre: "Le mot nouveau",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "Rationnel : tout nombre qui s'écrit a/b",
      sousPhrase:
        "Avec a et b entiers, et b NON NUL. Tous les entiers en sont, tous les décimaux aussi.",
      encadre: {
        titre: "Attention",
        texte: "L'inverse est faux : 1/3 n'a pas d'écriture décimale exacte.",
      },
    },
  },
  {
    titre: "Le piège du dénominateur",
    badge: "Contre-intuitif",
    section: {
      type: "objectif",
      phrase: "Plus le dénominateur est grand, plus la fraction est petite",
      sousPhrase:
        "1/5 est plus petit que 1/2 : on partage le même tout en cinq au lieu de deux.",
      encadre: {
        titre: "À numérateurs égaux",
        texte: "La plus grande est celle qui a le plus PETIT dénominateur.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheFractionNombre4e.methode.map((m) => ({
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
      cartes: ficheFractionNombre4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Pourquoi 0,5 est rationnel",
    section: {
      type: "exemple",
      enonce: "On considère le nombre 0,5.",
      question: "Est-ce un nombre rationnel ?",
      correction:
        "0,5 = 5/10 = 1/2 : c'est un quotient de deux entiers, donc oui.",
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
      enonce: "On compare 1/2, 1/3, 1/4 et 1/5.",
      question: "Laquelle est la plus grande ?",
      indice: "Le tout est le même : ce qui change, c'est le nombre de parts.",
      correction:
        "1/2 : à numérateur égal, la plus grande est celle qui a le plus petit dénominateur.",
    },
  },
];
