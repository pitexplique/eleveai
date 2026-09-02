// ─── Fiche de cours : aires (3e) ──────────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/aires.bank.ts, notionId `aire_surface`, 58 items).
//
// ⭐⭐ CETTE FICHE EST LA SŒUR DE `aire-perimetre`, ÉCRITE LE MÊME JOUR, ET
// ELLES SE RÉPONDENT SUR TROIS POINTS EXACTEMENT :
//   · là-bas, une figure composée NE SE DÉCOUPE PAS — les traits de découpe ne
//     sont pas sur le contour. ICI, on la découpe : c'est même la seule méthode.
//   · là-bas, $2\pi r$ mesure une ligne et $\pi r^2$ était l'erreur à ne pas
//     commettre. ICI, $\pi r^2$ est la bonne formule, et c'est $2\pi r$ qui
//     serait faux.
//   · là-bas, la fiche annonçait qu'agrandir dans un rapport $k$ multiplie une
//     LONGUEUR par $k$, et promettait $k^2$ pour les aires. ICI, la promesse est
//     tenue et démontrée.
// ⚠️ Cette symétrie n'est pas un effet de style : les deux notions sont
// distinctes dans le coach, un élève arrive donc sur l'une sans avoir lu
// l'autre. Chaque fiche doit tenir seule, tout en ne contredisant jamais sa
// jumelle.
//
// ⭐ TROIS MICROS SUR SIX SONT PROPRES À LA 3e — le disque, la figure composée
// et l'agrandissement-réduction. `comprendre`, `triangle` et `defi` existent en
// 4e. ⚠️ Mesuré contre TOUTE la classe de 4e, pas contre la notion homonyme :
// la veille, un relevé qui ne comparait que les notions de même nom avait
// annoncé « 4 micros propres » pour la proportionnalité alors qu'il n'y en avait
// qu'une.
//
// ⭐ LES 58 ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE — la règle du 31/08 :
//   aire_comprendre               → une surface, et l'unité en cm²
//   aire_triangle                 → base × hauteur ÷ 2, et le ÷ 2 oublié
//   aire_disque                   → πr², et le diamètre pris pour un rayon
//   aire_figure_composee          → découper, additionner OU soustraire
//   aire_agrandissement_reduction → ×k sur les longueurs donne ×k² sur l'aire
//   aire_defi                     → doubler le côté quadruple l'aire
//
// ⭐ LE CANVAS `triangle` A UN CHAMP `height` QUI TRACE LA HAUTEUR, avec sa
// marque d'angle droit et, s'il le faut, le prolongement du côté en pointillés.
// Son propre commentaire dit pourquoi il existe : sans lui, « la hauteur est
// perpendiculaire à la base » restait du texte sous un triangle qui n'en
// montrait aucune — alors que c'est LA difficulté de l'aire au collège, où
// l'élève prend le côté oblique.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut porter du LaTeX. Les libellés
 * DANS le dessin restent en écriture simple.
 */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// ⚠️ Aucun emplacement de fiche ne dépasse 225 px, y compris en 1280 — mesuré
// par `scripts/mesurer-largeurs-blocs.mjs`.
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
 * Une figure sur quadrillage.
 * ⭐ Ici `showPerimeter` est à FALSE, à l'inverse de la fiche des périmètres :
 * ce que l'on compte, ce sont les CASES, pas le trait qui en fait le tour.
 */
const surQuadrillage = (
  rows: number,
  cols: number,
  cases: [number, number][],
  bloc: "carte" | "exemple" = "carte"
) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      grid: { rows, cols, filledCells: cases },
      display: { showGrid: true, showFilled: true, showPerimeter: false },
      size: { width: bloc === "exemple" ? 200 : 222, height: 170 },
    }}
  />
);

// ⚠️ Les mêmes constantes que la fiche des périmètres, où elles sont mesurées.
const CADRE = { width: 222, height: 190 };
const CX = 111;
const CY = 94;
const R = 60;

export const ficheAires3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "aire-surface",
  titre: "Aires : triangle, disque et figures composées",
  accroche:
    "Combien de carreaux faut-il pour couvrir cette terrasse ? La question porte sur une SURFACE, et la réponse se compte en mètres carrés — pas en mètres. C'est toute la différence avec le périmètre, qui mesure le tour. La troisième ajoute deux outils : l'aire du disque, et une règle qui surprend presque tout le monde — agrandir une figure deux fois n'en double pas l'aire, il la quadruple.",
  identite: [
    { label: "Ce que c'est", valeur: "La mesure de la SURFACE couverte" },
    { label: "Le disque", valeur: "$\\pi r^2$ — et $r$ est le rayon, pas le diamètre" },
    { label: "Le piège", valeur: "Agrandir de $k$ multiplie l'aire par $k^2$, pas par $k$" },
  ],
  definition: {
    texte:
      "L'aire d'une figure est la mesure de la surface qu'elle occupe, c'est-à-dire le nombre d'unités de surface qu'il faut pour la recouvrir entièrement. Elle s'exprime en unités CARRÉES : des centimètres carrés si les longueurs sont en centimètres. C'est ce qui la distingue du périmètre, qui mesure une longueur et s'exprime en centimètres. Une même figure a donc les deux, et elles ne se déduisent pas l'une de l'autre.",
  },
  figure: {
    schema: surQuadrillage(5, 6, [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
    ]),
    legende:
      "Douze cases coloriées : l'aire vaut 12 unités. Ce sont les cases qu'on compte, et non le trait qui en fait le tour — celui-là donnerait le périmètre.",
  },
  proprietes: [
    {
      titre: "Une surface, et donc une unité carrée",
      texte:
        "L'aire se recouvre, le périmètre se parcourt. La conséquence pratique est l'UNITÉ : une aire s'exprime en cm², m² ou km², jamais en cm. Un résultat annoncé en centimètres pour une aire signale à coup sûr qu'on a calculé le contour. Pour un rectangle, l'aire est le produit des deux dimensions : $L \\times l$ — et c'est justement ce produit qu'on écrit à tort quand on cherche un périmètre.",
      schema: legende(
        tableau({
          headers: ["on mesure", "on calcule", "unité"],
          rows: [
            { values: ["l'aire", "L × l", "cm²"] },
            { values: ["le périmètre", "2 × (L + l)", "cm"] },
            { values: ["8 sur 5", "40 ou 26", "selon"] },
          ],
          highlight: { row: 0 },
          caption: "l'unité tranche à elle seule",
        }),
        "Pour un rectangle de 8 sur 5 : aire 40 cm², périmètre 26 cm."
      ),
      micros: ["aire_comprendre"],
    },
    {
      titre: "Le triangle : la hauteur est perpendiculaire à la base",
      texte:
        "L'aire d'un triangle vaut $\\dfrac{\\text{base} \\times \\text{hauteur}}{2}$. Deux précautions font toute la difficulté. D'abord la hauteur doit être ASSOCIÉE à la base choisie : c'est le segment perpendiculaire à cette base, issu du sommet opposé — jamais un côté oblique. Ensuite il ne faut pas oublier de diviser par 2 : le triangle est la moitié d'un rectangle de mêmes base et hauteur.",
      schema: legende(
        <CanvasRenderer
          figure={{
            kind: "triangle",
            size: { width: 222, height: 180 },
            points: {
              A: { x: 30, y: 145 },
              B: { x: 195, y: 145 },
              C: { x: 130, y: 40 },
            },
            labels: { A: "A", B: "B", C: "C" },
            display: { showPoints: true, showLabels: true, showSides: false },
            height: { fromVertex: "C", label: "hauteur", baseLabel: "base" },
          }}
        />,
        "La hauteur tombe à angle droit sur la base : c'est elle qui entre dans la formule, pas le côté."
      ),
      micros: ["aire_triangle"],
    },
    {
      titre: "Le disque : $\\pi r^2$, et $r$ est bien le rayon",
      texte:
        "L'aire d'un disque vaut $\\pi r^2$. ⛔ L'erreur la plus fréquente n'est pas d'oublier la formule mais de s'être trompé de donnée : quand l'énoncé fournit le DIAMÈTRE, il faut d'abord le diviser par 2. Pour un diamètre de 10 cm, le rayon vaut 5 et l'aire $\\pi \\times 25 \\approx 78{,}5$ cm² — employer 10 directement donnerait $314$ cm², soit quatre fois trop, puisque le rayon est élevé au carré.",
      schema: legende(
        <CanvasRenderer
          figure={{
            kind: "cercle",
            size: CADRE,
            circle: { cx: CX, cy: CY, r: R, showCircle: true, showDisk: true },
            points: [
              { id: "O", x: CX, y: CY, label: "O", highlight: true },
              { id: "A", x: CX + R, y: CY, label: "A" },
            ],
            segments: [{ id: "r", kind: "rayon", from: "O", to: "A", label: "r" }],
            display: { showLabels: true, showPoints: true, showCenter: true, showDisk: true },
          }}
        />,
        "C'est la surface coloriée qu'on mesure : $\\pi r^2$, en centimètres carrés."
      ),
      micros: ["aire_disque"],
    },
    {
      titre: "Cercle ou disque : la même figure, deux mesures",
      texte:
        "Le cercle est une LIGNE — le bord — et sa longueur vaut $2\\pi r$, en centimètres. Le disque est la SURFACE pleine qu'elle entoure, et son aire vaut $\\pi r^2$, en centimètres carrés. Le repère le plus sûr est le carré dans la formule : $r^2$ ne peut donner qu'une surface, car deux longueurs y sont multipliées entre elles.",
      schema: legende(
        tableau({
          headers: ["objet", "ce qu'on mesure", "formule"],
          rows: [
            { values: ["le cercle", "sa longueur", "2πr"] },
            { values: ["le disque", "son aire", "πr²"] },
          ],
          highlight: { row: 1 },
          caption: "le carré annonce la surface",
        }),
        "Un résultat en cm² ne peut pas être un périmètre, et réciproquement."
      ),
      micros: ["aire_disque", "aire_comprendre"],
    },
    {
      titre: "Une figure composée SE DÉCOUPE",
      texte:
        "Contrairement au périmètre, l'aire se calcule très bien en morceaux : on découpe la figure en formes usuelles, on calcule chaque aire, et on additionne. Le trait de découpe ne pose ici aucun problème, puisqu'il ne fait pas partie de la surface — il la sépare seulement. C'est la méthode générale, et elle ne rate jamais.",
      schema: legende(
        surQuadrillage(4, 6, [
          [0, 0],
          [0, 1],
          [1, 0],
          [1, 1],
          [2, 0],
          [2, 1],
          [2, 2],
          [2, 3],
          [2, 4],
        ]),
        "Un carré de 4 cases et un rectangle de 5 : l'aire totale vaut 9 unités."
      ),
      micros: ["aire_figure_composee"],
    },
    {
      titre: "Ou se soustrait, quand un morceau manque",
      texte:
        "Quand une figure est un grand rectangle dont on a retiré un morceau — une découpe, un trou —, on calcule l'aire du tout, puis on retranche celle du morceau enlevé. Dans un rectangle de $12 \\times 8$ où l'on découpe un carré de côté 3, il reste $96 - 9 = 87$ cm². Additionner ou soustraire : c'est la même méthode, elle suit simplement le sens du découpage.",
      schema: legende(
        tableau({
          headers: ["la figure", "le calcul", "aire"],
          rows: [
            { values: ["le rectangle", "12 × 8", "96"] },
            { values: ["le carré ôté", "3 × 3", "9"] },
            { values: ["ce qui reste", "96 − 9", "87"] },
          ],
          highlight: { row: 2 },
          caption: "en cm²",
        }),
        "On mesure toujours des morceaux entiers, jamais la forme irrégulière directement."
      ),
      micros: ["aire_figure_composee"],
    },
    {
      titre: "Agrandir de $k$ multiplie l'aire par $k^2$",
      texte:
        "C'est la règle la plus contre-intuitive du chapitre. Si l'on multiplie toutes les longueurs d'une figure par $k$, son aire est multipliée non par $k$, mais par $k^2$. La raison tient en une ligne : une aire est un produit de DEUX longueurs, et chacune est multipliée par $k$. Doubler les côtés d'un carré quadruple donc son aire, et les tripler la multiplie par 9.",
      schema: legende(
        tableau({
          headers: ["on multiplie les longueurs par", "l'aire par"],
          rows: [
            { values: ["2", "4"] },
            { values: ["3", "9"] },
            { values: ["0,5", "0,25"] },
            { values: ["k", "k²"] },
          ],
          highlight: { row: 3 },
          caption: "deux longueurs, donc un carré",
        }),
        "Réduire de moitié ne divise pas l'aire par 2, mais par 4."
      ),
      micros: ["aire_agrandissement_reduction"],
    },
    {
      titre: "Trois dimensions, trois exposants",
      texte:
        "La règle se généralise, et c'est elle qu'il faut retenir plutôt que trois cas séparés. Agrandir dans un rapport $k$ multiplie une LONGUEUR par $k$, une AIRE par $k^2$, et un VOLUME par $k^3$. L'exposant est simplement le nombre de longueurs multipliées entre elles : une pour un périmètre, deux pour une aire, trois pour un volume.",
      schema: legende(
        tableau({
          headers: ["la grandeur", "combien de longueurs", "×"],
          rows: [
            { values: ["un périmètre", "une", "k"] },
            { values: ["une aire", "deux", "k²"] },
            { values: ["un volume", "trois", "k³"] },
          ],
          highlight: { row: 1 },
          caption: "l'exposant compte les dimensions",
        }),
        "Une seule idée à retenir, et les trois cas s'en déduisent."
      ),
      micros: ["aire_agrandissement_reduction", "aire_defi"],
    },
  ],
  reel: {
    texte:
      "L'aire est ce qu'on achète au mètre carré : le carrelage d'une pièce, la peinture d'un mur, la tôle d'une toiture, le gazon d'un terrain. Et la règle du $k^2$ a des conséquences très concrètes qu'on sous-estime toujours : agrandir une terrasse de 3 m sur 4 m en une terrasse de 6 m sur 8 m ne double pas la facture de carrelage, elle la QUADRUPLE. C'est aussi ce qui explique qu'un logement deux fois plus long et deux fois plus large ne coûte pas deux fois plus cher à chauffer ou à couvrir. À La Réunion, la même règle décide du prix d'une bâche de protection ou d'une couverture de bassin.",
  },
  historique: {
    texte:
      "Calculer l'aire d'un disque était un problème redoutable avant le calcul intégral, car un disque n'a aucun côté droit. Archimède le résout vers 250 avant notre ère par une idée d'une élégance rare : il démontre que l'aire du disque est égale à celle d'un TRIANGLE dont la base serait la longueur du cercle et la hauteur le rayon. Ce triangle a pour aire $\\dfrac{2\\pi r \\times r}{2}$, c'est-à-dire $\\pi r^2$ — la formule que nous employons encore. Le tour de force est d'avoir ramené une figure courbe à une figure droite, en découpant mentalement le disque en une infinité de secteurs redressés côte à côte.",
  },
  formule: {
    contexte: "Les aires des figures usuelles",
    expression:
      "\\mathcal{A}_{\\text{rect.}} = L \\times l \\qquad \\mathcal{A}_{\\text{triangle}} = \\dfrac{b \\times h}{2} \\qquad \\mathcal{A}_{\\text{disque}} = \\pi r^2",
    legende:
      "⚠️ Chacune multiplie exactement DEUX longueurs, ce qui explique à la fois l'unité carrée et la règle du $k^2$. Dans la formule du disque, le carré porte sur le rayon seul : $\\pi r^2$ ne se lit pas $(\\pi r)^2$.",
    schema: legende(
      tableau(
        {
          headers: ["figure", "aire", "attention à"],
          rows: [
            { values: ["rectangle", "L × l", "—"] },
            { values: ["triangle", "b × h ÷ 2", "le ÷ 2"] },
            { values: ["disque", "πr²", "le rayon"] },
          ],
          caption: "deux longueurs à chaque fois",
        },
        "formule"
      ),
      "Les deux erreurs les plus fréquentes sont le $\\div 2$ oublié et le diamètre pris pour un rayon."
    ),
  },
  methode: [
    {
      titre: "Se demander d'abord : surface ou contour ?",
      texte:
        "Carreler, peindre, semer, couvrir : c'est une aire. Clôturer, border, entourer : c'est un périmètre. L'unité attendue confirme, et il suffit de la regarder avant de commencer.",
      micros: ["aire_comprendre"],
    },
    {
      titre: "Pour un triangle : repérer la hauteur AVANT de calculer",
      texte:
        "On choisit une base, puis on cherche le segment perpendiculaire issu du sommet opposé. ⛔ Un côté oblique n'est pas une hauteur, même s'il en a l'air. Et le $\\div 2$ s'écrit dès la première ligne, pour ne pas l'oublier en route.",
      micros: ["aire_triangle"],
    },
    {
      titre: "Pour un disque : d'abord le rayon",
      texte:
        "Si l'énoncé donne le diamètre, on écrit $r = d \\div 2$ AVANT toute chose, sur une ligne séparée. C'est trois secondes, et cela évite l'erreur d'un facteur 4 — car le rayon est ensuite élevé au carré.",
      micros: ["aire_disque"],
    },
    {
      titre: "Pour une figure composée : découper en formes connues",
      texte:
        "On repère des rectangles, des triangles, des demi-disques. On calcule chaque aire séparément, puis on additionne — ou on soustrait si un morceau a été retiré. Un schéma annoté du découpage vaut mieux qu'un long raisonnement.",
      micros: ["aire_figure_composee"],
    },
    {
      titre: "Devant un agrandissement : penser au carré",
      texte:
        "Multiplier les longueurs par $k$ multiplie l'aire par $k^2$. Le réflexe consiste à écrire le carré tout de suite : un rapport de 3 donne 9, un rapport de $0{,}5$ donne $0{,}25$. Répondre avec $k$ seul est l'erreur attendue par l'énoncé.",
      micros: ["aire_agrandissement_reduction"],
    },
  ],
  usages: [
    {
      titre: "La figure est un rectangle ou un carré",
      detail: "Je multiplie les deux dimensions. Le résultat est en unités carrées.",
      micros: ["aire_comprendre"],
    },
    {
      titre: "La figure est un triangle",
      detail:
        "Je repère la hauteur associée à la base choisie, je multiplie, puis je divise par 2.",
      micros: ["aire_triangle"],
    },
    {
      titre: "La figure contient un disque",
      detail:
        "Je m'assure d'avoir le rayon — en divisant le diamètre par 2 si besoin — puis j'applique $\\pi r^2$.",
      micros: ["aire_disque"],
    },
    {
      titre: "La figure est composée",
      detail:
        "Je la découpe en formes usuelles, et j'additionne les aires. Si un morceau a été retiré, je soustrais.",
      micros: ["aire_figure_composee"],
    },
    {
      titre: "On agrandit ou on réduit la figure",
      detail:
        "Je multiplie l'aire par $k^2$, jamais par $k$. Un volume, lui, serait multiplié par $k^3$.",
      micros: ["aire_agrandissement_reduction"],
    },
  ],
  exemples: [
    {
      titre: "Le triangle et son demi",
      donnees: "Un triangle a une base de 8 cm et une hauteur associée de 5 cm.",
      question: "Quelle est son aire ?",
      solution:
        "On applique la formule en écrivant le $\\div 2$ dès le départ : $\\mathcal{A} = \\dfrac{8 \\times 5}{2} = \\dfrac{40}{2} = 20$ cm². ⛔ Répondre 40 est l'erreur que la banque interroge deux fois : $8 \\times 5$ donne l'aire du RECTANGLE de mêmes base et hauteur, et le triangle n'en est que la moitié. Le contrôle visuel est immédiat — un triangle inscrit dans un rectangle en occupe manifestement la moitié.",
      micros: ["aire_triangle"],
    },
    {
      titre: "Le disque, à partir du diamètre",
      donnees: "Un disque a un diamètre de 10 cm. On prendra $\\pi \\approx 3{,}14$.",
      question: "Quelle est son aire ?",
      solution:
        "On écrit d'abord le rayon, sur sa propre ligne : $r = 10 \\div 2 = 5$ cm. Puis $\\mathcal{A} = \\pi r^2 = 3{,}14 \\times 25 = 78{,}5$ cm². ⛔ Employer 10 directement donnerait $3{,}14 \\times 100 = 314$ cm², soit QUATRE fois trop — et non deux, puisque l'erreur porte sur un nombre qu'on élève ensuite au carré. C'est la raison pour laquelle cette étape mérite une ligne à elle seule.",
      schema: legende(
        tableau(
          {
            headers: ["étape", "calcul", "résultat"],
            rows: [
              { values: ["le rayon", "10 ÷ 2", "5 cm"] },
              { values: ["l'aire", "3,14 × 25", "78,5 cm²"] },
              { values: ["si on garde 10", "3,14 × 100", "314 : faux"] },
            ],
            highlight: { row: 2 },
            caption: "l'erreur est d'un facteur 4",
          },
          "exemple"
        ),
        "Le rayon d'abord, la formule ensuite."
      ),
      micros: ["aire_disque"],
    },
    {
      titre: "La plaque percée",
      donnees:
        "Dans une plaque rectangulaire de 12 cm sur 8 cm, on découpe un carré de côté 3 cm.",
      question: "Quelle est l'aire de la plaque restante ?",
      solution:
        "On calcule l'aire du rectangle entier : $12 \\times 8 = 96$ cm². Puis celle du carré retiré : $3 \\times 3 = 9$ cm². Il reste $96 - 9 = 87$ cm². ⭐ On n'essaie jamais de mesurer directement une forme irrégulière : on la ramène toujours à des morceaux usuels, qu'on additionne ou qu'on soustrait selon le sens du découpage.",
      micros: ["aire_figure_composee"],
    },
    {
      titre: "La terrasse agrandie",
      donnees: "Une terrasse mesure 3 m sur 4 m. On décide de doubler ses deux dimensions.",
      question: "L'aire est-elle doublée ?",
      solution:
        "Non, elle est QUADRUPLÉE. L'aire de départ vaut $3 \\times 4 = 12$ m². Après agrandissement, la terrasse mesure 6 m sur 8 m, soit $48$ m². Le rapport vaut bien $48 \\div 12 = 4$, c'est-à-dire $k^2$ avec $k = 2$. La raison se dit en une phrase : une aire est le produit de DEUX longueurs, et chacune a été doublée. Conséquence très concrète — la facture de carrelage est multipliée par 4, pas par 2.",
      schema: legende(
        tableau(
          {
            headers: ["terrasse", "dimensions", "aire"],
            rows: [
              { values: ["avant", "3 × 4", "12 m²"] },
              { values: ["après", "6 × 8", "48 m²"] },
              { values: ["rapport", "×2 sur les côtés", "×4"] },
            ],
            highlight: { row: 2 },
            caption: "k = 2, donc k² = 4",
          },
          "exemple"
        ),
        "Deux longueurs doublées : le produit est multiplié par quatre."
      ),
      micros: ["aire_agrandissement_reduction", "aire_defi"],
    },
  ],
  pieges: [
    "Oublier de diviser par 2 dans l'aire d'un triangle : $8 \\times 5 = 40$ est l'aire du rectangle, pas du triangle, qui vaut 20.",
    "Prendre un côté oblique pour la hauteur. La hauteur est perpendiculaire à la base, et issue du sommet opposé.",
    "Utiliser le diamètre à la place du rayon dans $\\pi r^2$ : l'erreur est d'un facteur 4, puisque le rayon est élevé au carré.",
    "Employer $2\\pi r$ pour une aire. Cette formule donne la longueur du cercle, en cm ; l'aire du disque vaut $\\pi r^2$, en cm².",
    "Exprimer une aire en cm. Une surface se mesure en unités carrées, toujours.",
    "Croire qu'agrandir de $k$ multiplie l'aire par $k$. C'est $k^2$ : doubler les côtés quadruple l'aire.",
    "Vouloir mesurer directement une figure irrégulière. On la découpe en formes usuelles, et l'on additionne ou soustrait.",
  ],
  aRetenir: [
    "L'aire mesure une surface : elle s'exprime en cm², jamais en cm.",
    "Rectangle : $L \\times l$. Triangle : $\\dfrac{b \\times h}{2}$, hauteur perpendiculaire à la base.",
    "Disque : $\\pi r^2$, et $r$ est le RAYON — pas le diamètre.",
    "Le cercle est une ligne ($2\\pi r$), le disque une surface ($\\pi r^2$).",
    "Une figure composée se découpe : on additionne, ou l'on soustrait un morceau ôté.",
    "Agrandir dans un rapport $k$ multiplie l'aire par $k^2$.",
    "Une longueur suit $k$, une aire $k^2$, un volume $k^3$ : l'exposant compte les dimensions.",
  ],
  entrainement: [
    {
      question: "Quelle unité convient pour exprimer une aire, si les longueurs sont en mètres ?",
      correction:
        "Le mètre carré (m²). Une aire est le produit de deux longueurs, donc son unité est une unité carrée.",
      micros: ["aire_comprendre"],
    },
    {
      question: "Quelle est l'aire d'un rectangle de 9 cm sur 4 cm ?",
      correction: "$9 \\times 4 = 36$ cm². Son périmètre, lui, vaudrait $2 \\times (9+4) = 26$ cm.",
      micros: ["aire_comprendre"],
    },
    {
      question: "Un triangle a une base de 12 cm et une hauteur associée de 7 cm. Quelle est son aire ?",
      correction: "$\\dfrac{12 \\times 7}{2} = \\dfrac{84}{2} = 42$ cm².",
      micros: ["aire_triangle"],
    },
    {
      question:
        "Pour calculer l'aire d'un triangle, peut-on utiliser n'importe quel côté avec n'importe quelle hauteur ?",
      correction:
        "Non. La hauteur doit être celle ASSOCIÉE à la base choisie, c'est-à-dire le segment perpendiculaire à cette base issu du sommet opposé. Les trois couples base-hauteur donnent la même aire, mais on ne les mélange pas.",
      micros: ["aire_triangle"],
    },
    {
      question: "Quelle est la formule de l'aire d'un disque de rayon $r$ ?",
      correction:
        "$\\pi r^2$. Le carré porte sur le rayon seul, et le résultat s'exprime en unités carrées.",
      micros: ["aire_disque"],
    },
    {
      question:
        "Un disque a un diamètre de 10 cm. Un élève utilise directement $r = 10$ dans $\\pi r^2$. A-t-il raison ?",
      correction:
        "Non : le rayon vaut $10 \\div 2 = 5$. Son aire est $\\pi \\times 25 \\approx 78{,}5$ cm², et non $\\pi \\times 100 \\approx 314$ cm². L'erreur est d'un facteur 4.",
      micros: ["aire_disque"],
    },
    {
      question:
        "Une figure en L se décompose en deux rectangles d'aires 24 cm² et 15 cm². Quelle est son aire totale ?",
      correction:
        "$24 + 15 = 39$ cm². Contrairement au périmètre, l'aire s'additionne morceau par morceau : le trait de découpe ne fait pas partie de la surface.",
      micros: ["aire_figure_composee"],
    },
    {
      question:
        "Dans un rectangle de 10 cm sur 6 cm, on découpe un carré de côté 4 cm. Quelle est l'aire restante ?",
      correction: "$10 \\times 6 = 60$ cm², moins $4 \\times 4 = 16$ cm² : il reste $44$ cm².",
      micros: ["aire_figure_composee"],
    },
    {
      question: "On double les côtés d'un carré. Son aire est multipliée par combien ?",
      correction:
        "Par 4. Une aire est le produit de deux longueurs, et chacune a été doublée : $2 \\times 2 = 4$. Un carré de côté 3 a une aire de 9 ; de côté 6, une aire de 36.",
      micros: ["aire_defi", "aire_agrandissement_reduction"],
    },
    {
      question:
        "Une figure a une aire de 20 cm². On agrandit ses longueurs dans un rapport 3. Quelle est la nouvelle aire ?",
      correction:
        "L'aire est multipliée par $k^2 = 9$, donc elle vaut $20 \\times 9 = 180$ cm². Répondre 60 reviendrait à multiplier par $k$, ce qui vaut pour une longueur, pas pour une aire.",
      micros: ["aire_agrandissement_reduction"],
    },
  ],
  coachHref: "/coach?matiere=maths&classe=3e&notion=aire_surface",
};

// ─── Mode classe ───────────────────────────────────────────────────────────────
// ⛔ AUCUN LaTeX DANS CES DIAPOSITIVES. `ModeClasse` ne rend pas KaTeX : une
// formule écrite entre dollars s'afficherait EN CLAIR sur le tableau de la
// classe, code compris. Tout s'écrit donc en toutes lettres.

export const slidesAires3e: ClasseSlide[] = [
  {
    titre: "Combien de carreaux ?",
    badge: "Ce qu'on va mesurer",
    section: {
      type: "objectif",
      phrase: "La question porte sur une surface, pas sur un tour",
      sousPhrase:
        "Carreler une terrasse se compte en mètres carrés. La clôturer se compte en mètres. Même terrasse, deux grandeurs, et elles ne se déduisent pas l'une de l'autre.",
      encadre: {
        titre: "Ce que la troisième ajoute",
        texte:
          "L'aire du disque, et une règle qui surprend tout le monde : agrandir une figure deux fois n'en double pas l'aire, il la quadruple.",
      },
    },
  },
  {
    titre: "La hauteur d'un triangle",
    badge: "Le piège numéro un",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on prend par erreur",
        contenu:
          "Un côté oblique, parce qu'il part du bon sommet et qu'il a l'air de descendre vers la base.",
      },
      droite: {
        variante: "ok",
        titre: "Ce qu'est vraiment la hauteur",
        contenu:
          "Le segment PERPENDICULAIRE à la base, issu du sommet opposé. Il porte une marque d'angle droit, et lui seul entre dans la formule.",
      },
    },
  },
  {
    titre: "Et le divisé par deux",
    badge: "L'autre oubli classique",
    section: {
      type: "etapes",
      etapes: [
        "J'écris la formule en entier AVANT de calculer : base fois hauteur, divisé par deux.",
        "Je remplace : huit fois cinq, divisé par deux.",
        "Je calcule le produit : quarante.",
        "Je divise par deux : vingt centimètres carrés. Quarante, c'était l'aire du rectangle — le triangle n'en est que la moitié.",
      ],
    },
  },
  {
    titre: "Cercle ou disque",
    badge: "Deux mots, deux formules",
    teinte: "essentiel",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Le CERCLE",
        contenu:
          "C'est la ligne, le bord. Sa longueur vaut deux pi r, et se compte en centimètres.",
      },
      droite: {
        variante: "info",
        titre: "Le DISQUE",
        contenu:
          "C'est la surface pleine à l'intérieur. Son aire vaut pi r au carré, et se compte en centimètres carrés. Le carré dans la formule annonce la surface.",
      },
    },
  },
  {
    titre: "Le rayon d'abord",
    badge: "Attention",
    teinte: "piege",
    section: {
      type: "objectif",
      phrase: "Un diamètre de dix, ce n'est pas un rayon de dix",
      sousPhrase:
        "Si l'énoncé donne le diamètre, on écrit le rayon sur une ligne à part avant toute chose : dix divisé par deux font cinq.",
      encadre: {
        titre: "Pourquoi cette ligne compte double",
        texte:
          "Parce que le rayon est ensuite élevé au carré. Se tromper d'un facteur deux au départ donne un résultat quatre fois trop grand : trois cent quatorze au lieu de soixante-dix-huit virgule cinq.",
      },
    },
  },
  {
    titre: "Une figure composée",
    badge: "Ici, on découpe",
    teinte: "essentiel",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Pour l'AIRE",
        contenu:
          "On découpe en rectangles et en triangles, on calcule chaque morceau, on additionne. Le trait de découpe ne gêne pas : il ne fait pas partie de la surface.",
      },
      droite: {
        variante: "piege",
        titre: "Pour le PÉRIMÈTRE",
        contenu:
          "Surtout pas. Le trait de découpe n'est pas sur le contour : l'additionner fausserait tout. Là, on suit le tour sans le quitter.",
      },
    },
  },
  {
    titre: "La règle qui surprend",
    badge: "Agrandissement",
    teinte: "essentiel",
    section: {
      type: "objectif",
      phrase: "Doubler les côtés quadruple l'aire",
      sousPhrase:
        "Une terrasse de trois mètres sur quatre couvre douze mètres carrés. En six sur huit, elle en couvre quarante-huit — quatre fois plus, pas deux.",
      encadre: {
        titre: "La raison, en une phrase",
        texte:
          "Une aire est le produit de DEUX longueurs, et chacune a été doublée. D'où le carré : multiplier les longueurs par k multiplie l'aire par k au carré.",
      },
    },
  },
  {
    titre: "Une longueur, une aire, un volume",
    badge: "L'idée à retenir",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Une longueur",
          texte:
            "Elle est faite d'une seule dimension. Agrandir de k la multiplie par k, tout simplement.",
        },
        {
          titre: "Une aire",
          texte:
            "Deux longueurs multipliées entre elles. Elle est donc multipliée par k au carré.",
        },
        {
          titre: "Un volume",
          texte:
            "Trois longueurs. Il est multiplié par k au cube. L'exposant compte tout simplement les dimensions.",
        },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    teinte: "exemple",
    section: {
      type: "exemple",
      enonce: "Un disque a un diamètre de dix centimètres. On prendra pi environ égal à trois virgule quatorze.",
      question: "Quelle est son aire ?",
      correction:
        "On commence par une ligne qui ne coûte rien et qui sauve tout : le rayon vaut dix divisé par deux, soit cinq centimètres. Ensuite seulement on applique la formule, pi fois r au carré : trois virgule quatorze fois vingt-cinq, ce qui donne soixante-dix-huit virgule cinq centimètres carrés. Et voyons ce qui se passe si l'on garde dix par étourderie : trois virgule quatorze fois cent, soit trois cent quatorze. L'erreur n'est pas d'un facteur deux mais de QUATRE, parce que le nombre faux est ensuite élevé au carré. C'est pour cela que le rayon mérite sa propre ligne.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    teinte: "exercice",
    section: {
      type: "exercice",
      enonce: "Une figure a une aire de vingt centimètres carrés. On agrandit toutes ses longueurs dans un rapport trois.",
      question: "Quelle est la nouvelle aire ?",
      indice: "Une aire est le produit de deux longueurs. Que devient un produit dont les deux facteurs sont multipliés par trois ?",
      correction:
        "Chacune des deux longueurs est multipliée par trois, donc leur produit est multiplié par trois fois trois, c'est-à-dire neuf. La nouvelle aire vaut vingt fois neuf, soit cent quatre-vingts centimètres carrés. Répondre soixante serait multiplier par trois seulement, ce qui vaut pour une longueur mais jamais pour une aire. Et si la figure avait été un solide, son volume aurait été multiplié par trois au cube, soit vingt-sept.",
    },
  },
];
