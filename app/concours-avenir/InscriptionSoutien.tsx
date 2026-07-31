"use client";

// Le pont de l'épreuve blanche vers le soutien en visio.
//
// Il n'apparaît qu'à la fin, sur l'écran de résultat : à ce moment l'élève
// vient de voir, chiffres à l'appui, ce qu'il rate et comment il gère le
// risque. La proposition arrive donc avec un ordre du jour déjà écrit —
// le gratuit diagnostique, la séance soigne.
//
// L'habillage suit celui de l'épreuve (sobre, sérif, ardoise) et non celui du
// coach : on reste dans le registre « concours », pas dans le registre
// « application ».
//
// Réutilise l'infrastructure existante : POST /api/call, table call_messages.
// L'inscription vaut pour le créneau hebdomadaire, pas pour une date : c'est
// pourquoi un second envoi renvoie « déjà inscrit » plutôt qu'une erreur.

import { useState } from "react";

type Etat = "repos" | "envoi" | "ok" | "deja" | "erreur";

// Numéro déjà public sur /contact et /entreprises. Il reste discret ici
// (une ligne sous le formulaire) : c'est un numéro personnel.
const TEL_AFFICHE = "06 92 74 29 58";
const TEL_LIEN = "+262692742958";

export default function InscriptionSoutien({
  callId,
  quand,
}: {
  callId: string;
  /** Libellé du prochain créneau, calculé côté serveur. */
  quand: string;
}) {
  const [email, setEmail] = useState("");
  const [prenom, setPrenom] = useState("");
  const [hp, setHp] = useState("");
  const [etat, setEtat] = useState<Etat>("repos");

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    if (etat === "envoi") return;
    setEtat("envoi");
    try {
      const r = await fetch("/api/call", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          call_id: callId,
          email,
          prenom,
          role: "eleve",
          consentement: false,
          hp,
        }),
      });
      const data = await r.json();
      if (!data.ok) throw new Error();
      setEtat(data.deja ? "deja" : "ok");
    } catch {
      setEtat("erreur");
    }
  }

  if (etat === "ok" || etat === "deja") {
    return (
      <section className="mt-8 rounded border-l-4 border-slate-900 bg-white p-6">
        <h2 className="font-serif text-xl font-bold text-slate-900">
          {etat === "deja" ? "Tu es déjà inscrit" : "C'est noté"}
        </h2>
        <p className="mt-3 text-slate-700">
          Le lien de connexion arrive par email avant la séance. Il n&apos;est
          jamais affiché sur le site — c&apos;est ce qui garde le groupe petit.
        </p>
        <p className="mt-3 text-sm text-slate-600">
          Prochaine séance&nbsp;: {quand}.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-8 rounded border-l-4 border-slate-900 bg-white p-6">
      <h2 className="font-serif text-xl font-bold text-slate-900">
        Reprendre tout ça à deux
      </h2>
      <p className="mt-3 text-slate-700">
        Une épreuve blanche montre où ça coince, mais elle ne l&apos;explique
        pas. Chaque semaine, je prends un petit groupe en visio —{" "}
        <strong>quatre élèves au maximum</strong>, pour que chacun ait le temps
        de parler. Tu viens avec tes questions, ou avec le résultat que tu as
        sous les yeux.
      </p>
      <p className="mt-3 text-sm text-slate-600">
        Prochaine séance&nbsp;: <strong>{quand}</strong>. Séance payante&nbsp;;
        tout le reste du site, y compris cette épreuve, reste gratuit.
      </p>

      <form onSubmit={envoyer} className="mt-5 flex flex-wrap items-end gap-3">
        <label className="flex-1 min-w-[14rem]">
          <span className="mb-1 block text-xs uppercase tracking-wide text-slate-500">
            Ton email
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="prenom@exemple.fr"
            className="w-full rounded border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none"
          />
        </label>

        <label className="min-w-[9rem] flex-1">
          <span className="mb-1 block text-xs uppercase tracking-wide text-slate-500">
            Ton prénom (facultatif)
          </span>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none"
          />
        </label>

        {/* Honeypot : invisible pour un humain, rempli par les robots. */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        <button
          type="submit"
          disabled={etat === "envoi"}
          className="rounded bg-slate-900 px-6 py-2.5 font-semibold text-white transition hover:bg-slate-700 disabled:bg-slate-400"
        >
          {etat === "envoi" ? "Envoi…" : "M'inscrire au créneau"}
        </button>
      </form>

      {etat === "erreur" && (
        <p className="mt-3 text-sm text-red-700">
          L&apos;inscription n&apos;est pas passée. Réessaie dans un instant.
        </p>
      )}

      <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-600">
        Tu préfères en parler de vive voix, ou tes parents ont des questions
        avant de t&apos;inscrire&nbsp;? Appelez-moi au{" "}
        <a
          href={`tel:${TEL_LIEN}`}
          className="font-medium text-slate-900 underline underline-offset-2"
        >
          {TEL_AFFICHE}
        </a>
        .
      </p>
    </section>
  );
}
