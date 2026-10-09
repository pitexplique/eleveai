"use client";

// app/atelier-video/AtelierVideoClient.tsx
//
// ⭐ 09/10/2026 — L'ATELIER VIDÉO, EN TEST. L'élève écrit son script en
// français ; l'aperçu l'anime ici, dans le navigateur (gratuit, instantané),
// avec SA voix s'il l'a enregistrée. Le découpage du script est dans
// lib/atelier-video/script.ts.
// ⛔ 09/10/2026 — LA PARTIE « 3. Le vrai rendu avec Manim » EST RETIRÉE
// (Frédéric : « trop long, trop complexe » : copier le code, ouvrir
// try.manim.community, coller…). `versManim` reste dans la bibliothèque, testé
// sur Binder, si un rendu Manim revient un jour sous une autre forme.
//
// ⛔ Rien ne se lance tout seul : l'aperçu et la voix partent au clic.

import "katex/dist/katex.min.css";
import katex from "katex";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  AIDE,
  COULEURS,
  EXEMPLES,
  dureeVoix,
  lireScript,
  type Contenu,
  type Etape,
  type VoixEleve,
} from "@/lib/atelier-video/script";
import MonTravail from "./MonTravail";

const CLE_STOCKAGE = "atelier-video:script";

type Objet = {
  id: number;
  rendu: { kind: "html"; html: string; formule: boolean } | { kind: "droite"; de: number; a: number } | { kind: "billes"; rangees: number; colonnes: number };
  couleur: string;
  cadre?: string;
  grand?: boolean;
  sortie?: boolean;
};

type Scene = { titre?: string; pile: Objet[]; sousTitre?: string };

function htmlDe(c: Contenu): Objet["rendu"] {
  if (c.kind === "texte") {
    const div = typeof document !== "undefined" ? document.createElement("div") : null;
    if (div) div.textContent = c.texte;
    return { kind: "html", html: div ? div.innerHTML : c.texte, formule: false };
  }
  return {
    kind: "html",
    html: katex.renderToString(c.latex, { throwOnError: false, displayMode: false }),
    formule: true,
  };
}

const attendre = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function voixFrancaise(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const voix = window.speechSynthesis.getVoices().filter((v) => v.lang?.toLowerCase().startsWith("fr"));
  return voix.find((v) => v.localService) ?? voix[0] ?? null;
}

// Le son de l'élève en cours de lecture, pour que « Arrêter » le coupe aussi.
let sonEnCours: HTMLAudioElement | null = null;

function couperLaVoix() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  sonEnCours?.pause();
  sonEnCours = null;
}

/**
 * Dit la phrase : avec la voix ENREGISTRÉE de l'élève s'il en a une (version 2),
 * sinon avec la voix du navigateur si elle est activée, sinon attend le temps
 * de la dire.
 */
function parler(texte: string, avecVoix: boolean, enregistree?: VoixEleve): Promise<void> {
  const duree = dureeVoix(texte) * 1000;
  if (avecVoix && enregistree && typeof Audio !== "undefined") {
    return new Promise((resolve) => {
      const son = new Audio(enregistree.url);
      sonEnCours = son;
      let fini = false;
      const finir = () => {
        if (!fini) {
          fini = true;
          resolve();
        }
      };
      son.onended = finir;
      son.onerror = finir;
      setTimeout(finir, enregistree.duree * 1000 + 3000);
      son.play().catch(finir);
    });
  }
  if (!avecVoix || typeof window === "undefined" || !("speechSynthesis" in window)) return attendre(duree);
  return new Promise((resolve) => {
    const u = new SpeechSynthesisUtterance(texte);
    u.lang = "fr-FR";
    const v = voixFrancaise();
    if (v) u.voice = v;
    let fini = false;
    const finir = () => {
      if (!fini) {
        fini = true;
        resolve();
      }
    };
    u.onend = finir;
    u.onerror = finir;
    // Filet : certaines voix n'envoient jamais « onend ».
    setTimeout(finir, duree * 2 + 2000);
    window.speechSynthesis.speak(u);
  });
}

function Droite({ de, a }: { de: number; a: number }) {
  const n = a - de;
  const x = (k: number) => 40 + ((k - de) / n) * 920;
  return (
    <svg viewBox="0 0 1000 110" style={{ width: "77cqw" }} className="anim-ecrire overflow-visible">
      <line x1={10} y1={40} x2={990} y2={40} stroke="currentColor" strokeWidth={4} />
      <path d="M990 40 l-18 -10 v20 z" fill="currentColor" />
      {Array.from({ length: n + 1 }, (_, i) => de + i).map((k) => (
        <g key={k}>
          <line x1={x(k)} y1={28} x2={x(k)} y2={52} stroke="currentColor" strokeWidth={4} />
          <text x={x(k)} y={95} fill="currentColor" fontSize={34} textAnchor="middle" fontFamily="KaTeX_Main, serif">
            {k < 0 ? `−${-k}` : k}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Billes({ rangees, colonnes }: { rangees: number; colonnes: number }) {
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${colonnes}, 2.25cqw)`, gap: "2.1cqw" }}
    >
      {Array.from({ length: rangees * colonnes }, (_, i) => (
        <span
          key={i}
          className="anim-bille block aspect-square rounded-full"
          style={{ background: "#58A6FF", animationDelay: `${i * 40}ms` }}
        />
      ))}
    </div>
  );
}

function Ecran({ scene }: { scene: Scene }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl bg-black text-white shadow-lg"
      style={{ aspectRatio: "16 / 9", containerType: "inline-size" }}
    >
      {scene.titre && (
        <p
          key={scene.titre}
          className="anim-ecrire absolute inset-x-0 text-center"
          style={{ top: "3.5cqw", fontSize: "3.3cqw", lineHeight: 1.2 }}
        >
          {scene.titre}
        </p>
      )}
      <div className="absolute inset-x-0 flex flex-col items-center" style={{ top: "13cqw", gap: "3.5cqw" }}>
        {scene.pile.map((o) => (
          <div
            key={o.id}
            className="relative transition-all duration-500"
            style={{
              color: o.couleur,
              transform: o.grand ? "scale(1.5)" : "scale(1)",
              opacity: o.sortie ? 0 : 1,
              zIndex: o.grand ? 2 : 1,
            }}
          >
            {o.rendu.kind === "html" ? (
              <div
                key={o.rendu.html}
                className="anim-ecrire whitespace-nowrap"
                style={{ fontSize: o.rendu.formule ? "4.8cqw" : "2.9cqw" }}
                dangerouslySetInnerHTML={{ __html: o.rendu.html }}
              />
            ) : o.rendu.kind === "droite" ? (
              <Droite de={o.rendu.de} a={o.rendu.a} />
            ) : (
              <Billes rangees={o.rendu.rangees} colonnes={o.rendu.colonnes} />
            )}
            {o.cadre && (
              <span
                className="anim-cadre pointer-events-none absolute"
                style={{ inset: "-1.4cqw", border: `0.25cqw solid ${o.cadre}` }}
              />
            )}
          </div>
        ))}
      </div>
      {scene.sousTitre && (
        <p
          className="absolute inset-x-0 px-[6cqw] text-center"
          style={{ bottom: "2cqw", fontSize: "1.9cqw", color: "#DDDDDD", lineHeight: 1.25 }}
        >
          {scene.sousTitre}
        </p>
      )}
    </div>
  );
}

export default function AtelierVideoClient() {
  const [source, setSource] = useState(EXEMPLES[0].script);
  const [scene, setScene] = useState<Scene>({ pile: [] });
  const [enCours, setEnCours] = useState(false);
  const [ligneActive, setLigneActive] = useState<number | null>(null);
  const [avecVoix, setAvecVoix] = useState(true);
  const [voixEleve, setVoixEleve] = useState<Record<string, VoixEleve>>({});
  const jeton = useRef(0);
  const idSuivant = useRef(1);

  // Le brouillon de l'élève reste dans SON navigateur (simple confort).
  // Arrivé par le clap de l'accueil (?matiere=francais…) : l'exemple de SA
  // matière, sauf si son brouillon est un vrai travail (pas un exemple intact).
  useEffect(() => {
    const matiere = new URLSearchParams(window.location.search).get("matiere");
    const exemple = EXEMPLES.find((e) => e.matiere === matiere);
    let brouillon: string | null = null;
    try {
      brouillon = localStorage.getItem(CLE_STOCKAGE);
    } catch {}
    const brouillonIntact = !brouillon || EXEMPLES.some((e) => e.script === brouillon);
    if (exemple && brouillonIntact) setSource(exemple.script);
    else if (brouillon) setSource(brouillon);
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(CLE_STOCKAGE, source);
    } catch {}
  }, [source]);

  const script = useMemo(() => lireScript(source), [source]);
  const erreurs = script.remarques.filter((r) => r.niveau === "erreur");
  const conseils = script.remarques.filter((r) => r.niveau === "conseil");

  function arreter() {
    jeton.current++;
    couperLaVoix();
    setEnCours(false);
    setLigneActive(null);
  }

  useEffect(() => arreter, []);

  async function jouer() {
    arreter();
    const moi = ++jeton.current;
    const vivant = () => moi === jeton.current;
    setEnCours(true);
    setScene({ pile: [] });
    await attendre(300);

    const derniere = (f: (o: Objet) => Objet) =>
      setScene((s) => ({ ...s, pile: s.pile.map((o, i) => (i === s.pile.length - 1 ? f(o) : o)) }));

    for (const e of script.etapes as Etape[]) {
      if (!vivant()) return;
      setLigneActive(e.ligne);
      if (e.voix) setScene((s) => ({ ...s, sousTitre: e.voix }));
      const voix = e.voix ? parler(e.voix, avecVoix, voixEleve[e.voix]) : Promise.resolve();

      let anim = 900;
      switch (e.type) {
        case "titre":
          setScene((s) => ({ ...s, titre: e.texte }));
          break;
        case "ecris":
          setScene((s) => ({
            ...s,
            pile: [...s.pile, { id: idSuivant.current++, rendu: htmlDe(e.contenu), couleur: "#FFFFFF" }],
          }));
          break;
        case "transforme":
          derniere((o) => ({ ...o, rendu: htmlDe(e.contenu) }));
          break;
        case "entoure":
          derniere((o) => ({ ...o, cadre: COULEURS[e.couleur] }));
          break;
        case "couleur":
          derniere((o) => ({ ...o, couleur: COULEURS[e.couleur] }));
          break;
        case "agrandis":
          derniere((o) => ({ ...o, grand: true }));
          await attendre(600);
          if (!vivant()) return;
          derniere((o) => ({ ...o, grand: false }));
          anim = 600;
          break;
        case "efface":
          setScene((s) => ({ ...s, pile: s.pile.map((o) => ({ ...o, sortie: true })) }));
          await attendre(500);
          if (!vivant()) return;
          setScene((s) => ({ ...s, pile: [] }));
          anim = 0;
          break;
        case "droite":
          setScene((s) => ({
            ...s,
            pile: [...s.pile, { id: idSuivant.current++, rendu: { kind: "droite", de: e.de, a: e.a }, couleur: "#FFFFFF" }],
          }));
          break;
        case "billes":
          setScene((s) => ({
            ...s,
            pile: [
              ...s.pile,
              { id: idSuivant.current++, rendu: { kind: "billes", rangees: e.rangees, colonnes: e.colonnes }, couleur: "#FFFFFF" },
            ],
          }));
          anim = 600 + e.rangees * e.colonnes * 40;
          break;
        case "pause":
          anim = e.secondes * 1000;
          break;
        case "dis":
          anim = 0;
          break;
      }
      await Promise.all([attendre(anim), voix]);
      if (!vivant()) return;
      if (e.voix) setScene((s) => ({ ...s, sousTitre: undefined }));
    }
    await attendre(800);
    if (vivant()) {
      setEnCours(false);
      setLigneActive(null);
    }
  }



  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-yellow-50 text-slate-950">
     <div className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
      <style>{`
        @keyframes ecrire { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
        .anim-ecrire { animation: ecrire 0.9s ease-out both; }
        @keyframes bille { from { transform: scale(0); } to { transform: scale(1); } }
        .anim-bille { animation: bille 0.35s ease-out both; }
        @keyframes cadre { from { clip-path: inset(0 100% 100% 0); } 50% { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0 0 0 0); } }
        .anim-cadre { animation: cadre 0.8s ease-out both; }
      `}</style>

      <p className="text-xs font-bold uppercase tracking-wide text-amber-700">En test</p>
      <h1 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">Atelier vidéo : écris ton script, regarde ta vidéo</h1>
      <p className="mt-2 max-w-3xl text-slate-700">
        Une ligne = un plan. Tu écris ce qui apparaît à l&apos;écran et ce que dit la voix, puis tu regardes ta vidéo.
        Connecté, tu peux l&apos;enregistrer et y mettre ta propre voix.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="self-center text-sm font-semibold text-slate-600">Exemples :</span>
        {EXEMPLES.map((ex) => (
          <button
            key={ex.nom}
            type="button"
            onClick={() => {
              arreter();
              setScene({ pile: [] });
              setSource(ex.script);
            }}
            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            {ex.nom}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        <section className="min-w-0">
          <label htmlFor="script" className="text-sm font-bold text-slate-800">
            1. Ton script
          </label>
          <textarea
            id="script"
            value={source}
            onChange={(ev) => setSource(ev.target.value)}
            spellCheck={false}
            rows={12}
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 font-mono text-sm leading-6 text-slate-900 shadow-inner focus:border-sky-500 focus:outline-none"
          />
          {ligneActive && (
            <p className="mt-1 text-sm text-sky-700">
              Ligne {ligneActive} : <span className="font-mono">{source.split(/\r?\n/)[ligneActive - 1]}</span>
            </p>
          )}
          {(erreurs.length > 0 || conseils.length > 0) && (
            <ul className="mt-2 space-y-1 text-sm">
              {erreurs.map((r, i) => (
                <li key={`e${i}`} className="rounded-lg bg-red-50 px-3 py-1.5 text-red-800">
                  <strong>Ligne {r.ligne}</strong> : {r.message}
                </li>
              ))}
              {conseils.map((r, i) => (
                <li key={`c${i}`} className="rounded-lg bg-amber-50 px-3 py-1.5 text-amber-900">
                  <strong>Ligne {r.ligne}</strong> : {r.message}
                </li>
              ))}
            </ul>
          )}
          <details className="mt-3 rounded-xl border border-slate-200 bg-white p-3">
            <summary className="cursor-pointer text-sm font-bold text-slate-800">Les instructions</summary>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              {AIDE.map((a) => (
                <li key={a.instruction}>
                  <span className="font-mono font-bold text-slate-900">{a.instruction}</span> {a.effet}
                  <br />
                  <span className="font-mono text-xs text-slate-500">{a.exemple}</span>
                </li>
              ))}
            </ul>
          </details>
        </section>

        <section className="min-w-0">
          <p className="text-sm font-bold text-slate-800">2. L&apos;aperçu</p>
          <div className="mt-1">
            <Ecran scene={scene} />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {enCours ? (
              <button
                type="button"
                onClick={arreter}
                className="rounded-xl bg-slate-800 px-4 py-2 font-bold text-white hover:bg-slate-700"
              >
                ■ Arrêter
              </button>
            ) : (
              <button
                type="button"
                onClick={jouer}
                disabled={script.etapes.length === 0}
                className="rounded-xl bg-sky-600 px-4 py-2 font-bold text-white hover:bg-sky-700 disabled:opacity-40"
              >
                ▶ Voir l&apos;aperçu
              </button>
            )}
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={avecVoix} onChange={(e) => setAvecVoix(e.target.checked)} />
              Lire la voix
            </label>
          </div>
        </section>
      </div>


      <MonTravail
        source={source}
        nomParDefaut={
          (script.etapes.find((e) => e.type === "titre") as { texte?: string } | undefined)?.texte ?? "Ma vidéo"
        }
        phrases={script.etapes.map((e) => e.voix).filter((v): v is string => !!v)}
        onOuvrir={(s) => {
          arreter();
          setScene({ pile: [] });
          setSource(s);
        }}
        onRemplacerPhrase={(ancienne, nouvelle) =>
          setSource((src) =>
            src
              .split(/\r?\n/)
              .map((l) => {
                // La phrase après « dis : », en bout de ligne (après « | ») ou seule.
                const m = l.match(/^(.*?(?:\||^)\s*(?:dis|voix)\s*:\s*)(.*)$/i);
                return m && m[2].trim() === ancienne ? m[1] + nouvelle : l;
              })
              .join("\n"),
          )
        }
        onVoixEleve={setVoixEleve}
      />
     </div>
    </main>
  );
}
