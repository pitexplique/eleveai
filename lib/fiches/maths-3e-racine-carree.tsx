// ─── Fiche de cours : la racine carrée (3e) ────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/racine_carree.bank.ts, notionId entier_racine_carree).
//
// ⭐⭐ POURQUOI CETTE NOTION AVANT LES VINGT AUTRES DE 3e. Le site compte 105
// fiches de maths — 19 en 6e, 20 en 5e, 33 en 4e, 28 au CM2 — et la racine
// carrée n'apparaît dans AUCUNE. Ce n'est pas une notion peu couverte, c'est
// une notion absente : elle naît en 3e et n'a donc pas de fiche d'une classe
// antérieure vers laquelle se rabattre. Avec l'arithmétique (le PGCD), c'est
// l'un des deux seuls trous NEUFS de la classe du brevet — les vingt autres
// notions de 3e ont au moins une fiche cousine en 4e.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE, et tous les
// nombres de la fiche sortent de la banque :
//   entier_racine_comprendre   → √9 = 3, (√7)² = 7, √16 n'est PAS 16 ÷ 2
//   entier_racine_carre_parfait→ 36 oui, 20 non ; les carrés de 1 à 15
//   entier_racine_calculer     → √64, √81, √144, et les carrés de 11 à 15
//   entier_racine_encadrer     → √20 entre 4 et 5, 7 < √60 < 8, √50
//   entier_racine_defi         → √(9+16) ≠ √9 + √16, l'hypoténuse 6-8-10,
//                                le carré d'aire 49
//
// ⛔⛔ LA BANQUE N'EMPLOIE AUCUN CANVAS — vérifié, pas supposé : zéro `canvas:`
// sur ses 47 items. C'est le contraire du cas de Thalès ou du triangle, où le
// dessin de la fiche reprend celui de l'exercice. Ici la fiche doit INVENTER
// ses figures, et le choix compte double puisque rien ne le contraint.
//
// ⭐ CE QUE CHAQUE DESSIN MONTRE, ET POURQUOI CELUI-LÀ :
//   · `figure_libre` — LE dessin de la notion. Un carré de 25 cases, chacune
//     marquée « 1 » : l'aire SE COMPTE, et le côté SE LIT. √25 = 5 cesse
//     d'être une touche de calculatrice pour devenir une longueur. Aucun autre
//     canvas ne fait apparaître à la fois l'aire et le côté du même objet.
//   · `number_line` — l'encadrement. Une racine qui n'est pas entière a quand
//     même une PLACE, entre deux entiers : c'est exactement ce que la droite
//     graduée sait montrer et qu'un tableau ne dit pas.
//   · `tableau_donnees` — les carrés parfaits (la liste à connaître) et les
//     deux contre-exemples, où seule une confrontation ligne à ligne rend
//     l'erreur visible.
//   · `triangle` — le lien avec Pythagore, qui est la raison d'être de la
//     racine carrée au brevet.
//
// ⚠️ LES LARGEURS SONT MESURÉES, PAS CHOISIES : 222 px pour une carte de
// propriété, 216 px pour « La formule », 200 px pour un exemple, sur un
// téléphone de 375 px. Le plancher de lisibilité est de 11 px.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

const BLEU = "#2563eb";
const ROUGE = "#dc2626";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut donc porter du LaTeX. Les
 * libellés À L'INTÉRIEUR du dessin restent en écriture simple — ils sont
 * tracés en `<text>` SVG, où le LaTeX s'afficherait en clair.
 */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

/**
 * LE CARRÉ D'AIRE n, ET SON CÔTÉ.
 *
 * ⭐ `showCellLabels` écrit « 1 » dans CHAQUE case — c'est le composant qui le
 * fait, en dur. Ici ce n'est pas un défaut mais l'effet cherché : chaque case
 * vaut une unité d'aire, l'élève peut les compter, et il obtient le nombre
 * sous la racine. Le côté, lui, se compte sur un bord.
 *
 * ⛔⛔ LA TAILLE DE CASE EST CALCULÉE, ET ELLE DOIT L'ÊTRE. Laisser le défaut
 * (`cellSize` 32, `padding` 16) fait déduire au canvas une largeur de
 * `cote × 32 + 32` : 192 px pour un carré de 5, mais 256 px pour un carré de 7.
 * Le cadre étant alors PLUS LARGE que le bloc, le SVG est réduit — et sa police
 * de 13, qui ne suit pas, tombe avec lui. Mesuré : 10,5 px pour le carré de 7
 * dans un bloc d'exemple, sous le plancher de 11.
 * 👉 On impose donc la largeur du bloc et on en DÉDUIT la case. Le cadre vaut
 * exactement le bloc, l'échelle vaut 1, et la police reste à ses 13 px quel que
 * soit le côté du carré.
 */
const carreDAire = (
  cote: number,
  couleur = "#dbeafe",
  bloc: "carte" | "exemple" | "formule" = "carte"
) => {
  const cases: [number, number][] = [];
  for (let l = 0; l < cote; l++) {
    for (let c = 0; c < cote; c++) cases.push([l, c]);
  }
  const largeur = bloc === "exemple" ? 200 : bloc === "formule" ? 216 : 222;
  const padding = 16;
  const cellSize = Math.floor((largeur - 2 * padding) / cote);
  return (
    <CanvasRenderer
      figure={
        {
          kind: "figure_libre",
          size: {
            cellSize,
            padding,
            width: cote * cellSize + 2 * padding,
            height: cote * cellSize + 2 * padding,
          },
          grid: { rows: cote, cols: cote, filledCells: cases },
          display: { showGrid: true, showFilled: true, showCellLabels: true },
          colors: { filled: couleur },
        } as never
      }
    />
  );
};

/**
 * La droite graduée d'un encadrement.
 * ⚠️ `size.width` VAUT LA LARGEUR DU BLOC, et ce n'est pas cosmétique : le
 * `viewBox` de ce canvas vaut sa `size`, et sa police de 14 est fixe. Laisser
 * le défaut de 320 dans une carte de 222 la ramènerait à 9,7 px — sous le
 * plancher.
 * ⚠️ Et AUCUN POINT SUR `min` NI SUR `max` : les étiquettes sont centrées sur
 * leur valeur, donc la moitié d'un texte posé aux extrémités sort du cadre.
 */
const droite = (
  data: Record<string, unknown>,
  bloc: "carte" | "exemple" = "carte"
) => (
  <CanvasRenderer
    figure={
      {
        kind: "number_line",
        size: { width: bloc === "exemple" ? 200 : 222, height: 100 },
        display: {
          showTicks: true,
          showValues: true,
          showPoints: true,
          showPointLabels: true,
        },
        ...data,
      } as never
    }
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

/**
 * Le triangle rectangle de Pythagore.
 * ⚠️ `TriangleCanvasSideLabel` ne connaît que `AB`, `BC` et `CA` — jamais
 * `AC`. Une clé `AC` est acceptée par TypeScript via l'objet libre, puis
 * IGNORÉE au rendu : l'étiquette ne s'affiche pas, et rien ne le signale.
 * ⚠️ Le conteneur de ce canvas plafonne à 240 px et son `viewBox` vaut la
 * `size` : 222 est donc la valeur qui remplit une carte sans rien réduire.
 */
const triangleRectangle = (
  sideLabels: Record<string, string>,
  bloc: "carte" | "exemple" = "carte"
) => {
  const cote = bloc === "exemple" ? 200 : 222;
  return (
    <CanvasRenderer
      figure={
        {
          kind: "triangle",
          points: {
            A: { x: 30, y: cote * 0.72 },
            B: { x: cote * 0.86, y: cote * 0.72 },
            C: { x: 30, y: cote * 0.14 },
          },
          sideLabels,
          // ⚠️ L'ANGLE DROIT SE DÉCLARE DANS `marks`, PAS DANS `display` : il
          // n'existe aucun `showRightAngle`. Posé au mauvais endroit, l'objet
          // reste accepté et la marque ne se dessine pas.
          marks: { rightAngleAt: "A" },
          display: { showPoints: true, showLabels: true, showSides: true },
          size: { width: cote, height: Math.round(cote * 0.82) },
        } as never
      }
    />
  );
};

export const ficheRacineCarree3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`. Le
  // notionId du coach est `entier_racine_carree`.
  notion: "entier-racine-carree",
  titre: "La racine carrée",
  accroche:
    "Élever au carré, on sait faire depuis la cinquième : $7$ donne $49$. La racine carrée fait le chemin INVERSE — elle part de $49$ et retrouve $7$. Et ce chemin de retour n'est pas un caprice de programme : dès qu'on connaît l'aire d'un carré et qu'on cherche son côté, ou qu'on applique Pythagore et qu'on cherche une longueur, on ne peut plus s'en passer.",
  identite: [
    { label: "Le symbole", valeur: "$\\sqrt{\\phantom{x}}$ — le radical, et sa barre qui couvre tout" },
    { label: "Ce que ça défait", valeur: "Le carré : $\\sqrt{a^2} = a$ et $(\\sqrt{a})^2 = a$" },
    { label: "La condition", valeur: "Seulement pour un nombre POSITIF, et le résultat est positif" },
  ],
  definition: {
    texte:
      "La RACINE CARRÉE d'un nombre positif $a$, notée $\\sqrt{a}$, est le nombre POSITIF dont le carré vaut $a$. Autrement dit, $\\sqrt{a}$ est le seul nombre positif qui vérifie $(\\sqrt{a})^2 = a$. ⭐ Géométriquement, c'est le CÔTÉ du carré dont l'aire vaut $a$ : voilà pourquoi le mot « carré » est dans son nom.",
  },
  figure: {
    schema: legende(
      carreDAire(5),
      "$25$ cases d'aire $1$, et un côté de $5$ : $\\sqrt{25} = 5$",
    ),
    legende:
      "Chaque case vaut une unité d'aire : on peut les compter, il y en a 25. Le côté, lui, se lit sur un bord : 5 cases. La racine carrée de 25 est donc 5 — non pas parce qu'une calculatrice l'affiche, mais parce que c'est la longueur qui, répétée sur les deux côtés, produit cette aire.",
  },
  proprietes: [
    {
      titre: "Un carré parfait a une racine entière",
      micros: ["entier_racine_carre_parfait"],
      texte:
        "Un CARRÉ PARFAIT est le carré d'un entier : $1$, $4$, $9$, $16$, $25$, $36$, $49$, $64$, $81$, $100$… Ce sont les seuls nombres dont la racine carrée tombe juste. ⭐ Les connaître jusqu'à $15^2 = 225$ fait gagner un temps considérable au brevet — $36$ est un carré parfait, $20$ n'en est pas un.",
      schema: tableau({
        headers: ["n", "n × n"],
        rows: [
          { values: ["1", "1"] },
          { values: ["2", "4"] },
          { values: ["3", "9"] },
          { values: ["4", "16"] },
          { values: ["5", "25"] },
          { values: ["6", "36"] },
          { values: ["7", "49"] },
          { values: ["8", "64"] },
        ],
        highlight: { row: 5 },
        caption: "puis 81, 100, 121, 144, 169, 196, 225",
      }),
    },
    {
      titre: "La racine est TOUJOURS positive",
      micros: ["entier_racine_comprendre"],
      texte:
        "$4^2 = 16$, et $(-4)^2 = 16$ aussi : deux nombres ont pour carré $16$. Mais $\\sqrt{16}$ n'en désigne qu'UN SEUL, le positif. ⚠️ $\\sqrt{16} = 4$, jamais $-4$, et jamais « $4$ ou $-4$ ». C'est une convention, et elle est indispensable : sans elle, $\\sqrt{16}$ ne serait pas un nombre mais deux.",
      schema: tableau({
        headers: ["on écrit", "on obtient"],
        rows: [
          { values: ["4 × 4", "16"] },
          { values: ["(−4) × (−4)", "16"] },
          { values: ["√16", "4 seulement"] },
        ],
        highlight: { row: 2 },
        caption: "deux carrés donnent 16, une seule racine",
      }),
    },
    {
      titre: "Le carré et la racine se défont l'un l'autre",
      micros: ["entier_racine_comprendre"],
      texte:
        "$(\\sqrt{7})^2 = 7$ : on prend la racine, puis le carré, et on retrouve le nombre de départ. Dans l'autre sens, $\\sqrt{7^2} = \\sqrt{49} = 7$. ⭐ Les deux opérations s'annulent, comme $+3$ et $-3$, ou comme $\\times 2$ et $\\div 2$. C'est ce qui permet de résoudre $x^2 = 49$.",
      schema: tableau({
        headers: ["départ", "on élève", "on prend la racine"],
        rows: [
          { values: ["7", "49", "7"] },
          { values: ["12", "144", "12"] },
        ],
        caption: "l'aller-retour ramène au départ",
      }),
    },
    {
      titre: "Une racine qui ne tombe pas juste a quand même une place",
      micros: ["entier_racine_encadrer"],
      texte:
        "$20$ n'est pas un carré parfait, donc $\\sqrt{20}$ n'est pas entier. Mais on sait l'ENCADRER : $4^2 = 16$ et $5^2 = 25$, or $16 < 20 < 25$, donc $4 < \\sqrt{20} < 5$. ⭐ Encadrer, c'est déjà connaître : on sait où le nombre se trouve, et son écriture décimale ne s'arrête jamais.",
      schema: legende(
        droite({
          min: 3,
          max: 6,
          step: 1,
          points: [
            { value: 4, label: "4", color: BLEU },
            { value: 4.47, label: "√20", color: ROUGE },
            { value: 5, label: "5", color: BLEU },
          ],
        }),
        "$\\sqrt{20}$ se place entre $4$ et $5$, plus près de $4{,}5$",
      ),
    },
    {
      titre: "La racine d'une somme n'est PAS la somme des racines",
      micros: ["entier_racine_defi"],
      texte:
        "C'est l'erreur la plus fréquente de la notion, et un contre-exemple suffit à la tuer. $\\sqrt{9 + 16} = \\sqrt{25} = 5$, alors que $\\sqrt{9} + \\sqrt{16} = 3 + 4 = 7$. ⚠️ $5 \\neq 7$ : la barre du radical couvre TOUT ce qui est dessous, et il faut donc calculer la somme AVANT de prendre la racine.",
      schema: tableau({
        headers: ["ce qu'on écrit", "ça vaut"],
        rows: [
          { values: ["√(9 + 16) = √25", "5"] },
          { values: ["√9 + √16 = 3 + 4", "7"] },
        ],
        highlight: { row: 1 },
        caption: "5 ≠ 7 : les deux écritures ne disent pas la même chose",
      }),
    },
  ],
  reel: {
    texte:
      "Un terrain carré de 400 m² a un côté de 20 m : c'est la racine carrée qui le donne, et c'est le calcul que fait un géomètre avant de commander une clôture. En physique, la vitesse d'un objet qui tombe s'obtient par une racine carrée. En statistiques — la partie que Frédéric mesure tous les jours — l'ÉCART-TYPE est la racine carrée de la variance : on prend la racine précisément pour revenir à l'unité de départ, des euros ou des centimètres, et non des euros au carré.",
  },
  historique: {
    texte:
      "Les Babyloniens, vers −1800, calculaient déjà des racines carrées avec une précision remarquable : la tablette YBC 7289 donne √2 avec six décimales justes. Les Grecs, eux, ont eu un choc en découvrant que √2 ne s'écrit comme aucune fraction — la légende veut qu'un pythagoricien l'ait payé cher. Le symbole √ apparaît en 1525 sous la plume de l'Allemand Christoff Rudolff : c'est un r déformé, pour « radix », la racine en latin.",
  },
  formule: {
    contexte: "Le côté d'un carré à partir de son aire",
    // ⛔ LES DÉLIMITEURS `$` NE SONT PAS FACULTATIFS. `formule.expression` passe
    // par `TexteMath`, qui ne rend QUE ce qui est entre deux `$` : sans eux, la
    // fiche affichait « c = \sqrt{\mathcal{A}} » en clair à l'élève. C'est le
    // défaut qui avait touché six fiches de 4e le 30/08, et il ne se voit qu'au
    // rendu.
    expression: "$c = \\sqrt{\\text{aire}}$",
    legende:
      "Une aire de 49 cm² donne un côté de 7 cm, car 7 × 7 = 49. C'est le sens géométrique de la racine, et le calcul le plus fréquent au brevet.",
    schema: legende(
      carreDAire(7, "#dcfce7", "formule"),
      "aire $49$, côté $7$ : $\\sqrt{49} = 7$",
    ),
  },
  methode: [
    {
      titre: "Chercher un carré parfait AVANT de sortir la calculatrice",
      micros: ["entier_racine_calculer"],
      texte:
        "Devant $\\sqrt{144}$, on ne tape pas : on se demande quel entier a pour carré $144$. Les carrés de $11$ à $15$ ($121$, $144$, $169$, $196$, $225$) reviennent sans cesse au brevet, et les reconnaître transforme un calcul en lecture.",
    },
    {
      titre: "Encadrer : deux carrés parfaits qui entourent le nombre",
      micros: ["entier_racine_encadrer"],
      texte:
        "Pour $\\sqrt{60}$, on cherche le carré parfait juste en dessous et celui juste au-dessus : $49 < 60 < 64$, c'est-à-dire $7^2 < 60 < 8^2$. On conclut $7 < \\sqrt{60} < 8$. Le plus grand entier dont le carré ne dépasse pas $60$ est donc $7$.",
    },
    {
      titre: "Résoudre $x^2 = a$ : deux solutions, pas une",
      micros: ["entier_racine_comprendre"],
      texte:
        "⚠️ Ne pas confondre deux questions différentes. $\\sqrt{49}$ vaut $7$, un seul nombre. Mais l'équation $x^2 = 49$ a DEUX solutions, $7$ et $-7$. La racine carrée choisit le positif ; l'équation, elle, ne choisit pas.",
    },
    {
      titre: "Vérifier en élevant au carré",
      micros: ["entier_racine_calculer"],
      texte:
        "Toute racine trouvée se contrôle en une seconde : on l'élève au carré et on doit retomber sur le nombre de départ. $\\sqrt{169} = 13$ ? On vérifie : $13 \\times 13 = 169$. C'est juste.",
    },
  ],
  usages: [
    {
      titre: "Retrouver un côté à partir d'une aire",
      micros: ["entier_racine_defi"],
      detail:
        "Une aire de carré est un côté multiplié par lui-même : pour remonter au côté, on prend la racine carrée de l'aire.",
    },
    {
      titre: "Terminer un calcul de Pythagore",
      micros: ["entier_racine_defi"],
      detail:
        "Pythagore donne le CARRÉ de la longueur cherchée. La racine carrée est le dernier geste, celui qui fournit enfin la longueur.",
      schema: legende(
        triangleRectangle({ AB: "8 cm", CA: "6 cm", BC: "?" }),
        "$6^2 + 8^2 = 100$, donc l'hypoténuse vaut $\\sqrt{100} = 10$",
      ),
    },
    {
      titre: "Situer un nombre qu'on ne sait pas écrire",
      micros: ["entier_racine_encadrer"],
      detail:
        "$\\sqrt{2}$ ne s'écrit ni comme fraction ni comme décimal qui s'arrête. L'encadrer entre $1$ et $2$ suffit pourtant à le comparer, l'ordonner, le placer.",
    },
  ],
  exemples: [
    {
      titre: "Calculer une racine carrée",
      donnees: "On cherche $\\sqrt{144}$.",
      question: "Quel est ce nombre ?",
      solution:
        "On cherche l'entier positif dont le carré vaut $144$. En parcourant les carrés : $10^2 = 100$, trop petit ; $11^2 = 121$, trop petit ; $12^2 = 144$. C'est lui. Donc $\\sqrt{144} = 12$. Contrôle : $12 \\times 12 = 144$. ⭐ Aucune calculatrice n'a servi — seulement la liste des carrés.",
      schema: legende(
        tableau(
          {
            headers: ["essai", "son carré", "verdict"],
            rows: [
              { values: ["10", "100", "trop petit"] },
              { values: ["11", "121", "trop petit"] },
              { values: ["12", "144", "c'est lui"] },
            ],
            highlight: { row: 2 },
          },
          "exemple"
        ),
        "on remonte la liste des carrés",
      ),
    },
    {
      titre: "Encadrer entre deux entiers",
      donnees: "On cherche à encadrer $\\sqrt{50}$ entre deux entiers consécutifs.",
      question: "Entre quels entiers se trouve-t-il ?",
      solution:
        "On cherche les deux carrés parfaits qui entourent $50$. Le plus proche en dessous est $49 = 7^2$ ; le plus proche au-dessus est $64 = 8^2$. Comme $49 < 50 < 64$, on en déduit $7 < \\sqrt{50} < 8$. ⭐ Et $50$ est tout près de $49$ : $\\sqrt{50}$ est donc à peine plus grand que $7$, ce qu'aucun encadrement ne dit mais que la position sur la droite montre.",
      schema: legende(
        droite(
          {
            min: 6,
            max: 9,
            step: 1,
            points: [
              { value: 7, label: "7", color: BLEU },
              { value: 7.07, label: "√50", color: ROUGE },
              { value: 8, label: "8", color: BLEU },
            ],
          },
          "exemple"
        ),
        "$\\sqrt{50}$ est juste après $7$",
      ),
    },
    {
      titre: "Le carré et son côté",
      donnees: "Un carré a une aire de $49\\ \\text{cm}^2$.",
      question: "Quelle est la longueur de son côté ?",
      solution:
        "L'aire d'un carré vaut côté × côté. On cherche donc le nombre positif dont le carré vaut $49$ : c'est $\\sqrt{49} = 7$. Le côté mesure $7$ cm. Contrôle : $7 \\times 7 = 49$, et le périmètre vaudrait $4 \\times 7 = 28$ cm. ⚠️ On n'a pas divisé $49$ par $4$ : diviser l'aire par $4$ ne donne pas le côté, c'est une erreur qui revient chaque année.",
      schema: legende(carreDAire(7, "#fef3c7", "exemple"), "$49$ cases, $7$ de côté"),
    },
  ],
  pieges: [
    "Écrire √16 = 8 en divisant par 2. Diviser n'est pas prendre la racine : on cherche le nombre qui, MULTIPLIÉ par lui-même, redonne 16 — c'est 4.",
    "Répondre « 4 ou −4 » à √16. Le symbole √ désigne toujours le nombre POSITIF. C'est l'équation x² = 16 qui a deux solutions, pas la racine.",
    "Écrire √(9 + 16) = √9 + √16. Faux : 5 d'un côté, 7 de l'autre. La barre du radical couvre toute la somme, qu'il faut calculer en premier.",
    "Croire que toute racine carrée s'écrit avec des décimales qui s'arrêtent. √2 = 1,414… ne s'arrête jamais et n'est aucune fraction : on l'encadre, ou on garde l'écriture √2.",
    "Confondre √a et a/2. Elles coïncident pour a = 4 seulement — et cette coïncidence est justement ce qui ancre l'erreur.",
  ],
  aRetenir: [
    "√a est le nombre POSITIF dont le carré vaut a : (√a)² = a.",
    "Les carrés parfaits à connaître : 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225.",
    "Encadrer √n, c'est trouver les deux carrés parfaits qui entourent n.",
    "√(a + b) n'est PAS √a + √b — un contre-exemple suffit : √25 = 5 mais √9 + √16 = 7.",
    "Géométriquement, √aire = côté du carré.",
  ],
  entrainement: [
    {
      question: "Calculer √81.",
      micros: ["entier_racine_calculer"],
      correction:
        "On cherche l'entier positif dont le carré vaut 81 : 9 × 9 = 81. Donc √81 = 9. ⚠️ Ce n'est ni 8 (qui donnerait 64), ni 40,5 (qui serait 81 ÷ 2).",
    },
    {
      question: "Calculer √169.",
      micros: ["entier_racine_calculer"],
      correction:
        "12² = 144, trop petit ; 13² = 169. Donc √169 = 13. Ce carré fait partie de ceux de 11 à 15 qu'il faut savoir de mémoire.",
    },
    {
      question: "Parmi 45, 48, 49 et 50, lequel est un carré parfait ?",
      micros: ["entier_racine_carre_parfait"],
      correction:
        "49, car 49 = 7 × 7. Les trois autres ne sont le carré d'aucun entier : ils tombent entre 36 = 6² et 49 = 7², ou entre 49 et 64 = 8².",
    },
    {
      question: "20 est-il un carré parfait ?",
      micros: ["entier_racine_carre_parfait"],
      correction:
        "Non. 4² = 16 et 5² = 25, et 20 se trouve entre les deux sans être ni l'un ni l'autre. Sa racine n'est donc pas entière : 4 < √20 < 5.",
    },
    {
      question: "Entre quels entiers consécutifs se trouve √60 ?",
      micros: ["entier_racine_encadrer"],
      correction:
        "On encadre 60 par deux carrés parfaits : 49 < 60 < 64, soit 7² < 60 < 8². Donc 7 < √60 < 8.",
    },
    {
      question: "Quel est le plus grand entier dont le carré est inférieur ou égal à 30 ?",
      micros: ["entier_racine_encadrer"],
      correction:
        "5² = 25 ne dépasse pas 30, mais 6² = 36 le dépasse. La réponse est donc 5. (C'est aussi la partie entière de √30.)",
    },
    {
      question: "Que vaut (√11)² ?",
      micros: ["entier_racine_comprendre"],
      correction:
        "11. Le carré défait la racine : on n'a pas besoin de connaître la valeur décimale de √11 pour répondre.",
    },
    {
      question: "Un élève écrit √(16 + 9) = 4 + 3 = 7. Où est l'erreur ?",
      micros: ["entier_racine_defi"],
      correction:
        "La barre du radical couvre toute la somme : il faut d'abord calculer 16 + 9 = 25, puis prendre la racine. √25 = 5, et non 7. La racine d'une somme n'est pas la somme des racines.",
    },
    {
      question: "Un carré a une aire de 144 cm². Quel est son côté ?",
      micros: ["entier_racine_defi"],
      correction:
        "Le côté vaut √144 = 12 cm, car 12 × 12 = 144. ⚠️ Pas 144 ÷ 4 = 36, qui ne correspond à rien ici : diviser par 4 donnerait le quart de l'aire, pas le côté.",
    },
    {
      question:
        "Dans un triangle rectangle, les côtés de l'angle droit mesurent 6 cm et 8 cm. Quelle est la longueur de l'hypoténuse ?",
      micros: ["entier_racine_defi"],
      correction:
        "Pythagore donne le carré de l'hypoténuse : 6² + 8² = 36 + 64 = 100. La longueur est donc √100 = 10 cm. La racine carrée est bien le dernier geste, celui qui passe d'une aire à une longueur.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=3e",
};

// ─── MODE CLASSE ───────────────────────────────────────────────────────────────
// ⚠️ AUCUN LaTeX ICI : les diapos ne passent pas par `TexteMath`, et un
// « $\sqrt{25}$ » s'afficherait tel quel au tableau. On écrit donc « racine de
// vingt-cinq », ce qui est de toute façon ce que le professeur prononce.
export const slidesRacineCarree3e: ClasseSlide[] = [
  {
    titre: "Le chemin du retour",
    badge: "Ce qu'on cherche",
    section: {
      type: "objectif",
      phrase: "Sept donne quarante-neuf. Et quarante-neuf, il redonne quoi ?",
      sousPhrase:
        "Élever au carré, on sait faire. La racine carrée fait le trajet inverse : elle part du résultat et retrouve le nombre de départ.",
      encadre: {
        titre: "La définition",
        texte:
          "La racine carrée d'un nombre positif est le nombre POSITIF dont le carré vaut ce nombre.",
      },
    },
  },
  {
    titre: "Pourquoi le mot « carré »",
    badge: "On le voit",
    teinte: "definition",
    schema: carreDAire(5),
    section: {
      type: "objectif",
      phrase: "Vingt-cinq cases, et un côté de cinq",
      sousPhrase:
        "Comptez les cases : il y en a vingt-cinq, c'est l'aire. Comptez un bord : il y en a cinq, c'est le côté. La racine carrée de vingt-cinq, c'est ce côté.",
      encadre: {
        titre: "À retenir",
        texte:
          "La racine carrée d'une aire donne le côté du carré. Le mot « carré » n'est pas décoratif : il dit la figure.",
      },
    },
  },
  {
    titre: "Les carrés parfaits",
    badge: "À savoir par cœur",
    teinte: "propriete",
    section: {
      type: "cartes",
      cartes: [
        { titre: "De un à cinq", texte: "un, quatre, neuf, seize, vingt-cinq" },
        { titre: "De six à dix", texte: "trente-six, quarante-neuf, soixante-quatre, quatre-vingt-un, cent" },
        { titre: "De onze à quinze", texte: "cent vingt et un, cent quarante-quatre, cent soixante-neuf, cent quatre-vingt-seize, deux cent vingt-cinq" },
        { titre: "Ce qu'ils font gagner", texte: "Devant une racine, on ne calcule pas : on reconnaît." },
      ],
    },
  },
  {
    titre: "Une seule racine, deux solutions",
    badge: "La nuance qui compte",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        titre: "La racine carrée",
        contenu:
          "Racine de seize vaut quatre. Un seul nombre, et il est positif. C'est une convention, et elle est nécessaire : sans elle, l'écriture désignerait deux nombres à la fois.",
      },
      droite: {
        titre: "L'équation",
        contenu:
          "x au carré égale seize a DEUX solutions : quatre et moins quatre. L'équation ne choisit pas ; la racine, si.",
      },
    },
  },
  {
    titre: "Encadrer, c'est déjà connaître",
    badge: "Quand ça ne tombe pas juste",
    teinte: "methode",
    schema: droite({
      min: 3,
      max: 6,
      step: 1,
      points: [
        { value: 4, label: "4", color: BLEU },
        { value: 4.47, label: "√20", color: ROUGE },
        { value: 5, label: "5", color: BLEU },
      ],
    }),
    section: {
      type: "etapes",
      etapes: [
        "Vingt n'est pas un carré parfait : sa racine n'est pas entière.",
        "On cherche le carré parfait juste en dessous : seize, qui est quatre au carré.",
        "Puis celui juste au-dessus : vingt-cinq, qui est cinq au carré.",
        "Donc racine de vingt est entre quatre et cinq. On sait où elle est, sans l'écrire.",
      ],
    },
  },
  {
    titre: "Le piège qui coûte le plus de points",
    badge: "Un contre-exemple suffit",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "ok",
        titre: "On calcule la somme d'abord",
        contenu:
          "Racine de neuf plus seize, c'est racine de vingt-cinq, donc cinq. La barre du radical couvre tout ce qui est dessous.",
      },
      droite: {
        variante: "piege",
        titre: "On sépare les racines",
        contenu:
          "Racine de neuf plus racine de seize, c'est trois plus quatre, donc sept. Cinq et sept ne sont pas le même nombre : la séparation est interdite.",
      },
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    teinte: "exemple",
    section: {
      type: "exemple",
      enonce: "Un carré a une aire de quarante-neuf centimètres carrés.",
      question: "Quelle est la longueur de son côté ?",
      correction:
        "L'aire d'un carré, c'est le côté multiplié par lui-même. On cherche donc le nombre positif dont le carré vaut quarante-neuf : c'est sept, puisque sept fois sept font quarante-neuf. Le côté mesure sept centimètres. On vérifie en élevant au carré, et on retombe bien sur quarante-neuf. Attention à ne pas diviser l'aire par quatre : quatre, c'est le nombre de côtés, ça n'a rien à voir avec l'aire.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    teinte: "exercice",
    section: {
      type: "exercice",
      enonce:
        "Dans un triangle rectangle, les deux côtés de l'angle droit mesurent six et huit centimètres.",
      question: "Quelle est la longueur de l'hypoténuse ?",
      indice:
        "Pythagore donne le CARRÉ de la longueur cherchée. Il reste un geste après.",
      correction:
        "Six au carré font trente-six, huit au carré font soixante-quatre. Leur somme vaut cent : c'est le carré de l'hypoténuse. La longueur est donc la racine carrée de cent, c'est-à-dire dix centimètres. La racine carrée est bien le dernier geste, celui qui ramène d'une aire à une longueur.",
    },
  },
];
