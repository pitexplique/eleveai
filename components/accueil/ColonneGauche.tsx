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

import { useEffect, useState } from "react";
import Link from "next/link";
import { useEleve } from "@/context/EleveContext";
import { prenomFromNom } from "@/lib/prenom";
import { PROFILS } from "@/lib/matrice/profils";
import type { ProfilId } from "@/lib/matrice/types";

const CLE_PROFIL = "eleveai.ia.profil";
const CLE_HISTORIQUE = "eleveai.ia.historique";
// Replier la colonne est un choix qui doit SURVIVRE à la navigation : quelqu'un
// qui la ferme veut de la place, pas la refermer à chaque page.
const CLE_COLONNE = "eleveai.ia.colonne";

/** Ce qu'on montre sans rien demander. Le reste attend « Afficher plus ». */
const VISIBLES = 10;

type EntreeHistorique = { question: string; profil: ProfilId; quand: number };

/** Le menu du compte : uniquement des pages qui existent vraiment. */
const MENU = [
  {
    titre: "Mon espace",
    liens: [
      { label: "Tableau de bord", href: "/dashboard-eleve" },
      { label: "Mes apprentissages", href: "/parcours" },
    ],
  },
  {
    titre: "Participer",
    liens: [
      { label: "Donner mon avis", href: "/votre-avis" },
      { label: "Signaler une erreur", href: "/contact" },
    ],
  },
];

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

  useEffect(() => {
    try {
      const h = localStorage.getItem(CLE_HISTORIQUE);
      if (h) setHistorique(JSON.parse(h) as EntreeHistorique[]);
      const p = localStorage.getItem(CLE_PROFIL);
      if (p && PROFILS.some((x) => x.id === p)) setProfil(p as ProfilId);
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

  const prenom = eleve?.nom ? prenomFromNom(eleve.nom) : null;
  const initiales = (prenom ?? "?").slice(0, 2).toUpperCase();
  const labelProfil = profil ? PROFILS.find((p) => p.id === profil)?.label : null;

  const listeVisible = toutAfficher ? historique : historique.slice(0, VISIBLES);
  const reste = historique.length - listeVisible.length;

  const contenu = (
    <div className="flex min-h-full flex-col">
      <div className="flex-1 px-3 py-4">
        <div className="mb-4 flex items-center gap-2">
          <Link
            href="/"
            prefetch={false}
            onClick={() => setTiroirOuvert(false)}
            className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-500"
          >
            <span aria-hidden="true">+</span> Nouvelle demande
          </Link>
          {/* Replier : réservé à l'ordinateur. Sur téléphone le tiroir se ferme
              déjà en touchant à côté, un second geste ne servirait à rien. */}
          <button
            type="button"
            onClick={() => basculerPli(true)}
            aria-label="Replier la colonne"
            title="Replier la colonne"
            className="hidden shrink-0 rounded-xl p-2 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 lg:block"
          >
            <IconePanneau className="h-5 w-5" />
          </button>
        </div>

        {historique.length > 0 && (
          <>
            <p className="mb-2 px-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Récent
            </p>
            <ul className="space-y-0.5">
              {listeVisible.map((h) => (
                <li key={`${h.quand}-${h.question}`}>
                  <Link
                    href={`/?q=${encodeURIComponent(h.question)}`}
                    prefetch={false}
                    onClick={() => setTiroirOuvert(false)}
                    className="block truncate rounded-lg px-2 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                    title={h.question}
                  >
                    {h.question}
                  </Link>
                </li>
              ))}
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
            {toutAfficher && historique.length > VISIBLES && (
              <button
                type="button"
                onClick={() => setToutAfficher(false)}
                className="mt-1 block w-full rounded-lg px-2 py-1.5 text-left text-sm text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                Afficher moins
              </button>
            )}
          </>
        )}
      </div>

      {/* ── Le compte, collé en bas de la FENÊTRE (pas de la colonne) ────── */}
      <div className="sticky bottom-0 border-t border-slate-200 bg-slate-50 p-3">
        {menuOuvert && (
          <div className="absolute bottom-full left-3 right-3 mb-2 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
            {MENU.map((groupe) => (
              <div key={groupe.titre} className="px-1 py-1">
                <p className="px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  {groupe.titre}
                </p>
                {groupe.liens.map((l) => (
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
            ))}
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
          replier — c'est un interrupteur, pas deux boutons différents. */}
      {replie && (
        <button
          type="button"
          onClick={() => basculerPli(false)}
          aria-label="Afficher la colonne"
          title="Afficher la colonne"
          className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 rounded-xl border border-slate-300 bg-white p-2 text-slate-500 shadow-sm transition hover:text-slate-900 lg:block"
        >
          <IconePanneau className="h-5 w-5" />
        </button>
      )}

      {/* Téléphone : un bouton, et le tiroir n'existe que s'il est ouvert.
          ⚠️ IL Y A DÉJÀ UN HAMBURGER SUR CETTE PAGE — celui du header, à droite.
          Les deux portaient le même nom « Ouvrir le menu » : au lecteur d'écran,
          la page proposait deux fois le même geste pour deux contenus
          différents. Celui-ci ouvre les demandes, pas le site — il le dit.
          ⏳ Reste à régler : posé en `top-3`, il se superpose au bandeau du haut.
          Le déplacer demande de connaître la hauteur du header, qui change quand
          « Installer l'app » se ferme — c'est le même piège que l'encart du
          compte, et il mérite le même genre de réponse en CSS, pas une constante. */}
      <button
        type="button"
        onClick={() => setTiroirOuvert(true)}
        aria-label="Ouvrir mes demandes"
        className="fixed left-3 top-3 z-40 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm lg:hidden"
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
          <div className="absolute left-0 top-0 h-full w-72 bg-slate-50 shadow-xl">{contenu}</div>
        </div>
      )}
    </>
  );
}
