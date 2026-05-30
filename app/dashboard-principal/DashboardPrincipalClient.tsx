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

type AccesRow = {
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

type ResultatTutor = ResultatBase & {
  classe: string;
  notion_id: string;
  score_sur_20: number | null;
  bonnes_reponses: number;
  nb_tentatives: number;
};

type EleveSynthese = {
  code_utilisateur: string;
  nom: string;
  actif: boolean;
  nbParcours: number;
  nbCalcul: number;
  nbDefis: number;
  nbEnglish: number;
  nbTutor: number;
  total: number;
  moyenne: number | null;
  dernierResultat: string | null;
};

function formatDate(value?: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit", month: "2-digit", year: "numeric",
  }).format(new Date(value));
}

function getPct(score: number, total: number) {
  if (!total || total <= 0) return 0;
  return Math.round((Number(score) / Number(total)) * 100);
}

function PctBadge({ pct }: { pct: number | null }) {
  if (pct === null) return <span className="text-slate-400 font-bold">—</span>;
  const color = pct >= 75 ? "bg-emerald-100 text-emerald-800" : pct >= 50 ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-black ${color}`}>{pct} %</span>;
}

function isPrincipal(user: UserSession | null) {
  return user?.type_utilisateur === "principal" || user?.type_utilisateur === "boss";
}

export default function DashboardPrincipalClient() {
  const supabase = useMemo(() => createClient(), []);
  const ctx = useEleve() as unknown as { eleve?: UserSession | null };
  const user = ctx.eleve ?? null;
  const codeEtab = user?.code_etablissement?.trim() ?? "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [comptes, setComptes] = useState<AccesRow[]>([]);
  const [parcours, setParcours] = useState<ResultatBase[]>([]);
  const [calculs, setCalculs] = useState<ResultatBase[]>([]);
  const [defis, setDefis] = useState<ResultatBase[]>([]);
  const [english, setEnglish] = useState<ResultatBase[]>([]);
  const [tutor, setTutor] = useState<ResultatTutor[]>([]);

  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  useEffect(() => {
    if (!codeEtab || !isPrincipal(user)) { setLoading(false); return; }

    async function load() {
      setLoading(true);
      setError(null);

      const [comptesRes, parcoursRes, calculRes, defisRes, englishRes, tutorRes] = await Promise.all([
        supabase.from("acces_etablissement")
          .select("id, code_etablissement, code_utilisateur, type_utilisateur, nom, actif, created_at")
          .eq("code_etablissement", codeEtab)
          .order("type_utilisateur").order("nom"),

        supabase.from("resultats_parcours")
          .select("id, code_etablissement, code_utilisateur, nom, score, total, pourcentage, created_at")
          .eq("code_etablissement", codeEtab)
          .order("created_at", { ascending: false }),

        supabase.from("resultats_calcul_rapide")
          .select("id, code_etablissement, code_utilisateur, nom, score, total, pourcentage, created_at")
          .eq("code_etablissement", codeEtab)
          .order("created_at", { ascending: false }),

        supabase.from("resultats_defis_jour")
          .select("id, code_etablissement, code_utilisateur, nom, score, total, pourcentage, created_at")
          .eq("code_etablissement", codeEtab)
          .order("created_at", { ascending: false }),

        supabase.from("resultats_english_maths")
          .select("id, code_etablissement, code_utilisateur, nom, score, total, pourcentage, created_at")
          .eq("code_etablissement", codeEtab)
          .order("created_at", { ascending: false }),

        supabase.from("resultats_tutor")
          .select("id, code_etablissement, code_utilisateur, nom, classe, notion_id, score_sur_20, bonnes_reponses, nb_tentatives, score, total, created_at")
          .eq("code_etablissement", codeEtab)
          .order("created_at", { ascending: false }),
      ]);

      if (comptesRes.error) { setError("Erreur de chargement."); setLoading(false); return; }

      setComptes((comptesRes.data ?? []) as AccesRow[]);
      setParcours((parcoursRes.data ?? []) as ResultatBase[]);
      setCalculs((calculRes.data ?? []) as ResultatBase[]);
      setDefis((defisRes.data ?? []) as ResultatBase[]);
      setEnglish((englishRes.data ?? []) as ResultatBase[]);
      setTutor((tutorRes.data ?? []) as ResultatTutor[]);
      setLoading(false);
    }

    load();
  }, [codeEtab, supabase, user]);

  const eleves = useMemo(() => comptes.filter((c) => c.type_utilisateur === "eleve"), [comptes]);
  const profs = useMemo(() => comptes.filter((c) => c.type_utilisateur === "prof"), [comptes]);

  const syntheses = useMemo<EleveSynthese[]>(() => {
    return eleves.map((e) => {
      const p = parcours.filter((r) => r.code_utilisateur === e.code_utilisateur);
      const c = calculs.filter((r) => r.code_utilisateur === e.code_utilisateur);
      const d = defis.filter((r) => r.code_utilisateur === e.code_utilisateur);
      const en = english.filter((r) => r.code_utilisateur === e.code_utilisateur);
      const t = tutor.filter((r) => r.code_utilisateur === e.code_utilisateur);
      const tous = [...p, ...c, ...d, ...en];
      const valid = tous.filter((r) => r.total > 0);
      const moyenne = valid.length > 0
        ? Math.round(valid.reduce((s, r) => s + getPct(r.score, r.total), 0) / valid.length)
        : null;
      const dates = [...tous, ...t].map((r) => r.created_at).sort().reverse();

      return {
        code_utilisateur: e.code_utilisateur,
        nom: e.nom ?? "Sans nom",
        actif: e.actif,
        nbParcours: p.length,
        nbCalcul: c.length,
        nbDefis: d.length,
        nbEnglish: en.length,
        nbTutor: t.length,
        total: tous.length + t.length,
        moyenne,
        dernierResultat: dates[0] ?? null,
      };
    });
  }, [eleves, parcours, calculs, defis, english, tutor]);

  const filtered = useMemo(() => {
    if (!search.trim()) return syntheses;
    const q = search.toLowerCase();
    return syntheses.filter((s) =>
      s.nom.toLowerCase().includes(q) || s.code_utilisateur.toLowerCase().includes(q)
    );
  }, [syntheses, search]);

  const totalActivites = parcours.length + calculs.length + defis.length + english.length + tutor.length;
  const eleveActifs = syntheses.filter((s) => s.total > 0).length;
  const moyenneGlobale = (() => {
    const all = [...parcours, ...calculs, ...defis, ...english].filter((r) => r.total > 0);
    if (all.length === 0) return null;
    return Math.round(all.reduce((s, r) => s + getPct(r.score, r.total), 0) / all.length);
  })();

  const eleveDetail = selectedCode ? syntheses.find((s) => s.code_utilisateur === selectedCode) ?? null : null;
  const eleveDetailParcours = selectedCode ? parcours.filter((r) => r.code_utilisateur === selectedCode) : [];
  const eleveDetailCalcul = selectedCode ? calculs.filter((r) => r.code_utilisateur === selectedCode) : [];

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-6 shadow-xl">
          <h1 className="text-2xl font-black">Dashboard principal</h1>
          <p className="mt-3 text-slate-600 font-semibold">Connecte-toi avec un compte principal.</p>
          <Link href="/auth/signin-eleve" className="mt-5 inline-flex rounded-2xl bg-blue-600 px-5 py-3 font-black text-white">Se connecter</Link>
        </div>
      </main>
    );
  }

  if (!isPrincipal(user)) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-6 shadow-xl">
          <h1 className="text-2xl font-black">Accès réservé au principal</h1>
          <Link href="/dashboard-prof" className="mt-5 inline-flex rounded-2xl bg-blue-600 px-5 py-3 font-black text-white">Dashboard prof</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-50 px-4 py-8 text-slate-950">
      <section className="mx-auto max-w-7xl space-y-6">

        {/* HEADER */}
        <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-indigo-800 ring-1 ring-indigo-200">
                🏫 Dashboard Principal
              </div>
              <h1 className="mt-4 text-3xl font-black md:text-5xl">
                Bonjour {user.nom ?? "Principal"} 👋
              </h1>
              <p className="mt-2 font-semibold text-slate-600">
                Établissement : <span className="font-black text-slate-950">{codeEtab}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/dashboard-prof" className="rounded-2xl bg-blue-100 px-4 py-2 text-sm font-black text-blue-900 ring-1 ring-blue-200 hover:bg-blue-200">
                👩‍🏫 Vue professeur
              </Link>
              <Link href="/accueil" className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-black text-slate-800 ring-1 ring-slate-200 hover:bg-slate-200">
                🏠 Accueil
              </Link>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-6 font-black text-slate-600 shadow-xl">Chargement…</div>
        ) : error ? (
          <div className="rounded-3xl bg-red-50 p-6 font-black text-red-700 ring-1 ring-red-200">{error}</div>
        ) : (
          <>
            {/* STATS GLOBALES */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {[
                { label: "Élèves inscrits", value: eleves.length, sub: "Comptes élèves", color: "text-emerald-600" },
                { label: "Élèves actifs", value: `${eleveActifs} / ${eleves.length}`, sub: "≥ 1 activité enregistrée", color: "text-sky-600" },
                { label: "Profs / Staff", value: profs.length, sub: "Comptes professeurs", color: "text-indigo-600" },
                { label: "Activités totales", value: totalActivites, sub: "Tous modules confondus", color: "text-amber-600" },
                { label: "Moyenne générale", value: moyenneGlobale !== null ? `${moyenneGlobale} %` : "—", sub: "Tous élèves · tous modules", color: "text-purple-600" },
              ].map((s) => (
                <div key={s.label} className="rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-slate-100">
                  <p className="text-xs font-black uppercase text-slate-400">{s.label}</p>
                  <p className={`mt-2 text-3xl font-black ${s.color}`}>{s.value}</p>
                  <p className="mt-1 text-xs font-bold text-slate-400">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* RECHERCHE + TABLEAU ÉLÈVES */}
            <div className="rounded-[2rem] bg-white p-6 shadow-2xl ring-1 ring-slate-100">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-black">Tous les élèves — {codeEtab}</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    Cliquer sur un élève pour voir son détail.
                  </p>
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un élève…"
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:w-64"
                />
              </div>

              {filtered.length === 0 ? (
                <div className="rounded-2xl bg-amber-50 p-4 font-bold text-amber-800">
                  Aucun élève trouvé.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b-2 border-slate-200 bg-slate-50">
                        <th className="px-4 py-3 font-black text-slate-600">Élève</th>
                        <th className="px-4 py-3 font-black text-slate-600">Code</th>
                        <th className="px-4 py-3 text-center font-black text-slate-600">Total</th>
                        <th className="px-4 py-3 text-center font-black text-slate-600">Moyenne</th>
                        <th className="px-4 py-3 text-center font-black text-violet-600">🛤️ Parcours</th>
                        <th className="px-4 py-3 text-center font-black text-lime-600">⚡ Calcul</th>
                        <th className="px-4 py-3 text-center font-black text-orange-600">🎯 Défis</th>
                        <th className="px-4 py-3 text-center font-black text-sky-600">🇬🇧 EN</th>
                        <th className="px-4 py-3 text-center font-black text-indigo-600">🧠 Coach</th>
                        <th className="px-4 py-3 font-black text-slate-600">Dernière activité</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((s) => (
                        <>
                          <tr
                            key={s.code_utilisateur}
                            onClick={() => setSelectedCode(selectedCode === s.code_utilisateur ? null : s.code_utilisateur)}
                            className={`cursor-pointer border-b border-slate-100 transition hover:bg-indigo-50/60 ${selectedCode === s.code_utilisateur ? "bg-indigo-50" : ""}`}
                          >
                            <td className="px-4 py-3 font-black">{s.nom}</td>
                            <td className="px-4 py-3 font-bold text-slate-500">{s.code_utilisateur}</td>
                            <td className="px-4 py-3 text-center font-black">
                              {s.total > 0 ? (
                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">{s.total}</span>
                              ) : (
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">0</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-center"><PctBadge pct={s.moyenne} /></td>
                            <td className="px-4 py-3 text-center text-xs font-bold text-slate-500">{s.nbParcours > 0 ? s.nbParcours : <span className="text-slate-300">—</span>}</td>
                            <td className="px-4 py-3 text-center text-xs font-bold text-slate-500">{s.nbCalcul > 0 ? s.nbCalcul : <span className="text-slate-300">—</span>}</td>
                            <td className="px-4 py-3 text-center text-xs font-bold text-slate-500">{s.nbDefis > 0 ? s.nbDefis : <span className="text-slate-300">—</span>}</td>
                            <td className="px-4 py-3 text-center text-xs font-bold text-slate-500">{s.nbEnglish > 0 ? s.nbEnglish : <span className="text-slate-300">—</span>}</td>
                            <td className="px-4 py-3 text-center text-xs font-bold text-slate-500">{s.nbTutor > 0 ? s.nbTutor : <span className="text-slate-300">—</span>}</td>
                            <td className="px-4 py-3 text-xs font-bold text-slate-400">{formatDate(s.dernierResultat)}</td>
                          </tr>

                          {/* DÉTAIL inline */}
                          {selectedCode === s.code_utilisateur && (
                            <tr key={`${s.code_utilisateur}-detail`}>
                              <td colSpan={10} className="bg-indigo-50 px-6 pb-5 pt-3">
                                <p className="mb-3 text-sm font-black text-indigo-800">
                                  Détail — {s.nom} ({s.code_utilisateur})
                                </p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  {/* Parcours */}
                                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                                    <p className="mb-2 text-xs font-black uppercase text-violet-600">🛤️ Derniers parcours</p>
                                    {eleveDetailParcours.length === 0 ? (
                                      <p className="text-xs text-slate-400">Aucun parcours.</p>
                                    ) : (
                                      <div className="space-y-1">
                                        {eleveDetailParcours.slice(0, 4).map((r) => (
                                          <div key={r.id} className="flex items-center justify-between text-xs">
                                            <span className="font-bold text-slate-600">{formatDate(r.created_at)}</span>
                                            <PctBadge pct={getPct(r.score, r.total)} />
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  {/* Calcul rapide */}
                                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                                    <p className="mb-2 text-xs font-black uppercase text-lime-600">⚡ Derniers calculs rapides</p>
                                    {eleveDetailCalcul.length === 0 ? (
                                      <p className="text-xs text-slate-400">Aucun calcul.</p>
                                    ) : (
                                      <div className="space-y-1">
                                        {eleveDetailCalcul.slice(0, 4).map((r) => (
                                          <div key={r.id} className="flex items-center justify-between text-xs">
                                            <span className="font-bold text-slate-600">{formatDate(r.created_at)}</span>
                                            <PctBadge pct={getPct(r.score, r.total)} />
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
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

            {/* LISTE DES PROFS */}
            <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100">
              <h2 className="mb-4 text-xl font-black">👩‍🏫 Équipe pédagogique — {codeEtab}</h2>
              {profs.length === 0 ? (
                <p className="text-sm font-bold text-slate-400">Aucun prof enregistré.</p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {profs.map((p) => (
                    <div key={p.id} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="font-black text-slate-950">{p.nom ?? "Sans nom"}</p>
                      <p className="mt-0.5 text-xs font-bold text-slate-500">{p.code_utilisateur} · {p.type_utilisateur}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
