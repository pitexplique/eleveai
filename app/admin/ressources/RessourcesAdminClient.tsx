"use client";

// Tableau de bord des RESSOURCES par notion.
// Une ligne par notion du coach (LA source de vérité), et pour chacune :
//   • Fiche : ✅/❌ — lu du CODE (registre, slug = notionId) → jamais faux.
//   • Vidéos : lues/écrites dans la table Supabase notion_ressources.
// L'admin voit d'un coup d'œil ce qui existe et colle une URL YouTube là où
// il en manque. Aucune table de correspondance : la clé est le notionId coach.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getNotionOptions, notionLabel, type Classe } from "@/lib/tutor-v4/catalog";
import { ficheHrefSiExiste } from "@/lib/fiches/registre";

const CLASSES_MATHS: Classe[] = [
  "cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e",
  "seconde", "premiere-spe", "terminale-spe",
];

type Ressource = {
  id: string;
  matiere: string;
  classe: string;
  notion_id: string;
  type: string;
  url: string;
  titre: string | null;
};

export default function RessourcesAdminClient() {
  const [classe, setClasse] = useState<Classe>("6e");
  const [items, setItems] = useState<Ressource[]>([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState<Record<string, { url: string; titre: string }>>({});
  const [msg, setMsg] = useState<string>("");

  const notions = useMemo(
    () =>
      getNotionOptions(classe, "maths").map((id) => ({
        id,
        label: notionLabel(id, classe, "maths"),
        ficheHref: ficheHrefSiExiste("maths", classe, id),
      })),
    [classe]
  );

  async function charger() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/notion-ressources");
      const data = await res.json();
      if (data?.ok) setItems(data.items ?? []);
    } catch {
      /* ignore */
    }
    setLoading(false);
  }
  useEffect(() => {
    charger();
  }, []);

  const videosDe = (notionId: string) =>
    items.filter(
      (r) => r.classe === classe && r.notion_id === notionId && r.type === "video"
    );

  async function ajouter(notionId: string) {
    const d = drafts[notionId];
    if (!d?.url?.trim()) return;
    setMsg("");
    const res = await fetch("/api/admin/notion-ressources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        matiere: "maths",
        classe,
        notion_id: notionId,
        type: "video",
        url: d.url.trim(),
        titre: d.titre?.trim() || null,
      }),
    });
    const data = await res.json();
    if (res.ok && data?.ok) {
      setDrafts((s) => ({ ...s, [notionId]: { url: "", titre: "" } }));
      charger();
    } else {
      setMsg(`⚠️ ${data?.error ?? "Erreur."}`);
    }
  }

  async function supprimer(id: string) {
    await fetch(`/api/admin/notion-ressources?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    charger();
  }

  const nbFiches = notions.filter((n) => n.ficheHref).length;
  const nbVideos = notions.filter((n) => videosDe(n.id).length).length;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <Link href="/admin/dashboard" className="text-sm font-bold text-slate-400 hover:text-slate-200">
            ← Dashboard admin
          </Link>
          <h1 className="mt-2 text-2xl font-black">🎬 Ressources par notion</h1>
          <p className="mt-1 text-sm text-slate-400">
            Pour chaque notion du coach : sa fiche (lue du code) et ses vidéos
            (YouTube, éditables ici). La clé est le notionId du coach — zéro
            correspondance à maintenir.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm font-bold text-slate-300">
            Classe&nbsp;
            <select
              value={classe}
              onChange={(e) => setClasse(e.target.value as Classe)}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100"
            >
              {CLASSES_MATHS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <span className="rounded-full bg-emerald-900/40 px-3 py-1 text-xs font-bold text-emerald-300">
            {nbFiches}/{notions.length} fiches
          </span>
          <span className="rounded-full bg-rose-900/40 px-3 py-1 text-xs font-bold text-rose-300">
            {nbVideos}/{notions.length} avec vidéo
          </span>
          {msg && <span className="text-sm font-bold text-amber-300">{msg}</span>}
        </div>

        {loading ? (
          <p className="text-sm text-slate-500">Chargement…</p>
        ) : (
          <ul className="space-y-3">
            {notions.map((n) => {
              const videos = videosDe(n.id);
              const draft = drafts[n.id] ?? { url: "", titre: "" };
              return (
                <li key={n.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-black text-slate-100">{n.label}</p>
                      <p className="text-xs text-slate-500">{n.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {n.ficheHref ? (
                        <Link
                          href={n.ficheHref}
                          className="rounded-full border border-emerald-700 bg-emerald-900/40 px-3 py-1 text-xs font-bold text-emerald-300 hover:bg-emerald-900/70"
                        >
                          📖 Fiche ✅
                        </Link>
                      ) : (
                        <span className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs font-bold text-slate-500">
                          Fiche ❌
                        </span>
                      )}
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          videos.length
                            ? "border border-rose-700 bg-rose-900/40 text-rose-300"
                            : "border border-slate-700 bg-slate-800/60 text-slate-500"
                        }`}
                      >
                        ▶ {videos.length} vidéo{videos.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {videos.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {videos.map((v) => (
                        <li key={v.id} className="flex items-center justify-between gap-3 rounded-lg bg-slate-800/50 px-3 py-1.5">
                          <a
                            href={v.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="truncate text-xs text-sky-400 hover:underline"
                          >
                            {v.titre || v.url}
                          </a>
                          <button
                            type="button"
                            onClick={() => supprimer(v.id)}
                            className="shrink-0 text-xs font-black text-red-400 hover:text-red-300"
                          >
                            Supprimer
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <input
                      type="url"
                      value={draft.url}
                      onChange={(e) =>
                        setDrafts((s) => ({ ...s, [n.id]: { ...draft, url: e.target.value } }))
                      }
                      placeholder="https://www.youtube.com/watch?v=…"
                      className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100"
                    />
                    <input
                      type="text"
                      value={draft.titre}
                      onChange={(e) =>
                        setDrafts((s) => ({ ...s, [n.id]: { ...draft, titre: e.target.value } }))
                      }
                      placeholder="titre (optionnel)"
                      className="w-40 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100"
                    />
                    <button
                      type="button"
                      onClick={() => ajouter(n.id)}
                      disabled={!draft.url.trim()}
                      className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-black text-white transition hover:bg-emerald-400 disabled:opacity-40"
                    >
                      + Vidéo
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
