"use client";

// ⭐ 24/11/2026 — EXPÉRIENCE PROF. Les pages d'une classe (En direct, Bilan,
// Bulletin, Podium, Cartes) partagent trois petits morceaux :
// - OngletsClasse : passer de l'une à l'autre sans repasser par « Mes classes »
//   (avant : En direct → ← Mes classes → Bulletin, à chaque fois) ;
// - ChoisirUneClasse : la page ouverte SANS ?code= (liens du tableau de bord
//   prof, du menu) affichait « Classe introuvable ». On propose ses classes ;
//   s'il n'en a qu'une, on y va tout seul ;
// - ConnecteToiProf / ErreurProf : plus de phrase sans bouton ni retour.

import Link from "next/link";
import { useEffect, useState } from "react";

export type PageClasse = "direct" | "bilan" | "bulletin" | "podium" | "cartes";

const PAGES: { page: PageClasse; label: string; chemin: string }[] = [
  { page: "direct", label: "🟢 En direct", chemin: "/prof/classes/direct" },
  { page: "bilan", label: "📊 Bilan", chemin: "/prof/classes/bilan" },
  { page: "bulletin", label: "📝 Bulletin", chemin: "/prof/classes/bulletin" },
  { page: "podium", label: "🏆 Podium", chemin: "/prof/classes/podium" },
  { page: "cartes", label: "🖨️ Cartes", chemin: "/prof/cartes" },
];

function cheminDe(page: PageClasse) {
  return PAGES.find((p) => p.page === page)!.chemin;
}

/** Le ?code= de l'adresse : undefined tant qu'il n'est pas lu (1er rendu). */
export function useCodeClasse(): string | undefined {
  const [code, setCode] = useState<string | undefined>(undefined);
  useEffect(() => {
    setCode((new URLSearchParams(window.location.search).get("code") ?? "").trim().toUpperCase());
  }, []);
  return code;
}

export function OngletsClasse({ code, actif }: { code: string; actif: PageClasse }) {
  return (
    <nav aria-label="Outils de la classe" className="mb-2 flex flex-wrap items-center gap-2 print:hidden">
      <Link href="/prof/classes" className="mr-1 text-sm font-semibold text-slate-600 hover:underline">
        ← Mes classes
      </Link>
      {PAGES.map((p) =>
        p.page === actif ? (
          <span
            key={p.page}
            aria-current="page"
            className="rounded-full bg-slate-900 px-3 py-1 text-sm font-bold text-white"
          >
            {p.label}
          </span>
        ) : (
          <Link
            key={p.page}
            href={`${p.chemin}?code=${encodeURIComponent(code)}`}
            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm font-bold text-slate-700 hover:bg-slate-100"
          >
            {p.label}
          </Link>
        ),
      )}
    </nav>
  );
}

type ClasseCourte = { id: string; nom_classe: string; code_etablissement: string; etablissement: string };

export function ChoisirUneClasse({ page, token }: { page: PageClasse; token: string | null }) {
  const [classes, setClasses] = useState<ClasseCourte[] | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const titre = PAGES.find((p) => p.page === page)!.label;

  useEffect(() => {
    if (!token) return;
    fetch("/api/prof/classes", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => {
        if (!d?.ok) return setErreur(d?.error ?? "Impossible de charger tes classes.");
        const liste: ClasseCourte[] = d.classes ?? [];
        // Une seule classe : pas de question inutile.
        if (liste.length === 1) {
          // Navigation complète : les pages lisent ?code= une fois, au montage.
          window.location.replace(`${cheminDe(page)}?code=${encodeURIComponent(liste[0].code_etablissement)}`);
          return;
        }
        setClasses(liste);
      })
      .catch(() => setErreur("Le serveur ne répond pas. Réessaie dans un instant."));
  }, [token, page]);

  if (erreur) return <ErreurProf message={erreur} />;
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-2xl">
        <Link href="/prof/classes" className="text-sm font-semibold text-slate-600 hover:underline">
          ← Mes classes
        </Link>
        <h1 className="mt-1 text-3xl font-black">{titre} : quelle classe ?</h1>
        {classes === null && <p className="mt-4 text-slate-500">Chargement de tes classes…</p>}
        {classes?.length === 0 && (
          <p className="mt-4 text-slate-700">
            Tu n&apos;as pas encore de classe.{" "}
            <Link href="/prof/classes#nouvelle-classe" className="font-bold text-violet-800 underline">
              Crée ta première classe
            </Link>
            .
          </p>
        )}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {classes?.map((c) => (
            <a
              key={c.id}
              href={`${cheminDe(page)}?code=${encodeURIComponent(c.code_etablissement)}`}
              className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm hover:border-violet-400"
            >
              <span className="block text-xl font-black">{c.nom_classe}</span>
              <span className="text-sm text-slate-600">
                {c.etablissement} · <span className="font-mono font-bold">{c.code_etablissement}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

export function ConnecteToiProf({ texte }: { texte: string }) {
  const [next, setNext] = useState("/prof/classes");
  useEffect(() => setNext(window.location.pathname + window.location.search), []);
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-xl">
        <p className="text-lg font-bold">{texte}</p>
        <Link
          href={`/auth/signin?type=prof&next=${encodeURIComponent(next)}`}
          className="mt-4 inline-block rounded-xl bg-violet-700 px-5 py-3 font-bold text-white hover:bg-violet-800"
        >
          Me connecter
        </Link>
      </div>
    </main>
  );
}

export function ErreurProf({ message }: { message: string }) {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-xl">
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">{message}</p>
        <Link href="/prof/classes" className="mt-4 inline-block font-bold text-violet-800 underline">
          ← Retour à Mes classes
        </Link>
      </div>
    </main>
  );
}
