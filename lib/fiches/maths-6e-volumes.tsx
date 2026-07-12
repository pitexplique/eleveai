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

const schemaPave = (
  <svg
    viewBox="0 0 320 190"
    className="h-auto w-full"
    role="img"
    aria-label="Pavé droit formé de petits cubes : 4 en longueur, 2 en largeur, 3 en hauteur"
  >
    {/* Face avant : 4 colonnes × 3 rangées de cubes */}
    <g stroke="#0ea5e9" strokeWidth="2.5" fill="rgba(14,165,233,0.12)">
      <rect x="40" y="60" width="160" height="90" />
      <line x1="80" y1="60" x2="80" y2="150" />
      <line x1="120" y1="60" x2="120" y2="150" />
      <line x1="160" y1="60" x2="160" y2="150" />
      <line x1="40" y1="90" x2="200" y2="90" />
      <line x1="40" y1="120" x2="200" y2="120" />
    </g>
    {/* Face du dessus */}
    <g stroke="#0ea5e9" strokeWidth="2.5" fill="rgba(14,165,233,0.2)">
      <path d="M40 60 L70 34 L230 34 L200 60 Z" />
      <line x1="110" y1="34" x2="80" y2="60" />
      <line x1="150" y1="34" x2="120" y2="60" />
      <line x1="190" y1="34" x2="160" y2="60" />
      <line x1="55" y1="47" x2="215" y2="47" />
    </g>
    {/* Face de droite */}
    <g stroke="#0ea5e9" strokeWidth="2.5" fill="rgba(14,165,233,0.28)">
      <path d="M200 60 L230 34 L230 124 L200 150 Z" />
      <line x1="215" y1="47" x2="215" y2="137" />
      <line x1="200" y1="90" x2="230" y2="64" />
      <line x1="200" y1="120" x2="230" y2="94" />
    </g>
    <text x="120" y="172" fill="#334155" fontSize="15" fontWeight="800" textAnchor="middle">
      longueur
    </text>
    <text x="32" y="108" fill="#334155" fontSize="15" fontWeight="800" textAnchor="end">
      hauteur
    </text>
    <text x="252" y="44" fill="#334155" fontSize="15" fontWeight="800">
      largeur
    </text>
  </svg>
);

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
  proprietes: [
    {
      titre: "Compter les cubes",
      texte:
        "Un solide construit avec des cubes unités a pour volume le nombre total de cubes. Pour un empilement régulier, on compte une couche, puis on multiplie par le nombre de couches. Exemple : 3 couches de 5 cubes, c'est 3 × 5 = 15 cubes.",
    },
    {
      titre: "Comparer deux solides",
      texte:
        "Pour comparer deux volumes écrits dans la même unité, on compare simplement les nombres. Deux solides de formes différentes peuvent avoir le même volume : ce qui compte, c'est le nombre de cubes.",
    },
    {
      titre: "Assembler des solides",
      texte:
        "Quand on colle deux solides, le volume total est la somme des deux volumes. Et si on coupe un solide en morceaux puis qu'on les recolle, le volume ne change pas : aucun cube n'a disparu.",
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
    expression: "Volume = longueur × largeur × hauteur",
    legende: "On compte les cubes d'une couche, puis on multiplie par le nombre de couches.",
    schema: schemaPave,
  },
  methode: [
    {
      titre: "Repérer l'unité",
      texte:
        "Le petit 3 signale un volume : cm³, m³. Sans lui, ce n'est pas un volume (cm est une longueur, cm² une aire).",
    },
    {
      titre: "Compter les cubes",
      texte:
        "On compte les cubes unités couche par couche, sans oublier ceux cachés derrière ou en dessous. Couches identiques : on multiplie.",
    },
    {
      titre: "Additionner si on assemble",
      texte:
        "Deux solides collés : on additionne leurs volumes. Un solide coupé puis recollé garde le même volume.",
    },
  ],
  usages: [
    {
      titre: "Compter un volume",
      detail:
        "Le solide est fait de cubes unités : son volume est le nombre de cubes. Empilement régulier : nombre de couches × cubes par couche.",
    },
    {
      titre: "Comparer deux volumes",
      detail:
        "Même unité : on compare les nombres. 14 cubes contre 12 cubes : le solide de 14 cubes a le plus grand volume.",
    },
    {
      titre: "Lire et assembler",
      detail:
        "Dans « 18 cm³ », le volume vaut 18, soit 18 cubes de 1 cm³. Si on réunit deux solides, on additionne : 4 cubes + 3 cubes = 7 cubes.",
    },
  ],
  exemples: [
    {
      titre: "Compter les cubes d'un pavé",
      donnees: "Un pavé est formé de 3 couches de 5 cubes unités chacune.",
      question: "Quel est son volume en cubes unités ?",
      solution:
        "Chaque couche contient 5 cubes et il y a 3 couches identiques. On calcule 3 × 5 = 15. Le volume du pavé est 15 cubes unités, soit 15 cm³ si chaque cube vaut 1 cm³.",
    },
    {
      titre: "Remplir une boîte (défi)",
      donnees: "Une boîte a pour dimensions 2 cm, 3 cm et 2 cm.",
      question: "Combien de cubes de 1 cm³ faut-il pour la remplir entièrement ?",
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
