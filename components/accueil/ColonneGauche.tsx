"use client";

// La colonne de gauche : navigation légère, historique, et le compte en bas.
//
// Règle de poids : cette colonne ne déclenche AUCUNE requête. Le compte se lit
// dans le contexte élève déjà monté (localStorage → EleveContext), l'historique
// dans le même localStorage que l'entrée. Les données lourdes — progression,
// bulletins, abonnement — restent sur leurs pages et ne se chargent qu'au clic.
//
// Sur téléphone, elle devient un tiroir : rien n'est rendu tant qu'on ne l'ouvre
// pas, et le bouton reste atteignable au pouce.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useEleve } from "@/context/EleveContext";
import { ouvrirEcrireAuProf } from "@/lib/ecrireAuProf";
import { PROFILS } from "@/lib/matrice/profils";
import {
  EVENEMENT_HISTORIQUE,
  FILTRES_MATIERE,
  correspondAuFiltre,
  lireHistorique,
  type EntreeHistorique,
} from "@/lib/matrice/historique";
import type { ProfilId } from "@/lib/matrice/types";

const CLE_PROFIL = "eleveai.ia.profil";
// Replier la colonne est un choix qui doit SURVIVRE à la navigation : quelqu'un
// qui la ferme veut de la place, pas la refermer à chaque page.
const CLE_COLONNE = "eleveai.ia.colonne";

/** Ce qu'on montre sans rien demander. Le reste attend « Afficher plus ». */
const VISIBLES = 10;

/** « 4 août » — la date seule, sans l'année tant qu'on est dans la même. */
function jourCourt(quand: number): string {
  try {
    return new Date(quand).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  } catch {
    return "";
  }
}

/** L'icône « panneau latéral » — un rectangle et son montant, comme partout. */
function IconePanneau({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className={className}
    >
      <rect x="2.5" y="3.5" width="15" height="13" rx="2.5" />
      <line x1="8" y1="3.5" x2="8" y2="16.5" />
    </svg>
  );
}

export default function ColonneGauche() {
  const { eleve, logout } = useEleve();
  const [historique, setHistorique] = useState<EntreeHistorique[]>([]);
  const [profil, setProfil] = useState<ProfilId | null>(null);
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [tiroirOuvert, setTiroirOuvert] = useState(false);
  const [toutAfficher, setToutAfficher] = useState(false);
  const [replie, setReplie] = useState(false);
  /** Le filtre du RÉCENT. `null` = « Toutes » — la vue principale. */
  const [filtre, setFiltre] = useState<string | null>(null);

  useEffect(() => {
    // ⭐ ON RELIT À CHAQUE DEMANDE, pas seulement au montage. L'entrée pose sa
    // question sans changer de page : sans cette écoute, la demande qu'on vient
    // de faire n'apparaissait dans le RÉCENT qu'au chargement suivant — on
    // écrivait, et rien ne bougeait à gauche.
    // `storage` en plus : il couvre les AUTRES onglets, que l'événement maison
    // ne traverse pas.
    const relire = () => setHistorique(lireHistorique());
    relire();
    window.addEventListener(EVENEMENT_HISTORIQUE, relire);
    window.addEventListener("storage", relire);

    try {
      const p = localStorage.getItem(CLE_PROFIL);
      if (p && PROFILS.some((x) => x.id === p)) setProfil(p as ProfilId);
      setReplie(localStorage.getItem(CLE_COLONNE) === "repliee");
    } catch {
      /* navigation privée : la colonne vit sans */
    }

    return () => {
      window.removeEventListener(EVENEMENT_HISTORIQUE, relire);
      window.removeEventListener("storage", relire);
    };
  }, []);

  /** Le pli se retient. Sans ça, il faudrait refermer à chaque page. */
  function basculerPli(valeur: boolean) {
    setReplie(valeur);
    try {
      localStorage.setItem(CLE_COLONNE, valeur ? "repliee" : "ouverte");
    } catch {
      /* navigation privée : le choix ne dure que la visite */
    }
  }

  const initiales = (eleve?.nom ?? "?").trim().slice(0, 2).toUpperCase();
  const labelProfil = profil ? PROFILS.find((p) => p.id === profil)?.label : null;

  // ⭐ LES FILTRES DU RÉCENT (07/08). Trente demandes de quatre matières dans
  // une seule liste, c'est un tas : retrouver « la question de conjugaison de
  // mardi » demandait de tout relire.
  // ⚠️ On n'affiche QUE les filtres qui ont quelque chose derrière — même règle
  // que les chips de l'entrée. Un onglet « Espagnol » vide dirait qu'on n'a rien
  // fait en espagnol, alors qu'il dit seulement qu'on n'a rien DEMANDÉ.
  const filtresUtiles = useMemo(() => {
    const presents = FILTRES_MATIERE.filter(
      (f) => f.id !== null && historique.some((h) => correspondAuFiltre(h, f.id)),
    );
    // Un seul rayon rempli : le filtre ne trierait rien, il ferait du bruit.
    return presents.length >= 2 ? [FILTRES_MATIERE[0], ...presents] : [];
  }, [historique]);

  const listeFiltree = useMemo(
    () => historique.filter((h) => correspondAuFiltre(h, filtre)),
    [historique, filtre],
  );
  const listeVisible = toutAfficher ? listeFiltree : listeFiltree.slice(0, VISIBLES);
  const reste = listeFiltree.length - listeVisible.length;

  /** Le libellé lisible d'une matière enregistrée dans l'historique. */
  const libelleMatiere = (id?: string | null) =>
    FILTRES_MATIERE.find((f) => f.id === id)?.label ?? null;

  const contenu = (
    <div className="flex min-h-full flex-col">
      <div className="flex-1 px-3 py-4">
        <div className="mb-4 flex items-center gap-1.5">
          <Link
            href="/"
            prefetch={false}
            onClick={() => setTiroirOuvert(false)}
            className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-500"
          >
            <span aria-hidden="true">+</span> Nouvelle demande
          </Link>
          {/* ⭐ PLUS DISCRET, ET DE LA MÊME HAUTEUR QUE SON VOISIN (07/08).
              Il était posé en `p-2` à côté d'un bouton en `py-2` : deux hauteurs
              différentes dans la même rangée, et l'œil lisait un décalage avant
              de lire un outil. Il reste gris tant qu'on ne le survole pas — ce
              n'est pas lui qu'on vient chercher en arrivant.
              Replier est réservé à l'ordinateur : sur téléphone le tiroir se
              ferme déjà en touchant à côté. */}
          <button
            type="button"
            onClick={() => basculerPli(true)}
            aria-label="Replier la colonne"
            title="Replier la colonne"
            className="hidden shrink-0 rounded-xl border border-transparent px-2 py-2 text-slate-400 transition hover:border-slate-300 hover:bg-white hover:text-slate-700 lg:block"
          >
            <IconePanneau className="h-5 w-5" />
          </button>
        </div>

        {historique.length > 0 && (
          <>
            <p className="mb-2 px-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Récent
            </p>

            {filtresUtiles.length > 0 && (
              <div className="rangee-defilante mb-2 gap-1" role="group" aria-label="Filtrer par matière">
                {filtresUtiles.map((f) => {
                  const actif = filtre === f.id;
                  return (
                    <button
                      key={f.label}
                      type="button"
                      onClick={() => {
                        setFiltre(f.id);
                        setToutAfficher(false);
                      }}
                      aria-pressed={actif}
                      className={`rounded-full px-2 py-0.5 text-[11px] transition ${
                        actif
                          ? "bg-teal-700 text-white"
                          : "bg-white text-slate-500 hover:bg-slate-200 hover:text-slate-800"
                      }`}
                    >
                      {/* « Mathématiques » ne tient pas dans 256 px de colonne
                          à côté de cinq autres : ici, et ici seulement, on dit
                          « Maths ». */}
                      {f.id === "maths" ? "Maths" : f.label}
                    </button>
                  );
                })}
              </div>
            )}

            <ul className="space-y-0.5">
              {listeVisible.map((h) => {
                const matiere = libelleMatiere(h.matiere);
                // La ligne du dessous ne s'affiche que si elle dit quelque
                // chose : les demandes d'avant le 07/08 n'ont ni matière ni
                // niveau, et une ligne vide sous chacune ferait une liste deux
                // fois plus haute pour rien.
                const contexte = [matiere, h.niveau, jourCourt(h.quand)].filter(Boolean).join(" · ");
                return (
                  <li key={`${h.quand}-${h.question}`}>
                    <Link
                      href={`/?q=${encodeURIComponent(h.question)}`}
                      prefetch={false}
                      onClick={() => setTiroirOuvert(false)}
                      className="block rounded-lg px-2 py-1.5 transition hover:bg-slate-100"
                      title={h.question}
                    >
                      <span className="block truncate text-sm text-slate-600">{h.question}</span>
                      {contexte && (
                        <span className="block truncate text-[11px] text-slate-400">{contexte}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* « Afficher plus » n'apparaît QUE s'il y a vraiment autre chose
                derrière : un bouton qui ne révèle rien est une petite trahison. */}
            {reste > 0 && (
              <button
                type="button"
                onClick={() => setToutAfficher(true)}
                className="mt-1 block w-full rounded-lg px-2 py-1.5 text-left text-sm text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                Afficher plus
              </button>
            )}
            {toutAfficher && listeFiltree.length > VISIBLES && (
              <button
                type="button"
                onClick={() => setToutAfficher(false)}
                className="mt-1 block w-full rounded-lg px-2 py-1.5 text-left text-sm text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                Afficher moins
              </button>
            )}
            {listeFiltree.length === 0 && (
              <p className="px-2 py-1.5 text-sm text-slate-400">
                Rien dans cette matière pour l&apos;instant.
              </p>
            )}
          </>
        )}
      </div>

      {/* ── Le compte, collé en bas de la FENÊTRE (pas de la colonne) ────── */}
      <div className="sticky bottom-0 border-t border-slate-200 bg-slate-50 p-3">
        {menuOuvert && (
          <div className="absolute bottom-full left-3 right-3 mb-2 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
            <div className="px-1 py-1">
              <p className="px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Mon espace
              </p>
              {[
                { label: "Tableau de bord", href: "/dashboard-eleve" },
                { label: "Mes apprentissages", href: "/parcours" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  prefetch={false}
                  onClick={() => setMenuOuvert(false)}
                  className="block rounded-lg px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="px-1 py-1">
              <p className="px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Participer
              </p>
              {/* « Devenir bêta testeur » est ici pour tout le monde, invité
                  compris : les 50 places sont ouvertes aux parents et aux profs
                  autant qu'aux élèves, et neuf visiteurs sur dix arrivent sans
                  compte. La réserver aux connectés fermerait la porte à ceux
                  qu'on cherche justement. */}
              {[
                { label: "Donner mon avis", href: "/votre-avis" },
                { label: "Signaler une erreur", href: "/contact" },
                { label: "Devenir bêta testeur", href: "/devenir-beta-testeur" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  prefetch={false}
                  onClick={() => setMenuOuvert(false)}
                  className="block rounded-lg px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
                >
                  {l.label}
                </Link>
              ))}
              {/* ⭐ « ÉCRIS-MOI » EST ICI DEPUIS LE 07/08, et nulle part ailleurs.
                  Le formulaire n'a pas changé d'une ligne : c'est sa pastille
                  flottante, en bas à gauche de toutes les pages, qui est partie.
                  Réservé aux élèves connectés — c'est la condition du composant
                  lui-même, on ne propose pas une porte qui ne s'ouvrira pas. */}
              {eleve && (
                <button
                  type="button"
                  onClick={() => {
                    setMenuOuvert(false);
                    setTiroirOuvert(false);
                    ouvrirEcrireAuProf();
                  }}
                  className="block w-full rounded-lg px-3 py-1.5 text-left text-sm text-slate-700 hover:bg-slate-100"
                >
                  ✉️ Écris-moi
                </button>
              )}
            </div>

            {eleve && (
              <div className="mt-1 border-t border-slate-200 px-1 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMenuOuvert(false);
                  }}
                  className="block w-full rounded-lg px-3 py-1.5 text-left text-sm text-slate-700 hover:bg-slate-100"
                >
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
        )}

        {eleve ? (
          <button
            type="button"
            onClick={() => setMenuOuvert((v) => !v)}
            aria-expanded={menuOuvert}
            className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left transition hover:bg-slate-100"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-medium text-white">
              {initiales}
            </span>
            <span className="min-w-0 flex-1">
              {/* Le NOM en entier, pas le prénom seul : c'est son compte, pas
                  une liste publique — et c'est ce qu'on reconnaît d'un coup
                  d'œil quand on partage un écran en classe. */}
              <span className="block truncate text-sm font-medium text-slate-900">
                {eleve.nom || "Mon compte"}
              </span>
              <span className="block truncate text-xs text-slate-500">
                {labelProfil ?? eleve.classe ?? "Élève"}
              </span>
            </span>
            <span aria-hidden="true" className="text-slate-400">
              ⌃
            </span>
          </button>
        ) : (
          <div className="flex flex-col gap-1">
            <Link
              href="/auth/signin?mode=eleve"
              prefetch={false}
              className="rounded-xl bg-teal-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-teal-800"
            >
              Se connecter
            </Link>
            <button
              type="button"
              onClick={() => setMenuOuvert((v) => !v)}
              className="rounded-xl px-3 py-1.5 text-center text-xs text-slate-500 hover:bg-slate-100"
            >
              Invité · voir le menu
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Ordinateur.
          ⚠️ PAS DE `h-screen` ICI, et pas de hauteur calculée non plus.
          En `h-screen`, la colonne fait toute la fenêtre mais commence SOUS le
          header : l'encart du compte tombait 78 px hors de l'écran, invisible
          tant qu'on n'avait pas fait défiler. Soustraire une constante ne marche
          pas — le bandeau « Installer l'app » se ferme et le header change de
          hauteur — et une mesure en JavaScript ne s'appliquait pas.
          La réponse est dans le CSS : la colonne s'étire sur toute la page
          (`stretch` du parent en flex) et c'est l'ENCART qui est `sticky
          bottom-0`. Il reste alors collé au bas de la fenêtre quoi qu'il
          arrive, sans que personne ait à mesurer quoi que ce soit. */}
      {!replie && (
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-slate-50 lg:block">
          {contenu}
        </aside>
      )}

      {/* Dépliée : le seul moyen de la faire revenir. Même icône que pour la
          replier — c'est un interrupteur, pas deux boutons différents.
          ⭐ Adouci le 07/08 : à demi effacé au repos, net au survol. Posé au
          milieu du bord gauche, il attirait l'œil plus que la question posée au
          centre de l'écran. */}
      {replie && (
        <button
          type="button"
          onClick={() => basculerPli(false)}
          aria-label="Afficher mes demandes"
          title="Afficher mes demandes"
          className="fixed left-2 top-1/2 z-40 hidden -translate-y-1/2 rounded-xl border border-slate-200 bg-white/70 p-2 text-slate-400 opacity-60 shadow-sm transition hover:border-slate-300 hover:bg-white hover:text-slate-800 hover:opacity-100 lg:block"
        >
          <IconePanneau className="h-5 w-5" />
        </button>
      )}

      {/* Téléphone : un bouton, et le tiroir n'existe que s'il est ouvert.
          ⭐ IL EST PASSÉ EN BAS À GAUCHE (07/08) — il était en `top-3` et se
          superposait au bandeau du haut. Le déplacer vers le bas règle le défaut
          sans avoir à connaître la hauteur du header, qui change quand
          « Installer l'app » se ferme : c'est exactement la réponse en CSS qu'on
          cherchait. La place était libre : le bouton « Écris-moi » qui l'occupait
          est parti dans le menu du compte le même jour.
          ⚠️ IL Y A DÉJÀ UN HAMBURGER SUR CETTE PAGE — celui du header, à droite.
          Les deux portaient le même nom « Ouvrir le menu » : au lecteur d'écran,
          la page proposait deux fois le même geste pour deux contenus
          différents. Celui-ci ouvre les demandes, pas le site — il le dit. */}
      <button
        type="button"
        onClick={() => setTiroirOuvert(true)}
        aria-label="Ouvrir mes demandes"
        className="fixed bottom-4 left-3 z-40 rounded-full border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-600 shadow-lg lg:hidden print:hidden"
      >
        ☰
      </button>
      {tiroirOuvert && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setTiroirOuvert(false)}
            className="absolute inset-0 bg-slate-900/30"
          />
          <div className="absolute left-0 top-0 h-full w-72 overflow-y-auto bg-slate-50 shadow-xl">
            {contenu}
          </div>
        </div>
      )}
    </>
  );
}
