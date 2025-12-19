"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ParametresPage() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [modeAntiTriche, setModeAntiTriche] = useState(true);

  useEffect(() => {
    async function guard() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/auth/signin");
        return;
      }
      setLoading(false);
    }
    guard();
  }, [router, supabase]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-bold">Paramètres</h1>
        <p className="mt-1 text-sm text-slate-300">
          Préférences personnelles (V1 : sauvegarde en base).
        </p>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          {loading ? (
            <p className="text-sm text-slate-300">Chargement…</p>
          ) : (
            <>
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold">Mode anti-triche</p>
                    <p className="mt-1 text-sm text-slate-300">
                      Ajoute automatiquement une consigne “cadre scolaire” dans tes prompts.
                    </p>
                  </div>

                  <button
                    onClick={() => setModeAntiTriche((v) => !v)}
                    className={`relative h-8 w-14 rounded-full border transition ${
                      modeAntiTriche
                        ? "border-emerald-400/60 bg-emerald-500/20"
                        : "border-slate-700 bg-slate-950/40"
                    }`}
                    aria-pressed={modeAntiTriche}
                  >
                    <span
                      className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
                        modeAntiTriche ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="mt-3 text-xs text-slate-400">
                  Valeur actuelle :{" "}
                  <span className="font-semibold text-slate-200">
                    {modeAntiTriche ? "Activé" : "Désactivé"}
                  </span>
                  <span className="ml-2">(V0 : local)</span>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                <p className="font-semibold">À venir (V1)</p>
                <ul className="mt-2 list-disc list-inside text-sm text-slate-300 space-y-1">
                  <li>Sauvegarde des paramètres en base (par utilisateur)</li>
                  <li>Préférences de ton (bienveillant / strict / coach)</li>
                  <li>Notifications (emails)</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
