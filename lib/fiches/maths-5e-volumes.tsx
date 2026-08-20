// ─── Fiche de cours : les volumes (5e) ─────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/5e/maths/volumes.bank.ts (notionId volume_solide).
// Dessinée par le canvas « solide_3d » du coach (pavé, prisme, cylindre, assemblage).
// ⚠️ Pour compter les cubes : variant « assemblage_cubes » avec la liste explicite
// des cubes (pave_droit + showUnitCubes NE dessine PAS les cubes).
//
// Micro-compétences couvertes :
// - volume_comprendre → définition + figure (assemblage : compter les cubes)
// - volume_pave       → formule + exemple 1 (L × l × h = 72)
// - volume_prisme     → propriété + exemple 2 (aire de base × hauteur = 120)
// - volume_cylindre   → propriété + exemple 3 (aire de base × hauteur = 120)
// - volume_assemblage → exemple 1 (compter les cubes)
// - volume_unite      → propriété « Les unités » (1 L = 1 dm³ = 1000 cm³)
// - volume_defi       → pièges (cm² vs cm³) + défi

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Un pavé rempli de cubes-unité (le volume se COMPTE, comme dans les exercices).
function cubesPave(longueur: number, largeur: number, hauteur: number) {
  const cubes: { x: number; y: number; z: number }[] = [];
  for (let z = 0; z < hauteur; z++)
    for (let y = 0; y < largeur; y++)
      for (let x = 0; x < longueur; x++) cubes.push({ x, y, z });
  return cubes;
}

const assemblage = (l: number, w: number, h: number) => (
  <CanvasRenderer
    figure={{
      kind: "solide_3d",
      solide: "assemblage_cubes",
      cubes: cubesPave(l, w, h),
      display: { showLabels: true },
    }}
  />
);

const pave = (longueur: number, largeur: number, hauteur: number, labels: Record<string, string>) => (
  <CanvasRenderer
    figure={{
      kind: "solide_3d",
      solide: "pave_droit",
      dimensions: { longueur, largeur, hauteur },
      labels,
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }}
  />
);

const prisme = (aireBase: number, hauteur: number, labels: Record<string, string>) => (
  <CanvasRenderer
    figure={{
      kind: "solide_3d",
      solide: "prisme",
      dimensions: { aireBase, hauteur },
      labels,
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }}
  />
);

const cylindre = (aireBase: number, hauteur: number, labels: Record<string, string>) => (
  <CanvasRenderer
    figure={{
      kind: "solide_3d",
      solide: "cylindre",
      dimensions: { aireBase, hauteur },
      labels,
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }}
  />
);

// Un cube isole, pour la propriete des unites : c'est le cube de 1 dm de cote
// qui vaut 1 L — le lien litre/volume ne se raconte pas, il se regarde.
const cube = (coteLabel: string, volumeLabel: string) => (
  // ⚠️ Le canvas dessine les COTES, pas le volume : le label `volume` n'est
  // jamais rendu. L'egalite se pose donc sous la figure.
  <div>
    <CanvasRenderer
      figure={{
        kind: "solide_3d",
        solide: "cube",
        dimensions: { cote: 1 },
        labels: { cote: coteLabel },
        display: { showLabels: true, showDimensions: true },
      }}
    />
    <p className="mt-1 text-center text-xs font-black text-slate-700">{volumeLabel}</p>
  </div>
);

// Deux solides cote a cote : la propriete « prisme ET cylindre » dit que c'est
// LA MEME idee sur deux formes. Un seul dessin le dirait a moitie.
const duo = (gauche: React.ReactNode, gLabel: string, droite: React.ReactNode, dLabel: string) => (
  // ⛔ EMPILE, PAS COTE A COTE. Dans une carte de propriete sur trois colonnes,
  // deux dessins en vis-a-vis recoivent 120 px chacun et deviennent illisibles
  // (Frederic, 20/08 : « on voit rien »). L'un sous l'autre, chacun prend toute
  // la largeur — et la comparaison se lit tout aussi bien.
  <div className="space-y-2">
    <div>
      {gauche}
      <p className="mt-1 text-center text-xs font-black text-slate-700">{gLabel}</p>
    </div>
    <div>
      {droite}
      <p className="mt-1 text-center text-xs font-black text-slate-700">{dLabel}</p>
    </div>
  </div>
);

// Un escalier de cubes : pour COMPTER, il faut une forme qui ne se calcule pas
// d'un coup de L x l x h.
const escalier = (
  <CanvasRenderer
    figure={{
      kind: "solide_3d",
      solide: "assemblage_cubes",
      cubes: [
        { x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }, { x: 2, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 }, { x: 1, y: 1, z: 0 }, { x: 2, y: 1, z: 0 },
        { x: 0, y: 0, z: 1 }, { x: 1, y: 0, z: 1 },
        { x: 0, y: 1, z: 1 }, { x: 1, y: 1, z: 1 },
        { x: 0, y: 0, z: 2 }, { x: 0, y: 1, z: 2 },
      ],
      display: { showLabels: true },
    }}
  />
);

const pieges = [
  "Confondre cm² (une aire, plate) et cm³ (un volume, en 3 dimensions).",
  "Additionner les dimensions d'un pavé : on les MULTIPLIE (5 × 4 × 3, pas 5 + 4 + 3).",
  "Oublier que 1 L = 1 dm³ = 1000 cm³ pour convertir un volume en litres.",
];

const aRetenir = [
  "Volume d'un pavé droit = Longueur × largeur × hauteur.",
  "Prisme et cylindre = aire de base × hauteur (la même idée).",
  "Unités : 1 L = 1 dm³ = 1000 cm³ (le volume est en cm³, m³...).",
];

export const ficheVolumes5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "volume-solide",
  titre: "Les volumes",
  accroche:
    "Le volume, c'est « combien de place ? ». On le mesure en cubes-unité (cm³). En 5e : le pavé, le prisme et le cylindre.",
  identite: [
    { label: "Mots clés", valeur: "Volume, cube, pavé, prisme, cylindre, cm³" },
    { label: "Le secret", valeur: "Aire de base × hauteur" },
    { label: "Outil", valeur: "Les formules et les conversions (L, dm³)" },
  ],
  definition: {
    texte:
      "Le volume d'un solide mesure l'espace qu'il occupe. On le compte en cubes-unité : combien de petits cubes de 1 cm de côté (1 cm³) remplissent le solide. Il s'exprime en unités cubes (cm³, dm³, m³) ou en litres.",
  },
  figure: {
    schema: assemblage(4, 3, 2),
    legende: "Un pavé de 4 × 3 × 2 : il contient 24 cubes-unité, donc son volume est 24 cm³.",
  },
  // Un dessin sous chaque propriete (REGLES.md § 2 bis), et quatre dessins qui
  // ne se ressemblent pas : les trois dimensions d'un pave, DEUX solides cote a
  // cote pour la meme idee, le cube de 1 dm qui vaut 1 L, et un escalier qu'on
  // ne peut compter qu'a la main.
  proprietes: [
    {
      titre: "Le pavé droit",
      texte: "Volume = Longueur × largeur × hauteur (on multiplie les 3 dimensions).",
      schema: pave(5, 4, 3, { longueur: "5 cm", largeur: "4 cm", hauteur: "3 cm" }),
    },
    {
      titre: "Prisme & cylindre",
      texte: "Volume = aire de base × hauteur (une base identique empilée sur une hauteur).",
      schema: duo(
        prisme(12, 5, { aireBase: "aire de base", hauteur: "hauteur" }),
        "prisme",
        cylindre(12, 5, { aireBase: "aire de base", hauteur: "hauteur" }),
        "cylindre"
      ),
    },
    {
      titre: "Les unités",
      texte: "1 L = 1 dm³ = 1000 cm³. Un volume est en cm³, m³ (jamais en cm²).",
      schema: cube("1 dm", "1 dm³ = 1 L = 1000 cm³"),
    },
    {
      titre: "Compter les cubes",
      texte: "Sur un assemblage : nombre de cubes × volume d'un cube.",
      schema: escalier,
    },
  ],
  reel: {
    texte:
      "Le volume répond à « combien ça contient » : l'eau d'un aquarium, ce qui rentre dans un carton de déménagement, le coffre d'une voiture, une brique de jus, une citerne d'eau de pluie à La Réunion.",
  },
  historique: {
    texte:
      "Archimède, au IIIᵉ siècle avant J.-C., a trouvé une façon géniale de mesurer le volume d'un objet irrégulier : le plonger dans l'eau et mesurer combien d'eau déborde. C'est le fameux « Eurêka ! ».",
  },
  formule: {
    contexte: "Le volume d'un pavé droit",
    expression: "V = L × l × h",
    legende: "Exemple : 6 × 4 × 3 = 72 cm³ (l'aire de base 24 cm² × la hauteur 3).",
    schema: pave(6, 4, 3, { longueur: "6 cm", largeur: "4 cm", hauteur: "3 cm", aireBase: "24 cm²" }),
  },
  methode: [
    {
      titre: "Je reconnais le solide",
      texte: "Pavé, prisme ou cylindre : chacun a sa formule.",
      schema: duo(pave(4, 3, 2, { longueur: "L", largeur: "l", hauteur: "h" }), "pavé", escalier, "assemblage"),
    },
    {
      titre: "Je calcule l'aire de base",
      texte: "Puis je la multiplie par la hauteur (sauf le pavé : L × l × h direct).",
      schema: prisme(15, 4, { aireBase: "15 cm²", hauteur: "4 cm" }),
    },
    {
      titre: "Je convertis si besoin",
      texte: "En litres : 1 L = 1 dm³ = 1000 cm³.",
      schema: cube("1 dm", "1 L"),
    },
  ],
  usages: [
    {
      titre: "Pavé droit",
      detail: "Longueur × largeur × hauteur.",
      schema: pave(7, 3, 2, { longueur: "7 cm", largeur: "3 cm", hauteur: "2 cm" }),
    },
    {
      titre: "Prisme droit",
      detail: "Aire de base × hauteur.",
      schema: prisme(20, 6, { aireBase: "20 cm²", hauteur: "6 cm" }),
    },
    {
      titre: "Cylindre",
      detail: "Aire de base (un disque) × hauteur.",
      schema: cylindre(28, 5, { aireBase: "28 cm²", hauteur: "5 cm" }),
    },
  ],
  exemples: [
    {
      titre: "Compter les cubes",
      donnees: "Un pavé formé de cubes-unité (4 × 3 × 2).",
      question: "Quel est son volume ?",
      schema: assemblage(4, 3, 2),
      solution:
        "On compte : 4 × 3 = 12 cubes par couche, × 2 couches = 24 cubes. Le volume est 24 cm³.",
    },
    {
      titre: "Le pavé droit",
      donnees: "Un pavé de 6 cm × 4 cm × 3 cm.",
      question: "Quel est son volume ?",
      schema: pave(6, 4, 3, { longueur: "6 cm", largeur: "4 cm", hauteur: "3 cm", aireBase: "24 cm²" }),
      solution:
        "V = L × l × h = 6 × 4 × 3 = 72 cm³ (aire de base 24 cm² × hauteur 3 cm).",
    },
    {
      titre: "Le prisme droit",
      donnees: "Un prisme d'aire de base 15 cm² et de hauteur 8 cm.",
      question: "Quel est son volume ?",
      schema: prisme(15, 8, { aireBase: "15 cm²", hauteur: "8 cm" }),
      solution:
        "V = aire de base × hauteur = 15 × 8 = 120 cm³.",
    },
    {
      titre: "Le cylindre",
      donnees: "Un cylindre d'aire de base 20 cm² et de hauteur 6 cm.",
      question: "Quel est son volume ?",
      schema: cylindre(20, 6, { aireBase: "20 cm²", hauteur: "6 cm" }),
      solution:
        "V = aire de base × hauteur = 20 × 6 = 120 cm³ (même principe que le prisme).",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un pavé droit a pour dimensions 5 cm, 3 cm et 2 cm. Quel est son volume ?",
      correction: "V = 5 × 3 × 2 = 30 cm³.",
    },
    {
      question: "Un prisme a une aire de base de 12 cm² et une hauteur de 5 cm. Son volume ?",
      correction: "V = aire de base × hauteur = 12 × 5 = 60 cm³.",
    },
    {
      question: "Combien de cm³ dans 1 litre ?",
      correction: "1 L = 1 dm³ = 1000 cm³.",
    },
    {
      question: "Un élève écrit : volume d'un pavé 5×4×3 = 5 + 4 + 3 = 12 cm³. A-t-il raison ?",
      correction: "Non : on multiplie ! V = 5 × 4 × 3 = 60 cm³.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

export const slidesVolumes5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Volumes - 5e",
    section: {
      type: "objectif",
      phrase: "Calculer le volume d'un pavé, d'un prisme, d'un cylindre",
      sousPhrase:
        "Le volume mesure la place occupée, en cm³. L'idée clé : aire de base × hauteur.",
      encadre: {
        titre: "L'idée",
        texte: "Pavé : L × l × h. Prisme et cylindre : aire de base × hauteur.",
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
          "L'eau d'un aquarium, un carton de déménagement, le coffre d'une voiture, une citerne d'eau de pluie.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Archimède mesurait le volume d'un objet en le plongeant dans l'eau : le fameux « Eurêka ! ».",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheVolumes5e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Les formules",
    badge: "3 solides",
    section: {
      type: "cartes",
      cartes: ficheVolumes5e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Le pavé droit",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "Un pavé de 6 cm × 4 cm × 3 cm.",
      question: "Quel est son volume ?",
      correction: "V = 6 × 4 × 3 = 72 cm³ (aire de base 24 × hauteur 3).",
    },
  },
  {
    titre: "Prisme & cylindre",
    badge: "Même idée",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Prisme",
        contenu: "Aire de base × hauteur : 15 × 8 = 120 cm³.",
      },
      droite: {
        variante: "ok",
        titre: "Cylindre",
        contenu: "Aire de base × hauteur : 20 × 6 = 120 cm³.",
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
      enonce: "Un prisme a une aire de base de 12 cm² et une hauteur de 5 cm.",
      question: "Quel est son volume ?",
      indice: "Aire de base × hauteur.",
      correction: "V = 12 × 5 = 60 cm³.",
    },
  },
];
