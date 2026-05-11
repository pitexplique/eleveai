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
  | "boule"
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

export type CanvasFigure =
  | TriangleCanvasData
  | QuadrilatereCanvasData
  | FigureLibreCanvasData
  | CanvasProbabilitesData
  | TableauProportionnaliteCanvasData
  | NumberLineCanvasData
  | Solide3DCanvasData
  | ThalesCanvasData
  | StatGraphCanvasData
  | AngleCanvasData
  | FonctionGraphiqueCanvasData
  | FonctionTableauCanvasData
  | TableauDonneesCanvasData
  | CalculPoseCanvasData
  | FractionCanvasData
  | ScratchCanvasData
  | TransformationCanvasData;