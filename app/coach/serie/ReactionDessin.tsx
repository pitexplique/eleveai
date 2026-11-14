// app/coach/serie/ReactionDessin.tsx
//
// ⭐ 14/11/2026 — LA RÉACTION DU DESSIN (section 5 de docs/etude-images-cm1-6e.md).
// Frédéric : « ça rendrait plus fun ». Avant, la bonne réponse n'était saluée que
// par « Bravo » et « 🔥 Série N », et aucun dessin ne bougeait. Désormais, après
// la réponse, le dessin de la question réagit pendant ~0,7 s, SANS UN MOT DE PLUS
// à lire (la question est finie, rien ne gêne la lecture) :
//   - animaux (CP → CM1)            : juste → ils sautent, l'un après l'autre ;
//   - objets, monnaie, base dix…    : juste → petit rebond et éclat doré ;
//   - figures, graphiques           : juste → lueur verte sur le tracé + anneau vert ;
//   - 6e et au-delà (sobre)         : juste → contour vert + jauge qui se remplit,
//                                      et Ti Margo passe la tête (image seule) ;
//   - mauvaise réponse, partout     : le dessin penche la tête (animaux) ou tremble
//                                      doucement. Jamais d'air triste.
// ⛔ `prefers-reduced-motion` : aucune animation (CSS), et le client ne retarde
// pas la question suivante (`mouvementReduit()`).
// ⛔ Ne touche à aucun gabarit : on enveloppe le canvas, on ne le modifie pas.

import type { ReactNode } from "react";
import type { CanvasFigure } from "@/lib/tutor-v4/types";

export type TypeReaction = "juste" | "faux";

/** La durée pendant laquelle le client laisse le dessin réagir avant la suite. */
export const DUREE_REACTION_MS = 750;

const ANIMAUX = new Set(["animaux", "personnage"]);
const OBJETS = new Set([
  "objets",
  "monnaie",
  "base_dix",
  "masse",
  "contenance",
  "duree",
  "calcul_pose",
]);
/** Les classes où le « bébé » gêne : réaction sobre, Ti Margo seul. */
const PRIMAIRE = new Set(["cp", "ce1", "ce2", "cm1", "cm2"]);

type Famille = "animal" | "objet" | "figure";

function familleDu(canvas: CanvasFigure | null | undefined): Famille {
  const kind = (canvas as { kind?: string } | null | undefined)?.kind ?? "";
  if (ANIMAUX.has(kind)) return "animal";
  if (OBJETS.has(kind)) return "objet";
  return "figure";
}

/** Vrai si l'élève a demandé moins d'animations à son système. */
export function mouvementReduit(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ReactionDessin({
  canvas,
  classe,
  reaction,
  children,
}: {
  canvas: CanvasFigure | null | undefined;
  classe: string;
  /** null : pas de réaction. */
  reaction: TypeReaction | null;
  children: ReactNode;
}) {
  const sobre = !PRIMAIRE.has(String(classe));
  const famille = familleDu(canvas);
  const classes = [
    "rd-dessin",
    `rd-${famille}`,
    sobre ? "rd-sobre" : "",
    reaction ? `rd-${reaction}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <style>{STYLE}</style>
      {children}
      {reaction === "juste" && sobre ? (
        <>
          <span className="rd-jauge" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cahier-vacances/ti-margo.png"
            alt=""
            aria-hidden="true"
            className="rd-margo"
          />
        </>
      ) : null}
      {reaction === "juste" && !sobre && famille === "objet" ? (
        <span className="rd-eclat" aria-hidden="true" />
      ) : null}
    </div>
  );
}

const STYLE = `
.rd-dessin { position: relative; transform-origin: 50% 100%; border-radius: 0.75rem; }
/* Le cadre du dessin défile (overflow-x-auto) : pendant la réaction, il laisse
   déborder, sinon un saut ou une lueur fait clignoter une barre de défilement. */
*:has(> .rd-dessin.rd-juste), *:has(> .rd-dessin.rd-faux) { overflow: visible !important; }

/* ── Bonne réponse : animaux qui sautent, l'un après l'autre ── */
.rd-animal.rd-juste:not(.rd-sobre) { animation: rd-bond 0.7s cubic-bezier(.3,1.6,.5,1); }
.rd-animal.rd-juste:not(.rd-sobre) svg > g { animation: rd-hop 0.5s ease-out both; }
.rd-animal.rd-juste:not(.rd-sobre) svg > g:nth-child(4n+2) { animation-delay: 60ms; }
.rd-animal.rd-juste:not(.rd-sobre) svg > g:nth-child(4n+3) { animation-delay: 120ms; }
.rd-animal.rd-juste:not(.rd-sobre) svg > g:nth-child(4n) { animation-delay: 180ms; }
@keyframes rd-bond {
  0% { transform: translateY(0) scale(1, 1); }
  15% { transform: translateY(0) scale(1.06, 0.92); }
  45% { transform: translateY(-16px) scale(0.97, 1.05); }
  75% { transform: translateY(0) scale(1.04, 0.96); }
  100% { transform: translateY(0) scale(1, 1); }
}
@keyframes rd-hop {
  0%, 100% { translate: 0 0; }
  40% { translate: 0 -9px; }
}

/* ── Bonne réponse : objets, monnaie, base dix → rebond + éclat ── */
.rd-objet.rd-juste { animation: rd-rebond 0.6s cubic-bezier(.3,1.5,.5,1); }
@keyframes rd-rebond {
  0% { transform: scale(1); }
  35% { transform: scale(1.05); }
  65% { transform: scale(0.985); }
  100% { transform: scale(1); }
}
.rd-eclat {
  position: absolute; inset: 0; pointer-events: none; border-radius: 0.75rem;
  background: radial-gradient(circle at 50% 45%, rgba(251,191,36,.45), rgba(251,191,36,0) 65%);
  animation: rd-eclat 0.7s ease-out forwards;
}
@keyframes rd-eclat {
  0% { opacity: 0; transform: scale(.6); }
  30% { opacity: 1; }
  100% { opacity: 0; transform: scale(1.15); }
}

/* ── Bonne réponse : figures et graphiques → lueur verte du tracé ── */
.rd-figure.rd-juste { animation: rd-contour 0.8s ease-out; }
.rd-figure.rd-juste svg { animation: rd-lueur 0.75s ease-out; }
@keyframes rd-lueur {
  0% { filter: drop-shadow(0 0 0 rgba(16,185,129,0)); }
  40% { filter: drop-shadow(0 0 3px rgba(16,185,129,1)) drop-shadow(0 0 6px rgba(16,185,129,.8)); }
  100% { filter: drop-shadow(0 0 0 rgba(16,185,129,0)); }
}

/* ── 6e et au-delà : sobre. Contour vert, jauge, Ti Margo passe la tête ── */
.rd-sobre.rd-juste { animation: rd-contour 0.8s ease-out; }
@keyframes rd-contour {
  0% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
  30% { box-shadow: 0 0 0 4px rgba(16,185,129,.85); }
  100% { box-shadow: 0 0 0 4px rgba(16,185,129,0); }
}
.rd-jauge {
  position: absolute; left: 8px; right: 8px; bottom: 4px; height: 5px;
  border-radius: 9999px; background: #10b981; transform-origin: 0 50%;
  pointer-events: none; animation: rd-jauge 0.8s ease-out forwards;
}
@keyframes rd-jauge {
  0% { transform: scaleX(0); opacity: 1; }
  70% { transform: scaleX(1); opacity: 1; }
  100% { transform: scaleX(1); opacity: 0; }
}
.rd-margo {
  position: absolute; right: 10px; bottom: 10px; height: 64px; width: auto;
  pointer-events: none; opacity: 0; transform-origin: 50% 100%;
  animation: rd-margo 0.8s ease-out forwards;
}
@keyframes rd-margo {
  0% { opacity: 0; transform: scale(.5) rotate(0deg); }
  30% { opacity: 1; transform: scale(1.05) rotate(-8deg); }
  60% { opacity: 1; transform: scale(1) rotate(6deg); }
  85% { opacity: 1; transform: scale(1) rotate(0deg); }
  100% { opacity: 0; transform: scale(.9) rotate(0deg); }
}

/* ── Mauvaise réponse : penche la tête (animaux) ou tremble doucement ── */
.rd-animal.rd-faux { animation: rd-penche 0.7s ease-in-out; }
@keyframes rd-penche {
  0%, 100% { transform: rotate(0deg); }
  35% { transform: rotate(-4deg); }
  70% { transform: rotate(2deg); }
}
.rd-objet.rd-faux, .rd-figure.rd-faux { animation: rd-tremble 0.5s ease-in-out; }
@keyframes rd-tremble {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(2px); }
}

@media (prefers-reduced-motion: reduce) {
  .rd-dessin, .rd-dessin *, .rd-dessin svg > g { animation: none !important; }
  .rd-jauge, .rd-margo, .rd-eclat { display: none !important; }
}
`;
