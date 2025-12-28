//app/dashboard/abonnement/page.tsx

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AbonnementPage() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
        <h1 className="text-2xl font-bold">Abonnement</h1>
        <p className="mt-1 text-sm text-slate-300">
          (V1 : intégration Stripe + plan actuel + gestion quota)
        </p>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          {loading ? (
            <p className="text-sm text-slate-300">Chargement…</p>
          ) : (
            <>
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                <p className="text-xs text-slate-400">Plan actuel</p>
                <p className="mt-1 text-lg font-semibold">Découverte (V0)</p>
                <p className="mt-2 text-sm text-slate-300">
                  Stripe arrive en semaine 2/3 : checkout + webhook + statut plan.
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => alert("V1 : ouvrir Stripe Checkout")}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
                >
                  Passer à Premium
                </button>
                <button
                  onClick={() => alert("V1 : voir facture / portail Stripe")}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-900"
                >
                  Gérer mon abonnement
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
