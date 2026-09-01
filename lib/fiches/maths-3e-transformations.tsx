// ─── Fiche de cours : les transformations et l'homothétie (3e) ─────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/transformations.bank.ts, notionId sym_transformation).
//
// ⭐⭐ CETTE FICHE A FAIT NAITRE UN CANVAS. L'homothétie n'avait JAMAIS été
// dessinée sur le site. `TransformationCanvas` acceptait pourtant
// `transformation: "homothetie"` depuis toujours — mais il se contentait d'en
// écrire le nom en titre et de poser un point orange au centre : aucune des
// droites (OA), (OB), (OC). Or l'alignement de O, A et A' EST la notion. Le
// catalogue le signalait depuis le début, ligne 44 : « transformation — ⛔ pas
// pour un agrandissement ». D'où `lib/canvas/HomothetieCanvas.tsx`, où l'image
// est CALCULÉE à partir du centre et du rapport, jamais saisie à la main.
//
// ⭐⭐ LE BO INTERDIT LA DÉFINITION PONCTUELLE, ET ÇA CHANGE TOUTE LA FICHE.
// Texte du cycle 4, mot pour mot : « Les définitions ponctuelles d'une
// rotation, d'une translation, d'une homothétie ne figurent pas au programme. »
// ⛔ On n'écrit donc NULLE PART « A' est le point tel que vecteur OA' = k·OA ».
// ⭐ En revanche le « protocole de construction » EST au programme, nommément.
// La fiche montre donc l'EFFET sur une figure et la CONSTRUCTION, et jamais la
// définition. C'est aussi pourquoi le rapport négatif n'y est pas : ni le BO ni
// aucun des 40 énoncés de la banque ne l'emploient. (Le canvas, lui, le sait
// dessiner — le jour où le programme le demandera.)
//
// ⭐ LES MICROS ONT ÉTÉ LUES AVANT D'ÉCRIRE. Les six, et tous les nombres de la
// fiche sortent de la banque :
//   sym_symetrie_translation_rotation → le miroir, le glissement, le tour
//   sym_homothetie_reconnaitre        → O, A et A' alignés ; k = 3 agrandit
//   sym_homothetie_construire         → OA = 3 → OA' = 6 ; OA = 8, k = 1/2 → 4
//   sym_homothetie_rapport            → OA = 4 et OA' = 12 → k = 3 ; 10 → 5
//   sym_transformation_effet          → longueurs ×k, aires ×k², volumes ×k³
//   sym_transformation_defi           → le logo de club agrandi de rapport 2
//
// ⭐ LA CONTINUITÉ VERTICALE, mesurée dans les banques :
//   CE2 → CM2  la symétrie axiale, au quadrillage et au pliage
//   6e         la symétrie axiale se construit et se justifie
//   5e         la symétrie centrale
//   4e         la translation, et la rotation
//   3e         l'homothétie — LA SEULE qui change les longueurs
// 👉 C'est le fil de la fiche : quatre transformations qui conservent les
// longueurs, puis une cinquième qui ne les conserve pas.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut donc porter du LaTeX. Les
 * libellés À L'INTÉRIEUR du dessin restent en écriture simple — ils sont
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
// Le canvas d'homothétie calcule sa taille à partir de `cellSize` et du
// quadrillage : c'est donc la TAILLE DE CASE qu'on ajuste, pour que le dessin
// tombe pile sur la largeur du bloc et que les étiquettes gardent leurs 13 px.
const CASE = { carte: 20, formule: 19, exemple: 18 } as const;

const homothetie = (
  data: Record<string, unknown>,
  bloc: keyof typeof CASE = "carte"
) => (
  <CanvasRenderer
    figure={
      {
        kind: "homothetie",
        grid: { rows: 9, cols: 9 },
        size: { cellSize: CASE[bloc], padding: 14 },
        ...data,
      } as never
    }
  />
);

const tableau = (
  data: Record<string, unknown>,
  bloc: keyof typeof CASE = "carte"
) => (
  <CanvasRenderer
    figure={{ kind: "tableau_donnees", display: { compact: bloc !== "carte" }, ...data } as never}
  />
);

// Le triangle qui sert de figure de départ partout : trois sommets sur des
// nœuds du quadrillage, pour que l'image tombe elle aussi sur des nœuds quand
// le rapport est entier — un dessin dont les points sont « entre deux cases »
// ne se recopie pas sur le cahier.
// ⛔ LES COORDONNÉES SE CALCULENT, ELLES NE SE DEVINENT PAS. Premier jet :
// centre en (1,7) et triangle en y = 1..4 — avec k = 2, l'image partait à
// y = −3, hors du cadre, et les droites ne se voyaient plus. La contrainte est
// simple : l'image O + k·(P − O) doit rester dans le quadrillage. Avec O en
// (0,0) et k = 2, il faut donc que la figure tienne dans la moitié du cadre.
// 👉 Le centre est mis dans un COIN : les droites s'ouvrent alors en éventail
// sur toute la largeur, et l'alignement se lit d'un coup d'œil.
const TRIANGLE = [
  { x: 1, y: 1, label: "A" },
  { x: 3, y: 1, label: "B" },
  { x: 1, y: 3, label: "C" },
];
const CENTRE = { x: 0, y: 0, label: "O" };

export const ficheTransformations3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  // ⚠️ Le champ `notion` est l'identifiant du coach avec des TIRETS : le
  // registre construit sa clé avec `notionId.replace(/_/g, "-")`.
  notion: "sym-transformation",
  titre: "Transformations et homothétie",
  accroche:
    "Depuis le CE2, toutes les transformations rencontrées déplaçaient la figure sans jamais la changer de taille : le miroir, le demi-tour, le glissement, la rotation. L'homothétie est la première qui agrandit ou qui réduit — et c'est aussi la seule où l'aire ne suit pas les longueurs.",
  identite: [
    { label: "Prérequis", valeur: "Symétries, translation, rotation ; proportionnalité" },
    { label: "L'idée clé", valeur: "O, A et A' alignés, et toujours le même rapport" },
    { label: "Outil", valeur: "Règle, compas, quadrillage" },
  ],
  definition: {
    texte:
      "Une homothétie agrandit ou réduit une figure à partir d'un point fixe appelé le centre, noté O. Chaque point A de la figure a une image A' située sur la droite (OA), et toutes les longueurs partant de O sont multipliées par un même nombre k, appelé le rapport. Si k est plus grand que 1 la figure grandit, s'il est compris entre 0 et 1 elle rétrécit. La figure image a exactement la même forme que la figure de départ : seuls les angles sont conservés, pas les longueurs.",
  },
  figure: {
    schema: legende(
      homothetie({
        centre: CENTRE,
        rapport: 2,
        source: { points: TRIANGLE, label: "ABC" },
        display: { showInfo: true },
      }),
      "Les trois droites partent de $O$ : $A'$ est sur $(OA)$, deux fois plus loin",
    ),
    legende:
      "Le triangle rouge est l'image du bleu par l'homothétie de centre O et de rapport 2. Chaque sommet est resté sur sa droite.",
  },
  proprietes: [
    {
      titre: "Quatre transformations ne changent pas les longueurs",
      texte:
        "La symétrie axiale (le miroir), la symétrie centrale (le demi-tour), la translation (le glissement) et la rotation (le tour autour d'un point) déplacent la figure sans la déformer. Longueurs, angles et aires sont conservés : la figure image est superposable à la figure de départ.",
      micros: ["sym_symetrie_translation_rotation"],
      schema: tableau({
        headers: ["transformation", "ce qu'elle fait"],
        rows: [
          { values: ["symétrie axiale", "un miroir"] },
          { values: ["symétrie centrale", "un demi-tour"] },
          { values: ["translation", "un glissement"] },
          { values: ["rotation", "un tour autour d'un point"] },
        ],
        caption: "les quatre conservent les longueurs",
      }),
    },
    {
      titre: "L'homothétie, elle, change la taille",
      texte:
        "C'est la nouveauté de la troisième, et la seule transformation du collège qui ne conserve pas les longueurs. La figure garde sa forme — un carré reste un carré, un angle droit reste droit — mais elle change de taille. On dit que la figure image est un AGRANDISSEMENT ou une RÉDUCTION de la figure de départ.",
      micros: ["sym_homothetie_reconnaitre"],
      schema: legende(
        homothetie({
          centre: CENTRE,
          rapport: 2,
          source: { points: TRIANGLE, label: "ABC" },
        }),
        "même forme, taille doublée",
      ),
    },
    {
      titre: "O, A et A' sont toujours alignés",
      texte:
        "C'est ce qui permet de RECONNAITRE une homothétie sur une figure : on trace les droites qui relient chaque point à son image, et elles se coupent toutes en un même point. Ce point est le centre O. Si les droites ne se croisent pas au même endroit, ce n'est pas une homothétie.",
      micros: ["sym_homothetie_reconnaitre"],
      schema: legende(
        homothetie({
          centre: CENTRE,
          rapport: 2,
          source: { points: TRIANGLE, label: "ABC" },
        }),
        "les trois droites se coupent en $O$",
      ),
    },
    {
      titre: "Un rapport plus grand que 1 agrandit",
      texte:
        "Si k est plus grand que 1, la figure image est plus grande que la figure de départ. Avec k = 3, une longueur de 7 cm devient 21 cm : toutes les longueurs sont multipliées par 3.",
      micros: ["sym_homothetie_reconnaitre", "sym_homothetie_rapport"],
      schema: legende(
        homothetie({
          centre: CENTRE,
          rapport: 3,
          source: {
            points: [
              { x: 1, y: 1, label: "A" },
              { x: 3, y: 1, label: "B" },
              { x: 1, y: 2, label: "C" },
            ],
          },
        }),
        "$k = 3$ : la figure triple",
      ),
    },
    {
      titre: "Un rapport entre 0 et 1 réduit",
      texte:
        "Si k est compris entre 0 et 1, la figure image est plus petite. Avec k = 1/2, un segment de 8 cm devient 4 cm. Attention : le rapport reste un multiplicateur, même quand il réduit — on multiplie par 1/2, on ne soustrait rien.",
      micros: ["sym_homothetie_construire"],
      schema: legende(
        homothetie({
          centre: CENTRE,
          rapport: 0.5,
          source: {
            points: [
              { x: 2, y: 2, label: "A" },
              { x: 8, y: 2, label: "B" },
              { x: 2, y: 8, label: "C" },
            ],
          },
        }),
        "$k = \\dfrac{1}{2}$ : la figure est réduite de moitié",
      ),
    },
    {
      titre: "Le rapport se lit sur deux longueurs",
      texte:
        "Pour trouver k, on divise une longueur de l'image par la longueur correspondante du départ. Si OA = 4 cm et OA' = 12 cm, alors k = 12 : 4 = 3. Si OA = 10 cm et OA' = 5 cm, alors k = 5 : 10 = 1/2. Le rapport est un QUOTIENT, jamais une différence.",
      micros: ["sym_homothetie_rapport"],
      schema: tableau({
        headers: ["OA", "OA'", "k"],
        rows: [
          { values: ["4 cm", "12 cm", "3"] },
          { values: ["10 cm", "5 cm", "1/2"] },
          { values: ["3 cm", "6 cm", "2"] },
        ],
        highlight: { col: 2 },
        caption: "on divise l'image par le départ",
      }),
    },
    {
      titre: "Les aires ne suivent pas les longueurs",
      texte:
        "C'est le piège le plus fréquent du chapitre. Une homothétie de rapport k multiplie les longueurs par k, mais les AIRES par k au carré, et les VOLUMES par k au cube. Avec k = 3, les longueurs triplent et l'aire est multipliée par 9. Avec k = 2, les volumes sont multipliés par 8.",
      micros: ["sym_transformation_effet"],
      schema: tableau({
        headers: ["k", "longueurs", "aires", "volumes"],
        rows: [
          { values: ["2", "× 2", "× 4", "× 8"] },
          { values: ["3", "× 3", "× 9", "× 27"] },
        ],
        highlight: { col: 2 },
        caption: "× k, × k², × k³",
      }),
    },
  ],
  reel: {
    texte:
      "L'homothétie, c'est le zoom. Agrandir une photo sur un écran, imprimer un plan à l'échelle, projeter un cours au tableau : à chaque fois, un point fixe et un rapport. C'est aussi la raison pour laquelle une part de pizza deux fois plus longue ne contient pas deux fois plus de garniture, mais quatre fois plus — l'aire suit le carré du rapport. Le même calcul décide du prix d'une bâche, du volume d'une cuve à eau agrandie, ou de ce que coûte vraiment un logo imprimé deux fois plus grand.",
  },
  historique: {
    texte:
      "Le mot vient du grec « homos » (semblable) et « thesis » (position) : des figures semblablement placées. L'idée est bien plus vieille que le mot — Thalès l'utilisait déjà pour mesurer la hauteur d'une pyramide par son ombre, six siècles avant notre ère. Elle est formalisée au XVIIe siècle par Girard Desargues, un architecte lyonnais dont les travaux sur la perspective sont d'abord passés inaperçus, avant de fonder toute une branche de la géométrie.",
  },
  formule: {
    contexte: "L'effet d'un rapport k",
    expression: "$\\text{longueurs} \\times k \\quad \\text{aires} \\times k^2 \\quad \\text{volumes} \\times k^3$",
    legende:
      "k = 2 : longueurs doublées, aire × 4, volume × 8  ·  k = 3 : longueurs × 3, aire × 9, volume × 27",
    schema: legende(
      homothetie(
        {
          centre: CENTRE,
          rapport: 2,
          source: {
            points: [
              { x: 1, y: 1, label: "A" },
              { x: 4, y: 1, label: "B" },
              { x: 1, y: 4, label: "C" },
            ],
          },
        },
        "formule",
      ),
      "côtés doublés, mais quatre triangles tiennent dans le grand",
    ),
  },
  methode: [
    {
      titre: "Reconnaitre une homothétie",
      texte:
        "On relie chaque point à son image et on prolonge. Si toutes les droites se coupent en un seul point, c'est une homothétie, et ce point est le centre. Si la figure a changé de taille sans changer de forme, c'est un indice de plus.",
      micros: ["sym_homothetie_reconnaitre"],
    },
    {
      titre: "Construire l'image d'un point",
      texte:
        "On trace d'abord la DROITE (OA) — c'est la première étape, et l'oublier est l'erreur classique. On reporte ensuite la longueur : OA' = k × OA, mesurée depuis O, sur cette droite. Un point à la bonne distance mais hors de la droite n'est pas l'image.",
      micros: ["sym_homothetie_construire"],
      schema: legende(
        homothetie({
          centre: CENTRE,
          rapport: 2,
          source: { points: TRIANGLE, label: "ABC" },
        }),
        "d'abord la droite, ensuite la longueur",
      ),
    },
    {
      titre: "Construire l'image d'une figure",
      texte:
        "On construit l'image de chaque sommet, un par un, puis on relie les images dans le même ordre. Trois sommets suffisent pour un triangle : les côtés se tracent après.",
      micros: ["sym_homothetie_construire"],
    },
    {
      titre: "Calculer le rapport",
      texte:
        "On divise une longueur de l'image par la longueur correspondante de départ : k = OA' : OA. On vérifie sur une seconde paire de points — le même rapport doit revenir.",
      micros: ["sym_homothetie_rapport"],
    },
  ],
  usages: [
    {
      titre: "On cherche une longueur de l'image",
      detail:
        "On multiplie la longueur de départ par k. Avec k = 2 et OA = 3 cm, on obtient OA' = 6 cm.",
      micros: ["sym_homothetie_construire"],
    },
    {
      titre: "On cherche le rapport",
      detail:
        "On divise : k = OA' : OA. Avec OA = 4 cm et OA' = 12 cm, k = 3.",
      micros: ["sym_homothetie_rapport"],
    },
    {
      titre: "On cherche une aire ou un volume",
      detail:
        "On multiplie l'aire par k au carré, le volume par k au cube — surtout pas par k.",
      micros: ["sym_transformation_effet"],
    },
  ],
  exemples: [
    {
      titre: "Trouver une longueur image",
      donnees: "Homothétie de centre O et de rapport 2. On sait que OA = 3 cm.",
      question: "Combien vaut OA' ?",
      solution:
        "Le rapport multiplie les longueurs issues de O. On calcule OA' = 2 × 3 = 6 cm. Le point A' est sur la droite (OA), à 6 cm de O.",
      micros: ["sym_homothetie_construire"],
      schema: legende(
        homothetie(
          {
            centre: CENTRE,
            rapport: 2,
            source: { points: TRIANGLE, label: "ABC" },
          },
          "exemple",
        ),
        "$OA' = 2 \\times OA$",
      ),
    },
    {
      titre: "Une réduction",
      donnees: "Homothétie de centre O et de rapport 1/2. On sait que OA = 8 cm.",
      question: "Combien vaut OA' ?",
      solution:
        "On multiplie, même pour réduire : OA' = 1/2 × 8 = 4 cm. La figure image est deux fois plus petite, et A' est entre O et A.",
      micros: ["sym_homothetie_construire"],
    },
    {
      titre: "Retrouver le rapport",
      donnees: "Homothétie de centre O. On mesure OA = 4 cm et OA' = 12 cm.",
      question: "Quel est le rapport k ?",
      solution:
        "Le rapport est un quotient : k = OA' : OA = 12 : 4 = 3. La figure a été agrandie trois fois.",
      micros: ["sym_homothetie_rapport"],
      schema: tableau(
        {
          headers: ["OA", "OA'", "k = OA' : OA"],
          rows: [{ values: ["4 cm", "12 cm", "3"] }],
          highlight: { col: 2 },
        },
        "exemple",
      ),
    },
    {
      titre: "Le logo du club",
      donnees:
        "À La Réunion, un logo de club est agrandi par homothétie de rapport 2. Une longueur du logo mesure 6 cm au départ.",
      question: "Quelle sera cette longueur sur le logo agrandi, et que devient son aire ?",
      solution:
        "La longueur devient 2 × 6 = 12 cm. L'aire, elle, est multipliée par 2 au carré, donc par 4 : le logo agrandi occupe quatre fois plus de place sur le maillot, pas deux.",
      micros: ["sym_transformation_defi", "sym_transformation_effet"],
    },
  ],
  pieges: [
    "Placer A' à la bonne distance de O mais PAS sur la droite (OA) : la construction est fausse. La droite se trace en premier.",
    "Croire qu'une homothétie de rapport 3 multiplie les aires par 3 : elle les multiplie par 9. Les aires suivent k au carré.",
    "Croire qu'une homothétie de rapport 2 multiplie les volumes par 4 : c'est par 8. Les volumes suivent k au cube.",
    "Calculer le rapport en soustrayant : avec OA = 3 cm et OA' = 9 cm, k n'est pas 9 + 3 ni 9 − 3, mais 9 : 3 = 3.",
    "Oublier qu'une homothétie conserve les ANGLES : la figure change de taille, jamais de forme.",
  ],
  aRetenir: [
    "Symétries, translation et rotation conservent les longueurs ; l'homothétie est la seule qui les change.",
    "Dans une homothétie de centre O, les points O, A et A' sont toujours alignés.",
    "Le rapport est un quotient : k = OA' : OA.",
    "Longueurs × k, aires × k², volumes × k³.",
    "La forme et les angles sont conservés, quelle que soit la valeur de k.",
  ],
  entrainement: [
    {
      question:
        "Une homothétie de centre O et de rapport 4 transforme un segment de 7 cm. Quelle est la longueur de son image ?",
      correction: "On multiplie par le rapport : 4 × 7 = 28 cm.",
      micros: ["sym_homothetie_rapport"],
    },
    {
      question:
        "Par une homothétie de centre O, on mesure OA = 10 cm et OA' = 5 cm. Quel est le rapport ?",
      correction:
        "k = OA' : OA = 5 : 10 = 1/2. Le rapport est plus petit que 1 : c'est une réduction.",
      micros: ["sym_homothetie_rapport"],
    },
    {
      question:
        "Un élève affirme qu'une homothétie de rapport 3 multiplie l'aire d'une figure par 3. A-t-il raison ?",
      correction:
        "Non. Les longueurs sont multipliées par 3, mais l'aire par 3 au carré, soit 9. Une figure trois fois plus longue et trois fois plus large occupe neuf fois la place.",
      micros: ["sym_transformation_effet"],
    },
    {
      question:
        "Comment reconnaitre, sur une figure, que le passage de ABC à A'B'C' est une homothétie ?",
      correction:
        "On trace les droites (AA'), (BB') et (CC'). Si elles se coupent toutes en un même point, c'est une homothétie, et ce point est son centre O.",
      micros: ["sym_homothetie_reconnaitre"],
    },
    {
      question:
        "Une cuve est agrandie par homothétie de rapport 2. Par combien son volume est-il multiplié ?",
      correction:
        "Par 2 au cube, soit 8. Une cuve deux fois plus haute, deux fois plus longue et deux fois plus large contient huit fois plus d'eau.",
      micros: ["sym_transformation_effet"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=3e",
};

export const slidesTransformations3e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Transformations - 3e",
    section: {
      type: "objectif",
      phrase: "La première transformation qui change la taille",
      sousPhrase:
        "Le miroir, le demi-tour, le glissement, la rotation : depuis le CE2, aucune ne changeait la taille de la figure. L'homothétie, si.",
      encadre: {
        titre: "Les deux choses à savoir",
        texte:
          "Un centre O, et un rapport k. Le centre ne bouge pas, et toutes les longueurs qui en partent sont multipliées par k.",
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
          "L'homothétie, c'est le zoom. Agrandir une photo, imprimer un plan à l'échelle, projeter au tableau. Et c'est aussi pourquoi une part de pizza deux fois plus longue ne porte pas deux fois plus de garniture, mais quatre fois plus.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le mot vient du grec « homos », semblable, et « thesis », position. Mais l'idée a six siècles avant notre ère : Thalès mesurait déjà la hauteur d'une pyramide par la longueur de son ombre.",
      },
    },
  },
  {
    titre: "Reconnaitre une homothétie",
    badge: "La méthode",
    section: {
      type: "etapes",
      etapes: [
        "Relier chaque point à son image : on trace (AA'), (BB'), (CC'), et on prolonge.",
        "Chercher le point commun : si les trois droites se coupent en un seul point, c'est une homothétie, et ce point est le centre O.",
        "Mesurer le rapport : on divise une longueur de l'image par celle du départ.",
      ],
    },
  },
  {
    titre: "Le piège des aires",
    badge: "À ne pas rater",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce que l'on croit",
        contenu:
          "Rapport 3 : la figure est trois fois plus grande, donc l'aire est multipliée par trois.",
      },
      droite: {
        variante: "info",
        titre: "Ce qui se passe",
        contenu:
          "Trois fois plus longue ET trois fois plus large : neuf fois plus de place. Les longueurs suivent k, les aires k au carré, les volumes k au cube.",
      },
    },
  },
];
