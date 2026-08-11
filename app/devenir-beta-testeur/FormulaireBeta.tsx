"use client";

// Formulaire de candidature bêta — poste sur /api/beta-testeurs.
//
// Le compteur est lu au chargement : afficher « 3 places restantes en collège »
// fait candidater tout de suite, alors qu'« on cherche des bêta testeurs » fait
// remettre à plus tard. Un groupe complet n'est pas caché, il est barré : voir
// que c'est plein renseigne autant que de pouvoir s'inscrire.

import { useEffect, useState } from "react";
import { NIVEAU_LABEL, PLACES, TOTAL_PLACES, placeDe } from "@/lib/beta/places";

type Compteur = { groupe: string; places: number; prises: number; restantes: number };

const MAX_MOTIVATION = 600;

const MESSAGES: Record<string, string> = {
  "deja-candidat": "Tu as déjà candidaté cette année — une seule fois suffit, ta candidature est bien là.",
  "trop-de-candidatures": "Trop de candidatures depuis cet appareil. Réessaie dans une demi-heure.",
  "niveau-invalide": "La classe ne correspond pas au groupe choisi.",
  "email-invalide": "Cette adresse e-mail n’a pas l’air valide.",
  "contact-manquant": "Il faut soit un e-mail, soit ton code établissement et ton code utilisateur.",
};

export default function FormulaireBeta() {
  const [compteurs, setCompteurs] = useState<Compteur[] | null>(null);
  const [groupe, setGroupe] = useState<string>("");
  const [niveau, setNiveau] = useState("");
  const [prenom, setPrenom] = useState("");
  const [mode, setMode] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [codeEtablissement, setCodeEtablissement] = useState("");
  const [codeUtilisateur, setCodeUtilisateur] = useState("");
  const [motivation, setMotivation] = useState("");
  const [hp, setHp] = useState(""); // pot de miel anti-spam (invisible)
  const [envoi, setEnvoi] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    let vivant = true;
    fetch("/api/beta-testeurs")
      .then((r) => r.json())
      .then((d) => {
        if (vivant && d?.ok) setCompteurs(d.groupes as Compteur[]);
      })
      .catch(() => {
        /* Un compteur absent n'empêche pas de candidater. */
      });
    return () => {
      vivant = false;
    };
  }, []);

  const restantesDe = (g: string) =>
    compteurs?.find((c) => c.groupe === g)?.restantes ?? null;

  const totalRestantes = compteurs
    ? compteurs.reduce((s, c) => s + c.restantes, 0)
    : null;

  const niveauxAttendus = groupe ? placeDe(groupe)?.niveaux ?? [] : [];

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    if (envoi === "loading" || envoi === "ok") return;
    setEnvoi("loading");
    setErreur("");
    try {
      const res = await fetch("/api/beta-testeurs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupe,
          niveau: niveauxAttendus.length > 0 ? niveau : null,
          prenom,
          email: mode === "email" ? email : null,
          codeEtablissement: mode === "code" ? codeEtablissement : null,
          codeUtilisateur: mode === "code" ? codeUtilisateur : null,
          motivation,
          hp,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        setEnvoi("ok");
      } else {
        setEnvoi("err");
        setErreur(MESSAGES[data?.erreur] || "Envoi impossible. Réessaie.");
      }
    } catch {
      setEnvoi("err");
      setErreur("Erreur réseau. Réessaie.");
    }
  }

  if (envoi === "ok") {
    return (
      <div className="rounded-2xl border border-emerald-300/30 bg-emerald-400/10 p-6 text-center">
        <p className="text-lg font-black text-emerald-200">
          ✅ C’est envoyé — ta candidature est arrivée.
        </p>
        <p className="mx-auto mt-2 max-w-lg text-sm font-semibold text-white/75">
          Frédéric lit tout lui-même et répond à chacun. Une candidature n’est
          pas encore une place : les groupes sont choisis pour que tout le monde
          ne teste pas la même chose.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={envoyer} className="space-y-5">
      {/* Pot de miel : invisible pour un humain, rempli par les robots. */}
      <input
        type="text"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {/* ── 1. LE GROUPE ─────────────────────────────────────────────── */}
      <fieldset>
        <legend className="text-sm font-black text-white">
          1. Tu es…
          {totalRestantes !== null && (
            <span className="ml-2 font-semibold text-amber-300">
              {totalRestantes === 0
                ? "la bêta est complète"
                : `${totalRestantes} place${totalRestantes > 1 ? "s" : ""} libre${totalRestantes > 1 ? "s" : ""} sur ${TOTAL_PLACES}`}
            </span>
          )}
        </legend>
        <div className="mt-3 space-y-2">
          {PLACES.map((p) => {
            const restantes = restantesDe(p.groupe);
            const complet = restantes === 0;
            const choisi = groupe === p.groupe;
            return (
              <label
                key={p.groupe}
                className={[
                  "flex cursor-pointer gap-3 rounded-2xl border p-4 transition",
                  complet
                    ? "cursor-not-allowed border-white/5 bg-white/[0.02] opacity-50"
                    : choisi
                      ? "border-amber-300/60 bg-amber-400/[0.10]"
                      : "border-white/10 bg-white/[0.04] hover:border-white/25",
                ].join(" ")}
              >
                <input
                  type="radio"
                  name="groupe"
                  value={p.groupe}
                  checked={choisi}
                  disabled={complet}
                  onChange={() => {
                    setGroupe(p.groupe);
                    setNiveau("");
                  }}
                  className="mt-1 h-4 w-4 shrink-0 accent-amber-400"
                />
                <span className="min-w-0">
                  <span className="flex flex-wrap items-baseline gap-2">
                    <span className="font-black text-white">{p.label}</span>
                    {/* Tant que rien n'est pris, « 20 places sur 20 » sonne faux :
                        on n'affiche le rapport qu'une fois la bêta entamée. */}
                    <span className="text-xs font-black text-amber-300">
                      {complet
                        ? "complet"
                        : restantes === null || restantes === p.places
                          ? `${p.places} places`
                          : `${restantes} sur ${p.places}`}
                    </span>
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-white/65">
                    {p.pourquoi}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* ── 2. LA CLASSE ─────────────────────────────────────────────── */}
      {niveauxAttendus.length > 0 && (
        <div>
          <label className="text-sm font-black text-white" htmlFor="beta-niveau">
            2. {groupe === "parent-cycle2" ? "La classe de ton enfant" : "Ta classe"}
          </label>
          <select
            id="beta-niveau"
            required
            value={niveau}
            onChange={(e) => setNiveau(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-amber-300/60"
          >
            <option value="">Choisir…</option>
            {niveauxAttendus.map((n) => (
              <option key={n} value={n} className="bg-slate-900">
                {NIVEAU_LABEL[n] ?? n}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ── 3. QUI, ET COMMENT TE JOINDRE ────────────────────────────── */}
      <div>
        <span className="text-sm font-black text-white">
          {niveauxAttendus.length > 0 ? "3." : "2."} Comment te joindre
        </span>
        <input
          type="text"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          placeholder="Ton prénom (sans le nom de famille)"
          maxLength={40}
          className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white placeholder-white/40 outline-none focus:border-amber-300/60"
        />

        <div className="mt-3 flex gap-2">
          {(
            [
              ["email", "Par e-mail"],
              ["code", "Avec mon code établissement"],
            ] as const
          ).map(([m, label]) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={[
                "rounded-xl px-3 py-2 text-xs font-black transition",
                mode === m
                  ? "bg-amber-400 text-slate-900"
                  : "border border-white/15 text-white/70 hover:text-white",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>

        {mode === "email" ? (
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ton@email.fr"
            className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white placeholder-white/40 outline-none focus:border-amber-300/60"
          />
        ) : (
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <input
              type="text"
              required
              value={codeEtablissement}
              onChange={(e) => setCodeEtablissement(e.target.value)}
              placeholder="Code établissement"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white placeholder-white/40 outline-none focus:border-amber-300/60"
            />
            <input
              type="text"
              required
              value={codeUtilisateur}
              onChange={(e) => setCodeUtilisateur(e.target.value)}
              placeholder="Ton code"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white placeholder-white/40 outline-none focus:border-amber-300/60"
            />
          </div>
        )}
      </div>

      {/* ── 4. POURQUOI TOI ──────────────────────────────────────────── */}
      <div>
        <label className="text-sm font-black text-white" htmlFor="beta-motivation">
          {niveauxAttendus.length > 0 ? "4." : "3."} Une chose que tu as déjà
          remarquée sur le site
        </label>
        <p className="mt-1 text-xs font-semibold text-white/50">
          Une faute, un exercice bancal, quelque chose qui manque. C’est ce qui
          nous fait choisir — pas les grandes phrases.
        </p>
        <textarea
          id="beta-motivation"
          rows={4}
          value={motivation}
          onChange={(e) => setMotivation(e.target.value.slice(0, MAX_MOTIVATION))}
          className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white placeholder-white/40 outline-none focus:border-amber-300/60"
        />
        <p className="mt-1 text-right text-xs font-semibold text-white/40">
          {motivation.length} / {MAX_MOTIVATION}
        </p>
      </div>

      {envoi === "err" && (
        <p className="rounded-xl border border-rose-300/30 bg-rose-400/10 px-4 py-3 text-sm font-bold text-rose-100">
          {erreur}
        </p>
      )}

      <button
        type="submit"
        disabled={!groupe || envoi === "loading"}
        className="w-full rounded-xl bg-amber-400 px-5 py-4 text-base font-black text-slate-900 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {envoi === "loading" ? "Envoi…" : "Je candidate"}
      </button>
    </form>
  );
}
