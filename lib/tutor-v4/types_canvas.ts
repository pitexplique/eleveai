// lib/tutor-v4/types_canvas.ts

export type TriangleCanvasPointLabel = "A" | "B" | "C";
export type TriangleCanvasSideLabel = "AB" | "BC" | "CA";

export type QuadrilatereCanvasPointLabel = "A" | "B" | "C" | "D";
export type QuadrilatereCanvasSideLabel =
  | "AB" | "BA"
  | "BC" | "CB"
  | "CD" | "DC"
  | "DA" | "AD"
  | "AC" | "CA"
  | "BD" | "DB";

export type FigureLibreCanvasGridCell = [row: number, col: number];
export type FigureLibreCanvasGridPoint = [row: number, col: number];

export type TriangleCanvasData = {
  kind: "triangle";
  size?: { width?: number; height?: number };
  points: {
    A: { x: number; y: number };
    B: { x: number; y: number };
    C: { x: number; y: number };
  };
  display?: {
    showPoints?: boolean;
    showLabels?: boolean;
    showSides?: boolean;
    showAngles?: boolean;
  };
  labels?: Partial<Record<TriangleCanvasPointLabel, string>>;
  angleLabels?: Partial<Record<TriangleCanvasPointLabel, string>>;
  sideLabels?: Partial<Record<TriangleCanvasSideLabel, string>>;
  marks?: {
    rightAngleAt?: TriangleCanvasPointLabel;
    equalSides?: Array<[TriangleCanvasSideLabel, TriangleCanvasSideLabel]>;
    equalAngles?: Array<[TriangleCanvasPointLabel, TriangleCanvasPointLabel]>;
  };
  /**
   * LA HAUTEUR, tracée depuis un sommet jusqu'à son pied sur le côté opposé
   * (projection orthogonale), en pointillés, avec la marque d'angle droit.
   *
   * ⛔ Sans elle, « la hauteur est perpendiculaire à la base » restait du texte
   * sous un triangle qui n'en montrait aucune — alors que c'est LA difficulté
   * de l'aire au collège : l'élève prend le côté oblique. Le pied peut tomber
   * hors du segment (triangle obtusangle) : le côté est alors prolongé en
   * pointillés, ce qui est justement le cas que personne ne dessine.
   */
  height?: {
    fromVertex: TriangleCanvasPointLabel;
    label?: string;
    baseLabel?: string;
  };
};

export type ThalesCanvasPointLabel = "A" | "B" | "C" | "M" | "N";

export type ThalesCanvasData = {
  kind: "thales";
  variant: "triangle" | "papillon";
  size?: { width?: number; height?: number };
  points?: Partial<Record<ThalesCanvasPointLabel, { x: number; y: number }>>;
  labels?: Partial<Record<ThalesCanvasPointLabel, string>>;
  sideLabels?: Partial<
    Record<"AB" | "AC" | "BC" | "AM" | "AN" | "MN" | "BM" | "CN", string>
  >;
  formula?: string;
  display?: {
    showPoints?: boolean;
    showLabels?: boolean;
    showSideLabels?: boolean;
    showParallelMarks?: boolean;
    highlightParallel?: boolean;
    highlightRatios?: boolean;
    showFormula?: boolean;
  };
  colors?: {
    triangleStroke?: string;
    parallelStroke?: string;
    pointFill?: string;
    labelFill?: string;
    sideLabelFill?: string;
    highlightStroke?: string;
  };
};

export type QuadrilatereCanvasData = {
  kind: "quadrilatere";
  size?: { width?: number; height?: number };
  points: {
    A: { x: number; y: number };
    B: { x: number; y: number };
    C: { x: number; y: number };
    D: { x: number; y: number };
  };
  display?: {
    showPoints?: boolean;
    showLabels?: boolean;
    showSides?: boolean;
    showAngles?: boolean;
    showDiagonals?: boolean;
  };
  labels?: Partial<Record<QuadrilatereCanvasPointLabel, string>>;
  angleLabels?: Partial<Record<QuadrilatereCanvasPointLabel, string>>;
  sideLabels?: Partial<Record<QuadrilatereCanvasSideLabel, string>>;
  marks?: {
    rightAnglesAt?: QuadrilatereCanvasPointLabel[];
    equalSides?: Array<[QuadrilatereCanvasSideLabel, QuadrilatereCanvasSideLabel]>;
    equalAngles?: Array<[QuadrilatereCanvasPointLabel, QuadrilatereCanvasPointLabel]>;
    parallelSides?: Array<[QuadrilatereCanvasSideLabel, QuadrilatereCanvasSideLabel]>;
  };
  /**
   * LA HAUTEUR d'un parallélogramme : du sommet indiqué, perpendiculairement
   * à la base `onSide`, en pointillés et avec la marque d'angle droit. Même
   * raison qu'au triangle — « aire = base × hauteur » ne veut rien dire tant
   * que la hauteur n'est pas SUR le dessin, et l'élève prend le côté oblique.
   */
  height?: {
    fromVertex: QuadrilatereCanvasPointLabel;
    onSide: QuadrilatereCanvasSideLabel;
    label?: string;
  };
};

export type FigureLibreCanvasData = {
  kind: "figure_libre";
  size?: {
    width?: number;
    height?: number;
    cellSize?: number;
    padding?: number;
  };
  grid: {
    rows: number;
    cols: number;
    filledCells: FigureLibreCanvasGridCell[];
  };
  display?: {
    showGrid?: boolean;
    showFilled?: boolean;
    showCellLabels?: boolean;
    showPerimeter?: boolean;
    showVertices?: boolean;
    showVertexLabels?: boolean;
  };
  colors?: {
    filled?: string;
    grid?: string;
    border?: string;
    perimeter?: string;
    vertex?: string;
    vertexLabel?: string;
  };
  perimeterPath?: FigureLibreCanvasGridPoint[];
  vertices?: Record<string, FigureLibreCanvasGridPoint>;
};

export type NumberLineCanvasPoint = {
  value: number;
  label?: string;
  color?: string;
};

export type NumberLineCanvasData = {
  kind: "number_line";
  size?: { width?: number; height?: number };
  min?: number;
  max?: number;
  step?: number;
  points?: NumberLineCanvasPoint[];
  display?: {
    showTicks?: boolean;
    showValues?: boolean;
    showPoints?: boolean;
    showPointLabels?: boolean;
    showZero?: boolean;
  };
};

export type StatGraphKind = "barres" | "batons" | "camembert";

export type StatGraphCanvasData = {
  kind: "stat_graph";
  graphType: StatGraphKind;
  title?: string;
  size?: { width?: number; height?: number };
  data: {
    label: string;
    value: number;
    color?: string;
  }[];
  display?: {
    showValues?: boolean;
    showLabels?: boolean;
    highlightIndex?: number;
  };
};

export type SolideKind =
  | "cube"
  | "pave_droit"
  | "prisme"
  | "cylindre"
  | "cone"
  | "boule"
  | "pyramide"
  | "assemblage_cubes";

export type CubeCell3D = {
  x: number;
  y: number;
  z: number;
};

export type Solide3DCanvasData = {
  kind: "solide_3d";
  solide: SolideKind;
  size?: { width?: number; height?: number };
  dimensions?: {
    longueur?: number;
    largeur?: number;
    hauteur?: number;
    cote?: number;
    rayon?: number;
    diametre?: number;
    aireBase?: number;
    volume?: number;
  };
  labels?: {
    longueur?: string;
    largeur?: string;
    hauteur?: string;
    cote?: string;
    rayon?: string;
    diametre?: string;
    aireBase?: string;
    volume?: string;
  };
  highlight?: {
    base?: boolean;
    hauteur?: boolean;
    volume?: boolean;
  };
  display?: {
    showLabels?: boolean;
    showDimensions?: boolean;
    showFormulaHint?: boolean;
    showUnitCubes?: boolean;
  };
  colors?: {
    baseFill?: string;
    baseStroke?: string;
    bodyFill?: string;
    bodyStroke?: string;
    heightStroke?: string;
    labelFill?: string;
    cubeFill?: string;
    cubeStroke?: string;
  };
  cubes?: CubeCell3D[];
};

export type SectionSolideKind =
  | "cube"
  | "pave_droit"
  | "cylindre"
  | "cone"
  | "pyramide";

export type SectionSolideType =
  | "parallele_base"
  | "parallele_face"
  | "parallele_axe"
  | "diagonale"
  | "horizontale"
  | "verticale";

export type SectionSolideCanvasData = {
  kind: "section_solide";
  solide: SectionSolideKind;
  section: SectionSolideType;

  size?: {
    width?: number;
    height?: number;
  };

  labels?: {
    titre?: string;
    section?: string;
    solide?: string;
    plan?: string;
  };

  display?: {
    showLabels?: boolean;
    showSectionName?: boolean;
    showPlane?: boolean;
    /** Les bulles « plan » et « section ». Séparées de `showPlane` le
     *  01/09/2026 : elles réclament ~184 px de large à elles seules, ce
     *  qu'une carte de fiche n'a pas. Défaut `true`. */
    showCallouts?: boolean;
  };

  colors?: {
    bodyFill?: string;
    bodyStroke?: string;
    sectionFill?: string;
    sectionStroke?: string;
    labelFill?: string;
  };
};

export type TableauProportionnaliteCell = {
  row: number;
  col: number;
};

export type TableauProportionnaliteCanvasData = {
  kind: "tableau_proportionnalite";
  size?: { width?: number; height?: number };
  rows: number;
  cols: number;
  rowLabels?: string[];
  colLabels?: string[];
  values: string[][];
  missing: TableauProportionnaliteCell[];
  highlightedCells?: TableauProportionnaliteCell[];
  display?: {
    showRowLabels?: boolean;
    showColLabels?: boolean;
    showMissing?: boolean;
    showGrid?: boolean;
  };
};

export type AngleCanvasData = {
  kind: "angle";
  angle: {
    angleDeg: number;
    labels?: {
      vertex?: string;
      left?: string;
      right?: string;
      angle?: string;
    };
    display?: {
      showLabels?: boolean;
      showMeasure?: boolean;
      showArc?: boolean;
      showRightAngle?: boolean;
      placeholder?: string;
      /**
       * Pose le RAPPORTEUR sur l'angle (demi-disque gradué, 0 aligné sur le
       * côté droit). Sans lui, aucun dessin du moteur ne montrait l'instrument
       * — or « mesurer au rapporteur » est une capacité du BO en 6e et en 5e,
       * et la méthode d'une fiche d'angles ne se raconte pas, elle se montre.
       */
      showProtractor?: boolean;
      /**
       * Le geste mis en avant sur le rapporteur, pour dérouler une méthode en
       * trois temps sans changer de dessin :
       * `vertex` le centre posé sur le sommet · `zero` le 0 aligné sur un côté ·
       * `reading` la graduation atteinte par l'autre côté.
       */
      protractorStep?: "vertex" | "zero" | "reading";
    };
  };
  size?: { width?: number; height?: number };
};

export type CanvasProbabilitesData = {
  kind: "probabilites";
  variant: "de" | "roue" | "billes" | "tableau";
  de?: {
    faces: Array<1 | 2 | 3 | 4 | 5 | 6>;
    surligne?: Array<1 | 2 | 3 | 4 | 5 | 6>;
  };
  roue?: {
    segments: {
      label: string;
      poids: number;
      couleur?: string;
    }[];
  };
  billes?: {
    elements: {
      label?: string;
      couleur: string;
    }[];
  };
  tableau?: {
    entetes: string[];
    lignes: string[][];
    casesSurlignees?: Array<[number, number]>;
  };
  size?: { width?: number; height?: number };
};

export type FonctionGraphiquePoint = {
  x: number;
  y: number;
  label?: string;
  couleur?: string;
};

export type FonctionGraphiqueCourbe = {
  id: string;
  label?: string;
  type: "lineaire" | "affine" | "quadratique" | "points";
  a?: number;
  b?: number;
  c?: number;
  points?: FonctionGraphiquePoint[];
  couleur?: string;
};

export type FonctionGraphiqueCanvasData = {
  kind: "fonctionGraphique";
  titre?: string;
  size?: { width?: number; height?: number };
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  grille?: boolean;
  courbes?: {
    id: string;
    type: "lineaire" | "affine" | "quadratique" | "points";
    a?: number;
    b?: number;
    c?: number;
    couleur?: string;
    points?: { x: number; y: number }[];
  }[];
  points?: {
    x: number;
    y: number;
    label?: string;
    couleur?: string;
  }[];
  misesEnEvidence?: {
    verticale?: { x: number; couleur?: string };
    horizontale?: { y: number; couleur?: string };
    point?: {
      x: number;
      y: number;
      label?: string;
      couleur?: string;
    };
  }[];
};

export type FonctionTableauCanvasData = {
  kind: "fonction_tableau";
  titre?: string;
  consigne?: string;
  xValues: number[];
  yValues: number[];
  missing?: {
    type: "image" | "antecedent";
    index: number;
  };
  highlightIndex?: number;
  size?: { width?: number; height?: number };
};

export type TransformationKind =
  | "symetrie_axiale"
  | "symetrie_centrale"
  | "translation"
  | "rotation"
  | "homothetie";

export type TransformationCanvasPoint = {
  x: number;
  y: number;
};

export type TransformationCanvasData = {
  kind: "transformation";
  transformation: TransformationKind;
  size?: {
    width?: number;
    height?: number;
    cellSize?: number;
    padding?: number;
  };
  grid?: {
    rows: number;
    cols: number;
  };
  source: {
    points: TransformationCanvasPoint[];
    label?: string;
    color?: string;
    fill?: string;
  };
  image?: {
    points: TransformationCanvasPoint[];
    label?: string;
    color?: string;
    fill?: string;
  };
  axis?: {
    type: "vertical" | "horizontal" | "line";
    x?: number;
    y?: number;
    from?: TransformationCanvasPoint;
    to?: TransformationCanvasPoint;
    label?: string;
  };
  center?: {
    point: TransformationCanvasPoint;
    label?: string;
  };
  vector?: {
    from: TransformationCanvasPoint;
    to: TransformationCanvasPoint;
    label?: string;
  };
  angleDeg?: number;
  ratio?: number;
  display?: {
    showGrid?: boolean;
    showLabels?: boolean;
    showPoints?: boolean;
    showDashedLinks?: boolean;
    showTransformationInfo?: boolean;
  };
};

/**
 * ⭐ L'HOMOTHÉTIE A SON PROPRE CANVAS — ET C'EST UNE CORRECTION, PAS UN AJOUT.
 *
 * `TransformationCanvasData` accepte déjà `transformation: "homothetie"` : il
 * en écrit le nom en titre, pose le centre O en point orange, et dessine les
 * deux figures. Mais il ne trace AUCUNE des droites (OA), (OB), (OC) — or
 * l'alignement de O, A et A' est TOUT le contenu de la notion. Sans elles,
 * l'élève voit deux triangles et un point : rien ne dit qu'ils se répondent.
 * Le catalogue le disait depuis le début — `transformation` : « ⛔ pas pour un
 * agrandissement ».
 *
 * Ce que ce canvas montre et que l'autre ne peut pas :
 *  - les droites issues de O, PROLONGÉES au-delà des deux figures, qui rendent
 *    l'alignement visible et permettent de lire la construction au compas ;
 *  - le rapport k porté sur le dessin, avec son signe : k < 0 renvoie l'image
 *    de l'autre côté du centre, ce qui ne se devine pas d'une figure seule ;
 *  - le rapport des longueurs, en option, pour le passage aux aires (× k²).
 */
export type HomothetieCanvasPoint = {
  x: number;
  y: number;
  label?: string;
};

export type HomothetieCanvasData = {
  kind: "homothetie";
  /** Le centre. Toutes les droites en partent. */
  centre: HomothetieCanvasPoint;
  /** Le rapport k. Négatif = l'image bascule de l'autre côté du centre. */
  rapport: number;
  /** La figure de départ. Son image est CALCULÉE, jamais saisie à la main :
   *  une image saisie peut contredire le rapport, et le dessin mentirait. */
  source: {
    points: HomothetieCanvasPoint[];
    label?: string;
    color?: string;
    fill?: string;
  };
  image?: {
    label?: string;
    color?: string;
    fill?: string;
  };
  grid?: {
    rows: number;
    cols: number;
  };
  size?: {
    width?: number;
    height?: number;
    cellSize?: number;
    padding?: number;
  };
  /** Une longueur à comparer entre la figure et son image (deux sommets). */
  mesure?: {
    de: number;
    a: number;
    longueur?: string;
  };
  display?: {
    showGrid?: boolean;
    showRayons?: boolean;
    showLabels?: boolean;
    /** ⚠️ Écrit « Homothétie — k = 2 » AU-DESSUS du dessin : à mettre à `false`
     *  dès que la question porte sur la nature ou sur le rapport. */
    showInfo?: boolean;
  };
};

export type TableauDonneesCanvasData = {
  kind: "tableau_donnees";
  title?: string;
  caption?: string;
  headers: string[];
  rows: {
    label?: string;
    values: (string | number)[];
  }[];
  highlight?: {
    row?: number;
    col?: number;
    cell?: {
      row: number;
      col: number;
    };
  };
  display?: {
    compact?: boolean;
    striped?: boolean;
  };
  questionLabel?: string;
};

export type CalculPoseCanvasData = {
  kind: "calcul_pose";
  operation: "addition" | "soustraction" | "multiplication" | "division";
  title?: string;
  numbers: string[];
  result?: string;
  retenues?: string[];
  highlight?: {
    row?: number;
    col?: number;
    cell?: {
      row: number;
      col: number;
    };
  };
  division?: {
    dividende: string;
    diviseur: string;
    quotient?: string;
    reste?: string;
  };
  display?: {
    showResult?: boolean;
    showRetenues?: boolean;
    compact?: boolean;
  };
  questionLabel?: string;
};

export type FractionCanvasData = {
  kind: "fraction";
  model?: "bar" | "circle" | "grid" | "compare";
  fraction?: {
    numerator: number;
    denominator: number;
    label?: string;
    color?: string;
  };
  fractions?: {
    numerator: number;
    denominator: number;
    label?: string;
    color?: string;
  }[];
  grid?: {
    rows: number;
    cols: number;
    shaded: number;
  };
  display?: {
    showLabel?: boolean;
    showFraction?: boolean;
    showParts?: boolean;
    unequalParts?: boolean;
  };
  size?: { width?: number; height?: number };
};

export type ScratchBlockKind =
  | "event"
  | "move"
  | "turn"
  | "repeat"
  | "say"
  | "set_variable"
  | "change_variable"
  | "if"
  | "if_else"
  | "ask"
  | "answer"
  | "operator"
  | "pen"
  | "wait";

export type ScratchBlockData = {
  type: ScratchBlockKind;
  text?: string;
  value?: string | number;
  variable?: string;
  times?: number;
  condition?: string;
  left?: string | number;
  operator?: "+" | "-" | "×" | "÷" | "<" | ">" | "=";
  right?: string | number;
  children?: ScratchBlockData[];
  elseChildren?: ScratchBlockData[];
};

export type ScratchCanvasData = {
  kind: "scratch";
  title?: string;
  description?: string;
  blocks: ScratchBlockData[];
  display?: {
    showSprite?: boolean;
    showStage?: boolean;
    compact?: boolean;
  };
};

export type AlgebreCanvasData = {
  kind: "algebre";
  theme?:
    | "margouillat"
    | "pomme"
    | "eau"
    | "dechet"
    | "surf"
    | "jeu_video"
    | "tresor"
    | "pieces"
    | "requin"
    | "pi";
  titre?: string;
  groupesCaches?: number;
  objetsVisibles?: number;
  symbole?: string;
  expression?: string;
  phrase?: string;
  display?: {
    showConcret?: boolean;
    showExpression?: boolean;
    showPhrase?: boolean;
    showLabels?: boolean;
  };
};

export type SuiteCanvasTheme =
  | "nombre"
  | "margouillat"
  | "pieces"
  | "eau"
  | "dechet"
  | "jeu_video"
  | "surf"
  | "requin"
  | "pi";

export type SuiteCanvasData = {
  kind: "suite";
  theme?: SuiteCanvasTheme;
  titre?: string;
  terms: Array<number | string>;
  missingIndex?: number;
  arrows?: string[];
  rule?: string;
  phrase?: string;
  display?: {
    showIcons?: boolean;
    showArrows?: boolean;
    showRule?: boolean;
    showLabels?: boolean;
  };
};
export type DureeTime = {
  hour: number;
  minute: number;
  label?: string;
};

export type DureeCanvasData = {
  kind: "duree";

  variant: "horloge" | "double_horloge" | "digital" | "frise";

  title?: string;

  time?: DureeTime;

  start?: DureeTime;
  end?: DureeTime;

  digital?: {
    text: string;
    label?: string;
  };

  frise?: {
    startLabel: string;
    endLabel: string;
    steps: {
      label: string;
      minutes: number;
      color?: string;
    }[];
  };

  display?: {
    showNumbers?: boolean;
    showMinuteTicks?: boolean;
    showDigital?: boolean;
    showLabels?: boolean;
  };

  colors?: {
    face?: string;
    bezel?: string;
    hourHand?: string;
    minuteHand?: string;
    secondHand?: string;
    accent?: string;
    strap?: string;
    text?: string;
  };

  size?: {
    width?: number;
    height?: number;
  };
};

// ============================================================
// REPÉRAGE SUR QUADRILLAGE
// ============================================================

export type ReperageDirection =
  | "haut"
  | "bas"
  | "gauche"
  | "droite";

export type ReperagePoint = {
  x: number;
  y: number;
  label?: string;

  /**
   * Couleur du point.
   * Exemple : "#ef4444"
   */
  color?: string;
};

export type ReperageStep = {
  direction: ReperageDirection;
  count: number;

  /**
   * Couleur spécifique de cette flèche ou étape.
   * Si absent, on utilise la couleur globale du chemin.
   */
  color?: string;
};

export type ReperageCanvasData = {
  kind: "reperage";

  grid?: {
    rows: number;
    cols: number;

    /**
     * Labels personnalisés des colonnes.
     * Exemple : ["0", "1", "2", "3", "4"]
     */
    xLabels?: string[];

    /**
     * Labels personnalisés des lignes.
     * Exemple : ["0", "1", "2", "3", "4"]
     */
    yLabels?: string[];
  };

  /**
   * Points déjà affichés sur le quadrillage.
   * Exemple : A(3 ; 2)
   */
  points?: ReperagePoint[];

  /**
   * Chemin de déplacement à partir d’un point.
   * Exemple : partir de A, aller 2 cases à droite puis 1 case en haut.
   */
  path?: {
    start: ReperagePoint;
    steps: ReperageStep[];
    showArrows?: boolean;

    /**
     * Couleur globale du chemin.
     */
    color?: string;
  };

  /**
   * Point cible à trouver ou à placer.
   */
  target?: {
    x: number;
    y: number;
    label?: string;

    /**
     * Si true, le point peut être masqué ou remplacé par un ?
     * utile pour les questions “où arrive-t-on ?”
     */
    hidden?: boolean;

    /**
     * Couleur du point cible.
     */
    color?: string;
  };

  colors?: {
    background?: string;
    grid?: string;

    /**
     * Axe horizontal.
     */
    axisX?: string;

    /**
     * Axe vertical.
     */
    axisY?: string;

    point?: string;
    target?: string;
    path?: string;
    text?: string;
  };

  display?: {
    showGrid?: boolean;
    showAxes?: boolean;
    showCoordinates?: boolean;
    showPointLabels?: boolean;
    showTarget?: boolean;
  };

  size?: {
    width?: number;
    height?: number;
  };
};

// ============================================================
// DROITES CANVAS
// ============================================================

export type DroitesCanvasPoint = {
  x: number;
  y: number;
  label?: string;
  color?: string;
  highlight?: boolean;
};

export type DroitesCanvasLineType = "droite" | "segment" | "demi_droite";

export type DroitesCanvasLine = {
  id: string;
  type: DroitesCanvasLineType;

  from: {
    x: number;
    y: number;
  };

  to: {
    x: number;
    y: number;
  };

  label?: string;
  color?: string;

  strokeWidth?: number;
  dashed?: boolean;

  display?: {
    showLabel?: boolean;
    showArrows?: boolean;
    extend?: boolean;
  };
};

export type DroitesCanvasData = {
  kind: "droites";

  size?: {
    width?: number;
    height?: number;
  };

  grid?: {
    show?: boolean;
    rows?: number;
    cols?: number;
    step?: number;
  };

  lines: DroitesCanvasLine[];

  points?: DroitesCanvasPoint[];

  intersections?: Array<{
    x: number;
    y: number;
    label?: string;
    color?: string;
    highlight?: boolean;
  }>;

  markers?: {
    rightAngles?: Array<{
      x: number;
      y: number;
      lineA: string;
      lineB: string;
      size?: number;
      color?: string;
    }>;

    parallels?: Array<{
      lineA: string;
      lineB: string;
      color?: string;
      markCount?: 1 | 2;
    }>;
  };

  display?: {
    showGrid?: boolean;
    showLabels?: boolean;
    showPoints?: boolean;
    showIntersections?: boolean;
    showRightAngleMarkers?: boolean;
    showParallelMarkers?: boolean;
  };

  colors?: {
    background?: string;
    grid?: string;
    text?: string;
    point?: string;
    intersection?: string;
    rightAngle?: string;
    parallel?: string;
  };
};

// ============================================================
// CERCLE CANVAS
// ============================================================

export type CercleCanvasPointLabel =
  | "O"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | string;

export type CercleCanvasPoint = {
  id: CercleCanvasPointLabel;
  x: number;
  y: number;
  label?: string;
  color?: string;
  highlight?: boolean;
};

export type CercleCanvasSegmentKind =
  | "rayon"
  | "diametre"
  | "corde"
  | "segment";

export type CercleCanvasSegment = {
  id: string;
  kind: CercleCanvasSegmentKind;
  from: CercleCanvasPointLabel;
  to: CercleCanvasPointLabel;
  label?: string;
  color?: string;
  dashed?: boolean;
  highlight?: boolean;
};

export type CercleCanvasArc = {
  id: string;
  startAngle: number; // en degrés
  endAngle: number;   // en degrés
  label?: string;
  color?: string;
  highlight?: boolean;
};

export type CercleCanvasData = {
  kind: "cercle";

  size?: {
    width?: number;
    height?: number;
  };

  circle?: {
    cx?: number;
    cy?: number;
    r?: number;
    label?: string;
    showDisk?: boolean;
    showCircle?: boolean;
  };

  points?: CercleCanvasPoint[];

  segments?: CercleCanvasSegment[];

  arcs?: CercleCanvasArc[];

  display?: {
    showLabels?: boolean;
    showPoints?: boolean;
    showCenter?: boolean;
    showRadius?: boolean;
    showDiameter?: boolean;
    showChord?: boolean;
    showArc?: boolean;
    showDisk?: boolean;
  };

  colors?: {
    background?: string;
    circle?: string;
    disk?: string;
    center?: string;
    radius?: string;
    diameter?: string;
    chord?: string;
    arc?: string;
    point?: string;
    text?: string;
    highlight?: string;
  };
};

// ============================================================
// MASSES
// ============================================================

export type MasseCanvasObject = {
  label: string;
  icon?: string;
  masse?: string;
  grammes?: number;
};

export type MasseCanvasData = {
  kind: "masse";

  variant: "objets" | "balance" | "conversion" | "estimation";

  objets?: MasseCanvasObject[];

  gauche?: MasseCanvasObject;
  droite?: MasseCanvasObject;

  from?: string;
  to?: string;

  objet?: MasseCanvasObject;
  choix?: string[];

  display?: {
    showMasses?: boolean;
    showLabels?: boolean;
    showComparison?: boolean;
  };

  questionLabel?: string;

  size?: {
    width?: number;
    height?: number;
  };
};

// ============================================================
// CONTENANCES
// ============================================================

export type ContenanceCanvasObject = {
  label: string;
  icon?: string;
  contenance?: string;
  millilitres?: number;
};

export type ContenanceCanvasData = {
  kind: "contenance";

  variant: "objets" | "conversion" | "estimation" | "comparaison";

  objets?: ContenanceCanvasObject[];

  gauche?: ContenanceCanvasObject;
  droite?: ContenanceCanvasObject;

  from?: string;
  to?: string;

  objet?: ContenanceCanvasObject;
  choix?: string[];

  display?: {
    showContenances?: boolean;
    showLabels?: boolean;
    showComparison?: boolean;
  };

  questionLabel?: string;

  size?: {
    width?: number;
    height?: number;
  };
};

// ============================================================
// ÉCHELLES
// ============================================================

export type EchelleCanvasData = {
  kind: "echelle";

  variant: "correspondance" | "distance_reelle" | "distance_plan";

  title?: string;

  echelleLabel?: string;

  planLabel?: string;
  reelLabel?: string;

  planDistance?: string;
  reelDistance?: string;

  points?: {
    start?: string;
    end?: string;
  };

  display?: {
    showEchelle?: boolean;
    showLabels?: boolean;
    showQuestion?: boolean;
  };

  questionLabel?: string;

  size?: {
    width?: number;
    height?: number;
  };
};

// ============================================================
// SchemaBarreCanvas
// ============================================================

export type SchemaBarrePart = {
  label: string;
  value?: string;
  unknown?: boolean;
  color?: string;
};

export type SchemaBarreCanvasData = {
  kind: "schema_barre";

  title?: string;

  /**
   * Valeur totale affichée au-dessus de la barre.
   * Exemple : "48", "total", "?"
   */
  total?: string;

  /**
   * Parties de la barre.
   * Exemple :
   * [
   *   { label: "Déjà", value: "18" },
   *   { label: "Manque", unknown: true }
   * ]
   */
  parts: SchemaBarrePart[];

  /**
   * Phrase courte affichée sous le schéma.
   */
  questionLabel?: string;

  display?: {
    showTotal?: boolean;
    showPartLabels?: boolean;
    showValues?: boolean;
    showQuestion?: boolean;
  };

  size?: {
    width?: number;
    height?: number;
  };
};

// ============================================================
// Droite graduée / Number line
// ============================================================

export type DroiteGradueePoint = {
  value: number;
  label?: string;
  color?: string;
};

export type DroiteGradueeCanvasData = {
  kind: "number_line";

  min?: number;
  max?: number;
  step?: number;

  points?: DroiteGradueePoint[];

  display?: {
    showTicks?: boolean;
    showValues?: boolean;
    showPoints?: boolean;
    showPointLabels?: boolean;
    showZero?: boolean;
  };

  size?: {
    width?: number;
    height?: number;
  };
};



export type ArbreProbaNoeud = {
  /** Étiquette du nœud atteint (ex. "A", "B", "B̄"). */
  label: string;
  /** Probabilité portée par la branche menant à ce nœud (ex. "0,6"). Affichée telle quelle. */
  proba?: string;
  /** Sous-branches (niveau suivant de l'arbre). */
  enfants?: ArbreProbaNoeud[];
};

export type ArbreProbabilitesCanvasData = {
  kind: "arbre_proba";
  titre?: string;
  /** Branches issues du nœud de départ (premier niveau de l'arbre pondéré). */
  racineEnfants: ArbreProbaNoeud[];
  size?: { width?: number; height?: number };
};

export type Repere3dPoint = {
  x: number;
  y: number;
  z: number;
  label?: string;
  couleur?: string;
};

export type Repere3dSegment = {
  /** Indices (dans `points`) des extrémités du segment. */
  de: number;
  a: number;
  couleur?: string;
  /** Trait pointillé (arêtes cachées, projections…). */
  pointille?: boolean;
};

export type Repere3dCanvasData = {
  kind: "repere3d";
  titre?: string;
  points?: Repere3dPoint[];
  /** Segments à tracer entre points (arêtes d'un solide, vecteurs…). */
  segments?: Repere3dSegment[];
  /** Affiche les axes $x$, $y$, $z$ (vrai par défaut). */
  afficherAxes?: boolean;
  size?: { width?: number; height?: number };
};

// ============================================================
// La phrase analysée — LE canvas du français (20/08/2026)
// ============================================================
//
// Les vingt-huit canvas précédents sont tous mathématiques. Ouvrir le français
// demandait de trouver ce qui, dans cette matière, JOUE LE RÔLE de la droite
// graduée : un objet unique, dessiné toujours pareil, sur lequel toutes les
// notions viennent se poser. C'est la PHRASE SEGMENTÉE — les mots en étiquettes,
// les groupes sous un crochet, et des flèches par-dessus.
//
// Ce qu'elle montre, et que le texte ne montre pas :
// - la phrase se DÉCOUPE en groupes (et pas mot à mot) ;
// - un mot a une nature (au-dessus, en gris) ET une fonction (en dessous, en
//   couleur) — les deux lignes se lisent d'un coup d'œil, ce que trois pavés de
//   texte n'obtiennent jamais ;
// - un accord est un TRAIT ENTRE DEUX MOTS, pas une règle abstraite ;
// - une manipulation (déplacer, supprimer, remplacer) est un GESTE : le groupe
//   part en fantôme ailleurs, ou se barre.
//
// ⭐ LA COULEUR PORTE LA FONCTION, DANS TOUTE LA MATIÈRE (l'équivalent du
// « une couleur porteuse de sens par point » de la 2de) : le sujet est bleu
// partout, le verbe rouge partout, le complément d'objet vert, le
// circonstanciel orange, l'attribut violet. Un élève qui a lu une fiche
// reconnaît les couleurs dans toutes les autres — d'où `COULEURS_FONCTION`
// déduites du label dans `PhraseCanvas.tsx`, sans que la fiche ait à les écrire.
//
// ⛔ PAS POUR : un texte de plusieurs phrases (les reprises d'un paragraphe
// entier), ni un tableau de conjugaison. Une phrase, dessinée en une ligne.

export type PhraseCanvasMot = {
  /** Le mot, tel qu'il s'écrit. La ponctuation finale est un « mot » comme
   *  les autres : c'est ainsi qu'elle se montre du doigt. */
  texte: string;
  /** La NATURE (classe grammaticale), affichée au-dessus en gris : « nom »,
   *  « déterminant », « verbe », « adjectif », « préposition ». */
  nature?: string;
  /** Le mot dont on parle : étiquette pleine, contour épais. */
  focus?: boolean;
  /** Le mot est barré — la manipulation « je supprime » (un CC se supprime,
   *  un COD non). */
  barre?: boolean;
  /** Force la couleur de l'étiquette (sinon : celle du groupe qui la porte). */
  color?: string;
};

export type PhraseCanvasGroupe = {
  /** Indices des mots couverts, bornes comprises : [premier, dernier]. */
  mots: [number, number];
  /** La FONCTION, écrite sous le crochet : « sujet », « COD », « CC de temps »,
   *  « attribut du sujet ». La couleur s'en déduit. */
  label: string;
  color?: string;
  /** Le groupe se redessine en fantôme à un autre endroit de la phrase, avec
   *  une flèche : la mobilité du complément circonstanciel. */
  deplacable?: boolean;
};

export type PhraseCanvasLien = {
  /** Indices des deux mots reliés. */
  de: number;
  vers: number;
  /** Ce que le lien impose ou demande : « pluriel », « à qui ? », « = ». */
  label?: string;
  /**
   * - `accord`   : arc plein AU-DESSUS (déterminant → nom, sujet → verbe) ;
   * - `question` : arc AU-DESSUS étiqueté d'une question (« quoi ? », « à qui ? ») ;
   * - `reprise`  : arc pointillé EN DESSOUS, du pronom vers ce qu'il remplace.
   */
  type?: "accord" | "question" | "reprise";
};

export type PhraseCanvasData = {
  kind: "phrase";
  titre?: string;
  mots: PhraseCanvasMot[];
  groupes?: PhraseCanvasGroupe[];
  liens?: PhraseCanvasLien[];
  /** Phrase courte sous le dessin (la consigne, la remarque). */
  legende?: string;
  display?: {
    /** Ligne des natures au-dessus des mots (défaut : vrai s'il y en a). */
    showNatures?: boolean;
    /** Crochets + étiquettes de fonction (défaut : vrai s'il y a des groupes). */
    showGroupes?: boolean;
  };
  /**
   * ⭐ LA LARGEUR OÙ LA PHRASE PASSE À LA LIGNE (défaut : 250).
   *
   * C'est le réglage qui décide de la lisibilité sur téléphone, et il se calcule.
   * Mesuré sur la fiche réelle en 375 px de large : le bloc qui reçoit un dessin
   * ne fait que 226 px une fois les marges de carte enlevées. Un SVG se met à
   * l'échelle de son bloc — une phrase dessinée sur 466 px y arrive donc à
   * 226/466, et ses mots écrits en 16 px s'affichent en 7,8 px.
   *
   * À 300, le rapport est de 0,75 : les mots restent à 12 px sur un téléphone,
   * et la phrase se plie en deux lignes plutôt que de rapetisser. Une phrase
   * longue perd de la hauteur, jamais de la taille de police.
   */
  largeurMax?: number;
  /** La hauteur se CALCULE d'après les bandes réellement dessinées ; ne la
   *  forcer que pour une raison précise. La largeur, elle, se règle. */
  size?: { width?: number; height?: number };
};

// ─── LE CANVAS DE LA CONJUGAISON ──────────────────────────────────────────────
// Ajouté le 23/08/2026, sur décision de Frédéric : « on ajoute un canvas, à cet
// âge il faut des dessins », « ou schéma ludique ».
//
// ⭐ POURQUOI IL A FALLU EN CRÉER UN. `phrase` est le canvas du français, et son
// commentaire l'interdit explicitement pour « un tableau de conjugaison ». Les
// quatre notions de conjugaison de la 6e n'avaient donc AUCUN dessin possible :
// on ne pouvait pas écrire leurs fiches sans violer la règle qui commande tout
// le chantier — « montrer, pas raconter ».
//
// ⭐ CE QU'IL MONTRE, ET POURQUOI CETTE FORME-LÀ. Une forme verbale n'est pas un
// mot : c'est un mot ASSEMBLÉ. Le BO le dit dans ces termes — « identifier la
// composition de la terminaison : la marque de temps et la marque de personne »,
// « connaitre la composition EN DEUX PARTIES des temps composés ». On dessine
// donc des WAGONS qu'on accroche : chaque morceau est une caisse posée sur ses
// roues, et la forme verbale est le train entier. La métaphore n'est pas un
// décor — elle dit la vérité grammaticale, et un enfant de dix ans la lit sans
// explication.
//
// ⛔ PAS POUR : une phrase (c'est `phrase`), ni une durée sur une horloge (c'est
// `duree`). Ici, l'objet est LE VERBE, seul, démonté.

/** Un wagon : un morceau de la forme verbale. La couleur vient du rôle, jamais
 *  de l'appelant — comme dans `phrase`, pour que deux fiches ne divergent pas.
 *  radical bleu · marque de temps orange · marque de personne verte. */
export type ConjugaisonSegment = {
  texte: string;
  role: "radical" | "temps" | "personne";
  /** Écrit sous le wagon, en petit : « imparfait », « 1re pers. plur. ». */
  note?: string;
  /** Le wagon qui change d'une personne à l'autre — contour épais et teinte
   *  soutenue. C'est ainsi qu'on montre une variation du radical. */
  alerte?: boolean;
};

/** Une ligne du tableau des six personnes (mode `tableau`). */
export type ConjugaisonLigne = {
  pronom: string;
  radical: string;
  terminaison: string;
  /** La ligne où le radical change : « j'appelle » face à « nous appelons ». */
  alerte?: boolean;
};

/** Un repère posé sur la frise (mode `frise`), pour la valeur des temps. */
export type ConjugaisonRepere = {
  texte: string;
  zone: "passe" | "present" | "futur";
  note?: string;
};

export type ConjugaisonCanvasData = {
  kind: "conjugaison";
  titre?: string;
  /**
   * · `wagons` (défaut) : la forme verbale démontée en radical + marques.
   * · `composee`   : auxiliaire + participe passé, les deux caisses accrochées,
   *                  avec la flèche d'accord — ou son absence, qui est le point.
   * · `tableau`    : les six personnes d'un temps, la partie qui varie en relief.
   * · `frise`      : passé / présent / futur, pour la valeur des temps.
   */
  mode?: "wagons" | "composee" | "tableau" | "frise";

  /** L'infinitif, affiché en étiquette de départ (« chanter »). */
  infinitif?: string;
  /** Le pronom, posé devant le train (« nous »). */
  pronom?: string;

  /** mode `wagons`. */
  segments?: ConjugaisonSegment[];

  /** mode `composee`. */
  auxiliaire?: { texte: string; note?: string };
  participe?: { texte: string; note?: string };
  /** La flèche d'accord. `absent: true` la remplace par une croix : c'est ainsi
   *  qu'on montre « avec avoir et le COD placé après, on n'accorde pas ». */
  accord?: { label?: string; absent?: boolean };

  /** mode `tableau`. */
  temps?: string;
  lignes?: ConjugaisonLigne[];

  /** mode `frise`. */
  reperes?: ConjugaisonRepere[];

  /** Phrase courte sous le dessin (la consigne, la remarque). */
  legende?: string;
  /**
   * ⭐ MÊME RÈGLE QUE `phrase` : la largeur se règle, la hauteur se calcule.
   * Le bloc qui reçoit un dessin ne fait que 201 px dans une carte de méthode
   * sur un téléphone de 375. Défaut : 250, pour que les lettres restent au-dessus
   * de 11 px une fois le dessin mis à l'échelle de son bloc.
   */
  size?: { width?: number; height?: number };
};

// ─── LE PREMIER CANVAS ILLUSTRATIF ────────────────────────────────────────────
// Ajouté le 01/09/2026, sur décision de Frédéric : « je pense qu'il faudrait
// apprendre les notions avec des personnes de BD à colorier », « ou de nature »,
// « avec l'importance aussi de la calligraphie », « il faut commencer à créer
// des canvas illustratifs ».
//
// ⭐ POURQUOI IL A FALLU EN CRÉER UN. Les 32 canvas existants sont MATHÉMATIQUES
// OU GRAMMATICAUX : pas un seul n'illustre. La fiche `francais-cm1-fluence-lecture`
// l'a montré en creux — 27 dessins tirés de 2 kinds seulement, presque identiques,
// et c'est cette monotonie autant que la densité qui la rendait « chargée ».
// Pour le CP, le CE1 et le CE2 (45 notions, 349 micros, ZÉRO fiche au 01/09), le
// problème n'est plus la monotonie : un enfant de six ans NE PEUT PAS LIRE SA
// FICHE. Il faut donc un dessin qui porte la notion sans passer par le texte.
//
// ⭐ DESSINÉ EN CODE, PAS IMPORTÉ. Une troupe paramétrique coûte cher une fois,
// puis chaque fiche ne coûte que de la donnée. Trois choses qu'une image
// n'aurait pas données : la cohérence des personnages sur 45 fiches (garantie
// par construction, pas par la main), la netteté à l'impression A4 (vectoriel),
// et — la raison décisive — DE VRAIES ZONES FERMÉES. Une illustration
// vectorisée donne des TRAITS ; on ne peut pas colorier un trait. Ici chaque
// partie est une forme fermée, donc coloriable au crayon sur le papier ET au
// clic à l'écran, ce qui la rend projetable en classe.
//
// ⭐ LE COLORIAGE EST L'EXERCICE, PAS LA DÉCORATION. C'est la condition qui
// sépare ce canvas d'un cahier de vacances. « Colorie en rouge ce que le
// personnage FAIT » = repérer le verbe. Et la couleur demandée est déjà celle de
// toute la matière (sujet bleu, verbe rouge, objet vert) : l'enfant construit au
// CP le code qu'il relira au CM1 dans `phrase`.
//
// ⭐ LA BULLE EST LE MEILLEUR DESSIN DE « PHRASE » POUR UN PETIT. `phrase` est un
// diagramme à crochets — abstrait. Une bulle de BD est le même objet rendu
// concret : elle commence par une majuscule, elle finit par un point, et sa
// FORME dit son type (en éclats = on crie, en nuage = on pense). La ponctuation
// y devient visible sans qu'on la nomme.
//
// ⛔ PAS POUR : analyser une phrase (c'est `phrase`), démonter un verbe (c'est
// `conjugaison`), ni décorer une fiche de collège. Ici, l'objet est UN ENFANT
// QUI FAIT QUELQUE CHOSE, et ce qu'il fait est la notion.

/**
 * LA TROUPE. Cinq personnages, pas cinquante : l'enfant doit les RECONNAITRE
 * d'une fiche à l'autre — c'est ce qui fait une BD plutôt qu'un stock d'images.
 * Quatre enfants et une mascotte, `pic` le paille-en-queue, qui donne à
 * l'univers son accent réunionnais sans le rendre illisible ailleurs.
 */
export type PersonnageId = "nina" | "teo" | "zoe" | "ravi" | "pic";

/** Ce que le personnage FAIT — et ce qu'il fait est souvent la notion elle-même
 *  (le verbe qu'on cherche, l'action qu'on raconte). */
export type PersonnagePose =
  | "debout"
  | "montre"
  | "bras_leves"
  | "marche"
  | "assis";

/** Ce que le personnage RESSENT. Sert aussi la notion : les types de phrases se
 *  lisent sur le visage autant que dans la ponctuation. */
export type PersonnageExpression =
  | "sourire"
  | "rire"
  | "surpris"
  | "pense"
  | "triste"
  /** ⭐ Les yeux fermés ne sont pas une humeur, c'est un GESTE DE TRAVAIL :
   *  on compte les syllabes les yeux fermés, parce qu'ainsi on ne peut plus
   *  compter les lettres. Ajouté le 03/09/2026 pour la conscience phonologique
   *  du CP, où le personnage annonçait « je ferme les yeux » en regardant
   *  droit devant lui. */
  | "yeux_fermes";

export type PersonnageBulle = {
  texte: string;
  /** `parole` (défaut) · `pensee` (nuage + petits ronds) · `cri` (en éclats).
   *  ⭐ La forme EST la leçon : déclarative, pensée, exclamative. */
  forme?: "parole" | "pensee" | "cri";
  /**
   * ENTOURE UN SIGNE DANS LA BULLE — la majuscule du début, le point de la fin.
   * C'est ce qui transforme un décor en exercice : au CP, la notion « phrase »
   * EST « ça commence par une majuscule et ça finit par un point ».
   */
  marques?: ("majuscule" | "point")[];
};

export type PersonnageCanvasData = {
  kind: "personnage";
  personnage: PersonnageId;
  pose?: PersonnagePose;
  expression?: PersonnageExpression;
  bulle?: PersonnageBulle;
  /**
   * ⭐ `coloriage` : trait noir épais, aucun aplat — la feuille se photocopie en
   * noir et blanc et l'enfant met la couleur. C'est le mode par défaut du cycle 2,
   * et il RÈGLE le problème connu de l'impression : la couleur ne se perd plus au
   * photocopieur puisqu'elle n'est pas imprimée, elle est posée par l'élève.
   * `couleur` : le personnage rendu fini, pour l'écran et le mode classe.
   */
  mode?: "couleur" | "coloriage";
  /** La consigne, sous le dessin. Courte : c'est un ordre, pas une explication.
   *  ⛔ Jamais un commentaire d'adulte — voir la règle « jamais 120 mots en
   *  corps 10 » (31/08/2026). */
  consigne?: string;
  /**
   * ⭐ MÊME RÈGLE QUE `phrase` ET `conjugaison` : la largeur se règle, la hauteur
   * se calcule. Défaut 250, pour que les lettres restent au-dessus de 11 px une
   * fois le dessin mis à l'échelle de son bloc.
   */
  size?: { width?: number; height?: number };
};

// ─── LA BIBLIOTHÈQUE D'OBJETS ─────────────────────────────────────────────────
// Ajoutée le 02/09/2026, sur demande de Frédéric : « les dessins sont pas mal,
// on pourrait rajouter bateau, un verre, des objets du quotidien non ? », « avoir
// une bibliothèque plus fournie ».
//
// ⭐ POURQUOI UN SECOND `kind` PLUTÔT QUE D'ÉLARGIR `personnage`. Un verre n'a
// ni pose, ni humeur, ni bulle : lui donner les champs d'un enfant, ce serait
// dire à la fiche qu'un verre peut être triste. Et surtout les deux ne servent
// pas la même chose — `personnage` montre une ACTION (le verbe, la phrase, le
// dialogue), `objets` sert à NOMMER et à CLASSER (vocabulaire, genre, familles
// de mots).
//
// ⭐⭐ ET LE CHAMP QUI EN FAIT UN EXERCICE, C'EST `nombre`. Une pomme, puis trois
// pommes : le pluriel devient VISIBLE avant d'être une règle. C'est la même
// idée que le coloriage dans `personnage` — le dessin ne décore pas la leçon,
// il la pose.
//
// ⛔ PAS POUR : une quantité à calculer (c'est `schema_barre` ou `fraction`),
// ni une figure géométrique (chaque objet est un dessin, pas une forme mesurable).

export type ObjetId =
  // Le quotidien
  | "bateau"
  | "verre"
  | "tasse"
  | "livre"
  | "cartable"
  | "cle"
  | "ballon"
  | "voiture"
  | "maison"
  | "chapeau"
  // Ce qui se mange
  | "pomme"
  | "banane"
  // La nature
  | "arbre"
  | "fleur"
  | "feuille"
  | "soleil"
  | "nuage"
  | "etoile"
  // Les animaux
  | "poisson"
  | "oiseau"
  | "papillon"
  | "chat";

export type ObjetsElement = {
  quoi: ObjetId;
  /** Dessiné en `nombre` exemplaires côte à côte. ⭐ C'est ainsi qu'on montre le
   *  pluriel : « une pomme » / « des pommes ». 1 par défaut, 5 au maximum —
   *  au-delà, les dessins deviennent illisibles avant d'être instructifs. */
  nombre?: number;
  /** Le mot, écrit sous l'objet. C'est lui qui fait du dessin du vocabulaire. */
  label?: string;
  /** Entouré : c'est la réponse, ou ce qu'on demande de trouver. */
  marque?: boolean;
};

export type ObjetsCanvasData = {
  kind: "objets";
  elements: ObjetsElement[];
  /** Nombre de colonnes. Par défaut, le canvas en déduit un des éléments. */
  colonnes?: number;
  /** `coloriage` (défaut) : trait noir fermé, prêt à photocopier. */
  mode?: "couleur" | "coloriage";
  consigne?: string;
  size?: { width?: number; height?: number };
};

// ─── LA RÉGLURE SEYÈS ─────────────────────────────────────────────────────────
// Ajoutée le 02/09/2026. Frédéric, en posant le format du cycle 2 : « avec
// l'importance aussi de la calligraphie ».
//
// ⭐ POURQUOI C'EST UN CANVAS ET NON UNE IMAGE. La réglure est le seul « dessin »
// du site qui ne montre rien : c'est un ESPACE À REMPLIR. Elle doit donc être
// exacte en millimètres — un enfant apprend la taille de ses lettres sur ces
// interlignes-là — et elle change de taille selon la classe (3 mm au CP, 2,5 au
// CE1, 2 au CE2, comme les cahiers). Une image ne saurait faire ni l'un ni
// l'autre ; quatre lignes calculées, si.
//
// ⭐ ET C'EST LE QUATRIÈME GESTE DE LA FEUILLE. Le format du cycle 2 tient en
// quatre verbes : regarder, écouter, colorier, TRACER. Sans réglure, la feuille
// n'a pas de place où écrire, et « la fiche se fait au crayon » reste un slogan.
//
// ⚠️ LA POLICE CURSIVE N'EST PAS CELLE DE L'ÉCOLE. Le modèle s'écrit avec la
// pile cursive du système (Segoe Script sur Windows). Les vraies polices
// scolaires — Cursive Standard, Belle Allure — sont libres et devront être
// embarquées : le `l` et le `b` de l'école ont une boucle que Segoe Script ne
// forme pas pareil. À faire avant de publier des fiches d'écriture.

export type ReglureCanvasData = {
  kind: "reglure";
  /** Le mot ou la phrase à recopier, écrit sur la première ligne. Sans lui, la
   *  réglure est vide — ce qui est un usage légitime (« écris ta phrase »). */
  modele?: string;
  /**
   * ⭐ « CURSIVE » RECOUVRE DEUX ÉCRITURES, ET LE CP LES APPREND SÉPARÉMENT :
   * · `cursive` (défaut) — les lettres s'attachent, c'est l'écriture qu'on
   *   apprend à tracer et celle du cahier ;
   * · `baton` — les lettres sont détachées, c'est l'écriture SCRIPT des
   *   premiers mois, celle qu'on lit dans les livres avant de savoir attacher.
   * Les deux viennent de Marelle, la police de l'école (voir globals.css).
   */
  ecriture?: "cursive" | "baton";
  /** Nombre de lignes d'écriture, modèle compris. Défaut 3. */
  lignes?: number;
  /** L'interligne en millimètres : 3 au CP, 2,5 au CE1, 2 au CE2. */
  interligne?: number;
  /** Le modèle en pointillé sur la deuxième ligne, à repasser au crayon. */
  aRepasser?: boolean;
  /** Un point vert là où le crayon se pose, au début de chaque ligne. */
  depart?: boolean;
  consigne?: string;
  size?: { width?: number };
};

export type CanvasFigure =
  | ReglureCanvasData
  | ObjetsCanvasData
  | PersonnageCanvasData
  | ConjugaisonCanvasData
  | PhraseCanvasData
  | TriangleCanvasData
  | QuadrilatereCanvasData
  | FigureLibreCanvasData
  | CanvasProbabilitesData
  | ArbreProbabilitesCanvasData
  | Repere3dCanvasData
  | TableauProportionnaliteCanvasData
  | NumberLineCanvasData
  | Solide3DCanvasData
  | SectionSolideCanvasData
  | ThalesCanvasData
  | StatGraphCanvasData
  | AngleCanvasData
  | FonctionGraphiqueCanvasData
  | FonctionTableauCanvasData
  | TableauDonneesCanvasData
  | CalculPoseCanvasData
  | FractionCanvasData
  | ScratchCanvasData
  | AlgebreCanvasData
  | TransformationCanvasData
  | HomothetieCanvasData
  | SuiteCanvasData
  | DureeCanvasData
  | ReperageCanvasData
  | DroitesCanvasData
  | CercleCanvasData
  | MasseCanvasData
  | ContenanceCanvasData
  | SchemaBarreCanvasData
  | DroiteGradueeCanvasData
  | EchelleCanvasData;