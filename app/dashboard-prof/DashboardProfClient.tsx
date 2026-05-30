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
  score: number;
  total: number;
  pourcentage: number | null;
  created_at: string;
};

type ResultatParcours = ResultatBase & { classe: string | null; niveau: string | null; matiere: string };
type ResultatCalculRapide = ResultatBase & { classe: string | null; niveau: string | null; matiere: string; titre_session: string | null; theme: string | null };
type ResultatDefiJour = ResultatBase & { titre_defi: string; theme: string | null };
type ResultatEnglish = ResultatBase & { jour: number | null; theme: string | null };
type ResultatTutor = ResultatBase & { classe: string; notion_id: string; mode: string | null; score_sur_20: number | null; bonnes_reponses: number; nb_tentatives: number };

type EleveSynthese = {
  code_utilisateur: string;
  nom: string;
  actif: boolean;
  parcours: ResultatParcours[];
  calculs: ResultatCalculRapide[];
  defis: ResultatDefiJour[];
  english: ResultatEnglish[];
  tutor: ResultatTutor[];
  totalActivites: number;
  dernierParcours: ResultatParcours | null;
  dernierCalcul: ResultatCalculRapide | null;
  dernierDefi: ResultatDefiJour | null;
  dernierEnglish: ResultatEnglish | null;
  dernierTutor: ResultatTutor | null;
  moyenneGlobale: number | null;
};

function formatDate(value?: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }).format(new Date(value));
}

function getPct(score: number, total: number) {
  if (!total || total <= 0) return 0;
  return Math.round((Number(score) / Number(total)) * 100);
}

function getLast<T extends { created_at: string }>(items: T[]): T | null {
  if (items.length === 0) return null;
  return [...items].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
}

function getAveragePct(items: Array<{ score: number; total: number }>) {
  const valid = items.filter((i) => i.total > 0);
  if (valid.length === 0) return null;
  return Math.round(valid.reduce((sum, i) => sum + getPct(i.score, i.total), 0) / valid.length);
}

function isProfAllowed(user: UserSession | null) {
  const t = user?.type_utilisateur;
  return t === "prof" || t === "boss" || t === "vie_scolaire" || t === "aesh";
}

function PctBadge({ pct }: { pct: number | null }) {
  if (pct === null) return <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">—</span>;
  const color = pct >= 75 ? "bg-emerald-100 text-emerald-800" : pct >= 50 ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800";
  return <span className={`rounded-full px-3 py-1 text-xs font-black ${color}`}>{pct} %</span>;
}

export default function DashboardProfClient() {
  const supabase = useMemo(() => createClient(), []);

  const userContext = useEleve() as unknown as {
    eleve?: UserSession | null;
    currentUser?: UserSession | null;
    user?: UserSession | null;
  };

  const user = userContext.eleve ?? userContext.currentUser ?? userContext.user ?? null;
  const codeEtablissement = user?.code_etablissement?.trim() ?? "";

  const [loading, setLoading] = useState(true);
  const [eleves, setEleves] = useState<AccesEtablissement[]>([]);
  const [resultatsParcours, setResultatsParcours] = useState<ResultatParcours[]>([]);
  const [resultatsCalculRapide, setResultatsCalculRapide] = useState<ResultatCalculRapide[]>([]);
  const [resultatsDefisJour, setResultatsDefisJour] = useState<ResultatDefiJour[]>([]);
  const [resultatsEnglish, setResultatsEnglish] = useState<ResultatEnglish[]>([]);
  const [resultatsTutor, setResultatsTutor] = useState<ResultatTutor[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedEleve, setSelectedEleve] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErrorMessage(null);

      if (!codeEtablissement || !isProfAllowed(user)) {
        setLoading(false);
        return;
      }

      const [elevesRes, parcoursRes, calculRes, defisRes, englishRes, tutorRes] = await Promise.all([
        supabase.from("acces_etablissement")
          .select("id, code_etablissement, code_utilisateur, type_utilisateur, nom, actif, created_at")
          .eq("code_etablissement", codeEtablissement)
          .eq("type_utilisateur", "eleve")
          .order("nom", { ascending: true }),

        supabase.from("resultats_parcours")
          .select("id, code_etablissement, code_utilisateur, nom, classe, niveau, matiere, score, total, pourcentage, created_at")
          .eq("code_etablissement", codeEtablissement)
          .order("created_at", { ascending: false }),

        supabase.from("resultats_calcul_rapide")
          .select("id, code_etablissement, code_utilisateur, nom, classe, niveau, matiere, titre_session, theme, score, total, pourcentage, created_at")
          .eq("code_etablissement", codeEtablissement)
          .order("created_at", { ascending: false }),

        supabase.from("resultats_defis_jour")
          .select("id, code_etablissement, code_utilisateur, nom, titre_defi, theme, score, total, pourcentage, created_at")
          .eq("code_etablissement", codeEtablissement)
          .order("created_at", { ascending: false }),

        supabase.from("resultats_english_maths")
          .select("id, code_etablissement, code_utilisateur, nom, jour, theme, score, total, pourcentage, created_at")
          .eq("code_etablissement", codeEtablissement)
          .order("created_at", { ascending: false }),

        supabase.from("resultats_tutor")
          .select("id, code_etablissement, code_utilisateur, nom, classe, notion_id, mode, score_sur_20, bonnes_reponses, nb_tentatives, score, total, created_at")
          .eq("code_etablissement", codeEtablissement)
          .order("created_at", { ascending: false }),
      ]);

      if (elevesRes.error || parcoursRes.error || calculRes.error || defisRes.error || englishRes.error || tutorRes.error) {
        setErrorMessage("Impossible de charger le dashboard.");
        setLoading(false);
        return;
      }

      setEleves((elevesRes.data ?? []) as AccesEtablissement[]);
      setResultatsParcours((parcoursRes.data ?? []) as ResultatParcours[]);
      setResultatsCalculRapide((calculRes.data ?? []) as ResultatCalculRapide[]);
      setResultatsDefisJour((defisRes.data ?? []) as ResultatDefiJour[]);
      setResultatsEnglish((englishRes.data ?? []) as ResultatEnglish[]);
      setResultatsTutor((tutorRes.data ?? []) as ResultatTutor[]);
      setLoading(false);
    }

    load();
  }, [codeEtablissement, supabase, user]);

  const syntheses = useMemo<EleveSynthese[]>(() => {
    return eleves.map((eleve) => {
      const parcours = resultatsParcours.filter((r) => r.code_utilisateur === eleve.code_utilisateur);
      const calculs = resultatsCalculRapide.filter((r) => r.code_utilisateur === eleve.code_utilisateur);
      const defis = resultatsDefisJour.filter((r) => r.code_utilisateur === eleve.code_utilisateur);
      const english = resultatsEnglish.filter((r) => r.code_utilisateur === eleve.code_utilisateur);
      const tutor = resultatsTutor.filter((r) => r.code_utilisateur === eleve.code_utilisateur);

      const allResults = [...parcours, ...calculs, ...defis, ...english];

      return {
        code_utilisateur: eleve.code_utilisateur,
        nom: eleve.nom ?? "Élève sans nom",
        actif: eleve.actif,
        parcours, calculs, defis, english, tutor,
        totalActivites: allResults.length + tutor.length,
        dernierParcours: getLast(parcours),
        dernierCalcul: getLast(calculs),
        dernierDefi: getLast(defis),
        dernierEnglish: getLast(english),
        dernierTutor: getLast(tutor),
        moyenneGlobale: getAveragePct(allResults),
      };
    });
  }, [eleves, resultatsParcours, resultatsCalculRapide, resultatsDefisJour, resultatsEnglish, resultatsTutor]);

  const totalEleves = eleves.length;
  const totalActifs = syntheses.filter((s) => s.totalActivites > 0).length;
  const totalActivites = resultatsParcours.length + resultatsCalculRapide.length + resultatsDefisJour.length + resultatsEnglish.length + resultatsTutor.length;
  const moyenneEtab = getAveragePct([...resultatsParcours, ...resultatsCalculRapide, ...resultatsDefisJour, ...resultatsEnglish]);

  const eleveDetail = selectedEleve ? syntheses.find((s) => s.code_utilisateur === selectedEleve) ?? null : null;

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <section className="mx-auto max-w-xl rounded-3xl bg-white p-6 text-slate-950 shadow-xl">
          <h1 className="text-2xl font-black">Dashboard professeur</h1>
          <p className="mt-3 font-semibold text-slate-700">Connecte-toi avec un compte professeur.</p>
          <Link href="/auth/signin-eleve" className="mt-5 inline-flex rounded-2xl bg-blue-600 px-5 py-3 font-black text-white">Se connecter</Link>
        </section>
      </main>
    );
  }

  if (!isProfAllowed(user)) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <section className="mx-auto max-w-xl rounded-3xl bg-white p-6 text-slate-950 shadow-xl">
          <h1 className="text-2xl font-black">Accès réservé</h1>
          <p className="mt-3 font-semibold text-slate-700">Cette page est réservée aux professeurs.</p>
          <Link href="/dashboard-eleve" className="mt-5 inline-flex rounded-2xl bg-emerald-600 px-5 py-3 font-black text-white">Dashboard élève</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-[#062A4F] to-slate-950 px-4 py-8 text-white">
      <section className="mx-auto max-w-7xl space-y-6">

        {/* HEADER */}
        <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex rounded-full bg-blue-400 px-4 py-2 text-xs font-black uppercase tracking-wide text-slate-950">
                Dashboard professeur
              </div>
              <h1 className="mt-3 text-3xl font-black md:text-4xl">
                {codeEtablissement}
              </h1>
              <p className="mt-1 font-semibold text-white/70">
                Bonjour {user.nom ?? "professeur"} 👋
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { href: "/parcours", label: "🛤️ Parcours", color: "bg-violet-400" },
                { href: "/calcul-rapide", label: "⚡ Calcul", color: "bg-lime-400" },
                { href: "/defis-du-jour", label: "🎯 Défis", color: "bg-orange-400" },
                { href: "/english-maths", label: "🇬🇧 English", color: "bg-sky-400" },
                { href: "/coach-maths-ia", label: "🧠 Coach", color: "bg-indigo-400" },
              ].map((l) => (
                <Link key={l.href} href={l.href}
                  className={`rounded-2xl ${l.color} px-4 py-2 text-sm font-black text-slate-950 shadow hover:brightness-110`}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white/10 p-6 font-black text-white">Chargement…</div>
        ) : errorMessage ? (
          <div className="rounded-3xl bg-red-500/20 p-6 font-black text-red-100 ring-1 ring-red-400/30">{errorMessage}</div>
        ) : (
          <>
            {/* STATS GLOBALES */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {[
                { label: "Élèves", value: totalEleves, color: "text-emerald-400", sub: "Comptes actifs" },
                { label: "Élèves actifs", value: totalActifs, color: "text-sky-400", sub: "≥ 1 activité" },
                { label: "Activités totales", value: totalActivites, color: "text-amber-400", sub: "Tous modules" },
                { label: "Moyenne établ.", value: moyenneEtab !== null ? `${moyenneEtab} %` : "—", color: "text-purple-400", sub: "Parcours·Calcul·Défis·EN" },
                { label: "Modules suivis", value: 5, color: "text-pink-400", sub: "Parcours·Calcul·Défis·EN·Coach" },
              ].map((s) => (
                <div key={s.label} className="rounded-[2rem] bg-white p-5 text-slate-950 shadow-xl">
                  <p className="text-xs font-black uppercase text-slate-500">{s.label}</p>
                  <p className={`mt-2 text-3xl font-black ${s.color}`}>{s.value}</p>
                  <p className="mt-1 text-xs font-bold text-slate-400">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* TABLEAU ÉLÈVES */}
            <div className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-black">Tous les élèves</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    Cliquer sur un élève pour voir le détail.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-black text-slate-600">
                  {syntheses.filter((s) => s.totalActivites > 0).length} / {syntheses.length} actifs
                </div>
              </div>

              {syntheses.length === 0 ? (
                <div className="rounded-2xl bg-amber-50 p-4 font-bold text-amber-800">
                  Aucun élève trouvé pour cet établissement.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b-2 border-slate-200 bg-slate-50 text-slate-600">
                        <th className="px-4 py-3 font-black">Élève</th>
                        <th className="px-4 py-3 font-black">Code</th>
                        <th className="px-4 py-3 font-black text-center">Activités</th>
                        <th className="px-4 py-3 font-black text-center">Moyenne</th>
                        <th className="px-4 py-3 font-black text-center">🛤️ Parcours</th>
                        <th className="px-4 py-3 font-black text-center">⚡ Calcul</th>
                        <th className="px-4 py-3 font-black text-center">🎯 Défis</th>
                        <th className="px-4 py-3 font-black text-center">🇬🇧 EN</th>
                        <th className="px-4 py-3 font-black text-center">🧠 Coach</th>
                      </tr>
                    </thead>
                    <tbody>
                      {syntheses.map((s) => (
                        <>
                          <tr
                            key={s.code_utilisateur}
                            onClick={() => setSelectedEleve(selectedEleve === s.code_utilisateur ? null : s.code_utilisateur)}
                            className={`cursor-pointer border-b border-slate-100 transition hover:bg-blue-50/60 ${selectedEleve === s.code_utilisateur ? "bg-blue-50" : ""}`}
                          >
                            <td className="px-4 py-3 font-black text-slate-950">{s.nom}</td>
                            <td className="px-4 py-3 font-bold text-slate-500">{s.code_utilisateur}</td>
                            <td className="px-4 py-3 text-center font-black">{s.totalActivites}</td>
                            <td className="px-4 py-3 text-center">
                              <PctBadge pct={s.moyenneGlobale} />
                            </td>
                            <td className="px-4 py-3 text-center text-xs font-bold text-slate-600">
                              {s.parcours.length > 0 ? `${s.parcours.length} sess.` : <span className="text-slate-300">—</span>}
                            </td>
                            <td className="px-4 py-3 text-center text-xs font-bold text-slate-600">
                              {s.calculs.length > 0 ? `${s.calculs.length} sess.` : <span className="text-slate-300">—</span>}
                            </td>
                            <td className="px-4 py-3 text-center text-xs font-bold text-slate-600">
                              {s.defis.length > 0 ? `${s.defis.length}` : <span className="text-slate-300">—</span>}
                            </td>
                            <td className="px-4 py-3 text-center text-xs font-bold text-slate-600">
                              {s.english.length > 0 ? `${s.english.length}` : <span className="text-slate-300">—</span>}
                            </td>
                            <td className="px-4 py-3 text-center text-xs font-bold text-slate-600">
                              {s.tutor.length > 0 ? `${s.tutor.length} sess.` : <span className="text-slate-300">—</span>}
                            </td>
                          </tr>

                          {/* DÉTAIL ÉLÈVE (inline expand) */}
                          {selectedEleve === s.code_utilisateur && (
                            <tr key={`${s.code_utilisateur}-detail`}>
                              <td colSpan={9} className="bg-blue-50 px-4 pb-4 pt-2">
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                                  {[
                                    { label: "Dernier parcours", value: s.dernierParcours ? `${s.dernierParcours.score}/${s.dernierParcours.total} · ${formatDate(s.dernierParcours.created_at)}` : "—" },
                                    { label: "Dernier calcul", value: s.dernierCalcul ? `${s.dernierCalcul.score}/${s.dernierCalcul.total} · ${formatDate(s.dernierCalcul.created_at)}` : "—" },
                                    { label: "Dernier défi", value: s.dernierDefi ? `${s.dernierDefi.score}/${s.dernierDefi.total} · ${formatDate(s.dernierDefi.created_at)}` : "—" },
                                    { label: "Dernier English", value: s.dernierEnglish ? `${s.dernierEnglish.score}/${s.dernierEnglish.total} · ${s.dernierEnglish.theme ?? ""}` : "—" },
                                    { label: "Dernier Coach", value: s.dernierTutor ? `${s.dernierTutor.score_sur_20 ?? "??"}/20 · ${s.dernierTutor.notion_id}` : "—" },
                                  ].map((d) => (
                                    <div key={d.label} className="rounded-2xl bg-white p-3 shadow-sm">
                                      <p className="text-xs font-black uppercase text-slate-400">{d.label}</p>
                                      <p className="mt-1 text-sm font-bold text-slate-800">{d.value}</p>
                                    </div>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* ACTIVITÉ RÉCENTE */}
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-xl">
                <h2 className="mb-4 text-xl font-black">🛤️ Derniers parcours</h2>
                {resultatsParcours.length === 0 ? (
                  <p className="text-sm font-bold text-slate-400">Aucun parcours enregistré.</p>
                ) : (
                  <div className="space-y-2">
                    {resultatsParcours.slice(0, 6).map((r) => (
                      <div key={r.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                        <div>
                          <p className="text-sm font-black">{r.nom ?? r.code_utilisateur}</p>
                          <p className="text-xs font-bold text-slate-500">{formatDate(r.created_at)}</p>
                        </div>
                        <PctBadge pct={getPct(r.score, r.total)} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-xl">
                <h2 className="mb-4 text-xl font-black">⚡ Derniers calculs rapides</h2>
                {resultatsCalculRapide.length === 0 ? (
                  <p className="text-sm font-bold text-slate-400">Aucun calcul enregistré.</p>
                ) : (
                  <div className="space-y-2">
                    {resultatsCalculRapide.slice(0, 6).map((r) => (
                      <div key={r.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                        <div>
                          <p className="text-sm font-black">{r.nom ?? r.code_utilisateur}</p>
                          <p className="text-xs font-bold text-slate-500">{r.titre_session ?? r.theme ?? "Session"} · {formatDate(r.created_at)}</p>
                        </div>
                        <PctBadge pct={getPct(r.score, r.total)} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-xl">
                <h2 className="mb-4 text-xl font-black">🇬🇧 Derniers English Maths</h2>
                {resultatsEnglish.length === 0 ? (
                  <p className="text-sm font-bold text-slate-400">Aucun défi English enregistré.</p>
                ) : (
                  <div className="space-y-2">
                    {resultatsEnglish.slice(0, 6).map((r) => (
                      <div key={r.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                        <div>
                          <p className="text-sm font-black">{r.nom ?? r.code_utilisateur}</p>
                          <p className="text-xs font-bold text-slate-500">{r.theme ?? `Jour ${r.jour}`} · {formatDate(r.created_at)}</p>
                        </div>
                        <PctBadge pct={getPct(r.score, r.total)} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-xl">
                <h2 className="mb-4 text-xl font-black">🧠 Dernières séances Coach</h2>
                {resultatsTutor.length === 0 ? (
                  <p className="text-sm font-bold text-slate-400">Aucune séance Coach enregistrée.</p>
                ) : (
                  <div className="space-y-2">
                    {resultatsTutor.slice(0, 6).map((r) => (
                      <div key={r.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                        <div>
                          <p className="text-sm font-black">{r.nom ?? r.code_utilisateur}</p>
                          <p className="text-xs font-bold text-slate-500">{r.notion_id} · {r.classe} · {formatDate(r.created_at)}</p>
                        </div>
                        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-black text-indigo-800">
                          {r.score_sur_20 ?? "—"}/20
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
