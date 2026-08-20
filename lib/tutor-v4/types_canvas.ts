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

export type CanvasFigure =
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