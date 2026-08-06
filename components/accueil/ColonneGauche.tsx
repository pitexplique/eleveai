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

export default function ColonneGauche() {
  const { eleve, logout } = useEleve();
  const [historique, setHistorique] = useState<EntreeHistorique[]>([]);
  const [profil, setProfil] = useState<ProfilId | null>(null);
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [tiroirOuvert, setTiroirOuvert] = useState(false);

  useEffect(() => {
    try {
      const h = localStorage.getItem(CLE_HISTORIQUE);
      if (h) setHistorique(JSON.parse(h) as EntreeHistorique[]);
      const p = localStorage.getItem(CLE_PROFIL);
      if (p && PROFILS.some((x) => x.id === p)) setProfil(p as ProfilId);
    } catch {
      /* navigation privée : la colonne vit sans */
    }
  }, []);

  const prenom = eleve?.nom ? prenomFromNom(eleve.nom) : null;
  const initiales = (prenom ?? "?").slice(0, 2).toUpperCase();
  const labelProfil = profil ? PROFILS.find((p) => p.id === profil)?.label : null;

  const contenu = (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <Link
          href="/"
          prefetch={false}
          onClick={() => setTiroirOuvert(false)}
          className="mb-4 flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-500"
        >
          <span aria-hidden="true">+</span> Nouvelle demande
        </Link>

        {historique.length > 0 && (
          <>
            <p className="mb-2 px-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Récent
            </p>
            <ul className="space-y-0.5">
              {historique.slice(0, 8).map((h) => (
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
          </>
        )}
      </div>

      {/* ── Le compte, en bas ────────────────────────────────────────────── */}
      <div className="relative border-t border-slate-200 p-3">
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
              <span className="block truncate text-sm font-medium text-slate-900">
                {prenom ?? "Mon compte"}
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
      {/* Ordinateur */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-slate-50 lg:block">
        <div className="sticky top-0 h-screen">{contenu}</div>
      </aside>

      {/* Téléphone : un bouton, et le tiroir n'existe que s'il est ouvert. */}
      <button
        type="button"
        onClick={() => setTiroirOuvert(true)}
        aria-label="Ouvrir le menu"
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
