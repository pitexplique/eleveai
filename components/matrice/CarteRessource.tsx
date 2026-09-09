// components/matrice/CarteRessource.tsx
//
// UNE RESSOURCE PROPOSÉE — un rectangle pleine largeur, l'aperçu à gauche,
// l'explication à droite.
//
// ── CE QUI A CHANGÉ, ET POURQUOI (22/08/2026) ────────────────────────────────
// Frédéric : « 3 c'est trop peu […] il faut les refaire, peut-être avec des
// sections différentes en vertical, et sur chaque rectangle un screenshot à
// gauche et à droite l'explication. Ça améliorera notre bounce. »
//
// L'ancienne forme était trois colonnes d'un tiers d'écran. Deux conséquences,
// et la seconde est celle qui coûtait des visites :
//
//   1. LA LARGEUR PAYAIT POUR LE NOMBRE. Trois cartes côte à côte, c'est trois
//      colonnes de ~280 px : un titre s'y casse en deux lignes, une promesse en
//      quatre, et il ne reste de place pour rien d'autre. La preuve est dans
//      l'historique du fichier — le badge a dû DÉMÉNAGER (20/08) parce qu'il
//      volait 110 px au titre. En rangée, la même carte dispose de 900 px : le
//      titre tient sur une ligne, et il reste de la place pour dire ce que la
//      ressource RENDRA.
//   2. TROIS COLONNES, C'EST UN CUL-DE-SAC VISUEL. La ligne se termine, l'œil
//      remonte, la page est finie. Une pile verticale, elle, se continue : on
//      voit la moitié de la quatrième carte sous le pli, et on fait défiler.
//      C'est exactement le geste qu'on cherche à provoquer.
//
// ── CE QUE LA CARTE DIT MAINTENANT, DANS L'ORDRE OÙ ON LE LIT ────────────────
//   l'aperçu     ce à quoi ça ressemble        (voir ApercuRessource.tsx)
//   le surtitre  ce que c'est                  (`type`)
//   le badge     qui l'a relue                 (`statut`)
//   le titre     comment ça s'appelle
//   la promesse  ce qu'on y fait
//   la dernière ligne :
//     — sur quoi ça s'ouvre  (`ciblee` + la notion lue)
//     — pourquoi elle sort   (`raison`)
//     — ⭐ ET CE QU'ON EN RETIRE (`resultat`), qui n'était affiché NULLE PART.
//       Le champ existe depuis le 07/08 et ne servait qu'au filtre du
//       professeur. C'est pourtant la seule ligne qui réponde à « et après ? »,
//       et « et après ? » est la question de quelqu'un qui hésite à cliquer.
//
// ── ⭐ ET AU SURVOL, DE VRAIES CAPTURES (26/08/2026) ─────────────────────────
// Frédéric : « quand la souris passe sur les cards il faut trois screenshots de
// ce qui les attend », « un peu comme IXL lorsqu'on passe la souris sur une
// compétence » — puis, une heure plus tard : « déjà un screenshot, voire deux
// maximum ».
//
// Le « screenshot à gauche » de la demande du 22/08 avait été traité par un
// DESSIN, et pour trois raisons chiffrées qui sont toujours en tête
// d'ApercuRessource.tsx. Elles valent pour la vignette, qui s'affiche six fois
// par écran, à tout le monde, à chaque question. Elles ne valent pas pour le
// survol : celui-là ne coûte un octet qu'à qui a déjà choisi de regarder.
//
// La vignette dessinée reste donc exactement où elle était. Ce qui s'ajoute,
// c'est une fenêtre qui s'ouvre à droite de la carte au passage de la souris —
// et rien d'autre ne bouge : pas de décalage de mise en page, pas de clic à
// donner, rien sur téléphone, rien pour les ressources sans capture.
// Le détail est dans FenetreApercu.tsx, la fabrique dans
// scripts/capturer-apercus.ts.

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import ApercuRessource, { LIBELLE_RESULTAT, LIBELLE_TYPE } from "./ApercuRessource";
import FenetreApercu from "./FenetreApercu";
import { bandeApercu } from "@/lib/matrice/apercus.generated";
import type { ProfilId, Recommandation } from "@/lib/matrice/types";

/**
 * LA CONDITION DU SURVOL, POSÉE UNE FOIS — et elle est lue au MOMENT du survol,
 * jamais au rendu.
 *
 * Interrogée pendant le rendu, elle mentirait : le serveur n'a pas de
 * `window`, et React reprocherait au client de dire autre chose que lui
 * (hydratation). Ici elle n'est appelée que depuis `onMouseEnter`, c'est-à-dire
 * dans un navigateur, par quelqu'un qui a une souris.
 *
 * ⭐ `any-hover` ET NON `hover` (27/08/2026), ET C'EST UN BOGUE RÉEL.
 * Frédéric : « ça s'affiche bien sur grand écran mais pas sur mon ordinateur
 * portable Samsung ». Ces portables-là ont un écran TACTILE. Sur une machine
 * qui a les deux, Chrome peut déclarer `hover: none` — le média `hover` décrit
 * le pointeur PRINCIPAL, et le tactile peut l'être même quand un pavé tactile
 * est branché. `any-hover: hover` demande la bonne chose : « est-ce qu'AU MOINS
 * UN pointeur sait survoler ? ». Un téléphone répond non, un portable tactile
 * répond oui — c'est exactement la ligne qu'on voulait tracer.
 *
 * Ce garde-fou reste indispensable : sur un écran purement tactile, `mouseenter`
 * se déclenche À L'APPUI, juste avant que le lien s'ouvre. Sans lui, chaque tap
 * sur une carte téléchargerait une capture de 50 Ko que personne ne verrait.
 *
 * ⭐ ET 1024 px, PAS 1536 (27/08/2026). Le seuil d'origine était `2xl`, choisi
 * pour que le panneau tienne dans la gouttière à droite de la carte. C'était
 * régler la visibilité sur une contrainte de placement — et ça excluait tous
 * les portables, c'est-à-dire l'essentiel des gens qui ont une souris. La
 * contrainte a disparu : le panneau ne déborde plus (FenetreApercu.tsx), il se
 * pose à l'intérieur du bord droit de la carte.
 *
 * LA RÈGLE DEMANDÉE, MOT POUR MOT (Frédéric, 27/08) : « ça doit fonctionner même
 * sur un 13 pouces portable mais pas sur un téléphone ». 1024 px trace
 * exactement cette ligne, et les deux bords sont larges :
 *   — un 13 pouces fait 1280 ou 1366 px de large en CSS ; même à 250 % de mise
 *     à l'échelle sur une dalle 2880, il reste à 1152. Il passe.
 *   — un téléphone plafonne à ~430 px debout, et à ~930 px couché sur le plus
 *     grand modèle vendu. Il ne passe pas.
 *   — une tablette posée en paysage tombe pile sur 1024, et c'est `any-hover`
 *     qui l'écarte : sans souris branchée, rien chez elle ne sait survoler.
 *
 * ⚠️ 1024 px, C'EST `lg` — le même seuil que le `lg:block` de la fenêtre
 * (FenetreApercu.tsx). Les deux disent la même chose à deux endroits, et il le
 * faut : le CSS décide de ce qui se VOIT, ce test décide de ce qui se CHARGE.
 * Sans lui, un téléphone téléchargerait des captures qu'il n'affiche jamais.
 * Si l'un des deux chiffres bouge, l'autre bouge avec.
 */
function peutSurvoler() {
  return typeof window !== "undefined"
    ? window.matchMedia("(any-hover: hover) and (min-width: 1024px)").matches
    : false;
}

export default function CarteRessource({
  r,
  rang,
  profil,
  notionLabel,
}: {
  r: Recommandation;
  /** 1 pour la première. Sert au suivi ET à la bordure de la carte de tête. */
  rang: number;
  /**
   * Qui regarde — pour le suivi, et rien d'autre.
   *
   * ⚠️ `"vitrine"` N'EST PAS UN PROFIL, et c'est justement pourquoi il est
   * écrit ici : ces cartes-là s'affichent quand personne n'a encore dit qui il
   * est (voir lib/matrice/vitrine.ts). Sans cette valeur, un clic de vitrine
   * serait indistinguable d'un clic de réponse dans les statistiques — or c'est
   * exactement le chiffre qu'on essaie de faire bouger.
   */
  profil: ProfilId | "vitrine";
  /** La notion que le moteur a lue, s'il en a lu une. */
  notionLabel: string | null;
}) {
  const testee = r.ressource.statut === "testee_eleves";
  const resultat = r.ressource.resultat ? LIBELLE_RESULTAT[r.ressource.resultat] : null;
  const ouvreSur = r.ciblee && notionLabel ? notionLabel : null;

  /**
   * DEUX ÉTATS, ET PAS UN — c'est ce qui fait qu'un aperçu ne se paie qu'une
   * fois et ne clignote jamais.
   *
   * `montee` : la fenêtre a été demandée au moins une fois. Elle reste montée
   *   ensuite, donc l'image reste dans le cache du navigateur : un second survol
   *   sur la même carte est instantané, et ne redemande rien au réseau.
   * `ouverte` : la souris est DESSUS en ce moment. C'est ce booléen-là qui pilote
   *   l'opacité et le minuteur des pastilles.
   *
   * ⚠️ Ne pas fusionner les deux en un seul. Avec un seul état, quitter la carte
   * démonterait la fenêtre — et la revenir la ferait réapparaître par une image
   * qui recharge, c'est-à-dire un blanc de 100 ms à chaque aller-retour de
   * souris dans une pile de six cartes.
   * ⚠️ Et ne pas monter la fenêtre d'avance « puisqu'elle est invisible » : une
   * image dans le champ de vision est chargée, `lazy` ou pas. Six captures sur
   * la page la plus vue du site, c'est exactement la facture qu'ApercuRessource
   * refusait en tête de fichier.
   */
  const [montee, setMontee] = useState(false);
  const [ouverte, setOuverte] = useState(false);
  /**
   * ⭐⭐ LES DEUX MÊMES ÉTATS, POUR LE TOUCHER (09/09/2026 — Frédéric : « go
   * pour mobile »). 38 % des visiteurs du site sont sur mobile, et
   * `peutSurvoler()` les écarte exprès : ils ne voyaient donc JAMAIS une des
   * 347 captures de `public/apercus/`.
   *
   * ⚠️ DEUX PAIRES D'ÉTATS ET NON UNE, alors que la mécanique est identique.
   * Fusionner obligerait à savoir, au moment du rendu, si l'on est sur un
   * pointeur ou un doigt — c'est-à-dire à interroger `matchMedia` pendant le
   * rendu, exactement ce que la note de `peutSurvoler()` interdit (le serveur
   * n'a pas de `window`, et React reproche au client de dire autre chose que
   * lui). Deux paires, deux fenêtres, chacune cachée par le CSS de son côté du
   * seuil : personne n'a besoin de deviner quoi que ce soit.
   */
  const [monteeTactile, setMonteeTactile] = useState(false);
  const [ouverteTactile, setOuverteTactile] = useState(false);
  const bande = bandeApercu(r.ressource.id);

  function survoler() {
    if (!bande || !peutSurvoler()) return;
    setMontee(true);
    setOuverte(true);
  }

  /**
   * ⚠️ AUCUN TEST DE POINTEUR ICI, et c'est voulu : ce geste-là est explicite.
   * `peutSurvoler()` existe parce que `mouseenter` part TOUT SEUL à l'appui, à
   * l'insu de la personne. Un tap sur un bouton qui dit « voir l'aperçu » est
   * une demande — la garder derrière un test de média reviendrait à refuser ce
   * qu'on vient de proposer. Le bouton, lui, est caché en `lg:` où le survol
   * fait déjà le travail.
   */
  function ouvrirAuDoigt(e: MouseEvent<HTMLButtonElement>) {
    // Le bouton recouvre la vignette, qui est DANS le rectangle cliquable de la
    // carte. Sans ces deux lignes, l'aperçu s'ouvrirait et la ressource
    // s'ouvrirait par-dessus.
    e.preventDefault();
    e.stopPropagation();
    if (!bande) return;
    setMonteeTactile(true);
    setOuverteTactile(true);
    // ⭐ L'ÉVÉNEMENT QUI MESURE L'HYPOTHÈSE, et il est neuf : `ia_apercu` dira
    // si les gens au doigt VEULENT ces captures. Sans lui, on aurait livré une
    // fonctionnalité sans jamais savoir si elle sert — et c'est précisément la
    // question qui a lancé le chantier.
    track("ia_apercu", { id: r.ressource.id, rang, profil });
  }

  return (
    <li
      // `relative` porte la fenêtre du survol, qui déborde à droite de la carte.
      // ⚠️ Le survol est écouté sur le <li> et non sur le <Link> : le <Link> est
      // le rectangle entier, mais c'est le <li> qui contient AUSSI la fenêtre.
      // Accroché au lien, `onMouseLeave` se déclencherait au moment où la souris
      // entre dans la fenêtre — sur une carte étroite, l'aperçu se fermerait
      // sous le curseur.
      className="relative"
      onMouseEnter={survoler}
      onMouseLeave={() => setOuverte(false)}
      // Le clavier y a droit aussi : `focus` monte la même fenêtre. Elle reste
      // `aria-hidden` — elle ne se lit pas, elle se regarde.
      onFocus={survoler}
      onBlur={() => setOuverte(false)}
    >
      <Link
        // Une ressource externe s'ouvre dans un nouvel onglet et ne porte pas
        // `?from=ia` : ce paramètre ne sert qu'à notre suivi interne, et on ne
        // renvoie personne d'un clic hors du site sans qu'il puisse revenir.
        href={r.ressource.externe ? r.url : `${r.url}${r.url.includes("?") ? "&" : "?"}from=ia`}
        target={r.ressource.externe ? "_blank" : undefined}
        rel={r.ressource.externe ? "noopener noreferrer" : undefined}
        // ⚠️ PAS DE PRÉCHARGEMENT. Un <Link> d'App Router va chercher la charge
        // RSC de sa destination dès qu'il entre dans le champ de vision, et sur
        // une route statique c'est une LECTURE du cache durable — le quota ISR
        // Reads du compte. Ces cartes changent à chaque question : les laisser
        // précharger ferait payer des destinations que personne n'ouvre.
        // ⚠️ ET ÇA COMPTE DOUBLE DEPUIS QU'ELLES SONT SIX au lieu de trois.
        prefetch={false}
        onClick={() => track("ia_ressource", { id: r.ressource.id, rang, profil })}
        className={`group flex items-start gap-3 border-2 bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#1d1c16] sm:gap-4 sm:p-4 ${
          rang === 1 ? "border-[#0e7490]" : "border-[#1d1c16]/30"
        }`}
      >
        {/* ⚠️ L'APERÇU RESTE À GAUCHE SUR TÉLÉPHONE, il ne passe pas au-dessus.
            À 375 px il fait 64 px de large — la colonne de texte garde 240 px,
            de quoi tenir un titre sur deux lignes. L'empiler aurait ajouté
            72 px de hauteur À CHACUNE DES SIX CARTES, soit un écran entier de
            défilement en plus pour la même information. */}
        <ApercuRessource
          type={r.ressource.type}
          icone={r.ressource.icone}
          className="h-12 w-16 shrink-0 sm:h-[66px] sm:w-[88px]"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {r.ressource.type && (
              <span className="text-[10px] font-bold uppercase tracking-wide text-[#1d1c16]/55">
                {LIBELLE_TYPE[r.ressource.type]}
              </span>
            )}
            {/* ⭐ LES DEUX BADGES RESTENT, ET ILS SE DISENT (20/08/2026). Un
                audit demandait d'en choisir UN, au motif que deux mots pour une
                idée sèment le doute. Ce ne sont pas deux mots pour une idée :
                « vérifiée » veut dire qu'un enseignant l'a relue, « testée en
                classe » qu'elle est en plus passée devant des élèves. La
                seconde contient la première, elle ne la répète pas — et c'est
                exactement la promesse du site. Le `title` écrit la différence,
                qui n'était écrite nulle part. */}
            <span
              title={
                testee
                  ? "Relue par un enseignant, et déjà utilisée avec des élèves."
                  : "Relue par un enseignant avant d'être publiée."
              }
              className={`whitespace-nowrap px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                testee ? "bg-[#3f6b0c]/12 text-[#3f6b0c]" : "bg-[#0e7490]/12 text-[#0e7490]"
              }`}
            >
              {testee ? "testée en classe" : "vérifiée"}
            </span>
            {r.ressource.externe && (
              // Elle sort du site : on le dit AVANT le clic, pas après. Un
              // nouvel onglet qui s'ouvre sans prévenir est le meilleur moyen
              // de perdre quelqu'un qui croyait rester.
              <span className="whitespace-nowrap text-[10px] font-medium uppercase tracking-wide text-[#1d1c16]/45">
                autre site
              </span>
            )}
          </div>

          {/* Le titre a toute la largeur de la rangée : c'est le gain direct du
              passage en vertical, et c'est ce qui lui permet de tenir sur une
              ligne là où il en prenait trois en colonne. */}
          <p className="mt-0.5 text-balance font-bold leading-snug text-[#1d1c16] group-hover:text-[#0e7490]">
            {r.ressource.titre}
          </p>

          <p className="mt-0.5 text-sm leading-snug text-[#1d1c16]/75">{r.ressource.promesse}</p>

          {/* ⚠️ LA LIGNE N'EXISTE QUE S'IL Y A QUELQUE CHOSE À Y METTRE.
              `raison` peut être vide depuis que le niveau ne se réécrit plus
              sous chaque carte (moteur.ts, 20/08) — un <p> vide laisserait une
              ligne blanche sous la promesse, exactement ce qu'on avait retiré.
              ⚠️ `/65` et non `/50` : #1d1c16 à 50 % sur blanc, c'est 3,4:1,
              sous le seuil AA. À 65 % on est à 5,3:1. */}
          {(ouvreSur || r.raison || resultat) && (
            <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-xs leading-snug text-[#1d1c16]/65">
              {ouvreSur && (
                <span className="text-[#0e7490]">s&apos;ouvre sur {ouvreSur}</span>
              )}
              {ouvreSur && (r.raison || resultat) && <span aria-hidden="true">·</span>}
              {r.raison && <span>{r.raison}</span>}
              {r.raison && resultat && <span aria-hidden="true">·</span>}
              {resultat && <span>{resultat}</span>}
            </p>
          )}
        </div>

        {/* La flèche ne dit rien de neuf — elle dit que la rangée ENTIÈRE est
            cliquable, ce qu'un rectangle sans bouton ne dit pas de lui-même.
            ⚠️ Cachée sous 640 px : au doigt, la question ne se pose pas, et
            elle prendrait 20 px à une colonne de texte qui n'en a que 240. */}
        <span
          aria-hidden="true"
          className="mt-1 hidden shrink-0 self-center text-lg text-[#1d1c16]/30 transition group-hover:translate-x-0.5 group-hover:text-[#0e7490] sm:block"
        >
          →
        </span>
      </Link>

      {/* ⚠️ HORS DU <Link>, ET C'EST OBLIGATOIRE. Un <a> ne peut pas contenir
          d'élément interactif, et surtout : la fenêtre déborde du rectangle
          cliquable. Posée dedans, elle agrandirait la zone de clic de 95 px vers
          la droite — un clic dans la gouttière ouvrirait la ressource. */}
      {montee && bande && (
        <FenetreApercu src={bande.src} ecrans={bande.ecrans} ouverte={ouverte} />
      )}

      {/* ⭐⭐ LE DÉCLENCHEUR AU DOIGT — POSÉ SUR LA VIGNETTE DESSINÉE.
          Toucher l'image pour voir l'image : c'est le geste que tout le monde
          connait, et il n'a besoin d'aucune explication à l'écran.
          ⚠️ HORS DU <Link>, comme la fenêtre : un <a> ne peut pas contenir de
          bouton. D'où le placement absolu, et d'où les deux lignes de
          `ouvrirAuDoigt` qui empêchent le lien de s'ouvrir par-dessous.

          ⚠️⚠️ SES COORDONNÉES RECOPIENT CELLES DE LA VIGNETTE, et les deux
          jeux DOIVENT bouger ensemble — c'est le même contrat que les 1024 px
          de `peutSurvoler()` et le `lg:` de la fenêtre. Le calcul :
            gauche/haut = bordure (2 px) + padding du <Link> (12 px en `p-3`,
            16 px en `sm:p-4`), donc 14 px puis 18 px ;
            taille = celle d'`ApercuRessource` ci-dessus, h-12 w-16 puis
            sm:h-[66px] sm:w-[88px].
          Si l'un des deux change, ce bouton se décale sans rien casser de
          visible — il couvrira simplement autre chose que la vignette.

          ⛔ `lg:hidden` : au-dessus du seuil, le survol fait déjà le travail,
          et deux chemins pour le même geste, c'est un de trop. */}
      {bande && (
        <button
          type="button"
          onClick={ouvrirAuDoigt}
          aria-label={`Voir un aperçu de « ${r.ressource.titre} »`}
          className="absolute left-[14px] top-[14px] flex h-12 w-16 items-end justify-end p-1 sm:left-[18px] sm:top-[18px] sm:h-[66px] sm:w-[88px] lg:hidden"
        >
          {/* La pastille est la SEULE chose visible : la vignette dessinée
              reste lisible dessous, on ne la recouvre pas d'un voile. */}
          <span
            aria-hidden="true"
            className="flex h-4 w-4 items-center justify-center rounded-full border border-[#1d1c16]/25 bg-white/95 text-[#1d1c16]/70 shadow-sm sm:h-5 sm:w-5"
          >
            <svg viewBox="0 0 16 16" className="h-2.5 w-2.5 sm:h-3 sm:w-3">
              <path
                d="M8 3.5C5 3.5 2.7 5.7 2 8c.7 2.3 3 4.5 6 4.5s5.3-2.2 6-4.5c-.7-2.3-3-4.5-6-4.5z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <circle cx="8" cy="8" r="1.7" fill="currentColor" />
            </svg>
          </span>
        </button>
      )}

      {/* ⚠️ LE FOND CAPTE LE TOUCHER PARTOUT, PANNEAU COMPRIS — c'est lui qui
          remplace le bouton de fermeture. La fenêtre garde
          `pointer-events-none` en mode tactile (voir FenetreApercu.tsx) :
          un tap n'importe où, y compris sur la capture, referme donc.
          ⚠️ z-20 sous les z-30 de la fenêtre : le fond assombrit la page, il ne
          passe jamais devant ce qu'on est venu regarder. */}
      {ouverteTactile && (
        <button
          type="button"
          aria-label="Fermer l'aperçu"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOuverteTactile(false);
          }}
          className="fixed inset-0 z-20 cursor-default bg-[#1d1c16]/55 lg:hidden"
        />
      )}
      {monteeTactile && bande && (
        <FenetreApercu
          src={bande.src}
          ecrans={bande.ecrans}
          ouverte={ouverteTactile}
          tactile
          /* Centrée dans la FENÊTRE et non dans la carte : à 375 px, une
             fenêtre de 335 px posée dans une carte serait à moitié dehors. */
          position="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </li>
  );
}
