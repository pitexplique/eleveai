"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { useEleve } from "@/context/EleveContext";

type EleveSession = {
  acces_id?: string | null;
  code_etablissement?: string | null;
  code_eleve?: string | null;
  code_utilisateur?: string | null;
  nom?: string | null;
  type_utilisateur?: string | null;
};

type ResultatParcours = {
  id: string;
  code_etablissement: string;
  code_utilisateur: string;
  nom: string | null;
  classe: string | null;
  niveau: string | null;
  matiere: string;
  score: number;
  total: number;
  pourcentage: number | null;
  details: unknown;
  created_at: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function DashboardEleveClient() {
  const supabase = createClient();

  const eleveContext = useEleve() as unknown as {
    eleve?: EleveSession | null;
    currentUser?: EleveSession | null;
    user?: EleveSession | null;
  };

  const eleve =
    eleveContext.eleve ?? eleveContext.currentUser ?? eleveContext.user ?? null;

  const [loading, setLoading] = useState(true);
  const [resultats, setResultats] = useState<ResultatParcours[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const codeEtablissement = eleve?.code_etablissement?.trim() ?? "";
  const codeUtilisateur =
    eleve?.code_eleve?.trim() ?? eleve?.code_utilisateur?.trim() ?? "";

  useEffect(() => {
    async function loadResultats() {
      setLoading(true);
      setErrorMessage(null);

      if (!codeEtablissement || !codeUtilisateur) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("resultats_parcours")
        .select(
          "id, code_etablissement, code_utilisateur, nom, classe, niveau, matiere, score, total, pourcentage, details, created_at"
        )
        .eq("code_etablissement", codeEtablissement)
        .eq("code_utilisateur", codeUtilisateur)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setErrorMessage("Impossible de charger tes résultats.");
        setLoading(false);
        return;
      }

      setResultats((data ?? []) as ResultatParcours[]);
      setLoading(false);
    }

    loadResultats();
  }, [codeEtablissement, codeUtilisateur, supabase]);

  const dernierResultat = resultats[0] ?? null;

  const meilleurResultat = useMemo(() => {
    if (resultats.length === 0) return null;

    return [...resultats].sort((a, b) => {
      const pa = a.total > 0 ? a.score / a.total : 0;
      const pb = b.total > 0 ? b.score / b.total : 0;
      return pb - pa;
    })[0];
  }, [resultats]);

  if (!eleve) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <section className="mx-auto max-w-3xl rounded-3xl bg-white p-6 text-slate-950 shadow-xl">
          <h1 className="text-2xl font-black">Dashboard élève</h1>

          <p className="mt-3 font-semibold text-slate-700">
            Tu dois être connecté pour voir ton tableau de bord.
          </p>

          <Link
            href="/auth/signin-eleve"
            className="mt-5 inline-flex rounded-2xl bg-emerald-600 px-5 py-3 font-black text-white"
          >
            Se connecter
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-yellow-50 px-4 py-8 text-slate-950">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-2xl backdrop-blur-xl">
          <div className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-800">
            Tableau de bord élève
          </div>

          <h1 className="mt-4 text-3xl font-black md:text-5xl">
            Bonjour {eleve.nom ?? "élève"} 👋
          </h1>

          <p className="mt-3 font-semibold text-slate-700">
            Ici, tu retrouves tes résultats enregistrés dans EleveAI.
          </p>

          <div className="mt-5 rounded-3xl bg-slate-50 p-4 text-sm font-black text-slate-700 ring-1 ring-slate-200">
            Code établissement : {codeEtablissement} · Code élève :{" "}
            {codeUtilisateur}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-emerald-100">
            <p className="text-sm font-black uppercase text-emerald-700">
              Dernier score
            </p>

            <p className="mt-3 text-3xl font-black">
              {dernierResultat
                ? `${dernierResultat.score} / ${dernierResultat.total}`
                : "—"}
            </p>

            {dernierResultat ? (
              <p className="mt-2 text-sm font-bold text-slate-500">
                {formatDate(dernierResultat.created_at)}
              </p>
            ) : null}
          </div>

          <div className="rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-sky-100">
            <p className="text-sm font-black uppercase text-sky-700">
              Meilleur score
            </p>

            <p className="mt-3 text-3xl font-black">
              {meilleurResultat
                ? `${meilleurResultat.score} / ${meilleurResultat.total}`
                : "—"}
            </p>

            {meilleurResultat ? (
              <p className="mt-2 text-sm font-bold text-slate-500">
                {Math.round(
                  (meilleurResultat.score / meilleurResultat.total) * 100
                )}
                % de réussite
              </p>
            ) : null}
          </div>

          <div className="rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-yellow-100">
            <p className="text-sm font-black uppercase text-yellow-700">
              Tentatives
            </p>

            <p className="mt-3 text-3xl font-black">{resultats.length}</p>

            <p className="mt-2 text-sm font-bold text-slate-500">
              Parcours enregistrés
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black">Parcours maths</h2>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                Historique des tentatives enregistrées.
              </p>
            </div>

            <Link
              href="/parcours"
              className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-emerald-500"
            >
              Refaire un parcours
            </Link>
          </div>

          {loading ? (
            <p className="rounded-2xl bg-slate-50 p-4 font-bold text-slate-600">
              Chargement des résultats...
            </p>
          ) : errorMessage ? (
            <p className="rounded-2xl bg-red-50 p-4 font-bold text-red-700">
              {errorMessage}
            </p>
          ) : resultats.length === 0 ? (
            <div className="rounded-2xl bg-amber-50 p-4 font-bold text-amber-800">
              Aucun parcours enregistré pour le moment.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                    <th className="px-4 py-3 font-black">Date</th>
                    <th className="px-4 py-3 font-black">Classe</th>
                    <th className="px-4 py-3 font-black">Score</th>
                    <th className="px-4 py-3 font-black">Réussite</th>
                    <th className="px-4 py-3 font-black">Matière</th>
                  </tr>
                </thead>

                <tbody>
                  {resultats.map((r) => {
                    const pct =
                      r.total > 0 ? Math.round((r.score / r.total) * 100) : 0;

                    return (
                      <tr
                        key={r.id}
                        className="border-b border-slate-100 hover:bg-emerald-50/60"
                      >
                        <td className="px-4 py-3 font-bold text-slate-700">
                          {formatDate(r.created_at)}
                        </td>

                        <td className="px-4 py-3 font-bold">
                          {r.classe ?? r.niveau ?? "—"}
                        </td>

                        <td className="px-4 py-3 font-black">
                          {r.score} / {r.total}
                        </td>

                        <td className="px-4 py-3">
                          <span className="rounded-full bg-emerald-100 px-3 py-1 font-black text-emerald-800">
                            {pct} %
                          </span>
                        </td>

                        <td className="px-4 py-3 font-bold">
                          {r.matiere ?? "maths"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/accueil"
            className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
          >
            Retour accueil
          </Link>

          <Link
            href="/calcul-rapide"
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-slate-800"
          >
            Calcul rapide
          </Link>
        </div>
      </section>
    </main>
  );
}