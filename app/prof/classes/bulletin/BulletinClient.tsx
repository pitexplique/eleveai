"use client";

// « BULLETIN DE LA CLASSE » (17/11/2026) — SANS IA. Une ligne par élève :
// moyenne du coach, séances, jours actifs, QUAND il travaille (matin,
// après-midi, soir, week-end), micros acquises / à revoir, et une appréciation
// à la 3e personne que le prof modifie, puis COPIE dans Pronote (une par une ou
// toute la colonne) ou IMPRIME (PDF). Données : /api/prof/classes/bulletin.
// Les modifications restent dans CE navigateur seulement (rien n'est envoyé).

import Link from "next/link";
import { useEffect, useState } from "react";
import { useEleve } from "@/context/EleveContext";

type Creneaux = { matin: number; apresMidi: number; soir: number; weekend: number };
type Ligne = {
  code_utilisateur: string;
  nom: string | null;
  pseudo: string | null;
  moyenne: number | null;
  seances: number;
  questions: number;
  videos: number;
  jours: number;
  creneaux: Creneaux;
  compris: string[];
  aRevoir: string[];
  appreciation: string;
};
type Donnees = {
  classe: { nom_classe: string; niveau: string; code_etablissement: string };
  periode: string;
  joursActivite: number;
  eleves: Ligne[];
};

const PERIODES = [
  { id: "30j", label: "30 derniers jours" },
  { id: "trim", label: "Trimestre (90 jours)" },
  { id: "debut", label: "Depuis le début" },
];

const virgule = (n: number) => n.toString().replace(".", ",");

function couleurNote(m: number | null) {
  if (m === null) return "text-slate-400";
  if (m >= 14) return "text-emerald-700";
  if (m >= 10) return "text-amber-700";
  return "text-red-700";
}

async function copier(texte: string) {
  try {
    await navigator.clipboard.writeText(texte);
    return true;
  } catch {
    return false;
  }
}

export default function BulletinClient() {
  const { eleve: user } = useEleve();
  const token = user?.token ?? null;
  const [periode, setPeriode] = useState("trim");
  const [donnees, setDonnees] = useState<Donnees | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [textes, setTextes] = useState<Record<string, string>>({});
  const [copie, setCopie] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    const code = new URLSearchParams(window.location.search).get("code") ?? "";
    setDonnees(null);
    fetch(`/api/prof/classes/bulletin?code=${encodeURIComponent(code)}&periode=${periode}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        if (!d?.ok) return setErreur(d?.error ?? "Impossible de charger le bulletin.");
        setDonnees(d);
        setTextes(Object.fromEntries(d.eleves.map((e: Ligne) => [e.code_utilisateur, e.appreciation])));
      })
      .catch(() => setErreur("Impossible de charger le bulletin."));
  }, [token, periode]);

  const signaler = (cle: string) => {
    setCopie(cle);
    setTimeout(() => setCopie((c) => (c === cle ? null : c)), 1500);
  };

  if (!user) return <p className="p-8">Connecte-toi pour voir le bulletin de ta classe.</p>;
  if (erreur) return <p className="p-8 text-red-700">{erreur}</p>;

  const nomDe = (e: Ligne) => e.nom || e.pseudo || e.code_utilisateur;
  const eleves = donnees?.eleves ?? [];

  const copierColonne = async () => {
    const t = eleves.map((e) => textes[e.code_utilisateur] ?? "").join("\n");
    if (await copier(t)) signaler("colonne");
  };
  const copierTableau = async () => {
    const entete = ["Élève", "Code", "Moyenne coach /20", "Séances", "Jours actifs", "Matin", "Après-midi", "Soir", "Week-end", "Acquis", "À revoir", "Appréciation"];
    const lignes = eleves.map((e) =>
      [
        nomDe(e),
        e.code_utilisateur,
        e.moyenne === null ? "" : virgule(e.moyenne),
        e.seances,
        e.jours,
        e.creneaux.matin,
        e.creneaux.apresMidi,
        e.creneaux.soir,
        e.creneaux.weekend,
        e.compris.join(", "),
        e.aRevoir.join(", "),
        (textes[e.code_utilisateur] ?? "").replace(/\s+/g, " "),
      ].join("\t")
    );
    if (await copier([entete.join("\t"), ...lignes].join("\n"))) signaler("tableau");
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 print:bg-white">
      <style>{`@media print { @page { size: A4 landscape; margin: 10mm; } header, footer, nav { display: none !important; } }`}</style>
      <div className="mx-auto max-w-7xl px-4 py-8 print:max-w-none print:p-0">
        <Link href="/prof/classes" className="text-sm font-semibold text-slate-600 hover:underline print:hidden">
          ← Mes classes
        </Link>
        <h1 className="text-3xl font-black print:text-xl">
          {donnees ? `${donnees.classe.nom_classe} — bulletin de la classe` : "Bulletin de la classe"}
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Notes et appréciations calculées sans IA, à partir du travail sur le coach
          {donnees ? ` · ${PERIODES.find((p) => p.id === donnees.periode)?.label.toLowerCase()}` : ""} ·
          imprimé le {new Date().toLocaleDateString("fr-FR")}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 print:hidden">
          <select
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold"
          >
            {PERIODES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
          <button onClick={copierColonne} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700">
            {copie === "colonne" ? "✅ Copié" : "📋 Copier toutes les appréciations"}
          </button>
          <button onClick={copierTableau} className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-slate-800 ring-1 ring-slate-300 hover:bg-slate-100">
            {copie === "tableau" ? "✅ Copié" : "📊 Copier le tableau (Excel)"}
          </button>
          <button onClick={() => window.print()} className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-slate-800 ring-1 ring-slate-300 hover:bg-slate-100">
            🖨️ Imprimer / PDF
          </button>
          <Link
            href={`/prof/classes/podium?code=${encodeURIComponent(donnees?.classe.code_etablissement ?? "")}`}
            className="rounded-lg bg-amber-300 px-4 py-2 text-sm font-bold text-slate-900 hover:bg-amber-200"
          >
            🏆 Podium à projeter
          </Link>
        </div>

        {!donnees ? (
          <p className="mt-8 text-slate-500">Chargement…</p>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-xl bg-white ring-1 ring-slate-200 print:overflow-visible print:ring-0">
            <table className="w-full border-collapse text-sm print:text-[9pt]">
              <thead>
                <tr className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-600">
                  <th className="p-2">Élève</th>
                  <th className="p-2 text-center">Moyenne coach</th>
                  <th className="p-2 text-center">Séances</th>
                  <th className="p-2 text-center" title="Jours où l'élève a travaillé">Jours</th>
                  <th className="p-2 text-center" title="Séances du coach selon l'heure (La Réunion)">Matin · Après-midi · Soir · Week-end</th>
                  <th className="p-2">Acquis / à revoir</th>
                  <th className="p-2">Appréciation</th>
                </tr>
              </thead>
              <tbody>
                {eleves.map((e) => {
                  const c = e.creneaux;
                  return (
                    <tr key={e.code_utilisateur} className="border-t border-slate-100 align-top print:break-inside-avoid">
                      <td className="p-2 font-semibold">
                        {nomDe(e)}
                        <div className="font-mono text-xs font-normal text-slate-500">{e.code_utilisateur}</div>
                      </td>
                      <td className={`p-2 text-center text-base font-black ${couleurNote(e.moyenne)}`}>
                        {e.moyenne === null ? "—" : `${virgule(e.moyenne)}/20`}
                      </td>
                      <td className="p-2 text-center">{e.seances}</td>
                      <td className="p-2 text-center">{e.jours}</td>
                      <td className="p-2 text-center whitespace-nowrap">
                        {e.seances ? (
                          <>
                            ☀️ {c.matin} · 🌤️ {c.apresMidi} · 🌙 {c.soir} · 🏠 {c.weekend}
                          </>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="p-2 text-xs">
                        {e.compris.length > 0 && <div className="text-emerald-800">✓ {e.compris.join(", ")}</div>}
                        {e.aRevoir.length > 0 && <div className="text-red-800">↻ {e.aRevoir.join(", ")}</div>}
                        {!e.compris.length && !e.aRevoir.length && <span className="text-slate-400">—</span>}
                      </td>
                      <td className="p-2 min-w-[18rem]">
                        <textarea
                          value={textes[e.code_utilisateur] ?? ""}
                          onChange={(ev) => setTextes((t) => ({ ...t, [e.code_utilisateur]: ev.target.value }))}
                          rows={4}
                          className="w-full rounded-md border border-slate-200 p-2 text-sm print:hidden"
                        />
                        <div className="hidden print:block">{textes[e.code_utilisateur]}</div>
                        <div className="mt-1 flex items-center justify-between text-xs text-slate-500 print:hidden">
                          <span>{(textes[e.code_utilisateur] ?? "").length} caractères</span>
                          <button
                            onClick={async () => {
                              if (await copier(textes[e.code_utilisateur] ?? "")) signaler(e.code_utilisateur);
                            }}
                            className="rounded-md bg-indigo-50 px-2 py-1 font-bold text-indigo-800 hover:bg-indigo-100"
                          >
                            {copie === e.code_utilisateur ? "✅ Copié" : "📋 Copier"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-4 text-xs text-slate-500">
          Moyenne = bonnes réponses ÷ questions × 20, sur toutes les séances du coach (une séance pèse son nombre de questions ; les séances « entraînement » choisies par l’élève ne comptent pas). Acquis : 80 % de justes ou plus, sur 3 réponses au
          moins ; à revoir : moins de 50 %. Matin 6 h-12 h, après-midi 12 h-18 h, soir après 18 h, heure de La Réunion.
          Seuls les élèves connectés avec leur code laissent une trace. Les appréciations modifiées ne sont pas
          enregistrées : copiez-les dans Pronote avant de quitter la page.
        </p>
      </div>
    </main>
  );
}
