"use client";

import { useCallback, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CLASSES, MATIERES } from "@/lib/constants/scolaire";

// ⚠️ recopie exactement tes 2 niveaux
type Niveau = "basique" | "standard";

// ✅ même type que dans espace profs (version simple)
type DbPresetEleveai = {
  id: string;
  created_at: string;
  updated_at: string;
  audience: string; // "profs"
  classe: string;
  matiere: string;
  niveau: string; // "basique" | "standard"
  title: string;
  description: string;
  tags: string[];
  is_featured: boolean;
  featured_rank: number | null;
  payload: any;
  is_archived: boolean;
};

export default function PresetsClient() {
  const supabase = useMemo(() => createClient(), []);

  const [classe, setClasse] = useState<string>("");
  const [matiere, setMatiere] = useState<string>("");
  const [niveau, setNiveau] = useState<Niveau | "">(""); // ✅ ici on autorise "non choisi"

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [rows, setRows] = useState<DbPresetEleveai[]>([]);

const load = useCallback(async () => {
  setError("");
  setRows([]);
  setLoading(true);

  try {
    // 🔍 DEBUG AUTH
    const { data: authData, error: authErr } = await supabase.auth.getUser();
    console.log("[presets] auth user =", authData?.user ?? null, "authErr =", authErr ?? null);

    // ✅ REQUÊTE LA PLUS SIMPLE POSSIBLE
    const { data, error } = await supabase
      .from("presets_eleveai")
      .select(
        "id, audience, classe, matiere, niveau, title, is_archived"
      )
      .limit(10);

    console.log("[presets] RAW DATA =", data);
    console.log("[presets] ERROR =", error);

    if (error) throw new Error(error.message);

    setRows((data ?? []) as DbPresetEleveai[]);
  } catch (e: any) {
    console.error("[presets] catch =", e);
    setError(e?.message || "Erreur chargement.");
  } finally {
    setLoading(false);
  }
}, [supabase]);


  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-extrabold text-[#0047B6]">/presets — Debug presets_eleveai</h1>
          <p className="text-sm text-slate-700">
            Page de test : filtres + affichage brut des lignes.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Classe */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Classe</label>
              <select
                value={classe}
                onChange={(e) => setClasse(e.target.value)}
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
              <label className="text-xs font-semibold text-slate-600">Matière</label>
              <select
                value={matiere}
                onChange={(e) => setMatiere(e.target.value)}
                className="w-full h-11 border border-slate-200 rounded-xl px-3 bg-white"
              >
                <option value="">Choisir…</option>
                {MATIERES.map((m) => (
                  <option key={`${m.value}-${m.label}`} value={m.value} disabled={!!m.disabled}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Niveau */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Niveau (optionnel)</label>
              <select
                value={niveau}
                onChange={(e) => setNiveau(e.target.value as any)}
                className="w-full h-11 border border-slate-200 rounded-xl px-3 bg-white"
              >
                <option value="">(Tous)</option>
                <option value="basique">Basique</option>
                <option value="standard">Standard</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={load}
              disabled={loading}
              className={`px-4 py-2 rounded-xl font-semibold text-sm ${
                loading ? "bg-slate-200 text-slate-500" : "bg-[#0047B6] text-white hover:bg-[#003894]"
              }`}
            >
              {loading ? "Chargement..." : "Charger"}
            </button>

            <div className="text-xs text-slate-600">
              Filtre DB : audience="profs" + classe + matière {niveau ? `+ niveau=${niveau}` : "+ (tous niveaux)"}
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 font-semibold">
              ⚠️ {error}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-extrabold text-slate-900">Résultats</h2>
            <span className="text-xs font-semibold text-slate-600">{rows.length} ligne(s)</span>
          </div>

          {rows.length === 0 ? (
            <p className="text-sm text-slate-600">Aucune ligne.</p>
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
                    <th className="p-2">archived</th>
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
                      <td className="p-2">{String(r.is_archived)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2">
          <h3 className="font-extrabold">À vérifier si 0 résultat</h3>
          <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
            <li>RLS : si la table a RLS sans policy SELECT, Supabase renvoie souvent data=[] sans erreur.</li>
            <li>Valeurs exactes : classe doit être exactement “6e” (pas “6ème”).</li>
            <li>Audience doit être “profs”.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
