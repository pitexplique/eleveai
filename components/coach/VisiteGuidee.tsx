"use client";

// ⭐ 26/11/2026 — LA VISITE GUIDÉE DU COACH, AVEC TI MARGO.
//
// Frédéric : « un élève est perdu, peut-être une vidéo d'explication de comment
// ça fonctionne, ou alors une animation » ; puis « à programmer pour toutes les
// classes ». Choix du chef : une animation dans la page, pas une vidéo (ses
// élèves se lassent des vidéos, beaucoup lisent mal).
//
// À la première visite d'une page de notions du coach, Ti Margo montre trois
// gestes, chacun sur l'élément VRAI de la page (repères `data-visite`) :
//   1. la notion   (`data-visite="notion"`, le premier titre de notion)
//   2. le GO       (`data-visite="go"`, le premier bouton GO)
//   3. le score    (`data-visite="score"`, la phrase « … correction et score ! »)
// Phrases de 10 mots au plus, lues à voix haute (la voix du Coach sonore),
// bouton « Passer ». Une seule fois (localStorage, sous try/catch) ; le bouton
// « ? Comment ça marche » (BoutonVisiteGuidee) la relance.
// ⛔ Jamais pour un prof connecté (prof, principal, boss).
// ⛔ Rien de lourd : pas de bibliothèque, trois PNG de Ti Margo déjà sur le site.

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useEleve } from "@/context/EleveContext";
import { speakText, stopSpeak } from "@/app/coach/serie/ListenButton";

const CLE = "eleveai_visite_coach_v1";
const EVENEMENT = "eleveai:visite-coach";

type Etape = { cible: string; texte: string; image: string };

const ETAPES: Etape[] = [
  { cible: "notion", texte: "Choisis ta notion.", image: "/ti-margo/animations/salut.png" },
  { cible: "go", texte: "Appuie sur GO pour commencer.", image: "/ti-margo/animations/reflechit.png" },
  { cible: "score", texte: "Réponds, et gagne des points !", image: "/ti-margo/animations/bravo.png" },
];

function dejaVue(): boolean {
  try {
    return window.localStorage.getItem(CLE) === "1";
  } catch {
    return false;
  }
}

function marquerVue() {
  try {
    window.localStorage.setItem(CLE, "1");
  } catch {
    /* navigation privée : la visite reviendra, ce n'est pas grave */
  }
}

/** Le petit bouton qui relance la visite. Se pose où l'on veut dans la page. */
export function BoutonVisiteGuidee({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(EVENEMENT))}
      className={`rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100 ${className}`}
    >
      ? Comment ça marche
    </button>
  );
}

type Boite = { top: number; left: number; width: number; height: number };

export default function VisiteGuidee() {
  const { eleve, pret } = useEleve();
  const estProf = ["prof", "principal", "boss"].includes(eleve?.type_utilisateur ?? "");
  const [etape, setEtape] = useState<number | null>(null);
  const [boite, setBoite] = useState<Boite | null>(null);
  const boutonRef = useRef<HTMLButtonElement>(null);

  const fermer = useCallback(() => {
    stopSpeak();
    marquerVue();
    setEtape(null);
    setBoite(null);
  }, []);

  // Démarrage : première visite, une fois la liste des notions affichée.
  useEffect(() => {
    if (!pret || estProf || dejaVue()) return;
    let essais = 0;
    const id = window.setInterval(() => {
      essais += 1;
      if (document.querySelector('[data-visite="go"]')) {
        window.clearInterval(id);
        setEtape(0);
      } else if (essais > 40) window.clearInterval(id);
    }, 250);
    return () => window.clearInterval(id);
  }, [pret, estProf]);

  // « ? Comment ça marche » : relance, même déjà vue.
  useEffect(() => {
    const relancer = () => setEtape(0);
    window.addEventListener(EVENEMENT, relancer);
    return () => window.removeEventListener(EVENEMENT, relancer);
  }, []);

  // À chaque étape : lire la phrase à voix haute.
  useEffect(() => {
    if (etape === null) return;
    speakText(ETAPES[etape].texte, "fr");
    boutonRef.current?.focus({ preventScroll: true });
  }, [etape]);

  // La bulle suit l'élément (défilement, rotation du téléphone). On amène
  // d'abord l'élément à l'écran, AVANT de mesurer : sinon la bulle naît à
  // l'ancienne place et glisse.
  useLayoutEffect(() => {
    if (etape === null) return;
    document
      .querySelector<HTMLElement>(`[data-visite="${ETAPES[etape].cible}"]`)
      ?.scrollIntoView({ block: "center", behavior: "auto" });
    const mesurer = () => {
      const el = document.querySelector<HTMLElement>(`[data-visite="${ETAPES[etape].cible}"]`);
      if (!el) return setBoite(null);
      const r = el.getBoundingClientRect();
      setBoite((b) =>
        b && b.top === r.top && b.left === r.left && b.width === r.width && b.height === r.height
          ? b
          : { top: r.top, left: r.left, width: r.width, height: r.height },
      );
    };
    mesurer();
    window.addEventListener("scroll", mesurer, true);
    window.addEventListener("resize", mesurer);
    // La liste bouge encore après l'ouverture (les boutons Vidéo arrivent
    // de Supabase et poussent les lignes) : on remesure tant que c'est ouvert.
    const id = window.setInterval(mesurer, 200);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("scroll", mesurer, true);
      window.removeEventListener("resize", mesurer);
    };
  }, [etape]);

  useEffect(() => {
    if (etape === null) return;
    const touche = (e: KeyboardEvent) => {
      if (e.key === "Escape") fermer();
    };
    window.addEventListener("keydown", touche);
    return () => window.removeEventListener("keydown", touche);
  }, [etape, fermer]);

  if (etape === null) return null;
  const { texte, image } = ETAPES[etape];
  const derniere = etape === ETAPES.length - 1;

  // Placement : sous l'élément s'il y a la place, au-dessus sinon.
  const MARGE = 8;
  const vw = typeof window !== "undefined" ? window.innerWidth : 375;
  const vh = typeof window !== "undefined" ? window.innerHeight : 700;
  const largeur = Math.min(340, vw - 32);
  const centreX = boite ? boite.left + boite.width / 2 : vw / 2;
  const left = Math.max(16, Math.min(centreX - largeur / 2, vw - 16 - largeur));
  const enDessous = !boite || boite.top + boite.height + 230 < vh;
  const top = boite ? (enDessous ? boite.top + boite.height + MARGE + 12 : undefined) : vh / 2 - 100;
  const bottom = boite && !enDessous ? vh - boite.top + MARGE + 12 : undefined;
  const flecheX = Math.max(20, Math.min(centreX - left, largeur - 20));

  return (
    <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label="Comment ça marche">
      {/* Le voile, troué autour de l'élément montré. Un clic dessus ferme. */}
      <button type="button" aria-label="Passer" onClick={fermer} className="absolute inset-0 cursor-default" />
      {boite ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-2xl ring-4 ring-amber-300 transition-all duration-300"
          style={{
            top: boite.top - MARGE,
            left: boite.left - MARGE,
            width: boite.width + MARGE * 2,
            height: boite.height + MARGE * 2,
            boxShadow: "0 0 0 9999px rgba(15, 23, 42, 0.55)",
          }}
        />
      ) : (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-slate-900/55" />
      )}

      <div
        className="absolute rounded-3xl bg-white p-4 shadow-2xl ring-4 ring-emerald-300 transition-all duration-300"
        style={{ left, width: largeur, top, bottom }}
      >
        {/* La pointe de la bulle, vers l'élément. */}
        {boite ? (
          <span
            aria-hidden="true"
            className={`absolute h-4 w-4 rotate-45 bg-white ${enDessous ? "-top-2" : "-bottom-2"}`}
            style={{ left: flecheX - 8 }}
          />
        ) : null}
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={image}
            src={image}
            alt="Ti Margo"
            width={72}
            height={72}
            className="h-[72px] w-[72px] shrink-0 animate-bounce [animation-iteration-count:2]"
          />
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
              Étape {etape + 1} sur {ETAPES.length}
            </p>
            <p className="mt-1 text-xl font-black leading-tight text-slate-900">{texte}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={fermer}
              className="rounded-full px-3 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100"
            >
              Passer
            </button>
            <button
              type="button"
              onClick={() => speakText(texte, "fr")}
              aria-label="Écouter"
              className="rounded-full border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-bold text-sky-800 hover:bg-sky-100"
            >
              🔊
            </button>
          </div>
          <button
            ref={boutonRef}
            type="button"
            onClick={() => (derniere ? fermer() : setEtape(etape + 1))}
            className="rounded-full bg-green-600 px-5 py-2.5 text-base font-black text-white shadow hover:bg-green-700"
          >
            {derniere ? "C'est parti !" : "Suivant ›"}
          </button>
        </div>
      </div>
    </div>
  );
}
