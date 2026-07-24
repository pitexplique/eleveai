// PANNEAU DE RÉGLAGES ANIMÉ — l'avant-goût des « machines dans ta main » : des
// curseurs qu'on règle (gauche), des barres qui répondent (droite). SVG + SMIL,
// zéro JS, muet, décoratif (aria-hidden — le sens est porté par le texte à côté).
// Sert d'encart sur l'accueil et de vignette sur le hub /simulateurs.

const INK = "#1d1c16";
const CYAN = "#155e75";
const KEYTIMES = "0;0.28;0.55;0.8;1";
const SPLINES = "0.45 0 0.25 1;0.45 0 0.25 1;0.45 0 0.25 1;0.45 0 0.25 1";
const DURS = ["4s", "5.2s", "4.6s"];

// Positions successives des 3 curseurs (cx) et hauteurs des 3 barres.
const CURSEURS = ["30;150;70;140;30", "140;40;150;80;140", "70;160;28;110;70"];
const HAUTEURS = ["24;74;44;64;24", "60;28;70;36;60", "40;64;22;72;40"];
// y = baseline(108) − hauteur, pour que la barre pousse vers le haut.
const YS = ["84;34;64;44;84", "48;80;38;72;48", "68;44;86;36;68"];

export default function MachinesPanel({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 120"
      className={className}
      role="img"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      {/* Les 3 curseurs à régler. */}
      {[28, 60, 92].map((y, i) => (
        <g key={y}>
          <line x1="16" y1={y} x2="168" y2={y} stroke={INK} strokeOpacity="0.22" strokeWidth="3" strokeLinecap="round" />
          <circle r="8" cy={y} fill={CYAN}>
            <animate attributeName="cx" values={CURSEURS[i]} keyTimes={KEYTIMES} dur={DURS[i]} calcMode="spline" keySplines={SPLINES} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* La sortie : 3 barres qui répondent aux réglages. */}
      {[192, 216, 240].map((x, i) => (
        <rect key={x} x={x} width="15" rx="2.5" fill={CYAN} fillOpacity="0.85">
          <animate attributeName="height" values={HAUTEURS[i]} keyTimes={KEYTIMES} dur={DURS[i]} calcMode="spline" keySplines={SPLINES} repeatCount="indefinite" />
          <animate attributeName="y" values={YS[i]} keyTimes={KEYTIMES} dur={DURS[i]} calcMode="spline" keySplines={SPLINES} repeatCount="indefinite" />
        </rect>
      ))}
      <line x1="186" y1="108" x2="255" y2="108" stroke={INK} strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
