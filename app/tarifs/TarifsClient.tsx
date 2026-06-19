"use client";

import Link from "next/link";
import { useState } from "react";

/** Rôles acceptés par /api/contact (doivent matcher exactement la liste serveur). */
const ROLES = [
  { value: "Enseignant", label: "🧑‍🏫 Enseignant" },
  { value: "Direction/Établissement", label: "🏫 Direction / Gestionnaire" },
  { value: "Parent", label: "🏠 Parent" },
  { value: "Élève", label: "🎒 Élève" },
  { value: "Autre", label: "✨ Autre" },
] as const;

/** Fourchette de prix en réflexion — pas un tarif figé, une intention. */
const fourchette = [
  {
    montant: "2 €",
    titre: "Le plancher",
    desc: "Le minimum pour couvrir les coûts de l'IA. Pensé pour les établissements REP/REP+ et les budgets serrés.",
    color: "text-emerald-600",
  },
  {
    montant: "4 €",
    titre: "L'équilibre",
    desc: "Le prix qui permet de faire vivre et améliorer la plateforme sans levée de fonds ni service commercial.",
    color: "text-blue-600",
  },
  {
    montant: "7 €",
    titre: "Le confort",
    desc: "De quoi développer plus vite : nouvelles matières, nouveaux niveaux, plus de contenu pour vos élèves.",
    color: "text-violet-600",
  },
];

const comparatif = [
  { outil: "Kwyk", prix: "6 € / élève / mois", soit: "72 € / an / élève" },
  { outil: "Mathia", prix: "8 € / élève / mois", soit: "96 € / an / élève" },
  { outil: "Lumni Pro", prix: "5,99 € / mois", soit: "72 € / an" },
  {
    outil: "EleveAI 🟢",
    prix: "2 à 7 € / élève / an",
    soit: "payé par l'établissement — jusqu'à 18× moins cher",
  },
];

const principes = [
  {
    icon: "💚",
    titre: "Jamais payé par les familles",
    desc: "Dans le cadre scolaire, l'accès est 100 % gratuit pour l'élève. C'est l'établissement (coopérative, FSE, budget) qui prend en charge.",
  },
  {
    icon: "🏫",
    titre: "Payé globalement par l'établissement",
    desc: "Un seul budget négocié pour tout le collège, toutes les classes, toutes les matières. Pas de paiement individuel à gérer.",
  },
  {
    icon: "🧑‍💻",
    titre: "Un prof, pas une start-up",
    desc: "Développé seul, à La Réunion, sans investisseurs ni équipe commerciale. Le prix bas est un choix, pas un manque de qualité.",
  },
];

export default function TarifsClient() {
  const [role, setRole] = useState<string>("Enseignant");
  const [prixJuste, setPrixJuste] = useState<string>("");
  const [commentaire, setCommentaire] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [hp, setHp] = useState<string>(""); // honeypot anti-spam
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function submitAvis(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    // Le message envoyé doit faire ≥ 10 caractères côté serveur.
    const parts: string[] = [];
    if (prixJuste.trim()) parts.push(`Prix qui me semble juste : ${prixJuste.trim()}`);
    if (commentaire.trim()) parts.push(commentaire.trim());
    const message = parts.join("\n").trim();

    if (message.length < 10) {
      setStatus("error");
      setErrorMsg("Ajoute un prix ou quelques mots (10 caractères minimum).");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          topic: "Idée d’amélioration",
          priority: "Normal",
          email,
          message,
          source: "avis-tarifs",
          hp,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Erreur lors de l'envoi");
      }
      setStatus("ok");
      setPrixJuste("");
      setCommentaire("");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Une erreur est survenue. Réessaie dans un instant.");
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-950">

      {/* FOND */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <svg className="h-full w-full" viewBox="0 0 1440 1800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="tar-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0FDF4" />
              <stop offset="50%" stopColor="#EFF6FF" />
              <stop offset="100%" stopColor="#FFFBEB" />
            </linearGradient>
            <radialGradient id="tar-g1" cx="10%" cy="10%" r="50%">
              <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#86EFAC" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="tar-g2" cx="90%" cy="10%" r="50%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
            </radialGradient>
            <filter id="tar-blur"><feGaussianBlur stdDeviation="30" /></filter>
          </defs>
          <rect width="1440" height="1800" fill="url(#tar-bg)" />
          <rect width="1440" height="1800" fill="url(#tar-g1)" />
          <rect width="1440" height="1800" fill="url(#tar-g2)" />
          <circle cx="130" cy="200" r="160" fill="#4ADE80" opacity="0.15" filter="url(#tar-blur)" />
          <circle cx="1310" cy="180" r="180" fill="#60A5FA" opacity="0.15" filter="url(#tar-blur)" />
        </svg>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 space-y-14">

        {/* HERO / MANIFESTE */}
        <section className="rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-2xl backdrop-blur-xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-amber-800 ring-1 ring-amber-200">
            🧭 Prix en réflexion
          </div>
          <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
            Quel est le juste prix<br />d&apos;un coach IA qui doit rester<br />gratuit pour l&apos;élève&nbsp;?
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-base font-semibold leading-relaxed text-slate-600">
            EleveAI n&apos;a pas encore figé son tarif. Plutôt que d&apos;imposer un prix, je préfère
            le construire avec vous — profs, gestionnaires, parents. Voici ma démarche, en toute transparence.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-emerald-100 px-6 py-3 text-sm font-black text-emerald-800 ring-1 ring-emerald-200">
            <span className="text-lg">💚</span>
            Quelle que soit la décision : gratuit pour l&apos;élève, jamais payé par les familles
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="#avis"
              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-black text-white shadow transition hover:bg-blue-500"
            >
              💬 Donner mon avis
            </a>
            <Link
              href="/contact"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              🎁 Demander le pilote gratuit
            </Link>
          </div>
        </section>

        {/* PRINCIPES */}
        <section>
          <div className="mb-6 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Mes 3 principes</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">Ce qui ne changera pas, quel que soit le prix</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {principes.map((p) => (
              <div
                key={p.titre}
                className="rounded-[1.5rem] border border-white/80 bg-white/80 p-6 shadow-md backdrop-blur"
              >
                <span className="text-3xl">{p.icon}</span>
                <h3 className="mt-3 text-base font-black text-slate-950">{p.titre}</h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TRANSPARENCE DES COÛTS */}
        <section className="rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-xl backdrop-blur">
          <div className="mb-5 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Transparence</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">Ce que ça coûte vraiment</h2>
          </div>
          <p className="mx-auto max-w-2xl text-center text-sm font-semibold leading-relaxed text-slate-600">
            Un coach IA, ce n&apos;est pas gratuit à faire tourner : chaque question posée à l&apos;IA a un coût,
            auquel s&apos;ajoutent l&apos;hébergement, la voix (audio TTS) et des centaines d&apos;heures pour
            écrire les milliers d&apos;exercices. Mais sans investisseurs à rembourser ni équipe commerciale,
            ce coût reste <span className="font-black text-slate-900">très inférieur</span> à celui des plateformes concurrentes.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm font-semibold leading-relaxed text-slate-600">
            Toute la question est donc : <span className="font-black text-slate-900">à partir de quel prix
            l&apos;outil peut-il vivre et s&apos;améliorer durablement</span>, tout en restant accessible à
            l&apos;établissement le plus modeste&nbsp;? C&apos;est ça que je mets en réflexion ci-dessous.
          </p>
        </section>

        {/* FOURCHETTE EN RÉFLEXION */}
        <section>
          <div className="mb-6 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">À l&apos;étude</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">La fourchette en réflexion</h2>
            <p className="mt-2 mx-auto max-w-xl text-sm font-semibold text-slate-600">
              Entre <span className="font-black text-slate-900">2 et 7 € par élève et par an</span>, payé
              globalement par l&apos;établissement. Pas un prix figé : une intention, sur laquelle je veux votre avis.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {fourchette.map((f) => (
              <div
                key={f.titre}
                className="rounded-[1.5rem] border border-white/80 bg-white/90 p-6 text-center shadow-md backdrop-blur"
              >
                <p className={`text-4xl font-black ${f.color}`}>{f.montant}</p>
                <p className="text-xs font-black uppercase tracking-wide text-slate-400">/ élève / an</p>
                <h3 className="mt-3 text-base font-black text-slate-950">{f.titre}</h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs font-semibold text-slate-400">
            Exemple : un collège de 420 élèves, c&apos;est entre 840 € et 2 940 € par an pour tout l&apos;établissement.
          </p>
        </section>

        {/* COMPARATIF */}
        <section className="rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-xl backdrop-blur">
          <div className="mb-6 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Pour situer</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">EleveAI vs les autres</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-black uppercase tracking-wide text-slate-400">
                  <th className="pb-3 pr-6">Outil</th>
                  <th className="pb-3 pr-6">Tarif</th>
                  <th className="pb-3">Soit / an</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparatif.map((c) => (
                  <tr key={c.outil} className={c.outil.includes("EleveAI") ? "bg-emerald-50" : ""}>
                    <td className="py-3 pr-6 font-black text-slate-950">{c.outil}</td>
                    <td className="py-3 pr-6 font-semibold text-slate-600">{c.prix}</td>
                    <td className={`py-3 font-bold ${c.outil.includes("EleveAI") ? "text-emerald-600" : "text-slate-500"}`}>
                      {c.soit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs font-semibold text-slate-400">
            * Tarifs concurrents constatés sur les sites officiels en juin 2026.
          </p>
        </section>

        {/* FORMULAIRE D'AVIS */}
        <section id="avis" className="scroll-mt-8 rounded-[2rem] border border-blue-200 bg-white/90 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-blue-800 ring-1 ring-blue-200">
              💬 Votre avis compte
            </div>
            <h2 className="text-2xl font-black text-slate-950">Quel prix vous semblerait juste&nbsp;?</h2>
            <p className="mt-2 mx-auto max-w-xl text-sm font-semibold text-slate-600">
              30 secondes. Votre réponse aide directement à fixer un prix équitable pour tous.
            </p>
          </div>

          {status === "ok" ? (
            <div className="mx-auto max-w-xl rounded-2xl bg-emerald-50 p-6 text-center ring-1 ring-emerald-200">
              <p className="text-4xl">🙏</p>
              <p className="mt-3 text-lg font-black text-emerald-800">Merci pour votre avis&nbsp;!</p>
              <p className="mt-2 text-sm font-semibold text-emerald-700">
                Il est bien enregistré et compte vraiment dans la réflexion sur le prix.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-4 rounded-xl border border-emerald-300 bg-white px-4 py-2 text-sm font-black text-emerald-700 transition hover:bg-emerald-50"
              >
                Donner un autre avis
              </button>
            </div>
          ) : (
            <form onSubmit={submitAvis} className="mx-auto max-w-xl space-y-5">
              {/* Honeypot anti-spam (caché) */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                className="hidden"
                aria-hidden="true"
              />

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">Vous êtes…</label>
                <div className="flex flex-wrap gap-2">
                  {ROLES.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRole(r.value)}
                      className={`rounded-full px-4 py-2 text-sm font-black transition ${
                        role === r.value
                          ? "bg-blue-600 text-white shadow"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="prixJuste" className="mb-2 block text-sm font-black text-slate-700">
                  Quel prix par élève / an vous semble juste&nbsp;?
                </label>
                <input
                  id="prixJuste"
                  type="text"
                  value={prixJuste}
                  onChange={(e) => setPrixJuste(e.target.value)}
                  placeholder="ex. 3 € / élève / an"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label htmlFor="commentaire" className="mb-2 block text-sm font-black text-slate-700">
                  Pourquoi&nbsp;? (facultatif)
                </label>
                <textarea
                  id="commentaire"
                  value={commentaire}
                  onChange={(e) => setCommentaire(e.target.value)}
                  rows={3}
                  placeholder="Ce qui rendrait ce prix juste / acceptable pour vous…"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-black text-slate-700">
                  Votre email (facultatif, si vous voulez une réponse)
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.fr"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {status === "error" && (
                <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700 ring-1 ring-rose-200">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-2xl bg-blue-600 px-6 py-4 text-base font-black text-white shadow transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Envoi…" : "💬 Envoyer mon avis"}
              </button>
            </form>
          )}
        </section>

        {/* PILOTE GRATUIT */}
        <section className="rounded-[2rem] border border-emerald-200 bg-emerald-50/80 p-6 shadow-lg backdrop-blur flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="text-5xl shrink-0">🎁</div>
          <div className="flex-1">
            <h2 className="text-xl font-black text-slate-950">En attendant : pilote gratuit — 4 semaines</h2>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              Accès complet pour une classe (jusqu&apos;à 35 élèves), sans engagement. Testez avant qu&apos;un prix soit même fixé.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black text-white shadow transition hover:bg-emerald-400"
          >
            Demander le pilote
          </Link>
        </section>

        {/* CTA FINAL */}
        <section className="rounded-[2rem] bg-[#041B33] p-8 text-center text-white shadow-2xl">
          <p className="text-3xl">🧑‍💻</p>
          <h2 className="mt-3 text-2xl font-black">Une conviction, pas une grille tarifaire</h2>
          <p className="mt-3 mx-auto max-w-2xl text-sm font-semibold leading-relaxed text-white/70">
            EleveAI est développé par un enseignant de La Réunion, pour que chaque élève puisse progresser,
            quelle que soit la situation de sa famille. Le juste prix, c&apos;est celui qui permet à cette
            mission de durer — et je le construis avec vous.
          </p>
          <a
            href="#avis"
            className="mt-6 inline-flex rounded-2xl bg-white px-8 py-4 text-base font-black text-[#041B33] shadow transition hover:bg-slate-100"
          >
            💬 Donner mon avis
          </a>
        </section>

      </div>
    </main>
  );
}
