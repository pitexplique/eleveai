"use client";

// LA PAGE DE PROJECTION DES ÉNIGMES (19/11/2026, nom affiché « Énigmes à
// projeter », code et adresse /enigmes-mathematiques) — une énigme par écran,
// dessin à côté de la question, flèches pour changer, Espace pour la réponse.
// ⭐ Fond ARDOISE par défaut (Frédéric, 19/11 : « mets en fond ardoise, car
// dans les classes il y a un pb de lumière ») ; le fond BLANC reste au choix
// (touche T), pour écrire au feutre sur le tableau blanc. Les lignes
// d'écriture en bas (touche L) reçoivent la réponse quand on la montre.
// ⏱ 19/11, Frédéric : « énigmes à projeter et en dessous questions flash avec
// un minuteur » → un minuteur par problème (1, 2, 3 ou 5 min, touche M pour
// lancer ou arrêter), grand, en haut à droite du tableau. Il s'arrête et se
// remet à zéro quand on change de problème. Aucun son : l'écran clignote.

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { COULEURS_ARDOISE, type ProblemesNotion } from "@/lib/problemes/types";

const teinter = (html: string, ardoise: boolean) =>
  ardoise ? html.replace(/#[0-9a-f]{6}/gi, (h) => COULEURS_ARDOISE[h.toLowerCase()] ?? h) : html;

const lire = (cle: string) => {
  try {
    return localStorage.getItem(cle);
  } catch {
    return null;
  }
};
const ecrire = (cle: string, v: string) => {
  try {
    localStorage.setItem(cle, v);
  } catch {
    /* navigation privée : on oublie, c'est tout */
  }
};

export default function ProjectionProblemes({
  data,
  retourHref,
  fonts,
}: {
  data: ProblemesNotion;
  retourHref: string;
  fonts: string;
}) {
  const n = data.problemes.length;
  const cle = `probleme-${data.classe}-${data.notionId}`;
  const [i, setI] = useState(0);
  const [montree, setMontree] = useState(false);
  const [lignes, setLignes] = useState(true);
  const [ardoise, setArdoise] = useState(true);
  const [duree, setDuree] = useState(120);
  const [restant, setRestant] = useState<number | null>(null);
  const [tourne, setTourne] = useState(false);

  // Reprendre là où le prof s'était arrêté, et son fond préféré.
  useEffect(() => {
    const s = parseInt(lire(cle) ?? "", 10);
    if (s >= 0 && s < n) setI(s);
    if (lire("problemes-fond") === "blanc") setArdoise(false);
  }, [cle, n]);
  useEffect(() => ecrire(cle, String(i)), [cle, i]);
  useEffect(() => ecrire("problemes-fond", ardoise ? "ardoise" : "blanc"), [ardoise]);

  const aller = useCallback((k: number) => {
    setI(((k % n) + n) % n);
    setMontree(false);
    setTourne(false);
    setRestant(null);
  }, [n]);

  // Le minuteur : une seconde à la fois, arrêt à zéro.
  useEffect(() => {
    if (!tourne) return;
    const t = setInterval(() => {
      setRestant((r) => {
        const s = (r ?? 0) - 1;
        if (s <= 0) setTourne(false);
        return Math.max(0, s);
      });
    }, 1000);
    return () => clearInterval(t);
  }, [tourne]);
  const lancer = useCallback((d: number) => {
    setDuree(d);
    setRestant(d);
    setTourne(true);
  }, []);
  const basculer = useCallback(() => {
    if (tourne) setTourne(false);
    else if (restant && restant > 0) setTourne(true);
    else lancer(duree);
  }, [tourne, restant, duree, lancer]);

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      const cible = ev.target as HTMLElement | null;
      if (ev.key === "ArrowRight" || ev.key === "PageDown") { aller(i + 1); ev.preventDefault(); }
      else if (ev.key === "ArrowLeft" || ev.key === "PageUp") { aller(i - 1); ev.preventDefault(); }
      else if (ev.key === "l" || ev.key === "L") setLignes((v) => !v);
      else if (ev.key === "t" || ev.key === "T") setArdoise((v) => !v);
      else if (ev.key === "m" || ev.key === "M") basculer();
      else if (ev.key === " " || ev.key === "Enter") {
        if (cible?.tagName !== "BUTTON" && cible?.tagName !== "A") { setMontree((v) => !v); ev.preventDefault(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [aller, i, basculer]);

  const e = data.problemes[i];
  // Avec les lignes, la question se resserre : un seul saut de ligne au lieu de
  // deux (un sélecteur CSS « br + br » ignorait le texte entre deux <br>).
  const question = useMemo(
    () => teinter(lignes ? e.question.replace(/<br>\s*<br>/g, "<br>") : e.question, ardoise),
    [e, ardoise, lignes]
  );
  const dessin = useMemo(() => teinter(e.dessin, ardoise), [e, ardoise]);
  const reponse = (
    <div className="answer" hidden={!montree} dangerouslySetInnerHTML={{ __html: e.reponse }} />
  );

  const pleinEcran = () => {
    try {
      if (document.fullscreenElement) void document.exitFullscreen();
      else void document.documentElement.requestFullscreen?.().catch(() => {});
    } catch {
      /* rien */
    }
  };

  return (
    <div className={`problemes ${fonts} ${ardoise ? "ardoise" : ""}`}>
      <div className="wrap">
        <main className={`board ${lignes ? "avec-lignes" : ""}`} aria-live="polite">
          {/* 19/11, Frédéric : « eleveai.fr » en haut à gauche, sur toutes les pages. */}
          <div className="marque" aria-hidden="true">eleveai.fr</div>
          {restant !== null ? (
            <div className={`minuteur ${restant === 0 ? "fini" : ""}`} role="timer" aria-live="off">
              {restant === 0 ? "⏱ Stylos levés !" : `⏱ ${Math.floor(restant / 60)}:${String(restant % 60).padStart(2, "0")}`}
            </div>
          ) : null}
          <section className="slide">
            <div>
              <div className="tag">{e.tag}</div>
              <h1>{e.titre}</h1>
              <div className="q" dangerouslySetInnerHTML={{ __html: question }} />
              {lignes ? null : reponse}
            </div>
            <div className="art" dangerouslySetInnerHTML={{ __html: dessin }} />
            {lignes ? (
              <div className="ecrire" aria-label="Zone pour écrire au feutre">
                {reponse}
              </div>
            ) : null}
          </section>
        </main>
        <div className="bar">
          <Link href={retourHref} className="retour">← Toutes les énigmes</Link>
          <button type="button" onClick={() => aller(i - 1)}>◀ Précédente</button>
          <button type="button" className="reveal" onClick={() => setMontree((v) => !v)}>
            {montree ? "Cacher la réponse" : "Voir la réponse"}
          </button>
          <button type="button" onClick={() => aller(i + 1)}>Suivante ▶</button>
          <button type="button" onClick={() => setLignes((v) => !v)}>
            {lignes ? "Cacher les lignes" : "Lignes pour écrire"}
          </button>
          <button type="button" onClick={() => setArdoise((v) => !v)}>
            {ardoise ? "Fond blanc" : "Fond ardoise"}
          </button>
          <span className="chrono" aria-label="Minuteur">
            {[60, 120, 180, 300].map((d) => (
              <button key={d} type="button" aria-pressed={duree === d && restant !== null} onClick={() => lancer(d)}>
                ⏱ {d / 60} min
              </button>
            ))}
            {restant !== null ? (
              <button type="button" onClick={basculer}>{tourne ? "Pause" : restant === 0 ? "Relancer" : "Reprendre"}</button>
            ) : null}
          </span>
          <button type="button" onClick={pleinEcran}>Plein écran</button>
          <span className="hint">
            ← → pour changer · Espace : la réponse · M : le minuteur · L : les lignes · T : le fond
          </span>
          <div className="dots">
            {data.problemes.map((_, k) => (
              <button
                key={k}
                type="button"
                aria-label={`Énigme ${k + 1}`}
                aria-current={k === i ? "true" : "false"}
                onClick={() => aller(k)}
              />
            ))}
          </div>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  );
}

const CSS = `
.problemes {
  --board: #ffffff; --board-edge: #e2e8f0; --chalk: #1e293b; --chalk-dim: #64748b;
  --yellow: #b45309; --pink: #be123c; --blue: #1d4ed8;
  --display: var(--font-kalam), 'Comic Sans MS', cursive;
  --body: var(--font-atkinson), 'Segoe UI', Arial, sans-serif;
  position: fixed; inset: 0; z-index: 50;
  background: var(--board-edge); color: var(--chalk); font-family: var(--body);
  color-scheme: light;
}
.problemes.ardoise {
  --board: #2f3d3a; --board-edge: #1f2826; --chalk: #f1f5f9; --chalk-dim: #b6c2bf;
  --yellow: #fde68a; --pink: #fda4af; --blue: #93c5fd; color-scheme: dark;
}
.problemes .wrap {
  box-sizing: border-box; height: 100%; padding-block: 14px;
  padding-left: max(16px, env(safe-area-inset-left, 0px));
  padding-right: max(16px, env(safe-area-inset-right, 0px));
  display: flex; flex-direction: column; gap: 10px;
}
.problemes .board {
  position: relative;
  flex: 1; min-height: 0; background: var(--board); border-radius: 6px;
  box-shadow: inset 0 0 0 2px #cbd5e1; padding: clamp(16px, 3vw, 44px); overflow: auto;
}
.problemes.ardoise .board { box-shadow: inset 0 0 0 10px #6b4f2a, inset 0 0 0 12px #3b2a14; }
.problemes .marque {
  position: absolute; top: 8px; left: 14px; z-index: 1;
  font-family: var(--body); font-weight: 700; font-size: clamp(18px, 1.8vw, 26px);
  color: var(--chalk); opacity: .75; letter-spacing: .02em;
}
.problemes .board { padding-top: clamp(30px, 4vw, 52px); }
.problemes .minuteur {
  position: absolute; top: 10px; right: 14px; z-index: 1;
  font-family: var(--display); font-weight: 700; font-size: clamp(28px, 3.6vw, 52px);
  color: var(--yellow); font-variant-numeric: tabular-nums; line-height: 1;
}
.problemes .minuteur.fini { color: var(--pink); }
@media (prefers-reduced-motion: no-preference) {
  .problemes .minuteur.fini { animation: probleme-clignote 1s steps(2, start) 6; }
  @keyframes probleme-clignote { to { visibility: hidden; } }
}
.problemes .frac { display: inline-flex; flex-direction: column; align-items: center; vertical-align: middle; line-height: 1.05; font-size: .9em; margin: 0 .12em; }
.problemes .frac > span:first-child { border-bottom: 2px solid currentColor; padding: 0 .18em; }
.problemes .ecrire .answer .frac { line-height: 1; font-size: 1em; vertical-align: -0.35em; }
.problemes .chrono { display: inline-flex; gap: 4px; flex-wrap: wrap; }
.problemes .chrono button { padding: 8px 10px; }
.problemes .chrono button[aria-pressed="true"] { background: var(--yellow); color: #1e293b; }
.problemes .slide { display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(16px, 3vw, 48px); align-items: center; min-height: 100%; }
.problemes .slide > * { min-width: 0; }
.problemes .tag { font-family: var(--display); color: var(--yellow); font-size: clamp(18px, 2vw, 26px); letter-spacing: .04em; }
.problemes h1 { font-family: var(--display); font-weight: 700; font-size: clamp(32px, 4.6vw, 64px); line-height: 1.05; margin: 4px 0 14px; text-wrap: balance; }
.problemes .q { font-size: clamp(20px, 2.3vw, 32px); line-height: 1.4; max-width: 34ch; }
.problemes .q b { color: var(--yellow); }
.problemes .answer { margin-top: 18px; font-size: clamp(18px, 2vw, 28px); line-height: 1.4; border-top: 2px dashed var(--chalk-dim); padding-top: 12px; max-width: 36ch; }
.problemes .answer .big { font-family: var(--display); color: var(--pink); font-size: 1.35em; font-weight: 700; }
.problemes .art svg { width: 100%; height: auto; max-height: 62vh; display: block; }
.problemes .art text { font-family: var(--display); }
.problemes .bar { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
.problemes .bar button, .problemes .bar .retour {
  font-family: var(--body); font-size: 16px; font-weight: 700; text-decoration: none;
  background: var(--board); color: var(--chalk); border: 2px solid #94a3b8; border-radius: 6px;
  padding: 8px 14px; cursor: pointer;
}
.problemes.ardoise .bar button, .problemes.ardoise .bar .retour { border-color: #6b7f7a; }
.problemes .bar button:hover, .problemes .bar .retour:hover { filter: brightness(1.08); }
.problemes .bar button:focus-visible, .problemes .bar .retour:focus-visible { outline: 3px solid var(--blue); outline-offset: 2px; }
.problemes .bar .reveal { background: #fcd34d; color: #1e293b; border-color: #f59e0b; }
.problemes .dots { display: flex; gap: 6px; margin-left: auto; }
.problemes .dots button { width: 14px; height: 14px; padding: 0; border-radius: 50%; border: 2px solid var(--chalk-dim); background: transparent; }
.problemes .dots button[aria-current="true"] { background: var(--chalk); border-color: var(--chalk); }
.problemes .hint { font-size: 13px; color: var(--chalk-dim); }
.problemes .ecrire {
  grid-column: 1 / -1; align-self: stretch; min-height: 144px; overflow: hidden;
  background-color: #ffffff;
  background-image:
    linear-gradient(90deg, transparent 54px, #e9a3a3 54px, #e9a3a3 56px, transparent 56px),
    repeating-linear-gradient(180deg, transparent 0, transparent 46px, #a9c6e8 46px, #a9c6e8 48px);
  border: 3px solid #94a3b8; border-radius: 8px;
}
.problemes.ardoise .ecrire {
  background-color: #2f3d3a; border-color: #6b7f7a;
  background-image:
    linear-gradient(90deg, transparent 54px, #b97a7a 54px, #b97a7a 56px, transparent 56px),
    repeating-linear-gradient(180deg, transparent 0, transparent 46px, #5d7a8c 46px, #5d7a8c 48px);
}
.problemes .avec-lignes .slide { min-height: 0; height: 100%; grid-template-rows: auto minmax(144px, 1fr); }
.problemes .ecrire .answer { margin: 0; border: 0; max-width: none; padding: 0 18px 0 70px; line-height: 48px; color: #1d3557; font-size: clamp(18px, 1.9vw, 26px); }
.problemes .ecrire .answer b { color: inherit; }
.problemes .ecrire .answer .big { color: #c0392b; font-size: 1.2em; }
.problemes.ardoise .ecrire .answer { color: #f1f5f9; }
.problemes.ardoise .ecrire .answer .big { color: #fda4af; }
.problemes .avec-lignes .art svg { max-height: 40vh; }
@media (max-width: 760px) {
  .problemes .slide { grid-template-columns: 1fr; }
  .problemes .art svg { max-height: 40vh; }
  .problemes .hint { display: none; }
}
@media (prefers-reduced-motion: no-preference) {
  .problemes .answer:not([hidden]) { animation: probleme-craie .5s ease-out; }
  @keyframes probleme-craie { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
}
`;
