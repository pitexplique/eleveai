"use client";

// Le formulaire de signalement — poste sur /api/signalements.
//
// ⭐ IL LIT LE CONTEXTE DANS L'URL. C'est ce qui permettra, plus tard, qu'un
// bouton posé à côté d'une question du coach amène ici avec tout ce qu'il faut
// pour rejouer la scène :
//   /signaler-une-erreur?page=/coach-ia/maths&question=…&notion=…&ressource=…
// Depuis le menu, il n'y a rien dans l'URL : on demande alors où la personne
// était, en clair. C'est la même page dans les deux cas.

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useEleve } from "@/context/EleveContext";
import { NIVEAU_LABEL } from "@/lib/beta/places";

const MAX_MESSAGE = 1000;

// Les trois types que la table accepte, dits comme on les vit — « avis » est
// exclu exprès : il a déjà sa page, /votre-avis.
const TYPES = [
  {
    valeur: "erreur_pedagogique",
    titre: "Une erreur dans un exercice",
    detail: "La réponse est fausse, l’énoncé est ambigu, ce n’est pas au programme.",
  },
  {
    valeur: "bug",
    titre: "Quelque chose ne marche pas",
    detail: "Un bouton sans effet, une page blanche, un affichage cassé.",
  },
  {
    valeur: "idee",
    titre: "Une idée",
    detail: "Quelque chose qui manque, ou qui serait mieux autrement.",
  },
] as const;

// Le profil déclaré : jamais vérifié, et c'est assumé. Savoir que quelqu'un
// SE DIT professeur vaut mieux que de ne rien savoir.
const PROFILS = [
  ...Object.entries(NIVEAU_LABEL).map(([v, l]) => ({ valeur: v, label: `Élève — ${l}` })),
  { valeur: "parent", label: "Parent" },
  { valeur: "prof", label: "Professeur" },
  { valeur: "direction", label: "Direction d’établissement" },
];

export default function FormulaireSignalement() {
  const params = useSearchParams();
  const { eleve } = useEleve();

  // Le contexte venu de l'URL — présent seulement si on arrive d'un bouton.
  const ctxPage = params.get("page");
  const ctxQuestion = params.get("question");
  const ctxNotion = params.get("notion");
  const ctxIntention = params.get("intention");
  const ctxRessources = params.get("ressources");
  const ctxRessourceVisee = params.get("ressource");
  const aDuContexte = Boolean(ctxPage || ctxQuestion || ctxNotion || ctxRessourceVisee);

  const [type, setType] = useState<string>("erreur_pedagogique");
  const [message, setMessage] = useState("");
  const [ou, setOu] = useState("");
  const [profil, setProfil] = useState("");
  const [hp, setHp] = useState(""); // pot de miel anti-spam (invisible)
  const [envoi, setEnvoi] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [erreur, setErreur] = useState("");
  const [connecte, setConnecte] = useState(false);

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    if (envoi === "loading" || envoi === "ok") return;
    if (message.trim().length < 5) {
      setErreur("Dis-nous en un peu plus — cinq caractères, c’est trop court pour agir.");
      setEnvoi("err");
      return;
    }
    if (hp) return; // robot : on ne fait rien, sans le lui dire
    setEnvoi("loading");
    setErreur("");
    try {
      const res = await fetch("/api/signalements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          message,
          profil: profil || eleve?.classe || null,
          // Sans contexte d'URL, « où » est ce que la personne a écrit.
          page: ctxPage || ou || null,
          question: ctxQuestion,
          notion: ctxNotion,
          intention: ctxIntention,
          ressources: ctxRessources,
          ressourceVisee: ctxRessourceVisee,
          codeEtablissement: eleve?.code_etablissement ?? null,
          codeUtilisateur: eleve?.code_eleve ?? null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        setConnecte(Boolean(data.connecte));
        setEnvoi("ok");
      } else {
        setEnvoi("err");
        setErreur(
          data?.erreur === "trop-de-signalements"
            ? "Beaucoup de signalements depuis cet appareil. Souffle dix minutes et reviens."
            : "Envoi impossible. Réessaie."
        );
      }
    } catch {
      setEnvoi("err");
      setErreur("Erreur réseau. Réessaie.");
    }
  }

  if (envoi === "ok") {
    return (
      <div className="rounded-2xl border border-emerald-300/30 bg-emerald-400/10 p-6">
        <p className="text-lg font-black text-emerald-200">✅ C’est parti, merci.</p>
        <p className="mt-2 text-sm font-semibold text-white/75">
          {connecte
            ? "C’est rattaché à ton compte. Si le signalement est retenu, il te rapporte des points — jamais à l’envoi : on ne récompense pas la quantité."
            : "Il compte autant qu’un autre. Les points, eux, ne vont qu’aux comptes — c’est la seule différence."}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setMessage("");
              setOu("");
              setEnvoi("idle");
            }}
            className="rounded-xl border border-white/20 px-4 py-2 text-sm font-bold text-white/80 hover:bg-white/10"
          >
            En signaler un autre
          </button>
          <Link
            href="/devenir-beta-testeur"
            className="rounded-xl bg-amber-400 px-4 py-2 text-sm font-black text-slate-900 hover:bg-amber-300"
          >
            Devenir bêta testeur
          </Link>
        </div>
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

      {/* ── CE QUE C'EST ─────────────────────────────────────────────── */}
      <fieldset>
        <legend className="text-sm font-black text-white">1. C’est quoi ?</legend>
        <div className="mt-3 space-y-2">
          {TYPES.map((t) => (
            <label
              key={t.valeur}
              className={[
                "flex cursor-pointer gap-3 rounded-2xl border p-4 transition",
                type === t.valeur
                  ? "border-amber-300/60 bg-amber-400/[0.10]"
                  : "border-white/10 bg-white/[0.04] hover:border-white/25",
              ].join(" ")}
            >
              <input
                type="radio"
                name="type"
                value={t.valeur}
                checked={type === t.valeur}
                onChange={() => setType(t.valeur)}
                className="mt-1 h-4 w-4 shrink-0 accent-amber-400"
              />
              <span>
                <span className="block font-black text-white">{t.titre}</span>
                <span className="mt-0.5 block text-sm font-semibold text-white/65">
                  {t.detail}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* ── OÙ ───────────────────────────────────────────────────────── */}
      {aDuContexte ? (
        <div className="rounded-2xl border border-sky-300/25 bg-sky-400/[0.08] p-4">
          <p className="text-sm font-black text-sky-100">Ce que tu signales</p>
          <ul className="mt-1 space-y-0.5 text-sm font-semibold text-white/75">
            {ctxPage && <li>Page : {ctxPage}</li>}
            {ctxQuestion && <li>Question : « {ctxQuestion} »</li>}
            {ctxNotion && <li>Notion : {ctxNotion}</li>}
            {ctxRessourceVisee && <li>Ressource : {ctxRessourceVisee}</li>}
          </ul>
          <p className="mt-2 text-xs font-semibold text-white/50">
            C’est joint automatiquement — tu n’as rien à recopier.
          </p>
        </div>
      ) : (
        <div>
          <label className="text-sm font-black text-white" htmlFor="ou">
            2. Où ça ?
          </label>
          <p className="mt-1 text-xs font-semibold text-white/50">
            La page, la matière, la classe… ce dont tu te souviens. C’est ce qui
            fait la différence entre un signalement qu’on peut corriger et un
            qu’on ne retrouve pas.
          </p>
          <input
            id="ou"
            type="text"
            value={ou}
            onChange={(e) => setOu(e.target.value)}
            placeholder="Ex. le coach de maths, en 4ᵉ, sur les fractions"
            maxLength={60}
            className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white placeholder-white/40 outline-none focus:border-amber-300/60"
          />
        </div>
      )}

      {/* ── QUOI ─────────────────────────────────────────────────────── */}
      <div>
        <label className="text-sm font-black text-white" htmlFor="message">
          {aDuContexte ? "2." : "3."} Qu’est-ce qui ne va pas ?
        </label>
        <textarea
          id="message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE))}
          placeholder="Dis-le comme tu le dirais à voix haute."
          className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white placeholder-white/40 outline-none focus:border-amber-300/60"
        />
        <p className="mt-1 text-right text-xs font-semibold text-white/40">
          {message.length} / {MAX_MESSAGE}
        </p>
      </div>

      {/* ── QUI (facultatif) ─────────────────────────────────────────── */}
      {!eleve && (
        <div>
          <label className="text-sm font-black text-white" htmlFor="profil">
            {aDuContexte ? "3." : "4."} Tu es… <span className="font-semibold text-white/50">(facultatif)</span>
          </label>
          <select
            id="profil"
            value={profil}
            onChange={(e) => setProfil(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-amber-300/60"
          >
            <option value="">Préfère ne pas le dire</option>
            {PROFILS.map((p) => (
              <option key={p.valeur} value={p.valeur} className="bg-slate-900">
                {p.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {envoi === "err" && (
        <p className="rounded-xl border border-rose-300/30 bg-rose-400/10 px-4 py-3 text-sm font-bold text-rose-100">
          {erreur}
        </p>
      )}

      <button
        type="submit"
        disabled={envoi === "loading"}
        className="w-full rounded-xl bg-amber-400 px-5 py-4 text-base font-black text-slate-900 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {envoi === "loading" ? "Envoi…" : "Envoyer"}
      </button>

      <p className="text-center text-xs font-semibold text-white/40">
        Aucun nom, aucune adresse IP conservée. Les signalements sont effacés au
        bout de 90 jours.
      </p>
    </form>
  );
}
