"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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
  traite: boolean;
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

export default function AdminRetoursClient() {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retours, setRetours] = useState<Retour[]>([]);
  const [total, setTotal] = useState(0);
  const [filtre, setFiltre] = useState<"tous" | Retour["type"]>("tous");
  const [filtreTraite, setFiltreTraite] = useState<"tous" | "a_traiter" | "traites">("tous");
  const [etablissement, setEtablissement] = useState<string>("tous");
  const [recherche, setRecherche] = useState("");
  const [patching, setPatching] = useState<string | null>(null);

  async function load(offset: number) {
    const isFirst = offset === 0;
    if (isFirst) setLoading(true);
    else setLoadingMore(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/admin/retours?offset=${offset}`);
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        setErrorMessage(data?.error ?? "Impossible de charger les retours.");
      } else {
        const nouveaux = (data.retours ?? []) as Retour[];
        setRetours((prev) => (isFirst ? nouveaux : [...prev, ...nouveaux]));
        setTotal(data.total ?? 0);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Impossible de charger les retours.");
    }
    if (isFirst) setLoading(false);
    else setLoadingMore(false);
  }

  useEffect(() => {
    load(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function toggleTraite(retour: Retour) {
    setPatching(retour.id);
    const nouvelEtat = !retour.traite;

    try {
      const res = await fetch("/api/admin/retours", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: retour.id, traite: nouvelEtat }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.ok) {
        setRetours((prev) =>
          prev.map((r) => (r.id === retour.id ? { ...r, traite: nouvelEtat } : r))
        );
      }
    } catch (err) {
      console.error(err);
    }
    setPatching(null);
  }

  const avis = useMemo(() => retours.filter((r) => r.type === "avis"), [retours]);
  const bugs = useMemo(() => retours.filter((r) => r.type === "bug"), [retours]);
  const idees = useMemo(() => retours.filter((r) => r.type === "idee"), [retours]);
  const aTraiter = useMemo(() => retours.filter((r) => !r.traite), [retours]);

  const etablissements = useMemo(() => {
    const codes = new Set<string>();
    for (const r of retours) {
      if (r.code_etablissement) codes.add(r.code_etablissement);
    }
    return [...codes].sort();
  }, [retours]);

  const noteMoyenne = useMemo(() => {
    const notes = avis.map((r) => r.note).filter((n): n is number => n !== null && n >= 1);
    if (notes.length === 0) return null;
    return Math.round((notes.reduce((s, n) => s + n, 0) / notes.length) * 10) / 10;
  }, [avis]);

  const visibles = useMemo(() => {
    const requete = recherche.trim().toLowerCase();
    return retours.filter((r) => {
      if (filtre !== "tous" && r.type !== filtre) return false;
      if (filtreTraite === "a_traiter" && r.traite) return false;
      if (filtreTraite === "traites" && !r.traite) return false;
      if (etablissement !== "tous" && r.code_etablissement !== etablissement) return false;
      if (requete) {
        const texte = [r.message, r.page, r.prenom, r.classe, r.code_eleve, r.code_etablissement, r.email]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!texte.includes(requete)) return false;
      }
      return true;
    });
  }, [retours, filtre, filtreTraite, etablissement, recherche]);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <section className="mx-auto max-w-5xl space-y-6">
        {/* EN-TÊTE */}
        <div className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-800">
                Admin · Retours élèves
              </p>
              <h1 className="mt-3 text-3xl font-black">Avis, bugs et idées 📨</h1>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                Tout ce que les élèves ont envoyé depuis la page « Votre avis ».
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="/api/admin/retours?format=csv"
                className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-black text-white shadow transition hover:brightness-95"
              >
                ⬇️ Export CSV
              </a>
              <Link
                href="/admin/dashboard"
                className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-black text-slate-700 ring-1 ring-slate-200 transition hover:brightness-95"
              >
                ← Dashboard admin
              </Link>
            </div>
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
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
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
              <div className="rounded-[2rem] bg-white p-5 text-slate-950 shadow-xl">
                <p className="text-xs font-black uppercase text-slate-500">📌 À traiter</p>
                <p className="mt-2 text-3xl font-black text-sky-500">{aTraiter.length}</p>
                <p className="mt-1 text-xs font-bold text-slate-400">
                  {retours.length - aTraiter.length} déjà traités
                </p>
              </div>
            </div>

            {/* LISTE */}
            <div className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl">
              <div className="mb-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-2xl font-black">
                    {visibles.length} retour{visibles.length > 1 ? "s" : ""}
                    {retours.length < total ? (
                      <span className="ml-2 text-sm font-bold text-slate-400">
                        ({retours.length} chargés sur {total})
                      </span>
                    ) : null}
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

                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="search"
                    value={recherche}
                    onChange={(e) => setRecherche(e.target.value)}
                    placeholder="Rechercher (message, prénom, classe…)"
                    className="min-w-[220px] flex-1 rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  <select
                    value={filtreTraite}
                    onChange={(e) => setFiltreTraite(e.target.value as typeof filtreTraite)}
                    className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-black text-slate-600 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value="tous">Traités + à traiter</option>
                    <option value="a_traiter">📌 À traiter</option>
                    <option value="traites">✅ Traités</option>
                  </select>
                  {etablissements.length > 0 ? (
                    <select
                      value={etablissement}
                      onChange={(e) => setEtablissement(e.target.value)}
                      className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-black text-slate-600 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                      <option value="tous">Tous les établissements</option>
                      {etablissements.map((code) => (
                        <option key={code} value={code}>{code}</option>
                      ))}
                    </select>
                  ) : null}
                </div>
              </div>

              {visibles.length === 0 ? (
                <div className="rounded-2xl bg-amber-50 p-4 font-bold text-amber-800">
                  {retours.length === 0
                    ? "Aucun retour pour l'instant. Envoie tes élèves sur la page « Votre avis » !"
                    : "Aucun retour ne correspond aux filtres."}
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
                        className={[
                          "rounded-2xl border p-4 sm:p-5",
                          r.traite
                            ? "border-slate-200 bg-white opacity-60"
                            : "border-slate-200 bg-slate-50",
                        ].join(" ")}
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
                          {r.traite ? (
                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700 ring-1 ring-emerald-200">
                              ✅ Traité
                            </span>
                          ) : null}
                          <span className="ml-auto text-xs font-bold text-slate-400">
                            {formatDate(r.created_at)}
                          </span>
                        </div>

                        <p className="mt-3 whitespace-pre-wrap text-sm font-medium leading-6 text-slate-800">
                          {r.message}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                          <p className="text-xs font-bold text-slate-500">
                            {auteur}
                            {r.classe ? ` · ${r.classe}` : ""}
                            {r.code_eleve && r.prenom ? ` · ${r.code_eleve}` : ""}
                            {r.code_etablissement ? ` · ${r.code_etablissement}` : ""}
                            {r.email && r.prenom ? ` · ${r.email}` : ""}
                          </p>
                          <button
                            type="button"
                            onClick={() => toggleTraite(r)}
                            disabled={patching === r.id}
                            className={[
                              "rounded-2xl px-3 py-1.5 text-xs font-black transition disabled:opacity-50",
                              r.traite
                                ? "bg-slate-100 text-slate-600 ring-1 ring-slate-200 hover:brightness-95"
                                : "bg-emerald-500 text-white shadow hover:brightness-95",
                            ].join(" ")}
                          >
                            {r.traite ? "↩️ Remettre à traiter" : "✅ Marquer traité"}
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}

              {retours.length < total ? (
                <div className="mt-5 text-center">
                  <button
                    type="button"
                    onClick={() => load(retours.length)}
                    disabled={loadingMore}
                    className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-black text-white transition hover:brightness-110 disabled:opacity-50"
                  >
                    {loadingMore
                      ? "Chargement…"
                      : `Charger plus (${total - retours.length} restants)`}
                  </button>
                </div>
              ) : null}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
