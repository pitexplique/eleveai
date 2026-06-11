"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useEleve } from "@/context/EleveContext";

type EleveSession = {
  acces_id?: string | null;
  code_etablissement?: string | null;
  code_eleve?: string | null;
  code_utilisateur?: string | null;
  nom?: string | null;
  type_utilisateur?: string | null;
  token?: string | null;
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

type ResultatCalculRapide = {
  id: string;
  code_etablissement: string;
  code_utilisateur: string;
  nom: string | null;
  classe: string | null;
  niveau: string | null;
  matiere: string;
  session_id: string | null;
  titre_session: string | null;
  theme: string | null;
  score: number;
  total: number;
  pourcentage: number | null;
  temps_total_sec: number | null;
  details: unknown;
  created_at: string;
};

type ResultatTutor = {
  id: string;
  code_etablissement: string;
  code_utilisateur: string;
  nom: string | null;
  classe: string;
  matiere: string;
  notion_id: string;
  mode: string | null;
  score_sur_20: number | null;
  earned_points: number;
  possible_points: number;
  bonnes_reponses: number;
  nb_tentatives: number;
  temps_sec: number | null;
  created_at: string;
};

type ResultatEnglishMaths = {
  id: string;
  code_etablissement: string;
  code_utilisateur: string;
  nom: string | null;
  niveau: string | null;
  jour: number | null;
  theme: string | null;
  score: number;
  total: number;
  pourcentage: number | null;
  created_at: string;
};

type ResultatDefiJour = {
  id: string;
  code_etablissement: string;
  code_utilisateur: string;
  nom: string | null;

  classe: string | null;
  niveau: string | null;
  matiere: string;

  defi_id: string;
  titre_defi: string;
  theme: string | null;
  direction_id: string | null;
  direction_label: string | null;
  direction_type: string | null;

  score: number;
  total: number;
  pourcentage: number | null;

  reponse_eleve: string | null;
  reponse_attendue: string | null;
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

function getPct(score: number, total: number) {
  if (!total || total <= 0) return 0;
  return Math.round((Number(score) / Number(total)) * 100);
}

function getBest<T extends { score: number; total: number }>(items: T[]) {
  if (items.length === 0) return null;

  return [...items].sort((a, b) => {
    const pa = a.total > 0 ? Number(a.score) / Number(a.total) : 0;
    const pb = b.total > 0 ? Number(b.score) / Number(b.total) : 0;
    return pb - pa;
  })[0];
}

export default function DashboardEleveClient() {
  const eleveContext = useEleve() as unknown as {
    eleve?: EleveSession | null;
    currentUser?: EleveSession | null;
    user?: EleveSession | null;
  };

  const eleve =
    eleveContext.eleve ?? eleveContext.currentUser ?? eleveContext.user ?? null;

  const [loading, setLoading] = useState(true);

  const [resultatsParcours, setResultatsParcours] = useState<ResultatParcours[]>(
    []
  );

  const [resultatsCalculRapide, setResultatsCalculRapide] = useState<
    ResultatCalculRapide[]
  >([]);

  const [resultatsDefisJour, setResultatsDefisJour] = useState<
    ResultatDefiJour[]
  >([]);

  const [resultatsEnglish, setResultatsEnglish] = useState<ResultatEnglishMaths[]>([]);
  const [resultatsTutor, setResultatsTutor] = useState<ResultatTutor[]>([]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const codeEtablissement = eleve?.code_etablissement?.trim() ?? "";
  const codeUtilisateur =
    eleve?.code_eleve?.trim() ?? eleve?.code_utilisateur?.trim() ?? "";
  const isIndependentAccount = codeEtablissement === "INDEPENDANT";

  useEffect(() => {
    async function loadResultats() {
      setLoading(true);
      setErrorMessage(null);

      if (!codeEtablissement || !codeUtilisateur) {
        setLoading(false);
        return;
      }

      // Lecture via /api/dashboard (RLS actif : plus de select direct).
      // Le serveur ne renvoie que les résultats de l'élève du jeton.
      if (!eleve?.token) {
        setErrorMessage(
          "Ta session doit être renouvelée : déconnecte-toi puis reconnecte-toi pour voir tes résultats."
        );
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/dashboard", {
          headers: { Authorization: `Bearer ${eleve.token}` },
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data?.ok) {
          setErrorMessage(
            data?.error ?? "Impossible de charger tous tes résultats."
          );
          setLoading(false);
          return;
        }

        const r = data.resultats ?? {};

        setResultatsParcours([
          ...(r.parcours_maths ?? []),
          ...(r.parcours_english ?? []),
          ...(r.parcours_espagnol ?? []),
        ] as ResultatParcours[]);

        setResultatsCalculRapide(
          (r.calcul_rapide ?? []) as ResultatCalculRapide[]
        );

        setResultatsDefisJour((r.defis_jour ?? []) as ResultatDefiJour[]);

        setResultatsEnglish((r.english_maths ?? []) as ResultatEnglishMaths[]);

        setResultatsTutor((r.tutor ?? []) as ResultatTutor[]);
      } catch (err) {
        console.error(err);
        setErrorMessage("Impossible de charger tous tes résultats.");
      }

      setLoading(false);
    }

    loadResultats();
  }, [codeEtablissement, codeUtilisateur, eleve?.token]);

  const dernierParcours = resultatsParcours[0] ?? null;
  const meilleurParcours = useMemo(
    () => getBest(resultatsParcours),
    [resultatsParcours]
  );

  const dernierCalculRapide = resultatsCalculRapide[0] ?? null;
  const meilleurCalculRapide = useMemo(
    () => getBest(resultatsCalculRapide),
    [resultatsCalculRapide]
  );

  const dernierDefiJour = resultatsDefisJour[0] ?? null;
  const meilleurDefiJour = useMemo(
    () => getBest(resultatsDefisJour),
    [resultatsDefisJour]
  );

  const dernierEnglish = resultatsEnglish[0] ?? null;
  const meilleurEnglish = useMemo(() => getBest(resultatsEnglish), [resultatsEnglish]);

  const dernierTutor = resultatsTutor[0] ?? null;
  const meilleurTutor = useMemo(
    () => resultatsTutor.length === 0 ? null : [...resultatsTutor].sort((a, b) => (b.score_sur_20 ?? 0) - (a.score_sur_20 ?? 0))[0],
    [resultatsTutor]
  );

  const totalActivites =
    resultatsParcours.length +
    resultatsCalculRapide.length +
    resultatsDefisJour.length +
    resultatsEnglish.length +
    resultatsTutor.length;

  if (!eleve) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <section className="mx-auto max-w-3xl rounded-3xl bg-white p-6 text-slate-950 shadow-xl">
          <h1 className="text-2xl font-black">Dashboard élève</h1>

          <p className="mt-3 font-semibold text-slate-700">
            Tu dois être connecté pour voir ton tableau de bord.
          </p>

          <Link
            href="/auth/signin?mode=eleve"
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
      <section className="mx-auto max-w-7xl">
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
            {isIndependentAccount
              ? "Compte indépendant"
              : `Code établissement : ${codeEtablissement} · Code élève : ${codeUtilisateur}`}
          </div>
        </div>

        {loading ? (
          <div className="mt-6 rounded-3xl bg-white p-6 font-black text-slate-700 shadow-xl">
            Chargement de tes résultats...
          </div>
        ) : errorMessage ? (
          <div className="mt-6 rounded-3xl bg-red-50 p-6 font-black text-red-700 shadow-xl">
            {errorMessage}
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
              <div className="rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-emerald-100">
                <p className="text-sm font-black uppercase text-emerald-700">
                  Dernier parcours
                </p>

                <p className="mt-3 text-3xl font-black">
                  {dernierParcours
                    ? `${dernierParcours.score} / ${dernierParcours.total}`
                    : "—"}
                </p>

                {dernierParcours ? (
                  <p className="mt-2 text-sm font-bold text-slate-500">
                    {formatDate(dernierParcours.created_at)}
                  </p>
                ) : null}
              </div>

              <div className="rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-sky-100">
                <p className="text-sm font-black uppercase text-sky-700">
                  Meilleur parcours
                </p>

                <p className="mt-3 text-3xl font-black">
                  {meilleurParcours
                    ? `${meilleurParcours.score} / ${meilleurParcours.total}`
                    : "—"}
                </p>

                {meilleurParcours ? (
                  <p className="mt-2 text-sm font-bold text-slate-500">
                    {getPct(meilleurParcours.score, meilleurParcours.total)} %
                    de réussite
                  </p>
                ) : null}
              </div>

              <div className="rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-amber-100">
                <p className="text-sm font-black uppercase text-amber-700">
                  Dernier calcul
                </p>

                <p className="mt-3 text-3xl font-black">
                  {dernierCalculRapide
                    ? `${dernierCalculRapide.score} / ${dernierCalculRapide.total}`
                    : "—"}
                </p>

                {dernierCalculRapide ? (
                  <p className="mt-2 text-sm font-bold text-slate-500">
                    {formatDate(dernierCalculRapide.created_at)}
                  </p>
                ) : null}
              </div>

              <div className="rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-yellow-100">
                <p className="text-sm font-black uppercase text-yellow-700">
                  Meilleur calcul
                </p>

                <p className="mt-3 text-3xl font-black">
                  {meilleurCalculRapide
                    ? `${meilleurCalculRapide.score} / ${meilleurCalculRapide.total}`
                    : "—"}
                </p>

                {meilleurCalculRapide ? (
                  <p className="mt-2 text-sm font-bold text-slate-500">
                    {getPct(
                      meilleurCalculRapide.score,
                      meilleurCalculRapide.total
                    )}{" "}
                    % de réussite
                  </p>
                ) : null}
              </div>

              <div className="rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-orange-100">
                <p className="text-sm font-black uppercase text-orange-700">
                  Dernier défi
                </p>

                <p className="mt-3 text-3xl font-black">
                  {dernierDefiJour
                    ? `${dernierDefiJour.score} / ${dernierDefiJour.total}`
                    : "—"}
                </p>

                {dernierDefiJour ? (
                  <p className="mt-2 text-sm font-bold text-slate-500">
                    {formatDate(dernierDefiJour.created_at)}
                  </p>
                ) : null}
              </div>

              <div className="rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-indigo-100">
                <p className="text-sm font-black uppercase text-indigo-700">
                  Dernier Coach
                </p>
                <p className="mt-3 text-3xl font-black">
                  {dernierTutor ? `${dernierTutor.score_sur_20 ?? "—"}/20` : "—"}
                </p>
                {dernierTutor ? (
                  <p className="mt-2 text-sm font-bold text-slate-500">
                    {dernierTutor.notion_id} · {dernierTutor.classe}
                  </p>
                ) : null}
              </div>

              <div className="rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-cyan-100">
                <p className="text-sm font-black uppercase text-cyan-700">
                  Dernier English
                </p>
                <p className="mt-3 text-3xl font-black">
                  {dernierEnglish ? `${dernierEnglish.score} / ${dernierEnglish.total}` : "—"}
                </p>
                {dernierEnglish ? (
                  <p className="mt-2 text-sm font-bold text-slate-500">
                    {dernierEnglish.theme ?? `Jour ${dernierEnglish.jour}`}
                  </p>
                ) : null}
              </div>

              <div className="rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-purple-100">
                <p className="text-sm font-black uppercase text-purple-700">
                  Activités
                </p>

                <p className="mt-3 text-3xl font-black">{totalActivites}</p>

                <p className="mt-2 text-sm font-bold text-slate-500">
                  Parcours + calcul + défis + English
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
              <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-black">Parcours maths</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      Historique des parcours enregistrés.
                    </p>
                  </div>

                  <Link
                    href="/parcours"
                    className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-emerald-500"
                  >
                    Refaire un parcours
                  </Link>
                </div>

                {resultatsParcours.length === 0 ? (
                  <div className="rounded-2xl bg-amber-50 p-4 font-bold text-amber-800">
                    Aucun parcours enregistré pour le moment.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                          <th className="px-4 py-3 font-black">Date</th>
                          <th className="px-4 py-3 font-black">Classe</th>
                          <th className="px-4 py-3 font-black">Score</th>
                          <th className="px-4 py-3 font-black">Réussite</th>
                        </tr>
                      </thead>

                      <tbody>
                        {resultatsParcours.map((r) => {
                          const pct = getPct(r.score, r.total);

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
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-black">Calcul rapide</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      Historique des défis de calcul rapide enregistrés.
                    </p>
                  </div>

                  <Link
                    href="/calcul-rapide"
                    className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-slate-800"
                  >
                    Refaire un calcul rapide
                  </Link>
                </div>

                {resultatsCalculRapide.length === 0 ? (
                  <div className="rounded-2xl bg-amber-50 p-4 font-bold text-amber-800">
                    Aucun calcul rapide enregistré pour le moment.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                          <th className="px-4 py-3 font-black">Date</th>
                          <th className="px-4 py-3 font-black">Niveau</th>
                          <th className="px-4 py-3 font-black">Session</th>
                          <th className="px-4 py-3 font-black">Score</th>
                          <th className="px-4 py-3 font-black">Réussite</th>
                        </tr>
                      </thead>

                      <tbody>
                        {resultatsCalculRapide.map((r) => {
                          const pct = getPct(r.score, r.total);

                          return (
                            <tr
                              key={r.id}
                              className="border-b border-slate-100 hover:bg-sky-50/70"
                            >
                              <td className="px-4 py-3 font-bold text-slate-700">
                                {formatDate(r.created_at)}
                              </td>

                              <td className="px-4 py-3 font-bold">
                                {r.niveau ?? r.classe ?? "—"}
                              </td>

                              <td className="px-4 py-3 font-bold">
                                {r.titre_session ?? r.theme ?? "Défi"}
                              </td>

                              <td className="px-4 py-3 font-black">
                                {r.score} / {r.total}
                              </td>

                              <td className="px-4 py-3">
                                <span className="rounded-full bg-sky-100 px-3 py-1 font-black text-sky-800">
                                  {pct} %
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100 xl:col-span-2">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-black">Défis du jour</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      Historique des défis enregistrés.
                    </p>
                  </div>

                  <Link
                    href="/defis-du-jour"
                    className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-orange-400"
                  >
                    Refaire un défi
                  </Link>
                </div>

                {resultatsDefisJour.length === 0 ? (
                  <div className="rounded-2xl bg-amber-50 p-4 font-bold text-amber-800">
                    Aucun défi du jour enregistré pour le moment.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                          <th className="px-4 py-3 font-black">Date</th>
                          <th className="px-4 py-3 font-black">Défi</th>
                          <th className="px-4 py-3 font-black">Thème</th>
                          <th className="px-4 py-3 font-black">Chemin</th>
                          <th className="px-4 py-3 font-black">Score</th>
                          <th className="px-4 py-3 font-black">Réussite</th>
                        </tr>
                      </thead>

                      <tbody>
                        {resultatsDefisJour.map((r) => {
                          const pct = getPct(r.score, r.total);

                          return (
                            <tr
                              key={r.id}
                              className="border-b border-slate-100 hover:bg-orange-50/70"
                            >
                              <td className="px-4 py-3 font-bold text-slate-700">
                                {formatDate(r.created_at)}
                              </td>

                              <td className="px-4 py-3 font-bold">
                                {r.titre_defi ?? "Défi"}
                              </td>

                              <td className="px-4 py-3 font-bold">
                                {r.theme ?? "—"}
                              </td>

                              <td className="px-4 py-3 font-bold">
                                {r.direction_label ?? r.direction_type ?? "—"}
                              </td>

                              <td className="px-4 py-3 font-black">
                                {r.score} / {r.total}
                              </td>

                              <td className="px-4 py-3">
                                <span className="rounded-full bg-orange-100 px-3 py-1 font-black text-orange-800">
                                  {pct} %
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

              <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100 xl:col-span-2">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-black">Coach Maths IA</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      Historique des séances d&apos;entraînement.
                    </p>
                  </div>
                  <Link
                    href="/coach-ia/maths"
                    className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-indigo-500"
                  >
                    Reprendre l&apos;entraînement
                  </Link>
                </div>

                {resultatsTutor.length === 0 ? (
                  <div className="rounded-2xl bg-amber-50 p-4 font-bold text-amber-800">
                    Aucune séance Coach enregistrée pour le moment.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                          <th className="px-4 py-3 font-black">Date</th>
                          <th className="px-4 py-3 font-black">Classe</th>
                          <th className="px-4 py-3 font-black">Notion</th>
                          <th className="px-4 py-3 font-black">Mode</th>
                          <th className="px-4 py-3 font-black">Score</th>
                          <th className="px-4 py-3 font-black">Réussites</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultatsTutor.map((r) => (
                          <tr key={r.id} className="border-b border-slate-100 hover:bg-indigo-50/60">
                            <td className="px-4 py-3 font-bold text-slate-700">
                              {formatDate(r.created_at)}
                            </td>
                            <td className="px-4 py-3 font-bold">{r.classe}</td>
                            <td className="px-4 py-3 font-bold">{r.notion_id}</td>
                            <td className="px-4 py-3 font-bold capitalize">{r.mode ?? "—"}</td>
                            <td className="px-4 py-3 font-black">
                              {r.score_sur_20 ?? "—"}/20
                            </td>
                            <td className="px-4 py-3">
                              <span className={[
                                "rounded-full px-3 py-1 font-black",
                                (r.score_sur_20 ?? 0) >= 14
                                  ? "bg-emerald-100 text-emerald-800"
                                  : (r.score_sur_20 ?? 0) >= 10
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800",
                              ].join(" ")}>
                                {r.bonnes_reponses}/{r.nb_tentatives}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100 xl:col-span-2">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-black">English Maths</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      Historique des mini-défis English Maths.
                    </p>
                  </div>
                  <Link
                    href="/english-maths"
                    className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-sky-500"
                  >
                    Refaire un défi English
                  </Link>
                </div>

                {resultatsEnglish.length === 0 ? (
                  <div className="rounded-2xl bg-amber-50 p-4 font-bold text-amber-800">
                    Aucun défi English enregistré pour le moment.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                          <th className="px-4 py-3 font-black">Date</th>
                          <th className="px-4 py-3 font-black">Jour</th>
                          <th className="px-4 py-3 font-black">Thème</th>
                          <th className="px-4 py-3 font-black">Score</th>
                          <th className="px-4 py-3 font-black">Réussite</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultatsEnglish.map((r) => {
                          const pct = getPct(r.score, r.total);
                          return (
                            <tr key={r.id} className="border-b border-slate-100 hover:bg-cyan-50/60">
                              <td className="px-4 py-3 font-bold text-slate-700">
                                {formatDate(r.created_at)}
                              </td>
                              <td className="px-4 py-3 font-bold">
                                {r.jour ? `Jour ${r.jour}` : "—"}
                              </td>
                              <td className="px-4 py-3 font-bold">
                                {r.theme ?? "—"}
                              </td>
                              <td className="px-4 py-3 font-black">
                                {r.score} / {r.total}
                              </td>
                              <td className="px-4 py-3">
                                <span className={[
                                  "rounded-full px-3 py-1 font-black",
                                  pct >= 80
                                    ? "bg-emerald-100 text-emerald-800"
                                    : pct >= 50
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-red-100 text-red-800",
                                ].join(" ")}>
                                  {pct} %
                                </span>
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
                href="/parcours"
                className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-emerald-500"
              >
                Parcours
              </Link>

              <Link
                href="/calcul-rapide"
                className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-slate-800"
              >
                Calcul rapide
              </Link>

              <Link
                href="/defis-du-jour"
                className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-orange-400"
              >
                Défi du jour
              </Link>

              <Link
                href="/coach-ia/maths"
                className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-indigo-500"
              >
                Coach Maths IA
              </Link>

              <Link
                href="/english-maths"
                className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-sky-500"
              >
                English Maths
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
