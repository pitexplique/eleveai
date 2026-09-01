// ─── Fiche de cours : résoudre une équation (3e) ───────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/equations.bank.ts, notionId equation_resolution).
//
// ⭐ LA 3e N'AJOUTE QU'UNE SEULE CHOSE — ET ELLE CHANGE TOUT. Comparaison des
// micros, faite avant d'écrire :
//   4e  `equation_resolution` — HUIT micros, toutes du PREMIER DEGRÉ :
//       reconnaitre, traduire, résoudre simple, avec réduction, avec
//       distributivité, vérifier, problème, défis.
//   3e  `equation_resolution` — SEPT micros, dont SIX reprennent les mêmes
//       gestes. La seule nouveauté est `equation_produit_nul`.
// 👉 Mais elle casse une évidence installée depuis la 4e : jusqu'ici, une
// équation avait UNE solution. Une équation produit nul en a DEUX. C'est le
// centre de gravité de la fiche, et le piège que la banque teste trois fois
// (« (x−4)(x+2) = 0 donc x = 4 et x = 2 » — le signe est oublié).
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE. Tous les exemples
// de la fiche sortent de la banque :
//   equation_reconnaitre        → une équation a un signe = et une inconnue
//   equation_resoudre_simple    → x + 7 = 12 ; 4x = 28
//   equation_resoudre_developper→ 2(x + 3) = 14 ; et 3(x+4) ≠ 3x + 4
//   equation_produit_nul        → (x−3)(x+5) = 0 ; (x−a)² = 0 ; les deux pièges
//   equation_verifier           → 4 est-il solution de 3x + 2 = 14 ?
//   equation_probleme           → les samoussas à La Réunion ; les tours de piste
//   equation_defi               → défis
//
// ⛔⛔ UN TROU DU COACH, SIGNALÉ ET NON COMBLÉ ICI. Le BO du cycle 4 demande
// « annulation d'un produit, équations produits, ÉQUATIONS DU TYPE x² = a ».
// Or `x² = a` n'existe NULLE PART comme question : dans les banques de 3e, la
// chaîne « x^2 = » n'apparaît que dans les EXPLICATIONS de `racine_carree`,
// jamais comme équation à résoudre. Il n'y a donc pas de micro pour elle.
// ⭐ La fiche la traite quand même — c'est au programme, et un élève qui lit son
// cours doit l'y trouver. Mais le coach ne peut pas la faire travailler : ça
// demande une micro, donc toute la chaîne (bo → notions → microSkills →
// matrice → banque). C'est un chantier à part, pas un ajout de ligne.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

const LARGEUR = { carte: 222, formule: 216, exemple: 200 } as const;

const tableau = (
  data: Record<string, unknown>,
  bloc: keyof typeof LARGEUR = "carte"
) => (
  <CanvasRenderer
    figure={
      { kind: "tableau_donnees", display: { compact: bloc !== "carte" }, ...data } as never
    }
  />
);

/**
 * La droite graduée, pour MONTRER que deux solutions, ce sont deux points.
 * ⚠️ Ses étiquettes sont CENTRÉES SUR LEUR VALEUR : un point posé sur `min` ou
 * sur `max` verrait la moitié de son libellé sortir du cadre. On laisse donc
 * toujours une graduation de marge de chaque côté.
 * ⛔ ET LA PLAGE DÉCIDE DE LA LISIBILITÉ. Premier jet : −7 à 6, soit quatorze
 * graduations dans 222 px. Mesuré, « -7 » finissait en 35 et « -6 » commençait
 * en 34 : les nombres se touchaient et la droite se lisait « -7-6-5-4 ». Onze
 * graduations laissent 6 px de blanc entre deux libellés. La largeur du bloc
 * fixe donc le nombre de graduations, pas l'inverse.
 */
const droite = (
  points: { value: number; label?: string; color?: string }[],
  min: number,
  max: number,
  bloc: keyof typeof LARGEUR = "carte",
  // ⭐ LE PAS EST UN PARAMÈTRE, sur la suggestion de Frédéric : « tu peux aller
  // de 2 en 2 sinon ». C'est le second levier contre l'entassement — resserrer
  // la plage, ou espacer les graduations.
  // ⚠️ Mais il ne convient pas partout : avec un pas de 2, les solutions
  // IMPAIRES (−5, 3) tombent entre deux graduations et l'on perd la lecture
  // exacte, qui est justement ce qu'on veut montrer là. Pas de 1 quand les
  // solutions sont entières, pas de 2 quand la plage doit rester large.
  step = 1
) => (
  <CanvasRenderer
    figure={
      {
        kind: "number_line",
        min,
        max,
        step,
        points,
        display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
        size: { width: LARGEUR[bloc] },
      } as never
    }
  />
);

/**
 * La parabole y = x² coupée par une horizontale y = a.
 * ⭐ C'EST LA LECTURE GRAPHIQUE DEMANDÉE PAR FRÉDÉRIC, et elle rend visible ce
 * que l'algèbre affirme : deux solutions, ce sont deux POINTS d'intersection,
 * symétriques par rapport à l'axe vertical. Et si l'horizontale descend sous
 * l'axe, elle ne coupe plus rien — c'est le « aucune solution » qu'on annonce
 * autrement sans le montrer.
 * ⚠️ Les libellés des points sont tracés en `<text>` SVG : ils s'écrivent donc
 * en Unicode (√5), jamais en LaTeX, qui s'y afficherait en clair.
 */
const parabole = (
  a: number,
  points: { x: number; y: number; label: string }[],
  bloc: keyof typeof LARGEUR = "carte"
) => (
  <CanvasRenderer
    figure={
      {
        kind: "fonctionGraphique",
        // ⛔ LA FENÊTRE N'EST PAS COSMÉTIQUE, ELLE DÉCIDE DU CADRAGE. Premier
        // jet : ymin = −1 et ymax = 10. L'axe horizontal tombait alors à 91 %
        // de la hauteur, et ses graduations, écrites 17 px SOUS lui, sortaient
        // toutes du cadre — les neuf. Le point (−3 ; 9), lui, frôlait le bord
        // haut et son libellé passait au-dessus.
        // 👉 On laisse deux unités sous l'axe et deux au-dessus du plus haut
        // point : la fenêtre garde la place des étiquettes, pas seulement celle
        // de la courbe.
        xmin: -4,
        xmax: 4,
        ymin: -2,
        ymax: 11,
        grille: true,
        courbes: [{ id: "p", type: "quadratique", a: 1, b: 0, c: 0, couleur: "#2563eb" }],
        misesEnEvidence: [
          { horizontale: { y: a, couleur: "#dc2626" } },
          ...points.map((pt) => ({
            point: { x: pt.x, y: pt.y, label: pt.label, couleur: "#dc2626" },
          })),
        ],
        size: { width: LARGEUR[bloc], height: Math.round(LARGEUR[bloc] * 0.9) },
      } as never
    }
  />
);

export const ficheEquations3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "equation-resolution",
  titre: "Résoudre une équation",
  accroche:
    "Depuis la quatrième, une équation avait une réponse, et une seule. La troisième apporte une nouveauté qui a l'air modeste — l'équation produit nul — et qui casse cette évidence : une équation peut désormais avoir deux solutions, et n'en donner qu'une, c'est n'avoir répondu qu'à moitié.",
  identite: [
    { label: "Prérequis", valeur: "Calcul littéral, développement, équations du 1er degré (4e)" },
    { label: "L'idée clé", valeur: "Un produit est nul si l'un de ses facteurs l'est" },
    { label: "Outil", valeur: "Développer, factoriser, vérifier" },
  ],
  definition: {
    texte:
      "Une équation est une égalité qui contient une inconnue, presque toujours notée x. La résoudre, c'est trouver TOUTES les valeurs de x qui rendent l'égalité vraie : ces valeurs sont les solutions. Pour y arriver, on transforme l'équation par des opérations appliquées des DEUX CÔTÉS du signe égal, jusqu'à isoler x. Une équation peut n'avoir aucune solution, une seule, ou plusieurs.",
  },
  figure: {
    schema: legende(
      tableau({
        headers: ["l'écriture", "est-ce une équation ?"],
        rows: [
          { values: ["3x + 4 = 19", "oui : un = et une inconnue"] },
          { values: ["3x + 4", "non : pas de signe ="] },
          { values: ["3 + 4 = 7", "non : pas d'inconnue"] },
        ],
        highlight: { row: 0 },
        caption: "il faut les deux à la fois",
      }),
      "un signe $=$ ET une inconnue : les deux sont nécessaires",
    ),
    legende:
      "Une expression sans signe égal ne se résout pas, et une égalité sans inconnue n'a rien à chercher.",
  },
  proprietes: [
    {
      titre: "Ce qu'on fait d'un côté, on le fait de l'autre",
      texte:
        "C'est la règle unique du premier degré. Une équation est une balance : ajouter, retrancher, multiplier ou diviser d'un seul côté la déséquilibre et change les solutions. On applique donc la même opération aux deux membres.",
      micros: ["equation_resoudre_simple"],
      schema: tableau({
        headers: ["étape", "l'équation"],
        rows: [
          { values: ["au départ", "x + 7 = 12"] },
          { values: ["on retire 7 partout", "x = 12 − 7"] },
          { values: ["on calcule", "x = 5"] },
        ],
        highlight: { row: 2 },
        caption: "la même opération des deux côtés",
      }),
    },
    {
      titre: "On isole x en défaisant les opérations",
      texte:
        "On enlève d'abord ce qui est ajouté, puis on divise par ce qui multiplie. Pour 4x = 28, on divise les deux membres par 4 et l'on obtient x = 7. L'ordre compte : additions d'abord, multiplication ensuite.",
      micros: ["equation_resoudre_simple"],
      schema: tableau({
        headers: ["l'équation", "la solution"],
        rows: [
          { values: ["x + 7 = 12", "x = 5"] },
          { values: ["4x = 28", "x = 7"] },
          { values: ["2x + 3 = 11", "x = 4"] },
        ],
        caption: "on défait dans l'ordre inverse",
      }),
    },
    {
      titre: "On développe avant de résoudre",
      texte:
        "Quand une parenthèse est multipliée, on la développe d'abord : 2(x + 3) = 14 devient 2x + 6 = 14, puis x = 4. ATTENTION : le facteur multiplie TOUT ce qui est dans la parenthèse. Écrire 3(x + 4) = 3x + 4 est faux — c'est 3x + 12.",
      micros: ["equation_resoudre_developper"],
      schema: tableau({
        headers: ["écriture", "développement"],
        rows: [
          { values: ["2(x + 3)", "2x + 6"] },
          { values: ["3(x + 4)", "3x + 12"] },
          { values: ["3(x + 4) = 3x + 4", "FAUX"] },
        ],
        highlight: { row: 2 },
        caption: "le facteur multiplie tout",
      }),
    },
    {
      titre: "Un produit est nul si un facteur est nul",
      texte:
        "C'est la nouveauté de la troisième, et c'est une propriété des nombres, pas une astuce : un produit de deux facteurs vaut zéro exactement quand l'un des deux vaut zéro. Aucun autre cas n'est possible, parce que multiplier deux nombres non nuls ne donne jamais zéro.",
      micros: ["equation_produit_nul"],
      schema: tableau({
        headers: ["si", "alors"],
        rows: [
          { values: ["A × B = 0", "A = 0 ou B = 0"] },
          { values: ["(x − 3)(x + 5) = 0", "x − 3 = 0 ou x + 5 = 0"] },
          { values: ["on résout séparément", "x = 3 ou x = −5"] },
        ],
        highlight: { row: 2 },
        caption: "deux facteurs, donc deux équations",
      }),
    },
    {
      titre: "Deux solutions, et il faut les deux",
      texte:
        "Une équation produit nul a en général DEUX solutions, et une réponse qui n'en donne qu'une est incomplète. Le piège le plus fréquent est le signe : dans (x − 4)(x + 2) = 0, la seconde solution est −2, pas 2. On résout chaque facteur comme une équation à part entière.",
      micros: ["equation_produit_nul"],
      schema: legende(
        droite([
          { value: -5, label: "−5" },
          { value: 3, label: "3" },
        ], -6, 4),
        "$(x-3)(x+5)=0$ : deux points, pas un",
      ),
    },
    {
      titre: "Un carré nul ne donne qu'une solution",
      texte:
        "C'est l'exception, et elle se comprend : (x − 4)² = 0 s'écrit (x − 4)(x − 4) = 0, donc les deux facteurs sont le même. Les deux équations à résoudre sont identiques, et la solution unique est x = 4.",
      micros: ["equation_produit_nul"],
      schema: tableau({
        headers: ["l'équation", "solutions"],
        rows: [
          { values: ["(x − 3)(x + 5) = 0", "3 et −5"] },
          { values: ["(x − 4)² = 0", "4 seulement"] },
        ],
        highlight: { row: 1 },
        caption: "deux facteurs identiques, une seule solution",
      }),
    },
    {
      // ⛔ CE BLOC N'A PAS DE MICRO DERRIÈRE LUI. Le BO du cycle 4 demande les
      // « équations du type x² = a », mais aucune question de la banque ne la
      // pose : la chaîne « x^2 = » n'apparaît que dans les explications de
      // `racine_carree`. La fiche l'enseigne quand même — c'est au programme —
      // mais le coach ne peut pas la faire travailler. Signalé à Frédéric.
      titre: "L'équation x² = a a deux solutions",
      texte:
        "Un carré ne dit pas le signe : x² = 9 est vraie pour 3 ET pour −3, puisque (−3)² vaut aussi 9. Les solutions sont donc la racine carrée de a et son opposée. Si a est négatif, il n'y a AUCUNE solution : un carré n'est jamais négatif. Et si a vaut 0, il n'y en a qu'une, zéro.",
      micros: ["equation_produit_nul"],
      schema: legende(
        droite([
          { value: -3, label: "−3" },
          { value: 3, label: "3" },
        ], -5, 5),
        "$x^2 = 9$ : deux solutions opposées",
      ),
    },
    {
      titre: "Sur un graphique : deux points d'intersection",
      texte:
        "La courbe de y = x² est une parabole. Résoudre x² = 9, c'est chercher où elle rencontre la droite horizontale d'ordonnée 9 : il y a deux points, d'abscisses −3 et 3. Ils sont symétriques par rapport à l'axe vertical, ce qui explique d'un coup d'œil pourquoi les deux solutions sont opposées.",
      micros: ["equation_produit_nul"],
      schema: legende(
        parabole(9, [
          { x: -3, y: 9, label: "−3" },
          { x: 3, y: 9, label: "3" },
        ]),
        "$x^2 = 9$ : la droite coupe la parabole en deux points",
      ),
    },
    {
      titre: "Et quand le carré n'est pas parfait",
      texte:
        "Pour x² = 5, la droite coupe toujours la parabole en deux points, mais leurs abscisses ne tombent sur aucune graduation : le graphique donne « un peu plus de 2 » et rien de plus. C'est justement là que la racine carrée devient nécessaire — les solutions s'écrivent exactement −√5 et √5, et valent environ −2,2 et 2,2.",
      micros: ["equation_produit_nul"],
      schema: legende(
        parabole(5, [
          { x: -2.236, y: 5, label: "−√5" },
          { x: 2.236, y: 5, label: "√5" },
        ]),
        "$x^2 = 5$ : les points existent, mais ne se lisent pas",
      ),
    },
    {
      titre: "Où tombent exactement −√5 et √5",
      texte:
        "Reportées sur une droite graduée, les deux solutions se placent ENTRE 2 et 3, un peu après 2. Elles sont toujours symétriques par rapport à zéro, comme dans le cas du carré parfait — mais aucune graduation ne les porte. C'est précisément pour nommer ces nombres-là que la racine carrée existe.",
      micros: ["equation_produit_nul"],
      schema: legende(
        droite([
          { value: -2.236, label: "−√5" },
          { value: 2.236, label: "√5" },
        ], -4, 4),
        "$-\sqrt{5} \approx -2{,}2$ et $\sqrt{5} \approx 2{,}2$ : entre deux graduations",
      ),
    },
    {
      titre: "Une solution se vérifie en remplaçant",
      texte:
        "Pour savoir si un nombre est solution, on le remplace partout dans l'équation et l'on calcule LES DEUX MEMBRES. S'ils donnent le même résultat, c'est une solution. Calculer un seul côté ne prouve rien : c'est l'égalité qu'on teste, pas un membre.",
      micros: ["equation_verifier"],
      schema: tableau({
        headers: ["à gauche", "à droite", "solution ?"],
        rows: [
          { values: ["3 × 4 + 2 = 14", "14", "oui"] },
          { values: ["2 × 5 + 1 = 11", "12", "non"] },
        ],
        caption: "on calcule les deux membres",
      }),
    },
  ],
  reel: {
    texte:
      "Poser une équation, c'est donner un nom à ce qu'on ne sait pas encore, puis laisser le calcul le trouver. Combien de samoussas peut-on acheter avec dix euros si la boisson en coûte deux ? Combien de tours de piste après un premier kilomètre ? Combien de mois avant qu'un abonnement devienne rentable ? Dans chaque cas on écrit la phrase avec un x, et la résolution répond. C'est le geste que font, sans le dire, un devis, un budget ou un calcul de dosage.",
  },
  historique: {
    texte:
      "Le mot « algèbre » vient du titre d'un livre écrit à Bagdad vers 820 par Al-Khwârizmî : « al-jabr », qui désigne l'opération consistant à faire passer un terme de l'autre côté. Son nom, latinisé, a donné « algorithme ». Il écrivait encore tout en toutes lettres ; l'inconnue notée x et le signe égal n'arrivent qu'au XVIe siècle, avec Viète et Recorde — près de sept siècles plus tard.",
  },
  formule: {
    contexte: "L'équation produit nul",
    expression: "$A \\times B = 0 \\iff A = 0 \\text{ ou } B = 0$",
    legende:
      "(x − 3)(x + 5) = 0 donne x = 3 ou x = −5. Attention au signe : le facteur (x + 5) s'annule en −5, pas en 5.",
    schema: legende(
      tableau(
        {
          headers: ["facteur", "s'annule en"],
          rows: [
            { values: ["x − 3", "3"] },
            { values: ["x + 5", "−5"] },
          ],
          highlight: { col: 1 },
        },
        "formule",
      ),
      "le signe s'inverse en passant de l'autre côté",
    ),
  },
  methode: [
    {
      titre: "Développer et réduire d'abord",
      texte:
        "S'il y a des parenthèses multipliées, on développe. On regroupe ensuite les x d'un côté et les nombres de l'autre, toujours en appliquant la même opération aux deux membres.",
      micros: ["equation_resoudre_developper"],
    },
    {
      titre: "Reconnaitre un produit nul",
      texte:
        "Si l'équation se présente sous la forme d'un PRODUIT égal à ZÉRO, on ne développe SURTOUT PAS : développer détruirait la factorisation, qui est justement ce qui permet de conclure.",
      micros: ["equation_produit_nul"],
    },
    {
      titre: "Résoudre chaque facteur à part",
      texte:
        "On écrit deux équations du premier degré, une par facteur, et on les résout séparément. Puis on donne les DEUX solutions : « x = 3 ou x = −5 ».",
      micros: ["equation_produit_nul"],
      schema: tableau({
        headers: ["on écrit", "on obtient"],
        rows: [
          { values: ["x − 3 = 0", "x = 3"] },
          { values: ["x + 5 = 0", "x = −5"] },
        ],
        caption: "deux équations, deux solutions",
      }),
    },
    {
      titre: "Vérifier avant de conclure",
      texte:
        "On remplace chaque solution trouvée dans l'équation de départ et l'on calcule les deux membres. C'est le seul contrôle qui détecte une erreur de signe, l'erreur la plus fréquente du chapitre.",
      micros: ["equation_verifier"],
    },
    {
      titre: "Traduire un problème",
      texte:
        "On appelle x la quantité cherchée, on écrit l'énoncé sous forme d'égalité, on résout — et on revient à la question posée pour répondre par une phrase.",
      micros: ["equation_probleme"],
    },
  ],
  usages: [
    {
      titre: "L'équation est du premier degré",
      detail:
        "Un seul x, sans carré ni parenthèse en facteur : on isole x en appliquant la même opération des deux côtés.",
      micros: ["equation_resoudre_simple"],
    },
    {
      titre: "L'équation est un produit égal à zéro",
      detail:
        "On ne développe pas. On annule chaque facteur séparément, et on donne toutes les solutions.",
      micros: ["equation_produit_nul"],
    },
    {
      titre: "On veut savoir si un nombre est solution",
      detail:
        "On le remplace et on calcule les deux membres : ils doivent être égaux.",
      micros: ["equation_verifier"],
    },
  ],
  exemples: [
    {
      titre: "Une équation du premier degré",
      donnees: "L'équation 2(x + 3) = 14.",
      question: "Quelle est la solution ?",
      solution:
        "On développe : 2x + 6 = 14. On retire 6 des deux côtés : 2x = 8. On divise les deux membres par 2 : x = 4. Vérification : 2 × (4 + 3) = 2 × 7 = 14. C'est bien la solution.",
      micros: ["equation_resoudre_developper"],
    },
    {
      titre: "Une équation produit nul",
      donnees: "L'équation (x − 3)(x + 5) = 0.",
      question: "Quelles sont les solutions ?",
      solution:
        "Un produit est nul si l'un de ses facteurs l'est. On résout donc x − 3 = 0, qui donne x = 3, puis x + 5 = 0, qui donne x = −5. L'équation a deux solutions : 3 et −5. Vérification pour −5 : (−5 − 3) × (−5 + 5) = (−8) × 0 = 0.",
      micros: ["equation_produit_nul"],
      schema: legende(
        droite(
          [
            { value: -5, label: "−5" },
            { value: 3, label: "3" },
          ],
          -6,
          4,
          "exemple",
        ),
        "les deux solutions, sur la droite graduée",
      ),
    },
    {
      titre: "Vérifier une solution",
      donnees: "L'équation 3x + 2 = 14, et le nombre 4.",
      question: "Le nombre 4 est-il solution ?",
      solution:
        "On remplace x par 4 dans le membre de gauche : 3 × 4 + 2 = 12 + 2 = 14. Le membre de droite vaut 14. Les deux membres sont égaux, donc 4 est bien solution.",
      micros: ["equation_verifier"],
    },
    {
      titre: "Les samoussas",
      donnees:
        "À La Réunion, un élève achète des samoussas à 1 € chacun et paie aussi 2 € pour une boisson. Au total, il paie 9 €.",
      question: "Combien de samoussas a-t-il achetés ?",
      solution:
        "On appelle x le nombre de samoussas. La dépense s'écrit 1 × x + 2 = 9, soit x + 2 = 9. On retire 2 des deux côtés : x = 7. Il a acheté 7 samoussas.",
      micros: ["equation_probleme"],
    },
  ],
  pieges: [
    "Ne donner qu'une seule solution à une équation produit nul : il en faut deux, sauf si les deux facteurs sont identiques.",
    "Se tromper de signe : le facteur (x + 5) s'annule en −5, pas en 5. C'est l'erreur la plus fréquente du chapitre.",
    "Développer un produit nul : (x − 3)(x + 5) = 0 se résout tel quel. Développer détruit la factorisation qui permettait de conclure.",
    "Croire que (x − 3)(x + 1) = 0 entraîne x − 3 = x + 1 : les deux facteurs ne sont pas égaux entre eux, c'est leur PRODUIT qui vaut zéro.",
    "Écrire 3(x + 4) = 3x + 4 : le facteur multiplie tout, donc 3x + 12.",
    "N'appliquer une opération que d'un seul côté : x + 6 = 14 ne donne pas x = 14 + 6, mais x = 14 − 6.",
    "Vérifier un seul membre : c'est l'égalité qu'on teste, donc les deux.",
  ],
  aRetenir: [
    "Résoudre, c'est trouver TOUTES les valeurs de x qui rendent l'égalité vraie.",
    "Toute opération s'applique aux deux membres à la fois.",
    "Un produit est nul si et seulement si l'un de ses facteurs est nul.",
    "Une équation produit nul a deux solutions — une seule si les deux facteurs sont identiques.",
    "Le facteur (x + a) s'annule en −a : le signe s'inverse.",
    "On ne développe jamais un produit déjà égal à zéro.",
    "x² = a a deux solutions opposées si a > 0, une seule si a = 0, aucune si a < 0.",
    "Graphiquement, ce sont les points où la droite y = a coupe la parabole y = x².",
  ],
  entrainement: [
    {
      question: "Résoudre : x + 7 = 12",
      correction: "On retire 7 des deux côtés : x = 12 − 7 = 5.",
      micros: ["equation_resoudre_simple"],
    },
    {
      question: "Résoudre : 4x = 28",
      correction: "On divise les deux membres par 4 : x = 28 ÷ 4 = 7.",
      micros: ["equation_resoudre_simple"],
    },
    {
      question: "Résoudre : 2(x + 3) = 14",
      correction:
        "On développe : 2x + 6 = 14. On retire 6 : 2x = 8. On divise par 2 : x = 4.",
      micros: ["equation_resoudre_developper"],
    },
    {
      question: "Résoudre : (x − 3)(x + 5) = 0",
      correction:
        "Un produit est nul si un facteur l'est. x − 3 = 0 donne x = 3 ; x + 5 = 0 donne x = −5. Les solutions sont 3 et −5.",
      micros: ["equation_produit_nul"],
    },
    {
      question:
        "Un élève résout (x − 4)(x + 2) = 0 et écrit : x = 4 et x = 2. A-t-il raison ?",
      correction:
        "Non, à moitié. La première solution est juste, mais le facteur (x + 2) s'annule en −2, pas en 2. Les solutions sont 4 et −2.",
      micros: ["equation_produit_nul"],
    },
    {
      question: "Résoudre : (x − 6)² = 0",
      correction:
        "L'écriture (x − 6)² signifie (x − 6)(x − 6) : les deux facteurs sont identiques, donc les deux équations aussi. Il y a une seule solution, x = 6.",
      micros: ["equation_produit_nul"],
    },
    {
      question: "Le nombre 5 est-il solution de 2x + 1 = 12 ?",
      correction:
        "On remplace : 2 × 5 + 1 = 11. Le membre de droite vaut 12. Les deux membres diffèrent, donc 5 n'est pas solution.",
      micros: ["equation_verifier"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=3e",
};

export const slidesEquations3e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Équations - 3e",
    section: {
      type: "objectif",
      phrase: "Une équation peut avoir deux réponses",
      sousPhrase:
        "Depuis la quatrième, on cherchait LA solution. L'équation produit nul en a deux — et n'en donner qu'une, c'est n'avoir répondu qu'à moitié.",
      encadre: {
        titre: "La propriété",
        texte:
          "Un produit vaut zéro exactement quand l'un de ses facteurs vaut zéro. Aucun autre cas n'est possible.",
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
          "Poser une équation, c'est donner un nom à ce qu'on ne sait pas encore, puis laisser le calcul le trouver. Combien de samoussas avec dix euros si la boisson en coûte deux ? Combien de mois avant qu'un abonnement devienne rentable ?",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le mot algèbre vient d'un livre écrit à Bagdad vers 820 par Al-Khwârizmî. Son nom, latinisé, a donné le mot algorithme. Il écrivait encore tout en toutes lettres : le x et le signe égal n'arrivent que sept siècles plus tard.",
      },
    },
  },
  {
    titre: "Résoudre un produit nul",
    badge: "La méthode",
    section: {
      type: "etapes",
      etapes: [
        "Vérifier que l'équation est bien un PRODUIT égal à ZÉRO. Si oui, ne rien développer.",
        "Écrire une équation par facteur : x moins 3 égale zéro, puis x plus 5 égale zéro.",
        "Résoudre chacune séparément : on obtient 3, puis moins 5.",
        "Donner les DEUX solutions, et les vérifier en remplaçant.",
      ],
    },
  },
  {
    titre: "Le piège du signe",
    badge: "À ne pas rater",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on écrit",
        contenu:
          "Le produit vaut zéro pour x égale 4 et x égale 2, en lisant les nombres dans les parenthèses.",
      },
      droite: {
        variante: "info",
        titre: "Ce qui est vrai",
        contenu:
          "Le facteur x plus 2 s'annule pour x égale MOINS 2. Le signe s'inverse quand le nombre passe de l'autre côté. Les solutions sont 4 et moins 2.",
      },
    },
  },
];
