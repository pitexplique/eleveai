// ─── Fiche de cours : le cosinus d'un angle aigu (4e) ──────────────────────────
// Fiche « en blocs » alignée sur la banque du coach (4e/maths/cosinus.bank.ts).
// Micro-compétences couvertes → blocs :
//   cos_cotes             → Propriété « L'adjacent dépend de l'angle », méthode « Repérer », usage 1
//   cos_definition        → Définition, figure, propriété « Un nombre entre 0 et 1 », formule
//   cos_calculer_longueur → Propriété « L'adjacent est une part de l'hypoténuse », méthode « Calculer », usage 2, exemple 1
//   cos_calculer_angle    → Propriété « De la valeur à l'angle », usage 3, exemple 2, exercice 3
//   cos_probleme          → Méthode « Contrôler », exemple 3
//   cos_defi              → Exercice 4
//
// ⭐ LE PIÈGE DE CETTE FICHE : le triangle rectangle y revient six fois, et il est
// déjà l'objet des fiches de Pythagore et de Thalès. Ce qu'on a cherché, c'est ce
// que le triangle ne sait PAS montrer :
//   · le cosinus est un NOMBRE, et toujours entre 0 et 1 → `number_line` ;
//   · l'adjacent est une PART de l'hypoténuse           → `schema_barre` ;
//   · l'angle et son cosinus vont dans les deux sens    → `tableau_donnees` ;
//   · le calcul lui-même                                → `calcul_pose` ;
//   · on part de l'ANGLE AIGU, jamais de l'angle droit  → `angle`, seul.
//
// ⭐ ET LA PROPRIÉTÉ LA PLUS UTILE EST UNE COMPARAISON : le même triangle, dessiné
// DEUX FOIS, une fois avec l'angle en B et une fois avec l'angle en C. Le côté
// adjacent change de place. C'est l'erreur numéro un, et elle ne se dit pas — elle
// se voit.
//
// Les nombres sont ceux de la banque : le triangle 6-8-10, dont le cosinus vaut
// 0,8, et l'angle de 60° dont le cosinus vaut exactement 0,5.

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

// Le triangle rectangle en A de la banque, avec l'angle étudié en B ou en C.
// ⛔ Les points sont RESSERRÉS par rapport à la banque (55…230 dans un cadre de
// 280) : le canvas `triangle` dessine sur des points fixes, donc réduire le seul
// cadre rogne les étiquettes au lieu de mettre le dessin à l'échelle. Mesuré sur
// la fiche de Pythagore le 25/08.
const triangleCos = (opts: {
  angleAt?: "B" | "C";
  sideLabels?: Partial<Record<"AB" | "BC" | "CA", string>>;
  angleLabel?: string;
  /** "carte" = propriété ou formule (bloc de 222 px) ; "exemple" = bloc de 200 px. */
  bloc?: "carte" | "exemple";
  /** Pour la comparaison empilée : deux fois plus étroit, donc deux fois plus petit. */
  demi?: boolean;
}) => {
  const petit = opts.bloc === "exemple";
  const k = petit ? 0.86 : 1;
  const largeur = petit ? 208 : 228;
  const angleAt = opts.angleAt ?? "B";
  return (
    <CanvasRenderer
      figure={{
        kind: "triangle",
        size: { width: largeur, height: Math.round(largeur * 0.82) },
        points: {
          A: { x: 35 * k, y: 155 * k },
          B: { x: 200 * k, y: 155 * k },
          C: { x: 35 * k, y: 50 * k },
        },
        labels: { A: "A", B: "B", C: "C" },
        sideLabels: opts.sideLabels,
        angleLabels:
          angleAt === "B" ? { B: opts.angleLabel ?? "θ" } : { C: opts.angleLabel ?? "θ" },
        display: { showPoints: true, showLabels: true, showSides: true, showAngles: true },
        marks: { rightAngleAt: "A" },
      }}
    />
  );
};

// ⭐ LE DESSIN LE PLUS UTILE DE LA FICHE : le MÊME triangle, deux fois, avec
// l'angle étudié changé de sommet. « Adjacent » n'est pas le nom d'un côté, c'est
// une place par rapport à un angle — et cette place bouge.
//
// ⛔ EMPILÉS, JAMAIS CÔTE À CÔTE (REGLES.md § 2 ter) : une carte de propriété fait
// 222 px, donc 100 px par cellule en deux colonnes, et les mots « adjacent » et
// « hypoténuse » y passeraient sous 8 px. Empilé, chaque triangle reprend les
// 222 px entiers.
const adjacentQuiBouge = (
  <div className="grid grid-cols-1 gap-3">
    <div>
      <CanvasRenderer
        figure={{
          kind: "triangle",
          size: { width: 222, height: 170 },
          points: {
            A: { x: 35, y: 148 },
            B: { x: 195, y: 148 },
            C: { x: 35, y: 48 },
          },
          labels: { A: "A", B: "B", C: "C" },
          sideLabels: { AB: "adjacent", BC: "hypot.", CA: "opposé" },
          angleLabels: { B: "θ" },
          display: { showPoints: true, showLabels: true, showSides: true, showAngles: true },
          marks: { rightAngleAt: "A" },
        }}
      />
      <p className="mt-1 text-center text-xs font-black text-slate-700">angle en B → adjacent = AB</p>
    </div>
    <div>
      <CanvasRenderer
        figure={{
          kind: "triangle",
          size: { width: 222, height: 170 },
          points: {
            A: { x: 35, y: 148 },
            B: { x: 195, y: 148 },
            C: { x: 35, y: 48 },
          },
          labels: { A: "A", B: "B", C: "C" },
          sideLabels: { AB: "opposé", BC: "hypot.", CA: "adjacent" },
          angleLabels: { C: "θ" },
          display: { showPoints: true, showLabels: true, showSides: true, showAngles: true },
          marks: { rightAngleAt: "A" },
        }}
      />
      <p className="mt-1 text-center text-xs font-black text-slate-700">angle en C → adjacent = AC</p>
    </div>
  </div>
);

// LE COSINUS EST UN NOMBRE, ET IL VIT ENTRE 0 ET 1. C'est la conséquence directe
// de la définition : l'adjacent est toujours plus court que l'hypoténuse, donc le
// quotient est toujours plus petit que 1. Un élève qui trouve 1,25 sait alors
// tout de suite qu'il s'est trompé.
// ⚠️ Six graduations et non onze : à `step: 0,1` elles se touchent (note du 24/08).
const cosinusEntre0et1 = legende(
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 1,
      step: 0.2,
      points: [
        { value: 0.5, label: "cos 60°", color: BLEU },
        { value: 0.8, label: "cos 37°", color: ROUGE },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
      size: { width: 228, height: 95 },
    }}
  />,
  "jamais plus grand que 1"
);

// L'ADJACENT EST UNE PART DE L'HYPOTÉNUSE, et le cosinus mesure cette part.
// `schema_barre` est le canvas du « tout découpé en parts » : l'hypoténuse est le
// tout, l'adjacent en occupe 0,8. C'est le sens de la définition, pas sa formule.
// ⚠️ Hauteur 200 : les étiquettes de parts sont posées à 144 px du haut et la
// phrase du bas à 18 px du bas — sous 180, elles se frôlent (mesuré en 1280).
const adjacentPartDeHypotenuse = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width: 228, height: 200 },
      total: "BC = 10",
      parts: [
        { label: "AB", value: "8", color: BLEU },
        { label: "reste", value: "2", color: "#e2e8f0" },
      ],
      questionLabel: "8 ÷ 10 = 0,8",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
    }}
  />
);

// L'ANGLE ET SON COSINUS VONT DANS LES DEUX SENS, et le tableau le montre mieux
// qu'une touche de calculatrice : quand l'angle grandit, le cosinus diminue.
// C'est aussi ce qui permet de contrôler un résultat de tête.
const tableauDesCosinus = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["angle", "son cosinus"],
      rows: [
        { values: ["0°", "1"] },
        { values: ["37°", "0,8"] },
        { values: ["60°", "0,5"] },
        { values: ["90°", "0"] },
      ],
      highlight: { row: 2 },
      caption: "l'angle monte, le cosinus descend",
      display: { compact: true, striped: true },
    }}
  />
);

// ON PART DE L'ANGLE AIGU, JAMAIS DE L'ANGLE DROIT. C'est l'erreur de départ la
// plus fréquente, et le seul dessin de la fiche où l'angle est SEUL : sans
// triangle autour, on ne peut pas se tromper d'angle.
const langleAigu = legende(
  <CanvasRenderer
    figure={{
      kind: "angle",
      size: { width: 200, height: 150 },
      angle: {
        angleDeg: 37,
        labels: { angle: "37°" },
        display: { showArc: true, showMeasure: true, showLabels: false, showRightAngle: false },
      },
    }}
  />,
  "l'angle aigu qu'on étudie"
);

// LE CALCUL, POSÉ. Une fois la formule écrite, il reste une multiplication — et
// c'est là que l'élève hésite entre multiplier et diviser.
const multiplicationDuCosinus = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "multiplication",
      numbers: ["10", "0,8"],
      result: "8",
      display: { showResult: true, compact: true },
      questionLabel: "hypoténuse × cosinus = adjacent",
    }}
  />
);

const pieges = [
  "Partir de l'angle droit : le cosinus se calcule toujours à partir d'un angle AIGU, jamais des 90°.",
  "Garder « adjacent = AB » quand on change d'angle : le côté adjacent est celui qui touche l'angle étudié, il change de place si on change d'angle.",
  "Trouver un cosinus plus grand que 1 : c'est impossible, l'adjacent est toujours plus court que l'hypoténuse. C'est le signe qu'on a inversé le quotient.",
];

const aRetenir = [
  "Dans un triangle rectangle, le cosinus d'un angle aigu est le quotient du côté adjacent par l'hypoténuse.",
  "Le côté adjacent est celui qui touche l'angle étudié sans être l'hypoténuse : il change si on change d'angle.",
  "Un cosinus est toujours compris entre 0 et 1. Pour remonter de sa valeur à l'angle, on utilise la touche cos⁻¹.",
];

export const ficheCosinus4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "trigo-cosinus",
  titre: "Le cosinus d'un angle aigu",
  accroche:
    "Dans un triangle rectangle, Pythagore relie les longueurs entre elles. Le cosinus fait autre chose : il relie une longueur à un ANGLE. C'est ce qui permet de calculer un angle sans rapporteur, et une longueur qu'aucune règle n'atteint.",
  identite: [
    { label: "Condition", valeur: "Un triangle rectangle, et un angle aigu" },
    { label: "Le mot clé", valeur: "Le côté adjacent : celui qui touche l'angle" },
    { label: "Outil", valeur: "Les touches cos et cos⁻¹ de la calculatrice" },
  ],
  definition: {
    texte:
      "Dans un triangle rectangle, on choisit un angle aigu. Le côté adjacent à cet angle est celui qui le touche sans être l'hypoténuse. Le cosinus de l'angle est alors le quotient de la longueur du côté adjacent par celle de l'hypoténuse. C'est un nombre, sans unité.",
  },
  figure: {
    schema: triangleCos({
      angleAt: "B",
      sideLabels: { AB: "adjacent", BC: "hypot.", CA: "opposé" },
    }),
    legende: "L'angle droit est en A, l'angle étudié en B : l'adjacent est AB.",
  },
  proprietes: [
    {
      titre: "L'adjacent dépend de l'angle",
      micros: ["cos_cotes"],
      texte:
        "« Adjacent » n'est pas le nom d'un côté : c'est une place par rapport à un angle. Le même triangle, regardé depuis B ou depuis C, ne donne pas le même côté adjacent.",
      schema: adjacentQuiBouge,
    },
    {
      titre: "Un nombre entre 0 et 1",
      micros: ["cos_definition"],
      texte:
        "L'adjacent est toujours plus court que l'hypoténuse, donc leur quotient est toujours plus petit que 1. Un cosinus supérieur à 1 est le signe d'un quotient inversé.",
      schema: cosinusEntre0et1,
    },
    {
      titre: "L'adjacent est une part de l'hypoténuse",
      micros: ["cos_calculer_longueur"],
      texte:
        "Le cosinus mesure quelle part de l'hypoténuse occupe l'adjacent. Ici l'adjacent vaut 8 sur une hypoténuse de 10 : le cosinus est 0,8.",
      schema: adjacentPartDeHypotenuse,
    },
    {
      titre: "De la valeur à l'angle",
      micros: ["cos_calculer_angle"],
      texte:
        "Quand l'angle grandit, son cosinus diminue : de 1 pour 0° jusqu'à 0 pour 90°. La touche cos⁻¹ fait le chemin inverse, de la valeur vers l'angle.",
      schema: tableauDesCosinus,
    },
  ],
  reel: {
    texte:
      "Le cosinus sert partout où une pente doit être mesurée sans être escaladée. À La Réunion, c'est l'inclinaison d'une route des Hauts, la pente d'une toiture qui doit résister aux cyclones, l'angle d'une échelle contre un mur — les fabricants recommandent entre 65° et 75°, et c'est le cosinus qui le vérifie. C'est aussi ce qui permet à un randonneur de calculer la distance réellement parcourue sur un sentier en pente à partir de la distance lue sur la carte.",
  },
  historique: {
    texte:
      "Le mot « cosinus » vient du latin, mais l'idée est indienne : au Ve siècle, l'astronome Aryabhata dressait déjà des tables de rapports dans le triangle rectangle, sous le nom de « jya ». Traduit en arabe puis en latin, le mot a été confondu avec « jaib », qui signifie « repli d'un vêtement » — d'où « sinus », le pli, en latin. Notre vocabulaire de trigonométrie vient d'une erreur de traduction.",
  },
  formule: {
    contexte: "Dans un triangle rectangle, pour un angle aigu θ",
    expression: "cos θ = adjacent ÷ hypoténuse",
    legende:
      "L'ordre ne s'invente pas : l'adjacent est au-dessus, l'hypoténuse au-dessous. C'est ce qui garantit un résultat entre 0 et 1.",
    schema: triangleCos({
      angleAt: "C",
      sideLabels: { CA: "adjacent", BC: "hypot." },
    }),
  },
  methode: [
    {
      titre: "Repérer",
      micros: ["cos_cotes"],
      texte:
        "On part de l'angle aigu donné, jamais de l'angle droit. On repère l'hypoténuse — en face de l'angle droit — puis l'adjacent : celui des deux autres côtés qui touche l'angle étudié.",
      schema: langleAigu,
    },
    {
      titre: "Calculer",
      micros: ["cos_calculer_longueur"],
      texte:
        "On écrit la formule avec les noms des côtés, on remplace par les nombres, puis on isole ce qu'on cherche : l'adjacent se trouve en multipliant, l'hypoténuse en divisant.",
      schema: multiplicationDuCosinus,
    },
    {
      titre: "Contrôler",
      micros: ["cos_probleme"],
      // Comme sur Pythagore et Thalès : un bloc peut rester sans dessin quand le
      // dessin redirait le texte (arbitrage de Frédéric, 25/08). Ici, les trois
      // contrôles sont des comparaisons de nombres, déjà dessinées deux blocs plus
      // haut sur la droite graduée et dans le tableau.
      texte:
        "Trois contrôles, tous de tête. Le cosinus trouvé est-il entre 0 et 1 ? L'adjacent trouvé est-il plus court que l'hypoténuse ? L'angle trouvé est-il bien aigu ? Un seul « non » et le calcul est à refaire.",
    },
  ],
  usages: [
    {
      titre: "Nommer les côtés",
      micros: ["cos_cotes"],
      detail:
        "L'angle aigu est donné. On identifie l'hypoténuse puis le côté adjacent, et on peut écrire la formule avant même de connaître les nombres.",
    },
    {
      titre: "Calculer une longueur",
      micros: ["cos_calculer_longueur"],
      detail:
        "L'angle et une longueur sont connus. Si c'est l'hypoténuse qu'on connaît, on multiplie par le cosinus ; si c'est l'adjacent, on divise par le cosinus.",
    },
    {
      titre: "Calculer un angle",
      micros: ["cos_calculer_angle"],
      detail:
        "Les deux longueurs sont connues. On calcule leur quotient, puis on utilise la touche cos⁻¹ de la calculatrice pour remonter à l'angle.",
    },
  ],
  exemples: [
    {
      titre: "La longueur au pied du mur",
      micros: ["cos_calculer_longueur"],
      donnees:
        "Le triangle ABC est rectangle en A. L'angle en B mesure 37° et l'hypoténuse BC mesure 10 cm.",
      question: "Combien mesure le côté adjacent AB ?",
      schema: triangleCos({
        bloc: "exemple",
        angleAt: "B",
        angleLabel: "37°",
        sideLabels: { AB: "?", BC: "10 cm" },
      }),
      solution:
        "L'angle étudié est en B, l'hypoténuse est BC et le côté adjacent est AB. On écrit cos B = AB ÷ BC, donc cos 37° = AB ÷ 10. La calculatrice donne cos 37° ≈ 0,8, donc AB ≈ 10 × 0,8 = 8. Le côté AB mesure environ 8 cm. Contrôle : 8 est bien plus court que 10.",
    },
    {
      titre: "L'angle de l'échelle",
      micros: ["cos_calculer_angle"],
      donnees:
        "Une échelle de 10 m est posée contre un mur. Son pied est à 5 m du mur. Le triangle ABC est rectangle en A, avec AB = 5 m et BC = 10 m.",
      question: "Quel angle l'échelle fait-elle avec le sol ?",
      schema: triangleCos({
        bloc: "exemple",
        angleAt: "B",
        angleLabel: "?",
        sideLabels: { AB: "5 m", BC: "10 m" },
      }),
      solution:
        "L'angle cherché est en B. Le côté adjacent est AB = 5, l'hypoténuse est BC = 10. On écrit cos B = 5 ÷ 10 = 0,5. Avec la touche cos⁻¹, on obtient B = 60°. L'échelle fait un angle de 60° avec le sol — un peu moins que les 65° recommandés par les fabricants.",
    },
    {
      titre: "La route des Hauts",
      micros: ["cos_probleme"],
      donnees:
        "Une portion de route monte avec un angle de 12° par rapport à l'horizontale. Sur la carte, la distance horizontale mesure 800 m.",
      question: "Quelle distance parcourt-on réellement sur la route ?",
      schema: triangleCos({
        bloc: "exemple",
        angleAt: "B",
        angleLabel: "12°",
        sideLabels: { AB: "800 m", BC: "?" },
      }),
      solution:
        "La distance de la carte est le côté adjacent, la route est l'hypoténuse. On écrit cos 12° = 800 ÷ BC. La calculatrice donne cos 12° ≈ 0,978. Donc BC = 800 ÷ 0,978 ≈ 818. On parcourt environ 818 m, soit 18 m de plus que ce que la carte annonce. Contrôle : l'hypoténuse est bien la plus longue.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Dans un triangle ABC rectangle en A, on étudie l'angle en C. Quel côté est l'hypoténuse, et quel côté est adjacent à cet angle ?",
      correction:
        "L'hypoténuse est toujours le côté opposé à l'angle droit : c'est BC. Le côté adjacent à l'angle C est celui qui le touche sans être l'hypoténuse : c'est AC. Attention, si on avait étudié l'angle en B, l'adjacent aurait été AB.",
      micros: ["cos_cotes"],
    },
    {
      question:
        "Un élève trouve un cosinus égal à 1,25. Que peux-tu dire de son calcul sans rien recalculer ?",
      correction:
        "Il s'est trompé. Le côté adjacent est toujours plus court que l'hypoténuse, donc leur quotient est toujours compris entre 0 et 1. Un résultat supérieur à 1 signifie qu'il a divisé l'hypoténuse par l'adjacent au lieu de l'inverse.",
      micros: ["cos_definition"],
    },
    {
      question:
        "Dans un triangle rectangle, le côté adjacent à un angle mesure 5 cm et l'hypoténuse 10 cm. Combien mesure cet angle ?",
      correction:
        "On calcule le cosinus : 5 ÷ 10 = 0,5. Avec la touche cos⁻¹ de la calculatrice, cos⁻¹(0,5) donne 60°. L'angle mesure 60°. Contrôle : 60° est bien un angle aigu.",
      micros: ["cos_calculer_angle"],
    },
    {
      question:
        "Pourquoi le cosinus d'un angle diminue-t-il quand l'angle augmente ?",
      correction:
        "Parce qu'en ouvrant l'angle, on couche l'hypoténuse : le côté adjacent devient de plus en plus court par rapport à elle. À 0°, les deux côtés se confondent et le cosinus vaut 1 ; à 90°, l'adjacent a disparu et le cosinus vaut 0.",
      micros: ["cos_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesCosinus4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Le cosinus - 4e",
    section: {
      type: "objectif",
      phrase: "Relier une longueur à un angle",
      sousPhrase:
        "Le cosinus d'un angle aigu est le quotient du côté adjacent par l'hypoténuse.",
      encadre: {
        titre: "L'idée",
        texte: "C'est la part de l'hypoténuse qu'occupe le côté adjacent.",
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
          "La pente d'une route des Hauts, l'inclinaison d'une toiture, l'angle d'une échelle contre un mur, la distance réelle d'un sentier en pente.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le mot « sinus » vient d'une erreur de traduction : l'arabe « jaib », le repli d'un vêtement, a été pris pour le mot indien d'origine.",
      },
    },
  },
  {
    titre: "Le mot qui change tout",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "« Adjacent » est une place, pas un nom",
      sousPhrase:
        "Le côté adjacent est celui qui touche l'angle étudié sans être l'hypoténuse. Change d'angle, il change de côté.",
      encadre: {
        titre: "Contrôle rapide",
        texte: "Un cosinus est toujours compris entre 0 et 1.",
      },
    },
  },
  {
    titre: "Les deux sens du cosinus",
    badge: "2 repères",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "L'angle est connu",
          texte:
            "On cherche une longueur. Touche cos, puis on multiplie ou on divise selon le côté cherché.",
        },
        {
          titre: "Les longueurs sont connues",
          texte:
            "On cherche l'angle. On calcule le quotient, puis la touche cos⁻¹ remonte à l'angle.",
        },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheCosinus4e.methode.map((m) => ({
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
      cartes: ficheCosinus4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "L'angle de l'échelle",
    section: {
      type: "exemple",
      enonce: "Une échelle de 10 m, le pied à 5 m du mur.",
      question: "Quel angle fait-elle avec le sol ?",
      correction:
        "cos B = 5 ÷ 10 = 0,5, donc avec cos⁻¹ on obtient B = 60°.",
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
      enonce: "Un élève trouve un cosinus égal à 1,25.",
      question: "Que peux-tu dire de son calcul ?",
      indice: "Compare l'adjacent et l'hypoténuse.",
      correction:
        "C'est impossible : l'adjacent est toujours plus court que l'hypoténuse, donc le cosinus est entre 0 et 1. Il a inversé le quotient.",
    },
  },
];
