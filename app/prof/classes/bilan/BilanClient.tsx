"use client";

// « BILAN » — une notion du coach à la fois : un élève par ligne, un micro par
// colonne, et dans chaque case ses réponses justes / réponses, en couleur :
// 🟩 compris · 🟧 en cours · 🟥 pas compris · vide = pas travaillé.
// Données : /api/prof/classes/bilan (resultats_tutor, cumul de toutes les séances).

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useEleve } from "@/context/EleveContext";

type Cumul = { j: number; t: number };
type Notion = {
  cle: string;
  titre: string;
  classe: string;
  derniere: string;
  micros: { id: string; libelle: string }[];
  scores: Record<string, Record<string, Cumul>>;
};
type Donnees = {
  classe: { nom_classe: string; code_etablissement: string };
  eleves: { code_utilisateur: string; nom: string | null }[];
  notions: Notion[];
};

// Au moins 3 réponses avant de trancher : une seule réponse ne dit rien.
function verdict(c: Cumul | undefined): "compris" | "en-cours" | "pas-compris" | null {
  if (!c || c.t === 0) return null;
  if (c.t < 3) return "en-cours";
  const r = c.j / c.t;
  return r >= 0.8 ? "compris" : r < 0.5 ? "pas-compris" : "en-cours";
}

const CASE = {
  compris: "bg-emerald-200 text-emerald-900",
  "en-cours": "bg-amber-100 text-amber-900",
  "pas-compris": "bg-red-200 text-red-900",
};

export default function BilanClient() {
  const { eleve: user } = useEleve();
  const token = user?.token ?? null;
  const [donnees, setDonnees] = useState<Donnees | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [choix, setChoix] = useState<string>("");

  useEffect(() => {
    if (!token) return;
    const code = new URLSearchParams(window.location.search).get("code") ?? "";
    fetch(`/api/prof/classes/bilan?code=${encodeURIComponent(code)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        if (!d?.ok) return setErreur(d?.error ?? "Impossible de charger le bilan.");
        setDonnees(d);
        setChoix(d.notions?.[0]?.cle ?? "");
      })
      .catch(() => setErreur("Impossible de charger le bilan."));
  }, [token]);

  const notion = useMemo(
    () => donnees?.notions.find((n) => n.cle === choix) ?? null,
    [donnees, choix]
  );

  if (!user) return <p className="p-8">Connecte-toi pour voir le bilan de ta classe.</p>;
  if (erreur) return <p className="p-8 text-red-700">{erreur}</p>;
  if (!donnees) return <p className="p-8 text-slate-500">Chargement…</p>;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/prof/classes" className="text-sm font-semibold text-slate-600 hover:underline">
          ← Mes classes
        </Link>
        <h1 className="text-3xl font-black">{donnees.classe.nom_classe} — bilan par micro</h1>

        {donnees.notions.length === 0 ? (
          <p className="mt-6 text-slate-600">
            Rien encore : le bilan se remplit dès que tes élèves font le coach connectés avec leurs codes.
          </p>
        ) : (
          <>
            <label className="mt-6 block text-sm font-semibold text-slate-700">
              Notion
              <select
                value={choix}
                onChange={(e) => setChoix(e.target.value)}
                className="ml-2 rounded-lg border border-slate-300 bg-white px-3 py-2 font-normal"
              >
                {donnees.notions.map((n) => (
                  <option key={n.cle} value={n.cle}>
                    {n.titre} ({n.classe}) — {new Date(n.derniere).toLocaleDateString("fr-FR")}
                  </option>
                ))}
              </select>
            </label>

            {notion && (
              <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="align-bottom">
                      <th className="sticky left-0 bg-white p-2 text-left">Élève</th>
                      {notion.micros.map((m) => (
                        <th key={m.id} className="min-w-[7rem] p-2 text-left text-xs font-semibold text-slate-600">
                          {m.libelle}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {donnees.eleves.map((e) => {
                      const siens = notion.scores[e.code_utilisateur] ?? {};
                      const prenom = e.nom && !/^Élève \d+$/.test(e.nom) ? e.nom : null;
                      return (
                        <tr key={e.code_utilisateur} className="border-t border-slate-100">
                          <td className="sticky left-0 bg-white p-2 whitespace-nowrap">
                            <span className="font-mono font-bold">{e.code_utilisateur}</span>
                            {prenom && <span className="ml-2 text-slate-600">{prenom}</span>}
                          </td>
                          {notion.micros.map((m) => {
                            const c = siens[m.id];
                            const v = verdict(c);
                            return (
                              <td key={m.id} className="p-1">
                                {v && c ? (
                                  <span className={`block rounded-lg px-2 py-1 text-center font-bold ${CASE[v]}`}>
                                    {c.j}/{c.t}
                                  </span>
                                ) : (
                                  <span className="block text-center text-slate-300">·</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                    <tr className="border-t-2 border-slate-300 bg-slate-50 font-semibold">
                      <td className="sticky left-0 bg-slate-50 p-2">Classe</td>
                      {notion.micros.map((m) => {
                        const tous = Object.values(notion.scores).map((s) => s[m.id]).filter(Boolean) as Cumul[];
                        const comp = tous.filter((c) => verdict(c) === "compris").length;
                        return (
                          <td key={m.id} className="p-2 text-center text-xs text-slate-700">
                            {tous.length ? `${comp}/${tous.length} ont compris` : "—"}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <p className="mt-4 text-xs text-slate-500">
              Toutes les séances du coach, cumulées. 🟩 compris : 80 % de justes ou plus, sur 3 réponses au
              moins · 🟧 en cours · 🟥 pas compris : moins de 50 % · « · » pas encore travaillé.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
