"use client";

// ⭐ 26/11/2026 — LE PAVÉ DU LYCÉE. Frédéric : « oui, ajoute-le », « il doit
// contenir exp aussi », « prends e = 2,72 ».
// Le clavier chiffres du téléphone n'a pas de « − » : une réponse négative
// ouvrait le clavier complet, lettres d'abord. Ici : 0-9, « − », « , », « ÷ »,
// « ( ) » et « eˣ » (1re spé, terminale), toujours toutes affichées pour ne rien
// trahir de la réponse. L'aperçu écrit la saisie comme au tableau (e^{-1}).
// Aucun champ natif : le clavier du téléphone ne s'ouvre pas. Sur ordinateur, le
// clavier physique marche aussi (chiffres, - , . / ( ) e ^, ⌫, Entrée).
// Règle d'affichage : paveLycee() dans lib/tutor-v4/paveNumerique.ts.

import { useEffect, useMemo, useRef } from "react";
import katex from "katex";
import { saisieEnLatex } from "@/lib/fiches-exercices/saisie-maths";

type Props = {
  /** La touche eˣ (exponentielle au programme). */
  exp: boolean;
  saisie: string;
  setSaisie: (valeur: string) => void;
  onEnvoyer: (reponse: string) => void;
  disabled: boolean;
  /** Affichage classe (projection) : tout plus grand. */
  grand: boolean;
};

const LONGUEUR_MAX = 24;

export default function PaveLycee({ exp, saisie, setSaisie, onEnvoyer, disabled, grand }: Props) {
  // Deux touches plus rapides qu'un rendu lisaient la même saisie (voir PaveNumerique).
  const courante = useRef(saisie);
  courante.current = saisie;
  function poser(valeur: string) {
    courante.current = valeur;
    setSaisie(valeur);
  }

  function ajouter(morceau: string) {
    if (disabled) return;
    const s = courante.current;
    if (s.length + morceau.length > LONGUEUR_MAX) return;
    if (morceau === ",") {
      // Une virgule par nombre ; tapée seule, elle devient « 0, ».
      if (/\d,\d*$/.test(s)) return;
      poser(/\d$/.test(s) ? `${s},` : `${s}0,`);
      return;
    }
    poser(s + morceau);
  }

  function effacer() {
    if (disabled) return;
    const s = courante.current;
    // « e^( » s'efface d'un coup, comme il s'est écrit.
    poser(s.endsWith("e^(") ? s.slice(0, -3) : s.slice(0, -1));
  }

  function valider() {
    const s = courante.current.trim();
    if (disabled || !s || /[,(^/-]$/.test(s)) return;
    // Les parenthèses oubliées se ferment toutes seules : « 2e^(-1 » → « 2e^(-1) ».
    const manque = (s.match(/\(/g)?.length ?? 0) - (s.match(/\)/g)?.length ?? 0);
    onEnvoyer(s + ")".repeat(Math.max(0, manque)));
  }

  // Le bouton flottant « Calculatrice » s'efface tant qu'un pavé est affiché.
  useEffect(() => {
    document.body.setAttribute("data-pave-ouvert", "");
    return () => document.body.removeAttribute("data-pave-ouvert");
  }, []);

  useEffect(() => {
    function surTouche(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const cible = e.target as HTMLElement | null;
      if (cible && /^(INPUT|TEXTAREA|SELECT)$/.test(cible.tagName)) return;
      if (document.querySelector("[data-calculatrice-ouverte]")) return;
      const k = e.key;
      let morceau: string | null = null;
      if (/^[0-9]$/.test(k)) morceau = k;
      else if (k === "," || k === ".") morceau = ",";
      else if (k === "-" || k === "−") morceau = "-";
      else if (k === "/" || k === ":") morceau = "/";
      else if (k === "(" || k === ")") morceau = k;
      else if (exp && (k === "e" || k === "E")) morceau = "e^(";
      if (morceau) {
        e.preventDefault();
        ajouter(morceau);
      } else if (k === "Backspace") {
        e.preventDefault();
        effacer();
      } else if (k === "Enter") {
        if (cible?.tagName === "BUTTON") return;
        e.preventDefault();
        valider();
      }
    }
    window.addEventListener("keydown", surTouche);
    return () => window.removeEventListener("keydown", surTouche);
  });

  const apercu = useMemo(() => {
    if (!saisie) return null;
    const ligne = saisieEnLatex(saisie.replace(/-/g, "−"))[0];
    if (!ligne) return null;
    try {
      return katex.renderToString(ligne, { throwOnError: true });
    } catch {
      return null;
    }
  }, [saisie]);

  const tailleTouche = grand ? "h-16 text-3xl sm:h-20 sm:text-4xl" : "h-12 text-2xl sm:h-14";
  const base =
    "flex select-none items-center justify-center rounded-xl font-black shadow-sm transition active:translate-y-0.5 disabled:opacity-40 touch-manipulation";
  const chiffre = `${base} ${tailleTouche} border-2 border-sky-700 bg-sky-600 text-white hover:bg-sky-500`;
  const signe = `${base} ${tailleTouche} border-2 border-sky-700 bg-sky-100 text-sky-900 hover:bg-sky-200`;

  const touche = (label: string, morceau: string, classe: string, aria?: string) => (
    <button key={label} type="button" disabled={disabled} onClick={() => ajouter(morceau)} aria-label={aria ?? label} title={aria} className={classe}>
      {label}
    </button>
  );

  return (
    <div className="w-full max-w-sm space-y-3" data-pave="lycee">
      <div
        aria-live="polite"
        aria-label={saisie ? `Ta réponse : ${saisie}` : "Ta réponse : vide"}
        className={`flex min-h-16 items-center justify-center overflow-x-auto rounded-2xl border-4 bg-white px-4 text-3xl font-black text-slate-900 ${
          saisie ? "border-sky-500" : "border-dashed border-slate-300"
        }`}
      >
        {apercu ? <span dangerouslySetInnerHTML={{ __html: apercu }} /> : <span className={saisie ? "" : "text-slate-300"}>{saisie || "?"}</span>}
      </div>

      <div role="group" aria-label="Pavé de réponse" className="grid grid-cols-4 gap-2">
        {touche("7", "7", chiffre)}
        {touche("8", "8", chiffre)}
        {touche("9", "9", chiffre)}
        {touche("÷", "/", signe, "diviser")}
        {touche("4", "4", chiffre)}
        {touche("5", "5", chiffre)}
        {touche("6", "6", chiffre)}
        {exp ? touche("eˣ", "e^(", signe, "exponentielle : e puissance") : <span aria-hidden="true" />}
        {touche("1", "1", chiffre)}
        {touche("2", "2", chiffre)}
        {touche("3", "3", chiffre)}
        {touche("(", "(", signe, "parenthèse ouvrante")}
        {touche("−", "-", signe, "moins")}
        {touche("0", "0", chiffre)}
        {touche(",", ",", signe, "virgule")}
        {touche(")", ")", signe, "parenthèse fermante")}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          disabled={disabled || !saisie}
          onClick={effacer}
          aria-label="Effacer le dernier caractère"
          title="Effacer"
          className={`${base} ${tailleTouche} border-2 border-amber-600 bg-amber-100 text-amber-900 hover:bg-amber-200`}
        >
          ⌫
        </button>
        <button
          type="button"
          disabled={disabled || !saisie}
          onClick={valider}
          className={`${base} col-span-2 ${grand ? "h-16 text-3xl" : "h-12 text-xl sm:h-14"} bg-lime-500 text-white hover:bg-lime-600`}
        >
          Valider
        </button>
      </div>
    </div>
  );
}
