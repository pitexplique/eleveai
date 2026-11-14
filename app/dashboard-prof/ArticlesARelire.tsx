"use client";

// « 📰 Articles à relire » (14/11/2026) : les articles que les élèves de
// l'établissement ont écrits depuis leur tableau de bord (« Écrire pour le
// Journal »). Le prof accepte, demande une correction (avec un mot) ou refuse.
// Rien n'est publié sans lui. Voir app/api/journal-propositions/route.ts.

import { useCallback, useEffect, useState } from "react";
import { STATUT_ARTICLE, nomCentre } from "../dashboard-eleve/CarteEcrireJournal";

type Article = {
  id: string;
  prenom: string | null;
  classe: string | null;
  centre: string;
  sujet: string | null;
  question: string;
  trouve: string;
  qcm_question: string;
  qcm_choix: string[];
  qcm_bonne: number;
  statut: keyof typeof STATUT_ARTICLE;
  commentaire_prof: string | null;
  created_at: string;
};

export default function ArticlesARelire({ token }: { token: string }) {
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [absente, setAbsente] = useState(false);
  const [mots, setMots] = useState<Record<string, string>>({});
  const [voirTout, setVoirTout] = useState(false);

  const charger = useCallback(() => {
    fetch("/api/journal-propositions", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok) setArticles(d.propositions ?? []);
        else if (d?.absente) setAbsente(true);
      })
      .catch(() => {});
  }, [token]);

  useEffect(charger, [charger]);

  async function decider(id: string, statut: Article["statut"]) {
    await fetch("/api/journal-propositions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, statut, commentaire: mots[id] ?? "" }),
    }).catch(() => {});
    charger();
  }

  if (absente || articles === null) return null;
  const aRelire = articles.filter((a) => a.statut === "a_relire");
  const affiches = voirTout ? articles : aRelire;

  return (
    <div className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-black">
          💡 Propositions pour le Journal{" "}
          <span className="rounded-full bg-violet-100 px-3 py-1 text-base text-violet-900">{aRelire.length}</span>
        </h2>
        {articles.length > aRelire.length && (
          <button
            onClick={() => setVoirTout(!voirTout)}
            className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-black text-slate-700 hover:bg-slate-200"
          >
            {voirTout ? "Seulement à relire" : `Tout voir (${articles.length})`}
          </button>
        )}
      </div>
      <p className="mt-1 text-sm font-semibold text-slate-500">
        Écrits par tes élèves depuis leur tableau de bord (« Écrire pour le Journal »). Rien n&apos;est publié sans toi.
      </p>

      {affiches.length === 0 && (
        <p className="mt-4 font-semibold text-slate-500">Aucune proposition à lire pour l&apos;instant.</p>
      )}

      <ul className="mt-4 space-y-4">
        {affiches.map((a) => (
          <li key={a.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-wrap items-center gap-2 text-sm font-black text-slate-600">
              <span>{a.prenom ?? "Élève"}{a.classe ? ` · ${a.classe}` : ""}</span>
              <span>· {nomCentre(a.centre, a.sujet)}</span>
              <span>· {new Date(a.created_at).toLocaleDateString("fr-FR")}</span>
              <span className={`ml-auto rounded-full px-3 py-1 text-xs ${STATUT_ARTICLE[a.statut].classe}`}>
                {STATUT_ARTICLE[a.statut].libelle}
              </span>
            </div>
            <p className="mt-2 text-lg font-black">{a.question}</p>
            <p className="mt-1 whitespace-pre-line font-medium text-slate-800">{a.trouve}</p>
            <div className="mt-3 rounded-xl bg-violet-50 p-3">
              <p className="font-bold">🎯 {a.qcm_question}</p>
              <ul className="mt-1 text-sm font-semibold">
                {a.qcm_choix.map((c, i) => (
                  <li key={i} className={i === a.qcm_bonne ? "text-emerald-700" : "text-slate-700"}>
                    {"ABC"[i]}. {c} {i === a.qcm_bonne && "✓"}
                  </li>
                ))}
              </ul>
            </div>
            <input
              value={mots[a.id] ?? a.commentaire_prof ?? ""}
              onChange={(e) => setMots({ ...mots, [a.id]: e.target.value })}
              maxLength={500}
              placeholder="Un mot pour l'élève (facultatif)"
              className="mt-3 w-full rounded-xl border-2 border-slate-200 px-3 py-2 font-semibold outline-none focus:border-violet-400"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={() => decider(a.id, "acceptee")} className="rounded-xl bg-emerald-500 px-4 py-2 font-black text-white hover:bg-emerald-600">
                ✅ Retenir
              </button>
              <button onClick={() => decider(a.id, "a_corriger")} className="rounded-xl bg-sky-500 px-4 py-2 font-black text-white hover:bg-sky-600">
                ✏️ À préciser
              </button>
              <button onClick={() => decider(a.id, "refusee")} className="rounded-xl bg-slate-200 px-4 py-2 font-black text-slate-700 hover:bg-slate-300">
                Pas retenu
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
