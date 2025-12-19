"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type RunRow = {
  id: string;
  preset_id: string | null;
  classe: string | null;
  matiere: string | null;
  created_at: string;
};

export default function HistoriquePage() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<RunRow[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [classe, setClasse] = useState("");
  const [matiere, setMatiere] = useState("");

  async function load() {
    setLoading(true);
    setErrorMsg(null);

    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      router.push("/auth/signin");
      return;
    }

    let q = supabase
      .from("preset_runs_email")
      .select("id,preset_id,classe,matiere,created_at")
      .order("created_at", { ascending: false })
      .limit(200);

    if (classe.trim()) q = q.eq("classe", classe.trim());
    if (matiere.trim()) q = q.eq("matiere", matiere.trim());

    const { data, error } = await q;

    if (error) setErrorMsg(error.message || "Erreur de chargement.");
    setRows((data ?? []) as RunRow[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Historique</h1>
            <p className="mt-1 text-sm text-slate-300">
              Dernières utilisations (V1 : pagination + lien vers preset).
            </p>
          </div>

          <button
            onClick={load}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-900"
          >
            Actualiser
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <label className="text-xs text-slate-400">Classe</label>
              <input
                value={classe}
                onChange={(e) => setClasse(e.target.value)}
                placeholder='ex: "6e"'
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Matière</label>
              <input
                value={matiere}
                onChange={(e) => setMatiere(e.target.value)}
                placeholder='ex: "Maths"'
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={load}
                className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
              >
                Filtrer
              </button>
              <button
                onClick={() => {
                  setClasse("");
                  setMatiere("");
                  setTimeout(load, 0);
                }}
                className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-900"
              >
                Reset
              </button>
            </div>
          </div>

          {errorMsg && <p className="mt-4 text-sm text-red-300">{errorMsg}</p>}
          {loading ? (
            <p className="mt-4 text-sm text-slate-300">Chargement…</p>
          ) : rows.length === 0 ? (
            <p className="mt-4 text-sm text-slate-300">Aucune utilisation.</p>
          ) : (
            <div className="mt-4 space-y-2">
              {rows.map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl border border-slate-800 bg-slate-950/40 p-3"
                >
                  <p className="text-sm text-slate-200">
                    {r.classe ?? "—"} • {r.matiere ?? "—"}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {new Date(r.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
