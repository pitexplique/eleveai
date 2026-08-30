// ─── Fiche de cours : ordres de grandeur et préfixes (4e) ──────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/ordres-grandeur.bank.ts, notionId ordre_grandeur).
//
// ⭐ NOTION OUVERTE LE 30/08/2026. Elle ferme TROIS puces du thème A : les
// préfixes de nano à giga (4e-A-nombres-5), l'association d'un ordre de
// grandeur à un objet réel (4e-A-comparaisons-5) et la vérification de la
// vraisemblance d'un résultat (4e-A-calcul-5).
//
// ⭐ LE DÉCOUPAGE TIENT À UNE LIGNE DE FRACTURE À SENS UNIQUE : un ordre de
// grandeur a BESOIN de la notation scientifique pour s'écrire, alors que la
// notation scientifique n'a aucun besoin des ordres de grandeur. C'est ce qui
// interdisait de greffer ces micros sur `puissance_ecriture`.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE. Tous les nombres
// de la fiche sortent de la banque :
//   ordre_prefixe       → les six préfixes, et le piège du mot « micro »
//   ordre_associer      → atome, bactérie, Piton des Neiges, Terre-Lune
//   ordre_estimer       → arrondir puis multiplier, et le quotient
//   ordre_vraisemblance → le facteur 1000 perdu, et l'unité absurde
//   ordre_defi          → combien de fois, et l'erreur à trouver
//
// ⭐⭐ LE CANVAS `number_line` SERT ICI D'ÉCHELLE D'EXPOSANTS, et c'est le seul
// endroit du dépôt où il joue ce rôle : l'axe ne porte pas les nombres mais
// leurs puissances de dix, si bien que nano, micro, milli, kilo, méga et giga
// s'y répartissent RÉGULIÈREMENT, de trois en trois. C'est la seule
// représentation où l'élève voit d'un coup que « giga » est aussi loin de
// l'unité que « nano ».
// ⚠️ DEUX MESURES COMMANDENT SA TAILLE. Son SVG est plafonné à `max-w-[320px]`
// et son `viewBox` vaut son champ `size` : posé à 320 dans une carte de 222 px,
// il se rendrait à l'échelle 0,69 et sa police de 14 tomberait à 9,7 px, sous
// le plancher de 11. Il est donc posé à 222 ici, à l'échelle 1.
// ⚠️ Et ses étiquettes sont CENTRÉES sur leur valeur : un point sur le minimum
// ou le maximum déborderait de la moitié de sa largeur. L'axe va de −12 à 12
// alors que les points s'arrêtent à −9 et 9.
//
// ⛔ « MICRO », « MILLI » ET « KILO » NE SONT PAS DES ALIAS DU LEXIQUE, et
// c'est délibéré : ce sont des mots de masse et de longueur avant d'être des
// préfixes, et ils voleraient des questions aux grandeurs.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut donc porter du LaTeX. Les
 * libellés À L'INTÉRIEUR du dessin, eux, restent en écriture simple — ils sont
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
 * L'axe des EXPOSANTS. ⚠️ Sept points sur un axe de 222 px, c'est dense — mais
 * `number_line` DÉCALE ses étiquettes en hauteur au lieu de les écraser, ce qui
 * est exactement ce qu'il faut ici.
 */
const axeExposants = (surligne?: number) => (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: -12,
      max: 12,
      step: 3,
      points: [
        { value: -9, label: "nano", color: surligne === -9 ? "#7c3aed" : "#0f172a" },
        { value: -6, label: "micro", color: surligne === -6 ? "#7c3aed" : "#0f172a" },
        { value: -3, label: "milli", color: surligne === -3 ? "#7c3aed" : "#0f172a" },
        { value: 0, label: "unité", color: surligne === 0 ? "#7c3aed" : "#0f172a" },
        { value: 3, label: "kilo", color: surligne === 3 ? "#7c3aed" : "#0f172a" },
        { value: 6, label: "méga", color: surligne === 6 ? "#7c3aed" : "#0f172a" },
        { value: 9, label: "giga", color: surligne === 9 ? "#7c3aed" : "#0f172a" },
      ],
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
      size: { width: 222, height: 150 },
    }}
  />
);

export const ficheOrdresGrandeur4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "ordre-grandeur",
  titre: "Ordres de grandeur et préfixes",
  accroche:
    "Un atome mesure un dix-milliardième de mètre, une clé USB stocke des milliards d'octets. Aucun de ces nombres ne se lit à voix haute, et pourtant il faut les comparer. Les puissances de dix leur donnent une échelle commune — et une fois cette échelle en main, on peut juger un résultat sans le recalculer.",
  identite: [
    { label: "Les six préfixes", valeur: "nano, micro, milli · kilo, méga, giga — de trois en trois" },
    { label: "Un ordre de grandeur", valeur: "La puissance de dix la plus proche : le RANG, pas le chiffre" },
    { label: "Le piège", valeur: "« micro » vaut $10^{-6}$, pas « très petit »" },
  ],
  definition: {
    texte:
      "L'ordre de grandeur d'un nombre est la puissance de dix la plus proche de ce nombre. Il ne dit pas la valeur exacte, il dit le RANG. La population de La Réunion change tous les ans ; son ordre de grandeur, $10^6$, ne change pas. ⭐ C'est ce qui le rend utile : il reste vrai des années, quand le nombre exact est faux dès le lendemain.",
  },
  figure: {
    schema: legende(
      axeExposants(0),
      "un axe d'EXPOSANTS : les préfixes s'y placent de trois en trois",
    ),
    legende:
      "Sur cet axe, on ne lit pas les nombres mais leurs puissances de dix. C'est la seule représentation où l'on voit d'un coup que « giga » est aussi loin de l'unité que « nano » — d'un côté un milliard, de l'autre un milliardième.",
  },
  proprietes: [
    {
      titre: "Un préfixe est une puissance de dix écrite en un mot",
      micros: ["ordre_prefixe"],
      texte:
        "Kilo veut dire mille, soit $10^3$. Milli veut dire un millième, soit $10^{-3}$. Les six préfixes du programme vont de trois en trois : nano, micro, milli d'un côté, kilo, méga, giga de l'autre. ⭐ Écrire « 5 kilomètres », c'est écrire $5 \\times 10^3$ mètres — le nombre devant ne change pas, seul le préfixe devient une puissance.",
      schema: tableau({
        headers: ["préfixe", "vaut", "en clair"],
        rows: [
          { values: ["nano", "10⁻⁹", "un milliardième"] },
          { values: ["micro", "10⁻⁶", "un millionième"] },
          { values: ["milli", "10⁻³", "un millième"] },
          { values: ["kilo", "10³", "mille"] },
          { values: ["méga", "10⁶", "un million"] },
          { values: ["giga", "10⁹", "un milliard"] },
        ],
        highlight: { col: 1 },
        caption: "de trois en trois, dans les deux sens",
      }),
    },
    {
      titre: "« Micro » ne veut pas dire « petit »",
      micros: ["ordre_prefixe"],
      texte:
        "Dans la langue courante, micro veut dire « très petit » — microbe, microscope, micro-onde. En mathématiques et en sciences, il vaut EXACTEMENT $10^{-6}$, un millionième, et rien d'autre. ⚠️ C'est le piège de vocabulaire de la notion : les préfixes ne sont pas des mots d'ambiance, ce sont des nombres.",
      schema: tableau({
        headers: ["le mot", "en français", "en maths"],
        rows: [
          { values: ["micro", "très petit", "10⁻⁶ exactement"] },
          { values: ["méga", "énorme", "10⁶ exactement"] },
          { values: ["giga", "gigantesque", "10⁹ exactement"] },
        ],
        highlight: { col: 2 },
        caption: "une valeur, pas une impression",
      }),
    },
    {
      titre: "Un ordre de grandeur donne le rang, pas le chiffre",
      micros: ["ordre_associer"],
      texte:
        "On ne cherche pas la mesure exacte, on cherche la puissance de dix la plus proche. Un élève mesure de l'ordre de $10^0$ mètre, soit 1 mètre ; l'altitude du Piton des Neiges est de l'ordre de $10^3$ mètres. ⭐ Ces repères se retiennent comme des points d'appui : ils servent ensuite à juger tout le reste.",
      schema: tableau({
        headers: ["objet", "ordre"],
        rows: [
          { values: ["un atome", "10⁻¹⁰ m"] },
          { values: ["une bactérie", "10⁻⁶ m"] },
          { values: ["un élève", "10⁰ m"] },
          { values: ["le Piton des Neiges", "10³ m"] },
          { values: ["la distance Terre-Lune", "10⁸ m"] },
        ],
        highlight: { row: 2 },
        caption: "des repères, pas des résultats",
      }),
    },
    {
      titre: "Estimer : arrondir d'abord, multiplier ensuite",
      micros: ["ordre_estimer"],
      texte:
        "On remplace chaque nombre par la puissance de dix la plus proche, PUIS on calcule. ⚠️ Faire le produit exact pour l'arrondir ensuite, c'est faire précisément le travail qu'on cherchait à éviter. Pour $480 \\times 21$ : $480 \\approx 10^2$ et $21 \\approx 10^1$, donc le résultat est de l'ordre de $10^3$.",
      schema: tableau({
        headers: ["le nombre", "arrondi"],
        rows: [
          { values: ["480", "10² (soit 100)"] },
          { values: ["21", "10¹ (soit 10)"] },
          { values: ["le produit", "10³ (soit 1000)"] },
        ],
        highlight: { row: 2 },
        caption: "on arrondit, puis on multiplie",
      }),
    },
    {
      titre: "Multiplier ajoute les exposants, diviser les soustrait",
      micros: ["ordre_estimer"],
      texte:
        "C'est la règle qui rend l'estimation immédiate : $10^4 \\times 10^3 = 10^7$, et $10^8 \\div 10^3 = 10^5$. ⚠️ L'erreur la plus courante est de MULTIPLIER les exposants — $10^4 \\times 10^3$ ne fait pas $10^{12}$. On les ajoute.",
      schema: tableau({
        headers: ["opération", "sur les exposants"],
        rows: [
          { values: ["multiplier", "on AJOUTE"] },
          { values: ["diviser", "on SOUSTRAIT"] },
          { values: ["10⁴ × 10³", "10⁷, pas 10¹²"] },
        ],
        highlight: { row: 2 },
        caption: "la règle qui fait tout le travail",
      }),
    },
    {
      titre: "Juger un résultat sans le refaire",
      micros: ["ordre_vraisemblance"],
      texte:
        "On estime ce que le résultat DEVRAIT valoir, et on compare au rang de ce qui est annoncé. Un chat de 4 tonnes, une bactérie de 2 mm, une île de 90 millions d'habitants : ces réponses sont fausses sans qu'on ait rien recalculé. ⭐ Ce réflexe repère une erreur en trois secondes, et il sert bien au-delà des mathématiques.",
      schema: tableau({
        headers: ["annoncé", "verdict"],
        rows: [
          { values: ["un chat de 4 t", "faux : quelques kg"] },
          { values: ["une bactérie de 2 mm", "faux : de l'ordre du µm"] },
          { values: ["80 km de traversée", "plausible"] },
        ],
        highlight: { row: 2 },
        caption: "le sens avant le calcul",
      }),
    },
  ],
  reel: {
    texte:
      "Les erreurs d'ordre de grandeur sont les plus coûteuses parce qu'elles ne ressemblent pas à des erreurs : le calcul est juste, seul le rang est faux. En pharmacie, confondre milligrammes et grammes multiplie une dose par mille, et c'est pour cela que les protocoles imposent de relire l'unité avant le nombre. Un abonnement internet annoncé en mégabits par seconde n'est pas le même service que le même nombre en mégaoctets — il y a un facteur huit entre les deux, et c'est ce qui permet d'annoncer un chiffre flatteur. Une clé USB de 32 gigaoctets contient $3{,}2 \\times 10^{10}$ octets, soit quelques dizaines de milliers de photos : le savoir évite d'acheter dix fois trop, ou dix fois trop peu. À La Réunion, le raccordement à la fibre se compte en gigabits, la distance à Maurice en centaines de kilomètres, la population en centaines de milliers d'habitants — trois rangs différents qu'on manipule dans la même journée sans les confondre, à condition de les avoir situés une fois pour toutes.",
  },
  historique: {
    texte:
      "Les préfixes naissent avec le système métrique : la loi française du 18 germinal an III, en 1795, crée kilo, hecto et déca sur des racines grecques, milli, centi et déci sur des racines latines — le grec pour agrandir, le latin pour diviser, une règle qui tient encore. Micro et nano n'arrivent qu'en 1960, avec le Système international, quand la physique a besoin de descendre plus bas ; giga entre la même année, et les préfixes suivants — téra, péta — suivront l'informatique. L'ordre de grandeur, lui, est devenu une méthode de travail à part entière grâce à Enrico Fermi, qui demandait à ses étudiants d'estimer des quantités impossibles à mesurer — combien d'accordeurs de piano à Chicago — pour leur apprendre à raisonner sans données. En 1945, lors du premier essai atomique, il aurait estimé la puissance de l'explosion en lâchant des morceaux de papier et en mesurant de combien le souffle les avait déplacés. Son estimation, faite en quelques secondes, était du bon ordre de grandeur.",
  },
  formule: {
    contexte: "Pour estimer un produit ou un quotient",
    expression: "10^{a} \\times 10^{b} = 10^{a+b} \\quad\\text{et}\\quad 10^{a} \\div 10^{b} = 10^{a-b}",
    legende:
      "Toute l'estimation tient dans ces deux règles : une fois les nombres remplacés par des puissances de dix, il ne reste qu'à ajouter ou soustraire les exposants. C'est ce qui permet d'estimer de tête un calcul qu'on ne saurait pas poser.",
    schema: tableau(
      {
        headers: ["calcul", "ordre de grandeur"],
        rows: [
          { values: ["480 × 21", "10² × 10¹ = 10³"] },
          { values: ["10⁸ ÷ 10³", "10⁵"] },
          { values: ["9500 × 11", "10⁴ × 10¹ = 10⁵"] },
        ],
        highlight: { row: 0 },
        caption: "arrondir, puis ajouter ou soustraire",
      },
      "formule"
    ),
  },
  methode: [
    {
      titre: "Passer d'un préfixe à une puissance",
      micros: ["ordre_prefixe"],
      texte:
        "On remplace le mot par sa puissance de dix, et on garde le nombre devant. « 7 nanomètres » devient $7 \\times 10^{-9}$ mètre. Pour comparer deux préfixes, on SOUSTRAIT leurs exposants : giga vaut $10^9$ et milli vaut $10^{-3}$, l'écart est de 12 rangs.",
      schema: legende(
        axeExposants(9),
        "de milli à giga, l'écart des exposants vaut $9 - (-3) = 12$",
      ),
    },
    {
      titre: "Associer un ordre de grandeur à un objet",
      micros: ["ordre_associer"],
      texte:
        "On ne calcule pas : on se raccroche à un repère connu. Un élève fait $10^0$ mètre, une salle de classe $10^1$, une montagne $10^3$. On place l'objet par rapport à ces bornes, puis on compte les rangs. ⚠️ Pour ranger des grandeurs, on range les EXPOSANTS — et un exposant négatif plus grand en valeur absolue donne un nombre plus PETIT.",
      schema: tableau({
        headers: ["repère", "ordre"],
        rows: [
          { values: ["un élève", "10⁰ m"] },
          { values: ["une salle", "10¹ m"] },
          { values: ["une montagne", "10³ m"] },
        ],
        caption: "trois bornes, et on situe entre",
      }),
    },
    {
      titre: "Estimer un calcul",
      micros: ["ordre_estimer"],
      texte:
        "Trois gestes, dans cet ordre. On arrondit chaque nombre à la puissance de dix la plus proche. On ajoute les exposants pour un produit, on les soustrait pour un quotient. On lit le résultat comme un rang, pas comme une valeur exacte.",
      schema: tableau({
        headers: ["étape", "ce qu'on fait"],
        rows: [
          { values: ["1", "arrondir chaque nombre"] },
          { values: ["2", "ajouter ou soustraire"] },
          { values: ["3", "lire un rang"] },
        ],
        highlight: { row: 1 },
        caption: "jamais le produit exact d'abord",
      }),
    },
    {
      titre: "Juger un résultat annoncé",
      micros: ["ordre_vraisemblance"],
      texte:
        "Deux contrôles, et l'un des deux suffit. Le contrôle du CALCUL : le résultat a-t-il le bon nombre de chiffres ? Le contrôle du SENS : cette valeur est-elle possible pour cet objet ? ⭐ Aucun des deux ne demande de refaire le calcul.",
      schema: tableau({
        headers: ["contrôle", "la question"],
        rows: [
          { values: ["le calcul", "le bon rang ?"] },
          { values: ["le sens", "possible pour cet objet ?"] },
        ],
        caption: "un seul suffit à conclure au faux",
      }),
    },
    {
      titre: "Retrouver le facteur perdu",
      micros: ["ordre_defi"],
      texte:
        "Quand un résultat est faux, on ne recommence pas le calcul : on cherche le FACTEUR entre l'attendu et l'annoncé. S'il vaut 10, 100 ou 1000, c'est un zéro ou une virgule ; s'il vaut 1000 exactement, c'est presque toujours une conversion oubliée. ⭐ Le facteur dit combien de rangs ont été perdus, et donc où regarder.",
      schema: tableau({
        headers: ["le facteur", "l'erreur probable"],
        rows: [
          { values: ["10", "un zéro"] },
          { values: ["1000", "une conversion"] },
          { values: ["10⁶", "deux préfixes confondus"] },
        ],
        highlight: { row: 1 },
        caption: "le facteur mène à l'erreur",
      }),
    },
  ],
  usages: [
    {
      titre: "On me demande de convertir avec un préfixe",
      micros: ["ordre_prefixe"],
      detail:
        "On remplace le préfixe par sa puissance de dix et on garde le nombre devant. Pour passer d'un préfixe à un autre, on soustrait les exposants.",
    },
    {
      titre: "On me demande l'ordre de grandeur d'un objet",
      micros: ["ordre_associer"],
      detail:
        "On ne calcule pas : on se situe par rapport à un repère connu, puis on compte les rangs.",
    },
    {
      titre: "On me demande d'estimer un calcul",
      micros: ["ordre_estimer"],
      detail:
        "On arrondit chaque facteur à une puissance de dix, puis on ajoute les exposants pour un produit, on les soustrait pour un quotient.",
    },
    {
      titre: "Un résultat me paraît étrange",
      micros: ["ordre_vraisemblance", "ordre_defi"],
      detail:
        "On estime ce qu'il devrait valoir et on compare les rangs. Si l'écart est un facteur 10, 100 ou 1000, l'erreur est un zéro, une virgule ou une conversion.",
    },
  ],
  exemples: [
    {
      titre: "La facture du collège",
      micros: ["ordre_estimer"],
      donnees: "Un collège de 480 élèves commande un carnet de correspondance à 21 € l'unité.",
      question: "Quel est l'ordre de grandeur de la facture ?",
      schema: tableau(
        {
          headers: ["on arrondit", "à"],
          rows: [
            { values: ["480", "10² = 100"] },
            { values: ["21", "10¹ = 10"] },
            { values: ["total", "10³ = 1000 €"] },
          ],
          highlight: { row: 2 },
        },
        "exemple"
      ),
      solution:
        "On arrondit d'abord : $480 \\approx 10^2$ et $21 \\approx 10^1$.\n\nOn ajoute les exposants : $10^2 \\times 10^1 = 10^3$. La facture est de l'ordre de 1000 €.\n\n⭐ Le total exact vaut $480 \\times 21 = 10\\,080$ € — dix fois plus. C'est normal : arrondir 480 à 100 plutôt qu'à 1000 fait perdre un rang. ⚠️ L'ordre de grandeur donne le rang à un facteur près, pas au chiffre près. Il ne remplace jamais le calcul ; il dit si le calcul est plausible.",
    },
    {
      titre: "Le facteur mille",
      micros: ["ordre_vraisemblance", "ordre_defi"],
      donnees: "Un élève convertit 5 kilomètres en millimètres et annonce 5 000 mm.",
      question: "Où est l'erreur ?",
      schema: tableau(
        {
          headers: ["passage", "facteur"],
          rows: [
            { values: ["km → m", "× 1000"] },
            { values: ["m → mm", "× 1000"] },
            { values: ["km → mm", "× 1 000 000"] },
          ],
          highlight: { row: 2 },
        },
        "exemple"
      ),
      solution:
        "Un kilomètre vaut $10^3$ mètres, et un millimètre vaut $10^{-3}$ mètre. Pour passer des kilomètres aux millimètres, on soustrait les exposants : $10^{3} \\div 10^{-3} = 10^{6}$.\n\nDonc 5 km $= 5 \\times 10^6$ mm, soit 5 000 000 mm — mille fois plus que la réponse annoncée.\n\n⭐ L'élève n'a fait qu'UNE des deux conversions. Le facteur perdu vaut exactement 1000, et c'est ce qui désigne l'erreur : un facteur rond de 1000 est presque toujours une conversion oubliée. ⚠️ Soustraire un exposant négatif revient à l'ajouter — c'est là que le calcul dérape le plus souvent.",
    },
    {
      titre: "Combien de fois plus grand",
      micros: ["ordre_defi", "ordre_associer"],
      donnees: "Une bactérie mesure de l'ordre de $10^{-6}$ m, la distance Terre-Lune est de l'ordre de $10^{8}$ m.",
      question: "Combien de fois la seconde est-elle plus grande que la première ?",
      schema: tableau(
        {
          headers: ["grandeur", "exposant"],
          rows: [
            { values: ["bactérie", "−6"] },
            { values: ["Terre-Lune", "8"] },
            { values: ["écart", "14"] },
          ],
          highlight: { row: 2 },
        },
        "exemple"
      ),
      solution:
        "Comparer deux ordres de grandeur, c'est les diviser, donc soustraire leurs exposants : $10^{8} \\div 10^{-6} = 10^{8-(-6)} = 10^{14}$.\n\nLa distance Terre-Lune est donc environ $10^{14}$ fois plus grande qu'une bactérie — cent mille milliards de fois.\n\n⭐ Ce nombre n'a aucun équivalent dans l'expérience quotidienne, et c'est précisément pour cela qu'on écrit en puissances de dix : « cent mille milliards » ne se compare à rien, « $10^{14}$ » se compare à tout.",
    },
  ],
  pieges: [
    "Croire que « micro » veut dire « petit ». En mathématiques il vaut exactement $10^{-6}$.",
    "Multiplier les exposants au lieu de les ajouter. $10^4 \\times 10^3$ vaut $10^7$, pas $10^{12}$.",
    "Ajouter les exposants dans une division. On les soustrait.",
    "Oublier qu'un exposant négatif plus grand en valeur absolue donne un nombre plus PETIT. $10^{-10}$ est plus petit que $10^{-6}$.",
    "Calculer le produit exact avant d'arrondir. C'est exactement le travail qu'on cherchait à éviter.",
    "N'appliquer qu'une conversion sur deux. De kilomètres à millimètres, il y a $10^6$, pas $10^3$.",
    "Confondre méga et giga : il y a un facteur mille entre les deux, et c'est le facteur d'erreur le plus fréquent en informatique.",
  ],
  aRetenir: [
    "L'ordre de grandeur d'un nombre est la puissance de dix la plus proche : il donne le RANG, pas le chiffre.",
    "Les six préfixes vont de trois en trois : nano $10^{-9}$, micro $10^{-6}$, milli $10^{-3}$, kilo $10^{3}$, méga $10^{6}$, giga $10^{9}$.",
    "Un préfixe est une valeur exacte, jamais une impression de taille.",
    "Multiplier des puissances de dix, c'est AJOUTER les exposants ; diviser, c'est les SOUSTRAIRE.",
    "Pour estimer : on arrondit d'abord, on calcule ensuite — jamais l'inverse.",
    "Pour juger un résultat, deux contrôles suffisent : le bon rang, et le sens de la situation.",
    "Quand un résultat est faux, on cherche le FACTEUR perdu : 10, 100 ou 1000 désigne l'erreur.",
  ],
  entrainement: [
    {
      micros: ["ordre_prefixe"],
      question: "Par quelle puissance de 10 le préfixe « nano » multiplie-t-il l'unité ?",
      correction: "Par $10^{-9}$, soit un milliardième.",
    },
    {
      micros: ["ordre_prefixe"],
      question: "Écris 6 mégaoctets en notation scientifique, en octets.",
      correction:
        "« Méga » vaut $10^6$, donc 6 mégaoctets $= 6 \\times 10^6$ octets. ⚠️ Le nombre devant ne change pas.",
    },
    {
      micros: ["ordre_prefixe"],
      question: "Combien de fois 1 gigamètre est-il plus grand que 1 millimètre ?",
      correction:
        "Giga vaut $10^9$ et milli vaut $10^{-3}$. L'écart des exposants vaut $9 - (-3) = 12$, donc $10^{12}$ fois.",
    },
    {
      micros: ["ordre_associer"],
      question: "Quel est l'ordre de grandeur de la taille d'une bactérie ?",
      correction:
        "Environ $10^{-6}$ mètre, soit un micromètre — cent fois plus petit que l'épaisseur d'un cheveu.",
    },
    {
      micros: ["ordre_associer"],
      question: "Range du plus petit au plus grand : la distance Terre-Lune, un atome, l'altitude du Piton des Neiges.",
      correction:
        "Un atome ($10^{-10}$ m) < le Piton des Neiges ($10^{3}$ m) < la distance Terre-Lune ($10^{8}$ m). On range les exposants.",
    },
    {
      micros: ["ordre_estimer"],
      question: "Quel est l'ordre de grandeur du produit $9\\,800 \\times 96$ ?",
      correction:
        "$9\\,800 \\approx 10^4$ et $96 \\approx 10^2$, donc le produit est de l'ordre de $10^6$.",
    },
    {
      micros: ["ordre_estimer"],
      question: "Que vaut $10^{9} \\div 10^{4}$ ?",
      correction: "$10^{9-4} = 10^{5}$. Pour une division, on soustrait les exposants.",
    },
    {
      micros: ["ordre_vraisemblance"],
      question: "Un élève calcule la masse d'un chat et trouve 4 tonnes. Que peut-on dire ?",
      correction:
        "C'est faux : un chat pèse quelques kilogrammes, de l'ordre de $10^0$ kg. Quatre tonnes, c'est $4 \\times 10^3$ kg — mille fois trop.",
    },
    {
      micros: ["ordre_vraisemblance"],
      question: "On lit : « la longueur d'une salle de classe vaut 1 nanomètre ». Qu'en penses-tu ?",
      correction:
        "C'est absurde. Une salle mesure de l'ordre de $10^1$ mètre ; un nanomètre vaut $10^{-9}$ mètre. L'écart est de dix rangs.",
    },
    {
      micros: ["ordre_defi"],
      question: "Un élève convertit 3 gigaoctets en octets et trouve 3 000 000 octets. Où est l'erreur ?",
      correction:
        "Il a confondu giga et méga. Giga vaut $10^9$, donc 3 Go $= 3 \\times 10^9 = 3\\,000\\,000\\,000$ octets. Le facteur perdu vaut 1000 : c'est la signature de deux préfixes voisins confondus.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesOrdresGrandeur4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Ordres de grandeur et préfixes - 4e",
    section: {
      type: "objectif",
      phrase: "Savoir de quelle taille sont les choses",
      sousPhrase:
        "Un atome mesure un dix-milliardième de mètre, une clé USB stocke des milliards d'octets. Aucun de ces nombres ne se lit à voix haute, et pourtant il faut les comparer.",
      encadre: {
        titre: "L'ordre de grandeur",
        texte:
          "C'est la puissance de dix la plus proche. Il donne le RANG, pas le chiffre — et c'est ce qui le rend utile : il reste vrai des années.",
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
          "Une erreur d'ordre de grandeur ne ressemble pas à une erreur : le calcul est juste, seul le rang est faux. En pharmacie, confondre milligrammes et grammes multiplie une dose par mille. Un débit annoncé en mégabits n'est pas le même service qu'en mégaoctets : il y a un facteur huit.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Enrico Fermi demandait à ses étudiants d'estimer des quantités impossibles à mesurer, comme le nombre d'accordeurs de piano à Chicago. En 1945, lors du premier essai atomique, il aurait estimé la puissance de l'explosion en lâchant des morceaux de papier et en regardant de combien le souffle les déplaçait. Son estimation était du bon ordre de grandeur.",
      },
    },
  },
  {
    titre: "Les six préfixes",
    badge: "De trois en trois",
    section: {
      type: "etapes",
      etapes: [
        "nano vaut dix puissance moins neuf : un milliardième.",
        "micro vaut dix puissance moins six : un millionième.",
        "milli vaut dix puissance moins trois : un millième.",
        "kilo vaut dix puissance trois, méga dix puissance six, giga dix puissance neuf.",
        "⭐ De trois en trois dans les deux sens : giga est aussi loin de l'unité que nano.",
      ],
    },
  },
  {
    titre: "Le piège du vocabulaire",
    badge: "Ce qui coûte des points",
    section: {
      type: "objectif",
      phrase: "« Micro » ne veut pas dire « petit »",
      sousPhrase:
        "Dans la langue courante, micro veut dire très petit — microbe, microscope, micro-onde. En mathématiques, il vaut exactement dix puissance moins six, un millionième, et rien d'autre.",
      encadre: {
        titre: "La règle",
        texte:
          "Un préfixe n'est pas un mot d'ambiance, c'est un nombre. Méga ne veut pas dire énorme : il vaut un million.",
      },
    },
  },
  {
    titre: "Estimer, en deux gestes",
    badge: "La méthode",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "1. On arrondit",
        contenu:
          "Chaque nombre devient la puissance de dix la plus proche. 480 devient dix puissance deux, 21 devient dix puissance un. Attention : on arrondit AVANT de calculer, jamais après.",
      },
      droite: {
        variante: "info",
        titre: "2. On ajoute",
        contenu:
          "Pour un produit, on ajoute les exposants ; pour un quotient, on les soustrait. Dix puissance deux fois dix puissance un donne dix puissance trois. L'erreur classique est de multiplier les exposants.",
      },
    },
  },
  {
    titre: "Juger sans recalculer",
    badge: "Le réflexe qui rapporte",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Le contrôle du calcul",
          texte:
            "Le résultat a-t-il le bon nombre de chiffres ? On estime, et on compare les rangs.",
        },
        {
          titre: "Le contrôle du sens",
          texte:
            "Cette valeur est-elle possible pour cet objet ? Un chat de quatre tonnes est faux sans aucun calcul.",
        },
        {
          titre: "Un seul suffit",
          texte:
            "Il n'est pas nécessaire que les deux échouent. Un seul contrôle raté suffit à conclure que le résultat est faux.",
        },
        {
          titre: "Chercher le facteur",
          texte:
            "Si le résultat est faux, on cherche le facteur entre l'attendu et l'annoncé. Mille, c'est presque toujours une conversion oubliée.",
        },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    section: {
      type: "exemple",
      enonce: "Un élève convertit 5 kilomètres en millimètres et annonce 5 000 millimètres.",
      question: "Où est l'erreur ?",
      correction:
        "Un kilomètre vaut dix puissance trois mètres, et un millimètre vaut dix puissance moins trois mètre. Pour passer des kilomètres aux millimètres, on soustrait les exposants : trois moins moins trois, soit six. Donc cinq kilomètres font cinq millions de millimètres, mille fois plus que la réponse annoncée. L'élève n'a fait qu'une des deux conversions — et le facteur perdu, exactement mille, est la signature d'une conversion oubliée.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    section: {
      type: "exercice",
      enonce: "Une bactérie mesure de l'ordre de dix puissance moins six mètre. La distance de la Terre à la Lune est de l'ordre de dix puissance huit mètres.",
      question: "Combien de fois la seconde est-elle plus grande que la première ?",
      indice: "Comparer deux ordres de grandeur, c'est les diviser — donc soustraire leurs exposants.",
      correction:
        "On soustrait : huit moins moins six, soit quatorze. La distance Terre-Lune est donc environ dix puissance quatorze fois plus grande qu'une bactérie, soit cent mille milliards de fois. Ce nombre n'a aucun équivalent dans l'expérience quotidienne — et c'est précisément pour cela qu'on écrit en puissances de dix.",
    },
  },
];
