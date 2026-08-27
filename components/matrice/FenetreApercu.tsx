"use client";

// components/matrice/FenetreApercu.tsx
//
// LA FENÊTRE DU SURVOL — les écrans de la ressource, l'un après l'autre.
//
// ── LA RÉFÉRENCE, ET CE QU'ON EN GARDE ───────────────────────────────────────
// Frédéric, 26/08/2026 : « quand la souris passe sur les cards il faut trois
// screenshots de ce qui les attend », « un peu comme IXL lorsqu'on passe la
// souris sur une compétence » — puis « déjà un screenshot, voire deux
// maximum ». Le plafond vit dans scripts/capturer-apercus.ts ; ce composant, lui,
// dessine autant de pastilles que la bande porte d'écrans, quel qu'en soit le
// nombre. Il n'a aucun chiffre en dur à faire correspondre.
//
// Chez IXL, survoler une compétence ouvre une petite fenêtre intitulée « Aperçu
// des exercices », avec quatre pastilles en haut à droite : elle montre un
// exemple, puis le suivant. Trois choses là-dedans font le travail, et ce sont
// les trois qui sont reprises :
//   1. ÇA S'OUVRE AU SURVOL, sans clic — donc sans rien coûter à qui ne veut
//      pas voir. Le survol est un signe d'intention, et c'est lui qui autorise
//      à dépenser les octets d'une capture (voir scripts/capturer-apercus.ts).
//   2. LES PASTILLES DISENT COMBIEN IL Y EN A. Sans elles, un écran qui change
//      tout seul se lit comme un défaut d'affichage. Avec elles, il se lit comme
//      un feuilletage : on sait qu'il y a une suite, et où on en est.
//   3. ÇA MONTRE LE TRAVAIL, PAS LA PAGE D'ACCUEIL DU TRAVAIL. IXL montre une
//      question, pas la couverture du chapitre. C'est le script de capture qui
//      tient cette promesse-là, en descendant d'un écran entre deux prises.
//
// ── ⚠️ CE QUI NE VIENT PAS D'IXL, ET POURQUOI ────────────────────────────────
// IXL laisse la fenêtre attendre un clic sur ses pastilles. Ici elle TOURNE
// TOUTE SEULE, ~2,2 s par écran. La raison est dans la forme de la carte : chez
// IXL on survole une ligne de texte de 15 px de haut, et la souris y reste
// posée ; ici on survole un rectangle de 900 px de large qu'on est en train de
// LIRE. Demander un clic sur une pastille de 6 px pendant qu'on lit, c'est
// demander un geste que personne ne fera — et la moitié de la capture ne serait
// jamais vue.
// ⚠️ La fenêtre BOUCLE, elle ne s'arrête pas au dernier écran. Une souris posée
// dix secondes sur une carte doit pouvoir revoir ce qu'elle a manqué, sans quoi
// le premier écran — celui qui dit ce que c'est — n'est visible qu'une fois.
//
// ── CE QUI NE S'AFFICHE PAS, ET CE N'EST PAS UN OUBLI ────────────────────────
// ⛔ RIEN SOUS 1536 px (`2xl`). Deux raisons, et la seconde est mécanique :
//    — sous cette largeur, une fenêtre de 340 px couvre la moitié de la carte
//      qu'on est en train de lire ;
//    — la fenêtre déborde de 28 % à droite de la carte, dans la gouttière. À
//      1536 px cette gouttière fait ~150 px et la fenêtre y tient. Plus étroit,
//      elle sortirait de la page et fabriquerait une barre de défilement
//      horizontale sur l'accueil.
// ⛔ RIEN AU DOIGT. `(hover: hover)` : sur téléphone, le premier appui doit
//    OUVRIR la ressource, pas déplier un aperçu. C'est la décision du 26/08 —
//    l'aperçu est un supplément de bureau, et l'écran d'un téléphone n'a pas
//    300 px à donner à une image que personne n'a demandée.
// ⛔ RIEN POUR QUI N'A PAS DE CAPTURE. `bandeApercu()` rend `null` : la carte
//    reste exactement ce qu'elle était. Aucune carte n'attend un fichier.

import { useEffect, useState } from "react";

/** ~2,2 s par écran : le temps de lire une question, pas celui de s'ennuyer. */
const DUREE = 2200;

/**
 * LA TAILLE DU PANNEAU — 380 px de large, et le reste s'en déduit.
 *
 * Frédéric, 26/08 : « ils doivent avoir le même rapport qu'un écran PC ou
 * téléphone, non ? ». Oui, et c'est PC : le panneau ne s'ouvre qu'au-dessus de
 * 1536 px, donc devant quelqu'un qui est sur un ordinateur — lui montrer une
 * capture de téléphone lui montrerait un écran qu'il n'aura jamais.
 *
 * 380 × 10/16 = 237,5 px par écran. La hauteur n'est donc écrite NULLE PART :
 * elle sort du rapport, et le rapport est celui de la capture
 * (scripts/capturer-apercus.ts réduit la fenêtre du navigateur à 800 × 500 avant
 * de photographier). C'est ce qui garantit qu'une bande tombe pile dans le
 * cadre, et qu'un `translateY` d'une fraction arrive exactement sur l'écran
 * suivant.
 *
 * ⚠️ 380 ET NON 340 (26/08, seconde passe). À 340, une capture de 800 px de
 * large était réduite à 42 % ; à 380 elle l'est à 47 %. Ce n'est pas un
 * arrondi : c'est la marche entre un titre qu'on lit et un titre qu'on devine.
 * L'autre moitié du gain est dans le script, qui capture désormais en fenêtre
 * réduite au lieu de 1200 px.
 *
 * ⭐ IL NE DÉBORDE PLUS DE LA CARTE (27/08/2026), et c'est ce qui a permis de
 * l'ouvrir aux portables. La première version le décalait de 28 % vers la
 * droite, dans la gouttière de la page. Joli, et payé cher : pour que ces 106 px
 * ne fabriquent pas une barre de défilement horizontale sur l'accueil, il fallait
 * ~1536 px de large — donc pas de panneau sur un portable, c'est-à-dire pas de
 * panneau pour l'essentiel des gens qui ont une souris (Frédéric, 27/08 : « ça
 * s'affiche bien sur grand écran mais pas sur mon ordinateur portable »).
 * Posé À L'INTÉRIEUR du bord droit de la carte, il ne peut plus déborder de quoi
 * que ce soit, à aucune largeur. Le seuil devient un choix de lisibilité (`lg`)
 * au lieu d'une contrainte de place.
 *
 * ⛔ 380 px ET PAS PLUS. À 1024 px — le seuil — la carte fait ~730 px : le
 * panneau en occupe déjà la moitié droite. Plus large, il ne couvrirait plus le
 * texte, il le remplacerait.
 */
const LARGEUR = 380;
const RAPPORT = "16 / 10";

/**
 * ⚠️ LE PANNEAU NE CONNAÎT PLUS AUCUN MANIFESTE (27/08, seconde vie).
 *
 * Il lisait `bandeApercu(id)` depuis le registre des ressources de l'accueil.
 * Ça marchait tant qu'il n'y avait qu'un appelant — et ça l'aurait rendu
 * inutilisable pour le second, les notions du coach, qui sont indexées par un
 * TRIPLET (matière / classe / notion) et non par un identifiant de ressource.
 *
 * Chaque appelant résout donc son chemin chez lui — `bandeApercu()` pour les
 * cartes, `apercuNotion()` pour le coach — et ce composant ne sait plus qu'une
 * chose : afficher `ecrans` écrans empilés dans une image, l'un après l'autre.
 */
export default function FenetreApercu({
  src,
  ecrans,
  ouverte,
  /** Où la fenêtre se pose dans son parent `relative`. Les cartes de l'accueil
   *  la centrent sur leur bord droit ; le coach la pose sous le titre. */
  position = "absolute right-3 top-1/2 -translate-y-1/2",
  /**
   * CE QUE MONTRE CHAQUE ÉCRAN, quand ça ne va pas de soi.
   *
   * Frédéric, 27/08 : « et si on rajoutait en en-tête Mode complet / Mode
   * simple ? ». Sur le coach, les deux écrans ne sont pas deux moitiés d'une
   * page mais DEUX VUES du tutor — et rien ne le disait. Les pastilles
   * annoncent qu'il y a une suite, pas ce qu'elle contient : on regardait deux
   * écrans différents sans savoir qu'on avait le choix entre les deux.
   *
   * ⚠️ Sur les cartes de l'accueil, on ne met rien : les deux écrans y sont le
   * haut et le bas d'une même page, et « Écran 1 / Écran 2 » n'apprendrait rien
   * à personne. Le libellé sert quand il NOMME quelque chose.
   */
  libelles,
}: {
  src: string;
  ecrans: number;
  ouverte: boolean;
  position?: string;
  libelles?: string[];
}) {
  const [index, setIndex] = useState(0);

  /**
   * ⚠️ LE MINUTEUR NE TOURNE QUE PENDANT LE SURVOL, et il repart de zéro.
   *
   * Six cartes à l'écran, six minuteurs qui tourneraient en permanence : c'est
   * six `setState` toutes les deux secondes sur une page qui n'a rien à faire.
   * Et repartir de zéro compte autant : quelqu'un qui revient sur une carte veut
   * revoir le premier écran, pas reprendre au troisième d'un survol oublié.
   */
  useEffect(() => {
    if (!ouverte || ecrans < 2) return;
    setIndex(0);
    const t = setInterval(() => setIndex((i) => (i + 1) % ecrans), DUREE);
    return () => clearInterval(t);
  }, [ouverte, ecrans, src]);

  if (!src) return null;

  return (
    <div
      /* ⚠️ `aria-hidden` ET `pointer-events-none`, LES DEUX.
         `aria-hidden` : la fenêtre ne dit rien que le titre et la promesse ne
         disent déjà en toutes lettres à côté — la faire lire une seconde fois à
         qui n'y voit pas, ce serait allonger la carte sans rien y ajouter.
         `pointer-events-none` : elle recouvre le tiers droit d'une carte
         ENTIÈREMENT CLIQUABLE. Sans ça, elle avalerait le clic qu'elle est
         censée provoquer. */
      aria-hidden="true"
      style={{ width: LARGEUR }}
      className={`pointer-events-none z-30 hidden transition-all duration-200 lg:block ${position} ${
        ouverte ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
    >
      {/* Le cadre reprend la charte des cartes — bord noir, ombre portée pleine,
          angles droits. Une fenêtre arrondie et floutée aurait eu l'air d'être
          arrivée d'un autre site. */}
      <div className="overflow-hidden border-2 border-[#1d1c16] bg-white shadow-[6px_6px_0_#1d1c16]">
        <div className="flex items-center justify-between gap-2 border-b-2 border-[#1d1c16]/15 bg-[#f6f4ee] px-2.5 py-1.5">
          {/* ⚠️ Le libellé de l'écran COURANT, sinon « Aperçu ». Il change en
              même temps que l'image : c'est lui qui fait comprendre que la
              seconde pastille n'est pas la suite de la première, mais l'autre
              façon de voir la même notion. */}
          <span className="truncate text-[10px] font-bold uppercase tracking-wide text-[#1d1c16]/55">
            {libelles?.[index] ?? "Aperçu"}
          </span>
          {/* Les pastilles. Une seule capture = une seule pastille, et elle dit
              alors « c'est tout », ce qui est une information honnête. */}
          <span className="flex items-center gap-1">
            {Array.from({ length: ecrans }, (_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                  i === index ? "bg-[#0e7490]" : "bg-[#1d1c16]/20"
                }`}
              />
            ))}
          </span>
        </div>

        {/* ⚠️ 16:10, ET C'EST EXACTEMENT LE FORMAT DE CAPTURE.
            Le script prend des écrans de 800 × 500 et les empile. Ce rapport-ci
            fait donc que la boîte a EXACTEMENT la hauteur d'une bande : le
            `translateY` d'une fraction tombe alors pile sur l'écran suivant.
            Changer l'un sans l'autre ferait glisser les écrans les uns sur les
            autres, et personne ne saurait pourquoi l'aperçu est de travers.
            ⚠️ La hauteur n'est pas écrite : 380 × 10/16 = 237,5 px. Un chiffre
            de moins à faire correspondre à la main. */}
        <div className="relative overflow-hidden bg-white" style={{ aspectRatio: RAPPORT }}>
          {/* ⚠️ UN `<img>` NU, ET PAS `next/image` — c'est une décision de coût,
              pas une paresse. `next/image` ferait passer chaque bande par
              l'optimiseur de Vercel, qui se facture à l'image source
              transformée. Or ces fichiers sont DÉJÀ des WebP à la bonne
              largeur : ils sortent de scripts/capturer-apercus.ts en 760 px,
              exactement le double de la fenêtre. Il n'y a rien à optimiser, et
              tout à payer. Servi tel quel depuis /public, c'est un fichier
              statique en cache, à zéro à l'exécution. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            /* ⚠️ `loading="lazy"` NE SUFFIRAIT PAS, et c'est pour ça que le
               composant n'est monté qu'au premier survol (voir CarteRessource) :
               une image dans le champ de vision est chargée, paresseuse ou pas.
               Six captures à ~60 Ko sur la page la plus vue du site, pour des
               cartes qui changent à chaque question, c'est exactement la facture
               qu'on refusait en tête d'ApercuRessource.tsx. */
            decoding="async"
            className="block w-full will-change-transform"
            style={{
              transform: `translateY(calc(${-index} * 100% / ${ecrans}))`,
              transition: "transform 420ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
