// lib/canvas/AnimauxCanvas.tsx
"use client";

// ─── LES ANIMAUX À COMPTER (cycle 2, 14/11/2026) ──────────────────────────────
// Le canvas du coach qui pose la bibliothèque `lib/canvas/animaux` : une
// collection (grille de N animaux) ou plusieurs côte à côte (comparer, réunir,
// partager). Toute la mise en page d'une collection est dans `svgGrille` ; ici,
// seulement le nom au-dessus de chaque collection et la consigne dessous.
//
// ⛔ AUCUN NOMBRE N'EST ÉCRIT : ni à l'écran, ni dans l'aria-label (svgGrille
// annonce « 7 poules » par défaut — c'est la réponse ; on lui passe un titre).
// ⭐ Responsive : chaque grille a `width: 100%` plafonné à sa largeur native ;
// deux collections passent l'une sous l'autre quand la carte est étroite.

import type { AnimauxCanvasData, CanvasFigure } from "@/lib/tutor-v4/types";
import { svgGrille } from "./animaux/svg";

const ECOLE = '"Andika", ui-sans-serif, system-ui, sans-serif';

function isAnimaux(figure: CanvasFigure): figure is AnimauxCanvasData {
  return figure.kind === "animaux";
}

export default function AnimauxCanvas({ figure }: { figure: CanvasFigure }) {
  if (!isAnimaux(figure)) return null;
  const collections = figure.collections?.length
    ? figure.collections
    : figure.groupes?.length
      ? [{ groupes: figure.groupes }]
      : [];
  if (!collections.length) return null;

  const plusieurs = collections.length > 1;
  const titre = figure.description ?? "des animaux à compter";
  const graine = figure.graine ?? 1;

  return (
    <div style={{ width: "100%", fontFamily: ECOLE }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: plusieurs ? 16 : 0,
        }}
      >
        {collections.map((c, i) => {
          const svg = svgGrille(c.groupes, {
            colonnes: figure.colonnes ?? (plusieurs ? Math.min(5, Math.max(1, ...c.groupes.map((g) => g.nombre))) : 5),
            taille: figure.taille ?? 48,
            ecart: 8,
            disposition: figure.disposition,
            melange: figure.melange,
            graine: graine + i * 31,
            coloriage: figure.mode === "coloriage",
            fond: plusieurs ? "#f8fafc" : "#ffffff",
            titre: c.nom ? `${titre} : ${c.nom}` : titre,
          }).replace(/ width="\d+" height="\d+"/, ' width="100%"');
          const largeur = Number(/viewBox="0 0 (\d+)/.exec(svg)?.[1] ?? 300);
          return (
            <figure
              key={i}
              style={{
                margin: 0,
                flex: plusieurs ? "1 1 140px" : "1 1 auto",
                maxWidth: largeur,
                textAlign: "center",
              }}
            >
              {c.nom && (
                <figcaption style={{ fontSize: 15, fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>
                  {c.nom}
                </figcaption>
              )}
              <div style={{ lineHeight: 0 }} dangerouslySetInnerHTML={{ __html: svg }} />
            </figure>
          );
        })}
      </div>
      {figure.consigne && (
        <p style={{ margin: "8px 0 0", fontSize: 14, color: "#334155", textAlign: "center" }}>{figure.consigne}</p>
      )}
    </div>
  );
}
