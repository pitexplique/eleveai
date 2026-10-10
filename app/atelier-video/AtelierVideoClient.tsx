"use client";

// app/atelier-video/AtelierVideoClient.tsx
//
// ⭐ 09/10/2026 — L'ATELIER VIDÉO (ouvert et dans le sitemap le 10/10). L'élève écrit son script en
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
import fixWebmDuration from "fix-webm-duration";
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
import {
  HAUTEUR,
  LARGEUR,
  dessinerScene,
  type ContenuDessin,
  type ObjetDessin,
  type SceneDessin,
} from "@/lib/atelier-video/dessin";
import MonTravail from "./MonTravail";

const CLE_STOCKAGE = "atelier-video:script";

// La scène est la même pour l'aperçu (HTML) et pour la vidéo téléchargée
// (canvas, lib/atelier-video/dessin.ts) : chaque objet garde l'instant de son
// apparition, de son cadre, de son agrandissement… d'où se calculent les animations.
type Objet = ObjetDessin;
type Scene = SceneDessin;

function contenuDe(c: Contenu): ContenuDessin {
  return c.kind === "texte" ? { kind: "texte", texte: c.texte } : { kind: "formule", latex: c.latex };
}

function htmlDe(c: ContenuDessin) {
  if (c.kind === "texte") {
    const div = typeof document !== "undefined" ? document.createElement("div") : null;
    if (div) div.textContent = c.texte;
    return { html: div ? div.innerHTML : c.texte, formule: false };
  }
  return { html: katex.renderToString(c.latex, { throwOnError: false, displayMode: false }), formule: true };
}

const maintenant = () => performance.now();

/** Les formats que le navigateur sait filmer, du meilleur au plus courant. */
function formatVideo() {
  if (typeof MediaRecorder === "undefined") return null;
  return (
    ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm", "video/mp4"].find((t) =>
      MediaRecorder.isTypeSupported(t),
    ) ?? null
  );
}

/** Pour la vidéo téléchargée : la voix enregistrée de l'élève passe par l'audio du film. */
type Export = { audio: AudioContext; sortie: MediaStreamAudioDestinationNode; tampons: Record<string, AudioBuffer> };

function parlerDansLeFilm(texte: string, exp: Export): Promise<void> {
  const tampon = exp.tampons[texte];
  if (!tampon) return attendre(dureeVoix(texte) * 1000);
  return new Promise((resolve) => {
    const source = exp.audio.createBufferSource();
    source.buffer = tampon;
    source.connect(exp.sortie);
    source.onended = () => resolve();
    source.start();
  });
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
        {scene.pile.map((o) => {
          const h = o.rendu.kind === "contenu" ? htmlDe(o.rendu.contenu) : null;
          return (
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
            {h ? (
              <div
                key={o.t}
                className="anim-ecrire whitespace-nowrap"
                style={{ fontSize: h.formule ? "4.8cqw" : "2.9cqw" }}
                dangerouslySetInnerHTML={{ __html: h.html }}
              />
            ) : o.rendu.kind === "droite" ? (
              <Droite de={o.rendu.de} a={o.rendu.a} />
            ) : o.rendu.kind === "billes" ? (
              <Billes rangees={o.rendu.rangees} colonnes={o.rendu.colonnes} />
            ) : null}
            {o.cadre && (
              <span
                className="anim-cadre pointer-events-none absolute"
                style={{ inset: "-1.4cqw", border: `0.25cqw solid ${o.cadre}` }}
              />
            )}
          </div>
          );
        })}
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

  // La scène vit aussi dans une ref : le film (canvas) la redessine à chaque
  // image, sans attendre que React l'ait affichée.
  const sceneRef = useRef<Scene>({ pile: [] });
  const maj = (f: (s: Scene) => Scene) => {
    sceneRef.current = f(sceneRef.current);
    setScene(sceneRef.current);
  };

  /**
   * Joue le script. Sans `exp` : l'aperçu, avec la voix de l'élève ou celle du
   * navigateur. Avec `exp` : le tournage du film téléchargé, où seule la voix
   * enregistrée de l'élève passe (la voix du navigateur ne se capture pas).
   * Renvoie true si le script est allé jusqu'au bout.
   */
  async function jouer(exp?: Export): Promise<boolean> {
    arreter();
    const moi = ++jeton.current;
    const vivant = () => moi === jeton.current;
    setEnCours(true);
    maj(() => ({ pile: [] }));
    await attendre(300);

    const derniere = (f: (o: Objet) => Objet) =>
      maj((s) => ({ ...s, pile: s.pile.map((o, i) => (i === s.pile.length - 1 ? f(o) : o)) }));
    const empiler = (rendu: Objet["rendu"]) =>
      maj((s) => ({ ...s, pile: [...s.pile, { id: idSuivant.current++, rendu, couleur: "#FFFFFF", t: maintenant() }] }));

    for (const e of script.etapes as Etape[]) {
      if (!vivant()) return false;
      setLigneActive(e.ligne);
      if (e.voix) maj((s) => ({ ...s, sousTitre: e.voix }));
      const voix = !e.voix
        ? Promise.resolve()
        : exp
          ? parlerDansLeFilm(e.voix, exp)
          : parler(e.voix, avecVoix, voixEleve[e.voix]);

      let anim = 900;
      switch (e.type) {
        case "titre":
          maj((s) => ({ ...s, titre: e.texte, tTitre: maintenant() }));
          break;
        case "ecris":
          empiler({ kind: "contenu", contenu: contenuDe(e.contenu) });
          break;
        case "transforme":
          derniere((o) => ({ ...o, rendu: { kind: "contenu", contenu: contenuDe(e.contenu) }, t: maintenant() }));
          break;
        case "entoure":
          derniere((o) => ({ ...o, cadre: COULEURS[e.couleur], tCadre: maintenant() }));
          break;
        case "couleur":
          derniere((o) => ({ ...o, couleur: COULEURS[e.couleur] }));
          break;
        case "agrandis":
          derniere((o) => ({ ...o, grand: true, tGrand: maintenant() }));
          await attendre(600);
          if (!vivant()) return false;
          derniere((o) => ({ ...o, grand: false, tGrand: maintenant() }));
          anim = 600;
          break;
        case "efface":
          maj((s) => ({ ...s, pile: s.pile.map((o) => ({ ...o, sortie: true, tSortie: maintenant() })) }));
          await attendre(500);
          if (!vivant()) return false;
          maj((s) => ({ ...s, pile: [] }));
          anim = 0;
          break;
        case "droite":
          empiler({ kind: "droite", de: e.de, a: e.a });
          break;
        case "billes":
          empiler({ kind: "billes", rangees: e.rangees, colonnes: e.colonnes });
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
      if (!vivant()) return false;
      if (e.voix) maj((s) => ({ ...s, sousTitre: undefined }));
    }
    await attendre(800);
    if (!vivant()) return false;
    setEnCours(false);
    setLigneActive(null);
    return true;
  }

  /* ── ⬇ TÉLÉCHARGER MA VIDÉO (10/10/2026) ─────────────────────────────────
     Le navigateur rejoue le script sur un canvas et le filme lui-même
     (captureStream + MediaRecorder) : un fichier vidéo, sans autre site, sans
     rien installer. Le son = la voix ENREGISTRÉE de l'élève ; une phrase sans
     enregistrement reste en sous-titre (la voix du navigateur ne se filme pas). */
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tournage, setTournage] = useState<null | "prepare" | "filme" | "fini" | "erreur">(null);
  const [film, setFilm] = useState<{ url: string; nom: string } | null>(null);

  async function telecharger() {
    const format = formatVideo();
    const canvas = canvasRef.current;
    if (!format || !canvas || typeof canvas.captureStream !== "function") {
      setTournage("erreur");
      return;
    }
    arreter();
    setTournage("prepare");
    let audio: AudioContext | null = null;
    let boucle = 0;
    try {
      // Les polices des formules doivent être prêtes avant la première image.
      await Promise.all([
        document.fonts.load("40px KaTeX_Main"),
        document.fonts.load("italic 40px KaTeX_Math"),
      ]).catch(() => {});
      audio = new AudioContext();
      const sortie = audio.createMediaStreamDestination();
      // ⛔ Un silence branché tout le tournage : sans lui, Chrome cesse
      // d'enregistrer le son dès qu'aucune voix ne joue (mesuré le 10/10 : la
      // piste s'arrêtait à 2,3 s sur 12), et une voix plus loin se décalerait.
      const silence = audio.createConstantSource();
      silence.offset.value = 0;
      silence.connect(sortie);
      silence.start();
      // Les voix de l'élève, chargées AVANT de filmer : pas de trou dans le film.
      const tampons: Record<string, AudioBuffer> = {};
      for (const [texte, v] of Object.entries(voixEleve)) {
        try {
          const brut = await (await fetch(v.url)).arrayBuffer();
          tampons[texte] = await audio.decodeAudioData(brut);
        } catch {}
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas");
      const image = () => {
        dessinerScene(ctx, sceneRef.current, maintenant());
        boucle = requestAnimationFrame(image);
      };
      sceneRef.current = { pile: [] };
      image();

      const flux = canvas.captureStream(30);
      for (const piste of sortie.stream.getAudioTracks()) flux.addTrack(piste);
      const morceaux: Blob[] = [];
      const enregistreur = new MediaRecorder(flux, { mimeType: format, videoBitsPerSecond: 3_000_000 });
      enregistreur.ondataavailable = (ev) => ev.data.size && morceaux.push(ev.data);
      const termine = new Promise<void>((r) => (enregistreur.onstop = () => r()));
      enregistreur.start(1000);
      const debutFilm = maintenant();
      setTournage("filme");
      const auBout = await jouer({ audio, sortie, tampons });
      enregistreur.stop();
      await termine;
      if (!auBout) {
        setTournage(null);
        return;
      }
      const type = format.split(";")[0];
      let blob = new Blob(morceaux, { type });
      // ⛔ Un webm filmé par le navigateur n'écrit pas sa durée : certains
      // lecteurs n'affichent alors ni la longueur ni la barre (mesuré le 10/10).
      if (type === "video/webm") {
        blob = await fixWebmDuration(blob, maintenant() - debutFilm, { logger: false }).catch(() => blob);
      }
      const titre = (script.etapes.find((x) => x.type === "titre") as { texte?: string } | undefined)?.texte ?? "ma-video";
      const nom = `${titre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase() || "ma-video"}.${type === "video/mp4" ? "mp4" : "webm"}`;
      if (film) URL.revokeObjectURL(film.url);
      const url = URL.createObjectURL(blob);
      setFilm({ url, nom });
      const a = document.createElement("a");
      a.href = url;
      a.download = nom;
      a.click();
      setTournage("fini");
    } catch {
      setTournage("erreur");
    } finally {
      cancelAnimationFrame(boucle);
      audio?.close().catch(() => {});
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
            {/* Pendant le tournage, on montre le canvas filmé : c'est la vidéo. */}
            <div className={tournage === "prepare" || tournage === "filme" ? "hidden" : ""}>
              <Ecran scene={scene} />
            </div>
            <canvas
              ref={canvasRef}
              width={LARGEUR}
              height={HAUTEUR}
              className={`w-full rounded-xl bg-black shadow-lg ${tournage === "prepare" || tournage === "filme" ? "" : "hidden"}`}
            />
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
              <>
                <button
                  type="button"
                  onClick={() => jouer()}
                  disabled={script.etapes.length === 0}
                  className="rounded-xl bg-sky-600 px-4 py-2 font-bold text-white hover:bg-sky-700 disabled:opacity-40"
                >
                  ▶ Voir l&apos;aperçu
                </button>
                <button
                  type="button"
                  onClick={telecharger}
                  disabled={script.etapes.length === 0 || erreurs.length > 0}
                  className="rounded-xl bg-emerald-600 px-4 py-2 font-bold text-white hover:bg-emerald-700 disabled:opacity-40"
                >
                  ⬇ Télécharger ma vidéo
                </button>
              </>
            )}
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={avecVoix} onChange={(e) => setAvecVoix(e.target.checked)} />
              Lire la voix
            </label>
          </div>
          {tournage === "prepare" && <p className="mt-2 text-sm text-slate-600">Préparation de la vidéo…</p>}
          {tournage === "filme" && (
            <p className="mt-2 text-sm font-semibold text-emerald-800">
              🎬 Tournage en cours : la vidéo se joue une fois, puis se télécharge. Reste sur cette page.
            </p>
          )}
          {tournage === "fini" && film && (
            <p className="mt-2 text-sm text-emerald-800">
              ✓ Ta vidéo est téléchargée.{" "}
              <a href={film.url} download={film.nom} className="font-bold underline">
                La télécharger à nouveau
              </a>
            </p>
          )}
          {tournage === "erreur" && (
            <p className="mt-2 text-sm font-semibold text-red-700">
              Ce navigateur ne sait pas fabriquer la vidéo. Essaie avec Chrome ou Edge.
            </p>
          )}
          {Object.keys(voixEleve).length === 0 && script.etapes.some((x) => x.voix) && (
            <p className="mt-2 text-xs text-slate-500">
              Dans la vidéo téléchargée, on entend seulement ta voix enregistrée (partie 3) ; sans elle, les phrases
              restent écrites en sous-titres.
            </p>
          )}
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
