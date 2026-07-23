"use client";

import Link from "next/link";
import { Fragment, useEffect, useMemo, useState } from "react";

import { useEleve } from "@/context/EleveContext";
import { hrefFiche, titreFiche } from "@/lib/fiches/registre";
import { prenomFromNom } from "@/lib/prenom";

type CompositionFiche = {
  matiere: string;
  classe: string;
  notion: string;
  updated_at: string;
};

type UserSession = {
  acces_id?: string | null;
  code_etablissement?: string | null;
  code_eleve?: string | null;
  code_utilisateur?: string | null;
  nom?: string | null;
  type_utilisateur?: string | null;
  token?: string | null;
};

type AccesEtablissement = {
  id: string;
  code_etablissement: string;
  code_utilisateur: string;
  type_utilisateur: string;
  nom: string | null;
  classe: string | null;
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
type ResultatDictee = ResultatBase & { classe: string | null };
type ResultatTutor = ResultatBase & { classe: string; notion_id: string; mode: string | null; score_sur_20: number | null; bonnes_reponses: number; nb_tentatives: number; details?: unknown };

type RevisionFocusRow = {
  microId: string;
  label: string;
  notionId: string;
  notionLabel?: string;
  cause?: string;
};

type EleveSynthese = {
  code_utilisateur: string;
  nom: string;
  actif: boolean;
  parcours: ResultatParcours[];
  calculs: ResultatCalculRapide[];
  defis: ResultatDefiJour[];
  english: ResultatEnglish[];
  dictees: ResultatDictee[];
  tutor: ResultatTutor[];
  totalActivites: number;
  dernierParcours: ResultatParcours | null;
  dernierCalcul: ResultatCalculRapide | null;
  dernierDefi: ResultatDefiJour | null;
  dernierEnglish: ResultatEnglish | null;
  dernierDictee: ResultatDictee | null;
  dernierTutor: ResultatTutor | null;
  aReviser: RevisionFocusRow[];
  moyenneGlobale: number | null;
};

// Prérequis « à renforcer » d'un élève : agrégés depuis details.aReviser des
// séances Coach (dédupliqués par micro, le plus récent d'abord, max 5).
function aggregateAReviser(tutor: ResultatTutor[]): RevisionFocusRow[] {
  const sorted = [...tutor].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const seen = new Set<string>();
  const out: RevisionFocusRow[] = [];
  for (const r of sorted) {
    const d = r.details as { aReviser?: unknown } | null;
    const items = Array.isArray(d?.aReviser) ? d!.aReviser : [];
    for (const it of items as RevisionFocusRow[]) {
      if (!it?.microId || seen.has(it.microId)) continue;
      seen.add(it.microId);
      out.push(it);
    }
    if (out.length >= 5) break;
  }
  return out;
}

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

const MATIERE_LABELS: Record<string, string> = {
  maths: "🔢 Maths",
  francais: "📚 Français",
  english: "🇬🇧 English",
  espagnol: "🇪🇸 Espagnol",
};

function matiereLabel(matiere: string | null | undefined) {
  if (!matiere) return "—";
  return MATIERE_LABELS[matiere] ?? matiere;
}

function isProfAllowed(user: UserSession | null) {
  const t = user?.type_utilisateur;
  return t === "prof" || t === "principal" || t === "boss";
}

function PctBadge({ pct }: { pct: number | null }) {
  if (pct === null) return <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">—</span>;
  const color = pct >= 75 ? "bg-emerald-100 text-emerald-800" : pct >= 50 ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800";
  return <span className={`rounded-full px-3 py-1 text-xs font-black ${color}`}>{pct} %</span>;
}

// --- Suivi pendant les vacances : statut d'engagement par élève ------------
// Un élève est « actif » s'il a travaillé dans les 7 derniers jours, « a
// ralenti » s'il a une activité depuis le début des vacances mais plus rien de
// récent, « inactif » s'il n'a rien fait depuis le début des vacances.
const JOURS_ACTIF = 7;

type Engagement = "actif" | "ralenti" | "inactif";

function toutesActivites(s: EleveSynthese) {
  return [...s.parcours, ...s.calculs, ...s.defis, ...s.english, ...s.tutor];
}

function derniereActiviteMs(s: EleveSynthese): number | null {
  const all = toutesActivites(s);
  if (all.length === 0) return null;
  return Math.max(...all.map((r) => new Date(r.created_at).getTime()));
}

function compterDepuis(s: EleveSynthese, depuisMs: number): number {
  return toutesActivites(s).filter((r) => new Date(r.created_at).getTime() >= depuisMs).length;
}

function statutEngagement(s: EleveSynthese, debutMs: number, nowMs: number): Engagement {
  if (compterDepuis(s, debutMs) === 0) return "inactif";
  const last = derniereActiviteMs(s);
  if (last !== null && last >= nowMs - JOURS_ACTIF * 86_400_000) return "actif";
  return "ralenti";
}

const ENGAGEMENT_META: Record<Engagement, { label: string; cls: string; ordre: number }> = {
  inactif: { label: "🔴 Inactif", cls: "bg-red-100 text-red-800", ordre: 0 },
  ralenti: { label: "🟠 A ralenti", cls: "bg-amber-100 text-amber-800", ordre: 1 },
  actif: { label: "🟢 Actif", cls: "bg-emerald-100 text-emerald-800", ordre: 2 },
};

function StatutBadge({ statut }: { statut: Engagement }) {
  const m = ENGAGEMENT_META[statut];
  return <span className={`rounded-full px-3 py-1 text-xs font-black ${m.cls}`}>{m.label}</span>;
}

export default function DashboardProfClient() {
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
  const [resultatsDictee, setResultatsDictee] = useState<ResultatDictee[]>([]);
  const [resultatsTutor, setResultatsTutor] = useState<ResultatTutor[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedEleve, setSelectedEleve] = useState<string | null>(null);
  // Suivi vacances : date de début (par défaut il y a 14 jours) + tri.
  const [vacancesDebut, setVacancesDebut] = useState<string>(() =>
    new Date(Date.now() - 14 * 86_400_000).toISOString().slice(0, 10)
  );
  const [triInactifs, setTriInactifs] = useState(true);
  // « Mes fiches de cours » : les compositions enregistrées par ce prof.
  const [mesFiches, setMesFiches] = useState<CompositionFiche[]>([]);

  useEffect(() => {
    if (!user?.token || !isProfAllowed(user)) return;
    let annule = false;
    fetch("/api/fiches/composition", {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        if (!annule && d?.ok) setMesFiches(d.compositions ?? []);
      })
      .catch(() => {
        /* table absente ou hors-ligne : l'encart reste vide */
      });
    return () => {
      annule = true;
    };
  }, [user]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErrorMessage(null);

      if (!codeEtablissement || !isProfAllowed(user)) {
        setLoading(false);
        return;
      }

      // Lecture via /api/dashboard (RLS actif : plus de select direct).
      // Le serveur vérifie le rôle (prof/principal/boss) porté par le jeton
      // et ne renvoie que les données de l'établissement du jeton.
      if (!user?.token) {
        setErrorMessage(
          "Ta session doit être renouvelée : déconnecte-toi puis reconnecte-toi pour accéder au dashboard."
        );
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/dashboard", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data?.ok) {
          setErrorMessage(data?.error ?? "Impossible de charger le dashboard.");
          setLoading(false);
          return;
        }

        const comptes = (data.comptes ?? []) as AccesEtablissement[];
        const r = data.resultats ?? {};

        setEleves(comptes.filter((c) => c.type_utilisateur === "eleve"));
        // Toutes matières confondues, triées par date : « Derniers parcours »
        // montre bien les plus récents, quelle que soit la matière.
        setResultatsParcours(
          ([
            ...(r.parcours_maths ?? []),
            ...(r.parcours_english ?? []),
            ...(r.parcours_espagnol ?? []),
            ...(r.parcours_francais ?? []),
          ] as ResultatParcours[]).sort(
            (a, b) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
        );
        setResultatsCalculRapide((r.calcul_rapide ?? []) as ResultatCalculRapide[]);
        setResultatsDefisJour((r.defis_jour ?? []) as ResultatDefiJour[]);
        setResultatsEnglish((r.english_maths ?? []) as ResultatEnglish[]);
        setResultatsDictee((r.dictee ?? []) as ResultatDictee[]);
        setResultatsTutor((r.tutor ?? []) as ResultatTutor[]);
      } catch (err) {
        console.error(err);
        setErrorMessage("Impossible de charger le dashboard.");
      }

      setLoading(false);
    }

    load();
  }, [codeEtablissement, user]);

  const syntheses = useMemo<EleveSynthese[]>(() => {
    return eleves.map((eleve) => {
      const parcours = resultatsParcours.filter((r) => r.code_utilisateur === eleve.code_utilisateur);
      const calculs = resultatsCalculRapide.filter((r) => r.code_utilisateur === eleve.code_utilisateur);
      const defis = resultatsDefisJour.filter((r) => r.code_utilisateur === eleve.code_utilisateur);
      const english = resultatsEnglish.filter((r) => r.code_utilisateur === eleve.code_utilisateur);
      const dictees = resultatsDictee.filter((r) => r.code_utilisateur === eleve.code_utilisateur);
      const tutor = resultatsTutor.filter((r) => r.code_utilisateur === eleve.code_utilisateur);

      const allResults = [...parcours, ...calculs, ...defis, ...english, ...dictees];

      return {
        code_utilisateur: eleve.code_utilisateur,
        nom: eleve.nom ?? "Élève sans nom",
        actif: eleve.actif,
        parcours, calculs, defis, english, dictees, tutor,
        totalActivites: allResults.length + tutor.length,
        dernierParcours: getLast(parcours),
        dernierCalcul: getLast(calculs),
        dernierDefi: getLast(defis),
        dernierEnglish: getLast(english),
        dernierDictee: getLast(dictees),
        dernierTutor: getLast(tutor),
        aReviser: aggregateAReviser(tutor),
        moyenneGlobale: getAveragePct(allResults),
      };
    });
  }, [eleves, resultatsParcours, resultatsCalculRapide, resultatsDefisJour, resultatsEnglish, resultatsDictee, resultatsTutor]);

  // Élèves enrichis du statut d'engagement, triés (moins actifs d'abord).
  const debutMs = useMemo(() => {
    const t = new Date(`${vacancesDebut}T00:00:00`).getTime();
    return Number.isFinite(t) ? t : 0;
  }, [vacancesDebut]);

  const elevesAvecStatut = useMemo(() => {
    const now = Date.now();
    const list = syntheses.map((s) => ({
      ...s,
      statut: statutEngagement(s, debutMs, now),
      activitesPeriode: compterDepuis(s, debutMs),
    }));
    if (triInactifs) {
      list.sort((a, b) => {
        const diff = ENGAGEMENT_META[a.statut].ordre - ENGAGEMENT_META[b.statut].ordre;
        if (diff !== 0) return diff; // inactif → ralenti → actif
        return (derniereActiviteMs(a) ?? 0) - (derniereActiviteMs(b) ?? 0); // plus ancien d'abord
      });
    }
    return list;
  }, [syntheses, debutMs, triInactifs]);

  const compteStatut = useMemo(() => {
    const c = { actif: 0, ralenti: 0, inactif: 0 };
    for (const e of elevesAvecStatut) c[e.statut] += 1;
    return c;
  }, [elevesAvecStatut]);

  const totalEleves = eleves.length;
  const totalActifs = syntheses.filter((s) => s.totalActivites > 0).length;
  const totalActivites = resultatsParcours.length + resultatsCalculRapide.length + resultatsDefisJour.length + resultatsEnglish.length + resultatsDictee.length + resultatsTutor.length;
  const moyenneEtab = getAveragePct([...resultatsParcours, ...resultatsCalculRapide, ...resultatsDefisJour, ...resultatsEnglish, ...resultatsDictee]);

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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 px-4 py-8 text-slate-950">
      <section className="mx-auto max-w-7xl space-y-6">

        {/* HEADER */}
        <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-blue-800 ring-1 ring-blue-200">
                {user.type_utilisateur === "principal" ? "Dashboard Principal" : "Dashboard Professeur"}
              </div>
              <h1 className="mt-4 text-3xl font-black md:text-5xl">
                Bonjour {prenomFromNom(user.nom) ?? "professeur"} 👋
              </h1>
              <p className="mt-2 font-semibold text-slate-600">
                Établissement : <span className="font-black text-slate-950">{codeEtablissement}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { href: "/parcours", label: "🛤️ Parcours", color: "bg-violet-100 text-violet-900 ring-1 ring-violet-200" },
                { href: "/calcul-rapide", label: "⚡ Calcul", color: "bg-lime-100 text-lime-900 ring-1 ring-lime-200" },
                { href: "/defis-du-jour", label: "🎯 Défis", color: "bg-orange-100 text-orange-900 ring-1 ring-orange-200" },
                { href: "/english-maths", label: "🇬🇧 English", color: "bg-sky-100 text-sky-900 ring-1 ring-sky-200" },
                { href: "/coach-ia/maths", label: "🧠 Coach", color: "bg-indigo-100 text-indigo-900 ring-1 ring-indigo-200" },
              ].map((l) => (
                <Link key={l.href} href={l.href}
                  className={`rounded-2xl ${l.color} px-4 py-2 text-sm font-black shadow-sm hover:brightness-95 transition`}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-6 font-black text-slate-700 shadow-xl">Chargement des données…</div>
        ) : errorMessage ? (
          <div className="rounded-3xl bg-red-50 p-6 font-black text-red-700 ring-1 ring-red-200">{errorMessage}</div>
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

            {/* MES FICHES DE COURS (compositions enregistrées) */}
            <div className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-black">📚 Mes fiches de cours</h2>
                <Link
                  href="/fiches-cours"
                  className="rounded-2xl bg-sky-100 px-4 py-2 text-sm font-black text-sky-900 ring-1 ring-sky-200 transition hover:brightness-95"
                >
                  Toutes les fiches
                </Link>
              </div>
              {mesFiches.length === 0 ? (
                <p className="mt-3 text-sm font-semibold text-slate-500">
                  Compose ta première fiche : ouvre une fiche de cours et
                  clique sur « Composer ma fiche » — tes rubriques, ton ordre,
                  comme tu fais cours. Elle apparaîtra ici.
                </p>
              ) : (
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {mesFiches.map((f) => (
                    <li key={`${f.matiere}/${f.classe}/${f.notion}`}>
                      <Link
                        href={hrefFiche(f.matiere, f.classe, f.notion)}
                        className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-sky-300 hover:bg-sky-50"
                      >
                        <p className="font-black capitalize text-slate-900">
                          {titreFiche(f.matiere, f.classe, f.notion)}
                        </p>
                        <p className="mt-1 text-xs font-bold uppercase text-slate-500">
                          {f.matiere} · {f.classe}
                        </p>
                        <p className="mt-2 text-xs font-bold text-slate-400">
                          Composée le{" "}
                          {new Date(f.updated_at).toLocaleDateString("fr-FR")}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
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

              {/* SUIVI VACANCES : période + tri + comptes d'engagement */}
              <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl bg-slate-50 p-3">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-600">
                  🏖️ Vacances depuis
                  <input
                    type="date"
                    value={vacancesDebut}
                    onChange={(e) => setVacancesDebut(e.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm font-bold text-slate-800"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setTriInactifs((v) => !v)}
                  className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
                    triInactifs
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                  }`}
                >
                  ↕️ Moins actifs d&apos;abord
                </button>
                <div className="ml-auto flex items-center gap-2 text-xs font-black">
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-800">🟢 {compteStatut.actif}</span>
                  <span className="rounded-full bg-amber-100 px-2 py-1 text-amber-800">🟠 {compteStatut.ralenti}</span>
                  <span className="rounded-full bg-red-100 px-2 py-1 text-red-800">🔴 {compteStatut.inactif}</span>
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
                        <th className="px-4 py-3 font-black text-center">🏖️ Vacances</th>
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
                      {elevesAvecStatut.map((s) => (
                        <Fragment key={s.code_utilisateur}>
                          <tr
                            onClick={() => setSelectedEleve(selectedEleve === s.code_utilisateur ? null : s.code_utilisateur)}
                            className={`cursor-pointer border-b border-slate-100 transition hover:bg-blue-50/60 ${selectedEleve === s.code_utilisateur ? "bg-blue-50" : ""}`}
                          >
                            <td className="px-4 py-3 font-black text-slate-950">{s.nom}</td>
                            <td className="px-4 py-3 font-bold text-slate-500">{s.code_utilisateur}</td>
                            <td className="px-4 py-3 text-center">
                              <StatutBadge statut={s.statut} />
                              {s.activitesPeriode > 0 ? (
                                <span className="mt-1 block text-[11px] font-bold text-slate-400">
                                  {s.activitesPeriode} act. depuis
                                </span>
                              ) : null}
                            </td>
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
                            <tr>
                              <td colSpan={10} className="bg-blue-50 px-4 pb-4 pt-2">
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                  {[
                                    { label: "Dernier parcours", value: s.dernierParcours ? `${matiereLabel(s.dernierParcours.matiere)} · ${s.dernierParcours.score}/${s.dernierParcours.total} · ${formatDate(s.dernierParcours.created_at)}` : "—" },
                                    {
                                      label: "Parcours par matière",
                                      value: s.parcours.length > 0
                                        ? Object.entries(
                                            s.parcours.reduce<Record<string, number>>((acc, p) => {
                                              acc[p.matiere] = (acc[p.matiere] ?? 0) + 1;
                                              return acc;
                                            }, {})
                                          )
                                            .map(([m, n]) => `${matiereLabel(m)} ×${n}`)
                                            .join(" · ")
                                        : "—",
                                    },
                                    { label: "Dernier calcul", value: s.dernierCalcul ? `${s.dernierCalcul.score}/${s.dernierCalcul.total} · ${formatDate(s.dernierCalcul.created_at)}` : "—" },
                                    { label: "Dernier défi", value: s.dernierDefi ? `${s.dernierDefi.score}/${s.dernierDefi.total} · ${formatDate(s.dernierDefi.created_at)}` : "—" },
                                    { label: "Dernier English", value: s.dernierEnglish ? `${s.dernierEnglish.score}/${s.dernierEnglish.total} · ${s.dernierEnglish.theme ?? ""}` : "—" },
                                    { label: "Dernière dictée", value: s.dernierDictee ? `${s.dernierDictee.score}/${s.dernierDictee.total} · ${formatDate(s.dernierDictee.created_at)}` : "—" },
                                    { label: "Dernier Coach", value: s.dernierTutor ? `${s.dernierTutor.score_sur_20 ?? "??"}/20 · ${s.dernierTutor.notion_id}` : "—" },
                                  ].map((d) => (
                                    <div key={d.label} className="rounded-2xl bg-white p-3 shadow-sm">
                                      <p className="text-xs font-black uppercase text-slate-400">{d.label}</p>
                                      <p className="mt-1 text-sm font-bold text-slate-800">{d.value}</p>
                                    </div>
                                  ))}
                                </div>

                                {/* À RENFORCER : prérequis fragiles repérés par la remédiation du Coach */}
                                {s.aReviser.length > 0 && (
                                  <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                                    <p className="text-xs font-black uppercase tracking-wide text-amber-700">
                                      📌 À renforcer (repéré par le Coach)
                                    </p>
                                    <ul className="mt-2 space-y-2">
                                      {s.aReviser.map((r) => (
                                        <li key={r.microId} className="text-sm">
                                          <span className="font-black text-slate-900">{r.label}</span>
                                          {r.notionLabel ? (
                                            <span className="font-bold text-slate-400"> · {r.notionLabel}</span>
                                          ) : null}
                                          {r.cause ? (
                                            <p className="font-semibold text-amber-800">{r.cause}</p>
                                          ) : null}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </td>
                            </tr>
                          )}
                        </Fragment>
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
                          <p className="text-xs font-bold text-slate-500">{matiereLabel(r.matiere)} · {formatDate(r.created_at)}</p>
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

              <div className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-xl">
                <h2 className="mb-4 text-xl font-black">✍️ Dernières dictées du jour</h2>
                {resultatsDictee.length === 0 ? (
                  <p className="text-sm font-bold text-slate-400">Aucune dictée enregistrée.</p>
                ) : (
                  <div className="space-y-2">
                    {resultatsDictee.slice(0, 6).map((r) => (
                      <div key={r.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                        <div>
                          <p className="text-sm font-black">{r.nom ?? r.code_utilisateur}</p>
                          <p className="text-xs font-bold text-slate-500">
                            {r.classe ? `${r.classe} · ` : ""}{formatDate(r.created_at)}
                          </p>
                        </div>
                        <PctBadge pct={getPct(r.score, r.total)} />
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
