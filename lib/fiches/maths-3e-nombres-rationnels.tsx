// ─── Fiche de cours : les nombres rationnels (3e) ─────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/nombres_rationnels.bank.ts, notionId `fraction_rationnel`, 50 items).
//
// ⭐⭐ QUATRIÈME ET DERNIÈRE NOTION DE 3e SANS AUCUNE MICRO COMMUNE AVEC LA 4e —
// le critère mesuré qui a décidé de l'ordre d'écriture des fiches de 3e, après
// `fonction_generalite`, `litteral_calcul` et `entier_puissance`.
//
// ⚠️ MAIS L'ABSENCE DE MICRO COMMUNE NE VEUT PAS DIRE ABSENCE DE SUJET COMMUN,
// et c'est le piège de cette fiche-là. Additionner, multiplier et comparer des
// fractions s'enseignent depuis la 6e, et la 4e possède `fraction_nombre` et
// `fraction_calcul`. Réécrire ici un cours de calcul fractionnaire ferait
// doublon avec trois classes à la fois.
// 👉 CE QUI APPARTIENT EN PROPRE À LA 3e, ET QUI PORTE LA FICHE :
//   · LE MOT « RATIONNEL » ET L'IDÉE D'UNE SEULE FAMILLE. Un entier, un
//     décimal et une fraction ne sont pas trois espèces de nombres : ce sont
//     trois écritures du même objet, $\dfrac{a}{b}$ avec $b \neq 0$. La banque
//     le demande cinq fois de suite — « 5 est-il rationnel ? », « 0,25 est-il
//     rationnel ? », « −2,5 est-il rationnel ? » — et la réponse est oui à
//     chaque fois, ce qui est précisément ce qui surprend.
//   · ⭐ LA DENSITÉ. `fraction_rationnel_defi` pose « entre deux nombres
//     rationnels, il n'y a aucun autre nombre rationnel. A-t-il raison ? » et
//     « trouve un rationnel strictement compris entre 1/2 et 3/4 ». C'est une
//     idée de 3e, elle a une réponse CONSTRUCTIVE — la moyenne — et elle change
//     la façon dont un élève se représente la droite graduée.
// Le calcul est donc traité, puisque la banque l'interroge, mais en rappel.
//
// ⭐ LES 50 ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE — la règle du 31/08, née de
// l'arbre de probabilités inventé en 4e :
//   fraction_rationnel_reconnaitre → a/b avec b ≠ 0 ; entiers et décimaux inclus
//   fraction_rationnel_ecriture    → passer de la fraction au décimal, et retour
//   fraction_rationnel_comparer    → même dénominateur, puis ⛔ les NÉGATIFS
//   fraction_rationnel_calculer    → additionner, multiplier, et 1/2 + 1/3
//   fraction_rationnel_defi        → la densité, la forme irréductible
//
// ⛔ LE PIÈGE DES NÉGATIFS A SA PROPRE PROPRIÉTÉ. La banque demande deux fois
// pourquoi $-\dfrac{3}{4} < -\dfrac{1}{2}$, et c'est contre-intuitif : le nombre
// dont la valeur absolue est la plus GRANDE est le plus PETIT. Une droite
// graduée le règle en un dessin ; une phrase, jamais.
//
// ⚠️ LES LIBELLÉS DES DESSINS SONT EN ÉCRITURE SIMPLE (« 3/4 », « −1/2 ») : ils
// sont tracés en <text> SVG, où `$\dfrac{3}{4}$` s'afficherait en clair.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut porter du LaTeX.
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
 * La droite graduée, avec des rationnels posés dessus.
 * ⛔ AUCUN POINT NE TOMBE SUR `min` NI SUR `max`. Mesuré par la session maths le
 * 28/08/2026 : `number_line` CENTRE son étiquette sur la valeur, donc un point
 * posé sur une borne déborde de la moitié de sa largeur et le cadre le rogne.
 * Les bornes sont ici toujours plus larges que les points.
 * ⚠️ Le canvas décale ses étiquettes en HAUTEUR quand elles se suivent de près :
 * deux libellés qui se recouvrent horizontalement ne sont pas forcément un
 * défaut — il faut regarder leur `y`.
 */
const droite = (
  data: Record<string, unknown>,
  bloc: "carte" | "exemple" = "carte"
) => (
  <CanvasRenderer
    figure={
      {
        kind: "number_line",
        display: {
          showTicks: true,
          showValues: true,
          showPoints: true,
          showPointLabels: true,
          showZero: true,
        },
        size: { width: bloc === "exemple" ? 200 : 222, height: 120 },
        ...data,
      } as never
    }
  />
);

export const ficheNombresRationnels3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "fraction-rationnel",
  titre: "Les nombres rationnels",
  accroche:
    "Depuis la sixième, les entiers, les décimaux et les fractions ressemblent à trois familles séparées. La troisième révèle qu'il n'y en a qu'une : $5$, $0{,}25$ et $\\dfrac{3}{4}$ s'écrivent tous sous la forme $\\dfrac{a}{b}$, et portent donc le même nom — nombres rationnels. Cette unification n'est pas qu'un mot : elle permet de les poser tous sur la même droite, et de découvrir qu'entre deux d'entre eux, aussi proches soient-ils, il s'en cache toujours un autre.",
  identite: [
    { label: "La forme", valeur: "$\\dfrac{a}{b}$ avec $a$ et $b$ entiers, et $b \\neq 0$" },
    { label: "Qui en fait partie", valeur: "Tous les entiers, tous les décimaux, toutes les fractions" },
    { label: "Le piège", valeur: "$-\\dfrac{3}{4}$ est plus PETIT que $-\\dfrac{1}{2}$" },
  ],
  definition: {
    texte:
      "Un nombre rationnel est un nombre qui peut s'écrire sous la forme $\\dfrac{a}{b}$, où $a$ et $b$ sont des entiers relatifs et où $b$ n'est pas nul. La condition $b \\neq 0$ n'est pas une précaution d'écriture : une division par zéro n'a aucun sens, donc une telle écriture ne désigne aucun nombre. Un même rationnel possède une infinité d'écritures — $\\dfrac{3}{4}$, $\\dfrac{6}{8}$, $\\dfrac{75}{100}$ — mais une seule forme irréductible, celle où le numérateur et le dénominateur n'ont plus de diviseur commun.",
  },
  figure: {
    schema: droite({
      min: -1,
      max: 2,
      step: 1,
      points: [
        { value: -0.75, label: "-3/4" },
        { value: 0.5, label: "1/2" },
        { value: 1.5, label: "3/2" },
      ],
    }),
    legende:
      "Négatifs, positifs, entiers ou non : tous les rationnels vivent sur la même droite, et s'y comparent comme n'importe quels nombres.",
  },
  proprietes: [
    {
      titre: "Une seule famille, trois écritures",
      texte:
        "Tout entier est rationnel, car $5 = \\dfrac{5}{1}$. Tout décimal l'est aussi, car $0{,}25 = \\dfrac{25}{100}$, et $-2{,}5 = \\dfrac{-5}{2}$. Il n'existe donc pas trois sortes de nombres à opposer : il y a une seule famille, et les écritures décimale et fractionnaire en sont deux vues. La question « ce nombre est-il rationnel ? » revient à demander si l'on peut l'écrire comme un quotient de deux entiers.",
      schema: legende(
        tableau({
          headers: ["nombre", "sous forme a/b", "rationnel ?"],
          rows: [
            { values: ["5", "5/1", "oui"] },
            { values: ["0,25", "25/100", "oui"] },
            { values: ["−2,5", "−5/2", "oui"] },
          ],
          caption: "trois écritures, une famille",
        }),
        "La forme $\\dfrac{a}{b}$ est le critère : si on peut l'écrire ainsi, c'est un rationnel."
      ),
      micros: ["fraction_rationnel_reconnaitre"],
    },
    {
      titre: "Passer d'une écriture à l'autre",
      texte:
        "D'une fraction vers un décimal, on divise : $\\dfrac{3}{4} = 3 \\div 4 = 0{,}75$. En sens inverse, on lit le dernier rang décimal — $0{,}4$ se lit « quatre dixièmes », donc $\\dfrac{4}{10}$, que l'on simplifie en $\\dfrac{2}{5}$. Toute cette manœuvre suppose que la division tombe juste ; ce n'est pas toujours le cas, et $\\dfrac{1}{3}$ donne $0{,}333\\ldots$ sans jamais s'arrêter — le nombre reste rationnel, c'est son écriture décimale qui est infinie.",
      schema: legende(
        <CanvasRenderer
          figure={
            {
              kind: "fraction",
              model: "grid",
              size: { width: 222, height: 150 },
              grid: { rows: 2, cols: 2, shaded: 1 },
              fraction: { numerator: 1, denominator: 4, label: "0,25" },
              display: { showLabel: true, showFraction: true },
            } as never
          }
        />,
        "Une case sur quatre : c'est $\\dfrac{1}{4}$, et c'est aussi $0{,}25$."
      ),
      micros: ["fraction_rationnel_ecriture"],
    },
    {
      titre: "Comparer : ramener au même dénominateur",
      texte:
        "Deux fractions de même dénominateur se comparent par leurs numérateurs : $\\dfrac{2}{3} > \\dfrac{1}{3}$. Sinon, on les ramène au même dénominateur. Pour $\\dfrac{3}{4}$ et $\\dfrac{2}{3}$, on prend 12 : cela donne $\\dfrac{9}{12}$ et $\\dfrac{8}{12}$, donc $\\dfrac{3}{4}$ est la plus grande. Une autre voie, souvent plus rapide, consiste à passer les deux en écriture décimale.",
      schema: legende(
        <CanvasRenderer
          figure={
            {
              kind: "fraction",
              model: "compare",
              // ⛔ 160 NE SUFFIT PAS. Le canvas pose la seconde barre a y = 120
              // en dur, et son etiquette encore plus bas : « 2/3 » sortait du
              // cadre. Mesure le 02/09/2026.
              size: { width: 222, height: 200 },
              fractions: [
                { numerator: 3, denominator: 4, label: "3/4" },
                { numerator: 2, denominator: 3, label: "2/3" },
              ],
              display: { showLabel: true, showFraction: true },
            } as never
          }
        />,
        "Les deux barres se lisent d'un coup : $\\dfrac{3}{4}$ dépasse $\\dfrac{2}{3}$."
      ),
      micros: ["fraction_rationnel_comparer"],
    },
    {
      titre: "Chez les négatifs, tout s'inverse",
      texte:
        "C'est le piège du chapitre. Entre $-\\dfrac{3}{4}$ et $-\\dfrac{1}{2}$, le plus petit est $-\\dfrac{3}{4}$ — alors que $\\dfrac{3}{4}$ est le plus GRAND des deux positifs. La raison se voit sur la droite graduée : plus on s'éloigne de zéro vers la gauche, plus le nombre est petit. Comparer deux négatifs, c'est donc comparer leurs distances à zéro, puis inverser la conclusion.",
      schema: legende(
        droite({
          min: -1,
          max: 1,
          step: 1,
          points: [
            { value: -0.75, label: "-3/4" },
            { value: -0.5, label: "-1/2" },
          ],
        }),
        "$-\\dfrac{3}{4}$ est à gauche de $-\\dfrac{1}{2}$ : il est donc plus petit."
      ),
      micros: ["fraction_rationnel_comparer"],
    },
    {
      titre: "Additionner : le dénominateur d'abord",
      texte:
        "On n'additionne des fractions que si elles ont le même dénominateur, et l'on ajoute alors les numérateurs seulement : $\\dfrac{1}{3} + \\dfrac{2}{3} = \\dfrac{3}{3} = 1$. Sinon, il faut d'abord les mettre au même dénominateur : $\\dfrac{1}{2} + \\dfrac{1}{4} = \\dfrac{2}{4} + \\dfrac{1}{4} = \\dfrac{3}{4}$. Additionner les dénominateurs entre eux ne veut rien dire — c'est pourtant l'erreur la plus fréquente.",
      schema: legende(
        tableau({
          headers: ["calcul", "juste ?"],
          rows: [
            { values: ["1/3 + 2/3 = 3/3", "oui"] },
            { values: ["1/2 + 1/3 = 2/5", "non"] },
            { values: ["1/2 + 1/2 = 2/4", "non : ça fait 1"] },
          ],
          highlight: { row: 1 },
          caption: "on n'ajoute jamais les dénominateurs",
        }),
        "Deux demis font un tout : si le résultat vaut $\\dfrac{2}{4}$, quelque chose ne va pas."
      ),
      micros: ["fraction_rationnel_calculer"],
    },
    {
      titre: "Multiplier : bien plus simple qu'additionner",
      texte:
        "Pour un produit, aucun dénominateur commun n'est nécessaire : on multiplie les numérateurs entre eux et les dénominateurs entre eux. $\\dfrac{3}{4} \\times \\dfrac{2}{5} = \\dfrac{6}{20}$, que l'on simplifie en $\\dfrac{3}{10}$. Il est même conseillé de simplifier AVANT de multiplier : dans $\\dfrac{2}{3} \\times \\dfrac{3}{5}$, le 3 du haut et le 3 du bas se simplifient, et il reste $\\dfrac{2}{5}$ sans aucun calcul.",
      schema: legende(
        tableau({
          headers: ["opération", "ce qu'il faut"],
          rows: [
            { values: ["addition", "le même dénominateur"] },
            { values: ["multiplication", "rien du tout"] },
          ],
          highlight: { row: 1 },
          caption: "le produit est le cas facile",
        }),
        "C'est la seule opération où les dénominateurs se traitent comme les numérateurs."
      ),
      micros: ["fraction_rationnel_calculer"],
    },
    {
      titre: "Entre deux rationnels, il y en a toujours un autre",
      texte:
        "Choisissez deux rationnels aussi proches que vous voulez : il en existe toujours un strictement compris entre les deux. La démonstration est immédiate, car leur MOYENNE en est un — elle se calcule à partir des deux, donc elle s'écrit encore sous la forme $\\dfrac{a}{b}$. Entre $\\dfrac{1}{2}$ et $\\dfrac{3}{4}$, la moyenne vaut $\\dfrac{5}{8}$. Et l'on peut recommencer indéfiniment : les rationnels ne sont jamais côte à côte sur la droite, contrairement aux entiers.",
      schema: legende(
        droite({
          min: 0,
          max: 1,
          step: 1,
          points: [
            { value: 0.5, label: "1/2" },
            { value: 0.625, label: "5/8" },
            { value: 0.75, label: "3/4" },
          ],
        }),
        "$\\dfrac{5}{8}$ se glisse entre les deux — et le procédé ne s'arrête jamais."
      ),
      micros: ["fraction_rationnel_defi"],
    },
  ],
  reel: {
    texte:
      "Un rationnel apparaît chaque fois qu'on partage sans que cela tombe juste : trois pizzas pour quatre personnes, un trajet fait aux deux tiers, une remise d'un cinquième. Mais l'usage le moins visible est le plus massif — un ordinateur ne manipule QUE des rationnels. Ses nombres à virgule sont des fractions dont le dénominateur est une puissance de deux, et c'est précisément pour cela que $0{,}1 + 0{,}2$ n'y donne pas exactement $0{,}3$ : un dixième ne s'écrit pas exactement avec un dénominateur en puissance de deux. La densité, elle, sert tous les jours sans qu'on la nomme : dire qu'un prix est « entre 12 et 13 euros » n'exclut rien, puisqu'il reste une infinité de possibilités.",
  },
  historique: {
    texte:
      "Les pythagoriciens, au VIᵉ siècle avant notre ère, tenaient pour acquis que tout nombre était rationnel : deux longueurs quelconques devaient toujours être dans un rapport de nombres entiers. La découverte que la diagonale d'un carré de côté 1 — c'est-à-dire $\\sqrt{2}$ — ne peut PAS s'écrire sous la forme $\\dfrac{a}{b}$ a donc été une crise, et pas seulement une curiosité : elle ruinait le principe même de leur philosophie, selon lequel le nombre entier explique le monde. La légende veut que celui qui divulgua la démonstration ait été noyé. Elle est probablement fausse, mais elle dit bien ce que la découverte avait de dérangeant — et c'est de là que vient le mot « irrationnel », qui signifiait « sans rapport » avant de signifier « déraisonnable ».",
  },
  formule: {
    contexte: "Trouver un rationnel strictement compris entre deux autres",
    expression: "\\dfrac{a + b}{2}",
    legende:
      "La moyenne de deux nombres est toujours située entre eux, et elle reste rationnelle puisqu'on ne l'obtient qu'en additionnant et en divisant. C'est la réponse CONSTRUCTIVE à la question « en existe-t-il un entre les deux ? » : non seulement oui, mais en voici un.",
    schema: legende(
      tableau(
        {
          headers: ["entre", "et", "la moyenne"],
          rows: [
            { values: ["1/2", "3/4", "5/8"] },
            { values: ["1/2", "5/8", "9/16"] },
            { values: ["1/2", "9/16", "17/32"] },
          ],
          caption: "et cela ne s'arrête jamais",
        },
        "formule"
      ),
      "À chaque tour, on se rapproche sans jamais atteindre : il reste toujours de la place."
    ),
  },
  methode: [
    {
      titre: "Pour savoir si un nombre est rationnel",
      texte:
        "On cherche à l'écrire comme un quotient de deux entiers. Un entier se met sur 1, un décimal sur une puissance de dix. Si l'on y parvient, c'est un rationnel — et c'est le cas de tous les nombres rencontrés au collège, à l'exception des racines carrées qui ne tombent pas juste.",
      micros: ["fraction_rationnel_reconnaitre"],
    },
    {
      titre: "Pour comparer, choisir sa route",
      texte:
        "Deux voies existent : le même dénominateur, ou l'écriture décimale. La seconde est souvent plus rapide quand les dénominateurs n'ont pas de multiple commun évident. ⛔ Et si les nombres sont négatifs, on compare leurs distances à zéro PUIS on inverse la conclusion.",
      micros: ["fraction_rationnel_comparer"],
    },
    {
      titre: "Avant d'additionner, regarder les dénominateurs",
      texte:
        "S'ils sont égaux, on additionne les numérateurs et on ne touche pas au dénominateur. S'ils diffèrent, on cherche un dénominateur commun avant tout calcul. Aucun raccourci n'existe ici, contrairement à la multiplication.",
      micros: ["fraction_rationnel_calculer"],
    },
    {
      titre: "Simplifier avant de multiplier",
      texte:
        "Un facteur présent en haut et en bas se supprime des deux côtés, même s'il vient de fractions différentes. Cela évite de manipuler de grands nombres et donne directement la forme irréductible.",
      micros: ["fraction_rationnel_calculer"],
    },
    {
      titre: "Pour trouver un nombre entre deux autres",
      texte:
        "On prend la moyenne. Elle est toujours strictement comprise entre les deux, et toujours rationnelle. Il n'existe aucune situation où l'on doive répondre « il n'y en a pas ».",
      micros: ["fraction_rationnel_defi"],
    },
  ],
  usages: [
    {
      titre: "On me demande si un nombre est rationnel",
      detail:
        "Je tente de l'écrire $\\dfrac{a}{b}$ avec deux entiers. Un entier, un décimal, une fraction : la réponse est oui dans les trois cas.",
      micros: ["fraction_rationnel_reconnaitre"],
    },
    {
      titre: "On me demande une écriture décimale",
      detail: "Je divise le numérateur par le dénominateur.",
      micros: ["fraction_rationnel_ecriture"],
    },
    {
      titre: "On me demande de comparer",
      detail:
        "Même dénominateur, ou écriture décimale. Et si les nombres sont négatifs, j'inverse la conclusion à la fin.",
      micros: ["fraction_rationnel_comparer"],
    },
    {
      titre: "On me demande une somme ou un produit",
      detail:
        "Pour une somme, dénominateur commun d'abord. Pour un produit, je multiplie tout droit — en simplifiant avant si je peux.",
      micros: ["fraction_rationnel_calculer"],
    },
    {
      titre: "On me demande un nombre entre deux autres",
      detail: "Je calcule leur moyenne : elle convient toujours.",
      micros: ["fraction_rationnel_defi"],
    },
  ],
  exemples: [
    {
      titre: "Un décimal déguisé",
      donnees: "Le nombre $0{,}4$.",
      question: "Montrer qu'il est rationnel, et l'écrire sous forme irréductible.",
      solution:
        "Le dernier chiffre est au rang des dixièmes, donc $0{,}4 = \\dfrac{4}{10}$ : c'est déjà un quotient de deux entiers, ce qui prouve qu'il est rationnel. Il reste à simplifier : 4 et 10 ont 2 pour diviseur commun, donc $\\dfrac{4}{10} = \\dfrac{2}{5}$. Comme 2 et 5 n'ont plus de diviseur commun, la forme est irréductible. Contrôle : $2 \\div 5 = 0{,}4$.",
      micros: ["fraction_rationnel_reconnaitre", "fraction_rationnel_ecriture"],
    },
    {
      titre: "Une somme, et l'erreur à ne pas commettre",
      donnees: "Le calcul $\\dfrac{1}{2} + \\dfrac{1}{3}$.",
      question: "Combien vaut cette somme ?",
      solution:
        "Les dénominateurs diffèrent : il faut d'abord un dénominateur commun, et 6 convient puisqu'il est multiple de 2 et de 3. On obtient $\\dfrac{3}{6} + \\dfrac{2}{6} = \\dfrac{5}{6}$. Répondre $\\dfrac{2}{5}$ serait faux, et un simple ordre de grandeur le montre : $\\dfrac{1}{2}$ vaut déjà $0{,}5$, donc la somme dépasse forcément $0{,}5$, alors que $\\dfrac{2}{5}$ vaut $0{,}4$. Un résultat plus petit que l'un de ses termes ne peut pas être juste.",
      schema: legende(
        tableau(
          {
            headers: ["étape", "écriture"],
            rows: [
              { values: ["départ", "1/2 + 1/3"] },
              { values: ["au même dénom.", "3/6 + 2/6"] },
              { values: ["résultat", "5/6"] },
            ],
            highlight: { row: 2 },
            caption: "6 est multiple de 2 et de 3",
          },
          "exemple"
        ),
        "Seuls les numérateurs s'ajoutent ; le dénominateur commun reste tel quel."
      ),
      micros: ["fraction_rationnel_calculer"],
    },
    {
      titre: "Deux négatifs",
      donnees: "Les nombres $-\\dfrac{1}{2}$ et $\\dfrac{1}{3}$.",
      question: "Quel est le plus petit ?",
      solution:
        "Aucun calcul n'est nécessaire ici : un nombre négatif est toujours plus petit qu'un nombre positif. Le plus petit est donc $-\\dfrac{1}{2}$. La question devient réellement délicate quand les DEUX sont négatifs : entre $-\\dfrac{3}{4}$ et $-\\dfrac{1}{2}$, c'est $-\\dfrac{3}{4}$ le plus petit, parce qu'il est plus loin de zéro du côté gauche — l'inverse de ce qui se passe chez les positifs.",
      micros: ["fraction_rationnel_comparer"],
    },
    {
      titre: "Se glisser entre deux nombres",
      donnees: "Les nombres $\\dfrac{1}{2}$ et $\\dfrac{3}{4}$.",
      question: "Trouver un rationnel strictement compris entre les deux.",
      solution:
        "On prend leur moyenne. La somme vaut $\\dfrac{1}{2} + \\dfrac{3}{4} = \\dfrac{2}{4} + \\dfrac{3}{4} = \\dfrac{5}{4}$, et l'on divise par 2, ce qui donne $\\dfrac{5}{8}$. Vérification en décimal : $0{,}5 < 0{,}625 < 0{,}75$. C'est bien entre les deux. Et l'on pourrait recommencer entre $\\dfrac{1}{2}$ et $\\dfrac{5}{8}$, puis encore, sans fin — c'est ce qu'on appelle la densité des rationnels, et c'est ce qui les distingue radicalement des entiers, entre lesquels il n'y a parfois rien.",
      micros: ["fraction_rationnel_defi"],
    },
  ],
  pieges: [
    "Écrire $\\dfrac{1}{2} + \\dfrac{1}{3} = \\dfrac{2}{5}$. Les dénominateurs ne s'additionnent jamais : il faut un dénominateur commun, et le résultat est $\\dfrac{5}{6}$.",
    "Écrire $\\dfrac{1}{2} + \\dfrac{1}{2} = \\dfrac{2}{4}$. Deux demis font un tout, donc 1 — et non un demi.",
    "Croire que $-\\dfrac{3}{4}$ est plus grand que $-\\dfrac{1}{2}$ parce que 3 est plus grand que 1. Chez les négatifs, la conclusion s'inverse.",
    "Croire qu'un entier n'est pas rationnel. Tout entier s'écrit sur 1 : $5 = \\dfrac{5}{1}$.",
    "Croire qu'entre deux rationnels proches il n'y a rien. Leur moyenne s'y trouve toujours, et le procédé se répète sans fin.",
    "Oublier la condition $b \\neq 0$ : une écriture avec zéro au dénominateur ne désigne aucun nombre.",
    "Confondre « écriture décimale infinie » et « non rationnel » : $\\dfrac{1}{3} = 0{,}333\\ldots$ reste parfaitement rationnel.",
  ],
  aRetenir: [
    "Un rationnel s'écrit $\\dfrac{a}{b}$ avec $a$ et $b$ entiers et $b \\neq 0$.",
    "Entiers, décimaux et fractions sont tous rationnels : une seule famille.",
    "Un même rationnel a une infinité d'écritures, mais une seule forme irréductible.",
    "Pour additionner, il faut le même dénominateur ; pour multiplier, rien.",
    "Chez les négatifs, le plus éloigné de zéro est le plus PETIT.",
    "Entre deux rationnels, il y en a toujours un autre : leur moyenne.",
  ],
  entrainement: [
    {
      question: "Le nombre entier $5$ est-il rationnel ? Justifier.",
      correction:
        "Oui : $5 = \\dfrac{5}{1}$, quotient de deux entiers dont le second n'est pas nul. Tout entier est rationnel.",
      micros: ["fraction_rationnel_reconnaitre"],
    },
    {
      question:
        "Dans l'écriture $\\dfrac{a}{b}$ d'un nombre rationnel, quelle condition porte sur $b$ ?",
      correction:
        "$b$ doit être différent de zéro. Une division par zéro n'a pas de sens : l'écriture ne désignerait aucun nombre.",
      micros: ["fraction_rationnel_reconnaitre"],
    },
    {
      question: "Donner l'écriture décimale de $\\dfrac{3}{4}$.",
      correction: "On divise : $3 \\div 4 = 0{,}75$.",
      micros: ["fraction_rationnel_ecriture"],
    },
    {
      question: "Expliquer pourquoi $0{,}4 = \\dfrac{2}{5}$.",
      correction:
        "Le 4 est au rang des dixièmes, donc $0{,}4 = \\dfrac{4}{10}$. En simplifiant par 2, on obtient $\\dfrac{2}{5}$. Contrôle : $2 \\div 5 = 0{,}4$.",
      micros: ["fraction_rationnel_ecriture"],
    },
    {
      question: "Quel est le plus grand : $\\dfrac{2}{3}$ ou $\\dfrac{3}{4}$ ?",
      correction:
        "On ramène au dénominateur 12 : $\\dfrac{8}{12}$ et $\\dfrac{9}{12}$. Donc $\\dfrac{3}{4}$ est le plus grand. En décimal : $0{,}666\\ldots$ contre $0{,}75$.",
      micros: ["fraction_rationnel_comparer"],
    },
    {
      question: "Expliquer pourquoi $-\\dfrac{3}{4}$ est plus petit que $-\\dfrac{1}{2}$.",
      correction:
        "$\\dfrac{3}{4}$ est plus loin de zéro que $\\dfrac{1}{2}$. Du côté négatif, être plus loin de zéro signifie être plus à gauche sur la droite graduée, donc plus petit. En décimal : $-0{,}75 < -0{,}5$.",
      micros: ["fraction_rationnel_comparer"],
    },
    {
      question: "Calculer $\\dfrac{5}{8} - \\dfrac{2}{8}$.",
      correction:
        "Les dénominateurs sont égaux : on soustrait les numérateurs et on garde le 8. Résultat : $\\dfrac{3}{8}$.",
      micros: ["fraction_rationnel_calculer"],
    },
    {
      question: "Calculer $\\dfrac{3}{4} \\times \\dfrac{2}{5}$.",
      correction:
        "On multiplie les numérateurs entre eux et les dénominateurs entre eux : $\\dfrac{6}{20}$, qui se simplifie par 2 en $\\dfrac{3}{10}$.",
      micros: ["fraction_rationnel_calculer"],
    },
    {
      question: "Quelle est la forme irréductible de $\\dfrac{6}{8}$ ?",
      correction:
        "6 et 8 ont 2 pour diviseur commun : $\\dfrac{6}{8} = \\dfrac{3}{4}$. Comme 3 et 4 n'ont plus de diviseur commun, la fraction est irréductible.",
      micros: ["fraction_rationnel_defi", "fraction_rationnel_ecriture"],
    },
    {
      question:
        "Un élève affirme : « entre deux nombres rationnels, il n'y a aucun autre nombre rationnel ». A-t-il raison ?",
      correction:
        "Non. Leur moyenne est toujours strictement comprise entre les deux, et elle reste rationnelle. Entre $\\dfrac{1}{2}$ et $\\dfrac{3}{4}$, par exemple, se trouve $\\dfrac{5}{8}$ — et l'on peut recommencer indéfiniment.",
      micros: ["fraction_rationnel_defi"],
    },
  ],
  coachHref: "/coach?matiere=maths&classe=3e&notion=fraction_rationnel",
};

// ─── Mode classe ───────────────────────────────────────────────────────────────
// ⛔ AUCUN LaTeX DANS CES DIAPOSITIVES. `ModeClasse` ne rend pas KaTeX : une
// formule écrite entre dollars s'afficherait EN CLAIR sur le tableau de la
// classe, code compris. Tout s'écrit donc en toutes lettres — ce qui est de
// toute façon la bonne façon de projeter, puisque le prof LIT la diapositive à
// voix haute.

export const slidesNombresRationnels3e: ClasseSlide[] = [
  {
    titre: "Trois familles qui n'en font qu'une",
    badge: "Ce qu'on va comprendre",
    section: {
      type: "objectif",
      phrase: "Cinq, zéro virgule vingt-cinq, et trois quarts",
      sousPhrase:
        "Depuis la sixième, ces trois-là ressemblent à trois espèces différentes. La troisième révèle qu'ils portent le même nom : ce sont tous des nombres rationnels.",
      encadre: {
        titre: "Le critère, et il est unique",
        texte:
          "Un nombre est rationnel s'il peut s'écrire comme un quotient de deux entiers, le second n'étant pas nul. Cinq s'écrit cinq sur un. Zéro virgule vingt-cinq s'écrit vingt-cinq sur cent.",
      },
    },
  },
  {
    titre: "Pourquoi le dénominateur ne peut pas être nul",
    badge: "La condition",
    teinte: "essentiel",
    section: {
      type: "objectif",
      phrase: "Ce n'est pas une précaution d'écriture",
      sousPhrase:
        "Diviser par zéro n'a aucun sens : aucun nombre multiplié par zéro ne peut redonner autre chose que zéro. Une écriture avec zéro en bas ne désigne donc aucun nombre du tout.",
      encadre: {
        titre: "À retenir",
        texte:
          "Le a peut valoir zéro — zéro sur trois vaut zéro, c'est un rationnel. C'est le b, et lui seul, qui doit être différent de zéro.",
      },
    },
  },
  {
    titre: "Une infinité d'écritures, une seule irréductible",
    badge: "Les formes",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Le même nombre",
          texte:
            "Trois quarts, six huitièmes, soixante-quinze centièmes : trois écritures, un seul nombre. On passe de l'une à l'autre en multipliant ou en divisant les deux termes.",
        },
        {
          titre: "La forme irréductible",
          texte:
            "C'est celle où le numérateur et le dénominateur n'ont plus aucun diviseur commun. Pour six huitièmes, c'est trois quarts.",
        },
        {
          titre: "Pourquoi elle sert",
          texte:
            "Elle est unique. Deux fractions irréductibles identiques désignent le même nombre, et deux différentes des nombres différents.",
        },
      ],
    },
  },
  {
    titre: "Le piège des négatifs",
    badge: "Attention",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce que beaucoup pensent",
        contenu:
          "Moins trois quarts est plus grand que moins un demi, parce que trois est plus grand que un.",
      },
      droite: {
        variante: "ok",
        titre: "Ce qui est vrai",
        contenu:
          "C'est l'inverse. Sur la droite graduée, moins trois quarts est plus à gauche que moins un demi : il est donc plus petit. Chez les négatifs, plus on s'éloigne de zéro, plus on descend.",
      },
    },
  },
  {
    titre: "Additionner",
    badge: "Le dénominateur d'abord",
    section: {
      type: "etapes",
      etapes: [
        "Je regarde les deux dénominateurs. S'ils sont égaux, j'additionne les numérateurs et je garde le dénominateur.",
        "S'ils diffèrent, je cherche un dénominateur commun : le plus souvent, un multiple des deux.",
        "Je récris les deux fractions avec ce dénominateur, en multipliant en haut et en bas.",
        "J'additionne alors les numérateurs seulement, et je simplifie si je peux.",
      ],
    },
  },
  {
    titre: "L'erreur la plus fréquente du chapitre",
    badge: "Attention",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on lit sur les copies",
        contenu:
          "Un demi plus un tiers égale deux cinquièmes. On a additionné les numérateurs entre eux, et les dénominateurs entre eux.",
      },
      droite: {
        variante: "ok",
        titre: "Le contrôle qui sauve",
        contenu:
          "Un demi vaut déjà zéro virgule cinq : la somme dépasse forcément zéro virgule cinq. Or deux cinquièmes valent zéro virgule quatre. Une somme plus petite que l'un de ses termes ne peut pas être juste. Le résultat est cinq sixièmes.",
      },
    },
  },
  {
    titre: "Multiplier, c'est plus facile",
    badge: "Le cas simple",
    teinte: "essentiel",
    section: {
      type: "objectif",
      phrase: "Aucun dénominateur commun n'est nécessaire",
      sousPhrase:
        "On multiplie les numérateurs entre eux, et les dénominateurs entre eux. Trois quarts fois deux cinquièmes donne six vingtièmes, soit trois dixièmes.",
      encadre: {
        titre: "Le réflexe qui fait gagner du temps",
        texte:
          "Simplifier AVANT de multiplier. Dans deux tiers fois trois cinquièmes, le trois du haut et le trois du bas disparaissent : il reste deux cinquièmes, sans aucun calcul.",
      },
    },
  },
  {
    titre: "Il y a toujours de la place",
    badge: "L'idée forte du chapitre",
    teinte: "essentiel",
    section: {
      type: "objectif",
      phrase: "Entre deux rationnels, il y en a toujours un autre",
      sousPhrase:
        "Choisissez-en deux aussi proches que vous voulez : leur moyenne se glisse entre les deux, et c'est encore un rationnel. Entre un demi et trois quarts, il y a cinq huitièmes.",
      encadre: {
        titre: "Et cela ne s'arrête jamais",
        texte:
          "On peut recommencer entre un demi et cinq huitièmes, puis encore. Les rationnels ne sont jamais côte à côte sur la droite — contrairement aux entiers, entre lesquels il n'y a parfois rien.",
      },
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    teinte: "exemple",
    section: {
      type: "exemple",
      enonce: "On veut calculer un demi plus un tiers.",
      question: "Combien vaut cette somme ?",
      correction:
        "Les dénominateurs diffèrent, donc il faut d'abord un dénominateur commun. Six convient, car il est multiple de deux et de trois. Un demi devient trois sixièmes, un tiers devient deux sixièmes. On additionne alors les numérateurs seulement : trois plus deux font cinq, et le dénominateur reste six. La somme vaut cinq sixièmes. Et on contrôle par l'ordre de grandeur : un demi vaut zéro virgule cinq, donc la somme doit dépasser zéro virgule cinq. Cinq sixièmes valent environ zéro virgule quatre-vingt-trois. C'est cohérent.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    teinte: "exercice",
    section: {
      type: "exercice",
      enonce: "On considère les nombres un demi et trois quarts.",
      question: "Trouver un nombre rationnel strictement compris entre les deux.",
      indice: "Pensez à un nombre qui se calcule toujours à partir de deux autres, et qui tombe entre eux.",
      correction:
        "On prend leur moyenne. La somme vaut un demi plus trois quarts : au dénominateur quatre, cela fait deux quarts plus trois quarts, donc cinq quarts. On divise ensuite par deux, ce qui donne cinq huitièmes. Vérification en écriture décimale : zéro virgule cinq, puis zéro virgule six cent vingt-cinq, puis zéro virgule soixante-quinze. Le nombre trouvé est bien strictement entre les deux. Et la vraie leçon est que ce procédé ne rate jamais : entre deux rationnels, on peut toujours en fabriquer un autre.",
    },
  },
];
