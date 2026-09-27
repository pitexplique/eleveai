"use client";

// app/defis-ti-margo/[planche]/PlancheClient.tsx
//
// Une planche des « Défis de Ti Margo » : une case à la fois (27/09/2026).
// ⭐ Les nombres se tirent AU CLIC sur « C'est parti ! », jamais au rendu : un
// tirage au rendu serveur ne serait pas celui du navigateur. Et ce premier clic
// est aussi le geste qui autorise le navigateur à parler.
// ⛔ Aucune réponse proposée : l'enfant tape la sienne (Frédéric : « ne mets pas
// de réponses, ils vont vouloir cliquer »).
// ⛔ Pas de croix rouge ni de chrono : au premier essai faux, une méthode ; au
// second, on trouve ensemble — l'étoile reste à gagner à la case suivante.

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { speakText, stopSpeak } from "@/app/coach/serie/ListenButton";
import { SceneBD, type Humeur } from "@/components/defis/SceneBD";
import { enMots } from "@/lib/automatismes/lecture";
import { getPlanche, type CaseBD } from "@/lib/defis-ti-margo/planches";

const ENCRE = "#3b2a1a";
const TOUCHES = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#bdb2ff"];

type Etat = "question" | "juste" | "presque" | "ensemble";

export default function PlancheClient({ slug }: { slug: string }) {
  const planche = getPlanche(slug);
  const [cases, setCases] = useState<CaseBD[]>([]);
  const [i, setI] = useState(0);
  const [saisie, setSaisieEtat] = useState("");
  // ⛔ La saisie vit AUSSI dans une référence : « 6 » puis « ✓ » tapés très vite
  // (mesuré à 80 ms au test du 27/09) validaient la saisie d'AVANT — l'état
  // React n'était pas encore relu. Le bon chiffre était refusé : « Presque ! ».
  const saisieRef = useRef("");
  function setSaisie(v: string | ((s: string) => string)) {
    const suivant = typeof v === "function" ? v(saisieRef.current) : v;
    saisieRef.current = suivant;
    setSaisieEtat(suivant);
  }
  const [etat, setEtat] = useState<Etat>("question");
  const [etoiles, setEtoiles] = useState<boolean[]>([]);
  const [voix, setVoix] = useState(true);

  const c = cases[i];
  const fini = cases.length > 0 && i === cases.length - 1 && (etat === "juste" || etat === "ensemble");

  const bulle = !c ? "" : etat === "juste" ? `🌟 ${c.bravo}` : etat === "presque" ? `Presque ! ${c.aide}` : etat === "ensemble" ? `On y va ensemble : c'est ${c.reponse}. ${c.aide}` : c.bulle;
  const humeur: Humeur = etat === "juste" ? "joie" : etat === "presque" || etat === "ensemble" ? "hum" : "malin";

  function dire(texte: string) {
    if (voix) speakText(enMots(texte.replace("🌟", "")), "fr", { rate: 0.95 });
  }

  // Chaque bulle nouvelle est lue.
  useEffect(() => {
    if (c) dire(bulle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, etat, cases]);

  useEffect(() => () => stopSpeak(), []);

  if (!planche) return null;

  function commencer() {
    const tirees = planche!.tirer();
    setCases(tirees);
    setEtoiles(tirees.map(() => false));
    setI(0);
    setSaisie("");
    setEtat("question");
  }

  function valider() {
    const tape = saisieRef.current;
    if (!c || !tape) return;
    if (Number(tape) === c.reponse) {
      setEtat("juste");
      if (etat === "question" || etat === "presque") setEtoiles((e) => e.map((v, k) => (k === i ? true : v)));
      return;
    }
    setSaisie("");
    setEtat(etat === "question" ? "presque" : "ensemble");
  }

  function suivante() {
    setI((k) => k + 1);
    setSaisie("");
    setEtat("question");
  }

  function touche(t: string) {
    if (etat === "juste" || etat === "ensemble") return;
    if (t === "⌫") return setSaisie((s) => s.slice(0, -1));
    if (t === "✓") return valider();
    setSaisie((s) => (s.length < 2 ? s + t : s));
  }

  const nbEtoiles = etoiles.filter(Boolean).length;

  // ── L'accueil de la planche ─────────────────────────────────────────────
  if (!c) {
    return (
      <div className="defis mx-auto max-w-3xl px-4 py-6 text-center" style={{ color: ENCRE }}>
        <p className="font-titre text-sm font-bold uppercase tracking-wide text-orange-600">{planche.savoir}</p>
        <h1 className="font-titre mt-1 text-4xl font-bold">{planche.titre}</h1>
        <p className="mx-auto mt-3 max-w-xl text-lg">{planche.description}</p>
        <div className="mx-auto mt-5 max-w-2xl overflow-hidden rounded-3xl border-[5px] shadow-[6px_6px_0_#3b2a1a]" style={{ borderColor: ENCRE }}>
          <SceneBD scene={{ type: "feuille", presents: 7 }} qui="margo" humeur="malin" indice={0} />
        </div>
        <button type="button" onClick={commencer}
          className="font-titre mt-6 rounded-2xl border-4 px-8 py-4 text-2xl font-bold text-white shadow-[0_5px_0_#3b2a1a] active:translate-y-1"
          style={{ background: "#ff8c42", borderColor: ENCRE }}>
          C&apos;est parti ! 🐞
        </button>
        <p className="mt-3 text-sm">Les questions sont lues à voix haute : monte le son !</p>
      </div>
    );
  }

  // ── Une case ────────────────────────────────────────────────────────────
  return (
    <div className="defis mx-auto max-w-3xl px-3 py-4" style={{ color: ENCRE }}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h1 className="font-titre text-2xl font-bold">{planche.titre}</h1>
        <button type="button" onClick={() => { if (voix) stopSpeak(); setVoix((v) => !v); }}
          className="font-titre rounded-full border-[3px] bg-white px-3 py-1 text-sm font-bold" style={{ borderColor: ENCRE }}>
          {voix ? "🔊 Voix : oui" : "🔇 Voix : non"}
        </button>
      </div>

      {/* La bande des cases : la planche se remplit */}
      <div className="mb-3 flex flex-wrap justify-center gap-2" aria-label="Les cases de la planche">
        {cases.map((cc, k) => (
          <div key={k}
            className={`font-titre flex h-11 w-14 items-center justify-center rounded-xl border-[3px] text-lg font-bold ${k % 2 ? "rotate-2" : "-rotate-2"}`}
            style={{ borderColor: ENCRE, background: etoiles[k] ? (cc.grandDefi ? "#ffd23f" : "#fff3b0") : "#dff4ff", outline: k === i ? "4px solid #ff8c42" : "none", outlineOffset: 2 }}>
            {etoiles[k] ? (cc.grandDefi ? "🌟" : "⭐") : k + 1}
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-[22px] border-[5px] shadow-[6px_6px_0_#3b2a1a]" style={{ borderColor: ENCRE }}>
        <SceneBD scene={c.scene} qui={c.qui} humeur={humeur} indice={i} />
        <div className="font-titre absolute left-3 top-3 -rotate-3 rounded-lg border-[3px] px-2 py-0.5 text-sm font-bold text-white"
          style={{ borderColor: ENCRE, background: c.grandDefi ? "#e63946" : c.qui === "pic" ? "#7209b7" : "#ff8c42" }}>
          {c.etiquette}
        </div>
        {/* ⛔ Sur téléphone, posée SUR le dessin, la bulle en cachait les trois quarts
            (mesuré le 27/09 : 148 px de haut dans une case de 198) : elle passe
            dessous, comme une bande de texte de BD. */}
        <div className="bulle-bd relative mx-3 mb-3 mt-4 rounded-[22px] border-4 bg-white px-4 py-3 text-[17px] font-bold leading-snug shadow-[3px_3px_0_#3b2a1a] sm:absolute sm:right-[3%] sm:top-[12%] sm:m-0 sm:w-[62%] sm:text-[clamp(15px,2.4vw,21px)]"
          style={{ borderColor: ENCRE }}>
          {bulle}
        </div>
        <button type="button" onClick={() => speakText(enMots(bulle.replace("🌟", "")), "fr", { rate: 0.95 })}
          className="font-titre absolute right-2 top-2 rounded-full border-[3px] px-3 py-1 text-sm font-bold sm:bottom-2 sm:top-auto"
          style={{ borderColor: ENCRE, background: "#ffd23f" }}>
          🔊 Écouter
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        <div className="font-titre flex h-16 min-w-[100px] items-center justify-center rounded-2xl border-4 border-dashed bg-white px-3 text-4xl font-bold" style={{ borderColor: ENCRE }}>
          {etat === "juste" || etat === "ensemble" ? c.reponse : saisie || "?"}
        </div>
        {etat === "juste" || etat === "ensemble" ? (
          fini ? null : (
            <button type="button" onClick={suivante}
              className="font-titre rounded-2xl border-4 px-5 py-3 text-xl font-bold text-white shadow-[0_4px_0_#3b2a1a] active:translate-y-1"
              style={{ background: "#ff8c42", borderColor: ENCRE }}>
              Case suivante ➜
            </button>
          )
        ) : (
          <div className="grid grid-cols-6 gap-2">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "⌫", "✓"].map((t, k) => (
              <button key={t} type="button" onClick={() => touche(t)} aria-label={t === "⌫" ? "Effacer" : t === "✓" ? "Valider" : t}
                className="font-titre h-[52px] w-[52px] rounded-2xl border-[3px] text-2xl font-bold shadow-[0_4px_0_#3b2a1a] active:translate-y-1"
                style={{ borderColor: ENCRE, color: ENCRE, background: t === "✓" ? "#6ccf6c" : t === "⌫" ? "#fff" : TOUCHES[k % 6] }}>
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      {fini ? (
        <div className="mt-6 rounded-3xl border-4 bg-[#fff3b0] p-5 text-center" style={{ borderColor: ENCRE }}>
          <p className="font-titre text-3xl font-bold">Planche terminée ! {"⭐".repeat(nbEtoiles) || "🐞"}</p>
          <p className="mt-2 text-lg">
            {nbEtoiles === cases.length ? "Toutes les étoiles ! Ti Margo et Pic sont fiers de toi." : `${nbEtoiles} étoile${nbEtoiles > 1 ? "s" : ""} sur ${cases.length}. Rejoue : les nombres changent à chaque fois !`}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={commencer}
              className="font-titre rounded-2xl border-4 px-5 py-3 text-xl font-bold text-white shadow-[0_4px_0_#3b2a1a]"
              style={{ background: "#6ccf6c", borderColor: ENCRE }}>
              🔁 Rejouer
            </button>
            <Link href="/defis-ti-margo" className="font-titre rounded-2xl border-4 bg-white px-5 py-3 text-xl font-bold shadow-[0_4px_0_#3b2a1a]" style={{ borderColor: ENCRE }}>
              Les autres défis
            </Link>
          </div>
        </div>
      ) : (
        <p className="font-titre mt-4 text-center text-lg font-bold">Tes étoiles : {etoiles.map((e) => (e ? "⭐" : "☆")).join(" ")}</p>
      )}
    </div>
  );
}
