// LES FIGURES DU TEST CRPE (16/10/2026).
//
// Frédéric : « as-tu mis des exemples de Pythagore et Thalès en schéma ? » —
// non, c'était du texte seul. Deux SVG en ligne, sans bibliothèque.
//
// ⛔ PYTHAGORE : PAS DE MARQUE D'ANGLE DROIT. La question demande justement si
// le triangle est rectangle ; le coder donnerait la réponse. Les longueurs
// sont à l'échelle (5 : 12 : 13), comme sur une copie de concours.
//
// THALÈS : la configuration classique, A en haut, (MN) en orange avec son
// « ? », et les seules longueurs que donne l'énoncé.

const TRAIT = "#0f172a";
const ORANGE = "#ea580c";
const GRIS = "#475569";

function Pythagore() {
  // Échelle 18 px par cm : 5 cm → 90 px, 12 cm → 216 px.
  const P = { x: 52, y: 166 };
  const Q = { x: 268, y: 166 };
  const R = { x: 52, y: 76 };
  return (
    <svg viewBox="0 58 320 142" className="mx-auto w-full max-w-sm" role="img"
      aria-label="Un triangle dont les côtés mesurent 5 cm, 12 cm et 13 cm">
      <polygon points={`${P.x},${P.y} ${Q.x},${Q.y} ${R.x},${R.y}`}
        fill="#fff7ed" stroke={TRAIT} strokeWidth="2.5" strokeLinejoin="round" />
      <text x="160" y="190" textAnchor="middle" fontSize="15" fontWeight="700" fill={GRIS}>12 cm</text>
      <text x="40" y="125" textAnchor="end" fontSize="15" fontWeight="700" fill={GRIS}>5 cm</text>
      <text x="172" y="108" fontSize="15" fontWeight="700" fill={GRIS}>13 cm</text>
    </svg>
  );
}

function Thales() {
  const A = { x: 160, y: 22 };
  const B = { x: 30, y: 196 };
  const C = { x: 290, y: 196 };
  // M et N aux 3/5 de [AB] et [AC] : AM = 3, AB = 5.
  const M = { x: A.x + 0.6 * (B.x - A.x), y: A.y + 0.6 * (B.y - A.y) };
  const N = { x: A.x + 0.6 * (C.x - A.x), y: A.y + 0.6 * (C.y - A.y) };
  const point = (p: { x: number; y: number }) => <circle cx={p.x} cy={p.y} r="3.5" fill={TRAIT} />;
  return (
    <svg viewBox="0 0 320 250" className="mx-auto w-full max-w-sm" role="img"
      aria-label="Triangle ABC ; M sur [AB], N sur [AC], (MN) parallèle à (BC) ; AM = 3 cm, AB = 5 cm, BC = 10 cm ; MN est demandé">
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
        fill="#f0f9ff" stroke={TRAIT} strokeWidth="2.5" strokeLinejoin="round" />
      <line x1={M.x} y1={M.y} x2={N.x} y2={N.y} stroke={ORANGE} strokeWidth="3" />
      {[A, B, C, M, N].map((p, i) => <g key={i}>{point(p)}</g>)}
      <text x={A.x} y={A.y - 8} textAnchor="middle" fontSize="16" fontWeight="800" fill={TRAIT}>A</text>
      <text x={B.x - 6} y={B.y + 18} textAnchor="middle" fontSize="16" fontWeight="800" fill={TRAIT}>B</text>
      <text x={C.x + 6} y={C.y + 18} textAnchor="middle" fontSize="16" fontWeight="800" fill={TRAIT}>C</text>
      <text x={M.x - 10} y={M.y + 4} textAnchor="end" fontSize="16" fontWeight="800" fill={TRAIT}>M</text>
      <text x={N.x + 10} y={N.y + 4} fontSize="16" fontWeight="800" fill={TRAIT}>N</text>
      {/* Les longueurs données, et l'inconnue */}
      <text x={(A.x + M.x) / 2 - 12} y={(A.y + M.y) / 2} textAnchor="end" fontSize="14" fontWeight="700" fill={GRIS}>3 cm</text>
      <text x={(B.x + C.x) / 2} y={B.y + 20} textAnchor="middle" fontSize="14" fontWeight="700" fill={GRIS}>10 cm</text>
      <text x={(M.x + N.x) / 2} y={M.y - 8} textAnchor="middle" fontSize="18" fontWeight="900" fill={ORANGE}>?</text>
      <text x="160" y="244" textAnchor="middle" fontSize="13" fontWeight="700" fill={GRIS}>
        AB = 5 cm · (MN) // (BC)
      </text>
    </svg>
  );
}

export default function FigureCrpe({ figure }: { figure: "pythagore" | "thales" }) {
  return (
    <div className="mt-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
      {figure === "pythagore" ? <Pythagore /> : <Thales />}
    </div>
  );
}
