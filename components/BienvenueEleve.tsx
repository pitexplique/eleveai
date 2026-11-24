"use client";

// ⭐ LA FENÊTRE DE BIENVENUE DE L'ÉLÈVE (24/11/2026). Frédéric : « j'aimerais
// que lorsqu'il se connecte, il ait plusieurs propositions en direct sur une
// modale ». Avant, l'élève qui venait de se connecter arrivait sur l'accueil
// des parents (« Votre enfant progresse en maths… ») et devait chercher seul
// où aller.
//
// Elle s'ouvre UNE fois, juste après la connexion (la page de connexion pose
// la marque `marquerBienvenue`), seulement pour un élève, et seulement quand
// il ne se connectait pas POUR quelque chose de précis (`?next=`).
// Les propositions sont « en direct » : elles viennent de SES données —
// la dernière notion travaillée (/api/mes-notions), un message du prof pas
// encore lu (/api/eleve/messages-classe), sa classe.
// Phrases courtes, gros boutons, un dessin par bouton : les 6e lisent mal.

import Link from "next/link";
import { useEffect, useState } from "react";
import { useEleve } from "@/context/EleveContext";
import { prenomAffichable } from "@/lib/prenom";

const CLE = "eleveai_bienvenue";

/** Appelée par la page de connexion, juste avant de quitter la page. */
export function marquerBienvenue(type: string | null | undefined) {
  if (type !== "eleve") return;
  try {
    sessionStorage.setItem(CLE, "1");
  } catch {
    /* navigation privée : pas de fenêtre, rien de grave */
  }
}

type Choix = { href: string; emoji: string; titre: string; detail?: string; fort?: boolean };

export default function BienvenueEleve() {
  const { eleve, pret } = useEleve();
  const [ouvert, setOuvert] = useState(false);
  const [prenom, setPrenom] = useState<string | null>(null);
  const [classe, setClasse] = useState<string | null>(null);
  const [derniere, setDerniere] = useState<{ titre: string; href: string } | null>(null);
  const [messageNonLu, setMessageNonLu] = useState(false);

  useEffect(() => {
    if (!pret || !eleve || eleve.type_utilisateur !== "eleve") return;
    let marque = false;
    try {
      marque = sessionStorage.getItem(CLE) === "1";
      if (marque) sessionStorage.removeItem(CLE);
    } catch {
      /* rien */
    }
    if (!marque) return;
    setOuvert(true);
    setPrenom(prenomAffichable(eleve.nom));
    setClasse(eleve.classe ?? null);
    if (!eleve.token) return;
    const h = { Authorization: `Bearer ${eleve.token}` };

    // Le pseudo choisi par l'élève passe avant le nom de la base.
    fetch("/api/passions", { headers: h })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const p = typeof d?.pseudo === "string" ? d.pseudo.trim() : "";
        if (p) setPrenom(p);
      })
      .catch(() => null);

    if (!eleve.classe) {
      fetch("/api/ma-classe", { headers: h })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (typeof d?.classe === "string") setClasse(d.classe);
        })
        .catch(() => null);
    }

    // Les titres arrivent du plus récent au plus ancien : le premier est la
    // dernière notion travaillée.
    fetch("/api/mes-notions", { headers: h })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const premiere = Object.entries((d?.titres ?? {}) as Record<string, string>)[0];
        if (!premiere) return;
        const [cle, titre] = premiere;
        const [c, notion] = cle.split("|");
        if (!c || !notion) return;
        // ⭐ 24/11/2026 — On reprend à la série où il en était, et le coach
        // démarre seul (microId + display=simple, comme le bouton GO).
        const reprise = d?.reprise as { cle?: string; microId?: string } | null | undefined;
        const suite =
          reprise?.cle === cle && reprise.microId
            ? `&microId=${encodeURIComponent(reprise.microId)}&display=simple`
            : "";
        setDerniere({
          titre,
          href: `/coach/serie?classe=${encodeURIComponent(c)}&matiere=maths&notion=${encodeURIComponent(notion)}${suite}`,
        });
      })
      .catch(() => null);

    fetch("/api/eleve/messages-classe", { headers: h })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const msgs = (d?.messages ?? []) as { lu?: boolean }[];
        if (msgs.some((m) => !m.lu)) setMessageNonLu(true);
      })
      .catch(() => null);
  }, [pret, eleve]);

  // Échap ferme la fenêtre.
  useEffect(() => {
    if (!ouvert) return;
    const f = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOuvert(false);
    };
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [ouvert]);

  if (!ouvert) return null;

  const choix: Choix[] = [];
  if (messageNonLu) {
    choix.push({ href: "/dashboard-eleve", emoji: "✉️", titre: "Ton prof t'a écrit", detail: "Lis son message.", fort: true });
  }
  if (derniere) {
    choix.push({ href: derniere.href, emoji: "▶️", titre: "Continuer", detail: derniere.titre, fort: !messageNonLu });
  }
  choix.push({
    href: classe ? `/coach-ia/maths?classe=${encodeURIComponent(classe)}` : "/coach-ia/maths",
    emoji: "🎯",
    titre: derniere ? "Une autre notion" : "Le coach",
    detail: classe ? `Les exercices de ${classe}.` : "Des exercices corrigés.",
    fort: !derniere && !messageNonLu,
  });
  if (classe && /^(cp|ce1|ce2|cm1|cm2|6e|5e|4e|3e)$/i.test(classe)) {
    choix.push({
      href: `/fiches-exercices?classe=${encodeURIComponent(classe.toLowerCase())}`,
      emoji: "📝",
      titre: "Une fiche d'exercices",
      detail: "À faire à l'écran.",
    });
  }
  choix.push({ href: "/dashboard-eleve", emoji: "✈️", titre: "Mes résultats", detail: "Ma moyenne et mes notions." });

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-slate-950/60 p-3 sm:items-center"
      onClick={() => setOuvert(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bienvenue-titre"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 id="bienvenue-titre" className="text-2xl font-black text-slate-900">
            {prenom ? `Bonjour ${prenom} !` : "Bonjour !"} 👋
          </h2>
          <button
            type="button"
            onClick={() => setOuvert(false)}
            aria-label="Fermer"
            className="-mr-1 -mt-1 rounded-full px-3 py-1 text-2xl leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            ×
          </button>
        </div>
        <p className="mt-1 text-lg font-bold text-slate-600">Que veux-tu faire ?</p>

        <ul className="mt-4 space-y-2.5">
          {choix.map((c) => (
            <li key={c.titre}>
              <Link
                href={c.href}
                onClick={() => setOuvert(false)}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                  c.fort
                    ? "bg-emerald-600 text-white shadow-lg hover:bg-emerald-500"
                    : "bg-slate-50 text-slate-900 ring-1 ring-slate-200 hover:bg-slate-100"
                }`}
              >
                <span className="text-3xl" aria-hidden>
                  {c.emoji}
                </span>
                <span className="min-w-0">
                  <span className="block text-lg font-black leading-tight">{c.titre}</span>
                  {c.detail ? (
                    <span className={`block truncate text-sm font-semibold ${c.fort ? "text-emerald-50" : "text-slate-600"}`}>
                      {c.detail}
                    </span>
                  ) : null}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
