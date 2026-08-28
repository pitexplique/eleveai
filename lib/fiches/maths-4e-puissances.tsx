// ─── Fiche de cours : puissances et notation scientifique (4e) ─────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/puissances.bank.ts, notionId puissance_ecriture).
//
// ⭐ NOTION OUVERTE LE 28/08/2026. Le mot « puissance » avait ZÉRO occurrence
// dans les vingt banques de 4e, alors que le programme du cycle 4 (BOEN n° 31
// du 30 juillet 2020, p. 130-131) en fait trois puces.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE, et tous les nombres
// de cette fiche sortent de la banque, sans exception :
//   puissance_comprendre           → « Écris 5⁴ sous forme de produit » ; 7⁰ ; 12¹
//   puissance_calculer             → « Combien vaut 3² ? » ; (−2)³ contre −2³
//   puissance_exposant_negatif     → 2⁻³ = 1/8 ; 4⁻¹ = 1/4 ; 10⁻³ = 0,001
//   puissance_dix                  → 10⁵ ; 10⁰ ; 2,5 × 10³
//   puissance_notation_scientifique→ 12 500 = 1,25 × 10⁴, et les trois écritures
//                                    qui disent le même nombre sans être scientifiques
//   puissance_comparer             → l'exposant décide d'abord, la mantisse ensuite
//   puissance_calcul               → 10³ × 10² ; 2³ + 4² ; 3² × 10²
//   puissance_defi                 → la colonie qui double, la feuille pliée
//
// ⛔ CALIBRAGE 4e, ÉCRIT DANS LE BO ET TENU ICI : « la mise en acte de produits
// et de quotients de puissances de même base résulte de l'application de la
// DÉFINITION plutôt que de celle d'une formule ». Cette fiche n'écrit donc
// NULLE PART aᵐ × aⁿ = aᵐ⁺ⁿ. Quand un produit de même base apparaît, on écrit le
// produit en entier et on compte les zéros. Les formules sont de 3e.
//
// ⭐ LE CHOIX DES DESSINS, ET SES DEUX REFUS.
//   · `suite` aurait été le canvas évident pour montrer 2 → 4 → 8 → 16 avec ses
//     flèches ×2. ⛔ ÉCARTÉ : `SuiteCanvas.tsx` imprime « Suite » en titre EN DUR
//     et étiquette ses cases « terme 1, terme 2 ». L'élève lirait « Suite »
//     au-dessus d'une leçon sur les puissances.
//   · Le tableau revient quatre fois, et c'est la seconde parade de la passation
//     — GARDER LE MÊME OBJET ET CHANGER L'INFORMATION. Les quatre ne montrent
//     pas la même chose : une ÉCHELLE qui descend (et qui explique à elle seule
//     pourquoi a⁰ = 1), une COMPARAISON de deux écritures, un DÉNOMBREMENT de
//     zéros, un CHOIX parmi quatre écritures du même nombre.
//   · Le dessin le plus utile de la fiche est un contre-exemple, comme sur les
//     trois fiches de géométrie : la droite graduée qui pose 2⁻³ du côté
//     POSITIF, à 0,125, entre −8 et 8. Un exposant négatif ne donne pas un
//     nombre négatif, et aucune phrase ne le dit aussi vite qu'un point placé.

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

// ⚠️ LES LARGEURS SONT CELLES MESURÉES SUR TÉLÉPHONE DE 375 px, pas les défauts
// des composants : 222 px pour une carte de propriété, 216 px pour le bloc « La
// formule », 200 px pour un bloc d'exemple. La police finale vaut
// police × largeurAffichée ÷ largeurViewBox, avec un plancher à 11 px — un
// viewBox de 340 dans une carte de 222 tombe donc sous le lisible.
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

// ⚠️ 240 de large et non 360 : à 360 de viewBox, les graduations rendaient
// moins de 9 px dans une carte de propriété (mesuré le 24/08 sur la 5e).
// ⚠️ Et une étiquette de point est CENTRÉE sur sa valeur : un mot posé sur le
// minimum sort du cadre de la moitié de sa largeur. D'où des étiquettes courtes,
// et le texte long renvoyé dans la légende HTML sous le dessin.
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
      size: { width: 240, height: 95 },
    }}
  />
);

const barres = (
  data: { label: string; value: number; color?: string }[],
  largeur = 222
) => (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "barres",
      data,
      display: { showValues: true, showLabels: true },
      size: { width: largeur, height: 170 },
    }}
  />
);

// ⭐ POURQUOI ON DIT « AU CARRÉ ». 5² n'est pas une abstraction : c'est un carré
// de 5 sur 5, et ses 25 cases se comptent. C'est le seul endroit de la fiche où
// le mot de vocabulaire s'explique par un dessin plutôt que par une phrase.
const CARRE_5 = Array.from({ length: 5 }, (_, r) =>
  Array.from({ length: 5 }, (_, c) => [r, c] as [number, number])
).flat();

const carreDe5 = (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      grid: { rows: 5, cols: 5, filledCells: CARRE_5 },
      display: { showGrid: true, showFilled: true, showPerimeter: true },
      colors: { filled: "#dbeafe", grid: "#cbd5e1", perimeter: BLEU },
      size: { cellSize: 32, padding: 14 },
    }}
  />
);

// ⭐⭐ LE TABLEAU QUI EXPLIQUE a⁰ ET a⁻¹ D'UN SEUL COUP D'ŒIL. On descend
// l'échelle des exposants en divisant par 2 à chaque ligne : 8, 4, 2, puis 1,
// puis 0,5. L'élève n'a rien à admettre — 2⁰ = 1 et 2⁻¹ = 1/2 SONT la suite de
// la division. C'est le dessin le plus important de la fiche.
const echelleExposants = tableau(
  {
    headers: ["puissance", "on divise par 2", "valeur"],
    rows: [
      { values: ["2³", "", "8"] },
      { values: ["2²", "÷ 2", "4"] },
      { values: ["2¹", "÷ 2", "2"] },
      { values: ["2⁰", "÷ 2", "1"] },
      { values: ["2⁻¹", "÷ 2", "0,5"] },
    ],
    highlight: { row: 3 },
    caption: "descendre d'un exposant, c'est diviser par la base",
  },
  "formule"
);

export const fichePuissances4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE — et ce n'est pas
  // une convention d'écriture, c'est un CÂBLAGE. `registre.ts` construit la clé
  // de la fiche par `notionId.replace(/_/g, "-")` : avec « puissances », le
  // coach n'aurait jamais trouvé cette fiche et aurait affiché « pas de fiche »
  // sur la notion. Corrigé avant tout commit, donc sans 301 à poser.
  notion: "puissance-ecriture",
  titre: "Puissances et notation scientifique",
  accroche:
    "Écrire 1 000 000 000, le lire, le comparer à 5 000 000 : c'est long, et on se trompe en comptant les zéros. Les puissances raccourcissent l'écriture, et la notation scientifique donne à chaque nombre une forme unique — un seul chiffre avant la virgule, et une puissance de 10 qui dit la taille. C'est l'outil des sciences autant que des mathématiques.",
  identite: [
    { label: "Le mot de 4e", valeur: "Exposant : il COMPTE les facteurs, il n'en est pas un" },
    { label: "La forme unique", valeur: "$a \\times 10^{n}$ avec $1 \\leqslant a < 10$" },
    { label: "Le piège", valeur: "$2^{-3}$ est POSITIF : c'est un inverse, pas un opposé" },
  ],
  definition: {
    texte:
      "Une puissance résume une multiplication répétée d'un même nombre : $a^{n}$, c'est $a$ écrit $n$ fois en facteur. Le nombre $a$ s'appelle la BASE, le petit nombre en haut s'appelle l'EXPOSANT. Ainsi $2^{5} = 2 \\times 2 \\times 2 \\times 2 \\times 2 = 32$. Un exposant négatif désigne l'inverse de la puissance : $a^{-n} = \\frac{1}{a^{n}}$.",
  },
  figure: {
    schema: barres([
      { label: "2¹", value: 2, color: "#bfdbfe" },
      { label: "2²", value: 4, color: "#93c5fd" },
      { label: "2³", value: 8, color: "#60a5fa" },
      { label: "2⁴", value: 16, color: "#3b82f6" },
      { label: "2⁵", value: 32, color: BLEU },
    ]),
    legende:
      "À chaque marche on multiplie par 2. C'est pour ça qu'une puissance grandit si vite : $2^{5}$ vaut déjà 32, alors que $2 \\times 5$ n'en ferait que 10.",
  },
  proprietes: [
    {
      titre: "Pourquoi on dit « au carré »",
      micros: ["puissance_comprendre"],
      texte:
        "$5^{2}$ n'est pas une abstraction : c'est un carré de 5 sur 5, et on peut compter ses cases. Il y en a 25. De la même façon, $5^{3}$ est le nombre de petits cubes d'un cube de 5 d'arête — d'où le mot « au cube ».",
      schema: legende(carreDe5, "$5^{2} = 25$ cases, et le carré est un vrai carré"),
    },
    {
      titre: "L'exposant compte, il ne multiplie pas",
      micros: ["puissance_comprendre", "puissance_calculer"],
      texte:
        "C'est l'erreur la plus fréquente, et elle se dit en une phrase : $3^{2}$ ne vaut pas 6. L'exposant dit COMBIEN DE FOIS la base apparaît en facteur, il n'est pas lui-même un facteur. $3^{2} = 3 \\times 3 = 9$.",
      schema: tableau({
        headers: ["écriture", "ce qu'on écrit", "valeur"],
        rows: [
          { values: ["3²", "3 × 3", "9"] },
          { values: ["3 × 2", "3 + 3", "6"] },
        ],
        highlight: { row: 0 },
        caption: "deux écritures voisines, deux nombres différents",
      }),
    },
    {
      titre: "Les parenthèses décident du signe",
      micros: ["puissance_calculer"],
      texte:
        "Dans $(-2)^{3}$, les parenthèses enferment le signe : c'est $(-2)$ qui est répété, et trois facteurs négatifs donnent un résultat négatif. Dans $-2^{3}$, la puissance ne porte que sur 2, et le signe reste devant. Ici les deux valent $-8$ — mais avec un exposant PAIR, ils diffèrent : $(-2)^{2} = 4$ et $-2^{2} = -4$.",
      schema: tableau({
        headers: ["écriture", "le produit", "valeur"],
        rows: [
          { values: ["(−2)²", "(−2) × (−2)", "4"] },
          { values: ["−2²", "−(2 × 2)", "−4"] },
        ],
        highlight: { col: 2 },
        caption: "avec un exposant pair, le signe change tout",
      }),
    },
    {
      titre: "Un exposant négatif n'est pas un nombre négatif",
      micros: ["puissance_exposant_negatif"],
      texte:
        "$2^{-3}$ vaut $\\frac{1}{8}$, c'est-à-dire 0,125 : un nombre POSITIF, plus petit que 1. L'exposant négatif annonce un inverse, jamais un opposé. Posés sur la droite graduée, $2^{3}$ et $2^{-3}$ sont du même côté de zéro — c'est $-2^{3}$ qui part à gauche.",
      schema: legende(
        droite(
          [
            { value: -8, label: "−2³", color: ROUGE },
            { value: 0.125, label: "2⁻³", color: VERT },
            { value: 8, label: "2³", color: BLEU },
          ],
          -8,
          8,
          4
        ),
        "$2^{-3}$ est à DROITE de zéro, tout près de lui"
      ),
    },
    {
      titre: "Pour 10, l'exposant compte les zéros",
      micros: ["puissance_dix"],
      texte:
        "C'est ce qui rend les puissances de 10 si commodes : $10^{5}$, c'est 1 suivi de cinq zéros. Et en sens inverse, $10^{-3}$ donne trois chiffres après la virgule : 0,001. Multiplier par $10^{n}$ décale la virgule de $n$ rangs vers la droite.",
      schema: tableau({
        headers: ["puissance", "le nombre", "zéros"],
        rows: [
          { values: ["10²", "100", "2"] },
          { values: ["10⁵", "100 000", "5"] },
          { values: ["10⁰", "1", "0"] },
          { values: ["10⁻³", "0,001", "3 décimales"] },
        ],
        highlight: { row: 2 },
        caption: "10⁰ = 1 : aucun zéro à écrire",
      }),
    },
    {
      titre: "La notation scientifique donne une forme unique",
      micros: ["puissance_notation_scientifique"],
      texte:
        "Un nombre s'écrit d'une infinité de façons avec des puissances de 10. La notation scientifique en choisit UNE : $a \\times 10^{n}$, avec un seul chiffre non nul avant la virgule, c'est-à-dire $1 \\leqslant a < 10$. Deux nombres écrits ainsi se comparent alors d'un coup d'œil.",
      schema: tableau({
        headers: ["écriture de 12 500", "mantisse", "scientifique ?"],
        rows: [
          { values: ["125 × 10²", "125", "non, ⩾ 10"] },
          { values: ["12,5 × 10³", "12,5", "non, ⩾ 10"] },
          { values: ["1,25 × 10⁴", "1,25", "OUI"] },
          { values: ["0,125 × 10⁵", "0,125", "non, < 1"] },
        ],
        highlight: { row: 2 },
        caption: "quatre écritures du même nombre, une seule scientifique",
      }),
    },
  ],
  reel: {
    texte:
      "La notation scientifique est née du besoin d'écrire ce qui ne tient pas sur une ligne. Un globule rouge mesure $7 \\times 10^{-6}$ m ; la Terre-Lune fait $3,8 \\times 10^{5}$ km ; le Piton des Neiges culmine à $3,1 \\times 10^{3}$ m. À La Réunion, le cyclone Hyacinthe a déversé en 1980 près de $6 \\times 10^{3}$ mm de pluie en quinze jours à Commerson — record mondial. Personne n'écrit ces nombres en toutes lettres : on écrit la mantisse, et la puissance de 10 dit la taille. Un disque dur d'un téraoctet, c'est $10^{12}$ octets, et une seconde de son échantillonné en compte $4,4 \\times 10^{4}$.",
  },
  historique: {
    texte:
      "L'écriture avec un petit chiffre en haut est de René Descartes, en 1637, dans « La Géométrie ». Avant lui on écrivait « cubus » ou on répétait la lettre : Viète notait « A quadratum » ce que nous notons $A^{2}$. Descartes n'a d'abord utilisé ses exposants que pour les puissances entières positives ; c'est Wallis, puis Newton, qui ont étendu l'écriture aux exposants négatifs vers 1660, en remarquant justement que descendre l'échelle des exposants revient à diviser — le raisonnement du tableau de cette fiche. La notation scientifique, elle, s'est imposée au XXe siècle avec l'astronomie et la physique atomique, deux sciences qui manipulent des nombres que la main ne peut plus écrire.",
  },
  formule: {
    contexte: "Pour tout nombre a non nul et tout entier n",
    expression: "aⁿ = a × a × … × a  (n facteurs)   et   a⁻ⁿ = 1 / aⁿ",
    legende:
      "Descendre d'un exposant, c'est diviser par la base. Le tableau le montre sans rien à admettre : après 2¹ = 2 vient 2⁰ = 1, puis 2⁻¹ = 0,5. La convention a⁰ = 1 n'est pas arbitraire, elle prolonge la division.",
    schema: echelleExposants,
  },
  methode: [
    {
      titre: "Calculer une puissance",
      micros: ["puissance_calculer"],
      // ⛔ Le seul bloc sans dessin de la fiche. Un schéma ne ferait que redire
      // le texte : la méthode EST l'écriture du produit, et elle est déjà écrite.
      texte:
        "On écrit le produit en entier, puis on calcule pas à pas. $4^{3} = 4 \\times 4 \\times 4 = 16 \\times 4 = 64$. Si la base est négative, on compte les facteurs négatifs : un nombre PAIR de facteurs donne un résultat positif, un nombre IMPAIR le laisse négatif.",
    },
    {
      titre: "Passer en notation scientifique",
      micros: ["puissance_notation_scientifique"],
      texte:
        "On place la virgule juste après le premier chiffre non nul, puis on compte de combien de rangs elle s'est déplacée : c'est l'exposant. Vers la gauche il est positif, vers la droite il est négatif. $34\\,500$ donne $3,45 \\times 10^{4}$ ; $0,0072$ donne $7,2 \\times 10^{-3}$.",
      schema: legende(
        droite(
          [
            { value: -3, label: "0,0072", color: ROUGE },
            { value: 0, label: "1", color: "#64748b" },
            { value: 4, label: "34500", color: BLEU },
          ],
          -4,
          5,
          1
        ),
        "l'axe des EXPOSANTS : à gauche les petits, à droite les grands"
      ),
    },
    {
      titre: "Comparer deux écritures scientifiques",
      micros: ["puissance_comparer"],
      texte:
        "L'exposant décide d'abord : la mantisse étant toujours entre 1 et 10, elle ne peut pas rattraper une puissance de 10 de plus. On ne compare les mantisses que si les exposants sont ÉGAUX. Ainsi $8,5 \\times 10^{3}$ est plus petit que $3,2 \\times 10^{4}$, malgré une mantisse plus grande.",
      schema: legende(
        barres([
          { label: "8,5·10³", value: 8500, color: ROUGE },
          { label: "3,2·10⁴", value: 32000, color: BLEU },
        ]),
        "la plus grande mantisse ne fait pas le plus grand nombre",
      ),
    },
    {
      titre: "Calculer avec des puissances",
      micros: ["puissance_calcul"],
      texte:
        "On calcule chaque puissance séparément, puis on effectue l'opération. $2^{3} + 4^{2} = 8 + 16 = 24$. Pour un produit de puissances de 10, on écrit les deux nombres et on compte les zéros : $10^{3} \\times 10^{2} = 1\\,000 \\times 100 = 100\\,000$, soit cinq zéros.",
      schema: tableau({
        headers: ["calcul", "chaque puissance", "résultat"],
        rows: [
          { values: ["2³ + 4²", "8 + 16", "24"] },
          { values: ["10³ × 10²", "1000 × 100", "100 000"] },
          { values: ["3² × 10²", "9 × 100", "900"] },
        ],
        caption: "on calcule d'abord, on opère ensuite",
      }),
    },
  ],
  usages: [
    {
      titre: "Le nombre est très grand",
      micros: ["puissance_notation_scientifique"],
      detail:
        "On passe en notation scientifique : la mantisse donne la précision, l'exposant donne la taille. $1\\,500\\,000\\,000 = 1,5 \\times 10^{9}$.",
    },
    {
      titre: "Le nombre est très petit",
      micros: ["puissance_exposant_negatif"],
      detail:
        "Même méthode, exposant négatif. $0,000\\,004 = 4 \\times 10^{-6}$. ⚠️ Le nombre reste positif : c'est sa TAILLE qui est petite, pas son signe.",
    },
    {
      titre: "On doit comparer deux tailles",
      micros: ["puissance_comparer"],
      detail:
        "On écrit les deux en notation scientifique, et on regarde les exposants. C'est le seul cas où l'on peut conclure sans calculer.",
    },
    {
      titre: "Quelque chose double, ou triple, à chaque étape",
      micros: ["puissance_defi"],
      detail:
        "C'est une puissance de 2 ou de 3, pas une multiplication. Doubler 10 fois multiplie par $2^{10} = 1\\,024$, pas par 20.",
    },
  ],
  exemples: [
    {
      titre: "Écrire un grand nombre en notation scientifique",
      micros: ["puissance_notation_scientifique"],
      donnees: "Le nombre 34 500.",
      question: "L'écrire en notation scientifique.",
      solution:
        "On place la virgule après le premier chiffre : 3,45. Elle s'est déplacée de 4 rangs vers la gauche, donc l'exposant est 4. Réponse : $3,45 \\times 10^{4}$.\n\n⚠️ $34,5 \\times 10^{3}$ vaut le même nombre, mais n'est PAS la notation scientifique : sa mantisse dépasse 10.",
    },
    {
      titre: "Un exposant négatif",
      micros: ["puissance_exposant_negatif"],
      donnees: "Le nombre $2^{-3}$.",
      question: "L'écrire sous forme de fraction, puis en décimal.",
      solution:
        "L'exposant négatif désigne l'inverse : $2^{-3} = \\frac{1}{2^{3}} = \\frac{1}{8}$. En décimal, $1 \\div 8 = 0,125$.\n\nRéponse : $\\frac{1}{8}$, soit 0,125 — un nombre positif, plus petit que 1.",
      schema: legende(
        tableau(
          {
            headers: ["écriture", "ce que ça vaut"],
            rows: [
              { values: ["2⁻³", "1/8 = 0,125"] },
              { values: ["−2³", "−8"] },
            ],
            highlight: { row: 0 },
          },
          "exemple"
        ),
        "deux écritures qu'on confond, deux nombres opposés de nature"
      ),
    },
    {
      titre: "La colonie de bactéries",
      micros: ["puissance_defi", "puissance_calculer"],
      donnees: "Une colonie compte 5 bactéries et double chaque heure.",
      question: "Combien en compte-t-elle après 8 heures ?",
      solution:
        "Doubler 8 fois, c'est multiplier par $2^{8}$. Or $2^{8} = 256$.\n\nCalcul : $5 \\times 256 = 1\\,280$ bactéries.\n\n⚠️ L'erreur classique est d'écrire $5 \\times 2 \\times 8 = 80$. Doubler n'AJOUTE pas huit fois, il MULTIPLIE huit fois.",
    },
  ],
  pieges: [
    "Confondre $3^{2}$ et $3 \\times 2$. L'exposant COMPTE les facteurs, il n'en est pas un : $3^{2} = 9$, pas 6.",
    "Croire qu'un exposant négatif donne un nombre négatif. $2^{-3} = 0,125$ est POSITIF. Le négatif porte sur l'exposant, pas sur le nombre.",
    "Oublier les parenthèses : $(-2)^{2} = 4$ mais $-2^{2} = -4$. Ce ne sont pas deux façons d'écrire la même chose.",
    "Écrire $12,5 \\times 10^{3}$ en croyant faire de la notation scientifique. La mantisse doit être comprise entre 1 (inclus) et 10 (exclu).",
    "Comparer deux écritures scientifiques par leur mantisse. C'est l'EXPOSANT qui décide d'abord — $8,5 \\times 10^{3} < 3,2 \\times 10^{4}$.",
    "Écrire $a^{0} = 0$. C'est 1, et le tableau de l'échelle des exposants montre pourquoi : on divise par la base à chaque marche.",
  ],
  aRetenir: [
    "$a^{n} = a \\times a \\times \\dots \\times a$, avec $n$ facteurs. La base est répétée, l'exposant les compte.",
    "$a^{0} = 1$ et $a^{1} = a$, pour tout nombre $a$ non nul.",
    "$a^{-n} = \\frac{1}{a^{n}}$ : un exposant négatif désigne un INVERSE, jamais un opposé.",
    "Pour les puissances de 10, l'exposant compte les zéros : $10^{5} = 100\\,000$ et $10^{-3} = 0,001$.",
    "Notation scientifique : $a \\times 10^{n}$ avec $1 \\leqslant a < 10$. Un seul chiffre non nul avant la virgule.",
    "Pour comparer deux écritures scientifiques : l'exposant d'abord, la mantisse seulement s'ils sont égaux.",
  ],
  entrainement: [
    {
      micros: ["puissance_comprendre"],
      question: "Écrire $4^{3}$ sous forme de produit, puis calculer.",
      correction: "$4^{3} = 4 \\times 4 \\times 4 = 64$.",
    },
    {
      micros: ["puissance_calculer"],
      question: "Calculer $(-3)^{2}$ puis $-3^{2}$.",
      correction:
        "$(-3)^{2} = (-3) \\times (-3) = 9$ : deux facteurs négatifs, résultat positif. $-3^{2} = -(3 \\times 3) = -9$ : la puissance ne porte que sur 3.",
    },
    {
      micros: ["puissance_exposant_negatif"],
      question: "Écrire $5^{-2}$ sous forme de fraction.",
      correction: "$5^{-2} = \\frac{1}{5^{2}} = \\frac{1}{25}$, soit 0,04.",
    },
    {
      micros: ["puissance_dix"],
      question: "Combien vaut $10^{6}$ ? Et $10^{-4}$ ?",
      correction:
        "$10^{6} = 1\\,000\\,000$ (1 suivi de six zéros). $10^{-4} = 0,0001$ (quatre chiffres après la virgule).",
    },
    {
      micros: ["puissance_notation_scientifique"],
      question: "Écrire 0,000 82 en notation scientifique.",
      correction:
        "On place la virgule après le 8 : 8,2. Elle s'est déplacée de 4 rangs vers la droite, donc l'exposant est $-4$. Réponse : $8,2 \\times 10^{-4}$.",
    },
    {
      micros: ["puissance_comparer"],
      question: "Ranger dans l'ordre croissant : $6,1 \\times 10^{3}$, $2,4 \\times 10^{5}$, $9,8 \\times 10^{3}$.",
      correction:
        "Les deux premiers exposants valent 3, le dernier 5. Entre les deux écritures en $10^{3}$, on compare les mantisses : $6,1 < 9,8$. Réponse : $6,1 \\times 10^{3} < 9,8 \\times 10^{3} < 2,4 \\times 10^{5}$.",
    },
    {
      micros: ["puissance_calcul"],
      question: "Calculer $10^{4} \\times 10^{2}$, en écrivant les deux nombres.",
      correction:
        "$10\\,000 \\times 100 = 1\\,000\\,000$. Le résultat porte $4 + 2 = 6$ zéros, donc $10^{6}$.",
    },
    {
      micros: ["puissance_defi"],
      question:
        "On plie une feuille en deux, 10 fois de suite. Combien d'épaisseurs obtient-on ?",
      correction:
        "Chaque pliage double : $2^{10} = 1\\,024$ épaisseurs. ⚠️ Ce n'est pas $2 \\times 10 = 20$.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesPuissances4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Puissances et notation scientifique - 4e",
    section: {
      type: "objectif",
      phrase: "L'exposant COMPTE les facteurs",
      sousPhrase:
        "Il ne multiplie pas : 3 puissance 2 vaut 9, pas 6. C'est la première chose à installer, et l'erreur la plus fréquente de l'année.",
      encadre: {
        titre: "L'idée",
        texte:
          "Une puissance résume une multiplication répétée : 2 puissance 5, c'est 2 écrit cinq fois en facteur, et cela vaut 32.",
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
        titre: "Dans les sciences",
        contenu:
          "Un globule rouge mesure 7 millionièmes de mètre, la Terre-Lune fait 380 000 km, le Piton des Neiges culmine à 3 100 m. Personne n'écrit ces nombres en entier : on écrit la mantisse, et la puissance de 10 dit la taille.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le petit chiffre en haut est de Descartes, en 1637. Avant lui on écrivait « A quadratum » pour A au carré. Ce sont Wallis et Newton qui ont étendu l'écriture aux exposants négatifs, vers 1660.",
      },
    },
  },
  {
    titre: "Les deux mots",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "La BASE est répétée, l'EXPOSANT les compte",
      sousPhrase:
        "Dans 2 puissance 5, la base est 2 et l'exposant est 5. On dit « au carré » pour l'exposant 2 parce que c'est vraiment un carré : 5 puissance 2, ce sont les 25 cases d'un carré de 5 sur 5.",
      encadre: {
        titre: "Attention",
        texte:
          "Un exposant négatif ne rend pas le nombre négatif. 2 puissance moins 3 vaut 0,125 : c'est un INVERSE, pas un opposé.",
      },
    },
  },
  {
    titre: "Pourquoi a puissance 0 vaut 1",
    badge: "La démonstration en cinq lignes",
    section: {
      type: "etapes",
      etapes: [
        "2 puissance 3 vaut 8.",
        "On descend d'un exposant : on divise par 2. Donc 2 puissance 2 vaut 4.",
        "On divise encore : 2 puissance 1 vaut 2.",
        "On divise encore : 2 puissance 0 vaut 1. Rien à admettre, c'est la suite de la division.",
        "Et on continue : 2 puissance moins 1 vaut 0,5, c'est-à-dire un demi.",
      ],
    },
  },
  {
    titre: "Le piège des parenthèses",
    badge: "Ce qui coûte des points",
    section: {
      type: "objectif",
      phrase: "moins 2 au carré n'est pas (moins 2) au carré",
      sousPhrase:
        "Avec les parenthèses, c'est moins 2 qui est répété : moins 2 fois moins 2 fait plus 4. Sans elles, la puissance ne porte que sur le 2, et le signe reste devant : moins 4.",
      encadre: {
        titre: "La règle",
        texte:
          "On compte les facteurs négatifs : un nombre PAIR donne un résultat positif, un nombre IMPAIR le laisse négatif.",
      },
    },
  },
  {
    titre: "Les 4 réflexes",
    badge: "La méthode",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Calculer une puissance",
          texte:
            "On écrit le produit en entier, puis on calcule pas à pas. 4 puissance 3 = 4 × 4 × 4 = 64.",
        },
        {
          titre: "Passer en notation scientifique",
          texte:
            "On place la virgule après le premier chiffre non nul, et on compte les rangs franchis : c'est l'exposant.",
        },
        {
          titre: "Comparer deux écritures",
          texte:
            "L'exposant décide d'abord. On ne compare les mantisses que si les exposants sont égaux.",
        },
        {
          titre: "Calculer avec des puissances",
          texte:
            "On calcule chaque puissance séparément, puis on effectue l'opération. Aucune formule sur les exposants en 4e.",
        },
      ],
    },
  },
  {
    titre: "La notation scientifique",
    badge: "Une forme unique",
    section: {
      type: "objectif",
      phrase: "Un seul chiffre non nul avant la virgule",
      sousPhrase:
        "12 500 s'écrit 125 fois 10 puissance 2, ou 12,5 fois 10 puissance 3, ou 1,25 fois 10 puissance 4. Une seule de ces écritures est scientifique : celle dont la mantisse est comprise entre 1 et 10.",
      encadre: {
        titre: "Pourquoi une forme unique",
        texte:
          "Parce qu'alors deux nombres se comparent d'un coup d'œil : l'exposant donne la taille, la mantisse affine.",
      },
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    section: {
      type: "exemple",
      enonce: "Le nombre 34 500.",
      question: "L'écrire en notation scientifique.",
      correction:
        "On place la virgule après le premier chiffre : 3,45. Elle s'est déplacée de 4 rangs vers la gauche, donc l'exposant est 4. Réponse : 3,45 fois 10 puissance 4. Attention : 34,5 fois 10 puissance 3 vaut le même nombre, mais n'est pas la notation scientifique — sa mantisse dépasse 10.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    section: {
      type: "exercice",
      enonce: "Une colonie compte 5 bactéries et double chaque heure.",
      question: "Combien en compte-t-elle après 8 heures ?",
      indice: "Doubler 8 fois, ce n'est pas multiplier par 8.",
      correction:
        "Doubler 8 fois, c'est multiplier par 2 puissance 8, qui vaut 256. Donc 5 × 256 = 1 280 bactéries. L'erreur classique est d'écrire 5 × 2 × 8 = 80 : doubler n'ajoute pas huit fois, il multiplie huit fois.",
    },
  },
];
