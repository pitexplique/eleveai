// ─── Fiche de cours : les solides (CM2) ─────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/solides.bank.ts (notionId solide).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On DESSINE les solides
// (canvas solide_3d du coach : cube, pavé, cylindre, cône, boule, pyramide,
// assemblage de cubes) + un patron en SVG.
//
// Micro-compétences couvertes (les 5 de la banque) :
// - solide_reconnaitre        → definition (une figure de l'espace), figure (le cube), usages (reconnaître un solide du quotidien)
// - solide_face               → propriété « Les faces », exemple « Les faces d'un cube »
// - solide_sommet_arete_face  → propriété « Sommet, arête, face », méthode (compter), exemple « Compter sur un cube »
// - solide_patron             → propriété « Le patron », exemple « Le patron du cube » (SVG)
// - solide_defi               → défi dessiné (compter les cubes d'un assemblage) + pièges (intrus, cube ≠ 8 faces)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Un cube dessiné en perspective (le solide de référence du CM2).
const schemaCube = (
  <CanvasRenderer
    figure={{
      kind: "solide_3d",
      solide: "cube",
      labels: { cote: "arête", aireBase: "face carrée" },
      display: { showLabels: true },
    }}
  />
);

// Le pavé droit avec ses trois dimensions (la boîte à chaussures).
const schemaPave = (
  <CanvasRenderer
    figure={{
      kind: "solide_3d",
      solide: "pave_droit",
      dimensions: { longueur: 4, largeur: 2, hauteur: 3 },
      labels: { longueur: "longueur", largeur: "largeur", hauteur: "hauteur" },
      display: { showLabels: true, showDimensions: true },
    }}
  />
);

// Le cylindre (la boîte de conserve, la citerne d'eau de pluie).
const schemaCylindre = (
  <CanvasRenderer
    figure={{
      kind: "solide_3d",
      solide: "cylindre",
      labels: { aireBase: "base ronde" },
      display: { showLabels: true },
    }}
  />
);

// Un assemblage de petits cubes : on COMPTE (sans oublier les cubes cachés).
function cubes6() {
  // 4 cubes au sol (carré 2 × 2) + 2 cubes posés dessus = 6 en tout.
  return [
    { x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 },
    { x: 0, y: 1, z: 0 }, { x: 1, y: 1, z: 0 },
    { x: 0, y: 0, z: 1 }, { x: 1, y: 0, z: 1 },
  ];
}
const schemaAssemblage = (
  <CanvasRenderer
    figure={{
      kind: "solide_3d",
      solide: "assemblage_cubes",
      cubes: cubes6(),
      display: { showLabels: true },
    }}
  />
);

// Le patron du cube : 6 carrés en croix, qu'on plie pour obtenir le cube.
const patronCube = (
  <svg viewBox="0 0 300 240" role="img" aria-label="Patron du cube : six carrés en croix" className="mx-auto h-auto w-full max-w-xs">
    <rect x="0" y="0" width="300" height="240" fill="#f7faff" rx="10" />
    {[
      [90, 20], // haut
      [90, 80], [30, 80], [150, 80], [210, 80], // rangée du milieu (4 carrés)
      [90, 140], // bas
    ].map(([x, y], i) => (
      <rect key={i} x={x} y={y} width="60" height="60" fill="#2563af" stroke="#072a4a" strokeWidth="3" />
    ))}
    <text x="150" y="215" textAnchor="middle" fontSize="20" fontWeight="700" fill="#16a35a">
      6 carrés → on plie → un cube
    </text>
  </svg>
);

const pieges = [
  "Confondre une face et un sommet : le cube a 6 faces mais 8 sommets. « 8 », ce sont les coins, pas les faces !",
  "Oublier les arêtes ou les sommets cachés derrière le solide quand on compte (ou les cubes cachés d'un assemblage).",
  "Croire que tous les solides sont des polyèdres : le cylindre, le cône et la boule ont une surface courbe, ce ne sont PAS des polyèdres.",
];

const aRetenir = [
  "Un solide est une figure de l'espace : il a de l'épaisseur (3 dimensions), contrairement à une figure plane dessinée sur la feuille.",
  "Sur un polyèdre : une face est une surface plane, une arête est le segment où deux faces se touchent, un sommet est un coin (point).",
  "Le cube et le pavé droit ont tous les deux 6 faces, 8 sommets et 12 arêtes. Un patron est la figure à plat qui, pliée, donne le solide.",
];

export const ficheSolidesCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "solide",
  titre: "Les solides",
  accroche:
    "Un solide, c'est un objet de l'espace : un dé, une boîte, un ballon, une citerne. On apprend à les reconnaître, à nommer leurs faces, arêtes et sommets, et à lire leur patron.",
  identite: [
    { label: "Mots clés", valeur: "Face, arête, sommet, polyèdre, patron, base" },
    { label: "Le secret", valeur: "Un solide est en 3 dimensions : il a de l'épaisseur, il occupe de la place" },
    { label: "Les vedettes", valeur: "Cube, pavé droit, cylindre, cône, boule, pyramide" },
  ],
  definition: {
    texte:
      "Un solide est une figure de l'espace : il a trois dimensions (longueur, largeur, hauteur) et occupe de la place, contrairement à une figure plane qui est plate sur la feuille. Un solide est délimité par des faces. Quand toutes ses faces sont planes, on l'appelle un polyèdre (comme le cube ou la pyramide). D'autres solides ont une surface courbe (le cylindre, le cône, la boule).",
  },
  figure: {
    schema: schemaCube,
    legende: "Le cube : 6 faces carrées, 8 sommets (les coins) et 12 arêtes (les segments).",
  },
  proprietes: [
    {
      titre: "Face, arête, sommet",
      texte:
        "Une face est une surface (plane sur un polyèdre). Une arête est le segment où deux faces se rencontrent. Un sommet est un coin, le point où des arêtes se rejoignent.",
    },
    {
      titre: "Le cube et le pavé droit",
      texte:
        "Le cube a 6 faces carrées, le pavé droit a 6 faces rectangulaires. Tous les deux ont 8 sommets et 12 arêtes.",
    },
    {
      titre: "Les solides ronds",
      texte:
        "Le cylindre a 2 bases rondes (des disques) et une surface courbe. Le cône a 1 base ronde et 1 sommet pointu. La boule est entièrement courbe : elle n'a aucune face plane.",
    },
    {
      titre: "Le patron",
      texte:
        "Un patron est une figure plane que l'on découpe et que l'on plie pour obtenir le solide. Le patron d'un cube contient 6 carrés ; celui d'un pavé droit, 6 rectangles ; celui d'un cylindre, 2 disques et 1 rectangle.",
    },
  ],
  reel: {
    texte:
      "Les solides sont partout à La Réunion : une citerne d'eau de pluie ronde est un cylindre, un ballon sur la plage de Saint-Pierre est une boule, une boîte de conserve d'ananas Victoria est un cylindre, un dé de jeu de société est un cube, une brique de lait est un pavé droit. Reconnaître le solide aide à choisir la bonne formule quand on calcule des volumes plus tard.",
  },
  historique: {
    texte:
      "Les Grecs de l'Antiquité étaient fascinés par cinq solides très réguliers (les « solides de Platon », comme le cube). Le mot « polyèdre » vient du grec « polus » (« plusieurs ») et « hedra » (« face ») : un solide à plusieurs faces.",
  },
  methode: [
    { titre: "Je regarde les faces", texte: "Sont-elles toutes planes (polyèdre) ou y a-t-il une surface courbe (cylindre, cône, boule) ?" },
    { titre: "Je compte", texte: "Je compte les faces, puis les sommets (les coins), puis les arêtes (les segments), sans oublier ceux qui sont cachés derrière." },
    { titre: "Je nomme", texte: "D'après ce que je vois, je donne le nom : cube, pavé droit, cylindre, cône, boule ou pyramide." },
  ],
  usages: [
    { titre: "Reconnaître", detail: "À quel solide ressemble cet objet du quotidien (dé, boîte, ballon, citerne) ?" },
    { titre: "Décrire", detail: "Combien de faces, de sommets, d'arêtes ? De quelle forme sont les faces ?" },
    { titre: "Lire un patron", detail: "Cette figure à plat, une fois pliée, donne-t-elle bien le solide ?" },
  ],
  exemples: [
    {
      titre: "Compter sur un cube",
      donnees: "On observe un cube (un dé).",
      question: "Combien a-t-il de faces, de sommets et d'arêtes ?",
      schema: schemaCube,
      solution:
        "Un cube a 6 faces (toutes carrées), 8 sommets (les coins) et 12 arêtes (les segments). Attention : les 8, ce sont les sommets, pas les faces !",
    },
    {
      titre: "Reconnaître un solide rond",
      donnees: "Une boîte de conserve d'ananas Victoria.",
      question: "Quel solide est-ce, et combien a-t-il de bases ?",
      schema: schemaCylindre,
      solution:
        "C'est un cylindre : il a 2 bases rondes (deux disques, en haut et en bas) et une surface courbe autour. Ce n'est pas un polyèdre, car sa surface n'est pas plane.",
    },
    {
      titre: "Compter des cubes cachés",
      donnees: "Un assemblage de petits cubes unités.",
      question: "Combien de cubes le composent ?",
      schema: schemaAssemblage,
      solution:
        "On compte couche par couche : 4 cubes au sol (un carré 2 × 2) et 2 cubes posés dessus, soit 6 cubes en tout. Il ne faut pas oublier ceux qui sont cachés derrière.",
    },
    {
      titre: "Lire le patron du cube",
      donnees: "Une figure plane faite de 6 carrés en croix.",
      question: "Que forme-t-elle quand on la plie ?",
      schema: patronCube,
      solution:
        "Elle forme un cube : ses 6 carrés deviennent les 6 faces. Un patron de cube contient toujours 6 carrés.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Combien de faces, de sommets et d'arêtes possède un pavé droit ?",
      correction:
        "6 faces (rectangulaires), 8 sommets et 12 arêtes — comme le cube. Seule la forme des faces change (rectangles au lieu de carrés).",
    },
    {
      question: "Une balle de tennis, c'est quel solide ? A-t-elle des faces planes ?",
      correction:
        "C'est une boule. Elle n'a aucune face plane : elle est entièrement courbe.",
    },
    {
      question: "Quel est l'intrus : cube, pavé droit, pyramide, cylindre ?",
      correction:
        "Le cylindre : il a une surface courbe. Les trois autres sont des polyèdres (toutes leurs faces sont planes).",
    },
    {
      question: "Combien de carrés faut-il pour dessiner le patron d'un cube ?",
      correction:
        "6 carrés, un pour chaque face du cube.",
    },
    {
      question: "Un élève dit : « Un cube a 8 faces. » A-t-il raison ?",
      correction:
        "Non. Un cube a 6 faces. Il a confondu avec les 8 sommets (les coins).",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesSolidesCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Solides - CM2",
    section: {
      type: "objectif",
      phrase: "Reconnaître, décrire et lire le patron d'un solide",
      sousPhrase:
        "Un solide est un objet de l'espace : un dé, une boîte, un ballon. On apprend à nommer ses faces, arêtes et sommets.",
      encadre: {
        titre: "L'idée",
        texte: "Un solide a 3 dimensions : il a de l'épaisseur, il occupe de la place.",
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
          "Une citerne d'eau (cylindre), un ballon à Saint-Pierre (boule), une brique de lait (pavé droit), un dé (cube).",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Polyèdre » vient du grec polus (« plusieurs ») et hedra (« face ») : un solide à plusieurs faces planes.",
      },
    },
  },
  {
    titre: "Le vocabulaire",
    badge: "Face, arête, sommet",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Face", texte: "Une surface du solide (plane sur un polyèdre)." },
        { titre: "Arête", texte: "Le segment où deux faces se rencontrent." },
        { titre: "Sommet", texte: "Un coin : le point où des arêtes se rejoignent." },
      ],
    },
  },
  {
    titre: "Les solides à connaître",
    badge: "Les vedettes",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Cube & pavé droit", texte: "6 faces, 8 sommets, 12 arêtes. Carrées pour le cube, rectangulaires pour le pavé." },
        { titre: "Cylindre & cône", texte: "Des solides ronds : 2 bases rondes pour le cylindre, 1 base et 1 sommet pour le cône." },
        { titre: "Boule", texte: "Entièrement courbe : aucune face plane." },
      ],
    },
  },
  {
    titre: "Compter sur un cube",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "On observe un cube (un dé).",
      question: "Combien a-t-il de faces, de sommets et d'arêtes ?",
      correction: "6 faces, 8 sommets et 12 arêtes. Les 8, ce sont les coins (sommets), pas les faces !",
    },
  },
  {
    titre: "Le patron",
    badge: "À plat, puis on plie",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "C'est quoi ?",
        contenu: "Une figure plane qu'on découpe et qu'on plie pour former le solide.",
      },
      droite: {
        variante: "ok",
        titre: "Le cube",
        contenu: "Son patron contient 6 carrés : un pour chaque face.",
      },
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
      enonce: "On range quatre solides : cube, pavé droit, pyramide, cylindre.",
      question: "Quel est l'intrus ?",
      indice: "Cherche le solide qui a une surface courbe.",
      correction: "Le cylindre : il a une surface courbe. Les autres sont des polyèdres (faces planes).",
    },
  },
];
