// lib/canvas/ArbreTriCanvas.tsx
"use client";

import type { CanvasFigure, NoeudArbreTri } from "@/lib/tutor-v4/types_canvas";
import { couper } from "./ensembles";

// Un arbre de tri : une question par nœud, « oui » à gauche, « non » à droite. Les
// feuilles sont toutes sur la dernière ligne, à égale distance ; un nœud se place au
// milieu de ses deux branches. Une case « ? » est celle que l'élève doit trouver.

const W = 360;
const PAS = 84;

/** Les lignes d'une question : le « ? » reste collé au dernier mot, jamais seul à la ligne. */
const lignesQuestion = (q: string) => couper(q.replace(/ \?/g, " ?"), 20);

type Place = { n: NoeudArbreTri; x: number; y: number; oui?: Place; non?: Place };

const profondeur = (n: NoeudArbreTri): number => ("feuille" in n ? 0 : 1 + Math.max(profondeur(n.oui), profondeur(n.non)));

function placer(n: NoeudArbreTri, prof: number, dernier: number, largeur: number, compteur: { i: number }): Place {
  if ("feuille" in n) return { n, x: (compteur.i++ + 0.5) * largeur, y: 8 + dernier * PAS };
  const oui = placer(n.oui, prof + 1, dernier, largeur, compteur);
  const non = placer(n.non, prof + 1, dernier, largeur, compteur);
  return { n, x: (oui.x + non.x) / 2, y: 8 + prof * PAS, oui, non };
}

const feuilles = (n: NoeudArbreTri): number => ("feuille" in n ? 1 : feuilles(n.oui) + feuilles(n.non));

function aplatir(p: Place): Place[] {
  return p.oui && p.non ? [p, ...aplatir(p.oui), ...aplatir(p.non)] : [p];
}

const HAUT_BOITE = (lignes: number) => 10 + 16 * lignes;

function Branche({ de, vers, mot, couleur }: { de: Place; vers: Place; mot: string; couleur: string }) {
  const y1 = de.y + HAUT_BOITE(lignesQuestion("question" in de.n ? de.n.question : "").length);
  const y2 = vers.y;
  const mx = (de.x + vers.x) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g>
      <line x1={de.x} y1={y1} x2={vers.x} y2={y2} stroke={couleur} strokeWidth={2} />
      <rect x={mx - 15} y={my - 9} width={30} height={17} rx={4} fill="#ffffff" />
      <text x={mx} y={my + 4} textAnchor="middle" fontSize={13} fontWeight={700} fill={couleur}>{mot}</text>
    </g>
  );
}

export default function ArbreTriCanvas({ figure }: { figure: CanvasFigure }) {
  if (figure.kind !== "arbre_tri") return null;
  const dernier = profondeur(figure.racine);
  const largeur = W / feuilles(figure.racine);
  const racine = placer(figure.racine, 0, dernier, largeur, { i: 0 });
  const toutes = aplatir(racine);
  const H = 8 + dernier * PAS + 40;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 480, display: "block", margin: "0 auto" }} role="img" aria-label={figure.description ?? "Un arbre de tri"}>
      {toutes.map((p, i) =>
        p.oui && p.non ? (
          <g key={i}>
            <Branche de={p} vers={p.oui} mot="oui" couleur="#15803d" />
            <Branche de={p} vers={p.non} mot="non" couleur="#b91c1c" />
          </g>
        ) : null,
      )}
      {toutes.map((p, i) => {
        const estFeuille = "feuille" in p.n;
        const texte = "feuille" in p.n ? p.n.feuille : p.n.question;
        const lignes = estFeuille ? [texte] : lignesQuestion(texte);
        const h = HAUT_BOITE(lignes.length);
        const larg = estFeuille ? Math.min(largeur - 4, Math.max(44, texte.length * 7.6 + 10)) : Math.min(152, Math.max(...lignes.map((l) => l.length)) * 7.4 + 14);
        const cache = texte === "?";
        return (
          <g key={i}>
            <rect x={p.x - larg / 2} y={p.y} width={larg} height={h} rx={estFeuille ? 12 : 5} fill={cache ? "#fff7ed" : estFeuille ? "#dbeafe" : "#f1f5f9"} stroke={cache ? "#ea580c" : estFeuille ? "#1d4ed8" : "#334155"} strokeWidth={1.5} strokeDasharray={cache ? "4 3" : undefined} />
            {lignes.map((l, k) => (
              <text key={k} x={p.x} y={p.y + 18 + 16 * k} textAnchor="middle" fontSize={13} fontWeight={estFeuille ? 700 : 600} fill={cache ? "#c2410c" : "#0f172a"}>{l}</text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
