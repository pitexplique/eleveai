// Le dessin du haut de l'accueil (01/11/2026). Frédéric, devant l'accueil
// d'IXL : « plus joli IXL », « avec un beau dessin ». Dessin MAISON, rien de
// copié : collines, rivière et voilier (la voile en triangle), et posés sur
// les collines des objets de maths — des barres qui montent (le suivi), une
// droite graduée, une courbe. Le ciel (soleil, montgolfière, avion de papier)
// n'apparaît que sur ordinateur, pour ne pas gêner le titre sur téléphone.

/** Le bas : collines, rivière, voilier, barres, droite graduée. */
export function CollinesAccueil({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 260"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
    >
      {/* Collines du fond */}
      <path d="M0 120 C 200 60, 380 70, 560 115 S 900 150, 1080 95 S 1420 50, 1600 105 L1600 260 L0 260 Z" fill="#bbf7d0" />
      {/* La rivière */}
      <path d="M0 175 C 300 150, 520 200, 800 178 S 1300 150, 1600 172 L1600 215 C 1300 195, 1050 225, 800 212 S 300 190, 0 215 Z" fill="#7dd3fc" />
      <path d="M260 192 h60 M700 196 h40 M1180 182 h70 M1450 188 h40" stroke="#e0f2fe" strokeWidth="4" strokeLinecap="round" />
      {/* Colline de gauche */}
      <path d="M0 150 C 150 110, 330 120, 520 190 C 560 205, 600 230, 640 260 L0 260 Z" fill="#4ade80" />
      <path d="M0 200 C 120 170, 260 180, 400 260 L0 260 Z" fill="#22c55e" />
      {/* Colline de droite */}
      <path d="M1600 140 C 1450 105, 1260 125, 1080 200 C 1040 215, 1000 240, 960 260 L1600 260 Z" fill="#4ade80" />
      <path d="M1600 195 C 1480 170, 1340 185, 1220 260 L1600 260 Z" fill="#22c55e" />

      {/* Le suivi : des barres qui montent, sur la colline de gauche */}
      <g transform="translate(150 70)">
        <rect x="0" y="60" width="34" height="40" rx="3" fill="#fb923c" />
        <rect x="44" y="35" width="34" height="65" rx="3" fill="#2dd4bf" />
        <rect x="88" y="5" width="34" height="95" rx="3" fill="#60a5fa" />
        <path d="M17 52 L61 27 L105 -3" stroke="#0f766e" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M95 -6 L107 -4 L103 8" stroke="#0f766e" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Le voilier : une voile en triangle rectangle */}
      <g transform="translate(760 108)">
        <path d="M40 0 L40 68 L84 68 Z" fill="#ffffff" stroke="#0f766e" strokeWidth="3" strokeLinejoin="round" />
        <path d="M34 12 L34 68 L6 68 Z" fill="#fde68a" stroke="#0f766e" strokeWidth="3" strokeLinejoin="round" />
        <rect x="40" y="58" width="10" height="10" fill="none" stroke="#0f766e" strokeWidth="2" />
        <path d="M0 74 L100 74 L86 92 L14 92 Z" fill="#f97316" />
      </g>

      {/* Une courbe, sur la colline de droite */}
      <g transform="translate(1130 60)">
        <rect x="0" y="0" width="120" height="90" rx="10" fill="#ffffff" stroke="#93c5fd" strokeWidth="3" />
        <path d="M10 45 H110 M60 8 V82" stroke="#bfdbfe" strokeWidth="2" />
        <path d="M14 70 C 40 70, 45 20, 60 20 S 85 70, 106 70" stroke="#2563eb" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>

      {/* La droite graduée, au pied de la colline de droite */}
      <g transform="translate(1300 228)">
        <path d="M0 0 H240" stroke="#14532d" strokeWidth="3" strokeLinecap="round" />
        {Array.from({ length: 11 }, (_, i) => (
          <path key={i} d={`M${i * 24} -8 V8`} stroke="#14532d" strokeWidth="3" strokeLinecap="round" />
        ))}
        <circle cx="0" cy="0" r="7" fill="none" stroke="#14532d" strokeWidth="3" />
        <circle cx="240" cy="0" r="7" fill="none" stroke="#14532d" strokeWidth="3" />
      </g>
    </svg>
  );
}

/** Le ciel de gauche : un soleil. */
export function SoleilAccueil({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g stroke="#f59e0b" strokeWidth="5" strokeLinecap="round">
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i * Math.PI) / 5;
          const x1 = 60 + Math.cos(a) * 36, y1 = 60 + Math.sin(a) * 36;
          const x2 = 60 + Math.cos(a) * 52, y2 = 60 + Math.sin(a) * 52;
          return <path key={i} d={`M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`} />;
        })}
      </g>
      <circle cx="60" cy="60" r="26" fill="#fcd34d" />
      <circle cx="51" cy="56" r="3" fill="#92400e" />
      <circle cx="69" cy="56" r="3" fill="#92400e" />
      <path d="M50 66 Q60 75 70 66" stroke="#92400e" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Le ciel de droite : une montgolfière et un avion de papier. */
export function MontgolfiereAccueil({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 200" className={className} aria-hidden="true">
      {/* Avion de papier et sa traînée */}
      <path d="M8 150 C 30 140, 40 160, 62 146" stroke="#f9a8d4" strokeWidth="3" strokeDasharray="6 7" fill="none" strokeLinecap="round" />
      <path d="M66 140 L104 120 L84 156 L80 143 Z" fill="#fb7185" />
      <path d="M80 143 L104 120" stroke="#be123c" strokeWidth="2" />
      {/* Montgolfière */}
      <g transform="translate(120 10)">
        <path d="M45 0 C 15 0, 0 25, 0 48 C 0 75, 30 92, 36 108 L54 108 C 60 92, 90 75, 90 48 C 90 25, 75 0, 45 0 Z" fill="#facc15" />
        <path d="M45 0 C 32 10, 26 30, 27 50 C 28 75, 36 95, 40 108 L50 108 C 54 95, 62 75, 63 50 C 64 30, 58 10, 45 0 Z" fill="#2dd4bf" />
        <path d="M2 50 H88" stroke="#0f766e" strokeWidth="2" opacity="0.4" />
        <path d="M37 108 L39 124 M53 108 L51 124" stroke="#78350f" strokeWidth="2" />
        <rect x="35" y="124" width="20" height="16" rx="3" fill="#b45309" />
      </g>
    </svg>
  );
}
