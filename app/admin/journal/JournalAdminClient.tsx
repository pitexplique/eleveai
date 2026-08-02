"use client";

// LA RÉGIE DU RÉDACTEUR EN CHEF — édition des slides de la Une du journal
// (carrousel de l'accueil). CRUD complet sur journal_une via /api/admin/journal.
// Philosophie : Frédéric édite ici, l'assistant édite en base — même table.

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

type Slide = {
  id: string;
  kicker: string;
  titre: string;
  accroche: string | null;
  youtube_id: string | null;
  image_url: string | null;
  lien: string;
  cta: string;
  defi: string | null;
  actif: boolean;
  ordre: number;
  /** À qui le slide s'adresse — l'une des 8 options de « Qui est-ce ? ». */
  niveau_mini: string | null;
};

// Les huit options du sélecteur de l'accueil. Les quatre cycles sont des
// SEUILS (« à partir de »), les quatre profils adultes sont des CIBLES.
// ⚠️ À garder aligné sur la contrainte CHECK de journal_une ET sur ORDRE_CYCLES
// / PROFIL_ADULTE dans AccueilClient : une valeur hors liste est rejetée en
// base avec un 23514.
const NIVEAUX: { v: string; label: string }[] = [
  { v: "", label: "Tout le monde (aucun garde-fou)" },
  { v: "cp-ce2", label: "À partir du CP–CE2" },
  { v: "cm1-cm2", label: "À partir du CM1–CM2" },
  { v: "6e-3e", label: "À partir de la 6ᵉ–3ᵉ" },
  { v: "lycee", label: "Lycée seulement" },
  { v: "parent", label: "Pour les parents" },
  { v: "prof", label: "Pour les professeurs" },
  { v: "etablissement", label: "Pour les établissements" },
  { v: "entreprise", label: "Pour les entreprises" },
];

const VIDE: Omit<Slide, "id"> = {
  kicker: "Réfléchir · En vrai, à La Réunion",
  titre: "",
  accroche: "",
  youtube_id: "",
  image_url: "",
  lien: "",
  cta: "Lire →",
  defi: "",
  actif: true,
  ordre: 100,
  niveau_mini: "",
};

function vignette(s: { youtube_id?: string | null; image_url?: string | null }) {
  if (s.youtube_id) return `https://i.ytimg.com/vi/${s.youtube_id}/mqdefault.jpg`;
  return s.image_url || null;
}

export default function JournalAdminClient() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");
  const [info, setInfo] = useState("");
  const [nouveau, setNouveau] = useState({ ...VIDE });
  const [enCours, setEnCours] = useState<string | null>(null);

  const charger = useCallback(async () => {
    setChargement(true);
    setErreur("");
    try {
      const res = await fetch("/api/admin/journal");
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Erreur de chargement.");
      setSlides(data.items);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Erreur de chargement.");
    } finally {
      setChargement(false);
    }
  }, []);

  useEffect(() => {
    charger();
  }, [charger]);

  function majLocal(id: string, patch: Partial<Slide>) {
    setSlides((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  async function sauver(s: Slide) {
    setEnCours(s.id);
    setErreur("");
    setInfo("");
    try {
      const res = await fetch("/api/admin/journal", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(s),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Échec de l'enregistrement.");
      majLocal(s.id, data.item);
      setInfo(`« ${data.item.titre} » enregistré ✓`);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Échec de l'enregistrement.");
    } finally {
      setEnCours(null);
    }
  }

  async function basculer(s: Slide) {
    setEnCours(s.id);
    setErreur("");
    try {
      const res = await fetch("/api/admin/journal", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: s.id, actif: !s.actif }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Échec.");
      majLocal(s.id, { actif: data.item.actif });
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Échec.");
    } finally {
      setEnCours(null);
    }
  }

  async function supprimer(s: Slide) {
    if (!window.confirm(`Supprimer le slide « ${s.titre} » ? (définitif)`)) return;
    setEnCours(s.id);
    setErreur("");
    try {
      const res = await fetch("/api/admin/journal", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: s.id }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Échec de la suppression.");
      setSlides((prev) => prev.filter((x) => x.id !== s.id));
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Échec de la suppression.");
    } finally {
      setEnCours(null);
    }
  }

  async function creer(e: React.FormEvent) {
    e.preventDefault();
    setEnCours("nouveau");
    setErreur("");
    setInfo("");
    try {
      const res = await fetch("/api/admin/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nouveau),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Échec de la création.");
      setSlides((prev) =>
        [...prev, data.item].sort((a, b) => a.ordre - b.ordre)
      );
      setNouveau({ ...VIDE });
      setInfo(`« ${data.item.titre} » ajouté à la Une ✓`);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Échec de la création.");
    } finally {
      setEnCours(null);
    }
  }

  const inputCls =
    "w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-900 outline-none focus:border-emerald-500";
  const labelCls = "text-[11px] font-black uppercase tracking-wide text-slate-500";

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
              🗞️ La régie du rédacteur en chef
            </p>
            <h1 className="mt-1 text-2xl font-black">La Une du journal — le carrousel</h1>
            <p className="mt-1 text-sm font-medium text-slate-600">
              Les slides actifs défilent en Une de l&apos;accueil, dans l&apos;ordre.
              Modifier ici = publié immédiatement (au prochain rechargement de la page).
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/accueil"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-black text-white transition hover:bg-slate-700"
            >
              Voir la Une →
            </Link>
            <Link
              href="/admin/dashboard"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              ← Dashboard
            </Link>
          </div>
        </div>

        {erreur && (
          <p className="mt-4 rounded-xl border border-red-300 bg-red-50 p-3 text-sm font-bold text-red-700">
            {erreur}
          </p>
        )}
        {info && (
          <p className="mt-4 rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-sm font-bold text-emerald-700">
            {info}
          </p>
        )}

        {/* ── Nouveau slide ─────────────────────────────────────────────── */}
        <form
          onSubmit={creer}
          className="mt-6 rounded-2xl border border-emerald-300 bg-white p-4 shadow-sm sm:p-5"
        >
          <p className="text-sm font-black text-emerald-700">➕ Nouveau slide</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <p className={labelCls}>Titre *</p>
              <input
                required
                value={nouveau.titre}
                onChange={(e) => setNouveau({ ...nouveau, titre: e.target.value })}
                placeholder="Le lagon : un récif qui te protège"
                className={inputCls}
              />
            </div>
            <div>
              <p className={labelCls}>Lien du CTA * (interne /… ou https://…)</p>
              <input
                required
                value={nouveau.lien}
                onChange={(e) => setNouveau({ ...nouveau, lien: e.target.value })}
                placeholder="/defis-du-jour ou https://youtu.be/…"
                className={inputCls}
              />
            </div>
            <div className="sm:col-span-2">
              <p className={labelCls}>Accroche (le chapô)</p>
              <textarea
                value={nouveau.accroche ?? ""}
                onChange={(e) => setNouveau({ ...nouveau, accroche: e.target.value })}
                rows={2}
                className={inputCls}
              />
            </div>
            <div>
              <p className={labelCls}>YouTube (URL ou ID — vignette auto)</p>
              <input
                value={nouveau.youtube_id ?? ""}
                onChange={(e) => setNouveau({ ...nouveau, youtube_id: e.target.value })}
                placeholder="https://youtu.be/…"
                className={inputCls}
              />
            </div>
            <div>
              <p className={labelCls}>OU image (URL publique)</p>
              <input
                value={nouveau.image_url ?? ""}
                onChange={(e) => setNouveau({ ...nouveau, image_url: e.target.value })}
                placeholder="/images/… ou https://…"
                className={inputCls}
              />
            </div>
            <div>
              <p className={labelCls}>Surtitre (kicker)</p>
              <input
                value={nouveau.kicker}
                onChange={(e) => setNouveau({ ...nouveau, kicker: e.target.value })}
                className={inputCls}
              />
            </div>
            <div className="sm:col-span-2">
              <p className={labelCls}>À qui ce slide s&apos;adresse</p>
              <select
                value={nouveau.niveau_mini ?? ""}
                onChange={(e) => setNouveau({ ...nouveau, niveau_mini: e.target.value })}
                className={inputCls}
              >
                {NIVEAUX.map((n) => (
                  <option key={n.v} value={n.v}>
                    {n.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-slate-500">
                Un cycle est un seuil : « à partir du CM1 » se voit aussi au
                lycée. Un profil adulte est une cible : « pour les
                professeurs » ne se voit que par eux. Laissé sur « tout le
                monde », le slide passe partout.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className={labelCls}>Texte du CTA</p>
                <input
                  value={nouveau.cta}
                  onChange={(e) => setNouveau({ ...nouveau, cta: e.target.value })}
                  className={inputCls}
                />
              </div>
              <div>
                <p className={labelCls}>Ordre</p>
                <input
                  type="number"
                  value={nouveau.ordre}
                  onChange={(e) => setNouveau({ ...nouveau, ordre: Number(e.target.value) })}
                  className={inputCls}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <p className={labelCls}>Ligne défi 🎯 (optionnelle)</p>
              <input
                value={nouveau.defi ?? ""}
                onChange={(e) => setNouveau({ ...nouveau, defi: e.target.value })}
                placeholder="la proportionnalité — 3 000 m² de canne, combien de sucre ?"
                className={inputCls}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={enCours === "nouveau"}
            className="mt-4 rounded-full bg-emerald-600 px-5 py-2 text-sm font-black text-white transition hover:bg-emerald-500 disabled:opacity-60"
          >
            {enCours === "nouveau" ? "…" : "Publier à la Une →"}
          </button>
        </form>

        {/* ── Les slides existants ──────────────────────────────────────── */}
        {chargement ? (
          <p className="mt-6 text-sm font-bold text-slate-500">Chargement…</p>
        ) : (
          <div className="mt-6 space-y-4">
            {slides.map((s) => {
              const img = vignette(s);
              return (
                <div
                  key={s.id}
                  className={`rounded-2xl border bg-white p-4 shadow-sm sm:p-5 ${
                    s.actif ? "border-slate-200" : "border-dashed border-slate-300 opacity-60"
                  }`}
                >
                  <div className="flex flex-wrap items-start gap-4">
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={img}
                        alt=""
                        className="h-20 w-36 shrink-0 rounded-lg border border-slate-200 object-cover"
                      />
                    ) : (
                      <div className="flex h-20 w-36 shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-300 text-2xl">
                        🗞️
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-black text-slate-600">
                          ordre {s.ordre}
                        </span>
                        <span
                          className={`rounded px-2 py-0.5 text-xs font-black ${
                            s.actif ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          {s.actif ? "EN UNE" : "masqué"}
                        </span>
                      </div>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        <input
                          value={s.titre}
                          onChange={(e) => majLocal(s.id, { titre: e.target.value })}
                          className={inputCls}
                          aria-label="Titre"
                        />
                        <input
                          value={s.lien}
                          onChange={(e) => majLocal(s.id, { lien: e.target.value })}
                          className={inputCls}
                          aria-label="Lien"
                        />
                        <textarea
                          value={s.accroche ?? ""}
                          onChange={(e) => majLocal(s.id, { accroche: e.target.value })}
                          rows={2}
                          className={`${inputCls} sm:col-span-2`}
                          aria-label="Accroche"
                          placeholder="Accroche"
                        />
                        <input
                          value={s.youtube_id ?? ""}
                          onChange={(e) => majLocal(s.id, { youtube_id: e.target.value })}
                          className={inputCls}
                          aria-label="YouTube"
                          placeholder="YouTube (URL ou ID)"
                        />
                        <input
                          value={s.image_url ?? ""}
                          onChange={(e) => majLocal(s.id, { image_url: e.target.value })}
                          className={inputCls}
                          aria-label="Image"
                          placeholder="Image (URL)"
                        />
                        <input
                          value={s.kicker}
                          onChange={(e) => majLocal(s.id, { kicker: e.target.value })}
                          className={inputCls}
                          aria-label="Surtitre"
                          placeholder="Surtitre"
                        />
                        <select
                          value={s.niveau_mini ?? ""}
                          onChange={(e) => majLocal(s.id, { niveau_mini: e.target.value })}
                          className={inputCls}
                          aria-label="À qui ce slide s'adresse"
                        >
                          {NIVEAUX.map((n) => (
                            <option key={n.v} value={n.v}>
                              {n.label}
                            </option>
                          ))}
                        </select>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            value={s.cta}
                            onChange={(e) => majLocal(s.id, { cta: e.target.value })}
                            className={inputCls}
                            aria-label="CTA"
                            placeholder="CTA"
                          />
                          <input
                            type="number"
                            value={s.ordre}
                            onChange={(e) => majLocal(s.id, { ordre: Number(e.target.value) })}
                            className={inputCls}
                            aria-label="Ordre"
                          />
                        </div>
                        <input
                          value={s.defi ?? ""}
                          onChange={(e) => majLocal(s.id, { defi: e.target.value })}
                          className={`${inputCls} sm:col-span-2`}
                          aria-label="Défi"
                          placeholder="Ligne défi 🎯 (optionnelle)"
                        />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => sauver(s)}
                          disabled={enCours === s.id}
                          className="rounded-full bg-slate-900 px-4 py-1.5 text-sm font-black text-white transition hover:bg-slate-700 disabled:opacity-60"
                        >
                          {enCours === s.id ? "…" : "Enregistrer"}
                        </button>
                        <button
                          type="button"
                          onClick={() => basculer(s)}
                          disabled={enCours === s.id}
                          className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                        >
                          {s.actif ? "Masquer" : "Remettre en Une"}
                        </button>
                        <button
                          type="button"
                          onClick={() => supprimer(s)}
                          disabled={enCours === s.id}
                          className="rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-sm font-black text-red-700 transition hover:bg-red-100 disabled:opacity-60"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {slides.length === 0 && (
              <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm font-bold text-slate-500">
                Aucun slide en base — la Une affiche les 6 épisodes par défaut.
                Exécute <code className="rounded bg-slate-100 px-1.5 py-0.5">supabase/journal_une.sql</code>{" "}
                pour démarrer la régie.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
