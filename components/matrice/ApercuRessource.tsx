// components/matrice/ApercuRessource.tsx
//
// L'APERÇU D'UNE RESSOURCE — la vignette de gauche des cartes de l'accueil.
//
// ── POURQUOI CE N'EST PAS UNE CAPTURE D'ÉCRAN ────────────────────────────────
// La demande était « un screenshot à gauche, l'explication à droite ». L'idée
// est la bonne — une image dit en un dixième de seconde ce qu'un titre met une
// phrase à dire, et c'est exactement ce qui fait rester quelqu'un. La CAPTURE,
// elle, ne l'est pas, et pour trois raisons mesurables :
//
//   1. LE POIDS. Cet écran est payé au poids du HTML relu (1 unité Vercel =
//      8 Ko, par visite). Six vignettes PNG à 20 Ko, c'est 120 Ko d'images sur
//      la page la plus vue du site — pour des cartes qui CHANGENT à chaque
//      question, donc jamais deux fois les mêmes six.
//   2. LA PÉREMPTION. 53 ressources dans l'inventaire. Une capture ment le jour
//      où la page qu'elle montre change de bouton, et personne ne s'en aperçoit :
//      c'est un fichier, pas une ligne de code qu'un typecheck relit.
//   3. CE QU'ON VEUT VRAIMENT MONTRER. Une capture du coach, à 96 px de large,
//      c'est une bouillie grise. Ce qu'il faut faire comprendre, ce n'est pas à
//      quoi la page RESSEMBLE, c'est ce qu'on va y FAIRE.
//
// ── ⭐ 2ᵉ PASSE, LE MÊME JOUR : « PAS ASSEZ FUN, ET TROP FROIDE » ─────────────
// Frédéric, sur la première version : « le css est parfait, ce qui me dérange
// c'est l'image à gauche, elle n'est pas assez fun et trop froide ». Il avait
// raison, et la cause était dans le dessin, pas dans la carte :
//
//   — CHAQUE VIGNETTE ÉTAIT UNE FENÊTRE. Un cadre, une barre de titre, deux
//     points gris : le vocabulaire d'une capture d'écran de logiciel. Six l'une
//     sous l'autre, ça faisait une planche de wireframes — la chose la plus
//     froide qu'on puisse mettre devant un élève de 6ᵉ. Le cadre est parti.
//   — TOUT ÉTAIT TEAL SUR BLANC. Une seule couleur, froide, et du gris. Chaque
//     type porte maintenant SA couleur, prise dans les quatre déjà posées sur
//     le site, et la vignette est un aplat teinté plein cadre : la colonne de
//     six devient colorée sans devenir un arc-en-ciel.
//   — TOUT ÉTAIT À ANGLE DROIT. Les formes sont arrondies et les traits ont des
//     bouts ronds. Les CARTES, elles, restent carrées : c'est la charte du
//     site. L'arrondi est à l'intérieur de l'illustration, là où il se lit comme
//     un dessin et non comme une entorse.
//
// ── ⛔ ET CE QU'ON A ESSAYÉ PUIS REPOSÉ : LES MARGOUILLATS ───────────────────
// « Tu peux pas remplacer ça par des margouillats », puis, une fois la pièce
// montée : « on revient à la version précédente ». Ce qui a été tenté, pour ne
// pas le retenter par hasard dans six mois : les trois PNG de Ti Margo
// (public/cahier-vacances/, crayon · cahier · tablette) posés sur le même fond
// coloré, une pose par famille de types, en alternant sur le rang pour que
// deux coachs de suite ne montrent pas deux fois la même image.
// Ce qui coince : trois poses pour treize types, donc un dessin qui ne dit plus
// CE QU'EST la ressource — il dit « EleveAI », ce que le reste de la page dit
// déjà. Ti Margo garde sa place au pied de l'accueil, où il signe ; ici, la
// vignette a un travail d'information à faire.
//
// ⚠️ LES DESSINS SE DÉDUISENT DE `type`, ET DE RIEN D'AUTRE. Pas de champ à
// remplir dans ressources.ts : une ressource ajoutée demain a son aperçu le
// jour même. C'est la contrepartie assumée — deux coachs ont le même dessin.
// C'est voulu : deux coachs, ça SE RESSEMBLE, et l'œil doit pouvoir apprendre
// que ce dessin-là veut dire « on va me poser des questions ».

import type { TypeRessource } from "@/lib/matrice/types";

/**
 * LES QUATRE COULEURS, ET PAS UNE DE PLUS.
 *
 * Elles existent toutes déjà sur le site : le teal de la marque, l'olive du
 * badge « testée en classe », l'ocre de la pastille Concours, et la brique qui
 * en est la voisine chaude. Trois sur quatre sont chaudes — c'est le point.
 *
 * ⛔ NE PAS EN AJOUTER UNE CINQUIÈME pour distinguer un type de plus. Au-delà
 * de quatre, une colonne de six vignettes n'a plus de couleur dominante : elle
 * a un arc-en-ciel, et un arc-en-ciel ne se lit pas plus vite qu'un camaïeu —
 * il se lit moins vite, parce que plus rien n'y fait exception.
 *
 * `fond` est la teinte à ~12 % sur blanc, écrite en dur : un `opacity` sur un
 * rectangle plein cadre ferait transparaître la carte au survol, quand elle se
 * décale et prend son ombre.
 */
const PALETTE = {
  teal: { trait: "#0e7490", fond: "#e2f1f5" },
  olive: { trait: "#3f6b0c", fond: "#ecf2e2" },
  ocre: { trait: "#a34c07", fond: "#faeee4" },
  brique: { trait: "#c2410c", fond: "#fceade" },
} as const;

type Couleur = keyof typeof PALETTE;

/**
 * QUI PORTE QUELLE COULEUR.
 *
 * Ce n'est pas décoratif : deux ressources de la même couleur se ressemblent, et
 * elles doivent donc être du même ordre. Le teal va à ce qui FAIT TRAVAILLER
 * (coach, entraînement, machine) ; l'olive à ce qui MESURE (parcours, suivi,
 * fiche) ; l'ocre à ce qui vient du PAPIER et du calendrier (cahier, évaluation,
 * rituel) ; la brique à ce qui SORT DU CADRE (défi, guide, vidéo, photo).
 */
const COULEUR_DU_TYPE: Record<TypeRessource, Couleur> = {
  coach: "teal",
  entrainement: "teal",
  machine: "teal",
  page: "teal",
  parcours: "olive",
  suivi: "olive",
  fiche: "olive",
  evaluation: "ocre",
  cahier: "ocre",
  rituel: "ocre",
  defi: "brique",
  guide: "brique",
  video: "brique",
};

/**
 * CE QUE C'EST, EN UN MOT — la ligne de surtitre de la carte.
 *
 * ⚠️ Ce sont des noms, pas des verbes : ils répondent à « c'est quoi ? », que
 * l'aperçu vient de poser. Le verbe, lui, est déjà dans la promesse.
 */
export const LIBELLE_TYPE: Record<TypeRessource, string> = {
  coach: "Coach",
  parcours: "Parcours",
  evaluation: "Évaluation",
  entrainement: "Entraînement",
  defi: "Défi",
  rituel: "Rituel du jour",
  fiche: "Fiche",
  cahier: "Cahier",
  guide: "Guide",
  video: "Vidéo",
  machine: "Machine",
  suivi: "Suivi",
  page: "Page",
};

/**
 * CE QUE ÇA REND — le champ `resultat` de l'inventaire, enfin affiché.
 *
 * Il existe depuis le 07/08 et n'était lu NULLE PART à l'écran : il ne servait
 * qu'au filtre du professeur. C'est pourtant la seule ligne de la carte qui
 * réponde à « et après ? » — et « et après ? » est exactement la question de
 * quelqu'un qui hésite à cliquer.
 *
 * ⚠️ Impersonnel, comme les promesses : un texte lu par l'élève ET par le
 * parent assis à côté (voir la note de `promesse` dans types.ts).
 */
export const LIBELLE_RESULTAT: Record<string, string> = {
  score: "une note à la fin",
  progression: "la progression est enregistrée",
  corrige: "le corrigé est fourni",
};

/**
 * Le dessin, dans la couleur qu'on lui passe. Chaque cas remplit la boîte
 * 96 × 72 avec ~8 px de marge : sans cadre, une forme qui flotte au milieu
 * redevient un pictogramme, et c'est justement ce qu'on quitte.
 */
function Dessin({ type, t }: { type: TypeRessource; t: string }) {
  switch (type) {
    // Deux bulles : on demande, ça répond, et c'est corrigé.
    case "coach":
      return (
        <>
          <path
            d="M15 8h42a7 7 0 0 1 7 7v13a7 7 0 0 1-7 7H30l-9 7 1-7h-7a7 7 0 0 1-7-7V15a7 7 0 0 1 7-7z"
            fill="#fff"
            stroke={t}
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <path d="M21 17h27M21 24h18" stroke={t} strokeWidth="2.6" strokeLinecap="round" opacity="0.4" />
          <path
            d="M45 41h34a6 6 0 0 1 6 6v11a6 6 0 0 1-6 6H60l-8 6 1-6h-8a6 6 0 0 1-6-6V47a6 6 0 0 1 6-6z"
            fill={t}
          />
          <path
            d="M53 52.5l4.5 4.5 9-9.5"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      );

    // Un chemin d'étapes : deux faites, une en cours, l'arrivée au bout.
    // ⚠️ CE FUT UN ESCALIER DE BARRES, ET C'ÉTAIT LE MÊME DESSIN QUE `suivi`.
    // Vus côte à côte, on ne les distinguait pas — or ce sont justement les deux
    // qu'il faut pouvoir distinguer : l'un se FAIT, l'autre se REGARDE. Des
    // jalons reliés disent « il y a une suite » ; des barres disent « voici des
    // chiffres ».
    case "parcours":
      return (
        <>
          <path d="M16 44h58" stroke={t} strokeWidth="2.6" strokeLinecap="round" opacity="0.3" strokeDasharray="1 7" />
          <path d="M16 44h30" stroke={t} strokeWidth="3" strokeLinecap="round" />
          {[16, 31, 46].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy="44" r="8.5" fill={i < 2 ? t : "#fff"} stroke={t} strokeWidth="3" />
              {i < 2 && (
                <path
                  d={`M${x - 3.6} 44l2.7 2.9 4.8-6`}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </g>
          ))}
          <path d="M74 46V15" stroke={t} strokeWidth="3" strokeLinecap="round" />
          <path d="M74 17h15l-5 6 5 6H74z" fill={t} strokeLinejoin="round" />
        </>
      );

    // Une copie rendue : des lignes, et une note validée.
    case "evaluation":
      return (
        <>
          <rect x="9" y="7" width="46" height="58" rx="5" fill="#fff" stroke={t} strokeWidth="2.6" />
          <path d="M18 20h28M18 30h28M18 40h18" stroke={t} strokeWidth="2.6" strokeLinecap="round" opacity="0.4" />
          <circle cx="66" cy="47" r="19" fill={t} />
          <path
            d="M58 47.5l5.5 5.5 11-12"
            fill="none"
            stroke="#fff"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      );

    // Des questions cochées les unes après les autres.
    case "entrainement":
      return (
        <>
          {[10, 30, 50].map((y, i) => (
            <g key={y}>
              <rect
                x="10"
                y={y}
                width="16"
                height="16"
                rx="4.5"
                fill={i < 2 ? t : "#fff"}
                stroke={t}
                strokeWidth="2.6"
              />
              {i < 2 && (
                <path
                  d={`M14.5 ${y + 8}l3 3 5-6`}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              <path
                d={`M34 ${y + 8}h${i === 2 ? 26 : 52}`}
                stroke={t}
                strokeWidth="3"
                strokeLinecap="round"
                opacity={i === 2 ? 0.3 : 0.45}
              />
            </g>
          ))}
        </>
      );

    // Une cible : un tir par jour, et on vise le centre.
    case "defi":
      return (
        <>
          <circle cx="43" cy="40" r="26" fill="none" stroke={t} strokeWidth="3" opacity="0.35" />
          <circle cx="43" cy="40" r="16" fill="none" stroke={t} strokeWidth="3" opacity="0.6" />
          <circle cx="43" cy="40" r="6.5" fill={t} />
          <path d="M85 8L52 32" stroke={t} strokeWidth="3.4" strokeLinecap="round" />
          <path d="M85 8h-11m11 0v11" stroke={t} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );

    // Cinq minutes, tous les jours : une semaine de coches.
    case "rituel":
      return (
        <>
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 9 + i * 16.5;
            const fait = i < 3;
            return (
              <g key={i}>
                <rect
                  x={x}
                  y="20"
                  width="13"
                  height="13"
                  rx="3.5"
                  fill={fait ? t : "#fff"}
                  stroke={t}
                  strokeWidth="2.6"
                  opacity={fait ? 1 : 0.45}
                />
                {fait && (
                  <path
                    d={`M${x + 3.2} 26.5l2.6 2.7 4.2-5.4`}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </g>
            );
          })}
          <path d="M9 48h48M9 59h30" stroke={t} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
        </>
      );

    // Une feuille à imprimer : une figure, et le texte autour.
    // ⚠️ UNE FIGURE, PAS UN PAYSAGE. Le premier jet dessinait ici la montagne
    // des icônes d'image — c'est-à-dire, à 96 px, la forme exacte d'une photo
    // qui n'a pas chargé. C'est le piège déjà tombé le 20/08 sur la pastille de
    // « Photographier un cours ».
    case "fiche":
      return (
        <>
          <rect x="13" y="5" width="70" height="62" rx="5" fill="#fff" stroke={t} strokeWidth="2.6" />
          <path d="M22 34h24L22 14z" fill="none" stroke={t} strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M22 28h6v6" fill="none" stroke={t} strokeWidth="2" />
          <path d="M55 16h19M55 26h19" stroke={t} strokeWidth="2.6" strokeLinecap="round" opacity="0.4" />
          <path d="M22 46h52M22 56h34" stroke={t} strokeWidth="2.6" strokeLinecap="round" opacity="0.4" />
        </>
      );

    // Un livret : plusieurs pages, et on peut le tenir.
    case "cahier":
      return (
        <>
          <rect x="20" y="14" width="58" height="52" rx="5" fill={t} opacity="0.25" />
          <rect x="14" y="7" width="58" height="52" rx="5" fill="#fff" stroke={t} strokeWidth="2.6" />
          <path d="M27 7v52" stroke={t} strokeWidth="2.6" opacity="0.45" />
          <path d="M36 20h26M36 30h20M36 40h24" stroke={t} strokeWidth="2.6" strokeLinecap="round" opacity="0.4" />
          <circle cx="20.5" cy="20" r="2.2" fill={t} opacity="0.55" />
          <circle cx="20.5" cy="33" r="2.2" fill={t} opacity="0.55" />
          <circle cx="20.5" cy="46" r="2.2" fill={t} opacity="0.55" />
        </>
      );

    // Une bouée : on l'ouvre quand ça coince.
    case "guide":
      return (
        <>
          <circle cx="48" cy="36" r="24" fill="none" stroke={t} strokeWidth="7" />
          <circle cx="48" cy="36" r="10.5" fill="#fff" stroke={t} strokeWidth="2.6" />
          <path
            d="M32 20l8 8M64 20l-8 8M32 52l8-8M64 52l-8-8"
            stroke={t}
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.55"
          />
        </>
      );

    // Un lecteur : ça se regarde.
    case "video":
      return (
        <>
          <rect x="8" y="8" width="80" height="45" rx="7" fill={t} />
          <path d="M40 22l17 8.5-17 8.5z" fill="#fff" strokeLinejoin="round" />
          <path d="M8 63h50" stroke={t} strokeWidth="4" strokeLinecap="round" />
          <path d="M64 63h24" stroke={t} strokeWidth="4" strokeLinecap="round" opacity="0.3" />
        </>
      );

    // Des curseurs et une courbe : on bouge quelque chose, ça réagit.
    case "machine":
      return (
        <>
          <path d="M9 17h30M9 36h30M9 55h30" stroke={t} strokeWidth="2.6" strokeLinecap="round" opacity="0.3" />
          <circle cx="31" cy="17" r="6" fill={t} />
          <circle cx="16" cy="36" r="6" fill={t} />
          <circle cx="24" cy="55" r="6" fill={t} />
          <path
            d="M50 60c9 0 11-40 20-40s11 21 18 21"
            fill="none"
            stroke={t}
            strokeWidth="3.4"
            strokeLinecap="round"
          />
        </>
      );

    // Un tableau de bord : des barres qui montent.
    case "suivi":
      return (
        <>
          <path d="M12 7v57h76" fill="none" stroke={t} strokeWidth="3" strokeLinecap="round" opacity="0.45" />
          <rect x="22" y="44" width="13" height="20" rx="3" fill={t} opacity="0.4" />
          <rect x="41" y="34" width="13" height="30" rx="3" fill={t} opacity="0.6" />
          <rect x="60" y="24" width="13" height="40" rx="3" fill={t} opacity="0.8" />
          <rect x="79" y="14" width="13" height="50" rx="3" fill={t} />
        </>
      );

    // Une page : un titre, du texte, un bouton. Le défaut honnête.
    default:
      return (
        <>
          <path d="M10 12h40" stroke={t} strokeWidth="5" strokeLinecap="round" />
          <path d="M10 26h76M10 36h62M10 46h70" stroke={t} strokeWidth="3" strokeLinecap="round" opacity="0.35" />
          <rect x="10" y="56" width="34" height="12" rx="6" fill={t} />
        </>
      );
  }
}

/**
 * ⭐ LE GESTE GAGNE SUR LE TYPE — l'appareil photo, et lui seul.
 *
 * « Photographier un cours » est déclarée `type: "machine"`, ce qui est juste :
 * on lui donne une entrée, elle rend des exercices. Mais le dessin d'une
 * machine — des curseurs et une courbe — dirait exactement le contraire de ce
 * qu'on attend de la personne, qui est de SORTIR SON TÉLÉPHONE. C'est la
 * décision du 12/08 (Frédéric : « un svg représentant un appareil photo comme
 * sur Le Bon Coin »), et elle survit intacte à la refonte des cartes : elle
 * change juste de place, de la pastille à l'aperçu.
 *
 * ⚠️ `icone` reste réservé aux gestes PHYSIQUES (voir types.ts). Une deuxième
 * exception par ressource et ce fichier redevient une planche de pictogrammes.
 */
function Camera({ t }: { t: string }) {
  return (
    <>
      <path
        d="M14 22h11l4-7h22l4 7h11a6 6 0 0 1 6 6v29a6 6 0 0 1-6 6H14a6 6 0 0 1-6-6V28a6 6 0 0 1 6-6z"
        fill="#fff"
        stroke={t}
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <circle cx="40" cy="42" r="13" fill={t} />
      <circle cx="40" cy="42" r="5.5" fill="#fff" opacity="0.9" />
      <circle cx="65" cy="30" r="2.6" fill={t} opacity="0.55" />
      <path d="M79 9l3.5 6 6-3.5" fill="none" stroke={t} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M82.5 15c6 5 7.5 14 4 21" fill="none" stroke={t} strokeWidth="2.8" strokeLinecap="round" />
    </>
  );
}

/**
 * ⚠️ `aria-hidden` ET AUCUN TEXTE ALTERNATIF. Ce dessin ne dit rien que le
 * surtitre (« Coach ») et le titre ne disent déjà en toutes lettres, juste à
 * côté. Lui donner un `<title>` ferait entendre « schéma d'une conversation,
 * Coach, Le coach maths » — trois fois la même chose à qui n'y voit pas.
 */
export default function ApercuRessource({
  type = "page",
  icone,
  className = "",
}: {
  type?: TypeRessource;
  icone?: "camera";
  className?: string;
}) {
  // La photo passe en brique : c'est un geste, pas un outil, et la couleur
  // suit le dessin plutôt que le `type` déclaré.
  const { trait, fond } = PALETTE[icone === "camera" ? "brique" : COULEUR_DU_TYPE[type]];
  return (
    <svg viewBox="0 0 96 72" aria-hidden="true" className={className}>
      <rect width="96" height="72" fill={fond} />
      {icone === "camera" ? <Camera t={trait} /> : <Dessin type={type} t={trait} />}
    </svg>
  );
}
