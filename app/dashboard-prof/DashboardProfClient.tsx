"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { useEleve } from "@/context/EleveContext";

type UserSession = {
  acces_id?: string | null;
  code_etablissement?: string | null;
  code_eleve?: string | null;
  code_utilisateur?: string | null;
  nom?: string | null;
  type_utilisateur?: string | null;
};

type AccesEtablissement = {
  id: string;
  code_etablissement: string;
  code_utilisateur: string;
  type_utilisateur: string;
  nom: string | null;
  actif: boolean;
  created_at: string;
};

type ResultatBase = {
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
  created_at: string;
};

type ResultatParcours = ResultatBase;

type ResultatCalculRapide = ResultatBase & {
  session_id: string | null;
  titre_session: string | null;
  theme: string | null;
};

type ResultatDefiJour = ResultatBase & {
  defi_id: string;
  titre_defi: string;
  theme: string | null;
  direction_label: string | null;
  direction_type: string | null;
};

type EleveSynthese = {
  code_utilisateur: string;
  nom: string;
  actif: boolean;
  parcours: ResultatParcours[];
  calculs: ResultatCalculRapide[];
  defis: ResultatDefiJour[];
  totalActivites: number;
  dernierParcours: ResultatParcours | null;
  dernierCalcul: ResultatCalculRapide | null;
  dernierDefi: ResultatDefiJour | null;
  moyenneGlobale: number | null;
};

function formatDate(value?: string | null) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getPct(score: number, total: number) {
  if (!total || total <= 0) return 0;
  return Math.round((Number(score) / Number(total)) * 100);
}

function getLast<T extends { created_at: string }>(items: T[]) {
  if (items.length === 0) return null;

  return [...items].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )[0];
}

function getAveragePct(items: Array<{ score: number; total: number }>) {
  if (items.length === 0) return null;

  const valid = items.filter((item) => item.total > 0);
  if (valid.length === 0) return null;

  const totalPct = valid.reduce((sum, item) => {
    return sum + getPct(item.score, item.total);
  }, 0);

  return Math.round(totalPct / valid.length);
}

function isProfAllowed(user: UserSession | null) {
  const type = user?.type_utilisateur;

  return (
    type === "prof" ||
    type === "boss" ||
    type === "vie_scolaire" ||
    type === "aesh"
  );
}

export default function DashboardProfClient() {
  const supabase = useMemo(() => createClient(), []);

  const userContext = useEleve() as unknown as {
    eleve?: UserSession | null;
    currentUser?: UserSession | null;
    user?: UserSession | null;
  };

  const user =
    userContext.eleve ?? userContext.currentUser ?? userContext.user ?? null;

  const codeEtablissement = user?.code_etablissement?.trim() ?? "";

  const [loading, setLoading] = useState(true);
  const [eleves, setEleves] = useState<AccesEtablissement[]>([]);
  const [resultatsParcours, setResultatsParcours] = useState<ResultatParcours[]>(
    []
  );
  const [resultatsCalculRapide, setResultatsCalculRapide] = useState<
    ResultatCalculRapide[]
  >([]);
  const [resultatsDefisJour, setResultatsDefisJour] = useState<
    ResultatDefiJour[]
  >([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboardProf() {
      setLoading(true);
      setErrorMessage(null);

      if (!codeEtablissement || !isProfAllowed(user)) {
        setLoading(false);
        return;
      }

      const [
        elevesResponse,
        parcoursResponse,
        calculRapideResponse,
        defisJourResponse,
      ] = await Promise.all([
        supabase
          .from("acces_etablissement")
          .select(
            "id, code_etablissement, code_utilisateur, type_utilisateur, nom, actif, created_at"
          )
          .eq("code_etablissement", codeEtablissement)
          .eq("type_utilisateur", "eleve")
          .order("nom", { ascending: true }),

        supabase
          .from("resultats_parcours")
          .select(
            "id, code_etablissement, code_utilisateur, nom, classe, niveau, matiere, score, total, pourcentage, created_at"
          )
          .eq("code_etablissement", codeEtablissement)
          .order("created_at", { ascending: false }),

        supabase
          .from("resultats_calcul_rapide")
          .select(
            "id, code_etablissement, code_utilisateur, nom, classe, niveau, matiere, session_id, titre_session, theme, score, total, pourcentage, created_at"
          )
          .eq("code_etablissement", codeEtablissement)
          .order("created_at", { ascending: false }),

        supabase
          .from("resultats_defis_jour")
          .select(
            "id, code_etablissement, code_utilisateur, nom, classe, niveau, matiere, defi_id, titre_defi, theme, direction_label, direction_type, score, total, pourcentage, created_at"
          )
          .eq("code_etablissement", codeEtablissement)
          .order("created_at", { ascending: false }),
      ]);

      if (
        elevesResponse.error ||
        parcoursResponse.error ||
        calculRapideResponse.error ||
        defisJourResponse.error
      ) {
        console.error(
          elevesResponse.error ??
            parcoursResponse.error ??
            calculRapideResponse.error ??
            defisJourResponse.error
        );

        setErrorMessage("Impossible de charger le dashboard professeur.");
        setLoading(false);
        return;
      }

      setEleves((elevesResponse.data ?? []) as AccesEtablissement[]);
      setResultatsParcours(
        (parcoursResponse.data ?? []) as ResultatParcours[]
      );
      setResultatsCalculRapide(
        (calculRapideResponse.data ?? []) as ResultatCalculRapide[]
      );
      setResultatsDefisJour(
        (defisJourResponse.data ?? []) as ResultatDefiJour[]
      );

      setLoading(false);
    }

    loadDashboardProf();
  }, [codeEtablissement, supabase, user]);

  const syntheses = useMemo<EleveSynthese[]>(() => {
    return eleves.map((eleve) => {
      const parcours = resultatsParcours.filter(
        (r) => r.code_utilisateur === eleve.code_utilisateur
      );

      const calculs = resultatsCalculRapide.filter(
        (r) => r.code_utilisateur === eleve.code_utilisateur
      );

      const defis = resultatsDefisJour.filter(
        (r) => r.code_utilisateur === eleve.code_utilisateur
      );

      const allResults = [...parcours, ...calculs, ...defis];

      return {
        code_utilisateur: eleve.code_utilisateur,
        nom: eleve.nom ?? "Élève sans nom",
        actif: eleve.actif,
        parcours,
        calculs,
        defis,
        totalActivites: allResults.length,
        dernierParcours: getLast(parcours),
        dernierCalcul: getLast(calculs),
        dernierDefi: getLast(defis),
        moyenneGlobale: getAveragePct(allResults),
      };
    });
  }, [eleves, resultatsParcours, resultatsCalculRapide, resultatsDefisJour]);

  const totalEleves = eleves.length;
  const totalActifs = syntheses.filter((s) => s.totalActivites > 0).length;
  const totalActivites =
    resultatsParcours.length +
    resultatsCalculRapide.length +
    resultatsDefisJour.length;

  const moyenneEtablissement = getAveragePct([
    ...resultatsParcours,
    ...resultatsCalculRapide,
    ...resultatsDefisJour,
  ]);

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <section className="mx-auto max-w-3xl rounded-3xl bg-white p-6 text-slate-950 shadow-xl">
          <h1 className="text-2xl font-black">Dashboard professeur</h1>

          <p className="mt-3 font-semibold text-slate-700">
            Tu dois être connecté avec un compte professeur.
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

  if (!isProfAllowed(user)) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <section className="mx-auto max-w-3xl rounded-3xl bg-white p-6 text-slate-950 shadow-xl">
          <h1 className="text-2xl font-black">Accès réservé</h1>

          <p className="mt-3 font-semibold text-slate-700">
            Cette page est réservée aux professeurs et à l’établissement.
          </p>

          <Link
            href="/dashboard-eleve"
            className="mt-5 inline-flex rounded-2xl bg-emerald-600 px-5 py-3 font-black text-white"
          >
            Retour dashboard élève
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-[#062A4F] to-slate-950 px-4 py-8 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
          <div className="inline-flex rounded-full bg-emerald-300 px-4 py-2 text-xs font-black uppercase tracking-wide text-slate-950">
            Dashboard professeur
          </div>

          <h1 className="mt-4 text-3xl font-black md:text-5xl">
            Suivi établissement
          </h1>

          <p className="mt-3 font-semibold text-white/75">
            Bonjour {user.nom ?? "professeur"} 👋 · établissement :{" "}
            {codeEtablissement}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/accueil"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 shadow-lg hover:bg-slate-100"
            >
              Accueil
            </Link>

            <Link
              href="/parcours"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 shadow-lg hover:bg-emerald-300"
            >
              Parcours
            </Link>

            <Link
              href="/calcul-rapide"
              className="rounded-2xl bg-sky-400 px-5 py-3 text-sm font-black text-slate-950 shadow-lg hover:bg-sky-300"
            >
              Calcul rapide
            </Link>

            <Link
              href="/defis-jour"
              className="rounded-2xl bg-orange-400 px-5 py-3 text-sm font-black text-slate-950 shadow-lg hover:bg-orange-300"
            >
              Défi du jour
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="mt-6 rounded-3xl bg-white/10 p-6 font-black text-white shadow-xl">
            Chargement des données...
          </div>
        ) : errorMessage ? (
          <div className="mt-6 rounded-3xl bg-red-500/20 p-6 font-black text-red-100 shadow-xl ring-1 ring-red-400/30">
            {errorMessage}
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <div className="rounded-[2rem] bg-white p-5 text-slate-950 shadow-xl">
                <p className="text-sm font-black uppercase text-emerald-700">
                  Élèves
                </p>
                <p className="mt-3 text-4xl font-black">{totalEleves}</p>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  Comptes élèves
                </p>
              </div>

              <div className="rounded-[2rem] bg-white p-5 text-slate-950 shadow-xl">
                <p className="text-sm font-black uppercase text-sky-700">
                  Élèves actifs
                </p>
                <p className="mt-3 text-4xl font-black">{totalActifs}</p>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  Au moins une activité
                </p>
              </div>

              <div className="rounded-[2rem] bg-white p-5 text-slate-950 shadow-xl">
                <p className="text-sm font-black uppercase text-amber-700">
                  Activités
                </p>
                <p className="mt-3 text-4xl font-black">{totalActivites}</p>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  Total enregistré
                </p>
              </div>

              <div className="rounded-[2rem] bg-white p-5 text-slate-950 shadow-xl">
                <p className="text-sm font-black uppercase text-purple-700">
                  Moyenne
                </p>
                <p className="mt-3 text-4xl font-black">
                  {moyenneEtablissement !== null
                    ? `${moyenneEtablissement} %`
                    : "—"}
                </p>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  Moyenne globale
                </p>
              </div>

              <div className="rounded-[2rem] bg-white p-5 text-slate-950 shadow-xl">
                <p className="text-sm font-black uppercase text-orange-700">
                  Modules
                </p>
                <p className="mt-3 text-4xl font-black">3</p>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  Parcours · Calcul · Défis
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-black">
                    Liste des élèves suivis
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-slate-600">
                    Vue synthétique par élève : activité, derniers scores et
                    moyenne.
                  </p>
                </div>
              </div>

              {syntheses.length === 0 ? (
                <div className="rounded-2xl bg-amber-50 p-4 font-bold text-amber-800">
                  Aucun élève trouvé pour cet établissement.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                        <th className="px-4 py-3 font-black">Élève</th>
                        <th className="px-4 py-3 font-black">Code</th>
                        <th className="px-4 py-3 font-black">Activités</th>
                        <th className="px-4 py-3 font-black">Moyenne</th>
                        <th className="px-4 py-3 font-black">
                          Dernier parcours
                        </th>
                        <th className="px-4 py-3 font-black">
                          Dernier calcul
                        </th>
                        <th className="px-4 py-3 font-black">Dernier défi</th>
                        <th className="px-4 py-3 font-black">Statut</th>
                      </tr>
                    </thead>

                    <tbody>
                      {syntheses.map((s) => (
                        <tr
                          key={s.code_utilisateur}
                          className="border-b border-slate-100 hover:bg-emerald-50/60"
                        >
                          <td className="px-4 py-3 font-black">{s.nom}</td>

                          <td className="px-4 py-3 font-bold text-slate-600">
                            {s.code_utilisateur}
                          </td>

                          <td className="px-4 py-3 font-black">
                            {s.totalActivites}
                          </td>

                          <td className="px-4 py-3">
                            <span
                              className={[
                                "rounded-full px-3 py-1 font-black",
                                s.moyenneGlobale === null
                                  ? "bg-slate-100 text-slate-600"
                                  : s.moyenneGlobale >= 75
                                    ? "bg-emerald-100 text-emerald-800"
                                    : s.moyenneGlobale >= 50
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-red-100 text-red-800",
                              ].join(" ")}
                            >
                              {s.moyenneGlobale !== null
                                ? `${s.moyenneGlobale} %`
                                : "—"}
                            </span>
                          </td>

                          <td className="px-4 py-3 font-bold">
                            {s.dernierParcours
                              ? `${s.dernierParcours.score}/${s.dernierParcours.total} · ${formatDate(
                                  s.dernierParcours.created_at
                                )}`
                              : "—"}
                          </td>

                          <td className="px-4 py-3 font-bold">
                            {s.dernierCalcul
                              ? `${s.dernierCalcul.score}/${s.dernierCalcul.total} · ${formatDate(
                                  s.dernierCalcul.created_at
                                )}`
                              : "—"}
                          </td>

                          <td className="px-4 py-3 font-bold">
                            {s.dernierDefi
                              ? `${s.dernierDefi.score}/${s.dernierDefi.total} · ${formatDate(
                                  s.dernierDefi.created_at
                                )}`
                              : "—"}
                          </td>

                          <td className="px-4 py-3">
                            {s.totalActivites > 0 ? (
                              <span className="rounded-full bg-emerald-100 px-3 py-1 font-black text-emerald-800">
                                actif
                              </span>
                            ) : (
                              <span className="rounded-full bg-slate-100 px-3 py-1 font-black text-slate-600">
                                aucun résultat
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}