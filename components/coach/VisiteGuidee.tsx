"use client";

// ⭐ 26/11/2026 — LA VISITE GUIDÉE DU COACH, AVEC TI MARGO.
//
// Frédéric : « un élève est perdu, peut-être une vidéo d'explication de comment
// ça fonctionne, ou alors une animation » ; « à programmer pour toutes les
// classes ». Choix du chef : une animation dans la page, pas une vidéo (ses
// élèves se lassent des vidéos, beaucoup lisent mal).
//
// LE VRAI PARCOURS, dit par Frédéric : « aller sur la notion avec la barre de
// recherche ou défiler, cocher les micro-compétences oui ou non, et lancer soit
// vidéo, soit coach, soit exercices corrigés, soit carte mentale ». D'où quatre
// étapes, chacune sur l'élément VRAI de la page (repères `data-visite`) :
//   1. la barre de recherche            (`data-visite="recherche"`)
//   2. les cases des micros             (1re case du 1er bloc de notion)
//   3. les boutons de la notion : GO, ▶ Vidéo, Exercices, CM (sous-bulles,
//      toutes dans le 1er bloc `data-visite="bloc"` ; un bouton absent = sa
//      sous-bulle sautée)
//   4. GO
// Phrases de 10 mots au plus, lues à voix haute (la voix du Coach sonore),
// bouton « Passer ». Une seule fois (localStorage, sous try/catch) ; le bouton
// pastille « 🦎 Lance l'animation » (BoutonVisiteGuidee) la relance.
// ⛔ Jamais pour un prof connecté (prof, principal, boss).
// ⛔ Rien de lourd : pas de bibliothèque ; les gestes animés de Ti Margo du site.

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useEleve } from "@/context/EleveContext";
import { speakText, stopSpeak } from "@/app/coach/serie/ListenButton";

const CLE = "eleveai_visite_coach_v1";
const EVENEMENT = "eleveai:visite-coach";

const premierBloc = () => document.querySelector<HTMLElement>('[data-visite="bloc"]');
const dansBloc = (sel: string) => () => premierBloc()?.querySelector<HTMLElement>(sel) ?? null;
/** Le bouton Vidéo de la notion (même rangée que GO) ; à défaut, la vidéo de
 *  sa 1re série (les lignes ont aussi leur « ▶ Vidéo »). */
const boutonVideo = () => {
  const bloc = premierBloc();
  const rangee = bloc?.querySelector('[data-visite="go"]')?.parentElement;
  const dit = (e: Element) => e.textContent?.trim() === "Vidéo";
  return (
    (([...(rangee?.children ?? [])] as HTMLElement[]).find(dit) ??
      ([...(bloc?.querySelectorAll("a, button") ?? [])] as HTMLElement[]).find(dit)) ??
    null
  );
};

type Etape = {
  num: number;
  titre: string;
  /** Une seconde ligne, plus petite. */
  sous?: string;
  /** Le surtitre de l'étape 3, commun à ses quatre bulles. */
  groupe?: string;
  /** Le geste animé de Ti Margo (public/ti-margo/animations/ti-margo-animations.css). */
  geste: string;
  trouver: () => HTMLElement | null;
};

const ETAPES: Etape[] = [
  {
    num: 1,
    titre: "Trouve ta notion.",
    sous: "Ou fais défiler la liste.",
    geste: "salut",
    trouver: () => document.querySelector<HTMLElement>('[data-visite="recherche"]'),
  },
  {
    num: 2,
    titre: "Coche ce que tu veux travailler.",
    sous: "Ou rien, pour tout faire.",
    geste: "reflechit",
    trouver: dansBloc('input[type="checkbox"]'),
  },
  {
    num: 3,
    groupe: "Choisis comment apprendre.",
    titre: "GO : le coach.",
    geste: "encouragement",
    trouver: dansBloc('[data-visite="go"]'),
  },
  {
    num: 3,
    groupe: "Choisis comment apprendre.",
    titre: "Vidéo : la leçon en vidéo.",
    geste: "encouragement",
    trouver: boutonVideo,
  },
  {
    num: 3,
    groupe: "Choisis comment apprendre.",
    titre: "Exercices : des exercices corrigés.",
    geste: "encouragement",
    trouver: dansBloc('[data-visite="exercices"]'),
  },
  {
    num: 3,
    groupe: "Choisis comment apprendre.",
    titre: "CM : la carte mentale.",
    geste: "encouragement",
    trouver: dansBloc('[data-visite="cm"]'),
  },
  {
    num: 4,
    titre: "Appuie sur GO pour t'entraîner !",
    geste: "saut-de-joie",
    trouver: dansBloc('[data-visite="go"]'),
  },
];
const NB_ETAPES = 4;

const aDire = (e: Etape) => [e.groupe, e.titre, e.sous].filter(Boolean).join(" ");

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
      className={`rounded-full border border-green-600 bg-green-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 ${className}`}
    >
      🦎 Lance l&apos;animation
    </button>
  );
}

type Boite = { top: number; left: number; width: number; height: number };

export default function VisiteGuidee() {
  const { eleve, pret } = useEleve();
  const estProf = ["prof", "principal", "boss"].includes(eleve?.type_utilisateur ?? "");
  // Une bulle dont l'élément manque (notion sans vidéo) est sautée AU MOMENT
  // d'y passer : les boutons Vidéo arrivent de Supabase après l'ouverture.
  const etapes = ETAPES;
  const suivante = (depuis: number) => {
    for (let i = depuis; i < ETAPES.length; i += 1) if (ETAPES[i].trouver()) return i;
    return null;
  };
  const [index, setIndex] = useState<number | null>(null);
  const [boite, setBoite] = useState<Boite | null>(null);
  const boutonRef = useRef<HTMLButtonElement>(null);

  const demarrer = useCallback(() => {
    const i = suivante(0);
    if (i !== null) setIndex(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fermer = useCallback(() => {
    stopSpeak();
    marquerVue();
    setIndex(null);
    setBoite(null);
  }, []);

  // Démarrage : première visite, une fois la liste des notions affichée.
  // Un temps de plus après le premier GO : les boutons Vidéo arrivent ensuite.
  useEffect(() => {
    if (!pret || estProf || dejaVue()) return;
    let essais = 0;
    let depart: number | undefined;
    const id = window.setInterval(() => {
      essais += 1;
      if (document.querySelector('[data-visite="go"]')) {
        window.clearInterval(id);
        depart = window.setTimeout(demarrer, 1200);
      } else if (essais > 40) window.clearInterval(id);
    }, 250);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(depart);
    };
  }, [pret, estProf, demarrer]);

  // « ? Comment ça marche » : relance, même déjà vue.
  useEffect(() => {
    window.addEventListener(EVENEMENT, demarrer);
    return () => window.removeEventListener(EVENEMENT, demarrer);
  }, [demarrer]);

  const etape = index === null ? null : etapes[index] ?? null;

  // À chaque bulle : lire la phrase à voix haute.
  useEffect(() => {
    if (!etape) return;
    speakText(aDire(etape), "fr");
    boutonRef.current?.focus({ preventScroll: true });
  }, [etape]);

  // La bulle suit l'élément (défilement, rotation du téléphone). On amène
  // d'abord l'élément à l'écran, AVANT de mesurer : sinon la bulle naît à
  // l'ancienne place et glisse.
  useLayoutEffect(() => {
    if (!etape) return;
    etape.trouver()?.scrollIntoView({ block: "center", behavior: "auto" });
    const mesurer = () => {
      const el = etape.trouver();
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
    if (!etape) return;
    const touche = (e: KeyboardEvent) => {
      if (e.key === "Escape") fermer();
    };
    window.addEventListener("keydown", touche);
    return () => window.removeEventListener("keydown", touche);
  }, [etape, fermer]);

  if (!etape || index === null) return null;
  const prochaine = suivante(index + 1);
  const derniere = prochaine === null;

  // Placement : sous l'élément s'il y a la place, au-dessus sinon.
  const MARGE = 6;
  const vw = typeof window !== "undefined" ? window.innerWidth : 375;
  const vh = typeof window !== "undefined" ? window.innerHeight : 700;
  const largeur = Math.min(340, vw - 32);
  const centreX = boite ? boite.left + boite.width / 2 : vw / 2;
  const left = Math.max(16, Math.min(centreX - largeur / 2, vw - 16 - largeur));
  const enDessous = !boite || boite.top + boite.height + 250 < vh;
  const top = boite ? (enDessous ? boite.top + boite.height + MARGE + 12 : undefined) : vh / 2 - 100;
  const bottom = boite && !enDessous ? vh - boite.top + MARGE + 12 : undefined;
  const flecheX = Math.max(20, Math.min(centreX - left, largeur - 20));

  return (
    <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label="Comment ça marche">
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="/ti-margo/animations/ti-margo-animations.css" />
      <style>{`
        @keyframes visite-pop { 0% { opacity: 0; transform: scale(.85) } 70% { transform: scale(1.04) } 100% { opacity: 1; transform: scale(1) } }
        @keyframes visite-tape { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
        .visite-bulle { animation: visite-pop .35s ease-out both }
        .visite-doigt { animation: visite-tape .8s ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) { .visite-bulle, .visite-doigt { animation: none } }
      `}</style>
      {/* Le voile, troué autour de l'élément montré. Un clic dessus ferme. */}
      <button type="button" aria-label="Passer" onClick={fermer} className="absolute inset-0 cursor-default" />
      {boite ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-2xl ring-4 ring-amber-300 transition-all duration-500 ease-out"
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
      {/* L'anneau qui pulse et le doigt qui tapote : on VOIT où appuyer. */}
      {boite ? (
        <>
          <span
            key={`anneau-${index}`}
            aria-hidden="true"
            className="pointer-events-none absolute animate-ping rounded-2xl border-4 border-amber-300 [animation-duration:1.6s]"
            style={{ top: boite.top - MARGE, left: boite.left - MARGE, width: boite.width + MARGE * 2, height: boite.height + MARGE * 2 }}
          />
          <span
            key={`doigt-${index}`}
            aria-hidden="true"
            className="visite-doigt pointer-events-none absolute text-4xl drop-shadow-lg"
            style={{
              left: Math.min(boite.left + boite.width / 2, boite.left + 60) - 14,
              top: enDessous ? boite.top + boite.height - 10 : boite.top - 40,
            }}
          >
            {enDessous ? "👆" : "👇"}
          </span>
        </>
      ) : null}

      <div
        key={`bulle-${index}`}
        className="visite-bulle absolute rounded-3xl bg-white p-4 shadow-2xl ring-4 ring-emerald-300 transition-[top,left,bottom] duration-500 ease-out"
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
          {/* Le geste rejoue à chaque bulle (`key`). */}
          <div
            key={`margo-${index}`}
            role="img"
            aria-label="Ti Margo"
            className={`ti-margo ti-margo--${etape.geste} shrink-0`}
            style={{ width: 96, height: 96 }}
          />
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
              Étape {etape.num} sur {NB_ETAPES}
            </p>
            {etape.groupe ? <p className="mt-0.5 text-sm font-bold text-slate-600">{etape.groupe}</p> : null}
            <p className="mt-1 text-xl font-black leading-tight text-slate-900">{etape.titre}</p>
            {etape.sous ? <p className="mt-1 text-base font-semibold text-slate-600">{etape.sous}</p> : null}
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
              onClick={() => speakText(aDire(etape), "fr")}
              aria-label="Écouter"
              className="rounded-full border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-bold text-sky-800 hover:bg-sky-100"
            >
              🔊
            </button>
          </div>
          <button
            ref={boutonRef}
            type="button"
            onClick={() => (prochaine === null ? fermer() : setIndex(prochaine))}
            className="rounded-full bg-green-600 px-5 py-2.5 text-base font-black text-white shadow hover:bg-green-700"
          >
            {derniere ? "C'est parti !" : "Suivant ›"}
          </button>
        </div>
      </div>
    </div>
  );
}
