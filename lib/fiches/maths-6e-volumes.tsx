// ─── Fiche de cours : les volumes (6e) ─────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/volumes.bank.ts (notion volume_solide).
//
// Micro-compétences couvertes → blocs :
// - volume_unite      → définition, carte d'identité, usage « Lire une mesure »,
//                       piège « cm² vs cm³ », exercices 1 et slide unités
// - volume_compter    → propriété « Compter les cubes », usage, exemple 1,
//                       exercice 2
// - volume_comparer   → propriété « Comparer deux solides », usage, exercice 3
// - volume_assemblage → propriété « Assembler des solides », usage, exercice 4
// - volume_lire       → usage « Lire une mesure », exemple 1, à retenir
// - volume_defi       → formule du pavé droit (défis de la banque), exemple 2,
//                       exercice 4, slide « Défi »

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Un assemblage de petits cubes unités (canvas solide_3d du coach) : le volume
// se MONTRE en comptant les cubes, exactement comme dans les exercices.
function cubesPave(longueur: number, largeur: number, hauteur: number) {
  const cubes: Array<{ x: number; y: number; z: number }> = [];
  for (let z = 0; z < hauteur; z++)
    for (let y = 0; y < largeur; y++)
      for (let x = 0; x < longueur; x++) cubes.push({ x, y, z });
  return cubes;
}

function assemblage(longueur: number, largeur: number, hauteur: number) {
  return (
    <CanvasRenderer
      figure={{
        kind: "solide_3d",
        solide: "assemblage_cubes",
        cubes: cubesPave(longueur, largeur, hauteur),
        display: { showLabels: true },
      }}
    />
  );
}

// Le pavé droit avec ses trois dimensions nommées (pour la formule L × l × h).
function paveLabelle(
  longueur: number,
  largeur: number,
  hauteur: number,
  labels: { longueur?: string; largeur?: string; hauteur?: string },
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "solide_3d",
        solide: "pave_droit",
        dimensions: { longueur, largeur, hauteur },
        // ⚠️ « la base » AU LIEU DE « base rectangulaire ». Le canvas écrit ce
        // mot au centre de la face du bas ; depuis que ses étiquettes sont en
        // 19 px, les 18 signes de « base rectangulaire » s'étalent sur 180 px et
        // touchaient le « l » de la largeur (mesuré). Le mot « rectangulaire »
        // ne dit rien de plus que le dessin.
        labels: { aireBase: "la base", ...labels },
        display: { showLabels: true, showDimensions: true },
      }}
    />
  );
}

// ─── Les six dessins des blocs ────────────────────────────────────────────────
// ⭐ QUATRE PAVÉS ÉTAIENT DÉJÀ LÀ, TOUS RECTANGULAIRES (4×2×2, 4×2×3, 5×1×3,
// 2×3×2). En ajouter six autres du même genre aurait fait dix boîtes qui se
// ressemblent (REGLES.md § 2 bis). Ce qui distingue les six nouveaux : un
// empilement IRRÉGULIER là où il faut compter, deux solides de MÊME volume et de
// formes différentes, une soudure visible en L, et un tableau — parce que
// « cm³ n'est pas cm² » est une affaire d'écriture, pas de solide.

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// ⛔ ON EMPILE, ON NE JUXTAPOSE PAS (§ 2 ter) : deux solides côte à côte dans une
// carte de 225 px recevraient 110 px chacun.
const pile = (items: { dessin: React.ReactNode; nom: string }[]) => (
  <div className="grid grid-cols-1 gap-2">
    {items.map((it) => (
      <div key={it.nom}>
        {it.dessin}
        <p className="mt-1 text-center text-xs font-black text-slate-700">{it.nom}</p>
      </div>
    ))}
  </div>
);

/** Un tas de cubes quelconque, décrit case par case. */
function tas(cubes: Array<{ x: number; y: number; z: number }>) {
  return (
    <CanvasRenderer
      figure={{
        kind: "solide_3d",
        solide: "assemblage_cubes",
        cubes,
        display: { showLabels: true },
      }}
    />
  );
}

// DES COUCHES IDENTIQUES, DONC UNE MULTIPLICATION. Trois étages de six cubes :
// on compte une fois, on multiplie. L'exemple 1 fait 3 couches de 5 — ici c'est
// 3 couches de 6, et surtout la couche est un RECTANGLE, pas une ligne.
const troisCouchesDeSix = legende(assemblage(3, 2, 3), "une couche de 6, trois couches : 3 × 6 = 18");

// ⭐ MÊME VOLUME, FORMES DIFFÉRENTES. C'est toute la propriété, et un seul solide
// ne peut pas la dire : il en faut deux, et il faut qu'ils ne se ressemblent pas.
const memeVolumeDeuxFormes = pile([
  { dessin: assemblage(6, 2, 1), nom: "6 × 2 × 1 = 12 cubes" },
  { dessin: assemblage(3, 2, 2), nom: "3 × 2 × 2 = 12 cubes aussi" },
]);

// COLLER, C'EST ADDITIONNER. Les deux morceaux sont montrés SÉPARÉS : la somme
// se fait dans la tête de l'élève, pas dans le dessin. La méthode, plus bas,
// montrera le résultat soudé.
const deuxSolidesSepares = pile([
  { dessin: assemblage(2, 2, 2), nom: "le premier : 8 cubes" },
  { dessin: assemblage(2, 2, 1), nom: "le second : 4 cubes" },
]);

// L'UNITÉ EST UNE AFFAIRE D'ÉCRITURE, PAS DE SOLIDE. Aucun empilement ne peut
// montrer la différence entre cm, cm² et cm³ : c'est le petit chiffre en haut
// qui la fait. Seul dessin de la fiche sans un seul cube.
const lesTroisUnites = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Le petit chiffre décide",
      headers: ["On écrit", "C'est"],
      rows: [
        { values: ["cm", "une longueur"] },
        { values: ["cm²", "une aire"] },
        { values: ["cm³", "un volume"] },
      ],
      highlight: { row: 2 },
    }}
  />
);

// ⭐ CELUI-LÀ NE SE CALCULE PAS : IL SE COMPTE. Neuf cubes au sol, quatre
// au-dessus — aucune formule ne marche, et deux cubes du fond sont cachés par
// ceux de devant. C'est exactement le piège n° 2 de la fiche, dessiné.
const tasIrregulier = legende(
  tas([
    ...[0, 1, 2].flatMap((x) => [0, 1, 2].map((y) => ({ x, y, z: 0 }))),
    { x: 0, y: 0, z: 1 },
    { x: 1, y: 0, z: 1 },
    { x: 0, y: 1, z: 1 },
    { x: 1, y: 1, z: 1 },
  ]),
  "9 au sol + 4 dessus = 13 — sans oublier ceux du fond"
);

// LA SOUDURE SE VOIT. Les deux morceaux de la propriété, recollés : le solide en
// L n'est plus un pavé, et pourtant son volume est bien 8 + 4.
const solideRecolleEnL = legende(
  tas([
    ...[0, 1].flatMap((x) => [0, 1].flatMap((y) => [0, 1].map((z) => ({ x, y, z })))),
    { x: 2, y: 0, z: 0 },
    { x: 2, y: 1, z: 0 },
    { x: 3, y: 0, z: 0 },
    { x: 3, y: 1, z: 0 },
  ]),
  "collés : 8 + 4 = 12 cubes, aucun n'a disparu"
);

const pieges = [
  "Confondre cm² (une aire, une surface plate) et cm³ (un volume, de la place en 3 dimensions).",
  "Oublier des cubes cachés derrière ou en dessous quand on compte un empilement.",
  "Comparer deux volumes écrits dans des unités différentes sans faire attention.",
];

const aRetenir = [
  "Le volume, c'est la place occupée dans l'espace : on le mesure en unités cubes (cm³, m³).",
  "Un solide fait de cubes unités a pour volume le nombre de cubes : on compte, couche par couche.",
  "Quand on assemble deux solides, on additionne leurs volumes ; quand on coupe puis recolle, le volume ne change pas.",
];

const paveDefinition = assemblage(4, 2, 2);
// ⚠️ « L », « l », « h » ET NON LES MOTS EN ENTIER : « largeur » chevauchait la
// mention « base rectangulaire » que le canvas écrit lui-même sous le pavé
// (mesuré). Les trois lettres sont d'ailleurs celles de la formule.
const paveFormule = paveLabelle(4, 2, 3, {
  longueur: "L",
  largeur: "l",
  hauteur: "h",
});
const paveTroisCouches = assemblage(5, 1, 3);
const paveBoite = assemblage(2, 3, 2);

export const ficheVolumes6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "volume-solide",
  titre: "Les volumes",
  accroche:
    "Le volume, c'est la place qu'un objet occupe dans l'espace. En 6e, on le mesure en comptant des petits cubes : compter, comparer, assembler, tout part de là.",
  identite: [
    { label: "Prérequis", valeur: "Multiplication, cube et pavé droit, unités de mesure" },
    { label: "Idée clé", valeur: "Volume = nombre de cubes unités qui remplissent le solide" },
    { label: "Unités", valeur: "cm³ (centimètre cube), m³ (mètre cube)" },
  ],
  definition: {
    texte:
      "Le volume d'un solide est la place qu'il occupe dans l'espace. On le mesure en unités cubes : on compte combien de petits cubes identiques remplissent le solide. Un cube de 1 cm de côté est le cube unité : son volume est 1 cm³.",
  },
  figure: {
    schema: paveDefinition,
    legende: "Le volume = le nombre de petits cubes qui remplissent le solide : on les compte, couche par couche.",
  },
  proprietes: [
    {
      titre: "Compter les cubes",
      micros: ["volume_compter"],
      texte:
        "Un solide construit avec des cubes unités a pour volume le nombre total de cubes. Pour un empilement régulier, on compte une couche, puis on multiplie par le nombre de couches. Exemple : 3 couches de 5 cubes, c'est 3 × 5 = 15 cubes.",
      schema: troisCouchesDeSix,
    },
    {
      titre: "Comparer deux solides",
      micros: ["volume_comparer"],
      texte:
        "Pour comparer deux volumes écrits dans la même unité, on compare simplement les nombres. Deux solides de formes différentes peuvent avoir le même volume : ce qui compte, c'est le nombre de cubes.",
      schema: memeVolumeDeuxFormes,
    },
    {
      titre: "Assembler des solides",
      micros: ["volume_assemblage"],
      texte:
        "Quand on colle deux solides, le volume total est la somme des deux volumes. Et si on coupe un solide en morceaux puis qu'on les recolle, le volume ne change pas : aucun cube n'a disparu.",
      schema: deuxSolidesSepares,
    },
  ],
  reel: {
    texte:
      "Le volume est partout : la taille d'un aquarium pour savoir combien d'eau il contient, le carton de déménagement pour savoir ce qui rentre dedans, le coffre de la voiture avant de partir en vacances, ou la brique de jus au supermarché. À chaque fois, la question est la même : combien de place ?",
  },
  historique: {
    texte:
      "Vers 250 avant J.-C., le savant grec Archimède devait vérifier si la couronne du roi Hiéron était en or pur, sans l'abîmer. Dans son bain, il remarque que son corps fait monter l'eau : un objet plongé dans l'eau déplace exactement son volume. Il aurait crié « Eurêka ! » (« J'ai trouvé ! »). Grâce à cette idée, il mesura le volume de la couronne et prouva que l'orfèvre avait triché.",
  },
  formule: {
    contexte: "Pavé droit rempli de cubes unités (les défis de la fiche)",
    expression: "Volume = L × l × h (longueur × largeur × hauteur)",
    legende: "On compte les cubes d'une couche, puis on multiplie par le nombre de couches.",
    schema: paveFormule,
  },
  methode: [
    {
      titre: "Repérer l'unité",
      micros: ["volume_unite"],
      texte:
        "Le petit 3 signale un volume : cm³, m³. Sans lui, ce n'est pas un volume (cm est une longueur, cm² une aire).",
      schema: lesTroisUnites,
    },
    {
      titre: "Compter les cubes",
      micros: ["volume_compter"],
      texte:
        "On compte les cubes unités couche par couche, sans oublier ceux cachés derrière ou en dessous. Couches identiques : on multiplie.",
      schema: tasIrregulier,
    },
    {
      titre: "Additionner si on assemble",
      micros: ["volume_assemblage"],
      texte:
        "Deux solides collés : on additionne leurs volumes. Un solide coupé puis recollé garde le même volume.",
      schema: solideRecolleEnL,
    },
  ],
  usages: [
    {
      titre: "Compter un volume",
      micros: ["volume_compter"],
      detail:
        "Le solide est fait de cubes unités : son volume est le nombre de cubes. Empilement régulier : nombre de couches × cubes par couche.",
    },
    {
      titre: "Comparer deux volumes",
      micros: ["volume_comparer"],
      detail:
        "Même unité : on compare les nombres. 14 cubes contre 12 cubes : le solide de 14 cubes a le plus grand volume.",
    },
    {
      titre: "Lire et assembler",
      micros: ["volume_lire", "volume_assemblage"],
      detail:
        "Dans « 18 cm³ », le volume vaut 18, soit 18 cubes de 1 cm³. Si on réunit deux solides, on additionne : 4 cubes + 3 cubes = 7 cubes.",
    },
  ],
  exemples: [
    {
      titre: "Compter les cubes d'un pavé",
      micros: ["volume_compter"],
      donnees: "Un pavé est formé de 3 couches de 5 cubes unités chacune.",
      question: "Quel est son volume en cubes unités ?",
      schema: paveTroisCouches,
      solution:
        "Chaque couche contient 5 cubes et il y a 3 couches identiques. On calcule 3 × 5 = 15. Le volume du pavé est 15 cubes unités, soit 15 cm³ si chaque cube vaut 1 cm³.",
    },
    {
      titre: "Remplir une boîte (défi)",
      micros: ["volume_defi"],
      donnees: "Une boîte a pour dimensions 2 cm, 3 cm et 2 cm.",
      question: "Combien de cubes de 1 cm³ faut-il pour la remplir entièrement ?",
      schema: paveBoite,
      solution:
        "On calcule le volume de la boîte : longueur × largeur × hauteur = 2 × 3 × 2 = 12. La boîte a un volume de 12 cm³, il faut donc 12 cubes de 1 cm³ pour la remplir.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Quelle unité choisir pour mesurer le volume d'un aquarium : cm, cm², cm³ ou kg ?",
      correction:
        "Un volume mesure la place occupée en 3 dimensions, donc une unité cube. cm est une longueur, cm² une aire, kg une masse. La bonne réponse est cm³.",
      micros: ["volume_unite", "volume_lire"],
    },
    {
      question: "Un pavé est formé de 2 rangées de 4 cubes unités. Quel est son volume ?",
      correction:
        "On compte les cubes : 2 rangées de 4 cubes, donc 2 × 4 = 8. Le volume est 8 cubes unités.",
    },
    {
      question:
        "Le solide A contient 14 cubes unités, le solide B en contient 12. Lequel a le plus grand volume, et de combien de cubes ?",
      correction:
        "Le volume, c'est le nombre de cubes. 14 est plus grand que 12, donc A a le plus grand volume. L'écart est 14 − 12 = 2 : A a 2 cubes de plus.",
    },
    {
      question:
        "Défi : on assemble un solide de 18 cm³ et un solide de 12 cm³. Quel est le volume total ? Et quel est le volume d'un cube de 3 cm d'arête ?",
      correction:
        "Assembler, c'est additionner : 18 + 12 = 30, donc 30 cm³. Pour le cube : arête × arête × arête = 3 × 3 × 3 = 27, donc 27 cm³.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesVolumes6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Volumes - 6e",
    section: {
      type: "objectif",
      phrase: "Mesurer la place qu'un solide occupe dans l'espace",
      sousPhrase:
        "Le volume se mesure en unités cubes : on compte les petits cubes qui remplissent le solide.",
      encadre: {
        titre: "L'idée",
        texte: "Un cube de 1 cm de côté est le cube unité : son volume vaut 1 cm³.",
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
          "L'eau d'un aquarium, ce qui rentre dans un carton de déménagement, le coffre de la voiture, la brique de jus : le volume répond à la question « combien de place ? ».",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Vers 250 avant J.-C., Archimède découvre dans son bain qu'un objet plongé dans l'eau déplace son volume. Eurêka ! Il prouve que la couronne du roi n'était pas en or pur.",
      },
    },
  },
  {
    titre: "L'unité de volume",
    badge: "cm³ et m³",
    section: {
      type: "objectif",
      phrase: "Un volume se mesure en unités cubes",
      sousPhrase:
        "12 cm est une longueur, 12 cm² une aire, 12 kg une masse. Seul 12 cm³ est un volume.",
      encadre: {
        titre: "Le réflexe",
        texte: "Le petit 3 signale les trois dimensions : longueur, largeur, hauteur.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheVolumes6e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Selon la question",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: ficheVolumes6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Compter les cubes",
    section: {
      type: "exemple",
      enonce: "Un pavé est formé de 3 couches de 5 cubes unités chacune.",
      question: "Quel est son volume ?",
      correction: "3 couches de 5 cubes : 3 × 5 = 15. Le volume est 15 cubes unités.",
    },
  },
  {
    titre: "Défi",
    badge: "Remplir une boîte",
    section: {
      type: "exemple",
      enonce: "Une boîte mesure 2 cm × 3 cm × 2 cm.",
      question: "Combien de cubes de 1 cm³ pour la remplir ?",
      correction: "Volume = 2 × 3 × 2 = 12 cm³, donc 12 cubes de 1 cm³.",
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
      enonce: "On assemble un solide de 8 cubes et un solide de 4 cubes.",
      question: "Quel est le volume total ?",
      indice: "Assembler, c'est additionner les cubes.",
      correction: "8 + 4 = 12. Le volume total est 12 cubes unités.",
    },
  },
];
