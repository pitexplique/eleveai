"use client";

// ── LA PAGE D'ACCUEIL, REFONTE DU 23/09/2026 « façon IXL » ──────────────────
//
// Montée par app/accueil/page.tsx. Elle REMPLACE AccueilIA.tsx, SUPPRIMÉ le
// 23/09/2026 au soir : « remplace accueil par accueil 2 », puis « tu peux
// supprimer AccueilIA.tsx, on reste sur notre version ». Le verdict qui a
// tranché est celui de sa fille devant l'écran : « là on comprend de suite ».
// 👉 POUR REVENIR EN ARRIÈRE : `git show 0925f01f:app/accueil/AccueilIA.tsx`.
//
// ⚠️ CE QUE SA SUPPRESSION LAISSE SANS APPELANT — 3 379 lignes que PLUS AUCUNE
// PAGE NE MONTE, et qui sont donc relues à chaque typecheck pour rien :
//   components/matrice/EntreeMatrice.tsx      2 387
//   components/accueil/ColonneGauche.tsx        426  (seul appelant de ResumeEleve)
//   components/accueil/ResumeEleve.tsx          294
//   components/accueil/UneDeLaSemaine.tsx       195
//   app/accueil/PresentationAudio.tsx            77
// ⛔ ELLES NE SONT PAS SUPPRIMÉES ICI : Frédéric a demandé AccueilIA.tsx, pas
// la cascade. À trancher séparément.
// ⚠️ ET `lib/accueil/une.ts` N'EST PAS ORPHELIN, lui : le `PanneauLecon` plus
// bas lit toujours `UNE_COURANTE`. C'est le COMPOSANT qui ne sert plus, pas la
// donnée — ne pas les confondre en faisant le ménage.
//
// Frédéric, 23/09/2026, capture d'IXL à l'appui :
//   « header inchangé : logo + Ti Margo, au centre la barre de recherche, à
//     droite connexion inscription
//     un SVG comme dans IXL en bandeau
//     une ligne : Mathématiques Français Économie Anglais Espagnol IA
//     dès que l'élève sélectionne, il a coach IA - Évaluation - Fiche de cours -
//     Prendre en photo - Leçon du jour
//     en dessous le coach IA maths s'affiche par défaut et on enlève la barre
//     de gauche »
//   puis : « maths en présélection en 1re ligne et coach en 2e ligne ».
//
// ⛔⛔ CE QUI QUITTE L'ACCUEIL CE JOUR-LÀ — à lire avant de chercher où c'est
// passé, et avant de le « remettre » :
//   1. la COLONNE DE GAUCHE (components/accueil/ColonneGauche.tsx) : retirée sur
//      demande explicite — « tu retires la barre latérale gauche de la page
//      d'accueil ». La page prend toute la largeur, comme IXL. Avec elle part
//      l'HISTORIQUE des demandes (lib/matrice/historique.ts) : il n'a plus
//      aucun point d'affichage sur le site. Voir la note du 28/08 qui disait
//      déjà qu'une question refaite n'a pas de valeur — mais c'est une perte,
//      pas un nettoyage ;
//   2. la MATRICE D'ENTRÉE (components/matrice/EntreeMatrice.tsx, 2 387 lignes,
//      « Qui es-tu ? », les 4 profils, les 12 classes) : plus montée nulle part.
//      ⚠️ Son champ, lui, ne disparaît pas — il remonte dans l'en-tête
//      (components/Header.tsx), au centre, et c'est la MÊME recherche suggérée
//      (lib/matrice/suggestions.ts). Ce qui se perd, c'est l'ADAPTATION du texte
//      à qui lit : « Ta matière » / « La matière », le tutoiement selon le
//      profil. Les quatre audiences n'ont plus ici que quatre portes — et
//      depuis le 24/09 elles sont dans le PIED de page (voir `PIED` plus bas),
//      plus dans une rangée en haut ; ce sont des portes, pas un mode de
//      lecture ;
//   3. la BANDE « LA UNE DE LA SEMAINE » (components/accueil/UneDeLaSemaine.tsx)
//      ne s'ouvre plus d'elle-même : son contenu est l'onglet « Leçon du jour »,
//      donc à UN CLIC au lieu de zéro. ⚠️ app/sitemap.ts déclare les shorts de
//      la Une sur /accueil (`VIDEOS_UNE`) : ils sont toujours dans la page, mais
//      rendus seulement quand l'onglet est ouvert. La mesure du 28/09 sur
//      `?from=une` porte donc sur un geste plus cher qu'avant — à dire avant de
//      comparer les deux relevés.
//   ⚠️ Le code des trois reste en place, rien n'est supprimé du dépôt.
//
// ⚠️ LE <h1> DE LA PAGE LA PLUS IMPORTANTE DU SITE A CHANGÉ. C'était « Qui
// es-tu ? Que cherches-tu aujourd'hui ? » ; c'est maintenant le titre du
// bandeau, qui dit la REQUÊTE et non la marque — « Cours et exercices de maths
// corrigés » (voir `titreBandeau` dans components/accueil/matieres.ts). La
// description a suivi le même jour ; le <title>, lui, n'a pas bougé.
// À surveiller au relevé d'indexation de fin septembre.
//
// ⭐⭐ LA MESURE, ÉCRITE AVANT DE LIRE LE MOINDRE CHIFFRE (23/09/2026).
//
// ⛔ LA LIGNE DE BASE D'AVANT N'EST PLUS LISIBLE, et il faut le dire net :
// les trois taux du relevé du 14-21/09 — tape une demande 33,0 %, clique un
// profil 47,5 %, clique une carte 49,7 % — portaient sur des objets que cette
// page n'a plus (ni profils, ni cartes de ressources, ni champ au centre).
// Les comparer à quoi que ce soit d'aujourd'hui serait comparer deux écrans
// différents et appeler ça un effet.
//
// ⭐ CE QUI RESTE COMPARABLE, ET C'EST LE SEUL CHIFFRE QUI DÉCIDE :
//     départs de l'accueil ÷ ouvertures de l'accueil
// Avant, le marqueur était `?from=ia` (posé par la matrice) ; maintenant c'est
// `?from=accueil`, posé sur TOUS les liens de cette page. Les deux comptent la
// même chose — « je suis parti d'ici vers une ressource » — et tous deux
// atterrissent dans `pages_vues.source` (app/api/track/route.ts).
// ⚠️ C'est un RATIO, pas un taux : il peut dépasser 1 si quelqu'un clique deux
// liens. Ne pas l'écrire en pourcentage.
//
// ⭐ LA PRÉDICTION, POSÉE MAINTENANT POUR NE PAS ÊTRE INTERPRÉTÉE APRÈS COUP.
// Valeurs connues, France, mêmes fenêtres horaires : 0,65 (37 ouvertures) la
// semaine du 13/09, 0,88 (48 ouvertures) le 21/09.
//   • Fenêtre : du 24/09 au 30/09 inclus, 7 jours pleins, relevé le 01/10.
//   • Prédiction : ≥ 0,88. La page ouvre sur des notions CLIQUABLES sans
//     étape préalable, là où la matrice demandait de se déclarer d'abord.
//   • ⛔ Seuil de décision : sous 0,65 — c'est-à-dire sous le pire relevé
//     de l'ancienne page — la refonte coûte plus qu'elle ne rapporte, et on
//     regarde ce qui bloque avant d'ajouter quoi que ce soit.
//   ⚠️ À ce trafic (~50 ouvertures/jour en France), 7 jours donnent ~350
//     ouvertures : assez pour distinguer 0,65 de 0,88, pas pour trancher un
//     écart de 5 points. Ne pas conclure sur moins.
//
// ⭐ ET CE QUE `pages_vues` NE PEUT PAS VOIR : les clics qui ne quittent pas la
// page. D'où cinq événements Vercel, et cinq seulement — ils se paient :
//   `accueil_matiere`  {matiere, depuis}  quelle matière, et depuis laquelle
//   `accueil_action`   {matiere, action}  quel onglet de la seconde ligne
//   `accueil_classe`   {matiere, classe}  LE geste qui entre dans le coach
//   `accueil_recherche`{rang, niveau}     le champ de l'en-tête, et son tri
//   `accueil_lien`     {matiere, lien}    calcul rapide, maths réel
// ⚠️ Ils répondent à « QUOI », jamais à « combien entrent dans le coach » :
// cette question-là se lit en base, et seulement là.
//
// ⛔ LES TOPICS NE SONT PAS ÉCRITS À LA MAIN : ils viennent de NOTIONS_COACH,
// c'est-à-dire du knowledge (« tu peux te servir de ressources pour afficher
// les topics »). Zéro requête, zéro octet de plus : `notions.generated.ts` est
// déjà dans le paquet du navigateur.

import { Fragment, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bot,
  Calculator,
  Camera,
  ClipboardCheck,
  CalendarDays,
  ChevronRight,
  FileText,
  Globe,
  LineChart,
  MessagesSquare,
  PenLine,
  Sparkles,
  Zap,
} from "lucide-react";
import { track } from "@vercel/analytics";
import BandeauMatiere from "@/components/accueil/BandeauMatiere";
import DateDuJour from "@/components/accueil/DateDuJour";
import RangeeDefilante from "@/components/accueil/RangeeDefilante";
import RechercheEntete from "@/components/accueil/RechercheEntete";
import {
  actionsPour,
  MATIERES,
  TEINTES,
  matierePar,
  notionsDe,
  MATIERE_DE_LA_UNE,
  RITUELS,
  LIENS_MATIERE,
  LIEN_DANS_ACTIONS,
  PARCOURS,
  type ActionId,
  type MatiereAccueil,
  type MatiereId,
  type Niveau,
} from "@/components/accueil/matieres";
import { ficheHrefPourCoach } from "@/lib/fiches/registre";
import { UNE_COURANTE } from "@/lib/accueil/une";

/** L'identifiant du panneau, partage par les cinq onglets : un seul panneau
 *  est rendu a la fois, donc tous les `aria-controls` le designent. */
const PANNEAU_ID = "panneau-accueil";

const ICONES_MATIERE: Record<MatiereId, typeof Calculator> = {
  maths: Calculator,
  francais: PenLine,
  economie: LineChart,
  anglais: MessagesSquare,
  espagnol: Globe,
  ia: Sparkles,
};

const ICONES_ACTION: Record<ActionId, typeof Calculator> = {
  coach: Bot,
  evaluation: ClipboardCheck,
  fiche: FileText,
  photo: Camera,
  lecon: CalendarDays,
};

/* ═══ LES QUATRE AUDIENCES — DANS LE PIED, PLUS EN HAUT ══════════════
   Frédéric, 24/09 : « cette ligne je la vois jamais et elle me sert à rien »,
   puis « garde-la dans le footer ».

   ⚠️ L'ARGUMENT QUI DÉCIDE N'EST PAS « je ne la vois jamais » : c'est celui de
   l'auteur, qui connaît son site par cœur, pas celui du visiteur. C'est la
   MESURE qui tranche. La rangée coûtait 32 px, en haut d'un écran qui en
   dépensait déjà 260 avant le premier contenu — 39 % de la hauteur à 375 px.
   Et elle était la seule des quatre rangées à ne rien servir à qui vient
   travailler : les trois autres portent la matière, l'action et la recherche.

   ⛔ CE QU'IL FALLAIT VÉRIFIER AVANT DE LA RETIRER, ET CE N'ÉTAIT PAS ACQUIS :
   les quatre portes n'existaient NULLE PART ailleurs. Le menu de l'en-tête n'en
   porte aucune ; le pied commun (components/Footer.tsx) n'a que /espace-eleves
   et /espace-profs. Retirer la rangée sans rien faire d'autre aurait rendu
   /parents et /direction inatteignables depuis l'accueil.
   -> Les quatre sont donc dans `PIED`, plus bas. C'est aussi ce que fait IXL :
   ses portes d'audience vivent dans le menu et le pied, jamais dans le contenu.

   ⚠️ L'événement `accueil_audience` disparaît avec la rangée : un lien de pied
   de page se mesure comme les autres, par `?from=accueil` dans `pages_vues`. */

/* ═══ LA LIGNE DES MATIÈRES ═══════════════════════════════════════════════
   L'icône au-dessus du mot, le soulignement sous celle qui est ouverte : c'est
   la construction d'IXL, et elle a une qualité que les pastilles n'ont pas —
   on voit d'un coup TOUT ce que le site sait faire, sans avoir à cliquer.
   ⚠️ `overflow-x-auto` : à 360 px les six mots font 620 px. On fait défiler
   plutôt que de replier sur deux lignes — replié, le bandeau descend sous le
   pli et la page s'ouvre sur du vide.

   ⛔⛔ `[justify-content:safe_center]` ET PAS `justify-center`, sur les TROIS
   lignes de cette page. Le défaut est le même que celui vu à 375 px sur la
   ligne des audiences, et il est contre-intuitif : dans un conteneur qui
   défile, un contenu CENTRÉ qui déborde sort des DEUX côtés — et la moitié de
   gauche passe en coordonnée négative, hors d'atteinte du défilement. Mesuré à
   1 009 px après l'ajout de « Calcul rapide » et « Maths Réel » : le libellé
   « MATHÉMATIQUES : » était coupé et rien ne permettait de le ramener.
   Le mot-clé `safe` dit au navigateur de retomber sur `start` dès que ça
   déborde : centré quand ça tient, aligné à gauche quand ça ne tient pas. */
function LigneMatieres({
  actif,
  choisir,
}: {
  actif: MatiereId;
  choisir: (m: MatiereId) => void;
}) {
  return (
    <div className="border-b border-slate-200 bg-white">
      {/* ⭐ UNE NAVIGATION, PAS UN `tablist` — et la distinction n'est pas
          cosmétique. Cliquer une matière change TOUT l'écran : le bandeau, le
          panneau, et jusqu'aux onglets de la ligne du dessous. C'est un
          changement de sujet, que `aria-current="page"` décrit exactement.
          La ligne des ACTIONS, elle, ne change qu'un panneau : c'est elle qui
          est un vrai `tablist` (voir plus bas). Étiqueter les deux pareil
          aurait annoncé deux jeux d'onglets imbriqués, ce qui n'est pas ce que
          la page fait. */}
      <RangeeDefilante
        role="navigation"
        aria-label="Matières"
        fond="from-white"
        className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 sm:[justify-content:safe_center] sm:gap-2 sm:px-4"
      >
        {MATIERES.map((m) => {
          const Icone = ICONES_MATIERE[m.id];
          const ouvert = m.id === actif;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => choisir(m.id)}
              aria-current={ouvert ? "page" : undefined}
              className={[
                "relative flex shrink-0 flex-col items-center gap-1 px-3 py-2.5 text-sm font-semibold transition sm:px-5",
                ouvert
                  ? "text-teal-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              ].join(" ")}
            >
              <Icone className="h-5 w-5" strokeWidth={ouvert ? 2.4 : 1.9} aria-hidden="true" />
              <span className="whitespace-nowrap">{m.label}</span>
              {ouvert && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-2 bottom-0 h-[3px] rounded-t bg-teal-600"
                />
              )}
            </button>
          );
        })}
      </RangeeDefilante>
    </div>
  );
}

/* ═══ LA SECONDE LIGNE — UN VRAI `tablist` ════════════════════════════════
   Elle n'apparaît QU'UNE FOIS la matière choisie — et comme les maths sont
   présélectionnées, elle est là dès l'ouverture, sur « Coach ».
   ⛔ Elle ne quitte pas la page : elle change le panneau du dessous.

   ⭐ 23/09/2026 — LE MOTIF ARIA, ET POURQUOI IL FALLAIT LE POSER. Ces boutons
   pilotaient le panneau sans le DIRE : à la souris on voyait le lien de cause à
   effet, au clavier et au lecteur d'écran on entendait « bouton Évaluation »,
   puis plus rien — le contenu changeait 300 px plus bas, hors du champ
   d'attention. `tablist` / `tab` / `tabpanel` est exactement la description de
   ce que la ligne fait, et il apporte trois choses d'un coup : l'onglet ouvert
   est annoncé (`aria-selected`), le lien onglet → panneau est déclaré
   (`aria-controls`), et les flèches ← → parcourent les onglets sans sortir de
   la rangée. C'est le motif que tout le monde connaît sans l'avoir appris.
   ⚠️ Cet écran est PROJETÉ EN CLASSE (voir la note du principe fondateur) :
   une page qu'on pilote au clavier depuis le bureau du professeur vaut mieux
   qu'une page où il faut viser une pastille à la souris devant trente élèves.

   ⛔ LE ROVING TABINDEX EST LA PARTIE QU'ON OUBLIE : un seul onglet est dans
   l'ordre de tabulation (`tabIndex=0`, celui qui est ouvert), les autres en
   sont retirés (`-1`). Sans ça, la touche Tab traverse les cinq onglets un par
   un avant d'atteindre le contenu — c'est précisément ce que le motif existe
   pour éviter.

   ⛔ LE LIBELLÉ « MATHÉMATIQUES : » EST PARTI, et pour trois raisons qui vont
   dans le même sens : il répétait la matière soulignée juste au-dessus, il
   coûtait ~140 px (c'est lui qui faisait déborder la rangée à 1 009 px), et un
   élément qui n'est pas un onglet n'a rien à faire dans un `tablist`.
   Ce qu'il disait est passé dans l'`aria-label` de la rangée, où il sert
   vraiment à quelqu'un. */
function LigneActions({
  matiere,
  actif,
  choisir,
}: {
  matiere: MatiereAccueil;
  actif: ActionId;
  choisir: (a: ActionId) => void;
}) {
  const tablist = useRef<HTMLDivElement>(null);
  // ⭐ LA LISTE EST PROPRE À LA MATIÈRE (24/09/2026) : le cinquième onglet
  // s'appelle « Leçon du jour » là où il y a une Une, « Rituels » là où il y a
  // des rituels, et il n'existe pas là où il n'y a ni l'un ni l'autre.
  // ⚠️ TOUT ce qui parcourt les onglets doit passer par `actions`, jamais par
  // `ACTIONS` : sinon les flèches du clavier visent un onglet qui n'est pas
  // affiché, et le focus part dans le vide sans que rien ne le signale.
  const actions = actionsPour(matiere);

  function auClavier(e: React.KeyboardEvent<HTMLDivElement>) {
    const touches = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!touches.includes(e.key)) return;
    e.preventDefault();
    const i = actions.findIndex((a) => a.id === actif);
    const dernier = actions.length - 1;
    // ⚠️ Les flèches BOUCLENT (dernier → premier) : c'est ce que prescrit le
    // motif, et ce que fait tout jeu d'onglets. Sans la boucle, la flèche
    // droite « ne marche plus » sur le dernier onglet, et on croit à une panne.
    const j =
      e.key === "ArrowRight" ? (i + 1) % actions.length
      : e.key === "ArrowLeft" ? (i - 1 + actions.length) % actions.length
      : e.key === "Home" ? 0
      : dernier;
    choisir(actions[j].id);
    // Le focus SUIT la sélection — sinon le lecteur d'écran annonce un onglet
    // et en ouvre un autre.
    const boutons = tablist.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    boutons?.[j]?.focus();
  }

  return (
    <div className="border-b border-slate-200 bg-slate-50">
      {/* ⚠️ `max-w-7xl` ici, pas `6xl` : avec « Automatismes » (24/09/2026), la
          ligne demande 1 184 px et le plafond de 6xl n'en laissait que 1 152 —
          « Maths Réel » passait sous le bord sur un écran de 1 280. */}
      <RangeeDefilante
        fond="from-slate-50"
        className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-2 sm:[justify-content:safe_center] sm:px-4"
      >
        <div
          ref={tablist}
          role="tablist"
          aria-label={`Ce qu'on peut faire en ${matiere.label}`}
          onKeyDown={auClavier}
          className="flex shrink-0 items-center gap-1"
        >
          {actions.map((a) => {
            const Icone = ICONES_ACTION[a.id];
            const ouvert = a.id === actif;
            // ⚠️ Un LIEN au milieu des onglets (Frédéric, 24/09 : « met
            // automatisme après fiche cours »). Il navigue, il n'ouvre pas de
            // panneau : `role="presentation"` sur son enveloppe le sort de la
            // liste d'onglets pour les lecteurs d'écran, et les flèches du
            // clavier (`auClavier`) ne passent que par `actions` — il ne casse
            // donc pas la navigation entre onglets.
            // ⭐ LA PLACE DU LIEN SE LIT DANS LA DONNÉE, plus dans ce JSX : le
            // champ `apres` dit après quel onglet il se glisse. Frédéric a
            // changé d'avis deux fois le 24/09 ; la seconde fois n'a coûté
            // qu'un mot dans matieres.ts.
            const liens = (LIEN_DANS_ACTIONS[matiere.id] ?? []).filter((l) => l.apres === a.id);
            return (
              <Fragment key={a.id}>
              <button
                type="button"
                role="tab"
                id={`onglet-${a.id}`}
                aria-selected={ouvert}
                aria-controls={PANNEAU_ID}
                tabIndex={ouvert ? 0 : -1}
                onClick={() => choisir(a.id)}
                className={[
                  "my-1.5 flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition sm:px-4",
                  ouvert
                    ? "bg-teal-700 text-white shadow-sm"
                    : "text-slate-700 hover:bg-white hover:text-slate-900",
                ].join(" ")}
              >
                <Icone className="h-4 w-4" aria-hidden="true" />
                <span className="hidden whitespace-nowrap sm:inline">{a.label}</span>
                <span className="whitespace-nowrap sm:hidden">{a.court}</span>
              </button>
              {liens.map((lien) => (
                <span key={lien.href} role="presentation" className="flex shrink-0">
                  <Link
                    prefetch={false}
                    href={`${lien.href}?from=accueil`}
                    onClick={() => track("accueil_lien", { matiere: matiere.id, lien: lien.label })}
                    className="my-1.5 flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-teal-700 sm:px-4"
                  >
                    <Zap className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden whitespace-nowrap sm:inline">{lien.label}</span>
                    <span className="whitespace-nowrap sm:hidden">{lien.court}</span>
                  </Link>
                </span>
              ))}
              </Fragment>
            );
          })}
        </div>

        {/* Le filet, puis les entrées qui QUITTENT la page — la fin de la ligne
            de matières d'IXL, à l'identique. Voir `LIENS_MATIERE`.
            ⚠️ HORS DU `tablist` : ce ne sont pas des onglets, ils naviguent. */}
        {(LIENS_MATIERE[matiere.id] ?? []).length > 0 && (
          <span
            aria-hidden="true"
            className="mx-1 h-5 w-px shrink-0 self-center bg-slate-300"
          />
        )}
        {(LIENS_MATIERE[matiere.id] ?? []).map((l) => (
          <Link
            prefetch={false}
            key={l.href}
            href={`${l.href}?from=accueil`}
            onClick={() => track("accueil_lien", { matiere: matiere.id, lien: l.label })}
            className="my-1.5 flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-teal-700 sm:px-4"
          >
            <Zap className="h-4 w-4" aria-hidden="true" />
            <span className="hidden whitespace-nowrap sm:inline">{l.label}</span>
            <span className="whitespace-nowrap sm:hidden">{l.court}</span>
          </Link>
        ))}
      </RangeeDefilante>
    </div>
  );
}

/* ═══ LA CARTE D'UN NIVEAU ════════════════════════════════════════════════
   La pastille colorée à gauche, le nom, la ligne « Comprend : … », le bouton
   à droite. C'est la carte « Pre-K / Kindergarten / First grade » d'IXL, avec
   nos classes et nos notions.
   ⚠️ La ligne « Comprend » est TRONQUÉE à six notions. Les 86 de STMG
   rempliraient l'écran d'un bloc gris illisible : ce qu'on montre est un
   échantillon, et le bouton dit combien il y en a en tout. */
function CarteNiveau({
  niveau,
  teinte,
  notions,
  href,
  verbe,
  pister,
}: {
  niveau: Niveau;
  teinte: (typeof TEINTES)[number];
  notions: string[];
  href: string;
  verbe: string;
  /** Appele au clic du bouton. C'est LE geste qui fait entrer dans le coach —
   *  celui qu'on mesure. */
  pister?: () => void;
}) {
  /* ⭐ TOUTE LA CARTE EST UN LIEN (07/10/2026). Frédéric : « on a envie de
     cliquer sur toute la ligne, or le clic ne fonctionne que sur Voir les
     notions », puis « il faut que toute la ligne soit cliquable, même
     l'intérieur ».
     ⛔ PAS DE `::after` ÉTIRÉ SUR LE BOUTON — essayé le même jour, il ratait un
     clic sur deux : le `hover:brightness-110` du bouton est un `filter`, et un
     filtre fait du bouton le bloc conteneur de son `::after`. Au survol, la
     zone de clic se rétractait à la taille du bouton, la souris n'était plus
     dessus, et le clic tombait sur la carte. Un seul `<Link>` qui EST la
     carte n'a pas ce piège. */
  const cliquable = notions.length > 0;
  const classes =
    "group flex overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md";
  const corps = (
    <>
      <div
        className={`flex w-16 shrink-0 items-center justify-center px-1 text-center text-sm font-black leading-tight text-white sm:w-20 ${teinte.chip}`}
      >
        {niveau.label}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">
            {niveau.nom}
            {niveau.sous && (
              <span className="ml-2 text-xs font-medium text-slate-500">{niveau.sous}</span>
            )}
          </h3>
          {cliquable ? (
            <p className="mt-0.5 text-sm leading-snug text-slate-600">
              <span className="font-semibold text-slate-500">Comprend : </span>
              {notions.map((n, i) => (
                <span key={n}>
                  {i > 0 && <span className="px-1 text-slate-300">|</span>}
                  {n}
                </span>
              ))}
            </p>
          ) : (
            /* ⛔ ON NE PROMET PAS CE QUI N'EST PAS ÉCRIT. Un niveau sans notion
               le dit — c'est la règle de la Une (« pas de feuille, pas de
               bouton »), appliquée ici. */
            <p className="mt-0.5 text-sm text-slate-500">Pas encore de notion à ce niveau.</p>
          )}
        </div>

        {/* Le « bouton » n'est plus qu'une étiquette : c'est la carte entière
            qui navigue. Il s'éclaircit quand on survole N'IMPORTE OÙ sur elle. */}
        {cliquable && (
          <span
            className={`inline-flex shrink-0 items-center gap-1 self-start rounded-lg px-3 py-2 text-sm font-bold text-white shadow-sm transition group-hover:brightness-110 sm:self-center ${teinte.chip}`}
          >
            {verbe}
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </span>
        )}
      </div>
    </>
  );

  if (!cliquable) return <article className={classes}>{corps}</article>;
  return (
    <Link
      prefetch={false}
      href={href}
      onClick={pister}
      aria-label={`${niveau.nom} : ${verbe}`}
      className={`${classes} hover:bg-slate-50`}
    >
      {corps}
    </Link>
  );
}

/* ═══ LES CLASSES RANGÉES PAR CYCLE, FAÇON IXL (07/10/2026) ═══════════════
   Frédéric : « on pourrait pas faire lycée : terminale etc, collège : 3e,
   primaire, et résumé à l'intérieur de chaque bloc », capture d'IXL à
   l'appui (Pre-K / Kindergarten / First grade), puis « 3 colonnes c'est bien,
   lisible ».
   ⭐ UNE CARTE = UNE CLASSE DE LA MATIÈRE CHOISIE EN HAUT. Frédéric : « en haut
   on clique sur la matière » — la carte ne répète donc pas les autres
   matières, et elle reste UN SEUL lien, cliquable partout (sa demande du même
   jour : « toute la ligne cliquable, même l'intérieur »).
   ⚠️ L'ORDRE DANS UN CYCLE RESTE DÉCROISSANT (Term → 2de, 3e → 6e, CM2 → CP) :
   c'est sa décision du 13/09, rappelée en tête de matieres.ts.
   ⛔ AUCUN `filter` sur un enfant de la carte qui contiendrait la zone de
   clic : c'est ce qui faisait rater un clic sur deux sur l'ancienne carte. */
/** Les matières rangées par CLASSE. Les langues et l'économie vont par palier
 *  CECRL, l'IA par référentiel Pix : elles gardent leur liste. */
const MATIERES_PAR_CLASSE: MatiereId[] = ["maths", "francais"];

/* ⭐ LES COULEURS (07/10/2026). Frédéric : « ça manque de couleurs », puis
   « pour chaque niveau tu choisis 3 couleurs, lycée collège primaire, puis 4
   couleurs secondaires ». Une couleur PRINCIPALE par cycle (le bandeau du
   titre : vert d'eau, violet, orange), et 4 SECONDAIRES de la même famille
   qui alternent sur ses cartes — chaque classe a sa teinte, comme chez IXL,
   sans que le cycle se perde.
   ⚠️ Les classes Tailwind sont écrites EN ENTIER (`bg-teal-500`) : un nom
   construit dans le JSX ne serait pas vu par Tailwind, la carte sortirait
   blanche. */
type Teinte = { pastille: string; fond: string; bord: string; texte: string; bouton: string };

const CYCLES: {
  id: string;
  titre: string;
  niveaux: string[];
  pastille: string;
  bord: string;
  texte: string;
  /** Les 4 couleurs SECONDAIRES des cartes du cycle, de la même famille que
   *  sa couleur principale. */
  cartes: Teinte[];
}[] = [
  {
    id: "lycee",
    titre: "Lycée",
    niveaux: ["terminale-spe", "premiere-spe", "premiere", "seconde", "stmg"],
    pastille: "bg-teal-600",
    bord: "border-teal-300 hover:border-teal-500",
    texte: "text-teal-700",
    cartes: [{ pastille: "bg-teal-500", fond: "bg-teal-50", bord: "border-teal-300 hover:border-teal-500", texte: "text-teal-700", bouton: "bg-teal-600" }, { pastille: "bg-emerald-500", fond: "bg-emerald-50", bord: "border-emerald-300 hover:border-emerald-500", texte: "text-emerald-700", bouton: "bg-emerald-600" }, { pastille: "bg-cyan-500", fond: "bg-cyan-50", bord: "border-cyan-300 hover:border-cyan-500", texte: "text-cyan-700", bouton: "bg-cyan-600" }, { pastille: "bg-sky-500", fond: "bg-sky-50", bord: "border-sky-300 hover:border-sky-500", texte: "text-sky-700", bouton: "bg-sky-500" }],
  },
  {
    id: "college",
    titre: "Collège",
    niveaux: ["3e", "4e", "5e", "6e"],
    pastille: "bg-violet-600",
    bord: "border-violet-300 hover:border-violet-500",
    texte: "text-violet-700",
    cartes: [{ pastille: "bg-violet-500", fond: "bg-violet-50", bord: "border-violet-300 hover:border-violet-500", texte: "text-violet-700", bouton: "bg-violet-500" }, { pastille: "bg-purple-500", fond: "bg-purple-50", bord: "border-purple-300 hover:border-purple-500", texte: "text-purple-700", bouton: "bg-purple-500" }, { pastille: "bg-fuchsia-500", fond: "bg-fuchsia-50", bord: "border-fuchsia-300 hover:border-fuchsia-500", texte: "text-fuchsia-700", bouton: "bg-fuchsia-500" }, { pastille: "bg-indigo-500", fond: "bg-indigo-50", bord: "border-indigo-300 hover:border-indigo-500", texte: "text-indigo-700", bouton: "bg-indigo-500" }],
  },
  {
    id: "primaire",
    titre: "Primaire",
    niveaux: ["cm2", "cm1", "ce2", "ce1", "cp"],
    pastille: "bg-orange-500",
    bord: "border-orange-300 hover:border-orange-500",
    texte: "text-orange-700",
    cartes: [{ pastille: "bg-orange-500", fond: "bg-orange-50", bord: "border-orange-300 hover:border-orange-500", texte: "text-orange-700", bouton: "bg-orange-500" }, { pastille: "bg-amber-500", fond: "bg-amber-50", bord: "border-amber-300 hover:border-amber-500", texte: "text-amber-800", bouton: "bg-amber-500" }, { pastille: "bg-rose-500", fond: "bg-rose-50", bord: "border-rose-300 hover:border-rose-500", texte: "text-rose-700", bouton: "bg-rose-500" }, { pastille: "bg-red-500", fond: "bg-red-50", bord: "border-red-300 hover:border-red-500", texte: "text-red-700", bouton: "bg-red-500" }],
  },
  {
    id: "autres",
    titre: "Et aussi",
    niveaux: ["adulte"],
    pastille: "bg-sky-600",
    bord: "border-sky-300 hover:border-sky-500",
    texte: "text-sky-700",
    cartes: [{ pastille: "bg-sky-500", fond: "bg-sky-50", bord: "border-sky-300 hover:border-sky-500", texte: "text-sky-700", bouton: "bg-sky-500" }],
  },
];

function PanneauCycles({ matiere }: { matiere: MatiereAccueil }) {
  const blocs = useMemo(
    () =>
      CYCLES.map((cycle) => ({
        cycle,
        cartes: cycle.niveaux
          .map((id) => {
            const niveau = matiere.niveaux.find((n) => n.id === id);
            if (!niveau) return null;
            const notions = notionsDe(matiere.cle, id);
            return {
              niveau,
              total: notions.length,
              // Le résumé est tiré du coach, jamais écrit à la main : il
              // vieillirait dès qu'une notion y entre.
              // Une phrase, donc une minuscule après la virgule — sauf un sigle
              // (« PGCD »), qu'on reconnaît à sa deuxième lettre capitale.
              resume: notions
                .slice(0, 4)
                .map((n, i) =>
                  i > 0 && /^\p{Lu}\p{Ll}/u.test(n.label)
                    ? n.label[0].toLowerCase() + n.label.slice(1)
                    : n.label,
                ),
            };
          })
          .filter((c): c is NonNullable<typeof c> => c !== null),
      })).filter((b) => b.cartes.length > 0),
    [matiere],
  );

  return (
    <div className="space-y-8">
      {blocs.map(({ cycle, cartes }) => (
        <section key={cycle.id} aria-labelledby={`cycle-${cycle.id}`}>
          <h2
            id={`cycle-${cycle.id}`}
            className="mb-3 flex items-center gap-3"
          >
            <span
              className={`rounded-full px-4 py-1 text-base font-black uppercase tracking-wide text-white shadow-sm ${cycle.pastille}`}
            >
              {cycle.titre}
            </span>
            <span aria-hidden="true" className={`h-1 flex-1 rounded-full opacity-30 ${cycle.pastille}`} />
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cartes.map(({ niveau, total, resume }, i) => {
              const c = cycle.cartes[i % cycle.cartes.length];
              const contenu = (
                <>
                  <h3 className="flex items-center gap-3">
                    <span
                      className={`flex h-9 min-w-9 shrink-0 items-center justify-center rounded-full px-2 text-sm font-black text-white shadow-sm ${c.pastille}`}
                    >
                      {niveau.label}
                    </span>
                    <span className={`min-w-0 text-xl font-bold leading-tight ${c.texte}`}>
                      {niveau.nom}
                      {niveau.sous && (
                        <span className="block text-xs font-medium text-slate-500">
                          {niveau.sous}
                        </span>
                      )}
                    </span>
                  </h3>
                  {total > 0 ? (
                    <>
                      <p className="mt-2 flex-1 text-sm leading-snug text-slate-700">
                        {resume.join(", ")}, et plus encore.
                      </p>
                      <p
                        className="mt-3 flex justify-end"
                      >
                        <span
                          className={`inline-flex items-center gap-0.5 rounded-lg px-3 py-1.5 text-sm font-bold text-white shadow-sm transition group-hover:brightness-110 ${c.bouton}`}
                        >
                          Voir les {total} notions
                          <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </p>
                    </>
                  ) : (
                    /* ⛔ ON NE PROMET PAS CE QUI N'EST PAS ÉCRIT. */
                    <p className="mt-2 text-sm text-slate-500">Pas encore de notion à ce niveau.</p>
                  )}
                </>
              );
              const classes = `group flex flex-col rounded-xl border-2 p-4 shadow-sm transition ${c.fond} ${c.bord}`;
              if (total === 0)
                return (
                  <article key={niveau.id} className={classes}>
                    {contenu}
                  </article>
                );
              return (
                <Link
                  key={niveau.id}
                  prefetch={false}
                  href={`/coach-ia/${matiere.slug}?classe=${niveau.id}&from=accueil`}
                  onClick={() => track("accueil_classe", { matiere: matiere.id, classe: niveau.id })}
                  className={`${classes} hover:-translate-y-0.5 hover:shadow-md`}
                >
                  {contenu}
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

/* ═══ LE PANNEAU « COACH IA » — celui qui s'ouvre par défaut ══════════════ */
function PanneauCoach({ matiere }: { matiere: MatiereAccueil }) {
  // Les matières rangées par CLASSE passent par les cycles ; les langues,
  // l'économie et l'IA (paliers A1 → B2, référentiel Pix) gardent leur liste.
  if (MATIERES_PAR_CLASSE.includes(matiere.id)) return <PanneauCycles matiere={matiere} />;
  return <PanneauListe matiere={matiere} />;
}

function PanneauListe({ matiere }: { matiere: MatiereAccueil }) {
  const lignes = useMemo(
    () =>
      matiere.niveaux.map((niveau) => {
        const notions = notionsDe(matiere.cle, niveau.id);
        return {
          niveau,
          total: notions.length,
          apercu: notions.slice(0, 6).map((n) => n.label),
        };
      }),
    [matiere],
  );

  return (
    <div className="space-y-3">
      {lignes.map(({ niveau, total, apercu }, i) => (
        <CarteNiveau
          key={niveau.id}
          niveau={niveau}
          teinte={TEINTES[i % TEINTES.length]}
          notions={apercu}
          href={`/coach-ia/${matiere.slug}?classe=${niveau.id}&from=accueil`}
          verbe={`Voir les ${total} notions`}
          pister={() =>
            track("accueil_classe", { matiere: matiere.id, classe: niveau.id })
          }
        />
      ))}
    </div>
  );
}

/* ═══ LE PANNEAU « FICHE DE COURS » ═══════════════════════════════════════
   Les fiches n'existent pas partout (146 en maths, 148 en français, 16 en IA).
   On n'affiche donc que les notions QUI ONT une fiche, et on le dit quand il
   n'y en a aucune. */
function PanneauFiches({ matiere }: { matiere: MatiereAccueil }) {
  const lignes = useMemo(
    () =>
      matiere.niveaux.map((niveau) => ({
        niveau,
        fiches: notionsDe(matiere.cle, niveau.id)
          .map((n) => ({ label: n.label, href: ficheHrefPourCoach(matiere.cle, niveau.id, n.id) }))
          .filter((f): f is { label: string; href: string } => Boolean(f.href)),
      })),
    [matiere],
  );

  const total = lignes.reduce((s, l) => s + l.fiches.length, 0);

  if (total === 0) {
    return (
      <p className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
        Les fiches de cours de cette matière ne sont pas encore écrites. Le coach, lui,
        couvre déjà le programme : sa liste est dans l&rsquo;onglet « Coach ».
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {lignes.map(({ niveau, fiches }, i) => {
        const teinte = TEINTES[i % TEINTES.length];
        if (fiches.length === 0) return null;
        return (
          <article
            key={niveau.id}
            className="flex overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <div
              className={`flex w-16 shrink-0 items-center justify-center px-1 text-center text-sm font-black leading-tight text-white sm:w-20 ${teinte.chip}`}
            >
              {niveau.label}
            </div>
            <div className="min-w-0 flex-1 p-3 sm:p-4">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                {niveau.nom}
                <span className="ml-2 text-xs font-medium text-slate-500">
                  {fiches.length} fiche{fiches.length > 1 ? "s" : ""}
                </span>
              </h3>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {fiches.map((f) => (
                  <li key={f.href}>
                    <Link
                      prefetch={false}
                      href={`${f.href}?from=accueil`}
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold transition hover:bg-white ${teinte.bord} ${teinte.clair} ${teinte.texte}`}
                    >
                      {f.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* ═══ LES TROIS AUTRES PANNEAUX ═══════════════════════════════════════════ */

function Carte({
  href,
  titre,
  texte,
  Icone,
}: {
  href: string;
  titre: string;
  texte: string;
  Icone: typeof Calculator;
}) {
  return (
    <Link
      prefetch={false}
      href={href}
      className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-300 hover:shadow-md"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
        <Icone className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block font-bold text-slate-900">{titre}</span>
        <span className="mt-0.5 block text-sm leading-snug text-slate-600">{texte}</span>
      </span>
    </Link>
  );
}

/* ⛔ CHAQUE CARTE EST PROPRE À SA MATIÈRE. La version d'avant proposait le
   brevet et le bac de spécialité même en espagnol : ce sont des entraînements
   de MATHS (voir leur place dans le menu « Maths » de l'en-tête). Une carte qui
   ne concerne pas la matière ouverte n'est pas une suggestion, c'est une
   erreur d'aiguillage — celle-là même que Frédéric vient de signaler. */
function PanneauEvaluation({ matiere }: { matiere: MatiereAccueil }) {
  const parcours = PARCOURS[matiere.id];
  // Les quatre épreuves blanches n'existent qu'en maths et en français (6e et
  // 4e). Les proposer ailleurs enverrait sur une épreuve d'une autre matière.
  const evalNationale = matiere.id === "maths" || matiere.id === "francais";
  const examensMaths = matiere.id === "maths";
  // ⚠️ « IA » ne se met pas en minuscules — c'est un sigle, pas un mot.
  const enMatiere = matiere.id === "ia" ? "IA" : matiere.label.toLowerCase();

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {parcours ? (
        /* ⭐ 29/09/2026 — en maths, Frédéric : « mettre simplement Évaluation
           suivant les chapitres ». La page /parcours laisse désormais cocher
           les notions (un chapitre, plusieurs, ou tout), comme les
           automatismes. Les autres matières gardent la série de l'année. */
        examensMaths ? (
          <Carte
            href={`${parcours}?from=accueil`}
            titre="Évaluation par chapitres"
            texte="Choisis ta classe, coche un chapitre, plusieurs ou tout le programme : les questions viennent du coach, la correction suit."
            Icone={ClipboardCheck}
          />
        ) : (
          <Carte
            href={`${parcours}?from=accueil`}
            titre={`Évaluation annuelle — ${enMatiere}`}
            texte="Une série qui balaie le programme de l'année et dit ce qui tient, et ce qui ne tient pas encore."
            Icone={ClipboardCheck}
          />
        )
      ) : (
        <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 sm:col-span-2">
          Pas encore d&rsquo;évaluation annuelle en {matiere.label}. Ce qui existe
          aujourd&rsquo;hui, ce sont les séries du coach — l&rsquo;onglet « Coach ».
        </p>
      )}
      {evalNationale && (
        <Carte
          href="/evaluation-nationale-college?from=accueil"
          titre="Évaluations nationales"
          texte="Les épreuves de 6e et de 4e, dans leur format réel, avec la correction expliquée."
          Icone={ClipboardCheck}
        />
      )}
      {examensMaths && (
        <>
          {/* 24/09/2026 — la première partie du DNB et de l'EAM : des séries
              chronométrées, à part du coach (Frédéric : « on fait comme
              parcours »). */}
          <Carte
            href="/automatismes-maths?from=accueil"
            titre="Automatismes"
            texte="Le brevet et l'épreuve anticipée de première : des questions courtes, sans calculatrice, toujours nouvelles."
            Icone={ClipboardCheck}
          />
          <Carte
            href="/coach-brevet?from=accueil"
            titre="Brevet"
            texte="Les exercices du brevet, notion par notion, corrigés pas à pas."
            Icone={ClipboardCheck}
          />
          <Carte
            href="/coach-bac-spe?from=accueil"
            titre="Bac — spécialité"
            texte="L'entraînement du bac, sur les notions de première et de terminale."
            Icone={ClipboardCheck}
          />
        </>
      )}
    </div>
  );
}

function PanneauPhoto() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Carte
        href="/photo-exercice?from=accueil"
        titre="Photographier un exercice"
        texte="Une photo de l'énoncé, et le site ouvre la série du coach qui correspond — pas la réponse toute faite."
        Icone={Camera}
      />
      <Carte
        href="/photo-cours?from=accueil"
        titre="Photographier une leçon"
        texte="Une photo du cahier, et on retrouve la fiche de cours et les exercices de la même notion."
        Icone={Camera}
      />
    </div>
  );
}

/* ═══ LE PANNEAU « LEÇON DU JOUR » ════════════════════════════════════════
   ⛔ LE DÉFAUT QUE FRÉDÉRIC A VU LE 23/09, ET IL ÉTAIT RÉEL : « la leçon du
   jour n'est que pour les mathématiques — par contre tu peux rajouter des
   rituels, style dictée de la semaine, lorsqu'on clique sur français ».
   La Une est en maths cette semaine ; un élève qui cliquait « Français » puis
   « Leçon du jour » tombait sur des fractions. Le panneau promettait une chose
   par matière et en servait une seule.

   La sortie : chaque matière montre SES rituels (voir `RITUELS`), et la Une —
   qui est la leçon du jour au sens propre — ne s'affiche que là où elle est
   vraie, c'est-à-dire en maths. ⚠️ La diapositive « primaire » de la Une est
   souvent une lettre en cursive, donc du français : elle reste avec les autres
   plutôt que d'être déplacée, parce que la Une se range par CYCLE (lycée,
   collège, primaire) et pas par matière — les découper serait réécrire une.ts
   pour un cas. */
function PanneauLecon({ matiere }: { matiere: MatiereAccueil }) {
  const rituels = RITUELS[matiere.id] ?? [];
  const montreLaUne = matiere.id === MATIERE_DE_LA_UNE && Boolean(UNE_COURANTE);

  return (
    <div className="space-y-6">
      {/* ⭐ LA UNE PASSE DEVANT LES RITUELS (24/09/2026), et c'est la suite
          logique du renommage de l'onglet : là où il s'appelle « Leçon du
          jour », la leçon du jour doit être la première chose qu'on voit.
          Elle était sous les rituels depuis la veille — l'onglet promettait une
          chose et en servait une autre, en dessous du pli sur téléphone. */}
      {montreLaUne && <LaUne />}

      {rituels.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">
            Les rituels — quelque chose de neuf chaque matin
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rituels.map((r) => (
              <Carte
                key={r.href}
                href={`${r.href}?from=accueil`}
                titre={r.titre}
                texte={r.texte}
                Icone={CalendarDays}
              />
            ))}
          </div>
        </section>
      )}

      {/* ⛔ LE MESSAGE « Pas encore de rituel quotidien en … » EST PARTI, et ce
          n'est pas un oubli : il est devenu INATTEIGNABLE le 24/09. L'onglet
          n'existe plus pour une matière sans Une ni rituel (voir `actionsPour`
          dans matieres.ts), donc ce panneau n'est plus jamais rendu vide.
          Un onglet qui ne sert qu'à s'excuser de n'avoir rien coûtait un clic
          pour rien ; mieux vaut ne pas le proposer.
          ⚠️ Si `actionsPour` change un jour, rétablir un repli ici : un panneau
          qui se rend vide est pire qu'un panneau qui explique. */}
    </div>
  );
}

function LaUne() {
  if (!UNE_COURANTE) return null;
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
        {/* ⭐ LA DATE SE CALCULE, ELLE NE SE RETAPE PLUS (24/09/2026).
            `UNE_COURANTE.jour` reste le REPLI — la valeur du premier rendu, la
            même côté serveur et côté client, donc aucune erreur d'hydratation.
            Le navigateur la remplace ensuite par la vraie date du visiteur.
            ⚠️ Le champ `jour` de une.ts garde donc son rôle d'origine : dire
            quand la Une a CHANGÉ. C'est l'affichage qui ne le lit plus comme
            « aujourd'hui ». Voir components/accueil/DateDuJour.tsx. */}
        La leçon du jour · <DateDuJour repli={UNE_COURANTE.jour} />
      </h2>
      <div className="grid gap-3 lg:grid-cols-3">
        {UNE_COURANTE.diapos.map((d) => (
          <article
            key={d.cycle}
            className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="flex gap-3 p-3">
              <Image
                src={d.short.vignette}
                alt=""
                width={216}
                height={384}
                sizes="72px"
                className="h-24 w-[54px] shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0">
                <span className="inline-flex rounded-full bg-teal-50 px-2 py-0.5 text-xs font-bold text-teal-700">
                  {d.onglet}
                </span>
                <p className="mt-1 text-sm font-semibold leading-snug text-slate-900">
                  {d.accroche}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{d.notion}</p>
              </div>
            </div>
            <div className="mt-auto flex flex-wrap gap-1.5 border-t border-slate-100 p-3">
              <a
                href={`https://www.youtube.com/shorts/${d.short.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-slate-700"
              >
                Voir le short
              </a>
              {d.liens.map((l) => (
                <Link
                  prefetch={false}
                  key={l.href}
                  href={l.href}
                  className="inline-flex rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  {l.court}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ═══ LA PAGE ═════════════════════════════════════════════════════════════ */

const PIED = [
  { label: "Comment ça marche", href: "/pourquoi-eleveai" },
  // ⭐ LES QUATRE PORTES D'AUDIENCE (24/09/2026), descendues de la rangée du
  // haut. ⛔ NE PAS EN RETIRER : ce pied est le SEUL endroit du site d'où
  // /parents et /direction sont atteignables — ni le menu de l'en-tête ni le
  // pied commun ne les portent.
  { label: "Élèves", href: "/espace-eleves" },
  { label: "Enseignants", href: "/espace-profs" },
  { label: "Parents", href: "/parents" },
  { label: "Chef d'établissement", href: "/direction" },
  { label: "Fiches de cours", href: "/fiches-cours" },
  { label: "Fiches d'exercices", href: "/fiches-exercices" },
  { label: "Toutes les ressources", href: "/explorer" },
  { label: "À propos", href: "/qui-sommes-nous" },
  { label: "Aide", href: "/faq" },
  { label: "Confidentialité", href: "/politique-confidentialite" },
  { label: "Conditions", href: "/cgu" },
];

export default function AccueilMatieres() {
  // ⭐ MATHS ET COACH SONT PRÉSÉLECTIONNÉS (Frédéric, 23/09) : la page s'ouvre
  // sur quelque chose, personne n'a à cliquer pour voir ce que le site fait.
  const [matiereId, setMatiereId] = useState<MatiereId>("maths");
  const [action, setAction] = useState<ActionId>("coach");
  const matiere = matierePar(matiereId);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ⚠️ LE CHAMP DES TÉLÉPHONES. Dans l'en-tête, la zone du milieu est
          masquée sous 640 px — la marque, la photo, Ti Margo et « Inscription »
          y tiennent déjà à 7 px près (mesuré le 20/09). Sans cette ligne, 38 %
          des visiteurs n'auraient AUCUNE recherche. */}
      <div className="border-b border-slate-200 bg-white px-3 py-2 sm:hidden">
        <RechercheEntete variante="page" />
      </div>

      <LigneMatieres
        actif={matiereId}
        choisir={(m) => {
          if (m === matiereId) return;
          // ⭐ `depuis` DIT D'OÙ L'ON VIENT, et c'est lui qui rend la mesure
          // lisible : sans ça on saurait que « Français » est cliqué, jamais
          // s'il est cliqué en PREMIER ou après avoir vu les maths.
          track("accueil_matiere", { matiere: m, depuis: matiereId });
          setMatiereId(m);
          // ⚠️ On RETOMBE sur le coach en changeant de matière. Rester sur
          // « Leçon du jour » en passant aux maths à l'espagnol montrerait un
          // panneau qui n'a rien à voir avec la matière qu'on vient de cliquer.
          setAction("coach");
        }}
      />
      <LigneActions
        matiere={matiere}
        actif={action}
        choisir={(a) => {
          if (a === action) return;
          track("accueil_action", { matiere: matiereId, action: a });
          setAction(a);
        }}
      />

      <BandeauMatiere
        matiere={matiere.id}
        titre={matiere.titreBandeau}
        phrase={matiere.phrase}
      />

      {/* ⭐ LE PANNEAU DÉCLARE QU'IL EST PILOTÉ PAR L'ONGLET OUVERT. `role` et
          `aria-labelledby` ferment la boucle commencée par `aria-controls` sur
          les onglets : un lecteur d'écran annonce « Évaluation, onglet
          sélectionné », puis, en entrant ici, « panneau Évaluation ». Sans ces
          deux attributs, il annonçait un bouton, et le contenu changeait 300 px
          plus bas sans que rien ne le relie au geste. */}
      <main
        id={PANNEAU_ID}
        role="tabpanel"
        aria-labelledby={`onglet-${action}`}
        className="mx-auto w-full max-w-5xl px-3 py-6 sm:px-4 sm:py-8"
      >
        {action === "coach" && <PanneauCoach matiere={matiere} />}
        {action === "fiche" && <PanneauFiches matiere={matiere} />}
        {action === "evaluation" && <PanneauEvaluation matiere={matiere} />}
        {action === "photo" && <PanneauPhoto />}
        {action === "lecon" && <PanneauLecon matiere={matiere} />}

        <footer className="pt-10">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
            {PIED.map((l) => (
              <li key={l.href}>
                <Link prefetch={false} href={l.href} className="hover:text-slate-900">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      </main>
    </div>
  );
}
