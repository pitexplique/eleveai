"use client";

// « PODIUM » (17/11/2026) — à PROJETER en classe : les 3 élèves de la semaine
// (ou du mois) et une médaille par qualité (régularité, persévérance,
// précision, progression, compétences acquises, travail à la maison).
// ⛔ Jamais de note à l'écran : seulement les prénoms et ce qui est positif.
// Calcul sans IA dans /api/prof/classes/bulletin (classement).

import Link from "next/link";
import { useEffect, useState } from "react";
import { useEleve } from "@/context/EleveContext";
import { ChoisirUneClasse, ConnecteToiProf, ErreurProf, useCodeClasse } from "@/components/prof/OutilsClasse";

type Place = { code_utilisateur: string; nom: string; raisons: string[] };
type Medaille = { id: string; emoji: string; titre: string; code_utilisateur: string; nom: string; texte: string };
type Classement = { podium: Place[]; medailles: Medaille[]; participants: number };
type Donnees = {
  classe: { nom_classe: string };
  semaine: Classement;
  mois: Classement;
  eleves: { code_utilisateur: string; nom: string | null; pseudo: string | null }[];
};
// « À l'honneur » : choisi par le PROF (le calcul ne fait que proposer).
// Gardé dans CE navigateur (celui qui projette), par classe et par période.
type Honneur = { code: string; nom: string; motif: string; mot: string };
const MOTIFS = ["🤝 Entraide", "💪 Effort", "🌟 Comportement", "❓ Belle question", "📈 Progrès", "🎨 Créativité"];
const cleHonneur = (code: string, vue: string) => {
  const d = new Date();
  const periode =
    vue === "mois"
      ? d.toISOString().slice(0, 7)
      : `${d.getFullYear()}-S${Math.ceil(((d.getTime() - new Date(d.getFullYear(), 0, 1).getTime()) / 864e5 + 1) / 7)}`;
  return `eleveai-honneur-${code}-${periode}`;
};

const MARCHES = [
  { rang: 1, emoji: "🥇", hauteur: "h-40", couleur: "bg-amber-300", ordre: "order-2" },
  { rang: 2, emoji: "🥈", hauteur: "h-28", couleur: "bg-slate-300", ordre: "order-1" },
  { rang: 3, emoji: "🥉", hauteur: "h-20", couleur: "bg-orange-300", ordre: "order-3" },
];

// Le prénom seul (« Léa M. » → « Léa M. », « MARTIN Léa » reste tel quel).
const court = (nom: string) => nom.trim().split(/\s+/).slice(0, 2).join(" ");

export default function PodiumClient() {
  const { eleve: user, pret } = useEleve();
  const codeUrl = useCodeClasse();
  const token = user?.token ?? null;
  const [donnees, setDonnees] = useState<Donnees | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [vue, setVue] = useState<"semaine" | "mois">("semaine");
  const [code, setCode] = useState("");
  const [honneur, setHonneur] = useState<Honneur | null>(null);
  const [edition, setEdition] = useState(false);
  const [brouillon, setBrouillon] = useState<Honneur>({ code: "", nom: "", motif: MOTIFS[0], mot: "" });

  useEffect(() => {
    if (!code) return;
    try {
      const t = localStorage.getItem(cleHonneur(code, vue));
      setHonneur(t ? JSON.parse(t) : null);
    } catch {
      setHonneur(null);
    }
  }, [code, vue]);

  const enregistrer = (h: Honneur | null) => {
    setHonneur(h);
    setEdition(false);
    try {
      if (h) localStorage.setItem(cleHonneur(code, vue), JSON.stringify(h));
      else localStorage.removeItem(cleHonneur(code, vue));
    } catch {
      /* navigateur privé : l'honneur reste affiché jusqu'au rechargement */
    }
  };

  useEffect(() => {
    if (!token) return;
    const c = new URLSearchParams(window.location.search).get("code") ?? "";
    setCode(c);
    fetch(`/api/prof/classes/bulletin?code=${encodeURIComponent(c)}&periode=30j`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => (d?.ok ? setDonnees(d) : setErreur(d?.error ?? "Impossible de charger le podium.")))
      .catch(() => setErreur("Impossible de charger le podium."));
  }, [token]);

  if (!pret) return <p className="p-8 text-slate-500">Chargement…</p>;

  if (!user) return <ConnecteToiProf texte="Connecte-toi pour afficher le podium de ta classe." />;
  if (codeUrl === "") return <ChoisirUneClasse page="podium" token={token} />;
  if (erreur) return <ErreurProf message={erreur} />;
  if (!donnees) return <p className="p-8 text-slate-500">Chargement…</p>;

  const c = donnees[vue];
  // Confettis : positions fixes (pas de hasard au rendu) pour éviter les sauts.
  const confettis = Array.from({ length: 28 }, (_, i) => ({
    gauche: (i * 37) % 100,
    delai: (i * 0.53) % 6,
    duree: 5 + ((i * 7) % 5),
    emoji: ["🎉", "⭐", "🎊", "✨"][i % 4],
  }));

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-indigo-950 to-slate-900 text-white">
      <link rel="stylesheet" href="/ti-margo/animations/ti-margo-animations.css" />
      <style>{`
        @keyframes podium-confetti { 0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(110vh) rotate(540deg); opacity: 0.7; } }
        @keyframes podium-monte { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes podium-apparait { 0% { transform: translateY(30px) scale(0.6); opacity: 0; } 70% { transform: translateY(-6px) scale(1.08); opacity: 1; } 100% { transform: none; opacity: 1; } }
        @keyframes podium-balance { 0%, 100% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } }
        @keyframes podium-brille { 0%, 100% { box-shadow: 0 0 0 rgba(252, 211, 77, 0); } 50% { box-shadow: 0 0 28px rgba(252, 211, 77, 0.45); } }
        .podium-confetti { position: absolute; top: 0; font-size: 1.6rem; opacity: 0; animation: podium-confetti linear infinite backwards; pointer-events: none; }
        .podium-marche { transform-origin: bottom; animation: podium-monte 0.9s cubic-bezier(.2,.9,.3,1.2) both; }
        .podium-apparait { animation: podium-apparait 0.8s ease-out both; }
        .podium-balance { display: inline-block; animation: podium-balance 1.6s ease-in-out infinite; }
        .podium-brille { animation: podium-brille 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .podium-confetti { display: none; } .podium-marche, .podium-apparait, .podium-balance, .podium-brille { animation: none; } }
      `}</style>
      {confettis.map((f, i) => (
        <span
          key={i}
          aria-hidden
          className="podium-confetti"
          style={{ left: `${f.gauche}%`, animationDelay: `${f.delai}s`, animationDuration: `${f.duree}s` }}
        >
          {f.emoji}
        </span>
      ))}
      <div className="relative mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            href={`/prof/classes/bulletin?code=${encodeURIComponent(code)}`}
            className="text-sm font-semibold text-indigo-200 hover:underline"
          >
            ← Bulletin de la classe
          </Link>
          <div className="flex gap-2">
            {(["semaine", "mois"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVue(v)}
                className={`rounded-full px-4 py-2 text-sm font-bold ${vue === v ? "bg-amber-300 text-slate-900" : "bg-white/10 text-white hover:bg-white/20"}`}
              >
                {v === "semaine" ? "Cette semaine" : "Ce mois-ci"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="ti-margo ti-margo--danse hidden shrink-0 md:block" role="img" aria-label="Ti Margo danse" />
          <h1 className="text-center text-4xl font-black md:text-6xl">
            <span className="podium-balance">🏆</span> {vue === "semaine" ? "Les élèves de la semaine" : "Les élèves du mois"}
          </h1>
        </div>
        <p className="mt-2 text-center text-lg text-indigo-200">{donnees.classe.nom_classe} · bravo à tous ceux qui s'entraînent !</p>

        {c.podium.length === 0 ? (
          <p className="mt-16 text-center text-2xl text-indigo-200">
            Pas encore assez de travail {vue === "semaine" ? "cette semaine" : "ce mois-ci"} : à vous de jouer sur le coach !
          </p>
        ) : (
          <div className="mt-10 flex items-end justify-center gap-3 md:gap-6">
            {MARCHES.map((m) => {
              const p = c.podium[m.rang - 1];
              if (!p) return <div key={m.rang} className={`${m.ordre} w-32 md:w-56`} />;
              return (
                <div key={`${vue}-${m.rang}`} className={`${m.ordre} flex w-32 flex-col items-center md:w-56`}>
                  <div className="podium-apparait text-5xl md:text-7xl" style={{ animationDelay: `${0.9 + (3 - m.rang) * 0.4}s` }}>
                    <span className="podium-balance">{m.emoji}</span>
                  </div>
                  <div className="podium-apparait mt-2 text-center text-xl font-black md:text-3xl" style={{ animationDelay: `${1 + (3 - m.rang) * 0.4}s` }}>
                    {court(p.nom)}
                    <div className="font-mono text-base font-bold tracking-wider text-amber-200 md:text-xl">{p.code_utilisateur}</div>
                  </div>
                  <ul
                    className="podium-apparait mt-2 mb-3 space-y-0.5 text-center text-xs text-indigo-100 md:text-sm"
                    style={{ animationDelay: `${1.1 + (3 - m.rang) * 0.4}s` }}
                  >
                    {p.raisons.filter((r) => !r.includes("% de justes")).map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                  <div className={`podium-marche ${m.rang === 1 ? "podium-brille" : ""} ${m.hauteur} ${m.couleur} flex w-full items-start justify-center rounded-t-xl pt-2 text-4xl font-black text-slate-900`}>
                    {m.rang}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <section className="mt-12 rounded-3xl bg-gradient-to-r from-amber-400/20 via-pink-400/20 to-violet-400/20 p-6 ring-1 ring-amber-200/40">
          <h2 className="text-center text-3xl font-black">⭐ À l'honneur</h2>
          {edition ? (
            <div className="mx-auto mt-4 max-w-xl space-y-3 rounded-2xl bg-slate-900/80 p-4">
              {c.podium[0] && (
                <p className="text-sm text-amber-200">
                  💡 Proposé par le calcul : <b>{court(c.podium[0].nom)}</b> ({c.podium[0].raisons.slice(0, 2).join(", ")}). À toi de
                  décider.
                </p>
              )}
              <select
                value={brouillon.code}
                onChange={(e) => {
                  const el = donnees.eleves.find((x) => x.code_utilisateur === e.target.value);
                  setBrouillon((b) => ({ ...b, code: e.target.value, nom: el ? el.nom || el.pseudo || el.code_utilisateur : "" }));
                }}
                className="w-full rounded-lg bg-white px-3 py-2 text-slate-900"
              >
                <option value="">Choisis un élève…</option>
                {donnees.eleves.map((e) => (
                  <option key={e.code_utilisateur} value={e.code_utilisateur}>
                    {e.nom || e.pseudo || e.code_utilisateur} · {e.code_utilisateur}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2">
                {MOTIFS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setBrouillon((b) => ({ ...b, motif: m }))}
                    className={`rounded-full px-3 py-1 text-sm font-bold ${brouillon.motif === m ? "bg-amber-300 text-slate-900" : "bg-white/10 hover:bg-white/20"}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <input
                value={brouillon.mot}
                onChange={(e) => setBrouillon((b) => ({ ...b, mot: e.target.value.slice(0, 120) }))}
                placeholder="Ton mot pour la classe (facultatif) : « a aidé deux camarades en géométrie »"
                className="w-full rounded-lg bg-white px-3 py-2 text-slate-900"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  disabled={!brouillon.code}
                  onClick={() => enregistrer(brouillon)}
                  className="rounded-lg bg-amber-300 px-4 py-2 font-bold text-slate-900 disabled:opacity-40"
                >
                  ✅ Mettre à l'honneur
                </button>
                <button onClick={() => setEdition(false)} className="rounded-lg bg-white/10 px-4 py-2 font-bold">
                  Annuler
                </button>
                {honneur && (
                  <button onClick={() => enregistrer(null)} className="rounded-lg bg-white/10 px-4 py-2 font-bold">
                    Retirer
                  </button>
                )}
              </div>
            </div>
          ) : honneur ? (
            <div key={`${vue}-${honneur.code}`} className="podium-apparait mt-4 flex flex-col items-center gap-2 text-center md:flex-row md:justify-center md:gap-6">
              <div className="ti-margo ti-margo--bravo shrink-0" role="img" aria-label="Ti Margo applaudit" />
              <div>
                <div className="text-4xl font-black md:text-5xl">{court(honneur.nom)}</div>
                <div className="font-mono text-lg font-bold text-amber-200">{honneur.code}</div>
                <div className="mt-2 inline-block rounded-full bg-amber-300 px-4 py-1 text-lg font-bold text-slate-900">{honneur.motif}</div>
                {honneur.mot && <p className="mt-3 max-w-xl text-lg italic text-indigo-100">« {honneur.mot} »</p>}
                <p className="mt-2 text-xs text-indigo-300">Choisi par ton professeur</p>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-center text-indigo-200">Ton professeur choisira bientôt l'élève à l'honneur…</p>
          )}
          {!edition && (
            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  const p = c.podium[0];
                  setBrouillon(honneur ?? { code: p?.code_utilisateur ?? "", nom: p?.nom ?? "", motif: MOTIFS[0], mot: "" });
                  setEdition(true);
                }}
                className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-indigo-100 hover:bg-white/20"
              >
                ✏️ {honneur ? "Changer" : "Choisir"} l'élève à l'honneur (prof)
              </button>
            </div>
          )}
        </section>

        {c.medailles.length > 0 && (
          <>
            <h2 className="mt-12 text-center text-3xl font-black">🎖️ Les médailles</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.medailles.map((m, i) => (
                <div
                  key={`${vue}-${m.id}`}
                  className="podium-apparait rounded-2xl bg-white/10 p-5 text-center ring-1 ring-white/20"
                  style={{ animationDelay: `${2.2 + i * 0.25}s` }}
                >
                  <div className="text-5xl">
                    <span className="podium-balance" style={{ animationDelay: `${i * 0.2}s` }}>{m.emoji}</span>
                  </div>
                  <div className="mt-1 text-sm font-bold uppercase tracking-wide text-amber-200">{m.titre}</div>
                  <div className="mt-2 text-2xl font-black">{court(m.nom)}</div>
                  <div className="font-mono text-base font-bold tracking-wider text-amber-200 md:text-xl">{m.code_utilisateur}</div>
                  {m.id !== "precision" && <div className="mt-1 text-sm text-indigo-100">{m.texte}</div>}
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-10 flex justify-center">
          <div key={vue} className="ti-margo ti-margo--saut-de-joie" role="img" aria-label="Ti Margo saute de joie" />
        </div>
        <p className="mt-4 text-center text-xs text-indigo-300">
          Calculé sur le travail au coach : jours de travail, questions, réussite, progression, compétences acquises,
          travail à la maison. Seuls les élèves connectés avec leur code comptent.
        </p>
      </div>
    </main>
  );
}
