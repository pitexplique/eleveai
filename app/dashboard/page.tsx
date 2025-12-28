//app/dashboard/page.tsx

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type PresetRow = {
  id: string;
  title: string;
  classe: string | null;
  matiere: string | null;
  created_at: string;
};

type RunRow = {
  id: string;
  preset_id: string | null;
  classe: string | null;
  matiere: string | null;
  created_at: string;
};

export default function DashboardPage() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  const [presetCount, setPresetCount] = useState<number>(0);
  const [runCount, setRunCount] = useState<number>(0);
  const [recentPresets, setRecentPresets] = useState<PresetRow[]>([]);
  const [recentRuns, setRecentRuns] = useState<RunRow[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setErrorMsg(null);

      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) {
        router.push("/auth/signin");
        return;
      }

      setEmail(user.email ?? null);

      // Presets count
      const presetsCountRes = await supabase
        .from("presets_email")
        .select("id", { count: "exact", head: true });

      // Runs count
      const runsCountRes = await supabase
        .from("preset_runs_email")
        .select("id", { count: "exact", head: true });

      // Recent presets
      const presetsRes = await supabase
        .from("presets_email")
        .select("id,title,classe,matiere,created_at")
        .order("created_at", { ascending: false })
        .limit(6);

      // Recent runs
      const runsRes = await supabase
        .from("preset_runs_email")
        .select("id,preset_id,classe,matiere,created_at")
        .order("created_at", { ascending: false })
        .limit(8);

      if (!mounted) return;

      if (presetsCountRes.error || runsCountRes.error || presetsRes.error || runsRes.error) {
        setErrorMsg(
          presetsCountRes.error?.message ||
            runsCountRes.error?.message ||
            presetsRes.error?.message ||
            runsRes.error?.message ||
            "Erreur de chargement du dashboard."
        );
      } else {
        setPresetCount(presetsCountRes.count ?? 0);
        setRunCount(runsCountRes.count ?? 0);
        setRecentPresets((presetsRes.data ?? []) as PresetRow[]);
        setRecentRuns((runsRes.data ?? []) as RunRow[]);
      }

      setLoading(false);
    }

    load();
    return () => {
      mounted = false;
    };
  }, [router, supabase]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-300">
          Bienvenue {email ? <span className="font-semibold">{email}</span> : ""}.
        </p>

        {loading ? (
          <p className="mt-6 text-sm text-slate-300">Chargement…</p>
        ) : errorMsg ? (
          <p className="mt-6 text-sm text-red-300">{errorMsg}</p>
        ) : (
          <>
            {/* Cards */}
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                <p className="text-xs text-slate-400">Presets sauvegardés</p>
                <p className="mt-2 text-3xl font-bold">{presetCount}</p>
                <Link
                  href="/dashboard/presets"
                  className="mt-3 inline-flex text-sm font-semibold text-emerald-300 hover:text-emerald-200"
                >
                  Voir mes presets →
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                <p className="text-xs text-slate-400">Utilisations (historique)</p>
                <p className="mt-2 text-3xl font-bold">{runCount}</p>
                <Link
                  href="/dashboard/historique"
                  className="mt-3 inline-flex text-sm font-semibold text-sky-300 hover:text-sky-200"
                >
                  Voir l’historique →
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                <p className="text-xs text-slate-400">Compte</p>
                <p className="mt-2 text-sm text-slate-200">
                  Nom, type utilisateur, préférences…
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    href="/dashboard/compte"
                    className="rounded-xl border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-900"
                  >
                    Mon compte
                  </Link>
                  <Link
                    href="/dashboard/parametres"
                    className="rounded-xl border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-900"
                  >
                    Paramètres
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent lists */}
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Presets récents</h2>
                  <Link href="/dashboard/presets" className="text-sm text-slate-300 hover:text-slate-100">
                    Tout voir
                  </Link>
                </div>

                <div className="mt-4 space-y-2">
                  {recentPresets.length === 0 ? (
                    <p className="text-sm text-slate-300">Aucun preset pour l’instant.</p>
                  ) : (
                    recentPresets.map((p) => (
                      <div key={p.id} className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                        <p className="font-semibold">{p.title}</p>
                        <p className="mt-1 text-xs text-slate-400">
                          {p.classe ?? "—"} • {p.matiere ?? "—"} • {new Date(p.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Historique récent</h2>
                  <Link href="/dashboard/historique" className="text-sm text-slate-300 hover:text-slate-100">
                    Tout voir
                  </Link>
                </div>

                <div className="mt-4 space-y-2">
                  {recentRuns.length === 0 ? (
                    <p className="text-sm text-slate-300">Aucune utilisation pour l’instant.</p>
                  ) : (
                    recentRuns.map((r) => (
                      <div key={r.id} className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                        <p className="text-sm text-slate-200">
                          {r.classe ?? "—"} • {r.matiere ?? "—"}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {new Date(r.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
