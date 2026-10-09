"use client";

// app/atelier-video/MonTravail.tsx
//
// ⭐ 09/10/2026 — « 4. Enregistrer » : le script et la vidéo de l'élève, rangés
// dans Supabase sous SON compte (Frédéric : il faut être connecté, par code
// établissement ou par e-mail). Voir app/api/atelier-video/route.ts.
// ⛔ La vidéo enregistrée s'affiche en pause : l'élève appuie lui-même.

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useEleve } from "@/context/EleveContext";
import type { VoixEleve } from "@/lib/atelier-video/script";
import MaVoix from "./MaVoix";

const BUCKET = "atelier-videos";

type ProjetListe = { id: string; nom: string; majLe: string; video: boolean };

type Reponse = {
  ok: boolean;
  message?: string;
  projets?: ProjetListe[];
  id?: string;
  nom?: string;
  script?: string;
  video?: string | null;
  chemin?: string;
  jeton?: string;
  voix?: { cle: string; texte: string; duree: number; url: string }[];
};

export default function MonTravail({
  source,
  nomParDefaut,
  phrases,
  onOuvrir,
  onRemplacerPhrase,
  onVoixEleve,
}: {
  source: string;
  nomParDefaut: string;
  phrases: string[];
  onOuvrir: (script: string) => void;
  onRemplacerPhrase: (ancienne: string, nouvelle: string) => void;
  onVoixEleve: (voix: Record<string, VoixEleve>) => void;
}) {
  const { eleve } = useEleve();
  const token = eleve?.token ?? null;
  const [nom, setNom] = useState("");
  const [projets, setProjets] = useState<ProjetListe[]>([]);
  const [message, setMessage] = useState<{ ton: "ok" | "erreur"; texte: string } | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [occupe, setOccupe] = useState(false);

  const appeler = useCallback(
    async (corps: Record<string, unknown>): Promise<Reponse> => {
      const r = await fetch("/api/atelier-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...corps, token }),
      });
      return (await r.json().catch(() => ({ ok: false, message: "Réponse illisible." }))) as Reponse;
    },
    [token],
  );

  const rafraichir = useCallback(async () => {
    if (!token) return;
    const r = await appeler({ action: "lister" });
    if (r.ok) setProjets(r.projets ?? []);
  }, [appeler, token]);

  useEffect(() => {
    rafraichir().catch(() => {});
  }, [rafraichir]);

  const nomEffectif = nom.trim() || nomParDefaut;

  // Les voix enregistrées de CE projet, pour le code Manim (version 2).
  const [voixEnregistrees, setVoixEnregistrees] = useState<Set<string>>(new Set());
  const rafraichirVoix = useCallback(async () => {
    if (!token) return;
    const r = await appeler({ action: "liens-voix", nom: nomEffectif });
    const carte: Record<string, VoixEleve> = {};
    for (const v of r.ok ? (r.voix ?? []) : []) carte[v.texte] = { url: v.url, duree: v.duree };
    setVoixEnregistrees(new Set(Object.keys(carte)));
    onVoixEleve(carte);
  }, [appeler, nomEffectif, onVoixEleve, token]);

  useEffect(() => {
    const t = setTimeout(() => rafraichirVoix().catch(() => {}), 600);
    return () => clearTimeout(t);
  }, [rafraichirVoix]);

  /** Avant d'envoyer une voix : le script doit exister sous ce nom. */
  const avantEnvoi = useCallback(async () => {
    const r = await appeler({ action: "enregistrer", nom: nomEffectif, script: source });
    if (!r.ok) setMessage({ ton: "erreur", texte: r.message ?? "Échec." });
    else await rafraichir();
    return r.ok;
  }, [appeler, nomEffectif, rafraichir, source]);

  async function agir(f: () => Promise<void>) {
    setOccupe(true);
    setMessage(null);
    try {
      await f();
    } catch {
      setMessage({ ton: "erreur", texte: "Problème de connexion. Réessaie." });
    } finally {
      setOccupe(false);
    }
  }

  const enregistrer = () =>
    agir(async () => {
      const r = await appeler({ action: "enregistrer", nom: nomEffectif, script: source });
      if (!r.ok) return setMessage({ ton: "erreur", texte: r.message ?? "Échec." });
      setNom(r.nom ?? nomEffectif);
      setMessage({ ton: "ok", texte: `Script enregistré sous « ${r.nom} ».` });
      await rafraichir();
    });

  const ouvrir = (nomProjet: string) =>
    agir(async () => {
      const r = await appeler({ action: "ouvrir", nom: nomProjet });
      if (!r.ok) return setMessage({ ton: "erreur", texte: r.message ?? "Échec." });
      if (r.script) onOuvrir(r.script);
      setNom(r.nom ?? nomProjet);
      setVideo(r.video ?? null);
      setMessage({ ton: "ok", texte: `« ${r.nom} » est ouvert${r.video ? ", avec sa vidéo" : ""}.` });
    });

  const envoyerVideo = (fichier: File) =>
    agir(async () => {
      if (!/\.mp4$/i.test(fichier.name) && fichier.type !== "video/mp4")
        return setMessage({ ton: "erreur", texte: "Choisis le fichier .mp4 enregistré depuis try.manim.community." });
      // Le script d'abord : la vidéo se range avec lui, sous le même nom.
      const e = await appeler({ action: "enregistrer", nom: nomEffectif, script: source });
      if (!e.ok) return setMessage({ ton: "erreur", texte: e.message ?? "Échec." });
      const r = await appeler({ action: "envoyer-video", nom: nomEffectif, taille: fichier.size });
      if (!r.ok || !r.chemin || !r.jeton) return setMessage({ ton: "erreur", texte: r.message ?? "Échec." });
      const { error } = await createClient()
        .storage.from(BUCKET)
        .uploadToSignedUrl(r.chemin, r.jeton, fichier, { contentType: "video/mp4", upsert: true });
      if (error) return setMessage({ ton: "erreur", texte: "L'envoi de la vidéo a échoué. Réessaie." });
      const o = await appeler({ action: "ouvrir", nom: nomEffectif });
      setVideo(o.video ?? null);
      setMessage({ ton: "ok", texte: `Vidéo enregistrée avec « ${nomEffectif} ».` });
      await rafraichir();
    });

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <h2 className="text-lg font-black text-slate-900">4. Enregistrer ton travail</h2>

      {!token ? (
        <p className="mt-2 text-slate-700">
          Pour garder ton script et ta vidéo, connecte-toi avec ton code établissement ou ton e-mail.{" "}
          <Link href="/auth/signin?mode=eleve" className="font-bold text-sky-700 underline">
            Me connecter
          </Link>
        </p>
      ) : (
        <>
          <p className="mt-1 text-sm text-slate-700">
            Connecté{eleve?.nom ? ` : ${eleve.nom}` : ""}. Ton script et ta vidéo restent privés : toi seul les vois.
          </p>

          <label className="mt-3 flex min-w-0 flex-col text-sm font-semibold text-slate-800">
            Nom de ta vidéo
            <input
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              maxLength={60}
              placeholder={nomParDefaut}
              className="mt-1 w-full max-w-sm rounded-lg border border-slate-300 px-3 py-1.5 font-normal"
            />
          </label>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={enregistrer}
              disabled={occupe}
              className="rounded-lg bg-sky-600 px-3 py-1.5 font-bold text-white hover:bg-sky-700 disabled:opacity-40"
            >
              Enregistrer mon script
            </button>
            <label
              className={`cursor-pointer rounded-lg border border-emerald-600 px-3 py-1.5 font-bold text-emerald-700 hover:bg-emerald-50 ${
                occupe ? "pointer-events-none opacity-40" : ""
              }`}
            >
              Ajouter ma vidéo (.mp4)
              <input
                type="file"
                accept="video/mp4,.mp4"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  e.target.value = "";
                  if (f) envoyerVideo(f);
                }}
              />
            </label>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            La vidéo : sur try.manim.community, clic droit sur ta vidéo → « Enregistrer la vidéo sous », puis « Ajouter
            ma vidéo ».
          </p>

          {message && (
            <p className={`mt-3 text-sm font-semibold ${message.ton === "ok" ? "text-emerald-700" : "text-red-700"}`}>
              {message.texte}
            </p>
          )}
          {occupe && <p className="mt-3 text-sm text-slate-500">Un instant…</p>}

          {video && (
            <video src={video} controls preload="metadata" className="mt-4 w-full max-w-xl rounded-xl bg-black" />
          )}

          <MaVoix
            phrases={phrases}
            enregistrees={voixEnregistrees}
            appeler={appeler}
            avantEnvoi={avantEnvoi}
            onGardee={() => rafraichirVoix().catch(() => {})}
            onRemplacerPhrase={onRemplacerPhrase}
          />

          {projets.length > 0 && (
            <div className="mt-5">
              <p className="text-sm font-bold text-slate-800">Mes vidéos</p>
              <ul className="mt-2 divide-y divide-slate-100 rounded-xl border border-slate-200">
                {projets.map((p) => (
                  <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-sm">
                    <span className="min-w-0 font-semibold text-slate-900">
                      {p.nom} {p.video && <span className="ml-1 text-emerald-700">🎬</span>}
                      <span className="ml-2 font-normal text-slate-500">
                        {new Date(p.majLe).toLocaleDateString("fr-FR")}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => ouvrir(p.nom)}
                      disabled={occupe}
                      className="rounded-lg border border-slate-300 px-2.5 py-1 font-semibold text-slate-800 hover:bg-slate-100 disabled:opacity-40"
                    >
                      Ouvrir
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </section>
  );
}
