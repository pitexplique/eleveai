"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Profil = {
  id: number;
  auth_user_id: string;
  email: string;
  nom: string | null;
  type_utilisateur: string | null;
  accepte_cgv: boolean | null;
  accepte_newsletter: boolean | null;
  created_at: string;
  updated_at: string | null;
};

const TYPES = ["prof", "eleve", "parent", "admin"] as const;

export default function ComptePage() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [profil, setProfil] = useState<Profil | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

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

      const { data, error } = await supabase
        .from("eleveai_users_email")
        .select(
          "id, auth_user_id, email, nom, type_utilisateur, accepte_cgv, accepte_newsletter, created_at, updated_at"
        )
        .eq("auth_user_id", user.id)
        .maybeSingle();

      if (!mounted) return;

      if (error) {
        setErrorMsg(error.message || "Impossible de charger votre profil.");
        setProfil(null);
      } else {
        setProfil(data as Profil);
      }

      setLoading(false);
    }

    load();
    return () => {
      mounted = false;
    };
  }, [router, supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/accueil");
  }

  async function saveType(type: string) {
    if (!profil) return;
    setSaving(true);
    setErrorMsg(null);

    const { error } = await supabase
      .from("eleveai_users_email")
      .update({ type_utilisateur: type, updated_at: new Date().toISOString() })
      .eq("id", profil.id);

    if (error) {
      setErrorMsg(error.message || "Impossible d’enregistrer.");
      setSaving(false);
      return;
    }

    setProfil({ ...profil, type_utilisateur: type, updated_at: new Date().toISOString() });
    setSaving(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-bold">Mon compte</h1>
        <p className="mt-1 text-sm text-slate-300">
          Profil EleveAI lié à votre connexion email (OTP).
        </p>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          {loading ? (
            <p className="text-sm text-slate-300">Chargement…</p>
          ) : errorMsg ? (
            <p className="text-sm text-red-300">{errorMsg}</p>
          ) : !profil ? (
            <p className="text-sm text-slate-300">Aucun profil trouvé.</p>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-400">Nom</p>
                  <p className="mt-1 font-semibold">{profil.nom ?? "—"}</p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="mt-1 font-semibold break-all">{profil.email}</p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-400">Type utilisateur</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {TYPES.map((t) => {
                      const active = profil.type_utilisateur === t;
                      return (
                        <button
                          key={t}
                          onClick={() => saveType(t)}
                          disabled={saving}
                          className={`rounded-full px-3 py-1 text-xs font-semibold border transition ${
                            active
                              ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-200"
                              : "border-slate-700 text-slate-200 hover:bg-slate-900"
                          } disabled:opacity-60 disabled:cursor-not-allowed`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-[11px] text-slate-400">
                    (Tu pourras raffiner plus tard : élève invité / établissement / admin, etc.)
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-400">Consentements</p>
                  <p className="mt-1 text-sm text-slate-200">
                    CGV : <span className="font-semibold">{profil.accepte_cgv ? "oui" : "non"}</span>
                  </p>
                  <p className="mt-1 text-sm text-slate-200">
                    Newsletter :{" "}
                    <span className="font-semibold">{profil.accepte_newsletter ? "oui" : "non"}</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-slate-400">
                  Créé le {new Date(profil.created_at).toLocaleString()}
                </div>

                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-900"
                >
                  Déconnexion
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
