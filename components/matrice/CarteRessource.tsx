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

import Link from "next/link";
import { track } from "@vercel/analytics";
import ApercuRessource, { LIBELLE_RESULTAT, LIBELLE_TYPE } from "./ApercuRessource";
import type { ProfilId, Recommandation } from "@/lib/matrice/types";

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

  return (
    <li>
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
    </li>
  );
}
