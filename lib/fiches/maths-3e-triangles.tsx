// ─── Fiche de cours : les triangles (3e) ──────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/triangles.bank.ts, notionId `triangle_figure`, 49 items).
//
// ⭐⭐ LE RECOUVREMENT A ÉTÉ MESURÉ SUR TROIS CLASSES, PAS UNE. La leçon de la
// fiche de proportionnalité — comparer une notion à son seul homonyme de 4e ne
// suffit pas — vaut ici doublement, puisque les triangles reviennent chaque
// année. Résultat, micro par micro :
//     triangle_reconnaitre  déjà en 5e
//     triangle_inegalite    déjà en 5e ET en 4e
//     triangle_construire   déjà en 5e ET en 4e
//     triangle_defi         déjà en 5e ET en 4e
//     triangle_angle        ⭐ NI EN 5e NI EN 4e — la seule vraiment neuve
// 👉 Et `maths-5e-triangles.tsx` existe : elle enseigne les familles et
// l'inégalité triangulaire, avec `schema_barre` pour cette dernière — le même
// choix que celui qu'on ferait ici. Refaire ce cours n'apporterait rien.
//
// ⭐⭐ D'OÙ L'ANGLE DE CETTE FICHE, QUI EST UNE SYNTHÈSE ET NON UN RAPPEL : LES
// ANGLES DÉCIDENT DE L'EXISTENCE D'UN TRIANGLE, AUTANT QUE LES LONGUEURS. La 5e
// a donné un critère d'existence portant sur les côtés — le plus grand doit
// rester inférieur à la somme des deux autres. La 3e en donne un second,
// portant sur les angles : leur somme vaut exactement $180^\circ$, ce qui
// interdit d'emblée $100^\circ$, $50^\circ$ et $40^\circ$. Deux verrous, un sur
// chaque grandeur, et la fiche les met face à face.
//
// ⭐ LES 49 ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE — la règle du 31/08 :
//   triangle_reconnaitre → isocèle, équilatéral, rectangle, et leur emboîtement
//   triangle_angle       → la somme à 180°, et ⛔ le piège des 360°
//   triangle_inegalite   → le plus grand côté, et ⛔ le cas d'égalité qui aplatit
//   triangle_construire  → quelles données suffisent, et lesquelles se contredisent
//   triangle_defi        → deux angles égaux donnent deux côtés égaux
//
// ⛔ QUATRE FAUSSES AFFIRMATIONS DE LA BANQUE, RECOPIÉES DANS LES PIÈGES :
//     « la somme des angles vaut 360° »
//     « deux côtés égaux, donc équilatéral »
//     « si le plus grand côté ÉGALE la somme des deux autres, le triangle
//        existe » — il est alors aplati, donc il n'existe pas
//     un triangle à deux angles droits
//
// ⚠️ `schema_barre` EST EMPLOYÉ POUR L'INÉGALITÉ TRIANGULAIRE, ET C'EST
// LÉGITIME : ses trois parts sont des LONGUEURS, donc de même nature, et leurs
// proportions disent la vérité. Le même canvas rendait un dessin FAUX dans
// `maths-3e-calcul-litteral.tsx`, où il mêlait un terme en x et une constante.
//
// ⚠️ Les libellés des dessins sont en écriture simple : ils sont tracés en
// <text> SVG, où du LaTeX s'afficherait en clair.

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

// ⚠️ Aucun emplacement de fiche ne dépasse 225 px à 375, ni 300 px à 1280 —
// mesuré par `scripts/mesurer-largeurs-blocs.mjs`.
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

type Pts = {
  A: { x: number; y: number };
  B: { x: number; y: number };
  C: { x: number; y: number };
};

/**
 * Un triangle coté, avec son codage.
 * ⚠️ Le cadre vaut 280 et non 222 : les coordonnées ci-dessous sont reprises de
 * `maths-5e-triangles.tsx`, où elles ont déjà été mesurées, et le canvas place
 * ses étiquettes d'angle à l'INTÉRIEUR — un cadre trop étroit les tasse.
 */
const triangle = (
  points: Pts,
  opts: {
    labels?: Record<string, string>;
    angleLabels?: Record<string, string>;
    sideLabels?: Record<string, string>;
    showAngles?: boolean;
    rightAngleAt?: string;
    equalSides?: Array<[string, string]>;
    equalAngles?: Array<[string, string]>;
  } = {}
) => (
  <CanvasRenderer
    figure={
      {
        kind: "triangle",
        size: { width: 280, height: 220 },
        points,
        display: {
          showPoints: true,
          showLabels: true,
          showSides: true,
          showAngles: opts.showAngles ?? false,
        },
        labels: opts.labels ?? { A: "A", B: "B", C: "C" },
        angleLabels: opts.angleLabels,
        sideLabels: opts.sideLabels,
        marks: {
          rightAngleAt: opts.rightAngleAt,
          equalSides: opts.equalSides,
          equalAngles: opts.equalAngles,
        },
      } as never
    }
  />
);

// ⛔ LES POINTS SONT REPRIS DE , MAIS DEUX ONT DU ETRE
// RENTRES — mesure du 03/09/2026. Ils sont en coordonnees ABSOLUES dans un cadre
// de 280 x 220, et le canvas pose l etiquette d un sommet A COTE de lui :
//   · le C de l isocele etait a x = 260, son etiquette sortait par la DROITE ;
//   · le C de l equilateral etait a y = 17, son etiquette sortait par le HAUT.
// ⚠️ Elargir le cadre a 310 corrigeait le debordement mais faisait tomber la
// police finale a 11,5 px, pour un plancher de 11 : le bloc ne fait que 225 px,
// donc plus le cadre est grand, plus le dessin est reduit. On rentre donc les
// POINTS, pas le cadre.
//
// ⭐⭐ ET LA CONTRAINTE SE CALCULE, elle ne se devine pas. TriangleCanvas pose
// l etiquette d angle du sommet C en (C.x + 10 ; C.y + 14), derriere un
// cartouche blanc de 34 px de large qui demarre 4 px avant. Le bord droit du
// cartouche tombe donc en C.x + 40 :
//        C.x + 40 <= 280   soit   C.x <= 240
// Les triangles rectangle et isocele avaient leur C a 245 et 248 : leurs
// « 55° » et « 70° » sortaient du cadre de cinq et huit pixels. Deux mesures
// avant de trouver la regle, une ligne d arithmetique apres.
// ⚠️ Le sommet B est symetrique — son etiquette part en x - 24 — et le sommet A
// n a pas de contrainte a droite. C est donc le seul a surveiller.
const P_QUELCONQUE: Pts = { A: { x: 40, y: 180 }, B: { x: 245, y: 180 }, C: { x: 150, y: 40 } };
const P_ISOCELE: Pts = { A: { x: 40, y: 180 }, B: { x: 138, y: 45 }, C: { x: 235, y: 180 } };
const P_RECTANGLE: Pts = { A: { x: 45, y: 180 }, B: { x: 45, y: 55 }, C: { x: 235, y: 180 } };
const P_EQUILATERAL: Pts = { A: { x: 48, y: 185 }, B: { x: 238, y: 185 }, C: { x: 143, y: 40 } };

export const ficheTriangles3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "triangle-figure",
  titre: "Les triangles : angles, familles et existence",
  accroche:
    "On ne peut pas dessiner n'importe quel triangle. Trois longueurs peuvent se refuser à en former un, et trois angles aussi — mais pour des raisons différentes, et ce sont deux verrous indépendants. La cinquième vous a donné le premier, qui porte sur les côtés. La troisième donne le second, qui porte sur les angles : leur somme vaut exactement $180^\\circ$, jamais autre chose.",
  identite: [
    { label: "La règle des angles", valeur: "$\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$, toujours" },
    { label: "La règle des côtés", valeur: "Le plus grand côté reste INFÉRIEUR à la somme des deux autres" },
    { label: "Le piège", valeur: "Un triangle équilatéral EST isocèle — les familles s'emboîtent" },
  ],
  definition: {
    texte:
      "Un triangle est une figure à trois sommets et trois côtés. Deux conditions gouvernent son existence, et il faut les distinguer. Sur les ANGLES : la somme des trois mesures vaut toujours $180^\\circ$, ce qui interdit par exemple $100^\\circ$, $50^\\circ$ et $40^\\circ$. Sur les CÔTÉS : la plus grande longueur doit rester STRICTEMENT inférieure à la somme des deux autres, ce qui interdit $3$ cm, $4$ cm et $7$ cm. Un triangle qui vérifie l'une mais pas l'autre n'existe pas davantage.",
  },
  figure: {
    schema: triangle(P_QUELCONQUE, {
      showAngles: true,
      angleLabels: { A: "60°", B: "70°", C: "50°" },
    }),
    legende:
      "Trois angles quelconques, mais dont la somme fait toujours $180^\\circ$ : ici $60 + 70 + 50$. Connaître deux d'entre eux suffit donc à trouver le troisième.",
  },
  proprietes: [
    {
      titre: "La somme des angles vaut toujours $180^\\circ$",
      texte:
        "Quelle que soit sa forme, un triangle a trois angles dont la somme fait exactement $180^\\circ$. C'est le résultat le plus utile du chapitre, car il permet de trouver le troisième angle dès qu'on connaît les deux autres : si $\\widehat{A} = 55^\\circ$ et $\\widehat{B} = 70^\\circ$, alors $\\widehat{C} = 180 - 55 - 70 = 55^\\circ$. ⛔ Répondre $360^\\circ$ confond avec le tour complet, ou avec la somme des angles d'un quadrilatère.",
      schema: legende(
        triangle(P_QUELCONQUE, {
          showAngles: true,
          angleLabels: { A: "55°", B: "70°", C: "?" },
        }),
        "Deux angles connus, le troisième s'en déduit : $180 - 55 - 70 = 55^\\circ$."
      ),
      micros: ["triangle_angle"],
    },
    {
      titre: "Dans un triangle rectangle, les deux aigus font $90^\\circ$",
      texte:
        "L'angle droit occupe déjà $90^\\circ$ des $180^\\circ$ disponibles : il ne reste donc que $90^\\circ$ à partager entre les deux autres. Si l'un mesure $35^\\circ$, l'autre vaut nécessairement $55^\\circ$. ⛔ Cela interdit aussi qu'un triangle possède DEUX angles droits : la somme atteindrait $180^\\circ$ à elle seule, et il ne resterait rien pour le troisième sommet.",
      schema: legende(
        triangle(P_RECTANGLE, {
          showAngles: true,
          rightAngleAt: "A",
          angleLabels: { B: "35°", C: "55°" },
        }),
        "$90 + 35 + 55 = 180$ : les deux angles aigus se partagent ce qui reste."
      ),
      micros: ["triangle_angle", "triangle_reconnaitre"],
    },
    {
      titre: "Dans un isocèle, les angles à la base sont égaux",
      texte:
        "Un triangle isocèle possède deux côtés de même longueur, et ses deux angles à la base sont alors égaux. La réciproque est vraie également : deux angles égaux entraînent deux côtés égaux. Si l'angle au sommet mesure $40^\\circ$, il reste $140^\\circ$ à partager en deux parts identiques, soit $70^\\circ$ chacune.",
      schema: legende(
        triangle(P_ISOCELE, {
          showAngles: true,
          angleLabels: { B: "40°", A: "70°", C: "70°" },
          equalSides: [
            ["AB", "BC"],
          ],
          equalAngles: [["A", "C"]],
        }),
        "Sommet à $40^\\circ$ : les deux angles à la base valent $(180-40) \\div 2 = 70^\\circ$."
      ),
      micros: ["triangle_angle", "triangle_defi"],
    },
    {
      titre: "L'équilatéral a trois angles de $60^\\circ$",
      texte:
        "Ses trois côtés sont égaux, donc ses trois angles aussi : chacun vaut $180 \\div 3 = 60^\\circ$. ⚠️ Et un triangle équilatéral EST un triangle isocèle — il en possède la propriété, avec deux côtés égaux, et même davantage. Les familles s'emboîtent au lieu de s'exclure, ce qui est le contraire de ce que suggère le langage courant.",
      schema: legende(
        triangle(P_EQUILATERAL, {
          showAngles: true,
          angleLabels: { A: "60°", B: "60°", C: "60°" },
          equalSides: [
            ["AB", "BC"],
            ["BC", "CA"],
          ],
        }),
        "Trois côtés égaux, trois angles de $60^\\circ$ : $3 \\times 60 = 180$."
      ),
      micros: ["triangle_reconnaitre"],
    },
    {
      titre: "Les familles s'emboîtent, elles ne s'opposent pas",
      texte:
        "« Isocèle » signifie AU MOINS deux côtés égaux : tout équilatéral est donc isocèle. En revanche, un triangle à deux côtés égaux n'est pas forcément équilatéral — il lui manquerait le troisième. Un triangle peut d'ailleurs cumuler deux qualités : rectangle ET isocèle, si son angle droit sépare deux côtés de même longueur.",
      schema: legende(
        tableau({
          headers: ["famille", "ce qu'elle exige"],
          rows: [
            { values: ["isocèle", "au moins 2 côtés égaux"] },
            { values: ["équilatéral", "les 3 — donc isocèle"] },
            { values: ["rectangle", "un angle droit"] },
          ],
          highlight: { row: 1 },
          caption: "l'équilatéral est un isocèle",
        }),
        "Un triangle peut appartenir à plusieurs familles à la fois."
      ),
      micros: ["triangle_reconnaitre"],
    },
    {
      titre: "Le second verrou : l'inégalité triangulaire",
      texte:
        "Trois longueurs ne forment un triangle que si la plus grande est STRICTEMENT inférieure à la somme des deux autres. Avec $3$, $4$ et $7$, la somme des deux petites vaut exactement $7$ : les deux côtés se posent bout à bout sur le troisième sans laisser aucune hauteur, et la figure est APLATIE. ⛔ Le cas d'égalité ne donne donc pas un triangle, contrairement à ce que l'on croit souvent.",
      schema: legende(
        <CanvasRenderer
          figure={
            {
              kind: "schema_barre",
              size: { width: 222, height: 190 },
              title: "3 + 4 contre 7",
              total: "7",
              parts: [
                { label: "3 cm", value: "3" },
                { label: "4 cm", value: "4" },
              ],
              questionLabel: "juste egal : aplati",
            } as never
          }
        />,
        "Les deux petits côtés couvrent exactement le grand : il ne reste pas de hauteur."
      ),
      micros: ["triangle_inegalite"],
    },
    {
      titre: "Deux verrous indépendants",
      texte:
        "Les deux conditions ne se remplacent pas. Des angles de $100^\\circ$, $50^\\circ$ et $40^\\circ$ sont refusés par la règle des angles, puisqu'ils totalisent $190^\\circ$. Des côtés de $2$, $3$ et $10$ cm sont refusés par celle des longueurs. Vérifier l'une ne dispense jamais de l'autre : c'est la donnée fournie par l'énoncé qui indique laquelle appliquer.",
      schema: legende(
        tableau({
          headers: ["on donne", "on vérifie"],
          rows: [
            { values: ["trois angles", "somme = 180°"] },
            { values: ["trois côtés", "le grand < somme"] },
            { values: ["100°, 50°, 40°", "190° : refusé"] },
          ],
          highlight: { row: 2 },
          caption: "un verrou par grandeur",
        }),
        "La règle à appliquer dépend de ce que l'énoncé donne."
      ),
      micros: ["triangle_construire", "triangle_inegalite"],
    },
    {
      titre: "Quelles données déterminent un triangle unique",
      texte:
        "Les trois longueurs des côtés en déterminent un seul, à la position près. Deux côtés et l'angle entre eux également. ⚠️ En revanche, connaître les trois ANGLES ne suffit pas : tous les triangles équilatéraux ont les mêmes angles sans avoir la même taille. Les angles fixent la FORME, les longueurs fixent la taille.",
      schema: legende(
        tableau({
          headers: ["données", "triangle unique ?"],
          rows: [
            { values: ["3 côtés", "oui"] },
            { values: ["2 côtés + l'angle entre", "oui"] },
            { values: ["3 angles", "non : la taille manque"] },
          ],
          highlight: { row: 2 },
          caption: "les angles donnent la forme",
        }),
        "Deux triangles de mêmes angles se ressemblent, sans être superposables."
      ),
      micros: ["triangle_construire"],
    },
  ],
  reel: {
    texte:
      "Le triangle est la seule figure qui ne se déforme pas : un quadrilatère articulé s'affaisse en losange, un triangle ne bouge pas. C'est pourquoi on en trouve partout dès qu'il faut tenir — les fermes de charpente d'une case créole, les pylônes électriques qui longent la route des Tamarins, les échafaudages, les ponts. La raison est exactement le contenu de cette fiche : trois longueurs déterminent un triangle unique, alors que quatre longueurs laissent un quadrilatère libre de se déformer. La rigidité d'une structure n'est pas une propriété du métal, c'est une propriété de la géométrie.",
  },
  historique: {
    texte:
      "Que la somme des angles d'un triangle vaille $180^\\circ$ figure dans les Éléments d'Euclide, vers 300 avant notre ère, et sa démonstration repose entièrement sur le postulat des parallèles. Ce détail est devenu fondamental bien plus tard : au XIXᵉ siècle, Lobatchevski et Bolyai construisent des géométries cohérentes où ce postulat est faux — et où la somme des angles d'un triangle vaut MOINS de $180^\\circ$. Sur une sphère, à l'inverse, elle vaut davantage : un triangle tracé entre le pôle Nord et deux points de l'équateur peut avoir trois angles droits, donc $270^\\circ$. La règle apprise ici est donc vraie du plan, et seulement de lui.",
  },
  formule: {
    contexte: "La somme des angles d'un triangle",
    expression: "\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ",
    legende:
      "Elle sert dans les deux sens. De gauche à droite pour VÉRIFIER qu'un triplet d'angles est possible ; de droite à gauche pour TROUVER un angle manquant, en retranchant les deux connus de $180$.",
    schema: legende(
      tableau(
        {
          headers: ["cas", "le troisième angle"],
          rows: [
            { values: ["55° et 70°", "55°"] },
            { values: ["90° et 35°", "55°"] },
            { values: ["100° et 50°", "30°"] },
          ],
          caption: "180 moins les deux connus",
        },
        "formule"
      ),
      "Une soustraction suffit — encore faut-il partir de $180$ et non de $360$."
    ),
  },
  methode: [
    {
      titre: "Trouver un angle manquant",
      texte:
        "On additionne les deux angles connus, puis on retranche le total de $180^\\circ$. Contrôle immédiat : les trois angles obtenus doivent redonner $180$, et aucun ne peut être nul ou négatif.",
      micros: ["triangle_angle"],
    },
    {
      titre: "Reconnaître la nature d'un triangle",
      texte:
        "On regarde d'abord les côtés : trois égaux, c'est équilatéral ; deux égaux, isocèle. Puis les angles : un angle droit, c'est rectangle. ⚠️ Et l'on n'oublie pas qu'un triangle peut cumuler deux natures.",
      micros: ["triangle_reconnaitre"],
    },
    {
      titre: "Tester si trois longueurs conviennent",
      texte:
        "On repère la PLUS GRANDE, on additionne les deux autres, et on compare. Strictement inférieure : le triangle existe. Égale ou supérieure : il n'existe pas. Tester les trois combinaisons est inutile — seule la plus grande peut poser problème.",
      micros: ["triangle_inegalite"],
    },
    {
      titre: "Tester si trois angles conviennent",
      texte:
        "On les additionne : le total doit valoir exactement $180^\\circ$. Ni plus, ni moins. C'est un test différent du précédent, et l'énoncé indique lequel appliquer selon qu'il donne des degrés ou des centimètres.",
      micros: ["triangle_construire"],
    },
    {
      titre: "Dans un isocèle, partager ce qui reste",
      texte:
        "Si l'angle au sommet est connu, on le retranche de $180$ puis on divise par deux. Si c'est un angle à la base qui est connu, on le double avant de retrancher. Les deux chemins se contrôlent : la somme doit toujours retomber sur $180$.",
      micros: ["triangle_angle"],
    },
  ],
  usages: [
    {
      titre: "On me donne deux angles",
      detail: "Je retranche leur somme de $180^\\circ$ pour obtenir le troisième.",
      micros: ["triangle_angle"],
    },
    {
      titre: "On me donne trois longueurs",
      detail:
        "Je compare la plus grande à la somme des deux autres. Strictement inférieure : le triangle est constructible.",
      micros: ["triangle_inegalite"],
    },
    {
      titre: "On me donne trois angles",
      detail:
        "Je vérifie que la somme vaut $180^\\circ$. Si oui, la FORME est déterminée — mais pas la taille.",
      micros: ["triangle_construire"],
    },
    {
      titre: "On me demande la nature du triangle",
      detail:
        "Je regarde les côtés, puis les angles, et je n'exclus pas qu'il appartienne à deux familles.",
      micros: ["triangle_reconnaitre"],
    },
    {
      titre: "Le triangle est isocèle et on me donne un angle",
      detail:
        "Je repère si c'est l'angle au sommet ou un angle à la base, puis je partage les $180^\\circ$ en conséquence.",
      micros: ["triangle_angle", "triangle_defi"],
    },
  ],
  exemples: [
    {
      titre: "Le troisième angle",
      donnees: "Dans un triangle $ABC$, $\\widehat{A} = 55^\\circ$ et $\\widehat{B} = 70^\\circ$.",
      question: "Combien mesure $\\widehat{C}$ ?",
      solution:
        "La somme des trois angles vaut $180^\\circ$. On additionne d'abord les deux connus : $55 + 70 = 125$. On retranche ensuite de $180$ : $\\widehat{C} = 180 - 125 = 55^\\circ$. Contrôle : $55 + 70 + 55 = 180$. C'est juste. On remarque au passage que deux angles sont égaux — le triangle est donc isocèle, ce que l'énoncé ne disait pas.",
      micros: ["triangle_angle", "triangle_reconnaitre"],
    },
    {
      titre: "Trois longueurs impossibles",
      donnees: "On veut un triangle de côtés $3$ cm, $4$ cm et $7$ cm.",
      question: "Est-il constructible ?",
      solution:
        "Le plus grand côté mesure $7$ cm. La somme des deux autres vaut $3 + 4 = 7$ cm. Or l'inégalité triangulaire exige que le plus grand soit STRICTEMENT inférieur à cette somme : ici il lui est égal. Le triangle n'est donc pas constructible — en posant les deux petits côtés bout à bout, on recouvre exactement le grand, sans dégager la moindre hauteur, et la figure est aplatie. ⛔ C'est le cas que l'on croit le plus souvent acceptable, précisément parce qu'il semble « tout juste » possible.",
      schema: legende(
        tableau(
          {
            headers: ["côtés", "3 + 4", "verdict"],
            rows: [
              { values: ["3, 4, 7", "= 7", "aplati"] },
              { values: ["3, 4, 6", "> 6", "possible"] },
              { values: ["3, 4, 8", "< 8", "impossible"] },
            ],
            highlight: { row: 0 },
            caption: "il faut STRICTEMENT inférieur",
          },
          "exemple"
        ),
        "Un seul centimètre sépare le possible de l'impossible."
      ),
      micros: ["triangle_inegalite"],
    },
    {
      titre: "L'isocèle et son sommet",
      donnees: "Un triangle isocèle a un angle au sommet de $40^\\circ$.",
      question: "Combien mesure chacun des angles à la base ?",
      solution:
        "L'angle au sommet occupe $40^\\circ$ sur les $180^\\circ$ disponibles. Il en reste donc $180 - 40 = 140^\\circ$ à partager entre les deux angles à la base, qui sont ÉGAUX puisque le triangle est isocèle. Chacun vaut $140 \\div 2 = 70^\\circ$. Contrôle : $40 + 70 + 70 = 180$. ⚠️ L'erreur consiste à diviser $180$ par deux au lieu de $140$ — c'est-à-dire à oublier de retirer d'abord l'angle au sommet.",
      micros: ["triangle_angle"],
    },
    {
      titre: "Trois angles refusés",
      donnees: "On voudrait un triangle dont les angles mesurent $100^\\circ$, $50^\\circ$ et $40^\\circ$.",
      question: "Est-ce possible ?",
      solution:
        "On additionne : $100 + 50 + 40 = 190^\\circ$. Or la somme doit valoir exactement $180^\\circ$. Le triangle est donc impossible, et il l'est pour une raison qui n'a rien à voir avec les longueurs — aucune valeur de côtés ne pourrait rattraper ce dépassement. C'est là tout l'intérêt d'avoir DEUX critères d'existence : celui-ci se prononce sur des degrés, sans qu'aucune longueur soit fournie.",
      micros: ["triangle_construire", "triangle_angle"],
    },
  ],
  pieges: [
    "Croire que la somme des angles vaut $360^\\circ$. C'est $180^\\circ$ — $360^\\circ$ est le tour complet, ou la somme des angles d'un quadrilatère.",
    "Croire qu'un triangle à deux côtés égaux est forcément équilatéral. Il est isocèle ; l'équilatéral en exige trois.",
    "Croire qu'un équilatéral n'est pas isocèle. « Isocèle » demande AU MOINS deux côtés égaux : l'équilatéral en a trois, donc il l'est.",
    "Accepter un triangle dont le plus grand côté ÉGALE la somme des deux autres. Il est aplati, donc il n'existe pas : l'inégalité doit être stricte.",
    "Imaginer un triangle à deux angles droits. Ils totaliseraient déjà $180^\\circ$, et il ne resterait rien pour le troisième sommet.",
    "Diviser $180$ par deux pour trouver les angles à la base d'un isocèle. Il faut d'abord retrancher l'angle au sommet.",
    "Croire que trois angles déterminent un triangle unique. Ils en fixent la forme, jamais la taille.",
  ],
  aRetenir: [
    "$\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$ dans tout triangle du plan.",
    "Dans un triangle rectangle, les deux angles aigus totalisent $90^\\circ$.",
    "Dans un isocèle, les deux angles à la base sont égaux.",
    "Chaque angle d'un triangle équilatéral mesure $60^\\circ$.",
    "Le plus grand côté doit être STRICTEMENT inférieur à la somme des deux autres.",
    "Angles et longueurs sont deux verrous indépendants : vérifier l'un ne dispense pas de l'autre.",
  ],
  entrainement: [
    {
      question: "Dans un triangle, deux angles mesurent $48^\\circ$ et $62^\\circ$. Combien mesure le troisième ?",
      correction:
        "$48 + 62 = 110$, puis $180 - 110 = 70^\\circ$. Contrôle : $48 + 62 + 70 = 180$.",
      micros: ["triangle_angle"],
    },
    {
      question: "Un élève affirme que la somme des angles d'un triangle vaut $360^\\circ$. A-t-il raison ?",
      correction:
        "Non, elle vaut $180^\\circ$. Il confond sans doute avec le tour complet, ou avec la somme des angles d'un quadrilatère, qui vaut bien $360^\\circ$.",
      micros: ["triangle_angle"],
    },
    {
      question: "Dans un triangle rectangle, un angle aigu mesure $35^\\circ$. Combien mesure l'autre ?",
      correction:
        "L'angle droit occupe $90^\\circ$, il reste donc $90^\\circ$ pour les deux aigus : l'autre vaut $90 - 35 = 55^\\circ$.",
      micros: ["triangle_angle"],
    },
    {
      question: "Un triangle peut-il avoir deux angles droits ?",
      correction:
        "Non. Deux angles droits totalisent déjà $180^\\circ$, et il ne resterait rien pour le troisième angle, qui ne peut pas être nul.",
      micros: ["triangle_angle", "triangle_construire"],
    },
    {
      question: "Un triangle équilatéral est-il aussi isocèle ?",
      correction:
        "Oui. « Isocèle » signifie avoir au moins deux côtés de même longueur ; l'équilatéral en a trois, donc il satisfait la condition — et même davantage.",
      micros: ["triangle_reconnaitre"],
    },
    {
      question: "Combien mesure chaque angle d'un triangle équilatéral ?",
      correction:
        "$180 \\div 3 = 60^\\circ$. Les trois côtés étant égaux, les trois angles le sont aussi.",
      micros: ["triangle_reconnaitre", "triangle_angle"],
    },
    {
      question: "Peut-on construire un triangle de côtés $2$ cm, $3$ cm et $10$ cm ?",
      correction:
        "Non. Le plus grand côté mesure $10$ cm, et la somme des deux autres vaut $2 + 3 = 5$ cm, ce qui est bien inférieur à $10$. Les deux petits côtés ne se rejoignent jamais.",
      micros: ["triangle_inegalite"],
    },
    {
      question:
        "Un élève dit : « Si le plus grand côté est égal à la somme des deux autres, le triangle existe. » A-t-il raison ?",
      correction:
        "Non. Dans ce cas la figure est aplatie : les deux petits côtés se posent exactement sur le grand, sans dégager de hauteur. L'inégalité doit être STRICTE.",
      micros: ["triangle_inegalite"],
    },
    {
      question: "Dans un triangle isocèle, l'angle au sommet mesure $50^\\circ$. Combien mesure chaque angle à la base ?",
      correction:
        "Il reste $180 - 50 = 130^\\circ$ à partager en deux parts égales : chacune vaut $65^\\circ$. Contrôle : $50 + 65 + 65 = 180$.",
      micros: ["triangle_angle"],
    },
    {
      question:
        "Un élève dit : « Si un triangle a deux angles égaux, alors il a deux côtés égaux. » A-t-il raison ?",
      correction:
        "Oui. C'est la réciproque de la propriété de l'isocèle, et elle est vraie : deux angles égaux entraînent deux côtés égaux, donc le triangle est isocèle.",
      micros: ["triangle_defi", "triangle_reconnaitre"],
    },
  ],
  coachHref: "/coach?matiere=maths&classe=3e&notion=triangle_figure",
};

// ─── Mode classe ───────────────────────────────────────────────────────────────
// ⛔ AUCUN LaTeX DANS CES DIAPOSITIVES. `ModeClasse` ne rend pas KaTeX : une
// formule écrite entre dollars s'afficherait EN CLAIR sur le tableau de la
// classe, code compris. Tout s'écrit donc en toutes lettres.

export const slidesTriangles3e: ClasseSlide[] = [
  {
    titre: "On ne dessine pas n'importe quel triangle",
    badge: "Ce qu'on va comprendre",
    section: {
      type: "objectif",
      phrase: "Trois longueurs peuvent se refuser à en former un",
      sousPhrase:
        "Et trois angles aussi — mais pour une autre raison. Ce sont deux verrous indépendants, l'un sur les côtés, l'autre sur les angles.",
      encadre: {
        titre: "Ce qui s'ajoute cette année",
        texte:
          "La cinquième a donné le verrou des longueurs. La troisième donne celui des angles : leur somme vaut exactement cent quatre-vingts degrés, jamais autre chose.",
      },
    },
  },
  {
    titre: "Cent quatre-vingts degrés, toujours",
    badge: "La règle centrale",
    teinte: "essentiel",
    section: {
      type: "objectif",
      phrase: "Quelle que soit la forme du triangle",
      sousPhrase:
        "Aplati, allongé, régulier : la somme de ses trois angles fait toujours cent quatre-vingts degrés. C'est le résultat le plus utile du chapitre.",
      encadre: {
        titre: "À quoi ça sert immédiatement",
        texte:
          "Deux angles connus suffisent à trouver le troisième : on additionne les deux, et on retranche de cent quatre-vingts.",
      },
    },
  },
  {
    titre: "L'erreur numéro un",
    badge: "Attention",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on entend souvent",
        contenu:
          "La somme des angles d'un triangle vaut trois cent soixante degrés.",
      },
      droite: {
        variante: "ok",
        titre: "Ce qui est vrai",
        contenu:
          "Cent quatre-vingts. Trois cent soixante, c'est le tour complet — et c'est aussi la somme des angles d'un quadrilatère, ce qui explique la confusion.",
      },
    },
  },
  {
    titre: "Trois conséquences immédiates",
    badge: "Ce que la règle entraîne",
    teinte: "essentiel",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Le triangle rectangle",
          texte:
            "L'angle droit prend quatre-vingt-dix degrés. Il en reste quatre-vingt-dix pour les deux angles aigus, qui se les partagent.",
        },
        {
          titre: "Le triangle isocèle",
          texte:
            "On retranche l'angle au sommet de cent quatre-vingts, puis on partage le reste en deux parts égales.",
        },
        {
          titre: "Le triangle équilatéral",
          texte:
            "Trois angles égaux, donc cent quatre-vingts divisé par trois : soixante degrés chacun.",
        },
      ],
    },
  },
  {
    titre: "Les familles s'emboîtent",
    badge: "Le vocabulaire",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on croit",
        contenu:
          "Un triangle est SOIT isocèle, SOIT équilatéral. Les deux mots s'excluraient, comme dans le langage courant.",
      },
      droite: {
        variante: "ok",
        titre: "Ce qui est vrai",
        contenu:
          "Isocèle veut dire AU MOINS deux côtés égaux. Un équilatéral en a trois : il est donc isocèle, et même davantage. Un triangle peut aussi être rectangle ET isocèle à la fois.",
      },
    },
  },
  {
    titre: "Le second verrou",
    badge: "L'inégalité triangulaire",
    section: {
      type: "etapes",
      etapes: [
        "Je repère la PLUS GRANDE des trois longueurs.",
        "J'additionne les deux autres.",
        "Si la plus grande est STRICTEMENT inférieure à cette somme, le triangle existe.",
        "Si elle lui est égale, la figure est aplatie : les deux petits côtés se posent exactement sur le grand, sans dégager de hauteur. Ce n'est pas un triangle.",
      ],
    },
  },
  {
    titre: "Deux verrous, deux grandeurs",
    badge: "Ne pas les confondre",
    teinte: "essentiel",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Sur les angles",
        contenu:
          "Cent degrés, cinquante et quarante font cent quatre-vingt-dix : refusé, sans qu'aucune longueur ne soit en cause.",
      },
      droite: {
        variante: "info",
        titre: "Sur les longueurs",
        contenu:
          "Deux, trois et dix centimètres : refusé aussi, mais pour une autre raison. Vérifier un verrou ne dispense jamais de l'autre.",
      },
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    teinte: "exemple",
    section: {
      type: "exemple",
      enonce: "Un triangle isocèle a un angle au sommet de quarante degrés.",
      question: "Combien mesure chacun des angles à la base ?",
      correction:
        "L'angle au sommet occupe quarante degrés sur les cent quatre-vingts disponibles. Il en reste donc cent quarante à partager. Et comme le triangle est isocèle, ses deux angles à la base sont ÉGAUX : chacun vaut cent quarante divisé par deux, soit soixante-dix degrés. On contrôle : quarante plus soixante-dix plus soixante-dix font bien cent quatre-vingts. L'erreur classique est de diviser cent quatre-vingts par deux — c'est-à-dire d'oublier de retirer d'abord l'angle au sommet.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    teinte: "exercice",
    section: {
      type: "exercice",
      enonce: "On voudrait construire un triangle dont les côtés mesurent trois, quatre et sept centimètres.",
      question: "Est-ce possible ?",
      indice: "Comparez la plus grande longueur à la somme des deux autres.",
      correction:
        "La plus grande longueur vaut sept centimètres. La somme des deux autres vaut trois plus quatre, soit sept également. Or la règle exige que la plus grande soit STRICTEMENT inférieure à cette somme — pas égale. Le triangle n'est donc pas constructible. Et l'on peut se le représenter : en posant bout à bout les côtés de trois et de quatre centimètres, on recouvre exactement les sept centimètres du troisième, sans dégager la moindre hauteur. La figure est aplatie. C'est précisément le cas qu'on croit acceptable, parce qu'il semble tout juste possible.",
    },
  },
];
