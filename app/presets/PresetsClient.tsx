// app/presets/PresetsClient.tsx
// app/presets/PresetsClient.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  CLASSES,
  MATIERES,
  ClasseValue,
  MatiereValue,
} from "@/lib/constants/scolaire";

type Niveau = "ulis" | "remediation" | "basique" | "standard" | "expert";
type Audience = "profs" | "eleves" | "parents" | "admin" | "viescolaire";

type DbPresetEleveai = {
  id: string;
  created_at?: string;
  audience: Audience;
  classe: string;
  matiere: string;
  niveau: Niveau;
  title: string;
  tags: string[];
  is_featured: boolean;
  featured_rank: number | null;
  is_archived: boolean;
};

function escapeForOr(v: string) {
  // PostgREST .or(...) n'aime pas les virgules et certains caractères.
  // On nettoie "soft" : on évite les caractères qui cassent la grammaire.
  return v
    .replaceAll(",", " ")
    .replaceAll("(", " ")
    .replaceAll(")", " ")
    .replaceAll('"', " ")
    .trim();
}

export default function PresetsClient() {
  const supabase = useMemo(() => createClient(), []);

  // ✅ (optionnel) : types plus stricts, sans impact CSS/HTML
  const [classe, setClasse] = useState<ClasseValue | "">("");
  const [matiere, setMatiere] = useState<MatiereValue | "">("");
  const [niveau, setNiveau] = useState<Niveau | "">("");
  const [search, setSearch] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [rows, setRows] = useState<DbPresetEleveai[]>([]);

  // ✅ compteur “marketing” (filtré, sans search)
  const [availableCount, setAvailableCount] = useState<number | null>(null);

  // ✅ compteur total base (non filtré, toutes audiences, archivés inclus)
  const [totalDbCount, setTotalDbCount] = useState<number | null>(null);

  const load = useCallback(async () => {
    setError("");
    setLoading(true);

    try {
      let q = supabase
        .from("presets_eleveai")
        .select(
          "id, audience, classe, matiere, niveau, title, tags, is_featured, featured_rank, is_archived, created_at"
        )
        .eq("audience", "profs")
        .eq("is_archived", false);

      // filtres
      if (classe) q = q.eq("classe", classe);
      if (matiere) q = q.eq("matiere", matiere);
      if (niveau) q = q.eq("niveau", niveau);

      // search
      const raw = search.trim();
      if (raw) {
        if (raw.startsWith("#")) {
          // si tes tags sont stockés AVEC '#', garde raw
          // sinon: const tag = raw.slice(1)
          const tag = raw;
          q = q.contains("tags", [tag]);
        } else {
          // 👉 recommandé: recherche sur title + (optionnel) tags via contains exact si tu veux
          // Ici on reste simple et safe.
          const s = escapeForOr(raw);

          // Option A (recommandée, robuste) : uniquement sur title
          q = q.ilike("title", `%${s}%`);

          // Option B (si tu veux absolument OR sur plusieurs champs, plus fragile) :
          // q = q.or(`title.ilike.%${s}%`);
        }
      }

      const { data, error } = await q
        .order("is_featured", { ascending: false })
        .order("featured_rank", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw new Error(error.message);

      setRows((data ?? []) as DbPresetEleveai[]);
    } catch (e: any) {
      setError(e?.message || "Erreur chargement.");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [supabase, classe, matiere, niveau, search]);

  // ✅ Count marketing (filtré, sans search)
  const loadCount = useCallback(async () => {
    try {
      let q = supabase
        .from("presets_eleveai")
        .select("id", { count: "exact", head: true })
        .eq("audience", "profs")
        .eq("is_archived", false);

      if (classe) q = q.eq("classe", classe);
      if (matiere) q = q.eq("matiere", matiere);
      if (niveau) q = q.eq("niveau", niveau);

      const { count, error } = await q;
      if (error) throw error;

      setAvailableCount(count ?? 0);
    } catch (e) {
      console.warn("[presets] count error", e);
      setAvailableCount(null);
    }
  }, [supabase, classe, matiere, niveau]);

  // ✅ Count total DB (non filtré, ne dépend de rien)
  const loadTotalDbCount = useCallback(async () => {
    try {
      const { count, error } = await supabase
        .from("presets_eleveai")
        .select("id", { count: "exact", head: true });

      if (error) throw error;

      setTotalDbCount(count ?? 0);
    } catch (e) {
      console.warn("[presets] totalDbCount error", e);
      setTotalDbCount(null);
    }
  }, [supabase]);

  // ✅ Charger le total DB une seule fois au montage
  useEffect(() => {
    loadTotalDbCount();
  }, [loadTotalDbCount]);

  // ✅ Auto-load (debounce) : résultats + compteur marketing
  useEffect(() => {
    const t = setTimeout(() => {
      load();
      loadCount();
    }, 300);

    return () => clearTimeout(t);
  }, [load, loadCount]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-2xl font-extrabold text-[#0047B6]">
            EleveAI — Presets officiels
          </h1>
          <p className="text-sm text-slate-700">
            Page de test : filtres + affichage brut des lignes.
          </p>
        </header>

        {/* Filtres */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Classe */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">
                Classe
              </label>
              <select
                value={classe}
                onChange={(e) => setClasse(e.target.value as ClasseValue | "")}
                className="w-full h-11 border border-slate-200 rounded-xl px-3 bg-white"
              >
                <option value="">Choisir…</option>
                {CLASSES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Matière */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">
                Matière
              </label>
              <select
                value={matiere}
                onChange={(e) =>
                  setMatiere(e.target.value as MatiereValue | "")
                }
                className="w-full h-11 border border-slate-200 rounded-xl px-3 bg-white"
              >
                <option value="">Choisir…</option>
                {MATIERES.map((m) => (
                  <option
                    key={`${m.value}-${m.label}`}
                    value={m.value}
                    disabled={!!m.disabled}
                  >
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Niveau */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">
                Niveau (optionnel)
              </label>
              <select
                value={niveau}
                onChange={(e) => setNiveau(e.target.value as Niveau | "")}
                className="w-full h-11 border border-slate-200 rounded-xl px-3 bg-white"
              >
                <option value="">(Tous)</option>
                <option value="basique">Basique</option>
                <option value="standard">Standard</option>
                <option value="remediation">Remédiation</option>
                <option value="expert">Expert</option>
                <option value="ulis">ULIS</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 font-semibold">
              ⚠️ {error}
            </div>
          )}
        </section>

        {/* Résultats */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4">
          {/* Bloc marketing + total DB */}
          <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-4">
              {/* Gauche : marketing (filtré) */}
              <div>
                <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Bibliothèque
                </div>

                <div className="mt-1 text-3xl font-extrabold text-slate-900">
                  {availableCount === null
                    ? "—"
                    : availableCount.toLocaleString("fr-FR")}
                </div>
                <div className="text-sm text-slate-700">
                  presets EleveAI officiels disponibles
                </div>

                <div className="mt-2 text-xs text-slate-600">
                  Classe : <b>{classe || "Toutes"}</b> · Matière :{" "}
                  <b>{matiere || "Toutes"}</b> · Niveau :{" "}
                  <b>{niveau || "Tous"}</b>
                </div>
              </div>

              {/* Droite : total DB */}
              <div className="text-right">
                <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Base de données
                </div>

                <div className="mt-1 text-3xl font-extrabold text-slate-900">
                  {totalDbCount === null
                    ? "—"
                    : totalDbCount.toLocaleString("fr-FR")}
                </div>
                <div className="text-sm text-slate-700">
                  lignes totales dans presets_eleveai
                </div>

                <div className="mt-2 text-xs text-slate-500">
                  (toutes audiences, archivés inclus)
                </div>
              </div>
            </div>
          </div>

          {/* Titre + recherche */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <h2 className="font-extrabold text-slate-900">Résultats</h2>
              <span className="text-xs font-semibold text-slate-600">
                {loading ? "Chargement…" : `${rows.length} ligne(s)`}
              </span>
            </div>

            <div className="w-full sm:w-96">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Rechercher (titre…) ou "#tag"'
                className="w-full h-11 rounded-xl border border-slate-200 px-3 text-sm bg-white
                           focus:outline-none focus:ring-2 focus:ring-[#0047B6]/30"
              />
              <p className="mt-1 text-xs text-slate-500">
                Astuce : tape <span className="font-mono">#chapitre_...</span>{" "}
                pour filtrer par tag exact.
              </p>
            </div>
          </div>

          {/* Tableau */}
          {rows.length === 0 ? (
            <p className="text-sm text-slate-600">
              {loading ? "Chargement…" : "Aucune ligne."}
            </p>
          ) : (
            <div className="overflow-auto border rounded-xl">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50">
                  <tr className="text-left">
                    <th className="p-2">title</th>
                    <th className="p-2">classe</th>
                    <th className="p-2">matiere</th>
                    <th className="p-2">niveau</th>
                    <th className="p-2">featured</th>
                    <th className="p-2">rank</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-t">
                      <td className="p-2 font-semibold">{r.title}</td>
                      <td className="p-2">{r.classe}</td>
                      <td className="p-2">{r.matiere}</td>
                      <td className="p-2">{r.niveau}</td>
                      <td className="p-2">{String(r.is_featured)}</td>
                      <td className="p-2">{r.featured_rank ?? ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Aide / Cadre EleveAI */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 space-y-4">
          <h3 className="font-extrabold text-slate-900">
            À propos des presets EleveAI
          </h3>

          <div>
            <h4 className="flex items-center gap-2 font-semibold text-emerald-700">
              <span aria-hidden>✔</span>
              Ce que font les presets
            </h4>
            <ul className="mt-1 text-sm text-slate-700 list-disc pl-5 space-y-1">
              <li>
                Structurent une activité conforme aux programmes officiels (BO).
              </li>
              <li>
                Guident l’élève pas à pas dans le raisonnement et la méthode.
              </li>
              <li>
                Font gagner du temps au professeur sans perte de maîtrise
                pédagogique.
              </li>
              <li>
                Encouragent la justification, l’explicitation et la trace écrite.
              </li>
              <li>
                Intègrent des méthodes visuelles (ex. Singapour / CPA) lorsque
                pertinent.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="flex items-center gap-2 font-semibold text-rose-700">
              <span aria-hidden>✖</span>
              Ce que les presets ne font pas
            </h4>
            <ul className="mt-1 text-sm text-slate-700 list-disc pl-5 space-y-1">
              <li>Ne font pas les exercices à la place de l’élève.</li>
              <li>Ne fournissent pas de corrigé clé en main sans réflexion.</li>
              <li>Ne remplacent ni le professeur, ni sa pédagogie.</li>
              <li>Ne sont pas des générateurs automatiques de réponses.</li>
              <li>Ne court-circuitent pas l’apprentissage ou l’évaluation.</li>
            </ul>
          </div>

          <div className="flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
            <span className="mt-0.5 text-slate-500" aria-hidden>
              ℹ️
            </span>
            <p>
              <strong>IA encadrée :</strong> les presets EleveAI proposent un
              cadre clair, des consignes guidées et des attentes explicites.
              L’intelligence artificielle accompagne la réflexion, sans jamais
              se substituer au travail de l’élève.
            </p>
          </div>

          <p className="pt-2 text-xs italic text-slate-600 border-t border-slate-100">
            EleveAI — Une IA pédagogique encadrée, au service des apprentissages,
            du professeur et de l’autonomie de l’élève.
          </p>
        </section>
      </div>
    </main>
  );
}

