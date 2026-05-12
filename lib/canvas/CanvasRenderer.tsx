// lib/canvas/CanvasRenderer.tsx
"use client";

import type { CanvasFigure } from "@/lib/tutor-v4/types";

import TriangleCanvas from "./TriangleCanvas";
import QuadrilatereCanvas from "./QuadrilatereCanvas";
import FigureLibreCanvas from "./FigureLibreCanvas";
import DroiteGradueeCanvas from "./DroiteGradueeCanvas";
import ThalesCanvas from "./ThalesCanvas";
import Solide3DCanvas from "./Solide3DCanvas";
import StatGraphCanvas from "./StatGraphCanvas";
import CanvasProbabilites from "./ProbabilitesCanvas";
import AngleCanvas from "./AngleCanvas";
import FonctionGraphiqueCanvas from "./FonctionGraphiqueCanvas";
import FonctionTableauCanvas from "./FonctionTableauCanvas";
import TransformationCanvas from "./TransformationCanvas";
import TableauDonneesCanvas from "./TableauDonneesCanvas";
import CalculPoseCanvas from "./CalculPoseCanvas";
import FractionCanvas from "./FractionCanvas";
import TableauProportionnaliteCanvas from "./TableauProportionnaliteCanvas";
import ScratchCanvas from "./ScratchCanvas";
import SectionSolideCanvas from "./SectionSolideCanvas";
import AlgebreCanvas from "./AlgebreCanvas";

type Props = {
  figure?: CanvasFigure | null;
};

export default function CanvasRenderer({ figure }: Props) {
  if (!figure) return null;

  switch (figure.kind) {
    case "triangle":
      return <TriangleCanvas figure={figure} />;

    case "quadrilatere":
      return <QuadrilatereCanvas figure={figure} />;

    case "figure_libre":
      return <FigureLibreCanvas figure={figure} />;

    case "number_line":
      return <DroiteGradueeCanvas figure={figure} />;

    case "thales":
      return <ThalesCanvas figure={figure} />;

    case "solide_3d":
      return <Solide3DCanvas figure={figure} />;

    case "section_solide":
      return <SectionSolideCanvas figure={figure} />;

    case "stat_graph":
      return <StatGraphCanvas figure={figure} />;

    case "probabilites":
      return <CanvasProbabilites figure={figure} />;

    case "angle":
      return <AngleCanvas figure={figure} />;

    case "fonctionGraphique":
      return <FonctionGraphiqueCanvas figure={figure} />;

    case "fonction_tableau":
      return <FonctionTableauCanvas figure={figure} />;

    case "transformation":
      return <TransformationCanvas figure={figure} />;

    case "tableau_donnees":
      return <TableauDonneesCanvas figure={figure} />;

    case "tableau_proportionnalite":
      return <TableauProportionnaliteCanvas figure={figure} />;

    case "calcul_pose":
      return <CalculPoseCanvas figure={figure} />;

    case "fraction":
      return <FractionCanvas figure={figure} />;

    case "scratch":
      return <ScratchCanvas canvas={figure} />;

    case "algebre":
      return <AlgebreCanvas figure={figure} />;

    default:
      return null;
  }
}