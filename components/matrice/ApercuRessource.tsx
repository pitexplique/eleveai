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
//      quoi la page RESSEMBLE, c'est ce qu'on va y FAIRE : une conversation, un
//      escalier de niveaux, une feuille à imprimer, un graphique de suivi.
//
// D'où ces dessins : un schéma de l'écran, dessiné en SVG, dans le trait du
// site (le même #1d1c16, le même teal). Ils pèsent zéro octet de réseau, ils ne
// périment pas, et ils lisent à 72 px.
//
// ⚠️ ILS SE DÉDUISENT DE `type`, ET DE RIEN D'AUTRE. Pas de champ à remplir
// dans ressources.ts : une ressource ajoutée demain a son aperçu le jour même.
// C'est la contrepartie assumée — deux coachs ont le même dessin. C'est voulu :
// deux coachs, ça SE RESSEMBLE, et l'œil doit pouvoir apprendre que ce
// dessin-là veut dire « on va me poser des questions ».

import type { TypeRessource } from "@/lib/matrice/types";

const ENCRE = "#1d1c16";
const ACCENT = "#0e7490";

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
 * Le cadre commun : c'est LUI qui fait lire « un écran » plutôt que « une
 * icône ». Sans la barre de titre et ses deux points, les dessins d'en dessous
 * redeviennent des pictogrammes, et une rangée de pictogrammes ne dit plus rien.
 */
function Cadre({ children }: { children: React.ReactNode }) {
  return (
    <>
      <rect x="1" y="1" width="94" height="70" fill="#ffffff" stroke={ENCRE} strokeWidth="2" />
      <path d="M1 15h94" stroke={ENCRE} strokeWidth="2" />
      <circle cx="8" cy="8" r="1.8" fill={ENCRE} opacity="0.45" />
      <circle cx="14.5" cy="8" r="1.8" fill={ENCRE} opacity="0.45" />
      {children}
    </>
  );
}

/** Une ligne de texte simulée. */
function Ligne({ x, y, w, fort = false }: { x: number; y: number; w: number; fort?: boolean }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={fort ? 4 : 3}
      fill={ENCRE}
      opacity={fort ? 0.85 : 0.28}
    />
  );
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
function Camera() {
  return (
    <Cadre>
      <path
        d="M10 30h13l4-6h20l4 6h13v28H10z"
        fill={ACCENT}
        opacity="0.12"
      />
      <path
        d="M10 30h13l4-6h20l4 6h13v28H10z"
        fill="none"
        stroke={ENCRE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="37" cy="44" r="9" fill="none" stroke={ACCENT} strokeWidth="2.4" />
      <circle cx="61" cy="35" r="2" fill={ENCRE} opacity="0.5" />
      <path d="M74 24l3 5 5-3" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M77 29c6 4 8 12 5 18" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" />
    </Cadre>
  );
}

function Dessin({ type }: { type: TypeRessource }) {
  switch (type) {
    // Une conversation : on demande, ça répond, et c'est corrigé.
    case "coach":
      return (
        <Cadre>
          <path d="M8 23h44v14H14l-6 5z" fill="none" stroke={ENCRE} strokeWidth="2" />
          <Ligne x={13} y={28} w={30} />
          <path d="M88 44H44v14h38l6 5z" fill={ACCENT} opacity="0.16" />
          <path d="M88 44H44v14h38l6 5z" fill="none" stroke={ACCENT} strokeWidth="2" />
          <path d="M50 51l4 4 8-8" fill="none" stroke={ACCENT} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </Cadre>
      );

    // Un chemin d'étapes : deux faites, une en cours, l'arrivée au bout.
    // ⚠️ CE FUT UN ESCALIER DE BARRES, ET C'ÉTAIT LE MÊME DESSIN QUE `suivi`.
    // Vu côte à côte sur la planche des aperçus, on ne les distinguait pas — or
    // ce sont justement les deux qu'il faut pouvoir distinguer : l'un se FAIT,
    // l'autre se REGARDE. Des jalons reliés disent « il y a une suite » ; des
    // barres disent « voici des chiffres ».
    case "parcours":
      return (
        <Cadre>
          <path d="M14 44h68" stroke={ENCRE} strokeWidth="2" opacity="0.3" strokeDasharray="3 4" />
          <path d="M14 44h34" stroke={ACCENT} strokeWidth="2.4" />
          {[14, 31, 48].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy="44" r="7" fill={i < 2 ? ACCENT : "#ffffff"} stroke={ACCENT} strokeWidth="2.4" />
              {i < 2 && (
                <path d={`M${x - 3} 44l2.2 2.4 4-5`} fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </g>
          ))}
          <circle cx="65" cy="44" r="5" fill="none" stroke={ENCRE} strokeWidth="2" opacity="0.4" />
          <path d="M82 44V26h-11l3 5-3 5h11" fill={ACCENT} opacity="0.85" stroke={ACCENT} strokeWidth="2" strokeLinejoin="round" />
        </Cadre>
      );

    // Une copie rendue : des lignes, et une note entourée.
    case "evaluation":
      return (
        <Cadre>
          <Ligne x={9} y={24} w={40} fort />
          <Ligne x={9} y={33} w={52} />
          <Ligne x={9} y={41} w={44} />
          <Ligne x={9} y={49} w={50} />
          <circle cx="73" cy="46" r="15" fill="none" stroke={ACCENT} strokeWidth="2.4" />
          <path d="M66 46l5 5 9-11" fill="none" stroke={ACCENT} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </Cadre>
      );

    // Des questions cochées les unes après les autres.
    case "entrainement":
      return (
        <Cadre>
          {[24, 36, 48].map((y, i) => (
            <g key={y}>
              <rect x="9" y={y} width="9" height="9" fill="none" stroke={i < 2 ? ACCENT : ENCRE} strokeWidth="2" />
              {i < 2 && (
                <path d={`M11 ${y + 4.5}l2.5 2.5 4-5`} fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              )}
              <Ligne x={24} y={y + 3} w={i === 2 ? 40 : 62} />
            </g>
          ))}
        </Cadre>
      );

    // Une cible : un tir par jour, et on vise le centre.
    case "defi":
      return (
        <Cadre>
          <circle cx="48" cy="44" r="19" fill="none" stroke={ENCRE} strokeWidth="2" />
          <circle cx="48" cy="44" r="11" fill="none" stroke={ENCRE} strokeWidth="2" opacity="0.45" />
          <circle cx="48" cy="44" r="4" fill={ACCENT} />
          <path d="M70 22L52 40" stroke={ACCENT} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M70 22h-7m7 0v7" stroke={ACCENT} strokeWidth="2.4" strokeLinecap="round" />
        </Cadre>
      );

    // Cinq minutes, tous les jours : une semaine de coches.
    case "rituel":
      return (
        <Cadre>
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 10 + i * 16;
            const fait = i < 3;
            return (
              <g key={i}>
                <rect x={x} y="30" width="12" height="12" fill={fait ? ACCENT : "none"} stroke={fait ? ACCENT : ENCRE} strokeWidth="2" opacity={fait ? 1 : 0.4} />
                {fait && <path d={`M${x + 2.5} 36l2.5 2.5 4.5-5.5`} fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />}
              </g>
            );
          })}
          <Ligne x={10} y={52} w={34} fort />
          <Ligne x={10} y={60} w={58} />
        </Cadre>
      );

    // Une feuille à imprimer : un schéma en haut, le texte dessous.
    case "fiche":
      return (
        <Cadre>
          {/* ⚠️ UNE FIGURE, PAS UN PAYSAGE. Le premier jet dessinait ici la
              montagne des icônes d'image — c'est-à-dire, à 96 px, la forme
              exacte d'une photo qui n'a pas chargé. C'est le piège déjà tombé
              le 20/08 sur la pastille de « Photographier un cours ». Un
              triangle rectangle avec sa marque d'angle droit dit « fiche de
              cours » et ne peut pas se lire comme un cadre vide. */}
          <rect x="9" y="22" width="34" height="26" fill={ACCENT} opacity="0.14" stroke={ACCENT} strokeWidth="2" />
          <path d="M15 43h22L15 27z" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M15 38h5v5" fill="none" stroke={ACCENT} strokeWidth="1.8" />
          <Ligne x={49} y={24} w={38} fort />
          <Ligne x={49} y={33} w={30} />
          <Ligne x={49} y={41} w={36} />
          <Ligne x={9} y={55} w={78} />
          <Ligne x={9} y={62} w={54} />
        </Cadre>
      );

    // Un livret : plusieurs pages, et on peut le tenir.
    case "cahier":
      return (
        <Cadre>
          <rect x="16" y="24" width="52" height="40" fill={ENCRE} opacity="0.1" />
          <rect x="22" y="20" width="52" height="40" fill="#ffffff" stroke={ENCRE} strokeWidth="2" />
          <path d="M30 20v40" stroke={ENCRE} strokeWidth="2" opacity="0.35" />
          <Ligne x={36} y={28} w={30} fort />
          <Ligne x={36} y={37} w={24} />
          <Ligne x={36} y={45} w={28} />
          <circle cx="26" cy="28" r="1.6" fill={ENCRE} opacity="0.5" />
          <circle cx="26" cy="40" r="1.6" fill={ENCRE} opacity="0.5" />
          <circle cx="26" cy="52" r="1.6" fill={ENCRE} opacity="0.5" />
        </Cadre>
      );

    // Une bouée : on l'ouvre quand ça coince.
    case "guide":
      return (
        <Cadre>
          <circle cx="48" cy="44" r="18" fill="none" stroke={ACCENT} strokeWidth="4" />
          <circle cx="48" cy="44" r="8" fill="none" stroke={ENCRE} strokeWidth="2" />
          <path d="M36 32l6 6M60 32l-6 6M36 56l6-6M60 56l-6-6" stroke={ENCRE} strokeWidth="2" strokeLinecap="round" />
        </Cadre>
      );

    // Un lecteur : ça se regarde.
    case "video":
      return (
        <Cadre>
          <rect x="9" y="22" width="78" height="34" fill={ENCRE} opacity="0.08" />
          <path d="M42 32l16 7-16 7z" fill={ACCENT} />
          <path d="M9 62h56" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
          <path d="M65 62h22" stroke={ENCRE} strokeWidth="3" strokeLinecap="round" opacity="0.25" />
        </Cadre>
      );

    // Des curseurs et une courbe : on bouge quelque chose, ça réagit.
    case "machine":
      return (
        <Cadre>
          <path d="M9 30h30M9 42h30M9 54h30" stroke={ENCRE} strokeWidth="2" opacity="0.3" strokeLinecap="round" />
          <circle cx="30" cy="30" r="4.5" fill={ACCENT} />
          <circle cx="18" cy="42" r="4.5" fill={ACCENT} />
          <circle cx="24" cy="54" r="4.5" fill={ACCENT} />
          <rect x="48" y="22" width="39" height="40" fill="none" stroke={ENCRE} strokeWidth="2" opacity="0.35" />
          <path d="M50 58c8 0 10-26 18-26s10 14 17 14" fill="none" stroke={ACCENT} strokeWidth="2.6" strokeLinecap="round" />
        </Cadre>
      );

    // Un tableau de bord : des barres qui montent.
    case "suivi":
      return (
        <Cadre>
          <path d="M12 22v40h74" fill="none" stroke={ENCRE} strokeWidth="2" />
          <rect x="20" y="46" width="12" height="16" fill={ACCENT} opacity="0.4" />
          <rect x="38" y="38" width="12" height="24" fill={ACCENT} opacity="0.6" />
          <rect x="56" y="30" width="12" height="32" fill={ACCENT} opacity="0.8" />
          <rect x="74" y="24" width="12" height="38" fill={ACCENT} />
        </Cadre>
      );

    // Une page : un titre, un bouton, du texte. Le défaut honnête.
    default:
      return (
        <Cadre>
          <Ligne x={9} y={23} w={46} fort />
          <Ligne x={9} y={33} w={78} />
          <Ligne x={9} y={41} w={66} />
          <Ligne x={9} y={49} w={72} />
          <rect x="9" y="57" width="30" height="9" fill={ACCENT} opacity="0.85" />
        </Cadre>
      );
  }
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
  return (
    <svg viewBox="0 0 96 72" aria-hidden="true" className={className}>
      {icone === "camera" ? <Camera /> : <Dessin type={type} />}
    </svg>
  );
}
