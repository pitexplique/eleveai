// LE BANDEAU ILLUSTRÉ DE L'ACCUEIL (23/09/2026).
//
// La référence est la capture d'IXL : un paysage dessiné, plein écran, avec le
// nom de la matière au milieu et une phrase sous lui. Chez eux c'est une côte,
// un phare et un voilier ; ici c'est La Réunion — depuis le 08/10/2026, le
// profil de la Diagonale des Fous 2026, de la mer à la mer (voir `PROFIL`) —
// parce que c'est le pays de l'auteur du site et qu'un dessin générique
// n'aurait rien dit de plus.
//
// ⛔ UN SEUL SVG EN LIGNE, PAS UNE IMAGE. Une illustration pleine largeur en
// PNG, c'est 150 à 400 Ko sur le premier écran ; celle-ci pèse quelques
// kilo-octets, se redimensionne sans flou, et change de couleur par matière
// sans qu'on ait six fichiers à refaire.
//
// ⚠️ `preserveAspectRatio="xMidYMid slice"` : le dessin est CADRÉ, pas
// déformé. Sur téléphone on perd les bords gauche et droit — donc rien
// d'important ne s'y trouve, et le piton reste au centre.

import Link from "next/link";
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
 *  montagnes vues à des heures différentes.
 *  ⚠️ 08/10/2026 — les objets flottants par matière (solides et équerre, livre
 *  et plume…) sont PARTIS avec le profil du Grand Raid : posés sur la crête,
 *  ils masquaient Nez-de-Bœuf et La Possession. La matière se dit par la
 *  couleur, le titre et l'icône de la ligne du haut. */
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

/* ═══ LE RELIEF EST LE PROFIL DE LA DIAGONALE DES FOUS 2026 ══════════════════
   Frédéric, 08/10/2026 : « refais le SVG pour qu'il corresponde au parcours du
   Grand Raid de La Réunion, édition 2026 » (15-18 octobre 2026, 180 km,
   ~10 200 m D+). L'édition 2026 NE PASSE PLUS PAR CILAOS : Saint-Pierre →
   Nez-de-Bœuf → Kerveguen → Bélouve → Hell-Bourg → Mafate par la Plaine des
   Merles → Maïdo → La Possession → chemin des Anglais → La Redoute.
   Source de l'ordre des lieux : Réunion La 1ère, « Grand Raid 2026 : découvrez
   les tracés des cinq courses ».
   ⚠️ LES KILOMÈTRES ET LES ALTITUDES SONT APPROCHÉS (relevés de carte, pas le
   roadbook officiel) : c'est un DESSIN, il ne porte donc ni km ni altitude
   écrits. Seul l'ordre des lieux est sourcé. Le jour où le roadbook est en
   main, on remplace les nombres ici et le dessin suit. */
const PROFIL: { km: number; alt: number; nom?: string }[] = [
  { km: 0, alt: 0, nom: "Saint-Pierre" },
  { km: 14, alt: 800 }, // Domaine Vidot
  { km: 22, alt: 1700 }, // Notre-Dame-de-la-Paix
  { km: 30, alt: 2070, nom: "Nez-de-Bœuf" },
  { km: 42, alt: 1600 }, // Plaine-des-Cafres
  { km: 48, alt: 1550 }, // Mare à Boue
  { km: 58, alt: 2200, nom: "Kerveguen" },
  { km: 64, alt: 2450 }, // Cap Anglais, Caverne Dufour
  { km: 76, alt: 1500 }, // Gîte de Bélouve
  { km: 86, alt: 930, nom: "Hell-Bourg" },
  { km: 96, alt: 1100 }, // Plaine des Merles
  { km: 103, alt: 1900 }, // le passage vers Mafate
  { km: 112, alt: 900, nom: "Mafate" }, // Îlet à Bourse
  { km: 120, alt: 550 }, // Grand Place
  { km: 128, alt: 1100 }, // Roche Plate
  { km: 138, alt: 2200, nom: "Maïdo" },
  { km: 150, alt: 1000 }, // sentier Ratinaud-Kalla
  { km: 160, alt: 20, nom: "La Possession" },
  { km: 166, alt: 10 }, // La Grande Chaloupe
  { km: 174, alt: 600 }, // chemin des Anglais, Colorado
  { km: 180, alt: 50, nom: "La Redoute" },
];

/** km 0 → 180 sur la largeur du dessin, avec une marge pour la mer. */
// ⚠️ 90 → 1350, pas 0 → 1440 : le cadrage `slice` rogne ~35 unités de chaque
// côté à 1 280 px, et « La Redoute » y perdait ses dernières lettres.
const kmX = (km: number) => Math.round(90 + (km / 180) * 1260);
/** 0 m en bas (y = 268), 2 500 m à y ≈ 163. ⚠️ Pas plus haut : à 1 280 px la
 *  crête de Kerveguen traversait la phrase du bandeau (mesuré). Le relief est
 *  donc écrasé ×2 environ — un dessin, pas une coupe à l'échelle. */
const altY = (alt: number) => Math.round(268 - (alt / 2500) * 105);

function traceProfil() {
  return `M0 270 ${PROFIL.map((pt) => `L ${kmX(pt.km)} ${altY(pt.alt)}`).join(" ")} L 1440 270`;
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
        aria-label={`${titre} — illustration : le profil de la Diagonale des Fous 2026, de Saint-Pierre à Saint-Denis`}
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

        {/* Le relief : le profil de la Diagonale des Fous 2026 (voir `PROFIL`).
            Derrière, une crête plus haute et plus pâle — les remparts — pour
            que le profil ne flotte pas seul dans le ciel. */}
        <path
          d={`M0 270 ${PROFIL.map((pt) => `L ${kmX(pt.km)} ${altY(pt.alt) - 26}`).join(" ")} L 1440 270 L 1440 300 L 0 300 Z`}
          fill={p.relief}
          opacity="0.22"
        />
        <path d={`${traceProfil()} L 1440 300 L 0 300 Z`} fill={p.colline} />
        <path
          d={traceProfil()}
          fill="none"
          stroke={p.collineSombre}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Le sentier des coureurs, en pointillé sur la crête */}
        <path
          d={traceProfil()}
          fill="none"
          stroke={p.accent}
          strokeWidth="2.5"
          strokeDasharray="2 7"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(0 -6)"
        />

        {/* L'océan aux deux bouts : départ de Saint-Pierre, arrivée à Saint-Denis */}
        <path d="M0 272 C 240 266 420 280 700 276 C 980 272 1180 282 1440 272 L 1440 300 L 0 300 Z" fill={`url(#${id}-eau)`} />

        {/* Les lieux nommés : un point sur la crête, le nom en bas */}
        {PROFIL.filter((pt) => pt.nom).map((pt) => (
          <g key={pt.km}>
            <line
              x1={kmX(pt.km)}
              y1={altY(pt.alt) - 4}
              x2={kmX(pt.km)}
              y2={278}
              stroke={p.accent}
              strokeWidth="1.5"
              strokeDasharray="3 4"
              opacity="0.45"
            />
            <circle cx={kmX(pt.km)} cy={altY(pt.alt) - 6} r="6" fill="#ffffff" stroke={p.accent} strokeWidth="3" />
            <text
              x={kmX(pt.km)}
              y={294}
              textAnchor={pt.km === 0 ? "start" : pt.km === 180 ? "end" : "middle"}
              fontSize="15"
              fontWeight="700"
              fill={p.titre}
              stroke="#ffffff"
              strokeWidth="4"
              paintOrder="stroke"
            >
              {pt.nom}
            </text>
          </g>
        ))}

        {/* Deux oiseaux, parce qu'un ciel vide se voit */}
        <g stroke={p.relief} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5">
          <path d="M1120 70 q 12 -10 24 0 q 12 -10 24 0" />
          <path d="M380 60 q 9 -8 18 0 q 9 -8 18 0" />
        </g>


        {/* ⭐ LE HAUT-PARLEUR DU COACH SONORE (08/10/2026, Frédéric : « mets un
            haut-parleur sur le SVG »). Dans toutes les matières : le coach lit
            à voix haute partout. Dans le ciel, AU-DESSUS du motif de gauche :
            posé à côté du titre, il passait sous la phrase dès 1 280 px
            (mesuré). Sur téléphone le cadrage le coupe, mais la pastille 🔊
            sous la phrase le dit à sa place. */}
        <g transform="translate(120 34)" opacity="0.95">
          <path
            d="M0 26 H 22 L 50 4 V 92 L 22 70 H 0 Z"
            fill="#ffffff"
            stroke={p.accent}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <g stroke={p.accent} strokeWidth="4" fill="none" strokeLinecap="round">
            <path d="M64 32 C 74 42 74 54 64 64" />
            <path d="M78 20 C 96 36 96 60 78 76" opacity="0.75" />
            <path d="M92 8 C 118 30 118 66 92 88" opacity="0.5" />
          </g>
        </g>

      </svg>

      {/* ⭐ LE CLAP DE L'ATELIER VIDÉO (09/10/2026, Frédéric : « si on clique
          sur le SVG de la page d'accueil, avec un clic : crée ta vidéo »), dans
          TOUTES les matières (« cela concerne le français, pour la rédaction ») ;
          l'atelier ouvre l'exemple de la matière.
          ⛔ PAS DANS LE GRAND DESSIN : son cadrage (`slice`) rogne les bords et le
          haut selon la largeur d'écran — le clap y sortait coupé (« on ne le voit
          pas entièrement »). Ici il est posé dans le coin, toujours entier.
          Caché sous 1 024 px, où il touchait le titre (mesuré à 640 et 768, titre du français) :
          la pastille 🎬 le dit. */}
      <Link
        href={`/atelier-video?matiere=${matiere}`}
        aria-label="Crée ta vidéo : l'atelier vidéo"
        className="absolute right-[3%] top-3 z-10 hidden w-16 opacity-95 transition-transform hover:scale-110 lg:block xl:w-20"
      >
        <svg viewBox="-4 -16 122 124" aria-hidden="true" className="h-auto w-full overflow-visible">
          <rect x="0" y="34" width="112" height="70" rx="8" fill="#ffffff" stroke={p.accent} strokeWidth="3.5" />
          <g transform="rotate(-14 0 30)">
            <rect x="0" y="12" width="112" height="22" rx="4" fill="#ffffff" stroke={p.accent} strokeWidth="3.5" />
            <g fill={p.accent}>
              <path d="M14 12 L 30 12 L 20 34 L 4 34 Z" />
              <path d="M46 12 L 62 12 L 52 34 L 36 34 Z" />
              <path d="M78 12 L 94 12 L 84 34 L 68 34 Z" />
            </g>
          </g>
          <path d="M44 56 L 44 84 L 70 70 Z" fill={p.accent} />
        </svg>
      </Link>

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
          /* Voile blanc sur téléphone seulement : la phrase y prend trois
             lignes et descend sur la crête du Grand Raid (mesuré à 375 px). */
          className="mt-2 max-w-2xl rounded-xl bg-white/60 px-2 py-0.5 text-sm leading-snug drop-shadow-[0_1px_0_rgba(255,255,255,0.9)] sm:bg-transparent sm:px-0 sm:py-0 sm:text-base"
          style={{ color: p.phrase }}
        >
          {phrase}
        </p>
        {/* ⭐ LE COACH SONORE, DIT DÈS L'ACCUEIL (08/10/2026). Frédéric : dans
            ses 6e, trois ou quatre élèves lisent très difficilement ; « que des
            enfants qui ne savent pas lire peuvent quand même faire le coach »,
            ça doit se voir sur le site. Une pastille, pas une phrase de plus :
            le haut-parleur se comprend sans lire. */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold text-sky-800 shadow-sm ring-1 ring-sky-200 sm:text-sm">
            <span aria-hidden="true" className="text-base sm:text-lg">🔊</span>
            <span className="sm:hidden">Coach sonore</span>
            <span className="hidden sm:inline">Coach sonore&nbsp;: il lit les questions à voix haute</span>
          </p>
          {/* La pastille du clap : un vrai lien, au-dessus du voile qui laisse
              passer les clics (pointer-events-auto). */}
          <Link
            href={`/atelier-video?matiere=${matiere}`}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold text-rose-700 shadow-sm ring-1 ring-rose-200 hover:bg-white sm:text-sm"
          >
            <span aria-hidden="true" className="text-base sm:text-lg">🎬</span>
            Crée ta vidéo
          </Link>
        </div>
      </div>
    </div>
  );
}
