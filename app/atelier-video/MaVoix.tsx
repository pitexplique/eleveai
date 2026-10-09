"use client";

// app/atelier-video/MaVoix.tsx
//
// ⭐ 09/10/2026 — VERSION 2 (Frédéric : « la possibilité d'enregistrer en
// direct leurs voix, et que ça se traduise »). Pour chaque phrase « dis : » :
// - l'élève s'enregistre au micro (MediaRecorder) ;
// - le navigateur transcrit en même temps (SpeechRecognition, Chrome / Edge) :
//   l'élève peut prendre ce qu'il a VRAIMENT dit comme phrase du script, et
//   la règle « la voix dit, l'écran écrit » se vérifie alors sur sa parole ;
// - « Garder » range le son dans Supabase ; le code Manim le télécharge à la
//   place de la voix générée (lib/atelier-video/script.ts, `ma_voix`).
// Sans micro, rien ne change : la voix générée reste là.
// ⛔ Rien ne se lit tout seul : l'écoute se fait au clic.

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const BUCKET = "atelier-videos";

export type Appel = (corps: Record<string, unknown>) => Promise<{
  ok: boolean;
  message?: string;
  chemin?: string;
  jeton?: string;
}>;

/** Clé d'une phrase : début du SHA-1, la même côté route (12 caractères hexa). */
export async function clePhrase(texte: string) {
  const h = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(texte.trim()));
  return Array.from(new Uint8Array(h))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 12);
}

function typeAudio() {
  if (typeof MediaRecorder === "undefined") return null;
  return (
    ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"].find((t) =>
      MediaRecorder.isTypeSupported(t),
    ) ?? null
  );
}

async function dureeDe(blob: Blob, repli: number) {
  try {
    const ctx = new AudioContext();
    const buf = await ctx.decodeAudioData(await blob.arrayBuffer());
    ctx.close();
    return buf.duration;
  } catch {
    return repli;
  }
}

type Reconnaissance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  start: () => void;
  stop: () => void;
};

function nouvelleReconnaissance(): Reconnaissance | null {
  const w = window as unknown as { SpeechRecognition?: new () => Reconnaissance; webkitSpeechRecognition?: new () => Reconnaissance };
  const C = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  if (!C) return null;
  const r = new C();
  r.lang = "fr-FR";
  r.continuous = true;
  r.interimResults = true;
  return r;
}

function Phrase({
  texte,
  dejaEnregistree,
  appeler,
  avantEnvoi,
  onGardee,
  onRemplacer,
}: {
  texte: string;
  dejaEnregistree: boolean;
  appeler: Appel;
  avantEnvoi: () => Promise<boolean>;
  onGardee: () => void;
  onRemplacer: (nouvelle: string) => void;
}) {
  const [etat, setEtat] = useState<"repos" | "enregistre" | "pret" | "envoi">("repos");
  const [son, setSon] = useState<{ blob: Blob; url: string; duree: number } | null>(null);
  const [entendu, setEntendu] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const enreg = useRef<{ rec: MediaRecorder; flux: MediaStream; reco: Reconnaissance | null; debut: number } | null>(null);

  useEffect(
    () => () => {
      enreg.current?.flux.getTracks().forEach((t) => t.stop());
      if (son) URL.revokeObjectURL(son.url);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  async function demarrer() {
    setErreur(null);
    const type = typeAudio();
    if (!type || !navigator.mediaDevices?.getUserMedia)
      return setErreur("Ce navigateur ne sait pas enregistrer : garde la voix générée.");
    let flux: MediaStream;
    try {
      flux = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      return setErreur("Pas de micro, ou micro refusé : garde la voix générée.");
    }
    const morceaux: Blob[] = [];
    const rec = new MediaRecorder(flux, { mimeType: type });
    rec.ondataavailable = (e) => e.data.size && morceaux.push(e.data);
    rec.onstop = async () => {
      flux.getTracks().forEach((t) => t.stop());
      const blob = new Blob(morceaux, { type: type.split(";")[0] });
      const duree = await dureeDe(blob, (Date.now() - (enreg.current?.debut ?? Date.now())) / 1000);
      setSon((ancien) => {
        if (ancien) URL.revokeObjectURL(ancien.url);
        return { blob, url: URL.createObjectURL(blob), duree };
      });
      setEtat("pret");
    };
    const reco = nouvelleReconnaissance();
    setEntendu("");
    if (reco) {
      reco.onresult = (e) => {
        let t = "";
        for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript;
        setEntendu(t.trim());
      };
      try {
        reco.start();
      } catch {}
    }
    enreg.current = { rec, flux, reco, debut: Date.now() };
    rec.start();
    setEtat("enregistre");
  }

  function arreter() {
    const e = enreg.current;
    if (!e) return;
    try {
      e.reco?.stop();
    } catch {}
    e.rec.stop();
  }

  async function garder(phrase: string) {
    if (!son) return;
    setEtat("envoi");
    setErreur(null);
    try {
      if (!(await avantEnvoi())) return setEtat("pret");
      const cle = await clePhrase(phrase);
      const r = await appeler({ action: "envoyer-voix", cle, type: son.blob.type, taille: son.blob.size });
      if (!r.ok || !r.chemin || !r.jeton) throw new Error(r.message);
      const { error } = await createClient()
        .storage.from(BUCKET)
        .uploadToSignedUrl(r.chemin, r.jeton, son.blob, { contentType: son.blob.type, upsert: true });
      if (error) throw new Error("L'envoi a échoué. Réessaie.");
      const ok = await appeler({ action: "voix-ok", cle, type: son.blob.type, texte: phrase, duree: son.duree });
      if (!ok.ok) throw new Error(ok.message);
      if (phrase !== texte) onRemplacer(phrase);
      onGardee();
      setEtat("repos");
      setSon(null);
    } catch (e) {
      setErreur(e instanceof Error && e.message ? e.message : "L'envoi a échoué. Réessaie.");
      setEtat("pret");
    }
  }

  return (
    <li className="py-3">
      <p className="text-sm text-slate-900">
        « {texte} »{" "}
        {dejaEnregistree && <span className="font-semibold text-emerald-700">✓ ta voix</span>}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {etat === "enregistre" ? (
          <button
            type="button"
            onClick={arreter}
            className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-bold text-white hover:bg-red-700"
          >
            ■ Arrêter
          </button>
        ) : (
          <button
            type="button"
            onClick={demarrer}
            disabled={etat === "envoi"}
            className="rounded-lg border border-red-500 px-3 py-1.5 text-sm font-bold text-red-700 hover:bg-red-50 disabled:opacity-40"
          >
            🎙 {dejaEnregistree || son ? "Recommencer" : "M'enregistrer"}
          </button>
        )}
        {etat === "enregistre" && <span className="text-sm text-red-700">Je t&apos;écoute… dis ta phrase.</span>}
        {son && etat !== "enregistre" && <audio src={son.url} controls preload="metadata" className="h-9 max-w-full" />}
      </div>

      {entendu && etat !== "repos" && (
        <p className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
          J&apos;ai entendu : <em>« {entendu} »</em>
        </p>
      )}

      {son && etat === "pret" && (
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => garder(texte)}
            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-bold text-white hover:bg-emerald-700"
          >
            Garder ma voix
          </button>
          {entendu && entendu !== texte && (
            <button
              type="button"
              onClick={() => garder(entendu)}
              className="rounded-lg border border-emerald-600 px-3 py-1.5 text-sm font-bold text-emerald-700 hover:bg-emerald-50"
            >
              Garder, et écrire ce que j&apos;ai dit dans le script
            </button>
          )}
        </div>
      )}
      {etat === "envoi" && <p className="mt-2 text-sm text-slate-500">Envoi…</p>}
      {erreur && <p className="mt-2 text-sm font-semibold text-red-700">{erreur}</p>}
    </li>
  );
}

export default function MaVoix({
  phrases,
  enregistrees,
  appeler,
  avantEnvoi,
  onGardee,
  onRemplacerPhrase,
}: {
  phrases: string[];
  enregistrees: Set<string>;
  appeler: Appel;
  avantEnvoi: () => Promise<boolean>;
  onGardee: () => void;
  onRemplacerPhrase: (ancienne: string, nouvelle: string) => void;
}) {
  const uniques = [...new Set(phrases)];
  return (
    <div className="mt-6 rounded-xl border border-red-100 bg-red-50/40 p-3 sm:p-4">
      <p className="font-bold text-slate-900">🎙 Ta voix (version 2)</p>
      <p className="mt-1 text-sm text-slate-700">
        Tu as un micro (un téléphone suffit) ? Enregistre chaque phrase avec ta voix : elle remplacera la voix générée
        dans la vidéo Manim. Le site écrit ce qu&apos;il a entendu : si tu as dit autre chose, tu peux le mettre dans ton
        script.
      </p>
      {uniques.length === 0 ? (
        <p className="mt-2 text-sm text-slate-500">Ton script n&apos;a pas encore de phrase « dis : ».</p>
      ) : (
        <ul className="mt-1 divide-y divide-red-100">
          {uniques.map((p) => (
            <Phrase
              key={p}
              texte={p}
              dejaEnregistree={enregistrees.has(p)}
              appeler={appeler}
              avantEnvoi={avantEnvoi}
              onGardee={onGardee}
              onRemplacer={(n) => onRemplacerPhrase(p, n)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
