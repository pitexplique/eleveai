// /components/SignupNudge.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LogIn, UserPlus, X } from "lucide-react";

type SignupNudgeProps = {
  /** clé localStorage pour n'afficher qu'une seule fois */
  storageKey?: string;

  /** délai avant proposition (ms). ex: 5 min = 300000 */
  delayMs?: number;

  /** nb d'interactions min avant d'afficher (évite onglet laissé ouvert) */
  minInteractions?: number;

  /** si true, n'affiche jamais */
  disabled?: boolean;

  /** routes auth */
  signupHref?: string;
  signinHref?: string;

  /** texte personnalisable */
  title?: string;
  message?: string;

  /** variante visuelle : "bottom" (bandeau) ou "toast" */
  variant?: "bottom" | "toast";
};

export default function SignupNudge({
  storageKey = "eleveai_nudge_v1",
  delayMs = 5 * 60 * 1000,
  minInteractions = 3,
  disabled = false,
  signupHref = "/auth/signup",
  signinHref = "/auth/signin",
  title = "Sauvegarder et personnaliser ?",
  message = "Crée un compte pour retrouver tes ressources, gagner du temps et adapter finement aux besoins de tes élèves.",
  variant = "bottom",
}: SignupNudgeProps) {
  const [show, setShow] = useState(false);
  const [interactions, setInteractions] = useState(0);

  const canUseStorage = useMemo(() => typeof window !== "undefined", []);

  const dismiss = useCallback(() => {
    try {
      if (canUseStorage) localStorage.setItem(storageKey, "1");
    } catch {}
    setShow(false);
  }, [canUseStorage, storageKey]);

  useEffect(() => {
    if (disabled) return;
    if (!canUseStorage) return;

    // Ne pas afficher si déjà vu
    try {
      if (localStorage.getItem(storageKey) === "1") return;
    } catch {}

    // Compteur d'interactions "réelles"
    const bump = () => setInteractions((n) => Math.min(n + 1, 30));

    const onClick = () => bump();
    const onScroll = () => bump();
    const onKeyDown = (e: KeyboardEvent) => {
      // On compte seulement les touches utiles
      if (e.key.length === 1 || e.key === "Enter" || e.key === "Backspace") bump();
    };

    window.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    // Timer principal
    const t = window.setTimeout(() => {
      setShow((prev) => (prev ? prev : interactions >= minInteractions));
    }, delayMs);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [disabled, canUseStorage, storageKey, delayMs, interactions, minInteractions]);

  if (!show) return null;

  const containerClass =
    variant === "toast"
      ? "fixed bottom-4 right-4 z-50 w-[min(460px,calc(100vw-2rem))]"
      : "fixed inset-x-0 bottom-0 z-50";

  const innerWrapClass =
    variant === "toast"
      ? ""
      : "max-w-6xl mx-auto px-4 pb-4";

  return (
    <div className={containerClass}>
      <div className={innerWrapClass}>
        {/* ✅ Visible mais non agressif : sky-100 + border-sky-300 + shadow-md */}
        <div className="bg-sky-100 border border-sky-300 shadow-md rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-9 h-9 rounded-xl bg-white/80 border border-sky-200 flex items-center justify-center">
              <span className="text-sky-700 text-base">💡</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/70 border border-slate-200 text-slate-600">
                  optionnel
                </span>
              </div>

              <p className="text-xs text-slate-700">{message}</p>

              <p className="text-[11px] text-slate-600">
                Vous pouvez continuer sans créer de compte.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-end">
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-white border border-slate-200 hover:bg-slate-50"
            >
              Continuer sans compte
            </button>

            <Link
              href={signupHref}
              onClick={dismiss}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-[#0047B6] text-white hover:bg-[#003894] shadow-sm"
            >
              <UserPlus className="w-4 h-4" />
              Créer un compte
            </Link>

            <Link
              href={signinHref}
              onClick={dismiss}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 hover:bg-slate-200"
            >
              <LogIn className="w-4 h-4" />
              Connexion
            </Link>

            <button
              type="button"
              onClick={dismiss}
              className="p-2 rounded-lg hover:bg-white/70"
              aria-label="Fermer"
              title="Fermer"
            >
              <X className="w-4 h-4 text-slate-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
