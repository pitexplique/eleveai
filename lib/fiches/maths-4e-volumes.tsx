// ─── Fiche de cours : les volumes (4e) ────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/volumes.bank.ts, notionId volume_solide).
//
// ⭐ TROISIÈME ET DERNIÈRE FICHE DE GRANDEURS : périmètre → aire → volume. Et
// elle referme l'escalier commencé deux fiches plus tôt. Une longueur se mesure
// avec un segment et s'écrit en cm ; une aire avec un carré, en cm² ; un volume
// avec un CUBE, en cm³. La première propriété met les trois côte à côte, parce
// que c'est la seule façon de faire voir qu'il s'agit d'une progression et non
// de trois chapitres sans rapport.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE (règle de Frédéric,
// 26/08). Ce que la banque travaille vraiment :
//   volume_comprendre  → « que mesure un volume ? » → LA PLACE OCCUPÉE PAR UN
//        SOLIDE ; « pour mesurer un volume, on choisit comme unité… » → UN CUBE ;
//        une boîte de 4 rangées de 3 cubes sur 2 étages → 24 ; ⭐ et « un solide
//        de 5 cubes qu'on démonte et range autrement » → le volume NE CHANGE PAS.
//   volume_lien_aire   → ⭐ LA FORMULE QUI UNIFIE TOUT : « Volume = aire de base
//        × hauteur ». L'aire de base est celle de la face SUR LAQUELLE LE SOLIDE
//        REPOSE. Et le sens inverse : volume et hauteur connus → aire de base.
//   volume_pave        → 4 × 3 × 5 → 60 ; cube d'arête 3 → 27 ; d'arête 10 → 1000.
//   volume_prisme      → aire de base 18, hauteur 7 → 126 ; base triangulaire
//        d'aire 12, hauteur 5 → 60 ; triangle rectangle de côtés 3 et 4 (aire 6)
//        et hauteur 10 → 60.
//   volume_cylindre    → l'aire de base est un disque, donc $\pi r^2$ ;
//        25π et hauteur 4 → 100π ; 9π et hauteur 2 → 18π.
//   volume_unite       → cm³ ; 1 dm³ = 1 000 cm³ ; et 1 L = 1 dm³.
//   volume_defi        → ⚠️ le nom ne dit pas le contenu, et ce qu'il cache est
//        remarquable (voir ci-dessous). Plus une réserve d'eau à La Réunion.
// Tous les nombres de la fiche sortent de cette liste, sans exception.
//
// ⭐⭐ LES TROIS ERREURS DE LA BANQUE RACONTENT L'ESCALIER, ET C'EST LE FIL DE LA
// FICHE. Mises bout à bout, elles disent toutes « je me suis arrêté une marche
// trop tôt » :
//   ① « 5 + 4 + 3 = 12 cm³ »  → il a ADDITIONNÉ des longueurs. Il est resté au
//      périmètre, alors qu'on lui demandait un volume.
//   ② « 4 × 3 = 12 cm³ »      → il a calculé l'AIRE de la base et s'est arrêté
//      là. Il a oublié de monter d'un étage.
//   ③ « périmètre de la base × hauteur » → il a pris le TOUR de la base au lieu
//      de sa SURFACE. Encore une marche ratée, mais plus bas.
// Une seule idée les corrige toutes les trois : le volume se calcule à partir de
// l'AIRE de la base, jamais de son contour, et il faut ensuite multiplier par la
// hauteur. Le dernier exemple de la fiche les range dans un seul tableau.
//
// ⛔⛔ `solide_3d` NE SE LAISSE PAS RÉTRÉCIR — LA RÈGLE LA PLUS DURE DU CATALOGUE.
// Ses sommets sont des CONSTANTES en pixels (la face avant va de x = 82 à 222,
// les petits cubes partent de l'origine fixe (160, 170) au pas de 32). Réduire
// `size.width` ne met pas le dessin à l'échelle : ça le ROGNE, en silence, sans
// faire baisser la police et sans rien casser. La seule commande est donc la
// POLICE — et elle a déjà été portée à 19 le 24/08 précisément pour survivre
// dans une carte. AUCUN `size` N'EST DONC PASSÉ ICI : on garde le 340 par
// défaut, et c'est la carte qui met le SVG entier à l'échelle. Dans une carte de
// 222 px cela donne 19 × 222/340 = 12,4 px ; dans un bloc d'exemple de 200 px,
// 11,2 px. Juste au-dessus du seuil, et c'est voulu.
// ⚠️ Seul `assemblage_cubes` déroge : sa HAUTEUR se déduit toute seule de
// l'encombrement des cubes, sinon le bas du solide sortirait du cadre.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import type { CubeCell3D } from "@/lib/tutor-v4/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

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

/** Les cubes d'une boîte pleine de dimensions (nx, ny, nz). */
const boite = (nx: number, ny: number, nz: number): CubeCell3D[] =>
  Array.from({ length: nx }, (_, x) =>
    Array.from({ length: ny }, (_, y) =>
      Array.from({ length: nz }, (_, z) => ({ x, y, z }))
    ).flat()
  ).flat();

// ⭐ LE VOLUME QU'ON COMPTE AVANT DE LE CALCULER. Une boîte de 4 rangées de 3
// cubes, sur 2 étages : l'énoncé exact de la banque, et sa réponse est 24. Le
// canvas écrit lui-même « 24 cubes unités » sous le dessin.
// ⭐ Et ce dessin contient déjà la formule : 4 × 3 = 12 cubes par étage — c'est
// l'aire de la base —, puis 2 étages. 12 × 2 = 24. L'élève voit le « aire de
// base × hauteur » avant qu'on le lui écrive.
// ⛔ Aucun `size` : voir l'en-tête. La hauteur, elle, se déduit toute seule.
const assemblage = (
  <CanvasRenderer
    figure={{
      kind: "solide_3d",
      solide: "assemblage_cubes",
      cubes: boite(4, 3, 2),
      display: { showLabels: true },
    }}
  />
);

// LE PAVÉ DROIT, BASE EN ÉVIDENCE. `highlight.base` colore la face du dessous :
// c'est elle dont on calcule l'aire, et c'est de là que part tout le reste.
// 4, 3 et 5 sont les nombres du QCM de la banque — volume 60.
// ⚠️ RÉUTILISÉ AVEC D'AUTRES DIMENSIONS (la réserve d'eau) → une FONCTION qui
// prend ses mesures, jamais une constante recopiée.
//
// ⛔ ET SON LIBELLÉ DE BASE EST IMPOSÉ, PAS LAISSÉ AU DÉFAUT. Le composant écrit
// « base rectangulaire » (18 signes) au centre de la face du dessous, à x = 183,
// pendant que la cote de largeur est posée à x = 275 : les deux se touchaient,
// mesuré. `base 4 × 3` fait dix signes, s'arrête vers x = 235, et dit en plus
// quelque chose d'utile — de quoi l'aire de base est faite.
const pave = (opts: {
  longueur: string;
  largeur: string;
  hauteur: string;
  base: string;
}) => (
  <CanvasRenderer
    figure={{
      kind: "solide_3d",
      solide: "pave_droit",
      labels: {
        longueur: opts.longueur,
        largeur: opts.largeur,
        hauteur: opts.hauteur,
        aireBase: opts.base,
      },
      highlight: { base: true },
      display: { showLabels: true, showDimensions: true },
    }}
  />
);

// LE PRISME DROIT : LA BASE N'EST PLUS UN RECTANGLE, ET LA FORMULE NE BOUGE PAS.
// Aire de base 12 cm², hauteur 5 cm → 60 cm³, les nombres du QCM de la banque.
// C'est le dessin qui montre que « aire de base × hauteur » n'est pas une
// formule de plus : c'est LA formule, dont celle du pavé n'est qu'un cas.
const prisme = (
  <CanvasRenderer
    figure={{
      kind: "solide_3d",
      solide: "prisme",
      labels: { aireBase: "aire 12 cm²", hauteur: "5 cm" },
      highlight: { base: true },
      display: { showLabels: true, showDimensions: true },
    }}
  />
);

// LE CYLINDRE : MÊME FORMULE ENCORE, avec un disque pour base. Rayon 5 cm, donc
// aire de base 25π cm² ; hauteur 4 cm ; volume 100π cm³ — la banque, à la
// virgule près. On garde la forme aπ, comme elle le demande.
//
// ⛔ `showLabels: false`, ET C'EST LE SEUL RÉGLAGE POSSIBLE ICI. Le composant
// pose le libellé de base à (170 ; 198) et celui du rayon à (207 ; 178) : vingt
// pixels d'écart pour une police de 19 bordée d'un contour blanc de 3, donc ils
// se touchent QUEL QUE SOIT LE TEXTE — même « 25π » déborde encore. Les
// positions étant des constantes, on ne peut pas déplacer l'un des deux.
// ⭐ Ce que `showLabels` éteint, c'est UNIQUEMENT l'étiquette de base : les
// cotes du rayon et de la hauteur passent par `showDimensions`, et la face du
// dessous reste colorée par `highlight.base`. On ne perd donc que le texte, que
// la propriété écrit déjà — vérifié dans le code du canvas avant de l'éteindre.
const cylindre = (
  <CanvasRenderer
    figure={{
      kind: "solide_3d",
      solide: "cylindre",
      labels: { rayon: "5 cm", hauteur: "4 cm" },
      highlight: { base: true },
      display: { showLabels: false, showDimensions: true },
    }}
  />
);

// ⭐ L'ESCALIER DES TROIS GRANDEURS, ET IL REFERME LES TROIS FICHES. Une
// dimension, une unité, un instrument de mesure : le segment, le carré, le cube.
// C'est aussi la clé des trois erreurs de la banque — chacune consiste à
// s'arrêter sur une marche.
const escalierGrandeurs = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["la grandeur", "son unité", "on la mesure avec"],
      rows: [
        { values: ["une longueur", "cm", "un segment"] },
        { values: ["une aire", "cm²", "un carré"] },
        { values: ["un volume", "cm³", "un cube"] },
      ],
      highlight: { row: 2 },
      caption: "trois marches, et le petit chiffre dit laquelle",
      display: { compact: true, striped: true },
    }}
  />
);

// AIRE DE BASE × HAUTEUR, POSÉ. La base du pavé 4 × 3 vaut 12 cm² ; cinq étages
// de 12, cela fait 60. L'opération posée montre que le volume n'est PAS une
// troisième multiplication mystérieuse : c'est l'aire, empilée.
const calculVolume = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "multiplication",
      numbers: ["12", "5"],
      result: "60",
      display: { showResult: true, compact: true },
      questionLabel: "aire de base 12 cm² × hauteur 5 cm",
    }}
  />
);

// POURQUOI 1 dm³ FAIT 1 000 cm³, ET NON 10. Un décimètre cube est un cube de
// 10 cm d'arête : il y a 10 cm dans chaque direction, donc trois facteurs 10.
// C'est la même surprise qu'avec les m² — mais d'un cran plus fort.
const conversionUnite = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "multiplication",
      numbers: ["10", "10", "10"],
      result: "1000",
      display: { showResult: true, compact: true },
      questionLabel: "1 dm³ = 10 cm × 10 cm × 10 cm",
    }}
  />
);

// ⭐⭐ LES TROIS ERREURS DE LA BANQUE, RANGÉES DANS L'ORDRE DE L'ESCALIER. Chacune
// s'arrête une marche trop tôt, et la dernière colonne dit laquelle.
const tableauErreurs = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["l'élève écrit", "ce qu'il a calculé", "où il s'est arrêté"],
      rows: [
        { values: ["5 + 4 + 3 = 12", "une somme de longueurs", "sur les longueurs"] },
        { values: ["4 × 3 = 12", "l'aire de la base", "sur l'aire"] },
        { values: ["périmètre × hauteur", "le tour, pas la surface", "sur le contour"] },
      ],
      caption: "le pavé 4 × 3 × 5 vaut 60 cm³, et rien d'autre",
      display: { compact: true, striped: true },
    }}
  />
);

const pieges = [
  "Additionner au lieu de multiplier : un pavé de 5 cm, 4 cm et 3 cm n'a pas un volume de 5 + 4 + 3 = 12 cm³, mais de 5 × 4 × 3 = 60 cm³.",
  "S'arrêter à l'aire de la base : 4 × 3 = 12 donne la surface sur laquelle le solide repose, en cm². Il reste à multiplier par la hauteur pour obtenir le volume, en cm³.",
  "Prendre le PÉRIMÈTRE de la base au lieu de son AIRE : la formule est « aire de base × hauteur ». Le tour de la base ne dit rien de la place qu'elle occupe.",
];

const aRetenir = [
  "Le volume mesure la place qu'un solide occupe dans l'espace. On le compte en cubes unités et on l'exprime en cm³, dm³ ou m³.",
  "Une seule formule sert au pavé, au prisme et au cylindre : Volume = aire de base × hauteur. Seule change la façon de calculer l'aire de la base.",
  "Le volume ne dépend pas de la forme : un solide qu'on démonte et qu'on range autrement occupe toujours la même place.",
];

export const ficheVolumes4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "volume-solide",
  titre: "Les volumes",
  accroche:
    "Après la longueur d'un trait et la surface d'une figure, voici la place qu'un objet occupe dans l'espace. On la compte en cubes, et une seule formule suffit pour presque tous les solides du collège : l'aire de la base, multipliée par la hauteur. Tout le reste n'est qu'une façon différente de calculer cette base.",
  identite: [
    { label: "Le mot clé", valeur: "La place occupée dans l'espace" },
    { label: "Le geste", valeur: "Aire de base × hauteur" },
    { label: "La règle d'or", valeur: "Des cm³ : l'unité est un cube" },
  ],
  definition: {
    texte:
      "Le volume d'un solide est la mesure de la place qu'il occupe dans l'espace. Pour le mesurer, on choisit comme unité un CUBE — un cube d'un centimètre d'arête a un volume de $1\\ \\text{cm}^3$ — et le volume du solide est le nombre de tels cubes qu'il faudrait pour le remplir. ⚠️ Le volume ne dépend pas de la forme : si l'on démonte un solide de 5 cubes et qu'on les range autrement, le volume reste 5. C'est la place occupée qui compte, pas la façon dont elle est arrangée.",
  },
  figure: {
    schema: legende(
      assemblage,
      "4 rangées de 3 cubes, sur 2 étages"
    ),
    legende:
      "Chaque étage contient $4 \\times 3 = 12$ cubes — c'est exactement l'aire de la base. Il y a 2 étages, donc $12 \\times 2 = 24$ cubes en tout. La formule du cours est déjà dans ce dessin : aire de base × hauteur.",
  },
  proprietes: [
    {
      titre: "Trois grandeurs, trois unités",
      micros: ["volume_comprendre", "volume_unite"],
      texte:
        "Une longueur se mesure avec un segment et s'écrit en cm ; une aire avec un carré, en $\\text{cm}^2$ ; un volume avec un cube, en $\\text{cm}^3$. Le petit chiffre en haut dit combien de dimensions on a multipliées.",
      schema: escalierGrandeurs,
    },
    {
      titre: "Aire de base × hauteur",
      micros: ["volume_lien_aire"],
      texte:
        "L'aire de base est celle de la face sur laquelle le solide REPOSE — ici $4 \\times 3 = 12\\ \\text{cm}^2$. Le volume, c'est cette base empilée sur toute la hauteur : $12 \\times 5 = 60\\ \\text{cm}^3$.",
      schema: pave({ longueur: "4 cm", largeur: "3 cm", hauteur: "5 cm", base: "base 4 × 3" }),
    },
    {
      titre: "Le prisme ne change pas la règle",
      micros: ["volume_prisme"],
      texte:
        "Si la base est un triangle au lieu d'un rectangle, la formule ne bouge pas : on calcule l'aire de ce triangle, puis on multiplie par la hauteur. Aire 12, hauteur 5, volume $60\\ \\text{cm}^3$.",
      schema: prisme,
    },
    {
      titre: "Le cylindre non plus",
      micros: ["volume_cylindre"],
      texte:
        "La base d'un cylindre est un disque, dont l'aire vaut $\\pi \\times r^2$. Pour un rayon de 5 cm, cela fait $25\\pi\\ \\text{cm}^2$ ; avec une hauteur de 4 cm, le volume est $100\\pi\\ \\text{cm}^3$.",
      schema: cylindre,
    },
  ],
  reel: {
    texte:
      "Le volume, c'est ce qui rentre dedans. Une réserve d'eau en forme de pavé de 3 m sur 2 m et 2 m de haut contient $12\\ \\text{m}^3$, c'est-à-dire 12 000 litres — et à La Réunion, où la saison sèche compte, cette conversion-là n'est pas un exercice. C'est aussi le volume d'un colis qui fixe son prix d'expédition, celui d'un camion-toupie de béton, celui d'une piscine qu'on remplit, ou celui d'un moteur qu'on mesure en centimètres cubes. Un litre EST un décimètre cube : ce n'est pas une coïncidence, c'est la définition — et c'est pourquoi une bouteille d'un litre tient exactement dans un cube de 10 cm de côté.",
  },
  historique: {
    texte:
      "Le mot vient du latin « volumen », qui désignait un rouleau de papyrus — ce qu'on enroule. Il a longtemps voulu dire « livre » avant de désigner l'encombrement d'un objet, et il garde les deux sens en français. Quant à la mesure elle-même, la plus célèbre histoire est celle d'Archimède : chargé de vérifier si une couronne était en or pur sans la fondre, il aurait compris dans son bain que tout corps plongé dans l'eau en déplace exactement son propre volume. La méthode est encore la bonne aujourd'hui pour un objet de forme compliquée : on ne la calcule pas, on la mesure en la plongeant.",
  },
  formule: {
    contexte: "Une formule, trois solides",
    expression:
      "$V = \\text{aire de base} \\times \\text{hauteur}$   ·   pavé : $L \\times l \\times h$   ·   cylindre : $\\pi r^2 \\times h$",
    legende:
      "Les deux dernières ne sont que la première, avec la base calculée à la façon qui convient. ⚠️ Et c'est bien l'AIRE de la base, jamais son périmètre : un contour ne dit rien de la surface qu'il enferme.",
    // ⛔ Pas de schéma ici, et c'est réfléchi : le pavé avec sa base colorée, le
    // prisme et le cylindre sont juste au-dessus, et tous les trois montrent la
    // même formule sur trois bases différentes. Un quatrième dessin ne dirait
    // rien de neuf (Frédéric, 25/08).
  },
  methode: [
    {
      titre: "Trouver la base",
      micros: ["volume_lien_aire"],
      texte:
        "On repère la face sur laquelle le solide repose, et on calcule SON AIRE — rectangle, triangle ou disque, selon le cas. C'est l'étape où l'on utilise tout ce qu'on sait des aires.",
      schema: pave({ longueur: "4 cm", largeur: "3 cm", hauteur: "5 cm", base: "base 4 × 3" }),
    },
    {
      titre: "Multiplier par la hauteur",
      micros: ["volume_pave", "volume_prisme"],
      texte:
        "La hauteur dit combien de fois cette base s'empile. $12\\ \\text{cm}^2$ de base sur 5 cm de hauteur donnent $60\\ \\text{cm}^3$ — comme cinq étages de douze cubes.",
      schema: calculVolume,
    },
    {
      titre: "Vérifier l'unité",
      micros: ["volume_unite"],
      texte:
        "Un volume s'écrit toujours en unités cubes. Et les conversions vont de mille en mille : $1\\ \\text{dm}^3 = 1\\,000\\ \\text{cm}^3$, parce qu'un décimètre cube est un cube de 10 cm d'arête. Enfin, $1\\ \\text{L} = 1\\ \\text{dm}^3$.",
      schema: conversionUnite,
    },
  ],
  usages: [
    {
      titre: "Une réserve d'eau",
      micros: ["volume_defi", "volume_pave"],
      detail:
        "Un bac de 3 m sur 2 m et 2 m de haut contient $3 \\times 2 \\times 2 = 12\\ \\text{m}^3$. Comme $1\\ \\text{m}^3$ vaut 1 000 litres, cela fait 12 000 litres d'eau.",
      schema: pave({ longueur: "3 m", largeur: "2 m", hauteur: "2 m", base: "base 3 × 2" }),
    },
    {
      titre: "Des litres aux cubes",
      micros: ["volume_unite"],
      detail:
        "Un litre est exactement un décimètre cube, donc $1\\,000\\ \\text{cm}^3$. C'est pourquoi une bouteille d'un litre tient dans un cube de 10 cm de côté.",
      schema: conversionUnite,
    },
    {
      titre: "Un réservoir cylindrique",
      micros: ["volume_cylindre"],
      detail:
        "Une cuve ronde se calcule comme le reste : l'aire du disque du fond, multipliée par la hauteur. On garde souvent le résultat sous la forme $a\\pi$.",
      schema: cylindre,
    },
  ],
  exemples: [
    {
      titre: "Le volume d'un pavé droit",
      micros: ["volume_pave"],
      donnees: "Un pavé droit mesure 4 cm de longueur, 3 cm de largeur et 5 cm de hauteur.",
      question: "Quel est son volume ?",
      schema: pave({ longueur: "4 cm", largeur: "3 cm", hauteur: "5 cm", base: "base 4 × 3" }),
      solution:
        "L'aire de la base vaut $4 \\times 3 = 12\\ \\text{cm}^2$. On multiplie par la hauteur : $12 \\times 5 = 60\\ \\text{cm}^3$. On peut aussi écrire directement $L \\times l \\times h = 4 \\times 3 \\times 5 = 60$. ⚠️ Le résultat s'écrit en $\\text{cm}^3$ : trois longueurs multipliées donnent trois dimensions.",
    },
    {
      titre: "Un prisme à base triangulaire",
      micros: ["volume_prisme"],
      donnees: "Un prisme droit a une base triangulaire d'aire $12\\ \\text{cm}^2$ et une hauteur de 5 cm.",
      question: "Quel est son volume ?",
      schema: prisme,
      solution:
        "La formule est la même que pour le pavé : $V = \\text{aire de base} \\times \\text{hauteur} = 12 \\times 5 = 60\\ \\text{cm}^3$. ⭐ La base peut être n'importe quelle figure — triangle, trapèze, disque : seule la façon de calculer son aire change. Si l'énoncé donne le triangle par sa base et sa hauteur (par exemple 3 cm et 4 cm pour un triangle rectangle), on commence par $\\dfrac{3 \\times 4}{2} = 6\\ \\text{cm}^2$, puis on multiplie.",
    },
    {
      titre: "Les trois erreurs, et la marche ratée",
      micros: ["volume_defi", "volume_lien_aire"],
      donnees: "Trois élèves calculent le volume du même pavé de 5 cm, 4 cm et 3 cm.",
      question: "Où chacun s'est-il arrêté ?",
      schema: tableauErreurs,
      solution:
        "Le premier écrit $5 + 4 + 3 = 12$ : il a ADDITIONNÉ des longueurs, ce qui donne une longueur, pas un volume. Le deuxième écrit $4 \\times 3 = 12$ : il a bien calculé l'AIRE de la base, mais il s'est arrêté là — il manque la hauteur. Le troisième multiplie le PÉRIMÈTRE de la base par la hauteur : il a pris le tour au lieu de la surface. ⭐ Les trois font la même faute à des étages différents de l'escalier longueur → aire → volume. La bonne réponse est $5 \\times 4 \\times 3 = 60\\ \\text{cm}^3$.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Que mesure un volume, et quelle unité choisit-on pour le mesurer ?",
      correction:
        "La place occupée par un solide dans l'espace. L'unité est un CUBE : un cube de 1 cm d'arête vaut $1\\ \\text{cm}^3$. ⚠️ Pas un carré, qui sert aux aires, ni un segment, qui sert aux longueurs.",
      micros: ["volume_comprendre"],
    },
    {
      question: "Une boîte est remplie par 4 rangées de 3 cubes unités, sur 2 étages. Combien de cubes contient-elle ?",
      correction:
        "24. Chaque étage contient $4 \\times 3 = 12$ cubes — c'est l'aire de la base — et il y a 2 étages : $12 \\times 2 = 24$. C'est déjà la formule « aire de base × hauteur ».",
      micros: ["volume_comprendre", "volume_lien_aire"],
    },
    {
      question: "Un pavé droit mesure 4 cm de longueur, 3 cm de largeur et 5 cm de hauteur. Quel est son volume ?",
      correction:
        "$4 \\times 3 \\times 5 = 60\\ \\text{cm}^3$. ⚠️ Ni 12 (qui serait l'aire de la base), ni 12 non plus par addition : $5 + 4 + 3$ ne donne pas un volume.",
      micros: ["volume_pave"],
    },
    {
      question: "Un prisme droit a une aire de base de $18\\ \\text{cm}^2$ et une hauteur de 7 cm. Quel est son volume ?",
      correction:
        "$18 \\times 7 = 126\\ \\text{cm}^3$. La forme de la base n'a aucune importance : dès qu'on connaît son aire, on multiplie par la hauteur.",
      micros: ["volume_prisme"],
    },
    {
      question: "Un cylindre a une aire de base de $25\\pi\\ \\text{cm}^2$ et une hauteur de 4 cm. Quel est son volume ?",
      correction:
        "$25\\pi \\times 4 = 100\\pi\\ \\text{cm}^3$. On garde $\\pi$ dans le résultat plutôt que d'en prendre une valeur approchée : la réponse reste exacte.",
      micros: ["volume_cylindre"],
    },
    {
      question: "À combien de $\\text{cm}^3$ correspond $1\\ \\text{dm}^3$ ?",
      correction:
        "$1\\,000\\ \\text{cm}^3$. Un décimètre cube est un cube de 10 cm d'arête : $10 \\times 10 \\times 10 = 1\\,000$. ⚠️ Pas 10 ni 100 — pour les volumes, les conversions vont de mille en mille.",
      micros: ["volume_unite"],
    },
    {
      question: "Un élève calcule le volume d'un pavé de 5 cm, 4 cm et 3 cm et écrit $5 + 4 + 3 = 12\\ \\text{cm}^3$. A-t-il raison ?",
      correction:
        "Non : il a additionné au lieu de multiplier. Une somme de longueurs reste une longueur — le résultat ne peut pas s'écrire en $\\text{cm}^3$. Le volume vaut $5 \\times 4 \\times 3 = 60\\ \\text{cm}^3$.",
      micros: ["volume_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

// ⛔ AUCUN LATEX DANS LES DIAPOS : `ModeClasse.tsx` n'a pas de rendu KaTeX, et le
// code serait projeté en clair au tableau devant la classe.
export const slidesVolumes4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Volumes - 4e",
    section: {
      type: "objectif",
      phrase: "La place occupée dans l'espace",
      sousPhrase:
        "On la compte en cubes. Et une seule formule sert au pavé, au prisme et au cylindre : aire de base × hauteur.",
      encadre: {
        titre: "L'idée",
        texte: "Des cm³ : l'unité de volume est un cube, pas un carré.",
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
          "Ce qui rentre dedans : une réserve d'eau de 3 m sur 2 m et 2 m de haut contient 12 m³, soit 12 000 litres. Un litre EST un décimètre cube — ce n'est pas une coïncidence, c'est la définition.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Volume » vient du latin volumen, un rouleau de papyrus. Et Archimède, chargé de vérifier une couronne sans la fondre, aurait compris dans son bain qu'un corps plongé dans l'eau déplace exactement son propre volume.",
      },
    },
  },
  {
    titre: "La règle d'or",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "Volume = aire de base × hauteur",
      sousPhrase:
        "L'AIRE de la base, jamais son périmètre. Et la hauteur dit combien de fois cette base s'empile.",
      encadre: {
        titre: "L'escalier",
        texte: "Longueur en cm, aire en cm², volume en cm³. Les trois erreurs classiques consistent à s'arrêter une marche trop tôt.",
      },
    },
  },
  {
    titre: "Une formule, trois solides",
    badge: "3 repères",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Pavé : L × l × h", texte: "La base est un rectangle : 4 × 3 = 12 cm², puis × 5 = 60 cm³." },
        { titre: "Prisme : aire × h", texte: "La base est un triangle. Aire 12, hauteur 5 : 60 cm³." },
        { titre: "Cylindre : πr² × h", texte: "La base est un disque. Rayon 5, hauteur 4 : 100π cm³." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheVolumes4e.methode.map((m) => ({
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
      cartes: ficheVolumes4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Les trois erreurs",
    section: {
      type: "exemple",
      enonce: "Trois élèves calculent le volume du même pavé de 5 cm, 4 cm et 3 cm.",
      question: "Où chacun s'est-il arrêté ?",
      correction:
        "5 + 4 + 3 : il additionne des longueurs. 4 × 3 : il s'arrête à l'aire de la base. Périmètre × hauteur : il prend le tour au lieu de la surface. La réponse est 60 cm³.",
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
      enonce: "1 dm³ correspond à combien de cm³ ?",
      question: "10, 100, 1 000 ou 10 000 ?",
      indice: "Un décimètre cube est un cube de 10 cm d'arête.",
      correction: "1 000 cm³ : 10 × 10 × 10. Pour les volumes, les conversions vont de mille en mille.",
    },
  },
];
