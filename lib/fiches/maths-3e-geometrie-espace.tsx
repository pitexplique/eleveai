// ─── Fiche de cours : la géométrie dans l'espace (3e) ──────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/geometrie-espace.bank.ts, notionId volume_geometrie_espace).
//
// ⚠️⚠️ CETTE NOTION EST UN SOUS-ENSEMBLE STRICT DE CELLE DE 4e, ET IL FAUT LE
// DIRE FRANCHEMENT. Comparaison des micros, faite avant d'écrire :
//   4e  `vision_espace` — CINQ micros : reconnaitre et nommer les solides, LIRE
//       LES VUES de face/dessus/côté, PERSPECTIVE CAVALIÈRE ET PATRON,
//       reconnaitre la section plane, défis.
//   3e  `volume_geometrie_espace` — QUATRE micros : reconnaitre les solides,
//       comprendre une section, interpréter une perspective, défis.
// 👉 La 3e n'ajoute RIEN, et retire même les vues et le patron. La 4e a déjà sa
// fiche (`maths/4e/vision-espace`).
// ⭐ On l'écrit quand même, pour une raison simple et mesurable : la notion de
// 3e existe dans le coach, un élève de 3e clique dessus, et il n'a AUCUN cours.
// Mais la fiche est écrite comme une REPRISE, centrée sur ce que la banque de
// 3e interroge réellement — et ce sont les huit questions de perspective
// cavalière, pas les solides.
// ⛔ ARBITRAGE À RENDRE, SIGNALÉ : cette notion et `sections_solides` se
// recouvrent aussi (`volume_section` contre `section_reconnaitre`). Trois
// notions pour deux objets, sur deux classes. C'est un découpage à trancher,
// pas une fiche à corriger.
//
// ⭐ LES MICROS ONT ÉTÉ LUES AVANT D'ÉCRIRE, et les nombres viennent de la
// banque : le cube a 6 faces, 12 arêtes, 8 sommets, et 3 arêtes cachées dans
// la représentation classique.
//
// ⛔⛔ LE CANVAS NE SAIT PAS DESSINER LA RÈGLE QUE LA FICHE ENSEIGNE, ET C'EST
// MESURÉ : `stroke-dasharray` = 0 sur toutes ses figures. `Solide3DCanvas`
// rend les solides en « boite de verre » — toutes les faces remplies, toutes
// les arêtes en TRAIT PLEIN, y compris celles de derrière. Il ne peut donc pas
// illustrer « les arêtes cachées sont en pointillés », qui est pourtant la
// première règle du chapitre et une question de la banque.
// ⚠️ Première version de cette fiche : une légende annonçait « trois arêtes
// derrière, donc trois pointillés » sous un dessin qui n'en avait aucun. Un
// dessin qui contredit son texte est pire qu'une absence de dessin.
// 👉 Les légendes ne promettent donc plus de pointillés, et la règle est portée
// par un TABLEAU, qui dit vrai. Corriger le canvas demanderait de changer sa
// façon de rendre les faces — il sert à quatre autres fiches (volumes de 6e,
// 5e, 4e, et vision-espace de 4e) : c'est un arbitrage, pas un correctif.
//
// ⚠️ `solide_3d` EST EMPLOYÉ À SA TAILLE PAR DÉFAUT, et c'est délibéré. Son
// origine est fixe (160 ; 170) et son pas de 32 : rétrécir son `viewBox` ROGNE
// le dessin au lieu de le mettre à l'échelle. Sa police avait été montée à 19
// le 24/08 pour cette raison exacte — à l'échelle 0,66 d'une carte de fiche,
// elle rend 12,5 px, au-dessus du plancher de 11. C'est le seul canvas de
// solide qui n'a rien demandé aujourd'hui.

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

const tableau = (data: Record<string, unknown>, compact = false) => (
  <CanvasRenderer
    figure={{ kind: "tableau_donnees", display: { compact }, ...data } as never}
  />
);

export const ficheGeometrieEspace3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "volume-geometrie-espace",
  titre: "La géométrie dans l'espace",
  accroche:
    "Un solide a trois dimensions, une feuille n'en a que deux : tout dessin de solide est donc un mensonge utile. La perspective cavalière est le code qui règle ce mensonge — elle décide de ce qu'on déforme et de ce qu'on conserve. Savoir la lire, c'est retrouver le vrai solide derrière le dessin.",
  identite: [
    { label: "Prérequis", valeur: "Solides usuels, faces, arêtes, sommets" },
    { label: "L'idée clé", valeur: "Le dessin déforme, mais suivant des règles" },
    { label: "Outil", valeur: "Compter ce qu'on ne voit pas" },
  ],
  definition: {
    texte:
      "La perspective cavalière est la façon habituelle de représenter un solide sur une feuille. Elle suit trois règles : les arêtes cachées se dessinent en POINTILLÉS, deux arêtes parallèles dans la réalité restent parallèles sur le dessin, et les arêtes qui fuient vers l'arrière sont raccourcies par un même coefficient. C'est pourquoi une face carrée vue de biais est dessinée comme un parallélogramme : elle reste un carré dans la réalité.",
  },
  figure: {
    schema: legende(
      solide("cube"),
      "un cube : 6 faces, 12 arêtes, 8 sommets — vues ou non",
    ),
    legende:
      "Le cube a 6 faces, 12 arêtes et 8 sommets — visibles et cachés compris. Le dessin n'en montre qu'une partie.",
  },
  proprietes: [
    {
      titre: "Compter ce que le dessin cache",
      texte:
        "Un cube possède 6 faces, 12 arêtes et 8 sommets, qu'on les voie ou non. La représentation classique en cache trois arêtes : les compter sur le dessin donne toujours un résultat trop petit. C'est la question la plus fréquente du chapitre.",
      micros: ["volume_solide_reconnaitre"],
      schema: tableau({
        headers: ["cube", "nombre"],
        rows: [
          { values: ["faces", "6"] },
          { values: ["arêtes", "12"] },
          { values: ["sommets", "8"] },
          { values: ["arêtes cachées", "3"] },
        ],
        highlight: { row: 3 },
        caption: "visibles ET cachées",
      }),
    },
    {
      titre: "Les arêtes cachées sont en pointillés",
      texte:
        "C'est la première règle du code, et elle porte toute l'information : le trait plein dit « je vois cette arête », le pointillé dit « elle existe, mais elle est derrière ». Un dessin sans pointillés est ambigu — on ne sait plus quelle face est devant.",
      micros: ["volume_representation"],
      schema: tableau({
        headers: ["le trait", "ce qu'il dit"],
        rows: [
          { values: ["plein", "je vois cette arête"] },
          { values: ["pointillé", "elle existe, mais derrière"] },
        ],
        highlight: { row: 1 },
        caption: "le code du dessin technique",
      }),
    },
    {
      titre: "Un parallélogramme sur le dessin, un carré en vrai",
      texte:
        "C'est le piège central. Les faces latérales d'un cube sont dessinées comme des parallélogrammes, parce qu'elles sont vues de biais. En RÉALITÉ ce sont des carrés, tous identiques. Le dessin déforme l'angle et la longueur, jamais la nature de la face.",
      micros: ["volume_representation"],
      schema: tableau({
        headers: ["sur le dessin", "en réalité"],
        rows: [
          { values: ["un parallélogramme", "un carré"] },
          { values: ["deux longueurs différentes", "deux arêtes égales"] },
        ],
        highlight: { col: 1 },
        caption: "on ne mesure jamais sur la perspective",
      }),
    },
    {
      titre: "Les parallèles restent parallèles",
      texte:
        "C'est la règle qui sauve. La perspective cavalière déforme beaucoup, mais elle conserve le parallélisme : deux arêtes parallèles dans le solide sont représentées par deux droites parallèles. C'est ce qui permet de reconstituer la figure et de repérer les faces opposées.",
      micros: ["volume_representation"],
      schema: legende(
        solide("pave_droit"),
        "les arêtes opposées restent parallèles",
      ),
    },
    {
      titre: "Les fuyantes sont raccourcies",
      texte:
        "Les arêtes qui partent vers l'arrière sont dessinées plus courtes qu'elles ne sont, toutes réduites par le MÊME coefficient. C'est ce raccourcissement qui donne l'impression de profondeur — et c'est aussi pourquoi une longueur ne se mesure jamais à la règle sur un dessin en perspective.",
      micros: ["volume_representation"],
    },
    {
      titre: "Chaque solide a sa signature",
      texte:
        "Deux bases circulaires identiques reliées par une surface courbe : un cylindre. Une base circulaire et un sommet pointu : un cône. Aucune face plane, aucune arête : une boule. Une base carrée et un sommet : une pyramide. Toutes les faces rectangulaires : un pavé droit.",
      micros: ["volume_solide_reconnaitre"],
      schema: legende(
        solide("cylindre"),
        "deux bases identiques, une surface courbe",
      ),
    },
    {
      titre: "La boule est le seul sans arête",
      texte:
        "Elle n'a ni face plane, ni arête, ni sommet : c'est ce qui la distingue de tous les autres. C'est aussi la raison pour laquelle elle n'a pas de patron — on ne peut pas l'aplatir sans la déformer, ce qui rend fausse toute carte du monde.",
      micros: ["volume_solide_reconnaitre"],
      schema: legende(
        solide("boule"),
        "aucune arête, aucun sommet, aucun patron",
      ),
    },
    {
      titre: "Une section se regarde à part",
      texte:
        "Couper un solide par un plan donne une figure plane, dont la forme dépend de la coupe : un cube coupé parallèlement à une face donne un carré, un cylindre coupé selon son axe un rectangle. C'est le sujet de la fiche « Les sections planes de solides », où chaque cas est dessiné.",
      micros: ["volume_section"],
      schema: tableau({
        headers: ["coupe", "section"],
        rows: [
          { values: ["cube // face", "un carré"] },
          { values: ["cylindre // bases", "un disque"] },
          { values: ["cylindre selon l'axe", "un rectangle"] },
          { values: ["pyramide // base", "un carré plus petit"] },
        ],
        caption: "le détail est dans la fiche des sections",
      }),
    },
  ],
  reel: {
    texte:
      "La perspective cavalière est le dessin technique du collège : c'est ainsi qu'on représente une pièce à usiner, un meuble à monter, une charpente. Sa force est justement de conserver les parallèles et les rapports de longueur sur chaque direction, ce qui permet de LIRE des mesures — contrairement à la perspective d'un peintre, où les fuyantes convergent et où plus rien ne se mesure. Une notice de montage en est presque toujours faite.",
  },
  historique: {
    texte:
      "Son nom vient des fortifications : le « cavalier » était un remblai surélevé d'où l'on dominait le champ de bataille, et les ingénieurs militaires dessinaient les places fortes vues de ce point haut. La méthode s'est imposée parce qu'elle est rapide et mesurable. La perspective à points de fuite, elle, naît chez les peintres italiens du XVe siècle : plus réaliste, mais inutilisable pour construire.",
  },
  formule: {
    contexte: "Les trois règles de la perspective cavalière",
    expression:
      "$\\text{cachées} \\rightarrow \\text{pointillés} \\quad \\text{parallèles} \\rightarrow \\text{parallèles} \\quad \\text{fuyantes} \\rightarrow \\text{réduites}$",
    legende:
      "Ce qui est conservé : le parallélisme, et le rapport entre longueurs d'une même direction. Ce qui ne l'est pas : les angles, et les longueurs des fuyantes.",
    schema: tableau(
      {
        headers: ["conservé", "déformé"],
        rows: [
          { values: ["le parallélisme", "les angles"] },
          { values: ["les faces cachées, en pointillés", "les longueurs qui fuient"] },
        ],
        highlight: { col: 0 },
      },
      true,
    ),
  },
  methode: [
    {
      titre: "Lire les pointillés d'abord",
      texte:
        "Ils disent ce qui est derrière. En les repérant, on reconstitue mentalement le solide entier, faces cachées comprises — ce qui est indispensable pour compter.",
      micros: ["volume_representation"],
    },
    {
      titre: "Compter sur le solide, pas sur le dessin",
      texte:
        "Pour donner un nombre de faces, d'arêtes ou de sommets, on se rappelle le solide, on ne compte pas les traits visibles. Un cube a 12 arêtes, même si le dessin n'en montre que 9.",
      micros: ["volume_solide_reconnaitre"],
      schema: legende(
        solide("cube"),
        "9 traits pleins, mais 12 arêtes",
      ),
    },
    {
      titre: "Ne jamais mesurer sur la perspective",
      texte:
        "Les fuyantes sont raccourcies : la règle posée sur le dessin donne une longueur fausse. On travaille sur les dimensions données par l'énoncé, ou sur une figure redessinée à plat.",
      micros: ["volume_representation"],
    },
    {
      titre: "Reconnaitre le solide à sa signature",
      texte:
        "On cherche les bases : combien, de quelle forme, et y a-t-il un sommet ? Deux bases circulaires donnent un cylindre, une base et un sommet un cône ou une pyramide selon que la base est ronde ou polygonale.",
      micros: ["volume_solide_reconnaitre"],
    },
  ],
  usages: [
    {
      titre: "On demande un nombre d'arêtes ou de faces",
      detail:
        "On répond d'après le solide, visibles et cachées comprises — jamais en comptant les traits du dessin.",
      micros: ["volume_solide_reconnaitre"],
    },
    {
      titre: "On demande la nature réelle d'une face",
      detail:
        "Un parallélogramme sur le dessin est le plus souvent un carré ou un rectangle en réalité. Le dessin déforme les angles.",
      micros: ["volume_representation"],
    },
    {
      titre: "On demande la forme d'une section",
      detail:
        "On identifie le solide et l'orientation du plan : c'est le sujet de la fiche des sections planes.",
      micros: ["volume_section"],
    },
  ],
  exemples: [
    {
      titre: "Compter les arêtes d'un cube",
      donnees: "La représentation en perspective cavalière d'un cube.",
      question: "Combien d'arêtes possède-t-il au total ?",
      solution:
        "12. Le dessin n'en montre que 9 en trait plein : les 3 autres sont cachées et dessinées en pointillés. On répond d'après le solide, pas d'après ce qu'on voit.",
      micros: ["volume_solide_reconnaitre", "volume_representation"],
      schema: legende(
        solide("cube"),
        "12 arêtes en tout, 3 sont derrière",
      ),
    },
    {
      titre: "La nature d'une face latérale",
      donnees: "Sur le dessin d'un cube, une face latérale ressemble à un parallélogramme.",
      question: "Quelle est sa nature réelle ?",
      solution:
        "C'est un carré. Toutes les faces d'un cube sont des carrés identiques ; c'est la perspective qui incline les angles et raccourcit les fuyantes. Le dessin déforme, il ne change pas la nature de la face.",
      micros: ["volume_representation"],
    },
    {
      titre: "Reconnaitre un solide",
      donnees: "Un solide possède deux bases circulaires identiques, reliées par une surface courbe.",
      question: "De quel solide s'agit-il ?",
      solution:
        "D'un cylindre. Une seule base circulaire avec un sommet pointu donnerait un cône ; aucune face plane ni arête donnerait une boule.",
      micros: ["volume_solide_reconnaitre"],
      schema: legende(
        solide("cone"),
        "une base et un sommet : le cône, pas le cylindre",
      ),
    },
    {
      titre: "Une boite à chaussures",
      donnees: "Un solide dont toutes les faces sont des rectangles.",
      question: "Comment s'appelle-t-il ?",
      solution:
        "Un pavé droit. Il a 6 faces, 12 arêtes et 8 sommets, comme le cube — dont il est le cas général : le cube est le pavé droit dont toutes les arêtes sont égales.",
      micros: ["volume_solide_reconnaitre"],
      schema: legende(
        solide("pave_droit"),
        "six faces rectangulaires",
      ),
    },
  ],
  pieges: [
    "Compter les arêtes visibles sur le dessin : un cube en a 12, dont 3 cachées.",
    "Croire qu'une face dessinée en parallélogramme est un parallélogramme : c'est un carré ou un rectangle vu de biais.",
    "Mesurer une longueur à la règle sur une perspective : les fuyantes sont raccourcies.",
    "Oublier que le parallélisme, lui, est conservé : c'est la seule chose sur laquelle on peut s'appuyer.",
    "Confondre cône et cylindre : le cône a UNE base et un sommet, le cylindre DEUX bases.",
    "Chercher un patron à la boule : elle n'en a pas, et c'est pourquoi toute carte du monde est fausse.",
  ],
  aRetenir: [
    "Les arêtes cachées se dessinent en pointillés.",
    "Le parallélisme est conservé ; les angles et les longueurs des fuyantes ne le sont pas.",
    "Une face dessinée en parallélogramme est en réalité un carré ou un rectangle.",
    "Le cube a 6 faces, 12 arêtes, 8 sommets — dont 3 arêtes cachées sur la représentation classique.",
    "La boule n'a ni face plane, ni arête, ni sommet, ni patron.",
    "On ne mesure jamais sur un dessin en perspective.",
  ],
  entrainement: [
    {
      question: "Comment dessine-t-on les arêtes cachées en perspective cavalière ?",
      correction:
        "En pointillés. C'est ce qui permet de savoir quelle face est devant et laquelle est derrière.",
      micros: ["volume_representation"],
    },
    {
      question: "Combien d'arêtes sont habituellement cachées dans la représentation d'un cube ?",
      correction: "Trois. Les 9 autres sont visibles, pour un total de 12.",
      micros: ["volume_representation"],
    },
    {
      question:
        "Sur le dessin d'un cube, une face latérale ressemble à un parallélogramme. Qu'est-ce en réalité ?",
      correction:
        "Un carré. Toutes les faces d'un cube sont des carrés ; c'est la perspective qui les incline.",
      micros: ["volume_representation"],
    },
    {
      question:
        "En perspective cavalière, comment sont représentées deux arêtes parallèles dans la réalité ?",
      correction:
        "Par deux droites parallèles. Le parallélisme est la propriété que cette perspective conserve.",
      micros: ["volume_representation"],
    },
    {
      question: "Quel solide n'a aucune face plane ni aucune arête ?",
      correction:
        "La boule. C'est aussi le seul qui n'a pas de patron : on ne peut pas l'aplatir sans la déformer.",
      micros: ["volume_solide_reconnaitre"],
    },
    {
      question: "Combien de sommets possède un pavé droit ?",
      correction: "Huit, comme le cube — le cube étant le pavé droit dont toutes les arêtes sont égales.",
      micros: ["volume_solide_reconnaitre"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=3e",
};

export const slidesGeometrieEspace3e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Espace - 3e",
    section: {
      type: "objectif",
      phrase: "Tout dessin de solide est un mensonge utile",
      sousPhrase:
        "Un solide a trois dimensions, une feuille n'en a que deux. La perspective cavalière est le code qui règle ce mensonge : elle dit ce qu'on déforme et ce qu'on garde.",
      encadre: {
        titre: "Les trois règles",
        texte:
          "Les arêtes cachées en pointillés. Les parallèles restent parallèles. Les fuyantes sont raccourcies.",
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
          "C'est le dessin technique : une pièce à usiner, un meuble à monter, une charpente. Sa force est de conserver les parallèles, donc de rester mesurable — contrairement à la perspective d'un peintre, où les fuyantes convergent et où plus rien ne se lit.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Son nom vient des fortifications : le cavalier était un remblai surélevé d'où l'on dominait le champ de bataille. Les ingénieurs militaires dessinaient les places fortes vues de ce point haut.",
      },
    },
  },
  {
    titre: "Le piège du comptage",
    badge: "À ne pas rater",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on fait",
        contenu:
          "On compte les traits sur le dessin, et on trouve neuf arêtes pour un cube.",
      },
      droite: {
        variante: "info",
        titre: "Ce qui est vrai",
        contenu:
          "Un cube a douze arêtes. Trois sont cachées, dessinées en pointillés. On répond d'après le solide, jamais d'après ce qu'on voit.",
      },
    },
  },
  {
    titre: "Lire une perspective",
    badge: "La méthode",
    section: {
      type: "etapes",
      etapes: [
        "Repérer les pointillés : ils disent ce qui est derrière.",
        "Reconstituer le solide entier, faces cachées comprises.",
        "Compter d'après le solide, pas d'après les traits visibles.",
        "Ne jamais mesurer à la règle : les fuyantes sont raccourcies.",
      ],
    },
  },
];
