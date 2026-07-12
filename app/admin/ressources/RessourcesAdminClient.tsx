"use client";

// Admin des ressources de notion (vidéos YouTube pour l'instant).
// L'admin choisit une classe puis une notion (issues du CATALOGUE COACH — la
// source de vérité, donc les notions proposées sont exactement celles que le
// coach interroge), colle une URL YouTube, et c'est relié. Aucune table de
// correspondance : la clé stockée est le notionId du coach.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getNotionOptions, notionLabel, type Classe } from "@/lib/tutor-v4/catalog";

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
  const [items, setItems] = useState<Ressource[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string>("");

  const [classe, setClasse] = useState<Classe>("6e");
  const [notionId, setNotionId] = useState<string>("");
  const [url, setUrl] = useState("");
  const [titre, setTitre] = useState("");
  const [envoi, setEnvoi] = useState(false);

  const notions = useMemo(() => {
    return getNotionOptions(classe, "maths").map((id) => ({
      id,
      label: notionLabel(id, classe, "maths"),
    }));
  }, [classe]);

  useEffect(() => {
    if (notions.length && !notions.some((n) => n.id === notionId)) {
      setNotionId(notions[0].id);
    }
  }, [notions, notionId]);

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

  async function ajouter(e: React.FormEvent) {
    e.preventDefault();
    if (envoi) return;
    setEnvoi(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/notion-ressources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matiere: "maths",
          classe,
          notion_id: notionId,
          type: "video",
          url: url.trim(),
          titre: titre.trim() || null,
        }),
      });
      const data = await res.json();
      if (res.ok && data?.ok) {
        setMsg("✅ Vidéo ajoutée.");
        setUrl("");
        setTitre("");
        charger();
      } else {
        setMsg(`⚠️ ${data?.error ?? "Erreur."}`);
      }
    } catch {
      setMsg("⚠️ Erreur réseau.");
    }
    setEnvoi(false);
  }

  async function supprimer(id: string) {
    await fetch(`/api/admin/notion-ressources?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    charger();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <Link href="/admin/dashboard" className="text-sm font-bold text-slate-400 hover:text-slate-200">
            ← Dashboard admin
          </Link>
          <h1 className="mt-2 text-2xl font-black">🎬 Vidéos par notion</h1>
          <p className="mt-1 text-sm text-slate-400">
            Attache une vidéo YouTube à une notion du coach. Elle apparaîtra
            comme badge « ▶ Vidéo » à côté du badge « Fiche », dans le coach.
          </p>
        </div>

        <form onSubmit={ajouter} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-bold text-slate-300">
              Classe
              <select
                value={classe}
                onChange={(e) => setClasse(e.target.value as Classe)}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100"
              >
                {CLASSES_MATHS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-bold text-slate-300">
              Notion (du coach)
              <select
                value={notionId}
                onChange={(e) => setNotionId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100"
              >
                {notions.map((n) => (
                  <option key={n.id} value={n.id}>{n.label} ({n.id})</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block text-sm font-bold text-slate-300">
            URL YouTube
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=…"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100"
              required
            />
          </label>
          <label className="block text-sm font-bold text-slate-300">
            Titre (optionnel)
            <input
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="ex. Les triangles expliqués en 5 min"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100"
            />
          </label>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={envoi}
              className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-black text-white transition hover:bg-emerald-400 disabled:opacity-50"
            >
              {envoi ? "Ajout…" : "Ajouter la vidéo"}
            </button>
            {msg && <span className="text-sm font-bold text-slate-300">{msg}</span>}
          </div>
        </form>

        <div>
          <h2 className="mb-3 text-lg font-black">
            Vidéos attachées {loading ? "" : `(${items.length})`}
          </h2>
          {loading ? (
            <p className="text-sm text-slate-500">Chargement…</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-slate-500">
              Aucune vidéo pour l&apos;instant. Ajoute la première ci-dessus.
            </p>
          ) : (
            <ul className="space-y-2">
              {items.map((r) => (
                <li
                  key={r.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-200">
                      {r.titre || r.url}
                    </p>
                    <p className="text-xs text-slate-500">
                      {r.matiere} · {r.classe} · {r.notion_id}
                    </p>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate text-xs text-sky-400 hover:underline"
                    >
                      {r.url}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => supprimer(r.id)}
                    className="shrink-0 rounded-full border border-red-800 bg-red-950/40 px-3 py-1.5 text-xs font-black text-red-300 transition hover:bg-red-900/50"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
