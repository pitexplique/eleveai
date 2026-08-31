// ─── Fiche de cours : solides et représentations (4e) ──────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/vision-espace.bank.ts, notionId vision_espace).
//
// ⭐ NOTION OUVERTE LE 31/08/2026, sœur de `reperage` : les deux ferment le
// DERNIER bloc du programme de 4e, « Représenter l'espace ».
//
// ⭐ ELLE REPREND L'IDENTIFIANT DE LA 6e, et deux de ses micros
// (`vision_vues`, `vision_representation`). La progression se lit en entier :
//   CP → CM2  reconnaître et nommer les solides usuels
//   6e        les quatre vues, la perspective, le patron, les cubes cachés
//   4e        + la reconnaissance nommée des SEPT solides du BO, et les
//             SECTIONS PLANES
//
// ⭐⭐ LE TYPE `SolideKind` PORTE EXACTEMENT LES SEPT SOLIDES DE LA PUCE
// 4e-D-espace-4 — cube, pavé droit, prisme, cylindre, cône, boule, pyramide —
// et le canvas les dessine tous les sept. La table de la banque EST la puce du
// programme.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE :
//   vision_reconnaitre   → nommer sur un dessin, et retrouver par description
//   vision_vues          → la forme d'une vue, et deviner à partir de deux
//   vision_representation→ le patron, et les règles de la perspective
//   vision_section       → la forme de la coupe, et la coupe à partir de la forme
//   vision_defi          → l'intrus, compter faces/arêtes/sommets, modéliser
//
// ⭐⭐ TROIS FAITS PORTENT LA FICHE, et aucun n'est un détail :
//   · LA BOULE N'A PAS DE PATRON — c'est pourquoi aucune carte du monde n'est
//     exacte ;
//   · LA PERSPECTIVE CAVALIÈRE MENT sur les longueurs et les angles qui
//     fuient, mais JAMAIS sur le parallélisme — donc on ne mesure pas dessus ;
//   · UN CUBE EST UN PAVÉ DROIT, comme un carré est un rectangle. Inclusion à
//     sens unique.
//
// ⚠️ MESURE DE CANVAS. `solide_3d` projette depuis une origine FIXE (160, 170)
// au pas de 32 px : sa largeur ne met PAS le dessin à l'échelle, elle le ROGNE.
// On garde donc sa largeur par défaut (340), et c'est sa police de 19 — montée
// exprès le 24/08/2026 — qui le rend lisible dans une carte de 222 px : elle y
// sort à 12,4 px, au-dessus du plancher de 11.
// ⛔ `section_solide` N'EST PAS UTILISÉ ICI : même origine fixe, mais des
// polices de 11 et 12, qui tomberaient à 7 px dans une carte de propriété. Les
// sections se racontent donc en tableau, qui se rend en cellules HTML et suit
// son bloc sans jamais rétrécir. Il reste PARFAIT dans le coach, où la zone de
// question est large — et `vision-espace.bank.ts` l'y emploie.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut donc porter du LaTeX.
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
 * Un solide dessiné.
 * ⚠️ ON NE TOUCHE PAS À SA LARGEUR : `Solide3DCanvas` projette depuis une
 * origine FIXE au pas de 32 px, donc réduire le viewBox ROGNE le dessin au lieu
 * de le mettre à l'échelle. C'est la police de 19 qui assure la lisibilité.
 */
const solide = (
  kind: "cube" | "pave_droit" | "prisme" | "cylindre" | "cone" | "boule" | "pyramide"
) => (
  <CanvasRenderer
    figure={
      {
        kind: "solide_3d",
        solide: kind,
        display: { showLabels: false, showDimensions: false },
      } as never
    }
  />
);

export const ficheVisionEspace4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "vision-espace",
  titre: "Solides et représentations",
  accroche:
    "Un solide occupe l'espace, une feuille est plate : tout le chapitre tient dans cet écart. Vues, perspective, patron, section — ce sont quatre façons de mettre en deux dimensions un objet qui en a trois, et chacune garde certaines informations en en perdant d'autres. Savoir laquelle perd quoi, c'est savoir lire un plan.",
  identite: [
    { label: "Les sept solides", valeur: "Cube · pavé droit · prisme · cylindre · cône · boule · pyramide" },
    { label: "Ce qui les distingue", valeur: "Le nombre et la forme des BASES, et ce qui les relie" },
    { label: "Le piège", valeur: "Une perspective ment sur les longueurs — on ne mesure jamais dessus" },
  ],
  definition: {
    texte:
      "Un solide se reconnaît à ses BASES et à ses faces latérales, jamais à son allure générale. Deux bases identiques et parallèles reliées par des rectangles : c'est un prisme. Une base et une pointe : c'est un cône ou une pyramide, selon que la base est ronde ou polygonale. Aucune face plane, aucune arête, aucun sommet : c'est une boule. ⚠️ Un CUBE est un PAVÉ DROIT particulier — celui dont les six faces sont des carrés —, exactement comme un carré est un rectangle.",
  },
  figure: {
    schema: legende(solide("pave_droit"), "6 faces · 12 arêtes · 8 sommets"),
    legende:
      "Une FACE est une surface, une ARÊTE est le segment où deux faces se rejoignent, un SOMMET est un point où des arêtes se rencontrent. Sur ce dessin en perspective, on ne voit que trois faces sur six : les trois autres sont derrière, et c'est en les oubliant qu'on se trompe en comptant.",
  },
  proprietes: [
    {
      titre: "Chaque solide a sa signature",
      micros: ["vision_reconnaitre"],
      texte:
        "On ne reconnaît pas un solide « à l'œil » : on compte ses bases, on regarde leur forme, puis ce qui les relie. C'est ce qui permet de distinguer un prisme d'un pavé, ou un cône d'une pyramide.",
      schema: tableau({
        headers: ["solide", "sa signature"],
        rows: [
          { values: ["cube", "6 faces carrées"] },
          { values: ["pavé droit", "6 faces rectangulaires"] },
          { values: ["prisme droit", "2 bases + rectangles"] },
          { values: ["cylindre", "2 disques + courbe"] },
          { values: ["cône", "1 disque + pointe"] },
          { values: ["pyramide", "1 base + triangles"] },
          { values: ["boule", "aucune face plane"] },
        ],
        highlight: { col: 1 },
        caption: "les bases décident",
      }),
    },
    {
      titre: "Un cube est un pavé droit",
      micros: ["vision_reconnaitre"],
      texte:
        "Un pavé droit a six faces rectangulaires. Or un carré EST un rectangle — celui dont les quatre côtés sont égaux. Un cube remplit donc la définition du pavé, sans rien y ajouter. ⚠️ Et l'inclusion ne marche que dans UN sens : tout cube est un pavé, mais une boîte à chaussures n'est pas un cube.",
      schema: tableau({
        headers: ["affirmation", "vrai ?"],
        rows: [
          { values: ["tout cube est un pavé", "OUI"] },
          { values: ["tout pavé est un cube", "non"] },
          { values: ["tout carré est un rectangle", "OUI"] },
        ],
        highlight: { row: 1 },
        caption: "la même inclusion, un étage plus haut",
      }),
    },
    {
      titre: "Une vue est une ombre",
      micros: ["vision_vues"],
      texte:
        "Regarder un solide bien en face d'une direction, c'est l'aplatir : le relief disparaît, il ne reste qu'un contour. ⭐ La BOULE est le seul solide dont toutes les vues sont identiques — un disque, quel que soit l'angle. C'est ce qui en fait le plus simple à dessiner et le plus difficile à identifier sur une seule vue.",
      schema: legende(solide("cylindre"), "de dessus : un disque · de face : un rectangle"),
    },
    {
      titre: "Une seule vue ne suffit presque jamais",
      micros: ["vision_vues"],
      texte:
        "Un disque vu de dessus peut être un cylindre, un cône OU une boule. C'est la seconde vue qui tranche : un rectangle donne le cylindre, un triangle le cône, un disque la boule. ⭐ C'est pour cela qu'un plan technique en donne toujours au moins deux.",
      schema: tableau({
        headers: ["de dessus", "de face", "c'est"],
        rows: [
          { values: ["disque", "rectangle", "cylindre"] },
          { values: ["disque", "triangle", "cône"] },
          { values: ["disque", "disque", "boule"] },
          { values: ["carré", "triangle", "pyramide"] },
        ],
        highlight: { col: 2 },
        caption: "deux vues suffisent, une seule non",
      }),
    },
    {
      titre: "Un patron est le solide déplié",
      micros: ["vision_representation"],
      texte:
        "Chaque face apparaît une fois, en vraie grandeur. Un patron n'a donc ni plus ni moins de morceaux que le solide n'a de faces. ⭐⭐ LA BOULE N'A PAS DE PATRON — et c'est exactement pour cela qu'aucune carte du monde n'est exacte : on ne peut pas mettre une sphère à plat sans déformer quelque chose.",
      schema: tableau({
        headers: ["solide", "son patron"],
        rows: [
          { values: ["cube", "6 carrés"] },
          { values: ["pavé droit", "6 rectangles"] },
          { values: ["cylindre", "2 disques + 1 rectangle"] },
          { values: ["pyramide", "1 carré + 4 triangles"] },
          { values: ["boule", "AUCUN"] },
        ],
        highlight: { row: 4 },
        caption: "la sphère ne se déplie pas",
      }),
    },
    {
      titre: "La perspective ment, mais pas sur tout",
      micros: ["vision_representation"],
      texte:
        "La perspective cavalière est un CODE de dessin, pas une imitation de l'œil. Ce qui est de FRONT est en vraie grandeur ; ce qui FUIT est déformé — un carré devient un parallélogramme, un angle droit cesse d'être droit. ⚠️ Mais le PARALLÉLISME est toujours conservé, et les arêtes cachées se dessinent en pointillés. On ne mesure jamais sur une perspective.",
      schema: tableau({
        headers: ["ce qui est", "sur le dessin"],
        rows: [
          { values: ["de front", "en vraie grandeur"] },
          { values: ["qui fuit", "déformé"] },
          { values: ["parallèle", "reste parallèle"] },
          { values: ["caché", "en pointillés"] },
        ],
        highlight: { row: 2 },
        caption: "le parallélisme ne ment jamais",
      }),
    },
    {
      titre: "Une section est la forme de la tranche",
      micros: ["vision_section"],
      texte:
        "Couper un solide par un plan laisse voir une surface plane : la SECTION. Quand le plan est PARALLÈLE à la base, la section a la même forme que la base. ⚠️ Le CÔNE est l'exception qui compte : sa section parallèle à la base est bien un disque, mais PLUS PETIT — la forme se conserve, pas la taille.",
      schema: tableau({
        headers: ["on coupe", "on obtient"],
        rows: [
          { values: ["cube ∥ face", "un carré"] },
          { values: ["cylindre ∥ base", "un disque"] },
          { values: ["cylindre ∥ axe", "un rectangle"] },
          { values: ["cône ∥ base", "un disque plus petit"] },
        ],
        highlight: { row: 3 },
        caption: "le cône rétrécit, le cylindre non",
      }),
    },
  ],
  reel: {
    texte:
      "Un plan d'architecte, une notice de meuble, une carte marine : tous résolvent le même problème — montrer en deux dimensions un objet qui en a trois. Et tous choisissent ce qu'ils acceptent de perdre. Le plan d'architecte garde les longueurs et sacrifie le relief : on peut y mesurer, pas s'y représenter la pièce. La perspective d'une notice fait l'inverse : on comprend la forme d'un coup d'œil, mais on ne mesure rien dessus, et c'est pour cela que les cotes y sont écrites en chiffres. Les cartes du monde, elles, sont le cas extrême : la sphère n'ayant aucun patron, toute carte déforme — celle qu'on voit dans les classes agrandit énormément le Groenland, qui paraît aussi grand que l'Afrique alors qu'il en fait le quatorzième. Dans le bâtiment, la section est la représentation reine : une coupe de mur montre d'un seul dessin ce qu'aucune photo ne montrerait, parce qu'elle donne à voir l'intérieur.",
  },
  historique: {
    texte:
      "La perspective cavalière tire son nom des fortifications : le « cavalier » était un ouvrage de terre surélevé d'où l'on dominait le champ de bataille, et les ingénieurs militaires dessinaient les places fortes vues de ce point haut. Ce n'était pas une perspective d'artiste — celle des peintres de la Renaissance, où les fuyantes convergent vers un point — mais un code de dessin technique où les parallèles restent parallèles, précisément pour qu'on puisse reporter des mesures. Les deux systèmes ont coexisté pendant des siècles et servent encore des besoins différents : le peintre veut l'illusion, l'ingénieur veut l'information. Quant aux sections planes, c'est Apollonius de Perga qui en a fait un objet mathématique vers 200 avant notre ère, en coupant un cône de toutes les façons possibles : selon l'inclinaison du plan, il obtenait un cercle, une ellipse, une parabole ou une hyperbole. Dix-huit siècles plus tard, Kepler découvrait que les planètes décrivent des ellipses — l'une de ces sections de cône, devenue la forme des orbites.",
  },
  formule: {
    contexte: "Quatre façons de représenter un solide",
    expression: "les vues   ·   la perspective   ·   le patron   ·   la section",
    legende:
      "Chacune garde certaines informations et en perd d'autres. Les vues gardent les mesures et perdent le relief ; la perspective garde la forme et perd les longueurs ; le patron garde les vraies grandeurs et perd l'assemblage ; la section montre l'intérieur et perd le reste.",
    schema: tableau(
      {
        headers: ["représentation", "ce qu'elle garde"],
        rows: [
          { values: ["les vues", "les mesures"] },
          { values: ["la perspective", "la forme d'ensemble"] },
          { values: ["le patron", "les vraies grandeurs"] },
          { values: ["la section", "l'intérieur"] },
        ],
        highlight: { col: 1 },
        caption: "chacune perd quelque chose",
      },
      "formule"
    ),
  },
  methode: [
    {
      titre: "Nommer un solide",
      micros: ["vision_reconnaitre"],
      texte:
        "Trois questions dans cet ordre : combien de bases ? de quelle forme ? qu'est-ce qui les relie ? ⚠️ On ne regarde jamais l'allure générale d'abord — c'est ainsi qu'on confond un prisme et un pavé.",
      schema: legende(solide("prisme"), "2 bases triangulaires reliées par 3 rectangles"),
    },
    {
      titre: "Identifier avec deux vues",
      micros: ["vision_vues"],
      texte:
        "La vue de DESSUS donne la forme de la base. La vue de FACE dit si le solide monte droit, se termine en pointe, ou est rond. Les deux ensemble suffisent presque toujours.",
      schema: legende(solide("cone"), "de dessus : un disque · de face : un triangle"),
    },
    {
      titre: "Compter faces, arêtes et sommets",
      micros: ["vision_defi"],
      texte:
        "On compte par groupes — le dessus, le dessous, puis les côtés — pour ne rien oublier. ⚠️ L'erreur la plus fréquente est d'oublier ce qui est CACHÉ derrière : sur un cube dessiné en perspective, on ne voit que 3 faces sur 6.",
      schema: tableau({
        headers: ["solide", "faces", "sommets"],
        rows: [
          { values: ["cube", "6", "8"] },
          { values: ["pavé droit", "6", "8"] },
          { values: ["prisme triangulaire", "5", "6"] },
          { values: ["pyramide à base carrée", "5", "5"] },
        ],
        highlight: { row: 3 },
        caption: "5 faces des deux côtés, pas les mêmes",
      }),
    },
    {
      titre: "Trouver la forme d'une section",
      micros: ["vision_section"],
      texte:
        "On regarde l'ORIENTATION du plan par rapport au solide. Parallèle à la base : la section a la forme de la base. Parallèle à l'axe d'un cylindre : un rectangle. ⭐ Une section n'est pas une propriété du solide seul, mais du couple solide + plan.",
      schema: tableau({
        headers: ["le plan est", "la section"],
        rows: [
          { values: ["∥ à la base", "la forme de la base"] },
          { values: ["∥ à l'axe", "un rectangle"] },
        ],
        caption: "l'orientation décide",
      }),
    },
    {
      titre: "Modéliser un objet réel",
      micros: ["vision_defi"],
      texte:
        "On remplace l'objet par le solide qui lui ressemble le plus, en oubliant les poignées, les creux et les bosses. ⭐ C'est ce geste qui rend les formules utiles : on ne calcule jamais le volume d'une boîte de conserve, on calcule celui d'un cylindre.",
      schema: tableau({
        headers: ["objet", "modèle"],
        rows: [
          { values: ["boîte de conserve", "cylindre"] },
          { values: ["ballon", "boule"] },
          { values: ["cornet de glace", "cône"] },
          { values: ["tente canadienne", "prisme"] },
        ],
        caption: "on oublie les détails",
      }),
    },
  ],
  usages: [
    {
      titre: "On me montre un solide",
      micros: ["vision_reconnaitre"],
      detail:
        "Je compte les bases, je regarde leur forme, puis ce qui les relie. Le nom en découle.",
    },
    {
      titre: "On me donne des vues",
      micros: ["vision_vues"],
      detail:
        "La vue de dessus donne la base, celle de face dit comment le solide monte. Une seule vue ne suffit presque jamais.",
    },
    {
      titre: "On me demande un patron",
      micros: ["vision_representation"],
      detail:
        "Je compte les faces et je note leur forme : le patron a exactement ces morceaux-là. Sauf la boule, qui n'en a pas.",
    },
    {
      titre: "On me parle d'une coupe",
      micros: ["vision_section"],
      detail:
        "Je regarde l'orientation du plan. Parallèle à la base, la section a la forme de la base — plus petite s'il s'agit d'un cône.",
    },
  ],
  exemples: [
    {
      titre: "Deux vues, un solide",
      micros: ["vision_vues", "vision_reconnaitre"],
      donnees: "Un solide vu de dessus donne un disque, et vu de face un triangle.",
      question: "De quel solide s'agit-il ?",
      schema: legende(solide("cone"), "disque dessus, triangle de face"),
      solution:
        "La vue de dessus donne la forme de la BASE : ici un disque, donc une base ronde.\n\nLa vue de face dit comment le solide monte : un triangle signifie qu'il se termine en POINTE.\n\nUne base ronde et une pointe : c'est un CÔNE.\n\n⚠️ La vue de dessus seule ne suffisait pas. Un disque vu de dessus peut être un cylindre, un cône ou une boule — c'est la seconde vue qui tranche. Le cylindre aurait donné un rectangle de face, la boule un disque.",
    },
    {
      titre: "Compter ce qu'on ne voit pas",
      micros: ["vision_defi"],
      donnees: "On dessine un cube en perspective cavalière.",
      question: "Combien a-t-il de faces, d'arêtes et de sommets ?",
      schema: legende(solide("cube"), "on n'en voit que 3 faces sur 6"),
      solution:
        "Un cube a 6 faces, 12 arêtes et 8 sommets.\n\nOn compte par groupes pour ne rien oublier : le dessus, le dessous, et les quatre côtés font 6 faces. Pour les arêtes : 4 en haut, 4 en bas, 4 verticales, soit 12. Pour les sommets : 4 en haut, 4 en bas, soit 8.\n\n⚠️ Sur le dessin, on ne VOIT que 3 faces, 9 arêtes et 7 sommets : le reste est derrière. C'est là qu'est l'erreur, et c'est pour cela que les arêtes cachées se dessinent en pointillés — pour qu'on puisse les compter.\n\n⭐ Un pavé droit a exactement les mêmes nombres : seule la forme des faces diffère.",
    },
    {
      titre: "Pourquoi les cartes du monde sont fausses",
      micros: ["vision_representation"],
      donnees: "On cherche le patron d'une boule.",
      question: "Combien de morceaux a-t-il ?",
      schema: legende(solide("boule"), "aucune face plane, donc aucun patron"),
      solution:
        "Aucun : la boule N'A PAS de patron.\n\nUn patron suppose des faces planes qu'on déplie. Or une boule n'a aucune face plane, aucune arête, aucun sommet — il n'y a rien à déplier.\n\n⭐ Ce n'est pas une curiosité scolaire : c'est la raison pour laquelle aucune carte du monde n'est exacte. Toute mise à plat d'une sphère déforme quelque chose — les surfaces, les angles ou les distances —, et chaque projection choisit ce qu'elle sacrifie.\n\nLa carte la plus répandue conserve les angles, ce qui est commode pour naviguer, mais dilate énormément les zones proches des pôles : le Groenland y paraît aussi grand que l'Afrique, alors qu'il en fait environ le quatorzième.",
    },
  ],
  pieges: [
    "Reconnaître un solide à son allure. On compte d'abord les bases et on regarde leur forme.",
    "Croire qu'un cube n'est pas un pavé droit. C'est un pavé dont toutes les faces sont des carrés.",
    "Oublier les faces cachées en comptant. Sur un cube en perspective, on n'en voit que 3 sur 6.",
    "Identifier un solide sur une seule vue. Un disque vu de dessus peut être trois solides différents.",
    "Mesurer sur une perspective cavalière. Elle ment sur les longueurs et les angles qui fuient.",
    "Chercher un patron à la boule. Elle n'en a aucun, et c'est ce qui rend toute carte du monde fausse.",
    "Croire qu'une section parallèle à la base d'un CÔNE a la taille de la base. Elle est plus petite.",
  ],
  aRetenir: [
    "Un solide se reconnaît à ses BASES et à ses faces latérales, jamais à son allure.",
    "Les sept solides du programme : cube, pavé droit, prisme, cylindre, cône, boule, pyramide.",
    "Un cube est un pavé droit particulier, comme un carré est un rectangle — inclusion à sens unique.",
    "Une vue est une ombre : elle aplatit. Deux vues suffisent presque toujours, une seule presque jamais.",
    "Un patron a exactement autant de morceaux que le solide a de faces. La boule n'en a aucun.",
    "La perspective cavalière ment sur les longueurs et les angles qui fuient, jamais sur le parallélisme.",
    "Une section parallèle à la base a la forme de la base — plus petite pour un cône.",
    "Cube et pavé droit ont tous deux 6 faces, 12 arêtes et 8 sommets.",
  ],
  entrainement: [
    {
      micros: ["vision_reconnaitre"],
      question: "Quel solide a deux bases identiques et parallèles reliées par des rectangles ?",
      correction: "Un prisme droit. Si les bases sont des rectangles, c'est un pavé droit.",
    },
    {
      micros: ["vision_reconnaitre"],
      question: "Quel solide n'a ni arête, ni sommet, ni face plane ?",
      correction: "La boule. C'est ce qui la rend unique parmi les sept.",
    },
    {
      micros: ["vision_reconnaitre"],
      question: "Un cube est-il un pavé droit ? Un pavé droit est-il un cube ?",
      correction:
        "Oui à la première : ses six faces sont des carrés, donc des rectangles. Non à la seconde : une boîte à chaussures est un pavé et n'est pas un cube.",
    },
    {
      micros: ["vision_vues"],
      question: "Quelle est la vue de dessus d'un cylindre ? Et sa vue de face ?",
      correction: "Un disque de dessus, un rectangle de face.",
    },
    {
      micros: ["vision_vues"],
      question: "Un solide donne un disque de dessus ET un disque de face. Lequel est-ce ?",
      correction:
        "Une boule — le seul solide dont toutes les vues sont identiques.",
    },
    {
      micros: ["vision_representation"],
      question: "De quoi est fait le patron d'une pyramide à base carrée ?",
      correction: "D'un carré et de quatre triangles, soit cinq morceaux — autant que de faces.",
    },
    {
      micros: ["vision_representation"],
      question: "En perspective cavalière, un carré qui fuit vers l'arrière est dessiné comment ?",
      correction:
        "Comme un parallélogramme. Ses angles droits ne sont plus droits, mais ses côtés opposés restent parallèles.",
    },
    {
      micros: ["vision_representation"],
      question: "Pourquoi ne mesure-t-on jamais sur un dessin en perspective ?",
      correction:
        "Parce qu'il déforme les longueurs et les angles qui fuient. Seul le parallélisme y est fiable — c'est pour cela que les cotes sont écrites en chiffres.",
    },
    {
      micros: ["vision_section"],
      question: "On coupe un cylindre par un plan parallèle à son axe. Quelle est la section ?",
      correction:
        "Un rectangle. Parallèlement à la base, la même coupe donnerait un disque : c'est l'orientation qui décide.",
    },
    {
      micros: ["vision_section"],
      question: "On coupe un cône par un plan parallèle à sa base. Quelle est la section ?",
      correction:
        "Un disque, mais PLUS PETIT que la base. La forme se conserve, la taille non — c'est ce qui distingue le cône du cylindre.",
    },
    {
      micros: ["vision_defi"],
      question: "Combien un prisme à base triangulaire a-t-il de faces et de sommets ?",
      correction:
        "5 faces — 2 triangles et 3 rectangles — et 6 sommets, 3 en haut et 3 en bas.",
    },
    {
      micros: ["vision_defi"],
      question: "Par quel solide modélise-t-on une tente canadienne ? Et un cornet de glace ?",
      correction:
        "Un prisme droit à base triangulaire pour la tente, un cône pour le cornet.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesVisionEspace4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Solides et représentations - 4e",
    section: {
      type: "objectif",
      phrase: "Mettre à plat ce qui a trois dimensions",
      sousPhrase:
        "Vues, perspective, patron, section : quatre façons de représenter un solide sur une feuille. Chacune garde certaines informations et en perd d'autres.",
      encadre: {
        titre: "La signature d'un solide",
        texte:
          "On compte les bases, on regarde leur forme, puis ce qui les relie. Jamais l'allure générale.",
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
          "Un plan d'architecte garde les longueurs et perd le relief : on peut y mesurer. Une notice de meuble fait l'inverse — on comprend d'un coup d'œil, mais on ne mesure rien, et c'est pourquoi les cotes y sont écrites en chiffres.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "La perspective cavalière vient des fortifications : le cavalier était un ouvrage de terre surélevé d'où les ingénieurs militaires dessinaient les places fortes. Et c'est Apollonius de Perga qui, vers deux cents avant notre ère, coupa un cône de toutes les façons possibles — obtenant le cercle, l'ellipse, la parabole. Dix-huit siècles plus tard, Kepler découvrait que les planètes suivent des ellipses.",
      },
    },
  },
  {
    titre: "Les sept solides",
    badge: "Ce qu'il faut reconnaître",
    section: {
      type: "etapes",
      etapes: [
        "Le CUBE : six faces carrées, toutes identiques.",
        "Le PAVÉ DROIT : six faces rectangulaires. Un cube en est un cas particulier.",
        "Le PRISME : deux bases identiques et parallèles, reliées par des rectangles.",
        "Le CYLINDRE : deux disques et une surface courbe. Le CÔNE : un disque et une pointe.",
        "La PYRAMIDE : une base polygonale et une pointe. La BOULE : aucune face plane.",
      ],
    },
  },
  {
    titre: "Une seule vue ne suffit pas",
    badge: "Le premier piège",
    section: {
      type: "objectif",
      phrase: "Un disque vu de dessus peut être trois solides",
      sousPhrase:
        "Un cylindre, un cône ou une boule donnent tous un disque vu de dessus. C'est la vue de face qui tranche : rectangle, triangle, ou disque.",
      encadre: {
        titre: "La règle",
        texte:
          "La vue de dessus donne la BASE, la vue de face dit comment le solide MONTE. C'est pour cela qu'un plan technique en donne toujours au moins deux.",
      },
    },
  },
  {
    titre: "La boule n'a pas de patron",
    badge: "Et ça change tout",
    section: {
      type: "objectif",
      phrase: "On ne met pas une sphère à plat",
      sousPhrase:
        "Un patron suppose des faces planes qu'on déplie. Une boule n'en a aucune : il n'y a rien à déplier.",
      encadre: {
        titre: "La conséquence",
        texte:
          "Aucune carte du monde n'est exacte. Chaque projection déforme les surfaces, les angles ou les distances — la plus répandue fait paraître le Groenland aussi grand que l'Afrique, alors qu'il en fait le quatorzième.",
      },
    },
  },
  {
    titre: "La perspective ment, mais pas sur tout",
    badge: "Ce qui coûte des points",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Ce qui est de front",
          texte: "Dessiné en vraie grandeur. Un carré vu de front reste un carré.",
        },
        {
          titre: "Ce qui fuit",
          texte:
            "Déformé. Un carré devient un parallélogramme, un angle droit cesse d'être droit.",
        },
        {
          titre: "Ce qui ne ment jamais",
          texte:
            "Le parallélisme. Deux arêtes parallèles du solide restent parallèles sur le dessin.",
        },
        {
          titre: "La conséquence",
          texte:
            "On ne mesure JAMAIS sur une perspective. C'est pourquoi les cotes sont écrites en chiffres à côté.",
        },
      ],
    },
  },
  {
    titre: "Les sections",
    badge: "Ce que la 4e ajoute",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Parallèle à la base",
        contenu:
          "La section a la même forme que la base. Un cylindre coupé ainsi donne un disque, un cube un carré. Attention au cône : le disque est plus PETIT que la base.",
      },
      droite: {
        variante: "info",
        titre: "Parallèle à l'axe",
        contenu:
          "Un cylindre coupé dans le sens de la hauteur donne un rectangle. Le même solide donne donc deux formes très différentes : une section n'est pas une propriété du solide seul.",
      },
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    section: {
      type: "exemple",
      enonce: "On dessine un cube en perspective cavalière.",
      question: "Combien a-t-il de faces, d'arêtes et de sommets ?",
      correction:
        "Six faces, douze arêtes, huit sommets. On compte par groupes pour ne rien oublier : le dessus, le dessous et les quatre côtés font six faces ; quatre arêtes en haut, quatre en bas, quatre verticales font douze ; quatre sommets en haut et quatre en bas font huit. Mais sur le dessin, on ne voit que trois faces, neuf arêtes et sept sommets — le reste est derrière. C'est exactement pour cela que les arêtes cachées se dessinent en pointillés : pour qu'on puisse les compter.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    section: {
      type: "exercice",
      enonce: "On cherche le patron d'une boule.",
      question: "Combien de morceaux a-t-il, et qu'est-ce que cela entraîne ?",
      indice: "Un patron suppose des faces planes qu'on déplie. Une boule en a-t-elle ?",
      correction:
        "Aucun morceau : la boule n'a pas de patron. Elle n'a aucune face plane, aucune arête, aucun sommet — il n'y a rien à déplier. Et ce n'est pas une curiosité : c'est la raison pour laquelle aucune carte du monde n'est exacte. Toute mise à plat d'une sphère déforme quelque chose, et chaque projection choisit ce qu'elle sacrifie — les surfaces, les angles ou les distances.",
    },
  },
];
