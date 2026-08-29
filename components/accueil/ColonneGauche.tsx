"use client";

// La colonne de gauche : navigation légère, le résumé de l'élève, et le compte
// en bas.
//
// Règle de poids : sans compte, cette colonne ne déclenche AUCUNE requête. Le
// compte se lit dans le contexte élève déjà monté (localStorage →
// EleveContext) ; le résumé, lui, fait UNE lecture d'un snapshot déjà calculé,
// et seulement pour un élève connecté (voir ResumeEleve.tsx). Les données
// lourdes — progression détaillée, bulletins, abonnement — restent sur leurs
// pages et ne se chargent qu'au clic.
//
// ⛔ LE RÉCENT A ÉTÉ RETIRÉ LE 29/08/2026 (Frédéric : « est-ce vraiment utile de
// garder l'historique ? »). Il ne s'écrivait que lorsqu'on TAPAIT une question —
// le parcours en pastilles, celui que l'entrée est faite pour provoquer,
// n'enregistrait rien — donc il restait vide chez presque tout le monde, et il
// ne montrait de toute façon que des gestes passés. Le résumé prend sa place :
// il dit où l'on en est, et il montre les portes à ceux qui n'ont pas de compte.
// ⚠️ L'ÉCRITURE, ELLE, N'A PAS ÉTÉ TOUCHÉE : EntreeMatrice enregistre toujours
// dans `eleveai.ia.historique`, et `/accueil?d=<horodatage>` rouvre toujours une
// demande. C'est un essai, et il se défait en remettant ce bloc.
//
// Sur téléphone, elle devient un tiroir : rien n'est rendu tant qu'on ne l'ouvre
// pas, et le bouton reste atteignable au pouce.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useEleve } from "@/context/EleveContext";
import { ouvrirEcrireAuProf } from "@/lib/ecrireAuProf";
import { PROFILS } from "@/lib/matrice/profils";
import ResumeEleve from "@/components/accueil/ResumeEleve";
import { EVENEMENT_NOUVELLE_DEMANDE } from "@/lib/matrice/historique";

// ⛔ CETTE COLONNE NE LIT PLUS `eleveai.ia.profil` (17/08/2026). Elle en gardait
// une copie pour écrire la classe sous le nom du compte, et cette clé ne dit pas
// qui l'on est : elle dit quel bouton on a cliqué en dernier sur l'entrée. Voir
// `labelClasseCompte` plus bas. La clé existe toujours, elle appartient à
// EntreeMatrice, et c'est très bien qu'un seul fichier la manipule.

// Replier la colonne est un choix qui doit SURVIVRE à la navigation : quelqu'un
// qui la ferme veut de la place, pas la refermer à chaque page.
const CLE_COLONNE = "eleveai.ia.colonne";

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
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [tiroirOuvert, setTiroirOuvert] = useState(false);
  const [replie, setReplie] = useState(false);

  useEffect(() => {
    try {
      setReplie(localStorage.getItem(CLE_COLONNE) === "repliee");
    } catch {
      /* navigation privée : la colonne vit sans */
    }
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

  /**
   * ⭐ LA CLASSE SOUS LE NOM VIENT DU COMPTE, ET DE NULLE PART AILLEURS
   * (17/08/2026, Frédéric : « sous Arthur il affiche Première alors qu'il est
   * en 5e »).
   *
   * ⛔ ON LISAIT `eleveai.ia.profil` — le DERNIER BOUTON CLIQUÉ sur l'entrée.
   * C'est un choix de navigation, pas une identité : un 5ᵉ a parfaitement le
   * droit d'aller regarder ce qui se fait en Première, et ce coup d'œil se
   * gravait sous son nom jusqu'à ce qu'il clique ailleurs. Le compte, lui,
   * disait 5ᵉ tout du long.
   *
   * C'est exactement le défaut corrigé le 12/08 dans EntreeMatrice — « un
   * souvenir de clic ne peut pas primer sur ce que dit le compte » — mais la
   * colonne n'en avait pas profité : elle lisait la même clé, dans son coin.
   *
   * ⚠️ `acces_etablissement` dit « premiere-spe » là où les profils disent
   * « premiere » : sans ce raccord, un lycéen verrait son identifiant brut.
   * Et si le compte ne sait pas, on écrit « Élève » — jamais une classe
   * devinée. Même règle que `inferClasseFromCode`, supprimée le 12/08 : deviner
   * n'était pas une meilleure réponse, seulement une plus confiante.
   */
  const labelClasseCompte = useMemo(() => {
    const c = eleve?.classe;
    if (!c) return null;
    const id = c.replace(/-spe$/, "");
    return PROFILS.find((p) => p.id === id)?.label ?? null;
  }, [eleve?.classe]);

  const contenu = (
    <div className="flex min-h-full flex-col">
      <div className="flex-1 px-3 py-4">
        <div className="mb-4 flex items-center gap-1.5">
          {/* ⚠️ `/accueil` ET NON `/` : la racine ne fait que rediriger ici, et
              surtout une URL NUE est le signal qui remet l'entrée à blanc.
              Depuis `/accueil?d=…`, pointer vers `/` ne changeait pas la query
              de la page finale — la demande précédente restait affichée sous un
              bouton qui promettait d'en ouvrir une nouvelle. */}
          <Link
            href="/accueil"
            prefetch={false}
            onClick={() => {
              setTiroirOuvert(false);
              window.dispatchEvent(new Event(EVENEMENT_NOUVELLE_DEMANDE));
            }}
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

        {/* ⭐ LE RÉSUMÉ, À LA PLACE DU RÉCENT (29/08/2026). Il porte les portes
            pour tout le monde, et les chiffres pour qui a un compte. Voir
            l'en-tête de ce fichier pour le pourquoi, et ResumeEleve.tsx pour la
            règle de poids. */}
        <ResumeEleve />
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
                // 11/08 : pointait vers /contact, un formulaire général qui ne
                // gardait ni la question, ni la notion, ni la ressource visée.
                // Le lien promettait donc un geste que rien ne recevait.
                { label: "Signaler une erreur", href: "/signaler-une-erreur" },
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
                {labelClasseCompte ?? "Élève"}
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
          aria-label="Afficher mes activités"
          title="Afficher mes activités"
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
          différents. Celui-ci ouvre les activités, pas le site — il le dit.
          ⚠️ « MES ACTIVITÉS » ET NON « MES DEMANDES » (29/08) : le tiroir ne
          porte plus l'historique des questions tapées. Un nom qui survit à ce
          qu'il désignait est un nom faux, et c'est au lecteur d'écran qu'il
          ment en premier. */}
      <button
        type="button"
        onClick={() => setTiroirOuvert(true)}
        aria-label="Ouvrir mes activités"
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
