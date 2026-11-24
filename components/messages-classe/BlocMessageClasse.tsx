"use client";

// ✉️ MESSAGE À LA CLASSE — le bloc du PROF (24/11/2026). Frédéric : « que le
// prof, dans son dashboard, puisse envoyer un message aux élèves par classe ».
// Il choisit une classe, écrit un message court (500 signes), envoie. En
// dessous : ses messages envoyés (date, classe, lu par N élèves), avec
// « Supprimer ». Sens unique : les élèves ne répondent pas.
// Posé dans /dashboard-prof et dans « Mes classes » (/prof/classes).
//
// 📤 24/11 — « ENVOYER LA SÉANCE À LA CLASSE » (Frédéric : « go »). Le message
// peut porter un LIEN vers le coach sur les micros cochées (le « 🔗 Lien
// élèves » du coach, ou son bouton « 📤 Envoyer à ma classe » qui revient sur
// Mes classes avec ?seance=). Chez l'élève : gros bouton « ▶ Commencer la
// séance ». Mêmes règles : 7 jours visibles, effacé à 30 jours, texte simple.

import { useCallback, useEffect, useState } from "react";

type Classe = { code_etablissement: string; nom_classe: string; nb_eleves: number };
type Message = { id: string; created_at: string; code_etablissement: string; texte: string; lus: number; lien?: string | null };
export type SeanceAEnvoyer = { lien: string; titre: string };

/** Un « 🔗 Lien élèves » collé (adresse complète ou chemin) → chemin du coach, ou null. */
function cheminDeSeance(brut: string): string | null {
  let s = brut.trim();
  if (!s) return null;
  if (/^https?:\/\//i.test(s)) {
    try {
      const u = new URL(s);
      if (u.origin !== window.location.origin && !/(^|\.)eleveai\.fr$/i.test(u.hostname)) return null;
      s = u.pathname + u.search;
    } catch {
      return null;
    }
  }
  return s.startsWith("/coach") && !s.includes("//") ? s : null;
}

const texteDeSeance = (titre: string) =>
  `Séance du jour : ${titre}. Appuie sur « Commencer la séance » et fais les exercices.`;

const MAX = 500;
// Même durée que VISIBLE_ELEVE_MS (lib/server/messagesClasse.ts) : 7 jours.
const SEPT_JOURS_MS = 7 * 24 * 3600 * 1000;

const dateCourte = (iso: string) =>
  new Date(iso).toLocaleString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function BlocMessageClasse({
  token,
  seance: seanceRecue = null,
}: {
  token: string | null;
  /** Séance préparée dans le coach (Mes classes ?seance=…&titre=…). */
  seance?: SeanceAEnvoyer | null;
}) {
  const [classes, setClasses] = useState<Classe[] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [code, setCode] = useState("");
  const [texte, setTexte] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [succes, setSucces] = useState<string | null>(null);
  const [seance, setSeance] = useState<SeanceAEnvoyer | null>(seanceRecue);
  const [lienColle, setLienColle] = useState("");
  useEffect(() => {
    if (!seanceRecue) return;
    setSeance(seanceRecue);
    setTexte((t) => t || texteDeSeance(seanceRecue.titre));
  }, [seanceRecue]);

  const charger = useCallback(async () => {
    if (!token) return;
    const r = await fetch("/api/prof/messages-classe", { headers: { Authorization: `Bearer ${token}` } });
    const d = await r.json().catch(() => ({}));
    if (!r.ok || !d?.ok) {
      // Pas un prof « Mes classes » (403) : le bloc ne s'affiche pas.
      setClasses(r.status === 403 || r.status === 401 ? [] : null);
      if (r.status !== 403 && r.status !== 401) setErreur(d?.error ?? "Messages indisponibles.");
      return;
    }
    setClasses(d.classes ?? []);
    setMessages(d.messages ?? []);
    setCode((c) => c || d.classes?.[0]?.code_etablissement || "");
  }, [token]);

  useEffect(() => {
    charger();
  }, [charger]);

  if (!token) return null;
  if (classes !== null && classes.length === 0) return null;

  const nomDe = (c: string) => classes?.find((x) => x.code_etablissement === c)?.nom_classe ?? c;
  const reste = MAX - texte.length;

  async function envoyer() {
    if (!token || !code || !texte.trim() || envoi) return;
    setEnvoi(true);
    setErreur(null);
    setSucces(null);
    try {
      const r = await fetch("/api/prof/messages-classe", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ code, texte, ...(seance ? { lien: seance.lien } : {}) }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d?.ok) {
        setErreur(d?.error ?? "Envoi impossible.");
        return;
      }
      setMessages((m) => [d.message, ...m]);
      setTexte("");
      setSucces(seance ? `Séance envoyée à la ${nomDe(code)} ✅` : `Envoyé à la ${nomDe(code)} ✅`);
      setSeance(null);
    } finally {
      setEnvoi(false);
    }
  }

  async function supprimer(id: string) {
    if (!token) return;
    if (!window.confirm("Supprimer ce message ? Les élèves ne le verront plus.")) return;
    const r = await fetch(`/api/prof/messages-classe?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (r.ok) setMessages((m) => m.filter((x) => x.id !== id));
    else setErreur("Suppression impossible.");
  }

  return (
    <section className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-xl ring-1 ring-sky-100" aria-labelledby="titre-message-classe">
      <h2 id="titre-message-classe" className="text-xl font-black">✉️ Message à la classe</h2>
      <p className="mt-1 text-sm font-semibold text-slate-500">
        Il s&apos;affiche en haut du tableau de bord de chaque élève de la classe. Les élèves ne peuvent pas répondre.
      </p>

      {classes === null && !erreur && <p className="mt-4 text-sm text-slate-500">Chargement…</p>}

      {classes && classes.length > 0 && (
        <div className="mt-4 space-y-3">
          {/* 📤 La séance à envoyer : venue du coach, ou lien collé ici. */}
          {seance ? (
            <div className="rounded-2xl border-2 border-violet-300 bg-violet-50 p-4">
              <p className="text-sm font-black text-violet-900">📤 Séance prête : {seance.titre}</p>
              <p className="mt-1 text-xs font-semibold text-slate-600">
                Chaque élève de la classe verra un bouton « ▶ Commencer la séance » en haut de son tableau de bord.
              </p>
              <button
                type="button"
                onClick={() => setSeance(null)}
                className="mt-2 text-xs font-bold text-slate-500 underline hover:text-slate-700"
              >
                Retirer la séance (message simple)
              </button>
            </div>
          ) : (
            <details className="rounded-2xl border border-dashed border-violet-300 bg-white p-3 text-sm">
              <summary className="cursor-pointer font-black text-violet-800">📤 Envoyer une séance du coach</summary>
              <p className="mt-2 text-xs font-semibold text-slate-600">
                Dans le coach : déplie la notion, coche les séries, GO, puis « 📤 Envoyer à ma classe ». Ou colle ici
                le « 🔗 Lien élèves » :
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <input
                  value={lienColle}
                  onChange={(e) => setLienColle(e.target.value)}
                  placeholder="https://eleveai.fr/coach/serie?…"
                  className="min-w-0 flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    const lien = cheminDeSeance(lienColle);
                    if (!lien) {
                      setErreur("Ce lien n'est pas une séance du coach d'EleveAI.");
                      return;
                    }
                    setErreur(null);
                    setSeance({ lien, titre: "exercices du coach" });
                    setTexte((t) => t || texteDeSeance("exercices du coach"));
                    setLienColle("");
                  }}
                  className="rounded-xl bg-violet-700 px-4 py-2 text-sm font-black text-white hover:bg-violet-800"
                >
                  Utiliser ce lien
                </button>
              </div>
            </details>
          )}
          <label className="block text-sm font-black text-slate-700">
            Classe
            <select
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-base font-semibold sm:w-72"
            >
              {classes.map((c) => (
                <option key={c.code_etablissement} value={c.code_etablissement}>
                  {c.nom_classe} ({c.nb_eleves} élève{c.nb_eleves > 1 ? "s" : ""})
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-black text-slate-700">
            Message
            <textarea
              value={texte}
              onChange={(e) => {
                setTexte(e.target.value.slice(0, MAX));
                setSucces(null);
              }}
              maxLength={MAX}
              rows={3}
              placeholder="Ex. : Devoir pour jeudi : coach fractions, 10 questions."
              className="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-base font-medium"
            />
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={envoyer}
              disabled={!texte.trim() || !code || envoi}
              className="rounded-2xl bg-sky-600 px-5 py-2.5 text-sm font-black text-white shadow hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {envoi ? "Envoi…" : seance ? `📤 Envoyer la séance à la ${nomDe(code)}` : `Envoyer à la ${nomDe(code)}`}
            </button>
            <span className={`text-xs font-bold ${reste < 50 ? "text-amber-600" : "text-slate-400"}`}>
              {reste} signes restants
            </span>
            {succes && <span className="text-sm font-black text-emerald-700">{succes}</span>}
          </div>
        </div>
      )}

      {erreur && <p className="mt-3 text-sm font-bold text-red-600">{erreur}</p>}

      {messages.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-black uppercase tracking-wide text-slate-500">Messages envoyés</h3>
          <ul className="mt-2 space-y-2">
            {messages.map((m) => (
              <li key={m.id} className="flex flex-wrap items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-500">
                    {dateCourte(m.created_at)} · <span className="text-sky-700">{nomDe(m.code_etablissement)}</span> · lu par{" "}
                    {m.lus} élève{m.lus > 1 ? "s" : ""}
                    {Date.now() - new Date(m.created_at).getTime() > SEPT_JOURS_MS && (
                      <span className="text-amber-700"> · plus visible par les élèves</span>
                    )}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap break-words text-sm font-medium text-slate-800">{m.texte}</p>
                  {m.lien && (
                    <a href={m.lien} target="_blank" rel="noopener" className="mt-1 inline-block text-xs font-black text-violet-800 underline">
                      ▶ Séance jointe (ouvrir)
                    </a>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => supprimer(m.id)}
                  className="rounded-xl bg-white px-3 py-1.5 text-xs font-black text-red-700 ring-1 ring-red-200 hover:bg-red-50"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ⭐ 24/11/2026 — Frédéric : « 7 j, effacé à 30 j ». */}
      <p className="mt-4 text-xs font-semibold text-slate-400">
        Visible 7 jours par les élèves, effacé au bout de 30 jours.
      </p>
    </section>
  );
}
