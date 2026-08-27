// ─── Fiche de cours : les équations (4e) ──────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/equations.bank.ts, notionId equation_resolution).
//
// ⭐ CINQUIÈME ET DERNIÈRE FICHE DU BLOC ALGÈBRE : expressions → distributivité
// → identités remarquables → factorisation → équations. Elle referme la série et
// s'appuie sur les quatre précédentes sans rien redéfinir : la lettre, le
// coefficient, réduire, développer. Les prérequis de la banque le disent
// eux-mêmes — `equation_resoudre_distributivite` dépend de
// `litteral_distributivite_simple`, `equation_verifier` de
// `litteral_expression_substituer`.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE (règle de Frédéric,
// 26/08). Elles sont HUIT, le plus gros effectif du bloc. Ce que la banque
// travaille vraiment :
//   equation_reconnaitre  → « Laquelle de ces écritures est une équation ? »
//        ⚠️ Le distracteur est « 2 + 7 = 9 » : une égalité SANS inconnue n'est
//        pas une équation. Et « 3x + 5 » non plus — une inconnue sans égalité.
//        Aussi : l'inconnue, le second membre, et « que signifie résoudre ».
//   equation_traduire     → « un nombre x augmenté de 3 vaut 11 » → x + 3 = 11 ;
//        « le double de x est égal à 14 » → 2x = 14 ; « le triple de x vaut 21 »
//   equation_resoudre_simple → x + 4 = 9 ; 3x = 15 ; x − 3 = 8 ; 4x = 20, et
//        « pour résoudre x + 5 = 12, quelle opération ? » → SOUSTRAIRE 5
//   equation_resoudre_reduction → 2x + 3x = 15 ; 4x − x = 12 ; 5x − 2x = 9
//   equation_resoudre_distributivite → 2(x + 3) = 14 ; 3(x − 1) = 12 ;
//        ⭐ et un énoncé demande explicitement DEUX FAÇONS de commencer
//        2(x + 3) = 14 : diviser d'abord, ou développer d'abord. La fiche les
//        montre toutes les deux, parce que la banque les veut toutes les deux.
//   equation_verifier     → 4 est-il solution de x + 3 = 7 ? (oui) ; 2 de
//        3x = 9 ? (non) ; ⭐ et 0 de 3x = 0 ? (OUI — le zéro qui surprend)
//   equation_probleme     → « j'ai pensé à un nombre, +5 → 17 » ; « le double
//        d'un nombre diminué de 3 vaut 11 » ; ⭐ et le marché de Saint-Pierre,
//        des mangues à l'unité — le réel de la fiche est écrit par la banque.
//   equation_defi         → ⚠️ le nom ne dit pas le contenu : ce sont LES
//        ERREURS. Et l'une d'elles est rare et précieuse (voir ci-dessous).
// Tous les nombres de la fiche sortent de cette liste, sans exception.
//
// ⭐ LE CONTRE-EXEMPLE DE CETTE FICHE EST LE PLUS BEAU DE LA SÉRIE, et c'est la
// banque qui le donne, mot pour mot dans son explication :
//     « Léo dit : dans 2x + 3 = 11, x = 4 car 2 + 3 + 4 = 9. A-t-il raison ? »
//     → « Non. MÊME SI x = 4 EST BIEN SOLUTION, le raisonnement de Léo est faux. »
// Léo a la bonne réponse par un mauvais chemin. C'est le seul item du bloc
// algèbre où un élève peut avoir juste et se tromper quand même — et c'est
// exactement ce que la vérification sert à distinguer. Toute la fiche mène là.
// Son jumeau, plus ordinaire : « 5x = 8 donc x = 3 » — on soustrait au lieu de
// diviser.
//
// Le choix des dessins :
//   · l'équation comme un TOUT dont un morceau manque   → `schema_barre` avec
//     `unknown: true`, le seul canvas qui sache dessiner un « ? » ;
//   · résoudre comme l'opération INVERSE                → `calcul_pose` ;
//   · vérifier comme un essai qu'on refait              → `tableau_donnees` ;
//   · et le vocabulaire, qui n'est pas une figure       → `tableau_donnees`.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

const BLEU = "#dbeafe";

/** Un dessin et sa phrase, sous lui. La phrase passe par `TexteMath` — les
 *  libellés à l'intérieur du dessin, tracés en `<text>` SVG, restent en clair. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// ⭐ L'ÉQUATION DESSINÉE : UN TOUT CONNU, UN MORCEAU CONNU, UN TROU.
// `schema_barre` porte un champ `unknown` qui trace une case rouge avec un « ? ».
// C'est le seul canvas du catalogue qui sache dessiner ce qu'on ne connaît pas,
// et c'est exactement ce dont une équation a besoin : on lit le total au-dessus,
// on voit la partie connue, et la case rouge est l'inconnue.
//
// ⭐ ET LES DEUX PARTS SONT DE MÊME LARGEUR, CE QUI EST HONNÊTE ICI. Le canvas
// met les parts à l'échelle de leur valeur — mais seulement si TOUTES portent un
// nombre. Dès qu'il y a une inconnue, il n'y a rien à mettre à l'échelle et il
// revient aux tranches égales. Autrement dit : le dessin refuse de faire croire
// qu'il connaît x. C'est le comportement voulu du composant, pas un défaut.
//
// ⚠️ RÉUTILISÉ TROIS FOIS AVEC DES NOMBRES DIFFÉRENTS → donc une FONCTION qui
// prend son contenu, jamais une constante recopiée.
// ⚠️ Hauteur 200 : les étiquettes de parts sont posées à 144 px du haut et la
// phrase du bas à 18 px du bas — sous 180, elles se frôlent (mesuré en 1280).
const barreInconnue = (opts: {
  width: number;
  total: string;
  connu: string;
  phrase: string;
}) => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width: opts.width, height: 200 },
      total: opts.total,
      parts: [
        { label: "l'inconnue", unknown: true },
        { label: "connu", value: opts.connu, color: BLEU },
      ],
      questionLabel: opts.phrase,
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
    }}
  />
);

// ⚠️ LE TABLEAU QUI RÈGLE LE PIÈGE DU QCM. La banque propose « 2 + 7 = 9 » parmi
// les distracteurs, et beaucoup le choisissent : c'est bien une égalité. Mais il
// n'y a rien à chercher. Il faut LES DEUX — une égalité ET une inconnue.
const tableauEcritures = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["l'écriture", "ce qu'elle a", "ce que c'est"],
      rows: [
        { values: ["3x + 2 = 11", "égalité + inconnue", "une équation"] },
        { values: ["2 + 7 = 9", "égalité, pas d'inconnue", "un calcul"] },
        { values: ["3x + 5", "inconnue, pas d'égalité", "une expression"] },
      ],
      highlight: { row: 0 },
      caption: "il faut les DEUX : le signe = et la lettre",
      display: { compact: true, striped: true },
    }}
  />
);

// RÉSOUDRE, C'EST DÉFAIRE. L'opération posée montre le geste dans l'autre sens :
// puisque 4 s'ajoutait à x pour faire 9, x vaut 9 moins 4. Le calcul est
// enfantin — ce qui compte, c'est de voir que c'est une SOUSTRACTION, alors que
// l'équation, elle, portait une addition.
const calculInverse = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "soustraction",
      numbers: ["9", "4"],
      result: "5",
      display: { showResult: true, compact: true },
      questionLabel: "x + 4 = 9 donc x = 9 − 4",
    }}
  />
);

// RÉDUIRE AVANT DE RÉSOUDRE. Tant qu'il y a deux termes en x, il n'y a rien à
// isoler. On additionne d'abord les coefficients — le geste des fiches
// précédentes — et l'équation redevient une équation simple.
const calculReduire = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "addition",
      numbers: ["2x", "3x"],
      result: "5x",
      display: { showResult: true, compact: true },
      questionLabel: "2x + 3x = 15 devient 5x = 15",
    }}
  />
);

// ⭐ LE TABLEAU QUI DÉFINIT « SOLUTION ». On essaie des valeurs, on remplace, on
// regarde si l'égalité tient. Une seule ligne dit « oui » — et c'est ça, la
// solution. Ce tableau est aussi le geste que Léo n'a pas fait.
const tableauEssais = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["on essaie x =", "alors 3x vaut", "est-ce 9 ?"],
      rows: [
        { values: ["2", "6", "non"] },
        { values: ["3", "9", "oui"] },
        { values: ["4", "12", "non"] },
      ],
      highlight: { row: 1 },
      caption: "une seule valeur rend l'égalité vraie : c'est la solution",
      display: { compact: true, striped: true },
    }}
  />
);

// ⭐ L'OPÉRATION ET SON INVERSE — le tableau que l'élève doit avoir en tête.
// C'est aussi l'antidote direct de l'erreur « 5x = 8 donc x = 3 » : la ligne
// « multiplie → divise » dit que devant un produit on ne soustrait jamais.
const tableauInverses = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["l'équation", "ce que subit x", "on fait l'inverse"],
      rows: [
        { values: ["x + 4 = 9", "on ajoute 4", "soustraire 4"] },
        { values: ["x − 3 = 8", "on retire 3", "ajouter 3"] },
        { values: ["3x = 15", "on multiplie par 3", "diviser par 3"] },
      ],
      highlight: { row: 2 },
      caption: "devant un produit on DIVISE — jamais on ne soustrait",
      display: { compact: true, striped: true },
    }}
  />
);

// ⭐ DEUX CHEMINS, ET LA BANQUE LES VEUT TOUS LES DEUX. Un de ses énoncés demande
// littéralement « explique deux façons de commencer la résolution de
// 2(x + 3) = 14 ». Un autre demande laquelle est la PLUS SIMPLE, et la réponse
// attendue est « diviser les deux côtés ». Le tableau met les deux colonnes face
// à face : même équation, même solution, deux routes.
const tableauDeuxChemins = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["2(x + 3) = 14", "on divise d'abord", "on développe d'abord"],
      rows: [
        { values: ["1re ligne", "x + 3 = 7", "2x + 6 = 14"] },
        { values: ["2e ligne", "x = 7 − 3", "2x = 8"] },
        { values: ["on trouve", "x = 4", "x = 4"] },
      ],
      highlight: { row: 2 },
      caption: "deux routes, la même solution — la 1re est plus courte",
      display: { compact: true, striped: true },
    }}
  />
);

// AU MARCHÉ DE SAINT-PIERRE. L'énoncé est celui de la banque, avec ses mangues à
// l'unité. Poser 3x = 21 puis diviser, c'est déjà une équation — et l'élève le
// faisait sans le savoir bien avant la 4ᵉ.
const calculMangues = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "division",
      numbers: ["21", "3"],
      division: { dividende: "21", diviseur: "3", quotient: "7", reste: "0" },
      display: { showResult: true, compact: true },
      questionLabel: "3x = 21 donc x = 21 ÷ 3",
    }}
  />
);

const pieges = [
  "Soustraire au lieu de diviser : dans 5x = 8, le 5 MULTIPLIE l'inconnue, donc on divise par 5. Écrire « x = 3 » revient à croire que 5x veut dire 5 + x.",
  "Ne faire l'opération que d'un seul côté : une équation est un équilibre. Si l'on retire 4 à gauche sans le retirer à droite, l'égalité est cassée et tout ce qui suit est faux.",
  "Résoudre sans avoir réduit : dans 2x + 3x = 15, il n'y a rien à isoler tant qu'il reste deux termes en x. On réduit d'abord — 5x = 15 —, on résout ensuite.",
];

const aRetenir = [
  "Une équation est une égalité qui contient une inconnue. La résoudre, c'est trouver la valeur de la lettre qui rend l'égalité vraie.",
  "On isole l'inconnue en faisant la même opération des deux côtés, et cette opération est l'INVERSE de celle que subit x : ajouter/soustraire, multiplier/diviser.",
  "Une solution se vérifie en la remplaçant dans l'équation de départ. Trouver le bon nombre ne suffit pas : il faut que le chemin soit juste aussi.",
];

export const ficheEquations4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "equation-resolution",
  titre: "Les équations",
  accroche:
    "Jusqu'ici, on partait des nombres pour aller vers le résultat. Une équation fait l'inverse : le résultat est donné, et c'est l'un des nombres qui manque. Résoudre, c'est remonter le calcul à l'envers pour retrouver ce nombre-là — et le vérifier. C'est l'aboutissement de tout ce que l'algèbre a mis en place cette année.",
  identite: [
    { label: "Le mot clé", valeur: "Une égalité qui contient une inconnue" },
    { label: "Le geste", valeur: "La même opération des deux côtés" },
    { label: "La règle d'or", valeur: "Une solution se vérifie, elle ne se croit pas" },
  ],
  definition: {
    texte:
      "Une équation est une égalité dans laquelle figure une lettre dont on ne connaît pas la valeur : l'inconnue. Ce qui est écrit à gauche du signe $=$ s'appelle le premier membre, ce qui est à droite le second membre. Résoudre l'équation, c'est trouver la ou les valeurs de l'inconnue qui rendent l'égalité VRAIE. ⚠️ Une égalité sans inconnue, comme $2 + 7 = 9$, n'est pas une équation : il n'y a rien à chercher.",
  },
  figure: {
    schema: legende(
      barreInconnue({ width: 228, total: "9", connu: "4", phrase: "x + 4 = 9" }),
      "le tout vaut 9, un morceau vaut 4 — l'autre est l'inconnue"
    ),
    legende:
      "Une équation, c'est un tout que l'on connaît et un morceau qui manque. Ici le total est 9 et l'un des morceaux vaut 4 : la case rouge est $x$. ⭐ Les deux parts sont dessinées de même largeur, et c'est volontaire — le dessin refuse de faire croire qu'il connaît déjà $x$.",
  },
  proprietes: [
    {
      titre: "Une égalité ET une inconnue",
      micros: ["equation_reconnaitre"],
      texte:
        "$3x + 2 = 11$ est une équation : il y a un signe $=$ et une lettre à trouver. $2 + 7 = 9$ n'en est pas une — c'est un calcul, tout y est connu. Et $3x + 5$ non plus : il manque l'égalité.",
      schema: tableauEcritures,
    },
    {
      titre: "Résoudre, c'est défaire",
      micros: ["equation_resoudre_simple"],
      texte:
        "Dans $x + 4 = 9$, le 4 s'ajoute à $x$. Pour l'enlever, on soustrait 4 — des DEUX côtés, sinon l'égalité est cassée. Il reste $x = 5$. L'opération qui résout est l'inverse de celle qu'on lit.",
      schema: calculInverse,
    },
    {
      titre: "Réduire avant de résoudre",
      micros: ["equation_resoudre_reduction"],
      texte:
        "Dans $2x + 3x = 15$, il n'y a rien à isoler : $x$ apparaît deux fois. On réduit d'abord — $2x + 3x = 5x$ — et l'équation devient $5x = 15$, qu'on sait résoudre.",
      schema: calculReduire,
    },
    {
      titre: "Une seule valeur convient",
      micros: ["equation_verifier"],
      texte:
        "Un nombre est solution s'il rend l'égalité vraie, et lui seul. Pour $3x = 9$ : 2 donne 6, 4 donne 12, seul 3 donne 9. ⚠️ Et 0 peut être solution — pour $3x = 0$, c'est même la bonne réponse.",
      schema: tableauEssais,
    },
  ],
  reel: {
    texte:
      "Une équation, c'est la question qu'on se pose vraiment dans la vie : on connaît le résultat, on cherche l'ingrédient. Au marché de Saint-Pierre, des mangues à 3 € l'unité et 21 € payés — combien de mangues ? C'est $3x = 21$, et personne ne le formule ainsi, mais tout le monde divise. C'est aussi le budget d'une sortie dont on connaît le total et une partie des dépenses, la durée d'un trajet dont on connaît l'heure d'arrivée, ou la quantité d'ingrédient à ajouter pour atteindre une masse voulue. L'algèbre ne sert pas à compliquer ces questions : elle sert à les écrire, pour que les difficiles se résolvent comme les faciles.",
  },
  historique: {
    texte:
      "Le signe $=$ n'a que cinq siècles. Il a été inventé en 1557 par le Gallois Robert Recorde, qui en avait assez d'écrire « est égal à » en toutes lettres : il a choisi deux traits parallèles de même longueur, parce que, disait-il, deux choses ne peuvent pas être plus égales que cela. Avant lui, et pendant des siècles, les équations s'énonçaient en phrases. Le premier à avoir noté l'inconnue par un symbole est le Grec Diophante d'Alexandrie, au IIIᵉ siècle — d'où le nom d'« équations diophantiennes », encore utilisé aujourd'hui.",
  },
  formule: {
    contexte: "Les deux gestes qui gardent l'équilibre",
    expression: "$x + a = b$  donne  $x = b - a$   ·   $ax = b$  donne  $x = \\dfrac{b}{a}$",
    legende:
      "On fait toujours la même chose des deux côtés. Ce qui s'ajoutait se retranche, ce qui multipliait divise. ⚠️ Pour $5x = 8$, on DIVISE par 5 : on ne soustrait pas 5, sinon $5x$ voudrait dire $5 + x$.",
    // ⛔ Pas de schéma ici, et c'est réfléchi : la barre montre déjà l'équilibre,
    // et l'opération posée montre déjà l'inverse. Un troisième dessin ne dirait
    // rien de neuf (Frédéric, 25/08).
  },
  methode: [
    {
      titre: "Traduire",
      micros: ["equation_traduire"],
      texte:
        "On nomme $x$ ce qu'on cherche, puis on traduit mot à mot : « augmenté de » donne $+$, « le double » donne $2x$, « vaut » donne le signe $=$. « Un nombre augmenté de 3 vaut 11 » s'écrit $x + 3 = 11$.",
      schema: barreInconnue({ width: 228, total: "11", connu: "3", phrase: "x + 3 = 11" }),
    },
    {
      titre: "Isoler l'inconnue",
      micros: ["equation_resoudre_simple", "equation_resoudre_reduction"],
      texte:
        "On réduit s'il le faut, puis on défait ce qui entoure $x$, en faisant la même opération des deux côtés. On enlève d'abord ce qui s'ajoute, on divise ensuite par ce qui multiplie.",
      schema: tableauInverses,
    },
    {
      titre: "Vérifier",
      micros: ["equation_verifier"],
      texte:
        "On remplace $x$ par la valeur trouvée dans l'équation de DÉPART, et on calcule les deux membres séparément. S'ils donnent le même nombre, c'est gagné. Ce contrôle prend dix secondes et ne se saute jamais.",
      schema: tableauEssais,
    },
  ],
  usages: [
    {
      titre: "J'ai pensé à un nombre",
      micros: ["equation_probleme"],
      detail:
        "« J'ajoute 5 et j'obtiens 17 » : on pose $x + 5 = 17$, on soustrait 5, et le nombre est 12. Le plus dur n'est pas de résoudre — c'est d'écrire l'équation.",
      schema: barreInconnue({ width: 228, total: "17", connu: "5", phrase: "x + 5 = 17" }),
    },
    {
      titre: "Une parenthèse : deux chemins",
      micros: ["equation_resoudre_distributivite"],
      detail:
        "$2(x + 3) = 14$ se résout de deux façons : diviser les deux côtés par 2, ou développer d'abord. Les deux donnent 4 ; diviser est plus court.",
      schema: tableauDeuxChemins,
    },
    {
      titre: "Au marché de Saint-Pierre",
      micros: ["equation_probleme"],
      detail:
        "Des mangues à 3 € l'unité, 21 € payés : $3x = 21$, donc $x = 7$. Une division qu'on faisait déjà en CM2 — l'équation ne fait que lui donner son nom.",
      schema: calculMangues,
    },
  ],
  exemples: [
    {
      titre: "Résoudre une équation simple",
      micros: ["equation_resoudre_simple"],
      donnees: "On veut résoudre $3x = 15$.",
      question: "Quelle est la solution ?",
      schema: tableauInverses,
      solution:
        "Le 3 MULTIPLIE $x$ : on divise donc les deux membres par 3. À gauche, $3x \\div 3 = x$ ; à droite, $15 \\div 3 = 5$. La solution est $x = 5$. Vérification dans l'équation de départ : $3 \\times 5 = 15$. ✅ ⚠️ On ne soustrait pas 3 : cela reviendrait à croire que $3x$ signifie $3 + x$.",
    },
    {
      titre: "Une parenthèse, deux routes",
      micros: ["equation_resoudre_distributivite"],
      donnees: "On veut résoudre $2(x + 3) = 14$.",
      question: "Par où commencer ?",
      schema: tableauDeuxChemins,
      solution:
        "Deux débuts sont possibles, et les deux sont justes. ① Diviser les deux membres par 2 : $x + 3 = 7$, puis $x = 7 - 3 = 4$. ② Développer d'abord : $2x + 6 = 14$, puis $2x = 8$, puis $x = 4$. Le premier chemin est plus court parce qu'il fait disparaître la parenthèse d'un coup. Vérification : $2(4 + 3) = 2 \\times 7 = 14$. ✅",
    },
    {
      titre: "Léo a juste, et il a tort",
      micros: ["equation_defi", "equation_verifier"],
      donnees: "Léo dit : « dans $2x + 3 = 11$, $x = 4$ car $2 + 3 + 4 = 9$ ».",
      question: "A-t-il raison ?",
      schema: tableauEssais,
      solution:
        "Non — et pourtant $x = 4$ EST la bonne solution. C'est ce qui rend cet exemple précieux : Léo a additionné les trois nombres qu'il voyait, ce qui donne 9 et non 11, et il est tombé sur la bonne réponse par hasard. La vraie méthode : $2x + 3 = 11$, on soustrait 3 des deux côtés, $2x = 8$, on divise par 2, $x = 4$. Et on vérifie en REMPLAÇANT : $2 \\times 4 + 3 = 8 + 3 = 11$. ✅ ⭐ Trouver le bon nombre ne prouve pas qu'on a compris : c'est la vérification, pas la réponse, qui fait la différence.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Parmi $3x + 5$, $2 + 7 = 9$, $3x + 2 = 11$ et $5 - 2$, laquelle est une équation ?",
      correction:
        "$3x + 2 = 11$. C'est la seule qui possède à la fois un signe $=$ et une inconnue. ⚠️ $2 + 7 = 9$ est bien une égalité, mais tout y est connu : c'est un calcul, pas une équation.",
      micros: ["equation_reconnaitre"],
    },
    {
      question: "Traduire en équation : « le double de $x$ est égal à 14 ».",
      correction:
        "$2x = 14$. « Le double » signifie « deux fois », donc $2x$ ; « est égal à » donne le signe $=$. La solution est ensuite $x = 14 \\div 2 = 7$.",
      micros: ["equation_traduire"],
    },
    {
      question: "Résoudre : $2x + 3x = 15$.",
      correction:
        "On réduit d'abord : $2x + 3x = 5x$, donc $5x = 15$. On divise ensuite les deux membres par 5 : $x = 3$. Vérification : $2 \\times 3 + 3 \\times 3 = 6 + 9 = 15$. ✅",
      micros: ["equation_resoudre_reduction"],
    },
    {
      question: "Résoudre : $3(x - 1) = 12$.",
      correction:
        "En divisant les deux membres par 3 : $x - 1 = 4$, donc $x = 4 + 1 = 5$. (En développant d'abord, on obtient $3x - 3 = 12$, puis $3x = 15$, puis $x = 5$ — même résultat.) Vérification : $3(5 - 1) = 3 \\times 4 = 12$. ✅",
      micros: ["equation_resoudre_distributivite"],
    },
    {
      question: "Le nombre 0 est-il solution de l'équation $3x = 0$ ?",
      correction:
        "Oui. En remplaçant : $3 \\times 0 = 0$, l'égalité est vraie. ⚠️ Zéro est un nombre comme les autres, et il peut parfaitement être la solution d'une équation — il n'y a pas de raison de l'écarter.",
      micros: ["equation_verifier"],
    },
    {
      question: "Un élève dit : « $5x = 8$ donc $x = 3$ ». Explique pourquoi c'est faux.",
      correction:
        "Il a soustrait 5 au lieu de diviser par 5. Or $5x$ signifie « 5 fois $x$ », pas « 5 plus $x$ » : pour isoler $x$, il faut faire l'opération inverse de la multiplication, donc $x = 8 \\div 5 = 1{,}6$. Vérification : $5 \\times 3 = 15$, et non 8 — sa réponse ne passe pas le test.",
      micros: ["equation_defi"],
    },
    {
      question: "J'ai pensé à un nombre. Si j'ajoute 5, j'obtiens 17. Quel est ce nombre ?",
      correction:
        "On appelle $x$ le nombre cherché, ce qui donne l'équation $x + 5 = 17$. On soustrait 5 des deux côtés : $x = 12$. Vérification : $12 + 5 = 17$. ✅",
      micros: ["equation_probleme"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

// ⛔ AUCUN LATEX DANS LES DIAPOS : `ModeClasse.tsx` n'a pas de rendu KaTeX, et le
// code serait projeté en clair au tableau devant la classe.
export const slidesEquations4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Équations - 4e",
    section: {
      type: "objectif",
      phrase: "Le résultat est donné, c'est un nombre qui manque",
      sousPhrase:
        "Une équation est une égalité qui contient une inconnue. La résoudre, c'est trouver la valeur qui rend l'égalité vraie.",
      encadre: {
        titre: "L'idée",
        texte: "On fait toujours la même opération des deux côtés — sinon l'équilibre est cassé.",
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
          "Au marché de Saint-Pierre : des mangues à 3 € l'unité, 21 € payés, combien de mangues ? C'est 3x = 21. Personne ne l'écrit ainsi, et tout le monde divise.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le signe = n'a que cinq siècles : inventé en 1557 par le Gallois Robert Recorde, fatigué d'écrire « est égal à ». Il a choisi deux traits parallèles de même longueur — deux choses ne peuvent pas être plus égales que ça.",
      },
    },
  },
  {
    titre: "La règle d'or",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "Une solution se vérifie, elle ne se croit pas",
      sousPhrase:
        "Léo dit : « dans 2x + 3 = 11, x = 4 car 2 + 3 + 4 = 9 ». Sa réponse est bonne. Son raisonnement est faux — et 2 + 3 + 4 fait 9, pas 11.",
      encadre: {
        titre: "Le test",
        texte: "Remplace x par ta réponse dans l'équation de départ : 2 × 4 + 3 = 11. C'est ça, vérifier.",
      },
    },
  },
  {
    titre: "L'opération et son inverse",
    badge: "3 repères",
    section: {
      type: "cartes",
      cartes: [
        { titre: "x + 4 = 9", texte: "On ajoute 4 à x, donc on soustrait 4 des deux côtés : x = 5." },
        { titre: "x − 3 = 8", texte: "On retire 3, donc on ajoute 3 des deux côtés : x = 11." },
        { titre: "3x = 15", texte: "On multiplie par 3, donc on DIVISE par 3 : x = 5. Jamais soustraire." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheEquations4e.methode.map((m) => ({
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
      cartes: ficheEquations4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Deux routes",
    section: {
      type: "exemple",
      enonce: "On veut résoudre 2(x + 3) = 14.",
      question: "Par où commencer ?",
      correction:
        "En divisant par 2 : x + 3 = 7, donc x = 4. En développant : 2x + 6 = 14, donc 2x = 8, donc x = 4. Même solution.",
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
      enonce: "Le nombre 0 est-il solution de 3x = 0 ?",
      question: "Oui ou non ?",
      indice: "Remplace x par 0 et calcule.",
      correction: "Oui : 3 × 0 = 0, l'égalité est vraie. Zéro est un nombre comme les autres.",
    },
  },
];
