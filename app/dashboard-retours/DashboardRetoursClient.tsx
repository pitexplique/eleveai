"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useEleve } from "@/context/EleveContext";

type UserSession = {
  code_etablissement?: string | null;
  nom?: string | null;
  type_utilisateur?: string | null;
  token?: string | null;
};

type Retour = {
  id: string;
  type: "bug" | "idee" | "avis";
  page: string | null;
  message: string;
  note: number | null;
  code_etablissement: string | null;
  code_eleve: string | null;
  prenom: string | null;
  classe: string | null;
  email: string | null;
  created_at: string;
};

const TYPE_META: Record<
  Retour["type"],
  { emoji: string; label: string; badge: string }
> = {
  bug: { emoji: "🐞", label: "Bug", badge: "bg-red-100 text-red-800 ring-1 ring-red-200" },
  idee: { emoji: "💡", label: "Idée", badge: "bg-amber-100 text-amber-800 ring-1 ring-amber-200" },
  avis: { emoji: "⭐", label: "Avis", badge: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200" },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }).format(new Date(value));
}

function Etoiles({ note }: { note: number }) {
  return (
    <span aria-label={`${note} étoiles sur 5`} className="text-base">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= note ? "" : "opacity-25 grayscale"}>⭐</span>
      ))}
    </span>
  );
}

function isProfAllowed(user: UserSession | null) {
  const t = user?.type_utilisateur;
  return t === "prof" || t === "principal" || t === "boss";
}

export default function DashboardRetoursClient() {
  const ctx = useEleve() as unknown as { eleve?: UserSession | null };
  const user = ctx.eleve ?? null;

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retours, setRetours] = useState<Retour[]>([]);
  const [filtre, setFiltre] = useState<"tous" | Retour["type"]>("tous");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErrorMessage(null);

      if (!user || !isProfAllowed(user)) {
        setLoading(false);
        return;
      }
      if (!user.token) {
        setErrorMessage(
          "Ta session doit être renouvelée : déconnecte-toi puis reconnecte-toi pour voir les retours."
        );
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/retours/liste", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data?.ok) {
          setErrorMessage(data?.error ?? "Impossible de charger les retours.");
          setLoading(false);
          return;
        }
        setRetours((data.retours ?? []) as Retour[]);
      } catch (err) {
        console.error(err);
        setErrorMessage("Impossible de charger les retours.");
      }
      setLoading(false);
    }

    load();
  }, [user]);

  const avis = useMemo(() => retours.filter((r) => r.type === "avis"), [retours]);
  const bugs = useMemo(() => retours.filter((r) => r.type === "bug"), [retours]);
  const idees = useMemo(() => retours.filter((r) => r.type === "idee"), [retours]);

  const noteMoyenne = useMemo(() => {
    const notes = avis.map((r) => r.note).filter((n): n is number => n !== null && n >= 1);
    if (notes.length === 0) return null;
    return Math.round((notes.reduce((s, n) => s + n, 0) / notes.length) * 10) / 10;
  }, [avis]);

  const visibles = useMemo(
    () => (filtre === "tous" ? retours : retours.filter((r) => r.type === filtre)),
    [retours, filtre]
  );

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <section className="mx-auto max-w-xl rounded-3xl bg-white p-6 text-slate-950 shadow-xl">
          <h1 className="text-2xl font-black">Retours élèves</h1>
          <p className="mt-3 font-semibold text-slate-700">Connecte-toi avec un compte professeur.</p>
          <Link href="/auth/signin" className="mt-5 inline-flex rounded-2xl bg-blue-600 px-5 py-3 font-black text-white">Se connecter</Link>
        </section>
      </main>
    );
  }

  if (!isProfAllowed(user)) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <section className="mx-auto max-w-xl rounded-3xl bg-white p-6 text-slate-950 shadow-xl">
          <h1 className="text-2xl font-black">Accès réservé</h1>
          <p className="mt-3 font-semibold text-slate-700">Cette page est réservée aux professeurs.</p>
          <Link href="/dashboard-eleve" className="mt-5 inline-flex rounded-2xl bg-emerald-600 px-5 py-3 font-black text-white">Dashboard élève</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <section className="mx-auto max-w-5xl space-y-6">
        {/* EN-TÊTE */}
        <div className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-800">
                Retours élèves
              </p>
              <h1 className="mt-3 text-3xl font-black">Avis, bugs et idées 📨</h1>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                Tout ce que les élèves ont envoyé depuis la page « Votre avis ».
              </p>
            </div>
            <Link
              href="/dashboard-prof"
              className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-black text-slate-700 ring-1 ring-slate-200 transition hover:brightness-95"
            >
              ← Dashboard prof
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-6 font-black text-slate-700 shadow-xl">
            Chargement des retours…
          </div>
        ) : errorMessage ? (
          <div className="rounded-3xl bg-red-50 p-6 font-black text-red-700 ring-1 ring-red-200">
            {errorMessage}
          </div>
        ) : (
          <>
            {/* STATS */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[2rem] bg-white p-5 text-slate-950 shadow-xl">
                <p className="text-xs font-black uppercase text-slate-500">Note moyenne</p>
                <p className="mt-2 text-3xl font-black text-emerald-500">
                  {noteMoyenne !== null ? `${noteMoyenne} / 5` : "—"}
                </p>
                <p className="mt-1 text-xs font-bold text-slate-400">
                  {avis.length} avis avec étoiles
                </p>
              </div>
              {([
                { label: "Avis", count: avis.length, color: "text-emerald-500", type: "avis" },
                { label: "Bugs", count: bugs.length, color: "text-red-500", type: "bug" },
                { label: "Idées", count: idees.length, color: "text-amber-500", type: "idee" },
              ] as const).map((s) => (
                <div key={s.type} className="rounded-[2rem] bg-white p-5 text-slate-950 shadow-xl">
                  <p className="text-xs font-black uppercase text-slate-500">
                    {TYPE_META[s.type].emoji} {s.label}
                  </p>
                  <p className={`mt-2 text-3xl font-black ${s.color}`}>{s.count}</p>
                  <p className="mt-1 text-xs font-bold text-slate-400">
                    sur {retours.length} retours
                  </p>
                </div>
              ))}
            </div>

            {/* LISTE */}
            <div className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-black">
                  {visibles.length} retour{visibles.length > 1 ? "s" : ""}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {([
                    { id: "tous", label: "Tous" },
                    { id: "avis", label: "⭐ Avis" },
                    { id: "bug", label: "🐞 Bugs" },
                    { id: "idee", label: "💡 Idées" },
                  ] as const).map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFiltre(f.id)}
                      className={[
                        "rounded-2xl px-4 py-2 text-sm font-black transition",
                        filtre === f.id
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-600 ring-1 ring-slate-200 hover:brightness-95",
                      ].join(" ")}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {visibles.length === 0 ? (
                <div className="rounded-2xl bg-amber-50 p-4 font-bold text-amber-800">
                  Aucun retour pour l&apos;instant. Envoie tes élèves sur la page « Votre avis » !
                </div>
              ) : (
                <ul className="space-y-4">
                  {visibles.map((r) => {
                    const meta = TYPE_META[r.type];
                    const auteur =
                      r.prenom ||
                      r.code_eleve ||
                      r.email ||
                      "Anonyme";
                    return (
                      <li
                        key={r.id}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`rounded-full px-3 py-1 text-xs font-black ${meta.badge}`}>
                            {meta.emoji} {meta.label}
                          </span>
                          {r.type === "avis" && r.note ? <Etoiles note={r.note} /> : null}
                          {r.page ? (
                            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-600">
                              {r.page}
                            </span>
                          ) : null}
                          <span className="ml-auto text-xs font-bold text-slate-400">
                            {formatDate(r.created_at)}
                          </span>
                        </div>

                        <p className="mt-3 whitespace-pre-wrap text-sm font-medium leading-6 text-slate-800">
                          {r.message}
                        </p>

                        <p className="mt-3 text-xs font-bold text-slate-500">
                          {auteur}
                          {r.classe ? ` · ${r.classe}` : ""}
                          {r.code_eleve && r.prenom ? ` · ${r.code_eleve}` : ""}
                          {r.code_etablissement ? ` · ${r.code_etablissement}` : ""}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
