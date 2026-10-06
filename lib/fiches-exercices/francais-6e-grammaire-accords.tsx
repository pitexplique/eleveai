// ─── Fiche d'exercices : les accords et les homophones (6e) — 20 exercices ────
//
// ⭐ LA PREMIÈRE FEUILLE D'EXERCICES DE FRANÇAIS (06/10/2026). Frédéric : « pour
// coach français il faut générer les fiches exercices », « on va commencer par
// la 6e », puis, au fil de l'écriture :
//   « tu dois faire rêver, apprendre, tu peux inclure des dictées »
//   « pas qu'une dictée : des exercices QCM, dictée, varie les mises en situation »
//   « des mots à entourer »
//   « mets-toi à la place de l'enfant et réellement mets de la qualité dans les
//     corrections »
//   « schéma, illustration, rappelle-toi de Jules Verne »
//   « et l'enfant est heureux de réussir et d'avoir des défis »
//
// ⭐ LE FIL : LES VOYAGES DE JULES VERNE. Chaque niveau est un voyage — le
// Nautilus (★), le Tour du monde en 80 jours (★★), puis quatre défis (★★★) : le
// centre de la Terre, la Lune, la bouteille à la mer, le ballon. Les GRAVURES
// (`gravure…`, SVG locaux, traits d'encre sur papier crème) rappellent celles
// des éditions Hetzel ; elles sont dans l'énoncé, imprimées.
//
// ⭐ LES FORMATS VARIENT : QCM (1, 3, 7), mots à entourer (2, 6, 15), vrai ou
// faux (4), dictée de mots (8), texte à accorder (9, 11), télégramme (12),
// réécriture (13, 18), lettre à corriger (14, 19), dictée préparée (15), dictée
// à trous (17), grande dictée avec grille et étoiles (20).
//
// ⭐ LES DICTÉES : un adulte lit le texte, qui est dans la CORRECTION (dépliée
// par l'adulte à l'écran ; sur le PDF, sur les pages des corrigés).
//
// ⭐ LES CORRECTIONS, À HAUTEUR D'ENFANT : la question qu'on se pose (« Qui
// est-ce qui… ? »), le test qui prouve, le piège nommé, puis « ✅ Bravo si… »
// pour que la réussite se VOIE — et, sur les défis, des étoiles à compter.
//
// Alignée sur la fiche de cours `lib/fiches/francais-6e-grammaire-accords.tsx`
// et sur les micros de `grammaire_accords`. ⛔ Aucune phrase de la fiche de
// cours n'est reprise. ⛔ LIMITE DU BO : avec avoir, on n'accorde qu'avec un COD
// placé AVANT (« l' », « les », « que »), comme la fiche de cours.
//
// LES FAITS DES ROMANS (vérifiés) : Vingt mille lieues sous les mers (1870) —
// Aronnax, Conseil et Ned Land tombent à la mer et sont recueillis sur le
// Nautilus, sous-marin électrique ; l'équipage parle une langue inconnue ; Nemo
// montre une perle énorme à Aronnax. Le Tour du monde en 80 jours (1872) — pari
// de 20 000 livres au Reform Club, départ le soir même avec Passepartout,
// l'éléphant Kiouni en Inde, Aouda sauvée puis épousée, Calcutta, Yokohama ;
// ⚠️ PAS de ballon dans le roman (il vient du film de 1956). Voyage au centre de
// la Terre (1864) — Lidenbrock, Axel, Hans, entrée par un volcan d'Islande, mer
// souterraine, champignons géants, Axel perdu, sortie par le Stromboli. De la
// Terre à la Lune / Autour de la Lune — Barbicane, Nicholl et Michel Ardan dans
// un obus. Les Enfants du capitaine Grant (1868) — bouteille trouvée dans un
// requin, le Britannia, Grant et deux marins. Cinq semaines en ballon (1863) —
// le docteur Fergusson et deux compagnons, le Victoria, le lac Tchad, l'arrivée
// au fleuve Sénégal. Jules Verne : Nantes 1828 – Amiens 1905.
//
// ⭐ PUBLIC DE 11 ANS : phrases courtes, une idée par phrase.
// ⭐ Contrôle : `node scripts/verifier-exercices-francais-6e.mjs grammaire-accords`.
//
// Micro-compétences : 6e_orth_accord_gn (1, 2, 8, 9, 14, 15, 19, 20),
// 6e_orth_sujet_verbe (2, 3, 4, 9, 10, 13, 14, 15, 19, 20),
// 6e_orth_participe_passe (5, 6, 11, 13, 16, 18, 19, 20),
// 6e_orth_homophones (7, 12, 17, 20), 6e_orth_accords_defi (14, 17, 18, 19,
// 20). 5/5.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import type { PhraseCanvasGroupe, PhraseCanvasLien, PhraseCanvasMot } from "@/lib/tutor-v4/types";

// Le canvas « phrase » du coach et des fiches de cours de français : les mots,
// leurs groupes, et les arcs d'accord. ⚠️ Deux arcs au plus par dessin (au-delà
// ils se chevauchent, constaté sur la fiche de cours).
function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  groupes?: PhraseCanvasGroupe[];
  liens?: PhraseCanvasLien[];
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        groupes: opts.groupes,
        liens: opts.liens,
        legende: opts.legende,
        largeurMax: 190,
      }}
    />
  );
}

/** Un dessin qui redit le corrigé : à l'écran seulement, le PDF reste court. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

// ─── Les gravures ─────────────────────────────────────────────────────────────
// Encre brune sur papier crème, comme les gravures des éditions Hetzel. ⛔ Aucun
// texte DANS le SVG : la légende est en HTML (lisible à 375 px), aucun `min-w`.

const ENCRE = "#4a3728";
const ENCRE_PALE = "#a08568";
const PAPIER = "#fbf5e6";
const SEPIA = "#eadcbf";

function gravure(titre: string, legende: string, dessin: ReactNode) {
  return (
    <figure className="mx-auto w-full max-w-sm">
      <svg viewBox="0 0 300 170" className="h-auto w-full rounded-xl border border-stone-300" role="img" aria-label={titre}>
        <rect x="0" y="0" width="300" height="170" fill={PAPIER} />
        <g fill="none" stroke={ENCRE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {dessin}
        </g>
      </svg>
      <figcaption className="mt-1 text-center text-xs italic text-stone-500">{legende}</figcaption>
    </figure>
  );
}

/** Des hachures horizontales : l'eau, le ciel, l'ombre d'une gravure. */
function hachures(y0: number, y1: number, pas = 12) {
  const lignes: ReactNode[] = [];
  for (let y = y0, i = 0; y <= y1; y += pas, i++) {
    lignes.push(<line key={y} x1={10 + (i % 2) * 14} y1={y} x2={290} y2={y} stroke={ENCRE_PALE} strokeWidth="1" strokeDasharray="16 7" />);
  }
  return <g>{lignes}</g>;
}

function poisson(x: number, y: number, k = 1) {
  return (
    <path
      d={`M${x} ${y} q${8 * k} ${-6 * k} ${16 * k} 0 q${-8 * k} ${6 * k} ${-16 * k} 0 m${16 * k} 0 l${6 * k} ${-4 * k} v${8 * k} z`}
      fill={SEPIA}
      strokeWidth="1.5"
    />
  );
}

const vagues = (y: number) => (
  <path d={`M0 ${y} q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0`} strokeWidth="1.8" />
);

const gravureNautilus = gravure(
  "Le Nautilus sous la mer",
  "Le Nautilus du capitaine Nemo — d'après Vingt mille lieues sous les mers (1870).",
  <>
    {hachures(18, 132)}
    {poisson(52, 38)}
    {poisson(230, 30, 0.8)}
    {poisson(205, 142, 0.7)}
    <path d="M40 92 Q60 68 150 68 Q240 68 262 92 Q240 116 150 116 Q60 116 40 92 Z" fill={SEPIA} />
    <path d="M262 92 L290 89 L262 97" fill={SEPIA} />
    <path d="M118 68 L127 55 L173 55 L182 68" fill={SEPIA} />
    <circle cx="176" cy="61" r="3" fill={ENCRE} />
    <path d="M181 58 L196 52 M181 62 L198 62" stroke={ENCRE_PALE} strokeWidth="1.2" />
    {[85, 110, 135, 160, 185, 210, 235].map((x) => (
      <circle key={x} cx={x} cy="90" r="4.5" fill={PAPIER} strokeWidth="1.6" />
    ))}
    {[70, 82, 94, 106, 118, 130, 142, 154, 166, 178, 190, 202, 214, 226].map((x) => (
      <line key={x} x1={x} y1="104" x2={x + 4} y2="112" stroke={ENCRE_PALE} strokeWidth="1" />
    ))}
    <path d="M40 92 L27 79 M40 92 L27 105" />
    <ellipse cx="25" cy="92" rx="3" ry="14" fill={SEPIA} strokeWidth="1.5" />
    <path d="M0 152 Q40 140 80 150 T160 150 T240 149 T300 146 V170 H0 Z" fill={SEPIA} strokeWidth="1.5" />
    <path d="M30 150 q-6 -10 0 -20 q6 -10 0 -20 M270 147 q-6 -9 0 -18 q6 -9 0 -18" strokeWidth="1.5" />
  </>,
);

const gravurePaquebot = gravure(
  "Un paquebot à vapeur et un globe",
  "Phileas Fogg et Passepartout autour du monde — d'après Le Tour du monde en quatre-vingts jours (1872).",
  <>
    <circle cx="245" cy="42" r="24" fill={SEPIA} />
    <ellipse cx="245" cy="42" rx="10" ry="24" />
    <path d="M221 42 H269 M225 30 H265 M225 54 H265" strokeWidth="1.2" />
    <path d="M60 52 q-14 -6 -6 -18 q10 -12 22 -4 M40 44 q-12 -8 -2 -18" stroke={ENCRE_PALE} />
    <rect x="112" y="62" width="16" height="34" fill={SEPIA} />
    <rect x="152" y="62" width="16" height="34" fill={SEPIA} />
    <path d="M112 58 q-20 -14 -40 -6 M152 58 q-20 -16 -46 -12" stroke={ENCRE_PALE} strokeWidth="1.6" />
    <line x1="205" y1="50" x2="205" y2="96" />
    <rect x="80" y="96" width="140" height="14" fill={SEPIA} />
    <path d="M45 110 L255 110 L238 132 L62 132 Z" fill={SEPIA} />
    {[90, 110, 130, 150, 170, 190, 210].map((x) => (
      <circle key={x} cx={x} cy="120" r="3.2" fill={PAPIER} strokeWidth="1.4" />
    ))}
    {vagues(140)}
    {vagues(156)}
  </>,
);

const gravureVolcan = gravure(
  "Un volcan qui rejette un radeau",
  "La sortie par le Stromboli — d'après Voyage au centre de la Terre (1864).",
  <>
    <path d="M150 52 q-10 -14 4 -22 q14 -8 10 -24 M168 50 q12 -10 4 -22" stroke={ENCRE_PALE} strokeWidth="1.8" />
    <circle cx="140" cy="22" r="7" stroke={ENCRE_PALE} />
    <circle cx="176" cy="16" r="9" stroke={ENCRE_PALE} />
    <path d="M55 138 L130 58 L172 58 L248 138 Z" fill={SEPIA} />
    <ellipse cx="151" cy="58" rx="21" ry="5" fill={PAPIER} />
    <path d="M160 62 q6 18 -4 34 q-8 16 4 36" stroke="#b45309" strokeWidth="3" />
    {[90, 105, 120, 185, 200, 215].map((x, i) => (
      <line key={x} x1={x} y1={130 - (i % 3) * 14} x2={x + (x < 150 ? 10 : -10)} y2={118 - (i % 3) * 14} stroke={ENCRE_PALE} strokeWidth="1" />
    ))}
    <path d="M128 40 l-8 -10 l12 2 z M176 36 l10 -8 l-2 12 z" fill={ENCRE} strokeWidth="1" />
    {vagues(146)}
    {vagues(160)}
  </>,
);

const gravureObus = gravure(
  "Un obus en route vers la Lune",
  "L'obus de Barbicane, Nicholl et Michel Ardan — d'après De la Terre à la Lune (1865).",
  <>
    {[
      [30, 30], [70, 18], [110, 40], [160, 22], [60, 70], [270, 120], [215, 140], [280, 20],
    ].map(([x, y]) => (
      <path key={`${x}-${y}`} d={`M${x - 4} ${y} H${x + 4} M${x} ${y - 4} V${y + 4}`} strokeWidth="1.3" />
    ))}
    <circle cx="232" cy="52" r="34" fill={SEPIA} />
    <circle cx="220" cy="42" r="7" strokeWidth="1.4" />
    <circle cx="244" cy="62" r="9" strokeWidth="1.4" />
    <circle cx="240" cy="34" r="4" strokeWidth="1.2" />
    <path d="M0 150 Q70 110 140 170" fill={SEPIA} />
    <g transform="translate(130 108) rotate(-32)">
      <rect x="-34" y="-11" width="48" height="22" rx="3" fill={SEPIA} />
      <path d="M14 -11 Q40 0 14 11" fill={SEPIA} />
      <circle cx="-8" cy="0" r="4" fill={PAPIER} strokeWidth="1.4" />
      <path d="M-40 -6 H-62 M-40 0 H-72 M-40 6 H-58" stroke={ENCRE_PALE} strokeDasharray="5 4" />
    </g>
  </>,
);

const gravureBouteille = gravure(
  "Une bouteille à la mer et un aileron de requin",
  "Le message du capitaine Grant — d'après Les Enfants du capitaine Grant (1868).",
  <>
    {hachures(20, 60, 14)}
    <g transform="translate(150 95) rotate(-18)">
      <rect x="-60" y="-20" width="90" height="40" rx="14" fill={SEPIA} />
      <path d="M30 -9 H54 V9 H30" fill={SEPIA} />
      <rect x="54" y="-6" width="10" height="12" rx="2" fill={ENCRE_PALE} />
      <rect x="-44" y="-10" width="56" height="20" rx="3" fill={PAPIER} strokeWidth="1.4" />
      <path d="M-38 -3 H6 M-38 3 H0" stroke={ENCRE_PALE} strokeWidth="1.2" />
    </g>
    <path d="M232 132 L250 100 L262 132" fill={SEPIA} />
    {vagues(132)}
    {vagues(148)}
    {vagues(162)}
  </>,
);

const gravureBallon = gravure(
  "Un ballon au-dessus de la savane",
  "Le Victoria du docteur Fergusson au-dessus de l'Afrique — d'après Cinq semaines en ballon (1863).",
  <>
    <path d="M40 30 l6 5 l6 -5 M64 44 l5 4 l5 -4 M240 26 l6 5 l6 -5" strokeWidth="1.4" />
    <circle cx="150" cy="58" r="44" fill={SEPIA} />
    <ellipse cx="150" cy="58" rx="16" ry="44" strokeWidth="1.4" />
    <ellipse cx="150" cy="58" rx="32" ry="44" strokeWidth="1.4" />
    <path d="M106 58 H194" strokeWidth="1.4" />
    <path d="M118 88 L138 122 M182 88 L162 122 M150 102 V122" strokeWidth="1.4" />
    <rect x="135" y="122" width="30" height="16" rx="2" fill={SEPIA} />
    <path d="M0 158 H300" />
    <path d="M232 158 V136" strokeWidth="2.4" />
    <ellipse cx="232" cy="134" rx="28" ry="6" fill={SEPIA} />
    <path d="M40 158 V146 M48 158 V140 M56 158 V148" stroke={ENCRE_PALE} strokeWidth="1.4" />
  </>,
);

// ─── L'ouverture : une planche de BD en trois cases ───────────────────────────
// Frédéric, 06/10/2026 : « au début on pourrait mettre un SVG avec des mots et
// des auteurs », « et Ti Margo ou un PNG », « comme une BD », puis « enlève Ti
// Margo des trois cartes, mets-le en haut à droite » (→ `mascotte`). Case 1 :
// le livre d'où s'envolent les mots de la leçon et les auteurs de 6e. Case 2 :
// la carte du voyage, six étapes. Case 3 : la mission, en étoiles. Une colonne
// sur téléphone, trois côte à côte ailleurs ; elle s'imprime.

function caseBd(recitatif: string, contenu: ReactNode) {
  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-lg border-[3px] border-stone-800 bg-white">
      <p className="border-b-[3px] border-stone-800 bg-amber-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-stone-800">
        {recitatif}
      </p>
      <div className="flex flex-1 items-center justify-center p-3">{contenu}</div>
    </div>
  );
}

const mascotteMargo = (
  <div className="flex items-start gap-1">
    {/* Sur téléphone, la bulle prendrait la place du bouton de retour : Ti Margo seul. */}
    <p className="mt-2 hidden max-w-[11rem] rounded-2xl border-[3px] border-stone-800 bg-white px-2.5 py-1.5 text-sm font-bold leading-snug text-stone-900 lg:block">
      Prêt ? On embarque avec Jules Verne !
    </p>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/cahier-vacances/ti-margo.png" alt="Ti Margo" width={112} height={140} className="h-16 w-auto shrink-0 object-contain lg:h-28" />
  </div>
);

// La carte du voyage : six étapes sur un chemin en pointillés.
// [x, y, nom, place de l'étiquette] : au-dessus (−) ou au-dessous (+) du rond.
// « Tour du monde » est trop long pour tenir entre ses voisins : il passe dessous.
const ETAPES: [number, number, string, number][] = [
  [36, 50, "Nautilus", -20],
  [120, 50, "Tour du monde", 30],
  [204, 50, "Volcan", -20],
  [204, 128, "Lune", 30],
  [120, 128, "Bouteille", -18],
  [36, 128, "Ballon", 30],
];

const carteDuVoyage = (
  <svg viewBox="0 0 240 170" className="h-auto w-full max-w-[260px]" role="img" aria-label="La carte du voyage en six étapes">
    <rect x="0" y="0" width="240" height="170" fill={PAPIER} />
    <path
      d={`M${ETAPES.map(([x, y]) => `${x} ${y}`).join(" L")}`}
      fill="none"
      stroke={ENCRE_PALE}
      strokeWidth="2"
      strokeDasharray="5 5"
    />
    {ETAPES.map(([x, y, nom, dy], i) => (
      <g key={nom}>
        <circle cx={x} cy={y} r="11" fill={i < 2 ? SEPIA : "#fde68a"} stroke={ENCRE} strokeWidth="2" />
        <text x={x} y={y + 4.5} textAnchor="middle" fill={ENCRE} fontFamily="Georgia, serif" fontSize="13" fontWeight="700">
          {i + 1}
        </text>
        <text
          x={Math.min(Math.max(x, 44), 196)}
          y={y + dy}
          textAnchor="middle"
          fill={ENCRE}
          fontFamily="Georgia, serif"
          fontSize="15"
          fontStyle="italic"
        >
          {nom}
        </text>
      </g>
    ))}
  </svg>
);

const missionEnEtoiles = (
  <ul className="w-full space-y-2 text-sm font-bold leading-snug text-stone-800">
    <li>
      <span className="text-amber-500">★</span> 8 gestes
      <br />
      <span className="font-normal">— à bord du Nautilus</span>
    </li>
    <li>
      <span className="text-amber-500">★★</span> 8 devoirs
      <br />
      <span className="font-normal">— autour du monde</span>
    </li>
    <li>
      <span className="text-amber-500">★★★</span> 4 défis
      <br />
      <span className="font-normal">— gagne tes étoiles !</span>
    </li>
  </ul>
);

// Les mots s'envolent du livre : ceux de la leçon en encre, les auteurs en sépia.
const MOTS_DU_LIVRE: [string, number, number, number, string][] = [
  ["accord", 14, 30, -8, ENCRE],
  ["sujet", 104, 22, 4, ENCRE],
  ["participe", 136, 38, 6, ENCRE],
  ["et / est", 8, 84, 5, "#b45309"],
  ["a / à", 178, 82, -6, "#b45309"],
  ["Jules Verne", 36, 64, -3, ENCRE_PALE],
  ["La Fontaine", 86, 100, 0, ENCRE_PALE],
];

const livreQuiSenvole = (
  <svg viewBox="0 0 240 170" className="h-auto w-full max-w-[260px]" role="img" aria-label="Un livre ouvert d'où s'envolent des mots et des noms d'auteurs">
    <rect x="0" y="0" width="240" height="170" fill={PAPIER} />
    {MOTS_DU_LIVRE.map(([mot, x, y, angle, couleur]) => (
      <text
        key={mot}
        x={x}
        y={y}
        transform={`rotate(${angle} ${x} ${y})`}
        fill={couleur}
        fontFamily="Georgia, serif"
        fontSize={couleur === ENCRE_PALE ? 17 : 19}
        fontStyle={couleur === ENCRE_PALE ? "italic" : "normal"}
        fontWeight={couleur === ENCRE_PALE ? 400 : 700}
      >
        {mot}
      </text>
    ))}
    <g fill="none" stroke={ENCRE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M120 114 V158" />
      <path d="M120 116 Q90 104 48 112 V156 Q90 148 120 158 Q150 148 192 156 V112 Q150 104 120 116 Z" fill={SEPIA} />
      <path d="M58 122 Q88 116 112 124 M58 132 Q88 126 112 134 M58 142 Q88 136 112 144 M128 124 Q152 116 182 122 M128 134 Q152 126 182 132 M128 144 Q152 136 182 142" stroke={ENCRE_PALE} strokeWidth="1.2" />
    </g>
  </svg>
);

const ouvertureBd = (
  <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 print:grid-cols-3">
    {caseBd("1 — Le livre magique", livreQuiSenvole)}
    {caseBd("2 — La carte du voyage", carteDuVoyage)}
    {caseBd("3 — Ta mission", missionEnEtoiles)}
  </div>
);

export const exercicesAccords6e: FicheExercicesData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "grammaire-accords",
  titre: "Les accords et les homophones",
  accroche:
    "Embarque avec Jules Verne !\n— 20 exercices pour écrire juste la fin des mots\n— QCM, mots à entourer, lettres à corriger\n— 3 dictées, lues par un adulte\n— 4 défis à étoiles\n— une correction pas à pas après chaque exercice",

  ouverture: ouvertureBd,
  mascotte: mascotteMargo,

  fichesCours: [{ href: "/fiches-cours/francais/6e/grammaire-accords", titre: "Les accords et les homophones" }],
  coachHref: "/coach-ia/francais?classe=6e",

  series: [
    /* ─────────────── ★ Un seul geste — à bord du Nautilus ─────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "À bord du Nautilus. Une règle par exercice : je cherche d'abord le mot qui commande.",
      rappel: [
        "Dans le groupe nominal, le nom commande : le déterminant et l'adjectif prennent son genre et son nombre.",
        "Le verbe s'accorde avec le noyau du sujet. Je demande « Qui est-ce qui… ? » devant le verbe.",
        "Avec être, le participe passé s'accorde avec le sujet. Avec avoir, seulement si le COD est placé avant.",
        "Un homophone se teste : « est » devient « était », « a » devient « avait », « sont » devient « étaient ».",
      ],
      exercices: [
        {
          enonce:
            "Tu es à bord du Nautilus, le sous-marin du capitaine Nemo. Par le hublot, tu vois… Choisis la bonne réponse.\na) des poissons (argenté / argentés / argentées)\nb) une méduse (transparent / transparents / transparente)\nc) des algues (géant / géants / géantes)\nd) un hublot (rond / ronds / ronde)",
          figure: gravureNautilus,
          correction:
            "Pour chaque groupe, je trouve le nom. Puis je me demande : masculin ou féminin ? un seul ou plusieurs ?\na) « poissons » : masculin, pluriel. Je choisis « argentés ».\nb) « méduse » : féminin, singulier. Je choisis « transparente ».\nc) « algues » : féminin, pluriel. Je choisis « géantes ».\nd) « hublot » : masculin, singulier. Je choisis « rond », sans rien ajouter.\n⛔ Le piège : au a), « argentés » et « argentées » se prononcent pareil. L'oreille ne peut pas choisir : c'est le nom « poissons » qui décide.\n✅ Bravo si tu as 4 sur 4 : tu sais tenir une chaîne d'accords.\nRéponse : a) argentés ; b) transparente ; c) géantes ; d) rond.",
          schema: phrase({
            mots: [
              { texte: "des", nature: "dét." },
              { texte: "poissons", nature: "nom", focus: true },
              { texte: "argentés", nature: "adj." },
            ],
            liens: [
              { de: 1, vers: 0, label: "masc. plur.", type: "accord" },
              { de: 1, vers: 2, label: "masc. plur.", type: "accord" },
            ],
            legende: "Le nom « poissons » donne ses marques à tout le groupe.",
          }),
          micros: ["6e_orth_accord_gn"],
        },
        {
          enonce:
            "Lis ce passage. Entoure les six mots qui portent une marque du pluriel.\n« Le capitaine Nemo ouvre les grands hublots. Dehors, des requins nagent près du sous-marin. »",
          correction:
            "Je cherche les marques du pluriel : les déterminants « les » et « des », les -s et -x des noms et des adjectifs, le -nt des verbes.\n1. « les » : déterminant pluriel.\n2. « grands » : adjectif, il prend le -s de « hublots ».\n3. « hublots » : nom au pluriel.\n4. « des » : déterminant pluriel.\n5. « requins » : nom au pluriel.\n6. « nagent » : verbe, il prend le -nt de son sujet « des requins ».\n⛔ Le piège : entourer « Nemo » ou « sous-marin ». Il n'y a qu'un capitaine et qu'un sous-marin. « du » veut dire « de le » : singulier.\n✅ Bravo si tu as entouré « nagent » : beaucoup oublient que le verbe porte aussi le pluriel.\nRéponse : les, grands, hublots, des, requins, nagent.",
          schema: phrase({
            mots: [
              { texte: "des", focus: true },
              { texte: "requins", focus: true },
              { texte: "nagent", focus: true },
              { texte: "près" },
              { texte: "du" },
              { texte: "sous-marin" },
            ],
            liens: [{ de: 1, vers: 2, label: "pluriel", type: "accord" }],
            legende: "Trois marques du pluriel dans la 2e phrase : des, requins, nagent.",
          }),
          micros: ["6e_orth_accord_gn", "6e_orth_sujet_verbe"],
        },
        {
          enonce:
            "Choisis la bonne forme du verbe. Cherche d'abord le noyau du sujet.\na) Les hublots du Nautilus (brille / brillent).\nb) Le chef des marins (parle / parlent) une langue inconnue.\nc) La lumière des lampes (éclaire / éclairent) le fond.\nd) Ned Land et Conseil (rêve / rêvent) de s'enfuir.",
          correction:
            "Je pose la question « Qui est-ce qui… ? » devant le verbe. Puis je garde le noyau du sujet.\na) Qui est-ce qui brille ? Les hublots. Pluriel : ils brillent.\nb) Qui est-ce qui parle ? Le chef. Je barre « des marins ». Singulier : il parle.\nc) Qui est-ce qui éclaire ? La lumière. Je barre « des lampes ». Singulier : elle éclaire.\nd) Qui est-ce qui rêve ? Ned Land et Conseil : deux personnes, c'est « ils ». Ils rêvent.\n⛔ Le piège : au b) et au c), le mot juste avant le verbe est au pluriel. Mais ce n'est pas lui qui commande.\n✅ Bravo si tu as barré avant de choisir : c'est le geste des champions.\nRéponse : a) brillent ; b) parle ; c) éclaire ; d) rêvent.",
          schema: phrase({
            mots: [
              { texte: "La" },
              { texte: "lumière", focus: true },
              { texte: "des", barre: true },
              { texte: "lampes", barre: true },
              { texte: "éclaire" },
            ],
            groupes: [{ mots: [0, 3], label: "sujet" }],
            liens: [{ de: 1, vers: 4, label: "singulier", type: "accord" }],
            legende: "Je barre « des lampes » : c'est « lumière » qui commande.",
          }),
          micros: ["6e_orth_sujet_verbe"],
        },
        {
          enonce:
            "Vrai ou faux ? Explique ta réponse.\na) Dans « Les bras du poulpe géant s'enroulent », le verbe s'accorde avec « poulpe ».\nb) Dans « Au fond de la mer dorment des épaves », le sujet est « des épaves ».\nc) Dans « Conseil et moi nageons », le verbe est juste.\nd) Dans « Le bruit des vagues nous berce », il faut écrire « bercent ».",
          correction:
            "a) Faux. Qui est-ce qui s'enroule ? Les bras. Je barre « du poulpe géant ». Les bras s'enroulent.\nb) Vrai. Qui est-ce qui dort ? Des épaves. Le sujet est placé APRÈS le verbe : elles dorment.\nc) Vrai. « Conseil et moi », c'est « nous ». Nous nageons.\nd) Faux. Qui est-ce qui berce ? Le bruit, singulier. « nous » n'est pas le sujet : c'est nous qu'on berce.\n⛔ Le piège : au d), « nous » est juste avant le verbe. Mais le sujet, c'est celui qui FAIT l'action.\n✅ Bravo si tu as trouvé le d) : c'est le plus difficile de la page.\nRéponse : a) faux ; b) vrai ; c) vrai ; d) faux.",
          schema: phrase({
            mots: [
              { texte: "Au" },
              { texte: "fond" },
              { texte: "dorment" },
              { texte: "des" },
              { texte: "épaves", focus: true },
            ],
            groupes: [{ mots: [3, 4], label: "sujet" }],
            liens: [{ de: 4, vers: 2, label: "pluriel", type: "accord" }],
            legende: "Le sujet « des épaves » est placé après le verbe.",
          }),
          micros: ["6e_orth_sujet_verbe"],
        },
        {
          enonce:
            "Accorde le participe passé. L'auxiliaire est être.\na) Le professeur Aronnax et ses amis sont (tombé) à la mer.\nb) La tempête est (passé).\nc) Les étoiles de mer sont (resté) sur le sable.\nd) Ned Land est (monté) sur le pont.",
          correction:
            "Avec être, le participe passé fait comme un adjectif : il s'accorde avec le sujet.\na) Le sujet : Aronnax et ses amis. Masculin, pluriel. Ils sont tombés.\nb) Le sujet : la tempête. Féminin, singulier. Elle est passée.\nc) Le sujet : les étoiles de mer. Je barre « de mer ». Féminin, pluriel. Elles sont restées.\nd) Le sujet : Ned Land. Masculin, singulier. Il est monté : rien à ajouter.\n⭐ Pour entendre le féminin, je remplace par « mis » : elle est mise, ils sont mis.\n⛔ Le piège : écrire « passé » au b), parce qu'on n'entend rien. Je raisonne, je n'écoute pas.\n⭐ Dans le roman, Aronnax et ses deux amis tombent vraiment à la mer. Le Nautilus les recueille.\n✅ Bravo si tu as 4 sur 4 !\nRéponse : a) tombés ; b) passée ; c) restées ; d) monté.",
          schema: phrase({
            mots: [{ texte: "La" }, { texte: "tempête", focus: true }, { texte: "est" }, { texte: "passée" }],
            groupes: [{ mots: [0, 1], label: "sujet" }],
            liens: [{ de: 1, vers: 3, label: "féminin", type: "accord" }],
            legende: "Avec être, l'arc part du sujet.",
          }),
          micros: ["6e_orth_participe_passe"],
        },
        {
          enonce:
            "L'auxiliaire est avoir. Entoure le COD, puis accorde le participe seulement si le COD est placé AVANT.\na) Nemo a (montré) une perle énorme.\nb) Cette perle, Nemo l'a (montré) à Aronnax.\nc) Les marins ont (pêché) des huîtres.\nd) Ces huîtres, les marins les ont (ouvert).",
          correction:
            "Je cherche le COD avec la question « quoi ? ». Puis je regarde où il est.\na) Nemo a montré quoi ? une perle énorme. Le COD est APRÈS : je n'accorde pas. Montré.\nb) Nemo a montré quoi ? « l' ». Ce petit mot reprend « cette perle ». Il est AVANT : j'accorde avec lui. Montrée.\nc) Ils ont pêché quoi ? des huîtres, après le verbe : pêché.\nd) Ils ont ouvert quoi ? « les », qui reprend « ces huîtres ». Il est avant : ouvertes.\n⛔ Le piège : accorder avec le sujet. Avec avoir, le sujet ne commande JAMAIS le participe.\n✅ Bravo si tu as entouré « l' » et « les » : ce sont de tout petits COD, faciles à rater.\nRéponse : a) montré ; b) montrée ; c) pêché ; d) ouvertes.",
          schema: phrase({
            mots: [
              { texte: "Cette" },
              { texte: "perle", focus: true },
              { texte: "," },
              { texte: "Nemo" },
              { texte: "l'" },
              { texte: "a" },
              { texte: "montrée" },
            ],
            groupes: [{ mots: [4, 4], label: "COD" }],
            liens: [{ de: 4, vers: 6, label: "féminin", type: "accord" }],
            legende: "Le COD « l' » est AVANT le verbe : on accorde.",
          }),
          micros: ["6e_orth_participe_passe"],
        },
        {
          enonce:
            "Choisis le bon mot.\na) Le Nautilus (a / à) un moteur électrique.\nb) Il plonge (a / à) mille mètres de profondeur.\nc) Ce soir, la mer (et / est) calme.\nd) Nemo (et / est) ses marins dînent ensemble.",
          correction:
            "Je fais le test du remplacement. « a » devient « avait ». « est » devient « était ».\na) Le Nautilus avait un moteur : ça marche. C'est « a », le verbe avoir.\nb) Il plonge avait mille mètres : ça ne veut rien dire. C'est « à ».\nc) La mer était calme : ça marche. C'est « est », le verbe être.\nd) Nemo était ses marins : ça ne veut rien dire. C'est « et », qui relie, comme « et aussi ».\n⛔ Le piège : choisir à l'oreille. Les deux mots se disent pareil : seul le test tranche.\n⭐ Vrai : dans le roman, le Nautilus marche à l'électricité. En 1870, c'est de la science-fiction !\n✅ Bravo si tu as fait le test à chaque fois, même quand tu étais sûr.\nRéponse : a) a ; b) à ; c) est ; d) et.",
          schema: ecranSeulement(
            phrase({
              mots: [{ texte: "la" }, { texte: "mer" }, { texte: "est", focus: true }, { texte: "calme" }],
              legende: "« est » se remplace par « était » : c'est le verbe être.",
            }),
          ),
          micros: ["6e_orth_homophones"],
        },
        {
          enonce:
            "Dictée de mots. Un adulte lit les six groupes de la correction. Tu les écris.\nÉcoute bien le déterminant : il te dit « un seul » ou « plusieurs ».\nPuis relis chaque groupe et vérifie que tous les mots sont d'accord.",
          correction:
            "Mots à dicter (l'adulte lit chaque groupe deux fois) :\n1. une pieuvre géante\n2. des requins affamés\n3. les coraux rouges\n4. un trésor englouti\n5. des épaves englouties\n6. les profondeurs sombres\nCe qu'il fallait remarquer :\n1. « pieuvre » est féminin : géante prend un -e.\n2. « requins » est masculin pluriel : affamés prend un -s.\n3. Un corail, des coraux : le pluriel en -aux. Rouges prend un -s.\n4. et 5. « englouti » et « englouties » se disent pareil. C'est le nom qui décide : trésor (masculin, singulier), épaves (féminin, pluriel).\n6. « profondeurs » est féminin pluriel. Sombres prend un -s.\n⛔ Le piège : « des corails ». Les noms en -ail font souvent -aux : un corail, des coraux ; un vitrail, des vitraux.\n✅ 6 sur 6 ? Tu as des oreilles de sonar ! 4 ou 5 ? Relis la ligne ratée et refais-la.\nRéponse : les six groupes ci-dessus.",
          schema: ecranSeulement(
            phrase({
              mots: [
                { texte: "des", nature: "dét." },
                { texte: "épaves", nature: "nom", focus: true },
                { texte: "englouties", nature: "adj." },
              ],
              liens: [
                { de: 1, vers: 0, label: "fém. plur.", type: "accord" },
                { de: 1, vers: 2, label: "fém. plur.", type: "accord" },
              ],
              legende: "« épaves » est féminin pluriel : -es.",
            }),
          ),
          micros: ["6e_orth_accord_gn"],
        },
      ],
    },

    /* ─────────── ★★ Type devoir — le Tour du monde en 80 jours ─────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Autour du monde avec Phileas Fogg. Plusieurs accords dans un même texte : je les cherche un par un.",
      rappel: [
        "Je repère le nom noyau, puis tous les mots qui lui obéissent.",
        "Si un complément du nom se glisse entre le sujet et le verbe, je le barre au crayon.",
        "Avec avoir : COD après, pas d'accord. COD avant (l', les, que) : accord avec lui.",
        "Un homme et une femme ensemble : les mots accordés se mettent au masculin pluriel.",
      ],
      exercices: [
        {
          enonce:
            "Londres, 1872. Phileas Fogg fait un pari fou. Accorde les mots entre parenthèses. Les verbes sont au présent.\n« Au club, les membres (rire). Fogg (affirmer) qu'il fera le tour du monde en quatre-vingts jours. Ses amis (anglais) (parier) vingt mille livres contre lui. Le voyageur et son domestique (partir) le soir même. »",
          figure: gravurePaquebot,
          correction:
            "Pour chaque mot, je cherche qui commande.\n« rient » : qui est-ce qui rit ? Les membres, pluriel. Le verbe rire : ils rient.\n« affirme » : qui est-ce qui affirme ? Fogg, un seul. Il affirme.\n« anglais » : il obéit à « amis », masculin pluriel. Mais il finit déjà par -s : il ne change pas.\n« parient » : qui est-ce qui parie ? Ses amis. Ils parient.\n« partent » : qui est-ce qui part ? Le voyageur ET son domestique : deux personnes. Ils partent.\n⛔ Le piège : écrire « part » à la fin. « Le voyageur et son domestique », c'est « ils ».\n⭐ Vrai : dans le roman, Fogg part le soir même avec son domestique, Passepartout.\n✅ Bravo si tu as 5 sur 5 : ton voyage commence bien !\nRéponse : rient, affirme, anglais, parient, partent.",
          schema: phrase({
            mots: [
              { texte: "Le" },
              { texte: "voyageur", focus: true },
              { texte: "et" },
              { texte: "son" },
              { texte: "domestique", focus: true },
              { texte: "partent" },
            ],
            groupes: [{ mots: [0, 4], label: "sujet" }],
            liens: [{ de: 4, vers: 5, label: "pluriel", type: "accord" }],
            legende: "Deux noms reliés par « et » : le verbe est au pluriel.",
          }),
          micros: ["6e_orth_accord_gn", "6e_orth_sujet_verbe"],
        },
        {
          enonce:
            "Barre le complément du nom, puis conjugue le verbe au présent.\na) Le domestique de Phileas Fogg (s'appeler) Passepartout.\nb) Les horloges de la gare (sonner) huit heures.\nc) Le carnet des horaires (rester) dans sa poche.\nd) Les rails du train (traverser) l'Inde.",
          correction:
            "Je barre le « de… » ou le « des… » qui suit le nom. Il me reste le noyau du sujet.\na) Je barre « de Phileas Fogg ». Le domestique, un seul : il s'appelle.\nb) Je barre « de la gare ». Les horloges, plusieurs : elles sonnent.\nc) Je barre « des horaires ». Le carnet, un seul : il reste.\nd) Je barre « du train ». Les rails, plusieurs : ils traversent.\n⛔ Le piège : au c), « horaires » est au pluriel, juste avant le verbe. Mais il n'y a qu'un carnet.\n⭐ « s'appelle » prend deux l devant un e muet : je m'appelle, il s'appelle.\n✅ Bravo si ton crayon a barré avant de conjuguer.\nRéponse : a) s'appelle ; b) sonnent ; c) reste ; d) traversent.",
          schema: phrase({
            mots: [
              { texte: "Le" },
              { texte: "carnet", focus: true },
              { texte: "des", barre: true },
              { texte: "horaires", barre: true },
              { texte: "reste" },
            ],
            groupes: [{ mots: [0, 3], label: "sujet" }],
            liens: [{ de: 1, vers: 4, label: "singulier", type: "accord" }],
            legende: "Un seul carnet : « reste » au singulier.",
          }),
          micros: ["6e_orth_sujet_verbe"],
        },
        {
          enonce:
            "Accorde les participes passés.\n« En Inde, Fogg et Passepartout sont (monté) sur un éléphant. Ils ont (traversé) la forêt. Ils ont (sauvé) une jeune femme, Aouda. À la fin du voyage, Aouda est (devenu) l'épouse de Fogg. »\na) Écris les quatre participes.\nb) Entoure l'auxiliaire de chacun.",
          correction:
            "Je regarde d'abord l'auxiliaire : être ou avoir ?\n« sont montés » : être. Le sujet est Fogg et Passepartout, masculin pluriel : -s.\n« ont traversé » : avoir. Traversé quoi ? la forêt, après le verbe : pas d'accord.\n« ont sauvé » : avoir. Sauvé qui ? une jeune femme, après le verbe : pas d'accord.\n« est devenue » : être. Le sujet est Aouda, féminin : -e.\n⛔ Le piège : écrire « sauvée » parce qu'on pense à Aouda. Avec avoir, le COD est APRÈS : on n'accorde pas.\n✅ Bravo si tu as entouré les quatre auxiliaires : c'est eux qui donnent la règle.\nRéponse : a) montés, traversé, sauvé, devenue ; b) sont, ont, ont, est.",
          schema: phrase({
            mots: [{ texte: "Aouda", focus: true }, { texte: "est" }, { texte: "devenue" }, { texte: "son" }, { texte: "épouse" }],
            groupes: [{ mots: [0, 0], label: "sujet" }],
            liens: [{ de: 0, vers: 2, label: "féminin", type: "accord" }],
            legende: "Avec être : « devenue » prend le -e d'Aouda.",
          }),
          micros: ["6e_orth_participe_passe"],
        },
        {
          enonce:
            "Passepartout envoie un télégramme. Complète avec son, sont, on ou ont.\n« Mon maître et Aouda … à Hong Kong. Mon maître a perdu … parapluie. … dit que les bateaux … du retard. Les billets … très chers. »",
          correction:
            "Je fais le test. « sont » devient « étaient ». « ont » devient « avaient ». « on » peut être remplacé par « il ». « son » veut dire « le sien ».\n1. Mon maître et Aouda étaient à Hong Kong : ça marche. « sont ».\n2. Il a perdu le sien : ça marche. « son » parapluie.\n3. Il dit que… : ça marche. « On », avec une majuscule en début de phrase.\n4. Les bateaux avaient du retard : ça marche. « ont ».\n5. Les billets étaient très chers : ça marche. « sont ».\n⛔ Le piège : « son » et « sont ». Si je peux dire « étaient », c'est le verbe « sont ».\n✅ Bravo si ton télégramme est sans faute : Passepartout peut l'envoyer !\nRéponse : sont, son, On, ont, sont.",
          schema: ecranSeulement(
            phrase({
              mots: [{ texte: "les" }, { texte: "bateaux" }, { texte: "ont", focus: true }, { texte: "du" }, { texte: "retard" }],
              legende: "« ont » se remplace par « avaient ».",
            }),
          ),
          micros: ["6e_orth_homophones"],
        },
        {
          enonce:
            "Récris le texte avec « Phileas Fogg et Aouda » comme sujet.\n« Phileas Fogg est arrivé à Calcutta. Il est pressé. Il prend le bateau. »\na) Récris le texte.\nb) Les mots accordés sont-ils au masculin ou au féminin ? Pourquoi ?",
          correction:
            "a) Le sujet devient pluriel. Je cherche tous les mots qui lui obéissent.\n« est arrivé » devient « sont arrivés ».\n« Il est pressé » devient « Ils sont pressés ».\n« Il prend » devient « Ils prennent ».\nTexte : Phileas Fogg et Aouda sont arrivés à Calcutta. Ils sont pressés. Ils prennent le bateau.\nb) Au masculin pluriel. Quand un homme et une femme sont ensemble, les mots accordés se mettent au masculin pluriel.\n⛔ Le piège : écrire « arrivées », à cause d'Aouda. Il suffit d'un masculin dans le groupe pour que tout soit au masculin.\n✅ Bravo si tu as pensé à « prennent », avec deux n.\nRéponse : a) Phileas Fogg et Aouda sont arrivés à Calcutta. Ils sont pressés. Ils prennent le bateau. b) Masculin pluriel.",
          schema: phrase({
            mots: [{ texte: "Fogg" }, { texte: "et" }, { texte: "Aouda" }, { texte: "sont" }, { texte: "arrivés" }],
            groupes: [{ mots: [0, 2], label: "sujet" }],
            liens: [{ de: 2, vers: 4, label: "masc. plur.", type: "accord" }],
            legende: "Un homme et une femme : masculin pluriel.",
          }),
          micros: ["6e_orth_sujet_verbe", "6e_orth_participe_passe"],
        },
        {
          enonce:
            "Passepartout écrit à sa mère. Il a fait quatre fautes d'accord. Trouve-les et corrige-les.\n« Chère maman, nous somme à Yokohama. Les rues sont pleine de monde. Le soir, les lanternes du port brille. Mon maître et moi avons pris un bateau. Les marins m'ont appris des chansons. Ils sont gentil. »",
          correction:
            "Je relis la lettre en trois passages : les noms, puis les verbes, puis les participes et les adjectifs.\n1. « nous somme » : avec « nous », le verbe finit par -ons ou par -es. Nous sommes.\n2. « pleine » : il obéit à « rues », féminin pluriel. Pleines.\n3. « brille » : qui est-ce qui brille ? Les lanternes. Je barre « du port ». Elles brillent.\n4. « gentil » : il obéit à « ils », masculin pluriel. Gentils.\nLes mots justes, à ne pas toucher : « avons pris » et « m'ont appris ». Avec avoir, le COD est après : pas d'accord.\n⛔ Le piège : corriger un mot juste. Je prouve la faute avant de changer.\n✅ Bravo si tu as trouvé les 4 sans toucher aux mots justes : tu es un vrai correcteur.\nRéponse : sommes, pleines, brillent, gentils.",
          schema: ecranSeulement(
            phrase({
              mots: [
                { texte: "les" },
                { texte: "lanternes", focus: true },
                { texte: "du", barre: true },
                { texte: "port", barre: true },
                { texte: "brillent" },
              ],
              groupes: [{ mots: [0, 3], label: "sujet" }],
              liens: [{ de: 1, vers: 4, label: "pluriel", type: "accord" }],
              legende: "Je barre « du port » : « lanternes » commande.",
            }),
          ),
          micros: ["6e_orth_accord_gn", "6e_orth_sujet_verbe", "6e_orth_accords_defi"],
        },
        {
          enonce:
            "Dictée préparée. Lis le texte trois fois, puis réponds.\n« Kiouni, l'éléphant, avance dans la forêt. Ses grandes oreilles battent l'air. Les voyageurs fatigués s'accrochent à son dos. »\na) Entoure le sujet de chaque verbe.\nb) Pourquoi « fatigués » finit-il par -és ?\nc) Cache le texte. Un adulte te le dicte : il est dans la correction.",
          correction:
            "a) Je demande « Qui est-ce qui… ? » devant chaque verbe.\nQui est-ce qui avance ? Kiouni, l'éléphant.\nQui est-ce qui bat l'air ? Ses grandes oreilles.\nQui est-ce qui s'accroche ? Les voyageurs fatigués.\nb) « fatigués » obéit à « voyageurs », masculin pluriel : -é pour le participe, -s pour le pluriel.\nc) Texte à dicter (l'adulte lit lentement, groupe par groupe) :\nKiouni, l'éléphant, avance dans la forêt. Ses grandes oreilles battent l'air. Les voyageurs fatigués s'accrochent à son dos.\nJe me relis trois fois : les noms, puis les verbes, puis les adjectifs.\n⛔ Le piège : « battent » avec un seul t. Le verbe battre a deux t.\n⭐ Vrai : dans le roman, Fogg achète l'éléphant Kiouni pour traverser l'Inde.\n✅ Zéro faute ? Bravo ! Une ou deux ? Recopie le mot juste trois fois.\nRéponse : a) Kiouni ; ses grandes oreilles ; les voyageurs fatigués. b) Il s'accorde avec « voyageurs ». c) Le texte ci-dessus.",
          schema: phrase({
            mots: [
              { texte: "Ses" },
              { texte: "grandes", nature: "adj." },
              { texte: "oreilles", focus: true },
              { texte: "battent" },
            ],
            liens: [
              { de: 2, vers: 1, label: "fém. plur.", type: "accord" },
              { de: 2, vers: 3, label: "pluriel", type: "accord" },
            ],
            legende: "« oreilles » commande l'adjectif et le verbe.",
          }),
          micros: ["6e_orth_accord_gn", "6e_orth_sujet_verbe"],
        },
        {
          enonce:
            "Le COD est placé avant. Accorde le participe passé.\na) Sa montre, Fogg l'a (regardé) cent fois.\nb) Les vingt mille livres qu'il a (parié) sont à la banque.\nc) Le train qu'ils ont (pris) roule vite.\nd) Les journaux, les Anglais les ont (lu) chaque matin.",
          correction:
            "Avec avoir, l'accord se fait avec le COD placé avant. Je cherche ce que « l' », « les » ou « que » reprennent.\na) « l' » reprend « sa montre », féminin singulier : regardée.\nb) « qu' » reprend « les vingt mille livres », féminin pluriel : pariées.\nc) « qu' » reprend « le train », masculin singulier : pris. Rien à ajouter.\nd) « les » reprend « les journaux », masculin pluriel : lus.\n⛔ Le piège : au b), croire que « livres » est masculin. Ici, ce sont des livres d'argent anglais : une livre, des livres. Féminin.\n✅ Bravo si tu as 4 sur 4 : c'est la règle la plus difficile de la 6e !\nRéponse : a) regardée ; b) pariées ; c) pris ; d) lus.",
          schema: phrase({
            mots: [
              { texte: "Sa" },
              { texte: "montre", focus: true },
              { texte: "," },
              { texte: "Fogg" },
              { texte: "l'" },
              { texte: "a" },
              { texte: "regardée" },
            ],
            groupes: [{ mots: [4, 4], label: "COD" }],
            liens: [{ de: 4, vers: 6, label: "féminin", type: "accord" }],
            legende: "« l' » reprend « sa montre », placé avant : on accorde.",
          }),
          micros: ["6e_orth_participe_passe"],
        },
      ],
    },

    /* ─────────────────── ★★★ Problèmes — quatre défis ─────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Quatre défis, quatre voyages. Chaque question juste rapporte une étoile.",
      rappel: [
        "Je relis en trois passages : les noms, puis les verbes, puis les participes.",
        "Pour chaque homophone, je fais le test du remplacement.",
        "Un mot juste ne se corrige pas : je prouve la faute avant de changer.",
      ],
      exercices: [
        {
          titre: "Défi 1 : la dictée à trous du centre de la Terre",
          enonce:
            "Un adulte lit le texte de la correction. Toi, tu complètes les huit trous avec et, est, a, à, son, sont, on ou ont.\n« Le professeur Lidenbrock … son neveu Axel descendent dans un volcan d'Islande. Leur guide, Hans, … un homme calme. Au fond, ils découvrent une mer immense … des champignons géants. Les trois hommes … courageux. Ils … peur, mais ils avancent. Axel perd … chemin dans le noir. Enfin, un volcan d'Italie les rejette … la surface. … appelle ce volcan le Stromboli. »\na) Complète les trous pendant la dictée.\nb) Pour chaque trou, écris le test qui prouve ta réponse.\nc) Étoile bonus : trouve un adjectif qui s'accorde avec un nom féminin.",
          figure: gravureVolcan,
          correction:
            "Texte à dicter (l'adulte lit une fois en entier, puis phrase par phrase) :\nLe professeur Lidenbrock et son neveu Axel descendent dans un volcan d'Islande. Leur guide, Hans, est un homme calme. Au fond, ils découvrent une mer immense et des champignons géants. Les trois hommes sont courageux. Ils ont peur, mais ils avancent. Axel perd son chemin dans le noir. Enfin, un volcan d'Italie les rejette à la surface. On appelle ce volcan le Stromboli.\nLes tests :\n1. « et » son neveu : je peux dire « et aussi ».\n2. « est » un homme calme : Hans était un homme calme.\n3. « et » des champignons : et aussi.\n4. « sont » courageux : ils étaient courageux.\n5. « ont » peur : ils avaient peur.\n6. « son » chemin : le sien.\n7. « à » la surface : rien ne le remplace.\n8. « On » appelle : il appelle.\nc) « immense » s'accorde avec « mer », féminin singulier. Le -e est déjà dans le mot.\n⛔ Le piège : écrire « on peur ». « On » n'est jamais suivi d'un nom : « ils ont peur ».\n⭐ Vrai : dans le roman, les explorateurs trouvent une mer sous la terre et une forêt de champignons géants.\n✅ Compte tes étoiles : une par trou juste, plus l'étoile bonus. 9 étoiles ? Défi relevé !\nRéponse : et, est, et, sont, ont, son, à, On ; bonus : immense.",
          schema: ecranSeulement(
            phrase({
              mots: [{ texte: "Ils" }, { texte: "ont", focus: true }, { texte: "peur" }],
              legende: "« ont » se remplace par « avaient » : ils avaient peur.",
            }),
          ),
          micros: ["6e_orth_homophones", "6e_orth_accords_defi"],
        },
        {
          titre: "Défi 2 : en route pour la Lune",
          enonce:
            "Michel Ardan écrit son journal de voyage :\n« Je suis entré dans l'obus. Je suis resté assis près du hublot. La Terre est devenue toute petite. »\na) Barbicane, Nicholl et Michel Ardan écrivent ensemble. Récris le journal avec « Nous ».\nb) Une phrase ne change pas du tout. Laquelle ? Pourquoi ?\nc) Étoile bonus : une exploratrice écrit à son tour. Écris sa première phrase.",
          figure: gravureObus,
          correction:
            "a) « Je suis » devient « Nous sommes ». Puis j'accorde chaque participe avec « nous ».\n« Nous », ce sont trois hommes : masculin pluriel.\nNous sommes entrés dans l'obus. Nous sommes restés assis près du hublot. La Terre est devenue toute petite.\n« assis » finit déjà par -s : il ne change pas.\nb) « La Terre est devenue toute petite. » Son sujet est « la Terre », pas « nous ». Il ne change donc pas : « devenue » reste au féminin singulier.\nc) Une exploratrice, c'est un féminin singulier : Je suis entrée dans l'obus.\n⛔ Le piège : changer aussi la 3e phrase, par habitude. Avant d'accorder, je vérifie QUI est le sujet.\n✅ Compte tes étoiles : une pour chaque question juste, plus l'étoile bonus. 4 étoiles ? Défi relevé, tu peux décoller !\nRéponse : a) Nous sommes entrés dans l'obus. Nous sommes restés assis près du hublot. La Terre est devenue toute petite. b) La 3e : son sujet est « la Terre ». c) Je suis entrée dans l'obus.",
          schema: phrase({
            mots: [{ texte: "Nous", focus: true }, { texte: "sommes" }, { texte: "entrés" }],
            groupes: [{ mots: [0, 0], label: "sujet" }],
            liens: [
              { de: 0, vers: 1, label: "nous", type: "accord" },
              { de: 0, vers: 2, label: "masc. plur.", type: "accord" },
            ],
            legende: "« Nous » = trois hommes : masculin pluriel.",
          }),
          micros: ["6e_orth_participe_passe", "6e_orth_accords_defi"],
        },
        {
          titre: "Défi 3 : le message dans la bouteille",
          enonce:
            "Des marins pêchent un requin. Dans son ventre, ils trouvent une bouteille avec un message. Il contient cinq fautes d'accord.\n« Nous somme trois naufragés. Notre navire, le Britannia, a coulé près des rochers pointu. Les vagues était énormes. Le capitaine Grant et ses deux marins sont vivant. Nous avons construit une cabane. Les fruits que nous avons cueilli sont notre seul repas. Aidez-nous ! »\na) Recopie les cinq mots fautifs.\nb) Corrige-les.\nc) Pour chacun, écris sa règle : A = accord dans le groupe nominal ; B = accord avec le sujet ; C = participe avec avoir.",
          figure: gravureBouteille,
          correction:
            "Je relis en trois passages : les noms, les verbes, les participes.\n1. « somme » → sommes. Avec « nous », le verbe être donne « nous sommes ». Règle B.\n2. « pointu » → pointus. Il obéit à « rochers », masculin pluriel. Règle A.\n3. « était » → étaient. Qui est-ce qui était énorme ? Les vagues, pluriel. Règle B.\n4. « vivant » → vivants. Il obéit au sujet « le capitaine Grant et ses deux marins », masculin pluriel. Règle B.\n5. « cueilli » → cueillis. Avec avoir, le COD « que » est AVANT et reprend « les fruits », masculin pluriel. Règle C.\nLes mots justes : « a coulé » (pas de COD), « avons construit une cabane » (COD après), « énormes » (accordé avec « vagues »).\n⛔ Le piège : accorder « construit » avec « nous ». Avec avoir, le sujet ne commande pas.\n⭐ Vrai : c'est le début des Enfants du capitaine Grant. Le message, abîmé par l'eau, lance un grand voyage autour du monde.\n✅ Compte tes étoiles : une par mot trouvé et corrigé, une par règle juste. 10 étoiles ? Tu as sauvé le capitaine Grant !\nRéponse : sommes (B), pointus (A), étaient (B), vivants (B), cueillis (C).",
          schema: phrase({
            mots: [
              { texte: "Les" },
              { texte: "fruits", focus: true },
              { texte: "que" },
              { texte: "nous" },
              { texte: "avons" },
              { texte: "cueillis" },
            ],
            groupes: [{ mots: [2, 2], label: "COD" }],
            liens: [{ de: 1, vers: 5, label: "masc. plur.", type: "accord" }],
            legende: "« que » reprend « les fruits », placés avant : on accorde.",
          }),
          micros: ["6e_orth_accords_defi", "6e_orth_accord_gn", "6e_orth_sujet_verbe", "6e_orth_participe_passe"],
        },
        {
          titre: "Défi 4 : la grande dictée en ballon",
          enonce:
            "Avant la dictée, observe ces mots : le Victoria, les plaines africaines, des girafes curieuses, sont restés, ont admiré.\na) Pourquoi « africaines » finit-il par -es ?\nb) Un adulte te dicte le texte de la correction. Écris-le.\nc) Relis-toi avec la grille : 1. les noms et les adjectifs ; 2. les verbes et leur sujet ; 3. les participes ; 4. les homophones.\nd) Compte tes étoiles avec le barème de la correction.",
          figure: gravureBallon,
          correction:
            "a) « africaines » obéit à « plaines », féminin pluriel : -e pour le féminin, -s pour le pluriel.\nb) Texte à dicter (l'adulte lit une fois en entier, puis groupe par groupe, puis une dernière fois) :\nLe docteur Fergusson et ses deux amis traversent l'Afrique en ballon. Leur ballon s'appelle le Victoria. Sous eux défilent les plaines africaines. Des girafes curieuses lèvent la tête. Un soir, les voyageurs sont restés au-dessus du lac Tchad. Ils ont admiré les étoiles. Enfin, ils sont arrivés au bord du fleuve Sénégal.\nc) La grille :\n1. Noms et adjectifs : amis, plaines africaines, girafes curieuses, voyageurs, étoiles.\n2. Verbes : « traversent » (le docteur et ses amis) ; « défilent » (le sujet « les plaines » est APRÈS le verbe) ; « lèvent » (des girafes).\n3. Participes : « sont restés » et « sont arrivés » (être, accord avec les voyageurs) ; « ont admiré » (avoir, COD « les étoiles » après : pas d'accord).\n4. Homophones : « sont » (étaient), « ont » (avaient).\nd) Le barème : 0 à 2 erreurs = 3 étoiles ; 3 à 5 erreurs = 2 étoiles ; plus de 5 = 1 étoile, et je refais la dictée demain.\n⛔ Le piège : « défile » au singulier. Le sujet est placé après le verbe : je cherche « Qui est-ce qui défile ? » Les plaines.\n⭐ Vrai : dans le roman, le Victoria survole le lac Tchad et traverse l'Afrique d'est en ouest.\n✅ 3 étoiles ? Tu as fini les quatre défis. Bravo, tu écris comme un explorateur !\nRéponse : a) accord avec « plaines » ; b) le texte ci-dessus ; c) et d) la grille et le barème.",
          schema: phrase({
            mots: [
              { texte: "Sous" },
              { texte: "eux" },
              { texte: "défilent" },
              { texte: "les" },
              { texte: "plaines", focus: true },
            ],
            groupes: [{ mots: [3, 4], label: "sujet" }],
            liens: [{ de: 4, vers: 2, label: "pluriel", type: "accord" }],
            legende: "Le sujet « les plaines » est placé après le verbe.",
          }),
          micros: ["6e_orth_accords_defi", "6e_orth_accord_gn", "6e_orth_sujet_verbe", "6e_orth_participe_passe", "6e_orth_homophones"],
        },
      ],
    },
  ],
};
