"use client";

// « 💡 Participer au Journal » (14/11/2026 ; d'abord « Écrire pour le Journal »).
// ⛔ Frédéric, 14/11 : le journal n'est « pas écrit par les élèves, mais avec
// leur participation » : il en est l'auteur, l'élève PROPOSE (question, mesures,
// QCM). Frédéric : « on pourrait mettre
// dans le dashboard élève : écrire article », « ils peuvent choisir centre
// d'intérêt ou autre chose ». L'élève choisit son centre d'intérêt (les icônes
// de « Mes passions ») ou « Autre chose », remplit 4 cases courtes et son défi
// QCM, puis l'envoie à son prof. Rien n'est publié sans le prof.
// En BAS du tableau de bord : les maths restent en haut pour les parents.

import { useCallback, useEffect, useState } from "react";
import { useEleve } from "@/context/EleveContext";
import { CENTRES_INTERET, EMOJI_CENTRE } from "@/lib/videos/centres-interet";

type Proposition = {
  id: string;
  centre: string;
  sujet: string | null;
  question: string;
  statut: "a_relire" | "acceptee" | "a_corriger" | "refusee";
  commentaire_prof: string | null;
  created_at: string;
};

export const STATUT_ARTICLE: Record<Proposition["statut"], { libelle: string; classe: string }> = {
  a_relire: { libelle: "⏳ Chez ton prof", classe: "bg-amber-100 text-amber-900" },
  acceptee: { libelle: "✅ Retenu pour un article", classe: "bg-emerald-100 text-emerald-900" },
  a_corriger: { libelle: "✏️ À préciser", classe: "bg-sky-100 text-sky-900" },
  refusee: { libelle: "Pas retenu", classe: "bg-slate-100 text-slate-600" },
};

export const nomCentre = (id: string, sujet?: string | null) =>
  id === "autre"
    ? `✨ ${sujet || "Autre chose"}`
    : `${EMOJI_CENTRE[id] ?? "⭐"} ${CENTRES_INTERET.find((c) => c.id === id)?.nom ?? id}${sujet ? ` · ${sujet}` : ""}`;

const VIDE = { sujet: "", question: "", trouve: "", qcm: "", choix: ["", "", ""], bonne: -1 };

const champ =
  "mt-1 w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-900 outline-none focus:border-violet-400";

export default function CarteEcrireJournal() {
  const { eleve } = useEleve() as { eleve?: { token?: string | null } | null };
  const token = eleve?.token ?? "";
  const [ouvert, setOuvert] = useState(false);
  const [centre, setCentre] = useState("");
  const [f, setF] = useState(VIDE);
  const [envoi, setEnvoi] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; texte: string } | null>(null);
  const [mes, setMes] = useState<Proposition[]>([]);

  const charger = useCallback(() => {
    if (!token) return;
    fetch("/api/journal-propositions", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => d?.ok && setMes(d.propositions ?? []))
      .catch(() => {});
  }, [token]);

  useEffect(charger, [charger]);

  if (!token) return null;

  async function envoyer() {
    setEnvoi(true);
    setMessage(null);
    try {
      const r = await fetch("/api/journal-propositions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          centre,
          sujet: f.sujet,
          question: f.question,
          trouve: f.trouve,
          qcm_question: f.qcm,
          qcm_choix: f.choix,
          qcm_bonne: f.bonne,
        }),
      });
      const d = await r.json().catch(() => ({}));
      if (d?.ok) {
        setMessage({ ok: true, texte: "🎉 Envoyé ! Ton prof va lire ta proposition." });
        setF(VIDE);
        setCentre("");
        setOuvert(false);
        charger();
      } else setMessage({ ok: false, texte: d?.error ?? "Oups, réessaie." });
    } catch {
      setMessage({ ok: false, texte: "Pas de connexion, réessaie." });
    }
    setEnvoi(false);
  }

  const majChoix = (i: number, v: string) => setF({ ...f, choix: f.choix.map((c, j) => (j === i ? v : c)) });

  return (
    <div className="mt-6 rounded-[2rem] border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-6 shadow-xl">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-black text-slate-900">💡 Participer au Journal</h2>
        <span className="text-sm font-semibold text-slate-500">
          Ta question, tes mesures, ton QCM : ton prof s&apos;en sert pour l&apos;article
        </span>
        {!ouvert && (
          <button
            onClick={() => {
              setOuvert(true);
              setMessage(null);
            }}
            className="ml-auto rounded-2xl bg-violet-600 px-6 py-3 text-lg font-black text-white shadow hover:bg-violet-700"
          >
            💡 Proposer une idée
          </button>
        )}
      </div>

      {message && (
        <p className={`mt-3 font-bold ${message.ok ? "text-emerald-700" : "text-rose-700"}`}>{message.texte}</p>
      )}

      {ouvert && (
        <div className="mt-5 space-y-5">
          <div>
            <p className="font-black text-slate-800">1. Mon sujet : touche une icône</p>
            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
              {[...CENTRES_INTERET.map((c) => ({ id: c.id, nom: c.nom, emoji: EMOJI_CENTRE[c.id] ?? "⭐" })),
                { id: "autre", nom: "Autre chose", emoji: "✨" }].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCentre(c.id)}
                  aria-pressed={centre === c.id}
                  className={`flex flex-col items-center justify-center gap-1 rounded-2xl border-2 p-2 text-center transition ${
                    centre === c.id
                      ? "border-violet-500 bg-violet-100 shadow ring-4 ring-violet-300"
                      : "border-slate-200 bg-white hover:border-violet-300"
                  }`}
                >
                  <span className="text-3xl leading-none">{c.emoji}</span>
                  <span className="text-xs font-black text-slate-800">{c.nom}</span>
                </button>
              ))}
            </div>
            {centre && (
              <label className="mt-3 block text-sm font-bold text-slate-700">
                {centre === "autre" ? "Lequel ? (obligatoire)" : "En précisant ? (facultatif)"}
                <input
                  className={champ}
                  maxLength={80}
                  value={f.sujet}
                  onChange={(e) => setF({ ...f, sujet: e.target.value })}
                  placeholder={centre === "autre" ? "la lutte, le vélo, la danse…" : "la lutte, le vélo…"}
                />
              </label>
            )}
          </div>

          <label className="block font-black text-slate-800">
            2. Ma question
            <input
              className={champ}
              maxLength={300}
              value={f.question}
              onChange={(e) => setF({ ...f, question: e.target.value })}
              placeholder="Est-ce qu'on va plus vite en descente du Maïdo ?"
            />
          </label>

          <label className="block font-black text-slate-800">
            3. Ce que j&apos;ai mesuré ou trouvé (avec des nombres)
            <textarea
              className={`${champ} min-h-28`}
              maxLength={1500}
              value={f.trouve}
              onChange={(e) => setF({ ...f, trouve: e.target.value })}
              placeholder="J'ai chronométré 5 descentes : 4 min 10 s en moyenne pour 6 km…"
            />
          </label>

          <div>
            <p className="font-black text-slate-800">4. Mon défi pour les lecteurs</p>
            <input
              className={champ}
              maxLength={200}
              value={f.qcm}
              onChange={(e) => setF({ ...f, qcm: e.target.value })}
              placeholder="Ta question de défi"
            />
            <p className="mt-3 text-sm font-bold text-slate-600">3 réponses : coche la bonne ✅</p>
            <div className="mt-1 space-y-2">
              {f.choix.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <button
                    onClick={() => setF({ ...f, bonne: i })}
                    aria-label={`La réponse ${"ABC"[i]} est la bonne`}
                    aria-pressed={f.bonne === i}
                    className={`h-12 w-12 shrink-0 rounded-2xl border-2 text-lg font-black ${
                      f.bonne === i ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 bg-white text-slate-500"
                    }`}
                  >
                    {f.bonne === i ? "✓" : "ABC"[i]}
                  </button>
                  <input
                    className={`${champ} mt-0`}
                    maxLength={100}
                    value={c}
                    onChange={(e) => majChoix(i, e.target.value)}
                    placeholder={`Réponse ${"ABC"[i]}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm font-semibold text-slate-500">
            Ton prof écrit l&apos;article et choisit ce qu&apos;il garde. Dans le Journal, on écrit seulement ton prénom et ta classe.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={envoyer}
              disabled={envoi || !centre}
              className="rounded-2xl bg-emerald-500 px-6 py-3 text-lg font-black text-white shadow hover:bg-emerald-600 disabled:opacity-40"
            >
              📨 Envoyer à mon prof
            </button>
            <button
              onClick={() => setOuvert(false)}
              className="rounded-2xl bg-white px-5 py-3 font-black text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {mes.length > 0 && (
        <div className="mt-5">
          <p className="font-black text-slate-800">Mes propositions</p>
          <ul className="mt-2 space-y-2">
            {mes.map((p) => (
              <li key={p.id} className="rounded-2xl bg-white p-3 ring-1 ring-slate-200">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-black text-slate-700">{nomCentre(p.centre, p.sujet)}</span>
                  <span className={`ml-auto rounded-full px-3 py-1 text-xs font-black ${STATUT_ARTICLE[p.statut].classe}`}>
                    {STATUT_ARTICLE[p.statut].libelle}
                  </span>
                </div>
                <p className="mt-1 font-semibold text-slate-900">{p.question}</p>
                {p.commentaire_prof && (
                  <p className="mt-1 text-sm font-semibold text-sky-800">💬 Ton prof : {p.commentaire_prof}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
