// ─── Fiche de cours : le parallélogramme (4e) ──────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach (4e/maths/parallelogrammes.bank.ts).
// Micro-compétences couvertes → blocs :
//   quadrilatere_parallelogramme_reconnaitre → Propriété « Ce qui n'en est pas un », méthode « Reconnaître », usage 1
//   quadrilatere_parallelogramme_propriete   → Définition, figure, propriété « Ce qui est égal », exemple 1
//   quadrilatere_parallelogramme_diagonale   → Propriété « Les diagonales se coupent en leur milieu », usage 2
//   quadrilatere_parallelogramme_montrer     → Méthode « Montrer », usage 2, exemple 2
//   quadrilatere_parallelogramme_aire        → Propriété « La hauteur n'est pas le côté », formule, méthode « Calculer », exemple 3
//   quadrilatere_parallelogramme_probleme    → Exemple 3, exercice 3
//   quadrilatere_parallelogramme_defi        → Exercice 4
//
// ⭐ LE PIÈGE DE CETTE FICHE EST ÉVIDENT : sept parallélogrammes dessinés pareil,
// ce sont sept règles identiques aux yeux d'un élève. On a donc changé ce que
// chaque dessin MONTRE, en gardant le même objet :
//   · la DÉFINITION       → les marques de parallélisme, et rien d'autre ;
//   · le CONTRE-EXEMPLE   → un trapèze : un seul couple de côtés parallèles ;
//   · les PROPRIÉTÉS      → le codage des côtés et des angles égaux ;
//   · les DIAGONALES      → les deux diagonales et leur point de croisement ;
//   · l'AIRE              → la hauteur tracée en pointillés, avec son angle droit.
// Cinq informations différentes sur la même figure, et pas cinq fois la même image.
//
// ⭐ ET LA FORMULE SE DÉMONTRE EN DESSIN : `figure_libre` sur quadrillage montre
// le parallélogramme et le rectangle de MÊME AIRE qu'on obtient en coupant le
// triangle de gauche pour le recoller à droite. « base × hauteur » cesse d'être
// une formule à retenir : c'est un rectangle déguisé.
//
// Les nombres sont ceux de la banque : base 12 et hauteur 6, base 15 et hauteur 8,
// et le parallélogramme de 7 cm sur 6 cm de hauteur.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const BLEU = "#2563eb";
const ROUGE = "#dc2626";

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// Le parallélogramme ABCD, dans une seule et même position sur toute la fiche —
// l'élève doit reconnaître la MÊME figure d'un bloc à l'autre, ce qui change est
// ce qu'on y montre.
// ⛔ Les points tiennent dans 30…200 : le canvas `quadrilatere` dessine sur des
// points fixes, donc serrer le seul cadre rognerait les étiquettes (mesuré sur la
// fiche de Pythagore le 25/08).
const PARALLELOGRAMME = {
  A: { x: 30, y: 140 },
  B: { x: 130, y: 140 },
  C: { x: 200, y: 45 },
  D: { x: 100, y: 45 },
};

const parallelogramme = (opts: {
  sideLabels?: Partial<Record<"AB" | "BC" | "CD" | "DA", string>>;
  display?: { showDiagonals?: boolean };
  marks?: {
    parallelSides?: Array<[string, string]>;
    equalSides?: Array<[string, string]>;
    equalAngles?: Array<[string, string]>;
  };
  hauteur?: { fromVertex: "A" | "B" | "C" | "D"; onSide: "AB" | "BC" | "CD" | "DA"; label?: string };
  bloc?: "carte" | "exemple";
}) => {
  const petit = opts.bloc === "exemple";
  const k = petit ? 0.88 : 1;
  const largeur = petit ? 208 : 228;
  return (
    <CanvasRenderer
      figure={
        {
          kind: "quadrilatere",
          size: { width: largeur, height: Math.round(largeur * 0.79) },
          points: {
            A: { x: PARALLELOGRAMME.A.x * k, y: PARALLELOGRAMME.A.y * k },
            B: { x: PARALLELOGRAMME.B.x * k, y: PARALLELOGRAMME.B.y * k },
            C: { x: PARALLELOGRAMME.C.x * k, y: PARALLELOGRAMME.C.y * k },
            D: { x: PARALLELOGRAMME.D.x * k, y: PARALLELOGRAMME.D.y * k },
          },
          labels: { A: "A", B: "B", C: "C", D: "D" },
          sideLabels: opts.sideLabels,
          display: {
            showPoints: true,
            showLabels: true,
            showSides: true,
            showAngles: false,
            showDiagonals: opts.display?.showDiagonals ?? false,
          },
          marks: opts.marks,
          height: opts.hauteur,
        } as never
      }
    />
  );
};

// ⭐ LE CONTRE-EXEMPLE, et c'est le dessin le plus utile de la fiche. Un trapèze :
// UN SEUL couple de côtés parallèles. L'élève qui n'a vu que des parallélogrammes
// croit que « penché » suffit. Ici la figure est penchée, et ce n'en est pas un.
const pasUnParallelogramme = legende(
  <CanvasRenderer
    figure={
      {
        kind: "quadrilatere",
        size: { width: 228, height: 180 },
        points: {
          A: { x: 30, y: 140 },
          B: { x: 200, y: 140 },
          C: { x: 165, y: 45 },
          D: { x: 90, y: 45 },
        },
        labels: { A: "A", B: "B", C: "C", D: "D" },
        display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
        marks: { parallelSides: [["AB", "CD"]] },
      } as never
    }
  />,
  "un seul couple de parallèles : c'est un trapèze"
);

// AVANT LA FIGURE, IL Y A DEUX COUPLES DE PARALLÈLES. C'est le geste de la
// méthode « Reconnaître » : on cherche les marques, pas la forme. Aucun canvas
// `quadrilatere` ne montre ça, puisqu'il dessine toujours la figure déjà fermée.
const deuxCouplesDeParalleles = (
  <CanvasRenderer
    figure={{
      kind: "droites",
      size: { width: 228, height: 165 },
      lines: [
        { id: "h1", type: "droite", from: { x: 20, y: 120 }, to: { x: 195, y: 120 }, color: BLEU, display: { showArrows: false, showLabel: false } },
        { id: "h2", type: "droite", from: { x: 45, y: 45 }, to: { x: 220, y: 45 }, color: BLEU, display: { showArrows: false, showLabel: false } },
        { id: "o1", type: "droite", from: { x: 35, y: 145 }, to: { x: 95, y: 25 }, color: ROUGE, display: { showArrows: false, showLabel: false } },
        { id: "o2", type: "droite", from: { x: 145, y: 145 }, to: { x: 205, y: 25 }, color: ROUGE, display: { showArrows: false, showLabel: false } },
      ],
    }}
  />
);

// ⭐ LA FORMULE SE DÉMONTRE, ELLE NE SE RETIENT PAS. Sur quadrillage, le
// parallélogramme de base 6 et de hauteur 4 occupe exactement les 24 carreaux du
// rectangle 6 × 4 : on coupe le triangle qui dépasse à droite, on le recolle à
// gauche. `figure_libre` est le seul canvas qui compte des carreaux.
const rectangleDeguise = legende(
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { width: 210, height: 150, cellSize: 26 },
      grid: {
        rows: 4,
        cols: 6,
        filledCells: Array.from({ length: 4 }, (_, r) =>
          Array.from({ length: 6 }, (_, c) => [r, c] as [number, number])
        ).flat(),
      },
      display: { showGrid: true, showFilled: true },
      colors: { filled: "#bfdbfe", border: BLEU },
    }}
  />,
  "6 × 4 = 24 carreaux, comme le rectangle"
);

// LE CALCUL, POSÉ. Une fois la hauteur repérée, il reste une multiplication —
// avec les nombres de la banque.
const aireCalculee = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "multiplication",
      numbers: ["12", "6"],
      result: "72",
      display: { showResult: true, compact: true },
      questionLabel: "base × hauteur = 72 cm²",
    }}
  />
);

// LES TROIS CHEMINS POUR MONTRER QU'UN QUADRILATÈRE EN EST UN. Ce n'est pas une
// figure, c'est une liste de conditions — et c'est exactement ce qu'un tableau
// montre mieux qu'un dessin.
const troisChemins = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Ce que je sais", "Ce que je conclus"],
      rows: [
        { values: ["2 couples de côtés //", "parallélogramme"] },
        { values: ["côtés opposés égaux", "parallélogramme"] },
        { values: ["diagonales de même milieu", "parallélogramme"] },
      ],
      display: { compact: true, striped: true },
    }}
  />
);

const pieges = [
  "Prendre le côté oblique pour la hauteur : la hauteur est perpendiculaire à la base, et elle tombe souvent en dehors de la figure.",
  "Croire qu'un quadrilatère penché est forcément un parallélogramme : le trapèze aussi est penché, mais il n'a qu'un seul couple de côtés parallèles.",
  "Confondre « les diagonales se coupent » et « les diagonales se coupent en leur milieu » : c'est le milieu qui fait la propriété, pas le croisement.",
];

const aRetenir = [
  "Un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.",
  "Ses côtés opposés sont égaux, ses angles opposés sont égaux, et ses diagonales se coupent en leur milieu.",
  "Son aire vaut base × hauteur, où la hauteur est perpendiculaire à la base — jamais le côté oblique.",
];

export const ficheParallelogramme4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "quadrilatere-parallelogramme",
  titre: "Le parallélogramme",
  accroche:
    "Un parallélogramme, c'est un rectangle qu'on a poussé de côté. Tout ce qui compte y reste : les côtés opposés sont toujours égaux, les diagonales se coupent toujours en leur milieu, et son aire vaut encore base × hauteur.",
  identite: [
    { label: "La définition", valeur: "Deux couples de côtés parallèles" },
    { label: "Le point de croisement", valeur: "Les diagonales s'y coupent en leur milieu" },
    { label: "Le piège", valeur: "La hauteur, qui n'est pas le côté oblique" },
  ],
  definition: {
    texte:
      "Un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux. C'est la seule condition : dès qu'elle est vérifiée, toutes les autres propriétés en découlent — les côtés opposés sont égaux, les angles opposés sont égaux, et les diagonales se coupent en leur milieu.",
  },
  figure: {
    schema: parallelogramme({
      marks: { parallelSides: [["AB", "CD"], ["BC", "DA"]] },
    }),
    legende: "Deux couples de côtés parallèles : (AB) // (CD) et (BC) // (DA).",
  },
  proprietes: [
    {
      titre: "Ce qui n'en est pas un",
      micros: ["quadrilatere_parallelogramme_reconnaitre"],
      texte:
        "Être penché ne suffit pas. Ce trapèze n'a qu'un seul couple de côtés parallèles : ses côtés opposés ne sont pas égaux et ses diagonales ne se coupent pas en leur milieu.",
      schema: pasUnParallelogramme,
    },
    {
      titre: "Ce qui est égal",
      micros: ["quadrilatere_parallelogramme_propriete"],
      texte:
        "Les côtés opposés sont égaux deux à deux, et les angles opposés aussi. Deux angles qui se suivent, eux, font toujours 180° ensemble.",
      schema: parallelogramme({
        marks: {
          equalSides: [["AB", "CD"], ["BC", "DA"]],
          equalAngles: [["A", "C"], ["B", "D"]],
        },
      }),
    },
    {
      titre: "Les diagonales se coupent en leur milieu",
      micros: ["quadrilatere_parallelogramme_diagonale"],
      texte:
        "Le point où les deux diagonales se croisent est le milieu de chacune. C'est le centre de la figure, et c'est souvent le plus rapide des trois chemins pour démontrer.",
      schema: parallelogramme({ display: { showDiagonals: true } }),
    },
    {
      titre: "La hauteur n'est pas le côté",
      micros: ["quadrilatere_parallelogramme_aire"],
      texte:
        "La hauteur est perpendiculaire à la base, pas le long du côté oblique. Elle est toujours plus courte que lui, et son pied peut tomber en dehors de la figure.",
      schema: parallelogramme({
        sideLabels: { AB: "base" },
        hauteur: { fromVertex: "D", onSide: "AB", label: "hauteur" },
      }),
    },
  ],
  reel: {
    texte:
      "Le parallélogramme est la forme des choses qui se déforment sans se casser. À La Réunion, c'est le portail en croisillons qu'on replie, le pantographe d'un vieux train, le vérin d'un cric de voiture, la barrière de chantier accordéon. Les côtés gardent leur longueur, seuls les angles changent : c'est pourquoi un cadre rectangulaire mal fixé finit toujours en parallélogramme, et pourquoi les charpentiers ajoutent une diagonale pour l'en empêcher.",
  },
  historique: {
    texte:
      "Euclide démontre déjà les propriétés du parallélogramme dans les Éléments, vers 300 avant notre ère : c'est la proposition 34 du livre I. Sa démonstration ne mesure rien — elle découpe la figure en deux triangles par une diagonale et montre qu'ils sont superposables. C'est encore la démonstration qu'on enseigne aujourd'hui, vingt-trois siècles plus tard.",
  },
  formule: {
    contexte: "Pour un parallélogramme de base b et de hauteur h",
    expression: "aire = b × h",
    legende:
      "C'est l'aire du rectangle de mêmes base et hauteur : le triangle qui dépasse d'un côté est exactement celui qui manque de l'autre.",
    schema: rectangleDeguise,
  },
  methode: [
    {
      titre: "Reconnaître",
      micros: ["quadrilatere_parallelogramme_reconnaitre"],
      texte:
        "On ne regarde pas la forme, on cherche les marques : deux couples de droites parallèles. S'il n'y en a qu'un, c'est un trapèze, et aucune propriété du parallélogramme ne s'applique.",
      schema: legende(deuxCouplesDeParalleles, "deux couples de parallèles"),
    },
    {
      titre: "Montrer",
      micros: ["quadrilatere_parallelogramme_montrer"],
      texte:
        "Trois chemins mènent à la conclusion, et un seul suffit. On choisit celui dont l'énoncé donne déjà les données — le plus souvent celui des diagonales.",
      schema: troisChemins,
    },
    {
      titre: "Calculer l'aire",
      micros: ["quadrilatere_parallelogramme_aire"],
      texte:
        "On repère d'abord la base, puis la hauteur qui lui est perpendiculaire — surtout pas le côté oblique. Ensuite, une seule multiplication, et l'unité est en cm².",
      schema: aireCalculee,
    },
  ],
  usages: [
    {
      titre: "Reconnaître la figure",
      micros: ["quadrilatere_parallelogramme_reconnaitre"],
      detail:
        "On vérifie les deux couples de côtés parallèles sur le codage. Si un seul couple est marqué, c'est un trapèze et non un parallélogramme.",
    },
    {
      titre: "Démontrer qu'en est un",
      micros: ["quadrilatere_parallelogramme_montrer", "quadrilatere_parallelogramme_diagonale"],
      detail:
        "On choisit le chemin qui colle aux données : côtés parallèles, côtés opposés égaux, ou diagonales de même milieu. Une seule condition suffit.",
    },
    {
      titre: "Calculer une aire",
      micros: ["quadrilatere_parallelogramme_aire"],
      detail:
        "On multiplie la base par la hauteur perpendiculaire à cette base. Deux couples base-hauteur donnent la même aire : c'est un bon contrôle.",
    },
  ],
  exemples: [
    {
      titre: "Le côté qui manque",
      micros: ["quadrilatere_parallelogramme_propriete"],
      donnees: "ABCD est un parallélogramme. On mesure AB = 7 cm et BC = 5 cm.",
      question: "Combien mesurent CD et DA ?",
      schema: parallelogramme({
        bloc: "exemple",
        sideLabels: { AB: "7 cm", BC: "5 cm", CD: "?", DA: "?" },
      }),
      solution:
        "Dans un parallélogramme, les côtés opposés sont égaux. Or CD est le côté opposé à AB, donc CD = AB = 7 cm. De même, DA est le côté opposé à BC, donc DA = BC = 5 cm. Contrôle : le périmètre vaut 2 × (7 + 5) = 24 cm.",
    },
    {
      titre: "Le prouver par les diagonales",
      micros: ["quadrilatere_parallelogramme_montrer", "quadrilatere_parallelogramme_diagonale"],
      donnees:
        "ABCD est un quadrilatère. On sait que ses diagonales [AC] et [BD] se coupent en un point O qui est le milieu de chacune d'elles.",
      question: "ABCD est-il un parallélogramme ?",
      schema: parallelogramme({ bloc: "exemple", display: { showDiagonals: true } }),
      solution:
        "Oui. Si les diagonales d'un quadrilatère se coupent en leur milieu, alors ce quadrilatère est un parallélogramme. C'est l'un des trois chemins possibles, et ici c'est celui que l'énoncé donne directement : il n'y a rien d'autre à vérifier.",
    },
    {
      titre: "L'aire de la parcelle",
      micros: ["quadrilatere_parallelogramme_aire", "quadrilatere_parallelogramme_probleme"],
      donnees:
        "Une parcelle en forme de parallélogramme a une base de 12 m. Le côté oblique mesure 8 m, et la hauteur relative à la base mesure 6 m.",
      question: "Quelle est l'aire de la parcelle ?",
      schema: parallelogramme({
        bloc: "exemple",
        sideLabels: { AB: "12 m", BC: "8 m" },
        hauteur: { fromVertex: "D", onSide: "AB", label: "6 m" },
      }),
      solution:
        "L'aire d'un parallélogramme vaut base × hauteur. La base est 12 m et la hauteur est 6 m : l'aire vaut 12 × 6 = 72 m². Attention, le côté de 8 m ne sert à rien ici — c'est le côté oblique, pas la hauteur. Il n'est là que pour le périmètre.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Un quadrilatère a un seul couple de côtés parallèles. Est-ce un parallélogramme ?",
      correction:
        "Non, c'est un trapèze. Le parallélogramme demande DEUX couples de côtés parallèles. Avec un seul, les côtés opposés ne sont pas forcément égaux et les diagonales ne se coupent pas en leur milieu.",
      micros: ["quadrilatere_parallelogramme_reconnaitre"],
    },
    {
      question:
        "Dans un parallélogramme ABCD, l'angle en A mesure 65°. Combien mesurent les angles B, C et D ?",
      correction:
        "Les angles opposés sont égaux, donc C = A = 65°. Deux angles consécutifs font 180°, donc B = 180 − 65 = 115°, et D = B = 115°. Contrôle : 65 + 115 + 65 + 115 = 360°, ce qui est bien la somme des angles d'un quadrilatère.",
      micros: ["quadrilatere_parallelogramme_propriete"],
    },
    {
      question:
        "Un parallélogramme a une base de 15 cm, un côté oblique de 10 cm et une hauteur de 8 cm. Quelle est son aire ?",
      correction:
        "L'aire vaut base × hauteur, soit 15 × 8 = 120 cm². Le côté de 10 cm est le côté oblique : il ne sert pas au calcul de l'aire. C'est le piège le plus fréquent de la notion.",
      micros: ["quadrilatere_parallelogramme_aire", "quadrilatere_parallelogramme_probleme"],
    },
    {
      question:
        "Pourquoi un charpentier ajoute-t-il une diagonale dans un cadre rectangulaire ?",
      correction:
        "Parce qu'un cadre dont les quatre côtés gardent leur longueur peut se déformer en parallélogramme : seuls les angles changent. La diagonale fixe deux triangles, et un triangle dont les trois côtés sont fixés ne se déforme pas. C'est ce qui rend la structure rigide.",
      micros: ["quadrilatere_parallelogramme_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesParallelogramme4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Le parallélogramme - 4e",
    section: {
      type: "objectif",
      phrase: "Reconnaître, démontrer, calculer une aire",
      sousPhrase:
        "Un quadrilatère dont les côtés opposés sont parallèles deux à deux. Tout le reste en découle.",
      encadre: {
        titre: "L'idée",
        texte: "C'est un rectangle qu'on a poussé de côté : même aire, mêmes longueurs.",
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
          "Le portail en croisillons, le cric d'une voiture, la barrière de chantier accordéon, et le cadre mal fixé qui finit de travers.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Euclide le démontre vers 300 avant notre ère, sans rien mesurer : il coupe la figure en deux triangles superposables.",
      },
    },
  },
  {
    titre: "Ce qui n'en est pas un",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "Penché ne veut pas dire parallélogramme",
      sousPhrase:
        "Le trapèze est penché lui aussi, mais il n'a qu'un seul couple de côtés parallèles.",
      encadre: {
        titre: "Attention",
        texte: "On cherche les marques de parallélisme, pas la forme générale.",
      },
    },
  },
  {
    titre: "Les trois chemins pour démontrer",
    badge: "3 repères",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Par les côtés //", texte: "Deux couples de côtés parallèles : c'est la définition elle-même." },
        { titre: "Par les longueurs", texte: "Les côtés opposés sont égaux deux à deux." },
        { titre: "Par les diagonales", texte: "Elles se coupent en leur milieu — souvent le plus rapide." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheParallelogramme4e.methode.map((m) => ({
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
      cartes: ficheParallelogramme4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "L'aire de la parcelle",
    section: {
      type: "exemple",
      enonce: "Base 12 m, côté oblique 8 m, hauteur 6 m.",
      question: "Quelle est l'aire ?",
      correction:
        "12 × 6 = 72 m². Le côté de 8 m ne sert pas : ce n'est pas la hauteur.",
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
      enonce: "Base 15 cm, côté oblique 10 cm, hauteur 8 cm.",
      question: "Quelle est l'aire ?",
      indice: "Un seul des deux nombres sert.",
      correction:
        "15 × 8 = 120 cm². Le côté de 10 cm est oblique : il ne compte pas dans l'aire.",
    },
  },
];
