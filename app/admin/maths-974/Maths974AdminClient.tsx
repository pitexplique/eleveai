"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Item = {
  id: string;
  lieu: string;
  titre: string;
  situation: string;
  notion: string | null;
  niveau: string | null;
  question: string | null;
  reponse: string | null;
  image_url: string | null;
  youtube_id: string | null;
  coach_classe: string | null;
  masque: boolean;
  created_at: string;
};

const NIVEAUX = ["6e", "5e", "4e", "3e", "2nde", "1re", "Terminale"];

export default function Maths974AdminClient() {
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function load() {
    try {
      const res = await fetch("/api/admin/maths-974", { cache: "no-store" });
      const j = await res.json();
      if (j.ok) setItems(j.items);
    } catch {
      /* silencieux */
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const form = new FormData(e.currentTarget);
      const res = await fetch("/api/admin/maths-974", { method: "POST", body: form });
      const j = await res.json();
      if (!res.ok || !j.ok) throw new Error(j.error || "Erreur");
      setMsg({ kind: "ok", text: "Capture publiée ! 🌋" });
      formRef.current?.reset();
      await load();
    } catch (err: any) {
      setMsg({ kind: "err", text: err.message || "Erreur" });
    } finally {
      setBusy(false);
    }
  }

  async function toggle(it: Item) {
    await fetch("/api/admin/maths-974", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: it.id, masque: !it.masque }),
    });
    load();
  }

  async function remove(it: Item) {
    if (!confirm(`Supprimer « ${it.titre} » ?`)) return;
    await fetch("/api/admin/maths-974", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: it.id }),
    });
    load();
  }

  const field =
    "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200";
  const lbl = "block text-sm font-bold text-slate-700";

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-800">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-black text-slate-900">🌋 Capturer — maths en vrai 974</h1>
          <Link href="/maths-974" className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-bold text-slate-700">
            Voir la page →
          </Link>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Sur le terrain : une photo, quelques lignes, et c&apos;est en ligne.
        </p>

        <form ref={formRef} onSubmit={submit} className="mt-6 space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          {/* La vidéo YouTube est le cœur de chaque carte */}
          <div className="rounded-2xl border-2 border-cyan-200 bg-cyan-50/60 p-4">
            <label className={lbl}>🎬 Lien de ta vidéo YouTube *</label>
            <input name="youtube" type="url" inputMode="url" required placeholder="https://youtu.be/…  (vidéo ou Short)" className={`mt-1 ${field}`} />
            <p className="mt-1 text-xs text-slate-500">Colle le lien d&apos;une vidéo ou d&apos;un Short. Gratuit : la vidéo reste sur YouTube, on garde juste le lien — et ça envoie du trafic vers ta chaîne.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={lbl}>Lieu *</label>
              <input name="lieu" required placeholder="Piton de la Fournaise" className={`mt-1 ${field}`} />
            </div>
            <div>
              <label className={lbl}>Niveau</label>
              <input name="niveau" list="niveaux-974" placeholder="5e–4e" className={`mt-1 ${field}`} />
              <datalist id="niveaux-974">
                {NIVEAUX.map((n) => (
                  <option key={n} value={n} />
                ))}
              </datalist>
            </div>
          </div>

          <div>
            <label className={lbl}>Titre / accroche *</label>
            <input name="titre" required placeholder="Quand le volcan déborde…" className={`mt-1 ${field}`} />
          </div>

          <div>
            <label className={lbl}>Ce que je vois (la situation réelle) *</label>
            <textarea name="situation" required rows={3} placeholder="La lave avance sur la route…" className={`mt-1 ${field}`} />
          </div>

          <div>
            <label className={lbl}>La notion de maths cachée</label>
            <input name="notion" placeholder="Proportionnalité, débit, volume" className={`mt-1 ${field}`} />
          </div>

          <div>
            <label className={lbl}>🌺 Le brin de poésie (émerveillement, espoir, amour…)</label>
            <textarea name="emerveillement" rows={2} placeholder="Le volcan ne détruit pas : il fabrique de la terre neuve…" className={`mt-1 ${field}`} />
            <p className="mt-1 text-xs text-slate-400">L&apos;âme de la carte : pourquoi c&apos;est beau, ce que ça inspire.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={lbl}>Le mini-défi</label>
              <textarea name="question" rows={2} placeholder="La lave coule à 10 m³/s. Combien en 1 h ?" className={`mt-1 ${field}`} />
            </div>
            <div>
              <label className={lbl}>Le corrigé</label>
              <textarea name="reponse" rows={2} placeholder="10 × 3600 = 36 000 m³" className={`mt-1 ${field}`} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className={lbl}>Coach (classe)</label>
              <input name="coach_classe" list="niveaux-974" placeholder="5e" className={`mt-1 ${field}`} />
            </div>
            <div>
              <label className={lbl}>Latitude</label>
              <input name="lat" inputMode="decimal" placeholder="(plus tard)" className={`mt-1 ${field}`} />
            </div>
            <div>
              <label className={lbl}>Longitude</label>
              <input name="lng" inputMode="decimal" placeholder="(plus tard)" className={`mt-1 ${field}`} />
            </div>
          </div>

          {msg && (
            <p className={`rounded-xl px-3 py-2 text-sm font-bold ${msg.kind === "ok" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
              {msg.text}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-600 px-5 py-3 text-base font-black text-white shadow-lg disabled:opacity-50"
          >
            {busy ? "Publication…" : "Publier la capture"}
          </button>
        </form>

        {/* Captures déjà en ligne */}
        <h2 className="mt-8 text-lg font-black text-slate-900">{items.length} capture{items.length > 1 ? "s" : ""}</h2>
        <div className="mt-3 space-y-3">
          {items.map((it) => (
            <div key={it.id} className={`flex items-center gap-3 rounded-2xl border bg-white p-3 ${it.masque ? "border-slate-200 opacity-60" : "border-slate-200"}`}>
              {it.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.image_url} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-2xl">{it.youtube_id ? "🎬" : "📍"}</div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-slate-900">{it.titre}</p>
                <p className="truncate text-xs text-slate-500">{it.lieu}{it.niveau ? ` · ${it.niveau}` : ""}</p>
              </div>
              <button onClick={() => toggle(it)} className="rounded-full border border-slate-300 px-2.5 py-1 text-xs font-bold text-slate-600">
                {it.masque ? "Afficher" : "Masquer"}
              </button>
              <button onClick={() => remove(it)} className="rounded-full border border-red-200 px-2.5 py-1 text-xs font-bold text-red-600">
                Suppr.
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
