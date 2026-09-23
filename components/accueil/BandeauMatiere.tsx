// LE BANDEAU ILLUSTRÉ DE L'ACCUEIL (23/09/2026).
//
// La référence est la capture d'IXL : un paysage dessiné, plein écran, avec le
// nom de la matière au milieu et une phrase sous lui. Chez eux c'est une côte,
// un phare et un voilier ; ici c'est La Réunion vue du lagon — le piton, les
// remparts, la barrière de corail — parce que c'est le paysage de l'auteur du
// site et qu'un dessin générique n'aurait rien dit de plus.
//
// ⛔ UN SEUL SVG EN LIGNE, PAS UNE IMAGE. Une illustration pleine largeur en
// PNG, c'est 150 à 400 Ko sur le premier écran ; celle-ci pèse quelques
// kilo-octets, se redimensionne sans flou, et change de couleur par matière
// sans qu'on ait six fichiers à refaire.
//
// ⚠️ `preserveAspectRatio="xMidYMid slice"` : le dessin est CADRÉ, pas
// déformé. Sur téléphone on perd les bords gauche et droit — donc rien
// d'important ne s'y trouve, et le piton reste au centre.

import type { MatiereId } from "./matieres";

type Palette = {
  ciel: [string, string];
  eau: [string, string];
  colline: string;
  collineSombre: string;
  relief: string;
  accent: string;
  titre: string;
  phrase: string;
};

/** Une palette par matière. Le dessin, lui, ne change pas : ce sont les mêmes
 *  montagnes vues à des heures différentes. Les objets qui flottent, eux,
 *  changent (voir `Motifs`). */
const PALETTES: Record<MatiereId, Palette> = {
  maths: {
    ciel: ["#dff1f7", "#f4fbfd"],
    eau: ["#7fd3d8", "#cbeef0"],
    colline: "#8fce9a",
    collineSombre: "#5fae74",
    relief: "#4f8f7a",
    accent: "#0f766e",
    titre: "#0b5f57",
    phrase: "#245c55",
  },
  francais: {
    ciel: ["#e7edfb", "#f7f9fe"],
    eau: ["#9bb9e8", "#d8e4f7"],
    colline: "#9fc8a7",
    collineSombre: "#6fae82",
    relief: "#5b7f8e",
    accent: "#1d4ed8",
    titre: "#1e3a8a",
    phrase: "#33477e",
  },
  economie: {
    ciel: ["#fdf0df", "#fdf9f1"],
    eau: ["#8fd0c6", "#d3eeea"],
    colline: "#c3c978",
    collineSombre: "#9aab5c",
    relief: "#8a7b53",
    accent: "#b45309",
    titre: "#92400e",
    phrase: "#7a4a1a",
  },
  anglais: {
    ciel: ["#e2eefb", "#f6fafe"],
    eau: ["#86b9df", "#cfe4f4"],
    colline: "#93c7a8",
    collineSombre: "#63a580",
    relief: "#4d7f93",
    accent: "#0369a1",
    titre: "#075985",
    phrase: "#1f5573",
  },
  espagnol: {
    ciel: ["#fdeee2", "#fdf8f3"],
    eau: ["#efb98c", "#f7dcc6"],
    colline: "#d6b271",
    collineSombre: "#b4914f",
    relief: "#9a6b4a",
    accent: "#b91c1c",
    titre: "#991b1b",
    phrase: "#7f3030",
  },
  ia: {
    ciel: ["#e6e9fb", "#f7f8fe"],
    eau: ["#8fb5e6", "#d4e2f6"],
    colline: "#8fbfc9",
    collineSombre: "#5f9aa8",
    relief: "#5a5f8f",
    accent: "#6d28d9",
    titre: "#5b21b6",
    phrase: "#4c3d86",
  },
};

/** Ce qui flotte au-dessus du paysage, et qui dit la matière d'un coup d'œil.
 *  IXL pose un cube, une sphère et une équerre pour « Math ». */
function Motifs({ matiere, c }: { matiere: MatiereId; c: string }) {
  if (matiere === "francais") {
    return (
      <g opacity="0.9">
        {/* Un livre ouvert, à gauche */}
        <g transform="translate(96 150)">
          <path d="M0 40 C 26 24 54 24 78 38 L 78 84 C 54 70 26 70 0 86 Z" fill="#ffffff" stroke={c} strokeWidth="3" />
          <path d="M156 40 C 130 24 102 24 78 38 L 78 84 C 102 70 130 70 156 86 Z" fill="#ffffff" stroke={c} strokeWidth="3" />
          <path d="M78 38 L 78 84" stroke={c} strokeWidth="3" />
          <path d="M16 48 H 60 M16 60 H 60 M96 48 H 140 M96 60 H 140" stroke={c} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
        </g>
        {/* Une plume, à droite */}
        <g transform="translate(1210 140)">
          <path d="M96 0 C 40 12 4 56 0 112 C 46 104 90 66 96 0 Z" fill="#ffffff" stroke={c} strokeWidth="3" />
          <path d="M84 16 L 12 100" stroke={c} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        </g>
      </g>
    );
  }
  if (matiere === "ia") {
    return (
      <g opacity="0.9">
        <g transform="translate(110 156)">
          {/* Un petit réseau : trois couches, des arêtes */}
          <path d="M20 20 L 80 8 M20 20 L 80 56 M20 64 L 80 8 M20 64 L 80 56 M80 8 L 140 32 M80 56 L 140 32" stroke={c} strokeWidth="2.5" opacity="0.55" />
          {[[20, 20], [20, 64], [80, 8], [80, 56], [140, 32]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="9" fill="#ffffff" stroke={c} strokeWidth="3" />
          ))}
        </g>
        <g transform="translate(1230 150)">
          {/* Une puce */}
          <rect x="16" y="16" width="72" height="72" rx="12" fill="#ffffff" stroke={c} strokeWidth="3" />
          <rect x="36" y="36" width="32" height="32" rx="6" fill="none" stroke={c} strokeWidth="3" />
          <path d="M16 36 H 2 M16 68 H 2 M88 36 H 102 M88 68 H 102 M36 16 V 2 M68 16 V 2 M36 88 V 102 M68 88 V 102" stroke={c} strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>
    );
  }
  if (matiere === "anglais" || matiere === "espagnol") {
    return (
      <g opacity="0.9">
        <g transform="translate(104 156)">
          {/* Deux bulles qui se parlent */}
          <path d="M4 8 H 96 A 12 12 0 0 1 108 20 V 62 A 12 12 0 0 1 96 74 H 44 L 24 92 V 74 H 4 A 12 12 0 0 1 -8 62 V 20 A 12 12 0 0 1 4 8 Z" fill="#ffffff" stroke={c} strokeWidth="3" />
          <path d="M14 30 H 86 M14 48 H 64" stroke={c} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
        </g>
        <g transform="translate(1216 150)">
          {/* Un globe */}
          <circle cx="56" cy="56" r="46" fill="#ffffff" stroke={c} strokeWidth="3" />
          <path d="M10 56 H 102 M56 10 C 30 34 30 78 56 102 C 82 78 82 34 56 10" stroke={c} strokeWidth="2.5" fill="none" opacity="0.6" />
        </g>
      </g>
    );
  }
  if (matiere === "economie") {
    return (
      <g opacity="0.9">
        <g transform="translate(96 152)">
          {/* Trois barres et une flèche */}
          <rect x="8" y="58" width="24" height="42" rx="5" fill="#ffffff" stroke={c} strokeWidth="3" />
          <rect x="44" y="36" width="24" height="64" rx="5" fill="#ffffff" stroke={c} strokeWidth="3" />
          <rect x="80" y="14" width="24" height="86" rx="5" fill="#ffffff" stroke={c} strokeWidth="3" />
        </g>
        <g transform="translate(1224 150)">
          {/* Une pièce */}
          <circle cx="54" cy="56" r="44" fill="#ffffff" stroke={c} strokeWidth="3" />
          <path d="M54 26 V 86 M40 40 H 62 A 10 10 0 0 1 62 60 H 40 M40 60 H 64 A 10 10 0 0 1 64 80 H 40" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      </g>
    );
  }
  // Maths, par défaut : les solides d'IXL, et une équerre.
  return (
    <g opacity="0.92">
      <g transform="translate(88 150)">
        <path d="M44 4 L 84 76 H 4 Z" fill="#ffffff" stroke={c} strokeWidth="3" strokeLinejoin="round" />
        <g transform="translate(88 28)">
          <path d="M0 14 L 26 0 L 52 14 L 52 44 L 26 58 L 0 44 Z" fill="#ffffff" stroke={c} strokeWidth="3" strokeLinejoin="round" />
          <path d="M0 14 L 26 28 L 52 14 M26 28 L 26 58" stroke={c} strokeWidth="2.5" fill="none" />
        </g>
        <circle cx="168" cy="62" r="22" fill="#ffffff" stroke={c} strokeWidth="3" />
      </g>
      <g transform="translate(1208 146)">
        {/* Une équerre */}
        <path d="M10 104 L 10 6 L 108 104 Z" fill="#ffffff" stroke={c} strokeWidth="3" strokeLinejoin="round" />
        <path d="M10 76 H 34 M10 52 H 34 M10 28 H 34" stroke={c} strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
      </g>
    </g>
  );
}

export default function BandeauMatiere({
  matiere,
  titre,
  phrase,
}: {
  matiere: MatiereId;
  titre: string;
  phrase: string;
}) {
  const p = PALETTES[matiere];
  const id = `bandeau-${matiere}`;

  return (
    <div className="relative isolate w-full overflow-hidden">
      <svg
        viewBox="0 0 1440 300"
        preserveAspectRatio="xMidYMid slice"
        className="h-[210px] w-full sm:h-[250px] lg:h-[280px]"
        role="img"
        aria-label={`${titre} — illustration`}
      >
        <defs>
          <linearGradient id={`${id}-ciel`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.ciel[0]} />
            <stop offset="100%" stopColor={p.ciel[1]} />
          </linearGradient>
          <linearGradient id={`${id}-eau`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.eau[0]} />
            <stop offset="100%" stopColor={p.eau[1]} />
          </linearGradient>
        </defs>

        <rect width="1440" height="300" fill={`url(#${id}-ciel)`} />

        {/* Les nuages — trois, jamais alignés */}
        <g fill="#ffffff" opacity="0.85">
          <ellipse cx="270" cy="52" rx="54" ry="18" />
          <ellipse cx="310" cy="44" rx="38" ry="20" />
          <ellipse cx="1040" cy="40" rx="62" ry="17" />
          <ellipse cx="1000" cy="34" rx="34" ry="18" />
          <ellipse cx="700" cy="30" rx="40" ry="13" />
        </g>

        {/* Le relief du fond : le piton au centre, les remparts autour */}
        <path
          d="M0 178 L 150 128 L 250 162 L 390 96 L 520 158 L 660 78 L 760 132 L 900 70 L 1030 150 L 1160 104 L 1290 158 L 1440 120 L 1440 300 L 0 300 Z"
          fill={p.relief}
          opacity="0.35"
        />
        {/* Les collines de devant */}
        <path
          d="M0 214 C 160 174 300 200 430 214 C 560 228 660 206 790 196 C 920 186 1040 208 1160 216 C 1280 224 1370 212 1440 200 L 1440 300 L 0 300 Z"
          fill={p.colline}
        />
        <path
          d="M0 248 C 190 220 330 254 470 250 C 610 246 700 226 850 232 C 1000 238 1120 258 1260 250 C 1340 246 1400 238 1440 232 L 1440 300 L 0 300 Z"
          fill={p.collineSombre}
          opacity="0.75"
        />

        {/* Le lagon, tout en bas : la bande d'eau qui ferme le dessin */}
        <path d="M0 268 C 240 258 420 278 700 272 C 980 266 1180 282 1440 270 L 1440 300 L 0 300 Z" fill={`url(#${id}-eau)`} />
        <g stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.6">
          <path d="M180 284 h 44" />
          <path d="M520 290 h 58" />
          <path d="M980 284 h 48" />
          <path d="M1260 292 h 40" />
        </g>

        {/* Deux oiseaux, parce qu'un ciel vide se voit */}
        <g stroke={p.relief} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5">
          <path d="M1120 70 q 12 -10 24 0 q 12 -10 24 0" />
          <path d="M380 60 q 9 -8 18 0 q 9 -8 18 0" />
        </g>

        <Motifs matiere={matiere} c={p.accent} />
      </svg>

      {/* ⚠️ LE TEXTE EST EN HTML, PAS DANS LE SVG. Dans le SVG il se serait
          redimensionné avec le dessin — donc minuscule sur téléphone, où la
          bande fait 210 px de haut. En HTML il se replie normalement et reste
          sélectionnable. */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h1
          className="text-2xl font-extrabold tracking-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.9)] sm:text-3xl lg:text-4xl"
          style={{ color: p.titre }}
        >
          {titre}
        </h1>
        <p
          className="mt-2 max-w-2xl text-sm leading-snug drop-shadow-[0_1px_0_rgba(255,255,255,0.9)] sm:text-base"
          style={{ color: p.phrase }}
        >
          {phrase}
        </p>
      </div>
    </div>
  );
}
