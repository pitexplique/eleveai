"use client";

// ⭐ 14/11/2026 — LE PAVÉ NUMÉRIQUE ENFANT, sur le modèle d'IXL.
// Frédéric : « pas seulement des QCM, des claviers enfants ? ». En primaire on ne
// tape pas (règle « zéro clavier » du 20/06/2026) : on CLIQUE. Aucun champ natif
// ici, donc le clavier de la tablette ne s'ouvre pas. Sur ordinateur, les
// touches 0-9, la virgule, Retour arrière et Entrée marchent aussi.
//
// Deux variantes, choisies par lib/tutor-v4/paveNumerique.ts :
//  • le pavé : 0-9, « , » (seulement si la réponse est décimale), ⌫, Valider,
//    et l'unité en suffixe fixe (« cm », « € ») ;
//  • au CP, pour une petite réponse entière (≤ 20) : des boutons-nombres directs
//    (1 … 10 ou 0 … 20), un toucher et c'est envoyé — comme un QCM.

import { useEffect, useMemo, useRef } from "react";
import {
  boutonsNombresDirects,
  composerReponsePave,
  grouperMilliers,
  lirePave,
} from "@/lib/tutor-v4/paveNumerique";

type Props = {
  /** expected[0] de la question : règle la virgule et l'unité. */
  attendue: string | undefined;
  classe: string;
  /** Ce que l'élève a tapé (chiffres et virgule, SANS l'unité). */
  saisie: string;
  setSaisie: (valeur: string) => void;
  /** Envoie la réponse complète (nombre + unité). */
  onEnvoyer: (reponse: string) => void;
  disabled: boolean;
  /** Affichage classe (projection) : tout plus grand. */
  grand: boolean;
};

export default function PaveNumerique({
  attendue,
  classe,
  saisie: saisieBrute,
  setSaisie,
  onEnvoyer,
  disabled,
  grand,
}: Props) {
  const lecture = useMemo(() => lirePave(attendue), [attendue]);
  const directs = useMemo(() => boutonsNombresDirects(classe, lecture), [classe, lecture]);
  const longueurMax = lecture?.longueurMax ?? 8;
  const decimal = lecture?.decimal ?? false;
  const unite = lecture?.unite ?? "";
  // Après l'envoi, la réponse de la page porte l'unité (« 24 m ») : on n'en
  // garde que le nombre pour l'afficher.
  const saisie = saisieBrute.replace(/[^\d,]/g, "");

  // ⚠️ Deux touches plus rapides qu'un rendu (⌫ ⌫ tapé vite) lisaient la même
  // saisie : « 156 » partait au lieu de « 5 ». On garde la dernière valeur ici.
  const courante = useRef(saisie);
  courante.current = saisie;
  function poser(valeur: string) {
    courante.current = valeur;
    setSaisie(valeur);
  }

  function ajouter(car: string) {
    if (disabled) return;
    const s = courante.current;
    if (s.length >= longueurMax) return;
    if (car === ",") {
      if (!decimal || s.includes(",")) return;
      poser(s ? `${s},` : "0,");
      return;
    }
    // Pas de zéros inutiles en tête : « 07 » devient « 7 ».
    poser(s === "0" ? car : s + car);
  }

  function effacer() {
    if (disabled) return;
    poser(courante.current.slice(0, -1));
  }

  function valider() {
    const s = courante.current;
    if (disabled || !s || s.endsWith(",")) return;
    onEnvoyer(lecture ? composerReponsePave(s, lecture) : s);
  }

  // Le clavier physique de l'ordinateur reste utilisable (aucun champ n'a le focus).
  useEffect(() => {
    if (directs) return;
    function surTouche(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const cible = e.target as HTMLElement | null;
      if (cible && /^(INPUT|TEXTAREA|SELECT)$/.test(cible.tagName)) return;
      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        ajouter(e.key);
      } else if (e.key === "," || e.key === ".") {
        e.preventDefault();
        ajouter(",");
      } else if (e.key === "Backspace") {
        e.preventDefault();
        effacer();
      } else if (e.key === "Enter") {
        // Entrée sur un bouton du pavé : son propre clic suffit.
        if (cible?.tagName === "BUTTON") return;
        e.preventDefault();
        valider();
      }
    }
    window.addEventListener("keydown", surTouche);
    return () => window.removeEventListener("keydown", surTouche);
  });

  const tailleTouche = grand ? "h-20 text-4xl sm:h-24 sm:text-5xl" : "h-16 text-3xl sm:h-[4.5rem]";
  const toucheBase =
    "flex select-none items-center justify-center rounded-2xl font-black shadow-md transition active:translate-y-0.5 active:shadow-sm disabled:opacity-40 touch-manipulation";

  // ── Variante CP : on touche directement le nombre ──────────────────────────
  if (directs) {
    const tailleDirect = grand ? "h-20 text-4xl sm:h-24 sm:text-5xl" : "h-16 text-3xl";
    return (
      <div className="space-y-2" data-pave="directs">
        <p className="text-base font-bold text-slate-700">Touche le bon nombre</p>
        <div
          role="group"
          aria-label="Touche le bon nombre"
          className={`grid gap-2 sm:gap-3 ${directs.length > 10 ? "grid-cols-4 sm:grid-cols-7" : "grid-cols-5"}`}
        >
          {directs.map((n) => {
            const reponse = lecture ? composerReponsePave(String(n), lecture) : String(n);
            // Le nombre touché reste allumé pendant la correction (comme un QCM).
            const choisi = disabled && saisie === String(n);
            return (
              <button
                key={n}
                type="button"
                disabled={disabled}
                onClick={() => onEnvoyer(reponse)}
                aria-label={reponse}
                aria-busy={choisi || undefined}
                className={`${toucheBase} ${tailleDirect} ${
                  choisi
                    ? "bg-sky-800 text-white ring-4 ring-amber-400 disabled:opacity-100"
                    : "bg-sky-600 text-white hover:bg-sky-500"
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Le pavé ─────────────────────────────────────────────────────────────────
  const touches = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const affichage = saisie ? grouperMilliers(saisie) : "";

  return (
    <div className="w-full max-w-sm space-y-3" data-pave="pave">
      {/* La réponse en cours, en gros. `aria-live` : le lecteur d'écran la dit. */}
      <div
        aria-live="polite"
        aria-label={saisie ? `Ta réponse : ${affichage}${unite ? ` ${unite}` : ""}` : "Ta réponse : vide"}
        className={`flex items-center justify-center gap-3 rounded-2xl border-4 bg-white px-4 font-black tabular-nums text-slate-900 ${
          grand ? "min-h-24 text-5xl sm:text-6xl" : "min-h-20 text-5xl"
        } ${saisie ? "border-sky-500" : "border-dashed border-slate-300"}`}
      >
        <span className={saisie ? "" : "text-slate-300"}>{affichage || "?"}</span>
        {unite ? <span className="text-3xl font-black text-slate-500 sm:text-4xl">{unite}</span> : null}
      </div>

      <div role="group" aria-label="Pavé numérique" className="grid grid-cols-3 gap-2 sm:gap-3">
        {touches.map((t) => (
          <button
            key={t}
            type="button"
            disabled={disabled}
            onClick={() => ajouter(t)}
            className={`${toucheBase} ${tailleTouche} border-2 border-sky-700 bg-sky-600 text-white hover:bg-sky-500`}
          >
            {t}
          </button>
        ))}
        {decimal ? (
          <button
            type="button"
            disabled={disabled}
            onClick={() => ajouter(",")}
            aria-label="virgule"
            className={`${toucheBase} ${tailleTouche} border-2 border-sky-700 bg-sky-100 text-sky-900 hover:bg-sky-200`}
          >
            ,
          </button>
        ) : (
          <span aria-hidden="true" />
        )}
        <button
          type="button"
          disabled={disabled}
          onClick={() => ajouter("0")}
          className={`${toucheBase} ${tailleTouche} border-2 border-sky-700 bg-sky-600 text-white hover:bg-sky-500`}
        >
          0
        </button>
        <button
          type="button"
          disabled={disabled || !saisie}
          onClick={effacer}
          aria-label="Effacer le dernier chiffre"
          title="Effacer"
          className={`${toucheBase} ${tailleTouche} border-2 border-amber-600 bg-amber-100 text-amber-900 hover:bg-amber-200`}
        >
          ⌫
        </button>
      </div>

      <button
        type="button"
        disabled={disabled || !saisie || saisie.endsWith(",")}
        onClick={valider}
        className={`${toucheBase} w-full bg-lime-500 text-white hover:bg-lime-600 ${
          grand ? "h-20 text-3xl sm:text-4xl" : "h-16 text-2xl"
        }`}
      >
        Valider
      </button>
    </div>
  );
}
