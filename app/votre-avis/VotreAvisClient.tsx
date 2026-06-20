"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useEleve } from "@/context/EleveContext";
import { createClient } from "@/lib/supabase/client";
import { ameliorationsRealisees } from "@/lib/ameliorations/realisees";
import ElevesALHonneur from "@/components/ameliorations/ElevesALHonneur";
import { type EleveALHonneur } from "@/lib/ameliorations/aLHonneur";

type EmailUser = {
  auth_user_id: string;
  email: string;
  nom: string | null;
};

const TYPES = [
  {
    id: "bug" as const,
    emoji: "🐞",
    label: "Signaler un bug",
    desc: "Quelque chose ne marche pas, s'affiche mal ou plante.",
    placeholder:
      "Explique ce qui s'est passé : qu'est-ce que tu as fait, qu'est-ce qui aurait dû se passer, qu'est-ce qui s'est passé à la place ?",
  },
  {
    id: "idee" as const,
    emoji: "💡",
    label: "Proposer une idée",
    desc: "Un défi, une fonctionnalité, quelque chose qui te plairait.",
    placeholder:
      "Décris ton idée : un défi sur La Réunion, une nouvelle fonctionnalité, un truc qui rendrait EleveAI plus agréable…",
  },
  {
    id: "avis" as const,
    // 5 étoiles et pas une seule : retour élève du 11/06/2026, une étoile
    // unique ressemblait à une note de 1/5 et « donnait une mauvaise image ».
    emoji: "⭐⭐⭐⭐⭐",
    label: "Donner mon avis",
    desc: "Ce que tu aimes, ce qui t'agace, ta note sur la plateforme.",
    placeholder:
      "Qu'est-ce que tu aimes sur EleveAI ? Qu'est-ce qui t'agace ? Qu'est-ce que tu changerais en premier ?",
  },
];

// Aligné sur la limite serveur (app/api/retours/route.ts) : 200 mots suffisent
// pour un avis honnête, au-delà c'est un copier-collé d'IA.
const MAX_MOTS = 200;

const PAGES = [
  "Coach Maths",
  "Coach Français",
  "Coach English",
  "Coach Espagnol",
  "Coach Économie",
  "Coach Brevet",
  "Parcours Maths",
  "Parcours Français",
  "Parcours English",
  "Parcours Espagnol",
  "Calcul rapide",
  "Défis du jour",
  "Tableau de bord élève",
  "Accueil",
  "Tout le site",
  "Autre",
];

export default function VotreAvisClient({
  honneur,
}: {
  honneur?: EleveALHonneur[];
}) {
  const { eleve } = useEleve();
  const [emailUser, setEmailUser] = useState<EmailUser | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        const user = data.user;
        if (!user || cancelled) return;

        const { data: profil } = await supabase
          .from("users_email")
          .select("nom")
          .eq("auth_user_id", user.id)
          .maybeSingle();

        if (!cancelled) {
          setEmailUser({
            auth_user_id: user.id,
            email: user.email ?? "",
            nom: profil?.nom ?? null,
          });
        }
      } catch {
        // Supabase non configuré ou pas de session e-mail : on reste anonyme.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const [type, setType] = useState<"bug" | "idee" | "avis">("bug");
  const [page, setPage] = useState("");
  const [message, setMessage] = useState("");
  // 5 étoiles pré-sélectionnées par défaut (demande du 13/06/2026).
  const [note, setNote] = useState(5);
  const [prenom, setPrenom] = useState("");
  const [classe, setClasse] = useState("");
  const [hp, setHp] = useState("");

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [pointsGagnes, setPointsGagnes] = useState(0);
  const [pointsTotal, setPointsTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  const selected = TYPES.find((t) => t.id === type)!;
  const nbMots = message.trim() ? message.trim().split(/\s+/).length : 0;
  const tropLong = nbMots > MAX_MOTS;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (message.trim().length < 10) {
      setError("Décris ton retour en quelques mots (10 caractères minimum).");
      return;
    }
    if (tropLong) {
      setError(
        `Ton retour fait ${nbMots} mots (max ${MAX_MOTS}). Va à l'essentiel, avec tes propres mots.`
      );
      return;
    }
    if (type === "avis" && note === 0) {
      setError("Choisis une note entre 1 et 5 étoiles.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/retours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hp,
          type,
          page,
          message: message.trim(),
          note: type === "avis" ? note : null,
          code_etablissement: eleve?.code_etablissement ?? "",
          code_eleve: eleve?.code_eleve ?? "",
          auth_user_id: emailUser?.auth_user_id ?? "",
          email: emailUser?.email ?? "",
          prenom: eleve?.nom ?? emailUser?.nom ?? prenom,
          classe: eleve?.classe ?? classe,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Erreur lors de l'envoi.");
      }
      setSent(true);
      setCount((c) => c + 1);
      setPointsGagnes(typeof data.pointsGagnes === "number" ? data.pointsGagnes : 0);
      setPointsTotal(typeof data.pointsTotal === "number" ? data.pointsTotal : 0);
    } catch (err: any) {
      setError(err?.message || "Erreur lors de l'envoi. Réessaie.");
    } finally {
      setSending(false);
    }
  }

  function resetForm() {
    setSent(false);
    setPage("");
    setMessage("");
    setNote(5);
    setError(null);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.20),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_35%)]" />

        <div className="relative mx-auto max-w-4xl space-y-8 px-4 py-12 sm:py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="transition hover:text-emerald-300">
              Accueil
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200">Votre avis</span>
          </div>

          {/* Header */}
          <header className="space-y-5">
            <p className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              EleveAI · Élèves testeurs
            </p>

            <h1 className="text-3xl font-black tracking-tight text-slate-50 sm:text-5xl">
              Aide-nous à améliorer EleveAI 🛠️
            </h1>

            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              EleveAI est construit avec ses élèves.{" "}
              <span className="font-semibold text-slate-50">
                Un bug trouvé, une idée proposée, un avis donné : chaque retour fait
                progresser la plateforme.
              </span>
            </p>
          </header>
        </div>
      </section>

      {/* ÉLÈVES À L'HONNEUR */}
      <ElevesALHonneur eleves={honneur} />

      {/* VOUS L'AVEZ DEMANDÉ → C'EST FAIT */}
      <section className="mx-auto max-w-4xl px-4 pt-10 sm:pt-12">
        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.07] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-black text-slate-50 sm:text-3xl">
              💬 Vous l&apos;avez demandé&nbsp;→&nbsp;✅ C&apos;est fait
            </h2>
            <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-black text-emerald-200">
              {ameliorationsRealisees.length} idées réalisées
            </span>
          </div>
          <p className="mt-2 text-sm font-semibold text-slate-300">
            Vos retours ne tombent pas dans le vide. Voici ce que vos idées ont déjà changé&nbsp;:
          </p>

          <ul className="mt-5 space-y-3">
            {ameliorationsRealisees.map((a, i) => (
              <li
                key={i}
                className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-black text-emerald-200 ring-1 ring-emerald-500/30">
                    {a.eleve}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                  <span className="text-slate-400">« </span>
                  {a.demande}
                  <span className="text-slate-400"> »</span>
                </p>
                <p className="mt-1.5 flex items-start gap-2 text-sm font-bold leading-6 text-emerald-200">
                  <span aria-hidden>✅</span>
                  <span>{a.fait}</span>
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-center text-sm font-bold text-slate-300">
            👇 À ton tour&nbsp;: propose ton idée, elle sera lue.
          </p>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:py-12">
        {sent ? (
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center sm:p-8">
            <p className="text-4xl">🙌</p>
            <h2 className="mt-3 text-xl font-bold text-emerald-300">
              Merci, ton retour est bien enregistré !
            </h2>

            {pointsGagnes > 0 ? (
              <div className="mx-auto mt-4 max-w-md rounded-2xl border border-fuchsia-400/40 bg-fuchsia-500/15 p-4">
                <p className="text-lg font-black text-fuchsia-200">
                  🏅 + {pointsGagnes} points !
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-200">
                  Tu as maintenant <span className="font-black text-white">{pointsTotal} points</span>.
                  Bonus de 20 points quand ton idée est retenue par ton prof !
                </p>
              </div>
            ) : null}

            <p className="mt-3 text-sm leading-7 text-slate-200">
              {count > 1
                ? `Déjà ${count} retours envoyés cette session. Continue, chaque détail compte.`
                : "Ton professeur va le lire. Tu peux en envoyer autant que tu veux."}
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="mt-5 inline-flex items-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-black text-white transition hover:bg-emerald-400"
            >
              Envoyer un autre retour
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot anti-spam */}
            <input
              type="text"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            {/* Type de retour */}
            <div className="grid gap-3 sm:grid-cols-3">
              {TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  className={[
                    "rounded-2xl border p-4 text-left transition",
                    type === t.id
                      ? "border-emerald-500/60 bg-emerald-500/10"
                      : "border-slate-800 bg-slate-900/60 hover:border-slate-600",
                  ].join(" ")}
                >
                  <span className="text-2xl">{t.emoji}</span>
                  <p className="mt-2 text-sm font-bold text-slate-50">{t.label}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{t.desc}</p>
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
              <div className="space-y-5">
                {/* Note (avis uniquement) */}
                {type === "avis" && (
                  <div>
                    <label className="text-sm font-semibold text-slate-200">
                      Ta note sur EleveAI
                    </label>
                    <div className="mt-2 flex gap-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setNote(n)}
                          aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
                          className={[
                            "text-3xl transition hover:scale-110",
                            n <= note ? "" : "opacity-30 grayscale",
                          ].join(" ")}
                        >
                          ⭐
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Page concernée */}
                <div>
                  <label htmlFor="page" className="text-sm font-semibold text-slate-200">
                    Quelle partie du site ?
                  </label>
                  <select
                    id="page"
                    value={page}
                    onChange={(e) => setPage(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-emerald-500/60"
                  >
                    <option value="">— Choisis une page (optionnel) —</option>
                    {PAGES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="text-sm font-semibold text-slate-200">
                    Ton retour
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    maxLength={3000}
                    placeholder={selected.placeholder}
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-500/60"
                  />
                  <div className="mt-2 flex items-start justify-between gap-3">
                    <p className="flex items-start gap-1.5 text-xs leading-5 text-amber-300/90">
                      <span aria-hidden>✍️</span>
                      <span>
                        Écris ton retour avec{" "}
                        <span className="font-semibold">tes propres mots</span>. Les avis
                        copiés-collés depuis une IA (ChatGPT…) sont supprimés et ne
                        rapportent aucun point.
                      </span>
                    </p>
                    <span
                      className={[
                        "shrink-0 rounded-full px-2 py-0.5 text-xs font-bold tabular-nums",
                        tropLong
                          ? "bg-red-500/15 text-red-300"
                          : "bg-slate-800 text-slate-400",
                      ].join(" ")}
                    >
                      {nbMots} / {MAX_MOTS} mots
                    </span>
                  </div>
                </div>

                {/* Identité si non connecté */}
                {!eleve && !emailUser && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="prenom" className="text-sm font-semibold text-slate-200">
                        Ton prénom (optionnel)
                      </label>
                      <input
                        id="prenom"
                        type="text"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        maxLength={100}
                        placeholder="Prénom"
                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-500/60"
                      />
                    </div>
                    <div>
                      <label htmlFor="classe" className="text-sm font-semibold text-slate-200">
                        Ta classe (optionnel)
                      </label>
                      <input
                        id="classe"
                        type="text"
                        value={classe}
                        onChange={(e) => setClasse(e.target.value)}
                        maxLength={20}
                        placeholder="3e, 4e…"
                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-500/60"
                      />
                    </div>
                  </div>
                )}

                {eleve ? (
                  <p className="text-xs text-slate-400">
                    Connecté en tant que{" "}
                    <span className="font-semibold text-slate-200">
                      {eleve.nom ?? eleve.code_eleve}
                    </span>
                    {eleve.classe ? ` (${eleve.classe})` : ""} — ton retour sera associé à ton
                    compte.
                  </p>
                ) : emailUser ? (
                  <p className="text-xs text-slate-400">
                    Connecté en tant que{" "}
                    <span className="font-semibold text-slate-200">
                      {emailUser.nom ?? emailUser.email}
                    </span>{" "}
                    — votre retour sera associé à votre compte.
                  </p>
                ) : null}

                {error && (
                  <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending || tropLong}
                  className="inline-flex items-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-black text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sending ? "Envoi en cours…" : `${selected.emoji} Envoyer mon retour`}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Conseils */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
          <h2 className="text-xl font-bold text-slate-50">Un bon retour, c&apos;est quoi ?</h2>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
            <li>• <span className="font-semibold text-slate-50">Précis</span> : « le bouton Valider ne marche pas sur Coach Maths en 3e » plutôt que « ça bug ».</li>
            <li>• <span className="font-semibold text-slate-50">Reproductible</span> : explique ce que tu as fait juste avant le problème.</li>
            <li>• <span className="font-semibold text-slate-50">Honnête</span> : les avis négatifs aident autant que les positifs — dis ce que tu penses vraiment.</li>
            <li>• <span className="font-semibold text-slate-50">Écrit par toi</span> : pas de copier-coller d&apos;une IA (ChatGPT…). Ce sont tes idées qu&apos;on veut lire. Les retours générés par IA sont supprimés et ne comptent pas dans tes points.</li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Seuls ton prénom, ta classe et tes codes EleveAI (ou l&apos;e-mail de ton compte) sont
            enregistrés avec ton retour —
            conformément à notre{" "}
            <Link
              href="/politique-confidentialite"
              className="font-semibold text-emerald-300 hover:text-emerald-200"
            >
              politique de confidentialité
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
