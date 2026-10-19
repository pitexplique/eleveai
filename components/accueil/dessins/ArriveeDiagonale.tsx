// DESSIN : L'ARRIVÉE DE LA DIAGONALE DES FOUS 2026 (19/10/2026).
//
// Frédéric voulait la photo de L'Équipe (l'arrivée de Hugo Deck sous le chrono
// 22:54:24) ; elle est protégée, on ne la publie pas. Sa réponse : « fais-en un
// dessin ». ⛔ La silhouette est un coureur QUELCONQUE, pas un portrait : on ne
// prête pas de traits à une personne réelle.
// SVG en ligne : quelques Ko, net à toutes les tailles, aucune requête.

/** Les confettis, placés une fois pour toutes (pas de hasard au rendu) : un
 *  tirage pseudo-aléatoire fixe, qui évite le chrono, l'arche et le coureur. */
const alea = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};
const DANS = (x: number, y: number, x0: number, y0: number, x1: number, y1: number) =>
  x > x0 && x < x1 && y > y0 && y < y1;
const COULEURS = ["#facc15", "#f43f5e", "#22d3ee", "#a3e635", "#f97316", "#e879f9", "#ffffff"];
const CONFETTIS = Array.from({ length: 140 }, (_, i) => ({
  x: alea(i + 1) * 470,
  y: alea(i + 500) * 225 + 4,
  r: alea(i + 900) * 180,
  c: COULEURS[i % COULEURS.length],
}))
  .filter(
    ({ x, y }) =>
      !DANS(x, y, 162, 8, 318, 60) && // le chrono
      !DANS(x, y, 106, 52, 374, 98) && // le bandeau de l'arche
      !DANS(x, y, 205, 120, 275, 255), // le coureur
  )
  .slice(0, 60);

export default function ArriveeDiagonale({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 300"
      role="img"
      aria-label="Dessin : un coureur franchit les bras levés l'arche d'arrivée de la Diagonale des Fous 2026, sous le chrono 22:54:24 et une pluie de confettis."
      className={`block h-auto w-full ${className}`}
    >
      <defs>
        <linearGradient id="dgf-ciel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1437" />
          <stop offset="1" stopColor="#3b1d5e" />
        </linearGradient>
        <radialGradient id="dgf-lumiere" cx="0.5" cy="0.55" r="0.5">
          <stop offset="0" stopColor="#fde68a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fde68a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Le ciel de nuit et les montagnes de l'île */}
      <rect width="480" height="300" fill="url(#dgf-ciel)" />
      <path d="M0 205 L70 150 L120 175 L190 110 L250 160 L300 125 L370 170 L430 140 L480 165 L480 300 L0 300 Z" fill="#1e1b4b" />
      <path d="M0 225 L90 190 L160 210 L240 180 L320 205 L400 185 L480 200 L480 300 L0 300 Z" fill="#2e1065" />
      <ellipse cx="240" cy="190" rx="200" ry="120" fill="url(#dgf-lumiere)" />

      {/* Le sol et le public */}
      <rect y="250" width="480" height="50" fill="#334155" />
      <path d="M150 300 L210 250 L270 250 L330 300 Z" fill="#475569" />
      {Array.from({ length: 16 }, (_, i) => (
        <g key={i} fill={i % 2 ? "#0f172a" : "#1e293b"}>
          <circle cx={12 + i * 9 - (i > 7 ? -250 : 0)} cy={236 - (i % 3) * 3} r="6" />
          <rect x={6 + i * 9 - (i > 7 ? -250 : 0)} y={240 - (i % 3) * 3} width="12" height="16" rx="4" />
        </g>
      ))}

      {/* L'arche d'arrivée */}
      <rect x="120" y="70" width="16" height="185" rx="3" fill="#dc2626" />
      <rect x="344" y="70" width="16" height="185" rx="3" fill="#dc2626" />
      <rect x="112" y="58" width="256" height="34" rx="6" fill="#dc2626" />
      <text x="240" y="81" textAnchor="middle" fontSize="15" fontWeight="900" fill="#fff" fontFamily="system-ui, sans-serif">
        ARRIVÉE · DIAGONALE DES FOUS 2026
      </text>

      {/* Le chrono */}
      <rect x="170" y="14" width="140" height="40" rx="6" fill="#020617" stroke="#475569" strokeWidth="2" />
      <text x="240" y="44" textAnchor="middle" fontSize="28" fontWeight="700" fill="#f87171" fontFamily="ui-monospace, Menlo, monospace" letterSpacing="2">
        22:54:24
      </text>

      {/* Le coureur, bras levés, la ligne sous les pieds */}
      <rect x="200" y="248" width="80" height="4" fill="#fff" />
      <g stroke="#f8fafc" strokeWidth="9" strokeLinecap="round" fill="none">
        <path d="M240 172 L222 132" />
        <path d="M240 172 L258 132" />
        <path d="M240 205 L226 246" />
        <path d="M240 205 L256 244" />
      </g>
      <rect x="229" y="165" width="22" height="44" rx="9" fill="#facc15" />
      <text x="240" y="197" textAnchor="middle" fontSize="9" fontWeight="900" fill="#1e293b" fontFamily="system-ui, sans-serif">
        1
      </text>
      {/* Les trois barres façon Adidas sur la poitrine. Frédéric, 19/10, après
          avoir pesé la neutralité commerciale : « laisse le logo adidas », « ça
          pourrait donner des idées ». Pour le retirer : supprimer ce groupe. */}
      <g fill="#111827">
        <path d="M233.5 182 L236.5 182 L234.5 176.5 L231.5 176.5 Z" />
        <path d="M238.5 182 L241.5 182 L238.5 173.5 L235.5 173.5 Z" />
        <path d="M243.5 182 L246.5 182 L242.5 170.5 L239.5 170.5 Z" />
      </g>
      {/* La tête, et un BEAU SOURIRE (Frédéric : « mets-lui un beau sourire ») */}
      <circle cx="240" cy="151" r="14" fill="#fcd9b6" />
      <path d="M226 147 Q240 128 254 147 Z" fill="#0ea5e9" />
      <circle cx="235" cy="151" r="1.8" fill="#1e293b" />
      <circle cx="245" cy="151" r="1.8" fill="#1e293b" />
      <path d="M230.5 155 Q240 169 249.5 155 Q240 159 230.5 155 Z" fill="#9f1239" stroke="#1e293b" strokeWidth="1" strokeLinejoin="round" />
      <path d="M233 156.2 Q240 159 247 156.2" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="231" cy="156" r="2.2" fill="#fb7185" opacity="0.5" />
      <circle cx="249" cy="156" r="2.2" fill="#fb7185" opacity="0.5" />

      {/* Son nom, en gros (Frédéric : « Hugo Deck en gros »). J'avais d'abord écarté la marque
          sur le maillot (il a proposé Adidas) : un logo déposé laisserait
          croire à un partenariat — il a tranché ensuite : voir le logo plus haut. */}
      <rect x="120" y="262" width="240" height="32" rx="8" fill="#0f172a" opacity="0.85" />
      <text x="240" y="287" textAnchor="middle" fontSize="26" fontWeight="900" fill="#facc15" fontFamily="system-ui, sans-serif" letterSpacing="3">
        HUGO DECK
      </text>

      {/* Les confettis */}
      {CONFETTIS.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width="5" height="9" rx="1" fill={c.c} transform={`rotate(${c.r} ${c.x + 2.5} ${c.y + 4.5})`} opacity="0.9" />
      ))}
    </svg>
  );
}
